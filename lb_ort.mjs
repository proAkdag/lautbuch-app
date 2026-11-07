import LB from './lb_schrift.mjs';
import './lb_symbole.mjs';
import './lb_bilder.mjs';
import { ruhig } from './lb_bewegung.mjs';
import { knopf } from './lb_knopf.mjs';
import { licht } from './lb_speicher.mjs';
import WEG from './lb_weg.mjs';
const { el, faerbe, satz, sym, bild, bildSchluessel, bildPool } = LB;

export function ortModul(_A) {
  const { leer, wegTeil, ortVon, ortZu, ortMeister, probeVon, liegtHier, sv, main, VERSUCH, bilderVorladen, kameraHinein, sanft } = _A;
  const bilderRaum = (...x) => _A.bilderRaum(...x);
  const bossRaum = (...x) => _A.bossRaum(...x);
  const schatz = (...x) => _A.schatz(...x);
  const level = (...x) => _A.level(...x);
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
     bilderVorladen(bildPool(teil).slice(0, 14).map(bildSchluessel));
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

  titel = sanft(titel, true);
  return { titel };
}
