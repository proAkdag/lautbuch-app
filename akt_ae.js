window.LAUTBUCH_TEILE = window.LAUTBUCH_TEILE || {};
window.LAUTBUCH_TEILE.ae = {
  id: 'ae',
  art: 'klang',
  zeichen: 'Ä ä',
  abtippen: 'boss',
  blaetter: [['tafel', 'Silben'], ['ketten', 'Ketten'], ['woerter', 'Wörter']],
  level: [
    {
      id: 'l1',
      hinweis: 'Ä klingt offen, fast wie das E in „Ente“, nur länger: ÄÄÄ. Das A mit den zwei Punkten ist nicht A. Den Laut dehnen, dann gleiten: mmm-äää → MÄ. In Krä-he hört man das h kaum: Silbe für Silbe lesen, dann das Wort natürlich sagen.',
      probe: ['mä', 'lä', 'kä'],
      tafel: [['Ä', 'MÄ', 'LÄ', 'NÄ', 'SÄ'], ['KÄ', 'GÄ', 'BÄ', 'SCHÄ', 'WÄ'],
              ['MÄT', 'LÄN', 'NÄS', 'FÄL', 'HÄM'], ['KÄP', 'TÄS', 'BÄF', 'GÄN', 'SCHÄT']],
      ketten: [['MÄ-LÄ', 'LÄ-NA', 'NÄ-SÄ', 'SÄ-FO'],
               ['KÄ-RU', 'GÄ-TO', 'BÄ-SI', 'WÄ-NI'],
               ['MÄ-LO-NA', 'SCHÄ-PI-RU', 'TÄ-SA-LI'],
               ['HÄ-MU-SA', 'RÄ-TO-KI', 'FÄ-LE-MO']],
      woerter: [['Kä-se', 'Sä-ge', 'schläft'], ['Äs-te', 'Gän-se', 'Krä-he'],
                ['Kä-fer', 'Bär', 'lä-chelt'], ['Mär-chen', 'Jä-ger', 'Rät-sel']],
      anlauf: ['MÄ', 'LÄ', 'NÄ', 'SÄ', 'KÄ', 'GÄ', 'BÄ', 'WÄ', 'SCHÄ', 'Ä', 'HÄN', 'GÄN'],
      z4: ['Kä-se', 'Gän-se'],
      z5: ['Tän-ze-rin', 'Kä-se-brot'],
      zMehr: ['Sä-ge', 'Bär', 'Hälf-te', 'Ge-rät'],
      bilder: ['Kä-se', 'Sä-ge', 'Gän-se', 'Krä-he', 'schläft'],
      z6: 'Pst! Das Schaf schläft im Kä-se.',
      frage: 'Wo schläft das Schaf? Ist das ein gutes Bett?'
    },
    {
      id: 'l2',
      hinweis: 'Jetzt kommen Laute nach dem Ä (ÄS, ÄN) und zwei Laute davor (SCHLÄ, TRÄ). Lange Wörter erst Silbe für Silbe, dann in einem Zug.',
      probe: ['käs', 'trä', 'schlä'],
      tafel: [['ÄM', 'ÄL', 'ÄN', 'ÄS', 'ÄT'], ['KÄS', 'HÄL', 'WÄS', 'TÄN', 'SCHÄL'],
              ['KRÄ', 'TRÄ', 'SCHLÄ', 'BLÄ', 'SCHWÄ'], ['KRÄT', 'TRÄN', 'SCHLÄF', 'BLÄS', 'SCHWÄM']],
      ketten: [['KÄS-LA', 'TRÄ-MO', 'SCHLÄ-NU', 'BLÄ-SO'],
               ['HÄL-TI', 'WÄN-TO', 'SCHWÄ-LU', 'MÄS-TA'],
               ['KRÄ-MO-LI', 'TÄN-SA-RÄ', 'BLÄ-NI-KO'],
               ['SCHLÄ-RU-NA', 'WÄS-TO-MI', 'FRÄ-LA-SU']],
      woerter: [['Schwä-ne', 'Ka-pi-tän', 'Hän-de'], ['Wä-sche', 'schält', 'Nä-gel'],
                ['Glä-ser', 'gräbt', 'Är-mel'], ['Kä-fig', 'schräg', 'Mäd-chen']],
      anlauf: ['ÄM', 'ÄL', 'ÄN', 'KÄS', 'HÄL', 'WÄS', 'TÄN', 'KRÄ', 'TRÄ', 'SCHLÄ', 'BLÄ', 'SCHWÄ'],
      z4: ['Ka-pi-tän', 'Schwä-ne'],
      z5: ['Wärm-fla-sche', 'er-käl-tet'],
      zMehr: ['Hän-de', 'gräbt', 'Lärm', 'Kräf-te'],
      bilder: ['Schwä-ne', 'Ka-pi-tän', 'Nä-gel', 'Wä-sche', 'schält', 'gräbt'],
      z6: 'Das Schaf wäscht Wä-sche.',
      frage: 'Was macht Kapitän Lama mit der Wäsche? Und warum sagt das Lama nicht, wohin die Reise geht?',
      szene: { saetze: ['Ka-pi-tän La-ma bin-det die Wä-sche an den Mast.', 'Das Schaf fragt: Wo-hin? Ka-pi-tän La-ma: Pst!'],
               heft: 'Was wäscht das Schaf? Was macht Kapitän Lama mit der Wäsche? Was antwortet das Lama auf die Frage „Wohin?“' },
      sinn: {
        satz: 'Ka-pi-tän La-ma bin-det die Wä-sche an den Mast.',
        richtig: 'sz-ae-l2-1',
        wahl: [
          { s: 'sz-ae-l2-1', wer: 'lama', tut: 'bindet', was: 'wäsche', bild: 'Ein Lama mit Kapitänsmütze steht in einem kleinen Kajak mit Mast und bindet bunte Wäsche (Hemd, Hose, Socken) als Segel an den Mast.' },
          { s: 'sz-ae-l2-2', wer: 'lama', tut: 'bindet', was: 'äste', bild: 'Ein Lama mit Kapitänsmütze steht in einem kleinen Kajak mit Mast und bindet ein Bündel Äste an den Mast.' },
          { s: 'sz-ae-l2-3', wer: 'schaf', tut: 'bindet', was: 'wäsche', bild: 'Ein Schaf steht in einem kleinen Kajak mit Mast und bindet bunte Wäsche (Hemd, Hose, Socken) als Segel an den Mast.' }
        ]
      },
      sinnMehr: [
        {
          satz: 'Das Schaf wäscht Wä-sche.',
          richtig: 'sz-ae-l2-s2-1',
          wahl: [
            { s: 'sz-ae-l2-s2-1', wer: 'schaf', tut: 'wäscht', was: 'wäsche', bild: 'Ein Schaf steht am Ufer neben dem kleinen Kajak und wäscht bunte Wäsche (Hemd, Hose, Socken) in einem Waschzuber.' },
            { s: 'sz-ae-l2-s2-2', wer: 'lama', tut: 'wäscht', was: 'wäsche', bild: 'Ein Lama mit Kapitänsmütze steht am selben Ufer neben dem Kajak und wäscht dieselbe bunte Wäsche in einem Waschzuber.' },
            { s: 'sz-ae-l2-s2-3', wer: 'schaf', tut: 'wäscht', was: 'käse', bild: 'Ein Schaf steht am selben Ufer neben dem Kajak und wäscht ein großes Stück Käse in einem Waschzuber.' }
          ]
        },
        {
          satz: 'Das Schaf fragt: Wo-hin? Ka-pi-tän La-ma: Pst!',
          richtig: 'sz-ae-l2-s3-1',
          wahl: [
            { s: 'sz-ae-l2-s3-1', wer: 'schaf + lama', tut: 'fragt + pst', was: '', bild: 'Im kleinen Kajak mit Wäschesegel schaut das Schaf fragend zu Kapitän Lama hoch, über dem Schaf schwebt ein Fragezeichen; das Lama mit Kapitänsmütze legt verschmitzt einen Huf an den Mund.' },
            { s: 'sz-ae-l2-s3-2', wer: 'krähe + lama', tut: 'fragt + pst', was: '', bild: 'Im selben Kajak mit Wäschesegel schaut eine schwarze Krähe fragend zu Kapitän Lama hoch, über der Krähe schwebt ein Fragezeichen; das Lama legt verschmitzt einen Huf an den Mund.' },
            { s: 'sz-ae-l2-s3-3', wer: 'schaf + lama', tut: 'fragt + zeigt', was: '', bild: 'Im selben Kajak mit Wäschesegel schaut das Schaf fragend zu Kapitän Lama hoch, über dem Schaf schwebt ein Fragezeichen; das Lama zeigt mit dem Huf weit hinaus auf eine Insel.' }
          ]
        }
      ]
    }
  ],
  boss: {
    id: 'boss',
    hinweis: 'Das ganze Ä gemischt. Wenn das Kind A statt Ä liest: auf die zwei Punkte zeigen, nicht vorsagen. Zwei Wörter kamen im Buch noch nie vor (Gäste, Fäden): hier wird wirklich erlesen, nicht wiedererkannt.',
    anlauf: ['MÄ', 'LÄ', 'NÄ', 'SÄ', 'KÄ', 'GÄ', 'BÄ', 'WÄ', 'SCHÄ', 'Ä', 'ÄM', 'ÄL', 'ÄN', 'KÄS', 'HÄL', 'TÄN',
             'KRÄ', 'TRÄ', 'SCHLÄ', 'BLÄ', 'SCHWÄ'],
    z4: ['Gän-se', 'Schwä-ne', 'Gäs-te', 'Fä-den'],
    z5: ['Hän-de-wa-schen', 'Tä-te-rä-tä'],
    zMehr: ['Kä-se', 'Ka-pi-tän', 'Ge-schäft', 'Plä-ne', 'Ärz-te', 'Nä-he'],
    z6: 'Das Ka-jak se-gelt, das Schaf schläft im Kä-se.',
    szene: { saetze: ['Krä-he Ka-la nascht Kä-se am Mast.', 'Rums! Ka-la plumpst in den Kä-se und lacht: Hä-hä!'],
             heft: 'Wer nascht den Käse, und wo sitzt sie? Wohin plumpst Kala, und über wen lacht sie?' },
    fremd: ['Gäs-te', 'Fä-den'],
    frage: 'Worauf schläft das Schaf, was nascht Krähe Kala, und wo landet sie?',
    sinn: {
      satz: 'Krä-he Ka-la nascht Kä-se am Mast.',
      richtig: 'sz-ae-boss-1',
      wahl: [
        { s: 'sz-ae-boss-1', wer: 'krähe', tut: 'nascht', was: 'käse', bild: 'Eine schwarze Krähe steht am Fuß des Masts eines kleinen Segelkajaks und pickt fröhlich an einem großen Stück Käse.' },
        { s: 'sz-ae-boss-2', wer: 'schaf', tut: 'nascht', was: 'käse', bild: 'Ein Schaf steht am Fuß des Masts eines kleinen Segelkajaks und knabbert fröhlich an einem großen Stück Käse.' },
        { s: 'sz-ae-boss-3', wer: 'krähe', tut: 'wäscht', was: 'käse', bild: 'Eine schwarze Krähe steht am Fuß des Masts eines kleinen Segelkajaks und wäscht ein großes Stück Käse in einer Schüssel mit Wasser.' }
      ]
    },
    sinnMehr: [
      {
        satz: 'Das Ka-jak se-gelt, das Schaf schläft im Kä-se.',
        richtig: 'sz-ae-boss-s1-1',
        wahl: [
          { s: 'sz-ae-boss-s1-1', wer: 'kajak + schaf', tut: 'segelt + schläft', was: 'käse', bild: 'Ein kleines Kajak mit Wäschesegel segelt über das Wasser, im Boot schläft ein Schaf zusammengerollt in einem großen Käselaib mit Löchern.' },
          { s: 'sz-ae-boss-s1-2', wer: 'kajak + schaf', tut: 'segelt + nascht', was: 'käse', bild: 'Dasselbe Kajak mit Wäschesegel segelt über das Wasser, im Boot sitzt das Schaf hellwach in dem großen Käselaib und knabbert daran.' },
          { s: 'sz-ae-boss-s1-3', wer: 'kajak + schaf', tut: 'segelt + schläft', was: 'korb', bild: 'Dasselbe Kajak mit Wäschesegel segelt über das Wasser, im Boot schläft das Schaf zusammengerollt in einem Wäschekorb.' }
        ]
      },
      {
        satz: 'Rums! Ka-la plumpst in den Kä-se und lacht: Hä-hä!',
        richtig: 'sz-ae-boss-s3-1',
        wahl: [
          { s: 'sz-ae-boss-s3-1', wer: 'krähe', tut: 'plumpst + lacht', was: 'käse', bild: 'Im selben Segelkajak ist die schwarze Krähe kopfüber in den großen Käselaib geplumpst, in dem das Schaf schläft; sie steckt bis zum Bauch im Käse, hat Käse am Schnabel und lacht über sich selbst, das Schaf schläft weiter.' },
          { s: 'sz-ae-boss-s3-2', wer: 'lama', tut: 'plumpst + lacht', was: 'käse', bild: 'Im selben Segelkajak ist das Lama mit Kapitänsmütze kopfüber in den großen Käselaib geplumpst, in dem das Schaf schläft; es hat Käse an der Nase und lacht über sich selbst, das Schaf schläft weiter.' },
          { s: 'sz-ae-boss-s3-3', wer: 'krähe', tut: 'plumpst + lacht', was: 'wasser', bild: 'Neben dem selben Segelkajak ist die schwarze Krähe mit einem Platsch ins Wasser geplumpst, sie paddelt mit den Flügeln und lacht über sich selbst; im Boot schläft das Schaf im Käse.' }
        ]
      }
    ]
  },
  bewohner: [
    { s: 'bw-kraehe', wer: 'Krähe Kala', bild: 'Eine freundliche schwarze Krähe mit glänzenden Federn steht auf beiden Beinen und hält ein kleines Stück Käse im Schnabel.' },
    { s: 'bw-elif', wer: 'Elif', bild: 'Ein Kind mit langem, glattem, sehr dunklem Haar und violettem Pullover steht ruhig da, die Arme leicht vom Körper.' }
  ],
  schatz: [
    { art: 'sprichwort', text: 'Kal-te Hän-de, war-mes Herz.' },
    { art: 'witz', text: 'Ka-pi-tän La-ma ist er-käl-tet. Hat-schi! Das Ka-jak se-gelt los.' },
    { art: 'raetsel', text: 'Was hat Äs-te am Kopf, nascht Ki-wis am Tisch?', loesung: 'Hirsch' },
    { art: 'zunge', text: 'Schwar-ze Schwä-ne wa-schen schwar-ze Wä-sche.' },
    { art: 'witz', text: 'Krä-he Ka-la ruft: Kra! Nun hat das Schaf den Kä-se.' },
    { art: 'reim', text: 'Far-be an den Hän-den, Far-be an den Wän-den. La-ma!' },
    { art: 'satz', text: 'Gän-se ge-hen im Gän-se-marsch, La-mas im La-ma-marsch.' },
    { art: 'witz', text: 'Das Schaf wäscht das La-ma. Hä? Nun ist es ro-sa!' },
    { art: 'witz', text: 'Wo ist der Kä-se? Hier? O-der un-ter dem Schaf? Hä-hä, Ka-la hat den Kä-se!' }
  ]
};
