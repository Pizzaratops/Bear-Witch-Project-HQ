// ============================================================
//  Helper: eingefrorene Wochen (data/frozen-weeks-2026.js)
// ============================================================
//  Hintergrund: ESPN-Draft-Reset am 23.09.2026 -> ESPN kennt W1/W2 nicht
//  mehr. Die Sync-Scripts holen sich hierueber die festen W1/W2-Werte und
//  duerfen diese Wochen nie mit ESPN-Daten ueberschreiben.
//  Keine externen Dependencies (siehe working notes: kein npm install in CI).
// ============================================================
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const FILE = path.join(__dirname, '..', '..', 'data', 'frozen-weeks-2026.js');

function loadFrozenWeeks(season) {
  if (String(season) !== '2026' || !fs.existsSync(FILE)) return null;
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(FILE, 'utf8') + '\nthis.FROZEN_WEEKS_2026 = FROZEN_WEEKS_2026;', sandbox);
  return sandbox.FROZEN_WEEKS_2026 || null;
}

function isFrozenWeek(frozen, week) {
  return !!frozen && frozen.weeks.map(Number).includes(Number(week));
}

// W-L-T eines Teams (unsere Team-ID) nur aus den eingefrorenen Wochen.
function frozenRecord(frozen, teamId) {
  const r = { wins: 0, losses: 0, ties: 0 };
  if (!frozen) return r;
  Object.values(frozen.scores || {}).forEach(list => {
    const e = (list || []).find(x => x.teamId === teamId);
    if (!e) return;
    if (e.points > e.opponentPoints) r.wins++;
    else if (e.points < e.opponentPoints) r.losses++;
    else r.ties++;
  });
  return r;
}

module.exports = { loadFrozenWeeks, isFrozenWeek, frozenRecord };
