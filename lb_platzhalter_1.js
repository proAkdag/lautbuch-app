window.LB_PLATZHALTER = Object.assign(window.LB_PLATZHALTER || {}, {
  film: `<path d="M50 67C62 74 66 84 80 84L96 84M44 66C58 72 60 92 80 92L96 92M96 84L96 92"/>
    <circle class="g" cx="38" cy="40" r="26"/><circle class="g" cx="38" cy="40" r="5"/>
    <circle class="g" cx="38" cy="24" r="5"/><circle class="g" cx="38" cy="56" r="5"/><circle class="g" cx="22" cy="40" r="5"/><circle class="g" cx="54" cy="40" r="5"/>
    <circle class="p" cx="72" cy="88" r="1.8"/><circle class="p" cx="84" cy="88" r="1.8"/>`,
  salamis: `<g><rect class="g" x="12" y="8" width="78" height="24" rx="12"/><path d="M12 20L4 14M12 20L4 26M36 8L36 32M62 8L62 32"/></g>
    <g><rect class="g" x="12" y="38" width="78" height="24" rx="12"/><path d="M12 50L4 44M12 50L4 56M36 38L36 62M62 38L62 62"/></g>
    <g><rect class="g" x="12" y="68" width="78" height="24" rx="12"/><path d="M12 80L4 74M12 80L4 86M36 68L36 92M62 68L62 92"/></g>`,
  salami: `<rect class="g" x="6" y="22" width="72" height="28" rx="14"/><path d="M6 36L0 30M6 36L0 42M30 22L30 50M54 22L54 50"/>
    <circle class="g" cx="64" cy="72" r="18"/><circle class="p" cx="56" cy="66" r="2.6"/><circle class="p" cx="70" cy="62" r="2.6"/><circle class="p" cx="66" cy="78" r="2.6"/><circle class="p" cx="54" cy="80" r="2.2"/><circle class="p" cx="76" cy="74" r="2.2"/>`,
  tipi: `<path d="M40 4L56 30M60 4L44 30"/>
    <path class="g" d="M50 16L12 90L88 90Z"/>
    <path class="v" d="M50 52L38 90L62 90Z"/>
    <path d="M50 16L50 52M24 70L36 62M76 70L64 62"/>`,
  paprika: `<path d="M40 36C44 28 56 28 60 36"/><path d="M50 32C50 24 52 18 58 14"/>
    <path class="g" d="M30 38C18 40 14 60 20 74C26 88 40 90 50 86C60 90 74 88 80 74C86 60 82 40 70 38C62 34 38 34 30 38Z"/>
    <path d="M42 40C38 56 40 72 46 84M58 40C62 56 60 72 54 84"/>
    <path d="M40 36C44 30 56 30 60 36"/><path d="M50 34L50 22L58 14"/>`,
  pirat: `<circle class="g" cx="50" cy="58" r="24"/>
    <path class="v" d="M26 54C26 32 40 26 50 26C60 26 74 32 74 54C60 46 40 46 26 54Z"/>
    <path class="v" d="M72 36L88 30L84 42L90 50L76 46Z"/>
    <circle cx="62" cy="60" r="6" class="v"/><path d="M56 58L28 50"/>
    <circle class="p" cx="39" cy="60" r="2.4"/><path d="M50 62L48 68L52 68"/><path d="M37 72C44 80 56 80 63 72"/>`,
  bambi: `<path d="M34 62L32 88M42 62L42 88M62 62L62 88M70 60L72 88"/>
    <path class="g" d="M26 52C26 44 36 40 50 40L66 40C74 40 76 48 74 54C72 60 64 62 56 62L36 62C30 62 26 58 26 52Z"/>
    <path d="M26 48L20 44"/>
    <path class="g" d="M64 44L72 28L84 32L78 46Z"/>
    <path class="g" d="M72 18C72 12 78 10 84 12L94 24C94 30 88 32 84 30C78 28 74 24 72 18Z"/>
    <path class="g" d="M72 14L66 4L78 10Z"/>
    <circle class="p" cx="80" cy="18" r="2.4"/><circle class="v" cx="92" cy="26" r="2"/>
    <circle class="p" cx="38" cy="48" r="1.8"/><circle class="p" cx="48" cy="46" r="1.8"/><circle class="p" cx="58" cy="50" r="1.8"/><circle class="p" cx="44" cy="55" r="1.8"/><circle class="p" cx="34" cy="55" r="1.8"/><circle class="p" cx="54" cy="57" r="1.8"/>`,
  kamin: `<rect class="g" x="14" y="22" width="72" height="68"/><rect class="g" x="8" y="12" width="84" height="12" rx="2"/>
    <path d="M14 40L30 40M14 56L30 56M14 72L30 72M70 40L86 40M70 56L86 56M70 72L86 72M22 40L22 56M22 72L22 90M78 40L78 56M78 72L78 90"/>
    <path class="g" d="M30 90L30 52C30 38 70 38 70 52L70 90Z"/>
    <path class="g" d="M50 88C38 88 36 76 42 68C42 74 46 74 46 68C48 60 54 56 52 50C60 58 66 70 62 80C62 84 58 88 50 88Z"/>
    <path d="M36 90L64 90"/>`,
  fisch: `<path class="g" d="M72 50L92 32L92 68Z"/>
    <ellipse class="g" cx="44" cy="50" rx="30" ry="20"/>
    <path d="M38 31C44 20 56 20 60 32M46 70C48 80 56 80 58 69"/>
    <path d="M36 38C32 46 32 54 36 62M52 42C56 47 56 53 52 58M62 42C66 47 66 53 62 58"/>
    <circle class="g" cx="26" cy="44" r="4.5"/><circle class="p" cx="26" cy="44" r="1.8"/><path d="M15 54L21 56"/>`,
  kiwi: `<ellipse class="g" cx="28" cy="54" rx="21" ry="27"/>
    <circle class="p" cx="20" cy="44" r="1.5"/><circle class="p" cx="34" cy="40" r="1.5"/><circle class="p" cx="26" cy="56" r="1.5"/><circle class="p" cx="38" cy="60" r="1.5"/><circle class="p" cx="18" cy="66" r="1.5"/><circle class="p" cx="30" cy="72" r="1.5"/>
    <path d="M28 27L28 20"/>
    <ellipse class="g" cx="72" cy="52" rx="22" ry="26"/><ellipse class="g" cx="72" cy="52" rx="17" ry="21"/><ellipse class="g" cx="72" cy="52" rx="5" ry="7"/>
    <circle class="p" cx="72" cy="38" r="1.8"/><circle class="p" cx="81" cy="42" r="1.8"/><circle class="p" cx="85" cy="52" r="1.8"/><circle class="p" cx="81" cy="62" r="1.8"/><circle class="p" cx="72" cy="66" r="1.8"/><circle class="p" cx="63" cy="62" r="1.8"/><circle class="p" cx="59" cy="52" r="1.8"/><circle class="p" cx="63" cy="42" r="1.8"/>`,
  pilz: `<path class="g" d="M38 54C38 68 36 80 32 88L68 88C64 80 62 68 62 54Z"/>
    <path class="g" d="M12 56C12 30 28 14 50 14C72 14 88 30 88 56C70 62 30 62 12 56Z"/>
    <path d="M28 34C34 26 42 22 50 22M20 90L80 90"/>`,
  tisch: `<path d="M28 52L28 76M86 42L86 74"/>
    <path class="g" d="M26 32L92 32L80 52L12 52Z"/>
    <path d="M14 52L14 90M78 52L78 90"/><path d="M16 90L12 90M80 90L76 90"/>`,
  hirsch: `<path d="M74 18L68 6M71 12L63 10M69 8L66 2M80 18L86 6M83 12L91 10M85 8L88 2"/>
    <path d="M32 64L30 90M42 64L42 90M62 64L62 90M70 62L72 90"/>
    <path class="g" d="M62 46C66 34 68 28 70 22L82 26C80 36 78 46 76 54Z"/>
    <path class="g" d="M20 54C20 44 30 40 42 40L62 40C70 40 74 46 74 54C74 62 66 66 58 66L34 66C26 66 20 62 20 54Z"/>
    <path d="M20 50L14 46"/>
    <path class="g" d="M70 20C70 12 76 10 82 12L94 24C94 30 88 32 84 30C76 28 72 26 70 20Z"/>
    <circle class="p" cx="80" cy="19" r="2.2"/><circle class="v" cx="92" cy="26" r="2"/><path d="M70 22L62 18L68 14"/>`,
  nashorn: `<path class="g" d="M26 62L26 88L38 88L38 62M62 62L62 88L74 88L74 62"/>
    <path class="g" d="M14 52C14 36 30 30 50 30C66 30 78 36 82 46L96 56C96 62 90 66 82 64C78 68 70 70 60 70L28 70C20 68 14 62 14 52Z"/>
    <path class="g" d="M82 54L88 22L98 58Z"/>
    <path d="M70 34L68 24L78 32M14 50L8 60M52 36C48 48 50 58 54 68"/>
    <circle class="p" cx="80" cy="50" r="2.2"/>`,
  sofas: `<g transform="translate(39 2) scale(.6)"><path class="g" d="M14 40C14 30 20 28 26 28L74 28C80 28 86 30 86 40L86 62L14 62Z"/><rect class="g" x="4" y="44" width="16" height="36" rx="7"/><rect class="g" x="80" y="44" width="16" height="36" rx="7"/><rect class="g" x="18" y="56" width="64" height="20" rx="5"/><path d="M14 80L14 90M86 80L86 90"/><path class="g" d="M28 34L44 32L46 50L30 52Z"/><path class="g" d="M56 32L72 34L70 52L54 50Z"/></g>
    <g transform="translate(2 36) scale(.6)"><path class="g" d="M14 40C14 30 20 28 26 28L74 28C80 28 86 30 86 40L86 62L14 62Z"/><rect class="g" x="4" y="44" width="16" height="36" rx="7"/><rect class="g" x="80" y="44" width="16" height="36" rx="7"/><rect class="g" x="18" y="56" width="64" height="20" rx="5"/><path d="M14 80L14 90M86 80L86 90"/><path class="g" d="M28 34L44 32L46 50L30 52Z"/><path class="g" d="M56 32L72 34L70 52L54 50Z"/></g>`,
  sofa: `<path class="g" d="M14 40C14 30 20 28 26 28L74 28C80 28 86 30 86 40L86 62L14 62Z"/>
    <rect class="g" x="4" y="44" width="16" height="36" rx="7"/><rect class="g" x="80" y="44" width="16" height="36" rx="7"/>
    <rect class="g" x="18" y="56" width="64" height="20" rx="5"/><path d="M14 80L14 90M86 80L86 90"/>
    <path class="g" d="M28 34L44 32L46 50L30 52Z"/><path class="g" d="M56 32L72 34L70 52L54 50Z"/>`,
  dino: `<path class="g" d="M22 54C12 56 6 66 2 80C10 74 18 72 24 68Z"/>
    <path class="g" d="M28 74L26 92L38 92L38 74M54 74L54 92L66 92L66 74"/>
    <path class="g" d="M60 48C64 38 66 28 66 18L78 18C78 30 76 42 72 54Z"/>
    <path class="g" d="M20 62C20 48 34 42 48 42C62 42 72 48 72 60C72 70 64 74 52 74L36 74C26 74 20 70 20 62Z"/>
    <path class="g" d="M32 44L36 32L42 43M44 42L48 30L54 42"/>
    <path class="g" d="M62 18C62 10 68 8 74 8C84 8 90 12 90 18C90 22 84 24 78 24L66 24C63 24 62 22 62 18Z"/>
    <circle class="p" cx="78" cy="14" r="2"/><path d="M82 20C85 21 87 20 88 18"/>`,
  lok: `<path class="g" d="M16 44L16 30L11 24L31 24L26 30L26 44"/>
    <rect class="g" x="8" y="44" width="50" height="30" rx="4"/>
    <path d="M38 44C38 36 48 36 48 44"/>
    <rect class="g" x="56" y="28" width="36" height="46"/><path d="M52 28L96 28"/>
    <rect class="g" x="64" y="36" width="20" height="16" rx="2"/>
    <path d="M8 60L2 72L8 74"/>
    <circle class="g" cx="22" cy="78" r="10"/><circle class="g" cx="46" cy="78" r="10"/><circle class="g" cx="78" cy="80" r="8"/>
    <circle class="p" cx="22" cy="78" r="2"/><circle class="p" cx="46" cy="78" r="2"/><circle class="p" cx="78" cy="80" r="2"/>
    <path d="M22 78L46 78M2 90L98 90"/>`,
  krokodil: `<path class="g" d="M4 70C14 60 28 56 44 56L64 54C70 46 76 42 82 44C86 44 88 48 88 50L98 52L98 60C94 62 88 62 84 62L76 64L74 72C72 74 66 74 60 72L28 72C16 74 8 74 4 70Z"/>
    <path class="g" d="M24 72L22 82L32 82L32 72M54 72L52 82L62 82L62 72"/>
    <path d="M30 56L34 48L38 56M42 55L46 47L50 55M54 54L58 46L62 54"/>
    <circle class="g" cx="80" cy="43" r="5"/><circle class="p" cx="81" cy="43" r="1.8"/>
    <path d="M70 60L98 58M84 60C90 66 94 63 96 58"/><circle class="p" cx="95" cy="53" r="1.4"/>`,
  brot: `<path class="g" d="M10 66C10 42 28 28 50 28C72 28 90 42 90 66C90 76 82 82 72 82L28 82C18 82 10 76 10 66Z"/>
    <path d="M30 46C36 50 38 58 36 66M48 40C54 44 56 54 54 62M66 46C72 50 74 58 72 66M24 76L76 76"/>`,
  robo: `<path d="M50 22L50 12"/><circle class="g" cx="50" cy="8" r="5"/>
    <rect class="g" x="22" y="32" width="6" height="12" rx="2"/><rect class="g" x="72" y="32" width="6" height="12" rx="2"/>
    <rect class="g" x="28" y="22" width="44" height="32" rx="7"/>
    <circle class="g" cx="40" cy="36" r="6.5"/><circle class="g" cx="60" cy="36" r="6.5"/><circle class="p" cx="40" cy="36" r="2.4"/><circle class="p" cx="60" cy="36" r="2.4"/>
    <path d="M40 47L60 47M44 54L44 58M56 54L56 58"/>
    <rect class="g" x="24" y="58" width="52" height="30" rx="5"/>
    <rect class="g" x="38" y="64" width="24" height="14" rx="2"/><circle class="p" cx="44" cy="71" r="2.2"/><circle class="p" cx="56" cy="71" r="2.2"/>
    <path d="M24 64L12 78M76 64L88 78"/><circle class="g" cx="11" cy="80" r="4.5"/><circle class="g" cx="89" cy="80" r="4.5"/>
    <rect class="g" x="32" y="88" width="12" height="8" rx="2"/><rect class="g" x="56" y="88" width="12" height="8" rx="2"/>`,
  frosch: `<path class="g" d="M26 62C8 62 4 84 18 90L36 90L38 78Z"/><path class="g" d="M74 62C92 62 96 84 82 90L64 90L62 78Z"/>
    <ellipse class="g" cx="50" cy="62" rx="26" ry="22"/>
    <path d="M40 80L38 92M60 80L62 92M32 92L44 92M56 92L68 92"/>
    <circle class="g" cx="36" cy="34" r="10"/><circle class="g" cx="64" cy="34" r="10"/><circle class="p" cx="37" cy="34" r="3.4"/><circle class="p" cx="63" cy="34" r="3.4"/>
    <path d="M30 56C40 68 60 68 70 56"/><circle class="p" cx="46" cy="50" r="1.4"/><circle class="p" cx="54" cy="50" r="1.4"/>`,
  jojo: `<path d="M50 48C50 34 64 28 60 14"/><path d="M56 14C52 4 66 2 66 10C66 15 60 17 58 15"/>
    <circle class="g" cx="50" cy="70" r="26"/><circle class="g" cx="50" cy="70" r="15"/><circle class="p" cx="50" cy="70" r="3.4"/>
    <path d="M32 54C36 50 42 48 46 48"/>`,
  wolf: `<path class="g" d="M26 90C10 90 4 80 6 70C14 76 22 76 32 74Z"/>
    <ellipse class="g" cx="40" cy="74" rx="20" ry="17"/>
    <path class="g" d="M44 90C40 70 44 46 56 38L72 42C72 58 70 76 66 90Z"/>
    <path d="M58 90L58 76M68 90L66 76M54 90L62 90M64 90L72 90"/>
    <path class="g" d="M56 40C54 30 60 22 68 22C76 22 84 28 96 36L90 44C84 46 76 46 68 46C62 46 58 44 56 40Z"/>
    <path class="g" d="M60 24L60 8L68 20M70 21L74 6L78 24"/>
    <circle class="p" cx="72" cy="33" r="2"/><circle class="v" cx="95" cy="37" r="2.4"/><path d="M70 44L90 42"/><path d="M56 46L50 54L58 54"/>`,
  holz: `<circle class="g" cx="22" cy="76" r="13"/><circle cx="22" cy="76" r="6"/><circle class="p" cx="22" cy="76" r="1.6"/>
    <circle class="g" cx="50" cy="76" r="13"/><circle cx="50" cy="76" r="6"/><circle class="p" cx="50" cy="76" r="1.6"/>
    <circle class="g" cx="78" cy="76" r="13"/><circle cx="78" cy="76" r="6"/><circle class="p" cx="78" cy="76" r="1.6"/>
    <circle class="g" cx="36" cy="52" r="13"/><circle cx="36" cy="52" r="6"/><circle class="p" cx="36" cy="52" r="1.6"/>
    <circle class="g" cx="64" cy="52" r="13"/><circle cx="64" cy="52" r="6"/><circle class="p" cx="64" cy="52" r="1.6"/>
    <circle class="g" cx="50" cy="28" r="13"/><circle cx="50" cy="28" r="6"/><circle class="p" cx="50" cy="28" r="1.6"/>`,
  koala: `<circle class="g" cx="24" cy="22" r="13"/><circle cx="24" cy="22" r="6"/><circle class="g" cx="76" cy="22" r="13"/><circle cx="76" cy="22" r="6"/>
    <ellipse class="g" cx="50" cy="72" rx="24" ry="22"/>
    <circle class="g" cx="50" cy="38" r="22"/>
    <ellipse class="v" cx="50" cy="42" rx="6" ry="8"/><circle class="p" cx="40" cy="34" r="2.4"/><circle class="p" cx="60" cy="34" r="2.4"/>
    <path d="M2 68C30 64 70 72 98 66M2 76C30 72 70 80 98 74"/>
    <ellipse class="g" cx="32" cy="70" rx="8" ry="13"/><ellipse class="g" cx="68" cy="71" rx="8" ry="13"/>
    <ellipse class="g" cx="38" cy="92" rx="10" ry="5"/><ellipse class="g" cx="62" cy="92" rx="10" ry="5"/>`,
  schoko: `<rect class="g" x="24" y="6" width="52" height="64" rx="3"/>
    <path d="M41 6L41 50M59 6L59 50M24 26L76 26M24 46L76 46"/>
    <path class="g" d="M18 50L26 44L34 50L42 44L50 50L58 44L66 50L74 44L82 50L84 94L16 94Z"/>
    <path d="M30 62L28 90M50 58L50 90M70 62L72 90"/>`,
  uhus: `<g transform="translate(39 2) scale(.6)"><path d="M6 88C30 92 70 92 94 88"/><path class="g" d="M30 30L28 10L44 22M70 30L72 10L56 22"/><ellipse class="g" cx="50" cy="56" rx="26" ry="32"/><path d="M40 66C44 70 48 70 50 66C52 70 56 70 60 66M40 76C44 80 48 80 50 76C52 80 56 80 60 76"/><path d="M26 54C22 66 28 78 38 84M74 54C78 66 72 78 62 84"/><circle class="g" cx="38" cy="42" r="10"/><circle class="g" cx="62" cy="42" r="10"/><circle class="v" cx="38" cy="42" r="4"/><circle class="v" cx="62" cy="42" r="4"/><path class="v" d="M46 50L50 58L54 50Z"/></g>
    <g transform="translate(2 36) scale(.6)"><path d="M6 88C30 92 70 92 94 88"/><path class="g" d="M30 30L28 10L44 22M70 30L72 10L56 22"/><ellipse class="g" cx="50" cy="56" rx="26" ry="32"/><path d="M40 66C44 70 48 70 50 66C52 70 56 70 60 66M40 76C44 80 48 80 50 76C52 80 56 80 60 76"/><path d="M26 54C22 66 28 78 38 84M74 54C78 66 72 78 62 84"/><circle class="g" cx="38" cy="42" r="10"/><circle class="g" cx="62" cy="42" r="10"/><circle class="v" cx="38" cy="42" r="4"/><circle class="v" cx="62" cy="42" r="4"/><path class="v" d="M46 50L50 58L54 50Z"/></g>`,
  ufos: `<g transform="translate(39 2) scale(.6)"><path d="M36 74L26 94M64 74L74 94"/><path class="g" d="M32 46C32 30 40 22 50 22C60 22 68 30 68 46Z"/><ellipse class="g" cx="50" cy="54" rx="42" ry="15"/><path d="M40 38C42 32 46 30 50 30"/><circle class="p" cx="20" cy="54" r="3"/><circle class="p" cx="36" cy="60" r="3"/><circle class="p" cx="50" cy="62" r="3"/><circle class="p" cx="64" cy="60" r="3"/><circle class="p" cx="80" cy="54" r="3"/></g>
    <g transform="translate(2 36) scale(.6)"><path d="M36 74L26 94M64 74L74 94"/><path class="g" d="M32 46C32 30 40 22 50 22C60 22 68 30 68 46Z"/><ellipse class="g" cx="50" cy="54" rx="42" ry="15"/><path d="M40 38C42 32 46 30 50 30"/><circle class="p" cx="20" cy="54" r="3"/><circle class="p" cx="36" cy="60" r="3"/><circle class="p" cx="50" cy="62" r="3"/><circle class="p" cx="64" cy="60" r="3"/><circle class="p" cx="80" cy="54" r="3"/></g>`,
  mus: `<path class="g" d="M14 52C16 36 30 28 40 30C48 24 62 28 66 52Z"/>
    <path d="M44 40L40 18"/><ellipse class="g" cx="38" cy="14" rx="5" ry="8" transform="rotate(-12 38 14)"/>
    <path class="g" d="M6 52L74 52C72 72 60 86 40 86C20 86 8 72 6 52Z"/>
    <path d="M12 60C20 64 28 64 36 60"/>
    <path d="M86 56C84 48 90 44 96 46M88 58L86 50"/>
    <circle class="g" cx="86" cy="76" r="11"/><path d="M86 66C86 62 88 60 90 58"/><path class="g" d="M90 60C94 56 98 58 98 58C96 62 92 62 90 60Z"/>`,
  uhu: `<path d="M6 88C30 92 70 92 94 88"/>
    <path class="g" d="M30 30L28 10L44 22M70 30L72 10L56 22"/>
    <ellipse class="g" cx="50" cy="56" rx="26" ry="32"/>
    <path d="M40 66C44 70 48 70 50 66C52 70 56 70 60 66M40 76C44 80 48 80 50 76C52 80 56 80 60 76"/>
    <path d="M26 54C22 66 28 78 38 84M74 54C78 66 72 78 62 84"/>
    <circle class="g" cx="38" cy="42" r="10"/><circle class="g" cx="62" cy="42" r="10"/><circle class="v" cx="38" cy="42" r="4"/><circle class="v" cx="62" cy="42" r="4"/>
    <path class="v" d="M46 50L50 58L54 50Z"/>`,
  ufo: `<path d="M36 74L26 94M64 74L74 94"/>
    <path class="g" d="M32 46C32 30 40 22 50 22C60 22 68 30 68 46Z"/>
    <ellipse class="g" cx="50" cy="54" rx="42" ry="15"/>
    <path d="M40 38C42 32 46 30 50 30"/>
    <circle class="p" cx="20" cy="54" r="3"/><circle class="p" cx="36" cy="60" r="3"/><circle class="p" cx="50" cy="62" r="3"/><circle class="p" cx="64" cy="60" r="3"/><circle class="p" cx="80" cy="54" r="3"/>`,
  puma: `<path d="M24 52C8 54 4 40 12 28"/>
    <path d="M30 62L28 88M38 62L38 88M60 62L60 88M70 58L72 88M24 88L34 88M34 88L44 88M56 88L66 88M68 88L78 88"/>
    <path class="g" d="M22 52C22 44 32 40 44 40L66 40C74 40 76 48 74 54C72 60 64 62 56 62L34 62C26 62 22 58 22 52Z"/>
    <path class="g" d="M64 44L68 30L82 34L78 48Z"/>
    <circle class="g" cx="78" cy="30" r="13"/>
    <path class="g" d="M68 22L68 10L78 18M80 18L88 10L90 24"/>
    <circle class="p" cx="82" cy="28" r="2.2"/><circle class="p" cx="73" cy="28" r="2.2"/><path class="v" d="M76 34L80 34L78 37Z"/><path d="M78 37C78 40 74 41 72 39M78 37C78 40 82 41 84 39"/>`,
  kakadu: `<path class="g" d="M46 76L40 98L50 92L54 98L60 76"/>
    <path class="g" d="M38 42C30 58 34 74 46 82L62 82C70 68 68 50 62 42Z"/>
    <path d="M42 54C40 66 44 74 50 78"/>
    <path d="M10 82L90 82"/>
    <path class="g" d="M44 26L36 6L46 18L50 2L54 16L62 4L60 24"/>
    <circle class="g" cx="52" cy="32" r="14"/>
    <path class="g" d="M62 32C74 28 78 38 72 46C70 42 66 40 62 40Z"/>
    <circle class="p" cx="52" cy="29" r="2.4"/>`,
  hut: `<ellipse class="g" cx="50" cy="68" rx="44" ry="13"/>
    <path class="g" d="M26 68C26 42 34 26 50 26C66 26 74 42 74 68C62 74 38 74 26 68Z"/>
    <path class="v" d="M26.5 58C40 64 60 64 73.5 58L74 67C62 74 38 74 26 67Z"/>
    <path d="M40 27C44 32 56 32 60 27"/>`,
  bus: `<rect class="g" x="4" y="24" width="92" height="50" rx="7"/>
    <rect class="g" x="10" y="31" width="16" height="18" rx="2"/><rect class="g" x="30" y="31" width="16" height="18" rx="2"/>
    <rect class="g" x="50" y="31" width="14" height="40"/><path d="M57 31L57 71"/>
    <rect class="g" x="68" y="31" width="14" height="18" rx="2"/>
    <path d="M86 31L90 31L90 50L86 50"/>
    <path d="M4 60L50 60M64 60L96 60"/>
    <circle class="g" cx="24" cy="76" r="9"/><circle class="g" cx="76" cy="76" r="9"/>
    <circle class="p" cx="24" cy="76" r="2.4"/><circle class="p" cx="76" cy="76" r="2.4"/>`,
  tuba: `<path class="g" d="M54 36L54 24C44 20 34 12 30 2L70 2C66 12 60 20 60 24L60 36Z"/>
    <circle class="g" cx="54" cy="64" r="26"/><circle class="g" cx="54" cy="64" r="14"/>
    <path d="M28 62L12 50L8 55"/><circle class="g" cx="8" cy="52" r="4"/>
    <path d="M72 44L72 34M80 50L80 40M88 58L88 48"/><circle class="g" cx="72" cy="32" r="2.6"/><circle class="g" cx="80" cy="38" r="2.6"/><circle class="g" cx="88" cy="46" r="2.6"/>`,
  busch: `<path d="M44 80L42 90M56 80L58 90"/>
    <path class="g" d="M12 80C4 70 8 56 16 52C12 40 22 28 32 30C34 18 50 14 58 22C68 16 82 24 80 36C92 38 96 54 88 62C94 72 88 80 78 80Z"/>
    <path class="g" d="M20 62C20 54 28 52 32 56C32 62 26 66 20 62ZM40 44C40 36 48 34 52 38C52 44 46 48 40 44ZM62 52C62 44 70 42 74 46C74 52 68 56 62 52ZM42 68C42 60 50 58 54 62C54 68 48 72 42 68ZM68 70C68 64 74 62 78 66C78 70 72 74 68 70Z"/>
    <path d="M4 90L96 90"/>`,
  schulbus: `<path class="g" d="M4 22L70 22L70 40L96 44L96 74L4 74Z"/>
    <rect class="g" x="10" y="28" width="11" height="12"/><rect class="g" x="25" y="28" width="11" height="12"/><rect class="g" x="40" y="28" width="11" height="12"/><rect class="g" x="55" y="28" width="11" height="12"/>
    <path d="M70 40L70 56M80 46L80 56"/><path class="g" d="M72 44L90 47L90 54L72 54Z"/>
    <path class="v" d="M4 58L96 58L96 64L4 64Z"/>
    <circle class="p" cx="93" cy="52" r="0"/><circle class="g" cx="12" cy="18" r="4"/><circle class="g" cx="24" cy="18" r="4"/>
    <circle class="g" cx="24" cy="76" r="9"/><circle class="g" cx="78" cy="76" r="9"/><circle class="p" cx="24" cy="76" r="2.4"/><circle class="p" cx="78" cy="76" r="2.4"/>`,
  tschutschu: `<circle class="g" cx="24" cy="22" r="6"/><circle class="g" cx="36" cy="14" r="7"/><circle class="g" cx="50" cy="8" r="5"/>
    <path class="g" d="M16 52L16 40L11 32L31 32L26 40L26 52"/>
    <rect class="g" x="6" y="50" width="52" height="28" rx="14"/>
    <rect class="g" x="52" y="40" width="38" height="38" rx="5"/><circle class="g" cx="71" cy="56" r="8"/>
    <circle class="p" cx="18" cy="62" r="2.4"/><circle class="p" cx="34" cy="62" r="2.4"/><path d="M20 70C25 74 30 74 34 70"/>
    <circle class="g" cx="20" cy="82" r="9"/><circle class="g" cx="46" cy="82" r="9"/><circle class="g" cx="76" cy="82" r="9"/>
    <circle class="p" cx="20" cy="82" r="2"/><circle class="p" cx="46" cy="82" r="2"/><circle class="p" cx="76" cy="82" r="2"/>`,
  esel: `<path d="M20 48L12 62M10 60L14 70"/>
    <path d="M28 62L28 88M38 62L38 88M58 62L58 88M66 60L68 88"/>
    <path class="g" d="M20 48C20 40 30 38 40 38L64 38C70 38 72 44 72 50C72 58 66 62 58 62L32 62C24 62 20 56 20 48Z"/>
    <path class="g" d="M64 42C68 34 72 28 74 24L86 30C84 40 80 48 76 54Z"/>
    <path class="g" d="M72 24L68 4L80 18M80 20L86 4L90 24"/>
    <path class="g" d="M70 30C70 22 76 18 82 20L94 36C94 42 88 46 82 44C76 44 72 38 70 30Z"/>
    <circle class="p" cx="80" cy="27" r="2"/><circle class="p" cx="91" cy="38" r="1.8"/><path d="M68 40L72 32"/>`,
  amsel: `<path class="v" d="M26 54L4 66L8 74L30 64Z"/>
    <ellipse class="v" cx="46" cy="54" rx="26" ry="18"/>
    <circle class="v" cx="68" cy="34" r="13"/>
    <path class="g" d="M78 32L94 38L78 42Z"/>
    <circle class="g" cx="70" cy="31" r="4.5"/><circle class="p" cx="71" cy="31" r="1.8"/>
    <path d="M44 72L42 88M54 72L56 88M36 88L48 88M50 88L62 88"/>`,
  helm: `<path class="g" d="M10 66C10 36 30 20 52 20C76 20 92 40 92 66Z"/>
    <path class="g" d="M26 58C24 46 28 36 34 32C38 42 36 52 32 58Z"/>
    <path class="g" d="M46 56C44 42 46 32 52 28C56 38 56 48 52 56Z"/>
    <path class="g" d="M66 56C66 46 70 36 76 34C78 42 76 52 72 58Z"/>
    <path d="M4 66L96 66"/><path d="M30 66C30 80 44 84 50 76"/><rect class="g" x="46" y="72" width="8" height="8" rx="2"/>`,
  ofen: `<path d="M44 26L44 6M56 26L56 6M42 14L58 14"/>
    <rect class="g" x="22" y="32" width="56" height="54"/><rect class="g" x="16" y="26" width="68" height="8" rx="2"/>
    <rect class="g" x="32" y="44" width="36" height="30" rx="3"/>
    <path class="g" d="M50 66C44 66 44 60 48 56C48 60 52 60 52 56C56 60 56 66 50 66Z"/>
    <circle class="p" cx="62" cy="59" r="2"/><path d="M36 80L64 80M26 86L24 94M74 86L76 94"/>`,
  hasen: `<g transform="translate(39 2) scale(.6)"><path class="g" d="M60 36C54 18 56 4 63 5C70 6 70 22 70 36"/><path class="g" d="M72 34C74 18 80 8 85 10C90 14 84 28 80 40"/><circle class="g" cx="22" cy="72" r="6"/><ellipse class="g" cx="44" cy="68" rx="26" ry="20"/><ellipse class="g" cx="36" cy="88" rx="16" ry="5"/><path d="M62 76L64 86"/><ellipse class="g" cx="66" cy="89" rx="7" ry="3"/><circle class="g" cx="68" cy="46" r="15"/><circle class="p" cx="72" cy="43" r="2"/><circle class="v" cx="82" cy="48" r="2.2"/><path d="M82 50C80 54 76 54 74 52"/></g>
    <g transform="translate(2 36) scale(.6)"><path class="g" d="M60 36C54 18 56 4 63 5C70 6 70 22 70 36"/><path class="g" d="M72 34C74 18 80 8 85 10C90 14 84 28 80 40"/><circle class="g" cx="22" cy="72" r="6"/><ellipse class="g" cx="44" cy="68" rx="26" ry="20"/><ellipse class="g" cx="36" cy="88" rx="16" ry="5"/><path d="M62 76L64 86"/><ellipse class="g" cx="66" cy="89" rx="7" ry="3"/><circle class="g" cx="68" cy="46" r="15"/><circle class="p" cx="72" cy="43" r="2"/><circle class="v" cx="82" cy="48" r="2.2"/><path d="M82 50C80 54 76 54 74 52"/></g>`,
  hase: `<path class="g" d="M60 36C54 18 56 4 63 5C70 6 70 22 70 36"/><path class="g" d="M72 34C74 18 80 8 85 10C90 14 84 28 80 40"/>
    <circle class="g" cx="22" cy="72" r="6"/><ellipse class="g" cx="44" cy="68" rx="26" ry="20"/>
    <ellipse class="g" cx="36" cy="88" rx="16" ry="5"/><path d="M62 76L64 86"/><ellipse class="g" cx="66" cy="89" rx="7" ry="3"/>
    <circle class="g" cx="68" cy="46" r="15"/><circle class="p" cx="72" cy="43" r="2"/><circle class="v" cx="82" cy="48" r="2.2"/><path d="M82 50C80 54 76 54 74 52"/>`,
  ente: `<ellipse class="g" cx="44" cy="60" rx="34" ry="18"/>
    <path d="M12 56L5 46L20 52"/>
    <circle class="g" cx="74" cy="32" r="14"/><path class="g" d="M66 40C66 46 68 50 72 52L80 46C80 42 80 40 80 40Z"/>
    <path class="g" d="M86 30L98 35L86 40Z"/><circle class="p" cx="78" cy="28" r="2"/>
    <path d="M28 58C38 52 54 54 60 62C50 68 36 66 28 58Z"/>
    <path d="M4 80C12 76 20 84 28 80C36 76 44 84 52 80C60 76 68 84 76 80C84 76 92 84 98 80"/>`,
  kamel: `<path d="M26 66L26 92M36 66L36 92M60 66L60 92M70 66L72 92"/>
    <path class="g" d="M66 56C70 44 70 34 72 22L84 24C82 36 82 48 80 62Z"/>
    <path class="g" d="M14 62C14 56 20 54 24 54C24 38 28 28 34 28C40 28 44 38 44 52L50 52C50 38 54 28 60 28C66 28 70 38 70 52C78 52 80 58 80 64C80 70 74 72 68 72L26 72C18 72 14 68 14 62Z"/>
    <path class="g" d="M70 20C70 14 78 12 86 14L96 20C98 26 94 30 88 30L76 30C72 28 70 24 70 20Z"/>
    <circle class="p" cx="80" cy="19" r="2"/><circle class="p" cx="93" cy="22" r="1.6"/><path d="M14 60L8 72"/>`,
  tomate: `<path d="M50 30L50 18"/>
    <ellipse class="g" cx="50" cy="58" rx="36" ry="30"/>
    <path d="M28 54C28 46 32 42 38 40"/>
    <path class="g" d="M50 32L38 24L44 34L30 38L44 42L50 50L56 42L70 38L56 34L62 24Z"/>`,
  rakete: `<path class="g" d="M34 50L18 76L34 72M66 50L82 76L66 72"/>
    <path class="g" d="M50 4C64 16 68 40 66 66L34 66C32 40 36 16 50 4Z"/>
    <circle class="g" cx="50" cy="36" r="8"/>
    <path d="M34 52L66 52"/>
    <path class="g" d="M40 66L40 72L60 72L60 66"/>
    <path d="M42 76C44 86 50 92 50 98C50 92 56 86 58 76"/>`,
  banane: `<path class="g" d="M22 20L32 18C34 40 54 58 86 60L90 66L88 74C42 80 14 52 22 20Z"/>
    <path class="g" d="M22 20L24 8L32 8L32 18"/>
    <path class="v" d="M86 60L92 62L90 72L86 70Z"/>
    <path d="M30 30C32 50 52 66 82 68"/>`,
  zebra: `<path class="v" d="M20 44L10 58L16 62L22 54Z"/>
    <path d="M28 60L28 88M38 60L38 88M56 60L56 88M64 58L66 88"/>
    <path class="v" d="M26 84L31 84L31 91L26 91ZM36 84L41 84L41 91L36 91ZM54 84L59 84L59 91L54 91ZM64 84L69 84L69 91L64 91Z"/>
    <path class="g" d="M20 46C20 38 30 36 40 36L62 36C68 36 70 42 70 48C70 56 64 60 56 60L32 60C24 60 20 54 20 46Z"/>
    <path class="v" d="M30 36L36 36L34 59L27 58ZM42 36L48 36L47 60L40 60ZM54 36L60 36L61 59L54 60Z"/>
    <path class="g" d="M62 38C66 28 70 24 74 20L84 28C80 36 76 44 74 50Z"/>
    <path class="v" d="M66 34L72 36L70 42L65 40ZM70 24L76 26L74 32L69 30Z"/>
    <path class="g" d="M72 18C72 12 78 10 84 12L96 24C96 30 90 32 86 30C78 28 74 24 72 18Z"/>
    <path class="g" d="M74 12L72 3L80 10Z"/>
    <path class="v" d="M80 12L84 12L86 20L82 22Z"/><circle class="p" cx="78" cy="19" r="1.8"/><circle class="v" cx="92" cy="26" r="1.8"/>
    <path class="v" d="M62 36L66 22L70 20L68 32Z"/>`,
  wolke: `<path class="g" d="M24 76C8 76 6 54 24 52C22 36 42 26 52 40C58 28 80 32 80 48C96 46 98 76 80 76Z"/>
    <path d="M30 62C32 56 38 54 42 56M56 52C60 50 66 50 68 54"/>`,
  tasche: `<path d="M30 40C28 10 72 10 70 40"/>
    <rect class="g" x="14" y="38" width="72" height="50" rx="7"/>
    <path class="g" d="M14 44C14 40 18 38 22 38L78 38C82 38 86 40 86 44L86 58C70 70 30 70 14 58Z"/>
    <circle class="g" cx="50" cy="64" r="4.5"/><path d="M20 82L80 82"/>`,
  muschel: `<path class="g" d="M16 54C8 40 18 24 30 22C34 14 44 12 50 14C56 12 66 14 70 22C82 24 92 40 84 54L50 86Z"/>
    <path d="M50 86L28 26M50 86L38 18M50 86L50 14M50 86L62 18M50 86L72 26M50 86L20 40M50 86L80 40"/>
    <path class="g" d="M38 84L62 84L68 92L32 92Z"/>`,
  welpe: `<path class="g" d="M72 86C84 84 88 76 86 64"/>
    <path class="g" d="M30 56C22 70 24 88 32 92L68 92C76 88 78 70 70 56Z"/>
    <path d="M42 72L42 92M58 72L58 92"/>
    <path class="g" d="M30 22C14 22 12 46 22 52C30 46 34 34 30 22Z"/><path class="g" d="M70 22C86 22 88 46 78 52C70 46 66 34 70 22Z"/>
    <circle class="g" cx="50" cy="36" r="22"/>
    <circle class="p" cx="41" cy="32" r="2.6"/><circle class="p" cx="59" cy="32" r="2.6"/>
    <ellipse class="v" cx="50" cy="42" rx="4.5" ry="3"/><path d="M50 45L50 48M43 50C47 54 53 54 57 50"/>
    <path class="g" d="M48 52C48 59 52 59 52 52"/>`,
  'käse': `<path class="g" d="M6 62L64 38L92 28L34 52Z"/>
    <path class="g" d="M6 62L64 38L64 82L6 82Z"/>
    <path class="g" d="M64 38L92 28L92 70L64 82Z"/>
    <ellipse cx="54" cy="42" rx="5" ry="2.2" transform="rotate(-22 54 42)"/><circle cx="22" cy="74" r="4"/><circle cx="46" cy="64" r="5.5"/><circle cx="52" cy="76" r="2.6"/><circle cx="78" cy="58" r="4.5"/>`,
  'säge': `<path class="g" d="M28 34L96 34L96 42L89 42L87 46L81 44L79 49L73 46L71 51L65 48L63 53L57 50L55 55L49 52L47 57L41 54L39 59L33 56L31 61L28 60Z"/>
    <path class="g" d="M28 34L12 30C4 30 4 52 10 62L28 62"/>
    <ellipse class="g" cx="17" cy="46" rx="4" ry="9"/>`,
  'bären': `<g transform="translate(39 2) scale(.6)"><circle class="g" cx="30" cy="20" r="9"/><circle class="g" cx="70" cy="20" r="9"/><ellipse class="g" cx="50" cy="72" rx="24" ry="22"/><ellipse class="g" cx="34" cy="92" rx="10" ry="5"/><ellipse class="g" cx="66" cy="92" rx="10" ry="5"/><path d="M28 62C22 70 24 78 30 82M72 62C78 70 76 78 70 82"/><circle class="g" cx="50" cy="38" r="22"/><ellipse class="g" cx="50" cy="46" rx="10" ry="8"/><ellipse class="v" cx="50" cy="43" rx="3.6" ry="2.6"/><path d="M50 46L50 50M45 52C48 54 52 54 55 52"/><circle class="p" cx="41" cy="34" r="2.4"/><circle class="p" cx="59" cy="34" r="2.4"/></g>
    <g transform="translate(2 36) scale(.6)"><circle class="g" cx="30" cy="20" r="9"/><circle class="g" cx="70" cy="20" r="9"/><ellipse class="g" cx="50" cy="72" rx="24" ry="22"/><ellipse class="g" cx="34" cy="92" rx="10" ry="5"/><ellipse class="g" cx="66" cy="92" rx="10" ry="5"/><path d="M28 62C22 70 24 78 30 82M72 62C78 70 76 78 70 82"/><circle class="g" cx="50" cy="38" r="22"/><ellipse class="g" cx="50" cy="46" rx="10" ry="8"/><ellipse class="v" cx="50" cy="43" rx="3.6" ry="2.6"/><path d="M50 46L50 50M45 52C48 54 52 54 55 52"/><circle class="p" cx="41" cy="34" r="2.4"/><circle class="p" cx="59" cy="34" r="2.4"/></g>`,
  'äste': `<path d="M6 84L90 18M10 92L94 34M4 70L82 10"/>
    <path d="M70 26L68 12M80 21L92 20M30 70L24 58M60 56L70 62M20 80L12 74"/>
    <path class="v" d="M41 41L45 38L63 60L59 63Z"/>`,
  'gänse': `<g transform="translate(39 2) scale(.6)"><path class="g" d="M16 56L6 52L18 62"/><path class="g" d="M58 52C62 44 66 36 66 26L76 26C76 38 74 46 72 54Z"/><path class="g" d="M16 58C16 48 30 44 46 46C60 48 70 52 72 60C72 72 60 78 44 78C28 76 16 70 16 58Z"/><path d="M38 78L36 90M52 78L54 90M28 90L40 90M48 90L60 90M30 58C40 52 52 56 58 64"/><circle class="g" cx="72" cy="22" r="9"/><path class="g" d="M80 20L94 25L80 30Z"/><circle class="p" cx="74" cy="20" r="1.8"/></g>
    <g transform="translate(2 36) scale(.6)"><path class="g" d="M16 56L6 52L18 62"/><path class="g" d="M58 52C62 44 66 36 66 26L76 26C76 38 74 46 72 54Z"/><path class="g" d="M16 58C16 48 30 44 46 46C60 48 70 52 72 60C72 72 60 78 44 78C28 76 16 70 16 58Z"/><path d="M38 78L36 90M52 78L54 90M28 90L40 90M48 90L60 90M30 58C40 52 52 56 58 64"/><circle class="g" cx="72" cy="22" r="9"/><path class="g" d="M80 20L94 25L80 30Z"/><circle class="p" cx="74" cy="20" r="1.8"/></g>`,
  'schwäne': `<g transform="translate(39 2) scale(.6)"><path class="g" d="M58 56C68 56 72 48 66 40C60 32 62 20 72 16L80 20C74 24 74 30 78 36C86 46 82 60 66 62Z"/><ellipse class="g" cx="44" cy="68" rx="32" ry="15"/><path d="M14 60L6 50L18 58M26 64C38 56 52 58 58 66"/><path class="g" d="M72 16C72 10 78 8 82 12L82 18Z"/><path class="g" d="M80 12L94 17L80 20Z"/><circle class="p" cx="77" cy="14" r="1.8"/><path d="M4 86C12 82 20 90 28 86C36 82 44 90 52 86C60 82 68 90 76 86C84 82 92 90 98 86"/></g>
    <g transform="translate(2 36) scale(.6)"><path class="g" d="M58 56C68 56 72 48 66 40C60 32 62 20 72 16L80 20C74 24 74 30 78 36C86 46 82 60 66 62Z"/><ellipse class="g" cx="44" cy="68" rx="32" ry="15"/><path d="M14 60L6 50L18 58M26 64C38 56 52 58 58 66"/><path class="g" d="M72 16C72 10 78 8 82 12L82 18Z"/><path class="g" d="M80 12L94 17L80 20Z"/><circle class="p" cx="77" cy="14" r="1.8"/><path d="M4 86C12 82 20 90 28 86C36 82 44 90 52 86C60 82 68 90 76 86C84 82 92 90 98 86"/></g>`,
  'kapitän': `<path class="g" d="M26 96L28 66C30 60 38 58 50 58C62 58 70 60 72 66L74 96Z"/>
    <path d="M27 72L73 72M26 80L74 80M26 88L74 88"/>
    <path class="v" d="M42 58L50 68L58 58Z"/>
    <circle class="g" cx="50" cy="46" r="13"/>
    <path class="g" d="M31 36C29 16 40 6 50 6C60 6 71 16 69 36Z"/>
    <path class="v" d="M31 30L69 30L69 37L31 37Z"/>
    <circle class="p" cx="50" cy="18" r="2.6"/>
    <circle class="p" cx="45" cy="47" r="1.8"/><circle class="p" cx="55" cy="47" r="1.8"/><path d="M44 53C47 57 53 57 56 53"/>`,
  'hände': `<g transform="translate(22 32) scale(.85)"><path class="g" d="M-18 14L-18 -4C-18 -9 -10 -9 -10 -4L-10 14"/><path class="g" d="M-9 14L-9 -16C-9 -21 -1 -21 -1 -16L-1 14"/><path class="g" d="M0 14L0 -24C0 -29 8 -29 8 -24L8 14"/><path class="g" d="M9 14L9 -14C9 -19 17 -19 17 -14L17 14"/><path class="g" d="M-18 14L18 14L18 36C18 50 8 56 0 56C-8 56 -18 50 -18 36Z"/><path class="g" d="M18 38C28 34 32 26 28 20C24 20 20 26 18 30"/></g>
    <g transform="translate(78 32) scale(-.85 .85)"><path class="g" d="M-18 14L-18 -4C-18 -9 -10 -9 -10 -4L-10 14"/><path class="g" d="M-9 14L-9 -16C-9 -21 -1 -21 -1 -16L-1 14"/><path class="g" d="M0 14L0 -24C0 -29 8 -29 8 -24L8 14"/><path class="g" d="M9 14L9 -14C9 -19 17 -19 17 -14L17 14"/><path class="g" d="M-18 14L18 14L18 36C18 50 8 56 0 56C-8 56 -18 50 -18 36Z"/><path class="g" d="M18 38C28 34 32 26 28 20C24 20 20 26 18 30"/></g>`,
  'nägel': `<g transform="translate(24 10) rotate(-10)"><path class="g" d="M-3 8L-3 70L0 84L3 70L3 8Z"/><ellipse class="g" cx="0" cy="8" rx="11" ry="4"/></g>
    <g transform="translate(50 6)"><path class="g" d="M-3 8L-3 70L0 84L3 70L3 8Z"/><ellipse class="g" cx="0" cy="8" rx="11" ry="4"/></g>
    <g transform="translate(76 10) rotate(10)"><path class="g" d="M-3 8L-3 70L0 84L3 70L3 8Z"/><ellipse class="g" cx="0" cy="8" rx="11" ry="4"/></g>`,
  'wäsche': `<path class="g" d="M62 38L80 22L88 30L72 46Z"/>
    <path class="g" d="M30 42L30 20L40 20L40 30L48 36C46 44 40 46 34 46Z"/>
    <path class="g" d="M18 54C12 40 28 32 36 38C40 28 56 28 60 38C70 30 86 40 82 54Z"/>
    <path class="g" d="M12 54L20 92L80 92L88 54Z"/>
    <path d="M16 68L84 68M18 80L82 80M34 54L36 92M50 54L50 92M66 54L64 92"/>`,
  'löwe': `<circle class="g" cx="80" cy="50" r="10"/><circle class="g" cx="74" cy="68" r="10"/><circle class="g" cx="59" cy="79" r="10"/><circle class="g" cx="41" cy="79" r="10"/><circle class="g" cx="26" cy="68" r="10"/><circle class="g" cx="20" cy="50" r="10"/><circle class="g" cx="26" cy="32" r="10"/><circle class="g" cx="41" cy="21" r="10"/><circle class="g" cx="59" cy="21" r="10"/><circle class="g" cx="74" cy="32" r="10"/>
    <circle class="g" cx="50" cy="50" r="24"/>
    <circle class="g" cx="34" cy="30" r="6"/><circle class="g" cx="66" cy="30" r="6"/>
    <circle class="p" cx="41" cy="45" r="2.4"/><circle class="p" cx="59" cy="45" r="2.4"/>
    <ellipse class="g" cx="50" cy="60" rx="11" ry="8"/><path class="v" d="M46 54L54 54L50 59Z"/><path d="M50 59L50 63M50 63C48 67 44 67 42 64M50 63C52 67 56 67 58 64"/>`,
  'möwe': `<path d="M46 68L46 88M56 68L58 88M38 88L50 88M52 88L64 88"/>
    <path class="g" d="M16 56C16 46 30 40 46 42C60 44 70 48 72 56C68 66 54 70 40 68C28 66 16 64 16 56Z"/>
    <path class="g" d="M62 48C66 42 68 38 70 34L80 38C78 44 76 50 74 54Z"/>
    <circle class="g" cx="74" cy="32" r="10"/><path class="g" d="M82 30L96 35L82 38Z"/><circle class="p" cx="76" cy="30" r="1.8"/>
    <path class="g" d="M62 52C46 46 28 52 6 66C28 64 46 64 62 60Z"/>
    <path class="v" d="M6 66L18 59L22 64Z"/>`,
  'königin': `<path class="v" d="M36 28C28 44 30 60 38 68L44 56Z"/><path class="v" d="M64 28C72 44 70 60 62 68L56 56Z"/>
    <path class="g" d="M42 50C40 62 36 78 24 96L76 96C64 78 60 62 58 50Z"/>
    <path d="M42 62L58 62M33 84L67 84"/>
    <circle class="g" cx="50" cy="36" r="13"/>
    <path class="g" d="M36 26L38 10L44 18L50 8L56 18L62 10L64 26Z"/>
    <circle class="p" cx="50" cy="15" r="1.8"/>
    <circle class="p" cx="45" cy="37" r="1.8"/><circle class="p" cx="55" cy="37" r="1.8"/><path d="M45 43C48 46 52 46 55 43"/>
    <circle class="p" cx="46" cy="53" r="1.4"/><circle class="p" cx="50" cy="55" r="1.4"/><circle class="p" cx="54" cy="53" r="1.4"/>`,
  'flöte': `<g transform="rotate(-28 50 50)"><rect class="g" x="8" y="42" width="86" height="14" rx="4"/>
    <path class="g" d="M8 42L-2 46L8 56"/><path d="M26 42L26 56M88 42L88 56"/>
    <circle class="g" cx="40" cy="49" r="3.2"/><circle class="g" cx="50" cy="49" r="3.2"/><circle class="g" cx="60" cy="49" r="3.2"/><circle class="g" cx="70" cy="49" r="3.2"/><circle class="g" cx="80" cy="49" r="3.2"/></g>`,
  'kröte': `<path class="g" d="M20 66C8 72 12 88 24 88L38 88L36 74Z"/><path class="g" d="M80 66C92 72 88 88 76 88L62 88L64 74Z"/>
    <ellipse class="g" cx="50" cy="62" rx="36" ry="24"/>
    <path d="M30 84L22 92M28 90L36 92M70 84L78 92M72 90L64 92"/>
    <circle class="g" cx="36" cy="38" r="10"/><circle class="g" cx="64" cy="38" r="10"/><circle class="p" cx="37" cy="38" r="3"/><circle class="p" cx="63" cy="38" r="3"/>
    <path d="M22 62C36 74 64 74 78 62"/>
    <circle class="p" cx="30" cy="54" r="2"/><circle class="p" cx="44" cy="50" r="2"/><circle class="p" cx="58" cy="52" r="2"/><circle class="p" cx="70" cy="56" r="2"/><circle class="p" cx="38" cy="66" r="1.6"/><circle class="p" cx="62" cy="67" r="1.6"/>`,
  'wölfe': `<g transform="translate(39 2) scale(.6)"><path class="g" d="M26 90C10 90 4 80 6 70C14 76 22 76 32 74Z"/><ellipse class="g" cx="40" cy="74" rx="20" ry="17"/><path class="g" d="M44 90C40 70 44 46 56 38L72 42C72 58 70 76 66 90Z"/><path d="M58 90L58 76M68 90L66 76M54 90L62 90M64 90L72 90"/><path class="g" d="M56 40C54 30 60 22 68 22C76 22 84 28 96 36L90 44C84 46 76 46 68 46C62 46 58 44 56 40Z"/><path class="g" d="M60 24L60 8L68 20M70 21L74 6L78 24"/><circle class="p" cx="72" cy="33" r="2"/><circle class="v" cx="95" cy="37" r="2.4"/><path d="M70 44L90 42"/><path d="M56 46L50 54L58 54"/></g>
    <g transform="translate(2 36) scale(.6)"><path class="g" d="M26 90C10 90 4 80 6 70C14 76 22 76 32 74Z"/><ellipse class="g" cx="40" cy="74" rx="20" ry="17"/><path class="g" d="M44 90C40 70 44 46 56 38L72 42C72 58 70 76 66 90Z"/><path d="M58 90L58 76M68 90L66 76M54 90L62 90M64 90L72 90"/><path class="g" d="M56 40C54 30 60 22 68 22C76 22 84 28 96 36L90 44C84 46 76 46 68 46C62 46 58 44 56 40Z"/><path class="g" d="M60 24L60 8L68 20M70 21L74 6L78 24"/><circle class="p" cx="72" cy="33" r="2"/><circle class="v" cx="95" cy="37" r="2.4"/><path d="M70 44L90 42"/><path d="M56 46L50 54L58 54"/></g>`,
  'körbe': `<g transform="translate(39 2) scale(.6)"><path d="M22 48C22 10 78 10 78 48"/><path class="g" d="M10 46L90 46L80 90L20 90Z"/><path d="M14 58L86 58M17 70L83 70M30 46L28 90M50 46L50 90M70 46L72 90"/></g>
    <g transform="translate(2 36) scale(.6)"><path d="M22 48C22 10 78 10 78 48"/><path class="g" d="M10 46L90 46L80 90L20 90Z"/><path d="M14 58L86 58M17 70L83 70M30 46L28 90M50 46L50 90M70 46L72 90"/></g>`,
  'könige': `<g transform="translate(39 2) scale(.6)"><path class="g" d="M34 64C26 72 26 86 24 96L76 96C74 86 74 72 66 64C60 68 40 68 34 64Z"/><circle class="p" cx="38" cy="74" r="2"/><circle class="p" cx="46" cy="80" r="2"/><circle class="p" cx="54" cy="80" r="2"/><circle class="p" cx="62" cy="74" r="2"/><circle class="g" cx="50" cy="38" r="13"/><path class="g" d="M37 42C36 60 44 66 50 66C56 66 64 60 63 42C58 50 42 50 37 42Z"/><path d="M42 44C46 42 50 44 50 46C50 44 54 42 58 44"/><path class="g" d="M34 26L36 10L43 18L50 8L57 18L64 10L66 26Z"/><circle class="p" cx="45" cy="38" r="1.8"/><circle class="p" cx="55" cy="38" r="1.8"/></g>
    <g transform="translate(2 36) scale(.6)"><path class="g" d="M34 64C26 72 26 86 24 96L76 96C74 86 74 72 66 64C60 68 40 68 34 64Z"/><circle class="p" cx="38" cy="74" r="2"/><circle class="p" cx="46" cy="80" r="2"/><circle class="p" cx="54" cy="80" r="2"/><circle class="p" cx="62" cy="74" r="2"/><circle class="g" cx="50" cy="38" r="13"/><path class="g" d="M37 42C36 60 44 66 50 66C56 66 64 60 63 42C58 50 42 50 37 42Z"/><path d="M42 44C46 42 50 44 50 46C50 44 54 42 58 44"/><path class="g" d="M34 26L36 10L43 18L50 8L57 18L64 10L66 26Z"/><circle class="p" cx="45" cy="38" r="1.8"/><circle class="p" cx="55" cy="38" r="1.8"/></g>`,
  'regenbögen': `<g transform="translate(39 2) scale(.6)"><path d="M8 80C8 40 30 22 50 22C70 22 92 40 92 80M20 80C20 48 34 34 50 34C66 34 80 48 80 80M32 80C32 56 40 46 50 46C60 46 68 56 68 80"/><path class="g" d="M8 86C4 86 4 74 12 74C14 68 22 68 24 74C30 74 30 86 24 86Z"/><path class="g" d="M76 86C72 86 72 74 80 74C82 68 90 68 92 74C98 74 98 86 92 86Z"/></g>
    <g transform="translate(2 36) scale(.6)"><path d="M8 80C8 40 30 22 50 22C70 22 92 40 92 80M20 80C20 48 34 34 50 34C66 34 80 48 80 80M32 80C32 56 40 46 50 46C60 46 68 56 68 80"/><path class="g" d="M8 86C4 86 4 74 12 74C14 68 22 68 24 74C30 74 30 86 24 86Z"/><path class="g" d="M76 86C72 86 72 74 80 74C82 68 90 68 92 74C98 74 98 86 92 86Z"/></g>`,
  'hüte': `<g transform="translate(0 -8)"><ellipse class="g" cx="50" cy="88" rx="42" ry="8"/><path class="g" d="M22 88C22 72 32 66 50 66C68 66 78 72 78 88C64 94 36 94 22 88Z"/><path class="v" d="M22.5 82C40 88 60 88 77.5 82L78 88C64 94 36 94 22 88Z"/>
    <ellipse class="g" cx="50" cy="66" rx="32" ry="6"/><path class="g" d="M28 66C28 54 36 48 50 48C64 48 72 54 72 66C62 71 38 71 28 66Z"/><path class="v" d="M28.5 61C40 66 60 66 71.5 61L72 66C62 71 38 71 28 66Z"/>
    <ellipse class="g" cx="50" cy="48" rx="24" ry="5"/><path class="g" d="M32 48C32 38 38 32 50 32C62 32 68 38 68 48C60 52 40 52 32 48Z"/><path class="v" d="M32.5 44C42 48 58 48 67.5 44L68 48C60 52 40 52 32 48Z"/></g>`,
  'tüte': `<path d="M32 38C30 6 70 6 68 38"/><path d="M40 38C40 18 60 18 60 38"/>
    <path class="g" d="M22 36L78 36L84 92L16 92Z"/>
    <path d="M22 36L36 50L64 50L78 36M36 50L34 92M64 50L66 92"/>`
});
