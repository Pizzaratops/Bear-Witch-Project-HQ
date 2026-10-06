// ============================================================
//  FANTASY_POWER_SCORE — "Bootleg Power Score" fürs Fantasy-Team (ESPN)
// ============================================================
//  AUTO-GENERIERT von scripts/sync-fantasy-position-score.js über die
//  GitHub Action ".github/workflows/sync-fantasy-position-score.yml".
//  Nicht von Hand editieren.
//  Zuletzt synchronisiert: 2026-10-06T23:46:40.019Z
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
    },
    "2": {
      "cumulative": [
        {
          "teamId": "bear-witch-project",
          "values": {
            "pointsFor": 112.04,
            "pointsAgainst": 102.48,
            "qbPts": 16.64,
            "rbPts": 26.9,
            "wrPts": 44.85,
            "tePts": 0.65
          },
          "ranks": {
            "pointsFor": 7,
            "pointsAgainst": 4,
            "qbPts": 7,
            "rbPts": 8,
            "wrPts": 4,
            "tePts": 12
          },
          "gamesPlayed": 2
        },
        {
          "teamId": "burrowhead-dancers",
          "values": {
            "pointsFor": 86.22,
            "pointsAgainst": 117.11,
            "qbPts": 10.57,
            "rbPts": 23.4,
            "wrPts": 29.8,
            "tePts": 11.45
          },
          "ranks": {
            "pointsFor": 12,
            "pointsAgainst": 8,
            "qbPts": 10,
            "rbPts": 10,
            "wrPts": 8,
            "tePts": 5
          },
          "gamesPlayed": 2
        },
        {
          "teamId": "fred-bulls",
          "values": {
            "pointsFor": 111.2,
            "pointsAgainst": 105.39,
            "qbPts": 16.2,
            "rbPts": 34.95,
            "wrPts": 29.45,
            "tePts": 17.6
          },
          "ranks": {
            "pointsFor": 8,
            "pointsAgainst": 5,
            "qbPts": 8,
            "rbPts": 5,
            "wrPts": 9,
            "tePts": 2
          },
          "gamesPlayed": 2
        },
        {
          "teamId": "lion-cereals",
          "values": {
            "pointsFor": 87.89,
            "pointsAgainst": 120.34,
            "qbPts": 15.54,
            "rbPts": 19.25,
            "wrPts": 19.1,
            "tePts": 11.5
          },
          "ranks": {
            "pointsFor": 11,
            "pointsAgainst": 9,
            "qbPts": 9,
            "rbPts": 12,
            "wrPts": 12,
            "tePts": 4
          },
          "gamesPlayed": 2
        },
        {
          "teamId": "vice-city-crackheads",
          "values": {
            "pointsFor": 149.54,
            "pointsAgainst": 92.24,
            "qbPts": 27.54,
            "rbPts": 48.75,
            "wrPts": 43.15,
            "tePts": 10.6
          },
          "ranks": {
            "pointsFor": 1,
            "pointsAgainst": 1,
            "qbPts": 2,
            "rbPts": 2,
            "wrPts": 5,
            "tePts": 6
          },
          "gamesPlayed": 2
        },
        {
          "teamId": "beastmode",
          "values": {
            "pointsFor": 148.89,
            "pointsAgainst": 93.27,
            "qbPts": 38.24,
            "rbPts": 36.6,
            "wrPts": 41.25,
            "tePts": 21.3
          },
          "ranks": {
            "pointsFor": 2,
            "pointsAgainst": 2,
            "qbPts": 1,
            "rbPts": 4,
            "wrPts": 6,
            "tePts": 1
          },
          "gamesPlayed": 2
        },
        {
          "teamId": "angry-ducks",
          "values": {
            "pointsFor": 115.89,
            "pointsAgainst": 123.84,
            "qbPts": 24.79,
            "rbPts": 23.15,
            "wrPts": 49.2,
            "tePts": 9.75
          },
          "ranks": {
            "pointsFor": 6,
            "pointsAgainst": 10,
            "qbPts": 3,
            "rbPts": 11,
            "wrPts": 3,
            "tePts": 8
          },
          "gamesPlayed": 2
        },
        {
          "teamId": "team-beermode",
          "values": {
            "pointsFor": 121.03,
            "pointsAgainst": 114.65,
            "qbPts": 9.78,
            "rbPts": 41.95,
            "wrPts": 56.05,
            "tePts": 1.25
          },
          "ranks": {
            "pointsFor": 5,
            "pointsAgainst": 6,
            "qbPts": 11,
            "rbPts": 3,
            "wrPts": 2,
            "tePts": 11
          },
          "gamesPlayed": 2
        },
        {
          "teamId": "running-bisons",
          "values": {
            "pointsFor": 122.46,
            "pointsAgainst": 116.78,
            "qbPts": 21.96,
            "rbPts": 51.85,
            "wrPts": 24.1,
            "tePts": 9.05
          },
          "ranks": {
            "pointsFor": 3,
            "pointsAgainst": 7,
            "qbPts": 4,
            "rbPts": 1,
            "wrPts": 11,
            "tePts": 9
          },
          "gamesPlayed": 2
        },
        {
          "teamId": "the-lamartrix",
          "values": {
            "pointsFor": 122.03,
            "pointsAgainst": 101,
            "qbPts": 19.88,
            "rbPts": 26,
            "wrPts": 58.25,
            "tePts": 9.9
          },
          "ranks": {
            "pointsFor": 4,
            "pointsAgainst": 3,
            "qbPts": 6,
            "rbPts": 9,
            "wrPts": 1,
            "tePts": 7
          },
          "gamesPlayed": 2
        },
        {
          "teamId": "charged-up",
          "values": {
            "pointsFor": 88.97,
            "pointsAgainst": 133.49,
            "qbPts": 8.92,
            "rbPts": 27.25,
            "wrPts": 30.45,
            "tePts": 12.35
          },
          "ranks": {
            "pointsFor": 10,
            "pointsAgainst": 11,
            "qbPts": 12,
            "rbPts": 7,
            "wrPts": 7,
            "tePts": 3
          },
          "gamesPlayed": 2
        },
        {
          "teamId": "london-nopunts",
          "values": {
            "pointsFor": 98.39,
            "pointsAgainst": 143.96,
            "qbPts": 20.44,
            "rbPts": 30.6,
            "wrPts": 24.6,
            "tePts": 7.25
          },
          "ranks": {
            "pointsFor": 9,
            "pointsAgainst": 12,
            "qbPts": 5,
            "rbPts": 6,
            "wrPts": 10,
            "tePts": 10
          },
          "gamesPlayed": 2
        }
      ],
      "weekly": [
        {
          "teamId": "bear-witch-project",
          "values": {
            "pointsFor": 94.4,
            "pointsAgainst": 100.6,
            "qbPts": 13.8,
            "rbPts": 11.9,
            "wrPts": 54.4,
            "tePts": 1.3
          },
          "ranks": {
            "pointsFor": 10,
            "pointsAgainst": 4,
            "qbPts": 10,
            "rbPts": 12,
            "wrPts": 2,
            "tePts": 12
          }
        },
        {
          "teamId": "burrowhead-dancers",
          "values": {
            "pointsFor": 103.88,
            "pointsAgainst": 140.56,
            "qbPts": 7.88,
            "rbPts": 20.9,
            "wrPts": 46.8,
            "tePts": 20.3
          },
          "ranks": {
            "pointsFor": 8,
            "pointsAgainst": 10,
            "qbPts": 12,
            "rbPts": 8,
            "wrPts": 5,
            "tePts": 2
          }
        },
        {
          "teamId": "fred-bulls",
          "values": {
            "pointsFor": 128.74,
            "pointsAgainst": 142.22,
            "qbPts": 14.74,
            "rbPts": 26.8,
            "wrPts": 39.1,
            "tePts": 25.1
          },
          "ranks": {
            "pointsFor": 4,
            "pointsAgainst": 11,
            "qbPts": 8,
            "rbPts": 7,
            "wrPts": 8,
            "tePts": 1
          }
        },
        {
          "teamId": "lion-cereals",
          "values": {
            "pointsFor": 117.98,
            "pointsAgainst": 85.12,
            "qbPts": 26.98,
            "rbPts": 18.1,
            "wrPts": 29.5,
            "tePts": 7.4
          },
          "ranks": {
            "pointsFor": 6,
            "pointsAgainst": 1,
            "qbPts": 5,
            "rbPts": 9,
            "wrPts": 10,
            "tePts": 9
          }
        },
        {
          "teamId": "vice-city-crackheads",
          "values": {
            "pointsFor": 150.08,
            "pointsAgainst": 91.66,
            "qbPts": 28.98,
            "rbPts": 38.3,
            "wrPts": 49.8,
            "tePts": 18
          },
          "ranks": {
            "pointsFor": 1,
            "pointsAgainst": 2,
            "qbPts": 3,
            "rbPts": 2,
            "wrPts": 3,
            "tePts": 4
          }
        },
        {
          "teamId": "beastmode",
          "values": {
            "pointsFor": 142.22,
            "pointsAgainst": 128.74,
            "qbPts": 40.82,
            "rbPts": 32,
            "wrPts": 40.3,
            "tePts": 18.1
          },
          "ranks": {
            "pointsFor": 2,
            "pointsAgainst": 9,
            "qbPts": 1,
            "rbPts": 4,
            "wrPts": 7,
            "tePts": 3
          }
        },
        {
          "teamId": "angry-ducks",
          "values": {
            "pointsFor": 124.18,
            "pointsAgainst": 104.22,
            "qbPts": 28.48,
            "rbPts": 28,
            "wrPts": 49.8,
            "tePts": 5.9
          },
          "ranks": {
            "pointsFor": 5,
            "pointsAgainst": 6,
            "qbPts": 4,
            "rbPts": 5,
            "wrPts": 4,
            "tePts": 10
          }
        },
        {
          "teamId": "team-beermode",
          "values": {
            "pointsFor": 104.22,
            "pointsAgainst": 124.18,
            "qbPts": 14.12,
            "rbPts": 36.2,
            "wrPts": 41.4,
            "tePts": 2.5
          },
          "ranks": {
            "pointsFor": 7,
            "pointsAgainst": 8,
            "qbPts": 9,
            "rbPts": 3,
            "wrPts": 6,
            "tePts": 11
          }
        },
        {
          "teamId": "running-bisons",
          "values": {
            "pointsFor": 140.56,
            "pointsAgainst": 103.88,
            "qbPts": 29.76,
            "rbPts": 64.8,
            "wrPts": 21.7,
            "tePts": 8.3
          },
          "ranks": {
            "pointsFor": 3,
            "pointsAgainst": 5,
            "qbPts": 2,
            "rbPts": 1,
            "wrPts": 12,
            "tePts": 8
          }
        },
        {
          "teamId": "the-lamartrix",
          "values": {
            "pointsFor": 100.6,
            "pointsAgainst": 94.4,
            "qbPts": 14.8,
            "rbPts": 13,
            "wrPts": 55.9,
            "tePts": 10.9
          },
          "ranks": {
            "pointsFor": 9,
            "pointsAgainst": 3,
            "qbPts": 7,
            "rbPts": 11,
            "wrPts": 1,
            "tePts": 6
          }
        },
        {
          "teamId": "charged-up",
          "values": {
            "pointsFor": 85.12,
            "pointsAgainst": 117.98,
            "qbPts": 8.02,
            "rbPts": 18.1,
            "wrPts": 36.6,
            "tePts": 14.4
          },
          "ranks": {
            "pointsFor": 12,
            "pointsAgainst": 7,
            "qbPts": 11,
            "rbPts": 10,
            "wrPts": 9,
            "tePts": 5
          }
        },
        {
          "teamId": "london-nopunts",
          "values": {
            "pointsFor": 91.66,
            "pointsAgainst": 150.08,
            "qbPts": 16.16,
            "rbPts": 26.9,
            "wrPts": 27.2,
            "tePts": 10.4
          },
          "ranks": {
            "pointsFor": 11,
            "pointsAgainst": 12,
            "qbPts": 6,
            "rbPts": 6,
            "wrPts": 11,
            "tePts": 7
          }
        }
      ]
    },
    "3": {
      "cumulative": [
        {
          "teamId": "bear-witch-project",
          "values": {
            "pointsFor": 114.87,
            "pointsAgainst": 114.79,
            "qbPts": 15.64,
            "rbPts": 27.5,
            "wrPts": 45.6,
            "tePts": 2.8
          },
          "ranks": {
            "pointsFor": 7,
            "pointsAgainst": 5,
            "qbPts": 8,
            "rbPts": 7,
            "wrPts": 4,
            "tePts": 11
          },
          "gamesPlayed": 3
        },
        {
          "teamId": "burrowhead-dancers",
          "values": {
            "pointsFor": 87.64,
            "pointsAgainst": 115.49,
            "qbPts": 10.94,
            "rbPts": 25.7,
            "wrPts": 30.93,
            "tePts": 10.73
          },
          "ranks": {
            "pointsFor": 11,
            "pointsAgainst": 6,
            "qbPts": 11,
            "rbPts": 9,
            "wrPts": 9,
            "tePts": 6
          },
          "gamesPlayed": 3
        },
        {
          "teamId": "fred-bulls",
          "values": {
            "pointsFor": 113.65,
            "pointsAgainst": 96.07,
            "qbPts": 17.25,
            "rbPts": 33.4,
            "wrPts": 32.97,
            "tePts": 16.37
          },
          "ranks": {
            "pointsFor": 8,
            "pointsAgainst": 2,
            "qbPts": 7,
            "rbPts": 5,
            "wrPts": 8,
            "tePts": 4
          },
          "gamesPlayed": 3
        },
        {
          "teamId": "lion-cereals",
          "values": {
            "pointsFor": 84.4,
            "pointsAgainst": 119.75,
            "qbPts": 13.83,
            "rbPts": 15.17,
            "wrPts": 20.2,
            "tePts": 16.87
          },
          "ranks": {
            "pointsFor": 12,
            "pointsAgainst": 9,
            "qbPts": 10,
            "rbPts": 12,
            "wrPts": 12,
            "tePts": 3
          },
          "gamesPlayed": 3
        },
        {
          "teamId": "vice-city-crackheads",
          "values": {
            "pointsFor": 135.11,
            "pointsAgainst": 100.87,
            "qbPts": 23.67,
            "rbPts": 42.63,
            "wrPts": 34,
            "tePts": 17.8
          },
          "ranks": {
            "pointsFor": 2,
            "pointsAgainst": 4,
            "qbPts": 3,
            "rbPts": 3,
            "wrPts": 7,
            "tePts": 2
          },
          "gamesPlayed": 3
        },
        {
          "teamId": "beastmode",
          "values": {
            "pointsFor": 141.51,
            "pointsAgainst": 95.86,
            "qbPts": 31.31,
            "rbPts": 42.63,
            "wrPts": 37.2,
            "tePts": 19.7
          },
          "ranks": {
            "pointsFor": 1,
            "pointsAgainst": 1,
            "qbPts": 1,
            "rbPts": 4,
            "wrPts": 6,
            "tePts": 1
          },
          "gamesPlayed": 3
        },
        {
          "teamId": "angry-ducks",
          "values": {
            "pointsFor": 116.64,
            "pointsAgainst": 117.97,
            "qbPts": 26.95,
            "rbPts": 27.03,
            "wrPts": 47.12,
            "tePts": 7.53
          },
          "ranks": {
            "pointsFor": 5,
            "pointsAgainst": 8,
            "qbPts": 2,
            "rbPts": 8,
            "wrPts": 2,
            "tePts": 9
          },
          "gamesPlayed": 3
        },
        {
          "teamId": "team-beermode",
          "values": {
            "pointsFor": 127.15,
            "pointsAgainst": 116.61,
            "qbPts": 14.45,
            "rbPts": 49.7,
            "wrPts": 45.67,
            "tePts": 1.33
          },
          "ranks": {
            "pointsFor": 3,
            "pointsAgainst": 7,
            "qbPts": 9,
            "rbPts": 1,
            "wrPts": 3,
            "tePts": 12
          },
          "gamesPlayed": 3
        },
        {
          "teamId": "running-bisons",
          "values": {
            "pointsFor": 115.32,
            "pointsAgainst": 120.11,
            "qbPts": 20.95,
            "rbPts": 47.43,
            "wrPts": 22.43,
            "tePts": 8.5
          },
          "ranks": {
            "pointsFor": 6,
            "pointsAgainst": 10,
            "qbPts": 4,
            "rbPts": 2,
            "wrPts": 11,
            "tePts": 7
          },
          "gamesPlayed": 3
        },
        {
          "teamId": "the-lamartrix",
          "values": {
            "pointsFor": 118.77,
            "pointsAgainst": 97.49,
            "qbPts": 20.07,
            "rbPts": 25.53,
            "wrPts": 56.63,
            "tePts": 7.87
          },
          "ranks": {
            "pointsFor": 4,
            "pointsAgainst": 3,
            "qbPts": 5,
            "rbPts": 10,
            "wrPts": 1,
            "tePts": 8
          },
          "gamesPlayed": 3
        },
        {
          "teamId": "charged-up",
          "values": {
            "pointsFor": 96,
            "pointsAgainst": 122.53,
            "qbPts": 7.2,
            "rbPts": 23.3,
            "wrPts": 42.03,
            "tePts": 13.13
          },
          "ranks": {
            "pointsFor": 10,
            "pointsAgainst": 11,
            "qbPts": 12,
            "rbPts": 11,
            "wrPts": 5,
            "tePts": 5
          },
          "gamesPlayed": 3
        },
        {
          "teamId": "london-nopunts",
          "values": {
            "pointsFor": 99.13,
            "pointsAgainst": 132.66,
            "qbPts": 17.83,
            "rbPts": 30.63,
            "wrPts": 28.83,
            "tePts": 4.83
          },
          "ranks": {
            "pointsFor": 9,
            "pointsAgainst": 12,
            "qbPts": 6,
            "rbPts": 6,
            "wrPts": 10,
            "tePts": 10
          },
          "gamesPlayed": 3
        }
      ],
      "weekly": [
        {
          "teamId": "bear-witch-project",
          "values": {
            "pointsFor": 120.54,
            "pointsAgainst": 139.4,
            "qbPts": 13.64,
            "rbPts": 28.7,
            "wrPts": 47.1,
            "tePts": 7.1
          },
          "ranks": {
            "pointsFor": 3,
            "pointsAgainst": 12,
            "qbPts": 8,
            "rbPts": 9,
            "wrPts": 3,
            "tePts": 8
          }
        },
        {
          "teamId": "burrowhead-dancers",
          "values": {
            "pointsFor": 90.48,
            "pointsAgainst": 112.24,
            "qbPts": 11.68,
            "rbPts": 30.3,
            "wrPts": 33.2,
            "tePts": 9.3
          },
          "ranks": {
            "pointsFor": 11,
            "pointsAgainst": 7,
            "qbPts": 10,
            "rbPts": 7,
            "wrPts": 7,
            "tePts": 6
          }
        },
        {
          "teamId": "fred-bulls",
          "values": {
            "pointsFor": 118.56,
            "pointsAgainst": 77.42,
            "qbPts": 19.36,
            "rbPts": 30.3,
            "wrPts": 40,
            "tePts": 13.9
          },
          "ranks": {
            "pointsFor": 4,
            "pointsAgainst": 1,
            "qbPts": 4,
            "rbPts": 8,
            "wrPts": 5,
            "tePts": 5
          }
        },
        {
          "teamId": "lion-cereals",
          "values": {
            "pointsFor": 77.42,
            "pointsAgainst": 118.56,
            "qbPts": 10.42,
            "rbPts": 7,
            "wrPts": 22.4,
            "tePts": 27.6
          },
          "ranks": {
            "pointsFor": 12,
            "pointsAgainst": 9,
            "qbPts": 11,
            "rbPts": 12,
            "wrPts": 10,
            "tePts": 2
          }
        },
        {
          "teamId": "vice-city-crackheads",
          "values": {
            "pointsFor": 106.24,
            "pointsAgainst": 118.14,
            "qbPts": 15.94,
            "rbPts": 30.4,
            "wrPts": 15.7,
            "tePts": 32.2
          },
          "ranks": {
            "pointsFor": 8,
            "pointsAgainst": 8,
            "qbPts": 7,
            "rbPts": 6,
            "wrPts": 12,
            "tePts": 1
          }
        },
        {
          "teamId": "beastmode",
          "values": {
            "pointsFor": 126.76,
            "pointsAgainst": 101.04,
            "qbPts": 17.46,
            "rbPts": 54.7,
            "wrPts": 29.1,
            "tePts": 16.5
          },
          "ranks": {
            "pointsFor": 2,
            "pointsAgainst": 4,
            "qbPts": 6,
            "rbPts": 2,
            "wrPts": 8,
            "tePts": 3
          }
        },
        {
          "teamId": "angry-ducks",
          "values": {
            "pointsFor": 118.14,
            "pointsAgainst": 106.24,
            "qbPts": 31.28,
            "rbPts": 34.8,
            "wrPts": 42.96,
            "tePts": 3.1
          },
          "ranks": {
            "pointsFor": 5,
            "pointsAgainst": 5,
            "qbPts": 1,
            "rbPts": 4,
            "wrPts": 4,
            "tePts": 10
          }
        },
        {
          "teamId": "team-beermode",
          "values": {
            "pointsFor": 139.4,
            "pointsAgainst": 120.54,
            "qbPts": 23.8,
            "rbPts": 65.2,
            "wrPts": 24.9,
            "tePts": 1.5
          },
          "ranks": {
            "pointsFor": 1,
            "pointsAgainst": 10,
            "qbPts": 2,
            "rbPts": 1,
            "wrPts": 9,
            "tePts": 11
          }
        },
        {
          "teamId": "running-bisons",
          "values": {
            "pointsFor": 101.04,
            "pointsAgainst": 126.76,
            "qbPts": 18.94,
            "rbPts": 38.6,
            "wrPts": 19.1,
            "tePts": 7.4
          },
          "ranks": {
            "pointsFor": 9,
            "pointsAgainst": 11,
            "qbPts": 5,
            "rbPts": 3,
            "wrPts": 11,
            "tePts": 7
          }
        },
        {
          "teamId": "the-lamartrix",
          "values": {
            "pointsFor": 112.24,
            "pointsAgainst": 90.48,
            "qbPts": 20.44,
            "rbPts": 24.6,
            "wrPts": 53.4,
            "tePts": 3.8
          },
          "ranks": {
            "pointsFor": 6,
            "pointsAgainst": 2,
            "qbPts": 3,
            "rbPts": 10,
            "wrPts": 2,
            "tePts": 9
          }
        },
        {
          "teamId": "charged-up",
          "values": {
            "pointsFor": 110.06,
            "pointsAgainst": 100.62,
            "qbPts": 3.76,
            "rbPts": 15.4,
            "wrPts": 65.2,
            "tePts": 14.7
          },
          "ranks": {
            "pointsFor": 7,
            "pointsAgainst": 3,
            "qbPts": 12,
            "rbPts": 11,
            "wrPts": 1,
            "tePts": 4
          }
        },
        {
          "teamId": "london-nopunts",
          "values": {
            "pointsFor": 100.62,
            "pointsAgainst": 110.06,
            "qbPts": 12.62,
            "rbPts": 30.7,
            "wrPts": 37.3,
            "tePts": 0
          },
          "ranks": {
            "pointsFor": 10,
            "pointsAgainst": 6,
            "qbPts": 9,
            "rbPts": 5,
            "wrPts": 6,
            "tePts": 12
          }
        }
      ]
    },
    "4": {
      "cumulative": [
        {
          "teamId": "bear-witch-project",
          "values": {
            "pointsFor": 110.9,
            "pointsAgainst": 110.29,
            "qbPts": 17.1,
            "rbPts": 23.33,
            "wrPts": 45.7,
            "tePts": 5.03
          },
          "ranks": {
            "pointsFor": 8,
            "pointsAgainst": 4,
            "qbPts": 7,
            "rbPts": 10,
            "wrPts": 3,
            "tePts": 11
          },
          "gamesPlayed": 4
        },
        {
          "teamId": "burrowhead-dancers",
          "values": {
            "pointsFor": 90.93,
            "pointsAgainst": 111.55,
            "qbPts": 13.98,
            "rbPts": 27.45,
            "wrPts": 31.17,
            "tePts": 9.08
          },
          "ranks": {
            "pointsFor": 12,
            "pointsAgainst": 5,
            "qbPts": 10,
            "rbPts": 9,
            "wrPts": 10,
            "tePts": 8
          },
          "gamesPlayed": 4
        },
        {
          "teamId": "fred-bulls",
          "values": {
            "pointsFor": 111.49,
            "pointsAgainst": 98.7,
            "qbPts": 18.06,
            "rbPts": 33.28,
            "wrPts": 31.53,
            "tePts": 16.13
          },
          "ranks": {
            "pointsFor": 7,
            "pointsAgainst": 1,
            "qbPts": 6,
            "rbPts": 7,
            "wrPts": 9,
            "tePts": 4
          },
          "gamesPlayed": 4
        },
        {
          "teamId": "lion-cereals",
          "values": {
            "pointsFor": 92.87,
            "pointsAgainst": 123.34,
            "qbPts": 12.8,
            "rbPts": 17.73,
            "wrPts": 25.8,
            "tePts": 17.8
          },
          "ranks": {
            "pointsFor": 11,
            "pointsAgainst": 10,
            "qbPts": 11,
            "rbPts": 12,
            "wrPts": 11,
            "tePts": 1
          },
          "gamesPlayed": 4
        },
        {
          "teamId": "vice-city-crackheads",
          "values": {
            "pointsFor": 125.53,
            "pointsAgainst": 100.4,
            "qbPts": 21.03,
            "rbPts": 35.95,
            "wrPts": 33.95,
            "tePts": 17.6
          },
          "ranks": {
            "pointsFor": 4,
            "pointsAgainst": 2,
            "qbPts": 3,
            "rbPts": 5,
            "wrPts": 7,
            "tePts": 2
          },
          "gamesPlayed": 4
        },
        {
          "teamId": "beastmode",
          "values": {
            "pointsFor": 146.76,
            "pointsAgainst": 110.12,
            "qbPts": 28.12,
            "rbPts": 42.98,
            "wrPts": 46.63,
            "tePts": 17.3
          },
          "ranks": {
            "pointsFor": 1,
            "pointsAgainst": 3,
            "qbPts": 1,
            "rbPts": 3,
            "wrPts": 2,
            "tePts": 3
          },
          "gamesPlayed": 4
        },
        {
          "teamId": "angry-ducks",
          "values": {
            "pointsFor": 126.56,
            "pointsAgainst": 116.77,
            "qbPts": 25.12,
            "rbPts": 34.28,
            "wrPts": 44.29,
            "tePts": 11.88
          },
          "ranks": {
            "pointsFor": 3,
            "pointsAgainst": 9,
            "qbPts": 2,
            "rbPts": 6,
            "wrPts": 4,
            "tePts": 7
          },
          "gamesPlayed": 4
        },
        {
          "teamId": "team-beermode",
          "values": {
            "pointsFor": 120.3,
            "pointsAgainst": 112.66,
            "qbPts": 14.83,
            "rbPts": 45.45,
            "wrPts": 39.98,
            "tePts": 1.55
          },
          "ranks": {
            "pointsFor": 5,
            "pointsAgainst": 6,
            "qbPts": 9,
            "rbPts": 2,
            "wrPts": 6,
            "tePts": 12
          },
          "gamesPlayed": 4
        },
        {
          "teamId": "running-bisons",
          "values": {
            "pointsFor": 113.14,
            "pointsAgainst": 116.33,
            "qbPts": 20.24,
            "rbPts": 46.77,
            "wrPts": 18.65,
            "tePts": 11.98
          },
          "ranks": {
            "pointsFor": 6,
            "pointsAgainst": 8,
            "qbPts": 4,
            "rbPts": 1,
            "wrPts": 12,
            "tePts": 6
          },
          "gamesPlayed": 4
        },
        {
          "teamId": "the-lamartrix",
          "values": {
            "pointsFor": 127.3,
            "pointsAgainst": 113.75,
            "qbPts": 19.77,
            "rbPts": 28.78,
            "wrPts": 61.18,
            "tePts": 6.33
          },
          "ranks": {
            "pointsFor": 2,
            "pointsAgainst": 7,
            "qbPts": 5,
            "rbPts": 8,
            "wrPts": 1,
            "tePts": 10
          },
          "gamesPlayed": 4
        },
        {
          "teamId": "charged-up",
          "values": {
            "pointsFor": 100.29,
            "pointsAgainst": 130.98,
            "qbPts": 11.94,
            "rbPts": 22.88,
            "wrPts": 41.85,
            "tePts": 12.13
          },
          "ranks": {
            "pointsFor": 10,
            "pointsAgainst": 12,
            "qbPts": 12,
            "rbPts": 11,
            "wrPts": 5,
            "tePts": 5
          },
          "gamesPlayed": 4
        },
        {
          "teamId": "london-nopunts",
          "values": {
            "pointsFor": 107.88,
            "pointsAgainst": 129.07,
            "qbPts": 16.76,
            "rbPts": 36.92,
            "wrPts": 32.15,
            "tePts": 6.55
          },
          "ranks": {
            "pointsFor": 9,
            "pointsAgainst": 11,
            "qbPts": 8,
            "rbPts": 4,
            "wrPts": 8,
            "tePts": 9
          },
          "gamesPlayed": 4
        }
      ],
      "weekly": [
        {
          "teamId": "bear-witch-project",
          "values": {
            "pointsFor": 98.96,
            "pointsAgainst": 96.78,
            "qbPts": 21.46,
            "rbPts": 10.8,
            "wrPts": 46,
            "tePts": 11.7
          },
          "ranks": {
            "pointsFor": 11,
            "pointsAgainst": 1,
            "qbPts": 3,
            "rbPts": 12,
            "wrPts": 3,
            "tePts": 6
          }
        },
        {
          "teamId": "burrowhead-dancers",
          "values": {
            "pointsFor": 100.78,
            "pointsAgainst": 99.74,
            "qbPts": 23.08,
            "rbPts": 32.7,
            "wrPts": 31.9,
            "tePts": 4.1
          },
          "ranks": {
            "pointsFor": 9,
            "pointsAgainst": 3,
            "qbPts": 2,
            "rbPts": 7,
            "wrPts": 9,
            "tePts": 10
          }
        },
        {
          "teamId": "fred-bulls",
          "values": {
            "pointsFor": 104.98,
            "pointsAgainst": 106.6,
            "qbPts": 20.48,
            "rbPts": 32.9,
            "wrPts": 27.2,
            "tePts": 15.4
          },
          "ranks": {
            "pointsFor": 8,
            "pointsAgainst": 6,
            "qbPts": 4,
            "rbPts": 6,
            "wrPts": 10,
            "tePts": 5
          }
        },
        {
          "teamId": "lion-cereals",
          "values": {
            "pointsFor": 118.28,
            "pointsAgainst": 134.12,
            "qbPts": 9.68,
            "rbPts": 25.4,
            "wrPts": 42.6,
            "tePts": 20.6
          },
          "ranks": {
            "pointsFor": 5,
            "pointsAgainst": 9,
            "qbPts": 12,
            "rbPts": 9,
            "wrPts": 4,
            "tePts": 3
          }
        },
        {
          "teamId": "vice-city-crackheads",
          "values": {
            "pointsFor": 96.78,
            "pointsAgainst": 98.96,
            "qbPts": 13.08,
            "rbPts": 15.9,
            "wrPts": 33.8,
            "tePts": 17
          },
          "ranks": {
            "pointsFor": 12,
            "pointsAgainst": 2,
            "qbPts": 11,
            "rbPts": 11,
            "wrPts": 8,
            "tePts": 4
          }
        },
        {
          "teamId": "beastmode",
          "values": {
            "pointsFor": 162.52,
            "pointsAgainst": 152.88,
            "qbPts": 18.52,
            "rbPts": 44,
            "wrPts": 74.9,
            "tePts": 10.1
          },
          "ranks": {
            "pointsFor": 1,
            "pointsAgainst": 10,
            "qbPts": 7,
            "rbPts": 4,
            "wrPts": 1,
            "tePts": 8
          }
        },
        {
          "teamId": "angry-ducks",
          "values": {
            "pointsFor": 156.32,
            "pointsAgainst": 113.16,
            "qbPts": 19.62,
            "rbPts": 56,
            "wrPts": 35.8,
            "tePts": 24.9
          },
          "ranks": {
            "pointsFor": 2,
            "pointsAgainst": 7,
            "qbPts": 5,
            "rbPts": 1,
            "wrPts": 7,
            "tePts": 1
          }
        },
        {
          "teamId": "team-beermode",
          "values": {
            "pointsFor": 99.74,
            "pointsAgainst": 100.78,
            "qbPts": 15.94,
            "rbPts": 32.7,
            "wrPts": 22.9,
            "tePts": 2.2
          },
          "ranks": {
            "pointsFor": 10,
            "pointsAgainst": 4,
            "qbPts": 9,
            "rbPts": 8,
            "wrPts": 11,
            "tePts": 11
          }
        },
        {
          "teamId": "running-bisons",
          "values": {
            "pointsFor": 106.6,
            "pointsAgainst": 104.98,
            "qbPts": 18.1,
            "rbPts": 44.8,
            "wrPts": 7.3,
            "tePts": 22.4
          },
          "ranks": {
            "pointsFor": 7,
            "pointsAgainst": 5,
            "qbPts": 8,
            "rbPts": 3,
            "wrPts": 12,
            "tePts": 2
          }
        },
        {
          "teamId": "the-lamartrix",
          "values": {
            "pointsFor": 152.88,
            "pointsAgainst": 162.52,
            "qbPts": 18.88,
            "rbPts": 38.5,
            "wrPts": 74.8,
            "tePts": 1.7
          },
          "ranks": {
            "pointsFor": 3,
            "pointsAgainst": 12,
            "qbPts": 6,
            "rbPts": 5,
            "wrPts": 2,
            "tePts": 12
          }
        },
        {
          "teamId": "charged-up",
          "values": {
            "pointsFor": 113.16,
            "pointsAgainst": 156.32,
            "qbPts": 26.16,
            "rbPts": 21.6,
            "wrPts": 41.3,
            "tePts": 9.1
          },
          "ranks": {
            "pointsFor": 6,
            "pointsAgainst": 11,
            "qbPts": 1,
            "rbPts": 10,
            "wrPts": 6,
            "tePts": 9
          }
        },
        {
          "teamId": "london-nopunts",
          "values": {
            "pointsFor": 134.12,
            "pointsAgainst": 118.28,
            "qbPts": 13.52,
            "rbPts": 55.8,
            "wrPts": 42.1,
            "tePts": 11.7
          },
          "ranks": {
            "pointsFor": 4,
            "pointsAgainst": 8,
            "qbPts": 10,
            "rbPts": 2,
            "wrPts": 5,
            "tePts": 7
          }
        }
      ]
    }
  }
};
