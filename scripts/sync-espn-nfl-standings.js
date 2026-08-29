#!/usr/bin/env node
// ============================================================
//  ESPN NFL STANDINGS SYNC (Bear Witch Project HQ)
// ============================================================
//  Zieht die aktuellen NFL-Team-Standings (Sieg-Quote, PF/PA) UND,
//  best-effort, ESPN's FPI-Wert je Team über ESPN's OEFFENTLICHE
//  Sport-API (site.api.espn.com — keine Liga-Zugehoerigkeit noetig,
//  kein ESPN_S2/SWID erforderlich, anders als sync-espn-rosters.js).
//
//  Schreibt eine kumulative Wochen-Momentaufnahme in
//  data/nfl-power-rankings.js -> NFL_STANDINGS[season][week] (+ ggf.
//  NFL_FPI[season][week]). Laeuft ausschliesslich waehrend der
//  REGULAR SEASON (season.type === 2) -- Preseason/Playoffs werden
//  bewusst uebersprungen, um die Wochennummerierung sauber zu halten.
//
//  Usage:
//    node scripts/sync-espn-nfl-standings.js
// ============================================================

const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'data', 'nfl-power-rankings.js');

function httpsGetJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'bear-witch-project-hq-bot', 'Accept': 'application/json' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return httpsGetJson(res.headers.location).then(resolve, reject);
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode} für ${url}`));
      }
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error('Keine gültige JSON-Antwort von ESPN: ' + e.message)); }
      });
    }).on('error', reject);
  });
}

// Findet rekursiv alle Knoten mit einer befuellten standings.entries-Liste
// (= Divisions-Ebene bei ESPN), unabhaengig von der genauen Verschachtelungs-
// tiefe. Robuster als eine feste "children[0].children[i]"-Annahme.
function collectStandingsLeaves(node, out) {
  if (!node || typeof node !== 'object') return out;
  if (node.standings && Array.isArray(node.standings.entries) && node.standings.entries.length) {
    out.push(node);
  }
  if (Array.isArray(node.children)) {
    node.children.forEach(c => collectStandingsLeaves(c, out));
  }
  return out;
}

function conferenceAndDivisionFromName(rawName) {
  // ESPN-Divisionsnamen sind normalerweise z.B. "AFC East" / "NFC West".
  const name = (rawName || '').trim();
  const m = name.match(/^(AFC|NFC)\s+(East|North|South|West)$/i);
  if (m) return { conference: m[1].toUpperCase(), division: m[2][0].toUpperCase() + m[2].slice(1).toLowerCase() };
  // Fallback, falls ESPN mal den vollen Konferenznamen statt der Abkuerzung liefert.
  if (/american football conference/i.test(name)) return { conference: 'AFC', division: null };
  if (/national football conference/i.test(name)) return { conference: 'NFC', division: null };
  return { conference: null, division: null };
}

function statValue(entry, ...names) {
  const stats = entry.stats || [];
  for (const n of names) {
    const hit = stats.find(s => s.name === n || s.abbreviation === n || s.shortDisplayName === n);
    if (hit && hit.value != null) return Number(hit.value);
  }
  return 0;
}

async function fetchStandings(season) {
  const url = `https://site.api.espn.com/apis/v2/sports/football/nfl/standings?season=${season}`;
  const data = await httpsGetJson(url);
  const leaves = collectStandingsLeaves(data, []);
  const teams = [];
  leaves.forEach(leaf => {
    const { conference, division } = conferenceAndDivisionFromName(leaf.name || leaf.abbreviation);
    if (!division) return; // Ueberspringt Konferenz-Summenknoten ohne eigene Division
    leaf.standings.entries.forEach(e => {
      const team = e.team || {};
      teams.push({
        name: team.displayName || team.name || team.abbreviation || 'Unbekannt',
        abbr: team.abbreviation || '',
        conference,
        division,
        wins: statValue(e, 'wins'),
        losses: statValue(e, 'losses'),
        ties: statValue(e, 'ties'),
        winPct: statValue(e, 'winPercent'),
        pf: statValue(e, 'pointsFor'),
        pa: statValue(e, 'pointsAgainst'),
      });
    });
  });
  return teams;
}

// Best-effort: ESPN's FPI-Endpoint ist nicht so stabil dokumentiert wie die
// Standings-API. Schlaegt der Abruf/das Parsen fehl, wird das NICHT als
// Fehler behandelt -- die Seite zeigt fuer FPI dann einfach "noch nicht
// verfuegbar" fuer diese Woche, der Sync insgesamt bleibt erfolgreich.
async function fetchFpiSafe(season) {
  try {
    const url = `https://site.api.espn.com/apis/fitt/v3/sports/football/nfl/fpi?season=${season}&limit=40`;
    const data = await httpsGetJson(url);
    const rows = data.teams || data.items || [];
    const out = [];
    rows.forEach(row => {
      const team = row.team || {};
      const stats = row.stats || row.categories || [];
      const fpiStat = Array.isArray(stats) ? stats.find(s => (s.name || s.abbreviation || '').toUpperCase() === 'FPI') : null;
      const fpiVal = fpiStat ? Number(fpiStat.value ?? fpiStat.rankValue) : (row.fpi != null ? Number(row.fpi) : null);
      if (!team.abbreviation || fpiVal == null || Number.isNaN(fpiVal)) return;
      out.push({ abbr: team.abbreviation, fpi: fpiVal });
    });
    if (!out.length) return null;
    out.sort((a, b) => b.fpi - a.fpi);
    out.forEach((r, i) => { r.fpiRank = i + 1; });
    return out;
  } catch (e) {
    console.warn('⚠️  FPI-Sync übersprungen (best effort, kein Fehler):', e.message);
    return null;
  }
}

async function fetchCurrentWeek() {
  const data = await httpsGetJson('https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard');
  const season = data.season || {};
  const week = data.week || {};
  return { season: season.year, seasonType: season.type, week: week.number };
}

function loadExisting() {
  if (!fs.existsSync(OUT)) return { NFL_STANDINGS: {}, NFL_FPI: {} };
  const code = fs.readFileSync(OUT, 'utf8');
  const sandbox = {};
  const vm = require('vm');
  vm.createContext(sandbox);
  try {
    vm.runInContext(code + '\nthis.NFL_STANDINGS = NFL_STANDINGS; this.NFL_FPI = NFL_FPI;', sandbox);
  } catch (e) {
    console.warn('⚠️  Konnte bestehende nfl-power-rankings.js nicht parsen, starte frisch:', e.message);
    return { NFL_STANDINGS: {}, NFL_FPI: {} };
  }
  return { NFL_STANDINGS: sandbox.NFL_STANDINGS || {}, NFL_FPI: sandbox.NFL_FPI || {} };
}

async function main() {
  const { season, seasonType, week } = await fetchCurrentWeek();
  if (!season || !week) throw new Error('Konnte aktuelle NFL-Saison/-Woche nicht bestimmen (ESPN-Scoreboard-Antwort geprüft).');
  if (seasonType !== 2) {
    console.log(`Season-Type ${seasonType} (nicht Regular Season) -- Sync übersprungen, keine Datei geschrieben.`);
    return;
  }

  const teams = await fetchStandings(season);
  if (teams.length !== 32) {
    throw new Error(`Erwartet 32 NFL-Teams in den Standings, ${teams.length} gefunden -- breche ab ohne zu schreiben (ESPN-Antwortformat evtl. geändert).`);
  }

  const fpi = await fetchFpiSafe(season);

  const existing = loadExisting();
  existing.NFL_STANDINGS[season] = existing.NFL_STANDINGS[season] || {};
  existing.NFL_STANDINGS[season][week] = teams;
  if (fpi) {
    existing.NFL_FPI[season] = existing.NFL_FPI[season] || {};
    existing.NFL_FPI[season][week] = fpi;
  }

  const now = new Date().toISOString();
  const out = `// ============================================================
//  NFL_STANDINGS / NFL_FPI — automatisch von ESPN synchronisiert
// ============================================================
//  AUTO-GENERIERT von scripts/sync-espn-nfl-standings.js über die
//  GitHub Action ".github/workflows/sync-espn-nfl-standings.yml".
//  Nicht von Hand editieren — Änderungen werden beim nächsten Sync
//  überschrieben.
//  Zuletzt synchronisiert: ${now}
//
//  Jede Wochen-Momentaufnahme ist bereits kumulativ (so wie ESPN die
//  NFL-Standings selbst führt) -- beim Rendern NICHT nochmal über die
//  Wochen aufsummieren, einfach NFL_STANDINGS[season][week] direkt
//  anzeigen.
//
//  NFL_STANDINGS[season][week] = flaches Array aller 32 NFL-Teams:
//    { name, abbr, conference: "AFC"|"NFC", division: "East"|"North"|
//      "South"|"West", wins, losses, ties, winPct, pf, pa }
//
//  NFL_FPI[season][week] = flaches Array, NUR befüllt wenn ESPN's FPI-
//  Endpoint beim jeweiligen Sync-Lauf erreichbar/parsbar war (optional):
//    { abbr, fpi, fpiRank }
// ============================================================

const NFL_STANDINGS = ${JSON.stringify(existing.NFL_STANDINGS, null, 2)};

const NFL_FPI = ${JSON.stringify(existing.NFL_FPI, null, 2)};
`;

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, out, 'utf8');
  console.log(`${OUT} aktualisiert: Season ${season}, Woche ${week}, ${teams.length} Teams${fpi ? ', inkl. FPI' : ' (FPI nicht verfügbar)'}.`);
}

main().catch(err => {
  console.error('ESPN NFL Standings Sync fehlgeschlagen:', err.message);
  process.exit(1);
});
