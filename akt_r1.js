window.LAUTBUCH_TEILE = window.LAUTBUCH_TEILE || {};
window.LAUTBUCH_TEILE.r1 = {
  id: 'r1',
  art: 'regel',
  zeichen: 'ie ch',
  abtippen: 'boss',
  blaetter: [['tafel', 'Paare'], ['ketten', 'Ketten'], ['woerter', 'Wörter']],
  level: [
    {
      id: 'l1',
      hinweis: 'Zwei Buchstaben, ein Laut: ie ist ein langes I. Das e hört man nicht, es macht das I nur lang: Mi, Mie. Liest das Kind „i-e“, beide Buchstaben mit einem Finger zeigen. Das kleine Wort „die“ kommt jetzt überall vor.',
      probe: ['ie', 'mie', 'lie'],
      tafel: [['MI', 'MIE', 'LI', 'LIE'], ['SI', 'SIE', 'WI', 'WIE'],
              ['DI', 'DIE', 'TI', 'TIE'], ['NIE', 'RIE', 'HIE', 'FIE', 'KIE']],
      ketten: [['MIE-LA', 'SIE-RO', 'LIE-MU', 'FIE-NO'],
               ['NIE-SU', 'TIE-KA', 'WIE-LO', 'DIE-PA'],
               ['LA-MIE-TO', 'SU-RIE-NA', 'KO-FIE-LA'],
               ['MIE-RA-SO', 'PA-LIE-MU', 'NO-WIE-KA']],
      woerter: [['Zie-ge', 'Bie-ne', 'Wie-se'], ['Brief', 'liest', 'Flie-ge'],
                ['Knie', 'tief', 'Kie-sel'], ['Ma-gie', 'lief', 'niest']],
      anlauf: ['IE', 'MIE', 'LIE', 'SIE', 'RIE', 'FIE', 'TIE', 'WIE', 'NIE', 'ZIE'],
      z4: ['Zie-ge', 'Brief'],
      z5: ['Sie-ben', 'Rie-se'],
      zMehr: ['Bie-ne', 'tief', 'Frie-den', 'fiel'],
      bilder: ['Zie-ge', 'Bie-ne', 'Wie-se', 'Brief', 'liest', 'niest'],
      z6: 'Die Tie-re tu-scheln. Wie-so?',
      szene: { saetze: ['Die Zie-ge holt die Kis-te.', 'Das Schaf nascht den Brief!'],
               heft: 'Was machen die Tiere? Was holt die Ziege? Und was nascht das Schaf?' },
      frage: 'Was holt die Ziege, und warum merkt das Schaf nicht, was auf dem Brief steht?'
    },
    {
      id: 'l2',
      hinweis: 'Das ch hat zwei Klänge. Nach i und e faucht es vorne wie eine Katze: ich, Licht, Milch. Nach a, o und u kratzt es hinten im Hals: ach, Dach, Buch. Das Kind probiert beide und hört, welcher ein Wort ergibt. Das sch kennt es schon, das ist etwas anderes.',
      probe: ['ach', 'ich', 'och'],
      tafel: [['ACH', 'ICH', 'OCH', 'ECH'], ['Dach', 'dich', 'Nacht', 'nicht'],
              ['Bach', 'Licht', 'Loch', 'mich'], ['wach', 'Pech', 'hoch', 'sich', 'Fach']],
      ketten: [['MA-CHA', 'LI-CHE', 'RU-CHO', 'NE-CHI'],
               ['SO-CHE', 'TU-CHI', 'PO-CHA', 'KI-CHU'],
               ['MI-CHE-LO', 'LU-CHE-NI', 'NA-CHU-SO'],
               ['RI-CHE-MA', 'TO-CHA-LI', 'SU-CHI-MO']],
      woerter: [['Ku-chen', 'Buch', 'Elch'], ['Dra-che', 'lacht', 'Milch'],
                ['Kno-chen', 'kocht', 'acht'], ['Schach', 'echt', 'Tuch']],
      anlauf: ['ACH', 'ICH', 'OCH', 'UCH', 'ECH', 'CHA', 'CHE', 'CHO', 'CHI', 'CHU'],
      z4: ['Ku-chen', 'Buch'],
      z5: ['Ki-chern', 'Buch-sta-be'],
      zMehr: ['Elch', 'kocht', 'rech-nen', 'Wo-che'],
      bilder: ['Ku-chen', 'Buch', 'Elch', 'Dra-che', 'lacht'],
      z6: 'Pst! Das Schaf schnarcht.',
      szene: { saetze: ['O-ma holt den Ku-chen.', 'Das Schaf riecht den Ku-chen.'],
               heft: 'Was macht das Schaf? Was holt Oma? Was riecht das Schaf im Schlaf?' },
      frage: 'Was riecht das Schaf, obwohl es schnarcht?',
      sinn: {
        satz: 'O-ma holt den Ku-chen.',
        richtig: 'sz-r1-l2-1',
        wahl: [
          { s: 'sz-r1-l2-1', wer: 'oma', tut: 'holt', was: 'kuchen', bild: 'Oma schleicht auf Zehenspitzen über den Hof und trägt einen großen runden Kuchen auf einer Platte; hinten an der Scheunenwand schläft das Schaf.' },
          { s: 'sz-r1-l2-2', wer: 'opa', tut: 'holt', was: 'kuchen', bild: 'Opa schleicht auf Zehenspitzen über denselben Hof und trägt einen großen runden Kuchen auf einer Platte; hinten an der Scheunenwand schläft das Schaf.' },
          { s: 'sz-r1-l2-3', wer: 'oma', tut: 'holt', was: 'milch', bild: 'Oma schleicht auf Zehenspitzen über denselben Hof und trägt eine große Kanne Milch; hinten an der Scheunenwand schläft das Schaf.' }
        ]
      },
      sinnMehr: [
        {
          satz: 'Pst! Das Schaf schnarcht.',
          richtig: 'sz-r1-l2-s1-1',
          wahl: [
            { s: 'sz-r1-l2-s1-1', wer: 'schaf', tut: 'schnarcht', was: '', bild: 'An der Scheunenwand auf dem Hof liegt das Schaf auf dem Rücken und schnarcht mit offenem Mund, über ihm schweben kleine Schnarch-Wölkchen.' },
            { s: 'sz-r1-l2-s1-2', wer: 'zebra', tut: 'schnarcht', was: '', bild: 'An derselben Scheunenwand liegt das Zebra auf dem Rücken und schnarcht mit offenem Mund, über ihm schweben kleine Schnarch-Wölkchen.' },
            { s: 'sz-r1-l2-s1-3', wer: 'schaf', tut: 'tanzt', was: '', bild: 'An derselben Scheunenwand tanzt das Schaf hellwach auf den Hinterbeinen.' }
          ]
        },
        {
          satz: 'Das Schaf riecht den Ku-chen.',
          richtig: 'sz-r1-l2-s3-1',
          wahl: [
            { s: 'sz-r1-l2-s3-1', wer: 'schaf', tut: 'riecht', was: 'kuchen', bild: 'Das Schaf schläft an derselben Scheunenwand, hat aber die Nase hoch in der Luft und schnuppert mit geschlossenen Augen; eine feine Duftspur führt zu Omas Kuchen.' },
            { s: 'sz-r1-l2-s3-2', wer: 'hund', tut: 'riecht', was: 'kuchen', bild: 'Ein kleiner brauner Hund mit Schlappohren liegt an derselben Scheunenwand und schnuppert mit geschlossenen Augen; eine feine Duftspur führt zu Omas Kuchen. Das Schaf ist nicht da.' },
            { s: 'sz-r1-l2-s3-3', wer: 'schaf', tut: 'riecht', was: 'milch', bild: 'Das Schaf schläft an derselben Scheunenwand, hat aber die Nase hoch in der Luft und schnuppert mit geschlossenen Augen; eine feine Duftspur führt zu einer Kanne Milch.' }
          ]
        }
      ]
    },
    {
      id: 'l3',
      hinweis: 'Am Ende wird das d müde und klingt wie t: Bil-der, Bild. Genauso klingt g am Ende wie k (Ta-ge, Tag) und b wie p (gel-be, gelb). Das R am Ende wird ganz weich: Tier klingt fast wie Ti-a, der wie de-a. Erst das lange Wort lesen, dann das kurze: Der Buchstabe bleibt, nur der Klang wird müde. Jetzt geht auch „und“.',
      probe: ['ad', 'ag', 'er'],
      tafel: [['Ta-ge', 'Tag', 'Ber-ge', 'Berg'], ['Bil-der', 'Bild', 'gel-be', 'gelb'],
              ['Tie-re', 'Tier', 'We-ge', 'Weg'], ['Bund', 'bunt', 'Lie-der', 'Lied', 'Sieg']],
      ketten: [['LA-MAD', 'SO-FUG', 'KI-NOB', 'PA-LEG'],
               ['RU-MID', 'TE-LOB', 'MO-NAG', 'FI-SUD'],
               ['MA-LO-TER', 'SI-RU-NER', 'TO-FE-LAR'],
               ['NA-PU-SER', 'LU-KI-MOR', 'WE-DA-NIR']],
      woerter: [['Hund', 'Korb', 'Zug'], ['Kind', 'Ti-ger', 'A-bend'],
                ['Mond', 'rund', 'Tor'], ['Fe-der', 'klug', 'Rad'], ['o-der', 'hier', 'un-ter'], ['Mon-tag', 'lus-tig', 'Win-ter']],
      anlauf: ['TAG', 'BERG', 'BILD', 'GELB', 'WEG', 'TIER', 'MAD', 'FUG', 'NOB', 'LEG', 'MOR', 'NIR'],
      z4: ['Hund', 'Kind'],
      z5: ['Su-per', 'Gold'],
      zMehr: ['Korb', 'rund', 'Kin-der', 'Schwes-ter'],
      bilder: ['Hund', 'Korb', 'Zug', 'Kind', 'Ti-ger'],
      z6: 'Das Kind und der Hund pla-nen das Fest.',
      szene: { saetze: ['Pst! Das Schaf darf nichts mer-ken!'],
               heft: 'Wer plant das Fest? Und wer darf nichts davon merken?' },
      frage: 'Was planen das Kind und der Hund, und wer darf nichts davon merken?',
      sinn: {
        satz: 'Pst! Das Schaf darf nichts mer-ken!',
        richtig: 'sz-r1-l3-1',
        wahl: [
          { s: 'sz-r1-l3-1', wer: 'kind', tut: 'pst', was: 'schaf merkt nichts', bild: 'Das Kind in Latzhose legt den Finger an den Mund und versteckt ein großes bemaltes Blatt hinter dem Rücken; weiter hinten auf der Wiese knabbert das Schaf ahnungslos Gras und schaut weg.' },
          { s: 'sz-r1-l3-2', wer: 'kind', tut: 'ruft laut', was: 'schaf merkt nichts', bild: 'Das Kind in Latzhose ruft mit weit offenem Mund und schwenkt das große bemalte Blatt hoch in der Luft; weiter hinten auf derselben Wiese knabbert das Schaf ahnungslos Gras und schaut weg.' },
          { s: 'sz-r1-l3-3', wer: 'kind', tut: 'pst', was: 'schaf schaut zu', bild: 'Das Kind in Latzhose legt den Finger an den Mund und versteckt das große bemalte Blatt hinter dem Rücken; direkt daneben steht das Schaf und guckt neugierig über seine Schulter auf das Blatt.' }
        ]
      },
      sinnMehr: [
        {
          satz: 'Das Kind und der Hund pla-nen das Fest.',
          richtig: 'sz-r1-l3-s1-1',
          wahl: [
            { s: 'sz-r1-l3-s1-1', wer: 'kind + hund', tut: 'planen', was: 'fest', bild: 'Das Kind in Latzhose und ein kleiner brauner Hund mit Schlappohren liegen bäuchlings im Gras über einem großen Blatt, auf das ein Kuchen, Girlanden und ein Schaf gemalt sind; das Kind zeigt mit dem Stift darauf.' },
            { s: 'sz-r1-l3-s1-2', wer: 'kind + zebra', tut: 'planen', was: 'fest', bild: 'Das Kind in Latzhose und das Zebra liegen bäuchlings im selben Gras über demselben großen Blatt mit Kuchen, Girlanden und Schaf; das Kind zeigt mit dem Stift darauf.' },
            { s: 'sz-r1-l3-s1-3', wer: 'kind + hund', tut: 'schlafen', was: 'fest', bild: 'Das Kind in Latzhose und der kleine braune Hund liegen im selben Gras und schlafen mit den Köpfen auf demselben großen Blatt mit Kuchen, Girlanden und Schaf.' }
          ]
        }
      ]
    }
  ],
  boss: {
    id: 'boss',
    hinweis: 'Alles aus diesem Tor gemischt: ie, ch und die Ende-Regel. Liest das Kind „Hun-d“ mit hartem Nachklang, das Wort einmal natürlich vorsprechen. Vorgezeigt ist kein Fehler. Zwei Wörter kamen im Buch noch nie vor (Pferd, Burg): hier wird wirklich erlesen, nicht wiedererkannt.',
    anlauf: ['IE', 'MIE', 'LIE', 'SIE', 'ACH', 'ICH', 'OCH', 'CHA', 'CHE', 'TAG', 'BERG', 'WEG', 'GELB', 'TIER', 'MAD', 'LOB'],
    z4: ['Zie-ge', 'Dra-che', 'Ti-ger', 'Pferd', 'Burg'],
    z5: ['Rie-sen-rad', 'Ge-burts-tag'],
    zMehr: ['Bie-ne', 'Ku-chen', 'Hund', 'Diens-tag', 'Sams-tag', 'hin-ter', 'we-nig'],
    fremd: ['Pferd', 'Burg'],
    z6: 'Das Kind legt den Ku-chen in den Hun-de-korb.',
    szene: { saetze: ['Am A-bend schnarcht das Schaf im Hun-de-korb.', 'Und der Ku-chen? Das Schaf hat Ku-chen am Mund!'],
             heft: 'Wo versteckt das Kind den Kuchen? Wer schläft am Abend dort? Und wo ist der Kuchen jetzt?' },
    frage: 'Wo versteckt das Kind den Kuchen, wer schläft am Abend dort, und wo ist der Kuchen jetzt wohl?',
    sinn: {
      satz: 'Am A-bend schnarcht das Schaf im Hun-de-korb.',
      richtig: 'sz-r1-boss-1',
      wahl: [
        { s: 'sz-r1-boss-1', wer: 'schaf', tut: 'schnarcht', was: 'hundekorb', bild: 'Am Abend scheint der Mond durchs Scheunenfenster; im kleinen Hundekorb liegt zusammengerollt das Schaf und schnarcht, der kleine braune Hund sitzt davor und staunt.' },
        { s: 'sz-r1-boss-2', wer: 'hund', tut: 'schnarcht', was: 'hundekorb', bild: 'Am selben Abend scheint der Mond durchs Scheunenfenster; im kleinen Hundekorb liegt zusammengerollt der kleine braune Hund und schnarcht.' },
        { s: 'sz-r1-boss-3', wer: 'schaf', tut: 'schnarcht', was: 'kiste', bild: 'Am selben Abend scheint der Mond durchs Scheunenfenster; in der Holzkiste der Ziege liegt zusammengerollt das Schaf und schnarcht, der kleine braune Hund sitzt davor und staunt.' }
      ]
    },
    sinnMehr: [
      {
        satz: 'Das Kind legt den Ku-chen in den Hun-de-korb.',
        richtig: 'sz-r1-boss-s1-1',
        wahl: [
          { s: 'sz-r1-boss-s1-1', wer: 'kind', tut: 'legt', was: 'kuchen', bild: 'In der Scheune legt das Kind in Latzhose vorsichtig Omas runden Kuchen in den kleinen Hundekorb und deckt ihn halb mit der Hundedecke zu.' },
          { s: 'sz-r1-boss-s1-2', wer: 'oma', tut: 'legt', was: 'kuchen', bild: 'In derselben Scheune legt Oma vorsichtig den runden Kuchen in den kleinen Hundekorb und deckt ihn halb mit der Hundedecke zu.' },
          { s: 'sz-r1-boss-s1-3', wer: 'kind', tut: 'legt', was: 'buch', bild: 'In derselben Scheune legt das Kind in Latzhose vorsichtig ein dickes Buch in den kleinen Hundekorb und deckt es halb mit der Hundedecke zu.' }
        ]
      },
      {
        satz: 'Und der Ku-chen? Das Schaf hat Ku-chen am Mund!',
        richtig: 'sz-r1-boss-s3-1',
        wahl: [
          { s: 'sz-r1-boss-s3-1', wer: 'schaf', tut: 'hat am mund', was: 'kuchen', bild: 'Nahaufnahme im selben Hundekorb: Das Schaf schläft selig, um sein Maul kleben Kuchenkrümel und Sahne, neben ihm liegt die leere Kuchenplatte.' },
          { s: 'sz-r1-boss-s3-2', wer: 'hund', tut: 'hat am mund', was: 'kuchen', bild: 'Nahaufnahme am selben Hundekorb: Der kleine braune Hund hat Kuchenkrümel und Sahne um die Schnauze, neben ihm liegt die leere Kuchenplatte; das Schaf schläft sauber im Korb.' },
          { s: 'sz-r1-boss-s3-3', wer: 'schaf', tut: 'hat am mund', was: 'milch', bild: 'Nahaufnahme im selben Hundekorb: Das Schaf schläft selig mit einem weißen Milchbart um das Maul, neben ihm liegt eine umgekippte Milchkanne.' }
        ]
      }
    ]
  },
  bewohner: [
    { s: 'bw-hund', wer: 'Hund', bild: 'Ein kleiner brauner Hund mit Schlappohren sitzt aufrecht und wedelt mit dem Schwanz.' },
    { s: 'bw-ziege', wer: 'Ziege', bild: 'Eine weiße Ziege mit kleinem Kinnbart steht neben einer Holzkiste und legt verschwörerisch einen Huf darauf.' }
  ],
  schatz: [
    { art: 'sprichwort', text: 'Mor-gen-stund hat Gold im Mund.' },
    { art: 'sprichwort', text: 'Wer ras-tet, der ros-tet.' },
    { art: 'raetsel', text: 'Mal ist er rund, mal halb, mal ganz weg. Wer ist er?', loesung: 'Der Mond' },
    { art: 'raetsel', text: 'Was hat der Wald ganz am En-de?', loesung: 'Das D' },
    { art: 'zunge', text: 'Sie-ben Zie-gen sie-ben Sand.' },
    { art: 'witz', text: 'Was macht der Hund im Korb? Nichts. Da schnarcht das Schaf!' },
    { art: 'reim', text: 'Der Mond ist rund, der Hund ist bunt.' },
    { art: 'witz', text: 'Das Schaf liest das Buch – mit dem Mund!' },
    { art: 'satz', text: 'Mon-tag rech-nen, Diens-tag le-sen, Sams-tag ab zur Wie-se!' }
  ]
};
