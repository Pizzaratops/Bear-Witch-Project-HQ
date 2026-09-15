// ============================================================
// Bear Witch Project HQ — Status Report Konfiguration
// ============================================================
// Listet alle ESPN- und Sleeper-Football-Ligen, die im "Status Report"-
// Tab zusammengefasst werden: eigenes Team je Liga, Spieler-Status
// (Q/D/O/IR/...) und ein ⚡-Flag, wenn ein STARTER betroffen ist.
//
// ESPN: "eigenes Team" wird automatisch über die SWID aus den
// ESPN_S2/SWID Secrets erkannt (team.owners enthält die SWID des
// eingeloggten Accounts) -- es muss also keine Team-ID gepflegt werden.
// Neue ESPN-Football-Liga dazu? Einfach unten einen Eintrag ergänzen.
//
// Sleeper: "eigenes Team" wird über den Usernamen aufgelöst (öffentliche
// API, kein Login/Cookie nötig). Alle Ligen des Users für die Season
// werden automatisch gefunden -- keine Liga-ID nötig.
//
// Wird von scripts/sync-status-report.js gelesen (Node) UND ist NICHT
// im Frontend eingebunden (nur die Liga-IDs/Namen, keine Geheimnisse).
// ============================================================

const STATUS_REPORT_ESPN_LEAGUES = [
  { id: 91260355,   season: 2026, name: "Foodball",               emoji: "🐻" },
  { id: 320102468,  season: 2026, name: "Blood, Sweat and Bears", emoji: "🩸" },
  { id: 783491558,  season: 2026, name: "Wild Hunt",              emoji: "🏹" },
  { id: 1340233816, season: 2026, name: "I Broke My Back",        emoji: "🦴" },
];

const STATUS_REPORT_SLEEPER_USERNAME = "Milchreis";
const STATUS_REPORT_SLEEPER_SEASON = "2026";

// Status-Codes, bei denen ein STARTER (kein Bench-/IR-Slot) das
// ⚡-Flag bekommt, weil vermutlich gehandelt werden muss (Swap etc.).
// "Q" (Questionable) ist bewusst NICHT dabei -- die spielen meistens doch.
const STATUS_REPORT_ACTION_STATUSES = ["O", "D", "IR", "SUSP", "PUP", "NFI"];
