/* Scene 5: Building up or breaking down? (HCF and LCM problems)
   One set, the void deck at 7 p.m.: Big Two on the left end of the party table checking every problem "at the door",
   two humans behind the table, a PROBLEM BOARD panel on the right, and a card taped to the front of the table with two
   columns, BUILDING UP -> LCM | BREAKING DOWN -> HCF, that each problem drops into.
   bus: two buses, every 12 and every 18 min -> both: both leave at 7:00, next together? -> ask: Big Two, building up
   (multiples, LCM) or breaking down (factors, HCF), the table card appears -> up: two timelines, A hops 12, 24, 36,
   B hops 18, 36, the 36 rings, LCM(12, 18) = 36 -> answer: Ah Boy "36!" -> when: the clock, 7:00 + 36 min = 7:36 p.m.
   -> lights: Dad's red and green fairy lights, 8 x 12 = 96 -> lcm24: a timeline of flashes, together at 24,
   LCM = 2^3 x 3 = 24, NOT ON THE LIST on 96 -> packs: 8 packs of burgers, 6 packs of buns -> fewest: LCM(6, 8) = 24,
   4 packs and 3 packs, the extras go to the freezer, Mum ticks her plan -> bags: 36 coins, 48 lollipops, 48 bags ->
   down: NOT ON THE LIST on the 48 bags, breaking down -> HCF -> hcf: 36 = 2^2 x 3^2, 48 = 2^4 x 3, HCF = 12, twelve
   bags of 3 coins and 4 lollipops -> sense: HCF <= smaller, LCM >= bigger -> sisters: both buses at 7:36, the two
   aunties arrive together, not looking at each other; Paati smug. */
scene('party', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const pill = (parent, text, o) => { o = o || {}; return mkChip(parent, text, { size: o.size || 30, col: o.col || C.ink }); };
  const popSet = (el, t, t0, t1, x, y) => { const p = t >= t0 && t < t1 ? P(t, t0, 0.35, linear) : 0; el.set(p); if (x !== undefined) tr(el, x, y); };
  const fadeIn = (el, t, t0, t1) => { const p = t >= t0 && t < (t1 === undefined ? 1e9 : t1) ? P(t, t0, 0.3, easeOut) : 0; op(el, p); return p; };
  const GOLD = '#FFE45C', PINK = '#FF8FC8', RED = '#FF6B6B', GREEN = '#56D69B', LIL = '#C9B6FF', BLUE = '#6EC8FF', ORANGE = '#FFB347';
  const INK = C.ink;

  /* layers */
  const Lbg = G(root), Lpanel = G(root), Lcast = G(root), Lfront = G(root), Lcard = G(root), Lfg = G(root), Lhud = G(root);

  /* ---------- the void deck ---------- */
  const vd = fmVoid(Lbg);
  Lfront.appendChild(vd.front); Lfront.appendChild(vd.top);

  /* ---------- the panel ---------- */
  const PX0 = 470, PX1 = 1170, PY0 = 112, PY1 = 508, PCX = (PX0 + PX1) / 2;
  E('rect', { x: PX0 + 6, y: PY0 + 6, width: PX1 - PX0, height: PY1 - PY0, rx: 18, fill: 'rgba(0,0,0,0.25)' }, Lpanel);
  E('rect', { x: PX0, y: PY0, width: PX1 - PX0, height: PY1 - PY0, rx: 18, fill: '#12222E', stroke: '#8FA3B8', 'stroke-width': 4 }, Lpanel);
  const cpId = 'fmPartyClip';
  const cp = E('clipPath', { id: cpId }, defs()); E('rect', { x: PX0 + 3, y: PY0 + 3, width: PX1 - PX0 - 6, height: PY1 - PY0 - 6, rx: 16 }, cp);
  const Lp = G(Lpanel, { 'clip-path': `url(#${cpId})` });

  /* a bus: about 100 x 65, wheels on y = 0 */
  const mkBus = (parent, col, num) => {
    const g = G(parent);
    E('rect', { x: -50, y: -64, width: 100, height: 56, rx: 10, fill: col, stroke: SC_INK, 'stroke-width': 3 }, g);
    E('path', { d: 'M-42,-58 h24 v16 h-24 Z M-12,-58 h24 v16 h-24 Z M18,-58 h24 v16 h-24 Z', fill: '#CFEFFF', stroke: SC_INK, 'stroke-width': 2 }, g);
    T(g, 0, -13, num, { size: 26, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
    E('path', { d: 'M-34,-8 a9,9 0 1,0 18,0 a9,9 0 1,0 -18,0 M16,-8 a9,9 0 1,0 18,0 a9,9 0 1,0 -18,0', fill: '#22262E', stroke: '#9AA6B2', 'stroke-width': 2 }, g);
    return g;
  };

  /* ===== bus / both / up: the two timelines ===== */
  const LA = 320, LB = 452, NX = 620, NLEN = 510;
  const tlG = G(Lp);
  const hopsA = [0, 12, 24].map(a => ({ a, b: a + 12, col: RED, height: 40 }));
  const hopsB = [0, 18].map(a => ({ a, b: a + 18, col: BLUE, height: 40 }));
  const nlA = mkNumberLine(tlG, { from: 0, to: 72, step: 6, len: NLEN, size: 26, arrows: false, labels: v => (v % 12 === 0 ? String(v) : null), hops: hopsA });
  tr(nlA, NX, LA);
  const nlB = mkNumberLine(tlG, { from: 0, to: 72, step: 6, len: NLEN, size: 26, arrows: false, labels: v => (v % 18 === 0 ? String(v) : null), hops: hopsB });
  tr(nlB, NX, LB);
  const X = v => NX + nlA.x(v);
  const ring36 = G(tlG);
  E('path', { d: `M${X(36)},${LA + 62} L${X(36)},${LB - 70}`, stroke: GOLD, 'stroke-width': 4, 'stroke-dasharray': '8 8' }, ring36);
  [LA, LB].forEach(y => E('circle', { cx: X(36), cy: y + 36, r: 24, fill: 'rgba(255,228,92,0.18)', stroke: GOLD, 'stroke-width': 4 }, ring36));
  const minHead = mkText(Lp, PX0 + 24, 150, 'minutes after **7:00**', { size: 26, fill: '#A4BCCB', boldFill: INK });
  const busA = mkBus(Lp, '#D63A3A', '12'), busB = mkBus(Lp, '#2E6FD0', '18');
  const cEvA = pill(Lp, 'every **12** min', { col: RED, size: 30 });
  const cEvB = pill(Lp, 'every **18** min', { col: BLUE, size: 30 });
  const cSeven = pill(Lp, 'both leave at **7:00**', { col: GOLD, size: 30 });
  const cTog = pill(Lp, 'next **together**?', { col: PINK, size: 30 });
  const cMult = pill(Lp, 'building up: **multiples**', { col: GREEN, size: 28 });
  const mLcm = mkMath(Lp, 0, 0, 'LCM(12, 18) = 36', { size: 40, fill: GOLD, anchor: 'middle' });

  /* ===== ask: building up or breaking down? ===== */
  const askG = G(Lp);
  mkText(askG, PCX, 160, '**Building up** or **breaking down**?', { size: 32, anchor: 'middle', fill: INK, boldFill: GOLD });
  const askCol = (x0, col, head, sub, clues, ans) => {
    const g = G(askG);
    E('rect', { x: x0, y: 192, width: 330, height: 296, rx: 16, fill: 'rgba(10,27,39,0.94)', stroke: col, 'stroke-width': 3 }, g);
    mkText(g, x0 + 165, 236, head, { size: 30, anchor: 'middle', fill: col, weight: 700 });
    mkText(g, x0 + 165, 274, sub, { size: 26, anchor: 'middle', fill: '#A4BCCB', boldFill: INK });
    const cl = clues.map((s, i) => mkText(g, x0 + 22, 328 + i * 46, '• ' + s, { size: 27, fill: INK, boldFill: col }));
    const a = mkText(g, x0 + 165, 466, ans, { size: 32, anchor: 'middle', fill: col, boldFill: col });
    return { g, cl, a };
  };
  const askL = askCol(PX0 + 15, GREEN, 'BUILDING UP ↑', 'into **multiples**', ['next time **together**', '**fewest** packs'], '→ **LCM**');
  const askR = askCol(PX0 + 355, BLUE, 'BREAKING DOWN ↓', 'into **factors**', ['**largest** equal groups', 'biggest square **tile**'], '→ **HCF**');

  /* ===== when: the clock ===== */
  const whenG = G(Lp);
  const CLX = 625, CLY = 330, CLR = 118;
  E('circle', { cx: CLX, cy: CLY, r: CLR, fill: '#FFFDF6', stroke: '#8FA3B8', 'stroke-width': 8 }, whenG);
  let tk = '';
  for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; tk += `M${(CLX + Math.sin(a) * (CLR - 10)).toFixed(1)},${(CLY - Math.cos(a) * (CLR - 10)).toFixed(1)} L${(CLX + Math.sin(a) * (CLR - (i % 3 ? 22 : 30))).toFixed(1)},${(CLY - Math.cos(a) * (CLR - (i % 3 ? 22 : 30))).toFixed(1)} `; }
  E('path', { d: tk, stroke: MK.ink, 'stroke-width': 5, 'stroke-linecap': 'round' }, whenG);
  const sweep = E('path', { d: '', fill: 'rgba(255,179,71,0.45)' }, whenG);
  const hHand = E('line', { x1: 0, y1: 0, x2: 0, y2: -58, stroke: MK.ink, 'stroke-width': 10, 'stroke-linecap': 'round' }, whenG);
  const mHand = E('line', { x1: 0, y1: 0, x2: 0, y2: -92, stroke: '#D63A3A', 'stroke-width': 7, 'stroke-linecap': 'round' }, whenG);
  E('circle', { cx: CLX, cy: CLY, r: 9, fill: MK.ink }, whenG);
  const setClock = m => {
    tr(mHand, CLX, CLY, 1, m / 60 * 360); tr(hHand, CLX, CLY, 1, (7 + m / 60) / 12 * 360);
    const a1 = -90 + m / 60 * 360;
    sweep.setAttribute('d', m > 0.2 ? `M${CLX},${CLY} L${CLX},${CLY - CLR + 14} A${CLR - 14},${CLR - 14} 0 ${m > 30 ? 1 : 0} 1 ${(CLX + Math.cos(a1 * Math.PI / 180) * (CLR - 14)).toFixed(1)},${(CLY + Math.sin(a1 * Math.PI / 180) * (CLR - 14)).toFixed(1)} Z` : '');
  };
  const cAsked = pill(whenG, 'the question asked **when**', { col: PINK, size: 30 });
  tr(cAsked, 960, 170);
  const w1 = mkText(whenG, 790, 300, '7:00 + 36 min', { size: 42, fill: INK });
  const w2 = mkText(whenG, 790, 370, '= **7:36 p.m.**', { size: 46, fill: INK, boldFill: GOLD });
  const w2box = E('rect', { x: 776, y: w2.top - 10, width: w2.w + 28, height: w2.h + 20, rx: 12, fill: 'none', stroke: GREEN, 'stroke-width': 4 }, whenG);
  const not36 = G(whenG);
  { const c = pill(not36, 'not just **36**', { col: RED, size: 30 }); c.set(1); const x = cross(not36, 13); tr(x, c.w / 2 + 18, -2); }
  tr(not36, 940, 450);

  /* ===== lights / lcm24 ===== */
  const lightsG = G(Lp);
  const strR = fmLights(lightsG, [[680, 150], [1150, 150]], { n: 8, sag: 14, cols: ['#FF5A5A'], r: 10 });
  const strG = fmLights(lightsG, [[680, 214], [1150, 214]], { n: 8, sag: 14, cols: ['#56D69B'], r: 10 });
  const cEv8 = pill(lightsG, 'every **8** s', { col: RED, size: 28 }); tr(cEv8, 580, 158); cEv8.set(1);
  const cEv12 = pill(lightsG, 'every **12** s', { col: GREEN, size: 28 }); tr(cEv12, 580, 222); cEv12.set(1);
  const m96 = mkMath(Lp, 0, 0, '8 * 12 = 96', { size: 52, fill: ORANGE, anchor: 'middle' });
  // the timeline of flashes
  const flG = G(Lp);
  const LF = 452, FX = 620;
  const nlF = mkNumberLine(flG, { from: 0, to: 96, step: 8, len: NLEN, size: 26, arrows: false, labels: v => (v % 24 === 0 ? String(v) : null) });
  tr(nlF, FX, LF);
  const FXv = v => FX + nlF.x(v);
  const redD = [], grnD = [];
  for (let v = 0; v <= 96; v += 8) redD.push([v, E('circle', { cx: FXv(v), cy: LF - 30, r: 9, fill: '#7A2A2A', stroke: SC_INK, 'stroke-width': 2 }, flG)]);
  for (let v = 0; v <= 96; v += 12) grnD.push([v, E('circle', { cx: FXv(v), cy: LF - 58, r: 9, fill: '#1E5A3E', stroke: SC_INK, 'stroke-width': 2 }, flG)]);
  const nowL = E('path', { d: `M0,${LF - 82} L0,${LF + 14}`, stroke: GOLD, 'stroke-width': 4 }, flG);
  const nowT = T(flG, 0, LF - 92, '0 s', { size: 26, weight: 700, anchor: 'middle', fill: GOLD });
  const ring24 = E('rect', { x: FXv(24) - 22, y: LF - 80, width: 44, height: 106, rx: 20, fill: 'rgba(255,228,92,0.15)', stroke: GOLD, 'stroke-width': 4 }, flG);
  const ring96 = E('rect', { x: FXv(96) - 22, y: LF - 80, width: 44, height: 106, rx: 20, fill: 'none', stroke: RED, 'stroke-width': 4 }, flG);
  const cTogether = pill(Lp, 'together at **24 s**', { col: GOLD, size: 28 });
  const wk24 = mkWorking(Lp, 590, 130, ['8 = 2^3', '12 = 2^2 * 3', { m: 'LCM = 2^3 * 3 = 24', col: GOLD }], { size: 34, gap: 14 });
  const cLowest = pill(Lp, '**96**: a common multiple, not the **lowest**', { col: RED, size: 26 });
  const st96 = fmStamp(Lp, 'not');

  /* ===== packs / fewest ===== */
  const packG = G(Lp);
  const packIcon = (parent, kind) => {
    const g = G(parent), burger = kind === 'b';
    E('rect', { x: -30, y: -21, width: 60, height: 42, rx: 7, fill: burger ? '#7BC96F' : '#F2C27A', stroke: SC_INK, 'stroke-width': 3 }, g);
    T(g, 0, 10, burger ? '6' : '8', { size: 28, weight: 800, anchor: 'middle', fill: SC_INK });
    return g;
  };
  const bPacks = [], nPacks = [];
  for (let i = 0; i < 8; i++) bPacks.push(packIcon(packG, 'b'));
  for (let i = 0; i < 6; i++) nPacks.push(packIcon(packG, 'n'));
  const bHome = i => [520 + (i % 4) * 70, 212 + Math.floor(i / 4) * 52];
  const nHome = i => [870 + (i % 3) * 70, 212 + Math.floor(i / 3) * 52];
  const cBur = pill(packG, '**8** packs of **6** burgers', { col: GREEN, size: 26 }); tr(cBur, 625, 148); cBur.set(1);
  const cBun = pill(packG, '**6** packs of **8** buns', { col: ORANGE, size: 26 }); tr(cBun, 940, 148); cBun.set(1);
  const m48a = mkMath(Lp, 625, 352, '8 * 6 = 48 "burgers"', { size: 32, fill: INK, anchor: 'middle' });
  const m48b = mkMath(Lp, 940, 352, '6 * 8 = 48 "buns"', { size: 32, fill: INK, anchor: 'middle' });
  const freezer = G(Lp);
  E('rect', { x: -44, y: -60, width: 88, height: 120, rx: 10, fill: '#E6F4FF', stroke: '#6FA8D0', 'stroke-width': 4 }, freezer);
  E('path', { d: 'M-44,-16 L44,-16 M30,-44 L30,-28 M30,0 L30,24', stroke: '#6FA8D0', 'stroke-width': 4, 'stroke-linecap': 'round' }, freezer);
  E('path', { d: 'M-14,24 L14,24 M0,10 L0,38 M-10,14 L10,34 M10,14 L-10,34', stroke: '#4C8FC0', 'stroke-width': 3, 'stroke-linecap': 'round' }, freezer);
  tr(freezer, 1110, 238);
  const cFrz = pill(Lp, 'freezer', { col: BLUE, size: 26 });
  const wkPk = mkWorking(Lp, 790, 308, [{ m: 'LCM(6, 8) = 24', col: GOLD }, '24 ÷ 6 = 4 "\u00a0packs"', '24 ÷ 8 = 3 "\u00a0packs"'], { size: 34, gap: 12 });
  const cPacksC = pill(Lp, 'the answer is **packs**, not 24', { col: PINK, size: 26 });

  /* ===== bags / down / hcf ===== */
  const bagG = G(Lp);
  let cd = '';
  for (let i = 0; i < 36; i++) { const x = 548 + (i % 9) * 26 + (Math.floor(i / 9) % 2) * 13, y = 214 + Math.floor(i / 9) * 26; cd += `M${x - 12},${y} a12,12 0 1,0 24,0 a12,12 0 1,0 -24,0 `; }
  E('path', { d: cd, fill: '#F2B33D', stroke: '#8A5A10', 'stroke-width': 2.5 }, bagG);
  let sd = '', hd = '';
  for (let i = 0; i < 48; i++) { const x = 872 + (i % 12) * 22, y = 206 + Math.floor(i / 12) * 34; sd += `M${x},${y} L${x},${y + 22} `; hd += `M${x - 9},${y} a9,9 0 1,0 18,0 a9,9 0 1,0 -18,0 `; }
  E('path', { d: sd, stroke: '#EDE6D6', 'stroke-width': 3 }, bagG);
  const lolCols = ['#FF6FA8', '#6EC8FF', '#B48CFF', '#7EE08A'];
  E('path', { d: hd, fill: '#FF6FA8', stroke: SC_INK, 'stroke-width': 2 }, bagG);
  const cCoins = pill(bagG, '**36** chocolate coins', { col: ORANGE, size: 26 }); tr(cCoins, 660, 152); cCoins.set(1);
  const cLols = pill(bagG, '**48** lollipops', { col: PINK, size: 26 }); tr(cLols, 990, 152); cLols.set(1);
  // 48 little bags in two rows of 24 (one path per row)
  const bag48 = [0, 1].map(r => {
    let d = '';
    for (let i = 0; i < 24; i++) { const x = 506 + i * 27, y = 392 + r * 38; d += `M${x - 9},${y - 12} L${x + 9},${y - 12} L${x + 12},${y + 12} L${x - 12},${y + 12} Z M${x - 5},${y - 12} Q${x},${y - 20} ${x + 5},${y - 12} `; }
    return E('path', { d, fill: '#C9B6FF', stroke: SC_INK, 'stroke-width': 2 }, Lp);
  });
  const c48 = pill(Lp, '**48** bags!', { col: LIL, size: 30 });
  const stBags = fmStamp(Lp, 'not');
  const cBreak = pill(Lp, '**breaking down** into equal groups', { col: BLUE, size: 28 });
  const cLeft = pill(Lp, 'nothing **left over** → **HCF**', { col: BLUE, size: 30 });
  // hcf
  const wkH = mkWorking(Lp, 640, 128, ['36 = 2^2 * 3^2', '48 = 2^4 * 3', { m: 'HCF = 2^2 * 3 = 12', col: GOLD }], { size: 34, gap: 12 });
  const each1 = mkText(Lp, 885, 178, '{{36 ÷ 12 = 3}} coins', { size: 28, fill: INK });
  const each2 = mkText(Lp, 885, 236, '{{48 ÷ 12 = 4}} lollipops', { size: 28, fill: INK });
  const bags12 = [];
  for (let i = 0; i < 12; i++) {
    const g = G(Lp), inner = G(g);
    E('path', { d: 'M-40,-30 L40,-30 L46,32 L-46,32 Z M-16,-30 Q0,-46 16,-30 M8,-6 L8,22 M18,-6 L18,22 M28,-6 L28,22 M38,-6 L38,22', fill: '#C9B6FF', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, inner);
    E('path', { d: 'M-34,14 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0 M-26,0 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0 M-18,14 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0', fill: '#F2B33D', stroke: '#8A5A10', 'stroke-width': 2 }, inner);
    E('path', { d: 'M2,-8 a6,6 0 1,0 12,0 a6,6 0 1,0 -12,0 M12,-8 a6,6 0 1,0 12,0 a6,6 0 1,0 -12,0 M22,-8 a6,6 0 1,0 12,0 a6,6 0 1,0 -12,0 M32,-8 a6,6 0 1,0 12,0 a6,6 0 1,0 -12,0', fill: lolCols[i % 4], stroke: SC_INK, 'stroke-width': 1.5 }, inner);
    tr(g, 535 + (i % 6) * 114, 352 + Math.floor(i / 6) * 86);
    bags12.push(g);
  }

  /* ===== sense ===== */
  const senseG = G(Lp);
  const senseRow = (y, col, head, src) => {
    const g = G(senseG);
    E('rect', { x: PX0 + 20, y, width: 660, height: 160, rx: 16, fill: 'rgba(10,27,39,0.94)', stroke: col, 'stroke-width': 3 }, g);
    mkText(g, PCX, y + 56, head, { size: 32, anchor: 'middle', fill: INK, boldFill: col });
    const m = mkMath(g, PCX - 20, y + 122, src, { size: 36, fill: INK, anchor: 'middle' });
    const k = tick(g, 16, GREEN); tr(k, PCX - 20 + m.w / 2 + 34, y + 110);
    return g;
  };
  const sense1 = senseRow(150, BLUE, 'an **HCF** is at most the **smaller** number', 'HCF(36, 48) = 12 <= 36');
  const sense2 = senseRow(330, GREEN, 'an **LCM** is at least the **bigger** number', 'LCM(12, 18) = 36 >= 18');

  /* ===== sisters: the two aunties at the bus stop ===== */
  const sisG = G(Lp);
  const stop = G(sisG);
  E('path', { d: 'M1100,500 L1100,250', stroke: '#9AA6B2', 'stroke-width': 8 }, stop);
  E('rect', { x: 1062, y: 220, width: 76, height: 50, rx: 8, fill: '#E8424F', stroke: '#FFFFFF', 'stroke-width': 3 }, stop);
  T(stop, 1100, 255, 'BUS', { size: 26, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  const aunt1 = scHuman(sisG, { age: 'senior', skin: SC_SKIN.brown, hair: 'bun', style: 'kurta', shirt: '#2E6FD0', trim: '#F2C744', bindi: true, seed: 41 });
  const aunt2 = scHuman(sisG, { age: 'senior', skin: SC_SKIN.tan, hair: 'bun', style: 'kurta', shirt: '#D63A3A', trim: '#F2C744', bindi: true, seed: 43 });
  const c736 = pill(Lp, '**7:36 p.m.**: together', { col: GOLD, size: 28 });

  /* ---------- the table card: BUILDING UP | BREAKING DOWN ---------- */
  const card = G(Lcard);
  const CX0 = 300, CX1 = 1120, CY0 = 556, CY1 = 684, CMID = (CX0 + CX1) / 2;
  E('rect', { x: CX0 + 5, y: CY0 + 5, width: CX1 - CX0, height: CY1 - CY0, rx: 14, fill: 'rgba(0,0,0,0.2)' }, card);
  E('rect', { x: CX0, y: CY0, width: CX1 - CX0, height: CY1 - CY0, rx: 14, fill: 'rgba(10,27,39,0.95)', stroke: GOLD, 'stroke-width': 3 }, card);
  E('path', { d: `M${CMID},${CY0 + 12} L${CMID},${CY1 - 12}`, stroke: '#3A5468', 'stroke-width': 3 }, card);
  E('path', { d: `M${CX0 + 40},${CY0 - 6} l40,0 M${CX1 - 80},${CY0 - 6} l40,0`, stroke: 'rgba(255,253,246,0.7)', 'stroke-width': 14 }, card);   // tape
  mkText(card, (CX0 + CMID) / 2, CY0 + 40, 'BUILDING UP → **LCM**', { size: 30, anchor: 'middle', fill: GREEN, boldFill: GREEN, weight: 700 });
  mkText(card, (CMID + CX1) / 2, CY0 + 40, 'BREAKING DOWN → **HCF**', { size: 30, anchor: 'middle', fill: BLUE, boldFill: BLUE, weight: 700 });
  const tok = (txt, col) => pill(card, txt, { col, size: 26 });
  const tBus = tok('buses', GREEN), tLight = tok('lights', GREEN), tPack = tok('packs', GREEN), tBag = tok('goodie bags', BLUE);
  const TOKY = CY0 + 92;
  const tokX = { bus: (CX0 + CMID) / 2 - 125, light: (CX0 + CMID) / 2, pack: (CX0 + CMID) / 2 + 125, bag: (CMID + CX1) / 2 };

  /* ---------- HUD ---------- */
  const cTime = pill(Lhud, '**7 p.m.**', { col: GOLD, size: 32 });
  const cTime2 = pill(Lhud, '**7:36 p.m.**', { col: GOLD, size: 32 });
  const bAns = mkSpeechBubble(Lhud, 'the answer is **36**!', { size: 28, tail: 'down', tailX: -10 });
  const cMul = pill(Lhud, '**just multiply them** ×', { col: '#9FE0B5', size: 28 });
  const cTick = pill(Lhud, '✓ **equal**', { col: GREEN, size: 28 });

  /* ---------- the cast ---------- */
  const paati = cast(Lcast, 'paati');
  const kav = cast(Lcast, 'kavya');
  const boy = cast(Lcast, 'boy');
  const dad = cast(Lcast, 'dad');
  const mum = cast(Lcast, 'mum');
  const two = cast(Lcast, 'two');
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* ---------- timing ---------- */
  const SA = 235, SB = 360, SY = 440, SS = 0.76;
  const cUp = at('up') - 0.06, cWhen = at('when') - 0.06, cLights = at('lights') - 0.06, cPacks = at('packs') - 0.06,
    cBags = at('bags') - 0.06, cHcf = at('hcf') - 0.06, cSense = at('sense') - 0.06, cSis = at('sisters') - 0.06;
  const UPA = [0.03, 0.14, 0.25].map(f => mid('up', f)), UPB = [0.38, 0.5].map(f => mid('up', f));
  const fTog = mid('lcm24', 0.3);   // the pointer reaches 24 s

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    vd.upd(t);
    const who = scWho(S, t);
    [cEvA, cEvB, cSeven, cTog, cMult, cAsked, cTogether, cLowest, cFrz, cPacksC, c48, cBreak, cLeft, c736, cTime, cTime2, bAns, cMul, cTick].forEach(c => c.set(0));
    [tlG, minHead, busA, busB, mLcm, ring36, askG, whenG, lightsG, m96, flG, wk24, packG, m48a, m48b, freezer, wkPk, bagG, wkH, each1, each2, senseG, sisG, card].forEach(e => op(e, 0));
    bag48.forEach(b => op(b, 0)); bags12.forEach(b => op(b, 0)); st96.set(0); stBags.set(0);
    const vis = { paati: 0, kav: 0, boy: 0, dad: 0, mum: 0, two: 1 };
    const put = (c, key, x, y, st) => { vis[key] = 1; tr(c, x, y, SS); c.set(Object.assign({ t }, st)); };

    if (t < cSis) popSet(cTime, t, at('bus') + 0.1, 1e9, 1060, 62);
    else popSet(cTime2, t, cSis, 1e9, 1060, 62);

    /* ===== Big Two, on the end of the table all scene ===== */
    {
      let tm = 'deadpan', tl = who === 'two' ? -0.3 : who && who !== 'narr' ? 0.8 : 0.9, list = 0, stamp = 0;
      if (t >= at('ask') && t < end('ask') + 0.2) { list = P(t, at('ask') + 0.1, 0.4, ease); tl = 0.9; }
      if (t >= at('sense') && t < end('sense') + 0.2) { list = P(t, at('sense') + 0.1, 0.4, ease); tl = 0.9; }
      if (t >= at('lcm24') && t < at('packs')) { const s0 = mid('lcm24', 0.66); stamp = P(t, s0 - 0.45, 0.35, ease) * (1 - P(t, s0 + 0.35, 0.3, ease)); tl = 1; if (stamp > 0.1) tm = 'smug'; }
      if (t >= at('down') - 0.4 && t < at('hcf')) { const s0 = at('down') + 0.2; stamp = P(t, s0 - 0.45, 0.35, ease) * (1 - P(t, s0 + 0.35, 0.3, ease)); tl = 1; if (stamp > 0.1) tm = 'smug'; }
      if (t >= at('sisters')) { tm = t > mid('sisters', 0.8) ? 'smug' : 'deadpan'; tl = 0.9; }
      const s2 = 0.56;
      tr(two, 92, 530 - 164 * s2, s2);
      two.set({ t, talk: scTalk(S, t, 'two'), mood: tm, look: tl, list, stamp });
    }

    /* ===== the table card ===== */
    if (t >= at('ask')) {
      const cp2 = P(t, mid('ask', 0.35), 0.4, easeOut);
      op(card, cp2); tr(card, 0, 30 * (1 - cp2));
      const drop = (c, t0, x) => { const p = t >= t0 ? P(t, t0, 0.45, easeOut) : 0; c.set(t >= t0 ? Math.min(1, p * 1.5) : 0); tr(c, x, lerp(TOKY - 70, TOKY, p)); };
      drop(tBus, end('up') - 0.2, tokX.bus);
      drop(tLight, mid('lcm24', 0.9), tokX.light);
      drop(tPack, mid('fewest', 0.95), tokX.pack);
      drop(tBag, mid('down', 0.85), tokX.bag);
    }

    /* ===== bus, both, ask, up: the buses ===== */
    if (t < cWhen) {
      // humans: Paati and Kavya, then Ah Boy for "answer"
      if (t < at('answer') - 0.2) {
        let pm = 'neutral', pl = 0.9;
        if (t >= at('both')) { pm = t < at('ask') ? 'smug' : 'neutral'; pl = t < at('ask') ? 0.4 : -0.9; }
        if (t >= cUp) { pl = 0.9; pm = t > mid('up', 0.8) ? 'happy' : 'neutral'; }
        put(paati, 'paati', SA, 418, { talk: scTalk(S, t, 'paati'), mood: pm, look: pl });
      } else {
        const up = P(t, at('answer') - 0.2, 0.35, pop);
        put(boy, 'boy', SA, lerp(640, SY + 6, up), { talk: scTalk(S, t, 'boy'), mood: 'happy', look: 0.8, lift: 1 });
        popSet(bAns, t, at('answer') + 0.05, 1e9, SA + 20, 262);
      }
      let km = 'neutral', kl = 0.9;
      if (t >= at('ask') && t < cUp) { kl = -0.9; }
      if (t >= cUp) { km = t > mid('up', 0.55) ? 'smug' : 'neutral'; kl = 0.9; }
      if (t >= at('answer') - 0.2) { km = 'neutral'; kl = -0.8; }
      put(kav, 'kav', SB, SY, { talk: scTalk(S, t, 'kavya'), mood: km, look: kl });

      if (t < at('ask')) {
        // bus: the two buses side by side; both: they line up at 7:00 on the timelines
        const toLine = t >= at('both') ? P(t, at('both'), 0.6, ease) : 0;
        const ax = lerp(660, X(0), toLine), ay = lerp(300, LA - 14, toLine), bx = lerp(980, X(0), toLine), by = lerp(300, LB - 14, toLine);
        op(busA, P(t, at('bus') + 0.2, 0.3, linear)); tr(busA, ax, ay, lerp(1.5, 0.8, toLine));
        op(busB, P(t, mid('bus', 0.4), 0.3, linear)); tr(busB, bx, by, lerp(1.5, 0.8, toLine));
        popSet(cEvA, t, mid('bus', 0.25), at('both'), 660, 380);
        popSet(cEvB, t, mid('bus', 0.55), at('both'), 980, 380);
        if (t >= at('both')) {
          op(tlG, toLine); nlA.hops.forEach(h => h.set(0)); nlB.hops.forEach(h => h.set(0));
          popSet(cSeven, t, at('both') + 0.1, 1e9, 640, 170);
          popSet(cTog, t, mid('both', 0.55), 1e9, 990, 170);
        }
      } else if (t < cUp) {
        fadeIn(askG, t, at('ask') + 0.1);
        askL.cl.forEach((c, i) => op(c, P(t, mid('ask', 0.35 + i * 0.1), 0.3, linear)));
        askR.cl.forEach((c, i) => op(c, P(t, mid('ask', 0.6 + i * 0.1), 0.3, linear)));
        op(askL.a, P(t, mid('ask', 0.5), 0.3, linear)); op(askR.a, P(t, mid('ask', 0.8), 0.3, linear));
      } else {
        // up: the hops
        op(tlG, 1); op(minHead, 1); op(busA, 1); op(busB, 1);
        let aPos = 0, aLift = 0, bPos = 0, bLift = 0;
        nlA.hops.forEach((h, i) => { const p = i < 3 ? P(t, UPA[i], 0.55, ease) : 0; h.set(p); if (p > 0) { aPos = 12 * i + 12 * p; aLift = Math.sin(Math.PI * p); } });
        nlB.hops.forEach((h, i) => { const p = i < 2 ? P(t, UPB[i], 0.65, ease) : 0; h.set(p); if (p > 0) { bPos = 18 * i + 18 * p; bLift = Math.sin(Math.PI * p); } });
        tr(busA, X(aPos), LA - 14 - 30 * aLift, 0.8); tr(busB, X(bPos), LB - 14 - 30 * bLift, 0.8);
        const rp = P(t, mid('up', 0.6), 0.35, pop);
        op(ring36, clamp(rp * 2) * (0.75 + 0.25 * Math.sin(t * 8)));
        popSet(cMult, t, mid('up', 0.64), 1e9, 1010, 148);
        const lp = P(t, mid('up', 0.8), 0.35, easeOut);
        op(mLcm, lp); tr(mLcm, 820, 222 + 10 * (1 - lp));
      }
    }

    /* ===== when ===== */
    if (t >= cWhen && t < cLights) {
      let bm = t > mid('when', 0.2) ? 'shock' : 'happy';
      if (t > mid('when', 0.75)) bm = 'happy';
      put(boy, 'boy', SA, SY + 6, { talk: 0, mood: bm, look: 0.8, lift: 0 });
      put(kav, 'kav', SB, SY, { talk: 0, mood: t > mid('when', 0.8) ? 'smug' : 'neutral', look: -0.9 });
      fadeIn(whenG, t, at('when'));
      op(cAsked, 1); cAsked.set(P(t, at('when') + 0.05, 0.35, linear));
      op(not36, P(t, mid('when', 0.18), 0.3, linear));
      setClock(36 * P(t, mid('when', 0.45), 1.6, ease));
      op(w1, P(t, mid('when', 0.45), 0.3, linear));
      op(w2, P(t, mid('when', 0.72), 0.3, linear));
      op(w2box, P(t, mid('when', 0.85), 0.3, linear));
    }

    /* ===== lights, lcm24 (Dad, Kavya) ===== */
    if (t >= cLights && t < cPacks) {
      let dm = 'smug', dl = 0.8, lift = 0;
      if (t < at('lcm24')) { lift = t > at('lights') + 0.2 ? 1 : 0; dl = who === 'dad' ? 0.6 : 0.8; }
      else { const s0 = mid('lcm24', 0.66); dm = t < s0 + 0.05 ? 'neutral' : 'shock'; if (t > mid('lcm24', 0.92)) dm = 'sad'; dl = 0.9; }
      put(dad, 'dad', SA, SY, { talk: scTalk(S, t, 'dad'), mood: dm, look: dl, lift });
      put(kav, 'kav', SB, SY, { talk: 0, mood: t < at('lcm24') ? (t > mid('lights', 0.8) ? 'deadpan' : 'neutral') : (t > mid('lcm24', 0.7) ? 'smug' : 'neutral'), look: t < at('lcm24') ? -0.9 : 0.9 });
      if (t < at('lcm24')) {
        popSet(cMul, t, mid('lights', 0.56), 1e9, SA, 270);
        fadeIn(lightsG, t, at('lights') + 0.05);
        // each string flashes in its own rhythm
        const fr = Math.sin(t * TAU * 1.0) > 0.2, fg = Math.sin(t * TAU * 0.66 + 1) > 0.2;
        strR.set(t, fr ? '#FF5A5A' : '#8A3A3A'); strG.set(t, fg ? '#56D69B' : '#2E6A4E');
        const mp = P(t, mid('lights', 0.56), 0.35, pop);
        op(m96, clamp(mp * 3)); tr(m96, PCX, 340, Math.max(0.01, 0.6 + 0.4 * mp));
      } else {
        // the flashes on a timeline; the pointer runs to 24 s
        op(flG, 1);
        const sec = 24 * P(t, at('lcm24') + 0.1, mid('lcm24', 0.3) - at('lcm24') - 0.1, linear);
        tr(nowL, FXv(sec), 0); setText(nowT, Math.round(sec) + ' s'); tr(nowT, FXv(sec), 0); op(nowT, sec < 23.5 ? 1 : 0);
        const flashAt = v => (sec >= v && v <= 24 ? clamp(1 - (sec - v) / 3) : 0) + (v === 24 && sec >= 24 ? 1 : 0);
        redD.forEach(([v, c]) => { const f = flashAt(v), lit = v <= 24 ? (sec >= v ? 1 : 0) : (t > mid('lcm24', 0.5) ? 1 : 0); attr(c, 'fill', f > 0.3 || (lit && v > 24) ? '#FF5A5A' : sec >= v ? '#B04040' : '#7A2A2A'); attr(c, 'r', 9 + 5 * clamp(f)); });
        grnD.forEach(([v, c]) => { const f = flashAt(v), lit = v <= 24 ? (sec >= v ? 1 : 0) : (t > mid('lcm24', 0.5) ? 1 : 0); attr(c, 'fill', f > 0.3 || (lit && v > 24) ? '#56D69B' : sec >= v ? '#2E8A5E' : '#1E5A3E'); attr(c, 'r', 9 + 5 * clamp(f)); });
        op(ring24, P(t, mid('lcm24', 0.3), 0.3, linear));
        popSet(cTogether, t, mid('lcm24', 0.3), mid('lcm24', 0.74), FXv(24) + 30, LF - 132);
        // the working and Dad's 96
        op(wk24, 1); wk24.set(0);
        [0.36, 0.44, 0.52].forEach((f, i) => wk24.show(i, P(t, mid('lcm24', f), 0.35, linear)));
        op(m96, 1); tr(m96, 1010, 196);
        const s0 = mid('lcm24', 0.66);
        st96.set(t >= s0 ? P(t, s0, 0.35, linear) : 0); tr(st96, 1010, 236, 0.4);
        op(ring96, P(t, s0, 0.3, linear));
        popSet(cLowest, t, mid('lcm24', 0.75), 1e9, 900, 312);
      }
    }

    /* ===== packs, fewest (Dad, Mum) ===== */
    if (t >= cPacks && t < cBags) {
      const inF = t >= at('fewest');
      put(dad, 'dad', SA, SY, { talk: scTalk(S, t, 'dad'), mood: inF ? (t > mid('fewest', 0.5) ? 'sad' : 'shock') : 'smug', look: inF ? 0.9 : 0.6, lift: !inF && t > at('packs') + 0.2 ? 1 : 0 });
      put(mum, 'mum', SB, SY, { talk: scTalk(S, t, 'mum'), mood: inF ? (t > mid('fewest', 0.9) ? 'happy' : 'neutral') : (t > mid('packs', 0.6) ? 'annoyed' : 'neutral'), look: inF ? 0.9 : -0.9, lift: inF && t > mid('fewest', 0.85) ? 1 : 0 });
      if (!inF) popSet(cMul, t, mid('packs', 0.55), 1e9, SA, 270);
      fadeIn(packG, t, at('packs'));
      // packs pop in, then the extras slide off into the freezer
      const go = inF ? P(t, mid('fewest', 0.72), 0.7, ease) : 0;
      bPacks.forEach((g, i) => {
        const [hx, hy] = bHome(i), p = P(t, mid('packs', 0.1 + i * 0.03), 0.3, pop);
        const extra = i >= 4, gp = extra ? P(t, mid('fewest', 0.72) + (i - 4) * 0.08, 0.6, ease) : 0;
        op(g, clamp(p * 3) * (1 - P(gp, 0.8, 0.2, linear)));
        tr(g, lerp(hx, 1110, gp), lerp(hy, 240, gp) - Math.sin(gp * Math.PI) * 60, Math.max(0.01, p) * lerp(1, 0.6, gp));
      });
      nPacks.forEach((g, i) => {
        const [hx, hy] = nHome(i), p = P(t, mid('packs', 0.4 + i * 0.03), 0.3, pop);
        const extra = i >= 3, gp = extra ? P(t, mid('fewest', 0.76) + (i - 3) * 0.08, 0.6, ease) : 0;
        op(g, clamp(p * 3) * (1 - P(gp, 0.8, 0.2, linear)));
        tr(g, lerp(hx, 1110, gp), lerp(hy, 240, gp) - Math.sin(gp * Math.PI) * 60, Math.max(0.01, p) * lerp(1, 0.6, gp));
      });
      if (!inF) {
        op(m48a, P(t, mid('packs', 0.45), 0.3, linear)); op(m48b, P(t, mid('packs', 0.75), 0.3, linear));
      } else {
        const fz = P(t, mid('fewest', 0.62), 0.3, easeOut);
        op(freezer, fz); popSet(cFrz, t, mid('fewest', 0.62), 1e9, 1110, 334);
        op(wkPk, 1); wkPk.set(0);
        [0.04, 0.32, 0.55].forEach((f, i) => wkPk.show(i, P(t, mid('fewest', f), 0.35, linear)));
        popSet(cPacksC, t, mid('fewest', 0.82), 1e9, 790, 476);
        popSet(cTick, t, mid('fewest', 0.9), 1e9, SB + 14, 266);
      }
    }

    /* ===== bags, down, hcf (Ah Boy, Kavya) ===== */
    if (t >= cBags && t < cSense) {
      const inD = t >= at('down'), inH = t >= cHcf;
      let bm = 'happy', bl = 0.8;
      if (inD && !inH) bm = t > at('down') + 0.3 ? 'shock' : 'happy';
      if (inH) { bm = t > mid('hcf', 0.7) ? 'happy' : 'neutral'; bl = 0.8; }
      put(boy, 'boy', SA, SY + 6, { talk: scTalk(S, t, 'boy'), mood: bm, look: bl, lift: t < end('bags') ? 1 : 0 });
      let km = 'neutral', kl = -0.9;
      if (inD) { km = 'neutral'; kl = -0.9; }
      if (inH) { km = t > mid('hcf', 0.5) ? 'happy' : 'neutral'; kl = 0.9; }
      put(kav, 'kav', SB, SY, { talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
      if (!inH) {
        fadeIn(bagG, t, at('bags'));
        bag48.forEach((b, r) => {
          const p = P(t, mid('bags', 0.62) + r * 0.15, 0.35, pop), cy = 392 + r * 38;
          op(b, clamp(p * 3) * (inD ? 1 - 0.55 * P(t, mid('down', 0.55), 0.3, linear) : 1));
          b.setAttribute('transform', `translate(${PCX} ${cy}) scale(1 ${Math.max(0.01, p).toFixed(3)}) translate(${-PCX} ${-cy})`);
        });
        if (!inD) popSet(c48, t, mid('bags', 0.72), 1e9, PCX, 470);
        else {
          const s0 = at('down') + 0.2;
          stBags.set(t >= s0 ? P(t, s0, 0.35, linear) : 0); tr(stBags, PCX, 424, 0.42);
          op(cCoins, 1 - P(t, mid('down', 0.15), 0.25, linear)); op(cLols, 1 - P(t, mid('down', 0.15), 0.25, linear));
          popSet(cBreak, t, mid('down', 0.2), 1e9, PCX, 152);
          popSet(cLeft, t, mid('down', 0.6), 1e9, PCX, 484);
        }
      } else {
        op(cCoins, 1); op(cLols, 1);
        op(wkH, 1); wkH.set(0);
        [0.02, 0.14, 0.27].forEach((f, i) => wkH.show(i, P(t, mid('hcf', f), 0.35, linear)));
        bags12.forEach((g, i) => { const p = P(t, mid('hcf', 0.45) + i * 0.05, 0.35, pop); op(g, clamp(p * 3)); tr(g.firstChild, 0, 0, Math.max(0.01, p)); });
        op(each1, P(t, mid('hcf', 0.7), 0.3, linear)); op(each2, P(t, mid('hcf', 0.84), 0.3, linear));
      }
    }

    /* ===== sense (Ah Boy, Kavya) ===== */
    if (t >= cSense && t < cSis) {
      put(boy, 'boy', SA, SY + 6, { talk: 0, mood: 'neutral', look: -0.9 });
      put(kav, 'kav', SB, SY, { talk: 0, mood: t > mid('sense', 0.85) ? 'smug' : 'neutral', look: -0.9 });
      op(senseG, 1);
      const p1 = P(t, at('sense') + 0.1, 0.35, easeOut), p2 = P(t, mid('sense', 0.55), 0.35, easeOut);
      op(sense1, p1); tr(sense1, 0, 16 * (1 - p1)); op(sense2, p2); tr(sense2, 0, 16 * (1 - p2));
    }

    /* ===== sisters (Paati, Kavya) ===== */
    if (t >= cSis) {
      put(paati, 'paati', SA, 418, { talk: scTalk(S, t, 'paati'), mood: t > mid('sisters', 0.55) ? 'smug' : 'happy', look: t > end('sisters') ? -0.3 : 0.9 });
      put(kav, 'kav', SB, SY, { talk: 0, mood: t > end('sisters') ? 'happy' : 'neutral', look: -0.9 });
      op(sisG, 1);
      const arrive = P(t, at('sisters') + 0.1, 0.9, easeOut);
      op(busA, 1); op(busB, 1);
      tr(busA, lerp(1300, 840, arrive), 262, 1.25); tr(busB, lerp(1450, 1000, arrive), 262, 1.25);
      const ap = P(t, mid('sisters', 0.3), 0.4, easeOut);
      tr(aunt1, 690, lerp(640, 432, ap), 0.6); tr(aunt2, 900, lerp(640, 432, ap), 0.6);
      aunt1.set({ t, talk: 0, mood: t > mid('sisters', 0.6) ? 'annoyed' : 'deadpan', look: -1 });
      aunt2.set({ t, talk: 0, mood: t > mid('sisters', 0.6) ? 'annoyed' : 'deadpan', look: 1 });
      popSet(c736, t, at('sisters') + 0.2, 1e9, 615, 152);
    }

    op(paati, vis.paati); op(kav, vis.kav); op(boy, vis.boy); op(dad, vis.dad); op(mum, vis.mum); op(two, vis.two);
  };
});
