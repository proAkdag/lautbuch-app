import LB from './lb_schrift.mjs';
import './lb_symbole.mjs';
import './lb_bilder.mjs';
import { knopf, mitSymbol } from './lb_knopf.mjs';
const { el, sym } = LB;

export function raumModul(_A) {
  const { leer, stolper, kopfLeiste, main, sinnVorladen, sanft } = _A;
  const ueben = (...x) => _A.ueben(...x);
  const lauf = (...x) => _A.lauf(...x);
  const raumHuelle = (reiter, art, ort) => {
    const h = el('div', 'raum-huelle');
    const r = el('div', 'reiterleiste'); for (const x of reiter) r.append(x);
    const raum = el('div', 'raum ' + art);
    if (ort) { raum.dataset.ort = ort; raum.dataset.haupt = ''; }
    h.append(r, raum);
    main.append(h);
    return raum;
  };

  function level(teil, lv, modus, blatt) {
    leer();
    kopfLeiste(teil, lv.id, lv);
    const ueb = knopf('reiter-tuer ueben-tuer', mitSymbol('haus', 'Üben'), () => level(teil, lv, 'ueben'), 'Üben');
    const zei = knopf('reiter-tuer zeigen-tuer', mitSymbol('raute', 'Zeigen'), () => level(teil, lv, 'zeigen'), 'Zeigen');
    ueb.setAttribute('aria-pressed', String(modus === 'ueben'));
    ueb.append(sym('stein', 'tuer-stein' + (stolper(teil, lv).length ? '' : ' aus')));
    zei.setAttribute('aria-pressed', String(modus === 'zeigen'));
    document.body.classList.add(modus === 'ueben' ? 'im-ueben' : 'im-zeigen');
     sinnVorladen(teil, lv);
    const raum = raumHuelle([ueb, zei], modus === 'ueben' ? 'raum-ueben' : 'raum-zeigen', teil.id + '|' + lv.id);
    if (modus === 'ueben') ueben(teil, lv, raum, blatt); else lauf(teil, lv, raum, false);
  }

  level = sanft(level, 'beiTipp');
  return { raumHuelle, level };
}
