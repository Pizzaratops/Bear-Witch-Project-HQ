// ============================================================
//  NFL PROFILE COMP LOADER — laedt data/nfl-profile-comp.js nach
// ============================================================
//  Gleiches Lazy-Load-Muster wie _dnaLoad() (js/player-dna.js) und
//  _collegeScoutingLoad() (js/college-scouting-loader.js): nur bei Bedarf
//  nachladen (sobald die geplante Frontend-Karte "NFL Profile Comp"
//  geoeffnet wird), nicht ueber einen normalen <script>-Tag in index.html.
//
//  Struktur der Daten (siehe scripts/build-nfl-profile-comp.js):
//    NFL_PROFILE_COMP.comps[Pos][playerId] = Top-10 historische Comps
//      (Mahalanobis auf Production+Groesse), jeweils MIT dem tatsaechlichen
//      Draft-Ergebnis + RAS-Score DIESES Comps als Kontext-Info.
//    NFL_PROFILE_COMP.stats[Pos] = { poolSize, matched, unmatched,
//      targetsWithComps } -- fuer eine Konfidenz-/Debug-Anzeige.
//
//  WICHTIG (siehe Projekt-Doc Abschnitt 6): UI-Text fuer diese Karte immer
//  "Profiliert wie … (Pre-Draft-Rollenarchetyp, KEINE Erfolgsprognose)" --
//  niemals mit College Production Comp ("Produziert wie …") vermischen.
// ============================================================

let _nflProfileCompLoading = null;

function _nflProfileCompLoad() {
  if (typeof NFL_PROFILE_COMP !== 'undefined') return Promise.resolve();
  if (_nflProfileCompLoading) return _nflProfileCompLoading;
  _nflProfileCompLoading = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'data/nfl-profile-comp.js?v=' + Math.floor(Date.now() / 3600000); // stuendlich frisch
    s.onload = () => resolve();
    s.onerror = () => { _nflProfileCompLoading = null; reject(new Error('data/nfl-profile-comp.js nicht ladbar')); };
    document.head.appendChild(s);
  });
  return _nflProfileCompLoading;
}
