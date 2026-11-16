/* Scene 1: The giant circle (parts of a circle).
   9 a.m., the school field: Mr Tan's DRAW A GIANT CIRCLE stall -> one peg, one rope, one Priya: she runs, the rope
   draws a chalk circle -> close-up: "Fastest circle in Year 8" -> the rope stands up: it is Rad, the radius, his
   centre end on the peg -> the whiteboard: Rad sweeps round leaving 8 equal radii, all r -> Dee the diameter lies
   across through the centre; Rad lies along one half: d = 2r -> Priya's 13 cm line in a 6 cm circle pokes out ->
   chord; the longest chord is Dee: 2 x 6 = 12 cm, 13 > 12, HALF-BAKED -> Perry walks the circumference, then part
   of it: an arc -> Tan Gent touches once, at 90 degrees to the radius -> "No relation." -> Mum's pizza slice: a
   sector -> Mum's cake, one straight cut: a segment -> seCtor reaches the Centre -> minor / major: Ah Boy takes the
   major piece. */
scene('parts', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);          // hard sitcom cut
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 3, color: o.color || C.ink, weight: 700 }); };
  const GOLD = '#FFE45C', INK = MK.ink, BLUE = '#2E7DD8', ORANGE = '#E8751A', RED = '#D32F2F', GREEN = '#1E9E5A', BERRY = '#B8336A', TEAL = '#1E7A5A';
  const fade = (el, t, a, b, f) => op(el, t >= a - 0.01 && t < b ? Math.min(P(t, a, f || 0.25, linear), 1 - P(t, b - 0.15, 0.15, linear)) : 0);
  const R = 150, CX = 880, CY = 400;                          // the circle on the whiteboard
  const pt = (a, r) => [Math.cos(a * Math.PI / 180) * (r === undefined ? R : r), Math.sin(a * Math.PI / 180) * (r === undefined ? R : r)];
  // a hedge-and-bench strip along the bottom (busts stand behind it)
  function hedge(parent) {
    const g = G(parent);
    let d = 'M0,750 L0,640 ';
    for (let x = 0; x <= 1200; x += 60) d += `Q${x + 30},${606 + (x / 60 % 2) * 8} ${x + 60},640 `;
    d += 'L1200,750 Z';
    E('path', { d, fill: linGrad('#3E9A4A', '#2A6E34', true), stroke: '#24602E', 'stroke-width': 4 }, g);
    const r = rng(16);
    let dots = '';
    for (let i = 0; i < 46; i++) { const x = r() * 1200, y = 650 + r() * 90; dots += `M${x.toFixed(0)},${y.toFixed(0)} a7,5 0 1 0 14,0 a7,5 0 1 0 -14,0 `; }
    E('path', { d: dots, fill: '#57B862', opacity: 0.55 }, g);
    return g;
  }

  /* layers */
  const Lbg = G(root), Lset = G(root), Lboard = G(root), Lcast = G(root), Lhedge = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= the field ================= */
  const field = ciField(Lbg);
  // the giant circle is drawn on the grass, so cover the track in this scene
  E('rect', { x: 0, y: 440, width: 1200, height: 310, fill: linGrad('#5DBB63', '#3E9A4A', true) }, Lbg);
  E('path', { d: 'M0,440 L1200,440', stroke: '#4FAE58', 'stroke-width': 4 }, Lbg);
  hedge(Lhedge);

  /* ---------- A: the giant circle ---------- */
  const PX = 575, PY = 535, ERX = 290, ERY = 88;
  const setA = G(Lset);
  const chalk = mkDash(E('path', { d: `M${PX + ERX},${PY} A${ERX},${ERY} 0 1 0 ${PX - ERX},${PY} A${ERX},${ERY} 0 1 0 ${PX + ERX},${PY}`, fill: 'none', stroke: '#FFFFFF', 'stroke-width': 7, 'stroke-linecap': 'round', opacity: 0.92 }, setA));
  const ropeOut = E('line', { x1: PX, y1: PY, x2: PX, y2: PY, stroke: SC_INK, 'stroke-width': 15, 'stroke-linecap': 'round' }, setA);
  const ropeIn = E('line', { x1: PX, y1: PY, x2: PX, y2: PY, stroke: '#FFB347', 'stroke-width': 9, 'stroke-linecap': 'round' }, setA);
  const ropeEnd = E('circle', { r: 7, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 2.5 }, setA);
  const peg = G(setA); tr(peg, PX, PY);
  E('path', { d: 'M-7,-40 L7,-40 L4,6 L-4,6 Z', fill: '#9C6B3E', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, peg);
  E('rect', { x: -10, y: -48, width: 20, height: 10, rx: 3, fill: '#6B4423', stroke: SC_INK, 'stroke-width': 3 }, peg);
  E('circle', { cx: 0, cy: 0, r: 9, fill: '#1E2A5A', stroke: '#FFFFFF', 'stroke-width': 2.5 }, peg);
  // the A-frame sign
  const sign = G(setA); tr(sign, 1076, 372);
  E('path', { d: 'M-90,40 L-104,96 M90,40 L104,96', stroke: '#8A5A2E', 'stroke-width': 8, 'stroke-linecap': 'round' }, sign);
  E('rect', { x: -112, y: -64, width: 224, height: 110, rx: 10, fill: '#FFFDF6', stroke: SC_INK, 'stroke-width': 4 }, sign);
  E('rect', { x: -112, y: -64, width: 224, height: 14, rx: 6, fill: '#2E5AAC' }, sign);
  T(sign, 0, -14, 'DRAW A', { size: 30, weight: 800, anchor: 'middle', fill: '#2E5AAC' });
  T(sign, 0, 26, 'GIANT CIRCLE', { size: 28, weight: 800, anchor: 'middle', fill: '#C62828' });
  const cNine = pill(Lhud, '9 a.m.', { size: 34, color: GOLD, stroke: GOLD });
  const cFast = mkChip(Lhud, '**Fastest circle** in Year 8', { size: 32, col: GOLD, solid: true });
  const blur = G(setA);   // speed lines behind running Priya
  const blurL = [0, 1, 2].map(i => E('line', { x1: 0, y1: 0, x2: 0, y2: 0, stroke: '#FFFFFF', 'stroke-width': 5, 'stroke-linecap': 'round', opacity: 0.8 - i * 0.2 }, blur));

  /* ---------- B: the whiteboard ---------- */
  const boardG = G(Lboard);
  const wb = mkWhiteboard(boardG, 540, 500, { stand: true }); tr(wb, CX, 375);
  const D = G(boardG); tr(D, CX, CY);
  // part shadings sit under the circle line
  const secA0 = -140, secA1 = -80, segA0 = 35, segA1 = 145;
  const sector = G(D);
  E('path', { d: 'M0,0 L' + mkArcD(0, 0, R, secA0, secA1).slice(1) + ' Z', fill: '#FFC247', opacity: 0.7, stroke: ORANGE, 'stroke-width': 4, 'stroke-linejoin': 'round' }, sector);
  const sp = pt(-110, R + 26); mkText(sector, sp[0] - 6, sp[1] - 4, 'sector', { size: 28, anchor: 'end', fill: ORANGE, weight: 800 });
  const segment = G(D);
  const sa = pt(segA0), sb = pt(segA1);
  E('path', { d: `M${sa[0].toFixed(1)},${sa[1].toFixed(1)} A${R},${R} 0 0 1 ${sb[0].toFixed(1)},${sb[1].toFixed(1)} Z`, fill: '#B48CFF', opacity: 0.6, stroke: '#6B3FC0', 'stroke-width': 4 }, segment);
  const segLab = mkText(segment, 0, 124, 'segment', { size: 28, anchor: 'middle', fill: '#4A2590', weight: 800 });
  E('circle', { r: R, fill: 'rgba(76,201,240,0.10)', stroke: BLUE, 'stroke-width': 5 }, D);
  // 8 equal radii, all r
  const radii = [], rLabs = [];
  for (let k = 0; k < 8; k++) {
    const a = -67.5 + 45 * k, p = pt(a), q = pt(a, R * 0.6), n = pt(a + 90, 20);
    radii.push(E('line', { x1: 0, y1: 0, x2: p[0].toFixed(1), y2: p[1].toFixed(1), stroke: ORANGE, 'stroke-width': 5, 'stroke-linecap': 'round' }, D));
    rLabs.push(mkMath(D, q[0] + n[0], q[1] + n[1] + 10, 'r', { size: 30, anchor: 'middle', fill: ORANGE, weight: 700 }));
  }
  // d = 2r: the ghost of a second Rad on the left half, labels
  const ghost = E('rect', { x: -R, y: -82, width: R, height: 54, rx: 27, fill: 'rgba(255,179,71,0.25)', stroke: ORANGE, 'stroke-width': 4, 'stroke-dasharray': '12 8' }, D);
  const lR1 = mkMath(D, -R / 2, -96, 'r', { size: 34, anchor: 'middle', fill: ORANGE, weight: 700 });
  const lR2 = mkMath(D, R / 2, -96, 'r', { size: 34, anchor: 'middle', fill: ORANGE, weight: 700 });
  const lD = mkMath(D, 0, 70, 'd', { size: 34, anchor: 'middle', fill: BLUE, weight: 700 });
  // Priya's 13 cm line, the 6 cm radius
  const r6a = -125, r6p = pt(r6a);
  const r6 = G(D);
  E('line', { x1: 0, y1: 0, x2: r6p[0], y2: r6p[1], stroke: ORANGE, 'stroke-width': 5, 'stroke-linecap': 'round' }, r6);
  mkText(r6, r6p[0] * 0.5 + 18, r6p[1] * 0.5 + 4, '6 cm', { size: 28, anchor: 'start', fill: ORANGE, weight: 800 });
  const PYL = 95, px0 = -Math.sqrt(R * R - PYL * PYL), px1 = px0 + 2 * R * 13 / 12;
  const priLine = G(D);
  E('line', { x1: px0, y1: PYL, x2: px1, y2: PYL, stroke: RED, 'stroke-width': 6, 'stroke-linecap': 'round' }, priLine);
  E('circle', { cx: px0, cy: PYL, r: 6, fill: RED }, priLine); E('circle', { cx: px1, cy: PYL, r: 6, fill: RED }, priLine);
  mkText(priLine, -60, PYL - 14, '13 cm', { size: 28, anchor: 'middle', fill: RED, weight: 800 });
  const outBit = E('line', { x1: Math.sqrt(R * R - PYL * PYL), y1: PYL, x2: px1, y2: PYL, stroke: '#FF8A8A', 'stroke-width': 16, 'stroke-linecap': 'round', opacity: 0.6 }, priLine);
  const xOut = cross(priLine, 16, RED); tr(xOut, px1 + 4, PYL - 34);
  // a chord
  const ca = pt(-160), cb = pt(-25);
  const chordG = G(D);
  E('line', { x1: ca[0], y1: ca[1], x2: cb[0], y2: cb[1], stroke: '#6B3FC0', 'stroke-width': 6, 'stroke-linecap': 'round' }, chordG);
  [ca, cb].forEach(p => E('circle', { cx: p[0], cy: p[1], r: 7, fill: '#6B3FC0' }, chordG));
  mkText(chordG, (ca[0] + cb[0]) / 2 + 10, (ca[1] + cb[1]) / 2 - 16, 'chord', { size: 28, anchor: 'middle', fill: '#6B3FC0', weight: 800 });
  // circumference walked by Perry, then an arc
  const circP = mkDash(E('path', { d: mkArcD(0, 0, R, -90, 90).replace(/^M/, 'M') + ' ' + mkArcD(0, 0, R, 90, 269.9).replace(/^M[^A]*/, ''), fill: 'none', stroke: '#FFC247', 'stroke-width': 11, 'stroke-linecap': 'round' }, D));
  const ARC0 = -90, ARC1 = -10;
  const arcP = mkDash(E('path', { d: mkArcD(0, 0, R, ARC0, ARC1), fill: 'none', stroke: RED, 'stroke-width': 12, 'stroke-linecap': 'round' }, D));
  const arcLab = G(D); { const m = pt((ARC0 + ARC1) / 2, R + 30); mkText(arcLab, m[0] + 4, m[1] - 2, 'arc', { size: 30, anchor: 'start', fill: RED, weight: 800 }); }
  // the tangent: touches at one point, 90 degrees to the radius
  const TA = 0, tp = pt(TA), tdx = Math.sin(TA * Math.PI / 180), tdy = -Math.cos(TA * Math.PI / 180);
  const tanG = G(D);
  E('line', { x1: tp[0] - tdx * 130, y1: tp[1] - tdy * 130, x2: tp[0] + tdx * 160, y2: tp[1] + tdy * 160, stroke: TEAL, 'stroke-width': 4, 'stroke-dasharray': '12 8' }, tanG);
  E('line', { x1: 0, y1: 0, x2: tp[0], y2: tp[1], stroke: ORANGE, 'stroke-width': 5, 'stroke-linecap': 'round' }, tanG);
  const right = mkAngleMark(tanG, tp[0], tp[1], 90, 180, { r: 34, col: RED, width: 4, label: '90°', size: 28, lr: 70 });
  E('circle', { cx: tp[0], cy: tp[1], r: 8, fill: TEAL, stroke: '#FFFFFF', 'stroke-width': 2 }, tanG);
  // the centre
  const cGlow = E('circle', { r: 22, fill: 'none', stroke: '#FFC247', 'stroke-width': 7 }, D);
  E('circle', { r: 7, fill: INK }, D);
  // board text rows (top row y 178, bottom row y 603)
  const TOPY = 180, BOTY = 603;
  const row = (str, y, o) => mkText(boardG, CX, y, str, Object.assign({ size: 32, anchor: 'middle', fill: INK, boldFill: BERRY }, o || {}));
  const tSame = row('**same distance** from the **centre**', TOPY);
  const bSame = row('that distance is the **radius**, {{r}}', BOTY, { boldFill: ORANGE });
  const tDee = row('**diameter**: edge to edge', TOPY, { size: 34, boldFill: BLUE });
  const tDee2 = row('through the **centre**', TOPY + 40, { size: 30, boldFill: BLUE });
  const bDee = mkMath(boardG, CX, BOTY + 6, 'd = 2r', { size: 50, anchor: 'middle', fill: BLUE, weight: 700 });
  const tChord = row('{{r = 6}} cm … a line {{13}} cm long?', TOPY, { fill: RED });
  const tChord2 = row('**chord**: joins two points on the circle', TOPY, { boldFill: '#6B3FC0' });
  const tImp = row('{{13 > 12}}: **impossible!**', TOPY, { size: 34, fill: RED, boldFill: RED });
  const bNope = row('longest chord = {{2 × 6 = 12}} cm', BOTY, { size: 32 });
  const tCirc = row('**circumference**: all the way **round**', TOPY, { boldFill: '#C27C00' });
  const tArc = row('part of the way round: an **arc**', TOPY, { boldFill: RED });
  const tTan = row('**tangent**: touches at **one** point', TOPY, { boldFill: TEAL });
  const bTan = row('at {{90°}} to the radius', BOTY, { size: 32, fill: RED });
  const tSec = row('**sector**: two radii + an arc', TOPY, { boldFill: ORANGE });
  const tSeg = row('**segment**: a chord + an arc', TOPY, { boldFill: '#6B3FC0' });
  const tMn = row('se**C**tor reaches the **C**entre', TOPY, { size: 38, boldFill: RED });
  const bMn = row('a segment **never** does', BOTY, { size: 32, boldFill: RED });
  const tMaj = row('small piece **minor**, big piece **major**', TOPY, { size: 30, boldFill: '#6B3FC0' });

  /* ---------- Mum's props (top left, shot B) ---------- */
  const MPX = 300, MPY = 285, MR = 92;
  const pizzaG = G(Lfg); tr(pizzaG, MPX, MPY);
  E('circle', { r: MR + 14, fill: '#FFFFFF', stroke: '#C9D3DC', 'stroke-width': 4 }, pizzaG);   // the plate
  ciPizza(pizzaG, MR, { cuts: 8, seed: 4 });
  const gapA0 = -112.5, gapA1 = -67.5;
  E('path', { d: 'M0,0 L' + mkArcD(0, 0, MR + 2, gapA0, gapA1).slice(1) + ' Z', fill: '#FFFFFF' }, pizzaG);   // where the slice was
  const liftS = ciSlice(pizzaG, MR, 45, { seed: 7 });
  const secOut = G(liftS);   // the slice's outline: two radii + the arc
  E('path', { d: 'M0,0 L' + mkArcD(0, 0, MR, gapA0, gapA1).slice(1) + ' Z', fill: 'none', stroke: ORANGE, 'stroke-width': 5, 'stroke-linejoin': 'round' }, secOut);
  const cSector = mkChip(Lfg, '**sector**', { size: 30, col: ORANGE, fill: '#FFF3E0', textCol: INK });
  const cakeG = G(Lfg); tr(cakeG, MPX, MPY);
  E('circle', { r: MR + 14, fill: '#FFFFFF', stroke: '#C9D3DC', 'stroke-width': 4 }, cakeG);
  const CXC = 46, CYC = Math.sqrt(MR * MR - CXC * CXC);
  const cakeBig = G(cakeG), cakeSmall = G(cakeG);
  const cakeD = (d, g) => { E('path', { d, fill: CI_COL.cake, stroke: '#B8336A', 'stroke-width': 4, 'stroke-linejoin': 'round' }, g); };
  cakeD(`M${CXC},${CYC.toFixed(1)} A${MR},${MR} 0 1 1 ${CXC},${(-CYC).toFixed(1)} Z`, cakeBig);
  cakeD(`M${CXC},${(-CYC).toFixed(1)} A${MR},${MR} 0 0 1 ${CXC},${CYC.toFixed(1)} Z`, cakeSmall);
  [[-40, -30], [-10, 40], [-50, 30], [10, -50]].forEach(([x, y]) => E('circle', { cx: x, cy: y, r: 8, fill: CI_COL.cherry, stroke: '#8E1B3A', 'stroke-width': 2 }, cakeBig));
  E('circle', { cx: 70, cy: 0, r: 8, fill: CI_COL.cherry, stroke: '#8E1B3A', 'stroke-width': 2 }, cakeSmall);
  const cutLine = E('line', { x1: CXC, y1: -CYC, x2: CXC, y2: CYC, stroke: '#6B3FC0', 'stroke-width': 5, 'stroke-dasharray': '10 7' }, cakeSmall);
  const lMinor = mkText(cakeSmall, 74, CYC + 44, 'minor', { size: 28, anchor: 'middle', fill: '#6B3FC0', weight: 800 });
  const lMajor = mkText(cakeBig, -20, 8, 'major', { size: 30, anchor: 'middle', fill: '#6B3FC0', weight: 800, halo: '#FFF4F8' });
  const cSegment = mkChip(Lfg, '**segment**', { size: 30, col: '#6B3FC0', fill: '#F1E8FF', textCol: INK });

  /* ---------- C: "No relation." ---------- */
  const cRel = mkChip(Lhud, 'No relation.', { size: 38, col: GOLD, solid: true });
  const plates = G(Lfg);
  const plTan = pill(plates, 'MR TAN', { size: 28 }), plGent = pill(plates, 'TAN GENT', { size: 28 });
  tr(plTan, 420, 210); tr(plGent, 790, 210);

  const stHalf = ciStamp(Lhud, false);

  /* ================= the cast ================= */
  const tan = cast(Lcast, 'tan'), kav = cast(Lcast, 'kavya'), priya = cast(Lcast, 'priya'), mum = cast(Lcast, 'mum'), boy = cast(Lcast, 'boy');
  const priB = cast(Lset, 'priya', { body: true });               // full body, running the rope
  const radW = G(Lfg), rad = cast(radW, 'rad');
  const dee = cast(Lfg, 'dee');
  const perry = cast(Lfg, 'perry');
  const gentW = G(Lfg), gent = cast(gentW, 'gent');
  const LT = {}; ['priya', 'rad', 'dee', 'perry', 'gent', 'mum'].forEach(k => { LT[k] = ciLowerThird(Lhud, k); });
  const ltOn = (t, who, t0) => LT[who].set(win(t, t0, t0 + 3.1, 0.3));

  /* cut points */
  const cA2 = mid('run', 0.5), cA3 = at('rad') - 0.06, cB = at('same') - 0.06, cC = at('rel') - 0.06, cB2 = at('sector') - 0.06;
  const SLOT = [110, 300, 490], BY = 562, BS = 0.85;

  return t => {
    const sA = on(t, -1, cA2) || on(t, cA3, cB), sA2 = on(t, cA2, cA3), sB = on(t, cB, cC) || on(t, cB2, 1e9), sC = on(t, cC, cB2);
    const who = scWho(S, t);
    field.upd(t);
    for (const k in LT) LT[k].set(0);
    [tan, kav, priya, mum, boy, priB, radW, dee, perry, gentW].forEach(c => op(c, 0));
    op(setA, sA); op(boardG, sB); op(pizzaG, 0); op(cakeG, 0); op(plates, sC);
    op(cNine, 0); cFast.set(0); cRel.set(0); cSector.set(0); cSegment.set(0); stHalf.set(0);

    /* ---------- A: the giant circle ---------- */
    if (sA) {
      popIn(cNine, t, at('field') + 0.3, 1080, 60);
      // the run: one lap, anticlockwise from the right-hand point
      const run = P(t, end('rope') - 0.15, at('run') + 1.25 - (end('rope') - 0.15), ease);
      const ang = -360 * run, ar = ang * Math.PI / 180;
      const hx = PX + ERX * Math.cos(ar), hy = PY + ERY * Math.sin(ar);
      mkDraw(chalk, run); op(chalk, run > 0 ? 0.92 : 0);
      const standing = t >= cA3;
      op(ropeOut, standing ? 0 : 1); op(ropeIn, standing ? 0 : 1); op(ropeEnd, standing ? 0 : 1);
      const ps = 1.3 * (0.84 + 0.16 * (hy - (PY - ERY)) / (2 * ERY));
      const handY = hy - 92 * ps;
      [ropeOut, ropeIn].forEach(l => { attr(l, 'x2', hx); attr(l, 'y2', handY); });
      attr(ropeEnd, 'cx', hx); attr(ropeEnd, 'cy', handY);
      // Priya, full body, on the rope
      op(priB, 1);
      const running = run > 0 && run < 1;
      tr(priB, hx + (running ? 0 : 0), hy, ps);
      priB.pose(running ? runPose(t, 2.4) : standing ? { armR: [-30, 20], armL: [20, 10] } : { armR: [-12, 20], armL: [12, 20] });
      // speed lines
      op(blur, running ? 1 : 0);
      if (running) { const dx = Math.sin(ar), dy = -Math.cos(ar) * 0.3; blurL.forEach((l, i) => { const y = hy - 60 - i * 26; attr(l, 'x1', hx - dx * 30); attr(l, 'y1', y - dy * 30); attr(l, 'x2', hx - dx * (90 + i * 20)); attr(l, 'y2', y - dy * (90 + i * 20)); }); }
      // Rad stands up off the peg
      if (standing) {
        op(radW, 1);
        const up = P(t, cA3 + 0.05, 0.5, pop), s = 1.15;
        tr(radW, PX, PY, `1 ${Math.max(0.05, up).toFixed(3)}`);
        tr(rad, 0, -80 * s, s);
        rad.set({ t, talk: scTalk(S, t, 'rad'), mood: 'happy', look: -0.6, arms: 0.7 });
        ltOn(t, 'rad', at('rad') + 0.25);
      }
      // Mr Tan behind the hedge
      op(tan, 1); tr(tan, 150, 560, 1.0);
      tan.set({ t, talk: scTalk(S, t, 'tan'), mood: standing ? 'shock' : 'happy', look: standing ? 0.6 : 0.8, lift: t >= at('rope') && t < end('rope') ? 0.6 : 0 });
      if (t >= at('rope')) ltOn(t, 'priya', at('rope') + 0.3);
    }

    /* ---------- A2: Priya close-up ---------- */
    if (sA2) {
      op(priya, 1); tr(priya, 600, 560, 1.15);
      priya.set({ t, talk: scTalk(S, t, 'priya'), mood: 'smug', look: 0.2, sweat: 1 });
      cFast.set(P(t, cA2 + 0.1, 0.35, linear)); tr(cFast, 600, 300);
    }

    /* ---------- B: the whiteboard ---------- */
    if (sB) {
      const bp = P(t, cB, 0.3, easeOut);
      op(boardG, bp);
      // which parts are on the board
      const seen = (a, b) => t >= a && t < b;
      radii.forEach((r, k) => { const v = seen(at('same'), at('dee') + 0.6) ? (t > mid('same', 0.12) + k * 0.22 ? 1 : 0) * (1 - P(t, at('dee') + 0.3, 0.3, linear)) : 0; op(r, v); op(rLabs[k], v); });
      op(cGlow, seen(at('same'), mid('same', 0.5)) || seen(at('mnem'), at('major')) ? 0.5 + 0.5 * Math.sin(t * 8) : 0);
      const dTwo = t >= mid('dee', 0.5) && t < at('chord');
      op(ghost, dTwo ? P(t, mid('dee', 0.55), 0.3, linear) : 0);
      [lR1, lR2].forEach((l, i) => op(l, dTwo ? P(t, mid('dee', 0.55 + i * 0.05), 0.3, linear) : 0));
      op(lD, t >= mid('dee', 0.2) && t < at('chord') ? P(t, mid('dee', 0.2), 0.3, linear) : 0);
      fade(r6, t, at('chord') + 0.1, at('nope'));
      fade(priLine, t, mid('chord', 0.4), at('perry'));
      op(outBit, t > mid('nope', 0.82) && t < at('perry') ? 0.4 + 0.4 * Math.sin(t * 10) : 0);
      op(xOut, t > mid('nope', 0.82) && t < at('perry') ? 1 : 0);
      fade(chordG, t, at('nope') + 0.1, at('perry'));
      // circumference and arc
      const walk1 = P(t, mid('perry', 0.05), (end('perry') - at('perry')) * 0.48, linear);
      const walk2 = P(t, mid('perry', 0.62), (end('perry') - at('perry')) * 0.3, easeOut);
      const pOn = t >= at('perry') - 0.1 && t < at('gent');
      mkDraw(circP, walk1); op(circP, pOn && walk1 > 0 ? (t < mid('perry', 0.6) ? 1 : 0.35) : 0);
      mkDraw(arcP, walk2); op(arcP, pOn && walk2 > 0 ? 1 : 0);
      op(arcLab, pOn && walk2 > 0.95 ? 1 : 0);
      op(tanG, t >= mid('gent', 0.2) && t < cC ? 1 : 0);
      right.set(P(t, mid('gent', 0.6), 0.4, linear));
      fade(sector, t, at('sector') + 0.3, 1e9);
      fade(segment, t, mid('segment', 0.2), 1e9);
            // text rows
      fade(tSame, t, mid('same', 0.05), at('dee')); fade(bSame, t, mid('same', 0.6), at('dee'));
      fade(tDee, t, at('dee') + 0.2, at('chord')); fade(tDee2, t, mid('dee', 0.3), at('chord')); fade(bDee, t, mid('dee', 0.62), at('chord'));
      fade(tChord, t, at('chord') + 0.1, at('nope'));
      fade(tChord2, t, at('nope') + 0.1, mid('nope', 0.8)); fade(tImp, t, mid('nope', 0.8), at('perry'));
      fade(bNope, t, mid('nope', 0.45), at('perry'));
      fade(tCirc, t, at('perry') + 0.1, mid('perry', 0.6)); fade(tArc, t, mid('perry', 0.6), at('gent'));
      fade(tTan, t, at('gent') + 0.1, cC); fade(bTan, t, mid('gent', 0.62), cC);
      fade(tSec, t, at('sector') + 0.1, at('segment')); fade(tSeg, t, at('segment') + 0.1, at('mnem'));
      fade(tMn, t, at('mnem') + 0.05, at('major')); fade(bMn, t, mid('mnem', 0.55), at('major'));
      fade(tMaj, t, at('major') + 0.05, 1e9);

      // Rad: sweeps round (same), then lies along one half of Dee (dee)
      if (t < at('chord') - 0.1) {
        op(radW, 1);
        const s = R / 160;
        if (t < at('dee')) {
          const sw = P(t, mid('same', 0.12), (end('same') - at('same')) * 0.8, linear);
          tr(radW, CX, CY, 1, 22.5 + 315 * sw + (t < mid('same', 0.12) ? 0 : 0));
          rad.set({ t, talk: scTalk(S, t, 'rad'), mood: 'happy', look: 0, arms: 0.5 });
        } else {
          const mv = P(t, mid('dee', 0.48), 0.6, ease);
          tr(radW, CX, lerp(CY, CY - 55, mv), 1, lerp(337.5, 450, mv));
          rad.set({ t, mood: t > mid('dee', 0.82) ? 'deadpan' : 'neutral', look: 0.6, arms: 0.2 });
        }
        tr(rad, 0, -80 * s, s);
      }
      // Dee: slides in and lies across (dee), back as the longest chord (nope)
      const deeIn = (t >= at('dee') - 0.1 && t < at('chord') - 0.1) || (t >= mid('nope', 0.4) && t < at('perry') - 0.1);
      if (deeIn) {
        op(dee, 1);
        const t0 = t < at('chord') ? at('dee') - 0.1 : mid('nope', 0.4);
        const sl = P(t, t0, 0.55, easeOut);
        tr(dee, CX + 420 * (1 - sl), CY, R / 160, 90);
        dee.set({ t, talk: scTalk(S, t, 'dee'), mood: 'smug', look: 0, arms: who === 'dee' ? 0.8 : 0.3 });
        if (t < at('chord')) ltOn(t, 'dee', at('dee') + 0.1);
      }
      // Perry walks the circumference, then an arc
      if (pOn) {
        op(perry, 1);
        const a = walk2 > 0 ? lerp(ARC0, ARC1, walk2) : -90 + 360 * walk1;
        const s = 0.32, n = pt(a, R + 2 + 112 * s);
        tr(perry, CX + n[0], CY + n[1], s, a + 90);
        const moving = (walk1 > 0 && walk1 < 1) || (walk2 > 0 && walk2 < 1);
        perry.set({ t, talk: scTalk(S, t, 'perry'), mood: walk2 >= 1 ? 'annoyed' : 'neutral', look: 0.5, walk: moving ? t * 14 : 0, wheel: a * 3, sweat: walk1 >= 1 ? 1 : 0 });
        ltOn(t, 'perry', at('perry') + 0.1);
      }
      // Tan Gent leans in and touches at one point
      if (t >= at('gent') - 0.1 && t < cC) {
        op(gentW, 1);
        const lean = P(t, at('gent') - 0.1, 0.6, easeOut), s = 0.55;
        tr(gentW, CX + tp[0], CY + tp[1] - 60 * (1 - lean), 1, lerp(-50, TA, lean));
        tr(gent, 0, -160 * s, s);
        gent.set({ t, talk: scTalk(S, t, 'gent'), mood: 'smug', look: -0.4 });
        ltOn(t, 'gent', at('gent') + 0.1);
      }
      // Mum's pizza (sector) and cake (segment)
      if (t >= at('sector') - 0.1 && t < at('segment')) {
        op(pizzaG, P(t, at('sector') - 0.1, 0.25, linear));
        const lift = P(t, mid('sector', 0.25), 0.6, pop);
        tr(liftS, 46 * lift, -40 * lift, 1 + 0.12 * lift);
        op(secOut, P(t, mid('sector', 0.45), 0.3, linear));
        cSector.set(P(t, mid('sector', 0.55), 0.3, linear)); tr(cSector, MPX + 160, MPY - 120);
      }
      if (t >= at('segment') - 0.05) {
        op(cakeG, P(t, at('segment') - 0.05, 0.25, linear));
        const cut = P(t, mid('segment', 0.2), 0.5, easeOut);
        const grab = P(t, mid('major', 0.45), 0.7, ease);
        tr(cakeSmall, 40 * cut, 0); tr(cakeBig, -10 * grab, 70 * grab);
        op(cutLine, P(t, mid('segment', 0.1), 0.2, linear));
        if (t < at('mnem')) { cSegment.set(P(t, mid('segment', 0.55), 0.3, linear)); tr(cSegment, MPX + 180, MPY - 120); }
        op(lMinor, P(t, at('major') + 0.2, 0.3, linear)); op(lMajor, P(t, mid('major', 0.4), 0.3, linear));
      }
      // HALF-BAKED for Priya's 13 cm line
      if (t >= at('nope') && t < at('perry')) { stHalf.set(P(t, mid('nope', 0.86), 0.35, linear)); tr(stHalf, 300, 380, 0.42); }

      /* the humans behind the hedge */
      op(kav, 1); tr(kav, SLOT[0], BY + 8, BS);
      let km = 'neutral', kl = 0.8;
      if (who === 'priya') { km = 'deadpan'; kl = 0.6; }
      if (t >= mid('nope', 0.8) && t < at('perry')) km = 'deadpan';
      if (who === 'gent' || who === 'perry') km = 'happy';
      if (t >= at('mnem') && t < at('major')) { km = 'happy'; kl = 0.8; }
      if (t >= at('major')) { km = 'deadpan'; kl = 0.5; }
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
      // Priya (slot 2) until the cake; Ah Boy pops up in her place for "major"
      if (t < at('major') - 0.2) {
        op(priya, 1);
        tr(priya, SLOT[1], BY + 8, BS);
        let pm = 'neutral';
        if (t < at('nope')) pm = 'smug';
        else if (t < at('perry')) pm = t > mid('nope', 0.6) ? 'annoyed' : 'neutral';
        else if (t < at('sector')) pm = 'annoyed';
        priya.set({ t, talk: scTalk(S, t, 'priya'), mood: pm, look: who === 'kavya' ? -0.8 : 0.8, lift: who === 'priya' ? 0.8 : 0 });
      } else {
        op(boy, 1);
        const up = P(t, at('major') - 0.2, 0.4, pop);
        tr(boy, SLOT[1], lerp(760, BY + 22, up), BS);
        boy.set({ t, talk: scTalk(S, t, 'boy'), mood: 'happy', look: -0.3, lift: 1 });
      }
      // Mr Tan (slot 3) until the sector, then Mum
      if (t < at('sector') - 0.2) {
        op(tan, 1); tr(tan, SLOT[2], BY, BS);
        const stamp = t >= mid('nope', 0.7) && t < at('perry');
        tan.set({ t, talk: scTalk(S, t, 'tan'), mood: stamp ? 'deadpan' : 'happy', look: 0.8, lift: stamp ? (t < mid('nope', 0.86) ? 1 : 0.2) : 0 });
      } else {
        op(mum, 1);
        const up = P(t, at('sector') - 0.2, 0.4, pop);
        tr(mum, SLOT[2], lerp(760, BY, up), BS);
        mum.set({ t, talk: scTalk(S, t, 'mum'), mood: t >= at('mnem') ? 'smug' : 'neutral', look: who === 'kavya' ? -0.8 : who === 'boy' ? -0.7 : -0.5, lift: who === 'mum' ? 0.7 : 0 });
        ltOn(t, 'mum', at('sector') + 0.1);
      }
    }

    /* ---------- C: "No relation." ---------- */
    if (sC) {
      op(tan, 1); tr(tan, 420, 520, 1.1);
      tan.set({ t, talk: scTalk(S, t, 'tan'), mood: 'deadpan', look: 0 });
      op(gentW, 1); tr(gentW, 800, 610, 1, 0); tr(gent, 0, -160 * 1.05, 1.05);
      gent.set({ t, mood: 'deadpan', look: 0, still: true });
      cRel.set(P(t, mid('rel', 0.3), 0.3, linear)); tr(cRel, 605, 330);
      const push = P(t, cC, 1.6, linear), k = 1 + 0.05 * push;
      [Lcast, Lfg].forEach(l => tr(l, 605 * (1 - k), 420 * (1 - k), k));
    } else { Lcast.removeAttribute('transform'); Lfg.removeAttribute('transform'); }
  };
});
