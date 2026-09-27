#!/usr/bin/env node
// ============================================================
//  NFL PROFILE COMP — "Rollenprofil aehnelt X vor dessen Draft"
// ============================================================
//  Baustein 2 von 2 (siehe scripts/build-nfl-draft-athletic-profiles.js
//  fuer Baustein 1). Laeuft LOKAL beim Nutzer (nicht in der Cloud-Sandbox --
//  braucht die lokale data/college-scouting.js UND, fuer den Roster-
//  Groesse-Abgleich der jeweils ANDEREN Jahrgaenge, keine weiteren
//  CFBD-Calls: die Groesse/Gewicht-Daten stehen bereits in
//  data/college-scouting.js, seit sync-college-scouting.js den
//  roster-Endpunkt mitliefert).
//
//  METHODIK (siehe Projekt-Doc Abschnitt 2 + neuer Abschnitt 7-Eintrag):
//  Zwei-Baustein-Aufloesung des urspruenglichen Feature-Vektors, weil ein
//  AKTUELLER (noch nicht gedrafteter) Prospect zwangslaeufig weder RAS
//  (Combine erst im Feb/Maerz) noch Draft-Kapital (Draft erst im April)
//  hat:
//
//  1. MATCHING-FEATURES (fuer die Mahalanobis-Distanz selbst):
//     Production-Features (identisch zu College Production Comp, siehe
//     FEATURES in sync-college-scouting.js) + heightIn + weightLb.
//     Diese sind fuer JEDEN Spieler bekannt -- aktuelle Prospects UND
//     historische Draftees -- also ein fairer, vollstaendiger Vektor.
//  2. KONTEXT-INFO (NICHT Teil der Distanz, nur angezeigt): RAS-Score und
//     tatsaechliches Draft-Kapital/-Ergebnis DES GEFUNDENEN historischen
//     COMPS. Das beantwortet die eigentliche Nutzerfrage ("Spieler mit
//     aehnlichem Produktions+Groessen-Profil wurden im Schnitt XY gedraftet
//     und hatten RAS-Score Z"), ohne dem aktuellen Prospect selbst einen
//     Wert unterschieben zu muessen, den es noch gar nicht geben kann.
//
//  Vergleichs-Pool = NUR tatsaechlich gedraftete Spieler (aus
//  data/nfl-draft-athletic-profiles.js), gematcht per normalisiertem Namen
//  gegen die eigene CFBD-Produktionshistorie (data/college-scouting.js,
//  Jahrgang = draftYear - 1, mit Fallback draftYear - 2 fuer Spieler mit
//  Redshirt-/Bowl-Verschiebung).
//
//  Schreibt data/nfl-profile-comp.js -> NFL_PROFILE_COMP
//  Usage: node scripts/build-nfl-profile-comp.js
//    (braucht data/college-scouting.js und data/nfl-draft-athletic-
//    profiles.js im selben Repo -- kein API-Key noetig, reine
//    Offline-Verarbeitung bereits vorhandener Dateien)
// ============================================================

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const SCOUTING_FILE = path.join(ROOT, 'data', 'college-scouting.js');
const PROFILES_FILE = path.join(ROOT, 'data', 'nfl-draft-athletic-profiles.js');
const OUT = path.join(ROOT, 'data', 'nfl-profile-comp.js');
const POS = ['QB', 'RB', 'WR', 'TE'];
const COMPS_N = 10;

const num = v => (v === '' || v == null ? null : Number(v));
const round = (x, d = 2) => (x == null ? null : Math.round(x * 10 ** d) / 10 ** d);

function nameKey(name) {
  if (!name) return '';
  return name
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\b(jr|sr|ii|iii|iv|v)\.?\b/g, '')
    .replace(/[^a-z0-9]/g, '');
}

function loadVm(file, globalName) {
  if (!fs.existsSync(file)) return null;
  const sb = {}; vm.createContext(sb);
  vm.runInContext(fs.readFileSync(file, 'utf8') + `\nthis.D = ${globalName};`, sb);
  return sb.D;
}

// Production-Features je Position -- MUSS identisch zu FEATURES in
// sync-college-scouting.js sein (dort die Quelle der Wahrheit).
const PROD_FEATURES = {
  WR: ['recShare', 'ydShare', 'tdShare', 'avgPPA', 'usageOverall'],
  TE: ['recShare', 'ydShare', 'tdShare', 'avgPPA', 'usageOverall'],
  RB: ['rushCarShare', 'recYdShare', 'avgPpaRush', 'avgPpaPass', 'usageRush'],
  QB: ['avgPpaPass', 'avgPpaRush', 'usagePass', 'usageRush', 'compPct'],
};
// Matching-Features fuer die NFL-Profile-Comp-Distanz: Production + Groesse.
const MATCH_FEATURES = {};
POS.forEach(p => { MATCH_FEATURES[p] = [...PROD_FEATURES[p], 'heightIn', 'weightLb']; });

// ---------------- Mahalanobis (identisch zu sync-college-scouting.js) ----------------
function mean(arr) { return arr.reduce((s, v) => s + v, 0) / arr.length; }
function covMatrix(rows) {
  const n = rows.length, d = rows[0].length;
  const mu = Array.from({ length: d }, (_, j) => mean(rows.map(r => r[j])));
  const cov = Array.from({ length: d }, () => Array(d).fill(0));
  rows.forEach(r => {
    for (let i = 0; i < d; i++) for (let j = 0; j < d; j++) cov[i][j] += (r[i] - mu[i]) * (r[j] - mu[j]);
  });
  for (let i = 0; i < d; i++) for (let j = 0; j < d; j++) cov[i][j] /= (n - 1);
  return { mu, cov };
}
function invert(m) {
  const d = m.length;
  const A = m.map((row, i) => [...row, ...Array.from({ length: d }, (_, j) => (i === j ? 1 : 0))]);
  for (let col = 0; col < d; col++) {
    let pivot = col;
    for (let r = col + 1; r < d; r++) if (Math.abs(A[r][col]) > Math.abs(A[pivot][col])) pivot = r;
    [A[col], A[pivot]] = [A[pivot], A[col]];
    if (Math.abs(A[col][col]) < 1e-10) { A[col][col] += 1e-6; }
    const pv = A[col][col];
    for (let c = 0; c < 2 * d; c++) A[col][c] /= pv;
    for (let r = 0; r < d; r++) {
      if (r === col) continue;
      const factor = A[r][col];
      for (let c = 0; c < 2 * d; c++) A[r][c] -= factor * A[col][c];
    }
  }
  return A.map(row => row.slice(d));
}
function matVec(m, v) { return m.map(row => row.reduce((s, x, j) => s + x * v[j], 0)); }
function dot(a, b) { return a.reduce((s, x, i) => s + x * b[i], 0); }
function mahalanobis(a, b, invCov) {
  const diff = a.map((x, i) => x - b[i]);
  return Math.sqrt(dot(diff, matVec(invCov, diff)));
}

// ---------------- Matching: Draft-Athletik-Profil <-> CFBD-Produktion ----------------
// Fuer jedes gedraftete Spieler-Profil die passende CFBD-Produktions-Saison
// suchen (Jahrgang draftYear-1, Fallback draftYear-2). Gibt die angereicherte
// Pool-Liste zurueck: { ...productionRow, draftYear, draftRound, draftPick,
// ras, draftCapitalScore }. Reine Funktion, keine Datei-I/O -- unit-testbar.
function buildHistoricalPool(seasonsData, athleticProfiles, pos) {
  const byNameYear = {}; // "year|nameKey" -> productionRow (fuer O(1)-Lookup)
  Object.keys(seasonsData).forEach(year => {
    const rows = (seasonsData[year] && seasonsData[year][pos]) || [];
    rows.forEach(r => { byNameYear[`${year}|${nameKey(r.name)}`] = r; });
  });

  const pool = [];
  let matched = 0, unmatched = 0;
  (athleticProfiles[pos] || []).forEach(profile => {
    const candidates = [profile.draftYear - 1, profile.draftYear - 2];
    let prod = null;
    for (const y of candidates) { prod = byNameYear[`${y}|${profile.nameKey}`]; if (prod) break; }
    if (!prod) { unmatched++; return; }
    matched++;
    pool.push({
      id: `nfl_${profile.draftYear}_${profile.nameKey}`,
      name: prod.name, team: prod.team, year: prod.year,
      draftYear: profile.draftYear, draftRound: profile.draftRound, draftPick: profile.draftPick,
      ras: profile.ras, draftCapitalScore: profile.draftCapitalScore,
      // Production- + Groesse-Features 1:1 aus der CFBD-Zeile uebernehmen
      // (fuer die Matching-Distanz).
      ...Object.fromEntries(MATCH_FEATURES[pos].map(f => [f, prod[f] ?? null])),
    });
  });
  return { pool, matched, unmatched };
}

// Berechnet fuer jeden `target` (aktueller Prospect) die COMPS_N naechsten
// Nachbarn aus dem historischen `pool`, per Mahalanobis auf MATCH_FEATURES.
// Reine Funktion, keine Datei-I/O -- unit-testbar.
function computeProfileComps(pool, targets, features) {
  const complete = pool.filter(p => features.every(f => p[f] != null && !Number.isNaN(p[f])));
  if (complete.length < 30) return {};
  const stats = {};
  features.forEach(f => {
    const vals = complete.map(p => p[f]);
    const mu = mean(vals);
    const sd = Math.sqrt(mean(vals.map(v => (v - mu) ** 2))) || 1;
    stats[f] = { mu, sd };
  });
  const vec = p => features.map(f => (p[f] - stats[f].mu) / stats[f].sd);
  const rows = complete.map(vec);
  const { cov } = covMatrix(rows);
  const invCov = invert(cov);

  const out = {};
  targets.forEach(target => {
    if (!features.every(f => target[f] != null && !Number.isNaN(target[f]))) return;
    const tVec = vec(target);
    const distances = complete
      .filter(p => p.id !== target.id)
      .map(p => ({ p, dist: mahalanobis(tVec, vec(p), invCov) }))
      .sort((a, b) => a.dist - b.dist)
      .slice(0, COMPS_N)
      .map(({ p, dist }) => ({
        id: p.id, name: p.name, team: p.team, year: p.year, dist: round(dist, 3),
        draftYear: p.draftYear, draftRound: p.draftRound, draftPick: p.draftPick,
        ras: p.ras ? p.ras.overall : null,
        draftCapitalScore: p.draftCapitalScore,
      }));
    out[target.id] = distances;
  });
  return out;
}

function main() {
  console.log('\n=== NFL Profile Comp Build (lokal, keine CFBD-Calls) ===\n');

  const scouting = loadVm(SCOUTING_FILE, 'COLLEGE_SCOUTING');
  if (!scouting) { console.error(`FEHLER: ${SCOUTING_FILE} nicht gefunden -- erst sync-college-scouting.js laufen lassen.`); process.exit(1); }
  const athleticProfiles = loadVm(PROFILES_FILE, 'NFL_DRAFT_ATHLETIC_PROFILES');
  if (!athleticProfiles) { console.error(`FEHLER: ${PROFILES_FILE} nicht gefunden -- erst scripts/build-nfl-draft-athletic-profiles.js laufen lassen (oder das gelieferte File einspielen).`); process.exit(1); }

  const output = { meta: { builtAt: new Date().toISOString(), matchFeatures: MATCH_FEATURES }, comps: {}, stats: {} };

  POS.forEach(pos => {
    const { pool, matched, unmatched } = buildHistoricalPool(scouting.seasons, athleticProfiles, pos);
    const targets = (scouting.recent && scouting.recent[pos]) || [];
    const comps = computeProfileComps(pool, targets, MATCH_FEATURES[pos]);
    output.comps[pos] = comps;
    output.stats[pos] = { poolSize: pool.length, matched, unmatched, targetsWithComps: Object.keys(comps).length };
    console.log(`${pos}: ${matched} gedraftete Spieler per Name gematcht (${unmatched} nicht gefunden), Pool ${pool.length}, Comps fuer ${Object.keys(comps).length}/${targets.length} aktuelle Prospects.`);
  });

  const body = `// ============================================================
//  NFL_PROFILE_COMP — "Rollenprofil aehnelt X vor dessen Draft"
// ============================================================
//  AUTO-GENERIERT von scripts/build-nfl-profile-comp.js. Nicht von Hand
//  editieren. Siehe claude/college-scouting-concept.md Abschnitt 2 + 7.
//
//  NFL_PROFILE_COMP.comps[Pos][playerId] = Top-${COMPS_N}-historische Comps
//  (Mahalanobis auf Production+Groesse-Features, siehe meta.matchFeatures),
//  angereichert mit dem TATSAECHLICHEN Draft-Ergebnis + RAS-Score DIESES
//  Comps (nicht des Prospects selbst -- der hat beides noch nicht).
//
//  WICHTIG (UI-Sprache, siehe Projekt-Doc Abschnitt 6): "Profiliert wie ...
//  (Pre-Draft-Rollenarchetyp, KEINE Erfolgsprognose)" -- niemals mit College
//  Production Comp vermischen oder als Talent-/Erfolgsvorhersage labeln.
// ============================================================

const NFL_PROFILE_COMP = ${JSON.stringify(output, null, 2)};
`;
  fs.writeFileSync(OUT, body, 'utf8');
  console.log(`\n✅ ${OUT} geschrieben (${Math.round(body.length / 1024)} KB).`);
}

if (require.main === module) { main(); }

module.exports = { buildHistoricalPool, computeProfileComps, nameKey, MATCH_FEATURES, PROD_FEATURES };
