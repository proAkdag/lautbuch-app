window.LAUTBUCH_TEILE = window.LAUTBUCH_TEILE || {};
window.LAUTBUCH_TEILE.ziel = {
  id: 'ziel',
  art: 'ziel',
  zeichen: '',
  abtippen: 'boss',
  blaetter: [['tafel', 'Kurz'], ['ketten', 'Lang'], ['woerter', 'Wörter']],
  level: [
    {
      id: 'l1',
      hinweis: 'Jetzt ist alles da. Neu, aber leicht: Zwei gleiche Vokale klingen wie einer, nur lang (Meer, Boot). Kurze Wörter am Stück lesen, lange in Silben. Die Geschichte darf das Kind erst still anschauen und dann laut lesen – Sie lesen einfach mit dem Finger mit.',
      probe: ['meer', 'schiff', 'licht'],
      tafel: [['Meer', 'Boot', 'Wind', 'Sand'], ['Nacht', 'Licht', 'Turm', 'Haus'],
              ['Stern', 'Fisch', 'Mast', 'Seil'], ['Maus', 'Teil', 'Wand', 'Sturm', 'Kind']],
      ketten: [['ZAL-PUK', 'MOL-SEN', 'FRIM-TA', 'KNE-WUS'],
               ['PLU-TAM', 'TRAS-KOP', 'KLU-NAS', 'ZEM-FIL'],
               ['MA-TUS-BEL', 'FRO-LI-PAN', 'ZU-KRE-NIS'],
               ['BRIN-DO-FAL', 'SPE-TA-MUK', 'TIM-RO-SAL']],
      woerter: [['Schiff', 'Mö-we', 'leuch-tet'], ['Trep-pe', 'Ge-schenk', 'winkt'],
                ['Se-gel', 'dun-kel', 'fei-ert'], ['Tor-te', 'Bal-lon', 'hell'],
                ['Ha-fen', 'Fens-ter', 'Ker-ze'], ['In-sel', 'Lam-pe', 'Sand-bur-gen'], ['Schatz-kis-te', 'Ster-nen-licht'], ['Fi-scher-boot', 'Wel-len-tanz']],
      anlauf: ['MEER', 'BOOT', 'WIND', 'SAND', 'LICHT', 'STEG', 'TURM', 'STERN', 'FISCH', 'MAST', 'SEIL', 'HAUS'],
      z4: ['Schiff', 'Mö-we'],
      z5: ['Fest-tisch', 'Leucht-turm'],
      zMehr: ['leuch-tet', 'dun-kel', 'Gir-lan-de', 'Herbst'],
      bilder: ['Schiff', 'Mö-we', 'Trep-pe', 'leuch-tet', 'winkt'],
      z6: 'La-ma und Schaf se-geln durch die Nacht.',
      frage: 'Wer zündet das Licht an, für wen ist das Fest, und was liegt in der Kiste?',
      szene: { saetze: ['Der Wind pfeift. Ein Del-fin schwimmt mit.',
                        'Das Schaf flüs-tert: Wo ist das Fest?',
                        'Sim-sa-la-bim! Der Zau-be-rer zün-det das Licht.',
                        'Le-o, E-sel, U-hu, Hund und Elch win-ken!',
                        'Ü-ber-ra-schung! Das Fest ist für das Schaf!',
                        'Die Zie-ge öff-net die Kis-te.',
                        'Da-rin liegt ein Buch mit ro-ter Schlei-fe.',
                        'Das Schaf fragt: Kann man das es-sen?',
                        'Das La-ma lacht: Das kann man le-sen!'],
               heft: 'Wer zündet das Licht an? Wer winkt? Für wen ist das Fest? Was liegt in der Kiste? Was will das Schaf damit machen – und was sagt das Lama?' },
      sinn: {
        satz: 'Die Zie-ge öff-net die Kis-te.',
        richtig: 'sz-ziel-l1-1',
        wahl: [
          { s: 'sz-ziel-l1-1', wer: 'ziege', tut: 'öffnet', was: 'kiste', bild: 'Oben im runden Leuchtturmzimmer am Festtisch öffnet die weiße Ziege mit kleinem Kinnbart mit beiden Vorderhufen den Deckel ihrer Holzkiste.' },
          { s: 'sz-ziel-l1-2', wer: 'uhu', tut: 'öffnet', was: 'kiste', bild: 'Oben im runden Leuchtturmzimmer öffnet ein Uhu mit beiden Flügeln den Deckel einer Holzkiste.' },
          { s: 'sz-ziel-l1-3', wer: 'ziege', tut: 'öffnet', was: 'fenster', bild: 'Oben im runden Leuchtturmzimmer am Festtisch öffnet die weiße Ziege mit kleinem Kinnbart mit beiden Vorderhufen ein Fenster.' }
        ]
      },
      sinnMehr: [
        {
          satz: 'La-ma und Schaf se-geln durch die Nacht.',
          richtig: 'sz-ziel-l1-s2-1',
          wahl: [
            { s: 'sz-ziel-l1-s2-1', wer: 'lama + schaf', tut: 'segeln', was: 'nacht', bild: 'Ein Lama und ein Schaf sitzen in einem kleinen Segelboot und segeln über das Meer, am dunklen Himmel stehen Mond und Sterne.' },
            { s: 'sz-ziel-l1-s2-2', wer: 'lama + hund', tut: 'segeln', was: 'nacht', bild: 'Ein Lama und ein Hund sitzen in demselben Segelboot und segeln über das Meer, am dunklen Himmel stehen Mond und Sterne.' },
            { s: 'sz-ziel-l1-s2-3', wer: 'lama + schaf', tut: 'segeln', was: 'tag', bild: 'Ein Lama und ein Schaf sitzen in demselben Segelboot und segeln über das Meer, am hellen Himmel scheint die Sonne.' }
          ]
        },
        {
          satz: 'Der Wind pfeift. Ein Del-fin schwimmt mit.',
          richtig: 'sz-ziel-l1-s3-1',
          wahl: [
            { s: 'sz-ziel-l1-s3-1', wer: 'delfin', tut: 'schwimmt mit', was: 'wind', bild: 'Neben dem Segelboot mit Lama und Schaf springt in der Nacht ein Delfin aus den Wellen, der Wind bläht das Segel und zerzaust die Wolle.' },
            { s: 'sz-ziel-l1-s3-2', wer: 'fisch', tut: 'schwimmt mit', was: 'wind', bild: 'Neben demselben Segelboot springt in der Nacht ein großer Fisch aus den Wellen, der Wind bläht das Segel und zerzaust die Wolle.' },
            { s: 'sz-ziel-l1-s3-3', wer: 'delfin', tut: 'schwimmt mit', was: 'windstill', bild: 'Neben demselben Segelboot springt in der Nacht ein Delfin aus dem spiegelglatten Wasser, das Segel hängt schlaff herab.' }
          ]
        },
        {
          satz: 'Das Schaf flüs-tert: Wo ist das Fest?',
          richtig: 'sz-ziel-l1-s4-1',
          wahl: [
            { s: 'sz-ziel-l1-s4-1', wer: 'schaf', tut: 'flüstert', was: '', bild: 'Im Segelboot in der Nacht beugt sich das Schaf zum Lama und flüstert ihm etwas ins Ohr, beide schauen fragend in die Dunkelheit.' },
            { s: 'sz-ziel-l1-s4-2', wer: 'lama', tut: 'flüstert', was: '', bild: 'Im selben Segelboot in der Nacht beugt sich das Lama zum Schaf und flüstert ihm etwas ins Ohr, beide schauen fragend in die Dunkelheit.' },
            { s: 'sz-ziel-l1-s4-3', wer: 'schaf', tut: 'schläft', was: '', bild: 'Im selben Segelboot in der Nacht liegt das Schaf zusammengerollt und schläft, das Lama schaut in die Dunkelheit.' }
          ]
        },
        {
          satz: 'Sim-sa-la-bim! Der Zau-be-rer zün-det das Licht.',
          richtig: 'sz-ziel-l1-s11-1',
          wahl: [
            { s: 'sz-ziel-l1-s11-1', wer: 'zauberer', tut: 'zündet licht', was: '', bild: 'Oben auf der Galerie des Leuchtturms schwingt der Zauberer mit langem Bart und schwarzem Zylinderhut seinen Zauberstab, und die große Lampe flammt hell auf; der Lichtstrahl fällt über das nächtliche Meer auf das kleine Segelboot.' },
            { s: 'sz-ziel-l1-s11-2', wer: 'lama', tut: 'zündet licht', was: '', bild: 'Oben auf der Galerie desselben Leuchtturms schwingt das Lama mit der Strumpfhose auf dem Kopf einen Zauberstab, und die große Lampe flammt hell auf; der Lichtstrahl fällt auf das kleine Segelboot.' },
            { s: 'sz-ziel-l1-s11-3', wer: 'zauberer', tut: 'zaubert ravioli', was: '', bild: 'Oben auf der Galerie desselben Leuchtturms schwingt der Zauberer mit Zylinderhut seinen Zauberstab, doch die Lampe bleibt dunkel, und aus dem Stab regnet es Ravioli ins Meer.' }
          ]
        },
        {
          satz: 'Le-o, E-sel, U-hu, Hund und Elch win-ken!',
          richtig: 'sz-ziel-l1-s6-1',
          wahl: [
            { s: 'sz-ziel-l1-s6-1', wer: 'leo + esel + uhu + hund + elch', tut: 'winken', was: '', bild: 'Am Fuß des leuchtenden Leuchtturms stehen ein Löwe, ein Esel, ein Uhu, ein Hund und ein Elch auf dem Steg und winken dem Segelboot zu.' },
            { s: 'sz-ziel-l1-s6-2', wer: 'leo + esel + uhu + hund + kuh', tut: 'winken', was: '', bild: 'Am Fuß desselben Leuchtturms stehen ein Löwe, ein Esel, ein Uhu, ein Hund und eine Kuh auf dem Steg und winken dem Segelboot zu.' },
            { s: 'sz-ziel-l1-s6-3', wer: 'leo + esel + uhu + hund + elch', tut: 'schlafen', was: '', bild: 'Am Fuß desselben Leuchtturms sitzen ein Löwe, ein Esel, ein Uhu, ein Hund und ein Elch auf dem Steg und schlafen.' }
          ]
        },
        {
          satz: 'Ü-ber-ra-schung! Das Fest ist für das Schaf!',
          richtig: 'sz-ziel-l1-s12-1',
          wahl: [
            { s: 'sz-ziel-l1-s12-1', wer: 'alle', tut: 'jubeln', was: 'schaf', bild: 'Auf dem Steg vor dem leuchtenden Leuchtturm hängen Girlanden über dem Festtisch der Maus; alle jubeln dem Schaf zu, das mit offenem Mund aus dem Boot steigt: vorn das Kind in Latzhose mit ausgebreiteten Armen, der Hund mit Clownsnase, Papa, Mama außer Atem, Oma, Opa, die Kühe mit gebügelten Hüten; auf dem Tisch steht ein angenaschter Kuchen.' },
            { s: 'sz-ziel-l1-s12-2', wer: 'alle', tut: 'jubeln', was: 'lama', bild: 'Auf demselben Steg unter denselben Girlanden jubeln alle dem Lama zu, das mit offenem Mund aus dem Boot steigt; das Schaf steht unbeachtet daneben.' },
            { s: 'sz-ziel-l1-s12-3', wer: 'alle', tut: 'stehen herum', was: 'schaf', bild: 'Auf demselben Steg ohne Girlanden und ohne Festtisch stehen alle stumm herum, das Schaf steigt aus dem Boot und schaut sich um.' }
          ]
        },
        {
          satz: 'Da-rin liegt ein Buch mit ro-ter Schlei-fe.',
          richtig: 'sz-ziel-l1-s8-1',
          wahl: [
            { s: 'sz-ziel-l1-s8-1', wer: 'kiste', tut: 'liegt', was: 'buch mit roter schleife', bild: 'Oben im runden Leuchtturmzimmer steht die geöffnete Holzkiste der Ziege, darin liegt ein großes Buch, um das die rote Schleife des Schweins gebunden ist.' },
            { s: 'sz-ziel-l1-s8-2', wer: 'kiste', tut: 'liegt', was: 'buch mit blauer schleife', bild: 'Oben im selben Leuchtturmzimmer steht dieselbe geöffnete Holzkiste, darin liegt dasselbe große Buch mit einer blauen Schleife.' },
            { s: 'sz-ziel-l1-s8-3', wer: 'kiste', tut: 'liegt', was: 'ball mit roter schleife', bild: 'Oben im selben Leuchtturmzimmer steht dieselbe geöffnete Holzkiste, darin liegt ein bunter Ball mit der roten Schleife.' }
          ]
        },
        {
          satz: 'Das Schaf fragt: Kann man das es-sen?',
          richtig: 'sz-ziel-l1-s9-1',
          wahl: [
            { s: 'sz-ziel-l1-s9-1', wer: 'schaf', tut: 'fragt', was: 'buch', bild: 'Oben im Leuchtturmzimmer schnuppert das Schaf neugierig an dem großen Buch aus der Kiste und schaut das Lama fragend an.' },
            { s: 'sz-ziel-l1-s9-2', wer: 'uhu', tut: 'fragt', was: 'buch', bild: 'Oben im selben Leuchtturmzimmer schnuppert der Uhu neugierig an dem großen Buch aus der Kiste und schaut das Lama fragend an.' },
            { s: 'sz-ziel-l1-s9-3', wer: 'schaf', tut: 'liest', was: 'buch', bild: 'Oben im selben Leuchtturmzimmer sitzt das Schaf vor dem großen Buch aus der Kiste und liest darin.' }
          ]
        },
        {
          satz: 'Das La-ma lacht: Das kann man le-sen!',
          richtig: 'sz-ziel-l1-s10-1',
          wahl: [
            { s: 'sz-ziel-l1-s10-1', wer: 'lama', tut: 'lacht', was: 'buch', bild: 'Oben im Leuchtturmzimmer hält das Lama das große Buch aufgeschlagen hoch und lacht herzlich, das Schaf schaut staunend zu.' },
            { s: 'sz-ziel-l1-s10-2', wer: 'schaf', tut: 'lacht', was: 'buch', bild: 'Oben im selben Leuchtturmzimmer hält das Schaf das große Buch aufgeschlagen hoch und lacht herzlich, das Lama schaut staunend zu.' },
            { s: 'sz-ziel-l1-s10-3', wer: 'lama', tut: 'gähnt', was: 'buch', bild: 'Oben im selben Leuchtturmzimmer hält das Lama das große Buch aufgeschlagen hoch und gähnt müde, das Schaf schaut zu.' }
          ]
        }
      ]
    }
  ],
  boss: {
    id: 'boss',
    hinweis: 'Das letzte Lesen: alles aus dem ganzen Buch gemischt. Heute zählt, dass das Kind liest – vorgezeigt ist kein Fehler. Danach leuchtet der Leuchtturm, und es lohnt sich, das gemeinsam zu feiern. Zwei Wörter kamen im Buch noch nie vor (Abenteuer, Bücherei): hier wird wirklich erlesen, nicht wiedererkannt.',
    anlauf: ['MA', 'LI', 'NO', 'SU', 'WE', 'MÄ', 'LÖ', 'RÜ', 'MEI', 'LAU', 'NEU', 'ACH', 'ICH', 'STA', 'SPI', 'QUA', 'ANG', 'PFO', 'ALL', 'IE'],
    z4: ['leuch-tet', 'Trep-pe', 'A-ben-teu-er', 'Bü-che-rei'],
    z5: ['Freund-schaft', 'Ge-schafft'],
    zMehr: ['Schiff', 'dun-kel', 'Le-se-rat-te', 'Bil-der-buch', 'Ü-ber-ra-schung', 'Ge-schich-te'],
    z6: 'Das La-ma schlägt das Buch auf.',
    szene: { saetze: ['Da-rin hat das La-ma die Rei-se ge-malt.', 'Das Schaf ruft: Da bin ja ich!',
                      'Ge-schafft, du hast al-les sel-ber ge-le-sen!', 'Das Schaf flüs-tert: Und jetzt? Jetzt le-sen wir wei-ter!'],
             heft: 'Was ist in dem Buch? Wen findet das Schaf darin? Wer hat alles selber gelesen? Was machen Lama und Schaf jetzt?' },
    fremd: ['A-ben-teu-er', 'Bü-che-rei'],
    frage: 'Was ist in dem Geschenk, wen findet das Schaf darin, und wer hat das alles gelesen?',
    sinn: {
      satz: 'Ge-schafft, du hast al-les sel-ber ge-le-sen!',
      richtig: 'sz-ziel-boss-1',
      wahl: [
        { s: 'sz-ziel-boss-1', wer: 'kind', tut: 'liest', was: 'buch', bild: 'Oben im Leuchtturm sitzt das Kind mit Latzhose und liest stolz in einem großen aufgeschlagenen Buch, durchs Fenster scheint das Licht.' },
        { s: 'sz-ziel-boss-2', wer: 'lama', tut: 'liest', was: 'buch', bild: 'Oben im Leuchtturm sitzt ein Lama und liest stolz in einem großen aufgeschlagenen Buch, durchs Fenster scheint das Licht.' },
        { s: 'sz-ziel-boss-3', wer: 'kind', tut: 'malt', was: 'buch', bild: 'Oben im Leuchtturm sitzt das Kind mit Latzhose und malt mit Buntstiften in ein großes aufgeschlagenes Buch, durchs Fenster scheint das Licht.' }
      ]
    },
    sinnMehr: [
      {
        satz: 'Das La-ma schlägt das Buch auf.',
        richtig: 'sz-ziel-boss-s1-1',
        wahl: [
          { s: 'sz-ziel-boss-s1-1', wer: 'lama', tut: 'schlägt auf', was: 'buch', bild: 'Oben im Leuchtturm schlägt ein Lama ein großes Buch auf, durchs Fenster scheint das Licht.' },
          { s: 'sz-ziel-boss-s1-2', wer: 'kind', tut: 'schlägt auf', was: 'buch', bild: 'Oben im selben Leuchtturm schlägt das Kind mit Latzhose dasselbe große Buch auf, durchs Fenster scheint das Licht.' },
          { s: 'sz-ziel-boss-s1-3', wer: 'lama', tut: 'klappt zu', was: 'buch', bild: 'Oben im selben Leuchtturm klappt ein Lama dasselbe große Buch zu, durchs Fenster scheint das Licht.' }
        ]
      },
      {
        satz: 'Da-rin hat das La-ma die Rei-se ge-malt.',
        richtig: 'sz-ziel-boss-s4-1',
        wahl: [
          { s: 'sz-ziel-boss-s4-1', wer: 'buch', tut: 'zeigt', was: 'bilder der reise', bild: 'Nahaufnahme des aufgeschlagenen Geschenkbuchs im Leuchtturm: gemalte Bilder der Reise, das Schaf schlafend im Käse, Puma mit Opas Hut, das Kajak mit Wäschesegel; daneben hält das Lama stolz einen Pinsel.' },
          { s: 'sz-ziel-boss-s4-2', wer: 'buch', tut: 'zeigt', was: 'leere seiten', bild: 'Nahaufnahme desselben aufgeschlagenen Buchs im Leuchtturm: die Seiten sind ganz leer und weiß; daneben hält das Lama einen Pinsel.' },
          { s: 'sz-ziel-boss-s4-3', wer: 'buch', tut: 'zeigt', was: 'blumen', bild: 'Nahaufnahme desselben aufgeschlagenen Buchs im Leuchtturm: auf den Seiten sind nur gepresste Blumen; daneben hält das Lama einen Pinsel.' }
        ]
      },
      {
        satz: 'Das Schaf ruft: Da bin ja ich!',
        richtig: 'sz-ziel-boss-s5-1',
        wahl: [
          { s: 'sz-ziel-boss-s5-1', wer: 'schaf', tut: 'zeigt auf sich', was: '', bild: 'Oben im Leuchtturm zeigt das Schaf mit dem Huf auf ein Bild im Geschenkbuch, auf dem es selbst im Käse schläft, und strahlt über das ganze Gesicht; das Kind in Latzhose lacht mit.' },
          { s: 'sz-ziel-boss-s5-2', wer: 'lama', tut: 'zeigt auf sich', was: '', bild: 'Oben im selben Leuchtturm zeigt das Lama mit dem Huf auf ein Bild im Geschenkbuch, auf dem es selbst mit der Strumpfhose als Hut zu sehen ist, und strahlt; das Kind lacht mit.' },
          { s: 'sz-ziel-boss-s5-3', wer: 'schaf', tut: 'schläft', was: '', bild: 'Oben im selben Leuchtturm ist das Schaf mit dem Kopf auf dem aufgeschlagenen Geschenkbuch eingeschlafen; das Kind in Latzhose deckt es zu.' }
        ]
      },
      {
        satz: 'Das Schaf flüs-tert: Und jetzt? Jetzt le-sen wir wei-ter!',
        richtig: 'sz-ziel-boss-s3-1',
        wahl: [
          { s: 'sz-ziel-boss-s3-1', wer: 'schaf', tut: 'flüstert', was: '', bild: 'Oben im Leuchtturm flüstert das Schaf dem Kind mit Latzhose etwas ins Ohr, und beide beugen sich zusammen mit dem Lama wieder über das große Buch.' },
          { s: 'sz-ziel-boss-s3-2', wer: 'hund', tut: 'flüstert', was: '', bild: 'Oben im selben Leuchtturm flüstert ein Hund dem Kind mit Latzhose etwas ins Ohr, und beide beugen sich zusammen mit dem Lama wieder über das große Buch.' },
          { s: 'sz-ziel-boss-s3-3', wer: 'schaf', tut: 'schläft', was: '', bild: 'Oben im selben Leuchtturm schläft das Schaf zusammengerollt neben dem Kind mit Latzhose, das mit dem Lama über dem großen Buch sitzt.' }
        ]
      }
    ]
  },
  bewohner: [
    { s: 'bw-delfin', wer: 'Delfin', bild: 'Ein freundlicher grauer Delfin springt in einem kleinen Bogen aus einer Welle und lächelt.' }
  ],
  schatz: [
    { art: 'sprichwort', text: 'En-de gut, al-les gut.' },
    { art: 'witz', text: 'Ka-pi-tän La-ma: Land in Sicht! Das Schaf: Ku-chen in Sicht?' },
    { art: 'witz', text: 'Der Ku-chen ist an-ge-nascht. Macht nichts – er ist ja für das Schaf!' },
    { art: 'satz', text: 'O-pa hat sei-nen Hut wie-der. Lu-na hat-te ihn im Beu-tel.' },
    { art: 'satz', text: 'Ka-la legt den Kä-se in die Mit-te. Für al-le!' },
    { art: 'satz', text: 'Pa-pa kocht Pas-ta. So viel, dass so-gar das Schaf satt wird.' },
    { art: 'witz', text: 'Ma-ma kommt an, ganz au-ßer A-tem: Bin ich zu spät?' },
    { art: 'satz', text: 'Das La-ma singt ganz falsch. Und al-le sin-gen mit!' },
    { art: 'satz', text: 'Herbst, Win-ter, Früh-ling, Som-mer: Wer le-sen will, sieht im-mer mehr.' }
  ]
};
