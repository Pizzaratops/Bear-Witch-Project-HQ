// ============================================================
//  WEEKLY_SCORES — wöchentliche ESPN-Matchup-Punktzahlen
// ============================================================
//  Wird automatisch von scripts/sync-espn-weekly-scores.js befüllt,
//  sobald die Saison läuft und ESPN echte Matchup-Daten liefert (vorher
//  bleibt das Objekt leer — vor Woche 1 gibt es nichts zu synken).
//
//  Struktur: WEEKLY_SCORES[season][week] = [
//    { teamId, points, opponentId, opponentPoints }, ...
//  ]
// ============================================================

const WEEKLY_SCORES = {
  2026: {}
};
