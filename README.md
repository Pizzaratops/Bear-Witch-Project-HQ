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

**Rolling Rankings** (`data/dynasty-rolling.js`) hält Dynasty-Board-Schnappschüsse über Zeit fest.
Der erste Snapshot ("Start 2026") ist direkt aus dem aktuellen Dynasty Board gezogen. Trend-Pfeile
erscheinen automatisch, sobald mindestens 2 Snapshots existieren. Neuen Snapshot anlegen (z. B.
nach neuen Ranking-Uploads):
```bash
node scripts/snapshot-dynasty-rolling.js "Label, z.B. Woche 3"
```
2025er-Rankings lassen sich später als frühester Snapshot ergänzen (Format siehe Kommentar in der
Datei), dann läuft der Trendvergleich automatisch mit.

**Week by Week Rankings** (`data/weekly-scores.js`) zeigt wöchentliche Matchup-Punktzahlen als
Power-Ranking-Tabelle mit Wochen-Umschalter. Läuft automatisch über
`scripts/sync-espn-weekly-scores.js` (GitHub Action `sync-espn-weekly-scores.yml`, täglich 9 &
21 Uhr Berlin-Zeit). Alternativ lassen sich Werte auch manuell direkt in `data/weekly-scores.js`
eintragen (gleiches Format wie beim automatischen Sync).

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
