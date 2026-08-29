// ============================================================
//  NFL_STANDINGS / NFL_FPI — automatisch von ESPN synchronisiert
// ============================================================
//  AUTO-GENERIERT von scripts/sync-espn-nfl-standings.js über die
//  GitHub Action ".github/workflows/sync-espn-nfl-standings.yml".
//  Nicht von Hand editieren — Änderungen werden beim nächsten Sync
//  überschrieben.
//
//  Anders als bei den Fantasy-Weekly-Scores ist hier JEDE Wochen-
//  Momentaufnahme bereits kumulativ (so wie ESPN die NFL-Standings
//  selbst führt) — es muss beim Rendern also NICHT über die Wochen
//  aufsummiert werden, einfach NFL_STANDINGS[season][week] direkt
//  anzeigen.
//
//  NFL_STANDINGS[season][week] = flaches Array aller 32 NFL-Teams:
//    { name, abbr, conference: "AFC"|"NFC", division: "East"|"North"|
//      "South"|"West", wins, losses, ties, winPct, pf, pa }
//
//  NFL_FPI[season][week] = flaches Array (nur befüllt, wenn ESPN's
//  FPI-Endpoint beim jeweiligen Sync-Lauf erreichbar war — optional,
//  fehlt einfach, wenn (noch) nicht verfügbar):
//    { abbr, fpi, fpiRank }
//
//  Noch keine Daten vor Saisonstart / falls die Action noch nie
//  erfolgreich gelaufen ist -- die Seite zeigt dann automatisch einen
//  Hinweis statt einer leeren Tabelle.
// ============================================================

const NFL_STANDINGS = {};
const NFL_FPI = {};
