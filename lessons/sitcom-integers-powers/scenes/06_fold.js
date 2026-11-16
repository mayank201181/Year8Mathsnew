/* Scene 6: Fold to the Moon (powers and the index laws).
   Shots (hard sitcom cuts):
   A  the FOLD TO THE MOON booth, 2 p.m.: Ah Boy, Kavya and Dad (with his new calculator) behind the table on the left,
      Mum running the booth on the right, the paper stack between them; Basil the base and Tiny the index on the table.
      The maths sits in a strip above their heads.
      fold   Mum folds: 1 sheet -> 2 -> 4 -> 8 layers; 2 × 2 × 2 = 8
      tiny   Tiny (lower third) bounces onto the stack: 2 × 2 × 2 = 2³, the 3 ringed: "index = how many 2s"
      basil  Basil (lower third), deadpan, belly "2": base and index labelled on 2³
      dad    Dad, smug: 2³ × 2⁴ = 4⁷ in red, BZZT!
      change push in on Basil, annoyed for once: THE BASE. DOES NOT. CHANGE. one word per beat
   B  the booth whiteboard, close: Basil stands on the table at the left with Tiny floating up and to his right (they
      ARE a power), Mum and Kavya in front of the board at the bottom right.
      add    three boxes of 2 and four boxes of 2 slide together into seven: 2³ × 2⁴ = 2³⁺⁴ = 2⁷, CORRECT! (showpiece)
      unfold (2 × 2 × 2 × 2 × 2 × 2 × 2)/(2 × 2 × 2): three 2s cancel; 2⁷ ÷ 2³ = 2⁷⁻³ = 2⁴
      power  (2³)⁴ = 2³ × 2³ × 2³ × 2³ = 2¹²  (3 × 4 = 12)
      zero   2³ ÷ 2³ = 8 ÷ 8 = 1 and 2³ ÷ 2³ = 2³⁻³ = 2⁰, so 2⁰ = 1: one sheet
      mad    MAD SPM: Multiply → Add, Divide → Subtract, Power → Multiply, each with its example
      letters 3x² × 4x⁵ = 12x⁷ (3 × 4 = 12, 2 + 5 = 7)
      same   2³ × 5² = 8 × 25 = 200: different bases, just work it out
      moon   Earth, the Moon and a paper tower: 0.1 × 2⁴² mm ≈ 440 000 km; the Moon is about 384 000 km away
   A  seventh  Dad straining over a fat wad: 6 folds, 2⁶ = 64 layers; Mum deadpan. */
scene('fold', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const popAt = (c, t, t0, x, y, t1) => { c.set(t >= t0 && (t1 === undefined || t < t1) ? P(t, t0, 0.35, linear) : 0); if (x !== undefined) tr(c, x, y); };
  const fadeIn = (el, t, t0, d) => op(el, P(t, t0, d || 0.3, linear));
  const GOLD = '#FFE45C', RED = '#D32F2F', GREEN = '#1E9E5A', INK = MK.ink, MUTE = '#5A6670', PINK = '#C2185B', BLUE = '#2E6FD8';
  const strip = (parent, w, col) => {   // a dark pill for the maths above the heads, centred at (0,0)
    const g = G(parent);
    E('rect', { x: -w / 2, y: -40, width: w, height: 80, rx: 40, fill: 'rgba(10,27,39,0.92)', stroke: col || GOLD, 'stroke-width': 4 }, g);
    return g;
  };
  const bigWord = (parent, txt, col) => { const w = T(parent, 0, 0, txt, { size: 60, weight: 800, anchor: 'middle', fill: col || '#FFFFFF', ls: 2 }); w.setAttribute('stroke', '#1A2430'); w.setAttribute('stroke-width', 10); w.setAttribute('paint-order', 'stroke'); w.setAttribute('stroke-linejoin', 'round'); return w; };

  /* layers */
  const Lset = G(root), Lbd = G(root), Lcast = G(root), Lfront = G(root), Ltop = G(root), Lfg = G(root), Lhud = G(root);
  const ZOOM = [Lset, Lcast, Lfront, Ltop];
  const cam = (kk, cx, cy) => {
    const w = 1200 / kk, h = 750 / kk, l = clamp(cx - w / 2, 0, 1200 - w), tp = clamp(cy - h / 2, 0, 750 - h);
    ZOOM.forEach(L => L.setAttribute('transform', `scale(${kk.toFixed(4)}) translate(${(-l).toFixed(1)} ${(-tp).toFixed(1)})`));
  };

  /* ================= A: the booth ================= */
  const booth = ipBooth(Lset, { title: 'FOLD TO THE MOON', col: PINK, cloth: '#FF8FC8' });
  Lfront.appendChild(booth.front); Lfront.appendChild(booth.top);
  const XB = 110, XK = 250, XD = 395, XM = 960, YB = 430, XPAP = 760, XBAS = 578;
  const paper = ipPaper(Ltop, { w: 200 }); tr(paper, XPAP, 530);
  const flap = E('rect', { x: 0, y: -4, width: 100, height: 6, rx: 2, fill: '#FFFDF6', stroke: '#8C7E5C', 'stroke-width': 2.5 }, Ltop);
  const layerChips = ['**1** sheet', '**2** layers', '**4** layers', '**8** layers'].map(s => mkChip(Lfg, s, { size: 30, col: '#FFFFFF' }));
  const wad = ipPaper(Ltop, { w: 76 }); wad.set(64);
  // strips
  const sFold = strip(Lfg, 560);
  const fM = ['2 = 2', '2 * 2 = 4', '2 * 2 * 2 = 8'].map(src => mkMath(sFold, 0, 16, src, { size: 46, anchor: 'middle' }));
  const sTiny = strip(Lfg, 560);
  const tM = mkMath(sTiny, 0, 16, '2 * 2 * 2 = 2^3', { size: 46, anchor: 'middle' });
  const tRing = E('circle', { cx: tM.x0 + tM.w - 11, cy: -16, r: 19, fill: 'none', stroke: GOLD, 'stroke-width': 4 }, sTiny);
  const cHow = mkChip(Lfg, 'index = **how many 2s**', { size: 30, col: GOLD });
  const sBas = strip(Lfg, 560);
  const bM = mkMath(sBas, -10, 22, '2^3', { size: 64, anchor: 'middle', fill: GOLD });
  T(sBas, -60, 12, 'base →', { size: 30, weight: 700, anchor: 'end', fill: '#E9DFC9' });
  T(sBas, 50, 12, '← index', { size: 30, weight: 700, anchor: 'start', fill: GOLD });
  const sDad = strip(Lfg, 560, '#FF8A8A');
  mkMath(sDad, 0, 16, '2^3 * 2^4 = 4^7', { size: 50, anchor: 'middle', fill: '#FF8A8A' });
  const stBz = ipStamp(Lfg, false);
  const words = ['THE BASE.', 'DOES NOT.', 'CHANGE.'].map(s => bigWord(Lfg, s, s === 'CHANGE.' ? GOLD : '#FFFFFF'));
  const WW = ['THE BASE.', 'DOES NOT.', 'CHANGE.'].map(s => textWidth(s, 60, FD, 800) + 8), WGAP = 36, WTOT = WW.reduce((a, b) => a + b, 0) + 2 * WGAP;
  const WX = WW.map((w, i) => 600 - WTOT / 2 + WW.slice(0, i).reduce((a, b) => a + b, 0) + i * WGAP + w / 2);
  const sSev = strip(Lfg, 560);
  mkText(sSev, 0, 16, '6 folds: {{2^6 = 64}} layers', { size: 40, anchor: 'middle' });
  const cTwo = mkChip(Lfg, '**2 p.m.**', { size: 32, col: GOLD });

  /* ================= B: the whiteboard ================= */
  const shotB = G(Lbd);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#F4EEE2', '#E2D9C6', true) }, shotB);
  E('rect', { x: 0, y: 610, width: 360, height: 20, rx: 6, fill: '#E6EBEF', stroke: '#7D8A96', 'stroke-width': 4 }, shotB);
  E('rect', { x: 0, y: 630, width: 350, height: 120, fill: '#FF8FC8', stroke: SC_INK, 'stroke-width': 4 }, shotB);
  const BL = 372, BR = 1176, BT = 108, BBot = 600, BXc = (BL + BR) / 2;
  E('rect', { x: BL, y: BT, width: BR - BL, height: BBot - BT, rx: 16, fill: MK.board, stroke: '#8FA3B8', 'stroke-width': 6 }, shotB);
  E('rect', { x: BL, y: BT, width: BR - BL, height: 16, rx: 8, fill: '#C9D3DC' }, shotB);
  const head = (parent, txt, col) => T(parent, BXc, 168, txt, { size: 34, weight: 800, anchor: 'middle', fill: col || PINK, ls: 2 });

  // add: boxes of 2
  const gAdd = G(shotB);
  const hAdd = head(gAdd, 'MULTIPLY: ADD THE INDICES');
  const BOX = 64, PITCH = 74, ROW1 = 206, ROW2 = 290;
  const r1x = i => (i < 3 ? 452 + i * PITCH : 452 + 3 * PITCH + 70 + (i - 3) * PITCH);
  const r2x = i => BXc - 3.5 * PITCH + i * PITCH + (PITCH - BOX) / 2 - 34;
  const boxes = [];
  for (let i = 0; i < 7; i++) {
    const g = G(gAdd);
    E('rect', { x: 0, y: 0, width: BOX, height: BOX, rx: 10, fill: i < 3 ? '#FFE29A' : '#FFC4E0', stroke: INK, 'stroke-width': 3 }, g);
    T(g, BOX / 2, BOX / 2 + 15, '2', { size: 42, weight: 800, anchor: 'middle', fill: INK });
    boxes.push(g);
  }
  const xSign = mkMath(gAdd, 452 + 3 * PITCH + 26, ROW1 + 46, '*', { size: 44, fill: INK, anchor: 'middle' });
  const l23 = mkMath(gAdd, 452 + PITCH * 1.5 - 5, ROW1 + 112, '2^3', { size: 40, fill: '#B57B12', anchor: 'middle' });
  const l24 = mkMath(gAdd, 452 + 3 * PITCH + 70 + PITCH * 2 - 5, ROW1 + 112, '2^4', { size: 40, fill: PINK, anchor: 'middle' });
  const brace7 = mkBrace(gAdd, r2x(0), ROW2 + BOX + 14, r2x(6) + BOX, ROW2 + BOX + 14, { text: 'seven 2s: {{2^7}}', col: INK, size: 30, flip: true });
  const wAdd = mkMath(gAdd, BXc - 40, 530, '2^3 * 2^4 = 2^(3 + 4) = 2^7', { size: 46, fill: INK, anchor: 'middle' });
  // unfold: the stacked fraction
  const gDiv = G(shotB);
  head(gDiv, 'DIVIDE: SUBTRACT THE INDICES');
  const FX = 650, NUMY = 262, DENY = 346, DSP = 62;
  const numX = i => FX - 3 * DSP + i * DSP, denX = i => FX - DSP + i * DSP;
  for (let i = 0; i < 7; i++) { T(gDiv, numX(i), NUMY, '2', { size: 46, weight: 700, anchor: 'middle', fill: INK }); if (i < 6) mkMath(gDiv, numX(i) + DSP / 2, NUMY, '*', { size: 34, fill: MUTE, anchor: 'middle' }); }
  for (let i = 0; i < 3; i++) { T(gDiv, denX(i), DENY, '2', { size: 46, weight: 700, anchor: 'middle', fill: INK }); if (i < 2) mkMath(gDiv, denX(i) + DSP / 2, DENY, '*', { size: 34, fill: MUTE, anchor: 'middle' }); }
  E('line', { x1: numX(0) - 30, y1: 290, x2: numX(6) + 30, y2: 290, stroke: INK, 'stroke-width': 4, 'stroke-linecap': 'round' }, gDiv);
  const cancels = [];
  [[numX(0), NUMY], [numX(1), NUMY], [numX(2), NUMY], [denX(0), DENY], [denX(1), DENY], [denX(2), DENY]].forEach(([x, y]) => {
    const l = E('line', { x1: x - 18, y1: y + 6, x2: x + 18, y2: y - 38, stroke: RED, 'stroke-width': 5, 'stroke-linecap': 'round' }, gDiv); mkDash(l); cancels.push(l);
  });
  const dRes = mkMath(gDiv, numX(6) + 56, 306, '= 2^4', { size: 52, fill: GREEN });
  const wDiv = mkMath(gDiv, BXc - 40, 470, '2^7 ÷ 2^3 = 2^(7 - 3) = 2^4', { size: 46, fill: INK, anchor: 'middle' });
  // power of a power
  const gPow = G(shotB);
  head(gPow, 'POWER OF A POWER: MULTIPLY');
  const wPow = mkWorking(gPow, 560, 230, ['(2^3)^4 = 2^3 * 2^3 * 2^3 * 2^3', '= 2^(3 + 3 + 3 + 3)', '= 2^12'], { size: 44, fill: INK, gap: 30 });
  const pNote = mkText(gPow, 760, 520, 'indices: {{3 * 4 = 12}}', { size: 34, anchor: 'middle', fill: PINK });
  // zero index
  const gZero = G(shotB);
  head(gZero, 'NO FOLDS: THE ZERO INDEX');
  const z1 = mkMath(gZero, 420, 252, '2^3 ÷ 2^3 = 8 ÷ 8 = 1', { size: 42, fill: INK });
  const z2 = mkMath(gZero, 420, 340, '2^3 ÷ 2^3 = 2^(3 - 3) = 2^0', { size: 42, fill: INK });
  const z3 = G(gZero);
  E('rect', { x: 420, y: 392, width: 270, height: 96, rx: 14, fill: 'rgba(30,158,90,0.12)', stroke: GREEN, 'stroke-width': 4 }, z3);
  mkMath(z3, 555, 458, '2^0 = 1', { size: 56, fill: GREEN, anchor: 'middle' });
  const sheet = G(gZero);
  E('rect', { x: 760, y: 420, width: 150, height: 8, rx: 3, fill: '#FFFDF6', stroke: '#8C7E5C', 'stroke-width': 3 }, sheet);
  T(sheet, 835, 470, 'one sheet', { size: 30, weight: 700, anchor: 'middle', fill: MUTE });
  // MAD SPM
  const gMad = G(shotB);
  T(gMad, BXc, 184, 'MAD SPM!', { size: 60, weight: 800, anchor: 'middle', fill: PINK, ls: 4 });
  const madRows = [['**M**ultiply → **A**dd', '2^3 * 2^4 = 2^7'], ['**D**ivide → **S**ubtract', '2^7 ÷ 2^3 = 2^4'], ['**P**ower → **M**ultiply', '(2^3)^4 = 2^12']].map(([a, m], i) => {
    const g = G(gMad), y = 280 + i * 96;
    mkText(g, 410, y, a, { size: 40, fill: INK, boldFill: PINK });
    mkMath(g, 790, y, m, { size: 40, fill: INK });
    return g;
  });
  // letters
  const gLet = G(shotB);
  head(gLet, 'LETTERS AS WELL');
  const let1 = mkMath(gLet, BXc - 40, 270, '3x^2 * 4x^5 = 12x^7', { size: 60, fill: INK, anchor: 'middle' });
  const let2 = mkText(gLet, BXc - 40, 380, 'multiply the numbers: {{3 * 4 = 12}}', { size: 36, anchor: 'middle', fill: BLUE });
  const let3 = mkText(gLet, BXc - 40, 450, 'add the indices: {{2 + 5 = 7}}', { size: 36, anchor: 'middle', fill: PINK });
  // same base only
  const gSame = G(shotB);
  head(gSame, 'SAME BASE ONLY');
  const wSame = mkWorking(gSame, 640, 230, ['2^3 * 5^2 = 8 * 25', '= 200'], { size: 50, fill: INK, gap: 34 });
  const sNote = mkText(gSame, BXc - 40, 470, 'different bases: just **work it out**', { size: 34, anchor: 'middle', fill: INK, boldFill: PINK });
  // the Moon
  const gMoon = G(shotB);
  head(gMoon, '42 FOLDS', BLUE);
  E('circle', { cx: 450, cy: 330, r: 54, fill: ball('#4CC9F0', '#1D6FA6'), stroke: INK, 'stroke-width': 3 }, gMoon);
  E('path', { d: 'M418,302 q18,-12 30,4 q10,14 -6,22 q-18,6 -24,-26 Z M462,340 q16,-6 22,10 q-6,18 -24,10 Z', fill: '#56D69B' }, gMoon);
  T(gMoon, 450, 418, 'Earth', { size: 28, weight: 700, anchor: 'middle', fill: MUTE });
  E('circle', { cx: 1010, cy: 330, r: 26, fill: ball('#E6EBEF', '#8F9CAB'), stroke: INK, 'stroke-width': 3 }, gMoon);
  T(gMoon, 1010, 300 - 2, 'Moon', { size: 28, weight: 700, anchor: 'middle', fill: MUTE });
  const tower = E('rect', { x: 504, y: 322, width: 0, height: 16, rx: 3, fill: '#FFFDF6', stroke: '#8C7E5C', 'stroke-width': 3 }, gMoon);
  const tLab = T(gMoon, 760, 304, 'paper tower', { size: 28, weight: 700, anchor: 'middle', fill: '#8C6A3A' });
  const mDist = mkText(gMoon, 1010, 400, 'about **384 000 km**', { size: 28, anchor: 'middle', fill: MUTE, boldFill: INK });
  const mW = mkText(gMoon, BXc - 40, 490, '{{0.1 * 2^42}} mm ≈ **440 000 km**', { size: 42, anchor: 'middle', fill: INK, boldFill: GREEN });
  const mPast = mkText(gMoon, BXc - 40, 552, 'past the **Moon**!', { size: 32, anchor: 'middle', fill: BLUE });
  const BGROUPS = [gAdd, gDiv, gPow, gZero, gMad, gLet, gSame, gMoon];

  /* ================= the cast ================= */
  const boy = cast(Lcast, 'boy', { s: 0.8 });
  const kav = cast(Lcast, 'kavya', { s: 0.8 });
  const dad = cast(Lcast, 'dad', { s: 0.8 });
  const mum = cast(Lcast, 'mum', { s: 0.8 });
  const basil = cast(Ltop, 'basil', { s: 0.45 });
  const tiny = cast(Ltop, 'tiny', { s: 0.42 });
  const lt = { tiny: ipLowerThird(Lhud, 'tiny'), basil: ipLowerThird(Lhud, 'basil') };
  const stOK = ipStamp(Lfg, true);
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  const SPX = { boy: XB, kavya: XK, dad: XD, mum: XM, basil: XBAS, tiny: XPAP };
  const lookTo = (x, t, d) => { const w = scWho(S, t); if (!w || SPX[w] === undefined || Math.abs(SPX[w] - x) < 5) return d; return clamp((SPX[w] - x) / 200, -1, 1); };
  const SPB = { mum: 880, kavya: 1075, tiny: 300, basil: 170 };
  const lookB = (x, t, d) => { const w = scWho(S, t); if (!w || SPB[w] === undefined || Math.abs(SPB[w] - x) < 5) return d; return clamp((SPB[w] - x) / 200, -1, 1); };

  /* cuts */
  const cB = at('add') - 0.06, cA2 = at('seventh') - 0.06;
  const FOLDS = [0.42, 0.55, 0.68].map(f => mid('fold', f));

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const sB = on(t, cB, cA2), sA = 1 - sB;
    op(Lset, sA); op(Lfront, sA); op(Lbd, sB);
    for (const k in lt) lt[k].set(0);
    [sFold, sTiny, sBas, sDad, sSev, tRing].forEach(g => op(g, 0));
    layerChips.forEach(c => c.set(0)); cHow.set(0); stBz.set(0); stOK.set(0); cTwo.set(0);
    words.forEach(w => op(w, 0));
    booth.upd(t);
    const who = scWho(S, t);

    /* ================= A ================= */
    if (sA) {
      const late = t >= cA2;
      // camera: push in on Basil for "The base. Does not. Change."
      const zC = t >= at('change') - 0.06 && t < cB;
      if (zC) cam(lerp(1.9, 2.05, P(t, at('change'), 2, linear)), 640, 430); else ZOOM.forEach(L => L.removeAttribute('transform'));
      op(boy, 1); op(dad, 1);
      tr(boy, XB, 440, 0.8); tr(kav, XK, YB, 0.8); tr(dad, XD, YB, 0.8); tr(mum, XM, YB, 0.8);

      // the paper stack
      let layers = 1;
      FOLDS.forEach(f => { if (t >= f + 0.25) layers *= 2; });
      if (late) layers = 8;
      paper.set(layers); op(paper, 1);
      op(flap, 0);
      FOLDS.forEach(f => {
        if (t >= f && t < f + 0.3) {
          const p = P(t, f, 0.3, ease);
          op(flap, 1);
          flap.setAttribute('transform', `translate(${XPAP} ${530 - paper.h}) rotate(${(-180 * p).toFixed(1)})`);
        }
      });
      if (t < cB && !late) {
        const k = t < FOLDS[0] + 0.25 ? 0 : t < FOLDS[1] + 0.25 ? 1 : t < FOLDS[2] + 0.25 ? 2 : 3;
        if (t >= mid('fold', 0.3) && t < at('tiny')) { layerChips[k].set(1); tr(layerChips[k], XPAP, 610); }
      }
      // Dad's wad (seventh)
      op(wad, late ? 1 : 0); if (late) tr(wad, 482 + Math.sin(t * 30) * 2 * AMP, 530, 0.6);

      // strips
      const SX = 560, SY = 252;
      if (t < at('tiny')) {
        if (t >= mid('fold', 0.4)) {
          op(sFold, 1); tr(sFold, SX, SY);
          const k = t < FOLDS[1] + 0.25 ? 0 : t < FOLDS[2] + 0.25 ? 1 : 2;
          fM.forEach((m, i) => op(m, i === k ? 1 : 0));
        }
      } else if (t < at('basil')) {
        op(sTiny, 1); tr(sTiny, SX, SY);
        op(tRing, P(t, mid('tiny', 0.4), 0.25, linear));
        popAt(cHow, t, mid('tiny', 0.55), 900, 340);
      } else if (t < at('dad')) {
        op(sBas, 1); tr(sBas, SX, SY);
      } else if (t < at('change') - 0.06) {
        op(sDad, 1); tr(sDad, SX, SY);
        if (t >= mid('dad', 0.78)) { stBz.set(P(t, mid('dad', 0.78), 0.3, linear)); tr(stBz, SX + 330, SY + 34, 0.45); }
      }
      if (late) { op(sSev, P(t, mid('seventh', 0.15), 0.3, linear)); tr(sSev, SX, SY); }
      popAt(cTwo, t, mid('fold', 0.03), 1060, 250, mid('fold', 0.4));
      if (zC) {
        [0.12, 0.42, 0.72].forEach((f, i) => { if (t >= mid('change', f)) { const p = P(t, mid('change', f), 0.25, pop); op(words[i], 1); tr(words[i], WX[i], 166, Math.max(0.01, p)); } });
      }

      /* humans */
      let mm = 'neutral', ml = -0.6, dm = 'happy', km = 'neutral', bm = 'happy', dlift = 0, dsweat = 0;
      if (t < at('tiny')) { mm = 'happy'; ml = -0.9; }
      else if (t < at('dad')) { mm = 'happy'; dm = 'smug'; }
      else if (t < cB) {
        dm = t < mid('dad', 0.78) ? 'smug' : 'shock'; dlift = t >= mid('dad', 0.1) && t < mid('dad', 0.9) ? 1 : 0;
        mm = t >= mid('dad', 0.5) ? 'deadpan' : 'neutral'; km = t >= mid('dad', 0.5) ? 'deadpan' : 'neutral'; bm = t >= mid('dad', 0.78) ? 'shock' : 'happy';
      }
      if (late) { dm = 'annoyed'; dsweat = 1; mm = 'deadpan'; km = 'deadpan'; ml = -1; }
      mum.set({ t, talk: scTalk(S, t, 'mum'), mood: mm, look: who && who !== 'mum' ? lookTo(XM, t, ml) : ml });
      dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: late ? 0.6 : lookTo(XD, t, 0.6), lift: dlift, sweat: dsweat });
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: lookTo(XK, t, 0.7) });
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: bm, look: lookTo(XB, t, 0.8) });

      /* Basil and Tiny on the table */
      const bIn = at('basil') - 0.25;
      if (t >= bIn) {
        const p = late ? 1 : P(t, bIn, 0.35, pop);
        op(basil, 1); tr(basil, XBAS, 530 - 130 * 0.45, Math.max(0.01, 0.45 * p));
        basil.set({ t, talk: scTalk(S, t, 'basil'), mood: t >= at('change') && t < cB ? 'annoyed' : 'deadpan', look: lookTo(XBAS, t, 0), base: '2', still: true });
        lt.basil.set(late ? 0 : win(t, at('basil') + 0.05, at('basil') + 3.1, 0.3));
      } else op(basil, 0);
      if (t >= at('tiny') - 0.3) {
        op(tiny, 1);
        const p = late ? 1 : P(t, at('tiny') - 0.3, 0.6, linear);
        const top = 530 - paper.h - 86 * 0.42;
        const [x, y] = p < 1 ? [lerp(1000, XPAP, p), lerp(300, top, p) - 160 * Math.sin(p * Math.PI)] : [XPAP, top - Math.abs(Math.sin(t * 5)) * 14 * AMP];
        tr(tiny, x, y, 0.42);
        tiny.set({ t, talk: scTalk(S, t, 'tiny'), mood: t >= at('change') && t < cB ? 'shock' : 'happy', look: lookTo(XPAP, t, -0.5), idx: '3', arms: who === 'tiny' ? 1 : 0.5 });
        lt.tiny.set(late ? 0 : win(t, at('tiny') + 0.05, at('tiny') + 3.1, 0.3));
      } else op(tiny, 0);
    }

    /* ================= B: the whiteboard ================= */
    if (sB) {
      ZOOM.forEach(L => L.removeAttribute('transform'));
      op(boy, 0); op(dad, 0); op(paper, 0); op(flap, 0); op(wad, 0);
      const gi = t < at('unfold') ? 0 : t < at('power') ? 1 : t < at('zero') ? 2 : t < at('mad') ? 3 : t < at('letters') ? 4 : t < at('same') ? 5 : t < at('moon') ? 6 : 7;
      BGROUPS.forEach((g, i) => op(g, i === gi ? 1 : 0));
      // Basil and Tiny: a living power, base and index
      op(basil, 1); op(tiny, 1);
      tr(basil, 170, 610 - 130 * 0.75, 0.75);
      tr(tiny, 306, 318 - Math.abs(Math.sin(t * 4)) * 10 * AMP, 0.62);
      let base = '2', idx = '3';
      if (gi === 0) idx = t < mid('add', 0.6) ? '3' : '7';
      if (gi === 1) idx = t < mid('unfold', 0.8) ? '7' : '4';
      if (gi === 2) idx = t < mid('power', 0.75) ? '3' : '12';
      if (gi === 3) idx = t < mid('zero', 0.55) ? '3' : '0';
      if (gi === 5) { base = 'x'; idx = t < mid('letters', 0.4) ? '2' : '7'; }
      if (gi === 6) { base = t < mid('same', 0.4) ? '2' : '5'; idx = t < mid('same', 0.4) ? '3' : '2'; }
      if (gi === 7) { base = '2'; idx = '42'; }
      basil.set({ t, talk: scTalk(S, t, 'basil'), mood: 'deadpan', look: lookB(170, t, 0.6), base, still: true });
      tiny.set({ t, talk: scTalk(S, t, 'tiny'), mood: 'happy', look: lookB(300, t, 0.6), idx, arms: who === 'tiny' ? 1 : 0.4 });
      tr(mum, 880, 672, 0.72); tr(kav, 1075, 672, 0.72);
      mum.set({ t, talk: scTalk(S, t, 'mum'), mood: who === 'mum' ? 'happy' : 'neutral', look: who === 'kavya' ? 0.8 : -0.7 });
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: who === 'kavya' ? 'happy' : 'neutral', look: who === 'mum' ? -0.8 : -0.7 });

      if (gi === 0) {
        const s = P(t, mid('add', 0.3), 0.8, ease);
        boxes.forEach((b, i) => tr(b, lerp(r1x(i), r2x(i), s), lerp(ROW1, ROW2, s)));
        op(xSign, 1 - s); op(l23, 1 - s); op(l24, 1 - s);
        brace7.set(P(t, mid('add', 0.45), 0.4, linear));
        fadeIn(wAdd, t, mid('add', 0.55)); fadeIn(hAdd, t, mid('add', 0.75));
        if (t >= mid('add', 0.82)) { stOK.set(P(t, mid('add', 0.82), 0.3, linear)); tr(stOK, 1030, 440, 0.48); }
      }
      if (gi === 1) {
        cancels.forEach((c, i) => mkDraw(c, P(t, mid('unfold', 0.35 + (i % 3) * 0.06), 0.25, linear)));
        fadeIn(dRes, t, mid('unfold', 0.52)); fadeIn(wDiv, t, mid('unfold', 0.6));
      }
      if (gi === 2) { wPow.show(0, P(t, at('power'), 0.3, linear)); wPow.show(1, P(t, mid('power', 0.5), 0.3, linear)); wPow.show(2, P(t, mid('power', 0.65), 0.3, linear)); fadeIn(pNote, t, mid('power', 0.6)); }
      if (gi === 3) { fadeIn(z1, t, mid('zero', 0.1)); fadeIn(z2, t, mid('zero', 0.32)); fadeIn(z3, t, mid('zero', 0.55)); fadeIn(sheet, t, mid('zero', 0.66)); }
      if (gi === 4) madRows.forEach((r, i) => fadeIn(r, t, mid('mad', 0.18 + i * 0.18)));
      if (gi === 5) { fadeIn(let1, t, mid('letters', 0.12)); fadeIn(let2, t, mid('letters', 0.5)); fadeIn(let3, t, mid('letters', 0.62)); }
      if (gi === 6) { wSame.show(0, P(t, mid('same', 0.3), 0.3, linear)); wSame.show(1, P(t, mid('same', 0.62), 0.3, linear)); fadeIn(sNote, t, mid('same', 0.66)); }
      if (gi === 7) {
        const g = P(t, mid('moon', 0.15), 0.6 * (end('moon') - at('moon')), easeOut);
        attr(tower, 'width', Math.max(0.1, 600 * g)); fadeIn(tLab, t, mid('moon', 0.3));
        fadeIn(mDist, t, mid('moon', 0.25)); fadeIn(mW, t, mid('moon', 0.45)); fadeIn(mPast, t, mid('moon', 0.72));
      }
    }
  };
});
