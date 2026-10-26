window.LAUTBUCH_TEILE = window.LAUTBUCH_TEILE || {};
window.LAUTBUCH_TEILE.o = {
  id: 'o',
  art: 'vokal',
  vokal: 'O',
  zeichen: 'O o',
  kaertchen: 'O',
  abtippen: 'boss',
  blaetter: [['tafel', 'Silben'], ['ketten', 'Ketten'], ['woerter', 'Wörter']],
  level: [
    {
      id: 'l1',
      hinweis: 'Für das O den Mund rund machen: mmm-ooo → MO. Wörter mit A und I Silbe für Silbe lesen. So-fa und So-fi-a genau ansehen: ein Laut mehr.',
      tafel: [['O', 'MO', 'LO', 'NO'], ['SO', 'FO', 'RO', 'HO'],
              ['FI', 'FO', 'RI', 'RO'], ['HA', 'HO', 'MA', 'MO']],
      ketten: [['MO-LI', 'LO-HA', 'NO-MA', 'SO-HI'],
               ['FO-RA', 'RO-HI', 'HO-MA', 'LA-SO'],
               ['MO-LA-NI', 'SA-FO-RA', 'HO-LI-MA'],
               ['NO-SA-LI', 'FO-LO-LA', 'RI-MO-HA']],
      woerter: [['So-fa', 'Ro-sa', 'Lo-la'], ['O-ho', 'So-fi-a', 'Ma-ri-o'],
                ['Li-mo', 'So-so', 'Si-lo'], ['Ma-ro-ni', 'A-ro-ma', 'O-ha']],
      anlauf: ['MO', 'LO', 'NO', 'SO', 'FO', 'RO', 'HO', 'O'],
      z4: ['So-fa', 'Ro-sa'],
      z5: ['O-la-la', 'Ho-ho-ho'],
      zMehr: ['Lo-la', 'So-fi-a', 'So-so', 'Ma-ro-ni'],
      z6: 'Ro-sa La-ma, ro-sa So-fa? O-ho!',
      frage: 'Warum sieht man das Lama auf dem Sofa kaum?'
    },
    {
      id: 'l2',
      hinweis: 'Jetzt kommt ein Laut nach dem O: OM, ON. Erst das O, dann den Laut anhängen. Nas-horn hat zwei Teile: Nas und horn.',
      tafel: [['OM', 'OL', 'ON', 'OS', 'OF'], ['MOL', 'SOM', 'MON', 'LOF', 'FOL'],
              ['HOL', 'ROM', 'NOS', 'HOS', 'LOM'], ['RON', 'SON', 'NOM', 'HOM', 'ROS']],
      ketten: [['OL-NA', 'SOM-LI', 'MOL-FA', 'HOS-MI'],
               ['FOS-LA', 'NOM-SI', 'ROM-LA', 'LON-HA'],
               ['SOL-MA-NI', 'HOM-LA-SI', 'NOL-FA-MI'],
               ['MOS-LI-RA', 'FOL-MI-SA', 'ROS-NA-LI']],
      woerter: [['Nas-horn', 'So-fas', 'Hof'], ['Horn', 'Los', 'So-lo'],
                ['al-so', 'Ro-man', 'harm-los'], ['Form', 'hilf-los', 'nor-mal']],
      anlauf: ['OM', 'ON', 'OL', 'OS', 'OF', 'MOL', 'MON', 'SOM', 'LOM', 'MO', 'LO', 'NO'],
      z4: ['Nas-horn', 'So-fas'],
      z5: ['Ro-sa-so-fa', 'Om-nom-nom'],
      zMehr: ['Hof', 'Los', 'Ro-man', 'Form'],
      bilder: ['Nas-horn', 'So-fas'],
      z6: 'Nas-horn am Hof? O-ho!',
      frage: 'Welches Tier steht am Hof, und warum staunt man?',
      sinn: {
        satz: 'Nas-horn am Hof? O-ho!',
        richtig: 'sz-o-l2-1',
        wahl: [
          { s: 'sz-o-l2-1', wer: 'nashorn', tut: 'steht', was: 'hof', bild: 'Ein Nashorn steht mitten auf einem Bauernhof zwischen Hühnern vor einem roten Stall.' },
          { s: 'sz-o-l2-2', wer: 'koala', tut: 'steht', was: 'hof', bild: 'Ein Koala steht mitten auf demselben Bauernhof zwischen Hühnern vor dem roten Stall.' },
          { s: 'sz-o-l2-3', wer: 'nashorn', tut: 'steht', was: 'zoo', bild: 'Ein Nashorn steht in einem Zoogehege hinter einem Holzzaun.' }
        ]
      },
      szene: { heft: 'Wer steht am Hof? Was ist ein Hof? Ein Nashorn gehört da eigentlich nicht hin.' }
    },
    {
      id: 'l3',
      hinweis: 'Kurze Laute direkt ins O: k-o → KO, ohne „ka-o“. B, D und G stehen nie am Ende. Bei Kro-ko-dil zwei Laute vor dem O: k-r-o. hopst ist ein Tu-Wort: Was macht Dino?' +
        ' Ka-ka-o liest sich Laut für Laut, gesprochen wird es oft „Ka-kau“: Es gibt Wörter, die man etwas anders ausspricht, als man sie liest. In Ruhe erklären – manche Wörter lernt man auswendig und erkennt sie dann wieder.',
      tafel: [['PO', 'TO', 'KO', 'BO'], ['GO', 'DO', 'POT', 'KON'],
              ['BOL', 'GOS', 'DON', 'TOK'], ['MOP', 'SOT', 'ROST', 'KOST']],
      ketten: [['TO-KA', 'KO-BI', 'BO-SA', 'GO-PI'],
               ['DO-MI', 'PO-NA', 'KOL-MA', 'POL-TI'],
               ['PO-KA-TI', 'KIL-MO-TA', 'BO-GA-DI'],
               ['TO-RA-PI', 'DO-KAT-NI', 'GOL-PA-SI']],
      woerter: [['Ki-no', 'Di-no', 'Lok'], ['Kro-ko-dil', 'hopst', 'Ro-bo'],
                ['Fo-to', 'oft', 'Dorf'], ['Ra-di-o', 'dort', 'Ki-lo']],
      anlauf: ['PO', 'TO', 'KO', 'BO', 'GO', 'DO', 'OT', 'OK', 'MO', 'LO', 'SO', 'ON'],
      z4: ['Di-no', 'Lok'],
      z5: ['Ka-ka-o', 'Po-po'],
      zMehr: ['Ki-no', 'oft', 'so-fort', 'Ort'],
      bilder: ['Di-no', 'Lok', 'Kro-ko-dil', 'Ro-bo', 'hopst'],
      z6: 'Di-no hopst im Ki-no!',
      frage: 'Was macht Dino im Kino?',
      sinn: {
        satz: 'Di-no hopst im Ki-no!',
        richtig: 'sz-o-l3-1',
        wahl: [
          { s: 'sz-o-l3-1', wer: 'dino', tut: 'hopst', was: 'kino', bild: 'Ein kleiner grüner Dino hüpft in einem Kino vor der großen Leinwand zwischen roten Sesseln hoch.' },
          { s: 'sz-o-l3-2', wer: 'dino', tut: 'klatscht', was: 'kino', bild: 'Ein kleiner grüner Dino sitzt im selben Kino auf einem roten Sessel und klatscht in die Hände.' },
          { s: 'sz-o-l3-3', wer: 'dino', tut: 'hopst', was: 'hof', bild: 'Ein kleiner grüner Dino hüpft auf einem Bauernhof vor einem roten Stall hoch.' }
        ]
      }
    },
    {
      id: 'l4',
      hinweis: 'SCHO ist eine Silbe, das SCH ist ein Laut. J klingt wie in „ja“: Jo-jo. Z klingt wie ts. Bei Ketten mit dem Finger unter den Bögen entlangfahren.',
      tafel: [['WO', 'JO', 'ZO', 'SCHO'], ['WON', 'JOL', 'ZON', 'SCHOM'],
              ['SOP', 'ZOP', 'SCHOP', 'TOP'], ['WOK', 'JOS', 'ZOF', 'SCHON']],
      ketten: [['WO-JA', 'JO-ZA', 'ZO-SCHA', 'SCHO-LI'],
               ['MO-WA', 'TO-JA', 'KO-ZI', 'NO-SCHA'],
               ['SCHO-MI-LA', 'ZO-WA-JI', 'JO-SCHA-MI'],
               ['MI-JA-WO', 'ZO-SCHA-PI', 'WO-ZA-NI']],
      woerter: [['Frosch', 'Jo-jo', 'Wolf'], ['Holz', 'Ko-a-la', 'Ki-osk'],
                ['Wort', 'ko-misch', 'Zopf'], ['Tor-wart', 'wo-mit', 'Po-li-zist']],
      anlauf: ['JO', 'ZO', 'SCHO', 'JON', 'WOS', 'SCHON', 'ZOT', 'PO', 'TO', 'OM', 'DO', 'OL'],
      z4: ['Frosch', 'Jo-jo'],
      z5: ['Scho-ko-brot', 'Jo-ho-ho'],
      zMehr: ['Wolf', 'ko-misch', 'Ant-wort', 'wo-ran'],
      bilder: ['Frosch', 'Jo-jo', 'Wolf', 'Holz', 'Ko-a-la'],
      z6: 'Ro-bo holt Scho-ko am Ki-osk.',
      frage: 'Wer nascht Robos Schoko, und was muss Robo jetzt wohl tun?',
      szene: { saetze: ['Das Schaf nascht Ro-bos Scho-ko.'],
               heft: 'Wer nascht Robos Schoko – das Schaf oder der Frosch? Und was nascht es?' },
      sinn: {
        satz: 'Das Schaf nascht Ro-bos Scho-ko.',
        richtig: 'sz-o-l4-1',
        wahl: [
          { s: 'sz-o-l4-1', wer: 'schaf', tut: 'nascht', was: 'schoko', bild: 'Ein Schaf steht vor einem kleinen Kiosk und nascht eine Tafel Schokolade, ein kleiner Roboter schaut erstaunt zu.' },
          { s: 'sz-o-l4-2', wer: 'frosch', tut: 'nascht', was: 'schoko', bild: 'Ein Frosch sitzt vor demselben Kiosk und nascht eine Tafel Schokolade, der kleine Roboter schaut erstaunt zu.' },
          { s: 'sz-o-l4-3', wer: 'schaf', tut: 'nascht', was: 'brot', bild: 'Ein Schaf steht vor demselben Kiosk und nascht ein Brot, der kleine Roboter schaut erstaunt zu.' }
        ]
      },
      sinnMehr: [
        {
          satz: 'Ro-bo holt Scho-ko am Ki-osk.',
          richtig: 'sz-o-l4-s1-1',
          wahl: [
            { s: 'sz-o-l4-s1-1', wer: 'robo', tut: 'holt', was: 'schoko', bild: 'Ein kleiner Roboter steht vor einem kleinen Kiosk und nimmt eine Tafel Schokolade aus der Auslage.' },
            { s: 'sz-o-l4-s1-2', wer: 'frosch', tut: 'holt', was: 'schoko', bild: 'Ein Frosch sitzt vor demselben Kiosk und nimmt eine Tafel Schokolade aus der Auslage.' },
            { s: 'sz-o-l4-s1-3', wer: 'robo', tut: 'holt', was: 'brot', bild: 'Der kleine Roboter steht vor demselben Kiosk und nimmt ein Brot aus der Auslage.' }
          ]
        }
      ]
    }
  ],
  boss: {
    id: 'boss',
    hinweis: 'Das ganze O gemischt, A und I laufen mit. Hier erst Oma und Opa. Ka-ka-o spricht man oft „Ka-kau“: wenn das Kind stutzt, in Ruhe erklären, dass manche Wörter anders klingen, als man sie liest. Vorgezeigt ist kein Fehler.',
    anlauf: ['MO', 'LO', 'NO', 'SO', 'FO', 'RO', 'HO', 'OM', 'ON', 'OL', 'MOL', 'PO', 'TO', 'KO', 'BO', 'GO', 'DO',
             'OT', 'WO', 'JO', 'ZO', 'SCHO', 'KOM', 'TOL', 'WOS'],
    z4: ['Nas-horn', 'Kro-ko-dil', 'Frosch'],
    z5: ['O-pa', 'O-ma'],
    zMehr: ['So-fa', 'Los', 'Dorf', 'Pro-fi', 'Golf'],
    z6: 'O-ma hat Ka-ka-o, O-pa Scho-ko-brot.',
    szene: { saetze: ['O-ma tanzt mit Ro-bo, O-pa klatscht.', 'Das Schaf? Das Schaf nascht O-pas Scho-ko-brot!'],
             heft: 'Wer tanzt, wer klatscht? Und was macht das Schaf, während alle feiern?' },
    frage: 'Wer tanzt mit Robo, was macht Opa, und wer nascht sein Schokobrot?',
    sinn: {
      satz: 'O-ma tanzt mit Ro-bo, O-pa klatscht.',
      richtig: 'sz-o-boss-1',
      wahl: [
        { s: 'sz-o-boss-1', wer: 'oma', tut: 'tanzt', was: 'mit robo', bild: 'Eine Oma tanzt in einem Wohnzimmer mit einem kleinen Roboter, ein Opa sitzt im Sessel und klatscht.' },
        { s: 'sz-o-boss-2', wer: 'opa', tut: 'tanzt', was: 'mit robo', bild: 'Ein Opa tanzt im selben Wohnzimmer mit dem kleinen Roboter, eine Oma sitzt im Sessel und klatscht.' },
        { s: 'sz-o-boss-3', wer: 'oma', tut: 'tanzt', was: 'mit koala', bild: 'Eine Oma tanzt im selben Wohnzimmer mit einem Koala, ein Opa sitzt im Sessel und klatscht.' }
      ]
    },
    sinnMehr: [
      {
        satz: 'O-ma hat Ka-ka-o, O-pa Scho-ko-brot.',
        richtig: 'sz-o-boss-s1-1',
        wahl: [
          { s: 'sz-o-boss-s1-1', wer: 'oma + opa', tut: 'hat', was: 'kakao + schokobrot', bild: 'Oma und Opa sitzen im Wohnzimmer am Tisch; vor Oma steht eine Tasse Kakao, vor Opa liegt ein Schokobrot.' },
          { s: 'sz-o-boss-s1-2', wer: 'oma + robo', tut: 'hat', was: 'kakao + schokobrot', bild: 'Oma und der kleine Roboter sitzen im selben Wohnzimmer am Tisch; vor Oma steht eine Tasse Kakao, vor dem Roboter liegt ein Schokobrot.' },
          { s: 'sz-o-boss-s1-3', wer: 'oma + opa', tut: 'hat', was: 'kakao + banane', bild: 'Oma und Opa sitzen im selben Wohnzimmer am Tisch; vor Oma steht eine Tasse Kakao, vor Opa liegt eine Banane.' }
        ]
      },
      {
        satz: 'Das Schaf? Das Schaf nascht O-pas Scho-ko-brot!',
        richtig: 'sz-o-boss-s3-1',
        wahl: [
          { s: 'sz-o-boss-s3-1', wer: 'schaf', tut: 'nascht', was: 'schokobrot', bild: 'Ein Schaf steckt im selben Wohnzimmer den Kopf über den Tisch und nascht Opas Schokobrot, Opa schaut verdutzt zu.' },
          { s: 'sz-o-boss-s3-2', wer: 'koala', tut: 'nascht', was: 'schokobrot', bild: 'Ein Koala steckt im selben Wohnzimmer den Kopf über den Tisch und nascht Opas Schokobrot, Opa schaut verdutzt zu.' },
          { s: 'sz-o-boss-s3-3', wer: 'schaf', tut: 'nascht', was: 'kakao', bild: 'Ein Schaf steckt im selben Wohnzimmer den Kopf über den Tisch und nascht aus Omas Tasse Kakao, Opa schaut verdutzt zu.' }
        ]
      }
    ]
  },
  bewohner: [
    { s: 'bw-robo', wer: 'Robo', bild: 'Ein kleiner, freundlicher Roboter mit runden Augen und einer Antenne hält eine Tafel Schokolade und winkt.' },
    { s: 'bw-nashorn', wer: 'Nashorn', bild: 'Ein gemütliches Nashorn steht von der Seite und lächelt, auf seinem Horn sitzt ein kleines Huhn.' }
  ],
  schatz: [
    { art: 'raetsel', text: 'Ma-mas Pa-pa ist O-pa. Pa-pas Ma-ma ist …?', loesung: 'O-ma' },
    { art: 'zunge', text: 'Das Kro-ko-dil holt Ko-a-las Ka-ka-o.' },
    { art: 'witz', text: 'Wo ist Ro-bos Scho-ko? Das Schaf hat Scho-ko-bart!' },
    { art: 'witz', text: 'O-laf am Ka-min? O-ha! Tropf, tropf, tropf …' },
    { art: 'witz', text: 'Ro-sa La-ma, ro-sa So-fa. Wo ist das La-ma?' },
    { art: 'reim', text: 'O-ma hat Zopf, O-pa hat Topf – am Kopf!' },
    { art: 'reim', text: 'Scho-ko am Po-po? O-ho, Ro-bo!' },
    { art: 'satz', text: 'Ro-bo ist Pi-lot. Ko-pi-lot? Das Schaf!' }
  ]
};
