// ============================================================
//  PBP STREAM — nflverse play_by_play_<Saison>.csv.gz zeilenweise lesen
// ============================================================
//  Eine volle Saison sind ~50k Zeilen x 370 Spalten. Komplett als Objekte
//  geparst waere das in der GitHub Action unnoetig speicherhungrig, daher
//  wird gestreamt und jede Zeile als Array + Spaltenindex uebergeben.
//  Genutzt von scripts/sync-air-yards.js und scripts/sync-player-style.js.
//  Nur Node-Bordmittel.
// ============================================================

const https = require('https');
const zlib = require('zlib');
const readline = require('readline');

const REL = 'https://github.com/nflverse/nflverse-data/releases/download';

// Eine CSV-Zeile splitten (Anfuehrungszeichen-sicher; pbp hat keine Zeilenumbrueche in Feldern)
function splitCsvLine(line) {
  const out = []; let f = '', q = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (q) { if (c === '"') { if (line[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += c; }
    else if (c === '"') q = true;
    else if (c === ',') { out.push(f); f = ''; }
    else f += c;
  }
  out.push(f);
  return out;
}

// onRow(cols, idx) je Datenzeile; idx = { spaltenname: index }
function streamPbp(season, onRow) {
  const url = `${REL}/pbp/play_by_play_${season}.csv.gz`;
  return new Promise((resolve, reject) => {
    const get = u => https.get(u, { headers: { 'User-Agent': 'hq-bot' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) return get(res.headers.location);
      if (res.statusCode !== 200) { res.resume(); return reject(new Error(`HTTP ${res.statusCode} für ${u}`)); }
      const rl = readline.createInterface({ input: res.pipe(zlib.createGunzip()), crlfDelay: Infinity });
      let idx = null;
      rl.on('line', line => {
        const cols = splitCsvLine(line);
        if (!idx) { idx = {}; cols.forEach((h, i) => { idx[h] = i; }); return; }
        onRow(cols, idx);
      });
      rl.on('close', resolve);
      rl.on('error', reject);
    }).on('error', reject);
    get(url);
  });
}

module.exports = { splitCsvLine, streamPbp, REL };
