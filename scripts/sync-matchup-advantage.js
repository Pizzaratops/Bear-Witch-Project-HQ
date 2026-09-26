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
//  Ränge: 1 = beste Unit. Offense: hoher Wert = gut (außer sackRate).
//  Defense: niedriger zugelassener Wert = gut (außer sackRate: hohe
//  Sack-Quote = gut). fpaRank: 1 = lässt die MEISTEN Punkte zu
//  (= leichtestes Matchup für die gegnerischen Spieler).
//
//  Dazu der komplette REG-Spielplan der Saison (für Wochen-Auswahl und
//  den Spieler-Matchup-Boost auf der Fantasy-Matchups-Seite).
//
//  Quelle: nflverse (play_by_play_<season>.csv.gz,
//  stats_player_week_<season>.csv, games.csv). Keine Secrets.
//
//  Schreibt data/matchup-advantage.js -> MATCHUP_ADVANTAGE
//  Usage:  node scripts/sync-matchup-advantage.js
// ============================================================

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const https = require('https');
const { httpsGetText, parseCsv, normTeam, NFL_TEAM_META, GAMES_CSV_URL } = require('./lib/nflverse');

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

function httpsGetBuffer(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'dpe-hq-bot' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return httpsGetBuffer(res.headers.location).then(resolve, reject);
      }
      if (res.statusCode !== 200) { res.resume(); return reject(new Error(`HTTP ${res.statusCode} für ${url}`)); }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

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
  if (!played.length) {
    console.log(`Season ${season}: noch kein Spiel gespielt -- nichts geschrieben.`);
    return;
  }

  // ---------- Play-by-Play ----------
  const pbpGz = await httpsGetBuffer(`${REL}/pbp/play_by_play_${season}.csv.gz`);
  const pbp = parseCsv(zlib.gunzipSync(pbpGz).toString('utf8')).filter(p => p.season_type === 'REG');

  const acc = {};
  const A = abbr => (acc[abbr] = acc[abbr] || {
    off: { passN: 0, passEpa: 0, rushN: 0, rushEpa: 0, db: 0, sacks: 0, plays: 0, expl: 0, rzDrives: new Set(), rzTd: new Set() },
    def: { passN: 0, passEpa: 0, rushN: 0, rushEpa: 0, db: 0, sacks: 0, plays: 0, expl: 0, rzDrives: new Set(), rzTd: new Set() },
    games: new Set(),
  });

  for (const p of pbp) {
    if (!p.posteam || !p.defteam) continue;
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
    passEpa: r4(mean(s.passEpa, s.passN)),
    rushEpa: r4(mean(s.rushEpa, s.rushN)),
    sackRate: r4(mean(s.sacks, s.db)),
    explosive: r4(mean(s.expl, s.plays)),
    rzTd: s.rzDrives.size ? r4(s.rzTd.size / s.rzDrives.size) : null,
  });

  const teams = Object.keys(NFL_TEAM_META).map(abbr => {
    const a = acc[abbr];
    return a
      ? { abbr, games: a.games.size, off: finish(a.off), def: finish(a.def), rzTrips: { off: a.off.rzDrives.size, def: a.def.rzDrives.size } }
      : { abbr, games: 0, off: {}, def: {}, rzTrips: { off: 0, def: 0 } };
  });

  // ---------- Fantasy Points Allowed ----------
  const spw = parseCsv(await httpsGetText(`${REL}/stats_player/stats_player_week_${season}.csv`))
    .filter(r => r.season_type === 'REG' && FPA_POS.includes(r.position) && r.opponent_team);
  const fpa = {}; // abbr -> pos -> sum
  const fpaGames = {}; // abbr -> Set(week)
  for (const r of spw) {
    const opp = normTeam(r.opponent_team);
    fpa[opp] = fpa[opp] || {};
    fpa[opp][r.position] = (fpa[opp][r.position] || 0) + (Number(r.fantasy_points_ppr) || 0);
    (fpaGames[opp] = fpaGames[opp] || new Set()).add(r.week);
  }
  teams.forEach(t => {
    const n = fpaGames[t.abbr] ? fpaGames[t.abbr].size : 0;
    t.fpa = {};
    FPA_POS.forEach(pos => { t.fpa[pos] = n ? Math.round(((fpa[t.abbr] || {})[pos] || 0) / n * 10) / 10 : null; });
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
  const throughWeek = Math.max(...pbp.map(p => Number(p.week)));

  const data = {
    season, throughWeek, currentWeek, syncedAt: new Date().toISOString(),
    metrics: METRICS, fpaPositions: FPA_POS,
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
  console.log(`${OUT}: Season ${season}, Daten bis Woche ${throughWeek}, aktuelle Woche ${currentWeek}, ${teams.filter(t => t.games).length} Teams.`);
}

main().then(() => process.exit(0)).catch(err => {
  console.error('Matchup Advantage Sync fehlgeschlagen:', err.message);
  process.exit(1);
});
