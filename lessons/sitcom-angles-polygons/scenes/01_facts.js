/* Scene 1: Ah Boy finds the scissors (angle facts).
   Shots (hard sitcom cuts):
   W  wide kitchen, 8:15: Ah Boy proudly holds up the scissors (the broom left by the fridge); Mum deadpan.
   B  the board shot: Rex on the island at the left, Kavya / Dad (or Mum) / Ah Boy behind it, a white card on the
      wall at the right where the diagrams and working build:
      - the giant scissors snip: acute (< 90°), right (90°, the little square; Rex smug), obtuse (between 90° and
        180°), reflex (> 180°, the arc drawn the long way round)
      - Dad's tile: a straight line with 52°, x, 73°; his protractor gets a red cross ("not drawn to scale");
        x = 180° − 52° − 73° = 55° with its reason; APPROVED
      - showpiece: the scissors open into an X: 38°, 142°, 38°, 142°; vertically opposite angles are equal; the four
        wedges fill a full turn: 38° + 142° + 38° + 142° = 360°
   W  "They only touch at the tips": Kavya and Ah Boy lean apart like an X.
   B  Dad's X: (3x + 10)° and (5x − 30)°; 3x + 10 = 5x − 30, 2x = 40, x = 20; Rex: the ANGLES are 70° and 110°. */
scene('facts', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const view = (el, k, fx, fy, sx, sy) => el.setAttribute('transform', `translate(${sx.toFixed(1)} ${sy.toFixed(1)}) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 2, color: o.color || C.ink, weight: 700 }); };
  const fadeIn = (el, t, t0, d) => { const p = P(t, t0, d || 0.3, easeOut); op(el, p); return p; };
  const GOLD = '#FFE45C', RED = '#D32F2F', GREEN = '#1E9E5A', BLUE = '#2E6FD8', INK = MK.ink, PAPER = MK.paper;
  const A_GOLD = '#F2B705', A_BLUE = '#4C8FE0', A_GREEN = '#2FA36B', A_PINK = '#E8578A';
  const rad = a => a * Math.PI / 180;
  const pt = (x, y, r, a) => [x + Math.cos(rad(a)) * r, y - Math.sin(rad(a)) * r];
  /* filled wedge from maths angle a1 anticlockwise to a2 */
  const wedgeD = (x, y, r, a1, a2) => { const p1 = pt(x, y, r, a1), p2 = pt(x, y, r, a2); return `M${x},${y} L${p1[0].toFixed(1)},${p1[1].toFixed(1)} A${r},${r} 0 ${a2 - a1 > 180 ? 1 : 0} 0 ${p2[0].toFixed(1)},${p2[1].toFixed(1)} Z`; };
  const arcD = (x, y, r, a1, a2) => { const p1 = pt(x, y, r, a1), p2 = pt(x, y, r, a2); return `M${p1[0].toFixed(1)},${p1[1].toFixed(1)} A${r},${r} 0 ${a2 - a1 > 180 ? 1 : 0} 0 ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`; };
  const wedge = (parent, x, y, r, a1, a2, col, o) => { o = o || {}; const g = G(parent); E('path', { d: wedgeD(x, y, r, a1, a2), fill: col, opacity: o.fillOp === undefined ? 0.35 : o.fillOp }, g); E('path', { d: arcD(x, y, r, a1, a2), fill: 'none', stroke: col, 'stroke-width': 4, 'stroke-linecap': 'round' }, g); return g; };
  /* an angle label (maths markup) centred on a point, with a paper halo */
  const lab = (parent, x, y, src, o) => { o = o || {}; return mkMath(parent, x, y + (o.size || 30) * 0.36, src, { size: o.size || 30, fill: o.fill || INK, anchor: 'middle', halo: o.halo === undefined ? PAPER : o.halo, weight: 700 }); };
  const swap = (a, b, t, t0) => { const p = P(t, t0, 0.3, linear); op(a, 1 - p); op(b, p); };

  /* layers: kitchen, the card on the wall, people behind the island, the island (and Rex on it), foreground, HUD */
  const Lbg = G(root), Lcard = G(root), Lcast = G(root), Lfront = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= the kitchen ================= */
  const kitWrap = G(Lbg);
  const kit = agKitchen(kitWrap);
  kit.clock(8.25);
  const broom = agBroom(kitWrap, 1.2); tr(broom, 1080, 512, 1.2, 12);   // left by the fridge
  const islandWrap = G(Lfront);
  islandWrap.appendChild(kit.front); islandWrap.appendChild(kit.top);
  const boxes = G(kit.top);
  tr(agTileBox(boxes), 0, 0); tr(agTileBox(boxes), 470, 0, 0.8);
  const cTime = pill(Lfg, '8:15 a.m.', { size: 34, color: GOLD, stroke: GOLD });

  /* ================= the card on the wall ================= */
  const CX = 905, card = G(Lcard);
  E('rect', { x: 648, y: 116, width: 530, height: 400, rx: 18, fill: 'rgba(0,0,0,0.22)' }, card);
  E('rect', { x: 640, y: 108, width: 530, height: 400, rx: 18, fill: PAPER, stroke: '#8FA3B8', 'stroke-width': 5 }, card);

  /* --- A: the four kinds of angle (the scissors snip) --- */
  const sn = G(card);
  const SP = [830, 372];
  const TYPES = [
    { name: 'acute', deg: 40, col: A_GREEN, head: '**acute**: {{< 90°}}' },
    { name: 'right', deg: 90, col: A_GOLD, head: '**right**: exactly {{90°}}' },
    { name: 'obtuse', deg: 130, col: A_BLUE, head: '**obtuse**: between {{90°}} and {{180°}}' },
    { name: 'reflex', deg: 130, col: A_PINK, head: '**reflex**: {{> 180°}}' },
  ];
  const snMarks = G(sn);
  TYPES.forEach(ty => {
    if (ty.name === 'right') ty.mark = mkAngleMark(snMarks, SP[0], SP[1], 0, 90, { r: 70, col: ty.col, width: 5 });
    else if (ty.name === 'reflex') ty.mark = wedge(snMarks, SP[0], SP[1], 58, 130, 360, ty.col, { fillOp: 0.3 });
    else ty.mark = wedge(snMarks, SP[0], SP[1], 62, 0, ty.deg, ty.col);
    ty.mark.set && ty.mark.set(1);
    ty.title = mkText(sn, CX, 172, ty.head, { size: 38, anchor: 'middle', fill: INK, boldFill: ty.col === A_GOLD ? '#C98A00' : ty.col });
  });
  const snipWrap = G(sn), bigSc = agScissors(snipWrap, { len: 170, col: '#E8424F' });
  const tagCol = G(sn), tags = TYPES.map((ty, i) => {
    const g = G(tagCol); tr(g, 1092, 248 + i * 52);
    const w = textWidth(ty.name, 28, FD, 800) + 34;
    E('rect', { x: -w / 2, y: -22, width: w, height: 42, rx: 21, fill: ty.col, opacity: 0.18, stroke: ty.col, 'stroke-width': 3 }, g);
    T(g, 0, 9, ty.name, { size: 28, weight: 800, anchor: 'middle', fill: ty.col === A_GOLD ? '#A87400' : ty.col });
    return g;
  });

  /* --- B: Dad's tile, a straight line with 52°, x, 73° --- */
  const cg = G(card);
  const TP = [905, 330];
  E('rect', { x: 680, y: 134, width: 450, height: 196, fill: '#F4F1E8', stroke: '#8F887A', 'stroke-width': 3 }, cg);
  E('path', { d: mkPoly([[1130, 134], [1130, 164], [1100, 134]]), fill: '#2E6E8E', opacity: 0.6 }, cg);   // the tile's blue corner
  const scale = mkText(cg, 696, 166, 'not drawn to scale', { size: 26, fill: '#7A6A5A', weight: 700 });
  const scaleHi = E('rect', { x: 688, y: 140, width: scale.w + 16, height: 36, rx: 8, fill: 'none', stroke: RED, 'stroke-width': 4 }, cg);
  const cw1 = wedge(cg, TP[0], TP[1], 52, 128, 180, A_BLUE);
  const cw2 = wedge(cg, TP[0], TP[1], 52, 73, 128, A_GOLD);
  const cw3 = wedge(cg, TP[0], TP[1], 52, 0, 73, A_GREEN);
  const r1 = pt(TP[0], TP[1], 150, 128), r2 = pt(TP[0], TP[1], 150, 73);
  E('path', { d: `M${TP[0]},${TP[1]} L${r1[0].toFixed(1)},${r1[1].toFixed(1)} M${TP[0]},${TP[1]} L${r2[0].toFixed(1)},${r2[1].toFixed(1)}`, stroke: '#C62828', 'stroke-width': 5, 'stroke-dasharray': '14 9', 'stroke-linecap': 'round' }, cg);
  E('path', { d: 'M668,330 L1142,330', stroke: INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, cg);
  E('circle', { cx: TP[0], cy: TP[1], r: 7, fill: INK }, cg);
  const l52 = lab(cg, ...pt(TP[0], TP[1], 92, 154), '52°');
  const lx = lab(cg, ...pt(TP[0], TP[1], 92, 100.5), 'x', { size: 34 });
  const l55 = lab(cg, ...pt(TP[0], TP[1], 92, 100.5), '55°', { fill: '#1E7A4A' });
  const l73 = lab(cg, ...pt(TP[0], TP[1], 92, 36.5), '73°');
  const xWork = mkMath(cg, CX, 398, 'x = 180° − 52° − 73° = 55°', { size: 38, fill: INK, anchor: 'middle' });
  const w55 = mkMeasure('55°', { size: 38 }).w, xRing = E('rect', { x: CX + xWork.w / 2 - w55 - 9, y: 366, width: w55 + 18, height: 44, rx: 8, fill: 'none', stroke: GREEN, 'stroke-width': 4 }, cg);
  const xWhy = mkText(cg, CX, 446, '**angles on a straight line** add to {{180°}}', { size: 26, anchor: 'middle', fill: GREEN });
  const okStamp = agStamp(cg, true);

  /* --- C: the scissors X: 38°, 142°, 38°, 142° (showpiece) --- */
  const xg = G(card);
  const XP = [905, 282];
  const xw = [wedge(xg, XP[0], XP[1], 62, -19, 19, A_GOLD), wedge(xg, XP[0], XP[1], 52, 19, 161, A_BLUE),
    wedge(xg, XP[0], XP[1], 62, 161, 199, A_GOLD), wedge(xg, XP[0], XP[1], 52, 199, 341, A_BLUE)];
  const xRingC = E('circle', { cx: XP[0], cy: XP[1], r: 74, fill: 'none', stroke: GREEN, 'stroke-width': 5, 'stroke-dasharray': '10 7' }, xg);
  const xSc = agScissors(xg, { len: 190 }); tr(xSc, XP[0], XP[1]); xSc.set(38);
  const xl = [lab(xg, ...pt(XP[0], XP[1], 128, 0), '38°'), lab(xg, ...pt(XP[0], XP[1], 88, 90), '142°'),
    lab(xg, ...pt(XP[0], XP[1], 86, 180), '38°', { size: 28 }), lab(xg, ...pt(XP[0], XP[1], 88, 270), '142°')];
  const nWork = mkMath(xg, CX, 452, '180° − 38° = 142°', { size: 36, fill: INK, anchor: 'middle' });
  const nWhy = mkText(xg, CX, 494, '**angles on a straight line** add to {{180°}}', { size: 26, anchor: 'middle', fill: GREEN });
  const vWhy = mkText(xg, CX, 462, '**vertically opposite** angles are **equal**', { size: 30, anchor: 'middle', fill: '#A87400' });
  const pWork = mkMath(xg, CX, 452, '38° + 142° + 38° + 142° = 360°', { size: 34, fill: INK, anchor: 'middle' });
  const pWhy = mkText(xg, CX, 494, '**angles around a point** add to {{360°}}', { size: 26, anchor: 'middle', fill: GREEN });

  /* --- D: Dad's X with algebra --- */
  const ag = G(card);
  const AP = [905, 238];
  const aw = [wedge(ag, AP[0], AP[1], 46, -35, 35, A_GOLD), wedge(ag, AP[0], AP[1], 40, 35, 145, A_BLUE),
    wedge(ag, AP[0], AP[1], 46, 145, 215, A_GOLD), wedge(ag, AP[0], AP[1], 40, 215, 325, A_BLUE)];
  { const e1 = pt(AP[0], AP[1], 150, 35), e2 = pt(AP[0], AP[1], 150, 215), e3 = pt(AP[0], AP[1], 150, 145), e4 = pt(AP[0], AP[1], 150, 325);
    E('path', { d: `M${e1[0].toFixed(1)},${e1[1].toFixed(1)} L${e2[0].toFixed(1)},${e2[1].toFixed(1)} M${e3[0].toFixed(1)},${e3[1].toFixed(1)} L${e4[0].toFixed(1)},${e4[1].toFixed(1)}`, stroke: INK, 'stroke-width': 6, 'stroke-linecap': 'round' }, ag);
    E('circle', { cx: AP[0], cy: AP[1], r: 6, fill: INK }, ag); }
  const aL1 = lab(ag, ...pt(AP[0], AP[1], 122, 0), '(3x + 10)°'), aL2 = lab(ag, ...pt(AP[0], AP[1], 122, 180), '(5x − 30)°');
  const aN = [lab(ag, ...pt(AP[0], AP[1], 110, 0), '70°', { fill: '#1E7A4A', size: 32 }), lab(ag, ...pt(AP[0], AP[1], 74, 90), '110°', { fill: '#1E7A4A', size: 32 }),
    lab(ag, ...pt(AP[0], AP[1], 110, 180), '70°', { fill: '#1E7A4A', size: 32 }), lab(ag, ...pt(AP[0], AP[1], 74, 270), '110°', { fill: '#1E7A4A', size: 32 })];
  const eWhy = mkText(ag, CX, 356, '**vertically opposite** angles are **equal**', { size: 26, anchor: 'middle', fill: GREEN });
  const eqW = mkWorking(ag, CX - 10, 372, ['3x + 10 = 5x − 30', '2x = 40', 'x = 20'], { size: 32, fill: INK, gap: 13 });
  const ansW = mkWorking(ag, CX - 40, 384, ['3 × 20 + 10 = 70°', '180° − 70° = 110°'], { size: 36, fill: INK, gap: 22 });

  /* chips in the kitchen (left, above the heads) */
  const cUns = pill(Lfg, 'Unsolvable!', { size: 32, color: '#FF8A8A', stroke: '#FF8A8A' });
  const cAng = mkChip(Lfg, 'find the **ANGLE**, not just {{x}}', { size: 30, col: GOLD });
  const cTips = pill(Lfg, 'only the tips touch', { size: 30, color: GOLD, stroke: GOLD });

  /* ================= the cast ================= */
  const kav = cast(Lcast, 'kavya'), mum = cast(Lcast, 'mum'), dad = cast(Lcast, 'dad'), boy = cast(Lcast, 'boy');
  const rex = cast(Lfront, 'rex');
  // Dad's props: the protractor gets a red cross; later he holds the scissors
  const protX = cross(dad.tools.protractor, 34, '#E53935');
  const dadSc = G(dad.hand); const dadScX = agScissors(dadSc, { len: 110, deg: 40 }); tr(dadSc, 0, -36, 0.9, -80);

  /* cut points */
  const cB = at('snip') - 0.06, cW2 = at('tips') - 0.06, cB2 = at('point') - 0.06;
  const BLOCK = { cuts: ['cuts', 'put', 'x', 'ok'], open: ['open', 'next', 'vop', 'point'], alg: ['alg', 'eq', 'ans'] };
  const RX = 104, RS = 0.66, RY = 520 - 126 * RS;   // Rex on the island, at the left
  const HS = 0.8, HY = 448;                       // humans behind the island

  return t => {
    const sW = on(t, -1, cB) || on(t, cW2, cB2), sB = 1 - sW;
    const who = scWho(S, t);
    kit.upd(t);
    kit.clock(8.25 + Math.min(t, 90) / 3600);
    kitWrap.removeAttribute('transform'); islandWrap.removeAttribute('transform'); Lcast.removeAttribute('transform');
    op(card, sB); op(cTime, 0); op(cUns, 0); op(cAng, 0); op(cTips, 0);
    [kav, mum, dad, boy, rex].forEach(c => op(c, 0));
    op(boy.tools.scissors, 1); op(boy.tools.broom, 0); op(dadSc, 0); op(dad.tools.protractor, 1); op(protX, 0);
    const show = (c, x, y, s, st, r) => { op(c, 1); tr(c, x, y, s, r); c.set(Object.assign({ t }, st)); };
    const snipping = k => 26 + 18 * Math.abs(Math.sin(t * 7)) * k;

    if (t < cB) {
      /* ---------- W: 8:15, Ah Boy has found the scissors ---------- */
      const push = P(t, 0, cB, linear);
      [kitWrap, islandWrap, Lcast].forEach(el => view(el, 1 + 0.05 * push, 640, 430, 640, 430));
      popIn(cTime, t, at('time') + 0.1, 960, 300);
      show(kav, 220, HY, 1.0, { mood: 'deadpan', look: 0.8 });
      show(mum, 430, HY, 1.0, { mood: 'deadpan', look: 0.9, lift: 0 });
      show(boy, 650, 458, 1.0, { talk: scTalk(S, t, 'boy'), mood: 'happy', look: 0, lift: 1 });
      boy.tools.scissorsX.set(snipping(1));
      show(dad, 850, HY, 1.0, { mood: 'neutral', look: -0.8, lift: 0 });
      show(rex, 1066, 520 - 126 * 0.62, 0.62, { mood: 'deadpan', look: -0.8, open: 90 });
      return;
    }
    if (t >= cW2 && t < cB2) {
      /* ---------- W: "They only touch at the tips" ---------- */
      const push = P(t, cW2, end('tips') - cW2 + 0.6, linear);
      [kitWrap, islandWrap, Lcast].forEach(el => view(el, 1 + 0.08 * push, 600, 420, 600, 420));
      const lean = 12 * P(t, at('tips') + 0.2, 0.5, ease);
      show(kav, 505, 452, 1.0, { mood: 'deadpan', look: -0.9 }, -lean);
      show(boy, 712, 462, 1.0, { talk: scTalk(S, t, 'boy'), mood: 'happy', look: 0.6, lift: 0.3 }, lean);
      boy.tools.scissorsX.set(26);
      show(mum, 250, HY, 0.95, { mood: 'deadpan', look: 0.9, lift: 0 });
      show(dad, 960, HY, 0.95, { mood: 'deadpan', look: -0.9, lift: 0 });
      popIn(cTips, t, mid('tips', 0.45), 608, 210);
      return;
    }

    /* ---------- B: the board shot ---------- */
    // who stands where: Kavya | Dad or Mum | Ah Boy; Rex on the island
    const mumIn = t >= at('next') - 0.06 && t < at('alg') - 0.06;
    const lookCard = 0.85;
    let kM = 'neutral', kL = lookCard, dM = 'neutral', dL = lookCard, bM = 'happy', bL = lookCard, mM = 'neutral', mL = lookCard;
    let rM = 'deadpan', rL = 0.7, rTw = 0, dLift = 0, bLift = 0, dSweat = 0;
    const lookAt = w => ({ kavya: -0.3, dad: 0, boy: 0.3, mum: 0, rex: -1 }[w]);

    if (t < at('cuts') - 0.06) {
      /* --- snip: the four kinds of angle --- */
      bLift = 1; kM = 'neutral'; dM = 'neutral';
      const f = (t - at('snip')) / (end('snip') - at('snip'));
      const k = f < 0.24 ? 0 : f < 0.47 ? 1 : f < 0.74 ? 2 : 3;
      if (k === 1 && f > 0.3) { rM = 'smug'; rL = 0.6; }
      const t0 = mid('snip', [0, 0.24, 0.47, 0.74][k]);
      const prev = k ? TYPES[k - 1].deg : 8, deg = lerp(prev, TYPES[k].deg, P(t, t0, 0.5, ease));
      bigSc.set(deg); tr(snipWrap, SP[0], SP[1], 1, -deg / 2);
      TYPES.forEach((ty, i) => {
        const p = i === k ? P(t, t0 + 0.35, 0.35, linear) : 0;
        if (ty.mark.set && ty.name === 'right') ty.mark.set(p); else op(ty.mark, p);
        op(ty.title, i === k ? P(t, t0 + 0.1, 0.25, linear) : 0);
        const tp = P(t, t0 + 0.3, 0.45, pop); op(tags[i], i <= k ? clamp(tp * 2.5 + (i < k ? 1 : 0)) : 0);
        tags[i].firstChild.setAttribute('opacity', i === k ? 0.45 : 0.15);
      });
      op(sn, 1); op(cg, 0); op(xg, 0); op(ag, 0);
      kL = lookCard; dL = lookCard; bL = lookCard;
    } else if (BLOCK.cuts.includes(who) || (t < at('open') - 0.06)) {
      /* --- Dad's tile: 52°, x, 73° --- */
      op(sn, 0); op(cg, 1); op(xg, 0); op(ag, 0);
      const inX = t >= at('x') - 0.06;
      op(lx, inX ? 1 - P(t, mid('x', 0.75), 0.3, linear) : 1); op(l55, inX ? P(t, mid('x', 0.75), 0.3, linear) : 0);
      [cw1, cw2, cw3].forEach((w, i) => op(w, P(t, mid('cuts', 0.25 + i * 0.12), 0.3, linear)));
      op(l52, P(t, mid('cuts', 0.3), 0.3, linear)); op(l73, P(t, mid('cuts', 0.54), 0.3, linear));
      if (!inX) op(lx, P(t, mid('cuts', 0.42), 0.3, linear));
      op(scale, 0.55 + 0.45 * P(t, at('put'), 0.3, linear));
      op(scaleHi, t >= mid('put', 0.25) ? (t < end('put') ? 0.6 + 0.4 * Math.sin(t * 9) : 0.5) : 0);
      fadeIn(xWork, t, mid('x', 0.05)); if (t < mid('x', 0.05)) op(xWork, 0);
      op(xWhy, t >= mid('put', 0.72) ? P(t, mid('put', 0.72), 0.3, linear) : 0);
      op(xRing, t >= mid('x', 0.4) ? P(t, mid('x', 0.4), 0.3, linear) : 0);
      if (t >= at('ok')) { okStamp.set(P(t, at('ok') + 0.15, 0.35, linear)); tr(okStamp, 1058, 486, 0.36); op(okStamp, 1); } else op(okStamp, 0);
      if (t < at('put')) {   // cuts: Dad raises the protractor; Rex twitches at "I'll measure x"
        dM = 'smug'; dLift = P(t, mid('cuts', 0.55), 0.35, ease); dL = lookCard; kM = 'deadpan';
        if (t > mid('cuts', 0.7)) { rTw = 1; rM = 'annoyed'; rL = 0.5; }
      } else if (t < at('x')) {   // put: Rex
        rM = t < mid('put', 0.25) ? 'shock' : 'annoyed'; rTw = t < mid('put', 0.35) ? 1 : 0; rL = 0.5;
        dM = t < mid('put', 0.3) ? 'shock' : 'sad'; dLift = 1 - P(t, mid('put', 0.8), 0.4, ease); dL = -0.6;
        op(protX, P(t, mid('put', 0.12), 0.25, linear));
        kM = 'smug'; kL = -0.8; bM = 'shock'; bL = -0.8;
      } else if (t < at('ok')) {   // x: Kavya
        kM = t > mid('x', 0.75) ? 'smug' : 'neutral'; kL = lookCard; dM = 'neutral'; dL = -0.7; rL = 0.8; bL = -0.4;
      } else {   // ok: Rex approves
        rM = 'smug'; rL = 0.8; kM = 'happy'; kL = -0.8; dM = 'sad'; dL = -0.8; bM = 'happy'; bL = -0.8;
      }
    } else if (t < at('alg') - 0.06) {
      /* --- the scissors X --- */
      op(sn, 0); op(cg, 0); op(xg, 1); op(ag, 0);
      const lp = [mid('open', 0.6), mid('next', 0.85), mid('vop', 0.15), mid('vop', 0.55)];
      xl.forEach((l, i) => op(l, P(t, lp[i], 0.3, linear)));
      const wOn = [mid('open', 0.5), mid('next', 0.3), mid('vop', 0.12), mid('vop', 0.5)];
      xw.forEach((w, i) => op(w, P(t, wOn[i], 0.3, linear)));
      op(nWork, t >= at('next') && t < at('vop') ? P(t, mid('next', 0.4), 0.3, linear) : 0);
      op(nWhy, t >= at('next') && t < at('vop') ? P(t, mid('next', 0.55), 0.3, linear) : 0);
      op(vWhy, t >= at('vop') && t < cB2 ? P(t, mid('vop', 0.6), 0.3, linear) : 0);
      op(pWork, t >= cB2 ? P(t, mid('point', 0.35), 0.3, linear) : 0);
      op(pWhy, t >= cB2 ? P(t, mid('point', 0.6), 0.3, linear) : 0);
      op(xRingC, t >= cB2 ? P(t, mid('point', 0.3), 0.4, linear) : 0);
      if (t >= cB2) {   // the four wedges fill round the point, one after another
        xw.forEach((w, i) => { op(w, P(t, at('point') + 0.1 + i * 0.3, 0.25, linear)); w.firstChild.setAttribute('opacity', 0.55); });
      } else xw.forEach(w => w.firstChild.setAttribute('opacity', 0.35));
      // vop: the two 38° wedges flash
      if (t >= at('vop') && t < end('vop')) { const fl = 0.35 + 0.35 * Math.max(0, Math.sin(t * 10)); xw[0].firstChild.setAttribute('opacity', fl); xw[2].firstChild.setAttribute('opacity', fl); }
      if (t < at('next')) { bLift = 1; bM = 'happy'; kM = 'neutral'; dM = 'neutral'; }
      else if (t < at('vop')) { mM = 'neutral'; mL = lookCard; bL = -0.5; kL = -0.5; }
      else if (t < cW2) { kM = 'smug'; kL = lookCard; mM = 'happy'; mL = -0.6; bL = -0.6; }
      else { mM = 'happy'; mL = lookCard; kL = 0.0; bL = -0.6; rM = 'smug'; }
    } else {
      /* --- Dad's algebra X --- */
      op(sn, 0); op(cg, 0); op(xg, 0); op(ag, 1);
      op(dadSc, 1); op(dad.tools.protractor, 0);
      const relabel = t >= at('ans') ? P(t, mid('ans', 0.58), 0.35, linear) : 0;
      op(aL1, P(t, mid('alg', 0.3), 0.3, linear) * (1 - relabel)); op(aL2, P(t, mid('alg', 0.55), 0.3, linear) * (1 - relabel));
      aN.forEach(l => op(l, relabel));
      aw.forEach((w, i) => op(w, i % 2 === 0 ? P(t, mid('alg', i ? 0.55 : 0.3), 0.3, linear) : relabel));
      op(eWhy, t >= at('eq') && t < at('ans') ? P(t, mid('eq', 0.18), 0.3, linear) : 0);
      if (t >= at('eq') && t < at('ans')) { op(eqW, 1); eqW.show(0, P(t, mid('eq', 0.12), 0.35, linear)); eqW.show(1, P(t, mid('eq', 0.62), 0.35, linear)); eqW.show(2, P(t, mid('eq', 0.82), 0.35, linear)); eqW.ring(2, P(t, mid('eq', 0.9), 0.3, linear)); }
      else op(eqW, 0);
      if (t >= at('ans')) { op(ansW, 1); ansW.show(0, P(t, mid('ans', 0.1), 0.35, linear)); ansW.show(1, P(t, mid('ans', 0.55), 0.35, linear)); ansW.ring(0, P(t, mid('ans', 0.4), 0.3, linear)); ansW.ring(1, P(t, mid('ans', 0.75), 0.3, linear)); }
      else op(ansW, 0);
      if (t < at('eq')) {
        dM = 'smug'; dLift = 1; dL = lookCard; dSweat = t > mid('alg', 0.75) ? 1 : 0; if (t > mid('alg', 0.75)) dM = 'shock';
        dadScX.set(40 + 14 * Math.abs(Math.sin(t * 6)));
        popIn(cUns, t, mid('alg', 0.8), 330, 200);
        kM = 'deadpan'; kL = 0.4; bL = -0.6;
      } else if (t < at('ans')) {
        kM = 'neutral'; kL = lookCard; dM = t > mid('eq', 0.8) ? 'happy' : 'neutral'; dL = -0.6; dLift = 0.4; bL = -0.6;
      } else {
        rM = t > mid('ans', 0.55) ? 'smug' : 'annoyed'; rL = 0.8; kM = 'smug'; kL = -0.8; dM = 'sad'; dL = -0.8; dLift = 0.4; bL = -0.8;
        popIn(cAng, t, mid('ans', 0.25), 340, 200);
      }
    }
    // listeners turn to the speaker unless told otherwise
    if (who === 'rex') { if (kL === lookCard) kL = -0.8; if (dL === lookCard) dL = -0.9; if (bL === lookCard) bL = -0.9; if (mL === lookCard) mL = -0.9; }

    show(rex, RX, RY, RS, { talk: scTalk(S, t, 'rex'), mood: rM, look: rL, open: 90, twitch: rTw });
    show(kav, 272, HY, HS, { talk: scTalk(S, t, 'kavya'), mood: kM, look: kL });
    if (mumIn) show(mum, 424, HY, HS, { talk: scTalk(S, t, 'mum'), mood: mM, look: mL, lift: 0 });
    else show(dad, 424, HY, HS, { talk: scTalk(S, t, 'dad'), mood: dM, look: dL, lift: dLift, sweat: dSweat });
    show(boy, 562, 462, HS, { talk: scTalk(S, t, 'boy'), mood: bM, look: bL, lift: bLift });
    boy.tools.scissorsX.set(snipping(bLift > 0.5 && who === 'boy' ? 1 : 0));
  };
});
