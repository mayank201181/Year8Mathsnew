/* Scene 3: Mr Tan hears the drill (angles in triangles).
   Shots (hard sitcom cuts):
   A  wide kitchen, 12 noon: Dad drills the spice shelf (BZZZT; THUD THUD from upstairs) -> Mr Tan from upstairs
      (lower third), Kavya mortified -> Dad's bracket: "angles add to 180°. I watched a video." (the 2× phone)
   B  the card shot: Rex on the island at the left, three humans behind it (Kavya, Ah Boy, Mr Tan, then Mum, Priya,
      Dad), a white card on the wall at the right:
      - Ah Boy: every triangle? three triangles with "?"
      - Mr Tan draws a triangle a, b, c and a dashed line through the top, parallel to the base
      - Para and Lel slide in to BE the two parallel lines; "Little Lel" (with a dummy)
      - showpiece: copies of a and b glide up to the top corner (alternate angles) and fill a straight line with c
      - a + b + c = 180° for every triangle (ticks), equilateral 60° each, APPROVED
      - Mum's isosceles bracket: apex 40°, base angles (180° − 40°) ÷ 2 = 70°, check
      - Priya: 50°, 50°, 80°; Mr Tan: or the 50° is the apex, 65° each: two cases
      - the shelf: exterior angle 117° = x + 2x; 3x = 117, x = 39: 39°, 78°; 180° − 117° = 63°, check
   C  wide kitchen: Mr Tan's pun lands to silence; Roomby drives across in the pause; only Ah Boy laughs. */
scene('shelf', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const view = (el, k, fx, fy, sx, sy) => el.setAttribute('transform', `translate(${sx.toFixed(1)} ${sy.toFixed(1)}) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const fade = (t, t0, d) => P(t, t0, d || 0.3, linear);
  const GOLD = '#FFE45C', RED = '#D32F2F', GREEN = '#1E9E5A', INK = MK.ink, PAPER = MK.paper;
  const A_GOLD = '#F2B705', A_BLUE = '#3B82F6', A_GREEN = '#2FA36B', A_PINK = '#E8578A', WOOD = '#C08A52', WOOD_DK = '#7A5230';
  const rad = a => a * Math.PI / 180, deg = a => a * 180 / Math.PI;
  const pt = (x, y, r, a) => [x + Math.cos(rad(a)) * r, y - Math.sin(rad(a)) * r];
  const dirTo = (p, q) => { const a = deg(Math.atan2(-(q[1] - p[1]), q[0] - p[0])); return (a + 360) % 360; };
  /* a filled wedge at the local origin from maths angle a1 anticlockwise to a2 */
  const wedgeD = (r, a1, a2) => { const p1 = pt(0, 0, r, a1), p2 = pt(0, 0, r, a2); return `M0,0 L${p1[0].toFixed(1)},${p1[1].toFixed(1)} A${r},${r} 0 ${a2 - a1 > 180 ? 1 : 0} 0 ${p2[0].toFixed(1)},${p2[1].toFixed(1)} Z`; };
  const arcD = (r, a1, a2) => { const p1 = pt(0, 0, r, a1), p2 = pt(0, 0, r, a2); return `M${p1[0].toFixed(1)},${p1[1].toFixed(1)} A${r},${r} 0 ${a2 - a1 > 180 ? 1 : 0} 0 ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`; };
  const wedge = (parent, x, y, r, a1, a2, col, fo) => {
    const g = G(parent); tr(g, x, y);
    E('path', { d: wedgeD(r, a1, a2), fill: col, opacity: fo === undefined ? 0.38 : fo }, g);
    E('path', { d: arcD(r, a1, a2), fill: 'none', stroke: col, 'stroke-width': 4, 'stroke-linecap': 'round' }, g);
    return g;
  };
  /* maths label centred on a point, with a paper halo */
  const lab = (parent, x, y, src, o) => { o = o || {}; const s = o.size || 30; return mkMath(parent, x, y + s * 0.36, src, { size: s, fill: o.fill || INK, anchor: 'middle', halo: o.halo === undefined ? PAPER : o.halo, weight: 700 }); };
  /* label for the angle between directions a1..a2 at vertex v, at distance lr along the bisector */
  const angLab = (parent, v, a1, a2, lr, src, o) => { const m = (a1 + a2) / 2; const p = pt(v[0], v[1], lr, m); return lab(parent, p[0], p[1], src, o); };
  /* equal-side tick marks: n short strokes across the middle of segment p-q */
  const ticks = (parent, p, q, n, col) => {
    const mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2, L = Math.hypot(q[0] - p[0], q[1] - p[1]), ux = (q[0] - p[0]) / L, uy = (q[1] - p[1]) / L, nx = -uy, ny = ux;
    let d = '';
    for (let i = 0; i < n; i++) { const o = (i - (n - 1) / 2) * 9, cx = mx + ux * o, cy = my + uy * o; d += `M${(cx - nx * 12).toFixed(1)},${(cy - ny * 12).toFixed(1)} L${(cx + nx * 12).toFixed(1)},${(cy + ny * 12).toFixed(1)} `; }
    return E('path', { d, stroke: col || INK, 'stroke-width': 4, 'stroke-linecap': 'round' }, parent);
  };
  const tri = (parent, pts, o) => { o = o || {}; return E('path', { d: mkPoly(pts), fill: o.fill || 'rgba(76,201,240,0.14)', stroke: o.col || INK, 'stroke-width': o.w || 5, 'stroke-linejoin': 'round' }, parent); };
  const tickMark = (parent, x, y, s) => { const g = tick(parent, s || 18, GREEN); tr(g, x, y); return g; };

  /* layers: kitchen, the card on the wall (and Para & Lel on it), people behind the island, the island (and Rex),
     foreground props and chips, HUD */
  const Lbg = G(root), Lcard = G(root), Lcast = G(root), Lfront = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= the kitchen ================= */
  const kitWrap = G(Lbg);
  const kit = agKitchen(kitWrap);
  kit.clock(12);
  // the spice shelf on the splashback, with two triangular brackets
  const shelf = G(kitWrap);
  E('rect', { x: 420, y: 322, width: 236, height: 18, rx: 4, fill: WOOD, stroke: WOOD_DK, 'stroke-width': 3 }, shelf);
  [[436, 1], [640, -1]].forEach(([x, sd]) => E('path', { d: mkPoly([[x, 340], [x + sd * 52, 340], [x, 392]]), fill: WOOD, stroke: WOOD_DK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, shelf));
  const jars = G(shelf);
  [['#E8424F', 470], ['#FFC247', 530], ['#56D69B', 590]].forEach(([c, x]) => { E('rect', { x: x - 16, y: 286, width: 32, height: 36, rx: 5, fill: c, stroke: SC_INK, 'stroke-width': 2.5 }, jars); E('rect', { x: x - 18, y: 280, width: 36, height: 10, rx: 3, fill: '#5A6670', stroke: SC_INK, 'stroke-width': 2 }, jars); });
  const holes = G(kitWrap);
  [[452, 360], [624, 360]].forEach(([x, y]) => E('circle', { cx: x, cy: y, r: 4, fill: '#5A6670' }, holes));
  const islandWrap = G(Lfront);
  islandWrap.appendChild(kit.front); islandWrap.appendChild(kit.top);

  /* A: noon, the drill, the ceiling */
  const cNoon = mkChip(Lfg, '12 noon', { size: 34, col: GOLD });
  const bzz = G(Lfg);
  T(bzz, 0, 0, 'BZZZT!', { size: 40, weight: 800, anchor: 'middle', fill: '#FF8A3D' });
  E('path', { d: 'M-70,-40 l-14,-12 M-60,14 l-18,6 M70,-40 l14,-12 M60,14 l18,6', stroke: '#FF8A3D', 'stroke-width': 5, 'stroke-linecap': 'round' }, bzz);
  const thud = G(Lfg);
  const thudT = T(thud, 0, 0, 'THUD! THUD!', { size: 40, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  thudT.setAttribute('stroke', '#2A1A22'); thudT.setAttribute('stroke-width', 8); thudT.setAttribute('paint-order', 'stroke'); thudT.setAttribute('stroke-linejoin', 'round');
  const dust = [0, 1, 2, 3, 4].map(i => E('circle', { cx: -80 + i * 40, cy: 20, r: 4 + (i % 2) * 2, fill: '#E9DCC4' }, thud));
  const cUp = mkChip(Lfg, 'from **upstairs**', { size: 30, col: '#9FD8FF' });
  const cTeach = mkChip(Lfg, "Kavya's **maths teacher**", { size: 30, col: '#FF8FC8' });
  const cAdd = mkChip(Lfg, 'angles add to {{180°}}', { size: 32, col: GOLD });
  const phone = agPhone(Lfg, { speed: '2×' });

  /* ================= B: the card on the wall ================= */
  const CX = 885, card = G(Lcard);
  E('rect', { x: 608, y: 112, width: 562, height: 400, rx: 18, fill: 'rgba(0,0,0,0.22)' }, card);
  E('rect', { x: 600, y: 104, width: 562, height: 400, rx: 18, fill: PAPER, stroke: '#8FA3B8', 'stroke-width': 5 }, card);

  /* --- why / every: three triangles --- */
  const tw = G(card);
  const T3 = [
    [[630, 470], [745, 470], [800, 398]],                // obtuse
    [[812, 470], [978, 470], [930, 436]],                // long and thin
    [[992, 470], [1152, 470], [1072, 470 - 160 * Math.sqrt(3) / 2]],   // equilateral
  ];
  T3.forEach((p, i) => tri(tw, p, { fill: ['rgba(255,194,71,0.18)', 'rgba(76,201,240,0.18)', 'rgba(86,214,155,0.2)'][i] }));
  const qs = T3.map(p => { const x = (p[0][0] + p[1][0]) / 2; return T(tw, x, 316, '?', { size: 52, weight: 800, anchor: 'middle', fill: A_PINK }); });
  const tks = T3.map(p => tickMark(tw, (p[0][0] + p[1][0]) / 2, 300, 20));
  const whyT = mkText(tw, CX, 186, 'Every triangle? **Why?**', { size: 40, anchor: 'middle', fill: INK, boldFill: A_PINK });
  const evF = mkMath(tw, CX, 190, 'a + b + c = 180°', { size: 50, fill: INK, anchor: 'middle' });
  const evT = mkText(tw, CX, 246, 'for **every** triangle', { size: 32, anchor: 'middle', fill: GREEN });
  const eq = T3[2], eq60 = G(tw);
  for (let i = 0; i < 3; i++) { const v = eq[i], a = eq[(i + 1) % 3], b = eq[(i + 2) % 3]; mkCorner(eq60, v, a, b, { r: 26, col: A_GREEN, label: '60°', size: 26, lr: 56 }).set(1); }

  /* --- draw / honour / baby / proof: the triangle a, b, c and the parallel lines --- */
  const pf = G(card);
  const PA = [740, 440], PB = [1100, 440], PC = [900, 308];
  const angA = dirTo(PA, PC), angB = 180 - dirTo(PB, PC);           // dirTo(PB, PC) = 180 - angB
  const triEl = mkDash(E('path', { d: mkPoly([PA, PB, PC]), fill: 'none', stroke: INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, pf));
  const triFill = E('path', { d: mkPoly([PA, PB, PC]), fill: 'rgba(76,201,240,0.12)' }, pf);
  pf.insertBefore(triFill, triEl);
  const wA = wedge(pf, PA[0], PA[1], 52, 0, angA, A_GOLD), wB = wedge(pf, PB[0], PB[1], 52, 180 - angB, 180, A_BLUE);
  const wC = wedge(pf, PC[0], PC[1], 46, 180 + angA, 360 - angB, A_GREEN);
  const lA = angLab(pf, PA, 0, angA, 84, 'a', { size: 36 }), lB = angLab(pf, PB, 180 - angB, 180, 84, 'b', { size: 36 }), lC = angLab(pf, PC, 180 + angA, 360 - angB, 82, 'c', { size: 36 });
  // the dashed line through the top, parallel to the base, with arrow marks
  const dash = E('line', { x1: 680, y1: PC[1], x2: 680, y2: PC[1], stroke: '#C62828', 'stroke-width': 5, 'stroke-dasharray': '16 10', 'stroke-linecap': 'round' }, pf);
  const arrowsG = G(pf);
  [PC[1], PA[1]].forEach(y => E('path', { d: `M1040,${y - 12} L1056,${y} L1040,${y + 12}`, fill: 'none', stroke: '#C62828', 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, arrowsG));
  const parT = mkText(pf, 1150, 282, '**parallel** to the base', { size: 28, anchor: 'end', fill: '#C62828' });
  // Para and Lel (they slide in to BE the two lines); Little Lel
  const PL_S = 1.1, PL_X = 830, PL_Y = PC[1] + 60 * PL_S;
  const plWrap = G(Lcard), parlel = cast(plWrap, 'parlel', { s: PL_S });
  const baby = G(Lcard);
  E('path', { d: 'M780,374 L960,374', stroke: SC_INK, 'stroke-width': 14, 'stroke-linecap': 'round' }, baby);
  E('path', { d: 'M780,374 L960,374', stroke: '#FFF3C4', 'stroke-width': 8, 'stroke-linecap': 'round' }, baby);
  E('path', { d: 'M905,366 L914,374 L905,382', fill: 'none', stroke: '#E8424F', 'stroke-width': 4, 'stroke-linecap': 'round' }, baby);
  E('circle', { cx: 756, cy: 374, r: 25, fill: '#FFE3C4', stroke: SC_INK, 'stroke-width': 3.5 }, baby);
  E('path', { d: 'M744,350 Q756,340 762,352', fill: 'none', stroke: SC_INK, 'stroke-width': 3 }, baby);   // a curl
  E('circle', { cx: 747, cy: 369, r: 3.5, fill: SC_INK }, baby); E('circle', { cx: 765, cy: 369, r: 3.5, fill: SC_INK }, baby);
  E('circle', { cx: 756, cy: 386, r: 9, fill: '#FF8FC8', stroke: SC_INK, 'stroke-width': 2.5 }, baby);       // the dummy
  E('circle', { cx: 756, cy: 386, r: 4, fill: 'none', stroke: '#FFFFFF', 'stroke-width': 2 }, baby);
  E('path', { d: 'M738,384 L774,384', stroke: SC_INK, 'stroke-width': 3, 'stroke-linecap': 'round' }, baby);
  const babyT = mkText(baby, 1150, 380, '"Little Lel"', { size: 30, anchor: 'end', fill: '#B3326F' });
  // the moving copies of a and b
  const mvA = G(pf), mvB = G(pf);
  wedge(mvA, 0, 0, 52, 0, angA, A_GOLD, 0.5); wedge(mvB, 0, 0, 52, 180 - angB, 180, A_BLUE, 0.5);
  const mlA = lab(pf, 0, 0, 'a', { size: 36 }), mlB = lab(pf, 0, 0, 'b', { size: 36 });
  // the Z shapes (alternate angles) and the straight line
  const zA = mkDash(E('path', { d: `M${PC[0] - 150},${PC[1]} L${PC[0]},${PC[1]} L${PA[0]},${PA[1]} L${PA[0] + 150},${PA[1]}`, fill: 'none', stroke: A_GOLD, 'stroke-width': 9, 'stroke-linejoin': 'round', 'stroke-linecap': 'round', opacity: 0.75 }, pf));
  const zB = mkDash(E('path', { d: `M${PC[0] + 150},${PC[1]} L${PC[0]},${PC[1]} L${PB[0]},${PB[1]} L${PB[0] - 150},${PB[1]}`, fill: 'none', stroke: A_BLUE, 'stroke-width': 9, 'stroke-linejoin': 'round', 'stroke-linecap': 'round', opacity: 0.75 }, pf));
  pf.insertBefore(zA, triEl); pf.insertBefore(zB, triEl);
  const straight = G(pf);
  E('path', { d: `M${PC[0] - 96},${PC[1]} A96,96 0 0 0 ${PC[0] + 96},${PC[1]}`, fill: 'none', stroke: A_PINK, 'stroke-width': 5, 'stroke-dasharray': '10 7' }, straight);
  const altT = mkText(pf, CX, 168, '**alternate angles** are equal', { size: 32, anchor: 'middle', fill: INK, boldFill: '#B57B12' });
  const strT = mkText(pf, CX, 222, '{{a}}, {{b}}, {{c}} make a **straight line**: {{180°}}', { size: 30, anchor: 'middle', fill: INK, boldFill: A_PINK });

  /* --- forty / 70: Mum's isosceles bracket --- */
  const iso = G(card);
  const IA = [760, 190], IH = 240, IW = IH * Math.tan(rad(20)), IL = [760 - IW, 430], IR = [760 + IW, 430];
  tri(iso, [IL, IR, IA], { fill: 'rgba(192,138,82,0.25)' });
  ticks(iso, IL, IA, 1); ticks(iso, IR, IA, 1);
  wedge(iso, IA[0], IA[1], 40, 250, 290, A_PINK);
  wedge(iso, IL[0], IL[1], 40, 0, 70, A_BLUE); wedge(iso, IR[0], IR[1], 40, 110, 180, A_BLUE);
  wedge(iso, IL[0], IL[1], 50, 0, 70, A_BLUE, 0); wedge(iso, IR[0], IR[1], 50, 110, 180, A_BLUE, 0);   // double arcs: equal
  angLab(iso, IA, 250, 290, 98, '40°', { size: 28 });
  const baseLab = G(iso);
  mkText(baseLab, IL[0] - 6, 474, 'base angle', { size: 26, anchor: 'middle', fill: A_BLUE });
  mkText(baseLab, IR[0] + 6, 474, 'base angle', { size: 26, anchor: 'middle', fill: A_BLUE });
  const l70 = G(iso);
  angLab(l70, IL, 0, 70, 70, '70°', { size: 26, fill: '#1E5FB8' }); angLab(l70, IR, 110, 180, 70, '70°', { size: 26, fill: '#1E5FB8' });
  const isoTxt = G(iso), RX0 = 1030;
  mkText(isoTxt, RX0, 196, '**isosceles**', { size: 38, anchor: 'middle', fill: INK, boldFill: '#9C5A1E' });
  mkText(isoTxt, RX0, 252, 'two equal sides', { size: 30, anchor: 'middle', fill: INK });
  mkText(isoTxt, RX0, 300, 'so the two', { size: 30, anchor: 'middle', fill: INK });
  mkText(isoTxt, RX0, 346, '**base angles**', { size: 32, anchor: 'middle', fill: INK, boldFill: '#1E5FB8' });
  mkText(isoTxt, RX0, 394, 'are equal', { size: 30, anchor: 'middle', fill: INK });
  const w70 = mkWorking(iso, 912, 176, ['(180° − 40°) ÷ 2', '= 70°'], { size: 36, fill: INK, gap: 16 });
  const w70b = G(iso);
  mkText(w70b, RX0, 352, '**check**', { size: 28, anchor: 'middle', fill: GREEN });
  mkMath(w70b, RX0, 404, '40 + 70 + 70 = 180', { size: 32, fill: INK, anchor: 'middle' });
  const w70tk = tickMark(w70b, RX0, 452, 20);

  /* --- 50 / cases: Priya's 50°, two cases --- */
  const cs = G(card);
  const c1 = { L: [645, 420], R: [845, 420] }; c1.A = [745, 420 - 100 * Math.tan(rad(50))];
  const c2 = { L: [950, 420], R: [1100, 420] }; c2.A = [1025, 420 - 75 * Math.tan(rad(65))];
  const case1 = G(cs), case2 = G(cs);
  [[case1, c1, 50, 80, '50°', '50°', '80°', 'Case 1', '50° is a **base angle**'], [case2, c2, 65, 50, '65°', '65°', '50°', 'Case 2', '50° is the **apex**']].forEach(([g, c, b, ap, lL, lR, lAp, head, sub]) => {
    const cx = c.A[0];
    tri(g, [c.L, c.R, c.A], { fill: 'rgba(192,138,82,0.25)' });
    ticks(g, c.L, c.A, 1); ticks(g, c.R, c.A, 1);
    wedge(g, c.L[0], c.L[1], 36, 0, b, A_BLUE); wedge(g, c.R[0], c.R[1], 36, 180 - b, 180, A_BLUE);
    wedge(g, c.A[0], c.A[1], 32, 270 - ap / 2, 270 + ap / 2, A_PINK);
    angLab(g, c.L, 0, b, 62, lL, { size: 26 }); angLab(g, c.R, 180 - b, 180, 62, lR, { size: 26 });
    angLab(g, c.A, 270 - ap / 2, 270 + ap / 2, ap > 60 ? 58 : 74, lAp, { size: 26 });
    mkText(g, cx, 160, head, { size: 32, anchor: 'middle', fill: INK, weight: 800 });
    mkText(g, cx, 200, sub, { size: 26, anchor: 'middle', fill: '#5A4A3A', boldFill: g === case1 ? '#1E5FB8' : '#B3326F' });
  });
  const cDiv = E('line', { x1: 885, y1: 136, x2: 885, y2: 480, stroke: '#C9D3DC', 'stroke-width': 3, 'stroke-dasharray': '8 8' }, cs);
  const w50 = mkMath(case1, 745, 476, '180° − 50° − 50° = 80°', { size: 26, fill: INK, anchor: 'middle' });
  const w65 = mkMath(case2, 1025, 476, '(180° − 50°) ÷ 2 = 65°', { size: 26, fill: INK, anchor: 'middle' });

  /* --- ext / 39: the shelf's exterior angle --- */
  const ex = G(card);
  const EL = [650, 300], ER = [890, 300];
  const ed1 = 240 * Math.tan(rad(63)) / (Math.tan(rad(39)) + Math.tan(rad(63)));
  const EA = [EL[0] + ed1, 300 - ed1 * Math.tan(rad(39))];
  const eFill = tri(ex, [EL, ER, EA], { fill: 'rgba(192,138,82,0.22)' });
  E('path', { d: `M${ER[0]},${ER[1]} L1090,${ER[1]}`, stroke: INK, 'stroke-width': 5, 'stroke-dasharray': '14 9', 'stroke-linecap': 'round' }, ex);
  const eAng = { L: [0, 39], A: [dirTo(EA, EL), dirTo(EA, ER)], R: [dirTo(ER, EA), 180], X: [0, dirTo(ER, EA)] };
  const exW = wedge(ex, ER[0], ER[1], 46, eAng.X[0], eAng.X[1], A_PINK);
  const xW = wedge(ex, EL[0], EL[1], 46, eAng.L[0], eAng.L[1], A_GOLD), x2W = wedge(ex, EA[0], EA[1], 40, eAng.A[0], eAng.A[1], A_GOLD);
  const rW = wedge(ex, ER[0], ER[1], 36, eAng.R[0], eAng.R[1], '#8F9CAB', 0.25);
  const l117 = angLab(ex, ER, eAng.X[0], eAng.X[1], 80, '117°', { size: 30, fill: '#B3326F' });
  const lx = angLab(ex, EL, 0, 39, 76, 'x', { size: 32 }), lx2 = angLab(ex, EA, eAng.A[0], eAng.A[1], 64, '2x', { size: 30 });
  const l39 = angLab(ex, EL, 0, 39, 76, '39°', { size: 28, fill: '#8A6200' }), l78 = angLab(ex, EA, eAng.A[0], eAng.A[1], 64, '78°', { size: 28, fill: '#8A6200' });
  const l63 = angLab(ex, ER, eAng.R[0], eAng.R[1], 64, '63°', { size: 28, fill: '#3A4A58' });
  const exT = mkText(ex, 1150, 160, '**exterior angle**', { size: 30, anchor: 'end', fill: '#B3326F' });
  const ex117 = mkMath(ex, CX, 410, '117° = x + 2x', { size: 44, fill: INK, anchor: 'middle' });
  const w39 = mkWorking(ex, 885, 334, ['x + 2x = 117', '3x = 117', 'x = 39'], { size: 36, fill: INK, gap: 12 });
  const w63 = mkWorking(ex, 885, 352, ['180° − 117° = 63°', '39° + 78° + 63° = 180°'], { size: 34, fill: INK, gap: 26 });
  const w63tk = tickMark(ex, 1140, w63.lineY[1] - 12, 16);

  /* chips in the kitchen (top left, above the heads) */
  const cRule = mkChip(Lfg, '**exterior angle** = sum of the\ntwo **interior opposite** angles', { size: 28, col: GOLD });
  const cBoth = mkChip(Lfg, 'check **BOTH** cases', { size: 32, col: '#FF8FC8' });
  const stamp = agStamp(Lfg, true);

  /* C: the pun */
  const cAcute = G(Lfg);
  { const ch = mkChip(cAcute, 'a bit **acute**', { size: 32, col: GOLD }); ch.set(1);
    const a = G(cAcute); tr(a, ch.w / 2 + 44, 18);
    E('path', { d: `M0,0 L70,0 M0,0 L${(Math.cos(rad(40)) * 70).toFixed(1)},${(-Math.sin(rad(40)) * 70).toFixed(1)}`, stroke: '#FFFFFF', 'stroke-width': 5, 'stroke-linecap': 'round' }, a);
    E('path', { d: arcD(30, 0, 40), fill: 'none', stroke: GOLD, 'stroke-width': 4 }, a); }
  const cCute = mkChip(Lfg, 'a cute → **acute**', { size: 34, col: '#FF8FC8' });

  /* ================= the cast ================= */
  const kav = cast(Lcast, 'kavya'), boy = cast(Lcast, 'boy'), tan = cast(Lcast, 'tan');
  const mum = cast(Lcast, 'mum', { prop: null, hand: true }), pri = cast(Lcast, 'priya'), dad = cast(Lcast, 'dad');
  const rex = cast(Lfront, 'rex');
  const roomby = cast(Lfront, 'roomby', { s: 0.42 });
  op(boy.tools.scissors, 0); op(boy.tools.broom, 1);      // the broom stays in his hand all weekend
  // Dad's drill and bracket
  const drill = G(dad.hand);
  E('rect', { x: -12, y: -40, width: 26, height: 44, rx: 6, fill: '#2A3340', stroke: SC_INK, 'stroke-width': 3 }, drill);   // grip
  E('path', { d: 'M-22,-84 L40,-84 Q52,-84 52,-70 L52,-52 Q52,-40 40,-40 L-22,-40 Z', fill: '#FFC247', stroke: SC_INK, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, drill);
  E('rect', { x: -40, y: -72, width: 20, height: 20, rx: 3, fill: '#5A6670', stroke: SC_INK, 'stroke-width': 3 }, drill);   // chuck
  const bit = E('path', { d: 'M-40,-62 L-92,-62', stroke: '#C9D3DC', 'stroke-width': 6, 'stroke-linecap': 'round' }, drill);
  const dBr = G(dad.hand);
  E('path', { d: mkPoly([[-30, -10], [-30, -100], [46, -10]]), fill: WOOD, stroke: WOOD_DK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, dBr);
  E('path', { d: 'M-30,-24 L-16,-24 L-16,-10', fill: 'none', stroke: WOOD_DK, 'stroke-width': 3 }, dBr);
  // Mum's isosceles bracket
  const mBr = G(mum.hand);
  E('path', { d: mkPoly([[-30, -10], [30, -10], [0, -10 - 60 / (2 * Math.tan(rad(20)))]]), fill: WOOD, stroke: WOOD_DK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, mBr);
  tr(mBr, 0, 0, 0.6);
  const lt = { tan: agLowerThird(Lhud, 'tan') };

  /* cut points */
  const cB = at('why') - 0.06, cC = at('pun') - 0.06;
  const RX = 104, RS = 0.62, RY = 520 - 126 * RS;
  const HS = 0.8, HY = 448, SX = [250, 392, 532];

  return t => {
    const who = scWho(S, t);
    kit.upd(t);
    kit.clock(12 + Math.min(t, 100) / 3600);
    kitWrap.removeAttribute('transform'); islandWrap.removeAttribute('transform'); Lcast.removeAttribute('transform');
    const all = [kav, boy, tan, mum, pri, dad, rex, roomby];
    all.forEach(c => op(c, 0));
    [cNoon, bzz, thud, cUp, cTeach, cAdd, phone, cRule, cBoth, stamp, cAcute, cCute].forEach(e => op(e, 0));
    lt.tan.set(0);
    op(card, 0); op(plWrap, 0); op(baby, 0);
    op(drill, 0); op(dBr, 0); op(dad.tools.protractor, 0); op(mBr, 0);
    const show = (c, x, y, s, st, r) => { op(c, 1); tr(c, x, y, s, r); c.set(Object.assign({ t }, st)); };
    const LK = 0.85;   // looking at the card (to the right)

    if (t < cB) {
      /* ================= A: noon, the drill, Mr Tan ================= */
      op(shelf, 1); op(holes, 1);
      const push = P(t, 0, cB, linear);
      [kitWrap, islandWrap, Lcast].forEach(el => view(el, 1 + 0.04 * push, 600, 420, 600, 420));
      const drilling = t < end('noon') + 0.2;
      const buzz = drilling && t > mid('noon', 0.1) ? 1 : 0;
      if (t < at('tan')) popIn(cNoon, t, at('noon') + 0.1, 300, 200);
      if (buzz) { op(bzz, 1); tr(bzz, 600 + Math.sin(t * 60) * 3 * AMP, 260, 1, -6); }
      if (t > mid('noon', 0.5) && t < at('tan') + 1.2) {
        op(thud, 1 - fade(t, at('tan') + 0.9));
        const j = Math.sin(t * 30) > 0 ? 1 : 0;
        tr(thud, 900, 82 + j * 4 * AMP, 1 + 0.06 * j);
        dust.forEach((d, i) => attr(d, 'cy', 20 + ((t * 80 + i * 23) % 60)));
      }
      // Dad drills (smug), then the bracket
      const brk = t >= at('bracket') - 0.1;
      op(drill, brk ? 0 : 1); op(dBr, brk ? 1 : 0);
      attr(bit, 'transform', buzz ? `translate(${(Math.sin(t * 70) * 2).toFixed(1)} 0)` : '');
      let dM = 'smug', dL = -0.9, dLift = 1;
      if (!brk && t > at('tan')) { dM = t < mid('tan', 0.3) ? 'shock' : 'neutral'; dL = 0.9; dLift = 0.5; }
      if (brk) { dM = 'smug'; dL = t < mid('bracket', 0.3) ? -0.3 : 0; dLift = 1; }
      show(dad, 760 + (buzz ? Math.sin(t * 55) * 1.5 * AMP : 0), 440, 0.85, { talk: scTalk(S, t, 'dad'), mood: dM, look: dL, lift: dLift });
      // Kavya and Ah Boy
      let kM = 'neutral', kL = 0.6, kSw = 0;
      if (t > at('tan')) { kM = t < mid('tan', 0.45) ? 'shock' : 'sad'; kL = 0.9; kSw = t > mid('tan', 0.5) ? 1 : 0; }
      if (t > at('bracket')) { kM = 'deadpan'; kL = 0.7; kSw = 0; }
      show(kav, 160, 446, 0.85, { mood: kM, look: kL, sweat: kSw });
      show(boy, 330, 458, 0.85, { mood: t > at('tan') && t < at('bracket') ? 'shock' : 'happy', look: t > at('tan') ? 0.9 : 0.6, lift: 0.3 });
      // Mr Tan comes in at the right
      if (t >= at('tan') - 0.3) {
        const inP = P(t, at('tan') - 0.3, 0.45, easeOut);
        let tM = 'deadpan', tL = -0.9;
        if (t > at('bracket')) { tM = t < mid('bracket', 0.8) ? 'deadpan' : 'annoyed'; }
        show(tan, lerp(1320, 1010, inP), 444, 0.85, { talk: scTalk(S, t, 'tan'), mood: tM, look: tL, lift: 0 });
        lt.tan.set(win(t, at('tan') + 0.1, at('tan') + 3.6, 0.3));
        if (t < at('bracket')) {
          popIn(cUp, t, mid('tan', 0.12), 1000, 200);
          if (t > mid('tan', 0.5)) popIn(cTeach, t, mid('tan', 0.5), 360, 230);
        }
      }
      if (brk) {
        popIn(cAdd, t, mid('bracket', 0.25), 760, 236);
        if (t > mid('bracket', 0.7)) {
          const p = P(t, mid('bracket', 0.7), 0.4, pop), out = P(t, end('bracket') + 0.1, 0.25, linear);
          op(phone, clamp(p * 2.5) * (1 - out)); tr(phone, 560, 206 + 30 * out, Math.max(0.01, 0.45 * (0.6 + 0.4 * p)), -6);
          phone.set(0.5); tr(phone.speed, 0, 122, 1 + 0.12 * Math.max(0, Math.sin(t * 9)));
        }
      }
      return;
    }

    if (t >= cC) {
      /* ================= C: the pun, to silence ================= */
      op(shelf, 0); op(holes, 0);
      const push = P(t, cC, 6, linear);
      [kitWrap, islandWrap, Lcast].forEach(el => view(el, 1 + 0.03 * push, 600, 440, 600, 440));
      const laugh = t >= at('cute') - 0.1;
      const lk = (x) => (x < 1020 ? 0.9 : -0.9);
      const bob = laugh ? Math.abs(Math.sin(t * 9)) * 6 * AMP : 0;
      show(kav, 140, 446, 0.78, { mood: 'deadpan', look: laugh ? 0.7 : 0.9 });
      show(mum, 320, 446, 0.78, { mood: 'deadpan', look: laugh ? 0.6 : 0.9, lift: 0 });
      show(pri, 500, 446, 0.78, { mood: 'deadpan', look: laugh ? 0.6 : 0.9 });
      show(dad, 680, 446, 0.78, { mood: 'deadpan', look: laugh ? 0.4 : 0.9, lift: 0 });
      show(boy, 860, 458 - bob, 0.8, { talk: scTalk(S, t, 'boy'), mood: laugh ? 'happy' : 'neutral', look: laugh ? 0 : lk(860), lift: laugh ? 1 : 0.3 });
      show(tan, 1030, 446, 0.78, { talk: scTalk(S, t, 'tan'), mood: laugh ? 'happy' : (t > end('pun') ? 'smug' : 'happy'), look: laugh ? -0.8 : -0.5, lift: laugh ? 0 : 0.6 });
      if (!laugh) popIn(cAcute, t, mid('pun', 0.55), 820, 230);
      else popIn(cCute, t, at('cute') + 0.05, 860, 220);
      // Roomby drives silently across the bottom of the frame in the pause
      const r0 = end('pun') + 0.05, rp = clamp((t - r0) / 1.6);
      if (rp > 0 && rp < 1) { show(roomby, lerp(-160, 1360, rp), 668, 0.42, { mood: 'deadpan', look: 1, spin: 1, still: true }); }
      return;
    }

    /* ================= B: the card shot ================= */
    op(shelf, 0); op(holes, 0);
    op(card, 1);
    op(tw, 0); op(pf, 0); op(iso, 0); op(cs, 0); op(ex, 0);
    // who stands where
    let cast3;
    if (t < at('forty') - 0.06) cast3 = ['kav', 'boy', 'tan'];
    else if (t < at('50') - 0.06) cast3 = ['mum', 'kav', 'tan'];
    else if (t < at('ext') - 0.06) cast3 = ['pri', 'kav', 'tan'];
    else cast3 = ['dad', 'kav', 'tan'];
    const st = {
      kav: { mood: 'neutral', look: LK }, boy: { mood: 'neutral', look: LK, lift: 0.3 }, tan: { mood: 'neutral', look: LK, lift: 0 },
      mum: { mood: 'neutral', look: LK, lift: 0 }, pri: { mood: 'neutral', look: LK }, dad: { mood: 'neutral', look: LK, lift: 0 },
    };
    let rM = 'deadpan', rL = 0.8;

    if (t < at('draw') - 0.06) {
      /* --- why: three triangles, with "?" --- */
      op(tw, 1);
      op(whyT, fade(t, at('why') + 0.05)); op(evF, 0); op(evT, 0); op(eq60, 0);
      tks.forEach(k => op(k, 0));
      qs.forEach((q, i) => { const p = P(t, mid('why', 0.15 + i * 0.22), 0.4, pop); op(q, clamp(p * 2.5)); attr(q, 'transform', `translate(0 ${(-6 * Math.sin(t * 6 + i)).toFixed(1)})`); });
      st.boy = { mood: 'shock', look: LK, lift: 0.3 }; st.kav = { mood: 'neutral', look: -0.3 }; st.tan = { mood: 'smug', look: -0.8, lift: 0 };
    } else if (t < at('every') - 0.06) {
      /* --- draw, honour, baby, proof --- */
      op(pf, 1);
      const pDraw = P(t, mid('draw', 0.02), 1.2, ease);
      mkDraw(triEl, pDraw); op(triFill, clamp((pDraw - 0.7) / 0.3));
      [wA, wB, wC].forEach((w, i) => op(w, fade(t, mid('draw', 0.22 + i * 0.07))));
      [lA, lB, lC].forEach((l, i) => op(l, fade(t, mid('draw', 0.25 + i * 0.07))));
      const dp = P(t, mid('draw', 0.45), 0.8, ease);
      attr(dash, 'x2', lerp(680, 1150, dp)); op(dash, dp > 0 ? 1 : 0);
      op(parT, fade(t, mid('draw', 0.6)));
      op(arrowsG, fade(t, mid('draw', 0.8)));
      // Para and Lel slide in from the right to BE the two lines
      const inP = P(t, at('honour') - 0.05, 0.7, easeOut);
      if (inP > 0) {
        op(plWrap, 1); tr(plWrap, lerp(PL_X + 620, PL_X, inP), PL_Y);
        op(dash, 1 - inP); op(arrowsG, 1 - inP);
        const baby1 = t >= at('baby');
        parlel.set({ t, talk: scTalk(S, t, 'para'), talkB: scTalk(S, t, 'lel'), mood: baby1 ? (t < mid('baby', 0.45) ? 'shock' : 'happy') : (t > at('proof') ? 'neutral' : 'smug'), moodB: baby1 ? 'happy' : 'neutral', look: baby1 ? 0.3 : 0.5, lookB: baby1 ? 0.5 : 0.5 });
      }
      op(parT, t < at('honour') ? fade(t, mid('draw', 0.6)) : 1 - fade(t, at('honour')));
      // Little Lel
      if (t >= mid('baby', 0.3) && t < at('proof') - 0.06) { const p = P(t, mid('baby', 0.3), 0.4, pop); op(baby, clamp(p * 2.5)); tr(baby, 0, 0); }
      // proof: copies of a and b glide up into the top corner; with c, a straight line
      const gl = P(t, mid('proof', 0.12), 1.4, ease);
      const proofOn = t >= at('proof') - 0.06;
      op(mvA, proofOn ? 1 : 0); op(mvB, proofOn ? 1 : 0); op(mlA, proofOn ? 1 : 0); op(mlB, proofOn ? 1 : 0);
      if (proofOn) {
        const lift = Math.sin(gl * Math.PI) * 40;
        const ax = lerp(PA[0], PC[0], gl), ay = lerp(PA[1], PC[1], gl) - lift, ra = 180 * gl;
        const bx = lerp(PB[0], PC[0], gl), by = lerp(PB[1], PC[1], gl) - lift, rb = -180 * gl;
        tr(mvA, ax, ay, 1, ra); tr(mvB, bx, by, 1, rb);
        const ma = angA / 2 - ra, mb = 180 - angB / 2 - rb;
        const qa = pt(ax, ay, 84, ma), qb = pt(bx, by, 84, mb);
        tr(mlA, qa[0], qa[1]); tr(mlB, qb[0], qb[1]);
        op(mlA, gl >= 0.98 ? 1 : 0); op(mlB, gl >= 0.98 ? 1 : 0);
        mkDraw(zA, P(t, mid('proof', 0.3), 0.6, ease)); mkDraw(zB, P(t, mid('proof', 0.4), 0.6, ease));
        op(zA, gl < 1 || t < mid('proof', 0.95) ? 1 : 0.4); op(zB, gl < 1 || t < mid('proof', 0.95) ? 1 : 0.4);
        op(altT, fade(t, mid('proof', 0.3)));
        op(strT, fade(t, mid('proof', 0.68)));
        op(straight, fade(t, mid('proof', 0.7)));
        if (t > mid('proof', 0.7)) wC.firstChild.setAttribute('opacity', 0.38 + 0.2 * Math.max(0, Math.sin(t * 8)));
      } else { op(zA, 0); op(zB, 0); op(altT, 0); op(strT, 0); op(straight, 0); }
      if (t < at('honour')) { st.tan = { mood: 'neutral', look: LK, lift: t < end('draw') ? 1 : 0 }; st.kav = { mood: 'neutral', look: LK }; st.boy = { mood: 'neutral', look: LK, lift: 0.3 }; }
      else if (t < at('proof')) {
        const b = t >= at('baby');
        st.tan = { mood: b ? 'deadpan' : 'happy', look: LK, lift: 0 }; st.kav = { mood: b ? 'deadpan' : 'neutral', look: LK }; st.boy = { mood: b ? 'deadpan' : 'happy', look: LK, lift: 0.3 };
        rM = b ? 'deadpan' : 'neutral';
      } else { st.kav = { mood: t > mid('proof', 0.7) ? 'smug' : 'neutral', look: LK }; st.boy = { mood: t > mid('proof', 0.6) ? 'happy' : 'shock', look: LK, lift: 0.3 }; st.tan = { mood: 'happy', look: -0.5, lift: 0 }; }
    } else if (t < at('forty') - 0.06) {
      /* --- every: a + b + c = 180° for every triangle --- */
      op(tw, 1); op(whyT, 0); qs.forEach(q => op(q, 0));
      op(evF, fade(t, at('every') + 0.05)); op(evT, fade(t, mid('every', 0.3)));
      tks.forEach((k, i) => { const p = P(t, mid('every', 0.32 + i * 0.07), 0.35, pop); op(k, clamp(p * 2.5)); tr(k, (T3[i][0][0] + T3[i][1][0]) / 2, 300, Math.max(0.01, 0.6 + 0.4 * p)); });
      op(eq60, fade(t, mid('every', 0.72)));
      if (t > mid('every', 0.5)) { op(stamp, 1); stamp.set(P(t, mid('every', 0.5), 0.35, linear)); tr(stamp, 300, 214, 0.46); }
      rM = t > mid('every', 0.5) ? 'smug' : 'neutral'; rL = 0.8;
      st.tan = { mood: 'smug', look: LK, lift: 1 }; st.kav = { mood: 'happy', look: LK }; st.boy = { mood: 'happy', look: LK, lift: 0.3 };
    } else if (t < at('50') - 0.06) {
      /* --- forty, 70: Mum's isosceles bracket --- */
      op(iso, 1);
      const in70 = t >= at('70') - 0.06;
      op(l70, in70 ? fade(t, mid('70', 0.45)) : 0); op(baseLab, in70 ? 1 - fade(t, mid('70', 0.45)) : fade(t, mid('forty', 0.6)));
      op(isoTxt, in70 ? 0 : fade(t, mid('forty', 0.15)));
      op(w70, in70 ? 1 : 0); w70.show(0, P(t, mid('70', 0.05), 0.35, linear)); w70.show(1, P(t, mid('70', 0.3), 0.35, linear)); w70.ring(1, P(t, mid('70', 0.42), 0.3, linear));
      op(w70b, in70 ? fade(t, mid('70', 0.6)) : 0); op(w70tk, fade(t, mid('70', 0.9)));
      op(mBr, 1);
      st.mum = { mood: in70 ? 'happy' : 'neutral', look: in70 ? 0.4 : LK, lift: in70 ? 0 : 1 };
      st.kav = { mood: in70 && t > mid('70', 0.5) ? 'smug' : 'neutral', look: in70 ? LK : -0.6 };
      st.tan = { mood: in70 ? 'happy' : 'neutral', look: in70 ? -0.6 : -0.9, lift: 0 };
    } else if (t < at('ext') - 0.06) {
      /* --- 50, cases: two cases --- */
      op(cs, 1);
      const inC = t >= at('cases') - 0.06;
      op(case1, fade(t, at('50') + 0.05)); op(w50, fade(t, mid('50', 0.55)));
      op(case2, inC ? fade(t, mid('cases', 0.18)) : 0); op(cDiv, inC ? fade(t, mid('cases', 0.15)) : 0);
      op(w65, inC ? fade(t, mid('cases', 0.45)) : 0);
      if (inC) popIn(cBoth, t, mid('cases', 0.68), 330, 214);
      st.pri = { mood: inC ? (t > mid('cases', 0.6) ? 'annoyed' : 'shock') : 'smug', look: inC ? 0.9 : LK };
      st.kav = { mood: inC ? 'smug' : 'deadpan', look: inC ? LK : -0.7 };
      st.tan = { mood: inC ? 'smug' : 'neutral', look: inC ? LK : -0.9, lift: inC ? 1 : 0 };
      rM = inC ? 'smug' : 'deadpan';
    } else {
      /* --- ext, 39: the shelf's exterior angle --- */
      op(ex, 1);
      const in39 = t >= at('39') - 0.06;
      const relab = in39 ? fade(t, mid('39', 0.42), 0.35) : 0;
      op(exW, fade(t, mid('ext', 0.15))); op(l117, fade(t, mid('ext', 0.2))); op(exT, in39 ? 1 : fade(t, mid('ext', 0.2)));
      const hiOn = t >= mid('ext', 0.5);
      op(xW, hiOn ? 1 : 0.35); op(x2W, hiOn ? 1 : 0.35);
      if (hiOn && !in39) { const f = 0.4 + 0.25 * Math.max(0, Math.sin(t * 8)); xW.firstChild.setAttribute('opacity', f); x2W.firstChild.setAttribute('opacity', f); }
      else { xW.firstChild.setAttribute('opacity', 0.38); x2W.firstChild.setAttribute('opacity', 0.38); }
      op(lx, (hiOn ? 1 : 0.6) * (1 - relab)); op(lx2, (hiOn ? 1 : 0.6) * (1 - relab));
      op(l39, relab); op(l78, relab);
      op(l63, in39 ? fade(t, mid('39', 0.7)) : 0); op(rW, in39 ? 0.6 + 0.4 * fade(t, mid('39', 0.62)) : 0.6);
      op(ex117, in39 ? 0 : fade(t, mid('ext', 0.55)));
      const sw = in39 ? fade(t, mid('39', 0.55), 0.3) : 0;
      op(w39, in39 ? 1 - sw : 0);
      w39.show(0, P(t, mid('39', 0.02), 0.35, linear)); w39.show(1, P(t, mid('39', 0.14), 0.35, linear)); w39.show(2, P(t, mid('39', 0.24), 0.35, linear)); w39.ring(2, P(t, mid('39', 0.3), 0.3, linear));
      op(w63, sw); w63.show(0, P(t, mid('39', 0.6), 0.35, linear)); w63.show(1, P(t, mid('39', 0.82), 0.35, linear)); w63.ring(0, P(t, mid('39', 0.72), 0.3, linear));
      op(w63tk, in39 ? fade(t, mid('39', 0.92)) : 0);
      popIn(cRule, t, mid('ext', 0.3), 336, 214);
      op(dBr, 1);
      st.dad = { mood: in39 ? 'deadpan' : 'smug', look: in39 ? LK : 0.9, lift: in39 ? 0 : 1 };
      st.kav = { mood: in39 ? (t > mid('39', 0.4) ? 'smug' : 'neutral') : 'neutral', look: LK };
      st.tan = { mood: in39 ? 'happy' : 'neutral', look: in39 ? -0.6 : LK, lift: in39 ? 0 : 1 };
      rM = in39 && t > mid('39', 0.9) ? 'smug' : 'deadpan';
    }
    // listeners turn to the speaker (left = -), the speaker faces the card
    const pos = { kav: 0, boy: 1, mum: 0, pri: 0, dad: 0, tan: 2 };
    cast3.forEach((k, i) => pos[k] = i);
    const WHO = { kavya: 'kav', boy: 'boy', tan: 'tan', mum: 'mum', priya: 'pri', dad: 'dad' }[who];
    if (WHO && cast3.includes(WHO)) cast3.forEach(k => { if (k !== WHO && st[k].look === LK) st[k].look = pos[WHO] < pos[k] ? -0.8 : 0.8; });
    if (who === 'para' || who === 'lel') cast3.forEach(k => { st[k].look = LK; });
    const C3 = { kav, boy, tan, mum, pri, dad }, TALK = { kav: 'kavya', boy: 'boy', tan: 'tan', mum: 'mum', pri: 'priya', dad: 'dad' };
    cast3.forEach((k, i) => show(C3[k], SX[i], k === 'boy' ? 462 : HY, HS, Object.assign({ talk: scTalk(S, t, TALK[k]) }, st[k])));
    show(rex, RX, RY, RS, { mood: rM, look: rL, open: 90 });
  };
});
