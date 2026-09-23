#!/usr/bin/env node
// ============================================================
//  ESPN PLAYER WEEKLY STATS SYNC (fürs Player-Rankings-Board)
// ============================================================
//  UMGEBAUT (15.09.2026, nach Diagnose): view=kona_player_info liefert
//  für ECHTE Punkte (statSourceId=0) nur den SAISON-GESAMTWERT
//  (statSplitTypeId=0, scoringPeriodId=0) -- keine Wochenaufschlüsselung.
//  Die einzige Wochenaufschlüsselung in dieser View ist bei PROJEKTIONEN
//  (statSourceId=1), nicht bei echten Werten. Deshalb lieferte die alte
//  Version (Filter auf statSourceId=0 UND statSplitTypeId=1) konstant 0
//  Treffer -- bestätigt per Diagnose-Log aus einem echten Sync-Lauf.
//
//  Jetzt genutzt: dieselbe woechentliche Boxscore-Methode wie
//  scripts/sync-fantasy-position-score.js (dort bereits nachweislich
//  erfolgreich, siehe dortige Kommentare) -- pro bereits gespielter Woche
//  wird der Liga-Boxscore (view=mBoxscore) geholt und JEDER Roster-
//  Eintrag (Starter UND Bank, anders als beim Fantasy-Power-Score, der
//  nur Starter zaehlt) ausgewertet.
//
//  BEKANNTE EINSCHRÄNKUNG: erfasst werden nur Spieler, die in der
//  jeweiligen Woche auf einem der 12 Team-Kader standen. Reine Free
//  Agents, die nie von jemandem gerostert wurden, tauchen hier NICHT
//  auf (kein Zugriff auf den vollen ESPN-Spielerpool mit Wochenwerten).
//  Fuer Player Rankings/Best-Available betrifft das nur Spieler, die
//  ohnehin nie interessant waren -- alles fantasy-relevante ist erfasst.
//
//  Usage:
//    node scripts/sync-espn-player-stats.js
// ============================================================

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const https = require('https');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'data', 'player-stats.js');
const { loadFrozenWeeks, isFrozenWeek } = require('./lib/frozen-weeks');

function loadModuleSandbox(files) {
  const sandbox = {};
  vm.createContext(sandbox);
  files.forEach(f => {
    const code = fs.readFileSync(f, 'utf8');
    const names = [...code.matchAll(/^const\s+([A-Za-z_\$][\w\$]*)/gm)].map(m => m[1]);
    const expose = names.map(n => `this.${n} = ${n};`).join('\n');
    vm.runInContext(code + '\n' + expose, sandbox);
  });
  return sandbox;
}
function loadConfig() {
  const sandbox = loadModuleSandbox([path.join(ROOT, 'js', 'espn-sync.js')]);
  return {
    ESPN_LEAGUE_ID: sandbox.ESPN_LEAGUE_ID, ESPN_SEASON: sandbox.ESPN_SEASON,
    ESPN_POS_MAP: sandbox.ESPN_POS_MAP, ESPN_NFL_MAP: sandbox.ESPN_NFL_MAP,
  };
}
function loadWeeklyScores(season) {
  const sandbox = loadModuleSandbox([path.join(ROOT, 'data', 'weekly-scores.js')]);
  return (sandbox.WEEKLY_SCORES && sandbox.WEEKLY_SCORES[season]) || {};
}

function httpsGetJson(url, headers) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return httpsGetJson(res.headers.location, headers).then(resolve, reject);
      }
      if (res.statusCode === 401 || res.statusCode === 403) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode} — Liga vermutlich privat. ESPN_S2/SWID setzen.`));
      }
      if (res.statusCode !== 200) { res.resume(); return reject(new Error(`HTTP ${res.statusCode} für ${url}`)); }
      let data = '';
      res.on('data', c => { data += c; });
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(new Error('Keine gültige JSON-Antwort: ' + e.message)); }
      });
    }).on('error', reject);
  });
}

function authHeaders() {
  const headers = { 'User-Agent': 'bear-witch-project-hq-bot', 'Accept': 'application/json' };
  const cookieParts = [];
  if (process.env.ESPN_S2) cookieParts.push(`espn_s2=${process.env.ESPN_S2}`);
  if (process.env.SWID) cookieParts.push(`SWID=${process.env.SWID}`);
  if (cookieParts.length) headers['Cookie'] = cookieParts.join('; ');
  return headers;
}

// Identisch zu scripts/sync-fantasy-position-score.js: appliedStatTotal
// direkt am Roster-Eintrag ist der primaere, nachweislich funktionierende
// Weg; der stats-Array-Fallback bleibt fuer alle Faelle drin.
function extractWeekPoints(entry, week) {
  if (typeof entry.playerPoolEntry?.appliedStatTotal === 'number') {
    return entry.playerPoolEntry.appliedStatTotal;
  }
  const stats = entry.playerPoolEntry?.player?.stats || [];
  const match = stats.find(s => s.statSourceId === 0 && s.statSplitTypeId === 1 && s.scoringPeriodId === week);
  return match ? (match.appliedTotal || 0) : null;
}

async function fetchWeekBoxscore(cfg, week) {
  const url = `https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/${cfg.ESPN_SEASON}/segments/0/leagues/${cfg.ESPN_LEAGUE_ID}?view=mBoxscore&view=mMatchupScore&scoringPeriodId=${week}`;
  const data = await httpsGetJson(url, authHeaders());
  const playersThisWeek = []; // { name, pos, team, points }
  (data.schedule || []).forEach(matchup => {
    if (matchup.matchupPeriodId !== week) return;
    ['home', 'away'].forEach(side => {
      const teamSide = matchup[side];
      if (!teamSide) return;
      const entries = teamSide.rosterForCurrentScoringPeriod?.entries || [];
      entries.forEach(entry => {
        const p = entry.playerPoolEntry?.player;
        if (!p || !p.fullName) return;
        const pts = extractWeekPoints(entry, week);
        if (pts == null) return;
        playersThisWeek.push({
          name: p.fullName,
          pos: cfg.ESPN_POS_MAP[p.defaultPositionId] || '?',
          team: cfg.ESPN_NFL_MAP[p.proTeamId] || 'FA',
          points: Math.round(pts * 10) / 10,
        });
      });
    });
  });
  return playersThisWeek;
}

async function main() {
  const cfg = loadConfig();
  const season = cfg.ESPN_SEASON;
  const weeklyScores = loadWeeklyScores(season);
  const playedWeeks = Object.keys(weeklyScores).map(Number).filter(w => (weeklyScores[w] || []).length > 0).sort((a, b) => a - b);

  if (!playedWeeks.length) {
    console.log(`Season ${season}: noch keine gespielte Woche in data/weekly-scores.js -- Sync übersprungen, keine Datei geschrieben.`);
    return;
  }

  const byPlayer = {}; // name -> { pos, team, weeklyPoints: {week: pts} }
  // ESPN-Draft-Reset 23.09.2026: W1/W2-Boxscores gibt es auf ESPN nicht mehr,
  // die Werte kommen fest aus data/frozen-weeks-2026.js.
  const frozen = loadFrozenWeeks(season);
  if (frozen) Object.entries(frozen.playerWeeklyPoints || {}).forEach(([name, p]) => {
    byPlayer[name] = { pos: p.pos, team: p.team, weeklyPoints: { ...p.weeklyPoints } };
  });
  for (const week of playedWeeks) {
    if (isFrozenWeek(frozen, week)) continue;
    let weekPlayers = [];
    try {
      weekPlayers = await fetchWeekBoxscore(cfg, week);
    } catch (e) {
      console.warn(`⚠️  Woche ${week}: Boxscore übersprungen (best effort):`, e.message);
      continue;
    }
    console.log(`Woche ${week}: ${weekPlayers.length} Spieler-Einträge aus dem Boxscore.`);
    weekPlayers.forEach(p => {
      byPlayer[p.name] = byPlayer[p.name] || { pos: p.pos, team: p.team, weeklyPoints: {} };
      byPlayer[p.name].pos = p.pos; // immer den neuesten Stand nehmen (Positionswechsel selten, aber moeglich)
      byPlayer[p.name].team = p.team;
      byPlayer[p.name].weeklyPoints[week] = p.points;
    });
  }

  const players = Object.entries(byPlayer).map(([name, p]) => {
    const weeks = Object.keys(p.weeklyPoints);
    const total = Object.values(p.weeklyPoints).reduce((a, b) => a + b, 0);
    return {
      name, team: p.team, pos: p.pos,
      weeklyPoints: p.weeklyPoints,
      gamesPlayed: weeks.length,
      totalPoints: Math.round(total * 10) / 10,
      avgPoints: Math.round((total / weeks.length) * 10) / 10,
    };
  }).sort((a, b) => b.totalPoints - a.totalPoints);

  const out = `// ============================================================
//  PLAYER_SEASON_STATS — tatsächlich erzielte Punkte je Woche
// ============================================================
//  AUTO-GENERIERT von scripts/sync-espn-player-stats.js.
//  Zuletzt synchronisiert: ${new Date().toISOString()}
//
//  Quelle: woechentlicher ESPN-Boxscore (view=mBoxscore), nicht
//  kona_player_info -- siehe Kommentarkopf im Script fuer die Begruendung.
//  Erfasst nur Spieler, die in der jeweiligen Woche auf einem der 12
//  Team-Kader standen (Starter + Bank) -- keine reinen Free Agents.
// ============================================================

const PLAYER_SEASON_STATS = ${JSON.stringify({ season: cfg.ESPN_SEASON, updated: new Date().toISOString(), players })};
`;
  fs.writeFileSync(OUT, out, 'utf8');
  console.log(`${OUT} aktualisiert: ${players.length} Spieler mit mind. 1 gespielter Woche.`);
}

main().catch(err => {
  console.error('ESPN Player Stats Sync fehlgeschlagen:', err.message);
  process.exit(1); // sichtbarer Fehlschlag in der Action, statt still gruen zu bleiben
});
