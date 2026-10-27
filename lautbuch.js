(() => {
  'use strict';
  const { el, faerbe, wort, satz, mische, fall, anlauf, sym, bild, bildSchluessel, bildPool, ablenkerWoerter } = window.LB;
  const WELT = window.LAUTBUCH_WELT;
  const WEG = window.LAUTBUCH_WEG;
  const TEILE = window.LAUTBUCH_TEILE;
  const KARTE = window.LAUTBUCH_KARTE;
  const main = document.querySelector('main');
  const oben = document.querySelector('.leiste');
  const unten = document.querySelector('.leiste-unten');
  const RUHIG = matchMedia('(prefers-reduced-motion: reduce)');

  const lies = (k, ersatz) => { try { const v = localStorage.getItem(k); return v == null ? ersatz : JSON.parse(v); } catch { return ersatz; } };
  const schreib = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
  const schluessel = (id) => 'lautbuch.akt.' + id + '.v1';
  const licht = {};
  for (const id of Object.keys(TEILE)) licht[id] = lies(schluessel(id), {}) || {};
  const speichern = (id) => schreib(schluessel(id), licht[id]);
  const EINST_KEY = 'lautbuch.einstellungen.v1';
  const einst = Object.assign({ schreibung: lies('lautbuch.schreibung.v1', null) || 'gross' }, lies(EINST_KEY, {}));
  delete einst.ruhig;
  const einstSpeichern = () => schreib(EINST_KEY, einst);
  const ruhig = () => RUHIG.matches;
  const VERSUCH = { zoom: true, zimmer: true };
  const ruhigSetzen = () => document.documentElement.classList.toggle('ruhig', RUHIG.matches);
  if (RUHIG.addEventListener) RUHIG.addEventListener('change', ruhigSetzen);
  ruhigSetzen();
  const vhSetzen = () => { const h = window.innerHeight; if (h > 0) document.documentElement.style.setProperty('--vh', (h / 100) + 'px'); };
  vhSetzen();
  window.addEventListener('resize', vhSetzen);
  window.addEventListener('orientationchange', () => { vhSetzen(); setTimeout(vhSetzen, 250); });
  for (const e of ['fullscreenchange', 'webkitfullscreenchange']) document.addEventListener(e, () => requestAnimationFrame(vhSetzen));

  const KURVE = 'cubic-bezier(.22,.61,.36,1)';
  const anim = (e, bilder, opt) => (e && e.animate) ? e.animate(bilder, Object.assign({ easing: KURVE }, opt)) : null;
  const fertigVon = (a, ms = 600) => a ? Promise.race([a.finished.catch(() => {}), new Promise(r => setTimeout(r, ms + 250))]) : Promise.resolve();
  const kommt = (e, verzug = 0, weg = 14, dauer = 420) => ruhig()
    ? anim(e, [{ opacity: 0 }, { opacity: 1 }], { duration: 160, delay: verzug, fill: 'backwards' })
    : anim(e, [{ opacity: 0, transform: `translate(0px,${weg}px)` }, { opacity: 1, transform: 'translate(0px,0px)' }], { duration: dauer, delay: verzug, fill: 'backwards' });
  const geht = (e, weg = -10, dauer = 280) => fertigVon(ruhig()
    ? anim(e, [{ opacity: 1 }, { opacity: 0 }], { duration: 140, fill: 'forwards', easing: 'ease' })
    : anim(e, [{ opacity: 1, transform: 'translate(0px,0px)' }, { opacity: 0, transform: `translate(0px,${weg}px)` }], { duration: dauer, fill: 'forwards', easing: 'ease' }), dauer);
  const GEIST_FEST = ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'display', 'flexDirection', 'justifyContent', 'alignItems', 'rowGap', 'columnGap', 'overflowX', 'overflowY', 'color'];
  const GEIST_FARBEN = ['--papier', '--karte', '--blatt', '--tinte', '--tinte-70', '--tinte-60', '--tinte-30', '--tinte-licht', '--rand', '--vok', '--kon', '--verb', '--klang', '--gold-grund', '--asche', '--asche-grund'];
  const geist = (b) => {
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
  const geistTakt = (k) => {
    if (!k.__takt || !k.getAnimations) return;
    const els = [k, ...k.querySelectorAll('*')];
    for (const a of k.getAnimations({ subtree: true })) {
      if (!a.animationName || !a.effect || !a.effect.target) continue;
      const i = els.indexOf(a.effect.target);
      const t = k.__takt.find(x => x[0] === i && x[1] === a.animationName && x[2] === (a.effect.pseudoElement || ''));
      if (t && t[3] != null) a.currentTime = t[3];
    }
  };
  const tausche = (bs, baue, opt = {}) => {
    bs = [].concat(bs);
    const geister = bs.filter(b => b.isConnected && b.childElementCount && b.getClientRects().length).map(b => [b, geist(b)]);
    baue();
    const weg = opt.ruhend ? 0 : 1;
    for (const [b, k] of geister) { b.after(k); geistTakt(k); geht(k, -10 * weg, opt.gehen).then(() => k.remove()); }
    for (const b of bs) for (const c of b.children) if (!c.classList.contains('geist')) kommt(c, opt.verzug != null ? opt.verzug : geister.length ? 80 : 0, 14 * weg);
  };
  const rahmenFlug = (von, vs, ziel) => {
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
  let kameraLaeuft = false;
  const kameraLage = (ziel, rahmen, wurzel, faktor) => {
    const r = rahmen.getBoundingClientRect(), w = wurzel.getBoundingClientRect(), z = ziel.getBoundingClientRect();
    const l = Math.max(r.left, 0), t = Math.max(r.top, 0), rr = Math.min(r.right, innerWidth), b = Math.min(r.bottom, innerHeight);
    const s = Math.max(1.4, Math.min(faktor, Math.min((rr - l) / z.width, (b - t) / z.height) * .55));
    const zx = z.left + z.width / 2, zy = z.top + z.height / 2;
    return { origin: `${zx - w.left}px ${zy - w.top}px`, transform: `translate(${(l + rr) / 2 - zx}px, ${(t + b) / 2 - zy}px) scale(${s})` };
  };
  const kameraHinein = (ziel, rahmen, wurzel, faktor = 3.2, dauer = 620) => {
    if (kameraLaeuft) return Promise.resolve(false);
    if (ruhig() || !ziel || !ziel.isConnected) return Promise.resolve(true);
    kameraLaeuft = true;
    main.classList.add('kamera');
    const L = kameraLage(ziel, rahmen, wurzel, faktor);
    wurzel.style.transformOrigin = L.origin;
    return fertigVon(anim(wurzel, [{ transform: 'none' }, { transform: L.transform }], { duration: dauer, easing: 'cubic-bezier(.45,0,.3,1)', fill: 'forwards' }), dauer)
      .then(() => { wurzel.style.transform = L.transform; kameraLaeuft = false; return true; });
  };
  let imWechsel = false, getippt = null;
  document.addEventListener('pointerdown', (e) => { getippt = e.target.closest ? e.target.closest('[data-ort]') : null; }, true);
  document.addEventListener('keydown', () => { getippt = null; }, true);
  const stilVon = (e) => { const c = getComputedStyle(e); return { borderRadius: c.borderRadius, backgroundColor: c.backgroundColor, borderTopColor: c.borderTopColor, borderTopStyle: c.borderTopStyle }; };
  const sanft = (fn) => (...args) => {
    if (imWechsel || !main.childElementCount) return fn(...args);
    const haupt = main.querySelector('[data-haupt]');
    const quelle = getippt && getippt.isConnected && main.contains(getippt) ? getippt : haupt;
    getippt = null;
    const ort = quelle ? quelle.dataset.ort : null, von = quelle ? quelle.getBoundingClientRect() : null, vs = quelle ? stilVon(quelle) : null;
    const geister = [main, oben, unten].filter(b => b.childElementCount && b.getClientRects().length).map(b => [b, geist(b)]);
    imWechsel = true;
    try { fn(...args); } finally { imWechsel = false; }
    const neu = main.querySelector('[data-haupt]');
    const amOrt = !!(haupt && neu && haupt.dataset.ort === neu.dataset.ort);
    for (const [b, k] of geister) { b.after(k); geistTakt(k); geht(k, b === main && !amOrt ? -10 : 0).then(() => k.remove()); }
    const ziel = !amOrt && !ruhig() && ort ? main.querySelector('[data-ort="' + ort + '"]') : null;
    const fliegt = !!(ziel && rahmenFlug(von, vs, ziel));
    for (const b of [oben, unten]) for (const c of b.children) if (!c.classList.contains('geist')) kommt(c, 60, 0);
    for (const c of main.children) if (getComputedStyle(c).position !== 'fixed') kommt(c, fliegt ? 260 : 80, amOrt ? 0 : 14);
  };

  let wach = null;
  const wachHalten = async () => {
    if (wach || !('wakeLock' in navigator) || document.visibilityState !== 'visible') return;
    try { wach = await navigator.wakeLock.request('screen'); wach.addEventListener('release', () => { wach = null; }); } catch {}
  };
  document.addEventListener('visibilitychange', wachHalten);
  document.addEventListener('pointerdown', wachHalten, { once: true });

  let gesperrtBis = 0;
  const tipp = (fn) => (e) => {
    const jetzt = performance.now();
    if (jetzt < gesperrtBis) return;
    gesperrtBis = jetzt + 500;
    fn(e);
  };
  const knopf = (cls, inhalt, fn, label) => {
    const b = el('button', 'knopf ' + cls);
    b.type = 'button';
    for (const x of [].concat(inhalt)) b.append(x);
    if (label) b.setAttribute('aria-label', label);
    b.addEventListener('click', tipp(fn));
    return b;
  };
  const mitSymbol = (name, text) => { const s = el('span', 'mit-symbol'); s.append(sym(name), el('span', null, text)); return s; };
  const langDruck = (ziel, fn) => {
    let t = null;
    const weg = () => { clearTimeout(t); t = null; };
    let gefeuert = false;
    ziel.addEventListener('pointerdown', () => { weg(); gefeuert = false; t = setTimeout(() => { t = null; gefeuert = true; fn(); }, 600); });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach(ev => ziel.addEventListener(ev, weg));
    ziel.addEventListener('contextmenu', (e) => { e.preventDefault(); weg(); if (!gefeuert) fn(); gefeuert = false; });
    ziel.addEventListener('click', (e) => { if (gefeuert) { e.stopImmediatePropagation(); gefeuert = false; } }, true);
  };

  let abbau = [];
  const hoere = (ziel, typ, fn) => { ziel.addEventListener(typ, fn); abbau.push(() => ziel.removeEventListener(typ, fn)); };
  const leer = () => {
    abbau.forEach(f => f()); abbau = [];
    main.replaceChildren(); oben.replaceChildren(); unten.replaceChildren();
    document.body.className = '';
    main.classList.remove('kamera');
    window.scrollTo(0, 0);
    schieneSetzen(null, null, null);
  };
  const wegTeil = (id) => WEG.teile.find(w => w.id === id);
  const ortVon = (w) => {
    const t = w && TEILE[w.teil || w.id]; if (!t) return null;
    const lv = w.stufen ? t.level.filter(l => w.stufen.includes(l.id)) : t.level;
    const ids = [...lv.map(l => l.id), ...(w.boss === false ? [] : ['boss'])];
    return { w, t, lv, ids };
  };
  const ortZu = (teil, id) => { const os = WEG.teile.filter(w => (w.teil || w.id) === teil.id).map(ortVon).filter(Boolean); return os.find(o => o.ids.includes(id)) || os[0] || null; };
  const ortMeister = (o) => o.ids.includes('boss') ? !!licht[o.t.id].boss : o.ids.every(id => licht[o.t.id][id]);
  const zumOrt = (o) => o ? titel(o.t, { ort: o.w.id }) : weg();
  const zumWeg = () => knopf('ikon', sym('welt'), () => weg(), 'zum Weg');
  let schieneZustand = { aktiv: null, lv: null, teil: null };
  const schKnopf = (ziel, zeichen, wortTxt, fn) => { const k = knopf('schienen-knopf', [sym(zeichen), el('span', 'schienen-wort', wortTxt)], fn, wortTxt); k.dataset.ziel = ziel; return k; };
  const weiterLesen = () => {
    const lz = lies(LESEZEICHEN_KEY, null), lzTeil = lz && TEILE[lz.teil], lzLevel = lzTeil && lzTeil.level.find(l => l.id === lz.level);
    if (lzLevel) level(lzTeil, lzLevel, 'ueben', lz.blatt);
    else { const h = WEG.teile.find(w => wegStand()[w.id] === 'hier'); zumOrt(h && ortVon(h)); }
  };
  const sWeg = schKnopf('weg', 'welt', 'Weg', () => weg());
  const sWeiter = schKnopf('weiter', 'band', 'weiter', () => weiterLesen());
  const sLaute = schKnopf('laute', 'laute', 'Laute', () => sammlung());
  const sGalerie = schKnopf('galerie', 'bild', 'Galerie', () => galerie());
  const zimmerDa = VERSUCH.zimmer && !!window.LB_ZIMMER;
  const sZimmer = zimmerDa ? schKnopf('zimmer', 'haus', 'Zimmer', () => zimmer()) : null;
  const sHinweis = schKnopf('hinweis', 'hinweis', 'Hinweis', () => { if (schieneZustand.lv) hinweisKarte(schieneZustand.lv, { immer: true }); });
  const sMehr = schKnopf('mehr', 'mehr', 'Begleitung', () => schublade(schieneZustand.teil || undefined, schieneZustand.lv || undefined));
  const vollbildDa = !!(document.fullscreenEnabled || document.webkitFullscreenEnabled);
  const imVollbild = () => !!(document.fullscreenElement || document.webkitFullscreenElement);
  const vollbildUmschalten = () => {
    const d = document.documentElement;
    try {
      const p = imVollbild() ? (document.exitFullscreen || document.webkitExitFullscreen).call(document) : (d.requestFullscreen || d.webkitRequestFullscreen).call(d);
      if (p && p.catch) p.catch(() => {});
    } catch {}
  };
  const sVoll = schKnopf('vollbild', 'vollbild', 'Vollbild', vollbildUmschalten);
  const vollbildZeigen = () => { const an = imVollbild(); sVoll.setAttribute('aria-pressed', String(an)); sVoll.querySelector('.schienen-wort').textContent = an ? 'Fenster' : 'Vollbild'; };
  for (const e of ['fullscreenchange', 'webkitfullscreenchange']) document.addEventListener(e, vollbildZeigen);
  vollbildZeigen();
  const schiene = el('nav', 'schiene'); schiene.setAttribute('aria-label', 'Leiste');
  const schieneUnten = el('div', 'schiene-unten'); if (vollbildDa) schieneUnten.append(sVoll); schieneUnten.append(sHinweis, sMehr);
  schiene.append(...[sWeg, sWeiter, sLaute, sGalerie, sZimmer].filter(Boolean), schieneUnten);
  document.body.append(schiene);
  function schieneSetzen(aktiv, lv, teil) {
    schieneZustand = { aktiv, lv: lv && lv.hinweis ? lv : null, teil: teil || null };
    for (const k of [sWeg, sLaute, sGalerie, sZimmer].filter(Boolean)) { const an = k.dataset.ziel === aktiv; k.classList.toggle('an', an); if (an) k.setAttribute('aria-current', 'page'); else k.removeAttribute('aria-current'); }
    sHinweis.classList.toggle('licht-ruht', !schieneZustand.lv);
    if (schieneZustand.lv) sHinweis.removeAttribute('aria-disabled'); else sHinweis.setAttribute('aria-disabled', 'true');
  }
  const ortChip = (o, jetzt) => {
    if (!o) return knopf('ort-chip', sym('welt'), () => weg(), 'zum Weg');
    const perlen = el('span', 'perlen-kopf');
    o.ids.forEach(id => perlen.append(el('i', 'perle' + perleKls(id) + (licht[o.t.id][id] ? ' gold' : '') + (id === jetzt ? ' hier' : ''))));
    const z = el('span', 'chip-zeichen'); z.append(faerbe(o.w.teil ? o.w.zeichen.join('') : o.t.zeichen));
    return knopf('ort-chip', [WEG.ortBild(o.w.ort, 'klein', o.w.voegel), z, perlen], () => zumOrt(o), 'zum Ort');
  };
  const titelZeile = (txt) => { const m = el('div', 'marke'); m.append(el('span', null, txt)); return m; };
  const perleKls = (id) => id === 'bilder' ? ' rund' : id === 'boss' ? ' raute' : '';
  const spalteVon = (id) => KARTE.spalten.findIndex(s => s.teil === id);
  const probeVon = (teil, z) => teil.level[z].probe ||
    KARTE.baender[z].probe.map(c => KARTE.baender[z].art === 'endlaut' ? teil.vokal.toLowerCase() + c : c + teil.vokal.toLowerCase());

  const anfangGross = (t) => { const k = t.toLowerCase(); return k.charAt(0).toUpperCase() + k.slice(1); };
  const mischForm = (text, art) => {
    if (art === 'buchstaben') return fall(text);
    const k = text.toLowerCase();
    if (art === 'woerter' && text !== window.LB.gross(text)) return text.charAt(0) !== k.charAt(0) ? anfangGross(text) : Math.random() < .5 ? k : anfangGross(text);
    const r = Math.random();
    return r < 1 / 3 ? window.LB.gross(text) : r < 2 / 3 ? k : anfangGross(text);
  };
  const inForm = (text, art, loch) => {
    if (einst.schreibung === 'gross') return window.LB.gross(text);
    if (einst.schreibung === 'gemischt' && loch) return mischForm(text, art);
    return text.toLowerCase();
  };
  const schreibSchalter = (nachher, loch = () => false) => {
    const g = el('div', 'schreibung');
    g.setAttribute('role', 'group'); g.setAttribute('aria-label', 'Schreibung');
    const opt = [['gross', 'GROSS'], ['klein', 'klein'], ['gemischt', 'gemischt']].map(([w, t]) => {
      const b = knopf('schreib-wahl', t, () => { if (b.getAttribute('aria-disabled') === 'true') return; einst.schreibung = w; einstSpeichern(); g.zeigen(); nachher(); });
      g.append(b);
      return [w, b];
    });
    g.zeigen = () => {
      const jetzt = einst.schreibung === 'gemischt' && !loch() ? 'klein' : einst.schreibung;
      opt.forEach(([x, bx]) => { bx.setAttribute('aria-pressed', String(x === jetzt)); if (x === 'gemischt') ruhe(bx, !loch()); });
    };
    g.zeigen();
    return g;
  };
  const gruppe = (label, optionen, aktiv, wenn) => {
    const g = el('div', 'schreibung');
    g.setAttribute('role', 'group'); g.setAttribute('aria-label', label);
    const kn = optionen.map(([w, t, aus, name]) => {
      const b = knopf('schreib-wahl', t, () => { if (aus && aus()) return; kn.forEach(([x, bx]) => bx.setAttribute('aria-pressed', String(x === w))); wenn(w); }, name);
      b.setAttribute('aria-pressed', String(w === aktiv));
      if (aus && aus()) b.setAttribute('aria-disabled', 'true');
      g.append(b);
      return [w, b];
    });
    return g;
  };

  const ziehung = (pool) => {
    const zaehler = new Map(pool.map(p => [p, 0]));
    const zuletzt = [];
    return () => {
      const abstand = Math.min(3, pool.length - 1);
      const frei = abstand ? pool.filter(p => !zuletzt.slice(-abstand).includes(p)) : pool.slice();
      const gewichte = frei.map(p => 1 / Math.pow(1 + zaehler.get(p), 2));
      let r = Math.random() * gewichte.reduce((a, b) => a + b, 0), wahl = frei[frei.length - 1];
      for (let k = 0; k < frei.length; k++) { r -= gewichte[k]; if (r <= 0) { wahl = frei[k]; break; } }
      zaehler.set(wahl, zaehler.get(wahl) + 1);
      zuletzt.push(wahl);
      return wahl;
    };
  };

  const LESEZEICHEN_KEY = 'lautbuch.lesezeichen.v1';
  const lesezeichen = () => lies(LESEZEICHEN_KEY, null);
  const setzeLesezeichen = (teil, lv, art, reihe) => {
    const alt = lesezeichen();
    const r = reihe !== undefined ? reihe : alt && alt.teil === teil.id && alt.level === lv.id && alt.blatt === art ? alt.reihe : undefined;
    schreib(LESEZEICHEN_KEY, Object.assign({ teil: teil.id, level: lv.id, blatt: art }, r === undefined ? {} : { reihe: r }));
  };
  const schreibForm = (teil) => teil.festerFall ? 'fest' : einst.schreibung === 'gemischt' ? 'klein' : einst.schreibung;
  const mischSchl = (lv, art) => lv.id + '|' + art + '|blatt|gemischt';
  const marken = (teil) => (licht[teil.id].marken ||= {});
  const markSchl = (teil, lv, art, ri) => lv.id + '|' + art + '|' + ri + '|' + schreibForm(teil);
  const markenWandeln = () => { for (const id of Object.keys(TEILE)) {
    const m = licht[id].marken; if (!m) continue;
    for (const k of Object.keys(m)) if (k.split('|').length === 3) { m[k + '|' + (TEILE[id].festerFall ? 'fest' : 'gross')] = m[k]; delete m[k]; }
  } };
  markenWandeln();
  const BEREINIGT_KEY = 'lautbuch.bereinigt.v55';
  const HAKEN_V55 = { a: { l1: [2,3], l3: [1,2,3], l4: [1,2,3] }, ae: { l1: [2,3], l2: [3] }, au: { l1: [2,3], l2: [3] }, e: { l1: [2,3], l3: [1,2,3], l4: [1,2,3] }, ei: { l1: [2,3], l2: [3] }, eu: { l1: [2,3], l2: [3] }, i: { l1: [2,3], l3: [1,2,3], l4: [1,2,3] }, o: { l1: [2,3], l3: [1,2,3], l4: [1,2,3] }, oe: { l1: [2,3], l2: [3] }, r1: { l1: [3], l2: [3], l3: [3] }, r2: { l1: [3], l2: [3] }, r3: { l1: [3], l2: [3] }, r4: { l1: [3], l2: [3] }, u: { l1: [2,3], l3: [1,2,3], l4: [1,2,3] }, ue: { l1: [2,3], l2: [3] }, ziel: { l1: [3] } };
  const bereinigeV55 = () => {
    if (lies(BEREINIGT_KEY, null)) return;
    for (const [id, lektionen] of Object.entries(HAKEN_V55)) {
      const m = licht[id] && licht[id].marken; if (!m) continue;
      let geaendert = false;
      for (const k of Object.keys(m)) {
        const [lv, art, ri] = k.split('|');
        if (art === 'tafel' && lektionen[lv] && (ri === 'blatt' || lektionen[lv].includes(+ri))) { delete m[k]; geaendert = true; }
      }
      if (geaendert) speichern(id);
    }
    schreib(BEREINIGT_KEY, 1);
  };
  bereinigeV55();
  const liegtHier = (teil, lv) => { const lz = lesezeichen(); return !!lz && lz.teil === teil.id && lz.level === lv.id; };
  const stolper = (teil, lv) => ((licht[teil.id].stolper ||= {})[lv.id] ||= []);
  const herkunft = (teil, wort) => {
    const norm = (x) => teil.festerFall ? x : x.toLowerCase().replace(/[-.,!?]/g, '');
    const w = norm(wort);
    const daten = (lv, mitZeigen) => [lv.tafel, lv.ketten, lv.woerter, lv.gemischt,
      ...(mitZeigen ? [lv.pruefung, lv.z4 && [lv.z4], lv.z5 && [lv.z5], lv.zMehr && [lv.zMehr], lv.z6 && [lv.z6.split(' ')]] : [])].filter(Boolean).flat(2);
    const treffer = teil.level.find(lv => daten(lv, true).some(x => norm(x) === w));
    if (treffer) return treffer;
    const gesehen = new Set();
    for (const lv of teil.level) {
      for (const x of daten(lv, false)) for (const c of norm(x)) gesehen.add(c);
      if ([...w].every(c => gesehen.has(c))) return lv;
    }
    return teil.level[teil.level.length - 1];
  };
  const steinZeichen = () => { const t = document.querySelector('.ueben-tuer'); if (t && !t.querySelector('.tuer-stein')) t.append(sym('stein', 'tuer-stein')); };
  const steinFlug = (von, text) => {
    const ziel = document.querySelector('.ueben-tuer') || document.querySelector('.mini-raster');
    if (!ziel || !text || ruhig() || !document.body.animate) { steinZeichen(); return; }
    const a = von.getBoundingClientRect(), b = ziel.getBoundingClientRect();
    const c = el('div', 'stein-flug', text);
    document.body.append(c);
    const x0 = a.left + a.width / 2, y0 = a.top + a.height / 2;
    Object.assign(c.style, { left: x0 + 'px', top: y0 + 'px' });
    const dx = b.left + b.width / 2 - x0, dy = b.top + b.height / 2 - y0;
    const an = c.animate([{ transform: 'translate(-50%, -50%)', opacity: 1 },
      { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(.45)`, opacity: .15 }],
      { duration: 750, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' });
    const fertig = () => { if (c.isConnected) { c.remove(); steinZeichen(); } };
    an.onfinish = fertig; setTimeout(fertig, 950);
  };
  const zeilenSteine = (teil, z) => {
    if (z.dataset.art === 'buchstaben') return z.dataset.text.split(' ');
    return z.dataset.text.split(' ').map(w => w.replace(/[.,!?]/g, '')).filter(Boolean);
  };
  const alleGelerntenZeilen = () => {
    const pool = new Map();
    for (const f of window.LAUTBUCH_FOLGE.FOLGE) {
      const t = TEILE[f.teil]; if (!t || !licht[t.id]) continue;
      for (const k of Object.keys(licht[t.id].marken || {})) {
        const [lvId, art, ri, form] = k.split('|');
        const lv = t.level.find(l => l.id === lvId);
        const reihe = lv && lv[art] && (ri === 'blatt' ? lv[art].flat() : lv[art][+ri]);
        if (!reihe) continue;
        for (const text of reihe) pool.set(t.id + '|' + art + '|' + text + '|' + form, { text, art, form, prolog: t.art === 'prolog' });
      }
    }
    return pool;
  };
  const ZEILEN_ARTEN = ['tafel', 'ketten', 'woerter'];
  const lektionGelesen = (t, lv) => {
    const s = licht[t.id] || {}; if (s[lv.id] === true || s.boss === true) return true;
    const F = window.LAUTBUCH_FOLGE.FOLGE.map(f => f.teil), i = F.indexOf(t.id);
    return i >= 0 && F.slice(i + 1).some(id => Object.keys(licht[id] || {}).some(k => /^(l\d+|p\d+|boss)$/.test(k) && licht[id][k] === true));
  };
  const wiederholenPool = () => {
    const pool = alleGelerntenZeilen(), rang = new Map(), lektionen = [];
    for (const f of window.LAUTBUCH_FOLGE.FOLGE) { const t = TEILE[f.teil]; if (t) for (const lv of t.level) { rang.set(t.id + '|' + lv.id, lektionen.length); lektionen.push([t, lv]); } }
    const von = new Map();
    for (const f of window.LAUTBUCH_FOLGE.FOLGE) { const t = TEILE[f.teil]; if (!t || !licht[t.id]) continue;
      for (const k of Object.keys(licht[t.id].marken || {})) { const [lvId, art] = k.split('|'); const lv = t.level.find(l => l.id === lvId); if (!lv || !lv[art]) continue;
        for (const text of lv[art].flat()) if (!von.has(t.id + '|' + art + '|' + text)) von.set(t.id + '|' + art + '|' + text, t.id + '|' + lvId); } }
    for (const [k, e] of pool) { e.lektion = von.get(k.split('|').slice(0, 3).join('|')); e.haken = true; }
    const schon = new Set([...pool.keys()].map(k => k.split('|').slice(0, 3).join('|')));
    for (const [t, lv] of lektionen) {
      if (!lektionGelesen(t, lv)) continue;
      const form = t.festerFall ? 'fest' : einst.schreibung;
      for (const art of ZEILEN_ARTEN) for (const text of (lv[art] || []).flat()) {
        if (typeof text !== 'string' || schon.has(t.id + '|' + art + '|' + text)) continue;
        schon.add(t.id + '|' + art + '|' + text);
        pool.set(t.id + '|' + art + '|' + text + '|' + form, { text, art, form, prolog: t.art === 'prolog', lektion: t.id + '|' + lv.id });
      }
    }
    const raenge = [...pool.values()].map(e => rang.get(e.lektion)).filter(r => r !== undefined), neu = Math.max(...raenge), alt = Math.min(...raenge);
    for (const e of pool.values()) {
      const r = rang.get(e.lektion), anteil = r === undefined || neu === alt ? 0 : (neu - r) / (neu - alt);
      e.gewicht = Math.pow(.1, anteil) * (e.art === 'woerter' ? (e.haken ? 4.5 : 3) : 1);
    }
    return pool;
  };
  const gewichtetZiehen = (pool, n) => [...pool.entries()].map(([k, e]) => [k, Math.pow(Math.random(), 1 / e.gewicht)]).sort((a, b) => b[1] - a[1]).slice(0, n).map(x => x[0]);

  const kopfLeiste = (teil, id, lv) => {
    const o = ortZu(teil, id);
    const z = teil.level.findIndex(l => l.id === id);
    const name = id === 'bilder' ? 'Bilder' : id === 'boss' ? 'Boss' : z >= 0 ? probeVon(teil, z).join(' ') : '';
    const kr = el('div', 'kruemel'); kr.append(ortChip(o, id), el('span', 'krume', '›'), el('span', 'lektion-titel', name));
    oben.append(kr);
    schieneSetzen(null, lv, teil);
  };


  const WEG_KEY = 'lautbuch.weg.gesehen.v1';
  const SVGNS = 'http://www.w3.org/2000/svg';
  const sv = WEG.s, pf = WEG.pfad;
  const START_OFFEN = new Set(['a']);
  const wegStand = (ohne) => {
    const st = {}; let rand = false;
    const meister = (w) => { const o = ortVon(w); return !!o && w.id !== ohne && ortMeister(o); };
    const bossGold = (tid) => { const b = WEG.teile.filter(w => (w.teil || w.id) === tid && w.boss !== false).pop(); return !!b && meister(b); };
    const roh = WEG.teile.map((w, i) => {
      const tid = w.teil || w.id;
      const vorig = WEG.teile.slice(0, i).reverse().find(v => (v.teil || v.id) !== tid);
      const o = ortVon(w);
      return { m: meister(w), spur: !!o && o.ids.some(id => licht[o.t.id][id]),
               offen: !!o && (!vorig || START_OFFEN.has(w.id) || bossGold(vorig.teil || vorig.id)) };
    });
    const letzter = roh.map(r => r.m || r.spur).lastIndexOf(true);
    let hierI = roh.findIndex((r, i) => i >= letzter && r.offen && !r.m);
    if (hierI < 0) hierI = roh.findIndex(r => r.offen && !r.m);
    WEG.teile.forEach((w, i) => {
      if (roh[i].m) st[w.id] = 'meister';
      else if (roh[i].offen) st[w.id] = i === hierI ? 'hier' : 'offen';
      else if (!rand) { st[w.id] = 'rand'; rand = true; }
      else st[w.id] = 'nebel';
    });
    return st;
  };
  const perlenVon = (w, st) => {
    const o = ortVon(w);
    if (!o) return [];
    const p = o.ids.map(id => licht[o.t.id][id] ? 'gold' : '');
    if (st === 'hier') { const k = p.indexOf(''); if (k >= 0) p[k] = 'jetzt'; }
    return p;
  };
  const WELT_KEY = 'lautbuch.welt.gesehen.v1';
  const ARTEN_UML = { 'Ä': 'A', 'Ö': 'O', 'Ü': 'U' };
  const lautGestalt = (zone, l) => {
    if (zone.id === 'vok') return { art: l.g, krone: true };
    if (ARTEN_UML[l.g]) return { art: ARTEN_UML[l.g], edel: true };
    if (zone.id === 'klang' && l.g.length === 2) return { art: (ARTEN_UML[l.g[0]] || l.g[0]) + '|' + l.g[1], bundSk: .66, bundDx: 19, schrift: l.g };
    if (l.teil && /^r\d$/.test(l.teil)) return { art: 'tor' };
    return { art: { p1: 'weich', p2: 'hart', p3: 'zisch' }[l.frei] || 'rund' };
  };
  function sammlung() {
    leer();
    document.body.classList.add('auf-welt', 'ohne-unten');
    oben.append(titelZeile('Meine Laute'));
    schieneSetzen('laute');
    const gesehen = new Set(lies(WELT_KEY, []) || []);
    const neu = [];
    const w = el('div', 'welt');
    w.dataset.haupt = ''; w.dataset.ort = 'sammlung';
    for (const zone of WELT.zonen) {
      const z = el('section', 'welt-zone ' + zone.id);
      z.setAttribute('aria-label', zone.name);
      for (const l of zone.laute) {
        const st = WELT.stand(l, licht);
        let f;
        const gs = lautGestalt(zone, l);
        if (st === 'nebel') { f = el('div', 'laut nebel'); f.setAttribute('aria-hidden', 'true'); f.append(WEG.siegelBild(gs.art, Object.assign({}, gs, { schrift: null }))); }
        else {
          const inhalt = gs.schrift ? [] : l.g.length > 1 ? [el('span', 'g-zeile', faerbe(l.g)), el('span', 'g-zeile', faerbe(l.k))]
            : faerbe(l.g === l.k.toUpperCase() && l.g.length === 1 ? l.g + l.k : l.g + ' ' + l.k);
          f = knopf('laut ' + st, inhalt, () => oeffne(l), l.g);
          if (TEILE[l.teil]) f.dataset.ort = TEILE[l.teil].art === 'prolog' ? l.teil + '|' + l.frei : l.teil;
          if (!gesehen.has(l.g) && !ruhig()) { const n = el('i', 'nebel-schicht'); n.style.animationDelay = (neu.length * 0.25) + 's'; f.append(n); }
          if (!gesehen.has(l.g)) neu.push(l.g);
        }
        if (st !== 'nebel') f.prepend(WEG.siegelBild(gs.art, gs));
        f.classList.add('gestalt', 'g-' + gs.art.split('|')[0], ...(gs.art.includes('|') ? ['g-bund'] : []), ...(l.g.length > 1 && !gs.schrift ? ['g-lang'] : []));
        z.append(f);
      }
      w.append(z);
    }
    main.append(w);
    if (neu.length) schreib(WELT_KEY, [...gesehen, ...neu]);
  }

  const GALERIE_KEY = 'lautbuch.galerie.v1';
  const sammle = (woerter) => {
    const g = lies(GALERIE_KEY, {}) || {}; let neu = false;
    for (const w of woerter) { const k = bildSchluessel(w); if (!g[k]) { g[k] = 1; neu = true; } }
    if (neu) schreib(GALERIE_KEY, g);
  };
  const istGesammelt = (teil, w, g) => !!(licht[teil.id].bilder || licht[teil.id].tippen || g[bildSchluessel(w)]);
  const galerieOrte = () => {
    const stand = wegStand(), schon = new Set(), liste = [];
    for (const w of WEG.teile) {
      const o = ortVon(w); if (!o || schon.has(o.t.id)) continue;
      const s = stand[w.id]; if (s === 'nebel' || s === 'rand') continue;
      const pool = bildPool(o.t); if (!pool.length) continue;
      schon.add(o.t.id); liste.push({ w, t: o.t, pool });
    }
    return liste;
  };
  const galerieWahl = new Set();
  const szeneVon = new Map();
  const sinne = (lv) => {
    if (!lv || !lv.sinn) return [];
    const folge = [lv.z6, ...((lv.szene && lv.szene.saetze) || [])];
    return [lv.sinn, ...(lv.sinnMehr || [])].sort((a, b) => folge.indexOf(a.satz) - folge.indexOf(b.satz));
  };
  const gemalt = (s) => !!(window.LB_BILDDATEN || {})[s];
  const sinnDa = (lv, sn) => sn === lv.sinn || sn.wahl.every(b => gemalt(b.s));
  const sinnRunde = new Map();
  const waehleSinn = (teil, lv) => {
    const da = sinne(lv).filter(sn => sinnDa(lv, sn));
    const k = teil.id + '|' + lv.id, n = sinnRunde.get(k) || 0;
    sinnRunde.set(k, n + 1);
    return da.length ? da[n % da.length] : lv.sinn;
  };
  const sammleSzene = (s) => {
    const g = lies(GALERIE_KEY, {}) || {};
    if (!g[s]) { g[s] = 1; schreib(GALERIE_KEY, g); }
  };
  const szeneGross = (b, sz) => {
    document.querySelectorAll('.szene-gross').forEach(x => x.remove());
    const huelle = el('div', 'szene-gross'), karte = el('div', 'szene-gross-karte');
    huelle.setAttribute('role', 'dialog'); huelle.setAttribute('aria-modal', 'true'); huelle.setAttribute('aria-label', sz.replace(/-/g, ''));
    const zu = () => { geht(huelle, 0, 180).then(() => huelle.remove()); };
    const x = knopf('ikon schliessen', '×', zu, 'Schließen');
    karte.append(window.LB.szeneBild(b, 'szene-gross-bild'), el('div', 'szene-gross-satz', satz(sz)), x);
    huelle.append(karte);
    huelle.addEventListener('click', (e) => { if (e.target === huelle) zu(); });
    document.body.append(huelle);
    kommt(karte, 0, 12, 320);
    x.focus({ preventScroll: true });
  };
  function galerie() {
    leer();
    document.body.classList.add('auf-welt', 'in-galerie');
    oben.append(titelZeile('Galerie'));
    schieneSetzen('galerie');
    const g = lies(GALERIE_KEY, {}) || {};
    const wand = el('div', 'galerie');
    wand.dataset.haupt = ''; wand.dataset.ort = 'galerie';
    const gewaehlt = galerieWahl, gesammelt = [];
    for (const { w, t, pool } of galerieOrte()) {
      const gruppeEl = el('section', 'galerie-ort');
      const kopf = el('div', 'galerie-kopf');
      const z = el('span', 'chip-zeichen'); z.append(faerbe(w.teil ? w.zeichen.join('') : t.zeichen));
      kopf.append(WEG.ortBild(w.ort, 'klein', w.voegel), z);
      const reihe = el('div', 'galerie-reihe');
      for (const wort of pool) {
        if (istGesammelt(t, wort, g)) {
          const k = knopf('galerie-bild', bild(bildSchluessel(wort)), () => {
            const an = !gewaehlt.has(wort);
            if (an) gewaehlt.add(wort); else gewaehlt.delete(wort);
            k.classList.toggle('gewaehlt', an); k.setAttribute('aria-pressed', String(an));
          }, wort);
          k.setAttribute('aria-pressed', String(gewaehlt.has(wort))); k.classList.toggle('gewaehlt', gewaehlt.has(wort));
          k.dataset.wort = wort; k.dataset.teil = t.id;
          gesammelt.push([wort, t]); reihe.append(k);
        } else { const f = el('div', 'galerie-leer'); f.setAttribute('aria-hidden', 'true'); f.append(el('i', 'galerie-nebel')); reihe.append(f); }
      }
      const szenen = [...t.level, t.boss].filter(Boolean)
        .flatMap(lv => sinne(lv).filter(sn => sinnDa(lv, sn)).map(sn => ({ lv, haupt: sn === lv.sinn, b: sn.wahl.find(x => x.s === sn.richtig), sz: sn.satz }))).filter(x => x.b);
      if (szenen.length) {
        const sr = el('div', 'galerie-reihe galerie-szenen');
        for (const { lv, haupt, b, sz } of szenen) {
          if (g[b.s] || (haupt && licht[t.id][lv.id])) {
            szeneVon.set(b.s, { b, sz });
            const k = knopf('galerie-bild galerie-szene', window.LB.szeneBild(b), () => {
              if (k.dataset.lang) { delete k.dataset.lang; return; }
              const an = !gewaehlt.has(b.s);
              if (an) gewaehlt.add(b.s); else gewaehlt.delete(b.s);
              k.classList.toggle('gewaehlt', an); k.setAttribute('aria-pressed', String(an));
            }, sz.replace(/-/g, ''));
            langDruck(k, () => { k.dataset.lang = '1'; addEventListener('pointerup', () => setTimeout(() => delete k.dataset.lang, 0), { once: true }); szeneGross(b, sz); });
            k.setAttribute('aria-pressed', String(gewaehlt.has(b.s))); k.classList.toggle('gewaehlt', gewaehlt.has(b.s));
            k.dataset.teil = t.id; k.dataset.s = b.s;
            gesammelt.push([b.s, t]); sr.append(k);
          } else { const f = el('div', 'galerie-leer galerie-szene'); f.setAttribute('aria-hidden', 'true'); f.append(el('i', 'galerie-nebel')); sr.append(f); }
        }
        gruppeEl.append(kopf, reihe, el('div', 'galerie-luecke'), sr);
      } else gruppeEl.append(kopf, reihe);
      wand.append(gruppeEl);
    }
    const truhen = window.LAUTBUCH_FOLGE.FOLGE.map(f => TEILE[f.teil]).filter(t => t && t.schatz && licht[t.id].boss);
    if (truhen.length) {
      const gruppeEl = el('section', 'galerie-ort galerie-schatz-wand');
      const kopf = el('div', 'galerie-kopf'); kopf.append(WEG.dingBild('truhe', 64), el('span', 'chip-zeichen', 'Schatz'));
      const reihe = el('div', 'galerie-reihe');
      for (const t of truhen) {
        if (licht[t.id].schatz) {
          const mini = el('div', 'mini-blatt');
          for (let i = 0; i < 4; i++) mini.append(el('i', 'mini-zeile z' + i));
          const z = el('span', 'mini-zeichen'); z.append(faerbe(t.zeichen || 'Leuchtturm')); mini.append(z);
          const zt = t.zeichen || 'Leuchtturm'; z.style.setProperty('--n', String(zt.length)); if (zt.length > 8 && / /.test(zt)) z.classList.add('lang');
          const k = knopf('galerie-bild galerie-schatz', mini, () => schatz(t, { galerie: true }), 'Schatzblatt ' + (t.zeichen || 'Leuchtturm'));
          k.dataset.teil = t.id; reihe.append(k);
        } else { const f = el('div', 'galerie-leer'); f.setAttribute('aria-hidden', 'true'); f.append(el('i', 'galerie-nebel')); reihe.append(f); }
      }
      gruppeEl.append(kopf, reihe); wand.append(gruppeEl);
    }
    main.append(wand);
    const auswahl = () => gewaehlt.size ? gesammelt.filter(([w]) => gewaehlt.has(w)) : gesammelt;
    const ueben = knopf('galerie-ueben', [sym('bild'), el('span', null, 'Üben')], () => {
      const ws = auswahl().filter(([w]) => !szeneVon.has(w)); if (!ws.length) return;
      const teile = [...new Set(ws.map(([, t]) => t))];
      bilderRaum(teile[0], { galerie: true, pool: ws.map(([w]) => w), ablenker: [...new Set(teile.flatMap(t => ablenkerWoerter(t)))],
        tippen: ws.every(([, t]) => tippenFrei(t)) });
    }, 'Üben');
    const farbig = knopf('galerie-druck', 'farbig drucken', () => { const ws = auswahl(); if (ws.length) druckRaum(ws.map(([w]) => w), 'farbe'); }, 'farbig drucken');
    const malen = knopf('galerie-druck', 'zum Ausmalen', () => { const ws = auswahl(); if (ws.length) druckRaum(ws.map(([w]) => w), 'linie'); }, 'zum Ausmalen');
    if (!gesammelt.length) [ueben, farbig, malen].forEach(k => ruhe(k, true));
    const werkzeug = el('div', 'werkzeug galerie-werkzeug');
    werkzeug.append(ueben, farbig, malen);
    unten.append(werkzeug);
  }
  const bewohnerJetzt = () => {
    const stand = wegStand(), liste = [];
    WEG.teile.forEach((w, i) => { const o = ortVon(w); if (o && stand[w.id] === 'meister' && o.ids.includes('boss')) for (const b of o.t.bewohner || []) if (b.s !== figurBewohner()) liste.push([b, i]); });
    return liste;
  };
  function zimmer() {
    leer();
    document.body.classList.add('im-zimmer', 'ohne-unten');
    oben.append(titelZeile('Mein Zimmer'));
    schieneSetzen('zimmer');
    window.LB_ZIMMER.bauen(main, zimmerApi());
  }
  const buchAuf = (id, zu) => window.LB_BUECHER && window.LB_BUECHER.oeffne(id, { zu });
  const zimmerApi = () => ({ licht, TEILE, WEG, wegStand, bewohner: bewohnerJetzt(), lies, schreib, ruhig,
    weg: () => weg(), galerieOrte, istGesammelt, schatz: (t) => schatz(t),
    figur: { wer: () => figurStand().wer, bild: (s) => { const f = figurVon(s); return f ? figurBild(f) : null; },
      wahl: () => figurWahlen().map(f => ({ s: f.s, name: f.name, bild: figurBild(f) })),
      setze: (s) => { if (figurVon(s)) schreib(FIGUR_KEY, Object.assign(figurStand(), { wer: s })); },
      svg: (s) => figurSvg(s) },
    buecher: window.LB_BUECHER ? { gefunden: () => window.LB_BUECHER.gefunden(), bild: (id) => window.LB_BUECHER.regal(id),
      titel: (id) => window.LB_BUECHER.titel(id), oeffne: (id, zu) => buchAuf(id, zu) } : null });
  const galerieKopf = (titel = 'Üben') => {
    const kr = el('div', 'kruemel');
    kr.append(knopf('ort-chip', [sym('bild'), el('span', 'chip-zeichen', 'Galerie')], () => galerie(), 'zur Galerie'), el('span', 'krume', '›'), el('span', 'lektion-titel', titel));
    oben.append(kr);
    schieneSetzen('galerie');
  };
  const DRUCK_JE = [1, 2, 4, 6];
  const druckJe = (art) => { const n = (einst.druckJe || {})[art]; return DRUCK_JE.includes(n) ? n : art === 'linie' ? 2 : 6; };
  const druckSeite = (woerter, art, mitWort, je, bilder) => {
    const seite = el('section', 'druck-seite je-' + je);
    for (const w of woerter) {
      const sz = szeneVon.get(w), schl = sz ? w : bildSchluessel(w);
      const f = el('figure', 'druck-bild' + (sz ? ' druck-szene' : '')), roh = (window.LB_BILDDATEN || {})[schl];
      if (roh && roh.farbe) { const im = new Image(); im.alt = ''; im.src = art === 'linie' && roh.linie ? roh.linie : roh.farbe; if (bilder) bilder.push(im); f.append(im); }
      else f.append(sz ? window.LB.szeneBild(sz.b) : bild(schl));
      if (mitWort) f.append(el('figcaption', 'druck-wort', satz(sz ? sz.sz : w)));
      seite.append(f);
    }
    return seite;
  };
  const druckblatt = (woerter, art, mitWort = false, je = druckJe(art)) => {
    if (!woerter.length) return;
    const seiten = [];
    for (let i = 0; i < woerter.length; i += je) {
      const s = druckSeite(woerter.slice(i, i + je), art, mitWort, je); s.classList.add('vorschau');
      seiten.push(el('div', 'druck-pdf ' + art + (mitWort ? ' mit-wort' : ''), s));
    }
    window.LB_AUSGABE.pdf(seiten, art === 'linie' ? 'Lautbuch zum Ausmalen.pdf' : 'Lautbuch Bilder.pdf');
  };
  function druckRaum(woerter, art) {
    leer();
    document.body.classList.add('auf-welt', 'ohne-unten', 'in-druck');
    galerieKopf(art === 'linie' ? 'zum Ausmalen' : 'farbig drucken');
    const box = el('div', 'druck-raum');
    box.dataset.ort = 'druck'; box.dataset.haupt = '';
    const stapel = el('div', 'druck-stapel ' + art);
    const zeigen = (neu) => {
      const je = druckJe(art), seiten = Math.ceil(woerter.length / je);
      stapel.classList.toggle('mit-wort', !!einst.druckWort);
      stapel.replaceChildren();
      for (let i = Math.min(seiten, 3) - 1; i > 0; i--) stapel.append(el('div', 'druck-unterblatt u' + i));
      const s = druckSeite(woerter.slice(0, je), art, !!einst.druckWort, je);
      s.classList.add('vorschau'); stapel.append(s);
      if (neu) kommt(s, 0, 0, 260);
    };
    const gruppe = (cls, label, eintraege, an, setzen) => {
      const g = el('div', 'druck-wahl ' + cls); g.setAttribute('role', 'group'); g.setAttribute('aria-label', label);
      const ks = eintraege.map(([wert, inhalt, name]) => {
        const k = knopf('wahl', inhalt, () => { setzen(wert); einstSpeichern(); for (const [x, kx] of ks) kx.setAttribute('aria-pressed', String(x === wert)); zeigen(true); }, name);
        k.setAttribute('aria-pressed', String(wert === an)); return [wert, k];
      });
      g.append(...ks.map(([, k]) => k)); return g;
    };
    const seiteIkon = (n) => { const s = el('span', 'seite-ikon je-' + n); s.setAttribute('aria-hidden', 'true'); for (let i = 0; i < n; i++) s.append(el('i')); return s; };
    const format = gruppe('druck-format', 'Bilder je Seite', DRUCK_JE.map(n => [n, seiteIkon(n), n === 1 ? 'ein Bild je Seite' : n + ' Bilder je Seite']), druckJe(art),
      (n) => { einst.druckJe = Object.assign({}, einst.druckJe, { [art]: n }); });
    const wort = gruppe('druck-wort-wahl', 'Wort', [[true, 'mit Wort', 'mit Wort'], [false, 'ohne Wort', 'ohne Wort']], !!einst.druckWort,
      (w) => { einst.druckWort = w; });
    const los = knopf('druck-los', [sym('bild'), el('span', null, 'drucken')], () => druckblatt(woerter, art, !!einst.druckWort, druckJe(art)), 'drucken');
    const steuer = el('div', 'druck-steuer');
    steuer.append(format, wort, los);
    box.append(stapel, steuer);
    main.append(box);
    zeigen(false);
  }
  const oeffne = (l) => { const t = TEILE[l.teil]; if (t) zumOrt(ortZu(t, l.frei)); };

  function weg() {
    leer();
    document.body.classList.add('auf-weg', 'ohne-unten');
    const marke = titelZeile('Mein Lautbuch');
    langDruck(marke, () => schublade());
    oben.append(marke);
    schieneSetzen('weg');
    const land = el('div', 'weg-land');
    land.dataset.haupt = ''; land.dataset.ort = 'weg';
    main.append(land);
    const stand = wegStand();
    const gesehen = new Set(lies(WEG_KEY, []) || []);
    if (gesehen.has('p')) { gesehen.delete('p'); for (const x of ['p1', 'p2', 'p3']) if (stand[x] === 'meister') gesehen.add(x); }
    const neu = WEG.teile.filter(w => stand[w.id] === 'meister' && !gesehen.has(w.id)).pop();
    const zeig = neu ? wegStand(neu.id) : Object.assign({}, stand);
    schreib(WEG_KEY, WEG.teile.filter(w => stand[w.id] === 'meister').map(w => w.id));
    const K = wegZeichnen(land, zeig);
    if (neu) setTimeout(() => { if (land.isConnected) wegLichtung(K, WEG.teile.indexOf(neu), stand); }, ruhig() ? 0 : 700);
    let tR = null;
    hoere(window, 'resize', () => { clearTimeout(tR); tR = setTimeout(() => { if (land.isConnected) { land.replaceChildren(); wegZeichnen(land, wegStand()); } }, 160); });
  }
  function wegZeichnen(land, stand) {
    const breit = land.clientWidth || innerWidth, hoch = land.clientHeight || (innerHeight - 72);
    const lage = breit / Math.max(1, hoch) < .9 ? WEG.hoch : WEG.quer;
    land.classList.toggle('hoch', lage === WEG.hoch);
    const P = (i) => lage.p[i];
    const svg = sv('svg', { class: 'weg-karte', viewBox: `0 0 ${lage.w} ${lage.h}`, preserveAspectRatio: 'xMidYMid meet', role: 'img', 'aria-label': 'Mein Weg' });
    const verlauf = (id, farbe, a0) => sv('radialGradient', { id }, [sv('stop', { offset: '0%', 'stop-color': farbe, 'stop-opacity': a0 }), sv('stop', { offset: '100%', 'stop-color': farbe, 'stop-opacity': 0 })]);
    svg.append(sv('defs', {}, [verlauf('wn', '#fdfaf3', .9), verlauf('wnd', '#fbf7ee', .97), verlauf('wns', '#e8e2d6', .55),
      sv('linearGradient', { id: 'wstrahl', x1: 0, y1: 0, x2: 1, y2: 0 }, [sv('stop', { offset: '0%', 'stop-color': '#ffe9a8', 'stop-opacity': .55 }), sv('stop', { offset: '100%', 'stop-color': '#ffe9a8', 'stop-opacity': 0 })])]));
    const E = { inseln: sv('g'), gras: sv('g'), stationen: sv('g'), nebel: sv('g'), umrisse: sv('g'), wege: sv('g'), dinge: sv('g'), licht: sv('g'), ziel: sv('g') };
    svg.append(E.inseln, E.gras, E.wege, E.stationen, E.nebel, E.umrisse, E.licht, E.ziel, E.dinge);
    const kante = (a, b, i) => {
      const [x1, y1] = a, [x2, y2] = b;
      if (Math.abs(y2 - y1) > 120) { const au = (x1 > lage.w / 2 ? 1 : -1) * 80; return `M${x1} ${y1} C${x1 + au} ${y1 + 40} ${x2 + au} ${y2 - 40} ${x2} ${y2}`; }
      return `M${x1} ${y1} Q${(x1 + x2) / 2} ${(y1 + y2) / 2 + (i % 2 ? 16 : -16)} ${x2} ${y2}`;
    };
    const n = WEG.teile.length;
    const fleck = (cx, cy, rx, ry, k) => {
      const m = 10, p = Array.from({ length: m }, (_, j) => { const a = j / m * Math.PI * 2, r = 1 + .1 * Math.sin(k * 1.7 + j * 2.3) + .05 * Math.cos(k + j * 4.1); return [cx + Math.cos(a) * rx * r, cy + Math.sin(a) * ry * r]; });
      const mitte = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], z = (q) => q.map(v => v.toFixed(1)).join(' ');
      let d = 'M' + z(mitte(p[m - 1], p[0]));
      p.forEach((q, j) => { d += ' Q' + z(q) + ' ' + z(mitte(q, p[(j + 1) % m])); });
      return d + 'Z';
    };
    WEG.teile.forEach((w, i) => {
      const [x, y] = P(i), st = stand[w.id], rx = lage === WEG.hoch ? 74 : 70;
      const ins = sv('path', { d: fleck(x, y + 26, rx, 30, i), class: 'insel', fill: `var(--z-${w.z})`, stroke: `var(--z-${w.z})` });
      E.inseln.append(ins);
      const sg = WEG.siegel(w.gestalt || 'rund', { krone: w.krone, edel: w.edel, gross: w.krone ? 1.1 : 1 });
      E.umrisse.append(sv('g', { class: 'umriss', transform: `translate(${x} ${y}) scale(${lage.gross})` }, sg.form.map(f => { const c = f.cloneNode(); c.removeAttribute('class'); return c; })));
      const gr = sv('g', { class: 'gras' }, [[-62, 18], [58, 26], [-30, 48], [40, -70]].map(([dx, dy]) => pf(`M${x + dx - 6} ${y + dy} q2 -7 4 0 q2 -9 4 0 q2 -6 4 0`)));
      E.gras.append(gr);
      if (i < n - 1) { const d = kante(P(i), P(i + 1), i); E.wege.append(pf(d, 'weg-vorn'), pf(d, 'weg-gegangen')); }
      const g = sv('g', { class: 'station', transform: `translate(${x} ${y}) scale(${lage.gross})`, tabindex: 0, role: 'button', 'aria-label': w.zeichen.join(' ') || 'Ort' });
      g.dataset.ort = w.id;
      const zier = w.krone ? sg.oben - 16 : w.edel ? sg.oben - 12 : (w.gestalt === 'tor' ? -36 : sg.oben);
      const ort = sv('g', { class: 'ort', transform: `translate(0 ${Math.min(-66, Math.round(zier - 30))})` }, WEG.ortTeile(w.ort, w.voegel));
      const schrift = [], [gz, kz] = w.zeichen, kls = w.z === 'vok' ? 'vok' : (w.z === 'uml' || w.z === 'zwie') ? 'klang' : 'kon';
      if (gz && !w.ziel) {
        if (sg.lagen.length > 1) [...gz].forEach((c, k) => {
          const L = sg.lagen[k], t = sv('text', { class: 'buchstabe', x: L.x, y: L.y + 1 }); t.style.fontSize = L.gr + 'px';
          const a = sv('tspan', { class: kls }); a.textContent = c; t.append(a); schrift.push(t);
        });
        else {
          const L = sg.lagen[0], t = sv('text', { class: 'buchstabe', x: L.x, y: L.y + 1 }); t.style.fontSize = L.gr + 'px';
          const a = sv('tspan', { class: kls }); a.textContent = gz; const b = sv('tspan', { class: kls, dx: 3, 'font-size': 20 }); b.textContent = kz; t.append(a, b); schrift.push(t);
        }
      }
      const druck = sv('g', { class: 'druck' }, [sg.tipp, ...sg.halo, ...sg.ring, ...sg.form, ...sg.schmuck, ...schrift]);
      const wlIds = (ortVon(w) || { ids: Array(6).fill('') }).ids;
      const wl = sv('g', { class: 'weglein', transform: `translate(0 ${w.krone ? 48 : 44})` });
      wlIds.forEach((id, k) => {
        const dx = (k - (wlIds.length - 1) / 2) * 14, yy = Math.abs(dx) / 6;
        wl.append(id === 'bilder' ? sv('circle', { cx: dx, cy: yy, r: 4.3, class: 'perle' })
          : id === 'boss' ? sv('rect', { x: dx - 3.6, y: yy - 3.6, width: 7.2, height: 7.2, rx: 1, class: 'perle', transform: `rotate(45 ${dx} ${yy})` })
          : sv('rect', { x: dx - 4, y: yy - 4, width: 8, height: 8, rx: 1.5, class: 'perle' }));
      });
      g.append(ort, druck, wl);
      E.stationen.append(g);
      const ng = sv('g', { class: 'nebel-gruppe' });
      [[-20, 6, 96, 40, 23, 'wns'], [-40, -44, 72, 48, 17, 'wnd'], [36, -60, 64, 42, 21, 'wnd'], [-4, -10, 84, 46, 24, 'wnd'], [46, 6, 54, 34, 19, 'wnd']].forEach(([dx, dy, erx, ery, d, v]) => {
        const vx = ((i * 37 + erx) % 41) - 20, vy = ((i * 23 + ery) % 27) - 13;
        const f = sv('ellipse', { cx: x + dx + vx, cy: y + dy + vy, rx: erx * (1 + ((i + erx) % 5) / 10), ry: ery, fill: `url(#${v})`, class: 'nebel-fleck' });
        f.style.setProperty('--d', d + 's'); ng.append(f);
      });
      const sw = WEG.nebelBild(i % 3, x + ((i * 29) % 31) - 15, y - 18, 118, 30, 'nebel-fleck schwade');
      if (sw) { sw.style.setProperty('--d', (19 + i % 5) + 's'); ng.append(sw); }
      E.nebel.append(ng);
      g.addEventListener('click', () => {
        const s2 = wegStand()[w.id];
        if (s2 === 'nebel' || s2 === 'rand') { for (const f of [druck, ng]) { f.classList.remove('wogt'); void f.getBoundingClientRect(); f.classList.add('wogt'); } return; }
        const o = ortVon(w); if (o) titel(o.t, { ort: w.id });
      });
    });
    const umwelt = sv('g', { class: 'umwelt', 'aria-hidden': 'true' });
    WEG.teile.forEach((w, i) => {
      if (!WEG.wasser.has(w.ort) || stand[w.id] === 'nebel' || stand[w.id] === 'rand') return;
      const [x, y] = P(i);
      [[-18, -50, 0], [14, -44, 2.6], [-2, -40, 5.1]].forEach(([dx, dy, d]) => {
        const st = sv('path', { d: `M${x + dx} ${y + dy - 4} l1.2 2.8 2.8 1.2 -2.8 1.2 -1.2 2.8 -1.2 -2.8 -2.8 -1.2 2.8 -1.2z`, class: 'glanz' });
        st.style.setProperty('--d', (d + i * .7).toFixed(1) + 's'); umwelt.append(st);
      });
    });
    const zug = sv('g', { class: 'zug' }, [pf('M0 0 q5 -5 10 0 q5 -5 10 0'), pf('M18 -12 q4 -4 8 0 q4 -4 8 0'), pf('M30 6 q4 -4 8 0 q4 -4 8 0')]);
    zug.style.setProperty('--weit', (lage.w + 160) + 'px'); zug.setAttribute('transform', `translate(-80 ${lage === WEG.hoch ? 70 : 56})`);
    const wolken = [[lage.w * .22, 40, 70], [lage.w * .7, 64, 90]].map(([cx, cy, rx], k) => { const e = sv('ellipse', { cx, cy, rx, ry: rx * .32, class: 'wolke' }); e.style.setProperty('--d', (k * 13) + 's'); return e; });
    umwelt.append(...wolken, sv('g', { class: 'zug-bahn' }, [zug]));
    E.licht.before(umwelt);
    for (const [cx, cy, rx, ry, d] of (lage === WEG.quer ? [[700, 420, 330, 80, 26], [250, 430, 300, 80, 30], [470, 640, 470, 70, 34]] : [[300, 570, 320, 90, 26], [300, 780, 320, 90, 30], [300, 990, 330, 100, 34], [300, 1200, 330, 100, 38]])) {
      const f = sv('ellipse', { cx, cy, rx, ry, fill: 'url(#wn)', class: 'nebel-fleck bank', 'data-bank': `${cx} ${cy} ${rx}` }); f.style.setProperty('--d', d + 's'); E.nebel.append(f);
      const sw = WEG.nebelBild(Math.round(cx + cy) % 3, cx, cy - ry * .3, rx * 1.05, ry * .55, 'nebel-fleck schwade bank'); if (sw) { sw.setAttribute('data-bank', `${cx} ${cy} ${rx}`); sw.style.setProperty('--d', (d + 5) + 's'); E.nebel.append(sw); }
    }
    const [lx, ly] = P(n - 1);
    const strahl = sv('g', { class: 'strahl' }, [pf(`M${lx} ${ly - 95} L${lx - 380} ${ly - 150} L${lx - 380} ${ly - 70} Z`)]);
    strahl.style.transformOrigin = `${lx}px ${ly - 95}px`;
    strahl.firstChild.setAttribute('fill', 'url(#wstrahl)');
    E.licht.append(strahl);
    E.ziel.append(sv('g', { class: 'ziel-silhouette', transform: `translate(${lx} ${ly - 66}) scale(${lage === WEG.quer ? 1.25 : 1.1})` }, WEG.ortTeile('leuchtturm')));
    const wimpel = sv('g', { class: 'wimpel ding', role: 'button', 'aria-label': 'Lesezeichen' }, [sv('rect', { x: -8, y: -40, width: 64, height: 48, class: 'ding-flaeche' }), sv('line', { x1: 0, y1: 0, x2: 0, y2: -34 }), sv('g', { class: 'wehen', transform: 'translate(0 -34)' }, [pf('M0 0 h17 v23 l-8.5 -6 l-8.5 6 z', 'band')])]);
    const rauch = sv('g', { class: 'rauch' }, [sv('circle', { r: 5 }), sv('circle', { r: 5 }), sv('circle', { r: 5 })]);
    E.dinge.append(rauch, wimpel);
    wimpel.addEventListener('click', (e) => { e.stopPropagation(); weiterLesen(); });
    const K = { svg, E, P, lage, stand: Object.assign({}, stand), wimpel, rauch };
    if (WEG.teile.some(w => w.ziel && stand[w.id] === 'meister')) svg.classList.add('leuchtet');
    land.append(svg);
    wegMalen(K);
    if (lage === WEG.hoch) requestAnimationFrame(() => { const zs = WEG.teile.map(w => K.stand[w.id]), i = zs.includes('hier') ? zs.indexOf('hier') : zs.lastIndexOf('meister'); const st = E.stationen.children[Math.max(0, i)]; if (st) land.scrollTop += st.getBoundingClientRect().top - land.getBoundingClientRect().top - land.clientHeight / 2; });
    return K;
  }
  const FIGUR_KEY = 'lautbuch.figur.v1';
  const FIGUREN = [
    { s: 'kind', name: 'Junge', a: { kopf: [.5, .1, .3], hals: [.5, .33, .2], brust: [.68, .58, .2], tasche: [.33, .56, .26], fuesse: [.5, .93, .2] } },
    { s: 'maedchen', name: 'Mädchen', a: { kopf: [.5, .1, .3], hals: [.5, .33, .2], brust: [.68, .58, .2], tasche: [.33, .56, .26], fuesse: [.5, .93, .2] } },
    { s: 'brille', bw: 'bw-ida', name: 'Ida', a: { kopf: [0.53, 0.11, 0.28], hals: [0.53, 0.47, 0.12], brust: [0.68, 0.6, 0.18], tasche: [0.39, 0.55, 0.22], fuesse: [0.53, 0.93, 0.2] } },
    { s: 'elif', bw: 'bw-elif', name: 'Elif', a: { kopf: [0.49, 0.11, 0.26], hals: [0.49, 0.47, 0.12], brust: [0.64, 0.6, 0.18], tasche: [0.35, 0.55, 0.22], fuesse: [0.49, 0.93, 0.2] } },
    { s: 'conrad', bw: 'bw-conrad', name: 'Conrad', a: { kopf: [0.5, 0.11, 0.26], hals: [0.5, 0.47, 0.12], brust: [0.65, 0.6, 0.18], tasche: [0.36, 0.55, 0.22], fuesse: [0.5, 0.93, 0.2] } },
    { s: 'locken', bw: 'bw-toni', name: 'Toni', a: { kopf: [0.5, 0.11, 0.26], hals: [0.5, 0.47, 0.12], brust: [0.65, 0.6, 0.18], tasche: [0.36, 0.55, 0.22], fuesse: [0.5, 0.93, 0.2] } },
    { s: 'kopftuch', bw: 'bw-nora', name: 'Nora', a: { kopf: [0.5, 0.11, 0.26], hals: [0.5, 0.47, 0.12], brust: [0.65, 0.6, 0.18], tasche: [0.36, 0.55, 0.22], fuesse: [0.5, 0.93, 0.2] } },
    { s: 'schaf', name: 'Schaf', a: { kopf: [.19, .14, .3], hals: [.3, .44, .2], brust: [.26, .56, .22], tasche: [.6, .44, .28], fuesse: [.25, .9, .2] } },
    { s: 'lama', name: 'Lama', a: { kopf: [.21, .1, .28], hals: [.27, .38, .18], brust: [.3, .55, .2], tasche: [.62, .5, .28], fuesse: [.3, .92, .2] } },
    { s: 'bw-eule-luna', name: 'Luna', a: { kopf: [.5, .12, .3], hals: [.5, .45, .2], brust: [.5, .62, .22], tasche: [.78, .66, .26], fuesse: [.5, .95, .2] } },
    { s: 'bw-maus', name: 'Maus', a: { kopf: [.62, .17, .3], hals: [.58, .42, .2], brust: [.6, .55, .22], tasche: [.32, .62, .26], fuesse: [.55, .95, .2] } }
  ];
  const MITBRINGSEL = [
    ['p', 'p1', 'M', 'hals'], ['p', 'p2', 'P', 'hals'], ['p', 'p3', 'W', 'hals'], ['p', 'p4', 'b d', 'hals'],
    ['a', 'l1', 'feder', 'kopf'], ['a', 'l2', 'ananas', 'brust', 'ananas'], ['a', 'l3', 'pinsel', 'brust', 'ding-pinsel'], ['a', 'l4', 'paddel', 'brust'],
    ['i', 'l1', 'band', 'hals'], ['i', 'l2', 'salami', 'brust', 'salami'], ['i', 'l3', 'piratentuch', 'kopf'], ['i', 'l4', 'pilz', 'kopf', 'pilz'],
    ['o', 'l1', 'limo', 'brust'], ['o', 'l2', 'horn', 'hals'], ['o', 'l3', 'lok', 'brust', 'lok'], ['o', 'l4', 'jojo', 'brust', 'jojo'],
    ['u', 'l1', 'hulakette', 'hals'], ['u', 'l2', 'ufo', 'brust', 'ufo'], ['u', 'l3', 'hut', 'kopf', 'hut'], ['u', 'l4', 'zweig', 'brust'],
    ['e', 'l1', 'rose', 'kopf'], ['e', 'l2', 'helm', 'kopf', 'helm'], ['e', 'l3', 'banane', 'brust', 'banane'], ['e', 'l4', 'tasche', 'tasche', 'tasche'],
    ['r1', 'l1', 'kiesel', 'tasche'], ['r1', 'l2', 'buch', 'brust', 'buch'], ['r1', 'l3', 'korb', 'brust', 'korb'],
    ['ae', 'l1', 'kaefer', 'kopf', 'käfer'], ['ae', 'l2', 'klammer', 'kopf'], ['oe', 'l1', 'floete', 'brust', 'flöte'], ['oe', 'l2', 'krone', 'kopf'],
    ['ue', 'l1', 'tuete', 'brust', 'tüte'], ['ue', 'l2', 'kuerbis', 'tasche', 'kürbis'], ['ei', 'l1', 'kreide', 'brust', 'kreide'], ['ei', 'l2', 'mais', 'brust', 'mais'],
    ['au', 'l1', 'raupe', 'kopf', 'raupe'], ['au', 'l2', 'traube', 'brust', 'traube'], ['eu', 'l1', 'heu', 'kopf', 'heu'], ['eu', 'l2', 'blatt', 'tasche'],
    ['r2', 'l1', 'vogel', 'kopf', 'vogel'], ['r2', 'l2', 'comic', 'tasche', 'comic'], ['r3', 'l1', 'stern', 'hals', 'stern'], ['r3', 'l2', 'apfel', 'brust', 'apfel'],
    ['r4', 'l1', 'muetze', 'kopf', 'mütze'], ['r4', 'l2', 'schuhe', 'fuesse', 'schuh'], ['ziel', 'l1', 'laterne', 'brust']
  ];
  const bildDaten = (k) => (window.LB_BILDDATEN || {})[k];
  const figurStand = () => Object.assign({ wer: null, gezeigt: [] }, lies(FIGUR_KEY, {}) || {});
  const VORN = {
    kind: { kopf: [.5, .11, .3], hals: [.5, .47, .12], brust: [.65, .6, .18], tasche: [.36, .55, .22], fuesse: [.5, .93, .2] },
    maedchen: { kopf: [.5, .11, .32], hals: [.5, .47, .12], brust: [.66, .6, .18], tasche: [.33, .55, .22], fuesse: [.5, .93, .2] },
    brille: { kopf: [0.53, 0.11, 0.28], hals: [0.53, 0.47, 0.12], brust: [0.68, 0.6, 0.18], tasche: [0.39, 0.55, 0.22], fuesse: [0.53, 0.93, 0.2] },
    elif: { kopf: [0.49, 0.11, 0.26], hals: [0.49, 0.47, 0.12], brust: [0.64, 0.6, 0.18], tasche: [0.35, 0.55, 0.22], fuesse: [0.49, 0.93, 0.2] },
    conrad: { kopf: [0.5, 0.11, 0.26], hals: [0.5, 0.47, 0.12], brust: [0.65, 0.6, 0.18], tasche: [0.36, 0.55, 0.22], fuesse: [0.5, 0.93, 0.2] },
    locken: { kopf: [0.5, 0.11, 0.26], hals: [0.5, 0.47, 0.12], brust: [0.65, 0.6, 0.18], tasche: [0.36, 0.55, 0.22], fuesse: [0.5, 0.93, 0.2] },
    kopftuch: { kopf: [0.5, 0.11, 0.26], hals: [0.5, 0.47, 0.12], brust: [0.65, 0.6, 0.18], tasche: [0.36, 0.55, 0.22], fuesse: [0.5, 0.93, 0.2] },
    schaf: { kopf: [.5, .11, .28], hals: [.5, .5, .14], brust: [.5, .63, .18], tasche: [.73, .55, .24], fuesse: [.5, .93, .2] },
    lama: { kopf: [.5, .13, .22], hals: [.5, .47, .12], brust: [.5, .61, .16], tasche: [.65, .6, .22], fuesse: [.5, .93, .18] },
    'bw-eule-luna': { kopf: [.5, .1, .3], hals: [.5, .5, .16], brust: [.5, .64, .2], tasche: [.78, .68, .24], fuesse: [.5, .93, .22] },
    'bw-maus': { kopf: [.55, .1, .26], hals: [.55, .53, .12], brust: [.55, .65, .16], tasche: [.3, .62, .22], fuesse: [.55, .93, .2] }
  };
  const FIGUR_BILD = { kind: ['fig-junge-vorn', 'fig-kind-vorn', 'kind'], maedchen: ['fig-maedchen-vorn', 'mädchen'], brille: ['fig-brille-vorn'], elif: ['fig-elif-vorn'], conrad: ['fig-conrad-vorn'], locken: ['fig-locken-vorn'], kopftuch: ['fig-kopftuch-vorn'], schaf: ['fig-schaf-vorn', 'schaf'], lama: ['fig-lama-vorn', 'lama'],
    'bw-eule-luna': ['fig-luna-vorn', 'bw-eule-luna'], 'bw-maus': ['fig-maus-vorn', 'bw-maus'] };
  const figurBild = (f) => (FIGUR_BILD[f.s] || [f.s]).find(k => bildDaten(k) && bildDaten(k).farbe) || null;
  const figurAnker = (f) => /-vorn$/.test(figurBild(f) || '') ? (VORN[f.s] || f.a) : f.a;
  const figurWahlen = () => FIGUREN.filter(figurBild);
  const figurVon = (s) => figurWahlen().find(f => f.s === s) || null;
  const figurBewohner = () => { const f = figurVon(figurStand().wer); return f ? (f.bw || f.s) : null; };
  const mbId = (m) => m[0] + '.' + m[1];
  const mbStand = (t) => lies('lautbuch.akt.' + t + '.v1', {}) || {};
  const mbGelesen = (teil, lv) => {
    const s = mbStand(teil); if (s[lv] === true || s.boss === true) return true;
    const F = ((window.LAUTBUCH_FOLGE || {}).FOLGE || []).map(f => f.teil), i = F.indexOf(teil);
    return i >= 0 && F.slice(i + 1).some(t => { const st = mbStand(t); return Object.keys(st).some(k => /^(l\d+|p\d+|boss)$/.test(k) && st[k] === true); });
  };
  const mbHat = () => MITBRINGSEL.filter(m => mbGelesen(m[0], m[1]));
  const mbBild = (m) => ['mb-' + m[2], m[2], m[4]].find(k => k && bildDaten(k) && bildDaten(k).farbe);
  const figurTraegt = (hat) => {
    const platz = {}, tasche = [];
    const sichtbar = (m) => m[0] === 'p' || !!mbBild(m);
    for (const m of hat) { if (m[3] === 'tasche') { if (m[2] !== 'tasche') tasche.push(m); continue; } if (!sichtbar(m)) continue; if (platz[m[3]]) tasche.push(platz[m[3]]); platz[m[3]] = m; }
    const hatTasche = hat.some(m => m[2] === 'tasche');
    return { platz, tasche: hatTasche ? tasche.filter(mbBild).slice(-3) : [], hatTasche };
  };
  const figurMass = (K) => { const H = K.lage === WEG.hoch ? 64 : 52; return { H, S: H / .9 }; };
  const MB_MIN = 12;
  const mbKnoten = (m, x, y, br) => {
    const k = mbBild(m);
    if (k) { const b = sv('image', { href: bildDaten(k).farbe, x: x - br / 2, y: y - br / 2, width: br, height: br, class: 'mb-ding' }); b.dataset.mb = mbId(m); return b; }
    if (m[0] !== 'p') return null;
    const w = m[2].length > 1 ? 11 : 7.5, g = sv('g', { class: 'mb-ding mb-schild' }, [
      sv('rect', { x: x - w / 2, y: y - 4, width: w, height: 8, rx: 2, fill: '#e9c48f', stroke: '#8a5a2b', 'stroke-width': .7 }),
      sv('text', { x, y: y + 2.3, 'text-anchor': 'middle', 'font-size': 6.4, 'font-weight': 700, fill: '#5a3d24' })]);
    g.lastChild.textContent = m[2]; g.dataset.mb = mbId(m); return g;
  };
  function figurKoerper(f, S, x0, y0) {
    const at = (a) => [x0 + a[0] * S, y0 + a[1] * S, Math.max(MB_MIN, a[2] * S)];
    const g = sv('g', { class: 'figur-koerper' });
    g.append(sv('image', { href: bildDaten(figurBild(f)).farbe, x: x0, y: y0, width: S, height: S, class: 'figur-bild' }));
    const tr = figurTraegt(mbHat()), A = figurAnker(f);
    if (tr.hatTasche) {
      const [tx, ty, tb] = at(A.tasche);
      tr.tasche.forEach((m, k) => { const n = mbKnoten(m, tx + (k - 1) * tb * .28, ty - tb * .42, tb * .45); if (n) g.append(n); });
      const t = mbKnoten(MITBRINGSEL.find(m => m[2] === 'tasche'), tx, ty, tb); if (t) g.append(t);
    }
    for (const p of ['fuesse', 'brust', 'hals', 'kopf']) { const m = tr.platz[p]; if (!m) continue; const [x, y, b] = at(A[p]); const n = mbKnoten(m, x, y, b); if (n) g.append(n); }
    return g;
  }
  const figurSvg = (s) => {
    const f = figurVon(s); if (!f) return null;
    const S = 52 / .9, svg = sv('svg', { viewBox: `0 0 ${S} ${S}`, class: 'figur-svg', 'aria-hidden': 'true' });
    svg.append(figurKoerper(f, S, 0, 0)); return svg;
  };
  function figurMalen(K) {
    K.wimpel.querySelectorAll('.figur-koerper, .figur-schatten').forEach(x => x.remove());
    const f = figurVon(figurStand().wer);
    K.wimpel.classList.toggle('figur', !!f);
    const flaeche = K.wimpel.querySelector('.ding-flaeche');
    if (!f) { flaeche.setAttribute('x', -8); flaeche.setAttribute('y', -40); flaeche.setAttribute('width', 64); flaeche.setAttribute('height', 48); return; }
    const { H, S } = figurMass(K), x0 = -S * .3, y0 = -S * .95;
    const g = figurKoerper(f, S, x0, y0);
    K.wimpel.append(sv('ellipse', { cx: x0 + S / 2, cy: 1, rx: S * .3, ry: 3, class: 'figur-schatten' }), g);
    flaeche.setAttribute('x', x0 - 4); flaeche.setAttribute('y', y0 - 4); flaeche.setAttribute('width', S + 8); flaeche.setAttribute('height', S + 8);
    K.wimpel.setAttribute('aria-label', 'Lesezeichen · ' + f.name);
    if (K.nachGang) { K.nachGang = false; if (!ruhig()) g.querySelectorAll('.mb-ding').forEach(d => d.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 320, easing: 'ease-out' })); }
  }
  function figurNachher(K) {
    K.E.dinge.querySelectorAll('.figur-wahl').forEach(x => x.remove());
    const fs = figurStand(), hat = mbHat();
    if (!figurVon(fs.wer)) return figurWahlZeigen(K);
    const neu = hat.filter(m => !fs.gezeigt.includes(mbId(m)));
    if (!neu.length) return;
    schreib(FIGUR_KEY, Object.assign(fs, { gezeigt: hat.map(mbId) }));
    const m = neu[neu.length - 1], n = K.wimpel.querySelector(`[data-mb="${mbId(m)}"]`);
    const i = WEG.teile.findIndex(w => { const o = ortVon(w); return o && o.t.id === m[0] && o.ids.includes(m[1]); });
    const st = K.E.stationen.children[i];
    if (!n || !st || ruhig() || !document.body.animate) return;
    n.style.transformBox = 'fill-box'; n.style.transformOrigin = '50% 50%';
    const rs = st.getBoundingClientRect(), rn = n.getBoundingClientRect(), fk = K.wimpel.querySelector('.figur-koerper'), s = (fk.getBoundingClientRect().width / figurMass(K).S) || 1;
    const dx = (rs.x + rs.width / 2 - (rn.x + rn.width / 2)) / s, dy = (rs.y + rs.height / 2 - (rn.y + rn.height / 2)) / s, V = 500;
    n.animate([{ transform: `translate(${dx}px, ${dy}px) scale(.4)`, opacity: 0 }, { offset: .15, transform: `translate(${dx}px, ${dy - 14}px) scale(1.2)`, opacity: 1 },
      { offset: .4, transform: `translate(${dx}px, ${dy - 18}px) scale(1.3)` }, { offset: .75, transform: `translate(${dx * .35}px, ${Math.min(dy, 0) - 46}px) scale(1.15) rotate(-12deg)` },
      { offset: .9, transform: 'translate(0px, -4px) scale(1.05) rotate(4deg)' }, { transform: 'none', opacity: 1 }], { duration: 1500, delay: V, easing: 'ease-in-out', fill: 'backwards' });
    fk.style.transformBox = 'fill-box'; fk.style.transformOrigin = '50% 100%';
    fk.animate([{ transform: 'none' }, { offset: .3, transform: 'scale(1.08, .9)' }, { offset: .6, transform: 'translateY(-10px) scale(.96, 1.06)' }, { offset: .85, transform: 'scale(1.04, .96)' }, { transform: 'none' }], { duration: 650, delay: V + 1450, easing: 'ease-out' });
    const nb = n.getBBox ? n.getBBox() : { x: 0, y: 0, width: 0, height: 0 };
    for (let k = 0; k < 6; k++) {
      const c = sv('circle', { cx: nb.x + nb.width / 2, cy: nb.y + nb.height / 2, r: 1.8, fill: '#e8b84a' }); K.wimpel.append(c);
      c.animate([{ transform: 'translate(0px,0px)', opacity: 0 }, { offset: .2, opacity: 1 }, { transform: `translate(${Math.cos(k * 1.05) * 22}px, ${Math.sin(k * 1.05) * 16 - 12}px)`, opacity: 0 }],
        { duration: 900, delay: V + 1400 + k * 40, easing: 'ease-out', fill: 'both' }).onfinish = () => c.remove();
    }
  }
  function figurWahlZeigen(K) {
    const wahl = figurWahlen(); if (!wahl.length) return;
    const tr = (K.wimpel.getAttribute('transform') || '').match(/translate\(([-\d.]+)[ ,]+([-\d.]+)\)/); if (!tr) return;
    K.wimpel.style.display = 'none';
    const ab = Math.min(K.lage === WEG.hoch ? 62 : 48, (K.lage.w - 28) / wahl.length), S = ab * .92, breit = ab * wahl.length + 12;
    const x0 = Math.max(8, Math.min(K.lage.w - breit - 8, +tr[1] - breit / 2)), y = Math.max(S + 12, +tr[2] + 10);
    const reihe = sv('g', { class: 'figur-wahl' }, [sv('rect', { x: x0, y: y - S - 8, width: breit, height: S + 18, rx: 14, class: 'figur-wahl-grund' })]);
    wahl.forEach((f, k) => {
      const cx = x0 + 6 + ab * (k + .5);
      const d = sv('g', { class: 'ding ding-offen figur-wahl-ding', role: 'button', 'aria-label': f.name }, [
        sv('ellipse', { cx, cy: y + 2, rx: S * .34, ry: 4.5, class: 'ding-ring' }),
        sv('rect', { x: cx - ab / 2, y: y - S - 4, width: ab, height: S + 12, class: 'ding-flaeche' }),
        sv('image', { href: bildDaten(figurBild(f)).farbe, x: cx - S / 2, y: y - S, width: S, height: S })]);
      d.addEventListener('click', (e) => {
        e.stopPropagation();
        if (reihe.dataset.gewaehlt) return; reihe.dataset.gewaehlt = '1';
        schreib(FIGUR_KEY, { wer: f.s, gezeigt: mbHat().map(mbId) });
        const fertig = () => { reihe.remove(); K.wimpel.style.display = ''; wegMalen(K); };
        if (ruhig() || !document.body.animate) return fertig();
        [...reihe.children].forEach(c => { if (c !== d) c.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 380, fill: 'forwards' }); });
        const bild = d.lastChild; bild.style.transformBox = 'fill-box'; bild.style.transformOrigin = '50% 100%';
        bild.animate([{ transform: 'none' }, { offset: .4, transform: 'translateY(-14px) scale(1.06)' }, { offset: .75, transform: 'scale(1.05, .95)' }, { transform: 'none' }], { duration: 600, easing: 'ease-out' }).onfinish = fertig;
      });
      reihe.append(d);
    });
    K.E.dinge.append(reihe);
  }
  const FIGUR_SEITE = { kind: 'fig-junge-seite', maedchen: 'fig-maedchen-seite', brille: 'fig-brille-seite', elif: 'fig-elif-seite', conrad: 'fig-conrad-seite', locken: 'fig-locken-seite', kopftuch: 'fig-kopftuch-seite', schaf: 'fig-schaf-seite', lama: 'fig-lama-seite', 'bw-eule-luna': 'fig-luna-seite', 'bw-maus': 'fig-maus-seite' };
  const figurSchritte = (K, ms, dx = 1) => {
    const fk = K.wimpel.querySelector('.figur-koerper'); if (!fk || ruhig()) return;
    fk.style.transformBox = 'fill-box'; fk.style.transformOrigin = '50% 100%';
    const f = figurVon(figurStand().wer), seite = f && bildDaten(FIGUR_SEITE[f.s]), bild = fk.querySelector('.figur-bild');
    if (seite && seite.farbe && bild) {
      const vorn = bild.getAttribute('href'), cx = +bild.getAttribute('x') + +bild.getAttribute('width') / 2;
      bild.setAttribute('href', seite.farbe);
      if (dx < 0) bild.setAttribute('transform', `translate(${2 * cx} 0) scale(-1 1)`);
      setTimeout(() => { if (!bild.isConnected) return; bild.setAttribute('href', vorn); bild.removeAttribute('transform'); }, ms);
    }
    for (const d of fk.querySelectorAll('.mb-ding')) d.animate([{ opacity: 1 }, { opacity: 0, offset: .12 }, { opacity: 0, offset: .88 }, { opacity: 1 }], { duration: ms + 250 });
    K.nachGang = true;
    fk.animate([{ transform: 'none' }, { offset: .5, transform: 'translateY(-3px)' }, { transform: 'none' }], { duration: 250, iterations: Math.round(ms / 250), easing: 'ease-in-out' });
  };
  function figurFinale(K) {
    const dinge = [...K.wimpel.querySelectorAll('.mb-ding')]; if (!dinge.length) return;
    const n = WEG.teile.length, [lx, ly] = K.P(n - 1), tr = (K.wimpel.getAttribute('transform') || '').match(/translate\(([-\d.]+)[ ,]+([-\d.]+)\)/), wx = tr ? +tr[1] : lx, wy = tr ? +tr[2] : ly;
    const bogen = sv('g', { class: 'figur-finale' }); K.E.dinge.append(bogen);
    const alle = MITBRINGSEL.filter(m => mbBild(m) && mbHat().includes(m));
    alle.forEach((m, k) => {
      const w = Math.PI * (1.05 + .9 * k / Math.max(1, alle.length - 1)), r = 92, x = lx + Math.cos(w) * r, y = ly - 30 + Math.sin(w) * r * .55 + 40;
      const b = mbKnoten(m, x, y, 16); if (!b) return; bogen.append(b);
      if (ruhig() || !document.body.animate) return;
      b.animate([{ transform: `translate(${wx - x}px, ${wy - 20 - y}px) scale(.5)`, opacity: 0 }, { offset: .2, opacity: 1 }, { offset: .6, transform: `translate(${(wx - x) * .4}px, ${(wy - y) * .4 - 60}px) scale(1.1)` }, { transform: 'none', opacity: 1 }],
        { duration: 1300, delay: 300 + k * 70, easing: 'ease-in-out', fill: 'backwards' });
    });
  }
  function wegMalen(K) {
    const { E, P, stand } = K;
    let hierI = WEG.teile.findIndex(w => stand[w.id] === 'hier');
    if (hierI < 0) { hierI = WEG.teile.map(w => stand[w.id]).lastIndexOf('meister'); }
    WEG.teile.forEach((w, i) => {
      const st = stand[w.id], g = E.stationen.children[i];
      g.dataset.stand = st;
      g.classList.remove('meister', 'hier', 'offen', 'rand', 'nebel'); g.classList.add(st);
      const ins = E.inseln.children[i];
      ins.style.fillOpacity = st === 'meister' ? .3 : st === 'hier' || st === 'offen' ? .24 : st === 'rand' ? .1 : .05;
      if (st === 'nebel' || st === 'rand') { ins.style.fill = '#bdb7ad'; ins.style.strokeOpacity = 0; } else { ins.style.fill = ''; ins.style.strokeOpacity = ''; }
      E.nebel.children[i].classList.toggle('weg', st === 'meister' || st === 'hier' || st === 'offen');
      E.nebel.children[i].classList.toggle('duenn', st === 'rand');
      E.umrisse.children[i].classList.toggle('an', st === 'nebel' && !w.ziel);
      E.gras.children[i].classList.toggle('an', st === 'meister' || st === 'hier' || st === 'offen');
      const pl = perlenVon(w, st);
      [...g.querySelector('.weglein').children].forEach((p, k) => { p.classList.toggle('gold', pl[k] === 'gold'); p.classList.toggle('jetzt', pl[k] === 'jetzt'); });
    });
    E.nebel.querySelectorAll('[data-bank]').forEach(b => {
      const [cx, cy, rx] = b.getAttribute('data-bank').split(' ').map(Number);
      b.classList.toggle('gelichtet', WEG.teile.some((w, i) => { const [x, y] = P(i), s = stand[w.id]; return Math.abs(y - cy) < 150 && Math.abs(x - cx) < rx + 40 && (s === 'meister' || s === 'hier' || s === 'offen'); }));
    });
    E.wege.querySelectorAll('.weg-gegangen').forEach((p, i) => { const b = WEG.teile[i + 1]; p.style.opacity = stand[WEG.teile[i].id] === 'meister' || (b && stand[b.id] === 'meister') ? 1 : 0; });
    const wimpelI = hierI;
    if (wimpelI >= 0) { const [x, y] = P(wimpelI); K.wimpel.setAttribute('transform', `translate(${x + 24 * K.lage.gross} ${y - 22})`); K.rauch.setAttribute('transform', `translate(${x + 14} ${y - 104})`); }
    figurMalen(K);
    E.dinge.querySelectorAll('.truhe-ding, .staffelei-ding, .buch-ding, .bewohner, .kiesel-ding, .feuer-ding, .baum-ding').forEach(x => x.remove());
    const frei = freiePlaetze(K);
    if (window.LB_HAUS && zimmerDa) window.LB_HAUS(K, { frei, ruhig, zimmer: () => zimmer(), neu: () => !!(window.LB_ZIMMER.neu && window.LB_ZIMMER.neu(zimmerApi())) });
    const PLATZ_KEY = 'lautbuch.bewohner.platz.v1', platzLage = Math.round(K.lage.w) + 'x' + Math.round(K.lage.h);
    const platzAlt = ((lies(PLATZ_KEY, {}) || {})[platzLage]) || {}, platzNeu = {}, reserviert = new Set();
    for (const [k, v] of Object.entries(platzAlt)) {
      if (!Array.isArray(v)) continue;
      const istBaum = k.startsWith('baum:'), fuss = LEBENSRAUM[k] === 'luft' ? 40 : 28, w = istBaum ? (+v[2] || 48) : fuss, h = istBaum ? (+v[3] || 64) : fuss;
      frei.reserviere('res:' + k, { x0: v[0] - w / 2, y0: v[1] - h / 2, x1: v[0] + w / 2, y1: v[1] + h / 2 }); reserviert.add('res:' + k);
    }
    const platzFrei = (k) => { if (reserviert.delete('res:' + k)) frei.freigeben('res:' + k); };
    const ECKEN = { truhe: [[30, 22], [-72, 22], [34, -22], [-76, -22], [64, 22], [-106, 22]], staffelei: [[34, -22], [-76, -22], [30, 22], [-72, 22], [64, -22], [-106, -22]],
      buch: [[-72, 22], [64, 22], [-76, -22], [64, -22], [30, 22], [-106, 22]] };
    WEG.teile.forEach((w, i) => {
      const o = ortVon(w), st = stand[w.id];
      if (!o || st !== 'meister' || !o.ids.includes('boss')) return;
      const t = o.t;
      const ding = (art, gold, label, auf, besucht = gold) => {
        const d = sv('g', { class: `${art}-ding ding ${gold ? 'ding-gold' : besucht ? 'ding-besucht' : 'ding-offen'}`, role: 'button', 'aria-label': label },
          [sv('ellipse', { cx: 19, cy: 33, rx: 19, ry: 7, class: 'ding-ring' }), sv('rect', { x: -2, y: -2, width: 42, height: 42, class: 'ding-flaeche' })]);
        d.append(sv('g', { class: 'ding-koerper' }, [WEG.dingBild(art, 38)]));
        d.addEventListener('click', (e) => { e.stopPropagation(); auf(); });
        d.dataset.teil = t.id;
        if (!(art === 'buch' && frei.setze(d, i, { box: [-2, -2, 40, 40], nah: [44, 220], lage: 7, nurNah: true }))) frei.amOrt(d, i, t.id, ECKEN[art], [-2, -2, 40, 40]);
        return d;
      };
      if (t.schatz) ding('truhe', !!licht[t.id].schatz, 'Schatz', () => schatz(t)).dataset.ort = 'schatz';
      if (bildPool(t).length) ding('staffelei', !!licht[t.id].bilder, 'Bilder', () => bilderRaum(t), !!(licht[t.id].bilder || licht[t.id].bilderOffen)).dataset.ort = t.id + '|bilder';
      if (window.LB_BUECHER) for (const id of window.LB_BUECHER.amOrt(t.id)) {
        ding('buch', false, 'Buch', () => { window.LB_BUECHER.aufheben(id); buchAuf(id, () => wegMalen(K)); }).dataset.ort = 'buch|' + id;
      }
    });
    const ausgezogen = VERSUCH.zimmer && window.LB_ZIMMER && window.LB_ZIMMER.auszug ? window.LB_ZIMMER.auszug(zimmerApi()) : [];
    const bewohner = [], imZimmer = new Set(VERSUCH.zimmer && window.LB_ZIMMER ? [...window.LB_ZIMMER.drinnen(), ...ausgezogen] : []);
    WEG.teile.forEach((w, i) => {
      const o = ortVon(w), st = stand[w.id];
      if (!o || st === 'nebel' || st === 'rand') return;
      const t = o.t;
      if (st === 'meister' && o.ids.includes('boss')) {
        for (const b of t.bewohner || []) if (b.s !== figurBewohner()) bewohner.push([b, i]);
      }
      const mitSteinen = o.lv.find(lv => (licht[t.id].stolper || {})[lv.id]?.length);
      if (mitSteinen) {
        const zahl = Math.min(3, o.lv.reduce((a, lv) => a + ((licht[t.id].stolper || {})[lv.id] || []).length, 0));
        const ks = sv('g', { class: 'kiesel-ding ding', role: 'button', 'aria-label': 'Stolpersteine' }, [sv('rect', { x: -18, y: -12, width: 40, height: 26, class: 'ding-flaeche' })]);
        [[0, 0, 7, 5], [10, 3, 5.5, 4], [-8, 4, 5, 3.6]].slice(0, zahl).forEach(([dx, dy, rx, ry]) => ks.append(sv('ellipse', { cx: dx, cy: dy, rx, ry, class: 'kiesel' }), sv('ellipse', { cx: dx - rx * .3, cy: dy - ry * .35, rx: rx * .35, ry: ry * .25, class: 'kiesel-glanz' })));
        ks.dataset.ort = t.id + '|' + mitSteinen.id;
        ks.addEventListener('click', (e) => { e.stopPropagation(); level(t, mitSteinen, 'ueben', 'stolper'); });
        frei.setze(ks, i, { box: [-18, -12, 22, 14], nah: [52, 140] });
      }
    });
    if (wiederholenPool().size > 1 && hierI >= 0) {
      const kr = K.svg.getBoundingClientRect(), masz = kr.width ? Math.min(kr.width / K.lage.w, kr.height / K.lage.h) : 1, seite = Math.max(34, 46 / masz);
      const sp = sv('g', { class: 'feuer-ding ding', role: 'button', 'aria-label': 'Wiederholen' }, [sv('rect', { x: 13 - seite / 2, y: 13 - seite / 2, width: seite, height: seite, class: 'ding-flaeche' }),
        sv('ellipse', { cx: 13, cy: 26, rx: 15, ry: 4, class: 'feuer-schein' }),
        sv('g', { class: 'feuer-flamme' }, [pf('M13 1 C19 8 23 13 21 19 C19.5 23.5 6.5 23.5 5 19 C3.5 14 8 11 10 6 C11 10 13.5 11 13 1 Z', 'flamme-aussen'),
          pf('M13.5 10 C17 14 17.5 18.5 14.5 20.5 C12 21.5 9.5 19.5 11 16 C11.8 14.5 13 13 13.5 10 Z', 'flamme-innen')]),
        pf('M3 25 L23 21', 'scheit'), pf('M3 21 L23 25', 'scheit')]);
      sp.dataset.ort = 'wiederholen';
      sp.addEventListener('click', (e) => { e.stopPropagation(); wiederholen(); });
      frei.setze(sp, hierI, { box: [-4, -4, 30, 30], nah: [56, 150] });
      const fl = sp.querySelector('.ding-flaeche');
      if (sp.isConnected) for (const o of [...K.E.stationen.children, ...K.E.dinge.querySelectorAll('.ding')]) {
        if (o === sp) continue;
        const a = fl.getBoundingClientRect(), b = o.getBoundingClientRect();
        const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left), oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
        if (ox <= 0 || oy <= 0) continue;
        let x = +fl.getAttribute('x'), y = +fl.getAttribute('y'), w = +fl.getAttribute('width'), h = +fl.getAttribute('height');
        if (ox <= oy) { const d = ox / masz; if (a.left + a.width / 2 < b.left + b.width / 2) w = Math.max(34 - (x + 4), w - d); else { const n = Math.min(x + d, -4); w -= n - x; x = n; } }
        else { const d = oy / masz; if (a.top + a.height / 2 < b.top + b.height / 2) h = Math.max(34 - (y + 4), h - d); else { const n = Math.min(y + d, -4); h -= n - y; y = n; } }
        fl.setAttribute('x', x); fl.setAttribute('y', y); fl.setAttribute('width', w); fl.setAttribute('height', h);
      }
    }
    const baeume = [];
    const platzMerken = (bw) => {
      const m = /translate\(([-\d.]+)[ ,]+([-\d.]+)\)/.exec(bw.getAttribute('transform') || '');
      if (m) platzNeu[bw.dataset.bewohner] = [+(+m[1] + 20).toFixed(1), +(+m[2] + 20).toFixed(1), bw.dataset.baum || bw.dataset.ohne || ''];
    };
    const setzeBewohner = ([b, i], k) => {
      const art = LEBENSRAUM[b.s] || 'land';
      const bw = sv('g', { class: 'bewohner ' + art });
      const lebt = sv('g', { class: 'lebt ' + art + (art === 'land' && k % 2 ? ' schaut' : '') });
      lebt.style.setProperty('--d', (-((k * 1.7) % 9)).toFixed(1) + 's');
      lebt.style.setProperty('--t', (art === 'land' ? 15 + (k * 3) % 8 : 4 + (k % 3)) + 's');
      lebt.append(bildImWeg(b.s, 40)); bw.append(lebt);
      bw.dataset.bewohner = b.s;
      if (imZimmer.has(b.s)) bw.classList.add('im-haus');
      const alt = platzAlt[b.s];
      const baumAlt = alt && alt[2] && alt[2].startsWith('baum') ? baeume.find(t => t.id === alt[2] && t.frei && alt[0] > t.box.x0 && alt[0] < t.box.x1 && alt[1] > t.box.y0 - 24 && alt[1] < t.box.y1) : null;
      if (alt && (art !== 'luft' || baumAlt || !alt[2]) && frei.setzeBei(bw, alt[0], alt[1], art === 'luft' ? [0, 0, 40, 40] : [6, 6, 34, 34], [alt[2], 'res:' + b.s].filter(Boolean), undefined, !baumAlt)) {
        if (baumAlt) { baumAlt.frei = false; bw.dataset.baum = baumAlt.id; }
        if (alt[2] && alt[2].startsWith('station')) bw.dataset.ohne = alt[2];
      } else if (art === 'wasser' && WASSERORT[b.s]) {
        const ok = WASSERORT[b.s].some(ort => WEG.teile.some((w, j) => {
          const s = stand[w.id]; if (w.ort !== ort || s === 'nebel' || s === 'rand') return false;
          const ok = !!frei.amWasser(bw, j, [0, 0, 40, 40], k);
          if (ok) bw.dataset.ohne = 'station' + j;
          return ok;
        }));
        if (!ok) frei.setze(bw, i, { box: [6, 6, 34, 34], nah: [70, 420], lage: k });
      } else if (art === 'wasser') {
        const [x0, y0] = P(i); let best = Infinity, j0 = i;
        WEG.teile.forEach((w, j) => { const s = stand[w.id]; if (!WEG.wasser.has(w.ort) || s === 'nebel' || s === 'rand') return; const [x, y] = P(j), d = Math.hypot(x - x0, y - y0); if (d < best && d < 520) { best = d; j0 = j; } });
        frei.setze(bw, j0, { box: [0, 0, 40, 40], nah: [36, 300], am: 'bild', lage: k });
      } else if (art === 'luft') {
        const [x0, y0] = P(i);
        const reihe = baeume.filter(t => t.frei).sort((s, t) => Math.hypot((s.box.x0 + s.box.x1) / 2 - x0, s.box.y0 - y0) - Math.hypot((t.box.x0 + t.box.x1) / 2 - x0, t.box.y0 - y0));
        const baum = reihe.find(t => frei.setzeBei(bw, (t.box.x0 + t.box.x1) / 2, t.box.y0 + 12 * t.gr, [0, 0, 40, 40], t.id));
        if (baum) { baum.frei = false; bw.dataset.baum = baum.id; }
        else frei.setze(bw, i, { box: [0, 0, 40, 40], nah: [30, 330], am: 'oben', hoch: true, lage: k });
      } else frei.setze(bw, i, { box: [6, 6, 34, 34], nah: [70, 420], lage: k });
      platzFrei(b.s);
    };
    const vogel = ([b]) => LEBENSRAUM[b.s] === 'luft';
    const pflanze = (i, id, mitVogel) => {
      const gr = .85 + ((i * 37) % 7) / 20;
      const b = baumZeichnen(gr, i);
      const kasten = [-24 * gr, -56 * gr - (mitVogel ? 18 : 0), 24 * gr, 4 * gr], alt = platzAlt['baum:' + id];
      const seineVoegel = Object.entries(platzAlt).filter(([k, v]) => !k.startsWith('baum:') && Array.isArray(v) && v[2] === id).map(([k]) => 'res:' + k);
      let box = alt && frei.setzeBei(b, alt[0], alt[1], kasten, ['res:baum:' + id, ...seineVoegel], id, !seineVoegel.length);
      platzFrei('baum:' + id);
      if (!box) box = frei.setze(b, i, { box: kasten, nah: mitVogel ? [70, 460] : [96, 260], lage: i + 50, id, nurNah: !mitVogel });
      if (!box) return null;
      platzNeu['baum:' + id] = [+((box.x0 + box.x1) / 2).toFixed(1), +((box.y0 + box.y1) / 2).toFixed(1), +(box.x1 - box.x0).toFixed(1), +(box.y1 - box.y0).toFixed(1)];
      if (mitVogel) box.y0 += 18;
      b.dataset.baum = id; const t = { id, box, gr, frei: true }; baeume.push(t); return t;
    };
    const BW_GESEHEN = 'lautbuch.bewohner.gesehen.v1';
    const bwGesehen = lies(BW_GESEHEN, null);
    const bwNeu = new Set(bwGesehen ? bewohner.map(([b]) => b.s).filter(s => !bwGesehen.includes(s) && !imZimmer.has(s)) : []);
    schreib(BW_GESEHEN, [...new Set([...(bwGesehen || []), ...bewohner.map(([b]) => b.s)])]);
    const setzeBewohnerAlt = setzeBewohner;
    const setzeBewohnerNeu = ([b, i], k) => {
      setzeBewohnerAlt([b, i], k);
      const bw = K.svg.querySelector(`.bewohner[data-bewohner="${b.s}"]`);
      if (bw) platzMerken(bw);
      const alt = platzAlt[b.s], neu = platzNeu[b.s];
      if (bw && alt && neu && !bwNeu.has(b.s) && Math.hypot(alt[0] - neu[0], alt[1] - neu[1]) > 4) bw.dataset.von = (alt[0] - 20).toFixed(1) + ' ' + (alt[1] - 20).toFixed(1);
      if (!bwNeu.has(b.s)) return;
      if (bw) { const [x, y] = P(i); bw.dataset.neu = '1'; bw.dataset.herkunft = Math.round(x) + ' ' + Math.round(y); }
    };
    bewohner.forEach(([b, i], k) => { if (vogel([b])) pflanze(i, 'baum-v' + k, true); });
    bewohner.forEach((x, k) => { if (vogel(x)) setzeBewohnerNeu(x, k); });
    bewohner.forEach((x, k) => { if (!vogel(x)) setzeBewohnerNeu(x, k); });
    for (const k of Object.keys(platzAlt)) if (!k.startsWith('baum:')) platzFrei(k);
    WEG.teile.forEach((w, i) => { const st = stand[w.id]; if (st !== 'nebel' && st !== 'rand' && !w.ziel) pflanze(i, 'baum' + i, false); });
    for (const k of [...reserviert]) frei.freigeben(k);
    schreib(PLATZ_KEY, Object.assign(lies(PLATZ_KEY, {}) || {}, { [platzLage]: platzNeu }));
    if (window.LB_FIGUREN) window.LB_FIGUREN(K, { ruhig, LEBENSRAUM, heraus: ausgezogen,
      einziehen: zimmerDa && window.LB_ZIMMER.einziehen ? (s) => window.LB_ZIMMER.einziehen(s, zimmerApi()) : null });
    figurNachher(K);
  }
  const LEBENSRAUM = {
    'bw-delfin': 'wasser', 'bw-moewe': 'wasser', 'bw-pinguin': 'wasser', 'bw-storch': 'wasser',
    'bw-ara': 'luft', 'bw-eule-luna': 'luft', 'bw-uhu': 'luft', 'bw-meise': 'luft', 'bw-kraehe': 'luft'
  };
  const WASSERORT = { 'bw-delfin': ['wellen', 'hafen', 'teich'], 'bw-storch': ['teich', 'hafen', 'wellen'], 'bw-pinguin': ['hafen', 'teich', 'wellen'] };
  const freiePlaetze = (K) => {
    const { E, P, lage, stand } = K, belegt = [], RAND = 6;
    const zuKarte = K.svg.getScreenCTM().inverse();
    const boxVon = (el, f) => {
      const r = el.getBBox(), w0 = zuKarte.multiply(el.getScreenCTM());
      const b = f ? { x: r.x + f[0] * r.width, y: r.y + f[1] * r.height, width: (f[2] - f[0]) * r.width, height: (f[3] - f[1]) * r.height } : r;
      const ecken = [[b.x, b.y], [b.x + b.width, b.y], [b.x, b.y + b.height], [b.x + b.width, b.y + b.height]].map(([x, y]) => [w0.a * x + w0.c * y + w0.e, w0.b * x + w0.d * y + w0.f]);
      return { x0: Math.min(...ecken.map(e => e[0])), y0: Math.min(...ecken.map(e => e[1])), x1: Math.max(...ecken.map(e => e[0])), y1: Math.max(...ecken.map(e => e[1])) };
    };
    const umriss = (el) => {
      if (el.dataset && el.dataset.inhalt) return boxVon(el, el.dataset.inhalt.split(' ').map(Number));
      if (!el.querySelector || !el.querySelector('[data-inhalt]')) return boxVon(el);
      let u = null;
      for (const k of el.children) {
        const r = k.getBBox ? k.getBBox() : null; if (!r || (!r.width && !r.height)) continue;
        const b = umriss(k); u = u ? { x0: Math.min(u.x0, b.x0), y0: Math.min(u.y0, b.y0), x1: Math.max(u.x1, b.x1), y1: Math.max(u.y1, b.y1) } : b;
      }
      return u || boxVon(el);
    };
    const stationen = [...E.stationen.children];
    for (const g of [...stationen, K.wimpel, K.rauch, ...E.ziel.children]) {
      const b = umriss(g), j = stationen.indexOf(g), o = j >= 0 ? ortVon(WEG.teile[j]) : null;
      belegt.push({ x0: b.x0 - RAND, y0: b.y0 - RAND, x1: b.x1 + RAND, y1: b.y1 + RAND, teil: o ? o.t.id : undefined, id: j >= 0 ? 'station' + j : undefined });
    }
    for (const p of E.wege.querySelectorAll('.weg-vorn')) {
      const L = p.getTotalLength();
      for (let s = 0; s <= L; s += 10) { const q = p.getPointAtLength(s); belegt.push({ x0: q.x - 9, y0: q.y - 9, x1: q.x + 9, y1: q.y + 9, weg: true }); }
    }
    const offen = (x, y) => {
      let best = Infinity, s = null;
      WEG.teile.forEach((w, j) => { const [px, py] = P(j), d = Math.hypot(px - x, py - y); if (d < best) { best = d; s = stand[w.id]; } });
      return s === 'meister' || s === 'hier' || s === 'offen';
    };
    const frei = (b, ohne) => { const oh = ohne == null ? [] : [].concat(ohne); return b.x0 >= 8 && b.y0 >= 8 && b.x1 <= lage.w - 8 && b.y1 <= lage.h - 8 &&
      !belegt.some(o => !(o.id != null && oh.includes(o.id)) && b.x0 < o.x1 && b.x1 > o.x0 && b.y0 < o.y1 && b.y1 > o.y0); };
    const ankerVon = (i, am) => {
      if (!am) return P(i);
      const o = E.stationen.children[i] && E.stationen.children[i].querySelector('.ort');
      if (!o) return P(i);
      const b = umriss(o);
      return am === 'oben' ? [(b.x0 + b.x1) / 2, b.y0] : [(b.x0 + b.x1) / 2, (b.y0 + b.y1) / 2];
    };
    return {
      amOrt(el, i, teil, ecken, box) {
        const [x, y] = P(i), [bx0, by0, bx1, by1] = box;
        const kisten = ecken.map(([dx, dy]) => ({ x0: x + dx + bx0, y0: y + dy + by0, x1: x + dx + bx1, y1: y + dy + by1, dx, dy }));
        const drin = (b) => b.x0 >= 2 && b.y0 >= 2 && b.x1 <= lage.w - 2 && b.y1 <= lage.h - 2;
        const trifft = (b, o) => b.x0 < o.x1 && b.x1 > o.x0 && b.y0 < o.y1 && b.y1 > o.y0;
        const stoert = (b, mitRes) => belegt.some(o => !o.weg && (o.ding || o.teil !== teil) && (mitRes || !o.res) && trifft(b, o));
        let b = kisten.find(b => drin(b) && !stoert(b, true)) || kisten.find(b => drin(b) && !stoert(b, false));
        if (!b) {
          for (let r = 40; r <= 160 && !b; r += 10) for (let k = 0; k < 16 && !b; k++) {
            const a = k * Math.PI / 8, dx = Math.round(Math.cos(a) * r - (bx0 + bx1) / 2), dy = Math.round(Math.sin(a) * r - (by0 + by1) / 2);
            const c = { x0: x + dx + bx0, y0: y + dy + by0, x1: x + dx + bx1, y1: y + dy + by1, dx, dy };
            if (drin(c) && !stoert(c, false)) b = c;
          }
        }
        b = b || kisten.find(b => drin(b) && !belegt.some(o => o.ding && trifft(b, o))) || kisten.find(drin) || kisten[0];
        for (let k = belegt.length - 1; k >= 0; k--) if (belegt[k].res && trifft(b, belegt[k])) belegt.splice(k, 1);
        belegt.push({ x0: b.x0 - RAND, y0: b.y0 - RAND, x1: b.x1 + RAND, y1: b.y1 + RAND, ding: true });
        el.setAttribute('transform', `translate(${x + b.dx} ${y + b.dy})`);
        E.dinge.append(el);
      },
      setze(el, i, opt) {
        const [ax, ay] = ankerVon(i, opt.am), [bx0, by0, bx1, by1] = opt.box, bw = bx1 - bx0, bh = by1 - by0;
        const start = ((i * 97 + (opt.lage || 0) * 61) % 360) * Math.PI / 180;
        const nimm = (cx, cy) => {
          const b = { x0: cx - bw / 2, y0: cy - bh / 2, x1: cx + bw / 2, y1: cy + bh / 2 };
          if (!frei(b) || !offen(cx, cy)) return null;
          belegt.push({ x0: b.x0 - RAND, y0: b.y0 - RAND, x1: b.x1 + RAND, y1: b.y1 + RAND, id: opt.id });
          el.setAttribute('transform', `translate(${(b.x0 - bx0).toFixed(1)} ${(b.y0 - by0).toFixed(1)})`);
          E.dinge.append(el);
          return b;
        };
        for (let r = opt.nah[0]; r <= opt.nah[1]; r += 12) {
          const schritte = Math.max(12, Math.round(2 * Math.PI * r / 26));
          const winkel = Array.from({ length: schritte }, (_, k) => start + k * 2 * Math.PI / schritte);
          if (opt.hoch) winkel.sort((a, c) => Math.sin(a) - Math.sin(c));
          for (const a of winkel) { const b = nimm(ax + Math.cos(a) * r, ay + Math.sin(a) * r); if (b) return b; }
        }
        if (opt.nurNah) return null;
        const raster = [];
        for (let x = 30; x < lage.w - 30; x += 16) for (let y = 30; y < lage.h - 30; y += 16) raster.push([x, y, Math.hypot(x - ax, y - ay)]);
        raster.sort((p, q) => p[2] - q[2]);
        for (const [x, y] of raster) { const b = nimm(x, y); if (b) return b; }
        return null;
      },
      amWasser(el, j, box, nr) {
        const st = stationen[j], img = st && st.querySelector('image.ort-farbe');
        if (!img) return null;
        const ib = umriss(img), [bx0, by0, bx1, by1] = box, bw = bx1 - bx0, bh = by1 - by0;
        const unten = [...st.children].filter(k => k !== st.querySelector('.ort')).map(boxVon);
        const stellen = [[.12, .78], [.88, .78], [.02, .62], [.98, .62], [.25, .95], [.75, .95], [-.12, .8], [1.12, .8]];
        const reihe = stellen.slice(nr % 2).concat(stellen.slice(0, nr % 2));
        for (const [fx, fy] of reihe) {
          const cx = ib.x0 + fx * (ib.x1 - ib.x0), cy = ib.y0 + fy * (ib.y1 - ib.y0);
          const b = { x0: cx - bw / 2, y0: cy - bh * .75, x1: cx + bw / 2, y1: cy + bh * .25 };
          if (!frei(b, 'station' + j) || unten.some(o => b.x0 < o.x1 && b.x1 > o.x0 && b.y0 < o.y1 && b.y1 > o.y0)) continue;
          belegt.push({ x0: b.x0 - RAND, y0: b.y0 - RAND, x1: b.x1 + RAND, y1: b.y1 + RAND });
          el.setAttribute('transform', `translate(${(b.x0 - bx0).toFixed(1)} ${(b.y0 - by0).toFixed(1)})`);
          E.dinge.append(el);
          return b;
        }
        return null;
      },
      reserviere(id, b) { belegt.push({ x0: b.x0 - RAND, y0: b.y0 - RAND, x1: b.x1 + RAND, y1: b.y1 + RAND, id, res: true }); },
      freigeben(id) { const k = belegt.findIndex(o => o.res && o.id === id); if (k >= 0) belegt.splice(k, 1); },
      setzeBei(el, cx, cy, box, ohne, id, weit) {
        const [bx0, by0, bx1, by1] = box, bw = bx1 - bx0, bh = by1 - by0;
        const schritte = [[0, 0], [-8, 0], [8, 0], [0, -8], [-12, -6], [12, -6]].concat(weit ? [[-20, 0], [20, 0], [0, -20], [0, 20], [-20, -20], [20, -20], [-20, 20], [20, 20], [-32, 0], [32, 0], [0, -32], [0, 32], [-48, 0], [48, 0], [0, -48], [0, 48]] : []);
        for (const [dx, dy] of schritte) {
          const b = { x0: cx + dx - bw / 2, y0: cy + dy - bh / 2, x1: cx + dx + bw / 2, y1: cy + dy + bh / 2 };
          if (!frei(b, ohne)) continue;
          belegt.push({ x0: b.x0 - RAND, y0: b.y0 - RAND, x1: b.x1 + RAND, y1: b.y1 + RAND, id });
          el.setAttribute('transform', `translate(${(b.x0 - bx0).toFixed(1)} ${(b.y0 - by0).toFixed(1)})`);
          E.dinge.append(el);
          return b;
        }
        return false;
      }
    };
  };
  const baumZeichnen = (gr, k) => {
    const lebt = sv('g', { class: 'lebt baum' }, [
      sv('path', { d: 'M-2.6 0 C-2.2 -8 -2.6 -16 -1.8 -24 H1.8 C2.6 -16 2.2 -8 2.6 0 Z', class: 'baum-stamm' }),
      sv('path', { d: 'M-21 -31 C-26 -43 -15 -56 -2 -54 C9 -58 23 -49 21 -36 C24 -26 12 -19 0 -22 C-10 -18 -24 -22 -21 -31 Z', class: 'baum-krone' }),
      sv('path', { d: 'M-12 -42 C-9 -48 -3 -50 3 -49', class: 'baum-licht' })]);
    lebt.style.setProperty('--d', (-((k * 1.3) % 7)).toFixed(1) + 's');
    lebt.style.setProperty('--t', (7 + k % 4) + 's');
    return sv('g', { class: 'baum-ding' }, [sv('ellipse', { cx: 0, cy: 0, rx: 15 * gr, ry: 3.6 * gr, class: 'baum-schatten' }), sv('g', { transform: `scale(${gr})` }, [lebt])]);
  };
  const bildImWeg = (schl, gr) => {
    const roh = (window.LB_BILDDATEN || {})[schl];
    if (roh && roh.farbe) { const i = sv('image', { width: gr, height: gr }); i.setAttribute('href', roh.farbe); return i; }
    const p = sv('svg', { viewBox: '0 0 100 100', width: gr, height: gr, class: 'bild platzhalter-bild' });
    p.innerHTML = (window.LB_PLATZHALTER || {})[schl] || '';
    return p;
  };
  async function wegLichtung(K, i, stand) {
    const still = ruhig(), warte = (ms) => new Promise(r => setTimeout(r, still ? 0 : ms));
    const g = K.E.stationen.children[i];
    [...g.querySelector('.weglein').children].forEach((p, k) => setTimeout(() => p.classList.add('gold'), still ? 0 : k * 110));
    await warte(750);
    g.classList.remove('hier', 'offen'); g.classList.add('meister'); K.E.inseln.children[i].style.fillOpacity = .3;
    await warte(900);
    const zeichneStueck = (p) => { const L = p.getTotalLength(); p.style.opacity = 1; return still ? Promise.resolve() : fertigVon(p.animate([{ strokeDasharray: `${L} ${L}`, strokeDashoffset: L }, { strokeDasharray: `${L} ${L}`, strokeDashoffset: 0 }], { duration: 1100, easing: KURVE }), 1100); };
    const stuecke = K.E.wege.querySelectorAll('.weg-gegangen');
    const hinein = stuecke[i - 1];
    if (hinein && hinein.style.opacity !== '1') await zeichneStueck(hinein);
    const weiterOrt = WEG.teile[i + 1] && ortVon(WEG.teile[i + 1]);
    const w = weiterOrt ? stuecke[i] : null;
    if (w) {
      const L = w.getTotalLength();
      await zeichneStueck(w);
      if (!still) {
        const pts = [0, .25, .5, .75, 1].map(f => w.getPointAtLength(L * f));
        figurSchritte(K, 1000, pts[pts.length - 1].x - pts[0].x);
        await fertigVon(K.wimpel.animate(pts.map(q => ({ transform: `translate(${q.x + 24 * K.lage.gross}px, ${q.y - 22}px)` })), { duration: 1000, easing: KURVE }), 1000);
      }
    }
    const lzJetzt = lesezeichen(), oAlt = ortVon(WEG.teile[i]), oNeu = WEG.teile[i + 1] && ortVon(WEG.teile[i + 1]);
    if (oNeu && oNeu.lv.length && (!lzJetzt || (oAlt && lzJetzt.teil === oAlt.t.id && oAlt.ids.includes(lzJetzt.level))))
      setzeLesezeichen(oNeu.t, oNeu.lv[0], (oNeu.lv[0].blaetter || oNeu.t.blaetter)[0][0]);
    const naechste = weiterOrt && K.E.nebel.children[i + 1];
    if (naechste && !still) [...naechste.children].forEach((f, k) => f.animate([{ transform: 'translate(0px,0px) scale(1)', opacity: 1 }, { transform: `translate(${(k % 2 ? 1 : -1) * 60}px, ${-20 - k * 6}px) scale(1.4)`, opacity: 0 }], { duration: 1600, easing: KURVE, fill: 'forwards' }));
    K.stand = Object.assign({}, stand);
    wegMalen(K);
    dingeAuftritt(K, i);
    if (WEG.teile[i] && WEG.teile[i].ziel) finale(K);
  }
  function dingeAuftritt(K, i) {
    const o = WEG.teile[i] && ortVon(WEG.teile[i]), st = K.E.stationen.children[i];
    if (!o || !st || ruhig() || !document.body.animate) return;
    const rs = st.getBoundingClientRect();
    const rang = (d) => d.classList.contains('truhe-ding') ? 0 : d.classList.contains('staffelei-ding') ? 1 : 2;
    [...K.E.dinge.querySelectorAll('.truhe-ding, .staffelei-ding, .buch-ding')].filter(d => d.dataset.teil === o.t.id)
      .sort((a, b) => rang(a) - rang(b))
      .forEach((d, k) => {
        const koerper = d.querySelector('.ding-koerper'), ring = d.querySelector('.ding-ring'), rd = d.getBoundingClientRect(), s = rd.width / 42 || 1, verz = k * 280;
        const dx = (rs.x + rs.width / 2 - (rd.x + rd.width / 2)) / s, dy = (rs.y + rs.height * .6 - (rd.y + rd.height)) / s;
        if (rang(d) === 2) return buchAuftritt(d, koerper, ring, dx, dy, Math.max(900, verz));
        if (koerper) koerper.animate([{ transform: `translate(${dx}px, ${dy}px) scale(.3)`, opacity: 0 }, { offset: .18, opacity: 1 },
          { offset: .7, transform: 'translate(0px, -12px) scale(1.06)' }, { offset: .86, transform: 'translate(0px, 0px) scale(1.04, .96)' }, { transform: 'none', opacity: 1 }],
        { duration: 1150, delay: verz, easing: 'cubic-bezier(.3,.7,.3,1)', fill: 'backwards' });
        if (ring) ring.animate([{ transform: 'scale(.2)', opacity: 0 }, { transform: 'scale(1)', opacity: 1 }], { duration: 600, delay: verz + 900, easing: 'ease-out', fill: 'backwards' });
      });
  }
  function buchAuftritt(d, koerper, ring, dx, dy, verz) {
    if (!koerper) return;
    const T = 1900, bildEl = koerper.querySelector('.ding-bild'), zu = bildEl && bildEl.querySelector('image'), roh = (window.LB_BILDDATEN || {})['ding-buch-offen'];
    koerper.animate([{ transform: `translate(${dx}px, ${dy}px) scale(.3)`, opacity: 0 }, { offset: .12, opacity: 1 },
      { offset: .35, transform: `translate(${dx * .4}px, ${dy * .4 - 40}px) scale(1.25) rotate(-6deg)` },
      { offset: .5, transform: `translate(${dx * .25}px, ${dy * .25 - 44}px) scale(1.3) rotate(5deg)` },
      { offset: .62, transform: `translate(${dx * .15}px, ${dy * .15 - 40}px) scale(1.25) rotate(-4deg)` },
      { offset: .85, transform: 'translate(0px, -6px) scale(1.04)' }, { offset: .93, transform: 'translate(0px, 0px) scale(1.05, .95)' }, { transform: 'none', opacity: 1 }],
    { duration: T, delay: verz, easing: 'ease-in-out', fill: 'backwards' });
    if (zu && roh && roh.farbe) {
      const offen = sv('image', { href: roh.farbe, x: 0, y: 0, width: 64, height: 64 }); offen.style.opacity = 0; bildEl.append(offen);
      const auf = [{ opacity: 0 }, { offset: .3, opacity: 0 }, { offset: .36, opacity: 1 }, { offset: .66, opacity: 1 }, { offset: .72, opacity: 0 }, { opacity: 0 }];
      const a = offen.animate(auf, { duration: T, delay: verz });
      zu.animate(auf.map(f => Object.assign({}, f, { opacity: 1 - f.opacity })), { duration: T, delay: verz });
      a.onfinish = () => offen.remove();
    }
    for (let k = 0; k < 5; k++) {
      const c = sv('circle', { cx: 8 + k * 6, cy: 18 + (k % 2) * 6, r: 1.9, fill: '#e8b84a', class: 'buch-funke' }); d.append(c);
      c.animate([{ transform: 'translate(0px, 0px)', opacity: 0 }, { offset: .2, opacity: 1 }, { transform: `translate(${(k - 2) * 7}px, ${-24 - (k % 3) * 8}px)`, opacity: 0 }],
        { duration: 1100, delay: verz + T * .4 + k * 90, easing: 'ease-out', fill: 'both' }).onfinish = () => c.remove();
    }
    if (ring) ring.animate([{ transform: 'scale(.2)', opacity: 0 }, { transform: 'scale(1.3)', opacity: 1, offset: .7 }, { transform: 'scale(1)', opacity: 1 }], { duration: 700, delay: verz + T * .88, easing: 'ease-out', fill: 'backwards' });
  }
  function finale(K) {
    K.svg.classList.add('leuchtet');
    if (main.querySelector('.finale')) return;
    figurFinale(K);
    const f = el('div', 'finale');
    const bilder = el('div', 'finale-bilder'); bilder.append(bild('lama', 'finale-bild'), bild('schaf', 'finale-bild'));
    const s = el('div', 'finale-satz'); s.append(satz('Du kannst le-sen!'));
    const ok = knopf('gelesen', [sym('stern'), el('span', null, 'weiter')], () => geht(f, 10).then(() => f.remove()), 'weiter');
    f.append(bilder, s, ok);
    main.append(f);
    kommt(f, 0, 18, 700);
  }

  const bossTor = (teil, w) => {
    const hinter = sv('g', { class: 'tor-hinter' });
    const ding = (art, tf) => { const d = WEG.dingBild(art, 64), g = sv('g', { transform: tf }); g.append(...d.childNodes); hinter.append(g); };
    if (teil.schatz) ding('truhe', 'translate(-92 -4) scale(.95)');
    if (bildPool(teil).length) ding('staffelei', 'translate(26 -26) scale(.95)');
    const zeichen = sym('boss'); zeichen.setAttribute('x', -14); zeichen.setAttribute('y', -70); zeichen.setAttribute('width', 28); zeichen.setAttribute('height', 28);
    const tor = sv('svg', { class: 'tor', viewBox: '-100 -74 200 128', 'aria-hidden': 'true' }, [
      sv('ellipse', { cx: 0, cy: 48, rx: 66, ry: 7, class: 'tor-boden' }), hinter,
      sv('path', { d: 'M-36 48 V-4 A36 36 0 0 1 36 -4 V48 Z', class: 'tor-bogen' }),
      sv('path', { d: 'M-24 48 V0 A24 24 0 0 1 24 0 V48 Z', class: 'tor-innen' }),
      sv('path', { d: 'M-24 48 V0 A24 24 0 0 1 0 -24 V48 Z', class: 'tor-fluegel links' }),
      sv('path', { d: 'M0 -24 A24 24 0 0 1 24 0 V48 H0 Z', class: 'tor-fluegel rechts' }),
      zeichen]);
    const laut = el('span', 'tor-laut');
    const z = w && w.zeichen && w.zeichen[0] ? w.zeichen[0] : String(teil.zeichen || '').split(' ')[0];
    if (z && teil.art !== 'ziel') { laut.append(faerbe(z)); if (z.replace(/\s/g, '').length > 1) laut.classList.add('lang'); }
    let offen = false;
    const k = knopf('boss-feld boss-tor', [el('span', 'tor-licht'), tor, laut], () => {
      if (offen) return; offen = true;
      if (ruhig() || k.classList.contains('gold')) { bossRaum(teil); return; }
      k.classList.add('oeffnet');
      setTimeout(() => bossRaum(teil), 420);
    }, 'Boss');
    return k;
  };
  function einzeilig(kopf, g) {
    const pass = () => {
      if (!g.isConnected) { if (ro) ro.disconnect(); return; }
      g.style.fontSize = '';
      const cs = getComputedStyle(kopf), bild = kopf.querySelector('.ort-bild'), reihe = cs.flexDirection.startsWith('row');
      const mr = main.getBoundingClientRect(), rahmen = Math.min(mr.right, innerWidth) - Math.max(mr.left, 0) - 56;
      const platz = rahmen - (reihe && bild ? bild.getBoundingClientRect().width + (parseFloat(cs.columnGap) || 0) : 0);
      const w = g.scrollWidth;
      if (platz > 0 && w > platz) g.style.fontSize = (parseFloat(getComputedStyle(g).fontSize) * platz / w * .96).toFixed(1) + 'px';
      for (let k = 0; k < 8; k++) {
        const r = g.getBoundingClientRect(), kr = kopf.getBoundingClientRect();
        if (r.right <= innerWidth - 12 && kr.left >= Math.max(0, mr.left) + 4) break;
        g.style.fontSize = (parseFloat(getComputedStyle(g).fontSize) * .95).toFixed(1) + 'px';
      }
    };
    const ro = window.ResizeObserver ? new ResizeObserver(() => pass()) : null;
    if (ro) ro.observe(kopf);
    requestAnimationFrame(pass);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(pass);
  }
  function titel(teil, opt = {}) {
    leer();
    document.body.classList.add('ohne-unten', 'am-ort');
    const o = (opt.ort && ortVon(wegTeil(opt.ort))) || ortZu(teil, opt.neu || (teil.level[0] && teil.level[0].id));
    const w = o && o.w;
    const box = el('div', 'titel-schwelle ort-ansicht');
    const kopf = el('div', 'ort-kopf');
    if (w) kopf.append(WEG.ortBild(w.ort, 'gross' + (ortMeister(o) ? ' meister' : ''), w.voegel));
    const g = el('div', 'gross' + (teil.art === 'prolog' ? ' prolog' : '') + (teil.art === 'ziel' ? ' ziel-titel' : ''));
    g.append(teil.art === 'ziel' ? satz('Der Leucht-turm') : faerbe(w && w.teil ? w.zeichen.join('') : teil.zeichen));
    g.dataset.ort = w ? w.id : teil.id; g.dataset.haupt = '';
    kopf.append(g);
    einzeilig(kopf, g);
    const steine = el('div', 'weg trittsteine');
    const ids = o ? o.ids : [...teil.level.map(l => l.id), 'boss'];
    const offen = ids.find(id => !licht[teil.id][id]);
    const feld = (f, id) => {
      const gold = licht[teil.id][id] && id !== opt.neu;
      f.classList.toggle('gold', !!gold);
      if (id === offen) { if (opt.neu) setTimeout(() => f.classList.add('jetzt'), ruhig() ? 0 : 1500); else f.classList.add('jetzt'); }
      if (id === opt.neu) setTimeout(() => f.classList.add('gold'), ruhig() ? 0 : 900);
      f.dataset.ort = teil.id + '|' + id;
      return f;
    };
    (o ? o.lv : teil.level).forEach((lv) => {
      const z = teil.level.indexOf(lv);
      const f = knopf('feld trittstein', [], () => VERSUCH.zoom ? kameraHinein(f, box, box, 2.4, 520).then((ja) => { if (ja && f.isConnected) level(teil, lv, 'ueben'); }) : level(teil, lv, 'ueben'), probeVon(teil, z).join(' '));
      for (const p of probeVon(teil, z)) f.append(el('span', null, faerbe(p)));
      if (liegtHier(teil, lv)) f.append(sym('band', 'feld-band'));
      steine.append(feld(f, lv.id));
    });
    if (ids.includes('boss')) steine.append(feld(bossTor(teil, w), 'boss'));
    const bonus = el('div', 'bonus-reihe');
    if (ids.includes('boss') && licht[teil.id].boss) {
      if (teil.schatz) { const tr = knopf('bonus-ding truhe-knopf ' + (licht[teil.id].schatz ? 'gold' : 'jetzt'), WEG.dingBild('truhe', 84), () => schatz(teil), 'Schatz'); tr.dataset.ort = 'schatz'; bonus.append(tr); }
      if (bildPool(teil).length) { const bk = knopf('bonus-ding bonus-bilder ' + (licht[teil.id].bilder ? 'gold' : licht[teil.id].bilderOffen ? '' : 'jetzt'), WEG.dingBild('staffelei', 84), () => bilderRaum(teil), 'Bilder'); bk.dataset.ort = teil.id + '|bilder'; bonus.append(bk); }
    }
    if (bonus.childElementCount) { box.append(kopf, steine, bonus); main.append(box); return; }
    box.append(kopf, steine);
    main.append(box);
  }

  const raumHuelle = (reiter, art, ort) => {
    const h = el('div', 'raum-huelle');
    const r = el('div', 'reiterleiste'); for (const x of reiter) r.append(x);
    const raum = el('div', 'raum ' + art);
    if (ort) { raum.dataset.ort = ort; raum.dataset.haupt = ''; }
    h.append(r, raum);
    main.append(h);
    return raum;
  };

  function level(teil, lv, modus, blatt) {
    leer();
    kopfLeiste(teil, lv.id, lv);
    const ueb = knopf('reiter-tuer ueben-tuer', mitSymbol('haus', 'Üben'), () => level(teil, lv, 'ueben'), 'Üben');
    const zei = knopf('reiter-tuer zeigen-tuer', mitSymbol('raute', 'Zeigen'), () => level(teil, lv, 'zeigen'), 'Zeigen');
    ueb.setAttribute('aria-pressed', String(modus === 'ueben'));
    ueb.append(sym('stein', 'tuer-stein' + (stolper(teil, lv).length ? '' : ' aus')));
    zei.setAttribute('aria-pressed', String(modus === 'zeigen'));
    document.body.classList.add(modus === 'ueben' ? 'im-ueben' : 'im-zeigen');
    const raum = raumHuelle([ueb, zei], modus === 'ueben' ? 'raum-ueben' : 'raum-zeigen', teil.id + '|' + lv.id);
    if (modus === 'ueben') ueben(teil, lv, raum, blatt); else lauf(teil, lv, raum, false);
  }

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

  const HINWEIS_KEY = 'lautbuch.hinweis.gesehen.v1';
  function hinweisKarte(lv, opt = {}) {
    const gesehen = lies(HINWEIS_KEY, []) || [];
    const id = Object.keys(TEILE).find(t => TEILE[t].level.includes(lv) || TEILE[t].boss === lv) + '|' + lv.id;
    const offen = main.querySelector('.hinweis-karte');
    if (opt.immer && offen) { geht(offen, 10).then(() => offen.remove()); return; }
    if (offen) return;
    if (gesehen.includes(id) && !opt.immer) return;
    const k = el('div', 'hinweis-karte');
    k.setAttribute('role', 'note'); k.dataset.hid = id;
    k.append(sym('haus'), el('span', null, lv.hinweis), knopf('ikon schliessen', '×', () => {
      schreib(HINWEIS_KEY, [...gesehen, id]); geht(k, 10).then(() => k.remove());
    }, 'Hinweis schließen'));
    main.append(k);
    kommt(k, opt.immer ? 0 : 500, opt.immer ? 8 : 12, opt.immer ? 220 : 420);
  }
  const hinweisZu = () => {
    const k = main.querySelector('.hinweis-karte'); if (!k) return;
    const g = lies(HINWEIS_KEY, []) || [];
    if (k.dataset.hid && !g.includes(k.dataset.hid)) schreib(HINWEIS_KEY, [...g, k.dataset.hid]);
    geht(k, 10).then(() => k.remove());
  };


  const SCHWELLE_WISCHEN = 60;
  const WISCHEN_STEIL = 1.5;
  function karteikarte(buehne, quelle, opt = {}) {
    const folgeVon = (liste) => { let i = 0; return () => liste[i++ % liste.length]; };
    let naechste = (opt.folge ? folgeVon : ziehung)(quelle.schluessel());
    const verlauf = [];
    let pos = -1, aktuell = null;
    const flaeche = el('div', 'karteikarte-buehne');
    const nav = el('div', 'karte-nav');
    const knZurueck = knopf('karte-nav-knopf', mitSymbol('zurueck', 'zurück'), () => { if (knZurueck.getAttribute('aria-disabled') !== 'true') zurueck(); }, 'vorige Karte');
    const knVor = knopf('karte-nav-knopf', mitSymbol('vor', 'vor'), () => vor(), 'nächste Karte');
    nav.append(knZurueck, knVor);
    const navRuhe = () => { const aus = pos <= 0; knZurueck.setAttribute('aria-disabled', String(aus)); knZurueck.classList.toggle('licht-ruht', aus); };
    buehne.replaceChildren(flaeche, nav);
    const zeige = (schl, richtung) => {
      const neu = el('div', 'karteikarte');
      const f = quelle.form(schl);
      neu.append(f.knoten);
      neu.classList.toggle('lang', f.lang);
      const alt = aktuell;
      aktuell = neu;
      navRuhe();
      if (opt.amZeigen) opt.amZeigen(schl, neu);
      flaeche.querySelectorAll('.karteikarte').forEach(k => { if (k !== alt) k.remove(); });
      if (!alt) { flaeche.append(neu); return; }
      alt.getAnimations?.().forEach(a => a.cancel());
      if (ruhig() || !alt.animate) { alt.replaceWith(neu); return; }
      flaeche.append(neu);
      const d = 350, kurve = 'cubic-bezier(.4,0,.2,1)', s = richtung < 0 ? -1 : 1;
      alt.animate([{ transform: 'translateX(0)', opacity: 1 }, { transform: `translateX(${-45 * s}%)`, opacity: 0 }], { duration: d, easing: kurve, fill: 'forwards' });
      neu.animate([{ transform: `translateX(${45 * s}%)`, opacity: 0 }, { transform: 'translateX(0)', opacity: 1 }], { duration: d, easing: kurve });
      setTimeout(() => alt.remove(), d + 60);
    };
    const vor = () => {
      if (pos < verlauf.length - 1) { pos++; zeige(verlauf[pos], 1); return; }
      if (opt.hoechstens && verlauf.length >= opt.hoechstens) { if (opt.amEnde) opt.amEnde(); return; }
      const schl = naechste(); verlauf.push(schl); pos = verlauf.length - 1; zeige(schl, 1);
    };
    const zurueck = () => { if (pos > 0) { pos--; zeige(verlauf[pos], -1); } };
    let x0 = null, y0 = null, langT = null, langFertig = false;
    const langWeg = () => { clearTimeout(langT); langT = null; if (aktuell) aktuell.classList.remove('drueckt'); };
    flaeche.addEventListener('pointerdown', (e) => {
      x0 = e.clientX; y0 = e.clientY; langFertig = false; langWeg();
      if (!opt.lang) return;
      if (aktuell) aktuell.classList.add('drueckt');
      langT = setTimeout(() => { langT = null; langFertig = true; if (aktuell) aktuell.classList.remove('drueckt'); opt.lang(); }, 600);
    });
    flaeche.addEventListener('pointermove', (e) => { if (langT && x0 != null && Math.abs(e.clientX - x0) > 12) langWeg(); });
    ['pointerleave', 'pointercancel'].forEach(ev => flaeche.addEventListener(ev, langWeg));
    if (opt.lang) flaeche.addEventListener('contextmenu', (e) => e.preventDefault());
    flaeche.addEventListener('pointerup', (e) => { langWeg(); if (langFertig) { langFertig = false; x0 = y0 = null; e.stopImmediatePropagation(); } });
    flaeche.addEventListener('pointerup', tipp((e) => {
      const dx = x0 == null ? 0 : e.clientX - x0, dy = y0 == null ? 0 : e.clientY - y0; x0 = y0 = null;
      if (Math.abs(dx) < SCHWELLE_WISCHEN || Math.abs(dx) < WISCHEN_STEIL * Math.abs(dy)) return;
      if (dx < 0) vor(); else zurueck();
    }));
    vor();
    return {
      weiter: vor, zurueck,
      schl: () => verlauf[pos], karte: () => aktuell,
      neu: () => { naechste = (opt.folge ? folgeVon : ziehung)(quelle.schluessel()); verlauf.length = 0; pos = -1; aktuell = null; flaeche.replaceChildren(); vor(); }
    };
  }

  function ueben(teil, lv, raum, startBlatt) {
    const steine = stolper(teil, lv);
    const blaetter = (lv.blaetter || teil.blaetter).concat([['stolper', 'Stolpersteine']]);
    let bildModus = 'zuordnen';
    let art = blaetter.some(b => b[0] === startBlatt) ? startBlatt : blaetter[0][0];
    let lochModus = false, auswahl = 'alles', kk = null, steinUmfang = 'lektion';
    let stempelAuf = false; const gestempelt = new Set();
    let steinStempel = false;
    const wahl = el('div', 'blattwahl');
    const wahlKnoepfe = blaetter.map(([k, name]) => {
      const b = knopf('reiter' + (k === 'stolper' ? ' stolper-reiter' : ''), k === 'stolper' ? [sym('stein'), el('span', 'reiter-wort', name)] : name,
        () => { art = k; auswahl = lochModus ? startAuswahl() : 'alles'; stempelAuf = false; steinStempel = false; gestempelt.clear(); zeichne(); }, k === 'stolper' ? name : undefined);
      wahl.append(b);
      return [k, b];
    });
    const buehne = el('div', 'tafel-rahmen');
    raum.append(wahl, buehne);

    const daten = () => art === 'stolper' ? reihenAus(steine, 4) : lv[art];
    const reihenAus = (liste, n) => { const r = []; for (let i = 0; i < liste.length; i += n) r.push(liste.slice(i, i + n)); return r; };
    const istWortArt = (a) => a === 'ketten' || a === 'woerter' || (a === 'stolper' && teil.art !== 'prolog');
    const zelleInhalt = (text) => {
      if (teil.festerFall) return faerbe(text);
      const f = inForm(text, art === 'stolper' ? 'woerter' : art, false);
      return istWortArt(art) ? wort(f) : faerbe(f);
    };
    const lesefinger = (zelle) => {
      const bogen = [...zelle.querySelectorAll('.silbe')];
      if (!bogen.length) return;
      bogen.forEach(b => b.classList.remove('finger'));
      bogen.forEach((b, i) => setTimeout(() => {
        bogen.forEach(x => x.classList.remove('finger'));
        b.classList.add('finger');
        if (i === bogen.length - 1) setTimeout(() => b.classList.remove('finger'), 600);
      }, i * (ruhig() ? 0 : 520)));
    };
    const tafelZeichnen = () => {
      if (art === 'stolper' && !steine.length) {
        buehne.classList.remove('mit-stempel');
        const leer = el('div', 'stolper-leer'), wie = el('p');
        wie.append('Ein Feld antippen, dann ', el('span', 'stein-zeichen', mitSymbol('stein', 'Stolperstein')), '. Oder das Feld lange drücken.');
        leer.append(el('p', 'stolper-leer-kopf', 'Hier sammeln sich die Stolpersteine.'), wie);
        zeig = null;
        buehne.replaceChildren(leer);
        return;
      }
      const d = daten();
      const lz = lesezeichen();
      const hier = (ri) => !!lz && lz.teil === teil.id && lz.level === lv.id && lz.blatt === art && lz.reihe === ri;
      const lang = d.flat().some(s => s.replace(/-/g, '').length > 2);
      const tafel = el('div', 'tafel ' + art + (!istWortArt(art) && lang ? ' eng' : '') + (teil.art === 'prolog' && art !== 'stolper' ? ' buchstaben' : ''));
      d.forEach((r, ri) => {
        const schl = markSchl(teil, lv, art, ri);
        const zeile = el('div', 'reihen-zeile' + (hier(ri) ? ' lesezeichen' : '') + (marken(teil)[schl] ? ' gelernt' : ''));
        let band;
        if (art === 'stolper') band = el('span', 'band-platz');
        else {
          band = knopf('band-knopf', sym('band'), () => {
            tafel.querySelectorAll('.reihen-zeile.lesezeichen').forEach(z => { z.classList.remove('lesezeichen'); z.querySelector('.band-knopf').setAttribute('aria-pressed', 'false'); });
            zeile.classList.add('lesezeichen'); band.setAttribute('aria-pressed', 'true');
            setzeLesezeichen(teil, lv, art, ri);
          }, 'Lesezeichen hierher');
          band.setAttribute('aria-pressed', String(hier(ri)));
        }
        let haken;
        if (art === 'stolper') haken = el('span', 'band-platz');
        else {
          haken = knopf('haken-knopf', sym('haken'), () => {
            const m = marken(teil);
            if (m[schl]) delete m[schl]; else m[schl] = true;
            zeile.classList.toggle('gelernt', !!m[schl]);
            haken.setAttribute('aria-pressed', String(!!m[schl]));
            speichern(teil.id);
          }, 'Zeile gelernt');
          haken.setAttribute('aria-pressed', String(!!marken(teil)[schl]));
        }
        const reihe = el('div', 'reihe');
        for (const s of r) {
          const z = el('div', 'zelle' + (steine.includes(s) ? ' stein' : ''));
          z.append(zelleInhalt(s));
          langDruck(z, () => steinUmschalten(s, z));
          z.dataset.s = s;
          if (art === 'stolper') { const a = el('span', 'abdruck'); a.setAttribute('aria-hidden', 'true'); a.append(sym('haken')); z.append(a); }
          z.addEventListener('click', (e) => {
            e.stopPropagation();
            if (art === 'stolper' && stempelAuf) { if (gestempelt.has(s)) gestempelt.delete(s); else gestempelt.add(s); stempelZeigen(); return; }
            if (steinStempel && art !== 'stolper') { steinUmschalten(s, z); return; }
            zeige(z === zeig ? null : z); if (zeig && istWortArt(art)) lesefinger(zeig);
          });
          reihe.append(z);
        }
        zeile.append(band, reihe, haken);
        tafel.append(zeile);
      });
      zeig = null;
      buehne.classList.toggle('mit-stempel', art === 'stolper');
      buehne.replaceChildren(...(art === 'stolper' ? [stempelLeiste] : []), tafel);
      einpassen(tafel);
    };
    const steinUmschalten = (s, z) => {
      const k = steine.indexOf(s);
      if (k >= 0) steine.splice(k, 1); else steine.push(s);
      speichern(teil.id); tuerStein();
      if (art === 'stolper') { gestempelt.delete(s); steinWeg([s]); return; }
      z.classList.toggle('stein', k < 0);
      steinKnopfZeigen();
    };
    const tuerStein = () => { const t = raum.parentElement && raum.parentElement.querySelector('.ueben-tuer .tuer-stein'); if (t) t.classList.toggle('aus', !steine.length); };
    const steinWeg = (weg) => {
      zeig = null;
      const tafel = buehne.querySelector('.tafel');
      const zellen = tafel ? [...tafel.querySelectorAll('.zelle')] : [];
      const vorher = new Map(zellen.map(z => [z.dataset.s, z.getBoundingClientRect()]));
      const gehend = zellen.filter(z => weg.includes(z.dataset.s));
      Promise.all(gehend.map(z => fertigVon(anim(z, [{ opacity: 1, transform: 'scale(1)' }, { opacity: 0, transform: 'scale(.6)' }], { duration: ruhig() ? 1 : 260, fill: 'forwards' }), 260))).then(() => {
        if (!buehne.isConnected || art !== 'stolper' || lochModus) return;
        tafelZeichnen(); stempelZeigen(); steinKnopfZeigen();
        ruhe(lochKnopf, !steine.length);
        const t2 = buehne.querySelector('.tafel');
        if (!t2) { for (const c of buehne.children) kommt(c, 0, 8); return; }
        if (ruhig()) return;
        const f = parseFloat(t2.style.scale) || 1;
        for (const z of t2.querySelectorAll('.zelle')) {
          const a = vorher.get(z.dataset.s), b = z.getBoundingClientRect(); if (!a || !b.width) continue;
          const dx = (a.left - b.left) / f, dy = (a.top - b.top) / f, sx = a.width / b.width;
          if (Math.abs(dx) < 1 && Math.abs(dy) < 1 && Math.abs(sx - 1) < .01) continue;
          anim(z, [{ transformOrigin: '0 0', transform: `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px) scale(${sx.toFixed(3)})` }, { transformOrigin: '0 0', transform: 'none' }], { duration: 340 });
        }
      });
    };
    const kissen = knopf('stempel-kissen', mitSymbol('haken', 'kann ich'), () => { stempelAuf = !stempelAuf; stempelZeigen(); }, 'Stempel kann ich');
    const alleK = knopf('stempel-alle', 'alle', () => {
      const alle = gestempelt.size < steine.length;
      gestempelt.clear(); if (alle) steine.forEach(s => gestempelt.add(s));
      stempelAuf = true; stempelZeigen();
    }, 'alle stempeln');
    const rausK = knopf('stempel-raus', mitSymbol('stein', 'herausnehmen'), () => {
      if (!gestempelt.size) return;
      const weg = steine.filter(s => gestempelt.has(s));
      for (const s of weg) steine.splice(steine.indexOf(s), 1);
      gestempelt.clear(); stempelAuf = false;
      speichern(teil.id); tuerStein();
      stempelZeigen(); steinWeg(weg);
    }, 'gestempelte Steine herausnehmen');
    const stempelLeiste = el('div', 'stempel-leiste');
    stempelLeiste.setAttribute('role', 'group'); stempelLeiste.setAttribute('aria-label', 'Stempel');
    stempelLeiste.append(kissen, alleK, rausK);
    const stempelZeigen = () => {
      kissen.setAttribute('aria-pressed', String(stempelAuf));
      alleK.setAttribute('aria-pressed', String(!!steine.length && gestempelt.size === steine.length));
      ruhe(rausK, !gestempelt.size);
      const tafel = buehne.querySelector('.tafel');
      if (tafel) { tafel.classList.toggle('stempelt', stempelAuf || steinStempel); tafel.querySelectorAll('.zelle').forEach(z => z.classList.toggle('gestempelt', gestempelt.has(z.dataset.s))); }
    };
    let zeig = null;
    const zeige = (ziel) => {
      const tafel = buehne.querySelector('.tafel');
      if (!tafel) return;
      const zellen = [...tafel.querySelectorAll('.zelle')];
      let z = ziel;
      if (typeof ziel === 'number') { const k = zellen.indexOf(zeig) + ziel; z = zellen[Math.max(0, Math.min(zellen.length - 1, k))]; }
      tafel.querySelectorAll('.zeig, .zeig-reihe').forEach(x => x.classList.remove('zeig', 'zeig-reihe'));
      zeig = z || null;
      tafel.classList.toggle('mit-zeig', !!zeig);
      if (zeig) { zeig.classList.add('zeig'); zeig.closest('.reihen-zeile').classList.add('zeig-reihe'); }
      steinKnopfZeigen();
    };
    buehne.addEventListener('click', () => { if (!lochModus) zeige(null); });

    const gehakt = (ri) => !!marken(teil)[markSchl(teil, lv, art, ri)];
    const keineOffenen = () => lv[art].every((r, ri) => gehakt(ri));
    const keineGehakten = () => !lv[art].some((r, ri) => gehakt(ri));
    const startAuswahl = () => Array.isArray(lv[art]) && !mischLoch() && !keineGehakten() && !keineOffenen() ? 'gehakt' : 'alles';
    const mischLoch = () => lochModus && einst.schreibung === 'gemischt' && !teil.festerFall && art !== 'stolper';
    const steinListen = () => teil.level.map(l => (licht[teil.id].stolper || {})[l.id] || []);
    const alleSteine = () => [...new Set(steinListen().flat())];
    const steinPool = () => steinUmfang === 'alle' ? alleSteine() : steine.slice();
    const quelle = () => ({
      schluessel: () => {
        let roh;
        if (art === 'stolper') roh = steinPool();
        else if (mischLoch()) roh = lv[art].flat();
        else if (auswahl === 'gehakt') roh = lv[art].filter((r, ri) => gehakt(ri)).flat();
        else if (auswahl === 'offen') roh = lv[art].filter((r, ri) => !gehakt(ri)).flat();
        else roh = lv[art].flat();
        if (!roh.length) roh = lv[art === 'stolper' ? blaetter[0][0] : art].flat();
        return teil.festerFall ? [...new Set(roh.map(s => s.toLowerCase()))] : [...new Set(roh)];
      },
      form: (text) => {
        const a = art === 'stolper' ? (teil.art === 'prolog' ? 'buchstaben' : 'woerter') : art;
        const f = inForm(text, a, true);
        return { knoten: istWortArt(a) ? wort(f) : faerbe(f), lang: f.replace(/-/g, '').length > 4 };
      }
    });
    const auswahlLeiste = el('div', 'auswahl-platz');
    const auswahlZeichnen = () => tausche(auswahlLeiste, auswahlBauen, { ruhend: true, verzug: 260, gehen: lochModus ? undefined : 120 });
    const auswahlBauen = () => {
      auswahlLeiste.replaceChildren();
      if (art === 'bilder') {
        if (tippenFrei(teil)) auswahlLeiste.append(gruppe('Aufgabe', [['zuordnen', 'zuordnen'], ['tippen', 'abtippen']], bildModus, (w) => { bildModus = w; zeichne(); }));
        return;
      }
      if (!lochModus) return;
      const umfangGruppe = () => {
        if (!steine.length) steinUmfang = 'alle';
        return gruppe('Stolpersteine', [
          ['lektion', 'diese Lektion', () => !steine.length],
          ['alle', 'alle Lektionen']
        ], steinUmfang, (w) => { steinUmfang = w; kk && kk.neu(); });
      };
      if (art === 'stolper') { if (alleSteine().length) auswahlLeiste.append(umfangGruppe()); return; }
      if (mischLoch()) {
        auswahl = 'alles';
        const g = el('div', 'schreibung'), schl = mischSchl(lv, art);
        const h = knopf('schreib-wahl', mitSymbol('haken', 'gelernt'), () => {
          const m = marken(teil);
          if (m[schl]) delete m[schl]; else m[schl] = true;
          h.setAttribute('aria-pressed', String(!!m[schl]));
          speichern(teil.id);
        }, 'Blatt gemischt gelernt');
        h.setAttribute('aria-pressed', String(!!marken(teil)[schl]));
        g.append(h); auswahlLeiste.append(g);
        return;
      }
      if (auswahl === 'offen' && keineOffenen()) auswahl = 'alles';
      if (auswahl === 'gehakt' && keineGehakten()) auswahl = 'alles';
      auswahlLeiste.append(gruppe('Auswahl', [
        ['alles', sym('stapel'), null, 'alles'],
        ['gehakt', sym('haken'), keineGehakten, 'abgehakt'],
        ['offen', 'offen', keineOffenen, 'noch offen']
      ], auswahl, (w) => { auswahl = w; kk && kk.neu(); }));
    };
    const zeichne = () => {
      wahlKnoepfe.forEach(([k, b]) => b.setAttribute('aria-pressed', String(k === art)));
      if (art !== 'stolper') setzeLesezeichen(teil, lv, art);
      const istBild = art === 'bilder';
      if (istBild && lochModus) { lochModus = false; lochKnopf.setAttribute('aria-pressed', 'false'); }
      lochKnopf.hidden = istBild; neuKnopf.hidden = !istBild;
      tausche(buehne, () => {
        raum.classList.toggle('mit-loch', lochModus);
        buehne.classList.toggle('mit-karteikarte', lochModus);
        buehne.classList.toggle('mit-bildern', istBild);
        buehne.classList.remove('mit-stempel');
        if (istBild) { kk = null; zeig = null; (bildModus === 'tippen' && tippenFrei(teil) ? abtippen : zuordnen)(teil, lv, buehne); }
        else if (lochModus) { kk = karteikarte(buehne, quelle(), { lang: lochStein, amZeigen: karteStein }); steinKnopfZeigen(); } else { kk = null; tafelZeichnen(); stempelZeigen(); }
      });
      auswahlZeichnen(); steinKnopfZeigen();
      ruhe(lochKnopf, art === 'stolper' && !alleSteine().length);
    };

    const lochKnopf = knopf('', mitSymbol('loch', 'Loch-Blatt'), () => {
      if (lochKnopf.getAttribute('aria-disabled') === 'true') return;
      lochModus = !lochModus;
      if (lochModus) auswahl = startAuswahl();
      steinStempel = false;
      lochKnopf.setAttribute('aria-pressed', String(lochModus));
      schalter.zeigen();
      zeichne();
    });
    lochKnopf.setAttribute('aria-pressed', 'false');
    const steinKnopf = knopf('stein-knopf', mitSymbol('stein', 'Stolperstein'), () => {
      if (lochModus) lochStein();
      else if (zeig) steinUmschalten(zeig.dataset.s, zeig);
      else { steinStempel = !steinStempel; stempelZeigen(); steinKnopfZeigen(); }
    }, 'Stolperstein');
    const steinKnopfZeigen = () => {
      if (lochModus) {
        const k = kk && kk.karte();
        steinKnopf.classList.toggle('verborgen', !k);
        steinKnopf.setAttribute('aria-pressed', String(!!k && k.classList.contains('stein')));
        return;
      }
      steinKnopf.classList.toggle('verborgen', art === 'bilder' || (art === 'stolper' && (!zeig || stempelAuf)));
      steinKnopf.setAttribute('aria-pressed', String(steinStempel || (!!zeig && zeig.classList.contains('stein'))));
    };
    const steinVon = (schl) => {
      if (!teil.festerFall) return schl;
      const alle = alleSteine().concat(art === 'stolper' ? [] : (lv[art] || []).flat());
      return alle.find(x => x.toLowerCase() === schl) || schl;
    };
    const karteStein = (schl, karte) => {
      if (!karte.querySelector('.abdruck')) { const a = el('span', 'abdruck'); a.setAttribute('aria-hidden', 'true'); a.append(sym('stein')); karte.append(a); }
      karte.classList.toggle('stein', alleSteine().includes(steinVon(schl)));
      if (art === 'stolper' && steinUmfang === 'alle' && !karte.querySelector('.herkunft')) {
        const s = steinVon(schl), von = teil.level.find(l => ((licht[teil.id].stolper || {})[l.id] || []).includes(s));
        const o = von && von !== lv ? ortZu(teil, von.id) : null;
        if (o) { const h = el('span', 'herkunft'); h.setAttribute('aria-hidden', 'true'); h.append(WEG.ortBild(o.w.ort, 'klein', o.w.voegel)); karte.append(h); }
      }
      if (karte === (kk && kk.karte())) steinKnopfZeigen();
    };
    const lochStein = () => {
      if (!kk || !kk.schl()) return;
      const s = steinVon(kk.schl());
      const listen = steinListen().filter(l => l.includes(s));
      if (listen.length) listen.forEach(l => l.splice(l.indexOf(s), 1)); else steine.push(s);
      speichern(teil.id); tuerStein();
      karteStein(kk.schl(), kk.karte());
      steinKnopfZeigen(); auswahlBauen();
      steinFliegt(kk.karte(), !listen.length);
      if (!listen.length || art !== 'stolper') return;
      const k0 = kk;
      setTimeout(() => {
        if (kk !== k0 || !lochModus) return;
        if (steinPool().length) { kk.neu(); return; }
        lochModus = false; lochKnopf.setAttribute('aria-pressed', 'false'); zeichne();
      }, ruhig() ? 0 : 600);
    };
    const steinFliegt = (karte, gelegt) => {
      const a = karte && karte.querySelector('.abdruck');
      if (!a || ruhig() || !document.body.animate) return;
      const ziel = wahl.querySelector('.stolper-reiter');
      const r = a.getBoundingClientRect();
      const c = el('div', 'stein-fliegt'); c.append(sym('stein'));
      Object.assign(c.style, { left: r.left + r.width / 2 + 'px', top: r.top + r.height / 2 + 'px' });
      document.body.append(c);
      let bahn;
      if (gelegt && ziel) {
        const b = ziel.getBoundingClientRect();
        const dx = b.left + b.width / 2 - (r.left + r.width / 2), dy = b.top + b.height / 2 - (r.top + r.height / 2);
        bahn = c.animate([{ transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
          { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(.6)`, opacity: .4 }],
          { duration: 700, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' });
        bahn.onfinish = () => { anim(ziel, [{ boxShadow: '0 0 0 0 var(--asche)' }, { boxShadow: '0 0 0 6px transparent' }], { duration: 500 }); };
      } else {
        bahn = c.animate([{ transform: 'translate(-50%, -50%) rotate(0)', opacity: 1 },
          { transform: 'translate(calc(-50% + 40px), calc(-50% + 70px)) rotate(200deg)', opacity: 0 }],
          { duration: 650, easing: 'cubic-bezier(.5,0,.8,.6)', fill: 'forwards' });
      }
      const fertig = () => c.remove();
      bahn.addEventListener('finish', fertig); setTimeout(fertig, 900);
    };
    const neuKnopf = knopf('', mitSymbol('stapel', 'Neue Runde'), () => zeichne(), 'Neue Runde');
    neuKnopf.hidden = true;
    const werkzeug = el('div', 'werkzeug');
    const schalter = schreibSchalter(() => zeichne(), () => lochModus);
    werkzeug.append(lochKnopf, neuKnopf, schalter, steinKnopf);
    wahl.after(auswahlLeiste);
    unten.append(werkzeug);
    zeichne();
    hoere(document, 'keydown', (e) => {
      if (e.target.closest?.('button, textarea') || art === 'bilder') return;
      const vor = e.key === ' ' || e.key === 'ArrowRight', rueck = e.key === 'ArrowLeft';
      if (!vor && !rueck) return;
      e.preventDefault();
      if (lochModus && kk) { vor ? kk.weiter() : kk.zurueck(); return; }
      if (!lochModus) zeige(zeig ? (vor ? 1 : -1) : buehne.querySelector('.zelle'));
    });
    const neuEinpassen = () => { const t = buehne.querySelector('.tafel:not(.geist .tafel)'); if (t) einpassen(t); };
    hoere(window, 'resize', neuEinpassen);
    if (window.ResizeObserver) { const ro = new ResizeObserver(neuEinpassen); ro.observe(buehne); abbau.push(() => ro.disconnect()); }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (buehne.isConnected) neuEinpassen(); });
    if (lv.hinweis) hinweisKarte(lv);
  }

  const serienWechsel = (alt, baue, opt = {}) => {
    const neu = () => { const n = baue(); if (n) kommt(n, 0, 16, 450); };
    if (!alt || !alt.isConnected) { neu(); return; }
    if (!opt.ohneFreude) alt.classList.add('freude');
    setTimeout(() => {
      if (!alt.isConnected) return;
      geht(alt, -10, 450).then(() => { if (alt.isConnected) neu(); });
    }, opt.ohneFreude ? 0 : (ruhig() ? 500 : 1400));
  };
  function bilderRaum(teil, opt = {}) {
    leer();
    document.body.classList.add('im-ueben');
    if (!opt.galerie && !licht[teil.id].bilderOffen) { licht[teil.id].bilderOffen = true; speichern(teil.id); }
    if (opt.galerie) galerieKopf(); else kopfLeiste(teil, 'bilder', null);
    const r = el('span', 'reiter-tuer ueben-tuer'); r.setAttribute('aria-pressed', 'true'); r.append(mitSymbol('bild', 'Bilder'));
    const raum = raumHuelle([r], 'raum-ueben raum-bilder', teil.id + '|bilder');
    const auswahl = el('div', 'auswahl-platz');
    const buehne = el('div', 'tafel-rahmen mit-bildern');
    raum.append(auswahl, buehne);
    const ZIEL = 3;
    const pool = opt.pool || bildPool(teil), zieh = ziehung(pool);
    const daten = { bilder: pool, ablenkerWoerter: opt.ablenker || ablenkerWoerter(teil) };
    const tippOk = opt.galerie ? !!opt.tippen : tippenFrei(teil);
    const geschichten = opt.galerie ? [] : [...teil.level, teil.boss].filter(Boolean)
      .flatMap(lv => sinne(lv).filter(sn => sinnDa(lv, sn))).filter(sn => sn.wahl.every(b => window.LB.hatSzene(b)));
    const ziehG = geschichten.length ? ziehung(geschichten) : null;
    let punkte = 0, modus = 'zuordnen';
    const goldSchl = () => modus === 'tippen' ? 'tippen' : modus === 'geschichte' ? 'geschichte' : 'bilder';
    const gesichert = () => !!opt.galerie || !!licht[teil.id][goldSchl()];
    const kopf = el('div', 'serie-kopf');
    kopf.append(el('span', 'serie-name', 'Serie'));
    const punktEl = Array.from({ length: ZIEL }, () => { const p = el('i', 'serie-punkt'); kopf.append(p); return p; });
    const punkteZeichnen = () => punktEl.forEach((p, i) => p.classList.toggle('an', gesichert() || i < punkte));
    const vier = () => { const t = []; let n = 0; while (t.length < Math.min(4, pool.length) && n++ < 50) { const w = zieh(); if (!t.includes(w)) t.push(w); } return t; };
    const knopfPlatz = el('div', 'serie-knopf');
    const knoepfe = (...k) => { knopfPlatz.replaceChildren(...k); k.forEach(x => kommt(x, 0, 8, 360)); };
    const amFehler = () => { if (!gesichert() && punkte) { punkte = 0; punkteZeichnen(); } };
    const amEnde = (fall, ohneFehler) => {
      if (!ohneFehler) { fall.classList.add('freude'); lauf(); return; }
      if (gesichert()) { lauf(); return; }
      punkte++; punkteZeichnen();
      if (punkte < ZIEL) { lauf(); return; }
      licht[teil.id][goldSchl()] = true; speichern(teil.id);
      punkteZeichnen();
      fall.classList.add('freude');
      const o = ortZu(teil, 'bilder'), w = o && o.w;
      knoepfe(knopf('', 'Weiter üben', () => lauf({ ohneFreude: true })), knopf('', [w ? WEG.ortBild(w.ort, 'klein', w.voegel) : sym('haus'), el('span', null, 'zum Ort')], () => titel(teil, { ort: w && w.id, neu: goldSchl() === 'bilder' ? 'bilder' : null }), 'zum Ort'));
    };
    const lauf = (opt = {}) => {
      knopfPlatz.querySelectorAll('.pruefen-knopf').forEach(k => ruhe(k, true));
      serienWechsel(buehne.querySelector('.serien-fall'), baueFall, opt);
    };
    const baueFall = () => modus === 'geschichte' && ziehG
      ? geschichte(teil, buehne, { zieh: ziehG, fehler: amFehler, fertig: amEnde })
      : modus === 'tippen' && tippOk
      ? abtippen(teil, daten, buehne, { fehler: amFehler, fertig: amEnde, pruefPlatz: knopfPlatz })
      : zuordnen(teil, daten, buehne, { treffer: vier(), fehler: amFehler, fertig: amEnde, pruefPlatz: knopfPlatz });
    const inhalt = () => {
      knopfPlatz.replaceChildren();
      punkte = 0; punkteZeichnen();
      baueFall();
    };
    const aufgaben = [['zuordnen', 'zuordnen'], ...(tippOk ? [['tippen', 'abtippen']] : []), ...(ziehG ? [['geschichte', 'Geschichte']] : [])];
    if (aufgaben.length > 1) auswahl.append(gruppe('Aufgabe', aufgaben, modus, (w) => { modus = w; tausche(buehne, inhalt); }));
    if (!opt.galerie) auswahl.after(kopf);
    buehne.after(knopfPlatz);
    const werkzeug = el('div', 'werkzeug');
    werkzeug.append(schreibSchalter(() => tausche(buehne, inhalt)));
    unten.append(werkzeug);
    punkteZeichnen();
    inhalt();
  }

  const tippenFrei = (teil) => !!(teil.abtippen && licht[teil.id][teil.abtippen]);
  const fliege = (c, ziel, vorne = false, vor = c.getBoundingClientRect()) => {
    c.style.transform = '';
    if (vorne) ziel.prepend(c); else ziel.append(c);
    mittigAlle(c);
    const nach = c.getBoundingClientRect();
    if (ruhig() || !nach.width || !vor.width) return Promise.resolve();
    c.classList.add('fliegt');
    return fertigVon(anim(c, [{ transform: `translate(${(vor.left + vor.width / 2) - (nach.left + nach.width / 2)}px,${(vor.top + vor.height / 2) - (nach.top + nach.height / 2)}px) scale(${vor.width / nach.width})` },
      { transform: 'translate(0px,0px) scale(1)' }], { duration: 420 }), 420).then(() => { c.classList.remove('fliegt'); mittigAlle(c); });
  };
  const passe = (c) => {
    c.style.fontSize = '';
    const a = c.parentElement;
    if (!a || !a.classList.contains('ablage')) return;
    const breit = a.clientWidth - 10, hoch = a.clientHeight - 2;
    for (let k = 0; k < 3; k++) {
      const f = Math.min(1, breit / Math.max(1, c.offsetWidth), hoch / Math.max(1, c.offsetHeight));
      if (f > .995) break;
      c.style.fontSize = (parseFloat(getComputedStyle(c).fontSize) * f).toFixed(1) + 'px';
    }
  };
  const reihenGleich = (box) => {
    box.style.maxWidth = '';
    const k = [...box.children]; if (k.length < 2) return;
    const reihen = new Set(k.map(x => x.offsetTop)).size; if (reihen < 2) return;
    const lueke = parseFloat(getComputedStyle(box).columnGap) || 0, b = k.map(x => x.getBoundingClientRect().width);
    const zaehle = (W) => { let r = 1, x = 0; for (const w of b) { if (x && x + lueke + w > W) { r++; x = w; } else x += (x ? lueke : 0) + w; } return r; };
    let lo = Math.max(...b), hi = box.clientWidth;
    while (hi - lo > .5) { const m = (lo + hi) / 2; if (zaehle(m) <= reihen) hi = m; else lo = m; }
    box.style.maxWidth = Math.ceil(hi + 2) + 'px';
    if (new Set(k.map(x => x.offsetTop)).size > reihen) box.style.maxWidth = '';
  };
  const felderPassen = (feld, zeile) => {
    const fs = [...zeile.children];
    zeile.style.removeProperty('--feld'); fs.forEach(x => { x.style.fontSize = ''; });
    const platz = feld.clientWidth - 8, breit = zeile.scrollWidth;
    if (!fs.length || breit <= platz) return;
    const f = platz / breit, hoch = fs[0].offsetHeight, schrift = parseFloat(getComputedStyle(fs[0]).fontSize) * f;
    zeile.style.setProperty('--feld', (hoch * f).toFixed(1) + 'px');
    fs.forEach(x => { x.style.fontSize = schrift.toFixed(1) + 'px'; });
  };
  const ziehbar = (c, tippen, abgelegt) => {
    let start = null, bewegt = false;
    c.addEventListener('pointerdown', (e) => { if (c.classList.contains('fest')) return; start = { x: e.clientX, y: e.clientY }; bewegt = false; try { c.setPointerCapture(e.pointerId); } catch {} });
    c.addEventListener('pointermove', (e) => {
      if (!start) return;
      const dx = e.clientX - start.x, dy = e.clientY - start.y;
      if (!bewegt && Math.hypot(dx, dy) < 8) return;
      bewegt = true; c.classList.add('zieht'); c.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    c.addEventListener('pointerup', (e) => {
      if (!start) return;
      start = null; c.classList.remove('zieht');
      if (!bewegt) { c.style.transform = ''; tippen(c); return; }
      c.style.visibility = 'hidden';
      const unter = document.elementFromPoint(e.clientX, e.clientY);
      c.style.visibility = '';
      abgelegt(c, unter);
    });
    c.addEventListener('pointercancel', () => { start = null; c.classList.remove('zieht'); c.style.transform = ''; });
  };
  document.addEventListener('click', (e) => { const k = e.target.closest && e.target.closest('.licht-ruht'); if (k) { e.preventDefault(); e.stopImmediatePropagation(); } }, true);
  const ruhe = (k, an) => { k.classList.toggle('licht-ruht', an); if (an) k.setAttribute('aria-disabled', 'true'); else k.removeAttribute('aria-disabled'); };
  const pruefKnopf = (platz, fn) => {
    const k = knopf('pruefen-knopf', 'Prüfen', () => fn(), 'Prüfen');
    ruhe(k, true);
    if (platz) platz.replaceChildren(k);
    return { zeigen: (an) => ruhe(k, !an), weg: () => k.remove(), k };
  };

  function geschichte(teil, buehne, ctx = {}) {
    const sn = ctx.zieh(), fall = el('div', 'serien-fall'), feld = el('div', 'sinn geschichte');
    const wahl = el('div', 'sinn-wahl');
    let fehler = false, fertig = false;
    for (const b of mische(sn.wahl.slice())) {
      const kn = knopf('sinn-bild', window.LB.szeneBild(b), () => {
        if (fertig || kn.classList.contains('erloschen')) return;
        if (b.s !== sn.richtig) { kn.classList.add('erloschen'); kn.setAttribute('aria-disabled', 'true'); fehler = true; if (ctx.fehler) ctx.fehler(); return; }
        fertig = true; kn.classList.add('gold'); wahl.classList.add('entschieden'); sammleSzene(sn.richtig);
        setTimeout(() => { if (fall.isConnected && ctx.fertig) ctx.fertig(fall, !fehler); }, ruhig() ? 0 : 700);
      });
      kn.dataset.s = b.s; kn.setAttribute('aria-label', 'Bild ' + (wahl.children.length + 1));
      wahl.append(kn);
    }
    feld.append(el('div', 'sinn-satz', satz(sn.satz)), wahl);
    fall.append(feld);
    buehne.replaceChildren(fall);
    return fall;
  }
  function zuordnen(teil, lv, buehne, ctx = {}) {
    const treffer = ctx.treffer || mische(lv.bilder).slice(0, 4);
    let fehler = false;
    const bilder = mische(treffer.map(bildSchluessel));
    const woerter = mische([...treffer, ...mische(lv.ablenkerWoerter || []).slice(0, 2)]);
    const fall = el('div', 'serien-fall');
    const feld = el('div', 'zuordnen');
    const bildReihe = el('div', 'bild-reihe'), wortReihe = el('div', 'wort-reihe');
    for (const b of bilder) { const k = el('div', 'bild-karte'); k.dataset.b = b; k.append(bild(b), el('div', 'ablage')); bildReihe.append(k); }
    let gewaehlt = null;
    const heim = new Map();
    const karten = [];
    const wahl = (c) => { if (gewaehlt) gewaehlt.classList.remove('gewaehlt'); gewaehlt = c; if (c) c.classList.add('gewaehlt'); };
    const liegtAuf = (c) => c.closest('.bild-karte');
    const stand = () => {
      bildReihe.querySelectorAll('.bild-karte').forEach(k => k.classList.toggle('belegt', !!k.querySelector('.wort-karte')));
      pruef.zeigen(![...bildReihe.querySelectorAll('.bild-karte')].some(k => !k.querySelector('.wort-karte')));
    };
    const nachHause = (c) => { const vor = c.getBoundingClientRect(); c.classList.remove('liegt'); c.style.fontSize = ''; heim.get(c).classList.remove('leer'); const p = fliege(c, heim.get(c), false, vor); stand(); return p.then(stand); };
    const verlasse = (c) => { const h = heim.get(c); if (c.parentElement !== h) return; const r = h.getBoundingClientRect(); h.style.width = r.width + 'px'; h.style.height = r.height + 'px'; h.classList.add('leer'); };
    const legen = (c, ziel) => {
      const alt = ziel.querySelector('.ablage .wort-karte');
      const von = liegtAuf(c);
      if (alt && alt !== c) { if (von) { alt.classList.add('liegt'); fliege(alt, von.querySelector('.ablage')); } else nachHause(alt); }
      const vor = c.getBoundingClientRect();
      verlasse(c); c.classList.add('liegt'); wahl(null);
      const ablage = ziel.querySelector('.ablage');
      c.style.transform = ''; ablage.append(c); passe(c);
      fliege(c, ablage, false, vor).then(stand); stand();
    };
    const tippen = (c) => {
      if (liegtAuf(c)) { wahl(null); nachHause(c); return; }
      wahl(gewaehlt === c ? null : c);
    };
    const abgelegt = (c, unter) => {
      const ziel = unter && unter.closest('.bild-karte');
      if (ziel && fall.contains(ziel)) legen(c, ziel);
      else if (liegtAuf(c)) nachHause(c);
      else { const t = c.style.transform; c.style.transform = ''; if (t && !ruhig()) anim(c, [{ transform: t }, { transform: 'translate(0px, 0px)' }], { duration: 300 }); }
    };
    const pruef = pruefKnopf(ctx.pruefPlatz, () => {
      const alle = [...bildReihe.querySelectorAll('.bild-karte')];
      const gut = alle.every(k => { const c = k.querySelector('.wort-karte'); return c && c.dataset.b === k.dataset.b; });
      pruef.zeigen(false);
      if (gut) {
        alle.forEach(k => k.classList.add('richtig')); karten.forEach(c => c.classList.add('fest'));
        feld.classList.add('fertig');
        sammle(treffer);
        setTimeout(() => { if (fall.isConnected && ctx.fertig) ctx.fertig(fall, !fehler); }, ruhig() ? 0 : 520);
      } else {
        fehler = true; if (ctx.fehler) ctx.fehler();
        fall.classList.add('erloschen');
        setTimeout(() => {
          if (!fall.isConnected) return;
          Promise.all(karten.filter(liegtAuf).map(nachHause)).then(() => fall.classList.remove('erloschen'));
        }, ruhig() ? 200 : 750);
      }
    });
    for (const w of woerter) {
      const c = el('div', 'wort-karte'); c.dataset.b = bildSchluessel(w);
      c.append(wort(inForm(w, 'woerter', false)));
      const h = el('div', 'wort-heim'); h.append(c); heim.set(c, h); karten.push(c);
      ziehbar(c, tippen, abgelegt);
      wortReihe.append(h);
    }
    if (window.ResizeObserver) new ResizeObserver(() => karten.filter(liegtAuf).forEach(passe)).observe(bildReihe);
    bildReihe.addEventListener('click', (e) => { const z = e.target.closest('.bild-karte'); if (z && gewaehlt && !e.target.closest('.wort-karte')) legen(gewaehlt, z); });
    feld.append(bildReihe, wortReihe);
    fall.append(feld);
    buehne.replaceChildren(fall);
    return fall;
  }
  const FOLGE = window.LAUTBUCH_FOLGE.TASTEN.flat();
  const zerlege = window.LAUTBUCH_FOLGE.zerlege;
  const ZUSATZ = 3;
  function abtippen(teil, lv, buehne, ctx = {}) {
    const naechstes = ziehung(lv.bilder);
    const feld = el('div', 'abtippen serien-fall');
    let fehler = false;
    const vorlage = el('div', 'tipp-vorlage');
    const ablage = el('div', 'tipp-kacheln');
    feld.append(vorlage, ablage);
    buehne.replaceChildren(feld);
    let ziel = [], felder = [], kacheln = [], heim = new Map(), anfang = false, zeileJetzt = null, wortJetzt = null;
    const ordnen = () => { if (!feld.isConnected || !zeileJetzt) return; felderPassen(feld, zeileJetzt); reihenGleich(ablage); };
    if (window.ResizeObserver) { const ro = new ResizeObserver(() => { if (!feld.isConnected && !buehne.isConnected) ro.disconnect(); else ordnen(); }); ro.observe(feld); }
    const gross = () => einst.schreibung === 'gross';
    const zeichne = (c) => {
      const imAnfang = anfang && c.parentElement === felder[0];
      const t = gross() || imAnfang ? window.LB.gross(c.dataset.g) : c.dataset.g;
      if (c.dataset.zeigt === t) return;
      c.dataset.zeigt = t; c.replaceChildren(faerbe(t.length > 1 && imAnfang ? t[0] + t.slice(1).toLowerCase() : t));
      if (imAnfang && !gross() && !ruhig()) anim(c, [{ transform: 'scale(.7)' }, { transform: 'scale(1)' }], { duration: 360 });
    };
    const stand = () => {
      felder.forEach(f => f.classList.toggle('voll', !!f.firstElementChild));
      heim.forEach((platz, c) => platz.classList.toggle('leer', c.parentElement !== platz));
      pruef.zeigen(felder.every(f => f.firstElementChild));
    };
    const imFeld = (c) => felder.includes(c.parentElement);
    const nachHause = (c) => { const p = fliege(c, heim.get(c)); zeichne(c); stand(); return p.then(stand); };
    const setzen = (c, f) => {
      const alt = f.firstElementChild, von = imFeld(c) ? c.parentElement : null;
      if (alt && alt !== c) { if (von) { fliege(alt, von); zeichne(alt); } else nachHause(alt); }
      fliege(c, f).then(stand); zeichne(c); stand();
    };
    const tippen = (c) => {
      if (imFeld(c)) { nachHause(c); return; }
      const frei = felder.find(f => !f.firstElementChild);
      if (frei) setzen(c, frei);
    };
    const abgelegt = (c, unter) => {
      const f = unter && unter.closest('.tipp-feld');
      if (f && felder.includes(f)) setzen(c, f);
      else if (imFeld(c)) nachHause(c);
      else { const t = c.style.transform; c.style.transform = ''; if (t && !ruhig()) anim(c, [{ transform: t }, { transform: 'translate(0px, 0px)' }], { duration: 300 }); }
    };
    const pruef = pruefKnopf(ctx.pruefPlatz, () => {
      const gelegt = felder.map(f => f.firstElementChild.dataset.g).join('');
      pruef.zeigen(false);
      if (gelegt === ziel.join('').toLowerCase()) {
        kacheln.forEach(c => c.classList.add('fest'));
        vorlage.classList.add('fertig');
        if (wortJetzt) sammle([wortJetzt]);
        if (ctx.fertig) setTimeout(() => { if (feld.isConnected) ctx.fertig(feld, !fehler); }, ruhig() ? 0 : 520);
        else setTimeout(() => { if (feld.isConnected) tausche([vorlage, ablage], rundeBauen); }, ruhig() ? 600 : 1600);
      } else {
        fehler = true; if (ctx.fehler) ctx.fehler();
        vorlage.classList.add('erloschen');
        setTimeout(() => {
          if (!feld.isConnected) return;
          Promise.all(kacheln.filter(imFeld).map(nachHause)).then(() => vorlage.classList.remove('erloschen'));
        }, ruhig() ? 200 : 750);
      }
    });
    const rundeBauen = () => {
      vorlage.classList.remove('fertig', 'erloschen');
      const roh = naechstes(), form = inForm(roh, 'woerter', false);
      wortJetzt = roh;
      ziel = zerlege(form);
      anfang = /^[A-ZÄÖÜ]/.test(ziel[0]) && !/^[A-ZÄÖÜ]{2}/.test(ziel.join(''));
      const zeile = el('div', 'tipp-felder');
      const breite = (g) => ' g' + Math.min(3, g.length);
      felder = ziel.map((g, k) => { const f = el('span', 'tipp-feld' + (k === 0 && anfang ? ' anfang' : '') + breite(g)); zeile.append(f); return f; });
      vorlage.replaceChildren(bild(bildSchluessel(roh), 'tipp-bild'), zeile);
      const frei = new Set();
      for (const z of WELT.zonen) for (const l of z.laute) if (WELT.stand(l, licht) !== 'nebel') frei.add(l.k);
      const brauch = ziel.map(g => g.toLowerCase());
      const mehr = mische(FOLGE.filter(k => frei.has(k) && !brauch.includes(k))).slice(0, ZUSATZ);
      const alle = [...brauch, ...mehr].sort((x, y) => FOLGE.indexOf(x) - FOLGE.indexOf(y));
      heim = new Map(); kacheln = [];
      ablage.replaceChildren(...alle.map(g => {
        const platz = el('span', 'kachel-platz' + breite(g));
        const c = el('span', 'kachel'); c.dataset.g = g; c.setAttribute('role', 'button'); c.setAttribute('aria-label', g);
        platz.append(c); heim.set(c, platz); kacheln.push(c); zeichne(c);
        ziehbar(c, tippen, abgelegt);
        return platz;
      }));
      stand();
      zeileJetzt = zeile;
      requestAnimationFrame(ordnen);
    };
    rundeBauen();
    return feld;
  }

  const WIEDERHOLEN_KARTEN = 10;
  function wiederholen() {
    leer();
    document.body.classList.add('im-ueben');
    oben.append(titelZeile('Wiederholen'));
    const r = el('span', 'reiter-tuer ueben-tuer'); r.setAttribute('aria-pressed', 'true'); r.append(mitSymbol('stapel', 'Wiederholen'));
    const raum = raumHuelle([r], 'raum-ueben', 'wiederholen');
    const buehne = el('div', 'tafel-rahmen mit-karteikarte');
    raum.append(buehne);
    const pool = wiederholenPool();
    const auswahl = gewichtetZiehen(pool, WIEDERHOLEN_KARTEN);
    const amEnde = () => {
      if (unten.querySelector('.weiter-knopf')) return;
      const box = el('div', 'ende');
      box.append(knopf('gelesen weiter-knopf', [sym('band'), el('span', null, 'weiter')], () => weiterLesen(), 'weiter'));
      tausche(unten, () => unten.replaceChildren(box), { ruhend: true });
    };
    const kk = karteikarte(buehne, {
      schluessel: () => auswahl,
      form: (schl) => {
        const e = pool.get(schl);
        const a = e.prolog ? 'buchstaben' : e.art;
        const f = e.form === 'fest' ? e.text : e.form === 'gross' ? window.LB.gross(e.text) : e.form === 'klein' ? e.text.toLowerCase()
          : mischForm(e.text, a);
        return { knoten: (a === 'ketten' || a === 'woerter') ? wort(f) : faerbe(f), lang: f.replace(/-/g, '').length > 4 };
      }
    }, { folge: true, hoechstens: auswahl.length, amEnde });
    hoere(document, 'keydown', (e) => {
      if (e.target.closest?.('button')) return;
      if (e.key === ' ' || e.key === 'ArrowRight') { e.preventDefault(); kk.weiter(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); kk.zurueck(); }
    });
  }

  function bossRaum(teil) {
    leer();
    document.body.classList.add('boss');
    kopfLeiste(teil, 'boss', teil.boss);
    const r = el('span', 'reiter-tuer boss-tuer'); r.setAttribute('aria-pressed', 'true'); r.append(mitSymbol('boss', 'Boss'));
    const raum = raumHuelle([r], 'raum-boss', teil.id + '|boss');
    lauf(teil, teil.boss, raum, true);
    if (teil.boss.hinweis) hinweisKarte(teil.boss);
  }

  const zahlBlock2 = (lv) => lv.pruefung ? lv.pruefung.length : lv.z4.length + lv.z5.length + 1 + ((lv.szene && lv.szene.saetze) || []).length;

  function eingang(lv, istBoss, weiterLos) {
    const box = el('div', 'eingang');
    box.append(sym(istBoss ? 'boss' : 'raute', 'gross'), el('h2', null, 'Jetzt du.'),
      el('p', null, 'Die letzten ' + zahlBlock2(lv) + ' ohne Stocken – dann leuchtet der Stern.'));
    box.append(knopf('gross', 'Los', () => { hinweisZu(); weiterLos(); }));
    return box;
  }

  function lauf(teil, lv, raum, istBoss) {
    const seite = el('div', 'seite');
    const zeilen = [];
    for (const r of anlauf(lv.anlauf)) {
      const z = el('div', 'zeile anlauf');
      for (const s of r) z.append(el('span', null, faerbe(s)));
      z.dataset.block = '1';
      zeilen.push(z); seite.append(z);
    }
    seite.append(el('hr', 'trenner'));
    if (lv.pruefung) {
      for (const r of mische(lv.pruefung)) {
        const z = el('div', 'zeile buchstaben');
        for (const s of r) z.append(el('span', null, faerbe(s)));
        z.dataset.block = '2'; z.dataset.art = 'buchstaben'; z.dataset.text = r.join(' ');
        zeilen.push(z); seite.append(z);
      }
    } else {
      const zahlWoerter = lv.z4.length + lv.z5.length;
      for (const w of mische([...lv.z4, ...lv.z5, ...(lv.zMehr || [])]).slice(0, zahlWoerter)) { const z = el('div', 'zeile', wort(w)); z.dataset.block = '2'; z.dataset.text = w; zeilen.push(z); seite.append(z); }
      const sz = el('div', 'zeile ist-satz', satz(lv.z6)); sz.dataset.block = '2'; sz.dataset.text = lv.z6; zeilen.push(sz); seite.append(sz);
      for (const t of (lv.szene && lv.szene.saetze) || []) { const z = el('div', 'zeile ist-satz szene-satz', satz(t)); z.dataset.block = '2'; z.dataset.text = t; zeilen.push(z); seite.append(z); }
    }
    seite.classList.add('einzeln');
    const punkte = el('div', 'lauf-punkte'), punktVon = new Map();
    punkte.setAttribute('aria-hidden', 'true');
    for (const z of zeilen) if (z.dataset.block === '2') { const p = el('i', 'lauf-punkt'); punkte.append(p); punktVon.set(z, p); }
    punkte.classList.add('vor-start');
    raum.append(punkte, seite);

    let i = 0, ohneStocken = true, wechselt = false, nachLesen = null, inSchwelle = false;
    const weiter = knopf('gelesen', 'weiter', () => nachLesen ? nachLesen() : naechste(true));
    const vorgezeigt = knopf('', 'vorgezeigt', () => naechste(false));
    const zeige = () => {
      zeilen.forEach((z, k) => z.classList.toggle('jetzt', k === i));
      punktVon.forEach((p, z) => p.classList.toggle('jetzt', z === zeilen[i]));
      const b2 = zeilen[i].dataset.block === '2';
      weiter.textContent = b2 ? 'gelesen' : 'weiter';
      vorgezeigt.classList.toggle('verborgen', !b2);
    };
    const steinOrt = (s) => stolper(teil, istBoss ? herkunft(teil, s) : lv);
    const schwelle = (alt) => {
      inSchwelle = true;
      weiter.classList.add('verborgen'); vorgezeigt.classList.add('verborgen');
      const box = eingang(lv, istBoss, () => tausche(raum, () => {
        box.remove(); if (alt) alt.classList.remove('nachklang');
        punkte.classList.remove('vor-start'); raum.append(punkte, seite);
        inSchwelle = false; weiter.classList.remove('verborgen'); zeige();
      }));
      tausche(raum, () => { punkte.remove(); seite.remove(); raum.append(box); });
      const los = box.querySelector('.knopf.gross'); if (los) los.focus({ preventScroll: true });
    };
    const naechste = (gut) => {
      if (i >= zeilen.length || wechselt || inSchwelle) return;
      const z = zeilen[i];
      z.classList.remove('jetzt'); z.classList.add('nachklang');
      const p = punktVon.get(z); if (p) { p.classList.remove('jetzt'); p.classList.add(gut ? 'gold' : 'asche'); }
      if (z.dataset.block === '2') {
        z.classList.add(gut ? 'gold' : 'erloschen');
        const neu = [];
        for (const s of zeilenSteine(teil, z)) {
          const liste = steinOrt(s), k = liste.indexOf(s);
          if (gut && k >= 0) liste.splice(k, 1);
          if (!gut && k < 0) { liste.push(s); neu.push(s.replace(/-/g, '')); }
        }
        speichern(teil.id);
        if (!gut) steinFlug(z, neu.join(' '));
      } else z.classList.add('fertig');
      if (!gut) ohneStocken = false;
      i++;
      if (i >= zeilen.length) { if (lv.sinn) sinnprobe(); else if (lv.szene && lv.szene.aufgaben) szene(); else ende(); return; }
      if (z.dataset.block === '1' && zeilen[i].dataset.block === '2') { inSchwelle = true; setTimeout(() => { if (seite.isConnected) schwelle(z); }, ruhig() ? 0 : 200); return; }
      wechselt = true;
      setTimeout(() => {
        wechselt = false;
        if (!seite.isConnected) return;
        z.classList.remove('nachklang'); zeige(); kommt(zeilen[i], ruhig() ? 0 : 200, ruhig() ? 0 : 16, 340);
      }, ruhig() ? 120 : (z.dataset.block === '2' ? 340 : 100));
    };
    const knoepfe = el('div', 'antwort'); knoepfe.append(vorgezeigt, weiter);
    unten.append(knoepfe);
    kommt(knoepfe, 120, 0);
    hoere(document, 'keydown', (e) => {
      if (e.target.closest?.('button')) return;
      if (e.key === 'Enter' || e.key === 'ArrowRight') { e.preventDefault(); if (nachLesen) nachLesen(); else naechste(true); }
      if ((e.key === 'v' || e.key === 'V' || e.key === 'ArrowDown') && zeilen[i]?.dataset.block === '2') { e.preventDefault(); naechste(false); }
    });
    zeige();
    if (zeilen[0] && zeilen[0].dataset.block === '2') schwelle(null);

    const nochmalLesen = (wahl, fehl, neu) => {
      if (fehl >= 2) ohneStocken = false;
      setTimeout(() => {
        if (!wahl.isConnected) return;
        wahl.classList.add('lesen');
        weiter.textContent = 'gelesen'; weiter.classList.remove('verborgen');
        nachLesen = () => { nachLesen = null; weiter.classList.add('verborgen'); neu(); wahl.classList.remove('lesen'); };
      }, ruhig() ? 250 : 700);
    };
    const szene = () => {
      weiter.classList.add('verborgen'); vorgezeigt.classList.add('verborgen');
      const feld = el('div', 'szene');
      const aufgaben = lv.szene.ziehe ? Array.from({ length: lv.szene.ziehe }, () => lv.szene.aufgaben[Math.floor(Math.random() * lv.szene.aufgaben.length)])
        : mische(lv.szene.aufgaben);
      let k = 0;
      const stelle = () => {
        const a = aufgaben[k];
        const frage = el('div', 'szene-frage');
        frage.append(a.wort ? wort(a.wort) : bild(a.bild, 'szene-vorlage'), el('span', 'szene-zeichen', '?'));
        const wahl = el('div', 'szene-wahl');
        let fertig = false, fehl = 0;
        const bilder = () => {
          fertig = false; wahl.replaceChildren();
          for (const b of mische(a.wahl.slice())) {
            const kn = knopf('szene-bild', bild(b), () => {
              if (fertig || kn.classList.contains('erloschen')) return;
              if (b !== a.richtig) { kn.classList.add('erloschen'); kn.setAttribute('aria-disabled', 'true'); fertig = true; nochmalLesen(wahl, ++fehl, bilder); return; }
              fertig = true; kn.classList.add('gold');
              setTimeout(() => { if (!feld.isConnected) return; k++; if (k < aufgaben.length) tausche(feld, stelle); else ende(); }, ruhig() ? 250 : 900);
            });
            kn.dataset.b = b; wahl.append(kn);
          }
        };
        bilder();
        feld.replaceChildren(frage, wahl);
      };
      stelle();
      tausche(seite, () => { seite.classList.remove('gleitet', 'dicht', 'einzeln'); seite.replaceChildren(feld); });
    };
    const sinnprobe = () => {
      weiter.classList.add('verborgen'); vorgezeigt.classList.add('verborgen');
      const sn = waehleSinn(teil, lv), feld = el('div', 'sinn');
      const wahl = el('div', 'sinn-wahl');
      let fertig = false, fehl = 0;
      const bilder = () => {
        fertig = false; wahl.replaceChildren();
        for (const b of mische(sn.wahl.slice())) {
          const kn = knopf('sinn-bild', window.LB.szeneBild(b), () => {
            if (fertig || kn.classList.contains('erloschen')) return;
            if (b.s !== sn.richtig) { kn.classList.add('erloschen'); kn.setAttribute('aria-disabled', 'true'); fertig = true; nochmalLesen(wahl, ++fehl, bilder); return; }
            fertig = true; kn.classList.add('gold'); wahl.classList.add('entschieden'); sammleSzene(sn.richtig);
            setTimeout(() => { if (feld.isConnected) ende(); }, ruhig() ? 250 : 1100);
          });
          kn.dataset.s = b.s; kn.setAttribute('aria-label', 'Bild ' + (wahl.children.length + 1));
          wahl.append(kn);
        }
      };
      bilder();
      feld.append(el('div', 'sinn-satz', satz(sn.satz)), wahl);
      tausche(seite, () => { seite.classList.remove('gleitet', 'dicht', 'einzeln'); seite.replaceChildren(feld); });
    };
    const ende = () => {
      const box = el('div', 'ende');
      const id = istBoss ? 'boss' : lv.id;
      const o = ortZu(teil, id), w = o && o.w;
      if (ohneStocken) {
        const schonGold = !!licht[teil.id][id];
        const wirdMeister = !istBoss && !schonGold && o && !o.ids.includes('boss') && o.ids.every(x => x === id || licht[teil.id][x]);
        licht[teil.id][id] = true; speichern(teil.id);
        const stern = el('div', 'stern-gross'); const st = sym('stern'); stern.append(st);
        seite.classList.add('ruht'); raum.append(stern);
        kommt(stern, 0, 30, 700);
        requestAnimationFrame(() => requestAnimationFrame(() => st.classList.add('an')));
        const zumWegNun = istBoss || wirdMeister;
        const ziel = zumWegNun ? () => weg() : () => titel(teil, schonGold ? { ort: w && w.id } : { ort: w && w.id, neu: id });
        const inhalt = zumWegNun ? [sym('welt'), el('span', null, 'weiter')] : [w ? WEG.ortBild(w.ort, 'klein', w.voegel) : sym('haus'), el('span', null, 'weiter')];
        box.append(knopf('gelesen weiter-knopf', inhalt, ziel, 'weiter'));
      } else {
        box.append(knopf('', 'Nochmal', () => tausche([raum, unten], () => { abbau.forEach(f => f()); abbau = []; raum.replaceChildren(); unten.replaceChildren(); lauf(teil, lv, raum, istBoss); })));
        if (!istBoss && stolper(teil, lv).length) box.append(knopf('', mitSymbol('haus', 'Stolpersteine'), () => level(teil, lv, 'ueben', 'stolper')));
        box.append(knopf('', [w ? WEG.ortBild(w.ort, 'klein', w.voegel) : sym('haus'), el('span', null, 'zum Ort')], () => titel(teil, { ort: w && w.id }), 'zum Ort'));
      }
      if (lv.frage) { const fr = el('p', 'frage-begleitung'); fr.append(sym('mehr'), el('span', null, 'Frage: ' + lv.frage)); box.prepend(fr); }
      tausche(unten, () => unten.replaceChildren(box), { ruhend: true });
    };
  }

  const SCHATZ_SEITE = 1000;
  const SCHATZ_STUFEN = [[0, 10, 0, 0], [2, 20, 1, 0], [4, 25, 2, 0], [7, 30, 2, 1], [11, 35, 2, 2], [15, 40, 3, 2]];
  const schatzStufe = (teil) => {
    const reihe = window.LAUTBUCH_FOLGE.FOLGE.map(f => f.teil).filter(id => TEILE[id] && TEILE[id].schatz);
    const k = Math.max(0, reihe.indexOf(teil.id));
    return SCHATZ_STUFEN.filter(s => k >= s[0]).pop();
  };
  const schirmWinkel = () => (screen.orientation && typeof screen.orientation.angle === 'number') ? screen.orientation.angle
    : (typeof window.orientation === 'number' ? (window.orientation + 360) % 360 : 0);
  function schatzLegen(blatt, teil) {
    const rnd = window.LB.saat('schatz|' + teil.id);
    const [, schraeg, quer, kopf] = schatzStufe(teil);
    const eintraege = teil.schatz.map(s => typeof s === 'string' ? { art: 'satz', text: s } : s);
    const nachLaenge = eintraege.map((e, i) => [i, e.text.length]).sort((a, b) => a[1] - b[1]).map(x => x[0]);
    const winkel = eintraege.map(() => Math.round((rnd() * 2 - 1) * schraeg));
    nachLaenge.slice(0, quer).forEach((i, n) => { winkel[i] = (n % 2 ? -90 : 90) + Math.round((rnd() * 2 - 1) * 6); });
    nachLaenge.slice(quer, quer + kopf).forEach(i => { winkel[i] = 180 + Math.round((rnd() * 2 - 1) * 8); });
    const funde = eintraege.map((e, i) => {
      const f = el('div', 'fund ' + (e.art || 'satz'));
      f.append(el('div', 'fund-text', satz(e.text)));
      if (e.loesung) f.append(el('div', 'fund-loesung', satz(e.loesung)));
      f.addEventListener('click', () => {
        f.classList.remove('leuchtet'); void f.offsetWidth; f.classList.add('leuchtet');
      });
      f.addEventListener('animationend', () => f.classList.remove('leuchtet'));
      f.dataset.winkel = winkel[i];
      if (Math.abs(Math.abs(winkel[i]) - 90) < 30) f.classList.add('quer');
      blatt.append(f);
      return f;
    });
    const RAND = 46, LUFT = 12, S = SCHATZ_SEITE;
    const legen = (kisten, z) => {
      const anker = mische([0, 1, 2, 3, 4, 5, 6, 7, 8], z).map(k => [RAND + (k % 3 + .5) * (S - 2 * RAND) / 3 + (z() - .5) * 80,
        RAND + (Math.floor(k / 3) + .5) * (S - 2 * RAND) / 3 + (z() - .5) * 80]);
      const belegt = [];
      const passt = (x, y, k) => x - k.B / 2 >= RAND && y - k.H / 2 >= RAND && x + k.B / 2 <= S - RAND && y + k.H / 2 <= S - RAND &&
        !belegt.some(o => Math.abs(o.x - x) < (o.B + k.B) / 2 + LUFT && Math.abs(o.y - y) < (o.H + k.H) / 2 + LUFT);
      for (const [n, k] of kisten.entries()) {
        const [ax, ay] = anker[n % anker.length];
        let gefunden = null;
        for (let r = 0; r <= S / 2 + 200 && !gefunden; r += 14) {
          const schritte = Math.max(1, Math.round(2 * Math.PI * r / 22)), start = z() * 2 * Math.PI;
          for (let s = 0; s < schritte; s++) {
            const x = ax + Math.cos(start + s * 2 * Math.PI / schritte) * r, y = ay + Math.sin(start + s * 2 * Math.PI / schritte) * r;
            if (passt(x, y, k)) { gefunden = [x, y]; break; }
          }
        }
        if (!gefunden) return null;
        belegt.push({ x: gefunden[0], y: gefunden[1], B: k.B, H: k.H, k });
      }
      return { belegt, passt };
    };
    for (const schrift of [64, 60, 56, 52, 49, 46, 43, 40, 38, 36, 34, 32, 30, 28, 26, 24]) {
      blatt.style.setProperty('--fund', schrift + 'px');
      const kisten = funde.map((f, i) => {
        const w = f.offsetWidth, h = f.offsetHeight, a = winkel[i] * Math.PI / 180;
        return { f, i, B: Math.abs(w * Math.cos(a)) + Math.abs(h * Math.sin(a)), H: Math.abs(w * Math.sin(a)) + Math.abs(h * Math.cos(a)) };
      }).sort((p, q) => q.B * q.H - p.B * p.H);
      let lage = null;
      let versuch = 0;
      for (; versuch < 24 && !lage; versuch++) lage = legen(kisten, window.LB.saat(`schatz|${teil.id}|${versuch}`));
      if (lage) blatt.dataset.lage = schrift + "|" + (versuch - 1) + "|" + kisten.map(k => Math.round(k.B) + "x" + Math.round(k.H)).join(",");
      if (lage) {
        const { belegt, passt } = lage;
        for (const o of belegt) {
          o.k.f.style.left = o.x.toFixed(1) + 'px'; o.k.f.style.top = o.y.toFixed(1) + 'px';
          o.k.f.style.transform = `translate(-50%, -50%) rotate(${winkel[o.k.i]}deg)`;
        }
        const zier = blatt.querySelector('.blatt-zier');
        for (let n = 0, t = 0; n < 7 && t < 400; t++) {
          const k = { B: 34, H: 34 }, x = RAND + rnd() * (S - 2 * RAND), y = RAND + rnd() * (S - 2 * RAND);
          if (!passt(x, y, k)) continue;
          belegt.push({ x, y, B: 34, H: 34 });
          const st = svgEl('path', { d: 'M0-15l3.6 10.8 11.4.2-9.1 6.8 3.3 11L0 7.6l-9.2 6.2 3.3-11-9.1-6.8 11.4-.2z', class: 'zier-stern',
            transform: `translate(${x.toFixed(0)} ${y.toFixed(0)}) rotate(${Math.round(rnd() * 70)}) scale(${(.55 + rnd() * .4).toFixed(2)})` });
          zier.append(st); n++;
        }
        const masse = funde.map(f => f.offsetWidth + 'x' + f.offsetHeight).join(',');
        const pruefe = () => {
          if (!blatt.isConnected || !funde[0].isConnected || blatt.dataset.neu >= 2 || funde.map(f => f.offsetWidth + 'x' + f.offsetHeight).join(',') === masse) return;
          blatt.dataset.neu = (+blatt.dataset.neu || 0) + 1;
          funde.forEach(f => f.remove()); zier.querySelectorAll('.zier-stern').forEach(s => s.remove());
          schatzLegen(blatt, teil);
        };
        requestAnimationFrame(() => requestAnimationFrame(pruefe)); setTimeout(pruefe, 200);
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(pruefe);
        return;
      }
    }
    funde.forEach((f, i) => { f.style.left = S / 2 + 'px'; f.style.top = ((i + .5) * S / funde.length).toFixed(0) + 'px'; f.style.transform = 'translate(-50%, -50%)'; });
  }
  const svgEl = (tag, attr) => { const e = document.createElementNS('http://www.w3.org/2000/svg', tag); for (const [k, v] of Object.entries(attr)) e.setAttribute(k, v); return e; };
  const blattZier = () => {
    const z = svgEl('svg', { class: 'blatt-zier', viewBox: `0 0 ${SCHATZ_SEITE} ${SCHATZ_SEITE}`, 'aria-hidden': 'true' });
    z.append(svgEl('rect', { x: 26, y: 26, width: SCHATZ_SEITE - 52, height: SCHATZ_SEITE - 52, rx: 22, class: 'zier-rahmen' }));
    const ranke = 'M0 0c26 0 44 10 52 30 6 16 0 30-14 30-12 0-18-10-14-18 4-8 16-6 16 2M0 0c0 26 10 44 30 52 16 6 30 0 30-14 0-12-10-18-18-14-8 4-6 16 2 16';
    for (const [x, y, r] of [[40, 40, 0], [SCHATZ_SEITE - 40, 40, 90], [SCHATZ_SEITE - 40, SCHATZ_SEITE - 40, 180], [40, SCHATZ_SEITE - 40, 270]])
      z.append(svgEl('path', { d: ranke, class: 'zier-ranke', transform: `translate(${x} ${y}) rotate(${r})` }));
    return z;
  };
  const schatzDrucken = (blatt) => {
    const kopie = blatt.cloneNode(true);
    kopie.removeAttribute('style'); kopie.style.setProperty('--fund', blatt.style.getPropertyValue('--fund'));
    kopie.querySelectorAll('.leuchtet').forEach(x => x.classList.remove('leuchtet'));
    window.LB_AUSGABE.pdf([el('div', 'schatz-pdf', kopie)], 'Lautbuch Schatzblatt.pdf');
  };
  function schatz(teil, opt = {}) {
    if (!licht[teil.id].schatz) { licht[teil.id].schatz = true; speichern(teil.id); }
    leer();
    document.body.classList.add('ohne-unten', 'auf-schatz');
    if (opt.galerie) galerieKopf('Schatz'); else oben.append(ortChip(ortZu(teil, 'boss'), null));
    const box = el('div', 'schatz');
    box.dataset.ort = 'schatz'; box.dataset.haupt = '';
    const offen = !!(window.LB_BILDDATEN || {})['ding-truhe-offen'];
    const truhe = el('div', 'schatz-truhe'); truhe.append(WEG.dingBild(offen ? 'truhe-offen' : 'truhe', 84));
    const buehne = el('div', 'schatz-buehne'), blatt = el('div', 'schatzblatt');
    blatt.append(blattZier());
    buehne.append(blatt);
    let griff = 0, seite = 0;
    const start = schirmWinkel();
    const setzen = (gleiten) => {
      const ausgleich = -(schirmWinkel() - start);
      blatt.classList.toggle('gleitet', !!gleiten && !ruhig());
      blatt.style.transform = `translate(-50%, -50%) scale(${(seite / SCHATZ_SEITE).toFixed(4)}) rotate(${griff * 90 + ausgleich}deg)`;
    };
    const drehen = knopf('schatz-knopf', [sym('drehen'), el('span', null, 'drehen')], () => { griff++; setzen(true); }, 'Blatt drehen');
    const drucken = knopf('schatz-knopf', 'drucken', () => schatzDrucken(blatt), 'Schatzblatt drucken');
    const werkzeug = el('div', 'schatz-werkzeug'); werkzeug.append(drehen, drucken);
    box.append(truhe, buehne, werkzeug);
    main.append(box);
    schatzLegen(blatt, teil);
    const quelle = screen.orientation || window, ereignis = screen.orientation ? 'change' : 'orientationchange';
    const messen = () => {
      if (!blatt.isConnected) return;
      const cs = getComputedStyle(main), quer = matchMedia(SCHATZ_QUER).matches;
      const W = main.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      const H = window.innerHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
      const neben = Math.max(truhe.offsetWidth, werkzeug.offsetWidth) + 20, drueber = truhe.offsetHeight + werkzeug.offsetHeight + 28;
      seite = Math.max(160, Math.floor(quer ? Math.min(H, W - neben) : Math.min(W, H - drueber)));
      buehne.style.width = buehne.style.height = seite + 'px';
      setzen(false);
    };
    const ro = new ResizeObserver(messen);
    messen(); ro.observe(main);
    quelle.addEventListener(ereignis, messen);
    abbau.push(() => { ro.disconnect(); quelle.removeEventListener(ereignis, messen); });
  }
  const SCHATZ_QUER = '(orientation: landscape) and (min-aspect-ratio: 5/4)';

  const HR_PDF_NAME = 'Mein_Lautbuch_Handreichung.pdf';
  const handreichungSeiten = () => {
    const H = window.LAUTBUCH_HANDREICHUNG;
    const bloecke = [];
    const kopfBlock = el('div', 'hr-pdf-titel');
    const heute = new Date().toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' });
    kopfBlock.append(el('div', 'hr-pdf-marke', 'Mein Lautbuch'), el('h1', null, H.titel), el('div', 'hr-pdf-unter', 'Handreichung für die Begleitperson · Stand ' + heute));
    bloecke.push([kopfBlock]);
    if (H.einleitung) bloecke.push([el('p', 'hr-pdf-p hr-pdf-einleitung', H.einleitung)]);
    const verz = el('div', 'hr-pdf-verz'); verz.append(el('div', 'hr-pdf-verz-kopf', 'Inhalt'));
    const verzZeilen = [], titelKoepfe = [], hochMarken = [];
    (H.abschnitte || []).forEach((a, i) => {
      const z = el('div', 'hr-pdf-verz-zeile'), nr = el('span', 'hr-pdf-verz-nr', '00');
      z.append(el('span', 'hr-pdf-verz-titel', (i + 1) + '. ' + a.titel), el('span', 'hr-pdf-verz-punkte'), nr);
      verz.append(z); verzZeilen.push([z, nr]);
    });
    bloecke.push([verz]);
    (H.abschnitte || []).forEach((a, i) => {
      const h = el('h2'), hoch = el('span', 'hr-pdf-hoch', '↑ Inhalt');
      h.append(el('span', null, (i + 1) + '. ' + a.titel), hoch); titelKoepfe.push(h); hochMarken.push(hoch);
      const teile = [];
      for (const t of a.teile || []) {
        if (t.p) teile.push(el('p', 'hr-pdf-p', t.p));
        if (t.tipp) teile.push(el('p', 'hr-pdf-tipp', t.tipp));
        if (t.liste) for (const x of t.liste) teile.push(el('p', 'hr-pdf-punkt', x));
      }
      bloecke.push([h, ...teile.splice(0, 1)]);
      for (const t of teile) bloecke.push([t]);
    });
    const bank = el('div', 'hr-pdf-bank'); document.body.append(bank);
    const seiten = [];
    const neu = () => { const s = el('div', 'hr-pdf-seite'), i = el('div', 'hr-pdf-inhalt'); s.append(i); bank.append(s); seiten.push([s, i]); return i; };
    let inhalt = neu();
    const passt = () => inhalt.scrollHeight <= inhalt.clientHeight + 1;
    for (const gruppe of bloecke) {
      inhalt.append(...gruppe);
      if (passt()) continue;
      gruppe.forEach(g => g.remove());
      if (inhalt.children.length) inhalt = neu();
      inhalt.append(...gruppe);
    }
    seiten.forEach(([s], i) => { const fuss = el('div', 'hr-pdf-fuss'); fuss.append(el('span', null, 'Mein Lautbuch · Handreichung'), el('span', null, 'Seite ' + (i + 1) + ' von ' + seiten.length)); s.append(fuss); });
    try { window.__lbHrAbgeschnitten = seiten.filter(([, i]) => i.scrollHeight > i.clientHeight + 1).length; } catch {}
    const seiteVon = (e) => seiten.findIndex(([s]) => s.contains(e));
    const abschnittSeite = titelKoepfe.map(seiteVon);
    verzZeilen.forEach(([, nr], i) => { nr.textContent = String(abschnittSeite[i] + 1); });
    const links = seiten.map(() => []);
    const flaeche = (e, s) => { const r = e.getBoundingClientRect(), p = seiten[s][0].getBoundingClientRect(); return { x: r.left - p.left, y: r.top - p.top, w: r.width, h: r.height }; };
    verzZeilen.forEach(([z], i) => { const s = seiteVon(z); links[s].push(Object.assign(flaeche(z, s), { seite: abschnittSeite[i] + 1 })); });
    const verzSeite = seiteVon(verz);
    hochMarken.forEach((m, i) => { const s = abschnittSeite[i]; links[s].push(Object.assign(flaeche(m, s), { seite: verzSeite + 1 })); });
    try { window.__lbHrAbschnittSeiten = abschnittSeite.map(x => x + 1); window.__lbHrVerzNr = verzZeilen.map(([, nr]) => nr.textContent); } catch {}
    const ergebnis = seiten.map(([s]) => s);
    ergebnis.forEach(s => s.remove());
    bank.remove();
    return { seiten: ergebnis, links };
  };
  async function handreichungPdf() {
    if (!window.LB_AUSGABE || !window.LAUTBUCH_HANDREICHUNG) return;
    try { if (document.fonts && document.fonts.ready) await document.fonts.ready; } catch {}
    const { seiten, links } = handreichungSeiten();
    try { window.__lbHrSeiten = seiten.length; window.__lbHrText = seiten.map(s => s.textContent); } catch {}
    window.LB_AUSGABE.pdf(seiten, HR_PDF_NAME, { satz: '… die Handreichung wird gemacht', hinweis: 'Die Handreichung. Zum Sichern das Teilen-Symbol des Geräts nutzen.', links });
  }

  function handreichung() {
    const H = window.LAUTBUCH_HANDREICHUNG;
    const d = el('dialog', 'schublade handreichung');
    d.setAttribute('aria-label', H.titel);
    const zu = () => geht(d, 12).then(() => d.close());
    const kopf = el('div', 'schublade-kopf');
    kopf.append(el('h2', null, H.titel));
    if (window.LB_AUSGABE && window.jspdf && typeof html2canvas !== 'undefined') kopf.append(knopf('hr-pdf', 'Als PDF speichern', () => zu().then(() => handreichungPdf()), 'Handreichung als PDF speichern'));
    kopf.append(knopf('ikon schliessen', '×', zu, 'schließen'));
    const inhalt = el('div', 'hr-inhalt');
    if (H.einleitung) inhalt.append(el('p', 'hr-einleitung', H.einleitung));
    const verzeichnis = el('nav', 'hr-verzeichnis'); verzeichnis.setAttribute('aria-label', 'Inhalt');
    inhalt.append(verzeichnis);
    const springe = (e) => e.scrollIntoView({ behavior: ruhig() ? 'auto' : 'smooth', block: 'start' });
    (H.abschnitte || []).forEach((a, i) => {
      const sek = el('section', 'hr-abschnitt'), nr = (i + 1) + '. ';
      const h = el('h3'); if (a.symbol) h.append(sym(a.symbol)); h.append(el('span', null, nr + a.titel));
      const zeile = el('div', 'hr-titelzeile');
      zeile.append(h, knopf('hr-hoch', '↑ Inhalt', () => springe(verzeichnis), 'Zurück zum Inhaltsverzeichnis'));
      sek.append(zeile);
      for (const t of a.teile || []) {
        if (t.p) sek.append(el('p', null, t.p));
        if (t.tipp) sek.append(el('p', 'hr-tipp', t.tipp));
        if (t.liste) { const ul = el('ul'); for (const x of t.liste) ul.append(el('li', null, x)); sek.append(ul); }
      }
      inhalt.append(sek);
      verzeichnis.append(knopf('hr-sprung', nr + a.titel, () => springe(sek)));
    });
    d.append(kopf, inhalt);
    d.addEventListener('close', () => d.remove());
    document.body.append(d);
    d.showModal();
    kommt(d, 0, 16, 360);
  }

  const bestaetigt = (b, frage) => {
    if (b.dataset.frage) return true;
    const alt = b.textContent;
    b.dataset.frage = '1'; b.textContent = frage;
    setTimeout(() => { delete b.dataset.frage; if (b.isConnected) b.textContent = alt; }, 4000);
    return false;
  };

  const LOESCH_UMFANG = [
    ['lichter', 'Lichter und Boss', false, true],
    ['haken', 'Zeilen-Haken', false, true],
    ['steine', 'Stolpersteine', false, true],
    ['gold', 'Gold der Bilder- und Abtipp-Aufgaben, Schatz', false, true],
    ['galerie', 'Galerie', false, false],
    ['mitbringsel', 'Mitbringsel und Bewohner-Plätze', false, false],
    ['figur', 'Gewählte Figur', true, false],
    ['zimmer', 'Zimmer', true, false],
    ['buecher', 'Bücher', false, false],
    ['name', 'Name', true, false],
    ['einst', 'Einstellungen', true, false]
  ];
  const LOESCH_KEYS = { bwGesehen: 'lautbuch.bewohner.gesehen.v1', bwPlatz: 'lautbuch.bewohner.platz.v1', zimmer: ['lautbuch.zimmer.v1', 'lautbuch.zimmer.karten.v1', 'lautbuch.zimmer.rad.v1'],
    buecher: 'lautbuch.buecher.v1', name: 'lautbuch.name.v1', einst: [EINST_KEY, 'lautbuch.schreibung.v1'] };
  const entferne = (k) => { try { localStorage.removeItem(k); } catch {} };
  const loeschTeile = () => ((window.LAUTBUCH_FOLGE || {}).FOLGE || []).map(f => TEILE[f.teil]).filter(Boolean);
  const loescheWahl = (start, umfang) => {
    const F = loeschTeile(), ab = !!start;
    const teilWeg = (t) => !ab || F.indexOf(t) >= start.ti;
    const behalte = (t, lvId) => {
      if (!ab) return false;
      const i = F.indexOf(t);
      return i < start.ti || (i === start.ti && t.level.slice(0, start.li).some(l => l.id === lvId));
    };
    for (const t of F) {
      const o = licht[t.id]; if (!o) continue;
      if (umfang.lichter) for (const k of Object.keys(o)) if (/^(l\d+|p\d+|boss)$/.test(k) && !behalte(t, k)) delete o[k];
      if (umfang.gold && teilWeg(t)) for (const k of ['bilder', 'tippen', 'geschichte', 'bilderOffen', 'schatz']) delete o[k];
      for (const [feld, schalter] of [['marken', 'haken'], ['stolper', 'steine']]) {
        if (!umfang[schalter] || !o[feld]) continue;
        for (const k of Object.keys(o[feld])) if (!behalte(t, feld === 'marken' ? k.split('|')[0] : k)) delete o[feld][k];
        if (!Object.keys(o[feld]).length) delete o[feld];
      }
      speichern(t.id);
    }
    if (umfang.lichter || umfang.haken || umfang.steine || umfang.gold) {
      if (!ab) entferne(LESEZEICHEN_KEY);
      else { const t = F[start.ti], lv = t.level[start.li]; schreib(LESEZEICHEN_KEY, { teil: t.id, level: lv.id, blatt: (lv.blaetter || t.blaetter)[0][0] }); }
    }
    if (umfang.galerie) {
      if (!ab) entferne(GALERIE_KEY);
      else {
        const g = lies(GALERIE_KEY, {}) || {}, bleibt = new Set();
        for (const t of F) if (!teilWeg(t)) for (const w of bildPool(t)) bleibt.add(bildSchluessel(w));
        for (const t of F) if (teilWeg(t)) for (const w of bildPool(t)) { const k = bildSchluessel(w); if (!bleibt.has(k)) delete g[k]; }
        schreib(GALERIE_KEY, g);
      }
    }
    if (umfang.mitbringsel || umfang.figur) {
      const fs = figurStand();
      if (umfang.mitbringsel) fs.gezeigt = !ab ? [] : (fs.gezeigt || []).filter(id => { const p = String(id).split('.'); return behalte(TEILE[p[0]], p[1]); });
      if (umfang.figur) fs.wer = null;
      schreib(FIGUR_KEY, fs);
    }
    if (umfang.mitbringsel) {
      const weg_ = new Set();
      for (const t of F) if (teilWeg(t)) for (const b of t.bewohner || []) weg_.add(b.s);
      const gesehen = lies(LOESCH_KEYS.bwGesehen, null);
      if (!ab) entferne(LOESCH_KEYS.bwGesehen); else if (Array.isArray(gesehen)) schreib(LOESCH_KEYS.bwGesehen, gesehen.filter(s => !weg_.has(s)));
      const platz = lies(LOESCH_KEYS.bwPlatz, null);
      if (!ab) entferne(LOESCH_KEYS.bwPlatz);
      else if (platz && typeof platz === 'object') { for (const lage of Object.values(platz)) if (lage && typeof lage === 'object') for (const s of weg_) delete lage[s]; schreib(LOESCH_KEYS.bwPlatz, platz); }
      const z = lies(LOESCH_KEYS.zimmer[0], null);
      if (z && typeof z === 'object') {
        if (Array.isArray(z.drinnen)) z.drinnen = z.drinnen.filter(s => !weg_.has(s));
        if (Array.isArray(z.hinaus)) z.hinaus = z.hinaus.filter(s => !weg_.has(s));
        for (const s of weg_) if (z.seit) delete z.seit[s];
        if (z.sicht && Array.isArray(z.sicht.bew)) z.sicht.bew = z.sicht.bew.filter(s => !weg_.has(s));
        schreib(LOESCH_KEYS.zimmer[0], z);
      }
    }
    if (umfang.zimmer) LOESCH_KEYS.zimmer.forEach(entferne);
    if (umfang.buecher || umfang.name) {
      const bs = lies(LOESCH_KEYS.buecher, null);
      if (bs && typeof bs === 'object') {
        if (umfang.buecher) for (const f of ['gefunden', 'seite', 'gelesen']) {
          if (!bs[f]) continue;
          if (!ab) delete bs[f];
          else for (const id of Object.keys(bs[f])) {
            const nach = id === 'reise' ? 'ziel' : ((window.LAUTBUCH_BUECHER || {})[id] || {}).nach;
            if (teilWeg(TEILE[nach] || F[F.length - 1])) delete bs[f][id];
          }
        }
        if (umfang.name) delete bs.ohneName;
        schreib(LOESCH_KEYS.buecher, bs);
      }
      if (umfang.name) entferne(LOESCH_KEYS.name);
    }
    if (umfang.einst) { LOESCH_KEYS.einst.forEach(entferne); for (const k of Object.keys(einst)) delete einst[k]; einst.schreibung = 'gross'; }
  };

  const loeschTeilName = (t) => t.art === 'prolog' ? 'Prolog' : t.art === 'ziel' ? 'Leuchtturm' : t.art === 'regel' ? 'Tor ' + t.id.slice(1) : t.zeichen;
  function loeschenDialog(schublade) {
    const d = el('dialog', 'schublade loeschen');
    d.setAttribute('aria-label', 'Lichter löschen');
    const zu = () => geht(d, 12).then(() => d.close());
    const kopf = el('div', 'schublade-kopf');
    kopf.append(el('h2', null, 'Lichter löschen'), knopf('ikon schliessen', '×', zu, 'schließen'));
    const F = loeschTeile();
    let bereich = 'alles', ti = -1, li = -1;
    const umfang = Object.fromEntries(LOESCH_UMFANG.map(([k, , , v]) => [k, v]));
    const wirkt = (k) => umfang[k] && !(bereich === 'ab' && LOESCH_UMFANG.find(u => u[0] === k)[2]);
    const bereichWahl = gruppe('Bereich', [['alles', 'Alles'], ['ab', 'Ab einer Lektion']], bereich, (w) => { bereich = w; neu(); });
    const teilBox = el('div', 'loesch-chips'), lvBox = el('div', 'loesch-chips');
    const abBlock = el('div', 'loesch-block');
    abBlock.append(el('h3', null, 'Ab welcher Lektion?'), teilBox, lvBox);
    const haken = LOESCH_UMFANG.map(([k, text, nurAlles]) => {
      const kasten = el('span', 'loesch-kasten'); kasten.append(sym('haken'));
      const b = knopf('loesch-haken', [kasten, el('span', null, text)], () => {
        if (b.getAttribute('aria-disabled') === 'true') return;
        umfang[k] = !umfang[k]; neu();
      });
      b.setAttribute('role', 'checkbox'); b.dataset.umfang = k;
      return [k, nurAlles, b];
    });
    const hakenBox = el('div', 'loesch-block loesch-haken-liste');
    hakenBox.append(el('h3', null, 'Was wird gelöscht?'), ...haken.map(h => h[2]));
    const zusammen = el('p', 'meldung loesch-zusammen');
    zusammen.setAttribute('aria-live', 'polite');
    const loeschKnopf = knopf('leise loesch-los', 'Löschen', () => {
      if (loeschKnopf.getAttribute('aria-disabled') === 'true') return;
      if (!bestaetigt(loeschKnopf, 'Wirklich löschen?')) return;
      const u = {}; for (const [k] of LOESCH_UMFANG) if (wirkt(k)) u[k] = true;
      loescheWahl(bereich === 'alles' ? null : { ti, li }, u);
      d.close(); schublade.close(); weg();
    });
    const abbrechen = knopf('leise', 'Abbrechen', zu);
    const aktionen = el('div', 'schublade-knoepfe'); aktionen.append(loeschKnopf, abbrechen);
    function neu() {
      bereichWahl.querySelectorAll('.schreib-wahl').forEach((b, i) => b.setAttribute('aria-pressed', String(['alles', 'ab'][i] === bereich)));
      abBlock.hidden = bereich !== 'ab';
      teilBox.replaceChildren(...F.map((t, i) => {
        const b = knopf('loesch-chip', loeschTeilName(t), () => { ti = i; li = -1; neu(); });
        b.setAttribute('aria-pressed', String(i === ti)); b.dataset.teil = t.id;
        return b;
      }));
      lvBox.replaceChildren(...(ti < 0 ? [] : F[ti].level.map((lv, i) => {
        const b = knopf('loesch-chip', 'Lektion ' + (i + 1), () => { li = i; neu(); });
        b.setAttribute('aria-pressed', String(i === li)); b.dataset.lektion = lv.id;
        return b;
      })));
      lvBox.hidden = ti < 0;
      for (const [k, nurAlles, b] of haken) {
        const aus = bereich === 'ab' && nurAlles;
        b.setAttribute('aria-checked', String(!aus && !!umfang[k]));
        b.setAttribute('aria-disabled', String(aus)); b.classList.toggle('licht-ruht', aus);
        b.title = aus ? 'Nur bei „Alles“' : '';
      }
      const was = LOESCH_UMFANG.filter(([k]) => wirkt(k)).map(([, text]) => text);
      const fortschritt = ['lichter', 'haken', 'steine', 'gold'].some(wirkt);
      let text, bereit = true;
      if (!was.length) { text = 'Nichts gewählt.'; bereit = false; }
      else if (bereich === 'ab' && li < 0) { text = 'Bitte die Lektion wählen, ab der gelöscht wird.'; bereit = false; }
      else {
        const wo = bereich === 'alles' ? 'alles' : 'ab ' + loeschTeilName(F[ti]) + ' · Lektion ' + (li + 1);
        text = 'Gelöscht wird ' + wo + ': ' + was.join(', ') + '.' + (bereich === 'ab' ? ' Alles davor bleibt.' : '')
          + (fortschritt ? (bereich === 'alles' ? ' Das Lesezeichen wird entfernt.' : ' Das Lesezeichen springt zu dieser Lektion.') : '');
      }
      zusammen.textContent = text;
      loeschKnopf.setAttribute('aria-disabled', String(!bereit)); loeschKnopf.classList.toggle('licht-ruht', !bereit);
      delete loeschKnopf.dataset.frage; loeschKnopf.textContent = 'Löschen';
    }
    const inhalt = el('div', 'loesch-inhalt'), fuss = el('div', 'loesch-fuss');
    inhalt.append(el('p', 'meldung', 'Bereich und Umfang wählen. Zum Löschen zweimal „Löschen“ tippen.'), bereichWahl, abBlock, hakenBox);
    fuss.append(zusammen, aktionen);
    d.append(kopf, inhalt, fuss);
    d.addEventListener('close', () => d.remove());
    neu();
    document.body.append(d);
    d.showModal();
    kommt(d, 0, 16, 360);
  }

  function schublade(teil, lv) {
    const d = el('dialog', 'schublade');
    d.setAttribute('aria-label', 'Für die Begleitung');
    const kopf = el('div', 'schublade-kopf');
    const zu = () => geht(d, 12).then(() => d.close());
    kopf.append(el('h2', null, 'Für die Begleitung'), knopf('ikon schliessen', '×', zu, 'schließen'));
    d.append(kopf);
    if (lv && lv.hinweis) { const h = el('p', 'hinweis-lektion'); h.append(sym('haus'), el('span', null, lv.hinweis)); d.append(h); }
    if (window.LAUTBUCH_HANDREICHUNG) {
      const zh = el('div', 'schublade-zeile');
      zh.append(el('span', null, 'Wie begleite ich?'), knopf('', mitSymbol('stern', 'Handreichung'), () => zu().then(() => handreichung()), 'Handreichung'));
      d.append(zh);
    }
    if (vollbildDa && getComputedStyle(sVoll).display === 'none') {
      const zv = el('div', 'schublade-zeile');
      zv.append(el('span', null, 'Bildschirm'), knopf('', mitSymbol('vollbild', imVollbild() ? 'Fenster' : 'Vollbild'), () => zu().then(vollbildUmschalten), 'Vollbild'));
      d.append(zv);
    }

    const eintraege = () => {
      const o = {};
      try { for (let k = 0; k < localStorage.length; k++) { const n = localStorage.key(k); if (n.startsWith('lautbuch.')) o[n] = localStorage.getItem(n); } } catch {}
      return o;
    };
    const lesen = (t) => {
      t = String(t || '').trim();
      try {
        if (t.startsWith('LAUTBUCH1:')) return JSON.parse(decodeURIComponent(escape(atob(t.slice(10)))));
        const j = JSON.parse(t);
        return j && j.art === 'Mein Lautbuch Sicherung' && j.daten && typeof j.daten === 'object' ? j.daten : null;
      } catch { return null; }
    };
    const meldung = el('span', 'meldung');
    const sichern = knopf('', 'Sichern', () => {
      const heute = new Date(), tag = heute.getFullYear() + '-' + String(heute.getMonth() + 1).padStart(2, '0') + '-' + String(heute.getDate()).padStart(2, '0');
      const inhalt = JSON.stringify({ art: 'Mein Lautbuch Sicherung', version: 1, datum: heute.toISOString(), daten: eintraege() });
      const blob = new Blob([inhalt], { type: 'application/json' });
      let eingebettet = false; try { eingebettet = window.self !== window.top; } catch { eingebettet = true; }
      meldung.textContent = eingebettet ? 'Sicherung erstellt. Kommt keine Datei: das Lautbuch im Browser öffnen und dort sichern.' : 'Sicherung erstellt';
      if (window.LB_AUSGABE) window.LB_AUSGABE.sichern(blob, 'Mein_Lautbuch_Sicherung_' + tag + '.json', '', {
        ok: () => window.dispatchEvent(new Event('lautbuch:gesichert')),
        fehlt: () => { meldung.textContent = 'Hier kann das Lautbuch keine Datei ablegen. Bitte das Lautbuch im Browser öffnen (Safari oder Chrome) und dort „Sichern“ tippen.'; }
      });
    });
    let geladen = null;
    const wahl = document.createElement('input');
    wahl.type = 'file'; wahl.accept = '.json,application/json,.txt,text/plain'; wahl.hidden = true;
    wahl.addEventListener('change', () => {
      const f = wahl.files && wahl.files[0]; wahl.value = '';
      if (!f) return;
      const r = new FileReader();
      r.onload = () => {
        geladen = lesen(r.result);
        einspielen.hidden = !geladen;
        meldung.textContent = geladen ? 'Sicherung gefunden: zweimal „Einspielen“ tippen' : 'keine Sicherung erkannt';
      };
      r.onerror = () => { meldung.textContent = 'Datei nicht lesbar'; };
      r.readAsText(f);
    });
    const laden = knopf('', 'Laden', () => wahl.click());
    const einspielen = knopf('', 'Einspielen', () => {
      const o = geladen;
      if (!o) { meldung.textContent = 'erst eine Sicherung laden'; return; }
      if (!bestaetigt(einspielen, 'Wirklich ersetzen?')) return;
      try {
        for (let k = localStorage.length - 1; k >= 0; k--) { const n = localStorage.key(k); if (n.startsWith('lautbuch.')) localStorage.removeItem(n); }
        for (const [n, v] of Object.entries(o)) if (n.startsWith('lautbuch.')) localStorage.setItem(n, v);
      } catch {}
      for (const id of Object.keys(TEILE)) licht[id] = lies(schluessel(id), {}) || {};
      markenWandeln();
      bereinigeV55();
      Object.assign(einst, { schreibung: 'gross' }, lies(EINST_KEY, {})); delete einst.ruhig;
      window.dispatchEvent(new Event('lautbuch:eingespielt'));
      d.close(); weg();
    });
    const s = el('div', 'schublade-block');
    einspielen.hidden = true;
    const sk = el('div', 'schublade-knoepfe'); sk.append(sichern, laden, einspielen, meldung, wahl);
    s.append(el('h3', null, 'Sicherung'),
      el('p', 'meldung', '„Sichern“ speichert den Stand als Datei. Zum Zurückholen „Laden“ tippen, die Datei wählen und zweimal „Einspielen“ tippen.'),
      sk);
    d.append(s);

    const loeschen = knopf('leise', 'Lichter löschen', () => loeschenDialog(d));
    if (window.LB_APP) window.LB_APP.schublade(d, zu);
    d.append(loeschen);
    d.addEventListener('close', () => d.remove());
    document.body.append(d);
    d.showModal();
    kommt(d, 0, 16, 360);
  }

  const MITTIG = '.zelle, .wort-karte, .kachel, .karteikarte';
  const rahmenVon = (b) => b.closest('.tipp-feld, .ablage') || b;
  const messStift = document.createElement('canvas').getContext('2d');
  const schriftbild = (box) => {
    let oben = Infinity, unten = -Infinity, k = 1;
    const w = document.createTreeWalker(box, NodeFilter.SHOW_TEXT);
    while (w.nextNode()) {
      const n = w.currentNode, t = n.textContent; if (!t.trim()) continue;
      const rg = document.createRange(); rg.selectNodeContents(n);
      const r = rg.getClientRects()[0]; if (!r || !r.height) continue;
      const cs = getComputedStyle(n.parentElement); messStift.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      const m = messStift.measureText(t.trim());
      k = r.height / (m.fontBoundingBoxAscent + m.fontBoundingBoxDescent);
      const grund = r.top + m.fontBoundingBoxAscent * k;
      oben = Math.min(oben, grund - m.actualBoundingBoxAscent * k); unten = Math.max(unten, grund + m.actualBoundingBoxDescent * k);
    }
    for (const s of box.querySelectorAll('.silbe')) { const r = s.getBoundingClientRect(); if (r.height) unten = Math.max(unten, r.bottom); }
    return isFinite(oben) ? { oben, unten, k } : null;
  };
  const mittigAlle = (wurzel = document.body) => {
    const boxen = [...(wurzel.matches && wurzel.matches(MITTIG) ? [wurzel] : []), ...wurzel.querySelectorAll(MITTIG)]
      .filter(b => wurzel === b || !b.classList.contains('fliegt') && !b.classList.contains('zieht'));
    if (!boxen.length) return;
    boxen.forEach(b => b.style.removeProperty('--ruck'));
    const ruck = boxen.map(b => {
      const s = schriftbild(b); if (!s) return null;
      const f = rahmenVon(b), r = f.getBoundingClientRect(); if (!r.height) return null;
      const fs = getComputedStyle(f);
      const iT = r.top + parseFloat(fs.borderTopWidth) * s.k, iB = r.bottom - parseFloat(fs.borderBottomWidth) * s.k;
      return ((iB - s.unten) - (s.oben - iT)) / 2 / s.k;
    });
    boxen.forEach((b, i) => { if (ruck[i] != null && Math.abs(ruck[i]) >= .4) b.style.setProperty('--ruck', ruck[i].toFixed(1) + 'px'); });
  };
  let mittigGeplant = false;
  const mittigBald = () => { if (mittigGeplant) return; mittigGeplant = true; queueMicrotask(() => { mittigGeplant = false; mittigAlle(); }); };
  new MutationObserver(mittigBald).observe(document.body, { childList: true, subtree: true, characterData: true });
  addEventListener('resize', mittigBald);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(mittigBald);

  weg = sanft(weg); sammlung = sanft(sammlung); titel = sanft(titel); level = sanft(level); bilderRaum = sanft(bilderRaum);
  wiederholen = sanft(wiederholen); bossRaum = sanft(bossRaum); schatz = sanft(schatz);
  galerie = sanft(galerie); druckRaum = sanft(druckRaum); zimmer = sanft(zimmer);
  weg();
})();
