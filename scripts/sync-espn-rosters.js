#!/usr/bin/env node
// ============================================================
//  ESPN ROSTER SYNC (Foodball / Bear Witch Project HQ)
// ============================================================
//  Node-Aequivalent des NBA-Scripts aus Taco Tuesday HQ, umgebaut auf
//  ESPN Fantasy FOOTBALL ("ffl" statt "fba", andere Positions- und
//  Team-Maps, siehe js/espn-sync.js).
//
//  Laeuft direkt gegen den ESPN "reads"-Endpoint (kein CORS-Problem in
//  Node/GitHub Actions, anders als im Browser).
//
//  Output: data/rosters-live.js -> ROSTERS_LIVE, wird von js/app.js
//  beim Laden der Team-Seite als Basis genutzt (ersetzt/ergaenzt die
//  reinen Keeper-Daten aus data/draft2026.js).
//
//  Usage:
//    node scripts/sync-espn-rosters.js
//
//  Fuer private Ligen zusaetzlich (siehe js/espn-sync.js):
//    ESPN_S2=... SWID=... node scripts/sync-espn-rosters.js
// ============================================================

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const https = require('https');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'data', 'rosters-live.js');

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

function loadConfig() {
  const sandbox = loadModuleSandbox([path.join(ROOT, 'js', 'espn-sync.js')]);
  return {
    ESPN_LEAGUE_ID: sandbox.ESPN_LEAGUE_ID,
    ESPN_SEASON: sandbox.ESPN_SEASON,
    ESPN_POS_MAP: sandbox.ESPN_POS_MAP,
    ESPN_NFL_MAP: sandbox.ESPN_NFL_MAP,
    ESPN_TO_TEAM_ID_OVERRIDE: sandbox.ESPN_TO_TEAM_ID_OVERRIDE || {},
  };
}

function loadLeagueTeams() {
  const sandbox = loadModuleSandbox([path.join(ROOT, 'data', 'teams.js')]);
  return sandbox.LEAGUE_TEAMS;
}

function normalizeName(s) {
  return (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

function httpsGetJson(url, headers) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return httpsGetJson(res.headers.location, headers).then(resolve, reject);
      }
      if (res.statusCode === 401 || res.statusCode === 403) {
        res.resume();
        return reject(new Error(
          `HTTP ${res.statusCode} — Liga ist vermutlich privat. ` +
          `ESPN_S2 und SWID als Env-Variablen/GitHub Secrets setzen (siehe js/espn-sync.js).`
        ));
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode} für ${url}`));
      }
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error('Keine gültige JSON-Antwort von ESPN: ' + e.message)); }
      });
    }).on('error', reject);
  });
}

async function main() {
  const cfg = loadConfig();
  const leagueTeams = loadLeagueTeams();

  const headers = {
    'User-Agent': 'bear-witch-project-hq-bot',
    'Accept': 'application/json',
  };
  const cookieParts = [];
  if (process.env.ESPN_S2) cookieParts.push(`espn_s2=${process.env.ESPN_S2}`);
  if (process.env.SWID) cookieParts.push(`SWID=${process.env.SWID}`);
  if (cookieParts.length) headers['Cookie'] = cookieParts.join('; ');

  const espnUrl = `https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/${cfg.ESPN_SEASON}/segments/0/leagues/${cfg.ESPN_LEAGUE_ID}?view=mRoster&view=mTeam`;
  const data = await httpsGetJson(espnUrl, headers);
  const espnTeams = data.teams || [];
  if (!espnTeams.length) throw new Error('Keine Teams in ESPN-Antwort — Liga-ID/Saison in js/espn-sync.js prüfen.');

  // ESPN-Team -> unsere Team-ID (aus data/teams.js) mappen: erst per
  // manuellem Override, sonst per Namensvergleich (location+nickname bzw. name).
  const byNormName = {};
  leagueTeams.forEach(t => { byNormName[normalizeName(t.name)] = t.id; });

  const unmatched = [];
  const rosters = {};
  const records = {};

  espnTeams.forEach(espnTeam => {
    const espnName = (espnTeam.name || `${espnTeam.location || ''} ${espnTeam.nickname || ''}`).trim();
    const ourId = cfg.ESPN_TO_TEAM_ID_OVERRIDE[espnTeam.id] || byNormName[normalizeName(espnName)];

    if (!ourId) {
      unmatched.push(`ESPN-Team-ID ${espnTeam.id}: "${espnName}"`);
      return;
    }

    const entries = espnTeam.roster?.entries || [];
    rosters[ourId] = entries.map(entry => {
      const pi = entry.playerPoolEntry || {};
      const p = pi.player || {};
      const name = p.fullName || null;
      if (!name) return null;
      const pos = cfg.ESPN_POS_MAP[p.defaultPositionId] || '?';
      const nflTeam = cfg.ESPN_NFL_MAP[p.proTeamId] || 'FA';
      const player = { name, pos, nfl: nflTeam };
      // lineupSlotId 20=Bench, 21=IR -- alles andere zaehlt als Starter-Slot
      const slot = entry.lineupSlotId;
      player.isStarter = slot != null ? ![20, 21].includes(slot) : null;
      const inj = p.injuryStatus;
      if (inj && inj !== 'ACTIVE') {
        player.status = inj === 'QUESTIONABLE' ? 'Q'
                       : inj === 'OUT' ? 'O'
                       : inj === 'DOUBTFUL' ? 'D'
                       : inj === 'INJURY_RESERVE' ? 'IR'
                       : inj;
      }
      return player;
    }).filter(Boolean);

    const ov = espnTeam.record?.overall || {};
    records[ourId] = `${ov.wins || 0}-${ov.losses || 0}-${ov.ties || 0}`;
  });

  if (unmatched.length) {
    console.warn('⚠️  Nicht zugeordnete ESPN-Teams (bitte ESPN_TO_TEAM_ID_OVERRIDE in js/espn-sync.js ergänzen):');
    unmatched.forEach(u => console.warn('   - ' + u));
  }

  const totalPlayers = Object.values(rosters).reduce((s, r) => s + r.length, 0);
  if (totalPlayers < 50) {
    throw new Error(`Nur ${totalPlayers} Spieler in ESPN-Antwort gefunden — sieht nach Teil-/Fehlantwort aus, breche ab ohne zu schreiben.`);
  }

  const now = new Date().toISOString();
  const rosterLines = Object.keys(rosters).sort().map(tid => {
    const players = rosters[tid].map(p => JSON.stringify(p)).join(', ');
    return `  "${tid}": [${players}]`;
  });

  const out = `// ============================================================
//  ROSTERS_LIVE — automatisch von ESPN synchronisiert
// ============================================================
//  AUTO-GENERIERT von scripts/sync-espn-rosters.js über die GitHub
//  Action ".github/workflows/sync-espn-rosters.yml". Nicht von Hand
//  editieren — Änderungen werden beim nächsten Sync überschrieben.
//  Zuletzt synchronisiert: ${now}
// ============================================================

const ROSTERS_LIVE = {
${rosterLines.join(',\n')}
};

const TEAM_RECORDS_LIVE = {
  season: ${cfg.ESPN_SEASON},
  records: ${JSON.stringify(records)}
};
`;

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, out, 'utf8');
  console.log(`${OUT} aktualisiert: ${totalPlayers} Spieler über ${Object.keys(rosters).length} Teams.`);
}

main().catch(err => {
  console.error('ESPN Roster Sync fehlgeschlagen:', err.message);
  // Non-fatal: letzter guter Stand von data/rosters-live.js bleibt erhalten.
  process.exit(1); // sichtbarer Fehlschlag in der Action, statt still gruen zu bleiben
});
