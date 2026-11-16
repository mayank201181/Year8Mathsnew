/* Scene 3: The banyan tree (prime factorisation).
   One set: outside the void deck at dusk. Banyan, the old tree, on the left; Kavya, Priya and Ah Boy behind the
   planter wall along the bottom, holding the fairy lights; a dark board on the right.
   lights: 6:30 p.m., a coil of 120 fairy lights, Banyan asleep (z z z) -> banyan: he wakes (lower third), his
   lights come on, "slowly" -> split: three 120s on the board, "split any way, keep splitting, end in primes" ->
   kav: 120 -> 12, 10 -> (3, 4 -> 2, 2), (2, 5) -> pri: 120 -> 8, 15 -> (2, 4 -> 2, 2), (3, 5); "done first!" ->
   boy: 120 -> 2, 60 -> 6, 10 -> (2, 3), (2, 5) -> same: the circled primes fly into three identical rows 2 2 2 3 5
   with ticks -> unique: one row, a DNA helix: "exactly one prime factorisation" -> index: 120 = 2 × 2 × 2 × 3 × 5
   -> 120 = 2³ × 3 × 5 -> laddoo: Priya and Ah Boy duck, Mum rises with a tray: 180 laddoos -> ladder: a real
   ladder, 180 at the top -> steps: 2 | 90, 2 | 45, 3 | 15, 3 | 5, 5 | 1 with the working beside it -> dad: Dad
   rises, 180 = 2² × 3 × 15 -> notdone: the 15 flashes red, splits into 3 × 5: 180 = 2² × 3² × 5 -> check:
   4 × 9 × 5 = 180 ✓, Mum ticks her plan, Paati rises and looks up at Banyan, deadpan. */
scene('tree', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const pill = (parent, text, o) => { o = o || {}; return mkChip(parent, text, { size: o.size || 30, col: o.col || C.ink }); };
  const popSet = (el, t, t0, t1, x, y) => { const p = t >= t0 && t < t1 ? P(t, t0, 0.35, linear) : 0; el.set(p); if (x !== undefined) tr(el, x, y); };
  const fade = (t, t0, t1, d) => (t >= t0 && t < t1 ? Math.min(P(t, t0, d || 0.3, linear), 1 - P(t, t1 - (d || 0.3), d || 0.3, linear)) : 0);
  const GOLD = '#FFE45C', PINK = '#FF8FC8', GREEN = '#56D69B', RED = '#FF6B6B', LIL = '#C9B6FF', BLUE = '#6EC8FF';
  const PRIME_INK = '#0E2A1A';

  /* layers: sky and tree, board, the humans, the planter wall, foreground, HUD */
  const Lset = G(root), Lboard = G(root), Lcast = G(root), Lwall = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= the set: dusk outside the void deck ================= */
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#241A48', '#E58A5C', true) }, Lset);
  E('ellipse', { cx: 900, cy: 520, rx: 520, ry: 160, fill: glow('#FFB067'), opacity: 0.55 }, Lset);
  // the blocks of flats on the skyline, lit windows
  E('path', { d: 'M0,330 L0,190 L130,190 L130,330 Z M150,330 L150,150 L250,150 L250,330 Z M520,330 L520,170 L640,170 L640,330 Z M900,330 L900,140 L1010,140 L1010,330 Z M1040,330 L1040,200 L1200,200 L1200,330 Z', fill: '#3A2E5E' }, Lset);
  let winD = '';
  const rw = rng(208);
  [[0, 130, 190], [150, 250, 150], [520, 640, 170], [900, 1010, 140], [1040, 1200, 200]].forEach(([x0, x1, y0]) => {
    for (let y = y0 + 14; y < 320; y += 26) for (let x = x0 + 10; x < x1 - 14; x += 22) if (rw() > 0.45) winD += `M${x},${y} h12 v12 h-12 Z `;
  });
  E('path', { d: winD, fill: '#FFD98A', opacity: 0.75 }, Lset);
  // grass and the void deck's edge on the right
  E('rect', { x: 0, y: 320, width: 1200, height: 430, fill: linGrad('#2F6B45', '#1E4A30', true) }, Lset);
  E('path', { d: 'M0,330 Q300,316 600,330 T1200,326', fill: 'none', stroke: '#4F9A62', 'stroke-width': 6, opacity: 0.6 }, Lset);

  /* Banyan */
  const banyan = cast(Lset, 'banyan', { mood: 'deadpan' });
  const zzz = G(Lset);
  ['z', 'z', 'Z'].forEach((s, i) => T(zzz, 380 + i * 26, 240 - i * 26, s, { size: 26 + i * 6, weight: 800, fill: '#CFE3FF' }));

  /* the board */
  const BX0 = 548, BX1 = 1176, BY0 = 102, BY1 = 474, BCX = (BX0 + BX1) / 2;
  const board = G(Lboard);
  E('rect', { x: BX0 + 6, y: BY0 + 6, width: BX1 - BX0, height: BY1 - BY0, rx: 18, fill: 'rgba(0,0,0,0.3)' }, board);
  E('rect', { x: BX0, y: BY0, width: BX1 - BX0, height: BY1 - BY0, rx: 18, fill: '#12222E', stroke: '#8FA3B8', 'stroke-width': 4 }, board);

  /* nodes: a composite (plain number) or a prime (green circle) */
  const node = (parent, txt, prime) => {
    const g = G(parent), inner = G(g);
    if (prime) {
      E('circle', { r: 23, fill: GREEN, stroke: '#1E7A4A', 'stroke-width': 3 }, inner);
      T(inner, 0, 11, txt, { size: 30, weight: 800, anchor: 'middle', fill: PRIME_INK });
    } else T(inner, 0, 12, txt, { size: 34, weight: 700, anchor: 'middle', fill: C.ink });
    g.inner = inner;
    return g;
  };
  const showNode = (n, p) => { op(n, clamp(p * 3)); tr(n.inner, 0, 0, Math.max(0.01, 0.5 + 0.5 * pop(clamp(p)))); };
  const LY = [164, 244, 324, 404];
  const COLS = [652, 852, 1028];
  // tree specs: nodes [txt, prime, level, dx, parent index]; splits [parent, child, child] in order
  const SPEC = [
    { ox: COLS[0], nodes: [['120', 0, 0, 0, -1], ['12', 0, 1, -50, 0], ['10', 0, 1, 50, 0], ['3', 1, 2, -72, 1], ['4', 0, 2, -22, 1], ['2', 1, 2, 26, 2], ['5', 1, 2, 72, 2], ['2', 1, 3, -48, 4], ['2', 1, 3, 4, 4]],
      splits: [[0, 1, 2], [1, 3, 4], [4, 7, 8], [2, 5, 6]] },
    { ox: COLS[1], nodes: [['120', 0, 0, 0, -1], ['8', 0, 1, -50, 0], ['15', 0, 1, 50, 0], ['2', 1, 2, -72, 1], ['4', 0, 2, -22, 1], ['3', 1, 2, 26, 2], ['5', 1, 2, 72, 2], ['2', 1, 3, -48, 4], ['2', 1, 3, 4, 4]],
      splits: [[0, 1, 2], [1, 3, 4], [4, 7, 8], [2, 5, 6]] },
    { ox: COLS[2], nodes: [['120', 0, 0, 0, -1], ['2', 1, 1, -46, 0], ['60', 0, 1, 44, 0], ['6', 0, 2, -4, 2], ['10', 0, 2, 92, 2], ['2', 1, 3, -28, 3], ['3', 1, 3, 20, 3], ['2', 1, 3, 68, 4], ['5', 1, 3, 116, 4]],
      splits: [[0, 1, 2], [2, 3, 4], [3, 5, 6], [4, 7, 8]] },
  ];
  const treeL = G(board);
  const trees = SPEC.map(sp => {
    const g = G(treeL), edgeL = G(g), nodeL = G(g);
    const pos = sp.nodes.map(n => [sp.ox + n[3], LY[n[2]]]);
    const nodes = sp.nodes.map((n, i) => { const nd = node(nodeL, n[0], n[1]); tr(nd, pos[i][0], pos[i][1]); nd.txt = n[0]; nd.prime = n[1]; nd.home = pos[i]; return nd; });
    const edges = {};
    sp.splits.forEach(([a, b, c]) => [b, c].forEach(k => {
      const [x1, y1] = pos[a], [x2, y2] = pos[k];
      const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy);
      edges[k] = mkDash(E('path', { d: `M${(x1 + dx * 26 / L).toFixed(1)},${(y1 + dy * 26 / L).toFixed(1)} L${(x2 - dx * 26 / L).toFixed(1)},${(y2 - dy * 26 / L).toFixed(1)}`, stroke: '#CFE3FF', 'stroke-width': 4, 'stroke-linecap': 'round' }, edgeL));
    }));
    return { g, edgeL, nodeL, nodes, edges, splits: sp.splits, inner: nodeL };
  });
  // which leaf goes to which slot in the sorted row 2 2 2 3 5
  const leafOrder = tr0 => {
    const leaves = tr0.nodes.map((n, i) => [n, i]).filter(([n]) => n.prime);
    const twos = leaves.filter(([n]) => n.txt === '2'), three = leaves.find(([n]) => n.txt === '3'), five = leaves.find(([n]) => n.txt === '5');
    return [twos[0][1], twos[1][1], twos[2][1], three[1], five[1]];
  };
  trees.forEach(tr0 => { tr0.order = leafOrder(tr0); });
  const ROWX = k => BCX - 150 + k * 75, ROWY = [200, 290, 380];
  const ticks = ROWY.map(y => { const tk = tick(board, 18); tr(tk, BCX + 236, y); return tk; });
  const cSplit = pill(board, 'split **any** way you like,\nkeep splitting until\nevery branch ends in a **prime**', { col: GOLD, size: 30 });
  const cDone = pill(Lfg, 'done first!', { col: PINK, size: 28 });
  // unique: the DNA helix
  const helix = G(board);
  const HX0 = BCX - 230, HX1 = BCX + 230, HXY = 300, HA = 52;
  let s1 = '', s2 = '', rungs = '';
  for (let i = 0; i <= 60; i++) { const x = lerp(HX0, HX1, i / 60), a = i / 60 * TAU * 1.5; s1 += (i ? ' L' : 'M') + x.toFixed(1) + ',' + (HXY + Math.sin(a) * HA).toFixed(1); s2 += (i ? ' L' : 'M') + x.toFixed(1) + ',' + (HXY - Math.sin(a) * HA).toFixed(1); }
  for (let i = 1; i < 12; i++) { const x = lerp(HX0, HX1, i / 12), a = i / 12 * TAU * 1.5; rungs += `M${x.toFixed(1)},${(HXY + Math.sin(a) * HA).toFixed(1)} L${x.toFixed(1)},${(HXY - Math.sin(a) * HA).toFixed(1)} `; }
  const rungP = E('path', { d: rungs, stroke: '#5A7A92', 'stroke-width': 3 }, helix);
  const st1 = mkDash(E('path', { d: s1, fill: 'none', stroke: BLUE, 'stroke-width': 6, 'stroke-linecap': 'round' }, helix));
  const st2 = mkDash(E('path', { d: s2, fill: 'none', stroke: PINK, 'stroke-width': 6, 'stroke-linecap': 'round' }, helix));
  const cOne = pill(board, 'exactly **one** prime factorisation', { col: GOLD, size: 30 });
  const cDNA = pill(board, "120's **DNA**", { col: LIL, size: 30 });
  // index form
  const idx = G(board);
  const idx1 = mkMath(idx, BCX, 230, '120 = 2 * 2 * 2 * 3 * 5', { size: 44, anchor: 'middle' });
  const idxArrow = arrow(idx, BCX, 262, BCX, 304, { color: GOLD, width: 4 });
  const idx2 = mkMath(idx, BCX, 350, '120 = 2^3 * 3 * 5', { size: 52, anchor: 'middle', fill: GREEN });
  const idxRing = E('rect', { x: BCX - idx2.w / 2 - 18, y: 350 - idx2.a - 12, width: idx2.w + 36, height: idx2.a + idx2.d + 24, rx: 12, fill: 'none', stroke: GREEN, 'stroke-width': 4 }, idx);
  const cIndex = pill(board, '**index form**: smallest prime first', { col: GOLD, size: 28 });
  // laddoo
  const cLad = pill(board, '**180** laddoos', { col: '#FFB347', size: 40 });
  const ladPile = G(board);
  const rl = rng(180);
  for (let row = 0, k = 7; k > 0; row++, k--) for (let i = 0; i < k; i++) tr(fmLaddoo(ladPile, 17), BCX + (i - (k - 1) / 2) * 36 + (rl() - 0.5) * 3, 440 - row * 30);
  // the ladder
  const LADX = 676, LADW = 120, RY = [164, 218, 272, 326, 380, 434];
  const ladder = G(board);
  E('path', { d: `M${LADX},${RY[0] - 46} L${LADX},${RY[5] + 24} M${LADX + LADW},${RY[0] - 46} L${LADX + LADW},${RY[5] + 24}`, stroke: '#B07A45', 'stroke-width': 10, 'stroke-linecap': 'round' }, ladder);
  const rungEls = RY.slice(0, 5).map(y => mkDash(E('path', { d: `M${LADX},${y + 16} L${LADX + LADW},${y + 16}`, stroke: '#D9A066', 'stroke-width': 7, 'stroke-linecap': 'round' }, ladder)));
  const LNUM = ['180', '90', '45', '15', '5', '1'], LDIV = ['2', '2', '3', '3', '5'];
  const ladNums = LNUM.map((s, i) => { const g = G(ladder); T(g, LADX + LADW / 2, RY[i] + 6, s, { size: 36, weight: 800, anchor: 'middle', fill: i === 5 ? GOLD : C.ink }); return g; });
  const ladDivs = LDIV.map((s, i) => { const n = node(ladder, s, true); tr(n, LADX - 42, RY[i] - 6); return n; });
  const cSmall = pill(board, 'divide by the\n**smallest** prime\nthat fits', { col: GOLD, size: 30 });
  const cReach = pill(board, 'until you reach **1**', { col: GOLD, size: 30 });
  const steps = mkWorking(board, 1030, 140, ['180 ÷ 2 = 90', '90 ÷ 2 = 45', '45 ÷ 3 = 15', '15 ÷ 3 = 5', '5 ÷ 5 = 1'], { size: 34, gap: 20 });
  // Dad's answer, the fix, the check
  const RX = 1000;
  const dadL = G(board);
  const dad1 = mkMath(dadL, 0, 0, '180 = 2^2 * 3 *', { size: 38 });
  const d15 = mkMath(dadL, dad1.w + 12, 0, '15', { size: 38 });
  const dadW = dad1.w + 12 + d15.w;
  tr(dadL, RX - dadW / 2, 180);
  const dadTag = mkText(board, RX, 134, "**Dad's** answer:", { size: 28, anchor: 'middle', fill: '#9FE0B5' });
  const glow15 = E('circle', { cx: RX - dadW / 2 + dad1.w + 12 + d15.w / 2, cy: 168, r: 32, fill: glow('#FF3B3B') }, board);
  const split15 = G(board);
  const s15x = RX - dadW / 2 + dad1.w + 12 + d15.w / 2;
  const e15a = mkDash(E('path', { d: `M${s15x - 8},${198} L${s15x - 30},${222}`, stroke: RED, 'stroke-width': 4, 'stroke-linecap': 'round' }, split15));
  const e15b = mkDash(E('path', { d: `M${s15x + 8},${198} L${s15x + 30},${222}`, stroke: RED, 'stroke-width': 4, 'stroke-linecap': 'round' }, split15));
  const n15a = node(split15, '3', true), n15b = node(split15, '5', true);
  tr(n15a, s15x - 40, 246); tr(n15b, s15x + 40, 246);
  const cNotP = pill(board, '15 is **not prime**', { col: RED, size: 28 });
  const fix = mkMath(board, RX, 324, '180 = 2^2 * 3^2 * 5', { size: 40, anchor: 'middle', fill: GREEN });
  const fixRing = E('rect', { x: RX - fix.w / 2 - 14, y: 324 - fix.a - 10, width: fix.w + 28, height: fix.a + fix.d + 20, rx: 10, fill: 'none', stroke: GREEN, 'stroke-width': 4 }, board);
  const chk = mkMath(board, RX - 14, 392, '4 * 9 * 5 = 180', { size: 38, anchor: 'middle' });
  const chkTick = tick(board, 16); tr(chkTick, RX - 14 + chk.w / 2 + 30, 380);
  const strike15 = strike(board, RX - dadW / 2 - 6, 168, RX + dadW / 2 + 6, RED);

  /* the coil of 120 fairy lights (before the board appears) */
  const coil = G(Lboard); tr(coil, 862, 360);
  const coilB = [];
  [[130, 46], [104, 36], [78, 26]].forEach(([rx, ry], k) => {
    E('ellipse', { cx: 0, cy: k * 10, rx, ry, fill: 'none', stroke: '#2A3540', 'stroke-width': 3 }, coil);
    const n = 10 - k * 2;
    for (let i = 0; i < n; i++) { const a = i / n * TAU + k; coilB.push(E('circle', { cx: Math.cos(a) * rx, cy: k * 10 + Math.sin(a) * ry, r: 7, fill: ['#FFE45C', '#FF8FC8', '#7EE08A', '#6EC8FF'][(i + k) % 4], stroke: '#2A3540', 'stroke-width': 1.5 }, coil)); }
  });
  const cTime = pill(Lboard, '**6:30 p.m.**', { col: GOLD, size: 34 });
  const c120 = pill(Lboard, '**120** fairy lights', { col: PINK, size: 34 });

  /* the planter wall in front of the humans, with the fairy lights strung along it */
  E('rect', { x: 0, y: 640, width: 1200, height: 110, fill: linGrad('#B5654A', '#7E3E2C', true) }, Lwall);
  E('rect', { x: -10, y: 630, width: 1220, height: 18, rx: 6, fill: '#D8C3A5', stroke: '#8A6A50', 'stroke-width': 3 }, Lwall);
  let br = '';
  for (let y = 668; y < 750; y += 28) { br += `M0,${y} L1200,${y} `; for (let x = ((y / 28) % 2) * 40; x < 1200; x += 80) br += `M${x},${y - 28} L${x},${y} `; }
  E('path', { d: br, stroke: '#6A3424', 'stroke-width': 2, opacity: 0.5 }, Lwall);
  const wallLights = fmLights(Lwall, [[540, 626], [760, 640], [960, 626], [1200, 640]], { n: 20, sag: 14 });
  // Mum's tray of laddoos on the wall
  const tray = G(Lfg);
  E('ellipse', { cx: 0, cy: 0, rx: 84, ry: 14, fill: '#C9D3DC', stroke: '#7D8A96', 'stroke-width': 3 }, tray);
  [[-54, -14], [-27, -14], [0, -14], [27, -14], [54, -14], [-40, -38], [-13, -38], [13, -38], [40, -38], [-27, -60], [0, -60], [27, -60], [0, -82]].forEach(([x, y]) => tr(fmLaddoo(tray, 14), x, y));

  /* the HUD */
  const tickChip = pill(Lhud, '✓ **every laddoo**', { col: GREEN, size: 28 });

  /* ================= the cast ================= */
  const paati = cast(Lcast, 'paati');
  const kav = cast(Lcast, 'kavya');
  const priya = cast(Lcast, 'priya', { prop: null });
  const boy = cast(Lcast, 'boy');
  const mum = cast(Lcast, 'mum');
  const dad = cast(Lcast, 'dad');
  const lt = fmLowerThird(Lhud, 'banyan');
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  const HS = 0.78, HY = 574;
  const X = { paati: 470, kav: 652, priya: 862, boy: 1070, mum: 862, dad: 1070 };
  const ui = (t, t0, d) => P(t, t0, d || 0.4, pop);              // rise into shot
  const dn = (t, t0, d) => P(t, t0, d || 0.3, easeIn);           // duck out of shot
  const put = (c, x, k, s) => { op(c, k > 0.001 ? 1 : 0); tr(c, x, lerp(HY + 230, HY, k), s || HS); };

  /* timings */
  const tTreeOff = at('laddoo') - 0.3;
  const sameT = mid('same', 0.08), uniqT = at('unique'), idxT = at('index');
  const steps5 = [0.2, 0.47, 0.72, 0.86, 0.95].map(f => mid('steps', f));
  const SPLITT = [
    [0.04, 0.3, 0.44, 0.74].map(f => mid('kav', f)),
    [0.04, 0.28, 0.4, 0.58].map(f => mid('pri', f)),
    [0.04, 0.35, 0.6, 0.78].map(f => mid('boy', f)),
  ];

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    wallLights.set(t);
    const who = scWho(S, t);

    /* ---------- Banyan ---------- */
    tr(banyan, 250, 352, 0.85);
    let bm = 'neutral', bl = 0.7, lightsOn = P(t, mid('banyan', 0.15), 1.6, linear);
    if (t < at('banyan')) { bm = 'deadpan'; bl = 0; }
    else if (t < at('split')) { bm = t > mid('banyan', 0.62) ? 'smug' : 'neutral'; bl = 0.3; }
    else if (who === 'banyan') { bm = 'neutral'; bl = 0.6; }
    else if (t >= at('dad') && t < at('notdone')) { bm = 'deadpan'; bl = 0.9; }
    else if (t >= at('check')) { bm = t > mid('check', 0.5) ? 'smug' : 'neutral'; bl = 0.5; }
    banyan.set({ t, talk: scTalk(S, t, 'banyan'), mood: bm, look: bl, lights: lightsOn, still: t < at('banyan') });
    op(zzz, 1 - P(t, at('banyan') - 0.2, 0.3, linear));
    tr(zzz, 0, -Math.sin(t * 1.6) * 6 * AMP);
    lt.set(win(t, at('banyan') + 0.1, at('banyan') + 3.3, 0.3));

    /* ---------- the coil, before the board ---------- */
    const boardOn = P(t, at('split') - 0.1, 0.25, linear);
    op(coil, (1 - boardOn) * P(t, mid('lights', 0.45), 0.3, linear));
    coilB.forEach((b, i) => op(b, 0.55 + 0.45 * Math.sin(t * 3 + i * 1.7)));
    popSet(cTime, t, mid('lights', 0.04), at('split'), 862, 170);
    popSet(c120, t, mid('lights', 0.5), at('split'), 862, 250);
    op(board, boardOn);

    /* ---------- the three trees ---------- */
    const treesOn = t < tTreeOff ? 1 : 0;
    op(treeL, treesOn);
    popSet(cSplit, t, mid('split', 0.22), at('kav'), BCX, 330);
    const flyP = P(t, sameT, 0.8, ease);           // leaves into rows
    const dim = 1 - P(t, sameT, 0.4, linear);      // the rest of each tree fades
    const merge = P(t, uniqT, 0.6, ease);          // rows merge into one
    trees.forEach((tr0, k) => {
      const sp = SPLITT[k];
      const nodeP = new Array(tr0.nodes.length).fill(0);
      nodeP[0] = P(t, mid('split', 0.12) + k * 0.15, 0.4, linear);
      tr0.splits.forEach(([a, b, c], j) => {
        const p = P(t, sp[j], 0.45, linear);
        mkDraw(tr0.edges[b], p); mkDraw(tr0.edges[c], p);
        nodeP[b] = P(t, sp[j] + 0.2, 0.35, linear); nodeP[c] = P(t, sp[j] + 0.3, 0.35, linear);
      });
      op(tr0.edgeL, dim);
      tr0.nodes.forEach((n, i) => {
        const slot = tr0.order.indexOf(i);
        if (slot < 0) { showNode(n, nodeP[i]); op(n, clamp(nodeP[i] * 3) * dim); tr(n, n.home[0], n.home[1]); return; }
        showNode(n, nodeP[i]);
        const rx = ROWX(slot), ry = lerp(ROWY[k], ROWY[1], merge);
        const bob = t >= uniqT ? Math.sin((t - uniqT) * 2.4 + slot * 0.9) * 10 * AMP * P(t, uniqT + 0.5, 0.6, linear) : 0;
        tr(n, lerp(n.home[0], rx, flyP), lerp(n.home[1], ry, flyP) + bob, 1);
        // after the merge only the middle row stays visible (the other two sit underneath it)
        if (t >= uniqT && k !== 1) op(n, 1 - merge);
        tr(n.inner, 0, 0, flyP > 0 ? 1 + 0.15 * flyP : Math.max(0.01, 0.5 + 0.5 * pop(clamp(nodeP[i]))));
      });
    });
    ticks.forEach((tk, i) => { const p = P(t, mid('same', 0.45) + i * 0.12, 0.3, pop); op(tk, clamp(p * 3) * (1 - merge)); tr(tk, BCX + 236, ROWY[i], Math.max(0.01, p)); });
    // hide the merged row of circles once the index form arrives
    if (t >= idxT) trees.forEach(tr0 => tr0.nodes.forEach((n, i) => { if (tr0.order.includes(i)) op(n, (1 - P(t, idxT, 0.3, linear)) * (tr0 === trees[1] ? 1 : 0)); }));
    // done first!
    popSet(cDone, t, mid('pri', 0.82), at('boy'), 952, 452);

    /* unique: the helix */
    const hp = t >= uniqT && t < idxT ? 1 : 0;
    op(helix, hp * (1 - P(t, idxT - 0.25, 0.25, linear)));
    mkDraw(st1, P(t, uniqT + 0.2, 1.0, ease)); mkDraw(st2, P(t, uniqT + 0.35, 1.0, ease));
    op(rungP, P(t, uniqT + 0.9, 0.5, linear));
    popSet(cOne, t, mid('unique', 0.3), idxT, BCX, 160);
    popSet(cDNA, t, mid('unique', 0.85), idxT, BCX, 438);

    /* index form */
    const ip = t >= idxT && t < tTreeOff ? 1 : 0;
    op(idx, ip);
    op(idx1, P(t, idxT + 0.1, 0.3, linear));
    op(idxArrow, P(t, mid('index', 0.45), 0.3, linear));
    op(idx2, P(t, mid('index', 0.55), 0.3, linear));
    op(idxRing, P(t, mid('index', 0.8), 0.3, linear));
    popSet(cIndex, t, mid('index', 0.15), tTreeOff, BCX, 160);

    /* ---------- the laddoos and the ladder ---------- */
    const ladOn = t >= at('laddoo') - 0.1 ? 1 : 0;
    popSet(cLad, t, mid('laddoo', 0.25), at('ladder'), BCX, 172);
    op(ladPile, fade(t, mid('laddoo', 0.3), at('ladder') + 0.2));
    op(ladder, P(t, at('ladder') - 0.05, 0.3, linear) * ladOn);
    ladNums.forEach((n, i) => op(n, i === 0 ? 1 : P(t, steps5[i - 1] + 0.1, 0.25, linear)));
    ladDivs.forEach((n, i) => showNode(n, P(t, steps5[i] - 0.15, 0.35, linear)));
    rungEls.forEach((r, i) => mkDraw(r, P(t, steps5[i], 0.35, ease)));
    popSet(cSmall, t, mid('ladder', 0.25), at('steps'), 1010, 222);
    popSet(cReach, t, mid('ladder', 0.72), at('steps'), 1010, 360);
    const stepsOn = t >= at('steps') && t < at('dad') - 0.1 ? 1 : 0;
    op(steps, stepsOn);
    steps5.forEach((ts, i) => steps.show(i, P(t, ts, 0.3, linear)));

    /* Dad's answer, Banyan's fix, Mum's check */
    const dOn = t >= at('dad') - 0.1 ? 1 : 0;
    op(dadL, dOn * P(t, mid('dad', 0.25), 0.3, linear));
    op(dadTag, dOn * P(t, mid('dad', 0.1), 0.3, linear));
    const flash = t >= at('notdone') ? 0.5 + 0.5 * Math.sin((t - at('notdone')) * 12) : 0;
    op(glow15, t >= at('notdone') && t < mid('notdone', 0.55) ? flash : 0);
    d15.setAttribute('fill', t >= at('notdone') ? '#FF6B6B' : C.ink);
    d15.querySelectorAll('text').forEach(e => e.setAttribute('fill', t >= at('notdone') ? '#FF6B6B' : C.ink));
    popSet(cNotP, t, mid('notdone', 0.08), at('check'), RX + 60, 258);
    tr(cNotP, RX - 96, 262);
    op(split15, t >= mid('notdone', 0.3) ? 1 : 0);
    mkDraw(e15a, P(t, mid('notdone', 0.3), 0.3, linear)); mkDraw(e15b, P(t, mid('notdone', 0.3), 0.3, linear));
    showNode(n15a, P(t, mid('notdone', 0.38), 0.3, linear)); showNode(n15b, P(t, mid('notdone', 0.44), 0.3, linear));
    if (t < mid('notdone', 0.3)) { op(n15a, 0); op(n15b, 0); }
    op(fix, P(t, mid('notdone', 0.62), 0.3, linear));
    op(fixRing, P(t, mid('notdone', 0.9), 0.3, linear));
    strike15.set(P(t, mid('notdone', 0.62), 0.3, linear));
    op(chk, P(t, mid('check', 0.12), 0.3, linear));
    const ckp = P(t, mid('check', 0.45), 0.3, pop); op(chkTick, clamp(ckp * 3)); tr(chkTick, RX - 14 + chk.w / 2 + 30, 380, Math.max(0.01, ckp));
    popSet(tickChip, t, mid('check', 0.62), 1e9, RX, 438);

    /* ---------- the humans ---------- */
    // the kids: from the start to the laddoos
    const kidsUp = ui(t, mid('lights', 0.12)) * (1 - dn(t, at('laddoo') - 0.4));
    const lookBoard = 0.4;
    let km = 'happy', kl = -0.9;
    if (t >= at('banyan') && t < at('split')) { km = t < mid('banyan', 0.3) ? 'shock' : 'happy'; kl = -1; }
    else if (t >= at('split') && t < at('kav')) { km = 'neutral'; kl = -1; }
    else if (who === 'kavya') { km = 'happy'; kl = lookBoard; }
    else if (t >= at('pri') && t < at('boy')) { km = t > mid('pri', 0.8) ? 'deadpan' : 'neutral'; kl = 1; }
    else if (t >= at('boy') && t < at('same')) { km = 'neutral'; kl = 1; }
    else if (t >= at('same') && t < at('laddoo')) { km = 'happy'; kl = who === 'banyan' ? -1 : 0.4; }
    else if (t >= at('laddoo') && t < at('ladder')) { km = 'happy'; kl = 1; }
    else if (t >= at('ladder') && t < at('steps')) { km = 'neutral'; kl = -1; }
    else if (t >= at('dad') && t < at('notdone')) { km = 'deadpan'; kl = 1; }
    else if (t >= at('notdone') && t < at('check')) { km = 'neutral'; kl = -1; }
    else if (t >= at('check')) { km = 'happy'; kl = 1; }
    put(kav, X.kav, ui(t, mid('lights', 0.1)));
    kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });

    put(priya, X.priya, kidsUp);
    let pm = 'happy', pl = -0.6;
    if (t >= at('banyan') && t < at('split')) { pm = t < mid('banyan', 0.35) ? 'shock' : 'neutral'; pl = -1; }
    else if (t >= at('split') && t < at('kav')) { pm = 'neutral'; pl = -1; }
    else if (t >= at('kav') && t < at('pri')) { pm = 'neutral'; pl = -1; }
    else if (t >= at('pri') && t < at('boy')) { pm = t > mid('pri', 0.75) ? 'smug' : 'happy'; pl = -0.2; }
    else if (t >= at('boy') && t < at('same')) { pm = 'annoyed'; pl = 1; }
    else if (t >= at('same')) { pm = 'neutral'; pl = who === 'banyan' ? -1 : 0.2; }
    priya.set({ t, talk: scTalk(S, t, 'priya'), mood: pm, look: pl });

    put(boy, X.boy, kidsUp);
    let bym = 'happy', byl = -0.8, lift = 0;
    if (t >= at('banyan') && t < at('split')) { bym = t < mid('banyan', 0.4) ? 'shock' : 'happy'; byl = -1; }
    else if (t >= at('pri') && t < at('boy')) { bym = 'happy'; byl = -1; lift = t > mid('pri', 0.6) ? 1 : 0; }
    else if (t >= at('boy') && t < at('same')) { bym = 'happy'; byl = -0.3; lift = t < mid('boy', 0.35) ? 1 : 0; }
    else if (t >= at('same')) { bym = 'happy'; byl = who === 'banyan' ? -1 : -0.6; }
    boy.set({ t, talk: scTalk(S, t, 'boy'), mood: bym, look: byl, lift });

    // Mum, with the laddoos
    const mumUp = ui(t, at('laddoo') - 0.2);
    put(mum, X.mum, mumUp);
    let mm = 'happy', ml = -0.5;
    if (t >= at('ladder') && t < at('dad')) { mm = 'neutral'; ml = -1; }
    else if (t >= at('dad') && t < at('notdone')) { mm = 'annoyed'; ml = 1; }
    else if (t >= at('notdone') && t < at('check')) { mm = 'smug'; ml = 1; }
    else if (t >= at('check')) { mm = 'happy'; ml = -0.4; }
    mum.set({ t, talk: scTalk(S, t, 'mum'), mood: mm, look: ml, lift: t >= mid('check', 0.55) ? 1 : 0 });
    tr(tray, 757, 640 + 260 * (1 - mumUp), 0.6);
    op(tray, mumUp > 0.01 && t < mid('check', 0.5) ? 1 : 0);

    // Dad
    const dadUp = ui(t, at('dad') - 0.35);
    put(dad, X.dad, dadUp);
    let dm = 'smug', dl = -0.6, dlift = t < end('dad') ? 1 : 0;
    if (t >= at('notdone') && t < at('check')) { dm = t < mid('notdone', 0.4) ? 'shock' : 'sad'; dl = -1; dlift = 0; }
    else if (t >= at('check')) { dm = 'sad'; dl = -0.8; dlift = 0; }
    dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: dl, lift: dlift });

    // Paati looks up at Banyan
    const paUp = ui(t, mid('check', 0.55));
    put(paati, X.paati, paUp);
    paati.set({ t, talk: scTalk(S, t, 'paati'), mood: 'deadpan', look: -1 });
  };
});
