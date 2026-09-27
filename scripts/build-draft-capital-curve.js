#!/usr/bin/env node
// ============================================================
//  DRAFT CAPITAL CURVE — empirisch gelernt (nicht handgeschaetzt)
// ============================================================
//  Fuer den geplanten "NFL Profile Comp" (College-Scouting-Erweiterung von
//  Player DNA) brauchen wir eine Kurve "Draft-Pick -> erwartete fruehe
//  NFL-Opportunity", um Draft-Kapital NICHT linear (Pick 1 = 100, Pick 250 = 0)
//  in den Profil-Vektor einfliessen zu lassen, sondern mit der tatsaechlichen,
//  historisch beobachteten Form dieser Beziehung.
//
//  Opportunity-Proxy: durchschnittlicher Offense-Snap-Anteil ueber Rookie-
//  Saison + Jahr 2 (Regular Season). Draft-Jahrgaenge 2010-2023, damit Jahr 2
//  fuer jeden Spieler sicher abgeschlossen ist (keine laufende 2026-Saison
//  drin). Quelle: nflverse players.csv (draft_round/draft_pick/rookie_season)
//  + snap_counts_<Saison>.csv (offense_pct).
//
//  Das ist EINMALIGE Forschungs-/Ableitungsarbeit, kein taeglicher Sync --
//  Ergebnis wird als data/draft-capital-curve.js gespeichert. Bei Bedarf
//  spaeter erneut laufen lassen (z.B. wenn genug neue Jahrgaenge dazukommen),
//  aber die Kurve aendert sich nicht durch die laufende Saison.
//
//  Usage: node scripts/build-draft-capital-curve.js
// ============================================================

const fs = require('fs');
const path = require('path');
const https = require('https');
const zlib = require('zlib');

const REL = 'https://github.com/nflverse/nflverse-data/releases/download';
const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'data', 'draft-capital-curve.js');
const POS = ['QB', 'RB', 'WR', 'TE'];
const MIN_DRAFT_YEAR = 2010;
const MAX_DRAFT_YEAR = 2023;
const BUCKETS = [
  [1, 10, '1-10'], [11, 32, '11-32'], [33, 64, '33-64'], [65, 105, '65-105'],
  [106, 140, '106-140'], [141, 176, '141-176'], [177, 220, '177-220'], [221, 300, '221+'],
];

function getBuffer(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'dpe-hq-bot' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return getBuffer(res.headers.location).then(resolve, reject);
      }
      if (res.statusCode !== 200) { reject(new Error(`${res.statusCode} ${url}`)); res.resume(); return; }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}
async function loadCsvGz(url) { return parseCsv(zlib.gunzipSync(await getBuffer(url)).toString('utf8')); }
async function loadCsv(url) { return parseCsv((await getBuffer(url)).toString('utf8')); }
function parseCsv(text) {
  const lines = text.split('\n').filter(l => l.length);
  const headers = splitCsvLine(lines[0]);
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const vals = splitCsvLine(lines[i]);
    if (vals.length !== headers.length) continue;
    const o = {}; headers.forEach((h, j) => { o[h] = vals[j]; }); rows.push(o);
  }
  return rows;
}
function splitCsvLine(line) {
  const out = []; let cur = ''; let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (inQ) { if (c === '"') { if (line[i + 1] === '"') { cur += '"'; i++; } else inQ = false; } else cur += c; }
    else { if (c === '"') inQ = true; else if (c === ',') { out.push(cur); cur = ''; } else cur += c; }
  }
  out.push(cur);
  return out;
}
const num = v => (v === '' || v == null ? null : Number(v));
const round = x => Math.round(x * 1000) / 1000;

async function main() {
  console.log('Lade players.csv ...');
  const players = await loadCsv(`${REL}/players/players.csv`);
  const pool = players.filter(p =>
    POS.includes(p.position) && p.draft_year &&
    num(p.draft_year) >= MIN_DRAFT_YEAR && num(p.draft_year) <= MAX_DRAFT_YEAR &&
    p.draft_pick && p.pfr_id
  );
  console.log(`${pool.length} Spieler im Pool (QB/RB/WR/TE, Draft ${MIN_DRAFT_YEAR}-${MAX_DRAFT_YEAR}, mit Pick+PFR-ID).`);

  const seasonsNeeded = new Set();
  pool.forEach(p => { const rs = num(p.rookie_season); if (rs) { seasonsNeeded.add(rs); seasonsNeeded.add(rs + 1); } });
  const seasons = [...seasonsNeeded].filter(y => y >= MIN_DRAFT_YEAR && y <= 2025).sort((a, b) => a - b);
  console.log(`Lade snap_counts fuer ${seasons.length} Saisons: ${seasons.join(',')}`);

  const snapMap = {};
  for (const y of seasons) {
    try {
      const rows = await loadCsvGz(`${REL}/snap_counts/snap_counts_${y}.csv.gz`);
      const agg = {};
      rows.forEach(r => {
        if (r.game_type !== 'REG') return;
        const pct = num(r.offense_pct);
        if (pct == null) return;
        const a = agg[r.pfr_player_id] = agg[r.pfr_player_id] || { sum: 0, n: 0 };
        a.sum += pct; a.n++;
      });
      snapMap[y] = agg;
      console.log(`  ${y}: ${Object.keys(agg).length} Spieler mit Snap-Daten`);
    } catch (e) {
      console.warn(`  ${y}: FEHLER ${e.message} -- uebersprungen`);
      snapMap[y] = {};
    }
  }

  function earlyOpportunity(p) {
    const rs = num(p.rookie_season);
    if (!rs) return null;
    const vals = [];
    [rs, rs + 1].forEach(y => { const a = (snapMap[y] || {})[p.pfr_id]; if (a && a.n > 0) vals.push(a.sum / a.n); });
    return vals.length ? vals.reduce((s, v) => s + v, 0) / vals.length : null;
  }

  const rows = pool.map(p => ({
    pos: p.position, pick: num(p.draft_pick), opp: earlyOpportunity(p),
  })).filter(r => r.opp != null);
  console.log(`${rows.length} Spieler mit auswertbarer frueher Opportunity (Snap-Daten vorhanden).`);

  const curve = {};
  POS.forEach(pos => {
    curve[pos] = BUCKETS.map(([lo, hi, label]) => {
      const inBucket = rows.filter(r => r.pos === pos && r.pick >= lo && r.pick <= hi);
      if (!inBucket.length) return { bucket: label, n: 0, avgOpp: null, medianOpp: null };
      const vals = inBucket.map(r => r.opp).sort((a, b) => a - b);
      const avg = vals.reduce((s, v) => s + v, 0) / vals.length;
      return { bucket: label, n: vals.length, avgOpp: round(avg), medianOpp: round(vals[Math.floor(vals.length / 2)]) };
    });
  });

  const body = `// ============================================================
//  DRAFT_CAPITAL_CURVE — empirisch gelernte "Pick -> erwartete fruehe
//  NFL-Opportunity"-Kurve (kein linearer/handgeschaetzter Pick-Wert!)
// ============================================================
//  AUTO-GENERIERT von scripts/build-draft-capital-curve.js. Einmalige
//  Ableitung, kein taeglicher Sync -- die zugrundeliegenden Jahrgaenge
//  (${MIN_DRAFT_YEAR}-${MAX_DRAFT_YEAR}) sind abgeschlossen und aendern sich nicht.
//
//  Opportunity-Proxy: Ø Offense-Snap-Anteil ueber Rookie-Saison + Jahr 2
//  (Regular Season), aus nflverse snap_counts. Bucket = Draft-Pick-Bereich.
//  n = Anzahl Spieler im Bucket (Vorsicht bei kleinem n, z.B. QB 177-220
//  ist mit n<10 verrauscht -- eher die Nachbar-Buckets zur Glaettung nutzen).
//
//  DRAFT_CAPITAL_CURVE[Pos] = [{ bucket, n, avgOpp, medianOpp }]
//  avgOpp/medianOpp = 0..1 (Anteil Offense-Snaps). Undrafted/kein Pick ist
//  NICHT enthalten -- dafuer separat einen Wert unterhalb von "221+" annehmen.
// ============================================================

const DRAFT_CAPITAL_CURVE = ${JSON.stringify({ meta: { minDraftYear: MIN_DRAFT_YEAR, maxDraftYear: MAX_DRAFT_YEAR, sampleSize: rows.length, seasons, opportunityMetric: 'avg_offense_snap_pct_year1_2' }, curve }, null, 2)};
`;
  fs.writeFileSync(OUT, body, 'utf8');
  console.log(`\nGespeichert: ${OUT}`);

  console.log('\n=== Ø frueher Offense-Snap-Anteil (Jahr 1+2) nach Pick-Bucket ===\n');
  POS.forEach(pos => {
    console.log('-- ' + pos + ' --');
    curve[pos].forEach(b => {
      const avgS = b.avgOpp != null ? (b.avgOpp * 100).toFixed(1) + '%' : '-';
      const medS = b.medianOpp != null ? (b.medianOpp * 100).toFixed(1) + '%' : '-';
      console.log('  Pick ' + b.bucket.padEnd(8) + ' n=' + String(b.n).padEnd(4) + ' avg=' + avgS + '  median=' + medS);
    });
  });
}
main().catch(e => { console.error(e); process.exit(1); });
