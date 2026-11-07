(() => {
  'use strict';
  const el = (tag, cls, inhalt) => { const e = document.createElement(tag); if (cls) e.className = cls; if (inhalt != null) e.append(inhalt); return e; };
  const fertig = (a, ms) => Promise.race([a.finished.catch(() => {}), new Promise(r => setTimeout(r, ms + 120))]);
  const VOKALE = ['A', 'I', 'O', 'U', 'E'];
  const FARBEN = [{ farbe: '#c99a4b', dunkel: '#9c7130', leinen: 'st-ocker' }, { farbe: '#9aa98f', dunkel: '#6c7a63', leinen: 'st-salbei' },
    { farbe: '#a7a0ad', dunkel: '#756e7c', leinen: 'st-taube' }];
  const LEER = { farbe: '#e9dfcf', dunkel: '#cfc2ad' };
  const PERSP = 1800;
  const PLAETZE = 3;

  const Z = { zupfen: 340, zugewandt: 900, mitte: 1080, auf: [900, 1900], kamera: [1450, 2700], kameraSchmal: 1250, aus: [2480, 2820] };
  const ENDE = Z.aus[1];
  const SCHRITT = 1000 / 60;
  const klemm = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, q) => a + (b - a) * q;
  const bezier = (x1, y1, x2, y2) => {
    const bx = (t) => 3 * x1 * t * (1 - t) ** 2 + 3 * x2 * t * t * (1 - t) + t ** 3, by = (t) => 3 * y1 * t * (1 - t) ** 2 + 3 * y2 * t * t * (1 - t) + t ** 3;
    const dbx = (t) => 3 * x1 * (1 - t) ** 2 + 6 * (x2 - x1) * t * (1 - t) + 3 * (1 - x2) * t * t;
    return (x) => {
      if (x <= 0) return 0; if (x >= 1) return 1;
      let t = x;
      for (let n = 0; n < 8; n++) { const d = dbx(t); if (Math.abs(d) < 1e-6) break; t = klemm(t - (bx(t) - x) / d); }
      let a = 0, b = 1; for (let n = 0; n < 20 && Math.abs(bx(t) - x) > 1e-5; n++) { if (bx(t) < x) a = t; else b = t; t = (a + b) / 2; }
      return by(t);
    };
  };
  const KURVE_AUF = bezier(.32, 0, .22, 1), KURVE_KAMERA = bezier(.4, 0, .2, 1), KURVE_KAMERA_RUECK = bezier(.38, 0, .62, 1), SANFT = bezier(.42, 0, .58, 1);
  const abschnitt = ([a, b], t, kurve) => kurve(klemm((t - a) / (b - a)));
  const bahn = (k) => {
    const n = k.length, m = new Array(n).fill(0), d = [];
    for (let i = 0; i < n - 1; i++) d.push((k[i + 1][1] - k[i][1]) / (k[i + 1][0] - k[i][0]));
    for (let i = 1; i < n - 1; i++) {
      const h0 = k[i][0] - k[i - 1][0], h1 = k[i + 1][0] - k[i][0];
      m[i] = d[i - 1] * d[i] > 0 ? 3 * (h0 + h1) / ((2 * h1 + h0) / d[i - 1] + (h1 + 2 * h0) / d[i]) : 0;
    }
    return (t) => {
      if (t <= k[0][0]) return k[0][1]; if (t >= k[n - 1][0]) return k[n - 1][1];
      let i = 0; while (t > k[i + 1][0]) i++;
      const h = k[i + 1][0] - k[i][0], s = (t - k[i][0]) / h, s2 = s * s, s3 = s2 * s;
      return (2 * s3 - 3 * s2 + 1) * k[i][1] + (s3 - 2 * s2 + s) * h * m[i] + (-2 * s3 + 3 * s2) * k[i + 1][1] + (s3 - s2) * h * m[i + 1];
    };
  };
  const zeiten = () => { const n = Math.ceil(ENDE / SCHRITT), r = []; for (let i = 0; i <= n; i++) r.push(ENDE * i / n); return r; };

  let raum = null, szene = null, nah = null, laeuft = false, instanz = null, lichter = [];
  const spaeter = [];
  const erweiterungen = []; let griffe = [];

  function zeigen(api) {
    if (raum) { erweiterungenAus(); raum.remove(); }
    laeuft = false;
    raum = el('div', 'st-raum'); raum.setAttribute('role', 'dialog'); raum.setAttribute('aria-label', 'Mein Lautbuch: Regal');
    const brett = el('div', 'st-brett-oben'), kante = el('div', 'st-brett-kante'), konsolen = [el('div', 'st-konsole'), el('div', 'st-konsole')];
    szene = el('div', 'st-szene'); nah = el('div', 'st-szene st-nah'); raum.append(szene, nah);
    szene.append(...konsolen, brett, kante);
    document.body.append(raum);
    const ruhig = () => (api.ruhig ? api.ruhig() : matchMedia('(prefers-reduced-motion: reduce)').matches);
    if (!ruhig()) { if (api.zurueck) raum.style.opacity = '0'; else api.main.classList.add('st-bereit'); }
    const daten = (Array.isArray(api.buecher) ? api.buecher : [api.buch]).slice(0, PLAETZE);
    while (daten.length < PLAETZE) daten.push(null);
    let aktiv = Number.isInteger(api.aktiv) && daten[api.aktiv] ? api.aktiv : daten.findIndex(Boolean);
    const oeffne = Number.isInteger(api.oeffne) && daten[api.oeffne] ? api.oeffne : -1;
    if (oeffne >= 0) aktiv = oeffne;
    const gezupftBei = oeffne >= 0 && !ruhig() ? oeffne : -1;
    let m = null, begleit = null;
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
      const { D, s } = m, lueck = D * s * .35, breite = PLAETZE * D * s + (PLAETZE - 1) * lueck;
      return m.VW / 2 - breite / 2 + i * (D * s + lueck) + D * s / 2;
    };
    const zImRegal = () => -(m.W * m.s / 2) - 14;
    const platz = (i) => {
      const { W, H, s, boden } = m, hoch = [1, .94, .97][i] * s;
      return { x: xImRegal(i) - W / 2, y: boden - H * hoch / 2 - H / 2, z: zImRegal(), s: hoch, ry: 90 };
    };
    const imRegal = (i) => tf(platz(i));
    const mitteL = (offen) => ({ x: m.VW / 2 - m.W / 2 + (offen && !m.schmal ? m.W / 2 : 0), y: m.VH / 2 - m.H / 2, z: 0, s: 1, ry: 0 });
    const proj = (x, y, z) => { const f = PERSP / (PERSP - z); return { x: m.VW / 2 + (x - m.VW / 2) * f, y: m.fy + (y - m.fy) * f, f }; };
    const bildVon = (b) => { const f = el('div', 'st-bild'); if (b.bild) { const im = new Image(); im.src = b.bild; im.alt = ''; im.decode().catch(() => {}); f.append(im); } else f.append('Aa'); return f; };
    const bauen = () => {
      erweiterungenAus();
      buecher.forEach(x => x.buch.remove()); buecher.length = 0;
      if (begleit) { begleit.knopf.remove(); begleit = null; }
      m = messen();
      const r = raum.style; r.setProperty('--st-w', m.W + 'px'); r.setProperty('--st-h', m.H + 'px'); r.setProperty('--st-d', m.D + 'px');
      szene.style.perspectiveOrigin = nah.style.perspectiveOrigin = `50% ${m.fy}px`;
      Object.assign(brett.style, { left: m.brettX + 'px', width: m.brettB + 'px', top: m.boden - m.tiefe + 'px', height: m.tiefe + 'px' });
      const kh = m.VH * .022, kb = Math.min(m.tiefe * .8, m.brettB * .22);
      Object.assign(kante.style, { left: m.brettX + 'px', width: m.brettB + 'px', top: m.boden + 'px', height: kh + 'px' });
      konsolen.forEach((k, j) => Object.assign(k.style, { left: m.brettX + m.brettB * (j ? .9 : .1) + 'px', top: m.boden + kh + 'px',
        width: kb + 'px', height: kb + 'px', transform: `translateZ(${-m.tiefe}px)` + (j ? ' scaleX(-1)' : '') }));
      brett.replaceChildren();
      daten.forEach((b, i) => {
        const p = b ? FARBEN[i] : LEER;
        const buch = el('button', 'st-buch' + (b ? ' ' + p.leinen : ' st-leer'));
        buch.type = 'button'; buch.setAttribute('aria-label', b ? 'Mein Lautbuch' + (b.name ? ' von ' + b.name : '') : 'freier Platz');
        buch.style.setProperty('--st-farbe', p.farbe); buch.style.setProperty('--st-dunkel', p.dunkel);
        const ruecken = el('div', 'st-ruecken');
        if (b) {
          const siegel = el('div', 'st-siegel'); for (let k = 0; k < (b.orte || 0); k++) siegel.append(el('i'));
          ruecken.append(bildVon(b), siegel);
          if (b.name) { ruecken.append(el('span', 'st-name', b.name)); ruecken.style.setProperty('--st-n', [...b.name].length); }
        }
        const innen = el('div', 'st-innen'); innen.append(el('div', 'st-schatten'));
        const deckel = el('div', 'st-deckel'), vorn = el('div', 'st-vorn');
        if (b) { const v = el('div', 'st-vokale'); VOKALE.forEach((x, k) => v.append(el('b', b.vokale && b.vokale[k] ? 'st-an' : '', x))); vorn.append(bildVon(b), el('div', 'st-titel', 'Mein Lautbuch'), v); }
        const innenseite = el('div', 'st-innenseite');
        deckel.append(vorn, innenseite);
        buch.append(el('div', 'st-rueckdeckel'), el('div', 'st-kopf'), el('div', 'st-fuss'), el('div', 'st-schnitt'), innen, ruecken, deckel);
        const eintrag = { i, buch, ruecken, deckel, innen, innenseite, vorn, schatten: innen.firstChild, leer: !b, daten: b, fleck: null };
        buch.style.transform = i === gezupftBei ? tf(bahnen(eintrag).lage(Z.zupfen)) : imRegal(i);
        buch.addEventListener('click', () => oeffnen(i));
        const fleck = el('div', 'st-fleck'), fs = fleck.style, fb = m.D * platz(i).s * 1.6, ft = m.W * platz(i).s * 1.04;
        Object.assign(fs, { left: xImRegal(i) - m.brettX - fb / 2 + 'px', top: m.tiefe + zImRegal() - ft / 2 + 'px', width: fb + 'px', height: ft + 'px' });
        brett.append(fleck); eintrag.fleck = fleck;
        if (i === gezupftBei) fs.opacity = bahnen(eintrag).fleck(Z.zupfen);
        (i === aktiv ? nah : szene).append(buch); buecher.push(eintrag);
      });
      if (api.handreichung) begleitBauen();
      erweiterungenAn();
    };
    const begleitMasse = () => {
      const { D, s, H, W } = m, lueck = D * s * .35, rechtsBuch = xImRegal(PLAETZE - 1) + D * s / 2;
      const lang = Math.min(H * s * .44, m.brettX + m.brettB - rechtsBuch - lueck * 2.4), dick = D * s * .4, tief = W * s * .62;
      return { links: rechtsBuch + lueck * 1.4, lang, dick, tief, z: zImRegal() };
    };
    const begleitBauen = () => {
      const g = begleitMasse(), knopf = el('button', 'st-begleit');
      knopf.type = 'button'; knopf.setAttribute('aria-label', 'Handreichung für die Begleitung');
      const vorn = el('div', 'st-bg-ruecken'), oben = el('div', 'st-bg-oben'), seite = el('div', 'st-bg-schnitt');
      vorn.append(el('span', null, 'Begleitung'));
      knopf.append(oben, seite, vorn);
      knopf.style.setProperty('--bg-l', g.lang + 'px'); knopf.style.setProperty('--bg-d', g.dick + 'px'); knopf.style.setProperty('--bg-t', g.tief + 'px');
      knopf.style.transform = `translate3d(${g.links}px, ${m.boden - g.dick}px, ${g.z}px)`;
      knopf.addEventListener('click', () => { if (laeuft) return; try { api.handreichung(); } catch (e) { console.warn(e); } });
      const fleck = el('div', 'st-fleck st-bg-fleck'), fs = fleck.style;
      Object.assign(fs, { left: g.links - m.brettX - g.lang * .06 + 'px', top: m.tiefe + g.z - g.tief * .58 + 'px', width: g.lang * 1.12 + 'px', height: g.tief * 1.16 + 'px' });
      brett.append(fleck);
      szene.append(knopf);
      begleit = { knopf, fleck, g };
    };
    const lage = () => {
      const zr = -14, buch = buecher.map(({ i }) => { const s = platz(i).s, a = proj(xImRegal(i) - m.D * s / 2, m.boden - m.H * s, zr), b = proj(xImRegal(i) + m.D * s / 2, m.boden, zr);
        return { links: a.x, rechts: b.x, oben: a.y, unten: b.y }; });
      let bg = null;
      if (begleit) { const { g } = begleit, a = proj(g.links, m.boden - g.dick, g.z + g.tief / 2), b = proj(g.links + g.lang, m.boden, g.z + g.tief / 2); bg = { links: a.x, rechts: b.x, oben: a.y, unten: b.y }; }
      const brettL = m.brettX, brettR = m.brettX + m.brettB;
      return { brett: { links: brettL, rechts: brettR, kante: m.boden, tiefe: m.tiefe }, buecher: buch, begleit: bg,
        frei: { links: [brettL, buch[0].links], rechts: [(bg || buch[buch.length - 1]).rechts, brettR] } };
    };
    const seiteVon = (l) => {
      const a = proj(l.x, l.y + 4, m.D / 2 - 2);
      return { left: a.x, top: a.y, width: (m.W - 4) * a.f, height: (m.H - 8) * a.f };
    };
    const aufSeite = (S, mr) => {
      const k = Math.max(S.height / mr.height, S.width / mr.width), ix = (mr.width - S.width / k) / 2, iy = (mr.height - S.height / k) / 2;
      return { k, ix, iy, px: S.left - mr.left - k * ix, py: S.top - mr.top - k * iy };
    };
    const flaeche = (S) => m.schmal ? S : { left: S.left - S.width, top: S.top, width: 2 * S.width, height: S.height };
    const rechtsAb = (S, A) => A.ix + (m.schmal ? 0 : S.width / A.k);
    const deckelKante = (x, q) => { const a = Math.PI * q; return proj(x + m.W * Math.cos(a), 0, m.D / 2 + m.W * Math.sin(a)).x; };
    const abbild = (b, mr) => {
      b.innenseite.replaceChildren(); b.spiegel = [];
      if (m.schmal) return;
      const S = seiteVon(mitteL(true)), A = aufSeite(flaeche(S), mr), sc = A.k * (m.W - 4) / S.width, box = el('div', 'st-abbild'), k = api.main.cloneNode(true);
      k.removeAttribute('id'); k.classList.remove('st-waechst', 'st-bereit'); k.setAttribute('aria-hidden', 'true'); k.inert = true;
      Object.assign(k.style, { position: 'absolute', left: '0px', top: '0px', margin: '0px', width: mr.width + 'px', height: mr.height + 'px', clipPath: 'none',
        transformOrigin: '0 0', transform: `scale(${sc}) translate(${-A.ix}px, ${-A.iy}px)` });
      box.append(k); b.innenseite.append(box);
      const orig = [...api.main.querySelectorAll('*')], kopie = [...k.querySelectorAll('*')], nr = new Map(orig.map((e, j) => [e, j]));
      api.main.getAnimations({ subtree: true }).forEach(a => {
        const ef = a.effect, j = ef && ef.target ? nr.get(ef.target) : undefined;
        if (j == null || ef.pseudoElement || !kopie[j]) return;
        try { const s = kopie[j].animate(ef.getKeyframes(), ef.getTiming()); s.pause(); s.currentTime = a.currentTime; b.spiegel.push([a, s]); } catch (e) {  }
      });
      b.abbildFuer = mr.width + 'x' + mr.height;
    };
    let angehalten = [];
    const karteAnhalten = (b) => {
      angehalten = api.main.getAnimations({ subtree: true }).filter(a => a.playState === 'running' && a.id !== 'lb-ruhe');
      angehalten.forEach(a => { try { a.pause(); } catch (e) {} });
      (b.spiegel || []).forEach(([a, s]) => { try { s.currentTime = a.currentTime; } catch (e) {} });
    };
    const karteWeiter = () => { angehalten.splice(0).forEach(a => { try { if (a.playState === 'paused') a.play(); } catch (e) {} }); };
    const karteHoch = (an) => { api.main.classList.toggle('st-waechst', an); };
    const aufKarte = () => document.body.classList.contains('auf-weg');

    const bahnen = (b) => {
      const P0 = platz(b.i), P1 = Object.assign({}, P0, { y: P0.y - m.H * m.s * .06, z: P0.z + 18, ry: 74 }), M = mitteL(false), dx = mitteL(true).x - M.x;
      const X = bahn([[0, P0.x], [Z.mitte, M.x]]), Y = bahn([[0, P0.y], [Z.zupfen, P1.y], [Z.mitte, M.y]]),
        ZZ = bahn([[0, P0.z], [Z.zupfen, P1.z], [Z.zugewandt, 0]]), S = bahn([[0, P0.s], [Z.zugewandt, 1]]), RY = bahn([[0, 90], [Z.zupfen, P1.ry], [Z.zugewandt, 0]]);
      return { lage: (t) => ({ x: X(t) + dx * abschnitt(Z.auf, t, KURVE_AUF), y: Y(t), z: ZZ(t), s: S(t), ry: RY(t) }),
        fleck: bahn([[0, 1], [Z.zupfen, .45], [620, 0]]) };
    };
    const spuren = (b, mr, rueck) => {
      const B = bahnen(b), FLECK = B.fleck;
      const S1 = seiteVon(mitteL(true)), A1 = aufSeite(flaeche(S1), mr), c1 = 1 / A1.k;
      const cx1 = mr.left - (mr.left + A1.px) * c1, cy1 = mr.top - (mr.top + A1.py) * c1;
      const fest = Math.abs(1 - c1) > 1e-6 ? { x: cx1 / (1 - c1), y: cy1 / (1 - c1) } : null;
      const kamera = (u) => { if (!fest) return { c: 1, tx: cx1 * u, ty: cy1 * u }; const c = Math.exp(Math.log(c1) * u); return { c, tx: fest.x * (1 - c), ty: fest.y * (1 - c) }; };
      const k = { buch: [], deckel: [], schatten: [], fleck: [], andere: [], bild: [], mainT: [], mainC: [], szene: [], raum: [] };
      for (const t of zeiten()) {
        const offset = t / ENDE, qA = abschnitt(Z.auf, t, KURVE_AUF), u = abschnitt([m.schmal ? Z.kameraSchmal : Z.kamera[0], rueck ? ENDE : Z.kamera[1]], t, rueck ? KURVE_KAMERA_RUECK : KURVE_KAMERA), aus = abschnitt(Z.aus, t, SANFT);
        const l = B.lage(t);
        k.buch.push({ offset, transform: tf(l) });
        k.deckel.push({ offset, transform: `translateZ(${m.D / 2}px) rotateY(${-180 * qA}deg)` });
        k.schatten.push({ offset, opacity: 1 - qA });
        k.fleck.push({ offset, opacity: FLECK(t) });
        const K = kamera(u);
        k.szene.push({ offset, transform: `translate(${K.tx}px, ${K.ty}px) scale(${K.c})` });
        k.raum.push({ offset, opacity: 1 - aus });
        const Sx = seiteVon(Object.assign({}, l, { z: 0, s: 1, ry: 0 })), A = aufSeite(flaeche(Sx), mr);
        let li;
        if (t < Z.auf[0]) li = mr.width - A.ix;
        else if (qA >= .9999) li = A.ix;
        else { const L = klemm(deckelKante(l.x, qA), Sx.left, Sx.left + Sx.width); li = rechtsAb(Sx, A) + (L - Sx.left) / A.k; }
        const w = klemm((u - .45) / .55), kk = K.c * A.k, px = K.c * (mr.left + A.px) + K.tx - mr.left, py = K.c * (mr.top + A.py) + K.ty - mr.top;
        const ins = [A.iy, A.ix, A.iy, li].map(v => lerp(v, 0, w));
        k.mainT.push({ offset, transform: `translate(${px}px, ${py}px) scale(${kk})` });
        k.mainC.push({ offset, clipPath: `inset(${ins[0]}px ${ins[1]}px ${ins[2]}px ${ins[3]}px)` });
      }
      k.andere = sanft(180, 780, 1, .28); k.bild = sanft(440, 780, 0, 1);
      Object.keys(k).forEach(n => { k[n] = dicht(k[n]); });
      return k;
    };
    const sanft = (a, b, von, bis) => [{ offset: 0, opacity: von }, { offset: a / ENDE, opacity: von, easing: 'cubic-bezier(.33, 0, .67, 1)' }, { offset: b / ENDE, opacity: bis }, { offset: 1, opacity: bis }];
    const gleich = (x, y) => Object.keys(x).every(n => n === 'offset' || n === 'easing' || x[n] === y[n]);
    const dicht = (kf) => kf.filter((x, i) => i === 0 || i === kf.length - 1 || !(gleich(x, kf[i - 1]) && gleich(x, kf[i + 1])));
    const ANIM = { duration: ENDE, easing: 'linear', fill: 'both' };
    const abspielen = (b, mr, richtung, ab = 0, vorab = null) => {
      const k = vorab || spuren(b, mr, richtung === 'reverse'), o = Object.assign({}, ANIM, { direction: richtung }), alle = [];
      const an = (e, kf) => { if (e) { const a = e.animate(kf, o); if (ab) a.currentTime = ab; alle.push(a); } };
      an(b.buch, k.buch); an(b.deckel, k.deckel); an(b.schatten, k.schatten); an(b.fleck, k.fleck);
      [...b.vorn.children].forEach(c => an(c, k.bild));
      const flaechen = (e) => [...e.children].flatMap(c => c.classList.contains('st-deckel') ? [...c.children] : [c]);
      buecher.filter(x => x !== b).forEach(x => flaechen(x.buch).forEach(f => an(f, k.andere)));
      if (begleit) { flaechen(begleit.knopf).forEach(f => an(f, k.andere)); an(begleit.fleck, k.andere); }
      (b.lichter || []).forEach(([e, o]) => an(e, sanft(Z.zupfen, Z.zugewandt, o, 0)));
      ruheKamera(false);
      an(nah, k.szene); an(raum, k.raum); an(api.main, k.mainT); an(api.main, k.mainC);
      return alle;
    };
    const leisten = () => [...document.body.children].filter(e => e !== api.main && e !== raum && !/^(SCRIPT|STYLE|LINK|DIALOG|TEMPLATE)$/.test(e.tagName)
      && getComputedStyle(e).position === 'fixed' && e.getBoundingClientRect().width > 0);
    const LEISTEN = { duration: 240, easing: 'ease-out' };
    const bereit = (b) => {
      const mr = api.main.getBoundingClientRect();
      if (!m.schmal && (!b.innenseite.firstChild || b.abbildFuer !== mr.width + 'x' + mr.height)) abbild(b, mr);
      karteAnhalten(b);
      b.leisten = leisten();
      b.lichter = lichter.filter(e => e.isConnected).map(e => [e, +getComputedStyle(e).opacity]).filter(([, o]) => o > 0);
      return mr;
    };
    const wackeln = (i) => {
      const p = platz(i), kf = [];
      for (let n = 0; n <= 36; n++) { const t = n / 36; kf.push({ offset: t, transform: tf(Object.assign({}, p, { ry: 90 - 7 * Math.sin(Math.PI * 2 * t * 1.5) * Math.exp(-3.2 * t) * Math.min(1, t * 12) })) }); }
      buecher[i].buch.animate(kf, { duration: 720, easing: 'linear' });
    };
    const zupfen = (b) => {
      const B = bahnen(b), kf = [], kfF = [];
      for (let n = 0; n <= 20; n++) { const t = Z.zupfen * n / 20; kf.push({ offset: n / 20, transform: tf(B.lage(t)) }); kfF.push({ offset: n / 20, opacity: B.fleck(t) }); }
      const o = { duration: Z.zupfen, easing: 'linear', fill: 'forwards' };
      b.fleck.animate(kfF, o);
      return b.buch.animate(kf, o);
    };
    async function oeffnen(i, ab = 0) {
      const b = buecher[i];
      if (laeuft || !raum || !b) return;
      if (b.leer) { if (!ruhig()) wackeln(i); return; }
      laeuft = true;
      if (i !== aktiv && api.waehle) {
        erweiterungenAus(); b.buch.blur();
        if (!ruhig()) { b.buch.style.zIndex = 3; await fertig(zupfen(b), Z.zupfen); }
        let ok = false; try { ok = await api.waehle(i); } catch (e) { console.warn(e); }
        if (ok === false || !raum) return;
        aktiv = i; b.abbildFuer = null;
        if (!ruhig()) ab = Z.zupfen;
      }
      erweiterungenAus();
      b.buch.blur();
      if (!aufKarte()) api.weg();
      if (ruhig()) { await fertig(raum.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 400, easing: 'ease-out', fill: 'forwards' }), 400); schliessen(); return; }
      const mr = bereit(b);
      karteHoch(true);
      const alle = abspielen(b, mr, 'normal', ab);
      if (ab) [b.buch, b.fleck].forEach(e => e.getAnimations().filter(a => !alle.includes(a)).forEach(a => a.cancel()));
      await fertig(alle[0], ENDE - ab);
      karteHoch(false); alle.forEach(a => a.cancel());
      karteWeiter();
      const ls = b.leisten || [];
      schliessen();
      ls.forEach(e => e.animate([{ opacity: 0 }, { opacity: 1 }], LEISTEN));
    }
    async function rueckweg() {
      const i = aktiv, b = buecher[i];
      if (i < 0 || !b) return;
      laeuft = true;
      erweiterungenAus();
      if (ruhig()) await fertig(raum.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, easing: 'ease-out' }), 400);
      else {
        b.abbildFuer = null;
        const mr = bereit(b), k = spuren(b, mr, true);
        const weg = b.leisten.map(e => e.animate([{ opacity: 1 }, { opacity: 0 }], Object.assign({ fill: 'forwards' }, LEISTEN)));
        if (weg.length) await fertig(weg[0], LEISTEN.duration);
        api.main.classList.add('st-bereit'); raum.style.opacity = ''; karteHoch(true);
        const alle = abspielen(b, mr, 'reverse', 0, k);
        weg.forEach(a => a.cancel());
        await fertig(alle[0], ENDE);
        karteHoch(false); api.main.getAnimations().forEach(a => a.cancel());
        karteWeiter();
        b.buch.style.transform = imRegal(i); raum.getAnimations({ subtree: true }).forEach(a => a.cancel());
      }
      laeuft = false;
      b.buch.focus({ preventScroll: true });
      const neuGebaut = !aufKarte();
      if (neuGebaut) api.weg();
      vorbereiten(neuGebaut);
      erweiterungenAn();
    }
    let ruhen = [];
    const ruheKamera = (an, mr) => {
      ruhen.splice(0).forEach(a => { try { a.cancel(); } catch (e) {} });
      if (!an || !nah || !m) return;
      const A1 = aufSeite(flaeche(seiteVon(mitteL(true))), mr), c1 = Math.max(1, 1 / A1.k) / platz(aktiv).s, z = 'translate(0px, 0px) scale(1)';
      const leer = { clipPath: 'inset(0px 0px 0px 100%)' }, lang = { duration: 1e9 };
      ruhen = [nah.animate([{ offset: 0, transform: z }, { offset: .999999, transform: z }, { offset: 1, transform: `translate(0px, 0px) scale(${c1})` }], lang),
        api.main.animate([{ transform: z }, { transform: z }], lang), api.main.animate([leer, leer], lang)];
      ruhen.forEach(a => { a.id = 'lb-ruhe'; });
    };
    const vorbereiten = (neu = false) => {
      const b = buecher[aktiv];
      if (laeuft || !raum || !m || !b || !aufKarte()) return;
      const mr = api.main.getBoundingClientRect();
      if (!m.schmal && (neu || !b.innenseite.firstChild || b.abbildFuer !== mr.width + 'x' + mr.height)) abbild(b, mr);
      ruheKamera(true, mr);
    };
    const schliessen = () => {
      ruheKamera(false);
      erweiterungenAus();
      removeEventListener('resize', neu); if (raum) raum.remove(); raum = null; laeuft = false; instanz = null;
      api.main.classList.remove('st-bereit');
      spaeter.splice(0).forEach(fn => { try { fn(); } catch (e) { console.warn(e); } });
    };
    let zuletzt = '';
    const neu = () => { const g = innerWidth + 'x' + innerHeight; if (g !== zuletzt && !laeuft && raum) { zuletzt = g; bauen(); setTimeout(vorbereiten, 600); } };
    instanz = { kontext: () => ({ raum, szene, nah, buecher: buecher.map(({ i, buch, ruecken, deckel, vorn, leer, daten: d }) => ({ i, knopf: buch, ruecken, deckel, vorn, leer, daten: d })),
      begleit: begleit ? begleit.knopf : null, m, lage: lage(), ruhig, still: () => !laeuft,
      verblasst: (e) => { lichter = lichter.filter(x => x.isConnected); if (e && !lichter.includes(e)) lichter.push(e); } }) };
    addEventListener('resize', neu);
    neu();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (!laeuft && raum) { zuletzt = ''; neu(); } });
    const erstes = buecher[aktiv] && buecher[aktiv].buch;
    const einblenden = (dann) => {
      const quellen = new Set();
      [raum, ...raum.querySelectorAll('*')].forEach(e => {
        for (const u of getComputedStyle(e).backgroundImage.matchAll(/url\("?([^")]+)"?\)/g)) quellen.add(u[1]);
        if (e.tagName === 'IMG' && e.src) quellen.add(e.src);
      });
      const bilder = [...quellen].map(u => { const im = new Image(); im.src = u; return im; });
      if (bilder.every(im => im.complete)) { dann(); return; }
      const schleier = el('div', 'st-schleier'); raum.append(schleier);
      Promise.race([Promise.all(bilder.map(im => im.decode().catch(() => {}))), new Promise(ok => setTimeout(ok, 2500))]).then(() => {
        if (!schleier.isConnected) return;
        schleier.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 500, easing: 'ease-out', fill: 'forwards' }).onfinish = () => schleier.remove();
        dann();
      });
    };
    if (api.zurueck) rueckweg();
    else if (oeffne >= 0) {
      requestAnimationFrame(() => requestAnimationFrame(() => { if (raum && !laeuft) oeffnen(oeffne, gezupftBei >= 0 ? Z.zupfen : 0); }));
    } else if (erstes) einblenden(() => erstes.focus({ preventScroll: true }));
  }
  function erweiterungenAn() {
    erweiterungenAus();
    if (!instanz) return;
    erweiterungen.forEach(fn => { try { const g = fn(instanz.kontext()); if (g) griffe.push(g); } catch (e) { console.warn(e); } });
  }
  function erweiterungenAus() { griffe.splice(0).forEach(g => { try { if (g.aus) g.aus(); } catch (e) { console.warn(e); } }); }
  const erweitern = (fn) => {
    if (typeof fn !== 'function') return;
    erweiterungen.push(fn);
    if (instanz && raum && !laeuft) { try { const g = fn(instanz.kontext()); if (g) griffe.push(g); } catch (e) { console.warn(e); } }
  };
  window.LB_START = { zeigen, erweitern, offen: () => !!raum, laeuft: () => laeuft, nachher: (fn) => { if (raum) spaeter.push(fn); else fn(); } };
})();
export default window.LB_START;
