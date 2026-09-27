#!/usr/bin/env node
// ============================================================
//  PROTOTYP: College Production Comp -- WR (nur zum Testen/Validieren)
// ============================================================
//  Ziel dieses Scripts: EINMAL gegen echte CFBD-Daten laufen lassen und
//  pruefen, wie vollstaendig/sauber die Daten wirklich sind, BEVOR das
//  Ganze in den echten Sync (scripts/sync-college-scouting.js) und ins
//  Frontend eingebaut wird. Schreibt NICHTS nach data/ -- nur eine JSON-
//  Datei zur Inspektion + eine Konsolen-Tabelle der Top-Spieler.
//
//  Quelle: collegefootballdata.com (CFBD), Free-Tier (1000 Calls/Monat).
//  Drei Endpunkte, JEWEILS EIN Call fuer die GESAMTE Liga (kein team-Param):
//    stats/player/season?year=&category=receiving   Long-Format (REC/YDS/TD/LONG/YPR)
//    player/usage?year=                              Rollen-Anteile (overall/pass/...)
//    ppa/players/season?year=                        Effizienz (averagePPA/totalPPA)
//
//  WICHTIG: CFBD hat KEIN targets-Feld -- deshalb "Dominator Rating"-Stil
//  (Reception-/Yard-/TD-Share am Team) statt Target-Share.
//
//  Filter: nur FBS-Conferences (Whitelist unten), sonst ist der Vergleichs-
//  Pool voller D2/FCS-Rauschen (bestaetigt beim Test des no-team-Calls).
//
//  Usage (der API-Key wird NICHT in eine Datei geschrieben, nur als
//  Env-Var fuer diesen einen Lauf uebergeben):
//
//    Windows cmd.exe:
//      set CFBD_API_KEY=dein-key-hier
//      node scripts/proto-college-wr.js
//
//    Windows PowerShell:
//      $env:CFBD_API_KEY = "dein-key-hier"
//      node scripts/proto-college-wr.js
//
//    Optional: YEAR=2024 node scripts/proto-college-wr.js  (Default: 2025)
// ============================================================

const fs = require('fs');
const path = require('path');
const https = require('https');

const API_KEY = process.env.CFBD_API_KEY;
const YEAR = Number(process.env.YEAR || 2025);
const OUT_JSON = path.join(__dirname, '..', 'proto-college-wr-output.json');

if (!API_KEY) {
  console.error('FEHLER: CFBD_API_KEY ist nicht gesetzt. Siehe Kommentar oben im Script fuer die genaue Anweisung.');
  process.exit(1);
}

// FBS-Conferences (Whitelist) -- alles andere (FCS/D2/D3) wird beim
// Prototyp rausgefiltert, um den Vergleichs-Pool sauber zu halten.
const FBS_CONFERENCES = new Set([
  'SEC', 'Big Ten', 'ACC', 'Big 12', 'American Athletic', 'Mid-American',
  'Sun Belt', 'Conference USA', 'Mountain West', 'Pac-12', 'FBS Independents',
]);

function cfbdGet(pathAndQuery) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.collegefootballdata.com',
      path: pathAndQuery,
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'application/json',
        'User-Agent': 'bear-witch-project-hq-proto',
      },
    };
    https.get(options, res => {
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
const round = (x, d = 1) => (x == null ? null : Math.round(x * 10 ** d) / 10 ** d);

async function main() {
  console.log(`\n=== College Production Comp Prototyp -- WR, Saison ${YEAR} ===\n`);

  console.log('1/3 Lade stats/player/season (receiving, alle Teams, 1 Call) ...');
  const statsRaw = await cfbdGet(`/stats/player/season?year=${YEAR}&category=receiving`);
  console.log(`  -> ${statsRaw.length} Zeilen (Long-Format, alle Divisionen)`);

  console.log('2/3 Lade player/usage (alle Teams, 1 Call) ...');
  let usageRaw = [];
  try {
    usageRaw = await cfbdGet(`/player/usage?year=${YEAR}`);
    console.log(`  -> ${usageRaw.length} Zeilen`);
  } catch (e) {
    console.warn(`  WARNUNG: player/usage ohne team-Param fehlgeschlagen (${e.message}). Wird uebersprungen -- Usage-Shares fehlen dann im Prototyp.`);
  }

  console.log('3/3 Lade ppa/players/season (alle Teams, 1 Call) ...');
  let ppaRaw = [];
  try {
    ppaRaw = await cfbdGet(`/ppa/players/season?year=${YEAR}`);
    console.log(`  -> ${ppaRaw.length} Zeilen`);
  } catch (e) {
    console.warn(`  WARNUNG: ppa/players/season ohne team-Param fehlgeschlagen (${e.message}). Wird uebersprungen -- PPA fehlt dann im Prototyp.`);
  }

  // ---- 1) Long-Format -> pro Spieler pivotieren ----
  // Felder je Zeile: season, playerId, player, position, team, conference, category, statType, stat
  const byPlayer = {}; // playerId -> { name, pos, team, conf, REC, YDS, TD, LONG, YPR }
  statsRaw.forEach(r => {
    if (r.position !== 'WR') return;
    if (!FBS_CONFERENCES.has(r.conference)) return;
    const p = byPlayer[r.playerId] || (byPlayer[r.playerId] = {
      id: r.playerId, name: r.player, pos: r.position, team: r.team, conf: r.conference,
    });
    p[r.statType] = num(r.stat);
  });
  const players = Object.values(byPlayer);
  console.log(`\nNach WR + FBS-Filter: ${players.length} Spieler.`);

  // ---- 2) Team-Totals fuer Dominator-Rating-Style Shares (REC/YDS/TD) ----
  // Basis: Summe ueber ALLE WR dieses Datensatzes je Team (Naeherung -- echte
  // Team-Totals muessten alle Positionen inkl. RB/TE einschliessen; fuer den
  // Prototyp reicht WR-only als erste Naeherung, spaeter ggf. verfeinern).
  const teamTotals = {}; // team -> { REC, YDS, TD }
  players.forEach(p => {
    const t = teamTotals[p.team] || (teamTotals[p.team] = { REC: 0, YDS: 0, TD: 0 });
    t.REC += p.REC || 0; t.YDS += p.YDS || 0; t.TD += p.TD || 0;
  });

  // ---- 3) Usage- und PPA-Daten per ID mergen ----
  const usageById = {};
  usageRaw.forEach(u => { if (u.position === 'WR') usageById[u.id] = u.usage; });
  const ppaById = {};
  ppaRaw.forEach(u => { if (u.position === 'WR') ppaById[u.id] = u; });

  players.forEach(p => {
    const t = teamTotals[p.team];
    p.recShare = round(100 * (p.REC || 0) / (t.REC || 1), 1);
    p.ydShare = round(100 * (p.YDS || 0) / (t.YDS || 1), 1);
    p.tdShare = round(100 * (p.TD || 0) / (t.TD || 1), 1);
    p.usage = usageById[p.id] || null;
    const ppa = ppaById[p.id];
    p.avgPPA = ppa ? round(ppa.averagePPA?.all, 3) : null;
    p.totalPPA = ppa ? round(ppa.totalPPA?.all, 2) : null;
  });

  fs.writeFileSync(OUT_JSON, JSON.stringify({ year: YEAR, count: players.length, players }, null, 2), 'utf8');
  console.log(`\nVolle Ausgabe gespeichert: ${OUT_JSON}`);

  // ---- Sanity-Check: Top 20 nach Yard Share ----
  const top = [...players].filter(p => p.YDS >= 300).sort((a, b) => (b.ydShare || 0) - (a.ydShare || 0)).slice(0, 20);
  console.log(`\n=== Top 20 WR nach Yard-Share (min. 300 Yds), Saison ${YEAR} ===\n`);
  console.log('Name'.padEnd(24) + 'Team'.padEnd(18) + 'REC'.padEnd(6) + 'YDS'.padEnd(7) + 'TD'.padEnd(5) + 'YdShare%'.padEnd(10) + 'RecShare%'.padEnd(11) + 'avgPPA'.padEnd(9) + 'UsgOvr%');
  top.forEach(p => {
    const usgOvr = p.usage ? round(100 * p.usage.overall, 1) : '-';
    console.log(
      (p.name || '').padEnd(24) + (p.team || '').padEnd(18) +
      String(p.REC ?? '-').padEnd(6) + String(p.YDS ?? '-').padEnd(7) + String(p.TD ?? '-').padEnd(5) +
      String(p.ydShare ?? '-').padEnd(10) + String(p.recShare ?? '-').padEnd(11) +
      String(p.avgPPA ?? '-').padEnd(9) + String(usgOvr)
    );
  });

  // ---- Daten-Qualitaets-Check: wie viele haben Usage/PPA gematcht? ----
  const withUsage = players.filter(p => p.usage).length;
  const withPpa = players.filter(p => p.avgPPA != null).length;
  console.log(`\nMatch-Quote: ${withUsage}/${players.length} mit Usage-Daten, ${withPpa}/${players.length} mit PPA-Daten.`);
  console.log('(Niedrige Quote hier deutet auf ID-Mismatch zwischen den Endpunkten hin -- bitte melden.)');
}

main().catch(e => { console.error('FEHLER:', e.message); process.exit(1); });
