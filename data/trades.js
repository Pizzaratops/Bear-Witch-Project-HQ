// ============================================================
//  TRADES — manuelles Ledger für Picks ab 2027
// ============================================================
//  ESPN führt in unserer Liga keine Draft-Picks für 2027 und später
//  (aus unbekanntem Grund). Deshalb werden Trades, die solche Picks
//  enthalten, hier von Hand nachgetragen — sowohl als Chronik
//  (TRADES, für die Trade-History-Seite) als auch verdichtet zu
//  "wer besitzt aktuell welchen 2027er-Pick" (FUTURE_PICKS_2027).
//
//  Regel: Jedes Team startet mit seinem eigenen 1st/2nd/3rd/...-Pick
//  pro Runde für 2027. "from" = urspruenglicher Besitzer des Picks.
//  Wird ein Pick weitergetradet, einfach "owner" auf das neue Team
//  aendern (Chronik in TRADES bleibt unveraendert als Beleg).
// ============================================================

const TRADES = [
  {
    date: "2026-08-12",
    teamA: "Beastmode",
    teamAGives: ["2027 1st", "2027 2nd", "2027 3rd", "Colston Loveland"],
    teamB: "The Bear Witch Project",
    teamBGives: ["Trey McBride", "Tetairoa McMillan"],
  },
  {
    date: "2026-08-12",
    teamA: "The Bear Witch Project",
    teamAGives: ["Emeka Egbuka"],
    teamB: "Team Beermode",
    teamBGives: ["2027 1st", "2027 3rd"],
  },
];

// Verdichtete Sicht: wer besitzt nach den obigen Trades welchen
// 2027er-Pick (nur Picks, die tatsächlich den Besitzer gewechselt
// haben — alle nicht gelisteten Picks liegen weiterhin beim
// jeweiligen Team selbst).
const FUTURE_PICKS_2027 = [
  { round: "1st", from: "Beastmode",     owner: "The Bear Witch Project" },
  { round: "2nd", from: "Beastmode",     owner: "The Bear Witch Project" },
  { round: "3rd", from: "Beastmode",     owner: "The Bear Witch Project" },
  { round: "1st", from: "Team Beermode", owner: "The Bear Witch Project" },
  { round: "3rd", from: "Team Beermode", owner: "The Bear Witch Project" },
];
