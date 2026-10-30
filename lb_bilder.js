(() => {
  'use strict';
  const lama = (t = '') => `<g${t ? ` transform="${t}"` : ''}>
    <path d="M28 54C28 45 36 42 46 42L74 42C80 42 82 48 82 54C82 62 76 66 68 66L38 66C32 66 28 61 28 54Z"/>
    <path d="M66 42L66 22M75 42L76 24"/>
    <path class="g" d="M64 21C64 13 69 10 74 11C79 12 84 15 84 19C84 22 81 24 76 24L70 24C66 24 64 23 64 21Z"/>
    <path d="M68 12L66 4L71 11M74 11L76 3L78 12"/>
    <circle class="p" cx="75" cy="16" r="1.6"/>
    <path d="M36 66L36 88M45 66L45 88M64 66L64 88M73 66L73 88M28 50C22 48 22 42 26 40"/></g>`;
  const B = {
    lama: lama(),
    lamas: lama('translate(-6 26) scale(.62)') + lama('translate(40 4) scale(.62)'),
    ara: `<path d="M18 68L84 68"/>
      <path d="M46 66L42 94L49 94L53 66"/>
      <path class="g" d="M45 32C37 42 37 56 45 64C51 69 60 65 62 56C64 46 60 37 56 33Z"/>
      <path d="M47 40C53 46 55 56 51 64"/>
      <circle class="g" cx="52" cy="25" r="10"/>
      <path class="v" d="M60 21C68 20 71 28 67 34C65 31 63 30 60 30Z"/>
      <circle cx="51" cy="23" r="3.6"/><circle class="p" cx="51" cy="23" r="1.4"/>`,
    ananas: `<path d="M46 40C40 31 38 25 40 18C44 24 46 30 49 38M50 38C49 28 50 18 52 9C55 18 54 28 52 38M54 40C58 31 60 25 62 18C63 25 60 32 57 40"/>
      <ellipse cx="50" cy="63" rx="18" ry="24"/>
      <path d="M38 50L62 74M36 62L52 78M46 44L65 63M62 50L38 74M64 62L48 78M54 44L35 63"/>`,
    fasan: `<path d="M33 57L6 40M34 61L8 49"/>
      <path class="g" d="M30 60C30 48 42 44 54 46C64 48 70 56 68 64C66 72 54 74 44 72C36 70 30 66 30 60Z"/>
      <path d="M40 56C46 62 54 64 62 60"/>
      <path d="M61 48C63 40 65 33 70 29"/>
      <circle class="g" cx="72" cy="26" r="6"/>
      <path d="M78 24L84 26L78 28"/><circle class="p" cx="73" cy="25" r="1.4"/>
      <path d="M46 72L44 86M55 72L57 86M40 86L48 86M53 86L61 86"/>`,
    salat: `<path d="M22 60C18 44 30 30 42 32C46 22 58 22 62 30C74 28 84 40 80 54C86 64 78 78 66 78L34 78C24 78 18 70 22 60Z"/>
      <path d="M50 78C50 64 48 52 44 40M50 66C57 60 61 52 63 44M48 58C41 54 35 50 32 46M51 72C58 70 66 66 70 60"/>`,
    pasta: `<path d="M60 46L73 12M68 9L70 3M72 10L74 4M76 12L78 6M66 12L79 16"/>
      <path d="M24 52C26 42 32 42 34 52C36 42 42 42 44 52C46 42 52 42 54 52C56 42 62 42 64 52C66 42 72 42 76 52"/>
      <path class="g" d="M16 52L84 52C82 72 68 84 50 84C32 84 18 72 16 52Z"/>
      <path d="M38 52C38 60 34 64 36 72M58 52C60 58 64 60 62 66"/>`,
    panda: `<circle class="v" cx="28" cy="30" r="9"/><circle class="v" cx="72" cy="30" r="9"/>
      <circle class="g" cx="50" cy="54" r="30"/>
      <path class="v" d="M33 50C33 42 41 40 44 46C46 54 40 60 36 58C34 56 33 54 33 50Z"/>
      <path class="v" d="M67 50C67 42 59 40 56 46C54 54 60 60 64 58C66 56 67 54 67 50Z"/>
      <circle cx="40" cy="49" r="2" fill="#fff" stroke="none"/><circle cx="60" cy="49" r="2" fill="#fff" stroke="none"/>
      <path class="v" d="M46 62L54 62L50 66Z"/>
      <path d="M50 66C50 70 46 72 44 70M50 66C50 70 54 72 56 70"/>`,
    tamtam: `<path d="M22 90L29 18M78 90L71 18M24 20L76 20"/>
      <path d="M43 20L45 34M57 20L55 34"/>
      <circle class="g" cx="50" cy="54" r="20"/><circle cx="50" cy="54" r="6"/>
      <path d="M66 82L84 64"/><circle class="v" cx="86" cy="62" r="5"/>`,
    ast: `<path d="M8 72C30 66 50 58 92 30M40 60C44 50 46 44 44 36M62 47C70 45 76 47 82 53"/>
      <path class="g" d="M44 36C40 30 42 24 48 21C50 28 48 34 44 36Z"/>
      <path class="g" d="M82 53C88 51 93 55 93 62C87 62 82 59 82 53Z"/>
      <path class="g" d="M28 66C24 73 26 79 32 82C35 75 33 70 28 66Z"/>`,
    kajak: `<path d="M4 78C14 74 24 82 34 78C44 74 54 82 64 78C74 74 84 82 96 78"/>
      <path class="g" d="M8 62C30 72 70 72 92 62C70 55 30 55 8 62Z"/>
      <path d="M42 60C46 57 54 57 58 60M50 46L50 58"/>
      <circle class="g" cx="50" cy="40" r="6"/>
      <path d="M26 35L74 49"/>
      <path class="v" d="M17 31C20 27 26 30 28 36C24 38 20 36 17 31Z"/>
      <path class="v" d="M83 53C80 57 74 54 72 48C76 46 80 48 83 53Z"/>`,
    schaf: `<path d="M38 68L38 86M48 70L48 88M60 70L60 88M68 64L68 84"/>
      <path class="g" d="M28 46C24 36 36 28 44 34C48 26 60 26 64 34C74 30 82 40 76 48C84 54 78 66 68 64C64 72 50 72 46 66C36 72 24 64 28 56C20 52 22 44 28 46Z"/>
      <path class="v" d="M72 44C80 40 90 46 88 56C86 62 78 62 74 58C70 54 70 48 72 44Z"/>
      <path d="M74 46L67 41"/><circle cx="82" cy="50" r="1.8" fill="#fff" stroke="none"/>`,
    wal: `<path d="M40 30C38 22 34 18 29 18M40 30C42 22 46 18 51 18M40 30L40 19"/>
      <path class="g" d="M12 56C12 40 30 32 52 34C72 36 84 46 84 60C84 70 74 76 58 76L30 76C20 76 12 68 12 56Z"/>
      <path d="M84 60C88 52 92 46 96 42C94 50 92 54 90 58C94 58 98 62 98 67C92 65 88 63 84 63"/>
      <path d="M14 62C24 66 34 66 44 62"/><circle class="p" cx="26" cy="53" r="1.8"/>`,
    schakal: `<path d="M30 54C20 56 14 66 12 76C18 72 24 66 30 60"/>
      <path d="M36 64L34 88M44 64L44 88M60 64L62 88M68 62L70 86"/>
      <path class="g" d="M30 52C40 46 62 46 72 50C76 56 72 64 64 64L36 64C30 64 28 58 30 52Z"/>
      <path d="M76 38L76 23L82 36M82 38L87 25L88 40"/>
      <path class="g" d="M70 48C72 40 78 36 84 38L96 46L84 52C78 54 72 54 70 48Z"/>
      <circle class="p" cx="84" cy="43" r="1.6"/><circle class="v" cx="96" cy="46" r="1.6"/>`
  };
  const NS = 'http://www.w3.org/2000/svg';
  const bild = (schl, cls, fassung = 'farbe', klein = false) => {
    const roh = (window.LB_BILDDATEN || {})[schl];
    if (roh && roh[fassung]) {
      const img = document.createElement('img');
      img.className = 'bild raster' + (cls ? ' ' + cls : '');
      img.src = (klein && fassung === 'farbe' && roh.klein) || roh[fassung]; img.alt = ''; img.setAttribute('aria-hidden', 'true'); img.draggable = false;
      return img;
    }
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'bild' + (cls ? ' ' + cls : ''));
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('aria-hidden', 'true');
    svg.innerHTML = B[schl] || (window.LB_PLATZHALTER || {})[schl] || '';
    return svg;
  };
  const bildSchluessel = (wort) => wort.toLowerCase().replace(/[^a-zäöüß]/g, '');
  const bildPool = (teil) => [...new Set(teil.level.flatMap(l => l.bilder || []))];
  const ablenkerWoerter = (teil) => {
    const mitBild = new Set(bildPool(teil).map(bildSchluessel));
    return [...new Set(teil.level.flatMap(l => (l.woerter || []).flat()))].filter(w => !mitBild.has(bildSchluessel(w)));
  };
  const vorhanden = (k) => !!(k && (B[k] || (window.LB_BILDDATEN || {})[k] || (window.LB_PLATZHALTER || {})[k]));
  const ZAHL = { zwei: 2, drei: 3, vier: 4, 'fünf': 5 };
  const FUELL = /^(der|die|das|den|dem|des|ein|eine|einen|einem|einer|im|am|ins|in|auf|unter|mit|vor|hinter|neben|zum|zur|an|aus|von|ganz|viel|viele)$/;
  const teilSchluessel = (text, vorsilbe = '', einzeln = false) => {
    const ws = String(text || '').toLowerCase().split(/\s+/).filter(x => x && !FUELL.test(x) && !ZAHL[x]).reverse();
    for (const w of ws) {
      const k = bildSchluessel(w), ohneE = (x) => x.replace(/e$/, '');
      const kand = [k, k.replace(/s$/, ''), k.replace(/en$/, ''), k.replace(/n$/, ''), ohneE(k), ohneE(k.replace('äu', 'au')), ohneE(k.replace('ä', 'a')), ohneE(k.replace('ö', 'o')), ohneE(k.replace('ü', 'u'))];
      if (einzeln) { const rest = kand.filter(x => x !== k); kand.splice(0, kand.length, ...rest, k); }
      const t = kand.map(x => vorsilbe + x).find(vorhanden) || (vorsilbe && kand.find(vorhanden));
      if (t) return t;
    }
    return null;
  };
  const szeneTeile = (b) => { const n = ZAHL[String(b.wer || '').toLowerCase().split(' ')[0]] || 1; return { n, wer: teilSchluessel(b.wer, '', n > 1), tut: teilSchluessel(b.tut, 'tut-'), was: b.was ? teilSchluessel(b.was) : null }; };
  const hatSzene = (b) => { if (vorhanden(b.s)) return true; const t = szeneTeile(b); return !!(t.wer && t.tut && (!b.was || t.was)); };
  const weichEin = (img) => {
    if (!img.decode) return img;
    let da = false; const fertig = () => { da = true; img.classList.remove('laedt'); };
    img.decode().then(fertig, fertig);
    requestAnimationFrame(() => { if (!da) img.classList.add('laedt'); });
    setTimeout(fertig, 2000);
    return img;
  };
  const szeneBild = (b, cls, weich = false) => {
    if (vorhanden(b.s)) { const i = bild(b.s, 'szene-ganz' + (cls ? ' ' + cls : '')); return weich ? weichEin(i) : i; }
    const t = szeneTeile(b), box = document.createElement('div');
    box.className = 'szene-platzhalter' + (cls ? ' ' + cls : ''); box.setAttribute('aria-hidden', 'true');
    const wer = document.createElement('div'); wer.className = 'sp-wer n' + Math.min(t.n, 5);
    for (let k = 0; k < Math.min(t.n, 5); k++) wer.append(bild(t.wer || '', 'sp-figur'));
    box.append(wer, bild(t.tut || '', 'sp-tut'));
    if (b.was) box.append(bild(t.was || '', 'sp-was'));
    return box;
  };
  window.LB = Object.assign(window.LB || {}, { szeneTeile, hatSzene, szeneBild, weichEin });
  window.LB = Object.assign(window.LB || {}, { bild, bildSchluessel, bildPool, ablenkerWoerter, hatBild:(w) => !!(B[bildSchluessel(w)] || (window.LB_BILDDATEN || {})[bildSchluessel(w)] || (window.LB_PLATZHALTER || {})[bildSchluessel(w)]) });
  window.LB_BILDER = Object.keys(B);
})();
