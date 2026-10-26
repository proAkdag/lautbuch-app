window.LAUTBUCH_TEILE = window.LAUTBUCH_TEILE || {};
window.LAUTBUCH_TEILE.ue = {
  id: 'ue',
  art: 'klang',
  zeichen: 'Ü ü',
  abtippen: 'boss',
  blaetter: [['tafel', 'Silben'], ['ketten', 'Ketten'], ['woerter', 'Wörter']],
  level: [
    {
      id: 'l1',
      hinweis: 'Für Ü die Lippen spitzen wie beim U und dabei I sagen. ÜÜÜ dehnen, dann KÜ. Nicht „ju“ oder „i“ daraus machen. In Kü-he hört man das h kaum: Silbe für Silbe lesen, dann das Wort natürlich sagen.',
      probe: ['mü', 'lü', 'kü'],
      tafel: [['Ü', 'MÜ', 'LÜ', 'NÜ', 'SÜ'], ['KÜ', 'TÜ', 'HÜ', 'RÜ', 'ZÜ'],
              ['MÜT', 'LÜN', 'NÜS', 'FÜL', 'HÜM'], ['KÜP', 'TÜS', 'BÜF', 'GÜN', 'SCHÜT']],
      ketten: [['MÜ-LA', 'LÜ-NO', 'NÜ-SÄ', 'SÜ-FI'],
               ['KÜ-RO', 'TÜ-MA', 'HÜ-LI', 'RÜ-SA'],
               ['MÜ-LO-NA', 'ZÜ-NI-TA', 'KÜ-SA-MÖ'],
               ['TÜ-LA-NO', 'HÜ-MA-RI', 'LÜ-FO-SA']],
      woerter: [['Hü-te', 'Tü-te', 'Kü-he'], ['Kü-ken', 'Zü-ge', 'bü-gelt'],
                ['Kü-che', 'grün', 'Tü-ren'], ['Bü-cher', 'hübsch', 'Gür-tel']],
      anlauf: ['MÜ', 'LÜ', 'NÜ', 'SÜ', 'KÜ', 'TÜ', 'HÜ', 'RÜ', 'ZÜ', 'Ü', 'GRÜ', 'FÜN'],
      z4: ['Kü-he', 'Kü-ken'],
      z5: ['Krü-mel', 'fünf'],
      zMehr: ['Hü-te', 'grün', 'Schü-ler', 'wü-tend'],
      bilder: ['Hü-te', 'Tü-te', 'Kü-he', 'Kü-ken', 'bü-gelt'],
      z6: 'Das Kü-ken bü-gelt Hü-te!',
      frage: 'Was bügelt das Küken? Für wen könnten die vielen Hüte sein?'
    },
    {
      id: 'l2',
      hinweis: 'Längere Wörter mit Ü: erst die Silben zeigen (Kür-bis), dann zusammen lesen. Ü, Ö und Ä nicht verwechseln: auf die Lippen achten.',
      probe: ['grü', 'flü', 'brü'],
      tafel: [['ÜM', 'ÜN', 'ÜS', 'ÜL', 'ÜT'], ['HÜN', 'KÜS', 'TÜL', 'WÜS', 'FÜN'],
              ['GRÜ', 'FLÜ', 'KRÜ', 'BRÜ', 'SCHÜ'], ['GRÜS', 'FLÜK', 'KRÜM', 'BRÜT', 'SCHÜF']],
      ketten: [['GRÜ-LA', 'FLÜ-MO', 'KRÜ-NA', 'BRÜ-SO'],
               ['HÜN-TA', 'KÜS-MO', 'TÜL-RA', 'WÜS-NE'],
               ['SCHÜ-LA-MO', 'GRÜ-NA-SI', 'FLÜ-TO-RA'],
               ['MÜN-TA-LO', 'KRÜ-SO-NA', 'HÜ-LÄ-MI']],
      woerter: [['Ge-mü-se', 'Kür-bis', 'Wür-fel'], ['flüs-tert', 'Hü-gel', 'Tür-me'],
                ['Bürs-te', 'Flü-gel', 'drü-ben'], ['Würst-chen', 'Küs-te', 'Brü-der']],
      anlauf: ['ÜM', 'ÜN', 'ÜS', 'ÜL', 'HÜN', 'KÜS', 'WÜS', 'GRÜ', 'FLÜ', 'KRÜ', 'BRÜ', 'SCHÜ'],
      z4: ['Kür-bis', 'Wür-fel'],
      z5: ['mü-de', 'rülp-sen'],
      zMehr: ['Ge-mü-se', 'Flü-gel', 'Künst-ler', 'Sü-den'],
      bilder: ['Ge-mü-se', 'Kür-bis', 'Wür-fel', 'Tür-me', 'flüs-tert', 'Küs-te'],
      z6: 'Lö-we Le-o wür-felt: fünf!',
      frage: 'Was hat Löwe Leo gewürfelt? Zeig es mit den Fingern.',
      szene: { saetze: ['Kü-he ra-deln zum Hü-gel.'],
               heft: 'Wohin radeln die Kühe? Und das Schaf, radelt es wohl mit?' },
      sinn: {
        satz: 'Kü-he ra-deln zum Hü-gel.',
        richtig: 'sz-ue-l2-1',
        wahl: [
          { s: 'sz-ue-l2-1', wer: 'kühe', tut: 'radeln', was: 'hügel', bild: 'Zwei fröhliche Kühe fahren auf Fahrrädern einen Weg entlang auf einen grünen Hügel zu.' },
          { s: 'sz-ue-l2-2', wer: 'küken', tut: 'radeln', was: 'hügel', bild: 'Zwei fröhliche Küken fahren auf kleinen Fahrrädern einen Weg entlang auf einen grünen Hügel zu.' },
          { s: 'sz-ue-l2-3', wer: 'kühe', tut: 'radeln', was: 'kürbis', bild: 'Zwei fröhliche Kühe fahren auf Fahrrädern einen Weg entlang auf einen riesigen orangen Kürbis zu.' }
        ]
      },
      sinnMehr: [
        {
          satz: 'Lö-we Le-o wür-felt: fünf!',
          richtig: 'sz-ue-l2-s1-1',
          wahl: [
            { s: 'sz-ue-l2-s1-1', wer: 'löwe', tut: 'würfelt', was: 'fünf', bild: 'Ein freundlicher Löwe sitzt auf dem Deck eines Schiffs und hat gerade einen großen Würfel geworfen, der fünf Augen zeigt.' },
            { s: 'sz-ue-l2-s1-2', wer: 'küken', tut: 'würfelt', was: 'fünf', bild: 'Ein kleines gelbes Küken sitzt auf demselben Deck und hat gerade denselben großen Würfel geworfen, der fünf Augen zeigt.' },
            { s: 'sz-ue-l2-s1-3', wer: 'löwe', tut: 'würfelt', was: 'drei', bild: 'Ein freundlicher Löwe sitzt auf demselben Deck und hat gerade einen großen Würfel geworfen, der drei Augen zeigt.' }
          ]
        }
      ]
    }
  ],
  boss: {
    id: 'boss',
    hinweis: 'Das ganze Ü gemischt, Ä und Ö laufen mit. Bei Ü und U: Gleich ist nur die Mundform, der Laut ist anders. Zwei Wörter kamen im Buch noch nie vor (Rüben, Kübel): hier wird wirklich erlesen, nicht wiedererkannt.',
    anlauf: ['MÜ', 'LÜ', 'NÜ', 'SÜ', 'KÜ', 'TÜ', 'HÜ', 'RÜ', 'ZÜ', 'Ü', 'ÜM', 'ÜN', 'ÜS', 'HÜN', 'KÜS', 'WÜS',
             'GRÜ', 'FLÜ', 'KRÜ', 'BRÜ', 'SCHÜ'],
    z4: ['Zü-ge', 'flüs-tert', 'Rü-ben', 'Kü-bel'],
    z5: ['Wüs-te', 'Wün-sche'],
    zMehr: ['Hü-te', 'Ge-mü-se', 'Mü-he', 'üb-rig', 'Schür-ze', 'Mü-sli'],
    z6: 'Das Kü-ken bü-gelt fünf Hü-te für das Fest.',
    szene: { saetze: ['Fünf Kü-he tra-gen Hü-te!', 'Das Schaf? Es schläft mit Hut am Hü-gel.'],
             heft: 'Wie viele Kühe sind es? Was tragen sie? Und wo schläft das Schaf?' },
    fremd: ['Rü-ben', 'Kü-bel'],
    frage: 'Wer hat die Hüte gebügelt, wer trägt sie, und wo ist das Schaf?',
    sinn: {
      satz: 'Fünf Kü-he tra-gen Hü-te!',
      richtig: 'sz-ue-boss-1',
      wahl: [
        { s: 'sz-ue-boss-1', wer: 'fünf kühe', tut: 'tragen', was: 'hüte', bild: 'Fünf Kühe stehen nebeneinander auf einer Wiese, jede trägt einen bunten Hut auf dem Kopf.' },
        { s: 'sz-ue-boss-2', wer: 'zwei kühe', tut: 'tragen', was: 'hüte', bild: 'Zwei Kühe stehen nebeneinander auf einer Wiese, jede trägt einen bunten Hut auf dem Kopf.' },
        { s: 'sz-ue-boss-3', wer: 'fünf kühe', tut: 'tragen', was: 'tüten', bild: 'Fünf Kühe stehen nebeneinander auf einer Wiese, jede trägt eine braune Papiertüte im Maul, die Köpfe sind frei.' }
      ]
    },
    sinnMehr: [
      {
        satz: 'Das Kü-ken bü-gelt fünf Hü-te für das Fest.',
        richtig: 'sz-ue-boss-s1-1',
        wahl: [
          { s: 'sz-ue-boss-s1-1', wer: 'küken', tut: 'bügelt', was: 'fünf hüte', bild: 'Ein kleines gelbes Küken steht an einem Bügelbrett und bügelt einen bunten Hut, daneben liegt ein Stapel aus vier weiteren gebügelten Hüten.' },
          { s: 'sz-ue-boss-s1-2', wer: 'kuh', tut: 'bügelt', was: 'fünf hüte', bild: 'Eine Kuh steht am selben Bügelbrett und bügelt einen bunten Hut, daneben liegt derselbe Stapel aus vier weiteren gebügelten Hüten.' },
          { s: 'sz-ue-boss-s1-3', wer: 'küken', tut: 'bügelt', was: 'fünf tüten', bild: 'Ein kleines gelbes Küken steht am selben Bügelbrett und bügelt eine braune Papiertüte, daneben liegt ein Stapel aus vier weiteren gebügelten Tüten.' }
        ]
      },
      {
        satz: 'Das Schaf? Es schläft mit Hut am Hü-gel.',
        richtig: 'sz-ue-boss-s3-1',
        wahl: [
          { s: 'sz-ue-boss-s3-1', wer: 'schaf', tut: 'schläft', was: 'mit hut', bild: 'Ein Schaf liegt auf einem grünen Hügel im Gras und schläft, auf dem Kopf trägt es einen bunten Hut.' },
          { s: 'sz-ue-boss-s3-2', wer: 'schaf', tut: 'radelt', was: 'mit hut', bild: 'Ein Schaf fährt auf einem Fahrrad denselben grünen Hügel hinauf, auf dem Kopf trägt es einen bunten Hut.' },
          { s: 'sz-ue-boss-s3-3', wer: 'schaf', tut: 'schläft', was: 'ohne hut', bild: 'Ein Schaf liegt auf demselben grünen Hügel im Gras und schläft, sein Kopf ist ohne Hut.' }
        ]
      }
    ]
  },
  bewohner: [
    { s: 'bw-kuh-hut', wer: 'Kuh mit Hut', bild: 'Eine gefleckte Kuh steht auf der Wiese und trägt stolz einen bunten Hut mit Blume.' },
    { s: 'bw-kueken', wer: 'Küken', bild: 'Ein kleines gelbes Küken steht aufrecht und hält ein winziges Bügeleisen im Flügel.' }
  ],
  schatz: [
    { art: 'sprichwort', text: 'Ü-ber-mut tut sel-ten gut.' },
    { art: 'zunge', text: 'Kü-ken bü-geln Hü-te, Kü-he hü-ten Kü-ken.' },
    { art: 'raetsel', text: 'Tü-te mit H: Was ist das?', loesung: 'Hü-te' },
    { art: 'witz', text: 'Hun-de-mü-de? Das Schaf ist schaf-mü-de!' },
    { art: 'reim', text: 'Das Kü-ken am Hü-gel bü-gelt Flü-gel.' },
    { art: 'witz', text: 'Lö-we Le-o wür-felt: fünf! Das Schaf nascht den Wür-fel.' },
    { art: 'raetsel', text: 'Was ist grün, hüpft, hat Re-gen gern?', loesung: 'Frosch' },
    { art: 'satz', text: 'Kü-he ra-deln zum Hü-gel. Das Schaf ra-delt im Schlaf.' },
    { art: 'satz', text: 'Tschüs, Kü-ken! Tschüs, Kü-he! Bis Mon-tag! Hoch die Hän-de, Wo-chen-en-de!' }
  ]
};
