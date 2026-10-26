window.LAUTBUCH_TEILE = window.LAUTBUCH_TEILE || {};
window.LAUTBUCH_TEILE.e = {
  id: 'e',
  art: 'vokal',
  vokal: 'E',
  zeichen: 'E e',
  kaertchen: 'E',
  abtippen: 'boss',
  blaetter: [['tafel', 'Silben'], ['ketten', 'Ketten'], ['woerter', 'Wörter']],
  level: [
    {
      id: 'l1',
      hinweis: 'Das E hat zwei Klänge: lang wie in E-sel, am Wortende ganz leise wie in Ro-se. Laut halten und ins E gleiten: mmm-eee → ME. In Ru-he hört man das h kaum: Silbe für Silbe lesen, dann das Wort natürlich sagen.',
      tafel: [['E', 'ME', 'LE', 'NE'], ['SE', 'FE', 'RE', 'HE'],
              ['RU', 'RE', 'HU', 'HE'], ['MO', 'ME', 'LO', 'LE']],
      ketten: [['ME-LA', 'LE-NU', 'NE-MU', 'SE-LU'],
               ['FE-RA', 'RE-HO', 'HE-MI', 'LU-SE'],
               ['ME-LA-NU', 'SE-FI-RO', 'HE-LO-MA'],
               ['NO-SE-LU', 'FE-LU-NA', 'RO-ME-HA']],
      woerter: [['Ha-se', 'Ro-se', 'Ho-se'], ['Na-me', 'Ru-he', 'Me-lo-ne'],
                ['na-he', 'Si-re-ne', 'lo-se'], ['Ro-si-ne', 'A-re-na', 'Fi-na-le']],
      anlauf: ['ME', 'LE', 'NE', 'SE', 'FE', 'RE', 'HE', 'E'],
      z4: ['Ha-se', 'Me-lo-ne'],
      z5: ['He-he', 'Na-se'],
      zMehr: ['Ro-se', 'Si-re-ne', 'Ma-ri-ne', 'Li-ni-e'],
      z6: 'Ru-he, La-ma! Ru-he, Ha-se! Ru-he, O-ma!',
      frage: 'Wer soll alles leise sein? Wer muss am Ende leise sein?'
    },
    {
      id: 'l2',
      hinweis: 'Erst das E, dann den Laut anhängen: e-lll → EL. Bei -en und -el am Wortende klingt das E ganz leise: Ha-sen, E-sel. Das Wort danach einmal natürlich sprechen.',
      tafel: [['EM', 'EL', 'EN', 'ES', 'EF'], ['MEL', 'SEM', 'NES', 'LEM', 'FEL'],
              ['HEL', 'REM', 'NEL', 'HES', 'LEF'], ['REN', 'SEN', 'NEM', 'HEM', 'RES']],
      ketten: [['EL-MA', 'SEM-LO', 'MEL-FA', 'HES-NI'],
               ['FES-LA', 'NEM-SA', 'REL-MI', 'LEN-HA'],
               ['SEL-MA-NU', 'HEM-LA-SI', 'NEL-FO-MA'],
               ['MES-LA-RA', 'FEL-MI-SA', 'RES-NA-LU']],
      woerter: [['E-sel', 'Am-sel', 'Helm'], ['O-fen', 'Ha-sen', 'Senf'],
                ['ler-nen', 'Fel-sen', 'elf'], ['Ra-sen', 'ma-len', 'fern']],
      anlauf: ['EM', 'EN', 'EL', 'ES', 'EF', 'MEL', 'SEM', 'NEL', 'HEL', 'ME', 'LE', 'NE'],
      z4: ['E-sel', 'Ha-sen'],
      z5: ['E-mu', 'El-fe'],
      zMehr: ['Am-sel', 'Fel-sen', 'hel-fen', 'ho-len'],
      bilder: ['E-sel', 'Am-sel', 'Helm', 'O-fen', 'Ha-sen'],
      z6: 'Ru-he! Ha-sen le-sen.',
      frage: 'Was machen die Hasen, und warum soll es still sein?',
      sinn: {
        satz: 'Ru-he! Ha-sen le-sen.',
        richtig: 'sz-e-l2-1',
        wahl: [
          { s: 'sz-e-l2-1', wer: 'zwei hasen', tut: 'lesen', was: '', bild: 'Zwei Hasen sitzen auf einem Teppich in einer gemütlichen Bücherecke und lesen jeder in einem Buch.' },
          { s: 'sz-e-l2-2', wer: 'zwei esel', tut: 'lesen', was: '', bild: 'Zwei Esel sitzen auf demselben Teppich in derselben Bücherecke und lesen jeder in einem Buch.' },
          { s: 'sz-e-l2-3', wer: 'zwei hasen', tut: 'malen', was: '', bild: 'Zwei Hasen sitzen auf demselben Teppich in derselben Bücherecke und malen jeder auf einem Blatt.' }
        ]
      },
      szene: { heft: 'Wer liest? Hasen oder Esel? Lesen oder malen? Beides steht im Satz.' }
    },
    {
      id: 'l3',
      hinweis: 'Kurze Laute direkt ins E: b-e → BE. Manche Silben klingen wie Buchstabennamen (BE, TE) – trotzdem den Laut zeigen, nicht den Namen. In En-te ist das E kurz. pus-tet ist ein Tu-Wort.',
      tafel: [['PE', 'TE', 'KE', 'BE'], ['GE', 'DE', 'PET', 'KEN'],
              ['BEL', 'GES', 'DEN', 'TEK'], ['MEP', 'SET', 'REST', 'KEST']],
      ketten: [['TE-KA', 'KE-BO', 'BE-SA', 'GE-GU'],
               ['DE-MA', 'PE-NA', 'KET-MA', 'PEL-TA'],
               ['PE-TA-KA', 'KEL-MA-TA', 'BE-GA-DU'],
               ['TE-RA-PA', 'DE-KAT-NU', 'GEL-PA-SU']],
      woerter: [['En-te', 'Ka-mel', 'pus-tet'], ['To-ma-te', 'Ra-ke-te', 'Ba-na-ne'],
                ['Ka-me-ra', 'o-ben', 're-det'], ['Tan-te', 'Bo-den', 'e-gal', 'Am-pel'], ['Heft', 'Ta-fel', 'El-tern', 'Ka-bel']],
      anlauf: ['PE', 'TE', 'KE', 'BE', 'GE', 'DE', 'ET', 'EK', 'ME', 'LE', 'SE', 'EN'],
      z4: ['En-te', 'Ra-ke-te'],
      z5: ['Te-le-fon', 'Na-bel'],
      zMehr: ['Ka-mel', 'o-ben', 'Er-de', 'Ho-tel'],
      bilder: ['En-te', 'Ka-mel', 'Ra-ke-te', 'Ba-na-ne', 'pus-tet', 'Ka-bel', 'Am-pel'],
      z6: 'Das Ka-mel ba-det mit En-ten.',
      frage: 'Mit wem badet das Kamel?',
      sinn: {
        satz: 'Das Ka-mel ba-det mit En-ten.',
        richtig: 'sz-e-l3-1',
        wahl: [
          { s: 'sz-e-l3-1', wer: 'kamel', tut: 'badet', was: 'enten', bild: 'Ein Kamel sitzt in einer Badewanne voller Schaum, der Höcker ragt deutlich aus dem Schaum, um es herum schwimmen drei kleine Enten.' },
          { s: 'sz-e-l3-2', wer: 'lama', tut: 'badet', was: 'enten', bild: 'Ein Lama sitzt in derselben Badewanne voller Schaum, um es herum schwimmen drei kleine Enten.' },
          { s: 'sz-e-l3-3', wer: 'kamel', tut: 'badet', was: 'amseln', bild: 'Ein Kamel sitzt in derselben Badewanne voller Schaum, der Höcker ragt deutlich aus dem Schaum, um es herum planschen drei Amseln.' }
        ]
      }
    },
    {
      id: 'l4',
      hinweis: 'SCHE ist eine Silbe. Z klingt wie ts: Ze-bra. Am Ende von Ta-sche und Wel-pe klingt das E nur leise. Mu-schel und ku-schelt genau ansehen: fast gleich.',
      tafel: [['WE', 'JE', 'ZE', 'SCHE'], ['WEN', 'JEL', 'ZEN', 'SCHEM'],
              ['SEP', 'ZEP', 'SCHEP', 'TEP'], ['WEK', 'JES', 'ZEF', 'SCHEN']],
      ketten: [['WE-JA', 'JE-ZA', 'ZE-SCHA', 'SCHE-LO'],
               ['ME-WA', 'TE-JA', 'KE-ZA', 'NE-SCHA'],
               ['SCHE-LU-LA', 'ZE-WO-JA', 'JE-SCHU-MA'],
               ['MO-JE-WA', 'ZE-SCHI-PU', 'WE-ZA-NO']],
      woerter: [['Ze-bra', 'Wol-ke', 'Ta-sche'], ['Mu-schel', 'ku-schelt', 'Wel-pe'],
                ['Schu-le', 'war-tet', 'Ze-he'], ['Zelt', 'Ju-wel', 'wa-schen']],
      anlauf: ['WE', 'JE', 'ZE', 'SCHE', 'JEN', 'WES', 'SCHEN', 'PE', 'TE', 'EM', 'DE', 'EL'],
      z4: ['Ze-bra', 'Wel-pe'],
      z5: ['Wu-schel', 'Sche-re'],
      zMehr: ['Wol-ke', 'war-tet', 'Welt', 'et-was'],
      bilder: ['Ze-bra', 'Wol-ke', 'Mu-schel', 'Wel-pe', 'ku-schelt'],
      z6: 'Das Ze-bra ruft: Schaf, wo bist du?',
      frage: 'Wen sucht das Zebra, und was machen die beiden dann?',
      szene: { saetze: ['Das Schaf ku-schelt mit dem Ze-bra.'],
               heft: 'Wen sucht das Zebra? Was macht das Schaf mit dem Zebra?' },
      sinn: {
        satz: 'Das Schaf ku-schelt mit dem Ze-bra.',
        richtig: 'sz-e-l4-1',
        wahl: [
          { s: 'sz-e-l4-1', wer: 'schaf', tut: 'kuschelt', was: 'zebra', bild: 'Ein Schaf und ein Zebra liegen auf einer Wiese dicht beieinander und kuscheln sich aneinander.' },
          { s: 'sz-e-l4-2', wer: 'schaf', tut: 'tanzt', was: 'zebra', bild: 'Ein Schaf und ein Zebra tanzen auf derselben Wiese miteinander.' },
          { s: 'sz-e-l4-3', wer: 'schaf', tut: 'kuschelt', was: 'welpe', bild: 'Ein Schaf und ein kleiner Welpe liegen auf derselben Wiese dicht beieinander und kuscheln sich aneinander.' }
        ]
      },
      sinnMehr: [
        {
          satz: 'Das Ze-bra ruft: Schaf, wo bist du?',
          richtig: 'sz-e-l4-s1-1',
          wahl: [
            { s: 'sz-e-l4-s1-1', wer: 'zebra', tut: 'ruft', was: 'schaf', bild: 'Ein Zebra steht auf einer Wiese und ruft mit weit offenem Maul, im Gras dahinter liegt ein Schaf zusammengerollt wie eine kleine weiße Wolke.' },
            { s: 'sz-e-l4-s1-2', wer: 'esel', tut: 'ruft', was: 'schaf', bild: 'Ein Esel steht auf derselben Wiese und ruft mit weit offenem Maul, im Gras dahinter liegt dasselbe Schaf zusammengerollt wie eine kleine weiße Wolke.' },
            { s: 'sz-e-l4-s1-3', wer: 'zebra', tut: 'schläft', was: 'schaf', bild: 'Ein Zebra liegt auf derselben Wiese und schläft, im Gras dahinter liegt dasselbe Schaf zusammengerollt wie eine kleine weiße Wolke.' }
          ]
        }
      ]
    }
  ],
  boss: {
    id: 'boss',
    hinweis: 'Das ganze E gemischt: lang, kurz und leise am Ende. Jetzt sind alle fünf Vokale da. Vorgezeigt ist kein Fehler.',
    anlauf: ['ME', 'LE', 'NE', 'SE', 'FE', 'RE', 'HE', 'EM', 'EN', 'EL', 'MEL', 'PE', 'TE', 'KE', 'BE', 'GE', 'DE',
             'ET', 'WE', 'JE', 'ZE', 'SCHE', 'KEM', 'TEL', 'WES'],
    z4: ['Am-sel', 'Ra-ke-te', 'Mu-schel'],
    z5: ['Trom-pe-te', 'Fe-ri-en'],
    zMehr: ['Ha-se', 'Ha-sen', 're-det', 'Ma-schi-ne', 'Pa-ket'],
    z6: 'Pst! Das La-ma holt den Pin-sel.',
    szene: { saetze: ['Hi-hi! Das La-ma malt den E-sel ro-sa.', 'Ha-sen, En-ten, Ze-bra ru-fen: Ro-sa! Ro-sa!'],
             heft: 'Wen malt das Lama an, und in welcher Farbe? Zeig im Bild den Esel. Was wollen die anderen jetzt?' },
    frage: 'Was holt das Lama, wen malt es an, und was wollen die anderen danach?',
    sinn: {
      satz: 'Hi-hi! Das La-ma malt den E-sel ro-sa.',
      richtig: 'sz-e-boss-1',
      wahl: [
        { s: 'sz-e-boss-1', wer: 'lama', tut: 'malt rosa', was: 'esel', bild: 'Ein Lama tupft mit einem Pinsel große Tupfen in hellem Rosa auf das Fell eines Esels, der geduldig auf einer Wiese steht.' },
        { s: 'sz-e-boss-2', wer: 'lama', tut: 'malt lila', was: 'esel', bild: 'Ein Lama tupft mit einem Pinsel große Tupfen in kräftigem Dunkellila auf das Fell eines Esels, der geduldig auf derselben Wiese steht.' },
        { s: 'sz-e-boss-3', wer: 'lama', tut: 'malt rosa', was: 'kamel', bild: 'Ein Lama tupft mit einem Pinsel große Tupfen in hellem Rosa auf das Fell eines Kamels, das geduldig auf derselben Wiese steht.' }
      ]
    },
    sinnMehr: [
      {
        satz: 'Pst! Das La-ma holt den Pin-sel.',
        richtig: 'sz-e-boss-s1-1',
        wahl: [
          { s: 'sz-e-boss-s1-1', wer: 'lama', tut: 'holt', was: 'pinsel', bild: 'Ein Lama schleicht auf Zehenspitzen über eine Wiese und trägt einen großen Pinsel im Maul.' },
          { s: 'sz-e-boss-s1-2', wer: 'esel', tut: 'holt', was: 'pinsel', bild: 'Ein Esel schleicht auf Zehenspitzen über dieselbe Wiese und trägt einen großen Pinsel im Maul.' },
          { s: 'sz-e-boss-s1-3', wer: 'lama', tut: 'holt', was: 'besen', bild: 'Ein Lama schleicht auf Zehenspitzen über dieselbe Wiese und trägt einen Besen im Maul.' }
        ]
      },
      {
        satz: 'Ha-sen, En-ten, Ze-bra ru-fen: Ro-sa! Ro-sa!',
        richtig: 'sz-e-boss-s3-1',
        wahl: [
          { s: 'sz-e-boss-s3-1', wer: 'hasen + enten + zebra', tut: 'rufen rosa', was: '', bild: 'Zwei Hasen, zwei Enten und ein Zebra stehen auf derselben Wiese in einer Reihe vor dem Lama mit dem Pinsel, recken Pfoten, Flügel und Huf hoch und rufen begeistert; daneben strahlt der Esel mit seinen hellrosa Tupfen.' },
          { s: 'sz-e-boss-s3-2', wer: 'hasen + enten + kamel', tut: 'rufen rosa', was: '', bild: 'Zwei Hasen, zwei Enten und ein Kamel stehen auf derselben Wiese in einer Reihe vor dem Lama mit dem Pinsel, recken Pfoten, Flügel und Huf hoch und rufen begeistert; daneben strahlt der Esel mit seinen hellrosa Tupfen.' },
          { s: 'sz-e-boss-s3-3', wer: 'hasen + enten + zebra', tut: 'laufen weg', was: '', bild: 'Zwei Hasen, zwei Enten und ein Zebra rennen auf derselben Wiese vor dem Lama mit dem Pinsel davon; daneben steht der Esel mit seinen hellrosa Tupfen.' }
        ]
      }
    ]
  },
  bewohner: [
    { s: 'bw-esel', wer: 'Esel', bild: 'Ein freundlicher grauer Esel mit rosa Farbtupfen im Fell steht von der Seite und lacht.' },
    { s: 'bw-kamel', wer: 'Kamel', bild: 'Ein gemütliches Kamel steht von der Seite, auf seinem Höcker sitzt eine kleine Ente.' }
  ],
  schatz: [
    { art: 'raetsel', text: 'Was hat Hu-fe in Pan-da-far-ben?', loesung: 'Das Ze-bra' },
    { art: 'raetsel', text: 'Was zischt zum Mars, mit Ro-bo als Pi-lot?', loesung: 'Ra-ke-te' },
    { art: 'zunge', text: 'Ha-sen ba-den in Ba-na-nen-ba-de-ho-sen.' },
    { art: 'witz', text: 'O-pa ruft O-ma an – mit Ba-na-ne!' },
    { art: 'witz', text: 'Was hat Scha-le, hat Saft, wan-dert? Wan-de-ri-ne!' },
    { art: 'reim', text: 'Wu-schel ku-schelt, Mu-schel tu-schelt.' },
    { art: 'sprichwort', text: 'Ge-lernt ist ge-lernt.' },
    { art: 'satz', text: 'Del-fi-ne ha-ben Na-men.' }
  ]
};
