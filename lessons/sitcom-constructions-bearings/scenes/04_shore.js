/* Scene 4: The shortest way to the sea (angle bisector; perpendicular from a point; shortest distance).
   2 p.m., the Chek Jawa boardwalk. Mr Tan: cut the 136° fork exactly in half, compasses only -> Madame Compassa
   bisects it on the card (arc from O cuts the arms at D and E, equal arcs from D and E cross at F, rule OF) ->
   Priya: 136 ÷ 2 = 68°, every point on OF is the same distance from both paths -> Ah Boy: bisect again, 34° ->
   Dad's diagonal shortcut to the shoreline -> Kavya: the shortest way to a line is the perpendicular -> Compassa
   constructs it from P (arc cuts the shore at G and H, equal arcs cross at K on the other side) -> rule PK, N at 90°,
   Dad's route is the hypotenuse (a race: Kavya's dot reaches N first) -> Dad: 35 m from the tower -> Mr Tan: the
   tower is 40 m from the shore, perpendicular -> nowhere on the shore is closer than 40 m (the 40 m circle only
   touches it at N; a 35 m circle never reaches the shore) -> Dad, chest-deep in the sea. */
scene('shore', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);          // hard sitcom cut
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 3, color: o.color || C.ink, weight: 700 }); };
  // fade in at t0, out at t1 (optional)
  const show = (el, t, t0, t1) => { const p = P(t, t0, 0.25, linear), q = t1 === undefined ? 1 : 1 - P(t, t1, 0.15, linear); op(el, Math.min(p, q)); return Math.min(p, q); };
  const GOLD = '#FFE45C', INK = MK.ink, BLUE = '#2E7DD8', RED = '#C62828', GREEN = '#1E9E5A', PURP = '#7A5CFF', BERRY = '#B8336A';
  const CX = 877;                                   // the cards' centre line
  const row = (parent, y, text, o) => { o = o || {}; return mkText(parent, CX, y, text, { size: o.size || 30, anchor: 'middle', fill: o.fill || INK, boldFill: o.bold || BERRY, weight: 700 }); };
  const rowMath = (parent, y, src, col) => mkMath(parent, CX, y, src, { size: 40, anchor: 'middle', fill: col || INK, weight: 700 });
  const lab = (parent, x, y, s, o) => { o = o || {}; return T(parent, x, y, s, { size: o.size || 30, weight: 800, anchor: o.anchor || 'middle', fill: o.col || INK }); };
  const dot = (parent, x, y, col) => E('circle', { cx: x, cy: y, r: 7, fill: col || INK }, parent);
  // a little compass that draws an arc: needle at (cx, cy), pencil sweeping from a0 to a1 (screen degrees)
  const pencilArc = (cmp, t, t0, dur, cx, cy, r, a0, a1, arc) => {
    const p = P(t, t0, dur, ease);
    arc.set(p);
    if (t >= t0 - 0.25 && t <= t0 + dur + 0.2) { op(cmp, 1); tr(cmp, cx, cy); cmp.set({ r, rot: lerp(a0, a1, p) }); return true; }
    return false;
  };
  // equal-length tick marks across a segment's midpoint
  const ticks = (parent, x1, y1, x2, y2, n, col) => {
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L;
    let d = '';
    for (let i = 0; i < n; i++) { const o = (i - (n - 1) / 2) * 9, cx = mx + ux * o, cy = my + uy * o; d += `M${(cx - uy * 11).toFixed(1)},${(cy + ux * 11).toFixed(1)} L${(cx + uy * 11).toFixed(1)},${(cy - ux * 11).toFixed(1)} `; }
    return E('path', { d, stroke: col || INK, 'stroke-width': 3.5, 'stroke-linecap': 'round' }, parent);
  };

  /* layers */
  const Lset = G(root), Lcard = G(root), Lhud = G(root);

  /* ================= the boardwalk at Chek Jawa (and Dad's swim) ================= */
  const isl = cbIsland(Lset, 'boardwalk');
  const islBack = isl.firstChild;
  // the sea close-up (shot E): sky, sea, the lookout tower out in the water; drawn behind the characters
  const seaBack = G(isl); isl.insertBefore(seaBack, isl.mid);
  E('rect', { x: -200, y: -200, width: 1600, height: 1200, fill: linGrad('#9AD8FF', '#E6F6FF', true) }, seaBack);
  E('circle', { cx: 1040, cy: 150, r: 54, fill: glow('#FFE45C'), opacity: 0.9 }, seaBack);
  E('path', { d: 'M-200,380 L-200,300 Q0,270 200,300 Q300,320 380,380 Z', fill: '#3A8A4A' }, seaBack);   // mangroves, far left
  E('rect', { x: -200, y: 380, width: 1600, height: 820, fill: linGrad('#5AB8E0', '#1E6E9E', true) }, seaBack);
  const twr = G(seaBack); tr(twr, 990, 392, 0.62);
  E('path', { d: 'M-40,0 L-26,-300 M40,0 L26,-300 M-36,-80 L36,-80 M-32,-160 L32,-160 M-28,-240 L28,-240 M-36,-80 L32,-160 M36,-80 L-32,-160', stroke: '#6B4423', 'stroke-width': 7 }, twr);
  E('path', { d: 'M-48,-300 L48,-300 L0,-340 Z', fill: '#8A5A2A', stroke: '#4A2A10', 'stroke-width': 4 }, twr);
  E('rect', { x: -40, y: -300, width: 80, height: 22, fill: '#B07A45', stroke: '#4A2A10', 'stroke-width': 3 }, twr);
  let swd = ''; for (let r = 0; r < 6; r++) for (let k = -1; k < 10; k++) swd += `M${k * 150 + (r % 2) * 70},${410 + r * 50} q20,-8 40,0 `;
  E('path', { d: swd, fill: 'none', stroke: '#FFFFFF', 'stroke-width': 3, opacity: 0.35, 'stroke-linecap': 'round' }, seaBack);
  // in front of the characters: the water round Dad's chest, and the end of the boardwalk on the left
  const seaFront = G(isl); isl.insertBefore(seaFront, isl.front);
  const water = E('path', { d: '', fill: '#2E86BC', opacity: 0.93 }, seaFront);
  const waterTop = E('path', { d: '', fill: 'none', stroke: '#CFEFFF', 'stroke-width': 5, 'stroke-linecap': 'round' }, seaFront);
  const fish = G(seaFront);
  E('path', { d: 'M-22,0 Q0,-14 20,0 Q0,14 -22,0 Z M18,0 L34,-12 L34,12 Z', fill: '#FF9A3D', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, fish);
  E('circle', { cx: -10, cy: -3, r: 3, fill: SC_INK }, fish);
  const deck = G(seaFront);
  E('rect', { x: -40, y: 545, width: 440, height: 300, fill: '#B88A56', stroke: '#6B4423', 'stroke-width': 4 }, deck);
  let dp = ''; for (let x = 0; x < 400; x += 56) dp += `M${x},560 L${x},750 `;
  E('path', { d: dp, stroke: '#8A6232', 'stroke-width': 3 }, deck);
  E('rect', { x: -40, y: 538, width: 440, height: 18, rx: 4, fill: '#9C6B3E', stroke: '#5A3A1A', 'stroke-width': 3 }, deck);
  for (let x = 20; x < 400; x += 120) E('rect', { x, y: 545, width: 16, height: 200, fill: '#7A5028', stroke: '#5A3A1A', 'stroke-width': 3 }, deck);
  // cartoons standing on the boardwalk rail (in front of it)
  const onRail = G(isl);
  const flag = cbFlag(isl.front, 0.8); tr(flag, 612, 548);

  /* ================= the cast (each built once) ================= */
  const tan = cast(isl.mid, 'tan'), kav = cast(isl.mid, 'kavya'), priya = cast(isl.mid, 'priya'),
    boy = cast(isl.mid, 'boy'), dad = cast(isl.mid, 'dad', { side: 'right' });
  const cmp = cast(onRail, 'compassa', { s: 0.8 });
  const Y0 = 448, SB = 0.8;

  /* ================= card B: the 136° fork ================= */
  const forkCard = G(Lcard);
  cbPaper(forkCard, 585, 94, 585, 578);
  const O = [CX, 540], ARM = 260;
  const ptA = (deg, d) => [O[0] + Math.cos(deg * Math.PI / 180) * d, O[1] - Math.sin(deg * Math.PI / 180) * d];   // maths degrees
  const aR = ptA(22, ARM), aL = ptA(158, ARM);
  E('path', { d: `M${aL[0].toFixed(1)},${aL[1].toFixed(1)} L${O[0]},${O[1]} L${aR[0].toFixed(1)},${aR[1].toFixed(1)}`, fill: 'none', stroke: '#E2C79A', 'stroke-width': 30, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, forkCard);   // the boardwalk planks, top-down
  E('path', { d: `M${aL[0].toFixed(1)},${aL[1].toFixed(1)} L${O[0]},${O[1]} L${aR[0].toFixed(1)},${aR[1].toFixed(1)}`, fill: 'none', stroke: INK, 'stroke-width': 4.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, forkCard);
  const m136 = mkAngleMark(forkCard, O[0], O[1], 22, 158, { r: 66, label: '136°', col: BLUE, size: 32 });
  // construction
  const D = ptA(158, 150), Ept = ptA(22, 150), F = [CX, O[1] - 150 * Math.cos(68 * Math.PI / 180) - Math.sqrt(170 * 170 - Math.pow(150 * Math.sin(68 * Math.PI / 180), 2))];
  const arcO = cbArc(forkCard, O[0], O[1], 150, -166, -14, { col: PURP });
  const arcD = cbArc(forkCard, D[0], D[1], 170, -54, -16, { col: PURP });
  const arcE = cbArc(forkCard, Ept[0], Ept[1], 170, -164, -126, { col: PURP });
  const ptsDE = G(forkCard);
  dot(ptsDE, D[0], D[1], PURP); dot(ptsDE, Ept[0], Ept[1], PURP);
  lab(ptsDE, D[0] - 12, D[1] + 42, 'D', { col: PURP }); lab(ptsDE, Ept[0] + 12, Ept[1] + 42, 'E', { col: PURP });
  const rayOF = cbSeg(forkCard, O[0], O[1], CX, 238, { col: GREEN, width: 5 });
  const ptF = G(forkCard); dot(ptF, F[0], F[1], GREEN); mkText(ptF, F[0] + 22, F[1] + 4, 'F', { size: 30, fill: GREEN, weight: 800, halo: MK.paper });
  const m68R = mkAngleMark(forkCard, O[0], O[1], 22, 90, { r: 52, label: '68°', col: GREEN, size: 28, lr: 80 });
  const m68L = mkAngleMark(forkCard, O[0], O[1], 90, 158, { r: 52, label: '68°', col: GREEN, size: 28, lr: 80 });
  // equidistance: from Q on OF, the perpendiculars to the two paths are equal
  const Q = [CX, O[1] - 280], qp = 280 * Math.cos(68 * Math.PI / 180);
  const fR = ptA(22, qp), fL = ptA(158, qp);
  const eqG = G(forkCard);
  [fR, fL].forEach(f => E('path', { d: `M${Q[0]},${Q[1]} L${f[0].toFixed(1)},${f[1].toFixed(1)}`, stroke: BERRY, 'stroke-width': 4, 'stroke-dasharray': '12 8', fill: 'none' }, eqG));
  mkAngleMark(eqG, fR[0], fR[1], 22, 112, { r: 30, col: BERRY, right: true }).set(1);
  mkAngleMark(eqG, fL[0], fL[1], 68, 158, { r: 30, col: BERRY, right: true }).set(1);
  ticks(eqG, Q[0], Q[1], fR[0], fR[1], 2, BERRY); ticks(eqG, Q[0], Q[1], fL[0], fL[1], 2, BERRY);
  dot(eqG, Q[0], Q[1], BERRY);
  // bisect again: 34°
  const r34 = ptA(56, 270);
  const ray34 = cbSeg(forkCard, O[0], O[1], r34[0], r34[1], { col: '#E07A00', width: 4.5, dash: '14 9' });
  const m34a = mkAngleMark(forkCard, O[0], O[1], 22, 56, { r: 96, label: '34°', col: '#E07A00', size: 28, lr: 120 });
  const m34b = mkAngleMark(forkCard, O[0], O[1], 56, 90, { r: 96, col: '#E07A00' });
  const l34b = mkText(forkCard, O[0] + 113 * Math.cos(73 * Math.PI / 180), O[1] - 113 * Math.sin(73 * Math.PI / 180) + 10, '34°', { size: 28, anchor: 'middle', fill: '#E07A00', weight: 800, halo: MK.paper });
  dot(forkCard, O[0], O[1]); lab(forkCard, O[0], O[1] + 40, 'O');
  const fCmp = mkCompass(forkCard, { leg: 130, arcCol: PURP }); op(fCmp, 0);
  // the top rows
  const rClue1 = row(forkCard, 165, 'Checkpoint 4: cut {{136°}} in half', { size: 32 });
  const rClue2 = mkChip(forkCard, 'compasses only!', { size: 28, col: RED, fill: '#FFE4E4', textCol: INK }); tr(rClue2, CX, 215);
  const rBis1 = row(forkCard, 165, '**Angle bisector**', { size: 34, bold: PURP });
  const rBis2 = row(forkCard, 215, 'arc from O cuts both arms: **D**, **E**', { size: 28, bold: PURP });
  const rF2 = row(forkCard, 215, '**same width** from D and E → **F**', { size: 28, bold: PURP });
  const rHalf1 = rowMath(forkCard, 172, '136 ÷ 2 = 68°', GREEN);
  const rHalf2 = row(forkCard, 218, 'on OF: **same distance** from both paths', { size: 26, bold: BERRY });
  const rAgain1 = rowMath(forkCard, 172, '68 ÷ 2 = 34°', '#C25E00');
  const rAgain2 = row(forkCard, 218, 'bisect a half again: **34°**', { size: 28, bold: '#C25E00' });

  /* ================= card C: P and the shoreline ================= */
  const shoreCard = G(Lcard);
  cbPaper(shoreCard, 585, 94, 585, 578);
  const SY = 470, Pp = [CX, 250], X = [1128, SY], Nn = [CX, SY];
  const hg = Math.sqrt(280 * 280 - 220 * 220), G1 = [CX - hg, SY], H1 = [CX + hg, SY], K = [CX, SY + Math.sqrt(210 * 210 - hg * hg)];
  E('rect', { x: 593, y: 102, width: 569, height: SY - 102, rx: 10, fill: '#F6EBCB' }, shoreCard);
  E('path', { d: `M593,${SY} L1162,${SY} L1162,654 Q1162,664 1152,664 L603,664 Q593,664 593,654 Z`, fill: '#CFEAF7' }, shoreCard);
  E('path', { d: `M600,${SY} L1155,${SY}`, stroke: '#1E5A8A', 'stroke-width': 5 }, shoreCard);
  lab(shoreCard, 610, 300, 'land', { size: 26, col: '#8A6A3A', anchor: 'start' });
  lab(shoreCard, 610, 648, 'sea', { size: 26, col: '#1E5A8A', anchor: 'start' });
  lab(shoreCard, 610, SY - 14, 'shore', { size: 26, col: '#1E5A8A', anchor: 'start' });
  // candidates from P to the shore (perp), the perpendicular among them
  const fan = G(shoreCard);
  [717, 797, 957, 1037].forEach(x => E('path', { d: `M${Pp[0]},${Pp[1]} L${x},${SY}`, stroke: '#8F9CAB', 'stroke-width': 3, 'stroke-dasharray': '9 7' }, fan));
  E('path', { d: `M${Pp[0]},${Pp[1]} L${Nn[0]},${SY}`, stroke: GREEN, 'stroke-width': 6 }, fan);
  mkAngleMark(fan, Nn[0], SY, 0, 90, { r: 40, col: GREEN, right: true }).set(1);
  // Dad's route and the triangle
  const tri = E('path', { d: mkPoly([Pp, Nn, X]), fill: RED, opacity: 0.13 }, shoreCard);
  const route = cbSeg(shoreCard, Pp[0], Pp[1], X[0], X[1], { col: RED, width: 4.5, dash: '14 9' });
  const ptX = G(shoreCard); dot(ptX, X[0], X[1], RED); lab(ptX, X[0], X[1] + 38, 'X', { col: RED });
  const tDad = lab(shoreCard, 1060, 318, "Dad's shortcut", { size: 28, col: RED });
  const tHyp = lab(shoreCard, 1068, 318, 'hypotenuse', { size: 28, col: RED });
  // the construction
  const arcP = cbArc(shoreCard, Pp[0], Pp[1], 280, 50, 130, { col: PURP });
  const arcG = cbArc(shoreCard, G1[0], G1[1], 210, 20, 50, { col: PURP });
  const arcH = cbArc(shoreCard, H1[0], H1[1], 210, 130, 160, { col: PURP });
  const ptGH = G(shoreCard);
  dot(ptGH, G1[0], SY, PURP); dot(ptGH, H1[0], SY, PURP);
  lab(ptGH, G1[0] - 4, SY + 38, 'G', { col: PURP }); lab(ptGH, H1[0] - 4, SY + 38, 'H', { col: PURP });
  const ptK = G(shoreCard); dot(ptK, K[0], K[1], PURP); lab(ptK, K[0] + 24, K[1] + 12, 'K', { col: PURP, anchor: 'start' });
  const lnPK = cbSeg(shoreCard, Pp[0], Pp[1], K[0], K[1], { col: GREEN, width: 5 });
  const ptN = G(shoreCard);
  mkAngleMark(ptN, Nn[0], SY, 0, 90, { r: 40, col: GREEN, right: true }).set(1);
  dot(ptN, Nn[0], SY, GREEN); lab(ptN, Nn[0] - 14, SY + 36, 'N', { col: GREEN, anchor: 'end' });
  const tFirst = lab(shoreCard, Nn[0] - 78, SY - 22, 'first!', { size: 26, col: BLUE });
  dot(shoreCard, Pp[0], Pp[1]); lab(shoreCard, Pp[0] - 18, Pp[1] + 10, 'P', { anchor: 'end' });
  const runK = E('circle', { r: 13, fill: BLUE, stroke: '#FFFFFF', 'stroke-width': 3 }, shoreCard);
  const runD = E('circle', { r: 13, fill: '#3D8B6E', stroke: '#FFFFFF', 'stroke-width': 3 }, shoreCard);
  const sCmp = mkCompass(shoreCard, { leg: 170, arcCol: PURP }); op(sCmp, 0);
  const cBonus = mkChip(shoreCard, 'BONUS: touch the **shoreline**', { size: 28, col: '#B08A00', fill: '#FFF3C4', textCol: INK }); tr(cBonus, CX, 165);
  const rPerp = row(shoreCard, 168, 'shortest = **perpendicular** (90°)', { size: 30, bold: GREEN });
  const rGH1 = row(shoreCard, 160, '**Perpendicular from P**', { size: 32, bold: PURP });
  const rGH2 = row(shoreCard, 208, 'arc from P cuts the shore: **G**, **H**', { size: 28, bold: PURP });
  const rGH3 = row(shoreCard, 208, 'equal arcs from G and H → **K**', { size: 28, bold: PURP });
  const rPN1 = row(shoreCard, 160, 'rule **PK**: it meets the shore at **N**, 90°', { size: 28, bold: GREEN });
  const rPN2 = row(shoreCard, 208, '{{PN < PX}}: PX is the **hypotenuse**', { size: 28, bold: RED });

  /* ================= card D: the lookout tower ================= */
  const towCard = G(Lcard);
  cbPaper(towCard, 585, 94, 585, 578);
  const TY = 260, Tt = [CX, 420], MPX = 4;   // 1 m = 4 px
  E('rect', { x: 593, y: 102, width: 569, height: TY - 102, rx: 10, fill: '#F6EBCB' }, towCard);
  E('path', { d: `M593,${TY} L1162,${TY} L1162,654 Q1162,664 1152,664 L603,664 Q593,664 593,654 Z`, fill: '#CFEAF7' }, towCard);
  E('path', { d: `M600,${TY} L1155,${TY}`, stroke: '#1E5A8A', 'stroke-width': 5 }, towCard);
  lab(towCard, 1152, TY - 14, 'shore', { size: 26, col: '#1E5A8A', anchor: 'end' });
  lab(towCard, 610, 245, 'land', { size: 26, col: '#8A6A3A', anchor: 'start' });
  lab(towCard, 610, 648, 'sea', { size: 26, col: '#1E5A8A', anchor: 'start' });
  const c40 = E('circle', { cx: Tt[0], cy: Tt[1], r: 40 * MPX, fill: 'rgba(30,158,90,0.08)', stroke: GREEN, 'stroke-width': 4.5 }, towCard);
  const c35 = E('circle', { cx: Tt[0], cy: Tt[1], r: 35 * MPX, fill: 'none', stroke: RED, 'stroke-width': 4.5, 'stroke-dasharray': '14 9' }, towCard);
  const r35 = G(towCard);
  const e35 = [Tt[0] + 35 * MPX * Math.cos(Math.PI / 4), Tt[1] + 35 * MPX * Math.sin(Math.PI / 4)];
  E('path', { d: `M${Tt[0]},${Tt[1]} L${e35[0].toFixed(1)},${e35[1].toFixed(1)}`, stroke: RED, 'stroke-width': 4 }, r35);
  lab(r35, Tt[0] + 56, Tt[1] + 104, '35 m', { size: 28, col: RED, anchor: 'end' });
  const perpT = cbSeg(towCard, Tt[0], Tt[1], Tt[0], TY, { col: GREEN, width: 5 });
  const perpL = G(towCard);
  mkAngleMark(perpL, Tt[0], TY, 270, 360, { r: 40, col: GREEN, right: true }).set(1);
  lab(perpL, Tt[0] + 20, 352, '40 m', { size: 30, col: GREEN, anchor: 'start' });
  dot(perpL, Tt[0], TY, GREEN); lab(perpL, Tt[0] - 16, TY - 14, 'N', { col: GREEN, anchor: 'end' });
  const tower = G(towCard); tr(tower, Tt[0], Tt[1]);
  E('path', { d: 'M-14,0 L-8,-44 M14,0 L8,-44 M-12,-14 L12,-14 M-10,-30 L10,-30', stroke: '#6B4423', 'stroke-width': 4 }, tower);
  E('path', { d: 'M-17,-44 L17,-44 L0,-60 Z', fill: '#8A5A2A', stroke: '#4A2A10', 'stroke-width': 3 }, tower);
  dot(tower, 0, 0);
  lab(towCard, Tt[0] + 28, Tt[1] + 12, 'T', { anchor: 'start' });
  lab(towCard, Tt[0] + 54, Tt[1] + 12, '(tower)', { size: 26, anchor: 'start', col: '#5A4A3A' });
  const rFound = mkChip(towCard, 'Dad: "**35 m** from the tower!"', { size: 28, col: '#3D8B6E', fill: '#E4F5EC', textCol: INK }); tr(rFound, CX, 180);
  const rTower = row(towCard, 188, 'perpendicular to the shore: **40 m**', { size: 28, bold: GREEN });
  const rImp = row(towCard, 188, 'shore: **40 m or more** from T', { size: 30, bold: GREEN });
  const rNo = mkText(towCard, CX, 640, '{{35 < 40}}: not on the shore!', { size: 30, anchor: 'middle', fill: RED, weight: 700 });

  /* ================= chips, stamps, lower thirds ================= */
  const cTime = pill(Lhud, '2 p.m.  Chek Jawa', { size: 30, color: GOLD, stroke: GOLD });
  const cCheck = pill(Lhud, 'Checkpoint 4', { size: 28, color: '#FF9A3D', stroke: '#FF9A3D' });
  const cSea = pill(Lhud, "Dad's spot: 35 m from the tower", { size: 28, color: '#CFEFFF', stroke: '#CFEFFF' });
  const ltC = cbLowerThird(Lhud, 'compassa'), ltB = cbLowerThird(Lhud, 'boy');

  /* cut points */
  const cB1 = mid('clue', 0.38), cB2 = at('bis') - 0.06, cC = at('diag') - 0.06, cD = at('found') - 0.06, cE = at('sea') - 0.06;

  return t => {
    const sA = on(t, -1, cB1), sB1 = on(t, cB1, cB2), sB2 = on(t, cB2, cC), sC = on(t, cC, cD), sD = on(t, cD, cE), sE = on(t, cE, 1e9);
    const who = scWho(S, t);
    isl.upd(t * AMP);
    op(islBack, sE ? 0 : 1); op(isl.front, sE ? 0 : 1); op(seaBack, sE); op(seaFront, sE); op(onRail, sB2 || sC ? 1 : 0);
    op(forkCard, sB1 || sB2); op(shoreCard, sC); op(towCard, sD);
    [tan, kav, priya, boy, dad].forEach(c => op(c, 0));
    [cTime, cCheck, cSea].forEach(c => op(c, 0));
    op(flag, sA);
    ltC.set(win(t, at('bis') + 0.1, at('bis') + 3.2, 0.3));
    ltB.set(sB2 ? win(t, mid('half', 0.45), end('again') + 0.1, 0.3) : 0);
    if (!sE) isl.setAttribute('transform', '');

    // a bust in a slot; look at whoever is talking (slots left to right), or at the card when it is them
    const place = (c, x, y, s) => { op(c, 1); tr(c, x, y === undefined ? Y0 : y, s || SB); };
    const lookTo = (myX, xs) => { const sp = xs[who]; if (sp === undefined) return 0.75; if (Math.abs(sp - myX) < 1) return 0.8; return sp > myX ? 0.8 : -0.8; };

    /* ---------- A: the wide shot on the boardwalk ---------- */
    if (sA) {
      place(priya, 130); place(boy, 300); place(kav, 460); place(tan, 780); place(dad, 980);
      priya.set({ t, mood: 'smug', look: 0.8 });
      boy.set({ t, mood: 'happy', look: 0.8 });
      kav.set({ t, mood: 'neutral', look: 0.8 });
      tan.set({ t, talk: scTalk(S, t, 'tan'), mood: 'happy', look: -0.5, lift: t > at('clue') - 0.2 ? 1 : 0 });
      dad.set({ t, mood: 'smug', look: -0.8 });
      popIn(cTime, t, at('clue') - 0.4, 905, 70);
      popIn(cCheck, t, at('clue') + 0.3, 905, 132);
    }

    /* ---------- B: the fork card ---------- */
    if (sB1 || sB2) {
      const bp = P(t, cB1, 0.3, easeOut); tr(forkCard, 0, 16 * (1 - bp));
      // rows
      show(rClue1, t, cB1 + 0.05, cB2); rClue2.set(t < cB2 ? P(t, mid('clue', 0.7), 0.35, linear) : 0);
      show(rBis1, t, at('bis'), at('half') - 0.1);
      show(rBis2, t, mid('bis', 0.35), at('f'));
      show(rF2, t, at('f') + 0.05, at('half') - 0.1);
      show(rHalf1, t, at('half') + 0.1, at('again') - 0.05); show(rHalf2, t, mid('half', 0.5), at('again') - 0.05);
      show(rAgain1, t, at('again') + 0.05); show(rAgain2, t, mid('again', 0.45));
      // the 136° angle, until the bisector is ruled
      m136.set(t < mid('f', 0.9) ? P(t, mid('clue', 0.45), 0.5, linear) * (1 - P(t, mid('f', 0.82), 0.2, linear)) : 0);
      // the arcs, drawn by a little pair of compasses
      let busy = false;
      busy = pencilArc(fCmp, t, mid('bis', 0.42), 1.2, O[0], O[1], 150, -166, -14, arcO) || busy;
      op(ptsDE, P(t, mid('bis', 0.42) + 1.0, 0.25, linear));
      busy = pencilArc(fCmp, t, mid('f', 0.1), 0.8, D[0], D[1], 170, -54, -16, arcD) || busy;
      busy = pencilArc(fCmp, t, mid('f', 0.36), 0.8, Ept[0], Ept[1], 170, -164, -126, arcE) || busy;
      if (!busy) op(fCmp, 0);
      op(ptF, P(t, mid('f', 0.58), 0.25, linear));
      rayOF.set(P(t, mid('f', 0.74), 0.6, ease));
      m68R.set(P(t, mid('half', 0.12), 0.4, linear) * (1 - P(t, mid('again', 0.15), 0.2, linear)));
      m68L.set(P(t, mid('half', 0.2), 0.4, linear));
      show(eqG, t, mid('half', 0.55), at('again') - 0.05);
      ray34.set(P(t, mid('again', 0.12), 0.5, ease));
      m34a.set(P(t, mid('again', 0.35), 0.35, linear)); m34b.set(P(t, mid('again', 0.45), 0.35, linear)); op(l34b, P(t, mid('again', 0.55), 0.3, linear));

      if (sB1) {
        place(tan, 190, 440, 0.9); place(kav, 425, Y0, 0.84);
        tan.set({ t, talk: scTalk(S, t, 'tan'), mood: 'happy', look: 0.8, lift: 1 });
        kav.set({ t, mood: 'neutral', look: 0.8 });
      } else {
        const xs = { compassa: 125, priya: 305, boy: 470 };
        place(priya, 305); place(boy, 470);
        // Madame Compassa on the rail
        const twirl = (t > mid('bis', 0.42) && t < mid('bis', 0.42) + 1.2) ? P(t, mid('bis', 0.42), 1.2, ease) :
          (t > mid('f', 0.1) && t < mid('f', 0.36) + 0.8) ? P(t, mid('f', 0.1), mid('f', 0.36) + 0.8 - mid('f', 0.1), ease) * 2 : 0;
        const up = P(t, cB2, 0.4, pop);
        tr(cmp, 125, lerp(760, 545 - 114 * 0.8, up), 0.8);
        cmp.set({ t, talk: scTalk(S, t, 'compassa'), mood: who === 'compassa' ? 'smug' : who === 'boy' ? 'happy' : 'neutral',
          look: who === 'compassa' ? 0.8 : 0.8, arms: who === 'compassa' && t > mid('f', 0.3) && t < end('f') ? 1 : (who === 'compassa' ? 0.5 : 0.2), twirl, open: 20 });
        priya.set({ t, talk: scTalk(S, t, 'priya'), mood: who === 'priya' ? 'smug' : who === 'boy' ? 'neutral' : 'neutral', look: lookTo(305, xs), lift: who === 'priya' ? 1 : 0 });
        boy.set({ t, talk: scTalk(S, t, 'boy'), mood: 'happy', look: lookTo(470, xs), lift: who === 'boy' ? 1 : 0 });
      }
    }

    /* ---------- C: the shortest way to the shore ---------- */
    if (sC) {
      const xs = { compassa: 120, dad: 290, kavya: 465 };
      place(dad, 290); place(kav, 465);
      const up = P(t, cC, 0.3, easeOut);
      tr(cmp, 120, 545 - 114 * 0.8 + 8 * (1 - up), 0.8);
      const twirl = (t > mid('gh', 0.12) && t < mid('gh', 0.92)) ? P(t, mid('gh', 0.12), mid('gh', 0.92) - mid('gh', 0.12), ease) * 2 : 0;
      cmp.set({ t, talk: scTalk(S, t, 'compassa'), mood: who === 'compassa' ? 'smug' : who === 'dad' ? 'deadpan' : 'neutral',
        look: lookTo(120, xs), arms: who === 'compassa' ? 0.6 : 0.2, twirl, open: 20 });
      let dm = 'neutral', dLift = 0, dSweat = 0;
      if (t < at('perp')) { dm = 'smug'; dLift = t > mid('diag', 0.3) ? 1 : 0; }
      else if (t < at('pn')) dm = 'neutral';
      else { dm = t > mid('pn', 0.7) ? 'sad' : 'neutral'; dSweat = t > mid('pn', 0.75) ? 0.6 : 0; }
      dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: lookTo(290, xs), lift: dLift, sweat: dSweat });
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: t < at('perp') ? (t > mid('diag', 0.6) ? 'deadpan' : 'neutral') : who === 'kavya' ? 'happy' : 'neutral', look: lookTo(465, xs) });
      // the card
      const bp = P(t, cC, 0.3, easeOut); tr(shoreCard, 0, 16 * (1 - bp));
      cBonus.set(t < at('perp') ? P(t, at('diag') + 0.1, 0.35, linear) : 0);
      show(rPerp, t, at('perp') + 0.1, at('gh'));
      show(rGH1, t, at('gh'), at('pn')); show(rGH2, t, mid('gh', 0.08), mid('gh', 0.5)); show(rGH3, t, mid('gh', 0.52), at('pn'));
      show(rPN1, t, at('pn') + 0.05, mid('pn', 0.42)); show(rPN2, t, mid('pn', 0.45));
      // Dad's shortcut
      route.set(P(t, mid('diag', 0.35), 0.8, easeOut)); op(ptX, P(t, mid('diag', 0.35) + 0.7, 0.2, linear));
      show(tDad, t, mid('diag', 0.6), mid('pn', 0.45)); show(tHyp, t, mid('pn', 0.5));
      op(tri, P(t, mid('pn', 0.45), 0.3, linear));
      // the fan of routes: the perpendicular is the shortest
      show(fan, t, mid('perp', 0.2), at('gh'));
      // the construction
      let busy = false;
      busy = pencilArc(sCmp, t, mid('gh', 0.14), 1.3, Pp[0], Pp[1], 280, 50, 130, arcP) || busy;
      op(ptGH, P(t, mid('gh', 0.14) + 1.15, 0.25, linear));
      busy = pencilArc(sCmp, t, mid('gh', 0.55), 0.7, G1[0], G1[1], 210, 20, 50, arcG) || busy;
      busy = pencilArc(sCmp, t, mid('gh', 0.55) + 0.8, 0.7, H1[0], H1[1], 210, 160, 130, arcH) || busy;
      if (!busy) op(sCmp, 0);
      op(ptK, P(t, mid('gh', 0.88), 0.25, linear));
      lnPK.set(P(t, at('pn') + 0.1, 0.8, ease));
      op(ptN, P(t, mid('pn', 0.25), 0.25, linear));
      // the race: same speed, Kavya's way is shorter
      const r0 = mid('pn', 0.5), sp = 230;   // px per second
      const kd = clamp((t - r0) * sp / (SY - Pp[1])), dd = clamp((t - r0) * sp / Math.hypot(X[0] - Pp[0], X[1] - Pp[1]));
      op(runK, t > r0 - 0.2 ? 1 : 0); op(runD, t > r0 - 0.2 ? 1 : 0);
      attr(runK, 'cx', lerp(Pp[0] - 4, Nn[0] - 4, kd)); attr(runK, 'cy', lerp(Pp[1], SY, kd));
      attr(runD, 'cx', lerp(Pp[0] + 4, X[0], dd)); attr(runD, 'cy', lerp(Pp[1], X[1], dd));
      show(tFirst, t, r0 + (SY - Pp[1]) / sp);
    }

    /* ---------- D: the lookout tower ---------- */
    if (sD) {
      const xs = { tan: 130, dad: 300, kavya: 470 };
      place(tan, 130); place(dad, 300); place(kav, 470);
      tan.set({ t, talk: scTalk(S, t, 'tan'), mood: 'neutral', look: lookTo(130, xs), lift: who === 'tan' ? 1 : 0 });
      const dm = t < at('tower') ? 'smug' : t < at('imp') ? 'shock' : 'sad';
      dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: lookTo(300, xs), lift: who === 'dad' ? 1 : 0, sweat: t > mid('tower', 0.5) ? 1 : 0 });
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: who === 'kavya' ? 'smug' : 'neutral', look: lookTo(470, xs) });
      const bp = P(t, cD, 0.3, easeOut); tr(towCard, 0, 16 * (1 - bp));
      rFound.set(t < at('tower') ? P(t, at('found') + 0.2, 0.35, linear) : 0);
      show(rTower, t, at('tower') + 0.1, at('imp')); show(rImp, t, at('imp') + 0.1);
      perpT.set(P(t, mid('tower', 0.2), 0.6, ease)); op(perpL, P(t, mid('tower', 0.55), 0.3, linear));
      op(c40, P(t, at('imp') + 0.1, 0.4, linear));
      attr(c40, 'r', (40 * MPX * P(t, at('imp') + 0.1, 0.8, easeOut)).toFixed(1));
      op(c35, P(t, mid('imp', 0.45), 0.3, linear)); op(r35, P(t, mid('imp', 0.5), 0.3, linear));
      show(rNo, t, mid('imp', 0.6));
    }

    /* ---------- E: Dad, in the sea ---------- */
    if (sE) {
      const z = P(t, cE, end('sea') + 1.2 - cE, linear);
      const k = 1 + 0.06 * z;
      isl.setAttribute('transform', `translate(600 420) scale(${k.toFixed(4)}) translate(-600 -420)`);
      place(dad, 720, 452, 1.1); place(kav, 200, Y0, 0.86);
      dad.set({ t, talk: scTalk(S, t, 'dad'), mood: 'sad', look: -0.7, sweat: 1, lift: 0 });
      kav.set({ t, mood: 'deadpan', look: 0.8 });
      let d = 'M380,900 L380,532', d2 = 'M380,532';
      for (let x = 380; x <= 1240; x += 30) { const y = (528 + Math.sin(x * 0.035 + t * 2.6 * AMP) * 7).toFixed(1); d += ` L${x},${y}`; d2 += ` L${x},${y}`; }
      attr(water, 'd', d + ' L1240,900 Z'); attr(waterTop, 'd', d2);
      // a fish jumps in the pause
      const fj = P(t, end('sea') + 0.05, 0.8, linear);
      op(fish, fj > 0 && fj < 1 ? 1 : 0);
      tr(fish, lerp(1000, 1100, fj), 540 - Math.sin(fj * Math.PI) * 90, 1, lerp(-40, 50, fj));
      popIn(cSea, t, at('sea') + 0.2, 905, 132);
    }
  };
});
