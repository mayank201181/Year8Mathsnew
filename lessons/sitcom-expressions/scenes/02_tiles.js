/* Scene 2: Square and Stick (simplifying expressions, index laws).
   Shots (hard sitcom cuts):
   A  2 p.m. in the flat: Priya arrives with a box of RANGOLI TILES; Kavya, Dad, Ah Boy behind the table; on the table
      Square (x², rises out of the box), Stick (x, leans on it) and Agent X. A paper strip top right.
      two -> priya: the x² tile (x by x) and the x tile (x by 1) -> square: "x² = an area" -> stick: "x = a length" ->
      like: like terms, Square shoves Stick aside -> rangoli: Ah Boy's ladoo rangoli ... then crumbs.
   T  the tile mat (top-down, on the table), the speaker in the left column (Dad, Agent X, Priya or Square):
      dad: 3 squares, 2 sticks, minus 1 square: 3x² + 2x − x² = 4x³ ? -> ten: x = 10: 220 vs 4000, COVER BLOWN ->
      collect: the zero pair cancels: 2x² + 2x, check 220 -> times: x + x = 2x (a length), x × x = x² (an area) ->
      rect: the 3x by 2x rectangle fills with six x² tiles: 3x × 2x = 6x² -> laws: x⁴ × x³ = x⁷, the x's counted 1-7 ->
      wrong: x³ × x⁴ = x¹² ? -> add: x⁷; (x³)⁴ = x¹² power of a power -> divide: y⁶ ÷ y² = y⁴ (two y's cancel),
      x⁰ = 1, the index-law table. */
scene('tiles', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const fadeIn = (t, t0, d) => P(t, t0, d || 0.3, linear);
  const GOLD = '#FFE45C', RED = '#D32F2F', BLUE = '#2E6FD8', GREEN = '#1E9E5A', GREY = '#5A6670', PURPLE = '#8E44AD', INK = MK.ink;
  const chipC = (parent, text, o) => { o = o || {}; return mkChip(parent, text, { size: o.size || 30, col: o.col || GOLD }); };
  const row = (parent, cx, y, parts, o) => {
    o = o || {}; const s = o.size || 50, gap = o.gap !== undefined ? o.gap : s * 0.24;
    const ms = parts.map(p => (typeof p === 'string' ? { m: p } : p)).map(p => Object.assign({}, p, mkMeasure(p.m, { size: s })));
    const Wd = ms.reduce((a, p) => a + p.w, 0) + gap * (ms.length - 1);
    let x = o.anchor === 'start' ? cx : cx - Wd / 2; const out = [];
    ms.forEach(p => { const g = mkMath(parent, x, y, p.m, { size: s, fill: p.col || o.fill || INK }); out.push({ g, x0: x, w: p.w, cx: x + p.w / 2, a: p.a }); x += p.w + gap; });
    out.W = Wd; out.x0 = out[0].x0; out.x1 = x - gap; return out;
  };
  const paper = (parent, x, y, w, h, o) => { o = o || {}; return E('rect', { x, y, width: w, height: h, rx: 18, fill: o.fill || MK.paper, stroke: o.stroke || '#B8A27A', 'stroke-width': 5 }, parent); };
  const U = 104;   // the tile length x, in px (unit 40 for the 1-side)
  const tile = (parent, kind, x, y, o) => { const g = G(parent), inner = mkAlgebraTile(g, kind, Object.assign({ unit: 40, xlen: U }, o || {})); g.inner = inner; tr(g, x, y); g.x = x; g.y = y; return g; };

  /* layers */
  const Lbg = G(root), Lcast = G(root), Lfront = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= A: the living room ================= */
  const flatShot = G(Lbg);
  const flat = xpFlat(flatShot);
  Lfront.appendChild(flat.front); Lfront.appendChild(flat.top);
  const tray = xpTray(flat.top, { n: 18 }); tr(tray, 300, 530, 0.5); tray.set(17);
  // the box of rangoli tiles
  const box = G(flat.top); tr(box, 685, 530);
  E('path', { d: 'M-80,0 L-80,-76 L80,-76 L80,0 Z', fill: '#E8457A', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, box);
  E('path', { d: 'M-80,-76 L-64,-92 L96,-92 L80,-76 Z M80,0 L96,-16 L96,-92 L80,-76 Z', fill: '#B8235A', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, box);
  T(box, 0, -44, 'RANGOLI', { size: 26, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  T(box, 0, -14, 'TILES', { size: 26, weight: 800, anchor: 'middle', fill: GOLD });
  // Ah Boy's ladoo rangoli, then crumbs
  const plate = G(flat.top); tr(plate, 1040, 534);
  E('ellipse', { cx: 0, cy: 0, rx: 92, ry: 18, fill: '#DADDE1', stroke: '#7D8A96', 'stroke-width': 3 }, plate);
  const rang = G(plate);
  [[0, -26], [-34, -22], [34, -22], [-60, -14], [60, -14], [-18, -46], [18, -46], [0, -66]].forEach(([x, y]) => tr(xpLadoo(rang, 0.48), x, y));
  const crumbs = G(plate);
  [[-30, -6], [-8, -10], [14, -4], [36, -8], [-50, -4], [52, -2]].forEach(([x, y]) => E('circle', { cx: x, cy: y, r: 4, fill: '#E07A12' }, crumbs));
  const boyCrumbs = G(Lfg);
  [[-14, 0], [10, 6], [-4, 14], [16, -6]].forEach(([x, y]) => E('circle', { cx: x, cy: y, r: 4, fill: '#E07A12' }, boyCrumbs));
  const c2pm = chipC(Lfg, '**2 p.m.**', { size: 32 });

  // the strip
  const strip = G(Lfg);
  paper(strip, 590, 112, 570, 192);
  const sTiles = G(strip);
  const tBig = tile(sTiles, 'x2', 640, 150), tLong = tile(sTiles, 'x', 900, 182);
  mkMath(sTiles, 640 + U / 2, 142, 'x', { size: 30, anchor: 'middle', fill: BLUE });
  mkMath(sTiles, 622, 150 + U / 2 + 8, 'x', { size: 30, anchor: 'middle', fill: BLUE });
  mkMath(sTiles, 900 + U / 2, 174, 'x', { size: 30, anchor: 'middle', fill: GREEN });
  mkMath(sTiles, 900 + U + 16, 182 + 30, '1', { size: 30, anchor: 'middle', fill: GREEN });
  const lSq = mkText(sTiles, 692, 290, '{{x^2}} = an **area**', { size: 28, anchor: 'middle', fill: INK, boldFill: BLUE });
  const lSt = mkText(sTiles, 952, 290, '{{x}} = a **length**', { size: 28, anchor: 'middle', fill: INK, boldFill: GREEN });
  const tBigX = mkText(sTiles, 760, 214, 'x by x', { size: 28, anchor: 'start', fill: GREY });
  const tLongX = mkText(sTiles, 952, 262, 'x by 1', { size: 28, anchor: 'middle', fill: GREY });
  const sLike = G(strip);
  mkText(sLike, 875, 160, '**like terms**: same letters, same powers', { size: 30, anchor: 'middle', fill: INK, boldFill: BLUE });
  const lk1 = mkText(sLike, 875, 222, '{{3x^2}} and {{-x^2}}:  like', { size: 34, anchor: 'middle', fill: GREEN });
  tr(tick(lk1, 13), 875 + lk1.w / 2 + 26, 210);
  const lk2 = mkText(sLike, 875, 282, '{{x^2}} and {{2x}}:  not like', { size: 34, anchor: 'middle', fill: RED });
  tr(cross(lk2, 11), 875 + lk2.w / 2 + 26, 270);

  /* ================= T: the tile mat ================= */
  const matShot = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#8E5A34' }, matShot);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#B8233A', opacity: 0.35 }, matShot);
  let dots = '';
  for (let x = 40; x < 330; x += 58) for (let y = 130; y < 720; y += 58) dots += `M${x + 3},${y} A3,3 0 1 1 ${x - 3},${y} A3,3 0 1 1 ${x + 3},${y} `;
  E('path', { d: dots, fill: '#FFFFFF', opacity: 0.25 }, matShot);
  paper(matShot, 340, 108, 820, 562, { fill: '#FFF8EC' });
  E('rect', { x: 352, y: 120, width: 796, height: 538, rx: 12, fill: 'none', stroke: '#E8457A', 'stroke-width': 3, 'stroke-dasharray': '4 10', opacity: 0.7 }, matShot);
  const MX = 750;
  const page = (title) => { const g = G(matShot); mkText(g, MX, 160, title, { size: 32, anchor: 'middle', fill: INK, weight: 800 }); return g; };

  // dad: 3 squares, 2 sticks, minus 1 square
  const pDad = page("Dad's sum");
  const sqs = [0, 1, 2].map(i => tile(pDad, 'x2', 400 + i * 120, 196));
  const sts = [0, 1].map(i => tile(pDad, 'x', 790, 206 + i * 54));
  const negSq = tile(pDad, 'x2', 930, 196, { neg: true });
  const gL = [mkMath(pDad, 400 + 1.5 * U + 120, 348, '3x^2', { size: 40, anchor: 'middle', fill: BLUE }),
    mkMath(pDad, 790 + U / 2, 348, '+ 2x', { size: 40, anchor: 'middle', fill: GREEN }),
    mkMath(pDad, 930 + U / 2, 348, '- x^2', { size: 40, anchor: 'middle', fill: RED })];
  const dExpr = mkMath(pDad, MX, 446, '3x^2 + 2x - x^2', { size: 62, anchor: 'middle', fill: INK });
  const dWrong = G(pDad);
  mkText(dWrong, MX, 540, 'add the lot:  {{= 4x^3}}  ?', { size: 48, anchor: 'middle', fill: RED, weight: 700 });
  const z0 = T(pDad, 0, 0, '0', { size: 56, weight: 800, anchor: 'middle', fill: GREY });

  // ten: undercover as x = 10
  const pTen = page('Undercover as {{x = 10}}');
  const ten1 = mkText(pTen, MX, 250, 'start: {{3x^2 + 2x - x^2}}', { size: 38, anchor: 'middle', fill: INK });
  const ten2 = mkMath(pTen, MX, 318, '= 300 + 20 - 100 = 220', { size: 42, anchor: 'middle', fill: GREEN });
  const ten3 = mkText(pTen, MX, 398, 'Dad: {{4x^3}}', { size: 38, anchor: 'middle', fill: INK });
  const ten4 = mkMath(pTen, MX, 466, '= 4 × 1000 = 4000', { size: 42, anchor: 'middle', fill: RED });
  const ten5 = mkMath(pTen, MX, 548, '220 != 4000', { size: 60, anchor: 'middle', fill: RED });
  const stampNo = xpStamp(pTen, false);

  // collect (reuses pDad's tiles; text in pCol)
  const pCol = G(matShot);
  mkText(pCol, MX, 160, 'Collect **like terms**', { size: 32, anchor: 'middle', fill: INK, weight: 800, boldFill: BLUE });
  const col1 = mkText(pCol, MX, 410, 'squares: {{3x^2 - x^2 = 2x^2}}', { size: 38, anchor: 'middle', fill: BLUE });
  const col2 = mkText(pCol, MX, 470, 'sticks: {{2x}}', { size: 38, anchor: 'middle', fill: GREEN });
  const col3 = G(pCol);
  const colA = mkMath(col3, MX, 552, '2x^2 + 2x', { size: 64, anchor: 'middle', fill: INK });
  E('rect', { x: MX - colA.w / 2 - 20, y: 552 - colA.a - 14, width: colA.w + 40, height: colA.a + colA.d + 28, rx: 14, fill: 'none', stroke: GREEN, 'stroke-width': 5 }, col3);
  const col4 = mkText(pCol, MX, 636, 'check {{x = 10}}:  {{200 + 20 = 220}}', { size: 30, anchor: 'middle', fill: GREEN });
  tr(tick(col4, 12), MX + col4.w / 2 + 24, 624);

  // times: x + x = 2x (a length), x × x = x² (an area)
  const pTimes = page('A length or an area?');
  const tmA = G(pTimes);
  tile(tmA, 'x', 390, 220); tile(tmA, 'x', 390 + U, 220);
  mkBrace(tmA, 390 + 2 * U, 274, 390, 274, { text: '{{2x}}: a **length**', col: GREEN, size: 28, depth: 16 });
  mkMath(tmA, 700, 256, 'x + x = 2x', { size: 50, fill: INK });
  const tmB = G(pTimes);
  E('rect', { x: 430, y: 420, width: U, height: U, rx: 6, fill: '#4CC9F0', stroke: INK, 'stroke-width': 3, opacity: 0.9 }, tmB);
  const tmSq = tmB.lastChild;
  mkMath(tmB, 430 + U / 2, 420 + U / 2 + 12, 'x^2', { size: 34, anchor: 'middle', fill: INK });
  const tmH = tile(pTimes, 'x', 430, 380), tmV = tile(pTimes, 'x', 390, 420, { vertical: true });
  mkText(tmB, 482, 570, 'an **area**', { size: 28, anchor: 'middle', fill: INK, boldFill: BLUE });
  mkMath(tmB, 700, 488, 'x × x = x^2', { size: 50, fill: INK });

  // rect: 3x by 2x, six x² squares
  const pRect = page('Multiplying terms');
  const RX = 410, RY = 236;
  const rOut = E('rect', { x: RX, y: RY, width: 3 * U, height: 2 * U, fill: 'none', stroke: INK, 'stroke-width': 4, 'stroke-dasharray': '10 8' }, pRect);
  const rTiles = [];
  for (let r = 0; r < 2; r++) for (let c = 0; c < 3; c++) rTiles.push(tile(pRect, 'x2', RX + c * U, RY + r * U));
  mkBrace(pRect, RX, RY - 10, RX + 3 * U, RY - 10, { text: '{{3x}}', col: BLUE, size: 32, depth: 16 });
  mkBrace(pRect, RX - 12, RY + 2 * U, RX - 12, RY, { col: BLUE, depth: 16 });
  mkMath(pRect, RX - 40, RY + U + 12, '2x', { size: 32, anchor: 'end', fill: BLUE });
  const rCount = mkText(pRect, RX + 1.5 * U, RY + 2 * U + 48, 'six {{x^2}} squares', { size: 28, anchor: 'middle', fill: GREY });
  const rEq = mkMath(pRect, 780, 300, '3x × 2x = 6x^2', { size: 48, fill: INK });
  const rN = mkMath(pRect, 800, 384, '3 × 2 = 6', { size: 38, fill: BLUE });
  const rL = mkMath(pRect, 800, 448, 'x × x = x^2', { size: 38, fill: BLUE });
  const rNote = mkText(pRect, MX, 610, 'numbers times numbers, letters times letters', { size: 28, anchor: 'middle', fill: GREY });

  // laws: x⁴ × x³ = x⁷
  const pLaws = page('Index laws: multiplying');
  const lw1 = mkMath(pLaws, MX, 262, 'x^4 × x^3 = x^{4 + 3} = x^7', { size: 54, anchor: 'middle', fill: INK });
  const lwR = row(pLaws, MX, 390, ['(', 'x', 'x', 'x', 'x', ')', '×', '(', 'x', 'x', 'x', ')'], { size: 54, gap: 12 });
  const lwX = lwR.filter((p, i) => [1, 2, 3, 4, 8, 9, 10].includes(i));
  const lwN = lwX.map((p, i) => T(pLaws, p.cx, 446, String(i + 1), { size: 28, weight: 800, anchor: 'middle', fill: '#E07A12' }));
  const lwTot = mkText(pLaws, MX, 504, '{{x}} multiplied seven times: {{x^7}}', { size: 30, anchor: 'middle', fill: GREY });
  const lwChip = chipC(pLaws, 'multiply: **ADD** the powers', { col: BLUE, size: 32 }); tr(lwChip, MX, 590);
  attr(lwChip.firstChild.firstChild, 'fill', '#EAF2FF');

  // wrong / add
  const pPow = page('Add or multiply the powers?');
  const pw1 = G(pPow);
  const pw1m = mkMath(pw1, MX - 20, 250, 'x^3 × x^4 = x^12', { size: 54, anchor: 'middle', fill: RED });
  const pw1q = T(pw1, MX - 20 + pw1m.w / 2 + 30, 250, '?', { size: 54, weight: 800, anchor: 'middle', fill: RED });
  const pw1x = G(pw1);
  E('line', { x1: MX - 20 - pw1m.w / 2 - 12, y1: 232, x2: MX - 20 + pw1m.w / 2 + 12, y2: 232, stroke: RED, 'stroke-width': 6, 'stroke-linecap': 'round' }, pw1x);
  const pw2 = G(pPow);
  const pw2m = mkMath(pw2, MX, 336, 'x^3 × x^4 = x^7', { size: 54, anchor: 'middle', fill: GREEN });
  tr(tick(pw2, 16), MX + pw2m.w / 2 + 34, 320);
  const pw3 = mkMath(pPow, MX, 452, '(x^3)^4 = x^{3 × 4} = x^12', { size: 54, anchor: 'middle', fill: INK });
  const pw4 = mkText(pPow, MX, 520, 'a **power of a power**: multiply the powers', { size: 30, anchor: 'middle', fill: GREY, boldFill: PURPLE });
  const pw5 = mkText(pPow, MX, 600, '{{(x^3)^4 = x^3 × x^3 × x^3 × x^3}}', { size: 30, anchor: 'middle', fill: GREY });

  // divide
  const pDiv = page('Index laws: dividing');
  const DS = 50;
  const dvTop = row(pDiv, 640, 228, ['y', 'y', 'y', 'y', 'y', 'y'], { size: DS, gap: 10 });
  const dvBot = row(pDiv, 640, 318, ['y', 'y'], { size: DS, gap: 10 });
  E('line', { x1: dvTop.x0 - 14, y1: 252, x2: dvTop.x1 + 14, y2: 252, stroke: INK, 'stroke-width': 5, 'stroke-linecap': 'round' }, pDiv);
  const cancels = [dvTop[0], dvTop[1], dvBot[0], dvBot[1]].map(p => { const l = E('line', { x1: p.x0 - 6, y1: (p === dvBot[0] || p === dvBot[1] ? 318 : 228) + 6, x2: p.x0 + p.w + 6, y2: (p === dvBot[0] || p === dvBot[1] ? 318 : 228) - 34, stroke: RED, 'stroke-width': 5, 'stroke-linecap': 'round' }, pDiv); return l; });
  const dvEq = mkMath(pDiv, dvTop.x1 + 40, 272, '= y^4', { size: 54, fill: INK });
  const dv1 = mkMath(pDiv, MX, 392, 'y^6 ÷ y^2 = y^{6 - 2} = y^4', { size: 38, anchor: 'middle', fill: BLUE });
  const dv2 = mkMath(pDiv, MX, 458, 'x^3 ÷ x^3 = x^0 = 1', { size: 42, anchor: 'middle', fill: INK });
  const lawT = mkTable(pDiv, [['multiply', '**add** the powers'], ['divide', '**subtract** the powers'], ['power of a power', '**multiply** the powers']],
    { colW: [270, 340], rowH: 50, size: 28, ink: INK, head: false, side: true, fill: 'rgba(46,111,216,0.06)', headFill: 'rgba(76,201,240,0.22)' });
  tr(lawT, MX - 305, 490);
  const pages = [pDad, pTen, pCol, pTimes, pRect, pLaws, pPow, pDiv];

  /* ================= the cast ================= */
  const pri = cast(Lcast, 'priya');
  const kav = cast(Lcast, 'kavya');
  const dad = cast(Lcast, 'dad');
  const boy = cast(Lcast, 'boy');
  const sq = cast(Lcast, 'square');
  const st = cast(Lcast, 'stick');
  const ax = cast(Lcast, 'x');
  const bTen = mkMath(ax.badge, 0, 0, 'x = 10', { size: 34, fill: INK, anchor: 'middle' }); tr(bTen, 0, 2 + (bTen.a - bTen.d) / 2 - 6);
  const lt = { priya: xpLowerThird(Lhud, 'priya'), square: xpLowerThird(Lhud, 'square'), stick: xpLowerThird(Lhud, 'stick') };
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* shots */
  const T_LINES = ['dad', 'ten', 'collect', 'times', 'rect', 'laws', 'wrong', 'add', 'divide'];
  const ORDER = S.ch.lines.map(l => l.id);
  const cutAt = id => at(id) - 0.06;
  const curLine = t => { let cur = ORDER[0]; for (const id of ORDER) if (t >= cutAt(id)) cur = id; return cur; };
  const POS = { pri: 115, kav: 300, dad: 490, sq: 685, st: 795, ax: 905, boy: 1062 };
  const SPK = { priya: 'pri', kavya: 'kav', dad: 'dad', boy: 'boy', square: 'sq', stick: 'st', x: 'ax' };
  const lookAt = (from, to) => { const x = POS[to]; return x === undefined ? 0 : clamp((x - POS[from]) / 240, -1, 1); };

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const cur = curLine(t), sT = T_LINES.includes(cur) ? 1 : 0, sA = 1 - sT;
    const who = scWho(S, t), spk = SPK[who] || '';
    for (const k in lt) lt[k].set(0);
    op(flatShot, sA); op(flat.front, sA); op(flat.top, sA); op(matShot, sT);
    op(strip, 0); op(sTiles, 0); op(sLike, 0); c2pm.set(0); op(boyCrumbs, 0);
    [pri, kav, dad, boy, sq, st, ax].forEach(c => op(c, 0));
    op(bTen, 0);

    /* ---------- A ---------- */
    if (sA) {
      flat.upd(t, 1);
      flat.clock.set(2, Math.min(59, Math.floor(t / 4)));
      // the strip
      if (t >= mid('priya', 0.25) && t < at('like')) {
        op(strip, 1); op(sTiles, 1);
        op(tBig, fadeIn(t, mid('priya', 0.4))); op(tBigX, fadeIn(t, mid('priya', 0.45)));
        op(tLong, fadeIn(t, mid('priya', 0.58))); op(tLongX, fadeIn(t, mid('priya', 0.6)));
        op(lSq, fadeIn(t, mid('square', 0.45))); op(lSt, fadeIn(t, mid('stick', 0.5)));
        op(tBigX, t >= mid('square', 0.45) ? 0 : fadeIn(t, mid('priya', 0.45)));
        op(tLongX, t >= mid('stick', 0.5) ? 0 : fadeIn(t, mid('priya', 0.6)));
      } else if (t >= at('like') && t < at('rangoli')) { op(strip, 1); op(sLike, 1); op(lk1, fadeIn(t, mid('like', 0.45))); op(lk2, fadeIn(t, mid('like', 0.65))); }
      if (t < at('priya')) { c2pm.set(P(t, at('two') + 0.3, 0.4, linear)); tr(c2pm, 910, 172); }
      // Priya walks in with the box
      const inP = P(t, at('two') + 0.2, 0.8, easeOut);
      const boxP = P(t, mid('two', 0.55), 0.5, easeOut);
      tr(box, lerp(250, 685, boxP), 530); op(box, t >= mid('two', 0.55) ? 1 : 0);
      // the rangoli plate
      const rgOn = t >= at('rangoli') - 0.1;
      op(plate, rgOn ? 1 : 0);
      const gone = t >= mid('rangoli', 0.5);
      op(rang, gone ? 0 : 1); op(crumbs, gone ? 1 : 0);
      // moods
      let pm = 'happy', pl = 0.5, km = 'happy', kl = lookAt('kav', 'pri'), dm = 'neutral', dl = lookAt('dad', 'pri'), bm = 'happy', bl = lookAt('boy', 'sq');
      let sm = 'smug', sl = 0, stm = 'neutral', stl = -0.4, xm = 'deadpan', xl = 0;
      if (t >= at('square')) { pl = lookAt('pri', 'sq'); kl = lookAt('kav', 'sq'); dl = lookAt('dad', 'sq'); dm = 'shock'; sl = -0.5; xl = -0.8; }
      if (t >= at('stick')) { sm = 'annoyed'; sl = 1; kl = lookAt('kav', 'st'); dl = lookAt('dad', 'st'); dm = 'happy'; stl = -0.8; xl = -0.6; bl = lookAt('boy', 'st'); }
      if (t >= at('like')) { sm = 'annoyed'; sl = 0.8; dm = 'sad'; dl = 0.8; kl = lookAt('kav', 'sq'); pl = lookAt('pri', 'sq'); pm = 'smug'; stm = 'neutral'; xl = -0.7; xm = 'smug'; bl = lookAt('boy', 'sq'); }
      if (t >= at('rangoli')) { pm = 'shock'; pl = 1; km = 'deadpan'; kl = 1; dm = 'deadpan'; dl = 1; bm = 'happy'; bl = -0.6; sm = 'shock'; sl = 1; stl = 1; xl = 1; xm = 'deadpan'; stm = 'happy'; }
      if (t >= mid('rangoli', 0.5)) { pm = 'deadpan'; sm = 'annoyed'; }
      // Priya
      op(pri, 1); tr(pri, lerp(-140, POS.pri, inP), 436, 0.92);
      pri.set({ t, talk: scTalk(S, t, 'priya'), mood: pm, look: pl, lift: t >= at('priya') && t < end('priya') ? 0.6 : 0 });
      if (t >= at('priya')) lt.priya.set(win(t, at('priya') + 0.1, at('priya') + 3.2, 0.3));
      op(kav, 1); tr(kav, POS.kav, 436, 0.95); kav.set({ t, mood: km, look: kl });
      op(dad, 1); tr(dad, POS.dad, 432, 0.92); dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: dl });
      op(boy, 1); tr(boy, POS.boy, 446, 1.0); boy.set({ t, talk: scTalk(S, t, 'boy'), mood: bm, look: bl });
      if (gone) { op(boyCrumbs, 1); tr(boyCrumbs, POS.boy, 478); }
      // Square rises out of the box; Stick leans on it; Agent X
      if (t >= at('square') - 0.2) {
        op(sq, 1);
        const up = P(t, at('square') - 0.2, 0.55, pop);
        // like: Square shoves Stick to one side
        tr(sq, POS.sq, lerp(560, 418, up), 0.55);
        sq.set({ t, talk: scTalk(S, t, 'square'), mood: sm, look: sl });
        lt.square.set(win(t, at('square') + 0.2, at('square') + 3.2, 0.3));
      }
      if (t >= at('stick') - 0.2) {
        op(st, 1);
        const lean = P(t, at('stick') - 0.2, 0.4, easeOut), shove = P(t, mid('like', 0.3), 0.45, pop);
        tr(st, POS.st + 40 * (1 - lean) + 60 * shove, 448, 0.55, lerp(-14, 10, shove));
        st.set({ t, talk: scTalk(S, t, 'stick'), mood: stm, look: stl });
        lt.stick.set(win(t, at('stick') + 0.05, at('stick') + 3.1, 0.3));
      }
      op(ax, 1); tr(ax, POS.ax + (t >= mid('like', 0.3) ? 30 : 0), 446, 0.6);
      ax.set({ t, mood: xm, look: xl, arms: 0.55, shades: 1, badge: 0 });
    }

    /* ---------- T: the mat ---------- */
    pages.forEach(p => op(p, 0));
    if (sT) {
      let pg = { dad: 0, ten: 1, collect: 2, times: 3, rect: 4, laws: 5, wrong: 6, add: 6, divide: 7 }[cur];
      op(pages[pg], 1);
      if (pg === 2) op(pDad, 1);   // collect regroups Dad's tiles
      // Dad's tiles: appear in dad; regroup in collect
      if (pg === 0 || pg === 2) {
        const pdHead = pDad.firstChild;
        op(pdHead, pg === 0 ? 1 : 0); op(dExpr, pg === 0 ? fadeIn(t, mid('dad', 0.05)) : 0); op(dWrong, pg === 0 ? fadeIn(t, mid('dad', 0.62)) : 0);
        gL.forEach((g, i) => op(g, pg === 0 ? fadeIn(t, mid('dad', [0.12, 0.25, 0.38][i])) : 0));
        if (pg === 0) {
          sqs.forEach((g, i) => { op(g, fadeIn(t, mid('dad', 0.05 + i * 0.03))); tr(g, g.x, g.y); });
          sts.forEach((g, i) => { op(g, fadeIn(t, mid('dad', 0.2 + i * 0.03))); tr(g, g.x, g.y); });
          op(negSq, fadeIn(t, mid('dad', 0.34))); tr(negSq, negSq.x, negSq.y); op(z0, 0);
        } else {
          // collect: the red square slides onto a blue one; the zero pair vanishes; the rest close up
          const slide = P(t, mid('collect', 0.08), 0.5, easeOut), vanish = P(t, mid('collect', 0.2), 0.3, linear);
          tr(negSq, lerp(930, sqs[2].x, slide), 196); op(negSq, 1 - vanish); op(sqs[2], 1 - vanish);
          op(z0, win(t, mid('collect', 0.2), mid('collect', 0.42), 0.15)); tr(z0, sqs[2].x + U / 2, 196 + U / 2 + 20);
          const close = P(t, mid('collect', 0.35), 0.5, easeOut);
          op(sqs[0], 1); op(sqs[1], 1); tr(sqs[0], lerp(400, 480, close), 196); tr(sqs[1], lerp(520, 600, close), 196);
          sts.forEach((g, i) => { op(g, 1); tr(g, lerp(790, 760, close), g.y); });
          op(col1, fadeIn(t, mid('collect', 0.1))); op(col2, fadeIn(t, mid('collect', 0.4))); op(col3, fadeIn(t, mid('collect', 0.55))); op(col4, fadeIn(t, mid('collect', 0.64)));
        }
      }
      if (pg === 1) {
        op(ten1, fadeIn(t, mid('ten', 0.12))); op(ten2, fadeIn(t, mid('ten', 0.22)));
        op(ten3, fadeIn(t, mid('ten', 0.42))); op(ten4, fadeIn(t, mid('ten', 0.5)));
        op(ten5, fadeIn(t, mid('ten', 0.62)));
        stampNo.set(P(t, mid('ten', 0.68), 0.35, linear)); tr(stampNo, MX, 624, 0.5);
      }
      if (pg === 3) {
        op(tmA, fadeIn(t, mid('times', 0.05)));
        const p2 = fadeIn(t, mid('times', 0.5)); op(tmH, p2); op(tmV, p2);
        op(tmB, fadeIn(t, mid('times', 0.62)));
      }
      if (pg === 4) {
        rTiles.forEach((g, i) => { const p = P(t, mid('rect', 0.12 + i * 0.07), 0.3, pop); op(g, clamp(p * 3)); tr(g.inner, U / 2 * (1 - p), U / 2 * (1 - p), Math.max(0.01, p)); });
        op(rCount, fadeIn(t, mid('rect', 0.55)));
        op(rEq, fadeIn(t, mid('rect', 0.08))); op(rN, fadeIn(t, mid('rect', 0.54))); op(rL, fadeIn(t, mid('rect', 0.6)));
        op(rNote, fadeIn(t, mid('rect', 0.64)));
      }
      if (pg === 5) {
        op(lw1, fadeIn(t, mid('laws', 0.3)));
        lwR.forEach(p => op(p.g, fadeIn(t, mid('laws', 0.36))));
        lwN.forEach((n, i) => op(n, fadeIn(t, mid('laws', 0.42 + i * 0.03), 0.15)));
        op(lwTot, fadeIn(t, mid('laws', 0.62)));
        lwChip.set(P(t, mid('laws', 0.12), 0.35, linear));
      }
      if (pg === 6) {
        const inAdd = cur === 'add';
        op(pw1, cur === 'wrong' ? fadeIn(t, mid('wrong', 0.2)) : 1); op(pw1x, inAdd ? fadeIn(t, mid('add', 0.05)) : 0); op(pw1q, inAdd ? 0 : 1);
        op(pw2, inAdd ? fadeIn(t, mid('add', 0.1)) : 0);
        op(pw3, inAdd ? fadeIn(t, mid('add', 0.5)) : 0); op(pw4, inAdd ? fadeIn(t, mid('add', 0.55)) : 0); op(pw5, inAdd ? fadeIn(t, mid('add', 0.64)) : 0);
      }
      if (pg === 7) {
        dvTop.concat(dvBot).forEach(p => op(p.g, fadeIn(t, mid('divide', 0.06))));
        cancels.forEach((l, i) => op(l, fadeIn(t, mid('divide', 0.2 + (i % 2) * 0.04), 0.15)));
        op(dvEq, fadeIn(t, mid('divide', 0.3))); op(dv1, fadeIn(t, mid('divide', 0.36)));
        op(dv2, fadeIn(t, mid('divide', 0.42)));
        lawT.cells.forEach((r, i) => r.forEach(c => op(c, fadeIn(t, mid('divide', 0.5 + i * 0.06)))));
        op(lawT, fadeIn(t, mid('divide', 0.48)));
      }
      // the speaker in the left column
      if (cur === 'dad') { op(dad, 1); tr(dad, 168, 612, 1.1); dad.set({ t, talk: scTalk(S, t, 'dad'), mood: 'smug', look: 1 }); }
      if (cur === 'ten' || cur === 'laws' || cur === 'divide') {
        op(ax, 1); tr(ax, 170, 440, 1.0);
        const blownAt = mid('ten', 0.68);
        const isTen = cur === 'ten';
        if (isTen) op(bTen, 1);
        ax.set({ t, talk: scTalk(S, t, 'x'), mood: isTen ? (t > blownAt ? 'smug' : 'deadpan') : (cur === 'divide' ? 'smug' : 'deadpan'), look: 0.7,
          shades: isTen ? 1 - P(t, blownAt - 0.4, 0.5, easeOut) : 1, badge: isTen ? 1 : 0, arms: cur === 'laws' ? 0.55 + 0.45 * win(t, mid('laws', 0.62), end('laws') + 1, 0.25) : 0.55 });
      }
      if (cur === 'collect' || cur === 'rect' || cur === 'wrong') {
        op(pri, 1); tr(pri, 170, 600, 1.15);
        pri.set({ t, talk: scTalk(S, t, 'priya'), mood: cur === 'wrong' ? 'smug' : 'happy', look: 1, lift: 0.6 });
      }
      if (cur === 'times' || cur === 'add') {
        op(sq, 1); tr(sq, 170, 420, 0.95);
        sq.set({ t, talk: scTalk(S, t, 'square'), mood: cur === 'add' ? (t < mid('add', 0.45) ? 'annoyed' : 'smug') : 'smug', look: 0.8 });
      }
    }
  };
});
