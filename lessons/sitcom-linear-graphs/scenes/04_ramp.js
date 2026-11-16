/* Scene 4: Mo and the skate park (gradient and y-intercept).
   12 noon, the skate park. Ah Boy: ramp A is the biggest, so it's the steepest -> Mo the mountain goat (m for
   mountain) -> gradient = rise / run -> Priya: across over up, 4 / 2 = 2 (OFF THE LINE) -> rise from your seat before
   you run -> wide shot: the three ramps to scale with their rise/run triangles, 2/4 = 0.5, 3/5 = 0.6, 1/2 = 0.5 -> B is
   the steepest (crown); C's triangle slides onto A's slope and fits -> Dad on the deck of ramp C -> board: uphill +,
   downhill -, flat 0 (Lionel tilts with each), gradient 3 = up 3 for every 1 across -> Cece the crossing guard: every
   line crosses the y-axis at (0, c), TWEET -> Lionel: y = mx + c (USA: y = mx + b) -> Dad: y = 5 - 2x, "gradient 5"
   -> Mo: y = -2x + 5, m = -2, c = 5, downhill (ON THE LINE) -> Ah Boy: a ramp straight up? -> Lionel's confessional:
   run = 0, you can't divide by zero, no gradient. */
scene('ramp', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);          // hard sitcom cut
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 3, color: o.color || C.ink, weight: 700 }); };
  const fadeIn = (el, t, t0, d) => { const p = P(t, t0, d || 0.3, easeOut); op(el, p); return p; };
  const GOLD = '#FFE45C', INK = MK.ink, GREEN = '#1E9E5A', RED = '#D32F2F', BLUE = '#1E5AAC', AMBER = '#C77A0A', BERRY = '#B8336A';
  const paperCard = (parent, x, y, w, h, o) => {
    o = o || {};
    E('rect', { x: x + 6, y: y + 7, width: w, height: h, rx: 18, fill: 'rgba(0,0,0,0.22)' }, parent);
    return E('rect', { x, y, width: w, height: h, rx: 18, fill: o.fill || MK.paper, stroke: o.stroke || '#8FA3B8', 'stroke-width': 5 }, parent);
  };

  /* layers */
  const Lbg = G(root), Lcam = G(root), Lcast = G(root), LcamF = G(root), Lfront = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= the skate park (one set; the camera shifts it for the wide shot) ================= */
  E('rect', { x: 0, y: 380, width: 1200, height: 370, fill: '#AEB6BE' }, Lbg);     // floor below the shifted set
  const skate = lgSkate(Lcam);
  Lfront.appendChild(skate.front);
  skate.ramps.forEach(r => op(r.g.lastChild, 0));                                   // hide the set's pole signs
  const graffiti = [3, 4, 5].map(i => skate.firstChild.children[i]);                 // RAD, SKATE, star: hidden in the wide shot
  const U = 60, GY = 610;
  const RX = skate.ramps.map(r => [r.x0, r.x0 + r.run * U, GY - r.rise * U]);    // [x0, x1, top y]
  // painted letter badges above each ramp's high end (they move with the camera)
  const badges = skate.ramps.map((r, i) => {
    const g = G(Lcam); tr(g, RX[i][1], RX[i][2] - 36);
    E('line', { x1: 0, y1: 0, x2: 0, y2: 30, stroke: '#5A6670', 'stroke-width': 6 }, g);
    E('circle', { r: 27, fill: GOLD, stroke: SC_INK, 'stroke-width': 4 }, g);
    T(g, 0, 11, r.lab, { size: 32, weight: 800, anchor: 'middle', fill: SC_INK });
    return g;
  });
  // ramp A glow (Ah Boy's pick)
  const glowA = E('path', { d: `M${RX[0][0]},${GY} L${RX[0][1]},${RX[0][2]} L${RX[0][1]},${GY} Z`, fill: 'rgba(255,228,92,0.25)', stroke: GOLD, 'stroke-width': 9, 'stroke-linejoin': 'round' }, Lcam);
  // the rise / run triangles (my own, so their labels clear the other ramps)
  const RAMPCOL = ['#1E5AAC', '#1E5AAC', '#1E5AAC'];
  const tris = skate.ramps.map((r, i) => {
    const [x0, x1, y1] = RX[i], g = G(Lcam);
    E('path', { d: `M${x0},${GY} L${x1},${y1} L${x1},${GY} Z`, fill: 'rgba(255,255,255,0.28)' }, g);
    const run = mkDash(E('path', { d: `M${x0},${GY + 12} L${x1},${GY + 12}`, stroke: RAMPCOL[i], 'stroke-width': 7, 'stroke-linecap': 'round' }, g));
    const rise = mkDash(E('path', { d: `M${x1 + 14},${GY} L${x1 + 14},${y1}`, stroke: RED, 'stroke-width': 7, 'stroke-linecap': 'round' }, g));
    const lr = mkText(g, (x0 + x1) / 2, GY + 48, `run **${r.run} m**`, { size: 28, anchor: 'middle', fill: '#1E4E8C', halo: '#D3D8DD' });
    const lu = mkText(g, x1 + 26, (GY + y1) / 2 + 10, `rise **${r.rise} m**`, { size: 28, anchor: 'start', fill: '#B0123E', halo: '#D3D8DD' });
    g.set = p => { op(g, p > 0 ? 1 : 0); mkDraw(run, P(p, 0, 0.5, linear)); mkDraw(rise, P(p, 0.35, 0.5, linear)); op(lr, P(p, 0.3, 0.3, linear)); op(lu, P(p, 0.65, 0.3, linear)); };
    g.set(0);
    return g;
  });
  // the calculations above each ramp
  const CALC = [['2 ÷ 4 = 0.5', 210, 400], ['3 ÷ 5 = 0.6', 600, 350], ['1 ÷ 2 = 0.5', 940, 470]];
  const calcs = CALC.map(([src, x, y], i) => {
    const g = G(Lcam), inner = G(g); tr(g, x, y);
    const m = mkMath(inner, 0, 0, src, { size: 40, anchor: 'middle', fill: INK, halo: '#E6EAEE' });
    const hl = E('rect', { x: -m.w / 2 - 12, y: -40, width: m.w + 24, height: 54, rx: 12, fill: i === 1 ? 'rgba(255,228,92,0.85)' : 'rgba(86,214,155,0.55)', stroke: i === 1 ? '#E2B33C' : GREEN, 'stroke-width': 3 }, inner);
    inner.insertBefore(hl, inner.firstChild); op(hl, 0);
    g.hl = hl;
    g.set = p => mkPopIn(g, p);
    g.set(0);
    return g;
  });
  // B's crown, the sliding copy of C's triangle
  const crown = G(Lcam);
  E('path', { d: 'M-34,14 L-38,-22 L-18,-4 L0,-30 L18,-4 L38,-22 L34,14 Z', fill: GOLD, stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, crown);
  mkText(crown, 54, 12, '**steepest**', { size: 32, fill: '#8A5A00', halo: '#E6EAEE' });
  const slideC = G(Lcam);
  E('path', { d: `M${RX[2][0]},${GY} L${RX[2][1]},${GY} L${RX[2][1]},${RX[2][2]} Z`, fill: 'rgba(86,214,155,0.75)', stroke: GREEN, 'stroke-width': 5, 'stroke-linejoin': 'round' }, slideC);
  const sameChip = mkChip(Lhud, '**A** and **C**: equally steep', { size: 32, col: GREEN, fill: 'rgba(10,27,39,0.88)', textCol: '#FFFFFF' });
  // the deck on top of ramp C (Dad sits behind it)
  const deck = G(LcamF);
  E('rect', { x: RX[2][1], y: RX[2][2] - 2, width: 150, height: GY - RX[2][2] + 2, fill: '#B9C2CA', stroke: SC_INK, 'stroke-width': 4 }, deck);
  E('rect', { x: RX[2][1] - 4, y: RX[2][2] - 10, width: 158, height: 12, rx: 5, fill: '#8F9CAB', stroke: SC_INK, 'stroke-width': 3 }, deck);
  const deckChip = mkChip(Lhud, 'ramp **C**: for the view', { size: 30, col: GOLD });

  /* ================= FAM: the wall card (rise over run) ================= */
  const wall = G(Lfg);
  paperCard(wall, 340, 112, 810, 286);
  const tri = G(wall);
  E('path', { d: 'M390,350 L590,350 L590,200 Z', fill: 'rgba(255,228,92,0.35)' }, tri);
  E('path', { d: 'M390,350 L590,200', stroke: AMBER, 'stroke-width': 8, 'stroke-linecap': 'round' }, tri);
  E('path', { d: 'M390,350 L590,350', stroke: '#2E7DD8', 'stroke-width': 7, 'stroke-linecap': 'round' }, tri);
  const riseLn = E('path', { d: 'M590,350 L590,200', stroke: RED, 'stroke-width': 7, 'stroke-linecap': 'round' }, tri);
  const riseGlow = E('path', { d: 'M590,352 L590,198', stroke: GOLD, 'stroke-width': 22, 'stroke-linecap': 'round', opacity: 0 }, tri);
  tri.insertBefore(riseGlow, riseLn);
  const triRun = mkText(tri, 490, 386, '**run**: across', { size: 28, anchor: 'middle', fill: '#1E4E8C' });
  const triRise = mkText(tri, 606, 288, '**rise**: up', { size: 28, fill: '#B0123E' });
  // rr: the formula
  const wRR = G(wall);
  mkMath(wRR, 930, 262, '"gradient" = "rise"/"run"', { size: 50, anchor: 'middle', fill: INK });
  mkText(wRR, 930, 362, 'how far **up** ÷ how far **across**', { size: 30, anchor: 'middle', fill: INK, boldFill: BERRY });
  // priya: across over up
  const wPR = G(wall);
  mkMath(wPR, 930, 196, '"across"/"up"?', { size: 46, anchor: 'middle', fill: RED });
  mkText(wPR, 930, 290, 'Ramp A: {{4 ÷ 2 = 2}}', { size: 40, anchor: 'middle', fill: RED });
  const stOffP = lgStamp(wall, false);
  // seat: rise on top
  const wST = G(wall);
  const stHL = E('rect', { x: 685, y: 136, width: 120, height: 66, rx: 12, fill: 'rgba(255,228,92,0.9)', stroke: '#E2B33C', 'stroke-width': 3 }, wST);
  mkMath(wST, 745, 236, '"rise"/"run"', { size: 64, anchor: 'middle', fill: INK });
  const stUp = mkText(wST, 822, 184, '← on **top**', { size: 32, fill: INK, boldFill: BERRY });
  const seatChip = mkChip(wST, '**Rise** from your seat **before** you **run**', { size: 30, col: '#8A5A00', fill: '#FFF3D6', textCol: INK });
  tr(seatChip, 745, 345);
  // five: Dad's "gradient 5"
  const wFV = G(Lfg);
  paperCard(wFV, 340, 112, 810, 286);
  const fvEq = mkMath(wFV, 745, 236, 'y = 5 − 2x', { size: 72, anchor: 'middle', fill: INK });
  const fvRing = E('ellipse', { cx: 745 - fvEq.w / 2 + mkMeasure('y = 5', { size: 72 }).w - mkMeasure('5', { size: 72 }).w / 2, cy: 212, rx: 34, ry: 42, fill: 'none', stroke: RED, 'stroke-width': 6 }, wFV);
  const fvNote = mkText(wFV, 745, 340, '"gradient **5**? it comes **first**"', { size: 34, anchor: 'middle', fill: INK, boldFill: RED });
  // vert: a ramp that goes straight up
  const wVT = G(Lfg);
  paperCard(wVT, 340, 112, 810, 286);
  E('path', { d: 'M420,340 L500,340 L500,136 L460,136 Q420,136 420,176 Z', fill: linGrad('#E9C48A', '#C9935A', true), stroke: SC_INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, wVT);
  E('path', { d: 'M520,340 L520,136', stroke: RED, 'stroke-width': 7, 'stroke-linecap': 'round' }, wVT);
  mkText(wVT, 536, 248, '**rise**', { size: 30, fill: '#B0123E' });
  mkText(wVT, 460, 376, 'run ?', { size: 28, anchor: 'middle', fill: '#1E4E8C' });
  const vtQ = T(wVT, 700, 300, '?', { size: 150, weight: 800, anchor: 'middle', fill: RED });
  const vtBubble = mkSpeechBubble(Lfg, 'a ramp that goes\n**straight up**?', { size: 32, tail: 'down', tailX: 40 });

  /* ================= TEACH: the board ================= */
  const board = G(Lfg);
  paperCard(board, 470, 110, 690, 342);
  // sign: three mood graphs
  const MOODS = [[0.75, 'uphill', '**positive**', GREEN], [-0.75, 'downhill', '**negative**', RED], [0, 'flat', '**zero**', '#5A6670']];
  const moodP = MOODS.map(([m, a, b, col], i) => {
    const g = G(board), cx = 585 + i * 230;
    const ax = mkAxes(g, { xmin: -2, xmax: 2, ymin: -2, ymax: 2, unit: 38, ink: INK, size: 18, grid: false, labelStep: 10, halo: MK.paper, xName: ' ', yName: ' ' });
    tr(ax, cx - 76, 140);
    const ln = ax.line(m, 0, { col, width: 7 });
    mkText(g, cx, 340, a, { size: 28, anchor: 'middle', fill: INK });
    const sg = mkText(g, cx, 380, b, { size: 30, anchor: 'middle', fill: INK, boldFill: col });
    const sym = mkMath(g, cx + 58, 186, i === 0 ? '+' : i === 1 ? '−' : '0', { size: 44, anchor: 'middle', fill: col, weight: 800 });
    return { g, ln, sg, sym };
  });
  // sign: gradient 3 staircase
  const stair = G(board);
  const sAx = mkAxes(stair, { xmin: 0, xmax: 2, ymin: 0, ymax: 6, unit: 42, ink: INK, size: 22, labelStep: 1, halo: MK.paper });
  tr(sAx, 560, 150);
  const sLn = sAx.line(3, 0, { col: AMBER, width: 6 });
  const SXp = x => 560 + sAx.px(x), SYp = y => 150 + sAx.py(y);
  const steps = [0, 1].map(k => {
    const g = G(stair);
    const a = mkDash(E('path', { d: `M${SXp(k)},${SYp(3 * k)} L${SXp(k + 1)},${SYp(3 * k)}`, stroke: '#2E7DD8', 'stroke-width': 6, 'stroke-linecap': 'round' }, g));
    const b = mkDash(E('path', { d: `M${SXp(k + 1)},${SYp(3 * k)} L${SXp(k + 1)},${SYp(3 * k + 3)}`, stroke: RED, 'stroke-width': 6, 'stroke-linecap': 'round' }, g));
    return { g, a, b };
  });
  const stM = mkMath(stair, 920, 230, 'm = 3', { size: 64, anchor: 'middle', fill: AMBER, weight: 700 });
  const stT1 = mkText(stair, 920, 310, 'up **3**', { size: 36, anchor: 'middle', fill: INK, boldFill: RED });
  const stT2 = mkText(stair, 920, 360, 'for every **1** across', { size: 34, anchor: 'middle', fill: INK, boldFill: '#2E7DD8' });
  // cece: the y-intercept
  const cBoard = G(board);
  const cAx = mkAxes(cBoard, { xmin: -3, xmax: 3, ymin: 0, ymax: 5, unit: 44, ink: INK, size: 24, labelStep: 2, halo: MK.paper });
  tr(cAx, 520, 150);
  const cLn = cAx.line(0.5, 2, { col: AMBER, width: 6 });
  const CXp = x => 520 + cAx.px(x), CYp = y => 150 + cAx.py(y);
  const cRing = E('circle', { cx: CXp(0), cy: CYp(2), r: 15, fill: '#FFFFFF', stroke: RED, 'stroke-width': 6 }, cBoard);
  const cPost = G(cBoard); tr(cPost, CXp(0), CYp(2));
  E('circle', { r: 26, fill: 'none', stroke: RED, 'stroke-width': 4, opacity: 0.6 }, cPost);
  const cLab = mkMath(cBoard, CXp(0) - 22, CYp(2) - 22, '(0, c)', { size: 34, anchor: 'end', fill: RED, halo: MK.paper });
  const cChip = mkChip(cBoard, '**c** for **crossing**', { size: 34, col: '#C62828', fill: '#FFF3F0', textCol: INK });
  const cTxt = mkText(cBoard, 1000, 330, 'where the line\ncrosses the **y-axis**', { size: 30, anchor: 'middle', fill: INK, boldFill: BLUE });
  // name: y = mx + c
  const nBoard = G(board);
  const nEq = mkMath(nBoard, 815, 232, 'y = mx + c', { size: 84, anchor: 'middle', fill: INK });
  const nW = mkMeasure('y = mx + c', { size: 84 }).w, nX0 = 815 - nW / 2;
  const nMx = nX0 + mkMeasure('y = ', { size: 84 }).w + mkMeasure('m', { size: 84 }).w / 2;
  const nCx = nX0 + nW - mkMeasure('c', { size: 84 }).w / 2;
  const nM = G(nBoard); E('path', { d: `M${nMx},252 L${nMx},290`, stroke: AMBER, 'stroke-width': 5, 'stroke-linecap': 'round' }, nM);
  mkText(nM, nMx, 326, '**m**: how steep', { size: 30, anchor: 'middle', fill: INK, boldFill: AMBER });
  const nC = G(nBoard); E('path', { d: `M${nCx},252 L${nCx},336`, stroke: RED, 'stroke-width': 5, 'stroke-linecap': 'round' }, nC);
  mkText(nC, nCx, 372, '**c**: where it crosses', { size: 30, anchor: 'middle', fill: INK, boldFill: RED });
  const nUSA = mkText(nBoard, 1140, 152, 'USA: {{y = mx + b}}', { size: 28, anchor: 'end', fill: '#5A6670' });
  // minus: y = -2x + 5
  const mBoard = G(board);
  const mWork = mkWorking(mBoard, 600, 140, [
    { m: 'y = 5 − 2x' },
    { m: 'y = −2x + 5' },
    { m: 'm = −2', col: AMBER },
    { m: 'c = 5', col: RED },
  ], { size: 44, fill: INK, gap: 22 });
  const mSign = mkText(mBoard, 790, 338, '(sign **included**)', { size: 26, anchor: 'middle', fill: INK, boldFill: AMBER });
  const mAx = mkAxes(mBoard, { xmin: 0, xmax: 4, ymin: 0, ymax: 6, unit: 34, ink: INK, size: 22, labelStep: 1, halo: MK.paper });
  tr(mAx, 930, 150);
  const mLn = mAx.line(-2, 5, { col: AMBER, width: 7 });
  const mPt = mAx.point(0, 5, { col: RED, r: 10 });
  const mTw = lgTweet(mBoard);
  const mDown = mkText(mBoard, 1150, 300, '**downhill**', { size: 28, anchor: 'end', fill: RED, halo: MK.paper });
  const stOnM = lgStamp(Lfg, true);

  /* ================= CONF: Lionel and the vertical ramp ================= */
  const conf = lgConf(Lbg, 'lionel');
  const vertCard = G(Lfg);
  E('rect', { x: -250, y: -165, width: 500, height: 330, rx: 18, fill: MK.paper, stroke: RED, 'stroke-width': 5 }, vertCard);
  T(vertCard, 0, -108, 'VERTICAL', { size: 40, weight: 800, anchor: 'middle', fill: RED, ls: 3 });
  mkMath(vertCard, -24, -6, '"gradient" = "rise"/0', { size: 46, anchor: 'middle', fill: INK });
  const vX = cross(vertCard, 22, RED); tr(vX, 196, -18);
  const vNo = mkText(vertCard, 0, 82, 'run = 0: **no gradient**', { size: 32, anchor: 'middle', fill: INK, boldFill: RED });
  const vDiv = mkText(vertCard, 0, 132, "you **can't** divide by **zero**", { size: 30, anchor: 'middle', fill: INK, boldFill: RED });

  /* ================= HUD: chips ================= */
  const cNoon = pill(Lhud, '12 noon', { size: 32, color: GOLD, stroke: GOLD });
  const phone = lgPhone(Lhud, { s: 0.32 }); phone.set(65);
  const cWant = mkChip(Lfg, 'Ah Boy wants the **steepest** ramp', { size: 32, col: GOLD });
  const bigBubble = mkSpeechBubble(Lfg, 'Ramp **A**! **biggest** = **steepest**!', { size: 30, tail: 'down', tailX: 60 });
  const cMount = mkChip(Lfg, '**m** for **mountain**', { size: 34, col: '#7EE08A' });

  /* ================= the cast (one instance each) ================= */
  const mo = cast(Lcast, 'mo'), cece = cast(Lcast, 'cece');
  const priya = cast(Lcast, 'priya', { prop: null }), kav = cast(Lcast, 'kavya'), boy = cast(Lcast, 'boy'), dad = cast(Lcast, 'dad');
  const lio = cast(Lcast, 'lionel', { len: 340 });
  Lcast.insertBefore(dad, Lcast.firstChild);           // Dad sits behind the deck (LcamF) in the wide shot
  const lt = { mo: lgLowerThird(Lhud, 'mo'), cece: lgLowerThird(Lhud, 'cece') };
  const ltOn = (t, who, t0) => lt[who].set(win(t, t0, t0 + 3.1, 0.3));

  /* cut points */
  const cW = at('ramps') - 0.06, cT = at('sign') - 0.06, cF2 = at('five') - 0.06, cT2 = at('minus') - 0.06, cF3 = at('vert') - 0.06, cC = at('zero') - 0.06;
  const HY = 560, WY = 593, WS = 0.62;
  const fade = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  return t => {
    const who = scWho(S, t);
    op(fade, 1 - P(t, 0, 0.35, linear));
    const sF = on(t, -9, cW) || on(t, cF2, cT2) || on(t, cF3, cC), sW = on(t, cW, cT), sT = on(t, cT, cF2) || on(t, cT2, cF3), sC = on(t, cC, 1e9);
    for (const k in lt) lt[k].set(0);
    const show = { mo: 0, cece: 0, priya: 0, kav: 0, boy: 0, dad: 0, lio: 0 };
    let dadOp = 1;

    /* ---------- camera ---------- */
    op(Lcam, sC ? 0 : 1); op(LcamF, sW); op(Lfront, sC ? 0 : 1);
    const camY = sW ? -150 : 0;
    tr(Lcam, 0, camY); tr(LcamF, 0, camY);
    graffiti.forEach(g => op(g, sW ? 0 : 0.75));
    conf.set(sC, t);

    /* everything per shot starts hidden */
    op(wall, 0); op(wFV, 0); op(wVT, 0); vtBubble.set(0); op(board, 0); op(vertCard, 0);
    cWant.set(0); bigBubble.set(0); cMount.set(0); seatChip.set(0); sameChip.set(0); deckChip.set(0); stOnM.set(0);
    op(glowA, 0); tris.forEach(g => g.set(0)); calcs.forEach(g => g.set(0)); op(crown, 0); op(slideC, 0); op(deck, 0);
    badges.forEach((b, i) => op(b, sW || (sF && i === 0 && t < at('mo')) ? 1 : 0));
    op(cNoon, 0); op(phone, 0);

    /* ---------- FAM: the family at the kerb ---------- */
    if (sF) {
      op(phone, 1); tr(phone, 1130, 70);
      const first = t < cW, five = t >= cF2 && t < cT2, vert = t >= cF3;
      // the humans
      show.priya = show.kav = show.boy = show.dad = 1;
      tr(priya, 525, HY, 0.88); tr(kav, 700, HY, 0.88); tr(boy, 870, HY + 4, 0.88); tr(dad, 1060, HY, 0.88);
      let pm = 'happy', pl = 0.4, km = 'neutral', kl = 0.3, bm = 'happy', bl = -0.4, blift = 0, dm = 'happy', dl = -0.4, dlift = 0;
      if (first) {
        if (t < at('big')) { bm = 'happy'; bl = -0.6; km = 'neutral'; kl = 0.5; pl = 0.6; dl = -0.6; }
        else if (t < at('mo')) { blift = 1; bl = -1; km = 'deadpan'; kl = 0.6; pm = 'smug'; pl = 0.7; dm = 'smug'; dl = -0.7; }
        else if (t < at('priya')) { pm = 'neutral'; pl = -0.9; km = 'happy'; kl = -0.9; bm = 'shock'; bl = -1; dm = 'neutral'; dl = -1; if (t > mid('mo', 0.4)) bm = 'happy'; }
        else if (t < at('seat')) { pm = 'smug'; pl = -0.7; km = 'deadpan'; kl = -0.7; bl = -0.9; dl = -0.9; dm = 'neutral'; }
        else { pm = 'annoyed'; pl = -0.8; km = 'happy'; kl = -0.8; bl = -0.9; dl = -0.9; dm = 'neutral'; }
      } else if (five) {
        dm = t < mid('five', 0.85) ? 'smug' : 'smug'; dl = -0.6; dlift = 1; km = 'deadpan'; kl = 0.8; pm = 'deadpan'; pl = 0.8; bm = 'happy'; bl = 0.8;
      } else if (vert) {
        blift = 1; bm = 'happy'; bl = -0.2; km = 'neutral'; kl = 0.8; pm = 'shock'; pl = 0.8; dm = 'shock'; dl = -0.7;
      }
      priya.set({ t, talk: scTalk(S, t, 'priya'), mood: pm, look: pl });
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: bm, look: bl, lift: blift });
      dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: dl, lift: dlift });

      // Mo, from his entrance
      if (t >= at('mo') - 0.1) {
        show.mo = 1;
        const hop = P(t, at('mo') - 0.1, 0.7, easeOut);
        const x = lerp(-180, 165, hop), y = HY - 4 - Math.sin(Math.min(1, hop) * Math.PI) * 120;
        tr(mo, x, y, 0.88);
        let mm = 'happy', ml = 0.6, flag = 0;
        if (first) {
          if (t < at('rr')) mm = 'happy';
          else if (t < at('priya')) { flag = P(t, mid('rr', 0.1), 0.5, easeOut); }
          else if (t < at('seat')) { mm = t > mid('priya', 0.45) ? 'annoyed' : 'neutral'; ml = 0.9; }
          else { mm = 'happy'; flag = P(t, at('seat') + 0.2, 0.5, easeOut); }
        } else if (five) { mm = t > mid('five', 0.5) ? 'annoyed' : 'neutral'; ml = 1; }
        else { mm = 'shock'; ml = 1; }
        mo.set({ t, talk: scTalk(S, t, 'mo'), mood: mm, look: ml, flag });
        ltOn(t, 'mo', at('mo') + 0.3);
      }

      if (first) {
        // noon: chip, phone, what Ah Boy wants
        if (t < at('mo')) popIn(cNoon, t, at('noon') + 0.1, 980, 70);
        if (t < at('mo')) { cWant.set(P(t, mid('noon', 0.45), 0.4, linear)); tr(cWant, 640, 128); }
        // big: ramp A glows
        if (t >= at('big') && t < at('mo') + 0.3) {
          op(glowA, 0.55 + 0.45 * Math.sin(t * 7));
          bigBubble.set(P(t, at('big') + 0.1, 0.35, linear)); tr(bigBubble, 870, 320);
          cWant.set(0);
        }
        // mo: m for mountain
        if (t >= at('mo') && t < at('rr')) { cMount.set(P(t, mid('mo', 0.5), 0.4, linear)); tr(cMount, 420, 200); }
        // rr, priya, seat: the wall card
        if (t >= at('rr')) {
          const wp = P(t, at('rr') - 0.05, 0.35, easeOut);
          op(wall, wp); tr(wall, 0, 16 * (1 - wp));
          const inRR = t < at('priya'), inPR = t >= at('priya') && t < at('seat'), inST = t >= at('seat');
          op(wRR, inRR ? fadeIn(wRR, t, mid('rr', 0.08)) : 0);
          op(triRun, inRR ? P(t, mid('rr', 0.62), 0.3, linear) : 1); op(triRise, inRR ? P(t, mid('rr', 0.5), 0.3, linear) : 1);
          op(wPR, inPR ? P(t, at('priya') + 0.1, 0.3, linear) : 0);
          stOffP.set(inPR ? P(t, mid('priya', 0.78), 0.35, linear) : 0); tr(stOffP, 930, 352, 0.48);
          op(wST, inST ? P(t, at('seat') + 0.1, 0.3, linear) : 0);
          op(stHL, inST ? P(t, mid('seat', 0.35), 0.3, linear) * (0.75 + 0.25 * Math.sin(t * 6)) : 0);
          op(stUp, inST ? P(t, mid('seat', 0.7), 0.3, linear) : 0);
          op(riseGlow, inST ? P(t, mid('seat', 0.35), 0.3, linear) * 0.6 : 0);
          seatChip.set(inST ? P(t, mid('seat', 0.05), 0.4, linear) : 0);
          op(tri, inST ? 1 - P(t, at('seat'), 0.2, linear) : 1);
        }
      } else if (five) {
        const fp = P(t, at('five') - 0.05, 0.3, easeOut);
        op(wFV, fp);
        op(fvRing, P(t, mid('five', 0.4), 0.3, linear));
        op(fvNote, P(t, mid('five', 0.45), 0.3, linear));
      } else if (vert) {
        op(wVT, P(t, at('vert') - 0.05, 0.3, easeOut));
        vtBubble.set(P(t, at('vert') + 0.1, 0.35, linear)); tr(vtBubble, 950, 240);
        op(vtQ, P(t, mid('vert', 0.5), 0.3, linear));
      }
    }

    /* ---------- WIDE: the three ramps to scale ---------- */
    if (sW) {
      op(phone, 1); tr(phone, 1130, 70);
      // triangles and calculations, ramp by ramp
      const tA = [mid('ramps', 0.05), mid('ramps', 0.42), mid('ramps', 0.72)];
      const fadeAll = t >= at('dad') - 0.1;
      tris.forEach((g, i) => g.set(fadeAll ? 0 : P(t, tA[i], 1.0, linear)));
      calcs.forEach((g, i) => { g.set(fadeAll ? 0 : P(t, tA[i] + 0.9, 0.4, linear)); tr(g, CALC[i][1], CALC[i][2]); });
      // steep: B's crown; A and C equally steep
      if (t >= at('steep') && !fadeAll) {
        const cp = P(t, at('steep') + 0.05, 0.45, pop);
        op(crown, clamp(cp * 2.5)); tr(crown, RX[1][1] - 92, RX[1][2] - 168, Math.max(0.01, 0.6 + 0.4 * cp));
        op(calcs[1].hl, P(t, at('steep') + 0.05, 0.3, linear));
        const sl = P(t, mid('steep', 0.35), 1.4, ease);
        op(slideC, P(t, mid('steep', 0.3), 0.25, linear)); tr(slideC, (RX[0][0] - RX[2][0]) * sl, 0);
        [0, 2].forEach(i => op(calcs[i].hl, P(t, mid('steep', 0.62), 0.3, linear)));
        sameChip.set(P(t, mid('steep', 0.6), 0.4, linear)); tr(sameChip, 975, 185);
      }
      // the small humans along the front
      show.kav = show.priya = show.boy = 1;
      tr(kav, 405, WY, WS); tr(priya, 770, WY, WS); tr(boy, 1100, WY + 4, WS);
      const lookAt = t < at('steep') ? [0.2, -0.6, -0.8] : [0.3, -0.4, -0.6];
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: t >= at('dad') ? 'deadpan' : 'happy', look: t >= at('dad') ? 1 : lookAt[0] });
      priya.set({ t, mood: t >= at('dad') ? 'deadpan' : t >= at('steep') ? 'neutral' : 'annoyed', look: t >= at('dad') ? 0.9 : -0.9 });
      boy.set({ t, mood: t >= at('steep') && t < at('dad') ? 'shock' : 'happy', look: t >= at('dad') ? -0.4 : -0.9 });
      // dad: on the deck of ramp C
      if (t >= at('dad') - 0.15) {
        show.dad = 1;
        const up = P(t, at('dad') - 0.15, 0.35, pop);
        op(deck, 1);
        tr(dad, RX[2][1] + 72, RX[2][2] - 52 - 150 + 24 * (1 - up), 0.6);
        dadOp = clamp(up * 3);
        dad.set({ t, talk: scTalk(S, t, 'dad'), mood: 'smug', look: -0.4, lift: t > mid('dad', 0.3) ? 1 : 0 });
        deckChip.set(P(t, mid('dad', 0.6), 0.4, linear)); tr(deckChip, 820, 200);
      }
    }

    /* ---------- TEACH: the board ---------- */
    if (sT) {
      op(phone, 1); tr(phone, 1130, 70);
      const part = t < at('cece') ? 'sign' : t < at('name') ? 'cece' : t < cF2 ? 'name' : 'minus';
      op(board, P(t, part === 'minus' ? cT2 : cT, 0.25, linear));
      // sign
      const signOn = part === 'sign';
      const b = [mid('sign', 0.03), mid('sign', 0.2), mid('sign', 0.36), mid('sign', 0.55)];
      moodP.forEach((q, i) => {
        const p = signOn && t < b[3] ? P(t, b[i], 0.3, linear) : 0;
        op(q.g, p); q.ln.set(signOn ? P(t, b[i] + 0.05, 0.5, ease) : 0);
      });
      op(stair, signOn ? P(t, b[3], 0.3, linear) : 0);
      if (signOn) {
        sLn.set(P(t, b[3] + 0.1, 0.5, ease));
        steps.forEach((s, k) => { mkDraw(s.a, P(t, mid('sign', 0.72) + k * 0.8, 0.35, linear)); mkDraw(s.b, P(t, mid('sign', 0.72) + k * 0.8 + 0.35, 0.35, linear)); });
        op(stM, P(t, b[3] + 0.2, 0.3, linear)); op(stT1, P(t, mid('sign', 0.75), 0.3, linear)); op(stT2, P(t, mid('sign', 0.86), 0.3, linear));
      }
      // cece
      const ceceOn = part === 'cece';
      op(cBoard, ceceOn ? 1 : 0);
      if (ceceOn) {
        cLn.set(P(t, at('cece') + 0.05, 0.6, ease));
        const tw = mid('cece', 0.68);
        op(cRing, P(t, tw - 0.1, 0.25, linear)); op(cPost, P(t, tw, 0.2, linear) * (0.6 + 0.4 * Math.sin(t * 8)));
        op(cLab, P(t, mid('cece', 0.78), 0.3, linear));
        cChip.set(P(t, mid('cece', 0.25), 0.4, linear)); tr(cChip, 1000, 210);
        op(cTxt, P(t, mid('cece', 0.55), 0.3, linear));
      }
      // name
      const nameOn = part === 'name';
      op(nBoard, nameOn ? 1 : 0);
      if (nameOn) {
        const np = P(t, at('name') + 0.05, 0.45, pop);
        op(nEq, clamp(np * 2.5));
        op(nM, P(t, mid('name', 0.22), 0.3, linear)); op(nC, P(t, mid('name', 0.3), 0.3, linear));
        op(nUSA, P(t, mid('name', 0.55), 0.3, linear));
      }
      // minus
      const minusOn = part === 'minus';
      op(mBoard, minusOn ? 1 : 0);
      if (minusOn) {
        const mt = [at('minus') + 0.05, mid('minus', 0.2), mid('minus', 0.48), mid('minus', 0.62)];
        mWork.set(0); mt.forEach((m0, i) => mWork.show(i, P(t, m0, 0.35, linear)));
        op(mSign, P(t, mid('minus', 0.5), 0.3, linear));
        mLn.set(P(t, mid('minus', 0.72), 0.7, ease)); mPt.set(P(t, mid('minus', 0.62), 0.3, linear));
        mTw.set(t > mid('minus', 0.64) && t < mid('minus', 0.64) + 1.2 ? P(t, mid('minus', 0.64), 0.3, linear) : 0);
        tr(mTw, 930 + mAx.px(0) + 92, 150 + mAx.py(5) - 12, 0.6);
        op(mDown, P(t, mid('minus', 0.85), 0.3, linear));
        stOnM.set(P(t, mid('minus', 0.88), 0.35, linear)); tr(stOnM, 700, 425, 0.42);
      }

      // the speaker on the left
      if (part === 'sign' || part === 'minus') {
        show.mo = 1;
        tr(mo, 210, 566, 0.85);
        mo.set({ t, talk: scTalk(S, t, 'mo'), mood: 'happy', look: 0.8 });
      }
      if (part === 'sign') {
        // Lionel pops into the corner and tilts with each mood
        show.lio = 1;
        const lp = P(t, at('sign') + 0.05, 0.4, pop);
        const tilt = 30 * P(t, b[0], 0.4, pop) - 60 * P(t, b[1], 0.4, pop) + 30 * P(t, b[2], 0.4, ease) + 45 * P(t, b[3], 0.5, pop);
        const mood = t < b[1] ? 'happy' : t < b[2] ? 'sad' : t < b[3] ? 'deadpan' : 'happy';
        tr(lio, 250, 250, Math.max(0.01, 0.55 * lp));
        lio.set({ t, mood, look: 0.6, tilt });
      }
      if (part === 'cece' || part === 'name') {
        show.cece = 1;
        const enter = P(t, at('cece') - 0.1, 0.6, easeOut);
        const march = enter < 1 ? Math.abs(Math.sin(t * 10)) * 10 : 0;
        tr(cece, lerp(-160, 300, enter), 520 - march, 0.75);
        const twc = part === 'cece' ? mid('cece', 0.68) : 1e9;
        cece.set({ t, talk: scTalk(S, t, 'cece'), mood: part === 'name' ? (t > mid('name', 0.8) ? 'deadpan' : 'happy') : 'neutral', look: part === 'name' ? -0.6 : 0.7,
          tweet: t > twc && t < twc + 1.4 ? P(t, twc, 0.25, linear) : 0 });
        ltOn(t, 'cece', at('cece') + 0.3);
      }
      if (part === 'name') {
        show.lio = 1;
        const lp = P(t, at('name') - 0.05, 0.45, pop);
        tr(lio, 255, 230, Math.max(0.01, 0.6 * lp));
        lio.set({ t, talk: scTalk(S, t, 'lionel'), mood: t > mid('name', 0.82) ? 'smug' : 'happy', look: 0.6, tilt: 14 + 6 * Math.sin(t * 2) * AMP });
      }
      // two or three humans watching from the front
      show.kav = show.boy = 1;
      tr(kav, 720, WY, WS); tr(boy, 880, WY + 4, WS);
      kav.set({ t, mood: part === 'minus' ? 'happy' : 'neutral', look: -0.9 });
      boy.set({ t, mood: part === 'cece' && t > mid('cece', 0.68) ? 'shock' : 'happy', look: -0.9 });
      if (part === 'minus') {
        show.dad = 1; tr(dad, 1050, WY, WS);
        dad.set({ t, mood: t > mid('minus', 0.4) ? 'sad' : 'neutral', look: -0.9, lift: 0 });
      } else {
        show.priya = 1; tr(priya, 1040, WY, WS);
        priya.set({ t, mood: part === 'name' ? 'smug' : 'neutral', look: -0.9 });
      }
    }

    /* ---------- CONF: run = 0 ---------- */
    if (sC) {
      show.lio = 1;
      const sw = P(t, cC + 0.05, 0.7, ease), back = P(t, mid('zero', 0.78), 0.45, pop);
      const tilt = 90 * sw * (1 - back) + (sw > 0.5 ? Math.sin(t * 40) * 3 * (1 - back) * AMP : 0);
      const mood = back > 0.5 ? 'annoyed' : sw > 0.4 ? 'shock' : 'neutral';
      let ls = 1.15;
      if (t > end('zero')) ls = 1.15 + 0.06 * P(t, end('zero'), 0.7, ease);
      tr(lio, 330, 400, ls);
      lio.set({ t, talk: scTalk(S, t, 'lionel'), mood, look: back > 0.5 ? 0 : 0.5, tilt, sweat: back > 0.5 ? 0.4 : sw });
      const cp = P(t, at('zero') + 0.1, 0.45, pop);
      op(vertCard, clamp(cp * 2.5)); tr(vertCard, 870, 330, Math.max(0.01, 0.75 + 0.25 * cp));
      op(vX, P(t, mid('zero', 0.3), 0.25, linear)); op(vNo, P(t, mid('zero', 0.22), 0.3, linear));
      op(vDiv, P(t, mid('zero', 0.42), 0.3, linear));
    }

    op(mo, show.mo); op(cece, show.cece); op(priya, show.priya); op(kav, show.kav); op(boy, show.boy); op(dad, show.dad * dadOp); op(lio, show.lio);
  };
});
