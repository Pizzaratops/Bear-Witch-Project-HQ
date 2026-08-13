// ============================================================
// Bear Witch Project HQ — App Logic
// ============================================================

/* ---------- Theme ---------- */
function toggleTheme() {
  const isLight = document.body.classList.toggle('light');
  localStorage.setItem('bwp-theme', isLight ? 'light' : 'dark');
  updateThemeBtn();
}
function updateThemeBtn() {
  const btn = document.getElementById('themeToggle');
  const isLight = document.body.classList.contains('light');
  btn.textContent = isLight ? '🌙 Dark' : '☀️ Light';
}
(function initTheme() {
  const saved = localStorage.getItem('bwp-theme');
  if (saved === 'light') document.body.classList.add('light');
})();

/* ---------- Navigation ---------- */
const PAGES = [
  'home', 'roster', 'draftboard', 'keepers', 'dynastyboard', 'rolling', 'weekbyweek',
  'playerrankings', 'playerprojections', 'futureboards',
  'standings', 'seasonrolling', 'matchups', 'trade', 'tradehistory'
];

function navigate(pageId, opts) {
  PAGES.forEach(p => {
    const el = document.getElementById('page-' + p);
    if (el) el.classList.remove('active');
  });
  const target = document.getElementById('page-' + pageId);
  if (target) target.classList.add('active');

  document.querySelectorAll('[data-page]').forEach(el => {
    el.classList.toggle('active', el.getAttribute('data-page') === pageId);
  });

  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  closeMobileNav();

  if (pageId === 'roster' && opts && opts.teamId) {
    renderRoster(opts.teamId);
  }
}

function goHome() { navigate('home'); renderHome(); }
function showRoster(teamId) { navigate('roster', { teamId }); }
function showDraftboard() { navigate('draftboard'); renderDraftboard(); }
function showKeepers() { navigate('keepers'); renderKeepers(); }
function showDynastyBoard() { navigate('dynastyboard'); renderDynastyBoard(); }
function showRolling() { navigate('rolling'); renderRolling(); }
function showWeekByWeek() { navigate('weekbyweek'); renderWeekByWeek(); }
function showStandings() { navigate('standings'); }
function showSeasonRolling() { navigate('seasonrolling'); renderSeasonRolling(); }
function showMatchups() { navigate('matchups'); }
function showTrade() { navigate('trade'); renderTrade(); }
function showTradeHistory() { navigate('tradehistory'); renderTradeHistory(); }

function toggleMobileNav() {
  document.getElementById('mobileNavDropdown').classList.toggle('open');
}
function closeMobileNav() {
  const el = document.getElementById('mobileNavDropdown');
  if (el) el.classList.remove('open');
}

/* Desktop-Dropdowns zusaetzlich per Klick (nicht nur :hover) bedienbar
   machen -- wichtig fuer Touch-Geraete mit breitem Viewport. */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.snav-group').forEach(group => {
    const btn = group.querySelector('.snav-group-btn');
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const wasOpen = group.classList.contains('open');
      document.querySelectorAll('.snav-group.open').forEach(g => g.classList.remove('open'));
      if (!wasOpen) group.classList.add('open');
    });
  });
  document.addEventListener('click', () => {
    document.querySelectorAll('.snav-group.open').forEach(g => g.classList.remove('open'));
  });
});

/* ---------- Empty state helper ---------- */
function emptyState(title, text, emoji) {
  return `
    <div class="empty-state">
      <span class="empty-emoji">${emoji || '🚧'}</span>
      <div class="empty-title">${title}</div>
      <div class="empty-text">${text}</div>
    </div>`;
}

/* ---------- Home ---------- */
function renderHome() {
  const grid = document.getElementById('homeTeamGrid');
  grid.innerHTML = LEAGUE_TEAMS.map(t => {
    const keeperCount = (DRAFT_2026_TEAMS.find(dt => dt.team === t.name) || { keepers: [] }).keepers.length;
    return `
      <div class="team-card" onclick="showRoster('${t.id}')">
        <span class="team-emoji">${t.emoji}</span>
        <div class="team-name">${t.name}</div>
        <div class="team-meta">${keeperCount} Keeper gemeldet</div>
      </div>`;
  }).join('');
}

/* ---------- Roster / Team page ---------- */
function renderRoster(teamId) {
  const team = LEAGUE_TEAMS.find(t => t.id === teamId);
  const wrap = document.getElementById('rosterContent');
  if (!team) {
    wrap.innerHTML = emptyState('Team nicht gefunden', 'Bitte über die Home-Seite ein Team auswählen.');
    return;
  }
  document.getElementById('rosterTitle').textContent = `${team.emoji} ${team.name}`;

  const draftTeam = DRAFT_2026_TEAMS.find(dt => dt.team === team.name);
  const keepers = draftTeam ? draftTeam.keepers : [];
  const keeperNames = new Set(keepers.map(p => p.name));
  const fullRoster = (typeof ROSTERS_LIVE !== 'undefined' && ROSTERS_LIVE[team.id]) || null;

  if (!keepers.length && !fullRoster) {
    wrap.innerHTML = emptyState(
      'Noch keine Kader-Daten',
      'Der volle Kader dieses Teams ist noch nicht hinterlegt. Sobald der ESPN-Sync einmal gelaufen ist, erscheint hier der komplette Kader.',
      '📋'
    );
    return;
  }

  let html = '';

  if (fullRoster && fullRoster.length) {
    html += `
      <div class="info-banner">
        Voller Kader via <b>ESPN-Sync</b>. Als Keeper gemeldete Spieler sind mit ihrer belegten
        Draft-Runde markiert.
      </div>
      <div class="section-label">Kompletter Kader (${fullRoster.length} Spieler)</div>
      ${fullRoster.map(p => {
        const isKeeper = keeperNames.has(p.name);
        const round = isKeeper ? computeKeeperRounds(keepers.length)[keepers.findIndex(k => k.name === p.name)] : null;
        return playerRowHtml({ name: p.name, nfl: p.nfl, pos: p.pos, status: p.status }, round, isKeeper);
      }).join('')}
    `;
  } else {
    const rounds = computeKeeperRounds(keepers.length);
    html += `
      <div class="info-banner">
        <b>${keepers.length} von max. ${MAX_KEEPERS}</b> Keepern gemeldet — Stand vor dem Keeper Lock Date
        (${formatLockDate()}). Der volle Rest-Kader erscheint hier automatisch, sobald der ESPN-Sync
        einmal erfolgreich gelaufen ist.
      </div>
      <div class="section-label">Gemeldete Keeper</div>
      ${keepers.map((p, i) => playerRowHtml(p, rounds[i])).join('')}
    `;
  }

  wrap.innerHTML = html;
}

function playerRowHtml(p, round, isKeeperBadge) {
  return `
    <div class="player-row">
      ${round ? `<div class="player-round">R${round}</div>` : (isKeeperBadge === undefined ? '' : `<div class="player-round" style="opacity:.35">—</div>`)}
      <div class="player-name">${p.name}${isKeeperBadge ? ' 🔒' : ''}</div>
      <div class="player-team">${p.nfl} · ${p.pos}</div>
      ${p.status ? `<div class="player-status ${p.status}">${p.status}</div>` : ''}
    </div>`;
}

/* Berechnet fuer eine Liste von K Keepern die belegten Runden,
   von unten aufgefuellt: erster Keeper -> Runde (TOTAL - K + 1),
   letzter Keeper -> Runde TOTAL. */
function computeKeeperRounds(k) {
  const startRound = TOTAL_DRAFT_ROUNDS - k + 1;
  const rounds = [];
  for (let i = 0; i < k; i++) rounds.push(startRound + i);
  return rounds;
}

function formatLockDate() {
  const d = new Date(KEEPER_LOCK_DATE);
  return d.toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' }) +
    ', ' + d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) + ' Uhr';
}

/* ---------- Keepers Übersicht (alle Teams) ---------- */
function renderKeepers() {
  const wrap = document.getElementById('keepersContent');
  wrap.innerHTML = DRAFT_2026_TEAMS.map(dt => {
    const rounds = computeKeeperRounds(dt.keepers.length);
    return `
      <div class="section-label">${dt.team} — ${dt.keepers.length}/${MAX_KEEPERS} Keeper</div>
      ${dt.keepers.map((p, i) => playerRowHtml(p, rounds[i])).join('')}
    `;
  }).join('');
}

/* ---------- Draft Board ---------- */
function renderDraftboard() {
  const wrap = document.getElementById('draftboardContent');
  const teams = DRAFT_2026_TEAMS;
  const teamsById = LEAGUE_TEAMS.reduce((m, t) => { m[t.name] = t; return m; }, {});

  const tradedOverrides = {}; // "team|round" -> owner team name
  (typeof TRADED_PICKS_2026 !== 'undefined' ? TRADED_PICKS_2026 : []).forEach(p => {
    tradedOverrides[`${p.from}|${p.round}`] = p.owner;
  });
  const tradedCount = Object.keys(tradedOverrides).length;

  let head = `<tr><th class="round-label">Runde</th>` +
    teams.map(t => `<th>${t.team}</th>`).join('') + `</tr>`;

  let rows = '';
  for (let round = 1; round <= TOTAL_DRAFT_ROUNDS; round++) {
    rows += `<tr><th class="round-label">R${round}</th>`;
    teams.forEach(t => {
      const k = t.keepers.length;
      const startRound = TOTAL_DRAFT_ROUNDS - k + 1;
      const tradedOwner = tradedOverrides[`${t.team}|${round}`];
      if (round >= startRound) {
        const player = t.keepers[round - startRound];
        rows += `<td><div class="cell-keeper" onclick="openTradeAnalyzer('${escapeJs(player.name)}')">${player.name}<small>${player.nfl} · ${player.pos}</small></div></td>`;
      } else if (tradedOwner) {
        const ownerEmoji = teamsById[tradedOwner] ? teamsById[tradedOwner].emoji : '';
        rows += `<td><div class="cell-keeper" onclick="openTradeAnalyzer('${escapeJs(t.team)} 2026 R${round}', 'pick')">${ownerEmoji} ${tradedOwner}<small>via ${t.team}</small></div></td>`;
      } else {
        rows += `<td><div class="cell-open" onclick="openTradeAnalyzer('${escapeJs(t.team)} 2026 R${round}', 'pick')">Own</div></td>`;
      }
    });
    rows += `</tr>`;
  }

  wrap.innerHTML = `
    <div class="info-banner">
      <b>${TOTAL_DRAFT_ROUNDS} Runden</b> · 12 Teams${tradedCount ? ` · <b>${tradedCount}</b> getradete(r) 2026er-Pick(s) hervorgehoben` : ' · bislang keine getradeten 2026er-Picks'}.
      Keeper werden von unten aufgefüllt: ein Team mit K Keepern belegt automatisch
      die letzten K Runden seines eigenen Picks. Da niemand mehr als
      <b>${MAX_KEEPERS} Keeper</b> haben kann, bleiben <b>Runde 1–5 für alle Teams offen</b>.
      "Own" = Team besitzt diesen Pick noch selbst. Klick auf eine Zelle öffnet den Trade Analyzer.
      Die konkrete Pick-Reihenfolge (Slot 1–12) je Runde steht noch nicht fest und wird
      ergänzt, sobald ESPN sie vergibt.
    </div>
    <div class="board-table-wrap">
      <table class="board board-compact">
        <thead>${head}</thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <div class="legend">
      <div class="legend-item"><span class="legend-swatch" style="background:var(--pick-own-bg);border:1px solid var(--pick-own-color)"></span> Keeper-Pick / getradeter Pick</div>
      <div class="legend-item"><span class="legend-swatch" style="background:var(--pick-open-bg);border:1px solid var(--pick-open-color)"></span> Own (noch offener Pick)</div>
    </div>
  `;
}

function escapeJs(s) { return String(s).replace(/'/g, "\\'"); }

/* ---------- Dynasty Board ---------- */
let dynastyBoardState = { sortKey: 'avg', posFilter: 'ALL', search: '' };

function renderDynastyBoard() {
  const wrap = document.getElementById('dynastyboardContent');
  wrap.innerHTML = `
    <div class="info-banner">
      Durchschnitt (Ø) aus allen Quellen, in denen ein Spieler auftaucht — je niedriger, desto wertvoller.
      <b>FantasyCalc</b> ist hier noch nicht dabei (API-Key-Anbindung offen). Spaltenköpfe anklicken zum Sortieren.
    </div>
    <div class="db-controls">
      <input type="text" id="dbSearch" placeholder="Spieler suchen…" class="db-search" oninput="onDynastyBoardChange()">
      <div class="db-pos-filters" id="dbPosFilters"></div>
    </div>
    <div class="board-table-wrap">
      <table class="board db-table">
        <thead><tr id="dbHeadRow"></tr></thead>
        <tbody id="dbBody"></tbody>
      </table>
    </div>
    <div class="page-sub" style="margin-top:10px">${DYNASTY_BOARD.length} Spieler aus 4 Quellen zusammengeführt.</div>
  `;

  const posBar = document.getElementById('dbPosFilters');
  ['ALL', 'QB', 'RB', 'WR', 'TE'].forEach(p => {
    const btn = document.createElement('button');
    btn.className = 'db-pos-btn' + (p === dynastyBoardState.posFilter ? ' active' : '');
    btn.textContent = p;
    btn.onclick = () => { dynastyBoardState.posFilter = p; renderDynastyBoard(); };
    posBar.appendChild(btn);
  });
  document.getElementById('dbSearch').value = dynastyBoardState.search;

  const cols = [
    { key: 'avg', label: 'Ø' }, { key: 'name', label: 'Spieler' }, { key: 'pos', label: 'Pos' },
    { key: 'fp', label: 'FantasyPros' }, { key: 'ktc', label: 'KTC' },
    { key: 'fn', label: 'Fantasy Navigator' }, { key: 'dd', label: 'Dynasty Daddy' }, { key: 'n', label: 'Quellen' },
  ];
  const headRow = document.getElementById('dbHeadRow');
  headRow.innerHTML = cols.map(c =>
    `<th style="cursor:pointer" onclick="sortDynastyBoard('${c.key}')">${c.label}${dynastyBoardState.sortKey === c.key ? ' ▲' : ''}</th>`
  ).join('');

  renderDynastyBoardRows();
}

function onDynastyBoardChange() {
  dynastyBoardState.search = document.getElementById('dbSearch').value;
  renderDynastyBoardRows();
}

function sortDynastyBoard(key) {
  dynastyBoardState.sortKey = key;
  renderDynastyBoard();
}

function renderDynastyBoardRows() {
  const { sortKey, posFilter, search } = dynastyBoardState;
  let rows = DYNASTY_BOARD.filter(p => posFilter === 'ALL' || p.pos === posFilter);
  if (search.trim()) {
    const q = search.trim().toLowerCase();
    rows = rows.filter(p => p.name.toLowerCase().includes(q));
  }
  rows = rows.slice().sort((a, b) => {
    if (sortKey === 'name') return a.name.localeCompare(b.name);
    const av = a[sortKey], bv = b[sortKey];
    if (av == null && bv == null) return 0;
    if (av == null) return 1;
    if (bv == null) return -1;
    return av - bv;
  });
  rows = rows.slice(0, 300); // Performance: Top 300 der aktuellen Filterung anzeigen

  document.getElementById('dbBody').innerHTML = rows.map(p => `
    <tr>
      <td><b>${p.avg}</b></td>
      <td style="text-align:left">${p.name}</td>
      <td>${p.pos}</td>
      <td>${p.fp ?? '—'}</td>
      <td>${p.ktc ?? '—'}</td>
      <td>${p.fn ?? '—'}</td>
      <td>${p.dd ?? '—'}</td>
      <td>${p.n}/4</td>
    </tr>`).join('');
}

/* ---------- Rolling Rankings (Dynasty) — Sidebar + Chart wie TTHQ ---------- */
let drCompareMode = false;
let drSelected = [];
let drFiltered = [];
let drChart = null;
let drSortBy = 'latest'; // 'latest' | 'name' | <snapshot-date>
let drSortDir = 'asc';

const DR_COMPARE_COLORS = ['#e0794a', '#4d7bb0', '#4caf81']; // Bears-Orange, Navy-Blau, Gruen

let _drDataCache = null;
function _drData() {
  if (_drDataCache) return _drDataCache;
  const snaps = _drSnaps();
  const nameInfo = new Map();
  snaps.forEach(s => s.rankings.forEach(p => { if (!nameInfo.has(p.name)) nameInfo.set(p.name, p.pos); }));

  _drDataCache = [...nameInfo.keys()].map(name => {
    const ranks = snaps.map(s => {
      const p = s.rankings.find(x => x.name === name);
      return p ? p.avg : null;
    });
    const latestRank = ranks.length ? ranks[ranks.length - 1] : null;
    return { name, pos: nameInfo.get(name) || '', ranks, latestRank };
  });
  return _drDataCache;
}
function _drSnaps() { return (typeof DYNASTY_ROLLING !== 'undefined') ? DYNASTY_ROLLING : []; }

function renderRolling() {
  _drDataCache = null;
  drSelected = [];
  drCompareMode = false;
  drSortBy = 'latest';
  drSortDir = 'asc';
  _drInit();
}

function _drInit() {
  drFiltered = _drData().map((p, i) => ({ ...p, origIdx: i }));
  _drApplySort();
  const inp = document.getElementById('drSearch');
  if (inp) inp.value = '';
  _drRenderAll();
}

function _drApplySort() {
  const dir = drSortDir === 'desc' ? -1 : 1;
  const key = drSortBy;
  const snaps = _drSnaps();
  const snapIdx = snaps.findIndex(s => s.date === key);

  drFiltered.sort((a, b) => {
    let va, vb;
    if (key === 'name') return dir * a.name.localeCompare(b.name);
    if (key === 'latest') { va = a.latestRank; vb = b.latestRank; }
    else if (snapIdx !== -1) { va = a.ranks[snapIdx]; vb = b.ranks[snapIdx]; }
    else { va = a.latestRank; vb = b.latestRank; }
    const an = va == null, bn = vb == null;
    if (an && bn) return a.name.localeCompare(b.name);
    if (an) return 1;
    if (bn) return -1;
    return dir * (va - vb);
  });
}

function drSortByKey(key) {
  if (drSortBy === key) drSortDir = drSortDir === 'asc' ? 'desc' : 'asc';
  else { drSortBy = key; drSortDir = 'asc'; }
  _drApplySort();
  _drRenderListHeader();
  _drRenderList();
}

function _drRenderAll() {
  _drRenderToolbar();
  if (!_drSnaps().length) { _drRenderEmpty(); return; }
  _drRenderListHeader();
  _drRenderList();
  _drRenderMain();
}

function _drRenderEmpty() {
  const colHost = document.getElementById('drListCols');
  if (colHost) colHost.innerHTML = '';
  const body = document.getElementById('drListBody');
  if (body) body.innerHTML = `<div style="padding:32px 18px;color:var(--muted);font-size:12px;text-align:center;line-height:1.6;">Noch keine Snapshot-Historie verfügbar.<br>Läuft automatisch mit, sobald <code>node scripts/snapshot-dynasty-rolling.js</code> läuft.</div>`;
  const panel = document.getElementById('drChartPanel');
  if (panel) panel.innerHTML = `<div style="margin:auto;text-align:center;color:var(--muted);"><div style="font-size:40px;margin-bottom:12px;">🕒</div><div style="font-size:15px;font-weight:700;color:var(--text);">Noch keine Daten</div></div>`;
}

function _drRenderToolbar() {
  const host = document.getElementById('drToolbar');
  if (!host) return;
  const compareActive = drCompareMode ? ' rr-tb-active' : '';
  host.innerHTML = `
    <div class="rr-tb-group">
      <button class="rr-tb-btn${compareActive}" onclick="drToggleCompare()">⚖️ Vergleichen ${drCompareMode ? '(' + drSelected.length + '/3)' : ''}</button>
    </div>
  `;
  const sub = document.getElementById('drSnapshotSubtitle');
  const snaps = _drSnaps();
  if (sub) sub.textContent = snaps.length ? `${snaps.length} Snapshot${snaps.length === 1 ? '' : 's'} · zuletzt ${snaps[snaps.length - 1].label}` : 'Bear Witch Project HQ';
}

function drToggleCompare() {
  drCompareMode = !drCompareMode;
  if (!drCompareMode && drSelected.length > 1) drSelected = drSelected.slice(0, 1);
  _drRenderAll();
}

function _drRenderListHeader() {
  const host = document.getElementById('drListCols');
  if (!host) return;
  const snaps = _drSnaps();
  const sortIndicator = key => drSortBy !== key ? '' : (drSortDir === 'asc' ? ' ↑' : ' ↓');
  const cls = key => 'rr-col-h' + (drSortBy === key ? ' rr-col-active' : '');

  host.style.gridTemplateColumns = `32px 1fr repeat(${snaps.length}, 42px)`;
  const snapHeaders = snaps.map(s =>
    `<span class="${cls(s.date)}" onclick="drSortByKey('${s.date}')" title="${s.date}">${s.label}${sortIndicator(s.date)}</span>`
  ).join('');
  host.innerHTML =
    `<span class="${cls('latest')}" onclick="drSortByKey('latest')" title="Aktueller Rang (neuester Snapshot)">#${sortIndicator('latest')}</span>` +
    `<span class="${cls('name')}" onclick="drSortByKey('name')" style="text-align:left;">Name${sortIndicator('name')}</span>` +
    snapHeaders;
}

function drFilter() {
  const q = (document.getElementById('drSearch')?.value || '').toLowerCase().trim();
  const data = _drData();
  drFiltered = q
    ? data.map((p, i) => ({ ...p, origIdx: i })).filter(p => p.name.toLowerCase().includes(q) || p.pos.toLowerCase().includes(q))
    : data.map((p, i) => ({ ...p, origIdx: i }));
  _drApplySort();
  _drRenderList();
}

function _drRankColor(r) {
  if (r === null || r === undefined) return 'var(--border)';
  if (r <= 5) return '#e0794a';
  if (r <= 15) return '#4caf81';
  if (r <= 30) return '#4d7bb0';
  if (r <= 60) return '#9e78ff';
  if (r <= 100) return '#e0a53a';
  return '#d9695f';
}

function _drRenderList() {
  const body = document.getElementById('drListBody');
  if (!body) return;
  const snaps = _drSnaps();
  const gridTpl = `32px 1fr repeat(${snaps.length}, 42px)`;

  body.innerHTML = drFiltered.slice(0, 500).map((p, sortIdx) => {
    const cells = snaps.map((s, i) => {
      const r = p.ranks[i];
      const c = _drRankColor(r);
      return `<span class="rr-rank-cell" style="color:${c};background:${r ? c + '22' : 'transparent'}">${r ?? '–'}</span>`;
    }).join('');
    const isSelected = drSelected.indexOf(p.origIdx) !== -1;
    const active = isSelected ? ' rr-active' : '';
    const selIdx = drSelected.indexOf(p.origIdx);
    const colorDot = (drCompareMode && isSelected)
      ? `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${DR_COMPARE_COLORS[selIdx]};margin-right:4px;vertical-align:middle;"></span>`
      : '';
    const idxLabel = drSortBy === 'latest' ? (p.latestRank != null ? p.latestRank : '–') : (sortIdx + 1);
    return `<div class="rr-row${active}" data-idx="${p.origIdx}" onclick="drSelectPlayer(${p.origIdx})" style="grid-template-columns:${gridTpl};">
      <span class="rr-idx">${idxLabel}</span>
      <span class="rr-name" title="${p.name}">${colorDot}${p.name}</span>
      ${cells}
    </div>`;
  }).join('');
}

function drSelectPlayer(origIdx) {
  if (drCompareMode) {
    const i = drSelected.indexOf(origIdx);
    if (i !== -1) drSelected.splice(i, 1);
    else if (drSelected.length < 3) drSelected.push(origIdx);
    else drSelected[2] = origIdx;
  } else {
    drSelected = [origIdx];
  }
  _drRenderAll();
}

function _drRenderMain() {
  const panel = document.getElementById('drChartPanel');
  if (!panel) return;
  if (!drSelected.length) {
    panel.innerHTML = `
      <div style="margin:auto;text-align:center;color:var(--muted);">
        <div style="font-size:40px;margin-bottom:12px;">📈</div>
        <div style="font-size:15px;font-weight:700;color:var(--text);margin-bottom:6px;">Spieler auswählen</div>
        <div style="font-size:13px;">${drCompareMode ? 'Wähle bis zu 3 Spieler links zum Vergleich' : 'Klicke links auf einen Spieler um seinen Dynasty-Rang-Verlauf zu sehen'}</div>
      </div>`;
    return;
  }
  if (drCompareMode && drSelected.length > 1) _drRenderCompare(panel);
  else _drRenderSingle(panel, _drData()[drSelected[0]]);
}

function _drRenderSingle(panel, player) {
  const snaps = _drSnaps();
  const labels = snaps.map(s => s.label);
  const values = player.ranks;
  const valid = values.filter(x => x !== null);
  const best = valid.length ? Math.min(...valid) : null;
  const worst = valid.length ? Math.max(...valid) : null;
  const avg = valid.length ? Math.round(valid.reduce((a, b) => a + b, 0) / valid.length) : null;

  const pillsHtml = `
    <div class="rr-pills">
      <div class="rr-pill"><span class="rr-pill-val" style="color:#e0794a">${best ?? '–'}</span><span class="rr-pill-label">Bestes</span></div>
      <div class="rr-pill"><span class="rr-pill-val" style="color:#d9695f">${worst ?? '–'}</span><span class="rr-pill-label">Schlechtestes</span></div>
      <div class="rr-pill"><span class="rr-pill-val" style="color:#4d7bb0">${avg ?? '–'}</span><span class="rr-pill-label">Schnitt</span></div>
      <div class="rr-pill"><span class="rr-pill-val" style="color:#4caf81">${valid.length}/${values.length}</span><span class="rr-pill-label">Snapshots</span></div>
    </div>`;

  const badgesHtml = '<div class="rr-badges">' + snaps.map((s, i) => {
    const r = values[i];
    const c = _drRankColor(r);
    return `<div class="rr-month-badge"><span class="rr-badge-label">${s.label}</span><span class="rr-badge-rank" style="color:${c}">${r ?? '—'}</span></div>`;
  }).join('') + '</div>';

  const owner = ownerOfPlayer(player.name);
  panel.innerHTML = `
    <div class="rr-player-header">
      <div>
        <div class="rr-player-name">${player.name}</div>
        <div class="rr-player-sub">Dynasty Rolling Rankings · ${player.pos || '—'}${owner ? ' · ' + (owner.emoji || '') + ' ' + owner.name : ''}</div>
      </div>
      ${pillsHtml}
    </div>
    <div class="rr-chart-box">
      <canvas id="drCanvas"></canvas>
    </div>
    ${badgesHtml}`;

  _drDrawChart([{ player, values, color: DR_COMPARE_COLORS[0] }], labels);
}

function _drRenderCompare(panel) {
  const data = _drData();
  const snaps = _drSnaps();
  const labels = snaps.map(s => s.label);
  const players = drSelected.map(i => data[i]);
  const datasets = players.map((p, i) => ({ player: p, values: p.ranks, color: DR_COMPARE_COLORS[i] }));

  const cardsHtml = datasets.map(d => {
    const valid = d.values.filter(x => x !== null);
    const best = valid.length ? Math.min(...valid) : null;
    const avg = valid.length ? Math.round(valid.reduce((a, b) => a + b, 0) / valid.length) : null;
    return `<div class="rr-compare-card" style="border-color:${d.color}55;">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
        <span style="width:12px;height:12px;border-radius:50%;background:${d.color};"></span>
        <span style="font-weight:800;font-size:15px;">${d.player.name}</span>
      </div>
      <div style="display:flex;gap:14px;font-size:11px;color:var(--muted);">
        <span>Bestes: <strong style="color:${d.color};font-size:14px;">#${best ?? '–'}</strong></span>
        <span>Schnitt: <strong style="color:${d.color};font-size:14px;">#${avg ?? '–'}</strong></span>
      </div>
    </div>`;
  }).join('');

  panel.innerHTML = `
    <div class="rr-player-header">
      <div>
        <div class="rr-player-name">Vergleich</div>
        <div class="rr-player-sub">Dynasty Rolling Rankings</div>
      </div>
    </div>
    <div class="rr-compare-cards">${cardsHtml}</div>
    <div class="rr-chart-box">
      <canvas id="drCanvas"></canvas>
    </div>`;

  _drDrawChart(datasets, labels);
}

function _drDrawChart(datasets, labels) {
  if (drChart) { drChart.destroy(); drChart = null; }
  const canvas = document.getElementById('drCanvas');
  if (!canvas || typeof Chart === 'undefined') return;
  const ctx = canvas.getContext('2d');

  const chartDatasets = datasets.map(d => {
    const grad = ctx.createLinearGradient(0, 0, 0, 280);
    const rgba = _drHexToRgba(d.color, 0.22);
    grad.addColorStop(0, rgba);
    grad.addColorStop(1, _drHexToRgba(d.color, 0));
    return {
      label: d.player.name,
      data: d.values,
      borderColor: d.color,
      backgroundColor: datasets.length === 1 ? grad : 'transparent',
      pointBackgroundColor: d.values.map(r => datasets.length === 1 ? _drRankColor(r) : d.color),
      pointBorderColor: getComputedStyle(document.body).getPropertyValue('--surface') || '#fff',
      pointBorderWidth: 2,
      pointRadius: 6,
      pointHoverRadius: 9,
      borderWidth: 2.5,
      fill: datasets.length === 1,
      tension: 0.35,
      spanGaps: true,
    };
  });

  const styles = getComputedStyle(document.body);
  const textColor = styles.getPropertyValue('--text') || '#333';
  const mutedColor = styles.getPropertyValue('--muted') || '#888';
  const borderColor = styles.getPropertyValue('--border') || '#ddd';
  const surfaceColor = styles.getPropertyValue('--surface2') || '#fff';

  drChart = new Chart(ctx, {
    type: 'line',
    data: { labels, datasets: chartDatasets },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 2.6,
      plugins: {
        legend: { display: datasets.length > 1, labels: { color: textColor, font: { size: 12, weight: '700' } } },
        tooltip: {
          backgroundColor: surfaceColor,
          borderColor: borderColor,
          borderWidth: 1,
          titleColor: textColor,
          bodyColor: '#e0794a',
          padding: 12,
          callbacks: { label: c => c.raw === null ? `${c.dataset.label}: kein Ranking` : `${c.dataset.label}: #${c.raw}` }
        }
      },
      scales: {
        y: {
          reverse: true, min: 1,
          grid: { color: borderColor }, border: { color: borderColor },
          ticks: { color: mutedColor, font: { size: 11 }, callback: v => `#${v}` },
          title: { display: true, text: 'Ranking', color: mutedColor, font: { size: 11 } }
        },
        x: { grid: { color: borderColor }, border: { color: borderColor }, ticks: { color: textColor, font: { size: 12, weight: '700' } } }
      }
    }
  });
}

function _drHexToRgba(hex, alpha) {
  const m = hex.match(/^#([0-9a-f]{6})$/i);
  if (!m) return `rgba(224,121,74,${alpha})`;
  const n = parseInt(m[1], 16);
  return `rgba(${(n>>16)&255},${(n>>8)&255},${n&255},${alpha})`;
}

/* ---------- Week by Week ---------- */
let weekByWeekState = { season: null, week: null };

function renderWeekByWeek() {
  const wrap = document.getElementById('weekbyweekContent');
  const seasons = Object.keys(WEEKLY_SCORES);
  const season = weekByWeekState.season || seasons[seasons.length - 1];
  const weeks = Object.keys(WEEKLY_SCORES[season] || {}).map(Number).sort((a, b) => a - b);

  if (!weeks.length) {
    wrap.innerHTML = emptyState(
      'Noch keine Wochenwerte',
      'Sobald die Saison läuft, füllt der automatische ESPN-Sync (täglich 9 & 21 Uhr) diese Seite. Alternativ lassen sich Werte auch direkt in data/weekly-scores.js eintragen.',
      '🗓️'
    );
    return;
  }
  const week = weekByWeekState.week || weeks[weeks.length - 1];
  weekByWeekState = { season, week };

  const entries = (WEEKLY_SCORES[season][week] || []).slice().sort((a, b) => b.points - a.points);
  const teamName = id => (LEAGUE_TEAMS.find(t => t.id === id) || { name: id, emoji: '🏈' });

  wrap.innerHTML = `
    <div class="db-controls">
      <div class="db-pos-filters" id="weekSelector"></div>
    </div>
    <div class="board-table-wrap">
      <table class="board">
        <thead><tr><th class="round-label">#</th><th>Team</th><th>Punkte</th><th>Gegner</th><th>Gegner-Punkte</th></tr></thead>
        <tbody>
          ${entries.map((e, i) => {
            const t = teamName(e.teamId), o = teamName(e.opponentId);
            const win = e.points > e.opponentPoints;
            return `<tr>
              <td>${i + 1}</td>
              <td style="text-align:left;font-weight:600">${t.emoji || ''} ${t.name}</td>
              <td><b>${e.points.toFixed(1)}</b></td>
              <td>${o.emoji || ''} ${o.name}</td>
              <td>${e.opponentPoints.toFixed(1)} ${win ? '✅' : ''}</td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;

  const sel = document.getElementById('weekSelector');
  weeks.forEach(w => {
    const btn = document.createElement('button');
    btn.className = 'db-pos-btn' + (w === week ? ' active' : '');
    btn.textContent = 'Woche ' + w;
    btn.onclick = () => { weekByWeekState.week = w; renderWeekByWeek(); };
    sel.appendChild(btn);
  });
}

/* ---------- 2026 Season Rolling Rankings (Standings-Unterseite) ---------- */
let seasonRollingState = { season: null, week: null, compareWeek: null };

// Kumulierte Punkte + Rang je Team bis (inkl.) einer bestimmten Woche.
function cumulativeStandingsThroughWeek(season, uptoWeek) {
  const totals = {}; // teamId -> { points, wins, losses }
  for (let w = 1; w <= uptoWeek; w++) {
    (WEEKLY_SCORES[season][w] || []).forEach(e => {
      if (!totals[e.teamId]) totals[e.teamId] = { points: 0, wins: 0, losses: 0 };
      totals[e.teamId].points += e.points;
      if (e.points > e.opponentPoints) totals[e.teamId].wins++;
      else if (e.points < e.opponentPoints) totals[e.teamId].losses++;
    });
  }
  const ranked = Object.keys(totals)
    .map(teamId => ({ teamId, ...totals[teamId] }))
    .sort((a, b) => b.points - a.points);
  ranked.forEach((r, i) => { r.rank = i + 1; });
  return ranked;
}

function renderSeasonRolling() {
  const wrap = document.getElementById('seasonrollingContent');
  const seasons = Object.keys(WEEKLY_SCORES);
  const season = seasonRollingState.season || seasons[seasons.length - 1];
  const weeks = Object.keys(WEEKLY_SCORES[season] || {}).map(Number).sort((a, b) => a - b);

  if (!weeks.length) {
    wrap.innerHTML = emptyState(
      'Noch keine Saisonwerte',
      'Diese Seite zeigt die 2026 Season Rolling Rankings (kumulierte Punkte + Rang je Woche, inkl. Wochenauswahl und Vergleich). Sobald die reguläre Saison läuft und der automatische ESPN-Sync (täglich 9 & 21 Uhr) Wochenwerte liefert, füllt sie sich automatisch.',
      '📈'
    );
    return;
  }

  const week = seasonRollingState.week && weeks.includes(seasonRollingState.week) ? seasonRollingState.week : weeks[weeks.length - 1];
  const compareWeek = seasonRollingState.compareWeek && weeks.includes(seasonRollingState.compareWeek) && seasonRollingState.compareWeek < week
    ? seasonRollingState.compareWeek
    : (weeks.find(w => w < week) ?? week);
  seasonRollingState = { season, week, compareWeek };

  const teamMeta = id => LEAGUE_TEAMS.find(t => t.id === id) || { name: id, emoji: '🏈' };
  const current = cumulativeStandingsThroughWeek(season, week);
  const compare = cumulativeStandingsThroughWeek(season, compareWeek);
  const compareRankByTeam = {};
  compare.forEach(r => { compareRankByTeam[r.teamId] = r.rank; });

  const rows = current.map(r => {
    const t = teamMeta(r.teamId);
    const prevRank = compareRankByTeam[r.teamId];
    let trend = '<span style="color:var(--muted)">–</span>';
    if (prevRank !== undefined && compareWeek !== week) {
      const delta = prevRank - r.rank;
      if (delta > 0) trend = `<span style="color:var(--green)">▲ ${delta}</span>`;
      else if (delta < 0) trend = `<span style="color:var(--red)">▼ ${Math.abs(delta)}</span>`;
      else trend = '<span style="color:var(--muted)">– 0</span>';
    }
    return `<tr>
      <td>${r.rank}</td>
      <td style="text-align:left;font-weight:600">${t.emoji || ''} ${t.name}</td>
      <td><b>${r.points.toFixed(1)}</b></td>
      <td>${r.wins}-${r.losses}</td>
      <td>${trend}</td>
    </tr>`;
  }).join('');

  wrap.innerHTML = `
    <div class="db-controls">
      <div class="db-pos-filters" id="seasonRollingWeekSelector"></div>
    </div>
    <div class="info-banner">
      Kumulierte Punkte &amp; Rang durch <b>Woche ${week}</b> (Season ${season}).
      Vergleich zu <b>Woche ${compareWeek}</b>${compareWeek === week ? ' (kein früherer Wert vorhanden)' : ''} —
      wähle unten eine andere Vergleichs-Woche.
    </div>
    <div class="db-controls">
      <span style="font-size:12px;color:var(--muted);font-weight:700">Vergleich zu:</span>
      <div class="db-pos-filters" id="seasonRollingCompareSelector"></div>
    </div>
    <div class="board-table-wrap">
      <table class="board">
        <thead><tr><th class="round-label">#</th><th>Team</th><th>Punkte gesamt</th><th>W-L</th><th>Rang-Trend</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;

  const weekSel = document.getElementById('seasonRollingWeekSelector');
  weeks.forEach(w => {
    const btn = document.createElement('button');
    btn.className = 'db-pos-btn' + (w === week ? ' active' : '');
    btn.textContent = 'Woche ' + w;
    btn.onclick = () => { seasonRollingState.week = w; renderSeasonRolling(); };
    weekSel.appendChild(btn);
  });

  const cmpSel = document.getElementById('seasonRollingCompareSelector');
  weeks.filter(w => w < week).forEach(w => {
    const btn = document.createElement('button');
    btn.className = 'db-pos-btn' + (w === compareWeek ? ' active' : '');
    btn.textContent = 'Woche ' + w;
    btn.onclick = () => { seasonRollingState.compareWeek = w; renderSeasonRolling(); };
    cmpSel.appendChild(btn);
  });
}

/* ---------- Owner-Lookup (welches Team besitzt welchen Spieler) ---------- */
function ownerOfPlayer(name) {
  for (const dt of DRAFT_2026_TEAMS) {
    if (dt.keepers.some(p => p.name === name)) {
      const team = LEAGUE_TEAMS.find(t => t.name === dt.team);
      return team || { name: dt.team, emoji: '🏈' };
    }
  }
  if (typeof ROSTERS_LIVE !== 'undefined') {
    for (const teamId of Object.keys(ROSTERS_LIVE)) {
      if ((ROSTERS_LIVE[teamId] || []).some(p => p.name === name)) {
        return LEAGUE_TEAMS.find(t => t.id === teamId) || { name: teamId, emoji: '🏈' };
      }
    }
  }
  return null; // Free Agent / Best Available
}

/* ---------- Trade Analyzer ---------- */
let tradeState = { sideA: [], sideB: [] };

function openTradeAnalyzer(assetName, kind) {
  tradeState.sideA.push({ name: assetName, kind: kind || 'player' });
  navigate('trade');
  renderTrade();
}

function assetValue(asset) {
  if (asset.kind === 'pick') {
    // Format: "<Team> <Jahr> R<Runde>" -- grobe Schaetzung aus PICK_VALUES
    const m = asset.name.match(/(\d{4}) R(\d+)/);
    if (m) {
      const year = parseInt(m[1]), round = parseInt(m[2]);
      const label = round === 1 ? '1st' : round === 2 ? '2nd' : round === 3 ? '3rd' : '4th';
      const table = PICK_VALUES[label] || PICK_VALUES['4th'];
      return table[year] || table[2029] || 300;
    }
    return 500;
  }
  const p = TRADE_VALUES.find(x => x.name === asset.name);
  return p ? p.avg : 0;
}

function renderTrade() {
  const wrap = document.getElementById('tradeContent');
  wrap.innerHTML = `
    <div class="trade-cols">
      <div class="trade-col">
        <div class="section-label">Team A gibt</div>
        <input type="text" id="tradeSearchA" class="db-search" placeholder="Spieler suchen…" oninput="tradeSearch('A')">
        <div id="tradeSuggestA" class="trade-suggest"></div>
        <div id="tradeAssetsA"></div>
        <div class="trade-total" id="tradeTotalA"></div>
      </div>
      <div class="trade-col">
        <div class="section-label">Team B gibt</div>
        <input type="text" id="tradeSearchB" class="db-search" placeholder="Spieler suchen…" oninput="tradeSearch('B')">
        <div id="tradeSuggestB" class="trade-suggest"></div>
        <div id="tradeAssetsB"></div>
        <div class="trade-total" id="tradeTotalB"></div>
      </div>
    </div>
    <div id="tradeVerdict" class="info-banner" style="text-align:center;font-weight:700"></div>
    <div class="page-sub" style="margin-top:18px">Für verbesserte Trade Talks mit echten, verbindlichen Werten:</div>
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:8px">
      <a href="https://dynasty-daddy.com/trade-calculator" target="_blank" rel="noopener" class="theme-toggle" style="text-decoration:none;display:inline-block">🔗 Dynasty Daddy Trade Calculator</a>
      <a href="https://keeptradecut.com/trade-calculator" target="_blank" rel="noopener" class="theme-toggle" style="text-decoration:none;display:inline-block">🔗 KeepTradeCut Trade Calculator</a>
    </div>
  `;
  renderTradeAssets();
}

function tradeSearch(side) {
  const q = document.getElementById('tradeSearch' + side).value.trim().toLowerCase();
  const box = document.getElementById('tradeSuggest' + side);
  if (!q) { box.innerHTML = ''; box.style.display = 'none'; return; }
  const results = TRADE_VALUES.filter(p => p.name.toLowerCase().includes(q)).slice(0, 8);
  box.style.display = results.length ? 'block' : 'none';
  box.innerHTML = results.map(p => `
    <div class="trade-suggest-item" onclick="addTradeAsset('${side}','${escapeJs(p.name)}')">
      ${p.name} <span style="color:var(--muted)">${p.team} ${p.pos} · ${p.avg}</span>
    </div>`).join('');
}

function addTradeAsset(side, name) {
  tradeState['side' + side].push({ name, kind: 'player' });
  document.getElementById('tradeSearch' + side).value = '';
  document.getElementById('tradeSuggest' + side).style.display = 'none';
  renderTradeAssets();
}

function removeTradeAsset(side, idx) {
  tradeState['side' + side].splice(idx, 1);
  renderTradeAssets();
}

function renderTradeAssets() {
  ['A', 'B'].forEach(side => {
    const list = tradeState['side' + side];
    const el = document.getElementById('tradeAssets' + side);
    el.innerHTML = list.map((a, i) => `
      <div class="trade-chip">
        <span>${a.name}</span>
        <span style="color:var(--muted)">${assetValue(a)}</span>
        <button onclick="removeTradeAsset('${side}',${i})">✕</button>
      </div>`).join('') || '<div class="page-sub" style="margin:6px 0">Noch nichts hinzugefügt.</div>';
    const total = list.reduce((s, a) => s + assetValue(a), 0);
    document.getElementById('tradeTotal' + side).textContent = `Gesamtwert: ${total.toLocaleString('de-DE')}`;
  });

  const totalA = tradeState.sideA.reduce((s, a) => s + assetValue(a), 0);
  const totalB = tradeState.sideB.reduce((s, a) => s + assetValue(a), 0);
  const verdict = document.getElementById('tradeVerdict');
  if (!totalA && !totalB) {
    verdict.textContent = 'Spieler zu beiden Seiten hinzufügen, um den Trade zu bewerten.';
  } else {
    const diff = Math.abs(totalA - totalB);
    const pct = Math.round(diff / Math.max(totalA, totalB, 1) * 100);
    if (pct <= 8) {
      verdict.innerHTML = `✅ Fairer Trade (Unterschied ${pct}%)`;
    } else {
      const favored = totalA > totalB ? 'Team A' : 'Team B';
      verdict.innerHTML = `⚖️ Begünstigt ${favored} (Unterschied ${pct}%, ${diff.toLocaleString('de-DE')} Punkte)`;
    }
  }
}

/* ---------- Future Draft Boards ---------- */
let futureBoardsState = { year: 2027 };

function showFutureBoards() { navigate('futureboards'); renderFutureBoards(); }

function renderFutureBoards() {
  const wrap = document.getElementById('futureboardsContent');
  const years = Object.keys(FUTURE_PICKS).map(Number).sort();
  const year = futureBoardsState.year;
  const rounds = ['1st', '2nd', '3rd', '4th', '5th'];
  const teams = LEAGUE_TEAMS;

  const overrides = {}; // "team|round" -> owner team name
  (FUTURE_PICKS[year] || []).forEach(p => { overrides[`${p.from}|${p.round}`] = p.owner; });

  let head = `<tr><th class="round-label">Runde</th>` + teams.map(t => `<th>${t.name}</th>`).join('') + `</tr>`;
  let rows = '';
  rounds.forEach(r => {
    rows += `<tr><th class="round-label">${r}</th>`;
    teams.forEach(t => {
      const owner = overrides[`${t.name}|${r}`];
      const pickLabel = `${t.name} ${year} ${r}`;
      if (owner) {
        const ownerTeam = teams.find(x => x.name === owner);
        rows += `<td><div class="cell-keeper" onclick="openTradeAnalyzer('${escapeJs(pickLabel)}','pick')">${ownerTeam ? ownerTeam.emoji : ''} ${owner}<small>via ${t.name}</small></div></td>`;
      } else {
        rows += `<td><div class="cell-open" onclick="openTradeAnalyzer('${escapeJs(pickLabel)}','pick')">Own</div></td>`;
      }
    });
    rows += `</tr>`;
  });

  wrap.innerHTML = `
    <div class="db-controls"><div class="db-pos-filters" id="futureYearSelector"></div></div>
    <div class="info-banner">
      "Own" = Team besitzt diesen Pick noch selbst. Nur tatsächlich getradete Picks sind hervorgehoben
      (mit Angabe, von wem sie ursprünglich kamen). Klick auf eine Zelle öffnet den Trade Analyzer.
      Runden 1–5 gezeigt (weitere Runden erst relevant, sobald mehr getradet wird).
    </div>
    <div class="board-table-wrap"><table class="board board-compact"><thead>${head}</thead><tbody>${rows}</tbody></table></div>
  `;
  const sel = document.getElementById('futureYearSelector');
  years.forEach(y => {
    const btn = document.createElement('button');
    btn.className = 'db-pos-btn' + (y === year ? ' active' : '');
    btn.textContent = y;
    btn.onclick = () => { futureBoardsState.year = y; renderFutureBoards(); };
    sel.appendChild(btn);
  });
}

/* ---------- Player Rankings & Projections (gemeinsame Basis) ---------- */
let playerBoardState = { rankings: { posFilter: 'ALL', search: '', bestAvailable: false },
                          projections: { posFilter: 'ALL', search: '', bestAvailable: false } };

function showPlayerRankings() { navigate('playerrankings'); renderPlayerRankings(); }
function showPlayerProjections() { navigate('playerprojections'); renderPlayerProjections(); }

function renderPlayerBoardControls(prefix, state) {
  return `
    <div class="db-controls">
      <input type="text" id="${prefix}Search" placeholder="Spieler suchen…" class="db-search" value="${state.search}" oninput="onPlayerBoardChange('${prefix}')">
      <div class="db-pos-filters" id="${prefix}PosFilters"></div>
      <label style="display:flex;align-items:center;gap:6px;font-size:12px;color:var(--muted);cursor:pointer">
        <input type="checkbox" id="${prefix}BestAvail" ${state.bestAvailable ? 'checked' : ''} onchange="onPlayerBoardChange('${prefix}')">
        Nur Best Available
      </label>
    </div>`;
}

function wirePlayerBoardControls(prefix, state, rerender) {
  const posBar = document.getElementById(prefix + 'PosFilters');
  ['ALL', 'QB', 'RB', 'WR', 'TE'].forEach(p => {
    const btn = document.createElement('button');
    btn.className = 'db-pos-btn' + (p === state.posFilter ? ' active' : '');
    btn.textContent = p;
    btn.onclick = () => { state.posFilter = p; rerender(); };
    posBar.appendChild(btn);
  });
}

function onPlayerBoardChange(prefix) {
  const key = prefix === 'pr' ? 'rankings' : 'projections';
  const state = playerBoardState[key];
  state.search = document.getElementById(prefix + 'Search').value;
  state.bestAvailable = document.getElementById(prefix + 'BestAvail').checked;
  if (prefix === 'pr') renderPlayerRankings(); else renderPlayerProjections();
}

function renderPlayerRankings() {
  const wrap = document.getElementById('playerrankingsContent');
  const state = playerBoardState.rankings;
  const stats = (typeof PLAYER_SEASON_STATS !== 'undefined') ? PLAYER_SEASON_STATS.players : [];

  if (!stats.length) {
    wrap.innerHTML = emptyState(
      'Noch keine Saisondaten',
      'Player Rankings bauen sich automatisch aus den tatsächlich erzielten Punkten je Woche auf (scripts/sync-espn-player-stats.js, gleicher Rhythmus wie Weekly Scores). Vor Woche 1 gibt es hier naturgemäß noch nichts zu zeigen.',
      '📊'
    );
    return;
  }

  wrap.innerHTML = renderPlayerBoardControls('pr', state) + `
    <div class="board-table-wrap">
      <table class="board db-table">
        <thead><tr><th>#</th><th>Spieler</th><th>Pos</th><th>Team-Besitz</th><th>Ø Punkte</th><th>Gesamt</th><th>Spiele</th></tr></thead>
        <tbody id="prBody"></tbody>
      </table>
    </div>`;
  wirePlayerBoardControls('pr', state, renderPlayerRankings);

  let rows = stats.filter(p => state.posFilter === 'ALL' || p.pos === state.posFilter);
  if (state.search.trim()) rows = rows.filter(p => p.name.toLowerCase().includes(state.search.trim().toLowerCase()));
  if (state.bestAvailable) rows = rows.filter(p => !ownerOfPlayer(p.name));
  rows = rows.slice().sort((a, b) => b.avgPoints - a.avgPoints).slice(0, 300);

  document.getElementById('prBody').innerHTML = rows.map((p, i) => {
    const owner = ownerOfPlayer(p.name);
    return `<tr>
      <td>${i + 1}</td>
      <td style="text-align:left;font-weight:600">${p.name}</td>
      <td>${p.pos}</td>
      <td>${owner ? `${owner.emoji || ''} ${owner.name}` : '<span style="color:var(--green)">Free Agent</span>'}</td>
      <td><b>${p.avgPoints}</b></td>
      <td>${p.totalPoints}</td>
      <td>${p.gamesPlayed}</td>
    </tr>`;
  }).join('');
}

function renderPlayerProjections() {
  const wrap = document.getElementById('playerprojectionsContent');
  const state = playerBoardState.projections;
  const players = (typeof PLAYER_PROJECTIONS !== 'undefined') ? PLAYER_PROJECTIONS.players : [];

  if (!players.length) {
    wrap.innerHTML = emptyState(
      'Noch keine Projektionen geladen',
      'Läuft automatisch über scripts/sync-espn-projections.js (ESPN-Saisonprojektionen). Einmal manuell ausführen oder auf den nächsten automatischen Sync warten.',
      '🔮'
    );
    return;
  }

  wrap.innerHTML = renderPlayerBoardControls('pp', state) + `
    <div class="board-table-wrap">
      <table class="board db-table">
        <thead><tr><th>#</th><th>Spieler</th><th>Pos</th><th>Team-Besitz</th><th>Projizierte Punkte (Saison)</th></tr></thead>
        <tbody id="ppBody"></tbody>
      </table>
    </div>`;
  wirePlayerBoardControls('pp', state, renderPlayerProjections);

  let rows = players.filter(p => state.posFilter === 'ALL' || p.pos === state.posFilter);
  if (state.search.trim()) rows = rows.filter(p => p.name.toLowerCase().includes(state.search.trim().toLowerCase()));
  if (state.bestAvailable) rows = rows.filter(p => !ownerOfPlayer(p.name));
  rows = rows.slice().sort((a, b) => b.projectedPoints - a.projectedPoints).slice(0, 300);

  document.getElementById('ppBody').innerHTML = rows.map((p, i) => {
    const owner = ownerOfPlayer(p.name);
    return `<tr>
      <td>${i + 1}</td>
      <td style="text-align:left;font-weight:600">${p.name}</td>
      <td>${p.pos}</td>
      <td>${owner ? `${owner.emoji || ''} ${owner.name}` : '<span style="color:var(--green)">Free Agent</span>'}</td>
      <td><b>${p.projectedPoints}</b></td>
    </tr>`;
  }).join('');
}

/* ---------- Trade History ---------- */
function renderTradeHistory() {
  const wrap = document.getElementById('tradehistoryContent');
  if (!TRADES.length) {
    wrap.innerHTML = emptyState('Noch keine Trades erfasst', 'Bislang wurden keine Picks getradet.');
    return;
  }
  const teamEmoji = name => (LEAGUE_TEAMS.find(t => t.name === name) || {}).emoji || '🏈';

  wrap.innerHTML = `
    <div class="info-banner">
      ESPN führt in unserer Liga keine Draft-Picks für 2027 und später. Trades mit solchen Picks
      werden deshalb hier von Hand nachgetragen (siehe <code>data/trades.js</code>).
    </div>
    <div class="section-label">Chronik</div>
    ${TRADES.map(t => `
      <div class="player-row" style="align-items:flex-start;flex-direction:column;gap:6px;padding:14px;">
        <div style="font-size:11px;color:var(--muted);font-weight:700">${formatTradeDate(t.date)}</div>
        <div style="display:flex;gap:18px;flex-wrap:wrap;width:100%">
          <div style="flex:1;min-width:200px">
            <div style="font-weight:800;margin-bottom:4px">${teamEmoji(t.teamA)} ${t.teamA} gibt:</div>
            ${t.teamAGives.map(a => `<div class="player-team">• ${a}</div>`).join('')}
          </div>
          <div style="flex:1;min-width:200px">
            <div style="font-weight:800;margin-bottom:4px">${teamEmoji(t.teamB)} ${t.teamB} gibt:</div>
            ${t.teamBGives.map(a => `<div class="player-team">• ${a}</div>`).join('')}
          </div>
        </div>
      </div>
    `).join('')}
    <div class="page-sub" style="margin-top:10px">Wer aktuell welchen Zukunfts-Pick besitzt, steht auf der Seite <b>Future Draft Boards</b> (2027–2029).</div>
  `;
}

function formatTradeDate(iso) {
  const d = new Date(iso + 'T12:00:00');
  return d.toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' });
}

document.addEventListener('DOMContentLoaded', () => {
  updateThemeBtn();
  renderHome();
  navigate('home');
});

/* ---------- PWA Install ---------- */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js').catch(() => {});
  });
}
let _pwaDeferredPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  _pwaDeferredPrompt = e;
  const btn = document.getElementById('pwaInstallBtn');
  if (btn) btn.style.display = '';
});
function pwaInstallApp() {
  if (!_pwaDeferredPrompt) return;
  _pwaDeferredPrompt.prompt();
  _pwaDeferredPrompt.userChoice.finally(() => {
    _pwaDeferredPrompt = null;
    const btn = document.getElementById('pwaInstallBtn');
    if (btn) btn.style.display = 'none';
  });
}
window.addEventListener('appinstalled', () => {
  _pwaDeferredPrompt = null;
  const btn = document.getElementById('pwaInstallBtn');
  if (btn) btn.style.display = 'none';
});
(function () {
  const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isStandalone = window.navigator.standalone === true ||
    window.matchMedia('(display-mode: standalone)').matches;
  if (isIos && !isStandalone) {
    const btn = document.getElementById('pwaIosHintBtn');
    if (btn) btn.style.display = '';
  }
})();
function pwaShowIosSteps() {
  alert('📲 Teilen-Symbol tippen → "Zum Home-Bildschirm"');
}
