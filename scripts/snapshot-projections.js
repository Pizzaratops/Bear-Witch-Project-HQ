#!/usr/bin/env node
// ============================================================
//  MATCHUP PROJECTIONS SNAPSHOT
// ============================================================
//  Sichert einmal pro Woche (siehe .github/workflows/snapshot-projections.yml,
//  laeuft mittwochs) die aktuelle Projektion ("Mix"-Modus, aktuelles Lineup)
//  fuer die naechste noch nicht gespielte Woche nach data/matchup-snapshots.js.
//
//  Nutzt DIESELBE Rechenlogik wie die Browser-Anzeige (js/matchup-engine.js),
//  damit Server-Snapshot und Live-Ansicht nie auseinanderlaufen koennen.
//
//  Ruft KEINE ESPN-API auf -- rechnet nur mit bereits im Repo vorhandenen,
//  von den anderen Sync-Scripts frisch synchronisierten Daten (Rosters,
//  Projections, Player Stats, Schedule, Weekly Scores). Braucht deshalb
//  keine ESPN_S2/SWID Secrets.
//
//  Ueberschreibt NIE einen bereits vorhandenen Eintrag -- ein Snapshot ist
//  eine "vorher"-Momentaufnahme und bleibt das, auch wenn das Script danach
//  nochmal laeuft (z.B. weil man es manuell erneut anstoesst).
//
//  Usage:
//    node scripts/snapshot-projections.js
// ============================================================

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'data', 'matchup-snapshots.js');
const SNAPSHOT_SEASON = 2026;

function loadModuleSandbox(files, sandbox) {
  // WICHTIG: vm.runInContext haengt "const"/"let"-Deklarationen NICHT als
  // Property ans Sandbox-Objekt (nur "var" wuerde das tun) -- deshalb hier per
  // Regex alle top-level "const NAME = ..." / "function NAME(" Namen einsammeln
  // und explizit ueber "this.NAME = NAME" an die Sandbox anhaengen.
  sandbox = sandbox || {};
  vm.createContext(sandbox);
  files.forEach(f => {
    const code = fs.readFileSync(f, 'utf8');
    const constNames = [...code.matchAll(/^const\s+([A-Za-z_\$][\w\$]*)/gm)].map(m => m[1]);
    const fnNames = [...code.matchAll(/^function\s+([A-Za-z_\$][\w\$]*)/gm)].map(m => m[1]);
    const expose = [...constNames, ...fnNames].map(n => `this.${n} = ${n};`).join('\n');
    vm.runInContext(code + '\n' + expose, sandbox);
  });
  return sandbox;
}

function main() {
  const sandbox = loadModuleSandbox([
    path.join(ROOT, 'data', 'teams.js'),
    path.join(ROOT, 'data', 'draft2026.js'),
    path.join(ROOT, 'data', 'rosters-live.js'),
    path.join(ROOT, 'data', 'projections.js'),
    path.join(ROOT, 'data', 'player-stats.js'),
    path.join(ROOT, 'data', 'schedule.js'),
    path.join(ROOT, 'data', 'weekly-scores.js'),
    path.join(ROOT, 'js', 'matchup-engine.js'),
  ]);

  const { LEAGUE_TEAMS, SCHEDULE, WEEKLY_SCORES, teamWeekProjection, _assignSlotLabels } = sandbox;

  if (!LEAGUE_TEAMS || !SCHEDULE || !SCHEDULE[SNAPSHOT_SEASON]) {
    console.log('Kein Spielplan fuer die Saison geladen -- nichts zu tun.');
    writeOut({ [SNAPSHOT_SEASON]: {} });
    return;
  }

  // Bestehende Snapshots einlesen (nie ueberschreiben).
  let existing = { [SNAPSHOT_SEASON]: {} };
  if (fs.existsSync(OUT)) {
    const outSandbox = {};
    vm.createContext(outSandbox);
    vm.runInContext(`${fs.readFileSync(OUT, 'utf8')}\nthis.__OLD__ = MATCHUP_SNAPSHOTS;`, outSandbox);
    if (outSandbox.__OLD__) existing = outSandbox.__OLD__;
  }
  existing[SNAPSHOT_SEASON] = existing[SNAPSHOT_SEASON] || {};

  const scheduleWeeks = Object.keys(SCHEDULE[SNAPSHOT_SEASON]).map(Number).sort((a, b) => a - b);
  const playedWeeks = new Set(
    Object.keys(WEEKLY_SCORES[SNAPSHOT_SEASON] || {}).filter(w => (WEEKLY_SCORES[SNAPSHOT_SEASON][w] || []).length > 0).map(Number)
  );
  const nextWeek = scheduleWeeks.find(w => !playedWeeks.has(w));

  if (nextWeek == null) {
    console.log('Alle Wochen im Spielplan sind bereits gespielt -- nichts zu snapshotten.');
    writeOut(existing);
    return;
  }

  existing[SNAPSHOT_SEASON][nextWeek] = existing[SNAPSHOT_SEASON][nextWeek] || {};
  const weekSnaps = existing[SNAPSHOT_SEASON][nextWeek];
  const teamsById = LEAGUE_TEAMS.reduce((m, t) => { m[t.id] = t; return m; }, {});
  const matchups = SCHEDULE[SNAPSHOT_SEASON][nextWeek] || [];
  let written = 0;

  matchups.forEach(m => {
    [m.home, m.away].forEach(teamId => {
      if (weekSnaps[teamId]) return; // schon vorhanden -- nicht anfassen
      const team = teamsById[teamId];
      if (!team) return;
      const proj = teamWeekProjection(team, 'mix', 'current');
      weekSnaps[teamId] = {
        capturedAt: new Date().toISOString(),
        lineup: 'current',
        mode: 'mix',
        teamMean: Math.round(proj.mean * 10) / 10,
        starters: _assignSlotLabels(proj.starters).map(s => ({
          slot: s.slot,
          name: s.player ? s.player.name : null,
          pos: s.player ? s.player.pos : null,
          mean: s.player ? Math.round(s.player.ms.mean * 10) / 10 : null,
        })),
      };
      written++;
    });
  });

  console.log(`Woche ${nextWeek}: ${written} neue Team-Snapshot(s) geschrieben (${Object.keys(weekSnaps).length}/${matchups.length * 2} insgesamt fuer diese Woche).`);
  writeOut(existing);
}

function writeOut(data) {
  const out = `// ============================================================
//  MATCHUP_SNAPSHOTS — serverseitig gesicherte Vorab-Projektionen
// ============================================================
//  AUTO-GENERIERT von scripts/snapshot-projections.js über die GitHub
//  Action ".github/workflows/snapshot-projections.yml". Nicht von Hand
//  editieren — läuft automatisch einmal pro Woche (Mittwoch) und
//  schreibt NUR neue, noch nicht gespielte Wochen dazu. Einmal gesetzte
//  Einträge werden nie überschrieben, damit sie eine echte "vorher"-
//  Momentaufnahme bleiben.
//  Zuletzt synchronisiert: ${new Date().toISOString()}
//
//  Struktur: MATCHUP_SNAPSHOTS[season][week][teamId] = {
//    capturedAt, lineup, mode, teamMean, starters: [{slot,name,pos,mean}]
//  }
//
//  Fallback: bevor der erste Lauf passiert ist (oder für Wochen, die er
//  noch nicht erreicht hat), nutzt die Seite ergänzend lokale Snapshots
//  aus dem Browser-localStorage (siehe js/app.js, loadMatchupSnapshot).
// ============================================================

const MATCHUP_SNAPSHOTS = ${JSON.stringify(data, null, 1)};
`;
  fs.writeFileSync(OUT, out, 'utf8');
  console.log(`${OUT} geschrieben.`);
}

main();
