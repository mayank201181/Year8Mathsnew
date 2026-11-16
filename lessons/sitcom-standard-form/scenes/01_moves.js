/* Scene 1: Ah Boy's piggy bank (× and ÷ by 10, 100, 0.1 and 0.01).
   Shots (hard sitcom cuts):
   A  the lift, ten minutes in (STUCK: 10 min). Mr Tan writes 3.5 × 10 = ? on the steel wall -> Ah Boy: "add a zero",
      3.50 in orange -> Nought pops up on the rail (lower third) -> Dot on the rail (lower third): 3.50 = 3.5, the 0
      crossed out -> Nought sad. Then the place-value grid on the wall (the showpiece): 3.5 slides one column left
      to 35 while the red point stays still -> each column is 10 × the one on its right (× 10 hops) -> 3.47 × 10 =
      34.7 and 3.47 ÷ 100 = 0.0347 (cream place-holder zeros), side card of all four -> Priya: 6.2 × 100 leaves a
      gap -> a cream place-holder 0 drops in: 620 -> Nought gets his PLACE-HOLDER badge, DING!
   C  close shot: Ah Boy and his piggy bank, 40 ten-cent coins (4 rows of 10): 40 × 0.1 = ? "multiplying makes it
      bigger!" -> Dot: 0.1 = 1/10, the coins regroup into 10 groups of 4: 1/10 of 40 = 4, × 0.1 is ÷ 10 -> $4.
   D  the lift: Mum (lower third): $40 = ? ten-cent coins, 40 ÷ 0.1 -> Kavya: $1 = 10 coins, 40 ÷ 0.1 = 400,
      ÷ 0.1 is × 10 -> Dot: the swap table for 0.1 and 0.01.
   C  close shot again: Ah Boy, a tiny piggy bank and a tower of 400 coins. */
scene('moves', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 2, color: o.color || C.ink, weight: 700 }); };
  const popSet = (el, t, t0, t1, x, y) => { const p = t >= t0 && t < t1 ? P(t, t0, 0.35, linear) * (1 - P(t, t1 - 0.2, 0.2, linear)) : 0; el.set(p); if (x !== undefined) tr(el, x, y); };
  const fadeWin = (el, t, t0, t1) => op(el, t >= t0 && t < t1 ? Math.min(P(t, t0, 0.2, linear), 1 - P(t, t1 - 0.15, 0.15, linear)) : 0);
  const write = (el, t, t0, t1, x, y) => {   // marker writing: fade in, slide from the left
    const p = t >= t0 && t < t1 ? P(t, t0, 0.35, easeOut) : 0;
    op(el, t >= t0 && t < t1 ? Math.min(clamp(p * 2), 1 - P(t, t1 - 0.15, 0.15, linear)) : 0);
    tr(el, (x || 0) - 18 * (1 - p), y || 0);
  };
  const GOLD = '#FFE45C', ORANGE = '#E8641E', INK = SF.marker, RED = SF.red, GREEN = SF.green;

  /* layers */
  const Lbg = G(root), Lboard = G(root), Lcast = G(root), Lfront = G(root), Lrail = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= the lift ================= */
  const liftShot = G(Lbg);
  const lift = sfLift(liftShot);
  const frontWrap = G(Lfront);
  frontWrap.appendChild(lift.front); frontWrap.appendChild(lift.top);
  const cStuck0 = pill(Lfg, 'STUCK: 0 min', { size: 26, color: '#FF8A8A', stroke: '#FF8A8A' });
  const cStuck = pill(Lfg, 'STUCK: 10 min', { size: 26, color: '#FF8A8A', stroke: '#FF8A8A' });
  const cTen = mkChip(Lfg, '**Ten minutes** in', { size: 34, col: GOLD });

  /* --- A: 3.5 × 10 = ? --- */
  const bA = G(Lboard);
  const qL = mkMath(bA, 640, 0, '3.5 * 10 =', { size: 64, fill: INK, anchor: 'end' });
  const qQ = mkMath(bA, 664, 0, '?', { size: 64, fill: INK });
  const qBoy = mkMath(bA, 664, 0, '3.50', { size: 64, fill: ORANGE });
  const w35 = mkMeasure('3.5', { size: 64 }).w, w350 = mkMeasure('3.50', { size: 64 }).w;
  const spark = G(bA);
  E('path', { d: 'M0,-26 L6,-6 L26,0 L6,6 L0,26 L-6,6 L-26,0 L-6,-6 Z', fill: GOLD, stroke: '#B8862E', 'stroke-width': 2.5 }, spark);
  const xBoy = cross(bA, 26, RED);
  const eqSame = mkMath(bA, 600, 300, '3.50 = 3.5', { size: 54, fill: INK, anchor: 'middle' });
  const wSame = mkMeasure('3.50 = 3.5', { size: 54 }).w, w35s = mkMeasure('3.5', { size: 54 }).w, w350s = mkMeasure('3.50', { size: 54 }).w;
  const strikeZ = E('line', { x1: 0, y1: 0, x2: 0, y2: 0, stroke: RED, 'stroke-width': 7, 'stroke-linecap': 'round' }, bA);
  const cNothing = mkChip(Lfg, 'a zero on the end changes **nothing**', { size: 28, col: '#CFE3FF' });

  /* --- B: the place-value grid (showpiece) --- */
  const bB = G(Lboard);
  const GX = 420, GY = 112;
  const grid = sfPVGrid(bB, { from: 2, to: -4, cell: 88, rows: 1, size: 32 });
  tr(grid, GX, GY);
  const r35 = grid.num('3.5', 0), r347 = grid.num('3.47', 0), r0347 = grid.num('0.0347', 0), r62 = grid.num('6.2', 0), r620 = grid.num('620', 0);
  const ROWS = [r35, r347, r0347, r62, r620];
  // header highlights and × 10 hops under the grid (for "every column is worth 10 times...")
  const hdr = {}, hops = [];
  for (let pw = 2; pw >= -4; pw--) hdr[pw] = E('rect', { x: grid.x(pw) - 42, y: 2, width: 84, height: 46, rx: 8, fill: 'none', stroke: '#FF8A3D', 'stroke-width': 6, opacity: 0 }, grid);
  for (let pw = -4; pw < 2; pw++) {
    const hg = G(grid);
    const a = arrow(hg, grid.x(pw) - 6, 186, grid.x(pw + 1) + 6, 186, { color: '#D9480F', width: 4, bend: 12 });
    T(hg, (grid.x(pw) + grid.x(pw + 1)) / 2, 220, '×10', { size: 26, weight: 800, anchor: 'middle', fill: '#D9480F' });
    hops.push({ hg, a, pw });
  }
  // the gap in 6.2 × 100 and its "?"
  const gapT = G(grid);
  E('rect', { x: grid.x(0) - 38, y: grid.rowY(0) - 42, width: 76, height: 84, rx: 10, fill: 'rgba(255,255,255,0.5)', stroke: RED, 'stroke-width': 4, 'stroke-dasharray': '10 7' }, gapT);
  T(gapT, grid.x(0), grid.rowY(0) + 18, '?', { size: 54, weight: 800, anchor: 'middle', fill: RED });
  // equations under the grid
  const SX = GX + grid.W / 2, SY = 330;
  const eq = {
    move: mkMath(bB, SX, SY, '3.5 * 10 = 35', { size: 40, fill: INK, anchor: 'middle' }),
    s1: mkMath(bB, SX, SY, '3.47 * 10 = 34.7', { size: 40, fill: INK, anchor: 'middle' }),
    s2: mkMath(bB, SX, SY, '3.47 ÷ 100 = 0.0347', { size: 40, fill: INK, anchor: 'middle' }),
    g1: mkMath(bB, SX, SY, '6.2 * 100 = ?', { size: 40, fill: INK, anchor: 'middle' }),
    g2: mkMath(bB, SX, SY, '6.2 * 100 = 620', { size: 40, fill: INK, anchor: 'middle' }),
  };
  // the left zone of the wall
  const cPoint = mkChip(bB, 'the **point** stays still', { size: 28, col: RED, fill: 'rgba(255,253,246,0.95)', stroke: RED });
  const cLeft1 = mkChip(bB, '{{× 10}}: digits move\n**one place left**', { size: 28, col: INK, fill: 'rgba(255,253,246,0.95)' });
  const cCol = mkChip(bB, 'each column is\n**10 ×** the one\non its right', { size: 30, col: '#B8480F', fill: 'rgba(255,253,246,0.95)' });
  const cLeft2 = mkChip(bB, '{{× 100}}: digits move\n**two places left**', { size: 28, col: INK, fill: 'rgba(255,253,246,0.95)' });
  const cHold = mkChip(bB, 'a **place-holder** zero', { size: 28, col: SF.holderInk, fill: SF.holder, stroke: SF.holderInk });
  const nDiv = mkMath(bB, 215, 262, '6.2 ÷ 100 = 0.062', { size: 32, fill: INK, anchor: 'middle' });
  // the side card: all four
  const card4 = G(bB);
  E('rect', { x: 30, y: 108, width: 372, height: 226, rx: 14, fill: 'rgba(255,253,246,0.95)', stroke: '#8FA3B8', 'stroke-width': 3 }, card4);
  const w4 = mkWorking(card4, 220, 130, ['3.47 * 10 = 34.7', '3.47 * 100 = 347', '3.47 ÷ 10 = 0.347', '3.47 ÷ 100 = 0.0347'], { size: 30, fill: INK, gap: 18 });
  const stDing = sfStamp(Lfg, 'ding');

  /* --- D: Mum's question, Kavya's answer, Dot's table --- */
  const bD = G(Lboard);
  const m1 = mkText(bD, 600, 172, '$40 = **?** ten-cent coins', { size: 46, fill: INK, anchor: 'middle' });
  const m2a = mkMath(bD, 640, 252, '40 ÷ 0.1 =', { size: 56, fill: INK, anchor: 'end' });
  const m2q = mkMath(bD, 664, 252, '?', { size: 56, fill: INK });
  const m2ans = mkMath(bD, 664, 252, '400', { size: 56, fill: GREEN });
  const m3 = mkText(bD, 600, 318, 'how many **tenths** fit into 40?', { size: 32, fill: INK, anchor: 'middle' });
  const m4 = mkText(bD, 600, 318, '$1 = **10** coins, so $40 = **400** coins', { size: 32, fill: INK, anchor: 'middle' });
  const cDiv = mkChip(bD, '{{÷ 0.1}} is the same as {{× 10}}', { size: 34, col: '#1E7A4A', fill: 'rgba(255,253,246,0.96)' });
  const tbl = mkTable(bD, [
    ['', 'same as', 'digits move'],
    ['{{× 0.1}}', '{{÷ 10}}', '1 place right'],
    ['{{× 0.01}}', '{{÷ 100}}', '2 places right'],
    ['{{÷ 0.1}}', '{{× 10}}', '1 place left'],
    ['{{÷ 0.01}}', '{{× 100}}', '2 places left'],
  ], { size: 28, rowH: 45, ink: MK.ink, fill: 'rgba(255,253,246,0.96)', headFill: 'rgba(76,201,240,0.35)', colW: [150, 150, 240] });
  tr(tbl, 600 - tbl.W / 2, 108);

  /* ================= C: close shot, Ah Boy and the piggy bank ================= */
  const closeShot = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#D3DAE0', '#A7B2BC', true) }, closeShot);
  let br = '';
  for (let i = 0; i < 22; i++) br += `M${20 + i * 56},0 L${20 + i * 56},750 `;
  E('path', { d: br, stroke: '#FFFFFF', 'stroke-width': 3, opacity: 0.18 }, closeShot);
  E('path', { d: 'M590,0 L590,750', stroke: '#8C98A4', 'stroke-width': 6 }, closeShot);
  const closeFront = G(Lfront);
  E('rect', { x: 0, y: 662, width: 1200, height: 88, fill: linGrad('#9AA6B2', '#6E7A86', true) }, closeFront);
  E('rect', { x: 0, y: 642, width: 1200, height: 28, rx: 12, fill: linGrad('#F2F5F7', '#9AA6B2', true), stroke: '#5A6670', 'stroke-width': 3 }, closeFront);
  const piggy = sfPiggy(closeFront, 1.15); tr(piggy, 535, 648);
  // 40 ten-cent coins
  const coinL = G(closeFront), coins = [];
  for (let i = 0; i < 40; i++) {
    const c = G(coinL);
    E('circle', { r: 21, fill: ball('#EEF2F5', '#8A97A3'), stroke: MK.ink, 'stroke-width': 2.5 }, c);
    coins.push(c);
  }
  const grpBox = G(coinL);
  E('rect', { x: -28, y: -98, width: 56, height: 196, rx: 14, fill: 'rgba(255,228,92,0.35)', stroke: '#E0A800', 'stroke-width': 5 }, grpBox);
  const grpLab = T(coinL, 0, 0, '4', { size: 40, weight: 800, anchor: 'middle', fill: '#B8860B' });
  const rowLabs = [0, 1, 2, 3].map(i => T(coinL, 0, 0, '10', { size: 28, weight: 800, anchor: 'start', fill: '#3A4650' }));
  const tenLabs = []; for (let j = 0; j < 10; j++) tenLabs.push(T(coinL, 0, 0, String(j + 1), { size: 26, weight: 700, anchor: 'middle', fill: '#3A4650' }));
  const cTenC = mkChip(Lfg, '{{10c = $0.10}}', { size: 34, col: '#3A4650', fill: 'rgba(255,253,246,0.96)' });
  const cCoin40 = mkChip(Lfg, '**40** ten-cent coins', { size: 30, col: '#3A4650', fill: 'rgba(255,253,246,0.96)' });
  const c1 = mkMath(Lfg, 1040, 250, '40 * 0.1 =', { size: 56, fill: INK, anchor: 'end' });
  const c1q = mkMath(Lfg, 1064, 250, '?', { size: 56, fill: INK });
  const c1a = mkMath(Lfg, 1064, 250, '4', { size: 56, fill: GREEN });
  const cTen1 = mkMath(Lfg, 960, 168, '0.1 = 1/10', { size: 52, fill: INK, anchor: 'middle' });
  const cOf = mkMath(Lfg, 960, 352, '1/10 "of" 40 = 4', { size: 46, fill: '#8A6508', anchor: 'middle' });
  const cDollar = mkChip(Lfg, '**$4**', { size: 40, col: GREEN, fill: 'rgba(255,253,246,0.96)' });
  const cMulDiv = mkChip(Lfg, '{{× 0.1}} is the same as {{÷ 10}}', { size: 32, col: '#1E7A4A', fill: 'rgba(255,253,246,0.96)' });
  const thought = mkThoughtBubble(Lfg, 'multiplying makes\nit **bigger**!', { size: 30, tail: 'left' });
  const rich = T(Lfg, 0, 0, '$$$', { size: 54, weight: 800, anchor: 'middle', fill: '#E0A800' });
  rich.setAttribute('stroke', '#6B4A00'); rich.setAttribute('stroke-width', 3); rich.setAttribute('paint-order', 'stroke');
  const burst = G(Lfg);
  E('path', { d: 'M0,-40 L10,-12 L40,-14 L16,6 L28,36 L0,18 L-28,36 L-16,6 L-40,-14 L-10,-12 Z', fill: '#FFFFFF', stroke: '#E0A800', 'stroke-width': 4 }, burst);
  T(burst, 0, 70, 'pop', { size: 30, weight: 800, anchor: 'middle', fill: '#8A6508' });
  // pig: a tower of 400 coins and a tiny piggy bank
  const tower = G(closeFront);
  let td = '';
  for (let k = 0; k < 58; k++) { const y = 650 - k * 11.6; td += `M-56,${y.toFixed(1)} a56,13 0 1 0 112,0 `; }
  E('rect', { x: -56, y: -40, width: 112, height: 690, fill: linGrad('#DDE3E8', '#8A97A3', false), stroke: '#5A6670', 'stroke-width': 2.5 }, tower);
  E('path', { d: td, fill: 'none', stroke: '#6E7A86', 'stroke-width': 2.5 }, tower);
  E('ellipse', { cx: 0, cy: 650, rx: 56, ry: 13, fill: '#DDE3E8', stroke: '#5A6670', 'stroke-width': 2.5 }, tower);
  tr(tower, 680, 0);
  const c400 = mkChip(Lfg, '**400** coins', { size: 40, col: GOLD });

  /* ================= the cast ================= */
  const LS = 0.84, LY = 520;
  const XS = { kavya: 185, mum: 335, dad: 485, boy: 630, priya: 775, tan: 920 };
  const NX = 74, NY = 536, NS = 0.6;           // Nought on the handrail, left
  const DX = 847, DY = 560, DS = 0.62;          // Dot on the handrail, right
  const X = Object.assign({ nought: NX, dot: DX }, XS);
  const kav = cast(Lcast, 'kavya', { s: LS });
  const mum = cast(Lcast, 'mum', { s: LS });
  sfRice(mum.hand, 0.62);
  const dad = cast(Lcast, 'dad', { s: LS });
  const boy = cast(Lcast, 'boy', { s: LS });
  const pigHand = sfPiggy(boy.hand, 0.62); tr(pigHand, 10, 20);
  const priya = cast(Lcast, 'priya', { s: LS });
  const tan = cast(Lcast, 'tan', { s: LS });
  const H = { kavya: kav, mum, dad, boy, priya, tan };
  const nought = cast(Lrail, 'nought', { s: NS });
  const dot = cast(Lrail, 'dot', { s: DS });
  const lt = { nought: sfLowerThird(Lhud, 'nought'), dot: sfLowerThird(Lhud, 'dot'), priya: sfLowerThird(Lhud, 'priya'), mum: sfLowerThird(Lhud, 'mum') };
  const ltOn = (t, who, t0) => lt[who].set(win(t, t0, t0 + 3.1, 0.3));
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cut points */
  const cC = at('coins') - 0.06, cD = at('how') - 0.06, cE = at('pig') - 0.06;
  const tB = at('move') - 0.06;                         // the wall is wiped; the grid goes up
  const tSlide2 = mid('slide', 0.5);                    // second half of "slide": 3.47 ÷ 100

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const sLift = on(t, -1, cC) || on(t, cD, cE), sClose = 1 - sLift;
    for (const k in lt) lt[k].set(0);
    const spk = scWho(S, t);
    const lookAt = k => (spk && X[spk] !== undefined && spk !== k ? clamp((X[spk] - X[k]) / 300, -1, 1) : 0);

    /* ---------- the lift ---------- */
    op(liftShot, sLift); op(frontWrap, sLift); op(Lboard, sLift); op(Lrail, sLift);
    op(cStuck0, 0); op(cStuck, 0); cTen.set(0); cNothing.set(0);
    op(bA, 0); op(bB, 0); op(bD, 0); stDing.set(0);
    if (sLift) {
      lift.upd(t); lift.dim(1); lift.press(12, 1); lift.disp.set('10');
      // STUCK: 0 min -> 10 min (top right, on the ceiling)
      const tick10 = mid('ten', 0.45);
      op(cStuck0, t < tick10 ? 1 : 0); op(cStuck, t >= tick10 ? 1 : 0);
      tr(cStuck0, 1075, 42); tr(cStuck, 1075, 42, t >= tick10 ? 1 + 0.25 * (1 - P(t, tick10, 0.4, easeOut)) : 1);
      popSet(cTen, t, at('ten') + 0.1, at('steel') + 0.2, 600, 230);

      /* A: 3.5 × 10 = ? */
      if (t < tB) {
        op(bA, 1);
        write(qL, t, mid('steel', 0.45), tB, 0, 214);
        write(qQ, t, mid('steel', 0.65), mid('zero', 0.55), 0, 214);
        write(qBoy, t, mid('zero', 0.55), tB, 0, 214);
        // the sparkle on the boy's 0, when Nought arrives
        const sp = t > mid('nought', 0.2) && t < at('dot') ? 1 : 0;
        op(spark, sp); tr(spark, 664 + w35 + (w350 - w35) / 2, 160, 0.6 + 0.4 * wave(t, 0.5), (t * 90 * AMP) % 360);
        op(xBoy, t > mid('dot', 0.62) ? 1 : 0); tr(xBoy, 664 + w350 / 2, 192, 0.8 + 0.2 * P(t, mid('dot', 0.62), 0.25, pop));
        write(eqSame, t, mid('dot', 0.55), tB, 0, 0);
        // strike the 0 of 3.50
        const zx0 = 600 - wSame / 2 + w35s, zx1 = 600 - wSame / 2 + w350s, ps = P(t, mid('dot', 0.72), 0.3, easeOut);
        attr(strikeZ, 'x1', zx0 - 4); attr(strikeZ, 'y1', 300 - 4); attr(strikeZ, 'x2', lerp(zx0 - 4, zx1 + 4, ps)); attr(strikeZ, 'y2', lerp(300 - 4, 300 - 40, ps));
        op(strikeZ, t > mid('dot', 0.72) ? 1 : 0);
        popSet(cNothing, t, mid('dot', 0.82), tB, 600, 128);
      }
      /* B: the grid */
      if (t >= tB && t < cC) {
        op(bB, P(t, tB, 0.2, linear));
        ROWS.forEach(r => r.set(0)); op(gapT, 0);
        for (const k in eq) op(eq[k], 0);
        for (const k in hdr) op(hdr[k], 0);
        hops.forEach(h => op(h.hg, 0));
        [cPoint, cLeft1, cCol, cLeft2, cHold].forEach(c => c.set(0)); op(nDiv, 0); op(card4, 0);
        if (t < at('slide')) {
          // 3.5 -> 35
          r35.set(P(t, at('move'), 0.3, linear));
          r35.shift(P(t, mid('move', 0.42), 0.6, ease));
          fadeWin(eq.move, t, mid('move', 0.72), at('column') + (end('column') - at('column')) * 0.15);
          popSet(cPoint, t, mid('move', 0.08), at('column'), 215, 150);
          popSet(cLeft1, t, mid('move', 0.4), at('column'), 215, 250);
          // every column is worth 10 times the one on its right
          if (t >= at('column')) {
            for (let pw = -4; pw <= 2; pw++) op(hdr[pw], win(t, mid('column', 0.1 + (pw + 4) * 0.1), mid('column', 0.1 + (pw + 4) * 0.1) + 0.7, 0.12));
            hops.forEach((h, i) => { const p = P(t, mid('column', 0.12 + i * 0.1), 0.3, linear); op(h.hg, p > 0 ? 1 : 0); h.a.set(p); });
            popSet(cCol, t, mid('column', 0.2), at('slide'), 215, 220);
          }
        } else if (t < at('gap')) {
          // 3.47 -> 34.7, then 3.47 -> 0.0347
          if (t < tSlide2) { r347.set(P(t, at('slide'), 0.25, linear)); r347.shift(P(t, mid('slide', 0.12), 0.5, ease)); }
          else {
            const done = mid('slide', 0.78);
            r347.set(t < done ? 1 : 1 - P(t, done, 0.2, linear));
            r347.shift(-2 * P(t, tSlide2 + 0.15, 0.8, ease));
            r0347.set(P(t, done, 0.25, linear));
          }
          fadeWin(eq.s1, t, mid('slide', 0.22), tSlide2);
          fadeWin(eq.s2, t, mid('slide', 0.8), at('gap'));
          // side card: all four
          w4.set(0);
          w4.show(0, P(t, mid('slide', 0.25), 0.3, linear));
          w4.show(1, P(t, mid('slide', 0.38), 0.3, linear));
          w4.show(2, P(t, mid('slide', 0.62), 0.3, linear));
          w4.show(3, P(t, mid('slide', 0.85), 0.3, linear));
          op(card4, P(t, at('slide'), 0.25, linear));
        } else {
          // 6.2 × 100: a gap; a cream place-holder 0 drops in: 620
          const drop = mid('holder', 0.18);
          if (t < drop) { r62.set(P(t, at('gap'), 0.25, linear)); r62.shift(2 * P(t, mid('gap', 0.25), 0.7, ease)); }
          r620.set(t >= drop ? 1 : 0);
          const dz = P(t, drop, 0.45, easeOut), bounce = t >= drop ? Math.sin(P(t, drop + 0.4, 0.3, linear) * Math.PI) * 6 : 0;
          tr(r620.tiles[2], 0, -110 * (1 - dz) - bounce);
          op(r620.tiles[2], clamp(dz * 3));
          op(gapT, t > mid('gap', 0.6) && t < drop + 0.3 ? 1 : 0);
          fadeWin(eq.g1, t, mid('gap', 0.15), drop + 0.3);
          fadeWin(eq.g2, t, drop + 0.3, 1e9);
          popSet(cLeft2, t, mid('gap', 0.3), at('holder'), 215, 170);
          popSet(cHold, t, drop + 0.3, 1e9, 215, 170);
          fadeWin(nDiv, t, mid('holder', 0.7), 1e9);
          // DING! for Nought's new job
          stDing.set(t >= mid('job', 0.35) ? P(t, mid('job', 0.35), 0.35, linear) : 0); tr(stDing, 215, 345, 0.6);
        }
      }
      /* D: Mum, Kavya, Dot's table */
      if (t >= cD) {
        op(bD, 1);
        const tT = at('hundredth') - 0.06;
        fadeWin(m1, t, mid('how', 0.12), mid('four', 0.4));
        write(m2a, t, mid('how', 0.55), tT, 0, 0);
        write(m2q, t, mid('how', 0.62), mid('four', 0.5), 0, 0);
        write(m2ans, t, mid('four', 0.5), tT, 0, 0);
        fadeWin(m3, t, mid('how', 0.78), at('four') + 0.2);
        fadeWin(m4, t, mid('four', 0.15), tT);
        popSet(cDiv, t, mid('four', 0.68), tT, 600, 162);
        op(tbl, t >= tT ? 1 : 0);
        if (t >= tT) tbl.cells.forEach((row, i) => row.forEach(c => op(c, i === 0 ? 1 : P(t, mid('hundredth', 0.02 + (i - 1) * 0.18), 0.25, linear))));
      }

      /* the humans */
      ['kavya', 'mum', 'dad', 'boy', 'priya', 'tan'].forEach(k => {
        op(H[k], 1);
        tr(H[k], XS[k], LY + (k === 'boy' ? 14 : 0), LS);
        let mood = 'neutral', look = lookAt(k), lift_ = 0;
        if (t < at('steel')) { mood = k === 'tan' ? 'happy' : k === 'boy' ? 'happy' : 'neutral'; look = k === 'tan' ? -0.4 : lookAt('tan') || clamp((XS.tan - XS[k]) / 300, -1, 1); if (k === 'tan' && t > mid('ten', 0.5)) lift_ = 1; }
        else if (t < at('zero')) { mood = k === 'tan' ? 'happy' : 'deadpan'; if (k === 'tan') { lift_ = 1; look = -0.5; } }
        else if (t < at('nought')) { mood = k === 'boy' ? 'happy' : k === 'kavya' ? 'deadpan' : 'neutral'; if (k === 'boy') lift_ = 1; }
        else if (t < at('dot')) { mood = t < mid('nought', 0.4) ? 'shock' : k === 'boy' ? 'happy' : 'neutral'; }
        else if (t < at('nothing')) { mood = k === 'boy' ? 'happy' : 'neutral'; }
        else if (t < at('move')) { mood = k === 'mum' || k === 'boy' ? 'sad' : 'neutral'; look = lookAt('nought') || clamp((NX - XS[k]) / 300, -1, 1); }
        else if (t < at('column')) { mood = 'neutral'; }
        else if (t < at('slide')) { mood = k === 'kavya' ? 'happy' : 'neutral'; }
        else if (t < at('gap')) { mood = k === 'kavya' ? 'happy' : 'neutral'; }
        else if (t < at('holder')) { mood = k === 'priya' ? (t > mid('gap', 0.6) ? 'shock' : 'smug') : 'neutral'; if (k === 'priya') lift_ = 1; }
        else if (t < at('job')) { mood = k === 'priya' ? 'happy' : 'neutral'; }
        else if (t < cC) { mood = 'happy'; look = clamp((NX - XS[k]) / 300, -1, 1); }
        else if (t < at('four')) { mood = k === 'mum' ? 'neutral' : 'neutral'; if (k === 'mum') { lift_ = 1; look = 0.3; } }
        else if (t < at('hundredth')) { mood = k === 'kavya' ? 'happy' : k === 'mum' ? 'happy' : 'neutral'; }
        else { mood = k === 'boy' ? 'sad' : 'neutral'; }
        H[k].set({ t, talk: scTalk(S, t, k), mood, look, lift: lift_ });
      });
      // Nought on the rail (from his first line)
      const nIn = at('nought') - 0.1;
      if (t >= nIn) {
        op(nought, 1);
        const p = P(t, nIn, 0.4, pop);
        let nm = 'happy', badge = 0, wv = 0, nl = lookAt('nought');
        if (t < at('dot')) wv = 1;
        if (t >= at('nothing') && t < at('move')) nm = 'sad';
        if (t >= at('job')) { nm = t < mid('job', 0.25) ? 'shock' : 'happy'; badge = P(t, at('job') - 0.05, 0.3, pop); wv = t > mid('job', 0.5) ? 1 : 0; }
        if (t >= cD) badge = 1;
        tr(nought, NX, NY + 140 * (1 - clamp(p)), NS * (t >= at('job') && t < at('job') + 0.4 ? 1 + 0.15 * Math.sin(P(t, at('job'), 0.4, linear) * Math.PI) : 1));
        nought.set({ t, talk: scTalk(S, t, 'nought'), mood: nm, look: spk === 'nought' ? 0.4 : nl, badge, wave: wv });
        ltOn(t, 'nought', at('nought') + 0.05);
      } else op(nought, 0);
      // Dot rolls in along the rail
      const dIn = at('dot') - 0.15;
      if (t >= dIn) {
        op(dot, 1);
        const p = P(t, dIn, 0.55, easeOut);
        tr(dot, lerp(1130, DX, p), DY, DS);
        let dm = 'neutral';
        dot.set({ t, talk: scTalk(S, t, 'dot'), mood: dm, look: spk === 'dot' ? -0.3 : lookAt('dot'), hop: p < 1 ? 1 : 0 });
        ltOn(t, 'dot', at('dot') + 0.1);
      } else op(dot, 0);
      ltOn(t, 'priya', at('gap') + 0.05);
      ltOn(t, 'mum', at('how') + 0.05);
    }

    /* ---------- C: close shot, Ah Boy ---------- */
    op(closeShot, sClose); op(closeFront, sClose);
    [cTenC, cCoin40, cDollar, cMulDiv, c400].forEach(c => c.set(0)); thought.set(0);
    op(c1, 0); op(c1q, 0); op(c1a, 0); op(cTen1, 0); op(cOf, 0); op(rich, 0); op(burst, 0);
    if (sClose) {
      ['kavya', 'mum', 'dad', 'priya', 'tan'].forEach(k => op(H[k], 0));
      op(nought, 0); op(dot, 0);
      op(boy, 1);
      const pigShot = t >= cE;
      tr(boy, 245, 430, 1.7);
      op(coinL, pigShot ? 0 : 1); op(piggy, pigShot ? 0 : 1); op(tower, pigShot ? 1 : 0);
      op(pigHand, pigShot ? 1 : 0);
      if (!pigShot) {
        // the piggy bank shakes out coins
        const shake = t < mid('coins', 0.45) ? Math.sin(t * 40) * 6 * AMP : 0;
        tr(piggy, 535, 648, 1.15, shake);
        // 40 coins: first 4 rows of 10, then 10 groups of 4
        const grp = P(t, mid('tenth', 0.3), 0.7, ease);
        coins.forEach((c, n) => {
          const i = Math.floor(n / 10), j = n % 10;            // row i (0-3), column j (0-9)
          const x1 = 650 + j * 45, y1 = 430 + i * 56;          // 4 rows of 10
          const x2 = 650 + j * 50, y2 = 444 + i * 46;          // 10 groups of 4 (columns)
          const ap = P(t, at('coins') + 0.3 + n * 0.05, 0.25, pop);
          op(c, clamp(ap * 3));
          tr(c, lerp(x1, x2, grp), lerp(y1, y2, grp), Math.max(0.01, ap));
        });
        rowLabs.forEach((l, i) => { op(l, clamp(P(t, at('coins') + 0.3 + (i * 10 + 9) * 0.05, 0.25, linear) - grp * 2)); attr(l, 'x', 1104); attr(l, 'y', 440 + i * 56); });
        tenLabs.forEach((l, j) => { op(l, P(t, mid('tenth', 0.45) + j * 0.04, 0.2, linear)); attr(l, 'x', 650 + j * 50); attr(l, 'y', 624); });
        op(grpBox, P(t, mid('tenth', 0.55), 0.25, linear)); tr(grpBox, 650, 513);
        op(grpLab, 0);
        // equations and chips
        popSet(cTenC, t, mid('coins', 0.18), at('tenth'), 960, 150);
        popSet(cCoin40, t, mid('coins', 0.1), at('tenth'), 960, 345);
        op(c1, t > mid('coins', 0.45) ? P(t, mid('coins', 0.45), 0.3, linear) : 0);
        op(c1q, t > mid('coins', 0.5) && t < mid('tenth', 0.85) ? 1 : 0);
        op(c1a, t >= mid('tenth', 0.85) ? P(t, mid('tenth', 0.85), 0.25, linear) : 0);
        op(cTen1, t >= at('tenth') ? P(t, mid('tenth', 0.05), 0.3, linear) : 0);
        op(cOf, t >= mid('tenth', 0.6) ? P(t, mid('tenth', 0.6), 0.3, linear) : 0);
        popSet(cMulDiv, t, mid('tenth', 0.88), 1e9, 470, 160);
        popSet(cDollar, t, mid('less', 0.05), 1e9, 545, 460);
        // "multiplying makes it bigger!" and the $$$ sparkle, which pops on "less"
        popSet(thought, t, mid('coins', 0.62), at('tenth') + 0.4, 525, 205);
        const richOn = t > mid('coins', 0.78) && t < at('less') + 0.1;
        op(rich, richOn ? 1 : 0); tr(rich, 545, 420 + 6 * Math.sin(t * 6), 1 + 0.08 * Math.sin(t * 9));
        const bp = P(t, at('less') + 0.1, 0.5, linear);
        op(burst, t > at('less') + 0.1 && bp < 1 ? 1 - bp : 0); tr(burst, 545, 400, 0.6 + 0.8 * bp);
        let bm = 'happy', bl = 0.6, bh = 0;
        if (t >= at('tenth')) { bm = t < mid('tenth', 0.7) ? 'neutral' : 'shock'; bl = 0.7; }
        if (t >= at('less')) { bm = 'sad'; bl = 0; }
        boy.set({ t, talk: scTalk(S, t, 'boy'), mood: bm, look: bl, lift: bh });
      } else {
        const p = P(t, cE + 0.05, 0.3, pop);
        popSet(c400, t, mid('pig', 0.1), 1e9, 960, 300);
        boy.set({ t, talk: scTalk(S, t, 'boy'), mood: 'deadpan', look: 0, lift: 0.25 });
        op(tower, 1); tr(tower, 680, 30 * (1 - clamp(p)));
      }
    } else op(pigHand, 0);
  };
});
