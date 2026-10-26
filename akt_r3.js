window.LAUTBUCH_TEILE = window.LAUTBUCH_TEILE || {};
window.LAUTBUCH_TEILE.r3 = {
  id: 'r3',
  art: 'regel',
  zeichen: 'sp st qu ng nk x pf',
  abtippen: 'boss',
  blaetter: [['tafel', 'Paare'], ['ketten', 'Ketten'], ['woerter', 'Wörter']],
  level: [
    {
      id: 'l1',
      hinweis: 'Steht sp oder st vorne am Wort oder am Wortteil, sprechen wir schp und scht: Stern, Stol-per-stein. Sonst bleibt es s-t: Nest, Wes-pe. Bild für das Kind: Vorne zieht sich das S einen Schal an und wird zum SCH.',
      probe: ['sta', 'spi', 'sto'],
      tafel: [['Stein', 'Nest', 'Stab', 'Ast'], ['Spur', 'Wes-pe', 'Strand', 'Kis-te'],
              ['Stau', 'Os-tern', 'Spa-ten', 'Kas-per'], ['Stift', 'Lis-te', 'Spei-se', 'Wes-te', 'Stu-be']],
      ketten: [['STA-LO', 'SPU-MI', 'STE-NA', 'SPI-RO'],
               ['STO-LE', 'SPA-NU', 'STU-MA', 'SPE-LI'],
               ['STA-MO-LA', 'SPI-NU-RA', 'STO-FE-NI'],
               ['SPU-LA-MO', 'STE-RI-NA', 'SPA-LO-MU']],
      woerter: [['Stern', 'Storch', 'stol-pert'], ['Specht', 'Stem-pel', 'sta-pelt'],
                ['Sturm', 'stark', 'spielt'], ['Spie-gel', 'Stie-fel', 'stolz']],
      anlauf: ['STA', 'STO', 'STU', 'STE', 'STI', 'SPA', 'SPO', 'SPU', 'SPE', 'SPI', 'STEI', 'STAU'],
      z4: ['Stern', 'Storch'],
      z5: ['Stol-per-stein', 'Stups-na-se'],
      zMehr: ['stol-pert', 'stark', 'Stun-de', 'spä-ter'],
      bilder: ['Stern', 'Storch', 'Specht', 'stol-pert', 'sta-pelt'],
      z6: 'Der Storch sta-pelt Ster-ne für das Fest.',
      szene: { saetze: ['Er stol-pert und lan-det auf dem Schaf!', 'Das Schaf? Es schläft wie ein Stein.'],
               heft: 'Was stapelt der Storch, und wofür? Wo landet er? Und was macht das Schaf?' },
      frage: 'Was stapelt der Storch, wo landet er, und warum tut es ihm nicht weh?'
    },
    {
      id: 'l2',
      hinweis: 'Hier halten zwei Buchstaben zusammen wie Freunde: qu klingt kw (quak), x klingt ks (Ta-xi), pf pustet p und f zugleich (Ap-fel). ng und nk summen hinten in der Nase (Ring, Bank); auch in Schlan-ge und Zan-ge ist kein g zu hören, obwohl der Bogen trennt. Ring und Rind einmal nacheinander sprechen, damit das Kind den Unterschied hört.',
      probe: ['qua', 'ang', 'pfo'],
      tafel: [['Ring', 'Rind', 'Bank', 'Band'], ['Keks', 'Box', 'Topf', 'Kopf'],
              ['quak', 'Quark', 'Zan-ge', 'Wan-ge'], ['Hang', 'Hand', 'Pfad', 'Quiz', 'Max']],
      ketten: [['LAN-GO', 'LIN-KU', 'PFU-LO', 'QUA-MI'],
               ['NO-XA', 'RIN-GU', 'TAN-KO', 'PFE-NA'],
               ['QUA-LO-MI', 'SIN-GA-RU', 'MA-XO-LE'],
               ['PFI-NU-LA', 'RUN-KA-SO', 'LE-XI-MO']],
      woerter: [['Pin-gu-in', 'Schlan-ge', 'trinkt'], ['Ta-xi', 'Ap-fel', 'hüpft'],
                ['He-xe', 'singt', 'Pfo-te'], ['Zun-ge', 'lang', 'Fin-ger'], ['dan-ke', 'Angst', 'Jun-ge']],
      anlauf: ['QUA', 'QUI', 'ANG', 'ING', 'UNG', 'ANK', 'INK', 'AX', 'OX', 'PFA', 'PFO', 'PFU'],
      z4: ['Pin-gu-in', 'Ta-xi'],
      z5: ['Kän-gu-ru', 'Quatsch'],
      zMehr: ['Schlan-ge', 'singt', 'On-kel', 'Hun-ger'],
      bilder: ['Pin-gu-in', 'Schlan-ge', 'Ta-xi', 'trinkt', 'hüpft', 'singt'],
      z6: 'Ein Pin-gu-in im Ta-xi? Quatsch! Doch, er winkt und hupt.',
      frage: 'Wer singt im Taxi, und wie singt das Lama?',
      szene: { saetze: ['Der Pin-gu-in singt.',
                        'Das Schaf trinkt Ap-fel-saft.',
                        'Und das La-ma singt mit, ganz falsch!'],
               heft: 'Wer fährt das Taxi? Was trinkt das Schaf? Wie singt das Lama?' },
      sinn: {
        satz: 'Der Pin-gu-in singt.',
        richtig: 'sz-r3-l2-1',
        wahl: [
          { s: 'sz-r3-l2-1', wer: 'pinguin', tut: 'singt', was: '', bild: 'Ein Pinguin sitzt am Steuer eines gelben Taxis und singt mit weit offenem Schnabel.' },
          { s: 'sz-r3-l2-2', wer: 'pinguin', tut: 'trinkt', was: '', bild: 'Ein Pinguin sitzt am Steuer eines gelben Taxis und trinkt aus einem Becher.' },
          { s: 'sz-r3-l2-3', wer: 'schlange', tut: 'singt', was: '', bild: 'Eine grüne Schlange sitzt am Steuer eines gelben Taxis und singt mit weit offenem Maul.' }
        ]
      },
      sinnMehr: [
        {
          satz: 'Ein Pin-gu-in im Ta-xi? Quatsch! Doch, er winkt und hupt.',
          richtig: 'sz-r3-l2-s1-1',
          wahl: [
            { s: 'sz-r3-l2-s1-1', wer: 'pinguin', tut: 'winkt + hupt', was: 'taxi', bild: 'Ein Pinguin sitzt am Steuer eines gelben Taxis, winkt mit einem Flügel aus dem Fenster und drückt mit dem anderen auf die Hupe.' },
            { s: 'sz-r3-l2-s1-2', wer: 'schlange', tut: 'winkt + hupt', was: 'taxi', bild: 'Eine grüne Schlange sitzt am Steuer desselben gelben Taxis, winkt mit der Schwanzspitze aus dem Fenster und drückt mit dem Kopf auf die Hupe.' },
            { s: 'sz-r3-l2-s1-3', wer: 'pinguin', tut: 'winkt', was: 'taxi', bild: 'Ein Pinguin sitzt am Steuer desselben gelben Taxis, winkt mit einem Flügel aus dem Fenster und hält den anderen still auf dem Lenkrad.' }
          ]
        },
        {
          satz: 'Das Schaf trinkt Ap-fel-saft.',
          richtig: 'sz-r3-l2-s3-1',
          wahl: [
            { s: 'sz-r3-l2-s3-1', wer: 'schaf', tut: 'trinkt', was: 'apfelsaft', bild: 'Auf der Rückbank des gelben Taxis sitzt ein Schaf und trinkt mit einem Strohhalm aus einem Glas goldgelbem Apfelsaft, daneben liegt ein Apfel.' },
            { s: 'sz-r3-l2-s3-2', wer: 'lama', tut: 'trinkt', was: 'apfelsaft', bild: 'Auf derselben Rückbank sitzt ein Lama und trinkt mit einem Strohhalm aus einem Glas goldgelbem Apfelsaft, daneben liegt ein Apfel.' },
            { s: 'sz-r3-l2-s3-3', wer: 'schaf', tut: 'trinkt', was: 'milch', bild: 'Auf derselben Rückbank sitzt ein Schaf und trinkt mit einem Strohhalm aus einem Glas weißer Milch.' }
          ]
        },
        {
          satz: 'Und das La-ma singt mit, ganz falsch!',
          richtig: 'sz-r3-l2-s4-1',
          wahl: [
            { s: 'sz-r3-l2-s4-1', wer: 'lama', tut: 'singt falsch', was: '', bild: 'Auf der Rückbank des gelben Taxis singt ein Lama aus voller Kehle, über ihm fliegen schiefe, zackige Noten, und das Schaf neben ihm hält sich die Ohren zu.' },
            { s: 'sz-r3-l2-s4-2', wer: 'schaf', tut: 'singt falsch', was: '', bild: 'Auf derselben Rückbank singt das Schaf aus voller Kehle, über ihm fliegen schiefe, zackige Noten, und das Lama neben ihm hält sich die Ohren zu.' },
            { s: 'sz-r3-l2-s4-3', wer: 'lama', tut: 'singt schön', was: '', bild: 'Auf derselben Rückbank singt das Lama aus voller Kehle, über ihm schweben runde, schöne Noten, und das Schaf neben ihm lächelt.' }
          ]
        }
      ]
    }
  ],
  boss: {
    id: 'boss',
    hinweis: 'Alle Lautpaare gemischt. Liest das Kind st vorne als s-t, kurz an den Schal erinnern. Vorgezeigt ist kein Fehler. Zwei Wörter kamen im Buch noch nie vor (Pflaster, Nixe): hier wird wirklich erlesen, nicht wiedererkannt.',
    anlauf: ['STA', 'STO', 'SPU', 'SPI', 'STEI', 'QUA', 'QUI', 'ANG', 'ING', 'UNG', 'ANK', 'INK', 'AX', 'OX', 'PFA', 'PFO'],
    z4: ['Stem-pel', 'Schlan-ge', 'Pflas-ter', 'Ni-xe'],
    z5: ['Kopf-stand', 'Strumpf-ho-se'],
    zMehr: ['Stern', 'Pin-gu-in', 'Sprung', 'Pflan-ze', 'En-gel', 'strei-che'],
    z6: 'Das Ta-xi hält. Der Pin-gu-in steigt aus.',
    szene: { saetze: ['Der Pin-gu-in trägt ei-ne Strumpf-ho-se als Hut!', 'Das La-ma singt da-zu: Strumpf-ho-se, Strumpf-ho-se!',
                      'Und schon trägt das La-ma die Strumpf-ho-se.'],
             heft: 'Was trägt der Pinguin auf dem Kopf? Was singt das Lama dazu? Und wer trägt die Strumpfhose am Ende?' },
    fremd: ['Pflas-ter', 'Ni-xe'],
    frage: 'Was trägt der Pinguin als Hut, was singt das Lama, und wer hat die Strumpfhose am Ende auf?',
    sinn: {
      satz: 'Der Pin-gu-in trägt ei-ne Strumpf-ho-se als Hut!',
      richtig: 'sz-r3-boss-1',
      wahl: [
        { s: 'sz-r3-boss-1', wer: 'pinguin', tut: 'trägt', was: 'strumpfhose', bild: 'Ein Pinguin steht da und trägt eine bunt geringelte Strumpfhose als Hut auf dem Kopf, die Beine hängen wie Ohren herab.' },
        { s: 'sz-r3-boss-2', wer: 'frosch', tut: 'trägt', was: 'strumpfhose', bild: 'Ein Frosch steht da und trägt eine bunt geringelte Strumpfhose als Hut auf dem Kopf, die Beine hängen wie Ohren herab.' },
        { s: 'sz-r3-boss-3', wer: 'pinguin', tut: 'trägt', was: 'topf', bild: 'Ein Pinguin steht da und trägt einen Kochtopf als Hut auf dem Kopf.' }
      ]
    },
    sinnMehr: [
      {
        satz: 'Das Ta-xi hält. Der Pin-gu-in steigt aus.',
        richtig: 'sz-r3-boss-s1-1',
        wahl: [
          { s: 'sz-r3-boss-s1-1', wer: 'pinguin', tut: 'steigt aus', was: 'taxi', bild: 'Das gelbe Taxi steht am Straßenrand, die Fahrertür ist offen, und ein Pinguin steigt gerade aus.' },
          { s: 'sz-r3-boss-s1-2', wer: 'schaf', tut: 'steigt aus', was: 'taxi', bild: 'Das gelbe Taxi steht am selben Straßenrand, die hintere Tür ist offen, und ein Schaf steigt gerade aus.' },
          { s: 'sz-r3-boss-s1-3', wer: 'pinguin', tut: 'fährt weiter', was: 'taxi', bild: 'Das gelbe Taxi fährt auf derselben Straße weiter, am Steuer sitzt der Pinguin.' }
        ]
      },
      {
        satz: 'Das La-ma singt da-zu: Strumpf-ho-se, Strumpf-ho-se!',
        richtig: 'sz-r3-boss-s3-1',
        wahl: [
          { s: 'sz-r3-boss-s3-1', wer: 'lama', tut: 'singt', was: 'strumpfhose', bild: 'Neben dem Pinguin, der eine bunt geringelte Strumpfhose als Hut trägt, steht ein Lama und singt fröhlich mit weit offenem Maul.' },
          { s: 'sz-r3-boss-s3-2', wer: 'frosch', tut: 'singt', was: 'strumpfhose', bild: 'Neben demselben Pinguin mit der Strumpfhose als Hut steht ein Frosch und singt fröhlich mit weit offenem Maul.' },
          { s: 'sz-r3-boss-s3-3', wer: 'lama', tut: 'singt', was: 'topf', bild: 'Neben dem Pinguin, der einen Kochtopf als Hut trägt, steht ein Lama und singt fröhlich mit weit offenem Maul.' }
        ]
      },
      {
        satz: 'Und schon trägt das La-ma die Strumpf-ho-se.',
        richtig: 'sz-r3-boss-s4-1',
        wahl: [
          { s: 'sz-r3-boss-s4-1', wer: 'lama', tut: 'trägt', was: 'strumpfhose', bild: 'Neben dem gelben Taxi trägt jetzt das Lama die bunt geringelte Strumpfhose als Hut, die Beine hängen ihm wie Ohren herab; der Pinguin fasst sich verdutzt an den leeren Kopf.' },
          { s: 'sz-r3-boss-s4-2', wer: 'schaf', tut: 'trägt', was: 'strumpfhose', bild: 'Neben demselben Taxi trägt jetzt das Schaf die bunt geringelte Strumpfhose als Hut, die Beine hängen ihm wie Ohren herab; der Pinguin fasst sich verdutzt an den leeren Kopf.' },
          { s: 'sz-r3-boss-s4-3', wer: 'lama', tut: 'trägt', was: 'topf', bild: 'Neben demselben Taxi trägt jetzt das Lama einen Kochtopf als Hut; der Pinguin mit der Strumpfhose auf dem Kopf schaut verdutzt.' }
        ]
      }
    ]
  },
  bewohner: [
    { s: 'bw-pinguin', wer: 'Pinguin', bild: 'Ein Pinguin mit Taxifahrer-Mütze steht aufrecht und winkt mit einem Flügel.' },
    { s: 'bw-storch', wer: 'Storch', bild: 'Ein weißer Storch mit roten Beinen steht auf einem Bein und lächelt.' }
  ],
  schatz: [
    { art: 'sprichwort', text: 'Ü-bung macht den Meis-ter.' },
    { art: 'sprichwort', text: 'Der frü-he Vo-gel fängt den Wurm.' },
    { art: 'sprichwort', text: 'Ich glaub, mein Schwein pfeift!' },
    { art: 'raetsel', text: 'Wer hüpft und trägt sein Ba-by im Beu-tel?', loesung: 'Das Kän-gu-ru' },
    { art: 'zunge', text: 'Pin-gu-i-ne pin-seln pin-ke Pal-men.' },
    { art: 'witz', text: 'Was ist grün und klopft an dei-ne Tür? Ein Klopf-sa-lat!' },
    { art: 'witz', text: 'Ei-ne He-xe hat kei-nen Be-sen. Was nun? Ta-xi!' },
    { art: 'reim', text: 'Der Frosch springt, der Pin-gu-in singt – das Schaf? Es trinkt.' },
    { art: 'satz', text: 'Der Jun-ge hat kei-ne Angst. Dan-ke, Storch!' }
  ]
};
