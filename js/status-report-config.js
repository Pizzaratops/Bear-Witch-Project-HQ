// ============================================================
// Bear Witch Project HQ — Status Report Konfiguration
// ============================================================
// Listet alle Personen mit ihren ESPN- und Sleeper-Football-Ligen, die
// im "Status Report"-Tab zusammengefasst werden: eigenes Team je Liga,
// Spieler-Status (Q/D/O/IR/...) und ein ⚡-Flag, wenn ein STARTER
// betroffen ist.
//
// ESPN: "eigenes Team" wird automatisch über die SWID erkannt
// (team.owners enthält die SWID des eingeloggten Accounts) -- es muss
// also keine Team-ID gepflegt werden. Für PRIVATE Ligen braucht die
// jeweilige Person ihre eigenen espn_s2/SWID-Cookies (DevTools >
// Application > Cookies auf fantasy.espn.com, während man dort
// eingeloggt ist) als GitHub Secrets:
//   - Für dich (credentialKey: null)         -> Secrets ESPN_S2 / SWID
//   - Für eine andere Person (credentialKey: "FELIX")
//                                             -> Secrets ESPN_S2_FELIX / SWID_FELIX
// ACHTUNG: Diese Cookies sind aequivalent zu einem Login bei ESPN --
// nur speichern, wenn die Person das wirklich moechte und weiss, was
// sie damit teilt. Nur als GitHub Secret ablegen, NIE hier im Code!
//
// Sleeper: "eigenes Team" wird über den Usernamen aufgelöst (öffentliche
// API, kein Login/Cookie nötig). Alle Ligen des Users für die Season
// werden automatisch gefunden -- keine Liga-ID nötig.
//
// Wird von scripts/sync-status-report.js gelesen (Node) UND ist NICHT
// im Frontend eingebunden (nur IDs/Namen/Usernamen, keine Geheimnisse).
//
// HINWEIS: data/status-report.js (das Sync-Ergebnis: Roster + Verletz-
// tenstatus) wird ins Repo committet und ist damit oeffentlich sichtbar
// (GitHub Pages). Wer hier ergaenzt wird, sollte das wissen.
// ============================================================

const STATUS_REPORT_PEOPLE = [
  {
    id: "beyaz",
    label: "Du",
    credentialKey: null, // -> nutzt die bestehenden Secrets ESPN_S2 / SWID
    espnLeagues: [
      { id: 91260355,   season: 2026, name: "Foodball",               emoji: "🐻" },
      { id: 320102468,  season: 2026, name: "Blood, Sweat and Bears", emoji: "🩸" },
      { id: 783491558,  season: 2026, name: "Wild Hunt",              emoji: "🏹" },
      { id: 1340233816, season: 2026, name: "I Broke My Back",        emoji: "🦴" },
    ],
    sleeperUsername: "Milchreis",
    sleeperSeason: "2026",
  },

  // Freunde hier ergänzen, sobald sie ihre Liga-IDs / ihren Sleeper-
  // Usernamen geschickt haben. Beispiel (auskommentiert):
  //
  // {
  //   id: "felix",
  //   label: "Felix",
  //   credentialKey: "FELIX",        // erwartet Secrets ESPN_S2_FELIX / SWID_FELIX
  //   espnLeagues: [
  //     { id: 12345678, season: 2026, name: "Seine Privatliga", emoji: "🏈" },
  //   ],
  //   sleeperUsername: "SeinSleeperName",
  //   sleeperSeason: "2026",
  // },
];

// Status-Codes, bei denen ein STARTER (kein Bench-/IR-Slot) das
// ⚡-Flag bekommt, weil vermutlich gehandelt werden muss (Swap etc.).
// "Q" (Questionable) ist bewusst NICHT dabei -- die spielen meistens doch.
const STATUS_REPORT_ACTION_STATUSES = ["O", "D", "IR", "SUSP", "PUP", "NFI"];
