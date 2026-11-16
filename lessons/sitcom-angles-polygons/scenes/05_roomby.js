/* Scene 5: Roomby turns the corner (angles in polygons).
   Shots (hard sitcom cuts):
   F  the bare kitchen floor from above, 4 p.m., tile dust; Rex in his corner (bottom left); the humans as busts
      along the bottom edge on the right, looking down; a dark panel at the top right for the working.
      Mum switches on the robot vacuum from her tablet.
   R  Roomby's talking head (lower third ROOMBY): "I clean in polygons. At every corner, I turn. Beep."
   F  Ah Boy: a regular pentagon! The showpiece: Roomby drives it, leaving a clean track; at each corner an exterior
      wedge of 72° appears; back at the start it faces the way it started; the five wedges slide together into one
      full turn, 360°. 360° ÷ 5 = 72° (exterior), 180° − 72° = 108° (interior: inside + outside is a straight line).
      Dad's hexagon: six triangles from the centre, 6 × 180° (2× phone) -> REJECTED: from one corner, 6 − 2 = 4
      triangles, 4 × 180° = 720°. "Minus two, then times one-eighty!" (n − 2) × 180°; a decagon from one corner:
      8 × 180° = 1440°. Priya: 360 ÷ 6 = 60° inside? -> that's the exterior; inside 180° − 60° = 120°.
      Mr Tan: interior 160°, n = ? -> exterior 20°, n = 360 ÷ 20 = 18; Roomby starts an 18-gon.
   R  Roomby, dizzy. Beep. ...Boop. */
scene('roomby', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const fade = (t, t0, d) => P(t, t0, d || 0.3, linear);
  const GOLD = '#FFE45C', PINK = '#FF8FC8', RED = '#FF6B6B', GREEN = '#56D69B', BLUE = '#4CC9F0', INKL = C.ink;
  const EXT = '#FF6B5C', INT = '#FFC247', TRACK = '#D9D3C6', LINE = '#2A3340';
  const rad = a => a * Math.PI / 180;
  const pt = (x, y, r, a) => [x + Math.cos(rad(a)) * r, y - Math.sin(rad(a)) * r];          // maths angle
  const sp = (c, r, a) => [c[0] + Math.cos(rad(a)) * r, c[1] + Math.sin(rad(a)) * r];         // screen angle
  const wedgeD = (r, a1, a2) => { const p1 = pt(0, 0, r, a1), p2 = pt(0, 0, r, a2); return `M0,0 L${p1[0].toFixed(1)},${p1[1].toFixed(1)} A${r},${r} 0 ${a2 - a1 > 180 ? 1 : 0} 0 ${p2[0].toFixed(1)},${p2[1].toFixed(1)} Z`; };
  const arcD = (r, a1, a2) => { const p1 = pt(0, 0, r, a1), p2 = pt(0, 0, r, a2); return `M${p1[0].toFixed(1)},${p1[1].toFixed(1)} A${r},${r} 0 ${a2 - a1 > 180 ? 1 : 0} 0 ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`; };
  /* wedge drawn at the local origin (maths angles a1 -> a2 anticlockwise), with an optional label */
  const wedge = (parent, r, a1, a2, col, o) => {
    o = o || {};
    const g = G(parent);
    E('path', { d: wedgeD(r, a1, a2), fill: col, opacity: o.fo === undefined ? 0.45 : o.fo }, g);
    E('path', { d: arcD(r, a1, a2), fill: 'none', stroke: col, 'stroke-width': 4, 'stroke-linecap': 'round' }, g);
    if (o.label) { const p = pt(0, 0, o.lr || r + 26, (a1 + a2) / 2); g.lab = mkMath(g, p[0], p[1] + (o.size || 26) * 0.36, o.label, { size: o.size || 26, fill: o.lcol || '#FFFFFF', anchor: 'middle', halo: '#2A3340', weight: 700 }); }
    return g;
  };
  const lab = (parent, x, y, src, o) => { o = o || {}; const s = o.size || 28; return mkMath(parent, x, y + s * 0.36, src, { size: s, fill: o.fill || '#FFFFFF', anchor: 'middle', halo: o.halo || '#2A3340', weight: 700 }); };
  const polyLine = (parent, pts, o) => { o = o || {}; return E('path', { d: mkPoly(pts), fill: o.fill || 'none', stroke: o.col || LINE, 'stroke-width': o.w || 6, 'stroke-linejoin': 'round', 'stroke-dasharray': o.dash || null }, parent); };
  const seg = (parent, a, b, o) => { o = o || {}; return E('line', { x1: a[0], y1: a[1], x2: b[0], y2: b[1], stroke: o.col || LINE, 'stroke-width': o.w || 4, 'stroke-dasharray': o.dash || null, 'stroke-linecap': 'round' }, parent); };
  const ngon = (c, n, R, start) => { const v = []; for (let k = 0; k < n; k++) v.push(sp(c, R, start + k * 360 / n)); return v; };
  const cen = (a, b, c) => [(a[0] + b[0] + c[0]) / 3, (a[1] + b[1] + c[1]) / 3];

  /* layers: floor, track, figures, panel, panel figures, cast, HUD */
  const Lbg = G(root), Ltrack = G(root), Lfig = G(root), Lpanel = G(root), Lpfig = G(root), Lcast = G(root), Lhud = G(root);

  /* ================= F: the floor from above ================= */
  const floorShot = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#4A5568' }, floorShot);
  const floor = agFloor(floorShot, { pattern: 'bare' });
  const dustG = G(Ltrack), r9 = rng(31);
  const dustPts = [[300, 230], [470, 200], [560, 380], [350, 420], [250, 330], [480, 470], [600, 250], [400, 300]];
  dustPts.forEach(([x, y]) => { const g = G(dustG); tr(g, x, y); for (let k = 0; k < 4; k++) E('circle', { cx: (r9() - 0.5) * 40, cy: (r9() - 0.5) * 26, r: 8 + r9() * 10, fill: '#8F877A', opacity: 0.55 }, g); });
  const cTime = mkChip(Lhud, '4 p.m.', { size: 34, col: GOLD });

  /* the panel (top right) */
  const PX = 930, panel = G(Lpanel);
  E('rect', { x: 690, y: 112, width: 480, height: 410, rx: 22, fill: 'rgba(10,27,39,0.92)', stroke: '#2C5468', 'stroke-width': 3 }, panel);

  /* --- the pentagon drive --- */
  const PC = [420, 320], PR = 165;
  const V = [0, 1, 2, 3, 4].map(k => sp(PC, PR, 126 - 72 * k));   // driving order: bottom-left, bottom-right, right, top, left
  const pent = G(Lfig);
  const pentDash = polyLine(pent, V, { col: '#FFFFFF', w: 4, dash: '14 10' });
  const pentLine = polyLine(pent, V, { col: LINE, w: 6 });
  const track = mkDash(E('path', { d: 'M' + V.concat([V[0]]).map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' L'), fill: 'none', stroke: TRACK, 'stroke-width': 62, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, Ltrack));
  Ltrack.insertBefore(track, dustG);
  // exterior wedges: at the corner after side i, from heading 72i to 72(i + 1) (maths degrees)
  const extW = [0, 1, 2, 3, 4].map(i => {
    const v = V[(i + 1) % 5], g = G(Lpfig);
    const ext = seg(g, [0, 0], pt(0, 0, 76, 72 * i), { col: '#FFFFFF', w: 4, dash: '9 7' });
    const w = wedge(g, 44, 72 * i, 72 * (i + 1), [EXT, '#FF9F43', GOLD, GREEN, BLUE][i], { label: '72°', lr: 74, size: 26 });
    g.ext = ext; g.v = v; return g;
  });
  const fullG = G(Lpanel);
  E('circle', { cx: PX, cy: 228, r: 58, fill: 'none', stroke: '#FFFFFF', 'stroke-width': 3, 'stroke-dasharray': '6 6', opacity: 0.6 }, fullG);
  const fullT = mkText(Lpanel, PX, 382, '**360°**: one **full turn**', { size: 38, anchor: 'middle', fill: INKL, boldFill: GOLD });
  const anyC = mkChip(Lpanel, 'any polygon, any number of sides', { size: 26, col: GREEN });
  const w72 = mkMath(Lpanel, PX, 396, '360° ÷ 5 = 72°', { size: 46, anchor: 'middle' });
  const n72 = mkText(Lpanel, PX, 452, 'each turn: the **exterior angle**', { size: 30, anchor: 'middle', fill: INKL, boldFill: EXT });
  // 108: interior and exterior at V1, on a straight line
  const c108 = G(Lfig);
  const strL = seg(c108, V[0], pt(V[1][0], V[1][1], 130, 0), { col: GOLD, w: 9 });
  wedge(G(c108, { transform: `translate(${V[1][0]} ${V[1][1]})` }), 40, 0, 72, EXT, { label: '72°', lr: 72, size: 30 });
  wedge(G(c108, { transform: `translate(${V[1][0]} ${V[1][1]})` }), 48, 72, 180, INT, { label: '108°', lr: 88, lcol: GOLD, size: 30 });
  const p108 = G(Lpanel);
  mkMath(p108, PX, 200, '180° − 72° = 108°', { size: 42, anchor: 'middle' });
  mkText(p108, PX, 256, 'the **interior angle**', { size: 30, anchor: 'middle', fill: INKL, boldFill: INT });
  mkText(p108, PX, 350, 'inside + outside', { size: 32, anchor: 'middle', fill: INKL });
  mkText(p108, PX, 400, '= a **straight line**, {{180°}}', { size: 32, anchor: 'middle', fill: INKL, boldFill: GOLD });

  /* --- hexagon: Dad's six triangles, then from one corner --- */
  const H = [0, 1, 2, 3, 4, 5].map(k => sp(PC, PR, 120 - 60 * k));   // bottom-left, bottom-right, right, top-right, top-left, left
  const hex = G(Lfig);
  polyLine(hex, H, { col: LINE, w: 6, fill: 'rgba(255,255,255,0.12)' });
  const spokes = G(hex);
  H.forEach((h, k) => { seg(spokes, PC, h, { col: '#C62828', w: 4 }); const c = cen(PC, h, H[(k + 1) % 6]); lab(spokes, c[0], c[1], String(k + 1), { size: 30, fill: '#FFD0D0', halo: '#7A1E1E' }); });
  const fan = G(hex);
  [2, 3, 4].forEach(k => seg(fan, H[0], H[k], { col: '#1E7A4A', w: 5 }));
  [1, 2, 3, 4].forEach(k => { const c = cen(H[0], H[k], H[k + 1]); lab(fan, c[0], c[1], String(k), { size: 32, fill: '#FFFFFF', halo: '#1E5A3A' }); });
  const cornerDot = E('circle', { cx: H[0][0], cy: H[0][1], r: 11, fill: GREEN, stroke: '#FFFFFF', 'stroke-width': 3 }, fan);
  const pHex = G(Lpanel);
  mkText(pHex, PX, 190, '**hexagon**: 6 sides', { size: 34, anchor: 'middle', fill: INKL, boldFill: BLUE });
  const hexW = mkMath(pHex, PX, 290, '6 × 180°', { size: 52, anchor: 'middle', fill: '#FF9A9A' });
  const hexQ = T(pHex, PX + hexW.w / 2 + 34, 290, '?', { size: 56, weight: 800, anchor: 'middle', fill: RED });
  const pRej = G(Lpanel);
  mkText(pRej, PX, 182, 'from **one corner**:', { size: 32, anchor: 'middle', fill: INKL, boldFill: GREEN });
  const wRej = mkWorking(pRej, 860, 214, [{ m: '6 − 2 = 4', note: 'triangles' }, '4 × 180° = 720°'], { size: 38, gap: 18, noteX: 76, noteSize: 32, noteCol: '#FFFFFF' });
  const mnemT = G(Lpanel);
  mkText(mnemT, PX, 410, '**Minus two**,', { size: 36, anchor: 'middle', fill: INKL, boldFill: GOLD });
  mkText(mnemT, PX, 460, 'then **times one-eighty!**', { size: 36, anchor: 'middle', fill: INKL, boldFill: GOLD });
  const stamp = agStamp(Lhud, false);
  const phone = agPhone(Lhud, { speed: '2×' });

  /* --- decagon: the rule --- */
  const D = []; for (let k = 0; k < 10; k++) D.push(sp(PC, PR, 108 + 36 * k));
  const dec = G(Lfig);
  polyLine(dec, D, { col: LINE, w: 6, fill: 'rgba(255,255,255,0.12)' });
  for (let k = 2; k <= 8; k++) seg(dec, D[0], D[k], { col: '#1E7A4A', w: 4 });
  for (let k = 1; k <= 8; k++) { const c = cen(D[0], D[k], D[k + 1]); lab(dec, c[0], c[1], String(k), { size: 26, fill: '#FFFFFF', halo: '#1E5A3A' }); }
  E('circle', { cx: D[0][0], cy: D[0][1], r: 10, fill: GREEN, stroke: '#FFFFFF', 'stroke-width': 3 }, dec);
  const pRule = G(Lpanel);
  const ruleM = mkMath(pRule, PX, 200, '(n − 2) × 180°', { size: 54, anchor: 'middle', fill: GOLD });
  mkText(pRule, PX, 250, '**n** sides', { size: 30, anchor: 'middle', fill: INKL });
  const pDec = G(pRule);
  mkText(pDec, PX, 330, '**decagon**: {{n = 10}}', { size: 34, anchor: 'middle', fill: INKL, boldFill: BLUE });
  const w1440 = mkWorking(pDec, 880, 370, ['10 − 2 = 8', '8 × 180° = 1440°'], { size: 38, gap: 16 });

  /* --- Priya's hexagon: 60° inside? then the exterior --- */
  const hex2 = G(Lfig);
  polyLine(hex2, H, { col: LINE, w: 6, fill: 'rgba(255,255,255,0.12)' });
  const h1 = H[1];
  const extLine = seg(hex2, h1, pt(h1[0], h1[1], 110, 0), { col: '#FFFFFF', w: 4, dash: '10 8' });
  const intW = G(hex2); tr(intW, h1[0], h1[1]); wedge(intW, 46, 60, 180, INT, { fo: 0.4 });
  const extWg = G(hex2); tr(extWg, h1[0], h1[1]); wedge(extWg, 46, 0, 60, EXT, { fo: 0.5 });
  const lab60 = lab(hex2, 0, 0, '60°', { size: 30, fill: PINK, halo: '#3A1030' });
  const lab120 = lab(hex2, ...pt(h1[0], h1[1], 82, 120), '120°', { size: 30, fill: GOLD });
  const p60 = G(Lpanel);
  mkText(p60, PX, 186, '**regular hexagon**', { size: 32, anchor: 'middle', fill: INKL, boldFill: BLUE });
  mkMath(p60, PX, 252, '360 ÷ 6 = 60°', { size: 46, anchor: 'middle' });
  const p60q = mkText(p60, PX, 304, 'inside?', { size: 32, anchor: 'middle', fill: PINK });
  const p60e = mkText(p60, PX, 304, "that's the **exterior** angle", { size: 30, anchor: 'middle', fill: INKL, boldFill: EXT });
  const w120 = mkMath(p60, PX, 372, '180° − 60° = 120°', { size: 42, anchor: 'middle', fill: GOLD });
  const exC = mkChip(Lpanel, '**EX**terior **EX**its first', { size: 30, col: EXT });

  /* --- Mr Tan: interior 160°, how many sides? --- */
  const back = G(Lfig);
  const BV = [430, 380], bA = pt(BV[0], BV[1], 250, 180), bB = pt(BV[0], BV[1], 230, 20);
  seg(back, bA, BV, { col: LINE, w: 7 }); seg(back, BV, bB, { col: LINE, w: 7 });
  seg(back, BV, pt(BV[0], BV[1], 210, 0), { col: '#FFFFFF', w: 4, dash: '10 8' });
  const bInt = G(back); tr(bInt, BV[0], BV[1]); wedge(bInt, 56, 20, 180, INT, { label: '160°', lr: 92, lcol: GOLD, size: 32 });
  const bExt = G(back); tr(bExt, BV[0], BV[1]); wedge(bExt, 120, 0, 20, EXT, { fo: 0.5 });
  const bQ = lab(back, ...pt(BV[0], BV[1], 156, 10), '?', { size: 34, fill: EXT });
  const b20 = lab(back, ...pt(BV[0], BV[1], 166, 10), '20°', { size: 32, fill: EXT });
  const pBack = G(Lpanel);
  mkText(pBack, PX, 180, '**regular** polygon', { size: 32, anchor: 'middle', fill: INKL, boldFill: BLUE });
  mkMath(pBack, PX, 240, '"interior" = 160°', { size: 40, anchor: 'middle', fill: GOLD });
  const nQ = mkMath(pBack, PX, 300, 'n = ?', { size: 44, anchor: 'middle' });
  const w18 = mkWorking(Lpanel, 905, 336, [{ m: '180° − 160° = 20°', col: '#FFB3A8' }, 'n = 360 ÷ 20 = 18'], { size: 38, gap: 20 });
  const firstT = mkText(Lpanel, PX, 312, '**exterior** first', { size: 30, anchor: 'middle', fill: INKL, boldFill: EXT });
  // the 18-gon
  const G18c = [420, 300], G18 = []; for (let k = 0; k < 18; k++) G18.push(sp(G18c, 150, 100 - 20 * k));
  const g18 = G(Lfig);
  polyLine(g18, G18, { col: '#FFFFFF', w: 3, dash: '8 7' });
  const track18 = mkDash(E('path', { d: 'M' + G18.concat([G18[0]]).map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' L'), fill: 'none', stroke: TRACK, 'stroke-width': 36, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, Ltrack));

  const puck = agRoombyTop(Lfig, 30);

  /* ================= R: Roomby's talking head ================= */
  const conf = agConf(Lbg, 'roomby');
  const plaque = G(Lhud);
  E('rect', { x: -230, y: -160, width: 460, height: 320, rx: 18, fill: '#0E1A24', stroke: BLUE, 'stroke-width': 5 }, plaque);
  T(plaque, 0, -98, 'ROBOT VACUUM', { size: 40, weight: 800, anchor: 'middle', fill: BLUE, ls: 2 });
  mkText(plaque, 0, -40, 'cleans in **polygons**', { size: 32, anchor: 'middle', fill: '#FFFFFF', boldFill: GOLD });
  mkText(plaque, 0, 4, 'turns at every **corner**', { size: 32, anchor: 'middle', fill: '#FFFFFF', boldFill: EXT });
  const icon = G(plaque); tr(icon, 0, 88);
  E('path', { d: 'M-60,40 L60,40 L60,-40 L-60,-40 Z', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 4, 'stroke-dasharray': '10 7' }, icon);
  const iconDot = E('circle', { r: 12, fill: '#C9D3DC', stroke: SC_INK, 'stroke-width': 3 }, icon);
  const beepT = T(Lhud, 0, 0, 'BEEP.', { size: 46, weight: 800, anchor: 'middle', fill: BLUE });
  const boopT = T(Lhud, 0, 0, '...Boop.', { size: 46, weight: 800, anchor: 'middle', fill: '#B48CFF' });
  const dizzyC = mkChip(Lhud, '18 turns of {{20°}}', { size: 32, col: GOLD });
  const stars = G(Lhud);
  for (let k = 0; k < 5; k++) { const g = G(stars); const a = k * TAU / 5; tr(g, Math.cos(a) * 170, Math.sin(a) * 50 - 120); E('path', { d: 'M0,-14 L4,-4 L14,-4 L6,3 L9,13 L0,7 L-9,13 L-6,3 L-14,-4 L-4,-4 Z', fill: GOLD, stroke: SC_INK, 'stroke-width': 2 }, g); }

  /* ================= the cast ================= */
  const kav = cast(Lcast, 'kavya'), boy = cast(Lcast, 'boy'), mum = cast(Lcast, 'mum'), dad = cast(Lcast, 'dad', { prop: null }), pri = cast(Lcast, 'priya'), tan = cast(Lcast, 'tan');
  const rex = cast(Lcast, 'rex');
  const roomby = cast(Lcast, 'roomby');
  op(boy.tools.scissors, 0); op(boy.tools.broom, 1);
  const lt = agLowerThird(Lhud, 'roomby');

  /* cut points */
  const cR1 = at('hi') - 0.06, cF2 = at('pent') - 0.06, cR2 = at('dizzy') - 0.06;
  const BS = 0.72, BY = 750 - 140 * BS + 8, SX = { kav: 785, boy: 920, guest: 1060 };
  const RXc = floor.corner[0] + 70 * 0.8, RYc = floor.corner[1] - 74 * 0.8;
  const DT = 0.68, DD = 0.48;    // pentagon: time per side, of which driving

  return t => {
    const who = scWho(S, t);
    const sR = on(t, cR1, cF2) || on(t, cR2, 1e9), sF = 1 - sR;
    [kav, boy, mum, dad, pri, tan, rex, roomby].forEach(c => op(c, 0));
    [cTime, stamp, phone, plaque, beepT, boopT, dizzyC, stars].forEach(e => op(e, 0));
    lt.set(0);
    op(floorShot, sF); op(Ltrack, sF); op(Lfig, sF); op(Lpanel, sF * (t < mid('full', 0.45) ? 0 : 1)); op(Lpfig, sF);
    conf.set(sR, t);
    const show = (c, x, y, s, st, r) => { op(c, 1); tr(c, x, y, s, r); c.set(Object.assign({ t }, st)); };

    if (sR) {
      /* ================= R: Roomby's talking head ================= */
      const dz = t >= cR2;
      const wob = dz ? Math.sin(t * 3) * 12 * AMP : 0;
      show(roomby, 380, 430, 1.55, { talk: scTalk(S, t, 'roomby'), mood: dz ? (t < mid('dizzy', 0.6) ? 'shock' : 'sad') : (t < mid('hi', 0.5) ? 'deadpan' : 'smug'), look: dz ? Math.sin(t * 7) : 0.3, spin: dz ? 0.3 : 1, beep: dz ? (t > mid('dizzy', 0.1) && t < mid('dizzy', 0.4) ? 1 : 0) : (t > mid('hi', 0.82) ? 0.5 + 0.5 * Math.sin(t * 20) : 0), still: true }, wob);
      if (!dz) {
        lt.set(win(t, at('hi') + 0.1, at('hi') + 3.3, 0.3));
        const pp = P(t, mid('hi', 0.2), 0.45, pop);
        op(plaque, clamp(pp * 2.5)); tr(plaque, 880, 330, Math.max(0.01, 0.7 + 0.3 * pp));
        // the icon: a dot drives round the square and turns at each corner
        const u = ((t - at('hi')) * 0.5) % 1, k = Math.floor(u * 4), f = u * 4 - k;
        const C4 = [[-60, 40], [60, 40], [60, -40], [-60, -40]], a = C4[k], b = C4[(k + 1) % 4];
        attr(iconDot, 'cx', lerp(a[0], b[0], f)); attr(iconDot, 'cy', lerp(a[1], b[1], f));
        if (t > mid('hi', 0.82)) popIn(beepT, t, mid('hi', 0.82), 380, 210);
      } else {
        popIn(dizzyC, t, at('dizzy') + 0.05, 880, 250);
        if (t > mid('dizzy', 0.55)) popIn(boopT, t, mid('dizzy', 0.55), 880, 380);
        else if (t > mid('dizzy', 0.05)) popIn(beepT, t, mid('dizzy', 0.05), 880, 380);
        op(stars, 1); tr(stars, 380, 330);
        stars.childNodes.forEach((g, k) => { const a = k * TAU / 5 + t * 2.2 * AMP; tr(g, Math.cos(a) * 190, Math.sin(a) * 46 - 110); });
      }
      return;
    }

    /* ================= F: the floor ================= */
    // which figure is up
    const tHex = at('hex') - 0.06, tRule = at('rule') - 0.06, t60 = at('60') - 0.06, tBack = at('back') - 0.06;
    const phPent = t < tHex, phHex = t >= tHex && t < tRule, phRule = t >= tRule && t < t60, ph60 = t >= t60 && t < tBack, phBack = t >= tBack;
    op(pent, phPent ? 1 : 0); op(hex, phHex ? 1 : 0); op(dec, phRule ? 1 : 0); op(hex2, ph60 ? 1 : 0); op(back, phBack ? 1 : 0);
    op(track, phPent ? 1 : 0); op(track18, phBack ? 1 : 0); op(g18, 0);
    extW.forEach(w => op(w, 0));
    [fullG, fullT, anyC, w72, n72, c108, p108, pHex, pRej, mnemT, pRule, p60, exC, pBack, w18, firstT].forEach(e => op(e, 0));
    op(dustG, 1 - fade(t, at('full') + 0.5, 3));
    if (t < at('pent')) popIn(cTime, t, at('four') + 0.1, 300, 170);

    // --- the puck ---
    let px = V[0][0], py = V[0][1], ph = 0, pS = 1;
    const T0 = at('full') + 0.15;
    if (phPent) {
      op(pentDash, fade(t, mid('pent', 0.3)) * (t < at('108') ? 1 : 0));
      op(pentLine, t >= at('108') - 0.06 ? 1 : fade(t, T0 + 5 * DT, 0.4));
      const u = t - T0;
      if (u > 0) {
        const s = Math.min(4, Math.floor(u / DT)), f = u - s * DT;
        if (u >= 5 * DT) { px = V[0][0]; py = V[0][1]; ph = -360; mkDraw(track, 1); }
        else if (f < DD) { const q = ease(f / DD); px = lerp(V[s][0], V[(s + 1) % 5][0], q); py = lerp(V[s][1], V[(s + 1) % 5][1], q); ph = -72 * s; mkDraw(track, (s + q) / 5); }
        else { const q = ease((f - DD) / (DT - DD)); px = V[(s + 1) % 5][0]; py = V[(s + 1) % 5][1]; ph = -72 * s - 72 * q; mkDraw(track, (s + 1) / 5); }
      } else mkDraw(track, 0);
      // the exterior wedges appear at each corner, then gather into one full turn in the panel
      const g0 = mid('full', 0.5), gather = P(t, g0, 0.9, ease);
      if (t < at('108') - 0.06) extW.forEach((w, i) => {
        const appear = P(t, T0 + i * DT + DD, 0.25, linear);
        op(w, appear);
        const x = lerp(w.v[0], PX, gather), y = lerp(w.v[1], 228, gather);
        tr(w, x, y, 1 + 0.25 * gather);
        op(w.ext, 1 - gather);
      });
      if (t < at('108') - 0.06) {
        op(fullG, fade(t, g0 + 0.6));
        if (t < at('72') - 0.06) {
          op(fullT, fade(t, mid('full', 0.6)));
          if (t > mid('full', 0.8)) popIn(anyC, t, mid('full', 0.8), PX, 462);
        } else {
          op(w72, fade(t, mid('72', 0.25))); op(n72, fade(t, mid('72', 0.08)));
        }
      } else {
        op(c108, 1); op(p108, 1);
        p108.childNodes.forEach((e, i) => op(e, fade(t, mid('108', [0.12, 0.3, 0.68, 0.8][i]))));
        c108.childNodes.forEach((e, i) => op(e, i === 0 ? fade(t, mid('108', 0.66)) : fade(t, mid('108', i === 1 ? 0.05 : 0.2))));
      }
    } else if (phBack && t >= mid('18', 0.5)) {
      // Roomby starts an 18-gon: tiny 20° turns
      const u = t - mid('18', 0.5), DT18 = 0.17;
      op(back, 1 - fade(t, mid('18', 0.45), 0.3)); op(g18, fade(t, mid('18', 0.45), 0.3));
      const s = Math.floor(u / DT18), f = (u - s * DT18) / DT18, k = s % 18;
      const a = G18[k], b = G18[(k + 1) % 18];
      const q = Math.min(1, f / 0.7);
      px = lerp(a[0], b[0], q); py = lerp(a[1], b[1], q); ph = -10 - 20 * k - (f > 0.7 ? 20 * (f - 0.7) / 0.3 : 0) + 180 + 90 + 10;
      ph = (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI) - (f > 0.7 ? 20 * (f - 0.7) / 0.3 : 0);
      mkDraw(track18, Math.min(1, (s + q) / 18)); pS = 0.62;
    } else { px = 640; py = 580; ph = -30; mkDraw(track18, 0); }
    tr(puck, px, py, pS, ph);

    // --- hexagon: Dad, then from one corner ---
    if (phHex) {
      const rej = t >= at('rej') - 0.06;
      op(spokes, rej ? 1 - fade(t, at('rej'), 0.25) : fade(t, mid('hex', 0.3)));
      op(fan, rej ? fade(t, mid('rej', 0.2), 0.4) : 0);
      op(pHex, rej ? 0 : fade(t, mid('hex', 0.05)));
      op(hexW, fade(t, mid('hex', 0.45))); op(hexQ, fade(t, mid('hex', 0.55)));
      if (!rej) {
        if (t > mid('hex', 0.72)) { const p = P(t, mid('hex', 0.72), 0.4, pop), out = P(t, end('hex') + 0.15, 0.25, linear); op(phone, clamp(p * 2.5) * (1 - out)); tr(phone, 640, 430 + 30 * out, Math.max(0.01, 0.4 * (0.6 + 0.4 * p)), 6); phone.set(0.5); tr(phone.speed, 0, 122, 1 + 0.12 * Math.max(0, Math.sin(t * 9))); }
      } else {
        op(pRej, 1);
        wRej.show(0, P(t, mid('rej', 0.3), 0.35, linear)); wRej.show(1, P(t, mid('rej', 0.62), 0.35, linear)); wRej.ring(1, P(t, mid('rej', 0.8), 0.3, linear));
        if (t < at('mnem') - 0.06) { op(stamp, 1); stamp.set(P(t, at('rej') + 0.05, 0.35, linear)); tr(stamp, PX, 410, 0.5); }
        else { op(mnemT, 1); mnemT.childNodes.forEach((e, i) => { const p = P(t, mid('mnem', 0.05 + i * 0.35), 0.4, pop); op(e, clamp(p * 2.5)); }); }
      }
    }
    // --- the rule, a decagon ---
    if (phRule) {
      op(pRule, 1); op(ruleM, fade(t, mid('rule', 0.02)));
      op(dec, fade(t, mid('rule', 0.35), 0.4)); op(pDec, fade(t, mid('rule', 0.35)));
      w1440.show(0, P(t, mid('rule', 0.45), 0.3, linear)); w1440.show(1, P(t, mid('rule', 0.62), 0.3, linear)); w1440.ring(1, P(t, mid('rule', 0.82), 0.3, linear));
      pRule.childNodes[1] && op(pRule.childNodes[1], fade(t, mid('rule', 0.15)));
    }
    // --- Priya's hexagon ---
    if (ph60) {
      op(p60, 1);
      const isExt = t >= at('ext') - 0.06, mv = isExt ? P(t, mid('ext', 0.1), 0.6, ease) : 0;
      const pin = pt(h1[0], h1[1], 84, 120), pout = pt(h1[0], h1[1], 80, 30);
      tr(lab60, lerp(pin[0], pout[0], mv), lerp(pin[1], pout[1], mv) - 10 * Math.sin(mv * Math.PI));
      op(lab60, fade(t, mid('60', 0.6)));
      op(intW, isExt ? fade(t, mid('ext', 0.45)) : fade(t, mid('60', 0.5)) * 0.6);
      op(extWg, isExt ? fade(t, mid('ext', 0.15)) : 0); op(extLine, isExt ? fade(t, mid('ext', 0.1)) : 0);
      op(lab120, isExt ? fade(t, mid('ext', 0.5)) : 0);
      op(p60q, isExt ? 0 : fade(t, mid('60', 0.6))); op(p60e, isExt ? fade(t, mid('ext', 0.05)) : 0);
      op(w120, isExt ? fade(t, mid('ext', 0.4)) : 0);
      p60.childNodes[0] && op(p60.childNodes[0], fade(t, at('60')));
      p60.childNodes[1] && op(p60.childNodes[1], fade(t, mid('60', 0.3)));
      if (isExt && t > mid('ext', 0.72)) popIn(exC, t, mid('ext', 0.72), PX, 450);
    }
    // --- Mr Tan's 160° ---
    if (phBack) {
      op(pBack, 1);
      pBack.childNodes.forEach((e, i) => op(e, fade(t, mid('back', [0.1, 0.4, 0.75][i]))));
      const in18 = t >= at('18') - 0.06;
      if (t < mid('18', 0.5)) op(back, 1);
      op(bInt, fade(t, mid('back', 0.4))); op(bExt, in18 ? fade(t, mid('18', 0.05)) : 0);
      op(bQ, in18 ? 1 - fade(t, mid('18', 0.3)) : fade(t, mid('back', 0.8))); op(b20, in18 ? fade(t, mid('18', 0.3)) : 0);
      op(nQ, in18 ? 0 : fade(t, mid('back', 0.75)));
      if (in18) { op(w18, 1); w18.show(0, P(t, mid('18', 0.08), 0.35, linear)); w18.show(1, P(t, mid('18', 0.5), 0.35, linear)); w18.ring(1, P(t, mid('18', 0.75), 0.3, linear)); op(firstT, fade(t, mid('18', 0.02))); }
    }

    // --- Rex, in his corner ---
    let rM = 'deadpan', rL = 1, rTw = 0;
    if (who === 'rex') { rM = t > mid(scWhoLine(t), 0.6) ? 'smug' : 'annoyed'; rL = 0.6; }
    if (t >= at('hex') && t < at('rej')) { rM = 'annoyed'; rTw = t > mid('hex', 0.4) ? 0.6 : 0; }
    if (t >= at('rej') && t < end('rej')) rM = t < mid('rej', 0.4) ? 'annoyed' : 'smug';
    show(rex, RXc, RYc, 0.8, { talk: scTalk(S, t, 'rex'), mood: rM, look: rL, open: 90, twitch: rTw });

    // --- the busts along the bottom edge ---
    const guestKey = t < tHex ? 'mum' : t < t60 ? 'dad' : t < tBack ? 'pri' : 'tan';
    const swapT = { mum: -1, dad: tHex, pri: t60, tan: tBack }[guestKey];
    const rise = swapT < 0 ? 1 : P(t, swapT, 0.3, easeOut);
    const L = -0.8;   // looking down-left at the floor
    const look = k => { if (who === k) return L; const pos = { kavya: SX.kav, boy: SX.boy }; const x = pos[k] || SX.guest, sx = pos[who] || (['mum', 'dad', 'priya', 'tan'].includes(who) ? SX.guest : null); return sx === null ? L : sx < x ? -0.9 : sx > x ? 0.9 : L; };
    let kM = 'neutral', bM = 'happy', gM = 'neutral', gLift = 0, kSw = 0;
    if (t < at('pent')) { gM = 'smug'; gLift = 1; bM = 'happy'; kM = 'neutral'; }
    else if (t < at('72')) { bM = t < at('full') ? 'happy' : 'shock'; kM = t > mid('full', 0.6) ? 'smug' : 'neutral'; gM = 'happy'; }
    else if (t < tHex) { kM = 'smug'; gM = 'happy'; bM = 'happy'; }
    else if (t < at('rej')) { gM = 'smug'; gLift = 0.5; kM = 'deadpan'; bM = 'neutral'; }
    else if (t < at('mnem')) { gM = t < mid('rej', 0.3) ? 'shock' : 'sad'; kM = 'smug'; bM = 'shock'; }
    else if (t < tRule) { bM = 'happy'; kM = 'happy'; gM = 'sad'; }
    else if (t < t60) { kM = 'smug'; bM = 'happy'; gM = 'neutral'; }
    else if (t < at('ext')) { gM = 'smug'; kM = 'deadpan'; bM = 'neutral'; }
    else if (t < tBack) { gM = t < mid('ext', 0.3) ? 'shock' : 'annoyed'; kM = 'smug'; bM = 'happy'; }
    else if (t < at('18')) { gM = 'smug'; gLift = 1; kM = 'neutral'; kSw = t > mid('back', 0.7) ? 1 : 0; bM = 'shock'; }
    else { gM = 'happy'; kM = t > mid('18', 0.5) ? 'smug' : 'neutral'; bM = t > mid('18', 0.55) ? 'happy' : 'neutral'; }
    const GC = { mum, dad, pri, tan }[guestKey], GW = { mum: 'mum', dad: 'dad', pri: 'priya', tan: 'tan' }[guestKey];
    show(GC, SX.guest, BY + 160 * (1 - rise), BS, { talk: scTalk(S, t, GW), mood: gM, look: look(GW), lift: gLift });
    show(kav, SX.kav, BY, BS, { talk: scTalk(S, t, 'kavya'), mood: kM, look: look('kavya'), sweat: kSw });
    show(boy, SX.boy, BY + 14, BS, { talk: scTalk(S, t, 'boy'), mood: bM, look: look('boy'), lift: who === 'boy' ? 1 : 0.3 });
  };

  /* the id of the line being spoken at t (for Rex's beat within his own line) */
  function scWhoLine(t) {
    for (const l of S.ch.lines) { const a = l.start - S.ch.start, b = l.end - S.ch.start; if (t >= a - 0.02 && t < b + 0.05) return l.id; }
    return S.ch.lines[0].id;
  }
});
