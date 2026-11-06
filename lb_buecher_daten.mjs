import b1 from './buch_1.mjs';
import b2 from './buch_2.mjs';
import b3 from './buch_3.mjs';

const buecher = {};
for (const b of [b1, b2, b3]) buecher[b.id] = b;
Object.assign(window, { LAUTBUCH_BUECHER: Object.assign( (window).LAUTBUCH_BUECHER || {}, buecher) });
