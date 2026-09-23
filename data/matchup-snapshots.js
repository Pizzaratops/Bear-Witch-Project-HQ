// ============================================================
//  MATCHUP_SNAPSHOTS — serverseitig gesicherte Vorab-Projektionen
// ============================================================
//  AUTO-GENERIERT von scripts/snapshot-projections.js über die GitHub
//  Action ".github/workflows/snapshot-projections.yml". Nicht von Hand
//  editieren — läuft automatisch einmal pro Woche (Mittwoch) und
//  schreibt NUR neue, noch nicht gespielte Wochen dazu. Einmal gesetzte
//  Einträge werden nie überschrieben, damit sie eine echte "vorher"-
//  Momentaufnahme bleiben.
//  Zuletzt synchronisiert: 2026-09-23T13:23:45.542Z
//
//  Struktur: MATCHUP_SNAPSHOTS[season][week][teamId] = {
//    capturedAt, lineup, mode, teamMean, starters: [{slot,name,pos,mean}]
//  }
//
//  Fallback: bevor der erste Lauf passiert ist (oder für Wochen, die er
//  noch nicht erreicht hat), nutzt die Seite ergänzend lokale Snapshots
//  aus dem Browser-localStorage (siehe js/app.js, loadMatchupSnapshot).
// ============================================================

const MATCHUP_SNAPSHOTS = {
 "2026": {
  "1": {
   "beastmode": {
    "capturedAt": "2026-09-03T20:40:25.441Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 134.6,
    "starters": [
     {
      "slot": "QB",
      "name": "Josh Allen",
      "pos": "QB",
      "mean": 21.8
     },
     {
      "slot": "RB",
      "name": "Bijan Robinson",
      "pos": "RB",
      "mean": 20.8
     },
     {
      "slot": "RB",
      "name": "James Cook III",
      "pos": "RB",
      "mean": 16.5
     },
     {
      "slot": "WR",
      "name": "Puka Nacua",
      "pos": "WR",
      "mean": 20.8
     },
     {
      "slot": "WR",
      "name": "Tetairoa McMillan",
      "pos": "WR",
      "mean": 13.9
     },
     {
      "slot": "TE",
      "name": "Trey McBride",
      "pos": "TE",
      "mean": 14.2
     },
     {
      "slot": "FLEX",
      "name": "Parker Washington",
      "pos": "WR",
      "mean": 11
     },
     {
      "slot": "DST",
      "name": "Lions D/ST",
      "pos": "DST",
      "mean": 6.4
     },
     {
      "slot": "K",
      "name": "Jason Myers",
      "pos": "K",
      "mean": 9.3
     }
    ]
   },
   "lion-cereals": {
    "capturedAt": "2026-09-03T20:40:25.453Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 109.8,
    "starters": [
     {
      "slot": "QB",
      "name": "Matthew Stafford",
      "pos": "QB",
      "mean": 17.2
     },
     {
      "slot": "RB",
      "name": "De'Von Achane",
      "pos": "RB",
      "mean": 17.3
     },
     {
      "slot": "RB",
      "name": "Blake Corum",
      "pos": "RB",
      "mean": 9.4
     },
     {
      "slot": "WR",
      "name": "A.J. Brown",
      "pos": "WR",
      "mean": 14.7
     },
     {
      "slot": "WR",
      "name": "Courtland Sutton",
      "pos": "WR",
      "mean": 12
     },
     {
      "slot": "TE",
      "name": "Brock Bowers",
      "pos": "TE",
      "mean": 14.2
     },
     {
      "slot": "FLEX",
      "name": "Tyjae Spears",
      "pos": "RB",
      "mean": 9.1
     },
     {
      "slot": "DST",
      "name": "Patriots D/ST",
      "pos": "DST",
      "mean": 5.9
     },
     {
      "slot": "K",
      "name": "Brandon Aubrey",
      "pos": "K",
      "mean": 10.1
     }
    ]
   },
   "vice-city-crackheads": {
    "capturedAt": "2026-09-03T20:40:25.453Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 116.5,
    "starters": [
     {
      "slot": "QB",
      "name": "Trevor Lawrence",
      "pos": "QB",
      "mean": 17
     },
     {
      "slot": "RB",
      "name": "Derrick Henry",
      "pos": "RB",
      "mean": 16.3
     },
     {
      "slot": "RB",
      "name": "Breece Hall",
      "pos": "RB",
      "mean": 16.1
     },
     {
      "slot": "WR",
      "name": "Amon-Ra St. Brown",
      "pos": "WR",
      "mean": 19.1
     },
     {
      "slot": "WR",
      "name": "KC Concepcion",
      "pos": "WR",
      "mean": 9.2
     },
     {
      "slot": "TE",
      "name": "George Kittle",
      "pos": "TE",
      "mean": 11.4
     },
     {
      "slot": "FLEX",
      "name": "Rico Dowdle",
      "pos": "RB",
      "mean": 11.1
     },
     {
      "slot": "DST",
      "name": "Seahawks D/ST",
      "pos": "DST",
      "mean": 7.2
     },
     {
      "slot": "K",
      "name": "Eddy Pineiro",
      "pos": "K",
      "mean": 9.1
     }
    ]
   },
   "charged-up": {
    "capturedAt": "2026-09-03T20:40:25.458Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 113.8,
    "starters": [
     {
      "slot": "QB",
      "name": "Drake Maye",
      "pos": "QB",
      "mean": 18.8
     },
     {
      "slot": "RB",
      "name": "Ashton Jeanty",
      "pos": "RB",
      "mean": 16.4
     },
     {
      "slot": "RB",
      "name": "MarShawn Lloyd",
      "pos": "RB",
      "mean": 7.9
     },
     {
      "slot": "WR",
      "name": "Drake London",
      "pos": "WR",
      "mean": 15.9
     },
     {
      "slot": "WR",
      "name": "Rashee Rice",
      "pos": "WR",
      "mean": 15.3
     },
     {
      "slot": "TE",
      "name": "Tyler Warren",
      "pos": "TE",
      "mean": 12.4
     },
     {
      "slot": "FLEX",
      "name": "Tee Higgins",
      "pos": "WR",
      "mean": 12.9
     },
     {
      "slot": "DST",
      "name": "Chargers D/ST",
      "pos": "DST",
      "mean": 5.6
     },
     {
      "slot": "K",
      "name": "Cam Little",
      "pos": "K",
      "mean": 8.6
     }
    ]
   },
   "burrowhead-dancers": {
    "capturedAt": "2026-09-03T20:40:25.458Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 105.1,
    "starters": [
     {
      "slot": "QB",
      "name": "Justin Herbert",
      "pos": "QB",
      "mean": 16.7
     },
     {
      "slot": "RB",
      "name": "Quinshon Judkins",
      "pos": "RB",
      "mean": 13.3
     },
     {
      "slot": "RB",
      "name": "Rhamondre Stevenson",
      "pos": "RB",
      "mean": 12
     },
     {
      "slot": "WR",
      "name": "Davante Adams",
      "pos": "WR",
      "mean": 13.7
     },
     {
      "slot": "WR",
      "name": "Rome Odunze",
      "pos": "WR",
      "mean": 12.6
     },
     {
      "slot": "TE",
      "name": "Jake Ferguson",
      "pos": "TE",
      "mean": 9.8
     },
     {
      "slot": "FLEX",
      "name": "Tony Pollard",
      "pos": "RB",
      "mean": 10.9
     },
     {
      "slot": "DST",
      "name": "Broncos D/ST",
      "pos": "DST",
      "mean": 7.7
     },
     {
      "slot": "K",
      "name": "Cairo Santos",
      "pos": "K",
      "mean": 8.5
     }
    ]
   },
   "fred-bulls": {
    "capturedAt": "2026-09-03T20:40:25.458Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 120.9,
    "starters": [
     {
      "slot": "QB",
      "name": "Jayden Daniels",
      "pos": "QB",
      "mean": 18.7
     },
     {
      "slot": "RB",
      "name": "Saquon Barkley",
      "pos": "RB",
      "mean": 16.1
     },
     {
      "slot": "RB",
      "name": "Kenneth Walker III",
      "pos": "RB",
      "mean": 16.1
     },
     {
      "slot": "WR",
      "name": "Ja'Marr Chase",
      "pos": "WR",
      "mean": 19.8
     },
     {
      "slot": "WR",
      "name": "Carnell Tate",
      "pos": "WR",
      "mean": 11.9
     },
     {
      "slot": "TE",
      "name": "Travis Kelce",
      "pos": "TE",
      "mean": 10.4
     },
     {
      "slot": "FLEX",
      "name": "Michael Pittman Jr.",
      "pos": "WR",
      "mean": 11.6
     },
     {
      "slot": "DST",
      "name": "Texans D/ST",
      "pos": "DST",
      "mean": 7.6
     },
     {
      "slot": "K",
      "name": "Harrison Butker",
      "pos": "K",
      "mean": 8.8
     }
    ]
   },
   "team-beermode": {
    "capturedAt": "2026-09-03T20:40:25.459Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 124.3,
    "starters": [
     {
      "slot": "QB",
      "name": "Bo Nix",
      "pos": "QB",
      "mean": 17.4
     },
     {
      "slot": "RB",
      "name": "Jahmyr Gibbs",
      "pos": "RB",
      "mean": 21.5
     },
     {
      "slot": "RB",
      "name": "Cam Skattebo",
      "pos": "RB",
      "mean": 13.4
     },
     {
      "slot": "WR",
      "name": "Justin Jefferson",
      "pos": "WR",
      "mean": 17.3
     },
     {
      "slot": "WR",
      "name": "Chris Olave",
      "pos": "WR",
      "mean": 14.7
     },
     {
      "slot": "TE",
      "name": "Kyle Pitts Sr.",
      "pos": "TE",
      "mean": 10.9
     },
     {
      "slot": "FLEX",
      "name": "Emeka Egbuka",
      "pos": "WR",
      "mean": 13.5
     },
     {
      "slot": "DST",
      "name": "Eagles D/ST",
      "pos": "DST",
      "mean": 6.3
     },
     {
      "slot": "K",
      "name": "Ka'imi Fairbairn",
      "pos": "K",
      "mean": 9.3
     }
    ]
   },
   "london-nopunts": {
    "capturedAt": "2026-09-03T20:40:25.459Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 108.5,
    "starters": [
     {
      "slot": "QB",
      "name": "Jalen Hurts",
      "pos": "QB",
      "mean": 18.8
     },
     {
      "slot": "RB",
      "name": "Chase Brown",
      "pos": "RB",
      "mean": 16
     },
     {
      "slot": "RB",
      "name": "Kyren Williams",
      "pos": "RB",
      "mean": 13.6
     },
     {
      "slot": "WR",
      "name": "Terry McLaurin",
      "pos": "WR",
      "mean": 12.8
     },
     {
      "slot": "WR",
      "name": "Xavier Worthy",
      "pos": "WR",
      "mean": 10.2
     },
     {
      "slot": "TE",
      "name": "Dallas Goedert",
      "pos": "TE",
      "mean": 10.4
     },
     {
      "slot": "FLEX",
      "name": "Jordan Addison",
      "pos": "WR",
      "mean": 10.1
     },
     {
      "slot": "DST",
      "name": "Steelers D/ST",
      "pos": "DST",
      "mean": 7.2
     },
     {
      "slot": "K",
      "name": "Harrison Mevis",
      "pos": "K",
      "mean": 9.4
     }
    ]
   },
   "bear-witch-project": {
    "capturedAt": "2026-09-03T20:40:25.459Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 113.3,
    "starters": [
     {
      "slot": "QB",
      "name": "Jordan Love",
      "pos": "QB",
      "mean": 15.5
     },
     {
      "slot": "RB",
      "name": "Jeremiyah Love",
      "pos": "RB",
      "mean": 16.3
     },
     {
      "slot": "RB",
      "name": "David Montgomery",
      "pos": "RB",
      "mean": 11.7
     },
     {
      "slot": "WR",
      "name": "Garrett Wilson",
      "pos": "WR",
      "mean": 14.7
     },
     {
      "slot": "WR",
      "name": "Nico Collins",
      "pos": "WR",
      "mean": 14.6
     },
     {
      "slot": "TE",
      "name": "Colston Loveland",
      "pos": "TE",
      "mean": 12.2
     },
     {
      "slot": "FLEX",
      "name": "DeVonta Smith",
      "pos": "WR",
      "mean": 14.1
     },
     {
      "slot": "DST",
      "name": "Chiefs D/ST",
      "pos": "DST",
      "mean": 5.9
     },
     {
      "slot": "K",
      "name": "Evan McPherson",
      "pos": "K",
      "mean": 8.3
     }
    ]
   },
   "running-bisons": {
    "capturedAt": "2026-09-03T20:40:25.459Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 119.9,
    "starters": [
     {
      "slot": "QB",
      "name": "Joe Burrow",
      "pos": "QB",
      "mean": 17.9
     },
     {
      "slot": "RB",
      "name": "Christian McCaffrey",
      "pos": "RB",
      "mean": 20.1
     },
     {
      "slot": "RB",
      "name": "Jonathan Taylor",
      "pos": "RB",
      "mean": 18.6
     },
     {
      "slot": "WR",
      "name": "Jaylen Waddle",
      "pos": "WR",
      "mean": 12.5
     },
     {
      "slot": "WR",
      "name": "DJ Moore",
      "pos": "WR",
      "mean": 12.3
     },
     {
      "slot": "TE",
      "name": "Sam LaPorta",
      "pos": "TE",
      "mean": 11.1
     },
     {
      "slot": "FLEX",
      "name": "Marvin Harrison Jr.",
      "pos": "WR",
      "mean": 11.4
     },
     {
      "slot": "DST",
      "name": "Rams D/ST",
      "pos": "DST",
      "mean": 7.3
     },
     {
      "slot": "K",
      "name": "Tyler Loop",
      "pos": "K",
      "mean": 8.6
     }
    ]
   },
   "the-lamartrix": {
    "capturedAt": "2026-09-03T20:40:25.459Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 119.6,
    "starters": [
     {
      "slot": "QB",
      "name": "Lamar Jackson",
      "pos": "QB",
      "mean": 19
     },
     {
      "slot": "RB",
      "name": "Javonte Williams",
      "pos": "RB",
      "mean": 15.3
     },
     {
      "slot": "RB",
      "name": "Travis Etienne Jr.",
      "pos": "RB",
      "mean": 14.5
     },
     {
      "slot": "WR",
      "name": "CeeDee Lamb",
      "pos": "WR",
      "mean": 17.3
     },
     {
      "slot": "WR",
      "name": "Zay Flowers",
      "pos": "WR",
      "mean": 14
     },
     {
      "slot": "TE",
      "name": "Mark Andrews",
      "pos": "TE",
      "mean": 9.9
     },
     {
      "slot": "FLEX",
      "name": "Ladd McConkey",
      "pos": "WR",
      "mean": 13
     },
     {
      "slot": "DST",
      "name": "Ravens D/ST",
      "pos": "DST",
      "mean": 7.1
     },
     {
      "slot": "K",
      "name": "Cameron Dicker",
      "pos": "K",
      "mean": 9.5
     }
    ]
   },
   "angry-ducks": {
    "capturedAt": "2026-09-03T20:40:25.459Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 104.6,
    "starters": [
     {
      "slot": "QB",
      "name": "Brock Purdy",
      "pos": "QB",
      "mean": 17.2
     },
     {
      "slot": "RB",
      "name": "Aaron Jones Sr.",
      "pos": "RB",
      "mean": 10.5
     },
     {
      "slot": "RB",
      "name": "Jordan Mason",
      "pos": "RB",
      "mean": 8.9
     },
     {
      "slot": "WR",
      "name": "Jaxon Smith-Njigba",
      "pos": "WR",
      "mean": 19.2
     },
     {
      "slot": "WR",
      "name": "Malik Nabers",
      "pos": "WR",
      "mean": 14.3
     },
     {
      "slot": "TE",
      "name": "T.J. Hockenson",
      "pos": "TE",
      "mean": 9.3
     },
     {
      "slot": "FLEX",
      "name": "Brian Thomas Jr.",
      "pos": "WR",
      "mean": 10.4
     },
     {
      "slot": "DST",
      "name": "Browns D/ST",
      "pos": "DST",
      "mean": 6.1
     },
     {
      "slot": "K",
      "name": "Jake Bates",
      "pos": "K",
      "mean": 8.6
     }
    ]
   }
  },
  "2": {
   "lion-cereals": {
    "capturedAt": "2026-09-15T11:55:11.989Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 99.8,
    "starters": [
     {
      "slot": "QB",
      "name": "Matthew Stafford",
      "pos": "QB",
      "mean": 17.8
     },
     {
      "slot": "RB",
      "name": "De'Von Achane",
      "pos": "RB",
      "mean": 17.2
     },
     {
      "slot": "RB",
      "name": "Blake Corum",
      "pos": "RB",
      "mean": 9.3
     },
     {
      "slot": "WR",
      "name": "Courtland Sutton",
      "pos": "WR",
      "mean": 12
     },
     {
      "slot": "WR",
      "name": "A.J. Brown",
      "pos": "WR",
      "mean": 10.4
     },
     {
      "slot": "TE",
      "name": "Pat Freiermuth",
      "pos": "TE",
      "mean": 8
     },
     {
      "slot": "FLEX",
      "name": "Tyjae Spears",
      "pos": "RB",
      "mean": 9.1
     },
     {
      "slot": "DST",
      "name": "Patriots D/ST",
      "pos": "DST",
      "mean": 6
     },
     {
      "slot": "K",
      "name": "Brandon Aubrey",
      "pos": "K",
      "mean": 10.1
     }
    ]
   },
   "charged-up": {
    "capturedAt": "2026-09-15T11:55:11.990Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 113.9,
    "starters": [
     {
      "slot": "QB",
      "name": "Drake Maye",
      "pos": "QB",
      "mean": 19.4
     },
     {
      "slot": "RB",
      "name": "Ashton Jeanty",
      "pos": "RB",
      "mean": 16.4
     },
     {
      "slot": "RB",
      "name": "MarShawn Lloyd",
      "pos": "RB",
      "mean": 8
     },
     {
      "slot": "WR",
      "name": "Drake London",
      "pos": "WR",
      "mean": 15.4
     },
     {
      "slot": "WR",
      "name": "Rashee Rice",
      "pos": "WR",
      "mean": 15.3
     },
     {
      "slot": "TE",
      "name": "Tyler Warren",
      "pos": "TE",
      "mean": 12.4
     },
     {
      "slot": "FLEX",
      "name": "Tee Higgins",
      "pos": "WR",
      "mean": 12.9
     },
     {
      "slot": "DST",
      "name": "Chargers D/ST",
      "pos": "DST",
      "mean": 5.5
     },
     {
      "slot": "K",
      "name": "Cam Little",
      "pos": "K",
      "mean": 8.6
     }
    ]
   },
   "fred-bulls": {
    "capturedAt": "2026-09-15T11:55:11.990Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 121.6,
    "starters": [
     {
      "slot": "QB",
      "name": "Jayden Daniels",
      "pos": "QB",
      "mean": 19.3
     },
     {
      "slot": "RB",
      "name": "Kenneth Walker III",
      "pos": "RB",
      "mean": 16.1
     },
     {
      "slot": "RB",
      "name": "Saquon Barkley",
      "pos": "RB",
      "mean": 16.1
     },
     {
      "slot": "WR",
      "name": "Ja'Marr Chase",
      "pos": "WR",
      "mean": 19.8
     },
     {
      "slot": "WR",
      "name": "Carnell Tate",
      "pos": "WR",
      "mean": 11.9
     },
     {
      "slot": "TE",
      "name": "Travis Kelce",
      "pos": "TE",
      "mean": 10.5
     },
     {
      "slot": "FLEX",
      "name": "Michael Pittman Jr.",
      "pos": "WR",
      "mean": 11.6
     },
     {
      "slot": "DST",
      "name": "Texans D/ST",
      "pos": "DST",
      "mean": 7.7
     },
     {
      "slot": "K",
      "name": "Harrison Butker",
      "pos": "K",
      "mean": 8.8
     }
    ]
   },
   "beastmode": {
    "capturedAt": "2026-09-15T11:55:11.990Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 134.8,
    "starters": [
     {
      "slot": "QB",
      "name": "Josh Allen",
      "pos": "QB",
      "mean": 22.3
     },
     {
      "slot": "RB",
      "name": "Bijan Robinson",
      "pos": "RB",
      "mean": 20.4
     },
     {
      "slot": "RB",
      "name": "James Cook III",
      "pos": "RB",
      "mean": 16.5
     },
     {
      "slot": "WR",
      "name": "Puka Nacua",
      "pos": "WR",
      "mean": 20.8
     },
     {
      "slot": "WR",
      "name": "Tetairoa McMillan",
      "pos": "WR",
      "mean": 13.9
     },
     {
      "slot": "TE",
      "name": "Trey McBride",
      "pos": "TE",
      "mean": 14.3
     },
     {
      "slot": "FLEX",
      "name": "Parker Washington",
      "pos": "WR",
      "mean": 11
     },
     {
      "slot": "DST",
      "name": "Lions D/ST",
      "pos": "DST",
      "mean": 6.4
     },
     {
      "slot": "K",
      "name": "Jason Myers",
      "pos": "K",
      "mean": 9.3
     }
    ]
   },
   "london-nopunts": {
    "capturedAt": "2026-09-15T11:55:11.990Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 111.7,
    "starters": [
     {
      "slot": "QB",
      "name": "Jalen Hurts",
      "pos": "QB",
      "mean": 19.4
     },
     {
      "slot": "RB",
      "name": "Chase Brown",
      "pos": "RB",
      "mean": 16
     },
     {
      "slot": "RB",
      "name": "Kyren Williams",
      "pos": "RB",
      "mean": 13.8
     },
     {
      "slot": "WR",
      "name": "Terry McLaurin",
      "pos": "WR",
      "mean": 12.8
     },
     {
      "slot": "WR",
      "name": "DK Metcalf",
      "pos": "WR",
      "mean": 11.5
     },
     {
      "slot": "TE",
      "name": "Harold Fannin Jr.",
      "pos": "TE",
      "mean": 11.1
     },
     {
      "slot": "FLEX",
      "name": "Michael Wilson",
      "pos": "WR",
      "mean": 10.4
     },
     {
      "slot": "DST",
      "name": "Steelers D/ST",
      "pos": "DST",
      "mean": 7.4
     },
     {
      "slot": "K",
      "name": "Harrison Mevis",
      "pos": "K",
      "mean": 9.4
     }
    ]
   },
   "vice-city-crackheads": {
    "capturedAt": "2026-09-15T11:55:11.990Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 116.3,
    "starters": [
     {
      "slot": "QB",
      "name": "Trevor Lawrence",
      "pos": "QB",
      "mean": 17.6
     },
     {
      "slot": "RB",
      "name": "Derrick Henry",
      "pos": "RB",
      "mean": 16.3
     },
     {
      "slot": "RB",
      "name": "Breece Hall",
      "pos": "RB",
      "mean": 16.2
     },
     {
      "slot": "WR",
      "name": "Amon-Ra St. Brown",
      "pos": "WR",
      "mean": 19.1
     },
     {
      "slot": "WR",
      "name": "KC Concepcion",
      "pos": "WR",
      "mean": 9.2
     },
     {
      "slot": "TE",
      "name": "George Kittle",
      "pos": "TE",
      "mean": 10.7
     },
     {
      "slot": "FLEX",
      "name": "Rico Dowdle",
      "pos": "RB",
      "mean": 11.1
     },
     {
      "slot": "DST",
      "name": "Seahawks D/ST",
      "pos": "DST",
      "mean": 7
     },
     {
      "slot": "K",
      "name": "Eddy Pineiro",
      "pos": "K",
      "mean": 9.1
     }
    ]
   },
   "running-bisons": {
    "capturedAt": "2026-09-15T11:55:11.990Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 118.2,
    "starters": [
     {
      "slot": "QB",
      "name": "Joe Burrow",
      "pos": "QB",
      "mean": 18.5
     },
     {
      "slot": "RB",
      "name": "Christian McCaffrey",
      "pos": "RB",
      "mean": 19.2
     },
     {
      "slot": "RB",
      "name": "Jonathan Taylor",
      "pos": "RB",
      "mean": 18.6
     },
     {
      "slot": "WR",
      "name": "Jaylen Waddle",
      "pos": "WR",
      "mean": 12.6
     },
     {
      "slot": "WR",
      "name": "DJ Moore",
      "pos": "WR",
      "mean": 12.2
     },
     {
      "slot": "TE",
      "name": "Isaiah Likely",
      "pos": "TE",
      "mean": 9.2
     },
     {
      "slot": "FLEX",
      "name": "Bucky Irving",
      "pos": "RB",
      "mean": 12.2
     },
     {
      "slot": "DST",
      "name": "Rams D/ST",
      "pos": "DST",
      "mean": 7.1
     },
     {
      "slot": "K",
      "name": "Tyler Loop",
      "pos": "K",
      "mean": 8.6
     }
    ]
   },
   "burrowhead-dancers": {
    "capturedAt": "2026-09-15T11:55:11.990Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 107.8,
    "starters": [
     {
      "slot": "QB",
      "name": "Justin Herbert",
      "pos": "QB",
      "mean": 17.2
     },
     {
      "slot": "RB",
      "name": "Rhamondre Stevenson",
      "pos": "RB",
      "mean": 14.1
     },
     {
      "slot": "RB",
      "name": "Quinshon Judkins",
      "pos": "RB",
      "mean": 13.3
     },
     {
      "slot": "WR",
      "name": "Davante Adams",
      "pos": "WR",
      "mean": 13.7
     },
     {
      "slot": "WR",
      "name": "Rome Odunze",
      "pos": "WR",
      "mean": 12.5
     },
     {
      "slot": "TE",
      "name": "Jake Ferguson",
      "pos": "TE",
      "mean": 9.8
     },
     {
      "slot": "FLEX",
      "name": "Tony Pollard",
      "pos": "RB",
      "mean": 10.9
     },
     {
      "slot": "DST",
      "name": "Broncos D/ST",
      "pos": "DST",
      "mean": 7.7
     },
     {
      "slot": "K",
      "name": "Cairo Santos",
      "pos": "K",
      "mean": 8.5
     }
    ]
   },
   "angry-ducks": {
    "capturedAt": "2026-09-15T11:55:11.990Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 113.3,
    "starters": [
     {
      "slot": "QB",
      "name": "Brock Purdy",
      "pos": "QB",
      "mean": 17.7
     },
     {
      "slot": "RB",
      "name": "Omarion Hampton",
      "pos": "RB",
      "mean": 15.4
     },
     {
      "slot": "RB",
      "name": "Aaron Jones Sr.",
      "pos": "RB",
      "mean": 10.6
     },
     {
      "slot": "WR",
      "name": "Jaxon Smith-Njigba",
      "pos": "WR",
      "mean": 19.1
     },
     {
      "slot": "WR",
      "name": "Malik Nabers",
      "pos": "WR",
      "mean": 14.3
     },
     {
      "slot": "TE",
      "name": "T.J. Hockenson",
      "pos": "TE",
      "mean": 9.3
     },
     {
      "slot": "FLEX",
      "name": "Luther Burden III",
      "pos": "WR",
      "mean": 12.1
     },
     {
      "slot": "DST",
      "name": "Browns D/ST",
      "pos": "DST",
      "mean": 6.1
     },
     {
      "slot": "K",
      "name": "Jake Bates",
      "pos": "K",
      "mean": 8.6
     }
    ]
   },
   "team-beermode": {
    "capturedAt": "2026-09-15T11:55:11.991Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 123.8,
    "starters": [
     {
      "slot": "QB",
      "name": "Bo Nix",
      "pos": "QB",
      "mean": 18
     },
     {
      "slot": "RB",
      "name": "Jahmyr Gibbs",
      "pos": "RB",
      "mean": 21.9
     },
     {
      "slot": "RB",
      "name": "D'Andre Swift",
      "pos": "RB",
      "mean": 12.3
     },
     {
      "slot": "WR",
      "name": "Justin Jefferson",
      "pos": "WR",
      "mean": 17.3
     },
     {
      "slot": "WR",
      "name": "Chris Olave",
      "pos": "WR",
      "mean": 14.7
     },
     {
      "slot": "TE",
      "name": "Kyle Pitts Sr.",
      "pos": "TE",
      "mean": 10.6
     },
     {
      "slot": "FLEX",
      "name": "Emeka Egbuka",
      "pos": "WR",
      "mean": 13.4
     },
     {
      "slot": "DST",
      "name": "Eagles D/ST",
      "pos": "DST",
      "mean": 6.3
     },
     {
      "slot": "K",
      "name": "Ka'imi Fairbairn",
      "pos": "K",
      "mean": 9.3
     }
    ]
   },
   "the-lamartrix": {
    "capturedAt": "2026-09-15T11:55:11.991Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 120.1,
    "starters": [
     {
      "slot": "QB",
      "name": "Lamar Jackson",
      "pos": "QB",
      "mean": 19.5
     },
     {
      "slot": "RB",
      "name": "Javonte Williams",
      "pos": "RB",
      "mean": 15.4
     },
     {
      "slot": "RB",
      "name": "Travis Etienne Jr.",
      "pos": "RB",
      "mean": 14.4
     },
     {
      "slot": "WR",
      "name": "CeeDee Lamb",
      "pos": "WR",
      "mean": 17.3
     },
     {
      "slot": "WR",
      "name": "Zay Flowers",
      "pos": "WR",
      "mean": 14
     },
     {
      "slot": "TE",
      "name": "Mark Andrews",
      "pos": "TE",
      "mean": 9.9
     },
     {
      "slot": "FLEX",
      "name": "Ladd McConkey",
      "pos": "WR",
      "mean": 13
     },
     {
      "slot": "DST",
      "name": "Ravens D/ST",
      "pos": "DST",
      "mean": 7
     },
     {
      "slot": "K",
      "name": "Cameron Dicker",
      "pos": "K",
      "mean": 9.5
     }
    ]
   },
   "bear-witch-project": {
    "capturedAt": "2026-09-15T11:55:11.991Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 111.8,
    "starters": [
     {
      "slot": "QB",
      "name": "Jordan Love",
      "pos": "QB",
      "mean": 15.9
     },
     {
      "slot": "RB",
      "name": "Jeremiyah Love",
      "pos": "RB",
      "mean": 16.3
     },
     {
      "slot": "RB",
      "name": "David Montgomery",
      "pos": "RB",
      "mean": 11.8
     },
     {
      "slot": "WR",
      "name": "Nico Collins",
      "pos": "WR",
      "mean": 14.7
     },
     {
      "slot": "WR",
      "name": "George Pickens",
      "pos": "WR",
      "mean": 14.1
     },
     {
      "slot": "TE",
      "name": "Colston Loveland",
      "pos": "TE",
      "mean": 12.1
     },
     {
      "slot": "FLEX",
      "name": "DeVonta Smith",
      "pos": "WR",
      "mean": 14.1
     },
     {
      "slot": "DST",
      "name": "Jaguars D/ST",
      "pos": "DST",
      "mean": 4.5
     },
     {
      "slot": "K",
      "name": "Evan McPherson",
      "pos": "K",
      "mean": 8.3
     }
    ]
   }
  },
  "3": {
   "fred-bulls": {
    "capturedAt": "2026-09-23T13:23:45.534Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 107.2,
    "starters": [
     {
      "slot": "QB",
      "name": "Jayden Daniels",
      "pos": "QB",
      "mean": 14
     },
     {
      "slot": "RB",
      "name": "Kenneth Walker III",
      "pos": "RB",
      "mean": 21.9
     },
     {
      "slot": "RB",
      "name": "Saquon Barkley",
      "pos": "RB",
      "mean": 11.3
     },
     {
      "slot": "WR",
      "name": "Ja'Marr Chase",
      "pos": "WR",
      "mean": 16.5
     },
     {
      "slot": "WR",
      "name": "Carnell Tate",
      "pos": "WR",
      "mean": 8.9
     },
     {
      "slot": "TE",
      "name": "Travis Kelce",
      "pos": "TE",
      "mean": 13.6
     },
     {
      "slot": "FLEX",
      "name": "Rashid Shaheed",
      "pos": "WR",
      "mean": 7.3
     },
     {
      "slot": "DST",
      "name": "Texans D/ST",
      "pos": "DST",
      "mean": 4.4
     },
     {
      "slot": "K",
      "name": "Harrison Butker",
      "pos": "K",
      "mean": 9.2
     }
    ]
   },
   "lion-cereals": {
    "capturedAt": "2026-09-23T13:23:45.535Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 87.4,
    "starters": [
     {
      "slot": "QB",
      "name": "Matthew Stafford",
      "pos": "QB",
      "mean": 15.6
     },
     {
      "slot": "RB",
      "name": "De'Von Achane",
      "pos": "RB",
      "mean": 14.9
     },
     {
      "slot": "RB",
      "name": "Tyjae Spears",
      "pos": "RB",
      "mean": 7.8
     },
     {
      "slot": "WR",
      "name": "Devaughn Vele",
      "pos": "WR",
      "mean": 8.1
     },
     {
      "slot": "WR",
      "name": "Courtland Sutton",
      "pos": "WR",
      "mean": 7.6
     },
     {
      "slot": "TE",
      "name": "Pat Freiermuth",
      "pos": "TE",
      "mean": 8.9
     },
     {
      "slot": "FLEX",
      "name": "Romeo Doubs",
      "pos": "WR",
      "mean": 7.1
     },
     {
      "slot": "DST",
      "name": "Patriots D/ST",
      "pos": "DST",
      "mean": 8.6
     },
     {
      "slot": "K",
      "name": "Brandon Aubrey",
      "pos": "K",
      "mean": 8.9
     }
    ]
   },
   "charged-up": {
    "capturedAt": "2026-09-23T13:23:45.535Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 99.6,
    "starters": [
     {
      "slot": "QB",
      "name": "Drake Maye",
      "pos": "QB",
      "mean": 13.7
     },
     {
      "slot": "RB",
      "name": "Ashton Jeanty",
      "pos": "RB",
      "mean": 18.2
     },
     {
      "slot": "RB",
      "name": "Kyle Monangai",
      "pos": "RB",
      "mean": 10.2
     },
     {
      "slot": "WR",
      "name": "Tee Higgins",
      "pos": "WR",
      "mean": 11.8
     },
     {
      "slot": "WR",
      "name": "Rashee Rice",
      "pos": "WR",
      "mean": 11
     },
     {
      "slot": "TE",
      "name": "Tyler Warren",
      "pos": "TE",
      "mean": 11.3
     },
     {
      "slot": "FLEX",
      "name": "Matthew Golden",
      "pos": "WR",
      "mean": 10.9
     },
     {
      "slot": "DST",
      "name": "Chiefs D/ST",
      "pos": "DST",
      "mean": 4.2
     },
     {
      "slot": "K",
      "name": "Cam Little",
      "pos": "K",
      "mean": 8.3
     }
    ]
   },
   "london-nopunts": {
    "capturedAt": "2026-09-23T13:23:45.535Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 96.2,
    "starters": [
     {
      "slot": "QB",
      "name": "Jalen Hurts",
      "pos": "QB",
      "mean": 18.4
     },
     {
      "slot": "RB",
      "name": "Chase Brown",
      "pos": "RB",
      "mean": 15.3
     },
     {
      "slot": "RB",
      "name": "Kyren Williams",
      "pos": "RB",
      "mean": 13.4
     },
     {
      "slot": "WR",
      "name": "Xavier Worthy",
      "pos": "WR",
      "mean": 9.5
     },
     {
      "slot": "WR",
      "name": "DK Metcalf",
      "pos": "WR",
      "mean": 8.8
     },
     {
      "slot": "TE",
      "name": "Harold Fannin Jr.",
      "pos": "TE",
      "mean": 7.9
     },
     {
      "slot": "FLEX",
      "name": "Terry McLaurin",
      "pos": "WR",
      "mean": 8.5
     },
     {
      "slot": "DST",
      "name": "Steelers D/ST",
      "pos": "DST",
      "mean": 8.9
     },
     {
      "slot": "K",
      "name": "Harrison Mevis",
      "pos": "K",
      "mean": 5.5
     }
    ]
   },
   "beastmode": {
    "capturedAt": "2026-09-23T13:23:45.535Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 133.6,
    "starters": [
     {
      "slot": "QB",
      "name": "Josh Allen",
      "pos": "QB",
      "mean": 27.4
     },
     {
      "slot": "RB",
      "name": "Bijan Robinson",
      "pos": "RB",
      "mean": 19.1
     },
     {
      "slot": "RB",
      "name": "James Cook III",
      "pos": "RB",
      "mean": 15
     },
     {
      "slot": "WR",
      "name": "Parker Washington",
      "pos": "WR",
      "mean": 15.3
     },
     {
      "slot": "WR",
      "name": "Puka Nacua",
      "pos": "WR",
      "mean": 13.6
     },
     {
      "slot": "TE",
      "name": "Trey McBride",
      "pos": "TE",
      "mean": 17.3
     },
     {
      "slot": "FLEX",
      "name": "Tetairoa McMillan",
      "pos": "WR",
      "mean": 12.8
     },
     {
      "slot": "DST",
      "name": "49ers D/ST",
      "pos": "DST",
      "mean": 5.4
     },
     {
      "slot": "K",
      "name": "Jason Myers",
      "pos": "K",
      "mean": 7.7
     }
    ]
   },
   "running-bisons": {
    "capturedAt": "2026-09-23T13:23:45.535Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 120.5,
    "starters": [
     {
      "slot": "QB",
      "name": "Dak Prescott",
      "pos": "QB",
      "mean": 18.3
     },
     {
      "slot": "RB",
      "name": "Jonathan Taylor",
      "pos": "RB",
      "mean": 22.2
     },
     {
      "slot": "RB",
      "name": "Christian McCaffrey",
      "pos": "RB",
      "mean": 17.6
     },
     {
      "slot": "WR",
      "name": "Jaylen Waddle",
      "pos": "WR",
      "mean": 11.6
     },
     {
      "slot": "WR",
      "name": "Josh Downs",
      "pos": "WR",
      "mean": 9.4
     },
     {
      "slot": "TE",
      "name": "Sam LaPorta",
      "pos": "TE",
      "mean": 11.5
     },
     {
      "slot": "FLEX",
      "name": "Bucky Irving",
      "pos": "RB",
      "mean": 15.4
     },
     {
      "slot": "DST",
      "name": "Rams D/ST",
      "pos": "DST",
      "mean": 6.1
     },
     {
      "slot": "K",
      "name": "Tyler Loop",
      "pos": "K",
      "mean": 8.4
     }
    ]
   },
   "vice-city-crackheads": {
    "capturedAt": "2026-09-23T13:23:45.535Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 134.7,
    "starters": [
     {
      "slot": "QB",
      "name": "Patrick Mahomes",
      "pos": "QB",
      "mean": 19.8
     },
     {
      "slot": "RB",
      "name": "Derrick Henry",
      "pos": "RB",
      "mean": 20
     },
     {
      "slot": "RB",
      "name": "Breece Hall",
      "pos": "RB",
      "mean": 15.3
     },
     {
      "slot": "WR",
      "name": "Amon-Ra St. Brown",
      "pos": "WR",
      "mean": 23.6
     },
     {
      "slot": "WR",
      "name": "Jalen Coker",
      "pos": "WR",
      "mean": 17.2
     },
     {
      "slot": "TE",
      "name": "Dalton Schultz",
      "pos": "TE",
      "mean": 11.6
     },
     {
      "slot": "FLEX",
      "name": "George Kittle",
      "pos": "TE",
      "mean": 10.7
     },
     {
      "slot": "DST",
      "name": "Seahawks D/ST",
      "pos": "DST",
      "mean": 8.6
     },
     {
      "slot": "K",
      "name": "Eddy Pineiro",
      "pos": "K",
      "mean": 7.9
     }
    ]
   },
   "angry-ducks": {
    "capturedAt": "2026-09-23T13:23:45.536Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 107,
    "starters": [
     {
      "slot": "QB",
      "name": "Brock Purdy",
      "pos": "QB",
      "mean": 19.9
     },
     {
      "slot": "RB",
      "name": "Omarion Hampton",
      "pos": "RB",
      "mean": 12.9
     },
     {
      "slot": "RB",
      "name": "Aaron Jones Sr.",
      "pos": "RB",
      "mean": 10.2
     },
     {
      "slot": "WR",
      "name": "Jaxon Smith-Njigba",
      "pos": "WR",
      "mean": 24.5
     },
     {
      "slot": "WR",
      "name": "Malik Nabers",
      "pos": "WR",
      "mean": 10.4
     },
     {
      "slot": "TE",
      "name": "T.J. Hockenson",
      "pos": "TE",
      "mean": 8.8
     },
     {
      "slot": "FLEX",
      "name": "Luther Burden III",
      "pos": "WR",
      "mean": 9.3
     },
     {
      "slot": "DST",
      "name": "Browns D/ST",
      "pos": "DST",
      "mean": 3.6
     },
     {
      "slot": "K",
      "name": "Jake Bates",
      "pos": "K",
      "mean": 7.4
     }
    ]
   },
   "burrowhead-dancers": {
    "capturedAt": "2026-09-23T13:23:45.536Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 85.4,
    "starters": [
     {
      "slot": "QB",
      "name": "Justin Herbert",
      "pos": "QB",
      "mean": 12.6
     },
     {
      "slot": "RB",
      "name": "Rhamondre Stevenson",
      "pos": "RB",
      "mean": 10.1
     },
     {
      "slot": "RB",
      "name": "Quinshon Judkins",
      "pos": "RB",
      "mean": 10
     },
     {
      "slot": "WR",
      "name": "Davante Adams",
      "pos": "WR",
      "mean": 16.7
     },
     {
      "slot": "WR",
      "name": "Rome Odunze",
      "pos": "WR",
      "mean": 8.4
     },
     {
      "slot": "TE",
      "name": "Jake Ferguson",
      "pos": "TE",
      "mean": 9.2
     },
     {
      "slot": "FLEX",
      "name": "Tony Pollard",
      "pos": "RB",
      "mean": 7.8
     },
     {
      "slot": "DST",
      "name": "Chargers D/ST",
      "pos": "DST",
      "mean": 3
     },
     {
      "slot": "K",
      "name": "Cairo Santos",
      "pos": "K",
      "mean": 7.5
     }
    ]
   },
   "the-lamartrix": {
    "capturedAt": "2026-09-23T13:23:45.537Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 111.1,
    "starters": [
     {
      "slot": "QB",
      "name": "Lamar Jackson",
      "pos": "QB",
      "mean": 19
     },
     {
      "slot": "RB",
      "name": "Javonte Williams",
      "pos": "RB",
      "mean": 14.8
     },
     {
      "slot": "RB",
      "name": "Jadarian Price",
      "pos": "RB",
      "mean": 8.4
     },
     {
      "slot": "WR",
      "name": "CeeDee Lamb",
      "pos": "WR",
      "mean": 19.3
     },
     {
      "slot": "WR",
      "name": "Christian Watson",
      "pos": "WR",
      "mean": 16.6
     },
     {
      "slot": "TE",
      "name": "Mark Andrews",
      "pos": "TE",
      "mean": 9.2
     },
     {
      "slot": "FLEX",
      "name": "Ladd McConkey",
      "pos": "WR",
      "mean": 11.9
     },
     {
      "slot": "DST",
      "name": "Ravens D/ST",
      "pos": "DST",
      "mean": 6.5
     },
     {
      "slot": "K",
      "name": "Cameron Dicker",
      "pos": "K",
      "mean": 5.3
     }
    ]
   },
   "team-beermode": {
    "capturedAt": "2026-09-23T13:23:45.537Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 126,
    "starters": [
     {
      "slot": "QB",
      "name": "Tyler Shough",
      "pos": "QB",
      "mean": 18.7
     },
     {
      "slot": "RB",
      "name": "Jahmyr Gibbs",
      "pos": "RB",
      "mean": 24.8
     },
     {
      "slot": "RB",
      "name": "D'Andre Swift",
      "pos": "RB",
      "mean": 16
     },
     {
      "slot": "WR",
      "name": "Chris Olave",
      "pos": "WR",
      "mean": 18.6
     },
     {
      "slot": "WR",
      "name": "Justin Jefferson",
      "pos": "WR",
      "mean": 17.8
     },
     {
      "slot": "TE",
      "name": "Kyle Pitts Sr.",
      "pos": "TE",
      "mean": 5.7
     },
     {
      "slot": "FLEX",
      "name": "Cam Skattebo",
      "pos": "RB",
      "mean": 11.3
     },
     {
      "slot": "DST",
      "name": "Eagles D/ST",
      "pos": "DST",
      "mean": 5.1
     },
     {
      "slot": "K",
      "name": "Ka'imi Fairbairn",
      "pos": "K",
      "mean": 7.9
     }
    ]
   },
   "bear-witch-project": {
    "capturedAt": "2026-09-23T13:23:45.537Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 102.6,
    "starters": [
     {
      "slot": "QB",
      "name": "Bryce Young",
      "pos": "QB",
      "mean": 17.2
     },
     {
      "slot": "RB",
      "name": "David Montgomery",
      "pos": "RB",
      "mean": 12.9
     },
     {
      "slot": "RB",
      "name": "Jeremiyah Love",
      "pos": "RB",
      "mean": 11.2
     },
     {
      "slot": "WR",
      "name": "DeVonta Smith",
      "pos": "WR",
      "mean": 15.4
     },
     {
      "slot": "WR",
      "name": "Garrett Wilson",
      "pos": "WR",
      "mean": 13.8
     },
     {
      "slot": "TE",
      "name": "Colston Loveland",
      "pos": "TE",
      "mean": 5.5
     },
     {
      "slot": "FLEX",
      "name": "George Pickens",
      "pos": "WR",
      "mean": 10.5
     },
     {
      "slot": "DST",
      "name": "Jaguars D/ST",
      "pos": "DST",
      "mean": 5.6
     },
     {
      "slot": "K",
      "name": "Evan McPherson",
      "pos": "K",
      "mean": 10.7
     }
    ]
   }
  }
 }
};
