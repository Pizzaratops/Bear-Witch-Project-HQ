// ============================================================
//  NFL_POWER_SCORE — "Bootleg Power Score" Spinnennetz (nflverse)
// ============================================================
//  AUTO-GENERIERT von scripts/sync-nfl-power-score.js über die GitHub
//  Action ".github/workflows/sync-nfl-power-score.yml". Nicht von Hand
//  editieren — Änderungen werden beim nächsten Sync überschrieben.
//  Zuletzt synchronisiert: 2026-09-12T11:54:14.262Z
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
            "abbr": "MIA",
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
              "passOffEpa": 3,
              "turnoverDiff": 4,
              "passDefEpa": 3,
              "rushDefYds": 1,
              "pointsFor": 3,
              "pointsAgainst": 3
            },
            "gamesPlayed": 1
          },
          {
            "abbr": "NYJ",
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
            "abbr": "BAL",
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
            "abbr": "CIN",
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
            "abbr": "CLE",
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
            "abbr": "PIT",
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
            "abbr": "HOU",
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
            "abbr": "IND",
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
            "abbr": "JAX",
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
            "abbr": "TEN",
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
            "abbr": "LAC",
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
            "abbr": "DAL",
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
            "abbr": "NYG",
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
            "abbr": "PHI",
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
            "abbr": "WSH",
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
            "abbr": "CHI",
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
            "abbr": "DET",
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
            "abbr": "GB",
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
            "abbr": "MIN",
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
            },
            "gamesPlayed": 0
          },
          {
            "abbr": "CAR",
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
            },
            "gamesPlayed": 0
          },
          {
            "abbr": "TB",
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
            "abbr": "ARI",
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
              "passOffEpa": 4,
              "turnoverDiff": 3,
              "passDefEpa": 4,
              "rushDefYds": 4,
              "pointsFor": 4,
              "pointsAgainst": 4
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
              "passOffEpa": 1,
              "turnoverDiff": 2,
              "passDefEpa": 1,
              "rushDefYds": 3,
              "pointsFor": 1,
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
              "passOffEpa": 2,
              "turnoverDiff": 1,
              "passDefEpa": 2,
              "rushDefYds": 2,
              "pointsFor": 2,
              "pointsAgainst": 2
            },
            "gamesPlayed": 1
          }
        ],
        "weekly": [
          {
            "abbr": "BUF",
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
            "abbr": "MIA",
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
              "passOffEpa": 3,
              "turnoverDiff": 4,
              "passDefEpa": 3,
              "rushDefYds": 1,
              "pointsFor": 3,
              "pointsAgainst": 3
            }
          },
          {
            "abbr": "NYJ",
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
            "abbr": "BAL",
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
            "abbr": "CIN",
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
            "abbr": "CLE",
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
            "abbr": "PIT",
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
            "abbr": "HOU",
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
            "abbr": "IND",
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
            "abbr": "JAX",
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
            "abbr": "TEN",
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
            "abbr": "LAC",
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
            "abbr": "DAL",
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
            "abbr": "NYG",
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
            "abbr": "PHI",
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
            "abbr": "WSH",
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
            "abbr": "CHI",
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
            "abbr": "DET",
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
            "abbr": "GB",
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
            "abbr": "MIN",
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
            "abbr": "ARI",
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
              "passOffEpa": 4,
              "turnoverDiff": 3,
              "passDefEpa": 4,
              "rushDefYds": 4,
              "pointsFor": 4,
              "pointsAgainst": 4
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
              "passOffEpa": 1,
              "turnoverDiff": 2,
              "passDefEpa": 1,
              "rushDefYds": 3,
              "pointsFor": 1,
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
              "passOffEpa": 2,
              "turnoverDiff": 1,
              "passDefEpa": 2,
              "rushDefYds": 2,
              "pointsFor": 2,
              "pointsAgainst": 2
            }
          }
        ]
      }
    }
  }
};
