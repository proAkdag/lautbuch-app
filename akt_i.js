window.LAUTBUCH_TEILE = window.LAUTBUCH_TEILE || {};
window.LAUTBUCH_TEILE.i = {
  id: 'i',
  art: 'vokal',
  vokal: 'I',
  zeichen: 'I i',
  kaertchen: 'I',
  abtippen: 'boss',
  blaetter: [['tafel', 'Silben'], ['ketten', 'Ketten'], ['woerter', 'Wörter']],
  level: [
    {
      id: 'l1',
      hinweis: 'Das I hell sprechen, die Lippen breit wie beim Lächeln. Den Laut halten und ins I gleiten: mmm-iii → MI. Bei Mi-a beide Laute einzeln hören lassen: I, dann A.',
      tafel: [['I', 'MI', 'LI', 'NI'], ['SI', 'FI', 'RI', 'HI'],
              ['MA', 'MI', 'LA', 'LI'], ['NA', 'NI', 'SA', 'SI']],
      ketten: [['MI-LI', 'LI-HA', 'NI-MA', 'SI-FA'],
               ['FI-RA', 'RI-HI', 'HI-MA', 'LA-SI'],
               ['MI-LA-NI', 'SA-FI-RA', 'HI-LI-MA'],
               ['NI-SA-LI', 'FI-LI-LA', 'RI-MA-HI']],
      woerter: [['Mi-a', 'Li-la', 'Ni-na'], ['Hi-hi', 'Mi-ni', 'Sa-fa-ri']],
      anlauf: ['MI', 'LI', 'NI', 'SI', 'FI', 'RI', 'HI', 'I'],
      z4: ['Li-la', 'Mi-ni'],
      z5: ['Sa-la-mi', 'I-a'],
      zMehr: ['Mi-a', 'Ni-na', 'Hi-hi', 'Sa-fa-ri'],
      z6: 'I-a? Hi-hi, La-ma!',
      frage: 'Wer macht hier „I-a“?'
    },
    {
      id: 'l2',
      hinweis: 'Jetzt kommt ein Laut nach dem I: IM, IN. Das I bleibt kurz. Lange Wörter wie Mi-ni-sa-la-mi Silbe für Silbe lesen, dann zusammenschieben.',
      tafel: [['IM', 'IL', 'IN', 'IS', 'IF'], ['MIL', 'SIM', 'MIN', 'LIS', 'FIL'],
              ['HIL', 'RIM', 'NIS', 'HIS', 'LIM'], ['RIN', 'SIN', 'NIM', 'HIM', 'RIS']],
      ketten: [['IL-NA', 'SIM-LA', 'MIL-FA', 'HIS-MA'],
               ['FIS-LA', 'NIM-SA', 'RIM-LA', 'LIN-HA'],
               ['SIL-MA-NI', 'HIM-SA-LA', 'NIL-FA-MI'],
               ['MIS-LA-RA', 'FIL-MA-SI', 'RIS-NA-LI']],
      woerter: [['Film', 'Nils', 'Sa-la-mis'], ['Hirn', 'Mi-lan', 'Mi-ni-sa-la-mi'],
                ['ins', 'Fir-ma', 'hilf'], ['Nil', 'I-ris', 'mi-ni-mal']],
      anlauf: ['IN', 'IL', 'IS', 'IF', 'MIL', 'MIN', 'SIM', 'LIS', 'HIS', 'MI', 'LI', 'NI'],
      z4: ['Film', 'Sa-la-mis'],
      z5: ['Mi-mi-mi', 'Mi-ni-la-ma'],
      zMehr: ['Nils', 'Mi-lan', 'Fir-ma', 'Nil'],
      bilder: ['Film', 'Sa-la-mis'],
      z6: 'Hi-hi! Mi-ni-la-mas im Film!',
      frage: 'Wo sind die Lamas, und wie groß sind sie?',
      sinn: {
        satz: 'Hi-hi! Mi-ni-la-mas im Film!',
        richtig: 'sz-i-l2-1',
        wahl: [
          { s: 'sz-i-l2-1', wer: 'drei mini-lamas', tut: 'stehen', was: 'im film', bild: 'Ein großer Fernseher in einem Wohnzimmer zeigt drei winzige Babylamas auf einer Wiese, jedes nur so groß wie die Salami, die im Film neben ihnen liegt.' },
          { s: 'sz-i-l2-2', wer: 'drei lamas', tut: 'stehen', was: 'im film', bild: 'Derselbe Fernseher im selben Wohnzimmer zeigt drei große Lamas auf einer Wiese, die weit über die Salami neben ihnen hinausragen.' },
          { s: 'sz-i-l2-3', wer: 'drei mini-lamas', tut: 'stehen', was: 'im zimmer', bild: 'Drei winzige Babylamas, jedes nur so groß wie die Salami neben ihnen, stehen im selben Wohnzimmer vor dem ausgeschalteten Fernseher.' }
        ]
      },
      szene: { heft: 'Kleine Lamas oder große? Im Film oder echt im Zimmer? Beides steht im Satz: Mi-ni und im Film.' }
    },
    {
      id: 'l3',
      hinweis: 'Kurze Laute direkt ins I: t-i → TI, ohne „te-i“. B, D und G stehen nie am Ende. Bei Pa-pri-ka kommen zwei Laute vor das I: p-r-i. filmt ist ein Tu-Wort: Was macht das Lama?',
      tafel: [['PI', 'TI', 'KI', 'BI'], ['GI', 'DI', 'PIT', 'KIN'],
              ['BIL', 'GIS', 'DIN', 'TIK'], ['MIP', 'SIT', 'RIST', 'KIST']],
      ketten: [['TI-KA', 'KI-BA', 'BI-SA', 'GI-PA'],
               ['DI-MA', 'PI-NA', 'KIT-MA', 'PIL-TA'],
               ['PI-KA-TI', 'KIL-MA-TI', 'BI-GA-DI'],
               ['TI-RA-PI', 'DI-KAT-NI', 'GIL-PA-SI']],
      woerter: [['Ti-pi', 'Pa-pri-ka', 'Pi-rat'], ['Bam-bi', 'filmt', 'Ka-min'],
                ['pri-ma', 'A-fri-ka', 'Gips'], ['bis', 'A-pril', 'pikst']],
      anlauf: ['PI', 'TI', 'KI', 'BI', 'GI', 'DI', 'IT', 'IK', 'MI', 'LI', 'SI', 'IN'],
      z4: ['Ti-pi', 'Pi-rat'],
      z5: ['Sim-ba', 'Sim-sa-la-bim'],
      zMehr: ['Pa-pri-ka', 'A-fri-ka', 'drin', 'da-mit'],
      bilder: ['Ti-pi', 'Pa-pri-ka', 'Pi-rat', 'Bam-bi', 'filmt'],
      z6: 'Das La-ma filmt Bam-bi im Ti-pi.',
      frage: 'Wen filmt das Lama, und wo?',
      sinn: {
        satz: 'Das La-ma filmt Bam-bi im Ti-pi.',
        richtig: 'sz-i-l3-1',
        wahl: [
          { s: 'sz-i-l3-1', wer: 'lama', tut: 'filmt', was: 'bambi', bild: 'Ein Lama hält eine kleine Kamera und filmt ein Rehkitz, das in einem Tipi sitzt.' },
          { s: 'sz-i-l3-2', wer: 'lama', tut: 'malt', was: 'bambi', bild: 'Ein Lama steht vor demselben Tipi an einer Staffelei und malt das Rehkitz, das darin sitzt.' },
          { s: 'sz-i-l3-3', wer: 'lama', tut: 'filmt', was: 'pirat', bild: 'Ein Lama hält eine kleine Kamera und filmt einen kleinen Piraten mit Augenklappe, der in demselben Tipi sitzt.' }
        ]
      }
    },
    {
      id: 'l4',
      hinweis: 'SCHI ist eine Silbe, das SCH ist ein Laut. Z klingt wie ts. Bei Hirsch das R nur leicht andeuten, nicht rollen. wischt und fischt genau ansehen: nur der erste Laut ist anders.',
      tafel: [['WI', 'JI', 'ZI', 'SCHI'], ['WIN', 'JIL', 'ZIN', 'SCHIM'],
              ['SIP', 'ZIP', 'SCHIP', 'TIP'], ['WIK', 'JIS', 'ZIF', 'SCHIN']],
      ketten: [['WI-JA', 'JI-ZA', 'ZI-SCHA', 'SCHI-LA'],
               ['MI-WA', 'TI-JA', 'KI-ZA', 'NI-SCHA'],
               ['SCHI-LA-LA', 'ZI-WA-JA', 'JI-SCHA-MI'],
               ['MI-JA-WI', 'ZI-SCHA-PI', 'WI-ZA-NI']],
      woerter: [['Fisch', 'Ki-wi', 'Pilz'], ['Tisch', 'Hirsch', 'wischt'],
                ['frisch', 'Prinz', 'zischt'], ['Schirm', 'wirft', 'zirpt']],
      anlauf: ['WI', 'JI', 'ZI', 'SCHI', 'JIL', 'WIS', 'SCHIN', 'PI', 'TI', 'IM', 'DI', 'IL'],
      z4: ['Fisch', 'Pilz'],
      z5: ['Jim', 'Wi-schi-wa-schi'],
      zMehr: ['Ki-wi', 'Prinz', 'fan-tas-tisch', 'prak-tisch'],
      bilder: ['Fisch', 'Ki-wi', 'Pilz', 'Hirsch', 'wischt', 'wirft'],
      z6: 'Das Schaf wischt, das La-ma fischt.',
      frage: 'Was zieht das Lama aus dem Wasser?',
      szene: { saetze: ['Hi-hi! Das La-ma fischt Ki-wis.'],
               heft: 'Wer wischt, wer fischt? Was fischt das Lama – Fische oder Kiwis?' },
      sinn: {
        satz: 'Hi-hi! Das La-ma fischt Ki-wis.',
        richtig: 'sz-i-l4-1',
        wahl: [
          { s: 'sz-i-l4-1', wer: 'lama', tut: 'fischt', was: 'kiwis', bild: 'Ein Lama steht am Ufer eines Sees und zieht mit einer Angel drei Kiwis aus dem Wasser.' },
          { s: 'sz-i-l4-2', wer: 'hirsch', tut: 'fischt', was: 'kiwis', bild: 'Ein Hirsch steht am selben Ufer und zieht mit einer Angel drei Kiwis aus dem Wasser.' },
          { s: 'sz-i-l4-3', wer: 'lama', tut: 'fischt', was: 'fisch', bild: 'Ein Lama steht am selben Ufer und zieht mit einer Angel einen Fisch aus dem Wasser.' }
        ]
      },
      sinnMehr: [
        {
          satz: 'Das Schaf wischt, das La-ma fischt.',
          richtig: 'sz-i-l4-s1-1',
          wahl: [
            { s: 'sz-i-l4-s1-1', wer: 'schaf + lama', tut: 'wischt + fischt', was: '', bild: 'Am Ufer eines Sees wischt ein Schaf mit einem Mopp den Holzsteg, daneben steht ein Lama und angelt mit einer Angel.' },
            { s: 'sz-i-l4-s1-2', wer: 'hirsch + lama', tut: 'wischt + fischt', was: '', bild: 'Am selben Ufer wischt ein Hirsch mit einem Mopp den Holzsteg, daneben steht das Lama und angelt mit einer Angel.' },
            { s: 'sz-i-l4-s1-3', wer: 'schaf + lama', tut: 'wischt + schläft', was: '', bild: 'Am selben Ufer wischt ein Schaf mit einem Mopp den Holzsteg, daneben liegt das Lama im Gras und schläft.' }
          ]
        }
      ]
    }
  ],
  boss: {
    id: 'boss',
    hinweis: 'Das ganze I gemischt, A läuft mit. Vorgezeigt ist kein Fehler.',
    anlauf: ['MI', 'LI', 'NI', 'SI', 'FI', 'RI', 'HI', 'IS', 'IN', 'IL', 'MIL', 'PI', 'TI', 'KI', 'BI', 'GI', 'DI',
             'IT', 'WI', 'JI', 'ZI', 'SCHI', 'KIM', 'TIL', 'WIS'],
    z4: ['Mi-ni-sa-la-mi', 'Pa-pri-ka', 'Hirsch'],
    z5: ['Bi-bi', 'Ki-ta'],
    zMehr: ['Mi-a', 'hilf', 'A-pril', 'Ma-ga-zin', 'Pa-nik'],
    z6: 'Das La-ma filmt das Schaf im Ti-pi.',
    szene: { saetze: ['Sim-sa-la-bim! Das Schaf ist li-la!', 'Hi-hi! Das li-la Schaf fischt Ki-wis.'],
             heft: 'Wer filmt wen? Welche Farbe hat das Schaf, und was fischt es?' },
    frage: 'Wen filmt das Lama, was passiert mit dem Schaf, und was macht es dann?',
    sinn: {
      satz: 'Sim-sa-la-bim! Das Schaf ist li-la!',
      richtig: 'sz-i-boss-1',
      wahl: [
        { s: 'sz-i-boss-1', wer: 'schaf', tut: 'staunt', was: 'lila', bild: 'Ein lila Schaf steht staunend auf einer Wiese, um es herum funkeln kleine Sterne.' },
        { s: 'sz-i-boss-2', wer: 'lama', tut: 'staunt', was: 'lila', bild: 'Ein lila Lama steht staunend auf derselben Wiese, um es herum funkeln kleine Sterne.' },
        { s: 'sz-i-boss-3', wer: 'schaf', tut: 'staunt', was: 'grün', bild: 'Ein grünes Schaf steht staunend auf derselben Wiese, um es herum funkeln kleine Sterne.' }
      ]
    },
    sinnMehr: [
      {
        satz: 'Das La-ma filmt das Schaf im Ti-pi.',
        richtig: 'sz-i-boss-s1-1',
        wahl: [
          { s: 'sz-i-boss-s1-1', wer: 'lama', tut: 'filmt', was: 'schaf', bild: 'Ein Lama hält eine kleine Kamera und filmt ein Schaf, das in einem bunten Tipi sitzt.' },
          { s: 'sz-i-boss-s1-2', wer: 'lama', tut: 'malt', was: 'schaf', bild: 'Ein Lama hält einen Pinsel und malt das Schaf, das im selben bunten Tipi sitzt, auf ein Blatt.' },
          { s: 'sz-i-boss-s1-3', wer: 'lama', tut: 'filmt', was: 'rehkitz', bild: 'Ein Lama hält eine kleine Kamera und filmt ein Rehkitz, das im selben bunten Tipi sitzt.' }
        ]
      },
      {
        satz: 'Hi-hi! Das li-la Schaf fischt Ki-wis.',
        richtig: 'sz-i-boss-s3-1',
        wahl: [
          { s: 'sz-i-boss-s3-1', wer: 'lila schaf', tut: 'fischt', was: 'kiwis', bild: 'Ein lila Schaf steht am Ufer eines Sees und zieht mit einer Angel drei Kiwis aus dem Wasser.' },
          { s: 'sz-i-boss-s3-2', wer: 'weißes schaf', tut: 'fischt', was: 'kiwis', bild: 'Ein weißes Schaf steht am selben Ufer und zieht mit einer Angel drei Kiwis aus dem Wasser.' },
          { s: 'sz-i-boss-s3-3', wer: 'lila schaf', tut: 'fischt', was: 'fisch', bild: 'Ein lila Schaf steht am selben Ufer und zieht mit einer Angel einen Fisch aus dem Wasser.' }
        ]
      }
    ]
  },
  bewohner: [
    { s: 'bw-hirsch', wer: 'Hirsch', bild: 'Ein freundlicher Hirsch mit kleinem Geweih steht aufrecht und hält eine halbe Kiwi im Maul.' }
  ],
  schatz: [
    { art: 'raetsel', text: 'Wisch das T am Tisch, mal F hin. Was ist das?', loesung: 'Fisch' },
    { art: 'zunge', text: 'Hirsch fischt Fisch, Fisch fischt Hirsch!' },
    { art: 'witz', text: 'Das La-ma fischt, fischt, fischt – Ma-mas Bi-ki-ni!' },
    { art: 'witz', text: 'Sim-sa-la … hat-schi! Das Schaf ist li-la!' },
    { art: 'sprichwort', text: 'Pa-pas Pas-ta? Hin ist hin!' },
    { art: 'reim', text: 'Pi-rat am Tisch nascht Sa-lat mit Fisch.' },
    { art: 'satz', text: 'Das Al-pa-ka ist das Mi-ni-la-ma.' },
    { art: 'witz', text: 'Das La-ma ist fit. Pa-pa ist fast fit.' }
  ]
};
