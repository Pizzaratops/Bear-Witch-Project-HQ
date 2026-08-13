// ============================================================
//  LEAGUE_HISTORY — vergangene Saisons, manuell gepflegt
// ============================================================
//  ESPN liefert uns keine Historie vor dieser Saison in unserer API-
//  Anbindung, deshalb hier von Hand nachtragen. Format pro Saison:
//  { year, champion, runnerUp, thirdPlace, notes }
//  Leere/unbekannte Felder einfach als "" lassen.
//
//  Einfach unten neue Eintraege ergaenzen, sobald ihr die Ergebnisse
//  aus fruaheren Saisons zusammengetragen habt.
// ============================================================

const LEAGUE_HISTORY = [
  {
    year: 2018,
    champion: "Beastmode",
    runnerUp: "",
    thirdPlace: "",
    notes: "1. Saison der Liga. Champion-Owner: Marvin (\"Beastquake\") — spielt bis heute unter dem Teamnamen Beastmode. Keine weiteren Detaildaten mehr vorhanden (Regular Season, Vize, Dritter unbekannt).",
  },
  {
    year: 2019,
    champion: "Crackheads Robster",
    runnerUp: "Carolina Beastmode",
    thirdPlace: "Seksuelle BelPandas",
    notes: "Champion-Owner: Rob Pa. Finale Rob vs. Marv (LeMarv James) — Carolina Beastmode ging mit 12-1 klar bestem Regular-Season-Rekord in die Playoffs, verlor aber das Finale gegen Crackheads Robster (6-7).",
  },
  {
    year: 2020,
    champion: "The skinnyfats Ogi",
    runnerUp: "Fred Bulls",
    thirdPlace: "Carolina Beastmode",
    notes: "Champion-Owner: Oguzhan Dinler (Ogi) — 1. Titel für Ogi. Auch bester Regular-Season-Rekord (9-3).",
  },
  {
    year: 2021,
    champion: "The Skinnyfats",
    runnerUp: "HST JeopardyJansen",
    thirdPlace: "Fred Bulls",
    notes: "Champion-Owner: Oguzhan Dinler (Ogi) — 2. Titel in Folge. Regular Season nur Platz 5 (8-6), Team Beermode hatte die beste Bilanz (9-5).",
  },
  {
    year: 2022,
    champion: "Fred Bulls",
    runnerUp: "Fried Chicken",
    thirdPlace: "Team Beermode",
    notes: "Champion-Owner: Fred Newman — 1. Titel für Fred Bulls.",
  },
  {
    year: 2023,
    champion: "The Skinnyfats",
    runnerUp: "Team Beermode",
    thirdPlace: "The Bear Witch Project",
    notes: "Champion-Owner: Oguzhan Dinler (Ogi) — 3. Titel insgesamt (2020, 2021, 2023). The Bear Witch Project (Kong Power) auf Platz 3, trotz bestem Punktedifferential (+20.9) der Liga.",
  },
  {
    year: 2024,
    champion: "Bad Mother Tucker",
    runnerUp: "Charged UP",
    thirdPlace: "The Bear Witch Project",
    notes: "Champion-Owner: Jan Schattschneider. Bad Mother Tucker und The Bear Witch Project teilten sich mit je 10-4 die beste Regular-Season-Bilanz — im Finale setzte sich Jan durch.",
  },
  {
    year: 2025,
    champion: "The Bear Witch Project",
    runnerUp: "London NoPuntsIntended",
    thirdPlace: "Beastmode",
    notes: "Champion-Owner: Kong Power (\"ICH ENDLICH\" 🏆) — erster Titel! Dominante Saison: bestes Regular-Season-Ergebnis der Liga-Geschichte (13-1, .929) und danach auch die Playoffs geholt. Die Double-Krone.",
  },
];
