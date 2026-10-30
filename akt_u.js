window.LAUTBUCH_TEILE = window.LAUTBUCH_TEILE || {};
window.LAUTBUCH_TEILE.u = {
  id: 'u',
  art: 'vokal',
  vokal: 'U',
  zeichen: 'U u',
  kaertchen: 'U',
  abtippen: 'boss',
  blaetter: [['tafel', 'Silben'], ['ketten', 'Ketten'], ['woerter', 'Wörter']],
  level: [
    {
      id: 'l1',
      hinweis: 'Lippen rund wie zum Pusten: uuu. Den Laut halten und ins U gleiten: mmm-uuu → MU. Erst langsam ziehen, dann schneller. Bei Lu-i-sa erst U, dann I einzeln hören lassen.',
      tafel: [['U', 'MU', 'LU', 'NU'], ['SU', 'FU', 'RU', 'HU'],
              ['LO', 'LU', 'NO', 'NU'], ['SI', 'SU', 'FI', 'FU']],
      ketten: [['MU-LA', 'LU-NI', 'NU-MO', 'SU-LU'],
               ['FU-RA', 'RU-HO', 'HU-MI', 'LO-SU'],
               ['MU-LA-NU', 'SU-FI-RU', 'HU-LO-MA'],
               ['NO-SU-LU', 'FU-LU-NA', 'RO-MU-HA']],
      woerter: [['U-hu', 'U-fo', 'Lu-na'], ['Hu-la', 'Na-nu', 'Su-si'], ['Lu-i-sa', 'Lu-si']],
      anlauf: ['MU', 'LU', 'NU', 'SU', 'FU', 'RU', 'HU', 'U'],
      z4: ['U-hu', 'Na-nu'],
      z5: ['Hu-hu', 'Hu-la-la'],
      zMehr: ['U-fo', 'Lu-na', 'Hu-la', 'Su-si'],
      z6: 'Na-nu, U-fo? A-ha, U-hu!',
      frage: 'Was war es wirklich: ein Ufo oder ein Uhu?'
    },
    {
      id: 'l2',
      hinweis: 'Jetzt kommt ein Laut nach dem U: UM, UN. Erst das U, dann den Laut anhängen und halten. Bei Wörtern Silbe für Silbe, der Finger zeigt mit.',
      tafel: [['UM', 'UL', 'UN', 'US', 'UF'], ['MUL', 'SUM', 'NUL', 'LUS', 'FUM'],
              ['HUL', 'RUN', 'NUM', 'HUS', 'LUF'], ['RUS', 'SUN', 'NUF', 'HUM', 'RUL']],
      ketten: [['UL-MA', 'SUM-LO', 'MUL-FA', 'HUS-NI'],
               ['FUS-LA', 'NUM-SA', 'RUL-MI', 'LUN-HA'],
               ['SUL-MA-NU', 'HUM-LA-SI', 'NUL-FO-MA'],
               ['MUS-LA-RA', 'FUL-MI-SA', 'RUS-NA-LU']],
      woerter: [['U-hus', 'U-fos', 'Mus'], ['Mu-lan', 'Ru-fus', 'uns'],
                ['Mi-nus', 'Huf', 'ums'], ['U-ni-form', 'um-so', 'U-hu-ruf']],
      anlauf: ['UM', 'UN', 'UL', 'US', 'UF', 'MUL', 'SUM', 'NUL', 'HUL', 'MU', 'LU', 'NU'],
      z4: ['U-hus', 'U-fos'],
      z5: ['Rums', 'Sum-sum'],
      zMehr: ['Mus', 'Ru-fus', 'Huf', 'U-ni-form'],
      bilder: ['U-hus', 'U-fos', 'Mus'],
      z6: 'Na-nu? U-hus im Mus!',
      frage: 'Wo sitzen die Uhus?',
      sinn: {
        satz: 'Na-nu? U-hus im Mus!',
        richtig: 'sz-u-l2-1',
        wahl: [
          { s: 'sz-u-l2-1', wer: 'zwei uhus', tut: 'sitzt', was: 'mus', bild: 'Zwei Uhus sitzen in einer großen Schüssel Apfelmus auf einem Küchentisch und schauen erstaunt.' },
          { s: 'sz-u-l2-2', wer: 'zwei ufos', tut: 'sitzt', was: 'mus', bild: 'Zwei kleine Ufos stecken in derselben Schüssel Apfelmus auf demselben Küchentisch.' },
          { s: 'sz-u-l2-3', wer: 'zwei uhus', tut: 'sitzt', was: 'pasta', bild: 'Zwei Uhus sitzen in derselben Schüssel auf demselben Küchentisch, die voller Nudeln ist, und schauen erstaunt.' }
        ]
      },
      szene: { heft: 'Uhus oder Ufos? Nur ein Laut ist anders: H oder F. Und worin sitzen sie?' }
    },
    {
      id: 'l3',
      hinweis: 'Kurze Laute direkt ins U: p-u → PU, ohne „pe-u“. Das U klingt mal lang (Hut), mal kurz (Bus) – beides ist richtig. turnt ist ein Tu-Wort.',
      tafel: [['PU', 'TU', 'KU', 'BU'], ['GU', 'DU', 'PUT', 'KUN'],
              ['BUL', 'GUS', 'DUN', 'TUK'], ['MUP', 'SUT', 'RUST', 'KUST']],
      ketten: [['TU-KA', 'KU-BO', 'BU-SA', 'GU-GU'],
               ['DU-MA', 'PU-NA', 'KUT-MA', 'PUL-TI'],
               ['PU-TA-KA', 'KUL-MA-TA', 'BU-GA-DU'],
               ['TU-RA-PA', 'DU-KAT-NU', 'GUL-PA-SU']],
      woerter: [['Pu-ma', 'Ka-ka-du', 'Hut'], ['Bus', 'Tu-kan', 'turnt'],
                ['Mu-sik', 'Luft', 'tun'], ['Ka-nu', 'Tu-ba', 'plus']],
      anlauf: ['PU', 'TU', 'KU', 'BU', 'GU', 'DU', 'UT', 'UK', 'MU', 'LU', 'SU', 'UN'],
      z4: ['Pu-ma', 'Ka-ka-du'],
      z5: ['Mut', 'Pups'],
      zMehr: ['Hut', 'Luft', 'Durst', 'Kunst'],
      bilder: ['Pu-ma', 'Ka-ka-du', 'Hut', 'Bus', 'turnt'],
      z6: 'Tut, tut! Pu-ma turnt im Bus!',
      szene: { saetze: ['Pu-ma turnt mit O-pas Hut!'],
               heft: 'Was macht Puma im Bus? Wessen Hut hat Puma auf – Opas oder Omas?' },
      frage: 'Was macht das Puma im Bus, und wessen Hut hat es dabei?',
      sinn: {
        satz: 'Tut, tut! Pu-ma turnt im Bus!',
        richtig: 'sz-u-l3-1',
        wahl: [
          { s: 'sz-u-l3-1', wer: 'puma', tut: 'turnt', was: 'bus', bild: 'Ein Puma macht in einem Bus zwischen den Sitzen einen Handstand.' },
          { s: 'sz-u-l3-2', wer: 'puma', tut: 'hupt', was: 'bus', bild: 'Ein Puma sitzt im selben Bus vorn am Lenkrad und drückt fröhlich auf die Hupe.' },
          { s: 'sz-u-l3-3', wer: 'kakadu', tut: 'turnt', was: 'bus', bild: 'Ein Kakadu macht im selben Bus zwischen den Sitzen einen Handstand.' }
        ]
      },
      sinnMehr: [
        {
          satz: 'Pu-ma turnt mit O-pas Hut!',
          richtig: 'sz-u-l3-s2-1',
          wahl: [
            { s: 'sz-u-l3-s2-1', wer: 'puma', tut: 'turnt', was: 'opas hut', bild: 'Im selben Bus springt der Puma turnend zwischen den Sitzen durch die Luft (Turnsprung, alle vier Pfoten sichtbar, der Schwanz geschwungen) und trägt dabei Opas grünen Filzhut mit Feder; Opa sitzt daneben ohne Hut und staunt.' },
            { s: 'sz-u-l3-s2-2', wer: 'kakadu', tut: 'turnt', was: 'opas hut', bild: 'Im selben Bus macht ein Kakadu zwischen den Sitzen einen Handstand und trägt dabei Opas grünen Filzhut mit Feder; Opa sitzt daneben ohne Hut und staunt.' },
            { s: 'sz-u-l3-s2-3', wer: 'puma', tut: 'turnt', was: 'omas hut', bild: 'Im selben Bus springt der Puma turnend zwischen den Sitzen durch die Luft (Turnsprung, alle vier Pfoten sichtbar, der Schwanz geschwungen) und trägt dabei Omas Strohhut mit Blume; Oma sitzt daneben ohne Hut und staunt.' }
          ]
        }
      ]
    },
    {
      id: 'l4',
      hinweis: 'SCHU ist eine Silbe, auch in Tschu-tschu. Z klingt wie ts. Bei Busch das SCH am Ende ruhig auszischen lassen. Bus und Busch genau ansehen.',
      tafel: [['WU', 'JU', 'ZU', 'SCHU'], ['WUN', 'JUL', 'ZUN', 'SCHUM'],
              ['SUP', 'ZUP', 'SCHUP', 'TUP'], ['WUK', 'JUS', 'ZUF', 'SCHUN']],
      ketten: [['WU-JA', 'JU-ZA', 'ZU-SCHA', 'SCHU-LO'],
               ['MU-WA', 'TU-JA', 'KU-ZA', 'NU-SCHA'],
               ['SCHU-LA-LA', 'ZU-WA-JA', 'JU-SCHA-MA'],
               ['MA-JU-WA', 'ZU-SCHA-PU', 'WU-ZA-NA']],
      woerter: [['Busch', 'Wut', 'rutscht'], ['husch', 'Schul-bus', 'Tschu-tschu'],
                ['Wunsch', 'Ju-ni', 'wo-zu'], ['Wurst', 'schmust', 'zupft']],
      anlauf: ['WU', 'JU', 'ZU', 'SCHU', 'JUN', 'WUS', 'SCHUN', 'PU', 'TU', 'UM', 'DU', 'UL'],
      z4: ['Schul-bus', 'Tschu-tschu'],
      z5: ['Wusch', 'Schu-bi-du'],
      zMehr: ['Busch', 'Ju-ni', 'Ju-li', 'Zu-kunft'],
      bilder: ['Busch', 'Schul-bus', 'Tschu-tschu', 'rutscht'],
      z6: 'Das La-ma hupt im Bus.',
      frage: 'Warum hupt das Lama?',
      szene: { saetze: ['Das Schaf nascht im Busch.'],
               heft: 'Bus oder Busch? Nur das SCH ist anders. Wo nascht das Schaf, und wo wartet das Lama?' },
      sinn: {
        satz: 'Das Schaf nascht im Busch.',
        richtig: 'sz-u-l4-1',
        wahl: [
          { s: 'sz-u-l4-1', wer: 'schaf', tut: 'nascht', was: 'busch', bild: 'Ein Schaf steht in einem grünen Busch neben einer Bushaltestelle und knabbert an den Blättern.' },
          { s: 'sz-u-l4-2', wer: 'schaf', tut: 'nascht', was: 'bus', bild: 'Ein Schaf sitzt in einem Bus an derselben Haltestelle und knabbert an einem Blatt.' },
          { s: 'sz-u-l4-3', wer: 'lama', tut: 'nascht', was: 'busch', bild: 'Ein Lama steht in demselben grünen Busch neben der Bushaltestelle und knabbert an den Blättern.' }
        ]
      },
      sinnMehr: [
        {
          satz: 'Das La-ma hupt im Bus.',
          richtig: 'sz-u-l4-s1-1',
          wahl: [
            { s: 'sz-u-l4-s1-1', wer: 'lama', tut: 'hupt', was: 'bus', bild: 'Ein Lama sitzt am Steuer eines Busses an der Bushaltestelle und drückt kräftig auf die Hupe.' },
            { s: 'sz-u-l4-s1-2', wer: 'schaf', tut: 'hupt', was: 'bus', bild: 'Ein Schaf sitzt am Steuer desselben Busses an der Bushaltestelle und drückt kräftig auf die Hupe.' },
            { s: 'sz-u-l4-s1-3', wer: 'lama', tut: 'hupt', was: 'busch', bild: 'Ein Lama steht im grünen Busch neben derselben Bushaltestelle und drückt kräftig auf eine Fahrradhupe.' }
          ]
        }
      ]
    }
  ],
  boss: {
    id: 'boss',
    hinweis: 'Das ganze U gemischt. Buhu oder Juhu: ein Buchstabe macht aus Weinen Freude. Vorgezeigt ist kein Fehler.',
    anlauf: ['MU', 'LU', 'NU', 'SU', 'FU', 'RU', 'HU', 'UM', 'UN', 'UL', 'MUL', 'PU', 'TU', 'KU', 'BU', 'GU', 'DU',
             'UT', 'WU', 'JU', 'ZU', 'SCHU', 'KUM', 'TUL', 'WUS'],
    z4: ['Mu-lan', 'Ka-ka-du', 'Tschu-tschu'],
    z5: ['Bu-hu', 'Ju-hu'],
    zMehr: ['U-hu', 'ums', 'Tu-ba', 'Flut', 'Lust'],
    z6: 'Na-nu, was rumst da im Busch?',
    szene: { saetze: ['A-ha! U-hu turnt im U-fo!', 'Hu-hu! Pu-ma turnt mit, das Schaf hupt!'],
             heft: 'Wer turnt im Ufo – Uhu oder Puma? Und was machen die anderen?' },
    frage: 'Was rumst im Busch, wer turnt im Ufo, und was macht das Schaf?',
    sinn: {
      satz: 'A-ha! U-hu turnt im U-fo!',
      richtig: 'sz-u-boss-1',
      wahl: [
        { s: 'sz-u-boss-1', wer: 'uhu', tut: 'turnt', was: 'ufo', bild: 'Ein Uhu schlägt in einem runden Ufo mit Fenstern einen Purzelbaum.' },
        { s: 'sz-u-boss-2', wer: 'puma', tut: 'turnt', was: 'ufo', bild: 'Ein Puma schlägt im selben runden Ufo mit Fenstern einen Purzelbaum.' },
        { s: 'sz-u-boss-3', wer: 'uhu', tut: 'turnt', was: 'bus', bild: 'Ein Uhu schlägt in einem Bus zwischen den Sitzen einen Purzelbaum.' }
      ]
    },
    sinnMehr: [
      {
        satz: 'Na-nu, was rumst da im Busch?',
        richtig: 'sz-u-boss-s1-1',
        wahl: [
          { s: 'sz-u-boss-s1-1', wer: 'busch', tut: 'rumst', was: '', bild: 'Ein großer grüner Busch neben der Bushaltestelle wackelt heftig, Blätter und kleine Staubwolken fliegen heraus.' },
          { s: 'sz-u-boss-s1-2', wer: 'bus', tut: 'rumst', was: '', bild: 'Der Bus an derselben Bushaltestelle wackelt heftig und kleine Staubwolken fliegen heraus, der grüne Busch daneben steht still.' },
          { s: 'sz-u-boss-s1-3', wer: 'busch', tut: 'steht still', was: '', bild: 'Derselbe große grüne Busch neben der Bushaltestelle steht ganz still in der Sonne.' }
        ]
      },
      {
        satz: 'Hu-hu! Pu-ma turnt mit, das Schaf hupt!',
        richtig: 'sz-u-boss-s3-1',
        wahl: [
          { s: 'sz-u-boss-s3-1', wer: 'puma + schaf', tut: 'turnt + hupt', was: '', bild: 'Im runden Ufo schlagen ein Uhu und ein Puma zusammen einen Purzelbaum, davor steht ein Schaf und drückt auf eine große Hupe.' },
          { s: 'sz-u-boss-s3-2', wer: 'lama + schaf', tut: 'turnt + hupt', was: '', bild: 'Im selben runden Ufo schlagen der Uhu und ein Lama zusammen einen Purzelbaum, davor steht ein Schaf und drückt auf eine große Hupe.' },
          { s: 'sz-u-boss-s3-3', wer: 'puma + schaf', tut: 'turnt + schläft', was: '', bild: 'Im selben runden Ufo schlagen der Uhu und ein Puma zusammen einen Purzelbaum, davor liegt ein Schaf und schläft.' }
        ]
      }
    ]
  },
  bewohner: [
    { s: 'bw-uhu', wer: 'Uhu', bild: 'Ein freundlicher Uhu mit großen Augen sitzt auf einem Ast und winkt mit dem Flügel.' },
    { s: 'bw-puma', wer: 'Puma', bild: 'Ein schlankes, freundliches Puma steht auf den Vorderpfoten im Handstand, der Schwanz zeigt nach oben.' }
  ],
  schatz: [
    { art: 'raetsel', text: 'Pilz hat das. O-pa hat das. Was ist das?', loesung: 'Hut' },
    { art: 'raetsel', text: 'Was pikst im Topf?', loesung: 'Kak-tus' },
    { art: 'zunge', text: 'Pu-ma pumpt, Tu-kan plumpst, Ka-ka-du pupst.' },
    { art: 'witz', text: 'Wa-rum turnt Pu-ma im Bus? Zir-kus ist zu!' },
    { art: 'witz', text: 'Ka-ka-du, wo bist du? Hu-hu – in O-pas Hut!' },
    { art: 'reim', text: 'Ho-kus-po-kus Fi-di-bus – O-pa ist Ok-to-pus!' },
    { art: 'satz', text: 'Wurm im Mus? Ha-ku-na Ma-ta-ta!' },
    { art: 'satz', text: 'Mut tut gut.' }
  ]
};
