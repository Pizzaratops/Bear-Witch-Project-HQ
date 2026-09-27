#!/usr/bin/env node
// ============================================================
//  PROTOTYP: College Production Comp -- QB (nur zum Testen/Validieren)
// ============================================================
//  Analog zu proto-college-rb.js. QB braucht passing UND rushing
//  (Dual-Threat-QBs), plus usage.pass/usage.rush und averagePPA.pass/rush
//  (beide bereits bestaetigt fuer RB, sollten identisch fuer QB gelten).
//
//  WICHTIG: Die exakten statType-Werte fuer category=passing sind NOCH
//  NICHT bestaetigt. Generische Erfassung (pass_<TYPE>, rush_<TYPE>) wie
//  beim RB-Prototyp -- druckt am Ende alle beobachteten Keys aus.
//
//  Laut Projekt-Doc (Abschnitt 1) MUESSEN Passing und Rushing getrennt
//  standardisiert werden, bevor sie zusammengefuehrt werden -- sonst
//  bekommt ein Dual-Threat-QB (z.B. viele Rushing-Yards, wenig Passing-
//  Volumen) einen verzerrten Gesamtwert. Deshalb hier klar getrennte
//  Passing- und Rushing-Felder, keine Mischmetrik.
//
//  Usage (Windows PowerShell, Key evtl. noch in derselben Session gesetzt):
//    node scripts/proto-college-qb.js
//    YEAR=2024 node scripts/proto-college-qb.js
// ============================================================

const fs = require('fs');
const path = require('path');
const https = require('https');

const API_KEY = process.env.CFBD_API_KEY;
const YEAR = Number(process.env.YEAR || 2025);
const OUT_JSON = path.join(__dirname, '..', 'proto-college-qb-output.json');

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
  console.log(`\n=== College Production Comp Prototyp -- QB, Saison ${YEAR} ===\n`);

  console.log('1/4 Lade stats/player/season (passing, alle Teams, 1 Call) ...');
  const passingRaw = await cfbdGet(`/stats/player/season?year=${YEAR}&category=passing`);
  console.log(`  -> ${passingRaw.length} Zeilen`);

  console.log('2/4 Lade stats/player/season (rushing, alle Teams, 1 Call) ...');
  const rushingRaw = await cfbdGet(`/stats/player/season?year=${YEAR}&category=rushing`);
  console.log(`  -> ${rushingRaw.length} Zeilen`);

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

  const seenPassTypes = new Set();
  passingRaw.forEach(r => seenPassTypes.add(r.statType));
  console.log(`\nBeobachtete statType-Werte fuer category=passing: ${[...seenPassTypes].sort().join(', ')}`);

  // ---- Pivotieren (generisch, pass_/rush_ Praefix) ----
  const byPlayer = {};
  const getOrCreate = (id, name, team, conf) =>
    byPlayer[id] || (byPlayer[id] = { id, name, team, conf, position: 'QB' });

  passingRaw.forEach(r => {
    if (r.position !== 'QB') return;
    if (!FBS_CONFERENCES.has(r.conference)) return;
    const p = getOrCreate(r.playerId, r.player, r.team, r.conference);
    p[`pass_${r.statType}`] = num(r.stat);
  });
  rushingRaw.forEach(r => {
    if (r.position !== 'QB') return;
    if (!FBS_CONFERENCES.has(r.conference)) return;
    const p = getOrCreate(r.playerId, r.player, r.team, r.conference);
    p[`rush_${r.statType}`] = num(r.stat);
  });
  const players = Object.values(byPlayer).filter(p => Object.keys(p).some(k => k.startsWith('pass_')));
  console.log(`\nNach QB + FBS-Filter (mit Passing-Daten): ${players.length} Spieler.`);

  const usageById = {};
  usageRaw.forEach(u => { if (u.position === 'QB') usageById[u.id] = u.usage; });
  const ppaById = {};
  ppaRaw.forEach(u => { if (u.position === 'QB') ppaById[u.id] = u; });

  players.forEach(p => {
    // ANNAHMEN fuer gaengige CFBD-Passing-statType-Namen -- werden unten
    // anhand des gedruckten Sets validiert, ggf. in der naechsten Version
    // anpassen.
    const passYdsKey = ['YDS'].find(k => `pass_${k}` in p);
    const passAttKey = ['ATT', 'ATTEMPTS'].find(k => `pass_${k}` in p);
    const passCompKey = ['COMPLETIONS', 'CMP'].find(k => `pass_${k}` in p);
    p.passYds = passYdsKey ? p[`pass_${passYdsKey}`] : null;
    p.passAtt = passAttKey ? p[`pass_${passAttKey}`] : null;
    p.passComp = passCompKey ? p[`pass_${passCompKey}`] : null;
    p.passTd = p.pass_TD ?? null;
    p.passInt = p.pass_INT ?? null;
    p.compPct = (p.passComp != null && p.passAtt) ? round(100 * p.passComp / p.passAtt, 1) : null;
    p.rushYds = p.rush_YDS ?? null;
    p.rushCar = p.rush_CAR ?? null;
    const usage = usageById[p.id];
    p.usagePass = usage ? round(100 * usage.pass, 1) : null;
    p.usageRush = usage ? round(100 * usage.rush, 1) : null;
    const ppa = ppaById[p.id];
    p.avgPpaPass = ppa ? round(ppa.averagePPA?.pass, 3) : null;
    p.avgPpaRush = ppa ? round(ppa.averagePPA?.rush, 3) : null;
  });

  fs.writeFileSync(OUT_JSON, JSON.stringify({ year: YEAR, count: players.length, passStatTypes: [...seenPassTypes], players }, null, 2), 'utf8');
  console.log(`\nVolle Ausgabe gespeichert: ${OUT_JSON}`);

  const top = [...players].filter(p => p.passYds >= 1500).sort((a, b) => (b.passYds || 0) - (a.passYds || 0)).slice(0, 20);
  console.log(`\n=== Top 20 QB nach Passing Yards (min. 1500), Saison ${YEAR} ===\n`);
  console.log(
    'Name'.padEnd(22) + 'Team'.padEnd(16) + 'PassYds'.padEnd(8) + 'Comp%'.padEnd(7) +
    'RushYds'.padEnd(8) + 'PpaPass'.padEnd(9) + 'PpaRush'.padEnd(9) + 'UsgPass%'.padEnd(9) + 'UsgRush%'
  );
  top.forEach(p => {
    console.log(
      (p.name || '').padEnd(22) + (p.team || '').padEnd(16) +
      String(p.passYds ?? '-').padEnd(8) + String(p.compPct ?? '-').padEnd(7) +
      String(p.rushYds ?? '-').padEnd(8) + String(p.avgPpaPass ?? '-').padEnd(9) +
      String(p.avgPpaRush ?? '-').padEnd(9) + String(p.usagePass ?? '-').padEnd(9) + String(p.usageRush ?? '-')
    );
  });

  const withUsage = players.filter(p => p.usagePass != null).length;
  const withPpa = players.filter(p => p.avgPpaPass != null).length;
  console.log(`\nMatch-Quote: ${withUsage}/${players.length} mit Usage-Daten, ${withPpa}/${players.length} mit PPA-Daten.`);
  console.log('\nWICHTIG: Bitte die Zeile "Beobachtete statType-Werte fuer category=passing" oben mitschicken --');
  console.log('falls ATT/COMPLETIONS/YDS nicht wie angenommen heissen, sind manche Felder oben eventuell leer/falsch.');
}

main().catch(e => { console.error('FEHLER:', e.message); process.exit(1); });
