/* Scene 3: Lunch in the middle (perpendicular bisector and midpoint).
   One set-up, cut by walkie-talkie: Team Kavya (Dad, Kavya, Ah Boy) and Team Priya (Mum, Priya) in two walkie
   windows on the left; the island map card on the right (1 cm = 50 px), A = Team Kavya, B = Team Priya, AB = 9.6 cm.
   noon: the teams far apart, tummies grumble -> Mum: the same distance from both -> Dad: halfway -> zoom: halfway is
   in the mangrove swamp (a frog) -> Madame Compassa opens wider than half of AB (6 cm), arcs above and below from A
   -> the SAME width from B: the arcs cross at P and Q -> rule PQ: it cuts AB in half at 90°, the perpendicular
   bisector -> every point on it is equidistant from A and B -> AM = 9.6 ÷ 2 = 4.8 cm -> a café on the line 5.2 cm
   from A -> so 5.2 cm from B -> Ah Boy's card: a 7 cm line with compasses on 3 cm, the arcs stop short -> 7 ÷ 2 =
   3.5, 3 cm < 3.5 cm, open to 4 cm and the arcs cross. */
scene('lunch', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const GOLD = '#FFE45C', RED = '#C62828', BLUE = '#1E5BB8', GREEN = '#1E9E5A', VIO = '#7A5CFF', PINK = '#E0457B', ORA = '#E07A00';
  const chipOn = (c, t, t0, t1, x, y) => { c.set(t >= t0 && t < t1 ? P(t, t0, 0.35, linear) : 0); if (x !== undefined) tr(c, x, y); };
  const fade = (el, t, t0, d) => op(el, P(t, t0, d || 0.3, linear));
  const ticks = (parent, x1, y1, x2, y2, n, col) => {
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L;
    let d = '';
    for (let i = 0; i < n; i++) { const o = (i - (n - 1) / 2) * 10, cx = mx + ux * o, cy = my + uy * o; d += `M${(cx - uy * 12).toFixed(1)},${(cy + ux * 12).toFixed(1)} L${(cx + uy * 12).toFixed(1)},${(cy - ux * 12).toFixed(1)} `; }
    return E('path', { d, stroke: col || MK.ink, 'stroke-width': 4, 'stroke-linecap': 'round' }, parent);
  };
  const dash = (parent, a, b, col) => E('path', { d: `M${a[0]},${a[1]} L${b[0]},${b[1]}`, stroke: col, 'stroke-width': 4, 'stroke-dasharray': '12 8', 'stroke-linecap': 'round' }, parent);
  /* Madame Compassa placed by her NEEDLE tip (see 02_quarry.js): pencil at 2 L s sin(a), direction th (th + 180 mirrored) */
  const CL = 168, CHY = -54;
  const placeC = (c, x, y, s, th, fx, a) => {
    const ar = a * Math.PI / 180, nx = -Math.sin(ar) * CL, ny = CHY + Math.cos(ar) * CL, r = th * Math.PI / 180;
    const lx = fx * s * nx, ly = s * ny;
    const X = x - (lx * Math.cos(r) - ly * Math.sin(r)), Y = y - (lx * Math.sin(r) + ly * Math.cos(r));
    const fxs = Math.abs(fx) < 0.06 ? 0.06 * (fx < 0 ? -1 : 1) : fx;
    c.setAttribute('transform', `translate(${X.toFixed(2)} ${Y.toFixed(2)}) rotate(${th.toFixed(2)}) scale(${(fxs * s).toFixed(4)} ${s.toFixed(4)})`);
  };
  const openFor = (r, s) => Math.asin(r / (2 * CL * s)) * 180 / Math.PI;
  const span = (v, a, b) => clamp((v - a) / (b - a));   // progress of v from a to b (either direction)

  /* ---------- layers ---------- */
  const Lbg = G(root), Lcalls = G(root), Lmap = G(root), Lcast = G(root), Lfg = G(root), Lhud = G(root);

  /* background: the jungle, out of focus */
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#2F6E45', '#173A27', true) }, Lbg);
  { const r = rng(31); for (let i = 0; i < 14; i++) E('circle', { cx: r() * 1200, cy: r() * 750, r: 40 + r() * 90, fill: '#9FE0B5', opacity: 0.05 + r() * 0.05 }, Lbg); }

  /* ================= the two walkie-talkie windows ================= */
  const callK = scVideoCall(Lcalls, 290, 210, 'TEAM KAVYA'); tr(callK, 175, 262);
  const callP = scVideoCall(Lcalls, 290, 212, 'TEAM PRIYA'); tr(callP, 175, 540);
  const hiK = E('rect', { x: 30 - 6, y: 262 - 105 - 50, width: 302, height: 228 + 42, rx: 20, fill: 'none', stroke: GOLD, 'stroke-width': 5 }, Lcalls);
  const hiP = E('rect', { x: 30 - 6, y: 540 - 106 - 50, width: 302, height: 230 + 42, rx: 20, fill: 'none', stroke: GOLD, 'stroke-width': 5 }, Lcalls);
  // the kampong behind Team Priya: a zinc roof and stilts
  { const g = G(callP.screen);
    E('path', { d: 'M-150,-20 L-40,-90 L80,-20 Z', fill: '#9AA6B2', opacity: 0.55 }, g);
    E('rect', { x: -130, y: -20, width: 190, height: 70, fill: '#B07A45', opacity: 0.45 }, g); }
  { const g = G(callK.screen);
    E('rect', { x: -150, y: -70, width: 170, height: 30, rx: 6, fill: '#E8424F', opacity: 0.5 }, g); }
  const dad = cast(callK.screen, 'dad', { s: 0.62 }), kav = cast(callK.screen, 'kavya', { s: 0.62 }), boy = cast(callK.screen, 'boy', { s: 0.62 });
  tr(dad, -92, 22, 0.62); tr(kav, 6, 22, 0.62); tr(boy, 96, 34, 0.6);
  const mum = cast(callP.screen, 'mum', { s: 0.62 }), pri = cast(callP.screen, 'priya', { s: 0.62, prop: null });
  tr(mum, -66, 22, 0.62); tr(pri, 70, 24, 0.62);
  const grumK = mkChip(Lfg, '*grumble*', { size: 26, col: '#FFC27A' }), grumP = mkChip(Lfg, '*grumble*', { size: 26, col: '#FFC27A' });
  const cNoon = mkChip(Lfg, '**12 noon**', { size: 32, col: GOLD });

  /* ================= the island map (1 cm = 50 px) ================= */
  const MX0 = 350, MY0 = 108, MW = 820, MH = 554;
  const mapCard = G(Lmap);
  cbPaper(mapCard, MX0, MY0, MW, MH, { fill: '#DDF1FA' });
  const clipId = 'cbLunchClip';
  { const cp = E('clipPath', { id: clipId }, defs()); E('rect', { x: MX0 + 2, y: MY0 + 2, width: MW - 4, height: MH - 4, rx: 13 }, cp); }
  const mapClip = G(mapCard, { 'clip-path': `url(#${clipId})` }), map = G(mapClip);
  const A = [520, 385], B = [1000, 385], M = [760, 385], Pp = [760, 205], Qp = [760, 565], CAFE = [760, 285];
  E('path', { d: 'M380,240 Q420,140 560,150 Q700,120 820,160 Q980,130 1100,190 Q1160,260 1130,360 Q1150,470 1080,560 Q960,640 800,620 Q640,650 520,610 Q390,590 370,480 Q340,360 380,240 Z', fill: '#CFE8B8', stroke: '#8FBF7A', 'stroke-width': 4 }, map);
  // trails
  E('path', { d: 'M520,385 Q600,300 700,330 Q820,360 900,300 Q960,260 1000,385', fill: 'none', stroke: '#C9A46A', 'stroke-width': 5, 'stroke-dasharray': '4 9', 'stroke-linecap': 'round' }, map);
  // the mangrove swamp at the midpoint
  const swamp = G(map);
  E('ellipse', { cx: M[0], cy: M[1], rx: 84, ry: 48, fill: '#8C8A4C', stroke: '#5E5C2A', 'stroke-width': 3 }, swamp);
  { let d = ''; const r = rng(5); for (let i = 0; i < 12; i++) { const x = M[0] - 66 + i * 12 + r() * 6, y = M[1] - 18 + r() * 30; d += `M${x.toFixed(0)},${y.toFixed(0)} l${(r() * 6 - 3).toFixed(0)},-16 `; } E('path', { d, stroke: '#3E5A20', 'stroke-width': 3, 'stroke-linecap': 'round' }, swamp); }
  const frog = G(map); tr(frog, M[0] + 30, M[1] + 14, 0.5);
  E('ellipse', { cx: 0, cy: 0, rx: 22, ry: 15, fill: '#4CAF50', stroke: SC_INK, 'stroke-width': 3 }, frog);
  [-9, 9].forEach(x => { E('circle', { cx: x, cy: -14, r: 7, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 2.5 }, frog); E('circle', { cx: x, cy: -14, r: 3, fill: SC_INK }, frog); });
  // team flags at A and B
  const fA = cbFlag(map, 0.5); tr(fA, A[0], A[1]); const fB = cbFlag(map, 0.5); tr(fB, B[0], B[1]);
  T(map, A[0], A[1] + 44, 'Team Kavya', { size: 26, weight: 800, anchor: 'middle', fill: '#2E7DD8' });
  T(map, B[0], B[1] + 44, 'Team Priya', { size: 26, weight: 800, anchor: 'middle', fill: '#B0123E' });
  const ubin = T(map, 1110, 640, 'PULAU UBIN', { size: 26, weight: 800, anchor: 'end', fill: '#6E9A5A' });
  const segAB = E('path', { d: `M${A[0]},${A[1]} L${B[0]},${B[1]}`, stroke: MK.ink, 'stroke-width': 4 }, map);
  const dAB = [cbDot(map, A[0], A[1], 'A', { dx: -26, dy: 10 }), cbDot(map, B[0], B[1], 'B', { dx: 28, dy: 10 })];
  // halfway
  const dM = cbDot(map, M[0], M[1], 'M', { dx: 22, dy: -14, col: '#B0123E' });
  // the construction (r = 6 cm = 300 px)
  const R6 = 300;
  const aA1 = cbArc(map, A[0], A[1], R6, -50, -24, { col: VIO, width: 4.5 }), aA2 = cbArc(map, A[0], A[1], R6, 24, 50, { col: VIO, width: 4.5 });
  const aB1 = cbArc(map, B[0], B[1], R6, -130, -156, { col: PINK, width: 4.5 }), aB2 = cbArc(map, B[0], B[1], R6, 156, 130, { col: PINK, width: 4.5 });
  const radA = dash(map, A, Pp, VIO), radB = dash(map, B, Pp, PINK);
  const lab6A = mkText(map, 610, 280, '6 cm', { size: 28, fill: VIO, anchor: 'end', halo: '#DDF1FA' }), lab6B = mkText(map, 910, 280, '6 cm', { size: 28, fill: PINK, anchor: 'start', halo: '#DDF1FA' });
  const dP = cbDot(map, Pp[0], Pp[1], 'P', { dx: 24, dy: -8 }), dQ = cbDot(map, Qp[0], Qp[1], 'Q', { dx: 24, dy: 26 });
  const segPQ = cbSeg(map, M[0], 165, M[0], 605, { width: 5, col: '#B0123E' });
  const rtM = mkAngleMark(map, M[0], M[1], 0, 90, { r: 46, col: '#B0123E', width: 4 });
  const tAM = ticks(map, A[0], A[1], M[0], M[1], 1, ORA), tMB = ticks(map, M[0], M[1], B[0], B[1], 1, ORA);
  // equidistant points
  const eqPts = [[760, 245, '#2E7DD8', 1], [760, 500, GREEN, 2], [760, 565, ORA, 3]].map(([x, y, col, n]) => {
    const g = G(map);
    dash(g, A, [x, y], col); dash(g, B, [x, y], col);
    ticks(g, A[0], A[1], x, y, n, col); ticks(g, B[0], B[1], x, y, n, col);
    E('circle', { cx: x, cy: y, r: 8, fill: col, stroke: SC_INK, 'stroke-width': 2 }, g);
    return g;
  });
  // AM working and labels
  const lab48 = mkText(map, 680, 424, '4.8 cm', { size: 28, fill: ORA, anchor: 'middle', halo: '#DDF1FA' });
  const wAM = mkWorking(map, 448, 130, ['AB = 9.6 cm', 'AM = 9.6 ÷ 2 = 4.8 cm'], { size: 32, fill: MK.ink, gap: 18 });
  // the café
  const cafe = G(map); tr(cafe, CAFE[0], CAFE[1]);
  E('rect', { x: -30, y: -26, width: 60, height: 38, rx: 4, fill: '#FFF3D6', stroke: SC_INK, 'stroke-width': 3 }, cafe);
  E('path', { d: 'M-38,-26 L38,-26 L30,-44 L-30,-44 Z', fill: '#E8424F', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, cafe);
  E('path', { d: 'M-22,-26 l-4,-18 M-6,-26 l-1,-18 M6,-26 l1,-18 M22,-26 l4,-18', stroke: '#FFFFFF', 'stroke-width': 4 }, cafe);
  T(cafe, 0, 4, 'CAFÉ', { size: 18, weight: 800, anchor: 'middle', fill: '#8A3A10' });
  const cA = dash(map, A, CAFE, '#2E7DD8'), cB = dash(map, B, CAFE, '#B0123E');
  const tcA = ticks(map, A[0], A[1], CAFE[0], CAFE[1], 2, '#2E7DD8'), tcB = ticks(map, B[0], B[1], CAFE[0], CAFE[1], 2, '#B0123E');
  const l52A = mkText(map, 612, 316, '5.2 cm', { size: 30, fill: '#2E7DD8', anchor: 'middle', halo: '#DDF1FA' });
  const l52B = mkText(map, 908, 316, '5.2 cm', { size: 30, fill: '#B0123E', anchor: 'middle', halo: '#DDF1FA' });
  // chips over the map (screen space)
  const cSame = mkChip(Lfg, 'the **same distance** from both', { size: 30, col: '#B0123E', fill: '#FFFFFF' });
  const cHalf = mkChip(Lfg, '**halfway**', { size: 30, col: '#2E7DD8', fill: '#FFFFFF' });
  const cSwamp = mkChip(Lfg, '**MANGROVE SWAMP**', { size: 34, col: '#FFFFFF', fill: '#5E5C2A', stroke: '#3E3C1A' });
  const cMud = mkChip(Lfg, 'very muddy', { size: 28, col: '#5E5C2A', fill: '#FFFFFF' });
  const cRad = mkChip(Lfg, 'radius **more than half** of AB', { size: 30, col: VIO, fill: '#FFFFFF' });
  const cWidth = mkChip(Lfg, '**same width!**', { size: 32, col: PINK, fill: '#FFFFFF' });
  const cPB = mkChip(Lfg, '**perpendicular bisector**', { size: 30, col: '#FFFFFF', fill: '#B0123E', stroke: '#B0123E' });
  const cHalf2 = mkChip(Lfg, 'in half, at {{90°}}', { size: 28, col: '#B0123E', fill: '#FFFFFF' });
  const cEqui = mkChip(Lfg, '**equidistant** from A and B', { size: 30, col: GREEN, fill: '#FFFFFF' });
  const cPay = mkChip(Lfg, "Dad's paying", { size: 28, col: '#B0123E', fill: '#FFFFFF' });

  /* ================= Ah Boy's card (also 1 cm = 50 px) ================= */
  const boyCard = G(Lmap);
  cbPaper(boyCard, MX0, MY0, MW, MH, { grid: true, cell: 50 });
  const E1 = [585, 470], E2 = [935, 470];
  mkText(boyCard, 760, 158, "**Ah Boy's card**", { size: 32, fill: ORA, anchor: 'middle' });
  E('path', { d: `M${E1[0]},${E1[1]} L${E2[0]},${E2[1]}`, stroke: MK.ink, 'stroke-width': 5 }, boyCard);
  cbDot(boyCard, E1[0], E1[1], ''); cbDot(boyCard, E2[0], E2[1], '');
  mkText(boyCard, 660, 516, '7 cm', { size: 30, fill: MK.ink, anchor: 'middle' });
  const b3 = [cbArc(boyCard, E1[0], E1[1], 150, -60, -20, { col: ORA }), cbArc(boyCard, E1[0], E1[1], 150, 20, 60, { col: ORA }),
    cbArc(boyCard, E2[0], E2[1], 150, -120, -160, { col: ORA }), cbArc(boyCard, E2[0], E2[1], 150, 160, 120, { col: ORA })];
  const gap3 = G(boyCard);
  E('path', { d: 'M726,400 L794,400', stroke: RED, 'stroke-width': 4, 'stroke-dasharray': '6 5' }, gap3);
  mkText(gap3, 760, 380, '**gap**', { size: 28, fill: RED, anchor: 'middle', halo: MK.paper });
  const cOn3 = mkChip(boyCard, 'compasses on **3 cm**', { size: 30, col: ORA, fill: '#FFFFFF' }); tr(cOn3, 760, 218);
  const w35 = mkMath(boyCard, 760, 228, '7 ÷ 2 = 3.5', { size: 42, fill: MK.ink, anchor: 'middle' });
  const wLt = G(boyCard); mkMath(wLt, 560, 288, '3 cm < 3.5 cm', { size: 34, fill: RED, anchor: 'middle' }); { const c = cross(wLt, 15); tr(c, 690, 276); }
  const wGt = G(boyCard); mkMath(wGt, 935, 288, '4 cm > 3.5 cm', { size: 34, fill: GREEN, anchor: 'middle' }); { const c = tick(wGt, 15, GREEN); tr(c, 1066, 276); }
  const b4 = [cbArc(boyCard, E1[0], E1[1], 200, -45, -15, { col: VIO, width: 4.5 }), cbArc(boyCard, E1[0], E1[1], 200, 15, 45, { col: VIO, width: 4.5 }),
    cbArc(boyCard, E2[0], E2[1], 200, -135, -165, { col: PINK, width: 4.5 }), cbArc(boyCard, E2[0], E2[1], 200, 165, 135, { col: PINK, width: 4.5 })];
  const x4 = [cbDot(boyCard, 760, 470 - 96.8, ''), cbDot(boyCard, 760, 470 + 96.8, '')];
  const seg4 = cbSeg(boyCard, 760, 340, 760, 600, { width: 4, col: '#B0123E' });

  /* Madame Compassa */
  const cmp = cast(Lcast, 'compassa', { s: 1 });
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* poses (needle tip, turn, mirror, opening, scale) */
  const a6 = openFor(R6, 1), a4 = openFor(200, 1);
  const OFF = { x: 420, y: 646, th: 0, fx: 1, a: 16, s: 0.72 };
  const mix = (a, b, p) => ({ x: lerp(a.x, b.x, p), y: lerp(a.y, b.y, p), th: lerp(a.th, b.th, p), fx: lerp(a.fx, b.fx, p), a: lerp(a.a, b.a, p), s: lerp(a.s, b.s, p) });
  const hopY = (t, t0, d) => Math.sin(P(t, t0, d, linear) * Math.PI) * 40;

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const who = scWho(S, t);
    const boyPh = t >= at('boy') - 0.06;
    op(mapCard, boyPh ? 0 : 1); op(boyCard, boyPh ? 1 : 0);
    [grumK, grumP, cNoon, cSame, cHalf, cSwamp, cMud, cRad, cWidth, cPB, cHalf2, cEqui, cPay].forEach(c => c.set(0));

    /* walkies */
    const kTalk = who === 'dad' || who === 'kavya' || who === 'boy', pTalk = who === 'mum' || who === 'priya';
    op(hiK, kTalk ? 1 : 0); op(hiP, pTalk ? 1 : 0);
    let dm = 'happy', dl = 0.4, dLift = 0, km = 'neutral', kl = -0.3, bm = 'happy', bl = -0.5, bLift = 0, mm = 'smug', ml = 0.5, mLift = 0, pm = 'smug', pl = -0.5;
    if (t < at('fair')) { dm = 'sad'; km = 'sad'; bm = 'sad'; mm = 'sad'; pm = 'annoyed'; }
    else if (t < at('half')) { mLift = 1; ml = 0.6; pl = -0.7; }
    else if (t < at('swamp')) { dm = 'smug'; dLift = 1; dl = 0.6; km = 'neutral'; kl = -1; }
    else if (t < at('arcs')) { km = 'deadpan'; kl = -1; dm = 'sad'; dl = 0.6; bm = 'neutral'; }
    else if (t < at('am')) { km = 'happy'; kl = 0.8; dl = 0.8; bl = 0.8; ml = 0.8; pl = 0.8; dm = 'neutral'; }
    else if (t < at('cafe')) { km = 'smug'; kl = 0.8; }
    else if (t < at('pay')) { dm = 'happy'; dLift = 1; dl = 0.7; }
    else if (t < at('boy')) { mm = 'smug'; mLift = 1; dm = t > mid('pay', 0.7) ? 'sad' : 'happy'; dl = -0.3; km = 'happy'; bm = 'happy'; pm = 'happy'; }
    else { bm = t < at('wider') ? 'happy' : 'neutral'; bLift = t < at('wider') ? 1 : 0; bl = 0.9; km = 'neutral'; kl = 0.9; dm = 'neutral'; dl = 0.9; }
    dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: dl, lift: dLift });
    kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
    boy.set({ t, talk: scTalk(S, t, 'boy'), mood: bm, look: bl, lift: bLift });
    mum.set({ t, talk: scTalk(S, t, 'mum'), mood: mm, look: ml, lift: mLift });
    pri.set({ t, talk: scTalk(S, t, 'priya'), mood: pm, look: pl });
    if (t < at('fair') + 0.4) {
      const w = Math.sin(t * 14) * 3 * AMP;
      chipOn(grumK, t, mid('noon', 0.6), at('fair') + 0.4, 240 + w, 345); chipOn(grumP, t, mid('noon', 0.7), at('fair') + 0.4, 240 - w, 622);
    }

    /* ---------- the map ---------- */
    if (!boyPh) {
      chipOn(cNoon, t, at('noon') + 0.1, at('fair'), 760, 160);
      // zoom into the swamp on Kavya's line
      const z = P(t, at('swamp') - 0.05, 0.35, ease) * (1 - P(t, at('arcs') - 0.2, 0.25, ease));
      const k = 1 + 1.6 * z;
      map.setAttribute('transform', `translate(${M[0]} ${lerp(M[1], 390, z)}) scale(${k.toFixed(3)}) translate(${-M[0]} ${-M[1]})`);
      op(frog, z > 0.3 ? 1 : 0); tr(frog, M[0] + 30, M[1] + 14 - (Math.sin(t * 5) > 0.7 ? 4 : 0), 0.5);
      chipOn(cSwamp, t, at('swamp') + 0.25, at('arcs') - 0.2, 760, 210);
      chipOn(cMud, t, mid('swamp', 0.55), at('arcs') - 0.2, 760, 560);
      op(swamp.firstChild, t >= at('pq') ? 0.4 : 1); op(ubin, t < at('arcs') ? 1 : 0);
      chipOn(cSame, t, mid('fair', 0.35), at('half'), 760, 170);
      dM.set(t >= mid('half', 0.25) && t < at('pq') ? P(t, mid('half', 0.25), 0.3, linear) : t >= at('pq') ? 1 : 0);
      chipOn(cHalf, t, mid('half', 0.3), at('swamp'), 760, 300);
      // Compassa's arcs from A then B
      const dance = t >= at('arcs') - 0.2;
      op(cmp, dance ? 1 : 0);
      let ps = OFF, cm = 'smug', arms = 0.3;
      if (dance) {
        if (t < at('same')) {
          const inP = P(t, at('arcs') - 0.2, 0.5, ease), op6 = P(t, mid('arcs', 0.2), 0.5, ease);
          ps = mix(Object.assign({}, OFF, { s: 1 }), { x: A[0], y: A[1], th: -60, fx: 1, a: 16, s: 1 }, inP);
          ps.a = lerp(16, a6, op6);
          ps.th = lerp(-60, 60, P(t, mid('arcs', 0.42), 2.6, linear));
          if (inP < 1) ps.y -= hopY(t, at('arcs') - 0.2, 0.5);
          arms = op6 > 0 ? 1 : 0.3;
        } else if (t < at('pq')) {
          const hp = P(t, at('same') - 0.05, 0.5, ease);
          ps = mix({ x: A[0], y: A[1], th: 60, fx: 1, a: a6, s: 1 }, { x: B[0], y: B[1], th: 60, fx: -1, a: a6, s: 1 }, hp);
          ps.y -= hopY(t, at('same') - 0.05, 0.5);
          if (hp >= 1) ps.th = lerp(60, -60, P(t, mid('same', 0.22), 2.2, linear));
          arms = 1;
        } else if (t < at('boy') - 0.06) {
          const hp = P(t, at('pq') - 0.05, 0.5, ease);
          ps = mix({ x: B[0], y: B[1], th: -60, fx: -1, a: a6, s: 1 }, OFF, hp); ps.y -= hopY(t, at('pq') - 0.05, 0.5);
          cm = who === 'compassa' ? 'smug' : 'happy'; arms = who === 'compassa' ? 1 : 0.3;
        }
        placeC(cmp, ps.x, ps.y, ps.s, ps.th, ps.fx, ps.a);
        cmp.set({ t, talk: scTalk(S, t, 'compassa'), mood: cm, look: 0, open: ps.a, arms, still: true });
      }
      // arc progress follows her pencil
      const thA = t < at('same') ? lerp(-60, 60, P(t, mid('arcs', 0.42), 2.6, linear)) : 60;
      const thB = t < at('same') ? 60 : t < at('pq') && P(t, at('same') - 0.05, 0.5, ease) < 1 ? 60 : lerp(60, -60, P(t, mid('same', 0.22), 2.2, linear));
      const started = t >= mid('arcs', 0.42);
      aA1.set(started ? span(thA, -50, -24) : 0); aA2.set(started ? span(thA, 24, 50) : 0);
      const startedB = t >= mid('same', 0.22);
      aB1.set(startedB ? span(thB, 50, 24) : 0); aB2.set(startedB ? span(thB, -24, -50) : 0);
      chipOn(cRad, t, mid('arcs', 0.12), at('same'), 760, 640);
      chipOn(cWidth, t, at('same') + 0.1, at('pq'), 760, 640);
      const rv = t >= mid('same', 0.3) && t < at('pq') ? 1 : 0;
      op(radA, rv); op(radB, rv); op(lab6A, rv); op(lab6B, rv);
      const pq = P(t, mid('same', 0.92), 0.3, linear);
      dP.set(pq); dQ.set(pq);
      // perpendicular bisector
      segPQ.set(P(t, mid('pq', 0.15), 0.7, linear));
      rtM.set(P(t, mid('pq', 0.5), 0.3, linear)); op(tAM, P(t, mid('pq', 0.45), 0.3, linear)); op(tMB, P(t, mid('pq', 0.45), 0.3, linear));
      chipOn(cHalf2, t, mid('pq', 0.45), at('equi'), 1000, 470);
      chipOn(cPB, t, mid('pq', 0.72), 1e9, 1000, 214);
      // equidistant
      eqPts.forEach((g, i) => op(g, t >= at('equi') && t < at('am') ? P(t, mid('equi', 0.3 + i * 0.15), 0.3, linear) : 0));
      chipOn(cEqui, t, mid('equi', 0.45), at('am'), 1000, 620);
      // AM
      op(wAM, t >= at('am') ? 1 : 0); wAM.show(0, P(t, mid('am', 0.05), 0.3, linear)); wAM.show(1, P(t, mid('am', 0.45), 0.3, linear));
      op(lab48, P(t, mid('am', 0.7), 0.3, linear));
      // the café
      op(cafe, t >= mid('cafe', 0.05) ? 1 : 0);
      if (t >= at('cafe')) tr(cafe, CAFE[0], CAFE[1], Math.max(0.01, P(t, mid('cafe', 0.05), 0.35, pop)));
      op(cA, P(t, mid('cafe', 0.35), 0.3, linear)); op(tcA, P(t, mid('cafe', 0.4), 0.3, linear)); op(l52A, P(t, mid('cafe', 0.4), 0.3, linear));
      op(cB, P(t, mid('pay', 0.12), 0.3, linear)); op(tcB, P(t, mid('pay', 0.2), 0.3, linear)); op(l52B, P(t, mid('pay', 0.15), 0.3, linear));
      chipOn(cPay, t, mid('pay', 0.7), 1e9, 1000, 620);
    } else {
      /* ---------- Ah Boy's card ---------- */
      b3.forEach((a, i) => a.set(P(t, at('boy') + 0.1 + i * 0.25, 0.4, linear)));
      op(gap3, P(t, mid('boy', 0.45), 0.3, linear) * (1 - P(t, mid('wider', 0.55), 0.3, linear)));
      op(cOn3, t < at('wider') ? P(t, mid('boy', 0.6), 0.3, linear) : 0);
      op(w35, P(t, at('wider') + 0.1, 0.3, linear));
      op(wLt, P(t, mid('wider', 0.28), 0.3, linear)); op(wGt, P(t, mid('wider', 0.62), 0.3, linear));
      b3.forEach(a => op(a, 1 - 0.65 * P(t, mid('wider', 0.55), 0.3, linear)));
      // Compassa redraws at 4 cm: from E1 then (mirrored) from E2
      const t1 = mid('wider', 0.5), t2 = mid('wider', 0.74);
      op(cmp, 1);
      let ps;
      const th1 = lerp(-50, 50, P(t, t1 + 0.35, 1.1, linear)), th2 = lerp(50, -50, P(t, t2 + 0.35, 1.1, linear));
      if (t < t1) ps = mix(OFF, { x: E1[0], y: E1[1], th: -50, fx: 1, a: a4, s: 1 }, P(t, t1 - 0.4, 0.75, ease));
      else if (t < t2) ps = { x: E1[0], y: E1[1], th: th1, fx: 1, a: a4, s: 1 };
      else if (t < t2 + 0.35) ps = mix({ x: E1[0], y: E1[1], th: 50, fx: 1, a: a4, s: 1 }, { x: E2[0], y: E2[1], th: 50, fx: -1, a: a4, s: 1 }, P(t, t2, 0.35, ease));
      else if (t < end('wider') + 0.2) ps = { x: E2[0], y: E2[1], th: th2, fx: -1, a: a4, s: 1 };
      else ps = mix({ x: E2[0], y: E2[1], th: -50, fx: -1, a: a4, s: 1 }, OFF, P(t, end('wider') + 0.2, 0.5, ease));
      placeC(cmp, ps.x, ps.y, ps.s, ps.th, ps.fx, ps.a);
      cmp.set({ t, talk: scTalk(S, t, 'compassa'), mood: t > end('wider') ? 'happy' : 'smug', look: 0, open: ps.a, arms: who === 'compassa' ? 1 : 0.3, still: true });
      b4[0].set(t >= t1 ? span(th1, -45, -15) : 0); b4[1].set(t >= t1 ? span(th1, 15, 45) : 0);
      b4[2].set(t >= t2 ? span(th2, 45, 15) : 0); b4[3].set(t >= t2 ? span(th2, -15, -45) : 0);
      const cr = P(t, t2 + 1.4, 0.3, linear);
      x4.forEach(d => d.set(cr)); seg4.set(P(t, t2 + 1.5, 0.5, linear));
    }
  };
});
