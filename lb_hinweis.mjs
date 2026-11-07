import LB from './lb_schrift.mjs';
import './lb_symbole.mjs';
import './lb_bilder.mjs';
import { kommt, geht } from './lb_bewegung.mjs';
import { knopf } from './lb_knopf.mjs';
import { lies, schreib } from './lb_speicher.mjs';
import './lb_lernweg_daten.mjs';
const TEILE =  (window).LAUTBUCH_TEILE;
const { el, sym } = LB;

export function hinweisModul(_A) {
  const { main } = _A;
  const HINWEIS_KEY = 'lautbuch.hinweis.gesehen.v1';
  function hinweisKarte(lv, opt = {}) {
    const gesehen = lies(HINWEIS_KEY, []) || [];
    const id = Object.keys(TEILE).find(t => TEILE[t].level.includes(lv) || TEILE[t].boss === lv) + '|' + lv.id;
    const offen = main.querySelector('.hinweis-karte');
    if (opt.immer && offen) { geht(offen, 10).then(() => offen.remove()); return; }
    if (offen) return;
    if (gesehen.includes(id) && !opt.immer) return;
    const k = el('div', 'hinweis-karte');
    k.setAttribute('role', 'note'); k.dataset.hid = id;
    k.append(sym('haus'), el('span', null, lv.hinweis), knopf('ikon schliessen', '×', () => {
      schreib(HINWEIS_KEY, [...gesehen, id]); geht(k, 10).then(() => k.remove());
    }, 'Hinweis schließen'));
    main.append(k);
    kommt(k, opt.immer ? 0 : 500, opt.immer ? 8 : 12, opt.immer ? 220 : 420);
  }
  const hinweisZu = () => {
    const k = main.querySelector('.hinweis-karte'); if (!k) return;
    const g = lies(HINWEIS_KEY, []) || [];
    if (k.dataset.hid && !g.includes(k.dataset.hid)) schreib(HINWEIS_KEY, [...g, k.dataset.hid]);
    geht(k, 10).then(() => k.remove());
  };


  return { hinweisKarte, hinweisZu };
}
