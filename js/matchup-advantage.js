/* ============================================================
   MATCHUP ADVANTAGE — Unit gegen Unit je NFL-Spiel
   ============================================================
   Daten: data/matchup-advantage.js (MATCHUP_ADVANTAGE), erzeugt von
   scripts/sync-matchup-advantage.js (nflverse, GitHub Action).

   Liefert:
     showNflMatchup() / renderNflMatchup()   Seite "page-nflmatchup"
     maPlayerBadge(pos, nflTeam, week)       Badge-HTML fuer den
                                             Spieler-Matchup-Boost
     maOpponent(nflTeam, week)               Gegner-Kuerzel einer Woche

   Bewusst eigenstaendig (nur navigate() + emptyState() aus app.js
   werden benutzt), damit das Modul 1:1 in andere HQ-Repos passt.
   ============================================================ */

// Primaerfarben, auf dunklem UND hellem Hintergrund lesbar abgestimmt
const MA_TEAM_COLORS = {
  ARI: '#b0243f', ATL: '#c8102e', BAL: '#4b3a9c', BUF: '#1f5fbf', CAR: '#0085ca', CHI: '#d4561c',
  CIN: '#fb4f14', CLE: '#b8521c', DAL: '#2f5f9f', DEN: '#fb4f14', DET: '#0076b6', GB: '#2f7a4f',
  HOU: '#b3243a', IND: '#1f5fbf', JAX: '#0f8a96', KC: '#e31837', LAC: '#0080c6', LAR: '#2f5fbf',
  LV: '#8a929a', MIA: '#008e97', MIN: '#6b3fa0', NE: '#c60c30', NO: '#b39a5e', NYG: '#1f4fbf',
  NYJ: '#1f7a55', PHI: '#0f7a78', PIT: '#e0a800', SEA: '#4a9a3a', SF: '#bf2b2b', TB: '#d50a0a',
  TEN: '#4b92db', WAS: '#8f2a3a', WSH: '#8f2a3a',
};
const MA_TEAM_NAMES = {
  ARI: 'Cardinals', ATL: 'Falcons', BAL: 'Ravens', BUF: 'Bills', CAR: 'Panthers', CHI: 'Bears',
  CIN: 'Bengals', CLE: 'Browns', DAL: 'Cowboys', DEN: 'Broncos', DET: 'Lions', GB: 'Packers',
  HOU: 'Texans', IND: 'Colts', JAX: 'Jaguars', KC: 'Chiefs', LAC: 'Chargers', LAR: 'Rams',
  LV: 'Raiders', MIA: 'Dolphins', MIN: 'Vikings', NE: 'Patriots', NO: 'Saints', NYG: 'Giants',
  NYJ: 'Jets', PHI: 'Eagles', PIT: 'Steelers', SEA: 'Seahawks', SF: '49ers', TB: 'Buccaneers',
  TEN: 'Titans', WAS: 'Commanders', WSH: 'Commanders',
};
const MA_WEEKDAY_DE = { Sunday: 'So', Monday: 'Mo', Thursday: 'Do', Saturday: 'Sa', Friday: 'Fr', Tuesday: 'Di', Wednesday: 'Mi' };

let maState = { week: null, game: null };

function _maData() { return (typeof MATCHUP_ADVANTAGE !== 'undefined' && MATCHUP_ADVANTAGE) || null; }
// Kuerzel-Normalisierung: Sleeper/ESPN nutzen teils WAS/LA/JAC
function _maAbbr(a) {
  if (!a) return a;
  const m = { WAS: 'WSH', LA: 'LAR', JAC: 'JAX', GBP: 'GB', NEP: 'NE', NOS: 'NO', SFO: 'SF', TBB: 'TB', LVR: 'LV' };
  return m[a] || a;
}
function _maColor(a) { return MA_TEAM_COLORS[a] || 'var(--accent)'; }
function _maFmt(v, fmt) {
  if (v == null) return '—';
  if (fmt === 'epa') return (v >= 0 ? '+' : '') + v.toFixed(2);
  return (v * 100).toFixed(1) + '%';
}
// Rang-Tier: 1-8 stark, 25-32 schwach
function _maTier(rank) { return rank == null ? '' : rank <= 8 ? 'ma-top' : rank >= 25 ? 'ma-low' : ''; }
function _maRankChip(rank) { return `<span class="ma-rank ${_maTier(rank)}">${rank != null ? '#' + rank : '–'}</span>`; }

function _maRecord(D, abbr, beforeWeek) {
  let w = 0, l = 0, t = 0;
  Object.keys(D.schedule).map(Number).filter(wk => wk < beforeWeek).forEach(wk => {
    D.schedule[wk].forEach(g => {
      if (g.homeScore == null) return;
      const mine = g.home === abbr ? g.homeScore : g.away === abbr ? g.awayScore : null;
      if (mine == null) return;
      const opp = g.home === abbr ? g.awayScore : g.homeScore;
      if (mine > opp) w++; else if (mine < opp) l++; else t++;
    });
  });
  return `${w}-${l}${t ? '-' + t : ''}`;
}

function maOpponent(nflTeam, week) {
  const D = _maData(); if (!D) return null;
  const a = _maAbbr(nflTeam);
  const g = (D.schedule[week] || []).find(x => x.home === a || x.away === a);
  if (!g) return null;
  return { opp: g.home === a ? g.away : g.home, home: g.home === a, game: g };
}

// Badge fuer den Fantasy-Matchup-Boost: Gegner-Rang bei Fantasy Points
// Allowed an diese Position. Rang 1 = Gegner laesst die meisten Punkte zu.
function maPlayerBadge(pos, nflTeam, week) {
  const D = _maData(); if (!D) return '';
  if (!D.fpaPositions.includes(pos)) return '';
  const o = maOpponent(nflTeam, week);
  if (!o) return `<span class="ma-boost ma-bye" title="Bye Week">BYE</span>`;
  const t = D.teams[o.opp];
  const rank = t && t.fpaRank ? t.fpaRank[pos] : null;
  if (rank == null) return '';
  const cls = rank <= 8 ? 'ma-good' : rank >= 25 ? 'ma-bad' : 'ma-mid';
  const arrow = rank <= 8 ? '▲' : rank >= 25 ? '▼' : '•';
  const tip = `${o.home ? 'vs' : '@'} ${o.opp}: lässt ${t.fpa[pos]} PPR-Punkte/Spiel an ${pos} zu (Rang ${rank}/32, 1 = meiste)`;
  return `<span class="ma-boost ${cls}" title="${tip}">${arrow} ${o.home ? 'vs' : '@'} ${o.opp} #${rank}</span>`;
}

function showNflMatchup() { navigate('nflmatchup'); renderNflMatchup(); }
function maSetWeek(w) { maState.week = Number(w); maState.game = null; renderNflMatchup(); }
function maSetGame(i) { maState.game = Number(i); renderNflMatchup(); }

// Ein Vergleichsblock: Offense-Team gegen Defense-Team
function _maUnitBlock(D, offA, defA) {
  const off = D.teams[offA], def = D.teams[defA];
  let offEdges = 0, defEdges = 0;
  const rows = D.metrics.map(m => {
    const oR = off.offRank[m.key], dR = def.defRank[m.key];
    // Vorteil: Rangdifferenz auf -1..+1 skaliert (+ = Offense im Vorteil)
    const adv = oR != null && dR != null ? (dR - oR) / 31 : 0;
    if (adv > 0.1) offEdges++; else if (adv < -0.1) defEdges++;
    const pct = Math.min(50, Math.abs(adv) * 50);
    const winner = adv >= 0 ? offA : defA;
    const fill = `<div class="ma-fill" style="${adv >= 0 ? 'right:50%' : 'left:50%'};width:${pct}%;background:${_maColor(winner)}"></div>`;
    const knob = `<div class="ma-knob" style="left:${50 - adv * 50}%;border-color:${_maColor(winner)};color:${_maColor(winner)}">${winner}</div>`;
    const takenCreated = m.key === 'sackRate' ? '<div class="ma-sub">zugelassen / erzeugt</div>' : '';
    return `
      <div class="ma-row">
        <div class="ma-label">${m.label}${takenCreated}</div>
        <div class="ma-val ma-val-l">${_maFmt(off.off[m.key], m.fmt)} ${_maRankChip(oR)}</div>
        <div class="ma-track"><div class="ma-center"></div>${fill}${knob}</div>
        <div class="ma-val ma-val-r">${_maRankChip(dR)} ${_maFmt(def.def[m.key], m.fmt)}</div>
      </div>`;
  }).join('');
  const verdict = offEdges > defEdges
    ? `<b style="color:${_maColor(offA)}">${offA}-Offense</b> im Vorteil (${offEdges} von ${D.metrics.length} Kategorien)`
    : defEdges > offEdges
      ? `<b style="color:${_maColor(defA)}">${defA}-Defense</b> im Vorteil (${defEdges} von ${D.metrics.length} Kategorien)`
      : 'Ausgeglichen';
  return `
    <div class="ma-block">
      <div class="ma-block-head">
        <span style="color:${_maColor(offA)}">← ${offA} OFFENSE</span>
        <span class="ma-vs">vs</span>
        <span style="color:${_maColor(defA)}">${defA} DEFENSE →</span>
      </div>
      ${rows}
      <div class="ma-verdict">${verdict}</div>
    </div>`;
}

function _maFpaBlock(D, defA, offA) {
  const t = D.teams[defA];
  return `
    <div class="ma-fpa">
      <div class="ma-fpa-title"><span style="color:${_maColor(defA)}">${defA}-Defense</span> lässt zu · gut für ${offA}-Spieler:</div>
      <div class="ma-fpa-grid">
        ${D.fpaPositions.map(pos => {
          const r = t.fpaRank[pos];
          const cls = r == null ? '' : r <= 8 ? 'ma-good' : r >= 25 ? 'ma-bad' : 'ma-mid';
          return `<div class="ma-fpa-cell ${cls}"><div class="ma-fpa-pos">${pos}</div><div class="ma-fpa-n">${t.fpa[pos] != null ? t.fpa[pos].toFixed(1) : '—'}</div><div class="ma-fpa-r">#${r ?? '–'}</div></div>`;
        }).join('')}
      </div>
    </div>`;
}

function renderNflMatchup() {
  const wrap = document.getElementById('nflmatchupContent');
  const D = _maData();
  if (!D) {
    wrap.innerHTML = emptyState('Noch keine Matchup-Daten', 'Sobald der Sync „Matchup Advantage“ (GitHub Action) einmal gelaufen ist, erscheinen hier alle NFL-Spiele der Woche mit Unit-Vergleich.', '⚔️');
    return;
  }
  const weeks = Object.keys(D.schedule).map(Number).sort((a, b) => a - b);
  const week = maState.week && D.schedule[maState.week] ? maState.week : D.currentWeek;
  const games = D.schedule[week] || [];
  let gi = maState.game;
  if (gi == null || !games[gi]) {
    gi = games.findIndex(g => g.homeScore == null);
    if (gi < 0) gi = 0;
  }
  maState = { week, game: gi };
  const g = games[gi];

  const gameBtns = games.map((x, i) => {
    const done = x.homeScore != null;
    return `<button class="ma-game${i === gi ? ' active' : ''}" onclick="maSetGame(${i})">
      <span class="ma-game-teams"><span style="color:${_maColor(x.away)}">${x.away}</span> @ <span style="color:${_maColor(x.home)}">${x.home}</span></span>
      <span class="ma-game-meta">${done ? `${x.awayScore}:${x.homeScore}` : `${MA_WEEKDAY_DE[x.weekday] || ''} ${x.time || ''}`}</span>
    </button>`;
  }).join('');

  const spreadTxt = g.spread == null ? '' : g.spread === 0 ? 'Pick’em' :
    `${g.spread > 0 ? g.home : g.away} −${Math.abs(g.spread)}`;
  const teamHead = (a, side) => `
    <div class="ma-team" style="--tc:${_maColor(a)}">
      <div class="ma-team-abbr">${a}</div>
      <div>
        <div class="ma-team-side">${side} · ${_maRecord(D, a, week)} · ${D.teams[a].games} Sp. in den Daten</div>
        <div class="ma-team-name">${MA_TEAM_NAMES[a] || a}</div>
      </div>
    </div>`;

  const smallSample = Math.min(D.teams[g.away].games, D.teams[g.home].games) < 4;

  wrap.innerHTML = `
    <div class="ma-controls">
      <select class="ma-select" onchange="maSetWeek(this.value)">
        ${weeks.map(w => `<option value="${w}"${w === week ? ' selected' : ''}>Woche ${w}${w === D.currentWeek ? ' (aktuell)' : ''}</option>`).join('')}
      </select>
      <span class="ma-note">Stats Saison ${D.season} bis Woche ${D.throughWeek} · Ränge 1–32, 1 = beste Unit</span>
    </div>
    <div class="ma-games">${gameBtns}</div>

    <div class="ma-head">
      ${teamHead(g.away, 'AUSWÄRTS')}
      <div class="ma-at">
        <div>@</div>
        ${spreadTxt ? `<div class="ma-line">${spreadTxt}</div>` : ''}
        ${g.total != null ? `<div class="ma-line">O/U ${g.total}</div>` : ''}
      </div>
      ${teamHead(g.home, 'HEIM')}
    </div>
    ${smallSample ? `<div class="info-banner" style="margin-top:12px">⚠️ Kleine Stichprobe: Nach wenigen Spielen schwanken Ränge stark. Das ist beobachtete Leistung, keine verletzungsbereinigte Prognose.</div>` : ''}

    <div class="ma-grid">
      ${_maUnitBlock(D, g.away, g.home)}
      ${_maUnitBlock(D, g.home, g.away)}
    </div>
    <div class="ma-grid">
      ${_maFpaBlock(D, g.home, g.away)}
      ${_maFpaBlock(D, g.away, g.home)}
    </div>
    <div class="page-sub" style="margin-top:14px">Balken zeigen, wessen Rang besser ist und wie deutlich: Je weiter der Knopf zur Seite wandert, desto größer der Vorteil. Details unter <b>Liga → Regeln → Matchup Advantage</b>.</div>
  `;
}

// Erklaertext fuer die Regeln-/Erklaerung-Seite (wandert mit dem Modul mit)
function maExplainHtml() {
  const D = _maData();
  const li = (t, d) => `<li style="margin-bottom:6px"><b>${t}</b>: ${d}</li>`;
  return `
    <p style="margin:0 0 10px;font-size:13px">Unter <b>NFL → Matchup Advantage</b> steht für jedes NFL-Spiel der Woche die Offense des einen Teams gegen die Defense des anderen, in beide Richtungen. Grundlage sind alle bisher gespielten Spiele der Saison${D ? ` (aktuell ${D.season} bis Woche ${D.throughWeek})` : ''}, Quelle ist nflverse. Die Daten aktualisieren sich automatisch zweimal täglich und am Dienstag nach Monday Night.</p>
    <div class="section-label">Die 5 Kategorien</div>
    <ul style="margin:0 0 12px 18px;padding:0;font-size:13px;line-height:1.5">
      ${li('Passing EPA', 'Expected Points Added pro Pass-Spielzug (inkl. Sacks und Scrambles). Misst, wie viele Punkte ein Spielzug im Schnitt zur erwarteten Punkteausbeute beiträgt. Offense: hoch = gut. Defense: niedriger zugelassener Wert = gut.')}
      ${li('Rushing EPA', 'Dasselbe für Läufe (ohne QB-Scrambles). Werte unter 0 sind bei Läufen normal.')}
      ${li('Sack Rate', 'Sacks pro Dropback. Offense: zugelassen, niedrig = gut. Defense: erzeugt, hoch = gut.')}
      ${li('Explosive %', 'Anteil der Spielzüge mit 20+ Yards (Pass) bzw. 10+ Yards (Lauf).')}
      ${li('Red-Zone-TD %', 'Anteil der Drives, die die Red Zone (gegnerische 20) erreichen und mit einem Touchdown enden. Kleine Stichprobe, schwankt früh in der Saison stark.')}
    </ul>
    <div class="section-label">So liest du die Balken</div>
    <p style="margin:0 0 10px;font-size:13px">Jede Kategorie hat einen Liga-Rang von 1 bis 32, wobei <b>1 immer die beste Unit</b> ist. Der Balken vergleicht den Offense-Rang mit dem Defense-Rang des Gegners: Je weiter der Knopf zur Seite eines Teams wandert, desto größer dessen Vorteil (Rang 1 gegen Rang 32 = ganz außen). Grüne Ränge sind Top 8, rote Ränge 25–32. Unter jedem Block steht, wer in mehr Kategorien klar vorne liegt (Rangabstand über ca. 3 Plätze).</p>
    <div class="section-label">Fantasy Points Allowed &amp; Spieler-Badges</div>
    <p style="margin:0 0 10px;font-size:13px">Die Kacheln darunter zeigen, wie viele PPR-Fantasy-Punkte eine Defense pro Spiel an QB, RB, WR und TE zulässt. Hier ist <b>Rang 1 = lässt die meisten Punkte zu</b>, also das leichteste Matchup für gegnerische Spieler. Dieser Rang erscheint als Badge neben jedem QB/RB/WR/TE im <b>Matchup-Detail</b> (Klick auf ein Fantasy-Matchup) und in den <b>Team-Kadern</b>: <span class="ma-boost ma-good">▲ vs XXX #3</span> gutes Matchup (Top 8), <span class="ma-boost">• @ XXX #15</span> neutral, <span class="ma-boost ma-bad">▼ @ XXX #30</span> hartes Matchup (Rang 25–32). Tooltip mit Details beim Drüberfahren.</p>
    <p style="margin:0;font-size:12px;color:var(--muted)">Wichtig: Das ist beobachtete Leistung, keine Prognose. Verletzungen, Wetter und Spielplanstärke sind nicht eingerechnet, und in den ersten Wochen ist die Stichprobe klein.</p>`;
}
