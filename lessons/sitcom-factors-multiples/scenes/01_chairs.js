/* Scene 1: Thirty-six chairs (factors, factor pairs, multiples, primes, composites, 1 is neither).
   One set, the void deck at 5:15 p.m.: the humans behind the party table on the left, a FLOOR PLAN panel on the
   right where 36 red plastic chairs move from rectangle to rectangle.
   five: 36 chairs in stacks, Mum's plan "chairs: rectangle" -> rows: Ah Boy (lower third), 5 rows of 7 + 1 ->
   rem: 36 ÷ 5 = 7 r 1, the leftover chair glows red -> left: One pops up on the leftover chair -> factor: Big Two
   on the end of the table, "a factor divides exactly", "find them in pairs" -> pairs: 1 × 36 (a line that runs off
   the plan), 2 × 18, 3 × 12, 4 × 9, 5 ✗, 6 × 6 -> met: 9 × 4, 12 × 3 crossed out, STOP -> list: the nine factors,
   Mum ticks her plan -> square: the 6 × 6 square, gold outline, Paati's gold star -> make: multiples of 36 on a
   number line, "Factors fit in. Multiples make more." -> priya: Priya (lower third), 23 blue chairs -> line: 2 rows
   (1 left over), 3 rows (2 left over), one long line 1 × 23 -> prime: PRIME, factors 1 and 23; Dad's bubble-tea
   sign -> comp: 23 prime, 36 composite (COMPOSITE), 1 neither (One on the card). */
scene('chairs', S => {
  const { at, end, mid } = S, root = S.root;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const pill = (parent, text, o) => { o = o || {}; return mkChip(parent, text, { size: o.size || 30, col: o.col || C.ink }); };
  const popSet = (el, t, t0, t1, x, y) => { const p = t >= t0 && t < t1 ? P(t, t0, 0.35, linear) : 0; el.set(p); if (x !== undefined) tr(el, x, y); };
  const fadeIn = (el, t, t0, t1) => { const p = t >= t0 && t < (t1 === undefined ? 1e9 : t1) ? P(t, t0, 0.3, easeOut) : 0; op(el, p); return p; };
  const GOLD = '#FFE45C', PINK = '#FF8FC8', RED = '#FF6B6B', GREEN = '#56D69B', LIL = '#C9B6FF', BLUE = '#6EC8FF';

  /* layers */
  const Lbg = G(root), Lpanel = G(root), Lcast = G(root), Lfront = G(root), Lfg = G(root), Lhud = G(root);

  /* ---------- the void deck ---------- */
  const vd = fmVoid(Lbg);
  Lfront.appendChild(vd.front); Lfront.appendChild(vd.top);

  /* ---------- the FLOOR PLAN panel ---------- */
  const PX0 = 470, PX1 = 1170, PY0 = 112, PY1 = 508, PCX = (PX0 + PX1) / 2;
  E('rect', { x: PX0 + 6, y: PY0 + 6, width: PX1 - PX0, height: PY1 - PY0, rx: 18, fill: 'rgba(0,0,0,0.25)' }, Lpanel);
  E('rect', { x: PX0, y: PY0, width: PX1 - PX0, height: PY1 - PY0, rx: 18, fill: '#12222E', stroke: '#8FA3B8', 'stroke-width': 4 }, Lpanel);
  let grid = '';
  for (let x = PX0 + 35; x < PX1; x += 35) grid += `M${x},${PY0 + 4} L${x},${PY1 - 4} `;
  for (let y = PY0 + 35; y < PY1; y += 35) grid += `M${PX0 + 4},${y} L${PX1 - 4},${y} `;
  E('path', { d: grid, stroke: '#2A3E4E', 'stroke-width': 1.5 }, Lpanel);
  const cpId = 'fmChairsClip';
  const cp = E('clipPath', { id: cpId }, defs()); E('rect', { x: PX0 + 3, y: PY0 + 3, width: PX1 - PX0 - 6, height: PY1 - PY0 - 6, rx: 16 }, cp);
  const Lplan = G(Lpanel, { 'clip-path': `url(#${cpId})` });

  // the leftover chair's red glow, then the chairs
  const glowL = E('circle', { r: 40, fill: glow('#FF3B3B') }, Lplan);
  const goldSq = E('rect', { x: 0, y: 0, width: 10, height: 10, rx: 10, fill: 'none', stroke: GOLD, 'stroke-width': 6 }, Lplan);
  // one set of 36 chairs: red for the 36, then 23 of them repainted blue for Priya's family
  const redG = G(Lplan), blueG = redG;
  const red = [];
  for (let i = 0; i < 36; i++) red.push(fmChair(redG, '#E8424F'));
  const blue = red.slice(0, 23);
  const paint = (ch, c) => {
    const dk = mkShade(c, -0.3), [a, b, d] = ch.children;
    attr(a, 'fill', c); attr(a, 'stroke', dk); attr(b, 'fill', mkShade(c, 0.15)); attr(b, 'stroke', dk); attr(d, 'stroke', dk);
  };
  let painted = 'red';

  /* chair layouts: i -> [x, y, scale] */
  const CH = 52;   // a chair is about 44 x 52 at scale 1
  const rect = (r, c, cx, cy, cell) => i => {
    const row = Math.floor(i / c), col = i % c;
    return [cx - (c - 1) * cell / 2 + col * cell, cy - (r - 1) * cell / 2 + row * cell, cell / CH];
  };
  const stacks = (n, x0, dx, per) => i => [x0 + Math.floor(i / per) * dx, 430 - (i % per) * 11, 1.05];
  const fiveRows = i => (i < 35 ? rect(5, 7, 650, 245, 46)(i) : [512, 494 - 46 + 8, 46 / CH]);
  const lineOf = (n, x0, y, cell) => i => [x0 + i * cell, y, cell / CH];
  const CA = 945, CB = 320;   // centre of the chair area in "pairs" mode
  const RL = {
    pile: stacks(36, 560, 94, 6),
    five: fiveRows,
    p1: lineOf(36, 740, CB, 30),
    p2: rect(2, 18, CA, CB, 24),
    p3: rect(3, 12, CA, CB, 35),
    p4: rect(4, 9, CA, CB, 46),
    p6: rect(6, 6, CA, CB, 50),
    sq: rect(6, 6, PCX, 292, 52),
  };
  const BL = {
    pile: stacks(23, 700, 110, 6),
    r2: i => (i < 22 ? rect(2, 11, PCX, 250, 46)(i) : [PCX - 5 * 46, 250 + 46 + 52, 46 / CH]),
    r3: i => (i < 21 ? rect(3, 7, PCX, 240, 50)(i) : [PCX - 3 * 50 + (i - 21) * 50, 240 + 50 + 58, 50 / CH]),
    line: lineOf(23, PCX - 11 * 28, 300, 28),
  };
  const lay = (keys, list, t, i) => {
    let k = 0;
    for (let j = 0; j < keys.length; j++) if (t >= keys[j][0]) k = j;
    const cur = list[keys[k][1]](i);
    if (k === 0) return cur;
    const prev = list[keys[k - 1][1]](i);
    const p = P(t, keys[k][0] + i * 0.008, 0.5, ease);
    return [lerp(prev[0], cur[0], p), lerp(prev[1], cur[1], p) - Math.sin(p * Math.PI) * 18, lerp(prev[2], cur[2], p)];
  };

  /* ---------- panel contents ---------- */
  // phase 1: five rows
  const cRows = pill(Lpanel, '**5** rows?', { col: GOLD, size: 30 });
  const mRem = G(Lpanel);
  mkMath(mRem, 0, 0, '36 ÷ 5 = 7 "r" 1', { size: 42, fill: C.ink, anchor: 'middle' });
  const cNot = pill(Lpanel, '**5** is **not** a\nfactor of 36', { col: RED, size: 28 });
  const cOne = pill(Lpanel, 'the leftover **1**', { col: '#FFE9A8', size: 28 });
  const cFac = pill(Lpanel, 'a **factor** divides\n**exactly**', { col: GOLD, size: 30 });
  const cPairs = pill(Lpanel, 'find them in **pairs**,\nstarting at **1**', { col: LIL, size: 28 });
  // phase 2: the factor-pair list
  const head = mkText(Lpanel, 595, 160, 'factor pairs', { size: 30, anchor: 'middle', fill: GOLD, weight: 700 });
  const PAIRS = ['1 * 36', '2 * 18', '3 * 12', '4 * 9', '5', '6 * 6'];
  const pairs = PAIRS.map((src, i) => {
    const g = G(Lpanel), y = 214 + i * 50;
    const m = mkMath(g, 595, y, src, { size: 38, fill: i === 4 ? RED : C.ink, anchor: 'middle' });
    if (i === 4) { const x = cross(g, 12); tr(x, 595 + m.w / 2 + 26, y - 13); }
    return g;
  });
  const sqRing = E('rect', { x: 530, y: 214 + 5 * 50 - 34, width: 130, height: 46, rx: 10, fill: 'none', stroke: GOLD, 'stroke-width': 4 }, Lpanel);
  const div = E('line', { x1: 712, y1: 140, x2: 712, y2: 480, stroke: '#3A5468', 'stroke-width': 3 }, Lpanel);
  // met: the swaps, crossed out
  const swap = G(Lpanel);
  E('rect', { x: CA - 200, y: 196, width: 400, height: 238, rx: 16, fill: 'rgba(10,27,39,0.94)', stroke: RED, 'stroke-width': 3 }, swap);
  const sw1 = mkMath(swap, CA, 256, '9 * 4', { size: 40, fill: RED, anchor: 'middle' });
  const sw2 = mkMath(swap, CA, 314, '12 * 3', { size: 40, fill: RED, anchor: 'middle' });
  const swS1 = strike(swap, CA - 70, 242, CA + 70, RED), swS2 = strike(swap, CA - 80, 300, CA + 80, RED);
  mkText(swap, CA, 380, 'same pairs, **swapped round**', { size: 28, anchor: 'middle', fill: C.ink, boldFill: RED });
  const cStop = pill(Lpanel, '**STOP** at {{6 × 6}}', { col: RED, size: 32 });
  const metArrow = arrow(Lpanel, 664, 464, CA - 206, 410, { color: GOLD, width: 4, bend: 30 });
  // list: the nine factors
  const listCard = G(Lpanel);
  E('rect', { x: CA - 212, y: 150, width: 424, height: 330, rx: 16, fill: 'rgba(10,27,39,0.94)', stroke: GOLD, 'stroke-width': 3 }, listCard);
  const F9 = ['1', '2', '3', '4', '6', '9', '12', '18', '36'];
  const fNums = F9.map((s, i) => {
    const row = i < 5 ? 0 : 1, col = i < 5 ? i : i - 5, n = row ? 4 : 5;
    const x = CA - (n - 1) * 72 / 2 + col * 72, y = 250 + row * 76;
    const g = G(listCard); tr(g, x, y);
    const inner = G(g);
    mkMath(inner, 0, 0, s, { size: 46, fill: C.ink, anchor: 'middle' });
    return g;
  });
  const c9 = pill(Lpanel, '**9** factors', { col: GOLD, size: 32 });
  // square
  const mSq = G(Lpanel);
  mkText(mSq, PCX, 486, '{{6 × 6 = 36}}: a **square**', { size: 34, anchor: 'middle', fill: C.ink, boldFill: GOLD });
  // make: multiples
  const mult = G(Lpanel);
  mkText(mult, PCX, 168, '**Multiples** of {{36}}: {{36}}, {{72}}, {{108}}, …', { size: 32, anchor: 'middle', fill: C.ink, boldFill: GOLD });
  const nl = mkNumberLine(mult, { from: 0, to: 144, step: 36, len: 500, size: 30,
    hops: [0, 1, 2, 3].map(k => ({ a: 36 * k, b: 36 * (k + 1), label: '+36', col: GOLD, height: 56, size: 26 })) });
  tr(nl, 545, 316);
  const forever = mkText(mult, 1100, 262, '**forever**', { size: 28, anchor: 'middle', fill: GOLD });
  const cFit = pill(Lpanel, '**Factors fit in.**', { col: GREEN, size: 32 });
  const cMore = pill(Lpanel, '**Multiples make more.**', { col: PINK, size: 32 });
  // priya / line / prime
  const c23 = pill(Lpanel, '**23** people', { col: BLUE, size: 32 });
  const cTry2 = pill(Lpanel, '{{2}} rows: **1** left over ✗', { col: RED, size: 28 });
  const cTry3 = pill(Lpanel, '{{3}} rows: **2** left over ✗', { col: RED, size: 28 });
  const mLine = G(Lpanel);
  mkText(mLine, PCX, 400, 'only {{1 × 23}}: one long line', { size: 34, anchor: 'middle', fill: C.ink });
  const c1and23 = pill(Lpanel, 'factors: **1** and **23**', { col: GREEN, size: 32 });
  const stPrime = fmStamp(Lpanel, 'prime');
  // comp: the three kinds
  const kinds = [['{{23}}: **2** factors', '**prime**', GREEN], ['{{36}}: **9** factors', '**composite**', RED], ['{{1}}: **1** factor', '**neither**', '#FFE9A8']].map(([a, b, col], i) => {
    const g = G(Lpanel), y = 128 + i * 126;
    E('rect', { x: PX0 + 22, y, width: 656, height: 112, rx: 14, fill: 'rgba(10,27,39,0.94)', stroke: col, 'stroke-width': 3 }, g);
    mkText(g, PX0 + 40, y + 70, a, { size: 34, fill: C.ink });
    mkText(g, PX0 + 290, y + 70, '→ ' + b, { size: 34, fill: col, boldFill: col });
    return g;
  });
  const stComp = fmStamp(Lpanel, 'comp');

  /* ---------- HUD chips ---------- */
  const cTime = pill(Lhud, '**5:15 p.m.**', { col: GOLD, size: 32 });
  const cPlan = pill(Lhud, 'plan: chairs in a **rectangle**', { col: '#FFC2E0', size: 28 });
  const cTick = pill(Lhud, '✓ **equal** rows', { col: GREEN, size: 28 });
  const star = G(Lhud);
  E('path', { d: 'M0,-26 L7.6,-8 L26,-8 L11,4 L16,23 L0,12 L-16,23 L-11,4 L-26,-8 L-7.6,-8 Z', fill: GOLD, stroke: '#8A6A10', 'stroke-width': 3, 'stroke-linejoin': 'round' }, star);
  const cBoyQ = mkSpeechBubble(Lhud, '**multiples?**', { size: 28, tail: 'down', tailX: -20 });
  const sign = G(Lpanel);
  E('path', { d: 'M-60,0 L-40,-82 M60,0 L40,-82', stroke: '#5A4A3A', 'stroke-width': 6, 'stroke-linecap': 'round' }, sign);
  E('rect', { x: -96, y: -112, width: 192, height: 78, rx: 10, fill: '#FFF3D6', stroke: '#8A5A2A', 'stroke-width': 4 }, sign);
  T(sign, 0, -80, 'BUBBLE TEA', { size: 27, weight: 800, anchor: 'middle', fill: '#8A3A1A' });
  T(sign, 0, -47, 'QUEUE →', { size: 27, weight: 800, anchor: 'middle', fill: '#8A3A1A' });

  /* ---------- the cast ---------- */
  const boy = cast(Lcast, 'boy');
  const kav = cast(Lcast, 'kavya');
  const mum = cast(Lcast, 'mum');
  const paati = cast(Lcast, 'paati');
  const priya = cast(Lcast, 'priya');
  const dad = cast(Lcast, 'dad', { prop: null });
  const two = cast(Lcast, 'two');
  const one = cast(Lfg, 'one');
  const lt = { boy: fmLowerThird(Lhud, 'boy'), priya: fmLowerThird(Lhud, 'priya') };
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* ---------- timing ---------- */
  const k = id => at(id) - 0.06;
  const cF = k('factor'), cSq = k('square'), cMk = k('make'), cPr = k('priya'), cPm = k('prime');
  const pb = f => mid('pairs', f);
  const PB = [0.04, 0.2, 0.37, 0.53, 0.69, 0.84].map(pb);
  const RK = [[-9, 'pile'], [at('rows') + 0.1, 'five'], [PB[0], 'p1'], [PB[1], 'p2'], [PB[2], 'p3'], [PB[3], 'p4'], [PB[5], 'p6'], [at('square') + 0.05, 'sq']];
  const BK = [[-9, 'pile'], [at('line') + 0.05, 'r2'], [mid('line', 0.3), 'r3'], [mid('line', 0.54), 'line']];
  const SA = 235, SB = 360, SY = 440, SS = 0.76;

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    vd.upd(t);
    for (const kk in lt) lt[kk].set(0);
    [cRows, cNot, cOne, cFac, cPairs, cStop, c9, cFit, cMore, c23, cTry2, cTry3, c1and23, cTime, cPlan, cTick, cBoyQ].forEach(c => c.set(0));
    [mRem, head, div, swap, listCard, mSq, mult, mLine, glowL, goldSq, sqRing, star, sign, metArrow, redG, blueG].forEach(e => op(e, 0));
    pairs.forEach(p => op(p, 0)); kinds.forEach(g => op(g, 0)); stPrime.set(0); stComp.set(0);
    const vis = { boy: 0, kav: 0, mum: 0, paati: 0, priya: 0, dad: 0, two: 0, one: 0 };
    const who = scWho(S, t);
    const put = (c, key, x, y, st) => { vis[key] = 1; tr(c, x, y, SS); c.set(Object.assign({ t }, st)); };

    /* ===== the red chairs ===== */
    const redOn = t < cPr;
    const want = redOn ? 'red' : 'blue';
    if (painted !== want) { blue.forEach(ch => paint(ch, redOn ? '#E8424F' : '#2E7DD8')); painted = want; }
    red.forEach((ch, i) => op(ch, redOn || i < 23 ? 1 : 0));
    if (redOn) {
      op(redG, t >= at('list') && t < cSq ? 0.18 : t >= at('met') && t < cSq ? 0.25 : 1);
      red.forEach((ch, i) => { const [x, y, s] = lay(RK, RL, t, i); tr(ch, x, y, s); });
    }

    /* ===== phase 1: five rows (Ah Boy, Kavya, Mum) ===== */
    if (t < cF) {
      popSet(cTime, t, at('five') + 0.1, 1e9, 1060, 62);
      const lookP = who === 'boy' ? -0.9 : who === 'kavya' ? -0.9 : 0.8;
      put(boy, 'boy', 110, SY + 6, { talk: scTalk(S, t, 'boy'), mood: 'happy', look: who === 'boy' ? 0.7 : who === 'one' ? 1 : 0.5, lift: t >= at('rows') - 0.2 && t < end('rows') + 0.4 ? 1 : 0 });
      let km = 'neutral', kl = 0.6;
      if (who === 'boy' || (t >= at('rows') && t < at('rem'))) { kl = -0.8; }
      if (t >= at('rem') && t < at('left')) { km = t > mid('rem', 0.7) ? 'smug' : 'neutral'; kl = 0.9; }
      if (t >= at('left')) { km = 'deadpan'; kl = 1; }
      put(kav, 'kav', SA, SY, { talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
      put(mum, 'mum', SB, SY, { talk: 0, mood: t >= at('left') ? 'deadpan' : 'neutral', look: t < at('rows') ? 0.9 : who === 'boy' ? -0.8 : 0.9, lift: t < at('rem') ? 1 : 0 });
      lt.boy.set(win(t, at('rows') + 0.05, at('rows') + 3.2, 0.3));
      popSet(cPlan, t, mid('five', 0.55), at('rem'), 300, 268);
      popSet(cRows, t, mid('rows', 0.3), cF, 995, 172);
      if (t >= at('rem')) {
        fadeIn(mRem, t, mid('rem', 0.1)); tr(mRem, 995, 276);
        popSet(cNot, t, mid('rem', 0.62), cF, 995, 362);
        const gp = P(t, mid('rem', 0.4), 0.4, linear);
        op(glowL, gp * (0.75 + 0.25 * Math.sin(t * 8))); tr(glowL, 512, 494 - 46 + 8);
      }
      if (t >= at('left') - 0.15) {
        const up = P(t, at('left') - 0.15, 0.45, pop);
        vis.one = 1; tr(one, 512, 456 - 150 * 0.3 * up - 6, 0.3 * Math.max(0.01, up));
        one.set({ t, talk: scTalk(S, t, 'one'), mood: 'happy', look: 0.5, wave: 1 });
        popSet(cOne, t, mid('left', 0.4), cF, 995, 448);
      }
    }

    /* ===== Big Two on the end of the table, from 'factor' ===== */
    if (t >= cF) {
      vis.two = 1;
      const s2 = 0.56;
      let tm = 'deadpan', tl = 0.6, list = 0, stamp = 0;
      if (t >= at('pairs') && t < at('met')) { list = P(t, at('pairs'), 0.4, ease); tl = 1; }
      if (t >= at('met') && t < at('list')) { tm = 'deadpan'; tl = 0.8; }
      if (t >= at('square') && t < at('make')) { tl = 0.8; }
      if (t >= at('prime') && t < at('comp')) { stamp = P(t, mid('prime', 0.45), 0.35, ease) * (1 - P(t, mid('prime', 0.66), 0.3, ease)); tm = stamp > 0.1 ? 'smug' : 'deadpan'; tl = 1; }
      if (t >= at('comp')) { stamp = P(t, at('comp') + 0.1, 0.35, ease) * (1 - P(t, mid('comp', 0.42), 0.3, ease)); tm = stamp > 0.1 ? 'smug' : 'deadpan'; tl = 1; }
      tr(two, 92, 530 - 164 * s2, s2);
      two.set({ t, talk: scTalk(S, t, 'two'), mood: tm, look: tl, list, stamp });
    }

    /* ===== phase 2: factor pairs (Kavya, Mum) ===== */
    if (t >= cF && t < cSq) {
      let km = 'neutral', kl = -0.9, mm = 'neutral', ml = -0.9;
      if (t >= at('pairs') && t < at('met')) { km = 'happy'; kl = 0.9; ml = 0.9; }
      if (t >= at('met') && t < at('list')) { kl = -0.9; ml = -0.9; }
      if (t >= at('list')) { km = 'happy'; kl = 0.9; mm = t > mid('list', 0.9) ? 'happy' : 'neutral'; ml = 0.9; }
      put(kav, 'kav', SA, SY, { talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
      put(mum, 'mum', SB, SY, { talk: scTalk(S, t, 'mum'), mood: mm, look: ml, lift: t >= at('list') ? 1 : 0 });
      if (t < at('pairs')) {
        popSet(cFac, t, mid('factor', 0.12), at('pairs'), 995, 190);
        popSet(cPairs, t, mid('factor', 0.55), at('pairs'), 995, 300);
        popSet(cRows, t, -9, at('factor') + 0.2, 995, 172);
      } else {
        fadeIn(head, t, at('pairs'));
        op(div, 1);
        pairs.forEach((p, i) => fadeIn(p, t, PB[i]));
        if (t >= at('met')) {
          op(sqRing, P(t, at('met'), 0.3, linear));
          op(metArrow, 1); metArrow.set(P(t, mid('met', 0.1), 0.4, ease));
        }
        if (t >= at('met') && t < at('list')) {
          fadeIn(swap, t, mid('met', 0.12));
          swS1.set(P(t, mid('met', 0.4), 0.3, linear)); swS2.set(P(t, mid('met', 0.48), 0.3, linear));
          popSet(cStop, t, mid('met', 0.2), at('list'), CA, 160);
        }
        if (t >= at('list')) {
          op(metArrow, 0);
          fadeIn(listCard, t, at('list'));
          fNums.forEach((g, i) => { const p = P(t, mid('list', 0.4 + i * 0.065), 0.35, pop); op(g, clamp(p * 3)); tr(g.firstChild, 0, 0, Math.max(0.01, 0.5 + 0.5 * p)); });
          popSet(c9, t, mid('list', 0.18), cSq, CA, 438);
          popSet(cTick, t, mid('list', 0.92), cSq, SB - 20, 296);
        }
      }
    }

    /* ===== square (Paati, Mum) ===== */
    if (t >= cSq && t < cMk) {
      put(paati, 'paati', SA, 418, { talk: scTalk(S, t, 'paati'), mood: 'smug', look: t > mid('square', 0.6) ? -0.2 : 0.9 });
      put(mum, 'mum', SB, SY, { talk: 0, mood: t > end('square') ? 'deadpan' : 'neutral', look: -0.8 });
      const sp = P(t, at('square') + 0.4, 0.4, ease);
      op(goldSq, sp); attr(goldSq, 'x', PCX - 156 - 8); attr(goldSq, 'y', 292 - 156 - 8); attr(goldSq, 'width', 328); attr(goldSq, 'height', 328);
      fadeIn(mSq, t, mid('square', 0.3));
      const stp = P(t, mid('square', 0.7), 0.4, pop);
      op(star, clamp(stp * 3)); tr(star, SA - 84, 476, Math.max(0.01, stp), Math.sin(t * 3) * 8);
    }

    /* ===== make: multiples (Ah Boy, Kavya) ===== */
    if (t >= cMk && t < cPr) {
      op(redG, 0);
      put(boy, 'boy', SA, SY + 6, { talk: 0, mood: 'happy', look: -0.8, lift: t < mid('make', 0.4) ? 1 : 0 });
      put(kav, 'kav', SB, SY, { talk: 0, mood: 'neutral', look: -0.9 });
      popSet(cBoyQ, t, at('make') - 0.05, mid('make', 0.35), SA + 40, 280);
      fadeIn(mult, t, at('make') + 0.1);
      nl.hops.forEach((h, i) => h.set(P(t, mid('make', 0.12 + i * 0.09), 0.45, ease)));
      op(forever, P(t, mid('make', 0.46), 0.3, linear));
      popSet(cFit, t, mid('make', 0.6), cPr, PCX, 412);
      popSet(cMore, t, mid('make', 0.78), cPr, PCX, 470);
    }

    /* ===== Priya's 23 ===== */
    if (t >= cPr) {
      op(blueG, 1);
      blue.forEach((ch, i) => { const [x, y, s] = lay(BK, BL, t, i); tr(ch, x, y, s); });
      const prime = t >= cPm;
      if (!prime) put(kav, 'kav', SA, SY, { talk: scTalk(S, t, 'kavya'), mood: t >= at('line') ? (t > mid('line', 0.7) ? 'smug' : 'neutral') : 'neutral', look: t >= at('line') ? 0.9 : 0.9 });
      else { put(dad, 'dad', SA, SY, { talk: 0, mood: 'deadpan', look: 0.9 }); const sp = P(t, mid('prime', 0.25), 0.4, pop); op(sign, t < at('comp') ? clamp(sp * 3) : 0); tr(sign, 1066, 282, Math.max(0.01, sp)); }
      const up = P(t, at('priya') - 0.3, 0.4, pop);
      let pm = 'smug', pl = 0.8, plift = t < end('priya') ? 1 : 0;
      if (t >= at('line')) { pm = t > mid('line', 0.62) ? 'shock' : 'neutral'; pl = 0.9; }
      if (prime) { pm = t > mid('prime', 0.7) ? 'happy' : 'neutral'; pl = -0.8; }
      if (t >= at('comp')) { pm = 'neutral'; pl = 0.9; }
      put(priya, 'priya', SB, lerp(660, SY, up), { talk: scTalk(S, t, 'priya'), mood: pm, look: pl, lift: plift });
      lt.priya.set(win(t, at('priya') + 0.05, at('priya') + 3.2, 0.3));
      popSet(c23, t, mid('priya', 0.6), at('line'), PCX, 190);
      if (t >= at('line') && t < cPm) {
        popSet(cTry2, t, at('line') + 0.15, mid('line', 0.33), PCX, 440);
        popSet(cTry3, t, mid('line', 0.34), mid('line', 0.56), PCX, 440);
        fadeIn(mLine, t, mid('line', 0.6));
      }
      if (prime && t < at('comp')) {
        fadeIn(mLine, t, -9);
        popSet(c1and23, t, mid('prime', 0.15), 1e9, 740, 190);
        stPrime.set(t >= mid('prime', 0.62) ? P(t, mid('prime', 0.62), 0.35, linear) : 0); tr(stPrime, PCX, 300, 0.62);
      }
      if (t >= at('comp')) {
        op(blueG, 0);
        kinds.forEach((g, i) => fadeIn(g, t, i === 0 ? at('comp') : mid('comp', i === 1 ? 0.12 : 0.55)));
        stComp.set(t >= mid('comp', 0.38) ? P(t, mid('comp', 0.38), 0.35, linear) : 0); tr(stComp, 1075, 128 + 126 + 48, 0.42);
        if (t >= mid('comp', 0.55)) {
          const p = P(t, mid('comp', 0.55), 0.45, pop);
          vis.one = 1; tr(one, 1080, 128 + 252 + 56, 0.3 * Math.max(0.01, p));
          one.set({ t, talk: 0, mood: 'happy', look: -0.6, wave: 1 });
        }
      }
    }

    op(boy, vis.boy); op(kav, vis.kav); op(mum, vis.mum); op(paati, vis.paati); op(priya, vis.priya); op(dad, vis.dad); op(two, vis.two); op(one, vis.one);
  };
});
