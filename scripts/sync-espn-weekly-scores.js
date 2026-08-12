#!/usr/bin/env node
// ============================================================
//  ESPN WEEKLY SCORES SYNC (Week by Week Rankings)
// ============================================================
//  Zieht fuer alle bereits gespielten Wochen der aktuellen Saison die
//  Matchup-Punktzahlen aus ESPN (view=mMatchupScore) und schreibt sie
//  nach data/weekly-scores.js. Laeuft ueber dieselbe Liga-Konfiguration
//  wie scripts/sync-espn-rosters.js (js/espn-sync.js).
//
//  Alternative zum automatischen Sync: die Scores manuell in
//  data/weekly-scores.js im gleichen Format eintragen (z.B. wenn ESPN
//  mal nicht erreichbar ist oder die Liga privat ist und noch keine
//  Secrets hinterlegt sind).
//
//  Usage:
//    node scripts/sync-espn-weekly-scores.js
// ============================================================

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const https = require('https');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'data', 'weekly-scores.js');

function loadModuleSandbox(files) {
  const sandbox = {};
  vm.createContext(sandbox);
  files.forEach(f => vm.runInContext(fs.readFileSync(f, 'utf8'), sandbox));
  return sandbox;
}

function loadConfig() {
  const sandbox = loadModuleSandbox([path.join(ROOT, 'js', 'espn-sync.js')]);
  return { ESPN_LEAGUE_ID: sandbox.ESPN_LEAGUE_ID, ESPN_SEASON: sandbox.ESPN_SEASON };
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

function loadLeagueTeams() {
  const sandbox = loadModuleSandbox([path.join(ROOT, 'data', 'teams.js')]);
  return sandbox.LEAGUE_TEAMS;
}

function normalizeName(s) {
  return (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

async function main() {
  const cfg = loadConfig();
  const leagueTeams = loadLeagueTeams();
  const headers = { 'User-Agent': 'bear-witch-project-hq-bot', 'Accept': 'application/json' };
  const cookieParts = [];
  if (process.env.ESPN_S2) cookieParts.push(`espn_s2=${process.env.ESPN_S2}`);
  if (process.env.SWID) cookieParts.push(`SWID=${process.env.SWID}`);
  if (cookieParts.length) headers['Cookie'] = cookieParts.join('; ');

  const url = `https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/${cfg.ESPN_SEASON}/segments/0/leagues/${cfg.ESPN_LEAGUE_ID}?view=mMatchupScore&view=mTeam`;
  const data = await httpsGetJson(url, headers);
  const schedule = data.schedule || [];

  // ESPN-Team-ID -> unsere Team-ID (data/teams.js), gleicher Namensabgleich
  // wie in scripts/sync-espn-rosters.js.
  const byNormName = {};
  leagueTeams.forEach(t => { byNormName[normalizeName(t.name)] = t.id; });
  const espnIdToOurId = {};
  (data.teams || []).forEach(et => {
    const espnName = (et.name || `${et.location || ''} ${et.nickname || ''}`).trim();
    const ourId = byNormName[normalizeName(espnName)];
    if (ourId) espnIdToOurId[et.id] = ourId;
  });

  // Bereits geladene Wochen behalten (falls ESPN alte Wochen mal nicht
  // mitliefert), neue/aktualisierte Wochen ueberschreiben.
  let existing = { 2026: {} };
  if (fs.existsSync(OUT)) {
    const sandbox = {};
    vm.createContext(sandbox);
    vm.runInContext(`${fs.readFileSync(OUT, 'utf8')}\nthis.__OLD__ = WEEKLY_SCORES;`, sandbox);
    existing = sandbox.__OLD__ || existing;
  }
  const season = cfg.ESPN_SEASON;
  existing[season] = existing[season] || {};

  let weeksWritten = 0;
  schedule.forEach(m => {
    const week = m.matchupPeriodId;
    const home = m.home, away = m.away;
    if (!home || !away) return;
    // Nur gespielte/live Matchups (totalPoints > 0 bei mindestens einer Seite)
    if (!(home.totalPoints > 0 || away.totalPoints > 0)) return;
    existing[season][week] = existing[season][week] || [];
    const list = existing[season][week];
    const upsert = (teamId, points, oppId, oppPoints) => {
      const idx = list.findIndex(e => e.teamId === teamId);
      const entry = { teamId, points, opponentId: oppId, opponentPoints: oppPoints };
      if (idx === -1) list.push(entry); else list[idx] = entry;
    };
    upsert(home.teamId, home.totalPoints, away.teamId, away.totalPoints);
    upsert(away.teamId, away.totalPoints, home.teamId, home.totalPoints);
    weeksWritten++;
  });

  // ESPN-Team-IDs in unsere eigenen Team-IDs uebersetzen (nur Eintraege,
  // die sich zuordnen liessen -- Rest bleibt mit ESPN-ID als Fallback,
  // damit keine Daten stillschweigend verloren gehen).
  Object.keys(existing[season]).forEach(week => {
    existing[season][week] = existing[season][week].map(e => ({
      teamId: espnIdToOurId[e.teamId] || e.teamId,
      points: e.points,
      opponentId: espnIdToOurId[e.opponentId] || e.opponentId,
      opponentPoints: e.opponentPoints,
    }));
  });

  const out = `// ============================================================
//  WEEKLY_SCORES — wöchentliche ESPN-Matchup-Punktzahlen
// ============================================================
//  AUTO-GENERIERT von scripts/sync-espn-weekly-scores.js über die
//  GitHub Action ".github/workflows/sync-espn-weekly-scores.yml".
//  Zuletzt synchronisiert: ${new Date().toISOString()}
//
//  teamId hier ist bereits unsere eigene Team-ID aus data/teams.js
//  (uebersetzt beim Sync per Namensabgleich, wie in
//  scripts/sync-espn-rosters.js).
// ============================================================

const WEEKLY_SCORES = ${JSON.stringify(existing, null, 1)};
`;
  fs.writeFileSync(OUT, out, 'utf8');
  console.log(`${OUT} aktualisiert: ${weeksWritten} Matchup-Eintragungen verarbeitet.`);
}

main().catch(err => {
  console.error('ESPN Weekly Scores Sync fehlgeschlagen:', err.message);
  process.exit(0); // non-fatal, letzter guter Stand bleibt erhalten
});
