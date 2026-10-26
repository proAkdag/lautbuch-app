(() => {
  'use strict';
  const VOKALE = 'aeiouäöüAEIOUÄÖÜ';
  const el = (tag, cls, inhalt) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (inhalt != null) e.append(inhalt);
    return e;
  };
  const faerbe = (text, vor = '') => {
    const f = document.createDocumentFragment();
    for (let i = 0; i < text.length;) {
      if (/^sch/i.test(text.slice(i, i + 3))) { f.append(el('span', 'verb', text.slice(i, i + 3))); i += 3; continue; }
      if (/^ch/i.test(text.slice(i, i + 2))) {
        const davor = (vor + text.slice(0, i)).toLowerCase();
        f.append(el('span', /(a|o|u)$/.test(davor) && !/(eu|äu)$/.test(davor) ? 'ch-ach' : 'ch-ich', text.slice(i, i + 2)));
        i += 2; continue;
      }
      const zwei = text.slice(i, i + 2), z2 = zwei.toLowerCase();
      if (['äu', 'ei', 'ai', 'au', 'eu', 'ie'].includes(z2)) { f.append(el('span', 'klang', zwei)); i += 2; continue; }
      if (['ng', 'qu'].includes(z2) || (i === 0 && !vor && /^s[pt]$/.test(z2))) { f.append(el('span', 'verb', zwei)); i += 2; continue; }
      const c = text[i];
      if ('äöüÄÖÜ'.includes(c)) f.append(el('span', 'klang', c));
      else if ('xXqQ'.includes(c)) f.append(el('span', 'verb', c));
      else if (VOKALE.includes(c)) f.append(el('span', 'vok', c));
      else if (/\p{L}/u.test(c)) f.append(el('span', 'kon', c));
      else f.append(el('span', 'zei', c));
      i++;
    }
    return f;
  };
  const wort = (w) => {
    const m = w.match(/^([„"‚‘'»«(]*)(.*?)([.,!?:;…“”"‘’'»«)]*)$/u);
    const box = el('span', 'wort');
    if (!/\p{L}/u.test(w)) { box.append(faerbe(w)); return box; }
    if (m[1]) box.append(faerbe(m[1]));
    m[1] = m[2]; m[2] = m[3];
    const silben = m[1].split('-');
    silben.forEach((s, i) => {
      const vorher = silben.slice(0, i).join('');
      if (i > 0 && s && vorher.slice(-1).toLowerCase() === s[0].toLowerCase() && !VOKALE.includes(s[0])) box.append(el('span', 'halt voll'));
      box.append(el('span', 'silbe', faerbe(s, vorher)));
    });
    if (m[2]) box.append(faerbe(m[2]));
    return box;
  };
  const silbiere = (w) => {
    if (w.includes('-')) return w;
    const KERN = /^((?:[aeo]y|äu|ei|ai|au|eu|ie|aa|ee|oo)(?![aeiouäöü])|[aeiouäöü]|y(?![aeiouäöü]))/i, EINHEIT = /^(sch|ch|ck|ph|th|qu)/i;
    const teile = [];
    for (let i = 0; i < w.length;) {
      const rest = w.slice(i);
      const k = rest.match(KERN), e = !k && rest.match(EINHEIT);
      const t = k ? k[0] : e ? e[0] : w[i];
      teile.push({ t, kern: !!k, laut: !!k || /\p{L}/u.test(t) });
      i += t.length;
    }
    const kerne = teile.map((x, i) => x.kern ? i : -1).filter(i => i >= 0);
    if (kerne.length < 2 || teile.some(x => !x.laut)) return w;
    const schnitt = new Set();
    for (let n = 0; n + 1 < kerne.length; n++) {
      const a = kerne[n], b = kerne[n + 1];
      schnitt.add(b - a === 1 ? b : b - 1);
    }
    return teile.map((x, i) => (schnitt.has(i) ? '-' : '') + x.t).join('');
  };
  const satz = (s) => {
    const box = el('span', 'satz');
    for (const w of s.split(' ')) box.append(wort(w));
    return box;
  };
  const saat = (text) => {
    let h = 2166136261;
    for (const c of text) { h ^= c.codePointAt(0); h = Math.imul(h, 16777619); }
    return () => {
      h = (h + 0x6D2B79F5) | 0;
      let t = Math.imul(h ^ (h >>> 15), 1 | h);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };
  const mische = (a, rnd = Math.random) => {
    const b = a.slice();
    for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; }
    return b;
  };
  const gross = (s) => s.replace(/ß/g, 'ẞ').toUpperCase();
  const fall = (s, rnd = Math.random) => rnd() < 0.5 ? gross(s) : s.toLowerCase();
  const anlauf = (pool, rnd = Math.random) => {
    let beutel = [];
    const ziehe = (verboten) => {
      if (!beutel.length) beutel = mische([...new Set(pool)], rnd);
      const k = beutel.findIndex(s => !verboten.includes(s));
      return k < 0 ? beutel.pop() : beutel.splice(k, 1)[0];
    };
    return [0, 1, 2].map(() => {
      const reihe = [];
      while (reihe.length < 4) reihe.push(ziehe(reihe));
      return reihe.map(s => fall(s, rnd));
    });
  };
  const stern = () => {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24'); svg.setAttribute('class', 'stern'); svg.setAttribute('aria-hidden', 'true');
    const p = document.createElementNS(ns, 'path');
    p.setAttribute('d', 'M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.4l-5.9 3.2 1.3-6.6-4.9-4.6 6.6-.8z');
    p.setAttribute('stroke-linejoin', 'round');
    svg.append(p);
    return svg;
  };
  window.LB = { el, faerbe, wort, satz, silbiere, saat, mische, fall, gross, anlauf, stern };
})();
