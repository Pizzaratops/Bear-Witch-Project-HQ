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
  'home', 'roster', 'dues', 'draftboard', 'keepers', 'dynastyboard', 'rolling', 'teamaverages', 'weekbyweek',
  'playerrankings', 'playerprojections', 'nflteams', 'nflteamdetail', 'futureboards',
  'standings', 'leaguehistory', 'seasonrolling', 'nflrankings', 'matchups', 'trade', 'tradehistory'
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

  // Echter Browser-History-Eintrag pro Navigation, damit der Zurueck-
  // Button (Handy-Geste oder Browser) INNERHALB der App zurueckgeht,
  // statt die ganze Seite zu verlassen. _suppressHistoryPush wird beim
  // Reagieren auf einen "popstate" (= Zurueck wurde gedrueckt) gesetzt,
  // damit dabei kein neuer Eintrag entsteht.
  if (!_suppressHistoryPush) {
    const teamId = opts && opts.teamId;
    const nflCode = opts && opts.nflCode;
    let hash = pageId;
    if (pageId === 'roster' && teamId) hash = `roster-${teamId}`;
    else if (pageId === 'nflteamdetail' && nflCode) hash = `nflteam-${nflCode}`;
    if (location.hash.slice(1) !== hash) {
      history.pushState({ pageId, teamId: teamId || null, nflCode: nflCode || null }, '', '#' + hash);
    }
  }
}

let _suppressHistoryPush = false;

const ROUTE_HANDLERS = {
  home: () => goHome(),
  roster: (teamId) => showRoster(teamId),
  draftboard: () => showDraftboard(),
  keepers: () => showKeepers(),
  dynastyboard: () => showDynastyBoard(),
  rolling: () => showRolling(),
  teamaverages: () => showTeamAverages(),
  weekbyweek: () => showWeekByWeek(),
  playerrankings: () => showPlayerRankings(),
  playerprojections: () => showPlayerProjections(),
  nflteams: () => showNFLTeams(),
  nflteamdetail: (teamId, nflCode) => nflCode ? showNFLTeam(nflCode) : showNFLTeams(),
  futureboards: () => showFutureBoards(),
  standings: () => showStandings(),
  leaguehistory: () => showLeagueHistory(),
  seasonrolling: () => showSeasonRolling(),
  nflrankings: () => showNflRankings(),
  matchups: () => showMatchups(),
  trade: () => showTrade(),
  tradehistory: () => showTradeHistory(),
};

function _routeTo(pageId, teamId, nflCode) {
  _suppressHistoryPush = true;
  try {
    (ROUTE_HANDLERS[pageId] || ROUTE_HANDLERS.home)(teamId, nflCode);
  } finally {
    _suppressHistoryPush = false;
  }
}

window.addEventListener('popstate', (e) => {
  const state = e.state;
  if (state && state.pageId) {
    _routeTo(state.pageId, state.teamId, state.nflCode);
  } else {
    _routeTo('home', null, null);
  }
});

/* Direktlink beim ersten Laden unterstuetzen (z.B. #draftboard in der
   URL), sonst normal auf Home starten. Ersetzt den allerersten History-
   Eintrag, damit "Zurueck" ab dort sauber funktioniert. */
function _initialRoute() {
  const hash = location.hash.slice(1);
  let pageId = 'home', teamId = null, nflCode = null;
  if (hash.startsWith('roster-')) { pageId = 'roster'; teamId = hash.slice(7); }
  else if (hash.startsWith('nflteam-')) { pageId = 'nflteamdetail'; nflCode = hash.slice(8); }
  else if (hash && ROUTE_HANDLERS[hash]) { pageId = hash; }
  history.replaceState({ pageId, teamId, nflCode }, '', hash ? '#' + hash : '#home');
  _routeTo(pageId, teamId, nflCode);
}

function goHome() { navigate('home'); renderHome(); }
function showRoster(teamId) { navigate('roster', { teamId }); }
function showDues() { navigate('dues'); renderDues(); }
function showDraftboard() { navigate('draftboard'); renderDraftboard(); }
function showKeepers() { navigate('keepers'); renderKeepers(); }
function showDynastyBoard() { navigate('dynastyboard'); renderDynastyBoard(); }
function showRolling() { navigate('rolling'); renderRolling(); }
function showTeamAverages() { navigate('teamaverages'); renderTeamAverages(); }
function showWeekByWeek() { navigate('weekbyweek'); renderWeekByWeek(); }
function showStandings() { navigate('standings'); renderStandings(); }
function showLeagueHistory() { navigate('leaguehistory'); renderLeagueHistory(); }
function showSeasonRolling() { navigate('seasonrolling'); renderSeasonRolling(); }
function showNflRankings() { navigate('nflrankings'); renderNflRankings(); }
function showMatchups() { navigate('matchups'); renderMatchups(); }
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
  renderCountdowns();
  const grid = document.getElementById('homeTeamGrid');
  grid.innerHTML = LEAGUE_TEAMS.map(t => {
    const keeperCount = (DRAFT_2026_TEAMS.find(dt => dt.team === t.name) || { keepers: [] }).keepers.length;
    return `
      <div class="team-card" onclick="showRoster('${t.id}')">
        <span class="team-emoji">${t.emoji}</span>
        <div class="team-name">${t.name}</div>
        ${t.owner ? `<div class="team-owner">${t.owner}</div>` : ''}
        <div class="team-meta">${keeperCount} Keeper gemeldet</div>
      </div>`;
  }).join('');
}

/* ---------- Countdowns (Keeper Lock + Draft Day) ---------- */
let _countdownInterval = null;

function _countdownParts(targetIso) {
  const diff = new Date(targetIso).getTime() - Date.now();
  if (diff <= 0) return null;
  const totalSec = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSec / 86400),
    hours: Math.floor((totalSec % 86400) / 3600),
    minutes: Math.floor((totalSec % 3600) / 60),
    seconds: totalSec % 60,
  };
}

function renderCountdowns() {
  const host = document.getElementById('homeCountdowns');
  if (!host) return;
  host.innerHTML = `
    <div class="countdown-card" id="cdKeeper">
      <div class="countdown-label">🔒 Keeper Lock Date</div>
      <div class="countdown-timer" id="cdKeeperTimer"></div>
      <div class="countdown-date">${_formatCountdownTarget(KEEPER_LOCK_DATE)}</div>
    </div>
    <div class="countdown-card" id="cdDraft">
      <div class="countdown-label">📋 Draft Day</div>
      <div class="countdown-timer" id="cdDraftTimer"></div>
      <div class="countdown-date">${_formatCountdownTarget(DRAFT_DATE)}</div>
    </div>
  `;
  _tickCountdowns();
  if (_countdownInterval) clearInterval(_countdownInterval);
  _countdownInterval = setInterval(_tickCountdowns, 1000);
}

function _formatCountdownTarget(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: 'long', year: 'numeric' }) +
    ', ' + d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) + ' Uhr';
}

function _tickCountdowns() {
  const keeperEl = document.getElementById('cdKeeperTimer');
  const draftEl = document.getElementById('cdDraftTimer');
  // Wenn die Home-Seite nicht mehr sichtbar ist, Interval stoppen statt
  // sinnlos im Hintergrund weiterzulaufen.
  if (!keeperEl && !draftEl) {
    if (_countdownInterval) { clearInterval(_countdownInterval); _countdownInterval = null; }
    return;
  }
  if (keeperEl) keeperEl.innerHTML = _renderCountdownParts(_countdownParts(KEEPER_LOCK_DATE));
  if (draftEl) draftEl.innerHTML = _renderCountdownParts(_countdownParts(DRAFT_DATE));
}

function _renderCountdownParts(parts) {
  if (!parts) return `<span class="countdown-done">🏁 Vorbei</span>`;
  const seg = (val, label) => `<span class="countdown-seg"><b>${val}</b><small>${label}</small></span>`;
  return seg(parts.days, 'Tage') + seg(parts.hours, 'Std') + seg(parts.minutes, 'Min') + seg(parts.seconds, 'Sek');
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
  document.getElementById('rosterSub').textContent = team.owner ? `Owner: ${team.owner}` : 'Kader-Übersicht';

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

  wrap.innerHTML = html + renderTeamPicksSection(team, draftTeam);
}

function renderTeamPicksSection(team, draftTeam) {
  const teamsById = LEAGUE_TEAMS.reduce((m, t) => { m[t.name] = t; return m; }, {});
  const tradedOverrides = {};
  (typeof TRADED_PICKS_2026 !== 'undefined' ? TRADED_PICKS_2026 : []).forEach(p => {
    tradedOverrides[`${p.from}|${p.round}`] = p.owner;
  });

  const k = draftTeam ? draftTeam.keepers.length : 0;
  const startRound = TOTAL_DRAFT_ROUNDS - k + 1;

  const rounds2026 = [];
  for (let round = 1; round <= TOTAL_DRAFT_ROUNDS; round++) {
    const tradedOwner = tradedOverrides[`${team.name}|${round}`];
    let label, kind, own, assetName;
    if (round >= startRound) {
      const player = draftTeam.keepers[round - startRound];
      label = player.tentative ? `(${player.name})` : player.name; kind = 'player'; own = false; assetName = player.name;
    } else if (tradedOwner) {
      const ownerEmoji = teamsById[tradedOwner] ? teamsById[tradedOwner].emoji : '';
      label = `${ownerEmoji} ${tradedOwner}`; kind = 'pick'; own = false;
    } else {
      label = 'Own'; kind = 'pick'; own = true;
    }
    const pickLabel = kind === 'pick' ? `${team.name} 2026 R${round}` : assetName;
    rounds2026.push({ round, label, kind, own, pickLabel });
  }

  const years = [2027, ...Object.keys(FUTURE_PICKS).map(Number).filter(y => y !== 2027)].sort();
  const futureCounts = years.map(y => ({ year: y, n: (_picksHeldByTeam(y)[team.name]) ?? 5 }));

  return `
    <div class="section-label">📦 Meine Picks</div>
    <div class="team-picks-layout">
      <div class="team-picks-2026">
        <div style="font-size:11px;font-weight:700;color:var(--muted);margin-bottom:8px;text-transform:uppercase;letter-spacing:.5px">2026 Draft (15 Runden)</div>
        ${rounds2026.map(r => `
          <div class="team-pick-chip ${r.own ? 'cell-open' : 'cell-keeper'}" onclick="openTradeAnalyzer('${escapeJs(r.pickLabel)}','${r.kind}')">
            <span>R${r.round}</span><span>${r.label}</span>
          </div>`).join('')}
      </div>
      <div class="team-picks-future">
        <div style="font-size:11px;font-weight:700;color:var(--muted);margin-bottom:8px;text-transform:uppercase;letter-spacing:.5px">Zukünftige Picks (Runde 1–5 je Jahr)</div>
        ${futureCounts.map(({ year, n }) => {
          const diff = n - 5;
          const diffHtml = diff > 0 ? `<span style="color:var(--green)">(+${diff})</span>` : diff < 0 ? `<span style="color:var(--red)">(${diff})</span>` : '';
          return `<div class="team-pick-future-row"><span>${year}</span><b>${n} Picks</b> ${diffHtml}</div>`;
        }).join('')}
        <div class="page-sub" style="margin-top:8px;font-size:11px">Details & Trades: <b>Future Draft Boards</b></div>
      </div>
    </div>
  `;
}

function playerRowHtml(p, round, isKeeperBadge) {
  const nameHtml = p.tentative ? `(${p.name})` : p.name;
  return `
    <div class="player-row">
      ${round ? `<div class="player-round">R${round}</div>` : (isKeeperBadge === undefined ? '' : `<div class="player-round" style="opacity:.35">—</div>`)}
      <div class="player-name" style="${p.tentative ? 'opacity:.7;font-style:italic' : ''}">${nameHtml}${isKeeperBadge ? ' 🔒' : ''}${p.tentative ? ' <span class="tentative-tag">vsl.</span>' : ''}</div>
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
  const teamsById = LEAGUE_TEAMS.reduce((m, t) => { m[t.name] = t; return m; }, {});

  wrap.innerHTML = `<div class="keeper-grid">` + DRAFT_2026_TEAMS.map(dt => {
    const rounds = computeKeeperRounds(dt.keepers.length);
    const t = teamsById[dt.team] || {};
    return `
      <div class="keeper-card">
        <div class="keeper-card-header">
          <span>${t.emoji || '🏈'} ${dt.team}${t.owner ? ` <span class="owner-tag" style="font-size:11px">(${t.owner})</span>` : ''}</span>
          <span class="keeper-card-count">${dt.keepers.length}/${MAX_KEEPERS}</span>
        </div>
        ${dt.keepers.map((p, i) => `
          <div class="keeper-card-row">
            <span class="keeper-card-round">R${rounds[i]}</span>
            <span class="keeper-card-name"${p.tentative ? ' style="opacity:.7;font-style:italic"' : ''}>${p.tentative ? `(${p.name})` : p.name}${p.tentative ? ' <span class="tentative-tag">vsl.</span>' : ''}</span>
            <span class="keeper-card-meta">${p.nfl} · ${p.pos}${p.status ? ` · <span class="player-status ${p.status}">${p.status}</span>` : ''}</span>
          </div>`).join('')}
      </div>`;
  }).join('') + `</div>`;
}

/* Sehr hochaufgeloester Screenshot der kompletten Keeper-Übersicht
   (alle Team-Karten, auch was gerade nicht im Viewport sichtbar ist),
   mit kleinem Branding-Header oben drauf. scale:3 fuer "very high
   quality" -- html2canvas rendert den kompletten #keepersContent-Baum,
   nicht nur den sichtbaren Ausschnitt. */
async function downloadKeeperScreenshot() {
  const btn = document.getElementById('keeperScreenshotBtn');
  const orig = btn.textContent;
  if (typeof html2canvas !== 'function') { alert('html2canvas Library nicht geladen.'); return; }
  btn.textContent = '⏳ Erstelle...'; btn.disabled = true;

  const isLight = document.body.classList.contains('light');
  const bg = isLight ? '#faf6f1' : '#0a0f1c';
  const accent = isLight ? '#cf7a48' : '#e0794a';
  const muted = isLight ? '#93877a' : '#8a93ac';

  try {
    const target = document.getElementById('keepersContent');
    const canvas = await html2canvas(target, {
      backgroundColor: bg,
      scale: 3,
      logging: false,
      useCORS: true,
      onclone: (clonedDoc) => {
        const clonedTarget = clonedDoc.getElementById('keepersContent');
        if (!clonedTarget) return;
        const header = clonedDoc.createElement('div');
        header.style.cssText = 'padding:6px 4px 26px;text-align:center;';
        header.innerHTML = `
          <div style="font-family:'Playfair Display',serif;font-size:28px;font-weight:800;color:${accent}">🐻 Bear Witch Project HQ</div>
          <div style="font-size:13px;color:${muted};margin-top:4px;font-family:'DM Sans',sans-serif;">Keeper-Übersicht · Stand ${new Date().toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })}</div>
        `;
        clonedTarget.parentNode.insertBefore(header, clonedTarget);
      },
    });
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `bwp-keeper-uebersicht-${new Date().toISOString().split('T')[0]}.png`;
    link.click();
    btn.textContent = '✓ Gespeichert!';
  } catch (err) {
    console.error('Keeper-Screenshot fehlgeschlagen:', err);
    alert('Fehler beim Erstellen: ' + err.message);
  } finally {
    setTimeout(() => { btn.textContent = orig; btn.disabled = false; }, 1500);
  }
}

/* ---------- Draft Board ---------- */
function renderDraftboard() {
  const wrap = document.getElementById('draftboardContent');
  const teamsById = LEAGUE_TEAMS.reduce((m, t) => { m[t.name] = t; return m; }, {});
  const draftById = DRAFT_2026_TEAMS.reduce((m, t) => { m[t.team] = t; return m; }, {});

  // Spaltenreihenfolge = echte, vom Liga-Owner bestaetigte Draft-Order
  // (linear, reward-the-bottom). Fallback auf DRAFT_2026_TEAMS-Reihenfolge,
  // falls DRAFT_ORDER_2026 mal fehlen sollte.
  const order = (typeof DRAFT_ORDER_2026 !== 'undefined' && DRAFT_ORDER_2026.length)
    ? DRAFT_ORDER_2026 : DRAFT_2026_TEAMS.map(t => t.team);
  const teams = order.map(name => draftById[name]).filter(Boolean);

  const tradedOverrides = {}; // "team|round" -> owner team name
  (typeof TRADED_PICKS_2026 !== 'undefined' ? TRADED_PICKS_2026 : []).forEach(p => {
    tradedOverrides[`${p.from}|${p.round}`] = p.owner;
  });
  const tradedCount = Object.keys(tradedOverrides).length;
  const hasOrder = typeof DRAFT_ORDER_2026 !== 'undefined' && DRAFT_ORDER_2026.length;

  let head = `<tr><th class="round-label">Runde</th>` +
    teams.map((t, i) => {
      const meta = teamsById[t.team] || {};
      const slot = hasOrder ? `<small style="display:block;font-weight:400;opacity:.75">Pick ${i + 1}</small>` : '';
      const owner = meta.owner ? `<small style="display:block;font-weight:400;opacity:.6">${meta.owner}</small>` : '';
      return `<th>${t.team}${slot}${owner}</th>`;
    }).join('') + `</tr>`;

  let rows = '';
  for (let round = 1; round <= TOTAL_DRAFT_ROUNDS; round++) {
    rows += `<tr><th class="round-label">R${round}</th>`;
    teams.forEach((t, i) => {
      const k = t.keepers.length;
      const startRound = TOTAL_DRAFT_ROUNDS - k + 1;
      const tradedOwner = tradedOverrides[`${t.team}|${round}`];
      const pickNum = hasOrder ? `${round}.${String(i + 1).padStart(2, '0')}` : `R${round}`;
      if (round >= startRound) {
        const player = t.keepers[round - startRound];
        rows += `<td><div class="cell-keeper" onclick="openTradeAnalyzer('${escapeJs(player.name)}')">${player.tentative ? `(${player.name})` : player.name}${player.tentative ? ' <small style="display:inline">vsl.</small>' : ''}<small>${player.nfl} · ${player.pos}</small></div></td>`;
      } else if (tradedOwner) {
        const ownerTeam = teamsById[tradedOwner] || {};
        rows += `<td><div class="cell-keeper" onclick="openTradeAnalyzer('${escapeJs(t.team)} 2026 R${round}', 'pick')">${ownerTeam.emoji || ''} ${tradedOwner}<small>via ${t.team} · Pick ${pickNum}</small></div></td>`;
      } else {
        rows += `<td><div class="cell-open" onclick="openTradeAnalyzer('${escapeJs(t.team)} 2026 R${round}', 'pick')">Own<small>Pick ${pickNum}</small></div></td>`;
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
      ${hasOrder ? 'Draft ist <b>linear</b> (kein Snake) — dieselbe Reihenfolge in jeder Runde, Vorjahres-Champion pickt zuletzt.' : 'Die konkrete Pick-Reihenfolge (Slot 1–12) je Runde steht noch nicht fest.'}
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

/* Sehr hochaufgeloester Screenshot des kompletten Draft Boards (alle 15
   Runden x 12 Teams, auch der Teil, der gerade nur per Scroll sichtbar
   waere), mit Branding-Header. scale:3 fuer HD-Qualitaet. */
async function downloadDraftboardScreenshot() {
  const btn = document.getElementById('draftboardScreenshotBtn');
  const orig = btn.textContent;
  if (typeof html2canvas !== 'function') { alert('html2canvas Library nicht geladen.'); return; }
  btn.textContent = '⏳ Erstelle...'; btn.disabled = true;

  const isLight = document.body.classList.contains('light');
  const bg = isLight ? '#faf6f1' : '#0a0f1c';
  const accent = isLight ? '#cf7a48' : '#e0794a';
  const muted = isLight ? '#93877a' : '#8a93ac';

  try {
    const target = document.getElementById('draftboardContent');
    const canvas = await html2canvas(target, {
      backgroundColor: bg,
      scale: 3,
      logging: false,
      useCORS: true,
      onclone: (clonedDoc) => {
        const clonedTarget = clonedDoc.getElementById('draftboardContent');
        if (!clonedTarget) return;
        const header = clonedDoc.createElement('div');
        header.style.cssText = 'padding:6px 4px 22px;text-align:center;';
        header.innerHTML = `
          <div style="font-family:'Playfair Display',serif;font-size:28px;font-weight:800;color:${accent}">🐻 Bear Witch Project HQ</div>
          <div style="font-size:13px;color:${muted};margin-top:4px;font-family:'DM Sans',sans-serif;">Draft Board 2026 · Stand ${new Date().toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })}</div>
        `;
        clonedTarget.parentNode.insertBefore(header, clonedTarget);
        // Tabelle darf im Screenshot ihre volle Breite einnehmen, statt
        // sich an den (evtl. schmalen) Viewport zu halten.
        const wrap = clonedTarget.querySelector('.board-table-wrap');
        if (wrap) wrap.style.overflow = 'visible';
      },
    });
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `bwp-draftboard-2026-${new Date().toISOString().split('T')[0]}.png`;
    link.click();
    btn.textContent = '✓ Gespeichert!';
  } catch (err) {
    console.error('Draftboard-Screenshot fehlgeschlagen:', err);
    alert('Fehler beim Erstellen: ' + err.message);
  } finally {
    setTimeout(() => { btn.textContent = orig; btn.disabled = false; }, 1500);
  }
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

/* ---------- Team-Schnitt (Ø Dynasty-Ranking je Team) ---------- */
function _dynastyAvgFor(name) {
  const p = DYNASTY_BOARD.find(x => x.name === name);
  return p ? p.avg : null;
}

function _teamRosterForAverages(team) {
  // Bevorzugt vollen ESPN-Roster (mit Starter-Info), sonst Keeper als Fallback.
  const live = (typeof ROSTERS_LIVE !== 'undefined') ? ROSTERS_LIVE[team.id] : null;
  if (live && live.length) return { players: live, source: 'live' };
  const dt = DRAFT_2026_TEAMS.find(x => x.team === team.name);
  const keepers = dt ? dt.keepers.map(k => ({ name: k.name, pos: k.pos, isStarter: null })) : [];
  return { players: keepers, source: 'keepers' };
}

function renderTeamAverages() {
  const wrap = document.getElementById('teamaveragesContent');
  const anyLive = (typeof ROSTERS_LIVE !== 'undefined') && Object.values(ROSTERS_LIVE).some(r => r && r.length);

  const rows = LEAGUE_TEAMS.map(team => {
    const { players, source } = _teamRosterForAverages(team);
    // Kicker/Defense raus, nur Positionen mit Dynasty-Relevanz
    const relevant = players.filter(p => !['K', 'DST', 'D/ST'].includes((p.pos || '').split('/')[0]));
    const withValue = relevant.map(p => ({ ...p, dyn: _dynastyAvgFor(p.name) })).filter(p => p.dyn != null);

    const allAvg = withValue.length ? withValue.reduce((s, p) => s + p.dyn, 0) / withValue.length : null;
    const starters = withValue.filter(p => p.isStarter === true);
    const starterAvg = starters.length ? starters.reduce((s, p) => s + p.dyn, 0) / starters.length : null;
    const hasStarterInfo = withValue.some(p => p.isStarter !== null);

    return { team, source, n: withValue.length, allAvg, starterAvg, hasStarterInfo };
  }).sort((a, b) => (a.allAvg ?? 9999) - (b.allAvg ?? 9999));

  wrap.innerHTML = `
    <div class="info-banner">
      Durchschnitt aus dem <b>Dynasty Board</b> (Ø aus 4 Quellen) für alle Spieler eines Teams, ohne
      Kicker/Defense. Niedriger = wertvoller. ${anyLive
        ? 'Starter-Schnitt basiert auf dem ESPN-Lineup-Slot (Bench/IR ausgeschlossen).'
        : 'Voller ESPN-Roster noch nicht synct — aktuell nur auf Basis der gemeldeten Keeper berechnet, Starter-Spalte erscheint automatisch, sobald der ESPN-Sync läuft.'}
    </div>
    <div class="board-table-wrap">
      <table class="board">
        <thead><tr>
          <th class="round-label">Team</th>
          <th>Ø Team (ohne K/DST)</th>
          <th>Ø Starter</th>
          <th>Spieler erfasst</th>
        </tr></thead>
        <tbody>
          ${rows.map(r => `
            <tr>
              <td style="text-align:left;font-weight:600">${r.team.emoji} ${r.team.name}</td>
              <td><b>${r.allAvg != null ? r.allAvg.toFixed(1) : '—'}</b></td>
              <td>${r.hasStarterInfo ? (r.starterAvg != null ? r.starterAvg.toFixed(1) : '—') : '<span style="color:var(--muted)">n/a</span>'}</td>
              <td>${r.n} ${r.source === 'keepers' ? '<span style="color:var(--muted);font-size:10px">(nur Keeper)</span>' : ''}</td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>
  `;
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
  const shareDisabled = !drSelected.length ? ' disabled style="opacity:.4;cursor:not-allowed"' : '';
  host.innerHTML = `
    <div class="rr-tb-group">
      <button class="rr-tb-btn${compareActive}" onclick="drToggleCompare()">⚖️ Vergleichen ${drCompareMode ? '(' + drSelected.length + '/3)' : ''}</button>
    </div>
    <button class="rr-tb-btn" onclick="drOpenShareModal()"${shareDisabled}>📸 Snapshot teilen</button>
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
  const snaps = _drListSnaps();
  const sortIndicator = key => drSortBy !== key ? '' : (drSortDir === 'asc' ? ' ↑' : ' ↓');
  const cls = key => 'rr-col-h' + (drSortBy === key ? ' rr-col-active' : '');

  host.style.gridTemplateColumns = `30px 1fr repeat(${snaps.length}, 38px)`;
  const snapHeaders = snaps.map(s =>
    `<span class="${cls(s.date)}" onclick="drSortByKey('${s.date}')" title="${s.label} (${s.date})">${_drShortLabel(s.label)}${sortIndicator(s.date)}</span>`
  ).join('');
  host.innerHTML =
    `<span class="${cls('latest')}" onclick="drSortByKey('latest')" title="Aktueller Rang (neuester Snapshot)">#${sortIndicator('latest')}</span>` +
    `<span class="${cls('name')}" onclick="drSortByKey('name')" style="text-align:left;">Name${sortIndicator('name')}</span>` +
    snapHeaders;
}

/* Nur die letzten 2 Snapshots in der Sidebar-Liste zeigen -- die volle
   Historie (alle Snapshots) sieht man im Chart-Panel rechts nach Klick
   auf einen Spieler. Haelt die Liste kompakt und verhindert Umbrueche
   auf schmalen Screens, egal wie viele Snapshots insgesamt existieren. */
function _drListSnaps() {
  const snaps = _drSnaps();
  return snaps.slice(-2);
}
function _drShortLabel(label) {
  // "2021 Saisonstart" -> "'21", "Start 2026" -> "'26" etc. -- extrahiert die Jahreszahl
  const m = label.match(/\d{4}/);
  return m ? "'" + m[0].slice(2) : label.slice(0, 4);
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
  const allSnaps = _drSnaps();
  const listSnaps = _drListSnaps();
  const startIdx = allSnaps.length - listSnaps.length;
  const gridTpl = `30px 1fr repeat(${listSnaps.length}, 38px)`;

  body.innerHTML = drFiltered.slice(0, 500).map((p, sortIdx) => {
    const cells = listSnaps.map((s, i) => {
      const r = p.ranks[startIdx + i];
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
  const prediction = _drPredictNextRank(values);
  const predictionHtml = prediction != null ? `
    <div class="rr-prediction-box">
      🔮 Geschätzter nächster Rang: <b style="color:#e0794a">#${prediction}</b>
      <span style="color:var(--muted);font-size:11px">(grober Trend aus den letzten Snapshots, keine echte Prognose)</span>
    </div>` : '';

  panel.innerHTML = `
    <div class="rr-player-header">
      <div>
        <div class="rr-player-name">${player.name}</div>
        <div class="rr-player-sub">Dynasty Rolling Rankings · ${player.pos || '—'}${owner ? ' · ' + teamLabelWithOwner(owner) : ''}</div>
      </div>
      ${pillsHtml}
    </div>
    <div class="rr-chart-box">
      <canvas id="drCanvas"></canvas>
    </div>
    ${badgesHtml}
    ${predictionHtml}`;

  _drDrawChart([{ player, values, color: DR_COMPARE_COLORS[0] }], labels);
}

/* Grober Trend: einfache lineare Regression ueber die letzten (max 4)
   vorhandenen Rang-Werte, einen Schritt extrapoliert. Nur eine Trend-
   Schaetzung, kein echtes Vorhersagemodell -- deshalb auch klar so
   beschriftet. Braucht mindestens 2 Datenpunkte. */
function _drPredictNextRank(values) {
  const pts = [];
  values.forEach((v, i) => { if (v !== null) pts.push([i, v]); });
  if (pts.length < 2) return null;
  const recent = pts.slice(-4);
  const n = recent.length;
  const sumX = recent.reduce((s, p) => s + p[0], 0);
  const sumY = recent.reduce((s, p) => s + p[1], 0);
  const sumXY = recent.reduce((s, p) => s + p[0] * p[1], 0);
  const sumXX = recent.reduce((s, p) => s + p[0] * p[0], 0);
  const denom = (n * sumXX - sumX * sumX);
  if (denom === 0) return null;
  const slope = (n * sumXY - sumX * sumY) / denom;
  const intercept = (sumY - slope * sumX) / n;
  const nextX = pts[pts.length - 1][0] + 1;
  const predicted = Math.round(slope * nextX + intercept);
  return Math.max(1, predicted);
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

// ============================================================
//  NFL TEAMS — welche unserer Liga-Spieler spielen fuer welches
//  echte NFL-Team (nur QB/RB/WR/TE), mit Fantasy-Besitzer.
// ============================================================
const NFL_TEAM_NAMES = {
  ARI: 'Arizona Cardinals', ATL: 'Atlanta Falcons', BAL: 'Baltimore Ravens',
  BUF: 'Buffalo Bills', CAR: 'Carolina Panthers', CHI: 'Chicago Bears',
  CIN: 'Cincinnati Bengals', CLE: 'Cleveland Browns', DAL: 'Dallas Cowboys',
  DEN: 'Denver Broncos', DET: 'Detroit Lions', GB: 'Green Bay Packers',
  HOU: 'Houston Texans', IND: 'Indianapolis Colts', JAX: 'Jacksonville Jaguars',
  KC: 'Kansas City Chiefs', LAC: 'Los Angeles Chargers', LAR: 'Los Angeles Rams',
  LV: 'Las Vegas Raiders', MIA: 'Miami Dolphins', MIN: 'Minnesota Vikings',
  NE: 'New England Patriots', NO: 'New Orleans Saints', NYG: 'New York Giants',
  NYJ: 'New York Jets', PHI: 'Philadelphia Eagles', PIT: 'Pittsburgh Steelers',
  SEA: 'Seattle Seahawks', SF: 'San Francisco 49ers', TB: 'Tampa Bay Buccaneers',
  TEN: 'Tennessee Titans', WAS: 'Washington Commanders',
};
// Unsere Ranking-Quellen nutzen leicht unterschiedliche Kuerzel (v.a. KTC:
// GBP/NEP/NOS/SFO/TBB/LVR/JAC statt GB/NE/NO/SF/TB/LV/JAX) -- hier auf
// die kanonische Liste oben normalisieren.
const NFL_TEAM_ALIASES = { GBP: 'GB', NEP: 'NE', NOS: 'NO', SFO: 'SF', TBB: 'TB', LVR: 'LV', JAC: 'JAX' };
function nflTeamCanon(code) { return NFL_TEAM_ALIASES[code] || code; }

function showNFLTeams() { navigate('nflteams'); renderNFLTeams(); }

function renderNFLTeams() {
  const wrap = document.getElementById('nflteamsContent');
  const counts = {};
  DYNASTY_BOARD.forEach(p => {
    if (!['QB', 'RB', 'WR', 'TE'].includes(p.pos)) return;
    const code = nflTeamCanon(p.team);
    if (!NFL_TEAM_NAMES[code]) return;
    counts[code] = (counts[code] || 0) + 1;
  });

  const teams = Object.keys(NFL_TEAM_NAMES).sort();
  wrap.innerHTML = `<div class="team-grid">` + teams.map(code => `
    <div class="team-card" onclick="showNFLTeam('${code}')">
      <span class="team-emoji" style="font-size:20px;font-weight:800;color:var(--accent)">${code}</span>
      <div class="team-name">${NFL_TEAM_NAMES[code]}</div>
      <div class="team-meta">${counts[code] || 0} QB/RB/WR/TE erfasst</div>
    </div>`).join('') + `</div>`;
}

function showNFLTeam(code) {
  const fullName = NFL_TEAM_NAMES[code] || code;
  const players = DYNASTY_BOARD
    .filter(p => ['QB', 'RB', 'WR', 'TE'].includes(p.pos) && nflTeamCanon(p.team) === code)
    .sort((a, b) => a.avg - b.avg);

  document.getElementById('nflTeamDetailHeader').innerHTML = `
    <div class="page-title">🏈 ${fullName}</div>
    <div class="page-sub">${players.length} QB/RB/WR/TE, sortiert nach Dynasty-Rang</div>
  `;

  const content = document.getElementById('nflTeamDetailContent');
  if (!players.length) {
    content.innerHTML = emptyState('Keine Spieler gefunden', 'Für dieses Team liegen aktuell keine Dynasty-Board-Einträge in dieser Positionsgruppe vor.');
  } else {
    content.innerHTML = players.map(p => {
      const owner = ownerOfPlayer(p.name);
      const color = _drRankColor(p.avg);
      return `
        <div class="player-row">
          <div class="player-round" style="background:${color}22;color:${color}">#${p.avg}</div>
          <div class="player-name" style="flex:1">${p.name}</div>
          <div class="player-team">${p.pos}</div>
          ${owner
            ? `<div class="player-status" style="background:var(--accent-light);color:var(--accent)">${teamLabelWithOwner(owner)}</div>`
            : `<div class="player-status" style="background:var(--pick-open-bg);color:var(--pick-open-color)">Free Agent</div>`}
        </div>`;
    }).join('');
  }
  navigate('nflteamdetail', { nflCode: code });
}

// ============================================================
//  SNAPSHOT TEILEN (Instagram-Story-Format 4:5)
//  Ein Modal fuer beide Rolling-Rankings-Varianten (Dynasty & Season
//  Finish), umgeschaltet ueber _shareMode.
// ============================================================
let drShareStyle = 'light'; // 'light' | 'dark'
let _shareMode = 'dynasty'; // 'dynasty' | 'season'

function drOpenShareModal() {
  if (!drSelected.length) return;
  _shareMode = 'dynasty';
  _openShareModalCommon();
}
function srOpenShareModal() {
  if (!srSelected.length) return;
  _shareMode = 'season';
  _openShareModalCommon();
}
function _openShareModalCommon() {
  const overlay = document.getElementById('drShareModalOverlay');
  if (!overlay) return;
  drShareStyle = document.body.classList.contains('light') ? 'light' : 'dark';
  _renderShareCardDispatch();
  overlay.style.display = 'flex';
}
function drCloseShareModal() {
  const overlay = document.getElementById('drShareModalOverlay');
  if (overlay) overlay.style.display = 'none';
}
function drSetShareStyle(style) {
  drShareStyle = style;
  _renderShareCardDispatch();
}
function _renderShareCardDispatch() {
  if (_shareMode === 'season') _srRenderShareCard();
  else _drRenderShareCard();
}

function _drRenderShareCard() {
  const host = document.getElementById('drShareCardContent');
  if (!host) return;

  document.querySelectorAll('.rr-style-btn').forEach(btn => {
    btn.classList.toggle('rr-style-active', btn.dataset.style === drShareStyle);
  });

  const isCompare = drCompareMode && drSelected.length > 1;
  const data = _drData();
  const players = drSelected.map(i => data[i]);
  const snaps = _drSnaps();
  const labels = snaps.map(s => s.label);
  const datasets = players.map((p, i) => ({ label: p.name, values: p.ranks, color: DR_COMPARE_COLORS[i] }));

  const th = drShareStyle === 'light' ? {
    bg: '#faf6f1', surface: '#ffffff', text: '#23293a', muted: '#93877a',
    accent: '#cf7a48', border: '#ecdcc9', shadow: 'rgba(207,122,72,0.10)',
  } : {
    bg: '#0a0f1c', surface: '#121a2b', text: '#eef1f8', muted: '#8a93ac',
    accent: '#e0794a', border: '#2a3654', shadow: 'rgba(0,0,0,0.35)',
  };

  const titleText = isCompare ? 'Rolling Rankings · Vergleich' : players[0].name;
  const subText = isCompare ? 'Dynasty Rolling Rankings' : `Dynasty Rolling Rankings · ${players[0].pos || ''}`;

  let statsHtml = '';
  if (isCompare) {
    statsHtml = datasets.map(d => {
      const valid = d.values.filter(x => x !== null);
      const best = valid.length ? Math.min(...valid) : null;
      const avg = valid.length ? Math.round(valid.reduce((a, b) => a + b, 0) / valid.length) : null;
      return `<div style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:${th.surface};border-radius:10px;border:1px solid ${th.border};">
        <span style="width:14px;height:14px;border-radius:50%;background:${d.color};flex-shrink:0;"></span>
        <div style="flex:1;min-width:0;">
          <div style="font-size:14px;font-weight:800;color:${th.text};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${d.label}</div>
          <div style="font-size:10px;color:${th.muted};margin-top:2px;">Bestes #${best ?? '–'} · Schnitt #${avg ?? '–'}</div>
        </div>
      </div>`;
    }).join('');
    statsHtml = `<div style="display:flex;flex-direction:column;gap:8px;margin-bottom:18px;">${statsHtml}</div>`;
  } else {
    const v = datasets[0].values;
    const valid = v.filter(x => x !== null);
    const best = valid.length ? Math.min(...valid) : null;
    const worst = valid.length ? Math.max(...valid) : null;
    const avg = valid.length ? Math.round(valid.reduce((a, b) => a + b, 0) / valid.length) : null;
    const pill = (val, label, color) => `
      <div style="flex:1;background:${th.surface};border:1px solid ${th.border};border-radius:10px;padding:12px 8px;text-align:center;">
        <div style="font-size:24px;font-weight:800;color:${color};line-height:1;">${val ?? '–'}</div>
        <div style="font-size:9px;color:${th.muted};margin-top:6px;letter-spacing:1px;text-transform:uppercase;">${label}</div>
      </div>`;
    statsHtml = `<div style="display:flex;gap:8px;margin-bottom:18px;">
      ${pill(best, 'Bestes', '#e0794a')}
      ${pill(worst, 'Schlechtestes', '#d9695f')}
      ${pill(avg, 'Schnitt', '#4d7bb0')}
    </div>`;
  }

  host.innerHTML = `
    <div id="drShareCardInner" style="width:480px;aspect-ratio:4/5;background:${th.bg};padding:32px 28px;font-family:'DM Sans',system-ui,sans-serif;color:${th.text};display:flex;flex-direction:column;border-radius:18px;box-shadow:0 8px 32px ${th.shadow};">
      <div style="font-size:10px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:${th.muted};text-align:center;margin-bottom:6px;">🐻 Bear Witch Project HQ · Rolling Rankings</div>
      <div style="font-size:${isCompare ? '26px' : '30px'};font-family:'Playfair Display',serif;font-weight:800;text-align:center;line-height:1.1;color:${th.accent};margin-bottom:4px;">${titleText}</div>
      <div style="font-size:11px;color:${th.muted};text-align:center;margin-bottom:18px;">${subText}</div>
      ${statsHtml}
      <div style="flex:1;background:${th.surface};border:1px solid ${th.border};border-radius:14px;padding:14px;display:flex;align-items:center;justify-content:center;min-height:0;">
        <canvas id="drShareCanvas" style="max-width:100%;max-height:100%;"></canvas>
      </div>
      <div style="text-align:center;font-size:10px;color:${th.muted};margin-top:14px;letter-spacing:1px;">Foodball 🏈 · Bear Witch Project HQ</div>
    </div>`;

  setTimeout(() => _drDrawShareChart(datasets, labels, th, false), 30);
}

/* Gleicher Aufbau wie _drRenderShareCard, aber fuer Season-Finish-Rolling
   (Franchises statt Spieler, Jahre statt Snapshots). */
function _srRenderShareCard() {
  const host = document.getElementById('drShareCardContent');
  if (!host) return;

  document.querySelectorAll('.rr-style-btn').forEach(btn => {
    btn.classList.toggle('rr-style-active', btn.dataset.style === drShareStyle);
  });

  const isCompare = srCompareMode && srSelected.length > 1;
  const data = _srData();
  const teams = srSelected.map(i => data[i]);
  const labels = _srYears().map(String);
  const datasets = teams.map((t, i) => ({ label: t.team, values: t.ranks, color: SR_COMPARE_COLORS[i] }));

  const th = drShareStyle === 'light' ? {
    bg: '#faf6f1', surface: '#ffffff', text: '#23293a', muted: '#93877a',
    accent: '#cf7a48', border: '#ecdcc9', shadow: 'rgba(207,122,72,0.10)',
  } : {
    bg: '#0a0f1c', surface: '#121a2b', text: '#eef1f8', muted: '#8a93ac',
    accent: '#e0794a', border: '#2a3654', shadow: 'rgba(0,0,0,0.35)',
  };

  const titleText = isCompare ? 'Season Finish · Vergleich' : teams[0].team;
  const subText = isCompare ? 'Regular-Season-Finish über die Jahre' : `Regular-Season-Finish über die Jahre${teams[0].aliases.length ? ' · ex: ' + teams[0].aliases.join(', ') : ''}`;

  let statsHtml = '';
  if (isCompare) {
    statsHtml = datasets.map((d, i) => {
      const valid = d.values.filter(x => x !== null);
      const best = valid.length ? Math.min(...valid) : null;
      const avg = teams[i].avg;
      return `<div style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:${th.surface};border-radius:10px;border:1px solid ${th.border};">
        <span style="width:14px;height:14px;border-radius:50%;background:${d.color};flex-shrink:0;"></span>
        <div style="flex:1;min-width:0;">
          <div style="font-size:14px;font-weight:800;color:${th.text};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${d.label}</div>
          <div style="font-size:10px;color:${th.muted};margin-top:2px;">Bestes #${best ?? '–'} · Ø ${avg != null ? avg.toFixed(1) : '–'}</div>
        </div>
      </div>`;
    }).join('');
    statsHtml = `<div style="display:flex;flex-direction:column;gap:8px;margin-bottom:18px;">${statsHtml}</div>`;
  } else {
    const t = teams[0];
    const valid = t.ranks.filter(x => x !== null);
    const best = valid.length ? Math.min(...valid) : null;
    const worst = valid.length ? Math.max(...valid) : null;
    const pill = (val, label, color) => `
      <div style="flex:1;background:${th.surface};border:1px solid ${th.border};border-radius:10px;padding:12px 8px;text-align:center;">
        <div style="font-size:24px;font-weight:800;color:${color};line-height:1;">${val ?? '–'}</div>
        <div style="font-size:9px;color:${th.muted};margin-top:6px;letter-spacing:1px;text-transform:uppercase;">${label}</div>
      </div>`;
    statsHtml = `<div style="display:flex;gap:8px;margin-bottom:18px;">
      ${pill(best, 'Bestes', '#e0794a')}
      ${pill(worst, 'Schlechtestes', '#d9695f')}
      ${pill(t.avg != null ? t.avg.toFixed(1) : null, 'Ø Platz', '#4d7bb0')}
    </div>`;
  }

  host.innerHTML = `
    <div id="drShareCardInner" style="width:480px;aspect-ratio:4/5;background:${th.bg};padding:32px 28px;font-family:'DM Sans',system-ui,sans-serif;color:${th.text};display:flex;flex-direction:column;border-radius:18px;box-shadow:0 8px 32px ${th.shadow};">
      <div style="font-size:10px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:${th.muted};text-align:center;margin-bottom:6px;">🐻 Bear Witch Project HQ · Liga-Historie</div>
      <div style="font-size:${isCompare ? '26px' : '30px'};font-family:'Playfair Display',serif;font-weight:800;text-align:center;line-height:1.1;color:${th.accent};margin-bottom:4px;">${titleText}</div>
      <div style="font-size:11px;color:${th.muted};text-align:center;margin-bottom:18px;">${subText}</div>
      ${statsHtml}
      <div style="flex:1;background:${th.surface};border:1px solid ${th.border};border-radius:14px;padding:14px;display:flex;align-items:center;justify-content:center;min-height:0;">
        <canvas id="drShareCanvas" style="max-width:100%;max-height:100%;"></canvas>
      </div>
      <div style="text-align:center;font-size:10px;color:${th.muted};margin-top:14px;letter-spacing:1px;">Foodball 🏈 · Bear Witch Project HQ</div>
    </div>`;

  setTimeout(() => _drDrawShareChart(datasets, labels, th, true), 30);
}

function _drDrawShareChart(datasets, labels, th, invertReverse) {
  const canvas = document.getElementById('drShareCanvas');
  if (!canvas || typeof Chart === 'undefined') return;
  const ctx = canvas.getContext('2d');

  const chartDatasets = datasets.map(d => {
    const grad = ctx.createLinearGradient(0, 0, 0, 240);
    grad.addColorStop(0, _drHexToRgba(d.color, 0.25));
    grad.addColorStop(1, _drHexToRgba(d.color, 0));
    return {
      label: d.label,
      data: d.values,
      borderColor: d.color,
      backgroundColor: datasets.length === 1 ? grad : 'transparent',
      pointBackgroundColor: d.color,
      pointBorderColor: th.bg,
      pointBorderWidth: 2,
      pointRadius: labels.length > 8 ? 3 : 5,
      borderWidth: 2.5,
      fill: datasets.length === 1,
      tension: 0.35,
      spanGaps: true,
    };
  });

  new Chart(ctx, {
    type: 'line',
    data: { labels, datasets: chartDatasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
      scales: {
        y: {
          reverse: true, min: 1,
          grid: { color: th.border }, border: { color: th.border },
          ticks: { color: th.muted, font: { size: 10 }, callback: v => `#${v}` }
        },
        x: {
          grid: { color: th.border }, border: { color: th.border },
          ticks: { color: th.text, font: { size: labels.length > 8 ? 8 : 11, weight: '700' }, autoSkip: labels.length > 8, autoSkipPadding: 6 }
        }
      }
    }
  });
}

async function drDownloadShareImage() {
  const card = document.getElementById('drShareCardInner');
  if (!card) return;
  if (typeof html2canvas !== 'function') { alert('html2canvas Library nicht geladen.'); return; }
  const btn = document.getElementById('drDownloadBtn');
  const orig = btn ? btn.textContent : '';
  if (btn) { btn.textContent = '⏳ Erstelle...'; btn.disabled = true; }
  try {
    const bg = drShareStyle === 'light' ? '#faf6f1' : '#0a0f1c';
    const canvas = await html2canvas(card, { backgroundColor: bg, scale: 2, logging: false, useCORS: true });
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    const stamp = new Date().toISOString().split('T')[0];
    let slug, prefix;
    if (_shareMode === 'season') {
      const isCompare = srCompareMode && srSelected.length > 1;
      prefix = 'season-finish';
      slug = isCompare ? 'vergleich' : (_srData()[srSelected[0]]?.team || 'team').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    } else {
      const isCompare = drCompareMode && drSelected.length > 1;
      prefix = 'rolling';
      slug = isCompare ? 'vergleich' : (_drData()[drSelected[0]]?.name || 'spieler').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }
    link.download = `bwp-${prefix}-${slug}-${stamp}.png`;
    link.click();
    if (btn) { btn.textContent = '✓ Gespeichert!'; }
    setTimeout(() => { if (btn) { btn.textContent = orig; btn.disabled = false; } }, 1500);
  } catch (err) {
    console.error('Screenshot failed:', err);
    alert('Fehler beim Erstellen: ' + err.message);
    if (btn) { btn.textContent = orig; btn.disabled = false; }
  }
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

/* ---------- Standings (offizielle Tabelle nach W-L, PF als Tiebreak) ---------- */
function renderStandings() {
  const wrap = document.getElementById('standingsContent');
  const seasons = Object.keys(WEEKLY_SCORES);
  const season = seasons[seasons.length - 1];
  const weeks = Object.keys(WEEKLY_SCORES[season] || {}).map(Number).sort((a, b) => a - b);

  if (!weeks.length) {
    wrap.innerHTML = emptyState(
      'Noch keine Saisondaten',
      'Standings füllen sich automatisch, sobald Weekly Scores reinkommen (täglich 9 & 21 Uhr, ESPN-Sync). Vor Saisonstart naturgemäß leer.',
      '📈'
    );
    return;
  }

  const lastWeek = weeks[weeks.length - 1];
  const totals = {};
  const teamMeta = id => LEAGUE_TEAMS.find(t => t.id === id) || { name: id, emoji: '🏈' };

  for (let w = 1; w <= lastWeek; w++) {
    (WEEKLY_SCORES[season][w] || []).forEach(e => {
      if (!totals[e.teamId]) totals[e.teamId] = { pf: 0, pa: 0, wins: 0, losses: 0, ties: 0 };
      const t = totals[e.teamId];
      t.pf += e.points; t.pa += e.opponentPoints;
      if (e.points > e.opponentPoints) t.wins++;
      else if (e.points < e.opponentPoints) t.losses++;
      else t.ties++;
    });
  }

  const ranked = Object.keys(totals)
    .map(teamId => ({ teamId, ...totals[teamId] }))
    .sort((a, b) => (b.wins - a.wins) || (b.pf - a.pf));

  wrap.innerHTML = `
    <div class="info-banner">Stand nach Woche ${lastWeek} (Saison ${season}). Sortiert nach Siegen, bei Gleichstand nach erzielten Punkten.</div>
    <div class="board-table-wrap">
      <table class="board">
        <thead><tr><th class="round-label">#</th><th>Team</th><th>W-L-T</th><th>PF</th><th>PA</th><th>Diff</th></tr></thead>
        <tbody>
          ${ranked.map((r, i) => {
            const t = teamMeta(r.teamId);
            const diff = r.pf - r.pa;
            return `<tr>
              <td>${i + 1}</td>
              <td style="text-align:left;font-weight:600">${t.emoji || ''} ${t.name}</td>
              <td><b>${r.wins}-${r.losses}${r.ties ? '-' + r.ties : ''}</b></td>
              <td>${r.pf.toFixed(1)}</td>
              <td>${r.pa.toFixed(1)}</td>
              <td style="color:${diff >= 0 ? 'var(--green)' : 'var(--red)'}">${diff >= 0 ? '+' : ''}${diff.toFixed(1)}</td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;
}

/* ---------- Matchup Planner (Spielplan) ---------- */
let matchupsState = { week: null };

function renderMatchups() {
  const wrap = document.getElementById('matchupsContent');
  const seasons = Object.keys((typeof SCHEDULE !== 'undefined') ? SCHEDULE : {});
  const season = seasons[seasons.length - 1];
  const scheduleWeeks = season ? Object.keys(SCHEDULE[season] || {}).map(Number).sort((a, b) => a - b) : [];

  if (!scheduleWeeks.length) {
    wrap.innerHTML = emptyState(
      'Spielplan noch nicht geladen',
      'Läuft über denselben Sync wie Weekly Scores (scripts/sync-espn-weekly-scores.js, täglich 9 & 21 Uhr). ESPN veröffentlicht den Spielplan meist kurz vor Saisonstart.',
      '⚔️'
    );
    return;
  }

  const week = matchupsState.week && scheduleWeeks.includes(matchupsState.week) ? matchupsState.week : scheduleWeeks[0];
  matchupsState.week = week;

  const teamMeta = id => LEAGUE_TEAMS.find(t => t.id === id) || { name: id, emoji: '🏈' };
  const scoresThisWeek = {};
  (WEEKLY_SCORES[season]?.[week] || []).forEach(e => { scoresThisWeek[e.teamId] = e.points; });
  const played = Object.keys(scoresThisWeek).length > 0;

  const matchups = SCHEDULE[season][week] || [];

  wrap.innerHTML = `
    <div class="db-controls"><div class="db-pos-filters" id="matchupsWeekSelector"></div></div>
    <div class="info-banner">${played ? `Ergebnisse für Woche ${week} liegen vor.` : `Woche ${week} noch nicht gespielt — nur Paarungen.`}</div>
    <div class="matchup-grid">
      ${matchups.map(m => {
        const home = teamMeta(m.home), away = teamMeta(m.away);
        const hs = scoresThisWeek[m.home], as = scoresThisWeek[m.away];
        const homeWin = played && hs > as, awayWin = played && as > hs;
        return `
          <div class="matchup-card">
            <div class="matchup-team${homeWin ? ' matchup-winner' : ''}">
              <span>${home.emoji || ''} ${home.name}</span>
              <span class="matchup-score">${played ? hs.toFixed(1) : ''}</span>
            </div>
            <div class="matchup-vs">vs</div>
            <div class="matchup-team${awayWin ? ' matchup-winner' : ''}">
              <span>${away.emoji || ''} ${away.name}</span>
              <span class="matchup-score">${played ? as.toFixed(1) : ''}</span>
            </div>
          </div>`;
      }).join('')}
    </div>
    <div class="page-sub" style="margin-top:14px">Die kumulierte Team-Power-Ranking über die Saison steht unter <b>Standings → 2026 Rolling Rankings</b>.</div>
  `;

  const sel = document.getElementById('matchupsWeekSelector');
  scheduleWeeks.forEach(w => {
    const btn = document.createElement('button');
    btn.className = 'db-pos-btn' + (w === week ? ' active' : '');
    btn.textContent = 'Woche ' + w;
    btn.onclick = () => { matchupsState.week = w; renderMatchups(); };
    sel.appendChild(btn);
  });
}

/* ---------- Liga-Beiträge (manuell gepflegt, Auto-Ableitung aus FUTURE_PICKS) ---------- */
function renderDues() {
  const wrap = document.getElementById('duesContent');
  if (typeof LEAGUE_DUES_PAID === 'undefined' || typeof DUES_YEARS === 'undefined') {
    wrap.innerHTML = emptyState(
      'Noch keine Beitragsdaten',
      'data/league-dues.js anlegen (LEAGUE_DUES_PAID mit { team, year }-Einträgen) — die Tabelle hier befüllt sich dann automatisch.',
      '💰'
    );
    return;
  }
  const badge = (status) => {
    if (status === 'paid') return `<span class="dues-badge dues-paid">✅ Bezahlt</span>`;
    if (status === 'owes') return `<span class="dues-badge dues-owes">⚠️ Muss zahlen</span>`;
    return `<span class="dues-badge dues-open">offen</span>`;
  };
  wrap.innerHTML = `
    <div class="info-banner">
      <b>✅ Bezahlt</b> — Beitrag für diese Saison beglichen.
      <b>⚠️ Muss zahlen</b> — laufende Saison, oder ein Pick aus diesem Jahr wurde bereits getradet (siehe Future Draft Boards), Beitrag ist also schon fällig.
      <b>offen</b> — Saison liegt noch in der Zukunft und ist für dieses Team noch nicht relevant.
    </div>
    <div class="board-table-wrap">
      <table class="board">
        <thead><tr><th class="round-label">Team</th>${DUES_YEARS.map(y => `<th>${y}</th>`).join('')}</tr></thead>
        <tbody>
          ${LEAGUE_TEAMS.map(t => `<tr>
            <td style="text-align:left;font-weight:600">${t.emoji} ${t.name}</td>
            ${DUES_YEARS.map(y => `<td>${badge(leagueDuesStatus(t.name, y))}</td>`).join('')}
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  `;
}

/* ---------- Liga-Historie (manuell gepflegt) ---------- */
function renderLeagueHistory() {
  const wrap = document.getElementById('leaguehistoryContent');
  if (typeof LEAGUE_HISTORY === 'undefined' || !LEAGUE_HISTORY.length) {
    wrap.innerHTML = emptyState(
      'Noch keine Historie hinterlegt',
      'Einfach vergangene Saisons in data/league-history.js eintragen (Champion, Vize, Dritter je Jahr) — die Tabelle hier befüllt sich dann automatisch.',
      '🏛️'
    );
    return;
  }
  const sorted = LEAGUE_HISTORY.slice().sort((a, b) => b.year - a.year);
  wrap.innerHTML = `
    <div class="board-table-wrap">
      <table class="board">
        <thead><tr><th class="round-label">Jahr</th><th>🥇 Champion</th><th>🥈 Vize</th><th>🥉 Dritter</th></tr></thead>
        <tbody>
          ${sorted.map(s => `<tr>
            <td><b>${s.year}</b></td>
            <td style="text-align:left;font-weight:600">${s.champion || '—'}</td>
            <td>${s.runnerUp || '—'}</td>
            <td>${s.thirdPlace || '—'}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
    ${renderSeasonFinishRolling()}
  `;
  if (typeof SEASON_HISTORY_STANDINGS !== 'undefined' && SEASON_HISTORY_STANDINGS.length) {
    _srInit();
  }
}

/* Regular-Season-Finish je Team über die Jahre, im gleichen Farb-/Aufbau-
   Stil wie die Dynasty Rolling Rankings, plus Ø-Platzierung. Teamnamen
   wie sie im jeweiligen Jahr hiessen (siehe Kommentar in
   data/season-history-standings.js zum Thema Umbenennungen). */
function renderSeasonFinishRolling() {
  if (typeof SEASON_HISTORY_STANDINGS === 'undefined' || !SEASON_HISTORY_STANDINGS.length) return '';
  return `
    <div class="section-label">📈 Regular-Season-Finish über die Jahre</div>
    <div class="info-banner">
      Platzierung nach Regular Season (nicht Playoff-Ergebnis) je Jahr. Umbenannte Franchises sind zu
      einer Zeile zusammengeführt — komplette Owner-Zuordnung vom Liga-Owner bestätigt.
    </div>
    <div class="sr-embed">
      <div class="rr-layout">
        <div class="rr-sidebar">
          <div class="rr-sidebar-header">
            <div style="font-size:13px;font-weight:800;color:var(--text);">Franchises</div>
          </div>
          <div id="srToolbar" class="rr-toolbar"></div>
          <div class="rr-list-scroll">
            <div id="srListCols" class="rr-list-cols"></div>
            <div id="srListBody"></div>
          </div>
        </div>
        <div class="rr-main" id="srChartPanel">
          <div style="margin:auto;text-align:center;color:var(--muted);">
            <div style="font-size:36px;margin-bottom:10px;">📈</div>
            <div style="font-size:14px;font-weight:700;color:var(--text);">Team auswählen</div>
            <div style="font-size:12px;margin-top:4px;">Klicke links auf ein Team für den Platzierungs-Verlauf</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* ---------- Season Finish Rolling (Sidebar + Chart, wie Dynasty Rolling) ---------- */
let srCompareMode = false;
let srSelected = [];
let srSortBy = 'avg';
let srSortDir = 'asc';
const SR_COMPARE_COLORS = ['#e0794a', '#4d7bb0', '#4caf81'];

let _srDataCache = null;
function _srData() {
  if (_srDataCache) return _srDataCache;
  const years = SEASON_HISTORY_STANDINGS.map(s => s.year).sort((a, b) => a - b);
  const teamRanks = {};
  const aliasHistory = {};
  SEASON_HISTORY_STANDINGS.forEach(s => {
    s.standings.forEach(row => {
      const franchise = (typeof resolveTeamFranchise === 'function') ? resolveTeamFranchise(row.team) : row.team;
      teamRanks[franchise] = teamRanks[franchise] || {};
      teamRanks[franchise][s.year] = row.rank;
      if (franchise !== row.team) {
        aliasHistory[franchise] = aliasHistory[franchise] || [];
        aliasHistory[franchise].push(`${row.team} (${s.year})`);
      }
    });
  });
  _srDataCache = Object.keys(teamRanks).map((team, i) => {
    const ranks = years.map(y => teamRanks[team][y] ?? null);
    const valid = ranks.filter(r => r !== null);
    const avg = valid.length ? valid.reduce((a, b) => a + b, 0) / valid.length : null;
    return { team, ranks, avg, seasons: valid.length, aliases: [...new Set(aliasHistory[team] || [])], origIdx: i };
  });
  return _srDataCache;
}
function _srYears() { return SEASON_HISTORY_STANDINGS.map(s => s.year).sort((a, b) => a - b); }
function _srListYears() { return _srYears().slice(-2); } // Sidebar: nur letzte 2 Jahre, Rest im Chart

function _srInit() {
  _srDataCache = null;
  srSelected = [];
  srCompareMode = false;
  srSortBy = 'avg';
  srSortDir = 'asc';
  _srRenderToolbar();
  _srRenderListHeader();
  _srRenderList();
  _srRenderMain();
}

function _srSortedData() {
  const data = _srData().slice();
  const dir = srSortDir === 'desc' ? -1 : 1;
  const yearIdx = _srYears().indexOf(srSortBy);
  data.sort((a, b) => {
    let va, vb;
    if (srSortBy === 'name') return dir * a.team.localeCompare(b.team);
    if (srSortBy === 'avg') { va = a.avg; vb = b.avg; }
    else if (yearIdx !== -1) { va = a.ranks[yearIdx]; vb = b.ranks[yearIdx]; }
    else { va = a.avg; vb = b.avg; }
    const an = va == null, bn = vb == null;
    if (an && bn) return a.team.localeCompare(b.team);
    if (an) return 1;
    if (bn) return -1;
    return dir * (va - vb);
  });
  return data;
}

function srSortByKey(key) {
  if (srSortBy === key) srSortDir = srSortDir === 'asc' ? 'desc' : 'asc';
  else { srSortBy = key; srSortDir = 'asc'; }
  _srRenderListHeader();
  _srRenderList();
}

function _srRenderToolbar() {
  const host = document.getElementById('srToolbar');
  if (!host) return;
  const active = srCompareMode ? ' rr-tb-active' : '';
  const shareDisabled = !srSelected.length ? ' disabled style="opacity:.4;cursor:not-allowed"' : '';
  host.innerHTML = `
    <div class="rr-tb-group"><button class="rr-tb-btn${active}" onclick="srToggleCompare()">⚖️ Vergleichen ${srCompareMode ? '(' + srSelected.length + '/3)' : ''}</button></div>
    <button class="rr-tb-btn" onclick="srOpenShareModal()"${shareDisabled}>📸 Snapshot</button>
  `;
}
function srToggleCompare() {
  srCompareMode = !srCompareMode;
  if (!srCompareMode && srSelected.length > 1) srSelected = srSelected.slice(0, 1);
  _srRenderToolbar();
  _srRenderList();
  _srRenderMain();
}

function _srRenderListHeader() {
  const host = document.getElementById('srListCols');
  if (!host) return;
  const listYears = _srListYears();
  const cls = key => 'rr-col-h' + (srSortBy === key ? ' rr-col-active' : '');
  const ind = key => srSortBy !== key ? '' : (srSortDir === 'asc' ? ' ↑' : ' ↓');
  host.style.gridTemplateColumns = `28px 1fr repeat(${listYears.length}, 38px)`;
  host.innerHTML =
    `<span class="${cls('avg')}" onclick="srSortByKey('avg')" title="Ø Platz">#${ind('avg')}</span>` +
    `<span class="${cls('name')}" onclick="srSortByKey('name')" style="text-align:left;">Team${ind('name')}</span>` +
    listYears.map(y => `<span class="${cls(y)}" onclick="srSortByKey(${y})">'${String(y).slice(2)}${ind(y)}</span>`).join('');
}

function _srRenderList() {
  const body = document.getElementById('srListBody');
  if (!body) return;
  const listYears = _srListYears();
  const allYears = _srYears();
  const startIdx = allYears.length - listYears.length;
  const gridTpl = `28px 1fr repeat(${listYears.length}, 38px)`;
  const data = _srSortedData();

  body.innerHTML = data.map((r, sortIdx) => {
    const cells = listYears.map((y, i) => {
      const rank = r.ranks[startIdx + i];
      const c = rank == null ? 'var(--border)' : _drRankColor(rank);
      return `<span class="rr-rank-cell" style="color:${c};background:${rank ? c + '22' : 'transparent'}">${rank ?? '–'}</span>`;
    }).join('');
    const isSelected = srSelected.indexOf(r.origIdx) !== -1;
    const selIdx = srSelected.indexOf(r.origIdx);
    const colorDot = (srCompareMode && isSelected)
      ? `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${SR_COMPARE_COLORS[selIdx]};margin-right:4px;vertical-align:middle;"></span>`
      : '';
    const idxLabel = srSortBy === 'avg' ? (r.avg != null ? r.avg.toFixed(1) : '–') : (sortIdx + 1);
    return `<div class="rr-row${isSelected ? ' rr-active' : ''}" onclick="srSelectTeam(${r.origIdx})" style="grid-template-columns:${gridTpl};">
      <span class="rr-idx">${idxLabel}</span>
      <span class="rr-name" title="${r.team}">${colorDot}${r.team}</span>
      ${cells}
    </div>`;
  }).join('');
}

function srSelectTeam(origIdx) {
  if (srCompareMode) {
    const i = srSelected.indexOf(origIdx);
    if (i !== -1) srSelected.splice(i, 1);
    else if (srSelected.length < 3) srSelected.push(origIdx);
    else srSelected[2] = origIdx;
  } else {
    srSelected = [origIdx];
  }
  _srRenderToolbar();
  _srRenderList();
  _srRenderMain();
}

function _srRenderMain() {
  const panel = document.getElementById('srChartPanel');
  if (!panel) return;
  if (!srSelected.length) {
    panel.innerHTML = `
      <div style="margin:auto;text-align:center;color:var(--muted);">
        <div style="font-size:36px;margin-bottom:10px;">📈</div>
        <div style="font-size:14px;font-weight:700;color:var(--text);">Team auswählen</div>
        <div style="font-size:12px;margin-top:4px;">${srCompareMode ? 'Wähle bis zu 3 Teams zum Vergleich' : 'Klicke links auf ein Team für den Platzierungs-Verlauf'}</div>
      </div>`;
    return;
  }
  const data = _srData();
  const years = _srYears();
  const labels = years.map(String);
  if (srCompareMode && srSelected.length > 1) {
    const teams = srSelected.map(i => data[i]);
    const datasets = teams.map((t, i) => ({ team: t, values: t.ranks, color: SR_COMPARE_COLORS[i] }));
    const cards = datasets.map(d => {
      const valid = d.values.filter(x => x !== null);
      const best = valid.length ? Math.min(...valid) : null;
      return `<div class="rr-compare-card" style="border-color:${d.color}55;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
          <span style="width:12px;height:12px;border-radius:50%;background:${d.color};"></span>
          <span style="font-weight:800;font-size:14px;">${d.team.team}</span>
        </div>
        <div style="font-size:11px;color:var(--muted);">Bestes: <strong style="color:${d.color};font-size:14px;">#${best ?? '–'}</strong> · Ø <strong style="color:${d.color};font-size:14px;">${d.team.avg != null ? d.team.avg.toFixed(1) : '–'}</strong></div>
      </div>`;
    }).join('');
    panel.innerHTML = `
      <div class="rr-player-header"><div><div class="rr-player-name">Vergleich</div><div class="rr-player-sub">Regular-Season-Finish über die Jahre</div></div></div>
      <div class="rr-compare-cards">${cards}</div>
      <div class="rr-chart-box"><canvas id="srCanvas"></canvas></div>`;
    _srDrawChart(datasets, labels);
  } else {
    const t = data[srSelected[0]];
    const valid = t.ranks.filter(x => x !== null);
    const best = valid.length ? Math.min(...valid) : null;
    const worst = valid.length ? Math.max(...valid) : null;
    const aliasNote = t.aliases.length ? `<div class="rr-player-sub">ex: ${t.aliases.join(', ')}</div>` : '';
    const badges = years.map((y, i) => {
      const r = t.ranks[i];
      const c = r == null ? 'var(--border)' : _drRankColor(r);
      return `<div class="rr-month-badge"><span class="rr-badge-label">${y}</span><span class="rr-badge-rank" style="color:${c}">${r ?? '—'}</span></div>`;
    }).join('');
    panel.innerHTML = `
      <div class="rr-player-header">
        <div><div class="rr-player-name">${t.team}</div><div class="rr-player-sub">Regular-Season-Finish über die Jahre</div>${aliasNote}</div>
        <div class="rr-pills">
          <div class="rr-pill"><span class="rr-pill-val" style="color:#e0794a">${best ?? '–'}</span><span class="rr-pill-label">Bestes</span></div>
          <div class="rr-pill"><span class="rr-pill-val" style="color:#d9695f">${worst ?? '–'}</span><span class="rr-pill-label">Schlechtestes</span></div>
          <div class="rr-pill"><span class="rr-pill-val" style="color:#4d7bb0">${t.avg != null ? t.avg.toFixed(1) : '–'}</span><span class="rr-pill-label">Ø Platz</span></div>
          <div class="rr-pill"><span class="rr-pill-val" style="color:#4caf81">${t.seasons}</span><span class="rr-pill-label">Saisons</span></div>
        </div>
      </div>
      <div class="rr-chart-box"><canvas id="srCanvas"></canvas></div>
      <div class="rr-badges">${badges}</div>`;
    _srDrawChart([{ team: t, values: t.ranks, color: SR_COMPARE_COLORS[0] }], labels);
  }
}

let srChart = null;
function _srDrawChart(datasets, labels) {
  if (srChart) { srChart.destroy(); srChart = null; }
  const canvas = document.getElementById('srCanvas');
  if (!canvas || typeof Chart === 'undefined') return;
  const ctx = canvas.getContext('2d');
  const maxRank = Math.max(12, ...datasets.flatMap(d => d.values.filter(v => v != null)));

  const chartDatasets = datasets.map(d => {
    const grad = ctx.createLinearGradient(0, 0, 0, 260);
    grad.addColorStop(0, _drHexToRgba(d.color, 0.22));
    grad.addColorStop(1, _drHexToRgba(d.color, 0));
    return {
      label: d.team.team,
      data: d.values,
      borderColor: d.color,
      backgroundColor: datasets.length === 1 ? grad : 'transparent',
      pointBackgroundColor: d.values.map(r => datasets.length === 1 ? _drRankColor(r) : d.color),
      pointBorderColor: getComputedStyle(document.body).getPropertyValue('--surface') || '#fff',
      pointBorderWidth: 2, pointRadius: 6, pointHoverRadius: 9, borderWidth: 2.5,
      fill: datasets.length === 1, tension: 0.3, spanGaps: true,
    };
  });
  const styles = getComputedStyle(document.body);
  const textColor = styles.getPropertyValue('--text') || '#333';
  const mutedColor = styles.getPropertyValue('--muted') || '#888';
  const borderColor = styles.getPropertyValue('--border') || '#ddd';
  const surfaceColor = styles.getPropertyValue('--surface2') || '#fff';

  srChart = new Chart(ctx, {
    type: 'line',
    data: { labels, datasets: chartDatasets },
    options: {
      responsive: true, maintainAspectRatio: true, aspectRatio: 2.4,
      plugins: {
        legend: { display: datasets.length > 1, labels: { color: textColor, font: { size: 11, weight: '700' } } },
        tooltip: {
          backgroundColor: surfaceColor, borderColor, borderWidth: 1, titleColor: textColor, bodyColor: '#e0794a', padding: 10,
          callbacks: { label: c => c.raw === null ? `${c.dataset.label}: keine Daten` : `${c.dataset.label}: Platz ${c.raw}` }
        }
      },
      scales: {
        y: { reverse: true, min: 1, max: maxRank, grid: { color: borderColor }, border: { color: borderColor },
             ticks: { color: mutedColor, font: { size: 10 }, stepSize: 1 }, title: { display: true, text: 'Platzierung', color: mutedColor, font: { size: 10 } } },
        x: { grid: { color: borderColor }, border: { color: borderColor }, ticks: { color: textColor, font: { size: 11, weight: '700' } } }
      }
    }
  });
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

/* ---------- NFL Power Rankings (Conference/Division/NFL, W-L oder FPI) ---------- */
let nflRankingsState = { season: null, week: null, scope: 'nfl', metric: 'wl' };

function renderNflRankings() {
  const wrap = document.getElementById('nflRankingsContent');
  const seasons = Object.keys((typeof NFL_STANDINGS !== 'undefined' && NFL_STANDINGS) || {});

  if (!seasons.length) {
    wrap.innerHTML = emptyState(
      'Noch keine NFL-Standings',
      'Diese Seite zeigt ein wöchentliches Rolling Ranking aller 32 NFL-Teams (Conference/Division/NFL gesamt), wahlweise nach Sieg-Quote oder ESPN FPI. Sobald die reguläre NFL-Saison läuft und der automatische ESPN-Sync (täglich 9 & 21 Uhr) Wochenwerte liefert, füllt sie sich automatisch.',
      '🏈'
    );
    return;
  }

  const season = nflRankingsState.season && seasons.includes(nflRankingsState.season) ? nflRankingsState.season : seasons[seasons.length - 1];
  const weeks = Object.keys(NFL_STANDINGS[season] || {}).map(Number).sort((a, b) => a - b);
  const week = nflRankingsState.week && weeks.includes(nflRankingsState.week) ? nflRankingsState.week : weeks[weeks.length - 1];
  const scope = nflRankingsState.scope || 'nfl';
  const metric = nflRankingsState.metric || 'wl';
  nflRankingsState = { season, week, scope, metric };

  const teams = (NFL_STANDINGS[season][week] || []).slice();
  const fpiRows = (typeof NFL_FPI !== 'undefined' && NFL_FPI[season] && NFL_FPI[season][week]) || null;
  const fpiByAbbr = {};
  if (fpiRows) fpiRows.forEach(r => { fpiByAbbr[r.abbr] = r; });

  function sortGroup(list) {
    if (metric === 'fpi' && fpiRows) {
      return list.slice().sort((a, b) => (fpiByAbbr[b.abbr]?.fpi ?? -999) - (fpiByAbbr[a.abbr]?.fpi ?? -999));
    }
    return list.slice().sort((a, b) => (b.winPct - a.winPct) || ((b.pf - b.pa) - (a.pf - a.pa)));
  }

  function rowHtml(t, rank) {
    const fpi = fpiByAbbr[t.abbr];
    const diff = t.pf - t.pa;
    return `<tr>
      <td>${rank}</td>
      <td style="text-align:left;font-weight:600">${t.name} <span style="color:var(--muted);font-weight:400">${t.abbr}</span></td>
      <td>${t.wins}-${t.losses}${t.ties ? '-' + t.ties : ''}</td>
      <td>${(t.winPct * 100).toFixed(1)}%</td>
      <td>${diff >= 0 ? '+' : ''}${diff.toFixed(0)}</td>
      ${fpiRows ? `<td>${fpi ? fpi.fpi.toFixed(1) : '—'}</td>` : ''}
    </tr>`;
  }

  function tableHtml(title, list) {
    if (!list.length) return '';
    const sorted = sortGroup(list);
    return `
      <div class="board-table-wrap" style="margin-bottom:22px">
        ${title ? `<div style="font-weight:800;font-size:13px;margin:0 0 8px;color:var(--text)">${title}</div>` : ''}
        <table class="board">
          <thead><tr>
            <th class="round-label">#</th><th>Team</th><th>W-L</th><th>Quote</th><th>Diff</th>
            ${fpiRows ? '<th>FPI</th>' : ''}
          </tr></thead>
          <tbody>${sorted.map((t, i) => rowHtml(t, i + 1)).join('')}</tbody>
        </table>
      </div>`;
  }

  let body = '';
  if (metric === 'fpi' && !fpiRows) {
    body = emptyState('FPI noch nicht verfügbar', 'ESPN\'s FPI-Wert konnte für diese Woche (noch) nicht synchronisiert werden — Sieg-Quote weiter nutzbar, oder eine andere Woche wählen.', '📊');
  } else if (scope === 'nfl') {
    body = tableHtml(null, teams);
  } else if (scope === 'conference') {
    body = ['AFC', 'NFC'].map(c => tableHtml(c === 'AFC' ? '🦅 AFC' : '🏈 NFC', teams.filter(t => t.conference === c))).join('');
  } else {
    body = ['AFC', 'NFC'].map(c => ['East', 'North', 'South', 'West'].map(d =>
      tableHtml(`${c} ${d}`, teams.filter(t => t.conference === c && t.division === d))
    ).join('')).join('');
  }

  wrap.innerHTML = `
    <div class="db-controls">
      <span style="font-size:12px;color:var(--muted);font-weight:700">Ansicht:</span>
      <div class="db-pos-filters" id="nflScopeSelector"></div>
    </div>
    <div class="db-controls">
      <span style="font-size:12px;color:var(--muted);font-weight:700">Ranking nach:</span>
      <div class="db-pos-filters" id="nflMetricSelector"></div>
    </div>
    <div class="db-controls">
      <span style="font-size:12px;color:var(--muted);font-weight:700">Woche:</span>
      <div class="db-pos-filters" id="nflWeekSelector"></div>
    </div>
    ${body}
  `;

  const scopeSel = document.getElementById('nflScopeSelector');
  [['conference', 'Conference'], ['division', 'Division'], ['nfl', 'NFL']].forEach(([key, label]) => {
    const btn = document.createElement('button');
    btn.className = 'db-pos-btn' + (scope === key ? ' active' : '');
    btn.textContent = label;
    btn.onclick = () => { nflRankingsState.scope = key; renderNflRankings(); };
    scopeSel.appendChild(btn);
  });

  const metricSel = document.getElementById('nflMetricSelector');
  [['wl', 'Win-Loss'], ['fpi', 'ESPN FPI']].forEach(([key, label]) => {
    const btn = document.createElement('button');
    btn.className = 'db-pos-btn' + (metric === key ? ' active' : '');
    btn.textContent = label;
    btn.onclick = () => { nflRankingsState.metric = key; renderNflRankings(); };
    metricSel.appendChild(btn);
  });

  const weekSel = document.getElementById('nflWeekSelector');
  weeks.forEach(w => {
    const btn = document.createElement('button');
    btn.className = 'db-pos-btn' + (w === week ? ' active' : '');
    btn.textContent = 'Woche ' + w;
    btn.onclick = () => { nflRankingsState.week = w; renderNflRankings(); };
    weekSel.appendChild(btn);
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

/* Einheitliches Team-Label mit Owner-Namen, z.B. "🐻 The Bear Witch
   Project (Kong Power)" -- ueberall verwenden, wo ein Team angezeigt
   wird, damit man den Owner nicht mehr extra fragen muss. */
function teamLabelWithOwner(team) {
  if (!team) return '';
  const emoji = team.emoji || '🏈';
  return team.owner ? `${emoji} ${team.name} <span class="owner-tag">(${team.owner})</span>` : `${emoji} ${team.name}`;
}

/* ---------- Trade Analyzer ---------- */
let tradeState = { sideA: [], sideB: [], teamA: '', teamB: '' };

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

/* Projizierte Saisonpunkte eines Teams (ohne K/DST), optional mit
   Trade-Anpassung: removeNames werden rausgerechnet, addNames (Spieler,
   die von der anderen Seite reinkommen) werden dazugerechnet. */
function _projectedPointsFor(name) {
  if (typeof PLAYER_PROJECTIONS === 'undefined') return null;
  const p = PLAYER_PROJECTIONS.players.find(x => x.name === name);
  return p ? p.projectedPoints : null;
}

function teamProjectedTotal(teamName, removeNames, addNames) {
  const team = LEAGUE_TEAMS.find(t => t.name === teamName);
  if (!team) return null;
  const { players } = _teamRosterForAverages(team);
  const remove = new Set(removeNames || []);
  let total = 0, counted = 0;
  players.forEach(p => {
    if (['K', 'DST', 'D/ST'].includes((p.pos || '').split('/')[0])) return;
    if (remove.has(p.name)) return;
    const pts = _projectedPointsFor(p.name);
    if (pts != null) { total += pts; counted++; }
  });
  (addNames || []).forEach(n => {
    const pts = _projectedPointsFor(n);
    if (pts != null) { total += pts; counted++; }
  });
  return { total, counted };
}

function renderTrade() {
  const wrap = document.getElementById('tradeContent');
  const teamOptions = '<option value="">— Team wählen —</option>' +
    LEAGUE_TEAMS.map(t => `<option value="${t.name}">${t.emoji} ${t.name}${t.owner ? ' (' + t.owner + ')' : ''}</option>`).join('');

  wrap.innerHTML = `
    <div class="trade-cols">
      <div class="trade-col">
        <div class="section-label" style="margin-top:0">Team A gibt</div>
        <select id="tradeTeamA" class="board-mobile-team-select" style="margin-bottom:10px" onchange="onTradeTeamChange('A')">${teamOptions}</select>
        <input type="text" id="tradeSearchA" class="db-search" placeholder="Spieler suchen…" oninput="tradeSearch('A')">
        <div id="tradeSuggestA" class="trade-suggest"></div>
        <div id="tradeAssetsA"></div>
        <div class="trade-total" id="tradeTotalA"></div>
      </div>
      <div class="trade-col">
        <div class="section-label" style="margin-top:0">Team B gibt</div>
        <select id="tradeTeamB" class="board-mobile-team-select" style="margin-bottom:10px" onchange="onTradeTeamChange('B')">${teamOptions}</select>
        <input type="text" id="tradeSearchB" class="db-search" placeholder="Spieler suchen…" oninput="tradeSearch('B')">
        <div id="tradeSuggestB" class="trade-suggest"></div>
        <div id="tradeAssetsB"></div>
        <div class="trade-total" id="tradeTotalB"></div>
      </div>
    </div>
    <div id="tradeVerdict" class="info-banner" style="text-align:center;font-weight:700"></div>
    <div id="tradeImpact"></div>
    <div class="page-sub" style="margin-top:18px">Für verbesserte Trade Talks mit echten, verbindlichen Werten:</div>
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:8px">
      <a href="https://dynasty-daddy.com/trade-calculator" target="_blank" rel="noopener" class="theme-toggle" style="text-decoration:none;display:inline-block">🔗 Dynasty Daddy Trade Calculator</a>
      <a href="https://keeptradecut.com/trade-calculator" target="_blank" rel="noopener" class="theme-toggle" style="text-decoration:none;display:inline-block">🔗 KeepTradeCut Trade Calculator</a>
    </div>
  `;
  document.getElementById('tradeTeamA').value = tradeState.teamA;
  document.getElementById('tradeTeamB').value = tradeState.teamB;
  renderTradeAssets();
}

function onTradeTeamChange(side) {
  tradeState['team' + side] = document.getElementById('tradeTeam' + side).value;
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

  renderTradeImpact();
}

function renderTradeImpact() {
  const host = document.getElementById('tradeImpact');
  if (!host) return;
  const { teamA, teamB, sideA, sideB } = tradeState;

  if (typeof PLAYER_PROJECTIONS === 'undefined' || !PLAYER_PROJECTIONS.players.length) {
    host.innerHTML = `<div class="page-sub" style="margin-top:10px">Geschätzte Team-Auswirkung erscheint automatisch, sobald Player Projections geladen sind.</div>`;
    return;
  }
  if (!teamA || !teamB) {
    host.innerHTML = `<div class="page-sub" style="margin-top:10px">Team A und Team B oben auswählen, um die geschätzte Punkte-/Rang-Auswirkung des Trades zu sehen.</div>`;
    return;
  }

  const playerNamesA = sideA.filter(a => a.kind === 'player').map(a => a.name);
  const playerNamesB = sideB.filter(a => a.kind === 'player').map(a => a.name);
  const pickCount = sideA.filter(a => a.kind === 'pick').length + sideB.filter(a => a.kind === 'pick').length;

  // Baseline-Projektion aller 12 Teams (fuer Rang-Kontext)
  const baseline = LEAGUE_TEAMS.map(t => ({ name: t.name, total: teamProjectedTotal(t.name, [], []).total }));
  const baselineSorted = baseline.slice().sort((a, b) => b.total - a.total);
  const baseRank = name => baselineSorted.findIndex(x => x.name === name) + 1;

  const newTotalA = teamProjectedTotal(teamA, playerNamesA, playerNamesB);
  const newTotalB = teamProjectedTotal(teamB, playerNamesB, playerNamesA);

  const newSorted = baseline.map(t => {
    if (t.name === teamA) return { name: t.name, total: newTotalA.total };
    if (t.name === teamB) return { name: t.name, total: newTotalB.total };
    return t;
  }).sort((a, b) => b.total - a.total);
  const newRank = name => newSorted.findIndex(x => x.name === name) + 1;

  const row = (label, teamName, oldTotal, newTotal) => {
    const diff = newTotal.total - oldTotal.total;
    const rankDiff = baseRank(teamName) - newRank(teamName); // positiv = besser (weiter oben)
    const diffHtml = diff >= 0 ? `<span style="color:var(--green)">+${diff.toFixed(1)}</span>` : `<span style="color:var(--red)">${diff.toFixed(1)}</span>`;
    const rankHtml = rankDiff > 0 ? `<span style="color:var(--green)">▲ ${rankDiff}</span>` : rankDiff < 0 ? `<span style="color:var(--red)">▼ ${Math.abs(rankDiff)}</span>` : '<span style="color:var(--muted)">–</span>';
    return `
      <div class="trade-impact-row">
        <div style="font-weight:700">${label}: ${teamName}</div>
        <div>${oldTotal.total.toFixed(1)} → ${newTotal.total.toFixed(1)} Pkte proj. (${diffHtml})</div>
        <div>Rang #${baseRank(teamName)} → #${newRank(teamName)} (${rankHtml})</div>
      </div>`;
  };

  host.innerHTML = `
    <div class="section-label">📈 Geschätzte Team-Auswirkung (proj. Saisonpunkte, ohne K/DST)</div>
    <div class="trade-impact-box">
      ${row('Team A', teamA, { total: teamProjectedTotal(teamA, [], []).total }, newTotalA)}
      ${row('Team B', teamB, { total: teamProjectedTotal(teamB, [], []).total }, newTotalB)}
    </div>
    ${pickCount ? `<div class="page-sub" style="margin-top:6px">${pickCount} Pick(s) im Trade fließen hier nicht ein (keine Punkteprojektion für Picks).</div>` : ''}
  `;
}

/* ---------- Future Draft Boards ---------- */
let futureBoardsState = { year: 2027 };

function showFutureBoards() { navigate('futureboards'); renderFutureBoards(); }

function _picksHeldByTeam(year) {
  // Baseline: 15 Runden fuer 2026 (abzueglich Keeper-Runden, die nicht
  // handelbar sind), 5 Runden (Runde 1-5, mehr tracken wir noch nicht)
  // fuer 2027+. Trades verschieben Picks zwischen Teams.
  const counts = {};
  LEAGUE_TEAMS.forEach(t => { counts[t.name] = 0; });

  if (year === 2026) {
    DRAFT_2026_TEAMS.forEach(dt => { counts[dt.team] = TOTAL_DRAFT_ROUNDS - dt.keepers.length; });
    (typeof TRADED_PICKS_2026 !== 'undefined' ? TRADED_PICKS_2026 : []).forEach(p => {
      counts[p.from] = (counts[p.from] || 0) - 1;
      counts[p.owner] = (counts[p.owner] || 0) + 1;
    });
  } else {
    LEAGUE_TEAMS.forEach(t => { counts[t.name] = 5; });
    (FUTURE_PICKS[year] || []).forEach(p => {
      counts[p.from] = (counts[p.from] || 0) - 1;
      counts[p.owner] = (counts[p.owner] || 0) + 1;
    });
  }
  return counts;
}

function renderPicksOverview() {
  const years = [2026, ...Object.keys(FUTURE_PICKS).map(Number).sort()];
  const byYear = years.map(y => ({ year: y, counts: _picksHeldByTeam(y) }));

  const rows = LEAGUE_TEAMS.map(t => {
    const cells = byYear.map(({ year, counts }) => {
      const baseline = year === 2026
        ? (TOTAL_DRAFT_ROUNDS - (DRAFT_2026_TEAMS.find(dt => dt.team === t.name) || { keepers: [] }).keepers.length)
        : 5;
      const n = counts[t.name] ?? baseline;
      const diff = n - baseline;
      const diffHtml = diff > 0 ? `<span style="color:var(--green)">+${diff}</span>`
        : diff < 0 ? `<span style="color:var(--red)">${diff}</span>` : '';
      return `<td><b>${n}</b> ${diffHtml}</td>`;
    }).join('');
    return `<tr><td style="text-align:left;font-weight:600">${t.emoji} ${t.name}</td>${cells}</tr>`;
  }).join('');

  const head = byYear.map(({ year }) => `<th>${year}</th>`).join('');

  return `
    <div class="section-label">📦 Picks-Übersicht (wie viele Picks besitzt jedes Team gerade)</div>
    <div class="board-table-wrap">
      <table class="board board-compact">
        <thead><tr><th class="round-label">Team</th>${head}</tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <div class="page-sub" style="margin-top:8px">2026 = offene (nicht-Keeper-)Runden von 15. 2027–2029 = Runden 1–5 (Baseline 5). Grün/Rot zeigt Abweichung von der Baseline durch Trades.</div>
  `;
}

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
    ${renderPicksOverview()}
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
      <td>${owner ? teamLabelWithOwner(owner) : '<span style="color:var(--green)">Free Agent</span>'}</td>
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
      <td>${owner ? teamLabelWithOwner(owner) : '<span style="color:var(--green)">Free Agent</span>'}</td>
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

  // Trade-Counter: wie oft taucht jedes Team als Handelspartner auf
  const counts = {};
  LEAGUE_TEAMS.forEach(t => { counts[t.name] = 0; });
  TRADES.forEach(t => {
    counts[t.teamA] = (counts[t.teamA] || 0) + 1;
    counts[t.teamB] = (counts[t.teamB] || 0) + 1;
  });
  const ranked = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const maxCount = ranked.length ? ranked[0][1] : 1;

  const counterHtml = `
    <div class="trade-counter-box">
      <div class="section-label" style="margin-top:0">🔥 Trade-Aktivität</div>
      ${ranked.map(([name, n]) => {
        const team = LEAGUE_TEAMS.find(t => t.name === name);
        const pct = maxCount ? Math.round((n / maxCount) * 100) : 0;
        return `
          <div class="trade-counter-row">
            <div class="trade-counter-label">${team ? team.emoji : '🏈'} ${name}</div>
            <div class="trade-counter-bar-wrap"><div class="trade-counter-bar" style="width:${pct}%"></div></div>
            <div class="trade-counter-n">${n}</div>
          </div>`;
      }).join('')}
    </div>`;

  wrap.innerHTML = `
    <div class="info-banner">
      ESPN führt in unserer Liga keine Draft-Picks für 2027 und später. Trades mit solchen Picks
      werden deshalb hier von Hand nachgetragen (siehe <code>data/trades.js</code>).
    </div>
    <div class="trade-history-layout">
      <div class="trade-history-main">
        <div class="section-label" style="margin-top:0">Chronik</div>
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
      </div>
      <div class="trade-history-side">${counterHtml}</div>
    </div>
  `;
}

function formatTradeDate(iso) {
  const d = new Date(iso + 'T12:00:00');
  return d.toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' });
}

document.addEventListener('DOMContentLoaded', () => {
  updateThemeBtn();
  _initialRoute();
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
