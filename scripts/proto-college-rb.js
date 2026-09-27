#!/usr/bin/env node
// ============================================================
//  PROTOTYP: College Production Comp -- RB (nur zum Testen/Validieren)
// ============================================================
//  Analog zu proto-college-wr.js, aber RB braucht ZWEI Stat-Kategorien
//  (rushing + receiving -- viele Feature-Backs fangen auch Baelle), plus
//  usage.rush/usage.pass (CFBD liefert Rush-/Pass-Down-Usage-Anteile
//  direkt mit, nicht nur "overall" wie beim WR-Prototyp).
//
//  WICHTIG: Die exakten statType-Werte fuer category=rushing sind NOCH
//  NICHT bestaetigt (nur category=receiving kennen wir bereits: LONG,
//  REC, TD, YDS, YPR). Dieses Script speichert JEDEN statType generisch
//  als rush_<TYPE> bzw. rec_<TYPE> und druckt am Ende alle beobachteten
//  Keys aus -- damit wir die tatsaechlichen Feldnamen sehen, bevor wir
//  das ins Script fest verdrahten.
//
//  Team-Totals fuer Shares: ALLE Positionen (QB-Scrambles, WR-Jet-Sweeps
//  zaehlen mit in Team-Rushing; RB/TE-Screens zaehlen mit in Team-
//  Receiving) -- gleiche Lehre wie beim WR-Prototyp-Fix.
//
//  Usage (Windows PowerShell, Key ist evtl. noch in derselben Session gesetzt):
//    node scripts/proto-college-rb.js
//    YEAR=2024 node scripts/proto-college-rb.js
// ============================================================

const fs = require('fs');
const path = require('path');
const https = require('https');

const API_KEY = process.env.CFBD_API_KEY;
const YEAR = Number(process.env.YEAR || 2025);
const OUT_JSON = path.join(__dirname, '..', 'proto-college-rb-output.json');

if (!API_KEY) {
  console.error('FEHLER: CFBD_API_KEY ist nicht gesetzt.');
  process.exit(1);
}

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
  console.log(`\n=== College Production Comp Prototyp -- RB, Saison ${YEAR} ===\n`);

  console.log('1/4 Lade stats/player/season (rushing, alle Teams, 1 Call) ...');
  const rushingRaw = await cfbdGet(`/stats/player/season?year=${YEAR}&category=rushing`);
  console.log(`  -> ${rushingRaw.length} Zeilen`);

  console.log('2/4 Lade stats/player/season (receiving, alle Teams, 1 Call) ...');
  const receivingRaw = await cfbdGet(`/stats/player/season?year=${YEAR}&category=receiving`);
  console.log(`  -> ${receivingRaw.length} Zeilen`);

  console.log('3/4 Lade player/usage (alle Teams, 1 Call) ...');
  let usageRaw = [];
  try {
    usageRaw = await cfbdGet(`/player/usage?year=${YEAR}`);
    console.log(`  -> ${usageRaw.length} Zeilen`);
  } catch (e) {
    console.warn(`  WARNUNG: player/usage fehlgeschlagen (${e.message}).`);
  }

  console.log('4/4 Lade ppa/players/season (alle Teams, 1 Call) ...');
  let ppaRaw = [];
  try {
    ppaRaw = await cfbdGet(`/ppa/players/season?year=${YEAR}`);
    console.log(`  -> ${ppaRaw.length} Zeilen`);
  } catch (e) {
    console.warn(`  WARNUNG: ppa/players/season fehlgeschlagen (${e.message}).`);
  }

  // ---- Welche statType-Werte kommen tatsaechlich fuer "rushing" vor? ----
  const seenRushTypes = new Set();
  rushingRaw.forEach(r => seenRushTypes.add(r.statType));
  console.log(`\nBeobachtete statType-Werte fuer category=rushing: ${[...seenRushTypes].sort().join(', ')}`);

  // ---- 1) Long-Format -> pro RB pivotieren (generisch, rush_/rec_ Praefix) ----
  const byPlayer = {};
  const getOrCreate = (id, name, team, conf) =>
    byPlayer[id] || (byPlayer[id] = { id, name, team, conf, position: 'RB' });

  rushingRaw.forEach(r => {
    if (r.position !== 'RB') return;
    if (!FBS_CONFERENCES.has(r.conference)) return;
    const p = getOrCreate(r.playerId, r.player, r.team, r.conference);
    p[`rush_${r.statType}`] = num(r.stat);
  });
  receivingRaw.forEach(r => {
    if (r.position !== 'RB') return;
    if (!FBS_CONFERENCES.has(r.conference)) return;
    const p = getOrCreate(r.playerId, r.player, r.team, r.conference);
    p[`rec_${r.statType}`] = num(r.stat);
  });
  // Nur Spieler behalten, die ueberhaupt Rushing-Zeilen hatten (reine Pass-Catcher-RBs sind selten/Sonderfall)
  const players = Object.values(byPlayer).filter(p => Object.keys(p).some(k => k.startsWith('rush_')));
  console.log(`\nNach RB + FBS-Filter (mit Rushing-Daten): ${players.length} Spieler.`);

  // ---- 2) Team-Totals ueber ALLE Positionen (Rushing- und Receiving-Yards getrennt) ----
  const teamRush = {}; // team -> { CAR, YDS, TD } (Feldnamen je nach beobachteten statTypes)
  rushingRaw.forEach(r => {
    if (!FBS_CONFERENCES.has(r.conference)) return;
    const t = teamRush[r.team] || (teamRush[r.team] = {});
    t[r.statType] = (t[r.statType] || 0) + (num(r.stat) || 0);
  });
  const teamRec = {};
  receivingRaw.forEach(r => {
    if (!FBS_CONFERENCES.has(r.conference)) return;
    if (r.statType !== 'REC' && r.statType !== 'YDS' && r.statType !== 'TD') return;
    const t = teamRec[r.team] || (teamRec[r.team] = { REC: 0, YDS: 0, TD: 0 });
    t[r.statType] += num(r.stat) || 0;
  });

  // ---- 3) Usage + PPA mergen ----
  const usageById = {};
  usageRaw.forEach(u => { if (u.position === 'RB') usageById[u.id] = u.usage; });
  const ppaById = {};
  ppaRaw.forEach(u => { if (u.position === 'RB') ppaById[u.id] = u; });

  players.forEach(p => {
    const tRush = teamRush[p.team] || {};
    const tRec = teamRec[p.team] || { REC: 1, YDS: 1, TD: 1 };
    // rush_YDS/rush_CAR sind ANNAHMEN -- werden unten anhand des gedruckten
    // statType-Sets validiert. Falls die echten Namen abweichen, muss die
    // naechste Version diese Zeilen anpassen.
    const rushYdsKey = ['YDS'].find(k => `rush_${k}` in p);
    const rushCarKey = ['CAR', 'ATT'].find(k => `rush_${k}` in p);
    p.rushYds = rushYdsKey ? p[`rush_${rushYdsKey}`] : null;
    p.rushCar = rushCarKey ? p[`rush_${rushCarKey}`] : null;
    p.rushTd = p.rush_TD ?? null;
    p.rushYdShare = tRush.YDS ? round(100 * (p.rushYds || 0) / tRush.YDS, 1) : null;
    p.rushCarShare = (rushCarKey && tRush[rushCarKey]) ? round(100 * (p.rushCar || 0) / tRush[rushCarKey], 1) : null;
    p.recRec = p.rec_REC ?? null;
    p.recYds = p.rec_YDS ?? null;
    p.recYdShare = tRec.YDS ? round(100 * (p.recYds || 0) / tRec.YDS, 1) : null;
    p.scrimmageYds = (p.rushYds || 0) + (p.recYds || 0);
    p.usage = usageById[p.id] || null;
    const ppa = ppaById[p.id];
    p.avgPpaRush = ppa ? round(ppa.averagePPA?.rush, 3) : null;
    p.avgPpaPass = ppa ? round(ppa.averagePPA?.pass, 3) : null;
  });

  fs.writeFileSync(OUT_JSON, JSON.stringify({ year: YEAR, count: players.length, rushStatTypes: [...seenRushTypes], players }, null, 2), 'utf8');
  console.log(`\nVolle Ausgabe gespeichert: ${OUT_JSON}`);

  // ---- Sanity-Check: Top 20 nach Scrimmage Yards ----
  const top = [...players].filter(p => p.scrimmageYds >= 500).sort((a, b) => b.scrimmageYds - a.scrimmageYds).slice(0, 20);
  console.log(`\n=== Top 20 RB nach Scrimmage Yards (min. 500), Saison ${YEAR} ===\n`);
  console.log(
    'Name'.padEnd(22) + 'Team'.padEnd(16) + 'RushYds'.padEnd(8) + 'RecYds'.padEnd(8) +
    'RushYdSh%'.padEnd(10) + 'RushCarSh%'.padEnd(11) + 'RecYdSh%'.padEnd(9) +
    'PPA-Rush'.padEnd(9) + 'PPA-Pass'.padEnd(9) + 'UsgRush%'.padEnd(9) + 'UsgPass%'
  );
  top.forEach(p => {
    const usgRush = p.usage ? round(100 * p.usage.rush, 1) : '-';
    const usgPass = p.usage ? round(100 * p.usage.pass, 1) : '-';
    console.log(
      (p.name || '').padEnd(22) + (p.team || '').padEnd(16) +
      String(p.rushYds ?? '-').padEnd(8) + String(p.recYds ?? '-').padEnd(8) +
      String(p.rushYdShare ?? '-').padEnd(10) + String(p.rushCarShare ?? '-').padEnd(11) +
      String(p.recYdShare ?? '-').padEnd(9) + String(p.avgPpaRush ?? '-').padEnd(9) +
      String(p.avgPpaPass ?? '-').padEnd(9) + String(usgRush).padEnd(9) + String(usgPass)
    );
  });

  const withUsage = players.filter(p => p.usage).length;
  const withPpa = players.filter(p => p.avgPpaRush != null).length;
  console.log(`\nMatch-Quote: ${withUsage}/${players.length} mit Usage-Daten, ${withPpa}/${players.length} mit PPA-Daten.`);
  console.log('\nWICHTIG: Bitte die Zeile "Beobachtete statType-Werte fuer category=rushing" oben mitschicken --');
  console.log('falls CAR/YDS nicht wie angenommen heissen, sind rushCar/rushCarShare oben eventuell leer/falsch.');
}

main().catch(e => { console.error('FEHLER:', e.message); process.exit(1); });
