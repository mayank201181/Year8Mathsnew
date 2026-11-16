/* Scene 1: Who gets the room? (perimeter and area of rectangles and triangles)
   Set: the living room mid-renovation (avFlat). A blueprint pinned on the wall at the left (avBlueprint 580 x 410)
   carries the maths; Madam Perpendicular stands on the workbench beside it and points at it; the humans stand
   behind the bench on the right; word chips go on the wall above them.
   A  (day..posters) the two room plans TO SCALE (1 m = 40 px): the corridor 9 m x 1 m and the store room 4 m x 4 m.
      Ah Boy walks round them (20 m, 16 m) -> perimeter / area chips -> A = l x w, the corridor fills with 9 unit
      squares -> "9 m" and Squared drops onto it (9 m²) -> 4 x 4 = 16 m², the table P / A -> posters on the corridor.
   B  (sign..rule) Dad's triangular door sign TO SCALE (1 cm = 22 px: base 16, slopes 10, height 6). Dad: h = 10?
      (biggest number) -> Madam P: the dashed perpendicular height 6 cm, the slope crossed -> the 16 x 6 box, the
      height splits it, each half halved by a slope (pairs shaded) -> A = ½ x 16 x 6 = 48 cm² -> the ribbon round the
      edge 36 cm -> the obtuse triangle with its height OUTSIDE.
   C  (priya, h) Priya (who replaces Dad behind the bench) holds up her sign: A = 42 cm², base 12 cm, h = ? -> the
      working 42 = ½ x 12 x h, 42 = 6h, h = 42 ÷ 6 = 7 cm (ringed). */
scene('rooms', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;
  const talk = (t, who) => scTalk(S, t, who);

  /* ---------- local helpers ---------- */
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 2, color: o.color || C.ink, weight: 700 }); };
  const fadeIn = (el, t, t0, d) => { const p = P(t, t0, d || 0.3, easeOut); op(el, p); tr(el, 0, 8 * (1 - p)); return p; };
  const GOLD = '#FFE45C', CYAN = AV_COL.area, ORANGE = AV_COL.volume, RED = AV_COL.height, GREEN = '#7CF0B0', PINK = '#FF8FC8';
  const BPX = 350, BPY = 310;                         // blueprint centre on the stage

  /* layers */
  const Lbg = G(root), Lbp = G(root), Lcast = G(root), Lfront = G(root), Lfg = G(root), Lhud = G(root);

  /* ---------- the set ---------- */
  const flat = avFlat(Lbg);
  Lfront.appendChild(flat.front); Lfront.appendChild(flat.top);
  const bp = avBlueprint(Lbp, 580, 410, { title: 'BALA RENO · ROOMS' }); tr(bp, BPX, BPY);
  const bc = bp.content;

  /* ================= A: the two rooms (1 m = 40 px) ================= */
  const p1 = G(bc);
  const RC = { x: -250, y: -150, w: 360, h: 40 }, RS = { x: -250, y: -30, w: 160, h: 160 };
  const sqC = [], sqS = [];
  for (let i = 0; i < 9; i++) sqC.push(E('rect', { x: RC.x + i * 40 + 2, y: RC.y + 2, width: 36, height: 36, rx: 3, fill: CYAN, opacity: 0.55 }, p1));
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) sqS.push(E('rect', { x: RS.x + c * 40 + 2, y: RS.y + r * 40 + 2, width: 36, height: 36, rx: 3, fill: CYAN, opacity: 0.55 }, p1));
  const gridC = E('path', { d: [1, 2, 3, 4, 5, 6, 7, 8].map(i => `M${RC.x + i * 40},${RC.y} L${RC.x + i * 40},${RC.y + RC.h}`).join(' '), stroke: '#FFFFFF', 'stroke-width': 1.5, opacity: 0.35 }, p1);
  const gridS = E('path', { d: [1, 2, 3].map(i => `M${RS.x + i * 40},${RS.y} L${RS.x + i * 40},${RS.y + RS.h} M${RS.x},${RS.y + i * 40} L${RS.x + RS.w},${RS.y + i * 40}`).join(' '), stroke: '#FFFFFF', 'stroke-width': 1.5, opacity: 0.35 }, p1);
  E('rect', { x: RC.x, y: RC.y, width: RC.w, height: RC.h, fill: 'rgba(255,255,255,0.05)', stroke: C.ink, 'stroke-width': 4 }, p1);
  E('rect', { x: RS.x, y: RS.y, width: RS.w, height: RS.h, fill: 'rgba(255,255,255,0.05)', stroke: C.ink, 'stroke-width': 4 }, p1);
  mkText(p1, RC.x, RC.y - 14, '**corridor**', { size: 28, fill: C.ink });
  mkText(p1, RS.x, RS.y - 14, '**store room**', { size: 28, fill: C.ink });
  mkMath(p1, RC.x + RC.w / 2, RC.y + RC.h + 32, '9 "m"', { size: 28, anchor: 'middle' });
  mkMath(p1, RC.x + RC.w + 12, RC.y + 30, '1 "m"', { size: 28 });
  mkMath(p1, RS.x + RS.w / 2, RS.y + RS.h + 32, '4 "m"', { size: 28, anchor: 'middle' });
  mkMath(p1, RS.x + RS.w + 12, RS.y + RS.h / 2 + 10, '4 "m"', { size: 28 });
  // posters on the corridor's long walls
  const PCOL = ['#FF6B5C', '#FFC247', '#56D69B', '#B48CFF', '#FF8FC8', '#4CC9F0', '#FF8A3D', '#FFE45C'];
  const posters = [[-120, -1], [-60, -1], [0, -1], [60, -1], [-235, 1], [-175, 1], [30, 1], [80, 1]].map(([x, sd], i) => {
    const g = G(p1);
    E('rect', { x: -13, y: -11, width: 26, height: 22, rx: 2, fill: PCOL[i], stroke: SC_INK, 'stroke-width': 2.5 }, g);
    E('path', { d: 'M-7,-3 L7,-3 M-7,4 L4,4', stroke: SC_INK, 'stroke-width': 2, opacity: 0.6 }, g);
    g.x = x + 13; g.y = sd < 0 ? RC.y : RC.y + RC.h;
    return g;
  });
  // Ah Boy's walks round the edges
  const rectPath = R => `M${R.x},${R.y} L${R.x + R.w},${R.y} L${R.x + R.w},${R.y + R.h} L${R.x},${R.y + R.h} Z`;
  const rectPt = (R, u) => {
    let d = clamp(u) * 2 * (R.w + R.h);
    if (d <= R.w) return [R.x + d, R.y]; d -= R.w;
    if (d <= R.h) return [R.x + R.w, R.y + d]; d -= R.h;
    if (d <= R.w) return [R.x + R.w - d, R.y + R.h]; d -= R.w;
    return [R.x, R.y + R.h - d];
  };
  const trC = mkDash(E('path', { d: rectPath(RC), fill: 'none', stroke: GOLD, 'stroke-width': 8, 'stroke-linejoin': 'round' }, p1));
  const trS = mkDash(E('path', { d: rectPath(RS), fill: 'none', stroke: GOLD, 'stroke-width': 8, 'stroke-linejoin': 'round' }, p1));
  const dot = G(p1);
  E('circle', { r: 13, fill: GOLD, stroke: SC_INK, 'stroke-width': 3 }, dot);
  E('path', { d: 'M-4,-3 l3,6 M3,-3 l3,6', stroke: SC_INK, 'stroke-width': 2.5, 'stroke-linecap': 'round' }, dot);   // footprints
  // right column (x from -10)
  const RX = -10;
  const rP1 = G(p1), rP1l = mkText(rP1, RX, -6, 'corridor:', { size: 30, fill: C.ink });
  const rP1n = T(rP1, RX + rP1l.w + 12, -6, '0 m', { size: 34, weight: 800, fill: GOLD });
  const rP2 = G(p1), rP2l = mkText(rP2, RX, 44, 'store room:', { size: 30, fill: C.ink });
  const rP2n = T(rP2, RX + rP2l.w + 12, 44, '0 m', { size: 34, weight: 800, fill: GOLD });
  const fLW = mkMath(p1, RX, -4, 'A = l * w', { size: 40 });
  const f91 = mkMath(p1, RX, 54, '9 * 1 = 9', { size: 40 });
  const dropG = G(p1);
  const drop9 = avUnitDrop(dropG, '9 "m"', '²', { size: 60, anchor: 'start' }); tr(drop9, RX, 132);
  const f16 = mkMath(p1, RX, -6, '4 * 4 = 16 "m"^2', { size: 38 });
  const tab = mkTable(p1, [['', '**P**', '**A**'], ['corridor', '{{20 "m"}}', '{{9 "m"^2}}'], ['store room', '{{16 "m"}}', '{{16 "m"^2}}']], { size: 26, colW: [128, 72, 82], rowH: 44 });
  tr(tab, RX - 6, 18);
  const tabRows = tab.cells;
  const markBig = tab.mark(2, 2, 'rgba(255,228,92,0.35)');

  /* ================= B: Dad's door sign (1 cm = 22 px) ================= */
  const p2 = G(bc);
  const TA = [-250, 10], TB = [102, 10], TC = [-74, -122], TH = [-74, 10];
  const p2title = mkText(p2, -250, -160, "door sign: **AH BOY'S ROOM**", { size: 28, fill: C.ink });
  // the 16 x 6 box and the four halves
  const box = E('rect', { x: TA[0], y: TC[1], width: TB[0] - TA[0], height: TA[1] - TC[1], fill: 'none', stroke: '#FFFFFF', 'stroke-width': 4, 'stroke-dasharray': '12 9' }, p2);
  const halves = [
    [[TA, TH, TC], CYAN, 0.55], [[TA, [TA[0], TC[1]], TC], CYAN, 0.32],
    [[TH, TB, TC], ORANGE, 0.55], [[TC, [TB[0], TC[1]], TB], ORANGE, 0.32],
  ].map(([pts, col, o]) => E('path', { d: mkPoly(pts), fill: col, opacity: o }, p2));
  const triFill = E('path', { d: mkPoly([TA, TB, TC]), fill: 'rgba(255,255,255,0.10)' }, p2);
  const triLine = mkDash(E('path', { d: `M${TA} L${TB} L${TC} Z`, fill: 'none', stroke: C.ink, 'stroke-width': 5, 'stroke-linejoin': 'round' }, p2));
  const ribbon = mkDash(E('path', { d: `M${TA} L${TB} L${TC} Z`, fill: 'none', stroke: PINK, 'stroke-width': 9, 'stroke-linejoin': 'round' }, p2));
  const slopeHi = E('line', { x1: TC[0], y1: TC[1], x2: TB[0], y2: TB[1], stroke: GOLD, 'stroke-width': 10, 'stroke-linecap': 'round' }, p2);
  const slopeX = cross(p2, 16, RED); tr(slopeX, 14, -56);
  const hLine = E('line', { x1: TC[0], y1: TC[1], x2: TH[0], y2: TH[1], stroke: GREEN, 'stroke-width': 5, 'stroke-dasharray': '12 9' }, p2);
  const hMark = mkAngleMark(p2, TH[0], TH[1], 0, 90, { r: 40, col: GREEN, width: 4 });
  const h6lab = mkMath(p2, TH[0] + 12, -42, '6 "cm"', { size: 28, fill: GREEN, halo: AV_COL.blueDk });
  const l16 = mkMath(p2, (TA[0] + TB[0]) / 2, TA[1] + 34, '16 cm', { size: 28, anchor: 'middle' });
  const l10a = mkMath(p2, -172, -68, '10 cm', { size: 28, anchor: 'end' });
  const l10b = mkMath(p2, 30, -68, '10 cm', { size: 28 });
  // right column (x from 128)
  const h10 = G(p2), h10m = mkMath(h10, 126, -62, 'h = 10 ?', { size: 32, fill: GOLD });
  const h10s = strike(h10, 118, -73, 132 + h10m.w, RED);
  const h6 = G(p2); const h6m = mkMath(h6, 126, -10, 'h = 6 "cm"', { size: 32, fill: GREEN });
  const h6t = tick(h6, 11, GREEN); tr(h6t, 126 + h6m.w + 16, -20);
  const halfT = mkText(p2, 124, -66, '**half** the\nrectangle', { size: 30, fill: C.ink, boldFill: GOLD });
  // obtuse triangle: height outside
  const obt = G(p2);
  { const O1 = [172, 10], O2 = [262, 10], OA = [136, -76], OF = [136, 10];
    E('line', { x1: OF[0], y1: OF[1], x2: O1[0], y2: O1[1], stroke: C.ink, 'stroke-width': 3, 'stroke-dasharray': '6 6' }, obt);
    E('path', { d: mkPoly([O1, O2, OA]), fill: 'rgba(255,143,200,0.25)', stroke: C.ink, 'stroke-width': 4, 'stroke-linejoin': 'round' }, obt);
    E('line', { x1: OA[0], y1: OA[1], x2: OF[0], y2: OF[1], stroke: GREEN, 'stroke-width': 4, 'stroke-dasharray': '9 7' }, obt);
    mkAngleMark(obt, OF[0], OF[1], 0, 90, { r: 28, col: GREEN, width: 3 }).set(1);
    mkMath(obt, 124, -24, 'h', { size: 30, fill: GREEN, anchor: 'end' });
    mkText(obt, 200, 44, '**outside**', { size: 26, fill: GREEN, anchor: 'middle' }); }
  // the working
  const fAbh = mkMath(p2, -250, 92, 'A = 1/2 * b * h', { size: 38 });
  const fC1 = mkMath(p2, -250, 92, 'A = 1/2 * 16 * 6 =', { size: 38 });
  const fC2 = mkMath(p2, -250 + fC1.w + 12, 92, '48 cm^2', { size: 38, fill: GOLD });
  const ringC = E('rect', { x: fC2.x0 - 8, y: 92 - fC2.a - 6, width: fC2.w + 16, height: fC2.a + fC2.d + 12, rx: 8, fill: 'none', stroke: C.good, 'stroke-width': 4 }, p2);
  const fHalf = mkText(p2, -250, 142, 'half of {{16 * 6 = 96}}', { size: 28, fill: C.ink });
  const fRib = mkMath(p2, -250, 144, 'P = 16 + 10 + 10 = 36 cm', { size: 32, fill: PINK });

  /* ================= C: Priya's sign (1 cm = 18 px) ================= */
  const p3 = G(bc);
  const QA = [-262, 40], QB = [-46, 40], QC = [-190, -86], QH = [-190, 40];
  mkText(p3, -262, -150, "Priya's sign: {{A = 42 cm^2}}", { size: 30, fill: C.ink, boldFill: GOLD });
  E('path', { d: mkPoly([QA, QB, QC]), fill: 'rgba(76,201,240,0.3)', stroke: C.ink, 'stroke-width': 5, 'stroke-linejoin': 'round' }, p3);
  E('line', { x1: QC[0], y1: QC[1], x2: QH[0], y2: QH[1], stroke: GREEN, 'stroke-width': 4, 'stroke-dasharray': '10 8' }, p3);
  mkAngleMark(p3, QH[0], QH[1], 0, 90, { r: 34, col: GREEN, width: 4 }).set(1);
  mkMath(p3, (QA[0] + QB[0]) / 2, QA[1] + 34, '12 cm', { size: 28, anchor: 'middle' });
  const qh = mkMath(p3, QH[0] + 10, -6, 'h = ?', { size: 28, fill: GREEN, halo: '#24508A' });
  const qWork = mkWorking(p3, 30, -92, ['42 = 1/2 * 12 * h', '42 = 6h', 'h = 42 ÷ 6 = 7 cm'], { size: 32, gap: 22 });

  /* ---------- chips on the wall ---------- */
  const CHX = 925;
  const cDay = pill(Lfg, 'Day 1', { size: 32, color: GOLD, stroke: GOLD });
  const cPer = mkChip(Lfg, '**perimeter**: the distance round the edge', { size: 27, col: GOLD });
  const cArea = mkChip(Lfg, '**area**: the floor it covers', { size: 27, col: CYAN });
  const cMine = mkChip(Lfg, '**smaller** perimeter, **bigger** area', { size: 28, col: GOLD });
  const c10 = pill(Lfg, '10 a.m.', { size: 32, color: GOLD, stroke: GOLD });
  const cRule = mkChip(Lfg, '**sloping sides**: perimeter **yes**, area **no**', { size: 28, col: PINK });
  const star = G(Lfg);
  const starChip = pill(star, 'BIGGEST NUMBER', { size: 26, color: GOLD, stroke: GOLD });
  const starIcon = G(star);
  E('path', { d: 'M0,-22 L6,-7 L22,-7 L9,3 L14,19 L0,9 L-14,19 L-9,3 L-22,-7 L-6,-7 Z', fill: GOLD, stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, starIcon);
  tr(starChip, 0, 0);

  /* ---------- the cast ---------- */
  const kav = cast(Lcast, 'kavya');
  const boy = cast(Lcast, 'boy');
  const dad = cast(Lcast, 'dad', { prop: null });
  const priya = cast(Lcast, 'priya', { prop: null, hand: true, side: 'right' });
  const card = G(priya.hand);   // Priya's own door sign, held up
  tr(card, -40, -76, 1, -14);
  E('rect', { x: -78, y: -64, width: 156, height: 118, rx: 10, fill: '#FFFDF6', stroke: SC_INK, 'stroke-width': 4 }, card);
  E('path', { d: 'M-60,6 L60,6 L-20,-50 Z', fill: '#FFC247', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, card);
  mkMath(card, 0, 44, '42 cm^2', { size: 34, fill: MK.ink, anchor: 'middle' });
  const perp = cast(Lfront, 'perp');
  const sq = cast(Lfg, 'sq', { s: 0.42 });
  const lt = { boy: avLowerThird(Lhud, 'boy'), sq: avLowerThird(Lhud, 'sq'), priya: avLowerThird(Lhud, 'priya') };
  const ltOn = (t, who, t0) => lt[who].set(win(t, t0, t0 + 3.1, 0.3));

  const cB = at('sign') - 0.06;
  const PERP = [712, 518 - 140 * 0.62, 0.62];

  return t => {
    flat.upd(t); flat.open(0);
    const sA = t < cB, sB = !sA;
    const who = scWho(S, t);
    for (const k in lt) lt[k].set(0);
    [cDay, cPer, cArea, cMine, c10, cRule, star].forEach(e => op(e, 0));
    op(p1, sA ? 1 : 0); op(p2, sB && t < at('priya') ? 1 : 0); op(p3, t >= at('priya') ? 1 : 0);
    op(sq, 0); op(dad, 0); op(priya, 0);

    // Madam Perpendicular on the bench, by the blueprint
    tr(perp, PERP[0], PERP[1], PERP[2]);
    let pm = 'deadpan', pPoint = 0, pChk = 0;
    if (who === 'perp') pPoint = 1;
    if (t >= at('no') && t < end('no')) { pm = t > mid('no', 0.75) ? 'smug' : 'annoyed'; pChk = t > mid('no', 0.42) && t < mid('no', 0.8) ? 1 : 0; }
    else if (t >= at('half') && t < at('calc')) pm = t > mid('half', 0.6) ? 'smug' : 'deadpan';
    else if (t >= at('rect') && t < at('nine')) pm = 'smug';
    else if (t >= at('dad') && t < at('no')) pm = t > mid('dad', 0.5) ? 'annoyed' : 'deadpan';
    else if (t >= at('rule') && t < at('priya')) { pm = t > mid('rule', 0.5) ? 'smug' : 'deadpan'; }
    else if (t >= at('calc')) pm = 'smug';
    perp.set({ t, talk: talk(t, 'perp'), mood: pm, look: who === 'perp' ? -0.6 : who && who !== 'narr' ? 0.8 : -0.6, point: pPoint, check: pChk });

    if (sA) {
      /* ================= A: the rooms ================= */
      // Kavya and Ah Boy behind the bench
      tr(kav, 840, 444, 0.92);
      const kLook = who === 'boy' || who === 'sq' ? 0.8 : who === 'perp' ? -0.9 : -0.7;
      let km = 'neutral';
      if (t >= at('boy') && t < at('perim')) km = 'annoyed';
      else if (t >= at('perim') && t < at('rect')) km = 'smug';
      else if (t >= at('nine') && t < at('sq')) km = 'deadpan';
      else if (t >= at('sq') && t < at('mine')) km = 'happy';
      else if (t >= at('mine') && t < at('posters')) km = 'smug';
      else if (t >= at('posters')) km = 'deadpan';
      kav.set({ t, talk: talk(t, 'kavya'), mood: km, look: kLook });
      tr(boy, 1030, 452, 0.95);
      let bm = 'happy', bLift = 0;
      if (t >= at('perim') && t < at('nine')) bm = 'neutral';
      if ((t >= at('boy') && t < end('boy')) || (t >= at('nine') && t < end('nine')) || (t >= at('posters'))) bLift = 1;
      if (t >= at('mine') && t < at('posters')) bm = 'shock';
      boy.set({ t, talk: talk(t, 'boy'), mood: bm, look: who === 'kavya' ? -0.8 : who === 'sq' ? -1 : -0.9, lift: bLift });
      lt.boy.set(win(t, at('boy') + 0.1, at('boy') + 3.2, 0.3)); tr(lt.boy, 50, 600);

      // day: the plans, chip
      popIn(cDay, t, at('day') + 0.1, 760, 150); if (t > end('day') + 0.2) op(cDay, 0);
      op(bp, 1);
      const fadeP = P(t, at('day') + 0.3, 0.6, linear);
      op(p1, fadeP);
      // boy: walk round the corridor, then the store room
      const u1 = P(t, mid('boy', 0.12), mid('boy', 0.5) - mid('boy', 0.12), linear), u2 = P(t, mid('boy', 0.66), mid('boy', 0.92) - mid('boy', 0.66), linear);
      const trOp = t < at('rect') ? 1 : 1 - P(t, at('rect'), 0.3, linear);
      mkDraw(trC, u1); mkDraw(trS, u2); op(trC, trOp); op(trS, trOp);
      const walking = t > mid('boy', 0.1) && t < mid('boy', 0.95);
      op(dot, walking ? 1 : 0);
      if (walking) { const q = t < mid('boy', 0.6) ? rectPt(RC, u1) : rectPt(RS, u2); tr(dot, q[0], q[1]); }
      setText(rP1n, Math.round(20 * u1) + ' m'); setText(rP2n, Math.round(16 * u2) + ' m');
      const pOff = 1 - P(t, at('rect'), 0.25, linear);
      op(rP1, P(t, mid('boy', 0.12), 0.3, linear) * pOff); op(rP2, P(t, mid('boy', 0.64), 0.3, linear) * pOff);
      // perim: chips; the store room fills with unit squares
      if (t >= at('perim') && t < at('mine')) {
        popIn(cPer, t, mid('perim', 0.05), CHX, 160);
        if (t > mid('perim', 0.5)) popIn(cArea, t, mid('perim', 0.52), CHX, 232);
      }
      const kS = 16 * P(t, mid('perim', 0.58), 1.4, linear);
      sqS.forEach((e, i) => op(e, 0.55 * clamp(kS - i)));
      op(gridS, clamp(kS));
      // rect: A = l x w, the corridor fills
      const rOff = 1 - P(t, at('mine'), 0.25, linear);
      op(fLW, P(t, mid('rect', 0.12), 0.3, linear) * rOff);
      const kC = 9 * P(t, mid('rect', 0.45), 1.1, linear);
      sqC.forEach((e, i) => op(e, 0.55 * clamp(kC - i)));
      op(gridC, clamp(kC));
      op(f91, P(t, mid('rect', 0.75), 0.3, linear) * rOff);
      // nine, sq: "9 m", then the ² drops on
      op(dropG, P(t, mid('nine', 0.25), 0.25, linear) * rOff);
      drop9.set(P(t, at('sq') + 0.15, 1.0, linear));
      if (t >= at('sq') - 0.1 && t < at('mine') + 0.25) {
        const sp = P(t, at('sq') + 0.55, 0.45, pop);
        op(sq, clamp(sp * 3) * rOff);
        const bob = Math.abs(Math.sin((t - at('sq')) * 5)) * 16 * AMP * (t < end('sq') ? 1 : 0.3);
        tr(sq, BPX + 205, BPY + 96 - bob, Math.max(0.01, 0.42 * (0.6 + 0.4 * sp)));
        sq.set({ t, talk: talk(t, 'sq'), mood: 'happy', look: -0.8, wave: t < end('sq') ? 1 : 0.3 });
        tr(lt.sq, 50, 600); ltOn(t, 'sq', at('sq') + 0.5);
      }
      // mine: 4 x 4 = 16 m², the table
      op(f16, P(t, mid('mine', 0.08), 0.3, linear));
      const tp = P(t, mid('mine', 0.35), 0.3, linear);
      op(tab, tp);
      tabRows[1].forEach(c => op(c, P(t, mid('mine', 0.42), 0.3, linear)));
      tabRows[2].forEach(c => op(c, P(t, mid('mine', 0.55), 0.3, linear)));
      markBig.set(P(t, mid('mine', 0.78), 0.3, linear));
      if (t >= mid('mine', 0.6)) popIn(cMine, t, mid('mine', 0.62), CHX, 160);
      // posters
      posters.forEach((g, i) => { const pp = P(t, mid('posters', 0.15) + i * 0.12, 0.35, pop); op(g, clamp(pp * 3)); tr(g, g.x, g.y, Math.max(0.01, pp), (i % 2 ? 6 : -5) * pp); });
    } else {
      /* ================= B, C: the door sign ================= */
      const prOn = t >= at('priya') - 0.3;
      tr(kav, 790, 444, 0.9);
      tr(boy, 930, 452, 0.9);
      let km = 'neutral';
      if (t >= at('dad') && t < at('no')) km = 'deadpan';
      else if (t >= at('no') && t < at('half')) km = 'smug';
      else if (t >= at('calc') && t < at('ribbon')) km = 'happy';
      else if (t >= at('priya') && t < at('h')) km = 'annoyed';
      else if (t >= at('h')) km = t > mid('h', 0.85) ? 'smug' : 'neutral';
      const kLook = who === 'dad' || who === 'priya' || who === 'boy' ? 0.8 : -0.7;
      kav.set({ t, talk: talk(t, 'kavya'), mood: km, look: kLook });
      let bm = 'happy';
      if (t >= at('no') && t < at('half')) bm = 'shock';
      boy.set({ t, talk: talk(t, 'boy'), mood: bm, look: who === 'dad' || who === 'priya' ? 0.8 : who === 'kavya' ? -0.8 : -0.9, lift: t >= at('ribbon') && t < end('ribbon') ? 1 : 0 });
      // Dad, then Priya, on the right
      if (!prOn) {
        op(dad, 1);
        tr(dad, 1100, 444, 0.92);
        let dm = 'neutral';
        if (t >= at('sign') && t < at('dad')) dm = 'happy';
        else if (t >= at('dad') && t < at('no')) dm = 'smug';
        else if (t >= at('no') && t < at('half')) dm = t > mid('no', 0.5) ? 'sad' : 'shock';
        else if (t >= at('half')) dm = 'deadpan';
        dad.set({ t, talk: talk(t, 'dad'), mood: dm, look: who === 'dad' ? -0.7 : who === 'kavya' || who === 'boy' ? -0.8 : -1 });
      } else {
        op(priya, 1);
        const up = P(t, at('priya') - 0.3, 0.4, easeOut);
        tr(priya, 1060, lerp(640, 446, up), 0.92);
        priya.set({ t, talk: talk(t, 'priya'), mood: t >= at('h') ? (t > mid('h', 0.85) ? 'annoyed' : 'neutral') : 'smug', look: who === 'kavya' ? -0.8 : -0.5, lift: 1 });
        tr(lt.priya, 50, 600); ltOn(t, 'priya', at('priya') + 0.1);
      }

      // sign: 10 a.m., the triangle draws, base and slopes
      if (t < at('dad')) popIn(c10, t, at('sign') + 0.1, 760, 150);
      const dr = P(t, mid('sign', 0.28), 1.0, ease);
      mkDraw(triLine, dr); op(triFill, dr); op(p2title, P(t, mid('sign', 0.15), 0.3, linear));
      op(l16, P(t, mid('sign', 0.58), 0.3, linear));
      op(l10a, P(t, mid('sign', 0.78), 0.3, linear)); op(l10b, P(t, mid('sign', 0.82), 0.3, linear));
      // dad: the formula, h = 10?, the slope highlighted, biggest number
      const aOff = 1 - P(t, at('calc'), 0.2, linear);
      op(fAbh, P(t, mid('dad', 0.08), 0.3, linear) * aOff);
      const hiP = P(t, mid('dad', 0.42), 0.3, linear) * (1 - P(t, at('half'), 0.3, linear));
      op(slopeHi, hiP); attr(slopeHi, 'stroke', t > mid('no', 0.15) ? RED : GOLD);
      op(slopeX, P(t, mid('no', 0.22), 0.25, linear) * (1 - P(t, at('half'), 0.3, linear)));
      op(h10, P(t, mid('dad', 0.48), 0.3, linear) * (1 - P(t, at('half'), 0.25, linear)));
      h10s.set(P(t, mid('no', 0.2), 0.3, linear));
      if (t >= mid('dad', 0.72) && t < at('half')) {
        const sp = P(t, mid('dad', 0.72), 0.45, pop);
        op(star, clamp(sp * 2.5)); tr(star, 1000, 262, Math.max(0.01, 0.6 + 0.4 * sp));
        const fall = P(t, mid('no', 0.3), 0.8, easeIn);
        tr(starIcon, 130 + 30 * fall, -24 + 420 * fall, 1, t * 40 * AMP + 200 * fall);
      }
      // no: the dashed perpendicular height, 90°, 6 cm
      const hp = P(t, mid('no', 0.45), 0.5, easeOut);
      op(hLine, hp); attr(hLine, 'y2', lerp(TC[1], TH[1], hp));
      hMark.set(P(t, mid('no', 0.6), 0.3, linear));
      op(h6lab, P(t, mid('no', 0.8), 0.3, linear));
      op(h6, P(t, mid('no', 0.82), 0.3, linear) * (1 - P(t, at('half'), 0.25, linear)));
      // half: the box, the halves in pairs
      op(box, P(t, mid('half', 0.25), 0.3, linear) * (1 - P(t, at('ribbon'), 0.3, linear)));
      const shL = P(t, mid('half', 0.55), 0.35, linear), shR = P(t, mid('half', 0.7), 0.35, linear), shOff = 1 - P(t, at('ribbon'), 0.3, linear);
      op(halves[0], shL * shOff); op(halves[1], shL * shOff); op(halves[2], shR * shOff); op(halves[3], shR * shOff);
      op(halfT, P(t, mid('half', 0.82), 0.3, linear) * (1 - P(t, at('rule'), 0.25, linear)));
      // calc: A = ½ x 16 x 6 = 48 cm², half of 96
      const cp = P(t, at('calc') + 0.05, 0.3, linear);
      op(fC1, cp); op(fC2, P(t, mid('calc', 0.62), 0.3, linear)); op(ringC, P(t, mid('calc', 0.85), 0.25, linear));
      op(fHalf, P(t, mid('calc', 0.4), 0.3, linear) * (1 - P(t, at('ribbon'), 0.25, linear)));
      // ribbon: round the edge
      const rp = P(t, mid('ribbon', 0.1), mid('ribbon', 0.55) - mid('ribbon', 0.1), linear);
      mkDraw(ribbon, rp); op(ribbon, t >= at('ribbon') ? 1 : 0);
      op(fRib, P(t, mid('ribbon', 0.5), 0.3, linear));
      // rule: chip, the obtuse triangle
      if (t >= at('rule') && t < at('priya')) popIn(cRule, t, at('rule') + 0.1, CHX, 160);
      op(obt, P(t, mid('rule', 0.55), 0.35, linear));
      // C: Priya's sign
      op(qh, P(t, mid('priya', 0.75), 0.3, linear));
      fadeIn(p3, t, at('priya') + 0.05);
      [0.12, 0.42, 0.7].forEach((f, i) => qWork.show(i, P(t, mid('h', f), 0.35, linear)));
      qWork.ring(2, P(t, mid('h', 0.9), 0.25, linear));
    }
  };
});
