import LB from './lb_schrift.mjs';
import './lb_symbole.mjs';
import './lb_bilder.mjs';
import LB_AUSGABE from './lb_ausgabe.mjs';
import LB_BILDDATEN from './lb_bilder_daten.mjs';
import LAUTBUCH_FOLGE from './lb_folge.mjs';
import { ruhig } from './lb_bewegung.mjs';
import { knopf } from './lb_knopf.mjs';
import { licht, speichern } from './lb_speicher.mjs';
import WEG from './lb_weg.mjs';
import './lb_lernweg_daten.mjs';
const TEILE =  (window).LAUTBUCH_TEILE;
const { el, satz, mische, sym } = LB;

export function schatzModul(_A) {
  const { leer, ortZu, ortChip, main, oben, galerieKopf, sanft } = _A;
  const SCHATZ_SEITE = 1000;
  const SCHATZ_STUFEN = [[0, 10, 0, 0], [2, 20, 1, 0], [4, 25, 2, 0], [7, 30, 2, 1], [11, 35, 2, 2], [15, 40, 3, 2]];
  const schatzStufe = (teil) => {
    const reihe = LAUTBUCH_FOLGE.FOLGE.map(f => f.teil).filter(id => TEILE[id] && TEILE[id].schatz);
    const k = Math.max(0, reihe.indexOf(teil.id));
    return SCHATZ_STUFEN.filter(s => k >= s[0]).pop();
  };
  const schirmWinkel = () => (screen.orientation && typeof screen.orientation.angle === 'number') ? screen.orientation.angle
    : (typeof window.orientation === 'number' ? (window.orientation + 360) % 360 : 0);
  function schatzLegen(blatt, teil) {
    const rnd = LB.saat('schatz|' + teil.id);
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
      for (; versuch < 24 && !lage; versuch++) lage = legen(kisten, LB.saat(`schatz|${teil.id}|${versuch}`));
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
    LB_AUSGABE.pdf([el('div', 'schatz-pdf', kopie)], 'Lautbuch Schatzblatt.pdf');
  };
  function schatz(teil, opt = {}) {
    if (!licht[teil.id].schatz) { licht[teil.id].schatz = true; speichern(teil.id); }
    leer();
    document.body.classList.add('ohne-unten', 'auf-schatz');
    if (opt.galerie) galerieKopf('Schatz'); else oben.append(ortChip(ortZu(teil, 'boss'), null));
    const box = el('div', 'schatz');
    box.dataset.ort = 'schatz'; box.dataset.haupt = '';
    const offen = !!LB_BILDDATEN['ding-truhe-offen'];
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
    _A.abbau.push(() => { ro.disconnect(); quelle.removeEventListener(ereignis, messen); });
  }
  const SCHATZ_QUER = '(orientation: landscape) and (min-aspect-ratio: 5/4)';

  schatz = sanft(schatz, 'beiTipp');
  return { schatz };
}
