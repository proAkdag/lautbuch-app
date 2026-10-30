(() => {
  'use strict';
  const APP_VERSION = '1.0.10';
  const VOR = 'lautbuch.';
  const GESICHERT_KEY = 'lautbuch-app.gesichert.v1', SPAETER_KEY = 'lautbuch-app.spaeter.v1';
  const TEIL_LAENGE = 675, TAKT_MS = 800, MAX_TEILE = 40, MAX_KLAR = 1048576;

  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
  const knopf = (cls, text, fn) => { const b = el('button', 'knopf ' + (cls || ''), text); b.type = 'button'; b.addEventListener('click', fn); return b; };
  const lies = (k, ersatz) => { try { const v = localStorage.getItem(k); return v == null ? ersatz : JSON.parse(v); } catch { return ersatz; } };
  const schreib = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

  const eintraege = () => {
    const o = {};
    try { for (let k = 0; k < localStorage.length; k++) { const n = localStorage.key(k); if (n.startsWith(VOR)) o[n] = localStorage.getItem(n); } } catch {}
    return o;
  };
  const sicherung = () => ({ art: 'Mein Lautbuch Sicherung', version: 1, datum: new Date().toISOString(), daten: eintraege() });
  const ersetzeAlle = (daten) => {
    for (let k = localStorage.length - 1; k >= 0; k--) { const n = localStorage.key(k); if (n.startsWith(VOR)) localStorage.removeItem(n); }
    for (const [n, v] of Object.entries(daten)) if (n.startsWith(VOR) && typeof v === 'string') localStorage.setItem(n, v);
  };
  const einspielen = (daten) => {
    const alt = eintraege();
    try { ersetzeAlle(daten); return true; } catch { try { ersetzeAlle(alt); } catch {} return false; }
  };
  const bossGold = (daten) => Object.entries(daten || eintraege())
    .filter(([n, v]) => /^lautbuch\.akt\.[^.]+\.v1$/.test(n) && (() => { try { return JSON.parse(v).boss === true; } catch { return false; } })())
    .map(([n]) => n.split('.')[2]).sort();

  let registrierung = null, neueFassung = false, offlineBereit = false, laedt = false;
  const hoerer = new Set();
  const melde = () => { document.documentElement.classList.toggle('lb-app-neu', neueFassung); hoerer.forEach((f) => f()); };
  const frageSW = (typ, ms = 3000) => {
    const sw = registrierung && (registrierung.waiting || registrierung.active);
    if (!sw) return Promise.resolve(null);
    return new Promise((ok) => {
      const kanal = new MessageChannel();
      const t = setTimeout(() => ok(null), ms);
      kanal.port1.onmessage = (e) => { clearTimeout(t); ok(e.data); };
      sw.postMessage({ typ }, [kanal.port2]);
    });
  };
  const pruefe = async () => {
    const s = await frageSW('status');
    const neu = !!(s && s.frei && s.neu && s.frei !== s.neu);
    const bereit = !!(s && s.frei && navigator.serviceWorker.controller);
    const l = !!(s && s.laedt);
    if (neu !== neueFassung || bereit !== offlineBereit || l !== laedt) { neueFassung = neu; offlineBereit = bereit; laedt = l; melde(); }
  };
  const aktualisieren = async () => {
    const r = await frageSW('freigeben', 15000);
    if (r && r.frei) { location.reload(); return 'ok'; }
    return r && r.spaeter ? 'spaeter' : 'fehler';
  };
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js', { updateViaCache: 'none' }).then((reg) => {
        registrierung = reg;
        const beobachte = (nw) => nw && nw.addEventListener('statechange', () => pruefe());
        beobachte(reg.installing);
        reg.addEventListener('updatefound', () => { laedt = true; melde(); beobachte(reg.installing); });
        navigator.serviceWorker.addEventListener('controllerchange', () => pruefe());
        pruefe();
        reg.update().catch(() => {});
        document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') reg.update().then(pruefe, () => {}); });
      }).catch(() => {});
    });
  }

  let dauerhaft = null;
  const persistAnfragen = async () => {
    try {
      if (!navigator.storage || !navigator.storage.persist) return;
      dauerhaft = (await navigator.storage.persisted()) || (await navigator.storage.persist());
    } catch { dauerhaft = null; }
    melde();
  };
  persistAnfragen();

  if (lies(GESICHERT_KEY, null) === null) schreib(GESICHERT_KEY, bossGold());
  let band = null;
  const merkeGesichert = () => { schreib(GESICHERT_KEY, bossGold()); try { localStorage.removeItem(SPAETER_KEY); } catch {} bandPruefen(); };
  const sichernJetzt = () => {
    const heute = new Date(), tag = heute.getFullYear() + '-' + String(heute.getMonth() + 1).padStart(2, '0') + '-' + String(heute.getDate()).padStart(2, '0');
    const blob = new Blob([JSON.stringify(sicherung())], { type: 'application/json' });
    const A = window.LB_AUSGABE;
    if (!A) return;
    if (A.mitOk) A.sichern(blob, 'Mein_Lautbuch_Sicherung_' + tag + '.json', '', { ok: merkeGesichert });
    else { A.sichern(blob, 'Mein_Lautbuch_Sicherung_' + tag + '.json', ''); merkeGesichert(); }
  };
  function bandPruefen() {
    const aufWeg = document.body && document.body.classList.contains('auf-weg');
    const gold = bossGold();
    let gesichert = lies(GESICHERT_KEY, []);
    if (gesichert.some((t) => !gold.includes(t))) { gesichert = gesichert.filter((t) => gold.includes(t)); schreib(GESICHERT_KEY, gesichert); }
    let spaeter = lies(SPAETER_KEY, null);
    if (spaeter && spaeter.some((t) => !gold.includes(t))) { spaeter = null; try { localStorage.removeItem(SPAETER_KEY); } catch {} }
    const neu = gold.filter((t) => !gesichert.includes(t));
    const zeigen = aufWeg && neu.length > 0 && JSON.stringify(spaeter) !== JSON.stringify(gold);
    if (zeigen && !band) {
      band = el('div', 'lb-app-band');
      band.setAttribute('role', 'status');
      band.append(el('span', 'lb-app-band-text', 'Neues Gold · Stand sichern?'),
        knopf('lb-app-sichern', 'Sichern', sichernJetzt),
        knopf('leise lb-app-spaeter', 'Später', () => { schreib(SPAETER_KEY, bossGold()); bandPruefen(); }));
      document.body.append(band);
    } else if (!zeigen && band) { band.remove(); band = null; }
  }
  window.addEventListener('lautbuch:gesichert', merkeGesichert);
  window.addEventListener('lautbuch:eingespielt', merkeGesichert);
  const starteBeobachter = () => {
    new MutationObserver(bandPruefen).observe(document.body, { attributes: true, attributeFilter: ['class'] });
    bandPruefen();
  };
  if (document.body) starteBeobachter(); else document.addEventListener('DOMContentLoaded', starteBeobachter);

  const b64url = {
    an: (u8) => { let s = ''; for (let i = 0; i < u8.length; i += 0x8000) s += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000)); return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); },
    ab: (s) => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0))
  };
  const strom = async (bytes, umform) => new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(umform)).arrayBuffer());
  const entpacke = async (bytes) => {
    const leser = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate-raw')).getReader();
    const stuecke = []; let n = 0;
    for (;;) {
      const { done, value } = await leser.read();
      if (done) break;
      n += value.length;
      if (n > MAX_KLAR) { try { await leser.cancel(); } catch {} return null; }
      stuecke.push(value);
    }
    const aus = new Uint8Array(n); let o = 0; for (const s of stuecke) { aus.set(s, o); o += s.length; }
    return aus;
  };
  const sha16 = async (text) => Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))).slice(0, 8), (b) => b.toString(16).padStart(2, '0')).join('');
  async function qrTeile() {
    const roh = await strom(new TextEncoder().encode(JSON.stringify(sicherung())), new CompressionStream('deflate-raw'));
    const ganz = b64url.an(roh), kennung = await sha16(ganz);
    const n = Math.max(1, Math.ceil(ganz.length / TEIL_LAENGE));
    if (n > MAX_TEILE) throw new Error('zu groß');
    return Array.from({ length: n }, (_, i) => 'LB1/' + kennung + '/' + (i + 1) + '/' + n + '/' + ganz.slice(i * TEIL_LAENGE, (i + 1) * TEIL_LAENGE));
  }
  function sammler() {
    const staende = new Map();
    let fertigK = null;
    const pruefe = async (k) => {
      const s = staende.get(k);
      const ganz = Array.from({ length: s.n }, (_, i) => s.teile.get(i + 1)).join('');
      if ((await sha16(ganz)) !== k) return { ok: false, grund: 'Prüfsumme stimmt nicht' };
      try {
        const klar = await entpacke(b64url.ab(ganz));
        if (!klar) return { ok: false, grund: 'zu groß' };
        const j = JSON.parse(new TextDecoder().decode(klar));
        if (!j || j.art !== 'Mein Lautbuch Sicherung' || !j.daten || typeof j.daten !== 'object') return { ok: false, grund: 'kein Lautbuch-Stand' };
        const daten = {};
        for (const [kk, v] of Object.entries(j.daten)) if (kk.startsWith(VOR) && typeof v === 'string') daten[kk] = v;
        return { ok: true, datum: j.datum, daten };
      } catch { return { ok: false, grund: 'nicht lesbar' }; }
    };
    return {
      nimm(text) {
        const m = /^LB1\/([0-9a-f]{16})\/(\d{1,2})\/(\d{1,2})\/([A-Za-z0-9_-]{1,700})$/.exec(String(text || ''));
        if (!m) return { art: 'fremd' };
        const [, k, i, n] = m;
        if (+n < 1 || +n > MAX_TEILE || +i < 1 || +i > +n) return { art: 'fremd' };
        if (!staende.has(k)) staende.set(k, { n: +n, teile: new Map() });
        const s = staende.get(k);
        if (s.n !== +n) return { art: 'fremd' };
        if (!s.teile.has(+i)) s.teile.set(+i, m[4]);
        if (s.teile.size === s.n && !fertigK) fertigK = k;
        return { art: 'teil', da: s.teile.size, n: s.n };
      },
      voll: () => !!fertigK,
      async ergebnis() {
        if (!fertigK) return { ok: false, grund: 'unvollständig' };
        const k = fertigK, e = await pruefe(k);
        if (!e.ok) { staende.delete(k); fertigK = null; }
        return e;
      }
    };
  }
  const svgVon = (text) => { const qr = qrcode(0, 'L'); qr.addData(text, 'Byte'); qr.make(); return qr.createSvgTag({ cellSize: 4, margin: 16, scalable: true }); };
  const datumText = (iso) => { try { return new Date(iso).toLocaleString('de-DE', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }); } catch { return ''; } };

  const dialog = (titel) => {
    const d = el('dialog', 'schublade lb-app-dialog');
    d.setAttribute('aria-label', titel);
    const kopf = el('div', 'schublade-kopf');
    kopf.append(el('h2', null, titel), knopf('ikon schliessen', '×', () => d.close()));
    d.append(kopf);
    d.addEventListener('close', () => d.remove());
    document.body.append(d);
    return d;
  };

  async function qrZeigen() {
    const d = dialog('Stand zeigen');
    const box = el('div', 'lb-app-qr'), text = el('p', 'meldung');
    d.append(box, text, el('p', 'meldung', 'Die Codes tragen den ganzen Stand, auch den Namen des Kindes. Nur auf eigenen Geräten zeigen.'));
    d.showModal();
    let teile;
    try { teile = await qrTeile(); } catch { text.textContent = 'Dieses Gerät kann den Stand nicht verpacken. Bitte „Sichern“ und die Datei übertragen.'; return; }
    if (typeof qrcode !== 'function') { text.textContent = 'Der QR-Baustein fehlt.'; return; }
    const svgs = teile.map(svgVon);
    text.textContent = 'Am anderen Gerät: Begleitung → „QR lesen“, die Kamera auf diese Codes halten, bis alle gelesen sind.';
    let i = 0;
    const zeige = () => { box.innerHTML = svgs[i]; box.dataset.teil = String(i + 1); i = (i + 1) % svgs.length; };
    zeige();
    const takt = setInterval(zeige, TAKT_MS);
    d.addEventListener('close', () => clearInterval(takt));
  }

  const jsqrLaden = () => window.jsQR ? Promise.resolve(true) : new Promise((fertig) => {
    const s = document.createElement('script');
    s.src = './vendor/jsqr.js'; s.onload = () => fertig(typeof window.jsQR === 'function'); s.onerror = () => fertig(false);
    document.head.append(s);
  });
  async function qrLesen() {
    const d = dialog('Stand holen');
    const video = el('video', 'lb-app-video'); video.muted = true; video.playsInline = true; video.setAttribute('playsinline', '');
    const text = el('p', 'meldung', 'Kamera startet …'), stand = el('p', 'meldung'), knoepfe = el('div', 'schublade-knoepfe');
    d.append(video, text, stand, knoepfe);
    d.showModal();
    let lauf = true, strm = null;
    const kameraAus = () => { if (strm) strm.getTracks().forEach((t) => t.stop()); strm = null; };
    d.addEventListener('close', () => { lauf = false; kameraAus(); });
    let det = null;
    if ('BarcodeDetector' in window) try { det = new BarcodeDetector({ formats: ['qr_code'] }); } catch { det = null; }
    if (!det && !(await jsqrLaden())) { text.textContent = 'Der Scanner ließ sich nicht laden.'; return; }
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { text.textContent = 'Hier gibt es keinen Zugriff auf die Kamera. Bitte „Sichern“ und die Datei übertragen.'; return; }
    try { strm = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false }); }
    catch (e) { text.textContent = 'Die Kamera ließ sich nicht öffnen (' + ((e && e.name) || 'Fehler') + '). Erlaubnis in den Einstellungen prüfen.'; return; }
    if (!lauf) { kameraAus(); return; }
    video.srcObject = strm;
    try { await video.play(); } catch {}
    text.textContent = 'Die Codes vom anderen Gerät vor die Kamera halten.';
    const s = sammler(), cv = document.createElement('canvas'), g = cv.getContext('2d', { willReadFrequently: true });
    const tick = async () => {
      if (!lauf) return;
      if (video.readyState >= 2) {
        const w = video.videoWidth, h = video.videoHeight, f = Math.min(1, 1024 / Math.max(w, h));
        cv.width = Math.round(w * f); cv.height = Math.round(h * f);
        g.drawImage(video, 0, 0, cv.width, cv.height);
        let txt = null;
        if (det) try { const r = await det.detect(cv); txt = r[0] ? r[0].rawValue : null; } catch { det = null; await jsqrLaden(); }
        if (!txt && !det && window.jsQR) { const r = window.jsQR(g.getImageData(0, 0, cv.width, cv.height).data, cv.width, cv.height, { inversionAttempts: 'dontInvert' }); txt = r ? r.data : null; }
        if (txt) {
          const r = s.nimm(txt);
          if (r.art === 'teil') stand.textContent = 'gelesen: ' + r.da + ' von ' + r.n;
          if (s.voll()) {
            const e = await s.ergebnis();
            if (e.ok) { lauf = false; kameraAus(); return fertig(e); }
            stand.textContent = 'Ein Code war falsch gelesen (' + e.grund + '). Bitte weiter auf die Codes halten.';
          }
        }
      }
      setTimeout(tick, 200);
    };
    const fertig = (e) => {
      video.hidden = true;
      const n = bossGold(e.daten).length;
      text.textContent = 'Stand vom ' + datumText(e.datum) + ' gefunden' + (n ? ' · ' + n + (n === 1 ? ' Boss' : ' Bosse') + ' gold' : '') + '. Er ersetzt den Stand auf diesem Gerät.';
      stand.textContent = '';
      const ein = knopf('', 'Einspielen', () => {
        if (!ein.dataset.frage) { ein.dataset.frage = '1'; ein.textContent = 'Wirklich ersetzen?'; setTimeout(() => { delete ein.dataset.frage; ein.textContent = 'Einspielen'; }, 4000); return; }
        if (!einspielen(e.daten)) { text.textContent = 'Nicht eingespielt, der alte Stand ist unverändert.'; return; }
        schreib(GESICHERT_KEY, bossGold()); try { localStorage.removeItem(SPAETER_KEY); } catch {}
        location.reload();
      });
      knoepfe.append(ein);
    };
    tick();
  }

  function schublade(d, zu) {
    const s = el('div', 'schublade-block lb-app-block');
    s.append(el('h3', null, 'App'));
    const zFassung = el('div', 'schublade-zeile'), zOffline = el('div', 'schublade-zeile'), zSpeicher = el('div', 'schublade-zeile');
    let hinweis = '';
    const mal = () => {
      zFassung.replaceChildren(el('span', null, hinweis || (neueFassung ? 'Eine neue Fassung ist bereit.' : 'Fassung ' + APP_VERSION)));
      if (neueFassung) zFassung.append(knopf('lb-app-aktualisieren', 'Aktualisieren', async () => {
        const r = await aktualisieren();
        hinweis = r === 'spaeter' ? 'Die neue Fassung lädt noch. Bitte gleich noch einmal.' : r === 'fehler' ? 'Das hat nicht geklappt. Bitte später noch einmal.' : '';
        mal();
      }));
      zOffline.replaceChildren(el('span', 'lb-app-offline', 'Offline bereit: ' + (offlineBereit ? 'ja' : laedt ? 'lädt noch …' : 'nein')));
      zSpeicher.replaceChildren(el('span', 'lb-app-speicher', 'Speicher dauerhaft: ' + (dauerhaft === true ? 'ja' : dauerhaft === false ? 'nein' : 'unbekannt')));
    };
    mal(); hoerer.add(mal); d.addEventListener('close', () => hoerer.delete(mal));
    pruefe();
    const zQr = el('div', 'schublade-zeile');
    zQr.append(el('span', null, 'Stand auf ein anderes Gerät'), el('span', 'schublade-knoepfe'));
    zQr.lastChild.append(knopf('lb-app-qr-zeigen', 'QR zeigen', () => zu().then(qrZeigen)), knopf('lb-app-qr-lesen', 'QR lesen', () => zu().then(qrLesen)));
    const zLizenz = el('div', 'schublade-zeile');
    const a = el('a', 'knopf leise lb-app-lizenz', 'Lizenz'); a.href = './lizenz.html';
    zLizenz.append(el('span', null, 'PolyForm Noncommercial 1.0.0'), a);
    s.append(zFassung, zOffline, zSpeicher, zQr, zLizenz);
    d.append(s);
  }

  window.LB_APP = { version: APP_VERSION, schublade, aktualisieren, updateBereit: () => neueFassung, offlineBereit: () => offlineBereit,
    dauerhaft: () => dauerhaft, qr: { teile: qrTeile, sammler, svg: svgVon, einspielen }, bandPruefen };
})();
