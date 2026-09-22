// ============================================================
//  NFL_STANDINGS / NFL_OFFDEF — automatisch synchronisiert (nflverse)
// ============================================================
//  AUTO-GENERIERT von scripts/sync-espn-nfl-standings.js über die
//  GitHub Action ".github/workflows/sync-espn-nfl-standings.yml".
//  Nicht von Hand editieren — Änderungen werden beim nächsten Sync
//  überschrieben.
//  Zuletzt synchronisiert: 2026-09-22T12:13:37.283Z
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
    ]
  }
};

const NFL_FPI = {};

const NFL_OFFDEF = {
  "2026": {
    "1": [
      {
        "abbr": "BUF",
        "off": 0.2384285770964398,
        "def": 0.07186088112522786,
        "offRank": 6,
        "defRank": 20
      },
      {
        "abbr": "MIA",
        "off": -0.17898571928177245,
        "def": -0.06838564818827529,
        "offRank": 27,
        "defRank": 13
      },
      {
        "abbr": "NE",
        "off": -0.11476709572215812,
        "def": 0.06702934981175739,
        "offRank": 22,
        "defRank": 18
      },
      {
        "abbr": "NYJ",
        "off": 0.11937797397659475,
        "def": -0.12636010751964674,
        "offRank": 9,
        "defRank": 10
      },
      {
        "abbr": "BAL",
        "off": 0.2742355649161935,
        "def": -0.14048522460362214,
        "offRank": 4,
        "defRank": 9
      },
      {
        "abbr": "CIN",
        "off": -0.05295377381038382,
        "def": -0.14467008187398625,
        "offRank": 19,
        "defRank": 8
      },
      {
        "abbr": "CLE",
        "off": -0.10805329408439328,
        "def": 0.3258707634275909,
        "offRank": 21,
        "defRank": 31
      },
      {
        "abbr": "PIT",
        "off": -0.25261409391187245,
        "def": -0.34523256498341776,
        "offRank": 29,
        "defRank": 2
      },
      {
        "abbr": "HOU",
        "off": 0.07186088112522786,
        "def": 0.2384285770964398,
        "offRank": 13,
        "defRank": 27
      },
      {
        "abbr": "IND",
        "off": -0.14048522460362214,
        "def": 0.2742355649161935,
        "offRank": 24,
        "defRank": 29
      },
      {
        "abbr": "JAX",
        "off": 0.3258707634275909,
        "def": -0.10805329408439328,
        "offRank": 2,
        "defRank": 12
      },
      {
        "abbr": "TEN",
        "off": -0.12636010751964674,
        "def": 0.11937797397659475,
        "offRank": 23,
        "defRank": 24
      },
      {
        "abbr": "DEN",
        "off": -0.36784322433006095,
        "def": 0.0959648139122426,
        "offRank": 32,
        "defRank": 22
      },
      {
        "abbr": "KC",
        "off": 0.0959648139122426,
        "def": -0.36784322433006095,
        "offRank": 11,
        "defRank": 1
      },
      {
        "abbr": "LV",
        "off": -0.06838564818827529,
        "def": -0.17898571928177245,
        "offRank": 20,
        "defRank": 6
      },
      {
        "abbr": "LAC",
        "off": -0.2592064411668011,
        "def": 0.1185493786751521,
        "offRank": 30,
        "defRank": 23
      },
      {
        "abbr": "DAL",
        "off": 0.2206700518391498,
        "def": 0.3216817570351077,
        "offRank": 7,
        "defRank": 30
      },
      {
        "abbr": "NYG",
        "off": 0.3216817570351077,
        "def": 0.2206700518391498,
        "offRank": 3,
        "defRank": 26
      },
      {
        "abbr": "PHI",
        "off": 0.072436683950652,
        "def": 0.06171184562309984,
        "offRank": 12,
        "defRank": 17
      },
      {
        "abbr": "WSH",
        "off": 0.06171184562309984,
        "def": 0.072436683950652,
        "offRank": 16,
        "defRank": 21
      },
      {
        "abbr": "CHI",
        "off": 0.48965795888307206,
        "def": 0.2725251340824295,
        "offRank": 1,
        "defRank": 28
      },
      {
        "abbr": "DET",
        "off": 0.07149033001608772,
        "def": -0.032883428193166295,
        "offRank": 14,
        "defRank": 15
      },
      {
        "abbr": "GB",
        "off": -0.18592572103532173,
        "def": -0.0199355796604399,
        "offRank": 28,
        "defRank": 16
      },
      {
        "abbr": "MIN",
        "off": -0.0199355796604399,
        "def": -0.18592572103532173,
        "offRank": 17,
        "defRank": 5
      },
      {
        "abbr": "ATL",
        "off": -0.34523256498341776,
        "def": -0.25261409391187245,
        "offRank": 31,
        "defRank": 4
      },
      {
        "abbr": "CAR",
        "off": 0.2725251340824295,
        "def": 0.48965795888307206,
        "offRank": 5,
        "defRank": 32
      },
      {
        "abbr": "NO",
        "off": -0.032883428193166295,
        "def": 0.07149033001608772,
        "offRank": 18,
        "defRank": 19
      },
      {
        "abbr": "TB",
        "off": -0.14467008187398625,
        "def": -0.05295377381038382,
        "offRank": 25,
        "defRank": 14
      },
      {
        "abbr": "ARI",
        "off": 0.1185493786751521,
        "def": -0.2592064411668011,
        "offRank": 10,
        "defRank": 3
      },
      {
        "abbr": "LAR",
        "off": -0.1616524680458384,
        "def": 0.17876756143518172,
        "offRank": 26,
        "defRank": 25
      },
      {
        "abbr": "SF",
        "off": 0.17876756143518172,
        "def": -0.1616524680458384,
        "offRank": 8,
        "defRank": 7
      },
      {
        "abbr": "SEA",
        "off": 0.06702934981175739,
        "def": -0.11476709572215812,
        "offRank": 15,
        "defRank": 11
      }
    ],
    "2": [
      {
        "abbr": "BUF",
        "off": 0.31435587167084367,
        "def": 0.15187308941353,
        "offRank": 1,
        "defRank": 28
      },
      {
        "abbr": "MIA",
        "off": -0.08361272385959144,
        "def": 0.14706233032116944,
        "offRank": 24,
        "defRank": 26
      },
      {
        "abbr": "NE",
        "off": -0.06036432208420737,
        "def": -0.1903764071003931,
        "offRank": 22,
        "defRank": 4
      },
      {
        "abbr": "NYJ",
        "off": -0.0002799517561100826,
        "def": -0.1819530490850113,
        "offRank": 16,
        "defRank": 5
      },
      {
        "abbr": "BAL",
        "off": 0.20273542560588467,
        "def": 0.021204745864044194,
        "offRank": 4,
        "defRank": 18
      },
      {
        "abbr": "CIN",
        "off": -0.07426429096616027,
        "def": -0.21554754919537156,
        "offRank": 23,
        "defRank": 2
      },
      {
        "abbr": "CLE",
        "off": -0.04389583682322613,
        "def": 0.0777902792867642,
        "offRank": 19,
        "defRank": 22
      },
      {
        "abbr": "PIT",
        "off": -0.3159716183025582,
        "def": -0.17314334500488018,
        "offRank": 31,
        "defRank": 6
      },
      {
        "abbr": "HOU",
        "off": -0.09946094022998639,
        "def": 0.06336447191337688,
        "offRank": 26,
        "defRank": 20
      },
      {
        "abbr": "IND",
        "off": 0.02252112760241763,
        "def": 0.2526144867728205,
        "offRank": 15,
        "defRank": 32
      },
      {
        "abbr": "JAX",
        "off": 0.14172946795869695,
        "def": -0.010883144311458192,
        "offRank": 9,
        "defRank": 15
      },
      {
        "abbr": "TEN",
        "off": -0.020908853891655678,
        "def": 0.07823550367797485,
        "offRank": 18,
        "defRank": 23
      },
      {
        "abbr": "DEN",
        "off": -0.11944978010352461,
        "def": 0.030691554706080842,
        "offRank": 27,
        "defRank": 19
      },
      {
        "abbr": "KC",
        "off": 0.17089295783078726,
        "def": -0.0574066381578517,
        "offRank": 7,
        "defRank": 12
      },
      {
        "abbr": "LV",
        "off": -0.09703411004908491,
        "def": -0.2330884104291039,
        "offRank": 25,
        "defRank": 1
      },
      {
        "abbr": "LAC",
        "off": -0.26755837843881775,
        "def": 0.006740934561353715,
        "offRank": 30,
        "defRank": 16
      },
      {
        "abbr": "DAL",
        "off": 0.22801834372488036,
        "def": 0.22924720485038624,
        "offRank": 3,
        "defRank": 31
      },
      {
        "abbr": "NYG",
        "off": -0.019957271466526455,
        "def": 0.2110841167086629,
        "offRank": 17,
        "defRank": 30
      },
      {
        "abbr": "PHI",
        "off": 0.05401771699579673,
        "def": 0.06868874467235696,
        "offRank": 12,
        "defRank": 21
      },
      {
        "abbr": "WSH",
        "off": 0.10023957963841239,
        "def": 0.15549901224788598,
        "offRank": 11,
        "defRank": 29
      },
      {
        "abbr": "CHI",
        "off": 0.18242954029997022,
        "def": 0.11462227764877111,
        "offRank": 6,
        "defRank": 25
      },
      {
        "abbr": "DET",
        "off": 0.15043690405634005,
        "def": 0.14996385437175844,
        "offRank": 8,
        "defRank": 27
      },
      {
        "abbr": "GB",
        "off": -0.20747626403843245,
        "def": -0.0691567433403286,
        "offRank": 29,
        "defRank": 11
      },
      {
        "abbr": "MIN",
        "off": -0.04838269508664156,
        "def": -0.1594147537137842,
        "offRank": 20,
        "defRank": 7
      },
      {
        "abbr": "ATL",
        "off": -0.4274628525849561,
        "def": -0.08050185846551733,
        "offRank": 32,
        "defRank": 10
      },
      {
        "abbr": "CAR",
        "off": 0.18943524450525237,
        "def": 0.011976616634319532,
        "offRank": 5,
        "defRank": 17
      },
      {
        "abbr": "NO",
        "off": 0.04842338245007894,
        "def": 0.09167418144824845,
        "offRank": 13,
        "defRank": 24
      },
      {
        "abbr": "TB",
        "off": -0.14952302878296936,
        "def": -0.024232045290290667,
        "offRank": 28,
        "defRank": 14
      },
      {
        "abbr": "ARI",
        "off": -0.05921625813095201,
        "def": -0.03059342511506043,
        "offRank": 21,
        "defRank": 13
      },
      {
        "abbr": "LAR",
        "off": 0.02363192741735346,
        "def": -0.10397254134172759,
        "offRank": 14,
        "defRank": 8
      },
      {
        "abbr": "SF",
        "off": 0.29276276705948434,
        "def": -0.08504832592030642,
        "offRank": 2,
        "defRank": 9
      },
      {
        "abbr": "SEA",
        "off": 0.10747865003777145,
        "def": -0.20762555922334267,
        "offRank": 10,
        "defRank": 3
      }
    ]
  }
};
