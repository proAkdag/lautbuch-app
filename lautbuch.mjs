import LB from './lb_schrift.mjs';
import './lb_symbole.mjs';
import './lb_bilder.mjs';
import LB_BILDDATEN from './lb_bilder_daten.mjs';
import './lb_ausgabe.mjs';
import LAUTBUCH_FOLGE from './lb_folge.mjs';
import LAUTBUCH_WELT from './lb_welt.mjs';
import LAUTBUCH_KARTE from './lb_karte.mjs';
import LAUTBUCH_WEG from './lb_weg.mjs';

import { RUHIG, ruhig, anim, fertigVon, kommt, geht, geist, geistTakt, rahmenFlug } from './lb_bewegung.mjs';
import { knopf } from './lb_knopf.mjs';
import { PROFIL, lies, schreib, schluessel, licht, speichern, einst, einstSpeichern } from './lb_speicher.mjs';
import { leiste } from './lb_leiste.mjs';
import { begleitung } from './lb_begleitung.mjs';
import { tafelModul } from './lb_tafel.mjs';
import { karteikarteModul } from './lb_karteikarte.mjs';
import { hinweisModul } from './lb_hinweis.mjs';
import { bilderSpielModul } from './lb_bilderspiel.mjs';
import { bilderFeldModul } from './lb_bilderfeld.mjs';
import { wiederholenModul } from './lb_wiederholen.mjs';
import { uebenModul } from './lb_ueben.mjs';
import { bossModul } from './lb_boss.mjs';
import { schatzModul } from './lb_schatz.mjs';
import { ortModul } from './lb_ort.mjs';
import { raumModul } from './lb_raum.mjs';
import { galerieModul } from './lb_galerie.mjs';
import { lauteModul } from './lb_laute.mjs';

(() => {
  'use strict';
  const { el, faerbe, wort, satz, mische, fall, anlauf, sym, bild, bildSchluessel, bildPool, ablenkerWoerter } = LB;
  const WELT = LAUTBUCH_WELT;
  const WEG = LAUTBUCH_WEG;
  const TEILE = window.LAUTBUCH_TEILE;
  const KARTE = LAUTBUCH_KARTE;
  const main = document.querySelector('main');
  const oben = document.querySelector('.leiste');
  const unten = document.querySelector('.leiste-unten');

  const VERSUCH = { zoom: true, zimmer: true };
  const ruhigSetzen = () => document.documentElement.classList.toggle('ruhig', RUHIG.matches);
  if (RUHIG.addEventListener) RUHIG.addEventListener('change', ruhigSetzen);
  ruhigSetzen();
  const vhSetzen = () => { const h = window.innerHeight; if (h > 0) document.documentElement.style.setProperty('--vh', (h / 100) + 'px'); };
  vhSetzen();
  window.addEventListener('resize', vhSetzen);
  window.addEventListener('orientationchange', () => { vhSetzen(); setTimeout(vhSetzen, 250); });
  for (const e of ['fullscreenchange', 'webkitfullscreenchange']) document.addEventListener(e, () => requestAnimationFrame(vhSetzen));

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
  const sanft = (fn, rahmenZuerst = false) => (...args) => {
    if (imWechsel || !main.childElementCount) return fn(...args);
    const haupt = main.querySelector('[data-haupt]');
    const durchTipp = !!(getippt && getippt.isConnected && main.contains(getippt));
    const quelle = durchTipp ? getippt : haupt;
    getippt = null;
    const ort = quelle ? quelle.dataset.ort : null, von = quelle ? quelle.getBoundingClientRect() : null, vs = quelle ? stilVon(quelle) : null;
    const geister = [main, oben, unten].filter(b => b.childElementCount && b.getClientRects().length).map(b => [b, geist(b)]);
    imWechsel = true;
    const frueh = (rahmenZuerst === true || (rahmenZuerst === 'beiTipp' && durchTipp)) && !ruhig();
    const danach = () => {
      const neu = main.querySelector('[data-haupt]');
      const amOrt = !!(haupt && neu && haupt.dataset.ort === neu.dataset.ort);
      if (!frueh) for (const [b, k] of geister) { b.after(k); geistTakt(k); geht(k, b === main && !amOrt ? -10 : 0).then(() => k.remove()); }
      const ziel = !amOrt && !ruhig() && ort ? main.querySelector('[data-ort="' + ort + '"]') : null;
      const fliegt = !!(ziel && rahmenFlug(von, vs, ziel));
      for (const b of [oben, unten]) for (const c of b.children) if (!c.classList.contains('geist')) kommt(c, 60, 0);
      for (const c of main.children) if (getComputedStyle(c).position !== 'fixed') kommt(c, fliegt ? 260 : 80, amOrt ? 0 : 14);
    };
    if (frueh) {
      for (const [b, k] of geister) { b.after(k); geistTakt(k); geht(k, b === main ? -10 : 0).then(() => k.remove()); b.replaceChildren(); }
      requestAnimationFrame(() => setTimeout(() => { try { fn(...args); } finally { imWechsel = false; } danach(); }, 0));
      return;
    }
    try { fn(...args); } finally { imWechsel = false; }
    danach();
  };

  let wach = null;
  const wachHalten = async () => {
    if (wach || !('wakeLock' in navigator) || document.visibilityState !== 'visible') return;
    try { wach = await navigator.wakeLock.request('screen'); wach.addEventListener('release', () => { wach = null; }); } catch {}
  };
  document.addEventListener('visibilitychange', wachHalten);
  document.addEventListener('pointerdown', wachHalten, { once: true });


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
  const ortMeister = (o, L = licht) => { const s = L[o.t.id] || {}; return o.ids.includes('boss') ? !!s.boss : o.ids.every(id => s[id]); };
  const zumOrt = (o) => o ? titel(o.t, { ort: o.w.id }) : weg();
  const zumWeg = () => knopf('ikon', sym('welt'), () => weg(), 'zum Weg');
  const { schieneSetzen, weiterLesen, zimmerDa, vollbildDa, sVoll, imVollbild, vollbildUmschalten } = leiste({
    weg: (...a) => weg(...a), level: (...a) => level(...a), sammlung: (...a) => sammlung(...a), galerie: (...a) => galerie(...a),
    zimmerMitGang: (...a) => zimmerMitGang(...a), hinweisKarte: (...a) => hinweisKarte(...a), schublade: (...a) => schublade(...a),
    zumOrt: (...a) => zumOrt(...a), ortVon: (...a) => ortVon(...a), wegStand: (...a) => wegStand(...a), lesezeichenKey: () => LESEZEICHEN_KEY, VERSUCH });
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
    const r = Math.random();
    return r < 1 / 3 ? LB.gross(text) : r < 2 / 3 ? k : anfangGross(text);
  };
  const inForm = (text, art, loch) => {
    if (einst.schreibung === 'gross') return LB.gross(text);
    if (art === 'woerter' && text !== LB.gross(text)) return text;
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
    for (const f of LAUTBUCH_FOLGE.FOLGE) {
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
    const F = LAUTBUCH_FOLGE.FOLGE.map(f => f.teil), i = F.indexOf(t.id);
    return i >= 0 && F.slice(i + 1).some(id => Object.keys(licht[id] || {}).some(k => /^(l\d+|p\d+|boss)$/.test(k) && licht[id][k] === true));
  };
  const wiederholenPool = () => {
    const pool = alleGelerntenZeilen(), rang = new Map(), lektionen = [];
    for (const f of LAUTBUCH_FOLGE.FOLGE) { const t = TEILE[f.teil]; if (t) for (const lv of t.level) { rang.set(t.id + '|' + lv.id, lektionen.length); lektionen.push([t, lv]); } }
    const von = new Map();
    for (const f of LAUTBUCH_FOLGE.FOLGE) { const t = TEILE[f.teil]; if (!t || !licht[t.id]) continue;
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
  const wegStand = (ohne, L = licht) => {
    const st = {}; let rand = false;
    const meister = (w) => { const o = ortVon(w); return !!o && w.id !== ohne && ortMeister(o, L); };
    const bossGold = (tid) => { const b = WEG.teile.filter(w => (w.teil || w.id) === tid && w.boss !== false).pop(); return !!b && meister(b); };
    const roh = WEG.teile.map((w, i) => {
      const tid = w.teil || w.id;
      const vorig = WEG.teile.slice(0, i).reverse().find(v => (v.teil || v.id) !== tid);
      const o = ortVon(w);
      return { m: meister(w), spur: !!o && o.ids.some(id => (L[o.t.id] || {})[id]),
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
  const { sammlung } = lauteModul({ leer, schieneSetzen, titelZeile, el, faerbe, WELT, WEG, TEILE, main, oben, sanft, oeffne: (...x) => oeffne(...x) });

  const { GALERIE_KEY, sammle, istGesammelt, galerieOrte, sinne, sinnDa, waehleSinn, sinnVorladen, bilderVorladen, sammleSzene, galerie, bewohnerJetzt, zimmerMitGang, zimmer, galerieKopf, oeffne, weg, FIGUR_KEY, figurStand, FIGUR_BILD, FIGUR_SEITE, druckRaum } = galerieModul({ hoere, leer, ortVon, ortZu, zumOrt, schieneSetzen, weiterLesen, zimmerDa, titelZeile, gruppe, lesezeichen, setzeLesezeichen, wiederholenPool, WEG_KEY, sv, pf, wegStand, WEG, TEILE, perlenVon, main, oben, unten, VERSUCH, sanft, titel: (...x) => titel(...x), level: (...x) => level(...x), ueben: (...x) => ueben(...x), bilderRaum: (...x) => bilderRaum(...x), tippenFrei: (...x) => tippenFrei(...x), ruhe: (...x) => ruhe(...x), wiederholen: (...x) => wiederholen(...x), schatz: (...x) => schatz(...x), schublade: (...x) => schublade(...x), get imWechsel() { return imWechsel; } });

  const { titel } = ortModul({ leer, wegTeil, ortVon, ortZu, ortMeister, probeVon, liegtHier, sv, main, VERSUCH, bilderVorladen, kameraHinein, sanft, bilderRaum: (...x) => bilderRaum(...x), bossRaum: (...x) => bossRaum(...x), schatz: (...x) => schatz(...x), level: (...x) => level(...x) });

  const { raumHuelle, level } = raumModul({ leer, stolper, kopfLeiste, main, sinnVorladen, sanft, ueben: (...x) => ueben(...x), lauf: (...x) => lauf(...x) });

  const { einpassen } = tafelModul({  });

  const { hinweisKarte, hinweisZu } = hinweisModul({ main });

  const { karteikarte } = karteikarteModul({ ziehung, mittigAlle: (...x) => mittigAlle(...x) });

  const { ueben } = uebenModul({ hoere, leer, ortZu, einpassen, hinweisKarte, karteikarte, inForm, schreibSchalter, gruppe, lesezeichen, setzeLesezeichen, mischSchl, marken, markSchl, stolper, unten, tippenFrei: (...x) => tippenFrei(...x), ruhe: (...x) => ruhe(...x), zuordnen: (...x) => zuordnen(...x), abtippen: (...x) => abtippen(...x), weg: (...x) => weg(...x), get abbau() { return abbau; } });

  const { bilderRaum } = bilderFeldModul({ leer, ortZu, raumHuelle, gruppe, ziehung, kopfLeiste, sinne, sinnDa, bilderVorladen, galerieKopf, sanft, tippenFrei: (...x) => tippenFrei(...x), ruhe: (...x) => ruhe(...x), geschichte: (...x) => geschichte(...x), passeLauf: (...x) => passeLauf(...x), zuordnen: (...x) => zuordnen(...x), abtippen: (...x) => abtippen(...x), titel: (...x) => titel(...x), lauf: (...x) => lauf(...x), get abbau() { return abbau; } });

  const { tippenFrei, ruhe, geschichte, passeLauf, zuordnen, abtippen } = bilderSpielModul({ ziehung, unten, sammle, sammleSzene, mittigAlle: (...x) => mittigAlle(...x) });

  const { wiederholen } = wiederholenModul({ hoere, leer, weiterLesen, titelZeile, raumHuelle, mischForm, karteikarte, wiederholenPool, gewichtetZiehen, oben, unten, sanft });

  const { bossRaum, lauf } = bossModul({ hoere, leer, ortZu, raumHuelle, hinweisKarte, hinweisZu, stolper, herkunft, steinFlug, zeilenSteine, kopfLeiste, unten, waehleSinn, sinnVorladen, sammleSzene, sanft, titel: (...x) => titel(...x), level: (...x) => level(...x), weg: (...x) => weg(...x), get abbau() { return abbau; }, set abbau(v) { abbau = v; } });

  const { schatz } = schatzModul({ leer, ortZu, ortChip, main, oben, galerieKopf, sanft, get abbau() { return abbau; } });

  const { schublade, handreichung } = begleitung({ vollbildDa, sVoll, imVollbild, vollbildUmschalten, gruppe, LESEZEICHEN_KEY, GALERIE_KEY, FIGUR_KEY, figurStand,
    weg: (...x) => weg(...x), startZeigen: (...x) => startZeigen(...x) });

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

  const HALT = new Map();
  const vorladen = () => {
    const D = LB_BILDDATEN, g = lies(GALERIE_KEY, {}) || {}, schl = ['ding-rahmen'];
    for (const { t, pool } of galerieOrte()) for (const w of pool) if (istGesammelt(t, w, g)) schl.push(bildSchluessel(w));
    const szenen = [];
    for (const { t } of galerieOrte()) for (const lv of [...t.level, t.boss].filter(Boolean)) for (const sn of sinne(lv)) {
      const b = sinnDa(lv, sn) && sn.wahl.find(x => x.s === sn.richtig);
      if (b && (g[b.s] || (sn === lv.sinn && licht[t.id][lv.id]))) szenen.push((D[b.s] || {}).farbe);
    }
    const wer = (figurStand() || {}).wer, moebel = ['ding-teppich', 'ding-pfeil', 'ding-regal', 'ding-klotz', 'ding-truhe', 'ding-truhe-offen', 'ding-tuer', 'ding-fenster',
      ...(FIGUR_BILD[wer] || []), FIGUR_SEITE[wer]].map(k => (D[k] || {}).farbe);
    const warteschlange = [...new Set([...[...new Set(schl)].map(k => (D[k] || {}).klein), ...szenen, ...moebel])].filter(p => p && !HALT.has(p));
    const warte = typeof requestIdleCallback === 'function' ? (f) => requestIdleCallback(f, { timeout: 800 }) : (f) => setTimeout(() => f({ timeRemaining: () => 8 }), 60);
    const schritt = (dl) => {
      for (let n = 0; n < 6 && warteschlange.length && dl.timeRemaining() > 3; n++) {
        const p = warteschlange.shift(), i = new Image();
        i.decoding = 'async'; i.src = p; HALT.set(p, i); i.decode().catch(() => {});
      }
      if (warteschlange.length) warte(schritt);
    };
    if (warteschlange.length) warte(schritt);
  };
  const buchVon = (L, fs, name) => {
    const st = wegStand(undefined, L), D = LB_BILDDATEN, k = (FIGUR_BILD[fs.wer] || [])[0], letzter = WEG.teile[WEG.teile.length - 1];
    const laute = [];
    for (const z of WELT.zonen) for (const l of z.laute) if (WELT.stand(l, L) !== 'nebel' && !laute.includes(l.k)) laute.push(l.k);
    return { name: String(name || '').trim(), bild: k && D[k] ? (D[k].klein || D[k].farbe) : null,
      orte: WEG.teile.filter(w => st[w.id] === 'meister').length, vokale: ['a', 'i', 'o', 'u', 'e'].map(id => !!(L[id] && L[id].boss)),
      bewohner: bewohnerJetzt(L, fs).map(([b]) => b.s), laute, fertig: st[letzter.id] === 'meister', hier: (WEG.teile.find(w => st[w.id] === 'hier') || {}).id || null };
  };
  const startBuch = () => buchVon(licht, figurStand(), lies('lautbuch.name.v1', ''));
  const startBuecher = () => {
    if (!PROFIL) return [startBuch(), null, null];
    return PROFIL.plaetze().map(p => {
      if (!p) return null;
      if (p.aktiv) return Object.assign(startBuch(), { aktiv: true });
      const L = {}; for (const id of Object.keys(TEILE)) L[id] = PROFIL.liesIn(p.nr, schluessel(id), {}) || {};
      return Object.assign(buchVon(L, Object.assign({ wer: null, gezeigt: [] }, PROFIL.liesIn(p.nr, FIGUR_KEY, {}) || {}), p.name), { aktiv: false });
    });
  };
  const oeffneNachWechsel = PROFIL ? PROFIL.oeffne() : null;
  let gezeigt = false;
  const startZeigen = (zurueck) => {
    const buecher = startBuecher(), oeffne = !gezeigt && oeffneNachWechsel ? oeffneNachWechsel - 1 : null; gezeigt = true;
    const aktiv = Math.max(0, buecher.findIndex(b => b && b.aktiv));
    window.LB_START.zeigen({ buch: buecher[aktiv], buecher, aktiv, oeffne,
      waehle: (i) => PROFIL ? PROFIL.waehle(i + 1) : Promise.resolve(i === 0),
      handreichung: () => { if (window.LAUTBUCH_HANDREICHUNG) handreichung(); },
      weg, ruhig, main, zurueck: zurueck === true });
  };
  window.LB_VORLADEN = { starten: vorladen, gehalten: () => HALT.size };
  if (window.LB_START) startZeigen();
  weg();
  setTimeout(vorladen, 1200);
})();
