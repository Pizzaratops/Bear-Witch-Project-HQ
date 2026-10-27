// ============================================================
//  NFL_POWER_SCORE — "Bootleg Power Score" Spinnennetz (nflverse)
// ============================================================
//  AUTO-GENERIERT von scripts/sync-nfl-power-score.js über die GitHub
//  Action ".github/workflows/sync-nfl-power-score.yml". Nicht von Hand
//  editieren — Änderungen werden beim nächsten Sync überschrieben.
//  Zuletzt synchronisiert: 2026-10-27T23:40:35.416Z
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
              "passOffEpa": 0.286,
              "turnoverDiff": -0.8,
              "passDefEpa": 0.204,
              "rushDefEpa": 0.026,
              "pointsFor": 32.8,
              "pointsAgainst": 28.2
            },
            "ranks": {
              "passOffEpa": 3,
              "turnoverDiff": 24,
              "passDefEpa": 26,
              "rushDefEpa": 29,
              "pointsFor": 1,
              "pointsAgainst": 28
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "MIA",
            "values": {
              "passOffEpa": -0.201,
              "turnoverDiff": -0.8,
              "passDefEpa": 0.335,
              "rushDefEpa": -0.148,
              "pointsFor": 14,
              "pointsAgainst": 26.4
            },
            "ranks": {
              "passOffEpa": 32,
              "turnoverDiff": 25,
              "passDefEpa": 30,
              "rushDefEpa": 7,
              "pointsFor": 31,
              "pointsAgainst": 24
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "NE",
            "values": {
              "passOffEpa": 0.123,
              "turnoverDiff": -1,
              "passDefEpa": 0.031,
              "rushDefEpa": -0.005,
              "pointsFor": 22,
              "pointsAgainst": 18.8
            },
            "ranks": {
              "passOffEpa": 12,
              "turnoverDiff": 27,
              "passDefEpa": 16,
              "rushDefEpa": 21,
              "pointsFor": 19,
              "pointsAgainst": 4
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "NYJ",
            "values": {
              "passOffEpa": 0.054,
              "turnoverDiff": 0.6,
              "passDefEpa": -0.016,
              "rushDefEpa": -0.155,
              "pointsFor": 18.6,
              "pointsAgainst": 19.2
            },
            "ranks": {
              "passOffEpa": 17,
              "turnoverDiff": 7,
              "passDefEpa": 10,
              "rushDefEpa": 4,
              "pointsFor": 27,
              "pointsAgainst": 5
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "BAL",
            "values": {
              "passOffEpa": 0.272,
              "turnoverDiff": 0.6,
              "passDefEpa": 0.117,
              "rushDefEpa": -0.098,
              "pointsFor": 29.2,
              "pointsAgainst": 23.8
            },
            "ranks": {
              "passOffEpa": 5,
              "turnoverDiff": 8,
              "passDefEpa": 23,
              "rushDefEpa": 13,
              "pointsFor": 6,
              "pointsAgainst": 19
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "CIN",
            "values": {
              "passOffEpa": 0.166,
              "turnoverDiff": 0.4,
              "passDefEpa": -0.047,
              "rushDefEpa": -0.003,
              "pointsFor": 25.6,
              "pointsAgainst": 21.8
            },
            "ranks": {
              "passOffEpa": 10,
              "turnoverDiff": 12,
              "passDefEpa": 6,
              "rushDefEpa": 22,
              "pointsFor": 10,
              "pointsAgainst": 10
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "CLE",
            "values": {
              "passOffEpa": 0.022,
              "turnoverDiff": -0.2,
              "passDefEpa": -0.049,
              "rushDefEpa": 0.011,
              "pointsFor": 18.6,
              "pointsAgainst": 22.4
            },
            "ranks": {
              "passOffEpa": 19,
              "turnoverDiff": 19,
              "passDefEpa": 5,
              "rushDefEpa": 26,
              "pointsFor": 28,
              "pointsAgainst": 14
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "PIT",
            "values": {
              "passOffEpa": -0.082,
              "turnoverDiff": 0.4,
              "passDefEpa": 0.039,
              "rushDefEpa": -0.02,
              "pointsFor": 22.2,
              "pointsAgainst": 21.8
            },
            "ranks": {
              "passOffEpa": 25,
              "turnoverDiff": 13,
              "passDefEpa": 18,
              "rushDefEpa": 19,
              "pointsFor": 18,
              "pointsAgainst": 11
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "HOU",
            "values": {
              "passOffEpa": 0.072,
              "turnoverDiff": 0.6,
              "passDefEpa": 0,
              "rushDefEpa": -0.114,
              "pointsFor": 22,
              "pointsAgainst": 22.4
            },
            "ranks": {
              "passOffEpa": 14,
              "turnoverDiff": 9,
              "passDefEpa": 12,
              "rushDefEpa": 11,
              "pointsFor": 20,
              "pointsAgainst": 15
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "IND",
            "values": {
              "passOffEpa": -0.13,
              "turnoverDiff": -1.2,
              "passDefEpa": 0.087,
              "rushDefEpa": 0.082,
              "pointsFor": 24.8,
              "pointsAgainst": 27.6
            },
            "ranks": {
              "passOffEpa": 28,
              "turnoverDiff": 31,
              "passDefEpa": 21,
              "rushDefEpa": 32,
              "pointsFor": 11,
              "pointsAgainst": 27
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "JAX",
            "values": {
              "passOffEpa": 0.274,
              "turnoverDiff": 1,
              "passDefEpa": -0.023,
              "rushDefEpa": -0.19,
              "pointsFor": 24.6,
              "pointsAgainst": 14
            },
            "ranks": {
              "passOffEpa": 4,
              "turnoverDiff": 3,
              "passDefEpa": 8,
              "rushDefEpa": 1,
              "pointsFor": 12,
              "pointsAgainst": 2
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "TEN",
            "values": {
              "passOffEpa": -0.185,
              "turnoverDiff": -1,
              "passDefEpa": 0.224,
              "rushDefEpa": -0.106,
              "pointsFor": 11.6,
              "pointsAgainst": 21.8
            },
            "ranks": {
              "passOffEpa": 30,
              "turnoverDiff": 28,
              "passDefEpa": 28,
              "rushDefEpa": 12,
              "pointsFor": 32,
              "pointsAgainst": 12
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "DEN",
            "values": {
              "passOffEpa": -0.053,
              "turnoverDiff": 0.2,
              "passDefEpa": -0.05,
              "rushDefEpa": 0.019,
              "pointsFor": 19.4,
              "pointsAgainst": 22.2
            },
            "ranks": {
              "passOffEpa": 24,
              "turnoverDiff": 17,
              "passDefEpa": 4,
              "rushDefEpa": 28,
              "pointsFor": 26,
              "pointsAgainst": 13
            },
            "gamesPlayed": 5
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
              "passOffEpa": 8,
              "turnoverDiff": 1,
              "passDefEpa": 9,
              "rushDefEpa": 14,
              "pointsFor": 5,
              "pointsAgainst": 7
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "LV",
            "values": {
              "passOffEpa": 0.189,
              "turnoverDiff": 0.6,
              "passDefEpa": 0.124,
              "rushDefEpa": -0.094,
              "pointsFor": 26.4,
              "pointsAgainst": 25.8
            },
            "ranks": {
              "passOffEpa": 9,
              "turnoverDiff": 10,
              "passDefEpa": 25,
              "rushDefEpa": 15,
              "pointsFor": 9,
              "pointsAgainst": 22
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "LAC",
            "values": {
              "passOffEpa": -0.195,
              "turnoverDiff": -1,
              "passDefEpa": 0.019,
              "rushDefEpa": -0.155,
              "pointsFor": 16.8,
              "pointsAgainst": 25.8
            },
            "ranks": {
              "passOffEpa": 31,
              "turnoverDiff": 29,
              "passDefEpa": 15,
              "rushDefEpa": 5,
              "pointsFor": 30,
              "pointsAgainst": 23
            },
            "gamesPlayed": 5
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
              "turnoverDiff": 22,
              "passDefEpa": 32,
              "rushDefEpa": 24,
              "pointsFor": 7,
              "pointsAgainst": 25
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "NYG",
            "values": {
              "passOffEpa": 0.071,
              "turnoverDiff": 0.2,
              "passDefEpa": 0.012,
              "rushDefEpa": 0.033,
              "pointsFor": 21.8,
              "pointsAgainst": 21.2
            },
            "ranks": {
              "passOffEpa": 16,
              "turnoverDiff": 18,
              "passDefEpa": 14,
              "rushDefEpa": 30,
              "pointsFor": 21,
              "pointsAgainst": 9
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "PHI",
            "values": {
              "passOffEpa": -0.091,
              "turnoverDiff": -0.4,
              "passDefEpa": 0.121,
              "rushDefEpa": -0.042,
              "pointsFor": 18.4,
              "pointsAgainst": 22.4
            },
            "ranks": {
              "passOffEpa": 26,
              "turnoverDiff": 20,
              "passDefEpa": 24,
              "rushDefEpa": 17,
              "pointsFor": 29,
              "pointsAgainst": 16
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "WSH",
            "values": {
              "passOffEpa": 0.01,
              "turnoverDiff": 1,
              "passDefEpa": 0.093,
              "rushDefEpa": -0.048,
              "pointsFor": 23,
              "pointsAgainst": 29.8
            },
            "ranks": {
              "passOffEpa": 20,
              "turnoverDiff": 4,
              "passDefEpa": 22,
              "rushDefEpa": 16,
              "pointsFor": 17,
              "pointsAgainst": 30
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "CHI",
            "values": {
              "passOffEpa": 0.072,
              "turnoverDiff": -0.8,
              "passDefEpa": 0.079,
              "rushDefEpa": -0.016,
              "pointsFor": 23.8,
              "pointsAgainst": 19.2
            },
            "ranks": {
              "passOffEpa": 15,
              "turnoverDiff": 26,
              "passDefEpa": 20,
              "rushDefEpa": 20,
              "pointsFor": 13,
              "pointsAgainst": 6
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "DET",
            "values": {
              "passOffEpa": 0.323,
              "turnoverDiff": 0.8,
              "passDefEpa": 0.218,
              "rushDefEpa": -0.031,
              "pointsFor": 32.8,
              "pointsAgainst": 29.6
            },
            "ranks": {
              "passOffEpa": 2,
              "turnoverDiff": 5,
              "passDefEpa": 27,
              "rushDefEpa": 18,
              "pointsFor": 2,
              "pointsAgainst": 29
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "GB",
            "values": {
              "passOffEpa": 0.11,
              "turnoverDiff": 0.6,
              "passDefEpa": -0.04,
              "rushDefEpa": -0.002,
              "pointsFor": 20.8,
              "pointsAgainst": 22.4
            },
            "ranks": {
              "passOffEpa": 13,
              "turnoverDiff": 11,
              "passDefEpa": 7,
              "rushDefEpa": 23,
              "pointsFor": 24,
              "pointsAgainst": 17
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "MIN",
            "values": {
              "passOffEpa": -0.018,
              "turnoverDiff": 1.2,
              "passDefEpa": -0.244,
              "rushDefEpa": -0.154,
              "pointsFor": 21.8,
              "pointsAgainst": 12.8
            },
            "ranks": {
              "passOffEpa": 22,
              "turnoverDiff": 2,
              "passDefEpa": 1,
              "rushDefEpa": 6,
              "pointsFor": 22,
              "pointsAgainst": 1
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "ATL",
            "values": {
              "passOffEpa": -0.1,
              "turnoverDiff": -1,
              "passDefEpa": 0.037,
              "rushDefEpa": -0.115,
              "pointsFor": 23.8,
              "pointsAgainst": 24.4
            },
            "ranks": {
              "passOffEpa": 27,
              "turnoverDiff": 30,
              "passDefEpa": 17,
              "rushDefEpa": 10,
              "pointsFor": 14,
              "pointsAgainst": 21
            },
            "gamesPlayed": 5
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
              "turnoverDiff": 6,
              "passDefEpa": 19,
              "rushDefEpa": 31,
              "pointsFor": 4,
              "pointsAgainst": 26
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "NO",
            "values": {
              "passOffEpa": -0.023,
              "turnoverDiff": -1.2,
              "passDefEpa": 0.231,
              "rushDefEpa": 0.016,
              "pointsFor": 23.6,
              "pointsAgainst": 30.2
            },
            "ranks": {
              "passOffEpa": 23,
              "turnoverDiff": 32,
              "passDefEpa": 29,
              "rushDefEpa": 27,
              "pointsFor": 16,
              "pointsAgainst": 31
            },
            "gamesPlayed": 5
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
              "passOffEpa": 29,
              "turnoverDiff": 21,
              "passDefEpa": 11,
              "rushDefEpa": 2,
              "pointsFor": 25,
              "pointsAgainst": 18
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "ARI",
            "values": {
              "passOffEpa": -0.009,
              "turnoverDiff": 0.4,
              "passDefEpa": 0.358,
              "rushDefEpa": -0.129,
              "pointsFor": 21.6,
              "pointsAgainst": 32.4
            },
            "ranks": {
              "passOffEpa": 21,
              "turnoverDiff": 14,
              "passDefEpa": 31,
              "rushDefEpa": 9,
              "pointsFor": 23,
              "pointsAgainst": 32
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "LAR",
            "values": {
              "passOffEpa": 0.142,
              "turnoverDiff": -0.6,
              "passDefEpa": -0.089,
              "rushDefEpa": 0.009,
              "pointsFor": 23.8,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 11,
              "turnoverDiff": 23,
              "passDefEpa": 3,
              "rushDefEpa": 25,
              "pointsFor": 15,
              "pointsAgainst": 20
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "SF",
            "values": {
              "passOffEpa": 0.397,
              "turnoverDiff": 0.4,
              "passDefEpa": 0.01,
              "rushDefEpa": -0.138,
              "pointsFor": 30.8,
              "pointsAgainst": 18.6
            },
            "ranks": {
              "passOffEpa": 1,
              "turnoverDiff": 15,
              "passDefEpa": 13,
              "rushDefEpa": 8,
              "pointsFor": 3,
              "pointsAgainst": 3
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "SEA",
            "values": {
              "passOffEpa": 0.052,
              "turnoverDiff": 0.4,
              "passDefEpa": -0.117,
              "rushDefEpa": -0.162,
              "pointsFor": 26.8,
              "pointsAgainst": 21
            },
            "ranks": {
              "passOffEpa": 18,
              "turnoverDiff": 16,
              "passDefEpa": 2,
              "rushDefEpa": 3,
              "pointsFor": 8,
              "pointsAgainst": 8
            },
            "gamesPlayed": 5
          }
        ],
        "weekly": [
          {
            "abbr": "BUF",
            "values": {
              "passOffEpa": 0.419,
              "turnoverDiff": -2,
              "passDefEpa": 0.336,
              "rushDefEpa": -0.012,
              "pointsFor": 37,
              "pointsAgainst": 34
            },
            "ranks": {
              "passOffEpa": 5,
              "turnoverDiff": 24,
              "passDefEpa": 25,
              "rushDefEpa": 21,
              "pointsFor": 3,
              "pointsAgainst": 26
            }
          },
          {
            "abbr": "MIA",
            "values": {
              "passOffEpa": -0.38,
              "turnoverDiff": -2,
              "passDefEpa": 0.436,
              "rushDefEpa": -0.041,
              "pointsFor": 24,
              "pointsAgainst": 31
            },
            "ranks": {
              "passOffEpa": 27,
              "turnoverDiff": 25,
              "passDefEpa": 27,
              "rushDefEpa": 18,
              "pointsFor": 14,
              "pointsAgainst": 23
            }
          },
          {
            "abbr": "NE",
            "values": {
              "passOffEpa": 0.842,
              "turnoverDiff": 0,
              "passDefEpa": 0.268,
              "rushDefEpa": -0.338,
              "pointsFor": 45,
              "pointsAgainst": 17
            },
            "ranks": {
              "passOffEpa": 1,
              "turnoverDiff": 12,
              "passDefEpa": 22,
              "rushDefEpa": 3,
              "pointsFor": 1,
              "pointsAgainst": 6
            }
          },
          {
            "abbr": "NYJ",
            "values": {
              "passOffEpa": -0.333,
              "turnoverDiff": 0,
              "passDefEpa": -0.304,
              "rushDefEpa": -0.284,
              "pointsFor": 17,
              "pointsAgainst": 12
            },
            "ranks": {
              "passOffEpa": 24,
              "turnoverDiff": 13,
              "passDefEpa": 8,
              "rushDefEpa": 7,
              "pointsFor": 22,
              "pointsAgainst": 3
            }
          },
          {
            "abbr": "BAL",
            "values": {
              "passOffEpa": 0.074,
              "turnoverDiff": 0,
              "passDefEpa": 0.162,
              "rushDefEpa": -0.29,
              "pointsFor": 30,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 16,
              "turnoverDiff": 14,
              "passDefEpa": 18,
              "rushDefEpa": 6,
              "pointsFor": 9,
              "pointsAgainst": 13
            }
          },
          {
            "abbr": "CIN",
            "values": {
              "passOffEpa": 0.436,
              "turnoverDiff": 2,
              "passDefEpa": -0.38,
              "rushDefEpa": 0.264,
              "pointsFor": 31,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 4,
              "turnoverDiff": 3,
              "passDefEpa": 4,
              "rushDefEpa": 28,
              "pointsFor": 7,
              "pointsAgainst": 16
            }
          },
          {
            "abbr": "CLE",
            "values": {
              "passOffEpa": -0.304,
              "turnoverDiff": 0,
              "passDefEpa": -0.333,
              "rushDefEpa": -0.019,
              "pointsFor": 12,
              "pointsAgainst": 17
            },
            "ranks": {
              "passOffEpa": 23,
              "turnoverDiff": 15,
              "passDefEpa": 7,
              "rushDefEpa": 20,
              "pointsFor": 28,
              "pointsAgainst": 7
            }
          },
          {
            "abbr": "PIT",
            "values": {
              "passOffEpa": 0.133,
              "turnoverDiff": 0,
              "passDefEpa": -0.003,
              "rushDefEpa": 0.016,
              "pointsFor": 34,
              "pointsAgainst": 22
            },
            "ranks": {
              "passOffEpa": 14,
              "turnoverDiff": 16,
              "passDefEpa": 14,
              "rushDefEpa": 22,
              "pointsFor": 4,
              "pointsAgainst": 12
            }
          },
          {
            "abbr": "HOU",
            "values": {
              "passOffEpa": 0.292,
              "turnoverDiff": 2,
              "passDefEpa": -0.423,
              "rushDefEpa": -0.309,
              "pointsFor": 26,
              "pointsAgainst": 3
            },
            "ranks": {
              "passOffEpa": 7,
              "turnoverDiff": 4,
              "passDefEpa": 2,
              "rushDefEpa": 4,
              "pointsFor": 13,
              "pointsAgainst": 1
            }
          },
          {
            "abbr": "IND",
            "values": {
              "passOffEpa": -0.003,
              "turnoverDiff": 0,
              "passDefEpa": 0.133,
              "rushDefEpa": 0.32,
              "pointsFor": 22,
              "pointsAgainst": 34
            },
            "ranks": {
              "passOffEpa": 17,
              "turnoverDiff": 17,
              "passDefEpa": 17,
              "rushDefEpa": 30,
              "pointsFor": 19,
              "pointsAgainst": 27
            }
          },
          {
            "abbr": "JAX",
            "values": {
              "passOffEpa": 0.248,
              "turnoverDiff": -1,
              "passDefEpa": -0.015,
              "rushDefEpa": -0.631,
              "pointsFor": 19,
              "pointsAgainst": 17
            },
            "ranks": {
              "passOffEpa": 10,
              "turnoverDiff": 20,
              "passDefEpa": 13,
              "rushDefEpa": 1,
              "pointsFor": 21,
              "pointsAgainst": 8
            }
          },
          {
            "abbr": "TEN",
            "values": {
              "passOffEpa": -0.423,
              "turnoverDiff": -2,
              "passDefEpa": 0.292,
              "rushDefEpa": -0.172,
              "pointsFor": 3,
              "pointsAgainst": 26
            },
            "ranks": {
              "passOffEpa": 29,
              "turnoverDiff": 26,
              "passDefEpa": 24,
              "rushDefEpa": 16,
              "pointsFor": 30,
              "pointsAgainst": 18
            }
          },
          {
            "abbr": "DEN",
            "values": {
              "passOffEpa": -0.233,
              "turnoverDiff": 2,
              "passDefEpa": -0.356,
              "rushDefEpa": -0.255,
              "pointsFor": 23,
              "pointsAgainst": 17
            },
            "ranks": {
              "passOffEpa": 22,
              "turnoverDiff": 5,
              "passDefEpa": 5,
              "rushDefEpa": 8,
              "pointsFor": 16,
              "pointsAgainst": 9
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
              "passOffEpa": 0.268,
              "turnoverDiff": 0,
              "passDefEpa": 0.842,
              "rushDefEpa": -0.09,
              "pointsFor": 17,
              "pointsAgainst": 45
            },
            "ranks": {
              "passOffEpa": 9,
              "turnoverDiff": 18,
              "passDefEpa": 30,
              "rushDefEpa": 17,
              "pointsFor": 23,
              "pointsAgainst": 29
            }
          },
          {
            "abbr": "LAC",
            "values": {
              "passOffEpa": -0.356,
              "turnoverDiff": -2,
              "passDefEpa": -0.233,
              "rushDefEpa": -0.309,
              "pointsFor": 17,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 26,
              "turnoverDiff": 27,
              "passDefEpa": 9,
              "rushDefEpa": 5,
              "pointsFor": 24,
              "pointsAgainst": 14
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
              "passOffEpa": 20,
              "turnoverDiff": 29,
              "passDefEpa": 20,
              "rushDefEpa": 24,
              "pointsFor": 26,
              "pointsAgainst": 17
            }
          },
          {
            "abbr": "NYG",
            "values": {
              "passOffEpa": 0.189,
              "turnoverDiff": -2,
              "passDefEpa": -0.08,
              "rushDefEpa": 0.302,
              "pointsFor": 27,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 12,
              "turnoverDiff": 28,
              "passDefEpa": 10,
              "rushDefEpa": 29,
              "pointsFor": 11,
              "pointsAgainst": 19
            }
          },
          {
            "abbr": "PHI",
            "values": {
              "passOffEpa": -0.015,
              "turnoverDiff": 1,
              "passDefEpa": 0.248,
              "rushDefEpa": -0.218,
              "pointsFor": 17,
              "pointsAgainst": 19
            },
            "ranks": {
              "passOffEpa": 18,
              "turnoverDiff": 8,
              "passDefEpa": 21,
              "rushDefEpa": 9,
              "pointsFor": 25,
              "pointsAgainst": 10
            }
          },
          {
            "abbr": "WSH",
            "values": {
              "passOffEpa": -0.08,
              "turnoverDiff": 2,
              "passDefEpa": 0.189,
              "rushDefEpa": -0.184,
              "pointsFor": 27,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 21,
              "turnoverDiff": 6,
              "passDefEpa": 19,
              "rushDefEpa": 15,
              "pointsFor": 12,
              "pointsAgainst": 20
            }
          },
          {
            "abbr": "CHI",
            "values": {
              "passOffEpa": -0.381,
              "turnoverDiff": -5,
              "passDefEpa": 0.512,
              "rushDefEpa": -0.185,
              "pointsFor": 7,
              "pointsAgainst": 31
            },
            "ranks": {
              "passOffEpa": 28,
              "turnoverDiff": 30,
              "passDefEpa": 29,
              "rushDefEpa": 13,
              "pointsFor": 29,
              "pointsAgainst": 24
            }
          },
          {
            "abbr": "DET",
            "values": {
              "passOffEpa": 0.496,
              "turnoverDiff": 1,
              "passDefEpa": 0.1,
              "rushDefEpa": -0.214,
              "pointsFor": 45,
              "pointsAgainst": 21
            },
            "ranks": {
              "passOffEpa": 3,
              "turnoverDiff": 9,
              "passDefEpa": 16,
              "rushDefEpa": 10,
              "pointsFor": 2,
              "pointsAgainst": 11
            }
          },
          {
            "abbr": "GB",
            "values": {
              "passOffEpa": 0.512,
              "turnoverDiff": 5,
              "passDefEpa": -0.381,
              "rushDefEpa": -0.037,
              "pointsFor": 31,
              "pointsAgainst": 7
            },
            "ranks": {
              "passOffEpa": 2,
              "turnoverDiff": 1,
              "passDefEpa": 3,
              "rushDefEpa": 19,
              "pointsFor": 8,
              "pointsAgainst": 2
            }
          },
          {
            "abbr": "MIN",
            "values": {
              "passOffEpa": 0.278,
              "turnoverDiff": 1,
              "passDefEpa": -0.459,
              "rushDefEpa": -0.185,
              "pointsFor": 23,
              "pointsAgainst": 13
            },
            "ranks": {
              "passOffEpa": 8,
              "turnoverDiff": 10,
              "passDefEpa": 1,
              "rushDefEpa": 14,
              "pointsFor": 17,
              "pointsAgainst": 4
            }
          },
          {
            "abbr": "ATL",
            "values": {
              "passOffEpa": 0.162,
              "turnoverDiff": 0,
              "passDefEpa": 0.074,
              "rushDefEpa": 0.207,
              "pointsFor": 23,
              "pointsAgainst": 30
            },
            "ranks": {
              "passOffEpa": 13,
              "turnoverDiff": 19,
              "passDefEpa": 15,
              "rushDefEpa": 26,
              "pointsFor": 18,
              "pointsAgainst": 22
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
              "passOffEpa": -0.459,
              "turnoverDiff": -1,
              "passDefEpa": 0.278,
              "rushDefEpa": -0.204,
              "pointsFor": 13,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 30,
              "turnoverDiff": 21,
              "passDefEpa": 23,
              "rushDefEpa": 11,
              "pointsFor": 27,
              "pointsAgainst": 15
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
              "passOffEpa": 11,
              "turnoverDiff": 2,
              "passDefEpa": 11,
              "rushDefEpa": 23,
              "pointsFor": 15,
              "pointsAgainst": 5
            }
          },
          {
            "abbr": "ARI",
            "values": {
              "passOffEpa": 0.1,
              "turnoverDiff": -1,
              "passDefEpa": 0.496,
              "rushDefEpa": 0.151,
              "pointsFor": 21,
              "pointsAgainst": 45
            },
            "ranks": {
              "passOffEpa": 15,
              "turnoverDiff": 22,
              "passDefEpa": 28,
              "rushDefEpa": 25,
              "pointsFor": 20,
              "pointsAgainst": 30
            }
          },
          {
            "abbr": "LAR",
            "values": {
              "passOffEpa": 0.336,
              "turnoverDiff": 2,
              "passDefEpa": 0.419,
              "rushDefEpa": 0.23,
              "pointsFor": 34,
              "pointsAgainst": 37
            },
            "ranks": {
              "passOffEpa": 6,
              "turnoverDiff": 7,
              "passDefEpa": 26,
              "rushDefEpa": 27,
              "pointsFor": 5,
              "pointsAgainst": 28
            }
          },
          {
            "abbr": "SF",
            "values": {
              "passOffEpa": -0.063,
              "turnoverDiff": 1,
              "passDefEpa": -0.354,
              "rushDefEpa": -0.518,
              "pointsFor": 32,
              "pointsAgainst": 29
            },
            "ranks": {
              "passOffEpa": 19,
              "turnoverDiff": 11,
              "passDefEpa": 6,
              "rushDefEpa": 2,
              "pointsFor": 6,
              "pointsAgainst": 21
            }
          },
          {
            "abbr": "SEA",
            "values": {
              "passOffEpa": -0.354,
              "turnoverDiff": -1,
              "passDefEpa": -0.063,
              "rushDefEpa": -0.186,
              "pointsFor": 29,
              "pointsAgainst": 32
            },
            "ranks": {
              "passOffEpa": 25,
              "turnoverDiff": 23,
              "passDefEpa": 12,
              "rushDefEpa": 12,
              "pointsFor": 10,
              "pointsAgainst": 25
            }
          }
        ]
      },
      "6": {
        "cumulative": [
          {
            "abbr": "BUF",
            "values": {
              "passOffEpa": 0.29,
              "turnoverDiff": -0.5,
              "passDefEpa": 0.216,
              "rushDefEpa": -0.013,
              "pointsFor": 32.83,
              "pointsAgainst": 28.5
            },
            "ranks": {
              "passOffEpa": 3,
              "turnoverDiff": 22,
              "passDefEpa": 28,
              "rushDefEpa": 23,
              "pointsFor": 1,
              "pointsAgainst": 28
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "MIA",
            "values": {
              "passOffEpa": -0.201,
              "turnoverDiff": -0.8,
              "passDefEpa": 0.335,
              "rushDefEpa": -0.148,
              "pointsFor": 14,
              "pointsAgainst": 26.4
            },
            "ranks": {
              "passOffEpa": 30,
              "turnoverDiff": 28,
              "passDefEpa": 31,
              "rushDefEpa": 5,
              "pointsFor": 31,
              "pointsAgainst": 24
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "NE",
            "values": {
              "passOffEpa": 0.166,
              "turnoverDiff": -1,
              "passDefEpa": 0.054,
              "rushDefEpa": -0.061,
              "pointsFor": 22.67,
              "pointsAgainst": 18.83
            },
            "ranks": {
              "passOffEpa": 9,
              "turnoverDiff": 30,
              "passDefEpa": 19,
              "rushDefEpa": 16,
              "pointsFor": 18,
              "pointsAgainst": 5
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "NYJ",
            "values": {
              "passOffEpa": 0.075,
              "turnoverDiff": 0.67,
              "passDefEpa": 0.046,
              "rushDefEpa": -0.163,
              "pointsFor": 18.67,
              "pointsAgainst": 20.33
            },
            "ranks": {
              "passOffEpa": 16,
              "turnoverDiff": 6,
              "passDefEpa": 17,
              "rushDefEpa": 2,
              "pointsFor": 27,
              "pointsAgainst": 7
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "BAL",
            "values": {
              "passOffEpa": 0.247,
              "turnoverDiff": 0.33,
              "passDefEpa": 0.068,
              "rushDefEpa": -0.081,
              "pointsFor": 26,
              "pointsAgainst": 22
            },
            "ranks": {
              "passOffEpa": 5,
              "turnoverDiff": 13,
              "passDefEpa": 21,
              "rushDefEpa": 14,
              "pointsFor": 7,
              "pointsAgainst": 15
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "CIN",
            "values": {
              "passOffEpa": 0.166,
              "turnoverDiff": 0.4,
              "passDefEpa": -0.047,
              "rushDefEpa": -0.003,
              "pointsFor": 25.6,
              "pointsAgainst": 21.8
            },
            "ranks": {
              "passOffEpa": 10,
              "turnoverDiff": 12,
              "passDefEpa": 9,
              "rushDefEpa": 26,
              "pointsFor": 9,
              "pointsAgainst": 14
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "CLE",
            "values": {
              "passOffEpa": -0.016,
              "turnoverDiff": 0,
              "passDefEpa": -0.021,
              "rushDefEpa": -0.055,
              "pointsFor": 17.67,
              "pointsAgainst": 20.33
            },
            "ranks": {
              "passOffEpa": 21,
              "turnoverDiff": 17,
              "passDefEpa": 10,
              "rushDefEpa": 17,
              "pointsFor": 28,
              "pointsAgainst": 8
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "PIT",
            "values": {
              "passOffEpa": -0.117,
              "turnoverDiff": 0.5,
              "passDefEpa": -0.07,
              "rushDefEpa": -0.02,
              "pointsFor": 22.83,
              "pointsAgainst": 21.33
            },
            "ranks": {
              "passOffEpa": 26,
              "turnoverDiff": 10,
              "passDefEpa": 4,
              "rushDefEpa": 22,
              "pointsFor": 17,
              "pointsAgainst": 12
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "HOU",
            "values": {
              "passOffEpa": 0.121,
              "turnoverDiff": 0.5,
              "passDefEpa": 0.048,
              "rushDefEpa": -0.091,
              "pointsFor": 24,
              "pointsAgainst": 23.83
            },
            "ranks": {
              "passOffEpa": 12,
              "turnoverDiff": 11,
              "passDefEpa": 18,
              "rushDefEpa": 13,
              "pointsFor": 14,
              "pointsAgainst": 20
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "IND",
            "values": {
              "passOffEpa": -0.121,
              "turnoverDiff": -1.33,
              "passDefEpa": 0.06,
              "rushDefEpa": 0.051,
              "pointsFor": 24,
              "pointsAgainst": 27.33
            },
            "ranks": {
              "passOffEpa": 27,
              "turnoverDiff": 32,
              "passDefEpa": 20,
              "rushDefEpa": 31,
              "pointsFor": 15,
              "pointsAgainst": 27
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "JAX",
            "values": {
              "passOffEpa": 0.275,
              "turnoverDiff": 0.83,
              "passDefEpa": 0.043,
              "rushDefEpa": -0.159,
              "pointsFor": 25.67,
              "pointsAgainst": 17.33
            },
            "ranks": {
              "passOffEpa": 4,
              "turnoverDiff": 4,
              "passDefEpa": 16,
              "rushDefEpa": 3,
              "pointsFor": 8,
              "pointsAgainst": 3
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "TEN",
            "values": {
              "passOffEpa": -0.182,
              "turnoverDiff": -0.5,
              "passDefEpa": 0.151,
              "rushDefEpa": -0.11,
              "pointsFor": 14,
              "pointsAgainst": 21.5
            },
            "ranks": {
              "passOffEpa": 29,
              "turnoverDiff": 23,
              "passDefEpa": 26,
              "rushDefEpa": 11,
              "pointsFor": 32,
              "pointsAgainst": 13
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "DEN",
            "values": {
              "passOffEpa": -0.076,
              "turnoverDiff": 0.67,
              "passDefEpa": -0.067,
              "rushDefEpa": 0.014,
              "pointsFor": 19,
              "pointsAgainst": 20.83
            },
            "ranks": {
              "passOffEpa": 24,
              "turnoverDiff": 7,
              "passDefEpa": 5,
              "rushDefEpa": 27,
              "pointsFor": 26,
              "pointsAgainst": 10
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "KC",
            "values": {
              "passOffEpa": 0.174,
              "turnoverDiff": 1,
              "passDefEpa": -0.087,
              "rushDefEpa": -0.101,
              "pointsFor": 28,
              "pointsAgainst": 16.6
            },
            "ranks": {
              "passOffEpa": 8,
              "turnoverDiff": 2,
              "passDefEpa": 3,
              "rushDefEpa": 12,
              "pointsFor": 5,
              "pointsAgainst": 2
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "LV",
            "values": {
              "passOffEpa": 0.206,
              "turnoverDiff": 0.33,
              "passDefEpa": 0.155,
              "rushDefEpa": -0.079,
              "pointsFor": 27,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 7,
              "turnoverDiff": 14,
              "passDefEpa": 27,
              "rushDefEpa": 15,
              "pointsFor": 6,
              "pointsAgainst": 26
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "LAC",
            "values": {
              "passOffEpa": -0.225,
              "turnoverDiff": -0.83,
              "passDefEpa": 0.031,
              "rushDefEpa": -0.123,
              "pointsFor": 15,
              "pointsAgainst": 25.17
            },
            "ranks": {
              "passOffEpa": 31,
              "turnoverDiff": 29,
              "passDefEpa": 15,
              "rushDefEpa": 10,
              "pointsFor": 30,
              "pointsAgainst": 22
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "DAL",
            "values": {
              "passOffEpa": 0.146,
              "turnoverDiff": -0.67,
              "passDefEpa": 0.354,
              "rushDefEpa": -0.021,
              "pointsFor": 25.17,
              "pointsAgainst": 26.5
            },
            "ranks": {
              "passOffEpa": 11,
              "turnoverDiff": 27,
              "passDefEpa": 32,
              "rushDefEpa": 21,
              "pointsFor": 11,
              "pointsAgainst": 25
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "NYG",
            "values": {
              "passOffEpa": 0.024,
              "turnoverDiff": -0.33,
              "passDefEpa": 0.007,
              "rushDefEpa": 0.014,
              "pointsFor": 22.67,
              "pointsAgainst": 23.33
            },
            "ranks": {
              "passOffEpa": 17,
              "turnoverDiff": 19,
              "passDefEpa": 12,
              "rushDefEpa": 28,
              "pointsFor": 19,
              "pointsAgainst": 19
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "PHI",
            "values": {
              "passOffEpa": -0.111,
              "turnoverDiff": -0.33,
              "passDefEpa": 0.117,
              "rushDefEpa": -0.039,
              "pointsFor": 17.67,
              "pointsAgainst": 22.83
            },
            "ranks": {
              "passOffEpa": 25,
              "turnoverDiff": 20,
              "passDefEpa": 24,
              "rushDefEpa": 19,
              "pointsFor": 29,
              "pointsAgainst": 16
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "WSH",
            "values": {
              "passOffEpa": 0.02,
              "turnoverDiff": 1,
              "passDefEpa": 0.097,
              "rushDefEpa": 0.054,
              "pointsFor": 22,
              "pointsAgainst": 28.67
            },
            "ranks": {
              "passOffEpa": 18,
              "turnoverDiff": 3,
              "passDefEpa": 23,
              "rushDefEpa": 32,
              "pointsFor": 21,
              "pointsAgainst": 29
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "CHI",
            "values": {
              "passOffEpa": 0.106,
              "turnoverDiff": -0.33,
              "passDefEpa": 0.007,
              "rushDefEpa": -0.043,
              "pointsFor": 25,
              "pointsAgainst": 19.83
            },
            "ranks": {
              "passOffEpa": 15,
              "turnoverDiff": 21,
              "passDefEpa": 13,
              "rushDefEpa": 18,
              "pointsFor": 12,
              "pointsAgainst": 6
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "DET",
            "values": {
              "passOffEpa": 0.323,
              "turnoverDiff": 0.8,
              "passDefEpa": 0.218,
              "rushDefEpa": -0.031,
              "pointsFor": 32.8,
              "pointsAgainst": 29.6
            },
            "ranks": {
              "passOffEpa": 2,
              "turnoverDiff": 5,
              "passDefEpa": 29,
              "rushDefEpa": 20,
              "pointsFor": 2,
              "pointsAgainst": 30
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "GB",
            "values": {
              "passOffEpa": 0.115,
              "turnoverDiff": 0.67,
              "passDefEpa": -0.067,
              "rushDefEpa": -0.008,
              "pointsFor": 21.17,
              "pointsAgainst": 20.83
            },
            "ranks": {
              "passOffEpa": 13,
              "turnoverDiff": 8,
              "passDefEpa": 6,
              "rushDefEpa": 25,
              "pointsFor": 23,
              "pointsAgainst": 11
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "MIN",
            "values": {
              "passOffEpa": -0.018,
              "turnoverDiff": 1.2,
              "passDefEpa": -0.244,
              "rushDefEpa": -0.154,
              "pointsFor": 21.8,
              "pointsAgainst": 12.8
            },
            "ranks": {
              "passOffEpa": 22,
              "turnoverDiff": 1,
              "passDefEpa": 1,
              "rushDefEpa": 4,
              "pointsFor": 22,
              "pointsAgainst": 1
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "ATL",
            "values": {
              "passOffEpa": -0.133,
              "turnoverDiff": -1.17,
              "passDefEpa": 0.072,
              "rushDefEpa": -0.182,
              "pointsFor": 23.67,
              "pointsAgainst": 25.5
            },
            "ranks": {
              "passOffEpa": 28,
              "turnoverDiff": 31,
              "passDefEpa": 22,
              "rushDefEpa": 1,
              "pointsFor": 16,
              "pointsAgainst": 23
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "CAR",
            "values": {
              "passOffEpa": 0.209,
              "turnoverDiff": 0.6,
              "passDefEpa": -0.003,
              "rushDefEpa": 0.019,
              "pointsFor": 29.2,
              "pointsAgainst": 24.6
            },
            "ranks": {
              "passOffEpa": 6,
              "turnoverDiff": 9,
              "passDefEpa": 11,
              "rushDefEpa": 29,
              "pointsFor": 4,
              "pointsAgainst": 21
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "NO",
            "values": {
              "passOffEpa": -0.022,
              "turnoverDiff": -0.5,
              "passDefEpa": 0.143,
              "rushDefEpa": 0.022,
              "pointsFor": 25.33,
              "pointsAgainst": 29.67
            },
            "ranks": {
              "passOffEpa": 23,
              "turnoverDiff": 24,
              "passDefEpa": 25,
              "rushDefEpa": 30,
              "pointsFor": 10,
              "pointsAgainst": 31
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "TB",
            "values": {
              "passOffEpa": -0.234,
              "turnoverDiff": -0.5,
              "passDefEpa": -0.063,
              "rushDefEpa": -0.143,
              "pointsFor": 19.83,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 32,
              "turnoverDiff": 25,
              "passDefEpa": 7,
              "rushDefEpa": 8,
              "pointsFor": 25,
              "pointsAgainst": 17
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "ARI",
            "values": {
              "passOffEpa": 0,
              "turnoverDiff": 0.33,
              "passDefEpa": 0.275,
              "rushDefEpa": -0.126,
              "pointsFor": 21,
              "pointsAgainst": 29.67
            },
            "ranks": {
              "passOffEpa": 20,
              "turnoverDiff": 15,
              "passDefEpa": 30,
              "rushDefEpa": 9,
              "pointsFor": 24,
              "pointsAgainst": 32
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "LAR",
            "values": {
              "passOffEpa": 0.113,
              "turnoverDiff": -0.5,
              "passDefEpa": -0.062,
              "rushDefEpa": -0.012,
              "pointsFor": 22.5,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 14,
              "turnoverDiff": 26,
              "passDefEpa": 8,
              "rushDefEpa": 24,
              "pointsFor": 20,
              "pointsAgainst": 18
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "SF",
            "values": {
              "passOffEpa": 0.348,
              "turnoverDiff": 0.17,
              "passDefEpa": 0.019,
              "rushDefEpa": -0.144,
              "pointsFor": 29.5,
              "pointsAgainst": 18.33
            },
            "ranks": {
              "passOffEpa": 1,
              "turnoverDiff": 16,
              "passDefEpa": 14,
              "rushDefEpa": 7,
              "pointsFor": 3,
              "pointsAgainst": 4
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "SEA",
            "values": {
              "passOffEpa": 0.007,
              "turnoverDiff": -0.17,
              "passDefEpa": -0.13,
              "rushDefEpa": -0.147,
              "pointsFor": 24.67,
              "pointsAgainst": 20.33
            },
            "ranks": {
              "passOffEpa": 19,
              "turnoverDiff": 18,
              "passDefEpa": 2,
              "rushDefEpa": 6,
              "pointsFor": 13,
              "pointsAgainst": 9
            },
            "gamesPlayed": 6
          }
        ],
        "weekly": [
          {
            "abbr": "BUF",
            "values": {
              "passOffEpa": 0.305,
              "turnoverDiff": 1,
              "passDefEpa": 0.28,
              "rushDefEpa": -0.285,
              "pointsFor": 33,
              "pointsAgainst": 30
            },
            "ranks": {
              "passOffEpa": 3,
              "turnoverDiff": 5,
              "passDefEpa": 25,
              "rushDefEpa": 5,
              "pointsFor": 3,
              "pointsAgainst": 23
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
              "passOffEpa": 0.394,
              "turnoverDiff": -1,
              "passDefEpa": 0.178,
              "rushDefEpa": -0.299,
              "pointsFor": 26,
              "pointsAgainst": 19
            },
            "ranks": {
              "passOffEpa": 2,
              "turnoverDiff": 19,
              "passDefEpa": 22,
              "rushDefEpa": 3,
              "pointsFor": 8,
              "pointsAgainst": 11
            }
          },
          {
            "abbr": "NYJ",
            "values": {
              "passOffEpa": 0.178,
              "turnoverDiff": 1,
              "passDefEpa": 0.394,
              "rushDefEpa": -0.195,
              "pointsFor": 19,
              "pointsAgainst": 26
            },
            "ranks": {
              "passOffEpa": 7,
              "turnoverDiff": 6,
              "passDefEpa": 27,
              "rushDefEpa": 6,
              "pointsFor": 17,
              "pointsAgainst": 19
            }
          },
          {
            "abbr": "BAL",
            "values": {
              "passOffEpa": 0.137,
              "turnoverDiff": -1,
              "passDefEpa": -0.222,
              "rushDefEpa": -0.005,
              "pointsFor": 10,
              "pointsAgainst": 13
            },
            "ranks": {
              "passOffEpa": 9,
              "turnoverDiff": 20,
              "passDefEpa": 5,
              "rushDefEpa": 24,
              "pointsFor": 27,
              "pointsAgainst": 3
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
              "passOffEpa": -0.222,
              "turnoverDiff": 1,
              "passDefEpa": 0.137,
              "rushDefEpa": -0.434,
              "pointsFor": 13,
              "pointsAgainst": 10
            },
            "ranks": {
              "passOffEpa": 24,
              "turnoverDiff": 7,
              "passDefEpa": 20,
              "rushDefEpa": 1,
              "pointsFor": 25,
              "pointsAgainst": 2
            }
          },
          {
            "abbr": "PIT",
            "values": {
              "passOffEpa": -0.25,
              "turnoverDiff": 1,
              "passDefEpa": -0.454,
              "rushDefEpa": -0.017,
              "pointsFor": 26,
              "pointsAgainst": 19
            },
            "ranks": {
              "passOffEpa": 25,
              "turnoverDiff": 8,
              "passDefEpa": 1,
              "rushDefEpa": 21,
              "pointsFor": 9,
              "pointsAgainst": 12
            }
          },
          {
            "abbr": "HOU",
            "values": {
              "passOffEpa": 0.408,
              "turnoverDiff": 0,
              "passDefEpa": 0.278,
              "rushDefEpa": 0.009,
              "pointsFor": 34,
              "pointsAgainst": 31
            },
            "ranks": {
              "passOffEpa": 1,
              "turnoverDiff": 11,
              "passDefEpa": 24,
              "rushDefEpa": 25,
              "pointsFor": 1,
              "pointsAgainst": 24
            }
          },
          {
            "abbr": "IND",
            "values": {
              "passOffEpa": -0.088,
              "turnoverDiff": -2,
              "passDefEpa": -0.161,
              "rushDefEpa": -0.127,
              "pointsFor": 20,
              "pointsAgainst": 26
            },
            "ranks": {
              "passOffEpa": 17,
              "turnoverDiff": 25,
              "passDefEpa": 8,
              "rushDefEpa": 12,
              "pointsFor": 16,
              "pointsAgainst": 20
            }
          },
          {
            "abbr": "JAX",
            "values": {
              "passOffEpa": 0.278,
              "turnoverDiff": 0,
              "passDefEpa": 0.408,
              "rushDefEpa": -0.025,
              "pointsFor": 31,
              "pointsAgainst": 34
            },
            "ranks": {
              "passOffEpa": 5,
              "turnoverDiff": 12,
              "passDefEpa": 28,
              "rushDefEpa": 20,
              "pointsFor": 4,
              "pointsAgainst": 27
            }
          },
          {
            "abbr": "TEN",
            "values": {
              "passOffEpa": -0.161,
              "turnoverDiff": 2,
              "passDefEpa": -0.088,
              "rushDefEpa": -0.134,
              "pointsFor": 26,
              "pointsAgainst": 20
            },
            "ranks": {
              "passOffEpa": 21,
              "turnoverDiff": 3,
              "passDefEpa": 12,
              "rushDefEpa": 10,
              "pointsFor": 10,
              "pointsAgainst": 13
            }
          },
          {
            "abbr": "DEN",
            "values": {
              "passOffEpa": -0.21,
              "turnoverDiff": 3,
              "passDefEpa": -0.12,
              "rushDefEpa": -0.015,
              "pointsFor": 17,
              "pointsAgainst": 14
            },
            "ranks": {
              "passOffEpa": 23,
              "turnoverDiff": 1,
              "passDefEpa": 11,
              "rushDefEpa": 22,
              "pointsFor": 20,
              "pointsAgainst": 5
            }
          },
          {
            "abbr": "KC",
            "values": {
              "passOffEpa": 0.092,
              "turnoverDiff": 0,
              "passDefEpa": -0.341,
              "rushDefEpa": -0.13,
              "pointsFor": 22,
              "pointsAgainst": 6
            },
            "ranks": {
              "passOffEpa": 12,
              "turnoverDiff": 13,
              "passDefEpa": 2,
              "rushDefEpa": 11,
              "pointsFor": 15,
              "pointsAgainst": 1
            }
          },
          {
            "abbr": "LV",
            "values": {
              "passOffEpa": 0.28,
              "turnoverDiff": -1,
              "passDefEpa": 0.305,
              "rushDefEpa": -0.008,
              "pointsFor": 30,
              "pointsAgainst": 33
            },
            "ranks": {
              "passOffEpa": 4,
              "turnoverDiff": 21,
              "passDefEpa": 26,
              "rushDefEpa": 23,
              "pointsFor": 6,
              "pointsAgainst": 26
            }
          },
          {
            "abbr": "LAC",
            "values": {
              "passOffEpa": -0.341,
              "turnoverDiff": 0,
              "passDefEpa": 0.092,
              "rushDefEpa": 0.063,
              "pointsFor": 6,
              "pointsAgainst": 22
            },
            "ranks": {
              "passOffEpa": 27,
              "turnoverDiff": 14,
              "passDefEpa": 17,
              "rushDefEpa": 26,
              "pointsFor": 28,
              "pointsAgainst": 14
            }
          },
          {
            "abbr": "DAL",
            "values": {
              "passOffEpa": -0.152,
              "turnoverDiff": -1,
              "passDefEpa": 0.138,
              "rushDefEpa": -0.145,
              "pointsFor": 13,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 20,
              "turnoverDiff": 22,
              "passDefEpa": 21,
              "rushDefEpa": 8,
              "pointsFor": 26,
              "pointsAgainst": 15
            }
          },
          {
            "abbr": "NYG",
            "values": {
              "passOffEpa": -0.135,
              "turnoverDiff": -3,
              "passDefEpa": -0.017,
              "rushDefEpa": -0.047,
              "pointsFor": 27,
              "pointsAgainst": 34
            },
            "ranks": {
              "passOffEpa": 19,
              "turnoverDiff": 27,
              "passDefEpa": 14,
              "rushDefEpa": 17,
              "pointsFor": 7,
              "pointsAgainst": 28
            }
          },
          {
            "abbr": "PHI",
            "values": {
              "passOffEpa": -0.18,
              "turnoverDiff": 0,
              "passDefEpa": 0.098,
              "rushDefEpa": -0.026,
              "pointsFor": 14,
              "pointsAgainst": 25
            },
            "ranks": {
              "passOffEpa": 22,
              "turnoverDiff": 15,
              "passDefEpa": 18,
              "rushDefEpa": 19,
              "pointsFor": 23,
              "pointsAgainst": 18
            }
          },
          {
            "abbr": "WSH",
            "values": {
              "passOffEpa": 0.059,
              "turnoverDiff": 1,
              "passDefEpa": 0.118,
              "rushDefEpa": 0.483,
              "pointsFor": 17,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 13,
              "turnoverDiff": 9,
              "passDefEpa": 19,
              "rushDefEpa": 28,
              "pointsFor": 21,
              "pointsAgainst": 16
            }
          },
          {
            "abbr": "CHI",
            "values": {
              "passOffEpa": 0.266,
              "turnoverDiff": 2,
              "passDefEpa": -0.259,
              "rushDefEpa": -0.289,
              "pointsFor": 31,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 6,
              "turnoverDiff": 4,
              "passDefEpa": 3,
              "rushDefEpa": 4,
              "pointsFor": 5,
              "pointsAgainst": 17
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
              "passOffEpa": 0.138,
              "turnoverDiff": 1,
              "passDefEpa": -0.152,
              "rushDefEpa": -0.07,
              "pointsFor": 23,
              "pointsAgainst": 13
            },
            "ranks": {
              "passOffEpa": 8,
              "turnoverDiff": 10,
              "passDefEpa": 9,
              "rushDefEpa": 15,
              "pointsFor": 12,
              "pointsAgainst": 4
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
              "passOffEpa": -0.259,
              "turnoverDiff": -2,
              "passDefEpa": 0.266,
              "rushDefEpa": -0.398,
              "pointsFor": 23,
              "pointsAgainst": 31
            },
            "ranks": {
              "passOffEpa": 26,
              "turnoverDiff": 26,
              "passDefEpa": 23,
              "rushDefEpa": 2,
              "pointsFor": 13,
              "pointsAgainst": 25
            }
          },
          {
            "abbr": "CAR",
            "values": {
              "passOffEpa": 0.098,
              "turnoverDiff": 0,
              "passDefEpa": -0.18,
              "rushDefEpa": -0.139,
              "pointsFor": 25,
              "pointsAgainst": 14
            },
            "ranks": {
              "passOffEpa": 11,
              "turnoverDiff": 16,
              "passDefEpa": 7,
              "rushDefEpa": 9,
              "pointsFor": 11,
              "pointsAgainst": 6
            }
          },
          {
            "abbr": "NO",
            "values": {
              "passOffEpa": -0.017,
              "turnoverDiff": 3,
              "passDefEpa": -0.135,
              "rushDefEpa": 0.072,
              "pointsFor": 34,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 15,
              "turnoverDiff": 2,
              "passDefEpa": 10,
              "rushDefEpa": 27,
              "pointsFor": 2,
              "pointsAgainst": 22
            }
          },
          {
            "abbr": "TB",
            "values": {
              "passOffEpa": -0.454,
              "turnoverDiff": -1,
              "passDefEpa": -0.25,
              "rushDefEpa": -0.042,
              "pointsFor": 19,
              "pointsAgainst": 26
            },
            "ranks": {
              "passOffEpa": 28,
              "turnoverDiff": 23,
              "passDefEpa": 4,
              "rushDefEpa": 18,
              "pointsFor": 18,
              "pointsAgainst": 21
            }
          },
          {
            "abbr": "ARI",
            "values": {
              "passOffEpa": 0.057,
              "turnoverDiff": 0,
              "passDefEpa": -0.071,
              "rushDefEpa": -0.111,
              "pointsFor": 18,
              "pointsAgainst": 16
            },
            "ranks": {
              "passOffEpa": 14,
              "turnoverDiff": 17,
              "passDefEpa": 13,
              "rushDefEpa": 13,
              "pointsFor": 19,
              "pointsAgainst": 7
            }
          },
          {
            "abbr": "LAR",
            "values": {
              "passOffEpa": -0.071,
              "turnoverDiff": 0,
              "passDefEpa": 0.057,
              "rushDefEpa": -0.098,
              "pointsFor": 16,
              "pointsAgainst": 18
            },
            "ranks": {
              "passOffEpa": 16,
              "turnoverDiff": 18,
              "passDefEpa": 15,
              "rushDefEpa": 14,
              "pointsFor": 22,
              "pointsAgainst": 10
            }
          },
          {
            "abbr": "SF",
            "values": {
              "passOffEpa": 0.118,
              "turnoverDiff": -1,
              "passDefEpa": 0.059,
              "rushDefEpa": -0.191,
              "pointsFor": 23,
              "pointsAgainst": 17
            },
            "ranks": {
              "passOffEpa": 10,
              "turnoverDiff": 24,
              "passDefEpa": 16,
              "rushDefEpa": 7,
              "pointsFor": 14,
              "pointsAgainst": 8
            }
          },
          {
            "abbr": "SEA",
            "values": {
              "passOffEpa": -0.12,
              "turnoverDiff": -3,
              "passDefEpa": -0.21,
              "rushDefEpa": -0.07,
              "pointsFor": 14,
              "pointsAgainst": 17
            },
            "ranks": {
              "passOffEpa": 18,
              "turnoverDiff": 28,
              "passDefEpa": 6,
              "rushDefEpa": 16,
              "pointsFor": 24,
              "pointsAgainst": 9
            }
          }
        ]
      },
      "7": {
        "cumulative": [
          {
            "abbr": "BUF",
            "values": {
              "passOffEpa": 0.29,
              "turnoverDiff": -0.5,
              "passDefEpa": 0.216,
              "rushDefEpa": -0.013,
              "pointsFor": 32.83,
              "pointsAgainst": 28.5
            },
            "ranks": {
              "passOffEpa": 2,
              "turnoverDiff": 26,
              "passDefEpa": 29,
              "rushDefEpa": 24,
              "pointsFor": 1,
              "pointsAgainst": 30
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "MIA",
            "values": {
              "passOffEpa": -0.105,
              "turnoverDiff": -0.5,
              "passDefEpa": 0.343,
              "rushDefEpa": -0.117,
              "pointsFor": 16.33,
              "pointsAgainst": 26.17
            },
            "ranks": {
              "passOffEpa": 27,
              "turnoverDiff": 27,
              "passDefEpa": 32,
              "rushDefEpa": 6,
              "pointsFor": 30,
              "pointsAgainst": 25
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "NE",
            "values": {
              "passOffEpa": 0.188,
              "turnoverDiff": -1,
              "passDefEpa": 0.102,
              "rushDefEpa": -0.064,
              "pointsFor": 22.86,
              "pointsAgainst": 20.43
            },
            "ranks": {
              "passOffEpa": 7,
              "turnoverDiff": 31,
              "passDefEpa": 22,
              "rushDefEpa": 16,
              "pointsFor": 19,
              "pointsAgainst": 9
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "NYJ",
            "values": {
              "passOffEpa": 0.118,
              "turnoverDiff": 0.43,
              "passDefEpa": 0.091,
              "rushDefEpa": -0.11,
              "pointsFor": 19.57,
              "pointsAgainst": 21.43
            },
            "ranks": {
              "passOffEpa": 13,
              "turnoverDiff": 11,
              "passDefEpa": 20,
              "rushDefEpa": 7,
              "pointsFor": 27,
              "pointsAgainst": 13
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "BAL",
            "values": {
              "passOffEpa": 0.22,
              "turnoverDiff": 0.14,
              "passDefEpa": 0.134,
              "rushDefEpa": -0.079,
              "pointsFor": 24.14,
              "pointsAgainst": 23.86
            },
            "ranks": {
              "passOffEpa": 6,
              "turnoverDiff": 14,
              "passDefEpa": 24,
              "rushDefEpa": 12,
              "pointsFor": 12,
              "pointsAgainst": 18
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "CIN",
            "values": {
              "passOffEpa": 0.223,
              "turnoverDiff": 0.5,
              "passDefEpa": -0.023,
              "rushDefEpa": -0.066,
              "pointsFor": 27.17,
              "pointsAgainst": 20.33
            },
            "ranks": {
              "passOffEpa": 5,
              "turnoverDiff": 9,
              "passDefEpa": 6,
              "rushDefEpa": 15,
              "pointsFor": 4,
              "pointsAgainst": 8
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "CLE",
            "values": {
              "passOffEpa": 0.006,
              "turnoverDiff": 0,
              "passDefEpa": 0.004,
              "rushDefEpa": -0.069,
              "pointsFor": 19,
              "pointsAgainst": 20.86
            },
            "ranks": {
              "passOffEpa": 21,
              "turnoverDiff": 16,
              "passDefEpa": 10,
              "rushDefEpa": 14,
              "pointsFor": 28,
              "pointsAgainst": 12
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "PIT",
            "values": {
              "passOffEpa": -0.097,
              "turnoverDiff": 0.57,
              "passDefEpa": -0.018,
              "rushDefEpa": -0.059,
              "pointsFor": 21.86,
              "pointsAgainst": 19.71
            },
            "ranks": {
              "passOffEpa": 26,
              "turnoverDiff": 6,
              "passDefEpa": 9,
              "rushDefEpa": 18,
              "pointsFor": 22,
              "pointsAgainst": 5
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "HOU",
            "values": {
              "passOffEpa": 0.106,
              "turnoverDiff": 0.43,
              "passDefEpa": 0.064,
              "rushDefEpa": -0.017,
              "pointsFor": 23.57,
              "pointsAgainst": 24.29
            },
            "ranks": {
              "passOffEpa": 16,
              "turnoverDiff": 12,
              "passDefEpa": 18,
              "rushDefEpa": 23,
              "pointsFor": 15,
              "pointsAgainst": 19
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "IND",
            "values": {
              "passOffEpa": -0.139,
              "turnoverDiff": -1.29,
              "passDefEpa": 0.052,
              "rushDefEpa": 0.005,
              "pointsFor": 22,
              "pointsAgainst": 25.71
            },
            "ranks": {
              "passOffEpa": 30,
              "turnoverDiff": 32,
              "passDefEpa": 15,
              "rushDefEpa": 27,
              "pointsFor": 20,
              "pointsAgainst": 23
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "JAX",
            "values": {
              "passOffEpa": 0.275,
              "turnoverDiff": 0.83,
              "passDefEpa": 0.043,
              "rushDefEpa": -0.159,
              "pointsFor": 25.67,
              "pointsAgainst": 17.33
            },
            "ranks": {
              "passOffEpa": 4,
              "turnoverDiff": 3,
              "passDefEpa": 14,
              "rushDefEpa": 1,
              "pointsFor": 9,
              "pointsAgainst": 3
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "TEN",
            "values": {
              "passOffEpa": -0.129,
              "turnoverDiff": -0.43,
              "passDefEpa": 0.147,
              "rushDefEpa": -0.062,
              "pointsFor": 15.43,
              "pointsAgainst": 22.29
            },
            "ranks": {
              "passOffEpa": 29,
              "turnoverDiff": 21,
              "passDefEpa": 25,
              "rushDefEpa": 17,
              "pointsFor": 31,
              "pointsAgainst": 15
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "DEN",
            "values": {
              "passOffEpa": -0.046,
              "turnoverDiff": 0.57,
              "passDefEpa": -0.082,
              "rushDefEpa": 0.009,
              "pointsFor": 20.57,
              "pointsAgainst": 20.14
            },
            "ranks": {
              "passOffEpa": 24,
              "turnoverDiff": 7,
              "passDefEpa": 4,
              "rushDefEpa": 28,
              "pointsFor": 24,
              "pointsAgainst": 7
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "KC",
            "values": {
              "passOffEpa": 0.114,
              "turnoverDiff": 0.83,
              "passDefEpa": -0.021,
              "rushDefEpa": -0.084,
              "pointsFor": 23.83,
              "pointsAgainst": 17.17
            },
            "ranks": {
              "passOffEpa": 14,
              "turnoverDiff": 4,
              "passDefEpa": 8,
              "rushDefEpa": 10,
              "pointsFor": 14,
              "pointsAgainst": 2
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "LV",
            "values": {
              "passOffEpa": 0.156,
              "turnoverDiff": 0.57,
              "passDefEpa": 0.157,
              "rushDefEpa": -0.051,
              "pointsFor": 26.14,
              "pointsAgainst": 28.14
            },
            "ranks": {
              "passOffEpa": 9,
              "turnoverDiff": 8,
              "passDefEpa": 27,
              "rushDefEpa": 21,
              "pointsFor": 7,
              "pointsAgainst": 29
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "LAC",
            "values": {
              "passOffEpa": -0.225,
              "turnoverDiff": -0.83,
              "passDefEpa": 0.031,
              "rushDefEpa": -0.123,
              "pointsFor": 15,
              "pointsAgainst": 25.17
            },
            "ranks": {
              "passOffEpa": 32,
              "turnoverDiff": 30,
              "passDefEpa": 13,
              "rushDefEpa": 5,
              "pointsFor": 32,
              "pointsAgainst": 22
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "DAL",
            "values": {
              "passOffEpa": 0.175,
              "turnoverDiff": -0.43,
              "passDefEpa": 0.281,
              "rushDefEpa": -0.007,
              "pointsFor": 27,
              "pointsAgainst": 25.71
            },
            "ranks": {
              "passOffEpa": 8,
              "turnoverDiff": 22,
              "passDefEpa": 31,
              "rushDefEpa": 25,
              "pointsFor": 5,
              "pointsAgainst": 24
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "NYG",
            "values": {
              "passOffEpa": 0.043,
              "turnoverDiff": -0.29,
              "passDefEpa": 0.005,
              "rushDefEpa": -0.004,
              "pointsFor": 23.29,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 18,
              "turnoverDiff": 20,
              "passDefEpa": 11,
              "rushDefEpa": 26,
              "pointsFor": 16,
              "pointsAgainst": 17
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "PHI",
            "values": {
              "passOffEpa": -0.108,
              "turnoverDiff": -0.43,
              "passDefEpa": 0.152,
              "rushDefEpa": 0.009,
              "pointsFor": 18.14,
              "pointsAgainst": 25
            },
            "ranks": {
              "passOffEpa": 28,
              "turnoverDiff": 23,
              "passDefEpa": 26,
              "rushDefEpa": 29,
              "pointsFor": 29,
              "pointsAgainst": 21
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "WSH",
            "values": {
              "passOffEpa": 0.02,
              "turnoverDiff": 1,
              "passDefEpa": 0.097,
              "rushDefEpa": 0.054,
              "pointsFor": 22,
              "pointsAgainst": 28.67
            },
            "ranks": {
              "passOffEpa": 19,
              "turnoverDiff": 2,
              "passDefEpa": 21,
              "rushDefEpa": 32,
              "pointsFor": 21,
              "pointsAgainst": 31
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "CHI",
            "values": {
              "passOffEpa": 0.144,
              "turnoverDiff": -0.14,
              "passDefEpa": 0.056,
              "rushDefEpa": -0.058,
              "pointsFor": 25.71,
              "pointsAgainst": 20.43
            },
            "ranks": {
              "passOffEpa": 10,
              "turnoverDiff": 17,
              "passDefEpa": 17,
              "rushDefEpa": 19,
              "pointsFor": 8,
              "pointsAgainst": 10
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "DET",
            "values": {
              "passOffEpa": 0.317,
              "turnoverDiff": 0.5,
              "passDefEpa": 0.207,
              "rushDefEpa": -0.058,
              "pointsFor": 30.67,
              "pointsAgainst": 27.5
            },
            "ranks": {
              "passOffEpa": 1,
              "turnoverDiff": 10,
              "passDefEpa": 28,
              "rushDefEpa": 20,
              "pointsFor": 2,
              "pointsAgainst": 26
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "GB",
            "values": {
              "passOffEpa": 0.121,
              "turnoverDiff": 0.71,
              "passDefEpa": -0.023,
              "rushDefEpa": -0.082,
              "pointsFor": 20.57,
              "pointsAgainst": 20.71
            },
            "ranks": {
              "passOffEpa": 11,
              "turnoverDiff": 5,
              "passDefEpa": 7,
              "rushDefEpa": 11,
              "pointsFor": 25,
              "pointsAgainst": 11
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "MIN",
            "values": {
              "passOffEpa": -0.016,
              "turnoverDiff": 1.17,
              "passDefEpa": -0.251,
              "rushDefEpa": -0.11,
              "pointsFor": 20.83,
              "pointsAgainst": 12.33
            },
            "ranks": {
              "passOffEpa": 22,
              "turnoverDiff": 1,
              "passDefEpa": 1,
              "rushDefEpa": 8,
              "pointsFor": 23,
              "pointsAgainst": 1
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "ATL",
            "values": {
              "passOffEpa": -0.07,
              "turnoverDiff": -0.43,
              "passDefEpa": 0.069,
              "rushDefEpa": -0.14,
              "pointsFor": 24.43,
              "pointsAgainst": 24.71
            },
            "ranks": {
              "passOffEpa": 25,
              "turnoverDiff": 24,
              "passDefEpa": 19,
              "rushDefEpa": 3,
              "pointsFor": 10,
              "pointsAgainst": 20
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "CAR",
            "values": {
              "passOffEpa": 0.107,
              "turnoverDiff": -0.17,
              "passDefEpa": 0.022,
              "rushDefEpa": 0.053,
              "pointsFor": 26.5,
              "pointsAgainst": 27.67
            },
            "ranks": {
              "passOffEpa": 15,
              "turnoverDiff": 19,
              "passDefEpa": 12,
              "rushDefEpa": 31,
              "pointsFor": 6,
              "pointsAgainst": 27
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "NO",
            "values": {
              "passOffEpa": 0.018,
              "turnoverDiff": -0.57,
              "passDefEpa": 0.132,
              "rushDefEpa": 0.025,
              "pointsFor": 23.14,
              "pointsAgainst": 27.71
            },
            "ranks": {
              "passOffEpa": 20,
              "turnoverDiff": 28,
              "passDefEpa": 23,
              "rushDefEpa": 30,
              "pointsFor": 17,
              "pointsAgainst": 28
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "TB",
            "values": {
              "passOffEpa": -0.199,
              "turnoverDiff": 0.14,
              "passDefEpa": -0.123,
              "rushDefEpa": -0.102,
              "pointsFor": 23.14,
              "pointsAgainst": 21.57
            },
            "ranks": {
              "passOffEpa": 31,
              "turnoverDiff": 15,
              "passDefEpa": 3,
              "rushDefEpa": 9,
              "pointsFor": 18,
              "pointsAgainst": 14
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "ARI",
            "values": {
              "passOffEpa": -0.026,
              "turnoverDiff": 0.29,
              "passDefEpa": 0.257,
              "rushDefEpa": -0.076,
              "pointsFor": 20.29,
              "pointsAgainst": 29.71
            },
            "ranks": {
              "passOffEpa": 23,
              "turnoverDiff": 13,
              "passDefEpa": 30,
              "rushDefEpa": 13,
              "pointsFor": 26,
              "pointsAgainst": 32
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "LAR",
            "values": {
              "passOffEpa": 0.119,
              "turnoverDiff": -0.71,
              "passDefEpa": -0.066,
              "rushDefEpa": -0.046,
              "pointsFor": 24.29,
              "pointsAgainst": 22.71
            },
            "ranks": {
              "passOffEpa": 12,
              "turnoverDiff": 29,
              "passDefEpa": 5,
              "rushDefEpa": 22,
              "pointsFor": 11,
              "pointsAgainst": 16
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "SF",
            "values": {
              "passOffEpa": 0.29,
              "turnoverDiff": -0.43,
              "passDefEpa": 0.052,
              "rushDefEpa": -0.156,
              "pointsFor": 28.14,
              "pointsAgainst": 19.86
            },
            "ranks": {
              "passOffEpa": 3,
              "turnoverDiff": 25,
              "passDefEpa": 16,
              "rushDefEpa": 2,
              "pointsFor": 3,
              "pointsAgainst": 6
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "SEA",
            "values": {
              "passOffEpa": 0.056,
              "turnoverDiff": -0.14,
              "passDefEpa": -0.137,
              "rushDefEpa": -0.129,
              "pointsFor": 24,
              "pointsAgainst": 17.86
            },
            "ranks": {
              "passOffEpa": 17,
              "turnoverDiff": 18,
              "passDefEpa": 2,
              "rushDefEpa": 4,
              "pointsFor": 13,
              "pointsAgainst": 4
            },
            "gamesPlayed": 7
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
              "passOffEpa": 0.496,
              "turnoverDiff": 1,
              "passDefEpa": 0.381,
              "rushDefEpa": 0.104,
              "pointsFor": 28,
              "pointsAgainst": 25
            },
            "ranks": {
              "passOffEpa": 2,
              "turnoverDiff": 4,
              "passDefEpa": 23,
              "rushDefEpa": 20,
              "pointsFor": 8,
              "pointsAgainst": 18
            }
          },
          {
            "abbr": "NE",
            "values": {
              "passOffEpa": 0.32,
              "turnoverDiff": -1,
              "passDefEpa": 0.377,
              "rushDefEpa": -0.074,
              "pointsFor": 24,
              "pointsAgainst": 30
            },
            "ranks": {
              "passOffEpa": 8,
              "turnoverDiff": 19,
              "passDefEpa": 22,
              "rushDefEpa": 11,
              "pointsFor": 12,
              "pointsAgainst": 23
            }
          },
          {
            "abbr": "NYJ",
            "values": {
              "passOffEpa": 0.381,
              "turnoverDiff": -1,
              "passDefEpa": 0.496,
              "rushDefEpa": 0.118,
              "pointsFor": 25,
              "pointsAgainst": 28
            },
            "ranks": {
              "passOffEpa": 6,
              "turnoverDiff": 20,
              "passDefEpa": 27,
              "rushDefEpa": 22,
              "pointsFor": 11,
              "pointsAgainst": 21
            }
          },
          {
            "abbr": "BAL",
            "values": {
              "passOffEpa": 0.091,
              "turnoverDiff": -1,
              "passDefEpa": 0.587,
              "rushDefEpa": -0.065,
              "pointsFor": 13,
              "pointsAgainst": 35
            },
            "ranks": {
              "passOffEpa": 18,
              "turnoverDiff": 21,
              "passDefEpa": 28,
              "rushDefEpa": 12,
              "pointsFor": 24,
              "pointsAgainst": 25
            }
          },
          {
            "abbr": "CIN",
            "values": {
              "passOffEpa": 0.587,
              "turnoverDiff": 1,
              "passDefEpa": 0.091,
              "rushDefEpa": -0.349,
              "pointsFor": 35,
              "pointsAgainst": 13
            },
            "ranks": {
              "passOffEpa": 1,
              "turnoverDiff": 5,
              "passDefEpa": 11,
              "rushDefEpa": 4,
              "pointsFor": 3,
              "pointsAgainst": 4
            }
          },
          {
            "abbr": "CLE",
            "values": {
              "passOffEpa": 0.124,
              "turnoverDiff": 0,
              "passDefEpa": 0.183,
              "rushDefEpa": -0.137,
              "pointsFor": 27,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 17,
              "turnoverDiff": 11,
              "passDefEpa": 17,
              "rushDefEpa": 9,
              "pointsFor": 9,
              "pointsAgainst": 16
            }
          },
          {
            "abbr": "PIT",
            "values": {
              "passOffEpa": 0.063,
              "turnoverDiff": 1,
              "passDefEpa": 0.264,
              "rushDefEpa": -0.417,
              "pointsFor": 16,
              "pointsAgainst": 10
            },
            "ranks": {
              "passOffEpa": 19,
              "turnoverDiff": 6,
              "passDefEpa": 18,
              "rushDefEpa": 2,
              "pointsFor": 21,
              "pointsAgainst": 2
            }
          },
          {
            "abbr": "HOU",
            "values": {
              "passOffEpa": -0.014,
              "turnoverDiff": 0,
              "passDefEpa": 0.18,
              "rushDefEpa": 0.301,
              "pointsFor": 21,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 22,
              "turnoverDiff": 12,
              "passDefEpa": 16,
              "rushDefEpa": 28,
              "pointsFor": 14,
              "pointsAgainst": 19
            }
          },
          {
            "abbr": "IND",
            "values": {
              "passOffEpa": -0.299,
              "turnoverDiff": -1,
              "passDefEpa": -0.003,
              "rushDefEpa": -0.236,
              "pointsFor": 10,
              "pointsAgainst": 16
            },
            "ranks": {
              "passOffEpa": 27,
              "turnoverDiff": 22,
              "passDefEpa": 8,
              "rushDefEpa": 6,
              "pointsFor": 26,
              "pointsAgainst": 6
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
              "passOffEpa": 0.183,
              "turnoverDiff": 0,
              "passDefEpa": 0.124,
              "rushDefEpa": 0.256,
              "pointsFor": 24,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 12,
              "turnoverDiff": 13,
              "passDefEpa": 12,
              "rushDefEpa": 27,
              "pointsFor": 13,
              "pointsAgainst": 20
            }
          },
          {
            "abbr": "DEN",
            "values": {
              "passOffEpa": 0.151,
              "turnoverDiff": 0,
              "passDefEpa": -0.153,
              "rushDefEpa": -0.028,
              "pointsFor": 30,
              "pointsAgainst": 16
            },
            "ranks": {
              "passOffEpa": 15,
              "turnoverDiff": 14,
              "passDefEpa": 4,
              "rushDefEpa": 14,
              "pointsFor": 5,
              "pointsAgainst": 7
            }
          },
          {
            "abbr": "KC",
            "values": {
              "passOffEpa": -0.178,
              "turnoverDiff": 0,
              "passDefEpa": 0.434,
              "rushDefEpa": -0.034,
              "pointsFor": 3,
              "pointsAgainst": 20
            },
            "ranks": {
              "passOffEpa": 26,
              "turnoverDiff": 15,
              "passDefEpa": 24,
              "rushDefEpa": 13,
              "pointsFor": 28,
              "pointsAgainst": 10
            }
          },
          {
            "abbr": "LV",
            "values": {
              "passOffEpa": -0.085,
              "turnoverDiff": 2,
              "passDefEpa": 0.174,
              "rushDefEpa": 0.069,
              "pointsFor": 21,
              "pointsAgainst": 35
            },
            "ranks": {
              "passOffEpa": 23,
              "turnoverDiff": 3,
              "passDefEpa": 15,
              "rushDefEpa": 18,
              "pointsFor": 15,
              "pointsAgainst": 26
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
              "passOffEpa": 0.446,
              "turnoverDiff": 1,
              "passDefEpa": -0.091,
              "rushDefEpa": 0.102,
              "pointsFor": 38,
              "pointsAgainst": 21
            },
            "ranks": {
              "passOffEpa": 4,
              "turnoverDiff": 7,
              "passDefEpa": 5,
              "rushDefEpa": 19,
              "pointsFor": 2,
              "pointsAgainst": 13
            }
          },
          {
            "abbr": "NYG",
            "values": {
              "passOffEpa": 0.18,
              "turnoverDiff": 0,
              "passDefEpa": -0.014,
              "rushDefEpa": -0.121,
              "pointsFor": 27,
              "pointsAgainst": 21
            },
            "ranks": {
              "passOffEpa": 13,
              "turnoverDiff": 16,
              "passDefEpa": 7,
              "rushDefEpa": 10,
              "pointsFor": 10,
              "pointsAgainst": 14
            }
          },
          {
            "abbr": "PHI",
            "values": {
              "passOffEpa": -0.091,
              "turnoverDiff": -1,
              "passDefEpa": 0.446,
              "rushDefEpa": 0.235,
              "pointsFor": 21,
              "pointsAgainst": 38
            },
            "ranks": {
              "passOffEpa": 24,
              "turnoverDiff": 23,
              "passDefEpa": 25,
              "rushDefEpa": 25,
              "pointsFor": 16,
              "pointsAgainst": 27
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
              "passOffEpa": 0.377,
              "turnoverDiff": 1,
              "passDefEpa": 0.32,
              "rushDefEpa": -0.165,
              "pointsFor": 30,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 7,
              "turnoverDiff": 8,
              "passDefEpa": 21,
              "rushDefEpa": 8,
              "pointsFor": 6,
              "pointsAgainst": 17
            }
          },
          {
            "abbr": "DET",
            "values": {
              "passOffEpa": 0.279,
              "turnoverDiff": -1,
              "passDefEpa": 0.151,
              "rushDefEpa": -0.238,
              "pointsFor": 20,
              "pointsAgainst": 17
            },
            "ranks": {
              "passOffEpa": 9,
              "turnoverDiff": 24,
              "passDefEpa": 13,
              "rushDefEpa": 5,
              "pointsFor": 17,
              "pointsAgainst": 9
            }
          },
          {
            "abbr": "GB",
            "values": {
              "passOffEpa": 0.151,
              "turnoverDiff": 1,
              "passDefEpa": 0.279,
              "rushDefEpa": -0.471,
              "pointsFor": 17,
              "pointsAgainst": 20
            },
            "ranks": {
              "passOffEpa": 16,
              "turnoverDiff": 9,
              "passDefEpa": 20,
              "rushDefEpa": 1,
              "pointsFor": 20,
              "pointsAgainst": 11
            }
          },
          {
            "abbr": "MIN",
            "values": {
              "passOffEpa": -0.003,
              "turnoverDiff": 1,
              "passDefEpa": -0.299,
              "rushDefEpa": 0.035,
              "pointsFor": 16,
              "pointsAgainst": 10
            },
            "ranks": {
              "passOffEpa": 21,
              "turnoverDiff": 10,
              "passDefEpa": 2,
              "rushDefEpa": 15,
              "pointsFor": 22,
              "pointsAgainst": 3
            }
          },
          {
            "abbr": "ATL",
            "values": {
              "passOffEpa": 0.27,
              "turnoverDiff": 4,
              "passDefEpa": 0.047,
              "rushDefEpa": 0.113,
              "pointsFor": 29,
              "pointsAgainst": 20
            },
            "ranks": {
              "passOffEpa": 10,
              "turnoverDiff": 1,
              "passDefEpa": 9,
              "rushDefEpa": 21,
              "pointsFor": 7,
              "pointsAgainst": 12
            }
          },
          {
            "abbr": "CAR",
            "values": {
              "passOffEpa": -0.501,
              "turnoverDiff": -4,
              "passDefEpa": 0.481,
              "rushDefEpa": 0.143,
              "pointsFor": 13,
              "pointsAgainst": 43
            },
            "ranks": {
              "passOffEpa": 28,
              "turnoverDiff": 27,
              "passDefEpa": 26,
              "rushDefEpa": 23,
              "pointsFor": 25,
              "pointsAgainst": 28
            }
          },
          {
            "abbr": "NO",
            "values": {
              "passOffEpa": 0.264,
              "turnoverDiff": -1,
              "passDefEpa": 0.063,
              "rushDefEpa": 0.043,
              "pointsFor": 10,
              "pointsAgainst": 16
            },
            "ranks": {
              "passOffEpa": 11,
              "turnoverDiff": 25,
              "passDefEpa": 10,
              "rushDefEpa": 16,
              "pointsFor": 27,
              "pointsAgainst": 8
            }
          },
          {
            "abbr": "TB",
            "values": {
              "passOffEpa": 0.481,
              "turnoverDiff": 4,
              "passDefEpa": -0.501,
              "rushDefEpa": 0.198,
              "pointsFor": 43,
              "pointsAgainst": 13
            },
            "ranks": {
              "passOffEpa": 3,
              "turnoverDiff": 2,
              "passDefEpa": 1,
              "rushDefEpa": 24,
              "pointsFor": 1,
              "pointsAgainst": 5
            }
          },
          {
            "abbr": "ARI",
            "values": {
              "passOffEpa": -0.153,
              "turnoverDiff": 0,
              "passDefEpa": 0.151,
              "rushDefEpa": 0.245,
              "pointsFor": 16,
              "pointsAgainst": 30
            },
            "ranks": {
              "passOffEpa": 25,
              "turnoverDiff": 17,
              "passDefEpa": 14,
              "rushDefEpa": 26,
              "pointsFor": 23,
              "pointsAgainst": 24
            }
          },
          {
            "abbr": "LAR",
            "values": {
              "passOffEpa": 0.174,
              "turnoverDiff": -2,
              "passDefEpa": -0.085,
              "rushDefEpa": -0.396,
              "pointsFor": 35,
              "pointsAgainst": 21
            },
            "ranks": {
              "passOffEpa": 14,
              "turnoverDiff": 26,
              "passDefEpa": 6,
              "rushDefEpa": 3,
              "pointsFor": 4,
              "pointsAgainst": 15
            }
          },
          {
            "abbr": "SF",
            "values": {
              "passOffEpa": 0.047,
              "turnoverDiff": -4,
              "passDefEpa": 0.27,
              "rushDefEpa": -0.216,
              "pointsFor": 20,
              "pointsAgainst": 29
            },
            "ranks": {
              "passOffEpa": 20,
              "turnoverDiff": 28,
              "passDefEpa": 19,
              "rushDefEpa": 7,
              "pointsFor": 18,
              "pointsAgainst": 22
            }
          },
          {
            "abbr": "SEA",
            "values": {
              "passOffEpa": 0.434,
              "turnoverDiff": 0,
              "passDefEpa": -0.178,
              "rushDefEpa": 0.05,
              "pointsFor": 20,
              "pointsAgainst": 3
            },
            "ranks": {
              "passOffEpa": 5,
              "turnoverDiff": 18,
              "passDefEpa": 3,
              "rushDefEpa": 17,
              "pointsFor": 19,
              "pointsAgainst": 1
            }
          }
        ]
      }
    }
  }
};
