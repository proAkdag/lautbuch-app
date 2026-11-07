import LB from './lb_schrift.mjs';
import './lb_symbole.mjs';
import './lb_bilder.mjs';
import LB_AUSGABE from './lb_ausgabe.mjs';
import LB_BILDDATEN from './lb_bilder_daten.mjs';
import LAUTBUCH_FOLGE from './lb_folge.mjs';
import { ruhig, KURVE, fertigVon, kommt, geht } from './lb_bewegung.mjs';
import { gesperrtBis, knopf, langDruck } from './lb_knopf.mjs';
import { lies, schreib, schluessel, licht, einst, einstSpeichern } from './lb_speicher.mjs';
const { el, faerbe, wort, satz, sym, bild, bildSchluessel, bildPool, ablenkerWoerter } = LB;

export function galerieModul(_A) {
  const { hoere, leer, ortVon, ortZu, zumOrt, schieneSetzen, weiterLesen, zimmerDa, titelZeile, gruppe, lesezeichen, setzeLesezeichen, wiederholenPool, WEG_KEY, sv, pf, wegStand, WEG, TEILE, perlenVon, main, oben, unten, VERSUCH, sanft } = _A;
  const titel = (...x) => _A.titel(...x);
  const level = (...x) => _A.level(...x);
  const ueben = (...x) => _A.ueben(...x);
  const bilderRaum = (...x) => _A.bilderRaum(...x);
  const tippenFrei = (...x) => _A.tippenFrei(...x);
  const ruhe = (...x) => _A.ruhe(...x);
  const wiederholen = (...x) => _A.wiederholen(...x);
  const schatz = (...x) => _A.schatz(...x);
  const schublade = (...x) => _A.schublade(...x);
  const GALERIE_KEY = 'lautbuch.galerie.v1';
  const sammle = (woerter) => {
    const g = lies(GALERIE_KEY, {}) || {}; let neu = false;
    for (const w of woerter) { const k = bildSchluessel(w); if (!g[k]) { g[k] = 1; neu = true; } }
    if (neu) { schreib(GALERIE_KEY, g); if (window.LB_VORLADEN) setTimeout(window.LB_VORLADEN.starten, 3000); }
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
  const gemalt = (s) => !!LB_BILDDATEN[s];
  const sinnDa = (lv, sn) => sn === lv.sinn || sn.wahl.every(b => gemalt(b.s));
  const sinnRunde = new Map();
  const sinnPeek = (teil, lv) => {
    const da = sinne(lv).filter(sn => sinnDa(lv, sn));
    const n = sinnRunde.get(teil.id + '|' + lv.id) || 0;
    return da.length ? da[n % da.length] : lv.sinn;
  };
  const waehleSinn = (teil, lv) => {
    const sn = sinnPeek(teil, lv), k = teil.id + '|' + lv.id;
    sinnRunde.set(k, (sinnRunde.get(k) || 0) + 1);
    return sn;
  };
  const SINN_HALT = [];
  const sinnVorladen = (teil, lv) => {
    const sn = lv && lv.sinn && sinnPeek(teil, lv); if (!sn) return;
    const D = LB_BILDDATEN, uris = sn.wahl.map(b => (D[b.s] || {}).farbe).filter(Boolean);
    if (!uris.length || SINN_HALT.some(h => h.schl === sn.richtig)) return;
    const warte = typeof requestIdleCallback === 'function' ? (f) => requestIdleCallback(f, { timeout: 600 }) : (f) => setTimeout(f, 120);
    warte(() => {
      if (SINN_HALT.some(h => h.schl === sn.richtig)) return;
      const bilder = uris.map(u => { const i = new Image(); i.decoding = 'async'; i.src = u; i.decode().catch(() => {}); return i; });
      SINN_HALT.push({ schl: sn.richtig, bilder });
      while (SINN_HALT.length > 2) SINN_HALT.shift();
    });
  };
  const BILD_HALT = new Map();
  const bilderVorladen = (schluessel) => {
    const D = LB_BILDDATEN, uris = [...new Set(schluessel.map(k => (D[k] || {}).farbe).filter(Boolean))].filter(u => !BILD_HALT.has(u));
    if (!uris.length) return;
    const warte = typeof requestIdleCallback === 'function' ? (f) => requestIdleCallback(f, { timeout: 600 }) : (f) => setTimeout(f, 120);
    const schritt = () => {
      for (let n = 0; n < 3 && uris.length; n++) { const u = uris.shift(), i = new Image(); i.decoding = 'async'; i.src = u; BILD_HALT.set(u, i); i.decode().catch(() => {}); }
      while (BILD_HALT.size > 14) BILD_HALT.delete(BILD_HALT.keys().next().value);
      if (uris.length) warte(schritt);
    };
    warte(schritt);
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
    karte.append(LB.szeneBild(b, 'szene-gross-bild'), el('div', 'szene-gross-satz', satz(sz)), x);
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
    const baueOrt = ({ w, t, pool }) => {
      const gruppeEl = el('section', 'galerie-ort');
      const kopf = el('div', 'galerie-kopf');
      const z = el('span', 'chip-zeichen'); z.append(faerbe(w.teil ? w.zeichen.join('') : t.zeichen));
      kopf.append(WEG.ortBild(w.ort, 'klein', w.voegel), z);
      const reihe = el('div', 'galerie-reihe');
      for (const wort of pool) {
        if (istGesammelt(t, wort, g)) {
          const k = knopf('galerie-bild', bild(bildSchluessel(wort), '', 'farbe', true), () => {
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
            const k = knopf('galerie-bild galerie-szene', LB.szeneBild(b), () => {
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
    };
    const truhen = LAUTBUCH_FOLGE.FOLGE.map(f => TEILE[f.teil]).filter(t => t && t.schatz && licht[t.id].boss);
    const schatzWand = () => {
      if (!truhen.length) return;
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
    };
    const orte = galerieOrte(), offen = orte.splice(2);
    orte.forEach(baueOrt);
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
    const knoepfe = [ueben, farbig, malen];
    const fertig = () => { schatzWand(); knoepfe.forEach(k => ruhe(k, !gesammelt.length)); };
    if (offen.length) {
      knoepfe.forEach(k => ruhe(k, true));
      const haeppchen = () => {
        if (!wand.isConnected) return;
        const t0 = performance.now();
        try { do baueOrt(offen.shift()); while (offen.length && performance.now() - t0 < 10); }
        finally { if (offen.length) setTimeout(haeppchen, 0); else fertig(); }
      };
      setTimeout(haeppchen, 700);
    } else fertig();
    const werkzeug = el('div', 'werkzeug galerie-werkzeug');
    werkzeug.append(ueben, farbig, malen);
    unten.append(werkzeug);
  }
  const bewohnerJetzt = (L = licht, fs) => {
    const stand = wegStand(undefined, L), liste = [], selbst = figurBewohner(fs);
    WEG.teile.forEach((w, i) => { const o = ortVon(w); if (o && stand[w.id] === 'meister' && o.ids.includes('boss')) for (const b of o.t.bewohner || []) if (b.s !== selbst) liste.push([b, i]); });
    return liste;
  };
  let wegKarte = null, imGang = false;
  const zumHausGehen = (danach) => {
    if (imGang) return;
    const K = wegKarte, w = K && K.wimpel, h = K && K.E.dinge.querySelector('.haus-ding');
    const tr = w && (w.getAttribute('transform') || '').match(/translate\(([-\d.]+)[ ,]+([-\d.]+)\)/), tuer = h && (h.dataset.tuer || '').split(' ').map(Number);
    if (!tr || !tuer || tuer.length < 2 || ruhig() || !w.animate || !w.isConnected || !document.body.classList.contains('auf-weg') || getComputedStyle(w).display === 'none') return danach();
    const dx = tuer[0] - +tr[1], dy = tuer[1] - +tr[2], dauer = Math.round(Math.max(500, Math.min(1100, Math.hypot(dx, dy) * 9)));
    let los = false;
    imGang = true;
    const festhalten = () => { try { a.commitStyles(); } catch (e) {  } a.cancel(); };
    const weiter = () => {
      if (los) return; los = true; imGang = false; document.removeEventListener('pointerdown', abkuerzen, true);
      if (!w.isConnected || !document.body.classList.contains('auf-weg')) return;
      festhalten(); danach();
    };
    const abkuerzen = (e) => {
      const ziel = e.target.closest && e.target.closest('.schienen-knopf, [data-ort], .haus-ding');
      if (!ziel || ziel.matches('.haus-ding, [data-ziel="zimmer"]')) return a.finish();
      if (performance.now() < gesperrtBis) return;
      los = true; imGang = false; document.removeEventListener('pointerdown', abkuerzen, true); festhalten();
    };
    figurSchritte(K, dauer, dx);
    const a = w.animate([{ translate: '0px 0px' }, { translate: `${dx}px ${dy}px` }], { duration: dauer, easing: 'ease-in-out', fill: 'forwards' });
    a.onfinish = weiter;
    setTimeout(weiter, dauer + 500);
    setTimeout(() => { if (!los) document.addEventListener('pointerdown', abkuerzen, true); }, 150);
    if (window.LB_VORLADEN) window.LB_VORLADEN.starten();
  };
  const zimmerMitGang = () => { if (_A.imWechsel || document.body.classList.contains('im-zimmer')) return; zumHausGehen(() => zimmer()); };
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
  const druckQuer = (art) => !!(einst.druckQuer || {})[art];
  const druckSeite = (woerter, art, mitWort, je, quer) => {
    const seite = el('section', 'druck-seite je-' + je + (quer ? ' quer' : ''));
    for (const w of woerter) {
      const sz = szeneVon.get(w), schl = sz ? w : bildSchluessel(w);
      const f = el('figure', 'druck-bild' + (sz ? ' druck-szene' : '')), roh = LB_BILDDATEN[schl];
      if (roh && roh.farbe) { const im = new Image(); im.alt = ''; im.src = art === 'linie' && roh.linie ? roh.linie : roh.farbe; f.append(im); }
      else f.append(sz ? LB.szeneBild(sz.b) : bild(schl));
      if (mitWort) f.append(el('figcaption', 'druck-wort', satz(sz ? sz.sz : w)));
      seite.append(f);
    }
    return seite;
  };
  const druckblatt = (woerter, art, mitWort = false, je = druckJe(art), quer = druckQuer(art)) => {
    if (!woerter.length) return;
    const seiten = [];
    for (let i = 0; i < woerter.length; i += je) {
      const s = druckSeite(woerter.slice(i, i + je), art, mitWort, je, quer); s.classList.add('vorschau');
      seiten.push(el('div', 'druck-pdf ' + art + (mitWort ? ' mit-wort' : ''), s));
    }
    LB_AUSGABE.pdf(seiten, art === 'linie' ? 'Lautbuch zum Ausmalen.pdf' : 'Lautbuch Bilder.pdf', { quer });
  };
  function druckRaum(woerter, art) {
    leer();
    document.body.classList.add('auf-welt', 'ohne-unten', 'in-druck');
    galerieKopf(art === 'linie' ? 'zum Ausmalen' : 'farbig drucken');
    const box = el('div', 'druck-raum');
    box.dataset.ort = 'druck'; box.dataset.haupt = '';
    const stapel = el('div', 'druck-stapel ' + art);
    const zeigen = (neu) => {
      const je = druckJe(art), seiten = Math.ceil(woerter.length / je), quer = druckQuer(art);
      stapel.classList.toggle('mit-wort', !!einst.druckWort);
      stapel.classList.toggle('quer', quer); box.classList.toggle('quer', quer);
      stapel.replaceChildren();
      for (let i = Math.min(seiten, 3) - 1; i > 0; i--) stapel.append(el('div', 'druck-unterblatt u' + i));
      const s = druckSeite(woerter.slice(0, je), art, !!einst.druckWort, je, quer);
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
    const seiteIkon = (n, quer) => { const s = el('span', 'seite-ikon je-' + n + (quer ? ' quer' : '')); s.setAttribute('aria-hidden', 'true'); for (let i = 0; i < n; i++) s.append(el('i')); return s; };
    const lage = gruppe('druck-lage', 'Seite', [[false, [seiteIkon(0), el('span', null, 'hoch')], 'Seite hoch'], [true, [seiteIkon(0, true), el('span', null, 'quer')], 'Seite quer']], druckQuer(art),
      (q) => { einst.druckQuer = Object.assign({}, einst.druckQuer, { [art]: q }); });
    const format = gruppe('druck-format', 'Bilder je Seite', DRUCK_JE.map(n => [n, seiteIkon(n), n === 1 ? 'ein Bild je Seite' : n + ' Bilder je Seite']), druckJe(art),
      (n) => { einst.druckJe = Object.assign({}, einst.druckJe, { [art]: n }); });
    const wort = gruppe('druck-wort-wahl', 'Wort', [[true, 'mit Wort', 'mit Wort'], [false, 'ohne Wort', 'ohne Wort']], !!einst.druckWort,
      (w) => { einst.druckWort = w; });
    const los = knopf('druck-los', [sym('bild'), el('span', null, 'drucken')], () => druckblatt(woerter, art, !!einst.druckWort, druckJe(art), druckQuer(art)), 'drucken');
    const steuer = el('div', 'druck-steuer');
    steuer.append(lage, format, wort, los);
    box.append(stapel, steuer);
    main.append(box);
    zeigen(false);
  }
  const oeffne = (l) => { const t = TEILE[l.teil]; if (t) zumOrt(ortZu(t, l.frei)); };

  const nachRegal = (fn) => (window.LB_START && window.LB_START.offen() ? window.LB_START.nachher(fn) : fn());
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
    if (neu) nachRegal(() => setTimeout(() => nachRegal(() => { if (land.isConnected) wegLichtung(K, WEG.teile.indexOf(neu), stand); }), ruhig() ? 0 : 700));
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
  const bildDaten = (k) => LB_BILDDATEN[k];
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
  const figurBewohner = (fs = figurStand()) => { const f = figurVon(fs.wer); return f ? (f.bw || f.s) : null; };
  const mbId = (m) => m[0] + '.' + m[1];
  const mbStand = (t) => lies('lautbuch.akt.' + t + '.v1', {}) || {};
  const mbGelesen = (teil, lv) => {
    const s = mbStand(teil); if (s[lv] === true || s.boss === true) return true;
    const F = (LAUTBUCH_FOLGE.FOLGE || []).map(f => f.teil), i = F.indexOf(teil);
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
    K.wimpel.querySelectorAll('.figur-koerper, .figur-schatten, .figur-ring').forEach(x => x.remove());
    const f = figurVon(figurStand().wer);
    K.wimpel.classList.toggle('figur', !!f);
    const flaeche = K.wimpel.querySelector('.ding-flaeche');
    if (!f) { flaeche.setAttribute('x', -8); flaeche.setAttribute('y', -40); flaeche.setAttribute('width', 64); flaeche.setAttribute('height', 48); return; }
    const { H, S } = figurMass(K), x0 = -S * .3, y0 = -S * .95;
    const g = figurKoerper(f, S, x0, y0);
    K.wimpel.append(sv('ellipse', { cx: x0 + S / 2, cy: 2, rx: S * .46, ry: 5.5, class: 'ding-ring ding-hinweis figur-ring' }), sv('ellipse', { cx: x0 + S / 2, cy: 1, rx: S * .3, ry: 3, class: 'figur-schatten' }), g);
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
    wegKarte = K;
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
    if (window.LB_HAUS && zimmerDa) window.LB_HAUS(K, { frei, ruhig, zimmer: () => zimmerMitGang(), neu: () => !!(window.LB_ZIMMER.neu && window.LB_ZIMMER.neu(zimmerApi())) });
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
        sv('ellipse', { cx: 13, cy: 27, rx: 20, ry: 6, class: 'ding-ring ding-hinweis' }),
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
    nachRegal(() => { if (K.E.dinge.isConnected) figurNachher(K); });
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
    const roh = LB_BILDDATEN[schl];
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
    const T = 1900, bildEl = koerper.querySelector('.ding-bild'), zu = bildEl && bildEl.querySelector('image'), roh = LB_BILDDATEN['ding-buch-offen'];
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

  galerie = sanft(galerie, true);
  zimmer = sanft(zimmer, true);
  druckRaum = sanft(druckRaum, 'beiTipp');
  weg = sanft(weg, true);
  return { GALERIE_KEY, sammle, istGesammelt, galerieOrte, sinne, sinnDa, waehleSinn, sinnVorladen, bilderVorladen, sammleSzene, galerie, bewohnerJetzt, zimmerMitGang, zimmer, galerieKopf, oeffne, weg, FIGUR_KEY, figurStand, FIGUR_BILD, FIGUR_SEITE, druckRaum };
}
