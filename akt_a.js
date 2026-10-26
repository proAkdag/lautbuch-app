window.LAUTBUCH_TEILE = window.LAUTBUCH_TEILE || {};
window.LAUTBUCH_TEILE.a = {
  id: 'a',
  art: 'vokal',
  vokal: 'A',
  zeichen: 'A a',
  kaertchen: 'A',
  abtippen: 'boss',
  blaetter: [['tafel', 'Silben'], ['ketten', 'Ketten'], ['woerter', 'Wörter']],
  level: [
    {
      id: 'l1',
      hinweis: 'Den Laut halten und in das A gleiten: mmm-aaa → MA. Erst langsam ziehen, dann schneller.',
      tafel: [['A', 'MA', 'LA', 'NA'], ['SA', 'FA', 'RA', 'HA'],
              ['M', 'MA', 'L', 'LA'], ['N', 'NA', 'S', 'SA']],
      ketten: [['MA-LA', 'LA-NA', 'NA-MA', 'SA-LA'],
               ['FA-RA', 'RA-HA', 'HA-MA', 'LA-SA'],
               ['MA-LA-NA', 'SA-FA-RA', 'HA-LA-MA'],
               ['NA-SA-LA', 'FA-LA-LA', 'RA-MA-HA']],
      woerter: [['A-ha', 'A-ra', 'La-ma'], ['La-la', 'Na-la', 'Sa-ra']],
      anlauf: ['MA', 'LA', 'NA', 'SA', 'FA', 'RA', 'HA', 'A'],
      z4: ['La-la', 'La-ma'],
      z5: ['Sa-ha-ra', 'Ha-ha-ha'],
      zMehr: ['A-ha', 'A-ra', 'Na-la', 'Sa-ra'],
      z6: 'A-ra: la-la-la! La-ma: la-la-la-la-la!',
      frage: 'Wer singt zuerst, und wer singt mit – länger und lauter?'
    },
    {
      id: 'l2',
      hinweis: 'Jetzt kommt ein Laut nach dem A: AM, AL. Erst das A, dann den Laut anhängen. Bei Wörtern Silbe für Silbe.',
      tafel: [['AM', 'AL', 'AN', 'AS', 'AF'], ['MAL', 'SAM', 'MAN', 'LAS', 'FAL'],
              ['HAL', 'RAM', 'NAS', 'HAS', 'LAM'], ['RAN', 'SAN', 'NAM', 'HAM', 'RAS']],
      ketten: [['AL-NA', 'SAM-LA', 'MAL-FA', 'HAS-MA'],
               ['FAS-LA', 'NAM-SA', 'RAM-LA', 'LAN-HA'],
               ['SAL-MA-NA', 'HAM-LA-SA', 'NAL-FA-MA'],
               ['MAS-LA-RA', 'FAL-MA-SA', 'RAS-NA-LA']],
      woerter: [['A-na-nas', 'Sal-sa', 'Fa-san'], ['La-mas', 'Al-ma', 'Ham-ham'],
                ['Hals', 'A-larm', 'half'], ['Arm', 'Farm', 'Alm']],
      anlauf: ['AM', 'AN', 'AL', 'AS', 'AF', 'MAL', 'MAN', 'SAM', 'LAS', 'MA', 'LA', 'NA'],
      z4: ['A-na-nas', 'La-mas'],
      z5: ['Mars', 'A-ram-sam-sam'],
      zMehr: ['Sal-sa', 'Al-ma', 'A-larm', 'Arm'],
      bilder: ['A-na-nas', 'Fa-san', 'La-mas'],
      z6: 'A-na-nas? Ham-ham, La-mas!',
      frage: 'Wie viele Lamas fressen die Ananas?',
      sinn: {
        satz: 'A-na-nas? Ham-ham, La-mas!',
        richtig: 'sz-a-l2-1',
        wahl: [
          { s: 'sz-a-l2-1', wer: 'zwei lamas', tut: 'frisst', was: 'ananas', bild: 'Zwei Lamas stehen nebeneinander auf einer Wiese und knabbern gemeinsam an einer großen Ananas.' },
          { s: 'sz-a-l2-2', wer: 'lama', tut: 'frisst', was: 'ananas', bild: 'Ein einzelnes Lama steht auf derselben Wiese und knabbert an einer großen Ananas.' },
          { s: 'sz-a-l2-3', wer: 'zwei lamas', tut: 'frisst', was: 'salat', bild: 'Zwei Lamas stehen nebeneinander auf derselben Wiese und knabbern gemeinsam an einem großen Salatkopf.' }
        ]
      },
      szene: { heft: 'Lama oder Lamas? Ein Tier oder mehrere. Hier macht das S aus einem Lama mehrere – bei Ananas nicht.' }
    },
    {
      id: 'l3',
      hinweis: 'Kurze Laute direkt ins A: p-a → PA, ohne „pe-a“. B, D und G stehen nie am Ende. Neu ist ein Tu-Wort: malt. Fragen Sie: Wer malt?',
      tafel: [['PA', 'TA', 'KA', 'BA'], ['GA', 'DA', 'PAT', 'KAN'],
              ['BAL', 'GAS', 'DAN', 'TAK'], ['MAP', 'SAT', 'RAST', 'KAST']],
      ketten: [['TA-KA', 'KA-BA', 'BA-SA', 'GA-GA'],
               ['DA-MA', 'PA-NA', 'KAT-MA', 'PAL-TA'],
               ['PA-TA-KA', 'KAL-MA-TA', 'BA-GA-DA'],
               ['TA-RA-PA', 'DA-KAT-NA', 'GAL-PA-SA']],
      woerter: [['Sa-lat', 'Pas-ta', 'Pan-da'], ['Tam-tam', 'malt', 'Ast'],
                ['Bart', 'kalt', 'Pa-last'], ['Gans', 'alt', 'Markt']],
      anlauf: ['PA', 'TA', 'KA', 'BA', 'GA', 'DA', 'AT', 'AK', 'MA', 'LA', 'SA', 'AM'],
      z4: ['Sa-lat', 'Pan-da'],
      z5: ['Pa-na-ma', 'Al-pa-ka'],
      zMehr: ['Pas-ta', 'kalt', 'Glas', 'Gast'],
      bilder: ['Sa-lat', 'Pas-ta', 'Pan-da', 'Tam-tam', 'malt'],
      z6: 'Das La-ma malt Pan-da an!',
      frage: 'Was macht das Lama mit dem Panda?',
      sinn: {
        satz: 'Das La-ma malt Pan-da an!',
        richtig: 'sz-a-l3-1',
        wahl: [
          { s: 'sz-a-l3-1', wer: 'lama', tut: 'malt an', was: 'panda', bild: 'Ein Lama hält einen Pinsel im Maul und tupft bunte Farbpunkte auf das Fell eines Pandas, der still auf einem Hocker sitzt.' },
          { s: 'sz-a-l3-2', wer: 'schaf', tut: 'malt an', was: 'panda', bild: 'Ein Schaf hält einen Pinsel im Maul und tupft bunte Farbpunkte auf das Fell eines Pandas, der still auf demselben Hocker sitzt.' },
          { s: 'sz-a-l3-3', wer: 'lama', tut: 'füttert', was: 'panda', bild: 'Ein Lama hält dem Panda, der still auf demselben Hocker sitzt, einen Teller Pasta hin.' }
        ]
      }
    },
    {
      id: 'l4',
      hinweis: 'SCHA ist eine Silbe. Bei Ketten mit dem Finger unter den Bögen entlangfahren. In tanzt und klatscht stehen viele Laute hintereinander: langsam, Laut für Laut.',
      tafel: [['WA', 'JA', 'ZA', 'SCHA'], ['WAN', 'JAL', 'ZAN', 'SCHAM'],
              ['SAP', 'ZAP', 'SCHAP', 'TAP'], ['WAK', 'JAS', 'ZAF', 'SCHAN']],
      ketten: [['WA-JA', 'JA-ZA', 'ZA-SCHA', 'SCHA-LA'],
               ['MA-WA', 'TA-JA', 'KA-ZA', 'NA-SCHA'],
               ['SCHA-LA-LA', 'ZA-WA-JA', 'JA-SCHA-MA'],
               ['MA-JA-WA', 'ZA-SCHA-PA', 'WA-ZA-NA']],
      woerter: [['Ka-jak', 'Schaf', 'Wal'], ['Scha-kal', 'tanzt', 'Ma-scha'],
                ['warm', 'Tanz', 'na-ja'], ['Arzt', 'warf', 'Schwan']],
      anlauf: ['WA', 'JA', 'ZA', 'SCHA', 'JAN', 'WAS', 'SCHAN', 'PA', 'TA', 'AM', 'DA', 'AL'],
      z4: ['Ka-jak', 'Wal'],
      z5: ['Ja-pan', 'Na-ta-scha'],
      zMehr: ['Schaf', 'Tanz', 'scharf', 'Kraft'],
      bilder: ['Ka-jak', 'Schaf', 'Wal', 'Scha-kal', 'tanzt'],
      z6: 'Das Schaf tanzt Sal-sa.',
      frage: 'Wer tanzt alles?',
      szene: { saetze: ['Ha-ha! Pan-da tanzt Sal-sa!'],
               heft: 'Wer tanzt? Zeig im Bild den Panda, der tanzt.' },
      sinn: {
        satz: 'Ha-ha! Pan-da tanzt Sal-sa!',
        richtig: 'sz-a-l4-1',
        wahl: [
          { s: 'sz-a-l4-1', wer: 'panda', tut: 'tanzt', was: '', bild: 'Ein Panda mit bunten Farbpunkten im Fell tanzt fröhlich auf einer Wiese, die Arme hoch in der Luft.' },
          { s: 'sz-a-l4-2', wer: 'schaf', tut: 'tanzt', was: '', bild: 'Ein Schaf tanzt fröhlich auf derselben Wiese, die Vorderbeine hoch in der Luft.' },
          { s: 'sz-a-l4-3', wer: 'panda', tut: 'klatscht', was: '', bild: 'Ein Panda mit bunten Farbpunkten im Fell steht auf derselben Wiese und klatscht in die Pfoten.' }
        ]
      },
      sinnMehr: [
        {
          satz: 'Das Schaf tanzt Sal-sa.',
          richtig: 'sz-a-l4-s1-1',
          wahl: [
            { s: 'sz-a-l4-s1-1', wer: 'schaf', tut: 'tanzt', was: '', bild: 'Ein Schaf tanzt fröhlich auf einer Wiese, die Vorderbeine hoch in der Luft.' },
            { s: 'sz-a-l4-s1-2', wer: 'lama', tut: 'tanzt', was: '', bild: 'Ein Lama tanzt fröhlich auf derselben Wiese, die Vorderbeine hoch in der Luft.' },
            { s: 'sz-a-l4-s1-3', wer: 'schaf', tut: 'klatscht', was: '', bild: 'Ein Schaf steht auf derselben Wiese und klatscht in die Vorderhufe.' }
          ]
        }
      ]
    }
  ],
  boss: {
    id: 'boss',
    hinweis: 'Das ganze A in einer Geschichte, hier erst Mama und Papa. Vorgezeigt ist kein Fehler.',
    anlauf: ['MA', 'LA', 'NA', 'SA', 'FA', 'RA', 'HA', 'AM', 'AN', 'AL', 'MAL', 'PA', 'TA', 'KA', 'BA', 'GA', 'DA',
             'AT', 'WA', 'JA', 'ZA', 'SCHA', 'KAM', 'TAL', 'WAS'],
    z4: ['A-na-nas', 'Tam-tam', 'Scha-kal'],
    z5: ['Pa-pa', 'Ma-ma'],
    zMehr: ['A-ha', 'half', 'alt', 'sanft', 'Dampf'],
    z6: 'Pa-pa hat Pas-ta, Ma-ma Sa-lat.',
    szene: { saetze: ['Pa-pa! Das Schaf nascht Pas-ta!', 'Pa-pa? Pa-pa tanzt Sal-sa!'],
             heft: 'Wer nascht die Pasta? Zeig im Bild, was das Schaf nascht – und wer am Ende tanzt.' },
    frage: 'Warum ruft jemand nach Papa, und was macht Papa dann?',
    sinn: {
      satz: 'Pa-pa! Das Schaf nascht Pas-ta!',
      richtig: 'sz-a-boss-1',
      wahl: [
        { s: 'sz-a-boss-1', wer: 'schaf', tut: 'nascht', was: 'pasta', bild: 'Ein Schaf stellt sich mit den Vorderhufen auf einen Stuhl am Küchentisch und nascht aus einem Teller Pasta, eine Nudel hängt ihm aus dem Maul.' },
        { s: 'sz-a-boss-2', wer: 'lama', tut: 'nascht', was: 'pasta', bild: 'Ein Lama steckt seinen langen Hals über denselben Küchentisch und nascht aus einem Teller Pasta.' },
        { s: 'sz-a-boss-3', wer: 'schaf', tut: 'nascht', was: 'salat', bild: 'Ein Schaf stellt sich mit den Vorderhufen auf denselben Stuhl am Küchentisch und nascht aus einer Schüssel Salat, ein Salatblatt hängt ihm aus dem Maul.' }
      ]
    },
    sinnMehr: [
      {
        satz: 'Pa-pa hat Pas-ta, Ma-ma Sa-lat.',
        richtig: 'sz-a-boss-s1-1',
        wahl: [
          { s: 'sz-a-boss-s1-1', wer: 'papa + mama', tut: 'hat', was: 'pasta + salat', bild: 'Papa und Mama sitzen nebeneinander am Küchentisch; vor Papa steht ein Teller Pasta, vor Mama eine Schüssel Salat.' },
          { s: 'sz-a-boss-s1-2', wer: 'papa + lama', tut: 'hat', was: 'pasta + salat', bild: 'Papa sitzt am selben Küchentisch, neben ihm steht ein Lama an Mamas Platz; vor Papa steht ein Teller Pasta, vor dem Lama eine Schüssel Salat.' },
          { s: 'sz-a-boss-s1-3', wer: 'papa + mama', tut: 'hat', was: 'pasta + ananas', bild: 'Papa und Mama sitzen nebeneinander am selben Küchentisch; vor Papa steht ein Teller Pasta, vor Mama eine Ananas.' }
        ]
      },
      {
        satz: 'Pa-pa? Pa-pa tanzt Sal-sa!',
        richtig: 'sz-a-boss-s3-1',
        wahl: [
          { s: 'sz-a-boss-s3-1', wer: 'papa', tut: 'tanzt', was: '', bild: 'Papa tanzt fröhlich in derselben Küche neben dem Küchentisch, die Arme hoch in der Luft.' },
          { s: 'sz-a-boss-s3-2', wer: 'mama', tut: 'tanzt', was: '', bild: 'Mama tanzt fröhlich in derselben Küche neben dem Küchentisch, die Arme hoch in der Luft.' },
          { s: 'sz-a-boss-s3-3', wer: 'papa', tut: 'klatscht', was: '', bild: 'Papa steht in derselben Küche neben dem Küchentisch und klatscht in die Hände.' }
        ]
      }
    ]
  },
  bewohner: [
    { s: 'bw-panda', wer: 'Panda', bild: 'Ein freundlicher Panda mit bunten Farbpunkten im schwarz-weißen Fell steht aufrecht und winkt mit einer Pfote.' },
    { s: 'bw-ara', wer: 'Ara', bild: 'Ein bunter Ara sitzt auf einem kurzen Ast und singt mit offenem Schnabel.' }
  ],
  schatz: [
    { art: 'raetsel', text: 'Wal, Tal, Ka-nal – was hat das La-ma am Hals?', loesung: 'Schal' },
    { art: 'zunge', text: 'Ma-scha malt Sa-schas Schaf schwarz an.' },
    { art: 'witz', text: 'Das Schaf nascht Pa-pas Pas-ta. Pa-pa mampft Gras.' },
    { art: 'witz', text: 'Das La-ma malt Pa-pa – als La-ma!' },
    { art: 'reim', text: 'Das La-ma rast, das Schaf hat Rast – am Ast!' },
    { art: 'witz', text: 'Schlaf, Schaf, schlaf – das Al-pa-ka tanzt Sam-ba!' },
    { art: 'satz', text: 'Wal am Ka-jak! Ma-ma, rasch, rasch!' },
    { art: 'satz', text: 'Was man hat, das hat man.' }
  ]
};
