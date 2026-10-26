(() => {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const s = (tag, attr = {}, kinder = []) => {
    const e = document.createElementNS(NS, tag);
    for (const [k, v] of Object.entries(attr)) e.setAttribute(k, v);
    for (const k of [].concat(kinder)) if (k) e.append(k);
    return e;
  };
  const pfad = (d, cls) => s('path', { d, class: cls || '' });
  const goldWimpel = (x, y) => s('g', { class: 'wimpel-gold' }, [pfad(`M${x} ${y} V${y - 16}`), pfad(`M${x} ${y - 16} L${x + 12} ${y - 11} L${x} ${y - 6} Z`, 'voll')]);
  const ORTE = {
    berg: () => [pfad('M-44 22 L-24 -24 L-6 4 L0 -6 L22 -30 L46 22 Z', 'flaeche'), pfad('M-30 -10 L-24 -24 L-18 -12 M16 -20 L22 -30 L29 -19'), goldWimpel(22, -30)],
    zelt: () => [pfad('M-36 22 L0 -32 L36 22 Z', 'flaeche'), pfad('M-17 -3 H17'), pfad('M-8 22 L0 8 L8 22'), s('circle', { cx: 0, cy: 14, r: 5, class: 'licht' }), goldWimpel(0, -32)],
    turm: () => [pfad('M-8 24 V-28 H8 V24 Z', 'flaeche'), pfad('M-16 -28 H16 M-16 24 H16'), pfad('M-3 -14 h6 v8 h-6 z'), s('circle', { cx: 0, cy: -10, r: 4, class: 'licht' }), goldWimpel(0, -28)],
    teich: () => [s('ellipse', { cx: 0, cy: 4, rx: 38, ry: 20, class: 'wasser' }), s('ellipse', { cx: 0, cy: 4, rx: 20, ry: 9, class: 'welle' }),
                  pfad('M-30 -10 q4 -10 8 0 M24 -12 q3 -8 6 0'), goldWimpel(34, -8)],
    hafen: () => [pfad('M-32 -24 V2 Q-32 24 0 24 Q32 24 32 2 V-24'), pfad('M-20 12 H20 Q12 22 0 22 Q-12 22 -20 12 Z', 'wasser'),
                  pfad('M-10 6 H10 L6 12 H-6 Z', 'flaeche'), pfad('M0 6 V-10 L9 -2 Z'), goldWimpel(32, -24)],
    zaun: () => [pfad('M-26 -26 V24'), pfad('M-26 -26 H26 M-26 0 H18 M-26 24 H26'), pfad('M-8 -26 V24 M10 -26 V24'),
                 pfad('M30 24 q2 -8 4 0 M-38 24 q2 -6 4 0'), goldWimpel(-26, -26)],
    fahne: () => [pfad('M-14 26 V-30'), pfad('M-14 -30 H8 Q24 -30 24 -15 Q24 0 8 0 H-14', 'flaeche'), pfad('M-26 26 H-2'), goldWimpel(-14, -30)],
    wellen: () => [pfad('M-40 -14 L-24 18 L-8 -6 L8 18 L24 -14', 'wasser'), pfad('M-40 4 q8 -8 16 0 q8 8 16 0 q8 -8 16 0 q8 8 16 0 q8 -8 16 0'), pfad('M-36 24 q8 -6 16 0 q8 6 16 0 q8 -6 16 0 q8 6 16 0')],
    bruecke: () => [pfad('M-44 18 Q0 -34 44 18'), pfad('M-44 18 H44'), pfad('M-30 6 V18 M-15 -2 V18 M0 -6 V18 M15 -2 V18 M30 6 V18')],
    tor: () => [pfad('M-20 24 V-8 Q0 -32 20 -8 V24'), pfad('M-28 24 H28'), pfad('M-10 24 V2 Q0 -10 10 2 V24', 'flaeche')],
    zirkus: () => [pfad('M-38 22 L0 -30 L38 22 Z', 'flaeche'), pfad('M-19 -4 L-12 22 M0 -30 V22 M19 -4 L12 22'), pfad('M-10 22 Q0 6 10 22', 'licht'),
                   pfad('M0 -30 V-40 L10 -36 L0 -32', 'voll'), pfad('M-30 22 V12 M30 22 V12'), goldWimpel(-24, -6)],
    brunnen: () => [s('ellipse', { cx: 0, cy: 10, rx: 26, ry: 8, class: 'wasser' }), pfad('M-26 10 V20 Q0 32 26 20 V10', 'flaeche'),
                    pfad('M-22 10 V-18 M22 10 V-18 M-28 -18 L0 -34 L28 -18 Z'), pfad('M0 -18 V0'), pfad('M-5 0 h10 v6 h-10 z', 'voll'), goldWimpel(0, -34)],
    haengematte: () => [pfad('M-34 24 V-16 M34 24 V-16'), s('circle', { cx: -34, cy: -24, r: 12, class: 'baum' }), s('circle', { cx: 34, cy: -24, r: 12, class: 'baum' }),
                        pfad('M-32 -4 Q0 26 32 -4', 'flaeche'), pfad('M-32 -4 Q0 18 32 -4'), goldWimpel(34, -36)],
    huehnerhof: () => [pfad('M-34 22 V-4 L-14 -22 L6 -4 V22 Z', 'flaeche'), pfad('M-20 22 V8 H-8 V22'), s('ellipse', { cx: 24, cy: 16, rx: 14, ry: 6, class: 'baum' }),
                       s('ellipse', { cx: 24, cy: 9, rx: 5, ry: 7, class: 'licht' }), goldWimpel(-14, -22)],
    baumhaus: () => [pfad('M-4 26 V-6 M4 26 V-6'), s('circle', { cx: 0, cy: -20, r: 26, class: 'baum' }), pfad('M-16 -16 H16 V2 H-16 Z', 'flaeche'),
                     pfad('M-20 -16 L0 -30 L20 -16'), s('rect', { x: -5, y: -12, width: 10, height: 8, class: 'licht' }), pfad('M12 2 L18 26 M16 10 h5 M17.5 18 h5'), goldWimpel(0, -30)],
    scheune: () => [pfad('M-34 24 V-6 L0 -30 L34 -6 V24 Z', 'flaeche'), pfad('M-12 24 V0 H12 V24 M-12 0 L12 24 M12 0 L-12 24'),
                    pfad('M24 24 q-6 -14 4 -18 q12 4 6 18', 'licht'), goldWimpel(0, -30)],
    burgtor: () => [pfad('M-30 24 V-14 H-22 V-22 H-12 V-14 H12 V-22 H22 V-14 H30 V24 Z', 'flaeche'), pfad('M-12 24 V0 Q0 -14 12 0 V24'), pfad('M-12 6 H12 M-12 14 H12')],
    rankentor: () => [pfad('M-22 24 V-6 Q0 -34 22 -6 V24'), pfad('M-30 24 H30'), pfad('M-22 14 q-8 -4 0 -8 q-8 -4 0 -8 M22 10 q8 -4 0 -8 q8 -4 0 -8 M-12 -20 q12 -12 24 0', 'licht'),
                      s('circle', { cx: 0, cy: 10, r: 5, class: 'baum' })],
    treppentor: () => [pfad('M-20 24 V-8 Q0 -30 20 -8 V24'), pfad('M-36 24 H36 M-30 18 H30 M-24 12 H24', 'flaeche'), pfad('M-10 12 V0 Q0 -10 10 0 V12', 'flaeche')],
    uhrtor: () => [pfad('M-24 24 V-4 Q0 -30 24 -4 V24'), pfad('M-30 24 H30'), s('circle', { cx: 0, cy: -6, r: 11, class: 'flaeche' }), pfad('M0 -6 V-14 M0 -6 H6', 'voll'),
                   pfad('M-12 24 V12 Q0 4 12 12 V24', 'flaeche')],
    leuchtturm: () => [pfad('M-12 26 L-7 -24 H7 L12 26 Z', 'flaeche'), pfad('M-10 -24 V-36 H10 V-24'), pfad('M-13 -36 L0 -46 L13 -36'),
                       pfad('M-10 8 H10 M-8.5 -8 H8.5'), s('rect', { x: -6, y: -34, width: 12, height: 9, class: 'licht' })]
  };
  const VOEGEL = () => [pfad('M-16 -46 q4 -5 8 0 q4 -5 8 0'), pfad('M6 -52 q4 -5 8 0 q4 -5 8 0')];
  const TEILE = [
    { id: 'p1', teil: 'p', stufen: ['p1'], boss: false, z: 'kon', zeichen: ['M', 'm'], ort: 'berg', gestalt: 'weich' },
    { id: 'p2', teil: 'p', stufen: ['p2'], boss: false, z: 'kon', zeichen: ['P', 'p'], ort: 'fahne', gestalt: 'hart' },
    { id: 'p3', teil: 'p', stufen: ['p3', 'p4'], z: 'kon', zeichen: ['W', 'w'], ort: 'wellen', gestalt: 'zisch' },
    { id: 'a', z: 'vok', zeichen: ['A', 'a'], ort: 'zelt', gestalt: 'A', krone: true },
    { id: 'i', z: 'vok', zeichen: ['I', 'i'], ort: 'turm', gestalt: 'I', krone: true },
    { id: 'o', z: 'vok', zeichen: ['O', 'o'], ort: 'teich', gestalt: 'O', krone: true },
    { id: 'u', z: 'vok', zeichen: ['U', 'u'], ort: 'hafen', gestalt: 'U', krone: true },
    { id: 'e', z: 'vok', zeichen: ['E', 'e'], ort: 'zaun', gestalt: 'E', krone: true },
    { id: 'r1', z: 'regel', regel: 'ende', zeichen: ['ie ch', ''], ort: 'burgtor', gestalt: 'tor' },
    { id: 'ae', z: 'uml', zeichen: ['Ä', 'ä'], ort: 'zirkus', voegel: true, gestalt: 'A', edel: true },
    { id: 'oe', z: 'uml', zeichen: ['Ö', 'ö'], ort: 'brunnen', voegel: true, gestalt: 'O', edel: true },
    { id: 'ue', z: 'uml', zeichen: ['Ü', 'ü'], ort: 'haengematte', voegel: true, gestalt: 'U', edel: true },
    { id: 'ei', z: 'zwie', zeichen: ['EI', ''], ort: 'huehnerhof', gestalt: 'E|I' },
    { id: 'au', z: 'zwie', zeichen: ['AU', ''], ort: 'baumhaus', gestalt: 'A|U' },
    { id: 'eu', z: 'zwie', zeichen: ['EU', ''], ort: 'scheune', gestalt: 'E|U' },
    { id: 'r2', z: 'regel', regel: 'chamaeleon', zeichen: ['v y', ''], ort: 'rankentor', gestalt: 'tor' },
    { id: 'r3', z: 'regel', regel: 'sp-st', zeichen: ['sp', ''], ort: 'treppentor', gestalt: 'tor' },
    { id: 'r4', z: 'regel', regel: 'doppel', zeichen: ['ck ß', ''], ort: 'uhrtor', gestalt: 'tor' },
    { id: 'ziel', z: 'regel', zeichen: ['', ''], ort: 'leuchtturm', ziel: true, gestalt: 'laterne' }
  ];
  const QUER = { w: 1000, h: 700, gross: 1.06, p: [[80, 172], [220, 156], [360, 182], [500, 156], [640, 182], [780, 156], [920, 176],
                 [900, 412], [740, 432], [580, 408], [420, 432], [260, 408], [100, 428],
                 [100, 626], [260, 642], [420, 622], [580, 642], [740, 622], [890, 612]] };
  const HOCH = { w: 600, h: 1500, gross: 1, p: [[120, 170], [300, 150], [480, 175], [480, 370], [300, 390], [120, 365],
                 [120, 570], [300, 590], [480, 565], [480, 770], [300, 790], [120, 765],
                 [120, 970], [300, 990], [480, 965], [480, 1170], [300, 1190], [120, 1165], [280, 1390]] };
  const B = window.LAUTBUCH_WEG_BILDER || null;
  const setze = (box, maxB, maxH, boden, cx = 0) => {
    const bw = box[2] - box[0], bh = box[3] - box[1], S = Math.min(maxB / bw, maxH / bh);
    return { x: cx - (box[0] + box[2]) / 2 * S, y: boden - box[3] * S, S, oben: boden - bh * S, halb: bw * S / 2 };
  };
  const bild = (href, l, cls, box) => s('image', { href, x: l.x.toFixed(1), y: l.y.toFixed(1), width: l.S.toFixed(1), height: l.S.toFixed(1), class: cls, preserveAspectRatio: 'none', ...(box ? { 'data-inhalt': box.join(' ') } : {}) });
  const ortTeile = (art, voegel) => {
    if (!B || !B.farbe[art]) return [...ORTE[art](), ...(voegel ? VOEGEL() : [])];
    const maxH = voegel ? 60 : 70;
    const lf = setze(B.box[art], 96, maxH, 26), ll = setze(B.boxLinie[art], 96, maxH, 26);
    const teile = [bild(B.linie[art], ll, 'ort-linie', B.boxLinie[art]), bild(B.farbe[art], lf, 'ort-farbe', B.box[art])];
    const sp = B.spitze[art];
    if (art !== 'leuchtturm' && art !== 'bruecke' && art !== 'tor') teile.push(goldWimpel(Math.round(lf.x + sp[0] * lf.S), Math.round(lf.y + sp[1] * lf.S + 2)));
    if (voegel && B.farbe.voegel) {
      const vx = Math.round(lf.x + sp[0] * lf.S) - 25;
      const vf = setze(B.box.voegel, 44, 13, lf.oben - 3, vx), vl = setze(B.boxLinie.voegel, 44, 13, lf.oben - 3, vx);
      teile.push(bild(B.linie.voegel, vl, 'ort-linie', B.boxLinie.voegel), bild(B.farbe.voegel, vf, 'ort-farbe', B.box.voegel));
    } else if (voegel) teile.push(...VOEGEL());
    return teile;
  };
  const nebelBild = (k, cx, cy, rx, ry, cls) => {
    if (!B || !B.nebel[k]) return null;
    const b = B.boxNebel[k], W = 2 * rx / (b[2] - b[0]), H = 2 * ry / (b[3] - b[1]);
    return s('image', { href: B.nebel[k], x: (cx - (b[0] + b[2]) / 2 * W).toFixed(1), y: (cy - (b[1] + b[3]) / 2 * H).toFixed(1), width: W.toFixed(1), height: H.toFixed(1), preserveAspectRatio: 'none', class: cls || '' });
  };
  const ortBild = (art, cls, voegel) => s('svg', { class: 'ort-bild ' + (cls || ''), viewBox: '-56 -60 112 92', 'aria-hidden': 'true' },
    [s('g', { class: 'ort' }, ortTeile(art, voegel))]);
  const GESTALT = {
    A: { d: 'M-3 -31 Q0 -36 3 -31 L33 26 Q35 32 29 32 H-29 Q-35 32 -33 26 Z', oben: -34, ty: 13 },
    I: { d: 'M-24 -33 H24 V-26 H17 V25 H24 V32 H-24 V25 H-17 V-26 H-24 Z', oben: -33, ty: 0 },
    O: { d: 'M0 -31 A31 31 0 1 1 -0.01 -31 Z', oben: -31, ty: 0 },
    U: { d: 'M-30 -31 H30 V2 A30 30 0 0 1 -30 2 Z', oben: -31, ty: -4 },
    E: { d: 'M-31 -31 H31 V-19 H17 V-6 H27 V6 H17 V19 H31 V31 H-31 Z', oben: -31, ty: 0, tx: -6 },
    weich: { d: 'M-31 -2 C-31 -22 -13 -31 4 -30 C22 -29 32 -15 31 2 C30 20 15 30 -3 30 C-21 30 -31 16 -31 -2 Z', oben: -30, ty: 0 },
    hart: { d: 'M-8 -31 L21 -25 L32 -1 L22 27 L-11 31 L-31 10 L-27 -19 Z', oben: -31, ty: 0 },
    zisch: { d: 'M-4 -31 L22 -24 L32 -2 L22 26 L-4 30 C-22 30 -31 16 -31 -1 C-31 -20 -20 -31 -4 -31 Z', oben: -31, ty: 0 },
    tor: { d: 'M-30 32 V-4 A30 30 0 0 1 30 -4 V32 Z', oben: -34, ty: 9, schluss: true },
    laterne: { d: 'M-12 -32 H12 L30 -14 V14 L12 32 H-12 L-30 14 V-14 Z', oben: -32, ty: 0 },
    rund: { d: 'M0 -29 A29 29 0 1 1 -0.01 -29 Z', oben: -29, ty: 0 }
  };
  const krone = (y) => pfad(`M-11 ${y} L-13 ${y - 12} L-5.5 ${y - 6} L0 ${y - 15} L5.5 ${y - 6} L13 ${y - 12} L11 ${y} Z`, 'krone');
  const edelsteine = (y) => [s('circle', { cx: -8, cy: y - 7, r: 4, class: 'edel' }), s('circle', { cx: 8, cy: y - 7, r: 4, class: 'edel' })];
  const siegel = (art, opt = {}) => {
    const teile = String(art).split('|');
    const bund = teile.length > 1, sk = bund ? (opt.bundSk || .6) : (opt.gross || 1);
    const halo = [], ring = [], form = [], lagen = [];
    teile.forEach((a, k) => {
      const g = GESTALT[a] || GESTALT.rund, dx = bund ? (k ? 1 : -1) * (opt.bundDx || 18) : 0;
      const tf = `translate(${dx} 0) scale(${sk})`;
      halo.push(s('path', { d: g.d, class: 'halo', transform: tf + ' scale(1.22)' }));
      ring.push(s('path', { d: g.d, class: 'ring', transform: tf + ' scale(1.18)' }));
      form.push(s('path', { d: g.d, class: 'siegel', transform: tf }));
      lagen.push({ x: dx + (g.tx || 0) * sk, y: (g.ty || 0) * sk, gr: bund ? 19 * sk / .6 : 26 * Math.min(1, sk) });
    });
    const g0 = GESTALT[teile[0]] || GESTALT.rund;
    const schmuck = [];
    if (opt.krone) schmuck.push(krone(g0.oben * sk - 1));
    if (opt.edel) schmuck.push(...edelsteine(g0.oben * sk - 1));
    if (g0.schluss) schmuck.push(pfad('M-6 -36 H6 L4 -26 H-4 Z', 'edel'));
    const tipp = s('circle', { r: 40, class: 'tipp-flaeche' });
    return { halo, ring, form, schmuck, lagen, tipp, oben: g0.oben * sk };
  };
  const siegelBild = (art, opt = {}) => {
    const t = siegel(art, opt);
    const schrift = [];
    if (opt.schrift && t.lagen.length > 1) [...opt.schrift].forEach((c, k) => {
      const L = t.lagen[k]; if (!L) return;
      const tx = s('text', { class: 'buchstabe', x: L.x, y: L.y + 1, 'font-size': Math.round(L.gr) });
      const a = s('tspan', { class: opt.kls || 'klang' }); a.textContent = c; tx.append(a); schrift.push(tx);
    });
    const inhalt = [...t.halo, ...t.ring, ...t.form, ...t.schmuck, ...schrift];
    return s('svg', { class: 'siegel-bild', viewBox: '-46 -54 92 92', 'aria-hidden': 'true' }, opt.dy ? [s('g', { transform: `translate(0 ${opt.dy})` }, inhalt)] : inhalt);
  };
  const DINGE = {
    truhe: '<ellipse cx="32" cy="57" rx="25" ry="4.5" fill="#2a2520" opacity=".13"/>' +
      '<path d="M8 31h48v21.5a3.5 3.5 0 0 1-3.5 3.5h-41A3.5 3.5 0 0 1 8 52.5z" fill="#b06d36"/><path d="M8 31h48v5H8z" fill="#8c5226"/>' +
      '<path d="M8 31c0-10.5 10.7-17.5 24-17.5S56 20.5 56 31z" fill="#c98446"/><path d="M14 26c2.5-6 9-9.6 18-9.6" fill="none" stroke="#eab071" stroke-width="2.4" stroke-linecap="round" opacity=".8"/>' +
      '<path d="M14.5 20.6q2.2-1.4 5-2.2V56h-5zM44.5 18.4q2.8.8 5 2.2V56h-5z" fill="#e2aa30"/><path d="M8 31h48" stroke="#6f3f1c" stroke-width="1.6"/>' +
      '<rect x="26.5" y="27" width="11" height="12.5" rx="2.4" fill="#f3c64e" stroke="#a87412" stroke-width="1.4"/><circle cx="32" cy="31.6" r="1.7" fill="#5c3f0c"/><path d="M32 32.4v3.6" stroke="#5c3f0c" stroke-width="1.9" stroke-linecap="round"/>' +
      '<path d="M53 6.5l1.4 3.4 3.4 1.4-3.4 1.4L53 16.1l-1.4-3.4-3.4-1.4 3.4-1.4z" fill="#f6d36b"/>',
    staffelei: '<ellipse cx="32" cy="58" rx="21" ry="4" fill="#2a2520" opacity=".13"/>' +
      '<path d="M21.5 57L29 13M42.5 57L35 13M32 42v16" stroke="#9a6233" stroke-width="3.6" stroke-linecap="round" fill="none"/>' +
      '<rect x="10.5" y="12.5" width="43" height="31" rx="2.6" fill="#fffaf0" stroke="#b07a3e" stroke-width="3"/>' +
      '<path d="M13.5 41.5l9.5-10.5 6.5 6 7.5-9.5 13.5 14z" fill="#86b96e"/><path d="M13.5 41.5l9.5-10.5 6 5.5" fill="none" stroke="#5f9150" stroke-width="1.2"/>' +
      '<circle cx="42.5" cy="21.5" r="4.8" fill="#f2b632"/><rect x="16" y="43.5" width="32" height="3.6" rx="1.8" fill="#9a6233"/>' +
      '<path d="M6 7l1.2 2.8 2.8 1.2-2.8 1.2L6 15l-1.2-2.8L2 11l2.8-1.2z" fill="#f6d36b"/>',
    buch: '<ellipse cx="32" cy="57" rx="24" ry="4.2" fill="#2a2520" opacity=".13"/>' +
      '<path d="M10 22l22 6 22-6v30l-22 6-22-6z" fill="#f4ead6" stroke="#9a6233" stroke-width="1.6" stroke-linejoin="round"/>' +
      '<path d="M8 20l24 6.5V57L8 50.5zM56 20L32 26.5V57l24-6.5z" fill="#4f8fb4"/><path d="M32 26.5V57" stroke="#2f5f7d" stroke-width="2"/>' +
      '<path d="M13 28.5l14 3.8M13 34.5l14 3.8M37 32.3l14-3.8M37 38.3l14-3.8" stroke="#dce9f1" stroke-width="2" stroke-linecap="round" opacity=".85"/>' +
      '<path d="M44 26.5v13l3-2.2 3 2.2V24.3" fill="#6aa35a"/>' +
      '<path d="M53 6.5l1.4 3.4 3.4 1.4-3.4 1.4L53 16.1l-1.4-3.4-3.4-1.4 3.4-1.4z" fill="#f6d36b"/>'
  };
  const dingBild = (art, groesse = 64) => {
    const roh = (window.LB_BILDDATEN || {})['ding-' + art];
    const svg = s('svg', { viewBox: '0 0 64 64', width: groesse, height: groesse, class: 'ding-bild', 'aria-hidden': 'true' });
    if (roh && roh.farbe) svg.append(s('image', { href: roh.farbe, x: 0, y: 0, width: 64, height: 64 }));
    else svg.innerHTML = DINGE[art] || '';
    return svg;
  };
  const WASSER = new Set(['teich', 'hafen', 'wellen', 'brunnen']);
  window.LAUTBUCH_WEG = { dingBild, wasser: WASSER, teile: TEILE, quer: QUER, hoch: HOCH, orte: ORTE, voegel: VOEGEL, ortTeile, nebelBild, gemalt: !!B, ortBild, s, pfad, gestalt: GESTALT, siegel, siegelBild };
})();
