import './lb_lernweg_daten.mjs';
const TEILE =  (window).LAUTBUCH_TEILE;

export const PROFIL = window.LB_PROFIL, PK = (k) => PROFIL ? PROFIL.k(k) : k;
export const lies = (k, ersatz) => { try { const v = localStorage.getItem(PK(k)); return v == null ? ersatz : JSON.parse(v); } catch { return ersatz; } };
export const schreib = (k, v) => { try { localStorage.setItem(PK(k), JSON.stringify(v)); } catch {} };
export const schluessel = (id) => 'lautbuch.akt.' + id + '.v1';
export const licht = {};
for (const id of Object.keys(TEILE)) licht[id] = lies(schluessel(id), {}) || {};
export const speichern = (id) => schreib(schluessel(id), licht[id]);
export const EINST_KEY = 'lautbuch.einstellungen.v1';
export const einst = Object.assign({ schreibung: lies('lautbuch.schreibung.v1', null) || 'gross' }, lies(EINST_KEY, {}));
delete einst.ruhig;
export const einstSpeichern = () => schreib(EINST_KEY, einst);
