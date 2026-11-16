/* Scene 4: Find ONE, then find ANY (direct proportion & best buys).
   Sunday at Rose's Kitchen: "mango lassi 3 for $10.50", a customer wants 7 -> Dad: "how hard can it be?" (calculator
   upside down) -> Uni the unicorn bursts in: find ONE, then find ANY -> the unitary ladder (÷ 3, × 7) -> direct
   proportion: double the cups, double the cost -> the table, cost ÷ cups = 3.50 = k, y = 3.5x -> the graph: a straight
   line through the origin -> Dad's $4 delivery fee breaks it: y = 3.5x + 4 misses the origin -> the supermarket:
   three yoghurt pots, unit price per 100 g -> the medium is the best buy -> Dad buys three mediums. */
scene('bestbuy', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);          // hard sitcom cut
  const view = (el, k, fx, fy, sx, sy) => el.setAttribute('transform', `translate(${sx.toFixed(1)} ${sy.toFixed(1)}) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const about = (el, cx, cy, k) => el.setAttribute('transform', `translate(${(cx * (1 - k)).toFixed(1)} ${(cy * (1 - k)).toFixed(1)}) scale(${Math.max(0.01, k).toFixed(4)})`);
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 3, color: o.color || C.ink, weight: 700 }); };
  const fade = (t, a, b) => win(t, a, b, 0.2);
  const GOLD = '#FFE45C', PINK = '#FF8FC8', INK = MK.ink, GREEN = '#1E9E5A', RED = '#D32F2F', BERRY = '#B8336A';

  /* layers */
  const Lset = G(root), Lhud = G(root);

  /* ================= A, B: Rose's Kitchen, Sunday ================= */
  const stallShot = G(Lset), cam = G(stallShot);
  const stall = rpStall(cam);
  const kav = cast(stall.mid, 'kavya');
  const dad = cast(stall.mid, 'dad', { prop: null, hand: true, side: 'right' });
  const uni = cast(stall.mid, 'uni');
  // Dad's props: the calculator, upside down; the delivery bag
  const pCalc = G(dad.hand); tr(pCalc, 0, -100, 1, 180); scHandProp(pCalc, 'calculator');
  const pBag = G(dad.hand);
  E('path', { d: 'M-20,-14 Q0,10 20,-14', fill: 'none', stroke: SC_INK, 'stroke-width': 6 }, pBag);
  E('rect', { x: -52, y: -110, width: 104, height: 96, rx: 10, fill: '#1FA38A', stroke: SC_INK, 'stroke-width': 4 }, pBag);
  E('rect', { x: -52, y: -110, width: 104, height: 20, rx: 6, fill: '#178069', stroke: SC_INK, 'stroke-width': 3 }, pBag);
  E('circle', { cx: 0, cy: -52, r: 22, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, pBag);
  E('path', { d: 'M-10,-66 L10,-66 L7,-38 L-7,-38 Z', fill: RP_DRINK.lassi, stroke: SC_INK, 'stroke-width': 2 }, pBag);
  // Uni's entrance burst
  const burst = G(stall.mid);
  const bRings = ['#FF6B8A', GOLD, '#6EC8FF'].map(c => E('circle', { r: 10, fill: 'none', stroke: c, 'stroke-width': 8 }, burst));
  // seven cups of lassi, sliding onto the counter
  const cups = [0, 1, 2, 3, 4, 5, 6].map(() => rpCup(stall.top, { col: RP_DRINK.lassi, s: 0.36 }));

  // customer side: a man who wants 7 lassis
  const fgA = G(cam);
  const cust = scHuman(fgA, { age: 'adult', skin: SC_SKIN.tan, hair: 'buzz', hairCol: SC_HAIR.salt, style: 'collared', shirt: '#4E8FD0', seed: 11 });
  const bubble = mkSpeechBubble(fgA, '**7** lassis, please', { size: 34, tail: 'right' });
  const cSun = pill(Lhud, 'Sunday', { size: 34, color: GOLD, stroke: GOLD });
  const cFamous = pill(Lhud, 'famous last words', { size: 28, color: PINK, stroke: PINK });
  const cOne = mkChip(Lhud, 'find **ONE**, then find **ANY**', { size: 40, col: GOLD });
  const cFee = mkChip(Lhud, '{{+ $4}} delivery fee', { size: 34, col: '#FF8A8A' });

  /* ---------- the board (stands on the counter, right half) ---------- */
  const board = G(cam);
  E('rect', { x: 566, y: 192, width: 610, height: 504, rx: 18, fill: 'rgba(0,0,0,0.25)' }, board);
  E('rect', { x: 560, y: 186, width: 610, height: 504, rx: 18, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, board);
  const BX = 865;   // board centre x

  // (1) the unitary ladder
  const lad = G(board);
  mkText(lad, BX, 256, 'find **ONE**, then find **ANY**', { size: 34, anchor: 'middle', fill: INK, boldFill: BERRY });
  const LY = [345, 450, 555], LM = { size: 38, fill: INK };
  const ladRows = [['"3 cups"', null, '$10.50'], ['"1 cup"', '10.50 ÷ 3 =', '$3.50'], ['"7 cups"', '7 × 3.50 =', '$24.50']].map(([lab, calc, res], i) => {
    const row = G(lad), y = LY[i];
    mkMath(row, 690, y, lab, LM);
    mkMath(row, 838, y, '->', Object.assign({ anchor: 'middle' }, LM));
    const cg = G(row), c = calc ? mkMath(cg, 872, y, calc, LM) : null;
    const rg = G(row), rx = c ? 872 + c.w + 14 : 872;
    const r = mkMath(rg, rx, y, res, { size: 40, fill: i ? GREEN : INK, weight: 800 });
    return { row, cg, rg, rx, rw: r.w };
  });
  const side = [['÷ 3', 0], ['× 7', 1]].map(([lab, i]) => {
    const g = G(lad);
    const a = arrow(g, 660, LY[i] - 18, 660, LY[i + 1] - 34, { color: BERRY, width: 4, bend: 26 });
    mkMath(g, 636, (LY[i] + LY[i + 1]) / 2 - 8, lab, { size: 32, fill: BERRY, anchor: 'end', weight: 700 });
    return { g, a };
  });

  // (2) direct proportion: double one, double the other
  const dir = G(board);
  mkText(dir, BX, 262, '**Direct proportion**', { size: 40, anchor: 'middle', fill: BERRY });
  const dirSub = mkText(dir, BX, 312, 'double one, double the other', { size: 30, anchor: 'middle', fill: INK });
  const DY = [410, 505, 600];
  const dirRows = [['"1 cup"', '$3.50'], ['"2 cups"', '$7.00'], ['"4 cups"', '$14.00']].map(([a, b], i) => {
    const row = G(dir);
    mkMath(row, 720, DY[i], a, LM);
    mkMath(row, 880, DY[i], '->', Object.assign({ anchor: 'middle' }, LM));
    mkMath(row, 915, DY[i], b, { size: 40, fill: i ? GREEN : INK, weight: 800 });
    return row;
  });
  const dirArr = [0, 1].map(i => {
    const g = G(dir);
    const a1 = arrow(g, 690, DY[i] - 18, 690, DY[i + 1] - 34, { color: BERRY, width: 4, bend: 24 });
    mkMath(g, 666, (DY[i] + DY[i + 1]) / 2 - 8, '× 2', { size: 30, fill: BERRY, anchor: 'end', weight: 700 });
    const a2 = arrow(g, 1068, DY[i] - 18, 1068, DY[i + 1] - 34, { color: BERRY, width: 4, bend: -24 });
    mkMath(g, 1094, (DY[i] + DY[i + 1]) / 2 - 8, '× 2', { size: 30, fill: BERRY, anchor: 'start', weight: 700 });
    return { g, a1, a2 };
  });

  // (3) the table: cost ÷ cups is always 3.50 = k, so y = 3.5x
  const tab = G(board);
  const tbl = mkTable(tab, [['cups', '1', '2', '3', '7'], ['cost ($)', '3.50', '7.00', '10.50', '24.50'], ['cost ÷ cups', '3.50', '3.50', '3.50', '3.50']],
    { size: 30, ink: INK, head: false, side: true, colW: [186, 88, 88, 104, 104], rowH: 64, headFill: 'rgba(46,125,216,0.14)', fill: '#FFFFFF' });
  tr(tbl, 580, 222);
  const tMarks = [1, 2, 3, 4].map(j => tbl.mark(2, j, 'rgba(255,228,92,0.55)'));
  const tK = mkText(tab, BX, 496, 'constant {{k = 3.5}}', { size: 38, anchor: 'middle', fill: INK });
  const tY = mkMath(tab, BX, 600, 'y = 3.5x', { size: 70, anchor: 'middle', fill: BERRY, weight: 700 });
  const tXY = mkText(tab, BX, 660, '{{y}} = cost,  {{x}} = cups', { size: 28, anchor: 'middle', fill: '#5A4A52' });

  // (4) the graph
  const gr = G(board);
  const ax = mkAxes(gr, { xmin: 0, xmax: 8, ymin: 0, ymax: 30, unit: 46, unitY: 10, grid: false, labelStep: 1000, ink: INK, size: 26, xName: '"cups"', yName: '"cost ($)"', halo: MK.paper });
  tr(ax, 655, 240);
  const axGrid = G(ax); ax.insertBefore(axGrid, ax.firstChild);
  let gd = '', tk = '';
  for (let k = 1; k <= 8; k++) { gd += `M${ax.px(k)},0 L${ax.px(k)},${ax.H} `; tk += `M${ax.px(k)},${ax.H - 7} L${ax.px(k)},${ax.H + 7} `; }
  for (let v = 5; v <= 30; v += 5) { gd += `M0,${ax.py(v)} L${ax.W},${ax.py(v)} `; tk += `M-7,${ax.py(v)} L7,${ax.py(v)} `; }
  E('path', { d: gd, stroke: 'rgba(42,26,34,0.12)', 'stroke-width': 2 }, axGrid);
  E('path', { d: tk, stroke: INK, 'stroke-width': 3 }, ax);
  for (let k = 1; k <= 7; k++) T(ax, ax.px(k), ax.H + 34, String(k), { size: 26, anchor: 'middle', fill: INK, weight: 600 });
  for (let v = 5; v <= 30; v += 5) T(ax, -12, ax.py(v) + 9, String(v), { size: 26, anchor: 'end', fill: INK, weight: 600 });
  const oGlow = E('circle', { cx: 0, cy: ax.H, r: 34, fill: glow(GOLD) }, ax);
  const gLine = ax.line(3.5, 0, { col: '#E8751A', width: 6, label: 'y = 3.5x', labelAt: 6.3, dx: 14, dy: 28, anchor: 'start', size: 30 });
  const gPts = [[1, 3.5], [2, 7], [3, 10.5], [7, 24.5]].map(([x, y]) => ax.point(x, y, { col: MK.blue, r: 10 }));
  const dLine = ax.seg(0, 4, 26 / 3.5, 30, { col: RED, width: 5, dash: '14 10' });
  const dLab = mkMath(ax, ax.px(5) - 16, ax.py(21.5) - 14, 'y = 3.5x + 4', { size: 30, fill: RED, anchor: 'end', halo: MK.paper });
  const bPts = [[1, 7.5], [2, 11]].map(([x, y]) => ax.point(x, y, { col: RED, r: 10 }));
  const s4 = ax.point(0, 4, { col: RED, r: 9 });
  const nGraph = mkText(gr, BX, 645, 'a **straight line** through the **origin** {{(0, 0)}}', { size: 30, anchor: 'middle', fill: INK });
  const nBr1 = mkText(gr, BX, 628, '1 cup **$7.50**,   2 cups **$11**', { size: 30, anchor: 'middle', fill: INK, boldFill: RED });
  const nBr2 = mkMath(gr, BX, 672, '2 × 7.50 = 15 != 11', { size: 34, anchor: 'middle', fill: RED, weight: 700 });
  const nFix1 = mkText(gr, BX, 628, 'the line **misses the origin**', { size: 30, anchor: 'middle', fill: INK, boldFill: RED });
  const nFix2 = mkText(gr, BX, 670, 'fixed fee ⇒ **NOT** direct proportion', { size: 30, anchor: 'middle', fill: RED });

  /* ================= C: the supermarket ================= */
  const martShot = G(Lset), mcam = G(martShot);
  rpMart(mcam);
  const mGlow = E('ellipse', { cx: 585, cy: 240, rx: 120, ry: 110, fill: glow(GOLD) }, mcam);
  const POT = [['S', 320, '$1.20', '150 g'], ['M', 585, '$3.75', '500 g'], ['L', 850, '$7.90', '1 kg']].map(([k, x, price, wt]) => {
    const p = rpYoghurt(mcam, k); tr(p, x, 300);
    const w = { S: 60, M: 96, L: 130 }[k], h = { S: 70, M: 110, L: 150 }[k];
    const tag = mkPriceTag(mcam, price, { size: 32, string: false });
    const wc = pill(mcam, wt, { size: 30, color: GOLD, stroke: GOLD });
    return { p, tag, wc, x, tx: x + w / 2 - 6, ty: 300 - h + 6 };
  });
  const ribbon = G(mcam);
  E('rect', { x: -84, y: -22, width: 168, height: 44, rx: 6, fill: '#C62828', stroke: SC_INK, 'stroke-width': 3 }, ribbon);
  T(ribbon, 0, 10, 'BEST BUY', { size: 28, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 2 });
  const mCast = G(mcam);
  const dadM = cast(mCast, 'dad', { prop: null, hand: true, side: 'right' });
  const hugL = G(dadM.hand); tr(rpYoghurt(hugL, 'L'), 0, 6, 0.72);
  const threeM = G(dadM.hand); [-62, 62, 0].forEach(x => tr(rpYoghurt(threeM, 'M'), x, x ? 4 : 12, 0.72));
  const uniM = cast(mCast, 'uni');
  const kavM = cast(mCast, 'kavya');
  const cBig = mkChip(mcam, 'biggest = cheapest?', { size: 34, col: PINK });
  const cUnit = mkChip(mcam, 'compare the **unit price**: price per **100 g**', { size: 36, col: GOLD });
  const cKg = mkChip(mcam, '1 kg = 1000 g', { size: 32, col: C.ink });
  // the price-per-100 g card
  const pCard = G(mcam);
  E('rect', { x: 198, y: 392, width: 793, height: 220, rx: 16, fill: 'rgba(0,0,0,0.2)' }, pCard);
  E('rect', { x: 192, y: 386, width: 793, height: 220, rx: 16, fill: MK.paper, stroke: '#8FB3CC', 'stroke-width': 4 }, pCard);
  [452, 718].forEach(x => E('line', { x1: x, y1: 402, x2: x, y2: 590, stroke: '#C9D3DC', 'stroke-width': 3 }, pCard));
  const PC = [['150 g = 1.5 × 100 g', '1.20 ÷ 1.5', '$0.80', 0.80], ['500 g = 5 × 100 g', '3.75 ÷ 5', '$0.75', 0.75], ['1 kg = 10 × 100 g', '7.90 ÷ 10', '$0.79', 0.79]].map(([note, calc, res, v], i) => {
    const cx = [320, 585, 850][i], g = G(pCard);
    mkText(g, cx, 426, note, { size: 26, anchor: 'middle', fill: '#5A4A52' });
    mkMath(g, cx, 484, calc, { size: 38, anchor: 'middle', fill: INK });
    const rg = G(g), r = mkMath(rg, cx, 545, '= ' + res, { size: 42, anchor: 'middle', fill: INK, weight: 800 });
    E('rect', { x: cx - 100, y: 568, width: v * 250, height: 18, rx: 6, fill: i === 1 ? '#2FA36B' : '#8FB3CC' }, g);
    return { g, rg, cx, rw: r.w };
  });
  const ringM = E('rect', { x: 585 - PC[1].rw / 2 - 14, y: 507, width: PC[1].rw + 28, height: 54, rx: 12, fill: 'none', stroke: GREEN, 'stroke-width': 5 }, pCard);
  const stampOk = rpStamp(mcam, true);

  /* lower third */
  const ltUni = rpLowerThird(Lhud, 'uni');

  /* cut points */
  const cB = at('uni') - 0.06, cC = at('sizes') - 0.06;

  return t => {
    const sA = on(t, -1, cB), sB = on(t, cB, cC), sC = on(t, cC, 1e9);
    const who = scWho(S, t);
    ltUni.set(sB ? win(t, at('uni') + 0.1, at('uni') + 3.2, 0.3) : 0);

    /* ---------- A, B: the stall ---------- */
    op(stallShot, sA || sB);
    op(cSun, 0); op(cFamous, 0); op(cOne, 0); op(cFee, 0);
    if (sA || sB) {
      stall.upd(t);
      stall.menu.hl(2, sA ? P(t, mid('sunday', 0.3), 0.3, linear) : 0);
    }
    if (sA) {
      // the push-in on Dad in the "famous last words" pause
      const push = P(t, end('hard') + 0.05, cB - end('hard'), ease);
      view(cam, 1 + 0.1 * push, 480, 400, 480, 400);
      op(fgA, 1); op(board, 0); op(uni, 0); op(burst, 0); cups.forEach(c => op(c, 0));
      tr(kav, 250, 450, 1.0);
      tr(dad, 480, 445, 1.0);
      tr(cust, 1010, 640, 1.0);
      const famous = t > end('hard') + 0.05;
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: famous ? 'deadpan' : t > at('hard') ? 'annoyed' : 'neutral', look: famous ? 0 : who === 'dad' ? 0.8 : 0.5 });
      dad.set({ t, talk: scTalk(S, t, 'dad'), mood: t >= at('hard') ? 'smug' : 'happy', look: t >= at('hard') ? 0.3 : 0.6, lift: t >= at('hard') + 0.4 ? 1 : 0 });
      op(pCalc, 1); op(pBag, 0);
      cust.set({ t, talk: 0, mood: famous ? 'deadpan' : 'happy', look: famous ? 0 : -0.7 });
      popIn(cSun, t, mid('sunday', 0.04), 880, 60);
      const bp = t < end('hard') + 0.3 ? P(t, mid('sunday', 0.68), 0.4, linear) : 0;
      bubble.set(bp); tr(bubble, 790, 580);
      if (famous) popIn(cFamous, t, end('hard') + 0.1, 600, 652);
    } else { op(fgA, 0); }

    if (sB) {
      view(cam, 1, 600, 375, 600, 375);
      op(uni, 1);
      tr(kav, 150, 450, 0.95);
      tr(dad, 330, 445, 0.95);
      // Uni bursts in
      const up = P(t, at('uni') - 0.1, 0.45, pop), droop = P(t, at('fixed') + 0.1, 0.5, ease);
      tr(uni, 490, 432 + 6 * droop, Math.max(0.01, 0.8 * up), -10 * droop);
      const bq = P(t, at('uni') - 0.1, 0.8, easeOut);
      op(burst, bq > 0 && bq < 1 ? 1 - bq : 0); tr(burst, 490, 360);
      bRings.forEach((r, i) => attr(r, 'r', 20 + bq * (110 + i * 50)));
      const uniTalk = who === 'uni';
      uni.set({ t, talk: scTalk(S, t, 'uni'), mood: t > at('fixed') + 0.1 ? 'sad' : 'happy', look: who === 'kavya' ? -0.8 : who === 'dad' ? -0.6 : 0.5, sparkle: 1 - droop });
      // listeners look at the speaker
      const kMood = t >= at('broken') && t < at('fixed') ? 'neutral' : t >= at('deliver') && t < at('broken') ? 'deadpan' : 'happy';
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: who === 'kavya' ? 'neutral' : kMood, look: who === 'kavya' ? 0.4 : 0.8 });
      let dm = 'neutral';
      if (t < at('divide')) dm = 'shock';
      else if (t >= at('deliver') && t < at('broken')) dm = 'smug';
      else if (t >= at('broken') && t < at('fixed')) dm = 'shock';
      else if (t >= at('fixed')) dm = 'sad';
      dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: uniTalk ? 0.8 : who === 'kavya' ? -0.7 : 0.6, lift: t >= at('deliver') && t < at('broken') + 0.4 ? 1 : 0 });
      op(pCalc, 0); op(pBag, t >= at('deliver') ? 1 : 0);
      // "find ONE, then find ANY"
      if (t < at('divide')) { popIn(cOne, t, mid('uni', 0.42), 865, 330); }
      // the board stands up on the counter
      const bp = P(t, at('divide') - 0.15, 0.35, easeOut);
      op(board, bp > 0 ? 1 : 0); about(board, 865, 690, 0.6 + 0.4 * bp);
      // (1) ladder
      op(lad, fade(t, at('divide') - 0.15, at('direct') + 0.1));
      ladRows[0].row && op(ladRows[0].row, P(t, at('divide'), 0.3, linear));
      side[0].a.set(P(t, mid('divide', 0.32), 0.4, linear)); op(side[0].g, t > mid('divide', 0.3) ? 1 : 0);
      op(ladRows[1].row, P(t, mid('divide', 0.36), 0.3, linear));
      op(ladRows[1].cg, P(t, mid('divide', 0.55), 0.3, linear));
      { const p = P(t, mid('divide', 0.84), 0.4, pop); op(ladRows[1].rg, clamp(p * 3)); }
      side[1].a.set(P(t, at('times') + 0.05, 0.4, linear)); op(side[1].g, t > at('times') ? 1 : 0);
      op(ladRows[2].row, P(t, at('times') + 0.1, 0.3, linear));
      op(ladRows[2].cg, P(t, mid('times', 0.4), 0.3, linear));
      { const p = P(t, mid('times', 0.72), 0.4, pop); op(ladRows[2].rg, clamp(p * 3)); }
      // seven cups slide onto the counter
      cups.forEach((c, i) => {
        const p = P(t, mid('times', 0.2) + i * 0.12, 0.4, easeOut), gone = P(t, at('table') - 0.2, 0.3, linear);
        op(c, p > 0 ? 1 - gone : 0); tr(c, lerp(560, 120 + i * 64, p), 532);
      });
      // (2) direct proportion
      op(dir, fade(t, at('direct') - 0.05, at('table') + 0.1));
      op(dirSub, P(t, mid('direct', 0.25), 0.3, linear));
      op(dirRows[0], P(t, at('direct'), 0.3, linear));
      op(dirRows[1], P(t, mid('direct', 0.4), 0.3, linear)); dirArr[0].a1.set(P(t, mid('direct', 0.35), 0.4, linear)); dirArr[0].a2.set(P(t, mid('direct', 0.4), 0.4, linear));
      op(dirArr[0].g, t > mid('direct', 0.35) ? 1 : 0);
      op(dirRows[2], P(t, mid('direct', 0.7), 0.3, linear)); dirArr[1].a1.set(P(t, mid('direct', 0.65), 0.4, linear)); dirArr[1].a2.set(P(t, mid('direct', 0.7), 0.4, linear));
      op(dirArr[1].g, t > mid('direct', 0.65) ? 1 : 0);
      // (3) the table
      op(tab, fade(t, at('table') - 0.05, at('graph') + 0.1));
      [1, 2, 3, 4].forEach((j, k) => { op(tbl.cells[2][j], P(t, mid('table', 0.08 + 0.07 * k), 0.25, linear)); tMarks[k].set(P(t, mid('table', 0.08 + 0.07 * k), 0.25, linear)); });
      op(tbl.cells[2][0], P(t, at('table'), 0.25, linear));
      op(tK, P(t, mid('table', 0.45), 0.3, linear));
      { const p = P(t, mid('table', 0.74), 0.45, pop); op(tY, clamp(p * 3)); }
      op(tXY, P(t, mid('table', 0.85), 0.3, linear));
      // (4) the graph
      op(gr, fade(t, at('graph') - 0.05, 1e9));
      gPts.forEach((p, i) => p.set(P(t, mid('graph', 0.04 + 0.07 * i), 0.4, linear)));
      gLine.set(P(t, mid('graph', 0.3), 1.0, ease));
      op(oGlow, t > mid('graph', 0.6) && t < at('fixed') ? 0.55 + 0.45 * Math.sin(t * 6) : 0);
      op(nGraph, fade(t, mid('graph', 0.6), at('broken')));
      // the delivery fee
      if (t >= at('deliver') && t < at('broken') + 0.2) popIn(cFee, t, mid('deliver', 0.5), 330, 245);
      bPts.forEach((p, i) => p.set(P(t, mid('broken', 0.22 + 0.28 * i), 0.4, linear)));
      op(nBr1, fade(t, mid('broken', 0.2), at('fixed')));
      op(nBr2, fade(t, mid('broken', 0.72), at('fixed')));
      dLine.set(P(t, at('fixed') + 0.1, 0.5, linear));
      op(dLab, P(t, mid('fixed', 0.2), 0.3, linear));
      s4.set(P(t, mid('fixed', 0.25), 0.4, linear));
      op(nFix1, P(t, mid('fixed', 0.3), 0.3, linear));
      op(nFix2, P(t, mid('fixed', 0.6), 0.3, linear));
    }

    /* ---------- C: the supermarket ---------- */
    op(martShot, sC);
    if (sC) {
      // slow push-in on Kavya's deadpan in the final pause
      const push = P(t, end('idea') - 0.6, 1.4, ease);
      view(mcam, 1 + 0.05 * push, 960, 380, 960, 380);
      // the price tags and weights, as Dad reads them
      POT.forEach((q, i) => {
        const p = P(t, mid('sizes', 0.06 + 0.24 * i), 0.4, pop);
        op(q.tag, clamp(p * 3)); tr(q.tag, q.tx, q.ty, Math.max(0.01, 0.6 + 0.4 * p)); q.tag.set(Math.sin(t * 2.2 + i) * 4 * AMP);
        popIn(q.wc, t, mid('sizes', 0.08 + 0.24 * i), q.x, 372);
        if (t > at('prices') - 0.1) op(q.wc, 1 - P(t, at('prices') - 0.1, 0.2, linear));
      });
      const grab = t > mid('sizes', 0.74) && t < at('prices');
      op(POT[2].p, grab ? 0 : 1);
      op(mGlow, t > mid('medium', 0.15) && t < at('idea') ? 0.6 + 0.4 * Math.sin(t * 5) : 0);
      { const p = P(t, mid('medium', 0.2), 0.45, pop); op(ribbon, clamp(p * 3)); tr(ribbon, 585, 264, Math.max(0.01, 0.85 * (0.6 + 0.4 * p)), -10); }
      // the cast
      tr(dadM, 110, 655 - 30 * P(t, at('idea') + 0.1, 0.4, ease), 0.95);
      const dLift = grab || t > at('idea') + 0.2;
      let dm = 'smug';
      if (t >= at('unit') && t < at('medium')) dm = 'neutral';
      else if (t >= at('medium') && t < at('idea')) dm = 'sad';
      dadM.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: who === 'dad' ? 0.3 : 0.7, lift: dLift ? 1 : 0 });
      op(hugL, grab ? 1 : 0); op(threeM, t > at('idea') + 0.2 ? 1 : 0);
      tr(uniM, 955, 668, 0.68);
      uniM.set({ t, talk: scTalk(S, t, 'uni'), mood: t > at('idea') ? 'deadpan' : 'happy', look: who === 'dad' ? -0.8 : who === 'kavya' ? 0.7 : -0.3 });
      tr(kavM, 1100, 690, 0.85);
      let km = 'neutral';
      if (t < at('unit') && t > mid('sizes', 0.75)) km = 'annoyed';
      else if (t >= at('medium') && t < at('idea')) km = 'smug';
      else if (t >= at('idea')) km = 'deadpan';
      kavM.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: t > end('idea') ? 0 : who === 'kavya' ? -0.4 : -0.8 });
      // chips
      op(cBig, 0); op(cUnit, 0); op(cKg, 0);
      if (t > mid('sizes', 0.78) && t < at('unit')) { cBig.set(P(t, mid('sizes', 0.78), 0.4, linear)); tr(cBig, 585, 480); }
      if (t >= at('unit') - 0.05 && t < at('prices')) {
        cUnit.set(P(t, at('unit') + 0.05, 0.4, linear)); tr(cUnit, 585, 470);
        cKg.set(P(t, mid('unit', 0.55), 0.4, linear)); tr(cKg, 585, 548);
      }
      // the unit prices
      op(pCard, fade(t, at('prices') - 0.1, at('idea') + 0.1));
      PC.forEach((c, i) => {
        op(c.g, P(t, mid('prices', 0.02 + 0.32 * i), 0.3, linear));
        const p = P(t, mid('prices', 0.18 + 0.32 * i), 0.4, pop); op(c.rg, clamp(p * 3));
      });
      op(ringM, P(t, mid('medium', 0.3), 0.3, linear));
      stampOk.set(t < at('idea') + 0.1 ? P(t, mid('medium', 0.58), 0.35, linear) : 0); tr(stampOk, 585, 652, 0.42);
    }
  };
});
