// ============================================================
//  ESPN FANTASY SYNC — Konfiguration (Foodball / Bear Witch Project HQ)
// ============================================================
//  Analog zu Taco Tuesday HQs js/espn-sync.js, aber fuer American
//  Football (ESPN "ffl" statt "fba").
//
//  WICHTIG — noch zu pruefen/anzupassen:
//  1) ESPN_SEASON: Bei ESPN Fantasy Football entspricht die Season-ID
//     normalerweise direkt dem Kalenderjahr der Saison (2026er Saison
//     = seasonId 2026), IM GEGENSATZ zur NBA-Liga, wo TTHQ das End-
//     jahr nutzt. Falls der Sync leer/falsch zurückkommt, hier zuerst
//     pruefen.
//  2) Falls die Liga NICHT oeffentlich ist, liefert ESPN ohne Login
//     einen 401. Dann werden zwei zusaetzliche Cookies als GitHub
//     Secrets gebraucht: ESPN_S2 und SWID (aus dem Browser, wenn man
//     bei fantasy.espn.com eingeloggt ist -- DevTools > Application >
//     Cookies). scripts/sync-espn-rosters.js liest sie automatisch aus
//     process.env, falls gesetzt.
// ============================================================

const ESPN_LEAGUE_ID = 91260355;
const ESPN_SEASON    = 2026;

// ESPN player.defaultPositionId -> unsere Positions-Kuerzel.
const ESPN_POS_MAP = {
  1: 'QB', 2: 'RB', 3: 'WR', 4: 'TE', 5: 'K', 16: 'DST',
};

// ESPN player.proTeamId -> NFL-Team-Kuerzel (Standard-ESPN-Mapping, stabil seit Jahren).
const ESPN_NFL_MAP = {
  0:'FA', 1:'ATL', 2:'BUF', 3:'CHI', 4:'CIN', 5:'CLE', 6:'DAL', 7:'DEN',
  8:'DET', 9:'GB', 10:'TEN', 11:'IND', 12:'KC', 13:'LV', 14:'LAR',
  15:'MIA', 16:'MIN', 17:'NE', 18:'NO', 19:'NYG', 20:'NYJ', 21:'PHI',
  22:'ARI', 23:'PIT', 24:'LAC', 25:'SF', 26:'SEA', 27:'TB', 28:'WSH',
  29:'CAR', 30:'JAX', 33:'BAL', 34:'HOU',
};

// ESPN-Team-IDs sind uns noch nicht bekannt (die Liga wurde bislang nicht
// gesynct). Statt sie hart zu mappen, matcht scripts/sync-espn-rosters.js
// die ESPN-Teamnamen automatisch per Namensvergleich gegen LEAGUE_TEAMS
// (data/teams.js). Sollte ein Team dabei nicht erkannt werden, gibt das
// Sync-Script eine Warnung mit dem exakten ESPN-Namen aus -- dann hier
// einen manuellen Eintrag ergaenzen:
//
// const ESPN_TO_TEAM_ID_OVERRIDE = { 3: "fred-bulls" }; // ESPN-Team-ID -> unsere id aus teams.js
const ESPN_TO_TEAM_ID_OVERRIDE = {};
