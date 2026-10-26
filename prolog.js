window.LAUTBUCH_TEILE = window.LAUTBUCH_TEILE || {};
window.LAUTBUCH_TEILE.p = {
  id: 'p',
  art: 'prolog',
  zeichen: 'Mm',
  kaertchen: 'Mm',
  festerFall: true,
  level: [
    {
      id: 'p1',
      hinweis: 'Laut, nicht Name: „mmm“, nicht „em“. M L N S F R H lassen sich dehnen – ruhig lang halten. Das S summt vorn wie eine Biene (Sofa) und zischt am Ende (Bus). Beides ist richtig; im Süden zischt es auch vorn.',
      probe: ['M m', 'L l', 'N n'],
      blaetter: [['tafel', 'Buchstaben'], ['gemischt', 'Gemischt']],
      tafel: [['M', 'm', 'L', 'l'], ['N', 'n', 'S', 's'], ['F', 'f', 'R', 'r'], ['H', 'h']],
      gemischt: [['l', 'S', 'h', 'M', 'r'], ['N', 'f', 'm', 'R', 's'], ['L', 'n', 'H', 'F', 'm'], ['s', 'M', 'r', 'l', 'N']],
      anlauf: ['M', 'm', 'L', 'l', 'N', 'n', 'S', 's', 'F', 'f', 'R', 'r', 'H', 'h'],
      pruefung: [['m', 'L', 's', 'h', 'N'], ['r', 'F', 'l', 'M', 'n'], ['H', 's', 'f', 'R', 'l']]
    },
    {
      id: 'p2',
      hinweis: 'P T K B G D sind kurz: nur antippen, kein „e“ dahinter („p“, nicht „pe“).',
      probe: ['P p', 'T t', 'K k'],
      blaetter: [['tafel', 'Buchstaben'], ['gemischt', 'Gemischt']],
      tafel: [['P', 'p', 'T', 't'], ['K', 'k', 'B', 'b'], ['G', 'g', 'D', 'd']],
      gemischt: [['t', 'B', 'k', 'G', 'p'], ['D', 'm', 'T', 'g', 'K'], ['p', 'L', 'd', 'K', 'b'], ['G', 't', 'P', 's', 'k']],
      anlauf: ['P', 'p', 'T', 't', 'K', 'k', 'B', 'b', 'G', 'g', 'D', 'd', 'M', 'l', 'S'],
      pruefung: [['k', 'B', 't', 'G', 'p'], ['D', 'm', 'K', 'g', 'T'], ['b', 'L', 'p', 'r', 'd']]
    },
    {
      id: 'p3',
      hinweis: 'SCH ist ein Laut aus drei Buchstaben. Z klingt wie „ts“, J wie am Anfang von „ja“.',
      probe: ['W w', 'J j', 'Z z'],
      blaetter: [['tafel', 'Buchstaben'], ['gemischt', 'Gemischt']],
      tafel: [['W', 'w', 'J', 'j'], ['Z', 'z', 'SCH', 'sch']],
      gemischt: [['w', 'Z', 'sch', 'J', 'f'], ['SCH', 'j', 'W', 's', 'z'], ['z', 'M', 'w', 'SCH', 'j'], ['J', 'sch', 'T', 'z', 'W']],
      anlauf: ['W', 'w', 'J', 'j', 'Z', 'z', 'SCH', 'sch', 'S', 'p', 'H'],
      pruefung: [['z', 'W', 'sch', 'J', 's'], ['SCH', 'j', 'Z', 'w', 'h'], ['w', 'S', 'z', 'sch', 'J']]
    },
    {
      id: 'p4',
      hinweis: 'Ähnliche Formen: b d p q, m w n h. Beim Zögern nicht vorsagen – auf den Bauch des Buchstabens zeigen.',
      probe: ['b d', 'p q', 'm n'],
      blaetter: [['tafel', 'Ähnliche'], ['gemischt', 'Gemischt']],
      tafel: [['b', 'd', 'p', 'q'], ['m', 'w', 'n', 'h'], ['f', 't', 'l', 'k'], ['M', 'W', 'N', 'Z']],
      gemischt: [['d', 'p', 'b', 'q', 'n'], ['w', 'h', 'm', 'b', 't'], ['q', 'n', 'f', 'd', 'm'], ['W', 'b', 'N', 'p', 'M']],
      anlauf: ['b', 'd', 'p', 'm', 'n', 'w', 'h', 'f', 't', 'l', 'k'],
      pruefung: [['d', 'b', 'p', 'n', 'm'], ['h', 'w', 'b', 't', 'd'], ['p', 'm', 'f', 'n', 'b']]
    }
  ],
  boss: {
    id: 'boss',
    hinweis: 'Alle Laute gemischt, groß und klein. Vorgezeigt ist kein Fehler.',
    anlauf: ['M', 'L', 'N', 'S', 'F', 'R', 'H', 'P', 'T', 'K', 'B', 'G', 'D', 'W', 'J', 'Z', 'SCH'],
    pruefung: [['m', 'T', 'sch', 'b', 'R'], ['d', 'W', 'f', 'K', 'n'], ['J', 'p', 'h', 'Z', 'l'], ['g', 'S', 'b', 'w', 'd']]
  }
};
