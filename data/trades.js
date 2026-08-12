// ============================================================
//  TRADES — manuelles Ledger für Picks ab 2027
// ============================================================
//  ESPN führt in unserer Liga keine Draft-Picks für 2027 und später
//  (aus unbekanntem Grund). Deshalb werden Trades, die solche Picks
//  enthalten, hier von Hand nachgetragen — sowohl als Chronik
//  (TRADES, für die Trade-History-Seite) als auch verdichtet zu
//  "wer besitzt aktuell welchen Pick" je Zukunftsjahr (FUTURE_PICKS,
//  für die Future-Draft-Boards-Seite 2027/2028/2029).
//
//  Regel: Jedes Team besitzt zu Beginn seinen eigenen 1st/2nd/3rd/...
//  Pick pro Jahr ("Own", muss hier NICHT eingetragen werden — das ist
//  die Voreinstellung in js/app.js). Nur tatsaechlich getradete Picks
//  werden unten in FUTURE_PICKS gelistet. "from" = urspruenglicher
//  Besitzer des Picks, "owner" = wer ihn jetzt hat.
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
  {
    date: "2026-08-11",
    teamA: "Beastmode",
    teamAGives: ["Quinshon Judkins", "Rome Odunze"],
    teamB: "Burrowhead Dancers",
    teamBGives: ["James Cook III"],
  },
  {
    date: "2026-08-11",
    teamA: "Beastmode",
    teamAGives: ["Jaylen Waddle", "Christian McCaffrey", "Marvin Harrison Jr."],
    teamB: "Running Bisons",
    teamBGives: ["Puka Nacua"],
  },
  {
    date: "2026-08-12",
    teamA: "Beastmode",
    teamAGives: ["Kyle Pitts"],
    teamB: "Team Beermode",
    teamBGives: ["2026 5th"],
  },
];

// Getradete Picks INNERHALB des 2026er Drafts (im Gegensatz zu FUTURE_PICKS
// unten, das nur 2027+ betrifft). Format: round = Rundennummer (1-15) wie
// im Draft Board 2026 verwendet. "from" = urspruenglicher Team-Name (Spalte
// im Draft Board 2026), "owner" = wer den Pick jetzt haelt.
const TRADED_PICKS_2026 = [
  { round: 5, from: "Beastmode", owner: "Team Beermode" },
];

// Verdichtete Sicht je Zukunftsjahr: nur Picks, die tatsaechlich den
// Besitzer gewechselt haben. Alles, was hier NICHT auftaucht, ist "Own"
// (Team besitzt seinen eigenen Pick fuer dieses Jahr/diese Runde noch).
const FUTURE_PICKS = {
  2027: [
    { round: "1st", from: "Beastmode",     owner: "The Bear Witch Project" },
    { round: "2nd", from: "Beastmode",     owner: "The Bear Witch Project" },
    { round: "3rd", from: "Beastmode",     owner: "The Bear Witch Project" },
    { round: "1st", from: "Team Beermode", owner: "The Bear Witch Project" },
    { round: "3rd", from: "Team Beermode", owner: "The Bear Witch Project" },
  ],
  2028: [],
  2029: [],
};
