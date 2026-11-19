// ============================================================
//  NFL_STANDINGS / NFL_OFFDEF — automatisch synchronisiert (nflverse)
// ============================================================
//  AUTO-GENERIERT von scripts/sync-espn-nfl-standings.js über die
//  GitHub Action ".github/workflows/sync-espn-nfl-standings.yml".
//  Nicht von Hand editieren — Änderungen werden beim nächsten Sync
//  überschrieben.
//  Zuletzt synchronisiert: 2026-11-19T01:34:03.385Z
//
//  Quelle: nflverse/nfldata (GitHub-gehostet, MIT-lizenziert), NICHT
//  ESPN -- ESPNs öffentliche Sport-API blockt GitHub-Actions-Server
//  generell (HTTP 403, IP-Sperre gegen Cloud-CI). Aus demselben Grund
//  gibt es kein ESPN-FPI mehr (NFL_FPI bleibt leer, nur noch für
//  Abwärtskompatibilität mit js/app.js vorhanden).
//
//  Jede Wochen-Momentaufnahme ist bereits kumulativ -- beim Rendern
//  NICHT nochmal über die Wochen aufsummieren, einfach
//  NFL_STANDINGS[season][week] direkt anzeigen.
//
//  NFL_STANDINGS[season][week] = flaches Array aller 32 NFL-Teams:
//    { name, abbr, conference: "AFC"|"NFC", division: "East"|"North"|
//      "South"|"West", wins, losses, ties, winPct, pf, pa }
//
//  NFL_OFFDEF[season][week] = flaches Array, EPA/Play (Expected Points
//  Added pro Spielzug, aus nflverse's Team-Wochen-Stats -- kein
//  ESPN-FPI-Ersatz, aber eine in der Analytics-Community etablierte,
//  praezisere Kennzahl als simple Punkteschnitte). Nur befüllt, wenn
//  nflverse die Stats-Datei für die Season schon veröffentlicht hat
//  (best effort, optional):
//    { abbr, off: Offense-EPA/Play, offRank,
//      def: Defense-EPA/Play zugelassen (WENIGER ist besser), defRank }
// ============================================================

const NFL_STANDINGS = {
  "2026": {
    "1": [
      {
        "name": "Buffalo Bills",
        "abbr": "BUF",
        "conference": "AFC",
        "division": "East",
        "wins": 1,
        "losses": 0,
        "ties": 0,
        "winPct": 1,
        "pf": 36,
        "pa": 31
      },
      {
        "name": "Miami Dolphins",
        "abbr": "MIA",
        "conference": "AFC",
        "division": "East",
        "wins": 0,
        "losses": 1,
        "ties": 0,
        "winPct": 0,
        "pf": 13,
        "pa": 27
      },
      {
        "name": "New England Patriots",
        "abbr": "NE",
        "conference": "AFC",
        "division": "East",
        "wins": 0,
        "losses": 1,
        "ties": 0,
        "winPct": 0,
        "pf": 10,
        "pa": 13
      },
      {
        "name": "New York Jets",
        "abbr": "NYJ",
        "conference": "AFC",
        "division": "East",
        "wins": 1,
        "losses": 0,
        "ties": 0,
        "winPct": 1,
        "pf": 23,
        "pa": 10
      },
      {
        "name": "Baltimore Ravens",
        "abbr": "BAL",
        "conference": "AFC",
        "division": "North",
        "wins": 1,
        "losses": 0,
        "ties": 0,
        "winPct": 1,
        "pf": 41,
        "pa": 23
      },
      {
        "name": "Cincinnati Bengals",
        "abbr": "CIN",
        "conference": "AFC",
        "division": "North",
        "wins": 1,
        "losses": 0,
        "ties": 0,
        "winPct": 1,
        "pf": 33,
        "pa": 27
      },
      {
        "name": "Cleveland Browns",
        "abbr": "CLE",
        "conference": "AFC",
        "division": "North",
        "wins": 0,
        "losses": 1,
        "ties": 0,
        "winPct": 0,
        "pf": 10,
        "pa": 34
      },
      {
        "name": "Pittsburgh Steelers",
        "abbr": "PIT",
        "conference": "AFC",
        "division": "North",
        "wins": 1,
        "losses": 0,
        "ties": 0,
        "winPct": 1,
        "pf": 20,
        "pa": 13
      },
      {
        "name": "Houston Texans",
        "abbr": "HOU",
        "conference": "AFC",
        "division": "South",
        "wins": 0,
        "losses": 1,
        "ties": 0,
        "winPct": 0,
        "pf": 31,
        "pa": 36
      },
      {
        "name": "Indianapolis Colts",
        "abbr": "IND",
        "conference": "AFC",
        "division": "South",
        "wins": 0,
        "losses": 1,
        "ties": 0,
        "winPct": 0,
        "pf": 23,
        "pa": 41
      },
      {
        "name": "Jacksonville Jaguars",
        "abbr": "JAX",
        "conference": "AFC",
        "division": "South",
        "wins": 1,
        "losses": 0,
        "ties": 0,
        "winPct": 1,
        "pf": 34,
        "pa": 10
      },
      {
        "name": "Tennessee Titans",
        "abbr": "TEN",
        "conference": "AFC",
        "division": "South",
        "wins": 0,
        "losses": 1,
        "ties": 0,
        "winPct": 0,
        "pf": 10,
        "pa": 23
      },
      {
        "name": "Denver Broncos",
        "abbr": "DEN",
        "conference": "AFC",
        "division": "West",
        "wins": 0,
        "losses": 1,
        "ties": 0,
        "winPct": 0,
        "pf": 10,
        "pa": 31
      },
      {
        "name": "Kansas City Chiefs",
        "abbr": "KC",
        "conference": "AFC",
        "division": "West",
        "wins": 1,
        "losses": 0,
        "ties": 0,
        "winPct": 1,
        "pf": 31,
        "pa": 10
      },
      {
        "name": "Las Vegas Raiders",
        "abbr": "LV",
        "conference": "AFC",
        "division": "West",
        "wins": 1,
        "losses": 0,
        "ties": 0,
        "winPct": 1,
        "pf": 27,
        "pa": 13
      },
      {
        "name": "Los Angeles Chargers",
        "abbr": "LAC",
        "conference": "AFC",
        "division": "West",
        "wins": 0,
        "losses": 1,
        "ties": 0,
        "winPct": 0,
        "pf": 14,
        "pa": 26
      },
      {
        "name": "Dallas Cowboys",
        "abbr": "DAL",
        "conference": "NFC",
        "division": "East",
        "wins": 0,
        "losses": 1,
        "ties": 0,
        "winPct": 0,
        "pf": 20,
        "pa": 28
      },
      {
        "name": "New York Giants",
        "abbr": "NYG",
        "conference": "NFC",
        "division": "East",
        "wins": 1,
        "losses": 0,
        "ties": 0,
        "winPct": 1,
        "pf": 28,
        "pa": 20
      },
      {
        "name": "Philadelphia Eagles",
        "abbr": "PHI",
        "conference": "NFC",
        "division": "East",
        "wins": 1,
        "losses": 0,
        "ties": 0,
        "winPct": 1,
        "pf": 24,
        "pa": 22
      },
      {
        "name": "Washington Commanders",
        "abbr": "WSH",
        "conference": "NFC",
        "division": "East",
        "wins": 0,
        "losses": 1,
        "ties": 0,
        "winPct": 0,
        "pf": 22,
        "pa": 24
      },
      {
        "name": "Chicago Bears",
        "abbr": "CHI",
        "conference": "NFC",
        "division": "North",
        "wins": 1,
        "losses": 0,
        "ties": 0,
        "winPct": 1,
        "pf": 59,
        "pa": 37
      },
      {
        "name": "Detroit Lions",
        "abbr": "DET",
        "conference": "NFC",
        "division": "North",
        "wins": 1,
        "losses": 0,
        "ties": 0,
        "winPct": 1,
        "pf": 31,
        "pa": 30
      },
      {
        "name": "Green Bay Packers",
        "abbr": "GB",
        "conference": "NFC",
        "division": "North",
        "wins": 0,
        "losses": 1,
        "ties": 0,
        "winPct": 0,
        "pf": 22,
        "pa": 39
      },
      {
        "name": "Minnesota Vikings",
        "abbr": "MIN",
        "conference": "NFC",
        "division": "North",
        "wins": 1,
        "losses": 0,
        "ties": 0,
        "winPct": 1,
        "pf": 39,
        "pa": 22
      },
      {
        "name": "Atlanta Falcons",
        "abbr": "ATL",
        "conference": "NFC",
        "division": "South",
        "wins": 0,
        "losses": 1,
        "ties": 0,
        "winPct": 0,
        "pf": 13,
        "pa": 20
      },
      {
        "name": "Carolina Panthers",
        "abbr": "CAR",
        "conference": "NFC",
        "division": "South",
        "wins": 0,
        "losses": 1,
        "ties": 0,
        "winPct": 0,
        "pf": 37,
        "pa": 59
      },
      {
        "name": "New Orleans Saints",
        "abbr": "NO",
        "conference": "NFC",
        "division": "South",
        "wins": 0,
        "losses": 1,
        "ties": 0,
        "winPct": 0,
        "pf": 30,
        "pa": 31
      },
      {
        "name": "Tampa Bay Buccaneers",
        "abbr": "TB",
        "conference": "NFC",
        "division": "South",
        "wins": 0,
        "losses": 1,
        "ties": 0,
        "winPct": 0,
        "pf": 27,
        "pa": 33
      },
      {
        "name": "Arizona Cardinals",
        "abbr": "ARI",
        "conference": "NFC",
        "division": "West",
        "wins": 1,
        "losses": 0,
        "ties": 0,
        "winPct": 1,
        "pf": 26,
        "pa": 14
      },
      {
        "name": "Los Angeles Rams",
        "abbr": "LAR",
        "conference": "NFC",
        "division": "West",
        "wins": 0,
        "losses": 1,
        "ties": 0,
        "winPct": 0,
        "pf": 7,
        "pa": 27
      },
      {
        "name": "San Francisco 49ers",
        "abbr": "SF",
        "conference": "NFC",
        "division": "West",
        "wins": 1,
        "losses": 0,
        "ties": 0,
        "winPct": 1,
        "pf": 27,
        "pa": 7
      },
      {
        "name": "Seattle Seahawks",
        "abbr": "SEA",
        "conference": "NFC",
        "division": "West",
        "wins": 1,
        "losses": 0,
        "ties": 0,
        "winPct": 1,
        "pf": 13,
        "pa": 10
      }
    ],
    "2": [
      {
        "name": "Buffalo Bills",
        "abbr": "BUF",
        "conference": "AFC",
        "division": "East",
        "wins": 2,
        "losses": 0,
        "ties": 0,
        "winPct": 1,
        "pf": 77,
        "pa": 62
      },
      {
        "name": "Miami Dolphins",
        "abbr": "MIA",
        "conference": "AFC",
        "division": "East",
        "wins": 0,
        "losses": 2,
        "ties": 0,
        "winPct": 0,
        "pf": 26,
        "pa": 62
      },
      {
        "name": "New England Patriots",
        "abbr": "NE",
        "conference": "AFC",
        "division": "East",
        "wins": 1,
        "losses": 1,
        "ties": 0,
        "winPct": 0.5,
        "pf": 30,
        "pa": 16
      },
      {
        "name": "New York Jets",
        "abbr": "NYJ",
        "conference": "AFC",
        "division": "East",
        "wins": 1,
        "losses": 1,
        "ties": 0,
        "winPct": 0.5,
        "pf": 40,
        "pa": 30
      },
      {
        "name": "Baltimore Ravens",
        "abbr": "BAL",
        "conference": "AFC",
        "division": "North",
        "wins": 1,
        "losses": 1,
        "ties": 0,
        "winPct": 0.5,
        "pf": 58,
        "pa": 47
      },
      {
        "name": "Cincinnati Bengals",
        "abbr": "CIN",
        "conference": "AFC",
        "division": "North",
        "wins": 2,
        "losses": 0,
        "ties": 0,
        "winPct": 1,
        "pf": 53,
        "pa": 33
      },
      {
        "name": "Cleveland Browns",
        "abbr": "CLE",
        "conference": "AFC",
        "division": "North",
        "wins": 1,
        "losses": 1,
        "ties": 0,
        "winPct": 0.5,
        "pf": 33,
        "pa": 53
      },
      {
        "name": "Pittsburgh Steelers",
        "abbr": "PIT",
        "conference": "AFC",
        "division": "North",
        "wins": 1,
        "losses": 1,
        "ties": 0,
        "winPct": 0.5,
        "pf": 23,
        "pa": 33
      },
      {
        "name": "Houston Texans",
        "abbr": "HOU",
        "conference": "AFC",
        "division": "South",
        "wins": 0,
        "losses": 2,
        "ties": 0,
        "winPct": 0,
        "pf": 37,
        "pa": 56
      },
      {
        "name": "Indianapolis Colts",
        "abbr": "IND",
        "conference": "AFC",
        "division": "South",
        "wins": 0,
        "losses": 2,
        "ties": 0,
        "winPct": 0,
        "pf": 53,
        "pa": 74
      },
      {
        "name": "Jacksonville Jaguars",
        "abbr": "JAX",
        "conference": "AFC",
        "division": "South",
        "wins": 1,
        "losses": 1,
        "ties": 0,
        "winPct": 0.5,
        "pf": 47,
        "pa": 30
      },
      {
        "name": "Tennessee Titans",
        "abbr": "TEN",
        "conference": "AFC",
        "division": "South",
        "wins": 0,
        "losses": 2,
        "ties": 0,
        "winPct": 0,
        "pf": 30,
        "pa": 47
      },
      {
        "name": "Denver Broncos",
        "abbr": "DEN",
        "conference": "AFC",
        "division": "West",
        "wins": 1,
        "losses": 1,
        "ties": 0,
        "winPct": 0.5,
        "pf": 30,
        "pa": 44
      },
      {
        "name": "Kansas City Chiefs",
        "abbr": "KC",
        "conference": "AFC",
        "division": "West",
        "wins": 2,
        "losses": 0,
        "ties": 0,
        "winPct": 1,
        "pf": 64,
        "pa": 40
      },
      {
        "name": "Las Vegas Raiders",
        "abbr": "LV",
        "conference": "AFC",
        "division": "West",
        "wins": 2,
        "losses": 0,
        "ties": 0,
        "winPct": 1,
        "pf": 53,
        "pa": 27
      },
      {
        "name": "Los Angeles Chargers",
        "abbr": "LAC",
        "conference": "AFC",
        "division": "West",
        "wins": 0,
        "losses": 2,
        "ties": 0,
        "winPct": 0,
        "pf": 28,
        "pa": 52
      },
      {
        "name": "Dallas Cowboys",
        "abbr": "DAL",
        "conference": "NFC",
        "division": "East",
        "wins": 1,
        "losses": 1,
        "ties": 0,
        "winPct": 0.5,
        "pf": 57,
        "pa": 48
      },
      {
        "name": "New York Giants",
        "abbr": "NYG",
        "conference": "NFC",
        "division": "East",
        "wins": 1,
        "losses": 1,
        "ties": 0,
        "winPct": 0.5,
        "pf": 34,
        "pa": 48
      },
      {
        "name": "Philadelphia Eagles",
        "abbr": "PHI",
        "conference": "NFC",
        "division": "East",
        "wins": 2,
        "losses": 0,
        "ties": 0,
        "winPct": 1,
        "pf": 48,
        "pa": 42
      },
      {
        "name": "Washington Commanders",
        "abbr": "WSH",
        "conference": "NFC",
        "division": "East",
        "wins": 0,
        "losses": 2,
        "ties": 0,
        "winPct": 0,
        "pf": 42,
        "pa": 61
      },
      {
        "name": "Chicago Bears",
        "abbr": "CHI",
        "conference": "NFC",
        "division": "North",
        "wins": 1,
        "losses": 1,
        "ties": 0,
        "winPct": 0.5,
        "pf": 62,
        "pa": 46
      },
      {
        "name": "Detroit Lions",
        "abbr": "DET",
        "conference": "NFC",
        "division": "North",
        "wins": 1,
        "losses": 1,
        "ties": 0,
        "winPct": 0.5,
        "pf": 62,
        "pa": 71
      },
      {
        "name": "Green Bay Packers",
        "abbr": "GB",
        "conference": "NFC",
        "division": "North",
        "wins": 1,
        "losses": 1,
        "ties": 0,
        "winPct": 0.5,
        "pf": 42,
        "pa": 56
      },
      {
        "name": "Minnesota Vikings",
        "abbr": "MIN",
        "conference": "NFC",
        "division": "North",
        "wins": 2,
        "losses": 0,
        "ties": 0,
        "winPct": 1,
        "pf": 48,
        "pa": 25
      },
      {
        "name": "Atlanta Falcons",
        "abbr": "ATL",
        "conference": "NFC",
        "division": "South",
        "wins": 0,
        "losses": 2,
        "ties": 0,
        "winPct": 0,
        "pf": 16,
        "pa": 54
      },
      {
        "name": "Carolina Panthers",
        "abbr": "CAR",
        "conference": "NFC",
        "division": "South",
        "wins": 1,
        "losses": 1,
        "ties": 0,
        "winPct": 0.5,
        "pf": 71,
        "pa": 62
      },
      {
        "name": "New Orleans Saints",
        "abbr": "NO",
        "conference": "NFC",
        "division": "South",
        "wins": 1,
        "losses": 1,
        "ties": 0,
        "winPct": 0.5,
        "pf": 54,
        "pa": 48
      },
      {
        "name": "Tampa Bay Buccaneers",
        "abbr": "TB",
        "conference": "NFC",
        "division": "South",
        "wins": 0,
        "losses": 2,
        "ties": 0,
        "winPct": 0,
        "pf": 46,
        "pa": 56
      },
      {
        "name": "Arizona Cardinals",
        "abbr": "ARI",
        "conference": "NFC",
        "division": "West",
        "wins": 1,
        "losses": 1,
        "ties": 0,
        "winPct": 0.5,
        "pf": 33,
        "pa": 45
      },
      {
        "name": "Los Angeles Rams",
        "abbr": "LAR",
        "conference": "NFC",
        "division": "West",
        "wins": 1,
        "losses": 1,
        "ties": 0,
        "winPct": 0.5,
        "pf": 35,
        "pa": 33
      },
      {
        "name": "San Francisco 49ers",
        "abbr": "SF",
        "conference": "NFC",
        "division": "West",
        "wins": 2,
        "losses": 0,
        "ties": 0,
        "winPct": 1,
        "pf": 62,
        "pa": 20
      },
      {
        "name": "Seattle Seahawks",
        "abbr": "SEA",
        "conference": "NFC",
        "division": "West",
        "wins": 2,
        "losses": 0,
        "ties": 0,
        "winPct": 1,
        "pf": 44,
        "pa": 17
      }
    ],
    "3": [
      {
        "name": "Buffalo Bills",
        "abbr": "BUF",
        "conference": "AFC",
        "division": "East",
        "wins": 3,
        "losses": 0,
        "ties": 0,
        "winPct": 1,
        "pf": 101,
        "pa": 78
      },
      {
        "name": "Miami Dolphins",
        "abbr": "MIA",
        "conference": "AFC",
        "division": "East",
        "wins": 0,
        "losses": 3,
        "ties": 0,
        "winPct": 0,
        "pf": 36,
        "pa": 86
      },
      {
        "name": "New England Patriots",
        "abbr": "NE",
        "conference": "AFC",
        "division": "East",
        "wins": 1,
        "losses": 2,
        "ties": 0,
        "winPct": 0.3333333333333333,
        "pf": 36,
        "pa": 51
      },
      {
        "name": "New York Jets",
        "abbr": "NYJ",
        "conference": "AFC",
        "division": "East",
        "wins": 1,
        "losses": 2,
        "ties": 0,
        "winPct": 0.3333333333333333,
        "pf": 64,
        "pa": 61
      },
      {
        "name": "Baltimore Ravens",
        "abbr": "BAL",
        "conference": "AFC",
        "division": "North",
        "wins": 2,
        "losses": 1,
        "ties": 0,
        "winPct": 0.6666666666666666,
        "pf": 92,
        "pa": 78
      },
      {
        "name": "Cincinnati Bengals",
        "abbr": "CIN",
        "conference": "AFC",
        "division": "North",
        "wins": 2,
        "losses": 1,
        "ties": 0,
        "winPct": 0.6666666666666666,
        "pf": 80,
        "pa": 63
      },
      {
        "name": "Cleveland Browns",
        "abbr": "CLE",
        "conference": "AFC",
        "division": "North",
        "wins": 2,
        "losses": 1,
        "ties": 0,
        "winPct": 0.6666666666666666,
        "pf": 54,
        "pa": 71
      },
      {
        "name": "Pittsburgh Steelers",
        "abbr": "PIT",
        "conference": "AFC",
        "division": "North",
        "wins": 2,
        "losses": 1,
        "ties": 0,
        "winPct": 0.6666666666666666,
        "pf": 53,
        "pa": 60
      },
      {
        "name": "Houston Texans",
        "abbr": "HOU",
        "conference": "AFC",
        "division": "South",
        "wins": 0,
        "losses": 3,
        "ties": 0,
        "winPct": 0,
        "pf": 54,
        "pa": 75
      },
      {
        "name": "Indianapolis Colts",
        "abbr": "IND",
        "conference": "AFC",
        "division": "South",
        "wins": 1,
        "losses": 2,
        "ties": 0,
        "winPct": 0.3333333333333333,
        "pf": 72,
        "pa": 91
      },
      {
        "name": "Jacksonville Jaguars",
        "abbr": "JAX",
        "conference": "AFC",
        "division": "South",
        "wins": 2,
        "losses": 1,
        "ties": 0,
        "winPct": 0.6666666666666666,
        "pf": 82,
        "pa": 36
      },
      {
        "name": "Tennessee Titans",
        "abbr": "TEN",
        "conference": "AFC",
        "division": "South",
        "wins": 0,
        "losses": 3,
        "ties": 0,
        "winPct": 0,
        "pf": 37,
        "pa": 59
      },
      {
        "name": "Denver Broncos",
        "abbr": "DEN",
        "conference": "AFC",
        "division": "West",
        "wins": 2,
        "losses": 1,
        "ties": 0,
        "winPct": 0.6666666666666666,
        "pf": 60,
        "pa": 70
      },
      {
        "name": "Kansas City Chiefs",
        "abbr": "KC",
        "conference": "AFC",
        "division": "West",
        "wins": 3,
        "losses": 0,
        "ties": 0,
        "winPct": 1,
        "pf": 88,
        "pa": 50
      },
      {
        "name": "Las Vegas Raiders",
        "abbr": "LV",
        "conference": "AFC",
        "division": "West",
        "wins": 3,
        "losses": 0,
        "ties": 0,
        "winPct": 1,
        "pf": 88,
        "pa": 54
      },
      {
        "name": "Los Angeles Chargers",
        "abbr": "LAC",
        "conference": "AFC",
        "division": "West",
        "wins": 0,
        "losses": 3,
        "ties": 0,
        "winPct": 0,
        "pf": 44,
        "pa": 76
      },
      {
        "name": "Dallas Cowboys",
        "abbr": "DAL",
        "conference": "NFC",
        "division": "East",
        "wins": 1,
        "losses": 2,
        "ties": 0,
        "winPct": 0.3333333333333333,
        "pf": 88,
        "pa": 82
      },
      {
        "name": "New York Giants",
        "abbr": "NYG",
        "conference": "NFC",
        "division": "East",
        "wins": 2,
        "losses": 1,
        "ties": 0,
        "winPct": 0.6666666666666666,
        "pf": 46,
        "pa": 55
      },
      {
        "name": "Philadelphia Eagles",
        "abbr": "PHI",
        "conference": "NFC",
        "division": "East",
        "wins": 2,
        "losses": 1,
        "ties": 0,
        "winPct": 0.6666666666666666,
        "pf": 55,
        "pa": 69
      },
      {
        "name": "Washington Commanders",
        "abbr": "WSH",
        "conference": "NFC",
        "division": "East",
        "wins": 1,
        "losses": 2,
        "ties": 0,
        "winPct": 0.3333333333333333,
        "pf": 75,
        "pa": 92
      },
      {
        "name": "Chicago Bears",
        "abbr": "CHI",
        "conference": "NFC",
        "division": "North",
        "wins": 2,
        "losses": 1,
        "ties": 0,
        "winPct": 0.6666666666666666,
        "pf": 89,
        "pa": 53
      },
      {
        "name": "Detroit Lions",
        "abbr": "DET",
        "conference": "NFC",
        "division": "North",
        "wins": 2,
        "losses": 1,
        "ties": 0,
        "winPct": 0.6666666666666666,
        "pf": 93,
        "pa": 95
      },
      {
        "name": "Green Bay Packers",
        "abbr": "GB",
        "conference": "NFC",
        "division": "North",
        "wins": 1,
        "losses": 2,
        "ties": 0,
        "winPct": 0.3333333333333333,
        "pf": 56,
        "pa": 91
      },
      {
        "name": "Minnesota Vikings",
        "abbr": "MIN",
        "conference": "NFC",
        "division": "North",
        "wins": 3,
        "losses": 0,
        "ties": 0,
        "winPct": 1,
        "pf": 71,
        "pa": 41
      },
      {
        "name": "Atlanta Falcons",
        "abbr": "ATL",
        "conference": "NFC",
        "division": "South",
        "wins": 1,
        "losses": 2,
        "ties": 0,
        "winPct": 0.3333333333333333,
        "pf": 51,
        "pa": 68
      },
      {
        "name": "Carolina Panthers",
        "abbr": "CAR",
        "conference": "NFC",
        "division": "South",
        "wins": 1,
        "losses": 2,
        "ties": 0,
        "winPct": 0.3333333333333333,
        "pf": 89,
        "pa": 83
      },
      {
        "name": "New Orleans Saints",
        "abbr": "NO",
        "conference": "NFC",
        "division": "South",
        "wins": 1,
        "losses": 2,
        "ties": 0,
        "winPct": 0.3333333333333333,
        "pf": 81,
        "pa": 83
      },
      {
        "name": "Tampa Bay Buccaneers",
        "abbr": "TB",
        "conference": "NFC",
        "division": "South",
        "wins": 0,
        "losses": 3,
        "ties": 0,
        "winPct": 0,
        "pf": 62,
        "pa": 79
      },
      {
        "name": "Arizona Cardinals",
        "abbr": "ARI",
        "conference": "NFC",
        "division": "West",
        "wins": 1,
        "losses": 2,
        "ties": 0,
        "winPct": 0.3333333333333333,
        "pf": 63,
        "pa": 81
      },
      {
        "name": "Los Angeles Rams",
        "abbr": "LAR",
        "conference": "NFC",
        "division": "West",
        "wins": 1,
        "losses": 2,
        "ties": 0,
        "winPct": 0.3333333333333333,
        "pf": 61,
        "pa": 63
      },
      {
        "name": "San Francisco 49ers",
        "abbr": "SF",
        "conference": "NFC",
        "division": "West",
        "wins": 3,
        "losses": 0,
        "ties": 0,
        "winPct": 1,
        "pf": 98,
        "pa": 50
      },
      {
        "name": "Seattle Seahawks",
        "abbr": "SEA",
        "conference": "NFC",
        "division": "West",
        "wins": 2,
        "losses": 1,
        "ties": 0,
        "winPct": 0.6666666666666666,
        "pf": 75,
        "pa": 50
      }
    ],
    "4": [
      {
        "name": "Buffalo Bills",
        "abbr": "BUF",
        "conference": "AFC",
        "division": "East",
        "wins": 3,
        "losses": 1,
        "ties": 0,
        "winPct": 0.75,
        "pf": 127,
        "pa": 107
      },
      {
        "name": "Miami Dolphins",
        "abbr": "MIA",
        "conference": "AFC",
        "division": "East",
        "wins": 0,
        "losses": 4,
        "ties": 0,
        "winPct": 0,
        "pf": 46,
        "pa": 101
      },
      {
        "name": "New England Patriots",
        "abbr": "NE",
        "conference": "AFC",
        "division": "East",
        "wins": 2,
        "losses": 2,
        "ties": 0,
        "winPct": 0.5,
        "pf": 65,
        "pa": 77
      },
      {
        "name": "New York Jets",
        "abbr": "NYJ",
        "conference": "AFC",
        "division": "East",
        "wins": 1,
        "losses": 3,
        "ties": 0,
        "winPct": 0.25,
        "pf": 76,
        "pa": 84
      },
      {
        "name": "Baltimore Ravens",
        "abbr": "BAL",
        "conference": "AFC",
        "division": "North",
        "wins": 3,
        "losses": 1,
        "ties": 0,
        "winPct": 0.75,
        "pf": 116,
        "pa": 96
      },
      {
        "name": "Cincinnati Bengals",
        "abbr": "CIN",
        "conference": "AFC",
        "division": "North",
        "wins": 2,
        "losses": 2,
        "ties": 0,
        "winPct": 0.5,
        "pf": 97,
        "pa": 85
      },
      {
        "name": "Cleveland Browns",
        "abbr": "CLE",
        "conference": "AFC",
        "division": "North",
        "wins": 3,
        "losses": 1,
        "ties": 0,
        "winPct": 0.75,
        "pf": 81,
        "pa": 95
      },
      {
        "name": "Pittsburgh Steelers",
        "abbr": "PIT",
        "conference": "AFC",
        "division": "North",
        "wins": 2,
        "losses": 2,
        "ties": 0,
        "winPct": 0.5,
        "pf": 77,
        "pa": 87
      },
      {
        "name": "Houston Texans",
        "abbr": "HOU",
        "conference": "AFC",
        "division": "South",
        "wins": 0,
        "losses": 4,
        "ties": 0,
        "winPct": 0,
        "pf": 84,
        "pa": 109
      },
      {
        "name": "Indianapolis Colts",
        "abbr": "IND",
        "conference": "AFC",
        "division": "South",
        "wins": 2,
        "losses": 2,
        "ties": 0,
        "winPct": 0.5,
        "pf": 102,
        "pa": 104
      },
      {
        "name": "Jacksonville Jaguars",
        "abbr": "JAX",
        "conference": "AFC",
        "division": "South",
        "wins": 3,
        "losses": 1,
        "ties": 0,
        "winPct": 0.75,
        "pf": 104,
        "pa": 53
      },
      {
        "name": "Tennessee Titans",
        "abbr": "TEN",
        "conference": "AFC",
        "division": "South",
        "wins": 0,
        "losses": 4,
        "ties": 0,
        "winPct": 0,
        "pf": 55,
        "pa": 83
      },
      {
        "name": "Denver Broncos",
        "abbr": "DEN",
        "conference": "AFC",
        "division": "West",
        "wins": 2,
        "losses": 2,
        "ties": 0,
        "winPct": 0.5,
        "pf": 74,
        "pa": 94
      },
      {
        "name": "Kansas City Chiefs",
        "abbr": "KC",
        "conference": "AFC",
        "division": "West",
        "wins": 4,
        "losses": 0,
        "ties": 0,
        "winPct": 1,
        "pf": 118,
        "pa": 77
      },
      {
        "name": "Las Vegas Raiders",
        "abbr": "LV",
        "conference": "AFC",
        "division": "West",
        "wins": 3,
        "losses": 1,
        "ties": 0,
        "winPct": 0.75,
        "pf": 115,
        "pa": 84
      },
      {
        "name": "Los Angeles Chargers",
        "abbr": "LAC",
        "conference": "AFC",
        "division": "West",
        "wins": 0,
        "losses": 4,
        "ties": 0,
        "winPct": 0,
        "pf": 67,
        "pa": 106
      },
      {
        "name": "Dallas Cowboys",
        "abbr": "DAL",
        "conference": "NFC",
        "division": "East",
        "wins": 2,
        "losses": 2,
        "ties": 0,
        "winPct": 0.5,
        "pf": 122,
        "pa": 112
      },
      {
        "name": "New York Giants",
        "abbr": "NYG",
        "conference": "NFC",
        "division": "East",
        "wins": 3,
        "losses": 1,
        "ties": 0,
        "winPct": 0.75,
        "pf": 82,
        "pa": 79
      },
      {
        "name": "Philadelphia Eagles",
        "abbr": "PHI",
        "conference": "NFC",
        "division": "East",
        "wins": 2,
        "losses": 2,
        "ties": 0,
        "winPct": 0.5,
        "pf": 75,
        "pa": 93
      },
      {
        "name": "Washington Commanders",
        "abbr": "WSH",
        "conference": "NFC",
        "division": "East",
        "wins": 1,
        "losses": 3,
        "ties": 0,
        "winPct": 0.25,
        "pf": 88,
        "pa": 122
      },
      {
        "name": "Chicago Bears",
        "abbr": "CHI",
        "conference": "NFC",
        "division": "North",
        "wins": 3,
        "losses": 1,
        "ties": 0,
        "winPct": 0.75,
        "pf": 112,
        "pa": 65
      },
      {
        "name": "Detroit Lions",
        "abbr": "DET",
        "conference": "NFC",
        "division": "North",
        "wins": 2,
        "losses": 2,
        "ties": 0,
        "winPct": 0.5,
        "pf": 119,
        "pa": 127
      },
      {
        "name": "Green Bay Packers",
        "abbr": "GB",
        "conference": "NFC",
        "division": "North",
        "wins": 2,
        "losses": 2,
        "ties": 0,
        "winPct": 0.5,
        "pf": 73,
        "pa": 105
      },
      {
        "name": "Minnesota Vikings",
        "abbr": "MIN",
        "conference": "NFC",
        "division": "North",
        "wins": 4,
        "losses": 0,
        "ties": 0,
        "winPct": 1,
        "pf": 86,
        "pa": 51
      },
      {
        "name": "Atlanta Falcons",
        "abbr": "ATL",
        "conference": "NFC",
        "division": "South",
        "wins": 2,
        "losses": 2,
        "ties": 0,
        "winPct": 0.5,
        "pf": 96,
        "pa": 92
      },
      {
        "name": "Carolina Panthers",
        "abbr": "CAR",
        "conference": "NFC",
        "division": "South",
        "wins": 2,
        "losses": 2,
        "ties": 0,
        "winPct": 0.5,
        "pf": 121,
        "pa": 109
      },
      {
        "name": "New Orleans Saints",
        "abbr": "NO",
        "conference": "NFC",
        "division": "South",
        "wins": 1,
        "losses": 3,
        "ties": 0,
        "winPct": 0.25,
        "pf": 105,
        "pa": 128
      },
      {
        "name": "Tampa Bay Buccaneers",
        "abbr": "TB",
        "conference": "NFC",
        "division": "South",
        "wins": 0,
        "losses": 4,
        "ties": 0,
        "winPct": 0,
        "pf": 76,
        "pa": 96
      },
      {
        "name": "Arizona Cardinals",
        "abbr": "ARI",
        "conference": "NFC",
        "division": "West",
        "wins": 1,
        "losses": 3,
        "ties": 0,
        "winPct": 0.25,
        "pf": 87,
        "pa": 117
      },
      {
        "name": "Los Angeles Rams",
        "abbr": "LAR",
        "conference": "NFC",
        "division": "West",
        "wins": 2,
        "losses": 2,
        "ties": 0,
        "winPct": 0.5,
        "pf": 85,
        "pa": 83
      },
      {
        "name": "San Francisco 49ers",
        "abbr": "SF",
        "conference": "NFC",
        "division": "West",
        "wins": 4,
        "losses": 0,
        "ties": 0,
        "winPct": 1,
        "pf": 122,
        "pa": 64
      },
      {
        "name": "Seattle Seahawks",
        "abbr": "SEA",
        "conference": "NFC",
        "division": "West",
        "wins": 3,
        "losses": 1,
        "ties": 0,
        "winPct": 0.75,
        "pf": 105,
        "pa": 73
      }
    ],
    "5": [
      {
        "name": "Buffalo Bills",
        "abbr": "BUF",
        "conference": "AFC",
        "division": "East",
        "wins": 4,
        "losses": 1,
        "ties": 0,
        "winPct": 0.8,
        "pf": 164,
        "pa": 141
      },
      {
        "name": "Miami Dolphins",
        "abbr": "MIA",
        "conference": "AFC",
        "division": "East",
        "wins": 0,
        "losses": 5,
        "ties": 0,
        "winPct": 0,
        "pf": 70,
        "pa": 132
      },
      {
        "name": "New England Patriots",
        "abbr": "NE",
        "conference": "AFC",
        "division": "East",
        "wins": 3,
        "losses": 2,
        "ties": 0,
        "winPct": 0.6,
        "pf": 110,
        "pa": 94
      },
      {
        "name": "New York Jets",
        "abbr": "NYJ",
        "conference": "AFC",
        "division": "East",
        "wins": 2,
        "losses": 3,
        "ties": 0,
        "winPct": 0.4,
        "pf": 93,
        "pa": 96
      },
      {
        "name": "Baltimore Ravens",
        "abbr": "BAL",
        "conference": "AFC",
        "division": "North",
        "wins": 4,
        "losses": 1,
        "ties": 0,
        "winPct": 0.8,
        "pf": 146,
        "pa": 119
      },
      {
        "name": "Cincinnati Bengals",
        "abbr": "CIN",
        "conference": "AFC",
        "division": "North",
        "wins": 3,
        "losses": 2,
        "ties": 0,
        "winPct": 0.6,
        "pf": 128,
        "pa": 109
      },
      {
        "name": "Cleveland Browns",
        "abbr": "CLE",
        "conference": "AFC",
        "division": "North",
        "wins": 3,
        "losses": 2,
        "ties": 0,
        "winPct": 0.6,
        "pf": 93,
        "pa": 112
      },
      {
        "name": "Pittsburgh Steelers",
        "abbr": "PIT",
        "conference": "AFC",
        "division": "North",
        "wins": 3,
        "losses": 2,
        "ties": 0,
        "winPct": 0.6,
        "pf": 111,
        "pa": 109
      },
      {
        "name": "Houston Texans",
        "abbr": "HOU",
        "conference": "AFC",
        "division": "South",
        "wins": 1,
        "losses": 4,
        "ties": 0,
        "winPct": 0.2,
        "pf": 110,
        "pa": 112
      },
      {
        "name": "Indianapolis Colts",
        "abbr": "IND",
        "conference": "AFC",
        "division": "South",
        "wins": 2,
        "losses": 3,
        "ties": 0,
        "winPct": 0.4,
        "pf": 124,
        "pa": 138
      },
      {
        "name": "Jacksonville Jaguars",
        "abbr": "JAX",
        "conference": "AFC",
        "division": "South",
        "wins": 4,
        "losses": 1,
        "ties": 0,
        "winPct": 0.8,
        "pf": 123,
        "pa": 70
      },
      {
        "name": "Tennessee Titans",
        "abbr": "TEN",
        "conference": "AFC",
        "division": "South",
        "wins": 0,
        "losses": 5,
        "ties": 0,
        "winPct": 0,
        "pf": 58,
        "pa": 109
      },
      {
        "name": "Denver Broncos",
        "abbr": "DEN",
        "conference": "AFC",
        "division": "West",
        "wins": 3,
        "losses": 2,
        "ties": 0,
        "winPct": 0.6,
        "pf": 97,
        "pa": 111
      },
      {
        "name": "Kansas City Chiefs",
        "abbr": "KC",
        "conference": "AFC",
        "division": "West",
        "wins": 4,
        "losses": 0,
        "ties": 0,
        "winPct": 1,
        "pf": 118,
        "pa": 77
      },
      {
        "name": "Las Vegas Raiders",
        "abbr": "LV",
        "conference": "AFC",
        "division": "West",
        "wins": 3,
        "losses": 2,
        "ties": 0,
        "winPct": 0.6,
        "pf": 132,
        "pa": 129
      },
      {
        "name": "Los Angeles Chargers",
        "abbr": "LAC",
        "conference": "AFC",
        "division": "West",
        "wins": 0,
        "losses": 5,
        "ties": 0,
        "winPct": 0,
        "pf": 84,
        "pa": 129
      },
      {
        "name": "Dallas Cowboys",
        "abbr": "DAL",
        "conference": "NFC",
        "division": "East",
        "wins": 2,
        "losses": 3,
        "ties": 0,
        "winPct": 0.4,
        "pf": 138,
        "pa": 136
      },
      {
        "name": "New York Giants",
        "abbr": "NYG",
        "conference": "NFC",
        "division": "East",
        "wins": 3,
        "losses": 1,
        "ties": 1,
        "winPct": 0.7,
        "pf": 109,
        "pa": 106
      },
      {
        "name": "Philadelphia Eagles",
        "abbr": "PHI",
        "conference": "NFC",
        "division": "East",
        "wins": 2,
        "losses": 3,
        "ties": 0,
        "winPct": 0.4,
        "pf": 92,
        "pa": 112
      },
      {
        "name": "Washington Commanders",
        "abbr": "WSH",
        "conference": "NFC",
        "division": "East",
        "wins": 1,
        "losses": 3,
        "ties": 1,
        "winPct": 0.3,
        "pf": 115,
        "pa": 149
      },
      {
        "name": "Chicago Bears",
        "abbr": "CHI",
        "conference": "NFC",
        "division": "North",
        "wins": 3,
        "losses": 2,
        "ties": 0,
        "winPct": 0.6,
        "pf": 119,
        "pa": 96
      },
      {
        "name": "Detroit Lions",
        "abbr": "DET",
        "conference": "NFC",
        "division": "North",
        "wins": 3,
        "losses": 2,
        "ties": 0,
        "winPct": 0.6,
        "pf": 164,
        "pa": 148
      },
      {
        "name": "Green Bay Packers",
        "abbr": "GB",
        "conference": "NFC",
        "division": "North",
        "wins": 3,
        "losses": 2,
        "ties": 0,
        "winPct": 0.6,
        "pf": 104,
        "pa": 112
      },
      {
        "name": "Minnesota Vikings",
        "abbr": "MIN",
        "conference": "NFC",
        "division": "North",
        "wins": 5,
        "losses": 0,
        "ties": 0,
        "winPct": 1,
        "pf": 109,
        "pa": 64
      },
      {
        "name": "Atlanta Falcons",
        "abbr": "ATL",
        "conference": "NFC",
        "division": "South",
        "wins": 2,
        "losses": 3,
        "ties": 0,
        "winPct": 0.4,
        "pf": 119,
        "pa": 122
      },
      {
        "name": "Carolina Panthers",
        "abbr": "CAR",
        "conference": "NFC",
        "division": "South",
        "wins": 2,
        "losses": 2,
        "ties": 0,
        "winPct": 0.5,
        "pf": 121,
        "pa": 109
      },
      {
        "name": "New Orleans Saints",
        "abbr": "NO",
        "conference": "NFC",
        "division": "South",
        "wins": 1,
        "losses": 4,
        "ties": 0,
        "winPct": 0.2,
        "pf": 118,
        "pa": 151
      },
      {
        "name": "Tampa Bay Buccaneers",
        "abbr": "TB",
        "conference": "NFC",
        "division": "South",
        "wins": 1,
        "losses": 4,
        "ties": 0,
        "winPct": 0.2,
        "pf": 100,
        "pa": 112
      },
      {
        "name": "Arizona Cardinals",
        "abbr": "ARI",
        "conference": "NFC",
        "division": "West",
        "wins": 1,
        "losses": 4,
        "ties": 0,
        "winPct": 0.2,
        "pf": 108,
        "pa": 162
      },
      {
        "name": "Los Angeles Rams",
        "abbr": "LAR",
        "conference": "NFC",
        "division": "West",
        "wins": 2,
        "losses": 3,
        "ties": 0,
        "winPct": 0.4,
        "pf": 119,
        "pa": 120
      },
      {
        "name": "San Francisco 49ers",
        "abbr": "SF",
        "conference": "NFC",
        "division": "West",
        "wins": 5,
        "losses": 0,
        "ties": 0,
        "winPct": 1,
        "pf": 154,
        "pa": 93
      },
      {
        "name": "Seattle Seahawks",
        "abbr": "SEA",
        "conference": "NFC",
        "division": "West",
        "wins": 3,
        "losses": 2,
        "ties": 0,
        "winPct": 0.6,
        "pf": 134,
        "pa": 105
      }
    ],
    "6": [
      {
        "name": "Buffalo Bills",
        "abbr": "BUF",
        "conference": "AFC",
        "division": "East",
        "wins": 5,
        "losses": 1,
        "ties": 0,
        "winPct": 0.8333333333333334,
        "pf": 197,
        "pa": 171
      },
      {
        "name": "Miami Dolphins",
        "abbr": "MIA",
        "conference": "AFC",
        "division": "East",
        "wins": 0,
        "losses": 5,
        "ties": 0,
        "winPct": 0,
        "pf": 70,
        "pa": 132
      },
      {
        "name": "New England Patriots",
        "abbr": "NE",
        "conference": "AFC",
        "division": "East",
        "wins": 4,
        "losses": 2,
        "ties": 0,
        "winPct": 0.6666666666666666,
        "pf": 136,
        "pa": 113
      },
      {
        "name": "New York Jets",
        "abbr": "NYJ",
        "conference": "AFC",
        "division": "East",
        "wins": 2,
        "losses": 4,
        "ties": 0,
        "winPct": 0.3333333333333333,
        "pf": 112,
        "pa": 122
      },
      {
        "name": "Baltimore Ravens",
        "abbr": "BAL",
        "conference": "AFC",
        "division": "North",
        "wins": 4,
        "losses": 2,
        "ties": 0,
        "winPct": 0.6666666666666666,
        "pf": 156,
        "pa": 132
      },
      {
        "name": "Cincinnati Bengals",
        "abbr": "CIN",
        "conference": "AFC",
        "division": "North",
        "wins": 3,
        "losses": 2,
        "ties": 0,
        "winPct": 0.6,
        "pf": 128,
        "pa": 109
      },
      {
        "name": "Cleveland Browns",
        "abbr": "CLE",
        "conference": "AFC",
        "division": "North",
        "wins": 4,
        "losses": 2,
        "ties": 0,
        "winPct": 0.6666666666666666,
        "pf": 106,
        "pa": 122
      },
      {
        "name": "Pittsburgh Steelers",
        "abbr": "PIT",
        "conference": "AFC",
        "division": "North",
        "wins": 4,
        "losses": 2,
        "ties": 0,
        "winPct": 0.6666666666666666,
        "pf": 137,
        "pa": 128
      },
      {
        "name": "Houston Texans",
        "abbr": "HOU",
        "conference": "AFC",
        "division": "South",
        "wins": 2,
        "losses": 4,
        "ties": 0,
        "winPct": 0.3333333333333333,
        "pf": 144,
        "pa": 143
      },
      {
        "name": "Indianapolis Colts",
        "abbr": "IND",
        "conference": "AFC",
        "division": "South",
        "wins": 2,
        "losses": 4,
        "ties": 0,
        "winPct": 0.3333333333333333,
        "pf": 144,
        "pa": 164
      },
      {
        "name": "Jacksonville Jaguars",
        "abbr": "JAX",
        "conference": "AFC",
        "division": "South",
        "wins": 4,
        "losses": 2,
        "ties": 0,
        "winPct": 0.6666666666666666,
        "pf": 154,
        "pa": 104
      },
      {
        "name": "Tennessee Titans",
        "abbr": "TEN",
        "conference": "AFC",
        "division": "South",
        "wins": 1,
        "losses": 5,
        "ties": 0,
        "winPct": 0.16666666666666666,
        "pf": 84,
        "pa": 129
      },
      {
        "name": "Denver Broncos",
        "abbr": "DEN",
        "conference": "AFC",
        "division": "West",
        "wins": 4,
        "losses": 2,
        "ties": 0,
        "winPct": 0.6666666666666666,
        "pf": 114,
        "pa": 125
      },
      {
        "name": "Kansas City Chiefs",
        "abbr": "KC",
        "conference": "AFC",
        "division": "West",
        "wins": 5,
        "losses": 0,
        "ties": 0,
        "winPct": 1,
        "pf": 140,
        "pa": 83
      },
      {
        "name": "Las Vegas Raiders",
        "abbr": "LV",
        "conference": "AFC",
        "division": "West",
        "wins": 3,
        "losses": 3,
        "ties": 0,
        "winPct": 0.5,
        "pf": 162,
        "pa": 162
      },
      {
        "name": "Los Angeles Chargers",
        "abbr": "LAC",
        "conference": "AFC",
        "division": "West",
        "wins": 0,
        "losses": 6,
        "ties": 0,
        "winPct": 0,
        "pf": 90,
        "pa": 151
      },
      {
        "name": "Dallas Cowboys",
        "abbr": "DAL",
        "conference": "NFC",
        "division": "East",
        "wins": 2,
        "losses": 4,
        "ties": 0,
        "winPct": 0.3333333333333333,
        "pf": 151,
        "pa": 159
      },
      {
        "name": "New York Giants",
        "abbr": "NYG",
        "conference": "NFC",
        "division": "East",
        "wins": 3,
        "losses": 2,
        "ties": 1,
        "winPct": 0.5833333333333334,
        "pf": 136,
        "pa": 140
      },
      {
        "name": "Philadelphia Eagles",
        "abbr": "PHI",
        "conference": "NFC",
        "division": "East",
        "wins": 2,
        "losses": 4,
        "ties": 0,
        "winPct": 0.3333333333333333,
        "pf": 106,
        "pa": 137
      },
      {
        "name": "Washington Commanders",
        "abbr": "WSH",
        "conference": "NFC",
        "division": "East",
        "wins": 1,
        "losses": 4,
        "ties": 1,
        "winPct": 0.25,
        "pf": 132,
        "pa": 172
      },
      {
        "name": "Chicago Bears",
        "abbr": "CHI",
        "conference": "NFC",
        "division": "North",
        "wins": 4,
        "losses": 2,
        "ties": 0,
        "winPct": 0.6666666666666666,
        "pf": 150,
        "pa": 119
      },
      {
        "name": "Detroit Lions",
        "abbr": "DET",
        "conference": "NFC",
        "division": "North",
        "wins": 3,
        "losses": 2,
        "ties": 0,
        "winPct": 0.6,
        "pf": 164,
        "pa": 148
      },
      {
        "name": "Green Bay Packers",
        "abbr": "GB",
        "conference": "NFC",
        "division": "North",
        "wins": 4,
        "losses": 2,
        "ties": 0,
        "winPct": 0.6666666666666666,
        "pf": 127,
        "pa": 125
      },
      {
        "name": "Minnesota Vikings",
        "abbr": "MIN",
        "conference": "NFC",
        "division": "North",
        "wins": 5,
        "losses": 0,
        "ties": 0,
        "winPct": 1,
        "pf": 109,
        "pa": 64
      },
      {
        "name": "Atlanta Falcons",
        "abbr": "ATL",
        "conference": "NFC",
        "division": "South",
        "wins": 2,
        "losses": 4,
        "ties": 0,
        "winPct": 0.3333333333333333,
        "pf": 142,
        "pa": 153
      },
      {
        "name": "Carolina Panthers",
        "abbr": "CAR",
        "conference": "NFC",
        "division": "South",
        "wins": 3,
        "losses": 2,
        "ties": 0,
        "winPct": 0.6,
        "pf": 146,
        "pa": 123
      },
      {
        "name": "New Orleans Saints",
        "abbr": "NO",
        "conference": "NFC",
        "division": "South",
        "wins": 2,
        "losses": 4,
        "ties": 0,
        "winPct": 0.3333333333333333,
        "pf": 152,
        "pa": 178
      },
      {
        "name": "Tampa Bay Buccaneers",
        "abbr": "TB",
        "conference": "NFC",
        "division": "South",
        "wins": 1,
        "losses": 5,
        "ties": 0,
        "winPct": 0.16666666666666666,
        "pf": 119,
        "pa": 138
      },
      {
        "name": "Arizona Cardinals",
        "abbr": "ARI",
        "conference": "NFC",
        "division": "West",
        "wins": 2,
        "losses": 4,
        "ties": 0,
        "winPct": 0.3333333333333333,
        "pf": 126,
        "pa": 178
      },
      {
        "name": "Los Angeles Rams",
        "abbr": "LAR",
        "conference": "NFC",
        "division": "West",
        "wins": 2,
        "losses": 4,
        "ties": 0,
        "winPct": 0.3333333333333333,
        "pf": 135,
        "pa": 138
      },
      {
        "name": "San Francisco 49ers",
        "abbr": "SF",
        "conference": "NFC",
        "division": "West",
        "wins": 6,
        "losses": 0,
        "ties": 0,
        "winPct": 1,
        "pf": 177,
        "pa": 110
      },
      {
        "name": "Seattle Seahawks",
        "abbr": "SEA",
        "conference": "NFC",
        "division": "West",
        "wins": 3,
        "losses": 3,
        "ties": 0,
        "winPct": 0.5,
        "pf": 148,
        "pa": 122
      }
    ],
    "7": [
      {
        "name": "Buffalo Bills",
        "abbr": "BUF",
        "conference": "AFC",
        "division": "East",
        "wins": 5,
        "losses": 1,
        "ties": 0,
        "winPct": 0.8333333333333334,
        "pf": 197,
        "pa": 171
      },
      {
        "name": "Miami Dolphins",
        "abbr": "MIA",
        "conference": "AFC",
        "division": "East",
        "wins": 1,
        "losses": 5,
        "ties": 0,
        "winPct": 0.16666666666666666,
        "pf": 98,
        "pa": 157
      },
      {
        "name": "New England Patriots",
        "abbr": "NE",
        "conference": "AFC",
        "division": "East",
        "wins": 4,
        "losses": 3,
        "ties": 0,
        "winPct": 0.5714285714285714,
        "pf": 160,
        "pa": 143
      },
      {
        "name": "New York Jets",
        "abbr": "NYJ",
        "conference": "AFC",
        "division": "East",
        "wins": 2,
        "losses": 5,
        "ties": 0,
        "winPct": 0.2857142857142857,
        "pf": 137,
        "pa": 150
      },
      {
        "name": "Baltimore Ravens",
        "abbr": "BAL",
        "conference": "AFC",
        "division": "North",
        "wins": 4,
        "losses": 3,
        "ties": 0,
        "winPct": 0.5714285714285714,
        "pf": 169,
        "pa": 167
      },
      {
        "name": "Cincinnati Bengals",
        "abbr": "CIN",
        "conference": "AFC",
        "division": "North",
        "wins": 4,
        "losses": 2,
        "ties": 0,
        "winPct": 0.6666666666666666,
        "pf": 163,
        "pa": 122
      },
      {
        "name": "Cleveland Browns",
        "abbr": "CLE",
        "conference": "AFC",
        "division": "North",
        "wins": 5,
        "losses": 2,
        "ties": 0,
        "winPct": 0.7142857142857143,
        "pf": 133,
        "pa": 146
      },
      {
        "name": "Pittsburgh Steelers",
        "abbr": "PIT",
        "conference": "AFC",
        "division": "North",
        "wins": 5,
        "losses": 2,
        "ties": 0,
        "winPct": 0.7142857142857143,
        "pf": 153,
        "pa": 138
      },
      {
        "name": "Houston Texans",
        "abbr": "HOU",
        "conference": "AFC",
        "division": "South",
        "wins": 2,
        "losses": 5,
        "ties": 0,
        "winPct": 0.2857142857142857,
        "pf": 165,
        "pa": 170
      },
      {
        "name": "Indianapolis Colts",
        "abbr": "IND",
        "conference": "AFC",
        "division": "South",
        "wins": 2,
        "losses": 5,
        "ties": 0,
        "winPct": 0.2857142857142857,
        "pf": 154,
        "pa": 180
      },
      {
        "name": "Jacksonville Jaguars",
        "abbr": "JAX",
        "conference": "AFC",
        "division": "South",
        "wins": 4,
        "losses": 2,
        "ties": 0,
        "winPct": 0.6666666666666666,
        "pf": 154,
        "pa": 104
      },
      {
        "name": "Tennessee Titans",
        "abbr": "TEN",
        "conference": "AFC",
        "division": "South",
        "wins": 1,
        "losses": 6,
        "ties": 0,
        "winPct": 0.14285714285714285,
        "pf": 108,
        "pa": 156
      },
      {
        "name": "Denver Broncos",
        "abbr": "DEN",
        "conference": "AFC",
        "division": "West",
        "wins": 5,
        "losses": 2,
        "ties": 0,
        "winPct": 0.7142857142857143,
        "pf": 144,
        "pa": 141
      },
      {
        "name": "Kansas City Chiefs",
        "abbr": "KC",
        "conference": "AFC",
        "division": "West",
        "wins": 5,
        "losses": 1,
        "ties": 0,
        "winPct": 0.8333333333333334,
        "pf": 143,
        "pa": 103
      },
      {
        "name": "Las Vegas Raiders",
        "abbr": "LV",
        "conference": "AFC",
        "division": "West",
        "wins": 3,
        "losses": 4,
        "ties": 0,
        "winPct": 0.42857142857142855,
        "pf": 183,
        "pa": 197
      },
      {
        "name": "Los Angeles Chargers",
        "abbr": "LAC",
        "conference": "AFC",
        "division": "West",
        "wins": 0,
        "losses": 6,
        "ties": 0,
        "winPct": 0,
        "pf": 90,
        "pa": 151
      },
      {
        "name": "Dallas Cowboys",
        "abbr": "DAL",
        "conference": "NFC",
        "division": "East",
        "wins": 3,
        "losses": 4,
        "ties": 0,
        "winPct": 0.42857142857142855,
        "pf": 189,
        "pa": 180
      },
      {
        "name": "New York Giants",
        "abbr": "NYG",
        "conference": "NFC",
        "division": "East",
        "wins": 4,
        "losses": 2,
        "ties": 1,
        "winPct": 0.6428571428571429,
        "pf": 163,
        "pa": 161
      },
      {
        "name": "Philadelphia Eagles",
        "abbr": "PHI",
        "conference": "NFC",
        "division": "East",
        "wins": 2,
        "losses": 5,
        "ties": 0,
        "winPct": 0.2857142857142857,
        "pf": 127,
        "pa": 175
      },
      {
        "name": "Washington Commanders",
        "abbr": "WSH",
        "conference": "NFC",
        "division": "East",
        "wins": 1,
        "losses": 4,
        "ties": 1,
        "winPct": 0.25,
        "pf": 132,
        "pa": 172
      },
      {
        "name": "Chicago Bears",
        "abbr": "CHI",
        "conference": "NFC",
        "division": "North",
        "wins": 5,
        "losses": 2,
        "ties": 0,
        "winPct": 0.7142857142857143,
        "pf": 180,
        "pa": 143
      },
      {
        "name": "Detroit Lions",
        "abbr": "DET",
        "conference": "NFC",
        "division": "North",
        "wins": 4,
        "losses": 2,
        "ties": 0,
        "winPct": 0.6666666666666666,
        "pf": 184,
        "pa": 165
      },
      {
        "name": "Green Bay Packers",
        "abbr": "GB",
        "conference": "NFC",
        "division": "North",
        "wins": 4,
        "losses": 3,
        "ties": 0,
        "winPct": 0.5714285714285714,
        "pf": 144,
        "pa": 145
      },
      {
        "name": "Minnesota Vikings",
        "abbr": "MIN",
        "conference": "NFC",
        "division": "North",
        "wins": 6,
        "losses": 0,
        "ties": 0,
        "winPct": 1,
        "pf": 125,
        "pa": 74
      },
      {
        "name": "Atlanta Falcons",
        "abbr": "ATL",
        "conference": "NFC",
        "division": "South",
        "wins": 3,
        "losses": 4,
        "ties": 0,
        "winPct": 0.42857142857142855,
        "pf": 171,
        "pa": 173
      },
      {
        "name": "Carolina Panthers",
        "abbr": "CAR",
        "conference": "NFC",
        "division": "South",
        "wins": 3,
        "losses": 3,
        "ties": 0,
        "winPct": 0.5,
        "pf": 159,
        "pa": 166
      },
      {
        "name": "New Orleans Saints",
        "abbr": "NO",
        "conference": "NFC",
        "division": "South",
        "wins": 2,
        "losses": 5,
        "ties": 0,
        "winPct": 0.2857142857142857,
        "pf": 162,
        "pa": 194
      },
      {
        "name": "Tampa Bay Buccaneers",
        "abbr": "TB",
        "conference": "NFC",
        "division": "South",
        "wins": 2,
        "losses": 5,
        "ties": 0,
        "winPct": 0.2857142857142857,
        "pf": 162,
        "pa": 151
      },
      {
        "name": "Arizona Cardinals",
        "abbr": "ARI",
        "conference": "NFC",
        "division": "West",
        "wins": 2,
        "losses": 5,
        "ties": 0,
        "winPct": 0.2857142857142857,
        "pf": 142,
        "pa": 208
      },
      {
        "name": "Los Angeles Rams",
        "abbr": "LAR",
        "conference": "NFC",
        "division": "West",
        "wins": 3,
        "losses": 4,
        "ties": 0,
        "winPct": 0.42857142857142855,
        "pf": 170,
        "pa": 159
      },
      {
        "name": "San Francisco 49ers",
        "abbr": "SF",
        "conference": "NFC",
        "division": "West",
        "wins": 6,
        "losses": 1,
        "ties": 0,
        "winPct": 0.8571428571428571,
        "pf": 197,
        "pa": 139
      },
      {
        "name": "Seattle Seahawks",
        "abbr": "SEA",
        "conference": "NFC",
        "division": "West",
        "wins": 4,
        "losses": 3,
        "ties": 0,
        "winPct": 0.5714285714285714,
        "pf": 168,
        "pa": 125
      }
    ],
    "8": [
      {
        "name": "Buffalo Bills",
        "abbr": "BUF",
        "conference": "AFC",
        "division": "East",
        "wins": 6,
        "losses": 1,
        "ties": 0,
        "winPct": 0.8571428571428571,
        "pf": 233,
        "pa": 181
      },
      {
        "name": "Miami Dolphins",
        "abbr": "MIA",
        "conference": "AFC",
        "division": "East",
        "wins": 1,
        "losses": 6,
        "ties": 0,
        "winPct": 0.14285714285714285,
        "pf": 117,
        "pa": 181
      },
      {
        "name": "New England Patriots",
        "abbr": "NE",
        "conference": "AFC",
        "division": "East",
        "wins": 5,
        "losses": 3,
        "ties": 0,
        "winPct": 0.625,
        "pf": 184,
        "pa": 162
      },
      {
        "name": "New York Jets",
        "abbr": "NYJ",
        "conference": "AFC",
        "division": "East",
        "wins": 2,
        "losses": 6,
        "ties": 0,
        "winPct": 0.25,
        "pf": 170,
        "pa": 188
      },
      {
        "name": "Baltimore Ravens",
        "abbr": "BAL",
        "conference": "AFC",
        "division": "North",
        "wins": 4,
        "losses": 4,
        "ties": 0,
        "winPct": 0.5,
        "pf": 179,
        "pa": 203
      },
      {
        "name": "Cincinnati Bengals",
        "abbr": "CIN",
        "conference": "AFC",
        "division": "North",
        "wins": 5,
        "losses": 2,
        "ties": 0,
        "winPct": 0.7142857142857143,
        "pf": 206,
        "pa": 158
      },
      {
        "name": "Cleveland Browns",
        "abbr": "CLE",
        "conference": "AFC",
        "division": "North",
        "wins": 5,
        "losses": 3,
        "ties": 0,
        "winPct": 0.625,
        "pf": 139,
        "pa": 173
      },
      {
        "name": "Pittsburgh Steelers",
        "abbr": "PIT",
        "conference": "AFC",
        "division": "North",
        "wins": 6,
        "losses": 2,
        "ties": 0,
        "winPct": 0.75,
        "pf": 180,
        "pa": 144
      },
      {
        "name": "Houston Texans",
        "abbr": "HOU",
        "conference": "AFC",
        "division": "South",
        "wins": 2,
        "losses": 5,
        "ties": 0,
        "winPct": 0.2857142857142857,
        "pf": 165,
        "pa": 170
      },
      {
        "name": "Indianapolis Colts",
        "abbr": "IND",
        "conference": "AFC",
        "division": "South",
        "wins": 2,
        "losses": 6,
        "ties": 0,
        "winPct": 0.25,
        "pf": 161,
        "pa": 222
      },
      {
        "name": "Jacksonville Jaguars",
        "abbr": "JAX",
        "conference": "AFC",
        "division": "South",
        "wins": 5,
        "losses": 2,
        "ties": 0,
        "winPct": 0.7142857142857143,
        "pf": 196,
        "pa": 111
      },
      {
        "name": "Tennessee Titans",
        "abbr": "TEN",
        "conference": "AFC",
        "division": "South",
        "wins": 1,
        "losses": 7,
        "ties": 0,
        "winPct": 0.125,
        "pf": 144,
        "pa": 199
      },
      {
        "name": "Denver Broncos",
        "abbr": "DEN",
        "conference": "AFC",
        "division": "West",
        "wins": 6,
        "losses": 2,
        "ties": 0,
        "winPct": 0.75,
        "pf": 172,
        "pa": 165
      },
      {
        "name": "Kansas City Chiefs",
        "abbr": "KC",
        "conference": "AFC",
        "division": "West",
        "wins": 5,
        "losses": 2,
        "ties": 0,
        "winPct": 0.7142857142857143,
        "pf": 167,
        "pa": 131
      },
      {
        "name": "Las Vegas Raiders",
        "abbr": "LV",
        "conference": "AFC",
        "division": "West",
        "wins": 4,
        "losses": 4,
        "ties": 0,
        "winPct": 0.5,
        "pf": 221,
        "pa": 230
      },
      {
        "name": "Los Angeles Chargers",
        "abbr": "LAC",
        "conference": "AFC",
        "division": "West",
        "wins": 0,
        "losses": 7,
        "ties": 0,
        "winPct": 0,
        "pf": 99,
        "pa": 175
      },
      {
        "name": "Dallas Cowboys",
        "abbr": "DAL",
        "conference": "NFC",
        "division": "East",
        "wins": 3,
        "losses": 5,
        "ties": 0,
        "winPct": 0.375,
        "pf": 219,
        "pa": 213
      },
      {
        "name": "New York Giants",
        "abbr": "NYG",
        "conference": "NFC",
        "division": "East",
        "wins": 4,
        "losses": 2,
        "ties": 1,
        "winPct": 0.6428571428571429,
        "pf": 163,
        "pa": 161
      },
      {
        "name": "Philadelphia Eagles",
        "abbr": "PHI",
        "conference": "NFC",
        "division": "East",
        "wins": 2,
        "losses": 6,
        "ties": 0,
        "winPct": 0.25,
        "pf": 137,
        "pa": 202
      },
      {
        "name": "Washington Commanders",
        "abbr": "WSH",
        "conference": "NFC",
        "division": "East",
        "wins": 2,
        "losses": 4,
        "ties": 1,
        "winPct": 0.35714285714285715,
        "pf": 159,
        "pa": 182
      },
      {
        "name": "Chicago Bears",
        "abbr": "CHI",
        "conference": "NFC",
        "division": "North",
        "wins": 6,
        "losses": 2,
        "ties": 0,
        "winPct": 0.75,
        "pf": 214,
        "pa": 160
      },
      {
        "name": "Detroit Lions",
        "abbr": "DET",
        "conference": "NFC",
        "division": "North",
        "wins": 5,
        "losses": 2,
        "ties": 0,
        "winPct": 0.7142857142857143,
        "pf": 203,
        "pa": 180
      },
      {
        "name": "Green Bay Packers",
        "abbr": "GB",
        "conference": "NFC",
        "division": "North",
        "wins": 5,
        "losses": 3,
        "ties": 0,
        "winPct": 0.625,
        "pf": 171,
        "pa": 164
      },
      {
        "name": "Minnesota Vikings",
        "abbr": "MIN",
        "conference": "NFC",
        "division": "North",
        "wins": 6,
        "losses": 1,
        "ties": 0,
        "winPct": 0.8571428571428571,
        "pf": 140,
        "pa": 93
      },
      {
        "name": "Atlanta Falcons",
        "abbr": "ATL",
        "conference": "NFC",
        "division": "South",
        "wins": 3,
        "losses": 5,
        "ties": 0,
        "winPct": 0.375,
        "pf": 171,
        "pa": 189
      },
      {
        "name": "Carolina Panthers",
        "abbr": "CAR",
        "conference": "NFC",
        "division": "South",
        "wins": 3,
        "losses": 4,
        "ties": 0,
        "winPct": 0.42857142857142855,
        "pf": 178,
        "pa": 193
      },
      {
        "name": "New Orleans Saints",
        "abbr": "NO",
        "conference": "NFC",
        "division": "South",
        "wins": 2,
        "losses": 5,
        "ties": 0,
        "winPct": 0.2857142857142857,
        "pf": 162,
        "pa": 194
      },
      {
        "name": "Tampa Bay Buccaneers",
        "abbr": "TB",
        "conference": "NFC",
        "division": "South",
        "wins": 3,
        "losses": 5,
        "ties": 0,
        "winPct": 0.375,
        "pf": 178,
        "pa": 151
      },
      {
        "name": "Arizona Cardinals",
        "abbr": "ARI",
        "conference": "NFC",
        "division": "West",
        "wins": 3,
        "losses": 5,
        "ties": 0,
        "winPct": 0.375,
        "pf": 175,
        "pa": 238
      },
      {
        "name": "Los Angeles Rams",
        "abbr": "LAR",
        "conference": "NFC",
        "division": "West",
        "wins": 4,
        "losses": 4,
        "ties": 0,
        "winPct": 0.5,
        "pf": 194,
        "pa": 168
      },
      {
        "name": "San Francisco 49ers",
        "abbr": "SF",
        "conference": "NFC",
        "division": "West",
        "wins": 6,
        "losses": 1,
        "ties": 0,
        "winPct": 0.8571428571428571,
        "pf": 197,
        "pa": 139
      },
      {
        "name": "Seattle Seahawks",
        "abbr": "SEA",
        "conference": "NFC",
        "division": "West",
        "wins": 4,
        "losses": 4,
        "ties": 0,
        "winPct": 0.5,
        "pf": 185,
        "pa": 159
      }
    ],
    "9": [
      {
        "name": "Buffalo Bills",
        "abbr": "BUF",
        "conference": "AFC",
        "division": "East",
        "wins": 7,
        "losses": 1,
        "ties": 0,
        "winPct": 0.875,
        "pf": 256,
        "pa": 187
      },
      {
        "name": "Miami Dolphins",
        "abbr": "MIA",
        "conference": "AFC",
        "division": "East",
        "wins": 1,
        "losses": 7,
        "ties": 0,
        "winPct": 0.125,
        "pf": 126,
        "pa": 200
      },
      {
        "name": "New England Patriots",
        "abbr": "NE",
        "conference": "AFC",
        "division": "East",
        "wins": 5,
        "losses": 4,
        "ties": 0,
        "winPct": 0.5555555555555556,
        "pf": 211,
        "pa": 207
      },
      {
        "name": "New York Jets",
        "abbr": "NYJ",
        "conference": "AFC",
        "division": "East",
        "wins": 2,
        "losses": 7,
        "ties": 0,
        "winPct": 0.2222222222222222,
        "pf": 182,
        "pa": 223
      },
      {
        "name": "Baltimore Ravens",
        "abbr": "BAL",
        "conference": "AFC",
        "division": "North",
        "wins": 4,
        "losses": 5,
        "ties": 0,
        "winPct": 0.4444444444444444,
        "pf": 189,
        "pa": 236
      },
      {
        "name": "Cincinnati Bengals",
        "abbr": "CIN",
        "conference": "AFC",
        "division": "North",
        "wins": 6,
        "losses": 2,
        "ties": 0,
        "winPct": 0.75,
        "pf": 240,
        "pa": 175
      },
      {
        "name": "Cleveland Browns",
        "abbr": "CLE",
        "conference": "AFC",
        "division": "North",
        "wins": 5,
        "losses": 4,
        "ties": 0,
        "winPct": 0.5555555555555556,
        "pf": 161,
        "pa": 196
      },
      {
        "name": "Pittsburgh Steelers",
        "abbr": "PIT",
        "conference": "AFC",
        "division": "North",
        "wins": 6,
        "losses": 2,
        "ties": 0,
        "winPct": 0.75,
        "pf": 180,
        "pa": 144
      },
      {
        "name": "Houston Texans",
        "abbr": "HOU",
        "conference": "AFC",
        "division": "South",
        "wins": 3,
        "losses": 5,
        "ties": 0,
        "winPct": 0.375,
        "pf": 209,
        "pa": 192
      },
      {
        "name": "Indianapolis Colts",
        "abbr": "IND",
        "conference": "AFC",
        "division": "South",
        "wins": 2,
        "losses": 7,
        "ties": 0,
        "winPct": 0.2222222222222222,
        "pf": 184,
        "pa": 249
      },
      {
        "name": "Jacksonville Jaguars",
        "abbr": "JAX",
        "conference": "AFC",
        "division": "South",
        "wins": 6,
        "losses": 2,
        "ties": 0,
        "winPct": 0.75,
        "pf": 229,
        "pa": 121
      },
      {
        "name": "Tennessee Titans",
        "abbr": "TEN",
        "conference": "AFC",
        "division": "South",
        "wins": 1,
        "losses": 7,
        "ties": 0,
        "winPct": 0.125,
        "pf": 144,
        "pa": 199
      },
      {
        "name": "Denver Broncos",
        "abbr": "DEN",
        "conference": "AFC",
        "division": "West",
        "wins": 7,
        "losses": 2,
        "ties": 0,
        "winPct": 0.7777777777777778,
        "pf": 198,
        "pa": 186
      },
      {
        "name": "Kansas City Chiefs",
        "abbr": "KC",
        "conference": "AFC",
        "division": "West",
        "wins": 6,
        "losses": 2,
        "ties": 0,
        "winPct": 0.75,
        "pf": 202,
        "pa": 143
      },
      {
        "name": "Las Vegas Raiders",
        "abbr": "LV",
        "conference": "AFC",
        "division": "West",
        "wins": 4,
        "losses": 5,
        "ties": 0,
        "winPct": 0.4444444444444444,
        "pf": 238,
        "pa": 268
      },
      {
        "name": "Los Angeles Chargers",
        "abbr": "LAC",
        "conference": "AFC",
        "division": "West",
        "wins": 0,
        "losses": 8,
        "ties": 0,
        "winPct": 0,
        "pf": 121,
        "pa": 219
      },
      {
        "name": "Dallas Cowboys",
        "abbr": "DAL",
        "conference": "NFC",
        "division": "East",
        "wins": 4,
        "losses": 5,
        "ties": 0,
        "winPct": 0.4444444444444444,
        "pf": 246,
        "pa": 236
      },
      {
        "name": "New York Giants",
        "abbr": "NYG",
        "conference": "NFC",
        "division": "East",
        "wins": 5,
        "losses": 2,
        "ties": 1,
        "winPct": 0.6875,
        "pf": 182,
        "pa": 172
      },
      {
        "name": "Philadelphia Eagles",
        "abbr": "PHI",
        "conference": "NFC",
        "division": "East",
        "wins": 2,
        "losses": 7,
        "ties": 0,
        "winPct": 0.2222222222222222,
        "pf": 148,
        "pa": 221
      },
      {
        "name": "Washington Commanders",
        "abbr": "WSH",
        "conference": "NFC",
        "division": "East",
        "wins": 2,
        "losses": 5,
        "ties": 1,
        "winPct": 0.3125,
        "pf": 172,
        "pa": 202
      },
      {
        "name": "Chicago Bears",
        "abbr": "CHI",
        "conference": "NFC",
        "division": "North",
        "wins": 7,
        "losses": 2,
        "ties": 0,
        "winPct": 0.7777777777777778,
        "pf": 241,
        "pa": 184
      },
      {
        "name": "Detroit Lions",
        "abbr": "DET",
        "conference": "NFC",
        "division": "North",
        "wins": 6,
        "losses": 2,
        "ties": 0,
        "winPct": 0.75,
        "pf": 222,
        "pa": 189
      },
      {
        "name": "Green Bay Packers",
        "abbr": "GB",
        "conference": "NFC",
        "division": "North",
        "wins": 6,
        "losses": 3,
        "ties": 0,
        "winPct": 0.6666666666666666,
        "pf": 216,
        "pa": 191
      },
      {
        "name": "Minnesota Vikings",
        "abbr": "MIN",
        "conference": "NFC",
        "division": "North",
        "wins": 6,
        "losses": 2,
        "ties": 0,
        "winPct": 0.75,
        "pf": 146,
        "pa": 116
      },
      {
        "name": "Atlanta Falcons",
        "abbr": "ATL",
        "conference": "NFC",
        "division": "South",
        "wins": 3,
        "losses": 6,
        "ties": 0,
        "winPct": 0.3333333333333333,
        "pf": 188,
        "pa": 223
      },
      {
        "name": "Carolina Panthers",
        "abbr": "CAR",
        "conference": "NFC",
        "division": "South",
        "wins": 3,
        "losses": 5,
        "ties": 0,
        "winPct": 0.375,
        "pf": 199,
        "pa": 219
      },
      {
        "name": "New Orleans Saints",
        "abbr": "NO",
        "conference": "NFC",
        "division": "South",
        "wins": 3,
        "losses": 5,
        "ties": 0,
        "winPct": 0.375,
        "pf": 185,
        "pa": 216
      },
      {
        "name": "Tampa Bay Buccaneers",
        "abbr": "TB",
        "conference": "NFC",
        "division": "South",
        "wins": 3,
        "losses": 6,
        "ties": 0,
        "winPct": 0.3333333333333333,
        "pf": 202,
        "pa": 178
      },
      {
        "name": "Arizona Cardinals",
        "abbr": "ARI",
        "conference": "NFC",
        "division": "West",
        "wins": 3,
        "losses": 6,
        "ties": 0,
        "winPct": 0.3333333333333333,
        "pf": 178,
        "pa": 255
      },
      {
        "name": "Los Angeles Rams",
        "abbr": "LAR",
        "conference": "NFC",
        "division": "West",
        "wins": 5,
        "losses": 4,
        "ties": 0,
        "winPct": 0.5555555555555556,
        "pf": 214,
        "pa": 181
      },
      {
        "name": "San Francisco 49ers",
        "abbr": "SF",
        "conference": "NFC",
        "division": "West",
        "wins": 7,
        "losses": 1,
        "ties": 0,
        "winPct": 0.875,
        "pf": 235,
        "pa": 156
      },
      {
        "name": "Seattle Seahawks",
        "abbr": "SEA",
        "conference": "NFC",
        "division": "West",
        "wins": 5,
        "losses": 4,
        "ties": 0,
        "winPct": 0.5555555555555556,
        "pf": 202,
        "pa": 162
      }
    ],
    "10": [
      {
        "name": "Buffalo Bills",
        "abbr": "BUF",
        "conference": "AFC",
        "division": "East",
        "wins": 8,
        "losses": 1,
        "ties": 0,
        "winPct": 0.8888888888888888,
        "pf": 287,
        "pa": 199
      },
      {
        "name": "Miami Dolphins",
        "abbr": "MIA",
        "conference": "AFC",
        "division": "East",
        "wins": 1,
        "losses": 8,
        "ties": 0,
        "winPct": 0.1111111111111111,
        "pf": 148,
        "pa": 224
      },
      {
        "name": "New England Patriots",
        "abbr": "NE",
        "conference": "AFC",
        "division": "East",
        "wins": 5,
        "losses": 5,
        "ties": 0,
        "winPct": 0.5,
        "pf": 221,
        "pa": 242
      },
      {
        "name": "New York Jets",
        "abbr": "NYJ",
        "conference": "AFC",
        "division": "East",
        "wins": 2,
        "losses": 8,
        "ties": 0,
        "winPct": 0.2,
        "pf": 194,
        "pa": 254
      },
      {
        "name": "Baltimore Ravens",
        "abbr": "BAL",
        "conference": "AFC",
        "division": "North",
        "wins": 4,
        "losses": 6,
        "ties": 0,
        "winPct": 0.4,
        "pf": 209,
        "pa": 259
      },
      {
        "name": "Cincinnati Bengals",
        "abbr": "CIN",
        "conference": "AFC",
        "division": "North",
        "wins": 7,
        "losses": 2,
        "ties": 0,
        "winPct": 0.7777777777777778,
        "pf": 278,
        "pa": 193
      },
      {
        "name": "Cleveland Browns",
        "abbr": "CLE",
        "conference": "AFC",
        "division": "North",
        "wins": 6,
        "losses": 4,
        "ties": 0,
        "winPct": 0.6,
        "pf": 188,
        "pa": 220
      },
      {
        "name": "Pittsburgh Steelers",
        "abbr": "PIT",
        "conference": "AFC",
        "division": "North",
        "wins": 6,
        "losses": 3,
        "ties": 0,
        "winPct": 0.6666666666666666,
        "pf": 198,
        "pa": 182
      },
      {
        "name": "Houston Texans",
        "abbr": "HOU",
        "conference": "AFC",
        "division": "South",
        "wins": 3,
        "losses": 6,
        "ties": 0,
        "winPct": 0.3333333333333333,
        "pf": 233,
        "pa": 219
      },
      {
        "name": "Indianapolis Colts",
        "abbr": "IND",
        "conference": "AFC",
        "division": "South",
        "wins": 3,
        "losses": 7,
        "ties": 0,
        "winPct": 0.3,
        "pf": 208,
        "pa": 271
      },
      {
        "name": "Jacksonville Jaguars",
        "abbr": "JAX",
        "conference": "AFC",
        "division": "South",
        "wins": 7,
        "losses": 2,
        "ties": 0,
        "winPct": 0.7777777777777778,
        "pf": 269,
        "pa": 144
      },
      {
        "name": "Tennessee Titans",
        "abbr": "TEN",
        "conference": "AFC",
        "division": "South",
        "wins": 1,
        "losses": 8,
        "ties": 0,
        "winPct": 0.1111111111111111,
        "pf": 167,
        "pa": 239
      },
      {
        "name": "Denver Broncos",
        "abbr": "DEN",
        "conference": "AFC",
        "division": "West",
        "wins": 7,
        "losses": 2,
        "ties": 0,
        "winPct": 0.7777777777777778,
        "pf": 198,
        "pa": 186
      },
      {
        "name": "Kansas City Chiefs",
        "abbr": "KC",
        "conference": "AFC",
        "division": "West",
        "wins": 7,
        "losses": 2,
        "ties": 0,
        "winPct": 0.7777777777777778,
        "pf": 237,
        "pa": 156
      },
      {
        "name": "Las Vegas Raiders",
        "abbr": "LV",
        "conference": "AFC",
        "division": "West",
        "wins": 4,
        "losses": 6,
        "ties": 0,
        "winPct": 0.4,
        "pf": 251,
        "pa": 289
      },
      {
        "name": "Los Angeles Chargers",
        "abbr": "LAC",
        "conference": "AFC",
        "division": "West",
        "wins": 1,
        "losses": 8,
        "ties": 0,
        "winPct": 0.1111111111111111,
        "pf": 144,
        "pa": 239
      },
      {
        "name": "Dallas Cowboys",
        "abbr": "DAL",
        "conference": "NFC",
        "division": "East",
        "wins": 4,
        "losses": 6,
        "ties": 0,
        "winPct": 0.4,
        "pf": 286,
        "pa": 282
      },
      {
        "name": "New York Giants",
        "abbr": "NYG",
        "conference": "NFC",
        "division": "East",
        "wins": 5,
        "losses": 3,
        "ties": 1,
        "winPct": 0.6111111111111112,
        "pf": 203,
        "pa": 196
      },
      {
        "name": "Philadelphia Eagles",
        "abbr": "PHI",
        "conference": "NFC",
        "division": "East",
        "wins": 2,
        "losses": 7,
        "ties": 0,
        "winPct": 0.2222222222222222,
        "pf": 148,
        "pa": 221
      },
      {
        "name": "Washington Commanders",
        "abbr": "WSH",
        "conference": "NFC",
        "division": "East",
        "wins": 3,
        "losses": 5,
        "ties": 1,
        "winPct": 0.3888888888888889,
        "pf": 196,
        "pa": 223
      },
      {
        "name": "Chicago Bears",
        "abbr": "CHI",
        "conference": "NFC",
        "division": "North",
        "wins": 7,
        "losses": 2,
        "ties": 0,
        "winPct": 0.7777777777777778,
        "pf": 241,
        "pa": 184
      },
      {
        "name": "Detroit Lions",
        "abbr": "DET",
        "conference": "NFC",
        "division": "North",
        "wins": 7,
        "losses": 2,
        "ties": 0,
        "winPct": 0.7777777777777778,
        "pf": 257,
        "pa": 199
      },
      {
        "name": "Green Bay Packers",
        "abbr": "GB",
        "conference": "NFC",
        "division": "North",
        "wins": 6,
        "losses": 4,
        "ties": 0,
        "winPct": 0.6,
        "pf": 226,
        "pa": 221
      },
      {
        "name": "Minnesota Vikings",
        "abbr": "MIN",
        "conference": "NFC",
        "division": "North",
        "wins": 7,
        "losses": 2,
        "ties": 0,
        "winPct": 0.7777777777777778,
        "pf": 176,
        "pa": 126
      },
      {
        "name": "Atlanta Falcons",
        "abbr": "ATL",
        "conference": "NFC",
        "division": "South",
        "wins": 3,
        "losses": 7,
        "ties": 0,
        "winPct": 0.3,
        "pf": 201,
        "pa": 258
      },
      {
        "name": "Carolina Panthers",
        "abbr": "CAR",
        "conference": "NFC",
        "division": "South",
        "wins": 4,
        "losses": 5,
        "ties": 0,
        "winPct": 0.4444444444444444,
        "pf": 219,
        "pa": 236
      },
      {
        "name": "New Orleans Saints",
        "abbr": "NO",
        "conference": "NFC",
        "division": "South",
        "wins": 3,
        "losses": 6,
        "ties": 0,
        "winPct": 0.3333333333333333,
        "pf": 202,
        "pa": 236
      },
      {
        "name": "Tampa Bay Buccaneers",
        "abbr": "TB",
        "conference": "NFC",
        "division": "South",
        "wins": 3,
        "losses": 6,
        "ties": 0,
        "winPct": 0.3333333333333333,
        "pf": 202,
        "pa": 178
      },
      {
        "name": "Arizona Cardinals",
        "abbr": "ARI",
        "conference": "NFC",
        "division": "West",
        "wins": 3,
        "losses": 7,
        "ties": 0,
        "winPct": 0.3,
        "pf": 184,
        "pa": 289
      },
      {
        "name": "Los Angeles Rams",
        "abbr": "LAR",
        "conference": "NFC",
        "division": "West",
        "wins": 6,
        "losses": 4,
        "ties": 0,
        "winPct": 0.6,
        "pf": 248,
        "pa": 187
      },
      {
        "name": "San Francisco 49ers",
        "abbr": "SF",
        "conference": "NFC",
        "division": "West",
        "wins": 8,
        "losses": 1,
        "ties": 0,
        "winPct": 0.8888888888888888,
        "pf": 281,
        "pa": 196
      },
      {
        "name": "Seattle Seahawks",
        "abbr": "SEA",
        "conference": "NFC",
        "division": "West",
        "wins": 6,
        "losses": 4,
        "ties": 0,
        "winPct": 0.6,
        "pf": 223,
        "pa": 175
      }
    ]
  }
};

const NFL_FPI = {};

const NFL_OFFDEF = {
  "2026": {
    "1": [
      {
        "abbr": "BUF",
        "off": 0.18323384371573417,
        "def": 0.07833731736211157,
        "offRank": 7,
        "defRank": 22
      },
      {
        "abbr": "MIA",
        "off": -0.12549832502943822,
        "def": -0.04583608092946463,
        "offRank": 27,
        "defRank": 13
      },
      {
        "abbr": "NE",
        "off": -0.09014041510625687,
        "def": 0.049881026416182236,
        "offRank": 22,
        "defRank": 17
      },
      {
        "abbr": "NYJ",
        "off": 0.09904416991774666,
        "def": -0.09893008324495066,
        "offRank": 9,
        "defRank": 9
      },
      {
        "abbr": "BAL",
        "off": 0.24898386614135404,
        "def": -0.0960125857080253,
        "offRank": 4,
        "defRank": 10
      },
      {
        "abbr": "CIN",
        "off": -0.029265729901393436,
        "def": -0.11453279721986354,
        "offRank": 19,
        "defRank": 8
      },
      {
        "abbr": "CLE",
        "off": -0.0726323823992406,
        "def": 0.2655302378744162,
        "offRank": 21,
        "defRank": 30
      },
      {
        "abbr": "PIT",
        "off": -0.2057832437383508,
        "def": -0.29258435581605774,
        "offRank": 30,
        "defRank": 2
      },
      {
        "abbr": "HOU",
        "off": 0.07833731736211157,
        "def": 0.18323384371573417,
        "offRank": 11,
        "defRank": 26
      },
      {
        "abbr": "IND",
        "off": -0.0960125857080253,
        "def": 0.24898386614135404,
        "offRank": 23,
        "defRank": 29
      },
      {
        "abbr": "JAX",
        "off": 0.2655302378744162,
        "def": -0.0726323823992406,
        "offRank": 3,
        "defRank": 12
      },
      {
        "abbr": "TEN",
        "off": -0.09893008324495066,
        "def": 0.09904416991774666,
        "offRank": 24,
        "defRank": 24
      },
      {
        "abbr": "DEN",
        "off": -0.29451423412383443,
        "def": 0.08974550463513954,
        "offRank": 32,
        "defRank": 23
      },
      {
        "abbr": "KC",
        "off": 0.08974550463513954,
        "def": -0.29451423412383443,
        "offRank": 10,
        "defRank": 1
      },
      {
        "abbr": "LV",
        "off": -0.04583608092946463,
        "def": -0.12549832502943822,
        "offRank": 20,
        "defRank": 6
      },
      {
        "abbr": "LAC",
        "off": -0.19205394770758688,
        "def": 0.07497793174793291,
        "offRank": 29,
        "defRank": 20
      },
      {
        "abbr": "DAL",
        "off": 0.18969916326243913,
        "def": 0.28463606801158436,
        "offRank": 6,
        "defRank": 31
      },
      {
        "abbr": "NYG",
        "off": 0.28463606801158436,
        "def": 0.18969916326243913,
        "offRank": 2,
        "defRank": 27
      },
      {
        "abbr": "PHI",
        "off": 0.0750091366368024,
        "def": 0.06564423515215556,
        "offRank": 12,
        "defRank": 18
      },
      {
        "abbr": "WSH",
        "off": 0.06564423515215556,
        "def": 0.0750091366368024,
        "offRank": 15,
        "defRank": 21
      },
      {
        "abbr": "CHI",
        "off": 0.42896069129055736,
        "def": 0.24203424386874534,
        "offRank": 1,
        "defRank": 28
      },
      {
        "abbr": "DET",
        "off": 0.07119821136252197,
        "def": -0.004014313982752591,
        "offRank": 14,
        "defRank": 15
      },
      {
        "abbr": "GB",
        "off": -0.15486326786240334,
        "def": -0.00002799698785655083,
        "offRank": 28,
        "defRank": 16
      },
      {
        "abbr": "MIN",
        "off": -0.00002799698785655083,
        "def": -0.15486326786240334,
        "offRank": 17,
        "defRank": 5
      },
      {
        "abbr": "ATL",
        "off": -0.29258435581605774,
        "def": -0.2057832437383508,
        "offRank": 31,
        "defRank": 3
      },
      {
        "abbr": "CAR",
        "off": 0.24203424386874534,
        "def": 0.42896069129055736,
        "offRank": 5,
        "defRank": 32
      },
      {
        "abbr": "NO",
        "off": -0.004014313982752591,
        "def": 0.07119821136252197,
        "offRank": 18,
        "defRank": 19
      },
      {
        "abbr": "TB",
        "off": -0.11453279721986354,
        "def": -0.029265729901393436,
        "offRank": 25,
        "defRank": 14
      },
      {
        "abbr": "ARI",
        "off": 0.07497793174793291,
        "def": -0.19205394770758688,
        "offRank": 13,
        "defRank": 4
      },
      {
        "abbr": "LAR",
        "off": -0.11669534159373386,
        "def": 0.1398920774412603,
        "offRank": 26,
        "defRank": 25
      },
      {
        "abbr": "SF",
        "off": 0.1398920774412603,
        "def": -0.11669534159373386,
        "offRank": 8,
        "defRank": 7
      },
      {
        "abbr": "SEA",
        "off": 0.049881026416182236,
        "def": -0.09014041510625687,
        "offRank": 16,
        "defRank": 11
      }
    ],
    "2": [
      {
        "abbr": "BUF",
        "off": 0.2581946319056029,
        "def": 0.14269965952983202,
        "offRank": 1,
        "defRank": 29
      },
      {
        "abbr": "MIA",
        "off": -0.053500055603469696,
        "def": 0.13304978479927948,
        "offRank": 23,
        "defRank": 27
      },
      {
        "abbr": "NE",
        "off": -0.05281695319381306,
        "def": -0.15035831163439842,
        "offRank": 22,
        "defRank": 5
      },
      {
        "abbr": "NYJ",
        "off": 0.003969334367804114,
        "def": -0.13484242577998,
        "offRank": 16,
        "defRank": 6
      },
      {
        "abbr": "BAL",
        "off": 0.18754184739136068,
        "def": 0.03252172081615804,
        "offRank": 4,
        "defRank": 18
      },
      {
        "abbr": "CIN",
        "off": -0.05046609244483107,
        "def": -0.17186669085870435,
        "offRank": 21,
        "defRank": 1
      },
      {
        "abbr": "CLE",
        "off": -0.03131542544353512,
        "def": 0.06999077622998492,
        "offRank": 19,
        "defRank": 21
      },
      {
        "abbr": "PIT",
        "off": -0.25153715436057245,
        "def": -0.1530011354907312,
        "offRank": 31,
        "defRank": 4
      },
      {
        "abbr": "HOU",
        "off": -0.06935104029764355,
        "def": 0.04925096842377594,
        "offRank": 26,
        "defRank": 20
      },
      {
        "abbr": "IND",
        "off": 0.028981611191004817,
        "def": 0.21942799718138103,
        "offRank": 15,
        "defRank": 32
      },
      {
        "abbr": "JAX",
        "off": 0.1187568725510589,
        "def": -0.007903177339751807,
        "offRank": 9,
        "defRank": 15
      },
      {
        "abbr": "TEN",
        "off": -0.0054918166041150645,
        "def": 0.07839940614248242,
        "offRank": 18,
        "defRank": 23
      },
      {
        "abbr": "DEN",
        "off": -0.10080700497796795,
        "def": 0.03436471994665712,
        "offRank": 27,
        "defRank": 19
      },
      {
        "abbr": "KC",
        "off": 0.14664909015284183,
        "def": -0.0421091181173683,
        "offRank": 7,
        "defRank": 12
      },
      {
        "abbr": "LV",
        "off": -0.05963762168558256,
        "def": -0.16776951934896728,
        "offRank": 25,
        "defRank": 2
      },
      {
        "abbr": "LAC",
        "off": -0.1964410736068416,
        "def": 0.007284867175810437,
        "offRank": 30,
        "defRank": 16
      },
      {
        "abbr": "DAL",
        "off": 0.18811935605499713,
        "def": 0.18906314998677012,
        "offRank": 3,
        "defRank": 31
      },
      {
        "abbr": "NYG",
        "off": 0.0031580354758021668,
        "def": 0.18663254016675437,
        "offRank": 17,
        "defRank": 30
      },
      {
        "abbr": "PHI",
        "off": 0.06604534233470387,
        "def": 0.07270939801668752,
        "offRank": 12,
        "defRank": 22
      },
      {
        "abbr": "WSH",
        "off": 0.08039051112419644,
        "def": 0.1318677781560097,
        "offRank": 11,
        "defRank": 26
      },
      {
        "abbr": "CHI",
        "off": 0.16198075228844702,
        "def": 0.10256406176344501,
        "offRank": 6,
        "defRank": 25
      },
      {
        "abbr": "DET",
        "off": 0.1377555032505559,
        "def": 0.14001297509841804,
        "offRank": 8,
        "defRank": 28
      },
      {
        "abbr": "GB",
        "off": -0.16132679676001654,
        "def": -0.04540812482485223,
        "offRank": 29,
        "defRank": 11
      },
      {
        "abbr": "MIN",
        "off": -0.03251660176385225,
        "def": -0.1334906362514528,
        "offRank": 20,
        "defRank": 7
      },
      {
        "abbr": "ATL",
        "off": -0.34983267694633446,
        "def": -0.058404701637693415,
        "offRank": 32,
        "defRank": 9
      },
      {
        "abbr": "CAR",
        "off": 0.17179704701168863,
        "def": 0.028377838358241127,
        "offRank": 5,
        "defRank": 17
      },
      {
        "abbr": "NO",
        "off": 0.057844473027577684,
        "def": 0.09005267173875289,
        "offRank": 13,
        "defRank": 24
      },
      {
        "abbr": "TB",
        "off": -0.11329709214418747,
        "def": -0.01440214518558881,
        "offRank": 28,
        "defRank": 13
      },
      {
        "abbr": "ARI",
        "off": -0.05350708241693211,
        "def": -0.010080406066038695,
        "offRank": 24,
        "defRank": 14
      },
      {
        "abbr": "LAR",
        "off": 0.036208801707069575,
        "def": -0.0808297547940466,
        "offRank": 14,
        "defRank": 8
      },
      {
        "abbr": "SF",
        "off": 0.24299013641797532,
        "def": -0.05682307557848321,
        "offRank": 2,
        "defRank": 10
      },
      {
        "abbr": "SEA",
        "off": 0.09253527154982269,
        "def": -0.15870863560796147,
        "offRank": 10,
        "defRank": 3
      }
    ],
    "3": [
      {
        "abbr": "BUF",
        "off": 0.18676102375347214,
        "def": 0.07181781168768957,
        "offRank": 2,
        "defRank": 23
      },
      {
        "abbr": "MIA",
        "off": -0.08410661062797714,
        "def": 0.1275992165292617,
        "offRank": 25,
        "defRank": 30
      },
      {
        "abbr": "NE",
        "off": -0.11452109082409169,
        "def": -0.0235323214376507,
        "offRank": 28,
        "defRank": 11
      },
      {
        "abbr": "NYJ",
        "off": 0.029219971832525123,
        "def": -0.026727348142581236,
        "offRank": 15,
        "defRank": 10
      },
      {
        "abbr": "BAL",
        "off": 0.1669797067733327,
        "def": 0.07851487216710727,
        "offRank": 4,
        "defRank": 26
      },
      {
        "abbr": "CIN",
        "off": 0.04455165341246743,
        "def": -0.07679773692361598,
        "offRank": 11,
        "defRank": 5
      },
      {
        "abbr": "CLE",
        "off": -0.023716043476406688,
        "def": -0.003363729294435241,
        "offRank": 20,
        "defRank": 14
      },
      {
        "abbr": "PIT",
        "off": -0.13308353252547742,
        "def": -0.014472895559575798,
        "offRank": 30,
        "defRank": 12
      },
      {
        "abbr": "HOU",
        "off": -0.07015672793430959,
        "def": -0.006431011562834867,
        "offRank": 24,
        "defRank": 13
      },
      {
        "abbr": "IND",
        "off": -0.01612099457206028,
        "def": 0.1440726970457194,
        "offRank": 18,
        "defRank": 31
      },
      {
        "abbr": "JAX",
        "off": 0.1512656778571166,
        "def": -0.08985000708012142,
        "offRank": 5,
        "defRank": 4
      },
      {
        "abbr": "TEN",
        "off": -0.04338042574715428,
        "def": 0.025480170538767815,
        "offRank": 22,
        "defRank": 18
      },
      {
        "abbr": "DEN",
        "off": -0.05895526951475741,
        "def": 0.029012305757656568,
        "offRank": 23,
        "defRank": 20
      },
      {
        "abbr": "KC",
        "off": 0.1384085126429603,
        "def": -0.07553494375660538,
        "offRank": 6,
        "defRank": 7
      },
      {
        "abbr": "LV",
        "off": -0.02367810442656676,
        "def": -0.09835245679300562,
        "offRank": 19,
        "defRank": 3
      },
      {
        "abbr": "LAC",
        "off": -0.15171223121354752,
        "def": 0.01915380911348459,
        "offRank": 32,
        "defRank": 16
      },
      {
        "abbr": "DAL",
        "off": 0.1736303852455375,
        "def": 0.16997683649225395,
        "offRank": 3,
        "defRank": 32
      },
      {
        "abbr": "NYG",
        "off": -0.029931744243894484,
        "def": 0.08716732037103105,
        "offRank": 21,
        "defRank": 27
      },
      {
        "abbr": "PHI",
        "off": 0.0061146854300105505,
        "def": 0.05469630279488351,
        "offRank": 17,
        "defRank": 21
      },
      {
        "abbr": "WSH",
        "off": 0.0326824778600683,
        "def": 0.07319294814924722,
        "offRank": 13,
        "defRank": 24
      },
      {
        "abbr": "CHI",
        "off": 0.11531014654675567,
        "def": 0.02758386498786948,
        "offRank": 8,
        "defRank": 19
      },
      {
        "abbr": "DET",
        "off": 0.1370094898854704,
        "def": 0.12581407963267516,
        "offRank": 7,
        "defRank": 29
      },
      {
        "abbr": "GB",
        "off": -0.0980467319194979,
        "def": 0.06711418406811066,
        "offRank": 27,
        "defRank": 22
      },
      {
        "abbr": "MIN",
        "off": -0.09191268568367207,
        "def": -0.15912115649491315,
        "offRank": 26,
        "defRank": 1
      },
      {
        "abbr": "ATL",
        "off": -0.12198402258859291,
        "def": -0.03366293650041225,
        "offRank": 29,
        "defRank": 9
      },
      {
        "abbr": "CAR",
        "off": 0.06175033406185428,
        "def": 0.01573231120227191,
        "offRank": 9,
        "defRank": 15
      },
      {
        "abbr": "NO",
        "off": 0.04032366839729081,
        "def": 0.07746398572501124,
        "offRank": 12,
        "defRank": 25
      },
      {
        "abbr": "TB",
        "off": -0.14944335180326915,
        "def": -0.0762376721400872,
        "offRank": 31,
        "defRank": 6
      },
      {
        "abbr": "ARI",
        "off": 0.022471993996855514,
        "def": 0.11389186104879327,
        "offRank": 16,
        "defRank": 28
      },
      {
        "abbr": "LAR",
        "off": 0.030059773055748546,
        "def": -0.049241847699015136,
        "offRank": 14,
        "defRank": 8
      },
      {
        "abbr": "SF",
        "off": 0.290093968826759,
        "def": 0.023378431657958935,
        "offRank": 1,
        "defRank": 17
      },
      {
        "abbr": "SEA",
        "off": 0.05149696837751245,
        "def": -0.12549659069891012,
        "offRank": 10,
        "defRank": 2
      }
    ],
    "4": [
      {
        "abbr": "BUF",
        "off": 0.172992023027216,
        "def": 0.09642820774489527,
        "offRank": 2,
        "defRank": 29
      },
      {
        "abbr": "MIA",
        "off": -0.10066544821925454,
        "def": 0.05870811885807476,
        "offRank": 30,
        "defRank": 27
      },
      {
        "abbr": "NE",
        "off": -0.03277489844616518,
        "def": 0.012632593172380323,
        "offRank": 23,
        "defRank": 14
      },
      {
        "abbr": "NYJ",
        "off": 0.007825492115272717,
        "def": -0.011392295916739471,
        "offRank": 15,
        "defRank": 11
      },
      {
        "abbr": "BAL",
        "off": 0.15724847135940007,
        "def": 0.048376926935921986,
        "offRank": 3,
        "defRank": 23
      },
      {
        "abbr": "CIN",
        "off": 0.04244820243674333,
        "def": -0.022787552719561874,
        "offRank": 10,
        "defRank": 9
      },
      {
        "abbr": "CLE",
        "off": 0.010997927244778095,
        "def": 0.016384840722513484,
        "offRank": 14,
        "defRank": 15
      },
      {
        "abbr": "PIT",
        "off": -0.081331999435158,
        "def": 0.01769708949642617,
        "offRank": 28,
        "defRank": 16
      },
      {
        "abbr": "HOU",
        "off": -0.013587466866239056,
        "def": 0.027133480520270776,
        "offRank": 17,
        "defRank": 17
      },
      {
        "abbr": "IND",
        "off": -0.026409385756644085,
        "def": 0.057187277538007106,
        "offRank": 21,
        "defRank": 26
      },
      {
        "abbr": "JAX",
        "off": 0.15571342644555788,
        "def": -0.0515579269935937,
        "offRank": 4,
        "defRank": 4
      },
      {
        "abbr": "TEN",
        "off": -0.044600219666486224,
        "def": 0.05023962591196679,
        "offRank": 25,
        "defRank": 24
      },
      {
        "abbr": "DEN",
        "off": -0.01943904417755121,
        "def": 0.05112068357103017,
        "offRank": 19,
        "defRank": 25
      },
      {
        "abbr": "KC",
        "off": 0.13284101481951852,
        "def": -0.03957681701327921,
        "offRank": 7,
        "defRank": 7
      },
      {
        "abbr": "LV",
        "off": -0.004740247602111029,
        "def": -0.04666110973279947,
        "offRank": 16,
        "defRank": 6
      },
      {
        "abbr": "LAC",
        "off": -0.13181990051840736,
        "def": -0.011402848010621427,
        "offRank": 32,
        "defRank": 10
      },
      {
        "abbr": "DAL",
        "off": 0.15512524104653092,
        "def": 0.17696058320239874,
        "offRank": 5,
        "defRank": 32
      },
      {
        "abbr": "NYG",
        "off": -0.040521124597358744,
        "def": 0.009749094971959063,
        "offRank": 24,
        "defRank": 13
      },
      {
        "abbr": "PHI",
        "off": -0.05335996256079262,
        "def": 0.04627442336532127,
        "offRank": 26,
        "defRank": 20
      },
      {
        "abbr": "WSH",
        "off": -0.02502303134556346,
        "def": 0.03738099956495717,
        "offRank": 20,
        "defRank": 18
      },
      {
        "abbr": "CHI",
        "off": 0.08516278626571752,
        "def": 0.002453312677806259,
        "offRank": 9,
        "defRank": 12
      },
      {
        "abbr": "DET",
        "off": 0.1371175354315796,
        "def": 0.14654547412375163,
        "offRank": 6,
        "defRank": 31
      },
      {
        "abbr": "GB",
        "off": -0.0679793192782495,
        "def": 0.046680002052329875,
        "offRank": 27,
        "defRank": 21
      },
      {
        "abbr": "MIN",
        "off": -0.09688974943104846,
        "def": -0.16213782124861334,
        "offRank": 29,
        "defRank": 1
      },
      {
        "abbr": "ATL",
        "off": -0.018115305270261926,
        "def": -0.03935643874648641,
        "offRank": 18,
        "defRank": 8
      },
      {
        "abbr": "CAR",
        "off": 0.10082036948995708,
        "def": 0.047092137233874135,
        "offRank": 8,
        "defRank": 22
      },
      {
        "abbr": "NO",
        "off": 0.017474978119804897,
        "def": 0.1347602951604885,
        "offRank": 12,
        "defRank": 30
      },
      {
        "abbr": "TB",
        "off": -0.11602724607862865,
        "def": -0.0508962109612773,
        "offRank": 31,
        "defRank": 5
      },
      {
        "abbr": "ARI",
        "off": -0.03136534470456158,
        "def": 0.06572854718755596,
        "offRank": 22,
        "defRank": 28
      },
      {
        "abbr": "LAR",
        "off": 0.028884541976074752,
        "def": -0.09261671932087472,
        "offRank": 11,
        "defRank": 3
      },
      {
        "abbr": "SF",
        "off": 0.24097106755394693,
        "def": 0.03775062937945714,
        "offRank": 1,
        "defRank": 19
      },
      {
        "abbr": "SEA",
        "off": 0.01165220023604364,
        "def": -0.11296645485555899,
        "offRank": 13,
        "defRank": 2
      }
    ],
    "5": [
      {
        "abbr": "BUF",
        "off": 0.18988196506913346,
        "def": 0.12202399817440082,
        "offRank": 1,
        "defRank": 30
      },
      {
        "abbr": "MIA",
        "off": -0.08261518122591385,
        "def": 0.0833277062455284,
        "offRank": 30,
        "defRank": 27
      },
      {
        "abbr": "NE",
        "off": 0.049265140482449225,
        "def": 0.02236626895033146,
        "offRank": 11,
        "defRank": 17
      },
      {
        "abbr": "NYJ",
        "off": -0.028689305631528918,
        "def": -0.06298362982264491,
        "offRank": 22,
        "defRank": 4
      },
      {
        "abbr": "BAL",
        "off": 0.15279673652892092,
        "def": 0.030472874657011685,
        "offRank": 4,
        "defRank": 19
      },
      {
        "abbr": "CIN",
        "off": 0.0698797951800772,
        "def": -0.02298576722719179,
        "offRank": 9,
        "defRank": 11
      },
      {
        "abbr": "CLE",
        "off": -0.04992441054423329,
        "def": -0.01852298080447927,
        "offRank": 24,
        "defRank": 12
      },
      {
        "abbr": "PIT",
        "off": -0.03326883496197172,
        "def": 0.00793334979439063,
        "offRank": 23,
        "defRank": 16
      },
      {
        "abbr": "HOU",
        "off": 0.0029409085612234916,
        "def": -0.040909588840594785,
        "offRank": 14,
        "defRank": 7
      },
      {
        "abbr": "IND",
        "off": -0.025748648496495163,
        "def": 0.07996932007337292,
        "offRank": 21,
        "defRank": 26
      },
      {
        "abbr": "JAX",
        "off": 0.13445944721492803,
        "def": -0.07266964819071396,
        "offRank": 5,
        "defRank": 3
      },
      {
        "abbr": "TEN",
        "off": -0.10619370123063249,
        "def": 0.05387039169389055,
        "offRank": 31,
        "defRank": 25
      },
      {
        "abbr": "DEN",
        "off": -0.05919319910443955,
        "def": -0.0025263734600837195,
        "offRank": 25,
        "defRank": 14
      },
      {
        "abbr": "KC",
        "off": 0.13284101481951852,
        "def": -0.03957681701327921,
        "offRank": 6,
        "defRank": 8
      },
      {
        "abbr": "LV",
        "off": 0.006663204261482333,
        "def": 0.0420539266185377,
        "offRank": 13,
        "defRank": 21
      },
      {
        "abbr": "LAC",
        "off": -0.1541664892322835,
        "def": -0.050268883193911366,
        "offRank": 32,
        "defRank": 5
      },
      {
        "abbr": "DAL",
        "off": 0.12174454619703957,
        "def": 0.16758302390748378,
        "offRank": 7,
        "defRank": 32
      },
      {
        "abbr": "NYG",
        "off": -0.014592844808042174,
        "def": 0.0278688047286128,
        "offRank": 16,
        "defRank": 18
      },
      {
        "abbr": "PHI",
        "off": -0.07493440430237225,
        "def": 0.04998024569976104,
        "offRank": 29,
        "defRank": 24
      },
      {
        "abbr": "WSH",
        "off": -0.0022537909637782997,
        "def": 0.0429181065929898,
        "offRank": 15,
        "defRank": 22
      },
      {
        "abbr": "CHI",
        "off": 0.028977960606759633,
        "def": 0.04114861887123284,
        "offRank": 12,
        "defRank": 20
      },
      {
        "abbr": "DET",
        "off": 0.1687186490183744,
        "def": 0.12355116138197038,
        "offRank": 3,
        "defRank": 31
      },
      {
        "abbr": "GB",
        "off": -0.021279184765136367,
        "def": -0.008997433996311026,
        "offRank": 19,
        "defRank": 13
      },
      {
        "abbr": "MIN",
        "off": -0.0705126180285341,
        "def": -0.17948076804028273,
        "offRank": 28,
        "defRank": 1
      },
      {
        "abbr": "ATL",
        "off": -0.02251393242442872,
        "def": -0.001883463231356219,
        "offRank": 20,
        "defRank": 15
      },
      {
        "abbr": "CAR",
        "off": 0.10082036948995708,
        "def": 0.047092137233874135,
        "offRank": 8,
        "defRank": 23
      },
      {
        "abbr": "NO",
        "off": -0.020289120093510637,
        "def": 0.10996689459347135,
        "offRank": 18,
        "defRank": 28
      },
      {
        "abbr": "TB",
        "off": -0.060657679914737736,
        "def": -0.046021293631199535,
        "offRank": 26,
        "defRank": 6
      },
      {
        "abbr": "ARI",
        "off": -0.01910745022255902,
        "def": 0.11721291019989023,
        "offRank": 17,
        "defRank": 29
      },
      {
        "abbr": "LAR",
        "off": 0.06887830341642509,
        "def": -0.023778526826330814,
        "offRank": 10,
        "defRank": 10
      },
      {
        "abbr": "SF",
        "off": 0.18055989878789486,
        "def": -0.039493427493941725,
        "offRank": 2,
        "defRank": 9
      },
      {
        "abbr": "SEA",
        "off": -0.06624469436971059,
        "def": -0.10679638473637842,
        "offRank": 27,
        "defRank": 2
      }
    ],
    "6": [
      {
        "abbr": "BUF",
        "off": 0.17594981390632428,
        "def": 0.11514855912494099,
        "offRank": 2,
        "defRank": 30
      },
      {
        "abbr": "MIA",
        "off": -0.08261518122591385,
        "def": 0.0833277062455284,
        "offRank": 28,
        "defRank": 28
      },
      {
        "abbr": "NE",
        "off": 0.056645197695767396,
        "def": 0.010715684721401693,
        "offRank": 10,
        "defRank": 19
      },
      {
        "abbr": "NYJ",
        "off": -0.031548488356420386,
        "def": -0.0347015159830959,
        "offRank": 20,
        "defRank": 6
      },
      {
        "abbr": "BAL",
        "off": 0.11663396124223002,
        "def": 0.01060611680652703,
        "offRank": 6,
        "defRank": 18
      },
      {
        "abbr": "CIN",
        "off": 0.0698797951800772,
        "def": -0.02298576722719179,
        "offRank": 9,
        "defRank": 13
      },
      {
        "abbr": "CLE",
        "off": -0.057896678274092624,
        "def": -0.02828463341614116,
        "offRank": 24,
        "defRank": 9
      },
      {
        "abbr": "PIT",
        "off": -0.05643658583927005,
        "def": -0.045347750302537335,
        "offRank": 23,
        "defRank": 5
      },
      {
        "abbr": "HOU",
        "off": 0.03709066769702611,
        "def": -0.00291443667661863,
        "offRank": 12,
        "defRank": 16
      },
      {
        "abbr": "IND",
        "off": -0.03623661868962916,
        "def": 0.05318072732443288,
        "offRank": 21,
        "defRank": 24
      },
      {
        "abbr": "JAX",
        "off": 0.13977895087232914,
        "def": -0.024047579822145004,
        "offRank": 4,
        "defRank": 12
      },
      {
        "abbr": "TEN",
        "off": -0.1088273095235097,
        "def": 0.028090868163377726,
        "offRank": 31,
        "defRank": 22
      },
      {
        "abbr": "DEN",
        "off": -0.0658208911736342,
        "def": -0.015645891421610048,
        "offRank": 25,
        "defRank": 14
      },
      {
        "abbr": "KC",
        "off": 0.12209332823283575,
        "def": -0.07705658648414646,
        "offRank": 5,
        "defRank": 3
      },
      {
        "abbr": "LV",
        "off": 0.01800403179826566,
        "def": 0.05418524855254933,
        "offRank": 14,
        "defRank": 25
      },
      {
        "abbr": "LAC",
        "off": -0.16804631173241946,
        "def": -0.030098335016943336,
        "offRank": 32,
        "defRank": 8
      },
      {
        "abbr": "DAL",
        "off": 0.08130282986556091,
        "def": 0.14236317235615836,
        "offRank": 8,
        "defRank": 32
      },
      {
        "abbr": "NYG",
        "off": -0.023443251339309343,
        "def": 0.02327484399748928,
        "offRank": 19,
        "defRank": 21
      },
      {
        "abbr": "PHI",
        "off": -0.08537367737530392,
        "def": 0.04745657000603649,
        "offRank": 29,
        "defRank": 23
      },
      {
        "abbr": "WSH",
        "off": -0.0030743237958138765,
        "def": 0.07814708501200465,
        "offRank": 15,
        "defRank": 26
      },
      {
        "abbr": "CHI",
        "off": 0.02133900711786262,
        "def": 0.00401222846268201,
        "offRank": 13,
        "defRank": 17
      },
      {
        "abbr": "DET",
        "off": 0.1687186490183744,
        "def": 0.12355116138197038,
        "offRank": 3,
        "defRank": 31
      },
      {
        "abbr": "GB",
        "off": -0.011957295295129252,
        "def": -0.024301232890940154,
        "offRank": 16,
        "defRank": 11
      },
      {
        "abbr": "MIN",
        "off": -0.0705126180285341,
        "def": -0.17948076804028273,
        "offRank": 27,
        "defRank": 1
      },
      {
        "abbr": "ATL",
        "off": -0.04484509541199752,
        "def": -0.004765224359829829,
        "offRank": 22,
        "defRank": 15
      },
      {
        "abbr": "CAR",
        "off": 0.08668427300814954,
        "def": 0.013871204480850646,
        "offRank": 7,
        "defRank": 20
      },
      {
        "abbr": "NO",
        "off": -0.016027771223204947,
        "def": 0.07857639319458949,
        "offRank": 17,
        "defRank": 27
      },
      {
        "abbr": "TB",
        "off": -0.10065012896851737,
        "def": -0.06771900772516136,
        "offRank": 30,
        "defRank": 4
      },
      {
        "abbr": "ARI",
        "off": -0.02191532132032841,
        "def": 0.0892648343958432,
        "offRank": 18,
        "defRank": 29
      },
      {
        "abbr": "LAR",
        "off": 0.051806255139834716,
        "def": -0.025951869826503774,
        "offRank": 11,
        "defRank": 10
      },
      {
        "abbr": "SF",
        "off": 0.19546107302898927,
        "def": -0.034489241414649804,
        "offRank": 1,
        "defRank": 7
      },
      {
        "abbr": "SEA",
        "off": -0.06704088831660633,
        "def": -0.1056589699849039,
        "offRank": 26,
        "defRank": 2
      }
    ],
    "7": [
      {
        "abbr": "BUF",
        "off": 0.17594981390632428,
        "def": 0.11514855912494099,
        "offRank": 2,
        "defRank": 31
      },
      {
        "abbr": "MIA",
        "off": -0.020317463701976405,
        "def": 0.10497702090341687,
        "offRank": 21,
        "defRank": 29
      },
      {
        "abbr": "NE",
        "off": 0.06979854661190958,
        "def": 0.03242568831750119,
        "offRank": 9,
        "defRank": 20
      },
      {
        "abbr": "NYJ",
        "off": 0.0030914031228197387,
        "def": 0.005040850988190487,
        "offRank": 15,
        "defRank": 14
      },
      {
        "abbr": "BAL",
        "off": 0.08898988787240052,
        "def": 0.045326361926302364,
        "offRank": 8,
        "defRank": 22
      },
      {
        "abbr": "CIN",
        "off": 0.10131893216260271,
        "def": -0.03132720010033903,
        "offRank": 6,
        "defRank": 7
      },
      {
        "abbr": "CLE",
        "off": -0.02004040529078366,
        "def": -0.01899566839333712,
        "offRank": 20,
        "defRank": 13
      },
      {
        "abbr": "PIT",
        "off": -0.04281983837111466,
        "def": -0.03343825333945957,
        "offRank": 27,
        "defRank": 6
      },
      {
        "abbr": "HOU",
        "off": 0.0298760122284949,
        "def": 0.03039367727206825,
        "offRank": 13,
        "defRank": 19
      },
      {
        "abbr": "IND",
        "off": -0.04173349909619206,
        "def": 0.030008617412302097,
        "offRank": 26,
        "defRank": 18
      },
      {
        "abbr": "JAX",
        "off": 0.13977895087232914,
        "def": -0.024047579822145004,
        "offRank": 3,
        "defRank": 11
      },
      {
        "abbr": "TEN",
        "off": -0.08491468752581328,
        "def": 0.04918104228493509,
        "offRank": 31,
        "defRank": 23
      },
      {
        "abbr": "DEN",
        "off": -0.03600669698961182,
        "def": -0.02957178253325993,
        "offRank": 24,
        "defRank": 10
      },
      {
        "abbr": "KC",
        "off": 0.09306744825131213,
        "def": -0.040588176256116076,
        "offRank": 7,
        "defRank": 5
      },
      {
        "abbr": "LV",
        "off": -0.004168359611327684,
        "def": 0.06539327058426304,
        "offRank": 17,
        "defRank": 24
      },
      {
        "abbr": "LAC",
        "off": -0.16804631173241946,
        "def": -0.030098335016943336,
        "offRank": 32,
        "defRank": 8
      },
      {
        "abbr": "DAL",
        "off": 0.11115289094894606,
        "def": 0.12193332162515329,
        "offRank": 5,
        "defRank": 32
      },
      {
        "abbr": "NYG",
        "off": 0.011463388790280585,
        "def": 0.017690045569427545,
        "offRank": 14,
        "defRank": 16
      },
      {
        "abbr": "PHI",
        "off": -0.07309318126339137,
        "def": 0.08012413661505347,
        "offRank": 29,
        "defRank": 27
      },
      {
        "abbr": "WSH",
        "off": -0.0030743237958138765,
        "def": 0.07814708501200465,
        "offRank": 16,
        "defRank": 26
      },
      {
        "abbr": "CHI",
        "off": 0.03757346730160444,
        "def": 0.02842006720856268,
        "offRank": 12,
        "defRank": 17
      },
      {
        "abbr": "DET",
        "off": 0.13005330633442727,
        "def": 0.10715810406702239,
        "offRank": 4,
        "defRank": 30
      },
      {
        "abbr": "GB",
        "off": -0.00697864679052602,
        "def": -0.02961045153356995,
        "offRank": 18,
        "defRank": 9
      },
      {
        "abbr": "MIN",
        "off": -0.07810800417779944,
        "def": -0.162365404919912,
        "offRank": 30,
        "defRank": 1
      },
      {
        "abbr": "ATL",
        "off": -0.030750357154693826,
        "def": 0.006882589721305212,
        "offRank": 22,
        "defRank": 15
      },
      {
        "abbr": "CAR",
        "off": 0.04658625614221452,
        "def": 0.0414309178262416,
        "offRank": 11,
        "defRank": 21
      },
      {
        "abbr": "NO",
        "off": -0.008689065348124941,
        "def": 0.07323306509282151,
        "offRank": 19,
        "defRank": 25
      },
      {
        "abbr": "TB",
        "off": -0.058990245470879145,
        "def": -0.08694164660742118,
        "offRank": 28,
        "defRank": 3
      },
      {
        "abbr": "ARI",
        "off": -0.03498842064693278,
        "def": 0.0972639009422153,
        "offRank": 23,
        "defRank": 28
      },
      {
        "abbr": "LAR",
        "off": 0.06232358683169445,
        "def": -0.04277145432288025,
        "offRank": 10,
        "defRank": 4
      },
      {
        "abbr": "SF",
        "off": 0.1770629734589716,
        "def": -0.022582591136219594,
        "offRank": 1,
        "defRank": 12
      },
      {
        "abbr": "SEA",
        "off": -0.036646341319237705,
        "def": -0.10326010774782264,
        "offRank": 25,
        "defRank": 2
      }
    ],
    "8": [
      {
        "abbr": "BUF",
        "off": 0.15441351368869047,
        "def": 0.059042885899708415,
        "offRank": 2,
        "defRank": 24
      },
      {
        "abbr": "MIA",
        "off": -0.023582265502485947,
        "def": 0.10783566019975256,
        "offRank": 23,
        "defRank": 31
      },
      {
        "abbr": "NE",
        "off": 0.07630276785513394,
        "def": 0.023244124673360383,
        "offRank": 8,
        "defRank": 17
      },
      {
        "abbr": "NYJ",
        "off": 0.02932924832619966,
        "def": 0.026895950231751963,
        "offRank": 13,
        "defRank": 18
      },
      {
        "abbr": "BAL",
        "off": 0.0371600744108228,
        "def": 0.04680227902351106,
        "offRank": 11,
        "defRank": 21
      },
      {
        "abbr": "CIN",
        "off": 0.11183841831502268,
        "def": -0.0028059646200011197,
        "offRank": 4,
        "defRank": 13
      },
      {
        "abbr": "CLE",
        "off": -0.04193701393260287,
        "def": -0.001983216170749826,
        "offRank": 24,
        "defRank": 14
      },
      {
        "abbr": "PIT",
        "off": -0.02308740260852582,
        "def": -0.05306210496684584,
        "offRank": 22,
        "defRank": 6
      },
      {
        "abbr": "HOU",
        "off": 0.0298760122284949,
        "def": 0.03039367727206825,
        "offRank": 12,
        "defRank": 19
      },
      {
        "abbr": "IND",
        "off": -0.08361949197507583,
        "def": 0.04854449816143207,
        "offRank": 30,
        "defRank": 22
      },
      {
        "abbr": "JAX",
        "off": 0.14670784399230571,
        "def": -0.07819151998949073,
        "offRank": 3,
        "defRank": 4
      },
      {
        "abbr": "TEN",
        "off": -0.04922968338120497,
        "def": 0.06466327869554198,
        "offRank": 26,
        "defRank": 25
      },
      {
        "abbr": "DEN",
        "off": -0.018065052195219505,
        "def": -0.006760921162679653,
        "offRank": 21,
        "defRank": 12
      },
      {
        "abbr": "KC",
        "off": 0.10310735019261213,
        "def": -0.021569846905985412,
        "offRank": 6,
        "defRank": 10
      },
      {
        "abbr": "LV",
        "off": 0.018337626271384008,
        "def": 0.08195648163038916,
        "offRank": 15,
        "defRank": 28
      },
      {
        "abbr": "LAC",
        "off": -0.19626565071005045,
        "def": -0.03026741548861301,
        "offRank": 32,
        "defRank": 8
      },
      {
        "abbr": "DAL",
        "off": 0.0890862738688023,
        "def": 0.11899181977910386,
        "offRank": 7,
        "defRank": 32
      },
      {
        "abbr": "NYG",
        "off": 0.011463388790280585,
        "def": 0.017690045569427545,
        "offRank": 16,
        "defRank": 16
      },
      {
        "abbr": "PHI",
        "off": -0.08665819587787219,
        "def": 0.08233640817116979,
        "offRank": 31,
        "defRank": 29
      },
      {
        "abbr": "WSH",
        "off": 0.010484614565953785,
        "def": 0.041825264101686674,
        "offRank": 18,
        "defRank": 20
      },
      {
        "abbr": "CHI",
        "off": 0.05497487468882355,
        "def": 0.006659927807383065,
        "offRank": 9,
        "defRank": 15
      },
      {
        "abbr": "DET",
        "off": 0.10430029045002345,
        "def": 0.08901501352077783,
        "offRank": 5,
        "defRank": 30
      },
      {
        "abbr": "GB",
        "off": 0.010543382581496147,
        "def": -0.042647266057958357,
        "offRank": 17,
        "defRank": 7
      },
      {
        "abbr": "MIN",
        "off": -0.07672250330612453,
        "def": -0.14375981648049685,
        "offRank": 29,
        "defRank": 1
      },
      {
        "abbr": "ATL",
        "off": -0.07383919362936851,
        "def": -0.013499224626978907,
        "offRank": 28,
        "defRank": 11
      },
      {
        "abbr": "CAR",
        "off": 0.020510774589760635,
        "def": 0.053121203956559025,
        "offRank": 14,
        "defRank": 23
      },
      {
        "abbr": "NO",
        "off": -0.008689065348124941,
        "def": 0.07323306509282151,
        "offRank": 19,
        "defRank": 26
      },
      {
        "abbr": "TB",
        "off": -0.07259168555155672,
        "def": -0.1244824681894565,
        "offRank": 27,
        "defRank": 2
      },
      {
        "abbr": "ARI",
        "off": -0.016422631534069976,
        "def": 0.07523574443525598,
        "offRank": 20,
        "defRank": 27
      },
      {
        "abbr": "LAR",
        "off": 0.05293066820246441,
        "def": -0.08198395503075298,
        "offRank": 10,
        "defRank": 3
      },
      {
        "abbr": "SF",
        "off": 0.1770629734589716,
        "def": -0.022582591136219594,
        "offRank": 1,
        "defRank": 9
      },
      {
        "abbr": "SEA",
        "off": -0.046809504241878394,
        "def": -0.06128456838482634,
        "offRank": 25,
        "defRank": 5
      }
    ],
    "9": [
      {
        "abbr": "BUF",
        "off": 0.1255571917593925,
        "def": 0.0013127653425949444,
        "offRank": 3,
        "defRank": 13
      },
      {
        "abbr": "MIA",
        "off": -0.04025850882439656,
        "def": 0.08690912835095983,
        "offRank": 24,
        "defRank": 30
      },
      {
        "abbr": "NE",
        "off": 0.06424621317618609,
        "def": 0.050345812115783546,
        "offRank": 8,
        "defRank": 22
      },
      {
        "abbr": "NYJ",
        "off": -0.0050072623057009396,
        "def": 0.04004917003621458,
        "offRank": 19,
        "defRank": 19
      },
      {
        "abbr": "BAL",
        "off": 0.005555557486945601,
        "def": 0.05197720596606006,
        "offRank": 15,
        "defRank": 23
      },
      {
        "abbr": "CIN",
        "off": 0.12554868384369314,
        "def": 0.008228217941289811,
        "offRank": 4,
        "defRank": 17
      },
      {
        "abbr": "CLE",
        "off": -0.04547462123348018,
        "def": 0.001006150127568541,
        "offRank": 25,
        "defRank": 12
      },
      {
        "abbr": "PIT",
        "off": -0.02308740260852582,
        "def": -0.05306210496684584,
        "offRank": 21,
        "defRank": 6
      },
      {
        "abbr": "HOU",
        "off": 0.05342466003000676,
        "def": 0.005585356486939046,
        "offRank": 9,
        "defRank": 16
      },
      {
        "abbr": "IND",
        "off": -0.09307426607416212,
        "def": 0.06252082246037453,
        "offRank": 29,
        "defRank": 25
      },
      {
        "abbr": "JAX",
        "off": 0.14053508513662466,
        "def": -0.10031872474071823,
        "offRank": 2,
        "defRank": 3
      },
      {
        "abbr": "TEN",
        "off": -0.04922968338120497,
        "def": 0.06466327869554198,
        "offRank": 26,
        "defRank": 27
      },
      {
        "abbr": "DEN",
        "off": -0.012002715933608488,
        "def": 0.005391192380449011,
        "offRank": 20,
        "defRank": 15
      },
      {
        "abbr": "KC",
        "off": 0.10823080672288125,
        "def": -0.05076675099759346,
        "offRank": 5,
        "defRank": 7
      },
      {
        "abbr": "LV",
        "off": 0.011990487238410738,
        "def": 0.0918842870112899,
        "offRank": 14,
        "defRank": 32
      },
      {
        "abbr": "LAC",
        "off": -0.19290906805878824,
        "def": 0.0018946854550185037,
        "offRank": 32,
        "defRank": 14
      },
      {
        "abbr": "DAL",
        "off": 0.096866572535859,
        "def": 0.089138910799063,
        "offRank": 6,
        "defRank": 31
      },
      {
        "abbr": "NYG",
        "off": 0.001748177672083239,
        "def": -0.017359533774996952,
        "offRank": 16,
        "defRank": 11
      },
      {
        "abbr": "PHI",
        "off": -0.10624435589807041,
        "def": 0.0667665458739645,
        "offRank": 30,
        "defRank": 28
      },
      {
        "abbr": "WSH",
        "off": -0.004359679107506855,
        "def": 0.042069873355461765,
        "offRank": 17,
        "defRank": 20
      },
      {
        "abbr": "CHI",
        "off": 0.03660257103505241,
        "def": -0.017600180881413217,
        "offRank": 12,
        "defRank": 10
      },
      {
        "abbr": "DET",
        "off": 0.0857040303539661,
        "def": 0.06414016586970439,
        "offRank": 7,
        "defRank": 26
      },
      {
        "abbr": "GB",
        "off": 0.03747470403763234,
        "def": -0.04210986347368548,
        "offRank": 11,
        "defRank": 8
      },
      {
        "abbr": "MIN",
        "off": -0.12776918180927094,
        "def": -0.12624582572978077,
        "offRank": 31,
        "defRank": 1
      },
      {
        "abbr": "ATL",
        "off": -0.05606287042009399,
        "def": 0.009943365856926812,
        "offRank": 27,
        "defRank": 18
      },
      {
        "abbr": "CAR",
        "off": 0.031636314765334725,
        "def": 0.05024472281649575,
        "offRank": 13,
        "defRank": 21
      },
      {
        "abbr": "NO",
        "off": -0.004615707434688619,
        "def": 0.05453535323759003,
        "offRank": 18,
        "defRank": 24
      },
      {
        "abbr": "TB",
        "off": -0.08390376713391245,
        "def": -0.12588204204231226,
        "offRank": 28,
        "defRank": 2
      },
      {
        "abbr": "ARI",
        "off": -0.028767716095393737,
        "def": 0.07502746046467984,
        "offRank": 22,
        "defRank": 29
      },
      {
        "abbr": "LAR",
        "off": 0.051786740246289154,
        "def": -0.08590187758339023,
        "offRank": 10,
        "defRank": 4
      },
      {
        "abbr": "SF",
        "off": 0.17494165286436034,
        "def": -0.025836362642223887,
        "offRank": 1,
        "defRank": 9
      },
      {
        "abbr": "SEA",
        "off": -0.03337277804296703,
        "def": -0.07122280661921476,
        "offRank": 23,
        "defRank": 5
      }
    ],
    "10": [
      {
        "abbr": "BUF",
        "off": 0.1409525563354627,
        "def": -0.0042181312497118675,
        "offRank": 4,
        "defRank": 10
      },
      {
        "abbr": "MIA",
        "off": -0.062087473689556645,
        "def": 0.05341228572072101,
        "offRank": 26,
        "defRank": 25
      },
      {
        "abbr": "NE",
        "off": 0.03452865085014291,
        "def": 0.07112250256293803,
        "offRank": 11,
        "defRank": 28
      },
      {
        "abbr": "NYJ",
        "off": -0.009696492069048521,
        "def": 0.061535741388556775,
        "offRank": 18,
        "defRank": 26
      },
      {
        "abbr": "BAL",
        "off": 0.007953524683925337,
        "def": 0.04691440523801291,
        "offRank": 15,
        "defRank": 23
      },
      {
        "abbr": "CIN",
        "off": 0.15326261672253277,
        "def": 0.009108692776784803,
        "offRank": 2,
        "defRank": 17
      },
      {
        "abbr": "CLE",
        "off": -0.04303494071268725,
        "def": -0.003449987089082575,
        "offRank": 23,
        "defRank": 11
      },
      {
        "abbr": "PIT",
        "off": -0.01902024588321595,
        "def": -0.003320191091966078,
        "offRank": 20,
        "defRank": 12
      },
      {
        "abbr": "HOU",
        "off": 0.042429680248318474,
        "def": 0.002293014197071699,
        "offRank": 9,
        "defRank": 13
      },
      {
        "abbr": "IND",
        "off": -0.10474062105200398,
        "def": 0.0335376277384307,
        "offRank": 30,
        "defRank": 21
      },
      {
        "abbr": "JAX",
        "off": 0.14946422202375778,
        "def": -0.09150944765481467,
        "offRank": 3,
        "defRank": 4
      },
      {
        "abbr": "TEN",
        "off": -0.04590198708350927,
        "def": 0.082019777894379,
        "offRank": 24,
        "defRank": 29
      },
      {
        "abbr": "DEN",
        "off": -0.012002715933608488,
        "def": 0.005391192380449011,
        "offRank": 19,
        "defRank": 16
      },
      {
        "abbr": "KC",
        "off": 0.11704467634758167,
        "def": -0.07136514218244454,
        "offRank": 5,
        "defRank": 6
      },
      {
        "abbr": "LV",
        "off": -0.008157177094214867,
        "def": 0.09352184975711415,
        "offRank": 17,
        "defRank": 31
      },
      {
        "abbr": "LAC",
        "off": -0.17410914624530002,
        "def": 0.004903111740872623,
        "offRank": 32,
        "defRank": 15
      },
      {
        "abbr": "DAL",
        "off": 0.10859393477954048,
        "def": 0.12658107753768,
        "offRank": 6,
        "defRank": 32
      },
      {
        "abbr": "NYG",
        "off": 0.015098163419428774,
        "def": -0.009649873332632872,
        "offRank": 14,
        "defRank": 9
      },
      {
        "abbr": "PHI",
        "off": -0.10624435589807041,
        "def": 0.0667665458739645,
        "offRank": 31,
        "defRank": 27
      },
      {
        "abbr": "WSH",
        "off": 0.001596279612785794,
        "def": 0.05083004086902283,
        "offRank": 16,
        "defRank": 24
      },
      {
        "abbr": "CHI",
        "off": 0.03660257103505241,
        "def": -0.017600180881413217,
        "offRank": 10,
        "defRank": 8
      },
      {
        "abbr": "DET",
        "off": 0.10264176365973468,
        "def": 0.032259166381471735,
        "offRank": 7,
        "defRank": 20
      },
      {
        "abbr": "GB",
        "off": 0.01998833442322759,
        "def": -0.03152942686491525,
        "offRank": 12,
        "defRank": 7
      },
      {
        "abbr": "MIN",
        "off": -0.10369863314071609,
        "def": -0.1317385386932399,
        "offRank": 29,
        "defRank": 1
      },
      {
        "abbr": "ATL",
        "off": -0.07526192274728631,
        "def": 0.027420759217500444,
        "offRank": 27,
        "defRank": 19
      },
      {
        "abbr": "CAR",
        "off": 0.01975954771784711,
        "def": 0.018380260623779798,
        "offRank": 13,
        "defRank": 18
      },
      {
        "abbr": "NO",
        "off": -0.030776067906922798,
        "def": 0.04003850145176353,
        "offRank": 22,
        "defRank": 22
      },
      {
        "abbr": "TB",
        "off": -0.08390376713391245,
        "def": -0.12588204204231226,
        "offRank": 28,
        "defRank": 2
      },
      {
        "abbr": "ARI",
        "off": -0.056276302271107005,
        "def": 0.09013845693240119,
        "offRank": 25,
        "defRank": 30
      },
      {
        "abbr": "LAR",
        "off": 0.0678033944915609,
        "def": -0.11320184394313222,
        "offRank": 8,
        "defRank": 3
      },
      {
        "abbr": "SF",
        "off": 0.20963984055597698,
        "def": 0.00468302064245205,
        "offRank": 1,
        "defRank": 14
      },
      {
        "abbr": "SEA",
        "off": -0.020829604600570064,
        "def": -0.0848251980238126,
        "offRank": 21,
        "defRank": 5
      }
    ]
  }
};
