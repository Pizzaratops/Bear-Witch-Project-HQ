// ============================================================
//  FANTASY_POWER_SCORE — "Bootleg Power Score" fürs Fantasy-Team (ESPN)
// ============================================================
//  AUTO-GENERIERT von scripts/sync-fantasy-position-score.js über die
//  GitHub Action ".github/workflows/sync-fantasy-position-score.yml".
//  Nicht von Hand editieren.
//  Zuletzt synchronisiert: 2026-09-20T21:28:40.525Z
//
//  6 Kategorien: Points Scored, Points Allowed, Points by QB/RB/WR/TE
//  (FLEX zaehlt nach echter Spieler-Position, K/DST fliessen in keine
//  der 4 Positions-Kategorien ein). Struktur identisch zu
//  data/nfl-power-score.js, nur mit unseren Team-IDs (data/teams.js)
//  statt NFL-Kuerzeln und Rang 1-12 statt 1-32.
//
//  FANTASY_POWER_SCORE.weeks[week] = { cumulative, weekly }, je ein
//  Array aller 12 Teams: { teamId, values:{<key>:Zahl|null},
//  ranks:{<key>:1-12|null} }.
// ============================================================

const FANTASY_POWER_SCORE = {
  season: 2026,
  categories: [
    {
      "key": "pointsFor",
      "label": "Points Scored",
      "unit": "pro Woche",
      "better": "high"
    },
    {
      "key": "pointsAgainst",
      "label": "Points Allowed",
      "unit": "pro Woche zugelassen",
      "better": "low"
    },
    {
      "key": "qbPts",
      "label": "Points by QB",
      "unit": "pro Woche",
      "better": "high"
    },
    {
      "key": "rbPts",
      "label": "Points by RB",
      "unit": "pro Woche",
      "better": "high"
    },
    {
      "key": "wrPts",
      "label": "Points by WR",
      "unit": "pro Woche",
      "better": "high"
    },
    {
      "key": "tePts",
      "label": "Points by TE",
      "unit": "pro Woche",
      "better": "high"
    }
  ],
  weeks: {
    "1": {
      "cumulative": [
        {
          "teamId": "bear-witch-project",
          "values": {
            "pointsFor": 129.68,
            "pointsAgainst": 104.36,
            "qbPts": 19.48,
            "rbPts": 41.9,
            "wrPts": 35.3,
            "tePts": 0
          },
          "ranks": {
            "pointsFor": 5,
            "pointsAgainst": 5,
            "qbPts": 6,
            "rbPts": 4,
            "wrPts": 6,
            "tePts": 11
          },
          "gamesPlayed": 1
        },
        {
          "teamId": "burrowhead-dancers",
          "values": {
            "pointsFor": 68.56,
            "pointsAgainst": 93.66,
            "qbPts": 13.26,
            "rbPts": 25.9,
            "wrPts": 12.8,
            "tePts": 2.6
          },
          "ranks": {
            "pointsFor": 11,
            "pointsAgainst": 4,
            "qbPts": 9,
            "rbPts": 10,
            "wrPts": 11,
            "tePts": 10
          },
          "gamesPlayed": 1
        },
        {
          "teamId": "fred-bulls",
          "values": {
            "pointsFor": 93.66,
            "pointsAgainst": 68.56,
            "qbPts": 17.66,
            "rbPts": 43.1,
            "wrPts": 19.8,
            "tePts": 10.1
          },
          "ranks": {
            "pointsFor": 9,
            "pointsAgainst": 2,
            "qbPts": 7,
            "rbPts": 3,
            "wrPts": 10,
            "tePts": 5
          },
          "gamesPlayed": 1
        },
        {
          "teamId": "lion-cereals",
          "values": {
            "pointsFor": 57.8,
            "pointsAgainst": 155.56,
            "qbPts": 4.1,
            "rbPts": 20.4,
            "wrPts": 8.7,
            "tePts": 15.6
          },
          "ranks": {
            "pointsFor": 12,
            "pointsAgainst": 12,
            "qbPts": 12,
            "rbPts": 11,
            "wrPts": 12,
            "tePts": 2
          },
          "gamesPlayed": 1
        },
        {
          "teamId": "vice-city-crackheads",
          "values": {
            "pointsFor": 149,
            "pointsAgainst": 92.82,
            "qbPts": 26.1,
            "rbPts": 59.2,
            "wrPts": 36.5,
            "tePts": 3.2
          },
          "ranks": {
            "pointsFor": 2,
            "pointsAgainst": 3,
            "qbPts": 2,
            "rbPts": 1,
            "wrPts": 5,
            "tePts": 9
          },
          "gamesPlayed": 1
        },
        {
          "teamId": "beastmode",
          "values": {
            "pointsFor": 155.56,
            "pointsAgainst": 57.8,
            "qbPts": 35.66,
            "rbPts": 41.2,
            "wrPts": 42.2,
            "tePts": 24.5
          },
          "ranks": {
            "pointsFor": 1,
            "pointsAgainst": 1,
            "qbPts": 1,
            "rbPts": 5,
            "wrPts": 4,
            "tePts": 1
          },
          "gamesPlayed": 1
        },
        {
          "teamId": "angry-ducks",
          "values": {
            "pointsFor": 107.6,
            "pointsAgainst": 143.46,
            "qbPts": 21.1,
            "rbPts": 18.3,
            "wrPts": 48.6,
            "tePts": 13.6
          },
          "ranks": {
            "pointsFor": 6,
            "pointsAgainst": 10,
            "qbPts": 5,
            "rbPts": 12,
            "wrPts": 3,
            "tePts": 3
          },
          "gamesPlayed": 1
        },
        {
          "teamId": "team-beermode",
          "values": {
            "pointsFor": 137.84,
            "pointsAgainst": 105.12,
            "qbPts": 5.44,
            "rbPts": 47.7,
            "wrPts": 70.7,
            "tePts": 0
          },
          "ranks": {
            "pointsFor": 4,
            "pointsAgainst": 6,
            "qbPts": 11,
            "rbPts": 2,
            "wrPts": 1,
            "tePts": 12
          },
          "gamesPlayed": 1
        },
        {
          "teamId": "running-bisons",
          "values": {
            "pointsFor": 104.36,
            "pointsAgainst": 129.68,
            "qbPts": 14.16,
            "rbPts": 38.9,
            "wrPts": 26.5,
            "tePts": 9.8
          },
          "ranks": {
            "pointsFor": 8,
            "pointsAgainst": 8,
            "qbPts": 8,
            "rbPts": 7,
            "wrPts": 7,
            "tePts": 6
          },
          "gamesPlayed": 1
        },
        {
          "teamId": "the-lamartrix",
          "values": {
            "pointsFor": 143.46,
            "pointsAgainst": 107.6,
            "qbPts": 24.96,
            "rbPts": 39,
            "wrPts": 60.6,
            "tePts": 8.9
          },
          "ranks": {
            "pointsFor": 3,
            "pointsAgainst": 7,
            "qbPts": 3,
            "rbPts": 6,
            "wrPts": 2,
            "tePts": 7
          },
          "gamesPlayed": 1
        },
        {
          "teamId": "charged-up",
          "values": {
            "pointsFor": 92.82,
            "pointsAgainst": 149,
            "qbPts": 9.82,
            "rbPts": 36.4,
            "wrPts": 24.3,
            "tePts": 10.3
          },
          "ranks": {
            "pointsFor": 10,
            "pointsAgainst": 11,
            "qbPts": 10,
            "rbPts": 8,
            "wrPts": 8,
            "tePts": 4
          },
          "gamesPlayed": 1
        },
        {
          "teamId": "london-nopunts",
          "values": {
            "pointsFor": 105.12,
            "pointsAgainst": 137.84,
            "qbPts": 24.72,
            "rbPts": 34.3,
            "wrPts": 22,
            "tePts": 4.1
          },
          "ranks": {
            "pointsFor": 7,
            "pointsAgainst": 9,
            "qbPts": 4,
            "rbPts": 9,
            "wrPts": 9,
            "tePts": 8
          },
          "gamesPlayed": 1
        }
      ],
      "weekly": [
        {
          "teamId": "bear-witch-project",
          "values": {
            "pointsFor": 129.68,
            "pointsAgainst": 104.36,
            "qbPts": 19.48,
            "rbPts": 41.9,
            "wrPts": 35.3,
            "tePts": 0
          },
          "ranks": {
            "pointsFor": 5,
            "pointsAgainst": 5,
            "qbPts": 6,
            "rbPts": 4,
            "wrPts": 6,
            "tePts": 11
          }
        },
        {
          "teamId": "burrowhead-dancers",
          "values": {
            "pointsFor": 68.56,
            "pointsAgainst": 93.66,
            "qbPts": 13.26,
            "rbPts": 25.9,
            "wrPts": 12.8,
            "tePts": 2.6
          },
          "ranks": {
            "pointsFor": 11,
            "pointsAgainst": 4,
            "qbPts": 9,
            "rbPts": 10,
            "wrPts": 11,
            "tePts": 10
          }
        },
        {
          "teamId": "fred-bulls",
          "values": {
            "pointsFor": 93.66,
            "pointsAgainst": 68.56,
            "qbPts": 17.66,
            "rbPts": 43.1,
            "wrPts": 19.8,
            "tePts": 10.1
          },
          "ranks": {
            "pointsFor": 9,
            "pointsAgainst": 2,
            "qbPts": 7,
            "rbPts": 3,
            "wrPts": 10,
            "tePts": 5
          }
        },
        {
          "teamId": "lion-cereals",
          "values": {
            "pointsFor": 57.8,
            "pointsAgainst": 155.56,
            "qbPts": 4.1,
            "rbPts": 20.4,
            "wrPts": 8.7,
            "tePts": 15.6
          },
          "ranks": {
            "pointsFor": 12,
            "pointsAgainst": 12,
            "qbPts": 12,
            "rbPts": 11,
            "wrPts": 12,
            "tePts": 2
          }
        },
        {
          "teamId": "vice-city-crackheads",
          "values": {
            "pointsFor": 149,
            "pointsAgainst": 92.82,
            "qbPts": 26.1,
            "rbPts": 59.2,
            "wrPts": 36.5,
            "tePts": 3.2
          },
          "ranks": {
            "pointsFor": 2,
            "pointsAgainst": 3,
            "qbPts": 2,
            "rbPts": 1,
            "wrPts": 5,
            "tePts": 9
          }
        },
        {
          "teamId": "beastmode",
          "values": {
            "pointsFor": 155.56,
            "pointsAgainst": 57.8,
            "qbPts": 35.66,
            "rbPts": 41.2,
            "wrPts": 42.2,
            "tePts": 24.5
          },
          "ranks": {
            "pointsFor": 1,
            "pointsAgainst": 1,
            "qbPts": 1,
            "rbPts": 5,
            "wrPts": 4,
            "tePts": 1
          }
        },
        {
          "teamId": "angry-ducks",
          "values": {
            "pointsFor": 107.6,
            "pointsAgainst": 143.46,
            "qbPts": 21.1,
            "rbPts": 18.3,
            "wrPts": 48.6,
            "tePts": 13.6
          },
          "ranks": {
            "pointsFor": 6,
            "pointsAgainst": 10,
            "qbPts": 5,
            "rbPts": 12,
            "wrPts": 3,
            "tePts": 3
          }
        },
        {
          "teamId": "team-beermode",
          "values": {
            "pointsFor": 137.84,
            "pointsAgainst": 105.12,
            "qbPts": 5.44,
            "rbPts": 47.7,
            "wrPts": 70.7,
            "tePts": 0
          },
          "ranks": {
            "pointsFor": 4,
            "pointsAgainst": 6,
            "qbPts": 11,
            "rbPts": 2,
            "wrPts": 1,
            "tePts": 12
          }
        },
        {
          "teamId": "running-bisons",
          "values": {
            "pointsFor": 104.36,
            "pointsAgainst": 129.68,
            "qbPts": 14.16,
            "rbPts": 38.9,
            "wrPts": 26.5,
            "tePts": 9.8
          },
          "ranks": {
            "pointsFor": 8,
            "pointsAgainst": 8,
            "qbPts": 8,
            "rbPts": 7,
            "wrPts": 7,
            "tePts": 6
          }
        },
        {
          "teamId": "the-lamartrix",
          "values": {
            "pointsFor": 143.46,
            "pointsAgainst": 107.6,
            "qbPts": 24.96,
            "rbPts": 39,
            "wrPts": 60.6,
            "tePts": 8.9
          },
          "ranks": {
            "pointsFor": 3,
            "pointsAgainst": 7,
            "qbPts": 3,
            "rbPts": 6,
            "wrPts": 2,
            "tePts": 7
          }
        },
        {
          "teamId": "charged-up",
          "values": {
            "pointsFor": 92.82,
            "pointsAgainst": 149,
            "qbPts": 9.82,
            "rbPts": 36.4,
            "wrPts": 24.3,
            "tePts": 10.3
          },
          "ranks": {
            "pointsFor": 10,
            "pointsAgainst": 11,
            "qbPts": 10,
            "rbPts": 8,
            "wrPts": 8,
            "tePts": 4
          }
        },
        {
          "teamId": "london-nopunts",
          "values": {
            "pointsFor": 105.12,
            "pointsAgainst": 137.84,
            "qbPts": 24.72,
            "rbPts": 34.3,
            "wrPts": 22,
            "tePts": 4.1
          },
          "ranks": {
            "pointsFor": 7,
            "pointsAgainst": 9,
            "qbPts": 4,
            "rbPts": 9,
            "wrPts": 9,
            "tePts": 8
          }
        }
      ]
    }
  }
};
