import LB from './lb_schrift.mjs';
import './lb_symbole.mjs';
import './lb_bilder.mjs';
import { ruhig, kommt, geht, tausche } from './lb_bewegung.mjs';
import { knopf, mitSymbol } from './lb_knopf.mjs';
import { licht, speichern } from './lb_speicher.mjs';
import WEG from './lb_weg.mjs';
const { el, fall, sym, bildSchluessel, bildPool, ablenkerWoerter } = LB;

export function bilderFeldModul(_A) {
  const { leer, ortZu, raumHuelle, gruppe, ziehung, kopfLeiste, sinne, sinnDa, bilderVorladen, galerieKopf, sanft } = _A;
  const tippenFrei = (...x) => _A.tippenFrei(...x);
  const ruhe = (...x) => _A.ruhe(...x);
  const geschichte = (...x) => _A.geschichte(...x);
  const passeLauf = (...x) => _A.passeLauf(...x);
  const zuordnen = (...x) => _A.zuordnen(...x);
  const abtippen = (...x) => _A.abtippen(...x);
  const titel = (...x) => _A.titel(...x);
  const lauf = (...x) => _A.lauf(...x);
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
      .flatMap(lv => sinne(lv).filter(sn => sinnDa(lv, sn))).filter(sn => sn.wahl.every(b => LB.hatSzene(b)));
    const ziehG = geschichten.length ? ziehung(geschichten) : null;
    let punkte = 0, modus = 'zuordnen';
    const goldSchl = () => modus === 'tippen' ? 'tippen' : modus === 'geschichte' ? 'geschichte' : 'bilder';
    const gesichert = () => !!opt.galerie || !!licht[teil.id][goldSchl()];
    const golden = () => !opt.galerie && !!licht[teil.id][goldSchl()];
    const serieStand = () => opt.galerie ? 0 : Math.min(ZIEL - 1, (licht[teil.id].serie || {})[goldSchl()] | 0);
    const serieSetzen = (n) => {
      const o = licht[teil.id];
      if (n) (o.serie || (o.serie = {}))[goldSchl()] = n;
      else if (o.serie) { delete o.serie[goldSchl()]; if (!Object.keys(o.serie).length) delete o.serie; }
      speichern(teil.id);
    };
    const kopf = el('div', 'serie-kopf');
    kopf.append(el('span', 'serie-name', 'Serie'));
    const punktEl = Array.from({ length: ZIEL }, () => { const p = el('i', 'serie-punkt'); kopf.append(p); return p; });
    const punkteZeichnen = () => punktEl.forEach((p, i) => p.classList.toggle('an', gesichert() || i < punkte));
    const vierZiehen = () => { const t = []; let n = 0; while (t.length < Math.min(4, pool.length) && n++ < 50) { const w = zieh(); if (!t.includes(w)) t.push(w); } return t; };
    let vorab = null, vorabG = null;
    const vier = () => { const t = vorab || vierZiehen(); vorab = null; return t; };
    const holeG = () => { const s = vorabG || ziehG(); vorabG = null; return s; };
    const vorausziehen = () => {
      if (ziehG) { if (!vorabG) vorabG = ziehG(); bilderVorladen(vorabG.wahl.map(b => b.s)); }
      if (!vorab) vorab = vierZiehen();
      bilderVorladen(vorab.map(bildSchluessel));
    };
    const knopfPlatz = el('div', 'serie-knopf');
    const knoepfe = (...k) => { knopfPlatz.replaceChildren(...k); k.forEach(x => kommt(x, 0, 8, 360)); };
    const amFehler = () => { if (!gesichert() && punkte) { punkte = 0; serieSetzen(0); punkteZeichnen(); } };
    const amEnde = (fall, ohneFehler) => {
      if (!ohneFehler) { fall.classList.add('freude'); lauf(); return; }
      if (gesichert()) { lauf(); return; }
      punkte++; punkteZeichnen();
      if (punkte < ZIEL) { serieSetzen(punkte); lauf(); return; }
      licht[teil.id][goldSchl()] = true; serieSetzen(0);
      punkteZeichnen();
      fall.classList.add('freude');
      const o = ortZu(teil, 'bilder'), w = o && o.w;
      knoepfe(knopf('', 'Weiter üben', () => lauf({ ohneFreude: true })), knopf('', [w ? WEG.ortBild(w.ort, 'klein', w.voegel) : sym('haus'), el('span', null, 'zum Ort')], () => titel(teil, { ort: w && w.id, neu: goldSchl() === 'bilder' ? 'bilder' : null }), 'zum Ort'));
    };
    const lauf = (opt = {}) => {
      knopfPlatz.querySelectorAll('.pruefen-knopf').forEach(k => ruhe(k, true));
      serienWechsel(buehne.querySelector('.serien-fall'), baueFall, opt);
    };
    const baueFall = () => {
      const f = modus === 'geschichte' && ziehG
        ? geschichte(teil, buehne, { zieh: holeG, fehler: amFehler, fertig: amEnde })
        : modus === 'tippen' && tippOk
        ? abtippen(teil, daten, buehne, { fehler: amFehler, fertig: amEnde, pruefPlatz: knopfPlatz })
        : zuordnen(teil, daten, buehne, { treffer: vier(), fehler: amFehler, fertig: amEnde, pruefPlatz: knopfPlatz });
      if (f && golden()) f.classList.add('golden');
      setTimeout(vorausziehen, 400);
      return f;
    };
    const inhalt = () => {
      knopfPlatz.replaceChildren();
      punkte = serieStand(); punkteZeichnen();
      baueFall();
    };
    const aufgaben = [['zuordnen', 'zuordnen'], ...(tippOk ? [['tippen', 'abtippen']] : []), ...(ziehG ? [['geschichte', 'Geschichte']] : [])];
    if (aufgaben.length > 1) auswahl.append(gruppe('Aufgabe', aufgaben, modus, (w) => { modus = w; tausche(buehne, inhalt); }));
    if (!opt.galerie) auswahl.after(kopf);
    buehne.after(knopfPlatz);
    punkteZeichnen();
    inhalt();
    if (window.ResizeObserver) { const ro = new ResizeObserver(() => passeLauf(buehne)); ro.observe(buehne); _A.abbau.push(() => ro.disconnect()); }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (buehne.isConnected) passeLauf(buehne); });
  }

  bilderRaum = sanft(bilderRaum, 'beiTipp');
  return { bilderRaum };
}
