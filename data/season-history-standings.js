// ============================================================
//  SEASON_HISTORY_STANDINGS — Regular-Season-Endplatzierungen
// ============================================================
//  Manuell aus den Regular-Season-Standings-Screenshots (2019-2025)
//  uebertragen. Teamnamen wie sie IM JEWEILIGEN JAHR hiessen -- keine
//  automatische Umbenennungs-Zuordnung (z.B. "The skinnyfats Ogi" 2020
//  vs. "The Skinnyfats" ab 2021 stehen bewusst als eigene Zeilen, da
//  wir nicht sicher wissen, ob/wie sich Franchises umbenannt haben).
//  Falls ihr wisst, welche Franchise wer ist, sagt Bescheid, dann bauen
//  wir eine Zuordnungstabelle fuer echte Kontinuitaet ueber die Jahre.
//
//  2018 fehlt (keine Detaildaten mehr vorhanden, siehe data/league-history.js).
// ============================================================

const SEASON_HISTORY_STANDINGS = [
  {
    year: 2019,
    standings: [
      { team: "Carolina Beastmode",   rank: 1,  record: "12-1-0" },
      { team: "Seksuelle BelPandas",  rank: 2,  record: "9-4-0" },
      { team: "Team Beermode",        rank: 3,  record: "8-5-0" },
      { team: "Team Kong",            rank: 4,  record: "6-7-0" },
      { team: "Team Schapo",          rank: 5,  record: "6-7-0" },
      { team: "Crackheads Robster",   rank: 6,  record: "6-7-0" },
      { team: "Fried Chicken",        rank: 7,  record: "5-8-0" },
      { team: "Universe Dancebears",  rank: 8,  record: "5-8-0" },
      { team: "Hairy Potatoes",       rank: 9,  record: "4-9-0" },
      { team: "The skinnyfats Ogi",   rank: 10, record: "4-9-0" },
    ],
  },
  {
    year: 2020,
    standings: [
      { team: "The skinnyfats Ogi",   rank: 1, record: "9-3-0" },
      { team: "Carolina Beastmode",   rank: 2, record: "8-3-0" },
      { team: "Fred Bulls",           rank: 3, record: "7-4-0" },
      { team: "Downtown Crackheads",  rank: 4, record: "7-5-0" },
      { team: "Universe Dancebears",  rank: 5, record: "7-5-0" },
      { team: "Fried Chicken",        rank: 6, record: "4-8-0" },
      { team: "Team Beermode",        rank: 7, record: "4-8-0" },
      { team: "Kenora Tackles",       rank: 8, record: "3-8-0" },
      { team: "Team Schapo",          rank: 9, record: "3-8-0" },
    ],
  },
  {
    year: 2021,
    standings: [
      { team: "Team Beermode",         rank: 1,  record: "9-5-0" },
      { team: "HST JeopardyJansen",    rank: 2,  record: "9-5-0" },
      { team: "Fried Chicken",         rank: 3,  record: "9-5-0" },
      { team: "London NoPuntsIntended",rank: 4,  record: "9-5-0" },
      { team: "The Skinnyfats",        rank: 5,  record: "8-6-0" },
      { team: "Fred Bulls",            rank: 6,  record: "8-6-0" },
      { team: "Charged UP",            rank: 7,  record: "8-6-0" },
      { team: "Downtown Crackheads",   rank: 8,  record: "7-7-0" },
      { team: "Universe Dancebears",   rank: 9,  record: "6-8-0" },
      { team: "Carolina Beastmode",    rank: 10, record: "6-8-0" },
      { team: "Angry Ducks",           rank: 11, record: "3-11-0" },
      { team: "The Bear Witch Project",rank: 12, record: "2-12-0" },
    ],
  },
  {
    year: 2022,
    standings: [
      { team: "Charged UP",            rank: 1,  record: "11-3-0" },
      { team: "Team Beermode",         rank: 2,  record: "11-3-0" },
      { team: "Fred Bulls",            rank: 3,  record: "9-5-0" },
      { team: "Vice City Crackheads",  rank: 4,  record: "9-5-0" },
      { team: "The Bear Witch Project",rank: 5,  record: "7-7-0" },
      { team: "Universe Dancebears",   rank: 6,  record: "7-7-0" },
      { team: "The Skinnyfats",        rank: 7,  record: "6-8-0" },
      { team: "Fried Chicken",         rank: 8,  record: "6-8-0" },
      { team: "London NoPuntsIntended",rank: 9,  record: "5-9-0" },
      { team: "Angry Ducks",           rank: 10, record: "5-9-0" },
      { team: "Carolina Beastmode",    rank: 11, record: "4-10-0" },
      { team: "Bad Mother Tucker",     rank: 12, record: "4-10-0" },
    ],
  },
  {
    year: 2023,
    standings: [
      { team: "Fred Bulls",            rank: 1,  record: "11-3-0" },
      { team: "Charged UP",            rank: 2,  record: "10-4-0" },
      { team: "The Bear Witch Project",rank: 3,  record: "9-5-0" },
      { team: "Vice City Crackheads",  rank: 4,  record: "8-6-0" },
      { team: "Team Beermode",         rank: 5,  record: "8-6-0" },
      { team: "Bad Mother Tucker",     rank: 6,  record: "8-6-0" },
      { team: "The Skinnyfats",        rank: 7,  record: "8-6-0" },
      { team: "Beastmode",             rank: 8,  record: "7-7-0" },
      { team: "Angry Ducks",           rank: 9,  record: "6-8-0" },
      { team: "London NoPuntsIntended",rank: 10, record: "5-9-0" },
      { team: "Fried Chicken",         rank: 11, record: "3-11-0" },
      { team: "Burrowhead Dancers",    rank: 12, record: "1-13-0" },
    ],
  },
  {
    year: 2024,
    standings: [
      { team: "Bad Mother Tucker",     rank: 1,  record: "10-4-0" },
      { team: "The Bear Witch Project",rank: 2,  record: "10-4-0" },
      { team: "Team Beermode",         rank: 3,  record: "9-5-0" },
      { team: "The Skinnyfats",        rank: 4,  record: "9-5-0" },
      { team: "Beastmode",             rank: 5,  record: "8-5-1" },
      { team: "Charged UP",            rank: 6,  record: "8-6-0" },
      { team: "Fred Bulls",            rank: 7,  record: "8-6-0" },
      { team: "London NoPuntsIntended",rank: 8,  record: "7-6-1" },
      { team: "Vice City Crackheads",  rank: 9,  record: "6-8-0" },
      { team: "Lion Cereals",          rank: 10, record: "3-11-0" },
      { team: "Angry Ducks",           rank: 11, record: "3-11-0" },
      { team: "Burrowhead Dancers",    rank: 12, record: "2-12-0" },
    ],
  },
  {
    year: 2025,
    standings: [
      { team: "The Bear Witch Project",rank: 1,  record: "13-1-0" },
      { team: "Team Beermode",         rank: 2,  record: "9-5-0" },
      { team: "Vice City Crackheads",  rank: 3,  record: "9-5-0" },
      { team: "Charged UP",            rank: 4,  record: "8-6-0" },
      { team: "Beastmode",             rank: 5,  record: "8-6-0" },
      { team: "Lion Cereals",          rank: 6,  record: "7-7-0" },
      { team: "London NoPuntsIntended",rank: 7,  record: "7-7-0" },
      { team: "Fred Bulls",            rank: 8,  record: "6-8-0" },
      { team: "Angry Ducks",           rank: 9,  record: "5-9-0" },
      { team: "The Lamartrix",         rank: 10, record: "5-9-0" },
      { team: "Burrowhead Dancers",    rank: 11, record: "4-10-0" },
      { team: "The Skinnyfats",        rank: 12, record: "3-11-0" },
    ],
  },
];

// ============================================================
//  TEAM_NAME_ALIASES — Franchise-Kontinuitaet ueber Umbenennungen
// ============================================================
//  Bildet alte Teamnamen auf den kanonischen (aktuellen bzw. neuesten
//  bekannten) Namen ab, damit ein Team trotz Umbenennung als EINE Zeile
//  im Regular-Season-Finish-Verlauf erscheint.
//
//  Komplette Owner-Zuordnung vom Liga-Owner direkt bestaetigt (13.08.2026):
//  Freddy, Jan, Felix, Kong Power (Liga-Owner), Dennis, Robin, Ogi,
//  Marvin, Stefan, Kai, Georg, Daniel, Kevin, Bot.
// ============================================================

const TEAM_NAME_ALIASES = {
  // Freddy
  "Seksuelle BelPandas":    { canonical: "Fred Bulls", source: "confirmed-user" },

  // Jan Schattschneider
  "HST JeopardyJansen":     { canonical: "The Lamartrix", source: "confirmed-user" },
  "Bad Mother Tucker":      { canonical: "The Lamartrix", source: "confirmed-user" },

  // Kong Power (Liga-Owner)
  "Team Kong":              { canonical: "The Bear Witch Project", source: "confirmed-user" },
  "Kenora Tackles":         { canonical: "The Bear Witch Project", source: "confirmed-user" },

  // Robin
  "Crackheads Robster":     { canonical: "Vice City Crackheads", source: "confirmed-user" },
  "Downtown Crackheads":    { canonical: "Vice City Crackheads", source: "confirmed-user" },

  // Ogi (Oguzhan Dinler) -- letzter bekannter Name "The Skinnyfats", kein
  // aktuelles Liga-Team unter den 12; vermutlich nicht mehr in der Liga.
  "The skinnyfats Ogi":     { canonical: "The Skinnyfats", source: "confirmed-user" },

  // Marvin
  "Carolina Beastmode":     { canonical: "Beastmode", source: "confirmed-user" },

  // Stefan
  "Team Schapo":            { canonical: "Angry Ducks", source: "confirmed-user" },

  // Georg
  "Universe Dancebears":    { canonical: "Burrowhead Dancers", source: "confirmed-user" },

  // Kai (Fried Chicken) und Bot (Hairy Potatoes): keine Fortsetzung unter
  // den aktuellen 12 Teams bekannt -- vermutlich aus der Liga ausgeschieden,
  // bewusst nicht gemappt.
};

function resolveTeamFranchise(name) {
  const alias = TEAM_NAME_ALIASES[name];
  return alias ? alias.canonical : name;
}
