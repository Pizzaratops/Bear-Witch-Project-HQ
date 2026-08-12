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

/* ---------- Rolling Rankings ---------- */
function renderRolling() {
  const wrap = document.getElementById('rollingContent');
  const latest = DYNASTY_ROLLING[DYNASTY_ROLLING.length - 1];
  const prev = DYNASTY_ROLLING.length > 1 ? DYNASTY_ROLLING[DYNASTY_ROLLING.length - 2] : null;

  const prevRankByName = {};
  if (prev) prev.rankings.forEach((p, i) => { prevRankByName[p.name] = i + 1; });

  const rows = latest.rankings.slice(0, 150).map((p, i) => {
    const curRank = i + 1;
    let trendHtml = '<span style="color:var(--muted)">—</span>';
    if (prev) {
      const prevRank = prevRankByName[p.name];
      if (prevRank == null) {
        trendHtml = '<span style="color:var(--accent2)">NEU</span>';
      } else {
        const diff = prevRank - curRank; // positiv = aufgestiegen
        if (diff > 0) trendHtml = `<span style="color:var(--green)">▲ ${diff}</span>`;
        else if (diff < 0) trendHtml = `<span style="color:var(--red)">▼ ${Math.abs(diff)}</span>`;
        else trendHtml = '<span style="color:var(--muted)">–</span>';
      }
    }
    return `<tr><td>${curRank}</td><td style="text-align:left;font-weight:600">${p.name}</td><td>${p.pos}</td><td>${trendHtml}</td></tr>`;
  }).join('');

  wrap.innerHTML = `
    <div class="info-banner">
      Snapshot: <b>${latest.label}</b> (${latest.date}). ${DYNASTY_ROLLING.length} Snapshot${DYNASTY_ROLLING.length === 1 ? '' : 's'} insgesamt.
      ${!prev ? 'Trend erscheint automatisch, sobald mindestens 2 Snapshots vorhanden sind (z.B. sobald 2025er-Rankings ergänzt oder ein neuer Snapshot per <code>node scripts/snapshot-dynasty-rolling.js</code> angelegt wird).' : `Vergleich zu vorherigem Snapshot "${prev.label}" (${prev.date}).`}
    </div>
    <div class="board-table-wrap">
      <table class="board">
        <thead><tr><th class="round-label">#</th><th>Spieler</th><th>Pos</th><th>Trend</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
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
