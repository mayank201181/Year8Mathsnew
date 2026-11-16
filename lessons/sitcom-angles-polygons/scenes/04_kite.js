/* Scene 4: Kitty the kite (quadrilaterals).
   2 p.m. in the kitchen: Ah Boy tapes a kite from a tile box for kite day at Marina Barrage -> Kitty wakes up: two
   pairs of equal sides next to each other, diagonals at 90 degrees -> one diagonal makes two triangles: 2 x 180 = 360
   -> Kitty's angles 2x, 3x, 3x, 80: 8x + 80 = 360, 8x = 280, x = 35 -> 70, 105, 105, 80 -> Priya: squares aren't
   rectangles; REJECTED: a rectangle only needs four right angles -> the family tree (the square is a show-off) ->
   Mum's parallelogram: opposite angles equal, neighbours co-interior -> Dad's wonky tile: 85 + 110 + 72 = 267,
   360 - 267 = 93 -> Mr Tan's puzzle: diagonals bisect at 90 but aren't equal: not a square; a rhombus. */
scene('kite', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const fade = (el, t, t0, d) => op(el, P(t, t0, d || 0.3, linear));
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 3, color: o.color || C.ink, weight: 700 }); };
  const GOLD = '#FFE45C', INK = MK.ink, RED = '#C62828', GREEN = '#1E9E5A', BLUE = '#1864AB', BERRY = '#B8336A', OR = '#D9480F';
  const R2D = Math.PI / 180;
  const ptS = p => p[0].toFixed(1) + ',' + p[1].toFixed(1);
  // a tick mark (or two) across the segment a-b at its midpoint
  const ticks = (parent, a, b, n, col, len) => {
    const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, L = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const ux = (b[0] - a[0]) / L, uy = (b[1] - a[1]) / L, nx = -uy, ny = ux, h = (len || 24) / 2;
    let d = '';
    for (let k = 0; k < n; k++) { const o = (k - (n - 1) / 2) * 10; const cx = mx + ux * o, cy = my + uy * o; d += `M${(cx - nx * h).toFixed(1)},${(cy - ny * h).toFixed(1)} L${(cx + nx * h).toFixed(1)},${(cy + ny * h).toFixed(1)} `; }
    return E('path', { d, stroke: col || INK, 'stroke-width': 5, 'stroke-linecap': 'round' }, parent);
  };
  // the arrow mark of a parallel side (n chevrons) at the middle of a-b, pointing from a to b
  const arrows = (parent, a, b, n, col) => {
    const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, L = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const ux = (b[0] - a[0]) / L, uy = (b[1] - a[1]) / L, nx = -uy, ny = ux;
    let d = '';
    for (let k = 0; k < n; k++) { const o = (k - (n - 1) / 2) * 14; const cx = mx + ux * o, cy = my + uy * o; d += `M${(cx - ux * 10 + nx * 11).toFixed(1)},${(cy - uy * 10 + ny * 11).toFixed(1)} L${cx.toFixed(1)},${cy.toFixed(1)} L${(cx - ux * 10 - nx * 11).toFixed(1)},${(cy - uy * 10 - ny * 11).toFixed(1)} `; }
    return E('path', { d, fill: 'none', stroke: col || RED, 'stroke-width': 4.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, parent);
  };
  const paper = (parent, x, y, w, h) => {
    E('rect', { x: x + 6, y: y + 6, width: w, height: h, rx: 16, fill: 'rgba(0,0,0,0.25)' }, parent);
    return E('rect', { x, y, width: w, height: h, rx: 16, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, parent);
  };
  const corner = (parent, v, a, b, label, col, o) => { const m = mkCorner(parent, v, a, b, Object.assign({ r: 34, label, col: col || OR, size: 30, lr: 62, labelCol: col || OR }, o || {})); m.set(1); return m; };

  /* layers */
  const Lset = G(root), Lcast = G(root), Lfront = G(root), Lchar = G(root), Lboard = G(root), Lhud = G(root);

  /* ================= the kitchen ================= */
  const kit = agKitchen(Lset);
  Lfront.appendChild(kit.front); Lfront.appendChild(kit.top);
  kit.clock(14);
  const box = agTileBox(kit.top); tr(box, 980, kit.counterY + 4, 0.75);
  const tape = E('rect', { x: -30, y: -8, width: 60, height: 16, rx: 3, fill: '#E8D9B8', stroke: '#B59E74', 'stroke-width': 2, opacity: 0.95 }, Lhud);

  /* ================= A: Kitty wakes up ================= */
  const kitty = cast(Lchar, 'kitty');
  const kOver = G(kitty.firstChild);    // drawn in Kitty's own (bobbing) frame
  const KT = [0, -130], KR = [92, -40], KB = [0, 150], KL = [-92, -40];
  const sparGlow = G(kOver);
  E('path', { d: 'M0,-126 L0,146 M-88,-40 L88,-40', stroke: GOLD, 'stroke-width': 12, 'stroke-linecap': 'round', opacity: 0.85 }, sparGlow);
  E('path', { d: 'M0,-70 L30,-70 L30,-40', fill: 'none', stroke: SC_INK, 'stroke-width': 9 }, sparGlow);
  E('path', { d: 'M0,-70 L30,-70 L30,-40', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 5 }, sparGlow);
  const kTicks1 = G(kOver), kTicks2 = G(kOver);
  [[KT, KR], [KT, KL]].forEach(([a, b]) => { const e1 = ticks(kTicks1, a, b, 1, SC_INK, 30); e1.setAttribute('stroke-width', 10); ticks(kTicks1, a, b, 1, '#FFFFFF', 26); });
  [[KR, KB], [KL, KB]].forEach(([a, b]) => { const e1 = ticks(kTicks2, a, b, 2, SC_INK, 30); e1.setAttribute('stroke-width', 10); ticks(kTicks2, a, b, 2, '#FFFFFF', 26); });

  const cTwo = pill(Lhud, '2 p.m.', { size: 34, color: GOLD, stroke: GOLD });
  const cDay = mkChip(Lhud, 'kite day: **Marina Barrage**', { size: 30, col: '#9FD8FF' });
  const cK1 = mkChip(Lhud, '**2 pairs** of equal sides', { size: 30, col: GOLD });
  const cK2 = mkChip(Lhud, '**next to** each other', { size: 30, col: GOLD });
  const cK3 = mkChip(Lhud, 'diagonals at **90°**', { size: 30, col: '#7EE08A' });

  /* ================= the card (shots B to F) ================= */
  const CX0 = 620, CY0 = 96, CW = 550, CH = 414, CMX = CX0 + CW / 2;
  const cardBg = G(Lboard); paper(cardBg, CX0, CY0, CW, CH);
  const txt = (parent, x, y, s, o) => mkText(parent, x, y, s, Object.assign({ size: 30, anchor: 'middle', fill: INK, boldFill: BERRY }, o || {}));

  // B1 diag: any quadrilateral, one diagonal, two triangles
  const bD = G(Lboard);
  const Q = [[670, 205], [990, 165], [1125, 395], [720, 420]];
  E('path', { d: mkPoly([Q[0], Q[1], Q[2]]), fill: 'rgba(255,194,71,0.45)' }, bD);
  E('path', { d: mkPoly([Q[0], Q[2], Q[3]]), fill: 'rgba(76,201,240,0.4)' }, bD);
  const qOut = mkDash(E('path', { d: mkPoly(Q), fill: 'none', stroke: INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, bD));
  const qDiag = mkDash(E('path', { d: `M${ptS(Q[0])} L${ptS(Q[2])}`, stroke: RED, 'stroke-width': 5, 'stroke-dasharray': '1 1' }, bD));
  const tri1 = mkMath(bD, (Q[0][0] + Q[1][0] + Q[2][0]) / 3, (Q[0][1] + Q[1][1] + Q[2][1]) / 3 + 12, '180°', { size: 34, anchor: 'middle', fill: '#8A5A08', weight: 700 });
  const tri2 = mkMath(bD, (Q[0][0] + Q[2][0] + Q[3][0]) / 3, (Q[0][1] + Q[2][1] + Q[3][1]) / 3 + 12, '180°', { size: 34, anchor: 'middle', fill: '#145A75', weight: 700 });
  const dTop = txt(bD, 640, 146, 'one **diagonal** → two triangles', { anchor: 'start', size: 28 });
  const dSum = mkMath(bD, CMX, 478, '2 × 180° = 360°', { size: 40, anchor: 'middle', fill: INK, weight: 700 });

  // B2 x / 35: Kitty's angles, drawn true (80, 105, 105, 70)
  const bX = G(Lboard);
  const kc = [735, 285], KW = 90, KA = KW / Math.tan(40 * R2D), KBt = KW / Math.tan(35 * R2D);
  const kT = [kc[0], kc[1] - KA], kR = [kc[0] + KW, kc[1]], kB = [kc[0], kc[1] + KBt], kL = [kc[0] - KW, kc[1]];
  E('path', { d: mkPoly([kT, kR, kc]), fill: 'rgba(232,66,79,0.35)' }, bX); E('path', { d: mkPoly([kT, kL, kc]), fill: 'rgba(255,194,71,0.45)' }, bX);
  E('path', { d: mkPoly([kB, kR, kc]), fill: 'rgba(255,194,71,0.45)' }, bX); E('path', { d: mkPoly([kB, kL, kc]), fill: 'rgba(232,66,79,0.35)' }, bX);
  E('path', { d: mkPoly([kT, kR, kB, kL]), fill: 'none', stroke: INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, bX);
  ticks(bX, kT, kR, 1); ticks(bX, kT, kL, 1); ticks(bX, kR, kB, 2); ticks(bX, kL, kB, 2);
  const angX = G(bX), angN = G(bX);
  corner(angX, kT, kL, kR, '80°', OR, { lr: 66 }); corner(angX, kR, kT, kB, '3x', BLUE, { lr: 52 }); corner(angX, kL, kB, kT, '3x', BLUE, { lr: 52 }); corner(angX, kB, kR, kL, '2x', GREEN, { lr: 70 });
  corner(angN, kT, kL, kR, '80°', OR, { lr: 66 }); corner(angN, kR, kT, kB, '105°', BLUE, { lr: 52, size: 28 }); corner(angN, kL, kB, kT, '105°', BLUE, { lr: 52, size: 28 }); corner(angN, kB, kR, kL, '70°', GREEN, { lr: 70 });
  const xTitle = txt(bX, 640, 146, "Kitty's angles", { anchor: 'start', size: 28, fill: BERRY });
  const wLines = ['2x + 3x + 3x + 80 = 360', '8x + 80 = 360', '8x = 280', 'x = 35'];
  const wm = mkMeasure('2x + 3x + 3x + 80', { size: 30 }), wr = mkMeasure('360', { size: 30 });
  const work = mkWorking(bX, 1150 - wr.w - 14, 128, wLines, { size: 30, fill: INK, gap: 14 });
  const xCheck = G(bX);
  mkMath(xCheck, CMX - 20, 482, '70 + 105 + 105 + 80 = 360', { size: 32, anchor: 'middle', fill: GREEN, weight: 700 });
  const ck = tick(xCheck, 14, GREEN); tr(ck, CMX + mkMeasure('70 + 105 + 105 + 80 = 360', { size: 32 }).w / 2 + 6, 470);
  void wm;

  // C1 sq / rect: a square tile and a rectangle
  const bS = G(Lboard);
  const sq = [[680, 220], [840, 220], [840, 380], [680, 380]], re = [[900, 250], [1150, 250], [1150, 380], [900, 380]];
  E('path', { d: mkPoly(sq), fill: '#2E6E8E', stroke: INK, 'stroke-width': 5 }, bS);
  E('path', { d: mkPoly(re), fill: '#F4F1E8', stroke: INK, 'stroke-width': 5 }, bS);
  txt(bS, 760, 428, 'square', { size: 30 }); txt(bS, 1025, 428, 'rectangle', { size: 30 });
  const rtS = G(bS), rtR = G(bS);
  const sqMarks = (g, pts, col) => pts.forEach((v, i) => mkCorner(g, v, pts[(i + 1) % 4], pts[(i + 3) % 4], { r: 34, col, width: 5 }).set(1));
  sqMarks(rtS, sq, GOLD); sqMarks(rtR, re, RED);
  const sQ = mkChip(bS, 'square **≠** rectangle?', { size: 30, col: RED, fill: '#FFE4E4', textCol: INK }); tr(sQ, CMX, 150);
  const sDef = txt(bS, CMX, 486, 'rectangle: **four right angles**', { size: 30 });
  const sEvery = txt(bS, CMX, 162, 'every square **is** a rectangle', { size: 32, boldFill: GREEN });
  const stRej = agStamp(Lhud, false);

  // C2 tree: the family tree of quadrilaterals
  const bT = G(Lboard);
  const icon = (g, kind, x, y) => {
    const s = 34, h = 20;
    const P2 = {
      quad: [[-30, 16], [24, 20], [32, -18], [-14, -20]],
      trap: [[-34, 18], [34, 18], [18, -18], [-18, -18]],
      para: [[-36, 18], [20, 18], [36, -18], [-20, -18]],
      kite: [[0, -24], [20, -6], [0, 24], [-20, -6]],
      rect: [[-36, 18], [36, 18], [36, -18], [-36, -18]],
      rhom: [[0, -24], [36, 0], [0, 24], [-36, 0]],
      square: [[-22, 22], [22, 22], [22, -22], [-22, -22]],
    }[kind];
    void s; void h;
    return E('path', { d: mkPoly(P2.map(p => [p[0] + x, p[1] + y])), fill: kind === 'square' ? '#FFE9A8' : kind === 'kite' ? '#FFC9CF' : '#DCEFF0', stroke: INK, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, g);
  };
  const NODES = {
    quad: ['Quadrilateral', 895, 0], trap: ['Trapezium', 712, 1], para: ['Parallelogram', 895, 1], kite: ['Kite', 1080, 1],
    rect: ['Rectangle', 800, 2], rhom: ['Rhombus', 990, 2], square: ['Square', 895, 3],
  };
  const rowY = r => [150, 254, 358, 462][r];
  const EDGES = [['quad', 'trap'], ['quad', 'para'], ['quad', 'kite'], ['para', 'rect'], ['para', 'rhom'], ['kite', 'rhom'], ['rect', 'square'], ['rhom', 'square']];
  const edgeG = G(bT), nodeG = G(bT);
  const edges = EDGES.map(([a, b]) => {
    const A = NODES[a], B = NODES[b];
    return E('path', { d: `M${A[1]},${rowY(A[2]) + 10} L${B[1]},${rowY(B[2]) - 54}`, stroke: '#8FA3B8', 'stroke-width': 4, 'stroke-linecap': 'round' }, edgeG);
  });
  const nodes = {}, glows = {};
  Object.entries(NODES).forEach(([k, [name, x, r]]) => {
    const g = G(nodeG), y = rowY(r);
    const w = textWidth(name, 28, FD, 700) + 24;
    glows[k] = E('rect', { x: x - w / 2, y: y - 64, width: w, height: 76, rx: 12, fill: 'rgba(255,212,59,0.55)', stroke: '#F2A20C', 'stroke-width': 3 }, g);
    icon(g, k, x, y - 40);
    T(g, x, y, name, { size: 28, weight: 700, anchor: 'middle', fill: INK });
    nodes[k] = g;
  });
  const crown = G(bT); tr(crown, 955, 422);
  E('path', { d: 'M-22,10 L-26,-16 L-12,-4 L0,-22 L12,-4 L26,-16 L22,10 Z', fill: '#FFC247', stroke: INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, crown);
  const cShow = mkChip(bT, '**show-off**', { size: 26, col: BERRY, fill: '#FFE4F0', textCol: INK }); tr(cShow, 1072, 432);

  // D para: Mum's parallelogram
  const bP = G(Lboard);
  const pBL = [690, 410], pBR = [990, 410], pTR = [1100, 190], pTL = [800, 190];
  E('path', { d: mkPoly([pBL, pBR, pTR, pTL]), fill: 'rgba(184,51,106,0.12)', stroke: INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, bP);
  arrows(bP, pBL, pBR, 1); arrows(bP, pTL, pTR, 1); arrows(bP, pBL, pTL, 2, BLUE); arrows(bP, pBR, pTR, 2, BLUE);
  const pa = [corner(bP, pBL, pBR, pTL, 'p', OR, { lr: 60 }), corner(bP, pTR, pTL, pBR, 'p', OR, { lr: 60 }),
    corner(bP, pTL, pBL, pTR, '180° − p', GREEN, { lr: 92, size: 28 }), corner(bP, pBR, pTR, pBL, '180° − p', GREEN, { lr: 92, size: 28 })];
  const pC = mkDash(E('path', { d: `M${pBL[0] + 170},${pBL[1]} L${ptS(pBL)} L${ptS(pTL)} L${pTL[0] + 170},${pTL[1]}`, fill: 'none', stroke: '#FFD43B', 'stroke-width': 16, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', opacity: 0.75 }, bP));
  bP.insertBefore(pC, bP.firstChild);
  const pOpp = txt(bP, CMX, 148, 'opposite angles **equal**', { size: 30 });
  const pNb = txt(bP, CMX, 486, 'neighbours add to **180°**: **co-interior**', { size: 28 });

  // E cut / 93: Dad's wonky tile, drawn true (85, 110, 72, 93)
  const bQ = G(Lboard);
  const qA = [0, 0], qB = [300, 0], qC = [300 + 200 * Math.cos(70 * R2D), 200 * Math.sin(70 * R2D)];
  const d1 = [Math.cos(85 * R2D), Math.sin(85 * R2D)], d2 = [Math.cos(178 * R2D), Math.sin(178 * R2D)];
  const det = d1[0] * -d2[1] + d2[0] * d1[1], sQd = (qC[0] * -d2[1] + d2[0] * qC[1]) / det, qD = [sQd * d1[0], sQd * d1[1]];
  const scr = p => [712 + p[0], 360 - p[1]];
  const W4 = [qA, qB, qC, qD].map(scr);
  E('path', { d: mkPoly(W4), fill: '#F4F1E8', stroke: INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, bQ);
  E('path', { d: `M${W4[1][0] - 6},${W4[1][1] - 4} l14,-26 l-10,-14 l12,-24`, fill: 'none', stroke: '#8F887A', 'stroke-width': 3 }, bQ);   // a crack
  corner(bQ, W4[0], W4[1], W4[3], '85°', OR, { lr: 64 }); corner(bQ, W4[1], W4[2], W4[0], '110°', OR, { lr: 64 }); corner(bQ, W4[2], W4[3], W4[1], '72°', OR, { lr: 70 });
  const qQ = G(bQ), q93 = G(bQ);
  corner(qQ, W4[3], W4[0], W4[2], '?', RED, { lr: 62, size: 38 });
  corner(q93, W4[3], W4[0], W4[2], '93°', GREEN, { lr: 64 });
  const q1 = mkMath(bQ, CMX, 432, '85 + 110 + 72 = 267', { size: 34, anchor: 'middle', fill: INK, weight: 700 });
  const q2 = mkMath(bQ, CMX, 484, '360 − 267 = 93°', { size: 34, anchor: 'middle', fill: GREEN, weight: 700 });
  const q2ring = E('rect', { x: CMX - 140, y: 450, width: 280, height: 48, rx: 10, fill: 'none', stroke: GREEN, 'stroke-width': 4 }, bQ);
  const qTitle = txt(bQ, 640, 146, "Dad's tile:", { anchor: 'start', size: 28, fill: BERRY });
  // the little tile in Dad's hand
  const dadTile = G(null || Lhud);

  // F puzzle / square / rhombus
  const bR = G(Lboard);
  const RC = [880, 300], RP = 150, RQ = 95;
  const sqG = G(bR), rhG = G(bR);
  E('path', { d: mkPoly([[RC[0] - RP, RC[1]], [RC[0], RC[1] - RP], [RC[0] + RP, RC[1]], [RC[0], RC[1] + RP]]), fill: 'rgba(198,40,40,0.08)', stroke: RED, 'stroke-width': 5, 'stroke-dasharray': '14 10', 'stroke-linejoin': 'round' }, sqG);
  E('path', { d: `M${RC[0]},${RC[1] - RQ - 8} L${RC[0]},${RC[1] - RP + 8} M${RC[0]},${RC[1] + RQ + 8} L${RC[0]},${RC[1] + RP - 8}`, stroke: RED, 'stroke-width': 3, 'stroke-dasharray': '4 6' }, sqG);
  const sqX = cross(sqG, 22, RED); tr(sqX, RC[0] + 120, RC[1] - 118);
  const sqNote = txt(sqG, 1030, 192, "doesn't fit", { anchor: 'start', size: 26, fill: RED });
  E('path', { d: mkPoly([[RC[0] - RP, RC[1]], [RC[0], RC[1] - RQ], [RC[0] + RP, RC[1]], [RC[0], RC[1] + RQ]]), fill: 'rgba(30,158,90,0.15)', stroke: GREEN, 'stroke-width': 6, 'stroke-linejoin': 'round' }, rhG);
  const rhT = tick(rhG, 18, GREEN); tr(rhT, 1080, 300);
  const rhName = txt(rhG, 1080, 360, '**rhombus**', { size: 34, boldFill: GREEN });
  const dgG = G(bR);
  E('path', { d: `M${RC[0] - RP},${RC[1]} L${RC[0] + RP},${RC[1]} M${RC[0]},${RC[1] - RQ} L${RC[0]},${RC[1] + RQ}`, stroke: INK, 'stroke-width': 6, 'stroke-linecap': 'round' }, dgG);
  ticks(dgG, [RC[0] - RP, RC[1]], RC, 1, BLUE); ticks(dgG, RC, [RC[0] + RP, RC[1]], 1, BLUE);
  ticks(dgG, [RC[0], RC[1] - RQ], RC, 2, OR); ticks(dgG, RC, [RC[0], RC[1] + RQ], 2, OR);
  mkAngleMark(dgG, RC[0], RC[1], 0, 90, { r: 34, col: BERRY, width: 4 }).set(1);
  const rTop = txt(bR, 640, 146, 'Name the shape!', { anchor: 'start', size: 28, fill: BERRY });
  const rBot1 = txt(bR, CMX, 486, 'bisect at **90°**, but **not equal**', { size: 30 });
  const rBot2 = txt(bR, CMX, 486, "a square's diagonals are **equal**", { size: 30, boldFill: RED });
  const boards = [bD, bX, bS, bT, bP, bQ, bR];

  /* ================= the cast ================= */
  const boy = cast(Lcast, 'boy');
  const kav = cast(Lcast, 'kavya');
  const pri = cast(Lcast, 'priya');
  const mum = cast(Lcast, 'mum', { prop: null });
  const dad = cast(Lcast, 'dad');
  const tan = cast(Lcast, 'tan');
  const rex = cast(Lchar, 'rex');
  op(boy.tools.scissors, 0); op(boy.tools.broom, 1);
  // Dad's wonky tile, in his hand instead of the protractor
  op(dad.tools.protractor, 0);
  const tileInHand = G(dad.hand); tr(tileInHand, 4, -44, 0.22, -8);
  E('path', { d: mkPoly(W4.map(p => [p[0] - 900, p[1] - 260])), fill: '#F4F1E8', stroke: INK, 'stroke-width': 12, 'stroke-linejoin': 'round' }, tileInHand);
  void dadTile;
  const people = [boy, kav, pri, mum, dad, tan];
  const ltK = agLowerThird(Lhud, 'kitty');

  /* shot cuts */
  const sA = at('diag') - 0.06, sB = at('sq') - 0.06, sC = at('para') - 0.06, sD = at('cut') - 0.06, sE = at('puzzle') - 0.06;

  return t => {
    kit.upd(t);
    kit.clock(14 + Math.min(t, 90) / 3600);
    ltK.set(win(t, at('kitty') + 0.1, at('kitty') + 3.2, 0.3));
    const shot = t < sA ? 'A' : t < sB ? 'B' : t < sC ? 'C' : t < sD ? 'D' : t < sE ? 'E' : 'F';
    people.forEach(p => op(p, 0));
    const put = (c, x, s, mood, look, extra) => { op(c, 1); tr(c, x, 440, s || 0.95); c.set(Object.assign({ t, talk: scTalk(S, t, c === kav ? 'kavya' : c.who), mood, look }, extra || {})); };

    /* ---------- the card ---------- */
    op(cardBg, shot === 'A' ? 0 : 1);
    boards.forEach(b => op(b, 0));
    op(Lboard, 1);

    /* ---------- Kitty ---------- */
    let km = 'smug', kl = 0;
    if (shot === 'A') {
      if (t < at('kitty')) {
        // lying on the island while Ah Boy tapes her
        tr(kitty, 600, 452, 0.75, 90);
        km = 'deadpan';
      } else {
        const p = P(t, at('kitty') - 0.1, 0.6, ease);
        tr(kitty, lerp(600, 540, p), lerp(452, 290, p), lerp(0.75, 1.05, p), lerp(90, 0, p));
        km = t < mid('kitty', 0.12) ? 'shock' : 'smug';
      }
    } else {
      tr(kitty, 130, 215, 0.66);
      kl = 0.8;
      if (shot === 'C' && t > mid('tree', 0.7)) km = 'smug';
      if (shot === 'F' && t > at('rhombus')) km = 'happy';
    }
    kitty.set({ t, talk: scTalk(S, t, 'kitty'), mood: km, look: kl });
    op(sparGlow, shot === 'A' ? P(t, mid('kitty', 0.78), 0.3, linear) * (0.7 + 0.3 * Math.sin(t * 6)) : 0);
    op(kTicks1, shot === 'A' ? P(t, mid('kitty', 0.4), 0.3, linear) : 0);
    op(kTicks2, shot === 'A' ? P(t, mid('kitty', 0.52), 0.3, linear) : 0);

    /* ---------- HUD chips ---------- */
    [cTwo, cDay, cK1, cK2, cK3].forEach(c => op(c, 0));
    op(tape, 0); op(stRej, 0);

    /* ---------- A: two, kitty ---------- */
    if (shot === 'A') {
      put(boy, 250, 0.95, t < at('kitty') ? 'happy' : 'shock', 0.7, { lift: t < at('kitty') ? 1 : 0.3 });
      op(boy.tools.broom, 0);
      put(kav, 850, 0.95, t < at('kitty') ? 'neutral' : 'deadpan', -0.8);
      put(pri, 1040, 0.95, t < at('kitty') ? 'happy' : 'smug', -0.8);
      if (t < at('kitty')) {
        popIn(cTwo, t, mid('two', 0.05), 1000, 150);
        cDay.set(P(t, mid('two', 0.55), 0.45, linear)); tr(cDay, 905, 228);
        const tp = P(t, mid('two', 0.3), 0.25, pop); op(tape, clamp(tp * 3)); tr(tape, 640, 452, Math.max(0.01, tp), 70);
      } else {
        cK1.set(P(t, mid('kitty', 0.36), 0.45, linear)); tr(cK1, 905, 150);
        cK2.set(P(t, mid('kitty', 0.5), 0.45, linear)); tr(cK2, 905, 212);
        cK3.set(P(t, mid('kitty', 0.76), 0.45, linear)); tr(cK3, 905, 274);
      }
    }
    op(boy.tools.broom, shot === 'A' ? 0 : 1);
    op(boy.tools.scissors, 0);

    /* ---------- B: diag, x, 35 ---------- */
    if (shot === 'B') {
      put(kav, 470, 0.85, t < at('x') ? 'neutral' : t < at('35') ? 'deadpan' : 'smug', t < at('35') && t >= at('x') ? -0.9 : 0.8);
      put(boy, 280, 0.85, t >= mid('35', 0.8) ? 'happy' : 'neutral', t >= at('x') && t < at('35') ? -0.9 : 0.8, { lift: 0.3 });
      if (t < at('x')) {
        op(bD, 1);
        mkDraw(qOut, P(t, at('diag') + 0.1, 0.7, ease));
        qDiag.setAttribute('stroke-dasharray', '1 1'); mkDraw(qDiag, P(t, mid('diag', 0.3), 0.5, ease));
        fade(dTop, t, mid('diag', 0.3));
        fade(tri1, t, mid('diag', 0.5)); fade(tri2, t, mid('diag', 0.58));
        fade(dSum, t, mid('diag', 0.7));
      } else {
        op(bX, 1); fade(xTitle, t, at('x'));
        const sw = P(t, mid('35', 0.86), 0.3, linear);
        op(angX, 1 - sw); op(angN, sw);
        work.set(t < at('35') ? 0 : P(t, mid('35', 0.05), 0.3, linear) + P(t, mid('35', 0.32), 0.3, linear) + P(t, mid('35', 0.48), 0.3, linear) + P(t, mid('35', 0.62), 0.3, linear));
        work.ring(3, P(t, mid('35', 0.72), 0.3, linear));
        op(xCheck, P(t, mid('35', 0.9), 0.3, linear));
      }
    }

    /* ---------- C: sq, rect, tree ---------- */
    op(rex, shot === 'C' ? 1 : 0);
    if (shot === 'C') {
      put(pri, 300, 0.95, t < at('rect') ? 'smug' : t < at('tree') ? (t < mid('rect', 0.3) ? 'shock' : 'annoyed') : 'deadpan', t < at('rect') ? 0.8 : 0.9);
      tr(rex, 488, 440, 0.7);
      rex.set({ t, talk: scTalk(S, t, 'rex'), mood: t < at('rect') ? (t > mid('sq', 0.5) ? 'annoyed' : 'deadpan') : t < at('tree') ? (t < mid('rect', 0.4) ? 'annoyed' : 'smug') : 'deadpan', look: t < at('tree') ? -0.8 : -0.9, open: 90, twitch: t > mid('sq', 0.55) && t < at('rect') ? 0.7 : 0 });
      if (t < at('tree')) {
        op(bS, 1);
        op(sQ, t < at('rect') ? P(t, mid('sq', 0.45), 0.3, linear) : 1 - P(t, at('rect') + 0.12, 0.2, linear));
        if (t >= at('rect') && t < mid('rect', 0.56)) { stRej.set(P(t, at('rect') + 0.05, 0.35, linear)); tr(stRej, CMX, 158, 0.55); }
        op(rtR, P(t, mid('rect', 0.2), 0.3, linear)); op(rtS, P(t, mid('rect', 0.62), 0.3, linear));
        fade(sDef, t, mid('rect', 0.22));
        fade(sEvery, t, mid('rect', 0.6));
      } else {
        op(bT, 1);
        const order = ['quad', 'trap', 'para', 'kite', 'rect', 'rhom', 'square'];
        order.forEach((k, i) => { const p = P(t, at('tree') + 0.02 + i * 0.08, 0.3, pop); op(nodes[k], clamp(p * 2.5)); });
        edges.forEach((e, i) => op(e, P(t, at('tree') + 0.15 + i * 0.06, 0.25, linear)));
        const hlAt = { rect: mid('tree', 0.1), rhom: mid('tree', 0.17), para: mid('tree', 0.36), kite: mid('tree', 0.55), square: mid('tree', 0.7) };
        Object.keys(glows).forEach(k => op(glows[k], k in hlAt ? P(t, hlAt[k], 0.25, linear) : 0));
        popIn(crown, t, mid('tree', 0.72), 955, 422);
        cShow.set(P(t, mid('tree', 0.76), 0.45, linear)); tr(cShow, 1072, 432);
      }
    }

    /* ---------- D: para ---------- */
    if (shot === 'D') {
      put(mum, 300, 0.95, 'smug', 0.8);
      put(kav, 480, 0.95, 'neutral', -0.8);
      op(bP, 1);
      pa.forEach((m, i) => op(m, P(t, mid('para', [0.18, 0.24, 0.5, 0.56][i]), 0.3, linear)));
      fade(pOpp, t, mid('para', 0.2));
      op(pC, P(t, mid('para', 0.6), 0.1, linear)); mkDraw(pC, P(t, mid('para', 0.6), 0.6, ease));
      fade(pNb, t, mid('para', 0.62));
    }

    /* ---------- E: cut, 93 ---------- */
    if (shot === 'E') {
      const dm = t < at('93') ? (t < mid('cut', 0.5) ? 'smug' : 'sad') : (t < mid('93', 0.6) ? 'neutral' : 'happy');
      put(dad, 300, 0.95, dm, 0.8, { lift: t < at('93') ? 1 : 0.4 });
      put(kav, 480, 0.95, t < at('93') ? 'deadpan' : 'smug', -0.8);
      op(bQ, 1); fade(qTitle, t, at('cut'));
      const solved = P(t, mid('93', 0.62), 0.3, linear);
      op(qQ, P(t, mid('cut', 0.55), 0.3, linear) * (1 - solved)); op(q93, solved);
      fade(q1, t, mid('93', 0.08)); fade(q2, t, mid('93', 0.5)); op(q2ring, P(t, mid('93', 0.66), 0.3, linear));
    }
    op(tileInHand, shot === 'E' ? 1 : 0);
    op(dad.tools.protractor, 0);

    /* ---------- F: puzzle, square, rhombus ---------- */
    if (shot === 'F') {
      put(tan, 245, 0.8, t < at('square') ? 'smug' : t < at('rhombus') ? 'deadpan' : 'happy', 0.8);
      put(pri, 395, 0.8, t < at('square') ? 'neutral' : t < at('rhombus') ? 'smug' : 'annoyed', t < at('square') ? -0.8 : 0.8);
      put(kav, 540, 0.8, t < at('rhombus') ? 'neutral' : 'smug', -0.8);
      op(bR, 1); fade(rTop, t, at('puzzle'));
      op(dgG, 1);
      dgG.style.opacity = P(t, at('puzzle') + 0.1, 0.4, linear).toFixed(3);
      op(rBot1, P(t, mid('puzzle', 0.55), 0.3, linear) * (1 - P(t, at('rhombus'), 0.2, linear)));
      op(rBot2, P(t, at('rhombus') + 0.05, 0.3, linear));
      op(sqG, P(t, mid('square', 0.15), 0.3, linear) * (1 - P(t, mid('rhombus', 0.5), 0.3, linear)));
      op(sqX, P(t, mid('square', 0.6), 0.2, linear)); op(sqNote, P(t, mid('square', 0.6), 0.2, linear));
      op(rhG, P(t, mid('rhombus', 0.45), 0.3, linear));
      op(rhT, P(t, mid('rhombus', 0.6), 0.2, linear)); op(rhName, P(t, mid('rhombus', 0.6), 0.2, linear));
    }
    void on; void AMP;
  };
});
