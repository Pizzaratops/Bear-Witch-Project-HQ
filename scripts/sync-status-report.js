#!/usr/bin/env node
// ============================================================
//  STATUS REPORT SYNC (ESPN- & Sleeper-Football-Ligen, mehrere Personen)
// ============================================================
//  Holt für jede Person aus js/status-report-config.js (STATUS_REPORT_PEOPLE)
//  ihr eigenes Team je gelisteter Liga (Roster + Verletztenstatus) und
//  schreibt alles gesammelt nach data/status-report.js -> STATUS_REPORT_DATA.
//
//  ESPN: eigenes Team wird per SWID-Match erkannt (team.owners). Für
//  private Ligen braucht jede Person ihre eigenen espn_s2/SWID-Cookies
//  als GitHub Secrets -- Standard-Person (credentialKey: null) nutzt
//  ESPN_S2/SWID, jede weitere Person nutzt ESPN_S2_<KEY>/SWID_<KEY>
//  (siehe js/status-report-config.js für die Namenskonvention).
//  Läuft gegen den ESPN "reads"-Endpoint -- kein CORS-Problem in
//  Node/GitHub Actions, anders als im Browser.
//
//  Sleeper: öffentliche API, eigenes Team wird über den je Person in
//  der Config hinterlegten Usernamen aufgelöst. players/nfl (Referenz-
//  daten, ~5MB) wird gecacht, wenn SLEEPER_PLAYERS_CACHE_PATH gesetzt
//  ist (siehe .github/workflows/sync-status-report.yml, actions/cache)
//  -- einmal fuer alle Personen zusammen, nicht pro Person neu laden.
//
//  Ausfallsicher: schlägt eine einzelne Liga (einer Person) fehl, wird
//  sie mit dem letzten guten Stand (aus der bestehenden
//  data/status-report.js) und stale:true übernommen, statt den ganzen
//  Sync abzubrechen.
//
//  Usage:
//    node scripts/sync-status-report.js
//    ESPN_S2=... SWID=... ESPN_S2_FELIX=... SWID_FELIX=... node scripts/sync-status-report.js
// ============================================================

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const https = require('https');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'data', 'status-report.js');
const REQUEST_TIMEOUT_MS = 30000;

/* ---------- Shared helpers (Muster wie in den anderen sync-espn-*.js Skripten) ---------- */

function loadModuleSandbox(files) {
  // WICHTIG: vm.runInContext haengt "const"/"let"-Deklarationen NICHT als
  // Property ans Sandbox-Objekt (nur "var" wuerde das tun) -- deshalb hier per
  // Regex alle top-level "const NAME = ..." Namen einsammeln und explizit
  // ueber "this.NAME = NAME" an die Sandbox anhaengen.
  const sandbox = {};
  vm.createContext(sandbox);
  files.forEach(f => {
    const code = fs.readFileSync(f, 'utf8');
    const names = [...code.matchAll(/^\s*const\s+([A-Za-z_\$][\w\$]*)/gm)].map(m => m[1]);
    const expose = names.map(n => `this.${n} = ${n};`).join('\n');
    vm.runInContext(code + '\n' + expose, sandbox);
  });
  return sandbox;
}

function httpsGetJson(url, headers, opts) {
  opts = opts || {};
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        return httpsGetJson(res.headers.location, headers, opts).then(resolve, reject);
      }
      if (res.statusCode === 401 || res.statusCode === 403) {
        res.resume();
        const hint = opts.isEspn
          ? ' — Liga ist vermutlich privat. espn_s2/SWID-Secrets für diese Person prüfen (siehe js/status-report-config.js).'
          : '';
        return reject(new Error(`HTTP ${res.statusCode} für ${url}${hint}`));
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode} für ${url}`));
      }
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error(`Keine gültige JSON-Antwort von ${url}: ${e.message}`)); }
      });
    });
    req.on('error', reject);
    req.setTimeout(REQUEST_TIMEOUT_MS, () => {
      req.destroy(new Error(`Timeout nach ${REQUEST_TIMEOUT_MS}ms für ${url}`));
    });
  });
}

function normalizeSwid(s) {
  return (s || '').toUpperCase().replace(/[{}]/g, '');
}

// Baut die ESPN-Cookie-Header fuer eine Person. credentialKey === null/undefined
// -> Standard-Secrets ESPN_S2/SWID. Sonst -> ESPN_S2_<KEY>/SWID_<KEY>
// (KEY wird auf gueltige Env-Var-Zeichen normalisiert: A-Z0-9_).
function espnHeadersFor(person) {
  const suffix = person.credentialKey
    ? '_' + String(person.credentialKey).toUpperCase().replace(/[^A-Z0-9]/g, '_')
    : '';
  const s2 = process.env['ESPN_S2' + suffix];
  const swid = process.env['SWID' + suffix];
  const headers = { 'User-Agent': 'bear-witch-project-hq-bot', 'Accept': 'application/json' };
  const cookieParts = [];
  if (s2) cookieParts.push(`espn_s2=${s2}`);
  if (swid) cookieParts.push(`SWID=${swid}`);
  if (cookieParts.length) headers['Cookie'] = cookieParts.join('; ');
  return { headers, swid };
}

/* ---------- ESPN ---------- */

function mapEspnInjuryStatus(inj) {
  if (!inj || inj === 'ACTIVE') return null;
  const MAP = {
    QUESTIONABLE: 'Q',
    DOUBTFUL: 'D',
    OUT: 'O',
    INJURY_RESERVE: 'IR',
    SUSPENSION: 'SUSP',
    PUP: 'PUP',
    NON_FOOTBALL_INJURY: 'NFI',
  };
  return MAP[inj] || inj;
}

function mapEspnPlayer(entry, cfg, actionStatuses) {
  const pi = entry.playerPoolEntry || {};
  const p = pi.player || {};
  const name = p.fullName;
  if (!name) return null;
  const pos = cfg.ESPN_POS_MAP[p.defaultPositionId] || '?';
  const nfl = cfg.ESPN_NFL_MAP[p.proTeamId] || 'FA';
  // lineupSlotId 20=Bench, 21=IR -- alles andere zaehlt als Starter-Slot.
  const slot = entry.lineupSlotId;
  const isStarter = slot != null ? ![20, 21].includes(slot) : null;
  const status = mapEspnInjuryStatus(p.injuryStatus);
  const flag = !!(isStarter && status && actionStatuses.includes(status));
  return { name, pos, nfl, isStarter, status, flag };
}

async function fetchEspnLeague(person, leagueCfg, cfg, actionStatuses) {
  const { headers, swid } = espnHeadersFor(person);
  if (!swid) throw new Error(`SWID für "${person.label}" nicht gesetzt -- kann eigenes Team nicht per Owner-Match erkennen.`);

  const url = `https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/${leagueCfg.season}/segments/0/leagues/${leagueCfg.id}?view=mRoster&view=mTeam`;
  const data = await httpsGetJson(url, headers, { isEspn: true });
  const teams = data.teams || [];
  if (!teams.length) throw new Error('Keine Teams in ESPN-Antwort -- Liga-ID/Season prüfen.');

  const mySwid = normalizeSwid(swid);
  const myTeam = teams.find(t => (t.owners || []).some(o => normalizeSwid(o) === mySwid));
  if (!myTeam) throw new Error(`Team von "${person.label}" nicht gefunden (SWID-Match) -- espn_s2/SWID prüfen (Account eingeloggt bei fantasy.espn.com?).`);

  const entries = myTeam.roster?.entries || [];
  const players = entries.map(e => mapEspnPlayer(e, cfg, actionStatuses)).filter(Boolean);
  if (!players.length) throw new Error('Kein Kader in ESPN-Antwort für dieses Team -- sieht nach Teilantwort aus.');

  const ov = myTeam.record?.overall || {};
  return {
    id: `${person.id}-espn-${leagueCfg.id}`,
    platform: 'espn',
    owner: person.label,
    leagueName: leagueCfg.name,
    emoji: leagueCfg.emoji || '🏈',
    teamName: (myTeam.name || `${myTeam.location || ''} ${myTeam.nickname || ''}`).trim(),
    record: `${ov.wins || 0}-${ov.losses || 0}-${ov.ties || 0}`,
    players,
    flaggedCount: players.filter(p => p.flag).length,
  };
}

/* ---------- Sleeper ---------- */

function mapSleeperInjuryStatus(inj) {
  if (!inj) return null;
  const MAP = { Questionable: 'Q', Doubtful: 'D', Out: 'O', IR: 'IR', PUP: 'PUP', Suspended: 'SUSP', NA: 'O' };
  return MAP[inj] || inj.toUpperCase().slice(0, 4);
}

function mapSleeperPlayer(pid, pdata, isStarter, actionStatuses) {
  if (!pdata) return { name: `Unbekannt (${pid})`, pos: '?', nfl: 'FA', isStarter, status: null, flag: false };
  const name = pdata.full_name || `${pdata.first_name || ''} ${pdata.last_name || ''}`.trim() || pid;
  const pos = pdata.position || (pdata.fantasy_positions && pdata.fantasy_positions[0]) || '?';
  const nfl = pdata.team || 'FA';
  const status = mapSleeperInjuryStatus(pdata.injury_status);
  const flag = !!(isStarter && status && actionStatuses.includes(status));
  return { name, pos, nfl, isStarter, status, flag };
}

const PUBLIC_HEADERS = { 'User-Agent': 'bear-witch-project-hq-bot', 'Accept': 'application/json' };

async function loadSleeperPlayersMap() {
  const cachePath = process.env.SLEEPER_PLAYERS_CACHE_PATH;
  if (cachePath && fs.existsSync(cachePath)) {
    try {
      const cached = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
      if (cached && Object.keys(cached).length > 100) {
        console.log(`Sleeper players.nfl aus Cache geladen (${cachePath}).`);
        return cached;
      }
    } catch (e) {
      console.warn(`Sleeper-Players-Cache unlesbar (${e.message}), lade frisch von der API.`);
    }
  }
  console.log('Lade Sleeper players.nfl (Referenzdaten, ~5MB, kann etwas dauern)...');
  const playersMap = await httpsGetJson('https://api.sleeper.app/v1/players/nfl', PUBLIC_HEADERS);
  if (cachePath) {
    try {
      fs.mkdirSync(path.dirname(cachePath), { recursive: true });
      fs.writeFileSync(cachePath, JSON.stringify(playersMap));
    } catch (e) {
      console.warn(`Konnte Sleeper-Players-Cache nicht schreiben: ${e.message}`);
    }
  }
  return playersMap;
}

async function fetchSleeperLeagues(person, playersMap, actionStatuses) {
  const username = person.sleeperUsername;
  const season = person.sleeperSeason;
  const user = await httpsGetJson(`https://api.sleeper.app/v1/user/${encodeURIComponent(username)}`, PUBLIC_HEADERS);
  if (!user || !user.user_id) throw new Error(`Sleeper-User "${username}" nicht gefunden.`);

  const leagues = await httpsGetJson(`https://api.sleeper.app/v1/user/${user.user_id}/leagues/nfl/${season}`, PUBLIC_HEADERS);
  if (!leagues.length) throw new Error(`Keine Sleeper-Ligen für "${username}" in Season ${season} gefunden.`);

  const results = [];
  for (const league of leagues) {
    try {
      const [rosters, users] = await Promise.all([
        httpsGetJson(`https://api.sleeper.app/v1/league/${league.league_id}/rosters`, PUBLIC_HEADERS),
        httpsGetJson(`https://api.sleeper.app/v1/league/${league.league_id}/users`, PUBLIC_HEADERS),
      ]);
      const myRoster = rosters.find(r => r.owner_id === user.user_id);
      if (!myRoster) throw new Error('Kein eigenes Roster in dieser Liga gefunden.');

      const ownerMeta = users.find(u => u.user_id === user.user_id) || {};
      const teamName = (ownerMeta.metadata && ownerMeta.metadata.team_name) || ownerMeta.display_name || username;

      const starters = new Set(myRoster.starters || []);
      const players = (myRoster.players || [])
        .map(pid => mapSleeperPlayer(pid, playersMap[pid], starters.has(pid), actionStatuses))
        .filter(Boolean);
      if (!players.length) throw new Error('Kein Kader für eigenes Team gefunden.');

      const rs = myRoster.settings || {};
      results.push({
        id: `${person.id}-sleeper-${league.league_id}`,
        platform: 'sleeper',
        owner: person.label,
        leagueName: league.name,
        emoji: '💤',
        teamName,
        record: `${rs.wins || 0}-${rs.losses || 0}-${rs.ties || 0}`,
        players,
        flaggedCount: players.filter(p => p.flag).length,
      });
    } catch (err) {
      // Einzelne Sleeper-Liga uebersprungen -- Fallback passiert in main() ueber die
      // ID, damit ein Fehler hier nicht den ganzen Sync killt.
      console.warn(`⚠️  Sleeper-Liga "${league.name}" (${league.league_id}, ${person.label}) fehlgeschlagen: ${err.message}`);
    }
  }
  return results;
}

/* ---------- Vorheriger Stand (Fallback bei Teilausfall) ---------- */

function loadPreviousLeagues() {
  if (!fs.existsSync(OUT)) return [];
  try {
    const sandbox = loadModuleSandbox([OUT]);
    return (sandbox.STATUS_REPORT_DATA && sandbox.STATUS_REPORT_DATA.leagues) || [];
  } catch (e) {
    console.warn(`Bestehende ${OUT} konnte nicht als Fallback geladen werden: ${e.message}`);
    return [];
  }
}

/* ---------- Main ---------- */

async function main() {
  const cfgSandbox = loadModuleSandbox([
    path.join(ROOT, 'js', 'espn-sync.js'),
    path.join(ROOT, 'js', 'status-report-config.js'),
  ]);
  const actionStatuses = cfgSandbox.STATUS_REPORT_ACTION_STATUSES || ['O', 'D', 'IR', 'SUSP', 'PUP', 'NFI'];
  const people = cfgSandbox.STATUS_REPORT_PEOPLE || [];
  const previousLeagues = loadPreviousLeagues();
  const previousById = {};
  previousLeagues.forEach(l => { previousById[l.id] = l; });

  const leagues = [];
  let sleeperPlayersMap = null; // lazy, einmal fuer alle Personen zusammen

  for (const person of people) {
    for (const leagueCfg of (person.espnLeagues || [])) {
      const id = `${person.id}-espn-${leagueCfg.id}`;
      try {
        const league = await fetchEspnLeague(person, leagueCfg, cfgSandbox, actionStatuses);
        leagues.push(league);
        console.log(`✓ ESPN "${leagueCfg.name}" (${person.label}): ${league.teamName}, ${league.players.length} Spieler, ${league.flaggedCount} geflaggt.`);
      } catch (err) {
        console.warn(`⚠️  ESPN-Liga "${leagueCfg.name}" (${leagueCfg.id}, ${person.label}) fehlgeschlagen: ${err.message}`);
        if (previousById[id]) {
          leagues.push({ ...previousById[id], stale: true });
          console.warn(`   -> letzten guten Stand übernommen (stale).`);
        }
      }
    }

    if (person.sleeperUsername) {
      try {
        if (!sleeperPlayersMap) sleeperPlayersMap = await loadSleeperPlayersMap();
        const sleeperLeagues = await fetchSleeperLeagues(person, sleeperPlayersMap, actionStatuses);
        sleeperLeagues.forEach(l => {
          leagues.push(l);
          console.log(`✓ Sleeper "${l.leagueName}" (${person.label}): ${l.teamName}, ${l.players.length} Spieler, ${l.flaggedCount} geflaggt.`);
        });
        // Sleeper-Ligen dieser Person, die dieses Mal (einzeln) fehlgeschlagen
        // sind, aus dem vorherigen Stand auffuellen statt verschwinden zu lassen.
        previousLeagues
          .filter(l => l.platform === 'sleeper' && l.owner === person.label && !sleeperLeagues.some(nl => nl.id === l.id))
          .forEach(l => {
            leagues.push({ ...l, stale: true });
            console.warn(`   -> Sleeper-Liga "${l.leagueName}" (${person.label}) letzten guten Stand übernommen (stale).`);
          });
      } catch (err) {
        console.warn(`⚠️  Sleeper-Sync für "${person.label}" komplett fehlgeschlagen: ${err.message}`);
        previousLeagues.filter(l => l.platform === 'sleeper' && l.owner === person.label).forEach(l => leagues.push({ ...l, stale: true }));
      }
    }
  }

  if (!leagues.length) {
    throw new Error('Keine einzige Liga erfolgreich synchronisiert -- breche ab ohne zu schreiben.');
  }

  const totalFlagged = leagues.reduce((s, l) => s + (l.flaggedCount || 0), 0);
  const staleCount = leagues.filter(l => l.stale).length;
  const payload = { generatedAt: new Date().toISOString(), leagues };

  const out = `// ============================================================
//  STATUS_REPORT_DATA — automatisch von ESPN & Sleeper synchronisiert
// ============================================================
//  AUTO-GENERIERT von scripts/sync-status-report.js über die GitHub
//  Action ".github/workflows/sync-status-report.yml". Nicht von Hand
//  editieren -- Änderungen werden beim nächsten Sync überschrieben.
// ============================================================

const STATUS_REPORT_DATA = ${JSON.stringify(payload, null, 2)};
`;

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, out, 'utf8');
  console.log(`${OUT} aktualisiert: ${leagues.length} Ligen (${staleCount} davon stale), ${totalFlagged} Spieler geflaggt.`);
}

main().catch(err => {
  console.error('Status Report Sync fehlgeschlagen:', err.message);
  process.exit(1);
});
