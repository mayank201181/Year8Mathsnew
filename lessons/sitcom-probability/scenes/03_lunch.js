/* Scene 3: Twenty-four meal deals (listing outcomes and sample spaces).
   Shots (hard sitcom cuts):
   A  12 noon, still raining: Dad by the door with his umbrella, Kavya.
   B  Auntie Rose's video call (lower third), far too close; the meal-deal menu: 1 of 4 mains, 1 of 3 drinks,
      1 of 2 desserts.
   C  the whiteboard: Dad 4 + 3 + 2 = 9 -> Kavya: the 4 x 3 grid of mains x drinks, 4 × 3 = 12, every cell splits
      into chendol / ice kacang, 12 × 2 = 24, Dad's 9 crossed out -> Mr Tan: the product rule, m × n, 4 × 3 × 2 = 24.
   B2 the call again: "Twenty-four? I only cooked six boxes." Dad and Kavya watch.
   D  Penny bounces onto the table (lower third); Cubert, deadpan: met today 4 (tally).
   E  the whiteboard: coin x dice sample space H1 ... T6, 2 × 6 = 12 -> Ah Boy: HH, TT, one of each, 1/3 each ->
      Kavya's systematic list HH, HT, TH, TT, 4 outcomes -> HT and TH are different -> P(one of each) = 2/4 = 1/2,
      the 1/3s crossed out; two dice: 6 × 6 = 36.
   F  Ah Boy with his fork: "Can we just eat now?" Penny and Cubert stare. */
scene('lunch', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const popSet = (el, t, t0, t1, x, y) => { const p = t >= t0 && t < t1 ? P(t, t0, 0.35, linear) : 0; el.set(p); if (x !== undefined) tr(el, x, y); };
  const popG = (el, t, t0, t1, x, y, s) => {
    const p = t >= t0 && t < t1 ? P(t, t0, 0.35, pop) : 0;
    op(el, clamp(p * 3)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.7 + 0.3 * p)));
  };
  const chipAt = (parent, text, o) => { o = o || {}; return mkChip(parent, text, { size: o.size || 30, col: o.col || C.ink }); };
  const GOLD = '#FFE45C', RED = '#FF8A8A', GREEN = '#7FE0A8', BLUE = '#8FC8FF';
  const INK = MK.ink, DRED = '#C62828', DGREEN = '#1E9E5A';
  const onTable = (s, foot) => 550 - foot * s;   // centre y of a cartoon whose feet are `foot` px below its centre

  const R0 = G(root);   // everything, so the final push-in can scale the whole frame
  const Lset = G(R0), Lboard = G(R0), Lcast = G(R0), Lfront = G(R0), Ltop = G(R0), Lfg = G(R0), Lhud = G(root);

  /* ================= the living room ================= */
  const flat = pbFlat(Lset);
  Lfront.appendChild(flat.front); Ltop.appendChild(flat.top);
  const cNoon = chipAt(Lfg, '**12 noon**', { col: GOLD, size: 34 });
  const cStill = chipAt(Lfg, 'still raining', { col: BLUE });

  /* ---------- B: Rose's call and the menu ---------- */
  const CW = 540, CH = 330, CX = 850, CY = 335;
  const call = pbRoseCall(Lfg, CW, CH, 'Auntie Rose · Blk 208');
  const menu = G(Lfg);
  E('rect', { x: -200, y: -200, width: 400, height: 400, rx: 18, fill: '#FFFDF6', stroke: '#B5281E', 'stroke-width': 6 }, menu);
  E('rect', { x: -200, y: -200, width: 400, height: 60, rx: 18, fill: '#B5281E' }, menu);
  E('rect', { x: -200, y: -160, width: 400, height: 20, fill: '#B5281E' }, menu);
  T(menu, 0, -158, 'VEG MEAL DEAL', { size: 34, weight: 800, anchor: 'middle', fill: '#FFE45C', ls: 2 });
  const mSec = [
    ['1 of **4** mains', [['fried rice', 'mee goreng'], ['laksa', 'roti prata']]],
    ['1 of **3** drinks', [['teh', 'kopi', 'lime juice']]],
    ['1 of **2** desserts', [['chendol', 'ice kacang']]],
  ].map(([h, rows], i) => {
    const g = G(menu), y0 = [-104, 14, 100][i];
    mkText(g, -176, y0, h, { size: 28, fill: DRED, boldFill: DRED });
    rows.forEach((r, j) => r.forEach((it, k) => T(g, -176 + k * (r.length === 3 ? 108 : 180), y0 + 38 + j * 34, it, { size: 26, weight: 600, fill: INK, font: FB })));
    return g;
  });
  const cBoxes = chipAt(Lfg, 'only **6** boxes cooked', { col: RED, size: 30 });

  /* ---------- C: the whiteboard (menu grid, product rule) ---------- */
  const BX = 870, BY = 327, board = mkWhiteboard(Lboard, 560, 430); tr(board, BX, BY);
  const BL = BX - 280 + 24;                  // left edge of the writing area
  const counts = [['4', 'mains', '#B5281E'], ['3', 'drinks', '#2E6FD8'], ['2', 'desserts', DGREEN]].map(([n, w, col], i) => {
    const c = mkChip(Lboard, `**${n}** ${w}`, { size: 28, col, fill: '#FFFFFF' }); tr(c, BX - 175 + i * 175, 152); return c;
  });
  const GX = BL + 6, GY = 186, SW = 160, CWd = 118, HH = 46, RH = 58;
  const grid = G(Lboard);
  const mains = ['fried rice', 'mee goreng', 'laksa', 'roti prata'], drinks = ['teh', 'kopi', 'lime juice'];
  const gHead = G(grid);
  E('rect', { x: GX + SW, y: GY, width: CWd * 3, height: HH, rx: 8, fill: 'rgba(46,111,216,0.15)' }, gHead);
  E('rect', { x: GX, y: GY + HH, width: SW, height: RH * 4, rx: 8, fill: 'rgba(181,40,30,0.12)' }, gHead);
  drinks.forEach((d, j) => T(gHead, GX + SW + CWd * j + CWd / 2, GY + 33, d, { size: 26, weight: 700, anchor: 'middle', fill: '#2E6FD8' }));
  mains.forEach((m, i) => T(gHead, GX + 12, GY + HH + RH * i + 38, m, { size: 26, weight: 700, fill: '#B5281E' }));
  let gl = '';
  for (let i = 0; i <= 4; i++) gl += `M${GX + SW},${GY + HH + RH * i} H${GX + SW + CWd * 3} `;
  for (let j = 0; j <= 3; j++) gl += `M${GX + SW + CWd * j},${GY + HH} V${GY + HH + RH * 4} `;
  E('path', { d: gl, stroke: INK, 'stroke-width': 3, opacity: 0.7 }, gHead);
  const chendol = (parent, x, y) => { const g = G(parent); tr(g, x, y); E('path', { d: 'M-18,-4 Q0,20 18,-4 Z', fill: '#FFFFFF', stroke: INK, 'stroke-width': 2.5 }, g); E('path', { d: 'M-15,-6 Q0,-18 15,-6 Z', fill: '#6FCF6F', stroke: INK, 'stroke-width': 2 }, g); E('circle', { cx: -4, cy: -9, r: 3, fill: '#2E8A3A' }, g); E('circle', { cx: 5, cy: -8, r: 3, fill: '#8A5A30' }, g); return g; };
  const kacang = (parent, x, y) => { const g = G(parent); tr(g, x, y); E('path', { d: 'M-18,-2 Q0,20 18,-2 Z', fill: '#FFFFFF', stroke: INK, 'stroke-width': 2.5 }, g); E('path', { d: 'M-14,-4 Q-10,-26 0,-26 Q10,-26 14,-4 Z', fill: '#FF6B9A', stroke: INK, 'stroke-width': 2 }, g); E('path', { d: 'M-6,-20 Q0,-12 8,-20', fill: 'none', stroke: '#FFE45C', 'stroke-width': 3 }, g); return g; };
  const cells = [];
  for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) {
    const x = GX + SW + CWd * j, y = GY + HH + RH * i, g = G(grid);
    const dot = E('circle', { cx: x + CWd / 2, cy: y + RH / 2, r: 9, fill: '#B5281E' }, g);
    const split = G(g);
    E('rect', { x: x + 3, y: y + 3, width: CWd / 2 - 3, height: RH - 6, fill: 'rgba(111,207,111,0.22)' }, split);
    E('rect', { x: x + CWd / 2, y: y + 3, width: CWd / 2 - 3, height: RH - 6, fill: 'rgba(255,107,154,0.22)' }, split);
    E('path', { d: `M${x + CWd / 2},${y + 4} V${y + RH - 4}`, stroke: INK, 'stroke-width': 2, 'stroke-dasharray': '5 4' }, split);
    chendol(split, x + CWd / 4, y + RH / 2 + 4); kacang(split, x + CWd * 3 / 4, y + RH / 2 + 8);
    cells.push({ g, dot, split });
  }
  const legend = G(Lboard);
  chendol(legend, BL + 24, 500); T(legend, BL + 50, 509, 'chendol', { size: 26, weight: 700, fill: DGREEN });
  kacang(legend, BL + 214, 504); T(legend, BL + 240, 509, 'ice kacang', { size: 26, weight: 700, fill: '#D63A7A' });
  const c12 = mkChip(Lfg, '{{4 × 3 = 12}}', { size: 34, col: GOLD });
  const c24 = mkChip(Lfg, '{{12 × 2 = 24}}', { size: 34, col: GREEN });
  const cDad9 = mkChip(Lfg, '{{4 + 3 + 2 = 9}}', { size: 38, col: RED });
  const x9 = cross(Lfg, 34, '#FF5050');
  const rule = G(Lboard);
  T(rule, BX, 172, 'the PRODUCT RULE', { size: 36, weight: 800, anchor: 'middle', fill: '#B5281E', ls: 1 });
  const rule1 = mkText(rule, BX, 250, '{{m}} ways, then {{n}} ways', { size: 36, anchor: 'middle', fill: INK });
  const rule2 = mkText(rule, BX, 316, 'gives {{m × n}} ways together', { size: 36, anchor: 'middle', fill: INK });
  const rule3 = G(rule);
  E('rect', { x: BX - 200, y: 380, width: 400, height: 86, rx: 14, fill: 'rgba(30,158,90,0.12)', stroke: DGREEN, 'stroke-width': 4 }, rule3);
  mkMath(rule3, BX, 438, '4 × 3 × 2 = 24', { size: 44, anchor: 'middle', fill: INK });
  T(rule3, BX, 500, 'meal deals', { size: 28, weight: 700, anchor: 'middle', fill: DGREEN });

  /* ---------- D: Penny and Cubert ---------- */
  const metCard = G(Lfg);
  E('rect', { x: -150, y: -46, width: 300, height: 92, rx: 18, fill: 'rgba(10,27,39,0.9)', stroke: GOLD, 'stroke-width': 4 }, metCard);
  T(metCard, -126, 12, 'met today:', { size: 30, weight: 700, fill: C.ink });
  const tally = mkTally(metCard, 4, { h: 50, col: GOLD }); tr(tally, 40, -25);

  /* ---------- E: the coin sample spaces ---------- */
  const sGrid = G(Lboard);
  const QX = BL + 30, QY = 168, QS = 70, QC = 70, QH = 62;
  const qHead = G(sGrid);
  E('rect', { x: QX + QS, y: QY, width: QC * 6, height: QH, rx: 8, fill: 'rgba(46,111,216,0.12)' }, qHead);
  E('rect', { x: QX, y: QY + QH, width: QS, height: QH * 2, rx: 8, fill: 'rgba(184,134,11,0.18)' }, qHead);
  for (let j = 0; j < 6; j++) { const d = mkDice(qHead, j + 1, { size: 42 }); tr(d, QX + QS + QC * j + QC / 2, QY + QH / 2); }
  ['H', 'T'].forEach((s, i) => T(qHead, QX + QS / 2, QY + QH * (i + 1) + 42, s, { size: 34, weight: 800, anchor: 'middle', fill: '#B8860B' }));
  let ql = '';
  for (let i = 0; i <= 2; i++) ql += `M${QX + QS},${QY + QH * (i + 1)} H${QX + QS + QC * 6} `;
  for (let j = 0; j <= 6; j++) ql += `M${QX + QS + QC * j},${QY + QH} V${QY + QH * 3} `;
  E('path', { d: ql, stroke: INK, 'stroke-width': 3, opacity: 0.7 }, qHead);
  const qCells = [];
  ['H', 'T'].forEach((s, i) => { for (let j = 0; j < 6; j++) qCells.push(T(sGrid, QX + QS + QC * j + QC / 2, QY + QH * (i + 1) + 41, s + (j + 1), { size: 28, weight: 700, anchor: 'middle', fill: INK })); });
  const c2x6 = mkChip(Lboard, '{{2 × 6 = 12}} outcomes', { size: 32, col: '#2E6FD8', fill: '#FFFFFF' });
  // Ah Boy's three "outcomes"
  const boyCards = [['HH', 140], ['TT', 140], ['one of each', 210]].map(([s, w], i) => {
    const g = G(Lboard);
    E('rect', { x: -w / 2, y: -58, width: w, height: 116, rx: 14, fill: '#FFF4E8', stroke: '#E8823A', 'stroke-width': 4 }, g);
    T(g, 0, -12, s, { size: 30, weight: 800, anchor: 'middle', fill: INK });
    mkMath(g, 0, 38, '1/3', { size: 30, anchor: 'middle', fill: DRED });
    const x = cross(g, 22, '#E53935'); tr(x, 0, 22); g.x = x;
    return g;
  });
  const BCX = [BX - 185, BX - 30, BX + 160];
  const list = mkTable(Lboard, [['', '2nd: H', '2nd: T'], ['1st: H', 'HH', 'HT'], ['1st: T', 'TH', 'TT']], { size: 28, colW: [124, 124, 124], rowH: 58, side: true, ink: INK, fill: '#FFFFFF', headFill: 'rgba(184,134,11,0.22)' });
  const LX = BX - 186, LY = 282; tr(list, LX, LY);
  const listCells = [[1, 1], [1, 2], [2, 1], [2, 2]];
  const mHT = list.mark(1, 2, 'rgba(255,201,60,0.55)'), mTH = list.mark(2, 1, 'rgba(255,201,60,0.55)');
  const c4 = mkChip(Lboard, '**4** outcomes', { size: 30, col: DGREEN, fill: '#FFFFFF' });
  const cHT = chipAt(Lfg, '{{"HT"}}: heads **then** tails', { col: GOLD, size: 28 });
  const cTH = chipAt(Lfg, '{{"TH"}}: tails **then** heads', { col: GOLD, size: 28 });
  const workH = mkWorking(Lboard, BX - 10, 150, ['P("one of each") = 2/4 = 1/2'], { size: 36, fill: INK, ringCol: DGREEN });
  const mini = G(Lboard);
  const MC = 20;
  E('rect', { x: 0, y: 0, width: MC * 6, height: MC * 6, fill: 'rgba(46,111,216,0.12)', stroke: '#2E6FD8', 'stroke-width': 3 }, mini);
  let ml = ''; for (let i = 1; i < 6; i++) ml += `M${i * MC},0 V${MC * 6} M0,${i * MC} H${MC * 6} `;
  E('path', { d: ml, stroke: '#2E6FD8', 'stroke-width': 1.5, opacity: 0.7 }, mini);
  T(mini, MC * 3, -12, 'two dice', { size: 26, weight: 700, anchor: 'middle', fill: '#2E6FD8' });
  const m36 = mkMath(Lboard, 0, 0, '6 × 6 = 36', { size: 40, anchor: 'start', fill: INK });

  /* ================= the cast ================= */
  const kav = cast(Lcast, 'kavya');
  const dad = cast(Lcast, 'dad', { prop: null, hand: true });
  const tan = cast(Lcast, 'tan', { prop: null });
  const boy = cast(Lcast, 'boy');
  const cube = cast(Ltop, 'cube');
  const penny = cast(Ltop, 'penny');
  const rose = call.rose;
  const ltRose = pbLowerThird(Lhud, 'rose'), ltPenny = pbLowerThird(Lhud, 'penny');
  // Dad's umbrella, Ah Boy's fork
  const umb = G(dad.hand); tr(umb, 0, 0, 1, -26);
  E('path', { d: 'M0,26 Q0,40 -12,40 Q-22,40 -22,30', fill: 'none', stroke: '#6B4423', 'stroke-width': 6, 'stroke-linecap': 'round' }, umb);
  E('path', { d: 'M0,26 L0,-150', stroke: '#5A6670', 'stroke-width': 5 }, umb);
  E('path', { d: 'M0,-160 Q-22,-90 -14,-20 L0,-28 L14,-20 Q22,-90 0,-160 Z', fill: '#2E6FD8', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, umb);
  E('path', { d: 'M0,-160 L0,-176', stroke: '#5A6670', 'stroke-width': 4 }, umb);
  const fork = G(boy.hand); tr(fork, 0, -6);
  E('path', { d: 'M0,10 L0,-50 M-9,-50 L-9,-70 M0,-50 L0,-72 M9,-50 L9,-70 M-9,-50 L9,-50', fill: 'none', stroke: '#9AA6B2', 'stroke-width': 4.5, 'stroke-linecap': 'round' }, fork);

  /* cut points */
  const k = id => at(id) - 0.06;
  const cutB = k('rose'), cutC = k('dad'), cutB2 = k('boxes'), cutD = k('penny'), cutE = k('grid'), cutF = k('bored');

  return t => {
    const sA = on(t, -1, cutB), sB = on(t, cutB, cutC), sC = on(t, cutC, cutB2), sB2 = on(t, cutB2, cutD), sD = on(t, cutD, cutE),
      sE = on(t, cutE, cutF), sF = on(t, cutF, 1e9);
    const show = { kav: 0, dad: 0, tan: 0, boy: 0, cube: 0, penny: 0 };
    [call, menu, grid, legend, rule, metCard, sGrid, list, mini, m36, x9].concat(boyCards).forEach(e => op(e, 0));
    [cNoon, cStill, cBoxes, c12, c24, cDad9, c2x6, c4, cHT, cTH].concat(counts).forEach(c => c.set(0));
    ltRose.set(0); ltPenny.set(0);
    op(Lboard, sC || sE); op(board, sC || sE); op(workH, 0);

    flat.upd(t, 1);
    flat.clock(12, Math.min(40, t * 0.5));

    /* ---------- A: noon ---------- */
    if (sA) {
      show.dad = 1; show.kav = 1;
      tr(dad, 960, 414, 1.0); tr(kav, 330, 418, 1.0);
      dad.set({ t, talk: 0, mood: 'neutral', look: -0.6 + 0.3 * Math.sin(t * 1.5), lift: 1 });
      kav.set({ t, mood: 'neutral', look: 0.8 });
      popSet(cNoon, t, at('noon') + 0.05, 1e9, 620, 200);
      popSet(cStill, t, mid('noon', 0.2), 1e9, 300, 200);
    }

    /* ---------- B / B2: Auntie Rose on the call ---------- */
    if (sB || sB2) {
      const cp = sB ? P(t, cutB + 0.02, 0.3, pop) : 1;
      op(call, clamp(cp * 3)); tr(call, CX, CY, Math.max(0.01, 0.9 + 0.1 * cp));
      const roseMood = sB ? 'happy' : t < mid('boxes', 0.45) ? 'shock' : 'happy';
      rose.set({ t, talk: scTalk(S, t, 'rose'), mood: roseMood, look: 0, still: false });
      tr(rose.parentNode, -CW * 0.12, CH * 0.2 - (sB2 && t > mid('boxes', 0.45) ? Math.abs(Math.sin(t * 9)) * 10 * AMP : 0));
      if (sB) {
        ltRose.set(win(t, at('rose') + 0.1, at('rose') + 3.2, 0.3));
        const mp = P(t, mid('rose', 0.18), 0.35, pop);
        op(menu, clamp(mp * 3)); tr(menu, 300, 336, Math.max(0.01, 0.9 + 0.1 * mp));
        mSec.forEach((g, i) => op(g, P(t, mid('rose', [0.3, 0.56, 0.78][i]), 0.25, linear)));
      } else {
        show.kav = 1; show.dad = 1;
        tr(kav, 170, 418, 1.0); tr(dad, 400, 414, 1.0);
        kav.set({ t, mood: t < mid('boxes', 0.5) ? 'neutral' : 'deadpan', look: 0.9 });
        dad.set({ t, mood: t < mid('boxes', 0.5) ? 'shock' : 'sad', look: 0.9, lift: 0 });
        popSet(cBoxes, t, mid('boxes', 0.55), 1e9, CX, 628);
      }
    }

    /* ---------- C: the menu grid and the product rule ---------- */
    if (sC) {
      const inRule = t >= at('rule') - 0.06;
      show.kav = 1;
      if (!inRule) {
        show.dad = 1;
        tr(dad, 180, 414, 1.0); tr(kav, 410, 418, 1.0);
        const wrong = t >= mid('kavya', 0.85);
        dad.set({ t, talk: scTalk(S, t, 'dad'), mood: wrong ? 'shock' : 'smug', look: t < at('kavya') ? 0.3 : 0.9, lift: 0 });
        kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: t < at('kavya') ? 'deadpan' : wrong ? 'smug' : 'neutral', look: t < at('kavya') ? -0.9 : 0.9 });
        counts.forEach((c, i) => c.set(P(t, mid('dad', 0.1 + i * 0.16), 0.3, linear)));
        popSet(cDad9, t, mid('dad', 0.5), 1e9, 300, 225);
        if (t >= mid('kavya', 0.85)) { op(x9, P(t, mid('kavya', 0.85), 0.2, linear)); tr(x9, 300, 225, 1.2); }
        if (t >= at('kavya')) {
          op(grid, 1); op(gHead, P(t, at('kavya'), 0.3, linear));
          cells.forEach((c, i) => {
            op(c.g, P(t, mid('kavya', 0.05 + i * 0.03), 0.15, linear));
            const sp = P(t, mid('kavya', 0.55 + i * 0.012), 0.2, linear);
            op(c.dot, 1 - sp); op(c.split, sp);
          });
          op(legend, P(t, mid('kavya', 0.55), 0.3, linear));
          popSet(c12, t, mid('kavya', 0.38), 1e9, 400, 628);
          popSet(c24, t, mid('kavya', 0.75), 1e9, 760, 628);
        }
      } else {
        show.tan = 1;
        tr(tan, 180, 410, 1.0); tr(kav, 410, 418, 1.0);
        tan.set({ t, talk: scTalk(S, t, 'tan'), mood: 'happy', look: 0.9 });
        kav.set({ t, mood: 'neutral', look: -0.9 });
        op(rule, 1);
        op(rule1, P(t, mid('rule', 0.15), 0.3, linear)); op(rule2, P(t, mid('rule', 0.5), 0.3, linear));
        op(rule3, P(t, mid('rule', 0.72), 0.3, linear));
        c12.set(0); c24.set(1); tr(c24, 600, 628);
      }
    }

    /* ---------- D: Penny ---------- */
    if (sD) {
      show.boy = 1; show.kav = 1; show.cube = 1; show.penny = 1;
      tr(boy, 200, 440, 1.0); tr(kav, 1040, 418, 1.0);
      const pIn = P(t, cutD, 0.9, easeOut), hop = Math.abs(Math.sin(t * 7)) * (t < at('met') ? 26 : 8) * AMP;
      tr(penny, lerp(-120, 470, pIn), onTable(0.78, 129) - hop, 0.78);
      penny.set({ t, talk: scTalk(S, t, 'penny'), mood: 'happy', look: 0.6, flip: t < at('penny') + 1.2 ? (t * 1.8) % 1 : 0 });
      ltPenny.set(win(t, at('penny') + 0.1, at('penny') + 3.2, 0.3));
      tr(cube, 790, onTable(0.75, 138), 0.75);
      cube.set({ t, talk: scTalk(S, t, 'cube'), mood: 'deadpan', look: -0.8 });
      boy.set({ t, mood: 'happy', look: 0.6 });
      kav.set({ t, mood: t < at('met') ? 'happy' : 'deadpan', look: -0.7 });
      popG(metCard, t, mid('met', 0.4), 1e9, 790, 250);
      tally.set(clamp((t - mid('met', 0.45)) / 0.4 * 4, 0, 4));
    }

    /* ---------- E: coins, dice, outcomes ---------- */
    if (sE) {
      show.kav = 1; show.boy = 1; show.penny = 1;
      tr(kav, 150, 418, 1.0); tr(boy, 362, 442, 1.0);
      const fl = t < mid('grid', 0.5) || (t >= at('order') && t < mid('order', 0.5));
      tr(penny, 495, onTable(0.6, 129) - (fl ? Math.abs(Math.sin(t * 7)) * 14 * AMP : 0), 0.6);
      penny.set({ t, talk: scTalk(S, t, 'penny'), mood: 'happy', look: t < at('boy') ? 0.8 : -0.6, flip: fl ? (t * 1.6) % 1 : 0 });
      const boyWrong = t >= mid('half', 0.1);
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: t < at('list') ? 'happy' : boyWrong ? 'shock' : 'neutral', look: t < at('boy') ? 0.8 : t < at('list') ? 0.9 : -0.8, lift: 0 });
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: t < at('list') ? 'neutral' : t >= mid('half', 0.4) ? 'smug' : 'neutral', look: t < at('list') ? 0.8 : 0.9 });
      op(fork, 0);
      // the coin x dice grid
      if (t < at('boy')) {
        op(sGrid, 1); op(qHead, P(t, cutE + 0.05, 0.3, linear));
        qCells.forEach((c, i) => op(c, P(t, mid('grid', 0.2 + i * 0.045), 0.12, linear)));
        popSet(c2x6, t, mid('grid', 0.78), 1e9, BX, 470);
      } else {
        // Ah Boy's three cards
        const fade = t >= mid('half', 0.3) ? 1 - P(t, mid('half', 0.3), 0.25, linear) : 1;
        boyCards.forEach((c, i) => {
          const p = P(t, mid('boy', 0.12 + i * 0.2), 0.3, pop);
          op(c, clamp(p * 3) * fade * (t >= at('list') && t < mid('half', 0.1) ? 0.55 : 1)); tr(c, BCX[i], 208, Math.max(0.01, 0.8 + 0.2 * p));
          op(c.x, t >= mid('half', 0.08) ? P(t, mid('half', 0.08 + i * 0.03), 0.15, linear) : 0);
        });
        if (t >= at('list')) {
          const after = t >= mid('half', 0.62);
          op(list, after ? 1 - P(t, mid('half', 0.62), 0.25, linear) : P(t, at('list'), 0.3, linear));
          listCells.forEach(([r, c], i) => op(list.cells[r][c], P(t, mid('list', [0.5, 0.58, 0.68, 0.76][i]), 0.15, linear)));
          op(list.cells[0][1], 1); op(list.cells[0][2], 1);
          popSet(c4, t, mid('list', 0.86), mid('half', 0.62), BX, 488);
          const ho = t >= at('order') ? 1 : 0;
          mHT.set(ho * P(t, mid('order', 0.05), 0.25, linear)); mTH.set(ho * P(t, mid('order', 0.3), 0.25, linear));
          popSet(cHT, t, mid('order', 0.1), cutF, 400, 628);
          popSet(cTH, t, mid('order', 0.33), cutF, 790, 628);
          if (t >= at('half')) {
            op(workH, 1); workH.show(0, P(t, mid('half', 0.32), 0.35)); workH.ring(0, P(t, mid('half', 0.45), 0.25, linear));
            const mp = P(t, mid('half', 0.66), 0.35, pop);
            op(mini, clamp(mp * 3)); tr(mini, BX - 210, 300, Math.max(0.01, 0.85 + 0.15 * mp));
            op(m36, P(t, mid('half', 0.74), 0.3, linear)); tr(m36, BX - 50, 380);
          }
        }
      }
    }

    /* ---------- F: lunch ---------- */
    if (sF) {
      show.boy = 1; show.penny = 1; show.cube = 1; show.kav = 1;
      tr(boy, 600, 442, 1.05); tr(kav, 1040, 418, 1.0);
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: t < end('bored') ? 'deadpan' : 'sad', look: 0, lift: 1 });
      op(fork, 1);
      tr(penny, 330, onTable(0.7, 129), 0.7);
      penny.set({ t, mood: 'happy', look: 0.9 });
      tr(cube, 820, onTable(0.72, 138), 0.72);
      cube.set({ t, mood: 'deadpan', look: -0.9 });
      kav.set({ t, mood: 'deadpan', look: -0.9 });
      const push = P(t, end('bored'), 1.6, linear);
      R0.setAttribute('transform', `translate(600 400) scale(${(1 + 0.05 * push).toFixed(4)}) translate(-600 -400)`);
    } else R0.removeAttribute('transform');

    op(kav, show.kav); op(dad, show.dad); op(tan, show.tan); op(boy, show.boy); op(cube, show.cube); op(penny, show.penny);
  };
});
