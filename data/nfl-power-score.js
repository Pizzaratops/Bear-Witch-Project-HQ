// ============================================================
//  NFL_POWER_SCORE — "Bootleg Power Score" Spinnennetz (nflverse)
// ============================================================
//  AUTO-GENERIERT von scripts/sync-nfl-power-score.js über die GitHub
//  Action ".github/workflows/sync-nfl-power-score.yml". Nicht von Hand
//  editieren — Änderungen werden beim nächsten Sync überschrieben.
//  Zuletzt synchronisiert: 2026-10-05T16:58:48.786Z
//
//  6 Kategorien, datengestützt ausgewählt (siehe Kommentar oben im
//  Script für die Korrelationsanalyse gegen echte Season-Siege
//  2021–2025): Passing Offense (EPA/Play), Turnover-Differential,
//  Pass Defense (EPA/Play zugelassen), Rush Defense (Yards zugelassen),
//  Points Scored, Points Allowed.
//
//  NFL_POWER_SCORE[season].categories = [{key,label,unit,better}, ...]
//  in fester Reihenfolge (Radar-Achsen-Reihenfolge).
//
//  NFL_POWER_SCORE[season].weeks[week] = { cumulative, weekly }, jeweils
//  ein Array aller 32 Teams: { abbr, values:{<key>: Zahl|null},
//  ranks:{<key>: 1-32|null} }. "cumulative" = Mittelwert/Rang über alle
//  Spiele bis einschließlich dieser Woche, "weekly" = nur diese eine
//  Woche (null bei Bye-Week).
//
//  "better" pro Kategorie: "high" = höherer Rohwert ist besser (Rang 1),
//  "low" = niedrigerer Rohwert ist besser (Rang 1) -- wichtig für die
//  Anzeige (Rang 1 immer aussen im Spinnennetz, unabhängig vom Vorzeichen
//  der zugrundeliegenden Kennzahl).
// ============================================================

const NFL_POWER_SCORE = {
  2026: {
    categories: [
      {
        "key": "passOffEpa",
        "label": "Passing Offense",
        "unit": "EPA/Play",
        "better": "high"
      },
      {
        "key": "turnoverDiff",
        "label": "Turnover-Differential",
        "unit": "pro Spiel",
        "better": "high"
      },
      {
        "key": "passDefEpa",
        "label": "Pass Defense",
        "unit": "EPA/Play zugelassen",
        "better": "low"
      },
      {
        "key": "rushDefYds",
        "label": "Rush Defense",
        "unit": "Yards/Spiel zugelassen",
        "better": "low"
      },
      {
        "key": "pointsFor",
        "label": "Points Scored",
        "unit": "pro Spiel",
        "better": "high"
      },
      {
        "key": "pointsAgainst",
        "label": "Points Allowed",
        "unit": "pro Spiel zugelassen",
        "better": "low"
      }
    ],
    weeks: {
      "1": {
        "cumulative": [
          {
            "abbr": "BUF",
            "values": {
              "passOffEpa": 14.54,
              "turnoverDiff": 2,
              "passDefEpa": 1.5,
              "rushDefYds": 124,
              "pointsFor": 36,
              "pointsAgainst": 31
            },
            "ranks": {
              "passOffEpa": 5,
              "turnoverDiff": 3,
              "passDefEpa": 19,
              "rushDefYds": 20,
              "pointsFor": 5,
              "pointsAgainst": 23
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "MIA",
            "values": {
              "passOffEpa": -5.49,
              "turnoverDiff": 0,
              "passDefEpa": 0.39,
              "rushDefYds": 130,
              "pointsFor": 13,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 25,
              "turnoverDiff": 14,
              "passDefEpa": 16,
              "rushDefYds": 23,
              "pointsFor": 25,
              "pointsAgainst": 18
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "NE",
            "values": {
              "passOffEpa": -4.62,
              "turnoverDiff": -3,
              "passDefEpa": 4.37,
              "rushDefYds": 97,
              "pointsFor": 10,
              "pointsAgainst": 13
            },
            "ranks": {
              "passOffEpa": 22,
              "turnoverDiff": 31,
              "passDefEpa": 21,
              "rushDefYds": 12,
              "pointsFor": 28,
              "pointsAgainst": 6
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "NYJ",
            "values": {
              "passOffEpa": 9.75,
              "turnoverDiff": 1,
              "passDefEpa": -7.35,
              "rushDefYds": 68,
              "pointsFor": 23,
              "pointsAgainst": 10
            },
            "ranks": {
              "passOffEpa": 8,
              "turnoverDiff": 8,
              "passDefEpa": 5,
              "rushDefYds": 4,
              "pointsFor": 18,
              "pointsAgainst": 2
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "BAL",
            "values": {
              "passOffEpa": 10.34,
              "turnoverDiff": 1,
              "passDefEpa": -9.61,
              "rushDefYds": 102,
              "pointsFor": 41,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 7,
              "turnoverDiff": 9,
              "passDefEpa": 4,
              "rushDefYds": 13,
              "pointsFor": 2,
              "pointsAgainst": 14
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "CIN",
            "values": {
              "passOffEpa": -2.63,
              "turnoverDiff": 3,
              "passDefEpa": -5.41,
              "rushDefYds": 89,
              "pointsFor": 33,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 20,
              "turnoverDiff": 1,
              "passDefEpa": 10,
              "rushDefYds": 10,
              "pointsFor": 7,
              "pointsAgainst": 19
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "CLE",
            "values": {
              "passOffEpa": -5.56,
              "turnoverDiff": -2,
              "passDefEpa": 19.02,
              "rushDefYds": 126,
              "pointsFor": 10,
              "pointsAgainst": 34
            },
            "ranks": {
              "passOffEpa": 26,
              "turnoverDiff": 26,
              "passDefEpa": 31,
              "rushDefYds": 22,
              "pointsFor": 29,
              "pointsAgainst": 27
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "PIT",
            "values": {
              "passOffEpa": -9.68,
              "turnoverDiff": 1,
              "passDefEpa": -15.76,
              "rushDefYds": 120,
              "pointsFor": 20,
              "pointsAgainst": 13
            },
            "ranks": {
              "passOffEpa": 30,
              "turnoverDiff": 10,
              "passDefEpa": 1,
              "rushDefYds": 18,
              "pointsFor": 22,
              "pointsAgainst": 7
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "HOU",
            "values": {
              "passOffEpa": 1.5,
              "turnoverDiff": -2,
              "passDefEpa": 14.54,
              "rushDefYds": 86,
              "pointsFor": 31,
              "pointsAgainst": 36
            },
            "ranks": {
              "passOffEpa": 14,
              "turnoverDiff": 27,
              "passDefEpa": 28,
              "rushDefYds": 8,
              "pointsFor": 8,
              "pointsAgainst": 28
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "IND",
            "values": {
              "passOffEpa": -9.61,
              "turnoverDiff": -1,
              "passDefEpa": 10.34,
              "rushDefYds": 202,
              "pointsFor": 23,
              "pointsAgainst": 41
            },
            "ranks": {
              "passOffEpa": 29,
              "turnoverDiff": 20,
              "passDefEpa": 26,
              "rushDefYds": 30,
              "pointsFor": 19,
              "pointsAgainst": 31
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "JAX",
            "values": {
              "passOffEpa": 19.02,
              "turnoverDiff": 2,
              "passDefEpa": -5.56,
              "rushDefYds": 87,
              "pointsFor": 34,
              "pointsAgainst": 10
            },
            "ranks": {
              "passOffEpa": 2,
              "turnoverDiff": 4,
              "passDefEpa": 7,
              "rushDefYds": 9,
              "pointsFor": 6,
              "pointsAgainst": 3
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "TEN",
            "values": {
              "passOffEpa": -7.35,
              "turnoverDiff": -1,
              "passDefEpa": 9.75,
              "rushDefYds": 152,
              "pointsFor": 10,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 28,
              "turnoverDiff": 21,
              "passDefEpa": 25,
              "rushDefYds": 26,
              "pointsFor": 30,
              "pointsAgainst": 15
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "DEN",
            "values": {
              "passOffEpa": -14.38,
              "turnoverDiff": -1,
              "passDefEpa": -2.3,
              "rushDefYds": 220,
              "pointsFor": 10,
              "pointsAgainst": 31
            },
            "ranks": {
              "passOffEpa": 31,
              "turnoverDiff": 22,
              "passDefEpa": 14,
              "rushDefYds": 31,
              "pointsFor": 31,
              "pointsAgainst": 24
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "KC",
            "values": {
              "passOffEpa": -2.3,
              "turnoverDiff": 1,
              "passDefEpa": -14.38,
              "rushDefYds": 61,
              "pointsFor": 31,
              "pointsAgainst": 10
            },
            "ranks": {
              "passOffEpa": 19,
              "turnoverDiff": 11,
              "passDefEpa": 2,
              "rushDefYds": 2,
              "pointsFor": 9,
              "pointsAgainst": 4
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "LV",
            "values": {
              "passOffEpa": 0.39,
              "turnoverDiff": 0,
              "passDefEpa": -5.49,
              "rushDefYds": 74,
              "pointsFor": 27,
              "pointsAgainst": 13
            },
            "ranks": {
              "passOffEpa": 17,
              "turnoverDiff": 15,
              "passDefEpa": 8,
              "rushDefYds": 6,
              "pointsFor": 13,
              "pointsAgainst": 8
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "LAC",
            "values": {
              "passOffEpa": -5.61,
              "turnoverDiff": -2,
              "passDefEpa": 9.01,
              "rushDefYds": 116,
              "pointsFor": 14,
              "pointsAgainst": 26
            },
            "ranks": {
              "passOffEpa": 27,
              "turnoverDiff": 28,
              "passDefEpa": 24,
              "rushDefYds": 17,
              "pointsFor": 24,
              "pointsAgainst": 17
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "DAL",
            "values": {
              "passOffEpa": 10.38,
              "turnoverDiff": 0,
              "passDefEpa": 21.91,
              "rushDefYds": 165,
              "pointsFor": 20,
              "pointsAgainst": 28
            },
            "ranks": {
              "passOffEpa": 6,
              "turnoverDiff": 16,
              "passDefEpa": 32,
              "rushDefYds": 27,
              "pointsFor": 23,
              "pointsAgainst": 21
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "NYG",
            "values": {
              "passOffEpa": 21.91,
              "turnoverDiff": 0,
              "passDefEpa": 10.38,
              "rushDefYds": 69,
              "pointsFor": 28,
              "pointsAgainst": 20
            },
            "ranks": {
              "passOffEpa": 1,
              "turnoverDiff": 17,
              "passDefEpa": 27,
              "rushDefYds": 5,
              "pointsFor": 12,
              "pointsAgainst": 10
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "PHI",
            "values": {
              "passOffEpa": 1.27,
              "turnoverDiff": 0,
              "passDefEpa": 3.91,
              "rushDefYds": 132,
              "pointsFor": 24,
              "pointsAgainst": 22
            },
            "ranks": {
              "passOffEpa": 15,
              "turnoverDiff": 18,
              "passDefEpa": 20,
              "rushDefYds": 24,
              "pointsFor": 17,
              "pointsAgainst": 12
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "WSH",
            "values": {
              "passOffEpa": 3.91,
              "turnoverDiff": 0,
              "passDefEpa": 1.27,
              "rushDefYds": 136,
              "pointsFor": 22,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 13,
              "turnoverDiff": 19,
              "passDefEpa": 18,
              "rushDefYds": 25,
              "pointsFor": 20,
              "pointsAgainst": 16
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "CHI",
            "values": {
              "passOffEpa": 18.57,
              "turnoverDiff": 2,
              "passDefEpa": 15.14,
              "rushDefYds": 125,
              "pointsFor": 59,
              "pointsAgainst": 37
            },
            "ranks": {
              "passOffEpa": 3,
              "turnoverDiff": 5,
              "passDefEpa": 29,
              "rushDefYds": 21,
              "pointsFor": 1,
              "pointsAgainst": 29
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "DET",
            "values": {
              "passOffEpa": 5.85,
              "turnoverDiff": 2,
              "passDefEpa": -1.01,
              "rushDefYds": 91,
              "pointsFor": 31,
              "pointsAgainst": 30
            },
            "ranks": {
              "passOffEpa": 10,
              "turnoverDiff": 6,
              "passDefEpa": 15,
              "rushDefYds": 11,
              "pointsFor": 10,
              "pointsAgainst": 22
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "GB",
            "values": {
              "passOffEpa": -2.7,
              "turnoverDiff": -1,
              "passDefEpa": 0.52,
              "rushDefYds": 107,
              "pointsFor": 22,
              "pointsAgainst": 39
            },
            "ranks": {
              "passOffEpa": 21,
              "turnoverDiff": 23,
              "passDefEpa": 17,
              "rushDefYds": 15,
              "pointsFor": 21,
              "pointsAgainst": 30
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "MIN",
            "values": {
              "passOffEpa": 0.52,
              "turnoverDiff": 1,
              "passDefEpa": -2.7,
              "rushDefYds": 66,
              "pointsFor": 39,
              "pointsAgainst": 22
            },
            "ranks": {
              "passOffEpa": 16,
              "turnoverDiff": 12,
              "passDefEpa": 12,
              "rushDefYds": 3,
              "pointsFor": 3,
              "pointsAgainst": 13
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "ATL",
            "values": {
              "passOffEpa": -15.76,
              "turnoverDiff": -1,
              "passDefEpa": -9.68,
              "rushDefYds": 58,
              "pointsFor": 13,
              "pointsAgainst": 20
            },
            "ranks": {
              "passOffEpa": 32,
              "turnoverDiff": 24,
              "passDefEpa": 3,
              "rushDefYds": 1,
              "pointsFor": 26,
              "pointsAgainst": 11
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "CAR",
            "values": {
              "passOffEpa": 15.14,
              "turnoverDiff": -2,
              "passDefEpa": 18.57,
              "rushDefYds": 291,
              "pointsFor": 37,
              "pointsAgainst": 59
            },
            "ranks": {
              "passOffEpa": 4,
              "turnoverDiff": 29,
              "passDefEpa": 30,
              "rushDefYds": 32,
              "pointsFor": 4,
              "pointsAgainst": 32
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "NO",
            "values": {
              "passOffEpa": -1.01,
              "turnoverDiff": -2,
              "passDefEpa": 5.85,
              "rushDefYds": 165,
              "pointsFor": 30,
              "pointsAgainst": 31
            },
            "ranks": {
              "passOffEpa": 18,
              "turnoverDiff": 30,
              "passDefEpa": 23,
              "rushDefYds": 28,
              "pointsFor": 11,
              "pointsAgainst": 25
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "TB",
            "values": {
              "passOffEpa": -5.41,
              "turnoverDiff": -3,
              "passDefEpa": -2.63,
              "rushDefYds": 106,
              "pointsFor": 27,
              "pointsAgainst": 33
            },
            "ranks": {
              "passOffEpa": 23,
              "turnoverDiff": 32,
              "passDefEpa": 13,
              "rushDefYds": 14,
              "pointsFor": 14,
              "pointsAgainst": 26
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "ARI",
            "values": {
              "passOffEpa": 9.01,
              "turnoverDiff": 2,
              "passDefEpa": -5.61,
              "rushDefYds": 81,
              "pointsFor": 26,
              "pointsAgainst": 14
            },
            "ranks": {
              "passOffEpa": 9,
              "turnoverDiff": 7,
              "passDefEpa": 6,
              "rushDefYds": 7,
              "pointsFor": 16,
              "pointsAgainst": 9
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "LAR",
            "values": {
              "passOffEpa": -5.42,
              "turnoverDiff": -1,
              "passDefEpa": 4.83,
              "rushDefYds": 174,
              "pointsFor": 7,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 24,
              "turnoverDiff": 25,
              "passDefEpa": 22,
              "rushDefYds": 29,
              "pointsFor": 32,
              "pointsAgainst": 20
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "SF",
            "values": {
              "passOffEpa": 4.83,
              "turnoverDiff": 1,
              "passDefEpa": -5.42,
              "rushDefYds": 122,
              "pointsFor": 27,
              "pointsAgainst": 7
            },
            "ranks": {
              "passOffEpa": 11,
              "turnoverDiff": 13,
              "passDefEpa": 9,
              "rushDefYds": 19,
              "pointsFor": 15,
              "pointsAgainst": 1
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "SEA",
            "values": {
              "passOffEpa": 4.37,
              "turnoverDiff": 3,
              "passDefEpa": -4.62,
              "rushDefYds": 109,
              "pointsFor": 13,
              "pointsAgainst": 10
            },
            "ranks": {
              "passOffEpa": 12,
              "turnoverDiff": 2,
              "passDefEpa": 11,
              "rushDefYds": 16,
              "pointsFor": 27,
              "pointsAgainst": 5
            },
            "gamesPlayed": 1
          }
        ],
        "weekly": [
          {
            "abbr": "BUF",
            "values": {
              "passOffEpa": 14.54,
              "turnoverDiff": 2,
              "passDefEpa": 1.5,
              "rushDefYds": 124,
              "pointsFor": 36,
              "pointsAgainst": 31
            },
            "ranks": {
              "passOffEpa": 5,
              "turnoverDiff": 3,
              "passDefEpa": 19,
              "rushDefYds": 20,
              "pointsFor": 5,
              "pointsAgainst": 23
            }
          },
          {
            "abbr": "MIA",
            "values": {
              "passOffEpa": -5.49,
              "turnoverDiff": 0,
              "passDefEpa": 0.39,
              "rushDefYds": 130,
              "pointsFor": 13,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 25,
              "turnoverDiff": 14,
              "passDefEpa": 16,
              "rushDefYds": 23,
              "pointsFor": 25,
              "pointsAgainst": 18
            }
          },
          {
            "abbr": "NE",
            "values": {
              "passOffEpa": -4.62,
              "turnoverDiff": -3,
              "passDefEpa": 4.37,
              "rushDefYds": 97,
              "pointsFor": 10,
              "pointsAgainst": 13
            },
            "ranks": {
              "passOffEpa": 22,
              "turnoverDiff": 31,
              "passDefEpa": 21,
              "rushDefYds": 12,
              "pointsFor": 28,
              "pointsAgainst": 6
            }
          },
          {
            "abbr": "NYJ",
            "values": {
              "passOffEpa": 9.75,
              "turnoverDiff": 1,
              "passDefEpa": -7.35,
              "rushDefYds": 68,
              "pointsFor": 23,
              "pointsAgainst": 10
            },
            "ranks": {
              "passOffEpa": 8,
              "turnoverDiff": 8,
              "passDefEpa": 5,
              "rushDefYds": 4,
              "pointsFor": 18,
              "pointsAgainst": 2
            }
          },
          {
            "abbr": "BAL",
            "values": {
              "passOffEpa": 10.34,
              "turnoverDiff": 1,
              "passDefEpa": -9.61,
              "rushDefYds": 102,
              "pointsFor": 41,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 7,
              "turnoverDiff": 9,
              "passDefEpa": 4,
              "rushDefYds": 13,
              "pointsFor": 2,
              "pointsAgainst": 14
            }
          },
          {
            "abbr": "CIN",
            "values": {
              "passOffEpa": -2.63,
              "turnoverDiff": 3,
              "passDefEpa": -5.41,
              "rushDefYds": 89,
              "pointsFor": 33,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 20,
              "turnoverDiff": 1,
              "passDefEpa": 10,
              "rushDefYds": 10,
              "pointsFor": 7,
              "pointsAgainst": 19
            }
          },
          {
            "abbr": "CLE",
            "values": {
              "passOffEpa": -5.56,
              "turnoverDiff": -2,
              "passDefEpa": 19.02,
              "rushDefYds": 126,
              "pointsFor": 10,
              "pointsAgainst": 34
            },
            "ranks": {
              "passOffEpa": 26,
              "turnoverDiff": 26,
              "passDefEpa": 31,
              "rushDefYds": 22,
              "pointsFor": 29,
              "pointsAgainst": 27
            }
          },
          {
            "abbr": "PIT",
            "values": {
              "passOffEpa": -9.68,
              "turnoverDiff": 1,
              "passDefEpa": -15.76,
              "rushDefYds": 120,
              "pointsFor": 20,
              "pointsAgainst": 13
            },
            "ranks": {
              "passOffEpa": 30,
              "turnoverDiff": 10,
              "passDefEpa": 1,
              "rushDefYds": 18,
              "pointsFor": 22,
              "pointsAgainst": 7
            }
          },
          {
            "abbr": "HOU",
            "values": {
              "passOffEpa": 1.5,
              "turnoverDiff": -2,
              "passDefEpa": 14.54,
              "rushDefYds": 86,
              "pointsFor": 31,
              "pointsAgainst": 36
            },
            "ranks": {
              "passOffEpa": 14,
              "turnoverDiff": 27,
              "passDefEpa": 28,
              "rushDefYds": 8,
              "pointsFor": 8,
              "pointsAgainst": 28
            }
          },
          {
            "abbr": "IND",
            "values": {
              "passOffEpa": -9.61,
              "turnoverDiff": -1,
              "passDefEpa": 10.34,
              "rushDefYds": 202,
              "pointsFor": 23,
              "pointsAgainst": 41
            },
            "ranks": {
              "passOffEpa": 29,
              "turnoverDiff": 20,
              "passDefEpa": 26,
              "rushDefYds": 30,
              "pointsFor": 19,
              "pointsAgainst": 31
            }
          },
          {
            "abbr": "JAX",
            "values": {
              "passOffEpa": 19.02,
              "turnoverDiff": 2,
              "passDefEpa": -5.56,
              "rushDefYds": 87,
              "pointsFor": 34,
              "pointsAgainst": 10
            },
            "ranks": {
              "passOffEpa": 2,
              "turnoverDiff": 4,
              "passDefEpa": 7,
              "rushDefYds": 9,
              "pointsFor": 6,
              "pointsAgainst": 3
            }
          },
          {
            "abbr": "TEN",
            "values": {
              "passOffEpa": -7.35,
              "turnoverDiff": -1,
              "passDefEpa": 9.75,
              "rushDefYds": 152,
              "pointsFor": 10,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 28,
              "turnoverDiff": 21,
              "passDefEpa": 25,
              "rushDefYds": 26,
              "pointsFor": 30,
              "pointsAgainst": 15
            }
          },
          {
            "abbr": "DEN",
            "values": {
              "passOffEpa": -14.38,
              "turnoverDiff": -1,
              "passDefEpa": -2.3,
              "rushDefYds": 220,
              "pointsFor": 10,
              "pointsAgainst": 31
            },
            "ranks": {
              "passOffEpa": 31,
              "turnoverDiff": 22,
              "passDefEpa": 14,
              "rushDefYds": 31,
              "pointsFor": 31,
              "pointsAgainst": 24
            }
          },
          {
            "abbr": "KC",
            "values": {
              "passOffEpa": -2.3,
              "turnoverDiff": 1,
              "passDefEpa": -14.38,
              "rushDefYds": 61,
              "pointsFor": 31,
              "pointsAgainst": 10
            },
            "ranks": {
              "passOffEpa": 19,
              "turnoverDiff": 11,
              "passDefEpa": 2,
              "rushDefYds": 2,
              "pointsFor": 9,
              "pointsAgainst": 4
            }
          },
          {
            "abbr": "LV",
            "values": {
              "passOffEpa": 0.39,
              "turnoverDiff": 0,
              "passDefEpa": -5.49,
              "rushDefYds": 74,
              "pointsFor": 27,
              "pointsAgainst": 13
            },
            "ranks": {
              "passOffEpa": 17,
              "turnoverDiff": 15,
              "passDefEpa": 8,
              "rushDefYds": 6,
              "pointsFor": 13,
              "pointsAgainst": 8
            }
          },
          {
            "abbr": "LAC",
            "values": {
              "passOffEpa": -5.61,
              "turnoverDiff": -2,
              "passDefEpa": 9.01,
              "rushDefYds": 116,
              "pointsFor": 14,
              "pointsAgainst": 26
            },
            "ranks": {
              "passOffEpa": 27,
              "turnoverDiff": 28,
              "passDefEpa": 24,
              "rushDefYds": 17,
              "pointsFor": 24,
              "pointsAgainst": 17
            }
          },
          {
            "abbr": "DAL",
            "values": {
              "passOffEpa": 10.38,
              "turnoverDiff": 0,
              "passDefEpa": 21.91,
              "rushDefYds": 165,
              "pointsFor": 20,
              "pointsAgainst": 28
            },
            "ranks": {
              "passOffEpa": 6,
              "turnoverDiff": 16,
              "passDefEpa": 32,
              "rushDefYds": 27,
              "pointsFor": 23,
              "pointsAgainst": 21
            }
          },
          {
            "abbr": "NYG",
            "values": {
              "passOffEpa": 21.91,
              "turnoverDiff": 0,
              "passDefEpa": 10.38,
              "rushDefYds": 69,
              "pointsFor": 28,
              "pointsAgainst": 20
            },
            "ranks": {
              "passOffEpa": 1,
              "turnoverDiff": 17,
              "passDefEpa": 27,
              "rushDefYds": 5,
              "pointsFor": 12,
              "pointsAgainst": 10
            }
          },
          {
            "abbr": "PHI",
            "values": {
              "passOffEpa": 1.27,
              "turnoverDiff": 0,
              "passDefEpa": 3.91,
              "rushDefYds": 132,
              "pointsFor": 24,
              "pointsAgainst": 22
            },
            "ranks": {
              "passOffEpa": 15,
              "turnoverDiff": 18,
              "passDefEpa": 20,
              "rushDefYds": 24,
              "pointsFor": 17,
              "pointsAgainst": 12
            }
          },
          {
            "abbr": "WSH",
            "values": {
              "passOffEpa": 3.91,
              "turnoverDiff": 0,
              "passDefEpa": 1.27,
              "rushDefYds": 136,
              "pointsFor": 22,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 13,
              "turnoverDiff": 19,
              "passDefEpa": 18,
              "rushDefYds": 25,
              "pointsFor": 20,
              "pointsAgainst": 16
            }
          },
          {
            "abbr": "CHI",
            "values": {
              "passOffEpa": 18.57,
              "turnoverDiff": 2,
              "passDefEpa": 15.14,
              "rushDefYds": 125,
              "pointsFor": 59,
              "pointsAgainst": 37
            },
            "ranks": {
              "passOffEpa": 3,
              "turnoverDiff": 5,
              "passDefEpa": 29,
              "rushDefYds": 21,
              "pointsFor": 1,
              "pointsAgainst": 29
            }
          },
          {
            "abbr": "DET",
            "values": {
              "passOffEpa": 5.85,
              "turnoverDiff": 2,
              "passDefEpa": -1.01,
              "rushDefYds": 91,
              "pointsFor": 31,
              "pointsAgainst": 30
            },
            "ranks": {
              "passOffEpa": 10,
              "turnoverDiff": 6,
              "passDefEpa": 15,
              "rushDefYds": 11,
              "pointsFor": 10,
              "pointsAgainst": 22
            }
          },
          {
            "abbr": "GB",
            "values": {
              "passOffEpa": -2.7,
              "turnoverDiff": -1,
              "passDefEpa": 0.52,
              "rushDefYds": 107,
              "pointsFor": 22,
              "pointsAgainst": 39
            },
            "ranks": {
              "passOffEpa": 21,
              "turnoverDiff": 23,
              "passDefEpa": 17,
              "rushDefYds": 15,
              "pointsFor": 21,
              "pointsAgainst": 30
            }
          },
          {
            "abbr": "MIN",
            "values": {
              "passOffEpa": 0.52,
              "turnoverDiff": 1,
              "passDefEpa": -2.7,
              "rushDefYds": 66,
              "pointsFor": 39,
              "pointsAgainst": 22
            },
            "ranks": {
              "passOffEpa": 16,
              "turnoverDiff": 12,
              "passDefEpa": 12,
              "rushDefYds": 3,
              "pointsFor": 3,
              "pointsAgainst": 13
            }
          },
          {
            "abbr": "ATL",
            "values": {
              "passOffEpa": -15.76,
              "turnoverDiff": -1,
              "passDefEpa": -9.68,
              "rushDefYds": 58,
              "pointsFor": 13,
              "pointsAgainst": 20
            },
            "ranks": {
              "passOffEpa": 32,
              "turnoverDiff": 24,
              "passDefEpa": 3,
              "rushDefYds": 1,
              "pointsFor": 26,
              "pointsAgainst": 11
            }
          },
          {
            "abbr": "CAR",
            "values": {
              "passOffEpa": 15.14,
              "turnoverDiff": -2,
              "passDefEpa": 18.57,
              "rushDefYds": 291,
              "pointsFor": 37,
              "pointsAgainst": 59
            },
            "ranks": {
              "passOffEpa": 4,
              "turnoverDiff": 29,
              "passDefEpa": 30,
              "rushDefYds": 32,
              "pointsFor": 4,
              "pointsAgainst": 32
            }
          },
          {
            "abbr": "NO",
            "values": {
              "passOffEpa": -1.01,
              "turnoverDiff": -2,
              "passDefEpa": 5.85,
              "rushDefYds": 165,
              "pointsFor": 30,
              "pointsAgainst": 31
            },
            "ranks": {
              "passOffEpa": 18,
              "turnoverDiff": 30,
              "passDefEpa": 23,
              "rushDefYds": 28,
              "pointsFor": 11,
              "pointsAgainst": 25
            }
          },
          {
            "abbr": "TB",
            "values": {
              "passOffEpa": -5.41,
              "turnoverDiff": -3,
              "passDefEpa": -2.63,
              "rushDefYds": 106,
              "pointsFor": 27,
              "pointsAgainst": 33
            },
            "ranks": {
              "passOffEpa": 23,
              "turnoverDiff": 32,
              "passDefEpa": 13,
              "rushDefYds": 14,
              "pointsFor": 14,
              "pointsAgainst": 26
            }
          },
          {
            "abbr": "ARI",
            "values": {
              "passOffEpa": 9.01,
              "turnoverDiff": 2,
              "passDefEpa": -5.61,
              "rushDefYds": 81,
              "pointsFor": 26,
              "pointsAgainst": 14
            },
            "ranks": {
              "passOffEpa": 9,
              "turnoverDiff": 7,
              "passDefEpa": 6,
              "rushDefYds": 7,
              "pointsFor": 16,
              "pointsAgainst": 9
            }
          },
          {
            "abbr": "LAR",
            "values": {
              "passOffEpa": -5.42,
              "turnoverDiff": -1,
              "passDefEpa": 4.83,
              "rushDefYds": 174,
              "pointsFor": 7,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 24,
              "turnoverDiff": 25,
              "passDefEpa": 22,
              "rushDefYds": 29,
              "pointsFor": 32,
              "pointsAgainst": 20
            }
          },
          {
            "abbr": "SF",
            "values": {
              "passOffEpa": 4.83,
              "turnoverDiff": 1,
              "passDefEpa": -5.42,
              "rushDefYds": 122,
              "pointsFor": 27,
              "pointsAgainst": 7
            },
            "ranks": {
              "passOffEpa": 11,
              "turnoverDiff": 13,
              "passDefEpa": 9,
              "rushDefYds": 19,
              "pointsFor": 15,
              "pointsAgainst": 1
            }
          },
          {
            "abbr": "SEA",
            "values": {
              "passOffEpa": 4.37,
              "turnoverDiff": 3,
              "passDefEpa": -4.62,
              "rushDefYds": 109,
              "pointsFor": 13,
              "pointsAgainst": 10
            },
            "ranks": {
              "passOffEpa": 12,
              "turnoverDiff": 2,
              "passDefEpa": 11,
              "rushDefYds": 16,
              "pointsFor": 27,
              "pointsAgainst": 5
            }
          }
        ]
      },
      "2": {
        "cumulative": [
          {
            "abbr": "BUF",
            "values": {
              "passOffEpa": 14.79,
              "turnoverDiff": 1,
              "passDefEpa": 10.04,
              "rushDefYds": 95,
              "pointsFor": 38.5,
              "pointsAgainst": 31
            },
            "ranks": {
              "passOffEpa": 1,
              "turnoverDiff": 5,
              "passDefEpa": 28,
              "rushDefYds": 12,
              "pointsFor": 1,
              "pointsAgainst": 28
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "MIA",
            "values": {
              "passOffEpa": -0.52,
              "turnoverDiff": 0,
              "passDefEpa": 11.86,
              "rushDefYds": 112.5,
              "pointsFor": 13,
              "pointsAgainst": 31
            },
            "ranks": {
              "passOffEpa": 21,
              "turnoverDiff": 17,
              "passDefEpa": 29,
              "rushDefYds": 18,
              "pointsFor": 30,
              "pointsAgainst": 29
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "NE",
            "values": {
              "passOffEpa": -2.94,
              "turnoverDiff": -1.5,
              "passDefEpa": -8.73,
              "rushDefYds": 94,
              "pointsFor": 15,
              "pointsAgainst": 8
            },
            "ranks": {
              "passOffEpa": 24,
              "turnoverDiff": 29,
              "passDefEpa": 1,
              "rushDefYds": 11,
              "pointsFor": 26,
              "pointsAgainst": 1
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "NYJ",
            "values": {
              "passOffEpa": 7.02,
              "turnoverDiff": 1,
              "passDefEpa": -5.26,
              "rushDefYds": 65.5,
              "pointsFor": 20,
              "pointsAgainst": 15
            },
            "ranks": {
              "passOffEpa": 9,
              "turnoverDiff": 6,
              "passDefEpa": 6,
              "rushDefYds": 2,
              "pointsFor": 20,
              "pointsAgainst": 6
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "BAL",
            "values": {
              "passOffEpa": 6.83,
              "turnoverDiff": 0,
              "passDefEpa": 0.66,
              "rushDefYds": 83.5,
              "pointsFor": 29,
              "pointsAgainst": 23.5
            },
            "ranks": {
              "passOffEpa": 10,
              "turnoverDiff": 18,
              "passDefEpa": 13,
              "rushDefYds": 5,
              "pointsFor": 7,
              "pointsAgainst": 16
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "CIN",
            "values": {
              "passOffEpa": -1.59,
              "turnoverDiff": 1.5,
              "passDefEpa": -7.54,
              "rushDefYds": 74.5,
              "pointsFor": 26.5,
              "pointsAgainst": 16.5
            },
            "ranks": {
              "passOffEpa": 22,
              "turnoverDiff": 1,
              "passDefEpa": 3,
              "rushDefYds": 3,
              "pointsFor": 10,
              "pointsAgainst": 8
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "CLE",
            "values": {
              "passOffEpa": 2.41,
              "turnoverDiff": -0.5,
              "passDefEpa": 2.73,
              "rushDefYds": 131.5,
              "pointsFor": 16.5,
              "pointsAgainst": 26.5
            },
            "ranks": {
              "passOffEpa": 17,
              "turnoverDiff": 20,
              "passDefEpa": 18,
              "rushDefYds": 26,
              "pointsFor": 24,
              "pointsAgainst": 22
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "PIT",
            "values": {
              "passOffEpa": -15.75,
              "turnoverDiff": 0.5,
              "passDefEpa": -8.51,
              "rushDefYds": 128,
              "pointsFor": 11.5,
              "pointsAgainst": 16.5
            },
            "ranks": {
              "passOffEpa": 31,
              "turnoverDiff": 12,
              "passDefEpa": 2,
              "rushDefYds": 25,
              "pointsFor": 31,
              "pointsAgainst": 9
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "HOU",
            "values": {
              "passOffEpa": -4.08,
              "turnoverDiff": -1,
              "passDefEpa": 6.99,
              "rushDefYds": 85.5,
              "pointsFor": 18.5,
              "pointsAgainst": 28
            },
            "ranks": {
              "passOffEpa": 29,
              "turnoverDiff": 24,
              "passDefEpa": 22,
              "rushDefYds": 6,
              "pointsFor": 21,
              "pointsAgainst": 24
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "IND",
            "values": {
              "passOffEpa": -1.86,
              "turnoverDiff": -1,
              "passDefEpa": 11.88,
              "rushDefYds": 177,
              "pointsFor": 26.5,
              "pointsAgainst": 37
            },
            "ranks": {
              "passOffEpa": 23,
              "turnoverDiff": 25,
              "passDefEpa": 30,
              "rushDefYds": 31,
              "pointsFor": 11,
              "pointsAgainst": 32
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "JAX",
            "values": {
              "passOffEpa": 7.45,
              "turnoverDiff": 1,
              "passDefEpa": 1.44,
              "rushDefYds": 95.5,
              "pointsFor": 23.5,
              "pointsAgainst": 15
            },
            "ranks": {
              "passOffEpa": 7,
              "turnoverDiff": 7,
              "passDefEpa": 15,
              "rushDefYds": 13,
              "pointsFor": 15,
              "pointsAgainst": 7
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "TEN",
            "values": {
              "passOffEpa": -3.72,
              "turnoverDiff": 0.5,
              "passDefEpa": 9.26,
              "rushDefYds": 120.5,
              "pointsFor": 15,
              "pointsAgainst": 23.5
            },
            "ranks": {
              "passOffEpa": 28,
              "turnoverDiff": 13,
              "passDefEpa": 27,
              "rushDefYds": 21,
              "pointsFor": 27,
              "pointsAgainst": 17
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "DEN",
            "values": {
              "passOffEpa": -2.98,
              "turnoverDiff": -0.5,
              "passDefEpa": -3.21,
              "rushDefYds": 157.5,
              "pointsFor": 15,
              "pointsAgainst": 22
            },
            "ranks": {
              "passOffEpa": 26,
              "turnoverDiff": 21,
              "passDefEpa": 10,
              "rushDefYds": 29,
              "pointsFor": 28,
              "pointsAgainst": 13
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "KC",
            "values": {
              "passOffEpa": 5.56,
              "turnoverDiff": 1,
              "passDefEpa": -4.25,
              "rushDefYds": 90,
              "pointsFor": 32,
              "pointsAgainst": 20
            },
            "ranks": {
              "passOffEpa": 12,
              "turnoverDiff": 8,
              "passDefEpa": 7,
              "rushDefYds": 10,
              "pointsFor": 3,
              "pointsAgainst": 11
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "LV",
            "values": {
              "passOffEpa": 3.18,
              "turnoverDiff": 1,
              "passDefEpa": -3.03,
              "rushDefYds": 100.5,
              "pointsFor": 26.5,
              "pointsAgainst": 13.5
            },
            "ranks": {
              "passOffEpa": 16,
              "turnoverDiff": 9,
              "passDefEpa": 11,
              "rushDefYds": 15,
              "pointsFor": 12,
              "pointsAgainst": 5
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "LAC",
            "values": {
              "passOffEpa": -3.09,
              "turnoverDiff": -2,
              "passDefEpa": 7.49,
              "rushDefYds": 86.5,
              "pointsFor": 14,
              "pointsAgainst": 26
            },
            "ranks": {
              "passOffEpa": 27,
              "turnoverDiff": 30,
              "passDefEpa": 24,
              "rushDefYds": 7,
              "pointsFor": 29,
              "pointsAgainst": 21
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "DAL",
            "values": {
              "passOffEpa": 12.74,
              "turnoverDiff": 0.5,
              "passDefEpa": 13.89,
              "rushDefYds": 173.5,
              "pointsFor": 28.5,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 4,
              "turnoverDiff": 14,
              "passDefEpa": 31,
              "rushDefYds": 30,
              "pointsFor": 8,
              "pointsAgainst": 18
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "NYG",
            "values": {
              "passOffEpa": 2.15,
              "turnoverDiff": 0.5,
              "passDefEpa": 14.51,
              "rushDefYds": 116,
              "pointsFor": 17,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 18,
              "turnoverDiff": 15,
              "passDefEpa": 32,
              "rushDefYds": 20,
              "pointsFor": 23,
              "pointsAgainst": 19
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "PHI",
            "values": {
              "passOffEpa": 5.02,
              "turnoverDiff": -1,
              "passDefEpa": 1.9,
              "rushDefYds": 127,
              "pointsFor": 24,
              "pointsAgainst": 21
            },
            "ranks": {
              "passOffEpa": 13,
              "turnoverDiff": 26,
              "passDefEpa": 16,
              "rushDefYds": 24,
              "pointsFor": 13,
              "pointsAgainst": 12
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "WSH",
            "values": {
              "passOffEpa": 4.89,
              "turnoverDiff": -0.5,
              "passDefEpa": 8.19,
              "rushDefYds": 101,
              "pointsFor": 21,
              "pointsAgainst": 30.5
            },
            "ranks": {
              "passOffEpa": 15,
              "turnoverDiff": 22,
              "passDefEpa": 26,
              "rushDefYds": 16,
              "pointsFor": 18,
              "pointsAgainst": 27
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "CHI",
            "values": {
              "passOffEpa": 7.34,
              "turnoverDiff": 0,
              "passDefEpa": 7.83,
              "rushDefYds": 122,
              "pointsFor": 31,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 8,
              "turnoverDiff": 19,
              "passDefEpa": 25,
              "rushDefYds": 23,
              "pointsFor": 4,
              "pointsAgainst": 15
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "DET",
            "values": {
              "passOffEpa": 12.22,
              "turnoverDiff": 1,
              "passDefEpa": 7.02,
              "rushDefYds": 147,
              "pointsFor": 31,
              "pointsAgainst": 35.5
            },
            "ranks": {
              "passOffEpa": 5,
              "turnoverDiff": 10,
              "passDefEpa": 23,
              "rushDefYds": 28,
              "pointsFor": 5,
              "pointsAgainst": 31
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "GB",
            "values": {
              "passOffEpa": -2.94,
              "turnoverDiff": -1,
              "passDefEpa": 2.4,
              "rushDefYds": 87,
              "pointsFor": 21,
              "pointsAgainst": 28
            },
            "ranks": {
              "passOffEpa": 25,
              "turnoverDiff": 27,
              "passDefEpa": 17,
              "rushDefYds": 8,
              "pointsFor": 19,
              "pointsAgainst": 25
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "MIN",
            "values": {
              "passOffEpa": 0.52,
              "turnoverDiff": 1.5,
              "passDefEpa": -3.3,
              "rushDefYds": 100,
              "pointsFor": 24,
              "pointsAgainst": 12.5
            },
            "ranks": {
              "passOffEpa": 19,
              "turnoverDiff": 2,
              "passDefEpa": 8,
              "rushDefYds": 14,
              "pointsFor": 14,
              "pointsAgainst": 4
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "ATL",
            "values": {
              "passOffEpa": -20.41,
              "turnoverDiff": -3,
              "passDefEpa": 0.69,
              "rushDefYds": 63,
              "pointsFor": 8,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 32,
              "turnoverDiff": 32,
              "passDefEpa": 14,
              "rushDefYds": 1,
              "pointsFor": 32,
              "pointsAgainst": 23
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "CAR",
            "values": {
              "passOffEpa": 13.1,
              "turnoverDiff": 1.5,
              "passDefEpa": -3.24,
              "rushDefYds": 224,
              "pointsFor": 35.5,
              "pointsAgainst": 31
            },
            "ranks": {
              "passOffEpa": 3,
              "turnoverDiff": 3,
              "passDefEpa": 9,
              "rushDefYds": 32,
              "pointsFor": 2,
              "pointsAgainst": 30
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "NO",
            "values": {
              "passOffEpa": 4.96,
              "turnoverDiff": -0.5,
              "passDefEpa": 4.59,
              "rushDefYds": 136.5,
              "pointsFor": 27,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 14,
              "turnoverDiff": 23,
              "passDefEpa": 20,
              "rushDefYds": 27,
              "pointsFor": 9,
              "pointsAgainst": 20
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "TB",
            "values": {
              "passOffEpa": -9.49,
              "turnoverDiff": -2,
              "passDefEpa": 3.87,
              "rushDefYds": 75,
              "pointsFor": 23,
              "pointsAgainst": 28
            },
            "ranks": {
              "passOffEpa": 30,
              "turnoverDiff": 31,
              "passDefEpa": 19,
              "rushDefYds": 4,
              "pointsFor": 16,
              "pointsAgainst": 26
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "ARI",
            "values": {
              "passOffEpa": 0.46,
              "turnoverDiff": 1,
              "passDefEpa": 5.24,
              "rushDefYds": 121.5,
              "pointsFor": 16.5,
              "pointsAgainst": 22.5
            },
            "ranks": {
              "passOffEpa": 20,
              "turnoverDiff": 11,
              "passDefEpa": 21,
              "rushDefYds": 22,
              "pointsFor": 25,
              "pointsAgainst": 14
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "LAR",
            "values": {
              "passOffEpa": 6.61,
              "turnoverDiff": -1,
              "passDefEpa": -6.39,
              "rushDefYds": 113,
              "pointsFor": 17.5,
              "pointsAgainst": 16.5
            },
            "ranks": {
              "passOffEpa": 11,
              "turnoverDiff": 28,
              "passDefEpa": 4,
              "rushDefYds": 19,
              "pointsFor": 22,
              "pointsAgainst": 10
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "SF",
            "values": {
              "passOffEpa": 14.08,
              "turnoverDiff": 0.5,
              "passDefEpa": -0.48,
              "rushDefYds": 112,
              "pointsFor": 31,
              "pointsAgainst": 10
            },
            "ranks": {
              "passOffEpa": 2,
              "turnoverDiff": 16,
              "passDefEpa": 12,
              "rushDefYds": 17,
              "pointsFor": 6,
              "pointsAgainst": 3
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "SEA",
            "values": {
              "passOffEpa": 10.23,
              "turnoverDiff": 1.5,
              "passDefEpa": -6.35,
              "rushDefYds": 89.5,
              "pointsFor": 22,
              "pointsAgainst": 8.5
            },
            "ranks": {
              "passOffEpa": 6,
              "turnoverDiff": 4,
              "passDefEpa": 5,
              "rushDefYds": 9,
              "pointsFor": 17,
              "pointsAgainst": 2
            },
            "gamesPlayed": 2
          }
        ],
        "weekly": [
          {
            "abbr": "BUF",
            "values": {
              "passOffEpa": 15.05,
              "turnoverDiff": 0,
              "passDefEpa": 18.58,
              "rushDefYds": 66,
              "pointsFor": 41,
              "pointsAgainst": 31
            },
            "ranks": {
              "passOffEpa": 6,
              "turnoverDiff": 11,
              "passDefEpa": 30,
              "rushDefYds": 7,
              "pointsFor": 1,
              "pointsAgainst": 26
            }
          },
          {
            "abbr": "MIA",
            "values": {
              "passOffEpa": 4.45,
              "turnoverDiff": 0,
              "passDefEpa": 23.33,
              "rushDefYds": 95,
              "pointsFor": 13,
              "pointsAgainst": 35
            },
            "ranks": {
              "passOffEpa": 16,
              "turnoverDiff": 12,
              "passDefEpa": 32,
              "rushDefYds": 15,
              "pointsFor": 24,
              "pointsAgainst": 30
            }
          },
          {
            "abbr": "NE",
            "values": {
              "passOffEpa": -1.26,
              "turnoverDiff": 0,
              "passDefEpa": -21.83,
              "rushDefYds": 91,
              "pointsFor": 20,
              "pointsAgainst": 3
            },
            "ranks": {
              "passOffEpa": 23,
              "turnoverDiff": 13,
              "passDefEpa": 2,
              "rushDefYds": 14,
              "pointsFor": 14,
              "pointsAgainst": 1
            }
          },
          {
            "abbr": "NYJ",
            "values": {
              "passOffEpa": 4.28,
              "turnoverDiff": 1,
              "passDefEpa": -3.17,
              "rushDefYds": 63,
              "pointsFor": 17,
              "pointsAgainst": 20
            },
            "ranks": {
              "passOffEpa": 17,
              "turnoverDiff": 5,
              "passDefEpa": 9,
              "rushDefYds": 5,
              "pointsFor": 21,
              "pointsAgainst": 14
            }
          },
          {
            "abbr": "BAL",
            "values": {
              "passOffEpa": 3.32,
              "turnoverDiff": -1,
              "passDefEpa": 10.93,
              "rushDefYds": 65,
              "pointsFor": 17,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 18,
              "turnoverDiff": 23,
              "passDefEpa": 24,
              "rushDefYds": 6,
              "pointsFor": 22,
              "pointsAgainst": 21
            }
          },
          {
            "abbr": "CIN",
            "values": {
              "passOffEpa": -0.55,
              "turnoverDiff": 0,
              "passDefEpa": -9.66,
              "rushDefYds": 60,
              "pointsFor": 20,
              "pointsAgainst": 6
            },
            "ranks": {
              "passOffEpa": 21,
              "turnoverDiff": 14,
              "passDefEpa": 5,
              "rushDefYds": 4,
              "pointsFor": 15,
              "pointsAgainst": 4
            }
          },
          {
            "abbr": "CLE",
            "values": {
              "passOffEpa": 10.37,
              "turnoverDiff": 1,
              "passDefEpa": -13.56,
              "rushDefYds": 137,
              "pointsFor": 23,
              "pointsAgainst": 19
            },
            "ranks": {
              "passOffEpa": 10,
              "turnoverDiff": 6,
              "passDefEpa": 4,
              "rushDefYds": 26,
              "pointsFor": 13,
              "pointsAgainst": 13
            }
          },
          {
            "abbr": "PIT",
            "values": {
              "passOffEpa": -21.83,
              "turnoverDiff": 0,
              "passDefEpa": -1.26,
              "rushDefYds": 136,
              "pointsFor": 3,
              "pointsAgainst": 20
            },
            "ranks": {
              "passOffEpa": 31,
              "turnoverDiff": 15,
              "passDefEpa": 10,
              "rushDefYds": 25,
              "pointsFor": 30,
              "pointsAgainst": 15
            }
          },
          {
            "abbr": "HOU",
            "values": {
              "passOffEpa": -9.66,
              "turnoverDiff": 0,
              "passDefEpa": -0.55,
              "rushDefYds": 85,
              "pointsFor": 6,
              "pointsAgainst": 20
            },
            "ranks": {
              "passOffEpa": 28,
              "turnoverDiff": 16,
              "passDefEpa": 12,
              "rushDefYds": 12,
              "pointsFor": 28,
              "pointsAgainst": 16
            }
          },
          {
            "abbr": "IND",
            "values": {
              "passOffEpa": 5.89,
              "turnoverDiff": -1,
              "passDefEpa": 13.42,
              "rushDefYds": 152,
              "pointsFor": 30,
              "pointsAgainst": 33
            },
            "ranks": {
              "passOffEpa": 14,
              "turnoverDiff": 24,
              "passDefEpa": 26,
              "rushDefYds": 27,
              "pointsFor": 8,
              "pointsAgainst": 28
            }
          },
          {
            "abbr": "JAX",
            "values": {
              "passOffEpa": -4.12,
              "turnoverDiff": 0,
              "passDefEpa": 8.43,
              "rushDefYds": 104,
              "pointsFor": 13,
              "pointsAgainst": 20
            },
            "ranks": {
              "passOffEpa": 26,
              "turnoverDiff": 17,
              "passDefEpa": 21,
              "rushDefYds": 18,
              "pointsFor": 25,
              "pointsAgainst": 17
            }
          },
          {
            "abbr": "TEN",
            "values": {
              "passOffEpa": -0.1,
              "turnoverDiff": 2,
              "passDefEpa": 8.77,
              "rushDefYds": 89,
              "pointsFor": 20,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 20,
              "turnoverDiff": 2,
              "passDefEpa": 22,
              "rushDefYds": 13,
              "pointsFor": 16,
              "pointsAgainst": 22
            }
          },
          {
            "abbr": "DEN",
            "values": {
              "passOffEpa": 8.43,
              "turnoverDiff": 0,
              "passDefEpa": -4.12,
              "rushDefYds": 95,
              "pointsFor": 20,
              "pointsAgainst": 13
            },
            "ranks": {
              "passOffEpa": 12,
              "turnoverDiff": 18,
              "passDefEpa": 7,
              "rushDefYds": 16,
              "pointsFor": 17,
              "pointsAgainst": 8
            }
          },
          {
            "abbr": "KC",
            "values": {
              "passOffEpa": 13.42,
              "turnoverDiff": 1,
              "passDefEpa": 5.89,
              "rushDefYds": 119,
              "pointsFor": 33,
              "pointsAgainst": 30
            },
            "ranks": {
              "passOffEpa": 7,
              "turnoverDiff": 7,
              "passDefEpa": 19,
              "rushDefYds": 20,
              "pointsFor": 5,
              "pointsAgainst": 25
            }
          },
          {
            "abbr": "LV",
            "values": {
              "passOffEpa": 5.97,
              "turnoverDiff": 2,
              "passDefEpa": -0.56,
              "rushDefYds": 127,
              "pointsFor": 26,
              "pointsAgainst": 14
            },
            "ranks": {
              "passOffEpa": 13,
              "turnoverDiff": 3,
              "passDefEpa": 11,
              "rushDefYds": 23,
              "pointsFor": 10,
              "pointsAgainst": 10
            }
          },
          {
            "abbr": "LAC",
            "values": {
              "passOffEpa": -0.56,
              "turnoverDiff": -2,
              "passDefEpa": 5.97,
              "rushDefYds": 57,
              "pointsFor": 14,
              "pointsAgainst": 26
            },
            "ranks": {
              "passOffEpa": 22,
              "turnoverDiff": 29,
              "passDefEpa": 20,
              "rushDefYds": 3,
              "pointsFor": 23,
              "pointsAgainst": 23
            }
          },
          {
            "abbr": "DAL",
            "values": {
              "passOffEpa": 15.1,
              "turnoverDiff": 1,
              "passDefEpa": 5.86,
              "rushDefYds": 182,
              "pointsFor": 37,
              "pointsAgainst": 20
            },
            "ranks": {
              "passOffEpa": 5,
              "turnoverDiff": 8,
              "passDefEpa": 18,
              "rushDefYds": 31,
              "pointsFor": 2,
              "pointsAgainst": 18
            }
          },
          {
            "abbr": "NYG",
            "values": {
              "passOffEpa": -17.61,
              "turnoverDiff": 1,
              "passDefEpa": 18.63,
              "rushDefYds": 163,
              "pointsFor": 6,
              "pointsAgainst": 28
            },
            "ranks": {
              "passOffEpa": 30,
              "turnoverDiff": 9,
              "passDefEpa": 31,
              "rushDefYds": 30,
              "pointsFor": 29,
              "pointsAgainst": 24
            }
          },
          {
            "abbr": "PHI",
            "values": {
              "passOffEpa": 8.77,
              "turnoverDiff": -2,
              "passDefEpa": -0.1,
              "rushDefYds": 122,
              "pointsFor": 24,
              "pointsAgainst": 20
            },
            "ranks": {
              "passOffEpa": 11,
              "turnoverDiff": 30,
              "passDefEpa": 13,
              "rushDefYds": 22,
              "pointsFor": 11,
              "pointsAgainst": 19
            }
          },
          {
            "abbr": "WSH",
            "values": {
              "passOffEpa": 5.86,
              "turnoverDiff": -1,
              "passDefEpa": 15.1,
              "rushDefYds": 66,
              "pointsFor": 20,
              "pointsAgainst": 37
            },
            "ranks": {
              "passOffEpa": 15,
              "turnoverDiff": 25,
              "passDefEpa": 28,
              "rushDefYds": 8,
              "pointsFor": 18,
              "pointsAgainst": 31
            }
          },
          {
            "abbr": "CHI",
            "values": {
              "passOffEpa": -3.89,
              "turnoverDiff": -2,
              "passDefEpa": 0.51,
              "rushDefYds": 119,
              "pointsFor": 3,
              "pointsAgainst": 9
            },
            "ranks": {
              "passOffEpa": 25,
              "turnoverDiff": 31,
              "passDefEpa": 14,
              "rushDefYds": 21,
              "pointsFor": 31,
              "pointsAgainst": 7
            }
          },
          {
            "abbr": "DET",
            "values": {
              "passOffEpa": 18.58,
              "turnoverDiff": 0,
              "passDefEpa": 15.05,
              "rushDefYds": 203,
              "pointsFor": 31,
              "pointsAgainst": 41
            },
            "ranks": {
              "passOffEpa": 3,
              "turnoverDiff": 19,
              "passDefEpa": 27,
              "rushDefYds": 32,
              "pointsFor": 6,
              "pointsAgainst": 32
            }
          },
          {
            "abbr": "GB",
            "values": {
              "passOffEpa": -3.17,
              "turnoverDiff": -1,
              "passDefEpa": 4.28,
              "rushDefYds": 67,
              "pointsFor": 20,
              "pointsAgainst": 17
            },
            "ranks": {
              "passOffEpa": 24,
              "turnoverDiff": 26,
              "passDefEpa": 16,
              "rushDefYds": 9,
              "pointsFor": 19,
              "pointsAgainst": 11
            }
          },
          {
            "abbr": "MIN",
            "values": {
              "passOffEpa": 0.51,
              "turnoverDiff": 2,
              "passDefEpa": -3.89,
              "rushDefYds": 134,
              "pointsFor": 9,
              "pointsAgainst": 3
            },
            "ranks": {
              "passOffEpa": 19,
              "turnoverDiff": 4,
              "passDefEpa": 8,
              "rushDefYds": 24,
              "pointsFor": 26,
              "pointsAgainst": 2
            }
          },
          {
            "abbr": "ATL",
            "values": {
              "passOffEpa": -25.05,
              "turnoverDiff": -5,
              "passDefEpa": 11.07,
              "rushDefYds": 68,
              "pointsFor": 3,
              "pointsAgainst": 34
            },
            "ranks": {
              "passOffEpa": 32,
              "turnoverDiff": 32,
              "passDefEpa": 25,
              "rushDefYds": 10,
              "pointsFor": 32,
              "pointsAgainst": 29
            }
          },
          {
            "abbr": "CAR",
            "values": {
              "passOffEpa": 11.07,
              "turnoverDiff": 5,
              "passDefEpa": -25.05,
              "rushDefYds": 157,
              "pointsFor": 34,
              "pointsAgainst": 3
            },
            "ranks": {
              "passOffEpa": 8,
              "turnoverDiff": 1,
              "passDefEpa": 1,
              "rushDefYds": 28,
              "pointsFor": 4,
              "pointsAgainst": 3
            }
          },
          {
            "abbr": "NO",
            "values": {
              "passOffEpa": 10.93,
              "turnoverDiff": 1,
              "passDefEpa": 3.32,
              "rushDefYds": 108,
              "pointsFor": 24,
              "pointsAgainst": 17
            },
            "ranks": {
              "passOffEpa": 9,
              "turnoverDiff": 10,
              "passDefEpa": 15,
              "rushDefYds": 19,
              "pointsFor": 12,
              "pointsAgainst": 12
            }
          },
          {
            "abbr": "TB",
            "values": {
              "passOffEpa": -13.56,
              "turnoverDiff": -1,
              "passDefEpa": 10.37,
              "rushDefYds": 44,
              "pointsFor": 19,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 29,
              "turnoverDiff": 27,
              "passDefEpa": 23,
              "rushDefYds": 1,
              "pointsFor": 20,
              "pointsAgainst": 20
            }
          },
          {
            "abbr": "ARI",
            "values": {
              "passOffEpa": -8.08,
              "turnoverDiff": 0,
              "passDefEpa": 16.09,
              "rushDefYds": 162,
              "pointsFor": 7,
              "pointsAgainst": 31
            },
            "ranks": {
              "passOffEpa": 27,
              "turnoverDiff": 20,
              "passDefEpa": 29,
              "rushDefYds": 29,
              "pointsFor": 27,
              "pointsAgainst": 27
            }
          },
          {
            "abbr": "LAR",
            "values": {
              "passOffEpa": 18.63,
              "turnoverDiff": -1,
              "passDefEpa": -17.61,
              "rushDefYds": 52,
              "pointsFor": 28,
              "pointsAgainst": 6
            },
            "ranks": {
              "passOffEpa": 2,
              "turnoverDiff": 28,
              "passDefEpa": 3,
              "rushDefYds": 2,
              "pointsFor": 9,
              "pointsAgainst": 5
            }
          },
          {
            "abbr": "SF",
            "values": {
              "passOffEpa": 23.33,
              "turnoverDiff": 0,
              "passDefEpa": 4.45,
              "rushDefYds": 102,
              "pointsFor": 35,
              "pointsAgainst": 13
            },
            "ranks": {
              "passOffEpa": 1,
              "turnoverDiff": 21,
              "passDefEpa": 17,
              "rushDefYds": 17,
              "pointsFor": 3,
              "pointsAgainst": 9
            }
          },
          {
            "abbr": "SEA",
            "values": {
              "passOffEpa": 16.09,
              "turnoverDiff": 0,
              "passDefEpa": -8.08,
              "rushDefYds": 70,
              "pointsFor": 31,
              "pointsAgainst": 7
            },
            "ranks": {
              "passOffEpa": 4,
              "turnoverDiff": 22,
              "passDefEpa": 6,
              "rushDefYds": 11,
              "pointsFor": 7,
              "pointsAgainst": 6
            }
          }
        ]
      },
      "3": {
        "cumulative": [
          {
            "abbr": "BUF",
            "values": {
              "passOffEpa": 9.72,
              "turnoverDiff": -0.67,
              "passDefEpa": 4.57,
              "rushDefYds": 107,
              "pointsFor": 33.67,
              "pointsAgainst": 26
            },
            "ranks": {
              "passOffEpa": 4,
              "turnoverDiff": 24,
              "passDefEpa": 21,
              "rushDefYds": 16,
              "pointsFor": 1,
              "pointsAgainst": 21
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "MIA",
            "values": {
              "passOffEpa": -1.69,
              "turnoverDiff": -0.33,
              "passDefEpa": 12.22,
              "rushDefYds": 104.33,
              "pointsFor": 12,
              "pointsAgainst": 28.67
            },
            "ranks": {
              "passOffEpa": 21,
              "turnoverDiff": 21,
              "passDefEpa": 31,
              "rushDefYds": 12,
              "pointsFor": 31,
              "pointsAgainst": 28
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "NE",
            "values": {
              "passOffEpa": -6.6,
              "turnoverDiff": -1.67,
              "passDefEpa": -3.3,
              "rushDefYds": 108.33,
              "pointsFor": 12,
              "pointsAgainst": 17
            },
            "ranks": {
              "passOffEpa": 29,
              "turnoverDiff": 28,
              "passDefEpa": 5,
              "rushDefYds": 17,
              "pointsFor": 32,
              "pointsAgainst": 6
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "NYJ",
            "values": {
              "passOffEpa": 8.31,
              "turnoverDiff": 0.33,
              "passDefEpa": 0.54,
              "rushDefYds": 87.33,
              "pointsFor": 21.33,
              "pointsAgainst": 20.33
            },
            "ranks": {
              "passOffEpa": 7,
              "turnoverDiff": 13,
              "passDefEpa": 15,
              "rushDefYds": 7,
              "pointsFor": 17,
              "pointsAgainst": 12
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "BAL",
            "values": {
              "passOffEpa": 8.53,
              "turnoverDiff": 0.33,
              "passDefEpa": 4.88,
              "rushDefYds": 105,
              "pointsFor": 30.67,
              "pointsAgainst": 26
            },
            "ranks": {
              "passOffEpa": 5,
              "turnoverDiff": 14,
              "passDefEpa": 24,
              "rushDefYds": 14,
              "pointsFor": 4,
              "pointsAgainst": 22
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "CIN",
            "values": {
              "passOffEpa": 3.83,
              "turnoverDiff": 0.67,
              "passDefEpa": -2.18,
              "rushDefYds": 95.67,
              "pointsFor": 26.67,
              "pointsAgainst": 21
            },
            "ranks": {
              "passOffEpa": 15,
              "turnoverDiff": 10,
              "passDefEpa": 9,
              "rushDefYds": 9,
              "pointsFor": 12,
              "pointsAgainst": 13
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "CLE",
            "values": {
              "passOffEpa": 2.32,
              "turnoverDiff": -0.33,
              "passDefEpa": -0.15,
              "rushDefYds": 120.33,
              "pointsFor": 18,
              "pointsAgainst": 23.67
            },
            "ranks": {
              "passOffEpa": 17,
              "turnoverDiff": 22,
              "passDefEpa": 14,
              "rushDefYds": 23,
              "pointsFor": 24,
              "pointsAgainst": 18
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "PIT",
            "values": {
              "passOffEpa": -7.66,
              "turnoverDiff": 0.67,
              "passDefEpa": -0.79,
              "rushDefYds": 113,
              "pointsFor": 17.67,
              "pointsAgainst": 20
            },
            "ranks": {
              "passOffEpa": 30,
              "turnoverDiff": 11,
              "passDefEpa": 12,
              "rushDefYds": 18,
              "pointsFor": 26,
              "pointsAgainst": 11
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "HOU",
            "values": {
              "passOffEpa": -3.75,
              "turnoverDiff": 0.33,
              "passDefEpa": 2.37,
              "rushDefYds": 86.67,
              "pointsFor": 18,
              "pointsAgainst": 25
            },
            "ranks": {
              "passOffEpa": 26,
              "turnoverDiff": 15,
              "passDefEpa": 17,
              "rushDefYds": 5,
              "pointsFor": 25,
              "pointsAgainst": 19
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "IND",
            "values": {
              "passOffEpa": -3.53,
              "turnoverDiff": -1.67,
              "passDefEpa": 6.89,
              "rushDefYds": 141.33,
              "pointsFor": 24,
              "pointsAgainst": 30.33
            },
            "ranks": {
              "passOffEpa": 24,
              "turnoverDiff": 29,
              "passDefEpa": 26,
              "rushDefYds": 29,
              "pointsFor": 15,
              "pointsAgainst": 29
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "JAX",
            "values": {
              "passOffEpa": 7.49,
              "turnoverDiff": 1.33,
              "passDefEpa": -3.68,
              "rushDefYds": 91.33,
              "pointsFor": 27.33,
              "pointsAgainst": 12
            },
            "ranks": {
              "passOffEpa": 9,
              "turnoverDiff": 2,
              "passDefEpa": 4,
              "rushDefYds": 8,
              "pointsFor": 10,
              "pointsAgainst": 1
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "TEN",
            "values": {
              "passOffEpa": -4.65,
              "turnoverDiff": -0.33,
              "passDefEpa": 4.14,
              "rushDefYds": 126.33,
              "pointsFor": 12.33,
              "pointsAgainst": 19.67
            },
            "ranks": {
              "passOffEpa": 28,
              "turnoverDiff": 23,
              "passDefEpa": 20,
              "rushDefYds": 24,
              "pointsFor": 30,
              "pointsAgainst": 10
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "DEN",
            "values": {
              "passOffEpa": -2.34,
              "turnoverDiff": 0,
              "passDefEpa": -2.37,
              "rushDefYds": 143.67,
              "pointsFor": 20,
              "pointsAgainst": 23.33
            },
            "ranks": {
              "passOffEpa": 23,
              "turnoverDiff": 16,
              "passDefEpa": 8,
              "rushDefYds": 30,
              "pointsFor": 21,
              "pointsAgainst": 17
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "KC",
            "values": {
              "passOffEpa": 8.02,
              "turnoverDiff": 1,
              "passDefEpa": -4.18,
              "rushDefYds": 99.67,
              "pointsFor": 29.33,
              "pointsAgainst": 16.67
            },
            "ranks": {
              "passOffEpa": 8,
              "turnoverDiff": 4,
              "passDefEpa": 3,
              "rushDefYds": 10,
              "pointsFor": 7,
              "pointsAgainst": 3
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "LV",
            "values": {
              "passOffEpa": 5.12,
              "turnoverDiff": 1.67,
              "passDefEpa": -3.23,
              "rushDefYds": 116.33,
              "pointsFor": 29.33,
              "pointsAgainst": 18
            },
            "ranks": {
              "passOffEpa": 12,
              "turnoverDiff": 1,
              "passDefEpa": 6,
              "rushDefYds": 19,
              "pointsFor": 8,
              "pointsAgainst": 8
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "LAC",
            "values": {
              "passOffEpa": -4.18,
              "turnoverDiff": 0,
              "passDefEpa": 4.86,
              "rushDefYds": 116.33,
              "pointsFor": 14.67,
              "pointsAgainst": 25.33
            },
            "ranks": {
              "passOffEpa": 27,
              "turnoverDiff": 17,
              "passDefEpa": 23,
              "rushDefYds": 20,
              "pointsFor": 29,
              "pointsAgainst": 20
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "DAL",
            "values": {
              "passOffEpa": 12.94,
              "turnoverDiff": 0,
              "passDefEpa": 13.24,
              "rushDefYds": 179.67,
              "pointsFor": 29.33,
              "pointsAgainst": 27.33
            },
            "ranks": {
              "passOffEpa": 2,
              "turnoverDiff": 18,
              "passDefEpa": 32,
              "rushDefYds": 31,
              "pointsFor": 9,
              "pointsAgainst": 25
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "NYG",
            "values": {
              "passOffEpa": -0.6,
              "turnoverDiff": 1,
              "passDefEpa": 7.51,
              "rushDefYds": 104.33,
              "pointsFor": 15.33,
              "pointsAgainst": 18.33
            },
            "ranks": {
              "passOffEpa": 19,
              "turnoverDiff": 5,
              "passDefEpa": 28,
              "rushDefYds": 13,
              "pointsFor": 28,
              "pointsAgainst": 9
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "PHI",
            "values": {
              "passOffEpa": -2.16,
              "turnoverDiff": -1.67,
              "passDefEpa": 3.69,
              "rushDefYds": 127.33,
              "pointsFor": 18.33,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 22,
              "turnoverDiff": 30,
              "passDefEpa": 19,
              "rushDefYds": 25,
              "pointsFor": 23,
              "pointsAgainst": 16
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "WSH",
            "values": {
              "passOffEpa": 4.54,
              "turnoverDiff": 0.67,
              "passDefEpa": 7.13,
              "rushDefYds": 82,
              "pointsFor": 25,
              "pointsAgainst": 30.67
            },
            "ranks": {
              "passOffEpa": 13,
              "turnoverDiff": 12,
              "passDefEpa": 27,
              "rushDefYds": 3,
              "pointsFor": 13,
              "pointsAgainst": 31
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "CHI",
            "values": {
              "passOffEpa": 7.31,
              "turnoverDiff": 1,
              "passDefEpa": -0.29,
              "rushDefYds": 117,
              "pointsFor": 29.67,
              "pointsAgainst": 17.67
            },
            "ranks": {
              "passOffEpa": 10,
              "turnoverDiff": 6,
              "passDefEpa": 13,
              "rushDefYds": 21,
              "pointsFor": 5,
              "pointsAgainst": 7
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "DET",
            "values": {
              "passOffEpa": 12.19,
              "turnoverDiff": 1,
              "passDefEpa": 8.31,
              "rushDefYds": 117.33,
              "pointsFor": 31,
              "pointsAgainst": 31.67
            },
            "ranks": {
              "passOffEpa": 3,
              "turnoverDiff": 7,
              "passDefEpa": 29,
              "rushDefYds": 22,
              "pointsFor": 3,
              "pointsAgainst": 32
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "GB",
            "values": {
              "passOffEpa": -0.77,
              "turnoverDiff": -0.67,
              "passDefEpa": 4.77,
              "rushDefYds": 138.67,
              "pointsFor": 18.67,
              "pointsAgainst": 30.33
            },
            "ranks": {
              "passOffEpa": 20,
              "turnoverDiff": 25,
              "passDefEpa": 22,
              "rushDefYds": 28,
              "pointsFor": 22,
              "pointsAgainst": 30
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "MIN",
            "values": {
              "passOffEpa": -3.69,
              "turnoverDiff": 1.33,
              "passDefEpa": -5.98,
              "rushDefYds": 85.67,
              "pointsFor": 23.67,
              "pointsAgainst": 13.67
            },
            "ranks": {
              "passOffEpa": 25,
              "turnoverDiff": 3,
              "passDefEpa": 1,
              "rushDefYds": 4,
              "pointsFor": 16,
              "pointsAgainst": 2
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "ATL",
            "values": {
              "passOffEpa": -10.43,
              "turnoverDiff": -2,
              "passDefEpa": 1.65,
              "rushDefYds": 47.67,
              "pointsFor": 17,
              "pointsAgainst": 22.67
            },
            "ranks": {
              "passOffEpa": 32,
              "turnoverDiff": 32,
              "passDefEpa": 16,
              "rushDefYds": 1,
              "pointsFor": 27,
              "pointsAgainst": 15
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "CAR",
            "values": {
              "passOffEpa": 6.76,
              "turnoverDiff": 1,
              "passDefEpa": -1.45,
              "rushDefYds": 193.33,
              "pointsFor": 29.67,
              "pointsAgainst": 27.67
            },
            "ranks": {
              "passOffEpa": 11,
              "turnoverDiff": 8,
              "passDefEpa": 10,
              "rushDefYds": 32,
              "pointsFor": 6,
              "pointsAgainst": 26
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "NO",
            "values": {
              "passOffEpa": 2.1,
              "turnoverDiff": -1.33,
              "passDefEpa": 6.05,
              "rushDefYds": 128.67,
              "pointsFor": 27,
              "pointsAgainst": 27.67
            },
            "ranks": {
              "passOffEpa": 18,
              "turnoverDiff": 27,
              "passDefEpa": 25,
              "rushDefYds": 27,
              "pointsFor": 11,
              "pointsAgainst": 27
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "TB",
            "values": {
              "passOffEpa": -10.1,
              "turnoverDiff": -1.67,
              "passDefEpa": -1.45,
              "rushDefYds": 76,
              "pointsFor": 20.67,
              "pointsAgainst": 26.33
            },
            "ranks": {
              "passOffEpa": 31,
              "turnoverDiff": 31,
              "passDefEpa": 11,
              "rushDefYds": 2,
              "pointsFor": 19,
              "pointsAgainst": 23
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "ARI",
            "values": {
              "passOffEpa": 3.67,
              "turnoverDiff": 1,
              "passDefEpa": 11.14,
              "rushDefYds": 127.67,
              "pointsFor": 21,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 16,
              "turnoverDiff": 9,
              "passDefEpa": 30,
              "rushDefYds": 26,
              "pointsFor": 18,
              "pointsAgainst": 24
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "LAR",
            "values": {
              "passOffEpa": 4.17,
              "turnoverDiff": -1,
              "passDefEpa": -4.62,
              "rushDefYds": 101.33,
              "pointsFor": 20.33,
              "pointsAgainst": 21
            },
            "ranks": {
              "passOffEpa": 14,
              "turnoverDiff": 26,
              "passDefEpa": 2,
              "rushDefYds": 11,
              "pointsFor": 20,
              "pointsAgainst": 14
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "SF",
            "values": {
              "passOffEpa": 17.03,
              "turnoverDiff": 0,
              "passDefEpa": 3.04,
              "rushDefYds": 105.67,
              "pointsFor": 32.67,
              "pointsAgainst": 16.67
            },
            "ranks": {
              "passOffEpa": 1,
              "turnoverDiff": 19,
              "passDefEpa": 18,
              "rushDefYds": 15,
              "pointsFor": 2,
              "pointsAgainst": 4
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "SEA",
            "values": {
              "passOffEpa": 8.49,
              "turnoverDiff": 0,
              "passDefEpa": -2.95,
              "rushDefYds": 87,
              "pointsFor": 25,
              "pointsAgainst": 16.67
            },
            "ranks": {
              "passOffEpa": 6,
              "turnoverDiff": 20,
              "passDefEpa": 7,
              "rushDefYds": 6,
              "pointsFor": 14,
              "pointsAgainst": 5
            },
            "gamesPlayed": 3
          }
        ],
        "weekly": [
          {
            "abbr": "BUF",
            "values": {
              "passOffEpa": -0.42,
              "turnoverDiff": -4,
              "passDefEpa": -6.37,
              "rushDefYds": 131,
              "pointsFor": 24,
              "pointsAgainst": 16
            },
            "ranks": {
              "passOffEpa": 18,
              "turnoverDiff": 32,
              "passDefEpa": 7,
              "rushDefYds": 21,
              "pointsFor": 17,
              "pointsAgainst": 7
            }
          },
          {
            "abbr": "MIA",
            "values": {
              "passOffEpa": -4.05,
              "turnoverDiff": -1,
              "passDefEpa": 12.92,
              "rushDefYds": 88,
              "pointsFor": 10,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 23,
              "turnoverDiff": 19,
              "passDefEpa": 29,
              "rushDefYds": 12,
              "pointsFor": 29,
              "pointsAgainst": 14
            }
          },
          {
            "abbr": "NE",
            "values": {
              "passOffEpa": -13.91,
              "turnoverDiff": -2,
              "passDefEpa": 7.56,
              "rushDefYds": 137,
              "pointsFor": 6,
              "pointsAgainst": 35
            },
            "ranks": {
              "passOffEpa": 31,
              "turnoverDiff": 26,
              "passDefEpa": 21,
              "rushDefYds": 24,
              "pointsFor": 32,
              "pointsAgainst": 29
            }
          },
          {
            "abbr": "NYJ",
            "values": {
              "passOffEpa": 10.88,
              "turnoverDiff": -1,
              "passDefEpa": 12.14,
              "rushDefYds": 131,
              "pointsFor": 24,
              "pointsAgainst": 31
            },
            "ranks": {
              "passOffEpa": 7,
              "turnoverDiff": 20,
              "passDefEpa": 28,
              "rushDefYds": 22,
              "pointsFor": 18,
              "pointsAgainst": 24
            }
          },
          {
            "abbr": "BAL",
            "values": {
              "passOffEpa": 11.93,
              "turnoverDiff": 1,
              "passDefEpa": 13.32,
              "rushDefYds": 148,
              "pointsFor": 34,
              "pointsAgainst": 31
            },
            "ranks": {
              "passOffEpa": 6,
              "turnoverDiff": 8,
              "passDefEpa": 30,
              "rushDefYds": 28,
              "pointsFor": 5,
              "pointsAgainst": 25
            }
          },
          {
            "abbr": "CIN",
            "values": {
              "passOffEpa": 14.65,
              "turnoverDiff": -1,
              "passDefEpa": 8.53,
              "rushDefYds": 138,
              "pointsFor": 27,
              "pointsAgainst": 30
            },
            "ranks": {
              "passOffEpa": 2,
              "turnoverDiff": 21,
              "passDefEpa": 22,
              "rushDefYds": 25,
              "pointsFor": 13,
              "pointsAgainst": 21
            }
          },
          {
            "abbr": "CLE",
            "values": {
              "passOffEpa": 2.14,
              "turnoverDiff": 0,
              "passDefEpa": -5.91,
              "rushDefYds": 98,
              "pointsFor": 21,
              "pointsAgainst": 18
            },
            "ranks": {
              "passOffEpa": 17,
              "turnoverDiff": 15,
              "passDefEpa": 9,
              "rushDefYds": 15,
              "pointsFor": 21,
              "pointsAgainst": 10
            }
          },
          {
            "abbr": "PIT",
            "values": {
              "passOffEpa": 8.53,
              "turnoverDiff": 1,
              "passDefEpa": 14.65,
              "rushDefYds": 83,
              "pointsFor": 30,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 11,
              "turnoverDiff": 9,
              "passDefEpa": 31,
              "rushDefYds": 10,
              "pointsFor": 10,
              "pointsAgainst": 18
            }
          },
          {
            "abbr": "HOU",
            "values": {
              "passOffEpa": -3.09,
              "turnoverDiff": 3,
              "passDefEpa": -6.87,
              "rushDefYds": 89,
              "pointsFor": 17,
              "pointsAgainst": 19
            },
            "ranks": {
              "passOffEpa": 21,
              "turnoverDiff": 2,
              "passDefEpa": 5,
              "rushDefYds": 13,
              "pointsFor": 24,
              "pointsAgainst": 11
            }
          },
          {
            "abbr": "IND",
            "values": {
              "passOffEpa": -6.87,
              "turnoverDiff": -3,
              "passDefEpa": -3.09,
              "rushDefYds": 70,
              "pointsFor": 19,
              "pointsAgainst": 17
            },
            "ranks": {
              "passOffEpa": 28,
              "turnoverDiff": 28,
              "passDefEpa": 12,
              "rushDefYds": 5,
              "pointsFor": 22,
              "pointsAgainst": 9
            }
          },
          {
            "abbr": "JAX",
            "values": {
              "passOffEpa": 7.56,
              "turnoverDiff": 2,
              "passDefEpa": -13.91,
              "rushDefYds": 83,
              "pointsFor": 35,
              "pointsAgainst": 6
            },
            "ranks": {
              "passOffEpa": 12,
              "turnoverDiff": 6,
              "passDefEpa": 2,
              "rushDefYds": 11,
              "pointsFor": 2,
              "pointsAgainst": 1
            }
          },
          {
            "abbr": "TEN",
            "values": {
              "passOffEpa": -6.49,
              "turnoverDiff": -2,
              "passDefEpa": -6.11,
              "rushDefYds": 138,
              "pointsFor": 7,
              "pointsAgainst": 12
            },
            "ranks": {
              "passOffEpa": 27,
              "turnoverDiff": 27,
              "passDefEpa": 8,
              "rushDefYds": 26,
              "pointsFor": 30,
              "pointsAgainst": 5
            }
          },
          {
            "abbr": "DEN",
            "values": {
              "passOffEpa": -1.07,
              "turnoverDiff": 1,
              "passDefEpa": -0.69,
              "rushDefYds": 116,
              "pointsFor": 30,
              "pointsAgainst": 26
            },
            "ranks": {
              "passOffEpa": 20,
              "turnoverDiff": 10,
              "passDefEpa": 14,
              "rushDefYds": 18,
              "pointsFor": 11,
              "pointsAgainst": 17
            }
          },
          {
            "abbr": "KC",
            "values": {
              "passOffEpa": 12.92,
              "turnoverDiff": 1,
              "passDefEpa": -4.05,
              "rushDefYds": 119,
              "pointsFor": 24,
              "pointsAgainst": 10
            },
            "ranks": {
              "passOffEpa": 4,
              "turnoverDiff": 11,
              "passDefEpa": 10,
              "rushDefYds": 19,
              "pointsFor": 19,
              "pointsAgainst": 4
            }
          },
          {
            "abbr": "LV",
            "values": {
              "passOffEpa": 8.98,
              "turnoverDiff": 3,
              "passDefEpa": -3.63,
              "rushDefYds": 148,
              "pointsFor": 35,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 10,
              "turnoverDiff": 3,
              "passDefEpa": 11,
              "rushDefYds": 29,
              "pointsFor": 3,
              "pointsAgainst": 19
            }
          },
          {
            "abbr": "LAC",
            "values": {
              "passOffEpa": -6.37,
              "turnoverDiff": 4,
              "passDefEpa": -0.42,
              "rushDefYds": 176,
              "pointsFor": 16,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 26,
              "turnoverDiff": 1,
              "passDefEpa": 15,
              "rushDefYds": 30,
              "pointsFor": 25,
              "pointsAgainst": 15
            }
          },
          {
            "abbr": "DAL",
            "values": {
              "passOffEpa": 13.32,
              "turnoverDiff": -1,
              "passDefEpa": 11.93,
              "rushDefYds": 192,
              "pointsFor": 31,
              "pointsAgainst": 34
            },
            "ranks": {
              "passOffEpa": 3,
              "turnoverDiff": 22,
              "passDefEpa": 27,
              "rushDefYds": 31,
              "pointsFor": 7,
              "pointsAgainst": 28
            }
          },
          {
            "abbr": "NYG",
            "values": {
              "passOffEpa": -6.11,
              "turnoverDiff": 2,
              "passDefEpa": -6.49,
              "rushDefYds": 81,
              "pointsFor": 12,
              "pointsAgainst": 7
            },
            "ranks": {
              "passOffEpa": 25,
              "turnoverDiff": 7,
              "passDefEpa": 6,
              "rushDefYds": 8,
              "pointsFor": 28,
              "pointsAgainst": 2
            }
          },
          {
            "abbr": "PHI",
            "values": {
              "passOffEpa": -16.52,
              "turnoverDiff": -3,
              "passDefEpa": 7.25,
              "rushDefYds": 128,
              "pointsFor": 7,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 32,
              "turnoverDiff": 29,
              "passDefEpa": 20,
              "rushDefYds": 20,
              "pointsFor": 31,
              "pointsAgainst": 20
            }
          },
          {
            "abbr": "WSH",
            "values": {
              "passOffEpa": 3.85,
              "turnoverDiff": 3,
              "passDefEpa": 5.01,
              "rushDefYds": 44,
              "pointsFor": 33,
              "pointsAgainst": 31
            },
            "ranks": {
              "passOffEpa": 15,
              "turnoverDiff": 4,
              "passDefEpa": 19,
              "rushDefYds": 2,
              "pointsFor": 6,
              "pointsAgainst": 26
            }
          },
          {
            "abbr": "CHI",
            "values": {
              "passOffEpa": 7.25,
              "turnoverDiff": 3,
              "passDefEpa": -16.52,
              "rushDefYds": 107,
              "pointsFor": 27,
              "pointsAgainst": 7
            },
            "ranks": {
              "passOffEpa": 13,
              "turnoverDiff": 5,
              "passDefEpa": 1,
              "rushDefYds": 16,
              "pointsFor": 14,
              "pointsAgainst": 3
            }
          },
          {
            "abbr": "DET",
            "values": {
              "passOffEpa": 12.14,
              "turnoverDiff": 1,
              "passDefEpa": 10.88,
              "rushDefYds": 58,
              "pointsFor": 31,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 5,
              "turnoverDiff": 12,
              "passDefEpa": 26,
              "rushDefYds": 4,
              "pointsFor": 8,
              "pointsAgainst": 16
            }
          },
          {
            "abbr": "GB",
            "values": {
              "passOffEpa": 3.57,
              "turnoverDiff": 0,
              "passDefEpa": 9.51,
              "rushDefYds": 242,
              "pointsFor": 14,
              "pointsAgainst": 35
            },
            "ranks": {
              "passOffEpa": 16,
              "turnoverDiff": 16,
              "passDefEpa": 24,
              "rushDefYds": 32,
              "pointsFor": 27,
              "pointsAgainst": 30
            }
          },
          {
            "abbr": "MIN",
            "values": {
              "passOffEpa": -12.09,
              "turnoverDiff": 1,
              "passDefEpa": -11.33,
              "rushDefYds": 57,
              "pointsFor": 23,
              "pointsAgainst": 16
            },
            "ranks": {
              "passOffEpa": 30,
              "turnoverDiff": 13,
              "passDefEpa": 4,
              "rushDefYds": 3,
              "pointsFor": 20,
              "pointsAgainst": 8
            }
          },
          {
            "abbr": "ATL",
            "values": {
              "passOffEpa": 9.51,
              "turnoverDiff": 0,
              "passDefEpa": 3.57,
              "rushDefYds": 17,
              "pointsFor": 35,
              "pointsAgainst": 14
            },
            "ranks": {
              "passOffEpa": 9,
              "turnoverDiff": 17,
              "passDefEpa": 17,
              "rushDefYds": 1,
              "pointsFor": 4,
              "pointsAgainst": 6
            }
          },
          {
            "abbr": "CAR",
            "values": {
              "passOffEpa": -5.91,
              "turnoverDiff": 0,
              "passDefEpa": 2.14,
              "rushDefYds": 132,
              "pointsFor": 18,
              "pointsAgainst": 21
            },
            "ranks": {
              "passOffEpa": 24,
              "turnoverDiff": 18,
              "passDefEpa": 16,
              "rushDefYds": 23,
              "pointsFor": 23,
              "pointsAgainst": 12
            }
          },
          {
            "abbr": "NO",
            "values": {
              "passOffEpa": -3.63,
              "turnoverDiff": -3,
              "passDefEpa": 8.98,
              "rushDefYds": 113,
              "pointsFor": 27,
              "pointsAgainst": 35
            },
            "ranks": {
              "passOffEpa": 22,
              "turnoverDiff": 30,
              "passDefEpa": 23,
              "rushDefYds": 17,
              "pointsFor": 15,
              "pointsAgainst": 31
            }
          },
          {
            "abbr": "TB",
            "values": {
              "passOffEpa": -11.33,
              "turnoverDiff": -1,
              "passDefEpa": -12.09,
              "rushDefYds": 78,
              "pointsFor": 16,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 29,
              "turnoverDiff": 23,
              "passDefEpa": 3,
              "rushDefYds": 6,
              "pointsFor": 26,
              "pointsAgainst": 13
            }
          },
          {
            "abbr": "ARI",
            "values": {
              "passOffEpa": 10.07,
              "turnoverDiff": 1,
              "passDefEpa": 22.93,
              "rushDefYds": 140,
              "pointsFor": 30,
              "pointsAgainst": 36
            },
            "ranks": {
              "passOffEpa": 8,
              "turnoverDiff": 14,
              "passDefEpa": 32,
              "rushDefYds": 27,
              "pointsFor": 12,
              "pointsAgainst": 32
            }
          },
          {
            "abbr": "LAR",
            "values": {
              "passOffEpa": -0.69,
              "turnoverDiff": -1,
              "passDefEpa": -1.07,
              "rushDefYds": 78,
              "pointsFor": 26,
              "pointsAgainst": 30
            },
            "ranks": {
              "passOffEpa": 19,
              "turnoverDiff": 24,
              "passDefEpa": 13,
              "rushDefYds": 7,
              "pointsFor": 16,
              "pointsAgainst": 22
            }
          },
          {
            "abbr": "SF",
            "values": {
              "passOffEpa": 22.93,
              "turnoverDiff": -1,
              "passDefEpa": 10.07,
              "rushDefYds": 93,
              "pointsFor": 36,
              "pointsAgainst": 30
            },
            "ranks": {
              "passOffEpa": 1,
              "turnoverDiff": 25,
              "passDefEpa": 25,
              "rushDefYds": 14,
              "pointsFor": 1,
              "pointsAgainst": 23
            }
          },
          {
            "abbr": "SEA",
            "values": {
              "passOffEpa": 5.01,
              "turnoverDiff": -3,
              "passDefEpa": 3.85,
              "rushDefYds": 82,
              "pointsFor": 31,
              "pointsAgainst": 33
            },
            "ranks": {
              "passOffEpa": 14,
              "turnoverDiff": 31,
              "passDefEpa": 18,
              "rushDefYds": 9,
              "pointsFor": 9,
              "pointsAgainst": 27
            }
          }
        ]
      },
      "4": {
        "cumulative": [
          {
            "abbr": "BUF",
            "values": {
              "passOffEpa": 8.49,
              "turnoverDiff": -0.5,
              "passDefEpa": 6.18,
              "rushDefYds": 116,
              "pointsFor": 31.75,
              "pointsAgainst": 26.75
            },
            "ranks": {
              "passOffEpa": 6,
              "turnoverDiff": 21,
              "passDefEpa": 28,
              "rushDefYds": 19,
              "pointsFor": 1,
              "pointsAgainst": 25
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "MIA",
            "values": {
              "passOffEpa": -4.37,
              "turnoverDiff": -0.5,
              "passDefEpa": 9,
              "rushDefYds": 109,
              "pointsFor": 11.5,
              "pointsAgainst": 25.25
            },
            "ranks": {
              "passOffEpa": 27,
              "turnoverDiff": 22,
              "passDefEpa": 29,
              "rushDefYds": 15,
              "pointsFor": 32,
              "pointsAgainst": 21
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "NE",
            "values": {
              "passOffEpa": -2.19,
              "turnoverDiff": -1.25,
              "passDefEpa": -1.28,
              "rushDefYds": 104,
              "pointsFor": 16.25,
              "pointsAgainst": 19.25
            },
            "ranks": {
              "passOffEpa": 23,
              "turnoverDiff": 27,
              "passDefEpa": 6,
              "rushDefYds": 14,
              "pointsFor": 30,
              "pointsAgainst": 6
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "NYJ",
            "values": {
              "passOffEpa": 5.02,
              "turnoverDiff": 0.75,
              "passDefEpa": 2.39,
              "rushDefYds": 123.5,
              "pointsFor": 19,
              "pointsAgainst": 21
            },
            "ranks": {
              "passOffEpa": 12,
              "turnoverDiff": 4,
              "passDefEpa": 19,
              "rushDefYds": 25,
              "pointsFor": 23,
              "pointsAgainst": 11
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "BAL",
            "values": {
              "passOffEpa": 9.4,
              "turnoverDiff": 0.75,
              "passDefEpa": 3.76,
              "rushDefYds": 100,
              "pointsFor": 29,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 5,
              "turnoverDiff": 5,
              "passDefEpa": 24,
              "rushDefYds": 10,
              "pointsFor": 7,
              "pointsAgainst": 19
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "CIN",
            "values": {
              "passOffEpa": 4.72,
              "turnoverDiff": 0,
              "passDefEpa": 0.68,
              "rushDefYds": 99.5,
              "pointsFor": 24.25,
              "pointsAgainst": 21.25
            },
            "ranks": {
              "passOffEpa": 13,
              "turnoverDiff": 17,
              "passDefEpa": 12,
              "rushDefYds": 8,
              "pointsFor": 14,
              "pointsAgainst": 13
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "CLE",
            "values": {
              "passOffEpa": 4.03,
              "turnoverDiff": -0.25,
              "passDefEpa": 0.49,
              "rushDefYds": 113.25,
              "pointsFor": 20.25,
              "pointsAgainst": 23.75
            },
            "ranks": {
              "passOffEpa": 14,
              "turnoverDiff": 19,
              "passDefEpa": 10,
              "rushDefYds": 18,
              "pointsFor": 21,
              "pointsAgainst": 18
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "PIT",
            "values": {
              "passOffEpa": -5.14,
              "turnoverDiff": 0.5,
              "passDefEpa": 1.7,
              "rushDefYds": 112.75,
              "pointsFor": 19.25,
              "pointsAgainst": 21.75
            },
            "ranks": {
              "passOffEpa": 28,
              "turnoverDiff": 13,
              "passDefEpa": 15,
              "rushDefYds": 17,
              "pointsFor": 22,
              "pointsAgainst": 14
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "HOU",
            "values": {
              "passOffEpa": 0.98,
              "turnoverDiff": 0.25,
              "passDefEpa": 4.24,
              "rushDefYds": 83.75,
              "pointsFor": 21,
              "pointsAgainst": 27.25
            },
            "ranks": {
              "passOffEpa": 19,
              "turnoverDiff": 14,
              "passDefEpa": 25,
              "rushDefYds": 4,
              "pointsFor": 19,
              "pointsAgainst": 26
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "IND",
            "values": {
              "passOffEpa": -5.99,
              "turnoverDiff": -1.5,
              "passDefEpa": 2.81,
              "rushDefYds": 131,
              "pointsFor": 25.5,
              "pointsAgainst": 26
            },
            "ranks": {
              "passOffEpa": 30,
              "turnoverDiff": 31,
              "passDefEpa": 21,
              "rushDefYds": 27,
              "pointsFor": 13,
              "pointsAgainst": 22
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "JAX",
            "values": {
              "passOffEpa": 7.94,
              "turnoverDiff": 1.5,
              "passDefEpa": -0.91,
              "rushDefYds": 74.25,
              "pointsFor": 26,
              "pointsAgainst": 13.25
            },
            "ranks": {
              "passOffEpa": 7,
              "turnoverDiff": 1,
              "passDefEpa": 7,
              "rushDefYds": 2,
              "pointsFor": 12,
              "pointsAgainst": 2
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "TEN",
            "values": {
              "passOffEpa": -3.38,
              "turnoverDiff": -0.75,
              "passDefEpa": 6.1,
              "rushDefYds": 122.75,
              "pointsFor": 13.75,
              "pointsAgainst": 20.75
            },
            "ranks": {
              "passOffEpa": 25,
              "turnoverDiff": 24,
              "passDefEpa": 27,
              "rushDefYds": 24,
              "pointsFor": 31,
              "pointsAgainst": 9
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "DEN",
            "values": {
              "passOffEpa": -0.58,
              "turnoverDiff": -0.25,
              "passDefEpa": 0.35,
              "rushDefYds": 142.75,
              "pointsFor": 18.5,
              "pointsAgainst": 23.5
            },
            "ranks": {
              "passOffEpa": 21,
              "turnoverDiff": 20,
              "passDefEpa": 9,
              "rushDefYds": 30,
              "pointsFor": 26,
              "pointsAgainst": 17
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "KC",
            "values": {
              "passOffEpa": 6.45,
              "turnoverDiff": 1.25,
              "passDefEpa": -0.69,
              "rushDefYds": 92.75,
              "pointsFor": 29.5,
              "pointsAgainst": 19.25
            },
            "ranks": {
              "passOffEpa": 9,
              "turnoverDiff": 2,
              "passDefEpa": 8,
              "rushDefYds": 5,
              "pointsFor": 6,
              "pointsAgainst": 7
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "LV",
            "values": {
              "passOffEpa": 6.28,
              "turnoverDiff": 0.75,
              "passDefEpa": -1.99,
              "rushDefYds": 134.5,
              "pointsFor": 28.75,
              "pointsAgainst": 21
            },
            "ranks": {
              "passOffEpa": 10,
              "turnoverDiff": 6,
              "passDefEpa": 4,
              "rushDefYds": 28,
              "pointsFor": 8,
              "pointsAgainst": 12
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "LAC",
            "values": {
              "passOffEpa": -5.28,
              "turnoverDiff": -0.75,
              "passDefEpa": 2.35,
              "rushDefYds": 121.75,
              "pointsFor": 16.75,
              "pointsAgainst": 26.5
            },
            "ranks": {
              "passOffEpa": 29,
              "turnoverDiff": 25,
              "passDefEpa": 18,
              "rushDefYds": 22,
              "pointsFor": 29,
              "pointsAgainst": 24
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "DAL",
            "values": {
              "passOffEpa": 12.16,
              "turnoverDiff": 0,
              "passDefEpa": 13.72,
              "rushDefYds": 150.25,
              "pointsFor": 30.5,
              "pointsAgainst": 28
            },
            "ranks": {
              "passOffEpa": 3,
              "turnoverDiff": 18,
              "passDefEpa": 32,
              "rushDefYds": 31,
              "pointsFor": 2,
              "pointsAgainst": 29
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "NYG",
            "values": {
              "passOffEpa": 0.52,
              "turnoverDiff": 0.75,
              "passDefEpa": 1.09,
              "rushDefYds": 109,
              "pointsFor": 20.5,
              "pointsAgainst": 19.75
            },
            "ranks": {
              "passOffEpa": 20,
              "turnoverDiff": 7,
              "passDefEpa": 13,
              "rushDefYds": 16,
              "pointsFor": 20,
              "pointsAgainst": 8
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "PHI",
            "values": {
              "passOffEpa": -3.66,
              "turnoverDiff": -0.75,
              "passDefEpa": 3.04,
              "rushDefYds": 122,
              "pointsFor": 18.75,
              "pointsAgainst": 23.25
            },
            "ranks": {
              "passOffEpa": 26,
              "turnoverDiff": 26,
              "passDefEpa": 22,
              "rushDefYds": 23,
              "pointsFor": 25,
              "pointsAgainst": 16
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "WSH",
            "values": {
              "passOffEpa": 1.04,
              "turnoverDiff": 0.75,
              "passDefEpa": 2.01,
              "rushDefYds": 93.5,
              "pointsFor": 22,
              "pointsAgainst": 30.5
            },
            "ranks": {
              "passOffEpa": 18,
              "turnoverDiff": 8,
              "passDefEpa": 17,
              "rushDefYds": 6,
              "pointsFor": 15,
              "pointsAgainst": 31
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "CHI",
            "values": {
              "passOffEpa": 7.47,
              "turnoverDiff": 0.25,
              "passDefEpa": -1.43,
              "rushDefYds": 102.5,
              "pointsFor": 28,
              "pointsAgainst": 16.25
            },
            "ranks": {
              "passOffEpa": 8,
              "turnoverDiff": 15,
              "passDefEpa": 5,
              "rushDefYds": 13,
              "pointsFor": 9,
              "pointsAgainst": 4
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "DET",
            "values": {
              "passOffEpa": 12.22,
              "turnoverDiff": 0.75,
              "passDefEpa": 11.36,
              "rushDefYds": 119.75,
              "pointsFor": 29.75,
              "pointsAgainst": 31.75
            },
            "ranks": {
              "passOffEpa": 2,
              "turnoverDiff": 9,
              "passDefEpa": 31,
              "rushDefYds": 21,
              "pointsFor": 5,
              "pointsAgainst": 32
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "GB",
            "values": {
              "passOffEpa": 1.15,
              "turnoverDiff": -0.5,
              "passDefEpa": 2.5,
              "rushDefYds": 139.25,
              "pointsFor": 18.25,
              "pointsAgainst": 26.25
            },
            "ranks": {
              "passOffEpa": 17,
              "turnoverDiff": 23,
              "passDefEpa": 20,
              "rushDefYds": 29,
              "pointsFor": 27,
              "pointsAgainst": 23
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "MIN",
            "values": {
              "passOffEpa": -2.93,
              "turnoverDiff": 1.25,
              "passDefEpa": -7.59,
              "rushDefYds": 94.5,
              "pointsFor": 21.5,
              "pointsAgainst": 12.75
            },
            "ranks": {
              "passOffEpa": 24,
              "turnoverDiff": 3,
              "passDefEpa": 1,
              "rushDefYds": 7,
              "pointsFor": 17,
              "pointsAgainst": 1
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "ATL",
            "values": {
              "passOffEpa": -10.43,
              "turnoverDiff": -2,
              "passDefEpa": 1.65,
              "rushDefYds": 47.67,
              "pointsFor": 17,
              "pointsAgainst": 22.67
            },
            "ranks": {
              "passOffEpa": 32,
              "turnoverDiff": 32,
              "passDefEpa": 14,
              "rushDefYds": 1,
              "pointsFor": 28,
              "pointsAgainst": 15
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "CAR",
            "values": {
              "passOffEpa": 10.21,
              "turnoverDiff": 0.75,
              "passDefEpa": 1.99,
              "rushDefYds": 156.5,
              "pointsFor": 30.25,
              "pointsAgainst": 27.25
            },
            "ranks": {
              "passOffEpa": 4,
              "turnoverDiff": 10,
              "passDefEpa": 16,
              "rushDefYds": 32,
              "pointsFor": 4,
              "pointsAgainst": 27
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "NO",
            "values": {
              "passOffEpa": 2.1,
              "turnoverDiff": -1.33,
              "passDefEpa": 6.05,
              "rushDefYds": 128.67,
              "pointsFor": 27,
              "pointsAgainst": 27.67
            },
            "ranks": {
              "passOffEpa": 16,
              "turnoverDiff": 30,
              "passDefEpa": 26,
              "rushDefYds": 26,
              "pointsFor": 10,
              "pointsAgainst": 28
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "TB",
            "values": {
              "passOffEpa": -8.66,
              "turnoverDiff": -1.25,
              "passDefEpa": 0.64,
              "rushDefYds": 78.5,
              "pointsFor": 19,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 31,
              "turnoverDiff": 28,
              "passDefEpa": 11,
              "rushDefYds": 3,
              "pointsFor": 24,
              "pointsAgainst": 20
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "ARI",
            "values": {
              "passOffEpa": -1.79,
              "turnoverDiff": 0.75,
              "passDefEpa": 9.32,
              "rushDefYds": 117.5,
              "pointsFor": 21.75,
              "pointsAgainst": 29.25
            },
            "ranks": {
              "passOffEpa": 22,
              "turnoverDiff": 11,
              "passDefEpa": 30,
              "rushDefYds": 20,
              "pointsFor": 16,
              "pointsAgainst": 30
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "LAR",
            "values": {
              "passOffEpa": 3.4,
              "turnoverDiff": -1.25,
              "passDefEpa": -5.5,
              "rushDefYds": 102,
              "pointsFor": 21.25,
              "pointsAgainst": 20.75
            },
            "ranks": {
              "passOffEpa": 15,
              "turnoverDiff": 29,
              "passDefEpa": 2,
              "rushDefYds": 11,
              "pointsFor": 18,
              "pointsAgainst": 10
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "SF",
            "values": {
              "passOffEpa": 14.9,
              "turnoverDiff": 0.25,
              "passDefEpa": 3.46,
              "rushDefYds": 99.75,
              "pointsFor": 30.5,
              "pointsAgainst": 16
            },
            "ranks": {
              "passOffEpa": 1,
              "turnoverDiff": 16,
              "passDefEpa": 23,
              "rushDefYds": 9,
              "pointsFor": 3,
              "pointsAgainst": 3
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "SEA",
            "values": {
              "passOffEpa": 5.07,
              "turnoverDiff": 0.75,
              "passDefEpa": -4.36,
              "rushDefYds": 102,
              "pointsFor": 26.25,
              "pointsAgainst": 18.25
            },
            "ranks": {
              "passOffEpa": 11,
              "turnoverDiff": 12,
              "passDefEpa": 3,
              "rushDefYds": 12,
              "pointsFor": 11,
              "pointsAgainst": 5
            },
            "gamesPlayed": 4
          }
        ],
        "weekly": [
          {
            "abbr": "BUF",
            "values": {
              "passOffEpa": 4.78,
              "turnoverDiff": 0,
              "passDefEpa": 11.03,
              "rushDefYds": 143,
              "pointsFor": 26,
              "pointsAgainst": 29
            },
            "ranks": {
              "passOffEpa": 14,
              "turnoverDiff": 10,
              "passDefEpa": 26,
              "rushDefYds": 27,
              "pointsFor": 11,
              "pointsAgainst": 23
            }
          },
          {
            "abbr": "MIA",
            "values": {
              "passOffEpa": -12.41,
              "turnoverDiff": -1,
              "passDefEpa": -0.66,
              "rushDefYds": 123,
              "pointsFor": 10,
              "pointsAgainst": 15
            },
            "ranks": {
              "passOffEpa": 28,
              "turnoverDiff": 22,
              "passDefEpa": 10,
              "rushDefYds": 20,
              "pointsFor": 30,
              "pointsAgainst": 6
            }
          },
          {
            "abbr": "NE",
            "values": {
              "passOffEpa": 11.03,
              "turnoverDiff": 0,
              "passDefEpa": 4.78,
              "rushDefYds": 91,
              "pointsFor": 29,
              "pointsAgainst": 26
            },
            "ranks": {
              "passOffEpa": 5,
              "turnoverDiff": 11,
              "passDefEpa": 17,
              "rushDefYds": 11,
              "pointsFor": 8,
              "pointsAgainst": 19
            }
          },
          {
            "abbr": "NYJ",
            "values": {
              "passOffEpa": -4.86,
              "turnoverDiff": 2,
              "passDefEpa": 7.94,
              "rushDefYds": 232,
              "pointsFor": 12,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 23,
              "turnoverDiff": 2,
              "passDefEpa": 20,
              "rushDefYds": 30,
              "pointsFor": 29,
              "pointsAgainst": 12
            }
          },
          {
            "abbr": "BAL",
            "values": {
              "passOffEpa": 12,
              "turnoverDiff": 2,
              "passDefEpa": 0.42,
              "rushDefYds": 85,
              "pointsFor": 24,
              "pointsAgainst": 18
            },
            "ranks": {
              "passOffEpa": 4,
              "turnoverDiff": 3,
              "passDefEpa": 11,
              "rushDefYds": 8,
              "pointsFor": 13,
              "pointsAgainst": 9
            }
          },
          {
            "abbr": "CIN",
            "values": {
              "passOffEpa": 7.39,
              "turnoverDiff": -2,
              "passDefEpa": 9.28,
              "rushDefYds": 111,
              "pointsFor": 17,
              "pointsAgainst": 22
            },
            "ranks": {
              "passOffEpa": 12,
              "turnoverDiff": 25,
              "passDefEpa": 23,
              "rushDefYds": 16,
              "pointsFor": 23,
              "pointsAgainst": 11
            }
          },
          {
            "abbr": "CLE",
            "values": {
              "passOffEpa": 9.18,
              "turnoverDiff": 0,
              "passDefEpa": 2.42,
              "rushDefYds": 92,
              "pointsFor": 27,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 9,
              "turnoverDiff": 12,
              "passDefEpa": 14,
              "rushDefYds": 12,
              "pointsFor": 9,
              "pointsAgainst": 14
            }
          },
          {
            "abbr": "PIT",
            "values": {
              "passOffEpa": 2.42,
              "turnoverDiff": 0,
              "passDefEpa": 9.18,
              "rushDefYds": 112,
              "pointsFor": 24,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 17,
              "turnoverDiff": 13,
              "passDefEpa": 22,
              "rushDefYds": 17,
              "pointsFor": 14,
              "pointsAgainst": 21
            }
          },
          {
            "abbr": "HOU",
            "values": {
              "passOffEpa": 15.18,
              "turnoverDiff": 0,
              "passDefEpa": 9.83,
              "rushDefYds": 75,
              "pointsFor": 30,
              "pointsAgainst": 34
            },
            "ranks": {
              "passOffEpa": 2,
              "turnoverDiff": 14,
              "passDefEpa": 25,
              "rushDefYds": 6,
              "pointsFor": 4,
              "pointsAgainst": 29
            }
          },
          {
            "abbr": "IND",
            "values": {
              "passOffEpa": -13.36,
              "turnoverDiff": -1,
              "passDefEpa": -9.45,
              "rushDefYds": 100,
              "pointsFor": 30,
              "pointsAgainst": 13
            },
            "ranks": {
              "passOffEpa": 29,
              "turnoverDiff": 23,
              "passDefEpa": 4,
              "rushDefYds": 13,
              "pointsFor": 5,
              "pointsAgainst": 3
            }
          },
          {
            "abbr": "JAX",
            "values": {
              "passOffEpa": 9.28,
              "turnoverDiff": 2,
              "passDefEpa": 7.39,
              "rushDefYds": 23,
              "pointsFor": 22,
              "pointsAgainst": 17
            },
            "ranks": {
              "passOffEpa": 8,
              "turnoverDiff": 4,
              "passDefEpa": 19,
              "rushDefYds": 1,
              "pointsFor": 20,
              "pointsAgainst": 7
            }
          },
          {
            "abbr": "TEN",
            "values": {
              "passOffEpa": 0.42,
              "turnoverDiff": -2,
              "passDefEpa": 12,
              "rushDefYds": 112,
              "pointsFor": 18,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 20,
              "turnoverDiff": 26,
              "passDefEpa": 27,
              "rushDefYds": 18,
              "pointsFor": 22,
              "pointsAgainst": 15
            }
          },
          {
            "abbr": "DEN",
            "values": {
              "passOffEpa": 4.72,
              "turnoverDiff": -1,
              "passDefEpa": 8.5,
              "rushDefYds": 140,
              "pointsFor": 14,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 15,
              "turnoverDiff": 24,
              "passDefEpa": 21,
              "rushDefYds": 25,
              "pointsFor": 26,
              "pointsAgainst": 16
            }
          },
          {
            "abbr": "KC",
            "values": {
              "passOffEpa": 1.74,
              "turnoverDiff": 2,
              "passDefEpa": 9.78,
              "rushDefYds": 72,
              "pointsFor": 30,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 18,
              "turnoverDiff": 5,
              "passDefEpa": 24,
              "rushDefYds": 5,
              "pointsFor": 6,
              "pointsAgainst": 22
            }
          },
          {
            "abbr": "LV",
            "values": {
              "passOffEpa": 9.78,
              "turnoverDiff": -2,
              "passDefEpa": 1.74,
              "rushDefYds": 189,
              "pointsFor": 27,
              "pointsAgainst": 30
            },
            "ranks": {
              "passOffEpa": 7,
              "turnoverDiff": 27,
              "passDefEpa": 13,
              "rushDefYds": 29,
              "pointsFor": 10,
              "pointsAgainst": 24
            }
          },
          {
            "abbr": "LAC",
            "values": {
              "passOffEpa": -8.6,
              "turnoverDiff": -3,
              "passDefEpa": -5.18,
              "rushDefYds": 138,
              "pointsFor": 23,
              "pointsAgainst": 30
            },
            "ranks": {
              "passOffEpa": 26,
              "turnoverDiff": 30,
              "passDefEpa": 7,
              "rushDefYds": 24,
              "pointsFor": 18,
              "pointsAgainst": 25
            }
          },
          {
            "abbr": "DAL",
            "values": {
              "passOffEpa": 9.83,
              "turnoverDiff": 0,
              "passDefEpa": 15.18,
              "rushDefYds": 62,
              "pointsFor": 34,
              "pointsAgainst": 30
            },
            "ranks": {
              "passOffEpa": 6,
              "turnoverDiff": 15,
              "passDefEpa": 29,
              "rushDefYds": 4,
              "pointsFor": 2,
              "pointsAgainst": 26
            }
          },
          {
            "abbr": "NYG",
            "values": {
              "passOffEpa": 3.88,
              "turnoverDiff": 0,
              "passDefEpa": -18.16,
              "rushDefYds": 123,
              "pointsFor": 36,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 16,
              "turnoverDiff": 16,
              "passDefEpa": 1,
              "rushDefYds": 21,
              "pointsFor": 1,
              "pointsAgainst": 17
            }
          },
          {
            "abbr": "PHI",
            "values": {
              "passOffEpa": -8.15,
              "turnoverDiff": 2,
              "passDefEpa": 1.1,
              "rushDefYds": 106,
              "pointsFor": 20,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 25,
              "turnoverDiff": 6,
              "passDefEpa": 12,
              "rushDefYds": 15,
              "pointsFor": 21,
              "pointsAgainst": 18
            }
          },
          {
            "abbr": "WSH",
            "values": {
              "passOffEpa": -9.45,
              "turnoverDiff": 1,
              "passDefEpa": -13.36,
              "rushDefYds": 128,
              "pointsFor": 13,
              "pointsAgainst": 30
            },
            "ranks": {
              "passOffEpa": 27,
              "turnoverDiff": 7,
              "passDefEpa": 2,
              "rushDefYds": 23,
              "pointsFor": 28,
              "pointsAgainst": 27
            }
          },
          {
            "abbr": "CHI",
            "values": {
              "passOffEpa": 7.94,
              "turnoverDiff": -2,
              "passDefEpa": -4.86,
              "rushDefYds": 59,
              "pointsFor": 23,
              "pointsAgainst": 12
            },
            "ranks": {
              "passOffEpa": 11,
              "turnoverDiff": 28,
              "passDefEpa": 8,
              "rushDefYds": 3,
              "pointsFor": 19,
              "pointsAgainst": 2
            }
          },
          {
            "abbr": "DET",
            "values": {
              "passOffEpa": 12.32,
              "turnoverDiff": 0,
              "passDefEpa": 20.53,
              "rushDefYds": 127,
              "pointsFor": 26,
              "pointsAgainst": 32
            },
            "ranks": {
              "passOffEpa": 3,
              "turnoverDiff": 17,
              "passDefEpa": 30,
              "rushDefYds": 22,
              "pointsFor": 12,
              "pointsAgainst": 28
            }
          },
          {
            "abbr": "GB",
            "values": {
              "passOffEpa": 6.91,
              "turnoverDiff": 0,
              "passDefEpa": -4.32,
              "rushDefYds": 141,
              "pointsFor": 17,
              "pointsAgainst": 14
            },
            "ranks": {
              "passOffEpa": 13,
              "turnoverDiff": 18,
              "passDefEpa": 9,
              "rushDefYds": 26,
              "pointsFor": 24,
              "pointsAgainst": 4
            }
          },
          {
            "abbr": "MIN",
            "values": {
              "passOffEpa": -0.66,
              "turnoverDiff": 1,
              "passDefEpa": -12.41,
              "rushDefYds": 121,
              "pointsFor": 15,
              "pointsAgainst": 10
            },
            "ranks": {
              "passOffEpa": 21,
              "turnoverDiff": 8,
              "passDefEpa": 3,
              "rushDefYds": 19,
              "pointsFor": 25,
              "pointsAgainst": 1
            }
          },
          {
            "abbr": "ATL",
            "values": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefYds": null,
              "pointsFor": null,
              "pointsAgainst": null
            },
            "ranks": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefYds": null,
              "pointsFor": null,
              "pointsAgainst": null
            }
          },
          {
            "abbr": "CAR",
            "values": {
              "passOffEpa": 20.53,
              "turnoverDiff": 0,
              "passDefEpa": 12.32,
              "rushDefYds": 46,
              "pointsFor": 32,
              "pointsAgainst": 26
            },
            "ranks": {
              "passOffEpa": 1,
              "turnoverDiff": 19,
              "passDefEpa": 28,
              "rushDefYds": 2,
              "pointsFor": 3,
              "pointsAgainst": 20
            }
          },
          {
            "abbr": "NO",
            "values": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefYds": null,
              "pointsFor": null,
              "pointsAgainst": null
            },
            "ranks": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefYds": null,
              "pointsFor": null,
              "pointsAgainst": null
            }
          },
          {
            "abbr": "TB",
            "values": {
              "passOffEpa": -4.32,
              "turnoverDiff": 0,
              "passDefEpa": 6.91,
              "rushDefYds": 86,
              "pointsFor": 14,
              "pointsAgainst": 17
            },
            "ranks": {
              "passOffEpa": 22,
              "turnoverDiff": 20,
              "passDefEpa": 18,
              "rushDefYds": 9,
              "pointsFor": 27,
              "pointsAgainst": 8
            }
          },
          {
            "abbr": "ARI",
            "values": {
              "passOffEpa": -18.16,
              "turnoverDiff": 0,
              "passDefEpa": 3.88,
              "rushDefYds": 87,
              "pointsFor": 24,
              "pointsAgainst": 36
            },
            "ranks": {
              "passOffEpa": 30,
              "turnoverDiff": 21,
              "passDefEpa": 15,
              "rushDefYds": 10,
              "pointsFor": 15,
              "pointsAgainst": 30
            }
          },
          {
            "abbr": "LAR",
            "values": {
              "passOffEpa": 1.1,
              "turnoverDiff": -2,
              "passDefEpa": -8.15,
              "rushDefYds": 104,
              "pointsFor": 24,
              "pointsAgainst": 20
            },
            "ranks": {
              "passOffEpa": 19,
              "turnoverDiff": 29,
              "passDefEpa": 6,
              "rushDefYds": 14,
              "pointsFor": 16,
              "pointsAgainst": 10
            }
          },
          {
            "abbr": "SF",
            "values": {
              "passOffEpa": 8.5,
              "turnoverDiff": 1,
              "passDefEpa": 4.72,
              "rushDefYds": 82,
              "pointsFor": 24,
              "pointsAgainst": 14
            },
            "ranks": {
              "passOffEpa": 10,
              "turnoverDiff": 9,
              "passDefEpa": 16,
              "rushDefYds": 7,
              "pointsFor": 17,
              "pointsAgainst": 5
            }
          },
          {
            "abbr": "SEA",
            "values": {
              "passOffEpa": -5.18,
              "turnoverDiff": 3,
              "passDefEpa": -8.6,
              "rushDefYds": 147,
              "pointsFor": 30,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 24,
              "turnoverDiff": 1,
              "passDefEpa": 5,
              "rushDefYds": 28,
              "pointsFor": 7,
              "pointsAgainst": 13
            }
          }
        ]
      }
    }
  }
};
