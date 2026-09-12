// ============================================================
//  NFL_STANDINGS / NFL_OFFDEF — automatisch synchronisiert (nflverse)
// ============================================================
//  AUTO-GENERIERT von scripts/sync-espn-nfl-standings.js über die
//  GitHub Action ".github/workflows/sync-espn-nfl-standings.yml".
//  Nicht von Hand editieren — Änderungen werden beim nächsten Sync
//  überschrieben.
//  Zuletzt synchronisiert: 2026-09-12T11:23:43.119Z
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
        "wins": 0,
        "losses": 0,
        "ties": 0,
        "winPct": 0,
        "pf": 0,
        "pa": 0
      },
      {
        "name": "Miami Dolphins",
        "abbr": "MIA",
        "conference": "AFC",
        "division": "East",
        "wins": 0,
        "losses": 0,
        "ties": 0,
        "winPct": 0,
        "pf": 0,
        "pa": 0
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
        "wins": 0,
        "losses": 0,
        "ties": 0,
        "winPct": 0,
        "pf": 0,
        "pa": 0
      },
      {
        "name": "Baltimore Ravens",
        "abbr": "BAL",
        "conference": "AFC",
        "division": "North",
        "wins": 0,
        "losses": 0,
        "ties": 0,
        "winPct": 0,
        "pf": 0,
        "pa": 0
      },
      {
        "name": "Cincinnati Bengals",
        "abbr": "CIN",
        "conference": "AFC",
        "division": "North",
        "wins": 0,
        "losses": 0,
        "ties": 0,
        "winPct": 0,
        "pf": 0,
        "pa": 0
      },
      {
        "name": "Cleveland Browns",
        "abbr": "CLE",
        "conference": "AFC",
        "division": "North",
        "wins": 0,
        "losses": 0,
        "ties": 0,
        "winPct": 0,
        "pf": 0,
        "pa": 0
      },
      {
        "name": "Pittsburgh Steelers",
        "abbr": "PIT",
        "conference": "AFC",
        "division": "North",
        "wins": 0,
        "losses": 0,
        "ties": 0,
        "winPct": 0,
        "pf": 0,
        "pa": 0
      },
      {
        "name": "Houston Texans",
        "abbr": "HOU",
        "conference": "AFC",
        "division": "South",
        "wins": 0,
        "losses": 0,
        "ties": 0,
        "winPct": 0,
        "pf": 0,
        "pa": 0
      },
      {
        "name": "Indianapolis Colts",
        "abbr": "IND",
        "conference": "AFC",
        "division": "South",
        "wins": 0,
        "losses": 0,
        "ties": 0,
        "winPct": 0,
        "pf": 0,
        "pa": 0
      },
      {
        "name": "Jacksonville Jaguars",
        "abbr": "JAX",
        "conference": "AFC",
        "division": "South",
        "wins": 0,
        "losses": 0,
        "ties": 0,
        "winPct": 0,
        "pf": 0,
        "pa": 0
      },
      {
        "name": "Tennessee Titans",
        "abbr": "TEN",
        "conference": "AFC",
        "division": "South",
        "wins": 0,
        "losses": 0,
        "ties": 0,
        "winPct": 0,
        "pf": 0,
        "pa": 0
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
        "wins": 0,
        "losses": 0,
        "ties": 0,
        "winPct": 0,
        "pf": 0,
        "pa": 0
      },
      {
        "name": "Los Angeles Chargers",
        "abbr": "LAC",
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
        "name": "Dallas Cowboys",
        "abbr": "DAL",
        "conference": "NFC",
        "division": "East",
        "wins": 0,
        "losses": 0,
        "ties": 0,
        "winPct": 0,
        "pf": 0,
        "pa": 0
      },
      {
        "name": "New York Giants",
        "abbr": "NYG",
        "conference": "NFC",
        "division": "East",
        "wins": 0,
        "losses": 0,
        "ties": 0,
        "winPct": 0,
        "pf": 0,
        "pa": 0
      },
      {
        "name": "Philadelphia Eagles",
        "abbr": "PHI",
        "conference": "NFC",
        "division": "East",
        "wins": 0,
        "losses": 0,
        "ties": 0,
        "winPct": 0,
        "pf": 0,
        "pa": 0
      },
      {
        "name": "Washington Commanders",
        "abbr": "WSH",
        "conference": "NFC",
        "division": "East",
        "wins": 0,
        "losses": 0,
        "ties": 0,
        "winPct": 0,
        "pf": 0,
        "pa": 0
      },
      {
        "name": "Chicago Bears",
        "abbr": "CHI",
        "conference": "NFC",
        "division": "North",
        "wins": 0,
        "losses": 0,
        "ties": 0,
        "winPct": 0,
        "pf": 0,
        "pa": 0
      },
      {
        "name": "Detroit Lions",
        "abbr": "DET",
        "conference": "NFC",
        "division": "North",
        "wins": 0,
        "losses": 0,
        "ties": 0,
        "winPct": 0,
        "pf": 0,
        "pa": 0
      },
      {
        "name": "Green Bay Packers",
        "abbr": "GB",
        "conference": "NFC",
        "division": "North",
        "wins": 0,
        "losses": 0,
        "ties": 0,
        "winPct": 0,
        "pf": 0,
        "pa": 0
      },
      {
        "name": "Minnesota Vikings",
        "abbr": "MIN",
        "conference": "NFC",
        "division": "North",
        "wins": 0,
        "losses": 0,
        "ties": 0,
        "winPct": 0,
        "pf": 0,
        "pa": 0
      },
      {
        "name": "Atlanta Falcons",
        "abbr": "ATL",
        "conference": "NFC",
        "division": "South",
        "wins": 0,
        "losses": 0,
        "ties": 0,
        "winPct": 0,
        "pf": 0,
        "pa": 0
      },
      {
        "name": "Carolina Panthers",
        "abbr": "CAR",
        "conference": "NFC",
        "division": "South",
        "wins": 0,
        "losses": 0,
        "ties": 0,
        "winPct": 0,
        "pf": 0,
        "pa": 0
      },
      {
        "name": "New Orleans Saints",
        "abbr": "NO",
        "conference": "NFC",
        "division": "South",
        "wins": 0,
        "losses": 0,
        "ties": 0,
        "winPct": 0,
        "pf": 0,
        "pa": 0
      },
      {
        "name": "Tampa Bay Buccaneers",
        "abbr": "TB",
        "conference": "NFC",
        "division": "South",
        "wins": 0,
        "losses": 0,
        "ties": 0,
        "winPct": 0,
        "pf": 0,
        "pa": 0
      },
      {
        "name": "Arizona Cardinals",
        "abbr": "ARI",
        "conference": "NFC",
        "division": "West",
        "wins": 0,
        "losses": 0,
        "ties": 0,
        "winPct": 0,
        "pf": 0,
        "pa": 0
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
        "off": 0,
        "def": 0,
        "offRank": 3,
        "defRank": 3
      },
      {
        "abbr": "MIA",
        "off": 0,
        "def": 0,
        "offRank": 4,
        "defRank": 4
      },
      {
        "abbr": "NE",
        "off": -0.11476709572215812,
        "def": 0.06702934981175739,
        "offRank": 31,
        "defRank": 31
      },
      {
        "abbr": "NYJ",
        "off": 0,
        "def": 0,
        "offRank": 5,
        "defRank": 5
      },
      {
        "abbr": "BAL",
        "off": 0,
        "def": 0,
        "offRank": 6,
        "defRank": 6
      },
      {
        "abbr": "CIN",
        "off": 0,
        "def": 0,
        "offRank": 7,
        "defRank": 7
      },
      {
        "abbr": "CLE",
        "off": 0,
        "def": 0,
        "offRank": 8,
        "defRank": 8
      },
      {
        "abbr": "PIT",
        "off": 0,
        "def": 0,
        "offRank": 9,
        "defRank": 9
      },
      {
        "abbr": "HOU",
        "off": 0,
        "def": 0,
        "offRank": 10,
        "defRank": 10
      },
      {
        "abbr": "IND",
        "off": 0,
        "def": 0,
        "offRank": 11,
        "defRank": 11
      },
      {
        "abbr": "JAX",
        "off": 0,
        "def": 0,
        "offRank": 12,
        "defRank": 12
      },
      {
        "abbr": "TEN",
        "off": 0,
        "def": 0,
        "offRank": 13,
        "defRank": 13
      },
      {
        "abbr": "DEN",
        "off": 0,
        "def": 0,
        "offRank": 14,
        "defRank": 14
      },
      {
        "abbr": "KC",
        "off": 0,
        "def": 0,
        "offRank": 15,
        "defRank": 15
      },
      {
        "abbr": "LV",
        "off": 0,
        "def": 0,
        "offRank": 16,
        "defRank": 16
      },
      {
        "abbr": "LAC",
        "off": 0,
        "def": 0,
        "offRank": 17,
        "defRank": 17
      },
      {
        "abbr": "DAL",
        "off": 0,
        "def": 0,
        "offRank": 18,
        "defRank": 18
      },
      {
        "abbr": "NYG",
        "off": 0,
        "def": 0,
        "offRank": 19,
        "defRank": 19
      },
      {
        "abbr": "PHI",
        "off": 0,
        "def": 0,
        "offRank": 20,
        "defRank": 20
      },
      {
        "abbr": "WSH",
        "off": 0,
        "def": 0,
        "offRank": 21,
        "defRank": 21
      },
      {
        "abbr": "CHI",
        "off": 0,
        "def": 0,
        "offRank": 22,
        "defRank": 22
      },
      {
        "abbr": "DET",
        "off": 0,
        "def": 0,
        "offRank": 23,
        "defRank": 23
      },
      {
        "abbr": "GB",
        "off": 0,
        "def": 0,
        "offRank": 24,
        "defRank": 24
      },
      {
        "abbr": "MIN",
        "off": 0,
        "def": 0,
        "offRank": 25,
        "defRank": 25
      },
      {
        "abbr": "ATL",
        "off": 0,
        "def": 0,
        "offRank": 26,
        "defRank": 26
      },
      {
        "abbr": "CAR",
        "off": 0,
        "def": 0,
        "offRank": 27,
        "defRank": 27
      },
      {
        "abbr": "NO",
        "off": 0,
        "def": 0,
        "offRank": 28,
        "defRank": 28
      },
      {
        "abbr": "TB",
        "off": 0,
        "def": 0,
        "offRank": 29,
        "defRank": 29
      },
      {
        "abbr": "ARI",
        "off": 0,
        "def": 0,
        "offRank": 30,
        "defRank": 30
      },
      {
        "abbr": "LAR",
        "off": -0.1616524680458384,
        "def": 0.17876756143518172,
        "offRank": 32,
        "defRank": 32
      },
      {
        "abbr": "SF",
        "off": 0.17876756143518172,
        "def": -0.1616524680458384,
        "offRank": 1,
        "defRank": 1
      },
      {
        "abbr": "SEA",
        "off": 0.06702934981175739,
        "def": -0.11476709572215812,
        "offRank": 2,
        "defRank": 2
      }
    ]
  }
};
