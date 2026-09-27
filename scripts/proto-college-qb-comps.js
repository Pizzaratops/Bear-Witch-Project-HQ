#!/usr/bin/env node
// ============================================================
//  PROTOTYP 2: College Production Comp -- QB mit echtem Comp-Finder
// ============================================================
//  Analog zu proto-college-wr-comps.js / proto-college-rb-comps.js.
//  Bestaetigte statType-Werte fuer category=passing (aus proto-college-
//  qb.js-Testlauf): ATT, COMPLETIONS, INT, PCT, TD, YDS, YPA.
//
//  WICHTIG (Projekt-Doc Abschnitt 1): Passing und Rushing werden als
//  GETRENNTE Features gefuehrt (avgPpaPass/avgPpaRush, usagePass/
//  usageRush), nicht zu einer Mischmetrik verrechnet -- sonst wuerde ein
//  Dual-Threat-QB (viel Rushing, weniger Passing-Volumen) verzerrt.
//  Die Z-Standardisierung je Feature vor der Mahalanobis-Distanz erfuellt
//  das bereits (jede Achse einzeln standardisiert statt vorher gemittelt).
//
//  Features: avgPpaPass, avgPpaRush, usagePass, usageRush, compPct
//  Mindest-Volumen: passYds >= 1500.
//
//  Usage: CFBD_API_KEY=... node scripts/proto-college-qb-comps.js
//         TARGET="Fernando Mendoza" node scripts/proto-college-qb-comps.js
// ============================================================

const fs = require('fs');
const path = require('path');
const https = require('https');

const API_KEY = process.env.CFBD_API_KEY;
const TARGET_NAME = process.env.TARGET || 'Fernando Mendoza';
const OUT_JSON = path.join(__dirname, '..', 'proto-college-qb-comps-output.json');
const YEARS = [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
const MIN_PASS_YDS = 1500;

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
  const [passingRaw, rushingRaw, usageRaw, ppaRaw] = await Promise.all([
    cfbdGet(`/stats/player/season?year=${year}&category=passing`),
    cfbdGet(`/stats/player/season?year=${year}&category=rushing`),
    cfbdGet(`/player/usage?year=${year}`).catch(() => []),
    cfbdGet(`/ppa/players/season?year=${year}`).catch(() => []),
  ]);

  const byPlayer = {};
  const getOrCreate = (rawId, name, team, conf) => {
    const id = `${year}_${rawId}`;
    return byPlayer[id] || (byPlayer[id] = { id, rawId, name, team, conf, year });
  };
  passingRaw.forEach(r => {
    if (r.position !== 'QB') return;
    if (!FBS_CONFERENCES.has(r.conference)) return;
    const p = getOrCreate(r.playerId, r.player, r.team, r.conference);
    p[`pass_${r.statType}`] = num(r.stat);
  });
  rushingRaw.forEach(r => {
    if (r.position !== 'QB') return;
    if (!FBS_CONFERENCES.has(r.conference)) return;
    const p = getOrCreate(r.playerId, r.player, r.team, r.conference);
    p[`rush_${r.statType}`] = num(r.stat);
  });

  const usageById = {};
  usageRaw.forEach(u => { if (u.position === 'QB') usageById[u.id] = u.usage; });
  const ppaById = {};
  ppaRaw.forEach(u => { if (u.position === 'QB') ppaById[u.id] = u; });

  const players = Object.values(byPlayer).filter(p => (p.pass_YDS || 0) >= MIN_PASS_YDS);
  players.forEach(p => {
    p.compPct = p.pass_PCT != null ? 100 * p.pass_PCT : null;
    p.rushYds = p.rush_YDS ?? null;
    const usage = usageById[p.rawId];
    p.usagePass = usage ? 100 * usage.pass : null;
    p.usageRush = usage ? 100 * usage.rush : null;
    const ppa = ppaById[p.rawId];
    p.avgPpaPass = ppa ? ppa.averagePPA?.pass : null;
    p.avgPpaRush = ppa ? ppa.averagePPA?.rush : null;
  });
  return players;
}

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

async function main() {
  console.log(`\n=== College Production Comp Prototyp 2 -- QB, ${YEARS[0]}-${YEARS[YEARS.length - 1]} ===\n`);
  let all = [];
  for (const y of YEARS) {
    process.stdout.write(`Lade ${y} ... `);
    try {
      const rows = await fetchYear(y);
      console.log(`${rows.length} Spieler (>= ${MIN_PASS_YDS} Pass-Yds).`);
      all = all.concat(rows);
    } catch (e) {
      console.log(`FEHLER: ${e.message} -- Jahr uebersprungen.`);
    }
    await sleep(150);
  }
  console.log(`\nGesamt-Pool: ${all.length} Spieler-Saisons.`);

  const FEATURES = ['avgPpaPass', 'avgPpaRush', 'usagePass', 'usageRush', 'compPct'];
  const complete = all.filter(p => FEATURES.every(f => p[f] != null && !Number.isNaN(p[f])));
  console.log(`Davon mit allen ${FEATURES.length} Features vollstaendig: ${complete.length}.`);

  if (complete.length < 30) {
    console.error('Zu wenige vollstaendige Datensaetze -- Abbruch.');
    return;
  }

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

  const matches = complete.filter(p => p.name === TARGET_NAME).sort((a, b) => b.year - a.year);
  if (!matches.length) {
    console.log(`\nKein vollstaendiger Datensatz fuer "${TARGET_NAME}" gefunden.`);
    return;
  }
  const target = matches[0];
  const targetVec = vec(target);
  console.log(`\n=== Comps fuer ${target.name} (${target.team}, ${target.year}) ===`);
  console.log(`Profil: avgPpaPass=${round(target.avgPpaPass, 3)} avgPpaRush=${round(target.avgPpaRush, 3)} UsagePass=${round(target.usagePass)}% UsageRush=${round(target.usageRush)}% Comp%=${round(target.compPct)}\n`);

  const distances = complete
    .filter(p => p.id !== target.id)
    .map(p => ({ p, dist: mahalanobis(targetVec, vec(p), invCov) }))
    .sort((a, b) => a.dist - b.dist)
    .slice(0, 10);

  console.log('Name'.padEnd(22) + 'Team'.padEnd(16) + 'Jahr'.padEnd(6) + 'Dist'.padEnd(7) + 'PpaPass'.padEnd(9) + 'PpaRush'.padEnd(9) + 'UsgPass%'.padEnd(9) + 'UsgRush%'.padEnd(9) + 'Comp%');
  distances.forEach(({ p, dist }) => {
    console.log(
      (p.name || '').padEnd(22) + (p.team || '').padEnd(16) + String(p.year).padEnd(6) + round(dist, 3).toString().padEnd(7) +
      round(p.avgPpaPass, 3).toString().padEnd(9) + round(p.avgPpaRush, 3).toString().padEnd(9) +
      round(p.usagePass).toString().padEnd(9) + round(p.usageRush).toString().padEnd(9) + round(p.compPct).toString()
    );
  });
}

main().catch(e => { console.error('FEHLER:', e.message); process.exit(1); });
