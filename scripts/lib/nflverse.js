// ============================================================
//  SHARED NFLVERSE HELPERS
// ============================================================
//  Gemeinsame Hilfsfunktionen fuer alle Scripts, die nflverse-Daten
//  (games.csv, stats_team_week_{season}.csv) abrufen und verarbeiten --
//  siehe scripts/sync-espn-nfl-standings.js für die ausfuehrliche
//  Begruendung, warum nflverse statt ESPN (ESPNs oeffentliche Sport-API
//  blockt GitHub-Actions-Runner mit HTTP 403).
//
//  Bewusst ohne externe npm-Dependency (nur Node-Bordmittel), damit die
//  GitHub Actions kein "npm install" brauchen.
// ============================================================

const https = require('https');

function httpsGetText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'bear-witch-project-hq-bot' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return httpsGetText(res.headers.location).then(resolve, reject);
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode} für ${url}`));
      }
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// Minimaler RFC4180-CSV-Parser (Kommas/Anfuehrungszeichen in Feldern wie
// Stadionnamen werden korrekt behandelt).
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += c;
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      row.push(field); field = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field); field = '';
      if (row.length > 1 || row[0] !== '') rows.push(row);
      row = [];
    } else {
      field += c;
    }
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row); }
  const header = rows.shift();
  return rows.map(r => {
    const obj = {};
    header.forEach((h, i) => { obj[h] = r[i] ?? ''; });
    return obj;
  });
}

// nflverse verwendet fuer manche Teams andere Kuerzel als der Rest dieser
// Seite (data/draft2026.js etc.) -- hier auf unsere Konvention normalisieren.
const TEAM_ABBR_NORMALIZE = {
  LA: 'LAR', STL: 'LAR',
  WAS: 'WSH',
  SD: 'LAC',
  OAK: 'LV',
};
function normTeam(abbr) { return TEAM_ABBR_NORMALIZE[abbr] || abbr; }

// Konferenz/Division sind seit Jahren stabil -- hier statisch, statt bei
// jedem Sync von einer externen Quelle abzufragen.
const NFL_TEAM_META = {
  BUF: { name: 'Buffalo Bills', conference: 'AFC', division: 'East' },
  MIA: { name: 'Miami Dolphins', conference: 'AFC', division: 'East' },
  NE: { name: 'New England Patriots', conference: 'AFC', division: 'East' },
  NYJ: { name: 'New York Jets', conference: 'AFC', division: 'East' },
  BAL: { name: 'Baltimore Ravens', conference: 'AFC', division: 'North' },
  CIN: { name: 'Cincinnati Bengals', conference: 'AFC', division: 'North' },
  CLE: { name: 'Cleveland Browns', conference: 'AFC', division: 'North' },
  PIT: { name: 'Pittsburgh Steelers', conference: 'AFC', division: 'North' },
  HOU: { name: 'Houston Texans', conference: 'AFC', division: 'South' },
  IND: { name: 'Indianapolis Colts', conference: 'AFC', division: 'South' },
  JAX: { name: 'Jacksonville Jaguars', conference: 'AFC', division: 'South' },
  TEN: { name: 'Tennessee Titans', conference: 'AFC', division: 'South' },
  DEN: { name: 'Denver Broncos', conference: 'AFC', division: 'West' },
  KC: { name: 'Kansas City Chiefs', conference: 'AFC', division: 'West' },
  LV: { name: 'Las Vegas Raiders', conference: 'AFC', division: 'West' },
  LAC: { name: 'Los Angeles Chargers', conference: 'AFC', division: 'West' },
  DAL: { name: 'Dallas Cowboys', conference: 'NFC', division: 'East' },
  NYG: { name: 'New York Giants', conference: 'NFC', division: 'East' },
  PHI: { name: 'Philadelphia Eagles', conference: 'NFC', division: 'East' },
  WSH: { name: 'Washington Commanders', conference: 'NFC', division: 'East' },
  CHI: { name: 'Chicago Bears', conference: 'NFC', division: 'North' },
  DET: { name: 'Detroit Lions', conference: 'NFC', division: 'North' },
  GB: { name: 'Green Bay Packers', conference: 'NFC', division: 'North' },
  MIN: { name: 'Minnesota Vikings', conference: 'NFC', division: 'North' },
  ATL: { name: 'Atlanta Falcons', conference: 'NFC', division: 'South' },
  CAR: { name: 'Carolina Panthers', conference: 'NFC', division: 'South' },
  NO: { name: 'New Orleans Saints', conference: 'NFC', division: 'South' },
  TB: { name: 'Tampa Bay Buccaneers', conference: 'NFC', division: 'South' },
  ARI: { name: 'Arizona Cardinals', conference: 'NFC', division: 'West' },
  LAR: { name: 'Los Angeles Rams', conference: 'NFC', division: 'West' },
  SF: { name: 'San Francisco 49ers', conference: 'NFC', division: 'West' },
  SEA: { name: 'Seattle Seahawks', conference: 'NFC', division: 'West' },
};

const GAMES_CSV_URL = 'https://raw.githubusercontent.com/nflverse/nfldata/master/data/games.csv';
function statsTeamWeekUrl(season) {
  return `https://github.com/nflverse/nflverse-data/releases/download/stats_team/stats_team_week_${season}.csv`;
}

module.exports = {
  httpsGetText, parseCsv, normTeam, TEAM_ABBR_NORMALIZE, NFL_TEAM_META,
  GAMES_CSV_URL, statsTeamWeekUrl,
};
