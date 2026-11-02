(() => {
  'use strict';
  const el = (tag, cls, inhalt) => { const e = document.createElement(tag); if (cls) e.className = cls; if (inhalt != null) e.append(inhalt); return e; };
  const fertig = (a, ms) => Promise.race([a.finished.catch(() => {}), new Promise(r => setTimeout(r, ms + 120))]);
  const VOKALE = ['A', 'I', 'O', 'U', 'E'];
  const PLAETZE = [{ farbe: '#c99a4b', dunkel: '#9c7130', leinen: 'st-ocker' }, { leer: true, farbe: '#e9dfcf', dunkel: '#cfc2ad' }, { leer: true, farbe: '#e9dfcf', dunkel: '#cfc2ad' }];
  const PERSP = 1800;
  const KURVE_AUF = 'cubic-bezier(.45,.05,.25,1)', KURVE_KAMERA = 'cubic-bezier(.45,0,.2,1)';
  let raum = null, laeuft = false;
  const spaeter = [];

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
        const innenseite = el('div', 'st-innenseite');
        deckel.append(vorn, innenseite);
        buch.append(el('div', 'st-rueckdeckel'), el('div', 'st-kopf'), el('div', 'st-fuss'), el('div', 'st-schnitt'), innen, ruecken, deckel);
        buch.style.transform = imRegal(i);
        buch.addEventListener('click', () => oeffnen(i));
        const fleck = el('div', 'st-fleck'), fs = fleck.style, fb = m.D * platz(i).s * 1.6, ft = m.W * platz(i).s * 1.04;
        Object.assign(fs, { left: xImRegal(i) - m.brettX - fb / 2 + 'px', top: m.tiefe + zImRegal() - ft / 2 + 'px', width: fb + 'px', height: ft + 'px' });
        brett.append(fleck);
        raum.append(buch); buecher.push({ buch, deckel, innen, innenseite, vorn, fleck, leer: !!p.leer });
      });
    };
    const seitenVersatz = () => (m.schmal ? 0 : m.W / 2) * PERSP / (PERSP - (m.D / 2 - 2));
    const seiteBei = (s0, q) => ({ left: s0.left + seitenVersatz() * q, top: s0.top, width: s0.width, height: s0.height });
    const aufSeite = (S, mr) => {
      const k = Math.max(S.height / mr.height, S.width / mr.width), ix = (mr.width - S.width / k) / 2, iy = (mr.height - S.height / k) / 2;
      return { k, ix, iy, px: S.left - mr.left - k * ix, py: S.top - mr.top - k * iy };
    };
    const flaeche = (S) => m.schmal ? S : { left: S.left - S.width, top: S.top, width: 2 * S.width, height: S.height };
    const rechtsAb = (S, A) => A.ix + (m.schmal ? 0 : S.width / A.k);
    const deckelKante = (q) => {
      const a = 180 * q * Math.PI / 180, x = m.VW / 2 - m.W / 2 + (m.schmal ? 0 : m.W / 2) * q + m.W * Math.cos(a), z = m.D / 2 + m.W * Math.sin(a);
      return m.VW / 2 + (x - m.VW / 2) * PERSP / (PERSP - z);
    };
    const karteAufSeite = (S, mr, li) => { const F = flaeche(S), A = aufSeite(F, mr); return { transform: `translate(${A.px}px, ${A.py}px) scale(${A.k})`,
      clipPath: `inset(${A.iy}px ${A.ix}px ${A.iy}px ${li == null ? A.ix : li}px round ${4 / A.k}px)` }; };
    const abbild = (b, S, mr) => {
      b.innenseite.replaceChildren();
      if (m.schmal) return;
      const A = aufSeite(flaeche(S), mr), sc = A.k * (m.W - 4) / S.width, box = el('div', 'st-abbild'), k = api.main.cloneNode(true);
      k.removeAttribute('id'); k.classList.remove('st-waechst'); k.setAttribute('aria-hidden', 'true'); k.inert = true;
      k.getAnimations && k.getAnimations().forEach(a => a.cancel());
      Object.assign(k.style, { position: 'absolute', left: '0px', top: '0px', margin: '0px', width: mr.width + 'px', height: mr.height + 'px', clipPath: 'none',
        transformOrigin: '0 0', transform: `scale(${sc}) translate(${-A.ix}px, ${-A.iy}px)` });
      box.append(k); b.innenseite.append(box);
    };
    const aufschlagen = (b, s0, mr, richtung) => {
      const o = { duration: 650, easing: KURVE_AUF, fill: 'forwards', direction: richtung };
      b.deckel.animate([{ transform: `translateZ(${m.D / 2}px) rotateY(0deg)` }, { transform: `translateZ(${m.D / 2}px) rotateY(-180deg)` }], o);
      b.innen.querySelector('.st-schatten').animate([{ opacity: 1 }, { opacity: 0 }], o);
      const kf = [];
      for (let j = 0; j <= 12; j++) {
        const q = j / 12, S = seiteBei(s0, q), A = aufSeite(flaeche(S), mr), L = Math.min(S.left + S.width, Math.max(S.left, deckelKante(q)));
        kf.push(Object.assign({ offset: q }, karteAufSeite(S, mr, rechtsAb(S, A) + (L - S.left) / A.k)));
      }
      const a = api.main.animate(kf, o);
      b.buch.animate([{ transform: mitte(false) }, { transform: mitte(true) }], o);
      return a;
    };
    const kamera = (S1, mr, richtung) => {
      const A = aufSeite(flaeche(S1), mr), c = 1 / A.k, cx = mr.left - (mr.left + A.px) * c, cy = mr.top - (mr.top + A.py) * c, o = { duration: 900, easing: KURVE_KAMERA, fill: 'forwards', direction: richtung };
      raum.style.transformOrigin = '0 0';
      raum.animate([{ transform: 'translate(0px, 0px) scale(1)' }, { transform: `translate(${cx}px, ${cy}px) scale(${c})` }], o);
      const anf = karteAufSeite(S1, mr);
      return api.main.animate([Object.assign({ offset: 0 }, anf), { offset: .45, clipPath: anf.clipPath },
        { offset: 1, transform: 'translate(0px, 0px) scale(1)', clipPath: 'inset(0px 0px 0px 0px round 0px)' }], o);
    };
    const karteHoch = (an) => { const main = api.main; main.classList.toggle('st-waechst', an); main.style.transformOrigin = an ? '0 0' : ''; };
    const aufKarte = () => document.body.classList.contains('auf-weg');
    async function oeffnen(i) {
      const b = buecher[i];
      if (laeuft || !raum) return;
      if (b.leer) {
        if (!ruhig()) b.buch.animate([{ transform: imRegal(i) }, { transform: tf(Object.assign(platz(i), { ry: 84 })) }, { transform: imRegal(i) }], { duration: 360, easing: 'ease-in-out' });
        return;
      }
      laeuft = true;
      b.buch.blur();
      if (!aufKarte()) api.weg();
      if (ruhig()) { await fertig(raum.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 400, easing: 'ease-out', fill: 'forwards' }), 400); schliessen(); return; }
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
      const mr = api.main.getBoundingClientRect(), s0 = b.innen.getBoundingClientRect();
      if (!b.innenseite.firstChild) abbild(b, seiteBei(s0, 1), mr);
      karteHoch(true);
      await fertig(aufschlagen(b, s0, mr, 'normal'), 650);
      await fertig(kamera(seiteBei(s0, 1), mr, 'normal'), 900);
      await fertig(raum.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 220, easing: 'ease-out', fill: 'forwards' }), 220);
      karteHoch(false); api.main.getAnimations().forEach(a => a.cancel());
      schliessen();
    }
    async function rueckweg() {
      const i = buecher.findIndex(x => !x.leer), b = buecher[i];
      if (i < 0) return;
      laeuft = true;
      if (ruhig()) await fertig(raum.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, easing: 'ease-out' }), 400);
      else {
        const andere = buecher.filter(x => x !== b);
        b.buch.style.zIndex = 3;
        andere.forEach(x => { x.buch.style.opacity = .28; });
        b.fleck.style.opacity = 0;
        [...b.vorn.children].forEach(c => { c.style.opacity = 1; });
        b.buch.style.transform = mitte(false);
        const mr = api.main.getBoundingClientRect(), s0 = b.innen.getBoundingClientRect();
        abbild(b, seiteBei(s0, 1), mr);
        b.buch.style.transform = mitte(true);
        b.deckel.style.transform = `translateZ(${m.D / 2}px) rotateY(-180deg)`;
        b.innen.querySelector('.st-schatten').style.opacity = 0;
        karteHoch(true);
        raum.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 220, easing: 'ease-out' });
        await fertig(kamera(seiteBei(s0, 1), mr, 'reverse'), 900);
        await fertig(aufschlagen(b, s0, mr, 'reverse'), 650);
        karteHoch(false); api.main.getAnimations().forEach(a => a.cancel());
        const regal = imRegal(i), l = platz(i), gezupft = tf(Object.assign({}, l, { y: l.y - m.H * m.s * .06, z: l.z + 18, ry: 74 }));
        andere.forEach(x => x.buch.animate([{ opacity: .28 }, { opacity: 1 }], { duration: 500, delay: 150, easing: 'ease-in', fill: 'forwards' }));
        [...b.vorn.children].forEach(c => c.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, delay: 90, easing: 'ease-in', fill: 'forwards' }));
        await fertig(b.buch.animate([{ transform: mitte(false) }, { transform: mitte(false, -6), offset: .18 }, { transform: gezupft }],
          { duration: 650, easing: 'cubic-bezier(.64,0,.78,.39)', fill: 'forwards' }), 650);
        b.fleck.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 260, easing: 'ease-out', fill: 'forwards' });
        await fertig(b.buch.animate([{ transform: gezupft }, { transform: regal }], { duration: 220, easing: 'cubic-bezier(.3,0,.3,1)', fill: 'forwards' }), 220);
        b.buch.style.transform = regal; b.buch.style.zIndex = ''; b.deckel.style.transform = ''; b.fleck.style.opacity = '';
        b.innen.querySelector('.st-schatten').style.opacity = '';
        [...b.vorn.children].forEach(c => { c.style.opacity = ''; });
        andere.forEach(x => { x.buch.style.opacity = ''; });
        raum.style.transform = ''; raum.getAnimations({ subtree: true }).forEach(a => a.cancel());
        b.innenseite.replaceChildren();
      }
      laeuft = false;
      b.buch.focus({ preventScroll: true });
      if (!aufKarte()) api.weg();
      setTimeout(vorbereiten, 300);
    }
    const vorbereiten = () => {
      const i = buecher.findIndex(x => !x.leer);
      if (laeuft || !raum || !m || m.schmal || i < 0 || !aufKarte()) return;
      const b = buecher[i];
      b.buch.style.transform = mitte(false); const s0 = b.innen.getBoundingClientRect(); b.buch.style.transform = imRegal(i);
      abbild(b, seiteBei(s0, 1), api.main.getBoundingClientRect());
    };
    const schliessen = () => {
      removeEventListener('resize', neu); if (raum) raum.remove(); raum = null; laeuft = false;
      spaeter.splice(0).forEach(fn => { try { fn(); } catch (e) { console.warn(e); } });
    };
    let zuletzt = '';
    const neu = () => { const g = innerWidth + 'x' + innerHeight; if (g !== zuletzt && !laeuft && raum) { zuletzt = g; bauen(); setTimeout(vorbereiten, 600); } };
    addEventListener('resize', neu);
    neu();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { zuletzt = ''; neu(); });
    const erstes = raum.querySelector('.st-buch:not(.st-leer)');
    if (api.zurueck) rueckweg(); else if (erstes) erstes.focus({ preventScroll: true });
  }
  window.LB_START = { zeigen, offen: () => !!raum, nachher: (fn) => { if (raum) spaeter.push(fn); else fn(); } };
})();
