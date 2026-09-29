#!/usr/bin/env node
// ============================================================
//  COLLEGE SCOUTING SYNC — Produktions-Comp fuer College-Prospects
// ============================================================
//  Erste Ausbaustufe der "College Scouting"-Erweiterung zu Player DNA
//  (siehe Projekt-Doc claude/college-scouting-concept.md). Deckt "College
//  Production Comp" ab (wem sieht ein Prospect aehnlich in der College-
//  Produktion) PLUS Groesse/Gewicht je Spieler (roster-Endpunkt) als
//  Grundlage fuer das separate "NFL Profile Comp" (siehe
//  scripts/build-nfl-profile-comp.js + scripts/build-nfl-draft-athletic-
//  profiles.js, laufen NACH diesem Script).
//
//  Positionen: WR, RB, TE (validiert per Prototyp 27.-28.09.2026, siehe
//  Doc), QB (validiert 28.09.2026 -- braucht category=passing zusaetzlich
//  zu rushing, Passing/Rushing bewusst getrennte Features, siehe Doc
//  Abschnitt 1: kein Mischwert, sonst verzerrt bei Dual-Threat-QBs).
//
//  Quelle: CollegeFootballData.com API (CFBD), Free-Tier (1000 Calls/
//  Monat). Braucht CFBD_API_KEY als Env-Var (in GitHub Actions als
//  Repo-Secret hinterlegen -- NIE in eine Datei schreiben).
//
//  RATE-LIMIT-STRATEGIE (wichtig!): Abgeschlossene Saisons aendern sich
//  nicht mehr -> werden aus der bestehenden data/college-scouting.js
//  uebernommen (0 API-Calls), neu geholt wird NUR die laufende Saison
//  (6 Calls: stats/passing, stats/rushing, stats/receiving, player/usage,
//  ppa/season, roster -- je EIN Call fuer die GESAMTE Liga, kein team-
//  Parameter noetig). Calls laufen SEQUENZIELL (CFBD limitiert gleichzeitige
//  Requests pro Endpunkt, siehe cfbdGet-Kommentar unten).
//  COLLEGE_REBUILD=1 holt alle Jahrgaenge neu (fuer Erst-Lauf oder wenn
//  sich die Berechnung geaendert hat -- kostet dann ~85 Calls fuer
//  2013-<laufende Saison>, weit unter dem Monatslimit).
//
//  "Laufende Saison" = College-Football-Jahrgang nach NCAA-Konvention
//  (Saison 2025 laeuft Aug 2025 - Jan 2026, wird "year=2025" genannt).
//  Ab Juli gilt das aktuelle Kalenderjahr schon als laufende Saison
//  (Preseason/erste Wochen), davor noch das Vorjahr.
//
//  Mindest-Volumen (MIN_*): Spieler darunter werden NICHT in den Pool
//  aufgenommen (kein Early-Signal-Fallback in v1 -- siehe TODO unten).
//  Comps (Mahalanobis-Nachbarn) werden nur fuer die zwei juengsten
//  Jahrgaenge gespeichert (aktuelle + potenzielle naechste Draft-Klasse),
//  nicht fuer den gesamten historischen Pool -- der dient nur als
//  Vergleichs-Universum.
//
//  COLLEGE_SCOUTING.feats[Pos][playerId] = Perzentil (0-100) je Feature --
//  Basis fuer die Radar/Spider-Grafik im Frontend (Prospect vs. Comp auf den
//  Vergleichs-Features, siehe js/college-scouting-card.js).
//
//  DRAFTED-FILTER (28.09.2026 ergaenzt): "recent" enthaelt sonst auch
//  Spieler, die zwischen ihrer College-Saison und dem naechsten Sync
//  bereits gedraftet wurden (z.B. 2025er Stars nach dem NFL Draft 2026) --
//  die sind keine Prospects mehr. Wird per Namens-Abgleich gegen die
//  zuletzt gebaute data/nfl-draft-athletic-profiles.js rausgefiltert (siehe
//  loadProDepartedSet -- frisch bei jedem Lauf gegen nflverse players.csv
//  ("rookie_season"-Feld, deckt Draft UND Undrafted Free Agents ab, siehe
//  Kommentar dort). Betrifft nur die Anzeige-Liste, nicht den historischen
//  Pool.
//
//  Schreibt data/college-scouting.js -> COLLEGE_SCOUTING
//  Usage:
//    CFBD_API_KEY=... node scripts/sync-college-scouting.js
//    COLLEGE_REBUILD=1 CFBD_API_KEY=... node scripts/sync-college-scouting.js
//
//  Voller lokaler Pipeline-Lauf fuer NFL Profile Comp (nach diesem Script):
//    node scripts/build-nfl-draft-athletic-profiles.js   (kein CFBD-Key noetig)
//    node scripts/build-nfl-profile-comp.js              (rein offline)
// ============================================================

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const https = require('https');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'data', 'college-scouting.js');
const API_KEY = process.env.CFBD_API_KEY;
const REBUILD = process.env.COLLEGE_REBUILD === '1';
const HIST_START = 2013;

// Normalisierter Name-Key -- identisch zur Logik in build-nfl-profile-comp.js
// / build-nfl-draft-athletic-profiles.js (dort die Quelle der Wahrheit).
function nameKey(name) {
  if (!name) return '';
  return name
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\b(jr|sr|ii|iii|iv|v)\.?\b/g, '')
    .replace(/[^a-z0-9]/g, '');
}

// ---- Fetch + CSV-Parse fuer nflverse players.csv (identische Helper wie in
// build-nfl-draft-athletic-profiles.js) -- braucht KEINEN CFBD-Key, laeuft
// gegen GitHub-Release-Assets (in der Cloud-Sandbox egress-gesperrt, aber
// von GitHub Actions aus erreichbar, siehe Projekt-Doc).
function getBuffer(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'bear-witch-project-hq-bot' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return getBuffer(res.headers.location).then(resolve, reject);
      }
      if (res.statusCode !== 200) { reject(new Error(`${res.statusCode} ${url}`)); res.resume(); return; }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}
function splitCsvLine(line) {
  const out = []; let cur = ''; let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (inQ) { if (c === '"') { if (line[i + 1] === '"') { cur += '"'; i++; } else inQ = false; } else cur += c; }
    else { if (c === '"') inQ = true; else if (c === ',') { out.push(cur); cur = ''; } else cur += c; }
  }
  out.push(cur);
  return out;
}
function parseCsv(text) {
  const lines = text.split('\n').filter(l => l.length);
  const headers = splitCsvLine(lines[0]);
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const vals = splitCsvLine(lines[i]);
    if (vals.length !== headers.length) continue;
    const o = {}; headers.forEach((h, j) => { o[h] = vals[j]; }); rows.push(o);
  }
  return rows;
}

// Baut ein Set aus "collegeSeasonYear|nameKey" fuer Spieler, die die NFL
// bereits erreicht haben -- gedraftet ODER als Undrafted Free Agent (UDFA)
// unterschrieben. Quelle: nflverse players.csv, Feld "rookie_season" --
// im Gegensatz zu "draft_year" (nur bei ~Haelfte gesetzt, nur Gedraftete)
// ist rookie_season fuer ALLE ~24.800 jemals in der NFL registrierten
// Spieler gesetzt (geprueft 28.09.2026), erfasst also auch UDFA-Signings.
// FRISCH bei jedem Lauf geholt (nicht aus dem lokalen, ggf. 1 Tag alten
// nfl-draft-athletic-profiles.js) -- kein CFBD-Call, zaehlt nicht gegen
// das Free-Tier-Limit. Bei Netzwerkfehler: leeres Set, Filter faellt weich
// aus (Production Comp bleibt unberuehrt).
//
// GRENZE (bewusst akzeptiert, siehe Doc): Spieler, die das College OHNE
// NFL-Signing verlassen (Karriereende, Transfer aus der FBS-Erfassung
// raus etc.) sind darueber NICHT erfassbar -- es gibt keine oeffentliche
// "hat aufgehoert"-Liste. Die loesen sich von selbst: sobald eine spaetere
// Saison synced wird und der Name dort NICHT wieder auftaucht, faellt der
// Spieler ohnehin aus dem RECENT_SEASONS_FOR_COMPS-Fenster raus.
async function loadProDepartedSet() {
  try {
    const rows = parseCsv((await getBuffer('https://github.com/nflverse/nflverse-data/releases/download/players/players.csv')).toString('utf8'));
    const departed = new Set();
    rows.forEach(r => {
      const rookieYear = r.rookie_season ? Number(r.rookie_season) : null;
      if (!rookieYear) return;
      const key = nameKey(r.display_name);
      if (!key) return;
      departed.add(`${rookieYear - 1}|${key}`);
      departed.add(`${rookieYear - 2}|${key}`);
    });
    return departed;
  } catch (e) {
    console.warn(`nflverse players.csv nicht ladbar (${e.message}) -- Pro-Departed-Filter fuer diesen Lauf uebersprungen.`);
    return new Set();
  }
}

const FBS_CONFERENCES = new Set([
  'SEC', 'Big Ten', 'ACC', 'Big 12', 'American Athletic', 'Mid-American',
  'Sun Belt', 'Conference USA', 'Mountain West', 'Pac-12', 'FBS Independents',
]);

const MIN_VOLUME = {
  WR: { key: 'YDS', val: 250 },
  RB: { key: 'rush_YDS', val: 300 },
  // TE bekommt strukturell weniger Targets als WR (Blocking-Snaps zaehlen
  // nicht als Passspiel) -- niedrigere Schwelle, sonst faellt die grosse
  // Mehrheit der Receiving-TEs schon raus.
  TE: { key: 'YDS', val: 150 },
  QB: { key: 'pass_YDS', val: 1500 },
};
const RECENT_SEASONS_FOR_COMPS = 4; // fuer diese vielen juengsten Jahrgaenge werden Comps gespeichert
                                     // (Frontend bietet einen Jahres-Filter 1/2/3/4 Jahre darauf an,
                                     // siehe js/college-scouting-card.js CS_YEAR_WINDOWS -- muss <= diesem
                                     // Wert bleiben, sonst laeuft der groesste Filter ins Leere)
const COMPS_N = 10;

function currentSeason() {
  const now = new Date();
  const month = now.getUTCMonth() + 1; // 1-12
  return month >= 7 ? now.getUTCFullYear() : now.getUTCFullYear() - 1;
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

// ---------------- CFBD HTTP ----------------
// CFBD limitiert nicht nur Calls/Monat, sondern auch GLEICHZEITIGE Requests
// pro Endpunkt ("Too many concurrent requests for this endpoint", HTTP 429)
// -- bestaetigt 27.09.2026 (proto-college-qb-comps.js schlug ab Jahrgang
// 2019 fehl, weil vier Endpunkte parallel per Promise.all gefeuert wurden).
// Deshalb: (1) Calls sequenziell statt parallel (siehe fetchYearRaw unten),
// (2) zusaetzlich Retry mit exponentiellem Backoff als Sicherheitsnetz.
function cfbdGet(pathAndQuery, attempt = 0) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.collegefootballdata.com',
      path: pathAndQuery,
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'application/json',
        'User-Agent': 'bear-witch-project-hq-bot',
      },
    };
    https.get(options, res => {
      if (res.statusCode === 429 && attempt < 5) {
        res.resume();
        const wait = Math.min(2000 * 2 ** attempt, 20000);
        console.warn(`  (429 Too Many Requests fuer ${pathAndQuery} -- warte ${wait}ms, Versuch ${attempt + 1}/5)`);
        sleep(wait).then(() => resolve(cfbdGet(pathAndQuery, attempt + 1)));
        return;
      }
      if (res.statusCode !== 200) {
        let body = '';
        res.on('data', c => { body += c; });
        res.on('end', () => reject(new Error(`HTTP ${res.statusCode} fuer ${pathAndQuery}: ${body.slice(0, 300)}`)));
        return;
      }
      let data = '';
      res.on('data', c => { data += c; });
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error(`JSON-Parse-Fehler fuer ${pathAndQuery}: ${e.message}`)); }
      });
    }).on('error', reject);
  });
}

const num = v => (v === '' || v == null ? null : Number(v));
const round = (x, d = 2) => (x == null ? null : Math.round(x * 10 ** d) / 10 ** d);

// ---------------- Reine Transform-Funktionen (unit-testbar, keine Netzwerk-Calls) ----------------

// Baut aus den Rohdatensaetzen eines Jahres die WR/TE/RB/QB-Spielerlisten.
// Exportiert fuer Tests -- macht selbst keine API-Calls.
// rosterRaw liefert Groesse/Gewicht (fuer das spaetere NFL Profile Comp,
// siehe scripts/build-nfl-profile-comp.js) -- optional, faellt bei Bedarf
// auf ein leeres Array zurueck (aeltere Cache-Eintraege ohne Groesse/Gewicht
// bleiben dadurch abwaertskompatibel funktionsfaehig).
function buildYearRecords(year, passingRaw, rushingRaw, receivingRaw, usageRaw, ppaRaw, rosterRaw = []) {
  const teamRush = {}; // team -> { CAR, YDS, TD, ... } ueber ALLE Positionen
  rushingRaw.forEach(r => {
    if (!FBS_CONFERENCES.has(r.conference)) return;
    const t = teamRush[r.team] || (teamRush[r.team] = {});
    t[r.statType] = (t[r.statType] || 0) + (num(r.stat) || 0);
  });
  const teamRec = {}; // team -> { REC, YDS, TD } ueber ALLE Positionen
  receivingRaw.forEach(r => {
    if (!FBS_CONFERENCES.has(r.conference)) return;
    if (r.statType !== 'REC' && r.statType !== 'YDS' && r.statType !== 'TD') return;
    const t = teamRec[r.team] || (teamRec[r.team] = { REC: 0, YDS: 0, TD: 0 });
    t[r.statType] += num(r.stat) || 0;
  });

  const usageById = {};
  usageRaw.forEach(u => { usageById[u.id] = u.usage; });
  const ppaById = {};
  ppaRaw.forEach(u => { ppaById[u.id] = u; });
  // Roster liefert Groesse (in)/Gewicht (lb) -- CFBD nennt das Feld je nach
  // Antwortform "id" (wie bei allen anderen Endpunkten hier) oder "athleteId";
  // beide abdecken, damit ein API-Formatwechsel nicht sofort alles leerlaeuft.
  const sizeById = {};
  rosterRaw.forEach(r => {
    const rid = r.id ?? r.athleteId ?? r.athlete_id;
    if (rid == null) return;
    sizeById[rid] = { heightIn: num(r.height), weightLb: num(r.weight) };
  });

  // ---- WR + TE (identisches Feature-Set -- beide nur ueber category=receiving,
  // Dominator-Rating-Stil, da CFBD kein targets-Feld hat; siehe Projekt-Doc) ----
  function buildReceiverPos(position) {
    const byPlayer = {};
    receivingRaw.forEach(r => {
      if (r.position !== position) return;
      if (!FBS_CONFERENCES.has(r.conference)) return;
      const p = byPlayer[r.playerId] || (byPlayer[r.playerId] = {
        id: `${year}_${r.playerId}`, rawId: r.playerId, name: r.player, team: r.team, conf: r.conference, year,
      });
      p[r.statType] = num(r.stat);
    });
    return Object.values(byPlayer)
      .filter(p => (p.YDS || 0) >= MIN_VOLUME[position].val)
      .map(p => {
        const t = teamRec[p.team] || { REC: 1, YDS: 1, TD: 1 };
        const usage = usageById[p.rawId];
        const ppa = ppaById[p.rawId];
        const size = sizeById[p.rawId];
        return {
          id: p.id, rawId: p.rawId, name: p.name, team: p.team, conf: p.conf, year,
          rec: p.REC ?? null, yds: p.YDS ?? null, td: p.TD ?? null,
          recShare: round(100 * (p.REC || 0) / (t.REC || 1), 1),
          ydShare: round(100 * (p.YDS || 0) / (t.YDS || 1), 1),
          tdShare: round(100 * (p.TD || 0) / (t.TD || 1), 1),
          usageOverall: usage ? round(100 * usage.overall, 1) : null,
          avgPPA: ppa ? round(ppa.averagePPA?.all, 3) : null,
          heightIn: size ? size.heightIn : null,
          weightLb: size ? size.weightLb : null,
        };
      });
  }
  const wr = buildReceiverPos('WR');
  const te = buildReceiverPos('TE');

  // ---- RB ----
  const rbByPlayer = {};
  rushingRaw.forEach(r => {
    if (r.position !== 'RB') return;
    if (!FBS_CONFERENCES.has(r.conference)) return;
    const p = rbByPlayer[r.playerId] || (rbByPlayer[r.playerId] = {
      id: `${year}_${r.playerId}`, rawId: r.playerId, name: r.player, team: r.team, conf: r.conference, year,
    });
    p[`rush_${r.statType}`] = num(r.stat);
  });
  receivingRaw.forEach(r => {
    if (r.position !== 'RB') return;
    if (!FBS_CONFERENCES.has(r.conference)) return;
    const p = rbByPlayer[r.playerId] || (rbByPlayer[r.playerId] = {
      id: `${year}_${r.playerId}`, rawId: r.playerId, name: r.player, team: r.team, conf: r.conference, year,
    });
    p[`rec_${r.statType}`] = num(r.stat);
  });
  const rb = Object.values(rbByPlayer)
    .filter(p => (p.rush_YDS || 0) >= MIN_VOLUME.RB.val)
    .map(p => {
      const tRush = teamRush[p.team] || {};
      const tRec = teamRec[p.team] || { YDS: 1 };
      const usage = usageById[p.rawId];
      const ppa = ppaById[p.rawId];
      const size = sizeById[p.rawId];
      return {
        id: p.id, rawId: p.rawId, name: p.name, team: p.team, conf: p.conf, year,
        rushYds: p.rush_YDS ?? null, rushCar: p.rush_CAR ?? null, rushTd: p.rush_TD ?? null,
        recYds: p.rec_YDS ?? null,
        rushCarShare: tRush.CAR ? round(100 * (p.rush_CAR || 0) / tRush.CAR, 1) : null,
        recYdShare: tRec.YDS ? round(100 * (p.rec_YDS || 0) / tRec.YDS, 1) : 0,
        usageRush: usage ? round(100 * usage.rush, 1) : null,
        avgPpaRush: ppa ? round(ppa.averagePPA?.rush, 3) : null,
        avgPpaPass: ppa ? round(ppa.averagePPA?.pass, 3) : null,
        heightIn: size ? size.heightIn : null,
        weightLb: size ? size.weightLb : null,
      };
    });

  // ---- QB (Passing + Rushing GETRENNT gefuehrt, siehe Kommentar oben) ----
  const qbByPlayer = {};
  passingRaw.forEach(r => {
    if (r.position !== 'QB') return;
    if (!FBS_CONFERENCES.has(r.conference)) return;
    const p = qbByPlayer[r.playerId] || (qbByPlayer[r.playerId] = {
      id: `${year}_${r.playerId}`, rawId: r.playerId, name: r.player, team: r.team, conf: r.conference, year,
    });
    p[`pass_${r.statType}`] = num(r.stat);
  });
  rushingRaw.forEach(r => {
    if (r.position !== 'QB') return;
    if (!FBS_CONFERENCES.has(r.conference)) return;
    const p = qbByPlayer[r.playerId] || (qbByPlayer[r.playerId] = {
      id: `${year}_${r.playerId}`, rawId: r.playerId, name: r.player, team: r.team, conf: r.conference, year,
    });
    p[`rush_${r.statType}`] = num(r.stat);
  });
  const qb = Object.values(qbByPlayer)
    .filter(p => (p.pass_YDS || 0) >= MIN_VOLUME.QB.val)
    .map(p => {
      const usage = usageById[p.rawId];
      const ppa = ppaById[p.rawId];
      const size = sizeById[p.rawId];
      return {
        id: p.id, rawId: p.rawId, name: p.name, team: p.team, conf: p.conf, year,
        passYds: p.pass_YDS ?? null, passAtt: p.pass_ATT ?? null, passTd: p.pass_TD ?? null,
        rushYds: p.rush_YDS ?? null,
        compPct: p.pass_PCT != null ? round(100 * p.pass_PCT, 1) : null,
        usagePass: usage ? round(100 * usage.pass, 1) : null,
        usageRush: usage ? round(100 * usage.rush, 1) : null,
        avgPpaPass: ppa ? round(ppa.averagePPA?.pass, 3) : null,
        avgPpaRush: ppa ? round(ppa.averagePPA?.rush, 3) : null,
        heightIn: size ? size.heightIn : null,
        weightLb: size ? size.weightLb : null,
      };
    });

  return { WR: wr, TE: te, RB: rb, QB: qb };
}

// ---------------- Mahalanobis (reines JS, keine Deps) ----------------
function mean(arr) { return arr.reduce((s, v) => s + v, 0) / arr.length; }
function covMatrix(rows) {
  const n = rows.length, d = rows[0].length;
  const mu = Array.from({ length: d }, (_, j) => mean(rows.map(r => r[j])));
  const cov = Array.from({ length: d }, () => Array(d).fill(0));
  rows.forEach(r => {
    for (let i = 0; i < d; i++) for (let j = 0; j < d; j++) cov[i][j] += (r[i] - mu[i]) * (r[j] - mu[j]);
  });
  for (let i = 0; i < d; i++) for (let j = 0; j < d; j++) cov[i][j] /= (n - 1);
  return { mu, cov };
}
function invert(m) {
  const d = m.length;
  const A = m.map((row, i) => [...row, ...Array.from({ length: d }, (_, j) => (i === j ? 1 : 0))]);
  for (let col = 0; col < d; col++) {
    let pivot = col;
    for (let r = col + 1; r < d; r++) if (Math.abs(A[r][col]) > Math.abs(A[pivot][col])) pivot = r;
    [A[col], A[pivot]] = [A[pivot], A[col]];
    if (Math.abs(A[col][col]) < 1e-10) { A[col][col] += 1e-6; }
    const pv = A[col][col];
    for (let c = 0; c < 2 * d; c++) A[col][c] /= pv;
    for (let r = 0; r < d; r++) {
      if (r === col) continue;
      const factor = A[r][col];
      for (let c = 0; c < 2 * d; c++) A[r][c] -= factor * A[col][c];
    }
  }
  return A.map(row => row.slice(d));
}
function matVec(m, v) { return m.map(row => row.reduce((s, x, j) => s + x * v[j], 0)); }
function dot(a, b) { return a.reduce((s, x, i) => s + x * b[i], 0); }
function mahalanobis(a, b, invCov) {
  const diff = a.map((x, i) => x - b[i]);
  return Math.sqrt(dot(diff, matVec(invCov, diff)));
}

const FEATURES = {
  WR: ['recShare', 'ydShare', 'tdShare', 'avgPPA', 'usageOverall'],
  TE: ['recShare', 'ydShare', 'tdShare', 'avgPPA', 'usageOverall'],
  RB: ['rushCarShare', 'recYdShare', 'avgPpaRush', 'avgPpaPass', 'usageRush'],
  QB: ['avgPpaPass', 'avgPpaRush', 'usagePass', 'usageRush', 'compPct'],
};

// Perzentil (0-100) von `val` innerhalb der aufsteigend sortierten `sortedAsc`
// -- Grundlage fuer die Radar/Spider-Grafik im Frontend (macht Features mit
// unterschiedlichen Einheiten/Skalen auf einer gemeinsamen 0-100-Achse
// vergleichbar). Gleiche Methodik wie computeRasScore in
// build-nfl-draft-athletic-profiles.js.
function percentile(val, sortedAsc) {
  if (val == null || !sortedAsc.length) return null;
  let lo = 0, hi = sortedAsc.length;
  while (lo < hi) { const mid = (lo + hi) >> 1; if (sortedAsc[mid] <= val) lo = mid + 1; else hi = mid; }
  return round((lo / sortedAsc.length) * 100, 1);
}

// Perzentil-Werte je Feature fuer JEDEN Spieler im `pool` (nicht nur die
// Comp-Targets) -- Basis fuer die Radar-Grafik im Frontend: dieselbe id
// (year_playerId, siehe buildYearRecords) wird sowohl fuer aktuelle
// Prospects als auch fuer deren Comps verwendet, also reicht EINE Map.
function buildFeaturePercentiles(pool, features) {
  const complete = pool.filter(p => features.every(f => p[f] != null && !Number.isNaN(p[f])));
  if (complete.length < 30) return {};
  const sorted = {};
  features.forEach(f => { sorted[f] = complete.map(p => p[f]).sort((a, b) => a - b); });
  const byId = {};
  complete.forEach(p => {
    const o = {};
    features.forEach(f => { o[f] = percentile(p[f], sorted[f]); });
    byId[p.id] = o;
  });
  return byId;
}

// Berechnet fuer jeden Spieler in `targets` die COMPS_N naechsten Nachbarn
// aus `pool` (per Mahalanobis, auf denselben Z-standardisierten Features).
// Gibt { [playerId]: [{id,name,team,year,dist}, ...] } zurueck.
function computeComps(pool, targets, features) {
  const complete = pool.filter(p => features.every(f => p[f] != null && !Number.isNaN(p[f])));
  if (complete.length < 30) return {};
  const stats = {};
  features.forEach(f => {
    const vals = complete.map(p => p[f]);
    const mu = mean(vals);
    const sd = Math.sqrt(mean(vals.map(v => (v - mu) ** 2))) || 1;
    stats[f] = { mu, sd };
  });
  const vec = p => features.map(f => (p[f] - stats[f].mu) / stats[f].sd);
  const rows = complete.map(vec);
  const { cov } = covMatrix(rows);
  const invCov = invert(cov);

  const out = {};
  targets.forEach(target => {
    if (!features.every(f => target[f] != null && !Number.isNaN(target[f]))) return;
    const tVec = vec(target);
    const distances = complete
      .filter(p => p.id !== target.id)
      .map(p => ({ p, dist: mahalanobis(tVec, vec(p), invCov) }))
      .sort((a, b) => a.dist - b.dist)
      .slice(0, COMPS_N)
      .map(({ p, dist }) => ({ id: p.id, name: p.name, team: p.team, year: p.year, dist: round(dist, 3) }));
    out[target.id] = distances;
  });
  return out;
}

// ---------------- Cache laden ----------------
function loadCache() {
  if (!fs.existsSync(OUT)) return null;
  try {
    const sb = {}; vm.createContext(sb);
    vm.runInContext(fs.readFileSync(OUT, 'utf8') + '\nthis.D = COLLEGE_SCOUTING;', sb);
    return sb.D || null;
  } catch (e) {
    console.warn(`Cache-Datei konnte nicht gelesen werden (${e.message}) -- baue komplett neu.`);
    return null;
  }
}

// ---------------- Main ----------------
async function main() {
  if (!API_KEY) { console.error('FEHLER: CFBD_API_KEY ist nicht gesetzt.'); process.exit(1); }

  const CURRENT = currentSeason();
  const ALL_YEARS = [];
  for (let y = HIST_START; y <= CURRENT; y++) ALL_YEARS.push(y);
  console.log(`\n=== College Scouting Sync -- laufende Saison: ${CURRENT} ===\n`);

  const cache = REBUILD ? null : loadCache();
  const seasonsData = (cache && cache.seasons) ? { ...cache.seasons } : {};

  for (const year of ALL_YEARS) {
    const isCurrent = year === CURRENT;
    if (!isCurrent && seasonsData[year] && !REBUILD) {
      console.log(`${year}: aus Cache uebernommen (${seasonsData[year].WR.length} WR, ${seasonsData[year].TE.length} TE, ${seasonsData[year].RB.length} RB, ${(seasonsData[year].QB || []).length} QB).`);
      continue;
    }
    process.stdout.write(`${year}: lade 6 Endpunkte ... `);
    try {
      // Sequenziell statt Promise.all (siehe Kommentar bei cfbdGet oben --
      // CFBD limitiert gleichzeitige Requests pro Endpunkt).
      const passingRaw = await cfbdGet(`/stats/player/season?year=${year}&category=passing`);
      await sleep(400);
      const rushingRaw = await cfbdGet(`/stats/player/season?year=${year}&category=rushing`);
      await sleep(400);
      const receivingRaw = await cfbdGet(`/stats/player/season?year=${year}&category=receiving`);
      await sleep(400);
      const usageRaw = await cfbdGet(`/player/usage?year=${year}`).catch(() => []);
      await sleep(400);
      const ppaRaw = await cfbdGet(`/ppa/players/season?year=${year}`).catch(() => []);
      await sleep(400);
      // roster: Groesse/Gewicht -- nur fuer das spaetere NFL Profile Comp
      // gebraucht, deshalb weich fehlschlagend (leeres Array statt Abbruch,
      // falls CFBD hier mal einen Ausfall hat -- Production Comp bleibt
      // davon unberuehrt).
      const rosterRaw = await cfbdGet(`/roster?year=${year}`).catch(() => []);
      const built = buildYearRecords(year, passingRaw, rushingRaw, receivingRaw, usageRaw, ppaRaw, rosterRaw);
      seasonsData[year] = built;
      console.log(`${built.WR.length} WR, ${built.TE.length} TE, ${built.RB.length} RB, ${built.QB.length} QB.`);
    } catch (e) {
      console.log(`FEHLER: ${e.message} -- Jahr uebersprungen (${seasonsData[year] ? 'alter Cache-Stand bleibt' : 'komplett fehlend'}).`);
    }
  }

  // ---- Comps fuer die juengsten Jahrgaenge (Pool selbst wird NICHT nochmal
  // separat gespeichert -- steht schon vollstaendig in `seasons`, siehe unten) ----
  const recentYears = new Set(ALL_YEARS.slice(-RECENT_SEASONS_FOR_COMPS));
  const proDepartedSet = await loadProDepartedSet();
  let proDepartedFiltered = 0;
  const output = {
    meta: { lastSync: new Date().toISOString(), currentSeason: CURRENT, years: ALL_YEARS, features: FEATURES },
    seasons: seasonsData, // Cache-Grundlage FUER DIESES SCRIPT + vollstaendige Historie
    recent: {}, // kleine, direkt frontend-taugliche Teilmenge (nur die Draft-relevanten Prospects)
    comps: {},
    feats: {}, // Perzentil-Werte je Feature+Spieler-Saison -- Basis fuer die Radar-Grafik im Frontend
  };

  for (const pos of ['WR', 'TE', 'RB', 'QB']) {
    const pool = [];
    ALL_YEARS.forEach(y => { if (seasonsData[y]) pool.push(...seasonsData[y][pos]); });
    const targets = pool
      .filter(p => recentYears.has(p.year))
      .filter(p => {
        const departed = proDepartedSet.has(`${p.year}|${nameKey(p.name)}`);
        if (departed) proDepartedFiltered++;
        return !departed;
      });
    output.recent[pos] = targets;
    output.comps[pos] = computeComps(pool, targets, FEATURES[pos]);
    output.feats[pos] = buildFeaturePercentiles(pool, FEATURES[pos]);
    console.log(`${pos}: Pool ${pool.length} Spieler-Saisons, Comps fuer ${Object.keys(output.comps[pos]).length} aktuelle Spieler berechnet.`);
  }
  if (proDepartedFiltered) console.log(`(${proDepartedFiltered} bereits in der NFL registrierte Spieler (Draft ODER UDFA) aus "recent" gefiltert -- nflverse players.csv, frisch geholt.)`);

  const body = `// ============================================================
//  COLLEGE_SCOUTING — College Production Comp (WR, TE, RB, QB)
// ============================================================
//  AUTO-GENERIERT von scripts/sync-college-scouting.js. Nicht von Hand
//  editieren. Siehe claude/college-scouting-concept.md (Projekt-Doc)
//  fuer die Methodik.
//
//  COLLEGE_SCOUTING.seasons[Jahr][Pos] = Spieler-Saisons dieses Jahrgangs
//    (Mindest-Volumen gefiltert) -- vollstaendige Historie ${HIST_START}-${CURRENT},
//    dient als Cache-Grundlage (abgeschlossene Jahrgaenge werden beim naechsten
//    Lauf NICHT neu von CFBD geholt) UND als Vergleichs-Universum fuer die
//    Mahalanobis-Distanz.
//  COLLEGE_SCOUTING.recent[Pos] = nur die ${RECENT_SEASONS_FOR_COMPS} juengsten
//    Jahrgaenge, flach -- das sind die tatsaechlich Draft-relevanten Prospects,
//    fuers Frontend direkt nutzbar (keine Notwendigkeit, durch "seasons" zu
//    iterieren).
//  COLLEGE_SCOUTING.comps[Pos][playerId] = Top-${COMPS_N}-Comps (Mahalanobis-
//    Distanz) fuer genau diese "recent"-Spieler.
//
//  TODO (v2, siehe Projekt-Doc Abschnitt 7): Early-Signal-Fallback fuer
//  Spieler unter dem Mindest-Volumen (z.B. frueh in der laufenden Saison),
//  NFL Profile Comp (RAS + Draft-Kapital-Kurve).
// ============================================================

const COLLEGE_SCOUTING = ${JSON.stringify(output, null, 2)};
`;
  const old = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : null;
  if (old === body) { console.log('\nKeine Aenderungen.'); return; }
  fs.writeFileSync(OUT, body, 'utf8');
  console.log(`\n✅ ${OUT} geschrieben (${Math.round(body.length / 1024)} KB).`);
}

if (require.main === module) {
  main().catch(e => { console.error('❌ College Scouting Sync fehlgeschlagen:', e.message); process.exit(1); });
}

module.exports = { buildYearRecords, computeComps, currentSeason, FEATURES, percentile, buildFeaturePercentiles, nameKey, loadProDepartedSet, parseCsv };
