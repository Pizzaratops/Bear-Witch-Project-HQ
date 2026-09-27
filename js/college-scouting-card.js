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
let csState = { pos: 'WR', search: '', sel: null };

const CS_PRIMARY_STAT = { WR: 'yds', TE: 'yds', RB: 'rushYds', QB: 'passYds' };
const CS_PRIMARY_LABEL = { WR: 'Rec-Yds', TE: 'Rec-Yds', RB: 'Rush-Yds', QB: 'Pass-Yds' };

function _csKey(s) {
  return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
    .replace(/\b(jr|sr|ii|iii|iv|v)\b\.?/g, '').replace(/[^a-z0-9]/g, '');
}

function showCollegeScouting() {
  navigate('collegescouting');
  renderCollegeScouting();
}

function csSetPos(p) { csState.pos = p; csState.sel = null; csState.search = ''; renderCollegeScouting(); }
function csSelect(id) { csState.sel = id; _csRenderList(); _csRenderMain(); }

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
  const all = (COLLEGE_SCOUTING.recent[pos] || []).slice();
  if (!csState.sel || !all.some(p => p.id === csState.sel)) {
    const sorted = all.slice().sort((a, b) => (b[CS_PRIMARY_STAT[pos]] || 0) - (a[CS_PRIMARY_STAT[pos]] || 0));
    csState.sel = (sorted[0] || {}).id || null;
  }
  wrap.innerHTML = `
    <div class="dna-controls">
      <div class="rr-tb-group">${CS_POSITIONS.map(p => `<button class="rr-tb-btn${p === pos ? ' rr-tb-active' : ''}" onclick="csSetPos('${p}')">${p}</button>`).join('')}</div>
    </div>
    <div class="dna-layout">
      <div class="dna-side">
        <input class="dna-search" placeholder="🔍 Prospect suchen …" value="${csState.search.replace(/"/g, '&quot;')}" oninput="csState.search=this.value;_csRenderList()">
        <div class="dna-list-head"><span>Prospect</span><span title="${CS_PRIMARY_LABEL[pos]} in der jeweils letzten erfassten College-Saison">${CS_PRIMARY_LABEL[pos]}</span></div>
        <div class="dna-list" id="csList"></div>
        <div class="dna-foot">${all.length} ${pos}-Prospects (letzte ${COLLEGE_SCOUTING.meta.years.slice(-2).join('/')} Jahrgänge, Mindest-Volumen erfüllt).</div>
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
// Ergebnis + RAS beim NFL Profile Comp).
function _csMatchBox(title, items, emptyText, renderExtra) {
  return `
    <div class="dna-match-box">
      <div class="dna-match-title">${title}</div>
      ${items && items.length ? items.map((m, i) => `
        <div class="dna-match">
          <span class="dna-match-score">#${i + 1}</span>
          <span class="dna-match-name">${m.name} <small>${m.team} · ${m.year}${renderExtra ? ' · ' + renderExtra(m) : ''}</small></span>
        </div>`).join('') : `<div class="page-sub">${emptyText}</div>`}
    </div>`;
}

function _csRenderMain() {
  const host = document.getElementById('csMain');
  if (!host) return;
  const pos = csState.pos;
  const me = (COLLEGE_SCOUTING.recent[pos] || []).find(p => p.id === csState.sel);
  if (!me) { host.innerHTML = emptyState('Kein Prospect gewählt', 'Links einen Prospect auswählen.', '🎓'); return; }

  const stat = CS_PRIMARY_STAT[pos];
  const prodComps = (COLLEGE_SCOUTING.comps[pos] || {})[me.id] || [];

  host.innerHTML = `
    <div class="dna-head">
      <div>
        <div class="dna-name">${me.name}</div>
        <div class="page-sub">${pos} · ${me.team} · ${me.year} · ${me.conf || ''}</div>
      </div>
      <div class="dna-score" title="${CS_PRIMARY_LABEL[pos]}"><b>${me[stat] != null ? Math.round(me[stat]) : '—'}</b><small>${CS_PRIMARY_LABEL[pos]}</small></div>
    </div>
    <div class="dna-matches">
      ${_csMatchBox('🎓 College Production Comp — „Produziert wie …“', prodComps, 'Kein vergleichbares Produktionsprofil gefunden (zu wenige vollständige Datensätze im Pool).')}
      <div id="csNflProfileBox">
        <div class="dna-match-box"><div class="dna-match-title">🏈 NFL Profile Comp — „Profiliert wie …“</div><div class="page-sub">Lade …</div></div>
      </div>
    </div>
    <div class="page-sub" style="margin-top:10px;font-size:11px">College Production Comp: nächste Nachbarn nach Produktions-Profil (Mahalanobis-Distanz), unabhängig vom NFL-Erfolg. NFL Profile Comp weiter unten: Pre-Draft-Rollenarchetyp gegen tatsächlich gedraftete Spieler mit ähnlichem Produktions+Größen-Profil — <b>keine Erfolgs- oder Talentprognose</b>.</div>`;

  _nflProfileCompLoad().then(() => _csRenderNflProfileBox(pos, me.id)).catch(e => {
    const box = document.getElementById('csNflProfileBox');
    if (box) box.innerHTML = `<div class="dna-match-box"><div class="dna-match-title">🏈 NFL Profile Comp</div><div class="page-sub">${e.message}</div></div>`;
  });
}

function _csRenderNflProfileBox(pos, playerId) {
  const box = document.getElementById('csNflProfileBox');
  if (!box) return;
  // Kann sich seit dem Start des Ladevorgangs geändert haben (Nutzer hat
  // Position/Prospect gewechselt) -- nicht mehr passende Antwort verwerfen.
  if (csState.pos !== pos || csState.sel !== playerId) return;

  const comps = (NFL_PROFILE_COMP.comps[pos] || {})[playerId] || [];
  const stats = NFL_PROFILE_COMP.stats[pos] || {};
  const extra = m => `Draft: ${m.draftRound != null ? `Rd. ${m.draftRound} Pick ${m.draftPick}` : 'undrafted'} (${m.draftYear}) · RAS ${m.ras != null ? m.ras : 'unbekannt'}`;
  box.innerHTML = `
    ${_csMatchBox('🏈 NFL Profile Comp — „Profiliert wie …“', comps,
      'Kein Vergleich möglich (Production- oder Größen-Daten für diesen Prospect unvollständig).', extra)}
    <div class="page-sub" style="font-size:11px;margin-top:4px">Vergleichsbasis: ${stats.matched || 0} historisch gedraftete ${pos}s mit vollständigem Profil (aus ${stats.poolSize || 0} insgesamt gematcht). RAS = eigener, an ras.football angelehnter Athletik-Score (0–10) DES COMPS, nicht des Prospects selbst — der hat sein Combine/Draft noch vor sich.</div>`;
}
