/* Scene 6: Need. More. Trials. (experiments & relative frequency)
   Shots (hard sitcom cuts; the working board sits on the right, the family behind the coffee table on the left):
   A  5 p.m.: Ah Boy drops a bottle cap on the table, Kavya watches -> board: "top up / top down, so 1/2" ->
      Dr Freq pops up on the table (lower third), counter clicking: no theory? experiment! -> the formula
      relative frequency = times it happened / number of trials -> 10 drops, tally 7 top up: 7/10 = 0.7.
   B  Dad accuses Priya: she has won every game, her red "lucky" dice is biased?
   C  board: 300 rolls, 1/6 x 300 = 50 expected each, the dashed line at 50 -> the bars grow 41 44 39 42 39 ... 95
      -> Kavya: 95/300 = 0.32 vs 1/6 = 0.17, nearly double: biased -> Priya close-up: lucky, not fair.
   D  Mum's paper cup tips on its side: the results table (9/20, 18/50, 47/130) -> Dr Freq: don't average
      (0.39, crossed out), pool: 74/200 = 0.37.
   E  8 p.m.: Ah Boy surrounded by tally sheets, the counter at 1000 -> the relative-frequency graph settling
      (0.7, 0.41, 0.384) -> more trials, better estimate: P(top up) = 0.38, not 1/2. */
scene('trials', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);          // hard sitcom cut
  const vis = (el, t, a, b) => op(el, win(t, a, b, 0.18));     // quick fade in and out
  const popSet = (el, t, t0, t1, x, y) => { const p = t >= t0 && t < t1 ? P(t, t0, 0.35, linear) : 0; el.set(p); if (x !== undefined) tr(el, x, y); };
  const popG = (el, t, t0, t1, x, y, s) => {             // a group popped in at (x, y), hidden outside [t0, t1)
    if (t < t0 || t >= t1) { op(el, 0); return 0; }
    const p = P(t, t0, 0.38, pop); op(el, clamp(p * 3)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.7 + 0.3 * p))); return p;
  };
  const chipAt = (parent, text, o) => { o = o || {}; return mkChip(parent, text, Object.assign({ size: 30, col: C.ink }, o)); };
  const GOLD = '#FFE45C', RED = '#D32F2F', GREEN = '#1E9E5A', INK = MK.ink, BLUEK = '#2E6FD8';
  const BX = 925;                                           // board centre x (board x 680-1170, y 110-600)

  /* layers: set, busts behind the table, the table, props on it, the board, foreground chips, HUD */
  const Lset = G(root), Lcast = G(root), Lfront = G(root), Ltop = G(root), Lboard = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= the living room ================= */
  const flat = pbFlat(Lset);
  Lfront.appendChild(flat.front); Ltop.appendChild(flat.top);
  const W0 = flat.win;
  const dusk = E('rect', { x: W0[0], y: W0[1], width: W0[2], height: W0[3], fill: '#0B1530', opacity: 0 }, Lcast);   // evening sky

  // the bottle cap and Priya's red dice on the table, Mum's paper cup
  const cap = pbCap(flat.top);
  const pdice = mkDice(flat.top, 6, { size: 58, col: '#E8424F', pip: '#FFFFFF' });
  const cup = pbCup(flat.top);

  // 8 p.m.: tally sheets taped up all around Ah Boy
  const tallies = G(Lfg);
  const tallySheet = (x, y, rot, rows, w) => {
    const sg = G(tallies); tr(sg, x, y, 1, rot);
    E('rect', { x: -w / 2, y: -rows * 17 - 12, width: w, height: rows * 34 + 24, rx: 4, fill: '#FFFDF6', stroke: '#B9A88E', 'stroke-width': 2.5 }, sg);
    E('rect', { x: -18, y: -rows * 17 - 20, width: 36, height: 14, fill: '#E9DFC8', opacity: 0.9 }, sg);   // tape
    let d = '';
    for (let r = 0; r < rows; r++) {
      const yy = -rows * 17 + r * 34 + 4;
      for (let k = 0; k < Math.floor((w - 20) / 44); k++) {
        const x0 = -w / 2 + 14 + k * 44;
        for (let i = 0; i < 4; i++) d += `M${x0 + i * 7},${yy} v22 `;
        d += `M${x0 - 4},${yy + 19} L${x0 + 26},${yy + 3} `;
      }
    }
    E('path', { d, stroke: BLUEK, 'stroke-width': 3, 'stroke-linecap': 'round' }, sg);
  };
  tallySheet(150, 200, -6, 3, 160); tallySheet(455, 190, 5, 3, 150); tallySheet(120, 360, 4, 4, 140); tallySheet(470, 350, -5, 3, 140);
  tallySheet(300, 625, 0, 2, 300);

  /* ================= the working board (right half) ================= */
  const board = G(Lboard);
  E('rect', { x: 686, y: 116, width: 490, height: 490, rx: 18, fill: 'rgba(0,0,0,0.25)' }, board);
  E('rect', { x: 680, y: 110, width: 490, height: 490, rx: 18, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, board);
  const item = () => G(board);                              // a board item, positioned absolutely inside
  const mathC = (parent, x, y, src, o) => mkMath(parent, x, y, src, Object.assign({ anchor: 'middle', fill: INK, size: 40 }, o || {}));
  const textC = (parent, x, y, str, o) => mkText(parent, x, y, str, Object.assign({ anchor: 'middle', fill: INK, size: 30, boldFill: '#C62828' }, o || {}));
  const xOut = (parent, x, y, w, h) => E('path', { d: `M${x - w / 2},${y - h / 2} L${x + w / 2},${y + h / 2} M${x + w / 2},${y - h / 2} L${x - w / 2},${y + h / 2}`, stroke: RED, 'stroke-width': 7, 'stroke-linecap': 'round' }, parent);

  // boy: Ah Boy's theory
  const bTheory = item();
  textC(bTheory, BX, 168, "**Ah Boy's** theory", { size: 32, boldFill: INK });
  const capU = pbCap(bTheory); tr(capU, BX - 110, 250, 1.1); capU.set(1);
  const capD = pbCap(bTheory); tr(capD, BX + 110, 250, 1.1); capD.set(0);
  textC(bTheory, BX - 110, 325, 'top up', { size: 28 });
  textC(bTheory, BX + 110, 325, 'top down', { size: 28 });
  mathC(bTheory, BX - 110, 392, '1/2', { size: 34, fill: '#B8860B' });
  mathC(bTheory, BX + 110, 392, '1/2', { size: 34, fill: '#B8860B' });
  const bClaim = G(bTheory); mathC(bClaim, BX, 530, 'P("top up") = 1/2', { size: 44 });
  // freq: no theory? experiment!
  const bExp = item();
  textC(bExp, BX, 215, 'No theory?', { size: 42 });
  const expArrow = arrow(bExp, BX, 245, BX, 300, { color: INK, width: 6 });
  textC(bExp, BX, 365, '**Experiment!**', { size: 50, boldFill: GREEN });
  const cTrials = chipAt(bExp, '**Need. More. Trials.**', { size: 34, col: '#FF8A8A' }); tr(cTrials, BX, 490);
  // formula
  const bForm = item();
  textC(bForm, BX, 190, '**relative frequency**', { size: 38, boldFill: BLUEK });
  mathC(bForm, BX + 4, 312, '= "times it happened"/"number of trials"', { size: 38 });
  textC(bForm, BX, 470, 'an **estimate** of the probability', { size: 28, fill: '#5A6670', boldFill: INK });
  // ten: 10 drops, a tally
  const bTen = item();
  textC(bTen, BX, 168, '**10** drops', { size: 34, boldFill: INK });
  textC(bTen, 720, 245, 'top up', { size: 28, anchor: 'start' });
  textC(bTen, 720, 322, 'top down', { size: 28, anchor: 'start' });
  const tUp = mkTally(bTen, 7, { h: 46, col: BLUEK }); tr(tUp, 870, 210);
  const tDn = mkTally(bTen, 3, { h: 46, col: BLUEK }); tr(tDn, 870, 287);
  const tUpN = T(bTen, 1130, 246, '7', { size: 34, weight: 800, anchor: 'end', fill: INK });
  const tDnN = T(bTen, 1130, 323, '3', { size: 34, weight: 800, anchor: 'end', fill: INK });
  const bTenAns = G(bTen);
  textC(bTenAns, BX, 400, 'relative frequency of top up', { size: 28, fill: '#5A6670' });
  mathC(bTenAns, BX, 500, '7/10 = 0.7', { size: 50 });
  // test / results / bias: the 300 rolls
  const bTest = item();
  textC(bTest, BX, 165, "**300** rolls of Priya's dice", { size: 30, boldFill: INK });
  mathC(bTest, BX - 40, 250, '1/6 × 300 = 50', { size: 40 });
  textC(bTest, BX, 318, 'expected for **each** score, if fair', { size: 26, fill: '#5A6670', boldFill: INK });
  const bBias = item();
  const bias1 = G(bBias); mathC(bias1, 835, 200, '95/300 ~= 0.32', { size: 38 });
  const bias2 = G(bBias); mathC(bias2, 835, 296, '1/6 ~= 0.17', { size: 38 });
  const cDouble = chipAt(bBias, 'nearly **double**', { size: 28, col: RED, fill: '#FFF1F0', textCol: RED }); tr(cDouble, 1068, 246);
  // the bar chart (built by hand so each bar can grow on its own beat)
  const chart = item(), CH = { x0: 770, y0: 540, w: 380, h: 190, max: 100 };
  const vals = [41, 44, 39, 42, 39, 95], bars = [], bvals = [];
  const cy = v => CH.y0 - v / CH.max * CH.h, bw = CH.w / 6;
  let gl = '';
  [0, 25, 50, 75, 100].forEach(v => { gl += `M${CH.x0},${cy(v).toFixed(1)} H${CH.x0 + CH.w} `; T(chart, CH.x0 - 10, cy(v) + 9, String(v), { size: 26, anchor: 'end', fill: INK, weight: 600 }); });
  E('path', { d: gl, stroke: MK.gridInk, 'stroke-width': 2 }, chart);
  vals.forEach((v, i) => {
    bars.push(E('rect', { x: CH.x0 + i * bw + bw * 0.17, y: CH.y0, width: bw * 0.66, height: 0, rx: 4, fill: i === 5 ? '#E8424F' : '#F28B8B', stroke: INK, 'stroke-width': 2 }, chart));
    T(chart, CH.x0 + (i + 0.5) * bw, CH.y0 + 32, String(i + 1), { size: 26, anchor: 'middle', fill: INK, weight: 700 });
    bvals.push(T(chart, CH.x0 + (i + 0.5) * bw, i === 5 ? cy(v) - 10 : cy(v) + 30, String(v), { size: 26, anchor: 'middle', fill: i === 5 ? INK : '#FFFFFF', weight: 800 }));
  });
  const ring6 = E('rect', { x: CH.x0 + 5 * bw + bw * 0.08, y: cy(95) - 42, width: bw * 0.84, height: 95 / 100 * CH.h + 46, rx: 10, fill: 'none', stroke: '#F2A900', 'stroke-width': 5 }, chart);
  E('path', { d: `M${CH.x0},${CH.y0 - CH.h - 10} V${CH.y0} H${CH.x0 + CH.w + 6}`, fill: 'none', stroke: INK, 'stroke-width': 4, 'stroke-linecap': 'round' }, chart);
  const line50 = E('path', { d: `M${CH.x0},${cy(50)} H${CH.x0 + CH.w}`, stroke: '#E08A00', 'stroke-width': 4, 'stroke-dasharray': '12 8' }, chart);
  const lab50 = T(chart, CH.x0 + 10, cy(50) - 10, 'expected 50', { size: 26, fill: '#B86E00', weight: 800 });
  const barH = (i, k) => { const hh = vals[i] / CH.max * CH.h * clamp(k); attr(bars[i], 'y', CH.y0 - hh); attr(bars[i], 'height', hh); op(bvals[i], k > 0.97 ? 1 : 0); };
  // cup / pool: the results table
  const bCup = item();
  textC(bCup, BX, 152, 'paper cup lands on its **side**', { size: 28, boldFill: INK });
  const tbl = mkTable(bCup, [['', 'side', 'tosses', 'rel. freq.'], ['Kavya', '9', '20', '0.45'], ['Ah Boy', '18', '50', '0.36'], ['Priya', '47', '130', '0.36'], ['**Total**', '**74**', '**200**', '**0.37**']],
    { size: 28, ink: INK, colW: [120, 84, 108, 150], rowH: 44, side: true, fill: '#FFFFFF', headFill: 'rgba(76,201,240,0.22)' });
  tr(tbl, BX - 231, 170);
  const rfCells = [1, 2, 3].map(r => tbl.cells[r][3]);
  const totCells = [0, 1, 2, 3].map(c => tbl.cells[4][c]);
  const mTot = tbl.mark(4, 1, 'rgba(255,228,92,0.4)'), mTot2 = tbl.mark(4, 2, 'rgba(255,228,92,0.4)');
  const avg = G(bCup);
  mathC(avg, BX - 30, 474, '(0.45 + 0.36 + 0.36)/3 ~= 0.39', { size: 30, fill: '#7A6A70' });
  const avgX = E('path', { d: `M${BX - 205},${486} L${BX + 145},${444}`, stroke: RED, 'stroke-width': 5, 'stroke-linecap': 'round' }, avg);
  const cNoAvg = mkChip(Lfg, "don't **average** them", { size: 30, col: '#FF8A8A' });
  const pooled = G(bCup);
  mathC(pooled, BX, 568, '74/200 = 0.37', { size: 40 });
  const poolRing = E('rect', { x: BX + 22, y: 531, width: 104, height: 52, rx: 10, fill: 'none', stroke: GREEN, 'stroke-width': 4 }, pooled);
  // settle / law: the graph of relative frequency against the number of drops
  const bGraph = item(), GR = { x0: 800, y0: 500, w: 340, h: 260 };
  const gy = v => GR.y0 - v * GR.h, gx = [GR.x0 + 50, GR.x0 + 170, GR.x0 + 290];
  textC(bGraph, BX, 165, "**Ah Boy's** bottle cap", { size: 30, boldFill: INK });
  let gg = '';
  [0, 0.5, 1].forEach(v => { gg += `M${GR.x0},${gy(v).toFixed(1)} H${GR.x0 + GR.w} `; T(bGraph, GR.x0 - 10, gy(v) + 9, v === 0.5 ? '0.5' : String(v), { size: 26, anchor: 'end', fill: INK, weight: 600 }); });
  E('path', { d: gg, stroke: MK.gridInk, 'stroke-width': 2 }, bGraph);
  E('path', { d: `M${GR.x0},${GR.y0 - GR.h - 12} V${GR.y0} H${GR.x0 + GR.w + 6}`, fill: 'none', stroke: INK, 'stroke-width': 4, 'stroke-linecap': 'round' }, bGraph);
  ['10', '100', '1000'].forEach((s, i) => T(bGraph, gx[i], GR.y0 + 32, s, { size: 26, anchor: 'middle', fill: INK, weight: 700 }));
  T(bGraph, GR.x0 + GR.w / 2, GR.y0 + 70, 'number of drops', { size: 26, anchor: 'middle', fill: '#5A6670', weight: 700 });
  const yName = T(bGraph, 0, 0, 'relative frequency', { size: 26, anchor: 'middle', fill: '#5A6670', weight: 700 });
  yName.setAttribute('transform', `translate(716 ${GR.y0 - GR.h / 2}) rotate(-90)`);
  const half = G(bGraph);
  E('path', { d: `M${GR.x0},${gy(0.5)} H${GR.x0 + GR.w}`, stroke: '#E8424F', 'stroke-width': 3, 'stroke-dasharray': '10 8' }, half);
  const pts = [[gx[0], gy(0.7), '0.7', -18], [gx[1], gy(0.41), '0.41', 40], [gx[2], gy(0.384), '0.384', 40]];
  const gLine = mkDash(E('path', { d: `M${pts[0][0]},${pts[0][1]} L${pts[1][0]},${pts[1][1]} L${pts[2][0]},${pts[2][1]}`, fill: 'none', stroke: BLUEK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, bGraph));
  const gPts = pts.map(([x, y, s, dy]) => { const pg = G(bGraph); E('circle', { cx: x, cy: y, r: 10, fill: BLUEK, stroke: INK, 'stroke-width': 3 }, pg); T(pg, x, y + dy, s, { size: 28, anchor: 'middle', fill: INK, weight: 800 }); return pg; });
  const bLaw = G(bGraph);
  E('rect', { x: 690, y: 125, width: 470, height: 66, rx: 12, fill: MK.paper }, bLaw);
  const lawM = mathC(bLaw, BX - 70, 172, 'P("top up") ~= 0.38', { size: 38 });
  const notHalf = G(bLaw); mkText(notHalf, 1092, 172, 'not {{1/2}}', { size: 32, anchor: 'middle', fill: '#D32F2F', weight: 800 });
  const lawRing = E('rect', { x: lawM.x0 + lawM.w - 80, y: 133, width: 92, height: 54, rx: 10, fill: 'none', stroke: GREEN, 'stroke-width': 4 }, bLaw);

  /* ================= chips, cards, the close-up ================= */
  const c5 = chipAt(Lfg, '**5 p.m.**', { col: GOLD, size: 32 });
  const cAcc1 = chipAt(Lfg, 'Priya: won **every** game', { col: GOLD, size: 30 });
  const cAcc2 = chipAt(Lfg, 'lucky dice = **biased**?', { col: '#FF8A8A', size: 30 });
  const cBiased = mkChip(Lfg, 'big gap over **300** rolls ⇒ **biased**', { size: 30, col: '#FF8A8A' });
  const cLucky = chipAt(Lfg, '**lucky**', { size: 34, col: GOLD });
  const cFair = chipAt(Lfg, '**fair**', { size: 34, col: '#FF8A8A' });
  const tickL = tick(Lfg, 18), crossF = cross(Lfg, 18);
  const c8 = chipAt(Lfg, '**8 p.m.**', { col: GOLD, size: 32 });
  const c1000 = chipAt(Lfg, '**1000** drops', { col: '#8FC8FF', size: 32 });
  const cLaw = mkChip(Lfg, '**more trials, better estimate**', { size: 32, col: '#56D69B' });
  const cPool = mkChip(Lfg, '**pool** the totals', { size: 30, col: '#56D69B' });

  /* ================= the cast ================= */
  const boy = cast(Lcast, 'boy');
  const kav = cast(Lcast, 'kavya');
  const dad = cast(Lcast, 'dad');
  const priya = cast(Lcast, 'priya', { prop: null });
  const mum = cast(Lcast, 'mum', { prop: null });
  const freq = cast(Ltop, 'freq');
  const ltFreq = pbLowerThird(Lhud, 'freq');

  /* the bottle cap: drops (x, landing outcome) as a pure function of t */
  const SEQ10 = [1, 0, 1, 1, 1, 0, 1, 1, 0, 1];               // 7 top up in 10 drops
  const rr = rng(66), SEQ = []; for (let i = 0; i < 400; i++) SEQ.push(rr() < 0.38 ? 1 : 0);
  const t10a = at('ten') + 0.1, t10b = mid('ten', 0.6), p10 = (t10b - t10a) / 10;
  function capAt(t) {
    // returns { n: drops completed in the ten-drop run, f: phase 0..1 of the current drop, up: outcome shown }
    if (t >= t10a && t < t10b + p10) {
      const k = Math.floor((t - t10a) / p10), f = ((t - t10a) / p10) % 1;
      return { n: Math.min(10, k + (f > 0.45 ? 1 : 0)), f: k >= 10 ? 1 : f, up: SEQ10[Math.min(9, k)], prev: k > 0 ? SEQ10[k - 1] : 1 };
    }
    const per = t < t10a ? 1.45 : 0.62, k = Math.floor(t / per), f = (t / per) % 1;
    return { n: t < t10a ? 0 : 10, f, up: SEQ[k % 400], prev: SEQ[(k + 399) % 400] };
  }
  function capDraw(t, bx, drop) {
    const c = capAt(t), x = bx + 92;
    if (!drop) { tr(cap, x, 524); cap.set(c.up); return c; }
    const f = c.f;
    if (f < 0.45) {                                         // falling and tumbling
      const q = f / 0.45;
      tr(cap, x + 6 * Math.sin(q * 5), lerp(408, 524, q * q), 1, q * 540 * AMP);
      cap.set(q < 0.5 ? c.prev : 1 - c.prev);
    } else {                                                // landed, bounces once
      const q = (f - 0.45) / 0.55;
      tr(cap, x, 524 - Math.max(0, Math.sin(q * Math.PI * 2)) * 10 * (1 - q) * AMP); cap.set(c.up);
    }
    return c;
  }

  /* cut points */
  const k = id => at(id) - 0.06;
  const cBoy = k('boy'), cAcc = k('accuse'), cTest = k('test'), cBias = k('bias'), cLuck = k('lucky'), cCup = k('cup'), cEight = k('eight'), cSettle = k('settle');
  const XA = 200, XB = 400, YB = 446, SB = 0.85, XF = 572;   // bust slots, Dr Freq on the table

  return t => {
    const sA0 = on(t, -1, cBoy), sA = on(t, cBoy, cAcc), sB = on(t, cAcc, cTest), sC = on(t, cTest, cLuck), sL = on(t, cLuck, cCup),
      sD = on(t, cCup, cEight), sE = on(t, cEight, cSettle), sF = on(t, cSettle, 1e9);
    const show = { boy: 0, kav: 0, dad: 0, priya: 0, mum: 0, freq: 0 };
    const boardOn = sA || sC || sD || sF;

    /* ---------- the room ---------- */
    flat.upd(t, 1);
    const hour = t < cEight ? 5 + t / 30 : 8 + (t - cEight) / 60;
    flat.clock(Math.floor(hour), (hour % 1) * 60);
    flat.flash(0);
    op(dusk, t < cEight ? 0.12 + 0.2 * clamp(t / cEight) : 0.5);

    /* reset everything shown per shot */
    [bTheory, bExp, bForm, bTen, bTest, bBias, chart, bCup, bGraph, tallies, pdice, cup].forEach(e => op(e, 0));
    [c5, cAcc1, cAcc2, cBiased, cNoAvg, cLucky, cFair, c8, c1000, cLaw, cPool].forEach(c => c.set(0));
    op(tickL, 0); op(crossF, 0);
    ltFreq.set(win(t, at('freq') + 0.1, at('freq') + 3.2, 0.3));

    /* ---------- the board ---------- */
    op(board, boardOn);
    if (boardOn && t < cAcc) {                               // pops in on "two ways"
      const bp = P(t, cBoy, 0.3, easeOut);
      board.setAttribute('transform', `translate(${(BX * (1 - (0.85 + 0.15 * bp))).toFixed(1)} ${(355 * (1 - (0.85 + 0.15 * bp))).toFixed(1)}) scale(${(0.85 + 0.15 * bp).toFixed(4)})`);
    } else board.removeAttribute('transform');

    /* ================= A: 5 p.m., the bottle cap ================= */
    if (sA0 || sA) {
      show.boy = 1; show.kav = 1;
      tr(boy, XA, YB + 6, SB); tr(kav, XB, YB, SB);
      const drop = true;
      const c = capDraw(t, XA, drop);
      const bm = t < at('freq') ? 'happy' : t < at('ten') ? 'shock' : 'happy';
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: bm, look: t < at('freq') ? 0.4 : 0.9, lift: c.f < 0.3 ? 1 : 0 });
      let km = 'deadpan', kl = -0.8;
      if (t >= at('freq')) { km = 'neutral'; kl = 0.9; }
      if (t >= at('ten')) { km = 'smug'; kl = -0.6; }
      kav.set({ t, mood: km, look: kl });
      popSet(c5, t, mid('cap', 0.1), cBoy, 900, 230);
      // Dr Freq pops up on the table
      if (t >= at('freq') - 0.3) {
        show.freq = 1;
        const fp = P(t, at('freq') - 0.3, 0.45, pop);
        tr(freq, XF, 450 + 40 * (1 - fp), Math.max(0.01, 0.72 * fp));
        freq.set({ t, talk: scTalk(S, t, 'freq'), mood: t < at('ten') ? 'neutral' : 'happy', look: -0.8, count: c.n, click: c.f < 0.15 && t >= t10a ? 1 : 0 });
      }
      if (sA) {
        vis(bTheory, t, cBoy, at('freq'));
        vis(bExp, t, at('freq'), at('formula'));
        if (t >= at('freq')) expArrow.set(P(t, mid('freq', 0.45), 0.4, easeOut));
        cTrials.set(P(t, mid('freq', 0.62), 0.35, linear));
        vis(bForm, t, at('formula'), at('ten'));
        if (t >= at('ten')) {
          op(bTen, 1);
          const ups = SEQ10.slice(0, c.n).reduce((a, b) => a + b, 0), dns = c.n - ups;
          tUp.set(ups); tDn.set(dns); setText(tUpN, String(ups)); setText(tDnN, String(dns));
          op(bTenAns, P(t, mid('ten', 0.62), 0.25, linear));
        }
      }
    }

    /* ================= B: Dad accuses Priya ================= */
    if (sB) {
      show.priya = 1; show.dad = 1; show.freq = 1;
      tr(priya, XA, YB, SB); tr(dad, XB, YB - 4, SB);
      priya.set({ t, mood: t < mid('accuse', 0.5) ? 'smug' : 'annoyed', look: 0.8 });
      dad.set({ t, talk: scTalk(S, t, 'dad'), mood: 'smug', look: -1, lift: 1 });
      op(pdice, 1); tr(pdice, XA + 92, 518); pdice.set(6, -8);
      tr(freq, XF, 450, 0.72); freq.set({ t, mood: 'shock', look: -0.6, count: 10 });
      popSet(cAcc1, t, mid('accuse', 0.2), cTest, 925, 240);
      popSet(cAcc2, t, mid('accuse', 0.65), cTest, 925, 320);
    }

    /* ================= C: the 300 rolls ================= */
    if (sC) {
      show.freq = 1;
      tr(freq, XF, 450, 0.72);
      op(pdice, 1); tr(pdice, XA + 92, 518); pdice.set(Math.floor(t * 7) % 6 + 1, Math.sin(t * 9) * 20 * AMP);
      const rolls = t < at('results') ? 0 : Math.round(300 * P(t, at('results'), end('results') - at('results') - 0.3, linear));
      freq.set({ t, talk: scTalk(S, t, 'freq'), mood: t < at('bias') ? 'neutral' : 'happy', look: -0.8, count: rolls, click: Math.sin(t * 40) > 0 && rolls > 0 && rolls < 300 ? 1 : 0 });
      op(chart, 1);
      op(line50, 1); op(lab50, 1);
      // the bars: 1-5 one after another, then the 95 sixes
      const r0 = at('results') + 0.2, r1 = mid('results', 0.55);
      for (let i = 0; i < 5; i++) barH(i, P(t, r0 + i * (r1 - r0) / 5, 0.45, easeOut));
      barH(5, P(t, mid('results', 0.58), 0.5, easeOut));
      op(ring6, t >= cBias ? P(t, mid('bias', 0.05), 0.3, linear) : 0);
      if (t < cBias) {
        show.priya = 1; show.dad = 1;
        tr(priya, XA, YB, SB); tr(dad, XB, YB - 4, SB);
        const six = t > mid('results', 0.66);
        priya.set({ t, talk: scTalk(S, t, 'priya'), mood: t < at('results') ? 'smug' : six ? 'shock' : 'smug', look: t < at('results') ? 0.9 : six ? 1 : 0.9 });
        dad.set({ t, mood: six ? 'smug' : 'neutral', look: six ? -0.9 : 0.8 });
        vis(bTest, t, cTest, cBias);
      } else {
        show.priya = 1; show.kav = 1;
        tr(priya, XA, YB, SB); tr(kav, XB, YB, SB);
        priya.set({ t, mood: 'annoyed', look: 0.8 });
        kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: t > mid('bias', 0.8) ? 'smug' : 'neutral', look: 0.9 });
        op(bBias, 1);
        op(bias1, P(t, mid('bias', 0.02), 0.3, linear));
        op(bias2, P(t, mid('bias', 0.3), 0.3, linear));
        op(cDouble, P(t, mid('bias', 0.45), 0.3, linear));
        popSet(cBiased, t, mid('bias', 0.68), cLuck, BX, 645);
      }
    }

    /* ================= the close-up: lucky, not fair ================= */
    if (sL) {
      show.priya = 1; show.dad = 1;
      tr(priya, 330, 420, 1.2); tr(dad, 860, 430, 1.0);
      const pp = P(t, cLuck, end('lucky') - cLuck + 0.6, linear);
      priya.set({ t, talk: scTalk(S, t, 'priya'), mood: 'annoyed', look: 0.7 * (1 - pp) });
      dad.set({ t, mood: 'smug', look: -0.9 });
      op(pdice, 1); tr(pdice, 470, 512, 1.3); pdice.set(6, -12);
      popSet(cLucky, t, mid('lucky', 0.2), cCup, 600, 190); op(tickL, P(t, mid('lucky', 0.3), 0.2, linear)); tr(tickL, 690, 190);
      popSet(cFair, t, mid('lucky', 0.52), cCup, 600, 270); op(crossF, P(t, mid('lucky', 0.62), 0.2, linear)); tr(crossF, 676, 270);
    }

    /* ================= D: the paper cup, pooling ================= */
    if (sD) {
      show.mum = 1; show.kav = 1; show.freq = 1;
      tr(mum, XA, YB - 6, SB); tr(kav, XB, YB, SB);
      mum.set({ t, talk: scTalk(S, t, 'mum'), mood: t < at('pool') ? 'neutral' : 'smug', look: t < at('pool') ? 0.5 : 1 });
      kav.set({ t, mood: t < at('pool') ? 'neutral' : 'happy', look: t < at('pool') ? -0.8 : 0.9 });
      // the cup tips onto its side
      op(cup, 1); const tip = P(t, at('cup') + 0.2, 0.5, easeIn);
      tr(cup, XA + 110 + 20 * tip, 548); cup.set(tip);
      tr(freq, XF, 450, 0.72);
      freq.set({ t, talk: scTalk(S, t, 'freq'), mood: t < at('pool') ? 'neutral' : 'smug', look: -0.8, count: t < at('pool') ? 200 : 200 });
      op(bCup, 1);
      const pv = t >= at('pool');
      rfCells.forEach(c => op(c, pv ? P(t, at('pool'), 0.3, linear) : 0));
      op(avg, pv ? win(t, at('pool') + 0.1, 1e9, 0.25) : 0);
      op(avgX, P(t, mid('pool', 0.14), 0.2, linear));
      popSet(cNoAvg, t, mid('pool', 0.1), mid('pool', 0.42), BX, 645);
      const tp = pv ? P(t, mid('pool', 0.3), 0.3, linear) : 0;
      totCells.forEach((c, i) => op(c, i === 3 ? P(t, mid('pool', 0.72), 0.3, linear) : tp));
      mTot.set(pv ? tp * (1 - P(t, mid('pool', 0.95), 0.3, linear)) : 0); mTot2.set(pv ? tp * (1 - P(t, mid('pool', 0.95), 0.3, linear)) : 0);
      op(pooled, P(t, mid('pool', 0.66), 0.3, linear));
      op(poolRing, P(t, mid('pool', 0.82), 0.25, linear));
      popSet(cPool, t, mid('pool', 0.42), cEight, BX, 645);
    }

    /* ================= E: 8 p.m., a thousand drops ================= */
    if (sE) {
      show.boy = 1; show.kav = 1; show.freq = 1;
      tr(boy, 300, YB + 6, SB); tr(kav, 860, YB, SB);
      const c = capDraw(t, 300, true);
      boy.set({ t, mood: 'happy', look: 0.3, lift: c.f < 0.3 ? 1 : 0 });
      kav.set({ t, mood: 'deadpan', look: -0.9 });
      tr(freq, 575, 450, 0.72);
      freq.set({ t, mood: 'happy', look: -0.6, count: Math.round(lerp(300, 1000, P(t, at('eight'), end('eight') - at('eight') - 0.5, easeOut))), click: c.f < 0.2 ? 1 : 0 });
      op(tallies, P(t, cEight, 0.25, linear));
      popSet(c8, t, mid('eight', 0.05), cSettle, 860, 210);
      popSet(c1000, t, mid('eight', 0.5), cSettle, 860, 285);
    }

    /* ================= F: the graph settles ================= */
    if (sF) {
      show.boy = 1; show.kav = 1; show.freq = 1;
      tr(boy, XA, YB + 6, SB); tr(kav, XB, YB, SB);
      const c = capDraw(t, XA, true);
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: 'happy', look: 0.9, lift: c.f < 0.3 ? 1 : 0 });
      kav.set({ t, mood: t < at('law') ? 'neutral' : 'smug', look: 0.9 });
      tr(freq, XF, 450, 0.72);
      freq.set({ t, talk: scTalk(S, t, 'freq'), mood: t < at('law') ? 'happy' : 'smug', look: t < at('law') ? -0.8 : 0.4, count: 1000 });
      op(bGraph, 1);
      op(gPts[0], 1);
      const q1 = P(t, mid('settle', 0.08), 0.5, easeOut), q2 = P(t, mid('settle', 0.5), 0.5, easeOut);
      mkDraw(gLine, q1 * 0.5 + q2 * 0.5);
      op(gPts[1], P(t, mid('settle', 0.15), 0.25, linear)); op(gPts[2], P(t, mid('settle', 0.58), 0.25, linear));
      op(half, P(t, mid('law', 0.55), 0.3, linear));
      op(bLaw, P(t, mid('law', 0.45), 0.3, linear));
      op(notHalf, P(t, mid('law', 0.55), 0.25, linear));
      op(lawRing, P(t, mid('law', 0.65), 0.25, linear));
      popSet(cLaw, t, mid('law', 0.05), 1e9, BX, 645);
    }

    /* the cap is only on the table while Ah Boy is */
    if (!(sA0 || sA || sE || sF)) tr(cap, -300, 0);
    op(boy, show.boy); op(kav, show.kav); op(dad, show.dad); op(priya, show.priya); op(mum, show.mum); op(freq, show.freq);
  };
});
