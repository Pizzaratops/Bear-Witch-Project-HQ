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
const MA_NOISY = ['rzTd']; // Stabilitaet r ~ 0 (2025, ungerade vs gerade Wochen)

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
// Backtest 2021-2025 (docs/BACKTEST-MATCHUP-BADGES.md): kleiner, aber echter
// Effekt bei QB/RB/TE; bei WR praktisch keiner -> WR-Badges ohne Farbe.
const MA_BADGE_NEUTRAL_POS = ['WR'];
const MA_FPA_METHOD_TXT = { Saison: 'laufende Saison', Mix: 'Mix aus 1 Spiel + Vorjahr', Vorjahr: 'Vorjahreswerte (noch kein Spiel)' };
function _maBadgeClass(pos, rank) {
  if (rank == null || MA_BADGE_NEUTRAL_POS.includes(pos)) return { cls: 'ma-mid', arrow: '•' };
  return rank <= 8 ? { cls: 'ma-good', arrow: '▲' } : rank >= 25 ? { cls: 'ma-bad', arrow: '▼' } : { cls: 'ma-mid', arrow: '•' };
}
function maPlayerBadge(pos, nflTeam, week) {
  const D = _maData(); if (!D) return '';
  if (!D.fpaPositions.includes(pos)) return '';
  const o = maOpponent(nflTeam, week);
  if (!o) return `<span class="ma-boost ma-bye" title="Bye Week">BYE</span>`;
  const t = D.teams[o.opp];
  const rank = t && t.fpaRank ? t.fpaRank[pos] : null;
  if (rank == null) return '';
  const { cls, arrow } = _maBadgeClass(pos, rank);
  const basis = MA_FPA_METHOD_TXT[t.fpaMethod] || 'laufende Saison';
  const note = MA_BADGE_NEUTRAL_POS.includes(pos)
    ? 'Bei WR ohne Farbe: laut Backtest 2021-25 sagt dieser Rang für WR fast nichts voraus.'
    : 'Kleiner Effekt: grün punktet im Schnitt ~1-2 Pkt. mehr als rot (Backtest 2021-25); Rot ist verlässlicher als Grün.';
  const tip = `${o.home ? 'vs' : '@'} ${o.opp}: lässt ${t.fpa[pos]} PPR-Punkte/Spiel an ${pos} zu (Rang ${rank}/32, 1 = meiste; Basis: ${basis}). ${note}`;
  return `<span class="ma-boost ${cls}" title="${tip}">${arrow} ${o.home ? 'vs' : '@'} ${o.opp} #${rank}</span>`;
}

function showNflMatchup() { navigate('nflmatchup'); renderNflMatchup(); }
function maSetWeek(w) { maState.week = Number(w); maState.game = null; renderNflMatchup(); }
function maSetGame(i) { maState.game = Number(i); renderNflMatchup(); }

// Ein Vergleichsblock: Offense-Team gegen Defense-Team
// Vorteile eines Blocks (Offense offA gegen Defense defA), wie im Fazit gezaehlt
function _maEdges(D, offA, defA) {
  const off = D.teams[offA], def = D.teams[defA];
  let oe = 0, de = 0;
  D.metrics.forEach(m => {
    if (MA_NOISY.includes(m.key)) return;
    const oR = off.offRank[m.key], dR = def.defRank[m.key];
    if (oR == null || dR == null) return;
    const adv = (dR - oR) / 31;
    if (adv > 0.1) oe++; else if (adv < -0.1) de++;
  });
  return { oe, de };
}
function _maPhase(week) { return week <= 1 ? 'W1' : week <= 4 ? 'W2-4' : week <= 8 ? 'W5-8' : 'W9+'; }
const MA_PHASE_TXT = { W1: 'Woche 1', 'W2-4': 'Woche 2–4', 'W5-8': 'Woche 5–8', 'W9+': 'ab Woche 9' };

// Gesamt-Fazit ueber beide Richtungen: Netto = (Heim-Off-Vorteile - Gast-Def-Vorteile)
// - (Gast-Off-Vorteile - Heim-Def-Vorteile). Staerke + historische Trefferquote.
function _maOverallHtml(D, g, week) {
  const h = _maEdges(D, g.home, g.away), a = _maEdges(D, g.away, g.home);
  const net = (h.oe - h.de) - (a.oe - a.de);
  const fav = net > 0 ? g.home : net < 0 ? g.away : null;
  const strength = Math.abs(net) >= 3 ? 'klar' : Math.abs(net) >= 1 ? 'leicht' : null;
  const ph = _maPhase(week);
  const cal = D.verdictCalibration && D.verdictCalibration[ph];
  const c = cal && strength ? cal[strength] : null;
  const fmtP = v => String(v.toFixed(1)).replace('.', ',') + ' %';
  const played = g.homeScore != null;
  let head, body;
  if (!fav) {
    head = '<span class="ma-ov-tag">Kein Vorteil</span> Beide Seiten gleich viele Vorteile';
    body = 'Das Tool gibt hier keine Tendenz ab (bei ca. 10 % der Spiele).';
  } else {
    head = `<span class="ma-ov-tag ${strength === 'klar' ? 'ma-ov-strong' : ''}" style="--tc:${_maColor(fav)}">${strength === 'klar' ? 'Klarer' : 'Leichter'} Vorteil</span> <b style="color:${_maColor(fav)}">${fav}</b> <span class="ma-ov-net">Netto +${Math.abs(net)} ${Math.abs(net) === 1 ? 'Kategorie' : 'Kategorien'}</span>`;
    body = c ? `Historisch lag das Tool mit einem <b>${strength === 'klar' ? 'klaren' : 'leichten'}</b> Vorteil in ${MA_PHASE_TXT[ph]} in <b>${fmtP(c.hit)}</b> der Spiele richtig (${c.n} Spiele 2021–2025)${cal.vegas ? `, der Vegas-Favorit in ${fmtP(cal.vegas)}` : ''}.${strength === 'leicht' && c.hit < 58 ? ' Das ist kaum besser als ein Münzwurf.' : ''}` : '';
  }
  // Abgleich mit Vegas (spread > 0 = Heimteam favorisiert)
  let vegasHtml = '';
  const VV = D.verdictVsVegas;
  if (fav && VV && g.spread != null && g.spread !== 0) {
    const vFav = g.spread > 0 ? g.home : g.away;
    const line = `${vFav} −${Math.abs(g.spread)}`;
    vegasHtml = vFav === fav
      ? `<div class="ma-ov-vegas ma-ov-agree">✅ Vegas sieht es genauso (${line}). Wenn Tool und Vegas einig sind, stimmte der Tipp historisch in ${fmtP(strength === 'klar' ? VV.agree.klarHit : VV.agree.hit)} der Fälle (${strength === 'klar' ? VV.agree.klarN : VV.agree.n} Spiele).</div>`
      : `<div class="ma-ov-vegas ma-ov-disagree">⚠️ Vegas sieht <b>${vFav}</b> vorne (${line}). Wenn Tool und Vegas uneins sind, lag historisch <b>Vegas in ${fmtP(VV.disagree.vegasHit)}</b> richtig, das Tool nur in ${fmtP(strength === 'klar' ? VV.disagree.klarToolHit : VV.disagree.toolHit)} (${strength === 'klar' ? VV.disagree.klarN : VV.disagree.n} Spiele). Im Zweifel also Vegas glauben.</div>`;
  }
  const res = played ? `<div class="ma-ov-res">Ergebnis: ${g.away} ${g.awayScore} : ${g.homeScore} ${g.home}. Achtung: Die Werte enthalten dieses Spiel bereits, also kein fairer Rückblick.</div>` : '';
  return `
    <div class="ma-overall">
      <div class="ma-ov-head">🧭 Gesamt-Fazit: ${head} <a class="dna-info" onclick="maOpenHelp('verdict')" title="Erklärung">ⓘ</a></div>
      <div class="ma-ov-body">${body} Nicht zum Wetten geeignet: gegen den Spread trifft das Tool nicht besser als der Zufall.</div>
      ${vegasHtml}
      ${res}
    </div>`;
}

function _maMixTip(D, t, side, m) {
  const sv = t[side + 'Season'] ? t[side + 'Season'][m.key] : null, pv = t[side + 'Prior'] ? t[side + 'Prior'][m.key] : null;
  const k = D.unitPriorK || 4;
  return `Angezeigt: Mix aus Saison und Vorjahr (Vorjahr zählt wie ${k} Spiele). Saison ${D.season}: ${_maFmt(sv, m.fmt)} (${t.games} Sp.) · Vorjahr ${D.priorSeason || D.season - 1}: ${_maFmt(pv, m.fmt)}`;
}
function _maUnitBlock(D, offA, defA) {
  const off = D.teams[offA], def = D.teams[defA];
  let offEdges = 0, defEdges = 0;
  const rows = D.metrics.map(m => {
    const oR = off.offRank[m.key], dR = def.defRank[m.key];
    // Vorteil: Rangdifferenz auf -1..+1 skaliert (+ = Offense im Vorteil)
    const adv = oR != null && dR != null ? (dR - oR) / 31 : 0;
    // Red-Zone-TD % ist laut Stabilitaetsmessung praktisch Zufall -> zaehlt nicht ins Fazit
    if (!MA_NOISY.includes(m.key)) { if (adv > 0.1) offEdges++; else if (adv < -0.1) defEdges++; }
    const pct = Math.min(50, Math.abs(adv) * 50);
    const winner = adv >= 0 ? offA : defA;
    const fill = `<div class="ma-fill" style="${adv >= 0 ? 'right:50%' : 'left:50%'};width:${pct}%;background:${_maColor(winner)}"></div>`;
    const knob = `<div class="ma-knob" style="left:${50 - adv * 50}%;border-color:${_maColor(winner)};color:${_maColor(winner)}">${winner}</div>`;
    const takenCreated = m.key === 'sackRate' ? '<div class="ma-sub">zugelassen / erzeugt</div>' : MA_NOISY.includes(m.key) ? '<div class="ma-sub">sehr zufällig, zählt nicht ins Fazit</div>' : '';
    return `
      <div class="ma-row${MA_NOISY.includes(m.key) ? ' ma-row-noisy' : ''}">
        <div class="ma-label">${m.label} <a class="dna-info" onclick="maOpenHelp('${m.key}')" title="Erklärung">ⓘ</a>${takenCreated}</div>
        <div class="ma-val ma-val-l" title="${_maMixTip(D, off, 'off', m)}">${_maFmt(off.off[m.key], m.fmt)} ${_maRankChip(oR)}</div>
        <div class="ma-track"><div class="ma-center"></div>${fill}${knob}</div>
        <div class="ma-val ma-val-r" title="${_maMixTip(D, def, 'def', m)}">${_maRankChip(dR)} ${_maFmt(def.def[m.key], m.fmt)}</div>
      </div>`;
  }).join('');
  const verdict = offEdges > defEdges
    ? `<b style="color:${_maColor(offA)}">${offA}-Offense</b> im Vorteil (${offEdges} von ${D.metrics.filter(m => !MA_NOISY.includes(m.key)).length} Kategorien)`
    : defEdges > offEdges
      ? `<b style="color:${_maColor(defA)}">${defA}-Defense</b> im Vorteil (${defEdges} von ${D.metrics.filter(m => !MA_NOISY.includes(m.key)).length} Kategorien)`
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
      <div class="ma-fpa-title"><span style="color:${_maColor(defA)}">${defA}-Defense</span> lässt zu · gut für ${offA}-Spieler: <a class="dna-info" onclick="maOpenHelp('fpa')" title="Erklärung">ⓘ</a><span class="ma-fpa-basis">PPR/Spiel · Basis: ${MA_FPA_METHOD_TXT[t.fpaMethod] || 'laufende Saison'}</span></div>
      <div class="ma-fpa-grid">
        ${D.fpaPositions.map(pos => {
          const r = t.fpaRank[pos];
          const cls = _maBadgeClass(pos, r).cls;
          return `<div class="ma-fpa-cell ${cls}"${MA_BADGE_NEUTRAL_POS.includes(pos) ? ' title="Bei WR ohne Farbe: laut Backtest kaum aussagekräftig"' : ''}><div class="ma-fpa-pos">${pos}</div><div class="ma-fpa-n">${t.fpa[pos] != null ? t.fpa[pos].toFixed(1) : '—'}</div><div class="ma-fpa-r">#${r ?? '–'}</div></div>`;
        }).join('')}
      </div>
    </div>`;
}

// ---------- Scheme-Tendenzen (FTN-Charting) ----------
// Je Tendenz: wie oft macht es die Seite, die es entscheidet (Defense: Blitz,
// Stacked Box; Offense: Play Action, Screen, Motion), und wie gut ist die
// Gegenseite genau in dieser Situation (EPA/Play) gegenueber sonst.
const MA_SCHEME_TXT = {
  blitz: { freq: 'blitzt', splitX: 'vs Blitz', splitNo: 'ohne' },
  box8: { freq: 'stellt 8+ in die Box', splitX: 'Läufe vs 8+', splitNo: 'sonst' },
  pa: { freq: 'nutzt Play Action', splitX: 'lässt zu mit PA', splitNo: 'ohne' },
  screen: { freq: 'wirft Screens', splitX: 'lässt zu bei Screens', splitNo: 'sonst' },
  motion: { freq: 'nutzt Motion', splitX: 'lässt zu mit Motion', splitNo: 'ohne' },
};
const MA_SCHEME_MIN_N = 10;

function _maSchemeRow(D, k, offA, defA) {
  const d = D.scheme[k], txt = MA_SCHEME_TXT[k];
  if (!d || !txt) return '';
  const decider = d.who === 'def' ? defA : offA;
  const other = d.who === 'def' ? offA : defA;
  const otherSide = d.who === 'def' ? 'off' : 'def';
  const f = (D.teams[decider].scheme || {})[d.who] && D.teams[decider].scheme[d.who][k];
  const sp = (D.teams[other].scheme || {})[otherSide] && D.teams[other].scheme[otherSide][k];
  if (!f || !sp) return '';
  const often = f.rate > d.rate * 1.1, rare = f.rate < d.rate * 0.9;
  const enough = sp.n >= MA_SCHEME_MIN_N && sp.epaX != null && sp.epaNo != null;
  const delta = enough ? sp.epaX - sp.epaNo : 0;
  // + delta: Offense (bzw. die gegnerische Offense bei Def-Splits) ist in der Situation besser
  let verdict = '<span class="ma-sv ma-sv-n">–</span>';
  if (!enough) verdict = '<span class="ma-sv ma-sv-n" title="Unter ' + MA_SCHEME_MIN_N + ' Plays in der Situation">wenig Daten</span>';
  else if (often && delta > 0.05) verdict = `<span class="ma-sv" style="color:${_maColor(offA)};border-color:${_maColor(offA)}">▲ ${offA}</span>`;
  else if (often && delta < -0.05) verdict = `<span class="ma-sv" style="color:${_maColor(defA)};border-color:${_maColor(defA)}">▼ ${defA}</span>`;
  else if (rare) verdict = '<span class="ma-sv ma-sv-n" title="Kommt bei diesem Team selten vor">selten</span>';
  const fmtE = v => (v == null ? '—' : (v >= 0 ? '+' : '') + v.toFixed(2));
  const sideName = s => (s === 'off' ? 'Offense' : 'Defense');
  return `
    <div class="ma-srow">
      <div class="ma-slabel">${d.label} <a class="dna-info" onclick="maOpenHelp('${k}')" title="Erklärung">ⓘ</a></div>
      <div class="ma-sfreq"><b style="color:${_maColor(decider)}">${decider}</b> ${txt.freq} <b>${(f.rate * 100).toFixed(1)}%</b> <span class="ma-rank ${f.rank && f.rank <= 8 ? 'ma-hi' : ''}">#${f.rank ?? '–'}</span><small>Liga ${(d.rate * 100).toFixed(1)}%</small></div>
      <div class="ma-ssplit"><b style="color:${_maColor(other)}">${other}</b> ${sideName(otherSide)} ${txt.splitX} <b>${fmtE(sp.epaX)}</b> <small>(${sp.n})</small> · ${txt.splitNo} <b>${fmtE(sp.epaNo)}</b></div>
      <div class="ma-sverdict">${verdict}</div>
    </div>`;
}

function _maSchemeBlock(D, offA, defA) {
  if (!D.scheme || !D.teams[offA].scheme || !D.teams[defA].scheme) return '';
  const rows = Object.keys(D.scheme).map(k => _maSchemeRow(D, k, offA, defA)).join('');
  if (!rows) return '';
  return `
    <div class="ma-block">
      <div class="ma-block-head">
        <span style="color:${_maColor(offA)}">${offA} OFFENSE</span>
        <span class="ma-vs">vs</span>
        <span style="color:${_maColor(defA)}">${defA} DEFENSE</span>
      </div>
      ${rows}
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
      <button class="dna-help-btn" onclick="maOpenHelp()">📖 Stats erklärt</button>
      <span class="ma-note">${D.statSeason && D.statSeason !== D.season ? `Noch keine Spiele ${D.season}: Unit-Stats aus der Saison ${D.statSeason}` : `Stats Saison ${D.season} bis Woche ${D.throughWeek}`} · Mix mit Vorjahr (zählt wie ${D.unitPriorK || 4} Spiele) · Ränge 1–32, 1 = beste Unit</span>
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
    ${D.statSeason && D.statSeason !== D.season ? `<div class="info-banner" style="margin-top:12px">📅 Die Saison ${D.season} hat noch nicht begonnen. Alle Werte stammen aus ${D.statSeason}; Kader- und Trainerwechsel sind darin nicht berücksichtigt.</div>` : ''}
    ${smallSample ? `<div class="info-banner" style="margin-top:12px">⚠️ Kleine Stichprobe: Nach wenigen Spielen schwanken Ränge stark. Das ist beobachtete Leistung, keine verletzungsbereinigte Prognose.</div>` : ''}

    ${_maOverallHtml(D, g, week)}
    <div class="ma-grid">
      ${_maUnitBlock(D, g.away, g.home)}
      ${_maUnitBlock(D, g.home, g.away)}
    </div>
    <div class="ma-grid">
      ${_maFpaBlock(D, g.home, g.away)}
      ${_maFpaBlock(D, g.away, g.home)}
    </div>
    ${D.scheme && D.teams[g.away].scheme ? `
    <div class="ma-section-title">🧠 Scheme-Tendenzen <span>FTN-Charting · EPA/Play in der Situation gegen sonst · ab ${MA_SCHEME_MIN_N} Plays</span></div>
    <div class="ma-grid" style="margin-top:8px">
      ${_maSchemeBlock(D, g.away, g.home)}
      ${_maSchemeBlock(D, g.home, g.away)}
    </div>` : ''}
    <div class="page-sub" style="margin-top:14px">Balken zeigen, wessen Rang besser ist und wie deutlich: Je weiter der Knopf zur Seite wandert, desto größer der Vorteil. Details unter <b>📢 Erklärung</b>.</div>
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
    <p style="margin:0 0 10px;font-size:13px">Jede Kategorie hat einen Liga-Rang von 1 bis 32, wobei <b>1 immer die beste Unit</b> ist. Der Balken vergleicht den Offense-Rang mit dem Defense-Rang des Gegners: Je weiter der Knopf zur Seite eines Teams wandert, desto größer dessen Vorteil (Rang 1 gegen Rang 32 = ganz außen). Grüne Ränge sind Top 8, rote Ränge 25–32. Unter jedem Block steht, wer in mehr Kategorien klar vorne liegt (Rangabstand über ca. 3 Plätze). <b>Red-Zone-TD %</b> zählt dabei nicht mit, weil der Wert laut Messung fast reiner Zufall ist. Alle Stats mit Beispielen und gemessener Stabilität erklärt der Button <b>📖 Stats erklärt</b> bzw. das ⓘ an jeder Zeile.</p>
    <div class="section-label">🧭 Gesamt-Fazit &amp; Mix mit Vorjahr</div>
    <p style="margin:0 0 10px;font-size:13px">Über den Blöcken steht das <b>Gesamt-Fazit</b> für beide Richtungen zusammen, mit Stärke: <b>klarer Vorteil</b> ab 3 Kategorien Netto, sonst <b>leichter Vorteil</b>. Dazu steht, wie oft das Tool in dieser Saisonphase historisch richtig lag. Test über 1.279 Spiele 2021–2025: klar 65–69 %, leicht 52–61 %, Vegas-Favorit 67 %. Sind sich Tool und Vegas einig, trifft der Tipp in 69 %. Widerspricht Vegas, lag Vegas in 64 % richtig, und die Seite zeigt dann einen Warnhinweis. Gegen den Spread gibt es keinen Vorteil. Alle Unit-Werte sind ein <b>Mix aus Saison und Vorjahr</b>: Das Vorjahr zählt wie 4 Spiele und verliert dann an Gewicht. Das hat die Trefferquote am Saisonanfang von 52 % auf 63 % gehoben. Saison- und Vorjahreswert stehen im Tooltip.</p>
    <div class="section-label">Fantasy Points Allowed &amp; Spieler-Badges</div>
    <p style="margin:0 0 8px;font-size:13px">Die Kacheln darunter zeigen, wie viele PPR-Fantasy-Punkte eine Defense pro Spiel an QB, RB, WR und TE zulässt. Hier ist <b>Rang 1 = lässt die meisten Punkte zu</b>, also das leichteste Matchup für gegnerische Spieler. Dieser Rang erscheint als Badge neben jedem QB/RB/WR/TE im <b>Matchup-Detail</b> und in den <b>Team-Kadern</b>: <span class="ma-boost ma-good">▲ vs XXX #3</span> gutes Matchup (Top 8), <span class="ma-boost">• @ XXX #15</span> neutral, <span class="ma-boost ma-bad">▼ @ XXX #30</span> hartes Matchup (Rang 25–32).</p>
    <ul style="margin:0 0 10px 18px;padding:0;font-size:13px;line-height:1.5">
      <li style="margin-bottom:4px"><b>Wie gut funktioniert das?</b> Getestet über 5 Jahre (2021–2025, über 15.000 Spieler-Spiele, jeweils nur mit Daten vor dem Spiel): Grün markierte Spieler holen im Schnitt ~1–2 Punkte mehr als rot markierte. Das ist ein kleiner, echter Effekt, also ein <b>Tiebreaker</b> und keine Start/Sit-Entscheidung. <b>Rot ist verlässlicher als Grün</b>: 63 % der rot markierten bleiben unter ihrem Schnitt.</li>
      <li style="margin-bottom:4px"><b>WR-Badges haben keine Farbe</b>, weil der Rang bei Wide Receivern laut Test praktisch nichts vorhersagt. Rang und Tooltip stehen trotzdem da.</li>
      <li style="margin-bottom:4px"><b>Stufenplan am Saisonanfang:</b> In <b>Woche 1</b> gelten die Vorjahreswerte der Defense, in <b>Woche 2</b> ein Mix (das Vorjahr zählt wie 12 Spiele), <b>ab Woche 3</b> nur die laufende Saison. Nach nur einem Spiel sagt die Saison allein nichts aus. Welche Basis gerade gilt, steht an den Kacheln und im Tooltip.</li>
    </ul>
    <div class="section-label">🧠 Scheme-Tendenzen</div>
    <p style="margin:0 0 8px;font-size:13px">Darunter steht, <b>wie</b> die Teams spielen (Quelle: FTN-Charting, jeder Spielzug von Hand erfasst). Pro Zeile: wie oft die Seite, die es entscheidet, etwas tut (mit Rang, 1 = am häufigsten, und Liga-Schnitt), und wie gut die Gegenseite genau in dieser Situation ist (EPA/Play) im Vergleich zu sonst, mit Anzahl Plays in Klammern.</p>
    <ul style="margin:0 0 10px 18px;padding:0;font-size:13px;line-height:1.5">
      <li style="margin-bottom:4px"><b>Blitz</b>: Anteil der Dropbacks, bei denen mindestens ein zusätzlicher Blitzer kommt. Daneben die EPA der Offense gegen Blitz bzw. ohne.</li>
      <li style="margin-bottom:4px"><b>Stacked Box (8+)</b>: Anteil der Läufe gegen 8 oder mehr Verteidiger in der Box. Daneben die Lauf-EPA der Offense dagegen.</li>
      <li style="margin-bottom:4px"><b>Play Action / Screen / Motion</b>: wie oft die Offense das einsetzt. Daneben, was die Defense in genau diesen Spielzügen zulässt.</li>
    </ul>
    <p style="margin:0 0 10px;font-size:13px">Rechts die Einschätzung: <b>▲ Team</b> bzw. <b>▼ Team</b> erscheint nur, wenn die entscheidende Seite es <b>überdurchschnittlich oft</b> tut (über 110 % des Liga-Schnitts) <b>und</b> die Gegenseite in der Situation um mehr als 0,05 EPA/Play besser bzw. schlechter ist als sonst. Beispiel: „CHI blitzt 38,8 % (Liga 31,4 %), PHI-Offense vs Blitz +0,12 gegen +0,20 ohne → ▼ CHI“. „selten“ = das Team macht es unterdurchschnittlich oft, „wenig Daten“ = unter 10 Plays in der Situation.</p>
    <p style="margin:0;font-size:12px;color:var(--muted)">Wichtig: Das ist beobachtete Leistung, keine Prognose. Verletzungen, Wetter und Spielplanstärke sind nicht eingerechnet, und in den ersten Wochen ist die Stichprobe klein.</p>`;
}

// ============================================================
//  LEGENDE "Stats erklärt" (Fenster wie bei Player DNA)
// ============================================================
//  Nutzt die Modal-/Karten-Klassen aus Player DNA (.dna-modal, .dna-help-*).
//  stab = gemessene Stabilitaet: Teamwert ungerade vs gerade Wochen 2025
//  (Pearson r); bei FPA zusaetzlich Jahr-zu-Jahr 2024 -> 2025.
//  Beispiele werden live aus den aktuellen Daten erzeugt.
const MA_GLOSSARY = {
  passEpa: { off: 0.61, def: 0.27,
    what: 'Expected Points Added pro Pass-Spielzug. Jede Situation (Down, Distanz, Feldposition) hat einen Erwartungswert an Punkten. EPA misst, wie viel ein Spielzug daran geändert hat. Ein 15-Yard-Pass bei 3rd & 10 ist viel wert, ein 3-Yard-Pass bei 3rd & 10 kostet Punkte.',
    why: 'Der beste einzelne Wert für die Qualität eines Passspiels, weil er Situation, Turnover und Sacks mit einrechnet. Offense-Passing-EPA ist der stabilste Stat hier.' },
  rushEpa: { off: 0.26, def: 0.18,
    what: 'Dasselbe für Läufe (ohne QB-Scrambles). Werte unter 0 sind bei Läufen normal, weil Laufen im Schnitt weniger effizient ist als Werfen.',
    why: 'Zeigt, ob ein Laufspiel wirklich Punkte bringt oder nur Zeit verbraucht. Schwankt deutlich stärker als das Passspiel.' },
  sackRate: { off: 0.41, def: 0.51,
    what: 'Sacks pro Dropback. Bei der Offense ist das die zugelassene Quote (niedrig = gut), bei der Defense die erzeugte (hoch = gut).',
    why: 'Sacks killen Drives. Die Pass-Rush-Stärke einer Defense ist einer der verlässlicheren Defense-Werte.' },
  explosive: { off: 0.44, def: 0.45,
    what: 'Anteil der Spielzüge mit 20+ Yards (Pass) bzw. 10+ Yards (Lauf).',
    why: 'Big Plays entscheiden Spiele und bringen im Fantasy die großen Punkte. Mittelstabil auf beiden Seiten.' },
  rzTd: { off: -0.01, def: 0.16, noisy: true,
    what: 'Anteil der Drives, die die gegnerische 20-Yard-Linie erreichen und mit einem Touchdown enden.',
    why: 'Wird oft zitiert, ist aber laut Messung <b>fast reiner Zufall</b> (Offense r ≈ 0). Deshalb zählt er nicht mehr ins Fazit „wer hat mehr Vorteile“ und steht nur noch zur Info da.' },
};
const MA_GLOSSARY_FPA = {
  stab: { QB: [0.30, 0.25], RB: [0.07, 0.20], WR: [0.23, -0.08], TE: [0.28, 0.24] },
  what: 'Fantasy Points Allowed: wie viele PPR-Punkte die Spieler einer Position im Schnitt pro Spiel gegen diese Defense gemacht haben. Rang 1 = lässt die meisten zu = leichtestes Matchup.',
  why: 'Grundlage der Spieler-Badges. Ein 5-Jahres-Backtest (2021–2025, über 15.000 Spieler-Spiele) zeigt: kleiner, aber echter Effekt. Grün markierte Spieler punkten im Schnitt ~1–2 Punkte mehr als rot markierte, und Rot ist verlässlicher als Grün (63 % bleiben unter ihrem Schnitt). Bei WR gibt es praktisch keinen Effekt, deshalb haben WR-Badges keine Farbe.',
  staged: 'Nach nur einem Spiel ist die Saison-FPA wertlos (Backtest Woche 2: kein Unterschied). Deshalb gilt ein Stufenplan: <b>Woche 1</b> Vorjahreswerte, <b>Woche 2</b> Mix (das Vorjahr zählt wie 12 Spiele), <b>ab Woche 3</b> laufende Saison.',
};
const MA_GLOSSARY_SCHEME = {
  blitz: { stab: 0.69, what: 'Anteil der Dropbacks, bei denen die Defense mindestens einen zusätzlichen Blitzer schickt (FTN-Charting).', why: 'Sehr stabile Teamgewohnheit. Spannend im Zusammenspiel: Wie gut ist die gegnerische Offense genau gegen Blitz?' },
  box8: { stab: 0.36, what: 'Anteil der Läufe, bei denen 8 oder mehr Verteidiger in der Box stehen.', why: 'Zeigt, wie sehr eine Defense den Lauf stoppen will. Die Stichproben sind klein, deshalb oft „wenig Daten“.' },
  pa: { stab: 0.60, what: 'Anteil der Dropbacks mit Play Action (Lauf-Fake vor dem Pass).', why: 'Stabile Offense-Gewohnheit. Daneben steht, wie viel die Defense gegen Play Action zulässt.' },
  screen: { stab: 0.49, what: 'Anteil der Pässe, die Screens sind (kurzer Pass hinter die Line mit Blockern davor).', why: 'Typisches Mittel gegen aggressive Pass-Rusher.' },
  motion: { stab: 0.77, what: 'Anteil der Spielzüge, bei denen sich vor dem Snap ein Offense-Spieler bewegt.', why: 'Der stabilste Stil-Wert überhaupt. Zeigt, wie „modern“ eine Offense spielt.' },
};

function _maExamples(D, key) {
  if (!D) return '';
  const list = Object.values(D.teams).filter(t => t.off && t.off[key] != null);
  if (!list.length) return '';
  const m = D.metrics.find(x => x.key === key);
  const best = list.slice().sort((a, b) => a.offRank[key] - b.offRank[key])[0];
  const bestD = list.slice().sort((a, b) => a.defRank[key] - b.defRank[key])[0];
  return `Aktuell (${D.statSeason || D.season}${D.throughWeek ? ', bis Woche ' + D.throughWeek : ''}): beste Offense <b>${best.abbr}</b> (${_maFmt(best.off[key], m.fmt)}), beste Defense <b>${bestD.abbr}</b> (${_maFmt(bestD.def[key], m.fmt)}).`;
}
const _maStabTxt = r => `r = ${String(r.toFixed(2)).replace('.', ',')}`;
const _maStabWord = r => (r >= 0.6 ? 'stabil' : r >= 0.4 ? 'mittel' : r >= 0.2 ? 'wacklig' : 'fast Zufall');

function maOpenHelp(focusKey) {
  const D = _maData();
  let m = document.getElementById('maHelp');
  if (!m) {
    m = document.createElement('div');
    m.id = 'maHelp'; m.className = 'dna-modal';
    m.addEventListener('click', e => { if (e.target === m) maCloseHelp(); });
    document.body.appendChild(m);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') maCloseHelp(); });
  }
  const card = (id, title, sub, body) => `<div class="dna-help-card${id === focusKey ? ' focus' : ''}" id="maHelp-${id}">
      <div class="dna-help-card-head"><b>${title}</b><span>${sub}</span></div>${body}</div>`;
  const unitCards = Object.entries(MA_GLOSSARY).map(([k, g]) => {
    const lab = (D && D.metrics.find(x => x.key === k) || {}).label || k;
    return card(k, `${g.noisy ? '◇ ' : '● '}${lab}`, `Stabilität Offense ${_maStabTxt(g.off)} (${_maStabWord(g.off)}) · Defense ${_maStabTxt(g.def)} (${_maStabWord(g.def)})`,
      `<p><b>Was ist das?</b> ${g.what}</p><p><b>Warum ist es drin?</b> ${g.why}</p>${_maExamples(D, k) ? `<p class="dna-help-ex"><b>Beispiel:</b> ${_maExamples(D, k)}</p>` : ''}`);
  }).join('');
  const F = MA_GLOSSARY_FPA;
  const fpaCard = card('fpa', '● Fantasy Points Allowed (FPA)',
    'Stabilität halbe Saison / Jahr-zu-Jahr: ' + Object.entries(F.stab).map(([p, v]) => `${p} ${v[0].toFixed(2).replace('.', ',')} / ${v[1].toFixed(2).replace('.', ',')}`).join(' · '),
    `<p><b>Was ist das?</b> ${F.what}</p><p><b>Warum ist es drin?</b> ${F.why}</p><p><b>Stufenplan:</b> ${F.staged}</p>`);
  const schemeCards = Object.entries(MA_GLOSSARY_SCHEME).map(([k, g]) => {
    const lab = (D && D.scheme && D.scheme[k] || {}).label || k;
    const lg = D && D.scheme && D.scheme[k] ? ` Liga-Schnitt aktuell ${(D.scheme[k].rate * 100).toFixed(1)} %.` : '';
    return card(k, '◇ ' + lab, `Stabilität ${_maStabTxt(g.stab)} (${_maStabWord(g.stab)})`, `<p><b>Was ist das?</b> ${g.what}${lg}</p><p><b>Warum ist es drin?</b> ${g.why}</p>`);
  }).join('');
  m.innerHTML = `
    <div class="dna-modal-box" role="dialog" aria-label="Matchup Advantage erklärt">
      <div class="dna-modal-head">
        <div><div class="dna-name" style="font-size:22px">📖 Matchup Advantage – einfach erklärt</div>
          <div class="page-sub">Was die Zahlen bedeuten und wie viel man ihnen glauben kann.</div></div>
        <button class="dna-modal-x" onclick="maCloseHelp()" aria-label="Schließen">✕</button>
      </div>
      <div class="dna-help-basics">
        <details${focusKey ? '' : ' open'}><summary>⚔️ Wie lese ich die Balken?</summary><div>Jede Zeile vergleicht den <b>Liga-Rang der Offense</b> (links) mit dem <b>Liga-Rang der gegnerischen Defense</b> (rechts). Rang 1 ist immer die beste Unit, grün sind Top 8, rot die Ränge 25–32. Der Knopf wandert zur Seite des Teams mit dem besseren Rang, und zwar umso weiter, je größer der Abstand ist (Rang 1 gegen Rang 32 = ganz außen). Unter jedem Block steht, wer in mehr Kategorien klar vorne liegt (Rangabstand über ca. 3 Plätze).</div></details>
        <details><summary>📏 Was heißt „Stabilität r“?</summary><div>Wir haben für jede Kennzahl gemessen, wie ähnlich die Teamwerte in den ungeraden und geraden Wochen 2025 waren. <b>r nahe 1</b> heißt: Das ist eine echte Eigenschaft des Teams. <b>r nahe 0</b> heißt: Das schwankt zufällig und sagt wenig über das nächste Spiel. Faustregel: ab 0,6 stabil, 0,4–0,6 mittel, 0,2–0,4 wacklig, darunter fast Zufall. Offense-Werte sind meist stabiler als Defense-Werte, und Stil-Werte (Blitz, Motion) am stabilsten.</div></details>
        <details><summary>🎯 Kann man damit Spiele vorhersagen?</summary><div>Getestet an allen 1.279 Spielen 2021–2025, jeweils nur mit Daten vor dem Spiel: Das Gesamt-Fazit tippt den Sieger in <b>62 %</b> der Fälle richtig. Immer das Heimteam zu tippen bringt 54 %, der <b>Vegas-Favorit 67 %</b>. Ein <b>klarer Vorteil</b> (3+ Kategorien Netto) trifft 65–69 %, ab Woche 9 auf Vegas-Niveau. Ein <b>leichter Vorteil</b> ist dagegen kaum mehr als ein Münzwurf. <b>Gegen den Spread</b> trifft keine Variante besser als der Zufall, alles Wissen steckt schon in der Line. Zum Wetten ist das Tool also nicht geeignet. Beispiel <b>ATL @ GB, Woche 3 2026</b>: Das Tool sah GB klar vorne, Atlanta gewann 35:14.</div></details>
        <details><summary>🔀 Warum „Mix mit Vorjahr“?</summary><div>Nach 1–3 Spielen sind Teamwerte fast Zufall. Deshalb mischt die Seite die Saisonwerte mit dem Vorjahr, das anfangs wie <b>4 Spiele</b> zählt und dann automatisch an Gewicht verliert (nach 12 Spielen noch 25 %). Im Test stieg die Trefferquote in Woche 2–4 dadurch von 52 % auf 63 %, und zwar in allen fünf Saisons. Später in der Saison ändert sich praktisch nichts. Die Einzelwerte (Saison und Vorjahr) stehen im Tooltip, wenn man mit der Maus über einen Wert fährt.</div></details>
      </div>
      <div class="dna-help-title">🧭 Gesamt-Fazit</div>
      <div class="dna-help-grid">${card('verdict', '● Gesamt-Fazit & Stärke', 'Backtest 2021–2025 · 1.279 Spiele', `<p><b>Was ist das?</b> Beide Richtungen zusammen: (Vorteile der Heim-Offense − Vorteile der Gast-Defense) − (Vorteile der Gast-Offense − Vorteile der Heim-Defense). Gezählt werden die 4 Kategorien ohne Red Zone. Ab 3 Kategorien Netto heißt es <b>klarer</b>, bei 1–2 <b>leichter</b> Vorteil.</p><p><b>Wie oft stimmt es?</b></p>${D && D.verdictCalibration ? `<table class="ma-cal"><tr><th></th><th>leicht</th><th>klar</th><th>Vegas-Fav.</th></tr>${Object.entries(D.verdictCalibration).map(([ph, c]) => `<tr><td>${MA_PHASE_TXT[ph]}</td><td>${c.leicht.hit.toFixed(1).replace('.', ',')} %</td><td><b>${c.klar.hit.toFixed(1).replace('.', ',')} %</b></td><td>${c.vegas ? c.vegas.toFixed(1).replace('.', ',') + ' %' : '–'}</td></tr>`).join('')}</table>` : ''}${D && D.verdictVsVegas ? `<p><b>Und im Vergleich zu Vegas?</b> Sind sich Tool und Vegas-Favorit einig, stimmt der Tipp in ${D.verdictVsVegas.agree.hit.toFixed(1).replace('.', ',')} % (bei klarem Vorteil ${D.verdictVsVegas.agree.klarHit.toFixed(1).replace('.', ',')} %). Sind sie uneins, liegt <b>Vegas in ${D.verdictVsVegas.disagree.vegasHit.toFixed(1).replace('.', ',')} %</b> richtig, selbst gegen einen klaren Vorteil des Tools.</p>` : ''}<p class="dna-help-ex"><b>Faustregel:</b> Nur ein klarer Vorteil ist ernst zu nehmen, und am meisten, wenn Vegas es genauso sieht. Widerspricht Vegas, eher Vegas glauben. Gegen den Spread bringt das Tool keinen Vorteil.</p>`)}</div>
      <div class="dna-help-title">⚔️ Unit gegen Unit <span>● = zählt ins Fazit · ◇ = nur zur Info</span></div>
      <div class="dna-help-grid">${unitCards}</div>
      <div class="dna-help-title">🏈 Fantasy <span>Grundlage der Spieler-Badges</span></div>
      <div class="dna-help-grid">${fpaCard}</div>
      <div class="dna-help-title">🧠 Scheme-Tendenzen <span>FTN-Charting · Stil, kein besser/schlechter</span></div>
      <div class="dna-help-grid">${schemeCards}</div>
      <div class="page-sub" style="margin-top:14px;font-size:11px">Stabilität = eigene Messung Saison 2025 (Teamwert ungerade vs gerade Wochen), bei FPA zusätzlich 2024 → 2025. Backtest der Badges: 2021–2025, nur mit Daten vor dem jeweiligen Spiel.</div>
    </div>`;
  m.classList.add('open');
  document.body.style.overflow = 'hidden';
  if (!focusKey) m.scrollTop = 0;
  if (focusKey) setTimeout(() => { const el = document.getElementById('maHelp-' + focusKey); if (el) el.scrollIntoView({ block: 'center' }); }, 30);
}
function maCloseHelp() {
  const m = document.getElementById('maHelp');
  if (m) m.classList.remove('open');
  document.body.style.overflow = '';
}
