/* Scene 1: Four jugs of bandung (ratio notation, simplifying, equivalent ratios, the form 1 : n).
   Shots (hard sitcom cuts):
   A  the stall: Dad, Ah Boy and Mum behind the counter, the Colonel on the counter, Chopper on the counter in front of
      the working board (right). Each jug becomes a chain of ratios on the board: Dad 250 ml : 1 litre -> 250 : 1000
      -> ÷ 250 -> 1 : 4 (CHOP!); Ah Boy 1.5 : 6 -> × 10 -> 15 : 60 -> ÷ 15 -> 1 : 4; Mum ½ : 2 -> × 2 -> 1 : 4;
      Chopper finds nothing to chop.
   B  showpiece: three different vessels, the same pink, on the counter: 250 : 1000, 1.5 : 6, ½ : 2, all = 1 : 4
      (Ah Boy's 4 : 1 sludge at the end); IN PROPORTION.
   A  Ah Boy adds one to both: 1 : 4 -> + 1 -> 2 : 5, "same drink?"
   C  1 : 4 jug next to the darker 2 : 5 jug; 2 : 5 = 1 : 2.5; OUT OF PROPORTION.
   D  10 a.m., "less sweet, please": Mum 3 : 20 vs Dad 5 : 32; the form 1 : n; 1 : 6.67 vs 1 : 6.4 and the bars.
   E  Kavya's confessional: less milk per part of syrup, so Dad's is sweeter.
   D  Dad: "I was trying to make it less sweet." */
scene('mix', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const PINK = '#FF8FC8', GOLD = '#FFE45C', RED = '#D32F2F', BLUE = '#2E6FD8', GREEN = '#1E9E5A';
  const BAND = rpMix(1, 4);
  const chipAt = (parent, text, o) => { o = o || {}; return mkChip(parent, text, { size: o.size || 30, col: o.col || C.ink, fill: o.fill }); };
  const popSet = (el, t, t0, t1, x, y) => { const p = t >= t0 && t < t1 ? P(t, t0, 0.35, linear) : 0; el.set(p); if (x !== undefined) tr(el, x, y); };
  /* a ratio a : b with its colon at x = cx, baseline y: parts measured so arrows can sit under each part */
  const rrow = (parent, cx, y, a, b, o) => {
    o = o || {};
    const s = o.size || 40, fill = o.fill || MK.ink, g = G(parent), gap = s * 0.42;
    const la = mkMath(g, cx - gap, y, a, { size: s, fill, anchor: 'end' });
    mkMath(g, cx, y, ':', { size: s, fill, anchor: 'middle' });
    const rb = mkMath(g, cx + gap, y, b, { size: s, fill, anchor: 'start' });
    g.lc = cx - gap - la.w / 2; g.rc = cx + gap + rb.w / 2; g.y = y;
    g.a = Math.max(la.a, rb.a); g.d = Math.max(la.d, rb.d);
    g.x1 = cx - gap - la.w; g.x2 = cx + gap + rb.w;
    return g;
  };
  /* an arrow under each part from row A to row B, labelled on the outside */
  const steps = (parent, A, B, label, col) => {
    const g = G(parent); col = col || BLUE;
    const y1 = A.y + A.d + 8, y2 = B.y - B.a - 4;
    const a1 = arrow(g, A.lc, y1, B.lc, y2, { color: col, width: 4, head: 13 });
    const a2 = arrow(g, A.rc, y1, B.rc, y2, { color: col, width: 4, head: 13 });
    const ym = (y1 + y2) / 2 + 11;
    const t1 = mkMath(g, Math.min(A.lc, B.lc) - 18, ym, label, { size: 30, fill: col, anchor: 'end', weight: 700 });
    const t2 = mkMath(g, Math.max(A.rc, B.rc) + 18, ym, label, { size: 30, fill: col, anchor: 'start', weight: 700 });
    g.set = p => { a1.set(clamp(p * 1.5)); a2.set(clamp(p * 1.5)); op(t1, clamp(p * 2.5 - 1)); op(t2, clamp(p * 2.5 - 1)); };
    g.set(0);
    return g;
  };
  const slashOf = (parent, R) => E('path', { d: `M${R.x1 - 30},${R.y + 14} L${R.x2 + 30},${R.y - R.a - 10}`, stroke: '#FFFFFF', 'stroke-width': 10, 'stroke-linecap': 'round', opacity: 0 }, parent);
  const burst = (parent, text, size) => {
    const w = T(parent, 0, 0, text, { size: size || 58, weight: 800, anchor: 'middle', fill: GOLD });
    w.setAttribute('stroke', '#1E2878'); w.setAttribute('stroke-width', 10); w.setAttribute('paint-order', 'stroke'); w.setAttribute('stroke-linejoin', 'round');
    return w;
  };
  const card = (parent, cx, y, w, h) => E('rect', { x: cx - w / 2, y, width: w, height: h, rx: 12, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 4 }, parent);

  /* layers */
  const Lset = G(root), Lboard = G(root), Lcast = G(root), Lfront = G(root), Ltop = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= the stall (shots A, B, C, D) ================= */
  const stall = rpStall(Lset);
  Lfront.appendChild(stall.front); Lfront.appendChild(stall.top);

  /* the working board, behind the counter on the right (bottom hidden by the counter) */
  const board = G(Lboard);
  E('rect', { x: 625, y: 192, width: 458, height: 360, rx: 14, fill: MK.board, stroke: '#8FA3B8', 'stroke-width': 5 }, board);
  E('rect', { x: 625, y: 192, width: 458, height: 14, rx: 7, fill: '#C9D3DC' }, board);
  const CX = 852;     // the colon column of every chain
  const head = (parent, txt) => mkText(parent, CX, 246, txt, { size: 30, anchor: 'middle', fill: '#5A6670', weight: 700 });

  // ratio: syrup : milk = 1 : 4
  const bRatio = G(board);
  mkMath(bRatio, CX, 262, '"syrup" : "milk"', { size: 40, fill: MK.ink, anchor: 'middle' });
  mkMath(bRatio, CX, 420, '1 : 4', { size: 110, fill: '#B8336A', anchor: 'middle', weight: 700 });

  // Dad's jug
  const bDad = G(board); head(bDad, "**Dad's jug**");
  const d0 = rrow(bDad, CX, 310, '250 "ml"', '1 "litre"');
  const dWrong = G(bDad); const dw = rrow(dWrong, CX, 405, '250', '1', { fill: RED });
  mkMath(dWrong, dw.x2 + 22, 405, '?', { size: 44, fill: RED, weight: 700 });
  const dwx = cross(dWrong, 16); tr(dwx, dw.x2 + 80, 390);
  const d1a = rrow(bDad, CX, 405, '250 "ml"', '1000 "ml"');
  const d1b = rrow(bDad, CX, 405, '250', '1000');
  const d2 = rrow(bDad, CX, 500, '1', '4', { fill: GREEN });
  const dSt = steps(bDad, d1b, d2, '÷ 250');
  const dSlash = slashOf(bDad, d1b);

  // Ah Boy's jug
  const bBoy = G(board); head(bBoy, "**Ah Boy's jug**");
  const b0 = rrow(bBoy, CX, 310, '1.5', '6');
  const b1 = rrow(bBoy, CX, 405, '15', '60');
  const b2 = rrow(bBoy, CX, 500, '1', '4', { fill: GREEN });
  const bSt1 = steps(bBoy, b0, b1, '× 10'), bSt2 = steps(bBoy, b1, b2, '÷ 15');
  const bSlash = slashOf(bBoy, b1);

  // Mum's jug
  const bMum = G(board); head(bMum, "**Mum's jug**");
  const m0 = rrow(bMum, CX, 330, '1/2', '2');
  const m1 = rrow(bMum, CX, 440, '1', '4', { fill: GREEN });
  const mSt = steps(bMum, m0, m1, '× 2');

  // Ah Boy adds one
  const bAdd = G(board); head(bAdd, "**Ah Boy's idea**");
  const a0 = rrow(bAdd, CX, 330, '1', '4');
  const a1 = rrow(bAdd, CX, 450, '2', '5', { fill: RED });
  const aSt = steps(bAdd, a0, a1, '+ 1', RED);

  // less sweet: 1 : n
  const bLess = G(board);
  const lHead = mkText(bLess, CX + 10, 246, '**Less sweet?**', { size: 32, anchor: 'middle', fill: '#5A6670' });
  const lForm = mkText(bLess, CX + 10, 246, '**the form** {{1 : n}}', { size: 32, anchor: 'middle', fill: MK.ink });
  const lRule = mkText(bLess, CX + 10, 290, '÷ **both** parts by the **first** part', { size: 28, anchor: 'middle', fill: BLUE });
  const lDp = mkText(bLess, CX + 10, 290, '{{20 ÷ 3 = 6.666... ≈ 6.67}} (2 d.p.)', { size: 28, anchor: 'middle', fill: BLUE });
  const EQX = 868;
  const lMumN = mkText(bLess, 650, 352, '**Mum**', { size: 30, fill: '#B8336A' });
  const lMumL = mkMath(bLess, EQX - 16, 352, '3 : 20', { size: 40, fill: MK.ink, anchor: 'end' });
  const lMumR = mkMath(bLess, EQX - 2, 352, '= 1 : 6.67', { size: 40, fill: MK.ink, anchor: 'start' });
  const lDadN = mkText(bLess, 650, 412, '**Dad**', { size: 30, fill: '#2E7D4F' });
  const lDadL = mkMath(bLess, EQX - 16, 412, '5 : 32', { size: 40, fill: MK.ink, anchor: 'end' });
  const lDadR = mkMath(bLess, EQX - 2, 412, '= 1 : 6.4', { size: 40, fill: MK.ink, anchor: 'start' });
  // the bars: 1 part syrup, n parts milk (40 px a part)
  const barRow = (parent, x0, y, n, u, h, lab) => {
    const g = G(parent);
    E('rect', { x: x0, y, width: u, height: h, fill: '#E2559A', stroke: MK.ink, 'stroke-width': 3 }, g);
    T(g, x0 + u / 2, y + h / 2 + 9, '1', { size: 26, weight: 700, anchor: 'middle', fill: '#FFFFFF' });
    E('rect', { x: x0 + u, y, width: u * n, height: h, fill: '#FFF1E0', stroke: MK.ink, 'stroke-width': 3 }, g);
    let d = ''; for (let k = 1; k < n; k++) d += `M${x0 + u + k * u},${y} L${x0 + u + k * u},${y + h} `;
    E('path', { d, stroke: MK.ink, 'stroke-width': 1.5, opacity: 0.45 }, g);
    T(g, x0 + u + u * n / 2, y + h / 2 + 9, lab, { size: 26, weight: 700, anchor: 'middle', fill: MK.ink });
    g.end = x0 + u + u * n;
    return g;
  };
  const lBars = G(bLess);
  T(lBars, 650, 466, 'Mum', { size: 26, weight: 700, fill: '#B8336A' });
  T(lBars, 650, 510, 'Dad', { size: 26, weight: 700, fill: '#2E7D4F' });
  const barM = barRow(lBars, 716, 440, 6.67, 40, 36, '6.67 milk');
  const barD = barRow(lBars, 716, 484, 6.4, 40, 36, '6.4 milk');

  /* props on the counter (shot A) */
  const sludgeA = rpJug(stall.top, { col: rpMix(4, 1), s: 0.42 }); tr(sludgeA, 120, 532);
  const dadItems = G(stall.top);
  const bottle = G(dadItems); tr(bottle, 290, 530);
  E('path', { d: 'M-26,0 L-26,-90 Q-26,-104 -12,-110 L-12,-134 L12,-134 L12,-110 Q26,-104 26,-90 L26,0 Z', fill: RP_DRINK.syrup, stroke: '#5A6670', 'stroke-width': 4 }, bottle);
  E('rect', { x: -14, y: -146, width: 28, height: 14, rx: 3, fill: '#E6EBEF', stroke: '#5A6670', 'stroke-width': 3 }, bottle);
  const carton = G(dadItems); tr(carton, 388, 530);
  E('path', { d: 'M-36,0 L-36,-110 L-20,-136 L20,-136 L36,-110 L36,0 Z', fill: '#FFFFFF', stroke: '#5A6670', 'stroke-width': 4, 'stroke-linejoin': 'round' }, carton);
  E('path', { d: 'M-36,-110 L36,-110', stroke: '#5A6670', 'stroke-width': 3 }, carton);
  E('rect', { x: -36, y: -96, width: 72, height: 30, fill: '#6EC8FF' }, carton);
  T(carton, 0, -72, 'MILK', { size: 20, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  const tagB = chipAt(dadItems, '250 ml', { size: 26, col: '#FFB3D1' }); tr(tagB, 290, 590);
  const tagC = chipAt(dadItems, '1 litre', { size: 26, col: '#9FD8FF' }); tr(tagC, 388, 640);
  [tagB, tagC].forEach(c => c.set(1));

  /* ================= shot B / C: the vessels close up (on the same counter) ================= */
  const vesS = G(Ltop), vesB = G(Ltop), vesC = G(Ltop);
  const vDad = rpJug(vesS, { col: BAND, s: 0.82 }); tr(vDad, 420, 532);
  const vBoy = rpCup(vesB, { col: BAND, s: 1.0 }); tr(vBoy, 650, 532);
  const vMum = rpJug(vesB, { col: BAND, s: 0.6 }); tr(vMum, 880, 532);
  const vSl = rpJug(vesS, { col: rpMix(4, 1), s: 0.5 }); tr(vSl, 1085, 532);
  const tagCard = (parent, cx, top, src, src2) => {
    const g = G(parent);
    card(g, cx, top, 200, 118);
    mkMath(g, cx, top + 52, src, { size: 36, fill: MK.ink, anchor: 'middle' });
    if (src2) mkMath(g, cx, top + 102, src2, { size: 36, fill: GREEN, anchor: 'middle' });
    return g;
  };
  const tDad = tagCard(vesB, 420, 560, '250 : 1000', '= 1 : 4');
  const tBoy = tagCard(vesB, 650, 560, '1.5 : 6', '= 1 : 4');
  const tMum = G(vesB); card(tMum, 880, 556, 200, 126);
  mkMath(tMum, 880, 608, '1/2 : 2', { size: 34, fill: MK.ink, anchor: 'middle' });
  mkMath(tMum, 880, 666, '= 1 : 4', { size: 36, fill: GREEN, anchor: 'middle' });
  const eqTitle = mkChip(vesB, '**Equivalent ratios**', { size: 40, col: GOLD });
  const eqRule = mkChip(vesB, '× or ÷ **every** part by the **same** number', { size: 30, col: C.ink });
  const stampIn = rpStamp(Lfg, true);

  const cTwo = rpJug(vesC, { col: rpMix(2, 5), s: 0.82 }); tr(cTwo, 780, 532);
  const cTag1 = tagCard(vesC, 470, 560, '1 : 4', '');
  const cTag2 = G(vesC); card(cTag2, 780, 560, 200, 118);
  mkMath(cTag2, 780, 612, '2 : 5', { size: 36, fill: RED, anchor: 'middle' });
  const cAdd = mkChip(vesC, '**Adding** changes the ratio', { size: 30, col: '#FF8A8A' });
  const cMore = mkChip(vesC, '{{2 : 5 = 1 : 2.5}}: more syrup per milk', { size: 30, col: GOLD });
  const stampOut = rpStamp(Lfg, false);

  /* shot D: Mum's and Dad's jugs */
  const jugM = rpJug(stall.top, { col: rpMix(3, 20), s: 0.5 }); tr(jugM, 290, 532);
  const jugD = rpJug(stall.top, { col: rpMix(5, 32), s: 0.5 }); tr(jugD, 552, 532);
  const tagM = mkChip(stall.top, '{{3 : 20}}', { size: 28, col: '#FFB3D1' }); tr(tagM, 290, 478);
  const tagD = mkChip(stall.top, '{{5 : 32}}', { size: 28, col: '#9FE0B5' }); tr(tagD, 552, 478);

  /* ================= shot E: Kavya's confessional ================= */
  const conf = rpConf(Lset, 'kavya');
  const kCard = G(Lfg);
  E('rect', { x: 600, y: 150, width: 560, height: 420, rx: 20, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, kCard);
  mkText(kCard, 880, 212, 'for **1** part syrup...', { size: 34, anchor: 'middle', fill: MK.ink });
  T(kCard, 628, 290, 'Mum', { size: 30, weight: 700, fill: '#B8336A' });
  T(kCard, 628, 380, 'Dad', { size: 30, weight: 700, fill: '#2E7D4F' });
  const kM = barRow(kCard, 700, 256, 6.67, 52, 48, '6.67 parts milk');
  const kDglow = E('rect', { x: 690, y: 336, width: 52 * 7.4 + 20, height: 68, rx: 14, fill: PINK, opacity: 0 }, kCard);
  const kD = barRow(kCard, 700, 346, 6.4, 52, 48, '6.4 parts milk');
  const kGap = G(kCard);
  E('path', { d: `M${kD.end},336 L${kD.end},404 M${kM.end},246 L${kM.end},404`, stroke: RED, 'stroke-width': 4, 'stroke-dasharray': '8 6' }, kGap);
  mkText(kGap, kD.end - 70, 448, '**less milk** here', { size: 28, anchor: 'middle', fill: RED });
  const kSweet = mkText(kCard, 880, 520, "less milk per part of syrup ⇒ **sweeter**", { size: 30, anchor: 'middle', fill: MK.ink });

  /* ================= the cast ================= */
  const dad = cast(Lcast, 'dad', { s: 0.92, prop: null });
  const mum = cast(Lcast, 'mum', { s: 0.92 });
  const boy = cast(Lcast, 'boy', { s: 0.92 });
  const col = cast(Ltop, 'colonel', { s: 0.6 });
  const chop = cast(Ltop, 'chop', { s: 0.42 });
  const kav = cast(Lfg, 'kavya', { s: 1.4 });
  const lt = { chop: rpLowerThird(Lhud, 'chop'), mum: rpLowerThird(Lhud, 'mum') };

  /* chips (the chip zone above the heads, x 120-620, y 190-300) */
  const ch = {
    kind: chipAt(Lfg, '**same kind** of quantity', { col: GOLD }),
    units: chipAt(Lfg, '**Same units first!**', { col: '#FF8A8A' }),
    litre: chipAt(Lfg, '1 litre = 1000 ml', { col: GOLD }),
    simp: chipAt(Lfg, 'chop to **simplest form**', { col: '#CFE3FF' }),
    hcf: chipAt(Lfg, '**HCF** = 250', { col: GOLD }),
    round: chipAt(Lfg, 'syrup first: **right way round**', { col: '#9FE0B5' }),
    dec: chipAt(Lfg, '**No decimals.**', { col: '#FF8A8A' }),
    hcf2: chipAt(Lfg, '**HCF** = 15', { col: GOLD }),
    frac: chipAt(Lfg, '**No fractions.**', { col: '#FF8A8A' }),
    simplest: chipAt(Lfg, '**simplest form**:\nno common factor but 1', { col: '#CFE3FF', size: 28 }),
    ten: chipAt(Lfg, '**10 a.m.**', { col: GOLD }),
    vs: chipAt(Lfg, '**Mum vs Dad**', { col: PINK }),
    dec2: chipAt(Lfg, '**n** can be a decimal', { col: '#CFE3FF' }),
  };
  const bubSame = mkSpeechBubble(Lfg, 'Same drink?', { size: 32, tail: 'down', tailX: 40 });
  const bubLess = mkSpeechBubble(Lfg, '"Less sweet, please."', { size: 30, tail: 'down', tailX: -60 });
  const chopTxt = burst(Lfg, 'CHOP!');

  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cuts */
  const cB = at('equiv') - 0.06, cA2 = at('add') - 0.06, cC = at('no') - 0.06, cD = at('less') - 0.06,
    cE = at('sweeter') - 0.06, cD2 = at('trying') - 0.06;
  const HOME = [1092, 530 - 92 * 0.42];        // Chopper standing on the counter in front of the board
  const swing = (t, tS) => {                    // raise the blade, then CHOP down, then settle
    const raise = P(t, tS - 0.55, 0.35, easeOut), sw = P(t, tS, 0.14, easeIn);
    return 38 * raise * (1 - sw) - 12 * sw * (1 - P(t, tS + 0.25, 0.3, ease));
  };
  const chopAt = (t, t0, t1, rowY, tS) => {     // hop up beside a row, swing at tS, hop back home
    const up = P(t, t0, 0.3, easeOut) * (1 - P(t, t1, 0.3, easeIn));
    tr(chop, HOME[0], lerp(HOME[1], rowY - 40, up), lerp(0.42, 0.5, up), swing(t, tS));
  };

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const sA = on(t, -1, cB) || on(t, cA2, cC), sB = on(t, cB, cA2), sC = on(t, cC, cD), sD = on(t, cD, cE) || on(t, cD2, 1e9), sE = on(t, cE, cD2);
    const stallOn = sA || sB || sC || sD;
    op(stall, stallOn); op(stall.front, stallOn); op(stall.top, stallOn);
    if (stallOn) stall.upd(t);
    for (const k in lt) lt[k].set(0);
    for (const k in ch) ch[k].set(0);
    bubSame.set(0); bubLess.set(0); op(chopTxt, 0);
    stampIn.set(0); stampOut.set(0);
    op(board, sA || sD);
    [bRatio, bDad, bBoy, bMum, bAdd, bLess].forEach(b => op(b, 0));
    op(vesS, sB || sC); op(vesB, sB); op(vesC, sC); tr(vDad, sC ? 470 : 420, 532); op(stall.menu, sB || sC ? 0 : 1);
    op(sludgeA, sA); op(dadItems, 0);
    [jugM, jugD, tagM, tagD].forEach(e => op(e, 0));
    const show = { dad: 0, mum: 0, boy: 0, col: 0, chop: 0, kav: 0 };

    /* ---------- A: the stall and the board ---------- */
    if (sA) {
      show.dad = 1; show.col = 1;
      // the Colonel on the counter, between the humans and the board
      tr(col, 590, 530 - 114 * 0.6);
      let cm = 'deadpan', pt = 0;
      if (t < at('dad')) { cm = 'deadpan'; pt = t > mid('ratio', 0.45) ? 1 : 0; }
      else if (t < at('units')) cm = t > mid('dad', 0.6) ? 'annoyed' : 'deadpan';
      else if (t < at('chop')) { cm = 'annoyed'; pt = t > mid('units', 0.4) ? 1 : 0; }
      else if (t >= at('dec') && t < at('chop2')) { pt = t > mid('dec', 0.3) ? 1 : 0; }
      else if (t >= at('frac') && t < at('sad')) { pt = t > mid('frac', 0.3) ? 1 : 0; }
      else if (t >= cA2) cm = 'annoyed';
      col.set({ t, talk: scTalk(S, t, 'colonel'), mood: cm, look: t >= at('chop') && t < at('boy') ? 0.8 : (t >= at('boy') && t < at('dec') ? -0.8 : 0.5), point: pt });

      // Dad
      tr(dad, 158, 440, 0.92);
      let dm = 'neutral', dl = 0.8;
      if (t < at('dad')) dm = 'smug';
      else if (t < at('units')) { dm = 'smug'; dl = 0.4; }
      else if (t < at('chop')) { dm = t < mid('units', 0.3) ? 'shock' : 'sad'; dl = 0.8; }
      else if (t < at('boy')) dm = 'shock';
      else if (t >= cA2) dm = t < at('no') - 0.3 ? 'neutral' : 'shock';
      dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: dl });
      // Dad's syrup and milk
      if (t >= at('dad') && t < at('chop') + 0.6) {
        const p = P(t, at('dad') + 0.1, 0.3, pop) * (1 - P(t, at('chop') + 0.3, 0.3, linear));
        op(dadItems, clamp(p * 2));
      }
      // Ah Boy
      if (t >= at('boy') - 0.3) {
        show.boy = 1;
        const up = P(t, at('boy') - 0.3, 0.35, pop);
        tr(boy, 446, lerp(660, 448, up), 0.92);
        let bm = 'happy', bl = -0.6;
        if (t >= at('dec') && t < at('mum')) bl = 0.8;
        if (t >= at('mum') && t < cB) bl = -0.6;
        if (t >= cA2) bl = t < at('add') + 0.3 ? 0.8 : 0.8;
        if (t >= at('no') - 0.2 && t >= cA2) bm = 'shock';
        boy.set({ t, talk: scTalk(S, t, 'boy'), mood: bm, look: bl, lift: (t < at('dec') || (t >= cA2)) && t < end('add') ? 1 : 0 });
      }
      // Mum
      if (t >= at('mum') - 0.3) {
        show.mum = 1;
        const up = P(t, at('mum') - 0.3, 0.35, pop);
        tr(mum, 304, lerp(660, 440, up), 0.92);
        mum.set({ t, talk: scTalk(S, t, 'mum'), mood: t < at('sad') ? 'smug' : (t >= cA2 ? 'deadpan' : 'neutral'), look: 0.8, lift: t < at('frac') ? 1 : 0 });
        if (t < cB) lt.mum.set(win(t, at('mum') + 0.1, at('mum') + 3.2, 0.3));
      }
      // Chopper
      if (t >= at('chop') - 0.1) {
        show.chop = 1;
        if (t < at('boy')) {
          const fly = P(t, at('chop') - 0.1, 0.45, easeOut), back = P(t, end('chop') + 0.1, 0.3, easeIn);
          tr(chop, lerp(1320, HOME[0], fly), lerp(365, HOME[1], back), lerp(0.5, 0.42, back), swing(t, mid('chop', 0.74)));
          lt.chop.set(win(t, at('chop') + 0.2, at('chop') + 3.3, 0.3));
        } else if (t < at('mum')) chopAt(t, mid('chop2', 0.0) - 0.2, end('chop2') + 0.1, 405, mid('chop2', 0.55));
        else if (t < cB) {
          // sad: hops up over Mum's 1 : 4, raises the blade, finds nothing, droops
          const up = P(t, at('sad') - 0.25, 0.3, easeOut);
          const raise = P(t, at('sad') + 0.1, 0.35, easeOut), droop = P(t, mid('sad', 0.55), 0.6, ease);
          tr(chop, HOME[0], lerp(HOME[1], 400 + 18 * droop, up), lerp(0.42, 0.5, up), 34 * raise * (1 - droop) - 8 * droop);
        } else tr(chop, HOME[0], HOME[1], 0.42, 0);
        let cmood = 'happy', arms = 0.8;
        if (t >= mid('sad', 0.5) && t < cB) { cmood = 'sad'; arms = 0; }
        if (t >= cA2) { cmood = t >= at('no') ? 'shock' : 'neutral'; arms = 0.3; }
        chop.set({ t, talk: scTalk(S, t, 'chop'), mood: cmood, look: -0.6, arms, still: cmood === 'sad' });
      }

      // ----- the board -----
      if (t < at('dad')) {
        op(bRatio, P(t, at('ratio') + 0.1, 0.3, linear));
        popSet(ch.kind, t, mid('ratio', 0.3), 1e9, 380, 250);
      } else if (t < at('boy')) {
        op(bDad, 1);
        op(d0, P(t, mid('dad', 0.25), 0.3, linear));
        op(dWrong, P(t, mid('dad', 0.62), 0.3, linear) * (1 - P(t, at('units'), 0.25, linear)));
        op(d1a, P(t, mid('units', 0.45), 0.3, linear) * (1 - P(t, mid('units', 0.82), 0.3, linear)));
        op(d1b, P(t, mid('units', 0.82), 0.3, linear));
        dSt.set(P(t, mid('chop', 0.42), 0.6, linear));
        op(d2, P(t, mid('chop', 0.8), 0.25, linear));
        op(dSlash, win(t, mid('chop', 0.74), mid('chop', 0.74) + 0.45, 0.08) * 0.9);
        if (t >= at('units') && t < at('chop')) { popSet(ch.units, t, at('units') + 0.05, 1e9, 370, 220); popSet(ch.litre, t, mid('units', 0.3), 1e9, 370, 280); }
        if (t >= at('chop')) { popSet(ch.simp, t, mid('chop', 0.15), 1e9, 380, 220); popSet(ch.hcf, t, mid('chop', 0.42), 1e9, 380, 280); }
        const cp = win(t, mid('chop', 0.74), mid('chop', 0.74) + 0.9, 0.12);
        op(chopTxt, cp); tr(chopTxt, 1040, 262, 0.8 + 0.25 * cp, -6);
      } else if (t < at('mum')) {
        op(bBoy, 1);
        op(b0, P(t, mid('boy', 0.3), 0.3, linear));
        bSt1.set(P(t, mid('dec', 0.45), 0.6, linear));
        op(b1, P(t, mid('dec', 0.75), 0.25, linear));
        bSt2.set(P(t, mid('chop2', 0.2), 0.5, linear));
        op(b2, P(t, mid('chop2', 0.62), 0.25, linear));
        op(bSlash, win(t, mid('chop2', 0.55), mid('chop2', 0.55) + 0.45, 0.08) * 0.9);
        if (t < at('dec')) popSet(ch.round, t, mid('boy', 0.65), 1e9, 300, 250);
        else if (t < at('chop2')) popSet(ch.dec, t, at('dec') + 0.05, 1e9, 300, 250);
        else popSet(ch.hcf2, t, at('chop2') + 0.05, 1e9, 300, 250);
        const cp = win(t, mid('chop2', 0.55), mid('chop2', 0.55) + 0.9, 0.12);
        op(chopTxt, cp); tr(chopTxt, 1040, 262, 0.8 + 0.25 * cp, -6);
      } else if (t < cB) {
        op(bMum, 1);
        op(m0, P(t, mid('mum', 0.4), 0.3, linear));
        mSt.set(P(t, mid('frac', 0.4), 0.6, linear));
        op(m1, P(t, mid('frac', 0.75), 0.25, linear));
        if (t >= at('frac') && t < at('sad')) popSet(ch.frac, t, at('frac') + 0.05, 1e9, 300, 250);
        if (t >= at('sad')) popSet(ch.simplest, t, mid('sad', 0.3), 1e9, 300, 246);
      } else {
        // A again: Ah Boy adds one to both
        op(bAdd, 1);
        op(a0, P(t, at('add') + 0.1, 0.3, linear));
        aSt.set(P(t, mid('add', 0.3), 0.6, linear));
        op(a1, P(t, mid('add', 0.55), 0.25, linear));
        popSet(bubSame, t, mid('add', 0.6), 1e9, 430, 246);
      }
    }

    /* ---------- B: the vessels, all the same pink ---------- */
    if (sB) {
      show.col = 1;
      tr(col, 160, 530 - 114 * 0.8, 0.8);
      col.set({ t, talk: scTalk(S, t, 'colonel'), mood: t > mid('equiv', 0.85) ? 'smug' : 'deadpan', look: 0.7, point: t > mid('equiv', 0.3) ? 1 : 0 });
      const v = (el, k) => { const p = P(t, at('equiv') + 0.05 + k * 0.18, 0.35, pop); op(el, clamp(p * 3)); };
      [tDad, tBoy, tMum].forEach((e, k) => v(e, k));
      eqTitle.set(P(t, at('equiv') + 0.1, 0.35, linear)); tr(eqTitle, 720, 232);
      eqRule.set(P(t, mid('equiv', 0.35), 0.35, linear)); tr(eqRule, 720, 306);
      stampIn.set(P(t, mid('equiv', 0.86), 0.35, linear)); tr(stampIn, 650, 450, 0.45);
    }

    /* ---------- C: 1 : 4 next to 2 : 5 ---------- */
    if (sC) {
      show.col = 1;
      tr(col, 160, 530 - 114 * 0.8, 0.8);
      col.set({ t, talk: scTalk(S, t, 'colonel'), mood: 'annoyed', look: 0.7, point: t > mid('no', 0.3) ? 1 : 0 });
      op(cTag1, 1); op(cTag2, 1);
      cAdd.set(P(t, mid('no', 0.1), 0.35, linear)); tr(cAdd, 640, 232);
      cMore.set(P(t, mid('no', 0.4), 0.35, linear)); tr(cMore, 640, 304);
      stampOut.set(P(t, end('no') + 0.05, 0.35, linear)); tr(stampOut, 780, 440, 0.4);
    }

    /* ---------- D: less sweet, the form 1 : n ---------- */
    if (sD) {
      show.mum = 1; show.dad = 1; show.col = 1;
      op(bLess, 1);
      tr(mum, 168, 440, 0.92); tr(dad, 420, 440, 0.92);
      tr(col, 1098, 530 - 114 * 0.6, 0.6);
      const late = t >= cD2;
      let mm = 'annoyed', ml = 0.8, dm = 'annoyed', dl = -0.8;
      if (t >= at('mine') && t < at('n')) { mm = 'smug'; dm = t >= at('mine2') ? 'smug' : 'annoyed'; }
      if (t >= at('n')) { mm = 'neutral'; dm = 'smug'; ml = 0.8; dl = 0.8; }
      if (late) { mm = 'smug'; ml = 0.8; dm = t < mid('trying', 0.25) ? 'smug' : 'sad'; dl = -0.6; }
      mum.set({ t, talk: scTalk(S, t, 'mum'), mood: mm, look: ml, lift: t >= at('mine') && t < at('mine2') ? 1 : 0 });
      dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: dl });
      col.set({ t, talk: scTalk(S, t, 'colonel'), mood: 'deadpan', look: -0.6, point: 0 });
      // the jugs and their tags
      op(jugM, P(t, mid('mine', 0.1), 0.25, linear)); op(tagM, P(t, mid('mine', 0.3), 0.25, linear));
      op(jugD, P(t, mid('mine2', 0.1), 0.25, linear)); op(tagD, P(t, mid('mine2', 0.3), 0.25, linear));
      // board
      op(lHead, t < at('n') ? 1 : 0); op(lForm, P(t, at('n') + 0.05, 0.3, linear));
      op(lRule, P(t, mid('n', 0.3), 0.3, linear) * (1 - P(t, mid('calc', 0.62), 0.25, linear)));
      op(lDp, P(t, mid('calc', 0.62), 0.3, linear));
      op(lMumN, P(t, mid('mine', 0.2), 0.25, linear)); op(lMumL, P(t, mid('mine', 0.2), 0.25, linear));
      op(lDadN, P(t, mid('mine2', 0.2), 0.25, linear)); op(lDadL, P(t, mid('mine2', 0.2), 0.25, linear));
      op(lMumR, P(t, mid('calc', 0.12), 0.3, linear)); op(lDadR, P(t, mid('calc', 0.5), 0.3, linear));
      op(lBars, P(t, mid('calc', 0.78), 0.3, linear));
      if (!late) {
        popSet(ch.ten, t, at('less') + 0.05, at('mine'), 540, 220);
        popSet(bubLess, t, mid('less', 0.25), at('mine'), 300, 228);
        popSet(ch.vs, t, mid('less', 0.68), at('mine'), 560, 300);
        if (t >= at('n')) popSet(ch.dec2, t, mid('n', 0.65), 1e9, 300, 250);
      }
    }

    /* ---------- E: Kavya's confessional ---------- */
    conf.set(sE, t); op(kCard, sE);
    if (sE) {
      show.kav = 1;
      tr(kav, 300, 420, 1.4);
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: t > mid('sweeter', 0.7) ? 'smug' : 'neutral', look: 0.6 });
      op(kGap, P(t, mid('sweeter', 0.2), 0.3, linear));
      op(kDglow, 0.45 * P(t, mid('sweeter', 0.6), 0.4, linear) * (0.75 + 0.25 * Math.sin(t * 5) * AMP));
      op(kSweet, P(t, mid('sweeter', 0.55), 0.3, linear));
    }

    op(dad, show.dad); op(mum, show.mum); op(boy, show.boy); op(col, show.col); op(chop, show.chop); op(kav, show.kav);
  };
});
