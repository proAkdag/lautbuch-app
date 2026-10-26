(() => {
  'use strict';
  const KIND = `<circle class="g" cx="50" cy="20" r="11"/>
    <path class="v" d="M40 15C41 9 46 7 50 7C55 7 59 9 60 15C57 12 54 13 51 11C48 13 44 12 40 15Z"/><path d="M50 7C48 4 50 2 53 3"/>
    <circle class="p" cx="46" cy="21" r="1.5"/><circle class="p" cx="54" cy="21" r="1.5"/><path d="M46 25Q50 28 54 25"/>
    <path d="M38 38L30 56M62 38L70 56"/><circle class="g" cx="30" cy="57" r="3"/><circle class="g" cx="70" cy="57" r="3"/>
    <path class="g" d="M38 34Q50 30 62 34L62 50L38 50Z"/>
    <path class="g" d="M40 42H60V56H63L61 88H52L50 66L48 88H39L37 56H40Z"/>
    <path d="M40 42L38 34M60 42L62 34M45 46H55V52H45Z"/>
    <path class="v" d="M38 88H49V92H35Z"/><path class="v" d="M51 88H62L65 92H51Z"/>`;
  const kind = (t) => `<g transform="${t}">${KIND}</g>`;
  const H = {
    malt: `<path d="M18 84L56 46"/><path class="g" d="M54 42L62 50L58 54L50 46Z"/><path class="v" d="M60 44L74 30C80 24 88 30 82 36L68 50Z"/>
      <path d="M30 94C42 86 54 96 66 88C74 83 82 86 88 90"/>`,
    rosa: `<path d="M18 74L52 40"/><path class="g" d="M50 36L58 44L54 48L46 40Z"/><path class="v" d="M56 38L70 24C76 18 84 24 78 30L64 44Z"/>
      <path class="f-rosa" d="M20 86C24 76 40 78 46 84C54 76 72 80 70 90C66 98 46 96 38 94C30 98 16 94 20 86Z"/>`,
    lila: `<path d="M18 74L52 40"/><path class="g" d="M50 36L58 44L54 48L46 40Z"/><path class="v" d="M56 38L70 24C76 18 84 24 78 30L64 44Z"/>
      <path class="f-lila" d="M20 86C24 76 40 78 46 84C54 76 72 80 70 90C66 98 46 96 38 94C30 98 16 94 20 86Z"/>`,
    fuettert: `<path class="g" d="M14 62H66C66 80 54 90 40 90C26 90 14 80 14 62Z"/><path d="M22 62C26 56 34 56 38 60C42 54 52 54 56 62"/>
      <path d="M56 50L88 18"/><ellipse class="g" cx="52" cy="54" rx="9" ry="6" transform="rotate(-45 52 54)"/>`,
    tanzt: `<circle class="g" cx="50" cy="16" r="8"/><path d="M50 24L48 52M48 34L30 22M48 34L70 24M48 52L34 74L40 88M48 52L66 64L82 56"/>
      <path d="M20 40C14 50 14 60 20 70M82 34C90 42 92 52 88 60"/>`,
    klatscht: `<path class="g" d="M30 86L22 50C20 42 28 40 30 46L34 30C36 24 42 26 42 32L44 26C46 20 52 22 52 28L54 50L48 86Z"/>
      <path class="g" d="M70 86L78 50C80 42 72 40 70 46L66 30C64 24 58 26 58 32L56 26C54 20 48 22 48 28L46 50L52 86Z"/>
      <path d="M50 16V6M36 18L30 10M64 18L70 10"/>`,
    nascht: `<path d="M50 52V94"/><circle class="g" cx="50" cy="32" r="22"/><path d="M50 32C50 26 58 26 58 32C58 40 44 40 44 32C44 22 62 22 62 32C62 44 40 46 38 32"/>`,
    frisst: `<path d="M30 8V36C30 42 34 46 38 46V92M22 8V30M38 8V30M46 8V36C46 42 42 46 38 46"/>
      <path class="g" d="M66 92V54C58 50 56 36 58 24C60 14 64 8 70 8V92Z"/>`,
    steht: `<path d="M8 90H92"/><path d="M40 20V74M60 20V74"/><path class="v" d="M28 74H42V88H24C24 80 26 76 28 74Z"/><path class="v" d="M72 74H58V88H76C76 80 74 76 72 74Z"/>`,
    filmt: `<path class="g" d="M14 40H66V80H14Z"/><path class="g" d="M66 50L90 38V82L66 70Z"/><circle class="g" cx="26" cy="26" r="12"/><circle class="g" cx="54" cy="26" r="12"/>
      <circle cx="26" cy="26" r="3"/><circle cx="54" cy="26" r="3"/><circle class="v" cx="24" cy="50" r="3"/>`,
    fischt: `<path d="M10 92L58 14"/><path d="M58 14C70 20 76 34 76 50"/><path d="M76 50V58C76 64 70 64 70 58"/>
      <path class="g" d="M48 78C56 68 72 68 80 78C72 88 56 88 48 78Z"/><path class="g" d="M80 78L92 70V86Z"/><circle class="p" cx="56" cy="76" r="1.8"/>`,
    staunt: `<circle class="g" cx="50" cy="54" r="30"/><circle class="g" cx="38" cy="46" r="7"/><circle class="g" cx="62" cy="46" r="7"/>
      <circle class="p" cx="38" cy="46" r="3"/><circle class="p" cx="62" cy="46" r="3"/><ellipse class="v" cx="50" cy="68" rx="6" ry="8"/>
      <path d="M14 14L18 22L26 26L18 30L14 38L10 30L2 26L10 22Z" class="g"/><path d="M84 10L87 16L93 19L87 22L84 28L81 22L75 19L81 16Z" class="g"/>`,
    hopst: `<path d="M8 86C14 50 30 50 36 86C40 56 52 56 56 86C58 66 66 66 68 86" stroke-dasharray="4 6"/><path d="M4 88H96"/>
      <circle class="g" cx="80" cy="74" r="12"/><path d="M72 66C78 70 82 70 88 66"/>`,
    schlaeft: `<path class="g" d="M62 10C42 12 28 30 30 50C32 72 52 88 74 84C54 78 44 60 48 42C51 28 58 18 62 10Z"/>
      <path d="M58 50C62 54 66 54 70 50M74 62C78 66 82 66 86 62"/>
      <path class="g" d="M80 14L82 20L88 22L82 24L80 30L78 24L72 22L78 20Z"/><path class="g" d="M90 36L91 40L95 41L91 42L90 46L89 42L85 41L89 40Z"/>`,
    sitzt: `<path class="g" d="M26 54H74V62H26Z"/><path d="M30 62V92M70 62V92M30 54V12H70V54"/><path d="M30 26H70M30 40H70"/>`,
    turnt: `<path d="M30 4V44M70 4V44"/><circle class="g" cx="30" cy="54" r="11"/><circle class="g" cx="70" cy="54" r="11"/>
      <path d="M12 88C24 82 36 82 50 88C64 94 76 94 88 88"/>`,
    liest: `<circle class="g" cx="32" cy="28" r="14"/><circle class="g" cx="68" cy="28" r="14"/><path d="M46 28H54M18 28L8 22M82 28L92 22"/>
      <path class="g" d="M16 54H84V92H16Z"/><path d="M26 64H74M26 73H66M26 82H72"/>`,
    badet: `<path class="g" d="M8 56H92C92 76 78 86 50 86C22 86 8 76 8 56Z"/><path d="M22 86L18 94M78 86L82 94M78 56V20C78 12 88 12 88 20"/>
      <circle class="g" cx="30" cy="46" r="8"/><circle class="g" cx="46" cy="40" r="10"/><circle class="g" cx="62" cy="47" r="7"/><circle class="g" cx="54" cy="26" r="5"/>`,
    kuschelt: `<path class="f-rosa" d="M50 86C30 72 12 58 12 40C12 28 22 20 32 20C40 20 46 26 50 32C54 26 60 20 68 20C78 20 88 28 88 40C88 58 70 72 50 86Z"/>
      <path d="M4 52C4 30 20 10 40 8M96 52C96 30 80 10 60 8"/>`,
    bindet: `<path d="M50 4V96"/><path class="g" d="M50 46C38 30 18 32 18 46C18 60 38 62 50 46Z"/><path class="g" d="M50 46C62 30 82 32 82 46C82 60 62 62 50 46Z"/>
      <path d="M50 46L36 84M50 46L66 86"/><circle class="v" cx="50" cy="46" r="5"/>`,
    wirft: `<path d="M10 86C24 40 60 20 82 30" stroke-dasharray="5 6"/><circle class="g" cx="82" cy="30" r="12"/><path d="M72 30C78 26 86 26 92 30M82 18C78 24 78 36 82 42"/>
      <path d="M58 10L66 16M50 18L60 22"/>`,
    troetet: `<path class="g" d="M10 44H38L76 22V82L38 60H10Z"/><path d="M38 44V60"/><path d="M84 36C90 44 90 60 84 68M92 28C100 40 100 64 92 76"/>`,
    floetet: `<path class="g" d="M16 86L64 38L72 46L24 94Z"/><circle class="v" cx="36" cy="72" r="2.6"/><circle class="v" cx="44" cy="64" r="2.6"/><circle class="v" cx="52" cy="56" r="2.6"/>
      <path d="M70 18V6L84 2V14"/><ellipse class="v" cx="66" cy="18" rx="5" ry="4"/><ellipse class="v" cx="80" cy="14" rx="5" ry="4"/>`,
    radelt: `<circle class="g" cx="24" cy="66" r="18"/><circle class="g" cx="76" cy="66" r="18"/><path d="M24 66L42 40H70L76 66M42 40L52 66H24M52 66L70 40M40 30H48M66 28L70 40L80 32"/>`,
    traegt: `<path d="M50 14C50 6 60 6 60 14C60 20 50 22 50 28"/><path class="g" d="M50 28L10 60C6 64 8 68 14 68H86C92 68 94 64 90 60Z"/>
      <path d="M18 68L14 90H86L82 68"/>`,
    rast: `<path class="g" d="M58 42C58 30 76 28 80 38C92 36 96 52 86 56C88 66 74 70 68 62C60 68 50 60 54 52C46 50 48 40 58 42Z"/>
      <path d="M6 40H40M14 54H44M4 68H36"/>`,
    teilen: `<path class="g" d="M46 20A34 34 0 0 0 46 88Z"/><path class="g" d="M56 20A34 34 0 0 1 56 88Z"/>
      <path d="M26 44C30 38 38 38 40 44M62 44C66 38 74 38 78 44"/>`,
    baut: `<path class="g" d="M14 62H44V92H14Z"/><path class="g" d="M48 62H78V92H48Z"/><path class="g" d="M30 30H60V60H30Z"/>
      <path d="M70 8L86 24M82 6L90 14L76 28L68 20Z"/>`,
    zaubert: `<path class="v" d="M18 90L66 42L72 48L24 96Z"/><path class="g" d="M70 44L76 50"/>
      <path class="g" d="M74 8L78 20L90 24L78 28L74 40L70 28L58 24L70 20Z"/><path class="g" d="M90 46L92 52L98 54L92 56L90 62L88 56L82 54L88 52Z"/>
      <path class="g" d="M48 14L50 19L55 21L50 23L48 28L46 23L41 21L46 19Z"/>`,
    schaut: `<path class="g" d="M6 52C20 30 36 22 50 22C64 22 80 30 94 52C80 74 64 82 50 82C36 82 20 74 6 52Z"/><circle class="g" cx="50" cy="52" r="16"/>
      <circle class="v" cx="50" cy="52" r="8"/><circle cx="46" cy="48" r="2" fill="#fff" stroke="none"/>`,
    raeumt: `<path class="g" d="M14 42H62V90H14Z"/><path d="M14 42L4 26M62 42L72 26"/>
      <path class="g" d="M74 20C80 14 90 18 88 26C86 32 76 32 74 26Z"/><path class="g" d="M84 46H96V58H84Z"/><circle class="g" cx="80" cy="76" r="6"/>
      <path d="M64 38L74 32M66 50L80 52M64 64L74 72"/>`,
    laeutet: `<path class="g" d="M50 14C32 14 24 30 24 50C24 62 18 70 14 74H86C82 70 76 62 76 50C76 30 68 14 50 14Z"/>
      <path d="M50 14V6"/><circle class="v" cx="50" cy="82" r="6"/><path d="M8 34C4 42 4 52 8 60M92 34C96 42 96 52 92 60"/>`,
    heult: `<circle class="g" cx="50" cy="50" r="34"/><path d="M34 42C36 46 40 46 42 42M58 42C60 46 64 46 66 42"/><path d="M38 70C44 62 56 62 62 70"/>
      <path class="v" d="M36 48C34 56 30 60 32 64C34 68 40 66 39 61C38 57 37 53 36 48Z"/><path class="v" d="M64 48C66 56 70 60 68 64C66 68 60 66 61 61C62 57 63 53 64 48Z"/>`,
    wedelt: `<path class="g" d="M20 70C20 56 34 50 50 50C62 50 70 56 70 66C70 76 60 82 46 82C30 82 20 78 20 70Z"/>
      <path d="M70 62C80 56 84 44 82 32"/><path d="M76 28C82 24 90 24 94 30M88 46C94 44 98 48 98 54M64 22C70 16 78 16 82 20"/>
      <path d="M30 82V92M60 80V92"/>`,
    kocht: `<path class="g" d="M16 46H84V78C84 86 78 90 70 90H30C22 90 16 86 16 78Z"/><path d="M8 50H16M84 50H92M12 44H88"/>
      <path d="M34 34C30 28 38 24 34 16M50 34C46 28 54 24 50 16M66 34C62 28 70 24 66 16"/>`,
    lacht: `<circle class="g" cx="50" cy="50" r="34"/><path d="M32 42C35 36 41 36 44 42M56 42C59 36 65 36 68 42"/>
      <path class="v" d="M30 56H70C70 70 60 78 50 78C40 78 30 70 30 56Z"/>`,
    singt: `<path class="g" d="M8 30C24 24 40 32 40 50C40 66 26 74 12 70L8 62C18 62 24 58 24 50C24 42 18 38 8 38Z"/>
      <path d="M58 70V34L82 28V64"/><ellipse class="v" cx="52" cy="70" rx="7" ry="5"/><ellipse class="v" cx="76" cy="64" rx="7" ry="5"/>`,
    trinkt: `<path class="g" d="M28 30H72L66 92H34Z"/><path d="M32 52H68"/><path d="M52 64L64 6L80 4"/>`,
    liegt: `<path class="g" d="M8 52H92V74H8Z"/><path d="M8 40V92M92 60V92"/><path class="g" d="M12 40C12 34 30 34 30 40V52H12Z"/>
      <path class="g" d="M32 46H90V60H32Z"/>`,
    faehrt: `<circle class="g" cx="50" cy="50" r="36"/><circle class="g" cx="50" cy="50" r="10"/><path d="M14 46H40M60 46H86M50 60V86"/>`,
    oeffnet: `<path class="g" d="M14 30H54V88H14Z"/><path class="g" d="M54 30L84 20V96L54 88Z"/><circle class="v" cx="62" cy="58" r="3"/>
      <path d="M34 50V70"/>`,
    hupt: `<circle class="g" cx="38" cy="58" r="30"/><circle class="v" cx="38" cy="58" r="9"/><path d="M8 54H29M47 54H68M38 67V88"/>
      <path d="M76 30C82 36 82 48 76 54M86 22C94 32 94 52 86 62"/>`,
    waescht: `<path class="g" d="M10 50H90C88 74 72 88 50 88C28 88 12 74 10 50Z"/><path d="M18 62C30 58 40 66 52 62C62 58 72 64 82 60"/>
      <circle class="g" cx="30" cy="40" r="8"/><circle class="g" cx="50" cy="32" r="10"/><circle class="g" cx="68" cy="40" r="7"/><circle class="g" cx="80" cy="24" r="5"/>`,
    wischt: `<path class="g" d="M22 54L54 36L74 60L42 78Z"/><path d="M26 64L58 46M34 72L66 54"/>
      <path d="M8 90C30 82 60 82 92 90"/><path class="g" d="M80 14L83 22L91 25L83 28L80 36L77 28L69 25L77 22Z"/>`,
    rutscht: `<path d="M74 92V20M88 92V20M74 34H88M74 50H88M74 66H88"/><path class="g" d="M74 20C60 24 46 50 30 78C26 86 18 88 10 88V92H20C34 92 46 64 74 30Z"/>`,
    pustet: `<path d="M30 94C32 74 36 60 40 50"/><circle class="g" cx="40" cy="40" r="14"/>
      <path d="M40 40L32 30M40 40L48 28M40 40L52 40M40 40L30 46M40 40L44 54"/>
      <path d="M64 22L70 18M74 34L82 30M68 48L78 48"/><circle class="p" cx="72" cy="17" r="2"/><circle class="p" cx="84" cy="29" r="2"/><circle class="p" cx="80" cy="48" r="2"/>`,
    schaelt: `<circle class="g" cx="40" cy="56" r="24"/><path d="M58 40C70 30 80 40 72 48C66 54 74 62 82 56C90 50 96 58 90 66"/>
      <path class="g" d="M66 82L88 92L92 86L72 74Z"/>`,
    hoert: `<path class="g" d="M34 86C24 82 20 74 24 64C28 56 24 50 24 40C24 22 36 12 50 12C66 12 76 24 76 40C76 54 66 60 60 66C54 72 56 86 44 88C40 89 36 88 34 86Z"/>
      <path d="M40 40C40 30 54 28 58 38C60 46 50 50 50 58"/><path d="M84 30C90 38 90 50 84 58M92 22C100 34 100 54 92 66"/>`,
    buegelt: `<path class="g" d="M10 76C10 52 30 40 56 40H84V76Z"/><path d="M40 40C40 26 46 20 56 20H78V40"/><circle class="p" cx="30" cy="66" r="2"/><circle class="p" cx="46" cy="66" r="2"/>
      <path d="M6 88H94" stroke-dasharray="6 6"/>`,
    fluestert: `<path class="g" d="M30 30C46 22 60 30 60 50C60 70 46 78 30 70Z"/><path d="M40 50H52"/>
      <path class="g" d="M62 34C70 34 74 40 74 50C74 60 70 66 62 66C66 60 66 40 62 34Z"/>
      <circle class="p" cx="84" cy="42" r="2"/><circle class="p" cx="90" cy="50" r="2"/><circle class="p" cx="84" cy="58" r="2"/>`,
    reitet: `<path class="g" d="M30 92V60C30 40 44 24 62 18L68 8L72 18C84 22 92 34 92 46C92 54 86 56 80 52L70 44C66 54 66 70 70 92Z"/>
      <path d="M62 18C52 20 44 28 40 40M48 22C42 26 36 34 34 44"/><circle class="p" cx="74" cy="32" r="2.2"/><path d="M84 48L88 46"/>`,
    schreit: `<circle class="g" cx="44" cy="52" r="32"/><circle class="p" cx="34" cy="42" r="3"/><circle class="p" cx="54" cy="42" r="3"/>
      <ellipse class="v" cx="44" cy="66" rx="12" ry="10"/><path d="M80 30L90 26M82 50H96M80 70L90 76"/>`,
    schaukelt: `<path d="M24 4L40 70M76 4L60 70"/><path class="g" d="M34 70H66V78H34Z"/><path d="M8 52C12 70 24 82 40 88M92 52C88 70 76 82 60 88"/>`,
    laeuft: `<path class="g" d="M30 56C30 46 38 42 46 46L60 54C70 58 80 58 86 62C92 66 92 76 84 78H34C30 78 30 72 30 66Z"/>
      <path d="M30 70H88M40 52L46 58M48 48L54 54"/><path d="M4 50H22M8 62H24M4 74H20"/>`,
    stolpert: `<path class="g" d="M46 86C40 70 56 60 70 66C82 70 88 80 84 88Z"/><path d="M4 92H96"/>
      <path class="g" d="M18 50L24 62L30 50L24 38Z"/><path d="M30 26L38 38M44 20L46 34M58 24L54 38"/>`,
    stapelt: `<path class="g" d="M20 70H80V90H20Z"/><path class="g" d="M26 50H74V70H26Z"/><path class="g" d="M32 30H68V50H32Z"/><path class="g" d="M38 10H62V30H38Z"/>`,
    klettert: `<path d="M30 4V96M70 4V96M30 20H70M30 40H70M30 60H70M30 80H70"/>`,
    leckt: `<path class="g" d="M34 44L50 94L66 44Z"/><path d="M38 56L58 52M42 68L56 64"/><path class="g" d="M30 44C26 26 40 16 50 18C60 16 74 26 70 44Z"/>
      <path class="v" d="M64 30C70 30 74 36 72 42C70 46 66 44 66 40Z"/>`,
    giesst: `<path class="g" d="M20 40H58V82H20Z"/><path d="M58 50L82 34"/><path class="g" d="M80 28L92 30L86 40Z"/><path d="M28 40C28 28 50 28 50 40"/>
      <path d="M88 48V56M80 52V62M92 62V70"/>`,
    leuchtet: `<path class="g" d="M8 44H44V60H8Z"/><path class="g" d="M44 40L56 34V70L44 64Z"/><path d="M62 30L94 14M62 52H96M62 74L94 90"/>`,
    winkt: `<path class="g" d="M40 92L36 54C34 46 42 42 46 50L44 24C44 16 54 16 54 24L56 44L58 18C58 10 68 10 68 18L66 46L72 28C74 20 84 22 82 30L74 64C70 80 60 92 40 92Z"/>
      <path d="M14 30C10 40 10 52 14 62M24 34C21 42 21 50 24 58"/>`
  };
  const tut = (h) => `<g transform="translate(46 4) scale(.54)">${h}</g>`;
  const verb = (h) => kind('translate(-12 6) scale(.9)') + tut(h);
  const VERBEN = {
    malt: 'malt', tanzt: 'tanzt', filmt: 'filmt', wischt: 'wischt', hopst: 'hopst', turnt: 'turnt', rutscht: 'rutscht',
    pustet: 'pustet', kuschelt: 'kuschelt', schläft: 'schlaeft', schält: 'schaelt', flötet: 'floetet', hört: 'hoert',
    bügelt: 'buegelt', flüstert: 'fluestert', reitet: 'reitet', schreit: 'schreit', baut: 'baut', schaukelt: 'schaukelt',
    heult: 'heult', läuft: 'laeuft', räumt: 'raeumt', kocht: 'kocht', lacht: 'lacht', stolpert: 'stolpert', stapelt: 'stapelt',
    trinkt: 'trinkt', hüpft: 'hopst', klettert: 'klettert', leckt: 'leckt', liest: 'liest', gießt: 'giesst', leuchtet: 'leuchtet', winkt: 'winkt'
  };
  const TUT = {
    frisst: 'frisst', malt: 'malt', malen: 'malt', rosa: 'rosa', lila: 'lila', füttert: 'fuettert', tanzt: 'tanzt', klatscht: 'klatscht',
    nascht: 'nascht', steht: 'steht', stehen: 'steht', filmt: 'filmt', fischt: 'fischt', staunt: 'staunt', hopst: 'hopst',
    schläft: 'schlaeft', sitzt: 'sitzt', turnt: 'turnt', liest: 'liest', lesen: 'liest', badet: 'badet', kuschelt: 'kuschelt',
    bindet: 'bindet', wirft: 'wirft', trötet: 'troetet', flötet: 'floetet', radeln: 'radelt', trägt: 'traegt', tragen: 'traegt',
    rast: 'rast', saust: 'rast', teilen: 'teilen', baut: 'baut', zaubert: 'zaubert', schaut: 'schaut', räumt: 'raeumt',
    läutet: 'laeutet', heult: 'heult', wedelt: 'wedelt', kocht: 'kocht', lacht: 'lacht', singt: 'singt', trinkt: 'trinkt',
    liegt: 'liegt', fährt: 'faehrt', öffnet: 'oeffnet', hupt: 'hupt', wäscht: 'waescht'
  };
  const LAMA = `<path d="M28 54C28 45 36 42 46 42L74 42C80 42 82 48 82 54C82 62 76 66 68 66L38 66C32 66 28 61 28 54Z"/>
    <path d="M66 42L66 22M75 42L76 24"/><path class="g" d="M64 21C64 13 69 10 74 11C79 12 84 15 84 19C84 22 81 24 76 24L70 24C66 24 64 23 64 21Z"/>
    <path d="M68 12L66 4L71 11M74 11L76 3L78 12"/><circle class="p" cx="75" cy="16" r="1.6"/><path d="M36 66L36 88M45 66L45 88M64 66L64 88M73 66L73 88M28 50C22 48 22 42 26 40"/>`;
  const P = {
    kind: KIND,
    minilama: `<g transform="translate(26 46) scale(.52)">${LAMA}</g>`,
    oma: `<path class="g" d="M24 96C24 70 34 58 50 58C66 58 76 70 76 96Z"/><path d="M40 62L50 76L60 62"/>
      <circle class="g" cx="50" cy="12" r="8"/><circle class="g" cx="50" cy="36" r="18"/><path d="M33 32C36 20 64 20 67 32"/>
      <circle class="g" cx="43" cy="38" r="5"/><circle class="g" cx="57" cy="38" r="5"/><path d="M48 38H52"/><path d="M44 48Q50 52 56 48"/>`,
    opa: `<path class="g" d="M24 96C24 70 34 58 50 58C66 58 76 70 76 96Z"/><path d="M50 60V96M40 70H44M40 80H44"/>
      <circle class="g" cx="50" cy="34" r="18"/><path d="M32 30C30 22 34 18 38 20M68 30C70 22 66 18 62 20"/>
      <circle class="g" cx="43" cy="34" r="5"/><circle class="g" cx="57" cy="34" r="5"/><path d="M48 34H52"/>
      <path class="v" d="M40 44C44 40 48 42 50 44C52 42 56 40 60 44C56 48 44 48 40 44Z"/>`,
    'krähe': `<path d="M44 74L40 92M54 74L56 92M34 92H44M52 92H62"/>
      <path class="v" d="M20 52C20 40 30 32 44 34C58 36 66 46 64 58C62 70 50 76 38 74C28 72 20 64 20 52Z"/>
      <path class="v" d="M60 44C62 32 72 26 80 30C86 34 86 42 80 46L66 52Z"/><path class="v" d="M84 34L96 38L84 42Z"/>
      <circle cx="76" cy="36" r="2" fill="#fff" stroke="none"/><path class="v" d="M22 56L4 62L10 50Z"/>`,
    drachenbaby: `<path d="M40 82L38 92M60 82L62 92"/><path class="g" d="M70 74C84 74 92 64 94 52C86 58 80 60 74 58Z"/>
      <path class="g" d="M28 66C28 52 38 44 50 44C62 44 72 52 72 66C72 78 62 86 50 86C38 86 28 78 28 66Z"/>
      <path class="g" d="M30 48C22 36 10 38 8 46C16 46 22 50 30 56Z"/><path class="g" d="M70 48C78 36 90 38 92 46C84 46 78 50 70 56Z"/>
      <path class="g" d="M32 30C32 16 42 10 52 10C64 10 72 18 72 30C72 40 62 46 52 46C40 46 32 40 32 30Z"/>
      <path class="v" d="M44 10L46 2L50 9M56 9L60 2L61 11"/><circle class="p" cx="46" cy="28" r="2.4"/><circle class="p" cx="60" cy="28" r="2.4"/>
      <path d="M48 38Q53 41 58 38M42 64C46 70 54 70 58 64"/>`,
    delfin: `<path class="g" d="M10 60C22 34 50 26 74 34C82 36 90 40 94 44L86 48C80 46 76 46 72 48C70 62 56 70 40 70C30 70 22 68 16 66L8 76L6 62Z"/>
      <path class="v" d="M48 30L56 16L60 32Z"/><circle class="p" cx="80" cy="40" r="1.8"/><path d="M60 52C62 58 58 62 54 62"/>
      <path d="M4 86C14 80 24 92 34 86C44 80 54 92 64 86C74 80 84 92 96 86"/>`,
    zimmer: `<path d="M6 86H94M14 86V14H86V86"/><path class="g" d="M24 26H50V52H24Z"/><path d="M37 26V52M24 39H50"/>
      <path d="M70 14V30"/><path class="g" d="M60 30H80L76 42H64Z"/><path class="g" d="M58 64H84V86H58Z"/>`,
    lila: `<path class="f-lila" d="M20 52C20 30 40 22 54 30C70 20 90 36 82 54C92 66 78 84 60 78C48 90 22 84 24 68C12 64 14 56 20 52Z"/>`,
    'grün': `<path class="f-gruen" d="M20 52C20 30 40 22 54 30C70 20 90 36 82 54C92 66 78 84 60 78C48 90 22 84 24 68C12 64 14 56 20 52Z"/>`,
    hof: `<path d="M4 90H96"/><path class="g" d="M30 90V48L56 26L82 48V90Z"/><path class="g" d="M48 90V64H64V90Z"/>
      <path d="M4 70H26M4 80H26M8 64V90M18 64V90"/>`,
    zoo: `<path class="g" d="M10 90V40C10 18 90 18 90 40V90"/><path d="M26 30V90M42 25V90M58 25V90M74 30V90M10 56H90"/><path d="M4 90H96"/>`,
    kino: `<path class="g" d="M8 10H92V58H8Z"/><path d="M22 46L40 24L52 38L60 30L78 46"/>
      <path class="g" d="M10 74C10 66 26 66 26 74V90H10Z"/><path class="g" d="M32 74C32 66 48 66 48 74V90H32Z"/><path class="g" d="M54 74C54 66 70 66 70 74V90H54Z"/><path class="g" d="M76 74C76 66 92 66 92 74V90H76Z"/>`,
    'brösel': `<path class="v" d="M20 60L28 54L32 62L24 66Z"/><path class="v" d="M44 70L52 66L54 74L46 76Z"/><path class="v" d="M64 56L72 52L76 60L68 64Z"/>
      <path class="v" d="M32 80L38 76L40 84L34 86Z"/><path class="v" d="M70 78L78 76L78 84L72 86Z"/><path class="v" d="M54 46L58 42L62 48L57 51Z"/>
      <path class="g" d="M14 34C14 20 40 16 50 24V44H14Z"/>`,
    regen: `<path class="g" d="M20 50C10 50 8 34 20 32C22 18 42 14 50 26C58 14 80 18 80 34C92 34 92 50 80 50Z"/>
      <path d="M28 62L24 72M44 62L40 72M60 62L56 72M76 62L72 72M36 80L32 90M52 80L48 90M68 80L64 90"/>`,
    'hügel': `<path class="g" d="M4 90C14 48 34 30 56 34C76 38 90 62 96 90Z"/><path d="M30 60L32 54L34 60M62 52L64 46L66 52M48 74L50 68L52 74"/>
      <path d="M78 34V22"/><circle class="g" cx="78" cy="18" r="5"/>`,
    glocke: `<path d="M14 92V10H86V92"/><path class="g" d="M50 22C38 22 32 32 32 46C32 56 28 62 24 66H76C72 62 68 56 68 46C68 32 62 22 50 22Z"/>
      <path d="M50 10V22"/><circle class="v" cx="50" cy="72" r="5"/>`,
    ei: `<path class="g" d="M50 10C70 10 82 40 82 60C82 80 68 92 50 92C32 92 18 80 18 60C18 40 30 10 50 10Z"/><path d="M22 54L34 46L42 56L52 44L62 56L72 46L80 54"/>`,
    strumpfhose: `<path class="g" d="M28 10H72V30L66 90H54L50 40L46 90H34L28 30Z"/><path d="M28 18H72"/>`,
    buch: `<path class="g" d="M50 26C40 18 22 16 8 20V82C22 78 40 80 50 88Z"/><path class="g" d="M50 26C60 18 78 16 92 20V82C78 78 60 80 50 88Z"/>
      <path d="M16 34C26 32 36 34 42 38M16 48C26 46 36 48 42 52M84 34C74 32 64 34 58 38M84 48C74 46 64 48 58 52"/>`,
    karussell: `<path class="g" d="M10 34L50 8L90 34Z"/><path d="M50 8V2M50 34V84M22 34V62M78 34V62"/>
      <path class="g" d="M14 62C14 56 30 56 30 62C30 68 22 70 22 74M70 62C70 56 86 56 86 62C86 68 78 70 78 74"/>
      <path class="g" d="M8 84C8 78 92 78 92 84C92 92 8 92 8 84Z"/>`,
    fahrrad: `<circle class="g" cx="24" cy="66" r="18"/><circle class="g" cx="76" cy="66" r="18"/><path d="M24 66L42 40H70L76 66M42 40L52 66H24M52 66L70 40M40 30H48M66 28L70 40L80 32"/>`,
    loch: `<path class="g" d="M30 96C34 70 32 40 26 4H74C68 40 66 70 70 96Z"/><ellipse class="v" cx="50" cy="44" rx="12" ry="15"/>
      <path d="M36 74C40 70 44 72 46 76M58 22C60 18 64 18 66 22"/>`,
    kiste: `<path class="g" d="M12 30H88V88H12Z"/><path d="M12 50H88M12 70H88M24 30V88M76 30V88"/>`,
    fenster: `<path class="g" d="M20 12H80V84H20Z"/><path d="M50 12V84M20 48H80M12 84H88"/><path d="M20 12C30 26 30 40 26 48M80 12C70 26 70 40 74 48"/>`
  };
  const L = window.LB_PLATZHALTER = Object.assign(window.LB_PLATZHALTER || {}, P);
  for (const [w, h] of Object.entries(VERBEN)) L[w] = verb(H[h]);
  for (const [w, h] of Object.entries(TUT)) L['tut-' + w] = H[h];
  const D = window.LB_BILDDATEN || {};
  const BEWOHNER = { 'bw-panda': 'panda', 'bw-ara': 'ara', 'bw-hirsch': 'hirsch', 'bw-robo': 'robo', 'bw-nashorn': 'nashorn', 'bw-uhu': 'uhu',
    'bw-puma': 'puma', 'bw-esel': 'esel', 'bw-kamel': 'kamel', 'bw-kraehe': 'krähe', 'bw-loewe-leo': 'löwe', 'bw-moewe': 'möwe',
    'bw-kuh-hut': 'kuh', 'bw-kueken': 'küken', 'bw-schwein': 'schwein', 'bw-meise': 'meise', 'bw-maus': 'maus', 'bw-eule-luna': 'eule',
    'bw-hund': 'hund', 'bw-zauberer': 'zauberer', 'bw-elch': 'elch', 'bw-drachenbaby': 'drachenbaby', 'bw-pinguin': 'pinguin',
    'bw-storch': 'storch', 'bw-kuh': 'kuh', 'bw-schnecke': 'schnecke', 'bw-delfin': 'delfin' };
  for (const [bw, tier] of Object.entries(BEWOHNER)) {
    if (D[bw] || L[bw]) continue;
    if (D[tier]) D[bw] = D[tier]; else if (L[tier]) L[bw] = L[tier];
  }
})();
