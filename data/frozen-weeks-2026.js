// ============================================================
//  FROZEN_WEEKS_2026 -- eingefrorene Wochen (NICHT automatisch)
// ============================================================
//  Am 23.09.2026 wurde der Draft auf ESPN zurueckgesetzt. ESPN startet
//  die Saison dadurch neu ab Woche 3 -- die Ergebnisse von Woche 1 und 2
//  existieren auf ESPN nicht mehr.
//
//  Diese Datei ist die feste Quelle fuer W1/W2. Alle Sync-Scripts
//  (weekly-scores, player-stats, fantasy-position-score, rosters,
//  status-report) lesen sie ueber scripts/lib/frozen-weeks.js und
//  ueberschreiben diese Wochen NIE mit ESPN-Daten. Alles ab W3 wird
//  normal von ESPN synchronisiert und auf W1/W2 draufaddiert.
//
//  Von Hand gepflegt. Nur aendern, wenn ein Ergebnis korrigiert werden muss.
// ============================================================

const FROZEN_WEEKS_2026 = {
 "season": 2026,
 "weeks": [
  1,
  2
 ],
 "reason": "ESPN-Draft-Reset am 23.09.2026 -- ESPN kennt W1/W2 nicht mehr. Diese Werte sind die offiziellen Ergebnisse und zaehlen fuer Standings, Playoffs und Draft-Reihenfolge.",
 "frozenAt": "2026-09-23",
 "scores": {
  "1": [
   {
    "teamId": "beastmode",
    "points": 155.56,
    "opponentId": "lion-cereals",
    "opponentPoints": 57.8
   },
   {
    "teamId": "lion-cereals",
    "points": 57.8,
    "opponentId": "beastmode",
    "opponentPoints": 155.56
   },
   {
    "teamId": "vice-city-crackheads",
    "points": 149,
    "opponentId": "charged-up",
    "opponentPoints": 92.82
   },
   {
    "teamId": "charged-up",
    "points": 92.82,
    "opponentId": "vice-city-crackheads",
    "opponentPoints": 149
   },
   {
    "teamId": "burrowhead-dancers",
    "points": 68.56,
    "opponentId": "fred-bulls",
    "opponentPoints": 93.66
   },
   {
    "teamId": "fred-bulls",
    "points": 93.66,
    "opponentId": "burrowhead-dancers",
    "opponentPoints": 68.56
   },
   {
    "teamId": "team-beermode",
    "points": 137.84,
    "opponentId": "london-nopunts",
    "opponentPoints": 105.12
   },
   {
    "teamId": "london-nopunts",
    "points": 105.12,
    "opponentId": "team-beermode",
    "opponentPoints": 137.84
   },
   {
    "teamId": "bear-witch-project",
    "points": 129.68,
    "opponentId": "running-bisons",
    "opponentPoints": 104.36
   },
   {
    "teamId": "running-bisons",
    "points": 104.36,
    "opponentId": "bear-witch-project",
    "opponentPoints": 129.68
   },
   {
    "teamId": "the-lamartrix",
    "points": 143.46,
    "opponentId": "angry-ducks",
    "opponentPoints": 107.6
   },
   {
    "teamId": "angry-ducks",
    "points": 107.6,
    "opponentId": "the-lamartrix",
    "opponentPoints": 143.46
   }
  ],
  "2": [
   {
    "teamId": "lion-cereals",
    "points": 117.98,
    "opponentId": "charged-up",
    "opponentPoints": 85.12
   },
   {
    "teamId": "charged-up",
    "points": 85.12,
    "opponentId": "lion-cereals",
    "opponentPoints": 117.98
   },
   {
    "teamId": "fred-bulls",
    "points": 128.74,
    "opponentId": "beastmode",
    "opponentPoints": 142.22
   },
   {
    "teamId": "beastmode",
    "points": 142.22,
    "opponentId": "fred-bulls",
    "opponentPoints": 128.74
   },
   {
    "teamId": "london-nopunts",
    "points": 91.66,
    "opponentId": "vice-city-crackheads",
    "opponentPoints": 150.08
   },
   {
    "teamId": "vice-city-crackheads",
    "points": 150.08,
    "opponentId": "london-nopunts",
    "opponentPoints": 91.66
   },
   {
    "teamId": "running-bisons",
    "points": 140.56,
    "opponentId": "burrowhead-dancers",
    "opponentPoints": 103.88
   },
   {
    "teamId": "burrowhead-dancers",
    "points": 103.88,
    "opponentId": "running-bisons",
    "opponentPoints": 140.56
   },
   {
    "teamId": "angry-ducks",
    "points": 124.18,
    "opponentId": "team-beermode",
    "opponentPoints": 104.22
   },
   {
    "teamId": "team-beermode",
    "points": 104.22,
    "opponentId": "angry-ducks",
    "opponentPoints": 124.18
   },
   {
    "teamId": "the-lamartrix",
    "points": 100.6,
    "opponentId": "bear-witch-project",
    "opponentPoints": 94.4
   },
   {
    "teamId": "bear-witch-project",
    "points": 94.4,
    "opponentId": "the-lamartrix",
    "opponentPoints": 100.6
   }
  ]
 },
 "schedule": {
  "1": [
   {
    "home": "beastmode",
    "away": "lion-cereals"
   },
   {
    "home": "vice-city-crackheads",
    "away": "charged-up"
   },
   {
    "home": "burrowhead-dancers",
    "away": "fred-bulls"
   },
   {
    "home": "team-beermode",
    "away": "london-nopunts"
   },
   {
    "home": "bear-witch-project",
    "away": "running-bisons"
   },
   {
    "home": "the-lamartrix",
    "away": "angry-ducks"
   }
  ],
  "2": [
   {
    "home": "lion-cereals",
    "away": "charged-up"
   },
   {
    "home": "fred-bulls",
    "away": "beastmode"
   },
   {
    "home": "london-nopunts",
    "away": "vice-city-crackheads"
   },
   {
    "home": "running-bisons",
    "away": "burrowhead-dancers"
   },
   {
    "home": "angry-ducks",
    "away": "team-beermode"
   },
   {
    "home": "the-lamartrix",
    "away": "bear-witch-project"
   }
  ]
 },
 "positionPoints": {
  "1": {
   "bear-witch-project": {
    "qbPts": 19.48,
    "rbPts": 41.9,
    "wrPts": 35.3,
    "tePts": 0
   },
   "burrowhead-dancers": {
    "qbPts": 13.26,
    "rbPts": 25.9,
    "wrPts": 12.8,
    "tePts": 2.6
   },
   "fred-bulls": {
    "qbPts": 17.66,
    "rbPts": 43.1,
    "wrPts": 19.8,
    "tePts": 10.1
   },
   "lion-cereals": {
    "qbPts": 4.1,
    "rbPts": 20.4,
    "wrPts": 8.7,
    "tePts": 15.6
   },
   "vice-city-crackheads": {
    "qbPts": 26.1,
    "rbPts": 59.2,
    "wrPts": 36.5,
    "tePts": 3.2
   },
   "beastmode": {
    "qbPts": 35.66,
    "rbPts": 41.2,
    "wrPts": 42.2,
    "tePts": 24.5
   },
   "angry-ducks": {
    "qbPts": 21.1,
    "rbPts": 18.3,
    "wrPts": 48.6,
    "tePts": 13.6
   },
   "team-beermode": {
    "qbPts": 5.44,
    "rbPts": 47.7,
    "wrPts": 70.7,
    "tePts": 0
   },
   "running-bisons": {
    "qbPts": 14.16,
    "rbPts": 38.9,
    "wrPts": 26.5,
    "tePts": 9.8
   },
   "the-lamartrix": {
    "qbPts": 24.96,
    "rbPts": 39,
    "wrPts": 60.6,
    "tePts": 8.9
   },
   "charged-up": {
    "qbPts": 9.82,
    "rbPts": 36.4,
    "wrPts": 24.3,
    "tePts": 10.3
   },
   "london-nopunts": {
    "qbPts": 24.72,
    "rbPts": 34.3,
    "wrPts": 22,
    "tePts": 4.1
   }
  },
  "2": {
   "bear-witch-project": {
    "qbPts": 13.8,
    "rbPts": 11.9,
    "wrPts": 54.4,
    "tePts": 1.3
   },
   "burrowhead-dancers": {
    "qbPts": 7.88,
    "rbPts": 20.9,
    "wrPts": 46.8,
    "tePts": 20.3
   },
   "fred-bulls": {
    "qbPts": 14.74,
    "rbPts": 26.8,
    "wrPts": 39.1,
    "tePts": 25.1
   },
   "lion-cereals": {
    "qbPts": 26.98,
    "rbPts": 18.1,
    "wrPts": 29.5,
    "tePts": 7.4
   },
   "vice-city-crackheads": {
    "qbPts": 28.98,
    "rbPts": 38.3,
    "wrPts": 49.8,
    "tePts": 18
   },
   "beastmode": {
    "qbPts": 40.82,
    "rbPts": 32,
    "wrPts": 40.3,
    "tePts": 18.1
   },
   "angry-ducks": {
    "qbPts": 28.48,
    "rbPts": 28,
    "wrPts": 49.8,
    "tePts": 5.9
   },
   "team-beermode": {
    "qbPts": 14.12,
    "rbPts": 36.2,
    "wrPts": 41.4,
    "tePts": 2.5
   },
   "running-bisons": {
    "qbPts": 29.76,
    "rbPts": 64.8,
    "wrPts": 21.7,
    "tePts": 8.3
   },
   "the-lamartrix": {
    "qbPts": 14.8,
    "rbPts": 13,
    "wrPts": 55.9,
    "tePts": 10.9
   },
   "charged-up": {
    "qbPts": 8.02,
    "rbPts": 18.1,
    "wrPts": 36.6,
    "tePts": 14.4
   },
   "london-nopunts": {
    "qbPts": 16.16,
    "rbPts": 26.9,
    "wrPts": 27.2,
    "tePts": 10.4
   }
  }
 },
 "playerWeeklyPoints": {
  "Josh Allen": {
   "pos": "QB",
   "team": "BUF",
   "weeklyPoints": {
    "1": 35.7,
    "2": 40.8
   }
  },
  "Jaxon Smith-Njigba": {
   "pos": "WR",
   "team": "SEA",
   "weeklyPoints": {
    "1": 26.2,
    "2": 42.5
   }
  },
  "Amon-Ra St. Brown": {
   "pos": "WR",
   "team": "DET",
   "weeklyPoints": {
    "1": 28.7,
    "2": 35.2
   }
  },
  "Kenneth Walker III": {
   "pos": "RB",
   "team": "KC",
   "weeklyPoints": {
    "1": 34.1,
    "2": 23.8
   }
  },
  "Jahmyr Gibbs": {
   "pos": "RB",
   "team": "DET",
   "weeklyPoints": {
    "1": 33.6,
    "2": 23.3
   }
  },
  "Jonathan Taylor": {
   "pos": "RB",
   "team": "IND",
   "weeklyPoints": {
    "1": 25.1,
    "2": 29.2
   }
  },
  "Derrick Henry": {
   "pos": "RB",
   "team": "BAL",
   "weeklyPoints": {
    "1": 35.3,
    "2": 17.7
   }
  },
  "Chris Olave": {
   "pos": "WR",
   "team": "NO",
   "weeklyPoints": {
    "1": 28.2,
    "2": 22.6
   }
  },
  "Patrick Mahomes": {
   "pos": "QB",
   "team": "KC",
   "weeklyPoints": {
    "1": 21.7,
    "2": 29
   }
  },
  "CeeDee Lamb": {
   "pos": "WR",
   "team": "DAL",
   "weeklyPoints": {
    "1": 15.4,
    "2": 35.3
   }
  },
  "Brock Purdy": {
   "pos": "QB",
   "team": "SF",
   "weeklyPoints": {
    "1": 21.1,
    "2": 28.5
   }
  },
  "Jalen Coker": {
   "pos": "WR",
   "team": "CAR",
   "weeklyPoints": {
    "1": 33.8,
    "2": 14.6
   }
  },
  "Christian Watson": {
   "pos": "WR",
   "team": "GB",
   "weeklyPoints": {
    "1": 32.7,
    "2": 14.1
   }
  },
  "Jared Goff": {
   "pos": "QB",
   "team": "DET",
   "weeklyPoints": {
    "1": 16.4,
    "2": 29.8
   }
  },
  "Tyler Shough": {
   "pos": "QB",
   "team": "NO",
   "weeklyPoints": {
    "1": 23.2,
    "2": 22.4
   }
  },
  "D'Andre Swift": {
   "pos": "RB",
   "team": "CHI",
   "weeklyPoints": {
    "1": 32.4,
    "2": 12.9
   }
  },
  "Davante Adams": {
   "pos": "WR",
   "team": "LAR",
   "weeklyPoints": {
    "1": 5.6,
    "2": 39.5
   }
  },
  "Caleb Williams": {
   "pos": "QB",
   "team": "CHI",
   "weeklyPoints": {
    "1": 37.3,
    "2": 7.7
   }
  },
  "Dak Prescott": {
   "pos": "QB",
   "team": "DAL",
   "weeklyPoints": {
    "1": 14.4,
    "2": 29.8
   }
  },
  "Ashton Jeanty": {
   "pos": "RB",
   "team": "LV",
   "weeklyPoints": {
    "1": 32.7,
    "2": 10.3
   }
  },
  "Trey McBride": {
   "pos": "TE",
   "team": "ARI",
   "weeklyPoints": {
    "1": 24.5,
    "2": 18.1
   }
  },
  "Bijan Robinson": {
   "pos": "RB",
   "team": "ATL",
   "weeklyPoints": {
    "1": 31.3,
    "2": 11.1
   }
  },
  "Jalen Hurts": {
   "pos": "QB",
   "team": "PHI",
   "weeklyPoints": {
    "1": 24.7,
    "2": 16.2
   }
  },
  "Dalton Kincaid": {
   "pos": "TE",
   "team": "BUF",
   "weeklyPoints": {
    "1": 18,
    "2": 22.5
   }
  },
  "Lamar Jackson": {
   "pos": "QB",
   "team": "BAL",
   "weeklyPoints": {
    "1": 25,
    "2": 14.8
   }
  },
  "Justin Jefferson": {
   "pos": "WR",
   "team": "MIN",
   "weeklyPoints": {
    "1": 31.2,
    "2": 8.5
   }
  },
  "Chuba Hubbard": {
   "pos": "RB",
   "team": "CAR",
   "weeklyPoints": {
    "1": 23.7,
    "2": 14.4
   }
  },
  "Stefon Diggs": {
   "pos": "WR",
   "team": "WSH",
   "weeklyPoints": {
    "1": 15.5,
    "2": 21.7
   }
  },
  "Christian McCaffrey": {
   "pos": "RB",
   "team": "SF",
   "weeklyPoints": {
    "1": 13.8,
    "2": 22.6
   }
  },
  "Parker Washington": {
   "pos": "WR",
   "team": "JAX",
   "weeklyPoints": {
    "1": 19.3,
    "2": 16.8
   }
  },
  "Isaiah Likely": {
   "pos": "TE",
   "team": "NYG",
   "weeklyPoints": {
    "1": 27.8,
    "2": 8.3
   }
  },
  "DeVonta Smith": {
   "pos": "WR",
   "team": "PHI",
   "weeklyPoints": {
    "1": 8.3,
    "2": 27.7
   }
  },
  "Travis Kelce": {
   "pos": "TE",
   "team": "KC",
   "weeklyPoints": {
    "1": 10.1,
    "2": 25.1
   }
  },
  "Denzel Boston": {
   "pos": "WR",
   "team": "CLE",
   "weeklyPoints": {
    "1": 13.9,
    "2": 20.5
   }
  },
  "Breece Hall": {
   "pos": "RB",
   "team": "NYJ",
   "weeklyPoints": {
    "1": 19.8,
    "2": 14.2
   }
  },
  "Dalton Schultz": {
   "pos": "TE",
   "team": "HOU",
   "weeklyPoints": {
    "1": 7.5,
    "2": 26
   }
  },
  "Jordan Love": {
   "pos": "QB",
   "team": "GB",
   "weeklyPoints": {
    "1": 19.5,
    "2": 13.8
   }
  },
  "David Montgomery": {
   "pos": "RB",
   "team": "HOU",
   "weeklyPoints": {
    "1": 28.9,
    "2": 4.4
   }
  },
  "Bucky Irving": {
   "pos": "RB",
   "team": "TB",
   "weeklyPoints": {
    "1": 20.3,
    "2": 13
   }
  },
  "Jayden Daniels": {
   "pos": "QB",
   "team": "WSH",
   "weeklyPoints": {
    "1": 17.7,
    "2": 14.7
   }
  },
  "Trevor Lawrence": {
   "pos": "QB",
   "team": "JAX",
   "weeklyPoints": {
    "1": 26.1,
    "2": 6.2
   }
  },
  "Javonte Williams": {
   "pos": "RB",
   "team": "DAL",
   "weeklyPoints": {
    "1": 24.2,
    "2": 8
   }
  },
  "Kyren Williams": {
   "pos": "RB",
   "team": "LAR",
   "weeklyPoints": {
    "1": 15.5,
    "2": 15.7
   }
  },
  "Matthew Stafford": {
   "pos": "QB",
   "team": "LAR",
   "weeklyPoints": {
    "1": 4.1,
    "2": 27
   }
  },
  "Evan McPherson": {
   "pos": "K",
   "team": "CIN",
   "weeklyPoints": {
    "1": 19,
    "2": 12
   }
  },
  "James Cook III": {
   "pos": "RB",
   "team": "BUF",
   "weeklyPoints": {
    "1": 9.9,
    "2": 20.9
   }
  },
  "Garrett Wilson": {
   "pos": "WR",
   "team": "NYJ",
   "weeklyPoints": {
    "1": 13.9,
    "2": 16.7
   }
  },
  "Joe Burrow": {
   "pos": "QB",
   "team": "CIN",
   "weeklyPoints": {
    "1": 14.2,
    "2": 16.2
   }
  },
  "Chase Brown": {
   "pos": "RB",
   "team": "CIN",
   "weeklyPoints": {
    "1": 18.8,
    "2": 11.2
   }
  },
  "Ja'Marr Chase": {
   "pos": "WR",
   "team": "CIN",
   "weeklyPoints": {
    "1": 3.2,
    "2": 26.5
   }
  },
  "Malik Willis": {
   "pos": "QB",
   "team": "MIA",
   "weeklyPoints": {
    "1": 16.7,
    "2": 12.5
   }
  },
  "Kyle Monangai": {
   "pos": "RB",
   "team": "CHI",
   "weeklyPoints": {
    "1": 20.4,
    "2": 7.8
   }
  },
  "Jaxson Dart": {
   "pos": "QB",
   "team": "NYG",
   "weeklyPoints": {
    "1": 26.6,
    "2": 0.8
   }
  },
  "Patriots D/ST": {
   "pos": "DST",
   "team": "NE",
   "weeklyPoints": {
    "1": 7,
    "2": 20
   }
  },
  "Steelers D/ST": {
   "pos": "DST",
   "team": "PIT",
   "weeklyPoints": {
    "1": 19,
    "2": 8
   }
  },
  "Sam LaPorta": {
   "pos": "TE",
   "team": "DET",
   "weeklyPoints": {
    "1": 9.8,
    "2": 17.2
   }
  },
  "Zay Flowers": {
   "pos": "WR",
   "team": "BAL",
   "weeklyPoints": {
    "1": 26,
    "2": 0
   }
  },
  "Omarion Hampton": {
   "pos": "RB",
   "team": "LAC",
   "weeklyPoints": {
    "1": 8.3,
    "2": 17.5
   }
  },
  "Ladd McConkey": {
   "pos": "WR",
   "team": "LAC",
   "weeklyPoints": {
    "1": 19.2,
    "2": 6.5
   }
  },
  "Tetairoa McMillan": {
   "pos": "WR",
   "team": "CAR",
   "weeklyPoints": {
    "1": 10.5,
    "2": 15.1
   }
  },
  "Mike Evans": {
   "pos": "WR",
   "team": "SF",
   "weeklyPoints": {
    "1": 16.9,
    "2": 8.4
   }
  },
  "Matthew Golden": {
   "pos": "WR",
   "team": "GB",
   "weeklyPoints": {
    "1": 15.5,
    "2": 9.8
   }
  },
  "Dallas Goedert": {
   "pos": "TE",
   "team": "PHI",
   "weeklyPoints": {
    "1": 23.7,
    "2": 1.4
   }
  },
  "Juwan Johnson": {
   "pos": "TE",
   "team": "NO",
   "weeklyPoints": {
    "1": 14.4,
    "2": 10.6
   }
  },
  "Tyler Warren": {
   "pos": "TE",
   "team": "IND",
   "weeklyPoints": {
    "1": 10.3,
    "2": 14.4
   }
  },
  "Deebo Samuel Sr.": {
   "pos": "WR",
   "team": "SF",
   "weeklyPoints": {
    "1": 18,
    "2": 6.5
   }
  },
  "Bryce Young": {
   "pos": "QB",
   "team": "CAR",
   "weeklyPoints": {
    "2": 24.1
   }
  },
  "Seahawks D/ST": {
   "pos": "DST",
   "team": "SEA",
   "weeklyPoints": {
    "1": 14,
    "2": 10
   }
  },
  "Bhayshul Tuten": {
   "pos": "RB",
   "team": "JAX",
   "weeklyPoints": {
    "1": 9.8,
    "2": 14.2
   }
  },
  "Baker Mayfield": {
   "pos": "QB",
   "team": "TB",
   "weeklyPoints": {
    "1": 11.6,
    "2": 12.2
   }
  },
  "Cam Skattebo": {
   "pos": "RB",
   "team": "NYG",
   "weeklyPoints": {
    "1": 14.1,
    "2": 9.5
   }
  },
  "Tee Higgins": {
   "pos": "WR",
   "team": "CIN",
   "weeklyPoints": {
    "1": 8.9,
    "2": 14.5
   }
  },
  "Pat Freiermuth": {
   "pos": "TE",
   "team": "PIT",
   "weeklyPoints": {
    "1": 15.6,
    "2": 7.4
   }
  },
  "Harrison Butker": {
   "pos": "K",
   "team": "KC",
   "weeklyPoints": {
    "1": 7,
    "2": 16
   }
  },
  "Jaylen Waddle": {
   "pos": "WR",
   "team": "DEN",
   "weeklyPoints": {
    "1": 1.2,
    "2": 21.8
   }
  },
  "De'Von Achane": {
   "pos": "RB",
   "team": "MIA",
   "weeklyPoints": {
    "1": 10.6,
    "2": 12.3
   }
  },
  "Jake Ferguson": {
   "pos": "TE",
   "team": "DAL",
   "weeklyPoints": {
    "1": 2.6,
    "2": 20.3
   }
  },
  "Rashee Rice": {
   "pos": "WR",
   "team": "KC",
   "weeklyPoints": {
    "1": 9.9,
    "2": 12.3
   }
  },
  "Travis Etienne Jr.": {
   "pos": "RB",
   "team": "NO",
   "weeklyPoints": {
    "1": 14.8,
    "2": 7.1
   }
  },
  "Emeka Egbuka": {
   "pos": "WR",
   "team": "TB",
   "weeklyPoints": {
    "1": 11.3,
    "2": 10.3
   }
  },
  "George Kittle": {
   "pos": "TE",
   "team": "SF",
   "weeklyPoints": {
    "1": 3.2,
    "2": 18
   }
  },
  "Justin Herbert": {
   "pos": "QB",
   "team": "LAC",
   "weeklyPoints": {
    "1": 13.3,
    "2": 7.9
   }
  },
  "Nico Collins": {
   "pos": "WR",
   "team": "HOU",
   "weeklyPoints": {
    "1": 21.2,
    "2": 0
   }
  },
  "DJ Moore": {
   "pos": "WR",
   "team": "BUF",
   "weeklyPoints": {
    "1": 21,
    "2": -0.1
   }
  },
  "Jeremiyah Love": {
   "pos": "RB",
   "team": "ARI",
   "weeklyPoints": {
    "1": 13,
    "2": 7.5
   }
  },
  "Aaron Jones Sr.": {
   "pos": "RB",
   "team": "MIN",
   "weeklyPoints": {
    "1": 10,
    "2": 10.5
   }
  },
  "Jaylen Warren": {
   "pos": "RB",
   "team": "PIT",
   "weeklyPoints": {
    "1": 10.3,
    "2": 9.7
   }
  },
  "Josh Downs": {
   "pos": "WR",
   "team": "IND",
   "weeklyPoints": {
    "1": 5.7,
    "2": 14.2
   }
  },
  "Mark Andrews": {
   "pos": "TE",
   "team": "BAL",
   "weeklyPoints": {
    "1": 8.9,
    "2": 10.9
   }
  },
  "Bo Nix": {
   "pos": "QB",
   "team": "DEN",
   "weeklyPoints": {
    "1": 5.4,
    "2": 14.1
   }
  },
  "T.J. Hockenson": {
   "pos": "TE",
   "team": "MIN",
   "weeklyPoints": {
    "1": 13.6,
    "2": 5.9
   }
  },
  "Cam Little": {
   "pos": "K",
   "team": "JAX",
   "weeklyPoints": {
    "1": 12,
    "2": 7
   }
  },
  "Rachaad White": {
   "pos": "RB",
   "team": "WSH",
   "weeklyPoints": {
    "1": 4.7,
    "2": 14.3
   }
  },
  "Tyler Loop": {
   "pos": "K",
   "team": "BAL",
   "weeklyPoints": {
    "1": 14,
    "2": 5
   }
  },
  "Jacory Croskey-Merritt": {
   "pos": "RB",
   "team": "WSH",
   "weeklyPoints": {
    "1": 12.6,
    "2": 5.8
   }
  },
  "Xavier Worthy": {
   "pos": "WR",
   "team": "KC",
   "weeklyPoints": {
    "1": 4.8,
    "2": 13.5
   }
  },
  "Rhamondre Stevenson": {
   "pos": "RB",
   "team": "NE",
   "weeklyPoints": {
    "1": 14.5,
    "2": 3.6
   }
  },
  "Brandon Aubrey": {
   "pos": "K",
   "team": "DAL",
   "weeklyPoints": {
    "1": 2,
    "2": 16
   }
  },
  "Drake Maye": {
   "pos": "QB",
   "team": "NE",
   "weeklyPoints": {
    "1": 9.8,
    "2": 8
   }
  },
  "Chris Godwin Jr.": {
   "pos": "WR",
   "team": "TB",
   "weeklyPoints": {
    "1": 8.3,
    "2": 8.8
   }
  },
  "Quinshon Judkins": {
   "pos": "RB",
   "team": "CLE",
   "weeklyPoints": {
    "1": 7,
    "2": 9.8
   }
  },
  "KC Concepcion": {
   "pos": "WR",
   "team": "CLE",
   "weeklyPoints": {
    "1": 7.8,
    "2": 8.2
   }
  },
  "Cairo Santos": {
   "pos": "K",
   "team": "CHI",
   "weeklyPoints": {
    "1": 12,
    "2": 4
   }
  },
  "Jakobi Meyers": {
   "pos": "WR",
   "team": "JAX",
   "weeklyPoints": {
    "1": 12.2,
    "2": 3.8
   }
  },
  "George Pickens": {
   "pos": "WR",
   "team": "DAL",
   "weeklyPoints": {
    "1": 5.8,
    "2": 10
   }
  },
  "Khalil Shakir": {
   "pos": "WR",
   "team": "BUF",
   "weeklyPoints": {
    "1": 9,
    "2": 6.8
   }
  },
  "Luther Burden III": {
   "pos": "WR",
   "team": "CHI",
   "weeklyPoints": {
    "1": 9.5,
    "2": 6.2
   }
  },
  "Blake Corum": {
   "pos": "RB",
   "team": "LAR",
   "weeklyPoints": {
    "1": 5.4,
    "2": 10.2
   }
  },
  "Kenyon Sadiq": {
   "pos": "TE",
   "team": "NYJ",
   "weeklyPoints": {
    "1": 11.4,
    "2": 3.7
   }
  },
  "Eddy Pineiro": {
   "pos": "K",
   "team": "SF",
   "weeklyPoints": {
    "1": 10,
    "2": 5
   }
  },
  "Malik Washington": {
   "pos": "WR",
   "team": "MIA",
   "weeklyPoints": {
    "1": 6.3,
    "2": 8.7
   }
  },
  "Ka'imi Fairbairn": {
   "pos": "K",
   "team": "HOU",
   "weeklyPoints": {
    "1": 9,
    "2": 6
   }
  },
  "Jaguars D/ST": {
   "pos": "DST",
   "team": "JAX",
   "weeklyPoints": {
    "1": 14,
    "2": 1
   }
  },
  "Jonah Coleman": {
   "pos": "RB",
   "team": "DEN",
   "weeklyPoints": {
    "1": 0,
    "2": 14.8
   }
  },
  "DK Metcalf": {
   "pos": "WR",
   "team": "PIT",
   "weeklyPoints": {
    "1": 8,
    "2": 6.7
   }
  },
  "Rome Odunze": {
   "pos": "WR",
   "team": "CHI",
   "weeklyPoints": {
    "1": 7.2,
    "2": 7.3
   }
  },
  "Harold Fannin Jr.": {
   "pos": "TE",
   "team": "CLE",
   "weeklyPoints": {
    "1": 4.1,
    "2": 10.4
   }
  },
  "Michael Mayer": {
   "pos": "TE",
   "team": "LV",
   "weeklyPoints": {
    "1": 9.2,
    "2": 5.3
   }
  },
  "Drake London": {
   "pos": "WR",
   "team": "ATL",
   "weeklyPoints": {
    "1": 5.5,
    "2": 8.9
   }
  },
  "Michael Wilson": {
   "pos": "WR",
   "team": "ARI",
   "weeklyPoints": {
    "1": 10.6,
    "2": 3.8
   }
  },
  "Jason Myers": {
   "pos": "K",
   "team": "SEA",
   "weeklyPoints": {
    "1": 7,
    "2": 7
   }
  },
  "Brenton Strange": {
   "pos": "TE",
   "team": "JAX",
   "weeklyPoints": {
    "1": 10.3,
    "2": 3.7
   }
  },
  "Jake Bates": {
   "pos": "K",
   "team": "DET",
   "weeklyPoints": {
    "1": 7,
    "2": 7
   }
  },
  "Brian Thomas Jr.": {
   "pos": "WR",
   "team": "JAX",
   "weeklyPoints": {
    "1": 7,
    "2": 7
   }
  },
  "Malik Nabers": {
   "pos": "WR",
   "team": "NYG",
   "weeklyPoints": {
    "1": 12.9,
    "2": 1.1
   }
  },
  "Jameson Williams": {
   "pos": "WR",
   "team": "DET",
   "weeklyPoints": {
    "1": 8.5,
    "2": 5.3
   }
  },
  "TreVeyon Henderson": {
   "pos": "RB",
   "team": "NE",
   "weeklyPoints": {
    "1": 0,
    "2": 13.6
   }
  },
  "Woody Marks": {
   "pos": "RB",
   "team": "HOU",
   "weeklyPoints": {
    "1": 5,
    "2": 8.5
   }
  },
  "Carnell Tate": {
   "pos": "WR",
   "team": "TEN",
   "weeklyPoints": {
    "1": 7.8,
    "2": 5.7
   }
  },
  "Tyjae Spears": {
   "pos": "RB",
   "team": "TEN",
   "weeklyPoints": {
    "1": 4.4,
    "2": 9
   }
  },
  "Tucker Kraft": {
   "pos": "TE",
   "team": "GB",
   "weeklyPoints": {
    "1": 9.5,
    "2": 3.5
   }
  },
  "Ravens D/ST": {
   "pos": "DST",
   "team": "BAL",
   "weeklyPoints": {
    "1": 8,
    "2": 5
   }
  },
  "Tyler Allgeier": {
   "pos": "RB",
   "team": "ARI",
   "weeklyPoints": {
    "1": 9,
    "2": 3.9
   }
  },
  "Jadarian Price": {
   "pos": "RB",
   "team": "SEA",
   "weeklyPoints": {
    "1": 7.8,
    "2": 5
   }
  },
  "Romeo Doubs": {
   "pos": "WR",
   "team": "NE",
   "weeklyPoints": {
    "1": 0,
    "2": 12.6
   }
  },
  "Hunter Henry": {
   "pos": "TE",
   "team": "NE",
   "weeklyPoints": {
    "1": 5.6,
    "2": 7
   }
  },
  "Braelon Allen": {
   "pos": "RB",
   "team": "NYJ",
   "weeklyPoints": {
    "1": 4,
    "2": 8.5
   }
  },
  "Puka Nacua": {
   "pos": "WR",
   "team": "LAR",
   "weeklyPoints": {
    "1": 12.4,
    "2": 0
   }
  },
  "MarShawn Lloyd": {
   "pos": "RB",
   "team": "GB",
   "weeklyPoints": {
    "1": 3.7,
    "2": 8.6
   }
  },
  "Adonai Mitchell": {
   "pos": "WR",
   "team": "NYJ",
   "weeklyPoints": {
    "2": 12.3
   }
  },
  "Alec Pierce": {
   "pos": "WR",
   "team": "IND",
   "weeklyPoints": {
    "1": 10.1,
    "2": 2.1
   }
  },
  "Tank Bigsby": {
   "pos": "RB",
   "team": "PHI",
   "weeklyPoints": {
    "1": 0.3,
    "2": 11.8
   }
  },
  "Saquon Barkley": {
   "pos": "RB",
   "team": "PHI",
   "weeklyPoints": {
    "1": 9,
    "2": 3
   }
  },
  "Rams D/ST": {
   "pos": "DST",
   "team": "LAR",
   "weeklyPoints": {
    "1": 1,
    "2": 11
   }
  },
  "Tony Pollard": {
   "pos": "RB",
   "team": "TEN",
   "weeklyPoints": {
    "1": 4.4,
    "2": 7.5
   }
  },
  "Jordan Mason": {
   "pos": "RB",
   "team": "MIN",
   "weeklyPoints": {
    "1": 11.9,
    "2": 0
   }
  },
  "Devaughn Vele": {
   "pos": "WR",
   "team": "NO",
   "weeklyPoints": {
    "2": 11.4
   }
  },
  "Broncos D/ST": {
   "pos": "DST",
   "team": "DEN",
   "weeklyPoints": {
    "1": 2,
    "2": 9
   }
  },
  "Keenan Allen": {
   "pos": "WR",
   "team": "IND",
   "weeklyPoints": {
    "1": 9.2,
    "2": 1.5
   }
  },
  "Wan'Dale Robinson": {
   "pos": "WR",
   "team": "TEN",
   "weeklyPoints": {
    "1": 8.8,
    "2": 1.9
   }
  },
  "Rico Dowdle": {
   "pos": "RB",
   "team": "PIT",
   "weeklyPoints": {
    "1": 4.1,
    "2": 6.4
   }
  },
  "Terry McLaurin": {
   "pos": "WR",
   "team": "WSH",
   "weeklyPoints": {
    "1": 3.4,
    "2": 7
   }
  },
  "Jonathon Brooks": {
   "pos": "RB",
   "team": "CAR",
   "weeklyPoints": {
    "1": 7.2,
    "2": 2.1
   }
  },
  "Eagles D/ST": {
   "pos": "DST",
   "team": "PHI",
   "weeklyPoints": {
    "1": 5,
    "2": 4
   }
  },
  "Michael Pittman Jr.": {
   "pos": "WR",
   "team": "PIT",
   "weeklyPoints": {
    "1": 8.8,
    "2": 0
   }
  },
  "Courtland Sutton": {
   "pos": "WR",
   "team": "DEN",
   "weeklyPoints": {
    "1": 3.1,
    "2": 5.5
   }
  },
  "Rashid Shaheed": {
   "pos": "WR",
   "team": "SEA",
   "weeklyPoints": {
    "1": 1.4,
    "2": 6.9
   }
  },
  "RJ Harvey": {
   "pos": "RB",
   "team": "DEN",
   "weeklyPoints": {
    "1": 8.1,
    "2": 0
   }
  },
  "Jalen Nailor": {
   "pos": "WR",
   "team": "LV",
   "weeklyPoints": {
    "1": 5.7,
    "2": 1.9
   }
  },
  "Kenny Gainwell": {
   "pos": "RB",
   "team": "TB",
   "weeklyPoints": {
    "1": 2.8,
    "2": 4.5
   }
  },
  "Alvin Kamara": {
   "pos": "RB",
   "team": "NO",
   "weeklyPoints": {
    "1": 0,
    "2": 7.2
   }
  },
  "J.K. Dobbins": {
   "pos": "RB",
   "team": "DEN",
   "weeklyPoints": {
    "1": 3.6,
    "2": 3.6
   }
  },
  "Chris Brooks": {
   "pos": "RB",
   "team": "GB",
   "weeklyPoints": {
    "1": 2.9,
    "2": 3.6
   }
  },
  "Jayden Reed": {
   "pos": "WR",
   "team": "GB",
   "weeklyPoints": {
    "1": 5,
    "2": 1.4
   }
  },
  "Quentin Johnston": {
   "pos": "WR",
   "team": "LAC",
   "weeklyPoints": {
    "1": 3.7,
    "2": 2.4
   }
  },
  "A.J. Brown": {
   "pos": "WR",
   "team": "NE",
   "weeklyPoints": {
    "1": 5.6,
    "2": 0
   }
  },
  "Emmett Johnson": {
   "pos": "RB",
   "team": "KC",
   "weeklyPoints": {
    "2": 5.5
   }
  },
  "George Holani": {
   "pos": "RB",
   "team": "SEA",
   "weeklyPoints": {
    "1": 2.9,
    "2": 2.5
   }
  },
  "Antonio Williams": {
   "pos": "WR",
   "team": "WSH",
   "weeklyPoints": {
    "2": 5.4
   }
  },
  "Lions D/ST": {
   "pos": "DST",
   "team": "DET",
   "weeklyPoints": {
    "1": 5
   }
  },
  "Mike Washington Jr.": {
   "pos": "RB",
   "team": "LV",
   "weeklyPoints": {
    "1": 4.1,
    "2": 0.7
   }
  },
  "Tre Tucker": {
   "pos": "WR",
   "team": "LV",
   "weeklyPoints": {
    "1": 4.7
   }
  },
  "Jerry Jeudy": {
   "pos": "WR",
   "team": "CLE",
   "weeklyPoints": {
    "1": 4.6,
    "2": 0
   }
  },
  "Makai Lemon": {
   "pos": "WR",
   "team": "PHI",
   "weeklyPoints": {
    "1": 2.5,
    "2": 1.9
   }
  },
  "Marvin Harrison Jr.": {
   "pos": "WR",
   "team": "ARI",
   "weeklyPoints": {
    "1": 4.3,
    "2": 0
   }
  },
  "Jordan Addison": {
   "pos": "WR",
   "team": "MIN",
   "weeklyPoints": {
    "1": 0,
    "2": 4.1
   }
  },
  "Chargers D/ST": {
   "pos": "DST",
   "team": "LAC",
   "weeklyPoints": {
    "1": 0,
    "2": 4
   }
  },
  "Harrison Mevis": {
   "pos": "K",
   "team": "LAR",
   "weeklyPoints": {
    "1": 1,
    "2": 3
   }
  },
  "Browns D/ST": {
   "pos": "DST",
   "team": "CLE",
   "weeklyPoints": {
    "1": -1,
    "2": 5
   }
  },
  "Buccaneers D/ST": {
   "pos": "DST",
   "team": "TB",
   "weeklyPoints": {
    "2": 4
   }
  },
  "Caleb Douglas": {
   "pos": "WR",
   "team": "MIA",
   "weeklyPoints": {
    "2": 3.9
   }
  },
  "Kayshon Boutte": {
   "pos": "WR",
   "team": "HOU",
   "weeklyPoints": {
    "1": 3.1
   }
  },
  "Texans D/ST": {
   "pos": "DST",
   "team": "HOU",
   "weeklyPoints": {
    "1": -4,
    "2": 7
   }
  },
  "Cameron Dicker": {
   "pos": "K",
   "team": "LAC",
   "weeklyPoints": {
    "1": 2,
    "2": 1
   }
  },
  "Kyle Pitts Sr.": {
   "pos": "TE",
   "team": "ATL",
   "weeklyPoints": {
    "1": 0,
    "2": 2.5
   }
  },
  "Kaelon Black": {
   "pos": "RB",
   "team": "SF",
   "weeklyPoints": {
    "2": 2.5
   }
  },
  "Chris Rodriguez Jr.": {
   "pos": "RB",
   "team": "JAX",
   "weeklyPoints": {
    "1": 2.3
   }
  },
  "Travis Hunter": {
   "pos": "WR",
   "team": "JAX",
   "weeklyPoints": {
    "1": 2.1
   }
  },
  "Colston Loveland": {
   "pos": "TE",
   "team": "CHI",
   "weeklyPoints": {
    "1": 0,
    "2": 1.3
   }
  },
  "Chiefs D/ST": {
   "pos": "DST",
   "team": "KC",
   "weeklyPoints": {
    "2": 1
   }
  },
  "Keaton Mitchell": {
   "pos": "RB",
   "team": "LAC",
   "weeklyPoints": {
    "1": 0.9
   }
  },
  "Devin Singletary": {
   "pos": "RB",
   "team": "NYG",
   "weeklyPoints": {
    "2": 0.9
   }
  },
  "Najee Harris": {
   "pos": "RB",
   "team": "NYG",
   "weeklyPoints": {
    "1": 0,
    "2": 0.6
   }
  },
  "Sam Darnold": {
   "pos": "QB",
   "team": "SEA",
   "weeklyPoints": {
    "1": 0.5
   }
  },
  "Brock Bowers": {
   "pos": "TE",
   "team": "LV",
   "weeklyPoints": {
    "1": 0,
    "2": 0
   }
  },
  "James Conner": {
   "pos": "RB",
   "team": "ARI",
   "weeklyPoints": {
    "1": 0,
    "2": 0
   }
  },
  "De'Zhaun Stribling": {
   "pos": "WR",
   "team": "SF",
   "weeklyPoints": {
    "1": 0,
    "2": 0
   }
  },
  "Jordyn Tyson": {
   "pos": "WR",
   "team": "NO",
   "weeklyPoints": {
    "1": 0,
    "2": 0
   }
  },
  "Zach Charbonnet": {
   "pos": "RB",
   "team": "SEA",
   "weeklyPoints": {
    "1": 0,
    "2": 0
   }
  },
  "Jalen McMillan": {
   "pos": "WR",
   "team": "TB",
   "weeklyPoints": {
    "1": 0,
    "2": 0
   }
  },
  "Isiah Pacheco": {
   "pos": "RB",
   "team": "DET",
   "weeklyPoints": {
    "1": 0
   }
  },
  "Dylan Sampson": {
   "pos": "RB",
   "team": "CLE",
   "weeklyPoints": {
    "1": 0,
    "2": 0
   }
  },
  "Tank Dell": {
   "pos": "WR",
   "team": "HOU",
   "weeklyPoints": {
    "1": 0,
    "2": 0
   }
  },
  "Josh Jacobs": {
   "pos": "RB",
   "team": "GB",
   "weeklyPoints": {
    "1": 0,
    "2": 0
   }
  },
  "Kyler Murray": {
   "pos": "QB",
   "team": "MIN",
   "weeklyPoints": {
    "1": -0.4,
    "2": 0
   }
  }
 }
};
