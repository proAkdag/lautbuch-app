(() => {
  'use strict';
  const FOLGE = [
    { teil: 'p', art: 'prolog' },
    { teil: 'a', art: 'vokal', vokal: 'a', kern: 'a', neu: ['a'] },
    { teil: 'i', art: 'vokal', vokal: 'i', kern: 'i', neu: ['i'] },
    { teil: 'o', art: 'vokal', vokal: 'o', kern: 'o', neu: ['o'] },
    { teil: 'u', art: 'vokal', vokal: 'u', kern: 'u', neu: ['u'] },
    { teil: 'e', art: 'vokal', vokal: 'e', kern: 'e', neu: ['e'] },
    { teil: 'r1', art: 'regel', kern: 'ie|(?<!s)ch|[bdgr]$', neu: ['ie', 'ch'], erlaubt: ['ie', 'ch', 'ende-bdg', 'ende-r'] },
    { teil: 'ae', art: 'klang', kern: 'ä', neu: ['ä'], erlaubt: ['ä'] },
    { teil: 'oe', art: 'klang', kern: 'ö', neu: ['ö'], erlaubt: ['ö'] },
    { teil: 'ue', art: 'klang', kern: 'ü', neu: ['ü'], erlaubt: ['ü'] },
    { teil: 'ei', art: 'klang', kern: 'ei|ai', neu: ['ei', 'ai'], erlaubt: ['ei', 'ai'] },
    { teil: 'au', art: 'klang', kern: 'au', neu: ['au'], erlaubt: ['au'] },
    { teil: 'eu', art: 'klang', kern: 'eu|äu', neu: ['eu', 'äu'], erlaubt: ['eu', 'äu'] },
    { teil: 'r2', art: 'regel', kern: 'v|y|c(?![hk])', neu: ['v', 'y', 'c'], erlaubt: ['v', 'y', 'c'] },
    { teil: 'r3', art: 'regel', kern: '^s[pt]|qu|ng|nk|x|pf', neu: ['sp', 'st', 'qu', 'ng', 'x'], erlaubt: ['sp-st', 'qu', 'ng', 'nk', 'x'] },
    { teil: 'r4', art: 'regel', kern: 'ck|tz|ß|([b-df-hj-np-tv-z])\\1|[aeiouäöü]h(?![aeiouäöü])|aa|ee|oo', neu: ['ß'], erlaubt: ['ck', 'tz', 'ß', 'doppel', 'dehnung'] },
    { teil: 'ziel', art: 'ziel' }
  ];
  const GRAPHEME = ['sch', 'äu', 'ei', 'ai', 'au', 'eu', 'ie', 'ch', 'qu', 'ng'];
  const TASTEN = [['a', 'i', 'o', 'u', 'e'], ['ie', 'ch'], ['ä', 'ö', 'ü'], ['ei', 'au', 'eu', 'äu'],
    ['m', 'l', 'n', 's', 'f', 'r', 'h'], ['p', 't', 'k', 'b', 'g', 'd'], ['w', 'j', 'z', 'sch'],
    ['v', 'y', 'c'], ['sp', 'st', 'qu', 'ng', 'x'], ['ß']];
  const zerlege = (w) => {
    const g = [];
    w.split('-').forEach((s, si) => {
      for (let i = 0; i < s.length;) {
        if (si === 0 && i === 0 && /^s[pt]/i.test(s)) { g.push(s.slice(0, 2)); i += 2; continue; }
        const t = GRAPHEME.find(x => s.slice(i, i + x.length).toLowerCase() === x);
        if (t) { g.push(s.slice(i, i + t.length)); i += t.length; continue; }
        g.push(s[i]); i++;
      }
    });
    return g;
  };
  const stelle = (id) => FOLGE.findIndex(f => f.teil === id);
  const AEHNLICH = {
    a: ['o', 'ä'], e: ['ä', 'o'], i: ['l', 'j'], o: ['a', 'u'], u: ['n', 'o'],
    ä: ['a', 'e'], ö: ['o', 'ü'], ü: ['u', 'ö'],
    ie: ['ei', 'i'], ei: ['ie', 'eu'], au: ['eu', 'a'], eu: ['äu', 'au'], äu: ['eu', 'ä'],
    m: ['n', 'w'], n: ['m', 'u'], l: ['i', 't'], s: ['z', 'f'], f: ['t', 'v'], r: ['n', 'h'], h: ['n', 'k'],
    p: ['b', 'd'], t: ['f', 'd'], k: ['g', 'h'], b: ['d', 'p'], g: ['k', 'j'], d: ['b', 't', 'p'],
    w: ['v', 'm'], j: ['i', 'g'], z: ['s', 't'], sch: ['ch', 's'], ch: ['sch', 'k'],
    v: ['f', 'w'], y: ['j', 'v'], c: ['e', 'k'], sp: ['st', 'sch'], st: ['sp', 'sch'], qu: ['k', 'p'], ng: ['n', 'g'], x: ['k', 'z'], 'ß': ['s', 'z']
  };
  window.LAUTBUCH_FOLGE = { FOLGE, GRAPHEME, TASTEN, AEHNLICH, zerlege, stelle };
})();
