// ============================================================
//  NFL_POWER_SCORE — "Bootleg Power Score" Spinnennetz (nflverse)
// ============================================================
//  AUTO-GENERIERT von scripts/sync-nfl-power-score.js über die GitHub
//  Action ".github/workflows/sync-nfl-power-score.yml". Nicht von Hand
//  editieren — Änderungen werden beim nächsten Sync überschrieben.
//  Zuletzt synchronisiert: 2026-10-09T13:58:42.262Z
//
//  6 Kategorien, datengestützt ausgewählt (siehe Kommentar oben im
//  Script für die Korrelationsanalyse gegen echte Season-Siege
//  2021–2025, Update 10/2026): Passing Offense (EPA/Dropback),
//  Turnover-Differential, Pass Defense (EPA/Dropback zugelassen),
//  Rush Defense (EPA/Carry zugelassen),
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
        "unit": "EPA/Dropback",
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
        "unit": "EPA/Dropback zugelassen",
        "better": "low"
      },
      {
        "key": "rushDefEpa",
        "label": "Rush Defense",
        "unit": "EPA/Carry zugelassen",
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
              "passOffEpa": 0.469,
              "turnoverDiff": 2,
              "passDefEpa": 0.036,
              "rushDefEpa": 0.11,
              "pointsFor": 36,
              "pointsAgainst": 31
            },
            "ranks": {
              "passOffEpa": 4,
              "turnoverDiff": 3,
              "passDefEpa": 18,
              "rushDefEpa": 26,
              "pointsFor": 5,
              "pointsAgainst": 23
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "MIA",
            "values": {
              "passOffEpa": -0.172,
              "turnoverDiff": 0,
              "passDefEpa": 0.013,
              "rushDefEpa": -0.134,
              "pointsFor": 13,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 24,
              "turnoverDiff": 14,
              "passDefEpa": 16,
              "rushDefEpa": 5,
              "pointsFor": 25,
              "pointsAgainst": 18
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "NE",
            "values": {
              "passOffEpa": -0.128,
              "turnoverDiff": -3,
              "passDefEpa": 0.168,
              "rushDefEpa": -0.058,
              "pointsFor": 10,
              "pointsAgainst": 13
            },
            "ranks": {
              "passOffEpa": 22,
              "turnoverDiff": 31,
              "passDefEpa": 23,
              "rushDefEpa": 13,
              "pointsFor": 28,
              "pointsAgainst": 6
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "NYJ",
            "values": {
              "passOffEpa": 0.406,
              "turnoverDiff": 1,
              "passDefEpa": -0.21,
              "rushDefEpa": 0.11,
              "pointsFor": 23,
              "pointsAgainst": 10
            },
            "ranks": {
              "passOffEpa": 5,
              "turnoverDiff": 8,
              "passDefEpa": 5,
              "rushDefEpa": 27,
              "pointsFor": 18,
              "pointsAgainst": 2
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "BAL",
            "values": {
              "passOffEpa": 0.383,
              "turnoverDiff": 1,
              "passDefEpa": -0.291,
              "rushDefEpa": 0.122,
              "pointsFor": 41,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 6,
              "turnoverDiff": 9,
              "passDefEpa": 3,
              "rushDefEpa": 28,
              "pointsFor": 2,
              "pointsAgainst": 14
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "CIN",
            "values": {
              "passOffEpa": -0.073,
              "turnoverDiff": 3,
              "passDefEpa": -0.169,
              "rushDefEpa": -0.077,
              "pointsFor": 33,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 20,
              "turnoverDiff": 1,
              "passDefEpa": 10,
              "rushDefEpa": 11,
              "pointsFor": 7,
              "pointsAgainst": 19
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "CLE",
            "values": {
              "passOffEpa": -0.206,
              "turnoverDiff": -2,
              "passDefEpa": 0.793,
              "rushDefEpa": -0.034,
              "pointsFor": 10,
              "pointsAgainst": 34
            },
            "ranks": {
              "passOffEpa": 27,
              "turnoverDiff": 26,
              "passDefEpa": 32,
              "rushDefEpa": 16,
              "pointsFor": 29,
              "pointsAgainst": 27
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "PIT",
            "values": {
              "passOffEpa": -0.225,
              "turnoverDiff": 1,
              "passDefEpa": -0.606,
              "rushDefEpa": -0.082,
              "pointsFor": 20,
              "pointsAgainst": 13
            },
            "ranks": {
              "passOffEpa": 29,
              "turnoverDiff": 10,
              "passDefEpa": 1,
              "rushDefEpa": 10,
              "pointsFor": 22,
              "pointsAgainst": 7
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "HOU",
            "values": {
              "passOffEpa": 0.036,
              "turnoverDiff": -2,
              "passDefEpa": 0.469,
              "rushDefEpa": -0.124,
              "pointsFor": 31,
              "pointsAgainst": 36
            },
            "ranks": {
              "passOffEpa": 15,
              "turnoverDiff": 27,
              "passDefEpa": 29,
              "rushDefEpa": 7,
              "pointsFor": 8,
              "pointsAgainst": 28
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "IND",
            "values": {
              "passOffEpa": -0.291,
              "turnoverDiff": -1,
              "passDefEpa": 0.383,
              "rushDefEpa": 0.18,
              "pointsFor": 23,
              "pointsAgainst": 41
            },
            "ranks": {
              "passOffEpa": 30,
              "turnoverDiff": 20,
              "passDefEpa": 27,
              "rushDefEpa": 29,
              "pointsFor": 19,
              "pointsAgainst": 31
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "JAX",
            "values": {
              "passOffEpa": 0.793,
              "turnoverDiff": 2,
              "passDefEpa": -0.206,
              "rushDefEpa": 0.037,
              "pointsFor": 34,
              "pointsAgainst": 10
            },
            "ranks": {
              "passOffEpa": 1,
              "turnoverDiff": 4,
              "passDefEpa": 6,
              "rushDefEpa": 22,
              "pointsFor": 6,
              "pointsAgainst": 3
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "TEN",
            "values": {
              "passOffEpa": -0.21,
              "turnoverDiff": -1,
              "passDefEpa": 0.406,
              "rushDefEpa": -0.057,
              "pointsFor": 10,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 28,
              "turnoverDiff": 21,
              "passDefEpa": 28,
              "rushDefEpa": 14,
              "pointsFor": 30,
              "pointsAgainst": 15
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "DEN",
            "values": {
              "passOffEpa": -0.449,
              "turnoverDiff": -1,
              "passDefEpa": -0.079,
              "rushDefEpa": 0.225,
              "pointsFor": 10,
              "pointsAgainst": 31
            },
            "ranks": {
              "passOffEpa": 31,
              "turnoverDiff": 22,
              "passDefEpa": 12,
              "rushDefEpa": 31,
              "pointsFor": 31,
              "pointsAgainst": 24
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "KC",
            "values": {
              "passOffEpa": -0.079,
              "turnoverDiff": 1,
              "passDefEpa": -0.449,
              "rushDefEpa": -0.096,
              "pointsFor": 31,
              "pointsAgainst": 10
            },
            "ranks": {
              "passOffEpa": 21,
              "turnoverDiff": 11,
              "passDefEpa": 2,
              "rushDefEpa": 8,
              "pointsFor": 9,
              "pointsAgainst": 4
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "LV",
            "values": {
              "passOffEpa": 0.013,
              "turnoverDiff": 0,
              "passDefEpa": -0.172,
              "rushDefEpa": -0.142,
              "pointsFor": 27,
              "pointsAgainst": 13
            },
            "ranks": {
              "passOffEpa": 17,
              "turnoverDiff": 15,
              "passDefEpa": 9,
              "rushDefEpa": 4,
              "pointsFor": 13,
              "pointsAgainst": 8
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "LAC",
            "values": {
              "passOffEpa": -0.187,
              "turnoverDiff": -2,
              "passDefEpa": 0.237,
              "rushDefEpa": -0.018,
              "pointsFor": 14,
              "pointsAgainst": 26
            },
            "ranks": {
              "passOffEpa": 25,
              "turnoverDiff": 28,
              "passDefEpa": 24,
              "rushDefEpa": 19,
              "pointsFor": 24,
              "pointsAgainst": 17
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "DAL",
            "values": {
              "passOffEpa": 0.305,
              "turnoverDiff": 0,
              "passDefEpa": 0.707,
              "rushDefEpa": -0.018,
              "pointsFor": 20,
              "pointsAgainst": 28
            },
            "ranks": {
              "passOffEpa": 8,
              "turnoverDiff": 16,
              "passDefEpa": 31,
              "rushDefEpa": 20,
              "pointsFor": 23,
              "pointsAgainst": 21
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "NYG",
            "values": {
              "passOffEpa": 0.707,
              "turnoverDiff": 0,
              "passDefEpa": 0.305,
              "rushDefEpa": 0.061,
              "pointsFor": 28,
              "pointsAgainst": 20
            },
            "ranks": {
              "passOffEpa": 2,
              "turnoverDiff": 17,
              "passDefEpa": 25,
              "rushDefEpa": 24,
              "pointsFor": 12,
              "pointsAgainst": 10
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "PHI",
            "values": {
              "passOffEpa": 0.045,
              "turnoverDiff": 0,
              "passDefEpa": 0.112,
              "rushDefEpa": 0.005,
              "pointsFor": 24,
              "pointsAgainst": 22
            },
            "ranks": {
              "passOffEpa": 14,
              "turnoverDiff": 18,
              "passDefEpa": 20,
              "rushDefEpa": 21,
              "pointsFor": 17,
              "pointsAgainst": 12
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "WSH",
            "values": {
              "passOffEpa": 0.112,
              "turnoverDiff": 0,
              "passDefEpa": 0.045,
              "rushDefEpa": 0.094,
              "pointsFor": 22,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 13,
              "turnoverDiff": 19,
              "passDefEpa": 19,
              "rushDefEpa": 25,
              "pointsFor": 20,
              "pointsAgainst": 16
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "CHI",
            "values": {
              "passOffEpa": 0.599,
              "turnoverDiff": 2,
              "passDefEpa": 0.378,
              "rushDefEpa": 0.055,
              "pointsFor": 59,
              "pointsAgainst": 37
            },
            "ranks": {
              "passOffEpa": 3,
              "turnoverDiff": 5,
              "passDefEpa": 26,
              "rushDefEpa": 23,
              "pointsFor": 1,
              "pointsAgainst": 29
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "DET",
            "values": {
              "passOffEpa": 0.146,
              "turnoverDiff": 2,
              "passDefEpa": -0.017,
              "rushDefEpa": -0.066,
              "pointsFor": 31,
              "pointsAgainst": 30
            },
            "ranks": {
              "passOffEpa": 11,
              "turnoverDiff": 6,
              "passDefEpa": 15,
              "rushDefEpa": 12,
              "pointsFor": 10,
              "pointsAgainst": 22
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "GB",
            "values": {
              "passOffEpa": -0.059,
              "turnoverDiff": -1,
              "passDefEpa": 0.019,
              "rushDefEpa": -0.049,
              "pointsFor": 22,
              "pointsAgainst": 39
            },
            "ranks": {
              "passOffEpa": 19,
              "turnoverDiff": 23,
              "passDefEpa": 17,
              "rushDefEpa": 15,
              "pointsFor": 21,
              "pointsAgainst": 30
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "MIN",
            "values": {
              "passOffEpa": 0.019,
              "turnoverDiff": 1,
              "passDefEpa": -0.059,
              "rushDefEpa": -0.429,
              "pointsFor": 39,
              "pointsAgainst": 22
            },
            "ranks": {
              "passOffEpa": 16,
              "turnoverDiff": 12,
              "passDefEpa": 14,
              "rushDefEpa": 1,
              "pointsFor": 3,
              "pointsAgainst": 13
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "ATL",
            "values": {
              "passOffEpa": -0.606,
              "turnoverDiff": -1,
              "passDefEpa": -0.225,
              "rushDefEpa": -0.285,
              "pointsFor": 13,
              "pointsAgainst": 20
            },
            "ranks": {
              "passOffEpa": 32,
              "turnoverDiff": 24,
              "passDefEpa": 4,
              "rushDefEpa": 3,
              "pointsFor": 26,
              "pointsAgainst": 11
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "CAR",
            "values": {
              "passOffEpa": 0.378,
              "turnoverDiff": -2,
              "passDefEpa": 0.599,
              "rushDefEpa": 0.378,
              "pointsFor": 37,
              "pointsAgainst": 59
            },
            "ranks": {
              "passOffEpa": 7,
              "turnoverDiff": 29,
              "passDefEpa": 30,
              "rushDefEpa": 32,
              "pointsFor": 4,
              "pointsAgainst": 32
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "NO",
            "values": {
              "passOffEpa": -0.017,
              "turnoverDiff": -2,
              "passDefEpa": 0.146,
              "rushDefEpa": -0.021,
              "pointsFor": 30,
              "pointsAgainst": 31
            },
            "ranks": {
              "passOffEpa": 18,
              "turnoverDiff": 30,
              "passDefEpa": 22,
              "rushDefEpa": 18,
              "pointsFor": 11,
              "pointsAgainst": 25
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "TB",
            "values": {
              "passOffEpa": -0.169,
              "turnoverDiff": -3,
              "passDefEpa": -0.073,
              "rushDefEpa": -0.024,
              "pointsFor": 27,
              "pointsAgainst": 33
            },
            "ranks": {
              "passOffEpa": 23,
              "turnoverDiff": 32,
              "passDefEpa": 13,
              "rushDefEpa": 17,
              "pointsFor": 14,
              "pointsAgainst": 26
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "ARI",
            "values": {
              "passOffEpa": 0.237,
              "turnoverDiff": 2,
              "passDefEpa": -0.187,
              "rushDefEpa": -0.325,
              "pointsFor": 26,
              "pointsAgainst": 14
            },
            "ranks": {
              "passOffEpa": 9,
              "turnoverDiff": 7,
              "passDefEpa": 8,
              "rushDefEpa": 2,
              "pointsFor": 16,
              "pointsAgainst": 9
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "LAR",
            "values": {
              "passOffEpa": -0.194,
              "turnoverDiff": -1,
              "passDefEpa": 0.142,
              "rushDefEpa": 0.221,
              "pointsFor": 7,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 26,
              "turnoverDiff": 25,
              "passDefEpa": 21,
              "rushDefEpa": 30,
              "pointsFor": 32,
              "pointsAgainst": 20
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "SF",
            "values": {
              "passOffEpa": 0.142,
              "turnoverDiff": 1,
              "passDefEpa": -0.194,
              "rushDefEpa": -0.131,
              "pointsFor": 27,
              "pointsAgainst": 7
            },
            "ranks": {
              "passOffEpa": 12,
              "turnoverDiff": 13,
              "passDefEpa": 7,
              "rushDefEpa": 6,
              "pointsFor": 15,
              "pointsAgainst": 1
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "SEA",
            "values": {
              "passOffEpa": 0.168,
              "turnoverDiff": 3,
              "passDefEpa": -0.128,
              "rushDefEpa": -0.088,
              "pointsFor": 13,
              "pointsAgainst": 10
            },
            "ranks": {
              "passOffEpa": 10,
              "turnoverDiff": 2,
              "passDefEpa": 11,
              "rushDefEpa": 9,
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
              "passOffEpa": 0.469,
              "turnoverDiff": 2,
              "passDefEpa": 0.036,
              "rushDefEpa": 0.11,
              "pointsFor": 36,
              "pointsAgainst": 31
            },
            "ranks": {
              "passOffEpa": 4,
              "turnoverDiff": 3,
              "passDefEpa": 18,
              "rushDefEpa": 26,
              "pointsFor": 5,
              "pointsAgainst": 23
            }
          },
          {
            "abbr": "MIA",
            "values": {
              "passOffEpa": -0.172,
              "turnoverDiff": 0,
              "passDefEpa": 0.013,
              "rushDefEpa": -0.134,
              "pointsFor": 13,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 24,
              "turnoverDiff": 14,
              "passDefEpa": 16,
              "rushDefEpa": 5,
              "pointsFor": 25,
              "pointsAgainst": 18
            }
          },
          {
            "abbr": "NE",
            "values": {
              "passOffEpa": -0.128,
              "turnoverDiff": -3,
              "passDefEpa": 0.168,
              "rushDefEpa": -0.058,
              "pointsFor": 10,
              "pointsAgainst": 13
            },
            "ranks": {
              "passOffEpa": 22,
              "turnoverDiff": 31,
              "passDefEpa": 23,
              "rushDefEpa": 13,
              "pointsFor": 28,
              "pointsAgainst": 6
            }
          },
          {
            "abbr": "NYJ",
            "values": {
              "passOffEpa": 0.406,
              "turnoverDiff": 1,
              "passDefEpa": -0.21,
              "rushDefEpa": 0.11,
              "pointsFor": 23,
              "pointsAgainst": 10
            },
            "ranks": {
              "passOffEpa": 5,
              "turnoverDiff": 8,
              "passDefEpa": 5,
              "rushDefEpa": 27,
              "pointsFor": 18,
              "pointsAgainst": 2
            }
          },
          {
            "abbr": "BAL",
            "values": {
              "passOffEpa": 0.383,
              "turnoverDiff": 1,
              "passDefEpa": -0.291,
              "rushDefEpa": 0.122,
              "pointsFor": 41,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 6,
              "turnoverDiff": 9,
              "passDefEpa": 3,
              "rushDefEpa": 28,
              "pointsFor": 2,
              "pointsAgainst": 14
            }
          },
          {
            "abbr": "CIN",
            "values": {
              "passOffEpa": -0.073,
              "turnoverDiff": 3,
              "passDefEpa": -0.169,
              "rushDefEpa": -0.077,
              "pointsFor": 33,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 20,
              "turnoverDiff": 1,
              "passDefEpa": 10,
              "rushDefEpa": 11,
              "pointsFor": 7,
              "pointsAgainst": 19
            }
          },
          {
            "abbr": "CLE",
            "values": {
              "passOffEpa": -0.206,
              "turnoverDiff": -2,
              "passDefEpa": 0.793,
              "rushDefEpa": -0.034,
              "pointsFor": 10,
              "pointsAgainst": 34
            },
            "ranks": {
              "passOffEpa": 27,
              "turnoverDiff": 26,
              "passDefEpa": 32,
              "rushDefEpa": 16,
              "pointsFor": 29,
              "pointsAgainst": 27
            }
          },
          {
            "abbr": "PIT",
            "values": {
              "passOffEpa": -0.225,
              "turnoverDiff": 1,
              "passDefEpa": -0.606,
              "rushDefEpa": -0.082,
              "pointsFor": 20,
              "pointsAgainst": 13
            },
            "ranks": {
              "passOffEpa": 29,
              "turnoverDiff": 10,
              "passDefEpa": 1,
              "rushDefEpa": 10,
              "pointsFor": 22,
              "pointsAgainst": 7
            }
          },
          {
            "abbr": "HOU",
            "values": {
              "passOffEpa": 0.036,
              "turnoverDiff": -2,
              "passDefEpa": 0.469,
              "rushDefEpa": -0.124,
              "pointsFor": 31,
              "pointsAgainst": 36
            },
            "ranks": {
              "passOffEpa": 15,
              "turnoverDiff": 27,
              "passDefEpa": 29,
              "rushDefEpa": 7,
              "pointsFor": 8,
              "pointsAgainst": 28
            }
          },
          {
            "abbr": "IND",
            "values": {
              "passOffEpa": -0.291,
              "turnoverDiff": -1,
              "passDefEpa": 0.383,
              "rushDefEpa": 0.18,
              "pointsFor": 23,
              "pointsAgainst": 41
            },
            "ranks": {
              "passOffEpa": 30,
              "turnoverDiff": 20,
              "passDefEpa": 27,
              "rushDefEpa": 29,
              "pointsFor": 19,
              "pointsAgainst": 31
            }
          },
          {
            "abbr": "JAX",
            "values": {
              "passOffEpa": 0.793,
              "turnoverDiff": 2,
              "passDefEpa": -0.206,
              "rushDefEpa": 0.037,
              "pointsFor": 34,
              "pointsAgainst": 10
            },
            "ranks": {
              "passOffEpa": 1,
              "turnoverDiff": 4,
              "passDefEpa": 6,
              "rushDefEpa": 22,
              "pointsFor": 6,
              "pointsAgainst": 3
            }
          },
          {
            "abbr": "TEN",
            "values": {
              "passOffEpa": -0.21,
              "turnoverDiff": -1,
              "passDefEpa": 0.406,
              "rushDefEpa": -0.057,
              "pointsFor": 10,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 28,
              "turnoverDiff": 21,
              "passDefEpa": 28,
              "rushDefEpa": 14,
              "pointsFor": 30,
              "pointsAgainst": 15
            }
          },
          {
            "abbr": "DEN",
            "values": {
              "passOffEpa": -0.449,
              "turnoverDiff": -1,
              "passDefEpa": -0.079,
              "rushDefEpa": 0.225,
              "pointsFor": 10,
              "pointsAgainst": 31
            },
            "ranks": {
              "passOffEpa": 31,
              "turnoverDiff": 22,
              "passDefEpa": 12,
              "rushDefEpa": 31,
              "pointsFor": 31,
              "pointsAgainst": 24
            }
          },
          {
            "abbr": "KC",
            "values": {
              "passOffEpa": -0.079,
              "turnoverDiff": 1,
              "passDefEpa": -0.449,
              "rushDefEpa": -0.096,
              "pointsFor": 31,
              "pointsAgainst": 10
            },
            "ranks": {
              "passOffEpa": 21,
              "turnoverDiff": 11,
              "passDefEpa": 2,
              "rushDefEpa": 8,
              "pointsFor": 9,
              "pointsAgainst": 4
            }
          },
          {
            "abbr": "LV",
            "values": {
              "passOffEpa": 0.013,
              "turnoverDiff": 0,
              "passDefEpa": -0.172,
              "rushDefEpa": -0.142,
              "pointsFor": 27,
              "pointsAgainst": 13
            },
            "ranks": {
              "passOffEpa": 17,
              "turnoverDiff": 15,
              "passDefEpa": 9,
              "rushDefEpa": 4,
              "pointsFor": 13,
              "pointsAgainst": 8
            }
          },
          {
            "abbr": "LAC",
            "values": {
              "passOffEpa": -0.187,
              "turnoverDiff": -2,
              "passDefEpa": 0.237,
              "rushDefEpa": -0.018,
              "pointsFor": 14,
              "pointsAgainst": 26
            },
            "ranks": {
              "passOffEpa": 25,
              "turnoverDiff": 28,
              "passDefEpa": 24,
              "rushDefEpa": 19,
              "pointsFor": 24,
              "pointsAgainst": 17
            }
          },
          {
            "abbr": "DAL",
            "values": {
              "passOffEpa": 0.305,
              "turnoverDiff": 0,
              "passDefEpa": 0.707,
              "rushDefEpa": -0.018,
              "pointsFor": 20,
              "pointsAgainst": 28
            },
            "ranks": {
              "passOffEpa": 8,
              "turnoverDiff": 16,
              "passDefEpa": 31,
              "rushDefEpa": 20,
              "pointsFor": 23,
              "pointsAgainst": 21
            }
          },
          {
            "abbr": "NYG",
            "values": {
              "passOffEpa": 0.707,
              "turnoverDiff": 0,
              "passDefEpa": 0.305,
              "rushDefEpa": 0.061,
              "pointsFor": 28,
              "pointsAgainst": 20
            },
            "ranks": {
              "passOffEpa": 2,
              "turnoverDiff": 17,
              "passDefEpa": 25,
              "rushDefEpa": 24,
              "pointsFor": 12,
              "pointsAgainst": 10
            }
          },
          {
            "abbr": "PHI",
            "values": {
              "passOffEpa": 0.045,
              "turnoverDiff": 0,
              "passDefEpa": 0.112,
              "rushDefEpa": 0.005,
              "pointsFor": 24,
              "pointsAgainst": 22
            },
            "ranks": {
              "passOffEpa": 14,
              "turnoverDiff": 18,
              "passDefEpa": 20,
              "rushDefEpa": 21,
              "pointsFor": 17,
              "pointsAgainst": 12
            }
          },
          {
            "abbr": "WSH",
            "values": {
              "passOffEpa": 0.112,
              "turnoverDiff": 0,
              "passDefEpa": 0.045,
              "rushDefEpa": 0.094,
              "pointsFor": 22,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 13,
              "turnoverDiff": 19,
              "passDefEpa": 19,
              "rushDefEpa": 25,
              "pointsFor": 20,
              "pointsAgainst": 16
            }
          },
          {
            "abbr": "CHI",
            "values": {
              "passOffEpa": 0.599,
              "turnoverDiff": 2,
              "passDefEpa": 0.378,
              "rushDefEpa": 0.055,
              "pointsFor": 59,
              "pointsAgainst": 37
            },
            "ranks": {
              "passOffEpa": 3,
              "turnoverDiff": 5,
              "passDefEpa": 26,
              "rushDefEpa": 23,
              "pointsFor": 1,
              "pointsAgainst": 29
            }
          },
          {
            "abbr": "DET",
            "values": {
              "passOffEpa": 0.146,
              "turnoverDiff": 2,
              "passDefEpa": -0.017,
              "rushDefEpa": -0.066,
              "pointsFor": 31,
              "pointsAgainst": 30
            },
            "ranks": {
              "passOffEpa": 11,
              "turnoverDiff": 6,
              "passDefEpa": 15,
              "rushDefEpa": 12,
              "pointsFor": 10,
              "pointsAgainst": 22
            }
          },
          {
            "abbr": "GB",
            "values": {
              "passOffEpa": -0.059,
              "turnoverDiff": -1,
              "passDefEpa": 0.019,
              "rushDefEpa": -0.049,
              "pointsFor": 22,
              "pointsAgainst": 39
            },
            "ranks": {
              "passOffEpa": 19,
              "turnoverDiff": 23,
              "passDefEpa": 17,
              "rushDefEpa": 15,
              "pointsFor": 21,
              "pointsAgainst": 30
            }
          },
          {
            "abbr": "MIN",
            "values": {
              "passOffEpa": 0.019,
              "turnoverDiff": 1,
              "passDefEpa": -0.059,
              "rushDefEpa": -0.429,
              "pointsFor": 39,
              "pointsAgainst": 22
            },
            "ranks": {
              "passOffEpa": 16,
              "turnoverDiff": 12,
              "passDefEpa": 14,
              "rushDefEpa": 1,
              "pointsFor": 3,
              "pointsAgainst": 13
            }
          },
          {
            "abbr": "ATL",
            "values": {
              "passOffEpa": -0.606,
              "turnoverDiff": -1,
              "passDefEpa": -0.225,
              "rushDefEpa": -0.285,
              "pointsFor": 13,
              "pointsAgainst": 20
            },
            "ranks": {
              "passOffEpa": 32,
              "turnoverDiff": 24,
              "passDefEpa": 4,
              "rushDefEpa": 3,
              "pointsFor": 26,
              "pointsAgainst": 11
            }
          },
          {
            "abbr": "CAR",
            "values": {
              "passOffEpa": 0.378,
              "turnoverDiff": -2,
              "passDefEpa": 0.599,
              "rushDefEpa": 0.378,
              "pointsFor": 37,
              "pointsAgainst": 59
            },
            "ranks": {
              "passOffEpa": 7,
              "turnoverDiff": 29,
              "passDefEpa": 30,
              "rushDefEpa": 32,
              "pointsFor": 4,
              "pointsAgainst": 32
            }
          },
          {
            "abbr": "NO",
            "values": {
              "passOffEpa": -0.017,
              "turnoverDiff": -2,
              "passDefEpa": 0.146,
              "rushDefEpa": -0.021,
              "pointsFor": 30,
              "pointsAgainst": 31
            },
            "ranks": {
              "passOffEpa": 18,
              "turnoverDiff": 30,
              "passDefEpa": 22,
              "rushDefEpa": 18,
              "pointsFor": 11,
              "pointsAgainst": 25
            }
          },
          {
            "abbr": "TB",
            "values": {
              "passOffEpa": -0.169,
              "turnoverDiff": -3,
              "passDefEpa": -0.073,
              "rushDefEpa": -0.024,
              "pointsFor": 27,
              "pointsAgainst": 33
            },
            "ranks": {
              "passOffEpa": 23,
              "turnoverDiff": 32,
              "passDefEpa": 13,
              "rushDefEpa": 17,
              "pointsFor": 14,
              "pointsAgainst": 26
            }
          },
          {
            "abbr": "ARI",
            "values": {
              "passOffEpa": 0.237,
              "turnoverDiff": 2,
              "passDefEpa": -0.187,
              "rushDefEpa": -0.325,
              "pointsFor": 26,
              "pointsAgainst": 14
            },
            "ranks": {
              "passOffEpa": 9,
              "turnoverDiff": 7,
              "passDefEpa": 8,
              "rushDefEpa": 2,
              "pointsFor": 16,
              "pointsAgainst": 9
            }
          },
          {
            "abbr": "LAR",
            "values": {
              "passOffEpa": -0.194,
              "turnoverDiff": -1,
              "passDefEpa": 0.142,
              "rushDefEpa": 0.221,
              "pointsFor": 7,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 26,
              "turnoverDiff": 25,
              "passDefEpa": 21,
              "rushDefEpa": 30,
              "pointsFor": 32,
              "pointsAgainst": 20
            }
          },
          {
            "abbr": "SF",
            "values": {
              "passOffEpa": 0.142,
              "turnoverDiff": 1,
              "passDefEpa": -0.194,
              "rushDefEpa": -0.131,
              "pointsFor": 27,
              "pointsAgainst": 7
            },
            "ranks": {
              "passOffEpa": 12,
              "turnoverDiff": 13,
              "passDefEpa": 7,
              "rushDefEpa": 6,
              "pointsFor": 15,
              "pointsAgainst": 1
            }
          },
          {
            "abbr": "SEA",
            "values": {
              "passOffEpa": 0.168,
              "turnoverDiff": 3,
              "passDefEpa": -0.128,
              "rushDefEpa": -0.088,
              "pointsFor": 13,
              "pointsAgainst": 10
            },
            "ranks": {
              "passOffEpa": 10,
              "turnoverDiff": 2,
              "passDefEpa": 11,
              "rushDefEpa": 9,
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
              "passOffEpa": 0.462,
              "turnoverDiff": 1,
              "passDefEpa": 0.242,
              "rushDefEpa": -0.012,
              "pointsFor": 38.5,
              "pointsAgainst": 31
            },
            "ranks": {
              "passOffEpa": 2,
              "turnoverDiff": 5,
              "passDefEpa": 25,
              "rushDefEpa": 20,
              "pointsFor": 1,
              "pointsAgainst": 28
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "MIA",
            "values": {
              "passOffEpa": -0.018,
              "turnoverDiff": 0,
              "passDefEpa": 0.456,
              "rushDefEpa": -0.104,
              "pointsFor": 13,
              "pointsAgainst": 31
            },
            "ranks": {
              "passOffEpa": 21,
              "turnoverDiff": 17,
              "passDefEpa": 32,
              "rushDefEpa": 15,
              "pointsFor": 30,
              "pointsAgainst": 29
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "NE",
            "values": {
              "passOffEpa": -0.096,
              "turnoverDiff": -1.5,
              "passDefEpa": -0.249,
              "rushDefEpa": -0.073,
              "pointsFor": 15,
              "pointsAgainst": 8
            },
            "ranks": {
              "passOffEpa": 27,
              "turnoverDiff": 29,
              "passDefEpa": 2,
              "rushDefEpa": 17,
              "pointsFor": 26,
              "pointsAgainst": 1
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "NYJ",
            "values": {
              "passOffEpa": 0.203,
              "turnoverDiff": 1,
              "passDefEpa": -0.157,
              "rushDefEpa": -0.2,
              "pointsFor": 20,
              "pointsAgainst": 15
            },
            "ranks": {
              "passOffEpa": 11,
              "turnoverDiff": 6,
              "passDefEpa": 6,
              "rushDefEpa": 10,
              "pointsFor": 20,
              "pointsAgainst": 6
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "BAL",
            "values": {
              "passOffEpa": 0.224,
              "turnoverDiff": 0,
              "passDefEpa": 0.019,
              "rushDefEpa": 0.023,
              "pointsFor": 29,
              "pointsAgainst": 23.5
            },
            "ranks": {
              "passOffEpa": 8,
              "turnoverDiff": 18,
              "passDefEpa": 14,
              "rushDefEpa": 23,
              "pointsFor": 7,
              "pointsAgainst": 16
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "CIN",
            "values": {
              "passOffEpa": -0.044,
              "turnoverDiff": 1.5,
              "passDefEpa": -0.164,
              "rushDefEpa": -0.295,
              "pointsFor": 26.5,
              "pointsAgainst": 16.5
            },
            "ranks": {
              "passOffEpa": 22,
              "turnoverDiff": 1,
              "passDefEpa": 5,
              "rushDefEpa": 2,
              "pointsFor": 10,
              "pointsAgainst": 8
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "CLE",
            "values": {
              "passOffEpa": 0.082,
              "turnoverDiff": -0.5,
              "passDefEpa": 0.09,
              "rushDefEpa": 0.06,
              "pointsFor": 16.5,
              "pointsAgainst": 26.5
            },
            "ranks": {
              "passOffEpa": 17,
              "turnoverDiff": 20,
              "passDefEpa": 18,
              "rushDefEpa": 27,
              "pointsFor": 24,
              "pointsAgainst": 22
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "PIT",
            "values": {
              "passOffEpa": -0.362,
              "turnoverDiff": 0.5,
              "passDefEpa": -0.334,
              "rushDefEpa": -0.014,
              "pointsFor": 11.5,
              "pointsAgainst": 16.5
            },
            "ranks": {
              "passOffEpa": 31,
              "turnoverDiff": 12,
              "passDefEpa": 1,
              "rushDefEpa": 19,
              "pointsFor": 31,
              "pointsAgainst": 9
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "HOU",
            "values": {
              "passOffEpa": -0.081,
              "turnoverDiff": -1,
              "passDefEpa": 0.209,
              "rushDefEpa": -0.168,
              "pointsFor": 18.5,
              "pointsAgainst": 28
            },
            "ranks": {
              "passOffEpa": 25,
              "turnoverDiff": 24,
              "passDefEpa": 23,
              "rushDefEpa": 11,
              "pointsFor": 21,
              "pointsAgainst": 24
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "IND",
            "values": {
              "passOffEpa": -0.058,
              "turnoverDiff": -1,
              "passDefEpa": 0.313,
              "rushDefEpa": 0.168,
              "pointsFor": 26.5,
              "pointsAgainst": 37
            },
            "ranks": {
              "passOffEpa": 23,
              "turnoverDiff": 25,
              "passDefEpa": 29,
              "rushDefEpa": 32,
              "pointsFor": 11,
              "pointsAgainst": 32
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "JAX",
            "values": {
              "passOffEpa": 0.271,
              "turnoverDiff": 1,
              "passDefEpa": 0.049,
              "rushDefEpa": -0.08,
              "pointsFor": 23.5,
              "pointsAgainst": 15
            },
            "ranks": {
              "passOffEpa": 7,
              "turnoverDiff": 7,
              "passDefEpa": 15,
              "rushDefEpa": 16,
              "pointsFor": 15,
              "pointsAgainst": 7
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "TEN",
            "values": {
              "passOffEpa": -0.131,
              "turnoverDiff": 0.5,
              "passDefEpa": 0.289,
              "rushDefEpa": -0.115,
              "pointsFor": 15,
              "pointsAgainst": 23.5
            },
            "ranks": {
              "passOffEpa": 29,
              "turnoverDiff": 13,
              "passDefEpa": 28,
              "rushDefEpa": 14,
              "pointsFor": 27,
              "pointsAgainst": 17
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "DEN",
            "values": {
              "passOffEpa": -0.094,
              "turnoverDiff": -0.5,
              "passDefEpa": -0.107,
              "rushDefEpa": 0.162,
              "pointsFor": 15,
              "pointsAgainst": 22
            },
            "ranks": {
              "passOffEpa": 26,
              "turnoverDiff": 21,
              "passDefEpa": 8,
              "rushDefEpa": 31,
              "pointsFor": 28,
              "pointsAgainst": 13
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "KC",
            "values": {
              "passOffEpa": 0.143,
              "turnoverDiff": 1,
              "passDefEpa": -0.135,
              "rushDefEpa": 0.051,
              "pointsFor": 32,
              "pointsAgainst": 20
            },
            "ranks": {
              "passOffEpa": 13,
              "turnoverDiff": 8,
              "passDefEpa": 7,
              "rushDefEpa": 26,
              "pointsFor": 3,
              "pointsAgainst": 11
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "LV",
            "values": {
              "passOffEpa": 0.104,
              "turnoverDiff": 1,
              "passDefEpa": -0.098,
              "rushDefEpa": -0.364,
              "pointsFor": 26.5,
              "pointsAgainst": 13.5
            },
            "ranks": {
              "passOffEpa": 15,
              "turnoverDiff": 9,
              "passDefEpa": 9,
              "rushDefEpa": 1,
              "pointsFor": 12,
              "pointsAgainst": 5
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "LAC",
            "values": {
              "passOffEpa": -0.103,
              "turnoverDiff": -2,
              "passDefEpa": 0.217,
              "rushDefEpa": -0.224,
              "pointsFor": 14,
              "pointsAgainst": 26
            },
            "ranks": {
              "passOffEpa": 28,
              "turnoverDiff": 30,
              "passDefEpa": 24,
              "rushDefEpa": 6,
              "pointsFor": 29,
              "pointsAgainst": 21
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "DAL",
            "values": {
              "passOffEpa": 0.38,
              "turnoverDiff": 0.5,
              "passDefEpa": 0.421,
              "rushDefEpa": 0.039,
              "pointsFor": 28.5,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 4,
              "turnoverDiff": 14,
              "passDefEpa": 30,
              "rushDefEpa": 24,
              "pointsFor": 8,
              "pointsAgainst": 18
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "NYG",
            "values": {
              "passOffEpa": 0.066,
              "turnoverDiff": 0.5,
              "passDefEpa": 0.44,
              "rushDefEpa": -0.121,
              "pointsFor": 17,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 18,
              "turnoverDiff": 15,
              "passDefEpa": 31,
              "rushDefEpa": 13,
              "pointsFor": 23,
              "pointsAgainst": 19
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "PHI",
            "values": {
              "passOffEpa": 0.148,
              "turnoverDiff": -1,
              "passDefEpa": 0.067,
              "rushDefEpa": 0.067,
              "pointsFor": 24,
              "pointsAgainst": 21
            },
            "ranks": {
              "passOffEpa": 12,
              "turnoverDiff": 26,
              "passDefEpa": 16,
              "rushDefEpa": 28,
              "pointsFor": 13,
              "pointsAgainst": 12
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "WSH",
            "values": {
              "passOffEpa": 0.14,
              "turnoverDiff": -0.5,
              "passDefEpa": 0.268,
              "rushDefEpa": -0.011,
              "pointsFor": 21,
              "pointsAgainst": 30.5
            },
            "ranks": {
              "passOffEpa": 14,
              "turnoverDiff": 22,
              "passDefEpa": 27,
              "rushDefEpa": 21,
              "pointsFor": 18,
              "pointsAgainst": 27
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "CHI",
            "values": {
              "passOffEpa": 0.21,
              "turnoverDiff": 0,
              "passDefEpa": 0.248,
              "rushDefEpa": -0.065,
              "pointsFor": 31,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 10,
              "turnoverDiff": 19,
              "passDefEpa": 26,
              "rushDefEpa": 18,
              "pointsFor": 4,
              "pointsAgainst": 15
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "DET",
            "values": {
              "passOffEpa": 0.298,
              "turnoverDiff": 1,
              "passDefEpa": 0.149,
              "rushDefEpa": 0.134,
              "pointsFor": 31,
              "pointsAgainst": 35.5
            },
            "ranks": {
              "passOffEpa": 6,
              "turnoverDiff": 10,
              "passDefEpa": 21,
              "rushDefEpa": 30,
              "pointsFor": 5,
              "pointsAgainst": 31
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "GB",
            "values": {
              "passOffEpa": -0.075,
              "turnoverDiff": -1,
              "passDefEpa": 0.067,
              "rushDefEpa": -0.222,
              "pointsFor": 21,
              "pointsAgainst": 28
            },
            "ranks": {
              "passOffEpa": 24,
              "turnoverDiff": 27,
              "passDefEpa": 17,
              "rushDefEpa": 7,
              "pointsFor": 19,
              "pointsAgainst": 25
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "MIN",
            "values": {
              "passOffEpa": 0.021,
              "turnoverDiff": 1.5,
              "passDefEpa": -0.078,
              "rushDefEpa": -0.269,
              "pointsFor": 24,
              "pointsAgainst": 12.5
            },
            "ranks": {
              "passOffEpa": 19,
              "turnoverDiff": 2,
              "passDefEpa": 11,
              "rushDefEpa": 3,
              "pointsFor": 14,
              "pointsAgainst": 4
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "ATL",
            "values": {
              "passOffEpa": -0.669,
              "turnoverDiff": -3,
              "passDefEpa": 0.017,
              "rushDefEpa": -0.257,
              "pointsFor": 8,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 32,
              "turnoverDiff": 32,
              "passDefEpa": 13,
              "rushDefEpa": 4,
              "pointsFor": 32,
              "pointsAgainst": 23
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "CAR",
            "values": {
              "passOffEpa": 0.336,
              "turnoverDiff": 1.5,
              "passDefEpa": -0.098,
              "rushDefEpa": 0.114,
              "pointsFor": 35.5,
              "pointsAgainst": 31
            },
            "ranks": {
              "passOffEpa": 5,
              "turnoverDiff": 3,
              "passDefEpa": 10,
              "rushDefEpa": 29,
              "pointsFor": 2,
              "pointsAgainst": 30
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "NO",
            "values": {
              "passOffEpa": 0.101,
              "turnoverDiff": -0.5,
              "passDefEpa": 0.124,
              "rushDefEpa": 0.042,
              "pointsFor": 27,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 16,
              "turnoverDiff": 23,
              "passDefEpa": 20,
              "rushDefEpa": 25,
              "pointsFor": 9,
              "pointsAgainst": 20
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "TB",
            "values": {
              "passOffEpa": -0.275,
              "turnoverDiff": -2,
              "passDefEpa": 0.114,
              "rushDefEpa": -0.211,
              "pointsFor": 23,
              "pointsAgainst": 28
            },
            "ranks": {
              "passOffEpa": 30,
              "turnoverDiff": 31,
              "passDefEpa": 19,
              "rushDefEpa": 8,
              "pointsFor": 16,
              "pointsAgainst": 26
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "ARI",
            "values": {
              "passOffEpa": 0.014,
              "turnoverDiff": 1,
              "passDefEpa": 0.184,
              "rushDefEpa": -0.229,
              "pointsFor": 16.5,
              "pointsAgainst": 22.5
            },
            "ranks": {
              "passOffEpa": 20,
              "turnoverDiff": 11,
              "passDefEpa": 22,
              "rushDefEpa": 5,
              "pointsFor": 25,
              "pointsAgainst": 14
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "LAR",
            "values": {
              "passOffEpa": 0.22,
              "turnoverDiff": -1,
              "passDefEpa": -0.188,
              "rushDefEpa": 0.012,
              "pointsFor": 17.5,
              "pointsAgainst": 16.5
            },
            "ranks": {
              "passOffEpa": 9,
              "turnoverDiff": 28,
              "passDefEpa": 4,
              "rushDefEpa": 22,
              "pointsFor": 22,
              "pointsAgainst": 10
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "SF",
            "values": {
              "passOffEpa": 0.503,
              "turnoverDiff": 0.5,
              "passDefEpa": -0.018,
              "rushDefEpa": -0.143,
              "pointsFor": 31,
              "pointsAgainst": 10
            },
            "ranks": {
              "passOffEpa": 1,
              "turnoverDiff": 16,
              "passDefEpa": 12,
              "rushDefEpa": 12,
              "pointsFor": 6,
              "pointsAgainst": 3
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "SEA",
            "values": {
              "passOffEpa": 0.386,
              "turnoverDiff": 1.5,
              "passDefEpa": -0.193,
              "rushDefEpa": -0.207,
              "pointsFor": 22,
              "pointsAgainst": 8.5
            },
            "ranks": {
              "passOffEpa": 3,
              "turnoverDiff": 4,
              "passDefEpa": 3,
              "rushDefEpa": 9,
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
              "passOffEpa": 0.456,
              "turnoverDiff": 0,
              "passDefEpa": 0.442,
              "rushDefEpa": -0.208,
              "pointsFor": 41,
              "pointsAgainst": 31
            },
            "ranks": {
              "passOffEpa": 5,
              "turnoverDiff": 11,
              "passDefEpa": 27,
              "rushDefEpa": 11,
              "pointsFor": 1,
              "pointsAgainst": 26
            }
          },
          {
            "abbr": "MIA",
            "values": {
              "passOffEpa": 0.165,
              "turnoverDiff": 0,
              "passDefEpa": 1.06,
              "rushDefEpa": -0.063,
              "pointsFor": 13,
              "pointsAgainst": 35
            },
            "ranks": {
              "passOffEpa": 16,
              "turnoverDiff": 12,
              "passDefEpa": 32,
              "rushDefEpa": 22,
              "pointsFor": 24,
              "pointsAgainst": 30
            }
          },
          {
            "abbr": "NE",
            "values": {
              "passOffEpa": -0.051,
              "turnoverDiff": 0,
              "passDefEpa": -0.496,
              "rushDefEpa": -0.087,
              "pointsFor": 20,
              "pointsAgainst": 3
            },
            "ranks": {
              "passOffEpa": 23,
              "turnoverDiff": 13,
              "passDefEpa": 3,
              "rushDefEpa": 21,
              "pointsFor": 14,
              "pointsAgainst": 1
            }
          },
          {
            "abbr": "NYJ",
            "values": {
              "passOffEpa": 0.095,
              "turnoverDiff": 1,
              "passDefEpa": -0.099,
              "rushDefEpa": -0.441,
              "pointsFor": 17,
              "pointsAgainst": 20
            },
            "ranks": {
              "passOffEpa": 18,
              "turnoverDiff": 5,
              "passDefEpa": 9,
              "rushDefEpa": 4,
              "pointsFor": 21,
              "pointsAgainst": 14
            }
          },
          {
            "abbr": "BAL",
            "values": {
              "passOffEpa": 0.098,
              "turnoverDiff": -1,
              "passDefEpa": 0.295,
              "rushDefEpa": -0.051,
              "pointsFor": 17,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 17,
              "turnoverDiff": 23,
              "passDefEpa": 25,
              "rushDefEpa": 23,
              "pointsFor": 22,
              "pointsAgainst": 21
            }
          },
          {
            "abbr": "CIN",
            "values": {
              "passOffEpa": -0.015,
              "turnoverDiff": 0,
              "passDefEpa": -0.161,
              "rushDefEpa": -0.538,
              "pointsFor": 20,
              "pointsAgainst": 6
            },
            "ranks": {
              "passOffEpa": 21,
              "turnoverDiff": 14,
              "passDefEpa": 6,
              "rushDefEpa": 1,
              "pointsFor": 15,
              "pointsAgainst": 4
            }
          },
          {
            "abbr": "CLE",
            "values": {
              "passOffEpa": 0.324,
              "turnoverDiff": 1,
              "passDefEpa": -0.367,
              "rushDefEpa": 0.18,
              "pointsFor": 23,
              "pointsAgainst": 19
            },
            "ranks": {
              "passOffEpa": 7,
              "turnoverDiff": 6,
              "passDefEpa": 4,
              "rushDefEpa": 31,
              "pointsFor": 13,
              "pointsAgainst": 13
            }
          },
          {
            "abbr": "PIT",
            "values": {
              "passOffEpa": -0.496,
              "turnoverDiff": 0,
              "passDefEpa": -0.051,
              "rushDefEpa": 0.062,
              "pointsFor": 3,
              "pointsAgainst": 20
            },
            "ranks": {
              "passOffEpa": 30,
              "turnoverDiff": 15,
              "passDefEpa": 10,
              "rushDefEpa": 24,
              "pointsFor": 30,
              "pointsAgainst": 15
            }
          },
          {
            "abbr": "HOU",
            "values": {
              "passOffEpa": -0.161,
              "turnoverDiff": 0,
              "passDefEpa": -0.015,
              "rushDefEpa": -0.208,
              "pointsFor": 6,
              "pointsAgainst": 20
            },
            "ranks": {
              "passOffEpa": 27,
              "turnoverDiff": 16,
              "passDefEpa": 12,
              "rushDefEpa": 12,
              "pointsFor": 28,
              "pointsAgainst": 16
            }
          },
          {
            "abbr": "IND",
            "values": {
              "passOffEpa": 0.19,
              "turnoverDiff": -1,
              "passDefEpa": 0.274,
              "rushDefEpa": 0.153,
              "pointsFor": 30,
              "pointsAgainst": 33
            },
            "ranks": {
              "passOffEpa": 14,
              "turnoverDiff": 24,
              "passDefEpa": 23,
              "rushDefEpa": 30,
              "pointsFor": 8,
              "pointsAgainst": 28
            }
          },
          {
            "abbr": "JAX",
            "values": {
              "passOffEpa": -0.133,
              "turnoverDiff": 0,
              "passDefEpa": 0.272,
              "rushDefEpa": -0.171,
              "pointsFor": 13,
              "pointsAgainst": 20
            },
            "ranks": {
              "passOffEpa": 26,
              "turnoverDiff": 17,
              "passDefEpa": 22,
              "rushDefEpa": 16,
              "pointsFor": 25,
              "pointsAgainst": 17
            }
          },
          {
            "abbr": "TEN",
            "values": {
              "passOffEpa": -0.004,
              "turnoverDiff": 2,
              "passDefEpa": 0.219,
              "rushDefEpa": -0.186,
              "pointsFor": 20,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 20,
              "turnoverDiff": 2,
              "passDefEpa": 21,
              "rushDefEpa": 14,
              "pointsFor": 16,
              "pointsAgainst": 22
            }
          },
          {
            "abbr": "DEN",
            "values": {
              "passOffEpa": 0.272,
              "turnoverDiff": 0,
              "passDefEpa": -0.133,
              "rushDefEpa": 0.062,
              "pointsFor": 20,
              "pointsAgainst": 13
            },
            "ranks": {
              "passOffEpa": 11,
              "turnoverDiff": 18,
              "passDefEpa": 7,
              "rushDefEpa": 25,
              "pointsFor": 17,
              "pointsAgainst": 8
            }
          },
          {
            "abbr": "KC",
            "values": {
              "passOffEpa": 0.274,
              "turnoverDiff": 1,
              "passDefEpa": 0.19,
              "rushDefEpa": 0.12,
              "pointsFor": 33,
              "pointsAgainst": 30
            },
            "ranks": {
              "passOffEpa": 10,
              "turnoverDiff": 7,
              "passDefEpa": 19,
              "rushDefEpa": 27,
              "pointsFor": 5,
              "pointsAgainst": 25
            }
          },
          {
            "abbr": "LV",
            "values": {
              "passOffEpa": 0.193,
              "turnoverDiff": 2,
              "passDefEpa": -0.019,
              "rushDefEpa": -0.488,
              "pointsFor": 26,
              "pointsAgainst": 14
            },
            "ranks": {
              "passOffEpa": 13,
              "turnoverDiff": 3,
              "passDefEpa": 11,
              "rushDefEpa": 2,
              "pointsFor": 10,
              "pointsAgainst": 10
            }
          },
          {
            "abbr": "LAC",
            "values": {
              "passOffEpa": -0.019,
              "turnoverDiff": -2,
              "passDefEpa": 0.193,
              "rushDefEpa": -0.466,
              "pointsFor": 14,
              "pointsAgainst": 26
            },
            "ranks": {
              "passOffEpa": 22,
              "turnoverDiff": 29,
              "passDefEpa": 20,
              "rushDefEpa": 3,
              "pointsFor": 23,
              "pointsAgainst": 23
            }
          },
          {
            "abbr": "DAL",
            "values": {
              "passOffEpa": 0.458,
              "turnoverDiff": 1,
              "passDefEpa": 0.168,
              "rushDefEpa": 0.106,
              "pointsFor": 37,
              "pointsAgainst": 20
            },
            "ranks": {
              "passOffEpa": 4,
              "turnoverDiff": 8,
              "passDefEpa": 18,
              "rushDefEpa": 26,
              "pointsFor": 2,
              "pointsAgainst": 18
            }
          },
          {
            "abbr": "NYG",
            "values": {
              "passOffEpa": -0.518,
              "turnoverDiff": 1,
              "passDefEpa": 0.582,
              "rushDefEpa": -0.239,
              "pointsFor": 6,
              "pointsAgainst": 28
            },
            "ranks": {
              "passOffEpa": 31,
              "turnoverDiff": 9,
              "passDefEpa": 30,
              "rushDefEpa": 9,
              "pointsFor": 29,
              "pointsAgainst": 24
            }
          },
          {
            "abbr": "PHI",
            "values": {
              "passOffEpa": 0.219,
              "turnoverDiff": -2,
              "passDefEpa": -0.004,
              "rushDefEpa": 0.135,
              "pointsFor": 24,
              "pointsAgainst": 20
            },
            "ranks": {
              "passOffEpa": 12,
              "turnoverDiff": 30,
              "passDefEpa": 13,
              "rushDefEpa": 28,
              "pointsFor": 11,
              "pointsAgainst": 19
            }
          },
          {
            "abbr": "WSH",
            "values": {
              "passOffEpa": 0.168,
              "turnoverDiff": -1,
              "passDefEpa": 0.458,
              "rushDefEpa": -0.136,
              "pointsFor": 20,
              "pointsAgainst": 37
            },
            "ranks": {
              "passOffEpa": 15,
              "turnoverDiff": 25,
              "passDefEpa": 29,
              "rushDefEpa": 20,
              "pointsFor": 18,
              "pointsAgainst": 31
            }
          },
          {
            "abbr": "CHI",
            "values": {
              "passOffEpa": -0.1,
              "turnoverDiff": -2,
              "passDefEpa": 0.022,
              "rushDefEpa": -0.16,
              "pointsFor": 3,
              "pointsAgainst": 9
            },
            "ranks": {
              "passOffEpa": 25,
              "turnoverDiff": 31,
              "passDefEpa": 14,
              "rushDefEpa": 17,
              "pointsFor": 31,
              "pointsAgainst": 7
            }
          },
          {
            "abbr": "DET",
            "values": {
              "passOffEpa": 0.442,
              "turnoverDiff": 0,
              "passDefEpa": 0.456,
              "rushDefEpa": 0.272,
              "pointsFor": 31,
              "pointsAgainst": 41
            },
            "ranks": {
              "passOffEpa": 6,
              "turnoverDiff": 19,
              "passDefEpa": 28,
              "rushDefEpa": 32,
              "pointsFor": 6,
              "pointsAgainst": 32
            }
          },
          {
            "abbr": "GB",
            "values": {
              "passOffEpa": -0.099,
              "turnoverDiff": -1,
              "passDefEpa": 0.095,
              "rushDefEpa": -0.439,
              "pointsFor": 20,
              "pointsAgainst": 17
            },
            "ranks": {
              "passOffEpa": 24,
              "turnoverDiff": 26,
              "passDefEpa": 15,
              "rushDefEpa": 5,
              "pointsFor": 19,
              "pointsAgainst": 11
            }
          },
          {
            "abbr": "MIN",
            "values": {
              "passOffEpa": 0.022,
              "turnoverDiff": 2,
              "passDefEpa": -0.1,
              "rushDefEpa": -0.16,
              "pointsFor": 9,
              "pointsAgainst": 3
            },
            "ranks": {
              "passOffEpa": 19,
              "turnoverDiff": 4,
              "passDefEpa": 8,
              "rushDefEpa": 18,
              "pointsFor": 26,
              "pointsAgainst": 2
            }
          },
          {
            "abbr": "ATL",
            "values": {
              "passOffEpa": -0.716,
              "turnoverDiff": -5,
              "passDefEpa": 0.291,
              "rushDefEpa": -0.23,
              "pointsFor": 3,
              "pointsAgainst": 34
            },
            "ranks": {
              "passOffEpa": 32,
              "turnoverDiff": 32,
              "passDefEpa": 24,
              "rushDefEpa": 10,
              "pointsFor": 32,
              "pointsAgainst": 29
            }
          },
          {
            "abbr": "CAR",
            "values": {
              "passOffEpa": 0.291,
              "turnoverDiff": 5,
              "passDefEpa": -0.716,
              "rushDefEpa": -0.208,
              "pointsFor": 34,
              "pointsAgainst": 3
            },
            "ranks": {
              "passOffEpa": 9,
              "turnoverDiff": 1,
              "passDefEpa": 1,
              "rushDefEpa": 13,
              "pointsFor": 4,
              "pointsAgainst": 3
            }
          },
          {
            "abbr": "NO",
            "values": {
              "passOffEpa": 0.295,
              "turnoverDiff": 1,
              "passDefEpa": 0.098,
              "rushDefEpa": 0.136,
              "pointsFor": 24,
              "pointsAgainst": 17
            },
            "ranks": {
              "passOffEpa": 8,
              "turnoverDiff": 10,
              "passDefEpa": 16,
              "rushDefEpa": 29,
              "pointsFor": 12,
              "pointsAgainst": 12
            }
          },
          {
            "abbr": "TB",
            "values": {
              "passOffEpa": -0.367,
              "turnoverDiff": -1,
              "passDefEpa": 0.324,
              "rushDefEpa": -0.429,
              "pointsFor": 19,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 29,
              "turnoverDiff": 27,
              "passDefEpa": 26,
              "rushDefEpa": 6,
              "pointsFor": 20,
              "pointsAgainst": 20
            }
          },
          {
            "abbr": "ARI",
            "values": {
              "passOffEpa": -0.269,
              "turnoverDiff": 0,
              "passDefEpa": 0.596,
              "rushDefEpa": -0.178,
              "pointsFor": 7,
              "pointsAgainst": 31
            },
            "ranks": {
              "passOffEpa": 28,
              "turnoverDiff": 20,
              "passDefEpa": 31,
              "rushDefEpa": 15,
              "pointsFor": 27,
              "pointsAgainst": 27
            }
          },
          {
            "abbr": "LAR",
            "values": {
              "passOffEpa": 0.582,
              "turnoverDiff": -1,
              "passDefEpa": -0.518,
              "rushDefEpa": -0.286,
              "pointsFor": 28,
              "pointsAgainst": 6
            },
            "ranks": {
              "passOffEpa": 3,
              "turnoverDiff": 28,
              "passDefEpa": 2,
              "rushDefEpa": 8,
              "pointsFor": 9,
              "pointsAgainst": 5
            }
          },
          {
            "abbr": "SF",
            "values": {
              "passOffEpa": 1.06,
              "turnoverDiff": 0,
              "passDefEpa": 0.165,
              "rushDefEpa": -0.156,
              "pointsFor": 35,
              "pointsAgainst": 13
            },
            "ranks": {
              "passOffEpa": 1,
              "turnoverDiff": 21,
              "passDefEpa": 17,
              "rushDefEpa": 19,
              "pointsFor": 3,
              "pointsAgainst": 9
            }
          },
          {
            "abbr": "SEA",
            "values": {
              "passOffEpa": 0.596,
              "turnoverDiff": 0,
              "passDefEpa": -0.269,
              "rushDefEpa": -0.424,
              "pointsFor": 31,
              "pointsAgainst": 7
            },
            "ranks": {
              "passOffEpa": 2,
              "turnoverDiff": 22,
              "passDefEpa": 5,
              "rushDefEpa": 7,
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
              "passOffEpa": 0.31,
              "turnoverDiff": -0.67,
              "passDefEpa": 0.115,
              "rushDefEpa": 0.015,
              "pointsFor": 33.67,
              "pointsAgainst": 26
            },
            "ranks": {
              "passOffEpa": 5,
              "turnoverDiff": 24,
              "passDefEpa": 19,
              "rushDefEpa": 25,
              "pointsFor": 1,
              "pointsAgainst": 21
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "MIA",
            "values": {
              "passOffEpa": -0.054,
              "turnoverDiff": -0.33,
              "passDefEpa": 0.482,
              "rushDefEpa": -0.144,
              "pointsFor": 12,
              "pointsAgainst": 28.67
            },
            "ranks": {
              "passOffEpa": 21,
              "turnoverDiff": 21,
              "passDefEpa": 32,
              "rushDefEpa": 8,
              "pointsFor": 31,
              "pointsAgainst": 28
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "NE",
            "values": {
              "passOffEpa": -0.208,
              "turnoverDiff": -1.67,
              "passDefEpa": -0.099,
              "rushDefEpa": 0.038,
              "pointsFor": 12,
              "pointsAgainst": 17
            },
            "ranks": {
              "passOffEpa": 30,
              "turnoverDiff": 28,
              "passDefEpa": 5,
              "rushDefEpa": 28,
              "pointsFor": 32,
              "pointsAgainst": 6
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "NYJ",
            "values": {
              "passOffEpa": 0.224,
              "turnoverDiff": 0.33,
              "passDefEpa": 0.016,
              "rushDefEpa": -0.133,
              "pointsFor": 21.33,
              "pointsAgainst": 20.33
            },
            "ranks": {
              "passOffEpa": 9,
              "turnoverDiff": 13,
              "passDefEpa": 15,
              "rushDefEpa": 9,
              "pointsFor": 17,
              "pointsAgainst": 12
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "BAL",
            "values": {
              "passOffEpa": 0.316,
              "turnoverDiff": 0.33,
              "passDefEpa": 0.132,
              "rushDefEpa": 0.002,
              "pointsFor": 30.67,
              "pointsAgainst": 26
            },
            "ranks": {
              "passOffEpa": 3,
              "turnoverDiff": 14,
              "passDefEpa": 21,
              "rushDefEpa": 23,
              "pointsFor": 4,
              "pointsAgainst": 22
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "CIN",
            "values": {
              "passOffEpa": 0.104,
              "turnoverDiff": 0.67,
              "passDefEpa": -0.051,
              "rushDefEpa": -0.167,
              "pointsFor": 26.67,
              "pointsAgainst": 21
            },
            "ranks": {
              "passOffEpa": 15,
              "turnoverDiff": 10,
              "passDefEpa": 9,
              "rushDefEpa": 7,
              "pointsFor": 12,
              "pointsAgainst": 13
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "CLE",
            "values": {
              "passOffEpa": 0.076,
              "turnoverDiff": -0.33,
              "passDefEpa": -0.004,
              "rushDefEpa": -0.002,
              "pointsFor": 18,
              "pointsAgainst": 23.67
            },
            "ranks": {
              "passOffEpa": 17,
              "turnoverDiff": 22,
              "passDefEpa": 14,
              "rushDefEpa": 22,
              "pointsFor": 24,
              "pointsAgainst": 18
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "PIT",
            "values": {
              "passOffEpa": -0.187,
              "turnoverDiff": 0.67,
              "passDefEpa": -0.027,
              "rushDefEpa": 0.003,
              "pointsFor": 17.67,
              "pointsAgainst": 20
            },
            "ranks": {
              "passOffEpa": 29,
              "turnoverDiff": 11,
              "passDefEpa": 12,
              "rushDefEpa": 24,
              "pointsFor": 26,
              "pointsAgainst": 11
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "HOU",
            "values": {
              "passOffEpa": -0.086,
              "turnoverDiff": 0.33,
              "passDefEpa": 0.067,
              "rushDefEpa": -0.115,
              "pointsFor": 18,
              "pointsAgainst": 25
            },
            "ranks": {
              "passOffEpa": 24,
              "turnoverDiff": 15,
              "passDefEpa": 17,
              "rushDefEpa": 12,
              "pointsFor": 25,
              "pointsAgainst": 19
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "IND",
            "values": {
              "passOffEpa": -0.102,
              "turnoverDiff": -1.67,
              "passDefEpa": 0.195,
              "rushDefEpa": 0.109,
              "pointsFor": 24,
              "pointsAgainst": 30.33
            },
            "ranks": {
              "passOffEpa": 25,
              "turnoverDiff": 29,
              "passDefEpa": 27,
              "rushDefEpa": 31,
              "pointsFor": 15,
              "pointsAgainst": 29
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "JAX",
            "values": {
              "passOffEpa": 0.264,
              "turnoverDiff": 1.33,
              "passDefEpa": -0.12,
              "rushDefEpa": -0.069,
              "pointsFor": 27.33,
              "pointsAgainst": 12
            },
            "ranks": {
              "passOffEpa": 6,
              "turnoverDiff": 2,
              "passDefEpa": 4,
              "rushDefEpa": 16,
              "pointsFor": 10,
              "pointsAgainst": 1
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "TEN",
            "values": {
              "passOffEpa": -0.15,
              "turnoverDiff": -0.33,
              "passDefEpa": 0.139,
              "rushDefEpa": -0.084,
              "pointsFor": 12.33,
              "pointsAgainst": 19.67
            },
            "ranks": {
              "passOffEpa": 28,
              "turnoverDiff": 23,
              "passDefEpa": 22,
              "rushDefEpa": 14,
              "pointsFor": 30,
              "pointsAgainst": 10
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "DEN",
            "values": {
              "passOffEpa": -0.072,
              "turnoverDiff": 0,
              "passDefEpa": -0.06,
              "rushDefEpa": 0.145,
              "pointsFor": 20,
              "pointsAgainst": 23.33
            },
            "ranks": {
              "passOffEpa": 23,
              "turnoverDiff": 16,
              "passDefEpa": 8,
              "rushDefEpa": 32,
              "pointsFor": 21,
              "pointsAgainst": 17
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "KC",
            "values": {
              "passOffEpa": 0.236,
              "turnoverDiff": 1,
              "passDefEpa": -0.127,
              "rushDefEpa": -0.047,
              "pointsFor": 29.33,
              "pointsAgainst": 16.67
            },
            "ranks": {
              "passOffEpa": 8,
              "turnoverDiff": 4,
              "passDefEpa": 3,
              "rushDefEpa": 17,
              "pointsFor": 7,
              "pointsAgainst": 3
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "LV",
            "values": {
              "passOffEpa": 0.158,
              "turnoverDiff": 1.67,
              "passDefEpa": -0.091,
              "rushDefEpa": -0.202,
              "pointsFor": 29.33,
              "pointsAgainst": 18
            },
            "ranks": {
              "passOffEpa": 11,
              "turnoverDiff": 1,
              "passDefEpa": 6,
              "rushDefEpa": 4,
              "pointsFor": 8,
              "pointsAgainst": 8
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "LAC",
            "values": {
              "passOffEpa": -0.131,
              "turnoverDiff": 0,
              "passDefEpa": 0.147,
              "rushDefEpa": -0.125,
              "pointsFor": 14.67,
              "pointsAgainst": 25.33
            },
            "ranks": {
              "passOffEpa": 26,
              "turnoverDiff": 17,
              "passDefEpa": 23,
              "rushDefEpa": 11,
              "pointsFor": 29,
              "pointsAgainst": 20
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "DAL",
            "values": {
              "passOffEpa": 0.359,
              "turnoverDiff": 0,
              "passDefEpa": 0.462,
              "rushDefEpa": -0.014,
              "pointsFor": 29.33,
              "pointsAgainst": 27.33
            },
            "ranks": {
              "passOffEpa": 2,
              "turnoverDiff": 18,
              "passDefEpa": 31,
              "rushDefEpa": 19,
              "pointsFor": 9,
              "pointsAgainst": 25
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "NYG",
            "values": {
              "passOffEpa": -0.02,
              "turnoverDiff": 1,
              "passDefEpa": 0.221,
              "rushDefEpa": -0.111,
              "pointsFor": 15.33,
              "pointsAgainst": 18.33
            },
            "ranks": {
              "passOffEpa": 20,
              "turnoverDiff": 5,
              "passDefEpa": 29,
              "rushDefEpa": 13,
              "pointsFor": 28,
              "pointsAgainst": 9
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "PHI",
            "values": {
              "passOffEpa": -0.068,
              "turnoverDiff": -1.67,
              "passDefEpa": 0.122,
              "rushDefEpa": -0.013,
              "pointsFor": 18.33,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 22,
              "turnoverDiff": 30,
              "passDefEpa": 20,
              "rushDefEpa": 21,
              "pointsFor": 23,
              "pointsAgainst": 16
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "WSH",
            "values": {
              "passOffEpa": 0.132,
              "turnoverDiff": 0.67,
              "passDefEpa": 0.2,
              "rushDefEpa": -0.133,
              "pointsFor": 25,
              "pointsAgainst": 30.67
            },
            "ranks": {
              "passOffEpa": 13,
              "turnoverDiff": 12,
              "passDefEpa": 28,
              "rushDefEpa": 10,
              "pointsFor": 13,
              "pointsAgainst": 31
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "CHI",
            "values": {
              "passOffEpa": 0.211,
              "turnoverDiff": 1,
              "passDefEpa": -0.01,
              "rushDefEpa": 0.037,
              "pointsFor": 29.67,
              "pointsAgainst": 17.67
            },
            "ranks": {
              "passOffEpa": 10,
              "turnoverDiff": 6,
              "passDefEpa": 13,
              "rushDefEpa": 27,
              "pointsFor": 5,
              "pointsAgainst": 7
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "DET",
            "values": {
              "passOffEpa": 0.315,
              "turnoverDiff": 1,
              "passDefEpa": 0.183,
              "rushDefEpa": 0.041,
              "pointsFor": 31,
              "pointsAgainst": 31.67
            },
            "ranks": {
              "passOffEpa": 4,
              "turnoverDiff": 7,
              "passDefEpa": 26,
              "rushDefEpa": 29,
              "pointsFor": 3,
              "pointsAgainst": 32
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "GB",
            "values": {
              "passOffEpa": -0.017,
              "turnoverDiff": -0.67,
              "passDefEpa": 0.148,
              "rushDefEpa": -0.014,
              "pointsFor": 18.67,
              "pointsAgainst": 30.33
            },
            "ranks": {
              "passOffEpa": 19,
              "turnoverDiff": 25,
              "passDefEpa": 24,
              "rushDefEpa": 20,
              "pointsFor": 22,
              "pointsAgainst": 30
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "MIN",
            "values": {
              "passOffEpa": -0.135,
              "turnoverDiff": 1.33,
              "passDefEpa": -0.14,
              "rushDefEpa": -0.252,
              "pointsFor": 23.67,
              "pointsAgainst": 13.67
            },
            "ranks": {
              "passOffEpa": 27,
              "turnoverDiff": 3,
              "passDefEpa": 1,
              "rushDefEpa": 3,
              "pointsFor": 16,
              "pointsAgainst": 2
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "ATL",
            "values": {
              "passOffEpa": -0.364,
              "turnoverDiff": -2,
              "passDefEpa": 0.037,
              "rushDefEpa": -0.265,
              "pointsFor": 17,
              "pointsAgainst": 22.67
            },
            "ranks": {
              "passOffEpa": 32,
              "turnoverDiff": 32,
              "passDefEpa": 16,
              "rushDefEpa": 1,
              "pointsFor": 27,
              "pointsAgainst": 15
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "CAR",
            "values": {
              "passOffEpa": 0.157,
              "turnoverDiff": 1,
              "passDefEpa": -0.044,
              "rushDefEpa": 0.045,
              "pointsFor": 29.67,
              "pointsAgainst": 27.67
            },
            "ranks": {
              "passOffEpa": 12,
              "turnoverDiff": 8,
              "passDefEpa": 10,
              "rushDefEpa": 30,
              "pointsFor": 6,
              "pointsAgainst": 26
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "NO",
            "values": {
              "passOffEpa": 0.044,
              "turnoverDiff": -1.33,
              "passDefEpa": 0.165,
              "rushDefEpa": -0.028,
              "pointsFor": 27,
              "pointsAgainst": 27.67
            },
            "ranks": {
              "passOffEpa": 18,
              "turnoverDiff": 27,
              "passDefEpa": 25,
              "rushDefEpa": 18,
              "pointsFor": 11,
              "pointsAgainst": 27
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "TB",
            "values": {
              "passOffEpa": -0.271,
              "turnoverDiff": -1.67,
              "passDefEpa": -0.043,
              "rushDefEpa": -0.177,
              "pointsFor": 20.67,
              "pointsAgainst": 26.33
            },
            "ranks": {
              "passOffEpa": 31,
              "turnoverDiff": 31,
              "passDefEpa": 11,
              "rushDefEpa": 5,
              "pointsFor": 19,
              "pointsAgainst": 23
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "ARI",
            "values": {
              "passOffEpa": 0.09,
              "turnoverDiff": 1,
              "passDefEpa": 0.398,
              "rushDefEpa": -0.171,
              "pointsFor": 21,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 16,
              "turnoverDiff": 9,
              "passDefEpa": 30,
              "rushDefEpa": 6,
              "pointsFor": 18,
              "pointsAgainst": 24
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "LAR",
            "values": {
              "passOffEpa": 0.105,
              "turnoverDiff": -1,
              "passDefEpa": -0.134,
              "rushDefEpa": 0.017,
              "pointsFor": 20.33,
              "pointsAgainst": 21
            },
            "ranks": {
              "passOffEpa": 14,
              "turnoverDiff": 26,
              "passDefEpa": 2,
              "rushDefEpa": 26,
              "pointsFor": 20,
              "pointsAgainst": 14
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "SF",
            "values": {
              "passOffEpa": 0.615,
              "turnoverDiff": 0,
              "passDefEpa": 0.084,
              "rushDefEpa": -0.07,
              "pointsFor": 32.67,
              "pointsAgainst": 16.67
            },
            "ranks": {
              "passOffEpa": 1,
              "turnoverDiff": 19,
              "passDefEpa": 18,
              "rushDefEpa": 15,
              "pointsFor": 2,
              "pointsAgainst": 4
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "SEA",
            "values": {
              "passOffEpa": 0.257,
              "turnoverDiff": 0,
              "passDefEpa": -0.089,
              "rushDefEpa": -0.255,
              "pointsFor": 25,
              "pointsAgainst": 16.67
            },
            "ranks": {
              "passOffEpa": 7,
              "turnoverDiff": 20,
              "passDefEpa": 7,
              "rushDefEpa": 2,
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
              "passOffEpa": -0.014,
              "turnoverDiff": -4,
              "passDefEpa": -0.177,
              "rushDefEpa": 0.064,
              "pointsFor": 24,
              "pointsAgainst": 16
            },
            "ranks": {
              "passOffEpa": 19,
              "turnoverDiff": 32,
              "passDefEpa": 7,
              "rushDefEpa": 25,
              "pointsFor": 17,
              "pointsAgainst": 7
            }
          },
          {
            "abbr": "MIA",
            "values": {
              "passOffEpa": -0.112,
              "turnoverDiff": -1,
              "passDefEpa": 0.538,
              "rushDefEpa": -0.246,
              "pointsFor": 10,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 23,
              "turnoverDiff": 19,
              "passDefEpa": 30,
              "rushDefEpa": 5,
              "pointsFor": 29,
              "pointsAgainst": 14
            }
          },
          {
            "abbr": "NE",
            "values": {
              "passOffEpa": -0.409,
              "turnoverDiff": -2,
              "passDefEpa": 0.252,
              "rushDefEpa": 0.204,
              "pointsFor": 6,
              "pointsAgainst": 35
            },
            "ranks": {
              "passOffEpa": 31,
              "turnoverDiff": 26,
              "passDefEpa": 24,
              "rushDefEpa": 30,
              "pointsFor": 32,
              "pointsAgainst": 29
            }
          },
          {
            "abbr": "NYJ",
            "values": {
              "passOffEpa": 0.259,
              "turnoverDiff": -1,
              "passDefEpa": 0.357,
              "rushDefEpa": -0.062,
              "pointsFor": 24,
              "pointsAgainst": 31
            },
            "ranks": {
              "passOffEpa": 8,
              "turnoverDiff": 20,
              "passDefEpa": 27,
              "rushDefEpa": 16,
              "pointsFor": 18,
              "pointsAgainst": 24
            }
          },
          {
            "abbr": "BAL",
            "values": {
              "passOffEpa": 0.596,
              "turnoverDiff": 1,
              "passDefEpa": 0.325,
              "rushDefEpa": -0.031,
              "pointsFor": 34,
              "pointsAgainst": 31
            },
            "ranks": {
              "passOffEpa": 2,
              "turnoverDiff": 8,
              "passDefEpa": 26,
              "rushDefEpa": 19,
              "pointsFor": 5,
              "pointsAgainst": 25
            }
          },
          {
            "abbr": "CIN",
            "values": {
              "passOffEpa": 0.386,
              "turnoverDiff": -1,
              "passDefEpa": 0.237,
              "rushDefEpa": 0.045,
              "pointsFor": 27,
              "pointsAgainst": 30
            },
            "ranks": {
              "passOffEpa": 4,
              "turnoverDiff": 21,
              "passDefEpa": 22,
              "rushDefEpa": 23,
              "pointsFor": 13,
              "pointsAgainst": 21
            }
          },
          {
            "abbr": "CLE",
            "values": {
              "passOffEpa": 0.065,
              "turnoverDiff": 0,
              "passDefEpa": -0.116,
              "rushDefEpa": -0.154,
              "pointsFor": 21,
              "pointsAgainst": 18
            },
            "ranks": {
              "passOffEpa": 17,
              "turnoverDiff": 15,
              "passDefEpa": 9,
              "rushDefEpa": 9,
              "pointsFor": 21,
              "pointsAgainst": 10
            }
          },
          {
            "abbr": "PIT",
            "values": {
              "passOffEpa": 0.237,
              "turnoverDiff": 1,
              "passDefEpa": 0.386,
              "rushDefEpa": 0.059,
              "pointsFor": 30,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 11,
              "turnoverDiff": 9,
              "passDefEpa": 29,
              "rushDefEpa": 24,
              "pointsFor": 10,
              "pointsAgainst": 18
            }
          },
          {
            "abbr": "HOU",
            "values": {
              "passOffEpa": -0.103,
              "turnoverDiff": 3,
              "passDefEpa": -0.172,
              "rushDefEpa": -0.039,
              "pointsFor": 17,
              "pointsAgainst": 19
            },
            "ranks": {
              "passOffEpa": 22,
              "turnoverDiff": 2,
              "passDefEpa": 8,
              "rushDefEpa": 18,
              "pointsFor": 24,
              "pointsAgainst": 11
            }
          },
          {
            "abbr": "IND",
            "values": {
              "passOffEpa": -0.172,
              "turnoverDiff": -3,
              "passDefEpa": -0.103,
              "rushDefEpa": -0.077,
              "pointsFor": 19,
              "pointsAgainst": 17
            },
            "ranks": {
              "passOffEpa": 25,
              "turnoverDiff": 28,
              "passDefEpa": 11,
              "rushDefEpa": 15,
              "pointsFor": 22,
              "pointsAgainst": 9
            }
          },
          {
            "abbr": "JAX",
            "values": {
              "passOffEpa": 0.252,
              "turnoverDiff": 2,
              "passDefEpa": -0.409,
              "rushDefEpa": -0.048,
              "pointsFor": 35,
              "pointsAgainst": 6
            },
            "ranks": {
              "passOffEpa": 9,
              "turnoverDiff": 6,
              "passDefEpa": 2,
              "rushDefEpa": 17,
              "pointsFor": 2,
              "pointsAgainst": 1
            }
          },
          {
            "abbr": "TEN",
            "values": {
              "passOffEpa": -0.18,
              "turnoverDiff": -2,
              "passDefEpa": -0.245,
              "rushDefEpa": -0.015,
              "pointsFor": 7,
              "pointsAgainst": 12
            },
            "ranks": {
              "passOffEpa": 27,
              "turnoverDiff": 27,
              "passDefEpa": 5,
              "rushDefEpa": 21,
              "pointsFor": 30,
              "pointsAgainst": 5
            }
          },
          {
            "abbr": "DEN",
            "values": {
              "passOffEpa": -0.031,
              "turnoverDiff": 1,
              "passDefEpa": -0.012,
              "rushDefEpa": 0.098,
              "pointsFor": 30,
              "pointsAgainst": 26
            },
            "ranks": {
              "passOffEpa": 20,
              "turnoverDiff": 10,
              "passDefEpa": 15,
              "rushDefEpa": 29,
              "pointsFor": 11,
              "pointsAgainst": 17
            }
          },
          {
            "abbr": "KC",
            "values": {
              "passOffEpa": 0.538,
              "turnoverDiff": 1,
              "passDefEpa": -0.112,
              "rushDefEpa": -0.196,
              "pointsFor": 24,
              "pointsAgainst": 10
            },
            "ranks": {
              "passOffEpa": 3,
              "turnoverDiff": 11,
              "passDefEpa": 10,
              "rushDefEpa": 7,
              "pointsFor": 19,
              "pointsAgainst": 4
            }
          },
          {
            "abbr": "LV",
            "values": {
              "passOffEpa": 0.249,
              "turnoverDiff": 3,
              "passDefEpa": -0.082,
              "rushDefEpa": 0.087,
              "pointsFor": 35,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 10,
              "turnoverDiff": 3,
              "passDefEpa": 12,
              "rushDefEpa": 27,
              "pointsFor": 3,
              "pointsAgainst": 19
            }
          },
          {
            "abbr": "LAC",
            "values": {
              "passOffEpa": -0.177,
              "turnoverDiff": 4,
              "passDefEpa": -0.014,
              "rushDefEpa": 0.064,
              "pointsFor": 16,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 26,
              "turnoverDiff": 1,
              "passDefEpa": 14,
              "rushDefEpa": 26,
              "pointsFor": 25,
              "pointsAgainst": 15
            }
          },
          {
            "abbr": "DAL",
            "values": {
              "passOffEpa": 0.325,
              "turnoverDiff": -1,
              "passDefEpa": 0.596,
              "rushDefEpa": -0.11,
              "pointsFor": 31,
              "pointsAgainst": 34
            },
            "ranks": {
              "passOffEpa": 7,
              "turnoverDiff": 22,
              "passDefEpa": 31,
              "rushDefEpa": 12,
              "pointsFor": 7,
              "pointsAgainst": 28
            }
          },
          {
            "abbr": "NYG",
            "values": {
              "passOffEpa": -0.245,
              "turnoverDiff": 2,
              "passDefEpa": -0.18,
              "rushDefEpa": -0.089,
              "pointsFor": 12,
              "pointsAgainst": 7
            },
            "ranks": {
              "passOffEpa": 28,
              "turnoverDiff": 7,
              "passDefEpa": 6,
              "rushDefEpa": 14,
              "pointsFor": 28,
              "pointsAgainst": 2
            }
          },
          {
            "abbr": "PHI",
            "values": {
              "passOffEpa": -0.59,
              "turnoverDiff": -3,
              "passDefEpa": 0.213,
              "rushDefEpa": -0.154,
              "pointsFor": 7,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 32,
              "turnoverDiff": 29,
              "passDefEpa": 21,
              "rushDefEpa": 10,
              "pointsFor": 31,
              "pointsAgainst": 20
            }
          },
          {
            "abbr": "WSH",
            "values": {
              "passOffEpa": 0.117,
              "turnoverDiff": 3,
              "passDefEpa": 0.109,
              "rushDefEpa": -0.443,
              "pointsFor": 33,
              "pointsAgainst": 31
            },
            "ranks": {
              "passOffEpa": 14,
              "turnoverDiff": 4,
              "passDefEpa": 18,
              "rushDefEpa": 1,
              "pointsFor": 6,
              "pointsAgainst": 26
            }
          },
          {
            "abbr": "CHI",
            "values": {
              "passOffEpa": 0.213,
              "turnoverDiff": 3,
              "passDefEpa": -0.59,
              "rushDefEpa": 0.307,
              "pointsFor": 27,
              "pointsAgainst": 7
            },
            "ranks": {
              "passOffEpa": 12,
              "turnoverDiff": 5,
              "passDefEpa": 1,
              "rushDefEpa": 32,
              "pointsFor": 14,
              "pointsAgainst": 3
            }
          },
          {
            "abbr": "DET",
            "values": {
              "passOffEpa": 0.357,
              "turnoverDiff": 1,
              "passDefEpa": 0.259,
              "rushDefEpa": -0.258,
              "pointsFor": 31,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 6,
              "turnoverDiff": 12,
              "passDefEpa": 25,
              "rushDefEpa": 4,
              "pointsFor": 8,
              "pointsAgainst": 16
            }
          },
          {
            "abbr": "GB",
            "values": {
              "passOffEpa": 0.066,
              "turnoverDiff": 0,
              "passDefEpa": 0.38,
              "rushDefEpa": 0.294,
              "pointsFor": 14,
              "pointsAgainst": 35
            },
            "ranks": {
              "passOffEpa": 16,
              "turnoverDiff": 16,
              "passDefEpa": 28,
              "rushDefEpa": 31,
              "pointsFor": 27,
              "pointsAgainst": 30
            }
          },
          {
            "abbr": "MIN",
            "values": {
              "passOffEpa": -0.378,
              "turnoverDiff": 1,
              "passDefEpa": -0.264,
              "rushDefEpa": -0.21,
              "pointsFor": 23,
              "pointsAgainst": 16
            },
            "ranks": {
              "passOffEpa": 30,
              "turnoverDiff": 13,
              "passDefEpa": 4,
              "rushDefEpa": 6,
              "pointsFor": 20,
              "pointsAgainst": 8
            }
          },
          {
            "abbr": "ATL",
            "values": {
              "passOffEpa": 0.38,
              "turnoverDiff": 0,
              "passDefEpa": 0.066,
              "rushDefEpa": -0.301,
              "pointsFor": 35,
              "pointsAgainst": 14
            },
            "ranks": {
              "passOffEpa": 5,
              "turnoverDiff": 17,
              "passDefEpa": 17,
              "rushDefEpa": 3,
              "pointsFor": 4,
              "pointsAgainst": 6
            }
          },
          {
            "abbr": "CAR",
            "values": {
              "passOffEpa": -0.116,
              "turnoverDiff": 0,
              "passDefEpa": 0.065,
              "rushDefEpa": -0.117,
              "pointsFor": 18,
              "pointsAgainst": 21
            },
            "ranks": {
              "passOffEpa": 24,
              "turnoverDiff": 18,
              "passDefEpa": 16,
              "rushDefEpa": 11,
              "pointsFor": 23,
              "pointsAgainst": 12
            }
          },
          {
            "abbr": "NO",
            "values": {
              "passOffEpa": -0.082,
              "turnoverDiff": -3,
              "passDefEpa": 0.249,
              "rushDefEpa": -0.171,
              "pointsFor": 27,
              "pointsAgainst": 35
            },
            "ranks": {
              "passOffEpa": 21,
              "turnoverDiff": 30,
              "passDefEpa": 23,
              "rushDefEpa": 8,
              "pointsFor": 15,
              "pointsAgainst": 31
            }
          },
          {
            "abbr": "TB",
            "values": {
              "passOffEpa": -0.264,
              "turnoverDiff": -1,
              "passDefEpa": -0.378,
              "rushDefEpa": -0.105,
              "pointsFor": 16,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 29,
              "turnoverDiff": 23,
              "passDefEpa": 3,
              "rushDefEpa": 13,
              "pointsFor": 26,
              "pointsAgainst": 13
            }
          },
          {
            "abbr": "ARI",
            "values": {
              "passOffEpa": 0.187,
              "turnoverDiff": 1,
              "passDefEpa": 0.849,
              "rushDefEpa": -0.016,
              "pointsFor": 30,
              "pointsAgainst": 36
            },
            "ranks": {
              "passOffEpa": 13,
              "turnoverDiff": 14,
              "passDefEpa": 32,
              "rushDefEpa": 20,
              "pointsFor": 12,
              "pointsAgainst": 32
            }
          },
          {
            "abbr": "LAR",
            "values": {
              "passOffEpa": -0.012,
              "turnoverDiff": -1,
              "passDefEpa": -0.031,
              "rushDefEpa": 0.026,
              "pointsFor": 26,
              "pointsAgainst": 30
            },
            "ranks": {
              "passOffEpa": 18,
              "turnoverDiff": 24,
              "passDefEpa": 13,
              "rushDefEpa": 22,
              "pointsFor": 16,
              "pointsAgainst": 22
            }
          },
          {
            "abbr": "SF",
            "values": {
              "passOffEpa": 0.849,
              "turnoverDiff": -1,
              "passDefEpa": 0.187,
              "rushDefEpa": 0.087,
              "pointsFor": 36,
              "pointsAgainst": 30
            },
            "ranks": {
              "passOffEpa": 1,
              "turnoverDiff": 25,
              "passDefEpa": 20,
              "rushDefEpa": 28,
              "pointsFor": 1,
              "pointsAgainst": 23
            }
          },
          {
            "abbr": "SEA",
            "values": {
              "passOffEpa": 0.109,
              "turnoverDiff": -3,
              "passDefEpa": 0.117,
              "rushDefEpa": -0.328,
              "pointsFor": 31,
              "pointsAgainst": 33
            },
            "ranks": {
              "passOffEpa": 15,
              "turnoverDiff": 31,
              "passDefEpa": 19,
              "rushDefEpa": 2,
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
              "passOffEpa": 0.265,
              "turnoverDiff": -0.5,
              "passDefEpa": 0.158,
              "rushDefEpa": 0.034,
              "pointsFor": 31.75,
              "pointsAgainst": 26.75
            },
            "ranks": {
              "passOffEpa": 6,
              "turnoverDiff": 21,
              "passDefEpa": 26,
              "rushDefEpa": 26,
              "pointsFor": 1,
              "pointsAgainst": 25
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "MIA",
            "values": {
              "passOffEpa": -0.153,
              "turnoverDiff": -0.5,
              "passDefEpa": 0.308,
              "rushDefEpa": -0.176,
              "pointsFor": 11.5,
              "pointsAgainst": 25.25
            },
            "ranks": {
              "passOffEpa": 28,
              "turnoverDiff": 22,
              "passDefEpa": 30,
              "rushDefEpa": 4,
              "pointsFor": 32,
              "pointsAgainst": 21
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "NE",
            "values": {
              "passOffEpa": -0.066,
              "turnoverDiff": -1.25,
              "passDefEpa": -0.038,
              "rushDefEpa": 0.059,
              "pointsFor": 16.25,
              "pointsAgainst": 19.25
            },
            "ranks": {
              "passOffEpa": 23,
              "turnoverDiff": 27,
              "passDefEpa": 6,
              "rushDefEpa": 30,
              "pointsFor": 30,
              "pointsAgainst": 6
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "NYJ",
            "values": {
              "passOffEpa": 0.156,
              "turnoverDiff": 0.75,
              "passDefEpa": 0.07,
              "rushDefEpa": -0.128,
              "pointsFor": 19,
              "pointsAgainst": 21
            },
            "ranks": {
              "passOffEpa": 12,
              "turnoverDiff": 4,
              "passDefEpa": 18,
              "rushDefEpa": 7,
              "pointsFor": 24,
              "pointsAgainst": 11
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "BAL",
            "values": {
              "passOffEpa": 0.336,
              "turnoverDiff": 0.75,
              "passDefEpa": 0.105,
              "rushDefEpa": -0.05,
              "pointsFor": 29,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 2,
              "turnoverDiff": 5,
              "passDefEpa": 24,
              "rushDefEpa": 17,
              "pointsFor": 7,
              "pointsAgainst": 19
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "CIN",
            "values": {
              "passOffEpa": 0.114,
              "turnoverDiff": 0,
              "passDefEpa": 0.018,
              "rushDefEpa": -0.106,
              "pointsFor": 24.25,
              "pointsAgainst": 21.25
            },
            "ranks": {
              "passOffEpa": 14,
              "turnoverDiff": 17,
              "passDefEpa": 11,
              "rushDefEpa": 9,
              "pointsFor": 14,
              "pointsAgainst": 13
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "CLE",
            "values": {
              "passOffEpa": 0.127,
              "turnoverDiff": -0.25,
              "passDefEpa": 0.013,
              "rushDefEpa": 0.021,
              "pointsFor": 20.25,
              "pointsAgainst": 23.75
            },
            "ranks": {
              "passOffEpa": 13,
              "turnoverDiff": 19,
              "passDefEpa": 10,
              "rushDefEpa": 25,
              "pointsFor": 22,
              "pointsAgainst": 18
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "PIT",
            "values": {
              "passOffEpa": -0.122,
              "turnoverDiff": 0.5,
              "passDefEpa": 0.055,
              "rushDefEpa": -0.029,
              "pointsFor": 19.25,
              "pointsAgainst": 21.75
            },
            "ranks": {
              "passOffEpa": 27,
              "turnoverDiff": 13,
              "passDefEpa": 16,
              "rushDefEpa": 20,
              "pointsFor": 23,
              "pointsAgainst": 14
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "HOU",
            "values": {
              "passOffEpa": 0.024,
              "turnoverDiff": 0.25,
              "passDefEpa": 0.109,
              "rushDefEpa": -0.079,
              "pointsFor": 21,
              "pointsAgainst": 27.25
            },
            "ranks": {
              "passOffEpa": 19,
              "turnoverDiff": 14,
              "passDefEpa": 25,
              "rushDefEpa": 14,
              "pointsFor": 20,
              "pointsAgainst": 26
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "IND",
            "values": {
              "passOffEpa": -0.171,
              "turnoverDiff": -1.5,
              "passDefEpa": 0.077,
              "rushDefEpa": 0.034,
              "pointsFor": 25.5,
              "pointsAgainst": 26
            },
            "ranks": {
              "passOffEpa": 30,
              "turnoverDiff": 32,
              "passDefEpa": 20,
              "rushDefEpa": 27,
              "pointsFor": 13,
              "pointsAgainst": 22
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "JAX",
            "values": {
              "passOffEpa": 0.283,
              "turnoverDiff": 1.5,
              "passDefEpa": -0.025,
              "rushDefEpa": -0.103,
              "pointsFor": 26,
              "pointsAgainst": 13.25
            },
            "ranks": {
              "passOffEpa": 5,
              "turnoverDiff": 1,
              "passDefEpa": 7,
              "rushDefEpa": 10,
              "pointsFor": 12,
              "pointsAgainst": 2
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "TEN",
            "values": {
              "passOffEpa": -0.108,
              "turnoverDiff": -0.75,
              "passDefEpa": 0.203,
              "rushDefEpa": -0.092,
              "pointsFor": 13.75,
              "pointsAgainst": 20.75
            },
            "ranks": {
              "passOffEpa": 25,
              "turnoverDiff": 24,
              "passDefEpa": 27,
              "rushDefEpa": 13,
              "pointsFor": 31,
              "pointsAgainst": 9
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "DEN",
            "values": {
              "passOffEpa": -0.016,
              "turnoverDiff": -0.25,
              "passDefEpa": 0.009,
              "rushDefEpa": 0.097,
              "pointsFor": 18.5,
              "pointsAgainst": 23.5
            },
            "ranks": {
              "passOffEpa": 21,
              "turnoverDiff": 20,
              "passDefEpa": 9,
              "rushDefEpa": 32,
              "pointsFor": 27,
              "pointsAgainst": 17
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "KC",
            "values": {
              "passOffEpa": 0.192,
              "turnoverDiff": 1.25,
              "passDefEpa": -0.018,
              "rushDefEpa": -0.094,
              "pointsFor": 29.5,
              "pointsAgainst": 19.25
            },
            "ranks": {
              "passOffEpa": 9,
              "turnoverDiff": 2,
              "passDefEpa": 8,
              "rushDefEpa": 12,
              "pointsFor": 6,
              "pointsAgainst": 7
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "LV",
            "values": {
              "passOffEpa": 0.169,
              "turnoverDiff": 0.75,
              "passDefEpa": -0.058,
              "rushDefEpa": -0.096,
              "pointsFor": 28.75,
              "pointsAgainst": 21
            },
            "ranks": {
              "passOffEpa": 10,
              "turnoverDiff": 6,
              "passDefEpa": 4,
              "rushDefEpa": 11,
              "pointsFor": 8,
              "pointsAgainst": 12
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "LAC",
            "values": {
              "passOffEpa": -0.16,
              "turnoverDiff": -0.75,
              "passDefEpa": 0.076,
              "rushDefEpa": -0.121,
              "pointsFor": 16.75,
              "pointsAgainst": 26.5
            },
            "ranks": {
              "passOffEpa": 29,
              "turnoverDiff": 25,
              "passDefEpa": 19,
              "rushDefEpa": 8,
              "pointsFor": 29,
              "pointsAgainst": 24
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "DAL",
            "values": {
              "passOffEpa": 0.312,
              "turnoverDiff": 0,
              "passDefEpa": 0.461,
              "rushDefEpa": -0.036,
              "pointsFor": 30.5,
              "pointsAgainst": 28
            },
            "ranks": {
              "passOffEpa": 3,
              "turnoverDiff": 18,
              "passDefEpa": 32,
              "rushDefEpa": 19,
              "pointsFor": 2,
              "pointsAgainst": 28
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "NYG",
            "values": {
              "passOffEpa": 0.017,
              "turnoverDiff": 0.75,
              "passDefEpa": 0.031,
              "rushDefEpa": -0.054,
              "pointsFor": 20.5,
              "pointsAgainst": 19.75
            },
            "ranks": {
              "passOffEpa": 20,
              "turnoverDiff": 7,
              "passDefEpa": 14,
              "rushDefEpa": 16,
              "pointsFor": 21,
              "pointsAgainst": 8
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "PHI",
            "values": {
              "passOffEpa": -0.115,
              "turnoverDiff": -0.75,
              "passDefEpa": 0.085,
              "rushDefEpa": -0.002,
              "pointsFor": 18.75,
              "pointsAgainst": 23.25
            },
            "ranks": {
              "passOffEpa": 26,
              "turnoverDiff": 26,
              "passDefEpa": 22,
              "rushDefEpa": 22,
              "pointsFor": 26,
              "pointsAgainst": 16
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "WSH",
            "values": {
              "passOffEpa": 0.029,
              "turnoverDiff": 0.75,
              "passDefEpa": 0.056,
              "rushDefEpa": -0.007,
              "pointsFor": 22,
              "pointsAgainst": 30.5
            },
            "ranks": {
              "passOffEpa": 17,
              "turnoverDiff": 8,
              "passDefEpa": 17,
              "rushDefEpa": 21,
              "pointsFor": 16,
              "pointsAgainst": 30
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "CHI",
            "values": {
              "passOffEpa": 0.215,
              "turnoverDiff": 0.25,
              "passDefEpa": -0.053,
              "rushDefEpa": 0.037,
              "pointsFor": 28,
              "pointsAgainst": 16.25
            },
            "ranks": {
              "passOffEpa": 8,
              "turnoverDiff": 15,
              "passDefEpa": 5,
              "rushDefEpa": 29,
              "pointsFor": 9,
              "pointsAgainst": 4
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "DET",
            "values": {
              "passOffEpa": 0.289,
              "turnoverDiff": 0.75,
              "passDefEpa": 0.252,
              "rushDefEpa": 0,
              "pointsFor": 29.75,
              "pointsAgainst": 31.75
            },
            "ranks": {
              "passOffEpa": 4,
              "turnoverDiff": 9,
              "passDefEpa": 29,
              "rushDefEpa": 23,
              "pointsFor": 5,
              "pointsAgainst": 31
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "GB",
            "values": {
              "passOffEpa": 0.028,
              "turnoverDiff": -0.5,
              "passDefEpa": 0.079,
              "rushDefEpa": 0.004,
              "pointsFor": 18.25,
              "pointsAgainst": 26.25
            },
            "ranks": {
              "passOffEpa": 18,
              "turnoverDiff": 23,
              "passDefEpa": 21,
              "rushDefEpa": 24,
              "pointsFor": 28,
              "pointsAgainst": 23
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "MIN",
            "values": {
              "passOffEpa": -0.095,
              "turnoverDiff": 1.25,
              "passDefEpa": -0.206,
              "rushDefEpa": -0.148,
              "pointsFor": 21.5,
              "pointsAgainst": 12.75
            },
            "ranks": {
              "passOffEpa": 24,
              "turnoverDiff": 3,
              "passDefEpa": 1,
              "rushDefEpa": 6,
              "pointsFor": 18,
              "pointsAgainst": 1
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "ATL",
            "values": {
              "passOffEpa": -0.193,
              "turnoverDiff": -1.25,
              "passDefEpa": 0.03,
              "rushDefEpa": -0.274,
              "pointsFor": 24,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 31,
              "turnoverDiff": 28,
              "passDefEpa": 13,
              "rushDefEpa": 1,
              "pointsFor": 15,
              "pointsAgainst": 15
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "CAR",
            "values": {
              "passOffEpa": 0.236,
              "turnoverDiff": 0.75,
              "passDefEpa": 0.052,
              "rushDefEpa": 0.036,
              "pointsFor": 30.25,
              "pointsAgainst": 27.25
            },
            "ranks": {
              "passOffEpa": 7,
              "turnoverDiff": 10,
              "passDefEpa": 15,
              "rushDefEpa": 28,
              "pointsFor": 4,
              "pointsAgainst": 27
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "NO",
            "values": {
              "passOffEpa": 0.036,
              "turnoverDiff": -1.25,
              "passDefEpa": 0.22,
              "rushDefEpa": 0.083,
              "pointsFor": 26.25,
              "pointsAgainst": 32
            },
            "ranks": {
              "passOffEpa": 16,
              "turnoverDiff": 29,
              "passDefEpa": 28,
              "rushDefEpa": 31,
              "pointsFor": 10,
              "pointsAgainst": 32
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "TB",
            "values": {
              "passOffEpa": -0.244,
              "turnoverDiff": -1.25,
              "passDefEpa": 0.02,
              "rushDefEpa": -0.192,
              "pointsFor": 19,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 32,
              "turnoverDiff": 30,
              "passDefEpa": 12,
              "rushDefEpa": 3,
              "pointsFor": 25,
              "pointsAgainst": 20
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "ARI",
            "values": {
              "passOffEpa": -0.045,
              "turnoverDiff": 0.75,
              "passDefEpa": 0.319,
              "rushDefEpa": -0.209,
              "pointsFor": 21.75,
              "pointsAgainst": 29.25
            },
            "ranks": {
              "passOffEpa": 22,
              "turnoverDiff": 11,
              "passDefEpa": 31,
              "rushDefEpa": 2,
              "pointsFor": 17,
              "pointsAgainst": 29
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "LAR",
            "values": {
              "passOffEpa": 0.08,
              "turnoverDiff": -1.25,
              "passDefEpa": -0.164,
              "rushDefEpa": -0.07,
              "pointsFor": 21.25,
              "pointsAgainst": 20.75
            },
            "ranks": {
              "passOffEpa": 15,
              "turnoverDiff": 31,
              "passDefEpa": 2,
              "rushDefEpa": 15,
              "pointsFor": 19,
              "pointsAgainst": 10
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "SF",
            "values": {
              "passOffEpa": 0.527,
              "turnoverDiff": 0.25,
              "passDefEpa": 0.092,
              "rushDefEpa": -0.046,
              "pointsFor": 30.5,
              "pointsAgainst": 16
            },
            "ranks": {
              "passOffEpa": 1,
              "turnoverDiff": 16,
              "passDefEpa": 23,
              "rushDefEpa": 18,
              "pointsFor": 3,
              "pointsAgainst": 3
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "SEA",
            "values": {
              "passOffEpa": 0.164,
              "turnoverDiff": 0.75,
              "passDefEpa": -0.129,
              "rushDefEpa": -0.157,
              "pointsFor": 26.25,
              "pointsAgainst": 18.25
            },
            "ranks": {
              "passOffEpa": 11,
              "turnoverDiff": 12,
              "passDefEpa": 3,
              "rushDefEpa": 5,
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
              "passOffEpa": 0.141,
              "turnoverDiff": 0,
              "passDefEpa": 0.29,
              "rushDefEpa": 0.078,
              "pointsFor": 26,
              "pointsAgainst": 29
            },
            "ranks": {
              "passOffEpa": 14,
              "turnoverDiff": 11,
              "passDefEpa": 27,
              "rushDefEpa": 24,
              "pointsFor": 12,
              "pointsAgainst": 24
            }
          },
          {
            "abbr": "MIA",
            "values": {
              "passOffEpa": -0.653,
              "turnoverDiff": -1,
              "passDefEpa": -0.016,
              "rushDefEpa": -0.267,
              "pointsFor": 10,
              "pointsAgainst": 15
            },
            "ranks": {
              "passOffEpa": 32,
              "turnoverDiff": 23,
              "passDefEpa": 10,
              "rushDefEpa": 5,
              "pointsFor": 32,
              "pointsAgainst": 6
            }
          },
          {
            "abbr": "NE",
            "values": {
              "passOffEpa": 0.29,
              "turnoverDiff": 0,
              "passDefEpa": 0.141,
              "rushDefEpa": 0.137,
              "pointsFor": 29,
              "pointsAgainst": 26
            },
            "ranks": {
              "passOffEpa": 6,
              "turnoverDiff": 12,
              "passDefEpa": 19,
              "rushDefEpa": 28,
              "pointsFor": 9,
              "pointsAgainst": 20
            }
          },
          {
            "abbr": "NYJ",
            "values": {
              "passOffEpa": -0.27,
              "turnoverDiff": 2,
              "passDefEpa": 0.227,
              "rushDefEpa": -0.122,
              "pointsFor": 12,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 29,
              "turnoverDiff": 2,
              "passDefEpa": 22,
              "rushDefEpa": 11,
              "pointsFor": 31,
              "pointsAgainst": 12
            }
          },
          {
            "abbr": "BAL",
            "values": {
              "passOffEpa": 0.387,
              "turnoverDiff": 2,
              "passDefEpa": 0.013,
              "rushDefEpa": -0.201,
              "pointsFor": 24,
              "pointsAgainst": 18
            },
            "ranks": {
              "passOffEpa": 4,
              "turnoverDiff": 3,
              "passDefEpa": 11,
              "rushDefEpa": 9,
              "pointsFor": 14,
              "pointsAgainst": 9
            }
          },
          {
            "abbr": "CIN",
            "values": {
              "passOffEpa": 0.132,
              "turnoverDiff": -2,
              "passDefEpa": 0.344,
              "rushDefEpa": 0.031,
              "pointsFor": 17,
              "pointsAgainst": 22
            },
            "ranks": {
              "passOffEpa": 15,
              "turnoverDiff": 27,
              "passDefEpa": 28,
              "rushDefEpa": 19,
              "pointsFor": 25,
              "pointsAgainst": 11
            }
          },
          {
            "abbr": "CLE",
            "values": {
              "passOffEpa": 0.262,
              "turnoverDiff": 0,
              "passDefEpa": 0.054,
              "rushDefEpa": 0.118,
              "pointsFor": 27,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 8,
              "turnoverDiff": 13,
              "passDefEpa": 14,
              "rushDefEpa": 27,
              "pointsFor": 10,
              "pointsAgainst": 14
            }
          },
          {
            "abbr": "PIT",
            "values": {
              "passOffEpa": 0.054,
              "turnoverDiff": 0,
              "passDefEpa": 0.262,
              "rushDefEpa": -0.12,
              "pointsFor": 24,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 18,
              "turnoverDiff": 14,
              "passDefEpa": 25,
              "rushDefEpa": 13,
              "pointsFor": 15,
              "pointsAgainst": 22
            }
          },
          {
            "abbr": "HOU",
            "values": {
              "passOffEpa": 0.46,
              "turnoverDiff": 0,
              "passDefEpa": 0.205,
              "rushDefEpa": 0.026,
              "pointsFor": 30,
              "pointsAgainst": 34
            },
            "ranks": {
              "passOffEpa": 3,
              "turnoverDiff": 15,
              "passDefEpa": 21,
              "rushDefEpa": 18,
              "pointsFor": 5,
              "pointsAgainst": 30
            }
          },
          {
            "abbr": "IND",
            "values": {
              "passOffEpa": -0.371,
              "turnoverDiff": -1,
              "passDefEpa": -0.242,
              "rushDefEpa": -0.263,
              "pointsFor": 30,
              "pointsAgainst": 13
            },
            "ranks": {
              "passOffEpa": 30,
              "turnoverDiff": 24,
              "passDefEpa": 6,
              "rushDefEpa": 6,
              "pointsFor": 6,
              "pointsAgainst": 3
            }
          },
          {
            "abbr": "JAX",
            "values": {
              "passOffEpa": 0.344,
              "turnoverDiff": 2,
              "passDefEpa": 0.132,
              "rushDefEpa": -0.275,
              "pointsFor": 22,
              "pointsAgainst": 17
            },
            "ranks": {
              "passOffEpa": 5,
              "turnoverDiff": 4,
              "passDefEpa": 18,
              "rushDefEpa": 4,
              "pointsFor": 22,
              "pointsAgainst": 7
            }
          },
          {
            "abbr": "TEN",
            "values": {
              "passOffEpa": 0.013,
              "turnoverDiff": -2,
              "passDefEpa": 0.387,
              "rushDefEpa": -0.122,
              "pointsFor": 18,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 21,
              "turnoverDiff": 28,
              "passDefEpa": 29,
              "rushDefEpa": 12,
              "pointsFor": 24,
              "pointsAgainst": 15
            }
          },
          {
            "abbr": "DEN",
            "values": {
              "passOffEpa": 0.112,
              "turnoverDiff": -1,
              "passDefEpa": 0.283,
              "rushDefEpa": -0.019,
              "pointsFor": 14,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 17,
              "turnoverDiff": 25,
              "passDefEpa": 26,
              "rushDefEpa": 17,
              "pointsFor": 28,
              "pointsAgainst": 16
            }
          },
          {
            "abbr": "KC",
            "values": {
              "passOffEpa": 0.054,
              "turnoverDiff": 2,
              "passDefEpa": 0.188,
              "rushDefEpa": -0.237,
              "pointsFor": 30,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 19,
              "turnoverDiff": 5,
              "passDefEpa": 20,
              "rushDefEpa": 7,
              "pointsFor": 7,
              "pointsAgainst": 23
            }
          },
          {
            "abbr": "LV",
            "values": {
              "passOffEpa": 0.188,
              "turnoverDiff": -2,
              "passDefEpa": 0.054,
              "rushDefEpa": 0.224,
              "pointsFor": 27,
              "pointsAgainst": 30
            },
            "ranks": {
              "passOffEpa": 13,
              "turnoverDiff": 29,
              "passDefEpa": 15,
              "rushDefEpa": 29,
              "pointsFor": 11,
              "pointsAgainst": 25
            }
          },
          {
            "abbr": "LAC",
            "values": {
              "passOffEpa": -0.239,
              "turnoverDiff": -3,
              "passDefEpa": -0.207,
              "rushDefEpa": -0.107,
              "pointsFor": 23,
              "pointsAgainst": 30
            },
            "ranks": {
              "passOffEpa": 26,
              "turnoverDiff": 32,
              "passDefEpa": 8,
              "rushDefEpa": 15,
              "pointsFor": 20,
              "pointsAgainst": 26
            }
          },
          {
            "abbr": "DAL",
            "values": {
              "passOffEpa": 0.205,
              "turnoverDiff": 0,
              "passDefEpa": 0.46,
              "rushDefEpa": -0.161,
              "pointsFor": 34,
              "pointsAgainst": 30
            },
            "ranks": {
              "passOffEpa": 12,
              "turnoverDiff": 16,
              "passDefEpa": 30,
              "rushDefEpa": 10,
              "pointsFor": 3,
              "pointsAgainst": 27
            }
          },
          {
            "abbr": "NYG",
            "values": {
              "passOffEpa": 0.118,
              "turnoverDiff": 0,
              "passDefEpa": -0.491,
              "rushDefEpa": 0.093,
              "pointsFor": 36,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 16,
              "turnoverDiff": 17,
              "passDefEpa": 2,
              "rushDefEpa": 26,
              "pointsFor": 2,
              "pointsAgainst": 17
            }
          },
          {
            "abbr": "PHI",
            "values": {
              "passOffEpa": -0.263,
              "turnoverDiff": 2,
              "passDefEpa": 0.021,
              "rushDefEpa": 0.04,
              "pointsFor": 20,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 28,
              "turnoverDiff": 6,
              "passDefEpa": 13,
              "rushDefEpa": 21,
              "pointsFor": 23,
              "pointsAgainst": 18
            }
          },
          {
            "abbr": "WSH",
            "values": {
              "passOffEpa": -0.242,
              "turnoverDiff": 1,
              "passDefEpa": -0.371,
              "rushDefEpa": 0.262,
              "pointsFor": 13,
              "pointsAgainst": 30
            },
            "ranks": {
              "passOffEpa": 27,
              "turnoverDiff": 7,
              "passDefEpa": 3,
              "rushDefEpa": 30,
              "pointsFor": 30,
              "pointsAgainst": 28
            }
          },
          {
            "abbr": "CHI",
            "values": {
              "passOffEpa": 0.227,
              "turnoverDiff": -2,
              "passDefEpa": -0.27,
              "rushDefEpa": 0.034,
              "pointsFor": 23,
              "pointsAgainst": 12
            },
            "ranks": {
              "passOffEpa": 11,
              "turnoverDiff": 30,
              "passDefEpa": 4,
              "rushDefEpa": 20,
              "pointsFor": 21,
              "pointsAgainst": 2
            }
          },
          {
            "abbr": "DET",
            "values": {
              "passOffEpa": 0.233,
              "turnoverDiff": 0,
              "passDefEpa": 0.466,
              "rushDefEpa": -0.116,
              "pointsFor": 26,
              "pointsAgainst": 32
            },
            "ranks": {
              "passOffEpa": 9,
              "turnoverDiff": 18,
              "passDefEpa": 31,
              "rushDefEpa": 14,
              "pointsFor": 13,
              "pointsAgainst": 29
            }
          },
          {
            "abbr": "GB",
            "values": {
              "passOffEpa": 0.23,
              "turnoverDiff": 0,
              "passDefEpa": -0.144,
              "rushDefEpa": 0.065,
              "pointsFor": 17,
              "pointsAgainst": 14
            },
            "ranks": {
              "passOffEpa": 10,
              "turnoverDiff": 19,
              "passDefEpa": 9,
              "rushDefEpa": 23,
              "pointsFor": 26,
              "pointsAgainst": 4
            }
          },
          {
            "abbr": "MIN",
            "values": {
              "passOffEpa": -0.016,
              "turnoverDiff": 1,
              "passDefEpa": -0.653,
              "rushDefEpa": 0.27,
              "pointsFor": 15,
              "pointsAgainst": 10
            },
            "ranks": {
              "passOffEpa": 23,
              "turnoverDiff": 8,
              "passDefEpa": 1,
              "rushDefEpa": 31,
              "pointsFor": 27,
              "pointsAgainst": 1
            }
          },
          {
            "abbr": "ATL",
            "values": {
              "passOffEpa": 0.507,
              "turnoverDiff": 1,
              "passDefEpa": 0.013,
              "rushDefEpa": -0.301,
              "pointsFor": 45,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 1,
              "turnoverDiff": 9,
              "passDefEpa": 12,
              "rushDefEpa": 3,
              "pointsFor": 1,
              "pointsAgainst": 19
            }
          },
          {
            "abbr": "CAR",
            "values": {
              "passOffEpa": 0.466,
              "turnoverDiff": 0,
              "passDefEpa": 0.233,
              "rushDefEpa": -0.023,
              "pointsFor": 32,
              "pointsAgainst": 26
            },
            "ranks": {
              "passOffEpa": 2,
              "turnoverDiff": 20,
              "passDefEpa": 24,
              "rushDefEpa": 16,
              "pointsFor": 4,
              "pointsAgainst": 21
            }
          },
          {
            "abbr": "NO",
            "values": {
              "passOffEpa": 0.013,
              "turnoverDiff": -1,
              "passDefEpa": 0.507,
              "rushDefEpa": 0.345,
              "pointsFor": 24,
              "pointsAgainst": 45
            },
            "ranks": {
              "passOffEpa": 22,
              "turnoverDiff": 26,
              "passDefEpa": 32,
              "rushDefEpa": 32,
              "pointsFor": 16,
              "pointsAgainst": 32
            }
          },
          {
            "abbr": "TB",
            "values": {
              "passOffEpa": -0.144,
              "turnoverDiff": 0,
              "passDefEpa": 0.23,
              "rushDefEpa": -0.233,
              "pointsFor": 14,
              "pointsAgainst": 17
            },
            "ranks": {
              "passOffEpa": 24,
              "turnoverDiff": 21,
              "passDefEpa": 23,
              "rushDefEpa": 8,
              "pointsFor": 29,
              "pointsAgainst": 8
            }
          },
          {
            "abbr": "ARI",
            "values": {
              "passOffEpa": -0.491,
              "turnoverDiff": 0,
              "passDefEpa": 0.118,
              "rushDefEpa": -0.322,
              "pointsFor": 24,
              "pointsAgainst": 36
            },
            "ranks": {
              "passOffEpa": 31,
              "turnoverDiff": 22,
              "passDefEpa": 17,
              "rushDefEpa": 1,
              "pointsFor": 17,
              "pointsAgainst": 31
            }
          },
          {
            "abbr": "LAR",
            "values": {
              "passOffEpa": 0.021,
              "turnoverDiff": -2,
              "passDefEpa": -0.263,
              "rushDefEpa": -0.315,
              "pointsFor": 24,
              "pointsAgainst": 20
            },
            "ranks": {
              "passOffEpa": 20,
              "turnoverDiff": 31,
              "passDefEpa": 5,
              "rushDefEpa": 2,
              "pointsFor": 18,
              "pointsAgainst": 10
            }
          },
          {
            "abbr": "SF",
            "values": {
              "passOffEpa": 0.283,
              "turnoverDiff": 1,
              "passDefEpa": 0.112,
              "rushDefEpa": 0.047,
              "pointsFor": 24,
              "pointsAgainst": 14
            },
            "ranks": {
              "passOffEpa": 7,
              "turnoverDiff": 10,
              "passDefEpa": 16,
              "rushDefEpa": 22,
              "pointsFor": 19,
              "pointsAgainst": 5
            }
          },
          {
            "abbr": "SEA",
            "values": {
              "passOffEpa": -0.207,
              "turnoverDiff": 3,
              "passDefEpa": -0.239,
              "rushDefEpa": 0.088,
              "pointsFor": 30,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 25,
              "turnoverDiff": 1,
              "passDefEpa": 7,
              "rushDefEpa": 25,
              "pointsFor": 8,
              "pointsAgainst": 13
            }
          }
        ]
      },
      "5": {
        "cumulative": [
          {
            "abbr": "BUF",
            "values": {
              "passOffEpa": 0.265,
              "turnoverDiff": -0.5,
              "passDefEpa": 0.158,
              "rushDefEpa": 0.034,
              "pointsFor": 31.75,
              "pointsAgainst": 26.75
            },
            "ranks": {
              "passOffEpa": 5,
              "turnoverDiff": 21,
              "passDefEpa": 26,
              "rushDefEpa": 26,
              "pointsFor": 1,
              "pointsAgainst": 25
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "MIA",
            "values": {
              "passOffEpa": -0.153,
              "turnoverDiff": -0.5,
              "passDefEpa": 0.308,
              "rushDefEpa": -0.176,
              "pointsFor": 11.5,
              "pointsAgainst": 25.25
            },
            "ranks": {
              "passOffEpa": 28,
              "turnoverDiff": 22,
              "passDefEpa": 30,
              "rushDefEpa": 3,
              "pointsFor": 32,
              "pointsAgainst": 21
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "NE",
            "values": {
              "passOffEpa": -0.066,
              "turnoverDiff": -1.25,
              "passDefEpa": -0.038,
              "rushDefEpa": 0.059,
              "pointsFor": 16.25,
              "pointsAgainst": 19.25
            },
            "ranks": {
              "passOffEpa": 23,
              "turnoverDiff": 28,
              "passDefEpa": 6,
              "rushDefEpa": 30,
              "pointsFor": 30,
              "pointsAgainst": 6
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "NYJ",
            "values": {
              "passOffEpa": 0.156,
              "turnoverDiff": 0.75,
              "passDefEpa": 0.07,
              "rushDefEpa": -0.128,
              "pointsFor": 19,
              "pointsAgainst": 21
            },
            "ranks": {
              "passOffEpa": 12,
              "turnoverDiff": 4,
              "passDefEpa": 18,
              "rushDefEpa": 7,
              "pointsFor": 25,
              "pointsAgainst": 11
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "BAL",
            "values": {
              "passOffEpa": 0.336,
              "turnoverDiff": 0.75,
              "passDefEpa": 0.105,
              "rushDefEpa": -0.05,
              "pointsFor": 29,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 2,
              "turnoverDiff": 5,
              "passDefEpa": 24,
              "rushDefEpa": 17,
              "pointsFor": 6,
              "pointsAgainst": 20
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "CIN",
            "values": {
              "passOffEpa": 0.114,
              "turnoverDiff": 0,
              "passDefEpa": 0.018,
              "rushDefEpa": -0.106,
              "pointsFor": 24.25,
              "pointsAgainst": 21.25
            },
            "ranks": {
              "passOffEpa": 14,
              "turnoverDiff": 17,
              "passDefEpa": 12,
              "rushDefEpa": 9,
              "pointsFor": 14,
              "pointsAgainst": 13
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "CLE",
            "values": {
              "passOffEpa": 0.127,
              "turnoverDiff": -0.25,
              "passDefEpa": 0.013,
              "rushDefEpa": 0.021,
              "pointsFor": 20.25,
              "pointsAgainst": 23.75
            },
            "ranks": {
              "passOffEpa": 13,
              "turnoverDiff": 18,
              "passDefEpa": 11,
              "rushDefEpa": 25,
              "pointsFor": 22,
              "pointsAgainst": 19
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "PIT",
            "values": {
              "passOffEpa": -0.122,
              "turnoverDiff": 0.5,
              "passDefEpa": 0.055,
              "rushDefEpa": -0.029,
              "pointsFor": 19.25,
              "pointsAgainst": 21.75
            },
            "ranks": {
              "passOffEpa": 27,
              "turnoverDiff": 13,
              "passDefEpa": 16,
              "rushDefEpa": 19,
              "pointsFor": 24,
              "pointsAgainst": 14
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "HOU",
            "values": {
              "passOffEpa": 0.024,
              "turnoverDiff": 0.25,
              "passDefEpa": 0.109,
              "rushDefEpa": -0.079,
              "pointsFor": 21,
              "pointsAgainst": 27.25
            },
            "ranks": {
              "passOffEpa": 19,
              "turnoverDiff": 14,
              "passDefEpa": 25,
              "rushDefEpa": 14,
              "pointsFor": 20,
              "pointsAgainst": 27
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "IND",
            "values": {
              "passOffEpa": -0.171,
              "turnoverDiff": -1.5,
              "passDefEpa": 0.077,
              "rushDefEpa": 0.034,
              "pointsFor": 25.5,
              "pointsAgainst": 26
            },
            "ranks": {
              "passOffEpa": 30,
              "turnoverDiff": 32,
              "passDefEpa": 20,
              "rushDefEpa": 27,
              "pointsFor": 13,
              "pointsAgainst": 22
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "JAX",
            "values": {
              "passOffEpa": 0.283,
              "turnoverDiff": 1.5,
              "passDefEpa": -0.025,
              "rushDefEpa": -0.103,
              "pointsFor": 26,
              "pointsAgainst": 13.25
            },
            "ranks": {
              "passOffEpa": 4,
              "turnoverDiff": 1,
              "passDefEpa": 7,
              "rushDefEpa": 10,
              "pointsFor": 12,
              "pointsAgainst": 2
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "TEN",
            "values": {
              "passOffEpa": -0.108,
              "turnoverDiff": -0.75,
              "passDefEpa": 0.203,
              "rushDefEpa": -0.092,
              "pointsFor": 13.75,
              "pointsAgainst": 20.75
            },
            "ranks": {
              "passOffEpa": 25,
              "turnoverDiff": 25,
              "passDefEpa": 27,
              "rushDefEpa": 13,
              "pointsFor": 31,
              "pointsAgainst": 9
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "DEN",
            "values": {
              "passOffEpa": -0.016,
              "turnoverDiff": -0.25,
              "passDefEpa": 0.009,
              "rushDefEpa": 0.097,
              "pointsFor": 18.5,
              "pointsAgainst": 23.5
            },
            "ranks": {
              "passOffEpa": 21,
              "turnoverDiff": 19,
              "passDefEpa": 10,
              "rushDefEpa": 32,
              "pointsFor": 27,
              "pointsAgainst": 18
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "KC",
            "values": {
              "passOffEpa": 0.192,
              "turnoverDiff": 1.25,
              "passDefEpa": -0.018,
              "rushDefEpa": -0.094,
              "pointsFor": 29.5,
              "pointsAgainst": 19.25
            },
            "ranks": {
              "passOffEpa": 9,
              "turnoverDiff": 2,
              "passDefEpa": 8,
              "rushDefEpa": 12,
              "pointsFor": 5,
              "pointsAgainst": 7
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "LV",
            "values": {
              "passOffEpa": 0.169,
              "turnoverDiff": 0.75,
              "passDefEpa": -0.058,
              "rushDefEpa": -0.096,
              "pointsFor": 28.75,
              "pointsAgainst": 21
            },
            "ranks": {
              "passOffEpa": 10,
              "turnoverDiff": 6,
              "passDefEpa": 4,
              "rushDefEpa": 11,
              "pointsFor": 7,
              "pointsAgainst": 12
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "LAC",
            "values": {
              "passOffEpa": -0.16,
              "turnoverDiff": -0.75,
              "passDefEpa": 0.076,
              "rushDefEpa": -0.121,
              "pointsFor": 16.75,
              "pointsAgainst": 26.5
            },
            "ranks": {
              "passOffEpa": 29,
              "turnoverDiff": 26,
              "passDefEpa": 19,
              "rushDefEpa": 8,
              "pointsFor": 29,
              "pointsAgainst": 24
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "DAL",
            "values": {
              "passOffEpa": 0.229,
              "turnoverDiff": -0.6,
              "passDefEpa": 0.419,
              "rushDefEpa": -0.001,
              "pointsFor": 27.6,
              "pointsAgainst": 27.2
            },
            "ranks": {
              "passOffEpa": 7,
              "turnoverDiff": 24,
              "passDefEpa": 32,
              "rushDefEpa": 22,
              "pointsFor": 9,
              "pointsAgainst": 26
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "NYG",
            "values": {
              "passOffEpa": 0.017,
              "turnoverDiff": 0.75,
              "passDefEpa": 0.031,
              "rushDefEpa": -0.054,
              "pointsFor": 20.5,
              "pointsAgainst": 19.75
            },
            "ranks": {
              "passOffEpa": 20,
              "turnoverDiff": 7,
              "passDefEpa": 14,
              "rushDefEpa": 16,
              "pointsFor": 21,
              "pointsAgainst": 8
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "PHI",
            "values": {
              "passOffEpa": -0.115,
              "turnoverDiff": -0.75,
              "passDefEpa": 0.085,
              "rushDefEpa": -0.002,
              "pointsFor": 18.75,
              "pointsAgainst": 23.25
            },
            "ranks": {
              "passOffEpa": 26,
              "turnoverDiff": 27,
              "passDefEpa": 22,
              "rushDefEpa": 21,
              "pointsFor": 26,
              "pointsAgainst": 17
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "WSH",
            "values": {
              "passOffEpa": 0.029,
              "turnoverDiff": 0.75,
              "passDefEpa": 0.056,
              "rushDefEpa": -0.007,
              "pointsFor": 22,
              "pointsAgainst": 30.5
            },
            "ranks": {
              "passOffEpa": 17,
              "turnoverDiff": 8,
              "passDefEpa": 17,
              "rushDefEpa": 20,
              "pointsFor": 16,
              "pointsAgainst": 30
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "CHI",
            "values": {
              "passOffEpa": 0.215,
              "turnoverDiff": 0.25,
              "passDefEpa": -0.053,
              "rushDefEpa": 0.037,
              "pointsFor": 28,
              "pointsAgainst": 16.25
            },
            "ranks": {
              "passOffEpa": 8,
              "turnoverDiff": 15,
              "passDefEpa": 5,
              "rushDefEpa": 29,
              "pointsFor": 8,
              "pointsAgainst": 4
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "DET",
            "values": {
              "passOffEpa": 0.289,
              "turnoverDiff": 0.75,
              "passDefEpa": 0.252,
              "rushDefEpa": 0,
              "pointsFor": 29.75,
              "pointsAgainst": 31.75
            },
            "ranks": {
              "passOffEpa": 3,
              "turnoverDiff": 9,
              "passDefEpa": 29,
              "rushDefEpa": 23,
              "pointsFor": 4,
              "pointsAgainst": 31
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "GB",
            "values": {
              "passOffEpa": 0.028,
              "turnoverDiff": -0.5,
              "passDefEpa": 0.079,
              "rushDefEpa": 0.004,
              "pointsFor": 18.25,
              "pointsAgainst": 26.25
            },
            "ranks": {
              "passOffEpa": 18,
              "turnoverDiff": 23,
              "passDefEpa": 21,
              "rushDefEpa": 24,
              "pointsFor": 28,
              "pointsAgainst": 23
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "MIN",
            "values": {
              "passOffEpa": -0.095,
              "turnoverDiff": 1.25,
              "passDefEpa": -0.206,
              "rushDefEpa": -0.148,
              "pointsFor": 21.5,
              "pointsAgainst": 12.75
            },
            "ranks": {
              "passOffEpa": 24,
              "turnoverDiff": 3,
              "passDefEpa": 1,
              "rushDefEpa": 6,
              "pointsFor": 18,
              "pointsAgainst": 1
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "ATL",
            "values": {
              "passOffEpa": -0.193,
              "turnoverDiff": -1.25,
              "passDefEpa": 0.03,
              "rushDefEpa": -0.274,
              "pointsFor": 24,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 32,
              "turnoverDiff": 29,
              "passDefEpa": 13,
              "rushDefEpa": 1,
              "pointsFor": 15,
              "pointsAgainst": 16
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "CAR",
            "values": {
              "passOffEpa": 0.236,
              "turnoverDiff": 0.75,
              "passDefEpa": 0.052,
              "rushDefEpa": 0.036,
              "pointsFor": 30.25,
              "pointsAgainst": 27.25
            },
            "ranks": {
              "passOffEpa": 6,
              "turnoverDiff": 10,
              "passDefEpa": 15,
              "rushDefEpa": 28,
              "pointsFor": 3,
              "pointsAgainst": 28
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "NO",
            "values": {
              "passOffEpa": 0.036,
              "turnoverDiff": -1.25,
              "passDefEpa": 0.22,
              "rushDefEpa": 0.083,
              "pointsFor": 26.25,
              "pointsAgainst": 32
            },
            "ranks": {
              "passOffEpa": 16,
              "turnoverDiff": 30,
              "passDefEpa": 28,
              "rushDefEpa": 31,
              "pointsFor": 10,
              "pointsAgainst": 32
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "TB",
            "values": {
              "passOffEpa": -0.171,
              "turnoverDiff": -0.4,
              "passDefEpa": -0.004,
              "rushDefEpa": -0.163,
              "pointsFor": 20,
              "pointsAgainst": 22.4
            },
            "ranks": {
              "passOffEpa": 31,
              "turnoverDiff": 20,
              "passDefEpa": 9,
              "rushDefEpa": 4,
              "pointsFor": 23,
              "pointsAgainst": 15
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "ARI",
            "values": {
              "passOffEpa": -0.045,
              "turnoverDiff": 0.75,
              "passDefEpa": 0.319,
              "rushDefEpa": -0.209,
              "pointsFor": 21.75,
              "pointsAgainst": 29.25
            },
            "ranks": {
              "passOffEpa": 22,
              "turnoverDiff": 11,
              "passDefEpa": 31,
              "rushDefEpa": 2,
              "pointsFor": 17,
              "pointsAgainst": 29
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "LAR",
            "values": {
              "passOffEpa": 0.08,
              "turnoverDiff": -1.25,
              "passDefEpa": -0.164,
              "rushDefEpa": -0.07,
              "pointsFor": 21.25,
              "pointsAgainst": 20.75
            },
            "ranks": {
              "passOffEpa": 15,
              "turnoverDiff": 31,
              "passDefEpa": 2,
              "rushDefEpa": 15,
              "pointsFor": 19,
              "pointsAgainst": 10
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "SF",
            "values": {
              "passOffEpa": 0.527,
              "turnoverDiff": 0.25,
              "passDefEpa": 0.092,
              "rushDefEpa": -0.046,
              "pointsFor": 30.5,
              "pointsAgainst": 16
            },
            "ranks": {
              "passOffEpa": 1,
              "turnoverDiff": 16,
              "passDefEpa": 23,
              "rushDefEpa": 18,
              "pointsFor": 2,
              "pointsAgainst": 3
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "SEA",
            "values": {
              "passOffEpa": 0.164,
              "turnoverDiff": 0.75,
              "passDefEpa": -0.129,
              "rushDefEpa": -0.157,
              "pointsFor": 26.25,
              "pointsAgainst": 18.25
            },
            "ranks": {
              "passOffEpa": 11,
              "turnoverDiff": 12,
              "passDefEpa": 3,
              "rushDefEpa": 5,
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
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            },
            "ranks": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            }
          },
          {
            "abbr": "MIA",
            "values": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            },
            "ranks": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            }
          },
          {
            "abbr": "NE",
            "values": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            },
            "ranks": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            }
          },
          {
            "abbr": "NYJ",
            "values": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            },
            "ranks": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            }
          },
          {
            "abbr": "BAL",
            "values": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            },
            "ranks": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            }
          },
          {
            "abbr": "CIN",
            "values": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            },
            "ranks": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            }
          },
          {
            "abbr": "CLE",
            "values": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            },
            "ranks": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            }
          },
          {
            "abbr": "PIT",
            "values": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            },
            "ranks": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            }
          },
          {
            "abbr": "HOU",
            "values": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            },
            "ranks": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            }
          },
          {
            "abbr": "IND",
            "values": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            },
            "ranks": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            }
          },
          {
            "abbr": "JAX",
            "values": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            },
            "ranks": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            }
          },
          {
            "abbr": "TEN",
            "values": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            },
            "ranks": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            }
          },
          {
            "abbr": "DEN",
            "values": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            },
            "ranks": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
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
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            },
            "ranks": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            }
          },
          {
            "abbr": "LV",
            "values": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            },
            "ranks": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            }
          },
          {
            "abbr": "LAC",
            "values": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            },
            "ranks": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            }
          },
          {
            "abbr": "DAL",
            "values": {
              "passOffEpa": -0.078,
              "turnoverDiff": -3,
              "passDefEpa": 0.226,
              "rushDefEpa": 0.11,
              "pointsFor": 16,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 2,
              "turnoverDiff": 2,
              "passDefEpa": 2,
              "rushDefEpa": 2,
              "pointsFor": 2,
              "pointsAgainst": 2
            }
          },
          {
            "abbr": "NYG",
            "values": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            },
            "ranks": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            }
          },
          {
            "abbr": "PHI",
            "values": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            },
            "ranks": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            }
          },
          {
            "abbr": "WSH",
            "values": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            },
            "ranks": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            }
          },
          {
            "abbr": "CHI",
            "values": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            },
            "ranks": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            }
          },
          {
            "abbr": "DET",
            "values": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            },
            "ranks": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            }
          },
          {
            "abbr": "GB",
            "values": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            },
            "ranks": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            }
          },
          {
            "abbr": "MIN",
            "values": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            },
            "ranks": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            }
          },
          {
            "abbr": "ATL",
            "values": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            },
            "ranks": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            }
          },
          {
            "abbr": "CAR",
            "values": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            },
            "ranks": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            }
          },
          {
            "abbr": "NO",
            "values": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            },
            "ranks": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            }
          },
          {
            "abbr": "TB",
            "values": {
              "passOffEpa": 0.226,
              "turnoverDiff": 3,
              "passDefEpa": -0.078,
              "rushDefEpa": 0.051,
              "pointsFor": 24,
              "pointsAgainst": 16
            },
            "ranks": {
              "passOffEpa": 1,
              "turnoverDiff": 1,
              "passDefEpa": 1,
              "rushDefEpa": 1,
              "pointsFor": 1,
              "pointsAgainst": 1
            }
          },
          {
            "abbr": "ARI",
            "values": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            },
            "ranks": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            }
          },
          {
            "abbr": "LAR",
            "values": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            },
            "ranks": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            }
          },
          {
            "abbr": "SF",
            "values": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            },
            "ranks": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            }
          },
          {
            "abbr": "SEA",
            "values": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            },
            "ranks": {
              "passOffEpa": null,
              "turnoverDiff": null,
              "passDefEpa": null,
              "rushDefEpa": null,
              "pointsFor": null,
              "pointsAgainst": null
            }
          }
        ]
      }
    }
  }
};
