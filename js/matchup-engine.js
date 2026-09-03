// ============================================================
//  MATCHUP-ENGINE — Win%-/Projektions-Logik fuer Matchups
// ============================================================
//  Reine Rechenlogik, KEINE DOM-Zugriffe. Wird auf zwei Wegen geladen:
//   1) Im Browser per <script> vor js/app.js (index.html) -- app.js nutzt
//      die hier definierten Funktionen/Konstanten global.
//   2) In scripts/snapshot-projections.js ueber denselben vm-Sandbox-
//      Lademechanismus wie bei den anderen Sync-Scripts (siehe dort),
//      damit Server-Snapshot und Browser-Anzeige exakt dieselbe Formel
//      verwenden und nicht auseinanderlaufen koennen.
//
//  Haengt nur von den globalen Daten-Konstanten ab (PLAYER_PROJECTIONS,
//  PLAYER_SEASON_STATS, ROSTERS_LIVE, DRAFT_2026_TEAMS) -- die muessen
//  vor diesem Script bereits geladen sein.
// ============================================================

/* ---------- Matchup Win%-Engine ---------- */
// Ansatz: Summe der Projection der 9 Starter je Team, plus eine Streuungs-
// annahme je Spieler (sigma), daraus per Normalverteilung eine Win%.
// Keine ESPN-Wochenprojektion pro Spieler verfuegbar (nur Saison-Total in
// PLAYER_PROJECTIONS) -- als woechentliche Baseline wird Saison-Projection
// / 17 Spiele verwendet. Sobald PLAYER_SEASON_STATS (echte Wochenwerte)
// genug Spiele fuer einen Spieler enthaelt, blendet der "Mix"-Modus
// automatisch in Richtung dieser historischen Werte (Shrinkage), ohne
// dass man manuell umschalten muss.
const SEASON_GAMES_FOR_BASELINE = 17;
const POSITION_SIGMA = { QB: 7, RB: 7.5, WR: 8, TE: 5.5, K: 3.5, DST: 4, 'D/ST': 4 };

// Angenommene Standard-Lineup-Struktur (9 Starter). Falls eure Liga eine
// andere Aufstellung faehrt (z.B. Superflex, 2x FLEX), bitte Bescheid
// geben -- steht sonst nirgends in den ESPN-Sync-Daten und muss von Hand
// gepflegt werden.
const LINEUP_SLOTS_DEFAULT = [
  { slot: 'QB',   pos: ['QB'],             count: 1 },
  { slot: 'RB',   pos: ['RB'],             count: 2 },
  { slot: 'WR',   pos: ['WR'],             count: 2 },
  { slot: 'TE',   pos: ['TE'],             count: 1 },
  { slot: 'FLEX', pos: ['RB', 'WR', 'TE'], count: 1 },
  { slot: 'DST',  pos: ['DST', 'D/ST'],    count: 1 },
  { slot: 'K',    pos: ['K'],              count: 1 },
];

function _seasonProjFor(name) {
  if (typeof PLAYER_PROJECTIONS === 'undefined') return null;
  const p = PLAYER_PROJECTIONS.players.find(x => x.name === name);
  return p ? p.projectedPoints : null;
}
function _historicalStatsFor(name) {
  if (typeof PLAYER_SEASON_STATS === 'undefined') return null;
  const p = PLAYER_SEASON_STATS.players.find(x => x.name === name);
  if (!p || !p.gamesPlayed) return null;
  const vals = Object.values(p.weeklyPoints || {});
  if (!vals.length) return null;
  const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
  const variance = vals.length > 1
    ? vals.reduce((s, v) => s + (v - mean) * (v - mean), 0) / (vals.length - 1)
    : null;
  return { mean, sigma: variance != null ? Math.sqrt(variance) : null, games: vals.length };
}

/* Liefert {mean, sigma} fuer EINE Woche eines Spielers, je nach gewaehltem
   Modus. 'proj' = reine Projection, 'hist' = reine historische Wochenwerte
   (faellt auf Projection zurueck, wenn noch keine Spiele da sind), 'mix' =
   Shrinkage-Blend, der mit mehr gespielten Wochen automatisch staerker auf
   historisch wechselt. */
function playerWeekMeanSigma(name, pos, mode) {
  const posKey = (pos || '').split('/')[0].toUpperCase();
  const sigmaBase = POSITION_SIGMA[posKey] ?? POSITION_SIGMA[pos] ?? 6;
  const seasonProj = _seasonProjFor(name);
  const projMean = seasonProj != null ? seasonProj / SEASON_GAMES_FOR_BASELINE : null;
  const hist = _historicalStatsFor(name);

  if (mode === 'hist') {
    if (hist) return { mean: hist.mean, sigma: hist.sigma ?? sigmaBase, source: 'hist' };
    return projMean != null ? { mean: projMean, sigma: sigmaBase, source: 'proj-fallback' } : { mean: 8, sigma: sigmaBase, source: 'default' };
  }
  if (mode === 'proj') {
    return projMean != null ? { mean: projMean, sigma: sigmaBase, source: 'proj' } : { mean: 8, sigma: sigmaBase, source: 'default' };
  }
  // mix (Standard): Gewicht Richtung historisch waechst mit Anzahl gespielter
  // Wochen (haelftiger Zug bei ca. 3 Spielen), Projection bleibt Basis.
  const baseMean = projMean != null ? projMean : 8;
  if (!hist) return { mean: baseMean, sigma: sigmaBase, source: 'proj' };
  const w = hist.games / (hist.games + 3);
  const mean = w * hist.mean + (1 - w) * baseMean;
  const sigma = w * (hist.sigma ?? sigmaBase) + (1 - w) * sigmaBase;
  return { mean, sigma, source: `mix (${hist.games} Wo.)` };
}

function _rosterForTeamProjection(team) {
  const live = (typeof ROSTERS_LIVE !== 'undefined') ? ROSTERS_LIVE[team.id] : null;
  if (live && live.length) return live.map(p => ({ name: p.name, pos: p.pos, isStarter: p.isStarter === true }));
  const dt = (typeof DRAFT_2026_TEAMS !== 'undefined') ? DRAFT_2026_TEAMS.find(x => x.team === team.name) : null;
  return dt ? dt.keepers.map(p => ({ name: p.name, pos: p.pos, isStarter: null })) : [];
}

/* Greedy-Optimallineup: Slots nach "am wenigsten flexibel zuerst" befuellen
   (K, DST, TE, QB, RB, WR, dann FLEX), an jedem Slot den best-projizierten
   noch verfuegbaren passenden Spieler nehmen. Fuer 9 Slots reicht Greedy
   in der Praxis nahezu immer fuer das echte Optimum. */
function _optimalLineup(players, mode) {
  const withProj = players.map(p => ({ ...p, ms: playerWeekMeanSigma(p.name, p.pos, mode) }));
  const remaining = withProj.slice();
  const slotOrder = ['K', 'DST', 'TE', 'QB', 'RB', 'WR', 'FLEX'];
  const bySlot = {};
  LINEUP_SLOTS_DEFAULT.forEach(s => { bySlot[s.slot] = s; });
  const chosen = [];
  slotOrder.forEach(slotName => {
    const def = bySlot[slotName];
    for (let i = 0; i < def.count; i++) {
      const posKey = p => (p.pos || '').split('/')[0].toUpperCase();
      const eligible = remaining.filter(p => def.pos.includes(posKey(p)) || def.pos.includes(p.pos));
      if (!eligible.length) continue;
      eligible.sort((a, b) => b.ms.mean - a.ms.mean);
      const pick = eligible[0];
      chosen.push(pick);
      remaining.splice(remaining.indexOf(pick), 1);
    }
  });
  return chosen;
}

function _currentLineup(players, mode) {
  const starters = players.filter(p => p.isStarter === true);
  if (starters.length) return starters.map(p => ({ ...p, ms: playerWeekMeanSigma(p.name, p.pos, mode) }));
  return null; // keine Live-Lineup-Info -> Aufrufer soll auf Optimal zurueckfallen
}

/* Team-Projektion fuer eine Woche: Summe der Means, sigma als Wurzel der
   Summe der Varianzen (Annahme: Spieler-Performance unabhaengig). */
function teamWeekProjection(team, mode, lineupType) {
  const players = _rosterForTeamProjection(team);
  let starters = lineupType === 'current' ? _currentLineup(players, mode) : null;
  let usedOptimal = false;
  if (!starters) { starters = _optimalLineup(players, mode); usedOptimal = true; }
  const mean = starters.reduce((s, p) => s + p.ms.mean, 0);
  const variance = starters.reduce((s, p) => s + p.ms.sigma * p.ms.sigma, 0);
  return { mean, sigma: Math.sqrt(variance), starters, usedOptimal };
}

// Standardnormalverteilung (Abramowitz-Stegun-Approximation der Fehlerfunktion).
function _erf(x) {
  const sign = x < 0 ? -1 : 1; x = Math.abs(x);
  const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
  const t = 1 / (1 + p * x);
  const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return sign * y;
}
function _normalCdf(z) { return 0.5 * (1 + _erf(z / Math.SQRT2)); }

/* Win% von Team A gegen Team B in einer Woche, aus den beiden (unabhaengig
   angenommenen) Normalverteilungen ihrer projizierten Punktzahl. */
function matchupWinPct(teamA, teamB, mode, lineupType) {
  const a = teamWeekProjection(teamA, mode, lineupType);
  const b = teamWeekProjection(teamB, mode, lineupType);
  const diffMean = a.mean - b.mean;
  const diffSigma = Math.sqrt(a.sigma * a.sigma + b.sigma * b.sigma) || 1;
  const winA = _normalCdf(diffMean / diffSigma);
  return { a, b, winA, winB: 1 - winA };
}

/* Ordnet eine Starter-Liste den 9 Standard-Slots zu (QB, RB, RB, WR, WR,
   TE, FLEX, DST, K), unabhaengig davon ob es das aktuelle oder das Optimal-
   Lineup ist -- damit sich zwei Teams sauber Slot-fuer-Slot (QB vs QB, RB
   vs RB, ...) gegenueberstellen lassen. */
function _assignSlotLabels(starters) {
  const posKey = p => { const k = (p.pos || '').split('/')[0].toUpperCase(); return k === 'D' ? 'DST' : k; };
  const byPos = { QB: [], RB: [], WR: [], TE: [], DST: [], K: [] };
  starters.forEach(p => { (byPos[posKey(p)] || byPos.WR).push(p); });
  Object.values(byPos).forEach(arr => arr.sort((a, b) => b.ms.mean - a.ms.mean));
  const result = [];
  const take = (posName, label) => { result.push({ slot: label, player: byPos[posName].shift() || null }); };
  take('QB', 'QB');
  take('RB', 'RB'); take('RB', 'RB');
  take('WR', 'WR'); take('WR', 'WR');
  take('TE', 'TE');
  const flexPool = [...byPos.RB, ...byPos.WR, ...byPos.TE].sort((a, b) => b.ms.mean - a.ms.mean);
  const flexPlayer = flexPool[0] || null;
  if (flexPlayer) ['RB', 'WR', 'TE'].forEach(pk => {
    const idx = byPos[pk].indexOf(flexPlayer); if (idx > -1) byPos[pk].splice(idx, 1);
  });
  result.push({ slot: 'FLEX', player: flexPlayer });
  take('DST', 'DST');
  take('K', 'K');
  return result;
}

function _actualWeekPoints(name, week) {
  if (typeof PLAYER_SEASON_STATS === 'undefined') return null;
  const p = PLAYER_SEASON_STATS.players.find(x => x.name === name);
  if (!p || !p.weeklyPoints) return null;
  const v = p.weeklyPoints[week];
  return v != null ? v : null;
}

