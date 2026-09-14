// ============================================================
//  NFL_POWER_SCORE — "Bootleg Power Score" Spinnennetz (nflverse)
// ============================================================
//  AUTO-GENERIERT von scripts/sync-nfl-power-score.js über die GitHub
//  Action ".github/workflows/sync-nfl-power-score.yml". Nicht von Hand
//  editieren — Änderungen werden beim nächsten Sync überschrieben.
//  Zuletzt synchronisiert: 2026-09-14T14:39:02.672Z
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
              "passDefEpa": 17,
              "rushDefYds": 19,
              "pointsFor": 5,
              "pointsAgainst": 22
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
              "passOffEpa": 24,
              "turnoverDiff": 13,
              "passDefEpa": 14,
              "rushDefYds": 22,
              "pointsFor": 24,
              "pointsAgainst": 17
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
              "passOffEpa": 21,
              "turnoverDiff": 29,
              "passDefEpa": 19,
              "rushDefYds": 11,
              "pointsFor": 27,
              "pointsAgainst": 5
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
              "passDefEpa": 4,
              "rushDefYds": 3,
              "pointsFor": 17,
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
              "passDefEpa": 3,
              "rushDefYds": 12,
              "pointsFor": 2,
              "pointsAgainst": 13
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
              "passOffEpa": 19,
              "turnoverDiff": 1,
              "passDefEpa": 9,
              "rushDefYds": 9,
              "pointsFor": 7,
              "pointsAgainst": 18
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
              "passOffEpa": 25,
              "turnoverDiff": 24,
              "passDefEpa": 29,
              "rushDefYds": 21,
              "pointsFor": 28,
              "pointsAgainst": 25
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
              "passOffEpa": 29,
              "turnoverDiff": 10,
              "passDefEpa": 1,
              "rushDefYds": 17,
              "pointsFor": 21,
              "pointsAgainst": 6
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
              "turnoverDiff": 25,
              "passDefEpa": 26,
              "rushDefYds": 7,
              "pointsFor": 8,
              "pointsAgainst": 26
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
              "passOffEpa": 28,
              "turnoverDiff": 19,
              "passDefEpa": 24,
              "rushDefYds": 29,
              "pointsFor": 18,
              "pointsAgainst": 29
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
              "passDefEpa": 6,
              "rushDefYds": 8,
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
              "passOffEpa": 27,
              "turnoverDiff": 20,
              "passDefEpa": 23,
              "rushDefYds": 25,
              "pointsFor": 29,
              "pointsAgainst": 14
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "DEN",
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
            },
            "gamesPlayed": 0
          },
          {
            "abbr": "KC",
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
            },
            "gamesPlayed": 0
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
              "turnoverDiff": 14,
              "passDefEpa": 7,
              "rushDefYds": 5,
              "pointsFor": 12,
              "pointsAgainst": 7
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
              "passOffEpa": 26,
              "turnoverDiff": 26,
              "passDefEpa": 22,
              "rushDefYds": 16,
              "pointsFor": 23,
              "pointsAgainst": 16
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
              "turnoverDiff": 15,
              "passDefEpa": 30,
              "rushDefYds": 26,
              "pointsFor": 22,
              "pointsAgainst": 20
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
              "turnoverDiff": 16,
              "passDefEpa": 25,
              "rushDefYds": 4,
              "pointsFor": 11,
              "pointsAgainst": 9
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
              "turnoverDiff": 17,
              "passDefEpa": 18,
              "rushDefYds": 23,
              "pointsFor": 16,
              "pointsAgainst": 11
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
              "turnoverDiff": 18,
              "passDefEpa": 16,
              "rushDefYds": 24,
              "pointsFor": 19,
              "pointsAgainst": 15
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
              "passDefEpa": 27,
              "rushDefYds": 20,
              "pointsFor": 1,
              "pointsAgainst": 27
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
              "passDefEpa": 13,
              "rushDefYds": 10,
              "pointsFor": 9,
              "pointsAgainst": 21
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
              "passOffEpa": 20,
              "turnoverDiff": 21,
              "passDefEpa": 15,
              "rushDefYds": 14,
              "pointsFor": 20,
              "pointsAgainst": 28
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
              "turnoverDiff": 11,
              "passDefEpa": 11,
              "rushDefYds": 2,
              "pointsFor": 3,
              "pointsAgainst": 12
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
              "passOffEpa": 30,
              "turnoverDiff": 22,
              "passDefEpa": 2,
              "rushDefYds": 1,
              "pointsFor": 25,
              "pointsAgainst": 10
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
              "turnoverDiff": 27,
              "passDefEpa": 28,
              "rushDefYds": 30,
              "pointsFor": 4,
              "pointsAgainst": 30
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
              "turnoverDiff": 28,
              "passDefEpa": 21,
              "rushDefYds": 27,
              "pointsFor": 10,
              "pointsAgainst": 23
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
              "passOffEpa": 22,
              "turnoverDiff": 30,
              "passDefEpa": 12,
              "rushDefYds": 13,
              "pointsFor": 13,
              "pointsAgainst": 24
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
              "passDefEpa": 5,
              "rushDefYds": 6,
              "pointsFor": 15,
              "pointsAgainst": 8
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
              "passOffEpa": 23,
              "turnoverDiff": 23,
              "passDefEpa": 20,
              "rushDefYds": 28,
              "pointsFor": 30,
              "pointsAgainst": 19
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
              "turnoverDiff": 12,
              "passDefEpa": 8,
              "rushDefYds": 18,
              "pointsFor": 14,
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
              "passDefEpa": 10,
              "rushDefYds": 15,
              "pointsFor": 26,
              "pointsAgainst": 4
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
              "passDefEpa": 17,
              "rushDefYds": 19,
              "pointsFor": 5,
              "pointsAgainst": 22
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
              "passOffEpa": 24,
              "turnoverDiff": 13,
              "passDefEpa": 14,
              "rushDefYds": 22,
              "pointsFor": 24,
              "pointsAgainst": 17
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
              "passOffEpa": 21,
              "turnoverDiff": 29,
              "passDefEpa": 19,
              "rushDefYds": 11,
              "pointsFor": 27,
              "pointsAgainst": 5
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
              "passDefEpa": 4,
              "rushDefYds": 3,
              "pointsFor": 17,
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
              "passDefEpa": 3,
              "rushDefYds": 12,
              "pointsFor": 2,
              "pointsAgainst": 13
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
              "passOffEpa": 19,
              "turnoverDiff": 1,
              "passDefEpa": 9,
              "rushDefYds": 9,
              "pointsFor": 7,
              "pointsAgainst": 18
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
              "passOffEpa": 25,
              "turnoverDiff": 24,
              "passDefEpa": 29,
              "rushDefYds": 21,
              "pointsFor": 28,
              "pointsAgainst": 25
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
              "passOffEpa": 29,
              "turnoverDiff": 10,
              "passDefEpa": 1,
              "rushDefYds": 17,
              "pointsFor": 21,
              "pointsAgainst": 6
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
              "turnoverDiff": 25,
              "passDefEpa": 26,
              "rushDefYds": 7,
              "pointsFor": 8,
              "pointsAgainst": 26
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
              "passOffEpa": 28,
              "turnoverDiff": 19,
              "passDefEpa": 24,
              "rushDefYds": 29,
              "pointsFor": 18,
              "pointsAgainst": 29
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
              "passDefEpa": 6,
              "rushDefYds": 8,
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
              "passOffEpa": 27,
              "turnoverDiff": 20,
              "passDefEpa": 23,
              "rushDefYds": 25,
              "pointsFor": 29,
              "pointsAgainst": 14
            }
          },
          {
            "abbr": "DEN",
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
            "abbr": "KC",
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
              "turnoverDiff": 14,
              "passDefEpa": 7,
              "rushDefYds": 5,
              "pointsFor": 12,
              "pointsAgainst": 7
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
              "passOffEpa": 26,
              "turnoverDiff": 26,
              "passDefEpa": 22,
              "rushDefYds": 16,
              "pointsFor": 23,
              "pointsAgainst": 16
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
              "turnoverDiff": 15,
              "passDefEpa": 30,
              "rushDefYds": 26,
              "pointsFor": 22,
              "pointsAgainst": 20
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
              "turnoverDiff": 16,
              "passDefEpa": 25,
              "rushDefYds": 4,
              "pointsFor": 11,
              "pointsAgainst": 9
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
              "turnoverDiff": 17,
              "passDefEpa": 18,
              "rushDefYds": 23,
              "pointsFor": 16,
              "pointsAgainst": 11
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
              "turnoverDiff": 18,
              "passDefEpa": 16,
              "rushDefYds": 24,
              "pointsFor": 19,
              "pointsAgainst": 15
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
              "passDefEpa": 27,
              "rushDefYds": 20,
              "pointsFor": 1,
              "pointsAgainst": 27
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
              "passDefEpa": 13,
              "rushDefYds": 10,
              "pointsFor": 9,
              "pointsAgainst": 21
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
              "passOffEpa": 20,
              "turnoverDiff": 21,
              "passDefEpa": 15,
              "rushDefYds": 14,
              "pointsFor": 20,
              "pointsAgainst": 28
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
              "turnoverDiff": 11,
              "passDefEpa": 11,
              "rushDefYds": 2,
              "pointsFor": 3,
              "pointsAgainst": 12
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
              "passOffEpa": 30,
              "turnoverDiff": 22,
              "passDefEpa": 2,
              "rushDefYds": 1,
              "pointsFor": 25,
              "pointsAgainst": 10
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
              "turnoverDiff": 27,
              "passDefEpa": 28,
              "rushDefYds": 30,
              "pointsFor": 4,
              "pointsAgainst": 30
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
              "turnoverDiff": 28,
              "passDefEpa": 21,
              "rushDefYds": 27,
              "pointsFor": 10,
              "pointsAgainst": 23
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
              "passOffEpa": 22,
              "turnoverDiff": 30,
              "passDefEpa": 12,
              "rushDefYds": 13,
              "pointsFor": 13,
              "pointsAgainst": 24
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
              "passDefEpa": 5,
              "rushDefYds": 6,
              "pointsFor": 15,
              "pointsAgainst": 8
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
              "passOffEpa": 23,
              "turnoverDiff": 23,
              "passDefEpa": 20,
              "rushDefYds": 28,
              "pointsFor": 30,
              "pointsAgainst": 19
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
              "turnoverDiff": 12,
              "passDefEpa": 8,
              "rushDefYds": 18,
              "pointsFor": 14,
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
              "passDefEpa": 10,
              "rushDefYds": 15,
              "pointsFor": 26,
              "pointsAgainst": 4
            }
          }
        ]
      }
    }
  }
};
