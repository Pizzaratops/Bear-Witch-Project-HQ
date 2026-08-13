#!/usr/bin/env node
// ============================================================
//  ESPN PLAYER PROJECTIONS SYNC
// ============================================================
//  Zieht ESPNs Saisonprojektionen (projizierte Fantasy-Punkte fuer die
//  gesamte Saison, statSourceId=1) fuer den kompletten Liga-Spielerpool
//  und schreibt sie nach data/projections.js.
//
//  WICHTIG: ESPNs "kona_player_info"-Endpoint braucht einen speziellen
//  "x-fantasy-filter"-Header (JSON) statt Query-Parametern fuer Limit/
//  Sortierung. Das genaue Response-Format kann sich bei ESPN im Detail
//  aendern -- falls dieses Script mit einem unerwarteten Feld-Fehler
//  abbricht, zuerst pruefen, ob sich die "stats"-Array-Struktur pro
//  Spieler geaendert hat (statSourceId/statSplitTypeId-Kombination).
//
//  Usage:
//    node scripts/sync-espn-projections.js
// ============================================================

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const https = require('https');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'data', 'projections.js');
const PLAYER_LIMIT = 800; // deckt den kompletten relevanten Fantasy-Pool ab

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
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode} für ${url}`));
      }
      let data = '';
      res.on('data', c => { data += c; });
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error('Keine gültige JSON-Antwort: ' + e.message)); }
      });
    }).on('error', reject);
  });
}

async function main() {
  const cfg = loadConfig();
  const headers = {
    'User-Agent': 'bear-witch-project-hq-bot',
    'Accept': 'application/json',
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
    const statLine = (p.stats || []).find(s => s.statSourceId === 1 && s.statSplitTypeId === 0 && s.seasonId === cfg.ESPN_SEASON);
    const projectedPoints = statLine ? Math.round((statLine.appliedTotal || 0) * 10) / 10 : null;
    return {
      name: p.fullName,
      team: cfg.ESPN_NFL_MAP[p.proTeamId] || 'FA',
      pos: cfg.ESPN_POS_MAP[p.defaultPositionId] || '?',
      projectedPoints,
    };
  }).filter(p => p && p.projectedPoints != null);

  players.sort((a, b) => b.projectedPoints - a.projectedPoints);

  const out = `// ============================================================
//  PLAYER_PROJECTIONS — ESPN-Saisonprojektionen
// ============================================================
//  AUTO-GENERIERT von scripts/sync-espn-projections.js.
//  Zuletzt synchronisiert: ${new Date().toISOString()}
// ============================================================

const PLAYER_PROJECTIONS = ${JSON.stringify({ season: cfg.ESPN_SEASON, updated: new Date().toISOString(), players })};
`;
  fs.writeFileSync(OUT, out, 'utf8');
  console.log(`${OUT} aktualisiert: ${players.length} Spieler mit Projektion.`);
}

main().catch(err => {
  console.error('ESPN Projections Sync fehlgeschlagen:', err.message);
  process.exit(1); // sichtbarer Fehlschlag in der Action, statt still gruen zu bleiben
});
