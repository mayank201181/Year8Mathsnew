/* Scene 7: The plus one (counting factors, stretch).
   One set, the void deck at 8 p.m.: Mr Tan (left end), Kavya and Priya behind the party table; a board on the
   right with the factor grid of 72; notes on the left above the humans.
   eight: 8 p.m., PARTY QUIZ, groans -> q: how many factors does 72 have? without listing -> twos: 72 = 2³ × 3²,
   the grid's rows 2⁰ = 1, 2¹ = 2, 2² = 4, 2³ = 8: 4 choices -> threes: columns 3⁰ = 1, 3¹ = 3, 3² = 9: 3 choices,
   the 12 cells fill, 4 × 3 = 12 -> none: the 2⁰ = 1 row glows, factors = (3 + 1)(2 + 1) -> me: One bursts in and
   stands on the + 1, confetti -> mine: Priya ducks, Paati rises, 64 = 2⁶ -> seven: 6 + 1 = 7 factors, 1 2 4 8 16 32
   64 -> pairs: Big Two hops onto the table, the pairs drawn as arcs, 8 × 8 loops to itself, "only squares have an
   odd number of factors" -> primes: prime: 2 factors (7: 1, 7), prime squared: 3 factors (49: 1, 7, 49) -> lucky:
   Big Two stamps PRIME on the 7, Paati smug, a gold star. */
scene('count', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const pill = (parent, text, o) => { o = o || {}; return mkChip(parent, text, { size: o.size || 30, col: o.col || C.ink }); };
  const popSet = (el, t, t0, t1, x, y) => { const p = t >= t0 && t < t1 ? P(t, t0, 0.35, linear) : 0; el.set(p); if (x !== undefined) tr(el, x, y); };
  const fadeIn = (t, t0, t1) => (t >= t0 && t < (t1 === undefined ? 1e9 : t1) ? P(t, t0, 0.3, linear) : 0);
  const GOLD = '#FFE45C', PINK = '#FF8FC8', GREEN = '#56D69B', RED = '#FF6B6B', BLUE = '#6EC8FF', LIL = '#C9B6FF', ORANGE = '#FFB067';

  /* layers */
  const Lbg = G(root), Lboard = G(root), Lcast = G(root), Lfront = G(root), Ltable = G(root), Lfg = G(root), Lcut = G(root), Lhud = G(root);

  /* ================= the void deck at 8 p.m. ================= */
  const vd = fmVoid(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 112, fill: '#0E0A24', opacity: 0.35 }, Lbg);   // later: darker outside
  Lfront.appendChild(vd.front); Lfront.appendChild(vd.top);
  // Mr Tan's quiz book on the table
  const quiz = G(vd.top); tr(quiz, 210, 528);
  E('rect', { x: -50, y: -16, width: 100, height: 16, rx: 3, fill: '#2E7DD8', stroke: SC_INK, 'stroke-width': 2.5 }, quiz);

  /* ================= the board ================= */
  const BX0 = 640, BX1 = 1172, BY0 = 108, BY1 = 506, BCX = (BX0 + BX1) / 2;
  const board = G(Lboard);
  E('rect', { x: BX0 + 6, y: BY0 + 6, width: BX1 - BX0, height: BY1 - BY0, rx: 18, fill: 'rgba(0,0,0,0.3)' }, board);
  E('rect', { x: BX0, y: BY0, width: BX1 - BX0, height: BY1 - BY0, rx: 18, fill: '#12222E', stroke: '#8FA3B8', 'stroke-width': 4 }, board);

  // eight / q: the quiz card
  const quizT = G(board);
  T(quizT, BCX, 196, 'PARTY QUIZ', { size: 60, weight: 800, anchor: 'middle', fill: GOLD, ls: 4 });
  T(quizT, BCX, 246, 'by Mr Tan (floor 7)', { size: 28, weight: 600, anchor: 'middle', fill: '#9FB3C4', font: FB });
  const qT = mkText(board, BCX, 340, 'How many factors\ndoes **72** have?', { size: 42, anchor: 'middle', boldFill: GOLD });
  // 72's grid
  const head72 = mkMath(board, BCX, 160, '72 = 2^3 * 3^2', { size: 44, anchor: 'middle', fill: GOLD });
  const grid = mkTable(board, [
    ['×', '{{3^0 = 1}}', '{{3^1 = 3}}', '{{3^2 = 9}}'],
    ['{{2^0 = 1}}', '1', '3', '9'],
    ['{{2^1 = 2}}', '2', '6', '18'],
    ['{{2^2 = 4}}', '4', '12', '36'],
    ['{{2^3 = 8}}', '8', '24', '72'],
  ], { colW: [140, 112, 112, 112], rowH: 52, size: 30, side: true, headFill: 'rgba(76,201,240,0.22)' });
  const GX = BCX - 238, GY = 190;
  tr(grid, GX, GY);
  const rowMark = [0, 1, 2, 3].map(c => grid.mark(1, c, 'rgba(255,228,92,0.35)'));
  const prod = mkMath(board, BCX, 486, '4 * 3 = 12 "factors"', { size: 38, anchor: 'middle', fill: GREEN });

  // 64's factors
  const head64 = mkMath(board, BCX, 160, '64 = 2^6', { size: 44, anchor: 'middle', fill: PINK });
  const seven = mkMath(board, BCX, 222, '6 + 1 = 7 "factors"', { size: 40, anchor: 'middle', fill: GREEN });
  const F64 = ['1', '2', '4', '8', '16', '32', '64'], RX0 = BCX - 3 * 70, ROWY = 408;
  const facs = F64.map((s, i) => { const g = G(board); T(g, RX0 + i * 70, ROWY, s, { size: 38, weight: 800, anchor: 'middle', fill: i === 3 ? GOLD : C.ink }); return g; });
  const arcs = [[0, 6, 150, BLUE], [1, 5, 112, PINK], [2, 4, 74, ORANGE]].map(([a, b, h, col]) => {
    const x1 = RX0 + a * 70, x2 = RX0 + b * 70, y = ROWY - 40;
    return mkDash(E('path', { d: `M${x1},${y} C${x1},${y - h * 1.3} ${x2},${y - h * 1.3} ${x2},${y}`, fill: 'none', stroke: col, 'stroke-width': 5, 'stroke-linecap': 'round' }, board));
  });
  const loop8 = mkDash(E('path', { d: `M${RX0 + 3 * 70 - 10},${ROWY - 40} C${RX0 + 3 * 70 - 44},${ROWY - 110} ${RX0 + 3 * 70 + 44},${ROWY - 110} ${RX0 + 3 * 70 + 10},${ROWY - 40}`, fill: 'none', stroke: GOLD, 'stroke-width': 5, 'stroke-linecap': 'round' }, board));
  const pairsM = mkMath(board, BCX, 476, '1 * 64,  2 * 32,  4 * 16,  8 * 8', { size: 32, anchor: 'middle' });
  const stPrime = fmStamp(Lfg, 'prime');

  /* ================= the notes on the left ================= */
  const c8 = pill(Lfg, '**8 p.m.**', { col: GOLD, size: 34 });
  const cGroan = pill(Lfg, '*groan*', { col: '#9FB3C4', size: 30 });
  const cNoList = pill(Lfg, '**without** listing them', { col: RED, size: 32 });
  const cFour = pill(Lfg, 'twos: {{2^0, 2^1, 2^2, 2^3}}\n**4** choices', { col: BLUE, size: 30 });
  const cThree = pill(Lfg, 'threes: {{3^0, 3^1, 3^2}}\n**3** choices', { col: PINK, size: 30 });
  const cNone = pill(Lfg, '**none** is a choice: {{2^0 = 1}}', { col: GOLD, size: 30 });
  // the rule card, with the + 1s picked out
  const rule = G(Lfg);
  E('rect', { x: -250, y: -46, width: 500, height: 92, rx: 16, fill: 'rgba(10,27,39,0.92)', stroke: GOLD, 'stroke-width': 3 }, rule);
  const rM = mkMath(rule, 0, 14, '"factors" = (3 + 1)(2 + 1)', { size: 40, anchor: 'middle' });
  // the two "+ 1" boxes: measure the pieces of the markup to place them
  const wA = mkMeasure('"factors" = (3', { size: 40 }).w, wB = mkMeasure('"factors" = (3 + 1)(2', { size: 40 }).w, w1 = mkMeasure('+ 1', { size: 40 }).w;
  const r0 = -rM.w / 2, sp = mkMeasure('3 +', { size: 40 }).w - mkMeasure('3+', { size: 40 }).w;
  const plusBox = [wA, wB].map(w => E('rect', { x: r0 + w + sp * 0.2, y: -24, width: w1 + sp * 0.6, height: 50, rx: 10, fill: 'rgba(255,228,92,0.3)', stroke: GOLD, 'stroke-width': 3 }, rule));
  const PLUSX = r0 + wA + sp * 0.2 + (w1 + sp * 0.6) / 2;
  /* me: a talking-head cut to One, standing on a giant + 1 */
  const conf1 = fmConf(Lcut, 'one');
  const cutG = G(Lcut);
  const podium = G(cutG); tr(podium, 400, 540);
  E('rect', { x: -110, y: 0, width: 220, height: 130, rx: 12, fill: linGrad('#FFE45C', '#E2B33C', true), stroke: '#8A6A10', 'stroke-width': 5 }, podium);
  T(podium, 0, 92, '+ 1', { size: 76, weight: 800, anchor: 'middle', fill: '#5A3A00' });
  const bigRule = G(cutG); tr(bigRule, 880, 300);
  const bR = mkMath(bigRule, 0, 0, '(3 + 1)(2 + 1) = 12', { size: 56, anchor: 'middle' });
  const bA = mkMeasure('(3', { size: 56 }).w, bB = mkMeasure('(3 + 1)(2', { size: 56 }).w, b1 = mkMeasure('+ 1', { size: 56 }).w, bsp = mkMeasure('3 +', { size: 56 }).w - mkMeasure('3+', { size: 56 }).w;
  [bA, bB].forEach(w => E('rect', { x: -bR.w / 2 + w + bsp * 0.2, y: -48, width: b1 + bsp * 0.6, height: 66, rx: 12, fill: 'rgba(255,228,92,0.3)', stroke: GOLD, 'stroke-width': 4 }, bigRule));
  T(bigRule, 0, -96, 'factors of 72', { size: 34, weight: 700, anchor: 'middle', fill: '#FFE9A8' });
  const cPlus = pill(cutG, 'the **+ 1** = choosing **none**', { col: GOLD, size: 32 });
  const cEvery = pill(cutG, 'in **every** factor count', { col: PINK, size: 32 });
  const cOdd = pill(Lfg, '**7** factors: an **odd** number', { col: GOLD, size: 30 });
  const big7 = G(Lfg);
  E('circle', { r: 70, fill: GREEN, stroke: '#1E7A4A', 'stroke-width': 6 }, big7);
  T(big7, 0, 34, '7', { size: 100, weight: 800, anchor: 'middle', fill: '#0E2A1A' });
  const cLucky = pill(Lfg, 'lucky **7**: prime', { col: GREEN, size: 30 });
  Lfg.appendChild(stPrime);
  const cSq = pill(Lfg, 'only **squares** have an\n**odd** number of factors', { col: GOLD, size: 30 });
  const cP1 = pill(Lfg, 'prime: **2** factors  (7: 1, 7)', { col: GREEN, size: 30 });
  const cP2 = pill(Lfg, 'prime squared: **3** factors\n(49: 1, 7, 49)', { col: LIL, size: 30 });
  const star = G(Lhud);
  E('path', { d: 'M0,-26 L7.6,-8 L26,-8 L11,4 L16,23 L0,12 L-16,23 L-11,4 L-26,-8 L-7.6,-8 Z', fill: GOLD, stroke: '#8A6A10', 'stroke-width': 3, 'stroke-linejoin': 'round' }, star);

  // confetti for One
  const conf = G(Lhud), confs = [];
  const rc = rng(72);
  for (let i = 0; i < 36; i++) confs.push({ el: E('rect', { x: -6, y: -3, width: 12, height: 6, fill: ['#FFE45C', '#FF8FC8', '#56D69B', '#6EC8FF', '#FF8A3D'][i % 5] }, conf), x: 40 + rc() * 1120, v: 110 + rc() * 120, r0: rc() * 360, d: rc() * 0.6 });

  /* ================= the cast ================= */
  const tan = cast(Lcast, 'tan');
  const kav = cast(Lcast, 'kavya');
  const priya = cast(Lcast, 'priya', { prop: null });
  const paati = cast(Lcast, 'paati');
  const two = cast(Ltable, 'two');
  const one = cast(cutG, 'one');
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  const HS = 0.76, HY = 470;
  const X = { tan: 100, kavya: 262, priya: 424, paati: 424, two: 586, one: 300 };
  const lookAt = (x, who) => (who && X[who] !== undefined && X[who] !== x ? clamp((X[who] - x) / 260, -1, 1) : who === 'two' ? 1 : 0);
  const put = (c, x, k) => { op(c, k > 0.001 ? 1 : 0); tr(c, x, lerp(HY + 260, HY, k), HS); };

  /* timings */
  const t64 = at('mine') - 0.06;
  const fillT = mid('threes', 0.45);
  const CELLT = (r, c) => fillT + ((r - 1) * 3 + (c - 1)) * 0.11;
  const NOTE = 300;   // x of the notes column

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    vd.upd(t);
    const who = scWho(S, t);
    const s72 = t < t64 ? 1 : 0;

    /* ---------- the board: 72 ---------- */
    op(quizT, fadeIn(t, mid('eight', 0.12), at('q')));
    op(qT, fadeIn(t, at('q') + 0.05, at('twos')));
    op(head72, s72 * fadeIn(t, at('twos') + 0.05));
    op(grid, s72 * fadeIn(t, mid('twos', 0.3)));
    grid.cells.forEach((row, r) => row.forEach((cell, c) => {
      let p = 0;
      if (r === 0 && c === 0) p = P(t, mid('twos', 0.3), 0.3, linear);
      else if (c === 0) p = P(t, mid('twos', 0.4) + (r - 1) * 0.35, 0.3, linear);
      else if (r === 0) p = P(t, at('threes') + 0.1 + (c - 1) * 0.35, 0.3, linear);
      else p = P(t, CELLT(r, c), 0.25, linear);
      op(cell, p);
    }));
    rowMark.forEach(m => m.set(t >= mid('none', 0.2) && t < t64 ? P(t, mid('none', 0.2), 0.3, linear) * (0.75 + 0.25 * Math.sin(t * 6)) : 0));
    op(prod, s72 * fadeIn(t, mid('threes', 0.82)));

    /* ---------- the board: 64 ---------- */
    const s64 = 1 - s72;
    op(head64, s64 * fadeIn(t, mid('mine', 0.35)));
    op(seven, s64 * fadeIn(t, mid('seven', 0.08)));
    facs.forEach((f, i) => op(f, s64 * P(t, mid('seven', 0.38) + i * 0.08, 0.2, linear)));
    arcs.forEach((a, i) => { op(a, s64 && t >= at('pairs') ? 1 : 0); mkDraw(a, P(t, mid('pairs', 0.06 + i * 0.1), 0.4, ease)); });
    op(loop8, t >= at('pairs') ? 1 : 0); mkDraw(loop8, P(t, mid('pairs', 0.42), 0.5, ease));
    op(pairsM, fadeIn(t, mid('pairs', 0.5)));
    stPrime.set(t >= mid('lucky', 0.25) ? P(t, mid('lucky', 0.25), 0.35, linear) : 0); tr(stPrime, NOTE - 60, 226, 0.5);

    /* ---------- the notes ---------- */
    popSet(c8, t, mid('eight', 0.05), at('q'), NOTE, 160);
    popSet(cGroan, t, mid('eight', 0.75), at('q'), NOTE, 240);
    popSet(cNoList, t, mid('q', 0.6), at('twos'), NOTE, 200);
    popSet(cFour, t, mid('twos', 0.55), at('none'), NOTE, 170);
    popSet(cThree, t, mid('threes', 0.15), at('none'), NOTE, 278);
    popSet(cNone, t, mid('none', 0.12), at('me'), NOTE, 160);
    const ruleP = t >= mid('none', 0.5) && t < t64 ? P(t, mid('none', 0.5), 0.35, linear) : 0;
    op(rule, clamp(ruleP * 3)); tr(rule, NOTE, 270);
    plusBox.forEach((b, i) => op(b, P(t, mid('none', 0.72) + i * 0.08, 0.25, linear)));
    popSet(cPlus, t, mid('me', 0.25), t64, 880, 410);
    popSet(cEvery, t, mid('me', 0.62), t64, 880, 490);
    popSet(cOdd, t, mid('seven', 0.82), at('pairs'), NOTE, 200);
    popSet(cSq, t, mid('pairs', 0.72), at('primes'), NOTE, 200);
    popSet(cP1, t, mid('primes', 0.12), at('lucky'), NOTE, 160);
    popSet(cP2, t, mid('primes', 0.5), at('lucky'), NOTE, 254);
    const b7 = P(t, at('lucky') + 0.05, 0.4, pop); op(big7, clamp(b7 * 3)); tr(big7, NOTE - 60, 220, Math.max(0.01, b7));
    popSet(cLucky, t, mid('lucky', 0.3), 1e9, NOTE + 150, 170);

    /* ---------- One bursts in and stands on the + 1 ---------- */
    const sCut = t >= at('me') - 0.06 && t < t64 ? 1 : 0;
    op(Lcut, sCut); conf1.set(sCut, t);
    op(one, sCut);
    if (sCut) {
      const hop = P(t, at('me') - 0.06, 0.4, easeOut);
      const jump = Math.abs(Math.sin((t - at('me')) * 5)) * 22 * AMP;
      tr(one, 400, lerp(700, 540 - 152, hop) - jump, 1.0);
      one.set({ t, talk: scTalk(S, t, 'one'), mood: 'happy', look: 0.6, wave: 1 });
      tr(bigRule, 880, 300, Math.max(0.01, P(t, at('me'), 0.4, pop)));
    }
    const cf = t >= at('me') ? t - at('me') : -1;
    op(conf, sCut && cf >= 0 ? 1 : 0);
    confs.forEach(c => { const tt = Math.max(0, cf - c.d); tr(c.el, c.x + Math.sin(tt * 3 + c.r0) * 16, 90 + tt * c.v, 1, c.r0 + tt * 240); });

    /* ---------- Big Two hops onto the table ---------- */
    const tIn = P(t, at('pairs') - 0.4, 0.45, pop);
    op(two, tIn > 0.001 ? 1 : 0);
    const TS = 0.5;
    tr(two, X.two, lerp(800, 530 - 164 * TS, tIn), TS);
    let tm = 'deadpan', stamp = 0, list = 0;
        if (t >= at('lucky')) { stamp = P(t, at('lucky'), 0.3, ease) * (1 - P(t, mid('lucky', 0.5), 0.3, ease)); tm = t < mid('lucky', 0.5) ? 'smug' : 'deadpan'; }
    two.set({ t, talk: scTalk(S, t, 'two'), mood: tm, look: who === 'two' ? 1 : lookAt(X.two, who), list, stamp });

    /* ---------- the humans ---------- */
    // Mr Tan
    put(tan, X.tan, 1);
    let tnm = 'happy', tnl = lookAt(X.tan, who);
    if (who === 'tan') tnl = 1;
    else if (t >= at('twos') && t < at('none')) tnm = 'neutral';
    else if (t >= at('mine')) tnm = 'neutral';
    if (t >= at('me') && t < at('mine')) tnm = 'happy';
    tan.set({ t, talk: scTalk(S, t, 'tan'), mood: tnm, look: tnl, lift: (t >= mid('eight', 0.3) && t < at('twos')) || who === 'tan' ? 1 : 0 });
    // Kavya
    put(kav, X.kavya, 1);
    let km = 'neutral', kl = lookAt(X.kavya, who);
    if (t < at('q')) { km = t > mid('eight', 0.7) ? 'deadpan' : 'neutral'; kl = -1; }
    else if (who === 'kavya') { km = 'happy'; kl = 1; }
    else if (t >= at('me') && t < at('mine')) { km = 'happy'; kl = 0.2; }
    else if (t >= at('lucky')) { km = 'happy'; kl = 1; }
    kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
    // Priya, then Paati in the same spot
    const pOut = P(t, at('mine') - 0.45, 0.3, easeIn), paUp = P(t, at('mine') - 0.2, 0.4, pop);
    put(priya, X.priya, 1 - pOut);
    let pm = 'neutral', pl = lookAt(X.priya, who);
    if (t < at('q')) { pm = t > mid('eight', 0.7) ? 'deadpan' : 'neutral'; pl = -1; }
    else if (who === 'priya') { pm = t > mid('threes', 0.6) ? 'smug' : 'happy'; pl = 1; }
    else if (t >= at('me')) { pm = 'happy'; pl = 0; }
    priya.set({ t, talk: scTalk(S, t, 'priya'), mood: pm, look: pl });
    put(paati, X.paati, paUp);
    let pam = 'smug', pal = lookAt(X.paati, who);
    if (who === 'paati') { pam = 'smug'; pal = 1; }
    else if (t >= at('primes') && t < at('lucky')) { pam = 'neutral'; pal = 1; }
    paati.set({ t, talk: scTalk(S, t, 'paati'), mood: pam, look: pal });
    const stp = P(t, mid('lucky', 0.45), 0.4, pop);
    op(star, clamp(stp * 3)); tr(star, X.paati - 74, 330, Math.max(0.01, stp), Math.sin(t * 3) * 8 * AMP);
  };
});
