#!/usr/bin/env node
// ============================================================
//  MATCHUP ADVANTAGE SYNC — Unit gegen Unit je NFL-Spiel
// ============================================================
//  Berechnet je NFL-Team (Season-to-date, alle gespielten REG-Spiele):
//
//    OFFENSE und DEFENSE (zugelassen) je
//      passEpa    EPA/Play bei Pass-Dropbacks (inkl. Sacks & Scrambles)
//      rushEpa    EPA/Play bei Läufen (ohne QB-Scrambles)
//      sackRate   Sacks / Dropbacks
//      explosive  Anteil Plays mit 20+ Yds (Pass) bzw. 10+ Yds (Lauf)
//      rzTd       Touchdown-Quote bei Drives, die die Red Zone erreichen
//
//    FANTASY POINTS ALLOWED (PPR) je Position QB/RB/WR/TE pro Spiel
//
//    SCHEME-TENDENZEN (FTN-Charting): Blitz, Stacked Box 8+, Play Action,
//      Screen, Motion -- je Team Haeufigkeit + EPA in/ausserhalb der
//      Situation, fuer Offense und Defense
//
//  Ränge: 1 = beste Unit. Offense: hoher Wert = gut (außer sackRate).
//  Defense: niedriger zugelassener Wert = gut (außer sackRate: hohe
//  Sack-Quote = gut). fpaRank: 1 = lässt die MEISTEN Punkte zu
//  (= leichtestes Matchup für die gegnerischen Spieler).
//
//  Dazu der komplette REG-Spielplan der Saison (für Wochen-Auswahl und
//  den Spieler-Matchup-Boost auf der Fantasy-Matchups-Seite).
//
//  Unit-Werte sind ein Mix aus laufender Saison und Vorjahr: (g*Saison +
//  4*Vorjahr)/(g+4), g = bisherige Spiele (Backtest siehe docs/BACKTEST-
//  MATCHUP-BADGES.md). offSeason/offPrior etc. enthalten die Einzelwerte.
//
//  Quelle: nflverse (play_by_play_<season>.csv.gz + Vorjahr,
//  stats_player_week_<season>.csv, games.csv, ftn_charting_<season>.csv).
//  Keine Secrets.
//
//  Schreibt data/matchup-advantage.js -> MATCHUP_ADVANTAGE
//  Usage:  node scripts/sync-matchup-advantage.js
// ============================================================

const fs = require('fs');
const path = require('path');
const { httpsGetText, parseCsv, normTeam, NFL_TEAM_META, GAMES_CSV_URL } = require('./lib/nflverse');
const { streamPbp } = require('./lib/pbp-stream');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'data', 'matchup-advantage.js');
const REL = 'https://github.com/nflverse/nflverse-data/releases/download';

// key, Label, Richtung für die OFFENSE ("high" = hoher Wert besser)
const METRICS = [
  { key: 'passEpa', label: 'Passing EPA', fmt: 'epa', offBetter: 'high' },
  { key: 'rushEpa', label: 'Rushing EPA', fmt: 'epa', offBetter: 'high' },
  { key: 'sackRate', label: 'Sack Rate', fmt: 'pct', offBetter: 'low' },
  { key: 'explosive', label: 'Explosive %', fmt: 'pct', offBetter: 'high' },
  { key: 'rzTd', label: 'Red-Zone-TD %', fmt: 'pct', offBetter: 'high' },
];
const FPA_POS = ['QB', 'RB', 'WR', 'TE'];

// Trefferquote des Gesamt-Fazits je Staerke und Saisonphase, aus dem
// Spielebenen-Backtest 2021-2025 mit Vorjahres-Mix k=4 (scripts/research/
// backtest_games_prior_k.py). n = Anzahl Spiele. Vegas-Favorit zum Vergleich.
const VERDICT_CALIBRATION = {
  W1: { leicht: { hit: 55.9, n: 34 }, klar: { hit: 76.3, n: 38 }, vegas: null },
  'W2-4': { leicht: { hit: 61.1, n: 90 }, klar: { hit: 64.8, n: 122 }, vegas: 61.5 },
  'W5-8': { leicht: { hit: 55.7, n: 115 }, klar: { hit: 65.8, n: 155 }, vegas: 67.4 },
  'W9+': { leicht: { hit: 51.8, n: 247 }, klar: { hit: 68.5, n: 428 }, vegas: 68.2 },
};
// Fazit (mit Vorjahres-Mix) gegen den Vegas-Favoriten, 2021-2025 ab Woche 2
const VERDICT_VS_VEGAS = {
  agree: { hit: 69.1, n: 919, klarHit: 71.9, klarN: 616 },
  disagree: { vegasHit: 63.9, toolHit: 36.1, n: 238, klarToolHit: 34.8, klarN: 89 },
};


const r4 = n => Math.round(n * 10000) / 10000;
const mean = (s, n) => (n ? s / n : null);

function rankBy(teams, getVal, better) {
  const withVal = teams.filter(t => getVal(t) != null);
  withVal.sort((a, b) => (better === 'high' ? getVal(b) - getVal(a) : getVal(a) - getVal(b)));
  const ranks = {};
  withVal.forEach((t, i) => { ranks[t.abbr] = i + 1; });
  return ranks;
}

async function main() {
  const games = parseCsv(await httpsGetText(GAMES_CSV_URL)).filter(g => g.game_type === 'REG' && g.season);
  const season = Math.max(...games.map(g => Number(g.season)));
  const seasonGames = games.filter(g => Number(g.season) === season);
  const played = seasonGames.filter(g => g.home_score !== '' && g.away_score !== '');
  // Vor dem ersten Spiel einer Saison: Unit-Stats und Scheme aus dem Vorjahr
  // (statSeason), damit die Seite in Woche 1 nicht leer ist.
  const statSeason = played.length ? season : season - 1;
  if (!played.length) console.log(`Season ${season}: noch kein Spiel -- Unit-Stats aus ${statSeason}.`);

  // ---------- Play-by-Play (gestreamt, nur benoetigte Spalten) ----------
  // Laufende Saison + Vorjahr. Unit-Werte = Mix: (g*Saison + K*Vorjahr)/(g+K),
  // g = bisherige Spiele des Teams. Backtest 2021-2025 (docs/BACKTEST-
  // MATCHUP-BADGES.md): Fazit-Trefferquote Woche 2-4 51,7 % -> 63,2 %, in
  // allen fuenf Saisons besser; spaete Saison unveraendert.
  const UNIT_PRIOR_K = 4;
  const PBP_FIELDS = ['game_id', 'play_id', 'season_type', 'week', 'posteam', 'defteam', 'pass', 'rush', 'qb_dropback',
    'qb_scramble', 'pass_attempt', 'sack', 'epa', 'yards_gained', 'play_type', 'two_point_attempt', 'fixed_drive',
    'fixed_drive_result', 'drive_inside20'];
  async function loadPbpSlim(yr) {
    const rows = [];
    await streamPbp(yr, (c, ix) => {
      if (c[ix.season_type] !== 'REG') return;
      const o = {}; PBP_FIELDS.forEach(f => { o[f] = c[ix[f]]; }); rows.push(o);
    });
    return rows;
  }
  function aggregate(rows) {
    const acc = {};
    const A = abbr => (acc[abbr] = acc[abbr] || {
      off: { passN: 0, passEpa: 0, rushN: 0, rushEpa: 0, db: 0, sacks: 0, plays: 0, expl: 0, rzDrives: new Set(), rzTd: new Set() },
      def: { passN: 0, passEpa: 0, rushN: 0, rushEpa: 0, db: 0, sacks: 0, plays: 0, expl: 0, rzDrives: new Set(), rzTd: new Set() },
      games: new Set(),
    });
    for (const p of rows) {
      if (!p.posteam || !p.defteam || p.posteam === 'NA' || p.defteam === 'NA') continue;
      const off = normTeam(p.posteam), def = normTeam(p.defteam);
      A(off).games.add(p.game_id); A(def).games.add(p.game_id);
      const sides = [A(off).off, A(def).def];
      // Red Zone: Drive-Ebene
      if (p.drive_inside20 === '1' && p.fixed_drive) {
        const dk = `${p.game_id}#${p.fixed_drive}`;
        sides.forEach(s => s.rzDrives.add(dk));
        if (p.fixed_drive_result === 'Touchdown') sides.forEach(s => s.rzTd.add(dk));
      }
      if (p.two_point_attempt === '1' || p.epa === '' || p.epa === 'NA') continue;
      if (p.play_type !== 'pass' && p.play_type !== 'run') continue;
      const epa = Number(p.epa), yds = Number(p.yards_gained) || 0;
      const isPass = p.pass === '1', isRush = p.rush === '1';
      if (!isPass && !isRush) continue;
      sides.forEach(s => {
        s.plays++;
        if (isPass) { s.passN++; s.passEpa += epa; }
        else { s.rushN++; s.rushEpa += epa; }
        if (p.qb_dropback === '1') { s.db++; if (p.sack === '1') s.sacks++; }
        if ((isPass && p.sack !== '1' && yds >= 20) || (isRush && yds >= 10)) s.expl++;
      });
    }
    const finish = s => ({
      passEpa: mean(s.passEpa, s.passN), rushEpa: mean(s.rushEpa, s.rushN), sackRate: mean(s.sacks, s.db),
      explosive: mean(s.expl, s.plays), rzTd: s.rzDrives.size ? s.rzTd.size / s.rzDrives.size : null,
    });
    const out = {};
    Object.entries(acc).forEach(([abbr, a]) => {
      out[abbr] = { games: a.games.size, off: finish(a.off), def: finish(a.def), rzTrips: { off: a.off.rzDrives.size, def: a.def.rzDrives.size } };
    });
    return out;
  }

  const curRows = played.length ? await loadPbpSlim(season) : [];
  const priorRows = await loadPbpSlim(season - 1);
  const curAgg = aggregate(curRows), priorAgg = aggregate(priorRows);
  // Fuer Scheme-Tendenzen und "Daten bis Woche": laufende Saison, vor dem ersten Spiel das Vorjahr
  const pbp = played.length ? curRows : priorRows;
  console.log(`Play-by-Play: ${curRows.length} Plays ${season}, ${priorRows.length} Plays ${season - 1} (Vorjahr).`);

  const mix = (cv, pv, g) => {
    if (cv == null && pv == null) return null;
    if (pv == null) return cv;
    if (cv == null || !g) return pv;
    return (g * cv + UNIT_PRIOR_K * pv) / (g + UNIT_PRIOR_K);
  };
  const r4o = o => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, v == null ? null : r4(v)]));
  const teams = Object.keys(NFL_TEAM_META).map(abbr => {
    const c = curAgg[abbr], pr = priorAgg[abbr];
    const g = c ? c.games : 0;
    const side = sd => {
      const o = {};
      METRICS.forEach(m => { o[m.key] = mix(c ? c[sd][m.key] : null, pr ? pr[sd][m.key] : null, g); });
      return o;
    };
    return {
      abbr, games: g,
      off: r4o(side('off')), def: r4o(side('def')),               // Mix -> Raenge + Anzeige
      offSeason: c ? r4o(c.off) : null, defSeason: c ? r4o(c.def) : null,
      offPrior: pr ? r4o(pr.off) : null, defPrior: pr ? r4o(pr.def) : null,
      rzTrips: c ? c.rzTrips : { off: 0, def: 0 },
    };
  });

  // ---------- Fantasy Points Allowed (Stufenplan) ----------
  // Backtest 2021-2025 (siehe docs/BACKTEST-MATCHUP-BADGES.md): nach nur
  // einem Spiel ist die Saison-FPA wertlos (Woche 2: Gruen-Rot-Abstand
  // 0,05 Punkte), das Vorjahr der Defense traegt dagegen Signal. Daher:
  //   0 Spiele -> Vorjahr, 1 Spiel -> (1*Saison + 12*Vorjahr)/13,
  //   ab 2 Spielen -> laufende Saison.
  const FPA_PRIOR_K = 12;
  async function fpaFor(yr) {
    let rows;
    try { rows = parseCsv(await httpsGetText(`${REL}/stats_player/stats_player_week_${yr}.csv`)); }
    catch (e) { return null; }
    const sum = {}, games = {};
    rows.filter(r => r.season_type === 'REG' && FPA_POS.includes(r.position) && r.opponent_team).forEach(r => {
      const opp = normTeam(r.opponent_team);
      (sum[opp] = sum[opp] || {})[r.position] = ((sum[opp] || {})[r.position] || 0) + (Number(r.fantasy_points_ppr) || 0);
      (games[opp] = games[opp] || new Set()).add(r.week);
    });
    const per = {};
    Object.keys(sum).forEach(a => { per[a] = { g: games[a].size }; FPA_POS.forEach(pos => { per[a][pos] = (sum[a][pos] || 0) / games[a].size; }); });
    return per;
  }
  const fpaCur = played.length ? (await fpaFor(season)) || {} : {};
  const fpaPrior = (await fpaFor(season - 1)) || {};
  const r1 = v => (v == null ? null : Math.round(v * 10) / 10);
  teams.forEach(t => {
    const c = fpaCur[t.abbr], pr = fpaPrior[t.abbr];
    const g = c ? c.g : 0;
    t.fpaGames = g;
    t.fpaMethod = g === 0 ? 'Vorjahr' : g === 1 && pr ? 'Mix' : 'Saison';
    t.fpa = {}; t.fpaCur = {}; t.fpaPrior = {};
    FPA_POS.forEach(pos => {
      const cv = c ? c[pos] : null, pv = pr ? pr[pos] : null;
      t.fpaCur[pos] = r1(cv); t.fpaPrior[pos] = r1(pv);
      t.fpa[pos] = r1(g === 0 ? pv : g === 1 && pv != null ? (cv + FPA_PRIOR_K * pv) / (1 + FPA_PRIOR_K) : cv);
    });
  });

  // ---------- Ränge ----------
  METRICS.forEach(m => {
    const offR = rankBy(teams, t => t.off[m.key], m.offBetter);
    const defR = rankBy(teams, t => t.def[m.key], m.offBetter === 'high' ? 'low' : 'high');
    teams.forEach(t => {
      (t.offRank = t.offRank || {})[m.key] = offR[t.abbr] || null;
      (t.defRank = t.defRank || {})[m.key] = defR[t.abbr] || null;
    });
  });
  FPA_POS.forEach(pos => {
    const r = rankBy(teams, t => t.fpa[pos], 'high');
    teams.forEach(t => { (t.fpaRank = t.fpaRank || {})[pos] = r[t.abbr] || null; });
  });

  // ---------- Scheme-Tendenzen (FTN-Charting) ----------
  // FTN (ueber nflverse) liefert je Spielzug Blitzer, Box-Count, Play Action,
  // Screen, Motion. Join ueber (game_id, play_id). Fehlt die Datei (neue
  // Saison noch nicht gecharted), bleibt "scheme" einfach leer.
  let schemeLeague = null;
  try {
    const ftn = parseCsv(await httpsGetText(`${REL}/ftn_charting/ftn_charting_${statSeason}.csv`));
    const byPlay = new Map(ftn.map(r => [`${r.nflverse_game_id}#${r.nflverse_play_id}`, r]));
    const T = v => v === 'TRUE' || v === '1' || v === 'true';
    // k: Tendenz, who: welche Seite entscheidet die Haeufigkeit
    const SCH = {
      blitz: { who: 'def', label: 'Blitz', universe: 'dropback' },
      box8: { who: 'def', label: 'Stacked Box (8+)', universe: 'rush' },
      pa: { who: 'off', label: 'Play Action', universe: 'dropback' },
      screen: { who: 'off', label: 'Screen', universe: 'pass' },
      motion: { who: 'off', label: 'Motion', universe: 'play' },
    };
    const S = {}; const L = {};
    const SS = (abbr, side, k) => {
      S[abbr] = S[abbr] || { off: {}, def: {} };
      return (S[abbr][side][k] = S[abbr][side][k] || { n: 0, N: 0, ex: 0, eo: 0 });
    };
    for (const p of pbp) {
      if (!p.posteam || !p.defteam || p.epa === '' || p.epa === 'NA' || p.two_point_attempt === '1') continue;
      if (p.play_type !== 'pass' && p.play_type !== 'run') continue;
      const f = byPlay.get(`${p.game_id}#${p.play_id}`);
      if (!f) continue;
      const epa = Number(p.epa);
      const inU = {
        dropback: p.qb_dropback === '1',
        rush: p.rush === '1' && p.qb_scramble !== '1',
        pass: p.pass_attempt === '1' && p.sack !== '1',
        play: p.pass === '1' || p.rush === '1',
      };
      const box = Number(f.n_defense_box) || 0;
      const flag = {
        blitz: f.n_blitzers !== '' ? Number(f.n_blitzers) > 0 : null,
        box8: box > 0 ? box >= 8 : null,
        pa: f.is_play_action !== '' ? T(f.is_play_action) : null,
        screen: f.is_screen_pass !== '' ? T(f.is_screen_pass) : null,
        motion: f.is_motion !== '' ? T(f.is_motion) : null,
      };
      Object.entries(SCH).forEach(([k, d]) => {
        if (!inU[d.universe] || flag[k] == null) return;
        const lk = (L[k] = L[k] || { n: 0, N: 0 }); lk.N++; if (flag[k]) lk.n++;
        [[normTeam(p.posteam), 'off'], [normTeam(p.defteam), 'def']].forEach(([abbr, side]) => {
          const c = SS(abbr, side, k);
          c.N++;
          if (flag[k]) { c.n++; c.ex += epa; } else c.eo += epa;
        });
      });
    }
    // Ausgabe: rate = n/N, epaX = EPA/Play in der Situation, epaNo = sonst
    const fin = c => ({ n: c.n, N: c.N, rate: c.N ? r4(c.n / c.N) : null, epaX: c.n ? r4(c.ex / c.n) : null, epaNo: c.N - c.n ? r4(c.eo / (c.N - c.n)) : null });
    teams.forEach(t => {
      const s = S[t.abbr];
      if (!s) return;
      t.scheme = { off: {}, def: {} };
      ['off', 'def'].forEach(side => Object.keys(SCH).forEach(k => { if (s[side][k]) t.scheme[side][k] = fin(s[side][k]); }));
    });
    // Rang der Haeufigkeit (1 = macht es am haeufigsten) auf der entscheidenden Seite
    Object.entries(SCH).forEach(([k, d]) => {
      const r = rankBy(teams.filter(t => t.scheme && t.scheme[d.who][k]), t => t.scheme[d.who][k].rate, 'high');
      teams.forEach(t => { if (t.scheme && t.scheme[d.who][k]) t.scheme[d.who][k].rank = r[t.abbr] || null; });
    });
    schemeLeague = Object.fromEntries(Object.entries(SCH).map(([k, d]) => [k, { ...d, rate: L[k] && L[k].N ? r4(L[k].n / L[k].N) : null }]));
    console.log(`FTN-Charting ${statSeason}: ${byPlay.size} Plays gejoint.`);
  } catch (e) {
    console.log(`FTN-Charting ${statSeason} nicht verfügbar (${e.message}) -- Scheme-Tendenzen übersprungen.`);
  }

  // ---------- Spielplan ----------
  const schedule = {};
  seasonGames.forEach(g => {
    const w = Number(g.week);
    (schedule[w] = schedule[w] || []).push({
      away: normTeam(g.away_team), home: normTeam(g.home_team),
      day: g.gameday, time: g.gametime, weekday: g.weekday,
      spread: g.spread_line === '' ? null : Number(g.spread_line),
      total: g.total_line === '' ? null : Number(g.total_line),
      awayScore: g.away_score === '' ? null : Number(g.away_score),
      homeScore: g.home_score === '' ? null : Number(g.home_score),
    });
  });
  const weeks = Object.keys(schedule).map(Number).sort((a, b) => a - b);
  const currentWeek = weeks.find(w => schedule[w].some(g => g.homeScore == null)) || weeks[weeks.length - 1];
  const throughWeek = statSeason === season ? Math.max(...pbp.map(p => Number(p.week))) : 0;

  const data = {
    season, statSeason, throughWeek, currentWeek, fpaPriorK: FPA_PRIOR_K, unitPriorK: UNIT_PRIOR_K, priorSeason: season - 1,
    verdictCalibration: VERDICT_CALIBRATION, verdictVsVegas: VERDICT_VS_VEGAS, syncedAt: new Date().toISOString(),
    metrics: METRICS, fpaPositions: FPA_POS, scheme: schemeLeague,
    teams: Object.fromEntries(teams.map(t => [t.abbr, t])),
    schedule,
  };

  const out = `// ============================================================
//  MATCHUP_ADVANTAGE — Unit gegen Unit je NFL-Spiel (nflverse)
// ============================================================
//  AUTO-GENERIERT von scripts/sync-matchup-advantage.js über die GitHub
//  Action ".github/workflows/sync-matchup-advantage.yml". Nicht von Hand
//  editieren -- Änderungen werden beim nächsten Sync überschrieben.
//
//  teams[ABBR] = { games, off:{metric}, def:{metric}, offRank, defRank,
//                  fpa:{QB,RB,WR,TE}, fpaRank, rzTrips }
//  Ränge 1-32, 1 = beste Unit. fpaRank 1 = lässt die meisten
//  Fantasy-Punkte (PPR) an diese Position zu = leichtestes Matchup.
//  schedule[week] = [{away, home, day, time, weekday, spread, total, ...}]
//  spread = nflverse spread_line (positiv = Heimteam favorisiert).
// ============================================================

const MATCHUP_ADVANTAGE = ${JSON.stringify(data)};
`;
  fs.writeFileSync(OUT, out, 'utf8');
  console.log(`${OUT}: Season ${season}, Unit-Stats ${statSeason}${throughWeek ? ' bis Woche ' + throughWeek : ''}, aktuelle Woche ${currentWeek}, ${teams.filter(t => t.games).length} Teams, FPA-Methode: ${[...new Set(teams.map(t => t.fpaMethod))].join('/')}.`);
}

main().then(() => process.exit(0)).catch(err => {
  console.error('Matchup Advantage Sync fehlgeschlagen:', err.message);
  process.exit(1);
});
