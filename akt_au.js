window.LAUTBUCH_TEILE = window.LAUTBUCH_TEILE || {};
window.LAUTBUCH_TEILE.au = {
  id: 'au',
  art: 'klang',
  zeichen: 'Au au',
  abtippen: 'boss',
  blaetter: [['tafel', 'Silben'], ['ketten', 'Ketten'], ['woerter', 'Wörter']],
  level: [
    {
      id: 'l1',
      hinweis: 'AU ist ein Klang: Der Mund gleitet von A nach U, wie bei „Aua!“. Nicht A und U getrennt lesen. Erst AU sagen, dann MAU.',
      probe: ['mau', 'lau', 'hau'],
      tafel: [['AU', 'MAU', 'LAU', 'NAU', 'RAU'], ['HAU', 'BAU', 'TAU', 'KAU', 'SCHAU'],
              ['MAUT', 'LAUN', 'NAUS', 'FAUL', 'HAUM'], ['KAUP', 'TAUS', 'BAUF', 'GAUN', 'SCHAUT']],
      ketten: [['MAU-LI', 'LAU-NO', 'NAU-TI', 'RAU-MI'],
               ['HAU-RA', 'BAU-SO', 'TAU-NE', 'KAU-LI'],
               ['MAU-LO-RA', 'SCHAU-MI-TO', 'KAU-SA-LI'],
               ['TAU-NI-MO', 'HAU-SO-LA', 'LAU-MA-RI']],
      woerter: [['Haus', 'Maus', 'Au-to'], ['Rau-pe', 'Tau-be', 'baut'],
                ['Au-ge', 'laut', 'Bauch'], ['Mau-er', 'kauft', 'blau']],
      anlauf: ['AU', 'MAU', 'LAU', 'NAU', 'RAU', 'HAU', 'BAU', 'TAU', 'KAU', 'SCHAU', 'FAU', 'ZAU'],
      z4: ['Maus', 'Au-to'],
      z5: ['Mi-au', 'Au-a'],
      zMehr: ['Haus', 'laut', 'braun', 'Ur-laub'],
      bilder: ['Haus', 'Maus', 'Au-to', 'Rau-pe', 'baut'],
      z6: 'Ei-ne Maus saust im Au-to zum Haus.',
      frage: 'Wer sitzt im Auto, und wohin saust es?'
    },
    {
      id: 'l2',
      hinweis: 'Jetzt mit Lauten nach dem AU (BAUM, ZAUN) und davor (TRAU, SCHLAU). Lange Wörter Silbe für Silbe, mit dem Finger unter den Bögen.',
      probe: ['baum', 'trau', 'schlau'],
      tafel: [['AUS', 'AUM', 'AUN', 'AUF', 'AUT'], ['RAUM', 'ZAUN', 'LAUS', 'SAUM', 'KAUM'],
              ['TRAU', 'BRAU', 'SCHLAU', 'KLAU', 'FRAU'], ['TRAUM', 'BRAUS', 'SCHLAUF', 'KLAUP', 'FRAUS']],
      ketten: [['TRAU-NI', 'BRAU-LI', 'SCHLAU-NE', 'KLAU-RI'],
               ['RAUM-LA', 'ZAUN-TI', 'LAUS-MO', 'KAUM-RE'],
               ['FRAU-LO-NI', 'SCHLAU-MA-TE', 'BRAU-SI-LO'],
               ['KLAU-NO-MA', 'TRAU-LE-SI', 'ZAUN-RA-MO']],
      woerter: [['Baum', 'schau-kelt', 'Dau-men'], ['Trau-be', 'Pau-ke', 'Schau-fel'],
                ['Schaum', 'grau', 'klaut'], ['Tau-cher', 'Sau-ri-er', 'Brau-se']],
      anlauf: ['AUS', 'AUM', 'AUN', 'AUF', 'AUT', 'RAUM', 'ZAUN', 'LAUS', 'SAUM', 'KAUM', 'TRAU', 'BRAU', 'SCHLAU', 'KLAU', 'FRAU'],
      z4: ['Trau-be', 'Dau-men'],
      z5: ['Bau-ern-hof', 'Baum-haus'],
      zMehr: ['Baum', 'grau', 'brau-chen', 'Hau-fen'],
      bilder: ['Baum', 'schau-kelt', 'Dau-men', 'Trau-be', 'Schau-fel'],
      z6: 'Das Schaf schau-kelt ei-ne Maus. Hui!',
      frage: 'Wen schaukelt das Schaf?',
      szene: { saetze: ['Ei-ne Maus baut ein Haus.', 'Bum! Das Schaf haut auf ei-ne Pau-ke.', 'Au-a! Das haut das Haus um.'],
               heft: 'Was baut die Maus? Was macht das Schaf, und was passiert dann mit dem Haus?' },
      sinn: {
        satz: 'Ei-ne Maus baut ein Haus.',
        richtig: 'sz-au-l2-1',
        wahl: [
          { s: 'sz-au-l2-1', wer: 'maus', tut: 'baut', was: 'haus', bild: 'Eine kleine graue Maus steht auf einer Wiese und baut aus Holzklötzen ein kleines Haus mit Dach.' },
          { s: 'sz-au-l2-2', wer: 'taube', tut: 'baut', was: 'haus', bild: 'Eine graue Taube steht auf einer Wiese und baut aus Holzklötzen ein kleines Haus mit Dach.' },
          { s: 'sz-au-l2-3', wer: 'maus', tut: 'baut', was: 'auto', bild: 'Eine kleine graue Maus steht auf einer Wiese und baut aus Holzklötzen ein kleines Auto mit Rädern.' }
        ]
      },
      sinnMehr: [
        {
          satz: 'Das Schaf schau-kelt ei-ne Maus. Hui!',
          richtig: 'sz-au-l2-s1-1',
          wahl: [
            { s: 'sz-au-l2-s1-1', wer: 'schaf', tut: 'schaukelt', was: 'maus', bild: 'Auf einer Wiese am Bauernhof schubst ein Schaf eine Schaukel an, auf der eine kleine graue Maus sitzt und jubelt.' },
            { s: 'sz-au-l2-s1-2', wer: 'taube', tut: 'schaukelt', was: 'maus', bild: 'Auf derselben Wiese schubst eine graue Taube die Schaukel an, auf der die kleine graue Maus sitzt und jubelt.' },
            { s: 'sz-au-l2-s1-3', wer: 'schaf', tut: 'schaukelt', was: 'raupe', bild: 'Auf derselben Wiese schubst ein Schaf die Schaukel an, auf der eine grüne Raupe sitzt und jubelt.' }
          ]
        },
        {
          satz: 'Bum! Das Schaf haut auf ei-ne Pau-ke.',
          richtig: 'sz-au-l2-s3-1',
          wahl: [
            { s: 'sz-au-l2-s3-1', wer: 'schaf', tut: 'haut', was: 'pauke', bild: 'Auf derselben Wiese schlägt ein Schaf mit einem Schlegel kräftig auf eine große Pauke.' },
            { s: 'sz-au-l2-s3-2', wer: 'maus', tut: 'haut', was: 'pauke', bild: 'Auf derselben Wiese schlägt die kleine graue Maus mit einem Schlegel kräftig auf dieselbe große Pauke.' },
            { s: 'sz-au-l2-s3-3', wer: 'schaf', tut: 'haut', was: 'kochtopf', bild: 'Auf derselben Wiese schlägt ein Schaf mit einem Schlegel kräftig auf einen großen Kochtopf.' }
          ]
        },
        {
          satz: 'Au-a! Das haut das Haus um.',
          richtig: 'sz-au-l2-s4-1',
          wahl: [
            { s: 'sz-au-l2-s4-1', wer: 'haus', tut: 'haut um', was: '', bild: 'Das kleine Klötzchenhaus der Maus kippt um und die Klötze purzeln, daneben hält sich die Maus die Ohren zu und das Schaf steht mit der Pauke da.' },
            { s: 'sz-au-l2-s4-2', wer: 'auto', tut: 'haut um', was: '', bild: 'Ein kleines Klötzchenauto der Maus kippt um und die Klötze purzeln, daneben hält sich die Maus die Ohren zu und das Schaf steht mit der Pauke da.' },
            { s: 'sz-au-l2-s4-3', wer: 'haus', tut: 'steht', was: '', bild: 'Das kleine Klötzchenhaus der Maus steht fest und heil, daneben hält sich die Maus die Ohren zu und das Schaf steht mit der Pauke da.' }
          ]
        }
      ]
    }
  ],
  boss: {
    id: 'boss',
    hinweis: 'Das ganze AU gemischt, die früheren Klänge laufen mit. AU und EI nicht verwechseln: AU macht den Mund am Ende rund. Zwei Wörter kamen im Buch noch nie vor (Laune, Pause): hier wird wirklich erlesen, nicht wiedererkannt.',
    anlauf: ['AU', 'MAU', 'LAU', 'NAU', 'RAU', 'HAU', 'BAU', 'TAU', 'KAU', 'SCHAU', 'AUF', 'AUM', 'AUN', 'RAUM', 'LAUS',
             'TRAU', 'BRAU', 'SCHLAU', 'KLAU', 'FRAU'],
    z4: ['Tau-be', 'schau-kelt', 'Lau-ne', 'Pau-se'],
    z5: ['Wau-wau', 'Zau-be-rin'],
    zMehr: ['Haus', 'Baum', 'ge-nau', 'glau-ben', 'sau-er', 'Au-gust'],
    z6: 'Der Zau-be-rer sucht sei-nen Zau-ber-hut.',
    szene: { saetze: ['Ka-pi-tän La-ma hat den Zau-ber-hut.', 'Das La-ma zau-bert ei-ne Maus aus dem Hut.', 'Ju-hu! Das Schaf haut auf ei-ne Pau-ke: Bum, bum!'],
             heft: 'Was sucht der Zauberer? Wer hat den Hut? Was kommt aus dem Hut, und was macht das Schaf?' },
    fremd: ['Lau-ne', 'Pau-se'],
    frage: 'Was sucht der Zauberer, wer hat seinen Hut, und was zaubert das Lama damit?',
    sinn: {
      satz: 'Das La-ma zau-bert ei-ne Maus aus dem Hut.',
      richtig: 'sz-au-boss-1',
      wahl: [
        { s: 'sz-au-boss-1', wer: 'lama', tut: 'zaubert', was: 'maus', bild: 'Ein Lama schwingt einen Zauberstab mit Funken über einem schwarzen Zylinderhut, aus dem eine kleine Maus herausschaut.' },
        { s: 'sz-au-boss-2', wer: 'lama', tut: 'zaubert', was: 'raupe', bild: 'Ein Lama schwingt einen Zauberstab mit Funken über einem schwarzen Zylinderhut, aus dem eine grüne Raupe herausschaut.' },
        { s: 'sz-au-boss-3', wer: 'taube', tut: 'zaubert', was: 'maus', bild: 'Eine graue Taube schwingt einen Zauberstab mit Funken über einem schwarzen Zylinderhut, aus dem eine kleine Maus herausschaut.' }
      ]
    },
    sinnMehr: [
      {
        satz: 'Der Zau-be-rer sucht sei-nen Zau-ber-hut.',
        richtig: 'sz-au-boss-s4-1',
        wahl: [
          { s: 'sz-au-boss-s4-1', wer: 'zauberer', tut: 'sucht', was: 'zauberhut', bild: 'Auf der Wiese am Bauernhof kniet ein freundlicher Zauberer mit langem Bart, aber ohne Hut, und schaut suchend unter einen Busch; über ihm schwebt ein Gedankenbild: ein schwarzer Zylinderhut mit goldenen Sternen.' },
          { s: 'sz-au-boss-s4-2', wer: 'maus', tut: 'sucht', was: 'zauberhut', bild: 'Auf derselben Wiese kniet die kleine graue Maus und schaut suchend unter denselben Busch; über ihr schwebt ein Gedankenbild: ein schwarzer Zylinderhut mit goldenen Sternen.' },
          { s: 'sz-au-boss-s4-3', wer: 'zauberer', tut: 'sucht', was: 'zauberstab', bild: 'Auf derselben Wiese kniet der Zauberer mit langem Bart ohne Hut und schaut suchend unter denselben Busch; über ihm schwebt ein Gedankenbild: ein Zauberstab mit Sternchen an der Spitze.' }
        ]
      },
      {
        satz: 'Ka-pi-tän La-ma hat den Zau-ber-hut.',
        richtig: 'sz-au-boss-s1-1',
        wahl: [
          { s: 'sz-au-boss-s1-1', wer: 'lama', tut: 'hat', was: 'zauberhut', bild: 'Ein Lama mit Kapitänsmütze hält stolz einen schwarzen Zylinderhut mit goldenen Sternen zwischen den Vorderhufen.' },
          { s: 'sz-au-boss-s1-2', wer: 'taube', tut: 'hat', was: 'zauberhut', bild: 'Eine graue Taube hält stolz denselben schwarzen Zylinderhut mit goldenen Sternen zwischen den Flügeln.' },
          { s: 'sz-au-boss-s1-3', wer: 'lama', tut: 'hat', was: 'strohhut', bild: 'Ein Lama mit Kapitänsmütze hält stolz einen gelben Strohhut zwischen den Vorderhufen.' }
        ]
      },
      {
        satz: 'Ju-hu! Das Schaf haut auf ei-ne Pau-ke: Bum, bum!',
        richtig: 'sz-au-boss-s3-1',
        wahl: [
          { s: 'sz-au-boss-s3-1', wer: 'schaf', tut: 'haut', was: 'pauke', bild: 'Neben dem Lama mit dem Zylinderhut schlägt ein Schaf fröhlich mit einem Schlegel auf eine große Pauke.' },
          { s: 'sz-au-boss-s3-2', wer: 'maus', tut: 'haut', was: 'pauke', bild: 'Neben dem Lama mit dem Zylinderhut schlägt die kleine Maus fröhlich mit einem Schlegel auf dieselbe große Pauke.' },
          { s: 'sz-au-boss-s3-3', wer: 'schaf', tut: 'haut', was: 'kochtopf', bild: 'Neben dem Lama mit dem Zylinderhut schlägt ein Schaf fröhlich mit einem Schlegel auf einen großen Kochtopf.' }
        ]
      }
    ]
  },
  bewohner: [
    { s: 'bw-maus', wer: 'Maus', bild: 'Eine kleine graue Maus mit runden Ohren steht aufrecht und hält einen Holzklotz in den Pfoten.' },
    { s: 'bw-zauberer', wer: 'Zauberer', bild: 'Ein freundlicher Zauberer mit Sternenhut und langem Bart hält einen blauen Eimer wie einen Zauberhut.' }
  ],
  schatz: [
    { art: 'sprichwort', text: 'Trau, schau, wem!' },
    { art: 'witz', text: 'Hast du To-ma-ten auf den Au-gen? Nö, Gur-ken!' },
    { art: 'raetsel', text: 'Was hat Au-gen auf den Fe-dern?', loesung: 'Ein Pfau' },
    { art: 'zunge', text: 'Tau-ben tau-schen Trau-ben ge-gen Pflau-men.' },
    { art: 'witz', text: 'Haus-auf-ga-ben? Das Schaf baut ein Haus. Auf-ga-be ge-löst!' },
    { art: 'reim', text: 'Ei-ne Laus im Haus? Raus, Laus, raus!' },
    { art: 'witz', text: 'Das La-ma zau-bert: Sim-sa-la-bim! Aus dem Hut hüpft das Schaf.' },
    { art: 'satz', text: 'Ei-ne Rau-pe kaut Äp-fel, Bir-nen, Kä-se, Sa-la-mi. Au-a!' },
    { art: 'satz', text: 'Die Frau ruft: Wo ist mei-ne brau-ne Maus? Hin-ter dem Haus!' }
  ]
};
