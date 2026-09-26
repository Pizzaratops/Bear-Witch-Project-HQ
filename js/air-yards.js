/* ============================================================
   AIR YARDS — Tiefenprofil je Spieler (Karte im Player-DNA-Profil)
   ============================================================
   Daten: data/air-yards.js (AIR_YARDS), erzeugt von
   scripts/sync-air-yards.js (nflverse play-by-play, GitHub Action).
   Wird bei Bedarf nachgeladen (wie data/player-dna.js).

   Liefert:
     airYardsMount(hostId, gsisId, pos, season, name)  fuellt ein Element
     airYardsExplainHtml()                        Text fuer die Regeln-Seite

   Eigenstaendig: braucht aus der Seite nur CSS-Tokens (--accent,
   --muted, --border, --surface2, --text).
   ============================================================ */

let _ayLoading = null;
function _ayLoad() {
  if (typeof AIR_YARDS !== 'undefined') return Promise.resolve();
  if (_ayLoading) return _ayLoading;
  _ayLoading = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'data/air-yards.js?v=' + Math.floor(Date.now() / 3600000);
    s.onload = () => resolve();
    s.onerror = () => { _ayLoading = null; reject(new Error('data/air-yards.js nicht ladbar')); };
    document.head.appendChild(s);
  });
  return _ayLoading;
}

// Bin-Grenzen: Bin 0 = < min, Bin i = [min+(i-1)w, min+iw), letzter = >= max
function _ayEdges(bin) {
  const e = [];
  for (let i = 0; i < bin.n; i++) {
    const lo = i === 0 ? -Infinity : bin.min + (i - 1) * bin.w;
    const hi = i === bin.n - 1 ? Infinity : bin.min + i * bin.w;
    e.push([lo, hi]);
  }
  return e;
}
const AY_ZONES = [
  { k: 'behind', label: 'Hinter LOS', sub: '< 0', lo: -Infinity, hi: 0 },
  { k: 'short', label: 'Kurz', sub: '0–9', lo: 0, hi: 10 },
  { k: 'mid', label: 'Mittel', sub: '10–19', lo: 10, hi: 20 },
  { k: 'deep', label: 'Tief', sub: '20–29', lo: 20, hi: 30 },
  { k: 'bomb', label: 'Bombe', sub: '30+', lo: 30, hi: Infinity },
];
function _ayZoneShares(h, edges) {
  const tot = h.reduce((a, c) => a + c, 0) || 1;
  return AY_ZONES.map(z => h.reduce((a, c, i) => a + (edges[i][0] >= z.lo && edges[i][1] <= z.hi ? c : 0), 0) / tot);
}

// Anteil je Yard, leicht geglaettet, fuer die Bins mit endlichen Grenzen
function _ayCurve(h, bin) {
  const tot = h.reduce((a, c) => a + c, 0) || 1;
  const raw = h.map(c => c / tot / bin.w);
  const pts = [];
  for (let i = 1; i < bin.n - 1; i++) {
    const v = 0.25 * raw[i - 1] + 0.5 * raw[i] + 0.25 * raw[i + 1];
    pts.push([bin.min + (i - 0.5) * bin.w, v]);
  }
  return pts;
}

function _aySvg(me, avg, bin) {
  const W = 520, H = 190, L = 34, R = 10, T = 12, B = 26;
  const X0 = -5, X1 = 35;
  const pm = _ayCurve(me.h, bin).filter(p => p[0] >= X0 && p[0] <= X1);
  const pa = _ayCurve(avg.h, bin).filter(p => p[0] >= X0 && p[0] <= X1);
  const ymax = Math.max(0.02, ...pm.map(p => p[1]), ...pa.map(p => p[1])) * 1.1;
  const step = ymax > 0.08 ? 0.04 : ymax > 0.04 ? 0.02 : 0.01;
  const x = v => L + (v - X0) / (X1 - X0) * (W - L - R);
  const y = v => T + (1 - v / ymax) * (H - T - B);
  const line = pts => pts.map((p, i) => `${i ? 'L' : 'M'}${x(p[0]).toFixed(1)},${y(p[1]).toFixed(1)}`).join(' ');
  // Flaeche zwischen Spieler- und Schnitt-Kurve (zeigt, wo er drueber liegt)
  const band = `${line(pm)} ${pa.slice().reverse().map(p => `L${x(p[0]).toFixed(1)},${y(p[1]).toFixed(1)}`).join(' ')} Z`;
  let grid = '';
  for (let v = 0; v <= ymax + 1e-9; v += step) {
    grid += `<line x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}" class="ay-grid"/><text x="${L - 6}" y="${y(v) + 3}" class="ay-tick" text-anchor="end">${Math.round(v * 100)}%</text>`;
  }
  for (let v = X0; v <= X1; v += 5) {
    grid += `<text x="${x(v)}" y="${H - 8}" class="ay-tick" text-anchor="middle">${v}</text>`;
  }
  grid += `<line x1="${x(0)}" x2="${x(0)}" y1="${T}" y2="${H - B}" class="ay-los"/>`;
  return `<svg viewBox="0 0 ${W} ${H}" class="ay-svg" role="img" aria-label="Air-Yards-Verteilung ${me.n} gegen Positionsschnitt">
    ${grid}
    <path d="${band}" class="ay-band"/>
    <path d="${line(pa)}" class="ay-avg"/>
    <path d="${line(pm)}" class="ay-me"/>
  </svg>`;
}

function _ayCardHtml(me, avg, bin, pos, season) {
  const edges = _ayEdges(bin);
  const zm = _ayZoneShares(me.h, edges), za = _ayZoneShares(avg.h, edges);
  const unit = pos === 'QB' ? 'Pässe' : 'Targets';
  const maxZ = Math.max(...zm, ...za, 0.01);
  const d = me.adot - avg.adot;
  const zoneRows = AY_ZONES.map((z, i) => {
    const diff = (zm[i] - za[i]) * 100;
    const cls = Math.abs(diff) < 3 ? '' : diff > 0 ? 'ay-up' : 'ay-down';
    return `<div class="ay-zone">
      <div class="ay-zone-l">${z.label} <small>${z.sub}</small></div>
      <div class="ay-zone-bars">
        <div class="ay-zbar ay-zbar-me" style="width:${(zm[i] / maxZ * 100).toFixed(1)}%"></div>
        <div class="ay-zbar ay-zbar-avg" style="width:${(za[i] / maxZ * 100).toFixed(1)}%"></div>
      </div>
      <div class="ay-zone-v ${cls}">${(zm[i] * 100).toFixed(1)}%<small>Ø ${(za[i] * 100).toFixed(1)}%</small></div>
    </div>`;
  }).join('');
  return `
    <div class="ay-card">
      <div class="ay-head">
        <div class="ay-title">📏 Air Yards · Tiefenprofil ${season}</div>
        <div class="ay-meta"><b>${me.adot.toFixed(1)}</b> aDOT <span class="${Math.abs(d) < 0.5 ? '' : d > 0 ? 'ay-up' : 'ay-down'}">(${d >= 0 ? '+' : ''}${d.toFixed(1)} vs Ø ${pos} ${avg.adot.toFixed(1)})</span> · ${me.cnt} ${unit}</div>
      </div>
      <div class="ay-body">
        <div>
          ${_aySvg(me, avg, bin)}
          <div class="ay-legend"><span class="ay-lg-me"></span>${me.n} <span class="ay-lg-avg"></span>Ø alle ${pos} <span class="ay-lg-x">Air Yards →, % der ${unit} je Yard</span></div>
        </div>
        <div class="ay-zones">${zoneRows}</div>
      </div>
      ${me.cnt < 30 ? `<div class="ay-note">Kleine Stichprobe (${me.cnt} ${unit}): Die Form kann sich noch deutlich verschieben.</div>` : ''}
    </div>`;
}

function airYardsMount(hostId, gsisId, pos, season, displayName) {
  const host = document.getElementById(hostId);
  if (!host) return;
  host.innerHTML = '';
  _ayLoad().then(() => {
    const el = document.getElementById(hostId);
    if (!el) return;
    const S = AIR_YARDS.seasons[season];
    if (!S) { el.innerHTML = `<div class="ay-note">📏 Air-Yards-Tiefenprofil gibt es für ${Object.keys(AIR_YARDS.seasons).join(' und ')}.</div>`; return; }
    const me = S.players[gsisId];
    if (!me) { el.innerHTML = `<div class="ay-note">📏 Für diesen Spieler gibt es ${season} noch zu wenige ${pos === 'QB' ? 'Pässe' : 'Targets'} für ein Air-Yards-Profil.</div>`; return; }
    el.innerHTML = _ayCardHtml(Object.assign({}, me, displayName ? { n: displayName } : {}), S.avg[pos] || S.avg[me.pos], AIR_YARDS.bin, pos, season);
  }).catch(() => {});
}

function airYardsExplainHtml() {
  return `
    <p style="margin:0 0 10px;font-size:13px">Im Profil jedes Spielers unter <b>Spieler → Player DNA</b> zeigt die Karte <b>📏 Air Yards</b>, wie tief ein Spieler angespielt wird (WR/TE/RB: alle Targets) bzw. wie tief ein QB wirft (alle Passversuche ohne Sacks). Air Yards = Yards, die der Ball in der Luft über die Line of Scrimmage fliegt, egal ob gefangen oder nicht.</p>
    <ul style="margin:0 0 10px 18px;padding:0;font-size:13px;line-height:1.5">
      <li style="margin-bottom:6px"><b>Kurve</b>: Anteil der Targets je Yard-Tiefe (durchgezogen) gegen den Schnitt aller Spieler derselben Position (gepunktet). Die Fläche dazwischen zeigt, wo der Spieler häufiger bzw. seltener hin angespielt wird als üblich.</li>
      <li style="margin-bottom:6px"><b>aDOT</b> (average Depth of Target): durchschnittliche Air Yards. Zwei Spieler mit gleichem aDOT können völlig anders genutzt werden, etwa viele Screens plus Bomben gegenüber stetigen 10-Yard-Routes. Genau das zeigt die Kurve.</li>
      <li style="margin-bottom:6px"><b>Zonen</b>: Hinter der Line (&lt;0), Kurz (0–9), Mittel (10–19), Tief (20–29), Bombe (30+), jeweils Spieler gegen Ø. Grün bzw. rot = mindestens 3 Prozentpunkte über bzw. unter dem Schnitt.</li>
    </ul>
    <p style="margin:0;font-size:12px;color:var(--muted)">Quelle: nflverse Play-by-Play, laufende und Vorsaison, Regular Season. Mindestens 5 Targets (QB: 10 Pässe). Früh in der Saison ist die Stichprobe klein.</p>`;
}
