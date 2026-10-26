window.LAUTBUCH_WELT = {
  zonen: [
    { id: 'vok', name: 'Vokale', laute: [
      { g: 'A', k: 'a', teil: 'a', frei: 'l1', meister: 'boss' },
      ...['I', 'O', 'U', 'E'].map(g => ({ g, k: g.toLowerCase(), teil: g.toLowerCase(), frei: 'l1', meister: 'boss' }))] },
    { id: 'kon', name: 'Konsonanten', laute: [
      ...['M', 'L', 'N', 'S', 'F', 'R', 'H'].map(g => ({ g, k: g.toLowerCase(), teil: 'p', frei: 'p1', meister: 'boss' })),
      ...['P', 'T', 'K', 'B', 'G', 'D'].map(g => ({ g, k: g.toLowerCase(), teil: 'p', frei: 'p2', meister: 'boss' })),
      ...['W', 'J', 'Z'].map(g => ({ g, k: g.toLowerCase(), teil: 'p', frei: 'p3', meister: 'boss' })),
      { g: 'V', k: 'v', teil: 'r2', frei: 'l1', meister: 'boss' }, { g: 'C', k: 'c', teil: 'r2', frei: 'l2', meister: 'boss' },
      { g: 'X', k: 'x', teil: 'r3', frei: 'l2', meister: 'boss' }, { g: 'Y', k: 'y', teil: 'r2', frei: 'l1', meister: 'boss' },
      { g: 'ẞ', k: 'ß', teil: 'r4', frei: 'l2', meister: 'boss' }] },
    { id: 'verb', name: 'Verbindungen', laute: [
      { g: 'SCH', k: 'sch', teil: 'p', frei: 'p3', meister: 'boss' },
      { g: 'CH', k: 'ch', teil: 'r1', frei: 'l2', meister: 'boss' }, { g: 'NG', k: 'ng', teil: 'r3', frei: 'l2', meister: 'boss' },
      { g: 'SP', k: 'sp', teil: 'r3', frei: 'l1', meister: 'boss' }, { g: 'ST', k: 'st', teil: 'r3', frei: 'l1', meister: 'boss' },
      { g: 'QU', k: 'qu', teil: 'r3', frei: 'l2', meister: 'boss' }] },
    { id: 'klang', name: 'Klänge', laute: [
      { g: 'EI', k: 'ei', teil: 'ei', frei: 'l1', meister: 'boss' }, { g: 'AU', k: 'au', teil: 'au', frei: 'l1', meister: 'boss' },
      { g: 'EU', k: 'eu', teil: 'eu', frei: 'l1', meister: 'boss' }, { g: 'ÄU', k: 'äu', teil: 'eu', frei: 'l2', meister: 'boss' },
      { g: 'IE', k: 'ie', teil: 'r1', frei: 'l1', meister: 'boss' }, { g: 'Ä', k: 'ä', teil: 'ae', frei: 'l1', meister: 'boss' },
      { g: 'Ö', k: 'ö', teil: 'oe', frei: 'l1', meister: 'boss' }, { g: 'Ü', k: 'ü', teil: 'ue', frei: 'l1', meister: 'boss' }] }
  ],
  stand(laut, licht) {
    const l = laut.teil && licht && licht[laut.teil];
    if (l && l[laut.meister]) return 'meister';
    const F = (window.LAUTBUCH_FOLGE || {}).FOLGE || [];
    const i = F.findIndex(f => f.teil === laut.teil);
    if (licht && i >= 0 && F.slice(i + 1).some(f => licht[f.teil] && licht[f.teil].boss)) return 'meister';
    if (!l || !l[laut.frei]) return 'nebel';
    return 'frei';
  }
};
