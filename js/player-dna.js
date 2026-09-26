// ============================================================
//  PLAYER DNA — Perzentil-Radar fuer NFL-Spieler (QB/RB/WR/TE)
// ============================================================
//  NFL-Pendant zum "Cat Web" aus Taco Tuesday HQ. Daten: data/player-dna.js
//  (scripts/sync-player-dna.js, nflverse), wird erst beim Oeffnen der Seite
//  nachgeladen (~350 KB), damit der Rest der Seite schnell bleibt.
//
//  Pool = alle NFL-Spieler der Position mit Mindest-Volumen, die Liste links
//  zeigt standardmaessig nur Spieler aus Bear-Witch-Kadern (umschaltbar).
//
//  DNA-Match: bestes Profil in derselben Saison ("Aktuelles Match") und ueber
//  alle anderen Saisons ab 2016 ("Historisches Match", optional nur im
//  gleichen NFL-Jahr). Score = 100 minus mittlerer Abstand ueber alle
//  Achsen (Kern + Stil) auf der gewaehlten Skala.
//
//  v2: 6 Kern-Achsen (Rolle & Produktion -> DNA-Score) + 2 Stil-Achsen
//  (◇, kein besser/schlechter). Skala Perzentil oder Z-Score (Cap +-2,5).
//  Laufende Saison optional mit Stichproben-Korrektur (vs/ps/zs).
// ============================================================

const DNA_POSITIONS = ['QB', 'RB', 'WR', 'TE'];
const DNA_COLORS = ['#20d3c2', '#f25c8a', '#ffca28'];
let dnaState = { season: null, pos: 'WR', search: '', rosteredOnly: true, sel: null, compare: [], scale: 'p', stab: true, sameYear: false };
let _dnaChart = null;
let _dnaLoading = null;

function _dnaLoad() {
  if (typeof PLAYER_DNA !== 'undefined') return Promise.resolve();
  if (_dnaLoading) return _dnaLoading;
  _dnaLoading = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'data/player-dna.js?v=' + Math.floor(Date.now() / 3600000); // stuendlich frisch
    s.onload = () => resolve();
    s.onerror = () => { _dnaLoading = null; reject(new Error('data/player-dna.js nicht ladbar')); };
    document.head.appendChild(s);
  });
  return _dnaLoading;
}

// gleiche Normalisierung wie scripts/lib/sleeper-core.js (nameKey)
function _dnaKey(s) {
  return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
    .replace(/\b(jr|sr|ii|iii|iv|v)\b\.?/g, '').replace(/[^a-z0-9]/g, '');
}

let _dnaOwnerIdx = null;
function _dnaOwner(name) {
  if (!_dnaOwnerIdx) {
    _dnaOwnerIdx = {};
    if (typeof ROSTERS_LIVE !== 'undefined') {
      Object.entries(ROSTERS_LIVE).forEach(([tid, list]) => (list || []).forEach(p => {
        _dnaOwnerIdx[_dnaKey(p.name)] = LEAGUE_TEAMS.find(t => t.id === tid) || null;
      }));
    }
  }
  return _dnaOwnerIdx[_dnaKey(name)] || null;
}

// Welche Werte gerade gelten: Skala (Perzentil/Z) x Stichproben-Korrektur (nur wo vorhanden)
const _dnaUseStab = p => dnaState.stab && !!p.ps;
const _dnaVals = p => (dnaState.scale === 'z' ? (_dnaUseStab(p) ? p.zs : p.z) : (_dnaUseStab(p) ? p.ps : p.p)) || p.p;
const _dnaRaw = p => (_dnaUseStab(p) ? p.vs : p.v);
const _dnaCats = pos => PLAYER_DNA.categories[pos];
const _dnaCoreIdx = pos => _dnaCats(pos).map((c, i) => (c.type === 'style' ? -1 : i)).filter(i => i >= 0);
const _dnaAvg = p => {
  const vals = _dnaVals(p);
  const v = _dnaCoreIdx(dnaState.pos).map(i => vals[i]).filter(x => x != null);
  return v.length ? v.reduce((a, b) => a + b, 0) / v.length : 0;
};
const _dnaPlayers = (season, pos) => ((PLAYER_DNA.seasons[season] || {}).players || {})[pos] || [];
const _dnaFind = (season, pos, id) => _dnaPlayers(season, pos).find(p => p.id === id) || null;

function _dnaDistance(a, b) {
  const va = _dnaVals(a), vb = _dnaVals(b);
  let sum = 0, n = 0;
  va.forEach((v, i) => { if (v != null && vb[i] != null) { sum += Math.abs(v - vb[i]); n++; } });
  return n >= Math.min(6, va.length - 1) ? sum / n : null;
}

function _dnaMatches(season, pos, player, historic) {
  const out = [];
  Object.keys(PLAYER_DNA.seasons).forEach(y => {
    if (historic ? String(y) === String(season) : String(y) !== String(season)) return;
    _dnaPlayers(y, pos).forEach(o => {
      if (o.id === player.id && String(y) === String(season)) return;
      if (historic && o.id === player.id) return; // sich selbst in anderen Jahren nicht als "historisch" werten
      if (historic && dnaState.sameYear && player.e != null && o.e !== player.e) return; // gleiches NFL-Jahr
      const d = _dnaDistance(player, o);
      if (d != null) out.push({ season: y, p: o, score: Math.round(100 - d) });
    });
  });
  return out.sort((a, b) => b.score - a.score).slice(0, 3);
}

/* ---------- Erklaerungen (js/player-dna-glossary.js) ---------- */
function _dnaGloss(pos, k) {
  return (typeof DNA_GLOSSARY !== 'undefined' && DNA_GLOSSARY.stats[pos] && DNA_GLOSSARY.stats[pos][k]) || null;
}
const _dnaAttr = s => String(s || '').replace(/<[^>]+>/g, '').replace(/&/g, '&amp;').replace(/"/g, '&quot;');
function _dnaWrap(text, n) {
  const words = String(text || '').replace(/<[^>]+>/g, '').split(' '); const lines = []; let cur = '';
  words.forEach(w => { if ((cur + ' ' + w).trim().length > n) { lines.push(cur.trim()); cur = w; } else cur += ' ' + w; });
  if (cur.trim()) lines.push(cur.trim());
  return lines;
}

function dnaOpenHelp(pos, focusKey) {
  if (typeof DNA_GLOSSARY === 'undefined') return;
  pos = pos || dnaState.pos;
  let m = document.getElementById('dnaHelp');
  if (!m) {
    m = document.createElement('div');
    m.id = 'dnaHelp'; m.className = 'dna-modal';
    m.addEventListener('click', e => { if (e.target === m) dnaCloseHelp(); });
    document.body.appendChild(m);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') dnaCloseHelp(); });
  }
  const G = DNA_GLOSSARY;
  const cats = (typeof PLAYER_DNA !== 'undefined' ? PLAYER_DNA.categories[pos] : []) || [];
  const card = (c) => {
    const g = _dnaGloss(pos, c.k) || {};
    return `<div class="dna-help-card${c.k === focusKey ? ' focus' : ''}" id="dnaHelp-${c.k}">
      <div class="dna-help-card-head"><b>${c.type === 'style' ? '◇ ' : '● '}${c.label}</b><span>${c.type === 'style' ? 'Stil' : 'Rolle & Produktion'} · Stabilität r = ${String(c.stab).replace('.', ',')}</span></div>
      ${g.what ? `<p><b>Was ist das?</b> ${g.what}</p>` : ''}
      ${g.why ? `<p><b>Warum ist es drin?</b> ${g.why}</p>` : ''}
      ${g.ex ? `<p class="dna-help-ex"><b>Beispiel:</b> ${g.ex}</p>` : ''}
    </div>`;
  };
  m.innerHTML = `
    <div class="dna-modal-box" role="dialog" aria-label="Player DNA erklärt">
      <div class="dna-modal-head">
        <div><div class="dna-name" style="font-size:22px">📖 Player DNA – einfach erklärt</div>
          <div class="page-sub">Für alle – auch ohne Football-Wissen.</div></div>
        <button class="dna-modal-x" onclick="dnaCloseHelp()" aria-label="Schließen">✕</button>
      </div>
      <div class="dna-help-basics">
        ${G.basics.map((b, i) => `<details${i === 1 && !focusKey ? ' open' : ''}><summary>${b.title}</summary><div>${b.body}</div></details>`).join('')}
      </div>
      <div class="rr-tb-group" style="margin:16px 0 10px;width:max-content">
        ${['QB', 'RB', 'WR', 'TE'].map(p => `<button class="rr-tb-btn${p === pos ? ' rr-tb-active' : ''}" onclick="dnaOpenHelp('${p}')">${p}</button>`).join('')}
      </div>
      <div class="dna-help-title">Die 8 Stats beim ${{ QB: 'Quarterback', RB: 'Running Back', WR: 'Wide Receiver', TE: 'Tight End' }[pos]}</div>
      <div class="dna-help-grid">${cats.map(card).join('')}</div>
      <div class="dna-help-title">🚫 Warum nicht …? <span>Bekannte Stats, die wir bewusst weggelassen haben</span></div>
      <div class="dna-help-grid">${(G.notChosen[pos] || []).map(n => `
        <div class="dna-help-card dna-help-no">
          <div class="dna-help-card-head"><b>${n.name}</b><span>Stabilität r = ${n.r}</span></div>
          <p>${n.why}</p>
          ${n.ex && n.ex !== '–' ? `<p class="dna-help-ex"><b>Beispiel:</b> ${n.ex}</p>` : ''}
        </div>`).join('')}</div>
      <div class="page-sub" style="margin-top:14px;font-size:11px">Zahlen = Saison 2025 bzw. eigene Messung über die Saisons 2016–2025.</div>
    </div>`;
  m.classList.add('open');
  document.body.style.overflow = 'hidden';
  if (!focusKey) m.scrollTop = 0;
  if (focusKey) setTimeout(() => { const el = document.getElementById('dnaHelp-' + focusKey); if (el) el.scrollIntoView({ block: 'center' }); }, 30);
}
function dnaCloseHelp() {
  const m = document.getElementById('dnaHelp');
  if (m) m.classList.remove('open');
  document.body.style.overflow = '';
}

function _dnaFmt(v, cat) {
  if (v == null) return '—';
  const abs = Math.abs(v);
  const s = abs >= 100 ? v.toFixed(0) : abs >= 10 ? v.toFixed(1) : v.toFixed(2);
  return s.replace('.', ',');
}

function _dnaPctColor(p) {
  if (p == null) return 'var(--border)';
  if (p >= 80) return 'var(--accent)';
  if (p >= 60) return 'color-mix(in srgb, var(--accent) 60%, var(--muted))';
  if (p >= 40) return 'var(--muted)';
  if (p >= 20) return 'color-mix(in srgb, var(--accent2) 60%, var(--muted))';
  return 'var(--accent2)';
}

/* ---------- Einstieg ---------- */
function showPlayerDna() {
  navigate('playerdna');
  renderPlayerDna();
}

// Aus dem Kader heraus: Spieler direkt oeffnen
function openPlayerDna(name, pos) {
  navigate('playerdna');
  _dnaLoad().then(() => {
    const season = String(PLAYER_DNA.current);
    const key = _dnaKey(name);
    let hit = null, hitSeason = season;
    // aktuelle Saison zuerst, sonst juengste Saison, in der er im Pool war
    const years = Object.keys(PLAYER_DNA.seasons).sort((a, b) => b - a);
    for (const y of years) {
      hit = _dnaPlayers(y, pos).find(p => _dnaKey(p.n) === key);
      if (hit) { hitSeason = y; break; }
    }
    dnaState.pos = pos;
    dnaState.season = hitSeason;
    dnaState.sel = hit ? hit.id : null;
    dnaState.compare = [];
    dnaState.search = '';
    renderPlayerDna(hit ? null : `${name} erfüllt in keiner Saison ab 2016 das Mindest-Volumen für den ${pos}-Pool.`);
    if (hit) setTimeout(_dnaScrollMain, 50);
  }).catch(e => renderPlayerDna(e.message));
}

function renderPlayerDna(notice) {
  const wrap = document.getElementById('playerdnaContent');
  if (!wrap) return;
  if (typeof PLAYER_DNA === 'undefined') {
    wrap.innerHTML = `<div class="page-sub">🧬 Lade Player-DNA-Daten …</div>`;
    _dnaLoad().then(() => renderPlayerDna(notice)).catch(e => {
      wrap.innerHTML = emptyState('Keine Player-DNA-Daten', `${e.message}. Die GitHub Action "Player DNA Sync" erzeugt sie.`, '🧬');
    });
    return;
  }
  const seasons = Object.keys(PLAYER_DNA.seasons).sort((a, b) => b - a);
  if (!dnaState.season || !PLAYER_DNA.seasons[dnaState.season]) dnaState.season = String(PLAYER_DNA.current);
  const season = dnaState.season, pos = dnaState.pos;
  const weeks = PLAYER_DNA.seasons[season].weeks;
  const all = _dnaPlayers(season, pos);
  if (!dnaState.sel || !all.some(p => p.id === dnaState.sel)) {
    const firstOwned = all.slice().sort((a, b) => _dnaAvg(b) - _dnaAvg(a)).find(p => _dnaOwner(p.n));
    dnaState.sel = (firstOwned || all[0] || {}).id || null;
  }

  wrap.innerHTML = `
    ${notice ? `<div class="info-banner">${notice}</div>` : ''}
    <div class="dna-controls">
      <div class="rr-tb-group">${DNA_POSITIONS.map(p => `<button class="rr-tb-btn${p === pos ? ' rr-tb-active' : ''}" onclick="dnaSetPos('${p}')">${p}</button>`).join('')}</div>
      <select class="dna-select" onchange="dnaSetSeason(this.value)">
        ${seasons.map(y => `<option value="${y}"${y === season ? ' selected' : ''}>${y}${String(y) === String(PLAYER_DNA.current) ? ` (bis Woche ${PLAYER_DNA.seasons[y].weeks})` : ''}</option>`).join('')}
      </select>
      <div class="rr-tb-group" title="Perzentil = Rang im Pool. Z-Score = Abstand zum Schnitt in Standardabweichungen (gedeckelt auf ±${PLAYER_DNA.zCap || 2.5}), zeigt echte Abstände statt Rängen.">
        <button class="rr-tb-btn${dnaState.scale === 'p' ? ' rr-tb-active' : ''}" onclick="dnaSet('scale','p')">Perzentil</button>
        <button class="rr-tb-btn${dnaState.scale === 'z' ? ' rr-tb-active' : ''}" onclick="dnaSet('scale','z')">Z-Score</button>
      </div>
      ${all.some(p => p.ps) ? `<label class="dna-toggle" title="Frühe Saison: jeder Wert wird zum Vorjahreswert des Spielers (bzw. Positions-Schnitt) gezogen – je instabiler die Kennzahl, desto stärker."><input type="checkbox" ${dnaState.stab ? 'checked' : ''} onchange="dnaSet('stab',this.checked)"> Stichproben-Korrektur</label>` : ''}
      <label class="dna-toggle"><input type="checkbox" ${dnaState.rosteredOnly ? 'checked' : ''} onchange="dnaState.rosteredOnly=this.checked;_dnaRenderList()"> nur Liga-Kader</label>
      <button class="dna-help-btn" onclick="dnaOpenHelp(dnaState.pos)">📖 Stats erklärt</button>
    </div>
    <div class="dna-layout">
      <div class="dna-side">
        <input class="dna-search" placeholder="🔍 Spieler suchen …" value="${dnaState.search.replace(/"/g, '&quot;')}" oninput="dnaState.search=this.value;_dnaRenderList()">
        <div class="dna-list-head"><span>Spieler</span><span title="Ø über die 6 Kern-Achsen (Rolle & Produktion)">DNA Ø</span></div>
        <div class="dna-list" id="dnaList"></div>
        <div class="dna-foot">Pool ${season}: ${all.length} ${pos}s mit Mindest-Volumen (${weeks} Wochen). Skala gegen die ganze NFL, nicht nur die Liga.</div>
      </div>
      <div class="dna-main" id="dnaMain"></div>
    </div>`;
  _dnaRenderList();
  _dnaRenderMain();
}

function dnaSet(key, val) { dnaState[key] = val; _dnaRenderList(); _dnaRenderMain(); document.querySelectorAll('.dna-controls .rr-tb-btn').forEach(b => {
  if (b.textContent === 'Perzentil') b.classList.toggle('rr-tb-active', dnaState.scale === 'p');
  if (b.textContent === 'Z-Score') b.classList.toggle('rr-tb-active', dnaState.scale === 'z'); }); }
function dnaSetPos(p) { dnaState.pos = p; dnaState.sel = null; dnaState.compare = []; renderPlayerDna(); }
function dnaSetSeason(y) {
  const prev = dnaState.sel ? _dnaFind(dnaState.season, dnaState.pos, dnaState.sel) : null;
  dnaState.season = String(y);
  // gleichen Spieler behalten, falls er auch in der neuen Saison im Pool ist
  dnaState.sel = prev && _dnaFind(y, dnaState.pos, prev.id) ? prev.id : null;
  dnaState.compare = [];
  renderPlayerDna();
}
function dnaSelect(id) { dnaState.sel = id; dnaState.compare = []; _dnaRenderList(); _dnaRenderMain(); _dnaScrollMain(); }
function _dnaScrollMain() {
  // Mobil liegt das Profil unter der Liste -> nach Auswahl hinscrollen
  if (window.innerWidth > 900) return;
  const m = document.getElementById('dnaMain');
  if (m) m.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function _dnaRenderList() {
  const host = document.getElementById('dnaList');
  if (!host) return;
  const q = _dnaKey(dnaState.search);
  const list = _dnaPlayers(dnaState.season, dnaState.pos)
    .map(p => ({ p, owner: _dnaOwner(p.n), avg: _dnaAvg(p) }))
    .filter(x => (!dnaState.rosteredOnly || x.owner || q) && (!q || _dnaKey(x.p.n).includes(q)))
    .sort((a, b) => b.avg - a.avg);
  host.innerHTML = list.length ? list.map((x, i) => `
    <div class="dna-row${x.p.id === dnaState.sel ? ' active' : ''}" onclick="dnaSelect('${x.p.id}')">
      <span class="dna-row-idx">${i + 1}</span>
      <span class="dna-row-name">${x.p.n} <small>${x.p.t}${x.owner ? ` · ${x.owner.emoji}` : ' · FA'}</small></span>
      <span class="dna-row-avg" style="color:${_dnaPctColor(x.avg)}">${Math.round(x.avg)}</span>
    </div>`).join('') : `<div class="page-sub" style="padding:12px">Keine Treffer.</div>`;
}

function dnaAddCompare(season, id) {
  if (dnaState.compare.some(c => c.season === String(season) && c.id === id)) return;
  if (String(season) === dnaState.season && id === dnaState.sel) return;
  dnaState.compare = dnaState.compare.concat([{ season: String(season), id }]).slice(-2); // max. 3 Profile gesamt
  _dnaRenderMain();
}
function dnaRemoveCompare(i) { dnaState.compare.splice(i, 1); _dnaRenderMain(); }

function _dnaCellVal(x) {
  if (x == null) return '—';
  if (dnaState.scale === 'z') { const z = (x - 50) / 20; return (z >= 0 ? '+' : '') + z.toFixed(1).replace('.', ','); }
  return String(x);
}

function _dnaRenderMain() {
  const host = document.getElementById('dnaMain');
  if (!host) return;
  const { season, pos } = dnaState;
  const cats = _dnaCats(pos);
  const me = dnaState.sel ? _dnaFind(season, pos, dnaState.sel) : null;
  if (!me) { host.innerHTML = emptyState('Kein Spieler gewählt', 'Links einen Spieler auswählen.', '🧬'); return; }

  const entries = [{ season, p: me }].concat(dnaState.compare.map(c => ({ season: c.season, p: _dnaFind(c.season, pos, c.id) })).filter(e => e.p));
  const owner = _dnaOwner(me.n);
  const avg = Math.round(_dnaAvg(me));
  const vals = _dnaVals(me), raw = _dnaRaw(me), useStab = _dnaUseStab(me);
  const core = cats.map((c, i) => ({ c, i, v: vals[i] })).filter(x => x.c.type !== 'style' && x.v != null).sort((a, b) => b.v - a.v);
  const cur = _dnaMatches(season, pos, me, false);
  const hist = _dnaMatches(season, pos, me, true);
  const yearTxt = me.e ? (me.e === 1 ? 'Rookie' : `NFL-Jahr ${me.e}`) : '';
  const matchHtml = (title, list, sub, extra) => `
    <div class="dna-match-box">
      <div class="dna-match-title">${title}${extra || ''}</div>
      ${list.length ? list.map(m => {
        const o = _dnaOwner(m.p.n);
        return `<div class="dna-match" onclick="dnaAddCompare('${m.season}','${m.p.id}')" title="Zum Vergleich hinzufügen">
          <span class="dna-match-score">${m.score}%</span>
          <span class="dna-match-name">${m.p.n} <small>${sub ? m.season + ' · ' : ''}${m.p.e ? 'J' + m.p.e + ' · ' : ''}${m.p.t}${o ? ' · ' + o.emoji : ''}</small></span>
          <span class="dna-match-add">＋</span>
        </div>`;
      }).join('') : '<div class="page-sub">Kein vergleichbares Profil.</div>'}
    </div>`;
  const row = (c, i) => {
    const isStyle = c.type === 'style';
    const x = vals[i];
    const barW = x == null ? 0 : Math.max(2, Math.min(100, x));
    const color = isStyle ? 'var(--muted)' : _dnaPctColor(x);
    const rawTxt = _dnaFmt(me.v[i], c) + (useStab && raw[i] != null && me.v[i] != null ? `<small>stabilisiert ${_dnaFmt(raw[i], c)}</small>` : '');
    return `<tr${isStyle ? ' class="dna-style-row"' : ''}>
      <td><span class="dna-tip" tabindex="0" data-tip="${_dnaAttr((_dnaGloss(pos, c.k) || {}).short || '')}"><b>${isStyle ? '◇ ' : ''}${c.label}</b> <a class="dna-info" onclick="event.stopPropagation();dnaOpenHelp('${pos}','${c.k}')" title="Ausführlich erklärt">ⓘ</a></span><small>${c.unit} · Stabilität r=${String(c.stab).replace('.', ',')}</small></td>
      <td>${rawTxt}</td>
      <td><div class="dna-bar${dnaState.scale === 'z' ? ' dna-bar-z' : ''}">${dnaState.scale === 'z' && x != null
        ? `<div style="position:absolute;top:0;left:${Math.min(50, x)}%;width:${Math.max(1, Math.abs(x - 50))}%;background:${color}"></div>`
        : `<div style="width:${barW}%;background:${color}"></div>`}<span>${_dnaCellVal(x)}</span></div></td>
    </tr>`;
  };

  host.innerHTML = `
    <div class="dna-head">
      <div>
        <div class="dna-name">${me.n}</div>
        <div class="page-sub">${pos} · ${me.t} · ${season} · ${me.g} Spiele${yearTxt ? ' · ' + yearTxt : ''}${owner ? ` · ${owner.emoji} ${owner.name}` : ' · Free Agent'}</div>
      </div>
      <div class="dna-score" style="border-color:${_dnaPctColor(avg)}" title="Ø der 6 Kern-Achsen (${dnaState.scale === 'z' ? 'Z-Score, 50 = Schnitt' : 'Perzentil'})"><b style="color:${_dnaPctColor(avg)}">${dnaState.scale === 'z' ? _dnaCellVal(avg) : avg}</b><small>DNA Ø</small></div>
    </div>
    ${core.length ? `<div class="dna-tags">Stärken: ${core.slice(0, 2).map(x => `<b>${x.c.label}</b>`).join(' & ')} · Schwäche: <b>${core[core.length - 1].c.label}</b>${useStab ? ' · <span class="dna-stab-tag">Stichproben-korrigiert</span>' : ''}</div>` : ''}
    <div class="dna-grid">
      <div class="dna-chart-card">
        <canvas id="dnaCanvas"></canvas>
        <div class="dna-legend-mini">● Rolle & Produktion &nbsp; ◇ Stil (kein besser/schlechter)</div>
        ${entries.length > 1 ? `<div class="dna-compare-chips">${entries.map((e, i) => `
          <span class="dna-chip" style="border-color:${DNA_COLORS[i]}"><i style="background:${DNA_COLORS[i]}"></i>${e.p.n} ${e.season}${i ? ` <a onclick="dnaRemoveCompare(${i - 1})">✕</a>` : ''}</span>`).join('')}</div>` : ''}
      </div>
      <div>
        <table class="dna-table">
          <thead><tr><th>Kategorie</th><th>Wert</th><th>${dnaState.scale === 'z' ? 'Z-Score' : 'Perzentil'}</th></tr></thead>
          <tbody>
            ${cats.map((c, i) => c.type !== 'style' ? row(c, i) : '').join('')}
            <tr class="dna-sep"><td colspan="3">◇ Stil</td></tr>
            ${cats.map((c, i) => c.type === 'style' ? row(c, i) : '').join('')}
          </tbody>
        </table>
      </div>
    </div>
    <div id="dnaAirYards"></div>
    <div class="dna-matches">
      ${matchHtml(`🧬 DNA-Match ${season}`, cur, false)}
      ${matchHtml('🏛️ Historisches Match', hist, true, me.e ? ` <label class="dna-toggle dna-inline"><input type="checkbox" ${dnaState.sameYear ? 'checked' : ''} onchange="dnaSet('sameYear',this.checked)"> nur ${me.e === 1 ? 'Rookie-Jahre' : 'NFL-Jahr ' + me.e}</label>` : '')}
    </div>
    <div class="page-sub" style="margin-top:10px;font-size:11px">Klick auf ein Match legt es zum Vergleich ins Radar (max. 3 Profile). Match-Score = 100 − Ø Abstand über alle 8 Achsen. Stabilität r = gemessene Jahr-zu-Jahr-Korrelation 2016–2025. Quellen: nflverse (Stats, Next Gen Stats, Snap Counts, PFR), ffverse (Expected Fantasy Points).</div>`;
  _dnaDrawChart(entries, cats);
  // Air-Yards-Tiefenprofil (js/air-yards.js), falls geladen
  if (typeof airYardsMount === 'function') airYardsMount('dnaAirYards', me.id, pos, season, me.n);
}

function _dnaDrawChart(entries, cats) {
  if (_dnaChart) { _dnaChart.destroy(); _dnaChart = null; }
  const canvas = document.getElementById('dnaCanvas');
  if (!canvas || typeof Chart === 'undefined') return;
  const st = getComputedStyle(document.body);
  const text = st.getPropertyValue('--text').trim() || '#333';
  const border = st.getPropertyValue('--border').trim() || '#ddd';
  const compare = entries.length > 1;
  _dnaChart = new Chart(canvas.getContext('2d'), {
    type: 'radar',
    data: {
      labels: cats.map(c => (c.type === 'style' ? '◇ ' : '') + c.label),
      datasets: entries.map((e, i) => ({
        label: `${e.p.n} ${e.season}`,
        data: _dnaVals(e.p).map(v => v == null ? null : v),
        borderColor: DNA_COLORS[i],
        backgroundColor: _drHexToRgba(DNA_COLORS[i], compare ? 0.12 : 0.25),
        pointBackgroundColor: cats.map(c => c.type === 'style' ? (st.getPropertyValue('--surface').trim() || '#fff') : DNA_COLORS[i]),
        pointBorderColor: DNA_COLORS[i],
        pointStyle: cats.map(c => c.type === 'style' ? 'rectRot' : 'circle'),
        pointRadius: cats.map(c => c.type === 'style' ? 5 : 4), pointHoverRadius: 7, borderWidth: 2.5, spanGaps: true,
      })),
    },
    options: {
      responsive: true, maintainAspectRatio: true, aspectRatio: 1.15,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: st.getPropertyValue('--surface2').trim(), borderColor: border, borderWidth: 1,
          titleColor: text, bodyColor: text, footerColor: st.getPropertyValue('--muted').trim(), footerFont: { weight: '400', size: 11 }, padding: 10,
          callbacks: {
            footer: items => { const g = items[0] && _dnaGloss(dnaState.pos, cats[items[0].dataIndex].k); return g ? _dnaWrap(g.short, 48) : ''; },
            label: c => {
              const e = entries[c.datasetIndex], cat = cats[c.dataIndex];
              const x = _dnaVals(e.p)[c.dataIndex];
              const lbl = x == null ? 'kein Wert' : (dnaState.scale === 'z' ? 'z ' + _dnaCellVal(x) : x + '. Perzentil');
              return `${e.p.n} ${e.season}: ${lbl} (${_dnaFmt(_dnaRaw(e.p)[c.dataIndex], cat)} ${cat.unit})`;
            },
          },
        },
      },
      scales: {
        r: {
          min: 0, max: 100,
          ticks: { display: false, stepSize: 25 },
          grid: { color: border }, angleLines: { color: border },
          pointLabels: { color: text, font: { size: 11, weight: '700' } },
        },
      },
    },
  });
}
