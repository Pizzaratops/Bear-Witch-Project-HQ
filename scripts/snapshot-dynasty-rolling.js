#!/usr/bin/env node
// ============================================================
//  SNAPSHOT DYNASTY ROLLING
// ============================================================
//  Haengt den aktuellen Stand aus data/dynasty-board.js (DYNASTY_BOARD)
//  als neuen Zeitpunkt an data/dynasty-rolling.js (DYNASTY_ROLLING) an.
//  Sinnvoll immer dann, wenn neue Ranking-Quellen hochgeladen und neu
//  gemerged wurden (siehe merge_all.py) und der neue Stand als Punkt in
//  der Zeitreihe festgehalten werden soll.
//
//  Usage:
//    node scripts/snapshot-dynasty-rolling.js "Label z.B. Woche 3"
// ============================================================

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const BOARD_PATH = path.join(ROOT, 'data', 'dynasty-board.js');
const ROLLING_PATH = path.join(ROOT, 'data', 'dynasty-rolling.js');

function loadVmArray(filePath, varName) {
  const code = fs.readFileSync(filePath, 'utf8');
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(`${code}\nthis.__RESULT__ = ${varName};`, sandbox);
  return sandbox.__RESULT__;
}

const label = process.argv[2] || new Date().toISOString().slice(0, 10);
const board = loadVmArray(BOARD_PATH, 'DYNASTY_BOARD');
const rolling = loadVmArray(ROLLING_PATH, 'DYNASTY_ROLLING');

const today = new Date().toISOString().slice(0, 10);
if (rolling.some(s => s.date === today)) {
  console.error(`Für ${today} existiert bereits ein Snapshot — abgebrochen (kein Duplikat angelegt).`);
  process.exit(1);
}

const seed = board
  .map(p => ({ name: p.name, pos: p.pos, avg: p.avg }))
  .sort((a, b) => a.avg - b.avg);

rolling.push({ date: today, label, rankings: seed });

const out = `// ============================================================
//  DYNASTY_ROLLING — Rangverlauf ueber Zeit
// ============================================================
//  Automatisch erweitert von scripts/snapshot-dynasty-rolling.js.
//  Neuen Snapshot hinzufuegen: node scripts/snapshot-dynasty-rolling.js "Label"
// ============================================================

const DYNASTY_ROLLING = ${JSON.stringify(rolling)};
`;

fs.writeFileSync(ROLLING_PATH, out, 'utf8');
console.log(`Snapshot "${label}" (${today}) mit ${seed.length} Spielern hinzugefügt. Insgesamt ${rolling.length} Snapshots.`);
