// ============================================================
//  NFL_STANDINGS / NFL_OFFDEF — automatisch synchronisiert (nflverse)
// ============================================================
//  AUTO-GENERIERT von scripts/sync-espn-nfl-standings.js über die
//  GitHub Action ".github/workflows/sync-espn-nfl-standings.yml".
//  Nicht von Hand editieren — Änderungen werden beim nächsten Sync
//  überschrieben.
//  Zuletzt synchronisiert: 2026-11-22T16:01:53.870Z
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
        "off": 0.1832338437157322,
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
        "off": -0.029265729901393426,
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
        "def": 0.1832338437157322,
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
        "off": -0.19205394770758666,
        "def": 0.07497793174793292,
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
        "def": -0.029265729901393426,
        "offRank": 25,
        "defRank": 14
      },
      {
        "abbr": "ARI",
        "off": 0.07497793174793292,
        "def": -0.19205394770758666,
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
        "off": 0.25819463190560205,
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
        "off": 0.1875418473913606,
        "def": 0.03252172081615812,
        "offRank": 4,
        "defRank": 18
      },
      {
        "abbr": "CIN",
        "off": -0.050466092444831065,
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
        "def": 0.04925096842377499,
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
        "off": -0.19644107360684146,
        "def": 0.007284867175810444,
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
        "off": 0.16198075228844694,
        "def": 0.10256406176344492,
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
        "off": -0.03251660176385235,
        "def": -0.13349063625145288,
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
        "off": 0.05784447302757774,
        "def": 0.09005267173875282,
        "offRank": 13,
        "defRank": 24
      },
      {
        "abbr": "TB",
        "off": -0.11329709214418747,
        "def": -0.014402145185588805,
        "offRank": 28,
        "defRank": 13
      },
      {
        "abbr": "ARI",
        "off": -0.0535070824169321,
        "def": -0.010080406066038602,
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
        "off": 0.18676102375347156,
        "def": 0.07181781168768957,
        "offRank": 2,
        "defRank": 23
      },
      {
        "abbr": "MIA",
        "off": -0.0841066106279772,
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
        "off": 0.029219971832525175,
        "def": -0.026727348142581236,
        "offRank": 15,
        "defRank": 10
      },
      {
        "abbr": "BAL",
        "off": 0.16697970677333265,
        "def": 0.07851487216710733,
        "offRank": 4,
        "defRank": 26
      },
      {
        "abbr": "CIN",
        "off": 0.04455165341246744,
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
        "def": -0.006431011562835443,
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
        "off": -0.04338042574715435,
        "def": 0.025480170538767763,
        "offRank": 22,
        "defRank": 18
      },
      {
        "abbr": "DEN",
        "off": -0.058955269514757415,
        "def": 0.029012305757656575,
        "offRank": 23,
        "defRank": 20
      },
      {
        "abbr": "KC",
        "off": 0.1384085126429603,
        "def": -0.07553494375660544,
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
        "off": -0.15171223121354743,
        "def": 0.0191538091134846,
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
        "off": -0.02993174424389454,
        "def": 0.08716732037103098,
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
        "off": 0.1153101465467556,
        "def": 0.02758386498786941,
        "offRank": 8,
        "defRank": 19
      },
      {
        "abbr": "DET",
        "off": 0.1370094898854704,
        "def": 0.1258140796326752,
        "offRank": 7,
        "defRank": 29
      },
      {
        "abbr": "GB",
        "off": -0.0980467319194979,
        "def": 0.06711418406811072,
        "offRank": 27,
        "defRank": 22
      },
      {
        "abbr": "MIN",
        "off": -0.09191268568367214,
        "def": -0.1591211564949132,
        "offRank": 26,
        "defRank": 1
      },
      {
        "abbr": "ATL",
        "off": -0.12198402258859284,
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
        "off": 0.040323668397290846,
        "def": 0.0774639857250112,
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
        "off": 0.022471993996855576,
        "def": 0.11389186104879331,
        "offRank": 16,
        "defRank": 28
      },
      {
        "abbr": "LAR",
        "off": 0.03005977305574855,
        "def": -0.04924184769901514,
        "offRank": 14,
        "defRank": 8
      },
      {
        "abbr": "SF",
        "off": 0.290093968826759,
        "def": 0.02337843165795899,
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
        "off": 0.17299202302721556,
        "def": 0.09642820774489527,
        "offRank": 2,
        "defRank": 29
      },
      {
        "abbr": "MIA",
        "off": -0.10066544821925459,
        "def": 0.058708118858074754,
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
        "off": 0.007825492115272762,
        "def": -0.011392295916739471,
        "offRank": 15,
        "defRank": 11
      },
      {
        "abbr": "BAL",
        "off": 0.15724847135939998,
        "def": 0.04837692693592202,
        "offRank": 3,
        "defRank": 23
      },
      {
        "abbr": "CIN",
        "off": 0.04244820243674333,
        "def": -0.02278755271956192,
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
        "def": 0.027133480520270366,
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
        "off": 0.15571342644555783,
        "def": -0.0515579269935937,
        "offRank": 4,
        "defRank": 4
      },
      {
        "abbr": "TEN",
        "off": -0.04460021966648627,
        "def": 0.050239625911966755,
        "offRank": 25,
        "defRank": 24
      },
      {
        "abbr": "DEN",
        "off": -0.01943904417755122,
        "def": 0.051120683571030175,
        "offRank": 19,
        "defRank": 25
      },
      {
        "abbr": "KC",
        "off": 0.13284101481951852,
        "def": -0.03957681701327928,
        "offRank": 7,
        "defRank": 7
      },
      {
        "abbr": "LV",
        "off": -0.004740247602111063,
        "def": -0.04666110973279947,
        "offRank": 16,
        "defRank": 6
      },
      {
        "abbr": "LAC",
        "off": -0.13181990051840728,
        "def": -0.01140284801062142,
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
        "off": -0.04052112459735879,
        "def": 0.009749094971959017,
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
        "off": 0.08516278626571748,
        "def": 0.0024533126778062005,
        "offRank": 9,
        "defRank": 12
      },
      {
        "abbr": "DET",
        "off": 0.1371175354315796,
        "def": 0.14654547412375168,
        "offRank": 6,
        "defRank": 31
      },
      {
        "abbr": "GB",
        "off": -0.0679793192782495,
        "def": 0.04668000205232995,
        "offRank": 27,
        "defRank": 21
      },
      {
        "abbr": "MIN",
        "off": -0.0968897494310485,
        "def": -0.16213782124861337,
        "offRank": 29,
        "defRank": 1
      },
      {
        "abbr": "ATL",
        "off": -0.01811530527026188,
        "def": -0.0393564387464864,
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
        "off": 0.017474978119804925,
        "def": 0.13476029516048849,
        "offRank": 12,
        "defRank": 30
      },
      {
        "abbr": "TB",
        "off": -0.1160272460786286,
        "def": -0.0508962109612773,
        "offRank": 31,
        "defRank": 5
      },
      {
        "abbr": "ARI",
        "off": -0.03136534470456154,
        "def": 0.06572854718755598,
        "offRank": 22,
        "defRank": 28
      },
      {
        "abbr": "LAR",
        "off": 0.028884541976074755,
        "def": -0.09261671932087472,
        "offRank": 11,
        "defRank": 3
      },
      {
        "abbr": "SF",
        "off": 0.24097106755394693,
        "def": 0.03775062937945719,
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
        "off": 0.18988196506913307,
        "def": 0.12202399817440082,
        "offRank": 1,
        "defRank": 30
      },
      {
        "abbr": "MIA",
        "off": -0.0826151812259139,
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
        "off": -0.028689305631528883,
        "def": -0.06298362982264491,
        "offRank": 22,
        "defRank": 4
      },
      {
        "abbr": "BAL",
        "off": 0.1527967365289209,
        "def": 0.03047287465701171,
        "offRank": 4,
        "defRank": 19
      },
      {
        "abbr": "CIN",
        "off": 0.0698797951800772,
        "def": -0.022985767227191825,
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
        "def": 0.007933349794390629,
        "offRank": 23,
        "defRank": 16
      },
      {
        "abbr": "HOU",
        "off": 0.0029409085612234916,
        "def": -0.04090958884059512,
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
        "off": 0.13445944721492792,
        "def": -0.07266964819071396,
        "offRank": 5,
        "defRank": 3
      },
      {
        "abbr": "TEN",
        "off": -0.1061937012306325,
        "def": 0.053870391693890525,
        "offRank": 31,
        "defRank": 25
      },
      {
        "abbr": "DEN",
        "off": -0.05919319910443955,
        "def": -0.002526373460083714,
        "offRank": 25,
        "defRank": 14
      },
      {
        "abbr": "KC",
        "off": 0.13284101481951852,
        "def": -0.03957681701327928,
        "offRank": 6,
        "defRank": 8
      },
      {
        "abbr": "LV",
        "off": 0.006663204261482305,
        "def": 0.0420539266185377,
        "offRank": 13,
        "defRank": 21
      },
      {
        "abbr": "LAC",
        "off": -0.15416648923228343,
        "def": -0.05026888319391136,
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
        "off": -0.014592844808042208,
        "def": 0.02786880472861276,
        "offRank": 16,
        "defRank": 18
      },
      {
        "abbr": "PHI",
        "off": -0.07493440430237225,
        "def": 0.04998024569976101,
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
        "off": 0.028977960606759594,
        "def": 0.0411486188712328,
        "offRank": 12,
        "defRank": 20
      },
      {
        "abbr": "DET",
        "off": 0.16871864901837438,
        "def": 0.12355116138197045,
        "offRank": 3,
        "defRank": 31
      },
      {
        "abbr": "GB",
        "off": -0.021279184765136367,
        "def": -0.008997433996310963,
        "offRank": 19,
        "defRank": 13
      },
      {
        "abbr": "MIN",
        "off": -0.07051261802853415,
        "def": -0.17948076804028276,
        "offRank": 28,
        "defRank": 1
      },
      {
        "abbr": "ATL",
        "off": -0.022513932424428687,
        "def": -0.0018834632313562134,
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
        "off": -0.02028912009351061,
        "def": 0.10996689459347132,
        "offRank": 18,
        "defRank": 28
      },
      {
        "abbr": "TB",
        "off": -0.060657679914737694,
        "def": -0.046021293631199535,
        "offRank": 26,
        "defRank": 6
      },
      {
        "abbr": "ARI",
        "off": -0.019107450222558955,
        "def": 0.11721291019989023,
        "offRank": 17,
        "defRank": 29
      },
      {
        "abbr": "LAR",
        "off": 0.06887830341642509,
        "def": -0.023778526826330852,
        "offRank": 10,
        "defRank": 10
      },
      {
        "abbr": "SF",
        "off": 0.18055989878789486,
        "def": -0.03949342749394169,
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
        "off": 0.175949813906324,
        "def": 0.11514855912494099,
        "offRank": 2,
        "defRank": 30
      },
      {
        "abbr": "MIA",
        "off": -0.0826151812259139,
        "def": 0.0833277062455284,
        "offRank": 28,
        "defRank": 28
      },
      {
        "abbr": "NE",
        "off": 0.056645197695767424,
        "def": 0.010715684721401693,
        "offRank": 10,
        "defRank": 19
      },
      {
        "abbr": "NYJ",
        "off": -0.03154848835642035,
        "def": -0.03470151598309588,
        "offRank": 20,
        "defRank": 6
      },
      {
        "abbr": "BAL",
        "off": 0.11663396124222998,
        "def": 0.01060611680652705,
        "offRank": 6,
        "defRank": 18
      },
      {
        "abbr": "CIN",
        "off": 0.0698797951800772,
        "def": -0.022985767227191825,
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
        "def": -0.0029144366766188988,
        "offRank": 12,
        "defRank": 16
      },
      {
        "abbr": "IND",
        "off": -0.03623661868962916,
        "def": 0.05318072732443285,
        "offRank": 21,
        "defRank": 24
      },
      {
        "abbr": "JAX",
        "off": 0.13977895087232906,
        "def": -0.024047579822145004,
        "offRank": 4,
        "defRank": 12
      },
      {
        "abbr": "TEN",
        "off": -0.10882730952350977,
        "def": 0.02809086816337771,
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
        "def": -0.07705658648414651,
        "offRank": 5,
        "defRank": 3
      },
      {
        "abbr": "LV",
        "off": 0.018004031798265638,
        "def": 0.05418524855254933,
        "offRank": 14,
        "defRank": 25
      },
      {
        "abbr": "LAC",
        "off": -0.1680463117324194,
        "def": -0.030098335016943333,
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
        "off": -0.02344325133930937,
        "def": 0.023274843997489247,
        "offRank": 19,
        "defRank": 21
      },
      {
        "abbr": "PHI",
        "off": -0.08537367737530392,
        "def": 0.04745657000603646,
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
        "off": 0.021339007117862584,
        "def": 0.004012228462681935,
        "offRank": 13,
        "defRank": 17
      },
      {
        "abbr": "DET",
        "off": 0.16871864901837438,
        "def": 0.12355116138197045,
        "offRank": 3,
        "defRank": 31
      },
      {
        "abbr": "GB",
        "off": -0.011957295295129252,
        "def": -0.024301232890940102,
        "offRank": 16,
        "defRank": 11
      },
      {
        "abbr": "MIN",
        "off": -0.07051261802853415,
        "def": -0.17948076804028276,
        "offRank": 27,
        "defRank": 1
      },
      {
        "abbr": "ATL",
        "off": -0.04484509541199752,
        "def": -0.004765224359829825,
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
        "off": -0.016027771223204926,
        "def": 0.07857639319458948,
        "offRank": 17,
        "defRank": 27
      },
      {
        "abbr": "TB",
        "off": -0.10065012896851733,
        "def": -0.06771900772516136,
        "offRank": 30,
        "defRank": 4
      },
      {
        "abbr": "ARI",
        "off": -0.021915321320328356,
        "def": 0.0892648343958432,
        "offRank": 18,
        "defRank": 29
      },
      {
        "abbr": "LAR",
        "off": 0.051806255139834716,
        "def": -0.025951869826503812,
        "offRank": 11,
        "defRank": 10
      },
      {
        "abbr": "SF",
        "off": 0.19546107302898927,
        "def": -0.03448924141464978,
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
        "off": 0.175949813906324,
        "def": 0.11514855912494099,
        "offRank": 2,
        "defRank": 31
      },
      {
        "abbr": "MIA",
        "off": -0.020317463701976436,
        "def": 0.10497702090341687,
        "offRank": 21,
        "defRank": 29
      },
      {
        "abbr": "NE",
        "off": 0.0697985466119096,
        "def": 0.03242568831750119,
        "offRank": 9,
        "defRank": 20
      },
      {
        "abbr": "NYJ",
        "off": 0.0030914031228197665,
        "def": 0.005040850988190508,
        "offRank": 15,
        "defRank": 14
      },
      {
        "abbr": "BAL",
        "off": 0.08898988787240052,
        "def": 0.045326361926302385,
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
        "off": -0.020040405290783686,
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
        "def": 0.030393677272068046,
        "offRank": 13,
        "defRank": 19
      },
      {
        "abbr": "IND",
        "off": -0.04173349909619206,
        "def": 0.030008617412302072,
        "offRank": 26,
        "defRank": 18
      },
      {
        "abbr": "JAX",
        "off": 0.13977895087232906,
        "def": -0.024047579822145004,
        "offRank": 3,
        "defRank": 11
      },
      {
        "abbr": "TEN",
        "off": -0.08491468752581334,
        "def": 0.04918104228493504,
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
        "def": -0.040588176256116125,
        "offRank": 7,
        "defRank": 5
      },
      {
        "abbr": "LV",
        "off": -0.004168359611327704,
        "def": 0.06539327058426304,
        "offRank": 17,
        "defRank": 24
      },
      {
        "abbr": "LAC",
        "off": -0.1680463117324194,
        "def": -0.030098335016943333,
        "offRank": 32,
        "defRank": 8
      },
      {
        "abbr": "DAL",
        "off": 0.11115289094894608,
        "def": 0.1219333216251533,
        "offRank": 5,
        "defRank": 32
      },
      {
        "abbr": "NYG",
        "off": 0.011463388790280585,
        "def": 0.01769004556942752,
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
        "off": 0.03757346730160441,
        "def": 0.02842006720856262,
        "offRank": 12,
        "defRank": 17
      },
      {
        "abbr": "DET",
        "off": 0.13005330633442724,
        "def": 0.10715810406702245,
        "offRank": 4,
        "defRank": 30
      },
      {
        "abbr": "GB",
        "off": -0.00697864679052602,
        "def": -0.02961045153356991,
        "offRank": 18,
        "defRank": 9
      },
      {
        "abbr": "MIN",
        "off": -0.07810800417779946,
        "def": -0.162365404919912,
        "offRank": 30,
        "defRank": 1
      },
      {
        "abbr": "ATL",
        "off": -0.030750357154693826,
        "def": 0.006882589721305217,
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
        "off": -0.008689065348124924,
        "def": 0.0732330650928215,
        "offRank": 19,
        "defRank": 25
      },
      {
        "abbr": "TB",
        "off": -0.05899024547087911,
        "def": -0.08694164660742118,
        "offRank": 28,
        "defRank": 3
      },
      {
        "abbr": "ARI",
        "off": -0.03498842064693273,
        "def": 0.0972639009422153,
        "offRank": 23,
        "defRank": 28
      },
      {
        "abbr": "LAR",
        "off": 0.06232358683169445,
        "def": -0.04277145432288028,
        "offRank": 10,
        "defRank": 4
      },
      {
        "abbr": "SF",
        "off": 0.1770629734589716,
        "def": -0.02258259113621957,
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
        "off": 0.15441351368869025,
        "def": 0.059042885899708415,
        "offRank": 2,
        "defRank": 24
      },
      {
        "abbr": "MIA",
        "off": -0.023582265502485978,
        "def": 0.10783566019975256,
        "offRank": 23,
        "defRank": 31
      },
      {
        "abbr": "NE",
        "off": 0.07630276785513396,
        "def": 0.023244124673360383,
        "offRank": 8,
        "defRank": 17
      },
      {
        "abbr": "NYJ",
        "off": 0.029329248326199684,
        "def": 0.026895950231751963,
        "offRank": 13,
        "defRank": 18
      },
      {
        "abbr": "BAL",
        "off": 0.0371600744108228,
        "def": 0.04680227902351108,
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
        "off": -0.0419370139326029,
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
        "def": 0.030393677272068046,
        "offRank": 12,
        "defRank": 19
      },
      {
        "abbr": "IND",
        "off": -0.08361949197507583,
        "def": 0.04854449816143204,
        "offRank": 30,
        "defRank": 22
      },
      {
        "abbr": "JAX",
        "off": 0.14670784399230566,
        "def": -0.07819151998949073,
        "offRank": 3,
        "defRank": 4
      },
      {
        "abbr": "TEN",
        "off": -0.049229683381205015,
        "def": 0.06466327869554193,
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
        "def": -0.021569846905985453,
        "offRank": 6,
        "defRank": 10
      },
      {
        "abbr": "LV",
        "off": 0.01833762627138397,
        "def": 0.08195648163038916,
        "offRank": 15,
        "defRank": 28
      },
      {
        "abbr": "LAC",
        "off": -0.1962656507100504,
        "def": -0.030267415488613007,
        "offRank": 32,
        "defRank": 8
      },
      {
        "abbr": "DAL",
        "off": 0.08908627386880232,
        "def": 0.11899181977910386,
        "offRank": 7,
        "defRank": 32
      },
      {
        "abbr": "NYG",
        "off": 0.011463388790280585,
        "def": 0.01769004556942752,
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
        "off": 0.054974874688823505,
        "def": 0.006659927807383011,
        "offRank": 9,
        "defRank": 15
      },
      {
        "abbr": "DET",
        "off": 0.10430029045002344,
        "def": 0.08901501352077787,
        "offRank": 5,
        "defRank": 30
      },
      {
        "abbr": "GB",
        "off": 0.010543382581496147,
        "def": -0.04264726605795832,
        "offRank": 17,
        "defRank": 7
      },
      {
        "abbr": "MIN",
        "off": -0.07672250330612455,
        "def": -0.14375981648049688,
        "offRank": 29,
        "defRank": 1
      },
      {
        "abbr": "ATL",
        "off": -0.07383919362936851,
        "def": -0.013499224626978903,
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
        "off": -0.008689065348124924,
        "def": 0.0732330650928215,
        "offRank": 19,
        "defRank": 26
      },
      {
        "abbr": "TB",
        "off": -0.07259168555155669,
        "def": -0.1244824681894565,
        "offRank": 27,
        "defRank": 2
      },
      {
        "abbr": "ARI",
        "off": -0.016422631534069938,
        "def": 0.07523574443525598,
        "offRank": 20,
        "defRank": 27
      },
      {
        "abbr": "LAR",
        "off": 0.05293066820246441,
        "def": -0.081983955030753,
        "offRank": 10,
        "defRank": 3
      },
      {
        "abbr": "SF",
        "off": 0.1770629734589716,
        "def": -0.02258259113621957,
        "offRank": 1,
        "defRank": 9
      },
      {
        "abbr": "SEA",
        "off": -0.046809504241878394,
        "def": -0.06128456838482636,
        "offRank": 25,
        "defRank": 5
      }
    ],
    "9": [
      {
        "abbr": "BUF",
        "off": 0.1255571917593923,
        "def": 0.0013127653425949444,
        "offRank": 3,
        "defRank": 13
      },
      {
        "abbr": "MIA",
        "off": -0.04025850882439659,
        "def": 0.08690912835095983,
        "offRank": 24,
        "defRank": 30
      },
      {
        "abbr": "NE",
        "off": 0.0642462131761861,
        "def": 0.05034581211578374,
        "offRank": 8,
        "defRank": 22
      },
      {
        "abbr": "NYJ",
        "off": -0.005007262305700919,
        "def": 0.04004917003621458,
        "offRank": 19,
        "defRank": 19
      },
      {
        "abbr": "BAL",
        "off": 0.005555557486945601,
        "def": 0.05197720596606007,
        "offRank": 15,
        "defRank": 23
      },
      {
        "abbr": "CIN",
        "off": 0.12554868384369314,
        "def": 0.00822821794128979,
        "offRank": 4,
        "defRank": 17
      },
      {
        "abbr": "CLE",
        "off": -0.04547462123348021,
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
        "def": 0.005585356486938888,
        "offRank": 9,
        "defRank": 16
      },
      {
        "abbr": "IND",
        "off": -0.09307426607416215,
        "def": 0.0625208224603745,
        "offRank": 29,
        "defRank": 25
      },
      {
        "abbr": "JAX",
        "off": 0.1405350851366246,
        "def": -0.10031872474071823,
        "offRank": 2,
        "defRank": 3
      },
      {
        "abbr": "TEN",
        "off": -0.049229683381205015,
        "def": 0.06466327869554193,
        "offRank": 26,
        "defRank": 27
      },
      {
        "abbr": "DEN",
        "off": -0.012002715933608509,
        "def": 0.005391192380449011,
        "offRank": 20,
        "defRank": 15
      },
      {
        "abbr": "KC",
        "off": 0.10823080672288125,
        "def": -0.05076675099759349,
        "offRank": 5,
        "defRank": 7
      },
      {
        "abbr": "LV",
        "off": 0.011990487238410705,
        "def": 0.09188428701128991,
        "offRank": 14,
        "defRank": 32
      },
      {
        "abbr": "LAC",
        "off": -0.19290906805878816,
        "def": 0.0018946854550185076,
        "offRank": 32,
        "defRank": 14
      },
      {
        "abbr": "DAL",
        "off": 0.09686657253585901,
        "def": 0.08913891079906298,
        "offRank": 6,
        "defRank": 31
      },
      {
        "abbr": "NYG",
        "off": 0.001748177672083239,
        "def": -0.017359533774996973,
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
        "off": 0.03660257103505237,
        "def": -0.01760018088141327,
        "offRank": 12,
        "defRank": 10
      },
      {
        "abbr": "DET",
        "off": 0.08570403035396609,
        "def": 0.06414016586970443,
        "offRank": 7,
        "defRank": 26
      },
      {
        "abbr": "GB",
        "off": 0.03747470403763252,
        "def": -0.04210986347368545,
        "offRank": 11,
        "defRank": 8
      },
      {
        "abbr": "MIN",
        "off": -0.12776918180927097,
        "def": -0.1262458257297808,
        "offRank": 31,
        "defRank": 1
      },
      {
        "abbr": "ATL",
        "off": -0.05606287042009401,
        "def": 0.009943365856926815,
        "offRank": 27,
        "defRank": 18
      },
      {
        "abbr": "CAR",
        "off": 0.031636314765334725,
        "def": 0.05024472281649573,
        "offRank": 13,
        "defRank": 21
      },
      {
        "abbr": "NO",
        "off": -0.004615707434688603,
        "def": 0.05453535323759002,
        "offRank": 18,
        "defRank": 24
      },
      {
        "abbr": "TB",
        "off": -0.08390376713391243,
        "def": -0.12588204204231226,
        "offRank": 28,
        "defRank": 2
      },
      {
        "abbr": "ARI",
        "off": -0.028767716095393702,
        "def": 0.07502746046467984,
        "offRank": 22,
        "defRank": 29
      },
      {
        "abbr": "LAR",
        "off": 0.051786740246289154,
        "def": -0.08590187758339024,
        "offRank": 10,
        "defRank": 4
      },
      {
        "abbr": "SF",
        "off": 0.17494165286436036,
        "def": -0.025836362642223866,
        "offRank": 1,
        "defRank": 9
      },
      {
        "abbr": "SEA",
        "off": -0.03337277804296703,
        "def": -0.07122280661921478,
        "offRank": 23,
        "defRank": 5
      }
    ],
    "10": [
      {
        "abbr": "BUF",
        "off": 0.1409525563354625,
        "def": -0.0042181312497118675,
        "offRank": 4,
        "defRank": 10
      },
      {
        "abbr": "MIA",
        "off": -0.06208747368955668,
        "def": 0.05341228572072101,
        "offRank": 26,
        "defRank": 25
      },
      {
        "abbr": "NE",
        "off": 0.03452865085014292,
        "def": 0.0711225025629382,
        "offRank": 11,
        "defRank": 28
      },
      {
        "abbr": "NYJ",
        "off": -0.009696492069048502,
        "def": 0.061535741388556775,
        "offRank": 18,
        "defRank": 26
      },
      {
        "abbr": "BAL",
        "off": 0.007953524683925335,
        "def": 0.04691440523801292,
        "offRank": 15,
        "defRank": 23
      },
      {
        "abbr": "CIN",
        "off": 0.15326261672253277,
        "def": 0.009108692776784786,
        "offRank": 2,
        "defRank": 17
      },
      {
        "abbr": "CLE",
        "off": -0.04303494071268727,
        "def": -0.003449987089082561,
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
        "off": 0.042429680248318495,
        "def": 0.0022930141970715595,
        "offRank": 9,
        "defRank": 13
      },
      {
        "abbr": "IND",
        "off": -0.104740621052004,
        "def": 0.03353762773843067,
        "offRank": 30,
        "defRank": 21
      },
      {
        "abbr": "JAX",
        "off": 0.14946422202375773,
        "def": -0.09150944765481467,
        "offRank": 3,
        "defRank": 4
      },
      {
        "abbr": "TEN",
        "off": -0.045901987083509316,
        "def": 0.08201977789437898,
        "offRank": 24,
        "defRank": 29
      },
      {
        "abbr": "DEN",
        "off": -0.012002715933608509,
        "def": 0.005391192380449011,
        "offRank": 19,
        "defRank": 16
      },
      {
        "abbr": "KC",
        "off": 0.11704467634758167,
        "def": -0.07136514218244457,
        "offRank": 5,
        "defRank": 6
      },
      {
        "abbr": "LV",
        "off": -0.008157177094214898,
        "def": 0.09352184975711415,
        "offRank": 17,
        "defRank": 31
      },
      {
        "abbr": "LAC",
        "off": -0.17410914624529994,
        "def": 0.004903111740872624,
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
        "def": -0.009649873332632892,
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
        "off": 0.03660257103505237,
        "def": -0.01760018088141327,
        "offRank": 10,
        "defRank": 8
      },
      {
        "abbr": "DET",
        "off": 0.10264176365973467,
        "def": 0.03225916638147178,
        "offRank": 7,
        "defRank": 20
      },
      {
        "abbr": "GB",
        "off": 0.01998833442322776,
        "def": -0.03152942686491522,
        "offRank": 12,
        "defRank": 7
      },
      {
        "abbr": "MIN",
        "off": -0.10369863314071613,
        "def": -0.1317385386932399,
        "offRank": 29,
        "defRank": 1
      },
      {
        "abbr": "ATL",
        "off": -0.07526192274728633,
        "def": 0.027420759217500444,
        "offRank": 27,
        "defRank": 19
      },
      {
        "abbr": "CAR",
        "off": 0.01975954771784711,
        "def": 0.01838026062377978,
        "offRank": 13,
        "defRank": 18
      },
      {
        "abbr": "NO",
        "off": -0.030776067906922788,
        "def": 0.04003850145176351,
        "offRank": 22,
        "defRank": 22
      },
      {
        "abbr": "TB",
        "off": -0.08390376713391243,
        "def": -0.12588204204231226,
        "offRank": 28,
        "defRank": 2
      },
      {
        "abbr": "ARI",
        "off": -0.05627630227110696,
        "def": 0.09013845693240119,
        "offRank": 25,
        "defRank": 30
      },
      {
        "abbr": "LAR",
        "off": 0.0678033944915609,
        "def": -0.11320184394313225,
        "offRank": 8,
        "defRank": 3
      },
      {
        "abbr": "SF",
        "off": 0.20963984055597704,
        "def": 0.00468302064245207,
        "offRank": 1,
        "defRank": 14
      },
      {
        "abbr": "SEA",
        "off": -0.020829604600570064,
        "def": -0.08482519802381262,
        "offRank": 21,
        "defRank": 5
      }
    ],
    "11": [
      {
        "abbr": "BUF",
        "off": 0.1409525563354625,
        "def": -0.0042181312497118675,
        "offRank": 4,
        "defRank": 11
      },
      {
        "abbr": "MIA",
        "off": -0.06208747368955668,
        "def": 0.05341228572072101,
        "offRank": 26,
        "defRank": 25
      },
      {
        "abbr": "NE",
        "off": 0.03452865085014292,
        "def": 0.0711225025629382,
        "offRank": 11,
        "defRank": 28
      },
      {
        "abbr": "NYJ",
        "off": -0.009696492069048502,
        "def": 0.061535741388556775,
        "offRank": 18,
        "defRank": 26
      },
      {
        "abbr": "BAL",
        "off": 0.007953524683925335,
        "def": 0.04691440523801292,
        "offRank": 15,
        "defRank": 23
      },
      {
        "abbr": "CIN",
        "off": 0.15326261672253277,
        "def": 0.009108692776784786,
        "offRank": 2,
        "defRank": 17
      },
      {
        "abbr": "CLE",
        "off": -0.04303494071268727,
        "def": -0.003449987089082561,
        "offRank": 23,
        "defRank": 12
      },
      {
        "abbr": "PIT",
        "off": -0.01902024588321595,
        "def": -0.003320191091966078,
        "offRank": 20,
        "defRank": 13
      },
      {
        "abbr": "HOU",
        "off": 0.03976077288958761,
        "def": -0.023058517500049776,
        "offRank": 9,
        "defRank": 8
      },
      {
        "abbr": "IND",
        "off": -0.12021430442090875,
        "def": 0.031891997442107134,
        "offRank": 31,
        "defRank": 20
      },
      {
        "abbr": "JAX",
        "off": 0.14946422202375773,
        "def": -0.09150944765481467,
        "offRank": 3,
        "defRank": 4
      },
      {
        "abbr": "TEN",
        "off": -0.045901987083509316,
        "def": 0.08201977789437898,
        "offRank": 24,
        "defRank": 29
      },
      {
        "abbr": "DEN",
        "off": -0.012002715933608509,
        "def": 0.005391192380449011,
        "offRank": 19,
        "defRank": 16
      },
      {
        "abbr": "KC",
        "off": 0.11704467634758167,
        "def": -0.07136514218244457,
        "offRank": 5,
        "defRank": 6
      },
      {
        "abbr": "LV",
        "off": -0.008157177094214898,
        "def": 0.09352184975711415,
        "offRank": 17,
        "defRank": 31
      },
      {
        "abbr": "LAC",
        "off": -0.17410914624529994,
        "def": 0.004903111740872624,
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
        "def": -0.009649873332632892,
        "offRank": 14,
        "defRank": 10
      },
      {
        "abbr": "PHI",
        "off": -0.10624435589807041,
        "def": 0.0667665458739645,
        "offRank": 30,
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
        "off": 0.03660257103505237,
        "def": -0.01760018088141327,
        "offRank": 10,
        "defRank": 9
      },
      {
        "abbr": "DET",
        "off": 0.10264176365973467,
        "def": 0.03225916638147178,
        "offRank": 7,
        "defRank": 21
      },
      {
        "abbr": "GB",
        "off": 0.01998833442322776,
        "def": -0.03152942686491522,
        "offRank": 12,
        "defRank": 7
      },
      {
        "abbr": "MIN",
        "off": -0.10369863314071613,
        "def": -0.1317385386932399,
        "offRank": 29,
        "defRank": 1
      },
      {
        "abbr": "ATL",
        "off": -0.07526192274728633,
        "def": 0.027420759217500444,
        "offRank": 27,
        "defRank": 19
      },
      {
        "abbr": "CAR",
        "off": 0.01975954771784711,
        "def": 0.01838026062377978,
        "offRank": 13,
        "defRank": 18
      },
      {
        "abbr": "NO",
        "off": -0.030776067906922788,
        "def": 0.04003850145176351,
        "offRank": 22,
        "defRank": 22
      },
      {
        "abbr": "TB",
        "off": -0.08390376713391243,
        "def": -0.12588204204231226,
        "offRank": 28,
        "defRank": 2
      },
      {
        "abbr": "ARI",
        "off": -0.05627630227110696,
        "def": 0.09013845693240119,
        "offRank": 25,
        "defRank": 30
      },
      {
        "abbr": "LAR",
        "off": 0.0678033944915609,
        "def": -0.11320184394313225,
        "offRank": 8,
        "defRank": 3
      },
      {
        "abbr": "SF",
        "off": 0.20963984055597704,
        "def": 0.00468302064245207,
        "offRank": 1,
        "defRank": 14
      },
      {
        "abbr": "SEA",
        "off": -0.020829604600570064,
        "def": -0.08482519802381262,
        "offRank": 21,
        "defRank": 5
      }
    ]
  }
};
