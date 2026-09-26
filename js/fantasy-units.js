/* ============================================================
   FANTASY UNITS — Unit-Vergleich zweier Fantasy-Teams
   ============================================================
   Block im Fantasy-Matchup-Detail: je Position (QB/RB/WR/TE/K/DEF)
     - Saison-Schnitt der Starter-Punkte pro Woche + Liga-Rang (1 = bester)
     - diese Woche: Projektion (vor dem Spiel) bzw. echte Punkte (danach)
       als gespiegelter Vorteils-Balken
   Daten: data/position-points.js (POSITION_POINTS[season][week][teamId]
   = { qbPts, rbPts, wrPts, tePts, kPts, defPts }, nur final gewertete
   Wochen) -- Fallback: FANTASY_POWER_SCORE.weeks[w].weekly (nur QB-TE) --
   plus die Projektions-Starter, die das Matchup-Detail schon hat.

   Liefert:
     fuUnitCompareHtml(opts)   HTML-Block (leer, wenn keine Daten)
     fuExplainHtml()           Text fuer die Regeln-Seite
   ============================================================ */

const FU_UNITS = [
  { key: 'qbPts', label: 'QB', pos: ['QB'] },
  { key: 'rbPts', label: 'RB', pos: ['RB'] },
  { key: 'wrPts', label: 'WR', pos: ['WR'] },
  { key: 'tePts', label: 'TE', pos: ['TE'] },
  { key: 'kPts', label: 'K', pos: ['K'] },
  { key: 'defPts', label: 'DEF', pos: ['DEF', 'D/ST', 'DST'] },
];

// Datenquelle: POSITION_POINTS[season] (DPE/Sleeper, alle 6 Units) oder
// Fallback aus FANTASY_POWER_SCORE.weeks[w].weekly (z.B. Bear Witch/ESPN,
// nur QB/RB/WR/TE). Units ohne Daten fehlen dann im Objekt.
function _fuPP(season) {
  if (typeof POSITION_POINTS !== 'undefined' && POSITION_POINTS[season]) return POSITION_POINTS[season];
  const F = (typeof FANTASY_POWER_SCORE !== 'undefined') ? FANTASY_POWER_SCORE : null;
  if (!F || String(F.season) !== String(season) || !F.weeks) return null;
  const out = {};
  Object.entries(F.weeks).forEach(([w, wk]) => {
    (wk.weekly || []).forEach(r => {
      if (!r.values || r.values.qbPts == null) return;
      const v = {};
      FU_UNITS.forEach(u => { if (r.values[u.key] != null) v[u.key] = r.values[u.key]; });
      (out[w] = out[w] || {})[r.teamId] = v;
    });
  });
  return Object.keys(out).length ? out : null;
}

// Saison-Schnitt je Team und Unit ueber alle final gewerteten Wochen VOR `week`
function _fuSeasonForm(season, week) {
  const PP = _fuPP(season);
  if (!PP) return null;
  const weeks = Object.keys(PP).map(Number).filter(w => w < week);
  if (!weeks.length) return null;
  const sums = {}, cnt = {};
  weeks.forEach(w => Object.entries(PP[w]).forEach(([id, v]) => {
    sums[id] = sums[id] || {}; cnt[id] = (cnt[id] || 0) + 1;
    FU_UNITS.forEach(u => { if (v[u.key] != null) sums[id][u.key] = (sums[id][u.key] || 0) + v[u.key]; });
  }));
  const avg = {}, rank = {};
  Object.keys(sums).forEach(id => { avg[id] = {}; FU_UNITS.forEach(u => { if (sums[id][u.key] != null) avg[id][u.key] = sums[id][u.key] / cnt[id]; }); });
  FU_UNITS.forEach(u => {
    Object.keys(avg).filter(id => avg[id][u.key] != null).sort((a, b) => avg[b][u.key] - avg[a][u.key]).forEach((id, i) => { (rank[id] = rank[id] || {})[u.key] = i + 1; });
  });
  return { avg, rank, weeks: weeks.length, teams: Object.keys(avg).length };
}

function _fuWeekValues(season, week, teamId, starters, played) {
  const out = {};
  if (played) {
    const PP = _fuPP(season);
    const v = (PP && PP[week] && PP[week][teamId]) || null;
    if (!v) return null;
    FU_UNITS.forEach(u => { out[u.key] = v[u.key] != null ? v[u.key] : null; });
    return out;
  }
  FU_UNITS.forEach(u => { out[u.key] = 0; });
  (starters || []).forEach(s => {
    const u = FU_UNITS.find(x => x.pos.includes(s.pos));
    if (u && s.ms) out[u.key] += s.ms.mean;
  });
  return out;
}

function _fuChip(rank, n) {
  if (rank == null) return '';
  const top = Math.ceil(n / 4), low = n - top + 1;
  return `<span class="fu-rank${rank <= top ? ' fu-top' : rank >= low ? ' fu-low' : ''}">#${rank}</span>`;
}

function fuUnitCompareHtml(o) {
  const { season, week, homeId, awayId, homeName, awayName, homeStarters, awayStarters, played } = o;
  const form = _fuSeasonForm(season, week);
  const hw = _fuWeekValues(season, week, homeId, homeStarters, played);
  const aw = _fuWeekValues(season, week, awayId, awayStarters, played);
  if (!hw || !aw) return '';
  const wkLabel = played ? 'Ist' : 'Proj.';
  const edges = { home: [], away: [] };
  const rows = FU_UNITS.filter(u => hw[u.key] != null && aw[u.key] != null).map(u => {
    const h = hw[u.key], a = aw[u.key];
    const tot = Math.max(Math.abs(h) + Math.abs(a), 1);
    const adv = (h - a) / tot; // -1..+1, + = Heimteam vorne
    if (adv > 0.1) edges.home.push(u.label); else if (adv < -0.1) edges.away.push(u.label);
    const pct = Math.min(50, Math.abs(adv) * 50);
    const side = adv >= 0 ? 'home' : 'away';
    const hs = form && form.avg[homeId] && form.avg[homeId][u.key] != null ? form.avg[homeId][u.key] : null;
    const as = form && form.avg[awayId] && form.avg[awayId][u.key] != null ? form.avg[awayId][u.key] : null;
    return `
      <div class="fu-row">
        <div class="fu-season fu-l">${hs != null ? `${hs.toFixed(1)} ${_fuChip(form.rank[homeId][u.key], form.teams)}` : '—'}</div>
        <div class="fu-wk fu-l">${h.toFixed(1)}</div>
        <div class="fu-mid">
          <div class="fu-label">${u.label}</div>
          <div class="fu-track"><div class="fu-center"></div><div class="fu-fill fu-fill-${side}" style="${side === 'home' ? 'right' : 'left'}:50%;width:${pct}%"></div></div>
        </div>
        <div class="fu-wk fu-r">${a.toFixed(1)}</div>
        <div class="fu-season fu-r">${as != null ? `${_fuChip(form.rank[awayId][u.key], form.teams)} ${as.toFixed(1)}` : '—'}</div>
      </div>`;
  }).join('');
  const sum = (arr, name) => arr.length ? `<b>${name}</b> vorne bei ${arr.join(', ')}` : '';
  const verdict = [sum(edges.home, homeName), sum(edges.away, awayName)].filter(Boolean).join(' · ') || 'Überall ausgeglichen';
  return `
    <div class="fu-box">
      <div class="fu-title">📊 Unit-Vergleich</div>
      <div class="fu-teams"><span class="fu-team-home">◀ ${homeName}</span><span class="fu-team-away">${awayName} ▶</span></div>
      <div class="fu-row fu-head">
        <div class="fu-season fu-l">Ø<span class="fu-long"> Saison</span></div><div class="fu-wk fu-l">${wkLabel}</div>
        <div class="fu-mid"></div>
        <div class="fu-wk fu-r">${wkLabel}</div><div class="fu-season fu-r">Ø<span class="fu-long"> Saison</span></div>
      </div>
      ${rows}
      <div class="fu-verdict">${verdict}</div>
      <div class="fu-foot">Ø Saison = Starter-Punkte pro Woche${form ? ` aus ${form.weeks} gewerteten Woche${form.weeks === 1 ? '' : 'n'} vor Woche ${week}` : ' (noch keine gewertete Woche davor)'}, Rang unter allen ${form ? form.teams : ''} Teams. FLEX zählt zur echten Position. Balken = ${played ? 'echte Punkte' : 'Projektion'} dieser Woche.</div>
    </div>`;
}

function fuExplainHtml() {
  return `
    <p style="margin:0 0 10px;font-size:13px">Ein Klick auf ein Fantasy-Matchup unter <b>Matchups</b> öffnet das Matchup-Detail. Ganz oben steht dort der <b>📊 Unit-Vergleich</b>: je Position (QB, RB, WR, TE, K, DEF), wie stark die beiden Teams dort sind.</p>
    <ul style="margin:0 0 10px 18px;padding:0;font-size:13px;line-height:1.5">
      <li style="margin-bottom:6px"><b>Ø Saison</b>: Punkte, die die Starter dieser Position im Schnitt pro Woche geholt haben, mit Rang unter allen Teams der Liga (1 = meiste Punkte, grün = oberes Viertel, rot = unteres Viertel). FLEX-Spieler zählen zu ihrer echten Position, ein WR im FLEX also zu WR.</li>
      <li style="margin-bottom:6px"><b>Proj. / Ist</b>: Vor dem Spiel die projizierten Punkte der aktuellen Starter dieser Position (gleiche Projektion wie die Win%), nach dem Spiel die echten Punkte.</li>
      <li style="margin-bottom:6px"><b>Balken</b>: Wer diese Woche an der Position vorne liegt, und wie deutlich. Je weiter der Balken zur Seite eines Teams reicht, desto größer der Anteil an den gemeinsamen Punkten der Position.</li>
    </ul>
    <p style="margin:0;font-size:12px;color:var(--muted)">So siehst du auf einen Blick, wo ein Matchup entschieden wird, etwa „starker QB gegen tiefes WR-Corps“, statt nur die Gesamtprojektion.</p>`;
}
