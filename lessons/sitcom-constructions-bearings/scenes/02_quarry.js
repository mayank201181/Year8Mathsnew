/* Scene 2: Madame Compassa (constructing triangles).
   Shots (hard sitcom cuts):
   W  Checkpoint 2, the quarry: Mr Tan's clue card (AB = 7 cm, AC = 5 cm, BC = 6 cm, with a sketch) -> "Pass the
      compass!": Captain Needle pops up saluting -> Madame Compassa pirouettes in and shoves him aside.
   K  the construction card (1 cm = 40 px): SSS. Rule AB = 7 cm; Compassa opens to 5 cm on the ruler, needle on A,
      and pirouettes an arc; 6 cm from B, another arc; they cross at C; AC and BC ruled -> Dad's giant eraser ->
      "Never! The arcs are your working."
   S  Ah Boy's sticks (1 unit = 50 px): 3, 4, 8 cannot close (3 + 4 = 7 < 8, the arcs cannot reach) -> 3, 5, 8 lies
      flat -> 3, 6, 8 is a triangle -> the rule: 3 + 6 = 9 > 8.
   A  Team Priya's card: XY = 8 cm, X = 50°, Y = 65°, no compasses -> SSS / SAS / ASA -> the ASA construction:
      Z = 180° − 50° − 65° = 65°, isosceles, XZ = XY = 8 cm. */
scene('quarry', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const GOLD = '#FFE45C', RED = '#C62828', BLUE = '#1E5BB8', GREEN = '#1E9E5A', VIO = '#7A5CFF', PINK = '#FF8FC8';
  const chipOn = (c, t, t0, t1, x, y) => { c.set(t >= t0 && t < t1 ? P(t, t0, 0.35, linear) : 0); if (x !== undefined) tr(c, x, y); };
  const fadeOn = (el, t, t0, d) => op(el, P(t, t0, d || 0.3, linear));
  const pt = (cx, cy, r, m) => [cx + Math.cos(m * Math.PI / 180) * r, cy - Math.sin(m * Math.PI / 180) * r];
  const ticks = (parent, x1, y1, x2, y2, n, col) => {   // equal-length tick marks across the middle of a segment
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L;
    let d = '';
    for (let i = 0; i < n; i++) { const o = (i - (n - 1) / 2) * 10, cx = mx + ux * o, cy = my + uy * o; d += `M${(cx - uy * 13).toFixed(1)},${(cy + ux * 13).toFixed(1)} L${(cx + uy * 13).toFixed(1)},${(cy - ux * 13).toFixed(1)} `; }
    return E('path', { d, stroke: col || MK.ink, 'stroke-width': 4, 'stroke-linecap': 'round' }, parent);
  };
  /* a wooden stick from (x1,y1) to (x2,y2) with a number tag */
  const stick = (parent, col) => {
    const g = G(parent);
    const o = E('path', { d: '', stroke: '#5A3A1A', 'stroke-width': 20, 'stroke-linecap': 'round' }, g);
    const i = E('path', { d: '', stroke: col || '#C98A4A', 'stroke-width': 13, 'stroke-linecap': 'round' }, g);
    const tag = G(g);
    E('circle', { r: 21, fill: '#FFFFFF', stroke: '#5A3A1A', 'stroke-width': 3 }, tag);
    const tx = T(tag, 0, 10, '', { size: 28, weight: 800, anchor: 'middle', fill: MK.ink });
    g.set = (x1, y1, x2, y2, lab, side) => {
      const d = `M${x1.toFixed(1)},${y1.toFixed(1)} L${x2.toFixed(1)},${y2.toFixed(1)}`;
      attr(o, 'd', d); attr(i, 'd', d); setText(tx, lab);
      const L = Math.hypot(x2 - x1, y2 - y1) || 1, nx = -(y2 - y1) / L, ny = (x2 - x1) / L, sd = side || 1;
      tr(tag, (x1 + x2) / 2 + nx * 32 * sd, (y1 + y2) / 2 + ny * 32 * sd);
    };
    return g;
  };
  /* Madame Compassa placed by her NEEDLE tip: needle at (x, y), turned th degrees, fx = 1 or -1 (mirrored: needle on
     the right), a = half-opening. The pencil is then at distance 2 L s sin(a) in direction th (th + 180 mirrored). */
  const CL = 168, CHY = -54;
  const placeC = (c, x, y, s, th, fx, a) => {
    const ar = a * Math.PI / 180, nx = -Math.sin(ar) * CL, ny = CHY + Math.cos(ar) * CL, r = th * Math.PI / 180;
    const lx = fx * s * nx, ly = s * ny;
    const X = x - (lx * Math.cos(r) - ly * Math.sin(r)), Y = y - (lx * Math.sin(r) + ly * Math.cos(r));
    const fxs = Math.abs(fx) < 0.06 ? 0.06 * (fx < 0 ? -1 : 1) : fx;
    c.setAttribute('transform', `translate(${X.toFixed(2)} ${Y.toFixed(2)}) rotate(${th.toFixed(2)}) scale(${(fxs * s).toFixed(4)} ${s.toFixed(4)})`);
  };
  const openFor = (r, s) => Math.asin(r / (2 * CL * s)) * 180 / Math.PI;

  /* ---------- layers ---------- */
  const Lset = G(root), Lpaper = G(root), Lcast = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= the quarry ================= */
  const set = cbIsland(Lset, 'quarry');
  const flag = cbFlag(set.mid, 0.8); tr(flag, 1160, 600);
  const mum = cast(set.mid, 'mum'), pri = cast(set.mid, 'priya'), kav = cast(set.mid, 'kavya'),
    dad = cast(set.mid, 'dad'), boy = cast(set.mid, 'boy'), tan = cast(set.mid, 'tan');
  const HW = { mum: 110, pri: 255, kav: 400, dad: 830, boy: 975, tan: 1100 };
  // Dad's eraser: in his hand, and a giant one that flies at the arcs
  { const e = G(dad.hand); tr(e, 0, -30, 1, -10);
    E('rect', { x: -26, y: -16, width: 52, height: 32, rx: 6, fill: '#FF9CC8', stroke: SC_INK, 'stroke-width': 3 }, e);
    E('rect', { x: -26, y: -16, width: 20, height: 32, rx: 4, fill: '#3B82F6', stroke: SC_INK, 'stroke-width': 3 }, e); }
  const eraser = G(Lfg);
  E('rect', { x: -80, y: -42, width: 160, height: 84, rx: 14, fill: '#FF9CC8', stroke: SC_INK, 'stroke-width': 5 }, eraser);
  E('rect', { x: -80, y: -42, width: 62, height: 84, rx: 10, fill: '#3B82F6', stroke: SC_INK, 'stroke-width': 5 }, eraser);
  T(eraser, 30, 10, 'RUB', { size: 28, weight: 800, anchor: 'middle', fill: '#8E1B4B' });

  const needle = cast(Lcast, 'needle', { s: 0.62 });
  const cmp = cast(Lcast, 'compassa', { s: 0.85 });

  /* W: the clue card */
  const clue = G(Lfg);
  cbPaper(clue, 375, 106, 450, 214);
  mkText(clue, 600, 150, 'Construct **triangle ABC**', { size: 30, fill: MK.ink, anchor: 'middle' });
  mkMath(clue, 600, 194, 'AB = 7 cm, AC = 5 cm, BC = 6 cm', { size: 28, fill: MK.ink, anchor: 'middle' });
  { const g = G(clue), A0 = [490, 296], B0 = [598, 296], C0 = [532, 232];
    E('path', { d: mkPoly([A0, B0, C0]), fill: 'rgba(122,92,255,0.12)', stroke: VIO, 'stroke-width': 3, 'stroke-dasharray': '8 6' }, g);
    T(g, A0[0] - 14, A0[1] + 6, 'A', { size: 22, weight: 800, anchor: 'middle', fill: MK.ink });
    T(g, B0[0] + 14, B0[1] + 6, 'B', { size: 22, weight: 800, anchor: 'middle', fill: MK.ink });
    T(g, C0[0], C0[1] - 8, 'C', { size: 22, weight: 800, anchor: 'middle', fill: MK.ink });
    mkText(g, 700, 260, '**sketch**\n**first**', { size: 26, fill: VIO, anchor: 'middle' }); }
  const cCheck = mkChip(Lfg, 'Checkpoint 2: **the quarry**', { size: 30, col: GOLD });
  const cPass = mkChip(Lfg, 'Pass the **compass**!', { size: 30, col: '#FFFFFF' });
  const cPair = mkChip(Lfg, 'a **pair of compasses**', { size: 30, col: PINK });
  const cBiscuit = mkChip(Lfg, 'a needle in a **biscuit tin**', { size: 28, col: '#A4BCCB' });

  /* ================= K: the SSS construction card (1 cm = 40 px) ================= */
  const K = G(Lpaper);
  cbPaper(K, 560, 108, 610, 554, { grid: true, cell: 40 });
  const A = [690, 560], B = [970, 560], Cc = [690 + 108.57, 560 - 168];
  mkMath(K, 865, 160, 'AB = 7 cm, AC = 5 cm, BC = 6 cm', { size: 34, fill: MK.ink, anchor: 'middle' });
  const cSSS = mkChip(K, '**SSS**: three sides', { size: 30, col: VIO, fill: '#FFFFFF' });
  tr(cSSS, 865, 220);
  const ruler = mkRuler(K, 8, { unit: 40, readCol: RED }); tr(ruler, A[0], A[1]);
  const segAB = cbSeg(K, A[0], A[1], B[0], B[1], { width: 5 });
  const arcA = cbArc(K, A[0], A[1], 200, -35, -80, { col: VIO, width: 4.5 });
  const arcB = cbArc(K, B[0], B[1], 240, -155, -115, { col: '#E0457B', width: 4.5 });
  const segAC = cbSeg(K, A[0], A[1], Cc[0], Cc[1], { width: 5 }), segBC = cbSeg(K, B[0], B[1], Cc[0], Cc[1], { width: 5 });
  const dA = cbDot(K, A[0], A[1], 'A', { dx: -26, dy: 10 }), dB = cbDot(K, B[0], B[1], 'B', { dx: 28, dy: 10 });
  const dC = cbDot(K, Cc[0], Cc[1], 'C', { dx: -4, dy: -22, col: '#B0123E' });
  const lab5 = mkText(K, 718, 466, '5 cm', { size: 30, fill: VIO, anchor: 'end', halo: MK.paper });
  const lab6 = mkText(K, 900, 466, '6 cm', { size: 30, fill: '#E0457B', anchor: 'start', halo: MK.paper });
  const lab7 = mkText(K, 830, 602, '7 cm', { size: 30, fill: MK.ink, anchor: 'middle', halo: MK.paper });
  const cR5 = mkChip(K, 'open to **5 cm**', { size: 28, col: VIO, fill: '#FFFFFF' });
  const cR6 = mkChip(K, 'open to **6 cm**', { size: 28, col: '#E0457B', fill: '#FFFFFF' });
  const cWork = mkChip(K, 'the arcs = your **working**', { size: 30, col: '#FFFFFF', fill: '#B0123E', stroke: '#B0123E' });
  const cKeep = mkChip(K, 'keep them!', { size: 28, col: '#B0123E', fill: '#FFFFFF' });

  /* ================= S: Ah Boy's sticks (1 unit = 50 px) ================= */
  const SK = G(Lpaper);
  cbPaper(SK, 560, 108, 610, 554, { grid: true, cell: 50 });
  const L0 = [680, 560], R0 = [1080, 560], U = 50;
  const hdr = ['3, 4, 8', '3, 5, 8', '3, 6, 8'].map(s => mkText(SK, 865, 168, `Ah Boy's sticks: {{${s}}}`, { size: 34, fill: MK.ink, anchor: 'middle' }));
  const reachL = cbArc(SK, L0[0], L0[1], 3 * U, -100, 0, { col: VIO, width: 4 }), reachR = cbArc(SK, R0[0], R0[1], 4 * U, -180, -80, { col: '#E0457B', width: 4 });
  reachL.setAttribute('stroke-dasharray', '0.025 0.018'); reachR.setAttribute('stroke-dasharray', '0.025 0.018');
  const gapG = G(SK);
  E('path', { d: `M${L0[0] + 150},${L0[1] - 34} L${L0[0] + 150},${L0[1] + 30} M${R0[0] - 200},${R0[1] - 34} L${R0[0] - 200},${R0[1] + 30}`, stroke: RED, 'stroke-width': 4, 'stroke-dasharray': '6 5' }, gapG);
  mkText(gapG, (L0[0] + 150 + R0[0] - 200) / 2, L0[1] - 44, '**gap**', { size: 28, fill: RED, anchor: 'middle', halo: MK.paper });
  const sBase = stick(SK, '#D9A35E'), sL = stick(SK), sR = stick(SK);
  const wIneq = mkMath(SK, 865, 250, '3 + 4 = 7 < 8', { size: 50, fill: RED, anchor: 'middle' });
  const wIneqT = mkText(SK, 865, 300, "the short sides **can't reach** each other", { size: 28, fill: MK.ink, anchor: 'middle' });
  const cFlat = mkChip(SK, '{{3 + 5 = 8}}: **flat**', { size: 30, col: '#B85C00', fill: '#FFFFFF' });
  const cTri = mkChip(SK, '**triangle!**', { size: 32, col: GREEN, fill: '#FFFFFF' });
  const ruleG = G(SK);
  mkText(ruleG, 865, 236, 'The two **shorter** sides must add to\n**more than** the longest side', { size: 30, fill: MK.ink, anchor: 'middle', boldFill: '#5A3FD8' });
  const ruleM = mkMath(ruleG, 845, 352, '3 + 6 = 9 > 8', { size: 48, fill: GREEN, anchor: 'middle' });
  { const c = tick(ruleG, 20, GREEN); tr(c, 845 + ruleM.w / 2 + 34, 336); }
  const brace8 = mkBrace(SK, L0[0], L0[1] + 36, R0[0], L0[1] + 36, { text: 'longest: **8**', col: MK.ink, size: 28, flip: true });

  /* ================= A: Team Priya's ASA card ================= */
  const AK = G(Lpaper);
  cbPaper(AK, 560, 108, 610, 554, { grid: true, cell: 40 });
  const ourG = G(AK);
  mkText(ourG, 865, 165, "**Team Priya's card**", { size: 32, fill: '#B0123E', anchor: 'middle' });
  mkWorking(ourG, 840, 200, ['XY = 8 cm', '"angle" X = 50°', '"angle" Y = 65°'], { size: 40, fill: MK.ink });
  const noC = G(ourG); tr(noC, 865, 545);
  { const c = mkChip(noC, 'no compasses', { size: 32, col: RED, fill: '#FFFFFF' }); c.set(1);
    const x = cross(noC, 16); tr(x, c.w / 2 + 30, 0); }
  // the three cases
  const cases = G(AK);
  mkText(cases, 865, 162, 'Constructing a triangle', { size: 32, fill: MK.ink, anchor: 'middle' });
  const rowsCase = [
    ['SSS', 'three sides', '**compasses** for the arcs', VIO],
    ['SAS', 'two sides + the angle **between**', 'e.g. {{PQ = 6 cm}}, {{40°}}, {{PR = 4.5 cm}}', '#2E7DD8'],
    ['ASA', 'two angles + the side **between**', '**ruler** and **protractor**', '#B0123E']].map(([tag, a, b, col], i) => {
    const g = G(cases), y = 228 + i * 118;
    const band = E('rect', { x: 584, y: y - 8, width: 562, height: 100, rx: 14, fill: 'rgba(255,228,92,0.45)', stroke: '#E0A100', 'stroke-width': 3 }, g);
    const c = mkChip(g, `**${tag}**`, { size: 30, col: '#FFFFFF', fill: col, stroke: col }); c.set(1); tr(c, 646, y + 42);
    mkText(g, 712, y + 34, a, { size: 28, fill: MK.ink, boldFill: col });
    mkText(g, 712, y + 76, b, { size: 26, fill: '#5A6670' });
    g.band = band; return g;
  });
  // the ASA construction: XY = 320 px, 50° at X, 65° at Y
  const asa = G(AK);
  const X = [700, 600], Y = [1020, 600], Z = pt(700, 600, 320, 50);
  const segXY = cbSeg(asa, X[0], X[1], Y[0], Y[1], { width: 5 });
  const rayX = cbSeg(asa, X[0], X[1], ...pt(X[0], X[1], 380, 50), { width: 3, col: '#8FA3B8' });
  const rayY = cbSeg(asa, Y[0], Y[1], ...pt(Y[0], Y[1], 330, 115), { width: 3, col: '#8FA3B8' });
  const triZ = E('path', { d: mkPoly([X, Y, Z]), fill: 'rgba(176,18,62,0.1)', stroke: MK.ink, 'stroke-width': 5, 'stroke-linejoin': 'round' }, asa);
  const mX = mkAngleMark(asa, X[0], X[1], 0, 50, { r: 58, col: '#2E7DD8', label: '**50°**', size: 28, lr: 96 });
  const mY = mkAngleMark(asa, Y[0], Y[1], 115, 180, { r: 58, col: '#B0123E', label: '**65°**', size: 28, lr: 96 });
  const mY2 = mkAngleMark(asa, Y[0], Y[1], 115, 180, { r: 68, col: '#B0123E' });
  const zA1 = Math.atan2(-(X[1] - Z[1]), X[0] - Z[0]) * 180 / Math.PI, zA2 = Math.atan2(-(Y[1] - Z[1]), Y[0] - Z[0]) * 180 / Math.PI;
  const mZ = mkAngleMark(asa, Z[0], Z[1], zA1, zA2, { r: 50, col: '#B0123E', label: '**65°**', size: 28, lr: 90 });
  const mZ2 = mkAngleMark(asa, Z[0], Z[1], zA1, zA2, { r: 60, col: '#B0123E' });
  const dX = cbDot(asa, X[0], X[1], 'X', { dx: -24, dy: 12 }), dY = cbDot(asa, Y[0], Y[1], 'Y', { dx: 26, dy: 12 }), dZ = cbDot(asa, Z[0], Z[1], 'Z', { dx: 0, dy: -20 });
  const l8 = mkText(asa, 860, 640, '8 cm', { size: 28, fill: MK.ink, anchor: 'middle', halo: MK.paper });
  const tXY = ticks(asa, X[0], X[1], Y[0], Y[1], 1, '#E07A00'), tXZ = ticks(asa, X[0], X[1], Z[0], Z[1], 1, '#E07A00');
  const lXZ = mkText(asa, 772, 462, '8 cm', { size: 28, fill: '#E07A00', anchor: 'end', halo: MK.paper });
  const asaW = mkWorking(asa, 790, 140, ['"angle" Z = 180° − 50° − 65° = 65°'], { size: 32, fill: MK.ink });
  const asaIso = mkText(asa, 865, 236, 'two equal angles: **isosceles**', { size: 30, fill: MK.ink, anchor: 'middle', boldFill: '#B0123E' });
  const asaXZ = mkMath(asa, 865, 290, 'XZ = XY = 8 cm', { size: 38, fill: '#E07A00', anchor: 'middle' });

  /* lower third, blackout */
  const LT = cbLowerThird(Lhud, 'compassa');
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cuts */
  const k = id => at(id) - 0.06;
  const cK = k('sss'), cS = k('sticks'), cA = k('priya');
  // Compassa's dance on the card
  const s8 = 0.8, a5 = openFor(200, s8), a6 = openFor(240, s8);
  const poseK = t => {   // { x, y, th, fx, a, arms, mood }
    const p0 = { x: 1070, y: 610, th: 0, fx: 1, a: 16 };
    const pA = { x: A[0], y: A[1], th: 0, fx: 1, a: a5 };
    const pB = { x: B[0], y: B[1], th: 0, fx: -1, a: a6 };
    const mix = (a, b, p) => ({ x: lerp(a.x, b.x, p), y: lerp(a.y, b.y, p), th: lerp(a.th, b.th, p), fx: lerp(a.fx, b.fx, p), a: lerp(a.a, b.a, p) });
    if (t < at('sss2')) {
      const m = mix(p0, pA, P(t, mid('sss', 0.48), 0.7, ease));
      const r1 = P(t, mid('sss', 0.66), 0.5, ease), r2 = P(t, mid('sss', 0.76), 1.1, ease);
      m.th = -35 * r1 - 45 * r2; m.draw = r2; m.hop = Math.sin(P(t, mid('sss', 0.48), 0.7, linear) * Math.PI) * 30;
      return m;
    }
    if (t < at('c')) {
      const hp = P(t, at('sss2') + 0.1, 0.8, ease);
      const m = mix({ x: A[0], y: A[1], th: -80, fx: 1, a: a5 }, pB, hp);
      const r1 = P(t, mid('sss2', 0.38), 0.35, ease), r2 = P(t, mid('sss2', 0.5), 1.0, ease);
      m.th = hp < 1 ? m.th : 25 * r1 + 40 * r2; m.drawB = r2; m.hop = Math.sin(P(t, at('sss2') + 0.1, 0.8, linear) * Math.PI) * 40;
      return m;
    }
    if (t < at('never')) { const m = mix({ x: B[0], y: B[1], th: 65, fx: -1, a: a6 }, p0, P(t, at('c') + 0.1, 0.7, ease)); m.hop = Math.sin(P(t, at('c') + 0.1, 0.7, linear) * Math.PI) * 40; return m; }
    const m = mix(p0, { x: 640, y: 600, th: 0, fx: -1, a: 30 }, P(t, at('never') - 0.05, 0.35, ease));
    m.hop = Math.sin(P(t, at('never') - 0.05, 0.35, linear) * Math.PI) * 50; return m;
  };

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const sW = on(t, -1, cK), sK = on(t, cK, cS), sS = on(t, cS, cA), sA = on(t, cA, 1e9);
    const who = scWho(S, t);
    set.upd(t * AMP);
    LT.set(0);
    [cCheck, cPass, cPair, cBiscuit, cR5, cR6, cWork, cKeep, cFlat, cTri, cSSS].forEach(c => c.set(0));
    op(clue, 0); op(eraser, 0);
    op(K, sK); op(SK, sS); op(AK, sA);

    /* humans: who stands where in this shot */
    const X0 = Object.assign({}, HW), show = { mum: sW || sA, pri: sW || sA, kav: sW || sK || sS, dad: sW || sK, boy: sW || sS, tan: sW };
    if (sK) { X0.kav = 150; X0.dad = 380; }
    if (sS) { X0.boy = 150; X0.kav = 350; }
    if (sA) { X0.pri = 150; X0.mum = 365; }
    [[mum, 'mum'], [pri, 'pri'], [kav, 'kav'], [dad, 'dad'], [boy, 'boy'], [tan, 'tan']].forEach(([c, kk]) => { op(c, show[kk] ? 1 : 0); tr(c, X0[kk], kk === 'boy' ? 434 : 418, kk === 'boy' ? 0.8 : 0.85); });
    let mm = 'happy', ml = 0.6, mLift = 0, pm = 'smug', pl = 0.7, km = 'neutral', kl = 0.5, dm = 'happy', dl = 0.6, dLift = 0, bm = 'happy', bl = 0.6, bLift = 0, tm = 'neutral', tl = -0.8, tLift = 0;
    if (sW) {
      const cx = 600;
      ml = 1; pl = 1; kl = 1; dl = -0.6; bl = -0.8;
      if (t < at('duty')) { tm = 'happy'; tLift = 1; ml = 1; pl = 1; kl = 1; dl = 1; bl = 1; }
      else if (t < at('me')) { km = 'happy'; bm = 'happy'; mm = 'neutral'; pm = 'smug'; }
      else { km = 'shock'; dm = 'shock'; bm = 'happy'; mm = 'smug'; pm = 'smug'; tm = 'neutral'; }
    } else if (sK) {
      kl = 1; dl = 1;
      if (t >= at('c') && t < at('rub')) { km = 'happy'; }
      if (t >= at('rub') && t < at('never')) { dm = 'smug'; dLift = 1; km = 'annoyed'; kl = 1; }
      if (t >= at('never')) { dm = t > mid('never', 0.3) ? 'sad' : 'shock'; km = 'smug'; kl = 0.6; }
    } else if (sS) {
      bl = 1; kl = -0.8; bLift = t < at('ineq') ? 1 : 0;
      if (t >= at('sticks') && t < at('ineq')) bm = t > mid('sticks', 0.6) ? 'sad' : 'happy';
      if (t >= at('ineq') && t < at('boy2')) { km = 'neutral'; kl = 1; bm = 'neutral'; bl = 1; }
      if (t >= at('boy2')) { bm = 'happy'; bLift = t < at('rule') ? 1 : 0; km = 'happy'; }
      if (t >= at('rule')) { bl = 1; kl = 1; }
    } else {
      pl = 1; ml = 1; mLift = who === 'mum' ? 1 : 0;
      if (t < at('asa')) { pm = 'smug'; mm = 'smug'; ml = -0.8; }
      else { pm = t > at('iso') ? 'happy' : 'smug'; mm = 'smug'; pl = 0.9; }
    }
    mum.set({ t, talk: scTalk(S, t, 'mum'), mood: mm, look: ml, lift: mLift });
    pri.set({ t, talk: scTalk(S, t, 'priya'), mood: pm, look: pl, lift: who === 'priya' ? 1 : 0 });
    kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
    dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: dl, lift: dLift });
    boy.set({ t, talk: scTalk(S, t, 'boy'), mood: bm, look: bl, lift: bLift });
    tan.set({ t, talk: scTalk(S, t, 'tan'), mood: tm, look: tl, lift: tLift });

    /* Captain Needle and Madame Compassa */
    op(needle, sW && t >= at('duty') - 0.2 ? 1 : 0);
    op(cmp, (sW && t >= at('me') - 0.1) || sK || (sS && t >= at('rule') - 0.2) ? 1 : 0);
    if (sW) {
      op(clue, P(t, mid('clue', 0.12), 0.3, linear) * (1 - P(t, at('duty') - 0.2, 0.2, linear)));
      chipOn(cCheck, t, at('clue') - 0.05, 1e9, 900, 62);
      chipOn(cPass, t, mid('clue', 0.8), at('me'), 1000, 250);
      if (t >= at('duty') - 0.2) {
        const up = P(t, at('duty') - 0.2, 0.4, pop), shove = P(t, mid('me', 0.08), 0.35, easeOut);
        const r = shove > 0 && shove < 1 ? -18 * Math.sin(shove * Math.PI) : 0;
        tr(needle, lerp(615, 545, shove), lerp(600, 430, up), 0.62, r);
        needle.set({ t, talk: scTalk(S, t, 'needle'), mood: t < at('me') ? 'happy' : 'annoyed', look: t < at('me') ? 0 : 1, point: t < at('me') ? 0.55 : 0, needle: -r });
      }
      if (t >= at('me') - 0.1) {
        LT.set(win(t, at('me') + 0.2, at('me') + 3.3, 0.3));
        const inP = P(t, at('me') - 0.1, 0.55, easeOut);
        tr(cmp, lerp(1320, 690, inP), 440, 0.85);
        cmp.set({ t, talk: scTalk(S, t, 'compassa'), mood: 'smug', look: -1, arms: t > mid('me', 0.15) ? 1 : 0.3, twirl: inP < 1 ? inP * 2 : 0 });
        chipOn(cPair, t, mid('me', 0.3), 1e9, 870, 160);
        chipOn(cBiscuit, t, mid('me', 0.72), 1e9, 330, 160);
      }
    }

    /* ---------- K: SSS ---------- */
    if (sK) {
      cSSS.set(P(t, at('sss') + 0.1, 0.3, linear));
      const rl = P(t, mid('sss', 0.18), 1.0, ease), ruleOff = 1 - P(t, end('sss2') + 0.1, 0.3, linear);
      op(ruler, ruleOff); ruler.set(7 * rl, rl > 0.01 && t < mid('sss', 0.46) ? 1 : 0);
      segAB.set(rl); dA.set(rl > 0.02 ? 1 : 0); dB.set(rl > 0.98 ? 1 : 0);
      chipOn(cR5, t, mid('sss', 0.48), at('sss2'), 790, 300);
      chipOn(cR6, t, at('sss2') + 0.1, at('c'), 940, 300);
      const ps = poseK(t);
      arcA.set(ps.draw !== undefined ? ps.draw : t >= at('sss2') ? 1 : 0);
      arcB.set(ps.drawB !== undefined ? ps.drawB : t >= at('c') ? 1 : 0);
      placeC(cmp, ps.x, ps.y - (ps.hop || 0), s8, ps.th, ps.fx, ps.a);
      const drawing = (ps.draw > 0 && ps.draw < 1) || (ps.drawB > 0 && ps.drawB < 1);
      let cmMood = 'smug', arms = drawing ? 1 : 0.3;
      if (t >= at('never')) { cmMood = t < mid('never', 0.25) ? 'shock' : 'annoyed'; arms = 1; }
      cmp.set({ t, talk: scTalk(S, t, 'compassa'), mood: cmMood, look: t >= at('rub') ? -1 : 0, open: ps.a, arms, still: true });
      // C
      const cp = P(t, mid('c', 0.1), 0.3, linear);
      dC.set(cp); segAC.set(P(t, mid('c', 0.45), 0.5, linear)); segBC.set(P(t, mid('c', 0.6), 0.5, linear));
      op(lab5, P(t, mid('c', 0.75), 0.3, linear)); op(lab6, P(t, mid('c', 0.8), 0.3, linear)); op(lab7, P(t, mid('c', 0.85), 0.3, linear));
      // the eraser
      if (t >= at('rub')) {
        const go = P(t, mid('rub', 0.35), 1.1, ease), back = P(t, at('never') + 0.1, 0.5, ease);
        op(eraser, back < 1 ? 1 : 0);
        tr(eraser, lerp(lerp(470, 600, go), 280, back), lerp(lerp(380, 400, go), 520, back), lerp(0.7, 1, go), -14 + 8 * Math.sin(t * 9) * go * (1 - back) * AMP);
      }
      chipOn(cWork, t, mid('never', 0.4), 1e9, 865, 290);
      chipOn(cKeep, t, mid('never', 0.75), 1e9, 1060, 610);
    }

    /* ---------- S: the sticks ---------- */
    if (sS) {
      const ph = t < at('boy2') ? 0 : t < mid('boy2', 0.48) ? 1 : 2;
      hdr.forEach((h, i) => op(h, ph === i ? 1 : 0));
      sBase.set(L0[0], L0[1], R0[0], R0[1], '8', 1);
      let aL, aR, lenR = 4, lab = '4';
      if (ph === 0) {
        const sw = P(t, mid('sticks', 0.3), 1.6, ease);
        aL = lerp(80, 0, sw); aR = lerp(80, 0, sw);
        if (t >= at('ineq')) { aL = 0; aR = 0; }
      } else if (ph === 1) { lenR = 5; lab = '5'; aL = 0; aR = 0; }
      else {
        lenR = 6; lab = '6';
        const up = P(t, mid('boy2', 0.55), 0.6, pop);
        aL = lerp(0, Math.atan2(95.6, 115.6) * 180 / Math.PI, up); aR = lerp(0, Math.atan2(95.6, 400 - 115.6) * 180 / Math.PI, up);
      }
      const lt = [L0[0] + Math.cos(aL * Math.PI / 180) * 3 * U, L0[1] - Math.sin(aL * Math.PI / 180) * 3 * U];
      const rt = [R0[0] - Math.cos(aR * Math.PI / 180) * lenR * U, R0[1] - Math.sin(aR * Math.PI / 180) * lenR * U];
      const lift = (aL < 1 && aR < 1) ? 12 : 0;   // lying flat: drawn just above the base stick
      sL.set(L0[0], L0[1] - lift, lt[0], lt[1] - lift, '3', 1); sR.set(R0[0], R0[1] - lift, rt[0], rt[1] - lift, lab, -1);
      op(gapG, ph === 0 && t > mid('sticks', 0.72) ? 1 : 0);
      reachL.set(ph === 0 ? P(t, mid('ineq', 0.45), 0.8, linear) : 0); reachR.set(ph === 0 ? P(t, mid('ineq', 0.55), 0.8, linear) : 0);
      op(wIneq, ph === 0 ? P(t, at('ineq') + 0.1, 0.3, linear) : 0);
      op(wIneqT, ph === 0 ? P(t, mid('ineq', 0.6), 0.3, linear) : 0);
      chipOn(cFlat, t, at('boy2') + 0.2, mid('boy2', 0.48), 865, 260);
      chipOn(cTri, t, mid('boy2', 0.62), at('rule'), 865, 260);
      op(ruleG, P(t, at('rule') + 0.1, 0.3, linear));
      if (t >= at('rule')) { op(hdr[2], 0); }
      brace8.set(t >= at('rule') ? P(t, mid('rule', 0.3), 0.4, linear) : 0);
      if (t >= at('rule') - 0.2) {
        tr(cmp, 505, lerp(700, 470, P(t, at('rule') - 0.2, 0.4, pop)), 0.6);
        cmp.set({ t, talk: scTalk(S, t, 'compassa'), mood: t > mid('rule', 0.8) ? 'happy' : 'smug', look: 1, arms: t > mid('rule', 0.8) ? 1 : 0.4 });
      }
    }

    /* ---------- A: ASA ---------- */
    if (sA) {
      const ph = t < at('asa') ? 0 : t < at('iso') ? 1 : 2;
      op(ourG, ph === 0 ? 1 : 0); op(cases, ph === 1 ? 1 : 0); op(asa, ph === 2 ? 1 : 0);
      if (ph === 0) op(noC, P(t, mid('priya', 0.82), 0.3, linear));
      if (ph === 1) {
        op(rowsCase[0], 1);
        op(rowsCase[2], P(t, at('asa') + 0.1, 0.3, linear)); op(rowsCase[2].band, P(t, mid('asa', 0.18), 0.3, linear));
        op(rowsCase[1], P(t, mid('asa', 0.45), 0.3, linear)); op(rowsCase[1].band, 0); op(rowsCase[0].band, 0);
      }
      if (ph === 2) {
        const d = end('iso') - at('iso'), q = f => at('iso') + f * d;
        segXY.set(P(t, q(0), 0.6, linear)); dX.set(1); dY.set(P(t, q(0.04), 0.2, linear)); op(l8, P(t, q(0.05), 0.3, linear));
        rayX.set(P(t, q(0.08), 0.6, linear)); mX.set(P(t, q(0.1), 0.4, linear));
        rayY.set(P(t, q(0.16), 0.6, linear)); mY.set(P(t, q(0.18), 0.4, linear));
        op(triZ, P(t, q(0.26), 0.3, linear)); dZ.set(P(t, q(0.26), 0.3, linear));
        asaW.show(0, P(t, q(0.3), 0.4, linear));
        mZ.set(P(t, q(0.48), 0.4, linear)); mZ2.set(P(t, q(0.55), 0.3, linear)); mY2.set(P(t, q(0.55), 0.3, linear));
        op(asaIso, P(t, q(0.58), 0.3, linear));
        op(asaXZ, P(t, q(0.78), 0.3, linear)); op(tXY, P(t, q(0.8), 0.2, linear)); op(tXZ, P(t, q(0.8), 0.2, linear)); op(lXZ, P(t, q(0.84), 0.3, linear));
      }
    }
  };
});
