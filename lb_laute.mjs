import { ruhig } from './lb_bewegung.mjs';
import { knopf } from './lb_knopf.mjs';
import { lies, schreib, licht } from './lb_speicher.mjs';

export function lauteModul(_A) {
  const { leer, schieneSetzen, titelZeile, el, faerbe, WELT, WEG, TEILE, main, oben, sanft } = _A;
  const oeffne = (...x) => _A.oeffne(...x);
  const WELT_KEY = 'lautbuch.welt.gesehen.v1';
  const ARTEN_UML = { 'Ä': 'A', 'Ö': 'O', 'Ü': 'U' };
  const lautGestalt = (zone, l) => {
    if (zone.id === 'vok') return { art: l.g, krone: true };
    if (ARTEN_UML[l.g]) return { art: ARTEN_UML[l.g], edel: true };
    if (zone.id === 'klang' && l.g.length === 2) return { art: (ARTEN_UML[l.g[0]] || l.g[0]) + '|' + l.g[1], bundSk: .66, bundDx: 19, schrift: l.g };
    if (l.teil && /^r\d$/.test(l.teil)) return { art: 'tor' };
    return { art: { p1: 'weich', p2: 'hart', p3: 'zisch' }[l.frei] || 'rund' };
  };
  function sammlung() {
    leer();
    document.body.classList.add('auf-welt', 'ohne-unten');
    oben.append(titelZeile('Meine Laute'));
    schieneSetzen('laute');
    const gesehen = new Set(lies(WELT_KEY, []) || []);
    const neu = [];
    const w = el('div', 'welt');
    w.dataset.haupt = ''; w.dataset.ort = 'sammlung';
    for (const zone of WELT.zonen) {
      const z = el('section', 'welt-zone ' + zone.id);
      z.setAttribute('aria-label', zone.name);
      for (const l of zone.laute) {
        const st = WELT.stand(l, licht);
        let f;
        const gs = lautGestalt(zone, l);
        if (st === 'nebel') { f = el('div', 'laut nebel'); f.setAttribute('aria-hidden', 'true'); f.append(WEG.siegelBild(gs.art, Object.assign({}, gs, { schrift: null }))); }
        else {
          const inhalt = gs.schrift ? [] : l.g.length > 1 ? [el('span', 'g-zeile', faerbe(l.g)), el('span', 'g-zeile', faerbe(l.k))]
            : faerbe(l.g === l.k.toUpperCase() && l.g.length === 1 ? l.g + l.k : l.g + ' ' + l.k);
          f = knopf('laut ' + st, inhalt, () => oeffne(l), l.g);
          if (TEILE[l.teil]) f.dataset.ort = TEILE[l.teil].art === 'prolog' ? l.teil + '|' + l.frei : l.teil;
          if (!gesehen.has(l.g) && !ruhig()) { const n = el('i', 'nebel-schicht'); n.style.animationDelay = (neu.length * 0.25) + 's'; f.append(n); }
          if (!gesehen.has(l.g)) neu.push(l.g);
        }
        if (st !== 'nebel') f.prepend(WEG.siegelBild(gs.art, gs));
        f.classList.add('gestalt', 'g-' + gs.art.split('|')[0], ...(gs.art.includes('|') ? ['g-bund'] : []), ...(l.g.length > 1 && !gs.schrift ? ['g-lang'] : []));
        z.append(f);
      }
      w.append(z);
    }
    main.append(w);
    if (neu.length) schreib(WELT_KEY, [...gesehen, ...neu]);
  }

  sammlung = sanft(sammlung, true);
  return { sammlung };
}
