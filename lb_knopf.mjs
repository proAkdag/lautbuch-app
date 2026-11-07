import LB from './lb_schrift.mjs';
import './lb_symbole.mjs';
const { el, sym } = LB;

export let gesperrtBis = 0;
export const tipp = (fn) => (e) => {
  const jetzt = performance.now();
  if (jetzt < gesperrtBis) return;
  gesperrtBis = jetzt + 500;
  fn(e);
};
export const knopf = (cls, inhalt, fn, label) => {
  const b = el('button', 'knopf ' + cls);
  b.type = 'button';
  for (const x of [].concat(inhalt)) b.append(x);
  if (label) b.setAttribute('aria-label', label);
  b.addEventListener('click', tipp(fn));
  return b;
};
export const mitSymbol = (name, text) => { const s = el('span', 'mit-symbol'); s.append(sym(name), el('span', null, text)); return s; };
export const langDruck = (ziel, fn) => {
  let t = null;
  const weg = () => { clearTimeout(t); t = null; };
  let gefeuert = false;
  ziel.addEventListener('pointerdown', () => { weg(); gefeuert = false; t = setTimeout(() => { t = null; gefeuert = true; fn(); }, 600); });
  ['pointerup', 'pointerleave', 'pointercancel'].forEach(ev => ziel.addEventListener(ev, weg));
  ziel.addEventListener('contextmenu', (e) => { e.preventDefault(); weg(); if (!gefeuert) fn(); gefeuert = false; });
  ziel.addEventListener('click', (e) => { if (gefeuert) { e.stopImmediatePropagation(); gefeuert = false; } }, true);
};
