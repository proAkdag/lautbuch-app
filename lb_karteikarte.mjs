import LB from './lb_schrift.mjs';
import './lb_symbole.mjs';
import './lb_bilder.mjs';
import { ruhig } from './lb_bewegung.mjs';
import { tipp, knopf, mitSymbol } from './lb_knopf.mjs';
const { el } = LB;

export function karteikarteModul(_A) {
  const { ziehung } = _A;
  const mittigAlle = (...x) => _A.mittigAlle(...x);
  const SCHWELLE_WISCHEN = 60;
  const WISCHEN_STEIL = 1.5;
  const SCHWUNG_MS = 300;
  const ECKE = 72;
  const STIFT_MS = 2000;
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
    const einpassenKarte = (k) => {
      if (!k || !k.isConnected) return;
      k.style.fontSize = '';
      const cs = getComputedStyle(flaeche), basis = parseFloat(getComputedStyle(k).fontSize);
      const breit = flaeche.clientWidth - 32, hoch = (flaeche.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom)) * .8;
      if (breit < 60 || hoch < 60 || !k.offsetWidth) return;
      const passt = basis * Math.min(breit / k.offsetWidth, hoch / k.offsetHeight);
      const neuPx = Math.max(32, Math.min(passt, window.innerWidth < 600 ? 260 : basis));
      if (Math.abs(neuPx - basis) > .5) { k.style.fontSize = neuPx.toFixed(1) + 'px'; mittigAlle(k); }
    };
    if (window.ResizeObserver) { const ro = new ResizeObserver(() => { if (!flaeche.isConnected) ro.disconnect(); else einpassenKarte(aktuell); }); ro.observe(flaeche); }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => einpassenKarte(aktuell));
    const zeige = (schl, richtung) => {
      const neu = el('div', 'karteikarte');
      const f = quelle.form(schl);
      neu.append(f.knoten);
      neu.classList.toggle('lang', f.lang);
      const alt = aktuell;
      aktuell = neu;
      navRuhe();
      if (opt.amZeigen) opt.amZeigen(schl, neu, pos);
      flaeche.querySelectorAll('.karteikarte').forEach(k => { if (k !== alt) k.remove(); });
      if (!alt) { flaeche.append(neu); einpassenKarte(neu); return; }
      alt.getAnimations?.().forEach(a => a.cancel());
      if (ruhig() || !alt.animate) { alt.replaceWith(neu); einpassenKarte(neu); return; }
      flaeche.append(neu); einpassenKarte(neu);
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
    let x0 = null, y0 = null, t0 = 0, langT = null, langFertig = false;
    let zeiger = null, nurZeigen = false, stiftBis = 0;
    const langWeg = () => { clearTimeout(langT); langT = null; if (aktuell) aktuell.classList.remove('drueckt'); };
    const inEcke = (e) => { const r = aktuell && aktuell.getBoundingClientRect(); return !!r && e.clientX >= r.right - ECKE && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.top + ECKE; };
    const stift = (e) => { if (e.pointerType === 'pen') stiftBis = performance.now() + STIFT_MS; };
    flaeche.addEventListener('pointerdown', (e) => {
      stift(e);
      if (zeiger != null) return;
      zeiger = e.pointerId; x0 = e.clientX; y0 = e.clientY; t0 = performance.now(); langFertig = false; langWeg();
      nurZeigen = e.pointerType === 'pen' || performance.now() < stiftBis;
      if (!opt.lang || nurZeigen || !inEcke(e)) return;
      if (aktuell) aktuell.classList.add('drueckt');
      langT = setTimeout(() => { langT = null; langFertig = true; if (aktuell) aktuell.classList.remove('drueckt'); opt.lang(); }, 600);
    });
    flaeche.addEventListener('pointermove', (e) => { stift(e); if (e.pointerId === zeiger && langT && x0 != null && Math.abs(e.clientX - x0) > 12) langWeg(); });
    const ende = (e) => { if (e.pointerId === zeiger) { langWeg(); zeiger = null; } };
    ['pointerleave', 'pointercancel'].forEach(ev => flaeche.addEventListener(ev, ende));
    if (opt.lang) flaeche.addEventListener('contextmenu', (e) => e.preventDefault());
    flaeche.addEventListener('pointerup', (e) => {
      stift(e);
      if (e.pointerId !== zeiger) { e.stopImmediatePropagation(); return; }
      langWeg(); zeiger = null;
      if (langFertig || nurZeigen) { langFertig = false; x0 = y0 = null; e.stopImmediatePropagation(); }
    });
    flaeche.addEventListener('pointerup', tipp((e) => {
      const dx = x0 == null ? 0 : e.clientX - x0, dy = y0 == null ? 0 : e.clientY - y0, dauer = performance.now() - t0; x0 = y0 = null;
      if (Math.abs(dx) < SCHWELLE_WISCHEN || Math.abs(dx) < WISCHEN_STEIL * Math.abs(dy)) return;
      if (dauer > SCHWUNG_MS) return;
      if (dx < 0) vor(); else zurueck();
    }));
    vor();
    return {
      weiter: vor, zurueck,
      schl: () => verlauf[pos], karte: () => aktuell,
      neu: () => { naechste = (opt.folge ? folgeVon : ziehung)(quelle.schluessel()); verlauf.length = 0; pos = -1; aktuell = null; flaeche.replaceChildren(); vor(); }
    };
  }

  return { karteikarte };
}
