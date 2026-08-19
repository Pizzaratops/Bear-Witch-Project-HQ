// ============================================================
//  LEAGUE_DUES — Liga-Beiträge nach Saison, manuell gepflegt
// ============================================================
//  Traegt nur ein, WER SCHON BEZAHLT HAT (LEAGUE_DUES_PAID). Alles, was
//  hier nicht als bezahlt eingetragen ist, wird automatisch berechnet:
//
//   - Fuer die aktuelle Saison (CURRENT_DUES_YEAR) gilt ohne Eintrag
//     automatisch "muss zahlen" -- jeder zahlt jedes Jahr.
//   - Fuer Zukunftsjahre gilt "offen" (noch nicht relevant), AUSSER das
//     Team taucht in FUTURE_PICKS (data/trades.js) fuer dieses Jahr auf
//     (als urspruenglicher Besitzer "from" ODER als aktueller Besitzer
//     "owner" eines getradeten Picks) -- dann gilt automatisch "muss
//     zahlen", weil wer einen Zukunfts-Pick tradet, ab sofort fuer diese
//     Saison beitragspflichtig ist.
//
//  Zum Eintragen einer Zahlung: { team, year } unten ergaenzen. team =
//  exakter Name aus data/teams.js (LEAGUE_TEAMS).
// ============================================================

const DUES_YEARS = [2026, 2027, 2028, 2029];
const CURRENT_DUES_YEAR = 2026;

const LEAGUE_DUES_PAID = [
  { team: "The Bear Witch Project", year: 2026 },
  { team: "Burrowhead Dancers", year: 2026 },
  { team: "Fred Bulls", year: 2026 },
  { team: "Lion Cereals", year: 2026 },
  { team: "Vice City Crackheads", year: 2026 },
  { team: "Beastmode", year: 2026 },
  { team: "Angry Ducks", year: 2026 },
  { team: "Team Beermode", year: 2026 },
  { team: "Running Bisons", year: 2026 },
  { team: "The Lamartrix", year: 2026 },
  { team: "Charged UP", year: 2026 },
  { team: "London NoPuntsIntended", year: 2026 },
];

// Rueckgabe: "paid" | "owes" | "not-relevant"
function leagueDuesStatus(teamName, year) {
  const paid = LEAGUE_DUES_PAID.some(d => d.team === teamName && d.year === year);
  if (paid) return "paid";
  if (year <= CURRENT_DUES_YEAR) return "owes";
  const picks = (typeof FUTURE_PICKS !== 'undefined' ? (FUTURE_PICKS[year] || []) : []);
  const involved = picks.some(p => p.from === teamName || p.owner === teamName);
  return involved ? "owes" : "not-relevant";
}
