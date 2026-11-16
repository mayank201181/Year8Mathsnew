/* Scene 4: Hattie and Lottie (HCF and LCM).
   One set, the void deck at 6:45 p.m.: Mum (left end) and Dad (right end) behind the party table, not speaking; Kavya
   between them on the left; a dark board top left; the cups (Mum's) and plates (Dad's) stacked on the table.
   cups: 6:45 p.m., 60 cups, 72 plates -> tables: Mum's two factor lists, the common factors ringed, highest 12,
   "10 min" -> hattie: the Venn twins pop up over the right half (lower third), "a Venn diagram of prime factors"
   -> lottie: Lottie looks away, Hattie hurt -> sixty: 60 = 2² × 3 × 5, chips 2 2 3 5 in Hattie -> seventy:
   72 = 2³ × 3², chips 2 2 2 3 3 in Lottie -> share: 2 & 2, 2 & 2, 3 & 3 slide into the middle; leftovers 5 | 2, 3
   -> hcf: the heart glows, HCF = 2 × 2 × 3 = 12, "HCF is the Heart" -> twelve (cut): 12 little tables, each 5 cups
   and 6 plates, 60 ÷ 12 = 5, 72 ÷ 12 = 6, Mum ticks her plan -> lcm: everything glows, LCM = 5 × 2 × 2 × 3 × 2 × 3
   = 360, "LCM is the Lot" -> lows: HCF = 2² × 3, LCM = 2³ × 3² × 5 -> product: 12 × 360 = 4320 = 60 × 72, boxed
   HCF × LCM = a × b -> dad: Dad smug, 6 × 8 = 48 -> listm: Priya pops up: multiples of 8, 6 goes into 24,
   LCM(6, 8) = 24, NOT ON THE LIST on the 48; the twins show 6 and 8 sharing a 2 -> nine: 4 × 9 = 36; the twins
   show 4 and 9 with an empty middle -> right: LCM(4, 9) = 36 ✓, confetti, Dad shock -> hands: his calculator hand
   bobs about; Mum's eyebrows go up. */
scene('venn', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const pill = (parent, text, o) => { o = o || {}; return mkChip(parent, text, { size: o.size || 30, col: o.col || C.ink }); };
  const popSet = (el, t, t0, t1, x, y) => { const p = t >= t0 && t < t1 ? P(t, t0, 0.35, linear) : 0; el.set(p); if (x !== undefined) tr(el, x, y); };
  const fadeIn = (t, t0, t1) => (t >= t0 && t < (t1 === undefined ? 1e9 : t1) ? P(t, t0, 0.3, linear) : 0);
  const GOLD = '#FFE45C', PINK = '#FF8FC8', GREEN = '#56D69B', RED = '#FF6B6B', BLUE = '#6EC8FF', YEL = '#FFC247', LIL = '#C9B6FF';

  /* layers */
  const Lbg = G(root), Lboard = G(root), Lcast = G(root), Lfront = G(root), Lvenn = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= the void deck ================= */
  const vd = fmVoid(Lbg);
  Lfront.appendChild(vd.front); Lfront.appendChild(vd.top);

  // Mum's cups and Dad's plates on the table
  const cupsG = G(vd.top), platesG = G(vd.top);
  let cd = '', cr = '';
  for (let k = 0; k < 4; k++) for (let j = 0; j < 7; j++) { const x = 520 + k * 38, y = 528 - j * 9; cd += `M${x - 14},${y - 18} L${x + 14},${y - 18} L${x + 10},${y} L${x - 10},${y} Z `; cr += `M${x - 14},${y - 18} L${x + 14},${y - 18} `; }
  E('path', { d: cd, fill: '#FFFFFF', stroke: '#7D8A96', 'stroke-width': 2 }, cupsG);
  E('path', { d: cr, stroke: '#E8424F', 'stroke-width': 3 }, cupsG);
  let pd = '';
  for (let k = 0; k < 3; k++) for (let j = 0; j < 9; j++) { const x = 900 + k * 66, y = 526 - j * 6; pd += `M${x - 30},${y} a30,7 0 1 0 60,0 a30,7 0 1 0 -60,0 Z `; }
  E('path', { d: pd, fill: '#FFF3C2', stroke: '#B8912A', 'stroke-width': 2 }, platesG);

  /* ================= the board (top left) ================= */
  const BX0 = 28, BX1 = 612, BY0 = 108, BY1 = 338;
  const board = G(Lboard);
  E('rect', { x: BX0 + 6, y: BY0 + 6, width: BX1 - BX0, height: BY1 - BY0, rx: 18, fill: 'rgba(0,0,0,0.3)' }, board);
  E('rect', { x: BX0, y: BY0, width: BX1 - BX0, height: BY1 - BY0, rx: 18, fill: '#12222E', stroke: '#8FA3B8', 'stroke-width': 4 }, board);

  // A: Mum's two lists of factors
  const lists = G(board);
  const F60 = [1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60], F72 = [1, 2, 3, 4, 6, 8, 9, 12, 18, 24, 36, 72], COMMON = [1, 2, 3, 4, 6, 12];
  const LS = 30;
  T(lists, 326, 150, "Mum's lists", { size: 28, weight: 700, anchor: 'middle', fill: '#FFC2E0' });
  const ringsC = [], rings12 = [];
  const listRow = (label, nums, y, col) => {
    const gap = textWidth(',', LS, FD, 700) + LS * 0.38;
    const lw = textWidth(label, LS, FD, 800) + 16;
    let w = lw;
    nums.forEach((n, i) => { w += textWidth(String(n), LS, FD, 700) + (i < nums.length - 1 ? gap : 0); });
    let x = 326 - w / 2;
    T(lists, x, y, label, { size: LS, weight: 800, fill: col });
    x += lw;
    nums.forEach((n, i) => {
      const s = String(n), tw = textWidth(s, LS, FD, 700);
      T(lists, x, y, s + (i < nums.length - 1 ? ',' : ''), { size: LS, weight: 700, fill: C.ink });
      if (COMMON.includes(n)) {
        const r = E('ellipse', { cx: x + tw / 2, cy: y - 10, rx: tw / 2 + 7, ry: 21, fill: 'none', stroke: n === 12 ? GOLD : PINK, 'stroke-width': n === 12 ? 4.5 : 3 }, lists);
        (n === 12 ? rings12 : ringsC).push(r);
      }
      x += tw + gap;
    });
  };
  listRow('60:', F60, 212, BLUE);
  listRow('72:', F72, 280, YEL);
  const cHigh = pill(Lfg, 'highest common factor: **12**', { col: GOLD, size: 30 });
  const cTen = pill(Lfg, '⏱ **10 min**', { col: RED, size: 30 });

  // B: the prime factors, the HCF and the LCM
  const EQX = 196;
  const W1 = mkWorking(board, EQX, 128, [{ m: '60 = 2^2 * 3 * 5', col: BLUE }, { m: '72 = 2^3 * 3^2', col: YEL }, { m: 'HCF = 2 * 2 * 3 = 12', col: PINK }, { m: 'LCM = 5 * 2 * 2 * 3 * 2 * 3 = 360', col: GOLD }], { size: 32, gap: 16 });
  const W2 = mkWorking(board, EQX, 128, [{ m: '60 = 2^2 * 3 * 5', col: BLUE }, { m: '72 = 2^3 * 3^2', col: YEL }, { m: 'HCF = 2^2 * 3 = 12', col: PINK }, { m: 'LCM = 2^3 * 3^2 * 5 = 360', col: GOLD }], { size: 32, gap: 16 });
  // twelve: sharing out
  const WT = mkWorking(board, 300, 150, ['60 ÷ 12 = 5', '72 ÷ 12 = 6'], { size: 40, gap: 22 });
  const WTn1 = mkText(board, WT.right + 18, WT.lineY[0], 'cups', { size: 32, fill: BLUE }), WTn2 = mkText(board, WT.right + 18, WT.lineY[1], 'plates', { size: 32, fill: YEL });
  // product
  const WP = G(board);
  const WPw = mkWorking(WP, 326, 132, ['12 * 360 = 4320', '60 * 72 = 4320'], { size: 38, gap: 18 });
  const boxR = G(WP);
  const boxM = mkMath(boxR, 326, 300, '"HCF" * "LCM" = a * b', { size: 40, anchor: 'middle', fill: GREEN });
  E('rect', { x: 326 - boxM.w / 2 - 18, y: 300 - boxM.a - 12, width: boxM.w + 36, height: boxM.a + boxM.d + 24, rx: 12, fill: 'none', stroke: GREEN, 'stroke-width': 4 }, boxR);
  // C: Dad and Priya, 6 and 8
  const WC = G(board);
  const c1 = mkMath(WC, 220, 160, '6 * 8 = 48', { size: 40, anchor: 'middle', fill: '#9FE0B5' });
  const c2 = mkText(WC, 326, 214, 'multiples of 8: 8, 16, **24**', { size: 32, anchor: 'middle', boldFill: GOLD });
  const c3 = mkText(WC, 326, 262, '**6** goes into **24** ✓', { size: 32, anchor: 'middle', boldFill: GOLD });
  const c4 = mkMath(WC, 326, 318, 'LCM(6, 8) = 24', { size: 40, anchor: 'middle', fill: GOLD });
  const c4r = E('rect', { x: 326 - c4.w / 2 - 14, y: 318 - c4.a - 8, width: c4.w + 28, height: c4.a + c4.d + 16, rx: 10, fill: 'none', stroke: GOLD, 'stroke-width': 4 }, WC);
  const c1s = strike(WC, 220 - c1.w / 2 - 8, 146, 220 + c1.w / 2 + 8, RED);
  const stNot = fmStamp(Lfg, 'not');
  // D: 4 and 9
  const WD = G(board);
  const d1 = mkMath(WD, 326, 172, '4 * 9 = 36', { size: 44, anchor: 'middle', fill: '#9FE0B5' });
  const d2 = mkText(WD, 326, 238, '{{4 = 2^2}}, {{9 = 3^2}}: **no** shared primes', { size: 30, anchor: 'middle', boldFill: RED });
  const d3 = mkMath(WD, 300, 310, 'LCM(4, 9) = 36', { size: 44, anchor: 'middle', fill: GREEN });
  const d3t = tick(WD, 20); tr(d3t, 300 + d3.w / 2 + 38, 296);

  /* ================= twelve: the table plan ================= */
  const plan = G(Lboard);
  E('rect', { x: 636, y: 108, width: 470, height: 238, rx: 18, fill: '#12222E', stroke: '#8FA3B8', 'stroke-width': 4 }, plan);
  mkText(plan, 871, 148, '**12** tables, each **5** cups + **6** plates', { size: 28, anchor: 'middle', boldFill: GOLD });
  const minis = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) {
    const g = G(plan), cx = 706 + c * 110, cy = 196 + r * 56;
    E('rect', { x: cx - 50, y: cy - 4, width: 100, height: 24, rx: 6, fill: '#FFFDF6', stroke: '#9C927C', 'stroke-width': 2.5 }, g);
    let cu = '', pl = '';
    for (let i = 0; i < 5; i++) { const x = cx - 40 + i * 20; cu += `M${x - 7},${cy - 22} L${x + 7},${cy - 22} L${x + 5},${cy - 6} L${x - 5},${cy - 6} Z `; }
    for (let i = 0; i < 6; i++) { const x = cx - 43 + i * 17; pl += `M${x - 8},${cy + 9} a8,4 0 1 0 16,0 a8,4 0 1 0 -16,0 Z `; }
    E('path', { d: cu, fill: '#CFE3FF', stroke: '#2E7DD8', 'stroke-width': 1.5 }, g);
    E('path', { d: pl, fill: '#FFF3C2', stroke: '#B8912A', 'stroke-width': 1.5 }, g);
    minis.push(g);
  }
  const cTick = pill(Lfg, '✓ **equal**', { col: GREEN, size: 30 });

  /* ================= the Venn twins and their primes ================= */
  const VX = 850, VY = 298, VS = 0.88;
  E('rect', { x: VX - 258 * VS, y: VY - 168 * VS, width: 516 * VS, height: 336 * VS, rx: 18, fill: '#1B2A36', opacity: 0.94 }, Lvenn);
  const venn = cast(Lvenn, 'venn');
  const vp = (lx, ly) => [VX + lx * VS, VY + ly * VS];
  const primeChip = (txt) => {
    const g = G(Lvenn), inner = G(g);
    E('circle', { r: 22, fill: GREEN, stroke: '#1E7A4A', 'stroke-width': 3 }, inner);
    T(inner, 0, 11, txt, { size: 30, weight: 800, anchor: 'middle', fill: '#0E2A1A' });
    g.inner = inner; return g;
  };
  const chipPop = (c, p) => { tr(c.inner, 0, 0, Math.max(0.01, 0.5 + 0.5 * pop(clamp(p)))); return p > 0 ? clamp(p * 3) : 0; };
  const L = [[-180, 20], [-120, 20], [-180, 82], [-120, 82]];
  const R = [[120, 20], [180, 20], [120, 82], [180, 82], [150, 140]];
  const M = [[0, -6], [0, 50], [0, 106]];
  const P60 = ['2', '2', '3', '5'].map(primeChip), P72 = ['2', '2', '2', '3', '3'].map(primeChip);
  const PAIR = [[0, 0, 0], [1, 1, 1], [2, 3, 2]];   // [60 chip, 72 chip, middle slot]
  const P68 = [['3', [-150, 50]], ['2', [0, 50]], ['2', [125, 50]], ['2', [180, 50]]].map(([s, p]) => { const c = primeChip(s); c.home = p; return c; });
  const P49 = [['2', [-180, 50]], ['2', [-120, 50]], ['3', [125, 50]], ['3', [180, 50]]].map(([s, p]) => { const c = primeChip(s); c.home = p; return c; });
  const setLab = (a, b) => { const g = G(Lvenn); const [x1, y1] = vp(-236, -134), [x2, y2] = vp(236, -134); T(g, x1, y1 + 10, a, { size: 34, weight: 800, anchor: 'middle', fill: '#CFEFFF' }); T(g, x2, y2 + 10, b, { size: 34, weight: 800, anchor: 'middle', fill: '#FFE7B0' }); return g; };
  const lab72 = setLab('60', '72'), lab68 = setLab('6', '8'), lab49 = setLab('4', '9');
  const emptyMid = G(Lvenn);
  { const [x, y] = vp(0, 50); T(emptyMid, x, y + 14, '∅', { size: 40, weight: 800, anchor: 'middle', fill: '#FFFFFF' }); }

  const cVenn = pill(Lfg, 'a Venn diagram of **prime factors**', { col: LIL, size: 30 });
  const cHeart = pill(Lfg, '**HCF** is the **Heart**', { col: PINK, size: 32 });
  const cLot = pill(Lfg, '**LCM** is the **Lot**', { col: GOLD, size: 32 });
  const cLows = pill(Lfg, 'HCF takes the **lows**, LCM takes the **highs**', { col: GOLD, size: 28 });
  const cMul = pill(Lfg, '× **just multiply them**', { col: '#9FE0B5', size: 30 });
  const cTwice = pill(Lfg, '{{6 × 8}} counts the shared **2** twice', { col: RED, size: 28 });
  const cNone = pill(Lfg, 'no shared primes ⇒ **LCM = product**', { col: GREEN, size: 28 });
  const c645 = pill(Lfg, '**6:45 p.m.**', { col: GOLD, size: 34 });
  const cCups = pill(Lfg, '**60** cups', { col: BLUE, size: 32 });
  const cPlates = pill(Lfg, '**72** plates', { col: YEL, size: 32 });

  // confetti for Dad being right
  const conf = G(Lfg), confs = [];
  const rc = rng(36);
  for (let i = 0; i < 40; i++) confs.push({ el: E('rect', { x: -6, y: -3, width: 12, height: 6, fill: ['#FFE45C', '#FF8FC8', '#56D69B', '#6EC8FF', '#FF8A3D'][i % 5] }, conf), x: 650 + rc() * 540, v: 120 + rc() * 120, r0: rc() * 360, d: rc() * 0.6 });
  const bigTick = tick(Lfg, 34);

  /* ================= the cast ================= */
  const mum = cast(Lcast, 'mum');
  const kav = cast(Lcast, 'kavya');
  const priya = cast(Lcast, 'priya');
  const dad = cast(Lcast, 'dad');
  const lt = fmLowerThird(Lhud, 'venn');
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  const HS = 0.76, HY = 470;
  const X = { mum: 112, kavya: 300, priya: 470, dad: 1135, hattie: 850, lottie: 850 };
  const lookAt = (x, who) => (who && X[who] !== undefined && X[who] !== x ? clamp((X[who] - x) / 260, -1, 1) : 0);
  const put = (c, x, k) => { op(c, k > 0.001 ? 1 : 0); tr(c, x, lerp(HY + 260, HY, k), HS); };

  /* timings */
  const cutT = at('twelve') - 0.06, backT = at('lcm') - 0.06;
  const vennT = at('hattie') - 0.1, cPhase = at('dad') - 0.06;

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    vd.upd(t);
    const who = scWho(S, t);
    const sT = on(t, cutT, backT);          // the twelve tables shot
    const phC = t >= cPhase ? 1 : 0;

    /* ---------- the board ---------- */
    op(lists, t < at('sixty') ? P(t, at('tables') - 0.1, 0.3, linear) * (1 - P(t, at('sixty') - 0.3, 0.25, linear)) : 0);
    ringsC.forEach((r, i) => op(r, P(t, mid('tables', 0.4) + i * 0.06, 0.2, linear)));
    rings12.forEach(r => op(r, P(t, mid('tables', 0.6), 0.2, linear)));
    popSet(cHigh, t, mid('tables', 0.62), at('hattie'), 790, 384);
    popSet(cTen, t, mid('tables', 0.86), at('hattie'), 790, 450);
    // B: the working
    const wOn = t >= at('sixty') && !sT && t < at('product') ? 1 : 0;
    op(W1, wOn); op(W2, wOn && t >= at('lows') ? 1 : 0);
    const lowsP = P(t, mid('lows', 0.15), 0.3, linear);
    W1.show(0, P(t, mid('sixty', 0.2), 0.3, linear));
    W1.show(1, P(t, mid('seventy', 0.15), 0.3, linear));
    W1.show(2, P(t, mid('hcf', 0.3), 0.3, linear) * (1 - lowsP));
    W1.show(3, P(t, mid('lcm', 0.35), 0.3, linear) * (1 - lowsP));
    W2.show(0, 0); W2.show(1, 0); W2.show(2, lowsP); W2.show(3, P(t, mid('lows', 0.55), 0.3, linear));
    W2.ring(2, P(t, mid('lows', 0.4), 0.2, linear)); W2.ring(3, P(t, mid('lows', 0.8), 0.2, linear));
    op(WT, sT); WT.show(0, P(t, mid('twelve', 0.3), 0.3, linear)); WT.show(1, P(t, mid('twelve', 0.5), 0.3, linear));
    op(WTn1, sT * P(t, mid('twelve', 0.35), 0.3, linear)); op(WTn2, sT * P(t, mid('twelve', 0.55), 0.3, linear));
    op(WP, t >= at('product') && !phC ? 1 : 0);
    WPw.show(0, P(t, mid('product', 0.05), 0.3, linear)); WPw.show(1, P(t, mid('product', 0.38), 0.3, linear));
    op(boxR, P(t, mid('product', 0.66), 0.3, linear));
    const cOn = phC && t < at('nine') - 0.06 ? 1 : 0;
    op(WC, cOn);
    op(c1, P(t, mid('dad', 0.4), 0.3, linear)); op(c2, P(t, mid('listm', 0.08), 0.3, linear)); op(c3, P(t, mid('listm', 0.35), 0.3, linear));
    op(c4, P(t, mid('listm', 0.45), 0.3, linear)); op(c4r, P(t, mid('listm', 0.55), 0.3, linear));
    stNot.set(cOn && t >= mid('listm', 0.58) ? P(t, mid('listm', 0.58), 0.35, linear) : 0); tr(stNot, 446, 156, 0.4);
    c1s.set(P(t, mid('listm', 0.58), 0.25, linear));
    const dOn = t >= at('nine') - 0.06 ? 1 : 0;
    op(WD, dOn);
    op(d1, P(t, mid('nine', 0.2), 0.3, linear)); op(d2, P(t, mid('right', 0.05), 0.3, linear));
    op(d3, P(t, mid('right', 0.3), 0.3, linear));
    const tkp = P(t, mid('right', 0.55), 0.3, pop); op(d3t, clamp(tkp * 3)); tr(d3t, 300 + d3.w / 2 + 38, 296, Math.max(0.01, tkp));

    /* ---------- the table plan (cut) ---------- */
    op(plan, sT);
    minis.forEach((g, i) => { const p = P(t, cutT + 0.15 + i * 0.09, 0.3, pop); op(g, clamp(p * 3)); });
    popSet(cTick, t, mid('twelve', 0.75), backT, 300, 300);
    op(cupsG, 1); op(platesG, 1);

    /* ---------- the Venn twins ---------- */
    const vIn = P(t, vennT, 0.45, pop);
    op(Lvenn, sT ? 0 : vIn > 0.001 ? 1 : 0);
    tr(venn, VX, VY, Math.max(0.01, VS * vIn));
    let hm = 'happy', hl = -0.4, lm = 'deadpan', ll = -0.4;
    if (t >= at('lottie') && t < at('sixty')) { hm = t > mid('lottie', 0.5) ? 'sad' : 'happy'; hl = 1; lm = 'annoyed'; ll = 1; }
    else if (who === 'hattie') { hm = 'happy'; hl = 0.3; lm = 'deadpan'; ll = -1; }
    else if (who === 'lottie') { hm = 'happy'; hl = 1; lm = 'deadpan'; ll = -0.3; }
    else if (who) { hl = lookAt(790, who); ll = lookAt(910, who); }
    if (t >= at('hcf') && t < at('twelve')) hm = 'happy';
    if (t >= at('dad') && t < at('right')) { hm = 'deadpan'; lm = 'deadpan'; }
    if (t >= at('right')) { hm = 'happy'; lm = t >= at('hands') ? 'smug' : 'happy'; }
    venn.set({ t, talk: scTalk(S, t, 'hattie'), talkB: scTalk(S, t, 'lottie'), mood: hm, look: hl, moodB: lm, lookB: ll });
    venn.hl('mid', t >= at('hcf') && t < at('lcm') ? P(t, mid('hcf', 0.15), 0.4, linear) : t >= at('lows') && t < cPhase ? 0.5 : 0);
    venn.hl('all', t >= at('lcm') && t < at('lows') ? P(t, mid('lcm', 0.15), 0.4, linear) : 0);
    lt.set(win(t, at('hattie') + 0.1, at('hattie') + 3.3, 0.3));
    // labels
    op(lab72, P(t, at('sixty'), 0.3, linear) * (1 - P(t, cPhase, 0.25, linear)));
    op(lab68, fadeIn(t, mid('listm', 0.76), at('nine')));
    op(lab49, fadeIn(t, mid('nine', 0.2)));
    op(emptyMid, fadeIn(t, mid('nine', 0.6)));
    // 60 and 72
    const gone = 1 - P(t, cPhase, 0.25, linear);
    const share = j => P(t, mid('share', 0.1 + j * 0.15), 0.5, ease);
    P60.forEach((c, i) => {
      const pr = PAIR.find(q => q[0] === i), sp = pr ? share(PAIR.indexOf(pr)) : 0;
      const a = vp(L[i][0], L[i][1]), b = pr ? vp(M[pr[2]][0], M[pr[2]][1]) : a;
      const vis = chipPop(c, t >= mid('sixty', 0.35) + i * 0.12 ? P(t, mid('sixty', 0.35) + i * 0.12, 0.35, linear) : 0);
      op(c, vis * gone);
      const lift = Math.sin(Math.PI * sp) * 20;
      tr(c, lerp(a[0], b[0], sp), lerp(a[1], b[1], sp) - lift);
      if (i === 3) tr(c.inner, 0, 0, 1 + 0.25 * Math.sin(Math.PI * P(t, mid('share', 0.62), 0.5, linear)));
    });
    P72.forEach((c, i) => {
      const pr = PAIR.find(q => q[1] === i), sp = pr ? share(PAIR.indexOf(pr)) : 0;
      const a = vp(R[i][0], R[i][1]), b = pr ? vp(M[pr[2]][0], M[pr[2]][1]) : a;
      const vis = chipPop(c, t >= mid('seventy', 0.3) + i * 0.1 ? P(t, mid('seventy', 0.3) + i * 0.1, 0.35, linear) : 0);
      const lift = Math.sin(Math.PI * sp) * 20;
      tr(c, lerp(a[0], b[0], sp), lerp(a[1], b[1], sp) - lift);
      // once a pair meets in the middle, the two chips become one
      let o = vis;
      if (pr && sp > 0.92) o = 0;
      op(c, o * gone);
      if (i === 2 || i === 4) tr(c.inner, 0, 0, 1 + 0.25 * Math.sin(Math.PI * P(t, mid('share', 0.8), 0.5, linear)));
    });
    // 6 and 8; then 4 and 9
    P68.forEach((c, i) => { const p = t < at('nine') && t >= mid('listm', 0.8) ? P(t, mid('listm', 0.8) + i * 0.05, 0.3, linear) : 0; op(c, chipPop(c, p)); const q = vp(c.home[0], c.home[1]); tr(c, q[0], q[1]); });
    P49.forEach((c, i) => { const p = t >= mid('nine', 0.3) ? P(t, mid('nine', 0.3) + i * 0.08, 0.3, linear) : 0; op(c, chipPop(c, p)); const q = vp(c.home[0], c.home[1]); tr(c, q[0], q[1]); });

    /* chips above the twins */
    const CY = 122;
    popSet(cVenn, t, mid('hattie', 0.5), at('sixty'), VX, CY);
    popSet(cHeart, t, mid('hcf', 0.75), cutT, VX, CY);
    popSet(cLot, t, mid('lcm', 0.75), at('lows'), VX, CY);
    popSet(cLows, t, mid('lows', 0.2), at('product') + 0.2, VX - 20, CY);
    popSet(cMul, t, mid('dad', 0.6), at('listm'), VX, CY);
    popSet(cTwice, t, mid('listm', 0.85), at('nine'), VX, CY);
    popSet(cNone, t, mid('right', 0.2), 1e9, VX, CY);
    popSet(c645, t, mid('cups', 0.04), at('tables'), 326, 200);
    popSet(cCups, t, mid('cups', 0.3), at('tables'), 580, 410);
    popSet(cPlates, t, mid('cups', 0.5), at('tables'), 966, 410);
    // confetti and the big tick for Dad
    const cf = t >= mid('right', 0.55) ? t - mid('right', 0.55) : -1;
    op(conf, cf >= 0 && cf < 4.5 ? 1 - P(cf, 3.6, 0.9, linear) : 0);
    confs.forEach(c => { const tt = Math.max(0, cf - c.d); tr(c.el, c.x + Math.sin(tt * 3 + c.r0) * 18, 90 + tt * c.v, 1, c.r0 + tt * 240); });
    const btp = P(t, mid('right', 0.6), 0.35, pop); op(bigTick, clamp(btp * 3)); tr(bigTick, X.dad, 296, Math.max(0.01, btp));

    /* ---------- the humans ---------- */
    // Mum
    put(mum, X.mum, 1);
    let mm = 'neutral', ml = lookAt(X.mum, who), msw = 0;
    if (t < at('tables')) { mm = 'annoyed'; ml = -1; }
    else if (t < at('hattie')) { mm = t > mid('tables', 0.82) ? 'sad' : 'neutral'; ml = t > mid('tables', 0.82) ? 0 : 0.5; msw = t > mid('tables', 0.82) ? 1 : 0; }
    else if (t < mid('hattie', 0.4)) { mm = 'shock'; ml = 1; }
    else if (t >= at('twelve') && t < backT) { mm = 'happy'; }
    else if (t >= at('dad') && t < at('right')) { mm = 'annoyed'; ml = 1; }
    else if (t >= at('right') && t < at('hands')) { mm = 'deadpan'; ml = 1; }
    else if (t >= at('hands')) { mm = 'shock'; ml = 1; }
    mum.set({ t, talk: scTalk(S, t, 'mum'), mood: mm, look: ml, sweat: msw, lift: (t >= at('tables') && t < at('hattie')) || (sT && t > mid('twelve', 0.7)) ? 1 : 0 });
    // Kavya
    put(kav, X.kavya, 1);
    let km = 'neutral', kl = lookAt(X.kavya, who);
    if (who === 'kavya') { km = 'happy'; kl = t >= at('product') ? -0.3 : 0.6; }
    else if (t < at('tables')) kl = 1;
    else if (t >= at('hattie') && t < at('sixty')) { km = t < at('lottie') ? 'happy' : 'deadpan'; kl = 1; }
    else if (t >= at('dad') && t < at('right')) { km = 'deadpan'; kl = 1; }
    else if (t >= at('hands')) { km = 'smug'; kl = 1; }
    if (t >= at('right') && t < end('right')) km = t > mid('right', 0.7) ? 'shock' : 'neutral';
    kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
    // Priya: pops up for the multiples
    const pUp = P(t, at('listm') - 0.35, 0.4, pop);
    put(priya, X.priya, pUp);
    let pm = 'smug', pl = lookAt(X.priya, who);
    if (who === 'priya') { pm = t > mid('listm', 0.55) && t < mid('listm', 0.75) ? 'happy' : 'smug'; pl = 1; }
    else if (t >= at('nine') && t < at('right')) { pm = 'deadpan'; pl = 1; }
    else if (t >= at('right')) { pm = 'shock'; pl = 1; }
    if (t >= at('hands')) pm = 'happy';
    priya.set({ t, talk: scTalk(S, t, 'priya'), mood: pm, look: pl, lift: who === 'priya' ? 1 : 0 });
    // Dad
    put(dad, X.dad, 1);
    let dm = 'neutral', dl = lookAt(X.dad, who), dlift = 0;
    if (t < at('tables')) { dm = 'annoyed'; dl = 1; }
    else if (t < at('hattie')) { dm = 'deadpan'; dl = 1; }
    else if (t >= at('dad') && t < at('listm')) { dm = 'smug'; dl = -0.5; dlift = 1; }
    else if (t >= at('listm') && t < at('nine')) { dm = t > mid('listm', 0.58) ? 'sad' : 'neutral'; dl = -1; }
    else if (t >= at('nine') && t < at('right')) { dm = 'smug'; dl = -0.5; dlift = 1; }
    else if (t >= at('right') && t < at('hands')) { dm = t > mid('right', 0.6) ? 'shock' : 'neutral'; dl = -1; }
    else if (t >= at('hands')) { dm = t > mid('hands', 0.75) ? 'happy' : 'shock'; dl = 0; dlift = 0.5 + 0.5 * Math.sin((t - at('hands')) * 7); }
    dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: dl, lift: dlift });
  };
});
