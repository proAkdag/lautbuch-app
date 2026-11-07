import LB from './lb_schrift.mjs';
import './lb_symbole.mjs';
import './lb_bilder.mjs';
import { tausche } from './lb_bewegung.mjs';
import { knopf, mitSymbol } from './lb_knopf.mjs';
import { schluessel } from './lb_speicher.mjs';
const { el, faerbe, wort, sym } = LB;

export function wiederholenModul(_A) {
  const { hoere, leer, weiterLesen, titelZeile, raumHuelle, mischForm, karteikarte, wiederholenPool, gewichtetZiehen, oben, unten, sanft } = _A;
  const WIEDERHOLEN_KARTEN = 10;
  function wiederholen() {
    leer();
    document.body.classList.add('im-ueben', 'feuer');
    oben.append(titelZeile('Wiederholen'));
    const r = el('span', 'reiter-tuer ueben-tuer'); r.setAttribute('aria-pressed', 'true'); r.append(mitSymbol('stapel', 'Wiederholen'));
    const raum = raumHuelle([r], 'raum-ueben', 'wiederholen');
    const buehne = el('div', 'tafel-rahmen mit-karteikarte');
    const pool = wiederholenPool();
    const auswahl = gewichtetZiehen(pool, WIEDERHOLEN_KARTEN);
    const punkte = el('div', 'lauf-punkte wiederholen-punkte'), punktEl = auswahl.map(() => { const p = el('i', 'lauf-punkt'); punkte.append(p); return p; });
    punkte.setAttribute('aria-hidden', 'true');
    const punkteSetzen = (pos) => punktEl.forEach((p, k) => { p.classList.toggle('jetzt', k === pos); p.classList.toggle('gold', k < pos); });
    raum.append(punkte, buehne);
    const amEnde = () => {
      punktEl.forEach(p => { p.classList.remove('jetzt'); p.classList.add('gold'); });
      if (unten.querySelector('.weiter-knopf')) return;
      const box = el('div', 'ende');
      box.append(knopf('gelesen weiter-knopf', [sym('band'), el('span', null, 'weiter')], () => weiterLesen(), 'weiter'));
      tausche(unten, () => unten.replaceChildren(box), { ruhend: true });
    };
    const kk = karteikarte(buehne, {
      schluessel: () => auswahl,
      form: (schl) => {
        const e = pool.get(schl);
        const a = e.prolog ? 'buchstaben' : e.art;
        const f = e.form === 'fest' || (a === 'woerter' && e.form !== 'gross' && e.text !== LB.gross(e.text)) ? e.text : e.form === 'gross' ? LB.gross(e.text) : e.form === 'klein' ? e.text.toLowerCase()
          : mischForm(e.text, a);
        return { knoten: (a === 'ketten' || a === 'woerter') ? wort(f) : faerbe(f), lang: f.replace(/-/g, '').length > 4 };
      }
    }, { folge: true, hoechstens: auswahl.length, amEnde, amZeigen: (schl, karte, pos) => punkteSetzen(pos) });
    hoere(document, 'keydown', (e) => {
      if (e.target.closest?.('button')) return;
      if (e.key === ' ' || e.key === 'ArrowRight') { e.preventDefault(); kk.weiter(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); kk.zurueck(); }
    });
  }

  wiederholen = sanft(wiederholen, 'beiTipp');
  return { wiederholen };
}
