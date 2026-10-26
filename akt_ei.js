window.LAUTBUCH_TEILE = window.LAUTBUCH_TEILE || {};
window.LAUTBUCH_TEILE.ei = {
  id: 'ei',
  art: 'klang',
  zeichen: 'Ei ei',
  abtippen: 'boss',
  blaetter: [['tafel', 'Silben'], ['ketten', 'Ketten'], ['woerter', 'Wörter']],
  level: [
    {
      id: 'l1',
      hinweis: 'EI sind zwei Buchstaben, aber ein Klang: „ai“ wie in „Ei“. Nicht E und I einzeln lesen. Mit einem Finger unter beide Buchstaben zugleich zeigen.',
      probe: ['mei', 'lei', 'sei'],
      tafel: [['EI', 'MEI', 'LEI', 'NEI', 'SEI'], ['REI', 'HEI', 'BEI', 'KEI', 'SCHEI'],
              ['MEIT', 'LEIN', 'NEIS', 'FEIL', 'HEIM'], ['KEIP', 'TEIS', 'BEIF', 'GEIN', 'SCHEIT']],
      ketten: [['MEI-LA', 'LEI-NO', 'NEI-SU', 'SEI-MO'],
               ['REI-KA', 'HEI-TO', 'BEI-LU', 'KEI-RA'],
               ['MEI-LA-NO', 'SCHEI-RU-TA', 'KEI-MO-SA'],
               ['REI-SA-LU', 'HEI-MU-LA', 'LEI-TU-RA']],
      woerter: [['Sei-fe', 'Schwein', 'Brei'], ['rei-tet', 'Krei-de', 'Mei-se'],
                ['drei', 'Kleid', 'zeigt'], ['Fei-er', 'klein', 'Bein'], ['weil', 'eins', 'Frei-tag']],
      anlauf: ['EI', 'MEI', 'LEI', 'NEI', 'SEI', 'REI', 'HEI', 'BEI', 'KEI', 'SCHEI', 'SCHWEI', 'KREI'],
      z4: ['Sei-fe', 'Schwein'],
      z5: ['Sei-fen-bla-se', 'Ein-horn'],
      zMehr: ['Brei', 'Kleid', 'Sei-te', 'wei-nen'],
      bilder: ['Sei-fe', 'Schwein', 'Krei-de', 'Mei-se', 'rei-tet', 'zeigt'],
      z6: 'Ein Schwein rei-tet ein Schaf.',
      szene: { saetze: ['Ma-ma eilt mit Ei-ern.', 'Rums! Die Ei-er sind Brei!'],
               heft: 'Wer reitet auf wem? Womit eilt Mama? Was passiert mit den Eiern?' },
      frage: 'Wer reitet hier, und auf wem? Und was passiert mit Mamas Eiern?'
    },
    {
      id: 'l2',
      hinweis: 'AI klingt genau wie EI: Mai, Hai, Mais. Zwei Schreibweisen, ein Klang. Lange Wörter wie Pa-pa-gei erst in Silben, dann in einem Zug.',
      probe: ['mai', 'hai', 'zwei'],
      tafel: [['AI', 'MAI', 'HAI', 'KAI', 'LAI'], ['EIN', 'EIS', 'MEIN', 'KEIN', 'SEIL'],
              ['SCHLEI', 'ZWEI', 'KREI', 'BREI', 'FREI'], ['SCHLEIF', 'ZWEIG', 'KREIS', 'BREIT', 'FREIT']],
      ketten: [['MAI-LO', 'HAI-NU', 'KAI-SO', 'LAI-RA'],
               ['EIN-TA', 'SEIL-MO', 'KEIN-RU', 'FREI-LA'],
               ['SCHLEI-MA-NO', 'ZWEI-LU-TA', 'KREI-NU-LO'],
               ['HAI-MO-RA', 'MAI-SU-LE', 'BREI-TA-NO']],
      woerter: [['Hai-fisch', 'Mais', 'Pa-pa-gei'], ['Schlei-fe', 'Rei-fen', 'schreit'],
                ['Kai-ser', 'schleicht', 'Krei-sel'], ['Rei-se', 'weich', 'Gei-er']],
      anlauf: ['AI', 'MAI', 'KAI', 'LAI', 'EIS', 'MEIN', 'SEIL', 'SCHLEI', 'ZWEI', 'KREI', 'BREI', 'FREI'],
      z4: ['Pa-pa-gei', 'Hai-fisch'],
      z5: ['Schleim', 'Ge-heim-nis'],
      zMehr: ['Mais', 'schleicht', 'Po-li-zei', 'Ei-mer'],
      bilder: ['Hai-fisch', 'Mais', 'Pa-pa-gei', 'Schlei-fe', 'schreit'],
      z6: 'Mei-sen bin-den dem Schwein ei-ne ro-te Schlei-fe.',
      frage: 'Was bekommt das Schwein, und von wem?',
      szene: { saetze: ['A-ra schreit: Ein Hai!', 'Das Schaf rast in den Mais.'],
               heft: 'Was schreit Ara? Wohin rast das Schaf? War es wirklich ein Hai?' },
      sinn: {
        satz: 'Das Schaf rast in den Mais.',
        richtig: 'sz-ei-l2-1',
        wahl: [
          { s: 'sz-ei-l2-1', wer: 'schaf', tut: 'rast', was: 'mais', bild: 'Ein Schaf rennt mit wehenden Ohren mitten in ein hohes Maisfeld hinein.' },
          { s: 'sz-ei-l2-2', wer: 'schwein', tut: 'rast', was: 'mais', bild: 'Ein rosa Schwein rennt mit wehenden Ohren mitten in ein hohes Maisfeld hinein.' },
          { s: 'sz-ei-l2-3', wer: 'schaf', tut: 'rast', was: 'reifen', bild: 'Ein Schaf rennt mit wehenden Ohren mitten durch einen großen Reifen hindurch, ohne Maisfeld.' }
        ]
      },
      sinnMehr: [
        {
          satz: 'Mei-sen bin-den dem Schwein ei-ne ro-te Schlei-fe.',
          richtig: 'sz-ei-l2-s1-1',
          wahl: [
            { s: 'sz-ei-l2-s1-1', wer: 'meisen', tut: 'binden', was: 'schleife', bild: 'Zwei kleine Meisen flattern um ein rosa Schwein und binden ihm eine große rote Schleife um den Hals.' },
            { s: 'sz-ei-l2-s1-2', wer: 'ara', tut: 'binden', was: 'schleife', bild: 'Ein bunter Ara flattert um dasselbe rosa Schwein und bindet ihm eine große rote Schleife um den Hals.' },
            { s: 'sz-ei-l2-s1-3', wer: 'meisen', tut: 'binden', was: 'schal', bild: 'Zwei kleine Meisen flattern um dasselbe rosa Schwein und binden ihm einen blauen Schal um den Hals.' }
          ]
        },
        {
          satz: 'A-ra schreit: Ein Hai!',
          richtig: 'sz-ei-l2-s2-1',
          wahl: [
            { s: 'sz-ei-l2-s2-1', wer: 'ara', tut: 'schreit', was: 'hai', bild: 'Ein bunter Ara sitzt auf einem Ast am Wasser und schreit mit weit offenem Schnabel, im Wasser ragt eine spitze graue Flosse heraus.' },
            { s: 'sz-ei-l2-s2-2', wer: 'meise', tut: 'schreit', was: 'hai', bild: 'Eine kleine Meise sitzt auf demselben Ast am Wasser und schreit mit weit offenem Schnabel, im Wasser ragt dieselbe spitze graue Flosse heraus.' },
            { s: 'sz-ei-l2-s2-3', wer: 'ara', tut: 'schreit', was: 'ente', bild: 'Ein bunter Ara sitzt auf demselben Ast am Wasser und schreit mit weit offenem Schnabel, im Wasser schwimmt eine gelbe Badeente.' }
          ]
        }
      ]
    }
  ],
  boss: {
    id: 'boss',
    hinweis: 'EI und AI gemischt. Liest das Kind „e-i“: beide Buchstaben mit einem Finger zeigen, ein Klang. Zwei Wörter kamen im Buch noch nie vor (Pfeife, Scheibe): hier wird wirklich erlesen, nicht wiedererkannt.',
    anlauf: ['EI', 'MEI', 'LEI', 'NEI', 'SEI', 'REI', 'HEI', 'BEI', 'KEI', 'SCHEI', 'AI', 'MAI', 'KAI', 'EIS', 'MEIN',
             'SEIL', 'SCHLEI', 'KREI', 'FREI', 'PREI'],
    z4: ['Krei-de', 'Schlei-fe', 'Pfei-fe', 'Schei-be'],
    z5: ['Gei-ge', 'Ei-ei-ei'],
    zMehr: ['Sei-fe', 'Hai-fisch', 'Ar-beit', 'Zeit', 'bei-de', 'Wei-de'],
    z6: 'Ha-ha! Zwei Schwei-ne ba-den im Brei.',
    szene: { saetze: ['Zwei Schwei-ne tei-len ei-ne Sei-fe.', 'Das Schaf schreit: Sei-fe? Nein! Kei-ne Sei-fe!'],
             heft: 'Wie viele Schweine sind es, und was teilen sie? Mag das Schaf Seife?' },
    fremd: ['Pfei-fe', 'Schei-be'],
    frage: 'Wo baden die Schweine, was teilen sie, und was ruft das Schaf?',
    sinn: {
      satz: 'Zwei Schwei-ne tei-len ei-ne Sei-fe.',
      richtig: 'sz-ei-boss-1',
      wahl: [
        { s: 'sz-ei-boss-1', wer: 'zwei schweine', tut: 'teilen', was: 'seife', bild: 'Zwei rosa Schweine sitzen zusammen in einer Badewanne voller Schaum und halten gemeinsam ein Stück Seife.' },
        { s: 'sz-ei-boss-2', wer: 'drei schweine', tut: 'teilen', was: 'seife', bild: 'Drei rosa Schweine sitzen zusammen in einer Badewanne voller Schaum und halten gemeinsam ein Stück Seife.' },
        { s: 'sz-ei-boss-3', wer: 'zwei schweine', tut: 'teilen', was: 'schleife', bild: 'Zwei rosa Schweine sitzen zusammen in einer Badewanne voller Schaum und halten gemeinsam eine große rote Schleife.' }
      ]
    },
    sinnMehr: [
      {
        satz: 'Ha-ha! Zwei Schwei-ne ba-den im Brei.',
        richtig: 'sz-ei-boss-s1-1',
        wahl: [
          { s: 'sz-ei-boss-s1-1', wer: 'zwei schweine', tut: 'baden', was: 'brei', bild: 'Zwei rosa Schweine sitzen vergnügt in einer Badewanne voller dickem, hellem Brei.' },
          { s: 'sz-ei-boss-s1-2', wer: 'drei schweine', tut: 'baden', was: 'brei', bild: 'Drei rosa Schweine sitzen vergnügt in derselben Badewanne voller dickem, hellem Brei.' },
          { s: 'sz-ei-boss-s1-3', wer: 'zwei schweine', tut: 'baden', was: 'wasser', bild: 'Zwei rosa Schweine sitzen vergnügt in derselben Badewanne voller klarem Wasser.' }
        ]
      },
      {
        satz: 'Das Schaf schreit: Sei-fe? Nein! Kei-ne Sei-fe!',
        richtig: 'sz-ei-boss-s3-1',
        wahl: [
          { s: 'sz-ei-boss-s3-1', wer: 'schaf', tut: 'schreit', was: 'seife', bild: 'Neben der Badewanne mit den zwei Schweinen steht ein Schaf, schreit und hebt abwehrend die Vorderhufe gegen das Stück Seife, das ihm ein Schwein hinhält.' },
          { s: 'sz-ei-boss-s3-2', wer: 'ara', tut: 'schreit', was: 'seife', bild: 'Neben derselben Badewanne sitzt ein bunter Ara, schreit und hebt abwehrend die Flügel gegen das Stück Seife, das ihm ein Schwein hinhält.' },
          { s: 'sz-ei-boss-s3-3', wer: 'schaf', tut: 'schreit', was: 'schleife', bild: 'Neben derselben Badewanne steht ein Schaf, schreit und hebt abwehrend die Vorderhufe gegen die große rote Schleife, die ihm ein Schwein hinhält.' }
        ]
      }
    ]
  },
  bewohner: [
    { s: 'bw-schwein', wer: 'Schwein mit Schleife', bild: 'Ein fröhliches rosa Schwein steht auf allen vier Beinen und trägt eine große rote Schleife am Ohr.' },
    { s: 'bw-meise', wer: 'Meise', bild: 'Eine kleine Blaumeise mit gelbem Bauch sitzt auf einem Zweig und hält ein rotes Band im Schnabel.' }
  ],
  schatz: [
    { art: 'sprichwort', text: 'Lü-gen ha-ben kur-ze Bei-ne.' },
    { art: 'witz', text: 'Das Schwein ruft: Hü, Schaf! Das Schaf: Ei-le mit Wei-le.' },
    { art: 'raetsel', text: 'Was hat ein Horn, ist kein Ein-horn?', loesung: 'Ein Nas-horn' },
    { art: 'zunge', text: 'Zwi-schen zwei Zwetsch-gen-zwei-gen zwit-schern zwei Schwal-ben.' },
    { art: 'witz', text: 'Ein Wolf im Schafs-pelz? Nein, ein Schaf im Wolfs-pelz!' },
    { art: 'sprichwort', text: 'Ein-mal ist kein-mal.' },
    { art: 'raetsel', text: 'Was hat ei-nen Hut, ein Bein, kei-nen Kopf?', loesung: 'Ein Pilz' },
    { art: 'reim', text: 'Mei-sen rei-sen lei-se, Pa-pa-gei-en krei-schen.' },
    { art: 'satz', text: 'Das Schaf weint nicht, weil es am Frei-tag Brei gibt.' }
  ]
};
