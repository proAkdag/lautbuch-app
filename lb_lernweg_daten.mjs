import prolog from './prolog.mjs';
import akt_a from './akt_a.mjs';
import akt_i from './akt_i.mjs';
import akt_o from './akt_o.mjs';
import akt_u from './akt_u.mjs';
import akt_e from './akt_e.mjs';
import akt_ae from './akt_ae.mjs';
import akt_oe from './akt_oe.mjs';
import akt_ue from './akt_ue.mjs';
import akt_ei from './akt_ei.mjs';
import akt_au from './akt_au.mjs';
import akt_eu from './akt_eu.mjs';
import akt_r1 from './akt_r1.mjs';
import akt_r2 from './akt_r2.mjs';
import akt_r3 from './akt_r3.mjs';
import akt_r4 from './akt_r4.mjs';
import akt_ziel from './akt_ziel.mjs';
import karte from './lb_karte.mjs';
import folge from './lb_folge.mjs';
import welt from './lb_welt.mjs';

const TEILE = { p: prolog, a: akt_a, i: akt_i, o: akt_o, u: akt_u, e: akt_e, ae: akt_ae, oe: akt_oe, ue: akt_ue, ei: akt_ei, au: akt_au, eu: akt_eu,
  r1: akt_r1, r2: akt_r2, r3: akt_r3, r4: akt_r4, ziel: akt_ziel };
const w =  (window);
Object.assign(window, { LAUTBUCH_TEILE: Object.assign(w.LAUTBUCH_TEILE || {}, TEILE), LAUTBUCH_KARTE: karte, LAUTBUCH_FOLGE: folge, LAUTBUCH_WELT: welt });
