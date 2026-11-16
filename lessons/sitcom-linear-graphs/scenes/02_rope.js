/* Scene 2: Mum's rope (lines x = a, y = b, y = x and y = -x).
   Shots (hard sitcom cuts):
   A  10 a.m. on the picnic lawn: the family behind the mat (left), Mum's plan card on the right (axes x -4..6,
      y -5..6). Mum, with a coil of rope: from x = -1 to x = 5, from y = -3 to y = 2 -> Dad lays x = -1 ACROSS
      (a horizontal rope at y = -1) -> OFF THE LINE; Ex, lying on the x-axis, is stuck at -1 and the rope swings
      vertical; (-1, -3), (-1, 0), (-1, 4) -> Why rides the rope up and down (Wheee!) -> parallel to the OTHER axis:
      all four ropes -> the y-axis is x = 0, the x-axis is y = 0 -> width 6, height 5, area 30 square units.
   B  Reverse angle (card left, the family right): Mr Tan jogs in (lap 1): y = x through the mat -> (-2, -2),
      (0, 0), (4, 4), 45 degrees -> Kavya: y = -x, (2, -2), opposite -> reflect (5, 2) in y = x: (2, 5), swap ->
      Ah Boy: "I was just reflected" -> Mr Tan's pun; everyone deadpan, a seagull.
   C  Close two-shot: Ah Boy copies Mr Tan exactly (x says, y copies). Mr Tan deadpan for once. */
scene('rope', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);          // hard sitcom cut
  const winP = (t, a, b, d) => (t >= a && t < b ? P(t, a, d || 0.3, linear) : 0);   // fade in at a, hard cut at b
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 3, color: o.color || C.ink, weight: 700 }); };
  const popIn = (el, t, t0, x, y, s) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p))); return p; };
  const GOLD = '#FFE45C', INK = MK.ink, GREEN = '#1E9E5A', RED = '#D32F2F', BLUE = '#1E5AAC', PURPLE = '#7B3FC4', ORANGE = '#E8751A',
    ROPE = '#C62838';

  /* layers */
  const Lset = G(root), Lcast = G(root), Lfront = G(root), Lcard = G(root), Lhud = G(root);

  /* ================= the picnic lawn ================= */
  const pic = lgPicnic(Lset);
  Lfront.appendChild(pic.front); Lfront.appendChild(pic.top);

  /* ================= the plan card: axes x -4..6, y -5..6 ================= */
  const CW = 536, CH = 580;
  const plan = G(Lcard);
  E('rect', { x: 7, y: 7, width: CW, height: CH, rx: 18, fill: 'rgba(0,0,0,0.22)' }, plan);
  E('rect', { x: 0, y: 0, width: CW, height: CH, rx: 18, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, plan);
  T(plan, CW / 2 + 40, 46, 'THE PICNIC AREA', { size: 30, weight: 800, anchor: 'middle', fill: ROPE, ls: 2 });
  const axG = G(plan); tr(axG, 56, 108);
  const ax = mkAxes(axG, { xmin: -4, xmax: 6, ymin: -5, ymax: 6, unit: 40, ink: INK, size: 26, halo: MK.paper });
  const X = x => ax.px(x), Y = y => ax.py(y);
  // drop the origin's '0' label: at 40 px a unit it reads as '−10' next to the '−1'
  Array.from(ax.querySelectorAll('text')).forEach(el => { if (el.textContent === '0') el.remove(); });
  const shadeL = G(axG), glowL = G(axG), ropeL = G(axG), lineL = G(axG), dotL = G(axG), labL = G(axG), guestL = G(axG);
  const lab = (x, y, s, o) => mkText(labL, x, y, s, Object.assign({ size: 28, fill: INK, halo: MK.paper, anchor: 'start' }, o || {}));
  const dot = (x, y, col, label, pos, o) => {
    o = o || {};
    const g = G(dotL); tr(g, X(x), Y(y)); const inner = G(g);
    E('circle', { r: 9, fill: col, stroke: '#FFFFFF', 'stroke-width': 3 }, inner);
    if (label) {
      const ls = o.size || 26, dx = pos.includes('e') ? 16 : pos.includes('w') ? -16 : 0;
      const dy = pos.includes('n') ? -16 : pos.includes('s') ? 16 + ls * 0.8 : ls * 0.36;
      mkText(inner, dx, dy, label, { size: ls, anchor: pos.includes('e') ? 'start' : pos.includes('w') ? 'end' : 'middle', fill: o.labelCol || col, boldFill: o.boldFill, halo: MK.paper });
    }
    g.set = p => mkPopIn(g, p);
    g.set(0);
    return g;
  };
  // a rope: a dark core, a red strand and a light twist, drawn between two plan points
  const mkRope = () => {
    const g = G(ropeL);
    const a = E('path', { d: '', fill: 'none', stroke: '#7A0F22', 'stroke-width': 11, 'stroke-linecap': 'round' }, g);
    const b = E('path', { d: '', fill: 'none', stroke: ROPE, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
    const c = E('path', { d: '', fill: 'none', stroke: '#FFC2CC', 'stroke-width': 2.5, 'stroke-dasharray': '5 7' }, g);
    g.seg = (x1, y1, x2, y2, p) => {
      p = clamp(p); op(g, p > 0.001 ? 1 : 0); if (p <= 0.001) return;
      const d = `M${X(x1).toFixed(1)},${Y(y1).toFixed(1)} L${X(lerp(x1, x2, p)).toFixed(1)},${Y(lerp(y1, y2, p)).toFixed(1)}`;
      attr(a, 'd', d); attr(b, 'd', d); attr(c, 'd', d);
    };
    g.seg(0, 0, 0, 0, 0);
    return g;
  };
  // the line through (x0, y0) at angle th (degrees), clipped to the plan
  const clipLine = (x0, y0, th) => {
    const dx = Math.cos(th * Math.PI / 180), dy = Math.sin(th * Math.PI / 180);
    let t0 = -1e9, t1 = 1e9;
    [[dx, x0, -4, 6], [dy, y0, -5, 6]].forEach(([d, p, lo, hi]) => {
      if (Math.abs(d) < 1e-9) return;
      let a = (lo - p) / d, b = (hi - p) / d; if (a > b) [a, b] = [b, a];
      t0 = Math.max(t0, a); t1 = Math.min(t1, b);
    });
    return [x0 + dx * t0, y0 + dy * t0, x0 + dx * t1, y0 + dy * t1];
  };

  // the ropes
  const rWrong = mkRope(), rX5 = mkRope(), rYm3 = mkRope(), rY2 = mkRope();
  const lWrong = lab(X(-3.9), Y(-1) + 38, '{{x = −1}} ?', { fill: RED, size: 30 });
  const lXm1 = lab(X(-1) - 10, Y(5.4), '{{x = −1}}', { fill: ROPE, anchor: 'end', size: 30 });
  const lX5 = lab(X(5) - 10, Y(5.4), '{{x = 5}}', { fill: ROPE, anchor: 'end', size: 30 });
  const lYm3 = lab(X(-3.9), Y(-3) - 14, '{{y = −3}}', { fill: ROPE, size: 30 });
  const lY2 = lab(X(-3.9), Y(2) - 14, '{{y = 2}}', { fill: ROPE, size: 30 });
  const stOff = lgStamp(labL, false);
  // x stuck at -1
  const dStuck = [[-3, '(**−1**, −3)'], [1, '(**−1**, 1)'], [4, '(**−1**, 4)']].map(([y, s]) => dot(-1, y, RED, s, 'e', { labelCol: INK, boldFill: RED }));
  // the axes glow: x = 0 and y = 0
  const gY = E('path', { d: `M${X(0)},${Y(-5)} L${X(0)},${Y(6)}`, stroke: '#2E7DD8', 'stroke-width': 16, 'stroke-linecap': 'round', opacity: 0.4 }, glowL);
  const gX = E('path', { d: `M${X(-4)},${Y(0)} L${X(6)},${Y(0)}`, stroke: '#E8424F', 'stroke-width': 16, 'stroke-linecap': 'round', opacity: 0.4 }, glowL);
  const lX0 = lab(X(0.75), Y(4.6), '{{x = 0}}', { fill: BLUE, size: 30 });
  const lY0 = lab(X(2.4), Y(0) - 14, '{{y = 0}}', { fill: '#B0123E', size: 30, anchor: 'middle' });
  // the area
  const shade = E('rect', { x: X(-1), y: Y(2), width: X(5) - X(-1), height: Y(-3) - Y(2), fill: '#FFC247', opacity: 0.35 }, shadeL);
  const dimW = G(labL), dimH = G(labL);
  E('path', { d: `M${X(-1) + 4},${Y(-3.75)} L${X(5) - 4},${Y(-3.75)} M${X(-1) + 4},${Y(-3.75)} l12,-8 l0,16 Z M${X(5) - 4},${Y(-3.75)} l-12,-8 l0,16 Z`, stroke: '#B8640A', fill: '#B8640A', 'stroke-width': 4 }, dimW);
  mkText(dimW, X(2), Y(-3.75) + 34, '**6**', { size: 30, anchor: 'middle', fill: '#B8640A', halo: MK.paper });
  E('path', { d: `M${X(5.5)},${Y(2) + 4} L${X(5.5)},${Y(-3) - 4} M${X(5.5)},${Y(2) + 4} l-8,12 l16,0 Z M${X(5.5)},${Y(-3) - 4} l-8,-12 l16,0 Z`, stroke: '#B8640A', fill: '#B8640A', 'stroke-width': 4 }, dimH);
  mkText(dimH, X(5.5) + 14, Y(-0.5) + 10, '**5**', { size: 30, anchor: 'start', fill: '#B8640A', halo: MK.paper });
  // shot B: y = x and y = -x
  const lnYX = ax.line(1, 0, { col: GREEN, width: 7 }); lineL.appendChild(lnYX);
  const lnYNX = ax.line(-1, 0, { col: PURPLE, width: 7 }); lineL.appendChild(lnYNX);
  const lYX = lab(X(-3.3) + 16, Y(-3.3) + 34, '{{y = x}}', { fill: GREEN, size: 32, anchor: 'start' });
  const lYNX = lab(X(-3.4), Y(4.4) - 14, '{{y = −x}}', { fill: PURPLE, size: 32, anchor: 'start' });
  const dYX = [[-2, 'w'], [0, 'nw'], [4, 'w']].map(([v, pos]) => dot(v, v, GREEN, `(${mkFmt(v)}, ${mkFmt(v)})`, pos));
  const dYNX = dot(2, -2, PURPLE, '(2, −2)', 'e');
  const a45 = mkAngleMark(labL, X(0), Y(0), 0, 45, { r: 50, col: GREEN, label: '45°', size: 26, lr: 84 });
  const a45n = mkAngleMark(labL, X(0), Y(0), -45, 0, { r: 62, col: PURPLE, label: '45°', size: 26, lr: 112 });
  const mirLine = E('path', { d: `M${X(5)},${Y(2)} L${X(2)},${Y(5)}`, stroke: ORANGE, 'stroke-width': 4, 'stroke-dasharray': '10 8', fill: 'none' }, lineL);
  const mirSq = E('path', { d: `M${X(3.5) - 9.9},${Y(3.5) - 9.9 + 0} m0,0`, fill: 'none' }, lineL);
  {   // the right-angle mark where the dashed line meets y = x
    const k = 12 / Math.SQRT2, cx = X(3.5), cy = Y(3.5);
    attr(mirSq, 'd', `M${(cx + k).toFixed(1)},${(cy - k).toFixed(1)} L${(cx + 2 * k).toFixed(1)},${cy.toFixed(1)} L${(cx + k).toFixed(1)},${(cy + k).toFixed(1)}`);
    mirSq.setAttribute('stroke', ORANGE); mirSq.setAttribute('stroke-width', 3);
  }
  const d52 = dot(5, 2, ORANGE, '(5, 2)', 'e'), d25 = dot(2, 5, ORANGE, '(2, 5)', 'e');
  // Ex and Why on the plan
  const ex = cast(guestL, 'ex'), why = cast(guestL, 'why');

  /* ================= the notes card (left in A, right in B) ================= */
  const NW = 560, NH = 328;
  const notes = G(Lcard);
  E('rect', { x: 6, y: 6, width: NW, height: NH, rx: 18, fill: 'rgba(0,0,0,0.22)' }, notes);
  E('rect', { x: 0, y: 0, width: NW, height: NH, rx: 18, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, notes);
  const page = () => G(notes);
  const nt = (pg, x, y, s, o) => mkText(pg, x, y, s, Object.assign({ size: 32, fill: INK, anchor: 'middle' }, o || {}));
  const nm = (pg, x, y, s, o) => mkMath(pg, x, y, s, Object.assign({ size: 44, fill: INK, anchor: 'start' }, o || {}));
  // area: Mum's ropes
  const pArea = page();
  nt(pArea, NW / 2, 52, "**Mum's ropes**", { boldFill: ROPE, size: 34 });
  const aw = [nt(pArea, 34, 132, 'from', { anchor: 'start', size: 30 }), nt(pArea, 300, 132, 'to', { anchor: 'start', size: 30 }),
    nt(pArea, 34, 222, 'from', { anchor: 'start', size: 30 }), nt(pArea, 300, 222, 'to', { anchor: 'start', size: 30 })];
  const am = [nm(pArea, 110, 134, 'x = −1', { fill: ROPE }), nm(pArea, 346, 134, 'x = 5', { fill: ROPE }),
    nm(pArea, 110, 224, 'y = −3', { fill: ROPE }), nm(pArea, 346, 224, 'y = 2', { fill: ROPE })];
  const amRing = E('rect', { x: 98, y: 92, width: 172, height: 60, rx: 14, fill: 'none', stroke: RED, 'stroke-width': 4 }, pArea);
  const aDad = nt(pArea, NW / 2, 296, 'Dad: rope goes **across**?', { boldFill: RED, size: 30 });
  // stuck / free
  const pStuck = page();
  nt(pStuck, NW / 2, 58, 'In {{x = −1}}:', { size: 36 });
  const sRow1 = nt(pStuck, NW / 2, 132, '{{x}} is **stuck** at {{−1}}', { boldFill: RED, size: 34 });
  const sRow2 = nt(pStuck, NW / 2, 200, '{{y}} can be **anything**', { boldFill: BLUE, size: 34 });
  const sHl = E('rect', { x: 70, y: 166, width: NW - 140, height: 50, rx: 12, fill: '#FFE45C', opacity: 0.45 }, pStuck);
  pStuck.insertBefore(sHl, sRow2);
  const sVert = nt(pStuck, NW / 2, 290, '**VERTICAL!**', { boldFill: ROPE, size: 46 });
  // other: parallel to the OTHER axis
  const pOther = page();
  const oR1 = nt(pOther, NW / 2, 56, 'The line runs **parallel**', { boldFill: ORANGE, size: 34 });
  const oR2 = nt(pOther, NW / 2, 104, 'to the **OTHER** axis.', { boldFill: ORANGE, size: 34 });
  const oA = G(pOther), oB = G(pOther);
  nm(oA, 64, 202, 'x = a', { size: 46 }); E('path', { d: 'M262,160 L262,214', stroke: ROPE, 'stroke-width': 9, 'stroke-linecap': 'round' }, oA);
  nt(oA, 300, 200, '**vertical**', { anchor: 'start', boldFill: ROPE, size: 36 });
  nm(oB, 64, 290, 'y = b', { size: 46 }); E('path', { d: 'M236,276 L290,276', stroke: ROPE, 'stroke-width': 9, 'stroke-linecap': 'round' }, oB);
  nt(oB, 300, 288, '**horizontal**', { anchor: 'start', boldFill: ROPE, size: 36 });
  // axes
  const pAxes = page();
  const xA1 = nt(pAxes, NW / 2, 120, 'the **y-axis** is the line {{x = 0}}', { boldFill: BLUE, size: 34 });
  const xA2 = nt(pAxes, NW / 2, 230, 'the **x-axis** is the line {{y = 0}}', { boldFill: '#B0123E', size: 34 });
  // size: the area
  const pSize = page();
  nt(pSize, NW / 2, 50, '**The picnic area**', { boldFill: '#B8640A', size: 34 });
  const wk = mkWorking(pSize, 250, 82, [{ m: '5 − (−1) = 6', note: 'width' }, { m: '2 − (−3) = 5', note: 'height' }, { m: '6 × 5 = 30', note: 'square units' }],
    { size: 40, fill: INK, noteSize: 28, noteCol: '#B8640A', gap: 26 });
  // shot B pages
  const pTan = page();
  nm(pTan, NW / 2, 140, 'y = x', { size: 72, fill: GREEN, anchor: 'middle' });
  const tMat = nt(pTan, NW / 2, 240, 'right through your **mat**!', { boldFill: ROPE, size: 36 });
  const pYX = page();
  nt(pYX, NW / 2, 62, 'On {{y = x}}: coordinates **equal**', { boldFill: GREEN, size: 34 });
  const yxP = [nm(pYX, 40, 160, '(−2, −2)', { size: 40, fill: GREEN }), nm(pYX, 228, 160, '(0, 0)', { size: 40, fill: GREEN }), nm(pYX, 376, 160, '(4, 4)', { size: 40, fill: GREEN })];
  const yx45 = nt(pYX, NW / 2, 258, 'It rises at {{45°}}.', { size: 36 });
  const pYNX = page();
  nt(pYNX, NW / 2, 62, 'On {{y = −x}}: coordinates **opposite**', { boldFill: PURPLE, size: 32 });
  const ynxP = nm(pYNX, NW / 2, 162, '(2, −2)', { size: 48, fill: PURPLE, anchor: 'middle' });
  const ynx45 = nt(pYNX, NW / 2, 258, 'It falls at {{45°}}.', { size: 36 });
  const pMir = page();
  nt(pMir, NW / 2, 62, 'Reflect in {{y = x}}:', { size: 36 });
  const mirM = nm(pMir, NW / 2, 166, '(5, 2) → (2, 5)', { size: 54, fill: ORANGE, anchor: 'middle' });
  const mirS = nt(pMir, NW / 2, 266, 'the coordinates **swap**!', { boldFill: ORANGE, size: 36 });
  const pPun = page();
  nt(pPun, NW / 2, 76, 'Careful with {{y = x}}.', { size: 36 });
  const punR1 = nt(pPun, NW / 2, 166, 'Whatever {{x}} says,', { size: 38 });
  const punR2 = nt(pPun, NW / 2, 246, '{{y}} just **copies** it.', { boldFill: GREEN, size: 38 });
  const pages = [pArea, pStuck, pOther, pAxes, pSize, pTan, pYX, pYNX, pMir, pPun];

  /* ================= chips, HUD ================= */
  const cTen = pill(Lhud, '10 a.m.', { size: 32, color: GOLD, stroke: GOLD });
  const phone = lgPhone(Lhud, { s: 0.32 });
  const cRopes = mkChip(Lhud, 'Mum ropes off the **picnic area**', { size: 32, col: '#FFC2CC' });
  const cPrec = mkChip(Lhud, '**Precisely.**', { size: 32, col: GOLD });
  const cLap = mkChip(Lhud, 'LAP 1', { size: 32, col: '#4FB6E8', solid: true });
  const cRefl = mkChip(Lhud, '**reflected**', { size: 32, col: ORANGE });
  const cDots = mkChip(Lhud, '…', { size: 34, col: '#FFFFFF' });
  const cCopy = mkChip(Lhud, 'Whatever {{x}} says, {{y}} just **copies** it.', { size: 34, col: GOLD });
  const badgeX = G(Lhud), badgeY = G(Lhud);
  E('circle', { r: 34, fill: '#FFFFFF', stroke: '#C8283A', 'stroke-width': 5 }, badgeX); mkMath(badgeX, 0, 15, 'x', { size: 48, fill: '#C8283A', anchor: 'middle', weight: 700 });
  E('circle', { r: 34, fill: '#FFFFFF', stroke: '#1E5AAC', 'stroke-width': 5 }, badgeY); mkMath(badgeY, 0, 13, 'y', { size: 48, fill: '#1E5AAC', anchor: 'middle', weight: 700 });
  const gull = G(Lhud);
  const gullO = E('path', { d: '', fill: 'none', stroke: '#3A4A58', 'stroke-width': 10, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, gull);
  const gullW = E('path', { d: '', fill: 'none', stroke: '#F4F7FA', 'stroke-width': 6, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, gull);
  E('path', { d: 'M-4,4 Q0,10 6,4', fill: 'none', stroke: '#9AA6B2', 'stroke-width': 4, 'stroke-linecap': 'round' }, gull);

  /* ================= the cast (one of each) ================= */
  const mum = cast(Lcast, 'mum', { hand: true }), dad = cast(Lcast, 'dad'), kav = cast(Lcast, 'kavya'), boy = cast(Lcast, 'boy'), tan = cast(Lcast, 'tan');
  const boyBottle = lgBottle(boy.hand); tr(boyBottle, 0, 0, 0.9);   // Ah Boy's copy of Mr Tan's water bottle (shot C)
  {   // Mum's coil of rope
    const coil = G(mum.hand); tr(coil, 0, -34);
    [30, 22, 14].forEach((r, i) => E('ellipse', { cx: 0, cy: 0, rx: r + 8, ry: r, fill: 'none', stroke: i % 2 ? '#7A0F22' : ROPE, 'stroke-width': 7 }, coil));
    E('path', { d: 'M30,8 Q46,40 30,64', fill: 'none', stroke: ROPE, 'stroke-width': 7, 'stroke-linecap': 'round' }, coil);
  }
  const ltTan = lgLowerThird(Lhud, 'tan');
  const fade = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cut points and positions */
  const cB = at('tan') - 0.06, cC = at('copy') - 0.06;
  const HY = 604;
  const PA = { x: 624, y: 102 }, PB = { x: 36, y: 102 };     // plan card
  const NA = { x: 36, y: 112 }, NB = { x: 606, y: 112 };     // notes card

  return t => {
    const who = scWho(S, t);
    op(fade, 1 - P(t, at('ten') - 0.3, 0.3, linear));
    pic.upd(t * AMP);
    const sA = on(t, -1, cB), sB = on(t, cB, cC), sC = on(t, cC, 1e9);

    /* ---------- HUD ---------- */
    popIn(cTen, t, at('ten') + 0.1, 622, 58);
    op(phone, P(t, at('ten') + 0.3, 0.3, linear)); tr(phone, 700, 58); phone.set(75);
    ltTan.set(win(t, at('tan') + 0.2, at('tan') + 3.3, 0.3)); tr(ltTan, 620, 600);
    cRopes.set(winP(t, mid('ten', 0.3), at('area'))); tr(cRopes, 316, 200);
    cPrec.set(winP(t, mid('ten', 0.72), at('area'))); tr(cPrec, 316, 280);

    /* ---------- the plan card ---------- */
    const cardIn = P(t, mid('ten', 0.5), 0.45, easeOut);
    op(plan, sC ? 0 : (cardIn > 0 ? 1 : 0));
    if (sA) tr(plan, PA.x + 560 * (1 - cardIn), PA.y); else tr(plan, PB.x, PB.y);
    // the wrong rope, then x = -1
    const dadDraw = P(t, mid('dad', 0.3), 0.9, ease);
    const swing = P(t, mid('stuck', 0.24), 0.7, ease);
    const [w1, w2, w3, w4] = clipLine(-1, -1, 90 * swing);
    if (swing <= 0) rWrong.seg(-4, -1, 6, -1, dadDraw);
    else if (swing < 1) rWrong.seg(w1, w2, w3, w4, 1);
    else rWrong.seg(-1, 6, -1, -5, 1);
    op(lWrong, t < at('stuck') ? P(t, mid('dad', 0.55), 0.3, linear) : 1 - P(t, mid('stuck', 0.22), 0.2, linear));
    stOff.set(t >= at('stuck') && t < mid('stuck', 0.4) ? P(t, mid('stuck', 0.03), 0.35, linear) * (1 - P(t, mid('stuck', 0.3), 0.15, linear)) : 0);
    tr(stOff, X(1.6), Y(-1) - 4, 0.42);
    op(lXm1, P(t, mid('stuck', 0.4), 0.3, linear));
    dStuck.forEach((d, i) => d.set(t < at('other') ? P(t, mid('stuck', 0.46 + i * 0.1), 0.35, linear) : 1 - P(t, at('other'), 0.25, linear)));
    // the other three ropes
    rX5.seg(5, 6, 5, -5, P(t, mid('other', 0.6), 0.6, ease)); op(lX5, P(t, mid('other', 0.68), 0.3, linear));
    rYm3.seg(-4, -3, 6, -3, P(t, mid('other', 0.82), 0.6, ease)); op(lYm3, P(t, mid('other', 0.86), 0.3, linear));
    rY2.seg(-4, 2, 6, 2, P(t, mid('other', 0.86), 0.6, ease)); op(lY2, P(t, mid('other', 0.9), 0.3, linear));
    op(ropeL, sB ? 0.45 : 1);
    [lXm1, lX5, lYm3, lY2].forEach(l => { if (sB) op(l, 0); });
    // the axes glow
    const gyP = winP(t, mid('axes', 0.1), at('size')), gxP = winP(t, mid('axes', 0.55), at('size'));
    op(gY, gyP * 0.45); op(lX0, gyP); op(gX, gxP * 0.45); op(lY0, gxP);
    // area
    const shP = P(t, mid('size', 0.08), 0.4, linear);
    op(shade, sB ? 0.18 : shP * 0.35);
    op(dimW, sA ? P(t, mid('size', 0.12), 0.3, linear) : 0); op(dimH, sA ? P(t, mid('size', 0.42), 0.3, linear) : 0);
    // shot B: y = x, y = -x, the mirror
    lnYX.set(sB ? P(t, mid('tan', 0.55), 0.9, ease) : 0); op(lYX, sB ? P(t, mid('tan', 0.75), 0.3, linear) : 0);
    dYX.forEach((d, i) => d.set(sB ? P(t, mid('yx', 0.2 + i * 0.09), 0.35, linear) : 0));
    a45.set(sB ? P(t, mid('yx', 0.68), 0.6, linear) : 0);
    lnYNX.set(sB ? P(t, at('ynx') + 0.2, 0.9, ease) : 0); op(lYNX, sB ? P(t, at('ynx') + 0.6, 0.3, linear) : 0);
    dYNX.set(sB ? P(t, mid('ynx', 0.45), 0.35, linear) : 0);
    a45n.set(sB ? P(t, mid('ynx', 0.7), 0.6, linear) : 0);
    d52.set(sB ? P(t, mid('mirror', 0.12), 0.35, linear) : 0);
    const mp = sB ? P(t, mid('mirror', 0.4), 0.6, ease) : 0;
    op(mirLine, mp > 0 ? 1 : 0); attr(mirLine, 'stroke-dashoffset', 0);
    if (mp > 0) attr(mirLine, 'd', `M${X(5)},${Y(2)} L${X(lerp(5, 2, mp)).toFixed(1)},${Y(lerp(2, 5, mp)).toFixed(1)}`);
    op(mirSq, mp > 0.5 ? 1 : 0);
    d25.set(sB ? P(t, mid('mirror', 0.62), 0.35, linear) : 0);

    /* ---------- Ex and Why on the plan (shot A) ---------- */
    const exIn = sA ? winP(t, at('stuck') - 0.1, at('size'), 0.3) * (1 - P(t, at('size'), 0.25, linear)) : 0;
    op(ex, exIn);
    if (exIn > 0) {
      const slide = P(t, at('stuck') - 0.1, 0.45, easeOut);
      tr(ex, X(-1.15) - 138 * 0.48 - 40 * (1 - slide), Y(0) - 26, 0.48);
      const ewho = who === 'ex';
      ex.set({ t, talk: scTalk(S, t, 'ex'), mood: ewho ? (t > mid('stuck', 0.85) && t < end('stuck') + 0.2 ? 'shock' : 'smug') : t >= at('free') && t < at('other') ? 'happy' : 'neutral', look: ewho ? 0.6 : 1 });
    }
    const whyIn = sA ? winP(t, at('free') - 0.2, at('size'), 0.25) * (1 - P(t, at('size'), 0.25, linear)) : 0;
    op(why, whyIn);
    if (whyIn > 0) {
      let wx = -1, wy = 0.6, arms = 0, wm = 'happy';
      if (t < at('other')) { const ph = (t - at('free') + 0.2) * 1.1; wy = 0.6 + 3.0 * Math.sin(ph * TAU) * (S.reduce ? 0.5 : 1); arms = 1; }
      else { const mv = P(t, at('other'), 0.6, ease); wx = lerp(-1, 0, mv); wy = lerp(0.6 + 3.0 * Math.sin((at('other') - at('free') + 0.2) * 1.1 * TAU) * (S.reduce ? 0.5 : 1), 4.15, mv); arms = 0; }
      tr(why, X(wx), Y(wy), 0.44);
      why.set({ t, talk: scTalk(S, t, 'why'), mood: wm, look: -0.4, arms });
    }

    /* ---------- the notes card ---------- */
    pages.forEach(p => op(p, 0));
    let pg = null;
    if (sA) {
      if (t >= at('area') && t < at('stuck')) pg = pArea;
      else if (t >= at('stuck') && t < at('other')) pg = pStuck;
      else if (t >= at('other') && t < at('axes')) pg = pOther;
      else if (t >= at('axes') && t < at('size')) pg = pAxes;
      else if (t >= at('size')) pg = pSize;
    } else if (sB) {
      if (t < at('yx')) pg = pTan;
      else if (t < at('ynx')) pg = pYX;
      else if (t < at('mirror')) pg = pYNX;
      else if (t < at('pun')) pg = pMir;
      else pg = pPun;
    }
    const nIn = sA ? P(t, at('area') - 0.1, 0.35, easeOut) : 1;
    op(notes, sC || !pg ? 0 : nIn); if (pg) op(pg, 1);
    if (sA) tr(notes, NA.x - 40 * (1 - nIn), NA.y); else tr(notes, NB.x, NB.y);
    // per-page beats
    const bs = [mid('area', 0.12), mid('area', 0.3), mid('area', 0.55), mid('area', 0.78)];
    am.forEach((m, i) => op(m, P(t, bs[i], 0.3, linear)));
    aw.forEach((w, i) => op(w, P(t, bs[i] - 0.15, 0.3, linear)));
    op(amRing, t >= at('dad') ? P(t, mid('dad', 0.1), 0.25, linear) : 0);
    op(aDad, t >= at('dad') ? P(t, mid('dad', 0.6), 0.3, linear) : 0);
    op(sRow1, P(t, mid('stuck', 0.3), 0.3, linear)); op(sRow2, P(t, mid('stuck', 0.55), 0.3, linear));
    op(sHl, t >= at('free') ? 0.45 + 0.3 * Math.sin(t * 8) * AMP : 0);
    op(sVert, P(t, mid('stuck', 0.86), 0.25, linear));
    op(oR1, P(t, at('other') + 0.1, 0.3, linear)); op(oR2, P(t, mid('other', 0.3), 0.3, linear));
    op(oA, P(t, mid('other', 0.6), 0.3, linear)); op(oB, P(t, mid('other', 0.82), 0.3, linear));
    op(xA1, P(t, mid('axes', 0.1), 0.3, linear)); op(xA2, P(t, mid('axes', 0.55), 0.3, linear));
    wk.show(0, P(t, mid('size', 0.08), 0.4, linear)); wk.show(1, P(t, mid('size', 0.4), 0.4, linear)); wk.show(2, P(t, mid('size', 0.72), 0.4, linear));
    wk.ring(2, P(t, end('size') - 0.2, 0.3, linear));
    op(tMat, P(t, mid('tan', 0.7), 0.3, linear));
    yxP.forEach((m, i) => op(m, P(t, mid('yx', 0.2 + i * 0.09), 0.3, linear)));
    op(yx45, P(t, mid('yx', 0.68), 0.3, linear));
    op(ynxP, P(t, mid('ynx', 0.45), 0.3, linear)); op(ynx45, P(t, mid('ynx', 0.7), 0.3, linear));
    op(mirM, P(t, mid('mirror', 0.15), 0.3, linear)); op(mirS, P(t, mid('mirror', 0.75), 0.3, linear));
    op(punR1, P(t, mid('pun', 0.4), 0.3, linear)); op(punR2, P(t, mid('pun', 0.68), 0.3, linear));

    /* ---------- chips over the family ---------- */
    cLap.set(sB && t < at('mirror') ? P(t, at('tan') + 0.4, 0.4, linear) : 0); tr(cLap, 1092, 462);
    cRefl.set(sB && t >= at('boy') && t < at('pun') ? P(t, mid('boy', 0.55), 0.4, linear) : 0); tr(cRefl, 988, 470);
    cDots.set(sB && t >= mid('pun', 0.9) ? P(t, mid('pun', 0.9), 0.3, linear) : 0); tr(cDots, 886, 404);
    // the seagull crosses in the pause after the pun
    const gp = sB ? P(t, mid('pun', 0.55), 1.9, linear) : 0;
    op(gull, gp > 0 && gp < 1 ? 1 : 0);
    if (gp > 0 && gp < 1) {
      const fl = Math.sin(t * 14) * 12;
      const gd = `M-30,${(-fl).toFixed(1)} Q-14,-12 0,0 Q14,-12 30,${(-fl).toFixed(1)}`;
      attr(gullW, 'd', gd); attr(gullO, 'd', gd);
      tr(gull, lerp(1260, 560, gp), 474 - 16 * Math.sin(gp * Math.PI), 1.1);
    }

    /* ---------- the cast ---------- */
    [mum, dad, kav, boy, tan].forEach(c => op(c, 0));
    cCopy.set(0); op(badgeX, 0); op(badgeY, 0); op(boyBottle, sC ? 1 : 0);
    if (sA) {
      [mum, dad, kav, boy].forEach(c => op(c, 1));
      const s = 0.8;
      tr(mum, 110, HY, s); tr(dad, 248, HY, s); tr(kav, 386, HY, s); tr(boy, 520, HY + 8, s);
      // Mum: the rope; calm, precise; deadpan at Dad
      let mm = 'neutral', ml = 1;
      if (who === 'dad') { mm = 'deadpan'; ml = 1; }
      else if (t >= at('stuck') && t < at('size')) { mm = t < at('other') ? 'smug' : 'neutral'; ml = 1; }
      else if (who === 'mum') { mm = t > mid('size', 0.8) ? 'smug' : 'neutral'; ml = 1; }
      mum.set({ t, talk: scTalk(S, t, 'mum'), mood: mm, look: ml, lift: t < at('dad') ? 1 : 0 });
      // Dad: smug before the mistake, then sad
      let dm = 'happy', dl = 1;
      if (t >= at('area') && t < at('stuck')) { dm = 'smug'; dl = who === 'mum' ? -1 : 1; }
      else if (t >= at('stuck') && t < mid('stuck', 0.3)) { dm = 'shock'; dl = 1; }
      else if (t >= at('stuck') && t < at('size')) { dm = 'sad'; dl = 1; }
      else if (t >= at('size')) { dm = 'deadpan'; dl = -1; }
      dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: dl, lift: who === 'dad' ? 1 : 0 });
      // Kavya
      let km = 'neutral', kl = 1;
      if (who === 'dad') { km = 'deadpan'; kl = -1; }
      else if (who === 'mum') { kl = -1; }
      else if (who === 'kavya') { km = 'happy'; kl = 1; }
      else if (t >= at('free') && t < at('other')) { km = 'happy'; }
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
      // Ah Boy
      let bm = 'happy', bl = 1;
      if (who === 'dad' || who === 'mum') bl = -1;
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: bm, look: bl, lift: t >= at('free') && t < at('other') ? 1 : 0 });
    }
    if (sB) {
      [mum, dad, kav, boy, tan].forEach(c => op(c, 1));
      const s = 0.74;
      tr(mum, 664, HY, s); tr(dad, 774, HY, s); tr(kav, 884, HY, s); tr(boy, 990, HY + 8, s);
      // Mr Tan jogs in from the right, bobbing
      const jin = P(t, cB, 0.7, easeOut);
      const bob = Math.abs(Math.sin(t * 9)) * 10 * AMP;
      tr(tan, lerp(1340, 1092, jin), HY - 6 - bob, s);
      const punDead = t >= mid('pun', 0.75);
      let tm = 'happy', tl = -1;
      if (who === 'kavya') { tm = 'smug'; tl = -1; }
      else if (who === 'boy') { tm = 'happy'; tl = -1; }
      tan.set({ t, talk: scTalk(S, t, 'tan'), mood: tm, look: tl, sweat: 0.25, lift: who === 'tan' ? 1 : 0, still: true });
      const lookAt = w => (w === 'tan' ? 1 : w === 'boy' ? 1 : -1);
      mum.set({ t, mood: punDead ? 'deadpan' : who === 'tan' && t < at('yx') ? 'happy' : 'neutral', look: who === 'tan' || who === 'boy' ? 1 : -1 });
      dad.set({ t, mood: punDead ? 'deadpan' : t >= at('boy') && t < at('pun') ? 'happy' : 'neutral', look: who === 'tan' || who === 'boy' ? 1 : -1 });
      let km = 'neutral', kl = lookAt(who);
      if (t < mid('tan', 0.2)) { km = 'shock'; kl = 1; }
      else if (who === 'kavya') { km = 'happy'; kl = -1; }
      else if (who === 'boy') { km = 'deadpan'; kl = 1; }
      else if (punDead) { km = 'deadpan'; kl = 1; }
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
      let bm = 'happy', bl = lookAt(who);
      if (who === 'boy') { bm = 'smug'; bl = -1; }
      else if (who === 'kavya') bl = -1;
      if (punDead && who !== 'boy') { bm = 'happy'; bl = 1; }
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: bm, look: bl, lift: who === 'boy' ? 1 : 0 });
    }
    if (sC) {
      // close two-shot: Ah Boy copies Mr Tan's pose, exactly
      op(tan, 1); op(boy, 1);
      const k = 1 + 0.05 * P(t, cC, end('copy') + 1.0 - cC, linear);
      const cx = 600, cy = 470;
      const pos = (x, y) => [cx + (x - cx) * k, cy + (y - cy) * k];
      const [tx, ty] = pos(390, 520), [bx, by] = pos(820, 528);
      tr(tan, tx, ty, 1.55 * k); tr(boy, bx, by, 1.55 * k);
      const lift = 1, lk = 0.35;
      tan.set({ t, mood: 'deadpan', look: lk, sweat: 0.25, lift, still: true });
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: t > end('copy') ? 'smug' : 'happy', look: lk, lift });
      const bp = P(t, cC + 0.2, 0.4, pop);
      op(badgeX, clamp(bp * 2.5)); tr(badgeX, pos(390, 300)[0] - 190, pos(390, 300)[1] - 30, Math.max(0.01, k * (0.6 + 0.4 * bp)));
      op(badgeY, clamp(bp * 2.5)); tr(badgeY, pos(820, 380)[0] + 180, pos(820, 380)[1] - 20, Math.max(0.01, k * (0.6 + 0.4 * bp)));
      cCopy.set(P(t, cC + 0.15, 0.4, linear)); tr(cCopy, 600, 170);
    }
  };
});
