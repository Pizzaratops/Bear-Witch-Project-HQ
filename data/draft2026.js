// ============================================================
// Bear Witch Project HQ — Draft 2026 Datenbasis
// ============================================================
// League-Regeln (Stand 12.08.2026):
//  - 12 Teams, Draft in ca. 22 Tagen (~ Anfang September 2026)
//  - Keeper Lock Date: 26.08.2026, 21:00 Uhr (GMT+2)
//  - Bis zu 10 Keeper pro Team erlaubt, niemand muss alle nehmen
//  - "Keeper Designated Round: End of Draft" -> Draft wird von UNTEN
//    aufgefuellt. Ein Team mit K Keepern belegt damit automatisch
//    die letzten K Runden seines eigenen Picks (Runde 16-K bis 15).
//  - Bislang wurden KEINE Picks getradet -> jedes Team draftet mit
//    seinem eigenen Erstrunden-Pick usw.
//  - Gesamtzahl Runden = 15 (ergibt sich daraus, dass bei maximal
//    10 Keepern die Runden 1-5 fuer ALLE Teams frei bleiben)
//
// Reihenfolge der Spieler pro Team = Reihenfolge, wie ESPN sie unter
// "Edit Players" auflistet. Diese Reihenfolge wird hier so interpretiert,
// dass der ZUERST gelistete Keeper die frueheste (niedrigste) belegte
// Runde einnimmt und der ZULETZT gelistete Keeper Runde 15 belegt.
// Falls das nicht der tatsaechlichen ESPN-Zuordnung entspricht, bitte
// die Reihenfolge in den Arrays unten anpassen — die Rundennummern
// werden automatisch (in js/app.js) daraus berechnet, nicht hier fest
// eingetragen.
//
// status: "Q" = Questionable, "O" = Out (Injury-Tag, wie im ESPN-Export
// direkt an die Position angehaengt, z.B. "WRQ"). null = kein Tag.
//
// tentative: true = NOCH NICHT offiziell als Keeper bei ESPN ausgewaehlt,
// aber vom Team-Owner als sehr wahrscheinlich eingeschaetzt. Wird ueberall
// in Klammern mit "(vsl.)" angezeigt und zaehlt in Runden-/Board-Berechnungen
// mit, bis entweder offiziell bestaetigt (Flag entfernen) oder verworfen
// (Eintrag loeschen).
//
// STAND 12.08.2026: Zwei Trades mit 2027er-Picks eingearbeitet (ESPN
// kennt diese Picks nicht, siehe data/trades.js fuer das Ledger):
//  1) Beastmode  gibt 2027 1st/2nd/3rd + Colston Loveland
//     Bear Witch Project gibt Trey McBride + Tetairoa McMillan
//  2) Bear Witch Project gibt Emeka Egbuka
//     Team Beermode gibt 2027 1st + 2027 3rd
// Die neu erhaltenen Spieler wurden unten jeweils ans Ende der
// Keeper-Liste des neuen Teams gehaengt (=> spaeteste freie Runde).
// Falls die Prioritaet anders sein soll, hier die Reihenfolge tauschen.
//
// UPDATE 19.08.2026: Dritter Trade eingearbeitet (siehe data/trades.js):
//  3) The Lamartrix gibt David Montgomery
//     Bear Witch Project gibt 2027 3rd (via Beastmode)
//
// KEEPER-UPDATE 24.08.2026 (Excel-Export "Keepers 2408.xlsx"): Alle
// Team-Keeperlisten unten auf den aktuellen ESPN-Stand gebracht (neue
// Keeper ergaenzt, nicht mehr gemeldete entfernt, Injury-Tags aktualisiert).
// Emeka Egbuka bei Team Beermode ist jetzt offiziell bestaetigt (tentative-
// Flag entfernt).
// Beim Excel-Export/Copy-Paste ist eine Namenszeile verlorengegangen:
// George Pickens (DAL WR) war komplett aus dem Export gefallen und wurde
// an alter Stelle wieder ergaenzt (vor DeVonta Smith).
//
// KORREKTUR 26.08.2026 (per Live-Screenshots aus ESPN "Edit Players"
// vom Liga-Owner bestaetigt, finaler Stand vor Keeper Lock Date):
//  - Bear Witch Project: Chuba Hubbard ist KEIN Keeper mehr (6 Keeper
//    gesamt: George Pickens, DeVonta Smith, Colston Loveland, Garrett
//    Wilson, Nico Collins, David Montgomery). Der zuvor vermutete
//    "PIT RB"-Keeper (Rico Dowdle) existiert nicht -- war ein reines
//    Excel-Artefakt.
//  - Fred Bulls: Ja'Marr Chase und Kenneth Walker III haben jetzt beide
//    ein Q-Injury-Tag.
//  - Lion Cereals: Adonai Mitchell und Jauan Jennings sind KEINE Keeper
//    mehr (nur noch 8 Keeper gesamt). Kayshon Boutte wurde zu HOU
//    getradet (NFL-Team-Update, nicht Liga-intern).
//  - Angry Ducks: zusaetzlich Omarion Hampton (LAC RB) und T.J. Hockenson
//    (MIN TE) als Keeper gemeldet (Excel-Export war hier nicht mehr
//    aktuell, kein Liga-Trade).
//  - Charged UP: Matthew Golden (GB WR) weiterhin Keeper (faelschlich
//    beim 24.08.-Update entfernt).
//  - Team Beermode: Chris Olave jetzt mit Q-Tag.
//  - Running Bisons: Josh Downs jetzt mit Q-Tag.
//  - The Lamartrix: Zay Flowers jetzt mit Q-Tag.
//  - Beastmode: Jason Myers (K) ist KEIN Keeper mehr (nur noch 9 Keeper
//    gesamt).
// ============================================================

const TOTAL_DRAFT_ROUNDS = 15;
const MAX_KEEPERS = 10;
const KEEPER_LOCK_DATE = "2026-08-26T21:00:00+02:00";
// Draft Day, bestaetigt vom Liga-Owner: Mi. 02.09.2026, 20:00 Uhr deutsche
// Zeit (MESZ, UTC+2 -- Deutschland ist im September noch in der Sommerzeit).
const DRAFT_DATE = "2026-09-02T20:00:00+02:00";

// Tatsaechliche Draft-Reihenfolge, bestaetigt vom Liga-Owner (13.08.2026):
// LINEAR (kein Snake!) -- dieselbe Reihenfolge in JEDER Runde. Reward-the-
// bottom: der Vorjahres-Champion (The Bear Witch Project) pickt als
// Letzter (Slot 12), das schlechteste Team (Running Bisons) als Erster.
// Index 0 = Slot 1 ("1.01"), Index 11 = Slot 12 ("1.12").
const DRAFT_ORDER_2026 = [
  "Running Bisons",
  "Burrowhead Dancers",
  "The Lamartrix",
  "Angry Ducks",
  "Fred Bulls",
  "London NoPuntsIntended",
  "Lion Cereals",
  "Beastmode",
  "Charged UP",
  "Vice City Crackheads",
  "Team Beermode",
  "The Bear Witch Project",
];

const DRAFT_2026_TEAMS = [
  {
    team: "The Bear Witch Project",
    keepers: [
      { name: "George Pickens",       nfl: "DAL", pos: "WR",    status: null },
      { name: "DeVonta Smith",        nfl: "PHI", pos: "WR",    status: null },
      { name: "Colston Loveland",     nfl: "CHI", pos: "TE",    status: null },
      { name: "Garrett Wilson",       nfl: "NYJ", pos: "WR",    status: null },
      { name: "Nico Collins",         nfl: "HOU", pos: "WR",    status: null },
      { name: "David Montgomery",     nfl: "HOU", pos: "RB",    status: null },
    ],
  },
  {
    team: "Burrowhead Dancers",
    keepers: [
      { name: "Davante Adams",        nfl: "LAR", pos: "WR", status: null },
      { name: "Rome Odunze",          nfl: "CHI", pos: "WR", status: null },
      { name: "Rhamondre Stevenson",  nfl: "NE",  pos: "RB", status: null },
      { name: "Quinshon Judkins",     nfl: "CLE", pos: "RB", status: "Q" },
      { name: "Zach Charbonnet",      nfl: "SEA", pos: "RB", status: "O" },
      { name: "Kenny Gainwell",       nfl: "TB",  pos: "RB", status: null },
      { name: "Jameson Williams",     nfl: "DET", pos: "WR", status: null },
      { name: "Caleb Williams",       nfl: "CHI", pos: "QB", status: null },
      { name: "Stefon Diggs",         nfl: "WSH", pos: "WR", status: null },
      { name: "Tony Pollard",         nfl: "TEN", pos: "RB", status: null },
    ],
  },
  {
    team: "Fred Bulls",
    keepers: [
      { name: "Saquon Barkley",       nfl: "PHI", pos: "RB", status: null },
      { name: "Ja'Marr Chase",        nfl: "CIN", pos: "WR", status: "Q" },
      { name: "Travis Kelce",         nfl: "KC",  pos: "TE", status: null },
      { name: "Michael Pittman Jr.",  nfl: "PIT", pos: "WR", status: "Q" },
      { name: "Kenneth Walker III",   nfl: "KC",  pos: "RB", status: "Q" },
      { name: "Jayden Daniels",       nfl: "WSH", pos: "QB", status: null },
    ],
  },
  {
    team: "Lion Cereals",
    keepers: [
      { name: "Matthew Stafford",     nfl: "LAR", pos: "QB", status: null },
      { name: "A.J. Brown",           nfl: "NE",  pos: "WR", status: null },
      { name: "Kyler Murray",         nfl: "MIN", pos: "QB", status: null },
      { name: "Brock Bowers",         nfl: "LV",  pos: "TE", status: null },
      { name: "De'Von Achane",        nfl: "MIA", pos: "RB", status: null },
      { name: "Blake Corum",          nfl: "LAR", pos: "RB", status: null },
      { name: "Brandon Aubrey",       nfl: "DAL", pos: "K",  status: null },
      { name: "Kayshon Boutte",       nfl: "HOU", pos: "WR", status: null },
    ],
  },
  {
    team: "Vice City Crackheads",
    keepers: [
      { name: "Trevor Lawrence",      nfl: "JAX", pos: "QB", status: null },
      { name: "Breece Hall",          nfl: "NYJ", pos: "RB", status: "Q" },
      { name: "Derrick Henry",        nfl: "BAL", pos: "RB", status: null },
      { name: "George Kittle",        nfl: "SF",  pos: "TE", status: "Q" },
      { name: "Patrick Mahomes",      nfl: "KC",  pos: "QB", status: "Q" },
      { name: "Amon-Ra St. Brown",    nfl: "DET", pos: "WR", status: null },
    ],
  },
  {
    team: "Beastmode",
    keepers: [
      { name: "Puka Nacua",           nfl: "LAR", pos: "WR", status: "Q" },
      { name: "Josh Allen",           nfl: "BUF", pos: "QB", status: null },
      { name: "Mike Evans",           nfl: "SF",  pos: "WR", status: "Q" },
      { name: "Bijan Robinson",       nfl: "ATL", pos: "RB", status: null },
      { name: "James Cook III",       nfl: "BUF", pos: "RB", status: null },
      { name: "TreVeyon Henderson",   nfl: "NE",  pos: "RB", status: "Q" },
      { name: "Tetairoa McMillan",    nfl: "CAR", pos: "WR", status: null },
      { name: "Trey McBride",         nfl: "ARI", pos: "TE", status: null },
      { name: "RJ Harvey",            nfl: "DEN", pos: "RB", status: null },
    ],
  },
  {
    team: "Angry Ducks",
    keepers: [
      { name: "Omarion Hampton",      nfl: "LAC", pos: "RB", status: null },
      { name: "Malik Nabers",         nfl: "NYG", pos: "WR", status: "Q" },
      { name: "Brian Thomas Jr.",     nfl: "JAX", pos: "WR", status: "Q" },
      { name: "T.J. Hockenson",       nfl: "MIN", pos: "TE", status: null },
      { name: "Aaron Jones Sr.",      nfl: "MIN", pos: "RB", status: null },
      { name: "Jordan Mason",         nfl: "MIN", pos: "RB", status: null },
      { name: "Jaxon Smith-Njigba",   nfl: "SEA", pos: "WR", status: null },
    ],
  },
  {
    team: "Team Beermode",
    keepers: [
      { name: "Jahmyr Gibbs",         nfl: "DET", pos: "RB", status: null },
      { name: "Bo Nix",               nfl: "DEN", pos: "QB", status: null },
      { name: "Cam Skattebo",         nfl: "NYG", pos: "RB", status: null },
      { name: "Emeka Egbuka",         nfl: "TB",  pos: "WR", status: "Q" },
      { name: "Justin Jefferson",     nfl: "MIN", pos: "WR", status: null },
      { name: "Chris Olave",          nfl: "NO",  pos: "WR", status: "Q" },
      { name: "D'Andre Swift",        nfl: "CHI", pos: "RB", status: null },
      { name: "Kyle Pitts Sr.",       nfl: "ATL", pos: "TE", status: null },
    ],
  },
  {
    team: "Running Bisons",
    keepers: [
      { name: "Jaylen Waddle",        nfl: "DEN", pos: "WR", status: null },
      { name: "DJ Moore",             nfl: "BUF", pos: "WR", status: null },
      { name: "Bucky Irving",         nfl: "TB",  pos: "RB", status: null },
      { name: "Jaylen Warren",        nfl: "PIT", pos: "RB", status: null },
      { name: "Marvin Harrison Jr.",  nfl: "ARI", pos: "WR", status: null },
      { name: "Sam LaPorta",          nfl: "DET", pos: "TE", status: "Q" },
      { name: "Josh Downs",           nfl: "IND", pos: "WR", status: "Q" },
      { name: "Joe Burrow",           nfl: "CIN", pos: "QB", status: null },
      { name: "Christian McCaffrey",  nfl: "SF",  pos: "RB", status: "Q" },
      { name: "Jonathan Taylor",      nfl: "IND", pos: "RB", status: null },
    ],
  },
  {
    team: "The Lamartrix",
    keepers: [
      { name: "Christian Watson",     nfl: "GB",  pos: "WR", status: null },
      { name: "Lamar Jackson",        nfl: "BAL", pos: "QB", status: null },
      { name: "Josh Jacobs",          nfl: "GB",  pos: "RB", status: "Q" },
      { name: "Dalton Kincaid",       nfl: "BUF", pos: "TE", status: null },
      { name: "Javonte Williams",     nfl: "DAL", pos: "RB", status: null },
      { name: "Travis Etienne Jr.",   nfl: "NO",  pos: "RB", status: null },
      { name: "Zay Flowers",          nfl: "BAL", pos: "WR", status: "Q" },
      { name: "Ladd McConkey",        nfl: "LAC", pos: "WR", status: null },
      { name: "Jaxson Dart",          nfl: "NYG", pos: "QB", status: null },
      { name: "CeeDee Lamb",          nfl: "DAL", pos: "WR", status: null },
    ],
  },
  {
    team: "Charged UP",
    keepers: [
      { name: "Tyler Warren",         nfl: "IND", pos: "TE", status: "Q" },
      { name: "Drake London",         nfl: "ATL", pos: "WR", status: null },
      { name: "Ashton Jeanty",        nfl: "LV",  pos: "RB", status: "Q" },
      { name: "Matthew Golden",       nfl: "GB",  pos: "WR", status: null },
      { name: "Kyle Monangai",        nfl: "CHI", pos: "RB", status: "Q" },
      { name: "Rashee Rice",          nfl: "KC",  pos: "WR", status: null },
      { name: "Tee Higgins",          nfl: "CIN", pos: "WR", status: null },
      { name: "Drake Maye",           nfl: "NE",  pos: "QB", status: null },
    ],
  },
  {
    team: "London NoPuntsIntended",
    keepers: [
      { name: "Dallas Goedert",       nfl: "PHI", pos: "TE", status: null },
      { name: "Terry McLaurin",       nfl: "WSH", pos: "WR", status: null },
      { name: "Xavier Worthy",        nfl: "KC",  pos: "WR", status: "Q" },
      { name: "Kyren Williams",       nfl: "LAR", pos: "RB", status: null },
      { name: "Jalen Hurts",          nfl: "PHI", pos: "QB", status: null },
      { name: "Jordan Addison",       nfl: "MIN", pos: "WR", status: null },
      { name: "Chris Godwin Jr.",     nfl: "TB",  pos: "WR", status: null },
      { name: "Chase Brown",          nfl: "CIN", pos: "RB", status: null },
      { name: "DK Metcalf",           nfl: "PIT", pos: "WR", status: "Q" },
    ],
  },
];
