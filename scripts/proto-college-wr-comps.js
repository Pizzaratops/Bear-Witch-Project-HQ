#!/usr/bin/env node
// ============================================================
//  PROTOTYP 2: College Production Comp -- WR mit echtem Comp-Finder
// ============================================================
//  Baut auf proto-college-wr.js auf, aber ueber MEHRERE Jahrgaenge (damit
//  es ueberhaupt "wem sieht er aehnlich" geben kann -- braucht einen
//  historischen Vergleichspool, nicht nur die aktuelle Saison).
//
//  Pro Jahr 3 Calls (stats/player/season, player/usage, ppa/players/season,
//  jeweils OHNE team-Param) -- bei JAHRE.length=13 also 39 Calls insgesamt,
//  weit unter dem 1000/Monat-Limit des Free-Tiers.
//
//  Features (alle standardisiert/z-score vor der Distanzberechnung):
//    recShare, ydShare, tdShare  (Dominator-Rating-Stil, Nenner = alle
//                                 Pass-Catcher des Teams)
//    avgPPA                      (Effizienz, aus ppa/players/season)
//    usageOverall                (Rollen-Anteil, aus player/usage)
//
//  Distanz: echte Mahalanobis-Distanz (Kovarianzmatrix ueber den ganzen
//  Pool, invertiert per Gauss-Jordan) -- beruecksichtigt Korrelationen
//  zwischen den Features (z.B. ydShare/recShare sind stark korreliert),
//  im Gegensatz zu einfacher euklidischer Distanz im Z-Score-Raum.
//
//  Mindest-Volumen-Filter (YDS>=250) gegen Kleine-Stichprobe-Rauschen
//  (siehe Beispiel Bradyn Anderson/Army aus dem ersten Prototyp-Lauf).
//
//  Schreibt NICHTS nach data/ -- nur Konsolen-Output + JSON zur Inspektion.
//
//  Usage: CFBD_API_KEY=... node scripts/proto-college-wr-comps.js
//         TARGET="Jeremiah Smith" node scripts/proto-college-wr-comps.js
// ============================================================

const fs = require('fs');
const path = require('path');
const https = require('https');

const API_KEY = process.env.CFBD_API_KEY;
const TARGET_NAME = process.env.TARGET || 'Jeremiah Smith';
const OUT_JSON = path.join(__dirname, '..', 'proto-college-wr-comps-output.json');
const YEARS = [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
const MIN_YDS = 250;

if (!API_KEY) {
  console.error('FEHLER: CFBD_API_KEY ist nicht gesetzt.');
  process.exit(1);
}

const FBS_CONFERENCES = new Set([
  'SEC', 'Big Ten', 'ACC', 'Big 12', 'American Athletic', 'Mid-American',
  'Sun Belt', 'Conference USA', 'Mountain West', 'Pac-12', 'FBS Independents',
]);

function cfbdGet(pathAndQuery) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.collegefootballdata.com',
      path: pathAndQuery,
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'application/json',
        'User-Agent': 'bear-witch-project-hq-proto',
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
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function fetchYear(year) {
  const [statsRaw, usageRaw, ppaRaw] = await Promise.all([
    cfbdGet(`/stats/player/season?year=${year}&category=receiving`),
    cfbdGet(`/player/usage?year=${year}`).catch(() => []),
    cfbdGet(`/ppa/players/season?year=${year}`).catch(() => []),
  ]);

  const byPlayer = {};
  statsRaw.forEach(r => {
    if (r.position !== 'WR') return;
    if (!FBS_CONFERENCES.has(r.conference)) return;
    const p = byPlayer[r.playerId] || (byPlayer[r.playerId] = {
      id: `${year}_${r.playerId}`, rawId: r.playerId, name: r.player, team: r.team, conf: r.conference, year,
    });
    p[r.statType] = num(r.stat);
  });

  const teamTotals = {};
  statsRaw.forEach(r => {
    if (!FBS_CONFERENCES.has(r.conference)) return;
    if (r.statType !== 'REC' && r.statType !== 'YDS' && r.statType !== 'TD') return;
    const t = teamTotals[r.team] || (teamTotals[r.team] = { REC: 0, YDS: 0, TD: 0 });
    t[r.statType] += num(r.stat) || 0;
  });

  const usageById = {};
  usageRaw.forEach(u => { if (u.position === 'WR') usageById[u.id] = u.usage; });
  const ppaById = {};
  ppaRaw.forEach(u => { if (u.position === 'WR') ppaById[u.id] = u; });

  const players = Object.values(byPlayer).filter(p => (p.YDS || 0) >= MIN_YDS);
  players.forEach(p => {
    const t = teamTotals[p.team] || { REC: 1, YDS: 1, TD: 1 };
    p.recShare = 100 * (p.REC || 0) / (t.REC || 1);
    p.ydShare = 100 * (p.YDS || 0) / (t.YDS || 1);
    p.tdShare = 100 * (p.TD || 0) / (t.TD || 1);
    const usage = usageById[p.rawId];
    p.usageOverall = usage ? 100 * usage.overall : null;
    const ppa = ppaById[p.rawId];
    p.avgPPA = ppa ? ppa.averagePPA?.all : null;
  });
  return players;
}

// ---------------- Mahalanobis-Distanz (reines JS, keine Deps) ----------------
function mean(arr) { return arr.reduce((s, v) => s + v, 0) / arr.length; }
function covMatrix(rows) {
  // rows: Array von Feature-Vektoren (Arrays gleicher Laenge)
  const n = rows.length, d = rows[0].length;
  const mu = Array.from({ length: d }, (_, j) => mean(rows.map(r => r[j])));
  const cov = Array.from({ length: d }, () => Array(d).fill(0));
  rows.forEach(r => {
    for (let i = 0; i < d; i++) for (let j = 0; j < d; j++) cov[i][j] += (r[i] - mu[i]) * (r[j] - mu[j]);
  });
  for (let i = 0; i < d; i++) for (let j = 0; j < d; j++) cov[i][j] /= (n - 1);
  return { mu, cov };
}
// Gauss-Jordan-Inversion einer d x d Matrix
function invert(m) {
  const d = m.length;
  const A = m.map((row, i) => [...row, ...Array.from({ length: d }, (_, j) => (i === j ? 1 : 0))]);
  for (let col = 0; col < d; col++) {
    let pivot = col;
    for (let r = col + 1; r < d; r++) if (Math.abs(A[r][col]) > Math.abs(A[pivot][col])) pivot = r;
    [A[col], A[pivot]] = [A[pivot], A[col]];
    const pv = A[col][col];
    if (Math.abs(pv) < 1e-10) { A[col][col] += 1e-6; } // Regularisierung gg. Singularitaet
    const pv2 = A[col][col];
    for (let c = 0; c < 2 * d; c++) A[col][c] /= pv2;
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

async function main() {
  console.log(`\n=== College Production Comp Prototyp 2 -- WR, ${YEARS[0]}-${YEARS[YEARS.length - 1]} ===\n`);
  let all = [];
  for (const y of YEARS) {
    process.stdout.write(`Lade ${y} ... `);
    try {
      const rows = await fetchYear(y);
      console.log(`${rows.length} Spieler (>= ${MIN_YDS} Yds).`);
      all = all.concat(rows);
    } catch (e) {
      console.log(`FEHLER: ${e.message} -- Jahr uebersprungen.`);
    }
    await sleep(150); // kleine Pause, freundlich zum Free-Tier-Rate-Limit
  }
  console.log(`\nGesamt-Pool: ${all.length} Spieler-Saisons.`);

  const FEATURES = ['recShare', 'ydShare', 'tdShare', 'avgPPA', 'usageOverall'];
  const complete = all.filter(p => FEATURES.every(f => p[f] != null && !Number.isNaN(p[f])));
  console.log(`Davon mit allen ${FEATURES.length} Features vollstaendig: ${complete.length}.`);

  if (complete.length < 30) {
    console.error('Zu wenige vollstaendige Datensaetze fuer eine sinnvolle Kovarianzmatrix -- Abbruch.');
    return;
  }

  // Z-Standardisierung je Feature (macht die Kovarianzmatrix zur Korrelationsmatrix
  // -- Mahalanobis wird dadurch numerisch stabiler, Ergebnis ist aequivalent)
  const stats = {};
  FEATURES.forEach(f => {
    const vals = complete.map(p => p[f]);
    const mu = mean(vals);
    const sd = Math.sqrt(mean(vals.map(v => (v - mu) ** 2))) || 1;
    stats[f] = { mu, sd };
  });
  const vec = p => FEATURES.map(f => (p[f] - stats[f].mu) / stats[f].sd);

  const rows = complete.map(vec);
  const { cov } = covMatrix(rows);
  const invCov = invert(cov);

  fs.writeFileSync(OUT_JSON, JSON.stringify({ years: YEARS, features: FEATURES, poolSize: complete.length, players: complete }, null, 2), 'utf8');
  console.log(`Voller Pool gespeichert: ${OUT_JSON}`);

  // ---- Comp-Suche fuer TARGET_NAME (nimmt die neueste passende Saison) ----
  const matches = complete.filter(p => p.name === TARGET_NAME).sort((a, b) => b.year - a.year);
  if (!matches.length) {
    console.log(`\nKein vollstaendiger Datensatz fuer "${TARGET_NAME}" gefunden (evtl. unter MIN_YDS=${MIN_YDS} oder fehlende Usage/PPA-Daten).`);
    return;
  }
  const target = matches[0];
  const targetVec = vec(target);
  console.log(`\n=== Comps fuer ${target.name} (${target.team}, ${target.year}) ===`);
  console.log(`Profil: RecShare=${round(target.recShare)}% YdShare=${round(target.ydShare)}% TdShare=${round(target.tdShare)}% avgPPA=${round(target.avgPPA, 3)} Usage=${round(target.usageOverall)}%\n`);

  const distances = complete
    .filter(p => p.id !== target.id)
    .map(p => ({ p, dist: mahalanobis(targetVec, vec(p), invCov) }))
    .sort((a, b) => a.dist - b.dist)
    .slice(0, 10);

  console.log('Name'.padEnd(24) + 'Team'.padEnd(18) + 'Jahr'.padEnd(6) + 'Dist'.padEnd(7) + 'RecSh%'.padEnd(8) + 'YdSh%'.padEnd(7) + 'TdSh%'.padEnd(7) + 'avgPPA'.padEnd(8) + 'Usage%');
  distances.forEach(({ p, dist }) => {
    console.log(
      (p.name || '').padEnd(24) + (p.team || '').padEnd(18) + String(p.year).padEnd(6) + round(dist, 3).toString().padEnd(7) +
      round(p.recShare).toString().padEnd(8) + round(p.ydShare).toString().padEnd(7) + round(p.tdShare).toString().padEnd(7) +
      round(p.avgPPA, 3).toString().padEnd(8) + round(p.usageOverall).toString()
    );
  });
}

main().catch(e => { console.error('FEHLER:', e.message); process.exit(1); });
