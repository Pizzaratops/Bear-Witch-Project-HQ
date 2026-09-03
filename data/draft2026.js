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

// UPDATE 03.09.2026: Draft ist gelaufen (Mi. 02.09.2026). Tatsaechlich
// wurden 16 Runden gedraftet (die vorherige Schaetzung von 15 Runden war
// vor dem Draft nur eine Annahme). Die echten Ergebnisse stehen unten in
// DRAFT_RESULTS_2026 (aus dem ESPN "Draft Recap"-Export uebernommen, Stand
// 03.09.2026) und werden von renderDraftboard() jetzt als Ground Truth
// verwendet -- die Keeper-Runden-Formel (computeKeeperRounds) dient nur
// noch der Anzeige in der Keeper-Uebersicht, nicht mehr der Berechnung
// des Draft Boards selbst.
const TOTAL_DRAFT_ROUNDS = 16;
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

// ============================================================
// DRAFT_RESULTS_2026 — Tatsaechliche Draft-Ergebnisse (ESPN Draft Recap,
// Stand 03.09.2026, Draft-Datum Mi. 02.09.2026).
// ============================================================
// Struktur: DRAFT_RESULTS_2026[round] = Array mit 12 Eintraegen, einer je
// SLOT (nicht je Team!) -- Slot-Reihenfolge entspricht exakt DRAFT_ORDER_2026
// (Index 0 = Slot 1 = urspruenglich Running Bisons, ... Index 11 = Slot 12
// = urspruenglich The Bear Witch Project). Wurde ein Pick getradet, zeigt
// "team" das TATSAECHLICH pickende Team, nicht den urspruenglichen Slot-
// Besitzer -- die Spalte im Draft Board bleibt aber beim urspruenglichen
// Slot (so bleibt die Spaltenreihenfolge stabil).
//
// null = kein Pick in diesem Slot/dieser Runde (kam in der echten Liga nur
// einmal vor: Runde 16 Slot 4 (Angry Ducks) -- Kader war da bereits voll,
// weil Angry Ducks in Runde 4 per Trade einen Zusatz-Pick bekommen hatte).
//
// Bestaetigte Picks, die vom "eigenen Slot" abweichen (= Trades, die sich
// aus dem Recap ergeben):
//  R1  Slot 1  (Running Bisons -> Bear Witch Project)      -- bekannt, siehe TRADED_PICKS_2026
//  R2  Slot 12 (Bear Witch Project -> Running Bisons)       -- bekannt
//  R4  Slot 12 (Bear Witch Project -> Angry Ducks)           -- bekannt
//  R5  Slot 11 (Team Beermode -> Beastmode)                  -- bekannt
//  R6  Slot 8  (Beastmode -> Bear Witch Project)              -- NEU, bisher nicht im Trade-Ledger (siehe trades.js)
const DRAFT_ORIGINAL_SLOT_TEAMS_2026 = DRAFT_ORDER_2026; // Alias, nur zur Lesbarkeit unten

const DRAFT_RESULTS_2026 = {
  1: [
    { team: "The Bear Witch Project",  name: "Jeremiyah Love",       nfl: "ARI", pos: "RB" },
    { team: "Burrowhead Dancers",      name: "Bhayshul Tuten",       nfl: "JAX", pos: "RB" },
    { team: "The Lamartrix",           name: "Jadarian Price",       nfl: "SEA", pos: "RB" },
    { team: "Angry Ducks",             name: "Luther Burden III",    nfl: "CHI", pos: "WR" },
    { team: "Fred Bulls",              name: "Carnell Tate",         nfl: "TEN", pos: "WR" },
    { team: "London NoPuntsIntended",  name: "Harold Fannin Jr.",    nfl: "CLE", pos: "TE" },
    { team: "Lion Cereals",            name: "Courtland Sutton",     nfl: "DEN", pos: "WR" },
    { team: "Beastmode",               name: "Parker Washington",    nfl: "JAX", pos: "WR" },
    { team: "Charged UP",              name: "MarShawn Lloyd",       nfl: "GB",  pos: "RB" },
    { team: "Vice City Crackheads",    name: "Rico Dowdle",          nfl: "PIT", pos: "RB" },
    { team: "Team Beermode",           name: "Jonathon Brooks",      nfl: "CAR", pos: "RB" },
    { team: "The Bear Witch Project",  name: "Tucker Kraft",         nfl: "GB",  pos: "TE" },
  ],
  2: [
    { team: "Running Bisons",          name: "Isaiah Likely",        nfl: "NYG", pos: "TE" },
    { team: "Burrowhead Dancers",      name: "Justin Herbert",       nfl: "LAC", pos: "QB" },
    { team: "The Lamartrix",           name: "Mark Andrews",         nfl: "BAL", pos: "TE" },
    { team: "Angry Ducks",             name: "Brock Purdy",          nfl: "SF",  pos: "QB" },
    { team: "Fred Bulls",              name: "Rachaad White",        nfl: "WSH", pos: "RB" },
    { team: "London NoPuntsIntended",  name: "Michael Wilson",       nfl: "ARI", pos: "WR" },
    { team: "Lion Cereals",            name: "Makai Lemon",          nfl: "PHI", pos: "WR" },
    { team: "Beastmode",               name: "Deebo Samuel Sr.",     nfl: "SF",  pos: "WR" },
    { team: "Charged UP",              name: "De'Zhaun Stribling",   nfl: "SF",  pos: "WR" },
    { team: "Vice City Crackheads",    name: "KC Concepcion",        nfl: "CLE", pos: "WR" },
    { team: "Team Beermode",           name: "Wan'Dale Robinson",    nfl: "TEN", pos: "WR" },
    { team: "Running Bisons",          name: "Dak Prescott",         nfl: "DAL", pos: "QB" },
  ],
  3: [
    { team: "Running Bisons",          name: "Rams D/ST",            nfl: "LAR", pos: "D/ST" },
    { team: "Burrowhead Dancers",      name: "Jayden Reed",          nfl: "GB",  pos: "WR" },
    { team: "The Lamartrix",           name: "J.K. Dobbins",         nfl: "DEN", pos: "RB" },
    { team: "Angry Ducks",             name: "Chuba Hubbard",        nfl: "CAR", pos: "RB" },
    { team: "Fred Bulls",              name: "Texans D/ST",          nfl: "HOU", pos: "D/ST" },
    { team: "London NoPuntsIntended",  name: "Jonah Coleman",        nfl: "DEN", pos: "RB" },
    { team: "Lion Cereals",            name: "Jacory Croskey-Merritt",nfl: "WSH",pos: "RB" },
    { team: "Beastmode",               name: "Travis Hunter",        nfl: "JAX", pos: "WR" },
    { team: "Charged UP",              name: "Chris Rodriguez Jr.",  nfl: "JAX", pos: "RB" },
    { team: "Vice City Crackheads",    name: "Jalen Coker",          nfl: "CAR", pos: "WR" },
    { team: "Team Beermode",           name: "Jakobi Meyers",        nfl: "JAX", pos: "WR" },
    { team: "The Bear Witch Project",  name: "Quentin Johnston",     nfl: "LAC", pos: "WR" },
  ],
  4: [
    { team: "Running Bisons",          name: "Braelon Allen",        nfl: "NYJ", pos: "RB" },
    { team: "Burrowhead Dancers",      name: "Jake Ferguson",        nfl: "DAL", pos: "TE" },
    { team: "The Lamartrix",           name: "Cameron Dicker",       nfl: "LAC", pos: "K" },
    { team: "Angry Ducks",             name: "Alec Pierce",          nfl: "IND", pos: "WR" },
    { team: "Fred Bulls",              name: "Harrison Butker",      nfl: "KC",  pos: "K" },
    { team: "London NoPuntsIntended",  name: "Dylan Sampson",        nfl: "CLE", pos: "RB" },
    { team: "Lion Cereals",            name: "Tyjae Spears",         nfl: "TEN", pos: "RB" },
    { team: "Beastmode",               name: "Jason Myers",          nfl: "SEA", pos: "K" },
    { team: "Charged UP",              name: "Woody Marks",          nfl: "HOU", pos: "RB" },
    { team: "Vice City Crackheads",    name: "Eddy Pineiro",         nfl: "SF",  pos: "K" },
    { team: "Team Beermode",           name: "Tyler Shough",         nfl: "NO",  pos: "QB" },
    { team: "Angry Ducks",             name: "Khalil Shakir",        nfl: "BUF", pos: "WR" },
  ],
  5: [
    { team: "Running Bisons",          name: "Tank Dell",            nfl: "HOU", pos: "WR" },
    { team: "Burrowhead Dancers",      name: "Broncos D/ST",         nfl: "DEN", pos: "D/ST" },
    { team: "The Lamartrix",           name: "Ravens D/ST",          nfl: "BAL", pos: "D/ST" },
    { team: "Angry Ducks",             name: "Tyler Allgeier",       nfl: "ARI", pos: "RB" },
    { team: "Fred Bulls",              name: "Jared Goff",           nfl: "DET", pos: "QB" },
    { team: "London NoPuntsIntended",  name: "Steelers D/ST",        nfl: "PIT", pos: "D/ST" },
    { team: "Lion Cereals",            name: "Calvin Ridley",        nfl: "TEN", pos: "WR" },
    { team: "Beastmode",               name: "Alvin Kamara",         nfl: "NO",  pos: "RB" },
    { team: "Charged UP",              name: "Jordyn Tyson",         nfl: "NO",  pos: "WR" },
    { team: "Vice City Crackheads",    name: "Seahawks D/ST",        nfl: "SEA", pos: "D/ST" },
    { team: "Beastmode",               name: "Lions D/ST",           nfl: "DET", pos: "D/ST" },
    { team: "The Bear Witch Project",  name: "Mike Washington Jr.",  nfl: "LV",  pos: "RB" },
  ],
  6: [
    { team: "Running Bisons",          name: "Jonathan Taylor",      nfl: "IND", pos: "RB" },
    { team: "Burrowhead Dancers",      name: "Davante Adams",        nfl: "LAR", pos: "WR" },
    { team: "The Lamartrix",           name: "Travis Etienne Jr.",   nfl: "NO",  pos: "RB" },
    { team: "Angry Ducks",             name: "Hunter Henry",         nfl: "NE",  pos: "TE" },
    { team: "Fred Bulls",              name: "Juwan Johnson",        nfl: "NO",  pos: "TE" },
    { team: "London NoPuntsIntended",  name: "Harrison Mevis",       nfl: "LAR", pos: "K" },
    { team: "Lion Cereals",            name: "Romeo Doubs",          nfl: "NE",  pos: "WR" },
    { team: "The Bear Witch Project",  name: "Keaton Mitchell",      nfl: "LAC", pos: "RB" },
    { team: "Charged UP",              name: "Chargers D/ST",        nfl: "LAC", pos: "D/ST" },
    { team: "Vice City Crackheads",    name: "Tank Bigsby",          nfl: "PHI", pos: "RB" },
    { team: "Team Beermode",           name: "Eagles D/ST",          nfl: "PHI", pos: "D/ST" },
    { team: "The Bear Witch Project",  name: "Jordan Love",          nfl: "GB",  pos: "QB" },
  ],
  7: [
    { team: "Running Bisons",          name: "Christian McCaffrey",  nfl: "SF",  pos: "RB" },
    { team: "Burrowhead Dancers",      name: "Rome Odunze",          nfl: "CHI", pos: "WR" },
    { team: "The Lamartrix",           name: "Zay Flowers",          nfl: "BAL", pos: "WR" },
    { team: "Angry Ducks",             name: "Jake Bates",           nfl: "DET", pos: "K" },
    { team: "Fred Bulls",              name: "Jalen McMillan",       nfl: "TB",  pos: "WR" },
    { team: "London NoPuntsIntended",  name: "Dallas Goedert",       nfl: "PHI", pos: "TE" },
    { team: "Lion Cereals",            name: "Patriots D/ST",        nfl: "NE",  pos: "D/ST" },
    { team: "Beastmode",               name: "Puka Nacua",           nfl: "LAR", pos: "WR" },
    { team: "Charged UP",              name: "Cam Little",           nfl: "JAX", pos: "K" },
    { team: "Vice City Crackheads",    name: "Dalton Schultz",       nfl: "HOU", pos: "TE" },
    { team: "Team Beermode",           name: "Ka'imi Fairbairn",     nfl: "HOU", pos: "K" },
    { team: "The Bear Witch Project",  name: "Emmett Johnson",       nfl: "KC",  pos: "RB" },
  ],
  8: [
    { team: "Running Bisons",          name: "Joe Burrow",           nfl: "CIN", pos: "QB" },
    { team: "Burrowhead Dancers",      name: "Rhamondre Stevenson",  nfl: "NE",  pos: "RB" },
    { team: "The Lamartrix",           name: "Ladd McConkey",        nfl: "LAC", pos: "WR" },
    { team: "Angry Ducks",             name: "Browns D/ST",          nfl: "CLE", pos: "D/ST" },
    { team: "Fred Bulls",              name: "Najee Harris",         nfl: "NYG", pos: "RB" },
    { team: "London NoPuntsIntended",  name: "Terry McLaurin",       nfl: "WSH", pos: "WR" },
    { team: "Lion Cereals",            name: "Matthew Stafford",     nfl: "LAR", pos: "QB" },
    { team: "Beastmode",               name: "Josh Allen",           nfl: "BUF", pos: "QB" },
    { team: "Charged UP",              name: "Drake Maye",           nfl: "NE",  pos: "QB" },
    { team: "Vice City Crackheads",    name: "Keenan Allen",         nfl: "IND", pos: "WR" },
    { team: "Team Beermode",           name: "Bo Nix",                nfl: "DEN", pos: "QB" },
    { team: "The Bear Witch Project",  name: "Daniel Jones",         nfl: "IND", pos: "QB" },
  ],
  9: [
    { team: "Running Bisons",          name: "Josh Downs",           nfl: "IND", pos: "WR" },
    { team: "Burrowhead Dancers",      name: "Quinshon Judkins",     nfl: "CLE", pos: "RB" },
    { team: "The Lamartrix",           name: "Jaxson Dart",          nfl: "NYG", pos: "QB" },
    { team: "Angry Ducks",             name: "Jaxon Smith-Njigba",   nfl: "SEA", pos: "WR" },
    { team: "Fred Bulls",              name: "Rashid Shaheed",       nfl: "SEA", pos: "WR" },
    { team: "London NoPuntsIntended",  name: "Xavier Worthy",        nfl: "KC",  pos: "WR" },
    { team: "Lion Cereals",            name: "A.J. Brown",           nfl: "NE",  pos: "WR" },
    { team: "Beastmode",               name: "Mike Evans",           nfl: "SF",  pos: "WR" },
    { team: "Charged UP",              name: "Tee Higgins",          nfl: "CIN", pos: "WR" },
    { team: "Vice City Crackheads",    name: "Malik Washington",     nfl: "MIA", pos: "WR" },
    { team: "Team Beermode",           name: "Emeka Egbuka",         nfl: "TB",  pos: "WR" },
    { team: "The Bear Witch Project",  name: "Chiefs D/ST",          nfl: "KC",  pos: "D/ST" },
  ],
  10: [
    { team: "Running Bisons",          name: "Sam LaPorta",          nfl: "DET", pos: "TE" },
    { team: "Burrowhead Dancers",      name: "Zach Charbonnet",      nfl: "SEA", pos: "RB" },
    { team: "The Lamartrix",           name: "CeeDee Lamb",          nfl: "DAL", pos: "WR" },
    { team: "Angry Ducks",             name: "Jordan Mason",         nfl: "MIN", pos: "RB" },
    { team: "Fred Bulls",              name: "Saquon Barkley",       nfl: "PHI", pos: "RB" },
    { team: "London NoPuntsIntended",  name: "Kyren Williams",       nfl: "LAR", pos: "RB" },
    { team: "Lion Cereals",            name: "Kyler Murray",         nfl: "MIN", pos: "QB" },
    { team: "Beastmode",               name: "Bijan Robinson",       nfl: "ATL", pos: "RB" },
    { team: "Charged UP",              name: "Rashee Rice",          nfl: "KC",  pos: "WR" },
    { team: "Vice City Crackheads",    name: "Trevor Lawrence",      nfl: "JAX", pos: "QB" },
    { team: "Team Beermode",           name: "Cam Skattebo",         nfl: "NYG", pos: "RB" },
    { team: "The Bear Witch Project",  name: "George Pickens",       nfl: "DAL", pos: "WR" },
  ],
  11: [
    { team: "Running Bisons",          name: "Marvin Harrison Jr.",  nfl: "ARI", pos: "WR" },
    { team: "Burrowhead Dancers",      name: "Kenny Gainwell",       nfl: "TB",  pos: "RB" },
    { team: "The Lamartrix",           name: "Javonte Williams",     nfl: "DAL", pos: "RB" },
    { team: "Angry Ducks",             name: "Aaron Jones Sr.",      nfl: "MIN", pos: "RB" },
    { team: "Fred Bulls",              name: "Ja'Marr Chase",        nfl: "CIN", pos: "WR" },
    { team: "London NoPuntsIntended",  name: "Jalen Hurts",          nfl: "PHI", pos: "QB" },
    { team: "Lion Cereals",            name: "Brock Bowers",         nfl: "LV",  pos: "TE" },
    { team: "Beastmode",               name: "James Cook III",       nfl: "BUF", pos: "RB" },
    { team: "Charged UP",              name: "Kyle Monangai",        nfl: "CHI", pos: "RB" },
    { team: "Vice City Crackheads",    name: "Breece Hall",          nfl: "NYJ", pos: "RB" },
    { team: "Team Beermode",           name: "Justin Jefferson",     nfl: "MIN", pos: "WR" },
    { team: "The Bear Witch Project",  name: "DeVonta Smith",        nfl: "PHI", pos: "WR" },
  ],
  12: [
    { team: "Running Bisons",          name: "Jaylen Warren",        nfl: "PIT", pos: "RB" },
    { team: "Burrowhead Dancers",      name: "Jameson Williams",     nfl: "DET", pos: "WR" },
    { team: "The Lamartrix",           name: "Dalton Kincaid",       nfl: "BUF", pos: "TE" },
    { team: "Angry Ducks",             name: "T.J. Hockenson",       nfl: "MIN", pos: "TE" },
    { team: "Fred Bulls",              name: "Travis Kelce",         nfl: "KC",  pos: "TE" },
    { team: "London NoPuntsIntended",  name: "Jordan Addison",       nfl: "MIN", pos: "WR" },
    { team: "Lion Cereals",            name: "Blake Corum",          nfl: "LAR", pos: "RB" },
    { team: "Beastmode",               name: "TreVeyon Henderson",   nfl: "NE",  pos: "RB" },
    { team: "Charged UP",              name: "Matthew Golden",       nfl: "GB",  pos: "WR" },
    { team: "Vice City Crackheads",    name: "Derrick Henry",        nfl: "BAL", pos: "RB" },
    { team: "Team Beermode",           name: "Chris Olave",          nfl: "NO",  pos: "WR" },
    { team: "The Bear Witch Project",  name: "Colston Loveland",     nfl: "CHI", pos: "TE" },
  ],
  13: [
    { team: "Running Bisons",          name: "Bucky Irving",         nfl: "TB",  pos: "RB" },
    { team: "Burrowhead Dancers",      name: "Caleb Williams",       nfl: "CHI", pos: "QB" },
    { team: "The Lamartrix",           name: "Josh Jacobs",          nfl: "GB",  pos: "RB" },
    { team: "Angry Ducks",             name: "Brian Thomas Jr.",     nfl: "JAX", pos: "WR" },
    { team: "Fred Bulls",              name: "Michael Pittman Jr.",  nfl: "PIT", pos: "WR" },
    { team: "London NoPuntsIntended",  name: "Chris Godwin Jr.",     nfl: "TB",  pos: "WR" },
    { team: "Lion Cereals",            name: "De'Von Achane",        nfl: "MIA", pos: "RB" },
    { team: "Beastmode",               name: "Tetairoa McMillan",    nfl: "CAR", pos: "WR" },
    { team: "Charged UP",              name: "Ashton Jeanty",        nfl: "LV",  pos: "RB" },
    { team: "Vice City Crackheads",    name: "George Kittle",        nfl: "SF",  pos: "TE" },
    { team: "Team Beermode",           name: "D'Andre Swift",        nfl: "CHI", pos: "RB" },
    { team: "The Bear Witch Project",  name: "Garrett Wilson",       nfl: "NYJ", pos: "WR" },
  ],
  14: [
    { team: "Running Bisons",          name: "DJ Moore",             nfl: "BUF", pos: "WR" },
    { team: "Burrowhead Dancers",      name: "Stefon Diggs",         nfl: "WSH", pos: "WR" },
    { team: "The Lamartrix",           name: "Lamar Jackson",        nfl: "BAL", pos: "QB" },
    { team: "Angry Ducks",             name: "Malik Nabers",         nfl: "NYG", pos: "WR" },
    { team: "Fred Bulls",              name: "Kenneth Walker III",   nfl: "KC",  pos: "RB" },
    { team: "London NoPuntsIntended",  name: "Chase Brown",          nfl: "CIN", pos: "RB" },
    { team: "Lion Cereals",            name: "Brandon Aubrey",       nfl: "DAL", pos: "K" },
    { team: "Beastmode",               name: "Trey McBride",         nfl: "ARI", pos: "TE" },
    { team: "Charged UP",              name: "Drake London",         nfl: "ATL", pos: "WR" },
    { team: "Vice City Crackheads",    name: "Patrick Mahomes",      nfl: "KC",  pos: "QB" },
    { team: "Team Beermode",           name: "Kyle Pitts Sr.",       nfl: "ATL", pos: "TE" },
    { team: "The Bear Witch Project",  name: "Nico Collins",         nfl: "HOU", pos: "WR" },
  ],
  15: [
    { team: "Running Bisons",          name: "Jaylen Waddle",        nfl: "DEN", pos: "WR" },
    { team: "Burrowhead Dancers",      name: "Tony Pollard",         nfl: "TEN", pos: "RB" },
    { team: "The Lamartrix",           name: "Christian Watson",     nfl: "GB",  pos: "WR" },
    { team: "Angry Ducks",             name: "Omarion Hampton",      nfl: "LAC", pos: "RB" },
    { team: "Fred Bulls",              name: "Jayden Daniels",       nfl: "WSH", pos: "QB" },
    { team: "London NoPuntsIntended",  name: "DK Metcalf",           nfl: "PIT", pos: "WR" },
    { team: "Lion Cereals",            name: "Kayshon Boutte",       nfl: "HOU", pos: "WR" },
    { team: "Beastmode",               name: "RJ Harvey",            nfl: "DEN", pos: "RB" },
    { team: "Charged UP",              name: "Tyler Warren",         nfl: "IND", pos: "TE" },
    { team: "Vice City Crackheads",    name: "Amon-Ra St. Brown",    nfl: "DET", pos: "WR" },
    { team: "Team Beermode",           name: "Jahmyr Gibbs",         nfl: "DET", pos: "RB" },
    { team: "The Bear Witch Project",  name: "David Montgomery",     nfl: "HOU", pos: "RB" },
  ],
  16: [
    { team: "Running Bisons",          name: "Tyler Loop",           nfl: "BAL", pos: "K" },
    { team: "Burrowhead Dancers",      name: "Cairo Santos",         nfl: "CHI", pos: "K" },
    { team: "The Lamartrix",           name: "Baker Mayfield",       nfl: "TB",  pos: "QB" },
    null,
    { team: "Fred Bulls",              name: "Isiah Pacheco",        nfl: "DET", pos: "RB" },
    { team: "London NoPuntsIntended",  name: "Kenyon Sadiq",         nfl: "NYJ", pos: "TE" },
    { team: "Lion Cereals",            name: "Jerry Jeudy",          nfl: "CLE", pos: "WR" },
    { team: "Beastmode",               name: "Malik Willis",         nfl: "MIA", pos: "QB" },
    { team: "Charged UP",              name: "Brian Robinson Jr.",   nfl: "ATL", pos: "RB" },
    { team: "Vice City Crackheads",    name: "James Conner",         nfl: "ARI", pos: "RB" },
    { team: "Team Beermode",           name: "Denzel Boston",        nfl: "CLE", pos: "WR" },
    { team: "The Bear Witch Project",  name: "Evan McPherson",       nfl: "CIN", pos: "K" },
  ],
};
