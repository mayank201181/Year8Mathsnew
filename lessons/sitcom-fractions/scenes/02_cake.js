/* Scene 2: Dad bakes a cake (adding and subtracting fractions, improper fractions and mixed numbers).
   One set, the HDB kitchen at noon: Kavya (left), Dad in his CHEF apron (centre), Ah Boy (right) behind the
   counter; a whiteboard stuck over the cabinets on the right holds the working; Vinny stands on the counter under
   it; the measuring jug (Topsy's home) at the right end of the counter.
   noon: Dad reads the recipe book upside down -> sugar: 2/3 + 3/5 = (2 + 3)/(3 + 5) = 5/8 in red (famous last
   words #2) -> NOT ON MY BAR! -> 5/8 < 2/3 bars -> thirds and fifths re-cut into fifteenths, LCM 15 -> 10/15 + 9/15
   = 19/15 -> Topsy (19 over 15) pops out of the jug and topples -> 19 ÷ 15 = 1 r 4, 1 4/15 -> he sits on his
   golden 1 -> 2 3/5 -> MAD: 13/5 -> flour: Dad's 3 − 1 and 2/3 − 1/4 = 2 5/12 -> estimate between 1 and 2 ->
   borrow a whole -> 2 15/12 − 1 8/12 = 1 7/12 -> Ah Boy counts up on a number line -> the oven glows: 5/8 cup. */
scene('cake', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const PINK = '#FF8FC8', GOLD = '#FFE45C', RED = '#D32F2F', BLUE = '#2E6FD8', GREEN = '#1E9E5A';
  const chipAt = (parent, text, o) => { o = o || {}; return mkChip(parent, text, { size: o.size || 30, col: o.col || C.ink }); };
  const fadeIn = (t, t0, d) => P(t, t0, d || 0.3, linear);
  const mathC = (parent, x, y, src, o) => { const m = mkMeasure(src, o); return mkMath(parent, x, y + (m.a - m.d) / 2, src, o); };
  const INK = MK.ink;

  /* layers */
  const Lset = G(root), Lboard = G(root), Lcast = G(root), Lfront = G(root), Ltop = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= the kitchen ================= */
  const kit = fcKitchen(Lset);
  Lfront.appendChild(kit.front); Ltop.appendChild(kit.top);
  const topsy = cast(kit.top, 'topsy', { top: '19', bot: '15' });   // behind the jug, so he climbs out of it
  const jug = fcMeasuringJug(kit.top, { level: 0.6 }); tr(jug, 1085, 548, 0.5);
  // sugar and flour bags on the counter
  const bag = (label, col) => {
    const g = G(kit.top);
    E('path', { d: 'M-40,0 L-36,-96 L-26,-108 L26,-108 L36,-96 L40,0 Z', fill: '#FFFDF6', stroke: '#8F7A5A', 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
    E('rect', { x: -32, y: -76, width: 64, height: 40, rx: 6, fill: col }, g);
    T(g, 0, -48, label, { size: 18, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
    return g;
  };
  const sugar = bag('SUGAR', '#2E7DD8'); tr(sugar, 640, 548);
  const flour = bag('FLOUR', '#C62828'); tr(flour, 640, 548);

  /* ================= the whiteboard (right) ================= */
  const BX = 890, BYc = 252;
  const wbG = G(Lboard);
  const wb = mkWhiteboard(wbG, 520, 400); tr(wb, BX, BYc);
  const bd = G(wbG);   // content in stage coordinates: interior x 640..1140, y 62..442

  // sugar: Dad's working (wrong)
  const bSugar = G(bd);
  mkText(bSugar, BX, 104, 'cups of **sugar**', { size: 30, anchor: 'middle', fill: '#5A6670', boldFill: INK });
  const sugQ = mathC(bSugar, BX, 200, '2/3 + 3/5', { size: 60, anchor: 'middle', fill: INK });
  const sugW = mathC(bSugar, BX, 200, '2/3 + 3/5 = (2 + 3)/(3 + 5) = 5/8', { size: 52, anchor: 'middle', fill: RED });
  const sugN = mkText(bSugar, BX, 305, 'add the tops, add the bottoms', { size: 30, anchor: 'middle', fill: RED });
  const stNo = fcStamp(bd, false);

  // less: 5/8 < 2/3
  const bLess = G(bd);
  const b23 = mkFractionBar(bLess, 3, 2, { w: 380, h: 56, col: '#FFC247', label: true, size: 34, labelCol: '#C77A00' }); tr(b23, 860, 130);
  const b58 = mkFractionBar(bLess, 8, 5, { w: 380, h: 56, col: RED, label: true, size: 34, labelCol: RED }); tr(b58, 860, 215);
  const lessDash = E('path', { d: `M${860 - 190 + 380 * 5 / 8},96 L${860 - 190 + 380 * 5 / 8},250 M${860 - 190 + 380 * 2 / 3},96 L${860 - 190 + 380 * 2 / 3},250`, stroke: INK, 'stroke-width': 3, 'stroke-dasharray': '8 6' }, bLess);
  const lessM = mathC(bLess, BX, 345, '5/8 < 2/3', { size: 66, anchor: 'middle', fill: INK });
  mkText(bLess, 850, 430, "Dad's answer is **too small**", { size: 28, anchor: 'middle', fill: RED });

  // size: thirds and fifths re-cut into fifteenths
  const bSize = G(bd);
  const b3 = mkFractionBar(bSize, 3, 2, { w: 380, h: 56, col: '#FFC247', label: '2/3', size: 34, labelCol: '#C77A00' }); tr(b3, 860, 120);
  const b5 = mkFractionBar(bSize, 5, 3, { w: 380, h: 56, col: '#7FB8FF', label: '3/5', size: 34, labelCol: BLUE }); tr(b5, 860, 205);
  let cut = '';
  for (let i = 1; i < 15; i++) { const x = 670 + 380 * i / 15; cut += `M${x.toFixed(1)},94 L${x.toFixed(1)},148 M${x.toFixed(1)},179 L${x.toFixed(1)},233 `; }
  const cuts = E('path', { d: cut, stroke: GREEN, 'stroke-width': 2.5, 'stroke-dasharray': '6 4' }, bSize);
  const sizeT1 = mkText(bSize, BX, 300, 'bottom = the **size** of the piece', { size: 30, anchor: 'middle', fill: INK, boldFill: BLUE });
  const sizeT2 = mkText(bSize, BX, 370, '{{"LCM"(3, 5) = 15}}: **fifteenths**', { size: 34, anchor: 'middle', fill: INK, boldFill: GREEN });
  const sizeT3 = mkText(bSize, BX, 426, 'same-size pieces', { size: 28, anchor: 'middle', fill: GREEN });

  // add: 10/15 + 9/15 = 19/15
  const bAdd = G(bd);
  const wAdd = mkWorking(bAdd, 900, 72, ['2/3 = 10/15', '3/5 = 9/15', '10/15 + 9/15 = 19/15'], { size: 42, fill: INK, gap: 18 });
  const addN = mkText(bAdd, 840, 422, 'add the tops, **keep the bottom**', { size: 28, anchor: 'middle', fill: INK, boldFill: GREEN });

  // topsy: 19/15 improper
  const bTop = G(bd);
  mathC(bTop, 800, 190, '19/15', { size: 100, anchor: 'middle', fill: '#E8751A' });
  mkText(bTop, 1010, 150, '**improper**', { size: 34, anchor: 'middle', fill: INK, boldFill: '#E8751A' });
  mkText(bTop, 1010, 196, 'fraction', { size: 30, anchor: 'middle', fill: INK });
  const topN = mkText(bTop, BX, 350, 'top > bottom: {{19 > 15}}', { size: 34, anchor: 'middle', fill: INK });

  // mixed: 19 ÷ 15 = 1 r 4
  const bMix = G(bd);
  const mixA = mkText(bMix, BX, 115, '{{19 ÷ 15 = 1}} remainder {{4}}', { size: 38, anchor: 'middle', fill: INK });
  const mixB = mathC(bMix, BX, 230, '19/15 = 1 4/15', { size: 72, anchor: 'middle', fill: INK });
  const mixC = mkText(bMix, BX, 345, 'a **mixed number**', { size: 34, anchor: 'middle', fill: INK, boldFill: GREEN });
  const stOK = fcStamp(bd, true);

  // back: 2 3/5 -> ?
  const bBack = G(bd);
  mathC(bBack, BX, 200, '2 3/5 -> ?', { size: 86, anchor: 'middle', fill: INK });
  mkText(bBack, BX, 340, 'back to **top-heavy**', { size: 32, anchor: 'middle', fill: INK, boldFill: '#E8751A' });

  // mad
  const bMad = G(bd);
  const madL = [
    mkText(bMad, 670, 104, '**M**ultiply: {{2 × 5 = 10}}', { size: 38, fill: INK, boldFill: RED }),
    mkText(bMad, 670, 164, '**A**dd: {{10 + 3 = 13}}', { size: 38, fill: INK, boldFill: RED }),
    mkText(bMad, 670, 224, '**D**enominator stays: {{5}}', { size: 38, fill: INK, boldFill: RED }),
  ];
  const madR = mathC(bMad, 850, 320, '2 3/5 = 13/5', { size: 66, anchor: 'middle', fill: INK });

  // flour: Dad's working (wrong)
  const bFlour = G(bd);
  mkText(bFlour, BX, 96, 'cups of **flour**', { size: 28, anchor: 'middle', fill: '#5A6670', boldFill: INK });
  const flQ = mathC(bFlour, BX, 150, '3 1/4 - 1 2/3', { size: 50, anchor: 'middle', fill: INK });
  const wFl = mkWorking(bFlour, 860, 214, [{ m: '3 - 1 = 2', note: 'wholes' }, { m: '2/3 - 1/4 = 5/12', note: 'parts' }, { m: '= 2 5/12' }], { size: 40, fill: RED, gap: 12, noteX: 150, noteSize: 28, noteCol: RED });

  // est
  const bEst = G(bd);
  mathC(bEst, BX, 112, '3 1/4 - 1 2/3', { size: 50, anchor: 'middle', fill: INK });
  const estA = mkText(bEst, BX, 215, '{{3 1/4}} is just over **3**', { size: 34, anchor: 'middle', fill: INK, boldFill: BLUE });
  const estB = mkText(bEst, BX, 285, '{{1 2/3}} is nearly **2**', { size: 34, anchor: 'middle', fill: INK, boldFill: BLUE });
  const estC = mkText(bEst, BX, 350, 'answer between **1** and **2**', { size: 34, anchor: 'middle', fill: INK, boldFill: GREEN });
  const estD = G(bEst);
  mkText(estD, BX - 30, 420, "Dad's {{2 5/12}}", { size: 32, anchor: 'middle', fill: RED });
  tr(cross(estD, 18), BX + 100, 402);

  // borrow
  const bBor = G(bd);
  mathC(bBor, 800, 125, '3 1/4', { size: 60, anchor: 'middle', fill: INK });
  mathC(bBor, 890, 125, '-', { size: 60, anchor: 'middle', fill: INK });
  mathC(bBor, 980, 125, '1 2/3', { size: 60, anchor: 'middle', fill: INK });
  const borHl = G(bBor);
  E('rect', { x: 806, y: 70, width: 50, height: 112, rx: 10, fill: 'none', stroke: RED, 'stroke-width': 5 }, borHl);
  E('rect', { x: 986, y: 70, width: 50, height: 112, rx: 10, fill: 'none', stroke: RED, 'stroke-width': 5 }, borHl);
  const borLt = mathC(bBor, BX, 268, '1/4 < 2/3', { size: 58, anchor: 'middle', fill: RED });
  const borCh = mkChip(bBor, '**borrow a whole**: {{1 = 12/12}}', { size: 34, col: BLUE, fill: '#EAF2FF' }); tr(borCh, BX, 385);

  // twelfths
  const bTw = G(bd);
  const wTw = mkWorking(bTw, 905, 70, ['3 1/4 = 3 3/12', { m: '= 2 15/12', note: 'borrow 1', noteCol: BLUE }, '1 2/3 = 1 8/12', '2 15/12 - 1 8/12 = 1 7/12'], { size: 38, fill: INK, gap: 10, noteX: 120, noteSize: 26 });

  // count up
  const bCnt = G(bd);
  mkText(bCnt, BX, 92, '**count up** from {{1 2/3}} to {{3 1/4}}', { size: 30, anchor: 'middle', fill: INK, boldFill: BLUE });
  const nl = mkNumberLine(bCnt, {
    from: 1, to: 4, step: 1, len: 450, minor: 12, ink: INK, size: 28, arrows: false,
    labels: [[1, '1'], [2, '2'], [3, '3'], [4, '4']],
    marks: [{ v: 5 / 3, col: '#FF8A3D' }, { v: 13 / 4, col: GREEN }],
    hops: [{ a: 5 / 3, b: 2, label: '{{1/3}}', col: '#E8751A' }, { a: 2, b: 3, label: '{{1}}', col: BLUE, height: 60 }, { a: 3, b: 13 / 4, label: '{{1/4}}', col: GREEN }],
  });
  tr(nl, 665, 212);
  const nlL = [mathC(bCnt, 665 + 150 * 2 / 3, 300, '1 2/3', { size: 30, anchor: 'middle', fill: '#E8751A' }), mathC(bCnt, 665 + 150 * 2.25, 300, '3 1/4', { size: 30, anchor: 'middle', fill: GREEN })];
  const nlTk = E('path', { d: `M${665 + 100},227 L${665 + 100},272 M${665 + 337.5},227 L${665 + 337.5},272`, stroke: '#9FB2C2', 'stroke-width': 2, 'stroke-dasharray': '4 4' }, bCnt);
  const cntM = mathC(bCnt, BX, 385, '1/3 + 1 + 1/4 = 1 7/12', { size: 40, anchor: 'middle', fill: INK });
  const cntN = mathC(bCnt, BX, 385, '1/3 + 1 + 1/4 = 4/12 + 1 + 3/12 = 1 7/12', { size: 40, anchor: 'middle', fill: INK });

  const boards = [bSugar, bLess, bSize, bAdd, bTop, bMix, bBack, bMad, bFlour, bEst, bBor, bTw, bCnt];

  /* ================= chips, bubbles ================= */
  const ch = {
    noon: chipAt(Lfg, '**12 p.m.**', { col: GOLD }),
    flw: chipAt(Lfg, 'famous last words **#2**', { col: '#FF8A8A', size: 28 }),
    oven: chipAt(Lfg, 'sugar: {{5/8}} cup', { col: '#FFFFFF', size: 32 }),
  };
  const ovenRing = E('ellipse', { cx: 0, cy: 0, rx: 150, ry: 46, fill: 'none', stroke: RED, 'stroke-width': 6 }, Lfg);

  /* ================= the cast ================= */
  const kav = cast(Lcast, 'kavya');
  const dad = cast(Lcast, 'dad', { prop: null, hand: true, style: 'apron', under: 'tee', shirt: '#3D8B6E', apron: '#FFFFFF', apronText: 'CHEF' });
  const spat = scHandProp(dad.hand, 'spatula');
  const book = G(dad.hand);   // the recipe book, upside down
  const bk = G(book); tr(bk, 0, -60, 1, 180);
  E('rect', { x: -56, y: -70, width: 112, height: 140, rx: 8, fill: '#E8424F', stroke: SC_INK, 'stroke-width': 4 }, bk);
  E('rect', { x: -56, y: -70, width: 16, height: 140, rx: 4, fill: '#A52A3A', stroke: SC_INK, 'stroke-width': 3 }, bk);
  E('rect', { x: -34, y: -40, width: 82, height: 40, rx: 5, fill: '#FFFDF6' }, bk);
  T(bk, 7, -10, 'CAKE', { size: 28, weight: 800, anchor: 'middle', fill: '#A52A3A' });
  // flour on Dad's face and hair
  const flourFace = G(dad.firstChild);
  const hy = dad.head[1];
  [[-34, hy + 22, 16, 10], [30, hy - 30, 12, 8], [4, hy + 8, 9, 6], [44, hy + 30, 9, 6]].forEach(([x, y, rx, ry]) => E('ellipse', { cx: x, cy: y, rx, ry, fill: '#FFFFFF', opacity: 0.92 }, flourFace));
  const boy = cast(Lcast, 'boy', { hat: '#4CC9F0' });
  const vin = cast(Ltop, 'vinny');
  const lt = { topsy: fcLowerThird(Lhud, 'topsy') };
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  const KY = 452, TS = 0.62;
  const TF = [985, 548];   // Topsy's feet on the counter

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    for (const k in ch) ch[k].set(0);
    for (const k in lt) lt[k].set(0);
    op(ovenRing, 0); stNo.set(0); stOK.set(0);
    boards.forEach(b => op(b, 0));

    // the clock runs from 12:00 to about 12:50
    const mins = 50 * clamp(t / S.D);
    kit.clock(12, mins);
    kit.oven(t >= at('oven') ? 0.3 + 0.7 * P(t, at('oven') + 0.2, 1.2, linear) * (0.85 + 0.15 * Math.sin(t * 5)) : 0);

    // the board pops in on 'sugar' and leaves on 'oven'
    const bIn = t < at('oven') - 0.1 ? P(t, at('sugar') - 0.1, 0.35, pop) : 1 - P(t, at('oven') - 0.1, 0.3, easeIn);
    op(wbG, clamp(bIn * 3)); tr(wbG, BX * (1 - Math.max(0.01, 0.85 + 0.15 * bIn)), BYc * (1 - Math.max(0.01, 0.85 + 0.15 * bIn)), Math.max(0.01, 0.85 + 0.15 * bIn));

    const inL = (a, b) => t >= at(a) - 0.05 && t < (b ? at(b) - 0.05 : 1e9);
    const show = (el, t0) => op(el, fadeIn(t, t0));

    /* ---------- board beats ---------- */
    if (t < at('sugar') - 0.05) { ch.noon.set(fadeIn(t, mid('noon', 0.05))); tr(ch.noon, 300, 220); }
    if (inL('sugar', 'less')) {
      op(bSugar, 1);
      op(sugQ, t < mid('sugar', 0.45) ? 1 : 0); op(sugW, t >= mid('sugar', 0.45) ? 1 : 0);
      show(sugN, mid('sugar', 0.5));
      if (t < at('bar') - 0.05) { ch.flw.set(fadeIn(t, mid('sugar', 0.82))); tr(ch.flw, 300, 220); }
      if (t >= at('bar') - 0.05) { stNo.set(P(t, at('bar') + 0.25, 0.35, linear)); tr(stNo, BX, 385, 0.55); }
    }
    if (inL('less', 'size')) {
      op(bLess, 1);
      show(b23, at('less')); show(b58, mid('less', 0.3)); show(lessDash, mid('less', 0.55)); show(lessM, mid('less', 0.6));
      show(bLess.lastChild, mid('less', 0.8));
    }
    if (inL('size', 'add')) {
      op(bSize, 1);
      show(b3, at('size')); show(b5, at('size') + 0.2); show(sizeT1, mid('size', 0.1));
      show(cuts, mid('size', 0.6)); show(sizeT2, mid('size', 0.7)); show(sizeT3, mid('size', 0.85));
    }
    if (inL('add', 'topsy')) {
      op(bAdd, 1);
      wAdd.set(clamp((t - at('add') - 0.05) / 0.5) + clamp((t - mid('add', 0.2)) / 0.5) + clamp((t - mid('add', 0.42)) / 0.5));
      wAdd.ring(2, fadeIn(t, mid('add', 0.6)));
      show(addN, mid('add', 0.65));
    }
    if (inL('topsy', 'mixed')) { op(bTop, 1); show(topN, mid('topsy', 0.45)); }
    if (inL('mixed', 'back')) {
      op(bMix, 1);
      show(mixA, at('mixed') + 0.1); show(mixB, mid('mixed', 0.45)); show(mixC, mid('mixed', 0.75));
      if (t < at('seat')) { stOK.set(P(t, mid('mixed', 0.88), 0.35, linear)); tr(stOK, 770, 405, 0.3); }
      else { stOK.set(1); tr(stOK, 770, 405, 0.3); }
    }
    if (inL('back', 'mad')) op(bBack, 1);
    if (inL('mad', 'flour')) {
      op(bMad, 1);
      madL.forEach((l, i) => show(l, mid('mad', 0.12 + i * 0.22)));
      show(madR, mid('mad', 0.78));
    }
    if (inL('flour', 'est')) {
      op(bFlour, 1);
      wFl.set(clamp((t - mid('flour', 0.32)) / 0.5) + clamp((t - mid('flour', 0.55)) / 0.5) + clamp((t - mid('flour', 0.85)) / 0.5));
    }
    if (inL('est', 'borrow')) {
      op(bEst, 1);
      show(estA, mid('est', 0.08)); show(estB, mid('est', 0.3)); show(estC, mid('est', 0.55)); show(estD, mid('est', 0.78));
    }
    if (inL('borrow', 'twelfths')) {
      op(bBor, 1);
      show(borHl, mid('borrow', 0.1)); show(borLt, mid('borrow', 0.15)); show(borCh, mid('borrow', 0.62));
    }
    if (inL('twelfths', 'count')) {
      op(bTw, 1);
      wTw.set(clamp((t - at('twelfths')) / 0.5) + clamp((t - mid('twelfths', 0.25)) / 0.5) + clamp((t - mid('twelfths', 0.5)) / 0.5) + clamp((t - mid('twelfths', 0.7)) / 0.5));
      wTw.ring(3, fadeIn(t, mid('twelfths', 0.88)));
    }
    if (inL('count', 'oven')) {
      op(bCnt, 1);
      nl.mark(0, P(t, at('count') + 0.1, 0.4, linear)); nl.mark(1, P(t, mid('count', 0.6), 0.4, linear)); show(nlL[0], at('count') + 0.1); show(nlL[1], mid('count', 0.6)); show(nlTk, at('count') + 0.1);
      nl.hop(0, P(t, mid('count', 0.12), 0.5)); nl.hop(1, P(t, mid('count', 0.35), 0.5)); nl.hop(2, P(t, mid('count', 0.55), 0.5));
      op(cntM, t < mid('count', 0.86) ? fadeIn(t, mid('count', 0.7)) : 0); show(cntN, mid('count', 0.86));
    }
    if (t >= at('oven')) {
      ch.oven.set(fadeIn(t, mid('oven', 0.55))); tr(ch.oven, 1040, 232);
      op(ovenRing, P(t, mid('oven', 0.7), 0.3, linear)); tr(ovenRing, 1040, 232, 1, -4);
    }

    /* ---------- props on the counter ---------- */
    op(sugar, t < at('flour') ? 1 : 0); op(flour, t >= at('flour') ? 1 : 0);
    op(spat, t >= at('sugar') ? 1 : 0); op(book, t < at('sugar') ? 1 : 0);
    op(flourFace, t >= at('flour') ? 1 : 0);

    /* ---------- Topsy ---------- */
    const tIn = at('topsy') - 0.15, tOut = at('flour') - 0.2;
    lt.topsy.set(win(t, at('topsy') + 0.2, at('topsy') + 3.3, 0.3));
    if (t >= tIn && t < tOut + 0.5) {
      op(topsy, 1);
      // pop out of the jug and land on the counter
      const jp = P(t, tIn, 0.55, linear);
      let fx = lerp(1085, TF[0], jp), fy = lerp(560, TF[1], jp) - 110 * Math.sin(Math.PI * jp);
      let s = TS * Math.max(0.2, Math.min(1, jp * 2));
      let ang = 0, whole = 0, mood = 'happy';
      const wob = Math.sin(t * 9) * AMP;
      if (t < mid('topsy', 0.55)) { ang = 8 * wob; mood = 'happy'; }
      else if (t < at('seat')) { ang = -45 * ease(P(t, mid('topsy', 0.55), 0.5, linear)); mood = t < mid('topsy', 0.6) ? 'shock' : (t < at('mixed') ? 'shock' : 'sad'); }
      else if (t < at('mad')) { const up = P(t, at('seat'), 0.35, easeOut); ang = -45 * (1 - up); whole = up; mood = t < at('back') ? 'happy' : 'shock'; }
      else { whole = 1 - P(t, mid('mad', 0.6), 0.3, linear); ang = t < mid('mad', 0.6) ? 4 * wob : -40 * P(t, mid('mad', 0.6), 0.4, easeIn) + 10 * wob; mood = t < mid('mad', 0.6) ? 'shock' : 'shock'; }
      if (t >= tOut) { const q = P(t, tOut, 0.45, easeIn); fx = lerp(TF[0], 1085, q); fy = TF[1] - 120 * Math.sin(Math.PI * q) + 30 * q; s = TS * (1 - 0.8 * q); ang = 360 * q; op(topsy, 1 - P(t, tOut + 0.3, 0.15, linear)); }
      const a = ang * Math.PI / 180, h = 120 * s;
      tr(topsy, fx + h * Math.sin(a), fy - h * Math.cos(a), s, ang);
      if (t < mid('mixed', 0.5)) topsy.nums('19', '15');
      else if (t < mid('mad', 0.6)) topsy.nums('4', '15');
      else topsy.nums('13', '5');
      topsy.set({ t, talk: scTalk(S, t, 'topsy'), mood, look: -0.6, whole });
    } else op(topsy, 0);

    /* ---------- the humans and Vinny ---------- */
    tr(kav, 105, KY, 0.92); tr(dad, 318, KY - 10, 0.92); tr(boy, 522, KY + 12, 0.92);
    tr(vin, 765, 548 - 114 * 0.5, 0.5);
    const who = scWho(S, t);
    const X = { kavya: 105, dad: 318, boy: 522, vinny: 765, topsy: 960 };
    const lk = x0 => { const x = X[who]; if (x === undefined) return 0.4; return clamp((x - x0) / 220, -1, 1); };
    const topsyOn = t >= at('topsy') && t < at('mixed');
    let km = 'neutral', dm = 'smug', bm = 'happy', vm = 'deadpan', vs = 0, dl = 0, dlift = 0, blift = 0;
    if (t < at('sugar')) { dm = 'happy'; dlift = 1; km = 'deadpan'; dl = 0.2; }
    else if (t < at('bar')) { dm = 'smug'; dlift = 1; km = 'shock'; }
    else if (t < at('less')) { dm = 'shock'; vm = 'annoyed'; vs = 1; km = 'deadpan'; bm = 'shock'; }
    else if (t < at('size')) { dm = 'sad'; km = 'neutral'; vm = 'annoyed'; }
    else if (t < at('add')) { dm = 'sad'; vm = 'neutral'; }
    else if (t < at('topsy')) { km = 'happy'; dm = 'neutral'; }
    else if (t < at('mixed')) { km = 'shock'; dm = 'shock'; bm = 'shock'; vm = 'deadpan'; }
    else if (t < at('seat')) { km = 'neutral'; dm = 'neutral'; bm = 'happy'; }
    else if (t < at('back')) { km = 'happy'; dm = 'happy'; bm = 'happy'; }
    else if (t < at('mad')) { bm = 'happy'; blift = 1; km = 'neutral'; dm = 'neutral'; }
    else if (t < at('flour')) { km = 'happy'; dm = 'neutral'; bm = 'shock'; }
    else if (t < at('est')) { dm = 'smug'; dlift = 1; km = 'deadpan'; bm = 'neutral'; }
    else if (t < at('borrow')) { km = 'neutral'; dm = 'neutral'; }
    else if (t < at('twelfths')) { vm = 'annoyed'; dm = 'sad'; km = 'neutral'; }
    else if (t < at('count')) { km = 'happy'; dm = 'sad'; vm = 'deadpan'; }
    else if (t < at('oven')) { bm = 'happy'; blift = 1; km = 'smug'; dm = 'neutral'; }
    else { dm = t < mid('oven', 0.5) ? 'happy' : 'sad'; km = t < mid('oven', 0.5) ? 'neutral' : 'deadpan'; bm = t < mid('oven', 0.5) ? 'happy' : 'deadpan'; vm = 'deadpan'; }
    const lookTopsy = topsyOn ? 1 : null;
    kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: lookTopsy !== null ? 1 : lk(105) });
    dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: lookTopsy !== null ? 1 : (who === 'dad' || who === 'narr' ? dl : lk(318)), lift: dlift });
    boy.set({ t, talk: scTalk(S, t, 'boy'), mood: bm, look: lookTopsy !== null ? 1 : lk(522), lift: blift });
    vin.set({ t, talk: scTalk(S, t, 'vinny'), mood: vm, look: lookTopsy !== null ? 1 : lk(765), stop: vs });
  };
});
