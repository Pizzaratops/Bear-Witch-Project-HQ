#!/usr/bin/env node
// ============================================================
//  PLAYER DNA SYNC — Perzentil-Profile fuer QB / RB / WR / TE
// ============================================================
//  NFL-Pendant zum "Cat Web" aus Taco Tuesday HQ: je Spieler und Saison
//  8 positionsspezifische Kategorien gegen ALLE NFL-Spieler derselben
//  Position mit Mindest-Volumen -- als Perzentil UND als Z-Score (Cap +-2,5).
//
//  VERSION 2 (Kategorien nach eigener Stabilitaetsmessung 2016-2025, siehe
//  README): 6 "Kern"-Achsen (Rolle & Produktion, zaehlen in den DNA-Score)
//  + 2 "Stil"-Achsen (WIE jemand spielt -- kein besser/schlechter, zaehlen
//  nur fuer Matches). stab = gemessene Year-over-Year-Korrelation, daraus
//  wird die Stichproben-Korrektur der laufenden Saison abgeleitet:
//    stabilisiert = (G*Ist + k*Prior) / (G + k),  k = 17*(1-stab)/stab
//  Prior = Vorjahreswert des Spielers, sonst Positions-Schnitt.
//
//  Quellen (nflverse, oeffentlich, taeglich aktualisiert):
//    stats_player_reg_<Saison>.csv    Basis-Stats inkl. EPA/CPOE/Shares
//    ngs_passing|rushing|receiving    Next Gen Stats (ab 2016, Saisonzeile week=0)
//    snap_counts_<Saison>.csv         Snap-Anteil (ab 2012)
//    pfr_advstats season rush         Yards after Contact (ab 2018)
//    players.csv                      pfr_id -> gsis_id, rookie_season
//    ffverse/ffopportunity ep_weekly  Expected Fantasy Points + Team-Summen
//                                     (xFP, xFP-Share, FPOE, Shares; ab 2006)
//
//  Vorjahre aendern sich nicht mehr -> werden aus der bestehenden
//  data/player-dna.js uebernommen, neu gerechnet wird nur die laufende
//  Saison (ausser DNA_REBUILD=1 oder die Kategorien haben sich geaendert).
//
//  Usage:
//    node scripts/sync-player-dna.js
//    DNA_REBUILD=1 node scripts/sync-player-dna.js      # alle Saisons neu
//    NFLVERSE_CACHE_DIR=/pfad node scripts/sync-player-dna.js  # lokale CSVs bevorzugen
// ============================================================

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const zlib = require('zlib');
const https = require('https');
const { parseCsv, normTeam } = require('./lib/nflverse');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'data', 'player-dna.js');
const FIRST_SEASON = 2016; // ab hier gibt es Next Gen Stats
const REL = 'https://github.com/nflverse/nflverse-data/releases/download';

// ---------------- Kategorien ----------------
// v(r) bekommt die zusammengefuehrte Statzeile eines Spielers; null = kein Wert.
// type: 'core' = Rolle/Produktion (DNA-Score), 'style' = Spielstil (nur Matches)
// stab: gemessene YoY-Korrelation (2016-2025, eigene Auswertung)
const div = (a, b) => (b > 0 ? a / b : null);
const pct = x => (x != null ? 100 * x : null);
const CATEGORIES = {
  QB: [
    { k: 'xfp',   label: 'xFP',            unit: 'Exp. PPR/Spiel',  type: 'core',  stab: .62, v: r => div(r.xfp, r.games) },
    { k: 'fpdb',  label: 'FP/Dropback',    unit: 'PPR pro Play',    type: 'core',  stab: .44, v: r => div(r.fantasy_points_ppr, r.attempts + r.sacks_suffered + r.carries) },
    { k: 'epa',   label: 'EPA/Play',       unit: 'EPA',             type: 'core',  stab: .40, v: r => div(r.passing_epa + r.rushing_epa, r.attempts + r.sacks_suffered + r.carries) },
    { k: 'cpoe',  label: 'CPOE',           unit: '%',               type: 'core',  stab: .36, v: r => r.passing_cpoe_raw },
    { k: 'rushy', label: 'Rush-Yards',     unit: '/Spiel',          type: 'core',  stab: .85, v: r => div(r.rushing_yards, r.games) },
    { k: 'rusha', label: 'Rush-Versuche',  unit: '/Spiel',          type: 'core',  stab: .88, v: r => div(r.carries, r.games) },
    { k: 'adot',  label: 'aDOT',           unit: 'Yds',             type: 'style', stab: .47, v: r => div(r.passing_air_yards, r.attempts) },
    { k: 'ttt',   label: 'Time to Throw',  unit: 'Sek. (NGS)',      type: 'style', stab: .66, v: r => r.ngs_ttt },
  ],
  RB: [
    { k: 'xfps',  label: 'xFP-Share',      unit: '% vom Team',      type: 'core',  stab: .66, v: r => pct(div(r.xfp, r.team_xfp)) },
    { k: 'snap',  label: 'Snap-Anteil',    unit: '%',               type: 'core',  stab: .59, v: r => r.snap_pct },
    { k: 'rsh',   label: 'Rush-Share',     unit: '% Team-Carries',  type: 'core',  stab: .55, v: r => pct(div(r.ep_rush, r.team_rush)) },
    { k: 'tgt',   label: 'Targets',        unit: '/Spiel',          type: 'core',  stab: .70, v: r => div(r.targets, r.games) },
    { k: 'recy',  label: 'Receiving',      unit: 'Yds/Spiel',       type: 'core',  stab: .67, v: r => div(r.receiving_yards, r.games) },
    { k: 'fpoe',  label: 'FPOE',           unit: 'PPR über Erw./Spiel', type: 'core', stab: .21, v: r => r.xfp != null ? div(r.fp_ep - r.xfp, r.games) : null },
    { k: 'yaca',  label: 'YAC/Carry',      unit: 'Yds (PFR, ab 2018)', type: 'style', stab: .34, v: r => r.pfr_yac_att },
    { k: 'expl',  label: 'Explosivität',   unit: '% Runs 10+',      type: 'style', stab: .26, v: r => pct(div(r.rushing_10, r.carries)) },
  ],
  WR: [
    { k: 'xfps',  label: 'xFP-Share',      unit: '% vom Team',      type: 'core',  stab: .69, v: r => pct(div(r.xfp, r.team_xfp)) },
    { k: 'tgt',   label: 'Targets',        unit: '/Spiel',          type: 'core',  stab: .66, v: r => div(r.targets, r.games) },
    { k: 'ypa',   label: 'Yds/Team-Pass',  unit: 'YPRR-Proxy',      type: 'core',  stab: .56, v: r => div(r.receiving_yards, r.team_pass) },
    { k: 'ays',   label: 'Air Yards Share', unit: '%',              type: 'core',  stab: .55, v: r => pct(r.air_yards_share) },
    { k: 'snap',  label: 'Snap-Anteil',    unit: '%',               type: 'core',  stab: .55, v: r => r.snap_pct },
    { k: 'yac',   label: 'YAC',            unit: 'Yds/Catch',       type: 'core',  stab: .48, v: r => div(r.receiving_yards_after_catch, r.receptions) },
    { k: 'adot',  label: 'aDOT',           unit: 'Yds',             type: 'style', stab: .68, v: r => div(r.receiving_air_yards, r.targets) },
    { k: 'sep',   label: 'Separation',     unit: 'Yds (NGS)',       type: 'style', stab: .59, v: r => r.ngs_sep },
  ],
  TE: [
    { k: 'xfps',  label: 'xFP-Share',      unit: '% vom Team',      type: 'core',  stab: .65, v: r => pct(div(r.xfp, r.team_xfp)) },
    { k: 'ypa',   label: 'Yds/Team-Pass',  unit: 'YPRR-Proxy',      type: 'core',  stab: .64, v: r => div(r.receiving_yards, r.team_pass) },
    { k: 'snap',  label: 'Snap-Anteil',    unit: '%',               type: 'core',  stab: .62, v: r => r.snap_pct },
    { k: 'tgt',   label: 'Targets',        unit: '/Spiel',          type: 'core',  stab: .61, v: r => div(r.targets, r.games) },
    { k: 'ays',   label: 'Air Yards Share', unit: '%',              type: 'core',  stab: .60, v: r => pct(r.air_yards_share) },
    { k: 'yacoe', label: 'YAC über Erw.',  unit: 'Yds (NGS)',       type: 'core',  stab: .47, v: r => r.ngs_yacoe },
    { k: 'adot',  label: 'aDOT',           unit: 'Yds',             type: 'style', stab: .63, v: r => div(r.receiving_air_yards, r.targets) },
    { k: 'yac',   label: 'YAC',            unit: 'Yds/Catch',       type: 'style', stab: .50, v: r => div(r.receiving_yards_after_catch, r.receptions) },
  ],
};

// Mindest-Volumen je Position, skaliert mit W = gespielte Wochen der Saison
const QUALIFIES = {
  QB: (r, W) => r.attempts >= 12 * W,
  RB: (r, W) => r.carries >= 5 * W,
  WR: (r, W) => r.targets >= 2.5 * W,
  TE: (r, W) => r.targets >= 2 * W,
};
const Z_CAP = 2.5;
const CAT_VERSION = 'v2:' + Object.entries(CATEGORIES).map(([p, cs]) => p + '=' + cs.map(c => c.k).join('.')).join('|');

// ---------------- Laden ----------------
function getBuffer(url, depth = 0) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'dpe-hq-bot' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && depth < 5) {
        res.resume();
        return getBuffer(res.headers.location, depth + 1).then(resolve, reject);
      }
      if (res.statusCode !== 200) { res.resume(); return reject(new Error(`HTTP ${res.statusCode} für ${url}`)); }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function loadCsv(relPath) {
  const name = path.basename(relPath);
  const cacheDir = process.env.NFLVERSE_CACHE_DIR;
  let buf;
  if (cacheDir && fs.existsSync(path.join(cacheDir, name))) buf = fs.readFileSync(path.join(cacheDir, name));
  else buf = await getBuffer(`${REL}/${relPath}`);
  const text = name.endsWith('.gz') ? zlib.gunzipSync(buf).toString('utf8') : buf.toString('utf8');
  return parseCsv(text); // liefert bereits Objekte (Header -> Wert)
}

const num = x => (x === undefined || x === '' || x === 'NA' ? null : Number(x));
const n0 = x => num(x) || 0;

// ---------------- Rechnen ----------------
function percentiles(values, invert) {
  // values: Array (Zahl|null) -> Perzentile 0-100 (null bleibt null)
  const sorted = values.filter(v => v != null && isFinite(v)).sort((a, b) => a - b);
  const n = sorted.length;
  return values.map(v => {
    if (v == null || !isFinite(v) || n < 2) return null;
    let lo = 0, hi = n;
    while (lo < hi) { const m = (lo + hi) >> 1; if (sorted[m] < v) lo = m + 1; else hi = m; }
    let eq = lo; while (eq < n && sorted[eq] === v) eq++;
    const p = 100 * ((lo + (eq - lo - 1) / 2) / (n - 1));
    return Math.round(invert ? 100 - p : p);
  });
}

// Z-Score (gedeckelt auf +-Z_CAP), fuers Radar auf 0-100 abgebildet: 50 + 20*z
function zscores(values, invert) {
  const xs = values.filter(v => v != null && isFinite(v));
  if (xs.length < 3) return values.map(() => null);
  const m = xs.reduce((a, b) => a + b, 0) / xs.length;
  const sd = Math.sqrt(xs.reduce((a, b) => a + (b - m) * (b - m), 0) / (xs.length - 1)) || 1;
  return values.map(v => {
    if (v == null || !isFinite(v)) return null;
    let z = (v - m) / sd; if (invert) z = -z;
    z = Math.max(-Z_CAP, Math.min(Z_CAP, z));
    return Math.round(50 + 20 * z);
  });
}

function round(v) { return v == null ? null : Math.round(v * 1000) / 1000; }

async function loadEp(season) {
  // ffverse/ffopportunity: Wochenzeilen je Spieler, inkl. Team-Summen der Spiele,
  // in denen der Spieler dabei war -> Shares automatisch auf "seine" Spiele bezogen.
  const url = `https://github.com/ffverse/ffopportunity/releases/download/latest-data/ep_weekly_${season}.csv`;
  const name = `ep_weekly_${season}.csv`;
  const cacheDir = process.env.NFLVERSE_CACHE_DIR;
  let text;
  if (cacheDir && fs.existsSync(path.join(cacheDir, name))) text = fs.readFileSync(path.join(cacheDir, name), 'utf8');
  else text = (await getBuffer(url)).toString('utf8');
  const agg = {};
  parseCsv(text).forEach(r => {
    const a = agg[r.player_id] = agg[r.player_id] || { xfp: 0, fp: 0, rush: 0, team_rush: 0, team_pass: 0, team_xfp: 0 };
    a.xfp += n0(r.total_fantasy_points_exp); a.fp += n0(r.total_fantasy_points);
    a.rush += n0(r.rush_attempt); a.team_rush += n0(r.rush_attempt_team);
    a.team_pass += n0(r.pass_attempt_team); a.team_xfp += n0(r.total_fantasy_points_exp_team);
  });
  return agg;
}

async function buildSeason(season, shared, prevSeason, isCurrent) {
  const stats = await loadCsv(`stats_player/stats_player_reg_${season}.csv`);
  const ngs = shared.ngs;
  let ep = {};
  try { ep = await loadEp(season); } catch (e) { console.warn(`⚠️  Expected Points ${season} nicht verfuegbar: ${e.message}`); }
  // W = gespielte Wochen der Saison (Leerzeilen ohne player_id = Teamsummen raus;
  // getradete Spieler koennen 18 Spiele haben -> auf 17 deckeln)
  const W = Math.min(17, Math.max(1, ...stats.filter(r => r.player_id && r.position).map(r => n0(r.games))));

  // Snap-Anteil (Durchschnitt offense_pct ueber Spiele mit Offense-Snaps)
  let snapByGsis = {};
  try {
    const snaps = await loadCsv(`snap_counts/snap_counts_${season}.csv`);
    const agg = {};
    snaps.forEach(s => {
      if (s.game_type && s.game_type !== 'REG') return;
      const pct = num(s.offense_pct);
      if (pct == null || n0(s.offense_snaps) <= 0) return;
      const a = agg[s.pfr_player_id] = agg[s.pfr_player_id] || { sum: 0, n: 0 };
      a.sum += pct; a.n++;
    });
    Object.entries(agg).forEach(([pfr, a]) => {
      const gsis = shared.pfrToGsis[pfr];
      if (gsis) snapByGsis[gsis] = 100 * a.sum / a.n;
    });
  } catch (e) {
    console.warn(`⚠️  Snap Counts ${season} nicht verfuegbar: ${e.message}`);
  }

  const out = {};
  for (const pos of ['QB', 'RB', 'WR', 'TE']) {
    const rows = stats.filter(r => r.player_id && r.position === pos).map(r => {
      const o = { id: r.player_id, name: r.player_display_name, team: normTeam(r.recent_team), games: n0(r.games) };
      ['attempts', 'passing_epa', 'rushing_epa', 'sacks_suffered', 'carries', 'passing_air_yards', 'rushing_yards',
        'passing_tds', 'passing_interceptions', 'sack_fumbles_lost', 'rushing_fumbles_lost', 'receiving_yards',
        'rushing_tds', 'receiving_tds', 'rushing_10', 'targets', 'receptions', 'receiving_air_yards',
        'receiving_yards_after_catch', 'receiving_epa'].forEach(k => { o[k] = n0(r[k]); });
      ['fantasy_points_ppr'].forEach(k => { o[k] = n0(r[k]); });
      const e = ep[r.player_id];
      o.xfp = e ? e.xfp : null; o.fp_ep = e ? e.fp : null; o.team_xfp = e ? e.team_xfp : null;
      o.ep_rush = e ? e.rush : null; o.team_rush = e ? e.team_rush : null; o.team_pass = e ? e.team_pass : null;
      const nP = ngs.passing[`${season}|${r.player_id}`];
      o.ngs_ttt = nP ? num(nP.avg_time_to_throw) : null;
      const pR = shared.pfrRush[`${season}|${r.player_id}`];
      o.pfr_yac_att = pR ? num(pR.yac_att) : null;
      o.rookie = shared.rookie[r.player_id] || null;
      o.target_share = num(r.target_share);
      o.air_yards_share = num(r.air_yards_share);
      o.passing_cpoe_raw = num(r.passing_cpoe);
      const nR = ngs.rushing[`${season}|${r.player_id}`];
      const nC = ngs.receiving[`${season}|${r.player_id}`];
      o.ngs_ryoe = nR ? num(nR.rush_yards_over_expected_per_att) : null;
      o.ngs_sep = nC ? num(nC.avg_separation) : null;
      o.ngs_yacoe = nC ? num(nC.avg_yac_above_expectation) : null;
      o.snap_pct = snapByGsis[r.player_id] != null ? snapByGsis[r.player_id] : null;
      return o;
    }).filter(r => QUALIFIES[pos](r, W));

    const cats = CATEGORIES[pos];
    const raw = rows.map(r => cats.map(c => { const v = c.v(r); return v != null && isFinite(v) ? v : null; }));
    const pcts = cats.map((c, ci) => percentiles(raw.map(x => x[ci]), c.invert));
    const zs = cats.map((c, ci) => zscores(raw.map(x => x[ci]), c.invert));

    // Stichproben-Korrektur: nur fuer die laufende Saison, solange sie noch jung ist
    let stabRaw = null, stabP = null, stabZ = null;
    if (isCurrent && W < 17) {
      const prev = {};
      ((prevSeason && prevSeason.players && prevSeason.players[pos]) || []).forEach(p => { prev[p.id] = p.v; });
      const means = cats.map((c, ci) => { const xs = raw.map(x => x[ci]).filter(v => v != null); return xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null; });
      stabRaw = rows.map((r, i) => cats.map((c, ci) => {
        const x = raw[i][ci];
        if (x == null) return null;
        const pv = prev[r.id] && prev[r.id][ci] != null ? prev[r.id][ci] : means[ci];
        const k = 17 * (1 - c.stab) / c.stab;
        return (r.games * x + k * pv) / (r.games + k);
      }));
      stabP = cats.map((c, ci) => percentiles(stabRaw.map(x => x[ci]), c.invert));
      stabZ = cats.map((c, ci) => zscores(stabRaw.map(x => x[ci]), c.invert));
    }

    out[pos] = rows.map((r, i) => {
      const o = {
        id: r.id, n: r.name, t: r.team, g: r.games,
        e: r.rookie ? season - r.rookie + 1 : null, // NFL-Jahr (1 = Rookie)
        v: raw[i].map(round),
        p: cats.map((c, ci) => pcts[ci][i]),
        z: cats.map((c, ci) => zs[ci][i]),
      };
      if (stabRaw) {
        o.vs = stabRaw[i].map(round);
        o.ps = cats.map((c, ci) => stabP[ci][i]);
        o.zs = cats.map((c, ci) => stabZ[ci][i]);
      }
      return o;
    }).sort((a, b) => a.n.localeCompare(b.n));
  }
  return { weeks: W, players: out };
}

function loadExisting() {
  if (!fs.existsSync(OUT)) return null;
  try {
    const sb = {}; vm.createContext(sb);
    vm.runInContext(fs.readFileSync(OUT, 'utf8') + '\nthis.D = PLAYER_DNA;', sb);
    return sb.D || null;
  } catch (e) { return null; }
}

async function main() {
  const cfgSb = {}; vm.createContext(cfgSb);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'js', 'espn-sync.js'), 'utf8') + '\nthis.S = ESPN_SEASON;', cfgSb);
  const current = Number(process.env.DNA_SEASON || cfgSb.S);

  const existing = loadExisting();
  const reuse = existing && existing.version === CAT_VERSION && !process.env.DNA_REBUILD;

  console.log('Lade Next Gen Stats + players.csv ...');
  const ngs = { passing: {}, rushing: {}, receiving: {} };
  for (const kind of ['passing', 'rushing', 'receiving']) {
    (await loadCsv(`nextgen_stats/ngs_${kind}.csv.gz`)).forEach(r => {
      if (r.week === '0' && r.season_type === 'REG') ngs[kind][`${r.season}|${r.player_gsis_id}`] = r;
    });
  }
  const pfrToGsis = {}, rookie = {};
  (await loadCsv('players/players.csv')).forEach(p => {
    if (p.pfr_id && p.gsis_id) pfrToGsis[p.pfr_id] = p.gsis_id;
    if (p.gsis_id && num(p.rookie_season)) rookie[p.gsis_id] = num(p.rookie_season);
  });
  const pfrRush = {};
  try {
    (await loadCsv('pfr_advstats/advstats_season_rush.csv')).forEach(r => {
      const g = pfrToGsis[r.pfr_id]; if (g) pfrRush[`${r.season}|${g}`] = r;
    });
  } catch (e) { console.warn('⚠️  PFR Advanced Rush nicht verfuegbar:', e.message); }
  const shared = { ngs, pfrToGsis, rookie, pfrRush };

  const seasons = {};
  for (let y = FIRST_SEASON; y <= current; y++) {
    if (reuse && y < current && existing.seasons && existing.seasons[y]) { seasons[y] = existing.seasons[y]; continue; }
    try {
      seasons[y] = await buildSeason(y, shared, seasons[y - 1], y === current);
      const c = Object.fromEntries(Object.entries(seasons[y].players).map(([p, l]) => [p, l.length]));
      console.log(`Saison ${y}: ${seasons[y].weeks} Wochen, ${JSON.stringify(c)}`);
    } catch (e) {
      if (existing && existing.seasons && existing.seasons[y]) { seasons[y] = existing.seasons[y]; console.warn(`⚠️  ${y}: ${e.message} -- alter Stand bleibt`); }
      else console.warn(`⚠️  ${y}: ${e.message} -- uebersprungen`);
    }
  }
  if (!seasons[current]) throw new Error(`Keine Daten fuer die laufende Saison ${current}.`);

  const categories = Object.fromEntries(Object.entries(CATEGORIES).map(([p, cs]) =>
    [p, cs.map(c => ({ k: c.k, label: c.label, unit: c.unit, type: c.type, stab: c.stab, invert: !!c.invert }))]));
  const data = { version: CAT_VERSION, current, zCap: Z_CAP, categories, seasons };
  const body = `// ============================================================
//  PLAYER_DNA — Perzentil-Profile je Position (nflverse)
// ============================================================
//  AUTO-GENERIERT von scripts/sync-player-dna.js (GitHub Action
//  ".github/workflows/sync-player-dna.yml"). Nicht von Hand editieren.
//
//  PLAYER_DNA.seasons[Saison].players[Pos] = [{ id, n, t, g, e, v, p, z, (vs, ps, zs) }]
//    e = NFL-Jahr (1 = Rookie), v = Rohwerte, p = Perzentile, z = Z-Score
//    (Cap +-2,5, abgebildet auf 0-100: 50 + 20*z). vs/ps/zs = dasselbe mit
//    Stichproben-Korrektur (nur laufende Saison, solange < 17 Wochen).
//  Reihenfolge = PLAYER_DNA.categories[Pos] (type core|style). null = kein Wert
//  (z.B. keine Next Gen Stats, weil unter der NGS-Mindestanzahl).
//  Pool = alle NFL-Spieler der Position mit Mindest-Volumen (skaliert mit
//  gespielten Wochen), NICHT nur die gerosterten Spieler der Liga.
// ============================================================

const PLAYER_DNA = ${JSON.stringify(data)};
`;
  const old = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : null;
  if (old === body) { console.log('Keine Aenderungen.'); return; }
  fs.writeFileSync(OUT, body, 'utf8');
  console.log(`✅ ${OUT} geschrieben (${Math.round(body.length / 1024)} KB, Saisons ${Object.keys(seasons).join(', ')}).`);
}

main().catch(e => { console.error('❌ Player DNA Sync fehlgeschlagen:', e.message); process.exit(1); });
