(() => {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const K_ZIMMER = 'lautbuch.zimmer.v1', K_KARTEN = 'lautbuch.zimmer.karten.v1', K_RAD = 'lautbuch.zimmer.rad.v1';
  const KURVE = 'cubic-bezier(.22,.61,.36,1)';
  let A = null;

  const el = (tag, cls, inhalt) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (inhalt != null) for (const x of [].concat(inhalt)) if (x != null) e.append(x);
    return e;
  };
  const sv = (tag, attr, kinder) => {
    const e = document.createElementNS(NS, tag);
    for (const [k, v] of Object.entries(attr || {})) e.setAttribute(k, v);
    for (const k of kinder || []) if (k) e.append(k);
    return e;
  };
  let gesperrtBis = 0;
  const tipp = (e, fn) => { e.addEventListener('click', (ev) => { const t = performance.now(); if (t < gesperrtBis) return; gesperrtBis = t + 500; fn(ev); }); return e; };
  const knopf = (cls, inhalt, fn, label) => { const b = el('button', 'knopf ' + cls, inhalt); b.type = 'button'; if (label) b.setAttribute('aria-label', label); return tipp(b, fn); };
  const css = (e, w) => { for (const [k, v] of Object.entries(w)) k.startsWith('--') ? e.style.setProperty(k, v) : (e.style[k] = v); return e; };
  const ruhig = () => (A && A.ruhig) ? A.ruhig() : matchMedia('(prefers-reduced-motion: reduce)').matches;
  const warte = (ms) => new Promise(r => setTimeout(r, ms));
  const fertig = (a, ms) => Promise.race([a && a.finished ? a.finished.catch(() => {}) : Promise.resolve(), warte((ms || 600) + 250)]);
  const LB = () => window.LB;
  const gemalt = (k) => !!((window.LB_BILDDATEN || {})[k] || {}).farbe;
  const ding = (k, cls) => gemalt(k) ? LB().bild(k, cls) : null;
  const lies = (k, e) => A.lies(k, e), schreib = (k, v) => A.schreib(k, v);

  const WELT = () => window.LAUTBUCH_WELT;
  const FOLGE = () => ((window.LAUTBUCH_FOLGE || {}).FOLGE || []).map(f => f.teil).filter((x, i, a) => a.indexOf(x) === i);
  const lautStand = (l) => WELT().stand(l, A.licht);
  const bewohnerListe = () => {
    const seen = new Set(), out = [];
    for (const x of A.bewohner || []) { const b = Array.isArray(x) ? x[0] : x; if (b && b.s && !seen.has(b.s)) { seen.add(b.s); out.push(b); } }
    return out;
  };
  const GALERIE_KEY = 'lautbuch.galerie.v1';
  const gesammeltVon = (t, w, g) => A.istGesammelt ? A.istGesammelt(t, w, g) : !!(A.licht[t.id].bilder || A.licht[t.id].tippen || g[LB().bildSchluessel(w)]);
  const orteMitBildern = () => {
    if (A.galerieOrte) return A.galerieOrte();
    const stand = A.wegStand(), schon = new Set(), liste = [];
    for (const w of A.WEG.teile) {
      const t = A.TEILE[w.teil || w.id]; if (!t || schon.has(t.id)) continue;
      const s = stand[w.id]; if (s === 'nebel' || s === 'rand') continue;
      const pool = LB().bildPool(t); if (!pool.length) continue;
      schon.add(t.id); liste.push({ w, t, pool });
    }
    return liste;
  };
  const hierOrt = () => { const st = A.wegStand(); return A.WEG.teile.find(w => st[w.id] === 'hier') || [...A.WEG.teile].reverse().find(w => st[w.id] === 'meister') || A.WEG.teile[0]; };
  const leseWoerter = () => {
    const out = [];
    for (const id of FOLGE()) {
      const t = A.TEILE[id], li = A.licht[id] || {}; if (!t) continue;
      const spaeter = FOLGE().slice(FOLGE().indexOf(id) + 1).some(s => Object.keys(A.licht[s] || {}).some(k => /^(l\d+|p\d+|boss)$/.test(k) && A.licht[s][k] === true));
      for (const lv of t.level) if (li[lv.id] || li.boss || spaeter) for (const w of (lv.woerter || []).flat()) if (typeof w === 'string' && !out.includes(w)) out.push(w);
    }
    return out.slice(0, 60);
  };
  const offeneSchaetze = () => FOLGE().map(id => A.TEILE[id]).filter(t => t && t.schatz && (A.licht[t.id] || {}).schatz);
  const jetztStand = () => {
    const laute = {};
    WELT().zonen.forEach(z => z.laute.forEach(l => { const s = lautStand(l); if (s !== 'nebel') laute[z.id + ':' + l.g] = s; }));
    return { laute, bew: bewohnerListe().map(b => b.s), schatz: offeneSchaetze().map(t => t.id), buecher: A.buecher ? A.buecher.gefunden() : [] };
  };
  const gesammelteBilder = () => {
    const g = lies(GALERIE_KEY, {}) || {}, out = [];
    for (const { t, pool } of orteMitBildern()) for (const wort of pool) if (gesammeltVon(t, wort, g)) out.push(LB().bildSchluessel(wort));
    return out;
  };
  const neuDa = (api) => {
    A = api;
    const z = lies(K_ZIMMER, {}) || {}, s = z.sicht, j = jetztStand();
    const bs = (lies('lautbuch.buecher.v1', {}) || {}).seite || {};
    if (j.buecher.some(id => !(id in bs))) return true;
    if (!s) return Object.keys(j.laute).length + j.bew.length + j.schatz.length > 0 || gesammelteBilder().length > 0;
    if (Object.entries(j.laute).some(([k, v]) => (s.laute || {})[k] !== v)) return true;
    if (j.bew.some(x => !(s.bew || []).includes(x)) || j.schatz.some(x => !(s.schatz || []).includes(x))) return true;
    const ges = Array.isArray(z.gesehen) ? z.gesehen : [];
    return gesammelteBilder().some(k => !ges.includes(k));
  };
  const PLAETZE = 3;
  const zLesen = (api) => { if (api && api.lies) return api.lies(K_ZIMMER, {}) || {}; try { return JSON.parse(localStorage.getItem(K_ZIMMER) || '{}') || {}; } catch { return {}; } };
  const zSchreiben = (api, z) => { if (api && api.schreib) api.schreib(K_ZIMMER, z); else localStorage.setItem(K_ZIMMER, JSON.stringify(z)); };
  const heute = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
  const abgelaufen = (z, s) => { const t = (z.seit || {})[s]; return typeof t === 'string' && t < heute(); };
  const einziehen = (s, api) => {
    if (typeof s !== 'string' || !s.startsWith('bw-')) return { drin: false, raus: null };
    const z = zLesen(api), drinnen = (Array.isArray(z.drinnen) ? z.drinnen : []).filter(x => !abgelaufen(z, x));
    z.seit = Object.assign({}, z.seit); z.hinaus = (z.hinaus || []).filter(x => x !== s);
    if (drinnen.includes(s)) return { drin: true, raus: null };
    const raus = drinnen.length >= PLAETZE ? drinnen.shift() : null;
    drinnen.push(s); z.drinnen = drinnen; z.seit[s] = heute();
    for (const x of drinnen) if (!z.seit[x]) z.seit[x] = heute();
    for (const k of Object.keys(z.seit)) if (!drinnen.includes(k)) delete z.seit[k];
    zSchreiben(api, z);
    return { drin: true, raus };
  };
  const auszug = (api) => {
    const z = zLesen(api), drinnen = Array.isArray(z.drinnen) ? z.drinnen : [];
    const weg = drinnen.filter(x => abgelaufen(z, x)), raus = [...new Set([...(z.hinaus || []), ...weg])];
    const ohneTag = drinnen.filter(x => !raus.includes(x) && !(z.seit || {})[x]);
    if (!raus.length && !ohneTag.length) return [];
    z.seit = Object.assign({}, z.seit); for (const x of ohneTag) z.seit[x] = heute();
    if (!raus.length) { zSchreiben(api, z); return []; }
    z.drinnen = drinnen.filter(x => !raus.includes(x)); z.hinaus = [];
    z.seit = Object.assign({}, z.seit); for (const k of raus) delete z.seit[k];
    zSchreiben(api, z);
    return raus;
  };
  const silbenName = (b) => {
    const ziel = String(b.wer || '').toLowerCase();
    for (const t of Object.values(A.TEILE)) for (const lv of t.level || []) for (const w of (lv.woerter || []).flat())
      if (typeof w === 'string' && w.replace(/-/g, '').toLowerCase() === ziel) return w;
    return b.wer || '';
  };

  const drucken = (seiten, name, opt) => { if (window.LB_AUSGABE && window.LB_AUSGABE.pdf) window.LB_AUSGABE.pdf(seiten, name, opt || {}); };

  function bauen(wurzel, api) {
    A = api;
    const zst = Object.assign({ drinnen: [], gesehen: null }, lies(K_ZIMMER, {}) || {});
    const merke = () => schreib(K_ZIMMER, zst);
    const land = el('div', 'zimmer-land');
    land.dataset.haupt = ''; land.dataset.ort = 'zimmer';
    const szene = el('div', 'z-szene' + (gemalt('ding-fenster') ? ' gemalt' : ''));
    const nah = el('div', 'z-nah'); nah.setAttribute('aria-hidden', 'true');
    const ebene = el('div', 'z-ebene'); ebene.setAttribute('aria-hidden', 'true');
    land.append(szene, nah, ebene);
    wurzel.append(land);
    szene.append(el('div', 'z-wand'), el('div', 'z-boden'));

    let quelle = null, nahZug = 0;
    const flip = (von, k, hin) => {
      const a = von.getBoundingClientRect(), b = k.getBoundingClientRect();
      const t = `translate(${a.left + a.width / 2 - (b.left + b.width / 2)}px, ${a.top + a.height / 2 - (b.top + b.height / 2)}px) scale(${Math.max(.15, a.width / b.width)})`;
      return k.animate(hin ? [{ transform: t, opacity: .4 }, { transform: 'none', opacity: 1 }] : [{ transform: 'none', opacity: 1 }, { transform: t, opacity: 0 }],
        { duration: ruhig() ? 1 : (hin ? 460 : 380), easing: KURVE, fill: hin ? 'none' : 'forwards' });
    };
    const zeige = (von, inhalt, cls) => {
      quelle = von; nahZug++;
      const k = el('div', 'z-karte' + (cls ? ' ' + cls : ''), inhalt);
      k.addEventListener('click', (ev) => { if (ev.target.closest('button')) ev.stopPropagation(); });
      nah.replaceChildren(k); nah.classList.add('offen'); nah.setAttribute('aria-hidden', 'false');
      flip(von, k, true);
    };
    const schliesse = async () => {
      const k = nah.firstChild;
      if (!k) { nah.classList.remove('offen'); nah.setAttribute('aria-hidden', 'true'); return; }
      const zug = ++nahZug;
      nah.classList.remove('offen');
      if (quelle && quelle.isConnected) await fertig(flip(quelle, k, false), 400);
      if (zug !== nahZug) return;
      nah.replaceChildren(); nah.setAttribute('aria-hidden', 'true');
    };
    tipp(nah, schliesse);

    const teppich = el('div', 'z-ding z-teppich', ding('ding-teppich'));
    szene.append(teppich);

    const flur = el('div', 'z-ding z-flur');
    const g = lies(GALERIE_KEY, {}) || {};
    const alleGesammelt = [];
    const B = window.LB_BILDDATEN || {};
    const orte = orteMitBildern();
    const koepfe = [];
    orte.forEach(({ w, t, pool }) => {
      const feld = el('div', 'z-rahmenfeld');
      for (const wort of pool) {
        const k = LB().bildSchluessel(wort), hat = gesammeltVon(t, wort, g);
        const r = el('div', 'z-rahmen' + (hat ? '' : ' offen'));
        const rahmenBild = gemalt('ding-rahmen') ? LB().bild('ding-rahmen', 'z-rahmen-bild', 'farbe', true) : null; if (rahmenBild) r.append(rahmenBild);
        if (hat) {
          alleGesammelt.push(k);
          const innen = el('div', 'z-rahmen-innen', LB().bild(k, '', 'farbe', true));
          r.prepend(innen); r.dataset.k = k;
          tipp(r, () => {
            const name = el('div', 'z-name z-bildwort', LB().wort(wort));
            zeige(r, [LB().bild(k, 'z-gross'), name]);
            if (!ruhig()) name.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 420, delay: 360, easing: 'ease-out', fill: 'backwards' });
          });
        }
        feld.append(r);
      }
      const wand = el('div', 'z-wandstueck', feld); wand.setAttribute('role', 'group'); wand.setAttribute('aria-label', 'Bilder von ' + (w.teil ? w.zeichen.join('') : t.zeichen));
      koepfe.push({ w, t }); flur.append(wand);
    });
    if (orte.length) szene.append(flur);
    let holzNr = 0;
    const holzpfeil = () => {
      const bild = ding('ding-pfeil', 'z-holzpfeil'); if (bild) return bild;
      const id = 'z-holz-' + (++holzNr);
      return sv('svg', { class: 'z-holzpfeil', viewBox: '0 0 124 68', 'aria-hidden': 'true' }, [
        sv('defs', {}, [sv('linearGradient', { id, x1: 0, y1: 0, x2: 0, y2: 1 }, [sv('stop', { offset: 0, 'stop-color': '#e3a35a' }), sv('stop', { offset: .55, 'stop-color': '#c47e3a' }), sv('stop', { offset: 1, 'stop-color': '#a86428' })])]),
        sv('path', { d: 'M10 17h72V6l36 28-36 28V51H10a6 6 0 0 1-6-6V23a6 6 0 0 1 6-6z', fill: `url(#${id})`, stroke: '#3b2414', 'stroke-width': 3.2, 'stroke-linejoin': 'round' }),
        sv('path', { d: 'M14 27h58M18 38h50M84 22l14 11', fill: 'none', stroke: 'rgb(90 50 20 / .45)', 'stroke-width': 1.6, 'stroke-linecap': 'round' }),
        sv('circle', { cx: 16, cy: 34, r: 2.6, fill: '#5a3a22' })]);
    };
    const blaettern = (richtung) => {
      const b = el('button', 'z-blaettern ' + (richtung < 0 ? 'zurueck' : 'vor'), holzpfeil());
      b.type = 'button'; b.setAttribute('aria-label', richtung < 0 ? 'Bilder zurück' : 'Bilder vor');
      return tipp(b, () => {
        if (b.getAttribute('aria-disabled') === 'true') return;
        if (!zst.gewischt) { zst.gewischt = true; merke(); }
        const ws = [...flur.querySelectorAll('.z-wandstueck')], max = flur.scrollWidth - flur.clientWidth;
        const ziel = ws[Math.max(0, Math.min(ws.length - 1, aktuell() + richtung))];
        flur.scrollTo({ left: Math.min(ziel.offsetLeft, max), behavior: ruhig() ? 'auto' : 'smooth' });
      });
    };
    const aktuell = () => {
      const ws = [...flur.querySelectorAll('.z-wandstueck')], x = flur.scrollLeft, max = flur.scrollWidth - flur.clientWidth;
      if (ws.length && x >= max - 4) return ws.length - 1;
      return ws.reduce((n, w, k) => (Math.abs(w.offsetLeft - x) < Math.abs(ws[n].offsetLeft - x) ? k : n), 0);
    };
    const zurueckK = blaettern(-1), vorK = blaettern(1);
    const mitte = el('div', 'z-kopf-mitte'); mitte.setAttribute('aria-live', 'polite');
    const kopf = el('div', 'z-flurkopf', orte.length > 1 ? [zurueckK, mitte, vorK] : [mitte]);
    if (orte.length) szene.append(kopf);
    let kopfNr = -1;
    const kopfZeigen = (i) => {
      if (i === kopfNr || !koepfe[i]) return;
      const erst = kopfNr < 0; kopfNr = i;
      const { w, t } = koepfe[i], z = el('span', 'z-zeichen'); z.append(LB().faerbe(w.teil ? w.zeichen.join('') : t.zeichen));
      mitte.replaceChildren(A.WEG.ortBild(w.ort, 'klein', w.voegel), z);
      if (!erst && !ruhig()) mitte.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 260, easing: 'ease-out' });
    };
    const rand = () => {
      const max = flur.scrollWidth - flur.clientWidth, links = flur.scrollLeft > 4, rechts = flur.scrollLeft < max - 4;
      flur.classList.toggle('z-mehr-rechts', rechts); flur.classList.toggle('z-mehr-links', links);
      zurueckK.setAttribute('aria-disabled', String(!links)); vorK.setAttribute('aria-disabled', String(!rechts));
      css(kopf, { left: flur.offsetLeft + 'px', top: flur.offsetTop + 'px', width: flur.offsetWidth + 'px' });
      kopfZeigen(aktuell());
    };
    flur.addEventListener('scroll', rand, { passive: true });
    rand();
    if (window.ResizeObserver) new ResizeObserver(rand).observe(flur);
    let zieh = null;
    flur.addEventListener('pointerdown', (ev) => { if (ev.pointerType !== 'mouse') return; zieh = { x: ev.clientX, s: flur.scrollLeft, id: ev.pointerId, aktiv: false }; });
    flur.addEventListener('pointermove', (ev) => {
      if (!zieh) return;
      if (!zieh.aktiv) { if (Math.abs(ev.clientX - zieh.x) < 6) return; zieh.aktiv = true; try { flur.setPointerCapture(zieh.id); } catch {} css(flur, { scrollSnapType: 'none' }); }
      flur.scrollLeft = zieh.s - (ev.clientX - zieh.x);
    });
    const ziehAus = () => { if (zieh) { zieh = null; css(flur, { scrollSnapType: '' }); } };
    flur.addEventListener('pointerup', ziehAus); flur.addEventListener('pointercancel', ziehAus);

    if (!Array.isArray(zst.gesehen)) { zst.gesehen = alleGesammelt.slice(); merke(); }
    const neu = alleGesammelt.filter(k => !zst.gesehen.includes(k));
    const malbar = (r, i) => { const roh = B[r.dataset.k]; return i < 3 && !ruhig() && roh && roh.linie && roh.farbe; };
    neu.map(k => flur.querySelector('.z-rahmen[data-k="' + k + '"]')).filter(Boolean).forEach((r, i) => { if (malbar(r, i)) r.querySelector('.z-rahmen-innen').replaceChildren(); });
    const ausmalen = async () => {
      const rs = neu.map(k => flur.querySelector('.z-rahmen[data-k="' + k + '"]')).filter(Boolean);
      if (rs.length) { const wand = rs[0].closest('.z-wandstueck'); flur.scrollTo({ left: wand.offsetLeft, behavior: ruhig() ? 'auto' : 'smooth' }); }
      for (const [i, r] of rs.entries()) {
        const k = r.dataset.k;
        if (!malbar(r, i)) continue;
        const innen = r.querySelector('.z-rahmen-innen');
        const linie = LB().bild(k, 'z-linie', 'linie'), farbe = LB().bild(k, 'z-farbe');
        css(farbe, { clipPath: 'circle(0% at 50% 50%)' });
        innen.replaceChildren(linie, farbe);
        await warte(i ? 300 : 900);
        linie.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 600, fill: 'forwards' });
        await warte(700);
        await fertig(farbe.animate([{ clipPath: 'circle(0% at 35% 60%)' }, { clipPath: 'circle(75% at 50% 50%)' }], { duration: 1600, easing: 'cubic-bezier(.45,.05,.4,1)', fill: 'forwards' }), 1600);
        css(farbe, { clipPath: 'none' });
      }
      zst.gesehen = alleGesammelt.slice(); merke();
    };

    const klotz = (l, gross) => {
      const k = el('div', 'z-klotz ' + lautStand(l) + (l.g.length > 1 ? ' lang' : ''));
      if (gross) { const b = ding('ding-klotz', 'z-klotz-bild'); if (b) { k.append(b); k.classList.add('mit-bild'); } }
      k.append(el('span', 'z-laut ' + (WELT().zonen.find(z => z.laute.includes(l)) || {}).id, l.g));
      return k;
    };
    const TAKT = .95, STUFE = .58, HOEHE = .98;
    const pyramide = (n, B, H) => {
      let best = null;
      for (let L = 1; L <= 4; L++) {
        let b = 1; const fasst = () => { let s = 0; for (let r = 0; r < L; r++) s += Math.max(0, b - r); return s; };
        while (fasst() < n) b++;
        const s = Math.min(3, B / ((b - 1) * TAKT + 1), H / (HOEHE + (L - 1) * STUFE));
        if (!best || s > best.s + 1e-6) best = { L, b, s };
      }
      return best;
    };
    const regal = el('div', 'z-ding z-regal');
    const rb = ding('ding-regal', 'z-regal-bild'); if (rb) regal.append(rb);
    const kloetze = new Map(), bretter = new Map();
    WELT().zonen.forEach(z => {
      const br = el('div', 'z-brett ' + z.id);
      for (const l of z.laute) { const k = klotz(l, true); kloetze.set(z.id + ':' + l.g, k); br.append(k); }
      bretter.set(z.id, br); regal.append(br);
    });
    const stapeln = () => {
      const fs = parseFloat(getComputedStyle(szene).fontSize) || 10;
      for (const [zid, br] of bretter) {
        const r = br.getBoundingClientRect(), ks = [...br.querySelectorAll('.z-klotz')];
        const p = pyramide(ks.length, r.width ? r.width / fs * .94 : 13, r.height ? r.height / fs * .95 : 4.3);
        css(br, { '--s': p.s.toFixed(3) + 'em' });
        let i = 0;
        for (let reihe = 0; i < ks.length; reihe++) {
          const zahl = Math.min(p.b - reihe, ks.length - i), breit = (zahl - 1) * TAKT + 1;
          for (let j = 0; j < zahl; j++, i++) css(ks[i], { left: `calc(50% + ${(j * TAKT - breit / 2).toFixed(3)}em)`, bottom: `${(reihe * STUFE + .12 / p.s).toFixed(3)}em` });
        }
      }
    };
    tipp(regal, () => zeige(regal, [el('div', 'z-laute-nah', WELT().zonen.map(z => el('div', 'z-zone-nah', [el('h3', null, z.name), el('div', 'z-zone ' + z.id, z.laute.map(l => klotz(l, true)))])))], 'laute'));
    szene.append(regal);
    stapeln();
    if (window.ResizeObserver) new ResizeObserver(() => stapeln()).observe(regal);

    const offen = offeneSchaetze();
    const truhe = el('div', 'z-ding z-truhe', offen.length ? (LB().bild('ding-truhe-offen') || LB().bild('ding-truhe')) : LB().bild('ding-truhe'));
    tipp(truhe, () => {
      if (!offen.length || !A.schatz) { truhe.animate([{ rotate: '0deg' }, { rotate: '-3deg' }, { rotate: '3deg' }, { rotate: '0deg' }], { duration: ruhig() ? 1 : 420 }); return; }
      zeige(truhe, [el('div', 'z-blaetter', offen.map(t => {
        const mini = el('div', 'z-mini-blatt'); for (let i = 0; i < 4; i++) mini.append(el('i', 'z-mini-zeile'));
        const z = el('span', 'z-mini-zeichen'); z.append(LB().faerbe(t.zeichen || '')); mini.append(z);
        return knopf('z-blatt-knopf', mini, () => A.schatz(t), 'Schatzblatt ' + (t.zeichen || ''));
      }))], 'schatz');
    });
    szene.append(truhe);

    const tuer = el('div', 'z-ding z-tuer', [ding('ding-tuer', 'z-tuer-bild'), el('span', 'z-tuer-schild', [LB().sym('welt'), el('span', null, 'Weg')])]);
    tuer.setAttribute('role', 'button'); tuer.setAttribute('aria-label', 'zum Weg');
    tipp(tuer, () => A.weg());
    szene.append(tuer);

    const FIG = A.figur;
    if (FIG && FIG.wer() && FIG.bild(FIG.wer())) {
      const figurBild = (s) => (FIG.svg && FIG.svg(s)) || LB().bild(FIG.bild(s), 'z-figur-bild');
      const figur = el('div', 'z-ding z-figur', figurBild(FIG.wer()));
      figur.setAttribute('role', 'button'); figur.setAttribute('aria-label', 'wer wandert');
      tipp(figur, () => {
        const reihe = el('div', 'z-figur-wahl', FIG.wahl().map(f => knopf('z-figur-knopf' + (f.s === FIG.wer() ? ' jetzt' : ''), LB().bild(f.bild, 'z-figur-gross'), () => {
          FIG.setze(f.s);
          figur.replaceChildren(figurBild(f.s));
          ebeneZu();
        }, f.name)));
        ebeneAuf('figur', [reihe]);
      });
      szene.append(figur);
    }

    const WOCHENENDE = { satz: 'Hoch die Hän-de, Wo-chen-en-de!', ab: ['ae', 'l1'] };
    const WOCHE = [['Sonn-tag', 'r1', 'l3'], ['Mon-tag', 'r1', 'l3'], ['Diens-tag', 'r1', 'l3'], ['Mitt-woch', 'r1', 'l2'], ['Don-ners-tag', 'r1', 'l3'], ['Frei-tag', 'ei', 'l1'], ['Sams-tag', 'r1', 'l3']];
    const uhrBild = (gross) => {
      const s = (n, a, k = []) => { const e = document.createElementNS(NS, n); for (const x in a) e.setAttribute(x, a[x]); e.append(...k); return e; };
      const svg = s('svg', { viewBox: '0 0 100 100', class: 'z-uhr-bild', 'aria-hidden': 'true' });
      svg.append(s('circle', { cx: 50, cy: 50, r: 48, fill: '#9c6b3c' }), s('circle', { cx: 50, cy: 50, r: 42, fill: '#fffaf0' }));
      for (let k = 0; k < 12; k++) {
        const w = k * Math.PI / 6, voll = k % 3 === 0, r1 = voll ? 33 : 36;
        svg.append(s('line', { x1: 50 + Math.sin(w) * r1, y1: 50 - Math.cos(w) * r1, x2: 50 + Math.sin(w) * 39, y2: 50 - Math.cos(w) * 39, stroke: '#5a3d24', 'stroke-width': voll ? 3 : 1.6, 'stroke-linecap': 'round' }));
        if (gross) { const t = s('text', { x: 50 + Math.sin(w) * 24.5, y: 50 - Math.cos(w) * 24.5 + 3.4, 'text-anchor': 'middle', 'font-size': 9.5, 'font-weight': 700, fill: '#2a2520' }); t.textContent = String(k || 12); svg.append(t); }
      }
      const std = s('line', { x1: 50, y1: 54, x2: 50, y2: 29, stroke: '#2a2520', 'stroke-width': 4.5, 'stroke-linecap': 'round', class: 'z-uhr-std' });
      const min = s('line', { x1: 50, y1: 56, x2: 50, y2: 16, stroke: '#2a2520', 'stroke-width': 2.6, 'stroke-linecap': 'round', class: 'z-uhr-min' });
      svg.append(std, min, s('circle', { cx: 50, cy: 50, r: 3.4, fill: '#9c6b3c' }));
      return svg;
    };
    const uhrStellen = (svg) => {
      const d = new Date(), m = d.getMinutes(), h = d.getHours() % 12;
      svg.querySelector('.z-uhr-std').setAttribute('transform', `rotate(${h * 30 + m / 2} 50 50)`);
      svg.querySelector('.z-uhr-min').setAttribute('transform', `rotate(${m * 6} 50 50)`);
    };
    const FOLGE_IDS = ((window.LAUTBUCH_FOLGE || {}).FOLGE || []).map(f => f.teil);
    const stand = (t) => A.lies('lautbuch.akt.' + t + '.v1', {}) || {};
    const gold = (s) => Object.keys(s).some(k => /^(l\d+|boss)$/.test(k) && s[k] === true);
    const erreicht = (teil, lv) => {
      const s = stand(teil);
      if (s[lv] === true || s.boss === true) return true;
      const i = FOLGE_IDS.indexOf(teil);
      return i >= 0 && FOLGE_IDS.slice(i + 1).some(t => gold(stand(t)));
    };
    const kalenderBlatt = (gross) => {
      const d = new Date(), [wort, teil, lv] = WOCHE[d.getDay()];
      const kann = erreicht(teil, lv);
      const b = el('div', 'z-kalender-blatt' + (gross ? ' gross' : ''), [el('div', 'z-kalender-kopf'), el('div', 'z-kalender-tag', String(d.getDate()))]);
      if (kann) b.append(el('div', 'z-kalender-wort', LB().wort(wort)));
      const we = WOCHENENDE.ab, weKann = we && erreicht(we[0], we[1]);
      if (gross && weKann && (d.getDay() === 0 || d.getDay() === 6)) b.append(el('div', 'z-kalender-satz', LB().satz(WOCHENENDE.satz)));
      return b;
    };
    const zeitGross = (von) => { const u = uhrBild(true); uhrStellen(u); zeige(von, [el('div', 'z-zeit-gross', [u, kalenderBlatt(true)])]); };
    const uhr = el('div', 'z-ding z-uhr', uhrBild(false));
    uhr.setAttribute('role', 'button'); uhr.setAttribute('aria-label', 'Uhr');
    tipp(uhr, () => zeitGross(uhr));
    const kalender = el('div', 'z-ding z-kalender', kalenderBlatt(false));
    kalender.setAttribute('role', 'button'); kalender.setAttribute('aria-label', 'Kalender');
    tipp(kalender, () => zeitGross(kalender));
    szene.append(uhr, kalender);
    const zeitGehen = () => {
      if (!land.isConnected) return;
      uhrStellen(uhr.firstChild); nah.querySelectorAll('.z-uhr-bild').forEach(uhrStellen);
      setTimeout(zeitGehen, 20000);
    };
    zeitGehen();

    const BU = A.buecher, buchIds = BU ? BU.gefunden() : [];
    const buchEls = new Map();
    const buchKlein = (id, art) => {
      const e = el('div', 'z-buch ' + art + ' ' + id);
      if (art === 'steht') { const d = el('div', 'z-buch-deckel'); const bild = BU.bild(id); if (bild) d.append(bild); e.append(d, el('div', 'z-buch-ruecken')); }
      else e.append(el('div', 'z-liegt-seiten'), el('div', 'z-liegt-schleife'));
      e.setAttribute('role', 'button'); e.setAttribute('aria-label', String(BU.titel(id) || 'Buch').replace(/-/g, ''));
      tipp(e, (ev) => { ev.stopPropagation(); BU.oeffne(id, () => {}); });
      buchEls.set(id, e);
      return e;
    };
    if (buchIds.length) {
      const bord = el('div', 'z-ding z-bord');
      const bb = ding('buch-regal', 'z-bord-bild'); if (bb) bord.append(bb); bord.classList.add(bb ? 'gemalt' : 'gezeichnet');
      const faecher = el('div', 'z-bord-faecher', [0, 1, 2].map(() => el('div', 'z-fach')));
      buchIds.filter(id => id !== 'reise').slice(0, 3).forEach((id, k) => faecher.children[k].append(buchKlein(id, 'steht')));
      bord.append(faecher);
      if (bb) { const vorn = ding('buch-regal', 'z-bord-vorn'); vorn.setAttribute('aria-hidden', 'true'); bord.append(vorn); }
      if (buchIds.includes('reise')) bord.append(buchKlein('reise', 'liegt'));
      szene.classList.add('mit-buechern');
      szene.append(bord);
    }

    const BEW = bewohnerListe();
    zst.drinnen = (zst.drinnen || []).filter(s => BEW.some(b => b.s === s)).slice(0, 3);
    zst.seit = Object.assign({}, zst.seit); zst.hinaus = (zst.hinaus || []).slice();
    const gehen = zst.drinnen.filter(s => abgelaufen(zst, s)), imHaus = zst.drinnen.slice();
    for (const s of zst.drinnen) if (!zst.seit[s]) zst.seit[s] = heute();
    if (gehen.length) { zst.drinnen = zst.drinnen.filter(s => !gehen.includes(s)); for (const s of gehen) { delete zst.seit[s]; if (!zst.hinaus.includes(s)) zst.hinaus.push(s); } }
    const fenster = el('div', 'z-ding z-fenster');
    const draussen = el('div', 'z-draussen');
    const hier = hierOrt();
    if (hier) draussen.append(A.WEG.ortBild(hier.ort, 'z-draussen-ort', hier.voegel));
    fenster.append(draussen);
    const fb = ding('ding-fenster', 'z-fenster-bild'); if (fb) fenster.append(fb);
    szene.append(fenster);
    const gaeste = new Map();
    BEW.filter(b => !imHaus.includes(b.s)).slice(0, 4).forEach((b, i) => {
      const e = LB().bild(b.s, 'z-gast-draussen platz-' + i);
      e.dataset.s = b.s; e.setAttribute('aria-hidden', 'true');
      draussen.append(e);
      if (!ruhig()) {
        const weit = ['-140%', '-110%', '-150%', '-90%'][i], dauer = 11000 + i * 2300;
        e.__weg = e.animate([{ translate: '0 0', scale: '1 1' }, { translate: `${weit} 0`, scale: '1 1', offset: .46 }, { translate: `${weit} 0`, scale: '-1 1', offset: .5 },
          { translate: '0 0', scale: '-1 1', offset: .96 }, { translate: '0 0', scale: '1 1' }], { duration: dauer, delay: -i * 2700, iterations: Infinity, easing: 'linear' });
      }
    });
    function mackeSpielen(schl, bild, wirt) {
      const M = window.LB_MACKEN;
      if (!M || !bild || ruhig() || !M.hat(schl)) return 0;
      try { return M.spiele(schl, bild, wirt) || 0; } catch (_) { return 0; }
    }
    const draussenFig = [...draussen.querySelectorAll('.z-gast-draussen')].filter(e => window.LB_MACKEN && window.LB_MACKEN.hat(e.dataset.s));
    if (draussenFig.length && !ruhig()) {
      const alltag = () => {
        if (!land.isConnected) return;
        if (!document.hidden && !nah.classList.contains('offen')) {
          const e = draussenFig[Math.floor(Math.random() * draussenFig.length)];
          if (e.__weg) e.__weg.pause();
          const ms = mackeSpielen(e.dataset.s, e, draussen);
          setTimeout(() => { if (e.__weg) e.__weg.play(); }, ms);
        }
        setTimeout(alltag, 12000 + Math.random() * 10000);
      };
      setTimeout(alltag, 4000 + Math.random() * 4000);
    }
    let mackeUhr = 0, mackeGast = null;
    const gastSetzen = (b, platz) => {
      const e = el('div', 'z-ding z-gast platz-' + platz, LB().bild(b.s)); e.dataset.s = b.s;
      const gross = () => zeige(e, [LB().bild(b.s, 'z-gross'), el('div', 'z-name', LB().wort(silbenName(b)))]);
      tipp(e, () => {
        if (e.dataset.geht || (e.__gezogen && performance.now() - e.__gezogen < 450)) return;
        if (mackeGast === e) return;
        if (mackeGast) { clearTimeout(mackeUhr); delete mackeGast.dataset.macke; mackeGast = null; }
        const ms = mackeSpielen(b.s, e.firstElementChild, e);
        if (!ms) return gross();
        mackeGast = e; e.dataset.macke = '1';
        mackeUhr = setTimeout(() => { delete e.dataset.macke; mackeGast = null; if (e.isConnected && !nah.classList.contains('offen')) gross(); }, ms);
      });
      let zug = null;
      e.addEventListener('pointerdown', (ev) => { if (e.dataset.geht || zug) return; zug = { id: ev.pointerId, x: ev.clientX, y: ev.clientY, an: false }; try { e.setPointerCapture(ev.pointerId); } catch (_) {} });
      e.addEventListener('pointermove', (ev) => {
        if (!zug || ev.pointerId !== zug.id) return;
        const dx = ev.clientX - zug.x, dy = ev.clientY - zug.y;
        if (!zug.an) { if (Math.hypot(dx, dy) < 10) return; zug.an = true; e.classList.add('gezogen'); tuer.classList.add('lockt'); if (mackeGast === e) { clearTimeout(mackeUhr); delete e.dataset.macke; mackeGast = null; } }
        css(e, { translate: `${dx}px ${dy}px` });
        tuer.classList.toggle('auf', ueberTuer(ev));
      });
      const los = (ev, abbruch) => {
        if (!zug || ev.pointerId !== zug.id) return;
        const z = zug; zug = null; if (!z.an) return;
        e.__gezogen = performance.now(); e.classList.remove('gezogen');
        if (!abbruch && ueberTuer(ev)) { hinausGehen(b.s, e); return; }
        tuer.classList.remove('auf', 'lockt');
        const t = e.style.translate; css(e, { translate: '' });
        if (!ruhig()) e.animate([{ translate: t }, { translate: '0px 0px' }], { duration: 320, easing: KURVE });
      };
      e.addEventListener('pointerup', (ev) => los(ev, false));
      e.addEventListener('pointercancel', (ev) => los(ev, true));
      szene.append(e); gaeste.set(b.s, { e, platz });
      return e;
    };
    const ueberTuer = (ev) => { const r = tuer.getBoundingClientRect(), rx = r.width * .2, ry = r.height * .1; return ev.clientX > r.left - rx && ev.clientX < r.right + rx && ev.clientY > r.top - ry && ev.clientY < r.bottom + ry; };
    const hinausGehen = async (s, e) => {
      if (!e.isConnected || e.dataset.geht) return;
      e.dataset.geht = '1';
      if (mackeGast === e) { clearTimeout(mackeUhr); delete e.dataset.macke; mackeGast = null; }
      zst.drinnen = zst.drinnen.filter(x => x !== s); if (zst.seit) delete zst.seit[s];
      if (!zst.hinaus.includes(s)) zst.hinaus.push(s);
      merke();
      tuer.classList.add('lockt', 'auf');
      if (!ruhig()) {
        const a = e.getBoundingClientRect(), t = tuer.getBoundingClientRect();
        const [x0, y0] = (e.style.translate || '0px 0px').split(' ').map(v => parseFloat(v) || 0);
        const x1 = x0 + t.left + t.width / 2 - (a.left + a.width / 2), y1 = y0 + t.top + t.height * .62 - (a.top + a.height / 2);
        await fertig(e.animate([{ translate: `${x0}px ${y0}px`, scale: '1' }, { translate: `${x1}px ${y1}px`, scale: '.35', opacity: 0 }], { duration: 760, easing: KURVE, fill: 'forwards' }), 760);
      }
      e.remove(); gaeste.delete(s);
      setTimeout(() => tuer.classList.remove('auf', 'lockt'), ruhig() ? 0 : 260);
    };
    imHaus.forEach((s, i) => { const b = BEW.find(x => x.s === s); if (b) gastSetzen(b, i); });
    merke();
    gehen.forEach((s, i) => { const g = gaeste.get(s); if (g) setTimeout(() => hinausGehen(s, g.e), (ruhig() ? 300 : 1600) + i * 900); });

    const woerter = leseWoerter();
    const pinnwand = el('div', 'z-ding z-pinnwand');
    const pinnwandZeichnen = () => {
      const karten = lies(K_KARTEN, []) || [];
      pinnwand.replaceChildren(...karten.slice(0, 3).map(k => {
        const m = el('div', 'z-minikarte', [el('span', 'z-mini-text', k.woerter.join(' ').replace(/-/g, '')), k.marke ? LB().bild(k.marke, 'z-mini-marke') : null]);
        m.setAttribute('role', 'button');
        tipp(m, () => zeige(m, [postkarte(k.woerter, k.marke, 'z-karte-gross'), el('div', 'z-knopfreihe', [
          knopf('', 'zeigen', async () => { await schliesse(); fluesterkarte({ karte: k, zeigen: true }); }),
          knopf('', 'drucken', () => karteDrucken(k.woerter, k.marke))])], 'karte'));
        return m;
      }), (() => { const l = el('div', 'z-minikarte leer', el('span', 'z-mini-marke-leer')); l.setAttribute('role', 'button'); l.setAttribute('aria-label', 'neue Karte'); return tipp(l, () => fluesterkarte({})); })());
    };
    if (woerter.length) pinnwandZeichnen();
    else tipp(pinnwand, () => pinnwand.animate([{ rotate: '0deg' }, { rotate: '-1.5deg' }, { rotate: '1.5deg' }, { rotate: '0deg' }], { duration: ruhig() ? 1 : 420 }));
    szene.append(pinnwand);

    const radDaten = radBaender();
    if (radDaten.baender.length && radDaten.vokale.length) {
      const dreh = sv('g', {}, [sv('circle', { r: 47, class: 'r-aussen' }), sv('circle', { r: 29, class: 'r-innen' }),
        ...radDaten.baender[0].laute.map((l, i, a) => { const w = (i * 360 / a.length + 180) * Math.PI / 180, t = sv('text', { x: (38 * Math.cos(w)).toFixed(1), y: (38 * Math.sin(w)).toFixed(1), class: 'r-kon' }); t.textContent = l; return t; }),
        ...radDaten.vokale.map((l, i, a) => { const w = (i * 360 / a.length + 180) * Math.PI / 180, t = sv('text', { x: (19 * Math.cos(w)).toFixed(1), y: (19 * Math.sin(w)).toFixed(1), class: 'r-vok' }); t.textContent = l; return t; })]);
      const rad = el('div', 'z-ding z-rad', sv('svg', { viewBox: '-50 -50 100 100', 'aria-hidden': 'true' }, [dreh, sv('rect', { x: -49, y: -9, width: 40, height: 18, rx: 4, class: 'r-fenster' }), sv('circle', { r: 6, class: 'r-knauf' })]));
      rad.setAttribute('role', 'button'); rad.setAttribute('aria-label', 'Laut-Rad');
      tipp(rad, async () => { await fertig(dreh.animate([{ transform: 'rotate(0deg)' }, { transform: 'rotate(-103deg)' }], { duration: ruhig() ? 1 : 520, easing: KURVE }), 520); lautRad(); });
      szene.append(rad);
    }

    const sicht = zst.sicht || null, erstes = !sicht;
    const jetzt = jetztStand();
    const neuLaute = Object.entries(jetzt.laute).filter(([k, s]) => erstes || (sicht.laute || {})[k] !== s);
    const neuBew = jetzt.bew.filter(s => erstes || !(sicht.bew || []).includes(s));
    const neuSchatz = jetzt.schatz.filter(id => erstes || !(sicht.schatz || []).includes(id));
    const neuBuecher = jetzt.buecher.filter(id => erstes || !(sicht.buecher || []).includes(id));
    const warZu = !erstes && !(sicht.schatz || []).length && offen.length > 0;
    zst.sicht = jetzt; merke();
    const GOLD = getComputedStyle(document.documentElement).getPropertyValue('--gold').trim() || '#c8860a';
    const still = ruhig();
    const einblenden = (e, d) => e.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250, delay: d, fill: 'backwards' });
    const glanz = (e, f, d, weit, blass, hell = 1) => e.animate([
      { opacity: blass ? .25 : 1, filter: `brightness(1) drop-shadow(0 0 0 ${f}) drop-shadow(0 0 0 ${f})`, easing: 'ease-out' },
      { opacity: 1, filter: `brightness(${hell}) drop-shadow(0 0 ${weit * .35}em ${f}) drop-shadow(0 0 ${weit}em ${f})`, offset: .3, easing: 'ease-in-out' },
      { opacity: 1, filter: 'brightness(1) drop-shadow(0 0 0 transparent) drop-shadow(0 0 0 transparent)' }], { duration: 2200, delay: d, fill: 'backwards' });
    let t = still ? 0 : 450;
    const weiter = (ms) => { if (!erstes && !still) t += ms; };
    if (neuLaute.length) {
      for (const [k, s] of neuLaute) {
        const e = kloetze.get(k); if (!e) continue;
        if (still) { einblenden(e, t); continue; }
        glanz(e, s === 'meister' ? GOLD : 'rgb(42 37 32 / .5)', t, s === 'meister' ? .7 : .4, true, s === 'meister' ? 1.25 : 1.12);
      }
      if (!still) for (const [z, br] of bretter) {
        const hier = neuLaute.filter(([k]) => k.startsWith(z + ':')); if (!hier.length) continue;
        const licht = hier.some(([, s]) => s === 'meister') ? 'rgb(255 214 120 / .5)' : 'rgb(255 250 240 / .45)';
        br.animate([{ backgroundColor: 'transparent', easing: 'ease-out' }, { backgroundColor: licht, offset: .3, easing: 'ease-in-out' }, { backgroundColor: 'transparent' }], { duration: 2200, delay: t, fill: 'backwards' });
      }
      weiter(900);
    }
    if (neuBew.length) {
      let da = false;
      for (const s of neuBew) { const e = draussen.querySelector(`[data-s="${s}"]`) || (gaeste.get(s) || {}).e; if (!e) continue; da = true;
        e.animate([{ opacity: 0 }, { opacity: 1 }], { duration: still ? 250 : 1000, delay: t, easing: 'ease-out', fill: 'backwards' }); }
      if (da) weiter(800);
    }
    if (neuSchatz.length) {
      if (warZu) {
        const auf = truhe.firstElementChild, zu = LB().bild('ding-truhe', 'z-truhe-zu'); truhe.append(zu);
        const dauer = still ? 250 : 700;
        if (auf) auf.animate([{ opacity: 0 }, { opacity: 1 }], { duration: dauer, delay: t, fill: 'backwards' });
        zu.animate([{ opacity: 1 }, { opacity: 0 }], { duration: dauer, delay: t, fill: 'forwards' }).onfinish = () => zu.remove();
      }
      if (!still) glanz(truhe, GOLD, t + (warZu ? 300 : 0), .8, false);
      else if (!warZu) einblenden(truhe, t);
      weiter(800);
    }
    if (neuBuecher.length) {
      for (const id of neuBuecher) { const e = buchEls.get(id); if (e) still ? einblenden(e, t) : glanz(e, '#b8862f', t, .5, true, 1.1); }
      weiter(800);
    }
    if (erstes) {
      zst.gesehen = alleGesammelt.slice(); merke();
      flur.querySelectorAll('.z-rahmen:not(.offen) .z-rahmen-innen').forEach(e => e.animate([{ opacity: 0 }, { opacity: 1 }], { duration: still ? 250 : 600, delay: t, fill: 'backwards' }));
    } else if (neu.length) setTimeout(ausmalen, t);
    let hand = false;
    for (const ev of ['pointerdown', 'wheel', 'touchstart']) flur.addEventListener(ev, () => { hand = true; }, { passive: true });
    flur.addEventListener('scroll', () => { if (hand && !zst.gewischt && flur.scrollLeft > 8) { zst.gewischt = true; merke(); } }, { passive: true });
    if (orte.length > 1 && !zst.gewischt && !still && !(neu.length && !erstes)) {
      const anlauf = { duration: 1300, delay: t + 300, easing: 'ease-in-out' };
      flur.querySelectorAll('.z-wandstueck').forEach(w => w.animate([{ translate: '0 0' }, { translate: '-14% 0', offset: .45 }, { translate: '-14% 0', offset: .55 }, { translate: '0 0' }], anlauf));
    }

    const ebeneAuf = (cls, inhalt) => {
      ebene.className = 'z-ebene offen ' + cls; ebene.setAttribute('aria-hidden', 'false');
      const zurueck = knopf('z-zurueck', [LB().sym('haus'), el('span', null, 'Mein Zimmer')], () => ebeneZu(), 'zurück ins Zimmer');
      ebene.replaceChildren(zurueck, ...inhalt);
      ebene.animate([{ opacity: 0, transform: 'scale(.97)' }, { opacity: 1, transform: 'none' }], { duration: ruhig() ? 1 : 360, easing: KURVE });
    };
    const ebeneZu = async () => {
      await fertig(ebene.animate([{ opacity: 1 }, { opacity: 0 }], { duration: ruhig() ? 1 : 260, fill: 'forwards' }), 260);
      ebene.getAnimations().forEach(a => a.cancel());
      ebene.className = 'z-ebene'; ebene.setAttribute('aria-hidden', 'true'); ebene.replaceChildren();
      if (woerter.length) pinnwandZeichnen();
    };

    function lautRad() {
      const { baender, vokale } = radDaten;
      const rs = Object.assign({ band: 0, wende: false }, lies(K_RAD, {}) || {});
      if (!baender[rs.band]) rs.band = 0;
      const FW = -90;
      let angA = FW, angI = FW, zuletzt = '';
      const anzeige = el('div', 'z-rad-anzeige'); anzeige.setAttribute('aria-live', 'polite');
      const svg = sv('svg', { class: 'z-rad-gross', viewBox: '-100 -100 200 200', 'aria-label': 'Laut-Rad' });
      const pol = (r, d) => [r * Math.sin(d * Math.PI / 180), -r * Math.cos(d * Math.PI / 180)];
      const gA = sv('g'), gI = sv('g');
      const ring = (g, laute, r0, r1, rt, cls) => {
        g.replaceChildren(sv('circle', { r: r1, class: r1 > 70 ? 'ring-aussen' : 'ring-innen' }));
        const step = 360 / laute.length;
        laute.forEach((l, i) => {
          const [x0, y0] = pol(r0, i * step + step / 2), [x1, y1] = pol(r1, i * step + step / 2);
          if (laute.length > 1) g.append(sv('line', { x1: x0, y1: y0, x2: x1, y2: y1, class: 'speiche' }));
          const t = sv('text', { class: cls }); t.dataset.w = i * step; t.dataset.r = rt; t.textContent = l;
          if (l.length > 1) t.setAttribute('font-size', '13');
          g.append(t);
        });
      };
      const schlitz = 'M-15 -97 h30 a4 4 0 0 1 4 4 v62 a4 4 0 0 1 -4 4 h-30 a4 4 0 0 1 -4 -4 v-62 a4 4 0 0 1 4 -4z';
      svg.append(gA, gI, sv('path', { d: 'M0 -98 A98 98 0 1 1 0 98 A98 98 0 1 1 0 -98z ' + schlitz, class: 'schatten', 'fill-rule': 'evenodd', transform: `rotate(${FW})` }),
        sv('path', { d: schlitz, class: 'fenster', transform: `rotate(${FW})` }), sv('circle', { r: 13, class: 'knauf' }), sv('circle', { r: 4, cx: -4, cy: -4, class: 'knauf-licht' }));
      const mod = (a, n) => ((a % n) + n) % n;
      const L = () => baender[rs.band].laute, n = () => L().length, m = vokale.length;
      const zeichne = () => {
        gA.setAttribute('transform', `rotate(${angA})`); gI.setAttribute('transform', `rotate(${angI})`);
        [[gA, angA], [gI, angI]].forEach(([g, ang]) => g.querySelectorAll('text').forEach(t => t.setAttribute('transform', `rotate(${t.dataset.w}) translate(0 ${-t.dataset.r}) rotate(${-(+t.dataset.w + ang)})`)));
        const k = L()[mod(Math.round((FW - angA) / (360 / n())), n())], v = vokale[mod(Math.round((FW - angI) / (360 / m)), m)];
        const s = rs.wende ? v + k : k + v;
        if (s !== zuletzt) { zuletzt = s; anzeige.replaceChildren(LB().wort(s)); }
      };
      const neuBauen = () => { ring(gA, L(), 61, 96, 79, 'kon'); ring(gI, vokale, 14, 60, 41, 'vok'); zeichne(); };
      const fahre = (ring, nach, d) => {
        const von = ring === 'a' ? angA : angI, t0 = performance.now(), dauer = ruhig() ? 1 : d;
        const schritt = (t) => { const q = Math.min(1, (t - t0) / dauer), e = 1 - Math.pow(1 - q, 3), w = von + (nach - von) * e; if (ring === 'a') angA = w; else angI = w; zeichne(); if (q < 1 && svg.isConnected) requestAnimationFrame(schritt); };
        requestAnimationFrame(schritt);
      };
      const stepVon = (ring) => 360 / (ring === 'a' ? n() : m);
      const rasten = (ring) => { const st = stepVon(ring), von = ring === 'a' ? angA : angI; fahre(ring, Math.round((von - FW) / st) * st + FW, 260); };
      const drehAuf = (ring, ziel) => { const st = stepVon(ring), jetzt = ring === 'a' ? angA : angI; let nach = FW - ziel * st; nach += Math.round((jetzt - nach) / 360) * 360; fahre(ring, nach, 420); };
      const punkt = (ev) => { const p = svg.createSVGPoint(); p.x = ev.clientX; p.y = ev.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); };
      const winkel = (p) => Math.atan2(p.x, -p.y) * 180 / Math.PI;
      let griff = null;
      svg.addEventListener('pointerdown', (ev) => {
        const p = punkt(ev), r = Math.hypot(p.x, p.y), ring = r > 61 && r < 99 ? 'a' : r > 14 && r <= 61 ? 'i' : null;
        if (!ring) return;
        griff = { ring, w0: winkel(p), weit: 0, p };
        try { svg.setPointerCapture(ev.pointerId); } catch {}
      });
      svg.addEventListener('pointermove', (ev) => {
        if (!griff) return;
        const w = winkel(punkt(ev)); let d = w - griff.w0; if (d > 180) d -= 360; if (d < -180) d += 360;
        griff.w0 = w; griff.weit += Math.abs(d);
        if (griff.ring === 'a') angA += d; else angI += d; zeichne();
      });
      const los = () => {
        if (!griff) return; const gr = griff; griff = null;
        if (gr.weit < 4) { const st = stepVon(gr.ring), rot = gr.ring === 'a' ? angA : angI; drehAuf(gr.ring, mod(Math.round((winkel(gr.p) - rot) / st), gr.ring === 'a' ? n() : m)); }
        else rasten(gr.ring);
      };
      svg.addEventListener('pointerup', los); svg.addEventListener('pointercancel', los);
      const leiste = el('div', 'z-rad-baender');
      const wendeK = knopf('z-band wende', [], () => { rs.wende = !rs.wende; schreib(K_RAD, rs); wendeTxt(); zuletzt = ''; zeichne(); }, 'Leserichtung');
      const wendeTxt = () => { const [a, b] = [el('span', 'vok', 'A'), el('span', 'vok', 'A')]; wendeK.replaceChildren(...(rs.wende ? [a, 'M  ⇄  M', b] : ['M', a, '  ⇄  ', b, 'M'])); wendeK.classList.toggle('z-ruht', baender[rs.band].ort !== 'berg'); };
      const bandK = baender.map((b, i) => knopf('z-band', [A.WEG.ortBild(b.ort, 'klein'), b.name], () => {
        rs.band = i; if (b.ort !== 'berg') rs.wende = false; schreib(K_RAD, rs);
        bandK.forEach((k, j) => k.setAttribute('aria-pressed', j === i)); angA = FW; wendeTxt(); neuBauen();
      }, b.name));
      const bastelK = knopf('z-band basteln', 'Bastelbogen', () => drucken(bastelbogen(), 'Lautbuch Laut-Rad zum Basteln.pdf'), 'Bastelbogen drucken');
      bandK.forEach((k, j) => k.setAttribute('aria-pressed', j === rs.band));
      leiste.append(...bandK, wendeK, bastelK);
      wendeTxt();
      ebeneAuf('rad', [el('div', 'z-rad-tisch', [anzeige, el('div', 'z-rad-platz', svg), leiste])]);
      neuBauen();
      if (!ruhig()) setTimeout(() => { drehAuf('a', 1); setTimeout(() => drehAuf('a', 0), 700); }, 500);
    }

    function fluesterkarte(opt) {
      const MARKEN = BEW.map(b => b.s);
      let mi = opt.karte && opt.karte.marke ? Math.max(0, MARKEN.indexOf(opt.karte.marke)) : Math.floor(Math.random() * MARKEN.length) || 0;
      const tuerMag = el('div', 'z-kuehlschrank'); tuerMag.setAttribute('aria-label', 'Wörter, die du lesen kannst');
      const zeilen = el('div', 'z-zeilen');
      const marke = el('div', 'z-marke'); marke.setAttribute('aria-label', 'Briefmarke wählen'); marke.setAttribute('role', 'button');
      const bogen = el('div', 'z-markenbogen'); bogen.hidden = true;
      const karte = el('div', 'z-postkarte', [zeilen, marke, el('div', 'z-stempel')]);
      const wortPlatz = el('div', 'z-wortplatz', [tuerMag, bogen]);
      const werkzeug = el('div', 'z-werkzeug');
      const legen = (w) => {
        const letzte = zeilen.lastElementChild;
        if (/^[!?,.]$/.test(w) && letzte) { letzte.dataset.w += w; letzte.replaceChildren(LB().wort(letzte.dataset.w)); knoepfe(); return; }
        const g2 = el('span', 'z-gelegt', LB().wort(w)); g2.dataset.w = w;
        tipp(g2, () => { if (ebene.classList.contains('zeigt')) return; g2.remove(); knoepfe(); });
        zeilen.append(g2); knoepfe();
      };
      [...woerter, '!', '?', ','].forEach(w => tuerMag.append(knopf('z-magnet' + (/^[!?,]$/.test(w) ? ' zeichen' : ''), LB().wort(w), () => legen(w), w.replace(/-/g, ''))));
      const markeSetzen = () => marke.replaceChildren(MARKEN.length ? LB().bild(MARKEN[mi]) : (hier ? A.WEG.ortBild(hier.ort, 'klein', hier.voegel) : ''));
      const bogenZu = () => { bogen.hidden = true; };
      const bogenAuf = () => {
        bogen.replaceChildren(...MARKEN.map((s, i) => {
          const m = el('button', 'z-bogen-marke', LB().bild(s)); m.type = 'button';
          const name = (BEW.find(b => b.s === s) || {}).wer; if (name) m.setAttribute('aria-label', name);
          m.setAttribute('aria-pressed', String(i === mi));
          tipp(m, (ev) => { ev.stopPropagation(); mi = i; markeSetzen(); bogenZu();
            marke.animate([{ rotate: '-10deg', scale: '1.25' }, { rotate: '0deg', scale: '1' }], { duration: ruhig() ? 1 : 360, easing: KURVE }); });
          return m;
        }));
        bogen.hidden = false;
        if (!ruhig()) bogen.animate([{ transform: 'translateY(-4%) scale(.96)' }, { transform: 'none' }], { duration: 260, easing: KURVE });
      };
      bogen.addEventListener('click', (ev) => { if (ev.target === bogen) { ev.stopPropagation(); bogenZu(); } });
      tipp(marke, () => { if (ebene.classList.contains('zeigt') || MARKEN.length < 2) return; bogenAuf(); });
      markeSetzen();
      if (MARKEN.length > 1 && !ruhig()) marke.animate([{ rotate: '0deg' }, { rotate: '-7deg' }, { rotate: '6deg' }, { rotate: '-3deg' }, { rotate: '0deg' }], { duration: 700, delay: 900, easing: 'ease-in-out' });
      const woerterJetzt = () => [...zeilen.children].map(x => x.dataset.w);
      const zeigenK = knopf('', 'zeigen', () => { bogenZu(); const an = ebene.classList.toggle('zeigt'); zeigenK.textContent = an ? 'zurück' : 'zeigen'; });
      const druckK = knopf('', 'drucken', () => karteDrucken(woerterJetzt(), MARKEN[mi]));
      const pinnK = knopf('nur-legen', [LB().sym('haus'), el('span', null, 'an die Pinnwand')], async () => {
        const w = woerterJetzt(); if (!w.length) return;
        const liste = (lies(K_KARTEN, []) || []).filter(k => JSON.stringify(k.woerter) !== JSON.stringify(w));
        liste.unshift({ id: Date.now().toString(36), woerter: w, marke: MARKEN[mi] || null });
        schreib(K_KARTEN, liste.slice(0, 6));
        const z = ebene.querySelector('.z-zurueck'), a = karte.getBoundingClientRect(), b = z.getBoundingClientRect();
        await fertig(karte.animate([{ transform: 'none', opacity: 1 }, { transform: `translate(${b.left + b.width / 2 - (a.left + a.width / 2)}px, ${b.top + b.height / 2 - (a.top + a.height / 2)}px) scale(.08) rotate(-8deg)`, opacity: .2 }], { duration: ruhig() ? 1 : 700, easing: KURVE }), 700);
        ebeneZu();
      });
      const leerK = knopf('nur-legen', 'neue Karte', () => { zeilen.replaceChildren(); knoepfe(); });
      werkzeug.append(zeigenK, druckK, pinnK, leerK);
      const knoepfe = () => { const leer = !zeilen.childElementCount; [zeigenK, druckK, pinnK].forEach(k => k.classList.toggle('z-ruht', leer)); };
      ebeneAuf('karte', [el('div', 'z-karten-tisch', [wortPlatz, el('div', 'z-kartenplatz', [karte, werkzeug])])]);
      if (opt.karte) opt.karte.woerter.forEach(legen);
      knoepfe();
      if (opt.zeigen) zeigenK.click();
    }

    function postkarte(ws, mk, cls) {
      const z = el('div', 'z-zeilen'); ws.forEach(w => z.append(el('span', 'z-gelegt', LB().wort(w))));
      return el('div', 'z-postkarte ' + (cls || ''), [z, el('div', 'z-marke', mk ? LB().bild(mk) : null), el('div', 'z-stempel')]);
    }
    function karteDrucken(ws, mk) {
      if (!ws.length) return;
      const rahmen = el('div', 'z-druckrahmen', [postkarte(ws, mk, 'z-druck-karte'), ...['lo', 'ro', 'lu', 'ru'].map(e => el('span', 'z-ecke ' + e))]);
      drucken([el('div', 'zimmer-druck z-karte-druck', [rahmen, el('p', 'z-druck-hinweis', 'An den Ecken entlang ausschneiden.')])], 'Lautbuch Flüsterkarte.pdf');
    }

    return { land };
  }

  function radBaender() {
    const W = WELT(), alle = W.zonen.flatMap(z => z.laute);
    const baender = [['p1', 'Summer', 'berg'], ['p2', 'Klopfer', 'fahne'], ['p3', 'Besondere', 'wellen']]
      .map(([f, name, ort]) => ({ name, ort, laute: alle.filter(l => l.teil === 'p' && l.frei === f && lautStand(l) !== 'nebel').map(l => l.g) }))
      .filter(b => b.laute.length);
    const vokale = (W.zonen.find(z => z.id === 'vok') || { laute: [] }).laute.filter(l => lautStand(l) !== 'nebel').map(l => l.g);
    return { baender, vokale };
  }

  function bastelbogen() {
    const BAENDER = [['Summer', 'berg', ['M', 'L', 'N', 'S', 'F', 'R', 'H']], ['Klopfer', 'fahne', ['P', 'T', 'K', 'B', 'G', 'D']], ['Besondere', 'wellen', ['W', 'J', 'Z', 'SCH']]];
    const VOK = ['A', 'I', 'O', 'U', 'E'], RK = 85, RV = 52, LK = 68, LV = 35;
    const pol = (r, d) => [r * Math.sin(d * Math.PI / 180), -r * Math.cos(d * Math.PI / 180)];
    const loch = () => sv('g', { class: 'loch' }, [sv('circle', { r: 2.2 }), sv('path', { d: 'M-5 0h-3M5 0h3M0 -5v-3M0 5v3' })]);
    const buchstabe = (l, r, w, cls) => { const [x, y] = pol(r, w), t = sv('text', { class: cls, transform: `translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${w + 90})`, 'font-size': l.length > 1 ? 13 : 20 }); t.textContent = l; return t; };
    const speichen = (n, r0, r1) => Array.from({ length: n }, (_, i) => { const w = (i + .5) * 360 / n, [a, b] = pol(r0, w), [c, d] = pol(r1, w); return sv('line', { x1: a, y1: b, x2: c, y2: d, class: 'speiche' }); });
    const mm = (w, h, vb, kinder) => sv('svg', { viewBox: vb, width: w + 'mm', height: h + 'mm', class: 'z-teil' }, kinder);
    const kScheibe = ([name, ort, laute]) => {
      const sortier = sv('text', { x: 0, y: 14, class: 'sortier' }); sortier.textContent = name;
      return mm(2 * RK + 4, 2 * RK + 4, `${-RK - 2} ${-RK - 2} ${2 * RK + 4} ${2 * RK + 4}`, [sv('circle', { r: RK, class: 'schnitt flaeche-k' }), sv('circle', { r: RV, class: 'deckkreis' }),
        ...speichen(laute.length, RV + 2, RK - 1.5), ...laute.map((l, i) => buchstabe(l, LK, i * 360 / laute.length, "kon")), sortier, loch()]);
    };
    const vScheibe = () => mm(2 * RV + 4, 2 * RV + 4, `${-RV - 2} ${-RV - 2} ${2 * RV + 4} ${2 * RV + 4}`, [sv('circle', { r: RV, class: 'schnitt flaeche-v' }), ...speichen(5, 9, RV - 1.5), ...VOK.map((l, i) => buchstabe(l, LV, i * 72, 'vok')), loch()]);
    const fenster = () => {
      const x0 = -(RK + 12), x1 = 15, h = 17, a = -(LK + 12), b = -(LV - 13);
      const t = sv('text', { x: (a + b) / 2, y: 0, class: 'hinweis-klein' }); t.textContent = 'herausschneiden';
      return mm(x1 - x0 + 4, 2 * h + 4, `${x0 - 2} ${-h - 2} ${x1 - x0 + 4} ${2 * h + 4}`, [
        sv('path', { d: `M${x0 + 6} ${-h}H${x1 - 6}a6 6 0 0 1 6 6V${h - 6}a6 6 0 0 1 -6 6H${x0 + 6}a6 6 0 0 1 -6 -6V${-h + 6}a6 6 0 0 1 6 -6z M${a + 4} -12.5H${b - 4}a4 4 0 0 1 4 4v17a4 4 0 0 1 -4 4H${a + 4}a4 4 0 0 1 -4 -4v-17a4 4 0 0 1 4 -4z`, 'fill-rule': 'evenodd', class: 'schnitt flaeche-f' }),
        sv('rect', { x: a, y: -12.5, width: b - a, height: 25, rx: 4, class: 'ausschnitt' }), t,
        sv('path', { d: `M${x0 + 4} ${-h + 5}v${2 * h - 10}M${x0 + 8} ${-h + 5}v${2 * h - 10}`, class: 'griff' }), loch()]);
    };
    const seite = (inhalt) => el('section', 'zimmer-druck z-bogen-seite', inhalt);
    const anleitung = el('ol', 'z-anleitung', [
      'Auf festes Papier drucken (160 g) oder auf Karton kleben. In Originalgröße drucken, ohne „an Seite anpassen“.',
      'Ausschneiden: die große Scheibe, die kleine Scheibe, das Lesefenster. Im Lesefenster das gestrichelte Feld herausschneiden.',
      'Die Mitte mit einer Nadel vorstechen (Erwachsene). Von unten nach oben stapeln: große Scheibe, kleine Scheibe, Lesefenster.',
      'Eine Musterklammer durch alle drei Mitten stecken und hinten auffalten. Nicht zu fest, die Scheiben müssen sich drehen.',
      'Das Lesefenster zeigt nach links. Dreht das Kind die große Scheibe, wandert der Konsonant (MA, LA, NA …); dreht es die kleine, der Vokal (MA, MI, MO …).',
      'Die große Scheibe lässt sich tauschen: Summer (M L N S F R H), Klopfer (P T K B G D), Besondere (W J Z SCH).'].map(t => el('li', null, t)));
    return [
      seite([el('h1', null, 'Laut-Rad zum Basteln'), el('p', 'z-unter', 'Für die Begleitung. Du brauchst: Schere, eine Musterklammer, festes Papier.'), anleitung, el('div', 'z-teile', vScheibe()), el('div', 'z-teile', fenster())]),
      ...BAENDER.map(b => seite([el('div', 'z-teile gross', kScheibe(b))]))
    ];
  }

  window.LB_ZIMMER = {
    bauen,
    neu: (api) => { try { return neuDa(api); } catch { return false; } },
    einziehen: (schluessel, api) => { try { return einziehen(schluessel, api); } catch { return { drin: false, raus: null }; } },
    drinnen: () => { try { const v = JSON.parse(localStorage.getItem(K_ZIMMER) || '{}'); return Array.isArray(v.drinnen) ? v.drinnen.filter(s => !abgelaufen(v, s)).slice(0, 3) : []; } catch { return []; } },
    auszug: (api) => { try { return auszug(api); } catch { return []; } }
  };
})();
