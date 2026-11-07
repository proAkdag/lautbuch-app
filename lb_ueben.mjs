import LB from './lb_schrift.mjs';
import './lb_symbole.mjs';
import './lb_bilder.mjs';
import { ruhig, anim, fertigVon, kommt, tausche } from './lb_bewegung.mjs';
import { knopf, mitSymbol, langDruck } from './lb_knopf.mjs';
import { schluessel, licht, speichern, einst } from './lb_speicher.mjs';
import WEG from './lb_weg.mjs';
const { el, faerbe, wort, sym } = LB;

export function uebenModul(_A) {
  const { hoere, leer, ortZu, einpassen, hinweisKarte, karteikarte, inForm, schreibSchalter, gruppe, lesezeichen, setzeLesezeichen, mischSchl, marken, markSchl, stolper, unten } = _A;
  const tippenFrei = (...x) => _A.tippenFrei(...x);
  const ruhe = (...x) => _A.ruhe(...x);
  const zuordnen = (...x) => _A.zuordnen(...x);
  const abtippen = (...x) => _A.abtippen(...x);
  const weg = (...x) => _A.weg(...x);
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
    if (window.ResizeObserver) { const ro = new ResizeObserver(neuEinpassen); ro.observe(buehne); _A.abbau.push(() => ro.disconnect()); }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (buehne.isConnected) neuEinpassen(); });
    if (lv.hinweis) hinweisKarte(lv);
  }

  return { ueben };
}
