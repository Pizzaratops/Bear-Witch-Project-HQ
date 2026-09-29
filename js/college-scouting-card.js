// ============================================================
//  COLLEGE SCOUTING — Frontend-Karte
// ============================================================
//  Zwei Vergleiche pro Prospect, STRIKT sprachlich getrennt (siehe
//  claude/college-scouting-concept.md, Abschnitt "Kernentscheidung"):
//    🎓 College Production Comp — "Produziert wie …" (reine On-Field-
//       Produktion, data/college-scouting.js, COLLEGE_SCOUTING.comps)
//    🏈 NFL Profile Comp — "Profiliert wie … (Pre-Draft-Rollenarchetyp,
//       KEINE Erfolgsprognose)" (Production+Größe gegen historische
//       Draftees, data/nfl-profile-comp.js, NFL_PROFILE_COMP.comps)
//  NIEMALS "wird so gut wie" o.ä. — beides sind Ähnlichkeits-, keine
//  Erfolgsvergleiche.
//
//  Lädt beide Datendateien erst beim Öffnen der Seite (_collegeScoutingLoad
//  aus js/college-scouting-loader.js, _nflProfileCompLoad aus
//  js/nfl-profile-comp-loader.js) -- zusammen mehrere MB, deshalb bewusst
//  nicht per <script>-Tag auf jeder Seite.
// ============================================================

const CS_POSITIONS = ['WR', 'RB', 'TE', 'QB'];
// Jahres-Fenster fuer die Prospect-Liste (1 = nur laufende Saison, 4 = das
// Maximum, das COLLEGE_SCOUTING.recent ueberhaupt enthaelt -- siehe
// RECENT_SEASONS_FOR_COMPS in sync-college-scouting.js. Groesser als 4 waere
// hier sinnlos, weil die Comps/Feats-Daten dafuer gar nicht gespeichert sind).
const CS_YEAR_WINDOWS = [1, 2, 3, 4];
let csState = { pos: 'WR', search: '', sel: null, prodRadar: null, nflRadar: null, yearWindow: 2 };

function _csYearWindowLabel(n) {
  const cur = (typeof COLLEGE_SCOUTING !== 'undefined' && COLLEGE_SCOUTING.meta.currentSeason) || new Date().getFullYear();
  if (n === 1) return `Nur ${cur}`;
  if (n >= 4) return 'Letzte 4 Jahre';
  return `${cur - n + 1}–${cur}`;
}
function _csYearFilter(p) {
  const cur = COLLEGE_SCOUTING.meta.currentSeason;
  return p.year > cur - csState.yearWindow;
}

const CS_PRIMARY_STAT = { WR: 'yds', TE: 'yds', RB: 'rushYds', QB: 'passYds' };
const CS_PRIMARY_LABEL = { WR: 'Rec-Yds', TE: 'Rec-Yds', RB: 'Rush-Yds', QB: 'Pass-Yds' };

// Anzeige-Labels fuer die Feature-Keys aus FEATURES (sync-college-scouting.js)
// und MATCH_FEATURES (build-nfl-profile-comp.js) -- rein praesentational,
// deshalb hier im Frontend und nicht in den generierten Datendateien.
const CS_FEATURE_LABELS = {
  recShare: 'Target Share', ydShare: 'Yard Share', tdShare: 'TD Share',
  avgPPA: 'PPA/Play', usageOverall: 'Usage',
  rushCarShare: 'Carry Share', recYdShare: 'Rec-Yard Share',
  avgPpaRush: 'Rush-PPA', avgPpaPass: 'Pass-PPA', usageRush: 'Rush-Usage',
  usagePass: 'Pass-Usage', compPct: 'Comp %',
  heightIn: 'Größe', weightLb: 'Gewicht',
};

function _csKey(s) {
  return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
    .replace(/\b(jr|sr|ii|iii|iv|v)\b\.?/g, '').replace(/[^a-z0-9]/g, '');
}

function showCollegeScouting() {
  navigate('collegescouting');
  renderCollegeScouting();
}

function csSetPos(p) { csState.pos = p; csState.sel = null; csState.search = ''; renderCollegeScouting(); }
function csSetYearWindow(n) { csState.yearWindow = n; csState.sel = null; renderCollegeScouting(); }
function csSelect(id) { csState.sel = id; csState.prodRadar = null; csState.nflRadar = null; _csRenderList(); _csRenderMain(); }
function csPickProdRadar(id) { csState.prodRadar = id; _csRenderProdBox(); }
function csPickNflRadar(id) { csState.nflRadar = id; _csRenderNflProfileBox(csState.pos, csState.sel); }

// ---- Radar/Spider-Grafik: Prospect vs. gewählter Comp, auf Perzentil-Achsen
// (0-100) der Matching-Features -- siehe COLLEGE_SCOUTING.feats /
// NFL_PROFILE_COMP.feats (percentile()/buildFeaturePercentiles() in den
// Build-Scripts). Reines inline-SVG, keine Chart-Lib, folgt dna-Design
// (Farben aus css/style.css: --accent2 = Ziel-Prospect, --accent = Comp).
function _csRadarSvg(axes, targetVals, compVals, targetLabel, compLabel) {
  const n = axes.length;
  if (n < 3 || !targetVals) return '<div class="page-sub">Nicht genug vollständige Features für eine Radar-Grafik.</div>';
  const size = 220, cx = size / 2, cy = size / 2 + 4, R = size / 2 - 42;
  const angleFor = i => -Math.PI / 2 + i * (2 * Math.PI / n);
  const pt = (i, frac) => [cx + Math.cos(angleFor(i)) * R * frac, cy + Math.sin(angleFor(i)) * R * frac];
  const ring = frac => axes.map((_, i) => pt(i, frac).map(v => v.toFixed(1)).join(',')).join(' ');
  const clamp = v => Math.max(0, Math.min(100, v == null ? 0 : v));
  const poly = vals => axes.map((ax, i) => pt(i, clamp(vals[ax.key]) / 100).map(v => v.toFixed(1)).join(',')).join(' ');
  const dots = (vals, cls) => axes.map((ax, i) => {
    const v = vals[ax.key];
    if (v == null) return '';
    const [x, y] = pt(i, v / 100);
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.5" class="${cls}"><title>${ax.label}: ${Math.round(v)}. Perzentil</title></circle>`;
  }).join('');
  const labels = axes.map((ax, i) => {
    const [x, y] = pt(i, 1.28);
    const c = Math.cos(angleFor(i));
    const anchor = Math.abs(c) < 0.25 ? 'middle' : (c > 0 ? 'start' : 'end');
    return `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="${anchor}" class="cs-radar-label">${ax.label}</text>`;
  }).join('');
  const axisLines = axes.map((_, i) => { const [x, y] = pt(i, 1); return `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" class="cs-radar-axis"/>`; }).join('');
  const rings = [0.25, 0.5, 0.75, 1].map(f => `<polygon points="${ring(f)}" class="cs-radar-ring"/>`).join('');
  const compPart = compVals ? `<polygon points="${poly(compVals)}" class="cs-radar-poly cs-radar-poly-comp"/>${dots(compVals, 'cs-radar-dot cs-radar-dot-comp')}` : '';

  const table = axes.map(ax => `
      <div class="cs-radar-row">
        <span class="cs-radar-row-label">${ax.label}</span>
        <span class="cs-radar-row-val cs-radar-row-target">${targetVals[ax.key] != null ? Math.round(targetVals[ax.key]) : '–'}</span>
        <span class="cs-radar-row-val cs-radar-row-comp">${compVals && compVals[ax.key] != null ? Math.round(compVals[ax.key]) : '–'}</span>
      </div>`).join('');

  return `
    <div class="cs-radar-wrap">
      <svg viewBox="0 0 ${size} ${size + 4}" class="cs-radar-svg" width="100%" height="${size + 4}" preserveAspectRatio="xMidYMid meet">
        ${rings}${axisLines}
        <polygon points="${poly(targetVals)}" class="cs-radar-poly cs-radar-poly-target"/>
        ${compPart}
        ${dots(targetVals, 'cs-radar-dot cs-radar-dot-target')}
        ${labels}
      </svg>
      <div class="cs-radar-legend">
        <span><i class="cs-radar-swatch cs-radar-swatch-target"></i>${targetLabel}</span>
        ${compLabel ? `<span><i class="cs-radar-swatch cs-radar-swatch-comp"></i>${compLabel}</span>` : ''}
      </div>
      <div class="cs-radar-table">
        <div class="cs-radar-row cs-radar-row-head"><span></span><span class="cs-radar-row-target">Prospect</span><span class="cs-radar-row-comp">Comp</span></div>
        ${table}
      </div>
    </div>`;
}

function renderCollegeScouting() {
  const wrap = document.getElementById('collegescoutingContent');
  if (!wrap) return;
  if (typeof COLLEGE_SCOUTING === 'undefined') {
    wrap.innerHTML = `<div class="page-sub">🎓 Lade College-Scouting-Daten …</div>`;
    _collegeScoutingLoad().then(() => renderCollegeScouting()).catch(e => {
      wrap.innerHTML = emptyState('Keine College-Scouting-Daten', `${e.message}. Die GitHub Action "College Scouting Sync" erzeugt sie.`, '🎓');
    });
    return;
  }
  const pos = csState.pos;
  const all = (COLLEGE_SCOUTING.recent[pos] || []).filter(_csYearFilter);
  if (!csState.sel || !all.some(p => p.id === csState.sel)) {
    const sorted = all.slice().sort((a, b) => (b[CS_PRIMARY_STAT[pos]] || 0) - (a[CS_PRIMARY_STAT[pos]] || 0));
    csState.sel = (sorted[0] || {}).id || null;
  }
  const cur = COLLEGE_SCOUTING.meta.currentSeason;
  const yearsShown = COLLEGE_SCOUTING.meta.years.filter(y => y > cur - csState.yearWindow);
  wrap.innerHTML = `
    <div class="dna-controls">
      <div class="rr-tb-group">${CS_POSITIONS.map(p => `<button class="rr-tb-btn${p === pos ? ' rr-tb-active' : ''}" onclick="csSetPos('${p}')">${p}</button>`).join('')}</div>
      <div class="rr-tb-group">${CS_YEAR_WINDOWS.map(n => `<button class="rr-tb-btn${n === csState.yearWindow ? ' rr-tb-active' : ''}" onclick="csSetYearWindow(${n})">${_csYearWindowLabel(n)}</button>`).join('')}</div>
    </div>
    <div class="dna-layout">
      <div class="dna-side">
        <input class="dna-search" placeholder="🔍 Prospect suchen …" value="${csState.search.replace(/"/g, '&quot;')}" oninput="csState.search=this.value;_csRenderList()">
        <div class="dna-list-head"><span>Prospect</span><span title="${CS_PRIMARY_LABEL[pos]} in der jeweils letzten erfassten College-Saison">${CS_PRIMARY_LABEL[pos]}</span></div>
        <div class="dna-list" id="csList"></div>
        <div class="dna-foot">${all.length} ${pos}-Prospects (Jahrgänge ${yearsShown.join('/')}, Mindest-Volumen erfüllt).</div>
      </div>
      <div class="dna-main" id="csMain"></div>
    </div>
    <div class="page-sub" style="margin-top:14px;font-size:11px">
      Bekannte Grenzen: CFBD erfasst keine Slot/Outside-Alignment- oder Route-Tree-Daten — zwei Receiver mit
      gleicher Target Share können trotzdem völlig unterschiedliche NFL-Rollen bekommen. Beide Comps sind
      Ähnlichkeits-, keine Erfolgs- oder Talentvergleiche.
    </div>`;
  _csRenderList();
  _csRenderMain();
}

function _csRenderList() {
  const host = document.getElementById('csList');
  if (!host) return;
  const pos = csState.pos;
  const q = _csKey(csState.search);
  const stat = CS_PRIMARY_STAT[pos];
  const list = (COLLEGE_SCOUTING.recent[pos] || [])
    .filter(_csYearFilter)
    .filter(p => !q || _csKey(p.name).includes(q))
    .sort((a, b) => (b[stat] || 0) - (a[stat] || 0));
  host.innerHTML = list.length ? list.map((p, i) => `
    <div class="dna-row${p.id === csState.sel ? ' active' : ''}" onclick="csSelect('${p.id}')">
      <span class="dna-row-idx">${i + 1}</span>
      <span class="dna-row-name">${p.name} <small>${p.team} · ${p.year}</small></span>
      <span class="dna-row-avg">${p[stat] != null ? Math.round(p[stat]) : '—'}</span>
    </div>`).join('') : `<div class="page-sub" style="padding:12px">Keine Treffer.</div>`;
}

// Baut eine Comp-Liste im dna-match-box-Stil. `items` = Array roher Comp-
// Objekte, `renderExtra(item)` liefert optionale Zusatz-Infos (z.B. Draft-
// Ergebnis + RAS beim NFL Profile Comp). Jede Zeile ist klickbar (`onPick`
// = Name der globalen Funktion, die beim Klick mit der Comp-ID aufgerufen
// wird) -- damit lässt sich der Vergleich in der Radar-Grafik wechseln.
function _csMatchBox(title, items, emptyText, renderExtra, onPick, selectedId) {
  return `
    <div class="dna-match-box">
      <div class="dna-match-title">${title}</div>
      ${items && items.length ? items.map((m, i) => `
        <div class="dna-match${onPick ? ' cs-match-pickable' : ''}${m.id === selectedId ? ' cs-match-picked' : ''}"${onPick ? ` onclick="${onPick}('${m.id}')"` : ''}>
          <span class="dna-match-score">#${i + 1}</span>
          <span class="dna-match-name">${m.name} <small>${m.team} · ${m.year}${renderExtra ? ' · ' + renderExtra(m) : ''}</small></span>
        </div>`).join('') : `<div class="page-sub">${emptyText}</div>`}
      ${onPick && items && items.length ? '<div class="page-sub" style="font-size:10px;padding:4px 12px 8px">↑ Comp anklicken für Vergleich auf den Einzel-Features (Radar unten).</div>' : ''}
    </div>`;
}

function _csRenderMain() {
  const host = document.getElementById('csMain');
  if (!host) return;
  const pos = csState.pos;
  const me = (COLLEGE_SCOUTING.recent[pos] || []).find(p => p.id === csState.sel);
  if (!me) { host.innerHTML = emptyState('Kein Prospect gewählt', 'Links einen Prospect auswählen.', '🎓'); return; }

  const stat = CS_PRIMARY_STAT[pos];

  host.innerHTML = `
    <div class="dna-head">
      <div>
        <div class="dna-name">${me.name}</div>
        <div class="page-sub">${pos} · ${me.team} · ${me.year} · ${me.conf || ''}</div>
      </div>
      <div class="dna-score" title="${CS_PRIMARY_LABEL[pos]}"><b>${me[stat] != null ? Math.round(me[stat]) : '—'}</b><small>${CS_PRIMARY_LABEL[pos]}</small></div>
    </div>
    <div class="dna-matches">
      <div id="csProdBox"></div>
      <div id="csNflProfileBox">
        <div class="dna-match-box"><div class="dna-match-title">🏈 NFL Profile Comp — „Profiliert wie …“</div><div class="page-sub">Lade …</div></div>
      </div>
    </div>
    <div class="page-sub" style="margin-top:10px;font-size:11px">College Production Comp: nächste Nachbarn nach Produktions-Profil (Mahalanobis-Distanz), unabhängig vom NFL-Erfolg. NFL Profile Comp weiter unten: Pre-Draft-Rollenarchetyp gegen tatsächlich gedraftete Spieler mit ähnlichem Produktions+Größen-Profil — <b>keine Erfolgs- oder Talentprognose</b>.</div>`;

  _csRenderProdBox();

  _nflProfileCompLoad().then(() => _csRenderNflProfileBox(pos, me.id)).catch(e => {
    const box = document.getElementById('csNflProfileBox');
    if (box) box.innerHTML = `<div class="dna-match-box"><div class="dna-match-title">🏈 NFL Profile Comp</div><div class="page-sub">${e.message}</div></div>`;
  });
}

function _csRenderProdBox() {
  const box = document.getElementById('csProdBox');
  if (!box) return;
  const pos = csState.pos;
  const me = (COLLEGE_SCOUTING.recent[pos] || []).find(p => p.id === csState.sel);
  if (!me) return;
  const prodComps = (COLLEGE_SCOUTING.comps[pos] || {})[me.id] || [];
  if (!csState.prodRadar && prodComps.length) csState.prodRadar = prodComps[0].id;

  const featKeys = (COLLEGE_SCOUTING.meta.features || {})[pos] || [];
  const axes = featKeys.map(k => ({ key: k, label: CS_FEATURE_LABELS[k] || k }));
  const feats = (COLLEGE_SCOUTING.feats || {})[pos] || {};
  const targetVals = feats[me.id];
  const compObj = prodComps.find(c => c.id === csState.prodRadar);
  const compVals = compObj ? feats[compObj.id] : null;

  box.innerHTML = `
    ${targetVals ? _csRadarSvg(axes, targetVals, compVals, me.name, compObj ? compObj.name : null)
                 : '<div class="page-sub" style="padding:8px 0">Keine Perzentil-Daten für diesen Prospect (zu wenige vollständige Feature-Werte).</div>'}
    ${_csMatchBox('🎓 College Production Comp — „Produziert wie …“', prodComps,
      'Kein vergleichbares Produktionsprofil gefunden (zu wenige vollständige Datensätze im Pool).',
      null, 'csPickProdRadar', csState.prodRadar)}`;
}

function _csRenderNflProfileBox(pos, playerId) {
  const box = document.getElementById('csNflProfileBox');
  if (!box) return;
  // Kann sich seit dem Start des Ladevorgangs geändert haben (Nutzer hat
  // Position/Prospect gewechselt) -- nicht mehr passende Antwort verwerfen.
  if (csState.pos !== pos || csState.sel !== playerId) return;

  const comps = (NFL_PROFILE_COMP.comps[pos] || {})[playerId] || [];
  const stats = NFL_PROFILE_COMP.stats[pos] || {};
  if (!csState.nflRadar && comps.length) csState.nflRadar = comps[0].id;
  const extra = m => `Draft: ${m.draftRound != null ? `Rd. ${m.draftRound} Pick ${m.draftPick}` : 'undrafted'} (${m.draftYear}) · RAS ${m.ras != null ? m.ras : 'unbekannt'}`;

  const featKeys = (NFL_PROFILE_COMP.meta.matchFeatures || {})[pos] || [];
  const axes = featKeys.map(k => ({ key: k, label: CS_FEATURE_LABELS[k] || k }));
  const feats = (NFL_PROFILE_COMP.feats || {})[pos] || {};
  const targetVals = feats[playerId];
  const compObj = comps.find(c => c.id === csState.nflRadar);
  const compVals = compObj ? feats[compObj.id] : null;
  const me = (COLLEGE_SCOUTING.recent[pos] || []).find(p => p.id === playerId);

  box.innerHTML = `
    ${targetVals ? _csRadarSvg(axes, targetVals, compVals, me ? me.name : 'Prospect', compObj ? compObj.name : null)
                 : ''}
    ${_csMatchBox('🏈 NFL Profile Comp — „Profiliert wie …“', comps,
      'Kein Vergleich möglich (Production- oder Größen-Daten für diesen Prospect unvollständig).', extra,
      'csPickNflRadar', csState.nflRadar)}
    <div class="page-sub" style="font-size:11px;margin-top:4px">Vergleichsbasis: ${stats.matched || 0} historisch gedraftete ${pos}s mit vollständigem Profil (aus ${stats.poolSize || 0} insgesamt gematcht). RAS = eigener, an ras.football angelehnter Athletik-Score (0–10) DES COMPS, nicht des Prospects selbst — der hat sein Combine/Draft noch vor sich. Radar-Achsen: Produktion + Größe/Gewicht (Matching-Features), nicht RAS/Draft.</div>`;
}
