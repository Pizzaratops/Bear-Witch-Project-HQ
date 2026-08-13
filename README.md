# Bear Witch Project HQ 🐻🏈

**🔗 Live-Seite: [pizzaratops.github.io/Bear-Witch-Project-HQ](https://pizzaratops.github.io/Bear-Witch-Project-HQ/)**

Website zur Verwaltung der Fantasy-Football-Liga **Foodball** (ESPN League ID `91260355`).
Aufgebaut im Stil von Taco Tuesday HQ, Colorway an die Chicago Bears angelehnt (gedämpftes
Orange, Navy Blue), Light + Dark Mode.

## Struktur

```
index.html              Single-Page-App: Header, Subnav, alle Reiter
css/style.css            Bears-Colorway (Light/Dark über CSS-Variablen)
js/app.js                Navigation + Rendering
js/espn-sync.js          ESPN-Konfiguration (Liga-ID, Season, Positions-/Team-Maps)
data/teams.js            12 Teams der Liga
data/draft2026.js        Gemeldete Keeper je Team (Stand vor Keeper Lock Date)
data/rosters-live.js     Voller Kader je Team — automatisch von ESPN synchronisiert
scripts/sync-espn-rosters.js   Sync-Script (Node), schreibt data/rosters-live.js
.github/workflows/sync-espn-rosters.yml   Taeglicher Auto-Sync via GitHub Actions
```

## App installieren

Der Header hat jetzt (wie bei Taco Tuesday HQ) einen **"⬇️ App installieren"**-Button. Er
erscheint automatisch, sobald der Browser die Seite als installierbar erkennt (Chrome/Edge/
Android — braucht gültiges `manifest.json` + registrierten Service Worker + HTTPS, alles
vorhanden). Auf iOS gibt es keinen programmatischen Install-Trigger; dort erscheint stattdessen
ein **"📲 Zum Home-Bildschirm"**-Button mit Anleitung (Teilen-Symbol → Zum Home-Bildschirm).

## Rolling Rankings & Week by Week

**Rolling Rankings** (`data/dynasty-rolling.js`) hält Dynasty-Board-Schnappschüsse über Zeit fest,
angezeigt als Sidebar mit sortierbarer Liste + Chart.js-Verlaufsdiagramm (bis zu 3 Spieler im
Vergleich). Aktuell 6 Snapshots: 2021–2024 (historische Einzelquellen-Rankings, je 100–250
Spieler), 2025 (Einzelquelle, 250 Spieler), 2026 (aktueller 4-Quellen-Dynasty-Board-Schnitt, 942
Spieler). Neuen Snapshot anlegen (z. B. nach neuen Ranking-Uploads):
```bash
node scripts/snapshot-dynasty-rolling.js "Label, z.B. Woche 3"
```

**Week by Week Rankings** (`data/weekly-scores.js`) zeigt wöchentliche Matchup-Punktzahlen als
Power-Ranking-Tabelle mit Wochen-Umschalter. Läuft automatisch über
`scripts/sync-espn-weekly-scores.js` (GitHub Action `sync-espn-weekly-scores.yml`, täglich 9 &
21 Uhr Berlin-Zeit). Alternativ lassen sich Werte auch manuell direkt in `data/weekly-scores.js`
eintragen (gleiches Format wie beim automatischen Sync).

## Trade Analyzer

Werte = Durchschnitt aus KTC- und Dynasty-Daddy-Trade-Value (`data/trade-values.js`, gleiche
0–10000er Skala). Picks (auch die aus `data/trades.js` / Future Draft Boards) bekommen grobe
Schätzwerte aus `PICK_VALUES` in derselben Datei — das sind **keine** offiziellen KTC/Dynasty-
Daddy-Zahlen, nur eine Orientierung. Für verbindliche Werte verlinkt die Seite direkt auf die
echten Rechner von Dynasty Daddy und KeepTradeCut. Klick auf eine Zelle im Draft Board oder in
den Future Draft Boards öffnet den Trade Analyzer mit diesem Spieler/Pick vorausgefüllt.

## Player Rankings & Player Projections

Beide Seiten zeigen zusätzlich, welches Team (falls überhaupt) einen Spieler aktuell besitzt
(`ownerOfPlayer()` in `js/app.js`, prüft Keeper-Listen + `ROSTERS_LIVE`), dazu Positions-Filter,
Suche und einen "Nur Best Available"-Schalter, der eigene Spieler ausblendet.

- **Player Projections** (`data/projections.js`) — ESPNs Saisonprojektionen, über
  `scripts/sync-espn-projections.js` synct. Läuft schon vor Saisonstart, da ESPN Projektionen
  bereits in der Preseason veröffentlicht.
- **Player Rankings** (`data/player-stats.js`) — baut sich Woche für Woche aus tatsächlich
  erzielten Punkten auf (`scripts/sync-espn-player-stats.js`), bleibt also bis Woche 1 leer.

Beide laufen automatisch über die GitHub Action `sync-espn-projections-stats.yml` im selben
Rhythmus wie der Weekly-Scores-Sync (9 & 21 Uhr Berlin-Zeit).

**Achtung, ESPN-API-Detail:** Der `kona_player_info`-Endpoint für Projektionen/Statistiken
braucht einen `x-fantasy-filter`-Header statt normaler Query-Parameter. Das exakte Response-
Format (`stats`-Array mit `statSourceId`/`statSplitTypeId`) kann sich bei ESPN ändern — falls
eines der beiden Scripts mit einem Feld-Fehler abbricht, zuerst dort ansetzen.

## Future Draft Boards (2027–2029)

Zeigt Runden 1–5 je Jahr, Spalten = Teams. Default ist "Own" (Team besitzt seinen Pick noch
selbst) — nur tatsächlich getradete Picks sind farblich hervorgehoben, mit Angabe des
ursprünglichen Besitzers. Datenquelle: `FUTURE_PICKS` in `data/trades.js`, ein Jahr `{round,
from, owner}`-Einträge. Neuer Trade mit Future Picks → einfach dort ergänzen.

## ESPN Roster Sync

**Lokal testen:**
```bash
node scripts/sync-espn-rosters.js
```

**Falls die Liga privat ist** (ESPN antwortet mit 401/403), zwei Cookies aus dem
eingeloggten Browser mitgeben (DevTools → Application → Cookies → fantasy.espn.com):
```bash
ESPN_S2="..." SWID="{...}" node scripts/sync-espn-rosters.js
```

**Automatisch im Repo:** Die GitHub Action läuft täglich um 09:00 UTC und kann zusätzlich
manuell über den "Actions"-Tab → "ESPN Roster Sync" → "Run workflow" gestartet werden.
Für private Ligen `ESPN_S2` und `SWID` unter *Settings → Secrets and variables → Actions*
als Repository Secrets hinterlegen.

**Falls ein Team nicht automatisch erkannt wird:** Der Sync matcht ESPN-Teamnamen
automatisch gegen `data/teams.js`. Bei Nichterkennung gibt das Script eine Warnung mit dem
exakten ESPN-Namen aus — dann `ESPN_TO_TEAM_ID_OVERRIDE` in `js/espn-sync.js` ergänzen.

**Zu prüfen vor dem ersten Lauf:** `ESPN_SEASON` in `js/espn-sync.js` (aktuell auf `2026`
gesetzt, da ESPN Fantasy Football die Season-ID i.d.R. direkt als Kalenderjahr der Saison
führt — anders als bei ESPN Fantasy Basketball).

## Draft Board 2026

`data/draft2026.js` enthält die von den Managern gemeldeten Keeper. Die belegte Runde wird
automatisch berechnet: 15 Runden gesamt, Keeper füllen von unten auf (ein Team mit K Keepern
belegt die letzten K Runden seines eigenen Picks). Bis zum Keeper Lock Date (26.08.2026,
21:00 Uhr) können sich die Listen noch ändern — einfach die Arrays in `data/draft2026.js`
anpassen, die Rundenberechnung läuft automatisch mit.

Die tatsächliche Draft-Slot-Reihenfolge (wer in Runde 1 an Position 1, 2, 3 … pickt) ist noch
offen und wird ergänzt, sobald ESPN sie vergibt.

## Wichtiger Bugfix (13.08.2026): ESPN-Syncs liefen ins Leere

Alle vier ESPN-Sync-Skripte luden ihre Konfiguration (`js/espn-sync.js`, `data/teams.js`) über
Node's `vm`-Modul. Node hängt `const`/`let`-Deklarationen dabei **nicht** als Property ans
Sandbox-Objekt (nur `var` würde das tun) — die Skripte lasen also z. B. `ESPN_LEAGUE_ID:
undefined`, scheiterten sofort und wurden durch das eigene stille Fehler-Handling (`exit(0)`,
damit ein einzelner Sync-Fehler nicht den ganzen Workflow rot markiert) verschluckt. Behoben:
`loadModuleSandbox()` sammelt jetzt per Regex alle `const NAME = ...`-Namen ein und hängt sie
explizit über `this.NAME = NAME` an die Sandbox. Betroffen waren alle vier Sync-Skripte. Falls
nach dem nächsten Push immer noch nichts ankommt, jetzt eher an Liga-Privatsphäre (ESPN_S2/SWID
Secrets fehlen) oder Season-ID denken, nicht mehr an dieses Grundproblem.

## Getradete Picks innerhalb des 2026er Drafts

`TRADED_PICKS_2026` in `data/trades.js` funktioniert wie `FUTURE_PICKS`, nur für den laufenden
2026er-Draft: `{ round, from, owner }`, wobei `from` der **ursprüngliche** Besitzer ist und
`owner`, wer den Pick nach dem Trade hat. Default ist "Own" beim ursprünglichen Team, nur
Ausnahmen eintragen.

## Trade Analyzer: geschätzte Team-Auswirkung

Team A/B im Trade Analyzer auswählen (Dropdown über der Asset-Liste), dann rechnet die Seite mit
`PLAYER_PROJECTIONS` aus, wie sich die projizierten Saisonpunkte (ohne K/DST) und der Rang unter
allen 12 Teams durch den Trade verändern würden. Picks fließen nicht in die Punkteschätzung ein
(keine Projektion für Picks). Erscheint automatisch, sobald Projections geladen sind.

## Standings, Matchup Planner & Liga-Historie

- **Standings** (`data/weekly-scores.js`) — echte Tabelle nach Siegen, PF als Tiebreak.
- **Matchup Planner** (`data/schedule.js`) — kompletter Spielplan (auch ungespielte Wochen), aus
  derselben ESPN-Antwort wie Weekly Scores, aber ungefiltert. Wochen-Umschalter, zeigt Ergebnis
  sobald verfügbar.
- **Liga-Historie** (`data/league-history.js`) — manuell zu pflegen, ESPN liefert keine Vorjahres-
  Historie über unsere Anbindung. Einfach `{ year, champion, runnerUp, thirdPlace, notes }`-Einträge
  ergänzen.

## Dynasty Rolling: Rang-Trend-Schätzung

Im Spieler-Panel der Rolling Rankings erscheint automatisch ein grober nächster Rang, sobald
mindestens 2 Snapshots für einen Spieler vorhanden sind (lineare Regression über die letzten bis
zu 4 Snapshots, ein Schritt extrapoliert). Explizit als grobe Trend-Schätzung gekennzeichnet, kein
echtes Prognosemodell.

## Sync-Skripte: Fehler jetzt sichtbar

Alle vier ESPN-Sync-Skripte beenden sich bei einem echten Fehler jetzt mit `process.exit(1)` statt
`exit(0)` — die GitHub Action zeigt dann ein rotes ✕ statt still grün durchzulaufen. Vorher war ein
Fehlschlag nur im aufgeklappten Log-Text sichtbar, nicht am Status.
