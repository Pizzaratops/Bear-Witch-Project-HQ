#!/usr/bin/env node
// ============================================================
//  COLLEGE SCOUTING SYNC — Produktions-Comp fuer College-Prospects
// ============================================================
//  Erste Ausbaustufe der "College Scouting"-Erweiterung zu Player DNA
//  (siehe Projekt-Doc claude/college-scouting-concept.md). Aktuell nur
//  "College Production Comp" (wem sieht ein Prospect aehnlich in der
//  College-Produktion), NFL Profile Comp folgt spaeter (braucht noch
//  RAS/Athletik-Daten).
//
//  Positionen: WR, RB (validiert per Prototyp 27.09.2026, siehe Doc).
//  TE/QB folgen -- gleiches Muster, andere Feature-Sets.
//
//  Quelle: CollegeFootballData.com API (CFBD), Free-Tier (1000 Calls/
//  Monat). Braucht CFBD_API_KEY als Env-Var (in GitHub Actions als
//  Repo-Secret hinterlegen -- NIE in eine Datei schreiben).
//
//  RATE-LIMIT-STRATEGIE (wichtig!): Abgeschlossene Saisons aendern sich
//  nicht mehr -> werden aus der bestehenden data/college-scouting.js
//  uebernommen (0 API-Calls), neu geholt wird NUR die laufende Saison
//  (4 Calls: stats/rushing, stats/receiving, player/usage, ppa/season --
//  je EIN Call fuer die GESAMTE Liga, kein team-Parameter noetig).
//  COLLEGE_REBUILD=1 holt alle Jahrgaenge neu (fuer Erst-Lauf oder wenn
//  sich die Berechnung geaendert hat -- kostet dann ~48 Calls fuer
//  2013-<laufende Saison>, weit unter dem Monatslimit).
//
//  "Laufende Saison" = College-Football-Jahrgang nach NCAA-Konvention
//  (Saison 2025 laeuft Aug 2025 - Jan 2026, wird "year=2025" genannt).
//  Ab Juli gilt das aktuelle Kalenderjahr schon als laufende Saison
//  (Preseason/erste Wochen), davor noch das Vorjahr.
//
//  Mindest-Volumen (MIN_*): Spieler darunter werden NICHT in den Pool
//  aufgenommen (kein Early-Signal-Fallback in v1 -- siehe TODO unten).
//  Comps (Mahalanobis-Nachbarn) werden nur fuer die zwei juengsten
//  Jahrgaenge gespeichert (aktuelle + potenzielle naechste Draft-Klasse),
//  nicht fuer den gesamten historischen Pool -- der dient nur als
//  Vergleichs-Universum.
//
//  Schreibt data/college-scouting.js -> COLLEGE_SCOUTING
//  Usage:
//    CFBD_API_KEY=... node scripts/sync-college-scouting.js
//    COLLEGE_REBUILD=1 CFBD_API_KEY=... node scripts/sync-college-scouting.js
// ============================================================

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const https = require('https');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'data', 'college-scouting.js');
const API_KEY = process.env.CFBD_API_KEY;
const REBUILD = process.env.COLLEGE_REBUILD === '1';
const HIST_START = 2013;

const FBS_CONFERENCES = new Set([
  'SEC', 'Big Ten', 'ACC', 'Big 12', 'American Athletic', 'Mid-American',
  'Sun Belt', 'Conference USA', 'Mountain West', 'Pac-12', 'FBS Independents',
]);

const MIN_VOLUME = { WR: { key: 'YDS', val: 250 }, RB: { key: 'rush_YDS', val: 300 } };
const RECENT_SEASONS_FOR_COMPS = 2; // fuer diese vielen juengsten Jahrgaenge werden Comps gespeichert
const COMPS_N = 10;

function currentSeason() {
  const now = new Date();
  const month = now.getUTCMonth() + 1; // 1-12
  return month >= 7 ? now.getUTCFullYear() : now.getUTCFullYear() - 1;
}

// ---------------- CFBD HTTP ----------------
function cfbdGet(pathAndQuery) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.collegefootballdata.com',
      path: pathAndQuery,
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'application/json',
        'User-Agent': 'bear-witch-project-hq-bot',
      },
    };
    https.get(options, res => {
      if (res.statusCode !== 200) {
        let body = '';
        res.on('data', c => { body += c; });
        res.on('end', () => reject(new Error(`HTTP ${res.statusCode} fuer ${pathAndQuery}: ${body.slice(0, 300)}`)));
        return;
      }
      let data = '';
      res.on('data', c => { data += c; });
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error(`JSON-Parse-Fehler fuer ${pathAndQuery}: ${e.message}`)); }
      });
    }).on('error', reject);
  });
}

const num = v => (v === '' || v == null ? null : Number(v));
const round = (x, d = 2) => (x == null ? null : Math.round(x * 10 ** d) / 10 ** d);

// ---------------- Reine Transform-Funktionen (unit-testbar, keine Netzwerk-Calls) ----------------

// Baut aus den vier Rohdatensaetzen eines Jahres die WR- und RB-Spielerlisten.
// Exportiert fuer Tests -- macht selbst keine API-Calls.
function buildYearRecords(year, rushingRaw, receivingRaw, usageRaw, ppaRaw) {
  const teamRush = {}; // team -> { CAR, YDS, TD, ... } ueber ALLE Positionen
  rushingRaw.forEach(r => {
    if (!FBS_CONFERENCES.has(r.conference)) return;
    const t = teamRush[r.team] || (teamRush[r.team] = {});
    t[r.statType] = (t[r.statType] || 0) + (num(r.stat) || 0);
  });
  const teamRec = {}; // team -> { REC, YDS, TD } ueber ALLE Positionen
  receivingRaw.forEach(r => {
    if (!FBS_CONFERENCES.has(r.conference)) return;
    if (r.statType !== 'REC' && r.statType !== 'YDS' && r.statType !== 'TD') return;
    const t = teamRec[r.team] || (teamRec[r.team] = { REC: 0, YDS: 0, TD: 0 });
    t[r.statType] += num(r.stat) || 0;
  });

  const usageById = {};
  usageRaw.forEach(u => { usageById[u.id] = u.usage; });
  const ppaById = {};
  ppaRaw.forEach(u => { ppaById[u.id] = u; });

  // ---- WR ----
  const wrByPlayer = {};
  receivingRaw.forEach(r => {
    if (r.position !== 'WR') return;
    if (!FBS_CONFERENCES.has(r.conference)) return;
    const p = wrByPlayer[r.playerId] || (wrByPlayer[r.playerId] = {
      id: `${year}_${r.playerId}`, rawId: r.playerId, name: r.player, team: r.team, conf: r.conference, year,
    });
    p[r.statType] = num(r.stat);
  });
  const wr = Object.values(wrByPlayer)
    .filter(p => (p.YDS || 0) >= MIN_VOLUME.WR.val)
    .map(p => {
      const t = teamRec[p.team] || { REC: 1, YDS: 1, TD: 1 };
      const usage = usageById[p.rawId];
      const ppa = ppaById[p.rawId];
      return {
        id: p.id, rawId: p.rawId, name: p.name, team: p.team, conf: p.conf, year,
        rec: p.REC ?? null, yds: p.YDS ?? null, td: p.TD ?? null,
        recShare: round(100 * (p.REC || 0) / (t.REC || 1), 1),
        ydShare: round(100 * (p.YDS || 0) / (t.YDS || 1), 1),
        tdShare: round(100 * (p.TD || 0) / (t.TD || 1), 1),
        usageOverall: usage ? round(100 * usage.overall, 1) : null,
        avgPPA: ppa ? round(ppa.averagePPA?.all, 3) : null,
      };
    });

  // ---- RB ----
  const rbByPlayer = {};
  rushingRaw.forEach(r => {
    if (r.position !== 'RB') return;
    if (!FBS_CONFERENCES.has(r.conference)) return;
    const p = rbByPlayer[r.playerId] || (rbByPlayer[r.playerId] = {
      id: `${year}_${r.playerId}`, rawId: r.playerId, name: r.player, team: r.team, conf: r.conference, year,
    });
    p[`rush_${r.statType}`] = num(r.stat);
  });
  receivingRaw.forEach(r => {
    if (r.position !== 'RB') return;
    if (!FBS_CONFERENCES.has(r.conference)) return;
    const p = rbByPlayer[r.playerId] || (rbByPlayer[r.playerId] = {
      id: `${year}_${r.playerId}`, rawId: r.playerId, name: r.player, team: r.team, conf: r.conference, year,
    });
    p[`rec_${r.statType}`] = num(r.stat);
  });
  const rb = Object.values(rbByPlayer)
    .filter(p => (p.rush_YDS || 0) >= MIN_VOLUME.RB.val)
    .map(p => {
      const tRush = teamRush[p.team] || {};
      const tRec = teamRec[p.team] || { YDS: 1 };
      const usage = usageById[p.rawId];
      const ppa = ppaById[p.rawId];
      return {
        id: p.id, rawId: p.rawId, name: p.name, team: p.team, conf: p.conf, year,
        rushYds: p.rush_YDS ?? null, rushCar: p.rush_CAR ?? null, rushTd: p.rush_TD ?? null,
        recYds: p.rec_YDS ?? null,
        rushCarShare: tRush.CAR ? round(100 * (p.rush_CAR || 0) / tRush.CAR, 1) : null,
        recYdShare: tRec.YDS ? round(100 * (p.rec_YDS || 0) / tRec.YDS, 1) : 0,
        usageRush: usage ? round(100 * usage.rush, 1) : null,
        avgPpaRush: ppa ? round(ppa.averagePPA?.rush, 3) : null,
        avgPpaPass: ppa ? round(ppa.averagePPA?.pass, 3) : null,
      };
    });

  return { WR: wr, RB: rb };
}

// ---------------- Mahalanobis (reines JS, keine Deps) ----------------
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

const FEATURES = {
  WR: ['recShare', 'ydShare', 'tdShare', 'avgPPA', 'usageOverall'],
  RB: ['rushCarShare', 'recYdShare', 'avgPpaRush', 'avgPpaPass', 'usageRush'],
};

// Berechnet fuer jeden Spieler in `targets` die COMPS_N naechsten Nachbarn
// aus `pool` (per Mahalanobis, auf denselben Z-standardisierten Features).
// Gibt { [playerId]: [{id,name,team,year,dist}, ...] } zurueck.
function computeComps(pool, targets, features) {
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
      .map(({ p, dist }) => ({ id: p.id, name: p.name, team: p.team, year: p.year, dist: round(dist, 3) }));
    out[target.id] = distances;
  });
  return out;
}

// ---------------- Cache laden ----------------
function loadCache() {
  if (!fs.existsSync(OUT)) return null;
  try {
    const sb = {}; vm.createContext(sb);
    vm.runInContext(fs.readFileSync(OUT, 'utf8') + '\nthis.D = COLLEGE_SCOUTING;', sb);
    return sb.D || null;
  } catch (e) {
    console.warn(`Cache-Datei konnte nicht gelesen werden (${e.message}) -- baue komplett neu.`);
    return null;
  }
}

// ---------------- Main ----------------
async function main() {
  if (!API_KEY) { console.error('FEHLER: CFBD_API_KEY ist nicht gesetzt.'); process.exit(1); }

  const CURRENT = currentSeason();
  const ALL_YEARS = [];
  for (let y = HIST_START; y <= CURRENT; y++) ALL_YEARS.push(y);
  console.log(`\n=== College Scouting Sync -- laufende Saison: ${CURRENT} ===\n`);

  const cache = REBUILD ? null : loadCache();
  const seasonsData = (cache && cache.seasons) ? { ...cache.seasons } : {};

  for (const year of ALL_YEARS) {
    const isCurrent = year === CURRENT;
    if (!isCurrent && seasonsData[year] && !REBUILD) {
      console.log(`${year}: aus Cache uebernommen (${seasonsData[year].WR.length} WR, ${seasonsData[year].RB.length} RB).`);
      continue;
    }
    process.stdout.write(`${year}: lade 4 Endpunkte ... `);
    try {
      const [rushingRaw, receivingRaw, usageRaw, ppaRaw] = await Promise.all([
        cfbdGet(`/stats/player/season?year=${year}&category=rushing`),
        cfbdGet(`/stats/player/season?year=${year}&category=receiving`),
        cfbdGet(`/player/usage?year=${year}`).catch(() => []),
        cfbdGet(`/ppa/players/season?year=${year}`).catch(() => []),
      ]);
      const built = buildYearRecords(year, rushingRaw, receivingRaw, usageRaw, ppaRaw);
      seasonsData[year] = built;
      console.log(`${built.WR.length} WR, ${built.RB.length} RB.`);
    } catch (e) {
      console.log(`FEHLER: ${e.message} -- Jahr uebersprungen (${seasonsData[year] ? 'alter Cache-Stand bleibt' : 'komplett fehlend'}).`);
    }
  }

  // ---- Comps fuer die juengsten Jahrgaenge (Pool selbst wird NICHT nochmal
  // separat gespeichert -- steht schon vollstaendig in `seasons`, siehe unten) ----
  const recentYears = new Set(ALL_YEARS.slice(-RECENT_SEASONS_FOR_COMPS));
  const output = {
    meta: { lastSync: new Date().toISOString(), currentSeason: CURRENT, years: ALL_YEARS, features: FEATURES },
    seasons: seasonsData, // Cache-Grundlage FUER DIESES SCRIPT + vollstaendige Historie
    recent: {}, // kleine, direkt frontend-taugliche Teilmenge (nur die Draft-relevanten Prospects)
    comps: {},
  };

  for (const pos of ['WR', 'RB']) {
    const pool = [];
    ALL_YEARS.forEach(y => { if (seasonsData[y]) pool.push(...seasonsData[y][pos]); });
    const targets = pool.filter(p => recentYears.has(p.year));
    output.recent[pos] = targets;
    output.comps[pos] = computeComps(pool, targets, FEATURES[pos]);
    console.log(`${pos}: Pool ${pool.length} Spieler-Saisons, Comps fuer ${Object.keys(output.comps[pos]).length} aktuelle Spieler berechnet.`);
  }

  const body = `// ============================================================
//  COLLEGE_SCOUTING — College Production Comp (WR, RB)
// ============================================================
//  AUTO-GENERIERT von scripts/sync-college-scouting.js. Nicht von Hand
//  editieren. Siehe claude/college-scouting-concept.md (Projekt-Doc)
//  fuer die Methodik.
//
//  COLLEGE_SCOUTING.seasons[Jahr][Pos] = Spieler-Saisons dieses Jahrgangs
//    (Mindest-Volumen gefiltert) -- vollstaendige Historie ${HIST_START}-${CURRENT},
//    dient als Cache-Grundlage (abgeschlossene Jahrgaenge werden beim naechsten
//    Lauf NICHT neu von CFBD geholt) UND als Vergleichs-Universum fuer die
//    Mahalanobis-Distanz.
//  COLLEGE_SCOUTING.recent[Pos] = nur die ${RECENT_SEASONS_FOR_COMPS} juengsten
//    Jahrgaenge, flach -- das sind die tatsaechlich Draft-relevanten Prospects,
//    fuers Frontend direkt nutzbar (keine Notwendigkeit, durch "seasons" zu
//    iterieren).
//  COLLEGE_SCOUTING.comps[Pos][playerId] = Top-${COMPS_N}-Comps (Mahalanobis-
//    Distanz) fuer genau diese "recent"-Spieler.
//
//  TODO (v2, siehe Projekt-Doc Abschnitt 7): Early-Signal-Fallback fuer
//  Spieler unter dem Mindest-Volumen (z.B. frueh in der laufenden Saison),
//  TE/QB-Positionen, NFL Profile Comp (RAS + Draft-Kapital-Kurve).
// ============================================================

const COLLEGE_SCOUTING = ${JSON.stringify(output, null, 2)};
`;
  const old = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : null;
  if (old === body) { console.log('\nKeine Aenderungen.'); return; }
  fs.writeFileSync(OUT, body, 'utf8');
  console.log(`\n✅ ${OUT} geschrieben (${Math.round(body.length / 1024)} KB).`);
}

if (require.main === module) {
  main().catch(e => { console.error('❌ College Scouting Sync fehlgeschlagen:', e.message); process.exit(1); });
}

module.exports = { buildYearRecords, computeComps, currentSeason, FEATURES };
