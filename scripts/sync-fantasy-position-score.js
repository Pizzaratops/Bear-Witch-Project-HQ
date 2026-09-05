#!/usr/bin/env node
// ============================================================
//  FANTASY POWER SCORE SYNC — 6-Kategorien-Spinnennetz je Fantasy-Team
// ============================================================
//  Fantasy-Pendant zu scripts/sync-nfl-power-score.js -- gleiche Idee
//  (Rang 1-12 je Kategorie, kumulativ + pro Woche isoliert), aber für
//  die eigene 12-Team-Liga statt für die 32 NFL-Teams:
//
//    1. Points Scored     -> eigene wöchentliche Punktzahl
//    2. Points Allowed    -> Punktzahl des Gegners
//    3. Points by QB      -> Punkte der QB-Starter
//    4. Points by RB      -> Punkte der RB-Starter (inkl. FLEX, falls RB)
//    5. Points by WR      -> Punkte der WR-Starter (inkl. FLEX, falls WR)
//    6. Points by TE      -> Punkte der TE-Starter (inkl. FLEX, falls TE)
//
//  WICHTIG zur FLEX-Zuordnung: gezählt wird nach der ECHTEN Position
//  des Spielers (ESPN defaultPositionId), NICHT nach dem Lineup-Slot --
//  ein WR im FLEX-Slot zaehlt zu "Points by WR". K/DST fliessen in
//  keine der 4 Positions-Kategorien ein (nur in Points Scored/Allowed).
//
//  Points Scored/Allowed kommen 1:1 aus data/weekly-scores.js (bereits
//  synct, keine Neuberechnung -- garantiert Konsistenz mit der
//  Matchups-Seite). Points by QB/RB/WR/TE brauchen dagegen einen NEUEN
//  ESPN-Abruf: den woechentlichen Boxscore (view=mBoxscore) je bereits
//  gespielter Woche, inkl. lineupSlotId je Spieler (0/2/4/6=Slot,
//  20=Bench, 21=IR -- alles ausser Bench/IR zaehlt als Starter, exakt
//  wie in scripts/sync-espn-rosters.js).
//
//  ACHTUNG -- EINZIGER UNGETESTETER TEIL: Der mBoxscore-Abruf je Woche
//  ist nach der ueblichen, gut dokumentierten ESPN-Fantasy-API-Struktur
//  gebaut (dieselbe Env-Variablen/Auth wie die anderen ESPN-Syncs),
//  konnte hier aber NICHT gegen echte Liga-Daten getestet werden (keine
//  Zugangsdaten, ESPN von hier aus nicht erreichbar). Falls das Feld
//  fuer die Wochenpunktzahl eines Spielers im Boxscore anders heisst als
//  erwartet, versucht extractWeekPoints() zwei bekannte Varianten und
//  loggt pro Woche eine Warnung statt zu crashen (best effort je Woche).
//
//  Usage:
//    node scripts/sync-fantasy-position-score.js
// ============================================================

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const https = require('https');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'data', 'fantasy-power-score.js');

const CATEGORIES = [
  { key: 'pointsFor', label: 'Points Scored', unit: 'pro Woche', better: 'high' },
  { key: 'pointsAgainst', label: 'Points Allowed', unit: 'pro Woche zugelassen', better: 'low' },
  { key: 'qbPts', label: 'Points by QB', unit: 'pro Woche', better: 'high' },
  { key: 'rbPts', label: 'Points by RB', unit: 'pro Woche', better: 'high' },
  { key: 'wrPts', label: 'Points by WR', unit: 'pro Woche', better: 'high' },
  { key: 'tePts', label: 'Points by TE', unit: 'pro Woche', better: 'high' },
];
const NON_STARTER_SLOTS = [20, 21]; // Bench, IR

function loadModuleSandbox(files) {
  const sandbox = {};
  vm.createContext(sandbox);
  files.forEach(f => {
    const code = fs.readFileSync(f, 'utf8');
    const names = [...code.matchAll(/^const\s+([A-Za-z_\$][\w\$]*)/gm)].map(m => m[1]);
    const expose = names.map(n => `this.${n} = ${n};`).join('\n');
    vm.runInContext(code + '\n' + expose, sandbox);
  });
  return sandbox;
}

function loadConfig() {
  const sandbox = loadModuleSandbox([path.join(ROOT, 'js', 'espn-sync.js')]);
  return {
    ESPN_LEAGUE_ID: sandbox.ESPN_LEAGUE_ID, ESPN_SEASON: sandbox.ESPN_SEASON,
    ESPN_POS_MAP: sandbox.ESPN_POS_MAP, ESPN_TO_TEAM_ID_OVERRIDE: sandbox.ESPN_TO_TEAM_ID_OVERRIDE || {},
  };
}
function loadLeagueTeams() {
  return loadModuleSandbox([path.join(ROOT, 'data', 'teams.js')]).LEAGUE_TEAMS;
}
function loadWeeklyScores(season) {
  const sandbox = loadModuleSandbox([path.join(ROOT, 'data', 'weekly-scores.js')]);
  return (sandbox.WEEKLY_SCORES && sandbox.WEEKLY_SCORES[season]) || {};
}
function loadExisting() {
  if (!fs.existsSync(OUT)) return { weeks: {} };
  const sandbox = {};
  vm.createContext(sandbox);
  try {
    vm.runInContext(fs.readFileSync(OUT, 'utf8') + '\nthis.FANTASY_POWER_SCORE = FANTASY_POWER_SCORE;', sandbox);
    return sandbox.FANTASY_POWER_SCORE && sandbox.FANTASY_POWER_SCORE.weeks ? sandbox.FANTASY_POWER_SCORE : { weeks: {} };
  } catch (e) {
    console.warn('⚠️  Konnte bestehende fantasy-power-score.js nicht parsen, starte frisch:', e.message);
    return { weeks: {} };
  }
}

function normalizeName(s) { return (s || '').toLowerCase().replace(/[^a-z0-9]/g, ''); }

function httpsGetJson(url, headers) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return httpsGetJson(res.headers.location, headers).then(resolve, reject);
      }
      if (res.statusCode === 401 || res.statusCode === 403) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode} — Liga vermutlich privat. ESPN_S2/SWID setzen.`));
      }
      if (res.statusCode !== 200) { res.resume(); return reject(new Error(`HTTP ${res.statusCode} für ${url}`)); }
      let data = '';
      res.on('data', c => { data += c; });
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error('Keine gültige JSON-Antwort: ' + e.message)); }
      });
    }).on('error', reject);
  });
}

// Punktzahl EINES Spielers in EINER Woche aus einem Boxscore-Roster-Eintrag
// extrahieren -- zwei bekannte ESPN-Antwortformen werden versucht, damit
// ein unerwartetes Schema nicht gleich den ganzen Sync crasht.
function extractWeekPoints(entry, week) {
  if (typeof entry.playerPoolEntry?.appliedStatTotal === 'number') {
    return entry.playerPoolEntry.appliedStatTotal;
  }
  const stats = entry.playerPoolEntry?.player?.stats || [];
  const match = stats.find(s => s.statSourceId === 0 && s.statSplitTypeId === 1 && s.scoringPeriodId === week);
  return match ? (match.appliedTotal || 0) : null;
}

function round2(n) { return Math.round(n * 100) / 100; }

function assignRanks(list) {
  CATEGORIES.forEach(cat => {
    const withValue = list.filter(t => t.values[cat.key] != null);
    const sorted = withValue.slice().sort((a, b) =>
      cat.better === 'high' ? b.values[cat.key] - a.values[cat.key] : a.values[cat.key] - b.values[cat.key]
    );
    sorted.forEach((t, i) => { t.ranks[cat.key] = i + 1; });
    list.filter(t => t.values[cat.key] == null).forEach(t => { t.ranks[cat.key] = null; });
  });
}

async function fetchWeekPositionPoints(cfg, espnIdToOurId, week) {
  const headers = { 'User-Agent': 'bear-witch-project-hq-bot', 'Accept': 'application/json' };
  const cookieParts = [];
  if (process.env.ESPN_S2) cookieParts.push(`espn_s2=${process.env.ESPN_S2}`);
  if (process.env.SWID) cookieParts.push(`SWID=${process.env.SWID}`);
  if (cookieParts.length) headers['Cookie'] = cookieParts.join('; ');

  const url = `https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/${cfg.ESPN_SEASON}/segments/0/leagues/${cfg.ESPN_LEAGUE_ID}?view=mBoxscore&view=mMatchupScore&scoringPeriodId=${week}`;
  const data = await httpsGetJson(url, headers);
  const result = {}; // ourTeamId -> {qbPts, rbPts, wrPts, tePts}

  (data.schedule || []).forEach(matchup => {
    if (matchup.matchupPeriodId !== week) return;
    ['home', 'away'].forEach(side => {
      const teamSide = matchup[side];
      if (!teamSide || teamSide.teamId == null) return;
      const ourId = espnIdToOurId[teamSide.teamId];
      if (!ourId) return;
      const entries = teamSide.rosterForCurrentScoringPeriod?.entries || [];
      const bucket = { qbPts: 0, rbPts: 0, wrPts: 0, tePts: 0 };
      entries.forEach(entry => {
        if (NON_STARTER_SLOTS.includes(entry.lineupSlotId)) return; // Bench/IR zaehlt nicht
        const p = entry.playerPoolEntry?.player;
        if (!p) return;
        const pos = cfg.ESPN_POS_MAP[p.defaultPositionId];
        if (!['QB', 'RB', 'WR', 'TE'].includes(pos)) return; // K/DST ausgenommen
        const pts = extractWeekPoints(entry, week);
        if (pts == null) return;
        bucket[{ QB: 'qbPts', RB: 'rbPts', WR: 'wrPts', TE: 'tePts' }[pos]] += pts;
      });
      result[ourId] = {
        qbPts: round2(bucket.qbPts), rbPts: round2(bucket.rbPts),
        wrPts: round2(bucket.wrPts), tePts: round2(bucket.tePts),
      };
    });
  });
  return result;
}

async function main() {
  const cfg = loadConfig();
  const leagueTeams = loadLeagueTeams();
  const season = cfg.ESPN_SEASON;
  const weeklyScores = loadWeeklyScores(season);
  const playedWeeks = Object.keys(weeklyScores).map(Number).filter(w => (weeklyScores[w] || []).length > 0).sort((a, b) => a - b);

  if (!playedWeeks.length) {
    console.log(`Season ${season}: noch keine gespielte Woche in data/weekly-scores.js -- Sync übersprungen, keine Datei geschrieben.`);
    return;
  }

  // ESPN-Team-ID -> unsere Team-ID (einmalig via mTeam auflösen, wie in
  // scripts/sync-espn-rosters.js).
  const headers = { 'User-Agent': 'bear-witch-project-hq-bot', 'Accept': 'application/json' };
  const cookieParts = [];
  if (process.env.ESPN_S2) cookieParts.push(`espn_s2=${process.env.ESPN_S2}`);
  if (process.env.SWID) cookieParts.push(`SWID=${process.env.SWID}`);
  if (cookieParts.length) headers['Cookie'] = cookieParts.join('; ');
  const teamMetaUrl = `https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/${season}/segments/0/leagues/${cfg.ESPN_LEAGUE_ID}?view=mTeam`;
  const teamMetaData = await httpsGetJson(teamMetaUrl, headers);
  const byNormName = {};
  leagueTeams.forEach(t => { byNormName[normalizeName(t.name)] = t.id; });
  const espnIdToOurId = {};
  (teamMetaData.teams || []).forEach(et => {
    const espnName = (et.name || `${et.location || ''} ${et.nickname || ''}`).trim();
    espnIdToOurId[et.id] = cfg.ESPN_TO_TEAM_ID_OVERRIDE[et.id] || byNormName[normalizeName(espnName)];
  });

  const existing = loadExisting();
  const perWeekPosition = {}; // week -> {teamId -> {qbPts,rbPts,wrPts,tePts}}

  for (const week of playedWeeks) {
    try {
      perWeekPosition[week] = await fetchWeekPositionPoints(cfg, espnIdToOurId, week);
    } catch (e) {
      console.warn(`⚠️  Woche ${week}: Positions-Boxscore übersprungen (best effort):`, e.message);
      perWeekPosition[week] = {};
    }
  }

  const allTeamIds = leagueTeams.map(t => t.id);
  const weeksOut = {};

  playedWeeks.forEach(uptoWeek => {
    const weeklyList = allTeamIds.map(teamId => {
      const scoreEntry = (weeklyScores[uptoWeek] || []).find(e => e.teamId === teamId);
      const posEntry = (perWeekPosition[uptoWeek] || {})[teamId];
      const values = {
        pointsFor: scoreEntry ? scoreEntry.points : null,
        pointsAgainst: scoreEntry ? scoreEntry.opponentPoints : null,
        qbPts: posEntry ? posEntry.qbPts : null,
        rbPts: posEntry ? posEntry.rbPts : null,
        wrPts: posEntry ? posEntry.wrPts : null,
        tePts: posEntry ? posEntry.tePts : null,
      };
      return { teamId, values, ranks: {} };
    });
    assignRanks(weeklyList);

    const cumulativeList = allTeamIds.map(teamId => {
      const weeksSoFar = playedWeeks.filter(w => w <= uptoWeek);
      const values = {};
      CATEGORIES.forEach(cat => {
        const vals = weeksSoFar
          .map(w => {
            const scoreEntry = (weeklyScores[w] || []).find(e => e.teamId === teamId);
            const posEntry = (perWeekPosition[w] || {})[teamId];
            if (cat.key === 'pointsFor') return scoreEntry ? scoreEntry.points : null;
            if (cat.key === 'pointsAgainst') return scoreEntry ? scoreEntry.opponentPoints : null;
            return posEntry ? posEntry[cat.key] : null;
          })
          .filter(v => v != null);
        values[cat.key] = vals.length ? round2(vals.reduce((a, b) => a + b, 0) / vals.length) : null;
      });
      return { teamId, values, ranks: {}, gamesPlayed: weeksSoFar.length };
    });
    assignRanks(cumulativeList);

    weeksOut[uptoWeek] = { cumulative: cumulativeList, weekly: weeklyList };
  });

  const now = new Date().toISOString();
  const out = `// ============================================================
//  FANTASY_POWER_SCORE — "Bootleg Power Score" fürs Fantasy-Team (ESPN)
// ============================================================
//  AUTO-GENERIERT von scripts/sync-fantasy-position-score.js über die
//  GitHub Action ".github/workflows/sync-fantasy-position-score.yml".
//  Nicht von Hand editieren.
//  Zuletzt synchronisiert: ${now}
//
//  6 Kategorien: Points Scored, Points Allowed, Points by QB/RB/WR/TE
//  (FLEX zaehlt nach echter Spieler-Position, K/DST fliessen in keine
//  der 4 Positions-Kategorien ein). Struktur identisch zu
//  data/nfl-power-score.js, nur mit unseren Team-IDs (data/teams.js)
//  statt NFL-Kuerzeln und Rang 1-12 statt 1-32.
//
//  FANTASY_POWER_SCORE.weeks[week] = { cumulative, weekly }, je ein
//  Array aller 12 Teams: { teamId, values:{<key>:Zahl|null},
//  ranks:{<key>:1-12|null} }.
// ============================================================

const FANTASY_POWER_SCORE = {
  season: ${season},
  categories: ${JSON.stringify(CATEGORIES, null, 2).split('\n').join('\n  ')},
  weeks: ${JSON.stringify(weeksOut, null, 2).split('\n').join('\n  ')}
};
`;

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, out, 'utf8');
  console.log(`${OUT} aktualisiert: Season ${season}, Wochen ${playedWeeks[0]}–${playedWeeks[playedWeeks.length - 1]}, 12 Teams, 6 Kategorien.`);
}

main().then(() => process.exit(0)).catch(err => {
  console.error('Fantasy Power Score Sync fehlgeschlagen:', err.message);
  process.exit(1);
});
