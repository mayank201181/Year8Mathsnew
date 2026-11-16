/* Scene 7: Fifty degrees of separation (conversion graphs).
   A London souvenir shop, the family behind the counter. Mum: say £1 = $1.70, she is not multiplying all day ->
   Kavya's table £0 -> $0, £10 -> $17, £50 -> $85 -> the points drop onto the graph paper, a ruler draws the line,
   the third point is the check -> Monsieur Mètre on the counter: check the scale, one small square across is £5 ->
   Ah Boy's snow globe, £40: up to the line, across, $68 -> Mum: for snow, in June -> Dad's suit rental £350, off the
   graph -> £350 = 7 × £50, so 7 × $85 = $595 -> shorts are fine -> a straight line through the origin: direct
   proportion -> the gradient is the rate, $1.70 up for every £1 across (a steeper line is a bigger rate) -> Dad's
   phone: 10 °C is 50 °F, so 20 °C is "100 °F" -> Uncle Raj: F = 1.8C + 32 = 68 °F (the °C-°F line) -> Kavya: it misses
   the origin (0 °C = 32 °F), so not direct proportion. */
scene('graph', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const show = (el, t, t0, t1) => { const p = P(t, t0, 0.3, easeOut), q = t1 === undefined ? 1 : 1 - P(t, t1, 0.2, linear); op(el, Math.min(p, q)); tr(el, 0, 10 * (1 - p)); };
  const GOLD = '#FFE45C', INK = MK.ink, GREEN = '#1E9E5A', RED = '#C62828', BLUE = '#2E7DD8', BERRY = '#B8336A', MUTED = '#5A4A52', ORANGE = '#E8701E';
  const paper = (parent, x, y, w, h) => {
    E('rect', { x: x + 6, y: y + 6, width: w, height: h, rx: 16, fill: 'rgba(0,0,0,0.25)' }, parent);
    return E('rect', { x, y, width: w, height: h, rx: 16, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, parent);
  };
  const lookAt = (x, sx) => clamp((sx - x) / 260, -1, 1);
  const drawLine = (parent, d, col, w) => mkDash(E('path', { d, fill: 'none', stroke: col, 'stroke-width': w || 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, parent));
  // a snow globe with Big Ben inside, centred on its glass, radius r
  function gpGlobe(parent, r) {
    const g = G(parent);
    E('path', { d: `M${-r * 0.9},${r * 0.75} L${r * 0.9},${r * 0.75} L${r * 0.75},${r * 1.25} L${-r * 0.75},${r * 1.25} Z`, fill: '#8B5A2B', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
    E('circle', { r, fill: 'rgba(200,232,255,0.9)', stroke: '#5A6670', 'stroke-width': 3 }, g);
    E('path', { d: `M${-r * 0.1},${r * 0.75} V${-r * 0.3} L0,${-r * 0.5} L${r * 0.1},${-r * 0.3} V${r * 0.75} Z`, fill: '#8E8270' }, g);
    E('path', { d: `M${-r * 0.5},${-r * 0.3} h1 M${r * 0.4},${-r * 0.5} h1 M${r * 0.55},${r * 0.1} h1 M${-r * 0.6},${r * 0.25} h1 M${-r * 0.2},${-r * 0.7} h1`, stroke: '#FFFFFF', 'stroke-width': 6, 'stroke-linecap': 'round' }, g);
    E('ellipse', { cx: -r * 0.45, cy: -r * 0.45, rx: r * 0.18, ry: r * 0.1, fill: '#FFFFFF', opacity: 0.8 }, g);
    return g;
  }
  // Dad's orange dotted shorts (the running gag), centred
  function gpShorts(parent) {
    const g = G(parent);
    E('path', { d: 'M-50,-40 L50,-40 L58,28 L10,28 L0,-2 L-10,28 L-58,28 Z', fill: '#FF8A3D', stroke: SC_INK, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, g);
    [[-32, -20], [20, -24], [-14, 6], [36, 10], [-40, 14]].forEach(([x, y]) => E('circle', { cx: x, cy: y, r: 7, fill: '#FFE45C', stroke: '#C2453A', 'stroke-width': 2 }, g));
    return g;
  }
  // a wooden ruler, its top edge along (0,0) -> (len, 0)
  function gpRuler(parent, len) {
    const g = G(parent);
    E('rect', { x: 0, y: 0, width: len, height: 34, rx: 4, fill: 'rgba(255,214,90,0.92)', stroke: '#8B6B3A', 'stroke-width': 3 }, g);
    let d = ''; for (let x = 8; x < len - 4; x += 12) d += `M${x},0 v${(x - 8) % 60 === 0 ? 16 : 9} `;
    E('path', { d, stroke: '#5A3A10', 'stroke-width': 2 }, g);
    return g;
  }

  /* layers: shop, busts behind the counter, the counter, things on the counter, cards, HUD */
  const Lbg = G(root), Lcast = G(root), Lfront = G(root), Ltop = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= the souvenir shop ================= */
  const shop = lcShop(Lbg, { kind: 'souvenir' });
  const shopF = G(Lfront); shopF.appendChild(shop.front); shopF.appendChild(shop.top);
  // price tags, all in pounds (rate)
  const tags = [['£40', 640, 238, -8], ['£10', 810, 250, 6], ['£15', 980, 238, -4]].map(([s, x, y, a]) => {
    const pt = mkPriceTag(Lbg, s, { size: 34 }); tr(pt, x, y); pt.set(a); return pt;
  });
  const cRate = mkChip(Lfg, 'say **£1 = $1.70**', { size: 40, col: GOLD, solid: true });
  tr(cRate, 870, 400);
  const cMult = mkText(Lfg, 870, 490, '× 1.70, × 1.70, × 1.70 ...', { size: 32, anchor: 'middle', fill: '#FFFFFF', halo: '#5A1E1E' });

  /* ================= the left card: tables and working ================= */
  const card = G(Lfg), CX = 300;
  paper(card, 30, 108, 540, 214);
  // (table, plot) the table
  const kTab = G(card);
  const tab = mkTable(kTab, [['£', '0', '10', '50'], ['$', '0', '17', '85']], { colW: [100, 130, 130, 130], rowH: 60, size: 36, ink: INK, head: false, side: true, fill: '#FFFFFF', headFill: 'rgba(46,125,216,0.18)' });
  tr(tab, 55, 128);
  const tabCols = [1, 2, 3].map(j => [tab.cells[0][j], tab.cells[1][j]]);
  const tabArrows = [1, 2, 3].map(j => { const c = tab.cell(0, j); const a = arrow(tab, c.x + c.w / 2, 46, c.x + c.w / 2, 74, { color: BLUE, width: 3, head: 10 }); return a; });
  const tabNote = mkText(kTab, CX, 296, 'join with a **ruler** · 3rd point = **check**', { size: 28, anchor: 'middle', fill: MUTED, boldFill: GREEN });
  // (scale)
  const kScale = G(card);
  mkText(kScale, CX, 168, '**check the scale!**', { size: 40, anchor: 'middle', fill: BERRY });
  mkText(kScale, CX, 232, '1 small square **across** = **£5**', { size: 34, anchor: 'middle', fill: INK, boldFill: BLUE });
  mkText(kScale, CX, 288, '1 small square **up** = **$10**', { size: 30, anchor: 'middle', fill: MUTED, boldFill: INK });
  // (globe, snow)
  const kGlobe = G(card);
  const glo = gpGlobe(kGlobe, 46); tr(glo, 110, 196);
  mkText(kGlobe, 330, 172, 'Snow globe: **£40**', { size: 34, anchor: 'middle', fill: INK, boldFill: BLUE });
  const globeAns = mkText(kGlobe, 330, 236, 'up... across... **$68**', { size: 36, anchor: 'middle', fill: INK, boldFill: GREEN });
  const globeMath = mkMath(kGlobe, 330, 296, '40 × 1.7 = 68', { size: 30, anchor: 'middle', fill: MUTED, weight: 600 });
  // (suit) the leaflet
  const kSuit = G(card);
  const leaf = G(kSuit); tr(leaf, 150, 216, 1, -4);
  E('rect', { x: -90, y: -84, width: 180, height: 168, rx: 8, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, leaf);
  E('rect', { x: -90, y: -84, width: 180, height: 44, rx: 8, fill: '#1E2A44' }, leaf);
  T(leaf, 0, -52, 'SUIT RENTAL', { size: 26, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  E('path', { d: 'M-22,-32 L0,-10 L22,-32 L36,44 L-36,44 Z', fill: '#2E3440' }, leaf);
  E('path', { d: 'M-7,-26 L0,22 L7,-26 Z', fill: '#C62828' }, leaf);
  mkText(leaf, 0, 74, '**£350**', { size: 26, anchor: 'middle', fill: RED });
  mkText(kSuit, 400, 196, '**£350**', { size: 52, anchor: 'middle', fill: RED });
  const suitOff = mkText(kSuit, 400, 264, 'off the graph!', { size: 34, anchor: 'middle', fill: INK });
  // (scaleup, shorts)
  const kUp = G(card);
  mkText(kUp, CX, 158, 'scale **up** from a point you know', { size: 28, anchor: 'middle', fill: MUTED, boldFill: BLUE });
  const upW = mkWorking(kUp, 290, 186, ['£350 = 7 × £50', { m: '7 × $85 = $595', col: GREEN }], { size: 42, fill: INK, gap: 18 });
  // (prop)
  const kProp = G(card);
  mkText(kProp, CX, 180, 'a **straight line**', { size: 36, anchor: 'middle', fill: INK, boldFill: BLUE });
  mkText(kProp, CX, 232, '**through the origin**', { size: 36, anchor: 'middle', fill: INK, boldFill: BLUE });
  const propEq = mkText(kProp, CX, 292, '= **direct proportion**', { size: 38, anchor: 'middle', fill: INK, boldFill: GREEN });
  // (grad)
  const kGrad = G(card);
  mkText(kGrad, CX, 166, 'gradient = **rate**', { size: 38, anchor: 'middle', fill: INK, boldFill: BERRY });
  const gradM = mkMath(kGrad, CX, 230, '17 ÷ 10 = 1.7', { size: 40, anchor: 'middle', fill: INK, weight: 700 });
  const gradT = mkText(kGrad, CX, 292, '**$1.70** up for every **£1** across', { size: 30, anchor: 'middle', fill: INK, boldFill: GREEN });
  // (temp) Dad's maths
  const kTemp = G(card);
  mkMath(kTemp, CX, 172, '10 "°C" = 50 "°F"', { size: 40, anchor: 'middle', fill: INK, weight: 700 });
  T(kTemp, CX, 222, "Dad's maths:", { size: 28, weight: 700, anchor: 'middle', fill: MUTED });
  const tempW = mkMath(kTemp, CX - 14, 286, '20 "°C" = 2 × 50 = 100 "°F"', { size: 38, anchor: 'middle', fill: RED, weight: 700 });
  const tempQ = T(kTemp, CX - 14 + tempW.w / 2 + 10, 286, '?', { size: 42, weight: 800, fill: RED });
  // (formula)
  const kForm = G(card);
  const formW = mkWorking(kForm, 300, 128, ['F = 1.8C + 32', '1.8 × 20 + 32 = 36 + 32', { m: '= 68 "°F"', col: GREEN }], { size: 36, fill: INK, gap: 16 });
  // (origin)
  const kOrig = G(card);
  mkMath(kOrig, CX, 160, '0 "°C" = 32 "°F"', { size: 36, anchor: 'middle', fill: RED, weight: 700 });
  mkText(kOrig, CX, 210, 'straight, but **misses the origin**', { size: 30, anchor: 'middle', fill: INK, boldFill: RED });
  const origNot = mkText(kOrig, CX, 258, 'so **not** direct proportion', { size: 32, anchor: 'middle', fill: INK, boldFill: RED });
  const origDbl = mkMath(kOrig, CX, 306, '68 != 2 × 50', { size: 32, anchor: 'middle', fill: MUTED, weight: 700 });

  /* ================= the board: graph paper ================= */
  const board = G(Lfg), BX = 885;
  paper(board, 600, 108, 570, 574);
  const ttlPD = T(board, 930, 150, 'Conversion graph', { size: 30, weight: 800, anchor: 'middle', fill: BLUE });
  const ttlCF = T(board, 930, 150, 'Celsius → Fahrenheit', { size: 30, weight: 800, anchor: 'middle', fill: ORANGE });
  const OX = 700, OY = 190;
  // £ -> $ axes: £0-60 across (one small square = £5), $0-100 up (one small square = $10)
  const gPD = G(board); tr(gPD, OX, OY);
  const ax = mkAxes(gPD, { xmin: 0, xmax: 60, ymin: 0, ymax: 100, unit: 6.5, unitY: 3.4, grid: false, labelStep: 10, size: 26, ink: INK, xName: '£', yName: '$' });
  let gd = '';
  for (let x = 5; x <= 60; x += 5) gd += `M${ax.px(x)},0 V${ax.H} `;
  for (let y = 10; y <= 100; y += 10) gd += `M0,${ax.py(y)} H${ax.W} `;
  gPD.insertBefore(E('path', { d: gd, stroke: 'rgba(46,125,216,0.28)', 'stroke-width': 2 }), gPD.firstChild);
  const sqHi = E('rect', { x: ax.px(0), y: ax.py(10), width: ax.px(5) - ax.px(0), height: ax.py(0) - ax.py(10), fill: GOLD, stroke: BERRY, 'stroke-width': 3 }, gPD);
  gPD.insertBefore(sqHi, gPD.children[1]);
  const glow1 = E('path', { d: `M${ax.px(0)},${ax.py(0)} L${ax.px(100 / 1.7)},${ax.py(100)}`, stroke: GOLD, 'stroke-width': 18, 'stroke-linecap': 'round', opacity: 0 }, gPD);
  gPD.insertBefore(glow1, gPD.children[2]);
  const steep = ax.seg(0, 0, 40, 100, { col: BERRY, width: 4, dash: '10 8' });
  const steepL = mkText(gPD, ax.px(25), ax.py(92), 'a **bigger** rate', { size: 26, anchor: 'end', fill: BERRY, halo: MK.paper });
  const pdLine = ax.line(1.7, 0, { col: ORANGE, width: 6 });
  const pts = [[0, 0], [10, 17], [50, 85]].map(([x, y]) => ax.point(x, y, { col: BLUE, r: 9 }));
  const chkRing = E('circle', { cx: ax.px(10), cy: ax.py(17), r: 18, fill: 'none', stroke: GREEN, 'stroke-width': 4 }, gPD);
  const chkL = mkText(gPD, ax.px(10) + 24, ax.py(17) + 34, '**check** ✓', { size: 28, fill: GREEN, halo: MK.paper });
  const ruler = gpRuler(gPD, 300);
  const RANG = Math.atan2(ax.py(1.7) - ax.py(0), ax.px(1) - ax.px(0)) * 180 / Math.PI;
  // the snow globe path: up from £40 to the line, across to $68
  const gUp = drawLine(gPD, `M${ax.px(40)},${ax.py(0)} V${ax.py(68)}`, GREEN, 5);
  const gAcross = drawLine(gPD, `M${ax.px(40)},${ax.py(68)} H${ax.px(0)}`, GREEN, 5);
  gUp.setAttribute('stroke-dasharray', '1 1');
  const g40 = mkText(gPD, ax.px(40) + 10, ax.py(0) - 12, '**£40**', { size: 30, fill: GREEN, halo: MK.paper });
  const g68 = mkText(gPD, ax.px(0) + 12, ax.py(68) - 12, '**$68**', { size: 32, fill: GREEN, halo: MK.paper });
  const gDot = E('circle', { cx: ax.px(40), cy: ax.py(68), r: 9, fill: GREEN, stroke: '#FFFFFF', 'stroke-width': 3 }, gPD);
  // the staircase (grad): £10 across, $17 up
  const stair = G(gPD);
  E('path', { d: `M${ax.px(20)},${ax.py(34)} H${ax.px(30)} V${ax.py(51)}`, fill: 'none', stroke: BERRY, 'stroke-width': 5, 'stroke-linejoin': 'round' }, stair);
  mkText(stair, ax.px(25), ax.py(34) + 32, '**£10** across', { size: 26, anchor: 'middle', fill: BERRY, halo: MK.paper });
  mkText(stair, ax.px(30) + 10, ax.py(42.5) + 10, '**$17** up', { size: 26, fill: BERRY, halo: MK.paper });
  // ring on (50, 85) for scaling up
  const ring85 = E('circle', { cx: ax.px(50), cy: ax.py(85), r: 20, fill: 'none', stroke: GREEN, 'stroke-width': 4 }, gPD);
  const l85 = mkText(gPD, ax.px(50) - 22, ax.py(85) - 10, '**(50, 85)**', { size: 26, anchor: 'end', fill: GREEN, halo: MK.paper });
  // origin ring (prop)
  const oRing = E('circle', { cx: ax.px(0), cy: ax.py(0), r: 20, fill: 'none', stroke: GREEN, 'stroke-width': 5 }, gPD);
  // callouts under the axes
  const coScale = G(board);
  arrow(coScale, OX + 120, 628, OX + ax.px(2.5) + 6, OY + ax.H - 6, { color: BERRY, width: 4, head: 14 });
  mkText(coScale, OX + 130, 640, '1 square across = **£5**', { size: 28, fill: INK, boldFill: BERRY });
  const coSuit = G(board);
  const offArr = arrow(coSuit, 900, 600, 1150, 600, { color: RED, width: 6, head: 20 });
  mkText(coSuit, 1020, 648, '**£350** is way out here!', { size: 28, anchor: 'middle', fill: INK, boldFill: RED });
  const coOrig = G(board);
  arrow(coOrig, OX + 110, 628, OX + 14, OY + ax.H + 14, { color: GREEN, width: 4, head: 14 });
  mkText(coOrig, OX + 120, 640, 'through the **origin** (0, 0)', { size: 28, fill: INK, boldFill: GREEN });
  // the °C -> °F axes
  const gCF = G(board); tr(gCF, OX, OY);
  const cx = mkAxes(gCF, { xmin: 0, xmax: 30, ymin: 0, ymax: 100, unit: 13, unitY: 3.4, grid: false, labelStep: 10, size: 26, ink: INK, xName: '"°C"', yName: '"°F"' });
  let gd2 = '';
  for (let x = 5; x <= 30; x += 5) gd2 += `M${cx.px(x)},0 V${cx.H} `;
  for (let y = 10; y <= 100; y += 10) gd2 += `M0,${cx.py(y)} H${cx.W} `;
  gCF.insertBefore(E('path', { d: gd2, stroke: 'rgba(232,112,30,0.25)', 'stroke-width': 2 }), gCF.firstChild);
  const cfLine = cx.line(1.8, 32, { col: ORANGE, width: 6 });
  const cfP = [[0, 32, '(0, 32)'], [10, 50, '(10, 50)'], [20, 68, '(20, 68)']].map(([x, y, l]) => cx.point(x, y, { col: BLUE, r: 9, label: l, pos: 'se', size: 26, labelCol: INK, halo: MK.paper }));
  const r32 = E('circle', { cx: cx.px(0), cy: cx.py(32), r: 22, fill: 'none', stroke: RED, 'stroke-width': 5 }, gCF);
  const r00 = G(gCF); tr(r00, cx.px(0), cx.py(0));
  E('circle', { r: 20, fill: 'none', stroke: RED, 'stroke-width': 4, 'stroke-dasharray': '6 6' }, r00);
  const miss = G(board);
  arrow(miss, OX + 110, 628, OX + 16, OY + cx.H + 16, { color: RED, width: 4, head: 14 });
  mkText(miss, OX + 120, 640, 'misses the **origin**!', { size: 28, fill: INK, boldFill: RED });
  // Dad's phone (temp)
  const phone = lcPhone(board, { temp: '50°', unit: '°F', city: 'London' }); tr(phone, BX, 400, 0.78);

  /* ================= the cast (built once) ================= */
  const mum = cast(Lcast, 'mum', { prop: null, hand: true });
  const kav = cast(Lcast, 'kavya');
  const boy = cast(Lcast, 'boy');
  const dad = cast(Lcast, 'dad', { prop: 'paper', side: 'right' });
  const raj = cast(Lcast, 'raj');
  const sGlobe = gpGlobe(boy.hand, 36); tr(sGlobe, 0, -44);
  const Lmet = G(Ltop);
  const met = cast(Lmet, 'metre');
  const shorts = gpShorts(Ltop);

  /* positions */
  const Y = 452, SC = 0.72, XM = 84, XK = 192, XB = 300, XD = 408, XR = 516, MTX = 530, MTY = 560 - 186 * 0.5;
  const SPX = { mum: XM, kavya: XK, boy: XB, dad: XD, raj: XR, metre: MTX };

  return t => {
    const who = scWho(S, t);
    const sx = SPX[who] !== undefined ? SPX[who] : 885;

    /* ---------- rate: the shop and its price tags ---------- */
    tags.forEach((pt, i) => pt.set([-8, 6, -4][i] + 4 * Math.sin(t * 2 + i) * AMP));
    const rateOn = t < at('table') - 0.05;
    op(cRate, 0); op(cMult, 0);
    if (rateOn) { cRate.set(P(t, mid('rate', 0.3), 0.4, linear)); op(cMult, P(t, mid('rate', 0.75), 0.3, linear)); }

    /* ---------- the card ---------- */
    const cardOn = t >= at('table') - 0.1;
    op(card, P(t, at('table') - 0.1, 0.25, linear));
    const beat = (el, a, b) => show(el, t, a, b);
    beat(kTab, at('table') - 0.1, at('scale') - 0.1);
    tabCols.forEach((col, i) => { const p = P(t, mid('table', 0.33 + i * 0.22), 0.3, linear); col.forEach(c => op(c, p)); tabArrows[i].set(P(t, mid('table', 0.36 + i * 0.22), 0.3, linear)); });
    op(tabNote, P(t, at('plot') + 0.2, 0.3, linear));
    beat(kScale, at('scale'), at('globe') - 0.1);
    beat(kGlobe, at('globe'), at('suit') - 0.1);
    op(globeAns, P(t, mid('globe', 0.4), 0.3, linear)); op(globeMath, P(t, mid('globe', 0.85), 0.3, linear));
    beat(kSuit, at('suit'), at('scaleup') - 0.1);
    op(suitOff, P(t, mid('suit', 0.6), 0.3, linear));
    beat(kUp, at('scaleup'), at('prop') - 0.1);
    upW.show(0, P(t, mid('scaleup', 0.1), 0.3, linear)); upW.show(1, P(t, mid('scaleup', 0.5), 0.3, linear)); upW.ring(1, P(t, mid('scaleup', 0.85), 0.3, linear));
    beat(kProp, at('prop'), at('grad') - 0.1);
    op(propEq, P(t, mid('prop', 0.6), 0.3, linear));
    beat(kGrad, at('grad'), at('temp') - 0.1);
    op(gradM, P(t, mid('grad', 0.35), 0.3, linear)); op(gradT, P(t, mid('grad', 0.55), 0.3, linear));
    beat(kTemp, at('temp'), at('formula') - 0.1);
    op(tempW, P(t, mid('temp', 0.45), 0.3, linear)); op(tempQ, P(t, mid('temp', 0.8), 0.3, linear));
    beat(kForm, at('formula'), at('origin') - 0.1);
    formW.show(0, P(t, at('formula') + 0.2, 0.3, linear)); formW.show(1, P(t, mid('formula', 0.4), 0.3, linear)); formW.show(2, P(t, mid('formula', 0.68), 0.3, linear));
    formW.ring(2, P(t, mid('formula', 0.8), 0.3, linear));
    beat(kOrig, at('origin'), 1e9);
    op(origNot, P(t, mid('origin', 0.62), 0.3, linear)); op(origDbl, P(t, mid('origin', 0.9), 0.3, linear));

    /* ---------- the board ---------- */
    const boardP = P(t, at('table') - 0.1, 0.35, easeOut);
    op(board, cardOn ? 1 : 0); tr(board, 40 * (1 - boardP), 0);
    const pdOn = t < at('temp') - 0.05, cfOn = t >= at('formula') - 0.1, phOn = !pdOn && !cfOn;
    op(gPD, pdOn ? 1 : 0); op(ttlPD, pdOn ? 1 : 0); op(ttlCF, pdOn ? 0 : 1);
    op(gCF, cfOn ? P(t, at('formula') - 0.1, 0.3, linear) : 0); op(phone, phOn ? 1 : 0);
    if (phOn) { tr(phone, BX, 400, Math.max(0.01, 0.78 * (0.7 + 0.3 * P(t, at('temp') - 0.05, 0.4, pop)))); phone.set({ p: who === 'dad' && t < mid('temp', 0.4) ? 0.5 + 0.5 * Math.sin(t * 8) : 0 }); }
    if (pdOn) {
      // plot: the points drop, the ruler draws the line, the middle point is the check
      pts.forEach((pt, i) => pt.set(P(t, at('plot') + i * 0.25, 0.35, linear)));
      const lp = P(t, mid('plot', 0.3), dur('plot') * 0.7, ease);
      pdLine.set(lp);
      const rOn = t >= mid('plot', 0.2) && t < end('plot') + 0.4;
      op(ruler, rOn ? 1 - P(t, end('plot'), 0.3, linear) : 0);
      if (rOn) { const k = 100 / 1.7 * lp; ruler.setAttribute('transform', `translate(${(ax.px(k * 0.5) + 10).toFixed(1)} ${(ax.py(1.7 * k * 0.5) + 14).toFixed(1)}) rotate(${RANG.toFixed(2)}) translate(-150 0)`); }
      const ck = P(t, end('plot') - 0.4, 0.3, linear) * (1 - P(t, at('scale') + 0.1, 0.2, linear));
      op(chkRing, ck); op(chkL, ck);
      // scale
      const sc = win(t, at('scale') + 0.3, at('globe') - 0.05, 0.25);
      op(sqHi, sc * (0.7 + 0.3 * Math.sin(t * 6))); op(coScale, sc);
      // globe: up to the line, across to $68
      const gOn = t >= at('globe') && t < at('suit') - 0.05;
      op(g40, gOn ? P(t, mid('globe', 0.1), 0.25, linear) : 0);
      mkDraw(gUp, gOn ? P(t, mid('globe', 0.3), dur('globe') * 0.22, linear) : 0); op(gUp, gOn ? 1 : 0);
      mkDraw(gAcross, gOn ? P(t, mid('globe', 0.55), dur('globe') * 0.22, linear) : 0); op(gAcross, gOn ? 1 : 0);
      op(gDot, gOn ? P(t, mid('globe', 0.52), 0.2, linear) : 0);
      op(g68, gOn ? P(t, mid('globe', 0.8), 0.25, linear) : 0);
      // suit: way off the graph
      const so = win(t, mid('suit', 0.5), at('scaleup') - 0.05, 0.2);
      op(coSuit, so); offArr.set(P(t, mid('suit', 0.5), 0.5, ease));
      // scaleup: the point (50, 85)
      const r8 = win(t, at('scaleup') + 0.1, at('prop') - 0.05, 0.25);
      op(ring85, r8); op(l85, r8);
      // prop: the line glows through the origin
      const pg = win(t, at('prop') + 0.1, at('grad') + 0.4, 0.3);
      op(glow1, pg * 0.75); op(oRing, pg); op(coOrig, pg);
      // grad: the staircase and a steeper line
      op(stair, P(t, at('grad') + 0.2, 0.3, linear));
      steep.set(P(t, mid('grad', 0.7), 0.3, linear)); op(steepL, P(t, mid('grad', 0.7), 0.3, linear));
    }
    op(miss, 0);
    if (cfOn) {
      cfLine.set(P(t, at('formula') + 0.3, 1.2, ease));
      cfP.forEach((pt, i) => pt.set(P(t, [mid('formula', 0.15), mid('formula', 0.3), mid('formula', 0.7)][i], 0.35, linear)));
      op(r32, P(t, mid('origin', 0.15), 0.3, linear) * (0.75 + 0.25 * Math.sin(t * 6)));
      op(r00, P(t, mid('origin', 0.3), 0.3, linear)); op(miss, P(t, mid('origin', 0.3), 0.3, linear));
    }

    /* ---------- the family behind the counter ---------- */
    tr(mum, XM, Y, SC); tr(kav, XK, Y, SC); tr(boy, XB, Y, SC); tr(dad, XD, Y, SC);
    // Mum: brisk; annoyed at multiplying; deadpan for the snow globe; smug when Dad is wrong again
    let mm = 'neutral';
    if (who === 'mum') mm = t < at('table') ? (t > mid('rate', 0.6) ? 'annoyed' : 'neutral') : 'deadpan';
    else if (who === 'kavya' && t < at('scale')) mm = 'happy';
    else if (t >= at('snow') && t < at('suit')) mm = 'deadpan';
    else if (t >= at('shorts') && t < at('prop')) mm = 'deadpan';
    else if (t >= mid('formula', 0.6)) mm = 'smug';
    mum.set({ t, talk: scTalk(S, t, 'mum'), mood: mm, look: who === 'mum' ? (t >= at('snow') ? 0.9 : 1) : lookAt(XM, sx), lift: who === 'mum' && t < at('table') ? 1 : 0 });
    // Kavya: exasperated, then deadpan; smug when she is right
    let km = 'neutral';
    if (who === 'kavya') km = 'smug';
    else if (who === 'dad' && t >= at('temp')) km = t > mid('temp', 0.5) ? 'annoyed' : 'neutral';
    else if (t >= at('snow') && t < at('suit')) km = 'deadpan';
    else if (t >= at('shorts') && t < at('prop')) km = 'deadpan';
    else if (who === 'metre' || who === 'raj') km = 'happy';
    kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: who === 'kavya' ? 1 : lookAt(XK, sx) });
    // Ah Boy: holds up the snow globe
    const glOn = t >= at('globe') - 0.1 && t < at('suit');
    op(sGlobe, glOn ? 1 : 0);
    boy.set({ t, talk: scTalk(S, t, 'boy'), mood: who === 'mum' && t >= at('snow') ? 'sad' : 'happy', look: who === 'boy' ? 1 : lookAt(XB, sx), lift: glOn ? 1 : 0 });
    // Dad: the leaflet (suit), shorts, the phone (temp)
    let dm = 'neutral';
    if (who === 'dad') dm = t >= at('temp') ? 'smug' : t < at('scaleup') ? (t > mid('suit', 0.55) ? 'shock' : 'happy') : 'smug';
    else if (who === 'kavya' && t >= at('scaleup') && t < at('shorts')) dm = t > mid('scaleup', 0.6) ? 'shock' : 'neutral';
    else if (who === 'raj') dm = t > mid('formula', 0.7) ? 'sad' : 'neutral';
    else if (t >= at('origin')) dm = 'sad';
    dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: who === 'dad' ? (t >= at('shorts') && t < at('prop') ? 0 : 1) : lookAt(XD, sx), lift: t >= at('suit') - 0.1 && t < at('shorts') + 0.2 ? 1 : 0 });
    // the shorts: Dad holds them up on "shorts are fine"
    const shP = P(t, mid('shorts', 0.35), 0.45, pop) * (1 - P(t, at('prop') - 0.1, 0.2, linear));
    op(shorts, clamp(shP * 3)); tr(shorts, XD + 6, 540 - 20 * clamp(shP) + 3 * Math.sin(t * 5) * AMP, Math.max(0.01, 1.1 * shP), -6);
    // Monsieur Mètre on the counter (scale and grad)
    const metOn = t >= at('scale') - 0.15 && t < at('temp') - 0.1;
    op(Lmet, metOn ? 1 : 0);
    if (metOn) {
      const up = P(t, at('scale') - 0.15, 0.45, pop), off = P(t, end('grad') + 0.1, 0.3, easeIn);
      tr(met, MTX + 60 * off, MTY + 40 * (1 - clamp(up)) + 200 * off, Math.max(0.01, 0.5 * clamp(up, 0.2, 1.2)));
      met.set({ t, talk: scTalk(S, t, 'metre'), mood: who === 'metre' ? 'smug' : who === 'dad' ? (t > mid('suit', 0.55) ? 'shock' : 'annoyed') : who === 'boy' ? 'happy' : 'smug', look: who === 'metre' ? 1 : lookAt(MTX, sx), point: who === 'metre' ? 1 : 0 });
    }
    // Uncle Raj (temp onwards): rises in with his tea
    const rajOn = t >= mid('temp', 0.55);
    op(raj, rajOn ? 1 : 0);
    if (rajOn) {
      const up = P(t, mid('temp', 0.55), 0.45, easeOut);
      tr(raj, XR, lerp(Y + 260, Y, up), SC);
      raj.set({ t, talk: scTalk(S, t, 'raj'), mood: who === 'raj' ? (t > mid('formula', 0.85) ? 'sad' : 'happy') : who === 'kavya' ? 'happy' : 'neutral', look: who === 'raj' ? 1 : lookAt(XR, sx), lift: who === 'raj' && t < mid('formula', 0.3) ? 1 : 0 });
    }
  };

  function dur(id) { return end(id) - at(id); }
});
