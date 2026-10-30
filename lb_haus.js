(() => {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const GROESSE = 64;
  const s = (tag, attr) => { const e = document.createElementNS(NS, tag); for (const k in attr) e.setAttribute(k, attr[k]); return e; };
  const BILDER = [
    ['ding-haus', { kreuz: false, boden: .825, tuer: [.39, .78], scheiben: [[.1855, .5723, .2168, .6074], [.2363, .5723, .2676, .6094], [.1836, .6289, .2148, .668], [.2363, .6309, .2676, .6699],
      [.5195, .5762, .5547, .6133], [.5742, .5762, .6094, .6152], [.5195, .6367, .5547, .6797], [.5742, .6387, .6094, .6816]] }],
    ['haus', { kreuz: true, boden: .85, tuer: [.49, .84], scheiben: [[.215, .54, .36, .70], [.64, .54, .785, .70]] }]
  ];
  window.LB_HAUS = (K, opt) => {
    const dinge = K.E.dinge, ruhig = opt.ruhig || (() => matchMedia('(prefers-reduced-motion: reduce)').matches);
    dinge.querySelectorAll('.haus-ding').forEach(x => x.remove());
    const daten = window.LB_BILDDATEN || {};
    const [, fenster] = BILDER.find(([k]) => daten[k] && daten[k].farbe) || [null, null];
    const roh = (BILDER.map(([k]) => daten[k]).find(d => d && d.farbe) || {}).farbe;
    const haus = s('g', { class: 'haus-ding ding', role: 'button', 'aria-label': 'Mein Zimmer', tabindex: '0' });
    haus.dataset.ort = 'zimmer';
    haus.append(s('ellipse', { cx: GROESSE / 2, cy: GROESSE * ((fenster && fenster.boden) || .9) + 1, rx: GROESSE * .5, ry: 8, class: 'ding-ring ding-hinweis' }),
      s('ellipse', { cx: GROESSE / 2, cy: GROESSE * ((fenster && fenster.boden) || .9), rx: GROESSE * .42, ry: 6, class: 'haus-schatten' }),
      s('rect', { x: 0, y: 0, width: GROESSE, height: GROESSE, class: 'ding-flaeche' }));
    if (roh) haus.append(s('image', { href: roh, x: 0, y: 0, width: GROESSE, height: GROESSE, class: 'haus-bild' }));
    const licht = s('g', { class: 'haus-licht', 'aria-hidden': 'true' });
    for (const [fx0, fy0, fx1, fy1] of fenster ? fenster.scheiben : []) {
      const [a, b, c, d] = [fx0, fy0, fx1, fy1].map(v => v * GROESSE), mx = (a + c) / 2, my = (b + d) / 2;
      licht.append(s('rect', { x: a, y: b, width: c - a, height: d - b, rx: fenster.kreuz ? 1.2 : .3, class: fenster.kreuz ? 'flaeche' : 'scheibe' }));
      if (fenster.kreuz) licht.append(s('path', { d: `M${mx} ${b}V${d}M${a} ${my}H${c}`, class: 'kreuz' }));
    }
    haus.append(licht);
    const [x0, y0] = K.P(0), weg = window.LAUTBUCH_WEG, stand = K.stand || {};
    const offen = (x, y) => { let best = Infinity, st = null; weg.teile.forEach((w, j) => { const [px, py] = K.P(j), d = Math.hypot(px - x, py - y); if (d < best) { best = d; st = stand[w.id]; } }); return st !== 'nebel' && st !== 'rand'; };
    const winkel = [90]; for (let a = 15; a <= 90; a += 15) winkel.push(90 + a, 90 - a);
    let steht = false;
    for (let r = 60; r <= 300 && !steht; r += 12) for (const a of winkel) {
      const cx = x0 + Math.cos(a * Math.PI / 180) * r, cy = y0 + Math.sin(a * Math.PI / 180) * r;
      if (cy - GROESSE / 2 - 8 < y0 || !offen(cx, cy)) continue;
      if (opt.frei.setzeBei(haus, cx, cy, [0, 0, GROESSE, GROESSE])) { steht = true; break; }
    }
    if (!steht) {
      const gross = (K.lage && K.lage.gross) || 1, M = 12 + GROESSE / 2;
      const meiden = weg.teile.flatMap((w, j) => { const [px, py] = K.P(j); return [[px + 24 * gross - 8, py - 62, px + 24 * gross + 56, py - 14], [px + 2, py - 150, px + 26, py - 92]]; });
      const ruhigPlatz = (cx, cy) => !meiden.some(([a, b, c, d]) => cx + M > a && cx - M < c && cy + M > b && cy - M < d);
      const rund = []; for (let a = 0; a < 360; a += 15) rund.push(a);
      rund.sort((a, b) => -Math.sin(a * Math.PI / 180) + Math.sin(b * Math.PI / 180));
      for (let r = 60; r <= 420 && !steht; r += 12) for (const a of rund) {
        const cx = x0 + Math.cos(a * Math.PI / 180) * r, cy = y0 + Math.sin(a * Math.PI / 180) * r;
        if (!offen(cx, cy) || !ruhigPlatz(cx, cy)) continue;
        if (opt.frei.setzeBei(haus, cx, cy, [0, 0, GROESSE, GROESSE])) { steht = true; break; }
      }
    }
    if (!steht) return;
    const [hx, hy] = (haus.getAttribute('transform') || '').match(/-?[\d.]+/g).map(Number), [tx, ty] = (fenster && fenster.tuer) || [.5, .85];
    haus.dataset.tuer = `${(hx + tx * GROESSE).toFixed(1)} ${(hy + ty * GROESSE).toFixed(1)}`;
    const auf = (e) => { e.stopPropagation(); opt.zimmer(); };
    haus.addEventListener('click', auf);
    haus.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); auf(e); } });
    let neu = false; try { neu = !!(opt.neu && opt.neu()); } catch (_) { neu = false; }
    if (neu && fenster) {
      haus.classList.add('wartet');
      if (!ruhig()) licht.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 1400, delay: 500, easing: 'ease-out', fill: 'backwards' });
    }
  };
})();
