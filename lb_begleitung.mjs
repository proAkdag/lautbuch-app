import LB from './lb_schrift.mjs';
import './lb_symbole.mjs';
import './lb_bilder.mjs';
import './lb_lernweg_daten.mjs';
import LB_AUSGABE from './lb_ausgabe.mjs';
import LAUTBUCH_FOLGE from './lb_folge.mjs';
import { ruhig, kommt, geht } from './lb_bewegung.mjs';
import { knopf, mitSymbol } from './lb_knopf.mjs';
import { PROFIL, PK, lies, schreib, licht, speichern, EINST_KEY, einst } from './lb_speicher.mjs';
const { el, sym, bildSchluessel, bildPool } = LB;
const TEILE =  (window).LAUTBUCH_TEILE;

export function begleitung(A) {
  const { vollbildDa, sVoll, imVollbild, vollbildUmschalten, gruppe, LESEZEICHEN_KEY, GALERIE_KEY, FIGUR_KEY, figurStand } = A;
  const weg = (...x) => A.weg(...x), startZeigen = (...x) => A.startZeigen(...x);

  const HR_PDF_NAME = 'Mein_Lautbuch_Handreichung.pdf';
  const hrKurz = (H) => !!(H.abschnitte && H.abschnitte[0] && H.abschnitte[0].id === 'kurz');
  const hrPunkt = (tag, cls, x) => {
    const e = el(tag, cls), i = x.indexOf(': ');
    if (i > 0) e.append(el('strong', null, x.slice(0, i + 1)), x.slice(i + 1)); else e.textContent = x;
    return e;
  };
  const handreichungSeiten = () => {
    const H = window.LAUTBUCH_HANDREICHUNG;
    const bloecke = [];
    const kopfBlock = el('div', 'hr-pdf-titel');
    const heute = new Date().toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' });
    kopfBlock.append(el('div', 'hr-pdf-marke', 'Mein Lautbuch'), el('h1', null, H.titel), el('div', 'hr-pdf-unter', 'Handreichung für die Begleitperson · Stand ' + heute));
    bloecke.push([kopfBlock]);
    if (H.einleitung) bloecke.push([el('p', 'hr-pdf-p hr-pdf-einleitung', H.einleitung)]);
    const verz = el('div', 'hr-pdf-verz'); verz.append(el('div', 'hr-pdf-verz-kopf', 'Inhalt'));
    const verzZeilen = [], titelKoepfe = [], hochMarken = [];
    (H.abschnitte || []).forEach((a, i) => {
      const z = el('div', 'hr-pdf-verz-zeile'), nr = el('span', 'hr-pdf-verz-nr', '00');
      z.append(el('span', 'hr-pdf-verz-titel', (i + 1) + '. ' + a.titel), el('span', 'hr-pdf-verz-punkte'), nr);
      verz.append(z); verzZeilen.push([z, nr]);
    });
    const kurz = hrKurz(H);
    if (!kurz) bloecke.push([verz]);
    (H.abschnitte || []).forEach((a, i) => {
      const h = el('h2'), hoch = el('span', 'hr-pdf-hoch', '↑ Inhalt');
      h.append(el('span', null, (i + 1) + '. ' + a.titel), hoch); titelKoepfe.push(h); hochMarken.push(hoch);
      const teile = [];
      for (const t of a.teile || []) {
        if (t.p) teile.push(el('p', 'hr-pdf-p', t.p));
        if (t.tipp) teile.push(el('p', 'hr-pdf-tipp', t.tipp));
        if (t.liste) for (const x of t.liste) teile.push(kurz ? hrPunkt('p', 'hr-pdf-punkt', x) : el('p', 'hr-pdf-punkt', x));
      }
      bloecke.push([h, ...teile.splice(0, 1)]);
      for (const t of teile) bloecke.push([t]);
      if (kurz && i === 0) bloecke.push([verz]);
    });
    const bank = el('div', 'hr-pdf-bank'); document.body.append(bank);
    const seiten = [];
    const neu = () => { const s = el('div', 'hr-pdf-seite'), i = el('div', 'hr-pdf-inhalt'); s.append(i); bank.append(s); seiten.push([s, i]); return i; };
    let inhalt = neu();
    const passt = () => inhalt.scrollHeight <= inhalt.clientHeight + 1;
    for (const gruppe of bloecke) {
      inhalt.append(...gruppe);
      if (passt()) continue;
      gruppe.forEach(g => g.remove());
      if (inhalt.children.length) inhalt = neu();
      inhalt.append(...gruppe);
    }
    seiten.forEach(([s], i) => { const fuss = el('div', 'hr-pdf-fuss'); fuss.append(el('span', null, 'Mein Lautbuch · Handreichung'), el('span', null, 'Seite ' + (i + 1) + ' von ' + seiten.length)); s.append(fuss); });
    try { window.__lbHrAbgeschnitten = seiten.filter(([, i]) => i.scrollHeight > i.clientHeight + 1).length; } catch {}
    const seiteVon = (e) => seiten.findIndex(([s]) => s.contains(e));
    const abschnittSeite = titelKoepfe.map(seiteVon);
    verzZeilen.forEach(([, nr], i) => { nr.textContent = String(abschnittSeite[i] + 1); });
    const links = seiten.map(() => []);
    const flaeche = (e, s) => { const r = e.getBoundingClientRect(), p = seiten[s][0].getBoundingClientRect(); return { x: r.left - p.left, y: r.top - p.top, w: r.width, h: r.height }; };
    verzZeilen.forEach(([z], i) => { const s = seiteVon(z); links[s].push(Object.assign(flaeche(z, s), { seite: abschnittSeite[i] + 1 })); });
    const verzSeite = seiteVon(verz);
    hochMarken.forEach((m, i) => { const s = abschnittSeite[i]; links[s].push(Object.assign(flaeche(m, s), { seite: verzSeite + 1 })); });
    try { window.__lbHrAbschnittSeiten = abschnittSeite.map(x => x + 1); window.__lbHrVerzNr = verzZeilen.map(([, nr]) => nr.textContent); } catch {}
    const ergebnis = seiten.map(([s]) => s);
    ergebnis.forEach(s => s.remove());
    bank.remove();
    return { seiten: ergebnis, links };
  };
  async function handreichungPdf() {
    if (!LB_AUSGABE || !window.LAUTBUCH_HANDREICHUNG) return;
    try { if (document.fonts && document.fonts.ready) await document.fonts.ready; } catch {}
    const { seiten, links } = handreichungSeiten();
    try { window.__lbHrSeiten = seiten.length; window.__lbHrText = seiten.map(s => s.textContent); } catch {}
    LB_AUSGABE.pdf(seiten, HR_PDF_NAME, { satz: '… die Handreichung wird gemacht', hinweis: 'Die Handreichung. Zum Sichern das Teilen-Symbol des Geräts nutzen.', links });
  }

  function handreichung() {
    const H = window.LAUTBUCH_HANDREICHUNG;
    const d = el('dialog', 'schublade handreichung');
    d.setAttribute('aria-label', H.titel);
    const zu = () => geht(d, 12).then(() => d.close());
    const kopf = el('div', 'schublade-kopf');
    kopf.append(el('h2', null, H.titel));
    if (LB_AUSGABE && window.jspdf && typeof html2canvas !== 'undefined') kopf.append(knopf('hr-pdf', 'Als PDF speichern', () => zu().then(() => handreichungPdf()), 'Handreichung als PDF speichern'));
    kopf.append(knopf('ikon schliessen', '×', zu, 'schließen'));
    const inhalt = el('div', 'hr-inhalt');
    if (H.einleitung) inhalt.append(el('p', 'hr-einleitung', H.einleitung));
    const verzeichnis = el('nav', 'hr-verzeichnis'); verzeichnis.setAttribute('aria-label', 'Inhalt');
    const kurz = hrKurz(H);
    if (!kurz) inhalt.append(verzeichnis);
    const springe = (e) => e.scrollIntoView({ behavior: ruhig() ? 'auto' : 'smooth', block: 'start' });
    (H.abschnitte || []).forEach((a, i) => {
      const sek = el('section', 'hr-abschnitt'), nr = (i + 1) + '. ';
      const h = el('h3'); if (a.symbol) h.append(sym(a.symbol)); h.append(el('span', null, nr + a.titel));
      const zeile = el('div', 'hr-titelzeile');
      zeile.append(h, knopf('hr-hoch', '↑ Inhalt', () => springe(verzeichnis), 'Zurück zum Inhaltsverzeichnis'));
      sek.append(zeile);
      for (const t of a.teile || []) {
        if (t.p) sek.append(el('p', null, t.p));
        if (t.tipp) sek.append(el('p', 'hr-tipp', t.tipp));
        if (t.liste) { const ul = el('ul'); for (const x of t.liste) ul.append(kurz ? hrPunkt('li', null, x) : el('li', null, x)); sek.append(ul); }
      }
      inhalt.append(sek);
      if (kurz && i === 0) inhalt.append(verzeichnis);
      verzeichnis.append(knopf('hr-sprung', nr + a.titel, () => springe(sek)));
    });
    d.append(kopf, inhalt);
    d.addEventListener('close', () => d.remove());
    document.body.append(d);
    d.showModal();
    kommt(d, 0, 16, 360);
  }

  const bestaetigt = (b, frage) => {
    if (b.dataset.frage) return true;
    const alt = b.textContent;
    b.dataset.frage = '1'; b.textContent = frage;
    setTimeout(() => { delete b.dataset.frage; if (b.isConnected) b.textContent = alt; }, 4000);
    return false;
  };

  const LOESCH_UMFANG = [
    ['lichter', 'Lichter und Boss', false, true],
    ['haken', 'Zeilen-Haken', false, true],
    ['steine', 'Stolpersteine', false, true],
    ['gold', 'Gold der Bilder- und Abtipp-Aufgaben, Schatz', false, true],
    ['galerie', 'Galerie', false, false],
    ['mitbringsel', 'Mitbringsel und Bewohner-Plätze', false, false],
    ['figur', 'Gewählte Figur', true, false],
    ['zimmer', 'Zimmer', true, false],
    ['buecher', 'Bücher', false, false],
    ['name', 'Name', true, false],
    ['einst', 'Einstellungen', true, false]
  ];
  const LOESCH_KEYS = { bwGesehen: 'lautbuch.bewohner.gesehen.v1', bwPlatz: 'lautbuch.bewohner.platz.v1', zimmer: ['lautbuch.zimmer.v1', 'lautbuch.zimmer.karten.v1', 'lautbuch.zimmer.rad.v1'],
    buecher: 'lautbuch.buecher.v1', name: 'lautbuch.name.v1', einst: [EINST_KEY, 'lautbuch.schreibung.v1'] };
  const entferne = (k) => { try { localStorage.removeItem(PK(k)); } catch {} };
  const loeschTeile = () => (LAUTBUCH_FOLGE.FOLGE || []).map(f => TEILE[f.teil]).filter(Boolean);
  const loescheWahl = (start, umfang) => {
    const F = loeschTeile(), ab = !!start;
    const teilWeg = (t) => !ab || F.indexOf(t) >= start.ti;
    const behalte = (t, lvId) => {
      if (!ab) return false;
      const i = F.indexOf(t);
      return i < start.ti || (i === start.ti && t.level.slice(0, start.li).some(l => l.id === lvId));
    };
    for (const t of F) {
      const o = licht[t.id]; if (!o) continue;
      if (umfang.lichter) for (const k of Object.keys(o)) if (/^(l\d+|p\d+|boss)$/.test(k) && !behalte(t, k)) delete o[k];
      if (umfang.gold && teilWeg(t)) for (const k of ['bilder', 'tippen', 'geschichte', 'serie', 'bilderOffen', 'schatz']) delete o[k];
      for (const [feld, schalter] of [['marken', 'haken'], ['stolper', 'steine']]) {
        if (!umfang[schalter] || !o[feld]) continue;
        for (const k of Object.keys(o[feld])) if (!behalte(t, feld === 'marken' ? k.split('|')[0] : k)) delete o[feld][k];
        if (!Object.keys(o[feld]).length) delete o[feld];
      }
      speichern(t.id);
    }
    if (umfang.lichter || umfang.haken || umfang.steine || umfang.gold) {
      if (!ab) entferne(LESEZEICHEN_KEY);
      else { const t = F[start.ti], lv = t.level[start.li]; schreib(LESEZEICHEN_KEY, { teil: t.id, level: lv.id, blatt: (lv.blaetter || t.blaetter)[0][0] }); }
    }
    if (umfang.galerie) {
      if (!ab) entferne(GALERIE_KEY);
      else {
        const g = lies(GALERIE_KEY, {}) || {}, bleibt = new Set();
        for (const t of F) if (!teilWeg(t)) for (const w of bildPool(t)) bleibt.add(bildSchluessel(w));
        for (const t of F) if (teilWeg(t)) for (const w of bildPool(t)) { const k = bildSchluessel(w); if (!bleibt.has(k)) delete g[k]; }
        schreib(GALERIE_KEY, g);
      }
    }
    if (umfang.mitbringsel || umfang.figur) {
      const fs = figurStand();
      if (umfang.mitbringsel) fs.gezeigt = !ab ? [] : (fs.gezeigt || []).filter(id => { const p = String(id).split('.'); return behalte(TEILE[p[0]], p[1]); });
      if (umfang.figur) fs.wer = null;
      schreib(FIGUR_KEY, fs);
    }
    if (umfang.mitbringsel) {
      const weg_ = new Set();
      for (const t of F) if (teilWeg(t)) for (const b of t.bewohner || []) weg_.add(b.s);
      const gesehen = lies(LOESCH_KEYS.bwGesehen, null);
      if (!ab) entferne(LOESCH_KEYS.bwGesehen); else if (Array.isArray(gesehen)) schreib(LOESCH_KEYS.bwGesehen, gesehen.filter(s => !weg_.has(s)));
      const platz = lies(LOESCH_KEYS.bwPlatz, null);
      if (!ab) entferne(LOESCH_KEYS.bwPlatz);
      else if (platz && typeof platz === 'object') { for (const lage of Object.values(platz)) if (lage && typeof lage === 'object') for (const s of weg_) delete lage[s]; schreib(LOESCH_KEYS.bwPlatz, platz); }
      const z = lies(LOESCH_KEYS.zimmer[0], null);
      if (z && typeof z === 'object') {
        if (Array.isArray(z.drinnen)) z.drinnen = z.drinnen.filter(s => !weg_.has(s));
        if (Array.isArray(z.hinaus)) z.hinaus = z.hinaus.filter(s => !weg_.has(s));
        for (const s of weg_) if (z.seit) delete z.seit[s];
        if (z.sicht && Array.isArray(z.sicht.bew)) z.sicht.bew = z.sicht.bew.filter(s => !weg_.has(s));
        schreib(LOESCH_KEYS.zimmer[0], z);
      }
    }
    if (umfang.zimmer) LOESCH_KEYS.zimmer.forEach(entferne);
    if (umfang.buecher || umfang.name) {
      const bs = lies(LOESCH_KEYS.buecher, null);
      if (bs && typeof bs === 'object') {
        if (umfang.buecher) for (const f of ['gefunden', 'seite', 'gelesen']) {
          if (!bs[f]) continue;
          if (!ab) delete bs[f];
          else for (const id of Object.keys(bs[f])) {
            const nach = id === 'reise' ? 'ziel' : ((window.LAUTBUCH_BUECHER || {})[id] || {}).nach;
            if (teilWeg(TEILE[nach] || F[F.length - 1])) delete bs[f][id];
          }
        }
        if (umfang.name) delete bs.ohneName;
        schreib(LOESCH_KEYS.buecher, bs);
      }
      if (umfang.name) entferne(LOESCH_KEYS.name);
    }
    if (umfang.einst) { LOESCH_KEYS.einst.forEach(entferne); for (const k of Object.keys(einst)) delete einst[k]; einst.schreibung = 'gross'; }
  };

  const loeschTeilName = (t) => t.art === 'prolog' ? 'Prolog' : t.art === 'ziel' ? 'Leuchtturm' : t.art === 'regel' ? 'Tor ' + t.id.slice(1) : t.zeichen;
  function loeschenDialog(schublade) {
    const d = el('dialog', 'schublade loeschen');
    d.setAttribute('aria-label', 'Lichter löschen');
    const zu = () => geht(d, 12).then(() => d.close());
    const kopf = el('div', 'schublade-kopf');
    kopf.append(el('h2', null, 'Lichter löschen'), knopf('ikon schliessen', '×', zu, 'schließen'));
    const F = loeschTeile();
    let bereich = 'alles', ti = -1, li = -1;
    const umfang = Object.fromEntries(LOESCH_UMFANG.map(([k, , , v]) => [k, v]));
    const wirkt = (k) => umfang[k] && !(bereich === 'ab' && LOESCH_UMFANG.find(u => u[0] === k)[2]);
    const bereichWahl = gruppe('Bereich', [['alles', 'Alles'], ['ab', 'Ab einer Lektion']], bereich, (w) => { bereich = w; neu(); });
    const teilBox = el('div', 'loesch-chips'), lvBox = el('div', 'loesch-chips');
    const abBlock = el('div', 'loesch-block');
    abBlock.append(el('h3', null, 'Ab welcher Lektion?'), teilBox, lvBox);
    const haken = LOESCH_UMFANG.map(([k, text, nurAlles]) => {
      const kasten = el('span', 'loesch-kasten'); kasten.append(sym('haken'));
      const b = knopf('loesch-haken', [kasten, el('span', null, text)], () => {
        if (b.getAttribute('aria-disabled') === 'true') return;
        umfang[k] = !umfang[k]; neu();
      });
      b.setAttribute('role', 'checkbox'); b.dataset.umfang = k;
      return [k, nurAlles, b];
    });
    const hakenBox = el('div', 'loesch-block loesch-haken-liste');
    hakenBox.append(el('h3', null, 'Was wird gelöscht?'), ...haken.map(h => h[2]));
    const zusammen = el('p', 'meldung loesch-zusammen');
    zusammen.setAttribute('aria-live', 'polite');
    const loeschKnopf = knopf('leise loesch-los', 'Löschen', () => {
      if (loeschKnopf.getAttribute('aria-disabled') === 'true') return;
      if (!bestaetigt(loeschKnopf, 'Wirklich löschen?')) return;
      const u = {}; for (const [k] of LOESCH_UMFANG) if (wirkt(k)) u[k] = true;
      loescheWahl(bereich === 'alles' ? null : { ti, li }, u);
      d.close(); schublade.close(); weg();
    });
    const abbrechen = knopf('leise', 'Abbrechen', zu);
    const aktionen = el('div', 'schublade-knoepfe'); aktionen.append(loeschKnopf, abbrechen);
    function neu() {
      bereichWahl.querySelectorAll('.schreib-wahl').forEach((b, i) => b.setAttribute('aria-pressed', String(['alles', 'ab'][i] === bereich)));
      abBlock.hidden = bereich !== 'ab';
      teilBox.replaceChildren(...F.map((t, i) => {
        const b = knopf('loesch-chip', loeschTeilName(t), () => { ti = i; li = -1; neu(); });
        b.setAttribute('aria-pressed', String(i === ti)); b.dataset.teil = t.id;
        return b;
      }));
      lvBox.replaceChildren(...(ti < 0 ? [] : F[ti].level.map((lv, i) => {
        const b = knopf('loesch-chip', 'Lektion ' + (i + 1), () => { li = i; neu(); });
        b.setAttribute('aria-pressed', String(i === li)); b.dataset.lektion = lv.id;
        return b;
      })));
      lvBox.hidden = ti < 0;
      for (const [k, nurAlles, b] of haken) {
        const aus = bereich === 'ab' && nurAlles;
        b.setAttribute('aria-checked', String(!aus && !!umfang[k]));
        b.setAttribute('aria-disabled', String(aus)); b.classList.toggle('licht-ruht', aus);
        b.title = aus ? 'Nur bei „Alles“' : '';
      }
      const was = LOESCH_UMFANG.filter(([k]) => wirkt(k)).map(([, text]) => text);
      const fortschritt = ['lichter', 'haken', 'steine', 'gold'].some(wirkt);
      let text, bereit = true;
      if (!was.length) { text = 'Nichts gewählt.'; bereit = false; }
      else if (bereich === 'ab' && li < 0) { text = 'Bitte die Lektion wählen, ab der gelöscht wird.'; bereit = false; }
      else {
        const wo = bereich === 'alles' ? 'alles' : 'ab ' + loeschTeilName(F[ti]) + ' · Lektion ' + (li + 1);
        text = 'Gelöscht wird ' + wo + ': ' + was.join(', ') + '.' + (bereich === 'ab' ? ' Alles davor bleibt.' : '')
          + (fortschritt ? (bereich === 'alles' ? ' Das Lesezeichen wird entfernt.' : ' Das Lesezeichen springt zu dieser Lektion.') : '');
      }
      zusammen.textContent = text;
      loeschKnopf.setAttribute('aria-disabled', String(!bereit)); loeschKnopf.classList.toggle('licht-ruht', !bereit);
      delete loeschKnopf.dataset.frage; loeschKnopf.textContent = 'Löschen';
    }
    const inhalt = el('div', 'loesch-inhalt'), fuss = el('div', 'loesch-fuss');
    inhalt.append(el('p', 'meldung', 'Bereich und Umfang wählen. Zum Löschen zweimal „Löschen“ tippen.'), bereichWahl, abBlock, hakenBox);
    fuss.append(zusammen, aktionen);
    d.append(kopf, inhalt, fuss);
    d.addEventListener('close', () => d.remove());
    neu();
    document.body.append(d);
    d.showModal();
    kommt(d, 0, 16, 360);
  }

  const profilBlock = (profilSichern) => {
    const s = el('div', 'schublade-block profil-block'), zeilen = el('div', 'profil-zeilen'), hinweis = el('p', 'meldung');
    const mal = () => {
      const P = PROFIL.plaetze(), belegt = P.filter(Boolean).length;
      zeilen.replaceChildren(...P.map((p, i) => {
        const nr = i + 1, z = el('div', 'schublade-zeile profil-zeile'), kn = el('span', 'schublade-knoepfe');
        z.dataset.platz = String(nr); if (p && p.aktiv) z.classList.add('profil-aktiv');
        const name = el('input', 'profil-name'); name.type = 'text'; name.maxLength = 30; name.autocomplete = 'off'; name.spellcheck = false;
        name.placeholder = 'Name'; name.setAttribute('aria-label', 'Name für Buch ' + nr);
        if (!p) {
          kn.append(knopf('profil-anlegen', 'Anlegen', () => {
            hinweis.textContent = PROFIL.anlegen(nr, name.value) ? 'Buch ' + nr + ' ist angelegt. Das Kind tippt im Regal darauf.' : 'Nicht angelegt: der Speicher ist voll.';
            mal();
          }));
          z.append(el('span', 'profil-platz', 'Buch ' + nr + ' · frei'), name, kn);
          return z;
        }
        name.value = p.name;
        name.addEventListener('change', () => { const v = name.value.trim(); if (p.aktiv) schreib('lautbuch.name.v1', v); else PROFIL.schreibIn(nr, 'lautbuch.name.v1', v); });
        if (!p.aktiv) kn.append(knopf('profil-wechseln', 'Wechseln', () => PROFIL.waehle(nr)));
        kn.append(knopf('profil-sichern', 'Buch sichern', () => profilSichern(nr)));
        if (belegt > 1) {
          const l = knopf('leise profil-loeschen', 'Löschen', () => {
            if (!bestaetigt(l, 'Wirklich löschen?')) return;
            if (!PROFIL.loeschen(nr)) { hinweis.textContent = 'Nicht gelöscht.'; return; }
            if (p.aktiv) location.reload(); else { hinweis.textContent = 'Buch ' + nr + ' ist gelöscht.'; mal(); }
          });
          kn.append(l);
        }
        z.append(el('span', 'profil-platz', 'Buch ' + nr + (p.aktiv ? ' · aufgeschlagen' : '')), name, kn);
        return z;
      }));
    };
    mal();
    s.append(el('h3', null, 'Profile'), el('p', 'meldung', 'Bis zu drei Kinder, jedes mit seinem Buch. Das Kind erkennt sein Buch im Regal an seiner Figur.'), zeilen, hinweis);
    return s;
  };

  function schublade(teil, lv) {
    const d = el('dialog', 'schublade');
    d.setAttribute('aria-label', 'Für die Begleitung');
    const kopf = el('div', 'schublade-kopf');
    const zu = () => geht(d, 12).then(() => d.close());
    kopf.append(el('h2', null, 'Für die Begleitung'), knopf('ikon schliessen', '×', zu, 'schließen'));
    d.append(kopf);
    if (lv && lv.hinweis) { const h = el('p', 'hinweis-lektion'); h.append(sym('haus'), el('span', null, lv.hinweis)); d.append(h); }
    if (window.LAUTBUCH_HANDREICHUNG) {
      const zh = el('div', 'schublade-zeile');
      zh.append(el('span', null, 'Wie begleite ich?'), knopf('', mitSymbol('stern', 'Handreichung'), () => zu().then(() => handreichung()), 'Handreichung'));
      d.append(zh);
    }
    if (window.LB_START) {
      const zr = el('div', 'schublade-zeile');
      zr.append(el('span', null, 'Startbildschirm'), knopf('', mitSymbol('band', 'Regal'), () => zu().then(() => startZeigen(true)), 'zum Regal'));
      d.append(zr);
    }
    if (vollbildDa && getComputedStyle(sVoll).display === 'none') {
      const zv = el('div', 'schublade-zeile');
      zv.append(el('span', null, 'Bildschirm'), knopf('', mitSymbol('vollbild', imVollbild() ? 'Fenster' : 'Vollbild'), () => zu().then(vollbildUmschalten), 'Vollbild'));
      d.append(zv);
    }

    const eintraege = () => {
      const o = {};
      try { for (let k = 0; k < localStorage.length; k++) { const n = localStorage.key(k); if (n.startsWith('lautbuch.')) o[n] = localStorage.getItem(n); } } catch {}
      return o;
    };
    const lesen = (t) => {
      t = String(t || '').trim();
      try {
        if (t.startsWith('LAUTBUCH1:')) return { umfang: 'profil', daten: JSON.parse(decodeURIComponent(escape(atob(t.slice(10))))) };
        const j = JSON.parse(t);
        if (!(j && j.art === 'Mein Lautbuch Sicherung' && j.daten && typeof j.daten === 'object')) return null;
        return j.umfang === 'geraet' && j.profile ? { umfang: 'geraet', daten: j.daten, profile: j.profile } : { umfang: 'profil', daten: j.daten, name: j.name || '' };
      } catch { return null; }
    };
    const meldung = el('span', 'meldung');
    const tagHeute = () => { const h = new Date(); return h.getFullYear() + '-' + String(h.getMonth() + 1).padStart(2, '0') + '-' + String(h.getDate()).padStart(2, '0'); };
    const alsDatei = (inhalt, datei, ok) => {
      const blob = new Blob([JSON.stringify(inhalt)], { type: 'application/json' });
      let eingebettet = false; try { eingebettet = window.self !== window.top; } catch { eingebettet = true; }
      meldung.textContent = eingebettet ? 'Sicherung erstellt. Kommt keine Datei: das Lautbuch im Browser öffnen und dort sichern.' : 'Sicherung erstellt';
      if (LB_AUSGABE) LB_AUSGABE.sichern(blob, datei, '', {
        ok,
        fehlt: () => { meldung.textContent = 'Hier kann das Lautbuch keine Datei ablegen. Bitte das Lautbuch im Browser öffnen (Safari oder Chrome) und dort „Sichern“ tippen.'; }
      });
    };
    const sichern = knopf('', 'Sichern', () => {
      const tag = tagHeute(), g = PROFIL ? PROFIL.geraet() : null;
      const inhalt = g ? { art: 'Mein Lautbuch Sicherung', version: 2, umfang: 'geraet', datum: new Date().toISOString(), profile: g.profile, daten: g.daten }
        : { art: 'Mein Lautbuch Sicherung', version: 1, datum: new Date().toISOString(), daten: eintraege() };
      alsDatei(inhalt, 'Mein_Lautbuch_Sicherung_' + tag + '.json',
        () => window.dispatchEvent(new Event('lautbuch:gesichert')));
    });
    const profilSichern = (nr) => {
      const name = String(PROFIL.liesIn(nr, 'lautbuch.name.v1', '') || '').trim(), datei = name.replace(/[^\p{L}\p{N}]+/gu, '_').replace(/^_+|_+$/g, '') || 'Buch_' + nr;
      alsDatei({ art: 'Mein Lautbuch Sicherung', version: 2, umfang: 'profil', name, datum: new Date().toISOString(), daten: PROFIL.eintraege(nr) },
        'Mein_Lautbuch_' + datei + '_' + tagHeute() + '.json', () => window.dispatchEvent(new CustomEvent('lautbuch:gesichert-profil', { detail: { nr } })));
    };
    let geladen = null;
    const wahl = document.createElement('input');
    wahl.type = 'file'; wahl.accept = '.json,application/json,.txt,text/plain'; wahl.hidden = true;
    wahl.addEventListener('change', () => {
      const f = wahl.files && wahl.files[0]; wahl.value = '';
      if (!f) return;
      const r = new FileReader();
      r.onload = () => {
        geladen = lesen(r.result);
        const buch = geladen && geladen.umfang === 'profil';
        einspielen.hidden = !geladen;
        einspielen.textContent = buch && PROFIL ? 'In dieses Buch' : 'Einspielen';
        alsNeu.hidden = !(buch && PROFIL && PROFIL.frei());
        meldung.textContent = !geladen ? 'keine Sicherung erkannt'
          : !buch ? 'Sicherung aller Bücher gefunden: zweimal „Einspielen“ tippen'
          : PROFIL ? 'Sicherung eines Buchs gefunden' + (geladen.name ? ' (' + geladen.name + ')' : '') + ': zweimal „In dieses Buch“ tippen' + (PROFIL.frei() ? ' oder „Als neues Buch“' : '')
          : 'Sicherung gefunden: zweimal „Einspielen“ tippen';
      };
      r.onerror = () => { meldung.textContent = 'Datei nicht lesbar'; };
      r.readAsText(f);
    });
    const laden = knopf('', 'Laden', () => wahl.click());
    const eingespielt = (ok) => {
      if (!ok) { meldung.textContent = 'Nicht eingespielt, der alte Stand ist unverändert.'; return; }
      window.dispatchEvent(new Event('lautbuch:eingespielt'));
      location.reload();
    };
    const einspielen = knopf('', 'Einspielen', () => {
      const o = geladen;
      if (!o) { meldung.textContent = 'erst eine Sicherung laden'; return; }
      if (!bestaetigt(einspielen, 'Wirklich ersetzen?')) return;
      if (PROFIL) { eingespielt(o.umfang === 'geraet' ? PROFIL.geraetEinspielen(o) : PROFIL.ersetze(PROFIL.aktiv(), o.daten)); return; }
      try {
        for (let k = localStorage.length - 1; k >= 0; k--) { const n = localStorage.key(k); if (n.startsWith('lautbuch.')) localStorage.removeItem(n); }
        for (const [n, v] of Object.entries(o.daten)) if (n.startsWith('lautbuch.')) localStorage.setItem(n, v);
      } catch {}
      eingespielt(true);
    });
    const alsNeu = knopf('', 'Als neues Buch', () => {
      const nr = PROFIL && PROFIL.frei();
      if (geladen && nr) eingespielt(PROFIL.ersetze(nr, geladen.daten));
    });
    const s = el('div', 'schublade-block');
    einspielen.hidden = true; alsNeu.hidden = true;
    const sk = el('div', 'schublade-knoepfe'); sk.append(sichern, laden, einspielen, alsNeu, meldung, wahl);
    s.append(el('h3', null, 'Sicherung'),
      el('p', 'meldung', PROFIL ? '„Sichern“ speichert alle Bücher als Datei, „Buch sichern“ unter „Profile“ nur eines. Zum Zurückholen „Laden“ tippen, die Datei wählen und zweimal „Einspielen“ tippen.'
        : '„Sichern“ speichert den Stand als Datei. Zum Zurückholen „Laden“ tippen, die Datei wählen und zweimal „Einspielen“ tippen.'),
      sk);
    if (PROFIL) d.append(profilBlock(profilSichern));
    d.append(s);

    const loeschen = knopf('leise', 'Lichter löschen', () => loeschenDialog(d));
    if (window.LB_APP) window.LB_APP.schublade(d, zu);
    d.append(loeschen);
    d.addEventListener('close', () => d.remove());
    document.body.append(d);
    d.showModal();
    kommt(d, 0, 16, 360);
  }

  return { schublade, handreichung };
}
