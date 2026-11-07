import LB from './lb_schrift.mjs';
import './lb_symbole.mjs';
import './lb_bilder.mjs';
import LAUTBUCH_FOLGE from './lb_folge.mjs';
import { ruhig, anim, fertigVon, tausche } from './lb_bewegung.mjs';
import { knopf } from './lb_knopf.mjs';
import { licht } from './lb_speicher.mjs';
import WELT from './lb_welt.mjs';
const { el, faerbe, wort, satz, mische, fall, bild, bildSchluessel } = LB;

export function bilderSpielModul(_A) {
  const { ziehung, unten, sammle, sammleSzene } = _A;
  const mittigAlle = (...x) => _A.mittigAlle(...x);
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

  const geschichteZiel = new Map();
  const zielVon = (sn) => {
    const moeglich = sn.wahl.filter(b => b.s === sn.richtig || b.satz), letztes = geschichteZiel.get(sn.richtig);
    const frei = moeglich.length > 1 ? moeglich.filter(b => b.s !== letztes) : moeglich;
    const b = frei[Math.floor(Math.random() * frei.length)];
    geschichteZiel.set(sn.richtig, b.s);
    return { s: b.s, satz: b.s === sn.richtig ? sn.satz : b.satz };
  };
  function geschichte(teil, buehne, ctx = {}) {
    const sn = ctx.zieh(), ziel = zielVon(sn), fall = el('div', 'serien-fall'), feld = el('div', 'sinn geschichte');
    const wahl = el('div', 'sinn-wahl');
    let fehler = false, fertig = false;
    for (const b of mische(sn.wahl.slice())) {
      const kn = knopf('sinn-bild', LB.szeneBild(b, '', true), () => {
        if (fertig || kn.classList.contains('erloschen')) return;
        if (b.s !== ziel.s) { kn.classList.add('erloschen'); kn.setAttribute('aria-disabled', 'true'); fehler = true; if (ctx.fehler) ctx.fehler(); return; }
        fertig = true; kn.classList.add('gold'); wahl.classList.add('entschieden'); sammleSzene(ziel.s);
        setTimeout(() => { if (fall.isConnected && ctx.fertig) ctx.fertig(fall, !fehler); }, ruhig() ? 0 : 700);
      });
      kn.dataset.s = b.s; kn.setAttribute('aria-label', 'Bild ' + (wahl.children.length + 1));
      wahl.append(kn);
    }
    feld.append(el('div', 'sinn-satz', satz(ziel.satz)), wahl);
    feld.dataset.ziel = ziel.s;
    fall.append(feld);
    buehne.replaceChildren(fall);
    return fall;
  }
  const passeLauf = (buehne) => {
    buehne.style.removeProperty('--zs');
    const fall = buehne.querySelector('.serien-fall');
    if (!fall || !(fall.querySelector('.zuordnen') || fall.classList.contains('abtippen'))) return;
    const cs = getComputedStyle(buehne);
    const hoch = buehne.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    const breit = buehne.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    if (hoch < 60 || breit < 60) return;
    let zs = 1;
    for (let k = 0; k < 8 && zs > .5; k++) {
      const r = fall.getBoundingClientRect(), unten = Math.max(r.bottom, ...[...fall.querySelectorAll('*')].map(e => e.getBoundingClientRect().bottom));
      const noetig = (unten - r.top) + (unten > r.bottom ? parseFloat(getComputedStyle(fall).paddingBottom) + parseFloat(getComputedStyle(fall).borderBottomWidth) : 0);
      const f = Math.min(hoch / noetig, breit / Math.max(fall.offsetWidth, fall.scrollWidth));
      if (f >= .999) break;
      zs = Math.max(.5, zs * f * .995);
      buehne.style.setProperty('--zs', zs.toFixed(3));
    }
  };
  function zuordnen(teil, lv, buehne, ctx = {}) {
    const treffer = ctx.treffer || mische(lv.bilder).slice(0, 4);
    let fehler = false;
    const bilder = mische(treffer.map(bildSchluessel));
    const woerter = mische([...treffer, ...mische(lv.ablenkerWoerter || []).slice(0, 2)]);
    const fall = el('div', 'serien-fall');
    const feld = el('div', 'zuordnen');
    const bildReihe = el('div', 'bild-reihe'), wortReihe = el('div', 'wort-reihe');
    for (const b of bilder) { const k = el('div', 'bild-karte'); k.dataset.b = b; k.append(LB.weichEin(bild(b)), el('div', 'ablage')); bildReihe.append(k); }
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
      c.append(wort(w));
      const h = el('div', 'wort-heim'); h.append(c); heim.set(c, h); karten.push(c);
      ziehbar(c, tippen, abgelegt);
      wortReihe.append(h);
    }
    if (window.ResizeObserver) new ResizeObserver(() => karten.filter(liegtAuf).forEach(passe)).observe(bildReihe);
    bildReihe.addEventListener('click', (e) => { const z = e.target.closest('.bild-karte'); if (z && gewaehlt && !e.target.closest('.wort-karte')) legen(gewaehlt, z); });
    feld.append(bildReihe, wortReihe);
    fall.append(feld);
    buehne.replaceChildren(fall);
    passeLauf(buehne);
    return fall;
  }
  const FOLGE = LAUTBUCH_FOLGE.TASTEN.flat();
  const zerlege = LAUTBUCH_FOLGE.zerlege, AEHNLICH = LAUTBUCH_FOLGE.AEHNLICH;
  const ZUSATZ = 3;
  function abtippen(teil, lv, buehne, ctx = {}) {
    const naechstes = ziehung(lv.bilder);
    const feld = el('div', 'abtippen serien-fall');
    let fehler = false;
    const vorlage = el('div', 'tipp-vorlage');
    const ablage = el('div', 'tipp-kacheln');
    feld.append(vorlage, ablage);
    buehne.replaceChildren(feld);
    let ziel = [], felder = [], kacheln = [], heim = new Map(), nomen = false, restBox = null, zeileJetzt = null, wortJetzt = null;
    const ordnen = () => { if (!feld.isConnected || !zeileJetzt) return; felderPassen(feld, zeileJetzt); if (restBox) reihenGleich(restBox); };
    if (window.ResizeObserver) { const ro = new ResizeObserver(() => { if (!feld.isConnected && !buehne.isConnected) ro.disconnect(); else ordnen(); }); ro.observe(feld); }
    const zeichne = (c) => {
      const g = c.dataset.g;
      c.replaceChildren(faerbe(c.dataset.k === 'G' ? g[0].toUpperCase() + g.slice(1) : g));
    };
    const passtIn = (c, f) => (c.dataset.b === 'anfang') === (f === felder[0]);
    const stand = () => {
      felder.forEach(f => f.classList.toggle('voll', !!f.firstElementChild));
      heim.forEach((platz, c) => platz.classList.toggle('leer', c.parentElement !== platz));
      pruef.zeigen(felder.every(f => f.firstElementChild));
    };
    const imFeld = (c) => felder.includes(c.parentElement);
    const nachHause = (c) => { const p = fliege(c, heim.get(c)); stand(); return p.then(stand); };
    const setzen = (c, f) => {
      const alt = f.firstElementChild, von = imFeld(c) ? c.parentElement : null;
      if (alt && alt !== c) { if (von) fliege(alt, von); else nachHause(alt); }
      fliege(c, f).then(stand); stand();
    };
    const tippen = (c) => {
      if (imFeld(c)) { nachHause(c); return; }
      const frei = felder.find(f => !f.firstElementChild && passtIn(c, f));
      if (frei) setzen(c, frei);
      else if (!ruhig()) anim(c, [{ transform: 'translateX(0)' }, { transform: 'translateX(-4px)' }, { transform: 'translateX(4px)' }, { transform: 'translateX(0)' }], { duration: 220 });
    };
    const abgelegt = (c, unter) => {
      const f = unter && unter.closest('.tipp-feld');
      if (f && felder.includes(f) && passtIn(c, f)) setzen(c, f);
      else if (imFeld(c)) nachHause(c);
      else { const t = c.style.transform; c.style.transform = ''; if (t && !ruhig()) anim(c, [{ transform: t }, { transform: 'translate(0px, 0px)' }], { duration: 300 }); }
    };
    const pruef = pruefKnopf(ctx.pruefPlatz, () => {
      const erste = felder[0].firstElementChild;
      const anfangRichtig = erste.dataset.g === ziel[0].toLowerCase() && erste.dataset.k === (nomen ? 'G' : 'k');
      const restRichtig = felder.slice(1).map(f => f.firstElementChild.dataset.g).join('') === ziel.slice(1).join('').toLowerCase();
      pruef.zeigen(false);
      if (anfangRichtig && restRichtig) {
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
      const roh = naechstes();
      wortJetzt = roh;
      ziel = zerlege(roh);
      nomen = /^[A-ZÄÖÜ]/.test(ziel[0]) && !/^[A-ZÄÖÜ]{2}/.test(ziel.join(''));
      vorlage.dataset.wort = roh;
      const zeile = el('div', 'tipp-felder');
      const breite = (g) => ' g' + Math.min(3, g.length);
      felder = ziel.map((g, k) => { const f = el('span', 'tipp-feld' + (k === 0 ? ' anfang' : '') + breite(g)); zeile.append(f); return f; });
      vorlage.replaceChildren(LB.weichEin(bild(bildSchluessel(roh), 'tipp-bild')), zeile);
      const frei = new Set();
      for (const z of WELT.zonen) for (const l of z.laute) if (WELT.stand(l, licht) !== 'nebel') frei.add(l.k);
      const g0 = ziel[0].toLowerCase();
      const art = (g) => /^([aeiouäöü]|ie|ei|au|eu|äu)$/.test(g);
      const nah = (AEHNLICH[g0] || []).filter(x => frei.has(x) && x !== g0);
      const andere = FOLGE.filter(k => frei.has(k) && k !== g0 && art(k) === art(g0));
      const sonst = FOLGE.filter(k => frei.has(k) && k !== g0);
      const aehn = nah.length ? mische(nah.slice(0, 2))[0] : mische(andere.length ? andere : sonst.length ? sonst : (AEHNLICH[g0] || ['a', 'o'].filter(k => k !== g0)).slice(0, 1))[0];
      const brauch = ziel.slice(1).map(g => g.toLowerCase());
      const mehr = mische(FOLGE.filter(k => frei.has(k) && !brauch.includes(k))).slice(0, ZUSATZ);
      const rest = [...brauch, ...mehr].sort((x, y) => FOLGE.indexOf(x) - FOLGE.indexOf(y));
      heim = new Map(); kacheln = [];
      const kachel = (g, k, bereich) => {
        const platz = el('span', 'kachel-platz' + breite(g));
        const c = el('span', 'kachel'); c.dataset.g = g; c.dataset.k = k; c.dataset.b = bereich;
        c.setAttribute('role', 'button'); c.setAttribute('aria-label', (k === 'G' ? 'groß ' : 'klein ') + g);
        platz.append(c); heim.set(c, platz); kacheln.push(c); zeichne(c);
        ziehbar(c, tippen, abgelegt);
        return platz;
      };
      const anfangBox = el('div', 'kachel-bereich anfang');
      anfangBox.setAttribute('role', 'group'); anfangBox.setAttribute('aria-label', 'Anfangsbuchstabe');
      anfangBox.append(...mische([[g0, 'G'], [g0, 'k'], [aehn, 'G'], [aehn, 'k']]).map(([g, k]) => kachel(g, k, 'anfang')));
      restBox = el('div', 'kachel-bereich rest');
      restBox.setAttribute('role', 'group'); restBox.setAttribute('aria-label', 'weitere Buchstaben');
      restBox.append(...rest.map(g => kachel(g, 'k', 'rest')));
      ablage.replaceChildren(anfangBox, restBox);
      stand();
      zeileJetzt = zeile;
      passeLauf(buehne);
      requestAnimationFrame(ordnen);
    };
    rundeBauen();
    return feld;
  }

  return { tippenFrei, ruhe, geschichte, passeLauf, zuordnen, abtippen };
}
