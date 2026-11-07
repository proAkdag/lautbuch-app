import LB from './lb_schrift.mjs';
const { el } = LB;

export const RUHIG = matchMedia('(prefers-reduced-motion: reduce)');
export const ruhig = () => RUHIG.matches;

export const KURVE = 'cubic-bezier(.22,.61,.36,1)';
export const anim = (e, bilder, opt) => (e && e.animate) ? e.animate(bilder, Object.assign({ easing: KURVE }, opt)) : null;
export const fertigVon = (a, ms = 600) => a ? Promise.race([a.finished.catch(() => {}), new Promise(r => setTimeout(r, ms + 250))]) : Promise.resolve();
export const kommt = (e, verzug = 0, weg = 14, dauer = 420) => ruhig()
  ? anim(e, [{ opacity: 0 }, { opacity: 1 }], { duration: 160, delay: verzug, fill: 'backwards' })
  : anim(e, [{ opacity: 0, transform: `translate(0px,${weg}px)` }, { opacity: 1, transform: 'translate(0px,0px)' }], { duration: dauer, delay: verzug, fill: 'backwards' });
export const geht = (e, weg = -10, dauer = 280) => fertigVon(ruhig()
  ? anim(e, [{ opacity: 1 }, { opacity: 0 }], { duration: 140, fill: 'forwards', easing: 'ease' })
  : anim(e, [{ opacity: 1, transform: 'translate(0px,0px)' }, { opacity: 0, transform: `translate(0px,${weg}px)` }], { duration: dauer, fill: 'forwards', easing: 'ease' }), dauer);
export const GEIST_FEST = ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'display', 'flexDirection', 'justifyContent', 'alignItems', 'rowGap', 'columnGap', 'overflowX', 'overflowY', 'color'];
export const GEIST_FARBEN = ['--papier', '--karte', '--blatt', '--tinte', '--tinte-70', '--tinte-60', '--tinte-30', '--tinte-licht', '--rand', '--vok', '--kon', '--verb', '--klang', '--gold-grund', '--asche', '--asche-grund'];
export const geist = (b) => {
  const k = b.cloneNode(true);
  k.classList.add('geist'); k.setAttribute('aria-hidden', 'true'); k.inert = true;
  const bs = getComputedStyle(b);
  for (const p of GEIST_FEST) k.style[p] = bs[p];
  for (const v of GEIST_FARBEN) k.style.setProperty(v, bs.getPropertyValue(v));
  if (bs.position !== 'fixed') {
    const p = b.parentElement, r = b.getBoundingClientRect(), q = p.getBoundingClientRect();
    if (getComputedStyle(p).position === 'static') p.style.position = 'relative';
    Object.assign(k.style, { position: 'absolute', left: (r.left - q.left - p.clientLeft) + 'px', top: (r.top - q.top - p.clientTop) + 'px',
      width: r.width + 'px', height: r.height + 'px', margin: '0', minHeight: '0', maxHeight: 'none' });
  }
  k.style.pointerEvents = 'none'; k.style.zIndex = '6';
  const els = [b, ...b.querySelectorAll('*')];
  const takt = (b.getAnimations ? b.getAnimations({ subtree: true }) : []).filter(a => a.animationName && a.effect && a.effect.target)
    .map(a => [els.indexOf(a.effect.target), a.animationName, a.effect.pseudoElement || '', a.currentTime]);
  if (takt.length) k.__takt = takt;
  const kels = [k, ...k.querySelectorAll('*')];
  for (const a of (b.getAnimations ? b.getAnimations({ subtree: true }) : [])) {
    if (!a.transitionProperty || !a.effect || !a.effect.target || a.effect.pseudoElement) continue;
    const z = kels[els.indexOf(a.effect.target)]; if (!z) continue;
    const p = a.transitionProperty, w = getComputedStyle(a.effect.target).getPropertyValue(p);
    z.style.transition = 'none'; z.style.setProperty(p, w);
  }
  return k;
};
export const geistTakt = (k) => {
  if (!k.__takt || !k.getAnimations) return;
  const els = [k, ...k.querySelectorAll('*')];
  for (const a of k.getAnimations({ subtree: true })) {
    if (!a.animationName || !a.effect || !a.effect.target) continue;
    const i = els.indexOf(a.effect.target);
    const t = k.__takt.find(x => x[0] === i && x[1] === a.animationName && x[2] === (a.effect.pseudoElement || ''));
    if (t && t[3] != null) a.currentTime = t[3];
  }
};
export const tausche = (bs, baue, opt = {}) => {
  bs = [].concat(bs);
  const geister = bs.filter(b => b.isConnected && b.childElementCount && b.getClientRects().length).map(b => [b, geist(b)]);
  baue();
  const weg = opt.ruhend ? 0 : 1;
  for (const [b, k] of geister) { b.after(k); geistTakt(k); geht(k, -10 * weg, opt.gehen).then(() => k.remove()); }
  for (const b of bs) for (const c of b.children) if (!c.classList.contains('geist')) kommt(c, opt.verzug != null ? opt.verzug : geister.length ? 80 : 0, 14 * weg);
};
export const rahmenFlug = (von, vs, ziel) => {
  const nach = ziel.getBoundingClientRect();
  if (!von || !von.width || !nach.width) return false;
  if (Math.abs(nach.left - von.left) < 3 && Math.abs(nach.top - von.top) < 3 && Math.abs(nach.width - von.width) < 3) return false;
  const zs = getComputedStyle(ziel);
  const grund = (c) => (c === 'transparent' || c === 'rgba(0, 0, 0, 0)') ? 'rgba(255, 250, 240, 0)' : c;
  const rand = (st, c) => st === 'none' ? 'rgba(42, 37, 32, 0)' : c;
  const a0 = { left: von.left + 'px', top: von.top + 'px', width: von.width + 'px', height: von.height + 'px',
    borderRadius: vs.borderRadius, backgroundColor: grund(vs.backgroundColor), borderColor: rand(vs.borderTopStyle, vs.borderTopColor), opacity: 1 };
  const a1 = { left: nach.left + 'px', top: nach.top + 'px', width: nach.width + 'px', height: nach.height + 'px',
    borderRadius: zs.borderRadius, backgroundColor: grund(zs.backgroundColor), borderColor: rand(zs.borderTopStyle, zs.borderTopColor), opacity: 1 };
  const g = el('div', 'rahmen-flug'); g.setAttribute('aria-hidden', 'true');
  document.body.append(g);
  fertigVon(anim(g, [a0, Object.assign({ offset: .78 }, a1), Object.assign({}, a1, { opacity: 0 })], { duration: 600, fill: 'forwards' }), 600).then(() => g.remove());
  return true;
};
