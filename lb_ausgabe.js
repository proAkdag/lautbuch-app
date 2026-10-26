(() => {
  'use strict';
  const A4 = [794, 1123];
  const mark = (m) => { try { window.__lbPdfWeg = m; } catch (e) {} };

  function sichern(blob, fn, hinweis, opt = {}) {
    const ua = navigator.userAgent || '';
    const apple = /\b(iPhone|iPod|iPad)\b/.test(ua) || (/\bMacintosh\b/.test(ua) && (navigator.maxTouchPoints || 0) > 1);
    const moodleApp = /MoodleMobile/i.test(ua);
    const dl = (useData) => {
      mark(useData ? 'data-url' : 'blob-download');
      const go = (href, revoke) => {
        const a = document.createElement('a'); a.href = href; a.download = fn; a.rel = 'noopener'; document.body.appendChild(a); a.click();
        setTimeout(() => { try { a.remove(); if (revoke) URL.revokeObjectURL(href); } catch (e) {} }, 9000);
      };
      if (useData) { const r = new FileReader(); r.onload = () => go(r.result, false); r.readAsDataURL(blob); }
      else go(URL.createObjectURL(blob), true);
    };
    const ansicht = () => {
      mark('ansicht');
      const url = URL.createObjectURL(blob);
      const box = document.createElement('div'); box.className = 'lb-pdf-ansicht';
      const leiste = document.createElement('div'); leiste.className = 'lb-pdf-leiste';
      const satz = document.createElement('span');
      satz.textContent = hinweis || 'Dein Blatt. Zum Sichern: das Lautbuch im Browser öffnen und dort drucken – oder hier mit dem Teilen-Symbol des Geräts sichern.';
      const zu = document.createElement('button'); zu.type = 'button'; zu.className = 'lb-pdf-zu'; zu.textContent = 'Schließen';
      zu.addEventListener('click', () => { box.remove(); URL.revokeObjectURL(url); });
      const fr = document.createElement('iframe'); fr.className = 'lb-pdf-rahmen'; fr.title = 'Blatt'; fr.src = url;
      leiste.append(satz, zu); box.append(leiste, fr); document.body.append(box);
    };
    let file = null; try { file = new File([blob], fn, { type: blob.type || 'application/pdf' }); } catch (e) {}
    if (!apple && !moodleApp) { dl(false); if (opt.ok) opt.ok(); return; }
    if (file && navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        mark('teilen');
        navigator.share({ files: [file] }).then(() => { if (opt.ok) opt.ok(); }).catch((e) => { if (e && e.name === 'AbortError') return; moodleApp ? (opt.fehlt ? opt.fehlt() : ansicht()) : dl(true); });
        return;
      } catch (e) {}
    }
    if (moodleApp) { if (opt.fehlt) { mark('fehlt'); opt.fehlt(); } else ansicht(); return; }
    dl(true); if (opt.ok) opt.ok();
  }

  const einbrennen = (doc) => {
    const win = doc.defaultView; if (!win) return;
    for (const e of doc.querySelectorAll('*')) {
      let tt; try { tt = win.getComputedStyle(e).textTransform; } catch (x) { continue; }
      if (tt !== 'uppercase' && tt !== 'lowercase') continue;
      for (let n = e.firstChild; n; n = n.nextSibling) if (n.nodeType === 3 && n.nodeValue.trim()) n.nodeValue = tt === 'uppercase' ? n.nodeValue.toUpperCase() : n.nodeValue.toLowerCase();
      e.style.textTransform = 'none';
    }
  };

  let laeuft = false;
  function pdf(seiten, fn, opt = {}) {
    if (laeuft || !seiten.length) return;
    if (typeof html2canvas === 'undefined' || !window.jspdf) { mark('ohne-bibliothek'); return; }
    laeuft = true;
    const [bw, bh] = opt.quer ? [A4[1], A4[0]] : A4;
    const vorhang = document.createElement('div'); vorhang.className = 'lb-pdf-vorhang'; vorhang.textContent = opt.satz || '… dein Blatt wird gemacht';
    const buehne = document.createElement('div'); buehne.className = 'lb-pdf-buehne';
    buehne.style.width = bw + 'px';
    for (const s of seiten) { const a4 = document.createElement('div'); a4.className = 'lb-pdf-seite'; a4.style.width = bw + 'px'; a4.style.height = bh + 'px'; a4.append(s); buehne.append(a4); }
    document.body.append(buehne, vorhang);
    const ende = () => { buehne.remove(); vorhang.remove(); laeuft = false; };
    const bilder = [...buehne.querySelectorAll('img')];
    const SKALA = 1.5;
    const aktiv = () => !navigator.userActivation || navigator.userActivation.isActive;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      Promise.all(bilder.map(i => i.decode ? i.decode().catch(() => {}) : null)).then(async () => {
        const JsPDF = window.jspdf.jsPDF;
        const doc = new JsPDF({ unit: 'mm', format: 'a4', orientation: opt.quer ? 'landscape' : 'portrait' });
        const [pw, ph] = opt.quer ? [297, 210] : [210, 297];
        const blaetter = [...buehne.children];
        const proGruppe = Math.max(1, Math.floor(12000000 / (bw * bh * SKALA * SKALA)));
        const seite = document.createElement('canvas'); seite.width = Math.round(bw * SKALA); seite.height = Math.round(bh * SKALA);
        const sg = seite.getContext('2d');
        for (let a = 0; a < blaetter.length; a += proGruppe) {
          const gruppe = document.createElement('div'); gruppe.style.width = bw + 'px';
          buehne.insertBefore(gruppe, blaetter[a]);
          const teil = blaetter.slice(a, a + proGruppe); gruppe.append(...teil);
          const c = await html2canvas(gruppe, { backgroundColor: '#ffffff', scale: SKALA, logging: false, onclone: einbrennen });
          const sh = c.height / teil.length;
          for (let i = 0; i < teil.length; i++) {
            sg.fillStyle = '#fff'; sg.fillRect(0, 0, seite.width, seite.height);
            sg.drawImage(c, 0, i * sh, c.width, sh, 0, 0, seite.width, seite.height);
            if (a + i) doc.addPage('a4', opt.quer ? 'landscape' : 'portrait');
            doc.addImage(seite.toDataURL('image/jpeg', 0.85), 'JPEG', 0, 0, pw, ph);
          }
          c.width = c.height = 0; gruppe.remove();
        }
        seite.width = seite.height = 0;
        try { window.__lbPdfSeiten = blaetter.length; window.__lbPdfPx = [Math.round(bw * SKALA), Math.round(bh * SKALA)]; } catch (e) {}
        try { doc.setProperties({ title: fn.replace(/\.pdf$/, ''), subject: 'Mein Lautbuch' }); } catch (e) {}
        const blob = doc.output('blob');
        const ua = navigator.userAgent || '';
        const geste = /\b(iPhone|iPod|iPad)\b|MoodleMobile/i.test(ua) || (/\bMacintosh\b/.test(ua) && (navigator.maxTouchPoints || 0) > 1);
        if (!geste || aktiv()) { ende(); sichern(blob, fn, opt.hinweis); return; }
        buehne.remove();
        vorhang.textContent = '';
        const fertig = document.createElement('button'); fertig.type = 'button'; fertig.className = 'knopf lb-pdf-fertig'; fertig.textContent = 'Sichern';
        fertig.addEventListener('click', () => { vorhang.remove(); laeuft = false; sichern(blob, fn, opt.hinweis); });
        vorhang.append(document.createTextNode('Fertig. '), fertig);
        mark('fertig-knopf');
      }).catch(() => { mark('fehler'); ende(); });
    }));
  }
  window.LB_AUSGABE = { pdf, sichern, mitOk: true };
})();
