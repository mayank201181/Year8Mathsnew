/* Scene 4: Dad's Pi-zza (area of a circle).
   Noon at DAD'S PI-ZZA: small (20 cm across) $12, large (30 cm across) $24 -> Priya: double the price, double the
   pizza -> Mr Tan: cut one into 8; Ah Boy lines the slices up, point up, point down: a wobbly rectangle -> half the
   crust on top (pi r), half below, height r -> 16 thinner slices: a rectangle pi r by r, A = pi r^2 -> "Apple Pies
   are too" -> Ah Boy: pi x 20^2 = 1257 -> Dee barges in ("twenty? That's me!") and the pizza balloons to four times
   the area -> Rad: D is for Double -> Kavya: r = 10, A = 100 pi = 314 cm^2, EASY AS PI -> Dad's calculator:
   (pi x 10)^2 = 987 -> only r is squared, HALF-BAKED -> large: r = 15, A = 225 pi = 707 cm^2, 2.25 times the pizza
   for twice the price -> double the radius, four times the area -> backwards: r = sqrt(A / pi) -> Dad: "I priced
   it." */
scene('pizza', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const view = (el, k, fx, fy, sx, sy) => el.setAttribute('transform', `translate(${sx.toFixed(1)} ${sy.toFixed(1)}) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 3, color: o.color || C.ink, weight: 700 }); };
  const stage = (el, t, a, b) => op(el, t >= a - 0.05 && t < b - 0.05 ? Math.min(P(t, a - 0.05, 0.15, linear), 1 - P(t, b - 0.2, 0.15, linear)) : 0);
  const show = (el, t, t0, d) => op(el, P(t, t0, d || 0.3, linear));
  const angLerp = (a, b, p) => { let d = ((b - a) % 360 + 540) % 360 - 180; return a + d * p; };
  const GOLD = '#FFE45C', INK = MK.ink, BLUE = '#2E7DD8', RED = '#D32F2F', GREEN = '#1E9E5A', ORANGE = '#E8751A', MUTED = '#5A4A52', BERRY = '#B8336A';
  // eq rows: [lhs, op, rhs] with the operators lined up on x
  const eqRows = (parent, x, y0, dy, rows, o) => rows.map(([l, m, r], i) => {
    const g = G(parent), y = y0 + i * dy, oo = Object.assign({ size: 38, fill: INK, weight: 600 }, o || {});
    if (l) mkMath(g, x - oo.size * 0.5, y, l, Object.assign({}, oo, { anchor: 'end' }));
    mkMath(g, x, y, m, Object.assign({}, oo, { anchor: 'middle' }));
    mkMath(g, x + oo.size * 0.5, y, r, oo);
    return g;
  });
  // one pizza slice: tip at (0,0), crust arc above (local "up"); g.edge outlines the cut edges
  const mkSlice = (parent, r, deg, seed) => {
    const g = G(parent), h = deg / 2 * Math.PI / 180, x = Math.sin(h) * r, y = -Math.cos(h) * r, k = 0.86;
    const sec = (rr) => `M0,0 L${(-Math.sin(h) * rr).toFixed(1)},${(-Math.cos(h) * rr).toFixed(1)} A${rr},${rr} 0 0 1 ${(Math.sin(h) * rr).toFixed(1)},${(-Math.cos(h) * rr).toFixed(1)} Z`;
    E('path', { d: sec(r), fill: CI_COL.crust }, g);
    E('path', { d: sec(r * k), fill: CI_COL.cheese }, g);
    const q = rng(seed);
    for (let i = 0; i < (deg > 30 ? 3 : 2); i++) {
      const d = r * (0.3 + 0.2 * i), a = (q() - 0.5) * h * 0.9;
      E('circle', { cx: (Math.sin(a) * d).toFixed(1), cy: (-Math.cos(a) * d).toFixed(1), r: Math.max(4, r * 0.075 * Math.min(1, deg / 40)), fill: i === 1 ? CI_COL.basil : CI_COL.sauce }, g);
    }
    E('path', { d: `M${(-x).toFixed(1)},${y.toFixed(1)} A${r},${r} 0 0 1 ${x.toFixed(1)},${y.toFixed(1)}`, fill: 'none', stroke: CI_COL.crustDk, 'stroke-width': 4 }, g);
    g.edge = E('path', { d: sec(r), fill: 'none', stroke: CI_COL.crustDk, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
    return g;
  };

  /* ---------- layers ---------- */
  const cam = G(root), Lhud = G(root);
  const stall = ciStall(cam, { title: "DAD'S PI-ZZA", col: '#C62828' });
  const Lboard = G(cam), Lfg = G(cam), Lover = G(cam);

  /* ---------- the cast ---------- */
  const tan = cast(stall.mid, 'tan');
  const dad = cast(stall.mid, 'dad', { prop: null, hand: true });
  const dCalc = scHandProp(dad.hand, 'calculator');
  const dCutter = G(dad.hand);
  E('path', { d: 'M-6,0 L-6,-60 L6,-60 L6,0 Z', fill: '#C62828', stroke: SC_INK, 'stroke-width': 3 }, dCutter);
  E('circle', { cx: 0, cy: -86, r: 26, fill: '#C9D3DC', stroke: SC_INK, 'stroke-width': 4 }, dCutter);
  E('circle', { cx: 0, cy: -86, r: 6, fill: '#5A6670' }, dCutter);
  const boy = cast(stall.mid, 'boy', { prop: null, hand: true });
  const bCalc = scHandProp(boy.hand, 'calculator');
  const kav = cast(Lfg, 'kavya');
  const pri = cast(Lfg, 'priya');
  const dee = cast(Lover, 'dee');
  const rad = cast(Lover, 'rad');
  const DS = 220 / 320;                               // Dee and Rad at the scale where Rad = 10 cm on the board pizza
  const along = (c, cx, cy, phi, L, s) => { const a = phi * Math.PI / 180; tr(c, cx + Math.cos(a) * L / 2, cy + Math.sin(a) * L / 2, s, phi + 90); };

  /* ---------- the board ---------- */
  const BX = 910;
  const board = G(Lboard);
  E('rect', { x: 656, y: 202, width: 520, height: 490, rx: 18, fill: 'rgba(0,0,0,0.22)' }, board);
  E('rect', { x: 650, y: 196, width: 520, height: 490, rx: 18, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, board);

  // P0 (noon, same, priced): the menu and the two pizzas, drawn to scale (5 px per cm)
  const p0 = G(board);
  const menu = mkHawkerMenu(p0, { title: "DAD'S PI-ZZA", items: [['Small, 20 cm across', '$12'], ['Large, 30 cm across', '$24']], w: 480, size: 30, col: '#C62828' });
  tr(menu, BX, 214);
  const PZ = [[790, 548, 50, '20 cm'], [1030, 548, 75, '30 cm']].map(([x, y, r, lab]) => {
    const g = G(p0); tr(g, x, y);
    ciPizza(g, r, { cuts: 0, seed: r });
    E('line', { x1: -r, y1: 0, x2: r, y2: 0, stroke: INK, 'stroke-width': 4, 'stroke-dasharray': '10 7' }, g);
    mkText(g, 0, r + 38, lab, { size: 28, anchor: 'middle', fill: INK });
    return g;
  });
  const cSame = mkChip(p0, '{{2 ×}} the price = {{2 ×}} the pizza?', { size: 28, col: BERRY, fill: '#FFE8F2' }); tr(cSame, BX, 440);
  const cDeal = mkChip(p0, 'Large: the **better deal**', { size: 30, col: GREEN, fill: '#E6F7EC' }); tr(cDeal, BX, 440);

  // P1, P2 (cut, wobbly, crust, formula): the pizza, cut and rearranged
  const p1 = G(board);
  const R = 110, PCX = BX, PCY = 400, YT = PCY - R / 2, YB = PCY + R / 2;
  const shade = E('circle', { cx: PCX, cy: PCY, r: R + 2, fill: 'rgba(255,228,92,0.55)', stroke: GOLD, 'stroke-width': 6 }, p1);
  const areaTxt = mkText(p1, BX, 590, '**area**: the space inside', { size: 34, anchor: 'middle', fill: INK, boldFill: ORANGE });
  const sl8 = G(p1), sl16 = G(p1);
  const W8 = 2 * R * Math.sin(Math.PI / 8), W16 = 2 * R * Math.sin(Math.PI / 16);
  const XS8 = BX - 1.75 * W8, XS16 = BX - 3.75 * W16;
  const S8 = [], S16 = [];
  for (let i = 0; i < 8; i++) S8.push(mkSlice(sl8, R, 45, 11 + i));
  for (let j = 0; j < 16; j++) S16.push(mkSlice(sl16, R, 22.5, 31 + j));
  const cutL = G(p1), cuts = [];
  for (let i = 0; i < 8; i++) { const a = i / 8 * TAU - Math.PI / 2; cuts.push(mkDash(E('line', { x1: PCX, y1: PCY, x2: (PCX + Math.cos(a) * R).toFixed(1), y2: (PCY + Math.sin(a) * R).toFixed(1), stroke: '#8A5A2E', 'stroke-width': 4 }, cutL))); }
  const pose8 = k => [XS8 + k * W8 / 2, k % 2 ? YB : YT, k % 2 ? 0 : 180];
  const pose16 = j => [XS16 + j * W16 / 2, j % 2 ? YB : YT, j % 2 ? 0 : 180];
  // the crust braces
  const brTop = mkBrace(p1, XS8, YT - 12, XS8 + 4 * W8, YT - 12, { text: 'half the crust: {{πr}}', col: BLUE, size: 30, depth: 20 });
  const brBot = mkBrace(p1, XS8 + 3.5 * W8, YB + 12, XS8 - W8 / 2, YB + 12, { text: '{{πr}}', col: BLUE, size: 32, depth: 20 });
  const brSide = mkBrace(p1, XS8 - W8 / 2 - 14, YB, XS8 - W8 / 2 - 14, YT, { text: '{{r}}', col: RED, size: 34, depth: 18 });
  // the clean rectangle
  const RW = Math.PI * R, rect = G(p1);
  E('rect', { x: BX - RW / 2, y: YT, width: RW, height: R, fill: CI_COL.cheese, stroke: CI_COL.crustDk, 'stroke-width': 4 }, rect);
  E('rect', { x: BX - RW / 2, y: YT, width: RW, height: 14, fill: CI_COL.crust }, rect);
  E('rect', { x: BX - RW / 2, y: YB - 14, width: RW, height: 14, fill: CI_COL.crust }, rect);
  E('rect', { x: BX - RW / 2, y: YT, width: RW, height: R, fill: 'none', stroke: CI_COL.crustDk, 'stroke-width': 4 }, rect);
  const rTop = mkBrace(p1, BX - RW / 2, YT - 12, BX + RW / 2, YT - 12, { text: '{{πr}}', col: BLUE, size: 34, depth: 20 });
  const rSide = mkBrace(p1, BX - RW / 2 - 14, YB, BX - RW / 2 - 14, YT, { text: '{{r}}', col: RED, size: 34, depth: 18 });
  const form = mkWorking(p1, 880, 540, ['A = πr × r', '= πr^2'], { size: 40, fill: INK });
  const formRing = E('rect', { x: 0, y: 0, width: 10, height: 10, rx: 8, fill: 'none', stroke: GREEN, 'stroke-width': 4 }, p1);
  { const ln = form.lines[1]; attr(formRing, 'x', ln.x1 - 12); attr(formRing, 'y', ln.y - ln.a - 8); attr(formRing, 'width', ln.x2 - ln.x1 + 24); attr(formRing, 'height', ln.a + ln.d + 16); }

  // P3 (apple): Apple Pies are too
  const p3 = G(board);
  const AX = [775, 915, 1065];
  [['**A**pple', 0], ['**P**ies', 1], ['**are too**', 2]].forEach(([w, i]) => mkText(p3, AX[i], 300, w, { size: 40, anchor: 'middle', fill: INK, boldFill: BERRY }));
  const apArr = AX.map(x => arrow(p3, x, 322, x, 386, { color: BERRY, width: 5 }));
  const apSym = [mkMath(p3, AX[0], 470, 'A', { size: 84, anchor: 'middle', fill: INK }), mkMath(p3, 845, 470, '=', { size: 84, anchor: 'middle', fill: INK }),
    mkMath(p3, AX[1], 470, 'π', { size: 84, anchor: 'middle', fill: INK }), mkMath(p3, AX[2], 470, 'r^2', { size: 84, anchor: 'middle', fill: INK })];
  const apBox = mkChip(p3, '{{A = πr^2}}', { size: 46, col: GREEN, fill: '#E6F7EC' }); tr(apBox, BX, 600);

  // P4, P5, P6 (boy2, dee, four, small): the 20 cm pizza
  const p4 = G(board);
  const pzW = G(p4), pz = G(pzW); ciPizza(pz, R, { cuts: 0, seed: 7 });
  const realC = E('circle', { r: R, fill: 'none', stroke: INK, 'stroke-width': 4, 'stroke-dasharray': '10 8' }, pzW);
  const diam = G(p4);
  E('line', { x1: BX - R, y1: 440, x2: BX + R, y2: 440, stroke: INK, 'stroke-width': 5, 'stroke-dasharray': '12 8' }, diam);
  mkMath(diam, BX, 424, '20 cm', { size: 32, anchor: 'middle', fill: INK, halo: '#FFFFFF' });
  const cBoy = mkChip(p4, '{{π × 20^2 ~= 1257}}', { size: 32, col: RED, fill: '#FFE4E4' });
  const cFourX = mkChip(p4, '{{× 4}} the area!', { size: 30, col: RED, fill: '#FFE4E4' });
  const cDouble = mkChip(p4, '**D is for Double**: cut him in half first', { size: 28, col: BLUE, fill: '#E4EEFF' });
  const cFour = mkChip(p4, '{{1257 ~= 4 × 314}}', { size: 30, col: RED, fill: '#FFE4E4' });
  const cR10 = mkChip(p4, '{{r = 10}} cm', { size: 30, col: ORANGE, fill: '#FFF1E0' });
  const small = eqRows(p4, 800, 528, 58, [['A', '=', 'π × 10^2'], ['', '=', '100π'], ['', '~=', '314 cm^2']], { size: 38 });

  // P7 (calc, only): Dad's calculator
  const p7 = G(board);
  const calc = mkCalculator(p7, { dispSize: 30 }); tr(calc, 785, 430, 0.85);
  const cl1 = mkMath(p7, 1052, 300, '(π × 10)^2', { size: 36, anchor: 'middle', fill: INK });
  const cl2 = mkMath(p7, 1052, 362, '~= 987', { size: 40, anchor: 'middle', fill: RED, weight: 700 });
  const on1 = mkMath(p7, 1052, 462, '(πr)^2', { size: 44, anchor: 'middle', fill: RED });
  const on2 = mkMath(p7, 1052, 520, '!=', { size: 44, anchor: 'middle', fill: INK });
  const on3 = mkMath(p7, 1052, 584, 'πr^2', { size: 44, anchor: 'middle', fill: GREEN, weight: 700 });
  const cSq = mkChip(p7, 'square **r** first, then {{× π}}', { size: 30, col: GREEN, fill: '#E6F7EC' }); tr(cSq, BX, 646);

  // P8 (large): 225 pi, 2.25 times the pizza
  const p8 = G(board);
  const lg = eqRows(p8, 790, 252, 50, [['r', '=', '15'], ['A', '=', 'π × 15^2'], ['', '=', '225π'], ['', '~=', '707 cm^2']], { size: 34 });
  const ratio = mkMath(p8, 1052, 302, '(225π)/(100π)', { size: 34, anchor: 'middle', fill: INK });
  const ratio2 = mkMath(p8, 1052, 404, '= 2.25', { size: 38, anchor: 'middle', fill: GREEN, weight: 700 });
  const vis = G(p8);
  const lgP = G(vis); tr(lgP, 730, 560); ciPizza(lgP, 60, { cuts: 0, seed: 15 });
  mkMath(vis, 815, 572, '=', { size: 38, anchor: 'middle', fill: INK });
  const sm1 = G(vis); tr(sm1, 870, 560); ciPizza(sm1, 40, { cuts: 0, seed: 10 });
  mkMath(vis, 930, 572, '+', { size: 38, anchor: 'middle', fill: INK });
  const sm2 = G(vis); tr(sm2, 990, 560); ciPizza(sm2, 40, { cuts: 0, seed: 12 });
  mkMath(vis, 1050, 572, '+', { size: 38, anchor: 'middle', fill: INK });
  const qt = G(vis); tr(qt, 1080, 580); tr(ciSlice(qt, 40, 90, { seed: 4 }), 0, 0, 1, 45);
  T(vis, 1100, 620, '¼', { size: 28, weight: 800, anchor: 'middle', fill: INK });
  const deal = mkText(p8, BX, 668, '**2.25 ×** the pizza, **2 ×** the price', { size: 30, anchor: 'middle', fill: INK, boldFill: GREEN });

  // P9 (double): double the radius, four times the area
  const p9 = G(board);
  const dbl = G(p9);
  const sq = (parent, x, y, s, lab) => { const g = G(parent); E('rect', { x, y, width: s, height: s, fill: 'rgba(255,194,71,0.55)', stroke: ORANGE, 'stroke-width': 3 }, g); mkMath(g, x + s / 2, y + s / 2 + 10, lab, { size: 28, anchor: 'middle', fill: INK }); return g; };
  E('circle', { cx: 770, cy: 380, r: 55, fill: 'rgba(76,201,240,0.18)', stroke: BLUE, 'stroke-width': 5 }, dbl);
  sq(dbl, 715, 325, 55, 'r^2');
  E('line', { x1: 770, y1: 380, x2: 825, y2: 380, stroke: RED, 'stroke-width': 5 }, dbl);
  mkMath(dbl, 797, 412, 'r', { size: 30, anchor: 'middle', fill: RED });
  const big = G(p9);
  E('circle', { cx: 1015, cy: 345, r: 110, fill: 'rgba(76,201,240,0.18)', stroke: BLUE, 'stroke-width': 5 }, big);
  [[905, 235], [960, 235], [905, 290], [960, 290]].forEach(([x, y]) => sq(big, x, y, 55, 'r^2'));
  E('line', { x1: 1015, y1: 345, x2: 1125, y2: 345, stroke: RED, 'stroke-width': 5 }, big);
  mkMath(big, 1070, 380, '2r', { size: 30, anchor: 'middle', fill: RED });
  const dArr = arrow(p9, 840, 300, 890, 300, { color: BERRY, width: 5, bend: -20 });
  const dEq = mkMath(p9, BX, 548, 'π(2r)^2 = 4πr^2', { size: 52, anchor: 'middle', fill: INK, weight: 700 });
  const dNote = mkText(p9, BX, 640, 'double {{r}} → {{× 4}} the area', { size: 32, anchor: 'middle', fill: BERRY });

  // P10 (back): r = sqrt(A / pi)
  const p10 = G(board);
  const bp = G(p10); tr(bp, 760, 300); ciPizza(bp, 66, { cuts: 0, toppings: false });
  mkMath(bp, 0, 10, '450 cm^2', { size: 28, anchor: 'middle', fill: INK, halo: CI_COL.cheese });
  mkText(p10, 1010, 288, '**Backwards**:', { size: 34, anchor: 'middle', fill: INK, boldFill: BERRY });
  mkText(p10, 1010, 334, 'area → radius', { size: 30, anchor: 'middle', fill: MUTED });
  const back = eqRows(p10, 830, 450, 76, [['r', '=', 'sqrt(A ÷ π)'], ['r', '=', 'sqrt(450 ÷ π)'], ['', '~=', '12 cm']], { size: 40 });
  const backD = mkText(p10, BX, 660, 'so {{d ~= 24 cm}} across', { size: 34, anchor: 'middle', fill: INK });

  /* ---------- chips, stamps ---------- */
  const cNoon = pill(Lhud, 'Noon', { size: 34, color: GOLD, stroke: GOLD });
  const stEasy = ciStamp(Lover, true), stHalf = ciStamp(Lover, false);

  /* ---------- timing ---------- */
  const easyBeat = mid('small', 0.88), halfBeat = mid('only', 0.8);
  const flyT = i => mid('cut', 0.6) + i * 0.13;
  const TY = 435, FY = 632;

  return t => {
    stall.upd(t);
    const who = scWho(S, t);

    /* ---------- camera: a slow push on the final deadpan ---------- */
    { const k = 1 + 0.05 * P(t, end('priced'), 0.9, ease); view(cam, k, 560, 430, 560, 430); }

    /* ---------- humans ---------- */
    // Dad (T2)
    tr(dad, 300, TY, 0.95);
    let dm = 'happy', dl = -0.4, dlift = 0;
    if (who === 'priya') { dm = 'smug'; dl = 0.6; }
    if (t >= at('cut') && t < at('wobbly')) { dm = 'neutral'; dl = 0.9; dlift = t > mid('cut', 0.15) && t < mid('cut', 0.6) ? 1 : 0; }
    if (t >= at('wobbly') && t < at('boy2')) { dm = 'happy'; dl = who === 'boy' ? 0.8 : who === 'tan' ? -0.8 : 0.9; }
    if (t >= at('boy2') && t < at('dee')) { dm = 'neutral'; dl = 0.8; }
    if (t >= at('dee') && t < at('small')) { dm = 'shock'; dl = 0.9; }
    if (t >= at('small') && t < at('calc')) { dm = 'neutral'; dl = -0.6; }
    if (t >= at('calc') && t < at('only')) { dm = 'smug'; dl = -0.3; dlift = 1; }
    if (t >= at('only')) { dm = t > halfBeat ? 'sad' : 'neutral'; dl = -0.8; }
    if (t >= at('large')) { dm = 'sad'; dl = -0.6; }
    if (t >= at('double')) { dm = 'neutral'; dl = 0.9; }
    if (t >= at('back')) { dm = 'neutral'; dl = -0.8; }
    if (t >= at('priced')) { dm = 'smug'; dl = 0; }
    dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: dl, lift: dlift });
    const cutting = t >= at('cut') && t < at('wobbly');
    op(dCutter, cutting ? 1 : 0);
    op(dCalc, cutting || (t >= at('boy2') && t < at('dee')) ? 0 : 1);
    // Ah Boy (T3)
    tr(boy, 480, 452, 0.95);
    let bm = 'happy', bl = -0.6, blift = 0;
    if (who === 'boy') { bl = 0.6; blift = 1; }
    if (who === 'tan') bl = -0.9;
    if (who === 'kavya') bl = -0.7;
    if (who === 'dee' || who === 'rad') bl = 0.9;
    if (t >= at('calc') && t < at('large')) { bm = 'neutral'; bl = -0.6; }
    if (t >= at('priced')) { bm = t > end('priced') ? 'deadpan' : 'neutral'; bl = -0.7; }
    boy.set({ t, talk: scTalk(S, t, 'boy'), mood: bm, look: bl, lift: blift });
    op(bCalc, t >= at('boy2') && t < at('dee') ? 1 : 0);
    // Mr Tan (T1), visiting from "cut"
    const tanUp = P(t, at('cut') - 0.35, 0.35, pop);
    op(tan, t >= at('cut') - 0.35 ? 1 : 0);
    tr(tan, 120, lerp(660, TY, tanUp), 0.95);
    let tm = 'happy', tl = 0.8, tlift = 0;
    if (who === 'boy' || who === 'dad') tl = 0.7;
    if (t >= at('dee') && t < at('small')) { tm = 'deadpan'; tl = 0.9; }
    if (t >= at('small')) { tm = 'happy'; tl = -0.2; tlift = t > easyBeat - 0.6 && t < easyBeat + 0.5 ? 1 : 0; }
    if (t >= at('calc')) { tm = 'deadpan'; tl = 0.6; }
    if (t >= at('only')) { tm = 'deadpan'; tl = 0.6; tlift = t > halfBeat - 0.6 && t < halfBeat + 0.5 ? 1 : 0; }
    if (t >= at('large')) { tm = 'happy'; tl = -0.2; }
    if (t >= at('double')) { tm = 'happy'; tl = 0.9; }
    if (t >= at('back')) { tm = 'happy'; tl = 0.9; }
    if (t >= at('priced')) { tm = t > end('priced') ? 'deadpan' : 'neutral'; tl = 0.6; }
    tan.set({ t, talk: scTalk(S, t, 'tan'), mood: tm, look: tl, lift: tlift });
    // Kavya (F1) and Priya (F2), customers
    tr(kav, 140, FY, 1.0);
    let km = 'neutral', kl = 0.7;
    if (who === 'priya') { km = 'deadpan'; kl = 0.9; }
    if (who === 'tan') kl = -0.2;
    if (t >= at('formula') && t < at('boy2')) km = 'happy';
    if (t >= at('boy2') && t < at('small')) { km = 'deadpan'; kl = 0.9; }
    if (who === 'kavya') { km = 'happy'; kl = 0.8; }
    if (t >= at('calc') && t < at('large')) { km = 'deadpan'; kl = 0.6; }
    if (t >= at('double') && t < at('priced')) { km = 'neutral'; kl = 0.8; }
    if (t >= at('priced')) { km = t > end('priced') ? 'deadpan' : 'neutral'; kl = 0.5; }
    kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
    tr(pri, 480, FY, 1.0);
    let pm = 'happy', pl = 0.7;
    if (who === 'priya') { pm = 'smug'; pl = 0.5; }
    if (who === 'kavya') pl = -0.9;
    if (who === 'tan') pl = -0.6;
    if (t >= at('large') && t < at('double')) { pm = 'annoyed'; pl = -0.8; }
    if (t >= at('priced')) { pm = t > end('priced') ? 'deadpan' : 'neutral'; pl = -0.5; }
    pri.set({ t, talk: scTalk(S, t, 'priya'), mood: pm, look: pl, lift: who === 'priya' ? 1 : 0 });

    /* ---------- the board stages ---------- */
    const pricedOn = t >= at('priced') - 0.05;
    stage(p0, t, -1, at('cut'));
    if (pricedOn) stage(p0, t, at('priced'), 1e9);
    stage(p1, t, at('cut'), at('apple'));
    stage(p3, t, at('apple'), at('boy2'));
    stage(p4, t, at('boy2'), at('calc'));
    stage(p7, t, at('calc'), at('large'));
    stage(p8, t, at('large'), at('double'));
    stage(p9, t, at('double'), at('back'));
    stage(p10, t, at('back'), at('priced'));

    // P0
    menu.hl(0, t < at('cut') ? P(t, mid('noon', 0.3), 0.3, linear) * (1 - P(t, mid('noon', 0.62), 0.2, linear)) : 0);
    menu.hl(1, t < at('cut') ? P(t, mid('noon', 0.62), 0.3, linear) : pricedOn ? P(t, mid('priced', 0.15), 0.3, linear) : 0);
    PZ.forEach((g, i) => op(g, pricedOn ? 1 : P(t, mid('noon', 0.3 + 0.32 * i), 0.3, linear)));
    cSame.set(!pricedOn && t >= at('same') ? P(t, mid('same', 0.3), 0.35, linear) : 0);
    cDeal.set(pricedOn ? P(t, mid('priced', 0.2), 0.35, linear) : 0);

    // P1 / P2: cut, fly, braces, 16 slices, rectangle
    {
      const sh = t < at('wobbly') ? P(t, mid('cut', 0.02), 0.3, linear) * (1 - P(t, mid('cut', 0.6), 0.2, linear)) : 0;
      op(shade, sh); op(areaTxt, sh);
      cuts.forEach((c, i) => mkDraw(c, P(t, mid('cut', 0.2) + i * 0.08, 0.3, linear)));
      op(cutL, t < flyT(0) + 0.05 ? 1 : 0);
      const split = P(t, at('formula') + 0.1, 1.0, ease);
      S8.forEach((g, i) => {
        const f = P(t, flyT(i), 0.55, ease), [x1, y1, r1] = pose8(i);
        const r0 = (i + 0.5) * 45;
        tr(g, lerp(PCX, x1, f), lerp(PCY, y1, f) - Math.sin(f * Math.PI) * 40, 1, angLerp(r0, r1, f));
        op(g.edge, t > mid('cut', 0.5) ? 1 : 0);
        op(g, split > 0 ? 0 : 1);
      });
      op(sl16, split > 0 ? 1 : 0);
      S16.forEach((g, j) => {
        const k = j >> 1, [xa, ya, ra] = pose8(k), [xb, yb, rb] = pose16(j);
        const ra2 = ra + (j % 2 ? 11.25 : -11.25) * (ra === 180 ? -1 : 1);
        const p = P(t, at('formula') + 0.1 + (j % 4) * 0.05, 0.9, ease);
        tr(g, lerp(xa, xb, p), lerp(ya, yb, p), 1, angLerp(ra2, rb, p));
      });
      const rp = P(t, mid('formula', 0.36), 0.4, linear);
      op(rect, rp); op(sl16, split > 0 ? 1 - rp : 0);
      const bb = t < at('formula') ? 1 : 1 - P(t, at('formula'), 0.2, linear);
      brTop.set(P(t, mid('crust', 0.18), 0.3, linear) * bb);
      brBot.set(P(t, mid('crust', 0.45), 0.3, linear) * bb);
      brSide.set(P(t, mid('crust', 0.8), 0.3, linear) * bb);
      rTop.set(P(t, mid('formula', 0.42), 0.3, linear)); rSide.set(P(t, mid('formula', 0.42), 0.3, linear));
      form.show(0, P(t, mid('formula', 0.55), 0.35, linear));
      form.show(1, P(t, mid('formula', 0.78), 0.35, linear));
      op(formRing, P(t, mid('formula', 0.85), 0.3, linear));
    }

    // P3
    apArr.forEach((a, i) => { const p = P(t, mid('apple', 0.08 + 0.2 * i), 0.3, linear); a.set(p); op(a, p > 0 ? 1 : 0); });
    [[0], [1, 2], [3]].forEach((ix, i) => ix.forEach(k => op(apSym[k], P(t, mid('apple', 0.16 + 0.2 * i), 0.3, linear))));
    apBox.set(P(t, mid('apple', 0.66), 0.35, linear));

    // P4..P6: the 20 cm pizza, Dee and Rad
    {
      const ball = P(t, mid('dee', 0.45), 0.5, pop) * (1 - P(t, at('small'), 0.45, ease));
      const lift = P(t, at('small') + 0.2, 0.5, ease);
      const cy = lerp(440, 345, lift);
      tr(pzW, BX, cy); tr(pz, 0, 0, 1 + ball);
      op(realC, t >= at('four') && t < at('small') + 0.3 ? P(t, mid('four', 0.3), 0.3, linear) * (1 - P(t, at('small'), 0.3, linear)) : 0);
      op(diam, t < at('dee') ? P(t, mid('boy2', 0.05), 0.3, linear) : 1 - P(t, at('dee'), 0.2, linear));
      cBoy.set(t < mid('four', 0.65) ? P(t, mid('boy2', 0.6), 0.35, linear) : 0); tr(cBoy, BX, 645);
      cFourX.set(t >= at('dee') && t < at('small') ? P(t, mid('dee', 0.75), 0.35, linear) : 0); tr(cFourX, 1062, 248);
      cDouble.set(t >= at('four') && t < at('small') ? P(t, mid('four', 0.15), 0.35, linear) : 0); tr(cDouble, BX, 590);
      cFour.set(t >= mid('four', 0.65) && t < at('small') ? P(t, mid('four', 0.65), 0.35, linear) : 0); tr(cFour, BX, 645);
      cR10.set(t >= at('small') ? P(t, mid('small', 0.1), 0.35, linear) : 0); tr(cR10, 1085, 250);
      small.forEach((g, i) => show(g, t, mid('small', 0.28 + 0.16 * i)));
      // Dee: slides in from the right, stands as the "radius" of the ballooned pizza, tilts aside, slides out
      const deeIn = P(t, at('dee') - 0.15, 0.4, easeOut), deeOut = P(t, at('small') + 0.05, 0.4, easeIn);
      const deeOn = t >= at('dee') - 0.15 && deeOut < 1 && t < at('calc');
      op(dee, deeOn ? 1 : 0);
      if (deeOn) {
        const tilt = P(t, at('four'), 0.4, ease), phi = lerp(-90, -125, tilt);
        const a = phi * Math.PI / 180, L = 220;
        const x = BX + Math.cos(a) * L / 2 + (1 - deeIn) * 420 + deeOut * 520, y = 440 + Math.sin(a) * L / 2;
        tr(dee, x, y, DS, phi + 90);
        dee.set({ t, talk: scTalk(S, t, 'dee'), mood: t >= at('four') ? 'shock' : 'smug', look: t >= at('four') ? 0.8 : -0.5, arms: t < at('four') ? 1 : 0.3 });
      }
      // Rad: the real radius, 10 cm
      const radIn = P(t, at('four') - 0.1, 0.4, pop);
      const radOnBoard = t >= at('four') - 0.1 && t < at('calc');
      if (radOnBoard) {
        op(rad, 1);
        const phi = t < at('small') ? -55 : lerp(-55, -60, lift);
        along(rad, BX, cy, phi, R, DS * Math.max(0.01, radIn));
        rad.set({ t, talk: scTalk(S, t, 'rad'), mood: t < at('small') ? 'deadpan' : 'happy', look: -0.6, arms: 0.3 });
      } else if (t >= at('double') && t < at('back') + 0.3) {
        // Rad on the table for "double"
        const up = P(t, at('double') - 0.3, 0.35, pop), out = P(t, at('back') - 0.05, 0.3, easeIn);
        op(rad, 1);
        tr(rad, 596, lerp(600, 462, up - out), 0.72);
        rad.set({ t, talk: scTalk(S, t, 'rad'), mood: 'happy', look: -0.5, arms: 0.6 });
      } else op(rad, 0);
    }

    // P7: the calculator
    {
      let disp = '0', key = '';
      if (t >= at('calc')) { disp = 'π×10'; key = '×'; }
      if (t > mid('calc', 0.25)) { disp = '31.4159265'; key = '='; }
      if (t > mid('calc', 0.5)) { disp = '986.960440'; key = 'x²'; }
      calc.set(disp);
      calc.press(key, Math.sin(t * 8) > 0 ? 1 : 0);
      show(cl1, t, mid('calc', 0.5)); show(cl2, t, mid('calc', 0.62));
      show(on1, t, mid('only', 0.05)); show(on2, t, mid('only', 0.15)); show(on3, t, mid('only', 0.25));
      cSq.set(P(t, mid('only', 0.45), 0.35, linear));
    }

    // P8: large
    lg.forEach((g, i) => show(g, t, mid('large', 0.02 + 0.1 * i)));
    show(ratio, t, mid('large', 0.48)); show(ratio2, t, mid('large', 0.55));
    show(vis, t, mid('large', 0.58)); show(deal, t, mid('large', 0.66));

    // P9: double
    show(dbl, t, at('double')); show(big, t, mid('double', 0.25)); dArr.set(P(t, mid('double', 0.2), 0.3, linear));
    show(dEq, t, mid('double', 0.45)); show(dNote, t, mid('double', 0.65));

    // P10: back
    back.forEach((g, i) => show(g, t, mid('back', 0.04 + 0.22 * i)));
    show(backD, t, mid('back', 0.66));

    /* ---------- chips, stamps ---------- */
    op(cNoon, 0);
    if (t < at('same')) popIn(cNoon, t, mid('noon', 0.05), 880, 60);
    stEasy.set(t >= easyBeat && t < at('calc') + 0.2 ? P(t, easyBeat, 0.35, linear) : 0); tr(stEasy, 300, 232, 0.45);
    stHalf.set(t >= halfBeat && t < at('large') + 0.2 ? P(t, halfBeat, 0.35, linear) : 0); tr(stHalf, 300, 232, 0.45);
  };
});
