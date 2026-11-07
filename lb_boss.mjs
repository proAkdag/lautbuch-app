import LB from './lb_schrift.mjs';
import './lb_symbole.mjs';
import './lb_bilder.mjs';
import { ruhig, kommt, tausche } from './lb_bewegung.mjs';
import { knopf, mitSymbol } from './lb_knopf.mjs';
import { licht, speichern } from './lb_speicher.mjs';
import WEG from './lb_weg.mjs';
const { el, faerbe, wort, satz, mische, anlauf, sym, bild } = LB;

export function bossModul(_A) {
  const { hoere, leer, ortZu, raumHuelle, hinweisKarte, hinweisZu, stolper, herkunft, steinFlug, zeilenSteine, kopfLeiste, unten, waehleSinn, sinnVorladen, sammleSzene, sanft } = _A;
  const titel = (...x) => _A.titel(...x);
  const level = (...x) => _A.level(...x);
  const weg = (...x) => _A.weg(...x);
  function bossRaum(teil) {
    leer();
    document.body.classList.add('boss');
    kopfLeiste(teil, 'boss', teil.boss);
    const r = el('span', 'reiter-tuer boss-tuer'); r.setAttribute('aria-pressed', 'true'); r.append(mitSymbol('boss', 'Boss'));
    const raum = raumHuelle([r], 'raum-boss', teil.id + '|boss');
     sinnVorladen(teil, teil.boss);
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
    const zeilenEinpassen = () => {
      if (!seite.isConnected) return;
      const breit = seite.clientWidth - 8; if (breit < 100) return;
      for (const z of zeilen) {
        z.style.fontSize = '';
        if (z.classList.contains('ist-satz')) continue;
        const basis = parseFloat(getComputedStyle(z).fontSize);
        z.style.maxWidth = 'none'; const w = z.offsetWidth; z.style.maxWidth = '';
        if (!w) continue;
        const ziel = Math.min(basis * breit / w, window.innerWidth < 600 ? basis * 2 : basis);
        if (Math.abs(ziel - basis) > .5) z.style.fontSize = ziel.toFixed(1) + 'px';
      }
    };
    if (window.ResizeObserver) { let b0 = 0; const ro = new ResizeObserver(() => { if (!seite.isConnected) { ro.disconnect(); return; } const b = seite.clientWidth; if (b !== b0) { b0 = b; zeilenEinpassen(); } }); ro.observe(seite); }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(zeilenEinpassen);

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
          const kn = knopf('sinn-bild', LB.szeneBild(b, '', true), () => {
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
        box.append(knopf('', 'Nochmal', () => tausche([raum, unten], () => { _A.abbau.forEach(f => f()); _A.abbau = []; raum.replaceChildren(); unten.replaceChildren(); lauf(teil, lv, raum, istBoss); })));
        if (!istBoss && stolper(teil, lv).length) box.append(knopf('', mitSymbol('haus', 'Stolpersteine'), () => level(teil, lv, 'ueben', 'stolper')));
        box.append(knopf('', [w ? WEG.ortBild(w.ort, 'klein', w.voegel) : sym('haus'), el('span', null, 'zum Ort')], () => titel(teil, { ort: w && w.id }), 'zum Ort'));
      }
      if (lv.frage) { const fr = el('p', 'frage-begleitung'); fr.append(sym('mehr'), el('span', null, 'Frage: ' + lv.frage)); box.prepend(fr); }
      tausche(unten, () => unten.replaceChildren(box), { ruhend: true });
    };
  }

  bossRaum = sanft(bossRaum, 'beiTipp');
  return { bossRaum, lauf };
}
