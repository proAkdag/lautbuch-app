window.LAUTBUCH_TEILE = window.LAUTBUCH_TEILE || {};
window.LAUTBUCH_TEILE.eu = {
  id: 'eu',
  art: 'klang',
  zeichen: 'Eu eu',
  abtippen: 'boss',
  blaetter: [['tafel', 'Silben'], ['ketten', 'Ketten'], ['woerter', 'Wörter']],
  level: [
    {
      id: 'l1',
      hinweis: 'EU klingt wie „oi“: Eu-le, Heu. Zwei Buchstaben, ein Klang, nicht E und U einzeln. Liest das Kind „e-u“: Eu-le einmal vorsprechen, dann selbst lesen lassen.',
      probe: ['neu', 'leu', 'heu'],
      tafel: [['EU', 'MEU', 'LEU', 'NEU', 'SEU'], ['REU', 'BEU', 'TEU', 'KEU', 'SCHEU'],
              ['MEUT', 'LEUN', 'NEUS', 'FEUL', 'HEUM'], ['KEUP', 'TEUS', 'BEUF', 'GEUN', 'SCHEUT']],
      ketten: [['MEU-LA', 'LEU-NO', 'NEU-SI', 'SEU-RA'],
               ['REU-TO', 'BEU-MA', 'TEU-LI', 'KEU-SO'],
               ['MEU-LO-NA', 'SCHEU-RI-MA', 'KEU-SA-LO'],
               ['TEU-NA-MI', 'BEU-RO-SA', 'LEU-MI-TA']],
      woerter: [['Eu-le', 'Heu', 'Beu-le'], ['heult', 'Scheu-ne', 'Beu-tel'],
                ['Feu-er', 'freut', 'Eu-ro'], ['Zeug', 'teu-er', 'Eu-ter']],
      anlauf: ['EU', 'MEU', 'LEU', 'NEU', 'SEU', 'REU', 'BEU', 'TEU', 'KEU', 'SCHEU', 'FREU', 'KREU'],
      z4: ['Eu-le', 'Heu'],
      z5: ['neun', 'Heu-hau-fen'],
      zMehr: ['Beu-le', 'freut', 'Flug-zeug', 'kreu-ze'],
      bilder: ['Eu-le', 'Heu', 'Scheu-ne', 'Beu-tel', 'heult'],
      z6: 'Eu-le Lu-na schläft im Beu-tel!',
      szene: { saetze: ['O-pa sucht sei-nen Hut im Heu.'],
               heft: 'Wo schläft Luna? Was sucht Opa? Wo könnte sein Hut sein?' },
      frage: 'Wo schläft Eule Luna, und was sucht Opa? Wo ist sein Hut wohl?'
    },
    {
      id: 'l2',
      hinweis: 'ÄU klingt genau wie EU: Mäu-se, Bäu-me. Es kommt oft von einem Wort mit AU: eine Maus, viele Mäuse. Das Kind darf das alte Wort dazu sagen.',
      probe: ['mäu', 'bäu', 'träu'],
      tafel: [['ÄU', 'MÄU', 'BÄU', 'LÄU', 'HÄU'], ['TRÄU', 'ZÄU', 'RÄU', 'SÄU', 'KÄU'],
              ['FREU', 'TREU', 'DREU', 'SCHLEU', 'BREU'], ['RÄUM', 'FREUND', 'TREUT', 'DREUS', 'SCHLEUF']],
      ketten: [['MÄU-LA', 'BÄU-NO', 'LÄU-MI', 'HÄU-SO'],
               ['TRÄU-NI', 'ZÄU-MO', 'RÄU-LA', 'KÄU-SI'],
               ['FREU-MA-LO', 'TREU-NI-SA', 'SCHLEU-MO-RA'],
               ['DREU-LO-MA', 'MÄU-SA-RI', 'BÄU-NI-TO']],
      woerter: [['Mäu-se', 'Bäu-me', 'läuft'], ['Eu-len', 'räumt', 'Ge-räusch'],
                ['Häu-ser', 'träumt', 'Zäu-ne'], ['Räu-ber', 'häu-fig', 'Säu-le']],
      anlauf: ['ÄU', 'MÄU', 'BÄU', 'LÄU', 'HÄU', 'TRÄU', 'ZÄU', 'RÄU', 'KÄU', 'FREU', 'TREU', 'SCHLEU'],
      z4: ['Mäu-se', 'Bäu-me'],
      z5: ['heu-te', 'Freu-de'],
      zMehr: ['läuft', 'träumt', 'Ge-bäu-de', 'Läu-fer'],
      bilder: ['Mäu-se', 'Bäu-me', 'Eu-len', 'läuft', 'räumt'],
      z6: 'Räumt das Schaf? Nein, es träumt!',
      frage: 'Räumt das Schaf auf? Was macht es wirklich?',
      szene: { saetze: ['Eu-le Lu-na räumt den Beu-tel aus.', 'Im Beu-tel: O-pas Hut, Le-os Wür-fel, ein Buch.'],
               heft: 'Was räumt Eule Luna aus? Was ist alles im Beutel? Wem gehört der Würfel, und wem gehört wohl die Flöte?' },
      sinn: {
        satz: 'Eu-le Lu-na räumt den Beu-tel aus.',
        richtig: 'sz-eu-l2-1',
        wahl: [
          { s: 'sz-eu-l2-1', wer: 'eule', tut: 'räumt aus', was: 'beutel', bild: 'Eine Eule sitzt in einer Scheune im Heu und holt aus einem offenen Stoffbeutel einen Hut, einen Würfel und eine Flöte.' },
          { s: 'sz-eu-l2-2', wer: 'maus', tut: 'räumt aus', was: 'beutel', bild: 'Eine kleine Maus sitzt in einer Scheune im Heu und holt aus einem offenen Stoffbeutel einen Hut, einen Würfel und eine Flöte.' },
          { s: 'sz-eu-l2-3', wer: 'eule', tut: 'schläft', was: 'beutel', bild: 'Eine Eule sitzt in einer Scheune im Heu und schläft mit geschlossenen Augen neben einem zugebundenen Stoffbeutel.' }
        ]
      },
      sinnMehr: [
        {
          satz: 'Räumt das Schaf? Nein, es träumt!',
          richtig: 'sz-eu-l2-s1-1',
          wahl: [
            { s: 'sz-eu-l2-s1-1', wer: 'schaf', tut: 'träumt', was: '', bild: 'Ein Schaf liegt in der Scheune im Heu und träumt mit geschlossenen Augen, über seinem Kopf schwebt eine Traumwolke, ringsum liegen Sachen durcheinander.' },
            { s: 'sz-eu-l2-s1-2', wer: 'eule', tut: 'träumt', was: '', bild: 'Eine Eule liegt in derselben Scheune im Heu und träumt mit geschlossenen Augen, über ihrem Kopf schwebt eine Traumwolke, ringsum liegen Sachen durcheinander.' },
            { s: 'sz-eu-l2-s1-3', wer: 'schaf', tut: 'räumt', was: '', bild: 'Ein Schaf steht in derselben Scheune und räumt mit einem Besen die Sachen zusammen, die ringsum durcheinander liegen.' }
          ]
        },
        {
          satz: 'Im Beu-tel: O-pas Hut, Le-os Wür-fel, ein Buch.',
          richtig: 'sz-eu-l2-s3-1',
          wahl: [
            { s: 'sz-eu-l2-s3-1', wer: 'beutel', tut: 'liegt', was: 'hut + würfel + buch', bild: 'In der Scheune liegt Lunas offener Stoffbeutel im Heu, darin sieht man Opas grünen Filzhut mit Feder, einen großen Würfel und ein Buch, auf dessen Umschlag ein Kuchen mit Beeren gemalt ist.' },
            { s: 'sz-eu-l2-s3-2', wer: 'korb', tut: 'liegt', was: 'hut + würfel + buch', bild: 'In derselben Scheune steht ein offener Weidenkorb im Heu, darin sieht man denselben grünen Filzhut, den Würfel und das Buch mit dem Kuchen auf dem Umschlag.' },
            { s: 'sz-eu-l2-s3-3', wer: 'beutel', tut: 'liegt', was: 'hut + würfel + löffel', bild: 'In derselben Scheune liegt Lunas offener Stoffbeutel im Heu, darin sieht man denselben grünen Filzhut, den Würfel und einen Löffel.' }
          ]
        }
      ]
    }
  ],
  boss: {
    id: 'boss',
    hinweis: 'EU und ÄU gemischt, alle Klänge laufen mit. Das ist der letzte Klang vor den Regel-Toren: ruhig loben, was schon sicher sitzt. Zwei Wörter kamen im Buch noch nie vor (Leute, Kreuz): hier wird wirklich erlesen, nicht wiedererkannt.',
    anlauf: ['EU', 'MEU', 'LEU', 'NEU', 'SEU', 'REU', 'BEU', 'TEU', 'KEU', 'SCHEU', 'ÄU', 'MÄU', 'BÄU', 'LÄU', 'TRÄU',
             'ZÄU', 'RÄU', 'FREU', 'TREU', 'SCHLEU'],
    z4: ['Beu-tel', 'Ge-räusch', 'Leu-te', 'Kreuz'],
    z5: ['Bäu-e-rin', 'Freun-de'],
    zMehr: ['Eu-le', 'Mäu-se', 'neu-lich', 'neu-gie-rig', 'Keu-le', 'Neu-ig-keit'],
    z6: 'Kü-he, Mäu-se, Schwei-ne ü-ben für das Fest.',
    szene: { saetze: ['Eu-le Lu-na läu-tet: Bim, bam, bum!', 'Das Schaf? Es träumt fest im Heu-hau-fen.'],
             heft: 'Wofür üben alle? Wer läutet die Glocke? Wo ist das Schaf, und was macht es?' },
    fremd: ['Leu-te', 'Kreuz'],
    frage: 'Wofür üben alle, wer läutet, und warum merkt das Schaf nichts davon?',
    sinn: {
      satz: 'Eu-le Lu-na läu-tet: Bim, bam, bum!',
      richtig: 'sz-eu-boss-1',
      wahl: [
        { s: 'sz-eu-boss-1', wer: 'eule', tut: 'läutet', was: 'glocke', bild: 'Eine Eule sitzt im Scheunentor und zieht an einem Seil, oben schwingt eine große Glocke.' },
        { s: 'sz-eu-boss-2', wer: 'eule', tut: 'heult', was: 'glocke', bild: 'Eine Eule sitzt im Scheunentor unter einer stillen großen Glocke, hebt den Kopf und ruft mit weit offenem Schnabel.' },
        { s: 'sz-eu-boss-3', wer: 'schaf', tut: 'läutet', was: 'glocke', bild: 'Ein Schaf steht im Scheunentor und zieht an einem Seil, oben schwingt eine große Glocke.' }
      ]
    },
    sinnMehr: [
      {
        satz: 'Kü-he, Mäu-se, Schwei-ne ü-ben für das Fest.',
        richtig: 'sz-eu-boss-s1-1',
        wahl: [
          { s: 'sz-eu-boss-s1-1', wer: 'kühe + mäuse + schweine', tut: 'üben', was: '', bild: 'Im Scheunentor feiern zwei Kühe, drei Mäuse und zwei Schweine unter Girlanden und Luftballons und tanzen fröhlich.' },
          { s: 'sz-eu-boss-s1-2', wer: 'kühe + mäuse + schafe', tut: 'üben', was: '', bild: 'Im selben Scheunentor feiern zwei Kühe, drei Mäuse und zwei Schafe unter Girlanden und Luftballons und tanzen fröhlich.' },
          { s: 'sz-eu-boss-s1-3', wer: 'kühe + mäuse + schweine', tut: 'schlafen', was: '', bild: 'Im selben Scheunentor liegen zwei Kühe, drei Mäuse und zwei Schweine unter den Girlanden und schlafen.' }
        ]
      },
      {
        satz: 'Das Schaf? Es träumt fest im Heu-hau-fen.',
        richtig: 'sz-eu-boss-s3-1',
        wahl: [
          { s: 'sz-eu-boss-s3-1', wer: 'schaf', tut: 'träumt', was: 'heuhaufen', bild: 'In der Scheune liegt ein Schaf tief in einem Heuhaufen und träumt mit geschlossenen Augen, über ihm schwebt eine kleine Traumwolke.' },
          { s: 'sz-eu-boss-s3-2', wer: 'kuh', tut: 'träumt', was: 'heuhaufen', bild: 'In derselben Scheune liegt eine Kuh tief im Heuhaufen und träumt mit geschlossenen Augen, über ihr schwebt eine kleine Traumwolke.' },
          { s: 'sz-eu-boss-s3-3', wer: 'schaf', tut: 'träumt', was: 'bank', bild: 'In derselben Scheune liegt ein Schaf auf einer Holzbank und träumt mit geschlossenen Augen, über ihm schwebt eine kleine Traumwolke.' }
        ]
      }
    ]
  },
  bewohner: [
    { s: 'bw-eule-luna', wer: 'Eule Luna', bild: 'Eine freundliche braune Eule mit großen runden Augen sitzt aufrecht und hält einen kleinen Stoffbeutel in den Krallen.' }
  ],
  schatz: [
    { art: 'witz', text: 'Raus aus den Fe-dern, Lu-na! Nö, Eu-len schla-fen am Mor-gen.' },
    { art: 'satz', text: 'Eu-len dre-hen den Kopf fast ganz um.' },
    { art: 'raetsel', text: 'Was ist mor-gen schon ges-tern?', loesung: 'Heu-te' },
    { art: 'zunge', text: 'Neun neu-e Eu-len heu-len heu-te im Heu.' },
    { art: 'witz', text: 'Eu-le Lu-na fin-det ei-ne Na-del im Heu-hau-fen. Kaum zu glau-ben!' },
    { art: 'raetsel', text: 'Bums! Was hast du nun am Kopf?', loesung: 'Ei-ne Beu-le' },
    { art: 'reim', text: 'Eu-len träu-men in den Bäu-men, Mäu-se räu-men in den Scheu-nen.' },
    { art: 'witz', text: 'Lu-nas Beu-tel: ein Hut, ein Wür-fel, ei-ne Flö-te, das Schaf!' },
    { art: 'satz', text: 'Eu-le Lu-na sagt: Lies und kreu-ze an!' }
  ]
};
