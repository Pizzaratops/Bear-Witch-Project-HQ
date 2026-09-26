#!/usr/bin/env node
// ============================================================
//  PLAYER STYLE SYNC — FTN-Charting-Werte je Spieler (Player DNA)
// ============================================================
//  Handcharting von FTN (ueber nflverse) + Play-by-Play, je Spieler:
//
//    QB (alle Dropbacks inkl. Sacks/Scrambles, passer_id):
//      EPA/Dropback gegen Blitz bzw. ohne, Play-Action-Anteil und EPA
//      mit/ohne PA, Out-of-Pocket-Quote, Interception-worthy-Quote und
//      Throwaway-Quote (je Passversuch)
//    WR/TE/RB (alle Targets, receiver_player_id):
//      Catchable-Quote, Drop-Quote (je fangbarem Ball), Contested-Anteil,
//      Contested-Catch-Quote, Created Receptions, Screen-Anteil
//
//  Gespeichert werden ZAEHLER (keine Quoten), die Seite rechnet selbst
//  und vergleicht mit dem Positionsschnitt bzw. Perzentil im Pool.
//  Spieler-ID = nflverse gsis_id wie in data/player-dna.js.
//
//  Quellen: nflverse play_by_play_<Saison>.csv.gz (gestreamt, siehe
//  scripts/lib/pbp-stream.js), ftn_charting_<Saison>.csv, players.csv.
//  Laufende + Vorsaison; abgeschlossene Saisons werden aus der
//  bestehenden data/player-style.js uebernommen (STYLE_REBUILD=1 = alles neu).
//
//  Schreibt data/player-style.js -> PLAYER_STYLE
//  Usage:  node scripts/sync-player-style.js
// ============================================================

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { httpsGetText, parseCsv, GAMES_CSV_URL } = require('./lib/nflverse');
const { streamPbp, REL } = require('./lib/pbp-stream');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'data', 'player-style.js');
const SEASONS_BACK = 1;
const MIN_N = { QB: 20, RB: 5, WR: 5, TE: 5 }; // QB: Dropbacks, sonst Targets

// Zaehler-Felder je Positionstyp
const QB_KEYS = ['db', 'blN', 'blE', 'noN', 'noE', 'pa', 'paE', 'npaE', 'oop', 'att', 'iw', 'ta'];
const RC_KEYS = ['tgt', 'ctch', 'drop', 'cont', 'contC', 'cre', 'scr'];

const T = v => v === 'TRUE' || v === 'true' || v === '1';

async function buildSeason(season, posOf) {
  const ftnRows = parseCsv(await httpsGetText(`${REL}/ftn_charting/ftn_charting_${season}.csv`));
  const ftn = new Map(ftnRows.map(r => [`${r.nflverse_game_id}#${r.nflverse_play_id}`, r]));
  const P = {};
  const get = (id, name, pos) => {
    if (!P[id]) {
      P[id] = { n: name, pos, c: {} };
      (pos === 'QB' ? QB_KEYS : RC_KEYS).forEach(k => { P[id].c[k] = 0; });
    }
    return P[id];
  };
  let matched = 0, weeks = new Set();

  await streamPbp(season, (c, ix) => {
    if (c[ix.season_type] !== 'REG' || c[ix.two_point_attempt] === '1') return;
    const f = ftn.get(`${c[ix.game_id]}#${c[ix.play_id]}`);
    if (!f) return;
    const epaRaw = c[ix.epa];
    const epa = epaRaw === '' || epaRaw === 'NA' ? null : Number(epaRaw);
    const isAtt = c[ix.pass_attempt] === '1' && c[ix.sack] !== '1';

    // ---- QB: alle Dropbacks ----
    const qb = c[ix.passer_id];
    if (c[ix.qb_dropback] === '1' && qb && qb !== 'NA' && posOf[qb] === 'QB' && epa != null) {
      matched++; weeks.add(c[ix.week]);
      const p = get(qb, c[ix.passer], 'QB').c;
      p.db++;
      if (f.n_blitzers !== '') {
        if (Number(f.n_blitzers) > 0) { p.blN++; p.blE += epa; } else { p.noN++; p.noE += epa; }
      }
      if (T(f.is_play_action)) { p.pa++; p.paE += epa; } else p.npaE += epa;
      if (T(f.is_qb_out_of_pocket)) p.oop++;
      if (isAtt) {
        p.att++;
        if (T(f.is_interception_worthy)) p.iw++;
        if (T(f.is_throw_away)) p.ta++;
      }
    }

    // ---- Receiver: alle Targets (Throwaways sind keine Targets) ----
    const rc = c[ix.receiver_player_id];
    if (isAtt && rc && rc !== 'NA' && !T(f.is_throw_away)) {
      let pos = posOf[rc];
      if (pos === 'FB') pos = 'RB';
      if (pos === 'WR' || pos === 'TE' || pos === 'RB') {
        const p = get(rc, c[ix.receiver_player_name], pos).c;
        const caught = c[ix.complete_pass] === '1';
        p.tgt++;
        if (T(f.is_catchable_ball)) p.ctch++;
        if (T(f.is_drop)) p.drop++;
        if (T(f.is_contested_ball)) { p.cont++; if (caught) p.contC++; }
        if (T(f.is_created_reception)) p.cre++;
        if (T(f.is_screen_pass)) p.scr++;
      }
    }
  });

  // EPA-Summen runden (Zaehler bleiben ganzzahlig)
  const round = o => { Object.keys(o).forEach(k => { if (!Number.isInteger(o[k])) o[k] = Math.round(o[k] * 1000) / 1000; }); return o; };
  const avg = {};
  ['QB', 'RB', 'WR', 'TE'].forEach(pos => {
    const keys = pos === 'QB' ? QB_KEYS : RC_KEYS;
    const sum = Object.fromEntries(keys.map(k => [k, 0]));
    Object.values(P).filter(p => p.pos === pos).forEach(p => keys.forEach(k => { sum[k] += p.c[k]; }));
    avg[pos] = round(sum);
  });
  const players = {};
  Object.entries(P).forEach(([id, p]) => {
    const vol = p.pos === 'QB' ? p.c.db : p.c.tgt;
    if (vol >= MIN_N[p.pos]) players[id] = { n: p.n, pos: p.pos, c: round(p.c) };
  });
  return { weeks: weeks.size, matched, avg, players };
}

async function loadPositions() {
  const rows = parseCsv(await httpsGetText(`${REL}/players/players.csv`));
  const m = {};
  rows.forEach(r => { if (r.gsis_id) m[r.gsis_id] = r.position; });
  return m;
}

function loadExisting() {
  if (!fs.existsSync(OUT)) return null;
  try {
    const ctx = {};
    vm.runInNewContext(fs.readFileSync(OUT, 'utf8') + ';this.PLAYER_STYLE = PLAYER_STYLE;', ctx);
    return ctx.PLAYER_STYLE;
  } catch (e) { return null; }
}

async function main() {
  const games = parseCsv(await httpsGetText(GAMES_CSV_URL)).filter(g => g.game_type === 'REG' && g.season);
  const current = Math.max(...games.filter(g => g.home_score !== '').map(g => Number(g.season)));
  const prev = process.env.STYLE_REBUILD ? null : loadExisting();
  const posOf = await loadPositions();
  const data = { current, minN: MIN_N, seasons: {}, syncedAt: new Date().toISOString() };

  for (let s = current - SEASONS_BACK; s <= current; s++) {
    if (s !== current && prev && prev.seasons && prev.seasons[s]) {
      data.seasons[s] = prev.seasons[s];
      console.log(`Saison ${s}: aus bestehender Datei übernommen.`);
      continue;
    }
    try {
      data.seasons[s] = await buildSeason(s, posOf);
      console.log(`Saison ${s}: ${Object.keys(data.seasons[s].players).length} Spieler, ${data.seasons[s].matched} QB-Dropbacks mit FTN, ${data.seasons[s].weeks} Wochen.`);
    } catch (e) {
      console.log(`Saison ${s}: FTN/pbp nicht verfügbar (${e.message}) -- übersprungen.`);
    }
  }
  if (!Object.keys(data.seasons).length) { console.log('Keine Daten -- nichts geschrieben.'); return; }

  const out = `// ============================================================
//  PLAYER_STYLE — FTN-Charting-Werte je Spieler (nflverse)
// ============================================================
//  AUTO-GENERIERT von scripts/sync-player-style.js über die GitHub
//  Action ".github/workflows/sync-player-style.yml". Nicht von Hand editieren.
//
//  PLAYER_STYLE.seasons[Saison].players[gsis_id] = { n, pos, c }
//  c = Zaehler. QB: db Dropbacks, blN/blE Dropbacks/EPA-Summe gegen Blitz,
//  noN/noE ohne Blitz, pa/paE Play Action (Anzahl/EPA), npaE EPA ohne PA,
//  oop Out of Pocket, att Passversuche, iw interception-worthy, ta Throwaways.
//  WR/TE/RB: tgt Targets, ctch fangbar, drop Drops, cont contested,
//  contC contested gefangen, cre Created Receptions, scr Screen-Targets.
//  PLAYER_STYLE.seasons[Saison].avg[Pos] = Summen aller Spieler der Position.
// ============================================================

const PLAYER_STYLE = ${JSON.stringify(data)};
`;
  fs.writeFileSync(OUT, out, 'utf8');
  console.log(`${OUT}: ${(out.length / 1024).toFixed(0)} KB.`);
}

main().then(() => process.exit(0)).catch(err => {
  console.error('Player Style Sync fehlgeschlagen:', err.message);
  process.exit(1);
});
