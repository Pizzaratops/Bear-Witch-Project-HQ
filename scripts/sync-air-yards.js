#!/usr/bin/env node
// ============================================================
//  AIR YARDS SYNC — Tiefenprofil je Spieler (Player DNA)
// ============================================================
//  Je Spieler die Verteilung der Air Yards:
//    WR/TE/RB  alle Targets (receiver_player_id)
//    QB        alle Passversuche (passer_player_id, ohne Sacks)
//  als Histogramm in 2-Yard-Bins, dazu derselbe Schnitt ueber alle
//  Spieler der Position (Target- bzw. Pass-gewichtet) als Vergleich.
//
//  Spieler-ID = nflverse gsis_id, dieselbe ID wie in data/player-dna.js.
//  Quelle: nflverse play_by_play_<Saison>.csv.gz (REG), keine Secrets.
//
//  Abgeschlossene Saisons aendern sich nicht mehr -> werden aus der
//  bestehenden data/air-yards.js uebernommen, neu gerechnet wird nur
//  die laufende Saison (AIR_REBUILD=1 rechnet alles neu).
//
//  Schreibt data/air-yards.js -> AIR_YARDS
//  Usage:  node scripts/sync-air-yards.js
// ============================================================

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { httpsGetText, parseCsv, GAMES_CSV_URL } = require('./lib/nflverse');
const { streamPbp } = require('./lib/pbp-stream');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'data', 'air-yards.js');
const REL = 'https://github.com/nflverse/nflverse-data/releases/download';

// Bins: Index 0 = unter -4 Yds, dann [-4,-2), [-2,0), [0,2) ... [38,40), letzter = 40+
const BIN_MIN = -4, BIN_MAX = 40, BIN_W = 2;
const NBINS = (BIN_MAX - BIN_MIN) / BIN_W + 2;
const binOf = ay => (ay < BIN_MIN ? 0 : ay >= BIN_MAX ? NBINS - 1 : 1 + Math.floor((ay - BIN_MIN) / BIN_W));
const MIN_N = { QB: 10, RB: 5, WR: 5, TE: 5 };
const SEASONS_BACK = 1; // laufende + 1 Vorsaison

// Positionen aus players.csv (gsis_id -> position)
async function loadPositions() {
  const rows = parseCsv(await httpsGetText(`${REL}/players/players.csv`));
  const m = {};
  rows.forEach(r => { if (r.gsis_id) m[r.gsis_id] = r.position; });
  return m;
}

async function buildSeason(season, posOf) {
  const players = {}; // id -> { n, pos, h[], sum, cnt }
  let weeks = new Set();
  const add = (id, name, pos, ay) => {
    const p = players[id] || (players[id] = { n: name, pos, h: new Array(NBINS).fill(0), sum: 0, cnt: 0 });
    p.h[binOf(ay)]++; p.sum += ay; p.cnt++;
  };
  await streamPbp(season, (c, ix) => {
    if (c[ix.season_type] !== 'REG') return;
    if (c[ix.pass_attempt] !== '1' || c[ix.sack] === '1') return;
    if (c[ix.two_point_attempt] === '1') return;
    const ayRaw = c[ix.air_yards];
    if (ayRaw === '' || ayRaw === 'NA') return;
    const ay = Number(ayRaw);
    weeks.add(c[ix.week]);
    const qb = c[ix.passer_player_id];
    if (qb && qb !== 'NA') add(qb, c[ix.passer_player_name], 'QB', ay);
    const rc = c[ix.receiver_player_id];
    if (rc && rc !== 'NA') {
      const pos = posOf[rc];
      if (pos === 'WR' || pos === 'TE' || pos === 'RB' || pos === 'FB') add(rc, c[ix.receiver_player_name], pos === 'FB' ? 'RB' : pos, ay);
    }
  });

  // QB-Eintraege nur fuer echte QBs (Trickspielzuege von WR/RB raus)
  Object.entries(players).forEach(([id, p]) => { if (p.pos === 'QB' && posOf[id] && posOf[id] !== 'QB') delete players[id]; });

  const avg = {};
  ['QB', 'RB', 'WR', 'TE'].forEach(pos => {
    const list = Object.values(players).filter(p => p.pos === pos);
    const h = new Array(NBINS).fill(0); let sum = 0, cnt = 0;
    list.forEach(p => { p.h.forEach((v, i) => { h[i] += v; }); sum += p.sum; cnt += p.cnt; });
    avg[pos] = { h, adot: cnt ? Math.round(sum / cnt * 100) / 100 : null, n: cnt };
  });

  const out = {};
  Object.entries(players).forEach(([id, p]) => {
    if (p.cnt < MIN_N[p.pos]) return;
    out[id] = { n: p.n, pos: p.pos, h: p.h, adot: Math.round(p.sum / p.cnt * 100) / 100, cnt: p.cnt };
  });
  return { weeks: weeks.size, avg, players: out };
}

function loadExisting() {
  if (!fs.existsSync(OUT)) return null;
  try {
    const ctx = {};
    vm.runInNewContext(fs.readFileSync(OUT, 'utf8') + ';this.AIR_YARDS = AIR_YARDS;', ctx);
    return ctx.AIR_YARDS;
  } catch (e) { return null; }
}

async function main() {
  const games = parseCsv(await httpsGetText(GAMES_CSV_URL)).filter(g => g.game_type === 'REG' && g.season);
  const played = games.filter(g => g.home_score !== '');
  const current = Math.max(...played.map(g => Number(g.season)));
  const seasons = [];
  for (let s = current - SEASONS_BACK; s <= current; s++) seasons.push(s);

  const prev = process.env.AIR_REBUILD ? null : loadExisting();
  const posOf = await loadPositions();
  const data = { current, bin: { min: BIN_MIN, max: BIN_MAX, w: BIN_W, n: NBINS }, seasons: {}, syncedAt: new Date().toISOString() };

  for (const s of seasons) {
    if (s !== current && prev && prev.seasons && prev.seasons[s] && prev.bin && prev.bin.n === NBINS) {
      data.seasons[s] = prev.seasons[s];
      console.log(`Saison ${s}: aus bestehender Datei übernommen.`);
      continue;
    }
    data.seasons[s] = await buildSeason(s, posOf);
    console.log(`Saison ${s}: ${Object.keys(data.seasons[s].players).length} Spieler, ${data.seasons[s].weeks} Wochen.`);
  }

  const out = `// ============================================================
//  AIR_YARDS — Air-Yards-Verteilung je Spieler (nflverse pbp)
// ============================================================
//  AUTO-GENERIERT von scripts/sync-air-yards.js über die GitHub Action
//  ".github/workflows/sync-air-yards.yml". Nicht von Hand editieren.
//
//  AIR_YARDS.seasons[Saison].players[gsis_id] = { n, pos, h, adot, cnt }
//    h   = Anzahl Targets (WR/TE/RB) bzw. Passversuche (QB) je Bin
//    Bin 0 = unter bin.min Yards, dann bin.w-Yard-Schritte bis bin.max,
//    letzter Bin = bin.max und mehr.
//  AIR_YARDS.seasons[Saison].avg[Pos] = { h, adot, n } = Summe aller
//    Spieler der Position (gewichtet nach Volumen).
// ============================================================

const AIR_YARDS = ${JSON.stringify(data)};
`;
  fs.writeFileSync(OUT, out, 'utf8');
  console.log(`${OUT}: ${(out.length / 1024).toFixed(0)} KB.`);
}

main().then(() => process.exit(0)).catch(err => {
  console.error('Air Yards Sync fehlgeschlagen:', err.message);
  process.exit(1);
});
