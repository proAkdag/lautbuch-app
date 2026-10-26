(() => {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg', HAUS = 'cubic-bezier(.22,.61,.36,1)';
  const SCHWELLE = 7;
  const NACHBAR = 64;
  const TEMPO = 42;
  const RAST = 1300;
  const s = (tag, attr) => { const e = document.createElementNS(NS, tag); for (const k in attr) e.setAttribute(k, attr[k]); return e; };
  const warte = (ms) => new Promise(r => setTimeout(r, ms));
  const fertig = (anim, ms) => Promise.race([anim.finished.catch(() => {}), warte(ms + 200)]);
  const lage = (bw) => (bw.getAttribute('transform') || '').match(/-?[\d.]+/g)?.map(Number) || [0, 0];
  const setze = (bw, x, y) => bw.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
  const mitte = (bw) => { const [x, y] = lage(bw); return [x + 20, y + 20]; };

  const spiel = (el, frames, ms, opt = {}) => el.animate(frames, { duration: ms, easing: opt.easing || HAUS, iterations: opt.mal || 1, composite: 'add' });
  const GESTE = {
    land: (g) => spiel(g, [{ transform: 'none' }, { transform: 'scale(1.08,.88)', offset: .18 }, { transform: 'translateY(-14px) scale(.95,1.07)', offset: .45 }, { transform: 'scale(1.05,.95)', offset: .72 }, { transform: 'none' }], 680),
    luft: (g) => spiel(g, [{ transform: 'none' }, { transform: 'translateY(-16px) rotate(-8deg)', offset: .25 }, { transform: 'translateY(-22px) rotate(7deg)', offset: .5 }, { transform: 'translateY(-8px) rotate(-3deg)', offset: .75 }, { transform: 'none' }], 900),
    wasser: (g) => spiel(g, [{ transform: 'none' }, { transform: 'translateY(6px) rotate(8deg)', offset: .15 }, { transform: 'translate(-4px,-20px) rotate(-16deg)', offset: .5 }, { transform: 'translate(3px,3px) rotate(10deg)', offset: .8 }, { transform: 'none' }], 1000),
    wackeln: (g) => spiel(g, [{ transform: 'none' }, { transform: 'rotate(-14deg)' }, { transform: 'translateY(-4px) rotate(13deg)' }, { transform: 'rotate(-10deg)' }, { transform: 'translateY(-2px) rotate(8deg)' }, { transform: 'none' }], 760),
    strecken: (g) => spiel(g, [{ transform: 'none' }, { transform: 'scale(1.18,.92)', offset: .45 }, { transform: 'scale(1.18,.92)', offset: .6 }, { transform: 'none' }], 1600, { easing: 'ease-in-out' }),
    drehen: (g) => spiel(g, [{ transform: 'none' }, { transform: 'scale(-1,1)', offset: .5 }, { transform: 'none' }], 700),
    nicken: (g) => spiel(g, [{ transform: 'none' }, { transform: 'rotate(-12deg)', offset: .3 }, { transform: 'rotate(10deg)', offset: .65 }, { transform: 'none' }], 760),
    zurueck: (g) => spiel(g, [{ transform: 'none' }, { transform: 'translateX(14px) translateY(-10px) rotate(10deg)', offset: .3 }, { transform: 'translateX(18px)', offset: .6 }, { transform: 'none' }], 1100)
  };
  const EIGEN = { 'bw-zauberer': 'drehen', 'bw-robo': 'wackeln', 'bw-schnecke': 'strecken', 'bw-hund': 'wackeln', 'bw-drachenbaby': 'land' };
  const ZUGABE = { 'bw-zauberer': 'sterne', 'bw-drachenbaby': 'woelkchen', 'bw-delfin': 'ring', 'bw-pinguin': 'ring', 'bw-storch': 'ring', 'bw-moewe': 'ring' };

  const STERN = 'M0 -5 l1.4 3.4 3.6 .3 -2.8 2.3 .9 3.6 -3.1 -2 -3.1 2 .9 -3.6 -2.8 -2.3 3.6 -.3z';
  const zugabe = (ebene, art, [x, y]) => {
    const g = s('g', { class: 'figur-zugabe', 'aria-hidden': 'true' }); ebene.append(g);
    const teile = [];
    if (art === 'sterne' || art === 'funke') {
      const n = art === 'sterne' ? 5 : 3;
      for (let k = 0; k < n; k++) {
        const w = (k / n) * Math.PI * 2 - Math.PI / 2, r = art === 'sterne' ? 26 : 14;
        const t = s('g', { transform: `translate(${x} ${y - 22})` }), p = s('path', { d: STERN, fill: k % 2 ? '#f6d36b' : '#c8860a' });
        t.append(p); g.append(t); teile.push([p, [{ transform: 'translate(0,0) scale(.3)', opacity: 0 }, { transform: `translate(${(Math.cos(w) * r).toFixed(1)}px,${(Math.sin(w) * r).toFixed(1)}px) scale(1)`, opacity: 1, offset: .5 }, { transform: `translate(${(Math.cos(w) * r * 1.3).toFixed(1)}px,${(Math.sin(w) * r * 1.3 - 6).toFixed(1)}px) scale(.6)`, opacity: 0 }], 1100 + k * 60]);
      }
    } else if (art === 'woelkchen') {
      for (let k = 0; k < 3; k++) {
        const c = s('circle', { cx: x + 14, cy: y - 10, r: 4 + k, fill: '#ffffff', stroke: '#d8d2c6', 'stroke-width': 1 });
        g.append(c); teile.push([c, [{ transform: 'translate(0,0) scale(.4)', opacity: 0 }, { transform: `translate(${6 + k * 5}px,${-8 - k * 7}px) scale(1)`, opacity: .95, offset: .4 }, { transform: `translate(${10 + k * 7}px,${-18 - k * 9}px) scale(1.3)`, opacity: 0 }], 1200 + k * 120]);
      }
    } else if (art === 'ring') {
      const c = s('ellipse', { cx: x, cy: y + 18, rx: 16, ry: 4, fill: 'none', stroke: '#6bb7ee', 'stroke-width': 2 });
      g.append(c); teile.push([c, [{ transform: 'scale(.4)', opacity: .9 }, { transform: 'scale(1.6)', opacity: 0 }], 900]);
    } else if (art === 'noten' || art === 'tropfen' || art === 'erde' || art === 'flamme') {
      const n = art === 'noten' ? 3 : 4, unten = art === 'erde' ? 14 : art === 'flamme' ? 0 : -18;
      for (let k = 0; k < n; k++) {
        const t = s('g', { transform: `translate(${x + (art === 'flamme' ? 14 : 0)} ${y + unten})` });
        const p = art === 'noten' ? s('g', {}) : s('ellipse', { rx: art === 'tropfen' ? 1.8 : 2.4, ry: art === 'tropfen' ? 2.6 : 2.2, fill: { tropfen: '#6bb7ee', erde: '#9b7a52', flamme: k % 2 ? '#f6d36b' : '#f0a640' }[art] });
        if (art === 'noten') p.append(s('circle', { cx: 0, cy: 0, r: 2.3, fill: '#8a6d3b' }), s('line', { x1: 2, y1: 0, x2: 2, y2: -8, stroke: '#8a6d3b', 'stroke-width': 1.2 }));
        t.append(p); g.append(t);
        const dx = art === 'noten' ? 5 + k * 7 : art === 'flamme' ? 6 + k * 5 : (k - 1.5) * 9, dy = art === 'noten' ? -10 - k * 6 : art === 'erde' ? -12 - (k % 2) * 6 : art === 'flamme' ? -2 - k * 3 : -12 - k * 5;
        teile.push([p, [{ transform: 'translate(0,0) scale(.3)', opacity: 0 }, { transform: `translate(${dx * .6}px,${dy * .6}px) scale(1)`, opacity: 1, offset: .4 }, { transform: `translate(${dx}px,${dy}px) scale(.8)`, opacity: 0 }], (art === 'noten' ? 1300 : 900) + k * 90]);
      }
    } else if (art === 'licht') {
      const c = s('circle', { cx: x, cy: y, r: 12, fill: '#f6d36b', 'fill-opacity': .55 });
      g.append(c); teile.push([c, [{ transform: 'scale(.3)', opacity: 0 }, { transform: 'scale(1.6)', opacity: .9, offset: .35 }, { transform: 'scale(2.4)', opacity: 0 }], 1400]);
    }
    const laeufe = teile.map(([el, f, ms]) => { el.style.transformBox = 'fill-box'; el.style.transformOrigin = '50% 50%'; return el.animate(f, { duration: ms, easing: HAUS, fill: 'forwards' }); });
    Promise.all(laeufe.map(a => fertig(a, 1500))).then(() => g.remove());
  };

  let LEBR = {};
  const MENSCH = new Set(['bw-zauberer', 'bw-robo']);
  const ART = (x) => MENSCH.has(x) ? 'mensch' : LEBR[x] || 'land';
  const ESSEN = { 'bw-moewe': 'brot', 'bw-elch': 'kuchen', 'bw-drachenbaby': 'kuchen', 'bw-hirsch': 'kiwi', 'bw-robo': 'schoko' };
  const HUT = ['bw-kuh-hut', 'bw-zauberer', 'bw-pinguin'];
  const nach = (ms, f) => setTimeout(f, ms);
  const PAARE = [
    { a: 'bw-kuh', b: 'bw-kuh-hut', tun: [
      ({ ich, du }) => { GESTE.land(ich); GESTE.land(du); nach(720, () => { GESTE.land(ich); GESTE.land(du); }); },
      ({ ich, du, d }) => { d.zeige(ich, 'buch', 16); GESTE.nicken(ich); nach(400, () => GESTE.nicken(du)); }] },
    { a: 'bw-eule-luna', b: 'bw-uhu', tun: [
      ({ ich, du }) => { GESTE.nicken(ich); nach(380, () => GESTE.nicken(du)); },
      ({ ich, du }) => { GESTE.drehen(du); nach(500, () => GESTE.wackeln(ich)); }] },
    { a: 'bw-loewe-leo', b: 'bw-maus', tun: [
      ({ ich, du, d, z }) => { if (gemeistert('ziel')) { d.zeige(du, 'ding-klotz', 14); nach(500, () => GESTE.land(ich)); nach(900, () => z('funke', ich)); } else { GESTE.land(du); nach(200, () => GESTE.zurueck(ich)); } }] },
    { a: 'bw-panda', b: 'bw-esel', tun: [({ ich, du, z }) => { GESTE.drehen(ich); GESTE.drehen(du); nach(500, () => z('funke', null)); }] },
    { a: 'bw-kraehe', b: 'bw-eule-luna', tun: [({ ich, du, d }) => { d.wandere('würfel', du, ich); nach(1000, () => d.wandere('flöte', ich, du)); nach(1900, () => { GESTE.nicken(ich); GESTE.nicken(du); }); }] },
    { a: 'bw-kueken', b: ['bw-kuh', 'bw-moewe'], tun: [({ ich, du, d }) => { d.wandere('brief', du, ich); nach(1300, () => GESTE.wackeln(ich)); }] },
    { a: 'bw-elch', b: 'bw-drachenbaby', tun: [({ ich, du, d, z }) => { z('flamme', du); nach(500, () => d.zeige(ich, 'kuchen', 16)); nach(900, () => GESTE.nicken(du)); }] },
    { a: 'bw-schwein', b: 'bw-meise', tun: [({ ich, du, d, z }) => { GESTE.luft(du); nach(400, () => d.zeige(ich, 'schleife', 13)); nach(900, () => { GESTE.land(ich); z('funke', ich); }); }] },
    { a: 'bw-schwein', b: 'bw-kueken', tun: [({ ich, du, d }) => { d.zeige(du, 'seife', 12); nach(400, () => GESTE.zurueck(ich)); }] },
    { a: 'bw-uhu', b: 'bw-puma', tun: [({ ich, du }) => { GESTE.drehen(ich); nach(700, () => GESTE.strecken(du)); nach(1500, () => GESTE.drehen(ich)); }] },
    { a: 'bw-robo', b: 'bw-nashorn', tun: [({ ich, du, z }) => { for (let k = 0; k < 3; k++) { nach(k * 600, () => GESTE.wackeln(ich)); nach(k * 600 + 300, () => GESTE.nicken(du)); } nach(1000, () => z('woelkchen', du)); }] },
    { a: 'bw-pinguin', b: 'bw-storch', tun: [({ ich, du, z }) => { GESTE.wackeln(du); nach(400, () => { z('ring', ich); GESTE.land(ich); }); }] },
    { a: 'bw-ziege', b: 'bw-maus', tun: [({ ich, du, d }) => { GESTE.nicken(ich); d.zeige(du, 'ding-klotz', 13); nach(600, () => GESTE.nicken(du)); }] },
    { a: 'bw-ziege', b: 'bw-kuh', tun: [({ ich, du, d }) => { d.zeige(ich, 'schuh', 12); d.zeige(du, 'buch', 14); nach(500, () => { GESTE.nicken(ich); GESTE.nicken(du); }); }] },
    { a: 'bw-delfin', b: 'bw-moewe', tun: [({ ich, du, d }) => { GESTE.wasser(ich); d.wandere('brief', ich, du); nach(1300, () => GESTE.luft(du)); }] },
    { a: 'bw-loewe-leo', b: 'bw-moewe', tun: [({ ich, du, d, z }) => { d.zeige(ich, 'tuba', 16); nach(500, () => { z('ring', ich); GESTE.luft(du); }); }] },
    { a: 'bw-hund', b: 'bw-zauberer', tun: [({ ich, du, d, z }) => { GESTE.drehen(du); z('sterne', ich); nach(500, () => d.zeige(ich, 'hamster', 14)); nach(800, () => GESTE.wackeln(ich)); }] },
    { a: 'bw-hund', b: 'bw-schnecke', tun: [({ ich, du, z }) => { GESTE.zurueck(ich); nach(300, () => z('funke', du)); nach(1200, () => GESTE.nicken(ich)); }] },
    { a: 'bw-kraehe', b: Object.keys(ESSEN), tun: [({ ich, du, d, wer }) => { const w = ESSEN[Object.keys(wer).find(k => wer[k] === du)]; d.wandere(w, du, ich); nach(1300, () => { GESTE.nicken(du); GESTE.land(ich); }); }] },
    { a: 'bw-kueken', b: HUT, tun: [({ ich, du, z }) => { GESTE.wackeln(ich); nach(500, () => { GESTE.nicken(du); z('funke', du); }); }] },
    { a: 'bw-kamel', b: (x) => ART(x) === 'luft', tun: [({ ich, du, z }) => { GESTE.luft(du); nach(300, () => z('noten', ich)); nach(600, () => z('noten', du)); }] },
    { a: 'bw-nashorn', b: (x) => ART(x) === 'luft', tun: [({ ich, du, z }) => { GESTE.luft(du); nach(500, () => { GESTE.nicken(ich); z('funke', ich); }); }] },
    { a: 'bw-ara', b: '*', tun: [({ ich, du, wer }) => { const g = GESTE[ART(Object.keys(wer).find(k => wer[k] === du))] || GESTE.land; g(du); nach(700, () => g(ich)); }] },
    { a: 'bw-schnecke', b: '*', tun: [({ ich, du, z }) => { GESTE.land(du); nach(300, () => z('funke', ich)); }] },
    { a: 'bw-robo', b: '*', tun: [
      ({ ich, du }) => { for (let k = 0; k < 3; k++) { nach(k * 700, () => GESTE.land(ich)); nach(k * 700 + 350, () => GESTE.land(du)); } },
      ({ ich, du, d }) => { d.wandere('schoko', ich, du); nach(1300, () => GESTE.land(du)); }] },
    { a: 'bw-zauberer', b: '*', tun: [
      ({ ich, du, z }) => { GESTE.drehen(ich); if (gemeistert('ziel')) { z('licht', du); return; } z('sterne', du); nach(450, () => GESTE.drehen(du)); },
      ({ ich, du, d }) => { GESTE.drehen(ich); d.wandere('frosch', ich, du); nach(1300, () => GESTE.land(du)); }] },
    { a: 'bw-drachenbaby', b: '*', tun: [
      ({ ich, du, z }) => { GESTE.land(ich); z('woelkchen', ich); nach(500, () => GESTE.wackeln(du)); },
      ({ ich, du, d }) => { d.wandere('kuchen', du, ich); nach(1300, () => GESTE.nicken(du)); }] }
  ];
  const NACH_ART = {
    'luft|luft': [({ ich, du, z }) => { z('noten', ich); nach(500, () => z('noten', du)); }, ({ ich, du }) => { GESTE.luft(ich); nach(450, () => GESTE.luft(du)); }, ({ ich, du }) => { GESTE.nicken(ich); GESTE.nicken(du); nach(500, () => { GESTE.nicken(ich); GESTE.nicken(du); }); }],
    'land|luft': [({ ich, du, z }) => { GESTE.luft(du); nach(400, () => { z('noten', du); GESTE.wackeln(ich); }); }, ({ ich, du }) => { GESTE.nicken(du); nach(400, () => GESTE.nicken(ich)); }],
    'wasser': [({ ich, du, z }) => { GESTE.wasser(ich); nach(300, () => { z('tropfen', du); GESTE.wackeln(du); }); }, ({ ich, du }) => { GESTE.wasser(ich); nach(600, () => GESTE.land(du)); }],
    'mensch': [({ ich, du, z }) => { GESTE.nicken(ich); nach(300, () => { GESTE.land(du); z('funke', du); }); }, ({ ich, du }) => { GESTE.drehen(ich); nach(400, () => GESTE.drehen(du)); }],
    'land|land': [({ ich, du, z }) => { GESTE.land(ich); nach(260, () => GESTE.land(du)); z('funke', null); }, ({ ich, du }) => { GESTE.nicken(ich); GESTE.nicken(du); }, ({ ich, du }) => { GESTE.zurueck(ich); nach(500, () => GESTE.land(du)); }]
  };
  const artPaar = (a, b) => { const x = ART(a), y = ART(b); if (x === 'wasser' || y === 'wasser') return 'wasser'; if (x === 'mensch' || y === 'mensch') return 'mensch'; return [x, y].sort().join('|'); };
  const passt = (p, x, y) => p.a === x && (p.b === '*' || p.b === y || (Array.isArray(p.b) && p.b.includes(y)) || (typeof p.b === 'function' && p.b(y)));

  const tf = (y, r = 0, sx = 1, sy = sx, x = 0) => `translate(${x}%,${y}%) translateY(-50%) rotate(${r}deg) translateY(50%) scale(${sx},${sy})`;
  const reihe = (werte, ms, T, opt) => T.spiel(werte.map(([o, ...w]) => ({ transform: tf(...w), offset: o })), ms, opt);
  const auf = (o = 1) => [{ opacity: 0, transform: 'scale(.3)' }, { opacity: o, transform: 'scale(1)', offset: .12 }];
  const KLECKS = ['#f2a7c8', '#8cc8ee', '#f6d36b', '#a8d8a0'];
  const klecksen = (T, farben) => {
    [[-7, -3, 3.4], [6, 5, 2.8], [-1, 10, 2.4], [8, -7, 2.2]].forEach(([dx, dy, r], k) => {
      const c = T.kreis(dx, dy, r, farben[k % farben.length]);
      T.lauf(c, [{ opacity: 0, transform: 'scale(.2)' }, { opacity: .9, transform: 'scale(1)', offset: .15 }, { opacity: .9, transform: 'scale(1)', offset: .7 }, { opacity: 0, transform: 'scale(1)' }], 1700, 200 + k * 140);
    });
    reihe([[0, 0], [.18, 0, 0, 1.04, .94], [.3, -6, -9], [.45, -4, 8], [.6, 0, 0], [1, 0, 0]], 1200, T);
    return 2400;
  };
  let zauberMal = 0;
  const GRUND = {
    'bw-uhu': (T) => {
      reihe([[0, 0, 0], [.14, 0, 0, 1.08, .86], [.5, -70, 180], [.84, -10, 350], [.92, 0, 360, 1.06, .92], [1, 0, 360]], 1150, T, { easing: 'ease-in-out' });
      return 1150;
    },
    'bw-kraehe': (T) => {
      const k = T.ding('käse', 19, 12, 17);
      if (k) T.lauf(k, [...auf(), { opacity: 1, transform: 'scale(1)', offset: .6 }, { opacity: 1, transform: 'translate(-12px,-10px) scale(.6)', offset: .72 }, { opacity: 0, transform: 'translate(-14px,-12px) scale(.2)' }], 1800);
      T.spiel([0, .2, .27, .34, .41, .48, .55, .62, .78, 1].map((o, i) => ({ offset: o, transform: `translateY(${i === 8 ? -18 : 0}%) rotate(${[0, 0, 24, 0, 24, 0, 24, 4, 0, 0][i]}deg)` })), 1800);
      return 1800;
    },
    'bw-schnecke': (T) => {
      if (T.versetze) { T.versetze(); return 0; }
      T.spiel([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'scale(.6)', offset: .2 }, { opacity: 0, transform: 'translateX(70%) scale(.6)', offset: .45 }, { opacity: 1, transform: 'translateX(70%)', offset: .62 }, { opacity: 1, transform: 'translateX(70%)', offset: .85 }, { opacity: 1, transform: 'none' }], 2600, { ersetzen: true });
      return 2600;
    },
    'bw-zauberer': (T) => {
      GESTE.drehen(T.g); T.z('sterne');
      const f = T.ding(zauberMal++ % 2 ? 'hamster' : 'frosch', 13, 2, 22);
      if (f) T.lauf(f, [{ opacity: 0, transform: 'translate(0,0) scale(.2)' }, { opacity: 1, transform: 'translate(10px,-18px) scale(1)', offset: .3 }, { opacity: 1, transform: 'translate(22px,4px) scale(1)', offset: .55 }, { opacity: 1, transform: 'translate(30px,-6px) scale(1)', offset: .72 }, { opacity: 0, transform: 'translate(38px,6px) scale(.9)' }], 1500, 450);
      reihe([[0, 0], [.4, 0], [.5, -16, -6], [.62, 0, 4], [.75, 0, 0], [1, 0]], 1900, T);
      return 1950;
    },
    'bw-maus': (T) => {
      const kl = [13, 0, -13].map((dy, k) => T.ding('ding-klotz', 22, dy, 13));
      const weg = [null, 'translate(9px,12px) rotate(-50deg)', 'translate(18px,20px) rotate(80deg)'];
      kl.forEach((e, k) => e && T.lauf(e, [{ opacity: 0, transform: 'translateY(-8px) scale(.4)' }, { opacity: 1, transform: 'none', offset: .1 }, { opacity: 1, transform: 'rotate(0deg)', offset: .5 - k * .06 }, { opacity: 1, transform: k ? 'rotate(8deg)' : 'none', offset: .6 }, { opacity: k ? 0 : 1, transform: weg[k] || 'none', offset: .8 }, { opacity: 0, transform: weg[k] || 'none' }], 2300 - k * 260, k * 260));
      reihe([[0, 0], [.12, 0, 6], [.2, 0, 0], [.32, 0, 6], [.4, 0, 0], [.58, 0, 0], [.66, -22, -4, .96, 1.05], [.76, 0, 0], [.84, 0, -8], [.92, 0, 6], [1, 0, 0]], 2300, T);
      return 2350;
    },
    'bw-eule-luna': (T) => {
      ['hut', 'würfel', 'flöte'].forEach((w, k) => {
        const e = T.ding(w, 0, 13, 15); if (!e) return;
        T.lauf(e, [{ opacity: 0, transform: 'translate(0,2px) scale(.2)' }, { opacity: 1, transform: 'translate(14px,-12px) scale(1)', offset: .35 }, { opacity: 1, transform: 'translate(16px,-14px) scale(1)', offset: .7 }, { opacity: 0, transform: 'translate(24px,-18px) scale(.7)' }], 800, 200 + k * 700);
      });
      T.spiel([0, .32, .36, .4, .44, .57, .61, .65, .69, .82, .86, .9, .94, 1].map((o, i) => ({ offset: o, transform: `rotate(${[0, 0, -9, 9, 0, 0, -9, 9, 0, 0, -9, 9, 0, 0][i]}deg)` })), 2800);
      return 2850;
    },
    'bw-kueken': (T) => {
      const h = T.ding('hut', 24, 13, 18);
      if (h) T.lauf(h, [...auf(), { opacity: 1, transform: 'scale(1,1)', offset: .3 }, { opacity: 1, transform: 'translateY(2px) scale(1.12,.8)', offset: .5 }, { opacity: 1, transform: 'translateY(4px) scale(1.3,.55)', offset: .7 }, { opacity: 1, transform: 'translateY(4px) scale(1.3,.55)', offset: .88 }, { opacity: 0, transform: 'translateY(4px) scale(1.3,.55)' }], 2600);
      reihe([[0, 0], [.16, 0, 0, 1, 1, 15], ...[.24, .32, .4, .48, .56, .64].map((o, i) => [o, i % 2 ? -4 : 0, i % 2 ? -3 : 3, 1, 1, i % 2 ? 8 : 22]), [.72, 0, 0, 1, 1, 15], [.84, -14, 0, 1.04, .96], [1, 0, 0]], 2600, T);
      return 2650;
    },
    'bw-loewe-leo': (T) => {
      reihe([[0, 0, 0], ...[-8, 8, -7, 7, -5, 5].map((r, i) => [.08 + i * .07, 0, r, 1.02]), [.55, 0, 0, 1.08], [.85, 0, 0, 1.08], [1, 0, 0]], 1500, T);
      setTimeout(() => T.z('funke'), 700);
      return 1700;
    },
    'bw-elch': (T) => {
      const t = T.ding('topf', 21, 11, 20);
      if (t) { T.lauf(t, [...auf(), { opacity: 1, transform: 'scale(1)', offset: .85 }, { opacity: 0, transform: 'scale(.8)' }], 2200); setTimeout(() => T.z('woelkchen', [21 - 14, 0]), 500); }
      reihe([[0, 0], ...[6, 0, 6, 0, 6, 0].map((r, i) => [.15 + i * .1, 0, r]), [1, 0, 0]], 2200, T);
      return 2250;
    },
    'bw-drachenbaby': (T) => {
      const k = T.ding('kuchen', 24, 12, 18);
      if (k) T.lauf(k, [...auf(), { opacity: 1, transform: 'scale(1)', offset: .35 }, { opacity: 1, transform: 'scale(.72)', offset: .45 }, { opacity: 1, transform: 'scale(.45)', offset: .6 }, { opacity: 0, transform: 'scale(.1)', offset: .75 }, { opacity: 0, transform: 'scale(.1)' }], 2000);
      reihe([[0, 0], [.25, -12, 0, 1, 1, 18], [.35, 0, 8, 1, 1, 22], [.4, 0, 0, 1, 1, 22], [.5, 0, 8, 1, 1, 22], [.55, 0, 0, 1, 1, 22], [.65, 0, 8, 1, 1, 22], [.72, 0, 0, 1.06, .94, 22], [1, 0, 0]], 2000, T);
      setTimeout(() => T.z('woelkchen'), 1400);
      return 2100;
    },
    'bw-schwein': (T) => {
      const se = T.ding('seife', 36, 13, 15);
      if (se) T.lauf(se, [{ opacity: 0, transform: 'translateX(0)' }, { opacity: 1, transform: 'translateX(-14px)', offset: .25 }, { opacity: 1, transform: 'translateX(-14px)', offset: .4 }, { opacity: 0, transform: 'translateX(-8px)', offset: .55 }, { opacity: 0, transform: 'translateX(-8px)' }], 2400);
      reihe([[0, 0], [.25, 0], [.32, -18, -6, 1, 1, -30], [.42, 0, 0, 1, 1, -36], [.55, 0, 0], [.66, 0, 0, 1.07], [.9, 0, 0, 1.07], [1, 0, 0]], 2400, T);
      setTimeout(() => T.z('funke'), 1550);
      return 2450;
    },
    'bw-kuh': (T) => {
      reihe([[0, 0], [.14, 0, 6], [.26, 0, 2], [.38, 0, 6], [.5, 0, 2], [.62, 0, 6], [.72, 0, 0], [.82, -12, -3, 1.03, .97], [1, 0, 0]], 2400, T, { easing: 'ease-in-out' });
      return 2400;
    },
    'bw-panda': (T) => klecksen(T, KLECKS),
    'bw-esel': (T) => klecksen(T, ['#f2a7c8']),
    'bw-puma': (T) => {
      reihe([[0, 0], ...[[.15, 1.12, .8], [.3, 1, 1], [.45, 1.12, .8], [.6, 1, 1], [.75, 1.12, .8], [.9, 1, 1]].map(([o, x, y]) => [o, 0, 0, x, y]), [1, 0, 0]], 1500, T, { easing: 'ease-in-out' });
      return 1500;
    },
    'bw-robo': (T) => {
      T.spiel([0, -12, 12, -12, 12, 0].map((r, i, a) => ({ transform: `rotate(${r}deg)`, offset: i / (a.length - 1), easing: 'steps(2, jump-none)' })), 1200, { easing: 'linear' });
      return 1200;
    },
    'bw-pinguin': (T) => {
      T.spiel([0, -10, 10, -10, 10, 0].map((r, i, a) => ({ transform: `rotate(${r}deg)`, offset: i / (a.length - 1) })), 900);
      T.z('ring');
      return 1000;
    }
  };

  const zeige = (T, wort, dx, dy, gr, ms = 1800, verzug = 0) => { const e = T.ding(wort, dx, dy, gr); if (e) T.lauf(e, [...auf(), { opacity: 1, transform: 'scale(1)', offset: .8 }, { opacity: 0, transform: 'scale(.9)' }], ms, verzug); return e; };
  const huepf = (T, ms = 700, h = -14) => reihe([[0, 0], [.2, 0, 0, 1.06, .9], [.5, h], [.8, 0, 0, 1.04, .96], [1, 0]], ms, T);
  const wipp = (T, ms, mal, r) => reihe([[0, 0], ...Array.from({ length: mal }, (_, i) => [(i + 1) / (mal + 1), 0, i % 2 ? -r : r]), [1, 0, 0]], ms, T);
  const nachts = () => { const h = new Date().getHours(); return h >= 18 || h < 7; };
  const gemeistert = (teil) => { try { return JSON.parse(localStorage.getItem(`lautbuch.akt.${teil}.v1`) || '{}').boss === true; } catch (_) { return false; } };
  const buegelt = (T, wort) => {
    const h = T.ding(wort, 24, 13, 17);
    if (h) T.lauf(h, [...auf(), { opacity: 1, transform: 'scale(1,1)', offset: .3 }, { opacity: 1, transform: 'translateY(2px) scale(1.12,.8)', offset: .5 }, { opacity: 1, transform: 'translateY(4px) scale(1.3,.55)', offset: .7 }, { opacity: 0, transform: 'translateY(4px) scale(1.3,.55)' }], 2400);
    reihe([[0, 0], ...[.2, .3, .4, .5, .6].map((o, i) => [o, i % 2 ? -4 : 0, i % 2 ? -3 : 3, 1, 1, i % 2 ? 8 : 22]), [.8, -10, 0, 1.03, .97], [1, 0, 0]], 2400, T);
    return 2450;
  };
  const mausBaut = (T, n, haelt) => {
    const kl = Array.from({ length: n }, (_, k) => T.ding('ding-klotz', 22, 13 - k * 12, 13));
    const weg = (k) => `translate(${k * 8}px,${k * 10}px) rotate(${k % 2 ? 70 : -50}deg)`;
    kl.forEach((e, k) => e && T.lauf(e, haelt
      ? [{ opacity: 0, transform: 'translateY(-8px) scale(.4)' }, { opacity: 1, transform: 'none', offset: .1 + k * .1 }, { opacity: 1, transform: 'none', offset: .9 }, { opacity: 0, transform: 'none' }]
      : [{ opacity: 0, transform: 'translateY(-8px) scale(.4)' }, { opacity: 1, transform: 'none', offset: .1 }, { opacity: 1, transform: k ? 'rotate(8deg)' : 'none', offset: .6 }, { opacity: k ? 0 : 1, transform: k ? weg(k) : 'none', offset: .8 }, { opacity: 0, transform: k ? weg(k) : 'none' }], 2500 - k * 200, k * 220));
    if (haelt) { reihe([[0, 0], [.15, 0, 6], [.3, 0, 0], [.45, 0, 6], [.7, 0, 0], [.8, -24, 0, .95, 1.06], [.9, 0, 0], [1, 0, 0]], 2500, T); setTimeout(() => T.z('funke'), 1900); }
    else reihe([[0, 0], [.12, 0, 6], [.2, 0, 0], [.32, 0, 6], [.4, 0, 0], [.58, 0, 0], [.66, -22, -4, .96, 1.05], [.76, 0, 0], [.84, 0, -8], [.92, 0, 6], [1, 0, 0]], 2500, T);
    return 2550;
  };
  let zuletzt = null;
  const VARIANTEN = {
    'bw-ara': { v: [
      (T) => { GESTE.nicken(T.g); T.z('noten', [6, 0]); return 1300; },
      (T) => { const z = zuletzt; if (!z || z.schl === 'bw-schnecke') { GESTE.luft(T.g); T.z('noten', [6, 0]); return 1300; } return z.fn(T); }],
      selten: (T) => { reihe([[0, 0], [.3, 0, 0, 1.12, 1.12], [.7, 0, 0, 1.12, 1.12], [1, 0]], 1500, T); T.z('noten', [6, 0]); setTimeout(() => T.z('noten', [-6, -4]), 400); return 1600; } },
    'bw-panda': { v: [GRUND['bw-panda'],
      (T) => { wipp(T, 700, 6, 12); setTimeout(() => klecksen(T, KLECKS), 750); return 3200; }],
      selten: (T) => klecksen(T, ['#c9a7e8', '#b48fd8']) },
    'bw-hirsch': { v: [
      (T) => { const k = T.ding('kiwi', 13, 6, 12); if (k) T.lauf(k, [...auf(), { opacity: 1, transform: 'scale(.7)', offset: .5 }, { opacity: 1, transform: 'scale(.4)', offset: .75 }, { opacity: 0, transform: 'scale(.1)' }], 1800); wipp(T, 1600, 4, 4); return 1850; },
      (T) => { wipp(T, 900, 6, 9); setTimeout(() => T.z('funke', [0, -18]), 500); return 1100; }],
      selten: (T) => { const k = T.ding('kiwi', 14, 14, 12); if (k) T.lauf(k, [...auf(), { opacity: 1, transform: 'translateX(26px) rotate(360deg)', offset: .6 }, { opacity: 0, transform: 'translateX(32px) rotate(400deg)' }], 1600); setTimeout(() => huepf(T, 700), 600); return 1700; } },
    'bw-robo': { v: [GRUND['bw-robo'],
      (T) => { const k = T.ding('schoko', 20, 8, 16); if (k) T.lauf(k, [...auf(), { opacity: 1, transform: 'scale(1)', offset: .5 }, { opacity: 1, transform: 'scale(.7,1)', offset: .65 }, { opacity: 0, transform: 'scale(.7,1)' }], 1800); GESTE.nicken(T.g); return 1850; },
      (T) => { T.spiel([0, 4, -4, 4, -4, 0].map((r, i, a) => ({ transform: `rotate(${r}deg)`, offset: i / (a.length - 1), easing: 'steps(2, jump-none)' })), 800, { easing: 'linear' }); T.z('ring', [0, -30]); setTimeout(() => T.z('funke', [0, -24]), 300); return 1100; }] },
    'bw-nashorn': { v: [
      (T) => { reihe([[0, 0], [.3, 0, -4, 1.04, .96], [.5, 0, 0], [1, 0]], 900, T); setTimeout(() => T.z('woelkchen', [6, 4]), 250); return 1500; },
      (T) => { reihe([[0, 0], [.3, -4, -10], [.7, -4, -10], [1, 0, 0]], 1300, T); setTimeout(() => T.z('funke', [8, -22]), 500); return 1300; }],
      selten: (T) => { reihe([[0, 0], [.25, -6, 0, 1, 1, 30], [.5, 0, 0, 1, 1, 0], [.75, -6, 0, 1, 1, -30], [1, 0, 0]], 2000, T); setTimeout(() => T.z('woelkchen', [6, 4]), 1800); return 2600; } },
    'bw-uhu': { v: [GRUND['bw-uhu'],
      (T) => { reihe([[0, 0, 0], [.25, -20, 180], [.75, -20, 180], [1, 0, 360]], 1700, T, { easing: 'ease-in-out' }); return 1700; },
      (T) => { reihe([[0, 0, 0, 1, 1, 0], [.5, -30, 180, 1, 1, 60], [1, 0, 360, 1, 1, 0]], 1300, T, { easing: 'ease-in-out' }); return 1300; },
      (T) => { if (nachts()) { wipp(T, 900, 4, 10); return 900; } GESTE.strecken(T.g); setTimeout(() => T.z('woelkchen', [6, -10]), 400); return 1700; }],
      selten: (T) => { reihe([[0, 0, 0], [.12, 0, 0, 1.08, .86], [.5, -90, 360], [.88, -10, 700], [1, 0, 720]], 1700, T, { easing: 'ease-in-out' }); return 1700; },
      nach: ['ziel', (T) => { GRUND['bw-uhu'](T); setTimeout(() => T.z('sterne'), 600); return 1600; }] },
    'bw-puma': { v: [GRUND['bw-puma'],
      (T) => { reihe([[0, 0], ...[.15, .3, .45, .6, .75, .9].map((o, i) => [o, i % 2 ? 0 : -8, 0, i % 2 ? 1 : 1.18, i % 2 ? 1 : .9]), [1, 0]], 1500, T); return 1500; },
      (T) => { GESTE.strecken(T.g); return 1600; }] },
    'bw-esel': { v: [GRUND['bw-esel'],
      (T) => { wipp(T, 900, 6, 7); setTimeout(() => T.z('ring', [10, -8]), 300); return 1100; }],
      selten: (T) => { reihe([[0, 0], [.3, 0, 80], [.6, 0, -10], [1, 0, 0]], 1500, T); setTimeout(() => klecksen(T, ['#f2a7c8']), 1300); return 3700; } },
    'bw-kamel': { v: [
      (T) => { wipp(T, 2000, 4, 5); return 2000; },
      (T) => { reihe([[0, 0], ...[.15, .3, .45, .6, .75, .9].map((o, i) => [o, 0, 0, i % 2 ? 1 : 1.03, i % 2 ? 1 : .97]), [1, 0]], 2200, T, { easing: 'ease-in-out' }); return 2200; }],
      selten: (T) => { const e = T.ding('ente', 0, -24, 15); if (e) T.lauf(e, [{ opacity: 1, transform: 'none' }, { opacity: 1, transform: 'translate(20px,-26px)', offset: .35 }, { opacity: 1, transform: 'translate(-18px,-22px)', offset: .7 }, { opacity: 0, transform: 'none' }], 2200); GESTE.nicken(T.g); return 2300; } },
    'bw-hund': { v: [
      (T) => { GESTE.wackeln(T.g); T.z('funke', [0, -14]); return 900; },
      (T) => { wipp(T, 1200, 8, 6); T.z('erde', [10, 0]); setTimeout(() => T.z('erde', [12, 0]), 500); zeige(T, 'ball', 18, 12, 13, 1500, 900); return 2400; },
      (T) => { const k = T.ding('korb', 0, 14, 30); if (k) T.lauf(k, [...auf(), { opacity: 1, transform: 'scale(1)', offset: .85 }, { opacity: 0, transform: 'scale(1)' }], 2400); reihe([[0, 0], [.3, 0, -40, 1, .8], [.85, 0, -40, 1, .8], [1, 0, 0]], 2400, T); setTimeout(() => T.z('woelkchen', [8, -10]), 900); return 2500; }],
      nach: ['r2', (T) => { const n = T.ding('clownsnase', 9, -4, 8); if (n) T.lauf(n, [...auf(), { opacity: 1, transform: 'scale(1)', offset: .8 }, { opacity: 0, transform: 'scale(1)' }], 1600); GESTE.wackeln(T.g); T.z('funke', [0, -14]); return 1600; }] },
    'bw-zauberer': { v: [GRUND['bw-zauberer'],
      (T) => { GESTE.drehen(T.g); T.z('sterne'); const t = T.ding('tiger', 14, 2, 24); if (t) T.lauf(t, [{ opacity: 0, transform: 'scale(.2)' }, { opacity: 1, transform: 'translate(12px,-14px) scale(1)', offset: .35 }, { opacity: 1, transform: 'translate(16px,-10px) scale(1)', offset: .7 }, { opacity: 0, transform: 'translate(30px,0) scale(.8)' }], 1500, 450); reihe([[0, 0], [.4, 0], [.5, -18, -8], [.62, 0, 4], [1, 0]], 1900, T); return 1950; }],
      selten: (T) => { GESTE.drehen(T.g); T.z('sterne'); [-14, 0, 14, -7].forEach((dx, k) => { const p = T.ding('pasta', dx, -30, 10); if (p) T.lauf(p, [{ opacity: 0, transform: 'none' }, { opacity: 1, transform: 'translateY(8px)', offset: .25 }, { opacity: 1, transform: 'translateY(40px)', offset: .85 }, { opacity: 0, transform: 'translateY(46px)' }], 1300, 300 + k * 180); }); reihe([[0, 0], [.5, 0], [.6, -10, -6], [1, 0]], 2000, T); return 2100; },
      nach: ['ziel', (T) => { GESTE.drehen(T.g); T.z('licht', [0, -20]); setTimeout(() => T.z('sterne'), 500); return 1700; }] },
    'bw-kraehe': { v: [GRUND['bw-kraehe'],
      (T) => { const w = ['brot', 'apfel', 'kiwi'][Math.floor((Date.now() / 1000) % 3)], k = T.ding(w, 19, 12, 15); if (k) T.lauf(k, [...auf(), { opacity: 1, transform: 'scale(1)', offset: .6 }, { opacity: 1, transform: 'translate(-12px,-10px) scale(.6)', offset: .72 }, { opacity: 0, transform: 'translate(-14px,-12px) scale(.2)' }], 1800); T.spiel([0, .25, .32, .5, .57, .8, 1].map((o, i) => ({ offset: o, transform: `rotate(${[0, 0, 24, 0, 24, 0, 0][i]}deg)` })), 1800); return 1800; },
      (T) => { huepf(T, 600); setTimeout(() => huepf(T, 600), 600); T.z('funke', [8, -12]); return 1300; }],
      nach: ['ziel', (T) => { const k = T.ding('käse', 8, 14, 14); if (k) T.lauf(k, [...auf(), { opacity: 1, transform: 'scale(1)', offset: .85 }, { opacity: 0, transform: 'scale(1)' }], 2200); reihe([[0, 0], [.3, 0, 20], [.5, 0, 0, 1, 1, -20], [.9, 0, 0, 1, 1, -20], [1, 0]], 2200, T); setTimeout(() => T.z('funke', [8, 10]), 900); return 2300; }] },
    'bw-loewe-leo': { v: [GRUND['bw-loewe-leo'],
      (T) => { reihe([[0, 0, 0], [.3, 0, 10, 1.05], [.6, 0, -6, 1.05], [1, 0, 0]], 1400, T); setTimeout(() => T.z('funke', [-6, -16]), 500); return 1500; },
      (T) => { zeige(T, 'tuba', 16, 2, 18, 1600); setTimeout(() => T.z('ring', [26, -12]), 600); setTimeout(() => T.z('noten', [20, -6]), 700); reihe([[0, 0], [.4, 0, 0, 1.06, 1.06], [.8, 0, 0, 1.06, 1.06], [1, 0]], 1600, T); return 1700; }] },
    'bw-moewe': { v: [
      (T) => { GESTE.luft(T.g); T.z('ring'); return 1000; },
      (T) => { reihe([[0, 0, 0, 1, 1, 0], [.4, -60, -8, 1, 1, 40], [.7, -40, 8, 1, 1, -20], [1, 0, 0, 1, 1, 0]], 1800, T); zeige(T, 'brief', 10, 4, 12, 1200, 1300); return 2500; },
      (T) => { GESTE.nicken(T.g); const b = T.ding('brot', 14, 8, 12); if (b) T.lauf(b, [...auf(), { opacity: 1, transform: 'translateY(4px) rotate(30deg)', offset: .5 }, { opacity: 1, transform: 'translateY(-6px)', offset: .7 }, { opacity: 0, transform: 'translateY(-6px)' }], 1400); return 1450; }] },
    'bw-kueken': { v: [GRUND['bw-kueken'], (T) => buegelt(T, 'brief'), (T) => buegelt(T, 'wäsche')],
      selten: (T) => { reihe([[0, 0], [.3, 0, 0, 1.08, .88], [.6, 0, 0, .97, 1.08], [1, 0]], 1300, T); setTimeout(() => T.z('funke', [0, -14]), 800); return 1400; } },
    'bw-kuh-hut': { v: [
      (T) => { GESTE.nicken(T.g); setTimeout(() => T.z('funke', [0, -20]), 300); return 900; },
      (T) => { wipp(T, 1200, 10, 4); return 1200; },
      (T) => { reihe([[0, 0], [.3, 0, 0, 1.04, 1.04], [1, 0]], 900, T); T.z('ring', [12, -6]); return 1000; }] },
    'bw-schwein': { v: [GRUND['bw-schwein'],
      (T) => { wipp(T, 1400, 6, 8); setTimeout(() => klecksen(T, ['#a07850', '#8a6a44']), 300); return 2700; },
      (T) => { reihe([[0, 0], [.3, 0, -8, 1.07], [.8, 0, -8, 1.07], [1, 0]], 1500, T); setTimeout(() => T.z('funke', [10, -14]), 500); return 1600; }],
      nach: ['ziel', (T) => { reihe([[0, 0], [.3, 0, -8, 1.07], [.8, 0, -8, 1.07], [1, 0]], 1500, T); T.z('licht', [10, -14]); return 1600; }] },
    'bw-meise': { v: [
      (T) => { zeige(T, 'schleife', 14, 8, 13, 1600); GESTE.nicken(T.g); return 1650; },
      (T) => { GESTE.luft(T.g); T.z('noten', [4, -4]); return 1300; }],
      selten: (T) => { const m = T.ding('meise', 26, -16, 14); if (m) T.lauf(m, [{ opacity: 0, transform: 'translate(20px,-10px)' }, { opacity: 1, transform: 'none', offset: .3 }, { opacity: 1, transform: 'none', offset: .7 }, { opacity: 0, transform: 'translate(24px,-14px)' }], 2000); setTimeout(() => GESTE.luft(T.g), 500); return 2100; } },
    'bw-maus': { v: [GRUND['bw-maus'], (T) => mausBaut(T, 4, false)],
      nach: ['ziel', (T) => mausBaut(T, 4, true)] },
    'bw-eule-luna': { v: [GRUND['bw-eule-luna'],
      (T) => { if (nachts()) { reihe([[0, 0, 0], [.3, 0, -18], [.6, 0, 18], [1, 0, 0]], 1400, T); return 1400; } GESTE.strecken(T.g); setTimeout(() => T.z('woelkchen', [8, -12]), 400); return 1700; }],
      nach: ['ziel', (T) => { zeige(T, 'hut', 14, -6, 15, 1800, 200); huepf(T, 700); setTimeout(() => T.z('funke', [14, -10]), 700); return 1900; }] },
    'bw-elch': { v: [GRUND['bw-elch'],
      (T) => { const k = T.ding('kuchen', 20, 10, 18); if (k) T.lauf(k, [...auf(), { opacity: 1, transform: 'scale(1)', offset: .55 }, { opacity: 1, transform: 'scale(.8,1)', offset: .65 }, { opacity: 0, transform: 'scale(.8,1)' }], 2200); GESTE.nicken(T.g); setTimeout(() => T.z('woelkchen', [20, -4]), 400); return 2250; },
      (T) => { zeige(T, 'topf', 20, 10, 18, 1700); reihe([[0, 0], [.4, 0, 10], [.6, 0, 10], [1, 0]], 1700, T); setTimeout(() => T.z('woelkchen', [6, -12]), 900); return 1750; }] },
    'bw-drachenbaby': { v: [GRUND['bw-drachenbaby'],
      (T) => { reihe([[0, 0], [.3, 0, -6, 1.05, .95], [.5, 0, 0], [1, 0]], 1000, T); setTimeout(() => T.z('flamme', [0, -6]), 250); setTimeout(() => T.z('woelkchen', [14, -4]), 700); return 1600; },
      (T) => { reihe([[0, 0], [.3, 8, 0, 1.04, .86], [.5, 8, -6, 1.04, .86], [.7, 8, 6, 1.04, .86], [1, 0]], 1600, T); return 1600; }] },
    'bw-pinguin': { v: [GRUND['bw-pinguin'],
      (T) => { zeige(T, 'req-strumpfhose', 0, -22, 22, 1800); GESTE.nicken(T.g); return 1850; },
      (T) => { const t = T.ding('taxi', -34, 12, 26); if (t) T.lauf(t, [{ opacity: 0, transform: 'none' }, { opacity: 1, transform: 'translateX(20px)', offset: .2 }, { opacity: 1, transform: 'translateX(60px)', offset: .8 }, { opacity: 0, transform: 'translateX(76px)' }], 2000); setTimeout(() => GESTE.luft(T.g), 700); return 2100; }] },
    'bw-storch': { v: [
      (T) => { GESTE.wasser(T.g); T.z('ring'); return 1000; },
      (T) => { reihe([[0, 0, 0], [.3, 0, 26], [.5, -6, -12], [.7, 0, 6], [1, 0, 0]], 1300, T); return 1300; },
      (T) => { reihe([[0, 0], [.3, -6, 0, 1, 1, -12], [.6, 0, 0, 1, 1, -12], [1, 0]], 1500, T); return 1500; }],
      selten: (T) => { [14, 2, -10].forEach((dy, k) => { const st = T.ding('stern', 22, dy, 12); if (st) T.lauf(st, [{ opacity: 0, transform: 'translateY(-10px)' }, { opacity: 1, transform: 'none', offset: .15 }, { opacity: 1, transform: k === 2 ? 'rotate(12deg)' : 'none', offset: .7 }, { opacity: 0, transform: 'none' }], 2400 - k * 300, k * 300); }); GESTE.nicken(T.g); return 2450; } },
    'bw-kuh': { v: [GRUND['bw-kuh'],
      (T) => { zeige(T, 'buch', 18, 8, 16, 1800); reihe([[0, 0], [.4, 0, 6], [.5, 0, -4], [.6, 0, 6], [1, 0]], 1800, T); return 1850; },
      (T) => { zeige(T, 'brief', 18, 10, 14, 2000); wipp(T, 2000, 8, 3); return 2050; }] },
    'bw-schnecke': { v: [GRUND['bw-schnecke'],
      (T) => { reihe([[0, 0], [.3, -6, 0, .96, 1.1], [.8, -6, 0, .96, 1.1], [1, 0]], 1400, T); setTimeout(() => T.z('funke', [0, -14]), 500); return 1500; }] },
    'bw-delfin': { v: [
      (T) => { GESTE.wasser(T.g); T.z('ring'); return 1000; },
      (T) => { reihe([[0, 0, 0], [.5, -60, 180], [1, 0, 360]], 1200, T, { easing: 'ease-in-out' }); T.z('tropfen', [0, 6]); return 1300; },
      (T) => { GESTE.wasser(T.g); zeige(T, 'brief', 12, -8, 12, 1600, 300); return 1700; }] },
    'bw-ziege': { v: [
      (T) => { reihe([[0, 0, 0], [.25, 0, -12], [.5, 0, 12], [.75, 0, -6], [1, 0, 0]], 1600, T); return 1600; },
      (T) => { [0, 1, 2, 3].forEach(k => zeige(T, 'schuh', -12 + k * 8, 18, 10, 2600 - k * 400, k * 400)); wipp(T, 2600, 4, 5); return 2650; }],
      nach: ['ziel', (T) => { reihe([[0, 0], [.4, 0, 8], [1, 0]], 1400, T); T.z('licht', [14, 6]); return 1500; }] }
  };
  const runde = new Map();
  const liste = (V) => V.nach && gemeistert(V.nach[0]) ? [V.nach[1], ...V.v.slice(1)] : V.v;
  const alle = (V) => [...V.v, ...(V.selten ? [V.selten] : []), ...(V.nach ? [V.nach[1]] : [])];
  const MACKE = {};
  for (const [schl, V] of Object.entries(VARIANTEN)) MACKE[schl] = (T, nr) => {
    let fn;
    if (Number.isInteger(nr)) fn = alle(V)[nr] || V.v[0];
    else {
      const n = runde.get(schl) || 0, L = liste(V); runde.set(schl, n + 1);
      fn = V.selten && n > 1 && Math.random() < 1 / 8 ? V.selten : L[n % L.length];
    }
    if (schl !== 'bw-ara') zuletzt = { schl, fn };
    return fn(T);
  };
  const GANG = {
    'bw-robo': { f: (d) => [{ transform: 'none', easing: 'steps(2, jump-none)' }, { transform: `rotate(${d * 6}deg)`, easing: 'steps(2, jump-none)' }, { transform: 'none' }], ms: 520 },
    'bw-pinguin': { f: (d) => [{ transform: 'rotate(-9deg)' }, { transform: 'translateY(-2px) rotate(9deg)' }, { transform: 'rotate(-9deg)' }], ms: 360 },
    'bw-uhu': { f: (d) => [{ transform: 'none' }, { transform: `translateY(-8px) rotate(${d * 8}deg)` }, { transform: 'none' }], ms: 480 },
    'bw-maus': { f: (d) => [{ transform: 'none' }, { transform: 'translateY(-2px)' }, { transform: 'none' }], ms: 220 },
    'bw-kueken': { f: (d) => [{ transform: 'none' }, { transform: 'translateY(-4px)' }, { transform: 'none' }], ms: 260 }
  };
  const GANG_ART = {
    luft: { f: (d) => [{ transform: 'none' }, { transform: `translateY(-3px) scale(1,.92) rotate(${d * 5}deg)` }, { transform: 'none' }], ms: 260 },
    wasser: { f: (d) => [{ transform: 'rotate(-6deg)' }, { transform: 'translateY(2px) rotate(6deg)' }, { transform: 'rotate(-6deg)' }], ms: 760 }
  };
  const SCHON_DA = new Set(['bw-schnecke']);
  const AUFTRITT_TEMPO = 95;

  const buehne = (ebene, g, m) => {
    const T = { g, z: (art, d) => zugabe(ebene, art, d ? [m[0] + d[0], m[1] + d[1]] : m) };
    const mitDreh = (e) => { e.style.transformBox = 'fill-box'; e.style.transformOrigin = '50% 50%'; return e; };
    T.spiel = (frames, ms, opt = {}) => g.animate(frames, { duration: ms, easing: opt.easing || HAUS, composite: opt.ersetzen ? 'replace' : 'add' });
    T.lauf = (e, frames, ms, verzug = 0) => e.animate(frames, { duration: ms, delay: verzug, easing: HAUS, fill: 'both' });
    T.ding = (wort, dx, dy, gr) => {
      const href = ((window.LB_BILDDATEN || {})[wort] || {}).farbe; if (!href) return null;
      const i = s('image', { x: (m[0] + dx - gr / 2).toFixed(1), y: (m[1] + dy - gr / 2).toFixed(1), width: gr, height: gr });
      i.setAttribute('href', href); ebene.append(i); return mitDreh(i);
    };
    T.kreis = (dx, dy, r, farbe) => { const c = s('circle', { cx: m[0] + dx, cy: m[1] + dy, r, fill: farbe }); ebene.append(c); return mitDreh(c); };
    return T;
  };
  window.LB_MACKEN = {
    hat: (schl) => !!MACKE[schl],
    varianten: (schl) => VARIANTEN[schl] ? alle(VARIANTEN[schl]).length : 0,
    spiele: (schl, el, wirt, nr) => {
      const m = MACKE[schl]; if (!m || !el || matchMedia('(prefers-reduced-motion: reduce)').matches) return 0;
      el.style.transformOrigin = '50% 100%';
      let ebene = null, svg = null;
      if (wirt) {
        const a = el.getBoundingClientRect(), b = wirt.getBoundingClientRect(), k = a.width / 40;
        svg = s('svg', { viewBox: '-60 -60 120 120', class: 'macke-buehne', 'aria-hidden': 'true' });
        Object.assign(svg.style, { position: 'absolute', left: (a.left - b.left + a.width / 2 - 60 * k) + 'px', top: (a.top - b.top + a.height / 2 - 60 * k) + 'px', width: 120 * k + 'px', height: 120 * k + 'px', pointerEvents: 'none', overflow: 'visible' });
        ebene = s('g'); svg.append(ebene); wirt.append(svg);
      } else ebene = s('g');
      const T = buehne(ebene, el, [0, 0]);
      const ms = m(T, nr);
      setTimeout(() => svg && svg.remove(), ms + 400);
      return ms;
    }
  };

  let alltagUhr = 0;
  window.LB_FIGUREN = (K, opt = {}) => {
    const svg = K.svg, dinge = K.E.dinge, ruhig = opt.ruhig || (() => matchMedia('(prefers-reduced-motion: reduce)').matches);
    const LEB = opt.LEBENSRAUM || {}; LEBR = LEB;
    clearTimeout(alltagUhr);
    const figuren = [...dinge.querySelectorAll('g.bewohner[data-bewohner]')];
    if (!figuren.length) return;
    const mackeVon = new Map();
    dinge.querySelectorAll('.figur-zugaben').forEach(x => x.remove());
    const ebene = s('g', { class: 'figur-zugaben', 'aria-hidden': 'true' }); dinge.append(ebene);
    const begegnung = (bwA, bwB) => {
      const a = bwA.dataset.bewohner, b = bwB.dataset.bewohner;
      const gA = bwA.querySelector('.geste') || bwA, gB = bwB.querySelector('.geste') || bwB;
      const wer = { [a]: gA, [b]: gB }, figVon = (g) => g === gA ? bwA : bwB;
      const z = (artZ, g) => zugabe(ebene, artZ, g ? mitte(figVon(g)) : [(mitte(bwA)[0] + mitte(bwB)[0]) / 2, (mitte(bwA)[1] + mitte(bwB)[1]) / 2]);
      const bild = (wort, gr) => { const href = ((window.LB_BILDDATEN || {})[wort] || {}).farbe; if (!href) return null; const i = s('image', { width: gr, height: gr }); i.setAttribute('href', href); i.style.transformBox = 'fill-box'; i.style.transformOrigin = '50% 50%'; ebene.append(i); setTimeout(() => i.remove(), 2600); return i; };
      const d = {
        zeige: (g, wort, gr = 14) => { const i = bild(wort, gr); if (!i) return; const [x, y] = mitte(figVon(g)); i.setAttribute('x', (x + 14 - gr / 2).toFixed(1)); i.setAttribute('y', (y + 8 - gr / 2).toFixed(1)); i.animate([...auf(), { opacity: 1, transform: 'scale(1)', offset: .8 }, { opacity: 0, transform: 'scale(.9)' }], { duration: 1800, easing: HAUS, fill: 'forwards' }); },
        wandere: (wort, von, zu, gr = 14) => { const i = bild(wort, gr); if (!i) return; const [x0, y0] = mitte(figVon(von)), [x1, y1] = mitte(figVon(zu)); i.setAttribute('x', (x0 - gr / 2).toFixed(1)); i.setAttribute('y', (y0 - gr / 2).toFixed(1));
          i.animate([{ opacity: 0, transform: 'translate(0px,0px) scale(.3)' }, { opacity: 1, transform: 'translate(0px,-10px) scale(1)', offset: .2 }, { opacity: 1, transform: `translate(${(x1 - x0).toFixed(1)}px,${(y1 - y0 - 10).toFixed(1)}px)`, offset: .75 }, { opacity: 0, transform: `translate(${(x1 - x0).toFixed(1)}px,${(y1 - y0).toFixed(1)}px) scale(.6)` }], { duration: 1600, easing: HAUS, fill: 'forwards' }); }
      };
      const paar = PAARE.find(p => passt(p, a, b) || passt(p, b, a));
      const ich = paar ? (paar.a === a ? gA : gB) : gA, du = ich === gA ? gB : gA;
      const schluessel = paar ? 'p:' + PAARE.indexOf(paar) : 'a:' + artPaar(a, b), tun = paar ? paar.tun : NACH_ART[artPaar(a, b)] || NACH_ART['land|land'];
      const n = runde.get(schluessel) || 0; runde.set(schluessel, n + 1);
      tun[n % tun.length]({ ich, du, z, d, wer });
    };
    const haus = opt.einziehen ? dinge.querySelector('.haus-ding[data-tuer]') : null, steuer = new Map();
    const tuer = () => haus.dataset.tuer.split(' ').map(Number);
    const ueberHaus = (bw) => {
      if (!haus) return false;
      const r = haus.querySelector('.ding-flaeche').getBBox(), [hx, hy] = lage(haus), [mx, my] = mitte(bw);
      return mx > hx + r.x + 6 && mx < hx + r.x + r.width - 6 && my > hy + r.y + 8 && my < hy + r.y + r.height;
    };
    const zuKarte = (cx, cy) => { const m = svg.getScreenCTM(); if (!m) return [cx, cy]; const p = new DOMPoint(cx, cy).matrixTransform(m.inverse()); return [p.x, p.y]; };
    const vb = svg.viewBox.baseVal;
    for (const bw of figuren) {
      const schl = bw.dataset.bewohner, art = LEB[schl] || 'land';
      const lebt = bw.querySelector('.lebt'); if (!lebt) continue;
      const geste = s('g', { class: 'geste' }); geste.style.transformBox = 'fill-box'; geste.style.transformOrigin = '50% 100%';
      bw.insertBefore(geste, lebt); geste.append(lebt);
      bw.classList.add('figur'); bw.setAttribute('role', 'img'); bw.setAttribute('aria-label', (schl || '').replace(/^bw-/, ''));
      bw.dataset.heim = lage(bw).join(' ');
      if (bw.dataset.von && (ruhig() || bw.classList.contains('im-haus'))) delete bw.dataset.von;
      if (bw.dataset.von) { const [vx, vy] = bw.dataset.von.split(' ').map(Number); if (Number.isFinite(vx) && Number.isFinite(vy)) { setze(bw, vx, vy); bw.classList.add('kommt'); } else delete bw.dataset.von; }
      const z = (artZ, um) => zugabe(ebene, artZ, mitte(um || bw));
      const macke = () => {
        const m = MACKE[schl]; if (!m) return false;
        if (bw.dataset.macke) return true;
        const eb = s('g', { class: 'figur-zugabe', 'aria-hidden': 'true' }); ebene.append(eb);
        const T = buehne(eb, geste, mitte(bw));
        if (SCHON_DA.has(schl)) T.versetze = versetze;
        bw.dataset.macke = '1';
        const ms = m(T);
        setTimeout(() => { eb.remove(); delete bw.dataset.macke; }, ms + 400);
        return true;
      };
      mackeVon.set(bw, macke);
      const tippen = () => {
        if (ruhig()) { geste.animate([{ opacity: 1 }, { opacity: .55 }, { opacity: 1 }], { duration: 260 }); return; }
        if (macke()) return;
        (GESTE[EIGEN[schl]] || GESTE[art] || GESTE.land)(geste);
        if (ZUGABE[schl]) z(ZUGABE[schl]);
      };
      let zug = null, wandern = null;
      const obenAuf = () => { for (let n = bw.nextSibling; n;) { const w = n.nextSibling; if (n !== ebene) dinge.insertBefore(n, bw); n = w; } };
      const halt = () => { if (wandern) { wandern.ab = true; wandern = null; } bw.classList.remove('wandert'); };
      const runter = (e) => {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        e.stopPropagation();
        halt();
        const [x0, y0] = lage(bw), [px, py] = zuKarte(e.clientX, e.clientY);
        zug = { id: e.pointerId, sx: e.clientX, sy: e.clientY, x0, y0, px, py, zieht: false };
        try { bw.setPointerCapture(e.pointerId); } catch (_) {}
      };
      const bewegt = (e) => {
        if (!zug || e.pointerId !== zug.id) return;
        if (!zug.zieht && Math.hypot(e.clientX - zug.sx, e.clientY - zug.sy) < SCHWELLE) return;
        if (!zug.zieht) { zug.zieht = true; bw.classList.add('gezogen'); obenAuf(); }
        const [px, py] = zuKarte(e.clientX, e.clientY);
        const x = Math.max(vb.x - 10, Math.min(vb.x + vb.width - 30, zug.x0 + px - zug.px));
        const y = Math.max(vb.y - 10, Math.min(vb.y + vb.height - 30, zug.y0 + py - zug.py));
        setze(bw, x, y);
        if (haus) haus.classList.toggle('nimmt', ueberHaus(bw));
        e.preventDefault();
      };
      const hoch = (e) => {
        if (!zug || e.pointerId !== zug.id) return;
        const war = zug; zug = null;
        try { bw.releasePointerCapture(e.pointerId); } catch (_) {}
        bw.classList.remove('gezogen');
        if (!war.zieht) { tippen(); return; }
        ablegen();
      };
      const ablegen = async () => {
        if (haus) haus.classList.remove('nimmt');
        if (ueberHaus(bw)) { hinein(); return; }
        const [mx, my] = mitte(bw);
        let nah = null, best = NACHBAR;
        for (const o of figuren) { if (o === bw || !o.isConnected || o.classList.contains('im-haus')) continue; const [ox, oy] = mitte(o), d = Math.hypot(ox - mx, oy - my); if (d < best) { best = d; nah = o; } }
        const meine = { ab: false }; wandern = meine;
        if (nah && !ruhig()) {
          begegnung(bw, nah);
          await warte(2200);
        } else {
          const sn = schl !== 'bw-schnecke' && !ruhig() && Math.random() < 1 / 6 && steuer.get('bw-schnecke');
          if (sn) sn.daNach(Math.min(vb.x + vb.width - 40, mx + 14), my - 20);
          await warte(ruhig() ? 600 : RAST);
        }
        if (meine.ab) return;
        heimwaerts(meine);
      };
      const gehe = async (meine, zx, zy, ms, bogen = 0) => {
        const [x0, y0] = lage(bw), G = GANG[schl] || GANG_ART[art], d = zx < x0 ? -1 : 1, takt = G ? G.ms : 420;
        const schritt = geste.animate(G ? G.f(d) : [{ transform: 'none' }, { transform: `translateY(-3px) rotate(${d * 4}deg)` }, { transform: 'none' }], { duration: takt, iterations: Math.ceil(ms / takt), composite: 'add' });
        const t0 = performance.now();
        await new Promise(fertigWeg => {
          const grenze = setTimeout(fertigWeg, ms + 500);
          const lauf = (t) => {
            if (meine.ab || !bw.isConnected) { clearTimeout(grenze); fertigWeg(); return; }
            const f = Math.min(1, (t - t0) / ms), e = f < .5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2;
            setze(bw, x0 + (zx - x0) * e, y0 + (zy - y0) * e - Math.sin(Math.PI * e) * bogen);
            if (f < 1) requestAnimationFrame(lauf); else { clearTimeout(grenze); fertigWeg(); }
          };
          requestAnimationFrame(lauf);
        });
        schritt.cancel();
        if (!meine.ab) setze(bw, zx, zy);
      };
      const heimwaerts = async (meine) => {
        const [hx, hy] = bw.dataset.heim.split(' ').map(Number), [x0, y0] = lage(bw), weit = Math.hypot(hx - x0, hy - y0);
        if (weit < 1) return;
        if (ruhig()) {
          await fertig(geste.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 160, fill: 'forwards' }), 160);
          if (meine.ab) return; setze(bw, hx, hy);
          geste.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200 }); return;
        }
        if (SCHON_DA.has(schl)) { await schonDa(hx, hy, meine); if (wandern === meine) wandern = null; return; }
        bw.classList.add('wandert');
        await gehe(meine, hx, hy, Math.max(1500, Math.min(7000, weit / TEMPO * 1000)));
        if (!meine.ab) { bw.classList.remove('wandert'); if (wandern === meine) wandern = null; }
      };
      const schonDa = async (zx, zy, meine) => {
        const aus = geste.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 280, fill: 'forwards' });
        await fertig(aus, 280);
        if (meine.ab) { aus.cancel(); return; }
        setze(bw, zx, zy);
        await warte(600);
        aus.cancel();
        if (!meine.ab) geste.animate([{ opacity: 0, transform: 'scale(.7)' }, { opacity: 1, transform: 'none' }], { duration: 380, easing: HAUS });
      };
      const versetze = async () => {
        halt(); const meine = { ab: false }; wandern = meine;
        const [x, y] = lage(bw), rechts = x + 100 < vb.x + vb.width;
        await schonDa(x + (rechts ? 58 : -58), Math.max(vb.y, y + (y > vb.y + 30 ? -10 : 10)), meine);
        await warte(2600);
        if (!meine.ab) heimwaerts(meine);
      };
      const hinein = async () => {
        let erg = null; try { erg = opt.einziehen(schl); } catch (_) { erg = null; }
        const meine = { ab: false }; wandern = meine;
        if (!erg || !erg.drin) { await warte(ruhig() ? 300 : RAST); if (!meine.ab) heimwaerts(meine); return; }
        bw.classList.add('geht');
        const [tx, ty] = tuer();
        if (ruhig()) await fertig(geste.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 160, fill: 'forwards' }), 160);
        else {
          bw.classList.add('wandert');
          await gehe(meine, tx - 20, ty - 38, 560);
          await fertig(geste.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(-3px) scale(.5)' }], { duration: 420, easing: HAUS, fill: 'forwards' }), 420);
        }
        bw.classList.add('im-haus'); bw.classList.remove('geht', 'wandert');
        geste.getAnimations().forEach(a => a.cancel());
        setze(bw, ...bw.dataset.heim.split(' ').map(Number));
        if (wandern === meine) wandern = null;
        const raus = erg.raus && steuer.get(erg.raus);
        if (raus) raus.heraus();
      };
      const heraus = async () => {
        halt(); bw.classList.remove('im-haus');
        if (ruhig() || SCHON_DA.has(schl) || !haus) { setze(bw, ...bw.dataset.heim.split(' ').map(Number)); geste.animate([{ opacity: 0 }, { opacity: 1 }], { duration: ruhig() ? 200 : 380 }); return; }
        const [tx, ty] = tuer(); setze(bw, tx - 20, ty - 38);
        const meine = { ab: false }; wandern = meine;
        await fertig(geste.animate([{ opacity: 0, transform: 'translateY(-3px) scale(.5)' }, { opacity: 1, transform: 'none' }], { duration: 420, easing: HAUS }), 420);
        await warte(500);
        if (schl === 'bw-uhu' && !meine.ab) { macke(); await warte(1250); }
        if (!meine.ab) heimwaerts(meine);
      };
      const auftritt = async () => {
        const [hx, hy] = bw.dataset.heim.split(' ').map(Number), [ox, oy] = (bw.dataset.herkunft || '').split(' ').map(Number);
        const meine = { ab: false };
        try {
          bw.classList.remove('wartet');
          if (!Number.isFinite(ox) || !Number.isFinite(oy) || ruhig() || !bw.isConnected) return;
          halt(); wandern = meine; obenAuf();
          setze(bw, ox - 20, oy - 20);
          await fertig(geste.animate([{ opacity: 0, transform: 'translateY(6px) scale(.3)' }, { opacity: 1, transform: 'none' }], { duration: 520, easing: HAUS }), 520);
          const weit = Math.hypot(hx - ox + 20, hy - oy + 20);
          if (SCHON_DA.has(schl)) await schonDa(hx, hy, meine);
          else {
            bw.classList.add('wandert');
            await gehe(meine, hx, hy, Math.max(1200, Math.min(4500, weit / AUFTRITT_TEMPO * 1000)), art === 'luft' ? Math.min(80, weit * .35) : 0);
            bw.classList.remove('wandert');
            if (!meine.ab) (GESTE[art] || GESTE.land)(geste);
          }
        } finally {
          if (!meine.ab && bw.isConnected) setze(bw, hx, hy);
          if (wandern === meine) wandern = null;
          bw.classList.remove('kommt', 'wartet', 'wandert'); delete bw.dataset.neu;
        }
      };
      const umzug = async () => {
        const [hx, hy] = bw.dataset.heim.split(' ').map(Number), meine = { ab: false };
        try {
          if (!bw.isConnected || ruhig()) return;
          halt(); wandern = meine;
          (GESTE[art] || GESTE.land)(geste); await warte(750);
          if (meine.ab) return;
          const [x0, y0] = lage(bw), weit = Math.hypot(hx - x0, hy - y0);
          if (SCHON_DA.has(schl)) await schonDa(hx, hy, meine);
          else { bw.classList.add('wandert'); await gehe(meine, hx, hy, Math.max(1400, Math.min(5000, weit / 55 * 1000)), art === 'luft' ? Math.min(60, weit * .35) : 0); }
        } finally {
          if (!meine.ab && bw.isConnected) setze(bw, hx, hy);
          if (wandern === meine) wandern = null;
          bw.classList.remove('kommt', 'wandert'); delete bw.dataset.von;
        }
      };
      const daNach = async (x, y) => {
        if (bw.classList.contains('im-haus') || bw.dataset.macke || zug) return;
        halt(); const meine = { ab: false }; wandern = meine;
        await schonDa(x, y, meine); await warte(2600);
        if (!meine.ab) heimwaerts(meine);
      };
      steuer.set(schl, { heraus, auftritt, umzug, daNach });
      bw.addEventListener('pointerdown', runter);
      bw.addEventListener('pointermove', bewegt);
      bw.addEventListener('pointerup', hoch);
      bw.addEventListener('pointercancel', (e) => { if (zug && e.pointerId === zug.id) { zug = null; bw.classList.remove('gezogen'); ablegen(); } });
      bw.addEventListener('click', (e) => e.stopPropagation());
      bw.addEventListener('touchstart', (e) => e.preventDefault(), { passive: false });
    }
    const sichtbar = (bw) => {
      const r = bw.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
      if (r.width < 4 || x < 0 || y < 0 || x > innerWidth || y > innerHeight) return false;
      const hit = document.elementFromPoint(x, y); return !!hit && bw.contains(hit);
    };
    const alltag = () => {
      alltagUhr = setTimeout(() => {
        if (!svg.isConnected) return;
        if (document.visibilityState === 'visible' && !ruhig()) {
          const wer = figuren.filter(bw => mackeVon.has(bw) && MACKE[bw.dataset.bewohner] && bw.isConnected && !bw.dataset.macke && !bw.matches('.im-haus, .gezogen, .wandert, .geht, .kommt') && sichtbar(bw));
          const paare = Math.random() < .25 ? wer.flatMap((p, i) => wer.slice(i + 1).filter(q => Math.hypot(mitte(p)[0] - mitte(q)[0], mitte(p)[1] - mitte(q)[1]) < NACHBAR * 1.5).map(q => [p, q])) : [];
          if (paare.length) begegnung(...paare[Math.floor(Math.random() * paare.length)]);
          else if (wer.length) mackeVon.get(wer[Math.floor(Math.random() * wer.length)])();
        }
        alltag();
      }, 15000 + Math.random() * 15000);
    };
    alltag();
    const raus = (opt.heraus || []).map(s => dinge.querySelector(`g.bewohner.figur[data-bewohner="${s}"]`)).filter(bw => bw && bw.classList.contains('im-haus') && steuer.has(bw.dataset.bewohner));
    const neue = figuren.filter(bw => bw.dataset.neu && steuer.has(bw.dataset.bewohner));
    const umziehen = figuren.filter(bw => bw.dataset.von && steuer.has(bw.dataset.bewohner));
    if (!raus.length && !neue.length && !umziehen.length) return;
    if (ruhig()) { raus.forEach(bw => steuer.get(bw.dataset.bewohner).heraus()); neue.forEach(bw => delete bw.dataset.neu); return; }
    neue.forEach(bw => bw.classList.add('kommt', 'wartet'));
    const kartenBlick = () => {
      const r = svg.getBoundingClientRect(), x = (Math.max(0, r.left) + Math.min(innerWidth, r.right)) / 2, y = (Math.max(0, r.top) + Math.min(innerHeight, r.bottom)) / 2;
      if (r.width < 4 || x <= 0 || y <= 0) return false;
      const hit = document.elementFromPoint(x, y); return !!hit && svg.contains(hit);
    };
    (async () => {
      const t0 = performance.now();
      while (svg.isConnected && performance.now() - t0 < 20000 && !(document.visibilityState === 'visible' && kartenBlick())) await warte(150);
      if (!svg.isConnected) return;
      await warte(700);
      for (const bw of raus) {
        if (!bw.isConnected) return;
        await Promise.race([steuer.get(bw.dataset.bewohner).heraus(), warte(3000)]);
        await warte(600);
      }
      const umzuege = [];
      for (const bw of umziehen) {
        if (!bw.isConnected) return;
        umzuege.push(Promise.race([steuer.get(bw.dataset.bewohner).umzug(), warte(9000)]).then(() => { bw.classList.remove('kommt', 'wandert'); delete bw.dataset.von; }));
        await warte(600);
      }
      await Promise.all(umzuege);
      if (umzuege.length) await warte(400);
      for (const bw of neue) {
        if (!bw.isConnected) return;
        await Promise.race([steuer.get(bw.dataset.bewohner).auftritt(), warte(9000)]);
        bw.classList.remove('kommt', 'wartet'); delete bw.dataset.neu;
        await warte(250);
      }
    })();
  };
})();
