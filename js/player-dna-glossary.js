// ============================================================
//  PLAYER DNA — Erklaerungen (Hover-Tooltips + "Stats erklärt"-Fenster)
// ============================================================
//  Bewusst einfach geschrieben -- auch fuer Leute, die kein Football
//  schauen. Alle Beispielzahlen = echte Werte der Saison 2025 aus
//  data/player-dna.js bzw. der eigenen Stabilitaetsmessung 2016-2025.
//
//  short = Tooltip beim Drueberfahren (1-2 Saetze)
//  what  = Was ist das?   why = Warum ist es drin?   ex = Beispiel
//  Aendert sich eine Kategorie in scripts/sync-player-dna.js, hier den
//  passenden Eintrag (gleicher Schluessel k) ergaenzen.
// ============================================================

const DNA_GLOSSARY = {
  basics: [
    {
      title: '🏈 Football in 30 Sekunden',
      body: `Eine Mannschaft versucht, den Ball Stück für Stück nach vorne zu bringen – entweder durch
        <b>Werfen</b> oder durch <b>Laufen</b>. Dafür gibt es feste Rollen:
        <ul>
          <li><b>QB (Quarterback)</b> – der „Regisseur“. Bekommt den Ball bei jedem Spielzug und wirft ihn
            zu einem Mitspieler oder läuft selbst.</li>
          <li><b>RB (Running Back)</b> – bekommt den Ball in die Hand gedrückt und läuft damit. Fängt ab und
            zu auch kurze Pässe.</li>
          <li><b>WR (Wide Receiver)</b> – die Fänger. Laufen nach vorne und fangen die Würfe des QB.</li>
          <li><b>TE (Tight End)</b> – halb Blocker, halb Fänger. Manche fangen viel, manche blocken fast nur.</li>
        </ul>
        Im Fantasy-Football bekommt „unser“ Spieler Punkte für Yards (1 Yard ≈ 0,9 m), Fänge und Touchdowns.`,
    },
    {
      title: '🕸️ Wie lese ich das Radar?',
      body: `Jede Spitze ist eine Eigenschaft. <b>Je weiter außen der Punkt, desto mehr davon</b> hat der
        Spieler – verglichen mit allen anderen NFL-Spielern auf derselben Position (nicht nur in unserer Liga).
        <br><br>● <b>Runde Punkte</b> = Rolle &amp; Produktion. Hier ist außen <b>besser</b>.
        <br>◇ <b>Rauten</b> = Spielstil. Hier gibt es kein besser oder schlechter – es zeigt nur, <i>wie</i>
        jemand spielt (z.B. lange Würfe oder kurze Würfe).
        <br><br>Ein großes, rundes Netz = ein Spieler, der in fast allem stark ist.`,
    },
    {
      title: '📊 Perzentil – „besser als wie viele?“',
      body: `<b>Perzentil 80</b> heißt: besser als 80 von 100 Spielern auf dieser Position. 50 ist genau Mittelfeld,
        100 der Beste. Beispiel: Christian McCaffrey hatte 2025 bei den Targets (siehe unten) Perzentil 100 –
        kein anderer Running Back wurde so oft angespielt.`,
    },
    {
      title: '📏 Z-Score – „wie weit weg vom Durchschnitt?“',
      body: `Das Perzentil sagt nur die <i>Reihenfolge</i>. Der Z-Score sagt, <b>wie groß der Abstand</b> ist.
        <b>0</b> = genau Durchschnitt, <b>+1</b> = deutlich besser, <b>+2</b> = Ausnahmespieler, <b>−1</b> = deutlich schlechter.
        <br><br>Beispiel: Platz 1 und Platz 2 haben beim Perzentil fast dieselbe Zahl – beim Z-Score sieht man,
        ob Platz 1 knapp vorne liegt oder meilenweit. Wir deckeln bei ±2,5, damit ein einzelner Ausreißer das
        Bild nicht verzerrt.`,
    },
    {
      title: '🧬 DNA Ø – die Gesamtnote',
      body: `Der Durchschnitt der <b>6 runden Punkte</b> (Rolle &amp; Produktion). Die Stil-Rauten zählen nicht mit,
        weil lange Würfe nicht „besser“ sind als kurze. Grob: <b>70+</b> = Top-Spieler, <b>50</b> = Mittelfeld,
        <b>unter 35</b> = eher Ersatz.`,
    },
    {
      title: '🔍 DNA-Match – „wem ähnelt er?“',
      body: `Wir suchen den Spieler, dessen Netz die <b>ähnlichste Form</b> hat – in derselben Saison und in allen
        Jahren seit 2016 („historisches Match“). 90 % heißt: fast dieselbe Form. Mit „nur NFL-Jahr X“ vergleicht
        man z.B. einen Neuling nur mit anderen Neulingen – spannend für die Frage „Wer sah als Rookie genauso aus?“`,
    },
    {
      title: '🧪 Stichproben-Korrektur – „nicht zu früh freuen“',
      body: `Nach 2–3 Spielen kann viel Zufall drin sein. Die Korrektur mischt deshalb die neuen Werte mit dem
        Vorjahr des Spielers (bei Neulingen mit dem Durchschnitt). Je zufälliger eine Eigenschaft ist, desto stärker
        wird gemischt. Beispiel: Rookie Jeremiyah Love stand in seinen ersten 2 Spielen bei 41,5 % der Spielzüge auf
        dem Feld – korrigiert rechnen wir mit 53,6 %, weil ein so früher Wert noch wenig aussagt. Im Lauf der
        Saison verschwindet die Korrektur von selbst.`,
    },
    {
      title: '📐 Was heißt „Stabilität r“?',
      body: `Wir haben für jede Eigenschaft gemessen (Saisons 2016–2025): Wer in einem Jahr gut war – ist er es im
        nächsten Jahr wieder? <b>r = 1</b> heißt: immer genau gleich. <b>r = 0</b> heißt: reiner Zufall.
        <br><br>Beispiel: Wie oft ein <b>Quarterback selbst läuft</b> (r = 0,88) ist fast eine Charaktereigenschaft –
        wer läuft, läuft auch nächstes Jahr. Wie viele Yards ein <b>Running Back pro Lauf</b> schafft (r = 0,27),
        hängt dagegen stark von Glück und Mitspielern ab. Deshalb haben wir bevorzugt stabile Eigenschaften
        ausgewählt.`,
    },
  ],

  stats: {
    QB: {
      xfp: {
        short: 'Erwartete Fantasy-Punkte pro Spiel: wie viele Punkte ein Durchschnitts-QB mit genau diesen Chancen gemacht hätte.',
        what: 'Für jeden Wurf und jeden Lauf wird geschätzt, wie viele Punkte er normalerweise bringt (ein Wurf in die Endzone ist mehr wert als einer an der Mittellinie). Alles zusammengezählt = „erwartete Punkte“.',
        why: 'Misst die <b>Chancen</b>, die ein QB bekommt – unabhängig davon, ob er Glück hatte. Stabil (r = 0,62) und der beste Einzel-Hinweis auf die Punkte im nächsten Jahr.',
        ex: 'Matthew Stafford 2025: 24,6 erwartete Punkte pro Spiel (Spitze). Kirk Cousins: nur 11,5 – er bekam einfach viel weniger gute Gelegenheiten.',
      },
      fpdb: {
        short: 'Fantasy-Punkte pro Spielzug (Wurf, Sack oder eigener Lauf). Misst, wie viel ein QB aus jeder Aktion macht.',
        what: 'Alle Fantasy-Punkte geteilt durch die Zahl seiner Spielzüge.',
        why: 'Zeigt die Punkte-<b>Effizienz</b>. Wer oft wirft, sammelt automatisch Punkte – hier zählt, wie viel pro Aktion herauskommt.',
        ex: 'Josh Allen 2025: 0,60 Punkte pro Spielzug (Platz 1), auch weil er viel selbst läuft. Rookie Cam Ward: 0,29.',
      },
      epa: {
        short: 'EPA = „Expected Points Added“: Bringt ein Spielzug die Mannschaft näher an Punkte? Plus = ja, Minus = nein.',
        what: 'Jede Spielsituation hat einen Wert (wie wahrscheinlich es danach Punkte gibt). EPA misst, um wie viel ein Spielzug diesen Wert verbessert oder verschlechtert – im Schnitt pro Spielzug.',
        why: 'Die bekannteste Messzahl für „spielt der QB gut Football?“ – unabhängig von Fantasy-Regeln.',
        ex: 'Drake Maye 2025: +0,28 pro Spielzug (Spitze). Rookie Shedeur Sanders: −0,19 – seine Spielzüge haben im Schnitt geschadet.',
      },
      cpoe: {
        short: 'CPOE: wie viel Prozent öfter ein QB trifft, als bei genau diesen Würfen zu erwarten wäre.',
        what: 'Ein kurzer, freier Pass ist leicht, ein langer in enge Deckung schwer. CPOE rechnet die Schwierigkeit heraus und zeigt: trifft er mehr oder weniger als erwartet?',
        why: 'Die fairste Messung für <b>Wurfgenauigkeit</b>. Die normale „Quote angekommener Pässe“ belohnt nur QBs, die viele leichte Pässe werfen.',
        ex: 'Drake Maye 2025: +10,8 % über Erwartung. J.J. McCarthy: −5,7 %.',
      },
      rushy: {
        short: 'Wie viele Yards der QB pro Spiel selbst läuft.',
        what: 'Statt zu werfen, läuft der QB selbst mit dem Ball. Gezählt werden die dabei gewonnenen Yards pro Spiel.',
        why: 'Für Fantasy <b>Gold</b>: Laufen bringt dem QB extra Punkte, und diese Eigenschaft ist extrem stabil (r = 0,85).',
        ex: 'Justin Fields 2025: 42,6 Lauf-Yards pro Spiel. Matthew Stafford: 0,1 – er läuft praktisch nie.',
      },
      rusha: {
        short: 'Wie oft der QB pro Spiel selbst mit dem Ball läuft.',
        what: 'Anzahl der eigenen Läufe pro Spiel.',
        why: 'Die <b>stabilste Eigenschaft</b> überhaupt (r = 0,88): Wer als QB läuft, tut es auch nächstes Jahr. Deshalb sieht man hier früh, wer „Lauf-QB“ ist.',
        ex: 'Justin Fields 2025: 7,9 Läufe pro Spiel. Jared Goff: 1,1.',
      },
      adot: {
        short: 'Stil: Wie weit fliegen seine Würfe im Schnitt (in Yards ab der Startlinie)? Lang ≠ besser.',
        what: '„Average Depth of Target“ – die durchschnittliche Wurfweite.',
        why: 'Zeigt den <b>Stil</b>: Bombenwerfer oder Kurzpass-Spezialist. Beides kann erfolgreich sein – darum zählt es nicht zur Note, hilft aber beim Finden ähnlicher Spieler.',
        ex: 'Marcus Mariota 2025: 10,1 Yards pro Wurf (eher lang). Aaron Rodgers: 6,0 (kurz und schnell).',
      },
      ttt: {
        short: 'Stil: Wie viele Sekunden der QB den Ball hält, bevor er wirft.',
        what: 'Gemessen mit Chips in den Schulterpolstern (NFL Next Gen Stats).',
        why: '<b>Stil</b>: Schnelle Werfer vermeiden Sacks, geduldige warten auf den großen Spielzug. Sehr stabil (r = 0,66), aber sagt keine Punkte voraus.',
        ex: 'Shedeur Sanders 2025: 3,23 Sekunden. Aaron Rodgers: 2,59 – der Ball ist fast sofort weg.',
      },
    },

    RB: {
      xfps: {
        short: 'xFP-Share: Welcher Anteil der erwarteten Fantasy-Punkte seines Teams auf ihn entfällt.',
        what: 'Erwartete Punkte (siehe Erklärung bei „xFP“) des Spielers geteilt durch die erwarteten Punkte des ganzen Teams.',
        why: 'Die beste Zahl für „Ist er <b>der</b> Running Back seines Teams?“ Stabil (r = 0,66) und die stärkste Vorhersage fürs nächste Jahr.',
        ex: 'Christian McCaffrey 2025: 32,5 % aller erwarteten Team-Punkte liefen über ihn. Brian Robinson: 5,6 %.',
      },
      snap: {
        short: 'Bei wie viel Prozent der Spielzüge seines Teams er auf dem Feld steht.',
        what: 'Ein „Snap“ ist ein Spielzug. Gezählt wird, wie oft er dabei auf dem Feld war.',
        why: 'Wer nicht auf dem Feld steht, kann keine Punkte machen. Einfach, aber aussagekräftig (r = 0,59).',
        ex: 'Christian McCaffrey 2025: 83 %. Brian Robinson: 17 %.',
      },
      rsh: {
        short: 'Rush-Share: Welchen Anteil aller Läufe seines Teams er bekommt.',
        what: 'Seine Läufe geteilt durch alle Läufe seines Teams (in den Spielen, in denen er dabei war).',
        why: 'Zeigt, ob er der „Arbeitsgaul“ ist oder sich die Läufe teilen muss.',
        ex: 'Jonathan Taylor 2025: 73 % aller Läufe der Colts. Brian Robinson: 19 %.',
      },
      tgt: {
        short: 'Targets pro Spiel: Wie oft pro Spiel ein Pass zu ihm geworfen wird.',
        what: 'Ein „Target“ ist ein Wurf, der für diesen Spieler gedacht war – egal ob er ihn fängt.',
        why: 'Die <b>stabilste RB-Eigenschaft</b> (r = 0,70). Und in unserer Liga gibt es für jeden Fang einen Extrapunkt – Pass-fangende RBs sind Gold wert.',
        ex: 'Christian McCaffrey 2025: 7,6 Targets pro Spiel. Chris Rodriguez Jr.: 0,3 – er wird fast nie angespielt.',
      },
      recy: {
        short: 'Wie viele Yards er pro Spiel durch gefangene Pässe gewinnt.',
        what: 'Yards nach Fängen (nicht nach Läufen), pro Spiel.',
        why: 'Zeigt, ob er aus den Pässen auch etwas macht. Stabil (r = 0,67) und guter Punkte-Hinweis.',
        ex: 'Christian McCaffrey 2025: 54 Yards pro Spiel nur durch Fänge. Brian Robinson: 1,5.',
      },
      fpoe: {
        short: 'FPOE: Wie viele Fantasy-Punkte er pro Spiel MEHR (oder weniger) macht, als seine Chancen erwarten lassen.',
        what: 'Echte Punkte minus erwartete Punkte. Plus = holt mehr raus als ein Durchschnittsspieler mit denselben Chancen.',
        why: 'Die eine Zahl für „<b>Talent/Effizienz</b>“. Sie schwankt stark (r = 0,21) – darum ist nur diese eine Effizienz-Zahl drin und die Stichproben-Korrektur zieht sie früh in der Saison stark zum Durchschnitt.',
        ex: 'Jahmyr Gibbs 2025: +3,6 Punkte pro Spiel über Erwartung. Woody Marks: −2,1.',
      },
      yaca: {
        short: 'Stil: Wie viele Yards er pro Lauf NACH dem ersten Kontakt mit einem Gegner noch schafft.',
        what: '„Yards after Contact“ – was er erzwingt, wenn eigentlich schon jemand dran ist. Daten erst ab 2018.',
        why: '<b>Stil</b>: Zeigt den „Durchbeißer“. Sagt aber kaum Punkte voraus (r = 0,34), darum zählt es nicht zur Note.',
        ex: 'De\'Von Achane 2025: 3,0 Yards nach Kontakt pro Lauf. Sean Tucker: 1,0.',
      },
      expl: {
        short: 'Stil: Anteil seiner Läufe, die 10 Yards oder mehr bringen.',
        what: 'Wie oft ein Lauf ein „großer“ Lauf wird.',
        why: '<b>Stil</b>: der Sprinter-Typ. Große Läufe sind spektakulär, aber sehr vom Zufall abhängig (r = 0,26).',
        ex: 'De\'Von Achane 2025: 16,8 % seiner Läufe waren 10+ Yards. Devin Singletary: 5,0 %.',
      },
    },

    WR: {
      xfps: {
        short: 'xFP-Share: Welcher Anteil der erwarteten Fantasy-Punkte seines Teams auf ihn entfällt.',
        what: 'Erwartete Punkte des Spielers geteilt durch die des ganzen Teams. Ein langer Wurf in die Endzone zählt mehr als ein kurzer Pass an der Seitenlinie.',
        why: 'Die <b>stärkste Zahl</b> der ganzen Auswertung: stabil (r = 0,69) und bester Hinweis auf die Punkte im nächsten Jahr.',
        ex: 'Ja\'Marr Chase 2025: 24,9 % aller erwarteten Team-Punkte. Tre Harris: 5,9 %.',
      },
      tgt: {
        short: 'Targets pro Spiel: Wie oft pro Spiel ein Pass zu ihm geworfen wird.',
        what: 'Ein „Target“ ist ein Wurf, der für diesen Spieler gedacht war – gefangen oder nicht.',
        why: 'Ohne Würfe keine Punkte. Sehr stabil (r = 0,66): Wen der QB sucht, den sucht er auch nächstes Jahr.',
        ex: 'Ja\'Marr Chase 2025: 11,6 Targets pro Spiel. JuJu Smith-Schuster: 2,6.',
      },
      ypa: {
        short: 'Wie viele Yards er pro Wurf seines Teams macht – egal, zu wem geworfen wurde.',
        what: 'Seine Fang-Yards geteilt durch ALLE Würfe seines Teams. Profis nutzen dafür „Yards pro gelaufener Route“; diese Daten gibt es frei aber nicht – das hier ist die beste Annäherung.',
        why: 'Verbindet <b>Rolle und Können</b> in einer Zahl: Man muss oft angespielt werden UND etwas daraus machen. Stabil (r = 0,56) und guter Punkte-Hinweis.',
        ex: 'Jaxon Smith-Njigba 2025: 3,1 Yards pro Team-Wurf (Spitze). Marvin Mims Jr.: 0,5.',
      },
      ays: {
        short: 'Air Yards Share: Welcher Anteil aller Wurfweite seines Teams auf ihn zielt.',
        what: 'Alle Yards, die der Ball in der Luft Richtung dieses Spielers fliegt, geteilt durch die des ganzen Teams.',
        why: 'Zeigt, ob er der Mann für die <b>wichtigen, langen Würfe</b> ist – dort liegen die großen Punkte.',
        ex: 'Jaxon Smith-Njigba 2025: 48,7 % der gesamten Wurfweite der Seahawks zielte auf ihn. JuJu Smith-Schuster: 5,4 %.',
      },
      snap: {
        short: 'Bei wie viel Prozent der Spielzüge seines Teams er auf dem Feld steht.',
        what: 'Anteil der Spielzüge, in denen er mitspielt.',
        why: 'Die einfachste Rollen-Zahl: Stammspieler oder Ergänzungsspieler?',
        ex: 'Ja\'Marr Chase 2025: 94 %. DeMario Douglas: 26 %.',
      },
      yac: {
        short: 'YAC: Wie viele Yards er nach dem Fangen noch selbst läuft.',
        what: '„Yards after Catch“ – was er aus einem gefangenen Ball noch herausholt, pro Fang.',
        why: 'Zeigt, ob er nach dem Fang <b>gefährlich</b> ist. Mittel-stabil (r = 0,48).',
        ex: 'Rashee Rice 2025: 7,8 Yards nach jedem Fang. Mike Evans: 1,2 – er fängt meist und wird sofort gestoppt.',
      },
      adot: {
        short: 'Stil: Wie weit die Würfe zu ihm im Schnitt fliegen. Lang ≠ besser.',
        what: '„Average Depth of Target“ – die durchschnittliche Wurfweite der Pässe zu ihm.',
        why: '<b>Stil</b>: Tiefen-Spezialist oder Kurzpass-Typ? Sehr stabil (r = 0,68), sagt aber keine Punkte voraus – beide Typen können gut sein.',
        ex: 'Alec Pierce 2025: 19,0 Yards (fast nur lange Bälle). Khalil Shakir: 3,7 (kurz, dann laufen).',
      },
      sep: {
        short: 'Stil: Wie viel Platz (in Yards) er zum nächsten Gegenspieler hat, wenn der Ball ankommt.',
        what: 'Gemessen mit Chips in der Ausrüstung (NFL Next Gen Stats).',
        why: '<b>Stil</b>: der „Freiläufer“. Stabil (r = 0,59), aber überraschenderweise ohne Einfluss auf die Punkte – manche Stars fangen einfach auch in enger Deckung.',
        ex: 'Luther Burden III 2025: 4,6 Yards Abstand. Tee Higgins: 1,9 – und trotzdem ein guter Receiver, weil er sich in engen Duellen durchsetzt.',
      },
    },

    TE: {
      xfps: {
        short: 'xFP-Share: Welcher Anteil der erwarteten Fantasy-Punkte seines Teams auf ihn entfällt.',
        what: 'Erwartete Punkte des Spielers geteilt durch die des ganzen Teams.',
        why: 'Trennt die fangenden Tight Ends von den reinen Blockern. Stabil (r = 0,65).',
        ex: 'Trey McBride 2025: 22,4 % aller erwarteten Team-Punkte. Elijah Higgins: 4,9 %.',
      },
      ypa: {
        short: 'Wie viele Yards er pro Wurf seines Teams macht – egal, zu wem geworfen wurde.',
        what: 'Seine Fang-Yards geteilt durch alle Würfe seines Teams (Annäherung an „Yards pro Route“).',
        why: 'Die beste TE-Zahl überhaupt: stabil (r = 0,64) und der beste Hinweis auf nächstes Jahr.',
        ex: 'Tucker Kraft 2025: 2,0 Yards pro Team-Wurf. Jonnu Smith: 0,4.',
      },
      snap: {
        short: 'Bei wie viel Prozent der Spielzüge seines Teams er auf dem Feld steht.',
        what: 'Anteil der Spielzüge, in denen er mitspielt.',
        why: 'Wichtig, aber allein trügerisch: Viele Tight Ends stehen auf dem Feld, um zu blocken. Darum zusammen mit Targets und xFP-Share lesen.',
        ex: 'Cade Otton und Trey McBride standen 2025 beide bei über 90 % der Spielzüge auf dem Feld. McBride bekam aber 22,4 % der erwarteten Team-Punkte, Otton nur 11,6 % – er blockt viel öfter.',
      },
      tgt: {
        short: 'Targets pro Spiel: Wie oft pro Spiel ein Pass zu ihm geworfen wird.',
        what: 'Würfe, die für diesen Spieler gedacht waren – gefangen oder nicht.',
        why: 'Zeigt, ob er als Fänger eingeplant ist. Stabil (r = 0,61).',
        ex: 'Trey McBride 2025: 9,9 Targets pro Spiel – so viel wie ein Top-Receiver. Elijah Higgins: 2,2.',
      },
      ays: {
        short: 'Air Yards Share: Welcher Anteil aller Wurfweite seines Teams auf ihn zielt.',
        what: 'Die Yards, die der Ball in der Luft Richtung dieses Spielers fliegt, im Verhältnis zum ganzen Team.',
        why: 'Zeigt, ob er auch für wichtigere, längere Würfe gesucht wird – nicht nur für Mini-Pässe.',
        ex: 'Trey McBride 2025: 24,2 %. Noah Fant: 2,9 %.',
      },
      yacoe: {
        short: 'Wie viele Yards er nach dem Fang MEHR läuft, als man in dieser Situation erwarten würde.',
        what: '„YAC over Expected“ (NFL Next Gen Stats): Die Situation beim Fang (Abstand zu Gegnern, Richtung, Tempo) ergibt eine Erwartung – gemessen wird, ob er mehr oder weniger schafft. Nur für Spieler mit genug Fängen verfügbar.',
        why: 'Fairer als normales YAC, weil offene Fänge leichter sind. Zeigt echtes <b>Können mit dem Ball</b>.',
        ex: 'Pat Freiermuth 2025: +2,3 Yards pro Fang über Erwartung. Kyle Pitts: −0,8.',
      },
      adot: {
        short: 'Stil: Wie weit die Würfe zu ihm im Schnitt fliegen. Lang ≠ besser.',
        what: 'Die durchschnittliche Wurfweite der Pässe zu ihm.',
        why: '<b>Stil</b>: der Tight End, der tief die Mitte hochläuft, oder der Kurzpass-Anspielpartner.',
        ex: 'Darren Waller 2025: 10,6 Yards. Noah Fant: 3,3.',
      },
      yac: {
        short: 'Stil: Wie viele Yards er nach dem Fangen noch selbst läuft.',
        what: '„Yards after Catch“ pro Fang.',
        why: '<b>Stil</b>: bulliger Läufer nach dem Fang oder „fangen und fallen“?',
        ex: 'Tucker Kraft 2025: 10,8 Yards nach jedem Fang. Mark Andrews: 2,1.',
      },
    },
  },

  notChosen: {
    QB: [
      { name: 'Pass-Versuche pro Spiel', r: '0,57 · sagt Punkte nur mit 0,04 voraus',
        why: 'Klingt wichtig, ist es für Fantasy aber kaum: Viel werfen heißt nicht viele Punkte.',
        ex: 'Jacoby Brissett warf 2025 34,6-mal pro Spiel und machte 16,2 Punkte pro Spiel. Josh Allen warf nur 28,8-mal – und machte 22,8 Punkte, weil er zusätzlich läuft.' },
      { name: 'Interception-Quote', r: '0,17',
        why: 'Abgefangene Bälle sind stark vom Zufall abhängig (abgefälschte Bälle, Fehler der Fänger).',
        ex: 'Tua Tagovailoa: 2024 nur 1,8 % seiner Würfe abgefangen, 2025 plötzlich 3,9 %.' },
      { name: 'Touchdown-Quote', r: '0,34',
        why: 'Touchdowns hängen stark davon ab, wie oft das Team nah an der Endzone ist – schwankt enorm.',
        ex: 'Matthew Stafford: 2024 bei 3,9 % seiner Würfe ein Touchdown, 2025 bei 7,7 %. Fast doppelt so viel – mit derselben Mannschaft.' },
      { name: 'Sacks unter Druck', r: '0,31 · sagt keine Punkte voraus',
        why: 'Wie oft ein QB unter Druck zu Boden gerissen wird, hängt stark von seiner Abwehrreihe ab. Außerdem erst ab 2018 verfügbar.',
        ex: '–' },
    ],
    RB: [
      { name: 'Yards pro Lauf', r: '0,27',
        why: 'Die bekannteste RB-Zahl – aber sie hängt stark von den Blockern vor ihm ab und schwankt zufällig.',
        ex: 'Bucky Irving: 2024 5,4 Yards pro Lauf, 2025 nur noch 3,4. Saquon Barkley: 5,8 → 4,1.' },
      { name: 'Rush Yards over Expected (RYOE)', r: '0,20',
        why: 'Eigentlich clever (rechnet die Blocker heraus), aber trotzdem kaum wiederholbar.',
        ex: 'Bucky Irving: 2024 +0,9 Yards über Erwartung pro Lauf, 2025 −0,8.' },
      { name: 'Touchdowns pro Spiel', r: '0,35',
        why: 'Touchdowns sind die Achterbahn des Fantasy-Footballs: sehr wertvoll, aber kaum vorhersagbar.',
        ex: 'Travis Etienne: 2024 0,13 Touchdowns pro Spiel, 2025 0,76. Alvin Kamara umgekehrt: 0,57 → 0,09.' },
      { name: 'EPA pro Lauf / gebrochene Tackles', r: '0,18 / 0,21',
        why: 'Beide schwanken so stark, dass sie mehr über Glück als über den Spieler aussagen.',
        ex: 'Javonte Williams: 2024 −0,17 EPA pro Lauf, 2025 +0,05 – und machte plötzlich 15 statt 9 Punkte pro Spiel.' },
    ],
    WR: [
      { name: 'EPA pro Target', r: '0,18',
        why: 'Hängt vor allem vom Quarterback ab, der ihm den Ball zuwirft.',
        ex: 'Justin Jefferson: 2024 +0,42 pro Target, 2025 −0,10 (mit einem anderen QB) – und fiel von 18,7 auf 11,9 Punkte pro Spiel.' },
      { name: 'Drop-Quote (fallen gelassene Bälle)', r: '0,13',
        why: 'Fast reiner Zufall – Fans erinnern sich zwar an jeden Drop, aber es wiederholt sich kaum.',
        ex: 'Jameson Williams: 2024 3 % Drops, 2025 12 %.' },
      { name: 'Touchdowns pro Spiel', r: '0,38',
        why: 'Wertvoll, aber sehr schwankend.',
        ex: 'Chris Godwin: 2024 0,71 Touchdowns pro Spiel, 2025 0,22. Selbst Ja\'Marr Chase halbierte sich: 1,0 → 0,5.' },
      { name: 'Fangquote', r: '0,45 · sagt Punkte kaum voraus',
        why: 'Hängt vor allem von der Wurfweite ab: Wer lange Bälle bekommt, fängt automatisch seltener.',
        ex: 'Mike Evans: 2024 fing er 67 % der Bälle zu ihm, 2025 nur 48 %.' },
      { name: 'Yards pro gelaufener Route', r: '–',
        why: 'Die Profi-Lieblingszahl – aber die Daten dafür sind nicht frei verfügbar. Ersatz: „Yds/Team-Pass“.',
        ex: '–' },
    ],
    TE: [
      { name: 'Touchdowns pro Spiel', r: '0,26',
        why: 'Bei Tight Ends besonders zufällig – oft entscheidet ein einziger Spielzug nah an der Endzone.',
        ex: 'Trey McBride: 2024 nur 0,12 Touchdowns pro Spiel, 2025 plötzlich 0,65 – bei fast gleicher Rolle.' },
      { name: 'Fangquote', r: '0,27',
        why: 'Hängt stark von der Art der Würfe ab und schwankt deutlich.',
        ex: 'Cole Kmet: 2024 fing er 85 % der Bälle zu ihm, 2025 nur 62 %.' },
      { name: 'Drop-Quote', r: '0,15',
        why: 'Wie bei den Receivern fast reiner Zufall.',
        ex: '–' },
    ],
  },
};
