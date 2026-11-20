// ============================================================
//  NFL_POWER_SCORE — "Bootleg Power Score" Spinnennetz (nflverse)
// ============================================================
//  AUTO-GENERIERT von scripts/sync-nfl-power-score.js über die GitHub
//  Action ".github/workflows/sync-nfl-power-score.yml". Nicht von Hand
//  editieren — Änderungen werden beim nächsten Sync überschrieben.
//  Zuletzt synchronisiert: 2026-11-20T01:44:59.370Z
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
              "passOffEpa": 0.354,
              "turnoverDiff": 2,
              "passDefEpa": 0.061,
              "rushDefEpa": 0.094,
              "pointsFor": 36,
              "pointsAgainst": 31
            },
            "ranks": {
              "passOffEpa": 4,
              "turnoverDiff": 3,
              "passDefEpa": 17,
              "rushDefEpa": 27,
              "pointsFor": 5,
              "pointsAgainst": 23
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "MIA",
            "values": {
              "passOffEpa": -0.116,
              "turnoverDiff": 0,
              "passDefEpa": 0.036,
              "rushDefEpa": -0.112,
              "pointsFor": 13,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 23,
              "turnoverDiff": 14,
              "passDefEpa": 16,
              "rushDefEpa": 4,
              "pointsFor": 25,
              "pointsAgainst": 18
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "NE",
            "values": {
              "passOffEpa": -0.109,
              "turnoverDiff": -3,
              "passDefEpa": 0.123,
              "rushDefEpa": -0.041,
              "pointsFor": 10,
              "pointsAgainst": 13
            },
            "ranks": {
              "passOffEpa": 22,
              "turnoverDiff": 31,
              "passDefEpa": 21,
              "rushDefEpa": 15,
              "pointsFor": 28,
              "pointsAgainst": 6
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "NYJ",
            "values": {
              "passOffEpa": 0.316,
              "turnoverDiff": 1,
              "passDefEpa": -0.163,
              "rushDefEpa": 0.082,
              "pointsFor": 23,
              "pointsAgainst": 10
            },
            "ranks": {
              "passOffEpa": 7,
              "turnoverDiff": 8,
              "passDefEpa": 5,
              "rushDefEpa": 26,
              "pointsFor": 18,
              "pointsAgainst": 2
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "BAL",
            "values": {
              "passOffEpa": 0.341,
              "turnoverDiff": 1,
              "passDefEpa": -0.219,
              "rushDefEpa": 0.116,
              "pointsFor": 41,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 5,
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
              "passOffEpa": -0.053,
              "turnoverDiff": 3,
              "passDefEpa": -0.145,
              "rushDefEpa": -0.043,
              "pointsFor": 33,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 20,
              "turnoverDiff": 1,
              "passDefEpa": 7,
              "rushDefEpa": 14,
              "pointsFor": 7,
              "pointsAgainst": 19
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "CLE",
            "values": {
              "passOffEpa": -0.152,
              "turnoverDiff": -2,
              "passDefEpa": 0.671,
              "rushDefEpa": -0.047,
              "pointsFor": 10,
              "pointsAgainst": 34
            },
            "ranks": {
              "passOffEpa": 27,
              "turnoverDiff": 26,
              "passDefEpa": 32,
              "rushDefEpa": 13,
              "pointsFor": 29,
              "pointsAgainst": 27
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "PIT",
            "values": {
              "passOffEpa": -0.18,
              "turnoverDiff": 1,
              "passDefEpa": -0.482,
              "rushDefEpa": -0.096,
              "pointsFor": 20,
              "pointsAgainst": 13
            },
            "ranks": {
              "passOffEpa": 29,
              "turnoverDiff": 10,
              "passDefEpa": 1,
              "rushDefEpa": 7,
              "pointsFor": 22,
              "pointsAgainst": 7
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "HOU",
            "values": {
              "passOffEpa": 0.061,
              "turnoverDiff": -2,
              "passDefEpa": 0.354,
              "rushDefEpa": -0.086,
              "pointsFor": 31,
              "pointsAgainst": 36
            },
            "ranks": {
              "passOffEpa": 16,
              "turnoverDiff": 27,
              "passDefEpa": 29,
              "rushDefEpa": 9,
              "pointsFor": 8,
              "pointsAgainst": 28
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "IND",
            "values": {
              "passOffEpa": -0.219,
              "turnoverDiff": -1,
              "passDefEpa": 0.341,
              "rushDefEpa": 0.168,
              "pointsFor": 23,
              "pointsAgainst": 41
            },
            "ranks": {
              "passOffEpa": 30,
              "turnoverDiff": 20,
              "passDefEpa": 28,
              "rushDefEpa": 30,
              "pointsFor": 19,
              "pointsAgainst": 31
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "JAX",
            "values": {
              "passOffEpa": 0.671,
              "turnoverDiff": 2,
              "passDefEpa": -0.152,
              "rushDefEpa": 0.041,
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
              "passOffEpa": -0.163,
              "turnoverDiff": -1,
              "passDefEpa": 0.316,
              "rushDefEpa": -0.035,
              "pointsFor": 10,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 28,
              "turnoverDiff": 21,
              "passDefEpa": 26,
              "rushDefEpa": 16,
              "pointsFor": 30,
              "pointsAgainst": 15
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "DEN",
            "values": {
              "passOffEpa": -0.353,
              "turnoverDiff": -1,
              "passDefEpa": -0.045,
              "rushDefEpa": 0.188,
              "pointsFor": 10,
              "pointsAgainst": 31
            },
            "ranks": {
              "passOffEpa": 31,
              "turnoverDiff": 22,
              "passDefEpa": 14,
              "rushDefEpa": 31,
              "pointsFor": 31,
              "pointsAgainst": 24
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "KC",
            "values": {
              "passOffEpa": -0.045,
              "turnoverDiff": 1,
              "passDefEpa": -0.353,
              "rushDefEpa": -0.09,
              "pointsFor": 31,
              "pointsAgainst": 10
            },
            "ranks": {
              "passOffEpa": 19,
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
              "passOffEpa": 0.036,
              "turnoverDiff": 0,
              "passDefEpa": -0.116,
              "rushDefEpa": -0.108,
              "pointsFor": 27,
              "pointsAgainst": 13
            },
            "ranks": {
              "passOffEpa": 17,
              "turnoverDiff": 15,
              "passDefEpa": 10,
              "rushDefEpa": 5,
              "pointsFor": 13,
              "pointsAgainst": 8
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "LAC",
            "values": {
              "passOffEpa": -0.124,
              "turnoverDiff": -2,
              "passDefEpa": 0.165,
              "rushDefEpa": -0.027,
              "pointsFor": 14,
              "pointsAgainst": 26
            },
            "ranks": {
              "passOffEpa": 24,
              "turnoverDiff": 28,
              "passDefEpa": 24,
              "rushDefEpa": 17,
              "pointsFor": 24,
              "pointsAgainst": 17
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "DAL",
            "values": {
              "passOffEpa": 0.265,
              "turnoverDiff": 0,
              "passDefEpa": 0.634,
              "rushDefEpa": -0.024,
              "pointsFor": 20,
              "pointsAgainst": 28
            },
            "ranks": {
              "passOffEpa": 8,
              "turnoverDiff": 16,
              "passDefEpa": 31,
              "rushDefEpa": 18,
              "pointsFor": 23,
              "pointsAgainst": 21
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "NYG",
            "values": {
              "passOffEpa": 0.634,
              "turnoverDiff": 0,
              "passDefEpa": 0.265,
              "rushDefEpa": 0.048,
              "pointsFor": 28,
              "pointsAgainst": 20
            },
            "ranks": {
              "passOffEpa": 2,
              "turnoverDiff": 17,
              "passDefEpa": 25,
              "rushDefEpa": 23,
              "pointsFor": 12,
              "pointsAgainst": 10
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "PHI",
            "values": {
              "passOffEpa": 0.074,
              "turnoverDiff": 0,
              "passDefEpa": 0.115,
              "rushDefEpa": 0.01,
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
              "passOffEpa": 0.115,
              "turnoverDiff": 0,
              "passDefEpa": 0.074,
              "rushDefEpa": 0.068,
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
              "passOffEpa": 0.488,
              "turnoverDiff": 2,
              "passDefEpa": 0.33,
              "rushDefEpa": 0.06,
              "pointsFor": 59,
              "pointsAgainst": 37
            },
            "ranks": {
              "passOffEpa": 3,
              "turnoverDiff": 5,
              "passDefEpa": 27,
              "rushDefEpa": 24,
              "pointsFor": 1,
              "pointsAgainst": 29
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "DET",
            "values": {
              "passOffEpa": 0.136,
              "turnoverDiff": 2,
              "passDefEpa": 0.021,
              "rushDefEpa": -0.064,
              "pointsFor": 31,
              "pointsAgainst": 30
            },
            "ranks": {
              "passOffEpa": 10,
              "turnoverDiff": 6,
              "passDefEpa": 15,
              "rushDefEpa": 10,
              "pointsFor": 10,
              "pointsAgainst": 22
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "GB",
            "values": {
              "passOffEpa": -0.061,
              "turnoverDiff": -1,
              "passDefEpa": 0.063,
              "rushDefEpa": -0.05,
              "pointsFor": 22,
              "pointsAgainst": 39
            },
            "ranks": {
              "passOffEpa": 21,
              "turnoverDiff": 23,
              "passDefEpa": 18,
              "rushDefEpa": 12,
              "pointsFor": 21,
              "pointsAgainst": 30
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "MIN",
            "values": {
              "passOffEpa": 0.063,
              "turnoverDiff": 1,
              "passDefEpa": -0.061,
              "rushDefEpa": -0.332,
              "pointsFor": 39,
              "pointsAgainst": 22
            },
            "ranks": {
              "passOffEpa": 15,
              "turnoverDiff": 12,
              "passDefEpa": 12,
              "rushDefEpa": 1,
              "pointsFor": 3,
              "pointsAgainst": 13
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "ATL",
            "values": {
              "passOffEpa": -0.482,
              "turnoverDiff": -1,
              "passDefEpa": -0.18,
              "rushDefEpa": -0.239,
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
              "passOffEpa": 0.33,
              "turnoverDiff": -2,
              "passDefEpa": 0.488,
              "rushDefEpa": 0.36,
              "pointsFor": 37,
              "pointsAgainst": 59
            },
            "ranks": {
              "passOffEpa": 6,
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
              "passOffEpa": 0.021,
              "turnoverDiff": -2,
              "passDefEpa": 0.136,
              "rushDefEpa": -0.009,
              "pointsFor": 30,
              "pointsAgainst": 31
            },
            "ranks": {
              "passOffEpa": 18,
              "turnoverDiff": 30,
              "passDefEpa": 23,
              "rushDefEpa": 19,
              "pointsFor": 11,
              "pointsAgainst": 25
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "TB",
            "values": {
              "passOffEpa": -0.145,
              "turnoverDiff": -3,
              "passDefEpa": -0.053,
              "rushDefEpa": 0.003,
              "pointsFor": 27,
              "pointsAgainst": 33
            },
            "ranks": {
              "passOffEpa": 26,
              "turnoverDiff": 32,
              "passDefEpa": 13,
              "rushDefEpa": 20,
              "pointsFor": 14,
              "pointsAgainst": 26
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "ARI",
            "values": {
              "passOffEpa": 0.165,
              "turnoverDiff": 2,
              "passDefEpa": -0.124,
              "rushDefEpa": -0.261,
              "pointsFor": 26,
              "pointsAgainst": 14
            },
            "ranks": {
              "passOffEpa": 9,
              "turnoverDiff": 7,
              "passDefEpa": 9,
              "rushDefEpa": 2,
              "pointsFor": 16,
              "pointsAgainst": 9
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "LAR",
            "values": {
              "passOffEpa": -0.129,
              "turnoverDiff": -1,
              "passDefEpa": 0.123,
              "rushDefEpa": 0.159,
              "pointsFor": 7,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 25,
              "turnoverDiff": 25,
              "passDefEpa": 22,
              "rushDefEpa": 29,
              "pointsFor": 32,
              "pointsAgainst": 20
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "SF",
            "values": {
              "passOffEpa": 0.123,
              "turnoverDiff": 1,
              "passDefEpa": -0.129,
              "rushDefEpa": -0.105,
              "pointsFor": 27,
              "pointsAgainst": 7
            },
            "ranks": {
              "passOffEpa": 11,
              "turnoverDiff": 13,
              "passDefEpa": 8,
              "rushDefEpa": 6,
              "pointsFor": 15,
              "pointsAgainst": 1
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "SEA",
            "values": {
              "passOffEpa": 0.123,
              "turnoverDiff": 3,
              "passDefEpa": -0.109,
              "rushDefEpa": -0.059,
              "pointsFor": 13,
              "pointsAgainst": 10
            },
            "ranks": {
              "passOffEpa": 12,
              "turnoverDiff": 2,
              "passDefEpa": 11,
              "rushDefEpa": 11,
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
              "passOffEpa": 0.354,
              "turnoverDiff": 2,
              "passDefEpa": 0.061,
              "rushDefEpa": 0.094,
              "pointsFor": 36,
              "pointsAgainst": 31
            },
            "ranks": {
              "passOffEpa": 4,
              "turnoverDiff": 3,
              "passDefEpa": 17,
              "rushDefEpa": 27,
              "pointsFor": 5,
              "pointsAgainst": 23
            }
          },
          {
            "abbr": "MIA",
            "values": {
              "passOffEpa": -0.116,
              "turnoverDiff": 0,
              "passDefEpa": 0.036,
              "rushDefEpa": -0.112,
              "pointsFor": 13,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 23,
              "turnoverDiff": 14,
              "passDefEpa": 16,
              "rushDefEpa": 4,
              "pointsFor": 25,
              "pointsAgainst": 18
            }
          },
          {
            "abbr": "NE",
            "values": {
              "passOffEpa": -0.109,
              "turnoverDiff": -3,
              "passDefEpa": 0.123,
              "rushDefEpa": -0.041,
              "pointsFor": 10,
              "pointsAgainst": 13
            },
            "ranks": {
              "passOffEpa": 22,
              "turnoverDiff": 31,
              "passDefEpa": 21,
              "rushDefEpa": 15,
              "pointsFor": 28,
              "pointsAgainst": 6
            }
          },
          {
            "abbr": "NYJ",
            "values": {
              "passOffEpa": 0.316,
              "turnoverDiff": 1,
              "passDefEpa": -0.163,
              "rushDefEpa": 0.082,
              "pointsFor": 23,
              "pointsAgainst": 10
            },
            "ranks": {
              "passOffEpa": 7,
              "turnoverDiff": 8,
              "passDefEpa": 5,
              "rushDefEpa": 26,
              "pointsFor": 18,
              "pointsAgainst": 2
            }
          },
          {
            "abbr": "BAL",
            "values": {
              "passOffEpa": 0.341,
              "turnoverDiff": 1,
              "passDefEpa": -0.219,
              "rushDefEpa": 0.116,
              "pointsFor": 41,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 5,
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
              "passOffEpa": -0.053,
              "turnoverDiff": 3,
              "passDefEpa": -0.145,
              "rushDefEpa": -0.043,
              "pointsFor": 33,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 20,
              "turnoverDiff": 1,
              "passDefEpa": 7,
              "rushDefEpa": 14,
              "pointsFor": 7,
              "pointsAgainst": 19
            }
          },
          {
            "abbr": "CLE",
            "values": {
              "passOffEpa": -0.152,
              "turnoverDiff": -2,
              "passDefEpa": 0.671,
              "rushDefEpa": -0.047,
              "pointsFor": 10,
              "pointsAgainst": 34
            },
            "ranks": {
              "passOffEpa": 27,
              "turnoverDiff": 26,
              "passDefEpa": 32,
              "rushDefEpa": 13,
              "pointsFor": 29,
              "pointsAgainst": 27
            }
          },
          {
            "abbr": "PIT",
            "values": {
              "passOffEpa": -0.18,
              "turnoverDiff": 1,
              "passDefEpa": -0.482,
              "rushDefEpa": -0.096,
              "pointsFor": 20,
              "pointsAgainst": 13
            },
            "ranks": {
              "passOffEpa": 29,
              "turnoverDiff": 10,
              "passDefEpa": 1,
              "rushDefEpa": 7,
              "pointsFor": 22,
              "pointsAgainst": 7
            }
          },
          {
            "abbr": "HOU",
            "values": {
              "passOffEpa": 0.061,
              "turnoverDiff": -2,
              "passDefEpa": 0.354,
              "rushDefEpa": -0.086,
              "pointsFor": 31,
              "pointsAgainst": 36
            },
            "ranks": {
              "passOffEpa": 16,
              "turnoverDiff": 27,
              "passDefEpa": 29,
              "rushDefEpa": 9,
              "pointsFor": 8,
              "pointsAgainst": 28
            }
          },
          {
            "abbr": "IND",
            "values": {
              "passOffEpa": -0.219,
              "turnoverDiff": -1,
              "passDefEpa": 0.341,
              "rushDefEpa": 0.168,
              "pointsFor": 23,
              "pointsAgainst": 41
            },
            "ranks": {
              "passOffEpa": 30,
              "turnoverDiff": 20,
              "passDefEpa": 28,
              "rushDefEpa": 30,
              "pointsFor": 19,
              "pointsAgainst": 31
            }
          },
          {
            "abbr": "JAX",
            "values": {
              "passOffEpa": 0.671,
              "turnoverDiff": 2,
              "passDefEpa": -0.152,
              "rushDefEpa": 0.041,
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
              "passOffEpa": -0.163,
              "turnoverDiff": -1,
              "passDefEpa": 0.316,
              "rushDefEpa": -0.035,
              "pointsFor": 10,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 28,
              "turnoverDiff": 21,
              "passDefEpa": 26,
              "rushDefEpa": 16,
              "pointsFor": 30,
              "pointsAgainst": 15
            }
          },
          {
            "abbr": "DEN",
            "values": {
              "passOffEpa": -0.353,
              "turnoverDiff": -1,
              "passDefEpa": -0.045,
              "rushDefEpa": 0.188,
              "pointsFor": 10,
              "pointsAgainst": 31
            },
            "ranks": {
              "passOffEpa": 31,
              "turnoverDiff": 22,
              "passDefEpa": 14,
              "rushDefEpa": 31,
              "pointsFor": 31,
              "pointsAgainst": 24
            }
          },
          {
            "abbr": "KC",
            "values": {
              "passOffEpa": -0.045,
              "turnoverDiff": 1,
              "passDefEpa": -0.353,
              "rushDefEpa": -0.09,
              "pointsFor": 31,
              "pointsAgainst": 10
            },
            "ranks": {
              "passOffEpa": 19,
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
              "passOffEpa": 0.036,
              "turnoverDiff": 0,
              "passDefEpa": -0.116,
              "rushDefEpa": -0.108,
              "pointsFor": 27,
              "pointsAgainst": 13
            },
            "ranks": {
              "passOffEpa": 17,
              "turnoverDiff": 15,
              "passDefEpa": 10,
              "rushDefEpa": 5,
              "pointsFor": 13,
              "pointsAgainst": 8
            }
          },
          {
            "abbr": "LAC",
            "values": {
              "passOffEpa": -0.124,
              "turnoverDiff": -2,
              "passDefEpa": 0.165,
              "rushDefEpa": -0.027,
              "pointsFor": 14,
              "pointsAgainst": 26
            },
            "ranks": {
              "passOffEpa": 24,
              "turnoverDiff": 28,
              "passDefEpa": 24,
              "rushDefEpa": 17,
              "pointsFor": 24,
              "pointsAgainst": 17
            }
          },
          {
            "abbr": "DAL",
            "values": {
              "passOffEpa": 0.265,
              "turnoverDiff": 0,
              "passDefEpa": 0.634,
              "rushDefEpa": -0.024,
              "pointsFor": 20,
              "pointsAgainst": 28
            },
            "ranks": {
              "passOffEpa": 8,
              "turnoverDiff": 16,
              "passDefEpa": 31,
              "rushDefEpa": 18,
              "pointsFor": 23,
              "pointsAgainst": 21
            }
          },
          {
            "abbr": "NYG",
            "values": {
              "passOffEpa": 0.634,
              "turnoverDiff": 0,
              "passDefEpa": 0.265,
              "rushDefEpa": 0.048,
              "pointsFor": 28,
              "pointsAgainst": 20
            },
            "ranks": {
              "passOffEpa": 2,
              "turnoverDiff": 17,
              "passDefEpa": 25,
              "rushDefEpa": 23,
              "pointsFor": 12,
              "pointsAgainst": 10
            }
          },
          {
            "abbr": "PHI",
            "values": {
              "passOffEpa": 0.074,
              "turnoverDiff": 0,
              "passDefEpa": 0.115,
              "rushDefEpa": 0.01,
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
              "passOffEpa": 0.115,
              "turnoverDiff": 0,
              "passDefEpa": 0.074,
              "rushDefEpa": 0.068,
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
              "passOffEpa": 0.488,
              "turnoverDiff": 2,
              "passDefEpa": 0.33,
              "rushDefEpa": 0.06,
              "pointsFor": 59,
              "pointsAgainst": 37
            },
            "ranks": {
              "passOffEpa": 3,
              "turnoverDiff": 5,
              "passDefEpa": 27,
              "rushDefEpa": 24,
              "pointsFor": 1,
              "pointsAgainst": 29
            }
          },
          {
            "abbr": "DET",
            "values": {
              "passOffEpa": 0.136,
              "turnoverDiff": 2,
              "passDefEpa": 0.021,
              "rushDefEpa": -0.064,
              "pointsFor": 31,
              "pointsAgainst": 30
            },
            "ranks": {
              "passOffEpa": 10,
              "turnoverDiff": 6,
              "passDefEpa": 15,
              "rushDefEpa": 10,
              "pointsFor": 10,
              "pointsAgainst": 22
            }
          },
          {
            "abbr": "GB",
            "values": {
              "passOffEpa": -0.061,
              "turnoverDiff": -1,
              "passDefEpa": 0.063,
              "rushDefEpa": -0.05,
              "pointsFor": 22,
              "pointsAgainst": 39
            },
            "ranks": {
              "passOffEpa": 21,
              "turnoverDiff": 23,
              "passDefEpa": 18,
              "rushDefEpa": 12,
              "pointsFor": 21,
              "pointsAgainst": 30
            }
          },
          {
            "abbr": "MIN",
            "values": {
              "passOffEpa": 0.063,
              "turnoverDiff": 1,
              "passDefEpa": -0.061,
              "rushDefEpa": -0.332,
              "pointsFor": 39,
              "pointsAgainst": 22
            },
            "ranks": {
              "passOffEpa": 15,
              "turnoverDiff": 12,
              "passDefEpa": 12,
              "rushDefEpa": 1,
              "pointsFor": 3,
              "pointsAgainst": 13
            }
          },
          {
            "abbr": "ATL",
            "values": {
              "passOffEpa": -0.482,
              "turnoverDiff": -1,
              "passDefEpa": -0.18,
              "rushDefEpa": -0.239,
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
              "passOffEpa": 0.33,
              "turnoverDiff": -2,
              "passDefEpa": 0.488,
              "rushDefEpa": 0.36,
              "pointsFor": 37,
              "pointsAgainst": 59
            },
            "ranks": {
              "passOffEpa": 6,
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
              "passOffEpa": 0.021,
              "turnoverDiff": -2,
              "passDefEpa": 0.136,
              "rushDefEpa": -0.009,
              "pointsFor": 30,
              "pointsAgainst": 31
            },
            "ranks": {
              "passOffEpa": 18,
              "turnoverDiff": 30,
              "passDefEpa": 23,
              "rushDefEpa": 19,
              "pointsFor": 11,
              "pointsAgainst": 25
            }
          },
          {
            "abbr": "TB",
            "values": {
              "passOffEpa": -0.145,
              "turnoverDiff": -3,
              "passDefEpa": -0.053,
              "rushDefEpa": 0.003,
              "pointsFor": 27,
              "pointsAgainst": 33
            },
            "ranks": {
              "passOffEpa": 26,
              "turnoverDiff": 32,
              "passDefEpa": 13,
              "rushDefEpa": 20,
              "pointsFor": 14,
              "pointsAgainst": 26
            }
          },
          {
            "abbr": "ARI",
            "values": {
              "passOffEpa": 0.165,
              "turnoverDiff": 2,
              "passDefEpa": -0.124,
              "rushDefEpa": -0.261,
              "pointsFor": 26,
              "pointsAgainst": 14
            },
            "ranks": {
              "passOffEpa": 9,
              "turnoverDiff": 7,
              "passDefEpa": 9,
              "rushDefEpa": 2,
              "pointsFor": 16,
              "pointsAgainst": 9
            }
          },
          {
            "abbr": "LAR",
            "values": {
              "passOffEpa": -0.129,
              "turnoverDiff": -1,
              "passDefEpa": 0.123,
              "rushDefEpa": 0.159,
              "pointsFor": 7,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 25,
              "turnoverDiff": 25,
              "passDefEpa": 22,
              "rushDefEpa": 29,
              "pointsFor": 32,
              "pointsAgainst": 20
            }
          },
          {
            "abbr": "SF",
            "values": {
              "passOffEpa": 0.123,
              "turnoverDiff": 1,
              "passDefEpa": -0.129,
              "rushDefEpa": -0.105,
              "pointsFor": 27,
              "pointsAgainst": 7
            },
            "ranks": {
              "passOffEpa": 11,
              "turnoverDiff": 13,
              "passDefEpa": 8,
              "rushDefEpa": 6,
              "pointsFor": 15,
              "pointsAgainst": 1
            }
          },
          {
            "abbr": "SEA",
            "values": {
              "passOffEpa": 0.123,
              "turnoverDiff": 3,
              "passDefEpa": -0.109,
              "rushDefEpa": -0.059,
              "pointsFor": 13,
              "pointsAgainst": 10
            },
            "ranks": {
              "passOffEpa": 12,
              "turnoverDiff": 2,
              "passDefEpa": 11,
              "rushDefEpa": 11,
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
              "passOffEpa": 0.37,
              "turnoverDiff": 1,
              "passDefEpa": 0.226,
              "rushDefEpa": -0.009,
              "pointsFor": 38.5,
              "pointsAgainst": 31
            },
            "ranks": {
              "passOffEpa": 2,
              "turnoverDiff": 5,
              "passDefEpa": 26,
              "rushDefEpa": 21,
              "pointsFor": 1,
              "pointsAgainst": 28
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "MIA",
            "values": {
              "passOffEpa": -0.002,
              "turnoverDiff": 0,
              "passDefEpa": 0.402,
              "rushDefEpa": -0.085,
              "pointsFor": 13,
              "pointsAgainst": 31
            },
            "ranks": {
              "passOffEpa": 21,
              "turnoverDiff": 17,
              "passDefEpa": 32,
              "rushDefEpa": 14,
              "pointsFor": 30,
              "pointsAgainst": 29
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "NE",
            "values": {
              "passOffEpa": -0.091,
              "turnoverDiff": -1.5,
              "passDefEpa": -0.199,
              "rushDefEpa": -0.055,
              "pointsFor": 15,
              "pointsAgainst": 8
            },
            "ranks": {
              "passOffEpa": 28,
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
              "passOffEpa": 0.167,
              "turnoverDiff": 1,
              "passDefEpa": -0.11,
              "rushDefEpa": -0.161,
              "pointsFor": 20,
              "pointsAgainst": 15
            },
            "ranks": {
              "passOffEpa": 11,
              "turnoverDiff": 6,
              "passDefEpa": 6,
              "rushDefEpa": 8,
              "pointsFor": 20,
              "pointsAgainst": 6
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "BAL",
            "values": {
              "passOffEpa": 0.204,
              "turnoverDiff": 0,
              "passDefEpa": 0.033,
              "rushDefEpa": 0.029,
              "pointsFor": 29,
              "pointsAgainst": 23.5
            },
            "ranks": {
              "passOffEpa": 9,
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
              "passOffEpa": -0.027,
              "turnoverDiff": 1.5,
              "passDefEpa": -0.132,
              "rushDefEpa": -0.231,
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
              "passOffEpa": 0.069,
              "turnoverDiff": -0.5,
              "passDefEpa": 0.083,
              "rushDefEpa": 0.051,
              "pointsFor": 16.5,
              "pointsAgainst": 26.5
            },
            "ranks": {
              "passOffEpa": 18,
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
              "passOffEpa": -0.285,
              "turnoverDiff": 0.5,
              "passDefEpa": -0.277,
              "rushDefEpa": -0.028,
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
              "passOffEpa": -0.05,
              "turnoverDiff": -1,
              "passDefEpa": 0.163,
              "rushDefEpa": -0.132,
              "pointsFor": 18.5,
              "pointsAgainst": 28
            },
            "ranks": {
              "passOffEpa": 24,
              "turnoverDiff": 24,
              "passDefEpa": 22,
              "rushDefEpa": 11,
              "pointsFor": 21,
              "pointsAgainst": 24
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "IND",
            "values": {
              "passOffEpa": -0.032,
              "turnoverDiff": -1,
              "passDefEpa": 0.271,
              "rushDefEpa": 0.147,
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
              "passOffEpa": 0.24,
              "turnoverDiff": 1,
              "passDefEpa": 0.054,
              "rushDefEpa": -0.079,
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
              "passOffEpa": -0.1,
              "turnoverDiff": 0.5,
              "passDefEpa": 0.256,
              "rushDefEpa": -0.085,
              "pointsFor": 15,
              "pointsAgainst": 23.5
            },
            "ranks": {
              "passOffEpa": 29,
              "turnoverDiff": 13,
              "passDefEpa": 28,
              "rushDefEpa": 15,
              "pointsFor": 27,
              "pointsAgainst": 17
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "DEN",
            "values": {
              "passOffEpa": -0.065,
              "turnoverDiff": -0.5,
              "passDefEpa": -0.07,
              "rushDefEpa": 0.133,
              "pointsFor": 15,
              "pointsAgainst": 22
            },
            "ranks": {
              "passOffEpa": 27,
              "turnoverDiff": 21,
              "passDefEpa": 10,
              "rushDefEpa": 31,
              "pointsFor": 28,
              "pointsAgainst": 13
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "KC",
            "values": {
              "passOffEpa": 0.129,
              "turnoverDiff": 1,
              "passDefEpa": -0.097,
              "rushDefEpa": 0.035,
              "pointsFor": 32,
              "pointsAgainst": 20
            },
            "ranks": {
              "passOffEpa": 13,
              "turnoverDiff": 8,
              "passDefEpa": 7,
              "rushDefEpa": 25,
              "pointsFor": 3,
              "pointsAgainst": 11
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "LV",
            "values": {
              "passOffEpa": 0.122,
              "turnoverDiff": 1,
              "passDefEpa": -0.06,
              "rushDefEpa": -0.274,
              "pointsFor": 26.5,
              "pointsAgainst": 13.5
            },
            "ranks": {
              "passOffEpa": 14,
              "turnoverDiff": 9,
              "passDefEpa": 11,
              "rushDefEpa": 1,
              "pointsFor": 12,
              "pointsAgainst": 5
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "LAC",
            "values": {
              "passOffEpa": -0.063,
              "turnoverDiff": -2,
              "passDefEpa": 0.182,
              "rushDefEpa": -0.185,
              "pointsFor": 14,
              "pointsAgainst": 26
            },
            "ranks": {
              "passOffEpa": 26,
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
              "passOffEpa": 0.316,
              "turnoverDiff": 0.5,
              "passDefEpa": 0.351,
              "rushDefEpa": 0.029,
              "pointsFor": 28.5,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 3,
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
              "passOffEpa": 0.092,
              "turnoverDiff": 0.5,
              "passDefEpa": 0.384,
              "rushDefEpa": -0.101,
              "pointsFor": 17,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 17,
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
              "passOffEpa": 0.16,
              "turnoverDiff": -1,
              "passDefEpa": 0.07,
              "rushDefEpa": 0.071,
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
              "passOffEpa": 0.107,
              "turnoverDiff": -0.5,
              "passDefEpa": 0.233,
              "rushDefEpa": -0.017,
              "pointsFor": 21,
              "pointsAgainst": 30.5
            },
            "ranks": {
              "passOffEpa": 16,
              "turnoverDiff": 22,
              "passDefEpa": 27,
              "rushDefEpa": 20,
              "pointsFor": 18,
              "pointsAgainst": 27
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "CHI",
            "values": {
              "passOffEpa": 0.17,
              "turnoverDiff": 0,
              "passDefEpa": 0.211,
              "rushDefEpa": -0.045,
              "pointsFor": 31,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 10,
              "turnoverDiff": 19,
              "passDefEpa": 25,
              "rushDefEpa": 18,
              "pointsFor": 4,
              "pointsAgainst": 15
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "DET",
            "values": {
              "passOffEpa": 0.264,
              "turnoverDiff": 1,
              "passDefEpa": 0.149,
              "rushDefEpa": 0.111,
              "pointsFor": 31,
              "pointsAgainst": 35.5
            },
            "ranks": {
              "passOffEpa": 6,
              "turnoverDiff": 10,
              "passDefEpa": 21,
              "rushDefEpa": 29,
              "pointsFor": 5,
              "pointsAgainst": 31
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "GB",
            "values": {
              "passOffEpa": -0.057,
              "turnoverDiff": -1,
              "passDefEpa": 0.078,
              "rushDefEpa": -0.186,
              "pointsFor": 21,
              "pointsAgainst": 28
            },
            "ranks": {
              "passOffEpa": 25,
              "turnoverDiff": 27,
              "passDefEpa": 17,
              "rushDefEpa": 5,
              "pointsFor": 19,
              "pointsAgainst": 25
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "MIN",
            "values": {
              "passOffEpa": 0.036,
              "turnoverDiff": 1.5,
              "passDefEpa": -0.071,
              "rushDefEpa": -0.215,
              "pointsFor": 24,
              "pointsAgainst": 12.5
            },
            "ranks": {
              "passOffEpa": 19,
              "turnoverDiff": 2,
              "passDefEpa": 9,
              "rushDefEpa": 4,
              "pointsFor": 14,
              "pointsAgainst": 4
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "ATL",
            "values": {
              "passOffEpa": -0.542,
              "turnoverDiff": -3,
              "passDefEpa": 0.028,
              "rushDefEpa": -0.216,
              "pointsFor": 8,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 32,
              "turnoverDiff": 32,
              "passDefEpa": 13,
              "rushDefEpa": 3,
              "pointsFor": 32,
              "pointsAgainst": 23
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "CAR",
            "values": {
              "passOffEpa": 0.298,
              "turnoverDiff": 1.5,
              "passDefEpa": -0.082,
              "rushDefEpa": 0.129,
              "pointsFor": 35.5,
              "pointsAgainst": 31
            },
            "ranks": {
              "passOffEpa": 5,
              "turnoverDiff": 3,
              "passDefEpa": 8,
              "rushDefEpa": 30,
              "pointsFor": 2,
              "pointsAgainst": 30
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "NO",
            "values": {
              "passOffEpa": 0.11,
              "turnoverDiff": -0.5,
              "passDefEpa": 0.117,
              "rushDefEpa": 0.047,
              "pointsFor": 27,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 15,
              "turnoverDiff": 23,
              "passDefEpa": 20,
              "rushDefEpa": 26,
              "pointsFor": 9,
              "pointsAgainst": 20
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "TB",
            "values": {
              "passOffEpa": -0.227,
              "turnoverDiff": -2,
              "passDefEpa": 0.092,
              "rushDefEpa": -0.159,
              "pointsFor": 23,
              "pointsAgainst": 28
            },
            "ranks": {
              "passOffEpa": 30,
              "turnoverDiff": 31,
              "passDefEpa": 19,
              "rushDefEpa": 10,
              "pointsFor": 16,
              "pointsAgainst": 26
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "ARI",
            "values": {
              "passOffEpa": 0.008,
              "turnoverDiff": 1,
              "passDefEpa": 0.169,
              "rushDefEpa": -0.177,
              "pointsFor": 16.5,
              "pointsAgainst": 22.5
            },
            "ranks": {
              "passOffEpa": 20,
              "turnoverDiff": 11,
              "passDefEpa": 23,
              "rushDefEpa": 7,
              "pointsFor": 25,
              "pointsAgainst": 14
            },
            "gamesPlayed": 2
          },
          {
            "abbr": "LAR",
            "values": {
              "passOffEpa": 0.213,
              "turnoverDiff": -1,
              "passDefEpa": -0.14,
              "rushDefEpa": 0.001,
              "pointsFor": 17.5,
              "pointsAgainst": 16.5
            },
            "ranks": {
              "passOffEpa": 8,
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
              "passOffEpa": 0.428,
              "turnoverDiff": 0.5,
              "passDefEpa": -0.001,
              "rushDefEpa": -0.106,
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
              "passOffEpa": 0.313,
              "turnoverDiff": 1.5,
              "passDefEpa": -0.146,
              "rushDefEpa": -0.16,
              "pointsFor": 22,
              "pointsAgainst": 8.5
            },
            "ranks": {
              "passOffEpa": 4,
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
              "passOffEpa": 0.385,
              "turnoverDiff": 0,
              "passDefEpa": 0.387,
              "rushDefEpa": -0.173,
              "pointsFor": 41,
              "pointsAgainst": 31
            },
            "ranks": {
              "passOffEpa": 5,
              "turnoverDiff": 11,
              "passDefEpa": 29,
              "rushDefEpa": 11,
              "pointsFor": 1,
              "pointsAgainst": 26
            }
          },
          {
            "abbr": "MIA",
            "values": {
              "passOffEpa": 0.133,
              "turnoverDiff": 0,
              "passDefEpa": 0.9,
              "rushDefEpa": -0.048,
              "pointsFor": 13,
              "pointsAgainst": 35
            },
            "ranks": {
              "passOffEpa": 15,
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
              "passOffEpa": -0.064,
              "turnoverDiff": 0,
              "passDefEpa": -0.389,
              "rushDefEpa": -0.069,
              "pointsFor": 20,
              "pointsAgainst": 3
            },
            "ranks": {
              "passOffEpa": 24,
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
              "passOffEpa": 0.087,
              "turnoverDiff": 1,
              "passDefEpa": -0.053,
              "rushDefEpa": -0.35,
              "pointsFor": 17,
              "pointsAgainst": 20
            },
            "ranks": {
              "passOffEpa": 18,
              "turnoverDiff": 5,
              "passDefEpa": 10,
              "rushDefEpa": 5,
              "pointsFor": 21,
              "pointsAgainst": 14
            }
          },
          {
            "abbr": "BAL",
            "values": {
              "passOffEpa": 0.095,
              "turnoverDiff": -1,
              "passDefEpa": 0.257,
              "rushDefEpa": -0.036,
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
              "passOffEpa": -0.001,
              "turnoverDiff": 0,
              "passDefEpa": -0.126,
              "rushDefEpa": -0.441,
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
              "passOffEpa": 0.256,
              "turnoverDiff": 1,
              "passDefEpa": -0.298,
              "rushDefEpa": 0.176,
              "pointsFor": 23,
              "pointsAgainst": 19
            },
            "ranks": {
              "passOffEpa": 9,
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
              "passOffEpa": -0.389,
              "turnoverDiff": 0,
              "passDefEpa": -0.064,
              "rushDefEpa": 0.048,
              "pointsFor": 3,
              "pointsAgainst": 20
            },
            "ranks": {
              "passOffEpa": 30,
              "turnoverDiff": 15,
              "passDefEpa": 9,
              "rushDefEpa": 25,
              "pointsFor": 30,
              "pointsAgainst": 15
            }
          },
          {
            "abbr": "HOU",
            "values": {
              "passOffEpa": -0.126,
              "turnoverDiff": 0,
              "passDefEpa": -0.001,
              "rushDefEpa": -0.173,
              "pointsFor": 6,
              "pointsAgainst": 20
            },
            "ranks": {
              "passOffEpa": 27,
              "turnoverDiff": 16,
              "passDefEpa": 11,
              "rushDefEpa": 12,
              "pointsFor": 28,
              "pointsAgainst": 16
            }
          },
          {
            "abbr": "IND",
            "values": {
              "passOffEpa": 0.168,
              "turnoverDiff": -1,
              "passDefEpa": 0.232,
              "rushDefEpa": 0.119,
              "pointsFor": 30,
              "pointsAgainst": 33
            },
            "ranks": {
              "passOffEpa": 14,
              "turnoverDiff": 24,
              "passDefEpa": 22,
              "rushDefEpa": 28,
              "pointsFor": 8,
              "pointsAgainst": 28
            }
          },
          {
            "abbr": "JAX",
            "values": {
              "passOffEpa": -0.094,
              "turnoverDiff": 0,
              "passDefEpa": 0.233,
              "rushDefEpa": -0.173,
              "pointsFor": 13,
              "pointsAgainst": 20
            },
            "ranks": {
              "passOffEpa": 26,
              "turnoverDiff": 17,
              "passDefEpa": 23,
              "rushDefEpa": 13,
              "pointsFor": 25,
              "pointsAgainst": 17
            }
          },
          {
            "abbr": "TEN",
            "values": {
              "passOffEpa": 0,
              "turnoverDiff": 2,
              "passDefEpa": 0.22,
              "rushDefEpa": -0.146,
              "pointsFor": 20,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 20,
              "turnoverDiff": 2,
              "passDefEpa": 21,
              "rushDefEpa": 15,
              "pointsFor": 16,
              "pointsAgainst": 22
            }
          },
          {
            "abbr": "DEN",
            "values": {
              "passOffEpa": 0.233,
              "turnoverDiff": 0,
              "passDefEpa": -0.094,
              "rushDefEpa": 0.047,
              "pointsFor": 20,
              "pointsAgainst": 13
            },
            "ranks": {
              "passOffEpa": 10,
              "turnoverDiff": 18,
              "passDefEpa": 7,
              "rushDefEpa": 24,
              "pointsFor": 17,
              "pointsAgainst": 8
            }
          },
          {
            "abbr": "KC",
            "values": {
              "passOffEpa": 0.232,
              "turnoverDiff": 1,
              "passDefEpa": 0.168,
              "rushDefEpa": 0.094,
              "pointsFor": 33,
              "pointsAgainst": 30
            },
            "ranks": {
              "passOffEpa": 11,
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
              "passOffEpa": 0.204,
              "turnoverDiff": 2,
              "passDefEpa": -0.001,
              "rushDefEpa": -0.368,
              "pointsFor": 26,
              "pointsAgainst": 14
            },
            "ranks": {
              "passOffEpa": 13,
              "turnoverDiff": 3,
              "passDefEpa": 12,
              "rushDefEpa": 3,
              "pointsFor": 10,
              "pointsAgainst": 10
            }
          },
          {
            "abbr": "LAC",
            "values": {
              "passOffEpa": -0.001,
              "turnoverDiff": -2,
              "passDefEpa": 0.204,
              "rushDefEpa": -0.369,
              "pointsFor": 14,
              "pointsAgainst": 26
            },
            "ranks": {
              "passOffEpa": 22,
              "turnoverDiff": 29,
              "passDefEpa": 20,
              "rushDefEpa": 2,
              "pointsFor": 23,
              "pointsAgainst": 23
            }
          },
          {
            "abbr": "DAL",
            "values": {
              "passOffEpa": 0.369,
              "turnoverDiff": 1,
              "passDefEpa": 0.099,
              "rushDefEpa": 0.09,
              "pointsFor": 37,
              "pointsAgainst": 20
            },
            "ranks": {
              "passOffEpa": 6,
              "turnoverDiff": 8,
              "passDefEpa": 17,
              "rushDefEpa": 26,
              "pointsFor": 2,
              "pointsAgainst": 18
            }
          },
          {
            "abbr": "NYG",
            "values": {
              "passOffEpa": -0.402,
              "turnoverDiff": 1,
              "passDefEpa": 0.512,
              "rushDefEpa": -0.197,
              "pointsFor": 6,
              "pointsAgainst": 28
            },
            "ranks": {
              "passOffEpa": 31,
              "turnoverDiff": 9,
              "passDefEpa": 31,
              "rushDefEpa": 9,
              "pointsFor": 29,
              "pointsAgainst": 24
            }
          },
          {
            "abbr": "PHI",
            "values": {
              "passOffEpa": 0.22,
              "turnoverDiff": -2,
              "passDefEpa": 0,
              "rushDefEpa": 0.139,
              "pointsFor": 24,
              "pointsAgainst": 20
            },
            "ranks": {
              "passOffEpa": 12,
              "turnoverDiff": 30,
              "passDefEpa": 13,
              "rushDefEpa": 30,
              "pointsFor": 11,
              "pointsAgainst": 19
            }
          },
          {
            "abbr": "WSH",
            "values": {
              "passOffEpa": 0.099,
              "turnoverDiff": -1,
              "passDefEpa": 0.369,
              "rushDefEpa": -0.118,
              "pointsFor": 20,
              "pointsAgainst": 37
            },
            "ranks": {
              "passOffEpa": 16,
              "turnoverDiff": 25,
              "passDefEpa": 27,
              "rushDefEpa": 19,
              "pointsFor": 18,
              "pointsAgainst": 31
            }
          },
          {
            "abbr": "CHI",
            "values": {
              "passOffEpa": -0.083,
              "turnoverDiff": -2,
              "passDefEpa": 0.005,
              "rushDefEpa": -0.127,
              "pointsFor": 3,
              "pointsAgainst": 9
            },
            "ranks": {
              "passOffEpa": 25,
              "turnoverDiff": 31,
              "passDefEpa": 14,
              "rushDefEpa": 18,
              "pointsFor": 31,
              "pointsAgainst": 7
            }
          },
          {
            "abbr": "DET",
            "values": {
              "passOffEpa": 0.387,
              "turnoverDiff": 0,
              "passDefEpa": 0.385,
              "rushDefEpa": 0.232,
              "pointsFor": 31,
              "pointsAgainst": 41
            },
            "ranks": {
              "passOffEpa": 4,
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
              "passOffEpa": -0.053,
              "turnoverDiff": -1,
              "passDefEpa": 0.087,
              "rushDefEpa": -0.356,
              "pointsFor": 20,
              "pointsAgainst": 17
            },
            "ranks": {
              "passOffEpa": 23,
              "turnoverDiff": 26,
              "passDefEpa": 15,
              "rushDefEpa": 4,
              "pointsFor": 19,
              "pointsAgainst": 11
            }
          },
          {
            "abbr": "MIN",
            "values": {
              "passOffEpa": 0.005,
              "turnoverDiff": 2,
              "passDefEpa": -0.083,
              "rushDefEpa": -0.136,
              "pointsFor": 9,
              "pointsAgainst": 3
            },
            "ranks": {
              "passOffEpa": 19,
              "turnoverDiff": 4,
              "passDefEpa": 8,
              "rushDefEpa": 16,
              "pointsFor": 26,
              "pointsAgainst": 2
            }
          },
          {
            "abbr": "ATL",
            "values": {
              "passOffEpa": -0.587,
              "turnoverDiff": -5,
              "passDefEpa": 0.263,
              "rushDefEpa": -0.194,
              "pointsFor": 3,
              "pointsAgainst": 34
            },
            "ranks": {
              "passOffEpa": 32,
              "turnoverDiff": 32,
              "passDefEpa": 26,
              "rushDefEpa": 10,
              "pointsFor": 32,
              "pointsAgainst": 29
            }
          },
          {
            "abbr": "CAR",
            "values": {
              "passOffEpa": 0.263,
              "turnoverDiff": 5,
              "passDefEpa": -0.587,
              "rushDefEpa": -0.153,
              "pointsFor": 34,
              "pointsAgainst": 3
            },
            "ranks": {
              "passOffEpa": 7,
              "turnoverDiff": 1,
              "passDefEpa": 1,
              "rushDefEpa": 14,
              "pointsFor": 4,
              "pointsAgainst": 3
            }
          },
          {
            "abbr": "NO",
            "values": {
              "passOffEpa": 0.257,
              "turnoverDiff": 1,
              "passDefEpa": 0.095,
              "rushDefEpa": 0.132,
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
              "passOffEpa": -0.298,
              "turnoverDiff": -1,
              "passDefEpa": 0.256,
              "rushDefEpa": -0.349,
              "pointsFor": 19,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 29,
              "turnoverDiff": 27,
              "passDefEpa": 24,
              "rushDefEpa": 6,
              "pointsFor": 20,
              "pointsAgainst": 20
            }
          },
          {
            "abbr": "ARI",
            "values": {
              "passOffEpa": -0.191,
              "turnoverDiff": 0,
              "passDefEpa": 0.496,
              "rushDefEpa": -0.133,
              "pointsFor": 7,
              "pointsAgainst": 31
            },
            "ranks": {
              "passOffEpa": 28,
              "turnoverDiff": 20,
              "passDefEpa": 30,
              "rushDefEpa": 17,
              "pointsFor": 27,
              "pointsAgainst": 27
            }
          },
          {
            "abbr": "LAR",
            "values": {
              "passOffEpa": 0.512,
              "turnoverDiff": -1,
              "passDefEpa": -0.402,
              "rushDefEpa": -0.226,
              "pointsFor": 28,
              "pointsAgainst": 6
            },
            "ranks": {
              "passOffEpa": 2,
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
              "passOffEpa": 0.9,
              "turnoverDiff": 0,
              "passDefEpa": 0.133,
              "rushDefEpa": -0.108,
              "pointsFor": 35,
              "pointsAgainst": 13
            },
            "ranks": {
              "passOffEpa": 1,
              "turnoverDiff": 21,
              "passDefEpa": 18,
              "rushDefEpa": 20,
              "pointsFor": 3,
              "pointsAgainst": 9
            }
          },
          {
            "abbr": "SEA",
            "values": {
              "passOffEpa": 0.496,
              "turnoverDiff": 0,
              "passDefEpa": -0.191,
              "rushDefEpa": -0.342,
              "pointsFor": 31,
              "pointsAgainst": 7
            },
            "ranks": {
              "passOffEpa": 3,
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
              "passOffEpa": 0.258,
              "turnoverDiff": -0.67,
              "passDefEpa": 0.109,
              "rushDefEpa": 0.008,
              "pointsFor": 33.67,
              "pointsAgainst": 26
            },
            "ranks": {
              "passOffEpa": 5,
              "turnoverDiff": 24,
              "passDefEpa": 19,
              "rushDefEpa": 24,
              "pointsFor": 1,
              "pointsAgainst": 21
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "MIA",
            "values": {
              "passOffEpa": -0.041,
              "turnoverDiff": -0.33,
              "passDefEpa": 0.415,
              "rushDefEpa": -0.118,
              "pointsFor": 12,
              "pointsAgainst": 28.67
            },
            "ranks": {
              "passOffEpa": 22,
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
              "passOffEpa": -0.19,
              "turnoverDiff": -1.67,
              "passDefEpa": -0.067,
              "rushDefEpa": 0.037,
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
              "passOffEpa": 0.185,
              "turnoverDiff": 0.33,
              "passDefEpa": 0.025,
              "rushDefEpa": -0.107,
              "pointsFor": 21.33,
              "pointsAgainst": 20.33
            },
            "ranks": {
              "passOffEpa": 9,
              "turnoverDiff": 13,
              "passDefEpa": 15,
              "rushDefEpa": 10,
              "pointsFor": 17,
              "pointsAgainst": 12
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "BAL",
            "values": {
              "passOffEpa": 0.28,
              "turnoverDiff": 0.33,
              "passDefEpa": 0.115,
              "rushDefEpa": 0.02,
              "pointsFor": 30.67,
              "pointsAgainst": 26
            },
            "ranks": {
              "passOffEpa": 3,
              "turnoverDiff": 14,
              "passDefEpa": 20,
              "rushDefEpa": 26,
              "pointsFor": 4,
              "pointsAgainst": 22
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "CIN",
            "values": {
              "passOffEpa": 0.097,
              "turnoverDiff": 0.67,
              "passDefEpa": -0.042,
              "rushDefEpa": -0.136,
              "pointsFor": 26.67,
              "pointsAgainst": 21
            },
            "ranks": {
              "passOffEpa": 15,
              "turnoverDiff": 10,
              "passDefEpa": 8,
              "rushDefEpa": 5,
              "pointsFor": 12,
              "pointsAgainst": 13
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "CLE",
            "values": {
              "passOffEpa": 0.074,
              "turnoverDiff": -0.33,
              "passDefEpa": -0.002,
              "rushDefEpa": -0.005,
              "pointsFor": 18,
              "pointsAgainst": 23.67
            },
            "ranks": {
              "passOffEpa": 17,
              "turnoverDiff": 22,
              "passDefEpa": 13,
              "rushDefEpa": 23,
              "pointsFor": 24,
              "pointsAgainst": 18
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "PIT",
            "values": {
              "passOffEpa": -0.147,
              "turnoverDiff": 0.67,
              "passDefEpa": -0.017,
              "rushDefEpa": -0.011,
              "pointsFor": 17.67,
              "pointsAgainst": 20
            },
            "ranks": {
              "passOffEpa": 29,
              "turnoverDiff": 11,
              "passDefEpa": 12,
              "rushDefEpa": 19,
              "pointsFor": 26,
              "pointsAgainst": 11
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "HOU",
            "values": {
              "passOffEpa": -0.057,
              "turnoverDiff": 0.33,
              "passDefEpa": 0.054,
              "rushDefEpa": -0.091,
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
              "passOffEpa": -0.069,
              "turnoverDiff": -1.67,
              "passDefEpa": 0.171,
              "rushDefEpa": 0.1,
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
              "passOffEpa": 0.24,
              "turnoverDiff": 1.33,
              "passDefEpa": -0.102,
              "rushDefEpa": -0.066,
              "pointsFor": 27.33,
              "pointsAgainst": 12
            },
            "ranks": {
              "passOffEpa": 6,
              "turnoverDiff": 2,
              "passDefEpa": 2,
              "rushDefEpa": 14,
              "pointsFor": 10,
              "pointsAgainst": 1
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "TEN",
            "values": {
              "passOffEpa": -0.112,
              "turnoverDiff": -0.33,
              "passDefEpa": 0.126,
              "rushDefEpa": -0.062,
              "pointsFor": 12.33,
              "pointsAgainst": 19.67
            },
            "ranks": {
              "passOffEpa": 28,
              "turnoverDiff": 23,
              "passDefEpa": 22,
              "rushDefEpa": 15,
              "pointsFor": 30,
              "pointsAgainst": 10
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "DEN",
            "values": {
              "passOffEpa": -0.042,
              "turnoverDiff": 0,
              "passDefEpa": -0.039,
              "rushDefEpa": 0.122,
              "pointsFor": 20,
              "pointsAgainst": 23.33
            },
            "ranks": {
              "passOffEpa": 23,
              "turnoverDiff": 16,
              "passDefEpa": 9,
              "rushDefEpa": 32,
              "pointsFor": 21,
              "pointsAgainst": 17
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "KC",
            "values": {
              "passOffEpa": 0.203,
              "turnoverDiff": 1,
              "passDefEpa": -0.1,
              "rushDefEpa": -0.041,
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
              "passOffEpa": 0.147,
              "turnoverDiff": 1.67,
              "passDefEpa": -0.046,
              "rushDefEpa": -0.156,
              "pointsFor": 29.33,
              "pointsAgainst": 18
            },
            "ranks": {
              "passOffEpa": 11,
              "turnoverDiff": 1,
              "passDefEpa": 7,
              "rushDefEpa": 4,
              "pointsFor": 8,
              "pointsAgainst": 8
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "LAC",
            "values": {
              "passOffEpa": -0.099,
              "turnoverDiff": 0,
              "passDefEpa": 0.133,
              "rushDefEpa": -0.1,
              "pointsFor": 14.67,
              "pointsAgainst": 25.33
            },
            "ranks": {
              "passOffEpa": 27,
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
              "passOffEpa": 0.293,
              "turnoverDiff": 0,
              "passDefEpa": 0.389,
              "rushDefEpa": -0.009,
              "pointsFor": 29.33,
              "pointsAgainst": 27.33
            },
            "ranks": {
              "passOffEpa": 2,
              "turnoverDiff": 18,
              "passDefEpa": 31,
              "rushDefEpa": 21,
              "pointsFor": 9,
              "pointsAgainst": 25
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "NYG",
            "values": {
              "passOffEpa": 0.009,
              "turnoverDiff": 1,
              "passDefEpa": 0.203,
              "rushDefEpa": -0.09,
              "pointsFor": 15.33,
              "pointsAgainst": 18.33
            },
            "ranks": {
              "passOffEpa": 19,
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
              "passOffEpa": -0.016,
              "turnoverDiff": -1.67,
              "passDefEpa": 0.117,
              "rushDefEpa": -0.006,
              "pointsFor": 18.33,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 21,
              "turnoverDiff": 30,
              "passDefEpa": 21,
              "rushDefEpa": 22,
              "pointsFor": 23,
              "pointsAgainst": 16
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "WSH",
            "values": {
              "passOffEpa": 0.112,
              "turnoverDiff": 0.67,
              "passDefEpa": 0.18,
              "rushDefEpa": -0.112,
              "pointsFor": 25,
              "pointsAgainst": 30.67
            },
            "ranks": {
              "passOffEpa": 13,
              "turnoverDiff": 12,
              "passDefEpa": 28,
              "rushDefEpa": 9,
              "pointsFor": 13,
              "pointsAgainst": 31
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "CHI",
            "values": {
              "passOffEpa": 0.178,
              "turnoverDiff": 1,
              "passDefEpa": 0.011,
              "rushDefEpa": 0.047,
              "pointsFor": 29.67,
              "pointsAgainst": 17.67
            },
            "ranks": {
              "passOffEpa": 10,
              "turnoverDiff": 6,
              "passDefEpa": 14,
              "rushDefEpa": 29,
              "pointsFor": 5,
              "pointsAgainst": 7
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "DET",
            "values": {
              "passOffEpa": 0.272,
              "turnoverDiff": 1,
              "passDefEpa": 0.169,
              "rushDefEpa": 0.033,
              "pointsFor": 31,
              "pointsAgainst": 31.67
            },
            "ranks": {
              "passOffEpa": 4,
              "turnoverDiff": 7,
              "passDefEpa": 26,
              "rushDefEpa": 27,
              "pointsFor": 3,
              "pointsAgainst": 32
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "GB",
            "values": {
              "passOffEpa": -0.009,
              "turnoverDiff": -0.67,
              "passDefEpa": 0.143,
              "rushDefEpa": -0.01,
              "pointsFor": 18.67,
              "pointsAgainst": 30.33
            },
            "ranks": {
              "passOffEpa": 20,
              "turnoverDiff": 25,
              "passDefEpa": 25,
              "rushDefEpa": 20,
              "pointsFor": 22,
              "pointsAgainst": 30
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "MIN",
            "values": {
              "passOffEpa": -0.09,
              "turnoverDiff": 1.33,
              "passDefEpa": -0.118,
              "rushDefEpa": -0.201,
              "pointsFor": 23.67,
              "pointsAgainst": 13.67
            },
            "ranks": {
              "passOffEpa": 26,
              "turnoverDiff": 3,
              "passDefEpa": 1,
              "rushDefEpa": 2,
              "pointsFor": 16,
              "pointsAgainst": 2
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "ATL",
            "values": {
              "passOffEpa": -0.288,
              "turnoverDiff": -2,
              "passDefEpa": 0.041,
              "rushDefEpa": -0.224,
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
              "passOffEpa": 0.139,
              "turnoverDiff": 1,
              "passDefEpa": -0.027,
              "rushDefEpa": 0.056,
              "pointsFor": 29.67,
              "pointsAgainst": 27.67
            },
            "ranks": {
              "passOffEpa": 12,
              "turnoverDiff": 8,
              "passDefEpa": 11,
              "rushDefEpa": 30,
              "pointsFor": 6,
              "pointsAgainst": 26
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "NO",
            "values": {
              "passOffEpa": 0.068,
              "turnoverDiff": -1.33,
              "passDefEpa": 0.141,
              "rushDefEpa": -0.014,
              "pointsFor": 27,
              "pointsAgainst": 27.67
            },
            "ranks": {
              "passOffEpa": 18,
              "turnoverDiff": 27,
              "passDefEpa": 24,
              "rushDefEpa": 18,
              "pointsFor": 11,
              "pointsAgainst": 27
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "TB",
            "values": {
              "passOffEpa": -0.22,
              "turnoverDiff": -1.67,
              "passDefEpa": -0.03,
              "rushDefEpa": -0.134,
              "pointsFor": 20.67,
              "pointsAgainst": 26.33
            },
            "ranks": {
              "passOffEpa": 31,
              "turnoverDiff": 31,
              "passDefEpa": 10,
              "rushDefEpa": 6,
              "pointsFor": 19,
              "pointsAgainst": 23
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "ARI",
            "values": {
              "passOffEpa": 0.078,
              "turnoverDiff": 1,
              "passDefEpa": 0.354,
              "rushDefEpa": -0.131,
              "pointsFor": 21,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 16,
              "turnoverDiff": 9,
              "passDefEpa": 30,
              "rushDefEpa": 7,
              "pointsFor": 18,
              "pointsAgainst": 24
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "LAR",
            "values": {
              "passOffEpa": 0.103,
              "turnoverDiff": -1,
              "passDefEpa": -0.093,
              "rushDefEpa": 0.011,
              "pointsFor": 20.33,
              "pointsAgainst": 21
            },
            "ranks": {
              "passOffEpa": 14,
              "turnoverDiff": 26,
              "passDefEpa": 4,
              "rushDefEpa": 25,
              "pointsFor": 20,
              "pointsAgainst": 14
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "SF",
            "values": {
              "passOffEpa": 0.531,
              "turnoverDiff": 0,
              "passDefEpa": 0.082,
              "rushDefEpa": -0.053,
              "pointsFor": 32.67,
              "pointsAgainst": 16.67
            },
            "ranks": {
              "passOffEpa": 1,
              "turnoverDiff": 19,
              "passDefEpa": 18,
              "rushDefEpa": 16,
              "pointsFor": 2,
              "pointsAgainst": 4
            },
            "gamesPlayed": 3
          },
          {
            "abbr": "SEA",
            "values": {
              "passOffEpa": 0.219,
              "turnoverDiff": 0,
              "passDefEpa": -0.056,
              "rushDefEpa": -0.2,
              "pointsFor": 25,
              "pointsAgainst": 16.67
            },
            "ranks": {
              "passOffEpa": 7,
              "turnoverDiff": 20,
              "passDefEpa": 6,
              "rushDefEpa": 3,
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
              "passOffEpa": 0.02,
              "turnoverDiff": -4,
              "passDefEpa": -0.159,
              "rushDefEpa": 0.039,
              "pointsFor": 24,
              "pointsAgainst": 16
            },
            "ranks": {
              "passOffEpa": 18,
              "turnoverDiff": 32,
              "passDefEpa": 6,
              "rushDefEpa": 24,
              "pointsFor": 17,
              "pointsAgainst": 7
            }
          },
          {
            "abbr": "MIA",
            "values": {
              "passOffEpa": -0.104,
              "turnoverDiff": -1,
              "passDefEpa": 0.444,
              "rushDefEpa": -0.201,
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
              "passOffEpa": -0.367,
              "turnoverDiff": -2,
              "passDefEpa": 0.24,
              "rushDefEpa": 0.175,
              "pointsFor": 6,
              "pointsAgainst": 35
            },
            "ranks": {
              "passOffEpa": 31,
              "turnoverDiff": 26,
              "passDefEpa": 25,
              "rushDefEpa": 30,
              "pointsFor": 32,
              "pointsAgainst": 29
            }
          },
          {
            "abbr": "NYJ",
            "values": {
              "passOffEpa": 0.215,
              "turnoverDiff": -1,
              "passDefEpa": 0.29,
              "rushDefEpa": -0.049,
              "pointsFor": 24,
              "pointsAgainst": 31
            },
            "ranks": {
              "passOffEpa": 9,
              "turnoverDiff": 20,
              "passDefEpa": 27,
              "rushDefEpa": 15,
              "pointsFor": 18,
              "pointsAgainst": 24
            }
          },
          {
            "abbr": "BAL",
            "values": {
              "passOffEpa": 0.514,
              "turnoverDiff": 1,
              "passDefEpa": 0.256,
              "rushDefEpa": 0.005,
              "pointsFor": 34,
              "pointsAgainst": 31
            },
            "ranks": {
              "passOffEpa": 2,
              "turnoverDiff": 8,
              "passDefEpa": 26,
              "rushDefEpa": 21,
              "pointsFor": 5,
              "pointsAgainst": 25
            }
          },
          {
            "abbr": "CIN",
            "values": {
              "passOffEpa": 0.333,
              "turnoverDiff": -1,
              "passDefEpa": 0.187,
              "rushDefEpa": 0.021,
              "pointsFor": 27,
              "pointsAgainst": 30
            },
            "ranks": {
              "passOffEpa": 4,
              "turnoverDiff": 21,
              "passDefEpa": 21,
              "rushDefEpa": 22,
              "pointsFor": 13,
              "pointsAgainst": 21
            }
          },
          {
            "abbr": "CLE",
            "values": {
              "passOffEpa": 0.083,
              "turnoverDiff": 0,
              "passDefEpa": -0.104,
              "rushDefEpa": -0.144,
              "pointsFor": 21,
              "pointsAgainst": 18
            },
            "ranks": {
              "passOffEpa": 16,
              "turnoverDiff": 15,
              "passDefEpa": 9,
              "rushDefEpa": 8,
              "pointsFor": 21,
              "pointsAgainst": 10
            }
          },
          {
            "abbr": "PIT",
            "values": {
              "passOffEpa": 0.187,
              "turnoverDiff": 1,
              "passDefEpa": 0.333,
              "rushDefEpa": 0.045,
              "pointsFor": 30,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 12,
              "turnoverDiff": 9,
              "passDefEpa": 29,
              "rushDefEpa": 25,
              "pointsFor": 10,
              "pointsAgainst": 18
            }
          },
          {
            "abbr": "HOU",
            "values": {
              "passOffEpa": -0.082,
              "turnoverDiff": 3,
              "passDefEpa": -0.129,
              "rushDefEpa": -0.034,
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
              "passOffEpa": -0.129,
              "turnoverDiff": -3,
              "passDefEpa": -0.082,
              "rushDefEpa": -0.048,
              "pointsFor": 19,
              "pointsAgainst": 17
            },
            "ranks": {
              "passOffEpa": 25,
              "turnoverDiff": 28,
              "passDefEpa": 11,
              "rushDefEpa": 16,
              "pointsFor": 22,
              "pointsAgainst": 9
            }
          },
          {
            "abbr": "JAX",
            "values": {
              "passOffEpa": 0.24,
              "turnoverDiff": 2,
              "passDefEpa": -0.367,
              "rushDefEpa": -0.041,
              "pointsFor": 35,
              "pointsAgainst": 6
            },
            "ranks": {
              "passOffEpa": 8,
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
              "passOffEpa": -0.13,
              "turnoverDiff": -2,
              "passDefEpa": -0.208,
              "rushDefEpa": -0.012,
              "pointsFor": 7,
              "pointsAgainst": 12
            },
            "ranks": {
              "passOffEpa": 26,
              "turnoverDiff": 27,
              "passDefEpa": 5,
              "rushDefEpa": 19,
              "pointsFor": 30,
              "pointsAgainst": 5
            }
          },
          {
            "abbr": "DEN",
            "values": {
              "passOffEpa": -0.001,
              "turnoverDiff": 1,
              "passDefEpa": -0.008,
              "rushDefEpa": 0.091,
              "pointsFor": 30,
              "pointsAgainst": 26
            },
            "ranks": {
              "passOffEpa": 19,
              "turnoverDiff": 10,
              "passDefEpa": 13,
              "rushDefEpa": 29,
              "pointsFor": 11,
              "pointsAgainst": 17
            }
          },
          {
            "abbr": "KC",
            "values": {
              "passOffEpa": 0.444,
              "turnoverDiff": 1,
              "passDefEpa": -0.104,
              "rushDefEpa": -0.156,
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
              "passOffEpa": 0.19,
              "turnoverDiff": 3,
              "passDefEpa": -0.027,
              "rushDefEpa": 0.054,
              "pointsFor": 35,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 11,
              "turnoverDiff": 3,
              "passDefEpa": 12,
              "rushDefEpa": 26,
              "pointsFor": 3,
              "pointsAgainst": 19
            }
          },
          {
            "abbr": "LAC",
            "values": {
              "passOffEpa": -0.159,
              "turnoverDiff": 4,
              "passDefEpa": 0.02,
              "rushDefEpa": 0.062,
              "pointsFor": 16,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 27,
              "turnoverDiff": 1,
              "passDefEpa": 15,
              "rushDefEpa": 28,
              "pointsFor": 25,
              "pointsAgainst": 15
            }
          },
          {
            "abbr": "DAL",
            "values": {
              "passOffEpa": 0.256,
              "turnoverDiff": -1,
              "passDefEpa": 0.514,
              "rushDefEpa": -0.078,
              "pointsFor": 31,
              "pointsAgainst": 34
            },
            "ranks": {
              "passOffEpa": 7,
              "turnoverDiff": 22,
              "passDefEpa": 31,
              "rushDefEpa": 13,
              "pointsFor": 7,
              "pointsAgainst": 28
            }
          },
          {
            "abbr": "NYG",
            "values": {
              "passOffEpa": -0.208,
              "turnoverDiff": 2,
              "passDefEpa": -0.13,
              "rushDefEpa": -0.065,
              "pointsFor": 12,
              "pointsAgainst": 7
            },
            "ranks": {
              "passOffEpa": 28,
              "turnoverDiff": 7,
              "passDefEpa": 7,
              "rushDefEpa": 14,
              "pointsFor": 28,
              "pointsAgainst": 2
            }
          },
          {
            "abbr": "PHI",
            "values": {
              "passOffEpa": -0.441,
              "turnoverDiff": -3,
              "passDefEpa": 0.195,
              "rushDefEpa": -0.141,
              "pointsFor": 7,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 32,
              "turnoverDiff": 29,
              "passDefEpa": 23,
              "rushDefEpa": 9,
              "pointsFor": 31,
              "pointsAgainst": 20
            }
          },
          {
            "abbr": "WSH",
            "values": {
              "passOffEpa": 0.123,
              "turnoverDiff": 3,
              "passDefEpa": 0.11,
              "rushDefEpa": -0.354,
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
              "passOffEpa": 0.195,
              "turnoverDiff": 3,
              "passDefEpa": -0.441,
              "rushDefEpa": 0.289,
              "pointsFor": 27,
              "pointsAgainst": 7
            },
            "ranks": {
              "passOffEpa": 10,
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
              "passOffEpa": 0.29,
              "turnoverDiff": 1,
              "passDefEpa": 0.215,
              "rushDefEpa": -0.216,
              "pointsFor": 31,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 6,
              "turnoverDiff": 12,
              "passDefEpa": 24,
              "rushDefEpa": 4,
              "pointsFor": 8,
              "pointsAgainst": 16
            }
          },
          {
            "abbr": "GB",
            "values": {
              "passOffEpa": 0.06,
              "turnoverDiff": 0,
              "passDefEpa": 0.332,
              "rushDefEpa": 0.252,
              "pointsFor": 14,
              "pointsAgainst": 35
            },
            "ranks": {
              "passOffEpa": 17,
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
              "passOffEpa": -0.289,
              "turnoverDiff": 1,
              "passDefEpa": -0.21,
              "rushDefEpa": -0.167,
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
              "passOffEpa": 0.332,
              "turnoverDiff": 0,
              "passDefEpa": 0.06,
              "rushDefEpa": -0.263,
              "pointsFor": 35,
              "pointsAgainst": 14
            },
            "ranks": {
              "passOffEpa": 5,
              "turnoverDiff": 17,
              "passDefEpa": 16,
              "rushDefEpa": 2,
              "pointsFor": 4,
              "pointsAgainst": 6
            }
          },
          {
            "abbr": "CAR",
            "values": {
              "passOffEpa": -0.104,
              "turnoverDiff": 0,
              "passDefEpa": 0.083,
              "rushDefEpa": -0.115,
              "pointsFor": 18,
              "pointsAgainst": 21
            },
            "ranks": {
              "passOffEpa": 24,
              "turnoverDiff": 18,
              "passDefEpa": 17,
              "rushDefEpa": 11,
              "pointsFor": 23,
              "pointsAgainst": 12
            }
          },
          {
            "abbr": "NO",
            "values": {
              "passOffEpa": -0.027,
              "turnoverDiff": -3,
              "passDefEpa": 0.19,
              "rushDefEpa": -0.14,
              "pointsFor": 27,
              "pointsAgainst": 35
            },
            "ranks": {
              "passOffEpa": 21,
              "turnoverDiff": 30,
              "passDefEpa": 22,
              "rushDefEpa": 10,
              "pointsFor": 15,
              "pointsAgainst": 31
            }
          },
          {
            "abbr": "TB",
            "values": {
              "passOffEpa": -0.21,
              "turnoverDiff": -1,
              "passDefEpa": -0.289,
              "rushDefEpa": -0.08,
              "pointsFor": 16,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 29,
              "turnoverDiff": 23,
              "passDefEpa": 3,
              "rushDefEpa": 12,
              "pointsFor": 26,
              "pointsAgainst": 13
            }
          },
          {
            "abbr": "ARI",
            "values": {
              "passOffEpa": 0.166,
              "turnoverDiff": 1,
              "passDefEpa": 0.743,
              "rushDefEpa": -0.01,
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
              "passOffEpa": -0.008,
              "turnoverDiff": -1,
              "passDefEpa": -0.001,
              "rushDefEpa": 0.033,
              "pointsFor": 26,
              "pointsAgainst": 30
            },
            "ranks": {
              "passOffEpa": 20,
              "turnoverDiff": 24,
              "passDefEpa": 14,
              "rushDefEpa": 23,
              "pointsFor": 16,
              "pointsAgainst": 22
            }
          },
          {
            "abbr": "SF",
            "values": {
              "passOffEpa": 0.743,
              "turnoverDiff": -1,
              "passDefEpa": 0.166,
              "rushDefEpa": 0.06,
              "pointsFor": 36,
              "pointsAgainst": 30
            },
            "ranks": {
              "passOffEpa": 1,
              "turnoverDiff": 25,
              "passDefEpa": 20,
              "rushDefEpa": 27,
              "pointsFor": 1,
              "pointsAgainst": 23
            }
          },
          {
            "abbr": "SEA",
            "values": {
              "passOffEpa": 0.11,
              "turnoverDiff": -3,
              "passDefEpa": 0.123,
              "rushDefEpa": -0.261,
              "pointsFor": 31,
              "pointsAgainst": 33
            },
            "ranks": {
              "passOffEpa": 15,
              "turnoverDiff": 31,
              "passDefEpa": 19,
              "rushDefEpa": 3,
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
              "passOffEpa": 0.222,
              "turnoverDiff": -0.5,
              "passDefEpa": 0.141,
              "rushDefEpa": 0.027,
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
              "passOffEpa": -0.122,
              "turnoverDiff": -0.5,
              "passDefEpa": 0.269,
              "rushDefEpa": -0.148,
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
              "passOffEpa": -0.067,
              "turnoverDiff": -1.25,
              "passDefEpa": -0.019,
              "rushDefEpa": 0.057,
              "pointsFor": 16.25,
              "pointsAgainst": 19.25
            },
            "ranks": {
              "passOffEpa": 25,
              "turnoverDiff": 27,
              "passDefEpa": 7,
              "rushDefEpa": 30,
              "pointsFor": 30,
              "pointsAgainst": 6
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "NYJ",
            "values": {
              "passOffEpa": 0.128,
              "turnoverDiff": 0.75,
              "passDefEpa": 0.07,
              "rushDefEpa": -0.105,
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
              "passOffEpa": 0.296,
              "turnoverDiff": 0.75,
              "passDefEpa": 0.1,
              "rushDefEpa": -0.027,
              "pointsFor": 29,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 2,
              "turnoverDiff": 5,
              "passDefEpa": 25,
              "rushDefEpa": 20,
              "pointsFor": 7,
              "pointsAgainst": 19
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "CIN",
            "values": {
              "passOffEpa": 0.103,
              "turnoverDiff": 0,
              "passDefEpa": 0.012,
              "rushDefEpa": -0.08,
              "pointsFor": 24.25,
              "pointsAgainst": 21.25
            },
            "ranks": {
              "passOffEpa": 14,
              "turnoverDiff": 17,
              "passDefEpa": 9,
              "rushDefEpa": 11,
              "pointsFor": 14,
              "pointsAgainst": 13
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "CLE",
            "values": {
              "passOffEpa": 0.122,
              "turnoverDiff": -0.25,
              "passDefEpa": 0.016,
              "rushDefEpa": 0.015,
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
              "passOffEpa": -0.092,
              "turnoverDiff": 0.5,
              "passDefEpa": 0.058,
              "rushDefEpa": -0.032,
              "pointsFor": 19.25,
              "pointsAgainst": 21.75
            },
            "ranks": {
              "passOffEpa": 27,
              "turnoverDiff": 13,
              "passDefEpa": 16,
              "rushDefEpa": 17,
              "pointsFor": 23,
              "pointsAgainst": 14
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "HOU",
            "values": {
              "passOffEpa": 0.032,
              "turnoverDiff": 0.25,
              "passDefEpa": 0.087,
              "rushDefEpa": -0.069,
              "pointsFor": 21,
              "pointsAgainst": 27.25
            },
            "ranks": {
              "passOffEpa": 18,
              "turnoverDiff": 14,
              "passDefEpa": 24,
              "rushDefEpa": 13,
              "pointsFor": 20,
              "pointsAgainst": 26
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "IND",
            "values": {
              "passOffEpa": -0.124,
              "turnoverDiff": -1.5,
              "passDefEpa": 0.072,
              "rushDefEpa": 0.033,
              "pointsFor": 25.5,
              "pointsAgainst": 26
            },
            "ranks": {
              "passOffEpa": 29,
              "turnoverDiff": 32,
              "passDefEpa": 19,
              "rushDefEpa": 27,
              "pointsFor": 13,
              "pointsAgainst": 22
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "JAX",
            "values": {
              "passOffEpa": 0.247,
              "turnoverDiff": 1.5,
              "passDefEpa": -0.021,
              "rushDefEpa": -0.096,
              "pointsFor": 26,
              "pointsAgainst": 13.25
            },
            "ranks": {
              "passOffEpa": 4,
              "turnoverDiff": 1,
              "passDefEpa": 6,
              "rushDefEpa": 8,
              "pointsFor": 12,
              "pointsAgainst": 2
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "TEN",
            "values": {
              "passOffEpa": -0.071,
              "turnoverDiff": -0.75,
              "passDefEpa": 0.181,
              "rushDefEpa": -0.069,
              "pointsFor": 13.75,
              "pointsAgainst": 20.75
            },
            "ranks": {
              "passOffEpa": 26,
              "turnoverDiff": 24,
              "passDefEpa": 28,
              "rushDefEpa": 14,
              "pointsFor": 31,
              "pointsAgainst": 9
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "DEN",
            "values": {
              "passOffEpa": -0.001,
              "turnoverDiff": -0.25,
              "passDefEpa": 0.024,
              "rushDefEpa": 0.081,
              "pointsFor": 18.5,
              "pointsAgainst": 23.5
            },
            "ranks": {
              "passOffEpa": 21,
              "turnoverDiff": 20,
              "passDefEpa": 11,
              "rushDefEpa": 32,
              "pointsFor": 27,
              "pointsAgainst": 17
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "KC",
            "values": {
              "passOffEpa": 0.167,
              "turnoverDiff": 1.25,
              "passDefEpa": -0.007,
              "rushDefEpa": -0.085,
              "pointsFor": 29.5,
              "pointsAgainst": 19.25
            },
            "ranks": {
              "passOffEpa": 9,
              "turnoverDiff": 2,
              "passDefEpa": 8,
              "rushDefEpa": 10,
              "pointsFor": 6,
              "pointsAgainst": 7
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "LV",
            "values": {
              "passOffEpa": 0.154,
              "turnoverDiff": 0.75,
              "passDefEpa": -0.023,
              "rushDefEpa": -0.072,
              "pointsFor": 28.75,
              "pointsAgainst": 21
            },
            "ranks": {
              "passOffEpa": 10,
              "turnoverDiff": 6,
              "passDefEpa": 5,
              "rushDefEpa": 12,
              "pointsFor": 8,
              "pointsAgainst": 12
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "LAC",
            "values": {
              "passOffEpa": -0.132,
              "turnoverDiff": -0.75,
              "passDefEpa": 0.077,
              "rushDefEpa": -0.096,
              "pointsFor": 16.75,
              "pointsAgainst": 26.5
            },
            "ranks": {
              "passOffEpa": 30,
              "turnoverDiff": 25,
              "passDefEpa": 20,
              "rushDefEpa": 9,
              "pointsFor": 29,
              "pointsAgainst": 24
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "DAL",
            "values": {
              "passOffEpa": 0.252,
              "turnoverDiff": 0,
              "passDefEpa": 0.389,
              "rushDefEpa": -0.029,
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
              "passOffEpa": 0.037,
              "turnoverDiff": 0.75,
              "passDefEpa": 0.044,
              "rushDefEpa": -0.042,
              "pointsFor": 20.5,
              "pointsAgainst": 19.75
            },
            "ranks": {
              "passOffEpa": 17,
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
              "passOffEpa": -0.051,
              "turnoverDiff": -0.75,
              "passDefEpa": 0.081,
              "rushDefEpa": 0.004,
              "pointsFor": 18.75,
              "pointsAgainst": 23.25
            },
            "ranks": {
              "passOffEpa": 23,
              "turnoverDiff": 26,
              "passDefEpa": 21,
              "rushDefEpa": 23,
              "pointsFor": 26,
              "pointsAgainst": 16
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "WSH",
            "values": {
              "passOffEpa": 0.027,
              "turnoverDiff": 0.75,
              "passDefEpa": 0.064,
              "rushDefEpa": -0.006,
              "pointsFor": 22,
              "pointsAgainst": 30.5
            },
            "ranks": {
              "passOffEpa": 20,
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
              "passOffEpa": 0.184,
              "turnoverDiff": 0.25,
              "passDefEpa": -0.028,
              "rushDefEpa": 0.042,
              "pointsFor": 28,
              "pointsAgainst": 16.25
            },
            "ranks": {
              "passOffEpa": 8,
              "turnoverDiff": 15,
              "passDefEpa": 4,
              "rushDefEpa": 28,
              "pointsFor": 9,
              "pointsAgainst": 4
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "DET",
            "values": {
              "passOffEpa": 0.244,
              "turnoverDiff": 0.75,
              "passDefEpa": 0.22,
              "rushDefEpa": 0.003,
              "pointsFor": 29.75,
              "pointsAgainst": 31.75
            },
            "ranks": {
              "passOffEpa": 5,
              "turnoverDiff": 9,
              "passDefEpa": 29,
              "rushDefEpa": 22,
              "pointsFor": 5,
              "pointsAgainst": 31
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "GB",
            "values": {
              "passOffEpa": 0.032,
              "turnoverDiff": -0.5,
              "passDefEpa": 0.084,
              "rushDefEpa": 0.007,
              "pointsFor": 18.25,
              "pointsAgainst": 26.25
            },
            "ranks": {
              "passOffEpa": 19,
              "turnoverDiff": 23,
              "passDefEpa": 22,
              "rushDefEpa": 24,
              "pointsFor": 28,
              "pointsAgainst": 23
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "MIN",
            "values": {
              "passOffEpa": -0.061,
              "turnoverDiff": 1.25,
              "passDefEpa": -0.17,
              "rushDefEpa": -0.12,
              "pointsFor": 21.5,
              "pointsAgainst": 12.75
            },
            "ranks": {
              "passOffEpa": 24,
              "turnoverDiff": 3,
              "passDefEpa": 1,
              "rushDefEpa": 5,
              "pointsFor": 18,
              "pointsAgainst": 1
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "ATL",
            "values": {
              "passOffEpa": -0.156,
              "turnoverDiff": -1.25,
              "passDefEpa": 0.033,
              "rushDefEpa": -0.223,
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
              "passOffEpa": 0.2,
              "turnoverDiff": 0.75,
              "passDefEpa": 0.046,
              "rushDefEpa": 0.045,
              "pointsFor": 30.25,
              "pointsAgainst": 27.25
            },
            "ranks": {
              "passOffEpa": 7,
              "turnoverDiff": 10,
              "passDefEpa": 15,
              "rushDefEpa": 29,
              "pointsFor": 4,
              "pointsAgainst": 27
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "NO",
            "values": {
              "passOffEpa": 0.053,
              "turnoverDiff": -1.25,
              "passDefEpa": 0.18,
              "rushDefEpa": 0.074,
              "pointsFor": 26.25,
              "pointsAgainst": 32
            },
            "ranks": {
              "passOffEpa": 16,
              "turnoverDiff": 29,
              "passDefEpa": 27,
              "rushDefEpa": 31,
              "pointsFor": 10,
              "pointsAgainst": 32
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "TB",
            "values": {
              "passOffEpa": -0.196,
              "turnoverDiff": -1.25,
              "passDefEpa": 0.027,
              "rushDefEpa": -0.151,
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
              "passOffEpa": -0.031,
              "turnoverDiff": 0.75,
              "passDefEpa": 0.286,
              "rushDefEpa": -0.169,
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
              "passOffEpa": 0.077,
              "turnoverDiff": -1.25,
              "passDefEpa": -0.108,
              "rushDefEpa": -0.066,
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
              "passOffEpa": 0.463,
              "turnoverDiff": 0.25,
              "passDefEpa": 0.086,
              "rushDefEpa": -0.032,
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
              "passOffEpa": 0.146,
              "turnoverDiff": 0.75,
              "passDefEpa": -0.1,
              "rushDefEpa": -0.117,
              "pointsFor": 26.25,
              "pointsAgainst": 18.25
            },
            "ranks": {
              "passOffEpa": 11,
              "turnoverDiff": 12,
              "passDefEpa": 3,
              "rushDefEpa": 6,
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
              "passOffEpa": 0.121,
              "turnoverDiff": 0,
              "passDefEpa": 0.24,
              "rushDefEpa": 0.072,
              "pointsFor": 26,
              "pointsAgainst": 29
            },
            "ranks": {
              "passOffEpa": 14,
              "turnoverDiff": 11,
              "passDefEpa": 25,
              "rushDefEpa": 24,
              "pointsFor": 12,
              "pointsAgainst": 24
            }
          },
          {
            "abbr": "MIA",
            "values": {
              "passOffEpa": -0.526,
              "turnoverDiff": -1,
              "passDefEpa": -0.003,
              "rushDefEpa": -0.234,
              "pointsFor": 10,
              "pointsAgainst": 15
            },
            "ranks": {
              "passOffEpa": 32,
              "turnoverDiff": 23,
              "passDefEpa": 10,
              "rushDefEpa": 4,
              "pointsFor": 32,
              "pointsAgainst": 6
            }
          },
          {
            "abbr": "NE",
            "values": {
              "passOffEpa": 0.24,
              "turnoverDiff": 0,
              "passDefEpa": 0.121,
              "rushDefEpa": 0.131,
              "pointsFor": 29,
              "pointsAgainst": 26
            },
            "ranks": {
              "passOffEpa": 8,
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
              "passOffEpa": -0.225,
              "turnoverDiff": 2,
              "passDefEpa": 0.2,
              "rushDefEpa": -0.104,
              "pointsFor": 12,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 29,
              "turnoverDiff": 2,
              "passDefEpa": 23,
              "rushDefEpa": 11,
              "pointsFor": 31,
              "pointsAgainst": 12
            }
          },
          {
            "abbr": "BAL",
            "values": {
              "passOffEpa": 0.338,
              "turnoverDiff": 2,
              "passDefEpa": 0.049,
              "rushDefEpa": -0.165,
              "pointsFor": 24,
              "pointsAgainst": 18
            },
            "ranks": {
              "passOffEpa": 4,
              "turnoverDiff": 3,
              "passDefEpa": 13,
              "rushDefEpa": 9,
              "pointsFor": 14,
              "pointsAgainst": 9
            }
          },
          {
            "abbr": "CIN",
            "values": {
              "passOffEpa": 0.113,
              "turnoverDiff": -2,
              "passDefEpa": 0.27,
              "rushDefEpa": 0.046,
              "pointsFor": 17,
              "pointsAgainst": 22
            },
            "ranks": {
              "passOffEpa": 15,
              "turnoverDiff": 27,
              "passDefEpa": 27,
              "rushDefEpa": 21,
              "pointsFor": 25,
              "pointsAgainst": 11
            }
          },
          {
            "abbr": "CLE",
            "values": {
              "passOffEpa": 0.247,
              "turnoverDiff": 0,
              "passDefEpa": 0.06,
              "rushDefEpa": 0.102,
              "pointsFor": 27,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 7,
              "turnoverDiff": 13,
              "passDefEpa": 15,
              "rushDefEpa": 27,
              "pointsFor": 10,
              "pointsAgainst": 14
            }
          },
          {
            "abbr": "PIT",
            "values": {
              "passOffEpa": 0.06,
              "turnoverDiff": 0,
              "passDefEpa": 0.247,
              "rushDefEpa": -0.093,
              "pointsFor": 24,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 18,
              "turnoverDiff": 14,
              "passDefEpa": 26,
              "rushDefEpa": 13,
              "pointsFor": 15,
              "pointsAgainst": 22
            }
          },
          {
            "abbr": "HOU",
            "values": {
              "passOffEpa": 0.389,
              "turnoverDiff": 0,
              "passDefEpa": 0.16,
              "rushDefEpa": -0.002,
              "pointsFor": 30,
              "pointsAgainst": 34
            },
            "ranks": {
              "passOffEpa": 1,
              "turnoverDiff": 15,
              "passDefEpa": 20,
              "rushDefEpa": 18,
              "pointsFor": 5,
              "pointsAgainst": 30
            }
          },
          {
            "abbr": "IND",
            "values": {
              "passOffEpa": -0.283,
              "turnoverDiff": -1,
              "passDefEpa": -0.197,
              "rushDefEpa": -0.232,
              "pointsFor": 30,
              "pointsAgainst": 13
            },
            "ranks": {
              "passOffEpa": 30,
              "turnoverDiff": 24,
              "passDefEpa": 6,
              "rushDefEpa": 5,
              "pointsFor": 6,
              "pointsAgainst": 3
            }
          },
          {
            "abbr": "JAX",
            "values": {
              "passOffEpa": 0.27,
              "turnoverDiff": 2,
              "passDefEpa": 0.113,
              "rushDefEpa": -0.25,
              "pointsFor": 22,
              "pointsAgainst": 17
            },
            "ranks": {
              "passOffEpa": 6,
              "turnoverDiff": 4,
              "passDefEpa": 18,
              "rushDefEpa": 3,
              "pointsFor": 22,
              "pointsAgainst": 7
            }
          },
          {
            "abbr": "TEN",
            "values": {
              "passOffEpa": 0.049,
              "turnoverDiff": -2,
              "passDefEpa": 0.338,
              "rushDefEpa": -0.096,
              "pointsFor": 18,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 20,
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
              "passOffEpa": 0.095,
              "turnoverDiff": -1,
              "passDefEpa": 0.276,
              "rushDefEpa": -0.018,
              "pointsFor": 14,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 17,
              "turnoverDiff": 25,
              "passDefEpa": 28,
              "rushDefEpa": 17,
              "pointsFor": 28,
              "pointsAgainst": 16
            }
          },
          {
            "abbr": "KC",
            "values": {
              "passOffEpa": 0.052,
              "turnoverDiff": 2,
              "passDefEpa": 0.168,
              "rushDefEpa": -0.216,
              "pointsFor": 30,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 19,
              "turnoverDiff": 5,
              "passDefEpa": 21,
              "rushDefEpa": 7,
              "pointsFor": 7,
              "pointsAgainst": 23
            }
          },
          {
            "abbr": "LV",
            "values": {
              "passOffEpa": 0.168,
              "turnoverDiff": -2,
              "passDefEpa": 0.052,
              "rushDefEpa": 0.181,
              "pointsFor": 27,
              "pointsAgainst": 30
            },
            "ranks": {
              "passOffEpa": 12,
              "turnoverDiff": 29,
              "passDefEpa": 14,
              "rushDefEpa": 29,
              "pointsFor": 11,
              "pointsAgainst": 25
            }
          },
          {
            "abbr": "LAC",
            "values": {
              "passOffEpa": -0.222,
              "turnoverDiff": -3,
              "passDefEpa": -0.143,
              "rushDefEpa": -0.085,
              "pointsFor": 23,
              "pointsAgainst": 30
            },
            "ranks": {
              "passOffEpa": 28,
              "turnoverDiff": 32,
              "passDefEpa": 8,
              "rushDefEpa": 14,
              "pointsFor": 20,
              "pointsAgainst": 26
            }
          },
          {
            "abbr": "DAL",
            "values": {
              "passOffEpa": 0.16,
              "turnoverDiff": 0,
              "passDefEpa": 0.389,
              "rushDefEpa": -0.14,
              "pointsFor": 34,
              "pointsAgainst": 30
            },
            "ranks": {
              "passOffEpa": 13,
              "turnoverDiff": 16,
              "passDefEpa": 32,
              "rushDefEpa": 10,
              "pointsFor": 3,
              "pointsAgainst": 27
            }
          },
          {
            "abbr": "NYG",
            "values": {
              "passOffEpa": 0.112,
              "turnoverDiff": 0,
              "passDefEpa": -0.392,
              "rushDefEpa": 0.081,
              "pointsFor": 36,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 16,
              "turnoverDiff": 17,
              "passDefEpa": 2,
              "rushDefEpa": 25,
              "pointsFor": 2,
              "pointsAgainst": 17
            }
          },
          {
            "abbr": "PHI",
            "values": {
              "passOffEpa": -0.161,
              "turnoverDiff": 2,
              "passDefEpa": 0.018,
              "rushDefEpa": 0.041,
              "pointsFor": 20,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 26,
              "turnoverDiff": 6,
              "passDefEpa": 12,
              "rushDefEpa": 20,
              "pointsFor": 23,
              "pointsAgainst": 18
            }
          },
          {
            "abbr": "WSH",
            "values": {
              "passOffEpa": -0.197,
              "turnoverDiff": 1,
              "passDefEpa": -0.283,
              "rushDefEpa": 0.221,
              "pointsFor": 13,
              "pointsAgainst": 30
            },
            "ranks": {
              "passOffEpa": 27,
              "turnoverDiff": 7,
              "passDefEpa": 3,
              "rushDefEpa": 31,
              "pointsFor": 30,
              "pointsAgainst": 28
            }
          },
          {
            "abbr": "CHI",
            "values": {
              "passOffEpa": 0.2,
              "turnoverDiff": -2,
              "passDefEpa": -0.225,
              "rushDefEpa": 0.019,
              "pointsFor": 23,
              "pointsAgainst": 12
            },
            "ranks": {
              "passOffEpa": 10,
              "turnoverDiff": 30,
              "passDefEpa": 4,
              "rushDefEpa": 19,
              "pointsFor": 21,
              "pointsAgainst": 2
            }
          },
          {
            "abbr": "DET",
            "values": {
              "passOffEpa": 0.182,
              "turnoverDiff": 0,
              "passDefEpa": 0.378,
              "rushDefEpa": -0.082,
              "pointsFor": 26,
              "pointsAgainst": 32
            },
            "ranks": {
              "passOffEpa": 11,
              "turnoverDiff": 18,
              "passDefEpa": 30,
              "rushDefEpa": 15,
              "pointsFor": 13,
              "pointsAgainst": 29
            }
          },
          {
            "abbr": "GB",
            "values": {
              "passOffEpa": 0.214,
              "turnoverDiff": 0,
              "passDefEpa": -0.107,
              "rushDefEpa": 0.064,
              "pointsFor": 17,
              "pointsAgainst": 14
            },
            "ranks": {
              "passOffEpa": 9,
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
              "passOffEpa": -0.003,
              "turnoverDiff": 1,
              "passDefEpa": -0.526,
              "rushDefEpa": 0.209,
              "pointsFor": 15,
              "pointsAgainst": 10
            },
            "ranks": {
              "passOffEpa": 23,
              "turnoverDiff": 8,
              "passDefEpa": 1,
              "rushDefEpa": 30,
              "pointsFor": 27,
              "pointsAgainst": 1
            }
          },
          {
            "abbr": "ATL",
            "values": {
              "passOffEpa": 0.387,
              "turnoverDiff": 1,
              "passDefEpa": 0.01,
              "rushDefEpa": -0.219,
              "pointsFor": 45,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 2,
              "turnoverDiff": 9,
              "passDefEpa": 11,
              "rushDefEpa": 6,
              "pointsFor": 1,
              "pointsAgainst": 19
            }
          },
          {
            "abbr": "CAR",
            "values": {
              "passOffEpa": 0.378,
              "turnoverDiff": 0,
              "passDefEpa": 0.182,
              "rushDefEpa": -0.03,
              "pointsFor": 32,
              "pointsAgainst": 26
            },
            "ranks": {
              "passOffEpa": 3,
              "turnoverDiff": 20,
              "passDefEpa": 22,
              "rushDefEpa": 16,
              "pointsFor": 4,
              "pointsAgainst": 21
            }
          },
          {
            "abbr": "NO",
            "values": {
              "passOffEpa": 0.01,
              "turnoverDiff": -1,
              "passDefEpa": 0.387,
              "rushDefEpa": 0.282,
              "pointsFor": 24,
              "pointsAgainst": 45
            },
            "ranks": {
              "passOffEpa": 22,
              "turnoverDiff": 26,
              "passDefEpa": 31,
              "rushDefEpa": 32,
              "pointsFor": 16,
              "pointsAgainst": 32
            }
          },
          {
            "abbr": "TB",
            "values": {
              "passOffEpa": -0.107,
              "turnoverDiff": 0,
              "passDefEpa": 0.214,
              "rushDefEpa": -0.2,
              "pointsFor": 14,
              "pointsAgainst": 17
            },
            "ranks": {
              "passOffEpa": 24,
              "turnoverDiff": 21,
              "passDefEpa": 24,
              "rushDefEpa": 8,
              "pointsFor": 29,
              "pointsAgainst": 8
            }
          },
          {
            "abbr": "ARI",
            "values": {
              "passOffEpa": -0.392,
              "turnoverDiff": 0,
              "passDefEpa": 0.112,
              "rushDefEpa": -0.281,
              "pointsFor": 24,
              "pointsAgainst": 36
            },
            "ranks": {
              "passOffEpa": 31,
              "turnoverDiff": 22,
              "passDefEpa": 17,
              "rushDefEpa": 2,
              "pointsFor": 17,
              "pointsAgainst": 31
            }
          },
          {
            "abbr": "LAR",
            "values": {
              "passOffEpa": 0.018,
              "turnoverDiff": -2,
              "passDefEpa": -0.161,
              "rushDefEpa": -0.283,
              "pointsFor": 24,
              "pointsAgainst": 20
            },
            "ranks": {
              "passOffEpa": 21,
              "turnoverDiff": 31,
              "passDefEpa": 7,
              "rushDefEpa": 1,
              "pointsFor": 18,
              "pointsAgainst": 10
            }
          },
          {
            "abbr": "SF",
            "values": {
              "passOffEpa": 0.276,
              "turnoverDiff": 1,
              "passDefEpa": 0.095,
              "rushDefEpa": 0.05,
              "pointsFor": 24,
              "pointsAgainst": 14
            },
            "ranks": {
              "passOffEpa": 5,
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
              "passOffEpa": -0.143,
              "turnoverDiff": 3,
              "passDefEpa": -0.222,
              "rushDefEpa": 0.091,
              "pointsFor": 30,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 25,
              "turnoverDiff": 1,
              "passDefEpa": 5,
              "rushDefEpa": 26,
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
              "passOffEpa": 0.235,
              "turnoverDiff": -0.8,
              "passDefEpa": 0.18,
              "rushDefEpa": 0.024,
              "pointsFor": 32.8,
              "pointsAgainst": 28.2
            },
            "ranks": {
              "passOffEpa": 5,
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
              "passOffEpa": -0.155,
              "turnoverDiff": -0.8,
              "passDefEpa": 0.293,
              "rushDefEpa": -0.126,
              "pointsFor": 14,
              "pointsAgainst": 26.4
            },
            "ranks": {
              "passOffEpa": 31,
              "turnoverDiff": 25,
              "passDefEpa": 30,
              "rushDefEpa": 4,
              "pointsFor": 31,
              "pointsAgainst": 24
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "NE",
            "values": {
              "passOffEpa": 0.098,
              "turnoverDiff": -1,
              "passDefEpa": 0.03,
              "rushDefEpa": 0.009,
              "pointsFor": 22,
              "pointsAgainst": 18.8
            },
            "ranks": {
              "passOffEpa": 12,
              "turnoverDiff": 27,
              "passDefEpa": 16,
              "rushDefEpa": 25,
              "pointsFor": 19,
              "pointsAgainst": 4
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "NYJ",
            "values": {
              "passOffEpa": 0.045,
              "turnoverDiff": 0.6,
              "passDefEpa": -0.006,
              "rushDefEpa": -0.127,
              "pointsFor": 18.6,
              "pointsAgainst": 19.2
            },
            "ranks": {
              "passOffEpa": 18,
              "turnoverDiff": 7,
              "passDefEpa": 10,
              "rushDefEpa": 3,
              "pointsFor": 27,
              "pointsAgainst": 5
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "BAL",
            "values": {
              "passOffEpa": 0.246,
              "turnoverDiff": 0.6,
              "passDefEpa": 0.1,
              "rushDefEpa": -0.07,
              "pointsFor": 29.2,
              "pointsAgainst": 23.8
            },
            "ranks": {
              "passOffEpa": 3,
              "turnoverDiff": 8,
              "passDefEpa": 23,
              "rushDefEpa": 15,
              "pointsFor": 6,
              "pointsAgainst": 19
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "CIN",
            "values": {
              "passOffEpa": 0.148,
              "turnoverDiff": 0.4,
              "passDefEpa": -0.035,
              "rushDefEpa": -0.001,
              "pointsFor": 25.6,
              "pointsAgainst": 21.8
            },
            "ranks": {
              "passOffEpa": 10,
              "turnoverDiff": 12,
              "passDefEpa": 4,
              "rushDefEpa": 21,
              "pointsFor": 10,
              "pointsAgainst": 10
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "CLE",
            "values": {
              "passOffEpa": 0.029,
              "turnoverDiff": -0.2,
              "passDefEpa": -0.035,
              "rushDefEpa": 0.008,
              "pointsFor": 18.6,
              "pointsAgainst": 22.4
            },
            "ranks": {
              "passOffEpa": 19,
              "turnoverDiff": 19,
              "passDefEpa": 5,
              "rushDefEpa": 24,
              "pointsFor": 28,
              "pointsAgainst": 14
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "PIT",
            "values": {
              "passOffEpa": -0.057,
              "turnoverDiff": 0.4,
              "passDefEpa": 0.034,
              "rushDefEpa": -0.027,
              "pointsFor": 22.2,
              "pointsAgainst": 21.8
            },
            "ranks": {
              "passOffEpa": 26,
              "turnoverDiff": 13,
              "passDefEpa": 17,
              "rushDefEpa": 18,
              "pointsFor": 18,
              "pointsAgainst": 11
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "HOU",
            "values": {
              "passOffEpa": 0.071,
              "turnoverDiff": 0.6,
              "passDefEpa": -0.004,
              "rushDefEpa": -0.096,
              "pointsFor": 22,
              "pointsAgainst": 22.4
            },
            "ranks": {
              "passOffEpa": 15,
              "turnoverDiff": 9,
              "passDefEpa": 11,
              "rushDefEpa": 10,
              "pointsFor": 20,
              "pointsAgainst": 15
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "IND",
            "values": {
              "passOffEpa": -0.102,
              "turnoverDiff": -1.2,
              "passDefEpa": 0.082,
              "rushDefEpa": 0.071,
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
              "passOffEpa": 0.245,
              "turnoverDiff": 1,
              "passDefEpa": -0.016,
              "rushDefEpa": -0.164,
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
              "passOffEpa": -0.139,
              "turnoverDiff": -1,
              "passDefEpa": 0.196,
              "rushDefEpa": -0.087,
              "pointsFor": 11.6,
              "pointsAgainst": 21.8
            },
            "ranks": {
              "passOffEpa": 30,
              "turnoverDiff": 28,
              "passDefEpa": 29,
              "rushDefEpa": 12,
              "pointsFor": 32,
              "pointsAgainst": 12
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "DEN",
            "values": {
              "passOffEpa": -0.035,
              "turnoverDiff": 0.2,
              "passDefEpa": -0.023,
              "rushDefEpa": 0.021,
              "pointsFor": 19.4,
              "pointsAgainst": 22.2
            },
            "ranks": {
              "passOffEpa": 24,
              "turnoverDiff": 17,
              "passDefEpa": 6,
              "rushDefEpa": 27,
              "pointsFor": 26,
              "pointsAgainst": 13
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "KC",
            "values": {
              "passOffEpa": 0.167,
              "turnoverDiff": 1.25,
              "passDefEpa": -0.007,
              "rushDefEpa": -0.085,
              "pointsFor": 29.5,
              "pointsAgainst": 19.25
            },
            "ranks": {
              "passOffEpa": 8,
              "turnoverDiff": 1,
              "passDefEpa": 9,
              "rushDefEpa": 13,
              "pointsFor": 5,
              "pointsAgainst": 7
            },
            "gamesPlayed": 4
          },
          {
            "abbr": "LV",
            "values": {
              "passOffEpa": 0.164,
              "turnoverDiff": 0.6,
              "passDefEpa": 0.128,
              "rushDefEpa": -0.072,
              "pointsFor": 26.4,
              "pointsAgainst": 25.8
            },
            "ranks": {
              "passOffEpa": 9,
              "turnoverDiff": 10,
              "passDefEpa": 25,
              "rushDefEpa": 14,
              "pointsFor": 9,
              "pointsAgainst": 22
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "LAC",
            "values": {
              "passOffEpa": -0.156,
              "turnoverDiff": -1,
              "passDefEpa": 0.025,
              "rushDefEpa": -0.119,
              "pointsFor": 16.8,
              "pointsAgainst": 25.8
            },
            "ranks": {
              "passOffEpa": 32,
              "turnoverDiff": 29,
              "passDefEpa": 15,
              "rushDefEpa": 8,
              "pointsFor": 30,
              "pointsAgainst": 23
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "DAL",
            "values": {
              "passOffEpa": 0.189,
              "turnoverDiff": -0.6,
              "passDefEpa": 0.352,
              "rushDefEpa": 0,
              "pointsFor": 27.6,
              "pointsAgainst": 27.2
            },
            "ranks": {
              "passOffEpa": 7,
              "turnoverDiff": 22,
              "passDefEpa": 32,
              "rushDefEpa": 22,
              "pointsFor": 7,
              "pointsAgainst": 25
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "NYG",
            "values": {
              "passOffEpa": 0.078,
              "turnoverDiff": 0.2,
              "passDefEpa": 0.022,
              "rushDefEpa": 0.034,
              "pointsFor": 21.8,
              "pointsAgainst": 21.2
            },
            "ranks": {
              "passOffEpa": 14,
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
              "passOffEpa": -0.038,
              "turnoverDiff": -0.4,
              "passDefEpa": 0.117,
              "rushDefEpa": -0.035,
              "pointsFor": 18.4,
              "pointsAgainst": 22.4
            },
            "ranks": {
              "passOffEpa": 25,
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
              "passOffEpa": 0.009,
              "turnoverDiff": 1,
              "passDefEpa": 0.093,
              "rushDefEpa": -0.042,
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
              "passOffEpa": 0.065,
              "turnoverDiff": -0.8,
              "passDefEpa": 0.072,
              "rushDefEpa": -0.003,
              "pointsFor": 23.8,
              "pointsAgainst": 19.2
            },
            "ranks": {
              "passOffEpa": 16,
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
              "passOffEpa": 0.274,
              "turnoverDiff": 0.8,
              "passDefEpa": 0.193,
              "rushDefEpa": -0.024,
              "pointsFor": 32.8,
              "pointsAgainst": 29.6
            },
            "ranks": {
              "passOffEpa": 2,
              "turnoverDiff": 5,
              "passDefEpa": 28,
              "rushDefEpa": 19,
              "pointsFor": 2,
              "pointsAgainst": 29
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "GB",
            "values": {
              "passOffEpa": 0.095,
              "turnoverDiff": 0.6,
              "passDefEpa": -0.017,
              "rushDefEpa": 0.001,
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
              "passOffEpa": -0.005,
              "turnoverDiff": 1.2,
              "passDefEpa": -0.199,
              "rushDefEpa": -0.12,
              "pointsFor": 21.8,
              "pointsAgainst": 12.8
            },
            "ranks": {
              "passOffEpa": 23,
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
              "passOffEpa": -0.089,
              "turnoverDiff": -1,
              "passDefEpa": 0.042,
              "rushDefEpa": -0.093,
              "pointsFor": 23.8,
              "pointsAgainst": 24.4
            },
            "ranks": {
              "passOffEpa": 27,
              "turnoverDiff": 30,
              "passDefEpa": 18,
              "rushDefEpa": 11,
              "pointsFor": 14,
              "pointsAgainst": 21
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "CAR",
            "values": {
              "passOffEpa": 0.2,
              "turnoverDiff": 0.75,
              "passDefEpa": 0.046,
              "rushDefEpa": 0.045,
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
              "passOffEpa": 0.003,
              "turnoverDiff": -1.2,
              "passDefEpa": 0.186,
              "rushDefEpa": 0.022,
              "pointsFor": 23.6,
              "pointsAgainst": 30.2
            },
            "ranks": {
              "passOffEpa": 21,
              "turnoverDiff": 32,
              "passDefEpa": 27,
              "rushDefEpa": 28,
              "pointsFor": 16,
              "pointsAgainst": 31
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "TB",
            "values": {
              "passOffEpa": -0.137,
              "turnoverDiff": -0.4,
              "passDefEpa": 0.009,
              "rushDefEpa": -0.129,
              "pointsFor": 20,
              "pointsAgainst": 22.4
            },
            "ranks": {
              "passOffEpa": 29,
              "turnoverDiff": 21,
              "passDefEpa": 12,
              "rushDefEpa": 2,
              "pointsFor": 25,
              "pointsAgainst": 18
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "ARI",
            "values": {
              "passOffEpa": 0.001,
              "turnoverDiff": 0.4,
              "passDefEpa": 0.318,
              "rushDefEpa": -0.101,
              "pointsFor": 21.6,
              "pointsAgainst": 32.4
            },
            "ranks": {
              "passOffEpa": 22,
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
              "passOffEpa": 0.129,
              "turnoverDiff": -0.6,
              "passDefEpa": -0.053,
              "rushDefEpa": 0.01,
              "pointsFor": 23.8,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 11,
              "turnoverDiff": 23,
              "passDefEpa": 3,
              "rushDefEpa": 26,
              "pointsFor": 15,
              "pointsAgainst": 20
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "SF",
            "values": {
              "passOffEpa": 0.355,
              "turnoverDiff": 0.4,
              "passDefEpa": 0.021,
              "rushDefEpa": -0.12,
              "pointsFor": 30.8,
              "pointsAgainst": 18.6
            },
            "ranks": {
              "passOffEpa": 1,
              "turnoverDiff": 15,
              "passDefEpa": 13,
              "rushDefEpa": 7,
              "pointsFor": 3,
              "pointsAgainst": 3
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "SEA",
            "values": {
              "passOffEpa": 0.057,
              "turnoverDiff": 0.4,
              "passDefEpa": -0.086,
              "rushDefEpa": -0.121,
              "pointsFor": 26.8,
              "pointsAgainst": 21
            },
            "ranks": {
              "passOffEpa": 17,
              "turnoverDiff": 16,
              "passDefEpa": 2,
              "rushDefEpa": 5,
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
              "passOffEpa": 0.318,
              "turnoverDiff": -2,
              "passDefEpa": 0.29,
              "rushDefEpa": 0.006,
              "pointsFor": 37,
              "pointsAgainst": 34
            },
            "ranks": {
              "passOffEpa": 5,
              "turnoverDiff": 24,
              "passDefEpa": 25,
              "rushDefEpa": 22,
              "pointsFor": 3,
              "pointsAgainst": 26
            }
          },
          {
            "abbr": "MIA",
            "values": {
              "passOffEpa": -0.281,
              "turnoverDiff": -2,
              "passDefEpa": 0.383,
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
              "passOffEpa": 0.725,
              "turnoverDiff": 0,
              "passDefEpa": 0.2,
              "rushDefEpa": -0.246,
              "pointsFor": 45,
              "pointsAgainst": 17
            },
            "ranks": {
              "passOffEpa": 1,
              "turnoverDiff": 12,
              "passDefEpa": 21,
              "rushDefEpa": 3,
              "pointsFor": 1,
              "pointsAgainst": 6
            }
          },
          {
            "abbr": "NYJ",
            "values": {
              "passOffEpa": -0.271,
              "turnoverDiff": 0,
              "passDefEpa": -0.258,
              "rushDefEpa": -0.231,
              "pointsFor": 17,
              "pointsAgainst": 12
            },
            "ranks": {
              "passOffEpa": 26,
              "turnoverDiff": 13,
              "passDefEpa": 8,
              "rushDefEpa": 6,
              "pointsFor": 22,
              "pointsAgainst": 3
            }
          },
          {
            "abbr": "BAL",
            "values": {
              "passOffEpa": 0.089,
              "turnoverDiff": 0,
              "passDefEpa": 0.099,
              "rushDefEpa": -0.238,
              "pointsFor": 30,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 16,
              "turnoverDiff": 14,
              "passDefEpa": 16,
              "rushDefEpa": 5,
              "pointsFor": 9,
              "pointsAgainst": 13
            }
          },
          {
            "abbr": "CIN",
            "values": {
              "passOffEpa": 0.383,
              "turnoverDiff": 2,
              "passDefEpa": -0.281,
              "rushDefEpa": 0.205,
              "pointsFor": 31,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 4,
              "turnoverDiff": 3,
              "passDefEpa": 4,
              "rushDefEpa": 27,
              "pointsFor": 7,
              "pointsAgainst": 16
            }
          },
          {
            "abbr": "CLE",
            "values": {
              "passOffEpa": -0.258,
              "turnoverDiff": 0,
              "passDefEpa": -0.271,
              "rushDefEpa": -0.014,
              "pointsFor": 12,
              "pointsAgainst": 17
            },
            "ranks": {
              "passOffEpa": 23,
              "turnoverDiff": 15,
              "passDefEpa": 5,
              "rushDefEpa": 20,
              "pointsFor": 28,
              "pointsAgainst": 7
            }
          },
          {
            "abbr": "PIT",
            "values": {
              "passOffEpa": 0.128,
              "turnoverDiff": 0,
              "passDefEpa": -0.034,
              "rushDefEpa": -0.003,
              "pointsFor": 34,
              "pointsAgainst": 22
            },
            "ranks": {
              "passOffEpa": 13,
              "turnoverDiff": 16,
              "passDefEpa": 12,
              "rushDefEpa": 21,
              "pointsFor": 4,
              "pointsAgainst": 12
            }
          },
          {
            "abbr": "HOU",
            "values": {
              "passOffEpa": 0.246,
              "turnoverDiff": 2,
              "passDefEpa": -0.354,
              "rushDefEpa": -0.246,
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
              "passOffEpa": -0.034,
              "turnoverDiff": 0,
              "passDefEpa": 0.128,
              "rushDefEpa": 0.26,
              "pointsFor": 22,
              "pointsAgainst": 34
            },
            "ranks": {
              "passOffEpa": 19,
              "turnoverDiff": 17,
              "passDefEpa": 18,
              "rushDefEpa": 29,
              "pointsFor": 19,
              "pointsAgainst": 27
            }
          },
          {
            "abbr": "JAX",
            "values": {
              "passOffEpa": 0.241,
              "turnoverDiff": -1,
              "passDefEpa": 0.002,
              "rushDefEpa": -0.507,
              "pointsFor": 19,
              "pointsAgainst": 17
            },
            "ranks": {
              "passOffEpa": 8,
              "turnoverDiff": 20,
              "passDefEpa": 14,
              "rushDefEpa": 1,
              "pointsFor": 21,
              "pointsAgainst": 8
            }
          },
          {
            "abbr": "TEN",
            "values": {
              "passOffEpa": -0.354,
              "turnoverDiff": -2,
              "passDefEpa": 0.246,
              "rushDefEpa": -0.173,
              "pointsFor": 3,
              "pointsAgainst": 26
            },
            "ranks": {
              "passOffEpa": 29,
              "turnoverDiff": 26,
              "passDefEpa": 24,
              "rushDefEpa": 11,
              "pointsFor": 30,
              "pointsAgainst": 18
            }
          },
          {
            "abbr": "DEN",
            "values": {
              "passOffEpa": -0.209,
              "turnoverDiff": 2,
              "passDefEpa": -0.264,
              "rushDefEpa": -0.191,
              "pointsFor": 23,
              "pointsAgainst": 17
            },
            "ranks": {
              "passOffEpa": 22,
              "turnoverDiff": 5,
              "passDefEpa": 7,
              "rushDefEpa": 9,
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
              "passOffEpa": 0.2,
              "turnoverDiff": 0,
              "passDefEpa": 0.725,
              "rushDefEpa": -0.072,
              "pointsFor": 17,
              "pointsAgainst": 45
            },
            "ranks": {
              "passOffEpa": 10,
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
              "passOffEpa": -0.264,
              "turnoverDiff": -2,
              "passDefEpa": -0.209,
              "rushDefEpa": -0.221,
              "pointsFor": 17,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 24,
              "turnoverDiff": 27,
              "passDefEpa": 9,
              "rushDefEpa": 7,
              "pointsFor": 24,
              "pointsAgainst": 14
            }
          },
          {
            "abbr": "DAL",
            "values": {
              "passOffEpa": -0.047,
              "turnoverDiff": -3,
              "passDefEpa": 0.186,
              "rushDefEpa": 0.093,
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
              "passOffEpa": 0.168,
              "turnoverDiff": -2,
              "passDefEpa": -0.08,
              "rushDefEpa": 0.269,
              "pointsFor": 27,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 12,
              "turnoverDiff": 28,
              "passDefEpa": 10,
              "rushDefEpa": 30,
              "pointsFor": 11,
              "pointsAgainst": 19
            }
          },
          {
            "abbr": "PHI",
            "values": {
              "passOffEpa": 0.002,
              "turnoverDiff": 1,
              "passDefEpa": 0.241,
              "rushDefEpa": -0.208,
              "pointsFor": 17,
              "pointsAgainst": 19
            },
            "ranks": {
              "passOffEpa": 17,
              "turnoverDiff": 8,
              "passDefEpa": 23,
              "rushDefEpa": 8,
              "pointsFor": 25,
              "pointsAgainst": 10
            }
          },
          {
            "abbr": "WSH",
            "values": {
              "passOffEpa": -0.08,
              "turnoverDiff": 2,
              "passDefEpa": 0.168,
              "rushDefEpa": -0.164,
              "pointsFor": 27,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 21,
              "turnoverDiff": 6,
              "passDefEpa": 19,
              "rushDefEpa": 12,
              "pointsFor": 12,
              "pointsAgainst": 20
            }
          },
          {
            "abbr": "CHI",
            "values": {
              "passOffEpa": -0.311,
              "turnoverDiff": -5,
              "passDefEpa": 0.403,
              "rushDefEpa": -0.15,
              "pointsFor": 7,
              "pointsAgainst": 31
            },
            "ranks": {
              "passOffEpa": 28,
              "turnoverDiff": 30,
              "passDefEpa": 28,
              "rushDefEpa": 13,
              "pointsFor": 29,
              "pointsAgainst": 24
            }
          },
          {
            "abbr": "DET",
            "values": {
              "passOffEpa": 0.432,
              "turnoverDiff": 1,
              "passDefEpa": 0.1,
              "rushDefEpa": -0.19,
              "pointsFor": 45,
              "pointsAgainst": 21
            },
            "ranks": {
              "passOffEpa": 2,
              "turnoverDiff": 9,
              "passDefEpa": 17,
              "rushDefEpa": 10,
              "pointsFor": 2,
              "pointsAgainst": 11
            }
          },
          {
            "abbr": "GB",
            "values": {
              "passOffEpa": 0.403,
              "turnoverDiff": 5,
              "passDefEpa": -0.311,
              "rushDefEpa": -0.034,
              "pointsFor": 31,
              "pointsAgainst": 7
            },
            "ranks": {
              "passOffEpa": 3,
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
              "passOffEpa": 0.21,
              "turnoverDiff": 1,
              "passDefEpa": -0.36,
              "rushDefEpa": -0.119,
              "pointsFor": 23,
              "pointsAgainst": 13
            },
            "ranks": {
              "passOffEpa": 9,
              "turnoverDiff": 10,
              "passDefEpa": 1,
              "rushDefEpa": 16,
              "pointsFor": 17,
              "pointsAgainst": 4
            }
          },
          {
            "abbr": "ATL",
            "values": {
              "passOffEpa": 0.099,
              "turnoverDiff": 0,
              "passDefEpa": 0.089,
              "rushDefEpa": 0.171,
              "pointsFor": 23,
              "pointsAgainst": 30
            },
            "ranks": {
              "passOffEpa": 15,
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
              "passOffEpa": -0.36,
              "turnoverDiff": -1,
              "passDefEpa": 0.21,
              "rushDefEpa": -0.15,
              "pointsFor": 13,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 30,
              "turnoverDiff": 21,
              "passDefEpa": 22,
              "rushDefEpa": 14,
              "pointsFor": 27,
              "pointsAgainst": 15
            }
          },
          {
            "abbr": "TB",
            "values": {
              "passOffEpa": 0.186,
              "turnoverDiff": 3,
              "passDefEpa": -0.047,
              "rushDefEpa": 0.04,
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
              "passDefEpa": 0.432,
              "rushDefEpa": 0.138,
              "pointsFor": 21,
              "pointsAgainst": 45
            },
            "ranks": {
              "passOffEpa": 14,
              "turnoverDiff": 22,
              "passDefEpa": 29,
              "rushDefEpa": 25,
              "pointsFor": 20,
              "pointsAgainst": 30
            }
          },
          {
            "abbr": "LAR",
            "values": {
              "passOffEpa": 0.29,
              "turnoverDiff": 2,
              "passDefEpa": 0.318,
              "rushDefEpa": 0.22,
              "pointsFor": 34,
              "pointsAgainst": 37
            },
            "ranks": {
              "passOffEpa": 6,
              "turnoverDiff": 7,
              "passDefEpa": 26,
              "rushDefEpa": 28,
              "pointsFor": 5,
              "pointsAgainst": 28
            }
          },
          {
            "abbr": "SF",
            "values": {
              "passOffEpa": -0.026,
              "turnoverDiff": 1,
              "passDefEpa": -0.268,
              "rushDefEpa": -0.482,
              "pointsFor": 32,
              "pointsAgainst": 29
            },
            "ranks": {
              "passOffEpa": 18,
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
              "passOffEpa": -0.268,
              "turnoverDiff": -1,
              "passDefEpa": -0.026,
              "rushDefEpa": -0.141,
              "pointsFor": 29,
              "pointsAgainst": 32
            },
            "ranks": {
              "passOffEpa": 25,
              "turnoverDiff": 23,
              "passDefEpa": 13,
              "rushDefEpa": 15,
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
              "passOffEpa": 0.233,
              "turnoverDiff": -0.5,
              "passDefEpa": 0.189,
              "rushDefEpa": -0.011,
              "pointsFor": 32.83,
              "pointsAgainst": 28.5
            },
            "ranks": {
              "passOffEpa": 4,
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
              "passOffEpa": -0.155,
              "turnoverDiff": -0.8,
              "passDefEpa": 0.293,
              "rushDefEpa": -0.126,
              "pointsFor": 14,
              "pointsAgainst": 26.4
            },
            "ranks": {
              "passOffEpa": 30,
              "turnoverDiff": 28,
              "passDefEpa": 31,
              "rushDefEpa": 4,
              "pointsFor": 31,
              "pointsAgainst": 24
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "NE",
            "values": {
              "passOffEpa": 0.141,
              "turnoverDiff": -1,
              "passDefEpa": 0.045,
              "rushDefEpa": -0.04,
              "pointsFor": 22.67,
              "pointsAgainst": 18.83
            },
            "ranks": {
              "passOffEpa": 10,
              "turnoverDiff": 30,
              "passDefEpa": 18,
              "rushDefEpa": 17,
              "pointsFor": 18,
              "pointsAgainst": 5
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "NYJ",
            "values": {
              "passOffEpa": 0.058,
              "turnoverDiff": 0.67,
              "passDefEpa": 0.051,
              "rushDefEpa": -0.133,
              "pointsFor": 18.67,
              "pointsAgainst": 20.33
            },
            "ranks": {
              "passOffEpa": 16,
              "turnoverDiff": 6,
              "passDefEpa": 19,
              "rushDefEpa": 2,
              "pointsFor": 27,
              "pointsAgainst": 7
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "BAL",
            "values": {
              "passOffEpa": 0.223,
              "turnoverDiff": 0.33,
              "passDefEpa": 0.061,
              "rushDefEpa": -0.057,
              "pointsFor": 26,
              "pointsAgainst": 22
            },
            "ranks": {
              "passOffEpa": 5,
              "turnoverDiff": 13,
              "passDefEpa": 21,
              "rushDefEpa": 15,
              "pointsFor": 7,
              "pointsAgainst": 15
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "CIN",
            "values": {
              "passOffEpa": 0.148,
              "turnoverDiff": 0.4,
              "passDefEpa": -0.035,
              "rushDefEpa": -0.001,
              "pointsFor": 25.6,
              "pointsAgainst": 21.8
            },
            "ranks": {
              "passOffEpa": 9,
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
              "passOffEpa": -0.002,
              "turnoverDiff": 0,
              "passDefEpa": -0.011,
              "rushDefEpa": -0.05,
              "pointsFor": 17.67,
              "pointsAgainst": 20.33
            },
            "ranks": {
              "passOffEpa": 22,
              "turnoverDiff": 17,
              "passDefEpa": 10,
              "rushDefEpa": 16,
              "pointsFor": 28,
              "pointsAgainst": 8
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "PIT",
            "values": {
              "passOffEpa": -0.085,
              "turnoverDiff": 0.5,
              "passDefEpa": -0.057,
              "rushDefEpa": -0.024,
              "pointsFor": 22.83,
              "pointsAgainst": 21.33
            },
            "ranks": {
              "passOffEpa": 26,
              "turnoverDiff": 10,
              "passDefEpa": 4,
              "rushDefEpa": 20,
              "pointsFor": 17,
              "pointsAgainst": 12
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "HOU",
            "values": {
              "passOffEpa": 0.114,
              "turnoverDiff": 0.5,
              "passDefEpa": 0.043,
              "rushDefEpa": -0.076,
              "pointsFor": 24,
              "pointsAgainst": 23.83
            },
            "ranks": {
              "passOffEpa": 12,
              "turnoverDiff": 11,
              "passDefEpa": 17,
              "rushDefEpa": 13,
              "pointsFor": 14,
              "pointsAgainst": 20
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "IND",
            "values": {
              "passOffEpa": -0.095,
              "turnoverDiff": -1.33,
              "passDefEpa": 0.057,
              "rushDefEpa": 0.045,
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
              "passOffEpa": 0.249,
              "turnoverDiff": 0.83,
              "passDefEpa": 0.042,
              "rushDefEpa": -0.132,
              "pointsFor": 25.67,
              "pointsAgainst": 17.33
            },
            "ranks": {
              "passOffEpa": 3,
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
              "passOffEpa": -0.141,
              "turnoverDiff": -0.5,
              "passDefEpa": 0.134,
              "rushDefEpa": -0.087,
              "pointsFor": 14,
              "pointsAgainst": 21.5
            },
            "ranks": {
              "passOffEpa": 29,
              "turnoverDiff": 23,
              "passDefEpa": 26,
              "rushDefEpa": 12,
              "pointsFor": 32,
              "pointsAgainst": 13
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "DEN",
            "values": {
              "passOffEpa": -0.053,
              "turnoverDiff": 0.67,
              "passDefEpa": -0.041,
              "rushDefEpa": 0.019,
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
              "passOffEpa": 0.151,
              "turnoverDiff": 1,
              "passDefEpa": -0.067,
              "rushDefEpa": -0.088,
              "pointsFor": 28,
              "pointsAgainst": 16.6
            },
            "ranks": {
              "passOffEpa": 8,
              "turnoverDiff": 2,
              "passDefEpa": 3,
              "rushDefEpa": 11,
              "pointsFor": 5,
              "pointsAgainst": 2
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "LV",
            "values": {
              "passOffEpa": 0.177,
              "turnoverDiff": 0.33,
              "passDefEpa": 0.144,
              "rushDefEpa": -0.065,
              "pointsFor": 27,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 6,
              "turnoverDiff": 14,
              "passDefEpa": 27,
              "rushDefEpa": 14,
              "pointsFor": 6,
              "pointsAgainst": 26
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "LAC",
            "values": {
              "passOffEpa": -0.182,
              "turnoverDiff": -0.83,
              "passDefEpa": 0.033,
              "rushDefEpa": -0.091,
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
              "passOffEpa": 0.124,
              "turnoverDiff": -0.67,
              "passDefEpa": 0.296,
              "rushDefEpa": -0.016,
              "pointsFor": 25.17,
              "pointsAgainst": 26.5
            },
            "ranks": {
              "passOffEpa": 11,
              "turnoverDiff": 27,
              "passDefEpa": 32,
              "rushDefEpa": 22,
              "pointsFor": 11,
              "pointsAgainst": 25
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "NYG",
            "values": {
              "passOffEpa": 0.036,
              "turnoverDiff": -0.33,
              "passDefEpa": 0.026,
              "rushDefEpa": 0.019,
              "pointsFor": 22.67,
              "pointsAgainst": 23.33
            },
            "ranks": {
              "passOffEpa": 17,
              "turnoverDiff": 19,
              "passDefEpa": 13,
              "rushDefEpa": 28,
              "pointsFor": 19,
              "pointsAgainst": 19
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "PHI",
            "values": {
              "passOffEpa": -0.06,
              "turnoverDiff": -0.33,
              "passDefEpa": 0.11,
              "rushDefEpa": -0.032,
              "pointsFor": 17.67,
              "pointsAgainst": 22.83
            },
            "ranks": {
              "passOffEpa": 25,
              "turnoverDiff": 20,
              "passDefEpa": 24,
              "rushDefEpa": 18,
              "pointsFor": 29,
              "pointsAgainst": 16
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "WSH",
            "values": {
              "passOffEpa": 0.018,
              "turnoverDiff": 1,
              "passDefEpa": 0.092,
              "rushDefEpa": 0.052,
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
              "passOffEpa": 0.09,
              "turnoverDiff": -0.33,
              "passDefEpa": 0.024,
              "rushDefEpa": -0.027,
              "pointsFor": 25,
              "pointsAgainst": 19.83
            },
            "ranks": {
              "passOffEpa": 15,
              "turnoverDiff": 21,
              "passDefEpa": 12,
              "rushDefEpa": 19,
              "pointsFor": 12,
              "pointsAgainst": 6
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "DET",
            "values": {
              "passOffEpa": 0.274,
              "turnoverDiff": 0.8,
              "passDefEpa": 0.193,
              "rushDefEpa": -0.024,
              "pointsFor": 32.8,
              "pointsAgainst": 29.6
            },
            "ranks": {
              "passOffEpa": 2,
              "turnoverDiff": 5,
              "passDefEpa": 29,
              "rushDefEpa": 21,
              "pointsFor": 2,
              "pointsAgainst": 30
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "GB",
            "values": {
              "passOffEpa": 0.098,
              "turnoverDiff": 0.67,
              "passDefEpa": -0.039,
              "rushDefEpa": -0.002,
              "pointsFor": 21.17,
              "pointsAgainst": 20.83
            },
            "ranks": {
              "passOffEpa": 14,
              "turnoverDiff": 8,
              "passDefEpa": 7,
              "rushDefEpa": 25,
              "pointsFor": 23,
              "pointsAgainst": 11
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "MIN",
            "values": {
              "passOffEpa": -0.005,
              "turnoverDiff": 1.2,
              "passDefEpa": -0.199,
              "rushDefEpa": -0.12,
              "pointsFor": 21.8,
              "pointsAgainst": 12.8
            },
            "ranks": {
              "passOffEpa": 23,
              "turnoverDiff": 1,
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
              "passOffEpa": -0.102,
              "turnoverDiff": -1.17,
              "passDefEpa": 0.067,
              "rushDefEpa": -0.138,
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
              "passOffEpa": 0.177,
              "turnoverDiff": 0.6,
              "passDefEpa": 0.003,
              "rushDefEpa": 0.03,
              "pointsFor": 29.2,
              "pointsAgainst": 24.6
            },
            "ranks": {
              "passOffEpa": 7,
              "turnoverDiff": 9,
              "passDefEpa": 11,
              "rushDefEpa": 30,
              "pointsFor": 4,
              "pointsAgainst": 21
            },
            "gamesPlayed": 5
          },
          {
            "abbr": "NO",
            "values": {
              "passOffEpa": 0.008,
              "turnoverDiff": -0.5,
              "passDefEpa": 0.115,
              "rushDefEpa": 0.027,
              "pointsFor": 25.33,
              "pointsAgainst": 29.67
            },
            "ranks": {
              "passOffEpa": 20,
              "turnoverDiff": 24,
              "passDefEpa": 25,
              "rushDefEpa": 29,
              "pointsFor": 10,
              "pointsAgainst": 31
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "TB",
            "values": {
              "passOffEpa": -0.19,
              "turnoverDiff": -0.5,
              "passDefEpa": -0.039,
              "rushDefEpa": -0.111,
              "pointsFor": 19.83,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 32,
              "turnoverDiff": 25,
              "passDefEpa": 8,
              "rushDefEpa": 7,
              "pointsFor": 25,
              "pointsAgainst": 17
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "ARI",
            "values": {
              "passOffEpa": 0.003,
              "turnoverDiff": 0.33,
              "passDefEpa": 0.248,
              "rushDefEpa": -0.099,
              "pointsFor": 21,
              "pointsAgainst": 29.67
            },
            "ranks": {
              "passOffEpa": 21,
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
              "passOffEpa": 0.106,
              "turnoverDiff": -0.5,
              "passDefEpa": -0.041,
              "rushDefEpa": -0.009,
              "pointsFor": 22.5,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 13,
              "turnoverDiff": 26,
              "passDefEpa": 6,
              "rushDefEpa": 24,
              "pointsFor": 20,
              "pointsAgainst": 18
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "SF",
            "values": {
              "passOffEpa": 0.307,
              "turnoverDiff": 0.17,
              "passDefEpa": 0.027,
              "rushDefEpa": -0.125,
              "pointsFor": 29.5,
              "pointsAgainst": 18.33
            },
            "ranks": {
              "passOffEpa": 1,
              "turnoverDiff": 16,
              "passDefEpa": 14,
              "rushDefEpa": 5,
              "pointsFor": 3,
              "pointsAgainst": 4
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "SEA",
            "values": {
              "passOffEpa": 0.016,
              "turnoverDiff": -0.17,
              "passDefEpa": -0.096,
              "rushDefEpa": -0.107,
              "pointsFor": 24.67,
              "pointsAgainst": 20.33
            },
            "ranks": {
              "passOffEpa": 19,
              "turnoverDiff": 18,
              "passDefEpa": 2,
              "rushDefEpa": 8,
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
              "passOffEpa": 0.224,
              "turnoverDiff": 1,
              "passDefEpa": 0.238,
              "rushDefEpa": -0.252,
              "pointsFor": 33,
              "pointsAgainst": 30
            },
            "ranks": {
              "passOffEpa": 5,
              "turnoverDiff": 5,
              "passDefEpa": 25,
              "rushDefEpa": 3,
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
              "passOffEpa": 0.366,
              "turnoverDiff": -1,
              "passDefEpa": 0.122,
              "rushDefEpa": -0.245,
              "pointsFor": 26,
              "pointsAgainst": 19
            },
            "ranks": {
              "passOffEpa": 1,
              "turnoverDiff": 19,
              "passDefEpa": 21,
              "rushDefEpa": 4,
              "pointsFor": 8,
              "pointsAgainst": 11
            }
          },
          {
            "abbr": "NYJ",
            "values": {
              "passOffEpa": 0.122,
              "turnoverDiff": 1,
              "passDefEpa": 0.366,
              "rushDefEpa": -0.155,
              "pointsFor": 19,
              "pointsAgainst": 26
            },
            "ranks": {
              "passOffEpa": 8,
              "turnoverDiff": 6,
              "passDefEpa": 28,
              "rushDefEpa": 7,
              "pointsFor": 17,
              "pointsAgainst": 19
            }
          },
          {
            "abbr": "BAL",
            "values": {
              "passOffEpa": 0.123,
              "turnoverDiff": -1,
              "passDefEpa": -0.17,
              "rushDefEpa": -0.003,
              "pointsFor": 10,
              "pointsAgainst": 13
            },
            "ranks": {
              "passOffEpa": 7,
              "turnoverDiff": 20,
              "passDefEpa": 4,
              "rushDefEpa": 22,
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
              "passOffEpa": -0.17,
              "turnoverDiff": 1,
              "passDefEpa": 0.123,
              "rushDefEpa": -0.378,
              "pointsFor": 13,
              "pointsAgainst": 10
            },
            "ranks": {
              "passOffEpa": 25,
              "turnoverDiff": 7,
              "passDefEpa": 22,
              "rushDefEpa": 1,
              "pointsFor": 25,
              "pointsAgainst": 2
            }
          },
          {
            "abbr": "PIT",
            "values": {
              "passOffEpa": -0.191,
              "turnoverDiff": 1,
              "passDefEpa": -0.375,
              "rushDefEpa": -0.013,
              "pointsFor": 26,
              "pointsAgainst": 19
            },
            "ranks": {
              "passOffEpa": 26,
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
              "passOffEpa": 0.365,
              "turnoverDiff": 0,
              "passDefEpa": 0.262,
              "rushDefEpa": 0.01,
              "pointsFor": 34,
              "pointsAgainst": 31
            },
            "ranks": {
              "passOffEpa": 2,
              "turnoverDiff": 11,
              "passDefEpa": 26,
              "rushDefEpa": 25,
              "pointsFor": 1,
              "pointsAgainst": 24
            }
          },
          {
            "abbr": "IND",
            "values": {
              "passOffEpa": -0.068,
              "turnoverDiff": -2,
              "passDefEpa": -0.15,
              "rushDefEpa": -0.099,
              "pointsFor": 20,
              "pointsAgainst": 26
            },
            "ranks": {
              "passOffEpa": 17,
              "turnoverDiff": 25,
              "passDefEpa": 7,
              "rushDefEpa": 11,
              "pointsFor": 16,
              "pointsAgainst": 20
            }
          },
          {
            "abbr": "JAX",
            "values": {
              "passOffEpa": 0.262,
              "turnoverDiff": 0,
              "passDefEpa": 0.365,
              "rushDefEpa": 0.006,
              "pointsFor": 31,
              "pointsAgainst": 34
            },
            "ranks": {
              "passOffEpa": 3,
              "turnoverDiff": 12,
              "passDefEpa": 27,
              "rushDefEpa": 24,
              "pointsFor": 4,
              "pointsAgainst": 27
            }
          },
          {
            "abbr": "TEN",
            "values": {
              "passOffEpa": -0.15,
              "turnoverDiff": 2,
              "passDefEpa": -0.068,
              "rushDefEpa": -0.088,
              "pointsFor": 26,
              "pointsAgainst": 20
            },
            "ranks": {
              "passOffEpa": 22,
              "turnoverDiff": 3,
              "passDefEpa": 12,
              "rushDefEpa": 12,
              "pointsFor": 10,
              "pointsAgainst": 13
            }
          },
          {
            "abbr": "DEN",
            "values": {
              "passOffEpa": -0.154,
              "turnoverDiff": 3,
              "passDefEpa": -0.098,
              "rushDefEpa": 0.003,
              "pointsFor": 17,
              "pointsAgainst": 14
            },
            "ranks": {
              "passOffEpa": 24,
              "turnoverDiff": 1,
              "passDefEpa": 11,
              "rushDefEpa": 23,
              "pointsFor": 20,
              "pointsAgainst": 5
            }
          },
          {
            "abbr": "KC",
            "values": {
              "passOffEpa": 0.077,
              "turnoverDiff": 0,
              "passDefEpa": -0.286,
              "rushDefEpa": -0.102,
              "pointsFor": 22,
              "pointsAgainst": 6
            },
            "ranks": {
              "passOffEpa": 12,
              "turnoverDiff": 13,
              "passDefEpa": 2,
              "rushDefEpa": 10,
              "pointsFor": 15,
              "pointsAgainst": 1
            }
          },
          {
            "abbr": "LV",
            "values": {
              "passOffEpa": 0.238,
              "turnoverDiff": -1,
              "passDefEpa": 0.224,
              "rushDefEpa": -0.031,
              "pointsFor": 30,
              "pointsAgainst": 33
            },
            "ranks": {
              "passOffEpa": 4,
              "turnoverDiff": 21,
              "passDefEpa": 24,
              "rushDefEpa": 17,
              "pointsFor": 6,
              "pointsAgainst": 26
            }
          },
          {
            "abbr": "LAC",
            "values": {
              "passOffEpa": -0.286,
              "turnoverDiff": 0,
              "passDefEpa": 0.077,
              "rushDefEpa": 0.074,
              "pointsFor": 6,
              "pointsAgainst": 22
            },
            "ranks": {
              "passOffEpa": 27,
              "turnoverDiff": 14,
              "passDefEpa": 17,
              "rushDefEpa": 27,
              "pointsFor": 28,
              "pointsAgainst": 14
            }
          },
          {
            "abbr": "DAL",
            "values": {
              "passOffEpa": -0.108,
              "turnoverDiff": -1,
              "passDefEpa": 0.111,
              "rushDefEpa": -0.117,
              "pointsFor": 13,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 19,
              "turnoverDiff": 22,
              "passDefEpa": 20,
              "rushDefEpa": 8,
              "pointsFor": 26,
              "pointsAgainst": 15
            }
          },
          {
            "abbr": "NYG",
            "values": {
              "passOffEpa": -0.109,
              "turnoverDiff": -3,
              "passDefEpa": 0.044,
              "rushDefEpa": -0.027,
              "pointsFor": 27,
              "pointsAgainst": 34
            },
            "ranks": {
              "passOffEpa": 20,
              "turnoverDiff": 27,
              "passDefEpa": 15,
              "rushDefEpa": 18,
              "pointsFor": 7,
              "pointsAgainst": 28
            }
          },
          {
            "abbr": "PHI",
            "values": {
              "passOffEpa": -0.135,
              "turnoverDiff": 0,
              "passDefEpa": 0.08,
              "rushDefEpa": -0.021,
              "pointsFor": 14,
              "pointsAgainst": 25
            },
            "ranks": {
              "passOffEpa": 21,
              "turnoverDiff": 15,
              "passDefEpa": 18,
              "rushDefEpa": 20,
              "pointsFor": 23,
              "pointsAgainst": 18
            }
          },
          {
            "abbr": "WSH",
            "values": {
              "passOffEpa": 0.055,
              "turnoverDiff": 1,
              "passDefEpa": 0.082,
              "rushDefEpa": 0.447,
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
              "passOffEpa": 0.204,
              "turnoverDiff": 2,
              "passDefEpa": -0.153,
              "rushDefEpa": -0.239,
              "pointsFor": 31,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 6,
              "turnoverDiff": 4,
              "passDefEpa": 6,
              "rushDefEpa": 5,
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
              "passOffEpa": 0.111,
              "turnoverDiff": 1,
              "passDefEpa": -0.108,
              "rushDefEpa": -0.038,
              "pointsFor": 23,
              "pointsAgainst": 13
            },
            "ranks": {
              "passOffEpa": 9,
              "turnoverDiff": 10,
              "passDefEpa": 10,
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
              "passOffEpa": -0.153,
              "turnoverDiff": -2,
              "passDefEpa": 0.204,
              "rushDefEpa": -0.285,
              "pointsFor": 23,
              "pointsAgainst": 31
            },
            "ranks": {
              "passOffEpa": 23,
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
              "passOffEpa": 0.08,
              "turnoverDiff": 0,
              "passDefEpa": -0.135,
              "rushDefEpa": -0.105,
              "pointsFor": 25,
              "pointsAgainst": 14
            },
            "ranks": {
              "passOffEpa": 11,
              "turnoverDiff": 16,
              "passDefEpa": 8,
              "rushDefEpa": 9,
              "pointsFor": 11,
              "pointsAgainst": 6
            }
          },
          {
            "abbr": "NO",
            "values": {
              "passOffEpa": 0.044,
              "turnoverDiff": 3,
              "passDefEpa": -0.109,
              "rushDefEpa": 0.067,
              "pointsFor": 34,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 14,
              "turnoverDiff": 2,
              "passDefEpa": 9,
              "rushDefEpa": 26,
              "pointsFor": 2,
              "pointsAgainst": 22
            }
          },
          {
            "abbr": "TB",
            "values": {
              "passOffEpa": -0.375,
              "turnoverDiff": -1,
              "passDefEpa": -0.191,
              "rushDefEpa": -0.022,
              "pointsFor": 19,
              "pointsAgainst": 26
            },
            "ranks": {
              "passOffEpa": 28,
              "turnoverDiff": 23,
              "passDefEpa": 3,
              "rushDefEpa": 19,
              "pointsFor": 18,
              "pointsAgainst": 21
            }
          },
          {
            "abbr": "ARI",
            "values": {
              "passOffEpa": 0.013,
              "turnoverDiff": 0,
              "passDefEpa": -0.042,
              "rushDefEpa": -0.083,
              "pointsFor": 18,
              "pointsAgainst": 16
            },
            "ranks": {
              "passOffEpa": 15,
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
              "passOffEpa": -0.042,
              "turnoverDiff": 0,
              "passDefEpa": 0.013,
              "rushDefEpa": -0.082,
              "pointsFor": 16,
              "pointsAgainst": 18
            },
            "ranks": {
              "passOffEpa": 16,
              "turnoverDiff": 18,
              "passDefEpa": 14,
              "rushDefEpa": 14,
              "pointsFor": 22,
              "pointsAgainst": 10
            }
          },
          {
            "abbr": "SF",
            "values": {
              "passOffEpa": 0.082,
              "turnoverDiff": -1,
              "passDefEpa": 0.055,
              "rushDefEpa": -0.168,
              "pointsFor": 23,
              "pointsAgainst": 17
            },
            "ranks": {
              "passOffEpa": 10,
              "turnoverDiff": 24,
              "passDefEpa": 16,
              "rushDefEpa": 6,
              "pointsFor": 14,
              "pointsAgainst": 8
            }
          },
          {
            "abbr": "SEA",
            "values": {
              "passOffEpa": -0.098,
              "turnoverDiff": -3,
              "passDefEpa": -0.154,
              "rushDefEpa": -0.037,
              "pointsFor": 14,
              "pointsAgainst": 17
            },
            "ranks": {
              "passOffEpa": 18,
              "turnoverDiff": 28,
              "passDefEpa": 5,
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
              "passOffEpa": 0.233,
              "turnoverDiff": -0.5,
              "passDefEpa": 0.189,
              "rushDefEpa": -0.011,
              "pointsFor": 32.83,
              "pointsAgainst": 28.5
            },
            "ranks": {
              "passOffEpa": 4,
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
              "passOffEpa": -0.071,
              "turnoverDiff": -0.5,
              "passDefEpa": 0.298,
              "rushDefEpa": -0.102,
              "pointsFor": 16.33,
              "pointsAgainst": 26.17
            },
            "ranks": {
              "passOffEpa": 28,
              "turnoverDiff": 27,
              "passDefEpa": 32,
              "rushDefEpa": 4,
              "pointsFor": 30,
              "pointsAgainst": 25
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "NE",
            "values": {
              "passOffEpa": 0.164,
              "turnoverDiff": -1,
              "passDefEpa": 0.083,
              "rushDefEpa": -0.043,
              "pointsFor": 22.86,
              "pointsAgainst": 20.43
            },
            "ranks": {
              "passOffEpa": 7,
              "turnoverDiff": 31,
              "passDefEpa": 20,
              "rushDefEpa": 19,
              "pointsFor": 19,
              "pointsAgainst": 9
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "NYJ",
            "values": {
              "passOffEpa": 0.095,
              "turnoverDiff": 0.43,
              "passDefEpa": 0.091,
              "rushDefEpa": -0.087,
              "pointsFor": 19.57,
              "pointsAgainst": 21.43
            },
            "ranks": {
              "passOffEpa": 15,
              "turnoverDiff": 11,
              "passDefEpa": 21,
              "rushDefEpa": 7,
              "pointsFor": 27,
              "pointsAgainst": 13
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "BAL",
            "values": {
              "passOffEpa": 0.2,
              "turnoverDiff": 0.14,
              "passDefEpa": 0.117,
              "rushDefEpa": -0.056,
              "pointsFor": 24.14,
              "pointsAgainst": 23.86
            },
            "ranks": {
              "passOffEpa": 5,
              "turnoverDiff": 14,
              "passDefEpa": 24,
              "rushDefEpa": 15,
              "pointsFor": 12,
              "pointsAgainst": 18
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "CIN",
            "values": {
              "passOffEpa": 0.196,
              "turnoverDiff": 0.5,
              "passDefEpa": -0.014,
              "rushDefEpa": -0.052,
              "pointsFor": 27.17,
              "pointsAgainst": 20.33
            },
            "ranks": {
              "passOffEpa": 6,
              "turnoverDiff": 9,
              "passDefEpa": 8,
              "rushDefEpa": 16,
              "pointsFor": 4,
              "pointsAgainst": 8
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "CLE",
            "values": {
              "passOffEpa": 0.018,
              "turnoverDiff": 0,
              "passDefEpa": 0.011,
              "rushDefEpa": -0.059,
              "pointsFor": 19,
              "pointsAgainst": 20.86
            },
            "ranks": {
              "passOffEpa": 20,
              "turnoverDiff": 16,
              "passDefEpa": 10,
              "rushDefEpa": 12,
              "pointsFor": 28,
              "pointsAgainst": 12
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "PIT",
            "values": {
              "passOffEpa": -0.069,
              "turnoverDiff": 0.57,
              "passDefEpa": -0.016,
              "rushDefEpa": -0.057,
              "pointsFor": 21.86,
              "pointsAgainst": 19.71
            },
            "ranks": {
              "passOffEpa": 27,
              "turnoverDiff": 6,
              "passDefEpa": 6,
              "rushDefEpa": 14,
              "pointsFor": 22,
              "pointsAgainst": 5
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "HOU",
            "values": {
              "passOffEpa": 0.105,
              "turnoverDiff": 0.43,
              "passDefEpa": 0.057,
              "rushDefEpa": -0.013,
              "pointsFor": 23.57,
              "pointsAgainst": 24.29
            },
            "ranks": {
              "passOffEpa": 12,
              "turnoverDiff": 12,
              "passDefEpa": 17,
              "rushDefEpa": 23,
              "pointsFor": 15,
              "pointsAgainst": 19
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "IND",
            "values": {
              "passOffEpa": -0.108,
              "turnoverDiff": -1.29,
              "passDefEpa": 0.047,
              "rushDefEpa": 0.007,
              "pointsFor": 22,
              "pointsAgainst": 25.71
            },
            "ranks": {
              "passOffEpa": 30,
              "turnoverDiff": 32,
              "passDefEpa": 15,
              "rushDefEpa": 28,
              "pointsFor": 20,
              "pointsAgainst": 23
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "JAX",
            "values": {
              "passOffEpa": 0.249,
              "turnoverDiff": 0.83,
              "passDefEpa": 0.042,
              "rushDefEpa": -0.132,
              "pointsFor": 25.67,
              "pointsAgainst": 17.33
            },
            "ranks": {
              "passOffEpa": 3,
              "turnoverDiff": 3,
              "passDefEpa": 14,
              "rushDefEpa": 2,
              "pointsFor": 9,
              "pointsAgainst": 3
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "TEN",
            "values": {
              "passOffEpa": -0.096,
              "turnoverDiff": -0.43,
              "passDefEpa": 0.132,
              "rushDefEpa": -0.046,
              "pointsFor": 15.43,
              "pointsAgainst": 22.29
            },
            "ranks": {
              "passOffEpa": 29,
              "turnoverDiff": 21,
              "passDefEpa": 25,
              "rushDefEpa": 18,
              "pointsFor": 31,
              "pointsAgainst": 15
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "DEN",
            "values": {
              "passOffEpa": -0.033,
              "turnoverDiff": 0.57,
              "passDefEpa": -0.056,
              "rushDefEpa": 0.011,
              "pointsFor": 20.57,
              "pointsAgainst": 20.14
            },
            "ranks": {
              "passOffEpa": 24,
              "turnoverDiff": 7,
              "passDefEpa": 4,
              "rushDefEpa": 29,
              "pointsFor": 24,
              "pointsAgainst": 7
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "KC",
            "values": {
              "passOffEpa": 0.099,
              "turnoverDiff": 0.83,
              "passDefEpa": -0.015,
              "rushDefEpa": -0.072,
              "pointsFor": 23.83,
              "pointsAgainst": 17.17
            },
            "ranks": {
              "passOffEpa": 14,
              "turnoverDiff": 4,
              "passDefEpa": 7,
              "rushDefEpa": 10,
              "pointsFor": 14,
              "pointsAgainst": 2
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "LV",
            "values": {
              "passOffEpa": 0.137,
              "turnoverDiff": 0.57,
              "passDefEpa": 0.148,
              "rushDefEpa": -0.037,
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
              "passOffEpa": -0.182,
              "turnoverDiff": -0.83,
              "passDefEpa": 0.033,
              "rushDefEpa": -0.091,
              "pointsFor": 15,
              "pointsAgainst": 25.17
            },
            "ranks": {
              "passOffEpa": 32,
              "turnoverDiff": 30,
              "passDefEpa": 13,
              "rushDefEpa": 6,
              "pointsFor": 32,
              "pointsAgainst": 22
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "DAL",
            "values": {
              "passOffEpa": 0.152,
              "turnoverDiff": -0.43,
              "passDefEpa": 0.238,
              "rushDefEpa": -0.005,
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
              "passOffEpa": 0.051,
              "turnoverDiff": -0.29,
              "passDefEpa": 0.027,
              "rushDefEpa": 0.005,
              "pointsFor": 23.29,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 18,
              "turnoverDiff": 20,
              "passDefEpa": 12,
              "rushDefEpa": 26,
              "pointsFor": 16,
              "pointsAgainst": 17
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "PHI",
            "values": {
              "passOffEpa": -0.06,
              "turnoverDiff": -0.43,
              "passDefEpa": 0.142,
              "rushDefEpa": 0.006,
              "pointsFor": 18.14,
              "pointsAgainst": 25
            },
            "ranks": {
              "passOffEpa": 26,
              "turnoverDiff": 23,
              "passDefEpa": 26,
              "rushDefEpa": 27,
              "pointsFor": 29,
              "pointsAgainst": 21
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "WSH",
            "values": {
              "passOffEpa": 0.018,
              "turnoverDiff": 1,
              "passDefEpa": 0.092,
              "rushDefEpa": 0.052,
              "pointsFor": 22,
              "pointsAgainst": 28.67
            },
            "ranks": {
              "passOffEpa": 21,
              "turnoverDiff": 2,
              "passDefEpa": 22,
              "rushDefEpa": 31,
              "pointsFor": 21,
              "pointsAgainst": 31
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "CHI",
            "values": {
              "passOffEpa": 0.119,
              "turnoverDiff": -0.14,
              "passDefEpa": 0.068,
              "rushDefEpa": -0.036,
              "pointsFor": 25.71,
              "pointsAgainst": 20.43
            },
            "ranks": {
              "passOffEpa": 10,
              "turnoverDiff": 17,
              "passDefEpa": 19,
              "rushDefEpa": 22,
              "pointsFor": 8,
              "pointsAgainst": 10
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "DET",
            "values": {
              "passOffEpa": 0.27,
              "turnoverDiff": 0.5,
              "passDefEpa": 0.18,
              "rushDefEpa": -0.048,
              "pointsFor": 30.67,
              "pointsAgainst": 27.5
            },
            "ranks": {
              "passOffEpa": 1,
              "turnoverDiff": 10,
              "passDefEpa": 28,
              "rushDefEpa": 17,
              "pointsFor": 2,
              "pointsAgainst": 26
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "GB",
            "values": {
              "passOffEpa": 0.1,
              "turnoverDiff": 0.71,
              "passDefEpa": -0.003,
              "rushDefEpa": -0.06,
              "pointsFor": 20.57,
              "pointsAgainst": 20.71
            },
            "ranks": {
              "passOffEpa": 13,
              "turnoverDiff": 5,
              "passDefEpa": 9,
              "rushDefEpa": 11,
              "pointsFor": 25,
              "pointsAgainst": 11
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "MIN",
            "values": {
              "passOffEpa": -0.008,
              "turnoverDiff": 1.17,
              "passDefEpa": -0.202,
              "rushDefEpa": -0.083,
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
              "passOffEpa": -0.048,
              "turnoverDiff": -0.43,
              "passDefEpa": 0.066,
              "rushDefEpa": -0.104,
              "pointsFor": 24.43,
              "pointsAgainst": 24.71
            },
            "ranks": {
              "passOffEpa": 25,
              "turnoverDiff": 24,
              "passDefEpa": 18,
              "rushDefEpa": 3,
              "pointsFor": 10,
              "pointsAgainst": 20
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "CAR",
            "values": {
              "passOffEpa": 0.095,
              "turnoverDiff": -0.17,
              "passDefEpa": 0.025,
              "rushDefEpa": 0.059,
              "pointsFor": 26.5,
              "pointsAgainst": 27.67
            },
            "ranks": {
              "passOffEpa": 16,
              "turnoverDiff": 19,
              "passDefEpa": 11,
              "rushDefEpa": 32,
              "pointsFor": 6,
              "pointsAgainst": 27
            },
            "gamesPlayed": 6
          },
          {
            "abbr": "NO",
            "values": {
              "passOffEpa": 0.036,
              "turnoverDiff": -0.57,
              "passDefEpa": 0.107,
              "rushDefEpa": 0.026,
              "pointsFor": 23.14,
              "pointsAgainst": 27.71
            },
            "ranks": {
              "passOffEpa": 19,
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
              "passOffEpa": -0.16,
              "turnoverDiff": 0.14,
              "passDefEpa": -0.087,
              "rushDefEpa": -0.077,
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
              "passOffEpa": -0.019,
              "turnoverDiff": 0.29,
              "passDefEpa": 0.227,
              "rushDefEpa": -0.058,
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
              "passOffEpa": 0.112,
              "turnoverDiff": -0.71,
              "passDefEpa": -0.044,
              "rushDefEpa": -0.039,
              "pointsFor": 24.29,
              "pointsAgainst": 22.71
            },
            "ranks": {
              "passOffEpa": 11,
              "turnoverDiff": 29,
              "passDefEpa": 5,
              "rushDefEpa": 20,
              "pointsFor": 11,
              "pointsAgainst": 16
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "SF",
            "values": {
              "passOffEpa": 0.259,
              "turnoverDiff": -0.43,
              "passDefEpa": 0.056,
              "rushDefEpa": -0.136,
              "pointsFor": 28.14,
              "pointsAgainst": 19.86
            },
            "ranks": {
              "passOffEpa": 2,
              "turnoverDiff": 25,
              "passDefEpa": 16,
              "rushDefEpa": 1,
              "pointsFor": 3,
              "pointsAgainst": 6
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "SEA",
            "values": {
              "passOffEpa": 0.054,
              "turnoverDiff": -0.14,
              "passDefEpa": -0.104,
              "rushDefEpa": -0.092,
              "pointsFor": 24,
              "pointsAgainst": 17.86
            },
            "ranks": {
              "passOffEpa": 17,
              "turnoverDiff": 18,
              "passDefEpa": 2,
              "rushDefEpa": 5,
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
              "passOffEpa": 0.454,
              "turnoverDiff": 1,
              "passDefEpa": 0.323,
              "rushDefEpa": 0.068,
              "pointsFor": 28,
              "pointsAgainst": 25
            },
            "ranks": {
              "passOffEpa": 2,
              "turnoverDiff": 4,
              "passDefEpa": 23,
              "rushDefEpa": 18,
              "pointsFor": 8,
              "pointsAgainst": 18
            }
          },
          {
            "abbr": "NE",
            "values": {
              "passOffEpa": 0.304,
              "turnoverDiff": -1,
              "passDefEpa": 0.304,
              "rushDefEpa": -0.056,
              "pointsFor": 24,
              "pointsAgainst": 30
            },
            "ranks": {
              "passOffEpa": 7,
              "turnoverDiff": 19,
              "passDefEpa": 21,
              "rushDefEpa": 11,
              "pointsFor": 12,
              "pointsAgainst": 23
            }
          },
          {
            "abbr": "NYJ",
            "values": {
              "passOffEpa": 0.323,
              "turnoverDiff": -1,
              "passDefEpa": 0.454,
              "rushDefEpa": 0.109,
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
              "passOffEpa": 0.089,
              "turnoverDiff": -1,
              "passDefEpa": 0.501,
              "rushDefEpa": -0.047,
              "pointsFor": 13,
              "pointsAgainst": 35
            },
            "ranks": {
              "passOffEpa": 18,
              "turnoverDiff": 21,
              "passDefEpa": 28,
              "rushDefEpa": 13,
              "pointsFor": 24,
              "pointsAgainst": 25
            }
          },
          {
            "abbr": "CIN",
            "values": {
              "passOffEpa": 0.501,
              "turnoverDiff": 1,
              "passDefEpa": 0.089,
              "rushDefEpa": -0.285,
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
              "passDefEpa": 0.168,
              "rushDefEpa": -0.107,
              "pointsFor": 27,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 15,
              "turnoverDiff": 11,
              "passDefEpa": 16,
              "rushDefEpa": 8,
              "pointsFor": 9,
              "pointsAgainst": 16
            }
          },
          {
            "abbr": "PIT",
            "values": {
              "passOffEpa": 0.057,
              "turnoverDiff": 1,
              "passDefEpa": 0.208,
              "rushDefEpa": -0.35,
              "pointsFor": 16,
              "pointsAgainst": 10
            },
            "ranks": {
              "passOffEpa": 20,
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
              "passOffEpa": 0.037,
              "turnoverDiff": 0,
              "passDefEpa": 0.166,
              "rushDefEpa": 0.26,
              "pointsFor": 21,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 21,
              "turnoverDiff": 12,
              "passDefEpa": 15,
              "rushDefEpa": 28,
              "pointsFor": 14,
              "pointsAgainst": 19
            }
          },
          {
            "abbr": "IND",
            "values": {
              "passOffEpa": -0.22,
              "turnoverDiff": -1,
              "passDefEpa": -0.026,
              "rushDefEpa": -0.195,
              "pointsFor": 10,
              "pointsAgainst": 16
            },
            "ranks": {
              "passOffEpa": 27,
              "turnoverDiff": 22,
              "passDefEpa": 7,
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
              "passOffEpa": 0.168,
              "turnoverDiff": 0,
              "passDefEpa": 0.124,
              "rushDefEpa": 0.227,
              "pointsFor": 24,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 13,
              "turnoverDiff": 13,
              "passDefEpa": 14,
              "rushDefEpa": 27,
              "pointsFor": 13,
              "pointsAgainst": 20
            }
          },
          {
            "abbr": "DEN",
            "values": {
              "passOffEpa": 0.098,
              "turnoverDiff": 0,
              "passDefEpa": -0.127,
              "rushDefEpa": -0.048,
              "pointsFor": 30,
              "pointsAgainst": 16
            },
            "ranks": {
              "passOffEpa": 17,
              "turnoverDiff": 14,
              "passDefEpa": 4,
              "rushDefEpa": 12,
              "pointsFor": 5,
              "pointsAgainst": 7
            }
          },
          {
            "abbr": "KC",
            "values": {
              "passOffEpa": -0.151,
              "turnoverDiff": 0,
              "passDefEpa": 0.342,
              "rushDefEpa": -0.026,
              "pointsFor": 3,
              "pointsAgainst": 20
            },
            "ranks": {
              "passOffEpa": 26,
              "turnoverDiff": 15,
              "passDefEpa": 24,
              "rushDefEpa": 14,
              "pointsFor": 28,
              "pointsAgainst": 10
            }
          },
          {
            "abbr": "LV",
            "values": {
              "passOffEpa": -0.058,
              "turnoverDiff": 2,
              "passDefEpa": 0.172,
              "rushDefEpa": 0.085,
              "pointsFor": 21,
              "pointsAgainst": 35
            },
            "ranks": {
              "passOffEpa": 23,
              "turnoverDiff": 3,
              "passDefEpa": 17,
              "rushDefEpa": 20,
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
              "passOffEpa": 0.408,
              "turnoverDiff": 1,
              "passDefEpa": -0.061,
              "rushDefEpa": 0.079,
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
              "passOffEpa": 0.166,
              "turnoverDiff": 0,
              "passDefEpa": 0.037,
              "rushDefEpa": -0.084,
              "pointsFor": 27,
              "pointsAgainst": 21
            },
            "ranks": {
              "passOffEpa": 14,
              "turnoverDiff": 16,
              "passDefEpa": 8,
              "rushDefEpa": 10,
              "pointsFor": 10,
              "pointsAgainst": 14
            }
          },
          {
            "abbr": "PHI",
            "values": {
              "passOffEpa": -0.061,
              "turnoverDiff": -1,
              "passDefEpa": 0.408,
              "rushDefEpa": 0.189,
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
              "passOffEpa": 0.304,
              "turnoverDiff": 1,
              "passDefEpa": 0.304,
              "rushDefEpa": -0.102,
              "pointsFor": 30,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 8,
              "turnoverDiff": 8,
              "passDefEpa": 22,
              "rushDefEpa": 9,
              "pointsFor": 6,
              "pointsAgainst": 17
            }
          },
          {
            "abbr": "DET",
            "values": {
              "passOffEpa": 0.243,
              "turnoverDiff": -1,
              "passDefEpa": 0.113,
              "rushDefEpa": -0.206,
              "pointsFor": 20,
              "pointsAgainst": 17
            },
            "ranks": {
              "passOffEpa": 10,
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
              "passOffEpa": 0.113,
              "turnoverDiff": 1,
              "passDefEpa": 0.243,
              "rushDefEpa": -0.363,
              "pointsFor": 17,
              "pointsAgainst": 20
            },
            "ranks": {
              "passOffEpa": 16,
              "turnoverDiff": 9,
              "passDefEpa": 19,
              "rushDefEpa": 1,
              "pointsFor": 20,
              "pointsAgainst": 11
            }
          },
          {
            "abbr": "MIN",
            "values": {
              "passOffEpa": -0.026,
              "turnoverDiff": 1,
              "passDefEpa": -0.22,
              "rushDefEpa": 0.039,
              "pointsFor": 16,
              "pointsAgainst": 10
            },
            "ranks": {
              "passOffEpa": 22,
              "turnoverDiff": 10,
              "passDefEpa": 2,
              "rushDefEpa": 16,
              "pointsFor": 22,
              "pointsAgainst": 3
            }
          },
          {
            "abbr": "ATL",
            "values": {
              "passOffEpa": 0.247,
              "turnoverDiff": 4,
              "passDefEpa": 0.06,
              "rushDefEpa": 0.104,
              "pointsFor": 29,
              "pointsAgainst": 20
            },
            "ranks": {
              "passOffEpa": 9,
              "turnoverDiff": 1,
              "passDefEpa": 10,
              "rushDefEpa": 21,
              "pointsFor": 7,
              "pointsAgainst": 12
            }
          },
          {
            "abbr": "CAR",
            "values": {
              "passOffEpa": -0.39,
              "turnoverDiff": -4,
              "passDefEpa": 0.421,
              "rushDefEpa": 0.135,
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
              "passOffEpa": 0.208,
              "turnoverDiff": -1,
              "passDefEpa": 0.057,
              "rushDefEpa": 0.018,
              "pointsFor": 10,
              "pointsAgainst": 16
            },
            "ranks": {
              "passOffEpa": 11,
              "turnoverDiff": 25,
              "passDefEpa": 9,
              "rushDefEpa": 15,
              "pointsFor": 27,
              "pointsAgainst": 8
            }
          },
          {
            "abbr": "TB",
            "values": {
              "passOffEpa": 0.421,
              "turnoverDiff": 4,
              "passDefEpa": -0.39,
              "rushDefEpa": 0.172,
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
              "passOffEpa": -0.127,
              "turnoverDiff": 0,
              "passDefEpa": 0.098,
              "rushDefEpa": 0.196,
              "pointsFor": 16,
              "pointsAgainst": 30
            },
            "ranks": {
              "passOffEpa": 25,
              "turnoverDiff": 17,
              "passDefEpa": 12,
              "rushDefEpa": 26,
              "pointsFor": 23,
              "pointsAgainst": 24
            }
          },
          {
            "abbr": "LAR",
            "values": {
              "passOffEpa": 0.172,
              "turnoverDiff": -2,
              "passDefEpa": -0.058,
              "rushDefEpa": -0.349,
              "pointsFor": 35,
              "pointsAgainst": 21
            },
            "ranks": {
              "passOffEpa": 12,
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
              "passOffEpa": 0.06,
              "turnoverDiff": -4,
              "passDefEpa": 0.247,
              "rushDefEpa": -0.189,
              "pointsFor": 20,
              "pointsAgainst": 29
            },
            "ranks": {
              "passOffEpa": 19,
              "turnoverDiff": 28,
              "passDefEpa": 20,
              "rushDefEpa": 7,
              "pointsFor": 18,
              "pointsAgainst": 22
            }
          },
          {
            "abbr": "SEA",
            "values": {
              "passOffEpa": 0.342,
              "turnoverDiff": 0,
              "passDefEpa": -0.151,
              "rushDefEpa": 0.057,
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
      },
      "8": {
        "cumulative": [
          {
            "abbr": "BUF",
            "values": {
              "passOffEpa": 0.223,
              "turnoverDiff": -0.29,
              "passDefEpa": 0.108,
              "rushDefEpa": -0.025,
              "pointsFor": 33.29,
              "pointsAgainst": 25.86
            },
            "ranks": {
              "passOffEpa": 4,
              "turnoverDiff": 22,
              "passDefEpa": 23,
              "rushDefEpa": 20,
              "pointsFor": 1,
              "pointsAgainst": 24
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "MIA",
            "values": {
              "passOffEpa": -0.041,
              "turnoverDiff": -0.43,
              "passDefEpa": 0.301,
              "rushDefEpa": -0.087,
              "pointsFor": 16.71,
              "pointsAgainst": 25.86
            },
            "ranks": {
              "passOffEpa": 25,
              "turnoverDiff": 24,
              "passDefEpa": 32,
              "rushDefEpa": 5,
              "pointsFor": 31,
              "pointsAgainst": 25
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "NE",
            "values": {
              "passOffEpa": 0.178,
              "turnoverDiff": -0.87,
              "passDefEpa": 0.085,
              "rushDefEpa": -0.068,
              "pointsFor": 23,
              "pointsAgainst": 20.25
            },
            "ranks": {
              "passOffEpa": 6,
              "turnoverDiff": 31,
              "passDefEpa": 21,
              "rushDefEpa": 11,
              "pointsFor": 16,
              "pointsAgainst": 9
            },
            "gamesPlayed": 8
          },
          {
            "abbr": "NYJ",
            "values": {
              "passOffEpa": 0.116,
              "turnoverDiff": 0.25,
              "passDefEpa": 0.136,
              "rushDefEpa": -0.088,
              "pointsFor": 21.25,
              "pointsAgainst": 23.5
            },
            "ranks": {
              "passOffEpa": 12,
              "turnoverDiff": 12,
              "passDefEpa": 26,
              "rushDefEpa": 4,
              "pointsFor": 25,
              "pointsAgainst": 16
            },
            "gamesPlayed": 8
          },
          {
            "abbr": "BAL",
            "values": {
              "passOffEpa": 0.107,
              "turnoverDiff": 0,
              "passDefEpa": 0.124,
              "rushDefEpa": -0.054,
              "pointsFor": 22.38,
              "pointsAgainst": 25.38
            },
            "ranks": {
              "passOffEpa": 13,
              "turnoverDiff": 14,
              "passDefEpa": 24,
              "rushDefEpa": 17,
              "pointsFor": 19,
              "pointsAgainst": 22
            },
            "gamesPlayed": 8
          },
          {
            "abbr": "CIN",
            "values": {
              "passOffEpa": 0.218,
              "turnoverDiff": 0.14,
              "passDefEpa": 0.012,
              "rushDefEpa": -0.025,
              "pointsFor": 29.43,
              "pointsAgainst": 22.57
            },
            "ranks": {
              "passOffEpa": 5,
              "turnoverDiff": 13,
              "passDefEpa": 10,
              "rushDefEpa": 21,
              "pointsFor": 2,
              "pointsAgainst": 14
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "CLE",
            "values": {
              "passOffEpa": -0.003,
              "turnoverDiff": -0.12,
              "passDefEpa": 0,
              "rushDefEpa": -0.005,
              "pointsFor": 17.38,
              "pointsAgainst": 21.63
            },
            "ranks": {
              "passOffEpa": 21,
              "turnoverDiff": 17,
              "passDefEpa": 9,
              "rushDefEpa": 24,
              "pointsFor": 29,
              "pointsAgainst": 13
            },
            "gamesPlayed": 8
          },
          {
            "abbr": "PIT",
            "values": {
              "passOffEpa": -0.072,
              "turnoverDiff": 0.63,
              "passDefEpa": -0.03,
              "rushDefEpa": -0.084,
              "pointsFor": 22.5,
              "pointsAgainst": 18
            },
            "ranks": {
              "passOffEpa": 27,
              "turnoverDiff": 5,
              "passDefEpa": 6,
              "rushDefEpa": 6,
              "pointsFor": 18,
              "pointsAgainst": 3
            },
            "gamesPlayed": 8
          },
          {
            "abbr": "HOU",
            "values": {
              "passOffEpa": 0.105,
              "turnoverDiff": 0.43,
              "passDefEpa": 0.057,
              "rushDefEpa": -0.013,
              "pointsFor": 23.57,
              "pointsAgainst": 24.29
            },
            "ranks": {
              "passOffEpa": 14,
              "turnoverDiff": 10,
              "passDefEpa": 18,
              "rushDefEpa": 23,
              "pointsFor": 12,
              "pointsAgainst": 18
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "IND",
            "values": {
              "passOffEpa": -0.155,
              "turnoverDiff": -1.37,
              "passDefEpa": 0.061,
              "rushDefEpa": 0.031,
              "pointsFor": 20.13,
              "pointsAgainst": 27.75
            },
            "ranks": {
              "passOffEpa": 30,
              "turnoverDiff": 32,
              "passDefEpa": 19,
              "rushDefEpa": 30,
              "pointsFor": 26,
              "pointsAgainst": 30
            },
            "gamesPlayed": 8
          },
          {
            "abbr": "JAX",
            "values": {
              "passOffEpa": 0.246,
              "turnoverDiff": 1,
              "passDefEpa": -0.032,
              "rushDefEpa": -0.145,
              "pointsFor": 28,
              "pointsAgainst": 15.86
            },
            "ranks": {
              "passOffEpa": 2,
              "turnoverDiff": 1,
              "passDefEpa": 5,
              "rushDefEpa": 1,
              "pointsFor": 5,
              "pointsAgainst": 2
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "TEN",
            "values": {
              "passOffEpa": -0.055,
              "turnoverDiff": -0.12,
              "passDefEpa": 0.164,
              "rushDefEpa": -0.063,
              "pointsFor": 18,
              "pointsAgainst": 24.88
            },
            "ranks": {
              "passOffEpa": 26,
              "turnoverDiff": 18,
              "passDefEpa": 29,
              "rushDefEpa": 14,
              "pointsFor": 28,
              "pointsAgainst": 19
            },
            "gamesPlayed": 8
          },
          {
            "abbr": "DEN",
            "values": {
              "passOffEpa": -0.003,
              "turnoverDiff": 0.5,
              "passDefEpa": -0.019,
              "rushDefEpa": 0.011,
              "pointsFor": 21.5,
              "pointsAgainst": 20.63
            },
            "ranks": {
              "passOffEpa": 22,
              "turnoverDiff": 7,
              "passDefEpa": 8,
              "rushDefEpa": 26,
              "pointsFor": 22,
              "pointsAgainst": 11
            },
            "gamesPlayed": 8
          },
          {
            "abbr": "KC",
            "values": {
              "passOffEpa": 0.122,
              "turnoverDiff": 0.71,
              "passDefEpa": 0.013,
              "rushDefEpa": -0.067,
              "pointsFor": 23.86,
              "pointsAgainst": 18.71
            },
            "ranks": {
              "passOffEpa": 10,
              "turnoverDiff": 4,
              "passDefEpa": 11,
              "rushDefEpa": 12,
              "pointsFor": 11,
              "pointsAgainst": 4
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "LV",
            "values": {
              "passOffEpa": 0.172,
              "turnoverDiff": 0.63,
              "passDefEpa": 0.161,
              "rushDefEpa": -0.019,
              "pointsFor": 27.63,
              "pointsAgainst": 28.75
            },
            "ranks": {
              "passOffEpa": 7,
              "turnoverDiff": 6,
              "passDefEpa": 28,
              "rushDefEpa": 22,
              "pointsFor": 6,
              "pointsAgainst": 31
            },
            "gamesPlayed": 8
          },
          {
            "abbr": "LAC",
            "values": {
              "passOffEpa": -0.208,
              "turnoverDiff": -0.86,
              "passDefEpa": 0.015,
              "rushDefEpa": -0.073,
              "pointsFor": 14.14,
              "pointsAgainst": 25
            },
            "ranks": {
              "passOffEpa": 32,
              "turnoverDiff": 30,
              "passDefEpa": 12,
              "rushDefEpa": 9,
              "pointsFor": 32,
              "pointsAgainst": 20
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "DAL",
            "values": {
              "passOffEpa": 0.14,
              "turnoverDiff": -0.12,
              "passDefEpa": 0.202,
              "rushDefEpa": 0.017,
              "pointsFor": 27.38,
              "pointsAgainst": 26.63
            },
            "ranks": {
              "passOffEpa": 8,
              "turnoverDiff": 19,
              "passDefEpa": 30,
              "rushDefEpa": 27,
              "pointsFor": 7,
              "pointsAgainst": 27
            },
            "gamesPlayed": 8
          },
          {
            "abbr": "NYG",
            "values": {
              "passOffEpa": 0.051,
              "turnoverDiff": -0.29,
              "passDefEpa": 0.027,
              "rushDefEpa": 0.005,
              "pointsFor": 23.29,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 17,
              "turnoverDiff": 23,
              "passDefEpa": 13,
              "rushDefEpa": 25,
              "pointsFor": 13,
              "pointsAgainst": 15
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "PHI",
            "values": {
              "passOffEpa": -0.082,
              "turnoverDiff": -0.5,
              "passDefEpa": 0.134,
              "rushDefEpa": 0.019,
              "pointsFor": 17.13,
              "pointsAgainst": 25.25
            },
            "ranks": {
              "passOffEpa": 28,
              "turnoverDiff": 26,
              "passDefEpa": 25,
              "rushDefEpa": 28,
              "pointsFor": 30,
              "pointsAgainst": 21
            },
            "gamesPlayed": 8
          },
          {
            "abbr": "WSH",
            "values": {
              "passOffEpa": 0.024,
              "turnoverDiff": 1,
              "passDefEpa": 0.046,
              "rushDefEpa": 0.032,
              "pointsFor": 22.71,
              "pointsAgainst": 26
            },
            "ranks": {
              "passOffEpa": 20,
              "turnoverDiff": 2,
              "passDefEpa": 15,
              "rushDefEpa": 31,
              "pointsFor": 17,
              "pointsAgainst": 26
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "CHI",
            "values": {
              "passOffEpa": 0.127,
              "turnoverDiff": -0.12,
              "passDefEpa": 0.04,
              "rushDefEpa": -0.047,
              "pointsFor": 26.75,
              "pointsAgainst": 20
            },
            "ranks": {
              "passOffEpa": 9,
              "turnoverDiff": 20,
              "passDefEpa": 14,
              "rushDefEpa": 19,
              "pointsFor": 8,
              "pointsAgainst": 8
            },
            "gamesPlayed": 8
          },
          {
            "abbr": "DET",
            "values": {
              "passOffEpa": 0.228,
              "turnoverDiff": 0.43,
              "passDefEpa": 0.159,
              "rushDefEpa": -0.058,
              "pointsFor": 29,
              "pointsAgainst": 25.71
            },
            "ranks": {
              "passOffEpa": 3,
              "turnoverDiff": 11,
              "passDefEpa": 27,
              "rushDefEpa": 16,
              "pointsFor": 3,
              "pointsAgainst": 23
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "GB",
            "values": {
              "passOffEpa": 0.121,
              "turnoverDiff": 0.5,
              "passDefEpa": -0.024,
              "rushDefEpa": -0.063,
              "pointsFor": 21.38,
              "pointsAgainst": 20.5
            },
            "ranks": {
              "passOffEpa": 11,
              "turnoverDiff": 8,
              "passDefEpa": 7,
              "rushDefEpa": 15,
              "pointsFor": 23,
              "pointsAgainst": 10
            },
            "gamesPlayed": 8
          },
          {
            "abbr": "MIN",
            "values": {
              "passOffEpa": -0.01,
              "turnoverDiff": 1,
              "passDefEpa": -0.19,
              "rushDefEpa": -0.065,
              "pointsFor": 20,
              "pointsAgainst": 13.29
            },
            "ranks": {
              "passOffEpa": 23,
              "turnoverDiff": 3,
              "passDefEpa": 1,
              "rushDefEpa": 13,
              "pointsFor": 27,
              "pointsAgainst": 1
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "ATL",
            "values": {
              "passOffEpa": -0.12,
              "turnoverDiff": -0.75,
              "passDefEpa": 0.048,
              "rushDefEpa": -0.099,
              "pointsFor": 21.38,
              "pointsAgainst": 23.63
            },
            "ranks": {
              "passOffEpa": 29,
              "turnoverDiff": 29,
              "passDefEpa": 16,
              "rushDefEpa": 3,
              "pointsFor": 24,
              "pointsAgainst": 17
            },
            "gamesPlayed": 8
          },
          {
            "abbr": "CAR",
            "values": {
              "passOffEpa": 0.058,
              "turnoverDiff": 0,
              "passDefEpa": 0.063,
              "rushDefEpa": 0.038,
              "pointsFor": 25.43,
              "pointsAgainst": 27.57
            },
            "ranks": {
              "passOffEpa": 16,
              "turnoverDiff": 15,
              "passDefEpa": 20,
              "rushDefEpa": 32,
              "pointsFor": 9,
              "pointsAgainst": 28
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "NO",
            "values": {
              "passOffEpa": 0.036,
              "turnoverDiff": -0.57,
              "passDefEpa": 0.107,
              "rushDefEpa": 0.026,
              "pointsFor": 23.14,
              "pointsAgainst": 27.71
            },
            "ranks": {
              "passOffEpa": 18,
              "turnoverDiff": 28,
              "passDefEpa": 22,
              "rushDefEpa": 29,
              "pointsFor": 14,
              "pointsAgainst": 29
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "TB",
            "values": {
              "passOffEpa": -0.18,
              "turnoverDiff": 0.5,
              "passDefEpa": -0.145,
              "rushDefEpa": -0.08,
              "pointsFor": 22.25,
              "pointsAgainst": 18.88
            },
            "ranks": {
              "passOffEpa": 31,
              "turnoverDiff": 9,
              "passDefEpa": 2,
              "rushDefEpa": 7,
              "pointsFor": 20,
              "pointsAgainst": 5
            },
            "gamesPlayed": 8
          },
          {
            "abbr": "ARI",
            "values": {
              "passOffEpa": -0.01,
              "turnoverDiff": 0,
              "passDefEpa": 0.203,
              "rushDefEpa": -0.07,
              "pointsFor": 21.88,
              "pointsAgainst": 29.75
            },
            "ranks": {
              "passOffEpa": 24,
              "turnoverDiff": 16,
              "passDefEpa": 31,
              "rushDefEpa": 10,
              "pointsFor": 21,
              "pointsAgainst": 32
            },
            "gamesPlayed": 8
          },
          {
            "abbr": "LAR",
            "values": {
              "passOffEpa": 0.094,
              "turnoverDiff": -0.5,
              "passDefEpa": -0.084,
              "rushDefEpa": -0.075,
              "pointsFor": 24.25,
              "pointsAgainst": 21
            },
            "ranks": {
              "passOffEpa": 15,
              "turnoverDiff": 27,
              "passDefEpa": 3,
              "rushDefEpa": 8,
              "pointsFor": 10,
              "pointsAgainst": 12
            },
            "gamesPlayed": 8
          },
          {
            "abbr": "SF",
            "values": {
              "passOffEpa": 0.259,
              "turnoverDiff": -0.43,
              "passDefEpa": 0.056,
              "rushDefEpa": -0.136,
              "pointsFor": 28.14,
              "pointsAgainst": 19.86
            },
            "ranks": {
              "passOffEpa": 1,
              "turnoverDiff": 25,
              "passDefEpa": 17,
              "rushDefEpa": 2,
              "pointsFor": 4,
              "pointsAgainst": 6
            },
            "gamesPlayed": 7
          },
          {
            "abbr": "SEA",
            "values": {
              "passOffEpa": 0.031,
              "turnoverDiff": -0.12,
              "passDefEpa": -0.067,
              "rushDefEpa": -0.049,
              "pointsFor": 23.13,
              "pointsAgainst": 19.88
            },
            "ranks": {
              "passOffEpa": 19,
              "turnoverDiff": 21,
              "passDefEpa": 4,
              "rushDefEpa": 18,
              "pointsFor": 15,
              "pointsAgainst": 7
            },
            "gamesPlayed": 8
          }
        ],
        "weekly": [
          {
            "abbr": "BUF",
            "values": {
              "passOffEpa": 0.171,
              "turnoverDiff": 1,
              "passDefEpa": -0.573,
              "rushDefEpa": -0.137,
              "pointsFor": 36,
              "pointsAgainst": 10
            },
            "ranks": {
              "passOffEpa": 10,
              "turnoverDiff": 5,
              "passDefEpa": 3,
              "rushDefEpa": 6,
              "pointsFor": 4,
              "pointsAgainst": 5
            }
          },
          {
            "abbr": "MIA",
            "values": {
              "passOffEpa": 0.095,
              "turnoverDiff": 0,
              "passDefEpa": 0.324,
              "rushDefEpa": -0.012,
              "pointsFor": 19,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 12,
              "turnoverDiff": 11,
              "passDefEpa": 27,
              "rushDefEpa": 18,
              "pointsFor": 17,
              "pointsAgainst": 13
            }
          },
          {
            "abbr": "NE",
            "values": {
              "passOffEpa": 0.324,
              "turnoverDiff": 0,
              "passDefEpa": 0.095,
              "rushDefEpa": -0.255,
              "pointsFor": 24,
              "pointsAgainst": 19
            },
            "ranks": {
              "passOffEpa": 2,
              "turnoverDiff": 12,
              "passDefEpa": 17,
              "rushDefEpa": 4,
              "pointsFor": 14,
              "pointsAgainst": 10
            }
          },
          {
            "abbr": "NYJ",
            "values": {
              "passOffEpa": 0.259,
              "turnoverDiff": -1,
              "passDefEpa": 0.525,
              "rushDefEpa": -0.096,
              "pointsFor": 33,
              "pointsAgainst": 38
            },
            "ranks": {
              "passOffEpa": 5,
              "turnoverDiff": 19,
              "passDefEpa": 28,
              "rushDefEpa": 11,
              "pointsFor": 7,
              "pointsAgainst": 26
            }
          },
          {
            "abbr": "BAL",
            "values": {
              "passOffEpa": -0.573,
              "turnoverDiff": -1,
              "passDefEpa": 0.171,
              "rushDefEpa": -0.046,
              "pointsFor": 10,
              "pointsAgainst": 36
            },
            "ranks": {
              "passOffEpa": 26,
              "turnoverDiff": 20,
              "passDefEpa": 19,
              "rushDefEpa": 16,
              "pointsFor": 23,
              "pointsAgainst": 24
            }
          },
          {
            "abbr": "CIN",
            "values": {
              "passOffEpa": 0.317,
              "turnoverDiff": -2,
              "passDefEpa": 0.154,
              "rushDefEpa": 0.119,
              "pointsFor": 43,
              "pointsAgainst": 36
            },
            "ranks": {
              "passOffEpa": 3,
              "turnoverDiff": 25,
              "passDefEpa": 18,
              "rushDefEpa": 23,
              "pointsFor": 1,
              "pointsAgainst": 25
            }
          },
          {
            "abbr": "CLE",
            "values": {
              "passOffEpa": -0.105,
              "turnoverDiff": -1,
              "passDefEpa": -0.104,
              "rushDefEpa": 0.295,
              "pointsFor": 6,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 18,
              "turnoverDiff": 21,
              "passDefEpa": 12,
              "rushDefEpa": 28,
              "pointsFor": 27,
              "pointsAgainst": 16
            }
          },
          {
            "abbr": "PIT",
            "values": {
              "passOffEpa": -0.104,
              "turnoverDiff": 1,
              "passDefEpa": -0.105,
              "rushDefEpa": -0.39,
              "pointsFor": 27,
              "pointsAgainst": 6
            },
            "ranks": {
              "passOffEpa": 17,
              "turnoverDiff": 6,
              "passDefEpa": 11,
              "rushDefEpa": 1,
              "pointsFor": 11,
              "pointsAgainst": 2
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
              "passOffEpa": -0.518,
              "turnoverDiff": -2,
              "passDefEpa": 0.217,
              "rushDefEpa": 0.165,
              "pointsFor": 7,
              "pointsAgainst": 42
            },
            "ranks": {
              "passOffEpa": 25,
              "turnoverDiff": 26,
              "passDefEpa": 22,
              "rushDefEpa": 25,
              "pointsFor": 26,
              "pointsAgainst": 27
            }
          },
          {
            "abbr": "JAX",
            "values": {
              "passOffEpa": 0.217,
              "turnoverDiff": 2,
              "passDefEpa": -0.518,
              "rushDefEpa": -0.211,
              "pointsFor": 42,
              "pointsAgainst": 7
            },
            "ranks": {
              "passOffEpa": 7,
              "turnoverDiff": 2,
              "passDefEpa": 4,
              "rushDefEpa": 5,
              "pointsFor": 2,
              "pointsAgainst": 3
            }
          },
          {
            "abbr": "TEN",
            "values": {
              "passOffEpa": 0.154,
              "turnoverDiff": 2,
              "passDefEpa": 0.317,
              "rushDefEpa": -0.261,
              "pointsFor": 36,
              "pointsAgainst": 43
            },
            "ranks": {
              "passOffEpa": 11,
              "turnoverDiff": 3,
              "passDefEpa": 26,
              "rushDefEpa": 3,
              "pointsFor": 5,
              "pointsAgainst": 28
            }
          },
          {
            "abbr": "DEN",
            "values": {
              "passOffEpa": 0.201,
              "turnoverDiff": 0,
              "passDefEpa": 0.231,
              "rushDefEpa": 0.013,
              "pointsFor": 28,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 8,
              "turnoverDiff": 13,
              "passDefEpa": 23,
              "rushDefEpa": 20,
              "pointsFor": 10,
              "pointsAgainst": 14
            }
          },
          {
            "abbr": "KC",
            "values": {
              "passOffEpa": 0.231,
              "turnoverDiff": 0,
              "passDefEpa": 0.201,
              "rushDefEpa": -0.026,
              "pointsFor": 24,
              "pointsAgainst": 28
            },
            "ranks": {
              "passOffEpa": 6,
              "turnoverDiff": 14,
              "passDefEpa": 21,
              "rushDefEpa": 17,
              "pointsFor": 15,
              "pointsAgainst": 19
            }
          },
          {
            "abbr": "LV",
            "values": {
              "passOffEpa": 0.525,
              "turnoverDiff": 1,
              "passDefEpa": 0.259,
              "rushDefEpa": 0.113,
              "pointsFor": 38,
              "pointsAgainst": 33
            },
            "ranks": {
              "passOffEpa": 1,
              "turnoverDiff": 7,
              "passDefEpa": 24,
              "rushDefEpa": 22,
              "pointsFor": 3,
              "pointsAgainst": 21
            }
          },
          {
            "abbr": "LAC",
            "values": {
              "passOffEpa": -0.362,
              "turnoverDiff": -1,
              "passDefEpa": -0.111,
              "rushDefEpa": 0.046,
              "pointsFor": 9,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 24,
              "turnoverDiff": 22,
              "passDefEpa": 10,
              "rushDefEpa": 21,
              "pointsFor": 25,
              "pointsAgainst": 15
            }
          },
          {
            "abbr": "DAL",
            "values": {
              "passOffEpa": 0.043,
              "turnoverDiff": 2,
              "passDefEpa": 0.044,
              "rushDefEpa": 0.191,
              "pointsFor": 30,
              "pointsAgainst": 33
            },
            "ranks": {
              "passOffEpa": 15,
              "turnoverDiff": 4,
              "passDefEpa": 15,
              "rushDefEpa": 27,
              "pointsFor": 9,
              "pointsAgainst": 22
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
              "passOffEpa": -0.225,
              "turnoverDiff": -1,
              "passDefEpa": 0.069,
              "rushDefEpa": 0.131,
              "pointsFor": 10,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 23,
              "turnoverDiff": 23,
              "passDefEpa": 16,
              "rushDefEpa": 24,
              "pointsFor": 24,
              "pointsAgainst": 17
            }
          },
          {
            "abbr": "WSH",
            "values": {
              "passOffEpa": 0.069,
              "turnoverDiff": 1,
              "passDefEpa": -0.225,
              "rushDefEpa": -0.07,
              "pointsFor": 27,
              "pointsAgainst": 10
            },
            "ranks": {
              "passOffEpa": 13,
              "turnoverDiff": 8,
              "passDefEpa": 6,
              "rushDefEpa": 15,
              "pointsFor": 12,
              "pointsAgainst": 6
            }
          },
          {
            "abbr": "CHI",
            "values": {
              "passOffEpa": 0.18,
              "turnoverDiff": 0,
              "passDefEpa": -0.121,
              "rushDefEpa": -0.126,
              "pointsFor": 34,
              "pointsAgainst": 17
            },
            "ranks": {
              "passOffEpa": 9,
              "turnoverDiff": 15,
              "passDefEpa": 8,
              "rushDefEpa": 8,
              "pointsFor": 6,
              "pointsAgainst": 9
            }
          },
          {
            "abbr": "DET",
            "values": {
              "passOffEpa": -0.113,
              "turnoverDiff": 0,
              "passDefEpa": -0.021,
              "rushDefEpa": -0.137,
              "pointsFor": 19,
              "pointsAgainst": 15
            },
            "ranks": {
              "passOffEpa": 20,
              "turnoverDiff": 16,
              "passDefEpa": 13,
              "rushDefEpa": 7,
              "pointsFor": 18,
              "pointsAgainst": 7
            }
          },
          {
            "abbr": "GB",
            "values": {
              "passOffEpa": 0.261,
              "turnoverDiff": -1,
              "passDefEpa": -0.14,
              "rushDefEpa": -0.087,
              "pointsFor": 27,
              "pointsAgainst": 19
            },
            "ranks": {
              "passOffEpa": 4,
              "turnoverDiff": 24,
              "passDefEpa": 7,
              "rushDefEpa": 13,
              "pointsFor": 13,
              "pointsAgainst": 11
            }
          },
          {
            "abbr": "MIN",
            "values": {
              "passOffEpa": -0.021,
              "turnoverDiff": 0,
              "passDefEpa": -0.113,
              "rushDefEpa": 0.001,
              "pointsFor": 15,
              "pointsAgainst": 19
            },
            "ranks": {
              "passOffEpa": 16,
              "turnoverDiff": 17,
              "passDefEpa": 9,
              "rushDefEpa": 19,
              "pointsFor": 22,
              "pointsAgainst": 12
            }
          },
          {
            "abbr": "ATL",
            "values": {
              "passOffEpa": -0.778,
              "turnoverDiff": -3,
              "passDefEpa": -1.299,
              "rushDefEpa": -0.084,
              "pointsFor": 0,
              "pointsAgainst": 16
            },
            "ranks": {
              "passOffEpa": 27,
              "turnoverDiff": 28,
              "passDefEpa": 1,
              "rushDefEpa": 14,
              "pointsFor": 28,
              "pointsAgainst": 8
            }
          },
          {
            "abbr": "CAR",
            "values": {
              "passOffEpa": -0.14,
              "turnoverDiff": 1,
              "passDefEpa": 0.261,
              "rushDefEpa": -0.105,
              "pointsFor": 19,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 22,
              "turnoverDiff": 9,
              "passDefEpa": 25,
              "rushDefEpa": 10,
              "pointsFor": 19,
              "pointsAgainst": 18
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
              "passOffEpa": -1.299,
              "turnoverDiff": 3,
              "passDefEpa": -0.778,
              "rushDefEpa": -0.096,
              "pointsFor": 16,
              "pointsAgainst": 0
            },
            "ranks": {
              "passOffEpa": 28,
              "turnoverDiff": 1,
              "passDefEpa": 2,
              "rushDefEpa": 12,
              "pointsFor": 21,
              "pointsAgainst": 1
            }
          },
          {
            "abbr": "ARI",
            "values": {
              "passOffEpa": 0.044,
              "turnoverDiff": -2,
              "passDefEpa": 0.043,
              "rushDefEpa": -0.126,
              "pointsFor": 33,
              "pointsAgainst": 30
            },
            "ranks": {
              "passOffEpa": 14,
              "turnoverDiff": 27,
              "passDefEpa": 14,
              "rushDefEpa": 9,
              "pointsFor": 8,
              "pointsAgainst": 20
            }
          },
          {
            "abbr": "LAR",
            "values": {
              "passOffEpa": -0.111,
              "turnoverDiff": 1,
              "passDefEpa": -0.362,
              "rushDefEpa": -0.35,
              "pointsFor": 24,
              "pointsAgainst": 9
            },
            "ranks": {
              "passOffEpa": 19,
              "turnoverDiff": 10,
              "passDefEpa": 5,
              "rushDefEpa": 2,
              "pointsFor": 16,
              "pointsAgainst": 4
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
              "passOffEpa": -0.121,
              "turnoverDiff": 0,
              "passDefEpa": 0.18,
              "rushDefEpa": 0.17,
              "pointsFor": 17,
              "pointsAgainst": 34
            },
            "ranks": {
              "passOffEpa": 21,
              "turnoverDiff": 18,
              "passDefEpa": 20,
              "rushDefEpa": 26,
              "pointsFor": 20,
              "pointsAgainst": 23
            }
          }
        ]
      },
      "9": {
        "cumulative": [
          {
            "abbr": "BUF",
            "values": {
              "passOffEpa": 0.193,
              "turnoverDiff": 0,
              "passDefEpa": 0.034,
              "rushDefEpa": -0.054,
              "pointsFor": 32,
              "pointsAgainst": 23.38
            },
            "ranks": {
              "passOffEpa": 5,
              "turnoverDiff": 16,
              "passDefEpa": 14,
              "rushDefEpa": 18,
              "pointsFor": 1,
              "pointsAgainst": 16
            },
            "gamesPlayed": 8
          },
          {
            "abbr": "MIA",
            "values": {
              "passOffEpa": -0.053,
              "turnoverDiff": -0.37,
              "passDefEpa": 0.259,
              "rushDefEpa": -0.088,
              "pointsFor": 15.75,
              "pointsAgainst": 25
            },
            "ranks": {
              "passOffEpa": 24,
              "turnoverDiff": 24,
              "passDefEpa": 32,
              "rushDefEpa": 5,
              "pointsFor": 31,
              "pointsAgainst": 23
            },
            "gamesPlayed": 8
          },
          {
            "abbr": "NE",
            "values": {
              "passOffEpa": 0.138,
              "turnoverDiff": -1.22,
              "passDefEpa": 0.135,
              "rushDefEpa": -0.073,
              "pointsFor": 23.44,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 10,
              "turnoverDiff": 31,
              "passDefEpa": 25,
              "rushDefEpa": 10,
              "pointsFor": 14,
              "pointsAgainst": 15
            },
            "gamesPlayed": 9
          },
          {
            "abbr": "NYJ",
            "values": {
              "passOffEpa": 0.072,
              "turnoverDiff": 0.33,
              "passDefEpa": 0.145,
              "rushDefEpa": -0.071,
              "pointsFor": 20.22,
              "pointsAgainst": 24.78
            },
            "ranks": {
              "passOffEpa": 14,
              "turnoverDiff": 11,
              "passDefEpa": 26,
              "rushDefEpa": 12,
              "pointsFor": 25,
              "pointsAgainst": 20
            },
            "gamesPlayed": 9
          },
          {
            "abbr": "BAL",
            "values": {
              "passOffEpa": 0.052,
              "turnoverDiff": -0.22,
              "passDefEpa": 0.145,
              "rushDefEpa": -0.065,
              "pointsFor": 21,
              "pointsAgainst": 26.22
            },
            "ranks": {
              "passOffEpa": 16,
              "turnoverDiff": 22,
              "passDefEpa": 27,
              "rushDefEpa": 13,
              "pointsFor": 22,
              "pointsAgainst": 25
            },
            "gamesPlayed": 9
          },
          {
            "abbr": "CIN",
            "values": {
              "passOffEpa": 0.241,
              "turnoverDiff": 0.25,
              "passDefEpa": 0.005,
              "rushDefEpa": 0.012,
              "pointsFor": 30,
              "pointsAgainst": 21.88
            },
            "ranks": {
              "passOffEpa": 3,
              "turnoverDiff": 12,
              "passDefEpa": 13,
              "rushDefEpa": 28,
              "pointsFor": 2,
              "pointsAgainst": 14
            },
            "gamesPlayed": 8
          },
          {
            "abbr": "CLE",
            "values": {
              "passOffEpa": 0.011,
              "turnoverDiff": 0.11,
              "passDefEpa": -0.004,
              "rushDefEpa": 0.007,
              "pointsFor": 17.89,
              "pointsAgainst": 21.78
            },
            "ranks": {
              "passOffEpa": 21,
              "turnoverDiff": 14,
              "passDefEpa": 10,
              "rushDefEpa": 27,
              "pointsFor": 29,
              "pointsAgainst": 13
            },
            "gamesPlayed": 9
          },
          {
            "abbr": "PIT",
            "values": {
              "passOffEpa": -0.072,
              "turnoverDiff": 0.63,
              "passDefEpa": -0.03,
              "rushDefEpa": -0.084,
              "pointsFor": 22.5,
              "pointsAgainst": 18
            },
            "ranks": {
              "passOffEpa": 26,
              "turnoverDiff": 5,
              "passDefEpa": 7,
              "rushDefEpa": 6,
              "pointsFor": 17,
              "pointsAgainst": 4
            },
            "gamesPlayed": 8
          },
          {
            "abbr": "HOU",
            "values": {
              "passOffEpa": 0.143,
              "turnoverDiff": 0.5,
              "passDefEpa": 0.042,
              "rushDefEpa": -0.049,
              "pointsFor": 26.13,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 9,
              "turnoverDiff": 8,
              "passDefEpa": 15,
              "rushDefEpa": 20,
              "pointsFor": 9,
              "pointsAgainst": 18
            },
            "gamesPlayed": 8
          },
          {
            "abbr": "IND",
            "values": {
              "passOffEpa": -0.16,
              "turnoverDiff": -1.22,
              "passDefEpa": 0.087,
              "rushDefEpa": 0.03,
              "pointsFor": 20.44,
              "pointsAgainst": 27.67
            },
            "ranks": {
              "passOffEpa": 30,
              "turnoverDiff": 32,
              "passDefEpa": 21,
              "rushDefEpa": 31,
              "pointsFor": 24,
              "pointsAgainst": 30
            },
            "gamesPlayed": 9
          },
          {
            "abbr": "JAX",
            "values": {
              "passOffEpa": 0.26,
              "turnoverDiff": 1.13,
              "passDefEpa": -0.076,
              "rushDefEpa": -0.127,
              "pointsFor": 28.63,
              "pointsAgainst": 15.13
            },
            "ranks": {
              "passOffEpa": 1,
              "turnoverDiff": 1,
              "passDefEpa": 5,
              "rushDefEpa": 2,
              "pointsFor": 4,
              "pointsAgainst": 2
            },
            "gamesPlayed": 8
          },
          {
            "abbr": "TEN",
            "values": {
              "passOffEpa": -0.055,
              "turnoverDiff": -0.12,
              "passDefEpa": 0.164,
              "rushDefEpa": -0.063,
              "pointsFor": 18,
              "pointsAgainst": 24.88
            },
            "ranks": {
              "passOffEpa": 25,
              "turnoverDiff": 20,
              "passDefEpa": 29,
              "rushDefEpa": 15,
              "pointsFor": 28,
              "pointsAgainst": 22
            },
            "gamesPlayed": 8
          },
          {
            "abbr": "DEN",
            "values": {
              "passOffEpa": 0.019,
              "turnoverDiff": 0.56,
              "passDefEpa": -0.001,
              "rushDefEpa": 0.015,
              "pointsFor": 22,
              "pointsAgainst": 20.67
            },
            "ranks": {
              "passOffEpa": 20,
              "turnoverDiff": 7,
              "passDefEpa": 11,
              "rushDefEpa": 30,
              "pointsFor": 20,
              "pointsAgainst": 10
            },
            "gamesPlayed": 9
          },
          {
            "abbr": "KC",
            "values": {
              "passOffEpa": 0.133,
              "turnoverDiff": 0.5,
              "passDefEpa": -0.019,
              "rushDefEpa": -0.09,
              "pointsFor": 25.25,
              "pointsAgainst": 17.88
            },
            "ranks": {
              "passOffEpa": 11,
              "turnoverDiff": 9,
              "passDefEpa": 9,
              "rushDefEpa": 4,
              "pointsFor": 10,
              "pointsAgainst": 3
            },
            "gamesPlayed": 8
          },
          {
            "abbr": "LV",
            "values": {
              "passOffEpa": 0.157,
              "turnoverDiff": 0.11,
              "passDefEpa": 0.168,
              "rushDefEpa": 0.002,
              "pointsFor": 26.44,
              "pointsAgainst": 29.78
            },
            "ranks": {
              "passOffEpa": 7,
              "turnoverDiff": 15,
              "passDefEpa": 30,
              "rushDefEpa": 25,
              "pointsFor": 8,
              "pointsAgainst": 32
            },
            "gamesPlayed": 9
          },
          {
            "abbr": "LAC",
            "values": {
              "passOffEpa": -0.188,
              "turnoverDiff": -0.87,
              "passDefEpa": 0.075,
              "rushDefEpa": -0.073,
              "pointsFor": 15.13,
              "pointsAgainst": 27.38
            },
            "ranks": {
              "passOffEpa": 31,
              "turnoverDiff": 30,
              "passDefEpa": 18,
              "rushDefEpa": 11,
              "pointsFor": 32,
              "pointsAgainst": 28
            },
            "gamesPlayed": 8
          },
          {
            "abbr": "DAL",
            "values": {
              "passOffEpa": 0.153,
              "turnoverDiff": -0.11,
              "passDefEpa": 0.156,
              "rushDefEpa": 0.005,
              "pointsFor": 27.33,
              "pointsAgainst": 26.22
            },
            "ranks": {
              "passOffEpa": 8,
              "turnoverDiff": 18,
              "passDefEpa": 28,
              "rushDefEpa": 26,
              "pointsFor": 6,
              "pointsAgainst": 26
            },
            "gamesPlayed": 9
          },
          {
            "abbr": "NYG",
            "values": {
              "passOffEpa": 0.052,
              "turnoverDiff": -0.25,
              "passDefEpa": -0.027,
              "rushDefEpa": -0.003,
              "pointsFor": 22.75,
              "pointsAgainst": 21.5
            },
            "ranks": {
              "passOffEpa": 17,
              "turnoverDiff": 23,
              "passDefEpa": 8,
              "rushDefEpa": 24,
              "pointsFor": 16,
              "pointsAgainst": 12
            },
            "gamesPlayed": 8
          },
          {
            "abbr": "PHI",
            "values": {
              "passOffEpa": -0.112,
              "turnoverDiff": -0.44,
              "passDefEpa": 0.126,
              "rushDefEpa": -0.005,
              "pointsFor": 16.44,
              "pointsAgainst": 24.56
            },
            "ranks": {
              "passOffEpa": 28,
              "turnoverDiff": 25,
              "passDefEpa": 23,
              "rushDefEpa": 23,
              "pointsFor": 30,
              "pointsAgainst": 19
            },
            "gamesPlayed": 9
          },
          {
            "abbr": "WSH",
            "values": {
              "passOffEpa": 0.011,
              "turnoverDiff": 0.88,
              "passDefEpa": 0.047,
              "rushDefEpa": 0.031,
              "pointsFor": 21.5,
              "pointsAgainst": 25.25
            },
            "ranks": {
              "passOffEpa": 22,
              "turnoverDiff": 3,
              "passDefEpa": 16,
              "rushDefEpa": 32,
              "pointsFor": 21,
              "pointsAgainst": 24
            },
            "gamesPlayed": 8
          },
          {
            "abbr": "CHI",
            "values": {
              "passOffEpa": 0.096,
              "turnoverDiff": -0.44,
              "passDefEpa": 0,
              "rushDefEpa": -0.042,
              "pointsFor": 26.78,
              "pointsAgainst": 20.44
            },
            "ranks": {
              "passOffEpa": 12,
              "turnoverDiff": 26,
              "passDefEpa": 12,
              "rushDefEpa": 21,
              "pointsFor": 7,
              "pointsAgainst": 9
            },
            "gamesPlayed": 9
          },
          {
            "abbr": "DET",
            "values": {
              "passOffEpa": 0.202,
              "turnoverDiff": 0.38,
              "passDefEpa": 0.134,
              "rushDefEpa": -0.074,
              "pointsFor": 27.75,
              "pointsAgainst": 23.63
            },
            "ranks": {
              "passOffEpa": 4,
              "turnoverDiff": 10,
              "passDefEpa": 24,
              "rushDefEpa": 9,
              "pointsFor": 5,
              "pointsAgainst": 17
            },
            "gamesPlayed": 8
          },
          {
            "abbr": "GB",
            "values": {
              "passOffEpa": 0.161,
              "turnoverDiff": 0.89,
              "passDefEpa": -0.033,
              "rushDefEpa": -0.05,
              "pointsFor": 24,
              "pointsAgainst": 21.22
            },
            "ranks": {
              "passOffEpa": 6,
              "turnoverDiff": 2,
              "passDefEpa": 6,
              "rushDefEpa": 19,
              "pointsFor": 12,
              "pointsAgainst": 11
            },
            "gamesPlayed": 9
          },
          {
            "abbr": "MIN",
            "values": {
              "passOffEpa": -0.089,
              "turnoverDiff": 0.63,
              "passDefEpa": -0.164,
              "rushDefEpa": -0.065,
              "pointsFor": 18.25,
              "pointsAgainst": 14.5
            },
            "ranks": {
              "passOffEpa": 27,
              "turnoverDiff": 6,
              "passDefEpa": 1,
              "rushDefEpa": 14,
              "pointsFor": 27,
              "pointsAgainst": 1
            },
            "gamesPlayed": 8
          },
          {
            "abbr": "ATL",
            "values": {
              "passOffEpa": -0.113,
              "turnoverDiff": -0.78,
              "passDefEpa": 0.085,
              "rushDefEpa": -0.096,
              "pointsFor": 20.89,
              "pointsAgainst": 24.78
            },
            "ranks": {
              "passOffEpa": 29,
              "turnoverDiff": 29,
              "passDefEpa": 20,
              "rushDefEpa": 3,
              "pointsFor": 23,
              "pointsAgainst": 21
            },
            "gamesPlayed": 9
          },
          {
            "abbr": "CAR",
            "values": {
              "passOffEpa": 0.068,
              "turnoverDiff": -0.12,
              "passDefEpa": 0.077,
              "rushDefEpa": 0.013,
              "pointsFor": 24.88,
              "pointsAgainst": 27.38
            },
            "ranks": {
              "passOffEpa": 15,
              "turnoverDiff": 21,
              "passDefEpa": 19,
              "rushDefEpa": 29,
              "pointsFor": 11,
              "pointsAgainst": 29
            },
            "gamesPlayed": 8
          },
          {
            "abbr": "NO",
            "values": {
              "passOffEpa": 0.027,
              "turnoverDiff": -0.75,
              "passDefEpa": 0.109,
              "rushDefEpa": -0.016,
              "pointsFor": 23.13,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 19,
              "turnoverDiff": 28,
              "passDefEpa": 22,
              "rushDefEpa": 22,
              "pointsFor": 15,
              "pointsAgainst": 27
            },
            "gamesPlayed": 8
          },
          {
            "abbr": "TB",
            "values": {
              "passOffEpa": -0.193,
              "turnoverDiff": 0.78,
              "passDefEpa": -0.145,
              "rushDefEpa": -0.084,
              "pointsFor": 22.44,
              "pointsAgainst": 19.78
            },
            "ranks": {
              "passOffEpa": 32,
              "turnoverDiff": 4,
              "passDefEpa": 2,
              "rushDefEpa": 7,
              "pointsFor": 18,
              "pointsAgainst": 7
            },
            "gamesPlayed": 9
          },
          {
            "abbr": "ARI",
            "values": {
              "passOffEpa": -0.024,
              "turnoverDiff": 0,
              "passDefEpa": 0.201,
              "rushDefEpa": -0.063,
              "pointsFor": 19.78,
              "pointsAgainst": 28.33
            },
            "ranks": {
              "passOffEpa": 23,
              "turnoverDiff": 17,
              "passDefEpa": 31,
              "rushDefEpa": 16,
              "pointsFor": 26,
              "pointsAgainst": 31
            },
            "gamesPlayed": 9
          },
          {
            "abbr": "LAR",
            "values": {
              "passOffEpa": 0.09,
              "turnoverDiff": -0.44,
              "passDefEpa": -0.083,
              "rushDefEpa": -0.084,
              "pointsFor": 23.78,
              "pointsAgainst": 20.11
            },
            "ranks": {
              "passOffEpa": 13,
              "turnoverDiff": 27,
              "passDefEpa": 3,
              "rushDefEpa": 8,
              "pointsFor": 13,
              "pointsAgainst": 8
            },
            "gamesPlayed": 9
          },
          {
            "abbr": "SF",
            "values": {
              "passOffEpa": 0.257,
              "turnoverDiff": 0.13,
              "passDefEpa": 0.051,
              "rushDefEpa": -0.141,
              "pointsFor": 29.38,
              "pointsAgainst": 19.5
            },
            "ranks": {
              "passOffEpa": 2,
              "turnoverDiff": 13,
              "passDefEpa": 17,
              "rushDefEpa": 1,
              "pointsFor": 3,
              "pointsAgainst": 6
            },
            "gamesPlayed": 8
          },
          {
            "abbr": "SEA",
            "values": {
              "passOffEpa": 0.044,
              "turnoverDiff": -0.11,
              "passDefEpa": -0.079,
              "rushDefEpa": -0.055,
              "pointsFor": 22.44,
              "pointsAgainst": 18
            },
            "ranks": {
              "passOffEpa": 18,
              "turnoverDiff": 19,
              "passDefEpa": 4,
              "rushDefEpa": 17,
              "pointsFor": 19,
              "pointsAgainst": 5
            },
            "gamesPlayed": 9
          }
        ],
        "weekly": [
          {
            "abbr": "BUF",
            "values": {
              "passOffEpa": 0.005,
              "turnoverDiff": 2,
              "passDefEpa": -0.582,
              "rushDefEpa": -0.487,
              "pointsFor": 23,
              "pointsAgainst": 6
            },
            "ranks": {
              "passOffEpa": 15,
              "turnoverDiff": 4,
              "passDefEpa": 2,
              "rushDefEpa": 1,
              "pointsFor": 12,
              "pointsAgainst": 2
            }
          },
          {
            "abbr": "MIA",
            "values": {
              "passOffEpa": -0.137,
              "turnoverDiff": 0,
              "passDefEpa": -0.037,
              "rushDefEpa": -0.095,
              "pointsFor": 9,
              "pointsAgainst": 19
            },
            "ranks": {
              "passOffEpa": 22,
              "turnoverDiff": 11,
              "passDefEpa": 14,
              "rushDefEpa": 15,
              "pointsFor": 28,
              "pointsAgainst": 11
            }
          },
          {
            "abbr": "NE",
            "values": {
              "passOffEpa": -0.093,
              "turnoverDiff": -4,
              "passDefEpa": 0.577,
              "rushDefEpa": -0.1,
              "pointsFor": 27,
              "pointsAgainst": 45
            },
            "ranks": {
              "passOffEpa": 21,
              "turnoverDiff": 29,
              "passDefEpa": 30,
              "rushDefEpa": 14,
              "pointsFor": 7,
              "pointsAgainst": 30
            }
          },
          {
            "abbr": "NYJ",
            "values": {
              "passOffEpa": -0.242,
              "turnoverDiff": 1,
              "passDefEpa": 0.214,
              "rushDefEpa": 0.059,
              "pointsFor": 12,
              "pointsAgainst": 35
            },
            "ranks": {
              "passOffEpa": 26,
              "turnoverDiff": 7,
              "passDefEpa": 24,
              "rushDefEpa": 26,
              "pointsFor": 25,
              "pointsAgainst": 27
            }
          },
          {
            "abbr": "BAL",
            "values": {
              "passOffEpa": -0.643,
              "turnoverDiff": -2,
              "passDefEpa": 0.372,
              "rushDefEpa": -0.142,
              "pointsFor": 10,
              "pointsAgainst": 33
            },
            "ranks": {
              "passOffEpa": 30,
              "turnoverDiff": 25,
              "passDefEpa": 27,
              "rushDefEpa": 10,
              "pointsFor": 27,
              "pointsAgainst": 25
            }
          },
          {
            "abbr": "CIN",
            "values": {
              "passOffEpa": 0.453,
              "turnoverDiff": 1,
              "passDefEpa": -0.057,
              "rushDefEpa": 0.285,
              "pointsFor": 34,
              "pointsAgainst": 17
            },
            "ranks": {
              "passOffEpa": 2,
              "turnoverDiff": 8,
              "passDefEpa": 13,
              "rushDefEpa": 30,
              "pointsFor": 5,
              "pointsAgainst": 8
            }
          },
          {
            "abbr": "CLE",
            "values": {
              "passOffEpa": 0.12,
              "turnoverDiff": 2,
              "passDefEpa": -0.034,
              "rushDefEpa": 0.089,
              "pointsFor": 22,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 11,
              "turnoverDiff": 5,
              "passDefEpa": 15,
              "rushDefEpa": 27,
              "pointsFor": 15,
              "pointsAgainst": 17
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
              "passOffEpa": 0.401,
              "turnoverDiff": 1,
              "passDefEpa": -0.06,
              "rushDefEpa": -0.264,
              "pointsFor": 44,
              "pointsAgainst": 22
            },
            "ranks": {
              "passOffEpa": 3,
              "turnoverDiff": 9,
              "passDefEpa": 12,
              "rushDefEpa": 3,
              "pointsFor": 2,
              "pointsAgainst": 15
            }
          },
          {
            "abbr": "IND",
            "values": {
              "passOffEpa": -0.202,
              "turnoverDiff": 0,
              "passDefEpa": 0.264,
              "rushDefEpa": 0.021,
              "pointsFor": 23,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 25,
              "turnoverDiff": 12,
              "passDefEpa": 26,
              "rushDefEpa": 23,
              "pointsFor": 13,
              "pointsAgainst": 22
            }
          },
          {
            "abbr": "JAX",
            "values": {
              "passOffEpa": 0.372,
              "turnoverDiff": 2,
              "passDefEpa": -0.643,
              "rushDefEpa": -0.04,
              "pointsFor": 33,
              "pointsAgainst": 10
            },
            "ranks": {
              "passOffEpa": 4,
              "turnoverDiff": 6,
              "passDefEpa": 1,
              "rushDefEpa": 20,
              "pointsFor": 6,
              "pointsAgainst": 4
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
              "passOffEpa": 0.173,
              "turnoverDiff": 1,
              "passDefEpa": 0.135,
              "rushDefEpa": 0.055,
              "pointsFor": 26,
              "pointsAgainst": 21
            },
            "ranks": {
              "passOffEpa": 9,
              "turnoverDiff": 10,
              "passDefEpa": 21,
              "rushDefEpa": 25,
              "pointsFor": 10,
              "pointsAgainst": 14
            }
          },
          {
            "abbr": "KC",
            "values": {
              "passOffEpa": 0.214,
              "turnoverDiff": -1,
              "passDefEpa": -0.242,
              "rushDefEpa": -0.265,
              "pointsFor": 35,
              "pointsAgainst": 12
            },
            "ranks": {
              "passOffEpa": 7,
              "turnoverDiff": 21,
              "passDefEpa": 5,
              "rushDefEpa": 2,
              "pointsFor": 4,
              "pointsAgainst": 6
            }
          },
          {
            "abbr": "LV",
            "values": {
              "passOffEpa": 0.015,
              "turnoverDiff": -4,
              "passDefEpa": 0.232,
              "rushDefEpa": 0.116,
              "pointsFor": 17,
              "pointsAgainst": 38
            },
            "ranks": {
              "passOffEpa": 14,
              "turnoverDiff": 30,
              "passDefEpa": 25,
              "rushDefEpa": 28,
              "pointsFor": 21,
              "pointsAgainst": 28
            }
          },
          {
            "abbr": "LAC",
            "values": {
              "passOffEpa": -0.06,
              "turnoverDiff": -1,
              "passDefEpa": 0.401,
              "rushDefEpa": -0.071,
              "pointsFor": 22,
              "pointsAgainst": 44
            },
            "ranks": {
              "passOffEpa": 19,
              "turnoverDiff": 22,
              "passDefEpa": 28,
              "rushDefEpa": 16,
              "pointsFor": 16,
              "pointsAgainst": 29
            }
          },
          {
            "abbr": "DAL",
            "values": {
              "passOffEpa": 0.264,
              "turnoverDiff": 0,
              "passDefEpa": -0.202,
              "rushDefEpa": -0.118,
              "pointsFor": 27,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 5,
              "turnoverDiff": 13,
              "passDefEpa": 6,
              "rushDefEpa": 13,
              "pointsFor": 8,
              "pointsAgainst": 18
            }
          },
          {
            "abbr": "NYG",
            "values": {
              "passOffEpa": 0.059,
              "turnoverDiff": 0,
              "passDefEpa": -0.329,
              "rushDefEpa": -0.069,
              "pointsFor": 19,
              "pointsAgainst": 11
            },
            "ranks": {
              "passOffEpa": 12,
              "turnoverDiff": 14,
              "passDefEpa": 3,
              "rushDefEpa": 17,
              "pointsFor": 19,
              "pointsAgainst": 5
            }
          },
          {
            "abbr": "PHI",
            "values": {
              "passOffEpa": -0.329,
              "turnoverDiff": 0,
              "passDefEpa": 0.059,
              "rushDefEpa": -0.198,
              "pointsFor": 11,
              "pointsAgainst": 19
            },
            "ranks": {
              "passOffEpa": 28,
              "turnoverDiff": 15,
              "passDefEpa": 19,
              "rushDefEpa": 7,
              "pointsFor": 26,
              "pointsAgainst": 12
            }
          },
          {
            "abbr": "WSH",
            "values": {
              "passOffEpa": -0.072,
              "turnoverDiff": 0,
              "passDefEpa": 0.056,
              "rushDefEpa": 0.024,
              "pointsFor": 13,
              "pointsAgainst": 20
            },
            "ranks": {
              "passOffEpa": 20,
              "turnoverDiff": 16,
              "passDefEpa": 18,
              "rushDefEpa": 24,
              "pointsFor": 24,
              "pointsAgainst": 13
            }
          },
          {
            "abbr": "CHI",
            "values": {
              "passOffEpa": -0.143,
              "turnoverDiff": -3,
              "passDefEpa": -0.276,
              "rushDefEpa": -0.017,
              "pointsFor": 27,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 23,
              "turnoverDiff": 28,
              "passDefEpa": 4,
              "rushDefEpa": 21,
              "pointsFor": 9,
              "pointsAgainst": 20
            }
          },
          {
            "abbr": "DET",
            "values": {
              "passOffEpa": -0.037,
              "turnoverDiff": 0,
              "passDefEpa": -0.137,
              "rushDefEpa": -0.2,
              "pointsFor": 19,
              "pointsAgainst": 9
            },
            "ranks": {
              "passOffEpa": 17,
              "turnoverDiff": 17,
              "passDefEpa": 9,
              "rushDefEpa": 6,
              "pointsFor": 20,
              "pointsAgainst": 3
            }
          },
          {
            "abbr": "GB",
            "values": {
              "passOffEpa": 0.577,
              "turnoverDiff": 4,
              "passDefEpa": -0.093,
              "rushDefEpa": 0.13,
              "pointsFor": 45,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 1,
              "turnoverDiff": 1,
              "passDefEpa": 10,
              "rushDefEpa": 29,
              "pointsFor": 1,
              "pointsAgainst": 23
            }
          },
          {
            "abbr": "MIN",
            "values": {
              "passOffEpa": -0.582,
              "turnoverDiff": -2,
              "passDefEpa": 0.005,
              "rushDefEpa": -0.067,
              "pointsFor": 6,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 29,
              "turnoverDiff": 26,
              "passDefEpa": 16,
              "rushDefEpa": 18,
              "pointsFor": 29,
              "pointsAgainst": 19
            }
          },
          {
            "abbr": "ATL",
            "values": {
              "passOffEpa": -0.057,
              "turnoverDiff": -1,
              "passDefEpa": 0.453,
              "rushDefEpa": -0.067,
              "pointsFor": 17,
              "pointsAgainst": 34
            },
            "ranks": {
              "passOffEpa": 18,
              "turnoverDiff": 23,
              "passDefEpa": 29,
              "rushDefEpa": 19,
              "pointsFor": 22,
              "pointsAgainst": 26
            }
          },
          {
            "abbr": "CAR",
            "values": {
              "passOffEpa": 0.135,
              "turnoverDiff": -1,
              "passDefEpa": 0.173,
              "rushDefEpa": -0.172,
              "pointsFor": 21,
              "pointsAgainst": 26
            },
            "ranks": {
              "passOffEpa": 10,
              "turnoverDiff": 24,
              "passDefEpa": 22,
              "rushDefEpa": 9,
              "pointsFor": 17,
              "pointsAgainst": 21
            }
          },
          {
            "abbr": "NO",
            "values": {
              "passOffEpa": -0.034,
              "turnoverDiff": -2,
              "passDefEpa": 0.12,
              "rushDefEpa": -0.261,
              "pointsFor": 23,
              "pointsAgainst": 22
            },
            "ranks": {
              "passOffEpa": 16,
              "turnoverDiff": 27,
              "passDefEpa": 20,
              "rushDefEpa": 4,
              "pointsFor": 14,
              "pointsAgainst": 16
            }
          },
          {
            "abbr": "TB",
            "values": {
              "passOffEpa": -0.276,
              "turnoverDiff": 3,
              "passDefEpa": -0.143,
              "rushDefEpa": -0.119,
              "pointsFor": 24,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 27,
              "turnoverDiff": 3,
              "passDefEpa": 8,
              "rushDefEpa": 12,
              "pointsFor": 11,
              "pointsAgainst": 24
            }
          },
          {
            "abbr": "ARI",
            "values": {
              "passOffEpa": -0.174,
              "turnoverDiff": 0,
              "passDefEpa": 0.18,
              "rushDefEpa": -0.017,
              "pointsFor": 3,
              "pointsAgainst": 17
            },
            "ranks": {
              "passOffEpa": 24,
              "turnoverDiff": 18,
              "passDefEpa": 23,
              "rushDefEpa": 22,
              "pointsFor": 30,
              "pointsAgainst": 9
            }
          },
          {
            "abbr": "LAR",
            "values": {
              "passOffEpa": 0.056,
              "turnoverDiff": 0,
              "passDefEpa": -0.072,
              "rushDefEpa": -0.194,
              "pointsFor": 20,
              "pointsAgainst": 13
            },
            "ranks": {
              "passOffEpa": 13,
              "turnoverDiff": 19,
              "passDefEpa": 11,
              "rushDefEpa": 8,
              "pointsFor": 18,
              "pointsAgainst": 7
            }
          },
          {
            "abbr": "SF",
            "values": {
              "passOffEpa": 0.232,
              "turnoverDiff": 4,
              "passDefEpa": 0.015,
              "rushDefEpa": -0.205,
              "pointsFor": 38,
              "pointsAgainst": 17
            },
            "ranks": {
              "passOffEpa": 6,
              "turnoverDiff": 2,
              "passDefEpa": 17,
              "rushDefEpa": 5,
              "pointsFor": 3,
              "pointsAgainst": 10
            }
          },
          {
            "abbr": "SEA",
            "values": {
              "passOffEpa": 0.18,
              "turnoverDiff": 0,
              "passDefEpa": -0.174,
              "rushDefEpa": -0.125,
              "pointsFor": 17,
              "pointsAgainst": 3
            },
            "ranks": {
              "passOffEpa": 8,
              "turnoverDiff": 20,
              "passDefEpa": 7,
              "rushDefEpa": 11,
              "pointsFor": 23,
              "pointsAgainst": 1
            }
          }
        ]
      },
      "10": {
        "cumulative": [
          {
            "abbr": "BUF",
            "values": {
              "passOffEpa": 0.191,
              "turnoverDiff": 0,
              "passDefEpa": 0.011,
              "rushDefEpa": -0.03,
              "pointsFor": 31.89,
              "pointsAgainst": 22.11
            },
            "ranks": {
              "passOffEpa": 5,
              "turnoverDiff": 17,
              "passDefEpa": 13,
              "rushDefEpa": 21,
              "pointsFor": 1,
              "pointsAgainst": 15
            },
            "gamesPlayed": 9
          },
          {
            "abbr": "MIA",
            "values": {
              "passOffEpa": -0.076,
              "turnoverDiff": -0.22,
              "passDefEpa": 0.192,
              "rushDefEpa": -0.081,
              "pointsFor": 16.44,
              "pointsAgainst": 24.89
            },
            "ranks": {
              "passOffEpa": 27,
              "turnoverDiff": 20,
              "passDefEpa": 29,
              "rushDefEpa": 9,
              "pointsFor": 30,
              "pointsAgainst": 21
            },
            "gamesPlayed": 9
          },
          {
            "abbr": "NE",
            "values": {
              "passOffEpa": 0.091,
              "turnoverDiff": -1,
              "passDefEpa": 0.143,
              "rushDefEpa": -0.032,
              "pointsFor": 22.1,
              "pointsAgainst": 24.2
            },
            "ranks": {
              "passOffEpa": 13,
              "turnoverDiff": 31,
              "passDefEpa": 26,
              "rushDefEpa": 20,
              "pointsFor": 18,
              "pointsAgainst": 17
            },
            "gamesPlayed": 10
          },
          {
            "abbr": "NYJ",
            "values": {
              "passOffEpa": 0.043,
              "turnoverDiff": 0.3,
              "passDefEpa": 0.147,
              "rushDefEpa": -0.028,
              "pointsFor": 19.4,
              "pointsAgainst": 25.4
            },
            "ranks": {
              "passOffEpa": 18,
              "turnoverDiff": 11,
              "passDefEpa": 27,
              "rushDefEpa": 22,
              "pointsFor": 26,
              "pointsAgainst": 22
            },
            "gamesPlayed": 10
          },
          {
            "abbr": "BAL",
            "values": {
              "passOffEpa": 0.052,
              "turnoverDiff": -0.4,
              "passDefEpa": 0.131,
              "rushDefEpa": -0.052,
              "pointsFor": 20.9,
              "pointsAgainst": 25.9
            },
            "ranks": {
              "passOffEpa": 16,
              "turnoverDiff": 25,
              "passDefEpa": 25,
              "rushDefEpa": 15,
              "pointsFor": 22,
              "pointsAgainst": 24
            },
            "gamesPlayed": 10
          },
          {
            "abbr": "CIN",
            "values": {
              "passOffEpa": 0.271,
              "turnoverDiff": 0.22,
              "passDefEpa": 0,
              "rushDefEpa": 0.022,
              "pointsFor": 30.89,
              "pointsAgainst": 21.44
            },
            "ranks": {
              "passOffEpa": 3,
              "turnoverDiff": 13,
              "passDefEpa": 11,
              "rushDefEpa": 30,
              "pointsFor": 3,
              "pointsAgainst": 10
            },
            "gamesPlayed": 9
          },
          {
            "abbr": "CLE",
            "values": {
              "passOffEpa": 0.005,
              "turnoverDiff": 0.1,
              "passDefEpa": -0.003,
              "rushDefEpa": -0.004,
              "pointsFor": 18.8,
              "pointsAgainst": 22
            },
            "ranks": {
              "passOffEpa": 22,
              "turnoverDiff": 16,
              "passDefEpa": 9,
              "rushDefEpa": 26,
              "pointsFor": 27,
              "pointsAgainst": 13
            },
            "gamesPlayed": 10
          },
          {
            "abbr": "PIT",
            "values": {
              "passOffEpa": -0.069,
              "turnoverDiff": 0.56,
              "passDefEpa": 0.035,
              "rushDefEpa": -0.068,
              "pointsFor": 22,
              "pointsAgainst": 20.22
            },
            "ranks": {
              "passOffEpa": 26,
              "turnoverDiff": 6,
              "passDefEpa": 15,
              "rushDefEpa": 11,
              "pointsFor": 19,
              "pointsAgainst": 7
            },
            "gamesPlayed": 9
          },
          {
            "abbr": "HOU",
            "values": {
              "passOffEpa": 0.127,
              "turnoverDiff": 0.44,
              "passDefEpa": 0.033,
              "rushDefEpa": -0.044,
              "pointsFor": 25.89,
              "pointsAgainst": 24.33
            },
            "ranks": {
              "passOffEpa": 9,
              "turnoverDiff": 9,
              "passDefEpa": 14,
              "rushDefEpa": 17,
              "pointsFor": 9,
              "pointsAgainst": 18
            },
            "gamesPlayed": 9
          },
          {
            "abbr": "IND",
            "values": {
              "passOffEpa": -0.182,
              "turnoverDiff": -1.2,
              "passDefEpa": 0.051,
              "rushDefEpa": 0.01,
              "pointsFor": 20.8,
              "pointsAgainst": 27.1
            },
            "ranks": {
              "passOffEpa": 31,
              "turnoverDiff": 32,
              "passDefEpa": 16,
              "rushDefEpa": 28,
              "pointsFor": 23,
              "pointsAgainst": 29
            },
            "gamesPlayed": 10
          },
          {
            "abbr": "JAX",
            "values": {
              "passOffEpa": 0.284,
              "turnoverDiff": 1,
              "passDefEpa": -0.083,
              "rushDefEpa": -0.096,
              "pointsFor": 29.89,
              "pointsAgainst": 16
            },
            "ranks": {
              "passOffEpa": 2,
              "turnoverDiff": 1,
              "passDefEpa": 5,
              "rushDefEpa": 2,
              "pointsFor": 4,
              "pointsAgainst": 2
            },
            "gamesPlayed": 9
          },
          {
            "abbr": "TEN",
            "values": {
              "passOffEpa": -0.066,
              "turnoverDiff": -0.11,
              "passDefEpa": 0.196,
              "rushDefEpa": -0.06,
              "pointsFor": 18.56,
              "pointsAgainst": 26.56
            },
            "ranks": {
              "passOffEpa": 25,
              "turnoverDiff": 19,
              "passDefEpa": 30,
              "rushDefEpa": 13,
              "pointsFor": 28,
              "pointsAgainst": 27
            },
            "gamesPlayed": 9
          },
          {
            "abbr": "DEN",
            "values": {
              "passOffEpa": 0.019,
              "turnoverDiff": 0.56,
              "passDefEpa": -0.001,
              "rushDefEpa": 0.015,
              "pointsFor": 22,
              "pointsAgainst": 20.67
            },
            "ranks": {
              "passOffEpa": 20,
              "turnoverDiff": 7,
              "passDefEpa": 10,
              "rushDefEpa": 29,
              "pointsFor": 20,
              "pointsAgainst": 9
            },
            "gamesPlayed": 9
          },
          {
            "abbr": "KC",
            "values": {
              "passOffEpa": 0.155,
              "turnoverDiff": 0.67,
              "passDefEpa": -0.06,
              "rushDefEpa": -0.082,
              "pointsFor": 26.33,
              "pointsAgainst": 17.33
            },
            "ranks": {
              "passOffEpa": 7,
              "turnoverDiff": 5,
              "passDefEpa": 6,
              "rushDefEpa": 7,
              "pointsFor": 8,
              "pointsAgainst": 3
            },
            "gamesPlayed": 9
          },
          {
            "abbr": "LV",
            "values": {
              "passOffEpa": 0.12,
              "turnoverDiff": 0.3,
              "passDefEpa": 0.183,
              "rushDefEpa": -0.006,
              "pointsFor": 25.1,
              "pointsAgainst": 28.9
            },
            "ranks": {
              "passOffEpa": 10,
              "turnoverDiff": 12,
              "passDefEpa": 28,
              "rushDefEpa": 24,
              "pointsFor": 10,
              "pointsAgainst": 31
            },
            "gamesPlayed": 10
          },
          {
            "abbr": "LAC",
            "values": {
              "passOffEpa": -0.18,
              "turnoverDiff": -0.56,
              "passDefEpa": 0.071,
              "rushDefEpa": -0.072,
              "pointsFor": 16,
              "pointsAgainst": 26.56
            },
            "ranks": {
              "passOffEpa": 30,
              "turnoverDiff": 28,
              "passDefEpa": 19,
              "rushDefEpa": 10,
              "pointsFor": 32,
              "pointsAgainst": 28
            },
            "gamesPlayed": 9
          },
          {
            "abbr": "DAL",
            "values": {
              "passOffEpa": 0.158,
              "turnoverDiff": -0.3,
              "passDefEpa": 0.203,
              "rushDefEpa": 0.028,
              "pointsFor": 28.6,
              "pointsAgainst": 28.2
            },
            "ranks": {
              "passOffEpa": 6,
              "turnoverDiff": 22,
              "passDefEpa": 31,
              "rushDefEpa": 31,
              "pointsFor": 5,
              "pointsAgainst": 30
            },
            "gamesPlayed": 10
          },
          {
            "abbr": "NYG",
            "values": {
              "passOffEpa": 0.062,
              "turnoverDiff": -0.22,
              "passDefEpa": -0.014,
              "rushDefEpa": -0.004,
              "pointsFor": 22.56,
              "pointsAgainst": 21.78
            },
            "ranks": {
              "passOffEpa": 15,
              "turnoverDiff": 21,
              "passDefEpa": 8,
              "rushDefEpa": 27,
              "pointsFor": 14,
              "pointsAgainst": 11
            },
            "gamesPlayed": 9
          },
          {
            "abbr": "PHI",
            "values": {
              "passOffEpa": -0.112,
              "turnoverDiff": -0.44,
              "passDefEpa": 0.126,
              "rushDefEpa": -0.005,
              "pointsFor": 16.44,
              "pointsAgainst": 24.56
            },
            "ranks": {
              "passOffEpa": 28,
              "turnoverDiff": 26,
              "passDefEpa": 24,
              "rushDefEpa": 25,
              "pointsFor": 31,
              "pointsAgainst": 19
            },
            "gamesPlayed": 9
          },
          {
            "abbr": "WSH",
            "values": {
              "passOffEpa": 0.02,
              "turnoverDiff": 0.78,
              "passDefEpa": 0.057,
              "rushDefEpa": 0.038,
              "pointsFor": 21.78,
              "pointsAgainst": 24.78
            },
            "ranks": {
              "passOffEpa": 19,
              "turnoverDiff": 3,
              "passDefEpa": 17,
              "rushDefEpa": 32,
              "pointsFor": 21,
              "pointsAgainst": 20
            },
            "gamesPlayed": 9
          },
          {
            "abbr": "CHI",
            "values": {
              "passOffEpa": 0.096,
              "turnoverDiff": -0.44,
              "passDefEpa": 0,
              "rushDefEpa": -0.042,
              "pointsFor": 26.78,
              "pointsAgainst": 20.44
            },
            "ranks": {
              "passOffEpa": 12,
              "turnoverDiff": 27,
              "passDefEpa": 12,
              "rushDefEpa": 18,
              "pointsFor": 7,
              "pointsAgainst": 8
            },
            "gamesPlayed": 9
          },
          {
            "abbr": "DET",
            "values": {
              "passOffEpa": 0.203,
              "turnoverDiff": 0.22,
              "passDefEpa": 0.093,
              "rushDefEpa": -0.082,
              "pointsFor": 28.56,
              "pointsAgainst": 22.11
            },
            "ranks": {
              "passOffEpa": 4,
              "turnoverDiff": 14,
              "passDefEpa": 22,
              "rushDefEpa": 8,
              "pointsFor": 6,
              "pointsAgainst": 16
            },
            "gamesPlayed": 9
          },
          {
            "abbr": "GB",
            "values": {
              "passOffEpa": 0.14,
              "turnoverDiff": 0.5,
              "passDefEpa": -0.018,
              "rushDefEpa": -0.047,
              "pointsFor": 22.6,
              "pointsAgainst": 22.1
            },
            "ranks": {
              "passOffEpa": 8,
              "turnoverDiff": 8,
              "passDefEpa": 7,
              "rushDefEpa": 16,
              "pointsFor": 13,
              "pointsAgainst": 14
            },
            "gamesPlayed": 10
          },
          {
            "abbr": "MIN",
            "values": {
              "passOffEpa": -0.061,
              "turnoverDiff": 0.89,
              "passDefEpa": -0.153,
              "rushDefEpa": -0.085,
              "pointsFor": 19.56,
              "pointsAgainst": 14
            },
            "ranks": {
              "passOffEpa": 24,
              "turnoverDiff": 2,
              "passDefEpa": 1,
              "rushDefEpa": 5,
              "pointsFor": 25,
              "pointsAgainst": 1
            },
            "gamesPlayed": 9
          },
          {
            "abbr": "ATL",
            "values": {
              "passOffEpa": -0.143,
              "turnoverDiff": -0.9,
              "passDefEpa": 0.107,
              "rushDefEpa": -0.086,
              "pointsFor": 20.1,
              "pointsAgainst": 25.8
            },
            "ranks": {
              "passOffEpa": 29,
              "turnoverDiff": 30,
              "passDefEpa": 23,
              "rushDefEpa": 4,
              "pointsFor": 24,
              "pointsAgainst": 23
            },
            "gamesPlayed": 10
          },
          {
            "abbr": "CAR",
            "values": {
              "passOffEpa": 0.046,
              "turnoverDiff": 0.11,
              "passDefEpa": 0.059,
              "rushDefEpa": -0.035,
              "pointsFor": 24.33,
              "pointsAgainst": 26.22
            },
            "ranks": {
              "passOffEpa": 17,
              "turnoverDiff": 15,
              "passDefEpa": 18,
              "rushDefEpa": 19,
              "pointsFor": 12,
              "pointsAgainst": 25
            },
            "gamesPlayed": 9
          },
          {
            "abbr": "NO",
            "values": {
              "passOffEpa": 0.016,
              "turnoverDiff": -0.89,
              "passDefEpa": 0.079,
              "rushDefEpa": -0.01,
              "pointsFor": 22.44,
              "pointsAgainst": 26.22
            },
            "ranks": {
              "passOffEpa": 21,
              "turnoverDiff": 29,
              "passDefEpa": 21,
              "rushDefEpa": 23,
              "pointsFor": 15,
              "pointsAgainst": 26
            },
            "gamesPlayed": 9
          },
          {
            "abbr": "TB",
            "values": {
              "passOffEpa": -0.193,
              "turnoverDiff": 0.78,
              "passDefEpa": -0.145,
              "rushDefEpa": -0.084,
              "pointsFor": 22.44,
              "pointsAgainst": 19.78
            },
            "ranks": {
              "passOffEpa": 32,
              "turnoverDiff": 4,
              "passDefEpa": 2,
              "rushDefEpa": 6,
              "pointsFor": 16,
              "pointsAgainst": 6
            },
            "gamesPlayed": 9
          },
          {
            "abbr": "ARI",
            "values": {
              "passOffEpa": -0.057,
              "turnoverDiff": -0.1,
              "passDefEpa": 0.228,
              "rushDefEpa": -0.053,
              "pointsFor": 18.4,
              "pointsAgainst": 28.9
            },
            "ranks": {
              "passOffEpa": 23,
              "turnoverDiff": 18,
              "passDefEpa": 32,
              "rushDefEpa": 14,
              "pointsFor": 29,
              "pointsAgainst": 32
            },
            "gamesPlayed": 10
          },
          {
            "abbr": "LAR",
            "values": {
              "passOffEpa": 0.119,
              "turnoverDiff": -0.3,
              "passDefEpa": -0.119,
              "rushDefEpa": -0.096,
              "pointsFor": 24.8,
              "pointsAgainst": 18.7
            },
            "ranks": {
              "passOffEpa": 11,
              "turnoverDiff": 23,
              "passDefEpa": 3,
              "rushDefEpa": 3,
              "pointsFor": 11,
              "pointsAgainst": 5
            },
            "gamesPlayed": 10
          },
          {
            "abbr": "SF",
            "values": {
              "passOffEpa": 0.304,
              "turnoverDiff": 0.33,
              "passDefEpa": 0.072,
              "rushDefEpa": -0.103,
              "pointsFor": 31.22,
              "pointsAgainst": 21.78
            },
            "ranks": {
              "passOffEpa": 1,
              "turnoverDiff": 10,
              "passDefEpa": 20,
              "rushDefEpa": 1,
              "pointsFor": 2,
              "pointsAgainst": 12
            },
            "gamesPlayed": 9
          },
          {
            "abbr": "SEA",
            "values": {
              "passOffEpa": 0.067,
              "turnoverDiff": -0.3,
              "passDefEpa": -0.094,
              "rushDefEpa": -0.064,
              "pointsFor": 22.3,
              "pointsAgainst": 17.5
            },
            "ranks": {
              "passOffEpa": 14,
              "turnoverDiff": 24,
              "passDefEpa": 4,
              "rushDefEpa": 12,
              "pointsFor": 17,
              "pointsAgainst": 4
            },
            "gamesPlayed": 10
          }
        ],
        "weekly": [
          {
            "abbr": "BUF",
            "values": {
              "passOffEpa": 0.172,
              "turnoverDiff": 0,
              "passDefEpa": -0.15,
              "rushDefEpa": 0.164,
              "pointsFor": 31,
              "pointsAgainst": 12
            },
            "ranks": {
              "passOffEpa": 9,
              "turnoverDiff": 10,
              "passDefEpa": 8,
              "rushDefEpa": 23,
              "pointsFor": 8,
              "pointsAgainst": 4
            }
          },
          {
            "abbr": "MIA",
            "values": {
              "passOffEpa": -0.229,
              "turnoverDiff": 1,
              "passDefEpa": -0.488,
              "rushDefEpa": -0.032,
              "pointsFor": 22,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 24,
              "turnoverDiff": 7,
              "passDefEpa": 2,
              "rushDefEpa": 11,
              "pointsFor": 16,
              "pointsAgainst": 16
            }
          },
          {
            "abbr": "NE",
            "values": {
              "passOffEpa": -0.33,
              "turnoverDiff": 1,
              "passDefEpa": 0.21,
              "rushDefEpa": 0.241,
              "pointsFor": 10,
              "pointsAgainst": 35
            },
            "ranks": {
              "passOffEpa": 26,
              "turnoverDiff": 8,
              "passDefEpa": 22,
              "rushDefEpa": 26,
              "pointsFor": 26,
              "pointsAgainst": 23
            }
          },
          {
            "abbr": "NYJ",
            "values": {
              "passOffEpa": -0.15,
              "turnoverDiff": 0,
              "passDefEpa": 0.172,
              "rushDefEpa": 0.354,
              "pointsFor": 12,
              "pointsAgainst": 31
            },
            "ranks": {
              "passOffEpa": 21,
              "turnoverDiff": 11,
              "passDefEpa": 20,
              "rushDefEpa": 28,
              "pointsFor": 25,
              "pointsAgainst": 21
            }
          },
          {
            "abbr": "BAL",
            "values": {
              "passOffEpa": 0.052,
              "turnoverDiff": -2,
              "passDefEpa": -0.081,
              "rushDefEpa": 0.039,
              "pointsFor": 20,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 13,
              "turnoverDiff": 23,
              "passDefEpa": 11,
              "rushDefEpa": 19,
              "pointsFor": 19,
              "pointsAgainst": 14
            }
          },
          {
            "abbr": "CIN",
            "values": {
              "passOffEpa": 0.475,
              "turnoverDiff": 0,
              "passDefEpa": -0.048,
              "rushDefEpa": 0.113,
              "pointsFor": 38,
              "pointsAgainst": 18
            },
            "ranks": {
              "passOffEpa": 3,
              "turnoverDiff": 12,
              "passDefEpa": 13,
              "rushDefEpa": 22,
              "pointsFor": 4,
              "pointsAgainst": 8
            }
          },
          {
            "abbr": "CLE",
            "values": {
              "passOffEpa": -0.035,
              "turnoverDiff": 0,
              "passDefEpa": 0.004,
              "rushDefEpa": -0.116,
              "pointsFor": 27,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 15,
              "turnoverDiff": 13,
              "passDefEpa": 15,
              "rushDefEpa": 7,
              "pointsFor": 10,
              "pointsAgainst": 17
            }
          },
          {
            "abbr": "PIT",
            "values": {
              "passOffEpa": -0.048,
              "turnoverDiff": 0,
              "passDefEpa": 0.475,
              "rushDefEpa": 0.078,
              "pointsFor": 18,
              "pointsAgainst": 38
            },
            "ranks": {
              "passOffEpa": 16,
              "turnoverDiff": 14,
              "passDefEpa": 26,
              "rushDefEpa": 20,
              "pointsFor": 21,
              "pointsAgainst": 25
            }
          },
          {
            "abbr": "HOU",
            "values": {
              "passOffEpa": 0.004,
              "turnoverDiff": 0,
              "passDefEpa": -0.035,
              "rushDefEpa": 0.004,
              "pointsFor": 24,
              "pointsAgainst": 27
            },
            "ranks": {
              "passOffEpa": 14,
              "turnoverDiff": 15,
              "passDefEpa": 14,
              "rushDefEpa": 16,
              "pointsFor": 11,
              "pointsAgainst": 19
            }
          },
          {
            "abbr": "IND",
            "values": {
              "passOffEpa": -0.488,
              "turnoverDiff": -1,
              "passDefEpa": -0.229,
              "rushDefEpa": -0.179,
              "pointsFor": 24,
              "pointsAgainst": 22
            },
            "ranks": {
              "passOffEpa": 27,
              "turnoverDiff": 20,
              "passDefEpa": 5,
              "rushDefEpa": 4,
              "pointsFor": 12,
              "pointsAgainst": 13
            }
          },
          {
            "abbr": "JAX",
            "values": {
              "passOffEpa": 0.449,
              "turnoverDiff": 0,
              "passDefEpa": -0.134,
              "rushDefEpa": 0.25,
              "pointsFor": 40,
              "pointsAgainst": 23
            },
            "ranks": {
              "passOffEpa": 4,
              "turnoverDiff": 16,
              "passDefEpa": 9,
              "rushDefEpa": 27,
              "pointsFor": 2,
              "pointsAgainst": 15
            }
          },
          {
            "abbr": "TEN",
            "values": {
              "passOffEpa": -0.134,
              "turnoverDiff": 0,
              "passDefEpa": 0.449,
              "rushDefEpa": -0.041,
              "pointsFor": 23,
              "pointsAgainst": 40
            },
            "ranks": {
              "passOffEpa": 20,
              "turnoverDiff": 17,
              "passDefEpa": 25,
              "rushDefEpa": 10,
              "pointsFor": 14,
              "pointsAgainst": 26
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
              "passOffEpa": 0.318,
              "turnoverDiff": 2,
              "passDefEpa": -0.318,
              "rushDefEpa": 0.001,
              "pointsFor": 35,
              "pointsAgainst": 13
            },
            "ranks": {
              "passOffEpa": 6,
              "turnoverDiff": 2,
              "passDefEpa": 4,
              "rushDefEpa": 14,
              "pointsFor": 5,
              "pointsAgainst": 5
            }
          },
          {
            "abbr": "LV",
            "values": {
              "passOffEpa": -0.228,
              "turnoverDiff": 2,
              "passDefEpa": 0.412,
              "rushDefEpa": -0.071,
              "pointsFor": 13,
              "pointsAgainst": 21
            },
            "ranks": {
              "passOffEpa": 23,
              "turnoverDiff": 3,
              "passDefEpa": 24,
              "rushDefEpa": 8,
              "pointsFor": 23,
              "pointsAgainst": 11
            }
          },
          {
            "abbr": "LAC",
            "values": {
              "passOffEpa": -0.081,
              "turnoverDiff": 2,
              "passDefEpa": 0.052,
              "rushDefEpa": -0.06,
              "pointsFor": 23,
              "pointsAgainst": 20
            },
            "ranks": {
              "passOffEpa": 18,
              "turnoverDiff": 4,
              "passDefEpa": 16,
              "rushDefEpa": 9,
              "pointsFor": 15,
              "pointsAgainst": 9
            }
          },
          {
            "abbr": "DAL",
            "values": {
              "passOffEpa": 0.191,
              "turnoverDiff": -2,
              "passDefEpa": 0.652,
              "rushDefEpa": 0.233,
              "pointsFor": 40,
              "pointsAgainst": 46
            },
            "ranks": {
              "passOffEpa": 8,
              "turnoverDiff": 24,
              "passDefEpa": 28,
              "rushDefEpa": 25,
              "pointsFor": 3,
              "pointsAgainst": 28
            }
          },
          {
            "abbr": "NYG",
            "values": {
              "passOffEpa": 0.142,
              "turnoverDiff": 0,
              "passDefEpa": 0.091,
              "rushDefEpa": -0.005,
              "pointsFor": 21,
              "pointsAgainst": 24
            },
            "ranks": {
              "passOffEpa": 10,
              "turnoverDiff": 18,
              "passDefEpa": 17,
              "rushDefEpa": 13,
              "pointsFor": 17,
              "pointsAgainst": 18
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
              "passOffEpa": 0.091,
              "turnoverDiff": 0,
              "passDefEpa": 0.142,
              "rushDefEpa": 0.088,
              "pointsFor": 24,
              "pointsAgainst": 21
            },
            "ranks": {
              "passOffEpa": 12,
              "turnoverDiff": 19,
              "passDefEpa": 19,
              "rushDefEpa": 21,
              "pointsFor": 13,
              "pointsAgainst": 12
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
              "passOffEpa": 0.21,
              "turnoverDiff": -1,
              "passDefEpa": -0.33,
              "rushDefEpa": -0.151,
              "pointsFor": 35,
              "pointsAgainst": 10
            },
            "ranks": {
              "passOffEpa": 7,
              "turnoverDiff": 21,
              "passDefEpa": 3,
              "rushDefEpa": 5,
              "pointsFor": 6,
              "pointsAgainst": 2
            }
          },
          {
            "abbr": "GB",
            "values": {
              "passOffEpa": -0.07,
              "turnoverDiff": -3,
              "passDefEpa": 0.14,
              "rushDefEpa": -0.023,
              "pointsFor": 10,
              "pointsAgainst": 30
            },
            "ranks": {
              "passOffEpa": 17,
              "turnoverDiff": 28,
              "passDefEpa": 18,
              "rushDefEpa": 12,
              "pointsFor": 27,
              "pointsAgainst": 20
            }
          },
          {
            "abbr": "MIN",
            "values": {
              "passOffEpa": 0.14,
              "turnoverDiff": 3,
              "passDefEpa": -0.07,
              "rushDefEpa": -0.353,
              "pointsFor": 30,
              "pointsAgainst": 10
            },
            "ranks": {
              "passOffEpa": 11,
              "turnoverDiff": 1,
              "passDefEpa": 12,
              "rushDefEpa": 3,
              "pointsFor": 9,
              "pointsAgainst": 3
            }
          },
          {
            "abbr": "ATL",
            "values": {
              "passOffEpa": -0.318,
              "turnoverDiff": -2,
              "passDefEpa": 0.318,
              "rushDefEpa": 0.002,
              "pointsFor": 13,
              "pointsAgainst": 35
            },
            "ranks": {
              "passOffEpa": 25,
              "turnoverDiff": 25,
              "passDefEpa": 23,
              "rushDefEpa": 15,
              "pointsFor": 24,
              "pointsAgainst": 24
            }
          },
          {
            "abbr": "CAR",
            "values": {
              "passOffEpa": -0.176,
              "turnoverDiff": 2,
              "passDefEpa": -0.085,
              "rushDefEpa": -0.518,
              "pointsFor": 20,
              "pointsAgainst": 17
            },
            "ranks": {
              "passOffEpa": 22,
              "turnoverDiff": 5,
              "passDefEpa": 10,
              "rushDefEpa": 1,
              "pointsFor": 20,
              "pointsAgainst": 7
            }
          },
          {
            "abbr": "NO",
            "values": {
              "passOffEpa": -0.085,
              "turnoverDiff": -2,
              "passDefEpa": -0.176,
              "rushDefEpa": 0.033,
              "pointsFor": 17,
              "pointsAgainst": 20
            },
            "ranks": {
              "passOffEpa": 19,
              "turnoverDiff": 26,
              "passDefEpa": 7,
              "rushDefEpa": 18,
              "pointsFor": 22,
              "pointsAgainst": 10
            }
          },
          {
            "abbr": "TB",
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
            "abbr": "ARI",
            "values": {
              "passOffEpa": -0.601,
              "turnoverDiff": -1,
              "passDefEpa": 0.502,
              "rushDefEpa": 0.007,
              "pointsFor": 6,
              "pointsAgainst": 34
            },
            "ranks": {
              "passOffEpa": 28,
              "turnoverDiff": 22,
              "passDefEpa": 27,
              "rushDefEpa": 17,
              "pointsFor": 28,
              "pointsAgainst": 22
            }
          },
          {
            "abbr": "LAR",
            "values": {
              "passOffEpa": 0.502,
              "turnoverDiff": 1,
              "passDefEpa": -0.601,
              "rushDefEpa": -0.355,
              "pointsFor": 34,
              "pointsAgainst": 6
            },
            "ranks": {
              "passOffEpa": 2,
              "turnoverDiff": 9,
              "passDefEpa": 1,
              "rushDefEpa": 2,
              "pointsFor": 7,
              "pointsAgainst": 1
            }
          },
          {
            "abbr": "SF",
            "values": {
              "passOffEpa": 0.652,
              "turnoverDiff": 2,
              "passDefEpa": 0.191,
              "rushDefEpa": 0.204,
              "pointsFor": 46,
              "pointsAgainst": 40
            },
            "ranks": {
              "passOffEpa": 1,
              "turnoverDiff": 6,
              "passDefEpa": 21,
              "rushDefEpa": 24,
              "pointsFor": 1,
              "pointsAgainst": 27
            }
          },
          {
            "abbr": "SEA",
            "values": {
              "passOffEpa": 0.412,
              "turnoverDiff": -2,
              "passDefEpa": -0.228,
              "rushDefEpa": -0.144,
              "pointsFor": 21,
              "pointsAgainst": 13
            },
            "ranks": {
              "passOffEpa": 5,
              "turnoverDiff": 27,
              "passDefEpa": 6,
              "rushDefEpa": 6,
              "pointsFor": 18,
              "pointsAgainst": 6
            }
          }
        ]
      }
    }
  }
};
