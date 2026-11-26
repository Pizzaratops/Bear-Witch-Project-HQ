// ============================================================
//  NFL_STANDINGS / NFL_OFFDEF — automatisch synchronisiert (nflverse)
// ============================================================
//  AUTO-GENERIERT von scripts/sync-espn-nfl-standings.js über die
//  GitHub Action ".github/workflows/sync-espn-nfl-standings.yml".
//  Nicht von Hand editieren — Änderungen werden beim nächsten Sync
//  überschrieben.
//  Zuletzt synchronisiert: 2026-11-26T17:25:58.861Z
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
    ],
    "11": [
      {
        "name": "Buffalo Bills",
        "abbr": "BUF",
        "conference": "AFC",
        "division": "East",
        "wins": 9,
        "losses": 1,
        "ties": 0,
        "winPct": 0.9,
        "pf": 313,
        "pa": 208
      },
      {
        "name": "Miami Dolphins",
        "abbr": "MIA",
        "conference": "AFC",
        "division": "East",
        "wins": 1,
        "losses": 9,
        "ties": 0,
        "winPct": 0.1,
        "pf": 157,
        "pa": 250
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
        "wins": 3,
        "losses": 8,
        "ties": 0,
        "winPct": 0.2727272727272727,
        "pf": 221,
        "pa": 278
      },
      {
        "name": "Baltimore Ravens",
        "abbr": "BAL",
        "conference": "AFC",
        "division": "North",
        "wins": 4,
        "losses": 7,
        "ties": 0,
        "winPct": 0.36363636363636365,
        "pf": 242,
        "pa": 294
      },
      {
        "name": "Cincinnati Bengals",
        "abbr": "CIN",
        "conference": "AFC",
        "division": "North",
        "wins": 7,
        "losses": 3,
        "ties": 0,
        "winPct": 0.7,
        "pf": 298,
        "pa": 215
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
        "losses": 4,
        "ties": 0,
        "winPct": 0.6,
        "pf": 214,
        "pa": 201
      },
      {
        "name": "Houston Texans",
        "abbr": "HOU",
        "conference": "AFC",
        "division": "South",
        "wins": 4,
        "losses": 6,
        "ties": 0,
        "winPct": 0.4,
        "pf": 259,
        "pa": 222
      },
      {
        "name": "Indianapolis Colts",
        "abbr": "IND",
        "conference": "AFC",
        "division": "South",
        "wins": 3,
        "losses": 8,
        "ties": 0,
        "winPct": 0.2727272727272727,
        "pf": 211,
        "pa": 297
      },
      {
        "name": "Jacksonville Jaguars",
        "abbr": "JAX",
        "conference": "AFC",
        "division": "South",
        "wins": 7,
        "losses": 3,
        "ties": 0,
        "winPct": 0.7,
        "pf": 287,
        "pa": 167
      },
      {
        "name": "Tennessee Titans",
        "abbr": "TEN",
        "conference": "AFC",
        "division": "South",
        "wins": 1,
        "losses": 9,
        "ties": 0,
        "winPct": 0.1,
        "pf": 197,
        "pa": 290
      },
      {
        "name": "Denver Broncos",
        "abbr": "DEN",
        "conference": "AFC",
        "division": "West",
        "wins": 8,
        "losses": 2,
        "ties": 0,
        "winPct": 0.8,
        "pf": 236,
        "pa": 210
      },
      {
        "name": "Kansas City Chiefs",
        "abbr": "KC",
        "conference": "AFC",
        "division": "West",
        "wins": 8,
        "losses": 2,
        "ties": 0,
        "winPct": 0.8,
        "pf": 271,
        "pa": 163
      },
      {
        "name": "Las Vegas Raiders",
        "abbr": "LV",
        "conference": "AFC",
        "division": "West",
        "wins": 4,
        "losses": 7,
        "ties": 0,
        "winPct": 0.36363636363636365,
        "pf": 275,
        "pa": 327
      },
      {
        "name": "Los Angeles Chargers",
        "abbr": "LAC",
        "conference": "AFC",
        "division": "West",
        "wins": 1,
        "losses": 9,
        "ties": 0,
        "winPct": 0.1,
        "pf": 168,
        "pa": 266
      },
      {
        "name": "Dallas Cowboys",
        "abbr": "DAL",
        "conference": "NFC",
        "division": "East",
        "wins": 5,
        "losses": 6,
        "ties": 0,
        "winPct": 0.45454545454545453,
        "pf": 337,
        "pa": 312
      },
      {
        "name": "New York Giants",
        "abbr": "NYG",
        "conference": "NFC",
        "division": "East",
        "wins": 6,
        "losses": 3,
        "ties": 1,
        "winPct": 0.65,
        "pf": 226,
        "pa": 214
      },
      {
        "name": "Philadelphia Eagles",
        "abbr": "PHI",
        "conference": "NFC",
        "division": "East",
        "wins": 3,
        "losses": 7,
        "ties": 0,
        "winPct": 0.3,
        "pf": 167,
        "pa": 237
      },
      {
        "name": "Washington Commanders",
        "abbr": "WSH",
        "conference": "NFC",
        "division": "East",
        "wins": 4,
        "losses": 5,
        "ties": 1,
        "winPct": 0.45,
        "pf": 218,
        "pa": 243
      },
      {
        "name": "Chicago Bears",
        "abbr": "CHI",
        "conference": "NFC",
        "division": "North",
        "wins": 8,
        "losses": 2,
        "ties": 0,
        "winPct": 0.8,
        "pf": 262,
        "pa": 197
      },
      {
        "name": "Detroit Lions",
        "abbr": "DET",
        "conference": "NFC",
        "division": "North",
        "wins": 8,
        "losses": 2,
        "ties": 0,
        "winPct": 0.8,
        "pf": 288,
        "pa": 220
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
        "losses": 3,
        "ties": 0,
        "winPct": 0.7,
        "pf": 186,
        "pa": 161
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
        "wins": 5,
        "losses": 5,
        "ties": 0,
        "winPct": 0.5,
        "pf": 254,
        "pa": 269
      },
      {
        "name": "New Orleans Saints",
        "abbr": "NO",
        "conference": "NFC",
        "division": "South",
        "wins": 3,
        "losses": 7,
        "ties": 0,
        "winPct": 0.3,
        "pf": 215,
        "pa": 257
      },
      {
        "name": "Tampa Bay Buccaneers",
        "abbr": "TB",
        "conference": "NFC",
        "division": "South",
        "wins": 3,
        "losses": 7,
        "ties": 0,
        "winPct": 0.3,
        "pf": 223,
        "pa": 209
      },
      {
        "name": "Arizona Cardinals",
        "abbr": "ARI",
        "conference": "NFC",
        "division": "West",
        "wins": 3,
        "losses": 8,
        "ties": 0,
        "winPct": 0.2727272727272727,
        "pf": 191,
        "pa": 323
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
        "wins": 9,
        "losses": 1,
        "ties": 0,
        "winPct": 0.9,
        "pf": 316,
        "pa": 206
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
    ],
    "12": [
      {
        "name": "Buffalo Bills",
        "abbr": "BUF",
        "conference": "AFC",
        "division": "East",
        "wins": 9,
        "losses": 1,
        "ties": 0,
        "winPct": 0.9,
        "pf": 313,
        "pa": 208
      },
      {
        "name": "Miami Dolphins",
        "abbr": "MIA",
        "conference": "AFC",
        "division": "East",
        "wins": 1,
        "losses": 9,
        "ties": 0,
        "winPct": 0.1,
        "pf": 157,
        "pa": 250
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
        "wins": 3,
        "losses": 8,
        "ties": 0,
        "winPct": 0.2727272727272727,
        "pf": 221,
        "pa": 278
      },
      {
        "name": "Baltimore Ravens",
        "abbr": "BAL",
        "conference": "AFC",
        "division": "North",
        "wins": 4,
        "losses": 7,
        "ties": 0,
        "winPct": 0.36363636363636365,
        "pf": 242,
        "pa": 294
      },
      {
        "name": "Cincinnati Bengals",
        "abbr": "CIN",
        "conference": "AFC",
        "division": "North",
        "wins": 7,
        "losses": 3,
        "ties": 0,
        "winPct": 0.7,
        "pf": 298,
        "pa": 215
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
        "losses": 4,
        "ties": 0,
        "winPct": 0.6,
        "pf": 214,
        "pa": 201
      },
      {
        "name": "Houston Texans",
        "abbr": "HOU",
        "conference": "AFC",
        "division": "South",
        "wins": 4,
        "losses": 6,
        "ties": 0,
        "winPct": 0.4,
        "pf": 259,
        "pa": 222
      },
      {
        "name": "Indianapolis Colts",
        "abbr": "IND",
        "conference": "AFC",
        "division": "South",
        "wins": 3,
        "losses": 8,
        "ties": 0,
        "winPct": 0.2727272727272727,
        "pf": 211,
        "pa": 297
      },
      {
        "name": "Jacksonville Jaguars",
        "abbr": "JAX",
        "conference": "AFC",
        "division": "South",
        "wins": 7,
        "losses": 3,
        "ties": 0,
        "winPct": 0.7,
        "pf": 287,
        "pa": 167
      },
      {
        "name": "Tennessee Titans",
        "abbr": "TEN",
        "conference": "AFC",
        "division": "South",
        "wins": 1,
        "losses": 9,
        "ties": 0,
        "winPct": 0.1,
        "pf": 197,
        "pa": 290
      },
      {
        "name": "Denver Broncos",
        "abbr": "DEN",
        "conference": "AFC",
        "division": "West",
        "wins": 8,
        "losses": 2,
        "ties": 0,
        "winPct": 0.8,
        "pf": 236,
        "pa": 210
      },
      {
        "name": "Kansas City Chiefs",
        "abbr": "KC",
        "conference": "AFC",
        "division": "West",
        "wins": 8,
        "losses": 2,
        "ties": 0,
        "winPct": 0.8,
        "pf": 271,
        "pa": 163
      },
      {
        "name": "Las Vegas Raiders",
        "abbr": "LV",
        "conference": "AFC",
        "division": "West",
        "wins": 4,
        "losses": 7,
        "ties": 0,
        "winPct": 0.36363636363636365,
        "pf": 275,
        "pa": 327
      },
      {
        "name": "Los Angeles Chargers",
        "abbr": "LAC",
        "conference": "AFC",
        "division": "West",
        "wins": 1,
        "losses": 9,
        "ties": 0,
        "winPct": 0.1,
        "pf": 168,
        "pa": 266
      },
      {
        "name": "Dallas Cowboys",
        "abbr": "DAL",
        "conference": "NFC",
        "division": "East",
        "wins": 5,
        "losses": 6,
        "ties": 0,
        "winPct": 0.45454545454545453,
        "pf": 337,
        "pa": 312
      },
      {
        "name": "New York Giants",
        "abbr": "NYG",
        "conference": "NFC",
        "division": "East",
        "wins": 6,
        "losses": 3,
        "ties": 1,
        "winPct": 0.65,
        "pf": 226,
        "pa": 214
      },
      {
        "name": "Philadelphia Eagles",
        "abbr": "PHI",
        "conference": "NFC",
        "division": "East",
        "wins": 3,
        "losses": 7,
        "ties": 0,
        "winPct": 0.3,
        "pf": 167,
        "pa": 237
      },
      {
        "name": "Washington Commanders",
        "abbr": "WSH",
        "conference": "NFC",
        "division": "East",
        "wins": 4,
        "losses": 5,
        "ties": 1,
        "winPct": 0.45,
        "pf": 218,
        "pa": 243
      },
      {
        "name": "Chicago Bears",
        "abbr": "CHI",
        "conference": "NFC",
        "division": "North",
        "wins": 8,
        "losses": 2,
        "ties": 0,
        "winPct": 0.8,
        "pf": 262,
        "pa": 197
      },
      {
        "name": "Detroit Lions",
        "abbr": "DET",
        "conference": "NFC",
        "division": "North",
        "wins": 8,
        "losses": 2,
        "ties": 0,
        "winPct": 0.8,
        "pf": 288,
        "pa": 220
      },
      {
        "name": "Green Bay Packers",
        "abbr": "GB",
        "conference": "NFC",
        "division": "North",
        "wins": 6,
        "losses": 5,
        "ties": 0,
        "winPct": 0.5454545454545454,
        "pf": 239,
        "pa": 247
      },
      {
        "name": "Minnesota Vikings",
        "abbr": "MIN",
        "conference": "NFC",
        "division": "North",
        "wins": 7,
        "losses": 3,
        "ties": 0,
        "winPct": 0.7,
        "pf": 186,
        "pa": 161
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
        "wins": 5,
        "losses": 5,
        "ties": 0,
        "winPct": 0.5,
        "pf": 254,
        "pa": 269
      },
      {
        "name": "New Orleans Saints",
        "abbr": "NO",
        "conference": "NFC",
        "division": "South",
        "wins": 3,
        "losses": 7,
        "ties": 0,
        "winPct": 0.3,
        "pf": 215,
        "pa": 257
      },
      {
        "name": "Tampa Bay Buccaneers",
        "abbr": "TB",
        "conference": "NFC",
        "division": "South",
        "wins": 3,
        "losses": 7,
        "ties": 0,
        "winPct": 0.3,
        "pf": 223,
        "pa": 209
      },
      {
        "name": "Arizona Cardinals",
        "abbr": "ARI",
        "conference": "NFC",
        "division": "West",
        "wins": 3,
        "losses": 8,
        "ties": 0,
        "winPct": 0.2727272727272727,
        "pf": 191,
        "pa": 323
      },
      {
        "name": "Los Angeles Rams",
        "abbr": "LAR",
        "conference": "NFC",
        "division": "West",
        "wins": 7,
        "losses": 4,
        "ties": 0,
        "winPct": 0.6363636363636364,
        "pf": 274,
        "pa": 200
      },
      {
        "name": "San Francisco 49ers",
        "abbr": "SF",
        "conference": "NFC",
        "division": "West",
        "wins": 9,
        "losses": 1,
        "ties": 0,
        "winPct": 0.9,
        "pf": 316,
        "pa": 206
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
        "off": 0.1861969456864954,
        "def": 0.07213703525920485,
        "offRank": 6,
        "defRank": 19
      },
      {
        "abbr": "MIA",
        "off": -0.10547012225242378,
        "def": -0.032921224138647315,
        "offRank": 26,
        "defRank": 13
      },
      {
        "abbr": "NE",
        "off": -0.09605312669165063,
        "def": 0.03777926740730063,
        "offRank": 24,
        "defRank": 17
      },
      {
        "abbr": "NYJ",
        "off": 0.11504495211901732,
        "def": -0.10016516317879716,
        "offRank": 9,
        "defRank": 8
      },
      {
        "abbr": "BAL",
        "off": 0.26284340498547515,
        "def": -0.08633004016155686,
        "offRank": 3,
        "defRank": 10
      },
      {
        "abbr": "CIN",
        "off": -0.030618321580433986,
        "def": -0.11336819284564749,
        "offRank": 19,
        "defRank": 6
      },
      {
        "abbr": "CLE",
        "off": -0.07793804265997659,
        "def": 0.25538203204429055,
        "offRank": 21,
        "defRank": 29
      },
      {
        "abbr": "PIT",
        "off": -0.2045174435447016,
        "def": -0.2821815493139366,
        "offRank": 30,
        "defRank": 2
      },
      {
        "abbr": "HOU",
        "off": 0.07213703525920485,
        "def": 0.1861969456864954,
        "offRank": 14,
        "defRank": 27
      },
      {
        "abbr": "IND",
        "off": -0.08633004016155686,
        "def": 0.26284340498547515,
        "offRank": 23,
        "defRank": 30
      },
      {
        "abbr": "JAX",
        "off": 0.25538203204429055,
        "def": -0.07793804265997659,
        "offRank": 4,
        "defRank": 12
      },
      {
        "abbr": "TEN",
        "off": -0.10016516317879716,
        "def": 0.11504495211901732,
        "offRank": 25,
        "defRank": 24
      },
      {
        "abbr": "DEN",
        "off": -0.30215686648883167,
        "def": 0.0886340402380323,
        "offRank": 32,
        "defRank": 21
      },
      {
        "abbr": "KC",
        "off": 0.0886340402380323,
        "def": -0.30215686648883167,
        "offRank": 12,
        "defRank": 1
      },
      {
        "abbr": "LV",
        "off": -0.032921224138647315,
        "def": -0.10547012225242378,
        "offRank": 20,
        "defRank": 7
      },
      {
        "abbr": "LAC",
        "off": -0.16045571285900165,
        "def": 0.09974316112479681,
        "offRank": 29,
        "defRank": 23
      },
      {
        "abbr": "DAL",
        "off": 0.1792281620141916,
        "def": 0.2654794036858223,
        "offRank": 7,
        "defRank": 31
      },
      {
        "abbr": "NYG",
        "off": 0.2654794036858223,
        "def": 0.1792281620141916,
        "offRank": 2,
        "defRank": 26
      },
      {
        "abbr": "PHI",
        "off": 0.0802678718355422,
        "def": 0.065741062252447,
        "offRank": 13,
        "defRank": 18
      },
      {
        "abbr": "WSH",
        "off": 0.065741062252447,
        "def": 0.0802678718355422,
        "offRank": 15,
        "defRank": 20
      },
      {
        "abbr": "CHI",
        "off": 0.4306675573969206,
        "def": 0.2242434398647598,
        "offRank": 1,
        "defRank": 28
      },
      {
        "abbr": "DET",
        "off": 0.09365410625105224,
        "def": 0.004256995159416777,
        "offRank": 11,
        "defRank": 15
      },
      {
        "abbr": "GB",
        "off": -0.12263178492244302,
        "def": 0.030572769982783934,
        "offRank": 28,
        "defRank": 16
      },
      {
        "abbr": "MIN",
        "off": 0.030572769982783934,
        "def": -0.12263178492244302,
        "offRank": 17,
        "defRank": 5
      },
      {
        "abbr": "ATL",
        "off": -0.2821815493139366,
        "def": -0.2045174435447016,
        "offRank": 31,
        "defRank": 3
      },
      {
        "abbr": "CAR",
        "off": 0.2242434398647598,
        "def": 0.4306675573969206,
        "offRank": 5,
        "defRank": 32
      },
      {
        "abbr": "NO",
        "off": 0.004256995159416777,
        "def": 0.09365410625105224,
        "offRank": 18,
        "defRank": 22
      },
      {
        "abbr": "TB",
        "off": -0.11336819284564749,
        "def": -0.030618321580433986,
        "offRank": 27,
        "defRank": 14
      },
      {
        "abbr": "ARI",
        "off": 0.09974316112479681,
        "def": -0.16045571285900165,
        "offRank": 10,
        "defRank": 4
      },
      {
        "abbr": "LAR",
        "off": -0.0848085564982935,
        "def": 0.16302898668275734,
        "offRank": 22,
        "defRank": 25
      },
      {
        "abbr": "SF",
        "off": 0.16302898668275734,
        "def": -0.0848085564982935,
        "offRank": 8,
        "defRank": 11
      },
      {
        "abbr": "SEA",
        "off": 0.03777926740730063,
        "def": -0.09605312669165063,
        "offRank": 16,
        "defRank": 9
      }
    ],
    "2": [
      {
        "abbr": "BUF",
        "off": 0.25779503863122616,
        "def": 0.139951121015246,
        "offRank": 2,
        "defRank": 27
      },
      {
        "abbr": "MIA",
        "off": -0.04371503017291547,
        "def": 0.14219941087370924,
        "offRank": 24,
        "defRank": 28
      },
      {
        "abbr": "NE",
        "off": -0.06329540649703166,
        "def": -0.157586569602548,
        "offRank": 25,
        "defRank": 2
      },
      {
        "abbr": "NYJ",
        "off": 0.021184061232432227,
        "def": -0.1331302684257074,
        "offRank": 16,
        "defRank": 6
      },
      {
        "abbr": "BAL",
        "off": 0.1910365688849108,
        "def": 0.037387438107939604,
        "offRank": 3,
        "defRank": 18
      },
      {
        "abbr": "CIN",
        "off": -0.04123823311282323,
        "def": -0.16459538318017164,
        "offRank": 23,
        "defRank": 1
      },
      {
        "abbr": "CLE",
        "off": -0.0324139307063766,
        "def": 0.06854185970689167,
        "offRank": 21,
        "defRank": 21
      },
      {
        "abbr": "PIT",
        "off": -0.2527589110974805,
        "def": -0.15557182860227778,
        "offRank": 31,
        "defRank": 3
      },
      {
        "abbr": "HOU",
        "off": -0.06659285432809388,
        "def": 0.06177450174254021,
        "offRank": 26,
        "defRank": 20
      },
      {
        "abbr": "IND",
        "off": 0.03028648909439886,
        "def": 0.2190573840397485,
        "offRank": 15,
        "defRank": 32
      },
      {
        "abbr": "JAX",
        "off": 0.11839014900162909,
        "def": -0.0106560306654299,
        "offRank": 9,
        "defRank": 14
      },
      {
        "abbr": "TEN",
        "off": 0.0019309585557745809,
        "def": 0.08857672168940257,
        "offRank": 18,
        "defRank": 24
      },
      {
        "abbr": "DEN",
        "off": -0.10452002490705953,
        "def": 0.03814692326450898,
        "offRank": 27,
        "defRank": 19
      },
      {
        "abbr": "KC",
        "off": 0.13967971988551722,
        "def": -0.048464655226593316,
        "offRank": 8,
        "defRank": 10
      },
      {
        "abbr": "LV",
        "off": -0.03841343826782031,
        "def": -0.1480948302710259,
        "offRank": 22,
        "defRank": 5
      },
      {
        "abbr": "LAC",
        "off": -0.17156617816878225,
        "def": 0.03477369514474732,
        "offRank": 30,
        "defRank": 17
      },
      {
        "abbr": "DAL",
        "off": 0.1862077803093633,
        "def": 0.18200657686181376,
        "offRank": 4,
        "defRank": 30
      },
      {
        "abbr": "NYG",
        "off": 0.007488507670565794,
        "def": 0.18857963689909343,
        "offRank": 17,
        "defRank": 31
      },
      {
        "abbr": "PHI",
        "off": 0.07107301572504336,
        "def": 0.07939085806682396,
        "offRank": 12,
        "defRank": 22
      },
      {
        "abbr": "WSH",
        "off": 0.08288830216555233,
        "def": 0.13783468940404833,
        "offRank": 11,
        "defRank": 26
      },
      {
        "abbr": "CHI",
        "off": 0.1619001148816382,
        "def": 0.08749712028702702,
        "offRank": 6,
        "defRank": 23
      },
      {
        "abbr": "DET",
        "off": 0.1508249743990993,
        "def": 0.1432228975908206,
        "offRank": 7,
        "defRank": 29
      },
      {
        "abbr": "GB",
        "off": -0.14090290824981846,
        "def": -0.021424597643238105,
        "offRank": 29,
        "defRank": 12
      },
      {
        "abbr": "MIN",
        "off": -0.02105374284797361,
        "def": -0.11873318572841078,
        "offRank": 19,
        "defRank": 7
      },
      {
        "abbr": "ATL",
        "off": -0.3439588475460609,
        "def": -0.05482335541762909,
        "offRank": 32,
        "defRank": 8
      },
      {
        "abbr": "CAR",
        "off": 0.16572784103001356,
        "def": 0.030286597376819085,
        "offRank": 5,
        "defRank": 16
      },
      {
        "abbr": "NO",
        "off": 0.06292282904395348,
        "def": 0.09932807970192833,
        "offRank": 13,
        "defRank": 25
      },
      {
        "abbr": "TB",
        "off": -0.10910199077048047,
        "def": -0.014027942082317108,
        "offRank": 28,
        "defRank": 13
      },
      {
        "abbr": "ARI",
        "off": -0.031921327188215394,
        "def": 0.01041124495007956,
        "offRank": 20,
        "defRank": 15
      },
      {
        "abbr": "LAR",
        "off": 0.05843437543671276,
        "def": -0.05296284686128608,
        "offRank": 14,
        "defRank": 9
      },
      {
        "abbr": "SF",
        "off": 0.25782928164899216,
        "def": -0.03970908390657303,
        "offRank": 1,
        "defRank": 11
      },
      {
        "abbr": "SEA",
        "off": 0.09488037894890158,
        "def": -0.15533980277026788,
        "offRank": 10,
        "defRank": 4
      }
    ],
    "3": [
      {
        "abbr": "BUF",
        "off": 0.1851988684319975,
        "def": 0.07116876768953716,
        "offRank": 2,
        "defRank": 22
      },
      {
        "abbr": "MIA",
        "off": -0.07716149565531512,
        "def": 0.1377420995966385,
        "offRank": 25,
        "defRank": 30
      },
      {
        "abbr": "NE",
        "off": -0.12173371722774734,
        "def": -0.031545427356305125,
        "offRank": 29,
        "defRank": 10
      },
      {
        "abbr": "NYJ",
        "off": 0.046558989109181714,
        "def": -0.01824542725033271,
        "offRank": 12,
        "defRank": 11
      },
      {
        "abbr": "BAL",
        "off": 0.1736643970914772,
        "def": 0.08708293638779158,
        "offRank": 4,
        "defRank": 25
      },
      {
        "abbr": "CIN",
        "off": 0.05440270412377577,
        "def": -0.07106713028373221,
        "offRank": 11,
        "defRank": 7
      },
      {
        "abbr": "CLE",
        "off": -0.026482015988333923,
        "def": -0.0021555644253625963,
        "offRank": 20,
        "defRank": 13
      },
      {
        "abbr": "PIT",
        "off": -0.13316067835160542,
        "def": -0.012262031011275053,
        "offRank": 30,
        "defRank": 12
      },
      {
        "abbr": "HOU",
        "off": -0.06328683459973071,
        "def": 0.0025091221844992977,
        "offRank": 24,
        "defRank": 14
      },
      {
        "abbr": "IND",
        "off": -0.014048776413885812,
        "def": 0.14875385901926083,
        "offRank": 19,
        "defRank": 31
      },
      {
        "abbr": "JAX",
        "off": 0.14768527175445753,
        "def": -0.09186475289889041,
        "offRank": 6,
        "defRank": 3
      },
      {
        "abbr": "TEN",
        "off": -0.038041633188505376,
        "def": 0.02956926401862141,
        "offRank": 22,
        "defRank": 17
      },
      {
        "abbr": "DEN",
        "off": -0.062424892728284935,
        "def": 0.032993630773867015,
        "offRank": 23,
        "defRank": 19
      },
      {
        "abbr": "KC",
        "off": 0.13645871197870005,
        "def": -0.07833168100992931,
        "offRank": 7,
        "defRank": 5
      },
      {
        "abbr": "LV",
        "off": -0.002537594789201505,
        "def": -0.08481859960265663,
        "offRank": 18,
        "defRank": 4
      },
      {
        "abbr": "LAC",
        "off": -0.1346109981834268,
        "def": 0.03680206381835374,
        "offRank": 31,
        "defRank": 20
      },
      {
        "abbr": "DAL",
        "off": 0.1783178764750725,
        "def": 0.1690136649093301,
        "offRank": 3,
        "defRank": 32
      },
      {
        "abbr": "NYG",
        "off": -0.030296221142078198,
        "def": 0.08908672850207124,
        "offRank": 21,
        "defRank": 26
      },
      {
        "abbr": "PHI",
        "off": 0.010364875614563297,
        "def": 0.061569712394204924,
        "offRank": 17,
        "defRank": 21
      },
      {
        "abbr": "WSH",
        "off": 0.03685946047426771,
        "def": 0.08120182746506441,
        "offRank": 15,
        "defRank": 23
      },
      {
        "abbr": "CHI",
        "off": 0.11770193988664271,
        "def": 0.017593723663445353,
        "offRank": 8,
        "defRank": 16
      },
      {
        "abbr": "DET",
        "off": 0.15187666881079234,
        "def": 0.13298239110495005,
        "offRank": 5,
        "defRank": 29
      },
      {
        "abbr": "GB",
        "off": -0.0862305654827714,
        "def": 0.08635096728236168,
        "offRank": 27,
        "defRank": 24
      },
      {
        "abbr": "MIN",
        "off": -0.08281484645015945,
        "def": -0.1464412454935637,
        "offRank": 26,
        "defRank": 1
      },
      {
        "abbr": "ATL",
        "off": -0.11455901716736436,
        "def": -0.03247879123995682,
        "offRank": 28,
        "defRank": 8
      },
      {
        "abbr": "CAR",
        "off": 0.06001763923949137,
        "def": 0.015325510912445021,
        "offRank": 9,
        "defRank": 15
      },
      {
        "abbr": "NO",
        "off": 0.04518145161115959,
        "def": 0.09053099843360163,
        "offRank": 13,
        "defRank": 27
      },
      {
        "abbr": "TB",
        "off": -0.14388996945922927,
        "def": -0.07464827746530812,
        "offRank": 32,
        "defRank": 6
      },
      {
        "abbr": "ARI",
        "off": 0.03293379907383556,
        "def": 0.12713337761580024,
        "offRank": 16,
        "defRank": 28
      },
      {
        "abbr": "LAR",
        "off": 0.04507114555218842,
        "def": -0.03173874017900156,
        "offRank": 14,
        "defRank": 9
      },
      {
        "abbr": "SF",
        "off": 0.29937239773630847,
        "def": 0.030833375677736485,
        "offRank": 1,
        "defRank": 18
      },
      {
        "abbr": "SEA",
        "off": 0.05708504251286783,
        "def": -0.12053330486640226,
        "offRank": 10,
        "defRank": 2
      }
    ],
    "4": [
      {
        "abbr": "BUF",
        "off": 0.17128942569891048,
        "def": 0.09276826555139095,
        "offRank": 2,
        "defRank": 29
      },
      {
        "abbr": "MIA",
        "off": -0.09329555980229859,
        "def": 0.07076353172349546,
        "offRank": 30,
        "defRank": 27
      },
      {
        "abbr": "NE",
        "off": -0.041289077911491466,
        "def": 0.006021021923799456,
        "offRank": 24,
        "defRank": 12
      },
      {
        "abbr": "NYJ",
        "off": 0.023408634550456678,
        "def": -0.006791999541936298,
        "offRank": 12,
        "defRank": 10
      },
      {
        "abbr": "BAL",
        "off": 0.16174519520550731,
        "def": 0.05607917320786626,
        "offRank": 3,
        "defRank": 25
      },
      {
        "abbr": "CIN",
        "off": 0.046736057492637824,
        "def": -0.014561837658443572,
        "offRank": 10,
        "defRank": 9
      },
      {
        "abbr": "CLE",
        "off": 0.00420307842120798,
        "def": 0.016036302466953603,
        "offRank": 16,
        "defRank": 16
      },
      {
        "abbr": "PIT",
        "off": -0.08267056530856194,
        "def": 0.01450930606513138,
        "offRank": 28,
        "defRank": 15
      },
      {
        "abbr": "HOU",
        "off": -0.010635127272998002,
        "def": 0.034954550937782644,
        "offRank": 18,
        "defRank": 17
      },
      {
        "abbr": "IND",
        "off": -0.021772557270133355,
        "def": 0.06268454567240754,
        "offRank": 20,
        "defRank": 26
      },
      {
        "abbr": "JAX",
        "off": 0.156911501751147,
        "def": -0.05582781253604823,
        "offRank": 5,
        "defRank": 4
      },
      {
        "abbr": "TEN",
        "off": -0.03937081469163084,
        "def": 0.052887792529814404,
        "offRank": 23,
        "defRank": 23
      },
      {
        "abbr": "DEN",
        "off": -0.02589248378932438,
        "def": 0.05216569583207808,
        "offRank": 22,
        "defRank": 22
      },
      {
        "abbr": "KC",
        "off": 0.13706600153871573,
        "def": -0.036533885532871194,
        "offRank": 7,
        "defRank": 6
      },
      {
        "abbr": "LV",
        "off": 0.014874222471349136,
        "def": -0.03029284881865736,
        "offRank": 15,
        "defRank": 8
      },
      {
        "abbr": "LAC",
        "off": -0.12019951566160104,
        "def": 0.006284853338930674,
        "offRank": 32,
        "defRank": 13
      },
      {
        "abbr": "DAL",
        "off": 0.15992744831606084,
        "def": 0.17368871967122332,
        "offRank": 4,
        "defRank": 32
      },
      {
        "abbr": "NYG",
        "off": -0.04269658894544726,
        "def": 0.010952253451921088,
        "offRank": 25,
        "defRank": 14
      },
      {
        "abbr": "PHI",
        "off": -0.05205032641399656,
        "def": 0.05024937518945383,
        "offRank": 26,
        "defRank": 21
      },
      {
        "abbr": "WSH",
        "off": -0.019945293470141956,
        "def": 0.04646980590839718,
        "offRank": 19,
        "defRank": 20
      },
      {
        "abbr": "CHI",
        "off": 0.08615491110687121,
        "def": -0.0052660779121494455,
        "offRank": 9,
        "defRank": 11
      },
      {
        "abbr": "DET",
        "off": 0.1472049995184989,
        "def": 0.15031968725383102,
        "offRank": 6,
        "defRank": 30
      },
      {
        "abbr": "GB",
        "off": -0.061721792775902035,
        "def": 0.05595688305049789,
        "offRank": 27,
        "defRank": 24
      },
      {
        "abbr": "MIN",
        "off": -0.08550570478316859,
        "def": -0.1499812793715412,
        "offRank": 29,
        "defRank": 1
      },
      {
        "abbr": "ATL",
        "off": -0.006549836021417092,
        "def": -0.03636708916753651,
        "offRank": 17,
        "defRank": 7
      },
      {
        "abbr": "CAR",
        "off": 0.09787674670988344,
        "def": 0.0458599925758499,
        "offRank": 8,
        "defRank": 19
      },
      {
        "abbr": "NO",
        "off": 0.023061657865668043,
        "def": 0.1506403078281113,
        "offRank": 13,
        "defRank": 31
      },
      {
        "abbr": "TB",
        "off": -0.11808076195677938,
        "def": -0.052456991143241156,
        "offRank": 31,
        "defRank": 5
      },
      {
        "abbr": "ARI",
        "off": -0.023579740345547284,
        "def": 0.0735678930376223,
        "offRank": 21,
        "defRank": 28
      },
      {
        "abbr": "LAR",
        "off": 0.038814121132773494,
        "def": -0.08101230013279957,
        "offRank": 11,
        "defRank": 3
      },
      {
        "abbr": "SF",
        "off": 0.24537805180488037,
        "def": 0.03976695834948551,
        "offRank": 1,
        "defRank": 18
      },
      {
        "abbr": "SEA",
        "off": 0.02015324175659908,
        "def": -0.1101226986998945,
        "offRank": 14,
        "defRank": 2
      }
    ],
    "5": [
      {
        "abbr": "BUF",
        "off": 0.19423445241717835,
        "def": 0.12005792958689437,
        "offRank": 1,
        "defRank": 28
      },
      {
        "abbr": "MIA",
        "off": -0.0776745594943759,
        "def": 0.09309755125390018,
        "offRank": 30,
        "defRank": 27
      },
      {
        "abbr": "NE",
        "off": 0.04086117955271426,
        "def": 0.016756787911715088,
        "offRank": 11,
        "defRank": 17
      },
      {
        "abbr": "NYJ",
        "off": -0.014339155613513318,
        "def": -0.0580098902275067,
        "offRank": 19,
        "defRank": 4
      },
      {
        "abbr": "BAL",
        "off": 0.1576931012552,
        "def": 0.03593318180116879,
        "offRank": 4,
        "defRank": 20
      },
      {
        "abbr": "CIN",
        "off": 0.07354992104888806,
        "def": -0.017118034109185856,
        "offRank": 10,
        "defRank": 10
      },
      {
        "abbr": "CLE",
        "off": -0.053949963940866,
        "def": -0.01676370105071459,
        "offRank": 24,
        "defRank": 11
      },
      {
        "abbr": "PIT",
        "off": -0.03269839503455009,
        "def": 0.005594821042071364,
        "offRank": 23,
        "defRank": 16
      },
      {
        "abbr": "HOU",
        "off": 0.004815076531011298,
        "def": -0.03422994218974828,
        "offRank": 14,
        "defRank": 8
      },
      {
        "abbr": "IND",
        "off": -0.022035739410060394,
        "def": 0.08613420063404546,
        "offRank": 22,
        "defRank": 26
      },
      {
        "abbr": "JAX",
        "off": 0.13736145588872323,
        "def": -0.07488253380081634,
        "offRank": 5,
        "defRank": 3
      },
      {
        "abbr": "TEN",
        "off": -0.10171247145449508,
        "def": 0.055514872805525355,
        "offRank": 31,
        "defRank": 25
      },
      {
        "abbr": "DEN",
        "off": -0.05649868832086515,
        "def": 0.0021514234925081475,
        "offRank": 25,
        "defRank": 15
      },
      {
        "abbr": "KC",
        "off": 0.13706600153871573,
        "def": -0.036533885532871194,
        "offRank": 6,
        "defRank": 7
      },
      {
        "abbr": "LV",
        "off": 0.02267946795118862,
        "def": 0.05305469154724483,
        "offRank": 13,
        "defRank": 23
      },
      {
        "abbr": "LAC",
        "off": -0.14067157961242377,
        "def": -0.028505361886973137,
        "offRank": 32,
        "defRank": 9
      },
      {
        "abbr": "DAL",
        "off": 0.12393462509453528,
        "def": 0.16392698607434608,
        "offRank": 7,
        "defRank": 32
      },
      {
        "abbr": "NYG",
        "off": -0.017387341012981238,
        "def": 0.024939655993758553,
        "offRank": 20,
        "defRank": 18
      },
      {
        "abbr": "PHI",
        "off": -0.07265829452293658,
        "def": 0.05487218922014653,
        "offRank": 29,
        "defRank": 24
      },
      {
        "abbr": "WSH",
        "off": -0.00164920507467322,
        "def": 0.0484254156034184,
        "offRank": 15,
        "defRank": 22
      },
      {
        "abbr": "CHI",
        "off": 0.02891372751391262,
        "def": 0.03336731946945578,
        "offRank": 12,
        "defRank": 19
      },
      {
        "abbr": "DET",
        "off": 0.1806229391566911,
        "def": 0.12594454651555678,
        "offRank": 3,
        "defRank": 30
      },
      {
        "abbr": "GB",
        "off": -0.01787898389760081,
        "def": -0.0026034557389683697,
        "offRank": 21,
        "defRank": 13
      },
      {
        "abbr": "MIN",
        "off": -0.05882609724618271,
        "def": -0.16300961564405891,
        "offRank": 27,
        "defRank": 1
      },
      {
        "abbr": "ATL",
        "off": -0.013986049596744706,
        "def": 0.0018036290661725273,
        "offRank": 18,
        "defRank": 14
      },
      {
        "abbr": "CAR",
        "off": 0.09787674670988344,
        "def": 0.0458599925758499,
        "offRank": 8,
        "defRank": 21
      },
      {
        "abbr": "NO",
        "off": -0.010294367492299117,
        "def": 0.125165826025678,
        "offRank": 16,
        "defRank": 29
      },
      {
        "abbr": "TB",
        "off": -0.06339115193188527,
        "def": -0.049138254583582446,
        "offRank": 28,
        "defRank": 5
      },
      {
        "abbr": "ARI",
        "off": -0.013597785341559704,
        "def": 0.12760555814601118,
        "offRank": 17,
        "defRank": 31
      },
      {
        "abbr": "LAR",
        "off": 0.07744716213643116,
        "def": -0.008745764254190843,
        "offRank": 9,
        "defRank": 12
      },
      {
        "abbr": "SF",
        "off": 0.1867185218249787,
        "def": -0.03724899547702596,
        "offRank": 2,
        "defRank": 6
      },
      {
        "abbr": "SEA",
        "off": -0.05874586108301725,
        "def": -0.10196279609643188,
        "offRank": 26,
        "defRank": 2
      }
    ],
    "6": [
      {
        "abbr": "BUF",
        "off": 0.1869280250311451,
        "def": 0.11814500087964547,
        "offRank": 2,
        "defRank": 30
      },
      {
        "abbr": "MIA",
        "off": -0.0776745594943759,
        "def": 0.09309755125390018,
        "offRank": 28,
        "defRank": 28
      },
      {
        "abbr": "NE",
        "off": 0.04999515719949825,
        "def": 0.004661734583523222,
        "offRank": 11,
        "defRank": 18
      },
      {
        "abbr": "NYJ",
        "off": -0.021034943446413854,
        "def": -0.030407693650751796,
        "offRank": 19,
        "defRank": 7
      },
      {
        "abbr": "BAL",
        "off": 0.11818929493032809,
        "def": 0.015202113152993703,
        "offRank": 6,
        "defRank": 20
      },
      {
        "abbr": "CIN",
        "off": 0.07354992104888806,
        "def": -0.017118034109185856,
        "offRank": 9,
        "defRank": 11
      },
      {
        "abbr": "CLE",
        "off": -0.061271043802351585,
        "def": -0.029330857462271265,
        "offRank": 26,
        "defRank": 8
      },
      {
        "abbr": "PIT",
        "off": -0.05237282756706408,
        "def": -0.04744946203008033,
        "offRank": 23,
        "defRank": 5
      },
      {
        "abbr": "HOU",
        "off": 0.036845194956611406,
        "def": 0.0037159395457880637,
        "offRank": 12,
        "defRank": 17
      },
      {
        "abbr": "IND",
        "off": -0.03301829773211159,
        "def": 0.0604082070221141,
        "offRank": 21,
        "defRank": 24
      },
      {
        "abbr": "JAX",
        "off": 0.14336185475101276,
        "def": -0.02778119888854735,
        "offRank": 4,
        "defRank": 9
      },
      {
        "abbr": "TEN",
        "off": -0.10291674276913187,
        "def": 0.029625877994148352,
        "offRank": 30,
        "defRank": 22
      },
      {
        "abbr": "DEN",
        "off": -0.0634928681694259,
        "def": -0.011531601193930903,
        "offRank": 27,
        "defRank": 14
      },
      {
        "abbr": "KC",
        "off": 0.1238707877558733,
        "def": -0.07336224608159865,
        "offRank": 5,
        "defRank": 3
      },
      {
        "abbr": "LV",
        "off": 0.036369718419121115,
        "def": 0.07047153992534663,
        "offRank": 13,
        "defRank": 25
      },
      {
        "abbr": "LAC",
        "off": -0.1557363448107435,
        "def": -0.013226098013200642,
        "offRank": 32,
        "defRank": 12
      },
      {
        "abbr": "DAL",
        "off": 0.08173484523275847,
        "def": 0.13807498384530792,
        "offRank": 8,
        "defRank": 32
      },
      {
        "abbr": "NYG",
        "off": -0.027975655294195358,
        "def": 0.020615830466629088,
        "offRank": 20,
        "defRank": 21
      },
      {
        "abbr": "PHI",
        "off": -0.08188702515437761,
        "def": 0.05232846468365306,
        "offRank": 29,
        "defRank": 23
      },
      {
        "abbr": "WSH",
        "off": -0.0020804609687723936,
        "def": 0.07944052971501722,
        "offRank": 15,
        "defRank": 26
      },
      {
        "abbr": "CHI",
        "off": 0.02284196845253198,
        "def": -0.0024295274161293947,
        "offRank": 14,
        "defRank": 15
      },
      {
        "abbr": "DET",
        "off": 0.1806229391566911,
        "def": 0.12594454651555678,
        "offRank": 3,
        "defRank": 31
      },
      {
        "abbr": "GB",
        "off": -0.01057398344484228,
        "def": -0.02035382495991384,
        "offRank": 17,
        "defRank": 10
      },
      {
        "abbr": "MIN",
        "off": -0.05882609724618271,
        "def": -0.16300961564405891,
        "offRank": 24,
        "defRank": 1
      },
      {
        "abbr": "ATL",
        "off": -0.03734477897909112,
        "def": -0.000024498334168574412,
        "offRank": 22,
        "defRank": 16
      },
      {
        "abbr": "CAR",
        "off": 0.08542604821053357,
        "def": 0.014550380366318694,
        "offRank": 7,
        "defRank": 19
      },
      {
        "abbr": "NO",
        "off": -0.00804776849100773,
        "def": 0.08877273857674625,
        "offRank": 16,
        "defRank": 27
      },
      {
        "abbr": "TB",
        "off": -0.10307179994685048,
        "def": -0.06641968517664655,
        "offRank": 31,
        "defRank": 4
      },
      {
        "abbr": "ARI",
        "off": -0.015910840781405092,
        "def": 0.09917921237378827,
        "offRank": 18,
        "defRank": 29
      },
      {
        "abbr": "LAR",
        "off": 0.06021501915903325,
        "def": -0.012246773266930204,
        "offRank": 10,
        "defRank": 13
      },
      {
        "abbr": "SF",
        "off": 0.19690905887642726,
        "def": -0.032109113224828956,
        "offRank": 1,
        "defRank": 6
      },
      {
        "abbr": "SEA",
        "off": -0.060755191285536275,
        "def": -0.10152534987974653,
        "offRank": 25,
        "defRank": 2
      }
    ],
    "7": [
      {
        "abbr": "BUF",
        "off": 0.1869280250311451,
        "def": 0.11814500087964547,
        "offRank": 1,
        "defRank": 32
      },
      {
        "abbr": "MIA",
        "off": -0.0179679588920626,
        "def": 0.11137217804051698,
        "offRank": 20,
        "defRank": 29
      },
      {
        "abbr": "NE",
        "off": 0.06444473421079781,
        "def": 0.026252946425245345,
        "offRank": 10,
        "defRank": 18
      },
      {
        "abbr": "NYJ",
        "off": 0.010472965166726161,
        "def": 0.007487608004225393,
        "offRank": 15,
        "defRank": 14
      },
      {
        "abbr": "BAL",
        "off": 0.09180760175774148,
        "def": 0.0506988815086285,
        "offRank": 8,
        "defRank": 22
      },
      {
        "abbr": "CIN",
        "off": 0.1060111130863877,
        "def": -0.0247199540580192,
        "offRank": 6,
        "defRank": 8
      },
      {
        "abbr": "CLE",
        "off": -0.021753556134511708,
        "def": -0.019420746683866286,
        "offRank": 21,
        "defRank": 12
      },
      {
        "abbr": "PIT",
        "off": -0.036409625418897335,
        "def": -0.03325792174172546,
        "offRank": 27,
        "defRank": 5
      },
      {
        "abbr": "HOU",
        "off": 0.031116793364357447,
        "def": 0.035670830045613056,
        "offRank": 13,
        "defRank": 19
      },
      {
        "abbr": "IND",
        "off": -0.03547111556758346,
        "def": 0.038211696639075025,
        "offRank": 26,
        "defRank": 20
      },
      {
        "abbr": "JAX",
        "off": 0.14336185475101276,
        "def": -0.02778119888854735,
        "offRank": 3,
        "defRank": 6
      },
      {
        "abbr": "TEN",
        "off": -0.07944548086824571,
        "def": 0.05147521968789668,
        "offRank": 31,
        "defRank": 23
      },
      {
        "abbr": "DEN",
        "off": -0.031823898567519285,
        "def": -0.024140492036916514,
        "offRank": 24,
        "defRank": 9
      },
      {
        "abbr": "KC",
        "off": 0.09265614378373473,
        "def": -0.04149078704120588,
        "offRank": 7,
        "defRank": 4
      },
      {
        "abbr": "LV",
        "off": 0.016596703783562344,
        "def": 0.08614268593248862,
        "offRank": 14,
        "defRank": 27
      },
      {
        "abbr": "LAC",
        "off": -0.1557363448107435,
        "def": -0.013226098013200642,
        "offRank": 32,
        "defRank": 13
      },
      {
        "abbr": "DAL",
        "off": 0.1114091241820486,
        "def": 0.11610712371918275,
        "offRank": 5,
        "defRank": 31
      },
      {
        "abbr": "NYG",
        "off": 0.007195628286131774,
        "def": 0.01686982962016901,
        "offRank": 16,
        "defRank": 16
      },
      {
        "abbr": "PHI",
        "off": -0.07247686026733433,
        "def": 0.08420832973923509,
        "offRank": 30,
        "defRank": 25
      },
      {
        "abbr": "WSH",
        "off": -0.0020804609687723936,
        "def": 0.07944052971501722,
        "offRank": 18,
        "defRank": 24
      },
      {
        "abbr": "CHI",
        "off": 0.0380024898975683,
        "def": 0.02360362172345236,
        "offRank": 12,
        "defRank": 17
      },
      {
        "abbr": "DET",
        "off": 0.1425825167197171,
        "def": 0.11196590703404072,
        "offRank": 4,
        "defRank": 30
      },
      {
        "abbr": "GB",
        "off": -0.003094961260710796,
        "def": -0.023970149498067053,
        "offRank": 19,
        "defRank": 10
      },
      {
        "abbr": "MIN",
        "off": -0.06598667691419356,
        "def": -0.1439805164667878,
        "offRank": 29,
        "defRank": 1
      },
      {
        "abbr": "ATL",
        "off": -0.023555977377516406,
        "def": 0.011421609409323144,
        "offRank": 22,
        "defRank": 15
      },
      {
        "abbr": "CAR",
        "off": 0.04677895785931788,
        "def": 0.042397291785671226,
        "offRank": 11,
        "defRank": 21
      },
      {
        "abbr": "NO",
        "off": 0.0001442288812628695,
        "def": 0.08488273151979994,
        "offRank": 17,
        "defRank": 26
      },
      {
        "abbr": "TB",
        "off": -0.06070200877743985,
        "def": -0.08457284967825593,
        "offRank": 28,
        "defRank": 3
      },
      {
        "abbr": "ARI",
        "off": -0.027948891781877344,
        "def": 0.10796592000670056,
        "offRank": 23,
        "defRank": 28
      },
      {
        "abbr": "LAR",
        "off": 0.07591470395211934,
        "def": -0.025849414307864842,
        "offRank": 9,
        "defRank": 7
      },
      {
        "abbr": "SF",
        "off": 0.17880219858990176,
        "def": -0.01973863240674372,
        "offRank": 2,
        "defRank": 11
      },
      {
        "abbr": "SEA",
        "off": -0.03480751490734055,
        "def": -0.10138067795620302,
        "offRank": 25,
        "defRank": 2
      }
    ],
    "8": [
      {
        "abbr": "BUF",
        "off": 0.1643580150735138,
        "def": 0.060424382135675365,
        "offRank": 2,
        "defRank": 24
      },
      {
        "abbr": "MIA",
        "off": -0.021545346830558244,
        "def": 0.11582955936590647,
        "offRank": 23,
        "defRank": 31
      },
      {
        "abbr": "NE",
        "off": 0.07366194572870664,
        "def": 0.01785111299132358,
        "offRank": 8,
        "defRank": 17
      },
      {
        "abbr": "NYJ",
        "off": 0.03414516428378745,
        "def": 0.029950673400667177,
        "offRank": 13,
        "defRank": 18
      },
      {
        "abbr": "BAL",
        "off": 0.03842962271508132,
        "def": 0.05214188476293755,
        "offRank": 11,
        "defRank": 21
      },
      {
        "abbr": "CIN",
        "off": 0.11392713664164664,
        "def": 0.002935142623800792,
        "offRank": 5,
        "defRank": 15
      },
      {
        "abbr": "CLE",
        "off": -0.04369660334831744,
        "def": -0.002782382244411451,
        "offRank": 24,
        "defRank": 13
      },
      {
        "abbr": "PIT",
        "off": -0.017868980422767588,
        "def": -0.053154846084569364,
        "offRank": 22,
        "defRank": 6
      },
      {
        "abbr": "HOU",
        "off": 0.031116793364357447,
        "def": 0.035670830045613056,
        "offRank": 14,
        "defRank": 19
      },
      {
        "abbr": "IND",
        "off": -0.07778310382934568,
        "def": 0.0550478936396939,
        "offRank": 30,
        "defRank": 23
      },
      {
        "abbr": "JAX",
        "off": 0.14897640825894076,
        "def": -0.08105826732601026,
        "offRank": 3,
        "defRank": 3
      },
      {
        "abbr": "TEN",
        "off": -0.04441385310445171,
        "def": 0.06513203916129716,
        "offRank": 25,
        "defRank": 25
      },
      {
        "abbr": "DEN",
        "off": -0.012536300207257187,
        "def": -0.0029728176517035882,
        "offRank": 21,
        "defRank": 12
      },
      {
        "abbr": "KC",
        "off": 0.1015064774023826,
        "def": -0.020444824518787312,
        "offRank": 6,
        "defRank": 8
      },
      {
        "abbr": "LV",
        "off": 0.0375325801921378,
        "def": 0.09870917678530909,
        "offRank": 12,
        "defRank": 30
      },
      {
        "abbr": "LAC",
        "off": -0.18183313033145018,
        "def": -0.011734177187540657,
        "offRank": 32,
        "defRank": 10
      },
      {
        "abbr": "DAL",
        "off": 0.09000642332338311,
        "def": 0.11684737146721147,
        "offRank": 7,
        "defRank": 32
      },
      {
        "abbr": "NYG",
        "off": 0.007195628286131774,
        "def": 0.01686982962016901,
        "offRank": 18,
        "defRank": 16
      },
      {
        "abbr": "PHI",
        "off": -0.08638304469530729,
        "def": 0.08502806039323334,
        "offRank": 31,
        "defRank": 27
      },
      {
        "abbr": "WSH",
        "off": 0.010171918101634031,
        "def": 0.042660109732403376,
        "offRank": 17,
        "defRank": 20
      },
      {
        "abbr": "CHI",
        "off": 0.05366602250163904,
        "def": 0.0010320683990630729,
        "offRank": 10,
        "defRank": 14
      },
      {
        "abbr": "DET",
        "off": 0.11705688827275013,
        "def": 0.09427338026427293,
        "offRank": 4,
        "defRank": 29
      },
      {
        "abbr": "GB",
        "off": 0.01428342307981751,
        "def": -0.03748796037568136,
        "offRank": 16,
        "defRank": 7
      },
      {
        "abbr": "MIN",
        "off": -0.06496082385508258,
        "def": -0.12608625713832522,
        "offRank": 27,
        "defRank": 1
      },
      {
        "abbr": "ATL",
        "off": -0.06858314565657048,
        "def": -0.00850588974684164,
        "offRank": 28,
        "defRank": 11
      },
      {
        "abbr": "CAR",
        "off": 0.020934574021369428,
        "def": 0.0543712250396646,
        "offRank": 15,
        "defRank": 22
      },
      {
        "abbr": "NO",
        "off": 0.0001442288812628695,
        "def": 0.08488273151979994,
        "offRank": 19,
        "defRank": 26
      },
      {
        "abbr": "TB",
        "off": -0.07303945307945783,
        "def": -0.12353630820931909,
        "offRank": 29,
        "defRank": 2
      },
      {
        "abbr": "ARI",
        "off": -0.007669721866920386,
        "def": 0.08511490639827411,
        "offRank": 20,
        "defRank": 28
      },
      {
        "abbr": "LAR",
        "off": 0.06815628775688357,
        "def": -0.06379667061437368,
        "offRank": 9,
        "defRank": 4
      },
      {
        "abbr": "SF",
        "off": 0.17880219858990176,
        "def": -0.01973863240674372,
        "offRank": 1,
        "defRank": 9
      },
      {
        "abbr": "SEA",
        "off": -0.046342067048490754,
        "def": -0.06171322620344642,
        "offRank": 26,
        "defRank": 5
      }
    ],
    "9": [
      {
        "abbr": "BUF",
        "off": 0.13615528734599958,
        "def": 0.006196301635411771,
        "offRank": 3,
        "defRank": 13
      },
      {
        "abbr": "MIA",
        "off": -0.03828405787793417,
        "def": 0.09518926855328232,
        "offRank": 24,
        "defRank": 31
      },
      {
        "abbr": "NE",
        "off": 0.0637057955567503,
        "def": 0.04526009800937955,
        "offRank": 9,
        "defRank": 21
      },
      {
        "abbr": "NYJ",
        "off": -0.0012647168183646468,
        "def": 0.04224335759754451,
        "offRank": 17,
        "defRank": 19
      },
      {
        "abbr": "BAL",
        "off": 0.00757170318844206,
        "def": 0.05612213612170711,
        "offRank": 15,
        "defRank": 23
      },
      {
        "abbr": "CIN",
        "off": 0.12994764521919266,
        "def": 0.013383331862406417,
        "offRank": 4,
        "defRank": 16
      },
      {
        "abbr": "CLE",
        "off": -0.045919503207094946,
        "def": 0.0019336321291940693,
        "offRank": 26,
        "defRank": 12
      },
      {
        "abbr": "PIT",
        "off": -0.017868980422767588,
        "def": -0.053154846084569364,
        "offRank": 21,
        "defRank": 6
      },
      {
        "abbr": "HOU",
        "off": 0.057115925263671916,
        "def": 0.010726577745854551,
        "offRank": 10,
        "defRank": 15
      },
      {
        "abbr": "IND",
        "off": -0.08648798409946848,
        "def": 0.06947739677688639,
        "offRank": 29,
        "defRank": 28
      },
      {
        "abbr": "JAX",
        "off": 0.14177877458831561,
        "def": -0.10186353463471673,
        "offRank": 2,
        "defRank": 3
      },
      {
        "abbr": "TEN",
        "off": -0.04441385310445171,
        "def": 0.06513203916129716,
        "offRank": 25,
        "defRank": 24
      },
      {
        "abbr": "DEN",
        "off": -0.006425822142689031,
        "def": 0.00836800333845393,
        "offRank": 20,
        "defRank": 14
      },
      {
        "abbr": "KC",
        "off": 0.10625136495356638,
        "def": -0.05031067167058689,
        "offRank": 5,
        "defRank": 7
      },
      {
        "abbr": "LV",
        "off": 0.029927710034239594,
        "def": 0.10566004161818482,
        "offRank": 14,
        "defRank": 32
      },
      {
        "abbr": "LAC",
        "off": -0.17979399701830046,
        "def": 0.020538331052510767,
        "offRank": 32,
        "defRank": 18
      },
      {
        "abbr": "DAL",
        "off": 0.09886333825137268,
        "def": 0.08854179160727968,
        "offRank": 6,
        "defRank": 30
      },
      {
        "abbr": "NYG",
        "off": -0.002253701947989214,
        "def": -0.017163763209918255,
        "offRank": 18,
        "defRank": 11
      },
      {
        "abbr": "PHI",
        "off": -0.10518084990567046,
        "def": 0.068988223276441,
        "offRank": 30,
        "defRank": 26
      },
      {
        "abbr": "WSH",
        "off": -0.003686089027414094,
        "def": 0.04320983987012985,
        "offRank": 19,
        "defRank": 20
      },
      {
        "abbr": "CHI",
        "off": 0.03518995469830321,
        "def": -0.023193203605899302,
        "offRank": 12,
        "defRank": 9
      },
      {
        "abbr": "DET",
        "off": 0.09820988695858585,
        "def": 0.0690405962450688,
        "offRank": 7,
        "defRank": 27
      },
      {
        "abbr": "GB",
        "off": 0.040477935840090934,
        "def": -0.035749661596051203,
        "offRank": 11,
        "defRank": 8
      },
      {
        "abbr": "MIN",
        "off": -0.1131272970225953,
        "def": -0.10912869221406028,
        "offRank": 31,
        "defRank": 2
      },
      {
        "abbr": "ATL",
        "off": -0.051295309947388595,
        "def": 0.016613129817031856,
        "offRank": 27,
        "defRank": 17
      },
      {
        "abbr": "CAR",
        "off": 0.03149877704420198,
        "def": 0.05208097395346963,
        "offRank": 13,
        "defRank": 22
      },
      {
        "abbr": "NO",
        "off": 0.004799533974351782,
        "def": 0.06579704257691475,
        "offRank": 16,
        "defRank": 25
      },
      {
        "abbr": "TB",
        "off": -0.08490453688750467,
        "def": -0.125323403065825,
        "offRank": 28,
        "defRank": 1
      },
      {
        "abbr": "ARI",
        "off": -0.020158351114648507,
        "def": 0.08386100877373406,
        "offRank": 22,
        "defRank": 29
      },
      {
        "abbr": "LAR",
        "off": 0.06551988995957272,
        "def": -0.06871558857800787,
        "offRank": 8,
        "defRank": 5
      },
      {
        "abbr": "SF",
        "off": 0.17536305186692777,
        "def": -0.022819881592534837,
        "offRank": 1,
        "defRank": 10
      },
      {
        "abbr": "SEA",
        "off": -0.03284967031682072,
        "def": -0.07095197110887329,
        "offRank": 23,
        "defRank": 4
      }
    ],
    "10": [
      {
        "abbr": "BUF",
        "off": 0.14903376476666805,
        "def": -0.00047912244908631817,
        "offRank": 4,
        "defRank": 12
      },
      {
        "abbr": "MIA",
        "off": -0.05912223153323567,
        "def": 0.06071914614055401,
        "offRank": 26,
        "defRank": 25
      },
      {
        "abbr": "NE",
        "off": 0.03655137162902531,
        "def": 0.06857780057625536,
        "offRank": 10,
        "defRank": 27
      },
      {
        "abbr": "NYJ",
        "off": -0.006943169711802372,
        "def": 0.06217805984223175,
        "offRank": 19,
        "defRank": 26
      },
      {
        "abbr": "BAL",
        "off": 0.007456655707975282,
        "def": 0.051894954274753456,
        "offRank": 16,
        "defRank": 23
      },
      {
        "abbr": "CIN",
        "off": 0.15487654934664266,
        "def": 0.015245001361781288,
        "offRank": 2,
        "defRank": 16
      },
      {
        "abbr": "CLE",
        "off": -0.044891890080494525,
        "def": -0.00417868054370952,
        "offRank": 24,
        "defRank": 11
      },
      {
        "abbr": "PIT",
        "off": -0.012843515105195324,
        "def": -0.00569665901485024,
        "offRank": 20,
        "defRank": 10
      },
      {
        "abbr": "HOU",
        "off": 0.04394694319824201,
        "def": 0.0053000903375805125,
        "offRank": 9,
        "defRank": 13
      },
      {
        "abbr": "IND",
        "off": -0.09881843836740867,
        "def": 0.040816378102985794,
        "offRank": 30,
        "defRank": 21
      },
      {
        "abbr": "JAX",
        "off": 0.15069181645710805,
        "def": -0.0943527186172121,
        "offRank": 3,
        "defRank": 4
      },
      {
        "abbr": "TEN",
        "off": -0.04315453298426912,
        "def": 0.08256847270432247,
        "offRank": 23,
        "defRank": 29
      },
      {
        "abbr": "DEN",
        "off": -0.006425822142689031,
        "def": 0.00836800333845393,
        "offRank": 18,
        "defRank": 15
      },
      {
        "abbr": "KC",
        "off": 0.11736019982299316,
        "def": -0.06779272953291698,
        "offRank": 5,
        "defRank": 6
      },
      {
        "abbr": "LV",
        "off": 0.01114946187303377,
        "def": 0.10646364348777525,
        "offRank": 15,
        "defRank": 31
      },
      {
        "abbr": "LAC",
        "off": -0.16094610492336472,
        "def": 0.018869557249811954,
        "offRank": 32,
        "defRank": 17
      },
      {
        "abbr": "DAL",
        "off": 0.10879255119293632,
        "def": 0.12711141967092493,
        "offRank": 7,
        "defRank": 32
      },
      {
        "abbr": "NYG",
        "off": 0.011192449719529313,
        "def": -0.010338960484050025,
        "offRank": 14,
        "defRank": 9
      },
      {
        "abbr": "PHI",
        "off": -0.10518084990567046,
        "def": 0.068988223276441,
        "offRank": 31,
        "defRank": 28
      },
      {
        "abbr": "WSH",
        "off": 0.0013464182579454767,
        "def": 0.051495016374128844,
        "offRank": 17,
        "defRank": 22
      },
      {
        "abbr": "CHI",
        "off": 0.03518995469830321,
        "def": -0.023193203605899302,
        "offRank": 11,
        "defRank": 8
      },
      {
        "abbr": "DET",
        "off": 0.1156829190821643,
        "def": 0.03941283229627448,
        "offRank": 6,
        "defRank": 20
      },
      {
        "abbr": "GB",
        "off": 0.021187321268540966,
        "def": -0.02572715206070105,
        "offRank": 13,
        "defRank": 7
      },
      {
        "abbr": "MIN",
        "off": -0.0907947329397606,
        "def": -0.11801811104769515,
        "offRank": 29,
        "defRank": 2
      },
      {
        "abbr": "ATL",
        "off": -0.0679730011853303,
        "def": 0.03522817656573676,
        "offRank": 27,
        "defRank": 19
      },
      {
        "abbr": "CAR",
        "off": 0.022204606848196428,
        "def": 0.022539570009841223,
        "offRank": 12,
        "defRank": 18
      },
      {
        "abbr": "NO",
        "off": -0.019818484509388945,
        "def": 0.052639177481244526,
        "offRank": 21,
        "defRank": 24
      },
      {
        "abbr": "TB",
        "off": -0.08490453688750467,
        "def": -0.125323403065825,
        "offRank": 28,
        "defRank": 1
      },
      {
        "abbr": "ARI",
        "off": -0.04754356943937676,
        "def": 0.09788065080273367,
        "offRank": 25,
        "defRank": 30
      },
      {
        "abbr": "LAR",
        "off": 0.08002997839967434,
        "def": -0.0963255601997744,
        "offRank": 8,
        "defRank": 3
      },
      {
        "abbr": "SF",
        "off": 0.21127536294206337,
        "def": 0.0054508918549333795,
        "offRank": 1,
        "defRank": 14
      },
      {
        "abbr": "SEA",
        "off": -0.01999502659109613,
        "def": -0.08143429357419711,
        "offRank": 22,
        "defRank": 5
      }
    ],
    "11": [
      {
        "abbr": "BUF",
        "off": 0.13507296722733578,
        "def": -0.0249957391005097,
        "offRank": 4,
        "defRank": 9
      },
      {
        "abbr": "MIA",
        "off": -0.08104197949835255,
        "def": 0.05687851524072862,
        "offRank": 28,
        "defRank": 26
      },
      {
        "abbr": "NE",
        "off": 0.03655137162902531,
        "def": 0.06857780057625536,
        "offRank": 10,
        "defRank": 27
      },
      {
        "abbr": "NYJ",
        "off": 0.015840849094351708,
        "def": 0.0691603128023612,
        "offRank": 15,
        "defRank": 28
      },
      {
        "abbr": "BAL",
        "off": 0.01686963498299044,
        "def": 0.050317669861844425,
        "offRank": 14,
        "defRank": 24
      },
      {
        "abbr": "CIN",
        "off": 0.1443124322601271,
        "def": 0.02022877008913621,
        "offRank": 2,
        "defRank": 16
      },
      {
        "abbr": "CLE",
        "off": -0.044891890080494525,
        "def": -0.00417868054370952,
        "offRank": 24,
        "defRank": 13
      },
      {
        "abbr": "PIT",
        "off": -0.026179165428716074,
        "def": -0.01755983885788305,
        "offRank": 21,
        "defRank": 12
      },
      {
        "abbr": "HOU",
        "off": 0.041520978504702606,
        "def": -0.01986233050381993,
        "offRank": 9,
        "defRank": 11
      },
      {
        "abbr": "IND",
        "off": -0.11432534777101533,
        "def": 0.03882300535857688,
        "offRank": 31,
        "defRank": 20
      },
      {
        "abbr": "JAX",
        "off": 0.12325637803396189,
        "def": -0.10183266339211655,
        "offRank": 7,
        "defRank": 1
      },
      {
        "abbr": "TEN",
        "off": -0.033168796308415675,
        "def": 0.11758407021278294,
        "offRank": 23,
        "defRank": 31
      },
      {
        "abbr": "DEN",
        "off": 0.0015708235969765347,
        "def": 0.005460867535454612,
        "offRank": 18,
        "defRank": 15
      },
      {
        "abbr": "KC",
        "off": 0.12919814979267022,
        "def": -0.0734593325438397,
        "offRank": 5,
        "defRank": 6
      },
      {
        "abbr": "LV",
        "off": 0.008016085130658126,
        "def": 0.10176228151569837,
        "offRank": 16,
        "defRank": 29
      },
      {
        "abbr": "LAC",
        "off": -0.13294664817794308,
        "def": 0.040247859050259883,
        "offRank": 32,
        "defRank": 21
      },
      {
        "abbr": "DAL",
        "off": 0.13840067488200894,
        "def": 0.12065162004669154,
        "offRank": 3,
        "defRank": 32
      },
      {
        "abbr": "NYG",
        "off": -0.0064404992742848905,
        "def": -0.020090581465143136,
        "offRank": 19,
        "defRank": 10
      },
      {
        "abbr": "PHI",
        "off": -0.10901288297444195,
        "def": 0.048261203352715665,
        "offRank": 30,
        "defRank": 23
      },
      {
        "abbr": "WSH",
        "off": 0.007628735204004162,
        "def": 0.05043265235867075,
        "offRank": 17,
        "defRank": 25
      },
      {
        "abbr": "CHI",
        "off": 0.02177731836887999,
        "def": -0.03190284177037341,
        "offRank": 12,
        "defRank": 7
      },
      {
        "abbr": "DET",
        "off": 0.12915928635116533,
        "def": 0.04167928874940273,
        "offRank": 6,
        "defRank": 22
      },
      {
        "abbr": "GB",
        "off": 0.021187321268540966,
        "def": -0.02572715206070105,
        "offRank": 13,
        "defRank": 8
      },
      {
        "abbr": "MIN",
        "off": -0.08594528414824773,
        "def": -0.07740200326053927,
        "offRank": 29,
        "defRank": 5
      },
      {
        "abbr": "ATL",
        "off": -0.0679730011853303,
        "def": 0.03522817656573676,
        "offRank": 26,
        "defRank": 18
      },
      {
        "abbr": "CAR",
        "off": 0.02363529979111631,
        "def": 0.03066632703192515,
        "offRank": 11,
        "defRank": 17
      },
      {
        "abbr": "NO",
        "off": -0.02717064887083211,
        "def": 0.036442691356426846,
        "offRank": 22,
        "defRank": 19
      },
      {
        "abbr": "TB",
        "off": -0.06984341916697945,
        "def": -0.08605430104795062,
        "offRank": 27,
        "defRank": 3
      },
      {
        "abbr": "ARI",
        "off": -0.054280683177339605,
        "def": 0.11091188958380525,
        "offRank": 25,
        "defRank": 30
      },
      {
        "abbr": "LAR",
        "off": 0.08002997839967434,
        "def": -0.0963255601997744,
        "offRank": 8,
        "defRank": 2
      },
      {
        "abbr": "SF",
        "off": 0.22070419762633148,
        "def": -0.00015160368508322059,
        "offRank": 1,
        "defRank": 14
      },
      {
        "abbr": "SEA",
        "off": -0.01999502659109613,
        "def": -0.08143429357419711,
        "offRank": 20,
        "defRank": 4
      }
    ],
    "12": [
      {
        "abbr": "BUF",
        "off": 0.13507296722733578,
        "def": -0.0249957391005097,
        "offRank": 4,
        "defRank": 8
      },
      {
        "abbr": "MIA",
        "off": -0.08104197949835255,
        "def": 0.05687851524072862,
        "offRank": 28,
        "defRank": 26
      },
      {
        "abbr": "NE",
        "off": 0.03655137162902531,
        "def": 0.06857780057625536,
        "offRank": 10,
        "defRank": 27
      },
      {
        "abbr": "NYJ",
        "off": 0.015840849094351708,
        "def": 0.0691603128023612,
        "offRank": 14,
        "defRank": 28
      },
      {
        "abbr": "BAL",
        "off": 0.01686963498299044,
        "def": 0.050317669861844425,
        "offRank": 13,
        "defRank": 24
      },
      {
        "abbr": "CIN",
        "off": 0.1443124322601271,
        "def": 0.02022877008913621,
        "offRank": 2,
        "defRank": 16
      },
      {
        "abbr": "CLE",
        "off": -0.044891890080494525,
        "def": -0.00417868054370952,
        "offRank": 24,
        "defRank": 13
      },
      {
        "abbr": "PIT",
        "off": -0.026179165428716074,
        "def": -0.01755983885788305,
        "offRank": 21,
        "defRank": 12
      },
      {
        "abbr": "HOU",
        "off": 0.041520978504702606,
        "def": -0.01986233050381993,
        "offRank": 9,
        "defRank": 11
      },
      {
        "abbr": "IND",
        "off": -0.11432534777101533,
        "def": 0.03882300535857688,
        "offRank": 31,
        "defRank": 20
      },
      {
        "abbr": "JAX",
        "off": 0.12325637803396189,
        "def": -0.10183266339211655,
        "offRank": 7,
        "defRank": 1
      },
      {
        "abbr": "TEN",
        "off": -0.033168796308415675,
        "def": 0.11758407021278294,
        "offRank": 23,
        "defRank": 31
      },
      {
        "abbr": "DEN",
        "off": 0.0015708235969765347,
        "def": 0.005460867535454612,
        "offRank": 18,
        "defRank": 15
      },
      {
        "abbr": "KC",
        "off": 0.12919814979267022,
        "def": -0.0734593325438397,
        "offRank": 5,
        "defRank": 6
      },
      {
        "abbr": "LV",
        "off": 0.008016085130658126,
        "def": 0.10176228151569837,
        "offRank": 16,
        "defRank": 29
      },
      {
        "abbr": "LAC",
        "off": -0.13294664817794308,
        "def": 0.040247859050259883,
        "offRank": 32,
        "defRank": 21
      },
      {
        "abbr": "DAL",
        "off": 0.13840067488200894,
        "def": 0.12065162004669154,
        "offRank": 3,
        "defRank": 32
      },
      {
        "abbr": "NYG",
        "off": -0.0064404992742848905,
        "def": -0.020090581465143136,
        "offRank": 19,
        "defRank": 10
      },
      {
        "abbr": "PHI",
        "off": -0.10901288297444195,
        "def": 0.048261203352715665,
        "offRank": 30,
        "defRank": 23
      },
      {
        "abbr": "WSH",
        "off": 0.007628735204004162,
        "def": 0.05043265235867075,
        "offRank": 17,
        "defRank": 25
      },
      {
        "abbr": "CHI",
        "off": 0.02177731836887999,
        "def": -0.03190284177037341,
        "offRank": 12,
        "defRank": 7
      },
      {
        "abbr": "DET",
        "off": 0.12915928635116533,
        "def": 0.04167928874940273,
        "offRank": 6,
        "defRank": 22
      },
      {
        "abbr": "GB",
        "off": 0.014661408119213707,
        "def": -0.02284126321412158,
        "offRank": 15,
        "defRank": 9
      },
      {
        "abbr": "MIN",
        "off": -0.08594528414824773,
        "def": -0.07740200326053927,
        "offRank": 29,
        "defRank": 5
      },
      {
        "abbr": "ATL",
        "off": -0.0679730011853303,
        "def": 0.03522817656573676,
        "offRank": 26,
        "defRank": 18
      },
      {
        "abbr": "CAR",
        "off": 0.02363529979111631,
        "def": 0.03066632703192515,
        "offRank": 11,
        "defRank": 17
      },
      {
        "abbr": "NO",
        "off": -0.02717064887083211,
        "def": 0.036442691356426846,
        "offRank": 22,
        "defRank": 19
      },
      {
        "abbr": "TB",
        "off": -0.06984341916697945,
        "def": -0.08605430104795062,
        "offRank": 27,
        "defRank": 3
      },
      {
        "abbr": "ARI",
        "off": -0.054280683177339605,
        "def": 0.11091188958380525,
        "offRank": 25,
        "defRank": 30
      },
      {
        "abbr": "LAR",
        "off": 0.07269029074513947,
        "def": -0.09478034091065171,
        "offRank": 8,
        "defRank": 2
      },
      {
        "abbr": "SF",
        "off": 0.22070419762633148,
        "def": -0.00015160368508322059,
        "offRank": 1,
        "defRank": 14
      },
      {
        "abbr": "SEA",
        "off": -0.01999502659109613,
        "def": -0.08143429357419711,
        "offRank": 20,
        "defRank": 4
      }
    ]
  }
};
