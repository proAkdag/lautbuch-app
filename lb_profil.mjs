const LB_PROFIL = (() => {
  'use strict';
  const VZ = 'lautbuch-profile.v1', VORGANG = 'lautbuch-profile.vorgang.v1', PLAETZE = 3, BASIS = 'lautbuch.';
  const vorsilbe = (nr) => nr === 1 ? BASIS : 'lautbuch-p' + nr + '.';
  const roh = {
    get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
    set: (k, v) => localStorage.setItem(k, v),
    weg: (k) => { try { localStorage.removeItem(k); } catch {} },
    alle: () => { const a = []; try { for (let i = 0; i < localStorage.length; i++) a.push(localStorage.key(i)); } catch {} return a; }
  };
  const json = (t, ersatz) => { try { return t == null ? ersatz : JSON.parse(t); } catch { return ersatz; } };

  const gueltig = (z) => {
    const p = Array.from({ length: PLAETZE }, (_, i) => {
      const x = z && Array.isArray(z.plaetze) ? z.plaetze[i] : null;
      return x && typeof x === 'object' ? { nr: i + 1, seit: x.seit || null } : null;
    });
    if (!p.some(Boolean)) p[0] = { nr: 1, seit: null };
    let aktiv = z && p[(z.aktiv | 0) - 1] ? z.aktiv | 0 : p.find(Boolean).nr;
    const v = { v: 1, aktiv, plaetze: p };
    if (z && p[(z.oeffne | 0) - 1]) v.oeffne = z.oeffne | 0;
    return v;
  };
  let vz = null;
  const verzeichnis = () => {
    if (vz) return vz;
    const da = json(roh.get(VZ), null);
    vz = gueltig(da);
    if (!da || JSON.stringify(da) !== JSON.stringify(vz)) { try { roh.set(VZ, JSON.stringify(vz)); } catch {} }
    return vz;
  };
  const vzSchreiben = (neu) => { vz = gueltig(neu); roh.set(VZ, JSON.stringify(vz)); };

  const aktiv = () => verzeichnis().aktiv;
  const kIn = (nr, k) => typeof k === 'string' && k.startsWith(BASIS) ? vorsilbe(nr) + k.slice(BASIS.length) : k;
  const k = (schl) => kIn(aktiv(), schl);
  const schluesselVon = (nr) => roh.alle().filter(n => n && n.startsWith(vorsilbe(nr)));
  const liesIn = (nr, schl, ersatz) => json(roh.get(kIn(nr, schl)), ersatz);
  const schreibIn = (nr, schl, wert) => { try { roh.set(kIn(nr, schl), JSON.stringify(wert)); return true; } catch { return false; } };
  const eintraege = (nr) => {
    const o = {}, v = vorsilbe(nr);
    for (const n of schluesselVon(nr)) o[BASIS + n.slice(v.length)] = roh.get(n);
    return o;
  };
  const leeren = (nr) => { for (const n of schluesselVon(nr)) roh.weg(n); };
  const fuellen = (nr, daten) => { for (const [n, v] of Object.entries(daten)) if (n.startsWith(BASIS) && typeof v === 'string') roh.set(kIn(nr, n), v); };
  const sauber = (daten) => daten && typeof daten === 'object' ? Object.fromEntries(Object.entries(daten).filter(([n, v]) => n.startsWith(BASIS) && typeof v === 'string')) : {};

  const geraetDaten = () => {
    const o = {};
    for (let nr = 1; nr <= PLAETZE; nr++) for (const n of schluesselVon(nr)) o[n] = roh.get(n);
    return o;
  };
  const geraet = () => { const z = verzeichnis(); return { profile: { v: 1, aktiv: z.aktiv, plaetze: z.plaetze }, daten: geraetDaten() }; };
  const zumGeraet = (n) => { for (let nr = 1; nr <= PLAETZE; nr++) if (n.startsWith(vorsilbe(nr))) return true; return false; };

  const ausfuehren = (g) => {
    if (g.art === 'loeschen') {
      leeren(g.nr);
      const z = verzeichnis(), p = z.plaetze.slice(); p[g.nr - 1] = null;
      vzSchreiben({ ...z, plaetze: p, aktiv: z.aktiv === g.nr ? (p.find(Boolean) || {}).nr : z.aktiv, oeffne: null });
    } else if (g.art === 'ersetzen') {
      leeren(g.nr); fuellen(g.nr, g.daten);
      const z = verzeichnis(), p = z.plaetze.slice(); p[g.nr - 1] = p[g.nr - 1] || { nr: g.nr, seit: g.seit || null };
      vzSchreiben({ ...z, plaetze: p });
    } else if (g.art === 'geraet') {
      for (let nr = 1; nr <= PLAETZE; nr++) leeren(nr);
      for (const [n, v] of Object.entries(g.daten)) if (zumGeraet(n) && typeof v === 'string') roh.set(n, v);
      vzSchreiben(g.profile);
    }
  };
  const zurueck = (g) => {
    if (!g.alt) return;
    if (g.art === 'geraet') { for (let nr = 1; nr <= PLAETZE; nr++) leeren(nr); for (const [n, v] of Object.entries(g.alt.daten)) roh.set(n, v); vzSchreiben(g.alt.profile); }
    else { leeren(g.nr); fuellen(g.nr, g.alt.daten); vzSchreiben(g.alt.profile); }
  };
  const vorgang = (g) => {
    try { roh.set(VORGANG, JSON.stringify(g)); } catch { return false; }
    let ok = true;
    try { ausfuehren(g); } catch {
      ok = false;
      try { zurueck(g); } catch { return false; }
    }
    roh.weg(VORGANG);
    return ok;
  };
  const vorgaengeAbschliessen = () => {
    const g = json(roh.get(VORGANG), null);
    if (!g) return null;
    vz = null;
    try { ausfuehren(g); } catch { try { zurueck(g); } catch { vz = null; return null; } }
    roh.weg(VORGANG); vz = null;
    return g.art;
  };
  const altStand = (nr) => ({ profile: geraet().profile, daten: nr ? eintraege(nr) : geraetDaten() });

  const plaetze = () => verzeichnis().plaetze.map(p => p && { nr: p.nr, aktiv: p.nr === aktiv(), name: String(liesIn(p.nr, 'lautbuch.name.v1', '') || '').trim() });
  const heute = () => new Date().toISOString().slice(0, 10);
  const anlegen = (nr, name) => {
    const z = verzeichnis();
    if (!(nr >= 1 && nr <= PLAETZE) || z.plaetze[nr - 1]) return false;
    const daten = {}; if (name && String(name).trim()) daten['lautbuch.name.v1'] = JSON.stringify(String(name).trim());
    return vorgang({ art: 'ersetzen', nr, daten, seit: heute(), alt: altStand(nr) });
  };
  const loeschen = (nr) => {
    const z = verzeichnis();
    if (!z.plaetze[nr - 1] || z.plaetze.filter(Boolean).length < 2) return false;
    return vorgang({ art: 'loeschen', nr, alt: altStand(nr) });
  };
  const ersetze = (nr, daten) => vorgang({ art: 'ersetzen', nr, daten: sauber(daten), seit: heute(), alt: altStand(nr) });
  const geraetEinspielen = (s) => {
    if (!s || !s.daten || typeof s.daten !== 'object') return false;
    const daten = Object.fromEntries(Object.entries(s.daten).filter(([n, v]) => zumGeraet(n) && typeof v === 'string'));
    return vorgang({ art: 'geraet', daten, profile: gueltig(s.profile), alt: altStand(null) });
  };
  const frei = () => { const p = verzeichnis().plaetze.findIndex(x => !x); return p < 0 ? null : p + 1; };
  const waehle = (nr) => {
    const z = verzeichnis();
    if (!z.plaetze[nr - 1]) return Promise.resolve(false);
    if (nr === z.aktiv) return Promise.resolve(true);
    try { vzSchreiben({ ...z, aktiv: nr, oeffne: nr }); } catch { return Promise.resolve(false); }
    location.reload();
    return new Promise(() => {});
  };
  const oeffne = () => {
    const z = verzeichnis(), n = z.oeffne || null;
    if (n) { try { vzSchreiben({ ...z, oeffne: null }); } catch {} }
    return n;
  };

  const abgeschlossen = vorgaengeAbschliessen();
  verzeichnis();
  return { PLAETZE, vorsilbe, aktiv, k, kIn, liesIn, schreibIn, eintraege, plaetze, anlegen, loeschen, ersetze, frei, waehle, oeffne,
    geraet, geraetEinspielen, abgeschlossen: () => abgeschlossen };
})();

window.LB_PROFIL = LB_PROFIL;
export default LB_PROFIL;
