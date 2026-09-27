#!/usr/bin/env node
// ============================================================
//  NFL DRAFT ATHLETIC PROFILES — RAS-Style-Score + Draft-Kapital je
//  gedraftetem Spieler (QB/RB/WR/TE), aus nflverse (KEINE CFBD-Calls!)
// ============================================================
//  Baustein 1 von 2 fuer "NFL Profile Comp" (siehe Projekt-Doc Abschnitt 2
//  + Abschnitt 7). Laeuft rein gegen nflverse-Github-Releases (kein
//  CFBD-Key noetig, keine Egress-Sperre in der Cloud-Sandbox -- kann hier
//  gebaut UND getestet werden, im Unterschied zu allem CFBD-Abhaengigen).
//
//  Baustein 2 (scripts/build-nfl-profile-comp.js) laeuft beim Nutzer lokal,
//  matcht dieses File per Name gegen die echte CFBD-Produktion aus
//  data/college-scouting.js und berechnet die eigentlichen Comps.
//
//  WICHTIG -- RAS-Score hier ist eine EIGENE, an ras.football angelehnte
//  Berechnung (Perzentil-basiert je Position ueber die komplette Combine-
//  Historie), KEINE 1:1-Reproduktion des proprietaeren ras.football-Scores
//  (dessen Seite blockt automatisierte Zugriffe -- 403 beim direkten Abruf
//  getestet 28.09.2026). Kategorien (Size/Speed/Explosion/Agility/Strength)
//  angelehnt an die oeffentlich bekannte RAS-Methodik, aber eigenstaendig
//  berechnet. Fehlende Einzelmessungen werden NICHT als Mittelwert imputiert
//  -- die betroffene Kategorie/der Gesamtscore wird nur aus den TATSAECHLICH
//  vorhandenen Messungen gemittelt, plus measuredCount als Transparenz-Flag.
//
//  Quelle: https://github.com/nflverse/nflverse-data
//    releases/download/players/players.csv   (Draft-Outcome, Groesse/Gewicht)
//    releases/download/combine/combine.csv   (Combine-Messwerte)
//
//  Nutzt die bereits vorhandene data/draft-capital-curve.js (Pick -> erwartete
//  fruehe NFL-Opportunity) fuer die draftCapitalScore-Spalte.
//
//  Schreibt data/nfl-draft-athletic-profiles.js -> NFL_DRAFT_ATHLETIC_PROFILES
//  Usage: node scripts/build-nfl-draft-athletic-profiles.js
// ============================================================

const fs = require('fs');
const path = require('path');
const https = require('https');
const vm = require('vm');

const REL = 'https://github.com/nflverse/nflverse-data/releases/download';
const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'data', 'nfl-draft-athletic-profiles.js');
const CURVE_FILE = path.join(ROOT, 'data', 'draft-capital-curve.js');
const POS = ['QB', 'RB', 'WR', 'TE'];
const MIN_DRAFT_YEAR = 2000; // Combine-Historie beginnt 2000 -- fuer eine stabile Perzentil-Basis
                              // nehmen wir die VOLLE Historie, nicht nur ab 2013 (das Limit gilt erst
                              // beim Matching gegen CFBD-Produktion in Baustein 2).

function getBuffer(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'bear-witch-project-hq-bot' } }, res => {
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
const round = (x, d = 2) => (x == null ? null : Math.round(x * 10 ** d) / 10 ** d);

// Normalisierter Name-Key fuer spaeteres Matching in Baustein 2 (lowercase,
// Suffixe Jr/Sr/II/III/IV/V entfernt, Satzzeichen/Akzente entfernt).
function nameKey(name) {
  if (!name) return '';
  return name
    .normalize('NFD').replace(/[̀-ͯ]/g, '') // Akzente entfernen
    .toLowerCase()
    .replace(/\b(jr|sr|ii|iii|iv|v)\.?\b/g, '')
    .replace(/[^a-z0-9]/g, '');
}

// Perzentil (0-100) von `val` innerhalb von `sortedVals` (aufsteigend sortiert).
// `higherIsBetter` steuert die Richtung.
function percentile(val, sortedVals, higherIsBetter) {
  if (val == null || !sortedVals.length) return null;
  let countBelow = 0;
  for (const v of sortedVals) { if (v < val) countBelow++; else break; }
  let pct = 100 * countBelow / sortedVals.length;
  if (!higherIsBetter) pct = 100 - pct;
  return pct;
}

// Baut fuer jede Position + jedes Messwert-Feld eine sortierte Verteilung
// (ueber ALLE Combine-Teilnehmer dieser Position, nicht nur gedraftete --
// breitere, stabilere Perzentil-Basis).
function buildDistributions(combineRows) {
  const dist = {}; // pos -> field -> sorted array
  const FIELDS = ['ht_in', 'wt', 'forty', 'bench', 'vertical', 'broad_jump', 'cone', 'shuttle'];
  POS.forEach(p => { dist[p] = {}; FIELDS.forEach(f => { dist[p][f] = []; }); });
  combineRows.forEach(r => {
    if (!POS.includes(r.pos)) return;
    const htIn = htToInches(r.ht);
    if (htIn != null) dist[r.pos].ht_in.push(htIn);
    ['wt', 'forty', 'bench', 'vertical', 'broad_jump', 'cone', 'shuttle'].forEach(f => {
      const v = num(r[f]);
      if (v != null) dist[r.pos][f].push(v);
    });
  });
  Object.values(dist).forEach(byField => Object.values(byField).forEach(arr => arr.sort((a, b) => a - b)));
  return dist;
}

function htToInches(ht) {
  // Format "6-4" (Fuss-Zoll)
  if (!ht || !ht.includes('-')) return null;
  const [ft, inch] = ht.split('-').map(Number);
  if (Number.isNaN(ft) || Number.isNaN(inch)) return null;
  return ft * 12 + inch;
}

// RAS-Style-Score fuer EINEN Combine-Datensatz (r = combine.csv-Zeile),
// gegen die Verteilungen `dist` derselben Position.
function computeRasScore(r, dist) {
  const pos = r.pos;
  const d = dist[pos];
  if (!d) return null;
  const htIn = htToInches(r.ht);
  const wt = num(r.wt);
  const forty = num(r.forty);
  const bench = num(r.bench);
  const vertical = num(r.vertical);
  const broad = num(r.broad_jump);
  const cone = num(r.cone);
  const shuttle = num(r.shuttle);

  const pHt = percentile(htIn, d.ht_in, true);
  const pWt = percentile(wt, d.wt, true);
  const pForty = percentile(forty, d.forty, false); // niedriger = schneller = besser
  const pBench = percentile(bench, d.bench, true);
  const pVert = percentile(vertical, d.vertical, true);
  const pBroad = percentile(broad, d.broad_jump, true);
  const pCone = percentile(cone, d.cone, false); // niedriger = besser
  const pShuttle = percentile(shuttle, d.shuttle, false); // niedriger = besser

  const avgOf = (...vals) => {
    const present = vals.filter(v => v != null);
    return present.length ? present.reduce((s, v) => s + v, 0) / present.length : null;
  };
  const size = avgOf(pHt, pWt);
  const speed = pForty; // nur ein Messwert
  const explosion = avgOf(pVert, pBroad);
  const agility = avgOf(pCone, pShuttle);
  const strength = pBench;

  const categories = { size, speed, explosion, agility, strength };
  const availableCats = Object.values(categories).filter(v => v != null);
  const overall = availableCats.length ? avgOf(...availableCats) : null;
  const measuredCount = [htIn, wt, forty, bench, vertical, broad, cone, shuttle].filter(v => v != null).length;

  return {
    overall: overall != null ? round(overall / 10, 2) : null, // 0-10 Skala wie ras.football
    measuredCount,
    size: size != null ? round(size / 10, 2) : null,
    speed: speed != null ? round(speed / 10, 2) : null,
    explosion: explosion != null ? round(explosion / 10, 2) : null,
    agility: agility != null ? round(agility / 10, 2) : null,
    strength: strength != null ? round(strength / 10, 2) : null,
  };
}

function loadDraftCapitalCurve() {
  if (!fs.existsSync(CURVE_FILE)) return null;
  const sb = {}; vm.createContext(sb);
  vm.runInContext(fs.readFileSync(CURVE_FILE, 'utf8') + '\nthis.D = DRAFT_CAPITAL_CURVE;', sb);
  return sb.D;
}
function draftCapitalScore(curveData, pos, pick) {
  if (!curveData || pick == null) return null;
  const buckets = curveData.curve[pos];
  if (!buckets) return null;
  for (const b of buckets) {
    const [lo, hi] = b.bucket.includes('+') ? [parseInt(b.bucket), 999] : b.bucket.split('-').map(Number);
    if (pick >= lo && pick <= hi && b.avgOpp != null) return b.avgOpp;
  }
  return null;
}

// Reine Build-Funktion, exportiert fuer Unit-Tests (keine Netzwerk-Calls).
function buildProfiles(playersRows, combineRows, curveData) {
  const dist = buildDistributions(combineRows);
  const rasByPfrId = {};
  combineRows.forEach(r => {
    if (!r.pfr_id) return;
    const score = computeRasScore(r, dist);
    if (score) rasByPfrId[r.pfr_id] = score;
  });

  const out = {};
  POS.forEach(p => { out[p] = []; });

  playersRows.forEach(p => {
    if (!POS.includes(p.position)) return;
    const draftYear = num(p.draft_year);
    const draftPick = num(p.draft_pick);
    if (!draftYear || !draftPick) return; // nur tatsaechlich gedraftete Spieler
    const heightIn = num(p.height);
    const weightLb = num(p.weight);
    const ras = p.pfr_id ? (rasByPfrId[p.pfr_id] || null) : null;
    out[p.position].push({
      nameKey: nameKey(p.display_name),
      name: p.display_name,
      college: p.college_name || null,
      draftYear, draftRound: num(p.draft_round), draftPick,
      heightIn: heightIn ?? null, weightLb: weightLb ?? null,
      ras,
      draftCapitalScore: draftCapitalScore(curveData, p.position, draftPick),
    });
  });
  return out;
}

async function main() {
  console.log('\n=== NFL Draft Athletic Profiles (nflverse, kein CFBD noetig) ===\n');
  console.log('Lade players.csv ...');
  const playersRows = await loadCsv(`${REL}/players/players.csv`);
  console.log(`  -> ${playersRows.length} Zeilen`);
  console.log('Lade combine.csv ...');
  const combineRows = await loadCsv(`${REL}/combine/combine.csv`);
  console.log(`  -> ${combineRows.length} Zeilen`);

  const curveData = loadDraftCapitalCurve();
  if (!curveData) console.warn('WARNUNG: data/draft-capital-curve.js nicht gefunden -- draftCapitalScore bleibt ueberall null.');

  const profiles = buildProfiles(playersRows, combineRows, curveData);

  POS.forEach(p => {
    const withRas = profiles[p].filter(x => x.ras && x.ras.overall != null).length;
    const withCapital = profiles[p].filter(x => x.draftCapitalScore != null).length;
    console.log(`${p}: ${profiles[p].length} gedraftete Spieler, ${withRas} mit RAS-Score, ${withCapital} mit Draft-Kapital-Score.`);
  });

  const body = `// ============================================================
//  NFL_DRAFT_ATHLETIC_PROFILES — RAS-Style-Score + Draft-Kapital je
//  gedraftetem Spieler (QB/RB/WR/TE), NUR aus nflverse (players.csv +
//  combine.csv). AUTO-GENERIERT von scripts/build-nfl-draft-athletic-
//  profiles.js. Siehe claude/college-scouting-concept.md Abschnitt 7.
//
//  ras.overall ist eine EIGENE, an ras.football angelehnte Perzentil-
//  Berechnung (0-10), KEINE 1:1-Reproduktion des dortigen proprietaeren
//  Scores. ras.measuredCount = wie viele der 8 Rohmesswerte (Groesse,
//  Gewicht, 40, Bankdruecken, Vertical, Broad, Cone, Shuttle) vorlagen --
//  Transparenz-Flag, niedrige Werte = weniger belastbarer Score.
//
//  nameKey = normalisierter Name (lowercase, Suffixe/Satzzeichen entfernt)
//  fuer das Matching in scripts/build-nfl-profile-comp.js gegen die echte
//  CFBD-Produktion aus data/college-scouting.js.
//
//  NFL_DRAFT_ATHLETIC_PROFILES[Pos] = [{ nameKey, name, college, draftYear,
//    draftRound, draftPick, heightIn, weightLb, ras, draftCapitalScore }]
// ============================================================

const NFL_DRAFT_ATHLETIC_PROFILES = ${JSON.stringify(profiles, null, 2)};
`;
  fs.writeFileSync(OUT, body, 'utf8');
  console.log(`\n✅ ${OUT} geschrieben (${Math.round(body.length / 1024)} KB).`);
}

if (require.main === module) {
  main().catch(e => { console.error('❌ Fehlgeschlagen:', e.message); process.exit(1); });
}

module.exports = { buildProfiles, nameKey, percentile, htToInches, computeRasScore, buildDistributions, draftCapitalScore };
