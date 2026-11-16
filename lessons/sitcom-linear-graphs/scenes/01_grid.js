/* Scene 1: The park map (coordinates & midpoints).
   9 a.m., East Coast Park. The park map is a grid; the bike kiosk is the origin -> Dad: the picnic spot is at (2, 5)
   -> Ah Boy goes 5 across, 2 up: the toilets -> Ex (across, first) and Why (up or down, second) arrive and lie down as
   the axes -> (2, 5) vs (5, 2) -> along the corridor, then up the stairs -> negatives: the beach at (-3, -2) -> the four
   quadrants, anticlockwise; the beach is in the third -> Priya's drone flies from the beach A to the jetty B(5, 4) and
   stops halfway: 8 across / 6 up halved -> M(1, 1) -> the mean -> Ah Boy adds and forgets to halve: (2, 2), OFF THE
   LINE -> Dad at (-3, 4), the ice-cream cart halfway to Mum at (2, -1): the same step again puts Mum at (7, -6), with
   the check -> Mum: correct, and it is not 3 p.m. yet. */
scene('grid', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 3, color: o.color || C.ink, weight: 700 }); };
  const winP = (t, a, b, d) => (t >= a && t < b ? P(t, a, d || 0.3, linear) : 0);   // fade in at a, hard cut at b
  const GOLD = '#FFE45C', INK = MK.ink, GREEN = '#1E9E5A', RED = '#D32F2F', BLUE = '#1E5AAC', AMBER = '#C77A0A', BERRY = '#B8336A';
  const HALO = '#F7F1DC';

  /* layers */
  const Lset = G(root), Lcast = G(root), Lfront = G(root), Lboard = G(root), Lmap = G(root), Lfront2 = G(root), Lcard = G(root), Lhud = G(root);

  /* ================= the park ================= */
  const park = lgPark(Lset, { sky: 'day' });
  Lfront.appendChild(park.front);

  /* ================= the park map (a copy of lgMapBoard with 26 px axis labels) ================= */
  const U = 33, BX = 682, BY = 104;
  const board = G(Lboard);
  {
    const pad = 30, head = 64, W0 = 12 * U + pad * 2 + 30, H0 = 13 * U + pad * 2 + head + 20;
    E('rect', { x: 8, y: 10, width: W0, height: H0, rx: 16, fill: 'rgba(0,0,0,0.25)' }, board);
    E('rect', { x: 0, y: 0, width: W0, height: H0, rx: 16, fill: '#8B5A2B', stroke: '#5A3A1A', 'stroke-width': 5 }, board);
    E('rect', { x: 14, y: 14, width: W0 - 28, height: H0 - 28, rx: 10, fill: HALO }, board);
    E('rect', { x: 14, y: 14, width: W0 - 28, height: head - 6, rx: 10, fill: '#2F7A4A' }, board);
    T(board, W0 / 2, 56, 'EAST COAST PARK', { size: 32, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 2 });
    const axL = G(board); tr(axL, pad + 30, head + pad + 10);
    mkAxes(axL, { xmin: -4, xmax: 8, ymin: -7, ymax: 6, unit: U, ink: MK.ink, size: 26, labelStep: 2, halo: HALO });
  }
  tr(board, BX, BY);
  const mx = x => BX + 60 + (x + 4) * U, my = y => BY + 104 + (6 - y) * U;   // map coordinates -> stage
  // quadrant tints (under the icons)
  const quads = [[0, 8, 0, 6, '#FFE45C'], [-4, 0, 0, 6, '#7FD3FF'], [-4, 0, -7, 0, '#FF8FB0'], [0, 8, -7, 0, '#9BE29B']].map(([x0, x1, y0, y1, col]) =>
    E('rect', { x: mx(x0), y: my(y1), width: (x1 - x0) * U, height: (y1 - y0) * U, fill: col, opacity: 0.35 }, Lmap));
  const qLab = [['First', '(+, +)', 6.4, 4.9], ['Second', '(−, +)', -2, 4.6], ['Third', '(−, −)', -2, -4.6], ['Fourth', '(+, −)', 4.5, -4.6]].map(([a, b, x, y]) => {
    const g = G(Lmap);
    mkText(g, mx(x), my(y), `**${a}**`, { size: 28, anchor: 'middle', fill: INK, halo: HALO });
    mkText(g, mx(x), my(y) + 32, b, { size: 28, anchor: 'middle', fill: INK, halo: HALO });
    return g;
  });
  // the axis highlights (Ex's red x-axis, Why's blue y-axis)
  const xGlow = E('path', { d: `M${mx(-4) - 8},${my(0)} L${mx(8) + 18},${my(0)}`, stroke: '#E8424F', 'stroke-width': 14, 'stroke-linecap': 'round', opacity: 0.45 }, Lmap);
  const yGlow = E('path', { d: `M${mx(0)},${my(-7) + 8} L${mx(0)},${my(6) - 18}`, stroke: '#2E7DD8', 'stroke-width': 14, 'stroke-linecap': 'round', opacity: 0.45 }, Lmap);

  // map paths: drawn with mkDash / mkDraw
  const path = (pts, col, w, dash) => {
    const el = E('path', { d: 'M' + pts.map(([x, y]) => `${mx(x).toFixed(1)},${my(y).toFixed(1)}`).join(' L'), fill: 'none', stroke: col, 'stroke-width': w || 6, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, Lmap);
    if (dash) { el.setAttribute('stroke-dasharray', dash); return el; }
    return mkDash(el);
  };
  // dashed paths reveal with a clip-free trick: a solid path drawn over by its dashed twin is too heavy, so dashed paths fade in
  const pFound1 = path([[0, 0], [5, 0]], RED, 6), pFound2 = path([[5, 0], [5, 2]], RED, 6);
  const pOrder1 = path([[0, 0], [2, 0]], GREEN, 7), pOrder2 = path([[2, 0], [2, 5]], GREEN, 7);
  const pNeg1 = path([[0, 0], [-3, 0]], RED, 6), pNeg2 = path([[-3, 0], [-3, -2]], RED, 6);
  const segAB = path([[-3, -2], [5, 4]], '#5A6670', 4, '10 8');
  const st8 = path([[-3, -2], [5, -2]], '#7FB3E0', 6), st6 = path([[5, -2], [5, 4]], '#E89AA4', 6);
  const st4 = path([[-3, -2], [1, -2]], '#1E5AAC', 8), st3 = path([[1, -2], [1, 1]], '#C62828', 8);
  // Dad -> cart -> Mum: two equal steps
  const stepA = arrow(Lmap, mx(-3) + 14, my(4) + 14, mx(2) - 14, my(-1) - 14, { color: '#C77A0A', width: 6 });
  const stepB = arrow(Lmap, mx(2) + 14, my(-1) + 14, mx(7) - 14, my(-6) - 14, { color: '#C77A0A', width: 6 });
  const mlab = (x, y, s, o) => mkText(Lmap, x, y, s, Object.assign({ size: 28, fill: INK, halo: HALO, anchor: 'middle' }, o || {}));
  const lOrigin = mlab(mx(0) + 24, my(0) - 24, '**origin**', { anchor: 'start', fill: '#1FA38A' });
  const lPicnic = mlab(mx(2) + 24, my(5) + 2, '{{(2, 5)}}', { anchor: 'start', fill: GREEN });
  const lToilet = mlab(mx(5) + 24, my(2) + 10, '{{(5, 2)}}', { anchor: 'start', fill: RED });
  const lToilet2 = mlab(mx(5) + 24, my(2) + 42, 'toilets', { anchor: 'start', fill: RED, size: 26 });
  const l2 = mlab((mx(0) + mx(2)) / 2, my(0) - 14, '**2**', { fill: GREEN, size: 30 });
  const l5 = mlab(mx(2) + 12, my(2.5) + 10, '**5**', { fill: GREEN, size: 30, anchor: 'start' });
  const l3L = mlab((mx(0) + mx(-3)) / 2, my(0) - 14, '**3** left', { fill: RED, size: 28 });
  const l2D = mlab(mx(-3) - 14, my(-1) + 10, '**2**', { fill: RED, size: 30, anchor: 'end' });
  const lBeach = mlab(mx(-3), my(-2) + 50, '{{(−3, −2)}}', { fill: BERRY });
  const lA = mlab(mx(-3) - 26, my(-2) + 10, '**A**', { fill: INK, size: 32, anchor: 'end' });
  const lB = mlab(mx(5), my(4) - 28, '**B**{{(5, 4)}}', { fill: INK, size: 28 });
  const l8 = mlab(mx(3), my(-2) + 70, '**8** across', { fill: '#4A7FB0', size: 28 });
  const l6 = mlab(mx(5) + 14, my(1) + 10, '**6** up', { fill: '#C0606C', size: 28, anchor: 'start' });
  const l4 = mlab(mx(-1), my(-2) + 36, '**4** across', { fill: '#1E5AAC', size: 28 });
  const l3 = mlab(mx(1) + 12, my(0) - 10, '**3** up', { fill: '#C62828', size: 28, anchor: 'start' });
  const lM = mlab(mx(1) - 20, my(1) - 52, '**M**{{(1, 1)}}', { fill: '#0E7A4A', size: 30, anchor: 'end' });
  const lDad = mlab(mx(-3), my(4) - 28, '{{(−3, 4)}}', { fill: '#2D6B52' });
  const lCart = mlab(mx(2) + 24, my(-1) + 34, 'cart {{(2, −1)}}', { fill: BERRY, anchor: 'start' });
  const lMum = mlab(mx(7) - 26, my(-6) + 10, '{{(7, −6)}}', { fill: BERRY, anchor: 'end' });
  const lStepA = mlab((mx(-3) + mx(2)) / 2 - 18, (my(4) + my(-1)) / 2 + 8, '{{+5, −5}}', { fill: AMBER, anchor: 'end' });
  const lStepB = mlab((mx(2) + mx(7)) / 2 + 20, (my(-1) + my(-6)) / 2 + 2, '{{+5, −5}}', { fill: AMBER, anchor: 'start' });
  const qMum = G(Lmap); tr(qMum, mx(7), my(-6));
  E('circle', { r: 22, fill: '#FFFFFF', stroke: BERRY, 'stroke-width': 4, 'stroke-dasharray': '6 5' }, qMum);
  T(qMum, 0, 11, '?', { size: 32, weight: 800, anchor: 'middle', fill: BERRY });
  const ringO = E('circle', { cx: mx(0), cy: my(0), r: 24, fill: 'none', stroke: '#1FA38A', 'stroke-width': 5 }, Lmap);

  // icons (a copy of lgMapBoard's icon kinds; centred at the point, popped in with mkPopIn)
  function icon(kind, x, y, o) {
    o = o || {};
    const ic = G(Lmap); tr(ic, mx(x), my(y));
    const inner = G(ic);
    const disc = col => E('circle', { r: 17, fill: col, stroke: SC_INK, 'stroke-width': 3 }, inner);
    if (kind === 'kiosk') { disc('#1FA38A'); tr(lgBike(inner, 0.17), 0, 9, 0.17); }
    else if (kind === 'picnic') { disc('#FFE45C'); E('path', { d: 'M-10,-6 L10,-6 L12,8 L-12,8 Z', fill: '#E8424F', stroke: SC_INK, 'stroke-width': 2 }, inner); E('path', { d: 'M-4,-6 L-4,8 M4,-6 L4,8 M-11,1 L11,1', stroke: '#FFFFFF', 'stroke-width': 2 }, inner); }
    else if (kind === 'toilet') { disc('#2E7DD8'); T(inner, 0, 6, 'WC', { size: 16, weight: 800, anchor: 'middle', fill: '#FFFFFF' }); }
    else if (kind === 'beach') { disc('#F2DFAE'); E('path', { d: 'M-12,0 Q0,-16 12,0 Z', fill: '#E8424F', stroke: SC_INK, 'stroke-width': 2 }, inner); E('line', { x1: 0, y1: -2, x2: 0, y2: 12, stroke: SC_INK, 'stroke-width': 2.5 }, inner); }
    else if (kind === 'jetty') { disc('#3FA9D9'); E('path', { d: 'M-12,2 L12,2 M-8,2 L-8,10 M0,2 L0,10 M8,2 L8,10 M-6,-8 L6,-8 L4,-2 L-4,-2 Z', stroke: '#5A3A1A', 'stroke-width': 3, fill: '#9C6B3E' }, inner); }
    else if (kind === 'cart') { disc('#FFC2D6'); tr(lgIceCream(inner, 0.17), 0, 12, 0.17); }
    else if (kind === 'dad') { disc('#3D8B6E'); T(inner, 0, 7, 'D', { size: 20, weight: 800, anchor: 'middle', fill: '#FFFFFF' }); }
    else if (kind === 'mum') { disc('#B8336A'); T(inner, 0, 7, 'M', { size: 20, weight: 800, anchor: 'middle', fill: '#FFFFFF' }); }
    else { E('path', { d: 'M0,0 C-16,-18 -14,-34 0,-34 C14,-34 16,-18 0,0 Z', fill: o.col || LG.red, stroke: SC_INK, 'stroke-width': 3 }, inner); E('circle', { cx: 0, cy: -22, r: 5, fill: '#FFFFFF' }, inner); }
    ic.set = p => mkPopIn(ic, p);
    ic.set(0);
    return ic;
  }
  const iKiosk = icon('kiosk', 0, 0), iPicnic = icon('picnic', 2, 5), iToilet = icon('toilet', 5, 2), iBeach = icon('beach', -3, -2),
    iJetty = icon('jetty', 5, 4), iDad = icon('dad', -3, 4), iCart = icon('cart', 2, -1), iMum = icon('mum', 7, -6);
  const pinPic = icon('pin', 2, 5, { col: '#2FA36B' }), pinBoy = icon('pin', 0, 0, { col: '#F28C28' }), pin22 = icon('pin', 2, 2, { col: '#F28C28' });
  const drone = lgDrone(Lmap, { s: 0.32 });

  /* ================= the notes card (left) ================= */
  const card = G(Lcard);
  E('rect', { x: 42, y: 122, width: 610, height: 300, rx: 18, fill: 'rgba(0,0,0,0.22)' }, card);
  E('rect', { x: 36, y: 116, width: 610, height: 300, rx: 18, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, card);
  const CX = 341, R1 = 168, R2 = 262, R3 = 356;
  const note = (y, s, o) => mkText(card, CX, y, s, Object.assign({ size: 32, anchor: 'middle', fill: INK }, o || {}));
  const cChip = (s, col, o) => mkChip(card, s, Object.assign({ size: 30, col, fill: '#FFFFFF', textCol: INK }, o || {}));
  const N = {
    spot: cChip('picnic spot: {{(2, 5)}}', GREEN),
    found: note(R2 + 10, '**5** across, **2** up', { boldFill: '#E8751A', size: 36 }),
    found2: note(R3 + 4, '→ {{(5, 2)}}', { fill: '#E8751A', size: 34 }),
    ex: cChip('**x**: goes **across**, goes **first**', '#C8283A', { size: 30 }),
    why: cChip('**y**: goes **up** or **down**, goes **second**', '#1E5AAC', { size: 28 }),
    ord1: note(R1 + 10, '{{(2, 5)}}: **2** across, then **5** up', { boldFill: GREEN }),
    ord2: note(R2 + 10, '{{(5, 2)}}: somewhere else, the **toilets**', { size: 30, boldFill: RED }),
    ord3: mkMath(card, CX, R3 + 14, '(2, 5) != (5, 2)', { size: 46, anchor: 'middle', fill: INK }),
    st1: note(R1 + 4, '**Along the corridor,**', { boldFill: BLUE, size: 36 }),
    st2: note(R1 + 50, '**then up the stairs.**', { boldFill: RED, size: 36 }),
    stx: note(R3 + 28, '{{x}} first, then {{y}}', { size: 32 }),
    n1: note(R1 + 10, 'negative {{x}}: **left**', { boldFill: RED }),
    n2: note(R2 + 10, 'negative {{y}}: **down**', { boldFill: RED }),
    n3: cChip('the beach: {{(−3, −2)}}', BERRY, { size: 34 }),
    q1: note(R1 + 10, 'four **quadrants**', { boldFill: BLUE }),
    q2: note(R2 + 10, 'numbered **anticlockwise**,', { boldFill: BLUE }),
    q2b: note(R2 + 52, 'from the **top right**', { boldFill: BLUE, size: 30 }),
    q3: cChip('the beach: the **third** quadrant', BERRY, { size: 30 }),
    d1: note(R1 + 10, 'beach **A** → jetty **B**{{(5, 4)}}'),
    d2: cChip('it stops **halfway**', '#E8751A', { size: 32 }),
    h1: note(R1 + 10, 'A to B: **8** across, **6** up', { boldFill: '#4A7FB0' }),
    h2: note(R2 + 10, 'halfway: **4** across, **3** up', { boldFill: '#C62828' }),
    h3: cChip('midpoint {{M(1, 1)}}', '#0E7A4A', { size: 34 }),
    m1: note(R1 - 6, 'the **mean**: add, then ÷ **2**', { boldFill: '#0E7A4A', size: 30 }),
    b1: note(R1 - 6, 'Ah Boy: **just added**', { boldFill: '#E8751A', size: 30 }),
    c1: note(R1 + 10, 'Dad: {{(−3, 4)}}', { size: 32 }),
    c2: note(R2 + 10, 'cart, **halfway**: {{(2, −1)}}', { boldFill: BERRY }),
    c3: cChip('Mum = **?**', BERRY, { size: 34 }),
    s1: note(R1 - 2, 'Dad → cart: **5 right**, **5 down**', { boldFill: AMBER, size: 30 }),
    s2: note(R1 + 42, 'same step again: Mum {{(7, −6)}}', { size: 30 }),
  };
  // corridor-then-stairs doodle
  const doodle = G(card);
  E('path', { d: `M${CX - 150},${R2 + 46} L${CX + 30},${R2 + 46}`, stroke: BLUE, 'stroke-width': 8, 'stroke-linecap': 'round' }, doodle);
  E('path', { d: `M${CX + 30},${R2 + 46} l0,-22 l34,0 l0,-22 l34,0 l0,-22 l34,0`, fill: 'none', stroke: RED, 'stroke-width': 8, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, doodle);
  E('path', { d: `M${CX + 132},${R2 - 30} l0,-20 l-10,12 M${CX + 132},${R2 - 50} l10,12`, fill: 'none', stroke: RED, 'stroke-width': 5, 'stroke-linecap': 'round' }, doodle);
  E('path', { d: `M${CX + 14},${R2 + 34} l16,12 l-16,12`, fill: 'none', stroke: BLUE, 'stroke-width': 5, 'stroke-linecap': 'round' }, doodle);
  // the mean (stacked)
  const wMean = mkWorking(card, CX + 40, R1 + 30, ['(−3 + 5)/2 = 1', '(−2 + 4)/2 = 1'], { size: 34, fill: INK, ringCol: '#0E7A4A' });
  const wMeanTag = [mkText(card, 70, wMean.lineY[0] + 4, '{{x}}:', { size: 32, fill: '#C8283A' }), mkText(card, 70, wMean.lineY[1] + 4, '{{y}}:', { size: 32, fill: '#1E5AAC' })];
  const wMeanAns = mkMath(card, 560, (wMean.lineY[0] + wMean.lineY[1]) / 2 + 14, '(1, 1)', { size: 40, anchor: 'middle', fill: '#0E7A4A' });
  const ansBox = E('rect', { x: 560 - 62, y: (wMean.lineY[0] + wMean.lineY[1]) / 2 - 26, width: 124, height: 56, rx: 10, fill: 'none', stroke: '#0E7A4A', 'stroke-width': 4 }, card);
  // Ah Boy's version
  const wBoy = mkWorking(card, CX - 20, R1 + 44, ['−3 + 5 = 2', '−2 + 4 = 2'], { size: 38, fill: '#C25516' });
  const wBoyAns = mkMath(card, 540, (wBoy.lineY[0] + wBoy.lineY[1]) / 2 + 14, '(2, 2)', { size: 42, anchor: 'middle', fill: '#C25516' });
  const halve = mkChip(card, 'then **÷ 2**!', { size: 32, col: '#0E7A4A', fill: '#E3F6EA', textCol: INK });
  const stOff = lgStamp(card, false);
  // the check
  const wCheck = mkMath(card, CX - 20, R3 + 20, '((−3 + 7)/2, (4 + (−6))/2) = (2, −1)', { size: 34, anchor: 'middle', fill: INK });
  const ckTick = tick(card, 20, '#1E9E5A'); tr(ckTick, CX + wCheck.w / 2 + 6, R3 + 6);
  const notNow = mkChip(Lhud, '**NOT** 3 p.m. yet', { size: 32, col: '#FF8FC8' });

  /* ================= the cast ================= */
  const kav = cast(Lcast, 'kavya'), dad = cast(Lcast, 'dad'), boy = cast(Lcast, 'boy'), priya = cast(Lcast, 'priya'),
    mum = cast(Lcast, 'mum', { prop: 'phone' }), why = cast(Lcast, 'why'), ex = cast(Lfront2, 'ex');
  const lt = { ex: lgLowerThird(Lhud, 'ex'), why: lgLowerThird(Lhud, 'why'), priya: lgLowerThird(Lhud, 'priya'), mum: lgLowerThird(Lhud, 'mum') };
  const cNine = pill(Lhud, '9 a.m.', { size: 32, color: GOLD, stroke: GOLD });
  const phone = lgPhone(Lhud, { s: 0.32 });
  const cGrid = mkChip(Lhud, 'the park map is a **grid**', { size: 32, col: '#FFE45C' });
  const cOrigin = mkChip(Lhud, 'bike kiosk = the **origin** {{(0, 0)}}', { size: 30, col: '#7EE0C8' });

  const fade = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* timing */
  const tBoard = mid('nine', 0.3);

  return t => {
    const who = scWho(S, t);
    op(fade, 1 - P(t, at('nine') - 0.3, 0.3, linear));
    park.upd(t);
    for (const k in lt) lt[k].set(0);
    lt.ex.set(win(t, at('ex') + 0.1, at('why') - 0.05, 0.25));
    lt.why.set(win(t, at('why') + 0.1, at('why') + 3.2, 0.3));
    lt.priya.set(win(t, at('drone') + 0.25, at('drone') + 3.3, 0.3));
    lt.mum.set(win(t, at('mum') + 0.2, at('mum') + 3.2, 0.3));

    /* ---------- HUD: time and phone ---------- */
    popIn(cNine, t, at('nine') + 0.1, 622, 58);
    op(phone, P(t, at('nine') + 0.3, 0.3, linear)); tr(phone, 700, 58); phone.set(80);
    cGrid.set(winP(t, mid('nine', 0.12), tBoard + 0.9)); tr(cGrid, 341, 200);
    cOrigin.set(winP(t, mid('nine', 0.62), at('spot') - 0.05)); tr(cOrigin, 341, 268);

    /* ---------- the board ---------- */
    const bp = P(t, tBoard, 0.45, easeOut);
    op(board, bp > 0 ? 1 : 0); op(Lmap, bp > 0 ? 1 : 0); tr(board, BX + 520 * (1 - bp), BY);
    tr(Lmap, 520 * (1 - bp), 0);
    iKiosk.set(P(t, mid('nine', 0.62), 0.45, linear));
    op(ringO, t > mid('nine', 0.62) && t < at('spot') ? 0.4 + 0.6 * Math.abs(Math.sin(t * 4)) : 0);
    op(lOrigin, winP(t, mid('nine', 0.66), at('ex')));

    // spot / found / order
    iPicnic.set(t < at('drone') ? P(t, mid('spot', 0.45), 0.45, linear) : 0);
    pinPic.set(t >= at('order') && t < at('drone') ? P(t, mid('order', 0.2), 0.4, linear) : 0);
    op(lPicnic, winP(t, mid('spot', 0.5), at('drone')));
    // Ah Boy's pin: 5 across, then 2 up
    const hop1 = P(t, mid('found', 0.12), 0.55, ease), hop2 = P(t, mid('found', 0.5), 0.45, ease);
    const bxp = 5 * hop1, byp = 2 * hop2;
    pinBoy.set(t >= at('found') && t < at('ex') ? P(t, at('found'), 0.25, linear) : 0);
    tr(pinBoy, mx(bxp), my(byp) - 12 * Math.abs(Math.sin(hop1 * Math.PI * 5)) * AMP);
    const fShow = t >= at('found') && t < at('ex');
    mkDraw(pFound1, hop1); op(pFound1, fShow ? 1 : 0); mkDraw(pFound2, hop2); op(pFound2, fShow && hop2 > 0 ? 1 : 0);
    iToilet.set(t < at('drone') ? P(t, mid('found', 0.75), 0.45, linear) : 0);
    op(lToilet, winP(t, at('order') + 0.1, at('drone')) * (t < at('order') ? 0 : 1));
    op(lToilet2, winP(t, mid('order', 0.6), at('stairs')));
    const oShow = t >= at('order') && t < at('neg');
    mkDraw(pOrder1, P(t, mid('order', 0.08), 0.5, ease)); op(pOrder1, oShow ? 1 : 0);
    mkDraw(pOrder2, P(t, mid('order', 0.22), 0.6, ease)); op(pOrder2, oShow && t > mid('order', 0.22) ? 1 : 0);
    op(l2, oShow ? P(t, mid('order', 0.12), 0.25, linear) : 0); op(l5, oShow ? P(t, mid('order', 0.3), 0.25, linear) : 0);
    if (t >= at('stairs') && t < at('neg')) { const pulse = 0.65 + 0.35 * Math.sin(t * 6); op(pOrder1, pulse); op(pOrder2, pulse); }

    // the axes glow for Ex and Why
    op(xGlow, t >= at('ex') && t < at('order') ? P(t, mid('ex', 0.2), 0.3, linear) * (0.7 + 0.3 * Math.sin(t * 5)) : 0);
    op(yGlow, t >= at('why') && t < at('order') ? P(t, mid('why', 0.15), 0.3, linear) * (0.7 + 0.3 * Math.sin(t * 5)) : 0);

    // negatives: the beach
    const nShow = t >= at('neg') && t < at('quad');
    mkDraw(pNeg1, P(t, mid('neg', 0.1), 0.5, ease)); op(pNeg1, nShow ? 1 : 0);
    mkDraw(pNeg2, P(t, mid('neg', 0.4), 0.45, ease)); op(pNeg2, nShow && t > mid('neg', 0.4) ? 1 : 0);
    op(l3L, nShow ? P(t, mid('neg', 0.15), 0.25, linear) : 0); op(l2D, nShow ? P(t, mid('neg', 0.42), 0.25, linear) : 0);
    iBeach.set(t < at('cart') ? P(t, mid('neg', 0.62), 0.45, linear) : 0);
    op(lBeach, winP(t, mid('neg', 0.66), at('drone')));

    // quadrants
    quads.forEach((q, i) => {
      const a = mid('quad', 0.08 + i * 0.13);
      let v = t >= at('quad') && t < at('drone') ? P(t, a, 0.3, linear) * 0.35 : 0;
      if (i === 2 && t > mid('quad', 0.72) && t < at('drone')) v = 0.35 + 0.3 * Math.abs(Math.sin(t * 4));
      op(q, v);
    });
    qLab.forEach((g, i) => op(g, winP(t, mid('quad', 0.08 + i * 0.13) + 0.1, at('drone'))));

    // the drone: A -> B, stopping halfway
    iJetty.set(t < at('cart') ? P(t, mid('drone', 0.55), 0.45, linear) : 0);
    const dShow = t >= at('drone') && t < at('cart');
    op(lA, dShow ? P(t, mid('drone', 0.3), 0.3, linear) : 0); op(lB, dShow ? P(t, mid('drone', 0.6), 0.3, linear) : 0);
    op(segAB, dShow ? P(t, mid('drone', 0.65), 0.3, linear) : 0);
    const hShow = t >= at('half') && t < at('cart');
    mkDraw(st8, P(t, mid('half', 0.04), 0.5, ease)); op(st8, hShow ? 1 : 0);
    mkDraw(st6, P(t, mid('half', 0.16), 0.45, ease)); op(st6, hShow && t > mid('half', 0.16) ? 1 : 0);
    op(l8, hShow ? P(t, mid('half', 0.06), 0.25, linear) : 0); op(l6, hShow ? P(t, mid('half', 0.2), 0.25, linear) : 0);
    mkDraw(st4, P(t, mid('half', 0.42), 0.45, ease)); op(st4, hShow && t > mid('half', 0.42) ? 1 : 0);
    mkDraw(st3, P(t, mid('half', 0.55), 0.4, ease)); op(st3, hShow && t > mid('half', 0.55) ? 1 : 0);
    op(l4, hShow ? P(t, mid('half', 0.44), 0.25, linear) : 0); op(l3, hShow ? P(t, mid('half', 0.57), 0.25, linear) : 0);
    op(lM, hShow ? P(t, mid('half', 0.85), 0.3, linear) : 0);
    const fly = P(t, mid('half', 0.6), 1.2, ease);
    const dx = lerp(-3, 1, fly), dy = lerp(-2, 1, fly);
    op(drone, t >= mid('drone', 0.25) && t < at('cart') ? P(t, mid('drone', 0.25), 0.3, linear) : 0);
    tr(drone, mx(dx), my(dy) - 6 - 3 * Math.sin(t * 5) * AMP);
    drone.set(t, t > mid('drone', 0.8));
    // Ah Boy's (2, 2)
    pin22.set(t >= at('boy') && t < at('cart') ? P(t, mid('boy', 0.65), 0.4, linear) : 0);

    // Dad, the cart and Mum
    iDad.set(P(t, mid('cart', 0.1), 0.45, linear)); iCart.set(P(t, mid('cart', 0.4), 0.45, linear));
    op(lDad, P(t, mid('cart', 0.14), 0.3, linear) * (t >= at('cart') ? 1 : 0));
    op(lCart, P(t, mid('cart', 0.44), 0.3, linear) * (t >= at('cart') ? 1 : 0));
    op(qMum, t >= at('cart') && t < mid('step', 0.66) ? P(t, mid('cart', 0.82), 0.3, linear) * (0.75 + 0.25 * Math.sin(t * 6)) : 0);
    stepA.set(P(t, mid('step', 0.08), 0.6, ease)); op(stepA, t >= at('step') ? 1 : 0);
    stepB.set(P(t, mid('step', 0.45), 0.6, ease)); op(stepB, t >= at('step') ? 1 : 0);
    op(lStepA, t >= at('step') ? P(t, mid('step', 0.2), 0.3, linear) : 0); op(lStepB, t >= at('step') ? P(t, mid('step', 0.55), 0.3, linear) : 0);
    iMum.set(t >= at('step') ? P(t, mid('step', 0.62), 0.45, linear) : 0);
    op(lMum, t >= at('step') ? P(t, mid('step', 0.66), 0.3, linear) : 0);

    /* ---------- the notes card ---------- */
    const cp = P(t, at('spot') - 0.05, 0.3, easeOut);
    op(card, cp); tr(card, -30 * (1 - cp), 0);
    N.spot.set(winP(t, mid('spot', 0.45), at('order'))); tr(N.spot, CX, R1 + 2);
    op(N.found, winP(t, mid('found', 0.12), at('ex'))); op(N.found2, winP(t, mid('found', 0.75), at('ex')));
    N.ex.set(winP(t, mid('ex', 0.12), at('order'))); tr(N.ex, CX, R2);
    N.why.set(winP(t, mid('why', 0.15), at('order'))); tr(N.why, CX, R3);
    op(N.ord1, winP(t, at('order') + 0.1, at('stairs'))); op(N.ord2, winP(t, mid('order', 0.6), at('stairs'))); op(N.ord3, winP(t, mid('order', 0.85), at('stairs')));
    op(N.st1, winP(t, at('stairs') + 0.05, at('neg'))); op(N.st2, winP(t, mid('stairs', 0.35), at('neg')));
    const dp = t >= at('stairs') && t < at('neg') ? 1 : 0; op(doodle, dp * P(t, mid('stairs', 0.2), 0.3, linear));
    op(N.stx, winP(t, mid('stairs', 0.7), at('neg')));
    op(N.n1, winP(t, at('neg') + 0.05, at('quad'))); op(N.n2, winP(t, mid('neg', 0.3), at('quad')));
    N.n3.set(winP(t, mid('neg', 0.62), at('quad'))); tr(N.n3, CX, R3);
    op(N.q1, winP(t, at('quad') + 0.05, at('drone'))); op(N.q2, winP(t, mid('quad', 0.22), at('drone'))); op(N.q2b, winP(t, mid('quad', 0.3), at('drone')));
    N.q3.set(winP(t, mid('quad', 0.72), at('drone'))); tr(N.q3, CX, R3 + 24);
    op(N.d1, winP(t, mid('drone', 0.3), at('half'))); N.d2.set(winP(t, mid('drone', 0.8), at('half'))); tr(N.d2, CX, R2 + 4);
    op(N.h1, winP(t, at('half') + 0.05, at('mean'))); op(N.h2, winP(t, mid('half', 0.42), at('mean')));
    N.h3.set(winP(t, mid('half', 0.85), at('mean'))); tr(N.h3, CX, R3);
    // the mean
    const mShow = t >= at('mean') && t < at('boy');
    op(N.m1, winP(t, at('mean') + 0.05, at('boy')));
    op(wMean, mShow ? 1 : 0);
    wMean.show(0, mShow ? P(t, mid('mean', 0.1), 0.4, linear) : 0); wMean.show(1, mShow ? P(t, mid('mean', 0.55), 0.4, linear) : 0);
    op(wMeanTag[0], mShow ? P(t, mid('mean', 0.1), 0.4, linear) : 0); op(wMeanTag[1], mShow ? P(t, mid('mean', 0.55), 0.4, linear) : 0);
    op(wMeanAns, mShow ? P(t, mid('mean', 0.92), 0.3, linear) : 0); op(ansBox, mShow ? P(t, mid('mean', 0.95), 0.3, linear) : 0);
    // Ah Boy: just added
    const bShow = t >= at('boy') && t < at('cart');
    op(N.b1, bShow ? P(t, at('boy') + 0.05, 0.3, linear) : 0);
    op(wBoy, bShow ? 1 : 0);
    wBoy.show(0, bShow ? P(t, mid('boy', 0.15), 0.3, linear) : 0); wBoy.show(1, bShow ? P(t, mid('boy', 0.35), 0.3, linear) : 0);
    op(wBoyAns, bShow ? P(t, mid('boy', 0.6), 0.3, linear) : 0);
    halve.set(t >= at('halve') && t < at('cart') ? P(t, mid('halve', 0.55), 0.4, linear) : 0); tr(halve, 540, R3 + 22);
    stOff.set(t >= at('halve') && t < at('cart') ? P(t, mid('halve', 0.12), 0.35, linear) : 0); tr(stOff, 230, R3 + 18, 0.45);
    // the cart
    op(N.c1, winP(t, mid('cart', 0.12), at('step'))); op(N.c2, winP(t, mid('cart', 0.42), at('step')));
    N.c3.set(winP(t, mid('cart', 0.82), at('step'))); tr(N.c3, CX, R3);
    op(N.s1, t >= at('step') ? P(t, mid('step', 0.08), 0.3, linear) : 0); op(N.s2, t >= at('step') ? P(t, mid('step', 0.5), 0.3, linear) : 0);
    op(wCheck, t >= at('step') ? P(t, mid('step', 0.78), 0.35, linear) : 0);
    op(ckTick, t >= at('mum') ? P(t, at('mum') + 0.15, 0.3, linear) : 0);
    notNow.set(t >= at('mum') ? P(t, mid('mum', 0.45), 0.4, linear) : 0); tr(notNow, 470, 470);

    /* ---------- the cast ---------- */
    const HY = 586;
    // Dad: out while Priya flies her drone
    const dadOut = P(t, at('drone') - 0.3, 0.35, easeIn) * (1 - P(t, at('cart') - 0.35, 0.35, easeOut));
    op(dad, dadOut < 0.98 ? 1 : 0); tr(dad, 98, HY + 230 * dadOut, 0.8);
    let dm = 'happy', dl = 0.6;
    if (t < at('spot')) dm = 'happy';
    else if (t < at('found')) dm = 'smug';
    else if (t < at('ex')) { dm = t > mid('found', 0.6) ? 'deadpan' : 'smug'; dl = 0.3; }
    else if (t < at('drone')) { dm = 'neutral'; dl = who === 'kavya' ? 0.6 : 1; }
    else if (t < at('step')) { dm = 'smug'; dl = 1; }
    else if (t < at('mum')) { dm = 'happy'; dl = 0.6; }
    else { dm = 'deadpan'; dl = 1; }
    dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: dl, lift: (t > at('spot') && t < end('spot') + 0.3) || (t > at('cart') && t < end('cart')) ? 1 : 0 });
    // Priya replaces him
    const pr = P(t, at('drone') - 0.15, 0.4, pop) * (1 - P(t, at('cart') - 0.4, 0.3, easeIn));
    op(priya, pr > 0.01 ? 1 : 0); tr(priya, 98, lerp(820, HY, pr), 0.8);
    priya.set({ t, talk: scTalk(S, t, 'priya'), mood: t < at('half') ? 'smug' : t < at('boy') ? 'happy' : 'smug', look: who === 'priya' ? 0.8 : who === 'boy' ? 0.6 : 0.9, lift: t > at('drone') && t < end('half') ? 1 : 0 });
    // Ah Boy
    tr(boy, 214, HY + 6, 0.8);
    let bm = 'happy', bl = 0.8, blift = 0;
    if (t >= at('found') && t < at('ex')) { bm = 'happy'; blift = 1; }
    else if (t >= at('order') && t < at('stairs')) { bm = 'happy'; bl = 0.6; }
    else if (t >= at('boy') && t < at('halve')) { bm = 'happy'; blift = 1; }
    else if (t >= at('halve') && t < at('cart')) { bm = t < mid('halve', 0.4) ? 'shock' : 'sad'; bl = 1; }
    else if (t >= at('mum')) { bm = t > mid('mum', 0.5) ? 'sad' : 'happy'; bl = 1; }
    else bl = who === 'dad' ? -0.7 : 0.8;
    boy.set({ t, talk: scTalk(S, t, 'boy'), mood: bm, look: bl, lift: blift });
    // Kavya
    tr(kav, 334, HY, 0.8);
    let km = 'neutral', kl = 0.8;
    if (t < at('spot')) km = 'happy';
    else if (t >= at('found') && t < at('ex')) { km = 'deadpan'; kl = -0.4; }
    else if (who === 'kavya') { km = 'happy'; kl = 0.9; }
    else if (t >= at('boy') && t < at('cart')) { km = 'deadpan'; kl = -0.6; }
    else if (t >= at('drone') && t < at('half')) { km = 'neutral'; kl = -0.8; }
    else if (who === 'dad') kl = -0.8;
    else if (t >= at('mum')) { km = 'smug'; kl = 0.9; }
    kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
    // Why stands up, Ex lies down: the twins are the axes
    const twinsOut = P(t, at('cart') - 0.35, 0.35, easeIn);
    const wIn = P(t, at('why') - 0.2, 0.45, pop);
    op(why, wIn > 0.01 && twinsOut < 0.98 ? 1 : 0);
    tr(why, 474, lerp(820, 562, wIn) + 260 * twinsOut, 0.7);
    let wm = 'happy', wl = 0.4;
    if (t < mid('why', 0.55)) wm = 'happy';
    else if (t < at('order')) wm = 'sad';
    else if (who === 'why') wm = t >= at('halve') ? 'annoyed' : 'happy';
    else if (t >= at('boy') && t < at('halve')) { wm = 'shock'; wl = -0.8; }
    if (who === 'ex') wl = 0.9;
    why.set({ t, talk: scTalk(S, t, 'why'), mood: wm, look: wl, arms: who === 'why' && t > mid('why', 0.15) && t < mid('why', 0.55) ? 1 : t >= at('halve') && t < end('halve') ? 0.6 : 0 });
    const eIn = P(t, at('ex') - 0.15, 0.55, easeOut);
    op(ex, eIn > 0 && twinsOut < 0.98 ? 1 : 0);
    tr(ex, lerp(-220, 590, eIn), 614 + 220 * twinsOut, 0.62);
    let em = 'neutral', el = 0.4;
    if (who === 'ex') em = t >= at('mean') ? 'happy' : 'smug';
    else if (who === 'why') { em = 'smug'; el = -0.9; }
    else if (t >= at('boy') && t < at('cart')) { em = 'deadpan'; el = -0.9; }
    ex.set({ t, talk: scTalk(S, t, 'ex'), mood: em, look: el });
    // Mum, with her phone
    const mp = P(t, at('mum') - 0.3, 0.4, easeOut);
    op(mum, mp > 0.01 ? 1 : 0); tr(mum, 520, lerp(820, HY, mp), 0.8);
    mum.set({ t, talk: scTalk(S, t, 'mum'), mood: t > mid('mum', 0.4) ? 'deadpan' : 'neutral', look: t > mid('mum', 0.4) ? -1 : -0.3, lift: 1 });
  };
});
