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
const { loadFrozenWeeks, frozenRecord } = require('./lib/frozen-weeks');

// ESPN-Draft-Reset 23.09.2026: Foodball (91260355) zaehlt auf ESPN erst ab W3.
// Fuer die Bilanz werden W1/W2 aus data/frozen-weeks-2026.js draufaddiert.
const FOODBALL_LEAGUE_ID = 91260355;
function foodballFrozenOffset(leagueCfg, teamName) {
  if (Number(leagueCfg.id) !== FOODBALL_LEAGUE_ID) return { wins: 0, losses: 0, ties: 0 };
  const frozen = loadFrozenWeeks(leagueCfg.season);
  if (!frozen) return { wins: 0, losses: 0, ties: 0 };
  const sb = {}; vm.createContext(sb);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'data', 'teams.js'), 'utf8') + '\nthis.LEAGUE_TEAMS = LEAGUE_TEAMS;', sb);
  const norm = x => (x || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const t = (sb.LEAGUE_TEAMS || []).find(t => norm(t.name) === norm(teamName));
  return t ? frozenRecord(frozen, t.id) : { wins: 0, losses: 0, ties: 0 };
}

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

// credentialKey === null/undefined -> Standard-Secrets ESPN_S2/SWID.
// Sonst -> ESPN_S2_<KEY>/SWID_<KEY> (KEY auf gueltige Env-Var-Zeichen normalisiert).
function envSuffix(credentialKey) {
  return credentialKey ? '_' + String(credentialKey).toUpperCase().replace(/[^A-Z0-9]/g, '_') : '';
}

// Baut die ESPN-Cookie-Header fuer den angegebenen Credential-Key (wer sich
// bei ESPN "einloggt", um die Liga ueberhaupt lesen zu duerfen).
function espnHeadersFor(credentialKey) {
  const suffix = envSuffix(credentialKey);
  const s2 = process.env['ESPN_S2' + suffix];
  const swid = process.env['SWID' + suffix];
  const headers = { 'User-Agent': 'bear-witch-project-hq-bot', 'Accept': 'application/json' };
  const cookieParts = [];
  if (s2) cookieParts.push(`espn_s2=${s2}`);
  if (swid) cookieParts.push(`SWID=${swid}`);
  if (cookieParts.length) headers['Cookie'] = cookieParts.join('; ');
  return headers;
}

// Liefert nur die SWID fuer den angegebenen Credential-Key (wird benutzt, um
// IN den (mit wessen Cookies auch immer abgerufenen) Liga-Daten das richtige
// Team per Owner-Match zu FINDEN -- unabhaengig davon, wessen Login den
// eigentlichen HTTP-Request gemacht hat. So kann z.B. Felix' Team in einer
// Liga erkannt werden, die mit Beyaz' Cookies abgerufen wurde, solange
// Felix' SWID (SWID_FELIX) als Secret hinterlegt ist -- sein espn_s2 wird
// dafuer NICHT gebraucht.
function identitySwidFor(credentialKey) {
  return process.env['SWID' + envSuffix(credentialKey)];
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

function round1(n) { return Math.round(n * 10) / 10; }

// Welche Wochen eines Teams schon gespielt wurden -- genau wie in
// scripts/sync-espn-weekly-scores.js: "gespielt" = mind. eine Seite hat
// totalPoints > 0. Kommt aus derselben mRoster+mTeam-Antwort (mit
// zusaetzlich angefragtem view=mMatchupScore), braucht also KEINEN
// weiteren Request.
function playedWeeksForTeam(schedule, teamId) {
  const weeks = new Set();
  (schedule || []).forEach(m => {
    if (!m.home || !m.away) return;
    if (m.home.teamId !== teamId && m.away.teamId !== teamId) return;
    if (m.home.totalPoints > 0 || m.away.totalPoints > 0) weeks.add(m.matchupPeriodId);
  });
  return [...weeks].sort((a, b) => a - b);
}

// Gecacht ueber alle Personen/Ligen eines Laufs hinweg: derselbe
// Liga-Boxscore einer Woche ist fuer jede Person in derselben Liga
// identisch (gemeinsame Ligen wie bei Felix), daher pro
// authKey+leagueId+season+week nur EINMAL abrufen.
const _espnBoxscoreCache = new Map();

// Identisch zur bewaehrten Methode aus scripts/sync-espn-player-stats.js:
// appliedStatTotal direkt am Roster-Eintrag ist der primaere Weg, das
// stats-Array (statSourceId=0, statSplitTypeId=1) ist der Fallback.
async function getEspnWeekBoxscoreMap(headers, leagueId, season, week, cacheKey) {
  const key = `${cacheKey}|box|${week}`;
  if (_espnBoxscoreCache.has(key)) return _espnBoxscoreCache.get(key);
  const url = `https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/${season}/segments/0/leagues/${leagueId}?view=mBoxscore&view=mMatchupScore&scoringPeriodId=${week}`;
  const map = new Map();
  try {
    const data = await httpsGetJson(url, headers, { isEspn: true });
    (data.schedule || []).forEach(matchup => {
      if (matchup.matchupPeriodId !== week) return;
      ['home', 'away'].forEach(side => {
        const teamSide = matchup[side];
        if (!teamSide) return;
        const entries = teamSide.rosterForCurrentScoringPeriod?.entries || [];
        entries.forEach(entry => {
          const p = entry.playerPoolEntry?.player;
          if (!p || !p.fullName) return;
          let pts = entry.playerPoolEntry?.appliedStatTotal;
          if (typeof pts !== 'number') {
            const stats = p.stats || [];
            const match = stats.find(s => s.statSourceId === 0 && s.statSplitTypeId === 1 && s.scoringPeriodId === week);
            pts = match ? (match.appliedTotal || 0) : null;
          }
          if (pts != null) map.set(p.fullName, round1(pts));
        });
      });
    });
  } catch (err) {
    console.warn(`   ⚠️  Boxscore Woche ${week} (Liga ${leagueId}) nicht abrufbar (best effort, Punkte bleiben leer): ${err.message}`);
  }
  _espnBoxscoreCache.set(key, map);
  return map;
}

// Ebenfalls gecacht (siehe oben) -- ein voller kona_player_info-Abruf
// deckt ALLE Spieler der Liga ab und wird per Namen nachgeschlagen, so
// dass sich auch mehrere Personen in derselben Liga einen Abruf teilen.
const _espnProjectionsCache = new Map();

// Siehe scripts/sync-espn-projections.js: kona_player_info liefert nur bei
// PROJEKTIONEN (statSourceId=1) eine Wochenaufschluesselung. Wir fragen
// hier gezielt die Projektion fuer eine bestimmte Woche (targetWeek) ab.
async function getEspnWeekProjectionsMap(headers, leagueId, season, targetWeek, cacheKey) {
  const key = `${cacheKey}|proj|${targetWeek}`;
  if (_espnProjectionsCache.has(key)) return _espnProjectionsCache.get(key);
  const filterHeaders = Object.assign({}, headers, {
    'x-fantasy-filter': JSON.stringify({
      players: { limit: 800, sortDraftRanks: { sortPriority: 1, sortAsc: true, value: 'STANDARD' } },
    }),
  });
  const url = `https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/${season}/segments/0/leagues/${leagueId}?view=kona_player_info`;
  const map = new Map();
  try {
    const data = await httpsGetJson(url, filterHeaders, { isEspn: true });
    (data.players || []).forEach(entry => {
      const p = entry.player || {};
      if (!p.fullName) return;
      const stat = (p.stats || []).find(s => s.statSourceId === 1 && s.statSplitTypeId === 1 && s.scoringPeriodId === targetWeek);
      if (stat && typeof stat.appliedTotal === 'number') map.set(p.fullName, round1(stat.appliedTotal));
    });
  } catch (err) {
    console.warn(`   ⚠️  Projektionen Woche ${targetWeek} (Liga ${leagueId}) nicht abrufbar (best effort, Projektion bleibt leer): ${err.message}`);
  }
  _espnProjectionsCache.set(key, map);
  return map;
}

async function fetchEspnLeague(person, leagueCfg, cfg, actionStatuses) {
  // Wessen Cookies fuer den Request: Liga-Override > Person-Default > Standard-Secrets.
  const authKey = leagueCfg.credentialKey !== undefined ? leagueCfg.credentialKey : person.credentialKey;
  const headers = espnHeadersFor(authKey);

  // Wessen SWID zum Erkennen des Teams: Liga-Override > Person-Default (identityCredentialKey)
  // > derselbe Key wie fuer den Request (Normalfall: eigene Liga, eigener Login).
  const identityKey = leagueCfg.identityCredentialKey !== undefined ? leagueCfg.identityCredentialKey
    : (person.identityCredentialKey !== undefined ? person.identityCredentialKey : authKey);
  const identitySwid = identitySwidFor(identityKey);
  if (!identitySwid) throw new Error(`SWID für "${person.label}" nicht gesetzt -- kann Team nicht per Owner-Match erkennen.`);

  const url = `https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/${leagueCfg.season}/segments/0/leagues/${leagueCfg.id}?view=mRoster&view=mTeam&view=mMatchupScore`;
  const data = await httpsGetJson(url, headers, { isEspn: true });
  const teams = data.teams || [];
  if (!teams.length) throw new Error('Keine Teams in ESPN-Antwort -- Liga-ID/Season prüfen.');

  const mySwid = normalizeSwid(identitySwid);
  const myTeam = teams.find(t => (t.owners || []).some(o => normalizeSwid(o) === mySwid));
  if (!myTeam) throw new Error(`Team von "${person.label}" nicht gefunden (SWID-Match) -- espn_s2/SWID prüfen (Account eingeloggt bei fantasy.espn.com? Ist "${person.label}" wirklich Mitglied dieser Liga?).`);

  const entries = myTeam.roster?.entries || [];
  const players = entries.map(e => mapEspnPlayer(e, cfg, actionStatuses)).filter(Boolean);
  if (!players.length) throw new Error('Kein Kader in ESPN-Antwort für dieses Team -- sieht nach Teilantwort aus.');

  // Vergangene Produktion (letztes Spiel, letzte 3 Spiele) + Projektion fuer
  // die kommende Woche -- best effort, siehe Kommentare an den Helper-
  // Funktionen. Ein Fehler hier lässt den Rest der Liga (Roster/Status)
  // unangetastet, es fehlen dann nur die Stats-Spalten.
  const cacheKey = `${authKey || '_default'}|${leagueCfg.id}|${leagueCfg.season}`;
  const playedWeeks = playedWeeksForTeam(data.schedule, myTeam.id);
  const lastWeek = playedWeeks[playedWeeks.length - 1] || null;
  const last3Weeks = playedWeeks.slice(-3);
  const targetWeek = lastWeek ? lastWeek + 1 : 1;

  try {
    const weekMaps = new Map(); // week -> Map(name -> points)
    for (const w of last3Weeks) {
      weekMaps.set(w, await getEspnWeekBoxscoreMap(headers, leagueCfg.id, leagueCfg.season, w, cacheKey));
    }
    const projMap = await getEspnWeekProjectionsMap(headers, leagueCfg.id, leagueCfg.season, targetWeek, cacheKey);

    players.forEach(pl => {
      const lastMap = lastWeek ? weekMaps.get(lastWeek) : null;
      pl.lastGamePoints = lastMap && lastMap.has(pl.name) ? lastMap.get(pl.name) : null;

      const last3Values = last3Weeks
        .map(w => weekMaps.get(w))
        .filter(Boolean)
        .map(m => m.get(pl.name))
        .filter(v => v != null);
      pl.last3AvgPoints = last3Values.length ? round1(last3Values.reduce((a, b) => a + b, 0) / last3Values.length) : null;

      pl.projPoints = projMap.has(pl.name) ? projMap.get(pl.name) : null;
    });
  } catch (err) {
    // Sollte durch die try/catches in den Helper-Funktionen eigentlich nie
    // hier ankommen, aber sicher ist sicher: lieber Roster ohne Stats-
    // Spalten als gar keinen Sync-Erfolg fuer diese Liga.
    console.warn(`   ⚠️  Stats/Projektionen für "${leagueCfg.name}" (${person.label}) übersprungen: ${err.message}`);
  }

  const ov = myTeam.record?.overall || {};
  const myTeamName = (myTeam.name || `${myTeam.location || ''} ${myTeam.nickname || ''}`).trim();
  const fr = foodballFrozenOffset(leagueCfg, myTeamName);
  return {
    id: `${person.id}-espn-${leagueCfg.id}`,
    platform: 'espn',
    owner: person.label,
    leagueName: leagueCfg.name,
    emoji: leagueCfg.emoji || '🏈',
    teamName: (myTeam.name || `${myTeam.location || ''} ${myTeam.nickname || ''}`).trim(),
    record: `${(ov.wins || 0) + fr.wins}-${(ov.losses || 0) + fr.losses}-${(ov.ties || 0) + fr.ties}`,
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

function mapSleeperPlayer(pid, pdata, isStarter, actionStatuses, statsWeeks, scoreField) {
  const lastGamePoints = _sleeperPointsFor(pid, statsWeeks.lastMap, scoreField);
  const last3Values = statsWeeks.last3Maps
    .map(m => _sleeperPointsFor(pid, m, scoreField))
    .filter(v => v != null);
  const last3AvgPoints = last3Values.length ? round1(last3Values.reduce((a, b) => a + b, 0) / last3Values.length) : null;
  const projPoints = _sleeperPointsFor(pid, statsWeeks.projMap, scoreField);

  if (!pdata) {
    return { name: `Unbekannt (${pid})`, pos: '?', nfl: 'FA', isStarter, status: null, flag: false, lastGamePoints, last3AvgPoints, projPoints };
  }
  const name = pdata.full_name || `${pdata.first_name || ''} ${pdata.last_name || ''}`.trim() || pid;
  const pos = pdata.position || (pdata.fantasy_positions && pdata.fantasy_positions[0]) || '?';
  const nfl = pdata.team || 'FA';
  const status = mapSleeperInjuryStatus(pdata.injury_status);
  const flag = !!(isStarter && status && actionStatuses.includes(status));
  return { name, pos, nfl, isStarter, status, flag, lastGamePoints, last3AvgPoints, projPoints };
}

function _sleeperPointsFor(pid, weekMap, scoreField) {
  if (!weekMap) return null;
  const entry = weekMap[pid];
  if (!entry) return null;
  const v = entry[scoreField];
  return typeof v === 'number' ? round1(v) : null;
}

// Sleeper hat keine liga-eigenen Fantasy-Punkte in stats/projections --
// die Endpunkte liefern vorgerechnete Standard-Werte fuer PPR/Half-PPR/
// Standard. Wir waehlen anhand der Liga-Scoring-Settings (reception
// points) das naechstliegende Feld -- eine Annaeherung, keine exakte
// Umrechnung der individuellen Liga-Scoring-Regeln.
function sleeperScoreField(league) {
  const rec = league.scoring_settings && league.scoring_settings.rec;
  if (rec === 1) return 'pts_ppr';
  if (rec === 0.5) return 'pts_half_ppr';
  return 'pts_std';
}

const PUBLIC_HEADERS = { 'User-Agent': 'bear-witch-project-hq-bot', 'Accept': 'application/json' };

// Gecacht ueber den ganzen Lauf: Sleeper-Wochenstats/-Projektionen sind
// season-/week-weit identisch fuer alle Ligen und Personen.
const _sleeperWeekStatsCache = new Map();
const _sleeperWeekProjCache = new Map();

async function getSleeperWeekStats(season, week) {
  const key = `${season}|${week}`;
  if (_sleeperWeekStatsCache.has(key)) return _sleeperWeekStatsCache.get(key);
  let map = {};
  try {
    map = await httpsGetJson(`https://api.sleeper.app/v1/stats/nfl/regular/${season}/${week}`, PUBLIC_HEADERS);
  } catch (err) {
    console.warn(`   ⚠️  Sleeper-Stats Woche ${week} nicht abrufbar (best effort): ${err.message}`);
  }
  _sleeperWeekStatsCache.set(key, map || {});
  return map || {};
}

async function getSleeperWeekProjections(season, week) {
  const key = `${season}|${week}`;
  if (_sleeperWeekProjCache.has(key)) return _sleeperWeekProjCache.get(key);
  let map = {};
  try {
    map = await httpsGetJson(`https://api.sleeper.app/v1/projections/nfl/regular/${season}/${week}`, PUBLIC_HEADERS);
  } catch (err) {
    console.warn(`   ⚠️  Sleeper-Projektionen Woche ${week} nicht abrufbar (best effort): ${err.message}`);
  }
  _sleeperWeekProjCache.set(key, map || {});
  return map || {};
}

let _sleeperCurrentWeek = null; // einmal pro Lauf ermittelt
async function getSleeperCurrentWeek() {
  if (_sleeperCurrentWeek != null) return _sleeperCurrentWeek;
  try {
    const state = await httpsGetJson('https://api.sleeper.app/v1/state/nfl', PUBLIC_HEADERS);
    _sleeperCurrentWeek = (state && state.week) || 1;
  } catch (err) {
    console.warn(`   ⚠️  Sleeper NFL-State nicht abrufbar, nehme Woche 1 an: ${err.message}`);
    _sleeperCurrentWeek = 1;
  }
  return _sleeperCurrentWeek;
}

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

  const currentWeek = await getSleeperCurrentWeek();
  const lastWeek = currentWeek > 1 ? currentWeek - 1 : null;
  const last3Weeks = lastWeek ? [lastWeek - 2, lastWeek - 1, lastWeek].filter(w => w >= 1) : [];
  const targetWeek = currentWeek;

  const lastMap = lastWeek ? await getSleeperWeekStats(season, lastWeek) : null;
  const last3Maps = [];
  for (const w of last3Weeks) last3Maps.push(await getSleeperWeekStats(season, w));
  const projMap = await getSleeperWeekProjections(season, targetWeek);
  const statsWeeks = { lastMap, last3Maps, projMap };

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
      const scoreField = sleeperScoreField(league);

      const starters = new Set(myRoster.starters || []);
      const players = (myRoster.players || [])
        .map(pid => mapSleeperPlayer(pid, playersMap[pid], starters.has(pid), actionStatuses, statsWeeks, scoreField))
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
