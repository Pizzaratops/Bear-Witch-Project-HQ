// ============================================================
//  NFL_STANDINGS / NFL_OFFDEF — automatisch synchronisiert (nflverse)
// ============================================================
//  AUTO-GENERIERT von scripts/sync-espn-nfl-standings.js über die
//  GitHub Action ".github/workflows/sync-espn-nfl-standings.yml".
//  Nicht von Hand editieren — Änderungen werden beim nächsten Sync
//  überschrieben.
//  Zuletzt synchronisiert: 2026-09-14T14:40:01.774Z
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
        "losses": 0,
        "ties": 0,
        "winPct": 0,
        "pf": 0,
        "pa": 0
      },
      {
        "name": "Kansas City Chiefs",
        "abbr": "KC",
        "conference": "AFC",
        "division": "West",
        "wins": 0,
        "losses": 0,
        "ties": 0,
        "winPct": 0,
        "pf": 0,
        "pa": 0
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
        "defRank": 21
      },
      {
        "abbr": "MIA",
        "off": -0.17898571928177245,
        "def": -0.06838564818827529,
        "offRank": 28,
        "defRank": 12
      },
      {
        "abbr": "NE",
        "off": -0.11476709572215812,
        "def": 0.06702934981175739,
        "offRank": 23,
        "defRank": 19
      },
      {
        "abbr": "NYJ",
        "off": 0.11937797397659475,
        "def": -0.12636010751964674,
        "offRank": 9,
        "defRank": 9
      },
      {
        "abbr": "BAL",
        "off": 0.2742355649161935,
        "def": -0.14048522460362214,
        "offRank": 4,
        "defRank": 8
      },
      {
        "abbr": "CIN",
        "off": -0.05295377381038382,
        "def": -0.14467008187398625,
        "offRank": 20,
        "defRank": 7
      },
      {
        "abbr": "CLE",
        "off": -0.10805329408439328,
        "def": 0.3258707634275909,
        "offRank": 22,
        "defRank": 31
      },
      {
        "abbr": "PIT",
        "off": -0.25261409391187245,
        "def": -0.34523256498341776,
        "offRank": 30,
        "defRank": 1
      },
      {
        "abbr": "HOU",
        "off": 0.07186088112522786,
        "def": 0.2384285770964398,
        "offRank": 12,
        "defRank": 27
      },
      {
        "abbr": "IND",
        "off": -0.14048522460362214,
        "def": 0.2742355649161935,
        "offRank": 25,
        "defRank": 29
      },
      {
        "abbr": "JAX",
        "off": 0.3258707634275909,
        "def": -0.10805329408439328,
        "offRank": 2,
        "defRank": 11
      },
      {
        "abbr": "TEN",
        "off": -0.12636010751964674,
        "def": 0.11937797397659475,
        "offRank": 24,
        "defRank": 24
      },
      {
        "abbr": "DEN",
        "off": 0,
        "def": 0,
        "offRank": 16,
        "defRank": 16
      },
      {
        "abbr": "KC",
        "off": 0,
        "def": 0,
        "offRank": 17,
        "defRank": 17
      },
      {
        "abbr": "LV",
        "off": -0.06838564818827529,
        "def": -0.17898571928177245,
        "offRank": 21,
        "defRank": 5
      },
      {
        "abbr": "LAC",
        "off": -0.2592064411668011,
        "def": 0.1185493786751521,
        "offRank": 31,
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
        "offRank": 11,
        "defRank": 18
      },
      {
        "abbr": "WSH",
        "off": 0.06171184562309984,
        "def": 0.072436683950652,
        "offRank": 15,
        "defRank": 22
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
        "offRank": 13,
        "defRank": 14
      },
      {
        "abbr": "GB",
        "off": -0.18592572103532173,
        "def": -0.0199355796604399,
        "offRank": 29,
        "defRank": 15
      },
      {
        "abbr": "MIN",
        "off": -0.0199355796604399,
        "def": -0.18592572103532173,
        "offRank": 18,
        "defRank": 4
      },
      {
        "abbr": "ATL",
        "off": -0.34523256498341776,
        "def": -0.25261409391187245,
        "offRank": 32,
        "defRank": 3
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
        "offRank": 19,
        "defRank": 20
      },
      {
        "abbr": "TB",
        "off": -0.14467008187398625,
        "def": -0.05295377381038382,
        "offRank": 26,
        "defRank": 13
      },
      {
        "abbr": "ARI",
        "off": 0.1185493786751521,
        "def": -0.2592064411668011,
        "offRank": 10,
        "defRank": 2
      },
      {
        "abbr": "LAR",
        "off": -0.1616524680458384,
        "def": 0.17876756143518172,
        "offRank": 27,
        "defRank": 25
      },
      {
        "abbr": "SF",
        "off": 0.17876756143518172,
        "def": -0.1616524680458384,
        "offRank": 8,
        "defRank": 6
      },
      {
        "abbr": "SEA",
        "off": 0.06702934981175739,
        "def": -0.11476709572215812,
        "offRank": 14,
        "defRank": 10
      }
    ]
  }
};
