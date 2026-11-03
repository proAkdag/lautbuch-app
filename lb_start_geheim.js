(() => {
  'use strict';
  if (!window.LB_START || !window.LB_START.erweitern) return;
  const el = (tag, cls, inhalt) => { const e = document.createElement(tag); if (cls) e.className = cls; if (inhalt != null) e.append(inhalt); return e; };
  const bild = (k) => { const d = (window.LB_BILDDATEN || {})[k]; return d ? (d.klein || d.farbe) : null; };
  const zufall = (liste) => liste[Math.floor(Math.random() * liste.length)];
  const WOERTER = ['Mama', 'Oma', 'Opa', 'Lama', 'Mimi', 'Uhu', 'Esel', 'Igel', 'Ofen', 'Rose', 'Nase', 'Hose', 'Dose', 'Salat', 'Tomate',
    'Limo', 'Sofa', 'Auto', 'Eis', 'Mut', 'Tal', 'Mais', 'Seil', 'Maus', 'Haus', 'Baum', 'Name', 'Wolke', 'Blume', 'Sonne'];
  const MEHR = ['sch', 'ch', 'ei', 'au', 'eu', 'ie'];
  const zerlege = (w) => { const t = []; w = w.toLowerCase(); for (let i = 0; i < w.length;) { const m = MEHR.find(x => w.startsWith(x, i)); t.push(m || w[i]); i += m ? m.length : 1; } return t; };
  const lesbar = (laute) => { const s = new Set(laute.map(x => String(x).toLowerCase())); return WOERTER.filter(w => zerlege(w).every(t => s.has(t))); };
  const P = window.LB_START_GEHEIM = Object.assign({ stunde: null, monat: null, takt: 1, zustand: null }, window.LB_START_GEHEIM || {});
  let nachtWahl = null;

  LB_START.erweitern((ctx) => {
    const raum = ctx.raum, ruhig = () => (ctx.ruhig ? ctx.ruhig() : matchMedia('(prefers-reduced-motion: reduce)').matches);
    raum.querySelectorAll('[class^="sg-"], [class*=" sg-"]').forEach(e => { if (!e.closest('.st-buch') || e.classList.contains('sg-turm')) e.remove(); });
    const halt = new AbortController();
    const uhren = [], kurz = [], eigene = [];
    const nach = (ms, fn) => uhren.push(setTimeout(fn, ms * P.takt));
    const danach = (ms, fn) => { const t = setTimeout(fn, ms); kurz.push(t); return t; };
    const setze = (e, o) => { Object.assign(e.style, o); return e; };
    const px = (n) => Math.round(n) + 'px';
    const VW = innerWidth, VH = innerHeight, schmal = VW < 600;
    const kante = raum.querySelector('.st-brett-kante');
    const plaetze = (ctx.buecher || []).filter(b => b && b.knopf), alle = plaetze.map(b => b.knopf);
    if (!kante || !alle.length) return null;
    const flaeche = (p) => (p.ruecken || p.knopf).getBoundingClientRect();
    const K = kante.getBoundingClientRect(), R = plaetze.map(flaeche);
    const fuss = K.top - 3, links = Math.min(...R.map(r => r.left)), rechts = Math.max(...R.map(r => r.right)), oben = Math.min(...R.map(r => r.top));
    const freiAb = ctx.begleit ? Math.max(rechts, (ctx.begleit.querySelector('.st-bg-ruecken') || ctx.begleit).getBoundingClientRect().right) + 10 : rechts + 16, freiBis = K.right - 12;
    const paare = plaetze.filter(b => !b.leer).map(b => ({ b: b.knopf, ruecken: b.ruecken, r: flaeche(b), d: b.daten || {} }));
    const haupt = paare.find(p => p.d.aktiv) || paare[0], erstes = haupt ? haupt.d : {};
    const laute = (erstes.laute && erstes.laute.length ? [...erstes.laute] : ['a', 'i', 'o', 'u', 'e'].filter((v, k) => erstes.vokale && erstes.vokale[k])).map(String);
    const stunde = P.stunde != null ? P.stunde : new Date().getHours(), monat = P.monat != null ? P.monat : new Date().getMonth() + 1;
    const tageszeit = stunde >= 20 || stunde < 6 ? 'nacht' : stunde < 10 ? 'morgen' : stunde < 17 ? 'tag' : 'abend';
    const jahreszeit = monat === 12 || monat <= 2 ? 'winter' : monat >= 9 ? 'herbst' : 'sommer';
    const nacht = () => (nachtWahl != null ? nachtWahl : tageszeit === 'nacht');
    const szene = ctx.szene || raum;
    const zu = (e, vor) => { e.setAttribute('aria-hidden', 'true'); if (vor) vor.parentNode.insertBefore(e, vor); else raum.append(e); return e; };
    const wand = zu(el('div', 'sg-wand'), szene.parentNode === raum ? szene : raum.firstChild);
    const zuWand = (e) => { e.setAttribute('aria-hidden', 'true'); wand.append(e); return e; };
    const zuSzene = (e) => { e.setAttribute('aria-hidden', 'true'); szene.append(e); return e; };
    const zuHinten = (e) => { const b = [...szene.children].find(c => c.classList.contains('st-buch')); e.setAttribute('aria-hidden', 'true'); szene.insertBefore(e, b || null); return e; };

    const licht = zu(el('div', 'sg-licht sg-zeit-' + tageszeit));
    const dunkel = zu(el('div', 'sg-dunkel'));
    setze(dunkel, { opacity: nacht() ? 1 : 0, backgroundPosition: '0 0' });
    dunkel.style.setProperty('--sg-x', px((links + rechts) / 2)); dunkel.style.setProperty('--sg-y', px(fuss - (fuss - oben) * .4));

    const fw = schmal ? VW * .32 : Math.min(VW * .16, (fuss - VH * .24) / 1.17), fh = fw * 896 / 768;
    const fenster = zuWand(el('div', 'sg-fenster'));
    setze(fenster, { left: px(schmal ? VW * .1 : VW * .1), top: px(schmal ? VH * .07 : VH * .08), width: px(fw), height: px(fh) });
    const blick = el('div', 'sg-blick'), himmel = el('div', 'sg-himmel'), rahmen = el('div', 'sg-rahmen');
    fenster.append(blick, himmel, rahmen);
    const blickSetzen = () => {
      blick.className = 'sg-blick sg-' + (nacht() ? 'nacht' : jahreszeit === 'sommer' ? 'tag' : jahreszeit);
      himmel.replaceChildren();
      if (nacht()) {
        const plaetze = [[.18, .14], [.66, .1], [.42, .22], [.84, .3], [.2, .4], [.18, .62]];
        plaetze.forEach(([x, y], k) => { const s = el('span', 'sg-stern', laute.length ? laute[k % laute.length] : ''); setze(s, { left: x * 100 + '%', top: y * 100 + '%' }); himmel.append(s); });
      }
      setze(dunkel, { opacity: nacht() ? 1 : 0 });
      if (!ruhig()) danach(4000, jahreszeitZiehen);
    };
    const jahreszeitZiehen = () => {
      if (jahreszeit === 'sommer' || ruhig()) return;
      for (let k = 0; k < 6; k++) {
        const f = el('i', 'sg-' + (jahreszeit === 'winter' ? 'flocke' : 'blatt'));
        setze(f, { left: (8 + k * 15) + '%', top: '-8%' }); himmel.append(f);
        eigene.push(f.animate([{ transform: 'translate(0, 0) rotate(0deg)' }, { transform: `translate(${k % 2 ? 8 : -8}px, ${fh * 1.1}px) rotate(${jahreszeit === 'winter' ? 0 : 200}deg)` }],
          { duration: 9000 + k * 1300, delay: k * 1700, iterations: 3, easing: 'linear' }));
      }
    };
    let fensterTipps = [];
    const fensterTipp = zu(el('button', 'sg-tipp'));
    fensterTipp.type = 'button'; fensterTipp.tabIndex = -1;
    setze(fensterTipp, { left: fenster.style.left, top: fenster.style.top, width: px(Math.max(fw, 48)), height: px(Math.max(fh, 48)) });
    fensterTipp.addEventListener('click', () => {
      if (ruhig()) return;
      const jetzt = performance.now(); fensterTipps = fensterTipps.filter(t => jetzt - t < 1500); fensterTipps.push(jetzt);
      if (fensterTipps.length < 3) return;
      fensterTipps = []; nachtWahl = !nacht();
      eigene.forEach(a => a.cancel()); eigene.length = 0;
      dunkel.animate([{ opacity: nachtWahl ? 0 : 1 }, { opacity: nachtWahl ? 1 : 0 }], { duration: 1200, easing: 'ease-in-out' });
      blickSetzen(); lampeSchein();
    });

    const lw = schmal ? VW * .13 : VW * .065, lh = lw * 512 / 384;
    const lampe = zuWand(el('div', 'sg-lampe')), schein = zuWand(el('div', 'sg-schein'));
    const lx = schmal ? VW * .74 : VW * .8, ly = schmal ? VH * .09 : VH * .1;
    setze(lampe, { left: px(lx), top: px(ly), width: px(lw), height: px(lh) });
    setze(schein, { left: px(lx + lw / 2 - lw * 2.2), top: px(ly + lh * .55 - lw * 2.2), width: px(lw * 4.4), height: px(lw * 4.4) });
    const lampeSchein = () => setze(schein, { opacity: nacht() ? .9 : .35 });
    lampeSchein();
    const schatten = zuWand(el('div', 'sg-schatten-wand'));
    const lampeTipp = zu(el('button', 'sg-tipp'));
    lampeTipp.type = 'button'; lampeTipp.tabIndex = -1;
    setze(lampeTipp, { left: px(lx - 8), top: px(ly - 8), width: px(Math.max(lw + 16, 48)), height: px(Math.max(lh + 16, 48)) });
    let flackert = false;
    lampeTipp.addEventListener('click', () => {
      if (ruhig() || flackert) return;
      flackert = true;
      const o = +schein.style.opacity;
      eigene.push(schein.animate([o, o * .62, o, o * .7, o * .95, o * .58, o * .9, o].map(x => ({ opacity: x })), { duration: 2400, easing: 'ease-in-out' }));
      schatten.replaceChildren(...bewohnerBilder.map(b => { const s = b.cloneNode(true); s.className = 'sg-schatten'; setze(s, { left: px(parseFloat(b.style.left) - 10), top: px(parseFloat(b.style.top) - b.offsetHeight * .7) }); return s; }));
      [...schatten.children].forEach((s, k) => eigene.push(s.animate([{ transform: 'skewX(0deg) scale(1.15)', opacity: 0 }, { transform: 'skewX(-9deg) scale(1.22)', opacity: .22, offset: .3 },
        { transform: 'skewX(7deg) scale(1.18)', opacity: .18, offset: .65 }, { transform: 'skewX(0deg) scale(1.15)', opacity: 0 }], { duration: 2400, delay: k * 60, easing: 'ease-in-out' })));
      danach(2500, () => { flackert = false; schatten.replaceChildren(); });
    });

    const bh = Math.min(VH * (schmal ? .07 : .12), (paare[0] ? paare[0].r.height : VH * .3) * .42);
    const bewohnerBilder = [];
    let x = links - 10;
    for (const k of [...(erstes.bewohner || [])].reverse()) {
      const src = bild(k); if (!src) continue;
      if (x - bh < K.left + 8) break;
      const im = zuHinten(new Image()); im.className = 'sg-bewohner'; im.src = src; im.alt = '';
      setze(im, { left: px(x - bh), top: px(fuss - bh), width: px(bh), height: px(bh) });
      bewohnerBilder.push(im); x -= bh * .92;
    }
    const rechtsFrei = [freiAb, freiBis], linksFrei = [K.left + 12, (bewohnerBilder.length ? x + bh * .92 - bh : links) - 12];
    const streifen = rechtsFrei[1] - rechtsFrei[0] >= linksFrei[1] - linksFrei[0] ? rechtsFrei : linksFrei;

    const lmh = Math.min(VH * (schmal ? .1 : .17), (oben < fuss ? (fuss - oben) * .55 : VH * .15)), lmb = lmh * .82;
    const raumRechts = K.right - 6 - rechts;
    const gefallen = [];
    if (raumRechts > lmb * .35 && bild('fig-lama-seite')) {
      const letztes = R[R.length - 1], lama = zuHinten(el('div', 'sg-lama')), figur = el('div', 'sg-lama-figur'), lim = new Image();
      lim.src = bild('fig-lama-seite'); lim.alt = ''; figur.append(lim); lama.append(figur);
      setze(lama, { left: px(letztes.left), top: px(fuss - lmh), width: px(K.right - letztes.left), height: px(lmh + 2) });
      setze(figur, { left: px(rechts - letztes.left - lmb * .62), top: '0px', width: px(lmb), height: px(lmh) });
      const lamaTipp = zu(el('button', 'sg-tipp'));
      lamaTipp.type = 'button'; lamaTipp.tabIndex = -1;
      setze(lamaTipp, { left: px(rechts), top: px(fuss - lmh), width: px(Math.max(lmb * .5, 48)), height: px(Math.max(lmh * .6, 48)) });
      let stufe = 0, zurueck = 0;
      const lage = (s) => `translateX(${[0, lmb * .5, lmb * .5][s]}px)`;
      lamaTipp.addEventListener('click', () => {
        if (ruhig()) return;
        clearTimeout(zurueck);
        if (stufe === 0) { stufe = 1; eigene.push(figur.animate([{ transform: lage(0) }, { transform: lage(1) }], { duration: 520, easing: 'cubic-bezier(.3,0,.3,1)', fill: 'forwards' })); }
        else {
          eigene.push(figur.animate([{ transform: lage(1) }, { transform: lage(1) + ' rotate(-6deg) scale(.97)', offset: .45 }, { transform: lage(1) + ' rotate(5deg) scale(1.03)', offset: .62 }, { transform: lage(1) }],
            { duration: 700, easing: 'ease-in-out', fill: 'forwards' }));
          niesen(rechts + lmb * .45, fuss - lmh * .72);
        }
        zurueck = danach(5000, () => { if (stufe) { stufe = 0; eigene.push(figur.animate([{ transform: lage(1) }, { transform: lage(0) }], { duration: 700, easing: 'ease-in-out', fill: 'forwards' })); } });
      });
    }
    const niesen = (x0, y0) => {
      const frei = Math.max(0, streifen[1] - streifen[0] - 24);
      const ziel = streifen[0] + (gefallen.length * 31) % Math.max(frei, 1), b = laute.length ? zufall(laute) : '';
      const f = zuSzene(el('span', b ? 'sg-buchstabe' : 'sg-staub', b));
      setze(f, { left: px(ziel), top: px(fuss - VH * .045) });
      eigene.push(f.animate([{ transform: `translate(${x0 - ziel}px, ${y0 - fuss}px) rotate(-30deg) scale(.4)`, opacity: 0 }, { transform: `translate(${(x0 - ziel) / 2}px, ${y0 - fuss - VH * .06}px) rotate(80deg) scale(.9)`, opacity: 1, offset: .45 },
        { transform: 'translate(0, 0) rotate(-8deg) scale(1)', opacity: 1, offset: .85 }, { transform: 'translate(0, -4px) rotate(-6deg) scale(1)', opacity: 1, offset: .93 }, { transform: 'translate(0, 0) rotate(-8deg) scale(1)', opacity: 1 }],
        { duration: 900, easing: 'cubic-bezier(.3,.1,.4,1)', fill: 'forwards' }));
      if (b) gefallen.push(f); else danach(1200, () => f.remove());
    };

    plaetze.filter(p => p.leer).forEach((p) => {
      const b = p.knopf, ruhe = flaeche(p);
      let tipps = [];
      raum.addEventListener('pointerdown', (ev) => {
        if (ruhig() || ev.clientX < ruhe.left || ev.clientX > ruhe.right || ev.clientY < ruhe.top || ev.clientY > ruhe.bottom) return;
        const jetzt = performance.now(); tipps = tipps.filter(t => jetzt - t < 1600); tipps.push(jetzt);
        if (tipps.length < 3) return;
        tipps = [];
        const h = ruhe.height;
        eigene.push(b.animate([{ transform: 'translateY(0px)', easing: 'ease-out' }, { transform: `translateY(${-h * .16}px)`, offset: .45, easing: 'ease-in' },
          { transform: 'translateY(0px)', offset: .78, easing: 'ease-out' }, { transform: `translateY(${-h * .025}px)`, offset: .88, easing: 'ease-in' }, { transform: 'translateY(0px)' }],
          { duration: 900, delay: 380, easing: 'linear', composite: 'add' }));
        danach(380 + 700, () => staub(ruhe));
      }, { capture: true, signal: halt.signal });
    });
    const staub = (r) => {
      for (let k = 0; k < 5; k++) {
        const s = zuSzene(el('i', 'sg-wolke')), d = 10 + k * 3;
        setze(s, { left: px(r.left + r.width * (k / 4)), top: px(fuss - 8), width: px(d), height: px(d) });
        const a = s.animate([{ transform: 'translate(0,0) scale(.6)', opacity: .6 }, { transform: `translate(${(k - 2) * 9}px, -16px) scale(1.4)`, opacity: 0 }], { duration: 900, easing: 'ease-out', fill: 'forwards' });
        eigene.push(a); a.finished.then(() => s.remove()).catch(() => s.remove());
      }
    };

    paare.forEach(({ b, ruecken, r, d }) => {
      const turm = ((window.LAUTBUCH_WEG_BILDER || {}).farbe || {}).leuchtturm;
      if (d.fertig && turm) {
        if (ruecken) { const t = new Image(); t.className = 'sg-turm'; t.src = turm; t.alt = ''; ruecken.append(t); }
      }
      if (d.hier) {
        const band = zu(el('i', 'sg-band'), b);
        setze(band, { left: px(r.left + r.width * .62), top: px(fuss - 6), height: px(VH * (schmal ? .05 : .07)) });
      }
    });

    const z = zuSzene(el('div', 'sg-zz'));
    const kopf = haupt && haupt.ruecken && haupt.ruecken.querySelector('.st-bild');
    if (haupt) setze(z, { left: px(haupt.r.right - 4), top: px(haupt.r.top - VH * .02) });
    let falter = null, wort = null, schlaeft = false;
    const schlaf = (() => {
      const D = window.LB_BILDDATEN || {}, k = Object.keys(D).find(x => /^fig-.+-vorn$/.test(x) && erstes.bild && (D[x].klein || D[x].farbe) === erstes.bild);
      if (!k || !kopf) return null;
      const im = new Image(); im.className = 'sg-schlaf'; im.alt = ''; im.src = 'start/sg-schlaeft-' + k.slice(4, -5) + '.webp'; im.decode().catch(() => {});
      return im;
    })();
    const einnicken = () => {
      if (!kopf) return;
      schlaeft = true;
      if (schlaf && schlaf.complete && schlaf.naturalWidth) {
        kopf.append(schlaf);
        eigene.push(schlaf.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 2200, delay: 400, easing: 'ease-in-out', fill: 'both' }));
      }
      eigene.push(kopf.animate([{ transform: 'rotate(0deg) translateY(0)' }, { transform: 'rotate(-16deg) translateY(4%)' }], { duration: 2600, easing: 'ease-in-out', fill: 'forwards' }));
      z.replaceChildren(el('b', '', 'z'), el('b', '', 'z'));
      [...z.children].forEach((c, k) => eigene.push(c.animate([{ transform: 'translate(0,0) scale(.6)', opacity: 0 }, { transform: `translate(${6 + k * 6}px, ${-18 - k * 10}px) scale(1)`, opacity: .75, offset: .4 },
        { transform: `translate(${10 + k * 8}px, ${-34 - k * 14}px) scale(1.1)`, opacity: 0 }], { duration: 3400, delay: 1800 + k * 900, iterations: 3, easing: 'ease-out', fill: 'backwards' })));
    };
    const aufwachen = () => {
      if (!schlaeft) return;
      schlaeft = false; z.replaceChildren();
      if (schlaf && schlaf.isConnected) {
        const o = getComputedStyle(schlaf).opacity; schlaf.getAnimations().forEach(a => a.cancel());
        schlaf.animate([{ opacity: o }, { opacity: 0 }], { duration: 380, fill: 'forwards' }).onfinish = () => schlaf.remove();
      }
      if (kopf) { kopf.getAnimations().forEach(a => a.cancel()); kopf.animate([{ transform: 'rotate(-16deg) translateY(4%)' }, { transform: 'rotate(0deg) translateY(0)' }], { duration: 380, easing: 'ease-out' }); }
    };
    const falterFlug = () => {
      if (falter) return;
      falter = zuWand(el('div', 'sg-falter')); falter.append(el('i', 'sg-fluegel'));
      const g = Math.max(28, lw * .6), zx = lx + lw * .5 - g / 2, zy = ly + lh * .78;
      setze(falter, { left: px(zx), top: px(zy), width: px(g), height: px(g) });
      const sx = (schmal ? -VW * .2 : -VW * .35), sy = VH * .5;
      eigene.push(falter.animate([{ transform: `translate(${sx}px, ${sy}px) rotate(40deg)` }, { transform: `translate(${sx * .6}px, ${sy * .4}px) rotate(10deg)`, offset: .35 },
        { transform: `translate(${sx * .2}px, ${sy * .55}px) rotate(-20deg)`, offset: .6 }, { transform: `translate(${-g * .8}px, ${-g * .3}px) rotate(15deg)`, offset: .85 }, { transform: 'translate(0,0) rotate(0deg)' }],
        { duration: 7000, easing: 'ease-in-out', fill: 'forwards' }));
      eigene.push(falter.firstChild.animate([{ transform: 'scaleX(1)' }, { transform: 'scaleX(.35)' }, { transform: 'scaleX(1)' }], { duration: 260, iterations: 27, easing: 'ease-in-out' }));
    };
    const wortLegen = () => {
      if (wort) return;
      const ws = lesbar(laute); if (!ws.length) return;
      const g = Math.max(18, VH * .04), frei = streifen[1] - streifen[0], passend = ws.filter(w => w.length * g * .62 <= frei);
      if (!passend.length) return;
      const w = zufall(passend), breite = w.length * g * .62;
      gefallen.forEach(f => eigene.push(f.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 600, fill: 'forwards' })));
      wort = zuSzene(el('div', 'sg-wort'));
      const x0 = streifen[0] + (frei - breite) / 2;
      setze(wort, { left: px(x0), top: px(fuss - g * 1.25), fontSize: px(g) });
      [...w].forEach((c, k) => {
        const s = el('span', '', c); wort.append(s);
        eigene.push(s.animate([{ transform: `translate(${(k - w.length / 2) * 22}px, ${-g * 1.6}px) rotate(${k % 2 ? 24 : -24}deg)`, opacity: 0 }, { transform: 'translate(0,0) rotate(0deg)', opacity: 1 }],
          { duration: 900, delay: k * 420, easing: 'cubic-bezier(.3,.1,.3,1)', fill: 'backwards' }));
      });
    };
    let schritt = 0;
    const leerlauf = () => {
      uhren.forEach(clearTimeout); uhren.length = 0;
      if (ruhig()) return;
      nach(40000, () => { schritt = 1; einnicken(); });
      nach(100000, () => { schritt = 2; falterFlug(); });
      nach(160000, () => { schritt = 3; wortLegen(); });
    };
    const geweckt = () => { aufwachen(); leerlauf(); };
    raum.addEventListener('pointerdown', geweckt, { capture: true, signal: halt.signal });
    raum.addEventListener('keydown', geweckt, { capture: true, signal: halt.signal });

    blickSetzen();
    leerlauf();
    P.zustand = () => ({ nacht: nacht(), tageszeit, jahreszeit, bewohner: bewohnerBilder.length, gefallen: gefallen.length, schlaeft, schritt,
      falter: !!falter, wort: wort ? wort.textContent : null, lama: !!raum.querySelector('.sg-lama'), laufend: eigene.filter(a => a.playState === 'running').length });
    return {
      aus() {
        uhren.concat(kurz).forEach(clearTimeout); uhren.length = 0; kurz.length = 0; flackert = false;
        halt.abort();
        eigene.forEach(a => { try { if (a.playState === 'running') a.finish(); } catch (e) { a.cancel(); } });
        z.replaceChildren(); schatten.replaceChildren();
        if (schlaf) { schlaf.getAnimations().forEach(a => a.cancel()); schlaf.remove(); }
        if (kopf) kopf.getAnimations().forEach(a => a.cancel());
        if (falter) falter.firstChild.getAnimations().forEach(a => a.cancel());
        himmel.querySelectorAll('.sg-flocke, .sg-blatt').forEach(f => f.remove());
      }
    };
  });
})();
