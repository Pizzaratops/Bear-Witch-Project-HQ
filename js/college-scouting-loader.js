// ============================================================
//  COLLEGE SCOUTING LOADER — laedt data/college-scouting.js nach
// ============================================================
//  Gleiches Muster wie _dnaLoad() in js/player-dna.js: die Datendatei
//  (~5 MB, waechst mit jedem weiteren Jahrgang) wird NICHT ueber einen
//  normalen <script>-Tag in index.html geladen (wuerde jeden Seitenaufruf
//  verlangsamen, auch wenn niemand die College-Scouting-Karte oeffnet),
//  sondern erst bei Bedarf per _collegeScoutingLoad() nachgeladen --
//  also aufrufen, sobald die geplante Frontend-Karte geoeffnet wird
//  (analog zu _dnaLoad() in openPlayerDna()).
//
//  Struktur der Daten (siehe scripts/sync-college-scouting.js):
//    COLLEGE_SCOUTING.seasons[Jahr][Pos]   volle Historie (Cache-Basis)
//    COLLEGE_SCOUTING.recent[Pos]          nur die juengsten Jahrgaenge
//    COLLEGE_SCOUTING.comps[Pos][playerId] vorberechnete Mahalanobis-Comps
// ============================================================

let _collegeScoutingLoading = null;

function _collegeScoutingLoad() {
  if (typeof COLLEGE_SCOUTING !== 'undefined') return Promise.resolve();
  if (_collegeScoutingLoading) return _collegeScoutingLoading;
  _collegeScoutingLoading = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'data/college-scouting.js?v=' + Math.floor(Date.now() / 3600000); // stuendlich frisch
    s.onload = () => resolve();
    s.onerror = () => { _collegeScoutingLoading = null; reject(new Error('data/college-scouting.js nicht ladbar')); };
    document.head.appendChild(s);
  });
  return _collegeScoutingLoading;
}
