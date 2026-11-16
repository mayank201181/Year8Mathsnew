/* Scene 6: Bee-autiful (symmetry of regular polygons and tessellation).
   Shots (hard sitcom cuts):
   F  the floor from above, 6 p.m.: the new octagon-and-square tiles go down from Rex's corner; Kavya, Mum, Priya and
      Ah Boy (with his broom) peer in from the bottom edge; Bea buzzes out of the honey jar: no gaps, no overlaps,
      360° at every point.
   Z  showpiece: zoom on one point where two octagons and a square meet: the wedges 135°, 135°, 90° fill a full
      turn; the panel works out the octagon (exterior 360° ÷ 8 = 45°, interior 135°) and 135° + 135° + 90° = 360°.
   K  the card: honeycomb 3 × 120°, triangles 6 × 60°, squares 4 × 90°; Ah Boy's football; three pentagons
      3 × 108° = 324° (a 36° gap) and a fourth 4 × 108° = 432° (overlap); a football corner 108° + 120° + 120° =
      348°, 12° short, so it curves; the regular hexagon: 6 lines, order 6 (six 60° clicks).
   R  Rex's confessional: n sides, n lines, n turns.
   K  Mum: the octagon tile: 8 lines, order 8, smallest turn 360° ÷ 8 = 45°.
   W  the kitchen: Mr Tan's pun lands to silence; Roomby drives across the counter; only Ah Boy laughs. */
scene('tiles', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const view = (el, k, fx, fy, sx, sy) => el.setAttribute('transform', `translate(${sx.toFixed(1)} ${sy.toFixed(1)}) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 2, color: o.color || C.ink, weight: 700 }); };
  const fade = (el, t, t0, d) => op(el, P(t, t0, d || 0.3, linear));
  const GOLD = '#FFE45C', RED = '#D32F2F', GREEN = '#1E9E5A', INK = MK.ink, PAPER = MK.paper;
  const A_GOLD = '#F2B705', A_BLUE = '#4C8FE0', A_GREEN = '#2FA36B', A_PINK = '#E8578A';
  const rad = a => a * Math.PI / 180;
  const pt = (x, y, r, a) => [x + Math.cos(rad(a)) * r, y - Math.sin(rad(a)) * r];
  const wedgeD = (x, y, r, a1, a2) => { const p1 = pt(x, y, r, a1), p2 = pt(x, y, r, a2); return `M${x},${y} L${p1[0].toFixed(1)},${p1[1].toFixed(1)} A${r},${r} 0 ${a2 - a1 > 180 ? 1 : 0} 0 ${p2[0].toFixed(1)},${p2[1].toFixed(1)} Z`; };
  const arcD = (x, y, r, a1, a2) => { const p1 = pt(x, y, r, a1), p2 = pt(x, y, r, a2); return `M${p1[0].toFixed(1)},${p1[1].toFixed(1)} A${r},${r} 0 ${a2 - a1 > 180 ? 1 : 0} 0 ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`; };
  const wedge = (parent, x, y, r, a1, a2, col, o) => { o = o || {}; const g = G(parent); E('path', { d: wedgeD(x, y, r, a1, a2), fill: col, opacity: o.fillOp === undefined ? 0.45 : o.fillOp }, g); E('path', { d: arcD(x, y, r, a1, a2), fill: 'none', stroke: o.stroke || col, 'stroke-width': 4, 'stroke-linecap': 'round' }, g); return g; };
  const lab = (parent, x, y, src, o) => { o = o || {}; return mkMath(parent, x, y + (o.size || 28) * 0.36, src, { size: o.size || 28, fill: o.fill || INK, anchor: 'middle', halo: o.halo === undefined ? PAPER : o.halo, weight: 700 }); };
  /* a regular n-gon with one vertex at P, its interior angle there running anticlockwise from maths angle a1 */
  const polyAt = (P0, a1, n, side) => { const pts = [P0.slice()]; let x = P0[0], y = P0[1], h = a1; for (let i = 0; i < n - 1; i++) { x += side * Math.cos(rad(h)); y -= side * Math.sin(rad(h)); pts.push([x, y]); h += 360 / n; } return pts; };
  const polyEl = (parent, pts, fill, o) => { o = o || {}; return E('path', { d: mkPoly(pts), fill, stroke: o.stroke || INK, 'stroke-width': o.sw || 4, 'stroke-linejoin': 'round', 'stroke-dasharray': o.dash, opacity: o.opacity }, parent); };
  const txt = (parent, x, y, s, o) => mkText(parent, x, y, s, Object.assign({ size: 32, anchor: 'middle', fill: INK }, o || {}));

  /* layers */
  const Lbg = G(root), Lcard = G(root), Lcast = G(root), Lfront = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= F: the floor from above ================= */
  const floorShot = G(Lbg), floorWrap = G(floorShot);
  E('rect', { x: -400, y: -400, width: 2000, height: 1600, fill: '#4A5568' }, floorWrap);
  const floor = agFloor(floorWrap, { pattern: 'new' });
  const V = [356, 434 + floor.sqK];             // two octagons and a square meet here
  const hint = G(floorWrap);
  const hintRing = E('circle', { cx: V[0], cy: V[1], r: 24, fill: 'none', stroke: GOLD, 'stroke-width': 6 }, hint);
  const jar = agHoney(floorShot, 1); tr(jar, 1125, 250, 1.1);
  const c6 = pill(Lfg, '6 p.m.', { size: 34, color: GOLD, stroke: GOLD });
  const cGap = mkChip(Lfg, '**no gaps**', { size: 32, col: GOLD });
  const cOver = mkChip(Lfg, '**no overlaps**', { size: 32, col: GOLD });
  const c360 = mkChip(Lfg, '{{360°}} at every point', { size: 32, col: '#56D69B' });

  /* ================= Z: the meeting point, zoomed ================= */
  const ZP = [400, 380];
  const zG = G(Lfg);
  const zw = [wedge(zG, ZP[0], ZP[1], 92, 270, 405, A_BLUE, { stroke: '#1E5AA8' }), wedge(zG, ZP[0], ZP[1], 92, 135, 270, A_PINK, { stroke: '#B8336A' }),
    wedge(zG, ZP[0], ZP[1], 92, 45, 135, A_GOLD, { stroke: '#B88400' })];
  const zl = [lab(zG, ...pt(ZP[0], ZP[1], 132, -22.5), '135°', { size: 32 }), lab(zG, ...pt(ZP[0], ZP[1], 132, 202.5), '135°', { size: 32 }),
    lab(zG, ...pt(ZP[0], ZP[1], 64, 90), '90°', { size: 30 })];
  const zRing = E('circle', { cx: ZP[0], cy: ZP[1], r: 104, fill: 'none', stroke: '#56D69B', 'stroke-width': 6, 'stroke-dasharray': '12 8' }, zG);
  E('circle', { cx: ZP[0], cy: ZP[1], r: 7, fill: INK }, zG);
  const panel = G(Lcard);
  E('rect', { x: 696, y: 116, width: 480, height: 480, rx: 18, fill: 'rgba(0,0,0,0.25)' }, panel);
  E('rect', { x: 688, y: 108, width: 480, height: 480, rx: 18, fill: PAPER, stroke: '#8FA3B8', 'stroke-width': 5 }, panel);
  const PCX = 928;
  T(panel, PCX, 156, 'REGULAR OCTAGON', { size: 30, weight: 800, anchor: 'middle', fill: '#5A4A52', ls: 2 });
  const octI = mkPolygon(panel, 8, 92, { col: '#2E6E8E', interior: [5], size: 28, intCol: '#B88400', ar: 34 }); tr(octI, PCX, 290);
  const octE = mkPolygon(panel, 8, 92, { col: '#2E6E8E', exterior: [1], size: 28, extCol: RED, ar: 34, ext: 70 }); tr(octE, PCX, 290);
  octI.ext(0); octE.int(0);
  [...octE.childNodes].forEach(n => { if (n.tagName === 'path') op(n, 0); });   // octE only adds its exterior angle
  const pExt = txt(panel, PCX, 448, 'exterior: {{360° ÷ 8 = 45°}}', { size: 30, fill: RED });
  const pInt = txt(panel, PCX, 496, 'interior: {{180° − 45° = 135°}}', { size: 30, fill: '#9A6E00' });
  const pSum = txt(panel, PCX - 14, 560, '{{135° + 135° + 90° = 360°}}', { size: 32, fill: GREEN });
  const pTick = tick(panel, 16, GREEN); tr(pTick, PCX + pSum.w / 2 + 6, 550);

  /* ================= K: the card ================= */
  const card = G(Lcard);
  E('rect', { x: 148, y: 116, width: 802, height: 476, rx: 18, fill: 'rgba(0,0,0,0.25)' }, card);
  E('rect', { x: 140, y: 108, width: 802, height: 476, rx: 18, fill: PAPER, stroke: '#8FA3B8', 'stroke-width': 5 }, card);
  const CX = 541, RX = 752;   // card centre; centre of the text column on the right

  /* three: honeycomb, triangles, squares */
  const thG = G(card);
  const TH = [
    { n: 6, side: 58, a: [90, 210, 330], cols: ['#FFE08A', '#FFD23F', '#FFC247'], txt: ['{{3 × 120°}}', '{{= 360°}}'], wc: A_GOLD },
    { n: 3, side: 84, a: [0, 60, 120, 180, 240, 300], cols: ['#BFE3FF', '#8CC8F5'], txt: ['{{6 × 60°}}', '{{= 360°}}'], wc: A_BLUE },
    { n: 4, side: 80, a: [0, 90, 180, 270], cols: ['#C9F0D8', '#9EDDB7'], txt: ['{{4 × 90°}}', '{{= 360°}}'], wc: A_GREEN },
  ];
  TH.forEach((ty, i) => {
    const g = G(thG), x = 291 + i * 250, y = 282; ty.g = g;
    ty.a.forEach((a1, k) => polyEl(g, polyAt([x, y], a1, ty.n, ty.side), ty.cols[k % ty.cols.length], { sw: 3.5 }));
    ty.a.forEach((a1, k) => { const w = wedge(g, x, y, 28, a1, a1 + 180 - 360 / ty.n, k % 2 ? '#E8578A' : '#B8336A', { fillOp: 0.55 }); });
    E('circle', { cx: x, cy: y, r: 5, fill: INK }, g);
    ty.t1 = txt(g, x, 450, ty.txt[0], { size: 34 });
    ty.t2 = txt(g, x - 12, 500, ty.txt[1], { size: 34, fill: GREEN });
    const tk = tick(g, 14, GREEN); tr(tk, x + ty.t2.w / 2 + 6, 490); ty.tk = tk;
  });
  const thChip = mkChip(thG, 'the **only** regular polygons that tile **alone**', { size: 28, col: '#B8336A', fill: '#FFF0F5', textCol: INK });
  tr(thChip, CX, 553);

  /* ball: the football */
  const baG = G(card);
  const bigBall = agFootball(baG, 120); tr(bigBall, CX - 120, 346);
  const baQ = txt(baG, CX + 170, 330, '**pentagons?**', { size: 46, fill: '#B8336A' });
  const baS = txt(baG, CX + 170, 390, '(and hexagons)', { size: 28, fill: '#5A4A52' });

  /* 324: pentagons round a point */
  const peG = G(card);
  const PP = [330, 322], PS = 92;
  const pent = [288, 36, 144].map((a1, i) => { const g = G(peG); polyEl(g, polyAt(PP, a1, 5, PS), ['#FFD6E4', '#FFC2D6', '#FFB0CB'][i], { sw: 4 }); wedge(g, PP[0], PP[1], 40, a1, a1 + 108, '#B8336A', { fillOp: 0.35 }); lab(g, ...pt(PP[0], PP[1], 66, a1 + 54), '108°', { size: 26 }); return g; });
  const gapW = wedge(peG, PP[0], PP[1], 120, 252, 288, RED, { fillOp: 0.5 });
  const gapL = lab(peG, PP[0], PP[1] + 178, '{{36°}} gap', { size: 30, fill: RED });
  const ghost = G(peG);
  polyEl(ghost, polyAt(PP, 252, 5, PS), 'rgba(211,47,47,0.22)', { stroke: RED, dash: '12 8', sw: 4 });
  E('circle', { cx: PP[0], cy: PP[1], r: 6, fill: INK }, peG);
  const pe1 = txt(peG, RX, 222, '{{3 × 108° = 324°}}', { size: 36 });
  const pe2 = txt(peG, RX, 280, 'a {{36°}} **gap**', { size: 32, fill: RED, boldFill: RED });
  const pe3 = txt(peG, RX, 372, '{{4 × 108° = 432°}}', { size: 36 });
  const pe4 = txt(peG, RX, 428, 'an **overlap**', { size: 32, fill: RED, boldFill: RED });
  const pe5 = mkChip(peG, 'pentagons **don’t** tile', { size: 32, col: RED, fill: '#FFF0F0', textCol: INK }); tr(pe5, RX, 520);

  /* 348: the football's corner */
  const fbG = G(card);
  const FP = [330, 332], FS = 78;
  const fpPent = G(fbG), fpHex1 = G(fbG), fpHex2 = G(fbG);
  polyEl(fpPent, polyAt(FP, 276, 5, FS), '#3A3440', { stroke: INK });
  wedge(fpPent, FP[0], FP[1], 34, 276, 384, '#FFC2D6', { fillOp: 0.85 });
  polyEl(fpHex1, polyAt(FP, 24, 6, FS), '#FFFFFF', { stroke: INK });
  wedge(fpHex1, FP[0], FP[1], 34, 24, 144, A_GOLD, { fillOp: 0.5 });
  polyEl(fpHex2, polyAt(FP, 144, 6, FS), '#FFFFFF', { stroke: INK });
  wedge(fpHex2, FP[0], FP[1], 34, 144, 264, A_BLUE, { fillOp: 0.5 });
  const fl = [lab(fbG, ...pt(FP[0], FP[1], 62, 330), '108°', { size: 26 }), lab(fbG, ...pt(FP[0], FP[1], 62, 84), '120°', { size: 26 }), lab(fbG, ...pt(FP[0], FP[1], 62, 204), '120°', { size: 26 })];
  const fGap = wedge(fbG, FP[0], FP[1], 140, 264, 276, RED, { fillOp: 0.6 });
  const fGapL = lab(fbG, FP[0], FP[1] + 190, '{{12°}} short', { size: 30, fill: RED });
  E('circle', { cx: FP[0], cy: FP[1], r: 6, fill: '#FFFFFF', stroke: INK, 'stroke-width': 2 }, fbG);
  const fb1 = txt(fbG, RX - 6, 222, '{{108° + 120° + 120° = 348°}}', { size: 29 });
  const fb2 = txt(fbG, RX, 282, '{{360° − 348° = 12°}} short', { size: 29, fill: RED });
  const fb3 = txt(fbG, RX, 380, 'so it **curves**!', { size: 40, boldFill: '#B8336A' });
  const fbBall = agFootball(fbG, 56); tr(fbBall, RX, 480);

  /* order: the regular hexagon, 6 lines, order 6 */
  const syms = [6, 8].map(n => {
    const g = G(card), sp = G(g), R = n === 6 ? 150 : 148, c = [330, 340];
    tr(sp, c[0], c[1]);
    const vs = []; for (let k = 0; k < n; k++) vs.push([Math.cos(rad(k * 360 / n + (n === 8 ? 22.5 : 0))) * R, -Math.sin(rad(k * 360 / n + (n === 8 ? 22.5 : 0))) * R]);
    E('path', { d: mkPoly(vs), fill: n === 6 ? '#FFE08A' : '#F4F1E8', stroke: n === 6 ? '#B88400' : '#5A5448', 'stroke-width': 5, 'stroke-linejoin': 'round' }, sp);
    if (n === 8) E('path', { d: mkPoly([[R * 0.92, -R * 0.92 + 4], [R * 1.18, -R * 0.66], [R * 0.92, -R * 0.4], [R * 0.66, -R * 0.66]].map(p => [p[0] * 0.78, p[1] * 0.78])), fill: '#2E6E8E', stroke: '#5A5448', 'stroke-width': 3 }, sp);
    let d = ''; for (let k = 0; k < n; k++) { const a = rad(k * 180 / n + (n === 8 ? 22.5 : 0)), L = R + 34; d += `M${(Math.cos(a) * L).toFixed(1)},${(-Math.sin(a) * L).toFixed(1)} L${(-Math.cos(a) * L).toFixed(1)},${(Math.sin(a) * L).toFixed(1)} `; }
    const mir = E('path', { d, stroke: '#2E6FD8', 'stroke-width': 3.5, 'stroke-dasharray': '12 8' }, sp);
    const dot = E('circle', { cx: vs[0][0] * 0.78, cy: vs[0][1] * 0.78, r: 13, fill: RED, stroke: INK, 'stroke-width': 3 }, sp);
    E('circle', { r: 6, fill: INK }, sp);
    const turnArc = G(g);
    return { g, sp, mir, dot, c, n, R, turnArc };
  });
  const [hexS, octS] = syms;
  const or1 = txt(hexS.g, RX, 210, '**6** lines of symmetry', { size: 34, boldFill: '#2E6FD8' });
  const or2 = txt(hexS.g, RX, 290, 'fits onto itself', { size: 30 });
  const or3 = txt(hexS.g, RX, 334, '**6** times in a turn', { size: 30, boldFill: RED });
  const orDots = []; for (let k = 0; k < 6; k++) { const d = E('circle', { cx: RX - 125 + k * 50, cy: 390, r: 15, fill: '#F4D7DB', stroke: RED, 'stroke-width': 3 }, hexS.g); orDots.push(d); }
  const or4 = mkChip(hexS.g, 'rotation symmetry of **order 6**', { size: 30, col: '#B8336A', fill: '#FFF0F5', textCol: INK }); tr(or4, RX, 486);
  // the octagon tile: 8 lines, order 8, smallest turn 45°
  const o81 = txt(octS.g, RX, 200, '**8** lines of symmetry', { size: 34, boldFill: '#2E6FD8' });
  const o82 = txt(octS.g, RX, 262, 'rotation: **order 8**', { size: 34, boldFill: RED });
  const o83 = txt(octS.g, RX, 340, 'smallest turn:', { size: 30 });
  const o84 = txt(octS.g, RX, 400, '{{360° ÷ 8 = 45°}}', { size: 40, fill: '#B8336A' });
  const o85 = txt(octS.g, RX, 458, '(its exterior angle!)', { size: 28, fill: '#5A4A52' });
  const o8Arc = E('path', { d: arcD(octS.c[0], octS.c[1], 186, 22.5 + 90 - 45, 22.5 + 90), fill: 'none', stroke: RED, 'stroke-width': 6, 'stroke-linecap': 'round' }, octS.g);
  const o8Lab = lab(octS.g, ...pt(octS.c[0], octS.c[1], 214, 22.5 + 90 - 22.5), '45°', { size: 30, fill: RED });

  /* ================= R: Rex's confessional ================= */
  const conf = agConf(Lbg, 'rex');
  const nCard = G(Lfg);
  E('rect', { x: -260, y: -150, width: 520, height: 300, rx: 18, fill: '#0E1A24', stroke: GOLD, 'stroke-width': 5 }, nCard);
  T(nCard, 0, -84, 'REGULAR POLYGON', { size: 34, weight: 800, anchor: 'middle', fill: GOLD, ls: 2 });
  const nl = ['{{n}} **sides**', '{{n}} **lines** of symmetry', '{{n}} **turns** (order {{n}})'].map((s, i) => mkText(nCard, 0, -18 + i * 62, s, { size: 38, anchor: 'middle', fill: '#FFFFFF', boldFill: GOLD }));

  /* ================= W: the kitchen ================= */
  const kitShot = G(Lbg), kitWrap = G(kitShot);
  const kit = agKitchen(kitWrap);
  kit.clock(18.25);
  const islandWrap = G(Lfront);
  islandWrap.appendChild(kit.front); islandWrap.appendChild(kit.top);
  const rooW = G(Lfront);

  /* ================= the cast ================= */
  const kav = cast(Lcast, 'kavya'), mum = cast(Lcast, 'mum'), pri = cast(Lcast, 'priya'), boy = cast(Lcast, 'boy'), tan = cast(Lcast, 'tan');
  const bea = cast(Lfg, 'bea'), rex = cast(Lfg, 'rex'), roomby = cast(rooW, 'roomby');
  const fbHand = G(boy.hand); tr(agFootball(fbHand, 34), 0, -44);
  const ltBea = agLowerThird(Lhud, 'bea');

  /* shots */
  const cZ = at('oct') - 0.06, cK = at('three') - 0.06, cR = at('n') - 0.06, cK2 = at('oct8') - 0.06, cW = at('pun') - 0.06;
  const ROW = [[kav, 626], [mum, 784], [pri, 942], [boy, 1098]];

  return t => {
    const sF = on(t, -1, cZ), sZ = on(t, cZ, cK), sK = on(t, cK, cR) || on(t, cK2, cW), sR = on(t, cR, cK2), sW = on(t, cW, 1e9);
    const who = scWho(S, t);
    op(floorShot, sF || sZ || sK); op(conf, sR); conf.set(sR, t); op(kitShot, sW); op(islandWrap, sW); op(rooW, sW);
    op(panel, sZ); op(card, sK); op(zG, sZ); op(nCard, sR);
    [c6, cGap, cOver, c360].forEach(c => op(c, 0)); op(hint, 0); op(jar, sF);
    [kav, mum, pri, boy, tan, bea, rex].forEach(c => op(c, 0));
    ltBea.set(0);
    op(boy.tools.scissors, 0); op(boy.tools.broom, 1); op(fbHand, 0);
    const show = (c, x, y, s, st) => { op(c, 1); tr(c, x, y, s); c.set(Object.assign({ t }, st)); };
    const st = {};   // per-human state
    ROW.forEach(([c]) => { st[c === kav ? 'kavya' : c === mum ? 'mum' : c === pri ? 'priya' : 'boy'] = { mood: 'neutral', look: -0.7, lift: 0 }; });
    const spk = w => (w === 'kavya' ? -0.2 : w === 'mum' ? 0 : w === 'priya' ? 0.3 : w === 'boy' ? 0.6 : 0.9);

    /* ---------- the floor ---------- */
    if (sF || sZ || sK) {
      floor.lay(sF ? P(t, at('six') + 0.2, end('bea') - at('six') - 0.6, linear) : 1);
      if (sZ) {
        const z = P(t, cZ, 0.7, ease);
        view(floorWrap, lerp(1, 3, z), V[0], V[1], lerp(V[0], ZP[0], z), lerp(V[1], ZP[1], z));
      } else floorWrap.removeAttribute('transform');
    }

    if (sF) {
      popIn(c6, t, at('six') + 0.1, 760, 160);
      if (t >= at('bea') - 0.06) {
        op(c6, 0);
        const out = P(t, at('bea') + 0.05, 0.9, easeOut);
        show(bea, lerp(1125, 1060, out), lerp(220, 345, out) + Math.sin(t * 3) * 6 * AMP, lerp(0.25, 0.72, out), { talk: scTalk(S, t, 'bea'), mood: 'happy', look: -0.8 });
        ltBea.set(win(t, at('bea') + 0.3, at('bea') + 3.4, 0.3));
        op(hint, 1); hintRing.setAttribute('r', 22 + 5 * Math.sin(t * 6)); op(hintRing, P(t, mid('bea', 0.15), 0.3, linear));
        popIn(cGap, t, mid('bea', 0.42), 700, 175); popIn(cOver, t, mid('bea', 0.55), 700, 245); popIn(c360, t, mid('bea', 0.72), 700, 315);
        st.mum = { mood: 'happy', look: -0.8, lift: P(t, mid('bea', 0.1), 0.3, ease) };
        st.kavya = { mood: t < mid('bea', 0.3) ? 'shock' : 'happy', look: 0.9 };
        st.priya = { mood: t < mid('bea', 0.3) ? 'shock' : 'neutral', look: 0.9 };
        st.boy = { mood: 'happy', look: -0.3 };
      } else {
        ROW.forEach(([c]) => {}); st.kavya.mood = 'happy'; st.mum.mood = 'smug'; st.boy.mood = 'happy';
      }
    }

    /* ---------- Z: the meeting point ---------- */
    if (sZ) {
      const ws = [mid('oct', 0.6), mid('oct', 0.67), mid('oct', 0.74)];
      zw.forEach((w, i) => op(w, P(t, ws[i], 0.3, linear)));
      zl.forEach((l, i) => op(l, P(t, ws[i] + 0.1, 0.3, linear)));
      op(zRing, P(t, mid('oct', 0.82), 0.4, linear));
      fade(octI, t, at('oct') + 0.2); octI.int(P(t, mid('oct', 0.32), 0.3, linear));
      op(octE, P(t, mid('oct', 0.12), 0.3, linear));
      fade(pExt, t, mid('oct', 0.16)); fade(pInt, t, mid('oct', 0.36)); fade(pSum, t, mid('oct', 0.8)); fade(pTick, t, mid('oct', 0.9));
      show(bea, 190, 230 + Math.sin(t * 3) * 6 * AMP, 0.5, { talk: scTalk(S, t, 'bea'), mood: 'happy', look: 0.6 });
      st.kavya = { mood: t > mid('oct', 0.85) ? 'smug' : 'neutral', look: -0.3 };
      st.mum = { mood: 'neutral', look: -0.8 }; st.priya = { mood: 'neutral', look: -0.9 }; st.boy = { mood: 'neutral', look: -0.9 };
    }

    /* ---------- K: the card ---------- */
    if (sK) {
      const isB = t < cR;
      const blk = !isB ? 'oct8' : t < at('ball') - 0.06 ? 'three' : t < at('324') - 0.06 ? 'ball' : t < at('348') - 0.06 ? '324' : t < at('order') - 0.06 ? '348' : 'order';
      op(thG, blk === 'three'); op(baG, blk === 'ball'); op(peG, blk === '324'); op(fbG, blk === '348'); op(hexS.g, blk === 'order'); op(octS.g, blk === 'oct8');
      let bx = 1068, by = 330, bm = 'happy', bl = -0.8;
      if (blk === 'three') {
        TH.forEach((ty, i) => {
          const t0 = mid('three', [0.04, 0.32, 0.56][i]);
          const p = P(t, t0, 0.4, pop); op(ty.g, clamp(p * 2.5));
          fade(ty.t1, t, t0 + 0.2); fade(ty.t2, t, t0 + 0.6); fade(ty.tk, t, t0 + 0.9);
        });
        thChip.set(P(t, mid('three', 0.82), 0.4, linear));
        st.kavya.look = 0.9; st.priya = { mood: 'neutral', look: 0.9 }; st.mum.look = 0.9; st.boy = { mood: 'happy', look: 0.6 };
      } else if (blk === 'ball') {
        popIn(bigBall, t, at('ball') + 0.1, CX - 120, 346); op(baQ, P(t, mid('ball', 0.4), 0.25, linear)); op(baS, P(t, mid('ball', 0.7), 0.25, linear));
        op(fbHand, 1); op(boy.tools.broom, 0);
        st.boy = { mood: 'happy', look: -0.6, lift: P(t, at('ball'), 0.3, ease) };
        st.kavya.look = 0.9; st.mum.look = 0.9; st.priya = { mood: 'smug', look: 0.9 }; bl = 0.0;
      } else if (blk === '324') {
        pent.forEach((g, i) => fade(g, t, mid('324', 0.03 + i * 0.07)));
        op(gapW, P(t, mid('324', 0.28), 0.3, linear) * (t > mid('324', 0.5) ? 0.35 : 1)); fade(gapL, t, mid('324', 0.3));
        fade(pe1, t, mid('324', 0.12)); fade(pe2, t, mid('324', 0.3));
        op(ghost, P(t, mid('324', 0.52), 0.3, linear) * (0.75 + 0.25 * Math.sin(t * 6)));
        fade(pe3, t, mid('324', 0.55)); fade(pe4, t, mid('324', 0.66)); pe5.set(P(t, mid('324', 0.84), 0.4, linear));
        st.kavya = { mood: t > mid('324', 0.84) ? 'smug' : 'neutral', look: -0.6 };
        st.boy = { mood: t > mid('324', 0.84) ? 'sad' : 'neutral', look: -0.9 };
        st.priya.look = -0.9; st.mum.look = -0.9;
      } else if (blk === '348') {
        [fpPent, fpHex1, fpHex2].forEach((g, i) => fade(g, t, at('348') + 0.1 + i * 0.25));
        fl.forEach((l, i) => fade(l, t, mid('348', 0.15 + i * 0.07)));
        fade(fb1, t, mid('348', 0.2)); fade(fb2, t, mid('348', 0.45));
        const fold = P(t, mid('348', 0.7), 0.8, ease);
        op(fGap, P(t, mid('348', 0.42), 0.3, linear) * (1 - fold)); op(fGapL, P(t, mid('348', 0.45), 0.3, linear) * (1 - fold));
        tr(fpPent, FP[0], FP[1], 1, -6 * fold); fpPent.setAttribute('transform', `translate(${FP[0]} ${FP[1]}) rotate(${(-6 * fold).toFixed(2)}) translate(${-FP[0]} ${-FP[1]})`);
        fpHex2.setAttribute('transform', `translate(${FP[0]} ${FP[1]}) rotate(${(6 * fold).toFixed(2)}) translate(${-FP[0]} ${-FP[1]})`);
        fade(fb3, t, mid('348', 0.72)); popIn(fbBall, t, mid('348', 0.8), RX, 482);
        st.boy = { mood: t > mid('348', 0.72) ? 'happy' : 'neutral', look: 0.8 };
        st.kavya.look = 0.9; st.priya.look = 0.9; st.mum.look = 0.9;
      } else if (blk === 'order') {
        fade(hexS.g, t, at('order') - 0.06, 0.2);
        op(hexS.mir, P(t, mid('order', 0.12), 0.4, linear));
        fade(or1, t, mid('order', 0.15)); fade(or2, t, mid('order', 0.42)); fade(or3, t, mid('order', 0.42));
        const k0 = mid('order', 0.5), step = (end('order') - k0) / 6.4;
        let clicks = 0;
        for (let k = 0; k < 6; k++) { const p = P(t, k0 + k * step, step * 0.55, ease); clicks += p; op(orDots[k], 1); orDots[k].setAttribute('fill', p > 0.95 ? RED : '#F4D7DB'); }
        tr(hexS.sp, hexS.c[0], hexS.c[1], 1, -60 * clicks);
        or4.set(P(t, k0 + 6 * step - 0.1, 0.35, linear));
        st.kavya.look = 0.9; st.priya = { mood: 'neutral', look: 0.9 }; st.mum.look = 0.9; st.boy = { mood: 'happy', look: 0.6 };
      } else {
        /* oct8: Mum and the octagon tile */
        fade(octS.g, t, at('oct8') - 0.06, 0.2);
        op(octS.mir, P(t, mid('oct8', 0.08), 0.4, linear));
        fade(o81, t, mid('oct8', 0.1)); fade(o82, t, mid('oct8', 0.25)); fade(o83, t, mid('oct8', 0.45)); fade(o84, t, mid('oct8', 0.58)); fade(o85, t, mid('oct8', 0.82));
        const turn = P(t, mid('oct8', 0.62), 0.9, ease);
        tr(octS.sp, octS.c[0], octS.c[1], 1, -45 * turn);
        op(o8Arc, P(t, mid('oct8', 0.62), 0.3, linear)); op(o8Lab, P(t, mid('oct8', 0.7), 0.3, linear));
        st.mum = { mood: 'happy', look: -0.6, lift: 0.3 }; st.kavya.look = 0.6; st.priya = { mood: 'smug', look: 0.4 }; st.boy = { mood: 'neutral', look: -0.6 };
        bx = 1068; bm = 'happy'; bl = -0.6;
      }
      show(bea, bx, by + Math.sin(t * 3) * 6 * AMP, 0.68, { talk: scTalk(S, t, 'bea'), mood: bm, look: bl });
    }

    /* ---------- R: Rex's confessional ---------- */
    if (sR) {
      show(rex, 330, 400, 1.32, { talk: scTalk(S, t, 'rex'), mood: t > mid('n', 0.75) ? 'smug' : 'deadpan', look: 0.4, open: 90 });
      const cp = P(t, at('n') + 0.05, 0.4, pop);
      op(nCard, clamp(cp * 2.5)); tr(nCard, 860, 330, Math.max(0.01, 0.7 + 0.3 * cp));
      nl.forEach((l, i) => fade(l, t, mid('n', [0.08, 0.4, 0.68][i])));
      return;
    }

    /* the four humans along the bottom edge, peering at the floor */
    if (sF || sZ || sK) {
      ROW.forEach(([c, x]) => {
        const key = c === kav ? 'kavya' : c === mum ? 'mum' : c === pri ? 'priya' : 'boy', s = st[key];
        if (who && who !== key && s.look === undefined) s.look = spk(who);
        show(c, x, key === 'boy' ? 712 : 700, 0.72, { talk: scTalk(S, t, key), mood: s.mood, look: s.look, lift: s.lift || 0 });
      });
      return;
    }

    /* ---------- W: the kitchen: the pun ---------- */
    kit.upd(t);
    const laugh = t >= at('laugh') - 0.06;
    const pk = laugh ? P(t, at('laugh') - 0.06, 1.6, ease) : 0;
    [kitWrap, islandWrap, Lcast].forEach(el => view(el, 1 + 0.18 * pk, 720, 420, 720, 420));
    const hop = laugh ? Math.abs(Math.sin(t * 9)) * 10 * AMP : 0;
    show(kav, 210, 446, 0.92, { mood: 'deadpan', look: laugh ? 0.9 : 0.9 });
    show(mum, 385, 446, 0.92, { mood: 'deadpan', look: 0.9, lift: 0 });
    show(pri, 555, 446, 0.92, { mood: 'deadpan', look: 0.9 });
    show(boy, 725, 456 - hop, 0.92, { talk: scTalk(S, t, 'boy'), mood: 'happy', look: laugh ? 0.7 : 0.6, lift: laugh ? 0.6 : 0 });
    show(tan, 950, 446, 0.95, { talk: scTalk(S, t, 'tan'), mood: laugh ? 'happy' : t > mid('pun', 0.8) ? 'smug' : 'happy', look: -0.7, lift: 0 });
    // Roomby drives silently across the counter in the pause
    const dr = P(t, end('pun') - 0.1, at('laugh') - end('pun') + 0.8, linear);
    op(roomby, dr > 0 && dr < 1 ? 1 : 0);
    tr(roomby, lerp(-120, 1320, dr), 520 - 0.36 * 74, 0.36);
    roomby.set({ t, mood: 'deadpan', look: -1, spin: 1, beep: 0 });
  };
});
