/* Scene 1: Four jobs for one letter (the language of algebra).
   Shots (hard sitcom cuts):
   A  1 p.m. in the flat: Kavya, Dad (by the window, holding the fairy lights), Agent X on the table, Ah Boy with four
      sweet bags and three loose sweets; a paper strip top right for the humans' maths.
      one: clock, "1 p.m." -> window: the window outlined, s on its sides, P = 4s -> metres: s = 1.2 m, P = 4 × 1.2 = 4.8 m,
      the lights go up, "5 m of lights" -> sweets: the bags and 4x + 3 -> count: the scrap "23", 4x + 3 = 23 -> more: three
      more sweets drop into every bag, 4(x + 3) = 4x + 12 with handshake arrows -> dadid: 4(x + 2) = 4x + 2 ? ->
      (pause after counter) Dad deflates, his claim crossed out -> anatomy: 5x² − 3x + 7, three terms, the sign belongs
      to its term -> invisible: Ah Boy, hand up: a lone x, "coefficient?"
   B  Agent X's confessional with the case card: "Four jobs for one letter" (FORMULA, EXPRESSION, EQUATION, IDENTITY)
      filling row by row, his badge changing for each job (s, x = ?, x = 5, x = 1, x = 2) -> the counter-example page
      (x = 0: 8 and 2, 8 ≠ 2, COVER BLOWN) -> the anatomy page (coefficients, constant, power) -> 1x = x. */
scene('labels', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.4, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); };
  const fadeIn = (t, t0, d) => P(t, t0, d || 0.3, linear);
  const GOLD = '#FFE45C', RED = '#D32F2F', BLUE = '#2E6FD8', GREEN = '#1E9E5A', GREY = '#5A6670', INK = MK.ink;
  const chipC = (parent, text, o) => { o = o || {}; return mkChip(parent, text, { size: o.size || 30, col: o.col || GOLD }); };
  /* maths pieces laid out left to right on one baseline, centred on cx (or starting at cx with anchor 'start') */
  const row = (parent, cx, y, parts, o) => {
    o = o || {}; const s = o.size || 50, gap = o.gap !== undefined ? o.gap : s * 0.24;
    const ms = parts.map(p => (typeof p === 'string' ? { m: p } : p)).map(p => Object.assign({}, p, mkMeasure(p.m, { size: s })));
    const Wd = ms.reduce((a, p) => a + p.w, 0) + gap * (ms.length - 1);
    let x = o.anchor === 'start' ? cx : cx - Wd / 2; const out = [];
    ms.forEach(p => { const g = mkMath(parent, x, y, p.m, { size: s, fill: p.col || o.fill || INK }); out.push({ g, x0: x, w: p.w, cx: x + p.w / 2, a: p.a }); x += p.w + gap; });
    out.W = Wd; out.x0 = out[0].x0; out.x1 = x - gap; return out;
  };
  const paper = (parent, x, y, w, h, o) => { o = o || {}; return E('rect', { x, y, width: w, height: h, rx: 18, fill: o.fill || MK.paper, stroke: o.stroke || '#B8A27A', 'stroke-width': 5 }, parent); };
  const candy = (parent, col) => { const g = G(parent); E('rect', { x: -9, y: -6, width: 18, height: 12, rx: 5, fill: col, stroke: SC_INK, 'stroke-width': 2 }, g); return g; };

  /* layers */
  const Lbg = G(root), Lcast = G(root), Lfront = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= A: the living room ================= */
  const flatShot = G(Lbg);
  const flat = xpFlat(flatShot);
  Lfront.appendChild(flat.front); Lfront.appendChild(flat.top);
  const tray = xpTray(flat.top, { n: 18 }); tr(tray, 640, 530, 0.5); tray.set(17);
  // four sweet bags (the unknown x in each) and three loose sweets
  const BAGX = [890, 962, 1034, 1106];
  const bags = BAGX.map(x => { const b = xpSweetBag(flat.top, { label: 'x' }); tr(b, x, 530); return b; });
  const loose = ['#FF5F5F', '#56D69B', '#6EC8FF'].map((c, i) => { const k = candy(flat.top, c); tr(k, 805 + i * 24, 522, 1, i * 20 - 15); return k; });
  // three more sweets falling into every bag (more), then a "+3" over each
  const drops = [];
  BAGX.forEach((x, b) => ['#FF5F5F', '#FFE45C', '#56D69B'].forEach((c, j) => drops.push({ k: candy(flat.top, c), x: x - 14 + j * 14, b, j })));
  const plus3 = BAGX.map(x => { const c = T(flat.top, x, 420, '+3', { size: 28, weight: 800, anchor: 'middle', fill: GREEN }); c.setAttribute('stroke', '#FFFFFF'); c.setAttribute('stroke-width', 6); c.setAttribute('paint-order', 'stroke'); return c; });
  // the window outlined as a square with side s
  const winSq = E('path', { d: 'M150,150 L450,150 L450,420 L150,420 Z', fill: 'none', stroke: '#FFB020', 'stroke-width': 8, 'stroke-linejoin': 'round' }, flatShot);
  mkDash(winSq);
  const sLabs = [[300, 134], [124, 250], [476, 250]].map(([x, y]) => { const m = mkMath(flatShot, x, y, 's', { size: 44, fill: '#B8233A', anchor: 'middle', halo: '#FFFFFF' }); tr(m, 0, 14); return m; });
  const c5m = chipC(Lfg, '**5 m** of lights', { col: GOLD });
  const c1pm = chipC(Lfg, '**1 p.m.**', { col: GOLD, size: 32 });

  // the humans' strip (top right)
  const strip = G(Lfg);
  paper(strip, 590, 112, 570, 192);
  const SX = 875;
  // window: P = 4s
  const sWin = G(strip);
  mkMath(sWin, SX, 222, 'P = 4s', { size: 70, fill: INK, anchor: 'middle' });
  mkText(sWin, SX, 278, 'lights go **all the way round**', { size: 28, anchor: 'middle', fill: GREY, boldFill: BLUE });
  // metres: s = 1.2 m, P = 4 × 1.2 = 4.8 m
  const sMet = G(strip);
  const wMet = mkWorking(sMet, 745, 136, ['s = 1.2 "m"', 'P = 4 × 1.2 = 4.8 "m"'], { size: 46, fill: INK, gap: 26 });
  // sweets: 4x + 3
  const sSw = G(strip);
  const swR = row(sSw, SX - 20, 222, ['4x', '+', '3'], { size: 76, gap: 28 });
  const swL1 = mkText(sSw, swR[0].cx - 40, 280, '4 bags of {{x}}', { size: 28, anchor: 'middle', fill: BLUE });
  const swL2 = mkText(sSw, swR[2].cx + 30, 280, '3 loose', { size: 28, anchor: 'middle', fill: GREEN });
  // count: 4x + 3 = 23
  const sCnt = G(strip);
  mkMath(sCnt, SX, 236, '4x + 3 = 23', { size: 76, fill: INK, anchor: 'middle' });
  // more: 4(x + 3) = 4x + 12 with the handshakes
  const sMore = G(strip);
  const mR = row(sMore, SX, 262, ['4', '(x + 3)', '=', '4x + 12'], { size: 62, gap: 4 });
  const mX = mR[1].x0 + mkMeasure('(', { size: 62 }).w + mkMeasure('x', { size: 62 }).w / 2;
  const m3 = mR[1].x0 + mR[1].w - mkMeasure(')', { size: 62 }).w - mkMeasure('3', { size: 62 }).w / 2;
  tr(mR[2].g, 14, 0); tr(mR[3].g, 28, 0);
  const mArr = [mX, m3].map((x2, i) => arrow(sMore, mR[0].cx, 194, x2, 200, { color: BLUE, width: 4, bend: -(34 + i * 30) }));
  // dadid: 4(x + 2) = 4x + 2 ?
  const sDad = G(strip);
  const dR = row(sDad, SX - 20, 236, ['4(x + 2) = 4x + 2', { m: '?', col: RED }], { size: 66, gap: 16 });
  const dStrike = E('line', { x1: dR.x0 - 10, y1: 214, x2: dR[0].x0 + dR[0].w + 10, y2: 214, stroke: RED, 'stroke-width': 7, 'stroke-linecap': 'round' }, sDad);
  const dNo = mkText(sDad, SX, 286, '{{x = 0}}: {{8 != 2}}', { size: 30, anchor: 'middle', fill: RED });
  // anatomy: 5x² − 3x + 7, three terms
  const sAn = G(strip);
  const anGlow = E('rect', { x: 0, y: 150, width: 10, height: 76, rx: 14, fill: 'rgba(255,228,92,0.55)' }, sAn);
  const aR = row(sAn, SX, 214, ['5x^2', '−', '3x', '+', '7'], { size: 64, gap: 16 });
  attr(anGlow, 'x', aR[1].x0 - 10); attr(anGlow, 'width', aR[2].x0 + aR[2].w - aR[1].x0 + 20);
  const anTerms = [[aR[0].x0, aR[0].x0 + aR[0].w], [aR[1].x0, aR[2].x0 + aR[2].w], [aR[3].x0, aR[4].x0 + aR[4].w]]
    .map(([a, b]) => mkBrace(sAn, b, 234, a, 234, { text: 'term', col: BLUE, size: 26, depth: 16 }));
  // invisible: a lone x
  const sInv = G(strip);
  mkMath(sInv, 780, 268, 'x', { size: 130, fill: INK, anchor: 'middle' });
  mkText(sInv, 860, 200, 'coefficient', { size: 34, fill: GREY });
  mkText(sInv, 860, 252, 'of {{x}} = {{"?"}}', { size: 40, fill: RED, weight: 700 });
  const stripPages = [sWin, sMet, sSw, sCnt, sMore, sDad, sAn, sInv];

  /* ================= B: Agent X's confessional and the case card ================= */
  const conf = xpConf(Lbg, 'x');
  const board = G(Lfg);
  paper(board, 500, 108, 660, 556, { stroke: '#8FA3B8' });
  const BX = 830;
  const titles = ['Four jobs for one letter', '"Same thing"?', 'Anatomy of an expression', 'The invisible coefficient']
    .map(s => T(board, BX, 158, s, { size: 34, weight: 800, anchor: 'middle', fill: INK }));
  // page 1: the four jobs
  const pg1 = G(board);
  const JOBS = [
    ['FORMULA', BLUE, 'P = 4s', 'letters are real quantities, linked by a rule'],
    ['EXPRESSION', GREEN, '4x + 3', 'no equals sign: {{x}} can be any number'],
    ['EQUATION', '#E07A12', '4x + 3 = 23', 'true for **one** value of {{x}}'],
    ['IDENTITY', '#8E44AD', '4(x + 3) ≡ 4x + 12', 'true for **every** value of {{x}}'],
  ];
  const jobRows = JOBS.map(([tag, col, ex, note], i) => {
    const g = G(pg1), y0 = 180 + i * 86;
    E('rect', { x: 514, y: y0, width: 632, height: 82, rx: 12, fill: col, opacity: 0.09 }, g);
    E('rect', { x: 524, y: y0 + 8, width: 188, height: 40, rx: 10, fill: col }, g);
    T(g, 618, y0 + 37, tag, { size: 26, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 1 });
    if (ex.includes('≡')) row(g, 732, y0 + 43, ex.split(' ≡ ').reduce((a, p, k) => (k ? a.concat(['≡', p]) : [p]), []), { size: 40, anchor: 'start', gap: 14 });
    else mkMath(g, 732, y0 + 43, ex, { size: 40, fill: INK });
    mkText(g, 528, y0 + 75, note, { size: 26, fill: GREY, boldFill: col });
    return g;
  });
  const w1Form = mkText(pg1, BX, 604, '{{P}}: perimeter        {{s}}: side', { size: 32, anchor: 'middle', fill: BLUE });
  const w1Expr = mkText(pg1, BX, 604, '{{x = 1}}?   {{x = 7}}?   {{x = -3}}?   any number!', { size: 32, anchor: 'middle', fill: GREEN });
  const w1Eq = G(pg1);
  const eqM = mkMath(w1Eq, BX - 20, 606, '4 × 5 + 3 = 23', { size: 42, fill: '#E07A12', anchor: 'middle' });
  tr(tick(w1Eq, 16), BX - 20 + eqM.w / 2 + 34, 592);
  const w1Id = G(pg1);
  const idChecks = [[680, 'x = 1', '16 = 16'], [980, 'x = 2', '20 = 20']].map(([x, a, b]) => {
    const g = G(w1Id);
    const m = mkText(g, x, 574, `{{${a}}}:  {{${b}}}`, { size: 32, anchor: 'middle', fill: '#8E44AD' });
    tr(tick(g, 13), x + m.w / 2 + 26, 562);
    return g;
  });
  const stampOk = xpStamp(pg1, true);
  // page 2: the counter-example
  const pg2 = G(board);
  mkText(pg2, BX, 222, 'Dad: {{4(x + 2) = 4x + 2}} ?', { size: 36, anchor: 'middle', fill: GREY });
  mkText(pg2, BX, 280, 'undercover as {{x = 0}}', { size: 30, anchor: 'middle', fill: BLUE });
  const w2 = mkWorking(pg2, BX - 30, 310, [{ m: '4(0 + 2) = 8', note: 'left side' }, { m: '4 × 0 + 2 = 2', note: 'right side' }], { size: 44, fill: INK, gap: 24, noteSize: 26, noteCol: GREY });
  const w2No = mkMath(pg2, BX, 486, '8 != 2', { size: 64, fill: RED, anchor: 'middle' });
  const c2One = chipC(pg2, 'one **counter-example** is enough', { col: RED, size: 28 }); tr(c2One, BX, 540);
  const stampNo = xpStamp(pg2, false);
  // page 3: anatomy
  const pg3 = G(board);
  const AS = 84, aBig = row(pg3, BX, 350, ['5x^2', '−', '3x', '+', '7'], { size: AS, gap: 22 });
  const x5 = aBig[0].x0 + mkMeasure('5', { size: AS }).w / 2;
  const xm3 = (aBig[1].cx + aBig[2].x0 + mkMeasure('3', { size: AS }).w / 2) / 2;
  const x7 = aBig[4].cx, xPow = aBig[0].x0 + aBig[0].w - AS * 0.17;
  const an3 = [
    { lab: mkText(pg3, x5 - 10, 450, 'coefficient {{5}}', { size: 30, anchor: 'middle', fill: BLUE }), ar: arrow(pg3, x5, 418, x5, 368, { color: BLUE, width: 4 }) },
    { lab: mkText(pg3, xm3, 522, 'coefficient {{-3}}', { size: 30, anchor: 'middle', fill: BLUE }), ar: arrow(pg3, xm3, 488, xm3, 368, { color: BLUE, width: 4 }) },
    { lab: mkText(pg3, x7 + 10, 450, 'constant {{7}}', { size: 30, anchor: 'middle', fill: GREEN }), ar: arrow(pg3, x7, 418, x7, 368, { color: GREEN, width: 4 }) },
    { lab: mkText(pg3, xPow + 70, 226, 'power', { size: 30, anchor: 'start', fill: '#8E44AD' }), ar: arrow(pg3, xPow + 64, 218, xPow + 10, 270, { color: '#8E44AD', width: 4 }) },
  ];
  const c3 = mkText(pg3, BX, 610, 'a number with no letter is a **constant**', { size: 28, anchor: 'middle', fill: GREY, boldFill: GREEN });
  // page 4: 1x = x
  const pg4 = G(board);
  const oneR = row(pg4, BX, 410, [{ m: '1', col: '#B9C0C8' }, 'x', '=', 'x'], { size: 130, gap: 10 });
  tr(oneR[2].g, 34, 0); tr(oneR[3].g, 60, 0);
  const oneDash = E('rect', { x: oneR[0].x0 - 12, y: 410 - 112, width: oneR[0].w + 24, height: 128, rx: 14, fill: 'none', stroke: '#B9C0C8', 'stroke-width': 4, 'stroke-dasharray': '10 8' }, pg4);
  const c4 = mkText(pg4, BX, 540, 'the coefficient of {{x}} is {{1}}: we just don’t write it', { size: 30, anchor: 'middle', fill: GREY });
  const pages = [pg1, pg2, pg3, pg4];
  const cIdent = chipC(Lfg, '{{≡}} means **identically equal**', { col: '#C9A3FF', size: 30 });

  /* ================= the cast ================= */
  const kav = cast(Lcast, 'kavya');
  const dad = cast(Lcast, 'dad', { hand: true });
  const boy = cast(Lcast, 'boy');
  const ax = cast(Lcast, 'x');
  // Ah Boy's hand up (invisible): a raised arm, in front of his tee
  const boyArm = G(Lcast);
  E('path', { d: 'M-58,70 Q-86,0 -92,-96', fill: 'none', stroke: SC_INK, 'stroke-width': 30, 'stroke-linecap': 'round' }, boyArm);
  E('path', { d: 'M-58,70 Q-86,0 -92,-96', fill: 'none', stroke: '#F28C28', 'stroke-width': 22, 'stroke-linecap': 'round' }, boyArm);
  E('circle', { cx: -93, cy: -108, r: 17, fill: SC_SKIN.medium, stroke: SC_INK, 'stroke-width': 3.5 }, boyArm);
  // Dad's coil of fairy lights
  const coil = G(dad.hand);
  E('ellipse', { cx: 0, cy: -6, rx: 34, ry: 24, fill: 'none', stroke: '#2F6B3A', 'stroke-width': 4 }, coil);
  E('ellipse', { cx: 4, cy: -2, rx: 26, ry: 30, fill: 'none', stroke: '#2F6B3A', 'stroke-width': 4 }, coil);
  [[-30, -12, '#FFE45C'], [-10, -30, '#FF6B9A'], [16, -28, '#7FD3FF'], [32, -6, '#FFE45C'], [22, 22, '#56D69B'], [-18, 18, '#FF9A1F']].forEach(([x, y, c]) => E('circle', { cx: x, cy: y, r: 6, fill: c, stroke: SC_INK, 'stroke-width': 1.5 }, coil));
  // Ah Boy's scrap of paper: "23"
  const scrap = G(boy.hand);
  E('path', { d: 'M-34,-92 L36,-96 L40,-30 L-30,-26 Z', fill: '#FFFDF6', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, scrap);
  T(scrap, 3, -46, '23', { size: 40, weight: 800, anchor: 'middle', fill: '#2E6FD8' });
  // Agent X's badge values
  const BADGE = { s: 's', q: 'x = ?', five: 'x = 5', one: 'x = 1', two: 'x = 2', zero: 'x = 0' };
  const badge = {};
  for (const k in BADGE) { const m = mkMath(ax.badge, 0, 0, BADGE[k], { size: 34, fill: INK, anchor: 'middle' }); tr(m, 0, 2 + (m.a - m.d) / 2 - 6); badge[k] = m; }

  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* shots: B for Agent X's lines; A for everything else, and A again in the pause after the counter-example */
  const B_LINES = ['formula', 'expr', 'eq', 'ident', 'counter', 'coeff', 'one1'];
  const ORDER = S.ch.lines.map(l => l.id);
  const cutAt = id => at(id) - 0.06;
  const shotB = t => {
    let cur = ORDER[0];
    for (const id of ORDER) if (t >= cutAt(id)) cur = id;
    if (cur === 'counter' && t > end('counter') + 0.05) return false;
    return B_LINES.includes(cur);
  };
  const POS = { kav: 110, dad: 330, ax: 530, boy: 760 };
  const lookAt = (from, who) => { const x = POS[who]; return x === undefined ? 0 : clamp((x - POS[from]) / 260, -1, 1); };
  const SPK = { kavya: 'kav', dad: 'dad', boy: 'boy', x: 'ax' };

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const sB = shotB(t) ? 1 : 0, sA = 1 - sB;
    const who = scWho(S, t), spk = SPK[who] || '';

    /* ---------- A: the living room ---------- */
    op(flatShot, sA); op(flat.front, sA); op(flat.top, sA);
    op(strip, 0); stripPages.forEach(p => op(p, 0)); c5m.set(0); c1pm.set(0);
    op(kav, sA); op(dad, sA); op(boy, sA); op(boyArm, 0);
    if (sA) {
      const lightsP = P(t, mid('metres', 0.2), 1.6, linear);
      flat.upd(t, lightsP);
      flat.clock.set(1, Math.min(59, Math.floor(t / 5)));
      op(coil, 1 - lightsP);
      // the window: outline and the sides
      mkDraw(winSq, t < at('window') ? 0 : P(t, mid('window', 0.15), 1.4, linear));
      const sOn = t >= mid('window', 0.3) && t < end('metres') + 0.3;
      sLabs.forEach((m, i) => op(m, sOn ? fadeIn(t, mid('window', 0.3 + i * 0.08)) : 0));
      op(winSq, t < end('metres') + 0.3 ? 1 : 0);
      if (t < at('window')) { c1pm.set(P(t, at('one') + 0.3, 0.4, linear)); tr(c1pm, 910, 172); }
      // the strip
      let pg = -1;
      if (t >= mid('window', 0.25) && t < at('sweets')) pg = t < cutAt('metres') ? 0 : 1;
      else if (t >= at('sweets') && t < at('count') - 0.1) pg = 2;
      else if (t >= at('count') - 0.1 && t < at('more')) pg = 3;
      else if (t >= at('more') && t < at('dadid')) pg = 4;
      else if (t >= at('dadid') && t < at('anatomy')) pg = 5;
      else if (t >= at('anatomy') && t < at('invisible')) pg = 6;
      else if (t >= at('invisible')) pg = 7;
      if (pg >= 0) {
        op(strip, 1); op(stripPages[pg], 1);
        if (pg === 1) { wMet.show(0, P(t, mid('metres', 0.08), 0.35)); wMet.show(1, P(t, mid('metres', 0.3), 0.4)); c5m.set(P(t, mid('metres', 0.55), 0.4, linear)); tr(c5m, 300, 212); }
        if (pg === 2) { op(swR[0].g, fadeIn(t, mid('sweets', 0.35))); op(swL1, fadeIn(t, mid('sweets', 0.4))); op(swR[1].g, fadeIn(t, mid('sweets', 0.6))); op(swR[2].g, fadeIn(t, mid('sweets', 0.6))); op(swL2, fadeIn(t, mid('sweets', 0.64))); }
        if (pg === 4) { op(mR[0].g, 1); op(mR[1].g, 1); mArr.forEach((a, i) => a.set(P(t, mid('more', 0.48 + i * 0.12), 0.4, linear))); op(mR[2].g, fadeIn(t, mid('more', 0.62))); op(mR[3].g, fadeIn(t, mid('more', 0.66))); }
        if (pg === 5) { const no = t > end('counter'); op(dStrike, no ? 1 : 0); op(dNo, no ? 1 : 0); op(dR[1].g, no ? 0 : fadeIn(t, mid('dadid', 0.6))); }
        if (pg === 6) { op(anGlow, fadeIn(t, mid('anatomy', 0.7))); anTerms.forEach((b, i) => b.set(fadeIn(t, mid('anatomy', 0.36 + i * 0.1)))); }
      }
      // the bags: sweets, then three more into every bag
      const bagBounce = t >= at('sweets') && t < end('sweets');
      bags.forEach((b, i) => tr(b, BAGX[i], 530 - (bagBounce ? 10 * Math.max(0, Math.sin((t - at('sweets')) * 7 - i * 0.6)) : 0)));
      loose.forEach((k, i) => tr(k, 805 + i * 24, 522 - (t >= mid('sweets', 0.7) && t < end('sweets') ? 8 * Math.abs(Math.sin(t * 8 + i)) : 0), 1, i * 20 - 15));
      drops.forEach(({ k, x, b, j }) => {
        const t0 = mid('more', 0.08) + b * 0.18 + j * 0.1, p = P(t, t0, 0.45, easeIn);
        op(k, t >= t0 && p < 1 ? 1 : 0); tr(k, x, lerp(330, 470, p), 1, p * 180);
      });
      plus3.forEach((c, i) => op(c, t >= mid('more', 0.08) + i * 0.18 + 0.6 && t < end('ident') ? 1 : 0));
    }

    /* ---------- the humans (A only) ---------- */
    if (sA) {
      // Kavya
      let km = 'neutral', kl = lookAt('kav', 'dad');
      if (t >= at('sweets')) kl = lookAt('kav', 'boy');
      if (t >= at('metres') && t < at('sweets')) km = t > mid('metres', 0.75) ? 'deadpan' : 'neutral';
      if (t >= at('more')) { km = 'happy'; kl = 0.9; }
      if (t >= at('dadid')) { km = 'annoyed'; kl = lookAt('kav', 'dad'); }
      if (t > end('counter')) { km = 'smug'; kl = lookAt('kav', 'dad'); }
      if (t >= at('anatomy')) { km = 'neutral'; kl = 0.9; }
      if (t >= at('invisible')) { km = 'happy'; kl = lookAt('kav', 'boy'); }
      tr(kav, POS.kav, 436, 0.95);
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
      // Dad: holds the lights by the window
      let dm = 'happy', dl = 0.3, dlift = t < mid('metres', 0.2) ? 0.6 : 0;
      if (t >= at('metres')) dm = t > mid('metres', 0.7) ? 'smug' : 'happy';
      if (t >= at('sweets')) { dm = 'neutral'; dl = lookAt('dad', 'boy'); }
      if (t >= at('more')) dl = 1;
      if (t >= at('dadid')) { dm = 'smug'; dl = 0.4; }
      if (t > end('counter')) { dm = t > end('counter') + 0.25 ? 'sad' : 'shock'; dl = 0.6; }
      if (t >= at('anatomy')) { dm = 'sad'; dl = lookAt('dad', 'kav'); }
      if (t >= at('invisible')) { dm = 'neutral'; dl = lookAt('dad', 'boy'); }
      tr(dad, POS.dad, 432, 0.92);
      dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: dl, lift: dlift });
      // Ah Boy
      let bm = 'happy', bl = lookAt('boy', 'dad'), blift = 0;
      if (t >= at('sweets')) { bl = 0.7; blift = t < end('sweets') ? 0.6 : 0; }
      if (t >= at('count') - 0.1 && t < at('more')) { blift = 1; bl = -0.2; }
      if (t >= at('more')) { bm = 'shock'; bl = 0.9; if (t > mid('more', 0.5)) bm = 'happy'; }
      if (t >= at('dadid')) { bm = 'neutral'; bl = lookAt('boy', 'dad'); }
      if (t > end('counter')) bm = 'happy';
      if (t >= at('anatomy')) { bm = 'neutral'; bl = -0.6; }
      if (t >= at('invisible')) { bm = 'happy'; blift = 1; bl = 0.2; }
      tr(boy, POS.boy, 446, 1.0);
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: bm, look: bl, lift: blift });
      op(boyArm, t >= at('invisible') ? 1 : 0); tr(boyArm, POS.boy, 446 + 30 * (1 - P(t, at('invisible'), 0.3, easeOut)));
      op(scrap, t >= at('count') - 0.1 && t < at('more') ? 1 : 0);
    }

    /* ---------- Agent X ---------- */
    for (const k in badge) op(badge[k], 0);
    if (sA) {
      let xm = 'deadpan', xl = spk && spk !== 'ax' ? lookAt('ax', spk) : 0;
      if (t >= at('sweets') && t < at('dadid')) xm = 'smug';
      if (t > end('counter')) xm = 'smug';
      if (t >= at('invisible')) xm = 'deadpan';
      tr(ax, POS.ax, 440, 0.66);
      ax.set({ t, talk: 0, mood: xm, look: xl, arms: 0.55, shades: 1, badge: 0, brackets: 0 });
    }
    conf.set(sB, t); op(board, sB); pages.forEach(p => op(p, 0)); titles.forEach(p => op(p, 0)); cIdent.set(0);
    if (sB) {
      let page = 0;
      if (t >= cutAt('counter')) page = 1;
      if (t >= cutAt('coeff')) page = 2;
      if (t >= cutAt('one1')) page = 3;
      op(pages[page], 1); op(titles[page], 1);
      let xm = 'deadpan', shades = 1, arms = 0.55, bk = '', xl = 0.5;
      if (page === 0) {
        jobRows.forEach((r, i) => op(r, fadeIn(t, mid(['formula', 'expr', 'eq', 'ident'][i], 0.12))));
        op(w1Form, t < cutAt('expr') ? fadeIn(t, mid('formula', 0.55)) : 0);
        op(w1Expr, t >= cutAt('expr') && t < cutAt('eq') ? fadeIn(t, mid('expr', 0.5)) : 0);
        op(w1Eq, t >= cutAt('eq') && t < cutAt('ident') ? fadeIn(t, mid('eq', 0.5)) : 0);
        op(w1Id, t >= cutAt('ident') ? 1 : 0);
        idChecks.forEach((c, i) => op(c, fadeIn(t, mid('ident', 0.42 + i * 0.14))));
        stampOk.set(t >= cutAt('ident') ? P(t, mid('ident', 0.66), 0.35, linear) : 0); tr(stampOk, BX, 636, 0.42);
        if (t < cutAt('expr')) { bk = 's'; xm = t > mid('formula', 0.5) ? 'smug' : 'deadpan'; }
        else if (t < cutAt('eq')) { bk = 'q'; xm = 'happy'; arms = t > mid('expr', 0.55) ? 1 : 0.55; }
        else if (t < cutAt('ident')) { bk = t < mid('eq', 0.45) ? 'q' : 'five'; xm = t > mid('eq', 0.55) ? 'sad' : 'deadpan'; arms = 0.1; }
        else {
          bk = t < mid('ident', 0.42) ? 'q' : t < mid('ident', 0.56) ? 'one' : 'two';
          xm = t > mid('ident', 0.66) ? 'smug' : 'deadpan';
          cIdent.set(P(t, mid('ident', 0.2), 0.4, linear)); tr(cIdent, 250, 168);
        }
      } else if (page === 1) {
        bk = 'zero';
        w2.show(0, P(t, mid('counter', 0.15), 0.35)); w2.show(1, P(t, mid('counter', 0.27), 0.35));
        op(w2No, fadeIn(t, mid('counter', 0.4)));
        c2One.set(P(t, mid('counter', 0.5), 0.35, linear));
        const blownAt = mid('counter', 0.68);
        stampNo.set(P(t, blownAt, 0.35, linear)); tr(stampNo, BX, 614, 0.5);
        shades = 1 - P(t, blownAt - 0.4, 0.5, easeOut);
        xm = t > blownAt ? 'smug' : 'deadpan';
      } else if (page === 2) {
        an3.forEach((a, i) => { const p = fadeIn(t, mid('coeff', [0.1, 0.28, 0.46, 0.6][i])); op(a.lab, p); a.ar.set(p); });
        op(c3, fadeIn(t, mid('coeff', 0.5)));
        xm = 'deadpan';
      } else {
        const p1 = P(t, mid('one1', 0.1), 0.6, linear);
        op(oneR[0].g, p1); op(oneDash, p1);
        op(c4, fadeIn(t, mid('one1', 0.35)));
        // "Like me.": shades down for a moment, then back up
        shades = 1 - win(t, mid('one1', 0.55), mid('one1', 0.55) + 1.0, 0.25);
        xm = t > mid('one1', 0.55) ? 'smug' : 'deadpan';
      }
      if (bk) op(badge[bk], 1);
      const push = page === 3 ? 1 + 0.04 * P(t, at('one1'), 3, linear) : 1;
      tr(ax, 250, 430, 1.15 * push);
      ax.set({ t, talk: scTalk(S, t, 'x'), mood: xm, look: xl, arms, shades, badge: bk ? 1 : 0, brackets: 0 });
    }
  };
});
