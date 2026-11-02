(() => {
  'use strict';
  const el = (tag, cls, inhalt) => { const e = document.createElement(tag); if (cls) e.className = cls; if (inhalt != null) e.append(inhalt); return e; };
  const fertig = (a, ms) => Promise.race([a.finished.catch(() => {}), new Promise(r => setTimeout(r, ms + 120))]);
  const VOKALE = ['A', 'I', 'O', 'U', 'E'];
  const PLAETZE = [{ farbe: '#c99a4b', dunkel: '#9c7130', leinen: 'st-ocker' }, { leer: true, farbe: '#e9dfcf', dunkel: '#cfc2ad' }, { leer: true, farbe: '#e9dfcf', dunkel: '#cfc2ad' }];
  let raum = null, laeuft = false;

  function zeigen(api) {
    if (raum) raum.remove();
    laeuft = false;
    raum = el('div', 'st-raum'); raum.setAttribute('role', 'dialog'); raum.setAttribute('aria-label', 'Mein Lautbuch: Regal');
    const brett = el('div', 'st-brett-oben'), kante = el('div', 'st-brett-kante'), konsolen = [el('div', 'st-konsole'), el('div', 'st-konsole')];
    raum.append(...konsolen, brett, kante);
    document.body.append(raum);
    const ruhig = () => (api.ruhig ? api.ruhig() : matchMedia('(prefers-reduced-motion: reduce)').matches);
    let m = null;
    const buecher = [];
    const messen = () => {
      const VW = innerWidth, VH = innerHeight, schmal = VW < 600;
      const H = schmal ? Math.min(VH * .66, (VW * .86) / .72) : Math.min(VH * .78, (VW * .9) / (2 * .72));
      const W = H * .72, D = H * .18, Hs = Math.min(VH * .46, VW * .55), s = Hs / H;
      return { VW, VH, H, W, D, s, schmal, boden: VH * (schmal ? .72 : .70), fy: VH * (schmal ? .52 : .42),
        tiefe: W * s + 30, brettX: VW * (schmal ? .05 : .08), brettB: VW * (schmal ? .9 : .84) };
    };
    const tf = (l) => `translate3d(${l.x}px, ${l.y}px, ${l.z}px) scale3d(${l.s}, ${l.s}, ${l.s}) rotateY(${l.ry}deg)`;
    const xImRegal = (i) => {
      const { D, s } = m, lueck = D * s * .35, breite = PLAETZE.length * D * s + (PLAETZE.length - 1) * lueck;
      return m.VW / 2 - breite / 2 + i * (D * s + lueck) + D * s / 2;
    };
    const zImRegal = () => -(m.W * m.s / 2) - 14;
    const platz = (i) => {
      const { W, H, s, boden } = m, hoch = [1, .94, .97][i] * s;
      return { x: xImRegal(i) - W / 2, y: boden - H * hoch / 2 - H / 2, z: zImRegal(), s: hoch, ry: 90 };
    };
    const imRegal = (i) => tf(platz(i));
    const mitte = (offen, ry = 0) => tf({ x: m.VW / 2 - m.W / 2 + (offen && !m.schmal ? m.W / 2 : 0), y: m.VH / 2 - m.H / 2, z: 0, s: 1, ry });
    const bildVon = (b, cls) => { const f = el('div', 'st-bild'); if (b.bild) { const im = new Image(); im.src = b.bild; im.alt = ''; f.append(im); } else f.append('Aa'); return f; };
    const bauen = () => {
      buecher.forEach(x => x.buch.remove()); buecher.length = 0;
      m = messen();
      const r = raum.style; r.setProperty('--st-w', m.W + 'px'); r.setProperty('--st-h', m.H + 'px'); r.setProperty('--st-d', m.D + 'px');
      r.perspectiveOrigin = `50% ${m.fy}px`;
      Object.assign(brett.style, { left: m.brettX + 'px', width: m.brettB + 'px', top: m.boden - m.tiefe + 'px', height: m.tiefe + 'px' });
      const kh = m.VH * .022, kb = Math.min(m.tiefe * .8, m.brettB * .22);
      Object.assign(kante.style, { left: m.brettX + 'px', width: m.brettB + 'px', top: m.boden + 'px', height: kh + 'px' });
      konsolen.forEach((k, j) => Object.assign(k.style, { left: m.brettX + m.brettB * (j ? .9 : .1) + 'px', top: m.boden + kh + 'px',
        width: kb + 'px', height: kb + 'px', transform: `translateZ(${-m.tiefe}px)` + (j ? ' scaleX(-1)' : '') }));
      brett.replaceChildren();
      PLAETZE.forEach((p, i) => {
        const b = p.leer ? null : api.buch;
        const buch = el('button', 'st-buch' + (p.leer ? ' st-leer' : '') + (p.leinen ? ' ' + p.leinen : ''));
        buch.type = 'button'; buch.setAttribute('aria-label', p.leer ? 'freier Platz' : 'Mein Lautbuch' + (b.name ? ' von ' + b.name : ''));
        buch.style.setProperty('--st-farbe', p.farbe); buch.style.setProperty('--st-dunkel', p.dunkel);
        const ruecken = el('div', 'st-ruecken');
        if (b) {
          const siegel = el('div', 'st-siegel'); for (let k = 0; k < b.orte; k++) siegel.append(el('i'));
          ruecken.append(bildVon(b), el('span', 'st-titel', 'Mein Lautbuch'), siegel);
          if (b.name) ruecken.append(el('span', 'st-name', b.name));
        }
        const innen = el('div', 'st-innen'); innen.append(el('div', 'st-schatten'));
        const deckel = el('div', 'st-deckel'), vorn = el('div', 'st-vorn');
        if (b) { const v = el('div', 'st-vokale'); VOKALE.forEach((x, k) => v.append(el('b', b.vokale[k] ? 'st-an' : '', x))); vorn.append(bildVon(b), el('div', 'st-titel', 'Mein Lautbuch'), v); }
        deckel.append(vorn, el('div', 'st-innenseite'));
        buch.append(el('div', 'st-rueckdeckel'), el('div', 'st-kopf'), el('div', 'st-fuss'), el('div', 'st-schnitt'), innen, ruecken, deckel);
        buch.style.transform = imRegal(i);
        buch.addEventListener('click', () => oeffnen(i));
        const fleck = el('div', 'st-fleck'), fs = fleck.style, fb = m.D * platz(i).s * 1.6, ft = m.W * platz(i).s * 1.04;
        Object.assign(fs, { left: xImRegal(i) - m.brettX - fb / 2 + 'px', top: m.tiefe + zImRegal() - ft / 2 + 'px', width: fb + 'px', height: ft + 'px' });
        brett.append(fleck);
        raum.append(buch); buecher.push({ buch, deckel, innen, vorn, fleck, leer: !!p.leer });
      });
    };
    async function oeffnen(i) {
      const b = buecher[i];
      if (laeuft || !raum) return;
      if (b.leer) {
        if (!ruhig()) b.buch.animate([{ transform: imRegal(i) }, { transform: tf(Object.assign(platz(i), { ry: 84 })) }, { transform: imRegal(i) }], { duration: 360, easing: 'ease-in-out' });
        return;
      }
      laeuft = true;
      if (ruhig()) { api.weg(); await fertig(raum.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 400, easing: 'ease-out', fill: 'forwards' }), 400); schliessen(); return; }
      const andere = buecher.filter(x => x !== b).map(x => x.buch);
      b.buch.style.zIndex = 3;
      const regal = imRegal(i), l = platz(i), gezupft = tf(Object.assign({}, l, { y: l.y - m.H * m.s * .06, z: l.z + 18, ry: 74 }));
      b.fleck.animate([{ opacity: 1 }, { opacity: .45 }], { duration: 200, easing: 'ease-out', fill: 'forwards' });
      await fertig(b.buch.animate([{ transform: regal }, { transform: gezupft }], { duration: 200, easing: 'cubic-bezier(.3,0,.3,1)', fill: 'forwards' }), 200);
      andere.forEach(a => a.animate([{ opacity: 1 }, { opacity: .28 }], { duration: 500, easing: 'ease-out', fill: 'forwards' }));
      b.fleck.animate([{ opacity: .45 }, { opacity: 0 }], { duration: 300, easing: 'ease-out', fill: 'forwards' });
      [...b.vorn.children].forEach(c => c.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, delay: 260, easing: 'ease-out', fill: 'forwards' }));
      await fertig(b.buch.animate([{ transform: gezupft }, { transform: mitte(false, -6), offset: .82 }, { transform: mitte(false) }],
        { duration: 650, easing: 'cubic-bezier(.22,.61,.36,1)', fill: 'forwards' }), 650);
      b.deckel.animate([{ transform: `translateZ(${m.D / 2}px) rotateY(0deg)` }, { transform: `translateZ(${m.D / 2}px) rotateY(-178deg)` }], { duration: 650, easing: 'cubic-bezier(.45,.05,.25,1)', fill: 'forwards' });
      b.innen.querySelector('.st-schatten').animate([{ opacity: 1 }, { opacity: 0 }], { duration: 650, easing: 'ease-in', fill: 'forwards' });
      await fertig(b.buch.animate([{ transform: mitte(false) }, { transform: mitte(true) }], { duration: 650, easing: 'cubic-bezier(.45,.05,.25,1)', fill: 'forwards' }), 650);
      const seite = b.innen.getBoundingClientRect();
      api.weg();
      const main = api.main, mr = main.getBoundingClientRect();
      const k = seite.height / mr.height, sichtB = seite.width / k;
      const ix = Math.max(0, (mr.width - sichtB) / 2), rad = 6 / k;
      const tx = seite.left + seite.width / 2 - (mr.left + mr.width / 2), ty = seite.top + seite.height / 2 - (mr.top + mr.height / 2);
      main.classList.add('st-waechst');
      const a = main.animate([
        { transform: `translate(${tx}px, ${ty}px) scale(${k})`, clipPath: `inset(0px ${ix}px round ${rad}px)`, opacity: .02, offset: 0 },
        { opacity: 1, offset: .18 },
        { transform: 'translate(0px, 0px) scale(1)', clipPath: 'inset(0px 0px round 0px)', opacity: 1 }
      ], { duration: 700, easing: 'cubic-bezier(.5,0,.15,1)' });
      await fertig(a, 700);
      await fertig(raum.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 220, easing: 'ease-out', fill: 'forwards' }), 220);
      main.classList.remove('st-waechst');
      schliessen();
    }
    const schliessen = () => { removeEventListener('resize', neu); if (raum) raum.remove(); raum = null; laeuft = false; };
    let zuletzt = '';
    const neu = () => { const g = innerWidth + 'x' + innerHeight; if (g !== zuletzt && !laeuft && raum) { zuletzt = g; bauen(); } };
    addEventListener('resize', neu);
    neu();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { zuletzt = ''; neu(); });
    const erstes = raum.querySelector('.st-buch:not(.st-leer)'); if (erstes) erstes.focus({ preventScroll: true });
  }
  window.LB_START = { zeigen, offen: () => !!raum };
})();
