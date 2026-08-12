#!/usr/bin/env node
// ============================================================
//  ESPN PLAYER WEEKLY STATS SYNC (fürs Player-Rankings-Board)
// ============================================================
//  Zieht tatsaechlich erzielte Fantasy-Punkte je Spieler und Woche
//  (statSourceId=0 = actual, statSplitTypeId=1 = weekly) und schreibt
//  sie nach data/player-stats.js. Vor Saisonstart liefert ESPN dafuer
//  einfach nichts -- das Script laeuft dann folgenlos durch (players: []
//  bleibt leer, bis die erste Woche gespielt ist).
//
//  Gleiche x-fantasy-filter-Header-Mechanik wie sync-espn-projections.js,
//  siehe Kommentar dort zu moeglichen API-Aenderungen bei ESPN.
//
//  Usage:
//    node scripts/sync-espn-player-stats.js
// ============================================================

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const https = require('https');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'data', 'player-stats.js');
const PLAYER_LIMIT = 800;

function loadModuleSandbox(files) {
  const sandbox = {};
  vm.createContext(sandbox);
  files.forEach(f => vm.runInContext(fs.readFileSync(f, 'utf8'), sandbox));
  return sandbox;
}
function loadConfig() {
  const sandbox = loadModuleSandbox([path.join(ROOT, 'js', 'espn-sync.js')]);
  return {
    ESPN_LEAGUE_ID: sandbox.ESPN_LEAGUE_ID, ESPN_SEASON: sandbox.ESPN_SEASON,
    ESPN_POS_MAP: sandbox.ESPN_POS_MAP, ESPN_NFL_MAP: sandbox.ESPN_NFL_MAP,
  };
}
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
        try { resolve(JSON.parse(data)); } catch (e) { reject(new Error('Keine gültige JSON-Antwort: ' + e.message)); }
      });
    }).on('error', reject);
  });
}

async function main() {
  const cfg = loadConfig();
  const headers = {
    'User-Agent': 'bear-witch-project-hq-bot', 'Accept': 'application/json',
    'x-fantasy-filter': JSON.stringify({
      players: { limit: PLAYER_LIMIT, sortDraftRanks: { sortPriority: 1, sortAsc: true, value: 'STANDARD' } },
    }),
  };
  const cookieParts = [];
  if (process.env.ESPN_S2) cookieParts.push(`espn_s2=${process.env.ESPN_S2}`);
  if (process.env.SWID) cookieParts.push(`SWID=${process.env.SWID}`);
  if (cookieParts.length) headers['Cookie'] = cookieParts.join('; ');

  const url = `https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/${cfg.ESPN_SEASON}/segments/0/leagues/${cfg.ESPN_LEAGUE_ID}?view=kona_player_info`;
  const data = await httpsGetJson(url, headers);
  const entries = data.players || [];

  const players = entries.map(entry => {
    const p = entry.player || {};
    if (!p.fullName) return null;
    const weekly = {};
    (p.stats || []).forEach(s => {
      if (s.statSourceId === 0 && s.statSplitTypeId === 1 && s.seasonId === cfg.ESPN_SEASON && s.scoringPeriodId) {
        weekly[s.scoringPeriodId] = Math.round((s.appliedTotal || 0) * 10) / 10;
      }
    });
    const weeks = Object.keys(weekly);
    if (!weeks.length) return null;
    const total = Object.values(weekly).reduce((a, b) => a + b, 0);
    return {
      name: p.fullName,
      team: cfg.ESPN_NFL_MAP[p.proTeamId] || 'FA',
      pos: cfg.ESPN_POS_MAP[p.defaultPositionId] || '?',
      weeklyPoints: weekly,
      gamesPlayed: weeks.length,
      totalPoints: Math.round(total * 10) / 10,
      avgPoints: Math.round((total / weeks.length) * 10) / 10,
    };
  }).filter(Boolean);

  players.sort((a, b) => b.totalPoints - a.totalPoints);

  const out = `// ============================================================
//  PLAYER_SEASON_STATS — tatsächlich erzielte Punkte je Woche
// ============================================================
//  AUTO-GENERIERT von scripts/sync-espn-player-stats.js.
//  Zuletzt synchronisiert: ${new Date().toISOString()}
// ============================================================

const PLAYER_SEASON_STATS = ${JSON.stringify({ season: cfg.ESPN_SEASON, updated: new Date().toISOString(), players })};
`;
  fs.writeFileSync(OUT, out, 'utf8');
  console.log(`${OUT} aktualisiert: ${players.length} Spieler mit mind. 1 gespielter Woche.`);
}

main().catch(err => {
  console.error('ESPN Player Stats Sync fehlgeschlagen:', err.message);
  process.exit(0);
});
