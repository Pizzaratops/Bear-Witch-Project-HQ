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
const SCHEDULE_OUT = path.join(ROOT, 'data', 'schedule.js');
const { loadFrozenWeeks, isFrozenWeek } = require('./lib/frozen-weeks');

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
  // ESPN-Draft-Reset 23.09.2026: W1/W2 kommen fest aus data/frozen-weeks-2026.js
  const frozen = loadFrozenWeeks(season);

  // WICHTIG: hier IMMER zuerst auf unsere eigene Team-ID (String, z.B.
  // "beastmode") uebersetzen, BEVOR mit den schon gespeicherten Eintraegen
  // verglichen wird. Vorher wurde beim upsert() gegen die rohe ESPN-ID
  // (Zahl) verglichen, waehrend die gespeicherten Eintraege aus dem letzten
  // Lauf schon uebersetzt waren -- der Abgleich hat nie gegriffen, jeder
  // Sync-Lauf hat also einen weiteren Duplikat-Eintrag pro Team angehaengt,
  // statt den bestehenden zu aktualisieren (sichtbar z.B. an "5-0"/"0-5"
  // Standings nach nur einer gespielten Woche, weil dieselbe Woche 5x im
  // Array stand).
  let weeksWritten = 0;
  schedule.forEach(m => {
    const week = m.matchupPeriodId;
    if (isFrozenWeek(frozen, week)) return; // eingefrorene Woche: ESPN ignorieren
    const home = m.home, away = m.away;
    if (!home || !away) return;
    // Nur gespielte/live Matchups (totalPoints > 0 bei mindestens einer Seite)
    if (!(home.totalPoints > 0 || away.totalPoints > 0)) return;
    existing[season][week] = existing[season][week] || [];
    const list = existing[season][week];
    const homeId = espnIdToOurId[home.teamId] || home.teamId;
    const awayId = espnIdToOurId[away.teamId] || away.teamId;
    const upsert = (teamId, points, oppId, oppPoints) => {
      const idx = list.findIndex(e => e.teamId === teamId);
      const entry = { teamId, points, opponentId: oppId, opponentPoints: oppPoints };
      if (idx === -1) list.push(entry); else list[idx] = entry;
    };
    upsert(homeId, home.totalPoints, awayId, away.totalPoints);
    upsert(awayId, away.totalPoints, homeId, home.totalPoints);
    weeksWritten++;
  });

  // Eingefrorene Wochen immer aus der festen Quelle (auch falls die Datei
  // mal kaputt/leer ueberschrieben wurde).
  if (frozen) Object.entries(frozen.scores).forEach(([w, list]) => { existing[season][w] = JSON.parse(JSON.stringify(list)); });

  // Defensive Absicherung: falls durch einen frueheren Bug oder eine
  // ESPN-Antwort mit doppelten Matchup-Eintraegen trotzdem mehrere
  // Eintraege pro (Woche, Team) im Array stehen, hier auf genau einen
  // reduzieren (der letzte gewinnt -- sollte inhaltlich eh identisch sein).
  Object.keys(existing[season]).forEach(week => {
    const seen = new Map();
    existing[season][week].forEach(e => seen.set(e.teamId, e));
    existing[season][week] = Array.from(seen.values());
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

  // ---------- Kompletter Spielplan (auch ungespielte Wochen) ----------
  // Fuer den Matchup-Planer: wer spielt wann gegen wen, unabhaengig davon
  // ob die Woche schon Punkte hat.
  const scheduleByWeek = {};
  schedule.forEach(m => {
    const week = m.matchupPeriodId;
    const home = m.home, away = m.away;
    if (!home || !away || home.teamId == null || away.teamId == null) return;
    scheduleByWeek[week] = scheduleByWeek[week] || [];
    scheduleByWeek[week].push({
      home: espnIdToOurId[home.teamId] || home.teamId,
      away: espnIdToOurId[away.teamId] || away.teamId,
    });
  });

  // Eingefrorene Wochen: Paarungen aus der festen Quelle, nicht von ESPN.
  if (frozen) Object.entries(frozen.schedule).forEach(([w, list]) => { scheduleByWeek[w] = list; });
  const scheduleOutData = { [season]: scheduleByWeek };
  const scheduleOut = `// ============================================================
//  SCHEDULE — kompletter Saison-Spielplan (auch ungespielte Wochen)
// ============================================================
//  AUTO-GENERIERT von scripts/sync-espn-weekly-scores.js (selbe ESPN-
//  Antwort wie WEEKLY_SCORES, hier aber ungefiltert -- auch Wochen ohne
//  Punkte, fuer den Matchup-Planer).
//  Zuletzt synchronisiert: ${new Date().toISOString()}
// ============================================================

const SCHEDULE = ${JSON.stringify(scheduleOutData, null, 1)};
`;
  fs.writeFileSync(SCHEDULE_OUT, scheduleOut, 'utf8');
  const totalMatchups = Object.values(scheduleByWeek).reduce((s, w) => s + w.length, 0);
  console.log(`${SCHEDULE_OUT} aktualisiert: ${totalMatchups} Matchups über ${Object.keys(scheduleByWeek).length} Wochen.`);
}

main().catch(err => {
  console.error('ESPN Weekly Scores Sync fehlgeschlagen:', err.message);
  process.exit(1); // sichtbarer Fehlschlag in der Action, statt still gruen zu bleiben
});
