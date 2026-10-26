window.LAUTBUCH_TEILE = window.LAUTBUCH_TEILE || {};
window.LAUTBUCH_TEILE.oe = {
  id: 'oe',
  art: 'klang',
  zeichen: 'Ö ö',
  abtippen: 'boss',
  blaetter: [['tafel', 'Silben'], ['ketten', 'Ketten'], ['woerter', 'Wörter']],
  level: [
    {
      id: 'l1',
      hinweis: 'Für Ö die Lippen rund machen wie beim O und dabei E sagen. Ein Spiegel hilft: Der Mund bleibt rund. ÖÖÖ dehnen, dann LÖ.',
      probe: ['mö', 'lö', 'kö'],
      tafel: [['Ö', 'MÖ', 'LÖ', 'NÖ', 'SÖ'], ['KÖ', 'TÖ', 'FÖ', 'SCHÖ', 'WÖ'],
              ['MÖT', 'LÖN', 'NÖS', 'FÖL', 'HÖM'], ['KÖP', 'TÖS', 'BÖF', 'GÖN', 'SCHÖT']],
      ketten: [['MÖ-LA', 'LÖ-NI', 'NÖ-SU', 'SÖ-FÄ'],
               ['KÖ-RU', 'TÖ-MA', 'FÖ-LI', 'WÖ-SA'],
               ['MÖ-LA-NO', 'SCHÖ-RI-TA', 'KÖ-SU-MÄ'],
               ['TÖ-LU-NA', 'WÖ-MA-RI', 'LÖ-FI-SA']],
      woerter: [['Lö-we', 'Mö-we', 'Kö-ni-gin'], ['flö-tet', 'Krö-te', 'Frö-sche'],
                ['Hö-he', 'Kör-per', 'mö-gen'], ['Brö-sel', 'bö-se', 'Knö-del']],
      anlauf: ['MÖ', 'LÖ', 'NÖ', 'SÖ', 'KÖ', 'TÖ', 'FÖ', 'WÖ', 'SCHÖ', 'Ö', 'FLÖ', 'KRÖ'],
      z4: ['Krö-te', 'Mö-we'],
      z5: ['Tö-ne', 'Trö-te'],
      zMehr: ['Lö-we', 'Kör-per', 'lö-sen', 'höf-lich'],
      bilder: ['Lö-we', 'Mö-we', 'Kö-ni-gin', 'Krö-te', 'flö-tet'],
      z6: 'Das Schaf flö-tet, Lö-we Le-o tanzt!',
      frage: 'Wer macht Musik, und wer tanzt dazu?'
    },
    {
      id: 'l2',
      hinweis: 'Ö kann auch vor zwei Lauten stehen (KRÖ, FLÖ) und einen Laut danach haben (WÖL). Wird aus Ö ein O: Mund rund lassen und dabei E sagen, wie beim ersten Ö.',
      probe: ['wöl', 'krö', 'schön'],
      tafel: [['ÖL', 'ÖN', 'ÖS', 'ÖT', 'ÖM'], ['WÖL', 'KÖS', 'TÖN', 'SCHÖN', 'HÖL'],
              ['FLÖ', 'KRÖ', 'FRÖ', 'BRÖ', 'TRÖ'], ['FLÖT', 'KRÖN', 'FRÖS', 'BRÖM', 'TRÖL']],
      ketten: [['FLÖ-MA', 'KRÖ-LI', 'FRÖ-NU', 'TRÖ-SA'],
               ['WÖL-TA', 'SCHÖN-LI', 'KÖS-RU', 'HÖL-MÄ'],
               ['BRÖ-SA-LI', 'TÖN-MA-RU', 'FLÖ-KI-NA'],
               ['MÖL-TA-FI', 'KRÖ-NU-SA', 'WÖS-LA-KO']],
      woerter: [['Wöl-fe', 'Kör-be', 'hört'], ['Ö-fen', 'Kö-ni-ge', 'Re-gen-bö-gen'],
                ['Bröt-chen', 'Flö-te', 'trös-tet'], ['nö-tig', 'Lö-cher', 'Wör-ter']],
      anlauf: ['ÖL', 'ÖN', 'ÖS', 'ÖT', 'WÖL', 'KÖS', 'TÖN', 'HÖL', 'FLÖ', 'KRÖ', 'FRÖ', 'BRÖ', 'TRÖ'],
      z4: ['Wöl-fe', 'Re-gen-bö-gen'],
      z5: ['Lö-win', 'Hö-hö-hö'],
      zMehr: ['Kör-be', 'Flö-te', 'Knöp-fe', 'köst-lich'],
      bilder: ['Wöl-fe', 'Kör-be', 'Kö-ni-ge', 'Re-gen-bö-gen', 'hört'],
      z6: 'Hö-hö! Wöl-fe tra-gen Kör-be zu O-ma.',
      frage: 'Was tragen die Wölfe, und zu wem? Kennst du eine Geschichte, in der das anders ist?',
      szene: { saetze: ['Lö-we Le-o wirft Brot.', 'Mö-wen lan-den am Schwanz.'],
               heft: 'Was wirft Löwe Leo? Wer kommt geflogen, und wo landen sie? Wie findet Leo das wohl?' },
      sinn: {
        satz: 'Lö-we Le-o wirft Brot.',
        richtig: 'sz-oe-l2-1',
        wahl: [
          { s: 'sz-oe-l2-1', wer: 'löwe', tut: 'wirft', was: 'brot', bild: 'Ein freundlicher Löwe steht am Strand und wirft mit der Pfote Brotstücke in die Luft.' },
          { s: 'sz-oe-l2-2', wer: 'möwe', tut: 'wirft', was: 'brot', bild: 'Eine Möwe steht am Strand und wirft mit dem Flügel Brotstücke in die Luft.' },
          { s: 'sz-oe-l2-3', wer: 'löwe', tut: 'wirft', was: 'körbe', bild: 'Ein freundlicher Löwe steht am Strand und wirft mit der Pfote kleine Körbe in die Luft.' }
        ]
      },
      sinnMehr: [
        {
          satz: 'Hö-hö! Wöl-fe tra-gen Kör-be zu O-ma.',
          richtig: 'sz-oe-l2-s1-1',
          wahl: [
            { s: 'sz-oe-l2-s1-1', wer: 'wölfe', tut: 'tragen', was: 'körbe', bild: 'Zwei freundliche Wölfe gehen auf einem Waldweg zu einem kleinen Haus, an dessen Fenster eine Oma winkt, und tragen jeder einen Korb.' },
            { s: 'sz-oe-l2-s1-2', wer: 'löwen', tut: 'tragen', was: 'körbe', bild: 'Zwei freundliche Löwen gehen auf demselben Waldweg zum selben Haus, an dessen Fenster die Oma winkt, und tragen jeder einen Korb.' },
            { s: 'sz-oe-l2-s1-3', wer: 'wölfe', tut: 'tragen', was: 'brote', bild: 'Zwei freundliche Wölfe gehen auf demselben Waldweg zum selben Haus, an dessen Fenster die Oma winkt, und tragen jeder einen großen Laib Brot.' }
          ]
        },
        {
          satz: 'Mö-wen lan-den am Schwanz.',
          richtig: 'sz-oe-l2-s3-1',
          wahl: [
            { s: 'sz-oe-l2-s3-1', wer: 'möwen', tut: 'landen', was: 'schwanz', bild: 'Am Strand landen drei Möwen auf dem langen Schwanz eines freundlichen Löwen, der stolz über die Schulter schaut.' },
            { s: 'sz-oe-l2-s3-2', wer: 'tauben', tut: 'landen', was: 'schwanz', bild: 'Am selben Strand landen drei Tauben auf dem langen Schwanz desselben Löwen, der stolz über die Schulter schaut.' },
            { s: 'sz-oe-l2-s3-3', wer: 'möwen', tut: 'landen', was: 'kopf', bild: 'Am selben Strand landen drei Möwen auf dem Kopf desselben Löwen, der stolz nach oben schaut.' }
          ]
        }
      ]
    }
  ],
  boss: {
    id: 'boss',
    hinweis: 'Das ganze Ö gemischt, mit Ä dazwischen. Wird Ö mit Ä verwechselt: Mund rund für Ö, Mund breit für Ä. Zwei Wörter kamen im Buch noch nie vor (Möbel, Köpfe): hier wird wirklich erlesen, nicht wiedererkannt.',
    anlauf: ['MÖ', 'LÖ', 'NÖ', 'SÖ', 'KÖ', 'TÖ', 'FÖ', 'WÖ', 'SCHÖ', 'Ö', 'ÖL', 'ÖN', 'ÖS', 'WÖL', 'TÖN',
             'FLÖ', 'KRÖ', 'FRÖ', 'BRÖ', 'TRÖ'],
    z4: ['Krö-te', 'Re-gen-bö-gen', 'Mö-bel', 'Köp-fe'],
    z5: ['Lö-wen-ma-ma', 'Frosch-kö-ni-gin'],
    zMehr: ['Lö-we', 'Wöl-fe', 'hö-her', 'Knö-chel', 'schö-ner', 'Kö-nig'],
    z6: 'Re-gen! Mö-wen, Wöl-fe, Schaf: Husch, husch!',
    szene: { saetze: ['Lö-we Le-o trö-tet im Re-gen.', 'Das Schaf flö-tet mit. Le-o ruft: So schön!'],
             heft: 'Wer trötet, wer flötet? Wie ist das Wetter?' },
    fremd: ['Mö-bel', 'Köp-fe'],
    frage: 'Wer huscht vor dem Regen davon, was macht Löwe Leo, und wer macht mit?',
    sinn: {
      satz: 'Lö-we Le-o trö-tet im Re-gen.',
      richtig: 'sz-oe-boss-1',
      wahl: [
        { s: 'sz-oe-boss-1', wer: 'löwe', tut: 'trötet', was: 'regen', bild: 'Ein freundlicher Löwe steht im Regen auf einer Wiese und bläst fröhlich in eine bunte Tröte mit großem Trichter.' },
        { s: 'sz-oe-boss-2', wer: 'löwe', tut: 'flötet', was: 'regen', bild: 'Ein freundlicher Löwe steht im Regen auf einer Wiese und spielt fröhlich auf einer geraden Blockflöte mit Grifflöchern.' },
        { s: 'sz-oe-boss-3', wer: 'löwe', tut: 'trötet', was: 'sonne', bild: 'Ein freundlicher Löwe steht bei Sonnenschein auf einer Wiese und bläst fröhlich in eine bunte Tröte mit großem Trichter.' }
      ]
    },
    sinnMehr: [
      {
        satz: 'Re-gen! Mö-wen, Wöl-fe, Schaf: Husch, husch!',
        richtig: 'sz-oe-boss-s1-1',
        wahl: [
          { s: 'sz-oe-boss-s1-1', wer: 'möwen + wölfe + schaf', tut: 'huschen', was: 'regen', bild: 'Es regnet auf der Wiese, und zwei Möwen, zwei Wölfe und ein Schaf rennen eilig unter einen großen Baum.' },
          { s: 'sz-oe-boss-s1-2', wer: 'möwen + wölfe + lama', tut: 'huschen', was: 'regen', bild: 'Es regnet auf derselben Wiese, und zwei Möwen, zwei Wölfe und ein Lama rennen eilig unter denselben großen Baum.' },
          { s: 'sz-oe-boss-s1-3', wer: 'möwen + wölfe + schaf', tut: 'huschen', was: 'sonne', bild: 'Die Sonne scheint auf dieselbe Wiese, und zwei Möwen, zwei Wölfe und ein Schaf rennen eilig unter denselben großen Baum.' }
        ]
      },
      {
        satz: 'Das Schaf flö-tet mit. Le-o ruft: So schön!',
        richtig: 'sz-oe-boss-s3-1',
        wahl: [
          { s: 'sz-oe-boss-s3-1', wer: 'schaf + leo', tut: 'flötet + ruft', was: '', bild: 'Im Regen auf der Wiese spielt ein Schaf auf einer geraden Blockflöte, daneben steht ein freundlicher Löwe mit seiner bunten Tröte und ruft begeistert.' },
          { s: 'sz-oe-boss-s3-2', wer: 'möwe + leo', tut: 'flötet + ruft', was: '', bild: 'Im Regen auf derselben Wiese spielt eine Möwe auf einer geraden Blockflöte, daneben steht derselbe Löwe mit seiner bunten Tröte und ruft begeistert.' },
          { s: 'sz-oe-boss-s3-3', wer: 'schaf + leo', tut: 'trötet + ruft', was: '', bild: 'Im Regen auf derselben Wiese bläst ein Schaf in eine zweite bunte Tröte mit großem Trichter, daneben steht derselbe Löwe mit seiner Tröte und ruft begeistert.' }
        ]
      }
    ]
  },
  bewohner: [
    { s: 'bw-loewe-leo', wer: 'Löwe Leo', bild: 'Ein freundlicher Löwe mit großer, sorgfältig gekämmter Mähne steht aufrecht, hebt stolz das Kinn und lächelt.' },
    { s: 'bw-moewe', wer: 'Möwe', bild: 'Eine weiße Möwe mit gelbem Schnabel steht auf beiden Beinen und hat ein Stück Brot im Schnabel.' }
  ],
  schatz: [
    { art: 'witz', text: 'Lö-we Le-o trö-tet. Das Schaf ruft: Hast du Tö-ne!' },
    { art: 'raetsel', text: 'Lö-we mit M: Was ist das?', loesung: 'Mö-we' },
    { art: 'zunge', text: 'Kö-ni-gin Krö-te krönt Kö-ni-ge.' },
    { art: 'witz', text: 'Lö-we Le-o ist so schön. Fin-det Le-o.' },
    { art: 'reim', text: 'Möp-se tra-gen Töp-fe, Frö-sche tra-gen Zöp-fe.' },
    { art: 'witz', text: 'Bö-se Wöl-fe? Nö! Wöl-fe mit Blu-men zu O-ma.' },
    { art: 'satz', text: 'Das Schaf flö-tet, zwölf Mö-wen tan-zen Sal-sa.' },
    { art: 'satz', text: 'Flö-he fin-den Le-o so schön.' },
    { art: 'satz', text: 'Le-o ruft: Wer ist hin-ter mir? Ach, nur die Kin-der!' }
  ]
};
