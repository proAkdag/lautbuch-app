window.LAUTBUCH_TEILE = window.LAUTBUCH_TEILE || {};
window.LAUTBUCH_TEILE.r4 = {
  id: 'r4',
  art: 'regel',
  zeichen: 'll ck tz h ß aa ee oo',
  abtippen: 'boss',
  blaetter: [['tafel', 'Paare'], ['ketten', 'Ketten'], ['woerter', 'Wörter']],
  level: [
    {
      id: 'l1',
      hinweis: 'Nach einem kurzen Vokal kommt oft ein doppelter Buchstabe, ck oder tz: Rat-te, ha-cken, Kat-ze. Bild für das Kind: Der Vokal springt schnell über einen Zaun aus zwei Buchstaben. spu-ken und spu-cken nacheinander lesen: Gespenster spuken, Lamas spucken.',
      probe: ['all', 'ack', 'itz'],
      tafel: [['O-fen', 'of-fen', 'spu-ken', 'spu-cken'], ['Hü-te', 'Hüt-te', 'kam', 'Kamm'],
              ['Ha-ken', 'ha-cken', 'Ka-ter', 'Kat-ze'], ['Ra-ten', 'Rat-ten', 'Ja-cke', 'Zu-cker', 'Platz']],
      ketten: [['MOL-LA', 'RIN-NO', 'LEP-PI', 'SAM-MU'],
               ['RU-CKA', 'MIT-ZO', 'BI-CKO', 'SUT-ZA'],
               ['MAL-LO-NA', 'TI-CKA-MO', 'NUT-ZA-LE'],
               ['SUM-MI-LO', 'FA-CKO-RU', 'LIT-ZA-MO']],
      woerter: [['Ball', 'klet-tert', 'Müt-ze'], ['Schne-cke', 'leckt', 'Ted-dy'],
                ['Löf-fel', 'dick', 'kommt'], ['Pup-pe', 'schnell', 'Witz', 'Ste-cker'], ['hal-lo', 'bit-te', 'Mut-ter'], ['Klas-se', 'Sonn-tag', 'Som-mer', 'Bril-le']],
      anlauf: ['ALL', 'ELL', 'ILL', 'OCK', 'ACK', 'UCK', 'ITZ', 'ATZ', 'OTZ', 'ONN', 'IMM', 'AFF'],
      z4: ['Schne-cke', 'Ted-dy'],
      z5: ['Pfüt-ze', 'Pfann-ku-chen'],
      zMehr: ['Ball', 'dick', 'Mitt-woch', 'Don-ners-tag'],
      bilder: ['Müt-ze', 'Schne-cke', 'Ted-dy', 'klet-tert', 'leckt', 'Ste-cker', 'Bril-le'],
      z6: 'Wett-ren-nen im Park!',
      szene: { saetze: ['Das La-ma rennt, das Schaf rennt.', 'Und die Schne-cke? Sitzt schon im Ziel!'],
               heft: 'Wo rennen alle? Wer rennt? Und wo ist die Schnecke?' },
      frage: 'Wer gewinnt das Wettrennen, und wie kann das sein?'
    },
    {
      id: 'l2',
      hinweis: 'Ein stummes h, das ß und zwei gleiche Vokale machen den Vokal lang: Kuh, Fuß, Meer, Boot. Das h sagt nichts, es hält nur die Tür auf, damit der Vokal sich ausruhen kann. Fuß und Fluss nacheinander sprechen: lang und gemütlich, kurz und schnell. aa, ee und oo klingen wie ein Vokal, nur lang.',
      probe: ['uh', 'uß', 'ee'],
      tafel: [['Huhn', 'Hund', 'Sohn', 'Son-ne'], ['Fuß', 'Fluss', 'Stra-ße', 'Tas-se'],
              ['Beet', 'Bett', 'Saal', 'Salz'], ['Stahl', 'Stall', 'Kahn', 'kann', 'Moos']],
      ketten: [['MOH-LA', 'RUH-MI', 'LAH-NO', 'TEH-LU'],
               ['MEE-LA', 'SOO-RI', 'LAA-MU', 'FEE-NO'],
               ['MI-ßA-RU', 'FU-ßO-LA', 'NO-ßE-LI'],
               ['NOH-LE-MA', 'RUH-SA-LI', 'REE-MO-LA']],
      woerter: [['Kuh', 'Schuh', 'Zahn'], ['Meer', 'Boot', 'gießt'],
                ['Uhr', 'groß', 'Fee'], ['Zoo', 'wohnt', 'süß'], ['froh', 'weiß', 'Jahr'], ['Stuhl', 'Früh-ling', 'Leh-re-rin']],
      anlauf: ['AH', 'OH', 'UH', 'EH', 'MOH', 'RUH', 'FUß', 'GIEß', 'AA', 'EE', 'OO', 'SEE'],
      z4: ['Kuh', 'Boot'],
      z5: ['Fahr-rad', 'See-hund'],
      zMehr: ['Schuh', 'groß', 'Spaß', 'Zahl'],
      bilder: ['Kuh', 'Schuh', 'Zahn', 'Meer', 'Boot', 'gießt'],
      z6: 'Die Zie-ge zieht Schu-he an. Vier Schu-he!',
      frage: 'Warum niest die Kuh?',
      szene: { saetze: ['Die Kuh liest ein Buch.',
                        'Ei-ne Bie-ne lan-det auf ih-rer Na-se.',
                        'Hat-schi, die Kuh niest!'],
               heft: 'Was macht die Kuh? Wo landet die Biene? Was passiert dann?' },
      sinn: {
        satz: 'Die Kuh liest ein Buch.',
        richtig: 'sz-r4-l2-1',
        wahl: [
          { s: 'sz-r4-l2-1', wer: 'kuh', tut: 'liest', was: 'buch', bild: 'Auf einer Wiese sitzt eine Kuh mit Brille und liest in einem aufgeschlagenen roten Buch.' },
          { s: 'sz-r4-l2-2', wer: 'kuh', tut: 'liegt', was: 'buch', bild: 'Auf einer Wiese liegt eine Kuh mit Brille bäuchlings auf einem großen zugeklappten roten Buch.' },
          { s: 'sz-r4-l2-3', wer: 'ziege', tut: 'liest', was: 'buch', bild: 'Auf einer Wiese sitzt eine Ziege mit Brille und liest in einem aufgeschlagenen roten Buch.' }
        ]
      },
      sinnMehr: [
        {
          satz: 'Die Zie-ge zieht Schu-he an. Vier Schu-he!',
          richtig: 'sz-r4-l2-s1-1',
          wahl: [
            { s: 'sz-r4-l2-s1-1', wer: 'ziege', tut: 'zieht an', was: 'vier schuhe', bild: 'Auf einer Wiese sitzt eine Ziege und zieht sich gerade rote Turnschuhe an, an allen vier Füßen einen.' },
            { s: 'sz-r4-l2-s1-2', wer: 'kuh', tut: 'zieht an', was: 'vier schuhe', bild: 'Auf derselben Wiese sitzt eine Kuh und zieht sich gerade rote Turnschuhe an, an allen vier Füßen einen.' },
            { s: 'sz-r4-l2-s1-3', wer: 'ziege', tut: 'zieht an', was: 'zwei schuhe', bild: 'Auf derselben Wiese sitzt eine Ziege und zieht sich gerade rote Turnschuhe an, nur an den zwei Vorderfüßen.' }
          ]
        },
        {
          satz: 'Ei-ne Bie-ne lan-det auf ih-rer Na-se.',
          richtig: 'sz-r4-l2-s3-1',
          wahl: [
            { s: 'sz-r4-l2-s3-1', wer: 'biene', tut: 'landet', was: 'nase', bild: 'Eine kleine Biene landet auf der Nase der Kuh mit Brille, die auf der Wiese mit ihrem roten Buch sitzt und schielend auf die Biene schaut.' },
            { s: 'sz-r4-l2-s3-2', wer: 'marienkäfer', tut: 'landet', was: 'nase', bild: 'Ein kleiner Marienkäfer landet auf der Nase derselben Kuh mit Brille, die auf der Wiese mit ihrem roten Buch sitzt und schielend auf den Käfer schaut.' },
            { s: 'sz-r4-l2-s3-3', wer: 'biene', tut: 'landet', was: 'buch', bild: 'Eine kleine Biene landet auf dem roten Buch derselben Kuh mit Brille, die auf der Wiese sitzt und auf die Biene schaut.' }
          ]
        },
        {
          satz: 'Hat-schi, die Kuh niest!',
          richtig: 'sz-r4-l2-s4-1',
          wahl: [
            { s: 'sz-r4-l2-s4-1', wer: 'kuh', tut: 'niest', was: '', bild: 'Die Kuh mit Brille niest auf der Wiese so kräftig, dass ihr rotes Buch wackelt, und die kleine Biene fliegt erschrocken davon.' },
            { s: 'sz-r4-l2-s4-2', wer: 'ziege', tut: 'niest', was: '', bild: 'Eine Ziege niest auf derselben Wiese so kräftig, dass das rote Buch wackelt, und die kleine Biene fliegt erschrocken davon.' },
            { s: 'sz-r4-l2-s4-3', wer: 'kuh', tut: 'lacht', was: '', bild: 'Die Kuh mit Brille lacht auf derselben Wiese über ihrem roten Buch, und die kleine Biene fliegt davon.' }
          ]
        }
      ]
    }
  ],
  boss: {
    id: 'boss',
    hinweis: 'Kurz und lang gemischt. Liest das Kind einen Vokal falsch lang oder kurz, das Wort einmal richtig vorsprechen und fragen: „Springt er über den Zaun oder ruht er sich aus?“ Vorgezeigt ist kein Fehler. Zwei Wörter kamen im Buch noch nie vor (Brücke, Hummel): hier wird wirklich erlesen, nicht wiedererkannt.',
    anlauf: ['ALL', 'ELL', 'OCK', 'ACK', 'ITZ', 'ATZ', 'ONN', 'IMM', 'AA', 'EE', 'OO', 'AH', 'OH', 'UH', 'MOH', 'FUß'],
    z4: ['Müt-ze', 'gießt', 'Brü-cke', 'Hum-mel'],
    z5: ['Ka-rus-sell', 'Spiel-platz'],
    zMehr: ['Ball', 'Kuh', 'Ohr', 'glück-lich', 'Mann', 'viel-leicht'],
    z6: 'Die Zie-ge, die Kuh und die Schne-cke kom-men mit.',
    szene: { saetze: ['Das Schaf fährt Ka-rus-sell. Dem La-ma wird schwin-de-lig!', 'Und die Schne-cke? Sie fährt im-mer schnel-ler!',
                      'Die Kuh liest das Schild: Zum Leucht-turm!'],
             heft: 'Wer fährt Karussell? Wem wird schwindelig? Wer ist am schnellsten? Was liest die Kuh auf dem Schild?' },
    fremd: ['Brü-cke', 'Hum-mel'],
    frage: 'Wer kommt mit, wem wird schwindelig, und wohin zeigt das Schild?',
    sinn: {
      satz: 'Das Schaf fährt Ka-rus-sell. Dem La-ma wird schwin-de-lig!',
      richtig: 'sz-r4-boss-1',
      wahl: [
        { s: 'sz-r4-boss-1', wer: 'schaf', tut: 'fährt', was: 'karussell', bild: 'Auf einem Spielplatz fährt ein fröhliches Schaf Karussell; daneben steht ein Lama mit Kringelaugen und hält sich schwindelig den Kopf.' },
        { s: 'sz-r4-boss-2', wer: 'ziege', tut: 'fährt', was: 'karussell', bild: 'Auf einem Spielplatz fährt eine fröhliche Ziege Karussell; daneben steht ein Lama mit Kringelaugen und hält sich schwindelig den Kopf.' },
        { s: 'sz-r4-boss-3', wer: 'schaf', tut: 'fährt', was: 'fahrrad', bild: 'Auf einem Spielplatz fährt ein fröhliches Schaf Fahrrad im Kreis; daneben steht ein Lama mit Kringelaugen und hält sich schwindelig den Kopf.' }
      ]
    },
    sinnMehr: [
      {
        satz: 'Die Zie-ge, die Kuh und die Schne-cke kom-men mit.',
        richtig: 'sz-r4-boss-s1-1',
        wahl: [
          { s: 'sz-r4-boss-s1-1', wer: 'ziege + kuh + schnecke', tut: 'kommen mit', was: '', bild: 'Hinter einem Lama und einem Schaf laufen eine Ziege, eine Kuh und eine Schnecke fröhlich zum Spielplatz mit dem Karussell.' },
          { s: 'sz-r4-boss-s1-2', wer: 'ziege + kuh + biene', tut: 'kommen mit', was: '', bild: 'Hinter dem Lama und dem Schaf laufen eine Ziege, eine Kuh und eine Biene fröhlich zum selben Spielplatz mit dem Karussell.' },
          { s: 'sz-r4-boss-s1-3', wer: 'ziege + kuh + schnecke', tut: 'bleiben', was: '', bild: 'Das Lama und das Schaf gehen zum selben Spielplatz, eine Ziege, eine Kuh und eine Schnecke bleiben weit hinten auf der Wiese liegen.' }
        ]
      },
      {
        satz: 'Und die Schne-cke? Sie fährt im-mer schnel-ler!',
        richtig: 'sz-r4-boss-s3-1',
        wahl: [
          { s: 'sz-r4-boss-s3-1', wer: 'schnecke', tut: 'fährt schneller', was: 'karussell', bild: 'Auf dem Karussell des Spielplatzes sitzt eine Schnecke und saust im Kreis, Wirbellinien zeigen, wie schnell es sich dreht.' },
          { s: 'sz-r4-boss-s3-2', wer: 'ziege', tut: 'fährt schneller', was: 'karussell', bild: 'Auf demselben Karussell sitzt eine Ziege und saust im Kreis, Wirbellinien zeigen, wie schnell es sich dreht.' },
          { s: 'sz-r4-boss-s3-3', wer: 'schnecke', tut: 'steht still', was: 'karussell', bild: 'Auf demselben Karussell sitzt eine Schnecke, und das Karussell steht ganz still.' }
        ]
      },
      {
        satz: 'Die Kuh liest das Schild: Zum Leucht-turm!',
        richtig: 'sz-r4-boss-s4-1',
        wahl: [
          { s: 'sz-r4-boss-s4-1', wer: 'kuh', tut: 'liest', was: 'schild', bild: 'Am Rand des Spielplatzes steht die gefleckte Kuh mit runder Brille vor einem hölzernen Wegweiser mit einem gemalten Leuchtturm und einem Pfeil und liest ihn vor; Lama, Schaf, Ziege und Schnecke schauen zu ihr hoch.' },
          { s: 'sz-r4-boss-s4-2', wer: 'ziege', tut: 'liest', was: 'schild', bild: 'Am Rand desselben Spielplatzes steht die weiße Ziege vor demselben Wegweiser mit dem gemalten Leuchtturm und liest ihn vor; Lama, Schaf, Kuh und Schnecke schauen zu ihr hoch.' },
          { s: 'sz-r4-boss-s4-3', wer: 'kuh', tut: 'liest', was: 'buch', bild: 'Am Rand desselben Spielplatzes sitzt die gefleckte Kuh mit runder Brille auf einer Bank und liest in ihrem roten Buch; Lama, Schaf, Ziege und Schnecke schauen zu ihr hoch.' }
        ]
      }
    ]
  },
  bewohner: [
    { s: 'bw-kuh', wer: 'Kuh', bild: 'Eine gefleckte Kuh mit runder Brille steht da und hält ein aufgeschlagenes Buch in den Vorderhufen.' },
    { s: 'bw-schnecke', wer: 'Schnecke', bild: 'Eine kleine Schnecke mit gestreiftem Haus reckt stolz die Fühler und trägt eine winzige Siegerschleife.' },
    { s: 'bw-ida', wer: 'Ida', bild: 'Ein Kind mit runder Brille, hohem blondem Pferdeschwanz, senfgelber Latzhose und roten Turnschuhen steht ruhig da, die Arme leicht vom Körper.' }
  ],
  schatz: [
    { art: 'sprichwort', text: 'Hun-de, die bel-len, bei-ßen nicht.' },
    { art: 'sprichwort', text: 'Oh-ne Fleiß kein Preis.' },
    { art: 'sprichwort', text: 'Bes-ser spät als nie.' },
    { art: 'raetsel', text: 'Was wird grö-ßer, je mehr man weg-nimmt?', loesung: 'Ein Loch' },
    { art: 'zunge', text: 'Zehn zah-me Zie-gen zo-gen zehn Zent-ner Zu-cker zum Zoo.' },
    { art: 'witz', text: 'Der Hahn kräht. Die Eu-le stöhnt: Ist doch noch Nacht!' },
    { art: 'reim', text: 'Um die E-cke kriecht ei-ne Schne-cke mit Kis-sen und De-cke.' },
    { art: 'satz', text: 'Die Kuh liest ein Koch-buch: hun-dert Re-zep-te mit Gras.' },
    { art: 'witz', text: 'Hal-lo, Klas-se! Ob die Leh-re-rin heu-te froh ist? Ja, denn es ist Mitt-woch!' }
  ]
};
