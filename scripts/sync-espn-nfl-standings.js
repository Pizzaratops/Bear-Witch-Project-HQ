#!/usr/bin/env node
// ============================================================
//  NFL STANDINGS SYNC — Quelle: nflverse (Bear Witch Project HQ)
// ============================================================
//  Zieht Spielergebnisse aus dem oeffentlichen, GitHub-gehosteten
//  "nflverse/nfldata"-Projekt (games.csv, MIT-lizenziert, von der
//  NFL-Analytics-Community gepflegt: https://github.com/nflverse/nfldata)
//  und berechnet daraus selbst kumulative Wochen-Standings.
//
//  WARUM NICHT ESPN: ESPN's oeffentliche Sport-API (site.api.espn.com)
//  blockt Anfragen von GitHub-Actions-Runnern generell mit HTTP 403
//  (IP-Sperre gegen Cloud-CI, kein Header-/Format-Problem -- getestet
//  mit Browser-Headern UND CORS-Proxy-Fallback, beides erfolglos).
//  nflverse liegt dagegen direkt auf GitHub (raw.githubusercontent.com)
//  -- GitHub Actions darf GitHub-eigene Inhalte natuerlich abrufen,
//  keine IP-Sperre moeglich.
//
//  Kehrseite: ESPN's FPI (proprietaerer Power-Index) gibt es dadurch
//  nicht mehr -- das war ohnehin Best-effort und nicht offiziell
//  dokumentiert. Als Ersatz fuer "Offense/Defense-Rating" wird EPA/Play
//  (Expected Points Added pro Spielzug) aus nflverse's vorab
//  aggregierten Team-Wochen-Stats berechnet -- in der NFL-Analytics-
//  Community die etablierte, praezisere Alternative zu simplen
//  Punkteschnitten (siehe fetchOffDefSafe() weiter unten für Details).
//
//  Schreibt eine kumulative Wochen-Momentaufnahme in
//  data/nfl-power-rankings.js -> NFL_STANDINGS[season][week] +
//  NFL_OFFDEF[season][week]. NFL_FPI existiert nur noch als leeres
//  Objekt (Kompatibilitaet mit js/app.js, wird nirgends mehr befuellt).
//
//  Season = die hoechste Season-Zahl in den Daten (der aktuelle NFL-
//  Jahrgang steht bei nflverse schon VOR Saisonstart als Spielplan mit
//  leeren Ergebnissen drin). Solange fuer diese Season noch KEIN
//  Spiel gespielt wurde, wird bewusst NICHTS geschrieben (wie vorher
//  bei "Season-Type != Regular Season").
//
//  Usage:
//    node scripts/sync-espn-nfl-standings.js
// ============================================================

const fs = require('fs');
const path = require('path');
const https = require('https');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'data', 'nfl-power-rankings.js');
const GAMES_CSV_URL = 'https://raw.githubusercontent.com/nflverse/nfldata/master/data/games.csv';

// nflverse verwendet fuer zwei Teams andere Kuerzel als der Rest dieser
// Seite (data/draft2026.js etc.) -- hier auf unsere Konvention normalisieren.
// Zusaetzlich ein paar historische Codes fuer den Fall, dass die Datei mal
// aeltere Saisons mit alten Franchise-Codes enthaelt.
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
// Stadionnamen werden korrekt behandelt) -- bewusst ohne externe
// Dependency, damit die GitHub Action kein "npm install" braucht.
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

function loadExisting() {
  if (!fs.existsSync(OUT)) return { NFL_STANDINGS: {}, NFL_FPI: {}, NFL_OFFDEF: {} };
  const code = fs.readFileSync(OUT, 'utf8');
  const sandbox = {};
  vm.createContext(sandbox);
  try {
    vm.runInContext(code + '\nthis.NFL_STANDINGS = NFL_STANDINGS; this.NFL_FPI = (typeof NFL_FPI !== "undefined" ? NFL_FPI : {}); this.NFL_OFFDEF = (typeof NFL_OFFDEF !== "undefined" ? NFL_OFFDEF : {});', sandbox);
  } catch (e) {
    console.warn('⚠️  Konnte bestehende nfl-power-rankings.js nicht parsen, starte frisch:', e.message);
    return { NFL_STANDINGS: {}, NFL_FPI: {}, NFL_OFFDEF: {} };
  }
  return {
    NFL_STANDINGS: sandbox.NFL_STANDINGS || {},
    NFL_FPI: sandbox.NFL_FPI || {},
    NFL_OFFDEF: sandbox.NFL_OFFDEF || {},
  };
}

// Best-effort Offense-/Defense-Rating: EPA/Play (Expected Points Added
// pro Spielzug) statt simpler Punkteschnitte -- die in der NFL-Analytics-
// Community etablierte, deutlich praezisere Kennzahl fuer Team-Staerke,
// weil sie Down/Distance/Feldposition beruecksichtigt statt nur das
// Endergebnis. Quelle: nflverse's vorab aggregierte Team-Wochen-Stats
// (stats_team_week_<season>.csv, GitHub-Releases -- KEIN riesiger
// Play-by-Play-Download noetig). Existiert die Datei fuer die aktuelle
// Season noch nicht (z.B. ganz zu Saisonbeginn, bevor nflverse sie
// anlegt), wird das wie bei FPI vorher NICHT als Fehler behandelt --
// Offense/Defense zeigt dann einfach "noch nicht verfügbar", der
// Sync insgesamt bleibt erfolgreich (Win-Loss-Standings unberührt).
//
// Herleitung Defense-EPA: Diese Datei hat pro Team-Spiel nur die EIGENE
// Offense-Leistung. Die Defense-Leistung eines Teams in einem Spiel ist
// exakt die Offense-EPA, die der GEGNER in genau diesem Spiel erzielt
// hat (ueber "opponent_team" pro Zeile zuordenbar) -- kein Extra-Fetch
// noetig, einfach beim Verarbeiten umgekehrt zuordnen.
async function fetchOffDefSafe(season, weeks) {
  try {
    const url = `https://github.com/nflverse/nflverse-data/releases/download/stats_team/stats_team_week_${season}.csv`;
    const csvText = await httpsGetText(url);
    const rows = parseCsv(csvText).filter(r => r.season_type === 'REG' && r.team && r.opponent_team);
    if (!rows.length) return null;

    const perGame = rows.map(r => ({
      team: normTeam(r.team),
      opponent: normTeam(r.opponent_team),
      week: Number(r.week),
      // passing_epa + rushing_epa = gesamte Offense-EPA des Spiels (receiving_epa
      // NICHT zusaetzlich addieren -- das ist dieselben Passing-Plays nur aus
      // Receiver-Sicht, würde sonst doppelt gezählt).
      epa: (Number(r.passing_epa) || 0) + (Number(r.rushing_epa) || 0),
      plays: (Number(r.attempts) || 0) + (Number(r.carries) || 0),
    }));

    const result = {};
    weeks.forEach(uptoWeek => {
      const offEpa = {}, offPlays = {}, defEpa = {}, defPlays = {};
      Object.keys(NFL_TEAM_META).forEach(abbr => { offEpa[abbr] = 0; offPlays[abbr] = 0; defEpa[abbr] = 0; defPlays[abbr] = 0; });

      perGame.filter(g => g.week <= uptoWeek).forEach(g => {
        if (offEpa[g.team] === undefined || offEpa[g.opponent] === undefined) return; // unbekanntes Kuerzel -- überspringen statt crashen
        offEpa[g.team] += g.epa; offPlays[g.team] += g.plays;
        defEpa[g.opponent] += g.epa; defPlays[g.opponent] += g.plays; // Gegner-Offense = unsere Defense-Last
      });

      const list = Object.keys(NFL_TEAM_META).map(abbr => ({
        abbr,
        off: offPlays[abbr] ? offEpa[abbr] / offPlays[abbr] : 0,
        def: defPlays[abbr] ? defEpa[abbr] / defPlays[abbr] : 0,
      }));
      const byOff = list.slice().sort((a, b) => b.off - a.off);
      byOff.forEach((r, i) => { r.offRank = i + 1; });
      const byDef = list.slice().sort((a, b) => a.def - b.def); // weniger EPA/Play zugelassen = besser
      byDef.forEach((r, i) => { r.defRank = i + 1; });
      result[uptoWeek] = list;
    });
    return result;
  } catch (e) {
    console.warn('⚠️  Offense/Defense-Sync (EPA/Play, nflverse stats_team_week) übersprungen (best effort, kein Fehler):', e.message);
    return null;
  }
}

async function main() {
  const csvText = await httpsGetText(GAMES_CSV_URL);
  const allRows = parseCsv(csvText);
  const regRows = allRows.filter(r => r.game_type === 'REG' && r.season);

  if (!regRows.length) throw new Error('Keine Regular-Season-Spiele in games.csv gefunden -- Datenformat von nflverse evtl. geändert.');

  const season = Math.max(...regRows.map(r => Number(r.season)));
  const seasonRows = regRows.filter(r => Number(r.season) === season);
  const playedRows = seasonRows.filter(r => r.home_score !== '' && r.away_score !== '');

  if (!playedRows.length) {
    console.log(`Season ${season}: noch kein Regular-Season-Spiel gespielt -- Sync übersprungen, keine Datei geschrieben.`);
    return;
  }

  const weeks = [...new Set(playedRows.map(r => Number(r.week)))].sort((a, b) => a - b);
  const lastWeek = weeks[weeks.length - 1];

  const existing = loadExisting();
  existing.NFL_STANDINGS[season] = existing.NFL_STANDINGS[season] || {};
  existing.NFL_OFFDEF[season] = existing.NFL_OFFDEF[season] || {};

  weeks.forEach(uptoWeek => {
    const totals = {};
    Object.keys(NFL_TEAM_META).forEach(abbr => {
      totals[abbr] = { wins: 0, losses: 0, ties: 0, pf: 0, pa: 0, games: 0 };
    });

    playedRows.filter(r => Number(r.week) <= uptoWeek).forEach(r => {
      const home = normTeam(r.home_team);
      const away = normTeam(r.away_team);
      const hs = Number(r.home_score);
      const as = Number(r.away_score);
      if (!totals[home] || !totals[away]) return; // unbekanntes Kuerzel -- lieber überspringen als crashen

      totals[home].pf += hs; totals[home].pa += as; totals[home].games++;
      totals[away].pf += as; totals[away].pa += hs; totals[away].games++;

      if (hs > as) { totals[home].wins++; totals[away].losses++; }
      else if (hs < as) { totals[away].wins++; totals[home].losses++; }
      else { totals[home].ties++; totals[away].ties++; }
    });

    const teams = Object.keys(NFL_TEAM_META).map(abbr => {
      const t = totals[abbr];
      const meta = NFL_TEAM_META[abbr];
      const winPct = t.games ? (t.wins + 0.5 * t.ties) / t.games : 0;
      return {
        name: meta.name, abbr, conference: meta.conference, division: meta.division,
        wins: t.wins, losses: t.losses, ties: t.ties, winPct, pf: t.pf, pa: t.pa,
      };
    });
    existing.NFL_STANDINGS[season][uptoWeek] = teams;
  });

  const offDefByWeek = await fetchOffDefSafe(season, weeks);
  if (offDefByWeek) {
    weeks.forEach(w => { existing.NFL_OFFDEF[season][w] = offDefByWeek[w]; });
  }

  const now = new Date().toISOString();
  const out = `// ============================================================
//  NFL_STANDINGS / NFL_OFFDEF — automatisch synchronisiert (nflverse)
// ============================================================
//  AUTO-GENERIERT von scripts/sync-espn-nfl-standings.js über die
//  GitHub Action ".github/workflows/sync-espn-nfl-standings.yml".
//  Nicht von Hand editieren — Änderungen werden beim nächsten Sync
//  überschrieben.
//  Zuletzt synchronisiert: ${now}
//
//  Quelle: nflverse/nfldata (GitHub-gehostet, MIT-lizenziert), NICHT
//  ESPN -- ESPNs öffentliche Sport-API blockt GitHub-Actions-Server
//  generell (HTTP 403, IP-Sperre gegen Cloud-CI). Aus demselben Grund
//  gibt es kein ESPN-FPI mehr (NFL_FPI bleibt leer, nur noch für
//  Abwärtskompatibilität mit js/app.js vorhanden).
//
//  Jede Wochen-Momentaufnahme ist bereits kumulativ -- beim Rendern
//  NICHT nochmal über die Wochen aufsummieren, einfach
//  NFL_STANDINGS[season][week] direkt anzeigen.
//
//  NFL_STANDINGS[season][week] = flaches Array aller 32 NFL-Teams:
//    { name, abbr, conference: "AFC"|"NFC", division: "East"|"North"|
//      "South"|"West", wins, losses, ties, winPct, pf, pa }
//
//  NFL_OFFDEF[season][week] = flaches Array, EPA/Play (Expected Points
//  Added pro Spielzug, aus nflverse's Team-Wochen-Stats -- kein
//  ESPN-FPI-Ersatz, aber eine in der Analytics-Community etablierte,
//  praezisere Kennzahl als simple Punkteschnitte). Nur befüllt, wenn
//  nflverse die Stats-Datei für die Season schon veröffentlicht hat
//  (best effort, optional):
//    { abbr, off: Offense-EPA/Play, offRank,
//      def: Defense-EPA/Play zugelassen (WENIGER ist besser), defRank }
// ============================================================

const NFL_STANDINGS = ${JSON.stringify(existing.NFL_STANDINGS, null, 2)};

const NFL_FPI = ${JSON.stringify(existing.NFL_FPI, null, 2)};

const NFL_OFFDEF = ${JSON.stringify(existing.NFL_OFFDEF, null, 2)};
`;

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, out, 'utf8');
  console.log(`${OUT} aktualisiert: Season ${season}, Wochen 1–${lastWeek}, 32 Teams${offDefByWeek ? ', inkl. Offense/Defense (EPA/Play)' : ' (Offense/Defense noch nicht verfügbar)'}.`);
}

main().then(() => {
  // Explizites Exit noetig: offene Keep-Alive-Sockets von https.get gegen
  // GitHub halten den Node-Prozess sonst noch minutenlang am Leben, obwohl
  // main() laengst fertig ist.
  process.exit(0);
}).catch(err => {
  console.error('NFL Standings Sync fehlgeschlagen:', err.message);
  process.exit(1);
});
