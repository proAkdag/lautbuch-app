
export function tafelModul(_A) {
  function einpassen(tafel) {
    tafel.style.scale = ''; tafel.style.marginBottom = '';
    const platz = tafel.parentElement;
    const cs = getComputedStyle(platz);
    const verf = platz.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const vor = tafel.previousElementSibling;
    const verfH = platz.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom) - (vor ? vor.offsetHeight + parseFloat(getComputedStyle(vor).marginBottom || 0) : 0);
    const noetig = Math.max(...[...tafel.children].map(z => z.scrollWidth));
    const hoch = tafel.scrollHeight;
    const z = Math.min(1, verf / noetig, verfH > 60 ? verfH / hoch : 1);
    if (z >= 1) return;
    const s = Math.floor(z * 100) / 100;
    tafel.style.transformOrigin = '50% 0';
    tafel.style.scale = String(s);
    tafel.style.marginBottom = -Math.floor(hoch * (1 - s)) + 'px';
  }

  return { einpassen };
}
