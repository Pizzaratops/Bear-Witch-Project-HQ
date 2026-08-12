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
