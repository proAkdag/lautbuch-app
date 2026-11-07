import LB from './lb_schrift.mjs';
import './lb_symbole.mjs';
import './lb_lernweg_daten.mjs';
import WEG from './lb_weg.mjs';
import { knopf } from './lb_knopf.mjs';
import { lies } from './lb_speicher.mjs';
const { el, sym } = LB;
const TEILE =  (window).LAUTBUCH_TEILE;

export function leiste(A) {
  let schieneZustand = { aktiv: null, lv: null, teil: null };
  const schKnopf = (ziel, zeichen, wortTxt, fn) => { const k = knopf('schienen-knopf', [sym(zeichen), el('span', 'schienen-wort', wortTxt)], fn, wortTxt); k.dataset.ziel = ziel; return k; };
  const weiterLesen = () => {
    const lz = lies(A.lesezeichenKey(), null), lzTeil = lz && TEILE[lz.teil], lzLevel = lzTeil && lzTeil.level.find(l => l.id === lz.level);
    if (lzLevel) A.level(lzTeil, lzLevel, 'ueben', lz.blatt);
    else { const h = WEG.teile.find(w => A.wegStand()[w.id] === 'hier'); A.zumOrt(h && A.ortVon(h)); }
  };
  const zimmerDa = A.VERSUCH.zimmer && !!window.LB_ZIMMER;
  const OBEN = [
    { ziel: 'weg', zeichen: 'welt', wort: 'Weg', tun: () => A.weg(), an: true },
    { ziel: 'weiter', zeichen: 'band', wort: 'weiter', tun: () => weiterLesen() },
    { ziel: 'laute', zeichen: 'laute', wort: 'Laute', tun: () => A.sammlung(), an: true },
    { ziel: 'galerie', zeichen: 'bild', wort: 'Galerie', tun: () => A.galerie(), an: true },
    zimmerDa && { ziel: 'zimmer', zeichen: 'haus', wort: 'Zimmer', tun: () => A.zimmerMitGang(), an: true }
  ].filter(Boolean);
  const oben = OBEN.map(e => schKnopf(e.ziel, e.zeichen, e.wort, e.tun));
  const leuchten = oben.filter((k, i) => OBEN[i].an);
  const sHinweis = schKnopf('hinweis', 'hinweis', 'Hinweis', () => { if (schieneZustand.lv) A.hinweisKarte(schieneZustand.lv, { immer: true }); });
  const sMehr = schKnopf('mehr', 'mehr', 'Begleitung', () => A.schublade(schieneZustand.teil || undefined, schieneZustand.lv || undefined));
  const vollbildDa = !!(document.fullscreenEnabled || document.webkitFullscreenEnabled);
  const imVollbild = () => !!(document.fullscreenElement || document.webkitFullscreenElement);
  const vollbildUmschalten = () => {
    const d = document.documentElement;
    try {
      const p = imVollbild() ? (document.exitFullscreen || document.webkitExitFullscreen).call(document) : (d.requestFullscreen || d.webkitRequestFullscreen).call(d);
      if (p && p.catch) p.catch(() => {});
    } catch {}
  };
  const sVoll = schKnopf('vollbild', 'vollbild', 'Vollbild', vollbildUmschalten);
  const vollbildZeigen = () => { const an = imVollbild(); sVoll.setAttribute('aria-pressed', String(an)); sVoll.querySelector('.schienen-wort').textContent = an ? 'Fenster' : 'Vollbild'; };
  for (const e of ['fullscreenchange', 'webkitfullscreenchange']) document.addEventListener(e, vollbildZeigen);
  vollbildZeigen();
  const schiene = el('nav', 'schiene'); schiene.setAttribute('aria-label', 'Leiste');
  const schieneUnten = el('div', 'schiene-unten'); if (vollbildDa) schieneUnten.append(sVoll); schieneUnten.append(sHinweis, sMehr);
  schiene.append(...oben, schieneUnten);
  document.body.append(schiene);
  const schieneSetzen = (aktiv, lv, teil) => {
    schieneZustand = { aktiv, lv: lv && lv.hinweis ? lv : null, teil: teil || null };
    for (const k of leuchten) { const an = k.dataset.ziel === aktiv; k.classList.toggle('an', an); if (an) k.setAttribute('aria-current', 'page'); else k.removeAttribute('aria-current'); }
    sHinweis.classList.toggle('licht-ruht', !schieneZustand.lv);
    if (schieneZustand.lv) sHinweis.removeAttribute('aria-disabled'); else sHinweis.setAttribute('aria-disabled', 'true');
  };
  return { schieneSetzen, weiterLesen, zimmerDa, vollbildDa, sVoll, imVollbild, vollbildUmschalten };
}
