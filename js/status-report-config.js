// ============================================================
// Bear Witch Project HQ — Status Report Konfiguration
// ============================================================
// Listet alle Personen mit ihren ESPN- und Sleeper-Football-Ligen, die
// im "Status Report"-Tab zusammengefasst werden: eigenes Team je Liga,
// Spieler-Status (Q/D/O/IR/...) und ein ⚡-Flag, wenn ein STARTER
// betroffen ist.
//
// ESPN: "eigenes Team" wird automatisch über die SWID erkannt
// (team.owners enthält die SWID des jeweiligen Accounts) -- es muss also
// keine Team-ID gepflegt werden. Zwei Faelle:
//
//  1) Person ist Mitglied EINER Liga, die schon jemand anderes (z.B. du)
//     per eigenem Login abruft: dann reicht die SWID dieser Person als
//     Secret (SWID_<KEY>), OHNE ihr espn_s2 -- wir lesen die Liga mit dem
//     Login der Person, die schon Zugriff hat (credentialKey der Liga
//     bleibt weg/null), suchen darin aber per identityCredentialKey nach
//     dem Team dieser anderen Person. Siehe "felix" unten fuer die
//     4 gemeinsamen Ligen.
//
//  2) Person hat eine EIGENE (private) Liga, in der sonst niemand von uns
//     Mitglied ist: dann braucht es ihre vollen espn_s2/SWID-Cookies
//     (DevTools > Application > Cookies auf fantasy.espn.com, waehrend
//     sie dort eingeloggt ist) als GitHub Secrets ESPN_S2_<KEY>/SWID_<KEY>,
//     und die betroffene Liga bekommt credentialKey: "<KEY>". Siehe
//     Felix' eigene Liga (519920608) unten.
//
// Secret-Namenskonvention:
//   - Für dich (credentialKey: null)              -> Secrets ESPN_S2 / SWID
//   - Für eine andere Person (credentialKey: "FELIX") -> Secrets ESPN_S2_FELIX / SWID_FELIX
//
// ACHTUNG: espn_s2 ist aequivalent zu einem Login bei ESPN -- nur
// speichern (Fall 2), wenn die Person das wirklich moechte und weiss,
// was sie damit teilt. Die reine SWID (Fall 1) identifiziert nur den
// Account, ist aber trotzdem kein Wert, den man leichtfertig herumreicht.
// Beides NUR als GitHub Secret ablegen, NIE hier im Code!
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
//
// WICHTIG: "label" hier ist der Kachel-Name im Frontend UND der Schluessel
// fuer den Passwort-Vorhang in js/app.js (STATUS_REPORT_GATE). Wird ein
// "label" hier geaendert, muss der Eintrag in STATUS_REPORT_GATE in
// js/app.js identisch mitgeaendert werden, sonst greift das Passwort nicht.
// ============================================================

const STATUS_REPORT_PEOPLE = [
  {
    id: "beyaz",
    label: "Bear Down",
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

  {
    id: "felix",
    label: "TeamBeermode",
    // Gilt als Default fuer alle seine Ligen unten: das Team wird ueber
    // die SWID_FELIX-Secret erkannt (Owner-Match), auch wenn die Liga mit
    // jemand anderes Login abgerufen wird (siehe espnLeagues unten).
    identityCredentialKey: "FELIX",
    espnLeagues: [
      // Gemeinsame Ligen mit dir -- werden mit DEINEN Cookies abgerufen
      // (kein credentialKey hier = Standard-Secrets ESPN_S2/SWID), aber
      // Felix' Team wird über SWID_FELIX (s.o.) darin gefunden.
      { id: 91260355,   season: 2026, name: "Foodball",               emoji: "🐻" },
      { id: 320102468,  season: 2026, name: "Blood, Sweat and Bears", emoji: "🩸" },
      { id: 783491558,  season: 2026, name: "Wild Hunt",              emoji: "🏹" },
      { id: 1340233816, season: 2026, name: "I Broke My Back",        emoji: "🦴" },
      // Seine eigene Liga -- braucht seine vollen Cookies zum Abrufen.
      { id: 519920608,  season: 2026, name: "Felix' Liga",            emoji: "🏈", credentialKey: "FELIX" },
    ],
    sleeperUsername: "TeamBeermode",
    sleeperSeason: "2026",
  },

  // Weitere Freunde hier nach demselben Muster ergänzen.
];

// Status-Codes, bei denen ein STARTER (kein Bench-/IR-Slot) das
// ⚡-Flag bekommt, weil vermutlich gehandelt werden muss (Swap etc.).
// "Q" (Questionable) ist bewusst NICHT dabei -- die spielen meistens doch.
const STATUS_REPORT_ACTION_STATUSES = ["O", "D", "IR", "SUSP", "PUP", "NFI"];
