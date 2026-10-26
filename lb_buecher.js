(() => {
  'use strict';
  const NAME_KEY = 'lautbuch.name.v1', STAND_KEY = 'lautbuch.buecher.v1';
  const lies = (k, e) => { try { const v = localStorage.getItem(k); return v == null ? e : JSON.parse(v); } catch { return e; } };
  const schreib = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
  const stand = () => Object.assign({ gefunden: {}, seite: {}, ohneName: false }, lies(STAND_KEY, {}) || {});
  const merke = (f) => { const s = stand(); f(s); schreib(STAND_KEY, s); };
  const name = () => String(lies(NAME_KEY, '') || '').trim();
  const L = () => window.LB;
  const daten = (k) => (window.LB_BILDDATEN || {})[k];
  const el = (tag, cls, inhalt) => L().el(tag, cls, inhalt);
  const knopf = (cls, inhalt, fn, label) => {
    const b = el('button', 'knopf ' + cls); b.type = 'button';
    if (inhalt != null) b.append(inhalt);
    if (label) b.setAttribute('aria-label', label);
    b.addEventListener('click', (e) => { e.stopPropagation(); fn(); });
    return b;
  };

  const reise = () => {
    const T = window.LAUTBUCH_TEILE || {}, F = ((window.LAUTBUCH_FOLGE || {}).FOLGE || []).map(f => T[f.teil]).filter(Boolean);
    const seiten = [];
    for (const t of F) for (const lv of [...(t.level || []), t.boss].filter(Boolean)) {
      if (!lv.sinn) continue;
      const folge = [lv.z6, ...((lv.szene && lv.szene.saetze) || [])];
      const alle = [lv.sinn, ...(lv.sinnMehr || [])].sort((a, b) => folge.indexOf(a.satz) - folge.indexOf(b.satz));
      for (const sn of alle) {
        const b = sn.wahl.find(w => w.s === sn.richtig) || sn.wahl[0];
        if (sn !== lv.sinn && !daten(b.s)) continue;
        seiten.push({ satz: [sn.satz], sinnBild: b });
      }
    }
    return { id: 'reise', nach: 'ziel', kiste: true, titel: 'Mei-ne Rei-se', seiten };
  };
  const buch = (id) => id === 'reise' ? reise() : (window.LAUTBUCH_BUECHER || {})[id];
  const ids = () => [...Object.keys(window.LAUTBUCH_BUECHER || {}).sort(), 'reise'];
  const geschafft = (teil) => !!(lies('lautbuch.akt.' + teil + '.v1', {}) || {}).boss;

  const seitenBild = (s, cls, fassung = 'farbe') => {
    if (s.sinnBild) return daten(s.sinnBild.s) ? L().bild(s.sinnBild.s, cls, fassung) : L().szeneBild(s.sinnBild, cls);
    if (s.bild && daten(s.bild)) return L().bild(s.bild, cls, fassung);
    const p = el('div', 'buch-platzhalter ' + (cls || '')); p.setAttribute('aria-hidden', 'true');
    p.append(el('span', 'buch-platzhalter-zeichen', '❦'));
    return p;
  };
  const sv = (n, a, kinder = []) => { const e = document.createElementNS('http://www.w3.org/2000/svg', n); for (const k in a) e.setAttribute(k, a[k]); e.append(...kinder); return e; };
  const LINIE = { stroke: '#5a3d24', 'stroke-width': 1.6, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' };
  const MOTIV = {
    b1: () => [sv('path', Object.assign({ d: 'M68 52 q2 -14 14 -12 q9 2 7 10 q-2 6 -9 5 z', fill: '#8cbf6e' }, LINIE)),
      sv('circle', { cx: 81, cy: 46, r: 1.3, fill: '#5a3d24' }), sv('circle', { cx: 86, cy: 48, r: 1.3, fill: '#5a3d24' }),
      sv('ellipse', Object.assign({ cx: 48, cy: 62, rx: 32, ry: 5, fill: '#fffaf0' }, LINIE)),
      sv('path', Object.assign({ d: 'M24 60 V36 h48 V60 z', fill: '#e8c08f' }, LINIE)),
      sv('path', { d: 'M24 48 h48', stroke: '#fffaf0', 'stroke-width': 3 }),
      sv('path', Object.assign({ d: 'M22 36 q0 -8 26 -8 q26 0 26 8 q-4 5 -8 0 q-4 5 -8 0 q-4 5 -8 0 q-4 5 -8 0 q-4 5 -8 0 q-4 5 -8 0 q-2 3 -4 0 z', fill: '#fffaf0' }, LINIE)),
      ...[[36, 26], [48, 24], [60, 26]].map(([x, y]) => sv('circle', Object.assign({ cx: x, cy: y, r: 3.6, fill: '#b5485e' }, LINIE)))],
    b2: () => [sv('rect', Object.assign({ x: 18, y: 22, width: 64, height: 40, rx: 2, fill: '#f6e3bd' }, LINIE)),
      sv('path', Object.assign({ d: 'M18 23 L50 46 L82 23', fill: 'none' }, LINIE)),
      sv('circle', Object.assign({ cx: 50, cy: 46, r: 6, fill: '#d9705c' }, LINIE)),
      sv('circle', Object.assign({ cx: 16, cy: 14, r: 8, fill: '#fffaf0' }, LINIE)),
      sv('path', { d: 'M12 12 q3 -3 5 0 q-1 4 -5 0 M18 17 q3 -2 4 1 q-2 3 -4 -1', fill: '#2a2520' })],
    b3: () => [sv('rect', Object.assign({ x: 38, y: 16, width: 30, height: 38, fill: '#fffaf0', 'stroke-dasharray': '2.2 1.6' }, LINIE)),
      sv('path', { d: 'M42 42 q5 -6 10 0 t10 0 V50 H42 z', fill: '#6fa3c4' }),
      sv('path', Object.assign({ d: 'M48 34 q6 -10 12 -2 q-4 0 -6 3 z', fill: '#9bb6c8' }, LINIE)),
      sv('circle', { cx: 32, cy: 48, r: 10, fill: 'none', stroke: '#fffaf0', 'stroke-width': 1.6, opacity: .85 }),
      sv('path', { d: 'M18 46 q4 -3 8 0 t8 0 t8 0 M18 51 q4 -3 8 0 t8 0 t8 0', fill: 'none', stroke: '#fffaf0', 'stroke-width': 1.4, opacity: .85 })]
  };
  const umschlag = (b, cls) => {
    const k = 'buch-umschlag-' + b.id;
    if (daten(k)) return L().bild(k, cls);
    const p = el('div', 'buch-platzhalter buch-deckel deckel-' + (MOTIV[b.id] || b.id === 'reise' ? b.id : 'leer') + ' ' + (cls || ''));
    p.setAttribute('aria-hidden', 'true');
    if (b.id === 'reise') {
      const oval = el('div', 'deckel-oval'), erste = b.seiten.find(s => s.sinnBild ? daten(s.sinnBild.s) : daten(s.bild));
      if (erste) oval.append(seitenBild(erste, 'deckel-oval-bild'));
      p.append(oval, el('div', 'deckel-band'));
    } else if (MOTIV[b.id]) p.append(sv('svg', { viewBox: '0 0 100 75', class: 'deckel-motiv', 'aria-hidden': 'true' }, MOTIV[b.id]()));
    else p.append(el('span', 'buch-platzhalter-zeichen', '❦'));
    return p;
  };

  const titelSeite = (b, form, neu) => {
    const s = el('div', 'buch-seite buch-titel'), bf = el('div', 'buch-bildfeld'), t = el('div', 'buch-text'), innen = el('div', 'buch-text-innen');
    const zeile = el('div', 'buch-titelzeile', L().satz(form(b.titel)));
    if (daten('buch-umschlag-' + b.id)) { const r = el('div', 'buch-umschlag-rahmen'), schild = el('div', 'buch-schild'); schild.append(zeile); r.append(umschlag(b, 'buch-bild'), schild); bf.append(r); }
    else { bf.append(umschlag(b, 'buch-bild')); innen.append(zeile); }
    t.append(innen); s.append(bf, t);
    const n = name();
    if (n) { innen.append(el('div', 'buch-fuer', L().satz(form('Für ' + L().silbiere(n))))); return s; }
    if (stand().ohneName) return s;
    const f = el('form', 'buch-name');
    const lab = el('label', 'buch-name-text', 'Für wen ist das Buch? (Name des Kindes, bleibt nur auf diesem Gerät)');
    const inp = el('input', 'buch-name-feld'); inp.type = 'text'; inp.autocomplete = 'off'; inp.maxLength = 24; inp.setAttribute('enterkeyhint', 'done');
    lab.append(inp);
    const ok = el('button', 'knopf buch-name-ok', 'Eintragen'); ok.type = 'submit';
    const ohne = knopf('buch-name-ohne', 'Ohne Namen', () => { merke(x => { x.ohneName = true; }); neu(); });
    f.append(lab, ok, ohne);
    f.addEventListener('submit', (e) => { e.preventDefault(); const v = inp.value.trim(); if (v) { schreib(NAME_KEY, v); neu(); } });
    innen.append(f);
    return s;
  };
  const zierBild = (k, e) => { const d = daten(k); if (d && d.farbe) { e.style.backgroundImage = 'url("' + d.farbe + '")'; e.classList.add('gemalt'); } return e; };
  const glieder = (e, n) => { if (!e.classList.contains('gemalt')) for (let k = 0; k < n; k++) e.append(el('span', 'zier-glied')); return e; };
  const zierband = (b) => { const z = glieder(zierBild('buch-zierband-' + b.id, el('div', 'buch-zierband')), 12); z.setAttribute('aria-hidden', 'true'); return z; };
  const seitenzahl = (b, n) => { const z = zierBild('buch-plakette-' + b.id, el('span', 'buch-seitenzahl', String(n))); z.setAttribute('aria-hidden', 'true'); return z; };
  const vignette = (b) => { const v = glieder(zierBild('buch-vignette-' + b.id, el('div', 'buch-vignette')), 3); v.setAttribute('aria-hidden', 'true'); return v; };
  const zierVon = (b) => 'zier-' + (['b1', 'b2', 'b3'].includes(b.id) ? b.id : 'reise');
  const textSeite = (b, i, form) => {
    const p = b.seiten[i], s = el('div', 'buch-seite buch-zier ' + zierVon(b)), bf = el('div', 'buch-bildfeld'), t = el('div', 'buch-text'), innen = el('div', 'buch-text-innen');
    bf.append(seitenBild(p, 'buch-bild'));
    innen.append(zierband(b));
    for (const z of p.satz) innen.append(el('p', 'buch-satz', L().satz(form(z))));
    if (i === b.seiten.length - 1) innen.append(vignette(b));
    t.append(innen); s.append(bf, t, seitenzahl(b, i + 1));
    return s;
  };

  const pfeil = (zurueck) => {
    const p = daten('ding-pfeil') ? L().bild('ding-pfeil', 'buch-pfeil-bild') : el('span', 'buch-pfeil-zeichen', '➜');
    const h = el('span', 'buch-pfeil' + (zurueck ? ' zurueck' : '')); h.append(p); return h;
  };
  function oeffne(id, opt = {}) {
    const b = buch(id); if (!b) return;
    const form = opt.form || (x => x);
    document.querySelectorAll('.lb-buch').forEach(x => x.remove());
    const huelle = el('div', 'lb-buch'), blatt = el('div', 'buch-blatt'), leiste = el('div', 'buch-leiste');
    huelle.setAttribute('role', 'dialog'); huelle.setAttribute('aria-modal', 'true'); huelle.setAttribute('aria-label', b.titel.replace(/-/g, ''));
    let i = Math.min(stand().seite[id] || 0, b.seiten.length);
    const vor = knopf('buch-vor', pfeil(false), () => gehe(1), 'Weiter blättern');
    const zur = knopf('buch-zurueck', pfeil(true), () => gehe(-1), 'Zurück blättern');
    const zu = knopf('ikon schliessen buch-zu', '×', () => schliesse(), 'Buch schließen');
    const wahl = el('div', 'buch-druck-wahl'); wahl.hidden = true;
    wahl.append(knopf('buch-druck-art', 'farbig', () => { wahl.hidden = true; drucken(b, form, 'farbe'); }),
      knopf('buch-druck-art', 'zum Ausmalen', () => { wahl.hidden = true; drucken(b, form, 'linie'); }));
    const druck = knopf('buch-druck', 'Drucken', () => { wahl.hidden = !wahl.hidden; }, 'Buch als PDF');
    const mitte = el('div', 'buch-mitte'); mitte.append(druck, wahl);
    leiste.append(zur, mitte, vor);
    huelle.append(blatt, leiste, zu);
    const passt = (s) => { const t = s && s.querySelector('.buch-text'); return !t || t.scrollHeight <= t.clientHeight + 1; };
    const schriftFinden = () => {
      const unten = blatt.clientHeight < 480 ? 16 : blatt.clientWidth < 500 ? 18 : 20, oben = 40;
      const folge = b.seiten.map((p, k) => [k, p.satz.join(' ').length]).sort((x, y) => y[1] - x[1]).map(x => x[0]);
      const allePassen = (px) => {
        blatt.style.setProperty('--buch-schrift', px + 'px');
        for (const k of folge) { blatt.replaceChildren(textSeite(b, k, form)); if (!passt(blatt.firstChild)) return false; }
        return true;
      };
      const STUFEN = [40, 36, 32, 30, 28, 26, 24, 22, 20, 18, 16].filter(px => px <= oben && px >= unten);
      const px = STUFEN.find(allePassen) || unten;
      blatt.style.setProperty('--buch-schrift', px + 'px');
    };
    const rollHinweis = (s) => {
      const t = s.querySelector('.buch-text'); if (!t || passt(s)) return;
      t.classList.add('rollt'); const mehr = el('div', 'buch-mehr', '⌄'); mehr.setAttribute('aria-hidden', 'true'); s.append(mehr);
      const pruefe = () => { const ende = t.scrollTop + t.clientHeight >= t.scrollHeight - 2; t.classList.toggle('am-ende', ende); mehr.hidden = ende; };
      t.addEventListener('scroll', pruefe, { passive: true }); pruefe();
    };
    const zeige = (richtung = 0) => {
      const s = i === 0 ? titelSeite(b, form, () => zeige()) : textSeite(b, i - 1, form);
      if (richtung) s.classList.add(richtung > 0 ? 'kommt-rechts' : 'kommt-links');
      blatt.replaceChildren(s);
      rollHinweis(s);
      zur.setAttribute('aria-disabled', String(i === 0)); vor.setAttribute('aria-disabled', String(i >= b.seiten.length));
      merke(x => { x.seite[id] = i; if (i >= b.seiten.length) (x.gelesen = x.gelesen || {})[id] = true; });
    };
    const gehe = (d) => { const n = i + d; if (n < 0 || n > b.seiten.length) return; i = n; zeige(d); };
    let uhr = 0;
    const neuMessen = () => { clearTimeout(uhr); uhr = setTimeout(() => { if (!huelle.isConnected) return; schriftFinden(); zeige(); }, 160); };
    function schliesse() { huelle.remove(); document.removeEventListener('keydown', taste); removeEventListener('resize', neuMessen); clearTimeout(uhr); if (opt.zu) opt.zu(); }
    const taste = (e) => { if (e.key === 'ArrowRight') gehe(1); else if (e.key === 'ArrowLeft') gehe(-1); else if (e.key === 'Escape') schliesse(); };
    document.addEventListener('keydown', taste);
    let x0 = null;
    blatt.addEventListener('pointerdown', (e) => { if (!e.target.closest('input, button')) x0 = e.clientX; });
    blatt.addEventListener('pointerup', (e) => { if (x0 == null) return; const dx = e.clientX - x0; x0 = null; if (Math.abs(dx) > 50) gehe(dx < 0 ? 1 : -1); });
    document.body.append(huelle);
    schriftFinden();
    zeige();
    addEventListener('resize', neuMessen);
    zu.focus({ preventScroll: true });
  }

  function drucken(b, form, art) {
    const seite = (inhalt) => { const s = el('div', 'buch-pdf'); s.append(inhalt); return s; };
    const titel = el('div', 'buch-pdf-titel');
    titel.append(umschlag(b, 'buch-pdf-bild'), el('div', 'buch-pdf-titelzeile', L().satz(form(b.titel))));
    if (name()) titel.append(el('div', 'buch-pdf-fuer', L().satz(form('Für ' + L().silbiere(name())))));
    const seiten = [seite(titel)];
    const klein = b.seiten.some(p => p.satz.join(' ').length > 140);
    b.seiten.forEach((p, k) => {
      const s = el('div', 'buch-pdf-inhalt');
      s.append(seitenBild(p, 'buch-pdf-bild', art), zierband(b));
      for (const z of p.satz) s.append(el('p', 'buch-pdf-satz', L().satz(form(z))));
      if (k === b.seiten.length - 1) s.append(vignette(b));
      const pdf = seite(s); pdf.classList.add('buch-zier', zierVon(b)); if (klein) pdf.classList.add('klein');
      pdf.append(seitenzahl(b, k + 1));
      seiten.push(pdf);
    });
    window.LB_AUSGABE.pdf(seiten, b.titel.replace(/-/g, '') + (art === 'linie' ? ' zum Ausmalen' : '') + '.pdf');
  }

  window.LB_BUECHER = {
    liste: () => ids().map(id => { const b = buch(id); const s = stand(); return { id, nach: b.nach, titel: b.titel, kiste: !!b.kiste, gefunden: !!s.gefunden[id], gelesen: !!(s.gelesen || {})[id] }; }),
    amOrt: (teil) => ids().filter(id => { const b = buch(id); return b && b.nach === teil && geschafft(teil) && !stand().gefunden[id]; }),
    aufheben: (id) => merke(s => { s.gefunden[id] = true; }),
    gefunden: () => ids().filter(id => stand().gefunden[id]),
    oeffne,
    regal: (id) => { const b = buch(id); return b ? umschlag(b, 'buch-regal-bild') : null; },
    titel: (id) => (buch(id) || {}).titel
  };
})();
