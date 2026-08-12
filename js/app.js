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
  'home', 'roster', 'draftboard', 'keepers',
  'standings', 'matchups', 'trade', 'tradehistory',
  'livescores', 'rules'
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
function showStandings() { navigate('standings'); }
function showMatchups() { navigate('matchups'); }
function showTrade() { navigate('trade'); }
function showTradeHistory() { navigate('tradehistory'); }
function showLiveScores() { navigate('livescores'); }
function showRules() { navigate('rules'); }

function toggleMobileNav() {
  document.getElementById('mobileNavDropdown').classList.toggle('open');
}
function closeMobileNav() {
  const el = document.getElementById('mobileNavDropdown');
  if (el) el.classList.remove('open');
}

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

  // Spaltenreihenfolge der Teams = noch nicht final, da die Pick-Reihenfolge
  // (Draft-Slot 1-12) erst von ESPN vergeben wird. Bis dahin alphabetisch/
  // wie gemeldet, in Team-Objekt-Reihenfolge.
  const teams = DRAFT_2026_TEAMS;

  let head = `<tr><th class="round-label">Runde</th>` +
    teams.map(t => `<th>${t.team}</th>`).join('') + `</tr>`;

  let rows = '';
  for (let round = 1; round <= TOTAL_DRAFT_ROUNDS; round++) {
    rows += `<tr><th class="round-label">R${round}</th>`;
    teams.forEach(t => {
      const k = t.keepers.length;
      const startRound = TOTAL_DRAFT_ROUNDS - k + 1;
      if (round >= startRound) {
        const player = t.keepers[round - startRound];
        rows += `<td><div class="cell-keeper">${player.name}<small>${player.nfl} · ${player.pos}</small></div></td>`;
      } else {
        rows += `<td><div class="cell-open">Offen</div></td>`;
      }
    });
    rows += `</tr>`;
  }

  wrap.innerHTML = `
    <div class="info-banner">
      <b>${TOTAL_DRAFT_ROUNDS} Runden</b> · 12 Teams · bislang keine getradeten Picks.
      Keeper werden von unten aufgefüllt: ein Team mit K Keepern belegt automatisch
      die letzten K Runden seines eigenen Picks. Da niemand mehr als
      <b>${MAX_KEEPERS} Keeper</b> haben kann, bleiben <b>Runde 1–5 für alle Teams offen</b>.
      Die konkrete Pick-Reihenfolge (Slot 1–12) je Runde steht noch nicht fest und wird
      ergänzt, sobald ESPN sie vergibt.
    </div>
    <div class="board-table-wrap">
      <table class="board">
        <thead>${head}</thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <div class="legend">
      <div class="legend-item"><span class="legend-swatch" style="background:var(--pick-own-bg);border:1px solid var(--pick-own-color)"></span> Keeper-Pick</div>
      <div class="legend-item"><span class="legend-swatch" style="background:var(--pick-open-bg);border:1px solid var(--pick-open-color)"></span> Offener Pick (Draft Day)</div>
    </div>
  `;
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  updateThemeBtn();
  renderHome();
  navigate('home');
});
