(() => {
  'use strict';
  const PFADE = {
    haus:  '<path d="M3.5 11 12 4l8.5 7"/><path d="M5.5 9.5V20h13V9.5"/><path d="M10 20v-5.5h4V20"/>',
    raute: '<path d="M12 2.5 21.5 12 12 21.5 2.5 12z"/><path class="kern" fill="currentColor" d="M12 8 16 12 12 16 8 12z"/>',
    boss:  '<path d="M12 1.5 22.5 12 12 22.5 1.5 12z"/><path d="M12 5 19 12 12 19 5 12z"/><path class="kern" fill="currentColor" d="M12 9 15 12 12 15 9 12z"/>',
    truhe: '<path d="M3.5 11h17v8.5h-17z"/><path d="M3.5 11c0-3.6 3.8-6 8.5-6s8.5 2.4 8.5 6"/><path d="M10.5 11v3h3v-3"/>',
    stern: '<path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.4l-5.9 3.2 1.3-6.6-4.9-4.6 6.6-.8z"/>',
    karte: '<path d="M3 6.5 9 4l6 2.5L21 4v13.5L15 20l-6-2.5L3 20z"/><path d="M9 4v13.5M15 6.5V20"/>',
    loch:  '<path d="M5 3h14v18H5z"/><path d="M9 9h6v4H9z"/>',
    fall:  '<path d="M3 18 7.5 6 12 18M4.6 14h5.8"/><path d="M19.5 12v6"/><circle cx="17.6" cy="15" r="2.6"/>',
    band:  '<path class="flaeche" d="M7 3h10v18l-5-4-5 4z"/>',
    haken: '<circle class="flaeche" cx="12" cy="12" r="8.5"/><path fill="none" d="M8.2 12.3l2.7 2.7 5-5.3"/>',
    bild:  '<rect x="3.5" y="5" width="17" height="14" rx="2"/><path d="M6.5 16.5l4-5 3 3 2-2 2.5 4"/><circle cx="9" cy="9.5" r="1.4"/>',
    welt:  '<circle cx="12" cy="12" r="9"/><path d="M3.5 12h17M12 3c3 2.6 4.4 5.6 4.4 9s-1.4 6.4-4.4 9M12 3c-3 2.6-4.4 5.6-4.4 9s1.4 6.4 4.4 9"/>',
    stein: '<path fill="currentColor" d="M4.5 15.5c0-4.6 3.4-8.5 8-8.5 4 0 7 2.8 7 6.4 0 3.4-3.2 5.6-7.6 5.6-4.4 0-7.4-1.2-7.4-3.5z"/>',
    hinweis: '<path d="M4 5h16v11h-9l-4.5 3.5V16H4z"/><path d="M12 8.4v.1M12 10.6v3.2"/>',
    mehr: '<circle cx="6" cy="12" r="1.6" class="kern"/><circle cx="12" cy="12" r="1.6" class="kern"/><circle cx="18" cy="12" r="1.6" class="kern"/>',
    laute: '<rect x="3.5" y="3.5" width="7.5" height="7.5" rx="2"/><rect x="13" y="3.5" width="7.5" height="7.5" rx="2"/><rect x="3.5" y="13" width="7.5" height="7.5" rx="2"/><rect x="13" y="13" width="7.5" height="7.5" rx="2"/><path class="kern" fill="currentColor" d="M5.8 5.8h2.9v2.9H5.8z"/>',
    stapel: '<path d="M8 3.5h12v13"/><path d="M4 7.5h12.5v13H4z"/><path d="M7.5 12h5.5M7.5 15.5h4"/>',
    drehen: '<path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3"/><path d="M19.8 3.5v3.7h-3.7"/>',
    vollbild: '<path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5"/>',
    zurueck: '<path d="M20 12H5"/><path d="M11 6l-6 6 6 6"/>',
    vor: '<path d="M4 12h15"/><path d="M13 6l6 6-6 6"/>'
  };
  const NS = 'http://www.w3.org/2000/svg';
  let sprite = null;
  const bereit = () => {
    if (sprite) return;
    sprite = document.createElementNS(NS, 'svg');
    sprite.setAttribute('aria-hidden', 'true');
    sprite.setAttribute('width', '0'); sprite.setAttribute('height', '0');
    sprite.style.position = 'absolute';
    let inhalt = '';
    for (const [n, p] of Object.entries(PFADE)) inhalt += `<symbol id="lb-${n}" viewBox="0 0 24 24">${p}</symbol>`;
    sprite.innerHTML = inhalt;
    document.body.prepend(sprite);
  };
  const sym = (name, cls) => {
    bereit();
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'sym s-' + name + (cls ? ' ' + cls : ''));
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    const use = document.createElementNS(NS, 'use');
    use.setAttribute('href', '#lb-' + name);
    svg.append(use);
    return svg;
  };
  window.LB = Object.assign(window.LB || {}, { sym });
})();
