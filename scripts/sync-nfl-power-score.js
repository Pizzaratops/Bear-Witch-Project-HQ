#!/usr/bin/env node
// ============================================================
//  BOOTLEG POWER SCORE SYNC — 6-Kategorien-Spinnennetz je NFL-Team
// ============================================================
//  Berechnet je NFL-Team, je Woche, in ZWEI Varianten (kumulativ bis zu
//  dieser Woche, und isoliert NUR diese Woche) den Liga-Rang (1-32) in
//  6 Kategorien:
//
//    1. Passing Offense   -> EPA/Dropback (Passing-EPA / (Attempts+Sacks))
//    2. Turnover-Diff.     -> Takeaways minus Giveaways
//    3. Pass Defense       -> EPA/Dropback zugelassen
//    4. Rush Defense       -> EPA/Carry zugelassen
//    5. Points Scored      -> Punkte/Spiel
//    6. Points Allowed     -> Punkte/Spiel zugelassen
//
//  Warum genau diese 6 (statt der urspruenglichen reinen Yards-Stats):
//  mit echten nflverse-Daten 2021-2025 gegen tatsaechliche Season-Siege
//  korreliert geprueft (r): Passing Yards Allowed war mit r=-0.01
//  praktisch bedeutungslos, Passing EPA/Play dagegen bei -0.56. Rushing
//  Yards Allowed schlug dagegen Rushing EPA/Play allowed (-0.50 vs
//  -0.20) -- deshalb dort bewusst bei Yards geblieben statt blind auf
//  EPA umzustellen. Turnover-Differential (r=0.61) ersetzt die
//  schwaechste Kategorie (Rushing Offense, r=0.34/0.32).
//
//  Update 10/2026 (Rush Defense auf EPA/Carry, EPA pro Dropback statt
//  Summe pro Spiel): Rushing Yards/Spiel zugelassen misst vor allem, WIE
//  OFT der Gegner läuft (r=0.83 mit Gegner-Carries/Spiel; die wiederum
//  r=-0.65 mit Win%) -- also Spielverlauf ("wer führt, wird angelaufen")
//  statt Run-Defense-Qualität. Die hohe Sieg-Korrelation (-0.49) war
//  dadurch zum Großteil doppelt gezählte Teamstärke, die Points Allowed
//  schon abbildet. Gegen externe Defense-Rankings (DVOA/PFF/EPA-Composite,
//  Stand Woche 4/2026) passt EPA/Carry deutlich besser: Spearman 0.85
//  statt 0.62. Preis: EPA/Carry ist von Woche zu Woche rauschiger
//  (Split-Half r=0.17 vs 0.33) -- früh in der Saison also mit Vorsicht
//  lesen. Passing-EPA jetzt pro Dropback statt Summe/Spiel (Label
//  sagte schon immer EPA/Play); Ranking praktisch identisch
//  (Win-r 0.76 vs 0.75 Offense, -0.56 Defense).
//  Kumulativ = Summe EPA / Summe Plays (nicht Mittel der Spielwerte).
//
//  Quelle: nflverse (siehe scripts/lib/nflverse.js) -- kein ESPN, keine
//  Secrets noetig, dieselbe Quelle wie scripts/sync-espn-nfl-standings.js.
//
//  Schreibt data/nfl-power-score.js -> NFL_POWER_SCORE[season] =
//  { categories: [...], weeks: { [week]: { cumulative: [...], weekly: [...] } } }
//
//  Usage:
//    node scripts/sync-nfl-power-score.js
// ============================================================

const fs = require('fs');
const path = require('path');
const { httpsGetText, parseCsv, normTeam, NFL_TEAM_META, GAMES_CSV_URL, statsTeamWeekUrl } = require('./lib/nflverse');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'data', 'nfl-power-score.js');

const CATEGORIES = [
  { key: 'passOffEpa', label: 'Passing Offense', unit: 'EPA/Dropback', better: 'high', num: 'passOffEpaSum', den: 'passOffDb', dec: 3 },
  { key: 'turnoverDiff', label: 'Turnover-Differential', unit: 'pro Spiel', better: 'high' },
  { key: 'passDefEpa', label: 'Pass Defense', unit: 'EPA/Dropback zugelassen', better: 'low', num: 'passDefEpaSum', den: 'passDefDb', dec: 3 },
  { key: 'rushDefEpa', label: 'Rush Defense', unit: 'EPA/Carry zugelassen', better: 'low', num: 'rushDefEpaSum', den: 'rushDefCar', dec: 3 },
  { key: 'pointsFor', label: 'Points Scored', unit: 'pro Spiel', better: 'high' },
  { key: 'pointsAgainst', label: 'Points Allowed', unit: 'pro Spiel zugelassen', better: 'low' },
];

function roundN(n, dec) { const f = Math.pow(10, dec || 2); return Math.round(n * f) / f; }

// Wert einer Kategorie über eine Liste von Spielen: Raten-Kategorien
// (num/den) als Summe/Summe, alle anderen als Mittelwert pro Spiel.
function catValue(cat, games) {
  if (!games.length) return null;
  if (cat.num) {
    const den = games.reduce((s, g) => s + g[cat.den], 0);
    return den > 0 ? roundN(games.reduce((s, g) => s + g[cat.num], 0) / den, cat.dec) : null;
  }
  return roundN(games.reduce((s, g) => s + g[cat.key], 0) / games.length, cat.dec);
}

// Kategorien-Definition fürs Frontend ohne interne Felder (num/den/dec).
const CATEGORIES_OUT = CATEGORIES.map(({ key, label, unit, better }) => ({ key, label, unit, better }));

// Berechnet Rang 1-32 je Kategorie fuer eine Liste von {abbr, values}.
// null-Werte (Bye-Week bei "weekly", oder noch kein Spiel bei "cumulative"
// vor Woche 1) landen ohne Rang am Ende.
function assignRanks(list) {
  CATEGORIES.forEach(cat => {
    const withValue = list.filter(t => t.values[cat.key] != null);
    const sorted = withValue.slice().sort((a, b) =>
      cat.better === 'high' ? b.values[cat.key] - a.values[cat.key] : a.values[cat.key] - b.values[cat.key]
    );
    sorted.forEach((t, i) => { t.ranks[cat.key] = i + 1; });
    list.filter(t => t.values[cat.key] == null).forEach(t => { t.ranks[cat.key] = null; });
  });
}

async function main() {
  const [gamesCsv, ] = await Promise.all([httpsGetText(GAMES_CSV_URL)]);
  const allGames = parseCsv(gamesCsv);
  const regGames = allGames.filter(r => r.game_type === 'REG' && r.season);

  if (!regGames.length) throw new Error('Keine Regular-Season-Spiele in games.csv gefunden -- Datenformat von nflverse evtl. geändert.');

  const season = Math.max(...regGames.map(r => Number(r.season)));
  const seasonGames = regGames.filter(r => Number(r.season) === season);
  const playedGames = seasonGames.filter(r => r.home_score !== '' && r.away_score !== '');

  if (!playedGames.length) {
    console.log(`Season ${season}: noch kein Regular-Season-Spiel gespielt -- Sync übersprungen, keine Datei geschrieben.`);
    return;
  }

  let statsRows = [];
  try {
    const statsCsv = await httpsGetText(statsTeamWeekUrl(season));
    statsRows = parseCsv(statsCsv).filter(r => r.season_type === 'REG' && r.team && r.opponent_team);
  } catch (e) {
    console.log(`Season ${season}: stats_team_week noch nicht verfügbar (${e.message}) -- Sync übersprungen, keine Datei geschrieben.`);
    return;
  }
  if (!statsRows.length) {
    console.log(`Season ${season}: stats_team_week enthält noch keine Zeilen -- Sync übersprungen.`);
    return;
  }

  // --- Punkte je Team/Spiel aus games.csv ---
  const pointsByGameTeam = {}; // `${game_id}|${abbr}` -> {pointsFor, pointsAgainst, week}
  playedGames.forEach(g => {
    const week = Number(g.week);
    const home = normTeam(g.home_team), away = normTeam(g.away_team);
    const hs = Number(g.home_score), as = Number(g.away_score);
    pointsByGameTeam[`${g.game_id}|${home}`] = { pointsFor: hs, pointsAgainst: as, week };
    pointsByGameTeam[`${g.game_id}|${away}`] = { pointsFor: as, pointsAgainst: hs, week };
  });

  // --- Offense-Zeilen je Team/Spiel aus stats_team_week (fuer Yards/EPA/Turnover) ---
  const statsByGameTeam = {}; // `${game_id}|${abbr}` -> row
  statsRows.forEach(r => { statsByGameTeam[`${r.game_id}|${normTeam(r.team)}`] = r; });

  // Ein "Perf"-Eintrag pro Team/Spiel: eigene Offense-Werte + (ueber die
  // Gegner-Zeile im selben Spiel) die zugelassenen Defense-Werte.
  const perfByGameTeam = {}; // `${game_id}|${abbr}` -> {week, abbr, passOffEpa, turnoverDiff, passDefEpa, rushDefYds, pointsFor, pointsAgainst}
  statsRows.forEach(r => {
    const abbr = normTeam(r.team);
    const oppAbbr = normTeam(r.opponent_team);
    const oppRow = statsByGameTeam[`${r.game_id}|${oppAbbr}`];
    if (!oppRow) return; // sollte nicht vorkommen, aber lieber ueberspringen als crashen
    const pts = pointsByGameTeam[`${r.game_id}|${abbr}`];
    if (!pts) return; // Spiel noch nicht final in games.csv (sollte durch playedGames-Filter oben nicht passieren)

    const ownGiveaways = (Number(r.passing_interceptions) || 0) + (Number(r.fumbles_lost_total) || 0);
    const oppGiveaways = (Number(oppRow.passing_interceptions) || 0) + (Number(oppRow.fumbles_lost_total) || 0);

    perfByGameTeam[`${r.game_id}|${abbr}`] = {
      week: pts.week,
      abbr,
      // Dropbacks = Pass-Attempts + Sacks (passing_epa enthält die Sacks)
      passOffEpaSum: Number(r.passing_epa) || 0,
      passOffDb: (Number(r.attempts) || 0) + (Number(r.sacks_suffered) || 0),
      turnoverDiff: oppGiveaways - ownGiveaways,          // Takeaways (= Gegner-Giveaways) minus eigene Giveaways
      passDefEpaSum: Number(oppRow.passing_epa) || 0,      // Gegner-Passing-EPA in diesem Spiel = von uns zugelassen
      passDefDb: (Number(oppRow.attempts) || 0) + (Number(oppRow.sacks_suffered) || 0),
      rushDefEpaSum: Number(oppRow.rushing_epa) || 0,      // Gegner-Rushing-EPA in diesem Spiel = von uns zugelassen
      rushDefCar: Number(oppRow.carries) || 0,
      pointsFor: pts.pointsFor,
      pointsAgainst: pts.pointsAgainst,
    };
  });

  const perfList = Object.values(perfByGameTeam);
  const weeks = [...new Set(perfList.map(p => p.week))].sort((a, b) => a - b);
  const allAbbrs = Object.keys(NFL_TEAM_META);

  const weeksOut = {};
  weeks.forEach(uptoWeek => {
    // WEEKLY: nur Spiele GENAU dieser Woche.
    const weeklyList = allAbbrs.map(abbr => {
      const p = perfList.find(x => x.abbr === abbr && x.week === uptoWeek);
      const values = {};
      CATEGORIES.forEach(cat => { values[cat.key] = p ? catValue(cat, [p]) : null; });
      return { abbr, values, ranks: {} };
    });
    assignRanks(weeklyList);

    // CUMULATIVE: Mittelwert ueber alle Spiele bis einschliesslich dieser Woche.
    const cumulativeList = allAbbrs.map(abbr => {
      const games = perfList.filter(x => x.abbr === abbr && x.week <= uptoWeek);
      const values = {};
      CATEGORIES.forEach(cat => { values[cat.key] = catValue(cat, games); });
      return { abbr, values, ranks: {}, gamesPlayed: games.length };
    });
    assignRanks(cumulativeList);

    weeksOut[uptoWeek] = { cumulative: cumulativeList, weekly: weeklyList };
  });

  const now = new Date().toISOString();
  const out = `// ============================================================
//  NFL_POWER_SCORE — "Bootleg Power Score" Spinnennetz (nflverse)
// ============================================================
//  AUTO-GENERIERT von scripts/sync-nfl-power-score.js über die GitHub
//  Action ".github/workflows/sync-nfl-power-score.yml". Nicht von Hand
//  editieren — Änderungen werden beim nächsten Sync überschrieben.
//  Zuletzt synchronisiert: ${now}
//
//  6 Kategorien, datengestützt ausgewählt (siehe Kommentar oben im
//  Script für die Korrelationsanalyse gegen echte Season-Siege
//  2021–2025, Update 10/2026): Passing Offense (EPA/Dropback),
//  Turnover-Differential, Pass Defense (EPA/Dropback zugelassen),
//  Rush Defense (EPA/Carry zugelassen),
//  Points Scored, Points Allowed.
//
//  NFL_POWER_SCORE[season].categories = [{key,label,unit,better}, ...]
//  in fester Reihenfolge (Radar-Achsen-Reihenfolge).
//
//  NFL_POWER_SCORE[season].weeks[week] = { cumulative, weekly }, jeweils
//  ein Array aller 32 Teams: { abbr, values:{<key>: Zahl|null},
//  ranks:{<key>: 1-32|null} }. "cumulative" = Mittelwert/Rang über alle
//  Spiele bis einschließlich dieser Woche, "weekly" = nur diese eine
//  Woche (null bei Bye-Week).
//
//  "better" pro Kategorie: "high" = höherer Rohwert ist besser (Rang 1),
//  "low" = niedrigerer Rohwert ist besser (Rang 1) -- wichtig für die
//  Anzeige (Rang 1 immer aussen im Spinnennetz, unabhängig vom Vorzeichen
//  der zugrundeliegenden Kennzahl).
// ============================================================

const NFL_POWER_SCORE = {
  ${season}: {
    categories: ${JSON.stringify(CATEGORIES_OUT, null, 2).split('\n').join('\n    ')},
    weeks: ${JSON.stringify(weeksOut, null, 2).split('\n').join('\n    ')}
  }
};
`;

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, out, 'utf8');
  console.log(`${OUT} aktualisiert: Season ${season}, Wochen ${weeks[0]}–${weeks[weeks.length - 1]}, 32 Teams, 6 Kategorien.`);
}

main().then(() => {
  process.exit(0);
}).catch(err => {
  console.error('Bootleg Power Score Sync fehlgeschlagen:', err.message);
  process.exit(1);
});
