window.LAUTBUCH_TEILE = window.LAUTBUCH_TEILE || {};
window.LAUTBUCH_TEILE.r2 = {
  id: 'r2',
  art: 'regel',
  zeichen: 'v y c',
  abtippen: 'boss',
  blaetter: [['tafel', 'Paare'], ['ketten', 'Ketten'], ['woerter', 'Wörter']],
  level: [
    {
      id: 'l1',
      hinweis: 'Das v ist ein Chamäleon: meist klingt es wie f (Va-ter, Vo-gel), manchmal wie w (Va-se). Auch das y wechselt: am Ende wie i (Po-ny), sonst wie ü oder j (Zy-lin-der, Yo-ga). Das Kind probiert beide Klänge und hört, welcher ein Wort ergibt. Ba-by und Han-dy kommen aus dem Englischen: nach dem Lesen einmal „Bebi“, „Händi“ sagen.',
      probe: ['va', 'vo', 'ny'],
      tafel: [['Va-ter', 'Vi-de-o', 'vor', 'Kur-ve'], ['Han-dy', 'Zy-lin-der', 'Yo-ga', 'Par-ty'],
              ['Ver-band', 'O-li-ve', 'vor-ne', 'Ra-vi-o-li'], ['Ye-ti', 'Vi-o-li-ne', 'Yo-yo', 'Vo-kal', 'Ve-ra']],
      ketten: [['VA-LU', 'VO-MI', 'VE-NO', 'VU-LA'],
               ['MO-NY', 'TA-LY', 'SU-RY', 'NE-DY'],
               ['VA-TER-TAG', 'VO-GEL-NEST', 'BA-BY-BÄR'],
               ['PO-NY-HOF', 'VOR-LE-SEN', 'BA-BY-BREI']],
      woerter: [['Ba-by', 'Vo-gel', 'Po-ny'], ['Va-se', 'Py-ra-mi-de', 'Vul-kan'],
                ['vier', 'brav', 'Hy-ä-ne'], ['von', 'Pa-vi-an', 'ver-bin-den']],
      anlauf: ['VA', 'VO', 'VU', 'VE', 'VI', 'VOR', 'DY', 'NY', 'BY', 'ZY', 'PY', 'LY'],
      z4: ['Vo-gel', 'Po-ny'],
      z5: ['Lo-ko-mo-ti-ve', 'Ba-by-hai'],
      zMehr: ['Ba-by', 'brav', 'vor-bei', 'ner-vös'],
      bilder: ['Ba-by', 'Vo-gel', 'Po-ny', 'Va-se', 'Vul-kan'],
      z6: 'Der Zau-be-rer zau-bert ei-ne Va-se für das Fest.',
      szene: { saetze: ['Huch! Aus dem Zy-lin-der reg-net es Ra-vi-o-li.', 'Pa-pa ruft: Ju-hu! Vie-le Ra-vi-o-li!'],
               heft: 'Was will der Zauberer zaubern? Was kommt aus dem Zylinder? Wer freut sich darüber?' },
      frage: 'Was will der Zauberer zaubern, was kommt stattdessen, und wer freut sich?'
    },
    {
      id: 'l2',
      hinweis: 'Das c ist das dritte Chamäleon: Meist klingt es wie k (Clown, Co-la, Co-mic), vor e und i wie z (Cent). Viele Wörter mit c kommen aus anderen Sprachen. Das Kind probiert beide Klänge und hört, welcher ein Wort ergibt. Cow-boy kommt aus dem Englischen: nach dem Lesen einmal „Kauboi“ sagen.',
      probe: ['co', 'ca', 'ce'],
      tafel: [['CA', 'KA', 'CO', 'KO'], ['CE', 'ZE', 'CI', 'ZI'],
              ['CU', 'KU', 'CLA', 'KLA'], ['CAM', 'KAM', 'CIS', 'ZIS', 'CRO']],
      ketten: [['CO-FU', 'CA-LU', 'CU-NI', 'CE-RU'],
               ['MU-CA', 'LI-CO', 'NU-CA', 'RE-CI'],
               ['CO-LU-MI', 'CA-RU-NO', 'CE-LI-TA'],
               ['MA-CO-LU', 'RI-CA-NO', 'SU-CE-MA']],
      woerter: [['Clown', 'Co-la', 'Cent'], ['Co-mic', 'Club', 'Cow-boy'],
                ['Com-pu-ter', 'Co-bra', 'Cre-me'], ['Co-yo-te', 'Clowns-na-se', 'campt']],
      anlauf: ['CA', 'CO', 'CU', 'CE', 'CI', 'CLO', 'CLA', 'COM', 'CEN', 'KA', 'KO', 'ZE'],
      z4: ['Clown', 'Co-mic'],
      z5: ['Ca-mem-bert', 'Cle-men-ti-ne'],
      zMehr: ['Co-la', 'Club', 'Co-bra', 'Co-yo-te'],
      bilder: ['Clown', 'Co-la', 'Cent', 'Co-mic', 'Cow-boy'],
      z6: 'Vor dem Fest kocht der Elch auf dem Dach.',
      frage: 'Was macht der Elch vor dem Fest, wer hilft ihm, und was macht das Schaf?',
      szene: { saetze: ['Der Hund hilft mit ro-ter Clowns-na-se.',
                        'Und das Schaf? Es nascht vom Ku-chen!'],
               heft: 'Wo kocht der Elch? Wer hilft ihm, und was hat er auf der Nase? Was macht das Schaf?' },
      sinn: {
        satz: 'Der Hund hilft mit ro-ter Clowns-na-se.',
        richtig: 'sz-r2-l2-1',
        wahl: [
          { s: 'sz-r2-l2-1', wer: 'hund', tut: 'hilft', was: 'clownsnase', bild: 'Auf dem roten Dach reicht der kleine braune Hund mit einer roten Clownsnase dem Elch mit Kochmütze eine Schüssel Teig.' },
          { s: 'sz-r2-l2-2', wer: 'lama', tut: 'hilft', was: 'clownsnase', bild: 'Auf demselben roten Dach reicht das Lama mit einer roten Clownsnase dem Elch mit Kochmütze eine Schüssel Teig.' },
          { s: 'sz-r2-l2-3', wer: 'hund', tut: 'hilft', was: 'sonnenbrille', bild: 'Auf demselben roten Dach reicht der kleine braune Hund mit einer Sonnenbrille dem Elch mit Kochmütze eine Schüssel Teig.' }
        ]
      },
      sinnMehr: [
        {
          satz: 'Vor dem Fest kocht der Elch auf dem Dach.',
          richtig: 'sz-r2-l2-s1-1',
          wahl: [
            { s: 'sz-r2-l2-s1-1', wer: 'elch', tut: 'kocht', was: 'dach', bild: 'Auf einem roten Dach steht ein Elch mit Kochmütze und rührt in einem großen Kochtopf.' },
            { s: 'sz-r2-l2-s1-2', wer: 'hirsch', tut: 'kocht', was: 'dach', bild: 'Auf demselben roten Dach steht ein Hirsch mit Kochmütze und rührt in demselben großen Kochtopf.' },
            { s: 'sz-r2-l2-s1-3', wer: 'elch', tut: 'kocht', was: 'küche', bild: 'In einer Küche steht ein Elch mit Kochmütze und rührt in demselben großen Kochtopf.' }
          ]
        },
        {
          satz: 'Und das Schaf? Es nascht vom Ku-chen!',
          richtig: 'sz-r2-l2-s3-1',
          wahl: [
            { s: 'sz-r2-l2-s3-1', wer: 'schaf', tut: 'nascht', was: 'kuchen', bild: 'Neben dem Kochtopf auf dem roten Dach nascht ein Schaf heimlich von einem großen Kuchen.' },
            { s: 'sz-r2-l2-s3-2', wer: 'drache', tut: 'nascht', was: 'kuchen', bild: 'Neben dem Kochtopf auf demselben roten Dach nascht ein kleiner grüner Drache heimlich von demselben großen Kuchen.' },
            { s: 'sz-r2-l2-s3-3', wer: 'schaf', tut: 'nascht', was: 'milch', bild: 'Neben dem Kochtopf auf demselben roten Dach nascht ein Schaf heimlich aus einer Schüssel Milch.' }
          ]
        }
      ]
    }
  ],
  boss: {
    id: 'boss',
    hinweis: 'Alle Chamäleons gemischt: v, y und c. Nimmt das Kind den falschen Klang, fragen: „Kennst du so ein Wort?“ – dann darf es umschalten. Vorgezeigt ist kein Fehler. Zwei Wörter kamen im Buch noch nie vor (Vampir, Klavier): hier wird wirklich erlesen, nicht wiedererkannt.',
    anlauf: ['VA', 'VO', 'VU', 'VOR', 'DY', 'NY', 'PY', 'CA', 'CO', 'CU', 'CE', 'CI', 'CLO', 'LY', 'ZY', 'BY'],
    z4: ['Py-ra-mi-de', 'Clown', 'Vam-pir', 'Kla-vier'],
    z5: ['Py-ja-ma', 'Dra-chen-ba-by'],
    zMehr: ['Ba-by', 'vier', 'Co-la', 'Com-pu-ter', 'Vi-ta-min', 'Vor-sicht'],
    z6: 'Krach! Das Ei vom Dra-chen hat ein Loch.',
    szene: { saetze: ['Huch, aus dem Ei schaut ein Dra-chen-ba-by!', 'Das Dra-chen-ba-by pus-tet Feu-er in den O-fen.',
                      'Das Dra-chen-ba-by nascht Ku-chen. Das Schaf auch!'],
             heft: 'Wer kommt aus dem Ei? Wohin pustet es Feuer? Was nascht es – genau wie das Schaf?' },
    fremd: ['Vam-pir', 'Kla-vier'],
    frage: 'Wer schaut aus dem Ei, wozu braucht der Elch das Feuer, und was nascht das Drachenbaby?',
    sinn: {
      satz: 'Huch, aus dem Ei schaut ein Dra-chen-ba-by!',
      richtig: 'sz-r2-boss-1',
      wahl: [
        { s: 'sz-r2-boss-1', wer: 'drachenbaby', tut: 'schaut', was: 'ei', bild: 'Ein kleines grünes Drachenbaby schaut neugierig aus einer aufgebrochenen Eierschale in einem Nest.' },
        { s: 'sz-r2-boss-2', wer: 'küken', tut: 'schaut', was: 'ei', bild: 'Ein kleines gelbes Küken schaut neugierig aus einer aufgebrochenen Eierschale in einem Nest.' },
        { s: 'sz-r2-boss-3', wer: 'drachenbaby', tut: 'schaut', was: 'loch', bild: 'Ein kleines grünes Drachenbaby schaut neugierig aus einem Astloch in einem Baumstamm direkt neben einem leeren Nest.' }
      ]
    },
    sinnMehr: [
      {
        satz: 'Krach! Das Ei vom Dra-chen hat ein Loch.',
        richtig: 'sz-r2-boss-s1-1',
        wahl: [
          { s: 'sz-r2-boss-s1-1', wer: 'drachen', tut: 'hat loch', was: 'ei', bild: 'In einem großen Nest liegt ein grün gesprenkeltes Drachenei mit einem gezackten Loch in der Schale, daneben steht ein großer grüner Drache und schaut erstaunt.' },
          { s: 'sz-r2-boss-s1-2', wer: 'huhn', tut: 'hat loch', was: 'ei', bild: 'In demselben Nest liegt ein weißes Hühnerei mit einem gezackten Loch in der Schale, daneben steht ein Huhn und schaut erstaunt.' },
          { s: 'sz-r2-boss-s1-3', wer: 'drachen', tut: 'ist heil', was: 'ei', bild: 'In demselben Nest liegt das grün gesprenkelte Drachenei ganz heil, daneben steht der große grüne Drache und schaut erstaunt.' }
        ]
      },
      {
        satz: 'Das Dra-chen-ba-by pus-tet Feu-er in den O-fen.',
        richtig: 'sz-r2-boss-s4-1',
        wahl: [
          { s: 'sz-r2-boss-s4-1', wer: 'drachenbaby', tut: 'pustet feuer', was: 'ofen', bild: 'Auf dem roten Dach pustet das kleine grüne Drachenbaby eine Flamme in die offene Klappe eines Backofens, der Elch mit Kochmütze hält strahlend ein Blech mit Kuchenteig bereit.' },
          { s: 'sz-r2-boss-s4-2', wer: 'drache', tut: 'pustet feuer', was: 'ofen', bild: 'Auf demselben roten Dach pustet der große grüne Drache eine Flamme in die offene Klappe desselben Backofens, der Elch hält das Blech mit Kuchenteig bereit.' },
          { s: 'sz-r2-boss-s4-3', wer: 'drachenbaby', tut: 'pustet feuer', was: 'kuchen', bild: 'Auf demselben roten Dach pustet das kleine grüne Drachenbaby eine Flamme direkt auf das Blech mit Kuchenteig, das der Elch erschrocken hochhält; die Ofenklappe bleibt zu.' }
        ]
      },
      {
        satz: 'Das Dra-chen-ba-by nascht Ku-chen. Das Schaf auch!',
        richtig: 'sz-r2-boss-s3-1',
        wahl: [
          { s: 'sz-r2-boss-s3-1', wer: 'drachenbaby + schaf', tut: 'naschen', was: 'kuchen', bild: 'Ein kleines grünes Drachenbaby und ein Schaf sitzen nebeneinander am Nest und naschen gemeinsam von einem großen Kuchen.' },
          { s: 'sz-r2-boss-s3-2', wer: 'drachenbaby + elch', tut: 'naschen', was: 'kuchen', bild: 'Ein kleines grünes Drachenbaby und ein Elch sitzen nebeneinander am selben Nest und naschen gemeinsam von demselben großen Kuchen.' },
          { s: 'sz-r2-boss-s3-3', wer: 'drachenbaby + schaf', tut: 'naschen', was: 'milch', bild: 'Ein kleines grünes Drachenbaby und ein Schaf sitzen nebeneinander am selben Nest und naschen gemeinsam aus einer Schüssel Milch.' }
        ]
      }
    ]
  },
  bewohner: [
    { s: 'bw-elch', wer: 'Elch', bild: 'Ein freundlicher Elch mit großem Geweih und Kochmütze hält einen Kochlöffel hoch.' },
    { s: 'bw-drachenbaby', wer: 'Drachenbaby', bild: 'Ein kleines grünes Drachenbaby mit runden Flügelchen sitzt in einer Eierschale und lacht.' },
    { s: 'bw-conrad', wer: 'Conrad', bild: 'Ein Kind mit zerzaustem dunkelblondem Haar und Sommersprossen, graugrünem Pullover und Jeans steht ruhig da, die Arme leicht vom Körper.' }
  ],
  schatz: [
    { art: 'sprichwort', text: 'Das Le-ben ist kein Po-ny-hof.' },
    { art: 'sprichwort', text: 'Der Klü-ge-re gibt nach.' },
    { art: 'sprichwort', text: 'Wer sucht, der fin-det.' },
    { art: 'raetsel', text: 'Wel-cher Berg raucht und macht Feu-er?', loesung: 'Der Vul-kan' },
    { art: 'zunge', text: 'Acht El-che ko-chen acht Ku-chen auf acht Dä-chern.' },
    { art: 'witz', text: 'Der Elch hat ei-nen Vo-gel? Ja, ei-ne Mei-se!' },
    { art: 'reim', text: 'Hat der Dra-che laut ge-lacht, hat das gan-ze Dach ge-kracht.' },
    { art: 'satz', text: 'Ein Po-ny mit Zy-lin-der macht Yo-ga.' },
    { art: 'satz', text: 'Ver-bin-de das Ba-by mit dem Po-ny!' }
  ]
};
