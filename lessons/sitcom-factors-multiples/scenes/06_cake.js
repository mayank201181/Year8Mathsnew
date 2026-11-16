/* Scene 6: Sixty-four cupcakes (squares, cubes and roots from prime factors).
   One set, the void deck at 7:45 p.m.: Cubert stands on the left end of the party table, two humans behind it, and a
   panel on the right where the 64 cupcakes move: a heap -> an 8 x 8 tray (8^2 = 64, a square) -> a 4 x 4 x 4 tower
   (4^3 = 64, a cube) -> Paati: a square AND a cube, gold star -> Mr Tan: a perfect number, 6 = 1 + 2 + 3 -> Paati: it's
   my birthday (Mr Tan backs away) -> 64 = 2^6: squares have even powers, cubes powers in the 3 times table ->
   roots: sqrt(2^6) = 2^3 = 8, cbrt(2^6) = 2^2 = 4 -> Mr Tan's quiz: sqrt(1764) -> Ah Boy: 1764 / 2 = 882, Big Two pops
   up, NOT ON THE LIST -> halve the powers: 1764 = 2^2 x 3^2 x 7^2 -> sqrt(1764) = 2 x 3 x 7 = 42, two identical groups,
   42 x 42 = 1764 -> Mum's 180 laddoos: 180 = 2^2 x 3^2 x 5, the 5 has an odd power -> x 5: 900 = 30^2 -> / 5: 36 = 6^2,
   a 6 x 6 tray, the other 144 slide to Ah Boy -> a cube: x 150, 27 000 = 30^3, a mountain -> Mum: square tray,
   900 - 180 = 720 more; Ah Boy sad. */
scene('cake', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const pill = (parent, text, o) => { o = o || {}; return mkChip(parent, text, { size: o.size || 30, col: o.col || C.ink }); };
  const popSet = (el, t, t0, t1, x, y) => { const p = t >= t0 && t < t1 ? P(t, t0, 0.35, linear) : 0; el.set(p); if (x !== undefined) tr(el, x, y); };
  const fadeIn = (el, t, t0, t1) => { const p = t >= t0 && t < (t1 === undefined ? 1e9 : t1) ? P(t, t0, 0.3, easeOut) : 0; op(el, p); return p; };
  const GOLD = '#FFE45C', PINK = '#FF8FC8', RED = '#FF6B6B', GREEN = '#56D69B', LIL = '#C9B6FF', BLUE = '#6EC8FF', ORANGE = '#FFB347';
  const INK = C.ink;
  const txt = (parent, x, y, s, o) => mkText(parent, x, y, s, Object.assign({ size: 32, anchor: 'middle', fill: INK }, o || {}));
  const mth = (parent, x, y, src, o) => mkMath(parent, x, y, src, Object.assign({ size: 44, fill: INK, anchor: 'middle' }, o || {}));

  /* layers */
  const Lbg = G(root), Lpanel = G(root), Lcast = G(root), Lfront = G(root), Lfg = G(root), Lhud = G(root);

  /* ---------- the void deck ---------- */
  const vd = fmVoid(Lbg);
  Lfront.appendChild(vd.front); Lfront.appendChild(vd.top);

  /* ---------- the panel ---------- */
  const PX0 = 470, PX1 = 1170, PY0 = 112, PY1 = 508, PCX = (PX0 + PX1) / 2;
  E('rect', { x: PX0 + 6, y: PY0 + 6, width: PX1 - PX0, height: PY1 - PY0, rx: 18, fill: 'rgba(0,0,0,0.25)' }, Lpanel);
  E('rect', { x: PX0, y: PY0, width: PX1 - PX0, height: PY1 - PY0, rx: 18, fill: '#12222E', stroke: '#8FA3B8', 'stroke-width': 4 }, Lpanel);
  const cpId = 'fmCakeClip';
  const cp = E('clipPath', { id: cpId }, defs()); E('rect', { x: PX0 + 3, y: PY0 + 3, width: PX1 - PX0 - 6, height: PY1 - PY0 - 6, rx: 16 }, cp);
  const Lp = G(Lpanel, { 'clip-path': `url(#${cpId})` });

  /* ===== the 64 cupcakes: heap -> 8 x 8 tray -> 4 x 4 x 4 tower ===== */
  const TX = 668, TY = 312;   // centre of the tray and of the tower
  const tray = E('rect', { x: TX - 152, y: TY - 152, width: 304, height: 304, rx: 14, fill: '#C9D3DC', stroke: '#7D8A96', 'stroke-width': 4 }, Lp);
  const trayLab = G(Lp);
  txt(trayLab, TX, TY - 166, '8', { size: 30, fill: GOLD });
  txt(trayLab, TX - 176, TY + 10, '8', { size: 30, fill: GOLD });
  // the tower's outline (drawn behind the cupcakes) and its edge labels (in front)
  const DX = 30, DY = 16, DZ = 34, CS = 0.85;
  const iso = (i, j, k) => [TX + (i - j) * DX, TY + 6 + (i + j) * DY - (k - 1.5) * DZ];
  const cubeBack = E('path', { d: '', fill: 'rgba(255,138,61,0.12)', stroke: ORANGE, 'stroke-width': 3, 'stroke-dasharray': '10 8' }, Lp);
  {
    const a = -0.6, b = 3.6, k0 = -0.75, k1 = 3.75;
    const P6 = [iso(a, a, k1), iso(b, a, k1), iso(b, a, k0), iso(b, b, k0), iso(a, b, k0), iso(a, b, k1)];
    const F = iso(b, b, k1);
    let d = 'M' + P6.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' L') + ' Z';
    [P6[1], P6[3], P6[5]].forEach(p => { d += ` M${F[0].toFixed(1)},${F[1].toFixed(1)} L${p[0].toFixed(1)},${p[1].toFixed(1)}`; });
    cubeBack.setAttribute('d', d);
  }
  const cubeLab = G(Lp);
  {
    const a = -0.6, b = 3.6, k0 = -0.75, k1 = 3.75;
    const mp = (p, q) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
    const l1 = mp(iso(b, a, k0), iso(b, b, k0)), l2 = mp(iso(b, b, k0), iso(a, b, k0)), l3 = mp(iso(a, b, k0), iso(a, b, k1));
    txt(cubeLab, l1[0] + 26, l1[1] + 30, '4', { size: 30, fill: GOLD });
    txt(cubeLab, l2[0] - 26, l2[1] + 30, '4', { size: 30, fill: GOLD });
    txt(cubeLab, l3[0] - 26, l3[1] + 10, '4', { size: 30, fill: GOLD });
  }
  // cubes in back-to-front order, so the DOM order paints the tower correctly
  const cells = [];
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) for (let k = 0; k < 4; k++) cells.push([i, j, k]);
  cells.sort((p, q) => (p[0] + p[1]) - (q[0] + q[1]) || p[2] - q[2] || p[0] - q[0]);
  const cupG = G(Lp);
  const cups = cells.map(() => fmCupcake(cupG));
  const R = rng(64);
  const heapRows = [14, 13, 12, 11, 8, 6];
  const heapPos = [];
  heapRows.forEach((n, r) => { for (let c = 0; c < n; c++) heapPos.push([PCX - (n - 1) * 16 + c * 32 + (R() - 0.5) * 8, 470 - r * 30 + (R() - 0.5) * 6]); });
  const L = {
    heap: n => [heapPos[n][0], heapPos[n][1], 0.85],
    sq: n => [TX - 3.5 * 37 + (n % 8) * 37, TY - 3.5 * 37 + Math.floor(n / 8) * 37 - 2, 0.8],
    cube: n => { const [i, j, k] = cells[n], p = iso(i, j, k); return [p[0], p[1], CS]; },
  };
  const cupAt = (t, keys, n) => {
    let k = 0;
    for (let j = 0; j < keys.length; j++) if (t >= keys[j][0]) k = j;
    const cur = L[keys[k][1]](n);
    if (k === 0) return cur;
    const prev = L[keys[k - 1][1]](n);
    const p = P(t, keys[k][0] + n * 0.012, 0.55, ease);
    return [lerp(prev[0], cur[0], p), lerp(prev[1], cur[1], p) - Math.sin(p * Math.PI) * 26, lerp(prev[2], cur[2], p)];
  };
  const cHeap = pill(Lp, '**64** cupcakes', { col: PINK, size: 30 });
  const mSq = txt(Lp, 975, 228, '{{8^2 = 64}}: a **square**', { size: 34, boldFill: GOLD });
  const mCube = txt(Lp, 975, 330, '{{4^3 = 64}}: a **cube**', { size: 34, boldFill: ORANGE });
  const cBoth = pill(Lp, 'a square **and** a cube', { col: GOLD, size: 28 });

  /* ===== tech / bday: a perfect number ===== */
  const perfG = G(Lp);
  E('rect', { x: PX0 + 24, y: 136, width: 652, height: 350, rx: 16, fill: 'rgba(10,27,39,0.95)', stroke: LIL, 'stroke-width': 3 }, perfG);
  txt(perfG, PCX, 196, 'a **perfect number**', { size: 38, boldFill: LIL });
  txt(perfG, PCX, 250, '= the sum of its **other** factors', { size: 30, boldFill: LIL });
  const pM = mth(perfG, PCX, 350, '6 = 1 + 2 + 3', { size: 56, fill: GOLD });
  const pF = txt(perfG, PCX, 440, 'factors of 6: {{1, 2, 3}} and {{6}}', { size: 28, fill: '#A4BCCB' });
  const bdayG = G(Lp);
  {
    const g = G(bdayG); tr(g, PCX, 410);
    E('rect', { x: -120, y: -70, width: 240, height: 76, rx: 10, fill: '#FFC2E0', stroke: SC_INK, 'stroke-width': 4 }, g);
    E('path', { d: 'M-120,-56 Q-100,-36 -80,-56 Q-60,-36 -40,-56 Q-20,-36 0,-56 Q20,-36 40,-56 Q60,-36 80,-56 Q100,-36 120,-56 L120,-70 L-120,-70 Z', fill: '#FFFDF6', stroke: SC_INK, 'stroke-width': 3 }, g);
    E('rect', { x: -132, y: 4, width: 264, height: 14, rx: 6, fill: '#C9D3DC', stroke: '#7D8A96', 'stroke-width': 3 }, g);
    [-30, 30].forEach((x, i) => {
      E('rect', { x: x - 16, y: -150, width: 32, height: 80, rx: 6, fill: i ? '#2E7DD8' : '#E8424F', stroke: SC_INK, 'stroke-width': 3 }, g);
      T(g, x, -98, i ? '4' : '6', { size: 30, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
      E('path', { d: `M${x},-176 Q${x + 10},-162 ${x},-154 Q${x - 10},-162 ${x},-176 Z`, fill: '#FFC247', stroke: '#E8424F', 'stroke-width': 2 }, g);
    });
  }
  const cBday = pill(bdayG, "it's my **birthday**", { col: PINK, size: 32 }); tr(cBday, PCX, 196); cBday.set(1);

  /* ===== powers / roots ===== */
  const powG = G(Lp);
  mth(powG, PCX, 180, '64 = 2^6', { size: 52, fill: GOLD });
  const pw1 = G(powG), pw2 = G(powG);
  txt(pw1, PCX, 262, '**square**: every power **even**', { size: 30, boldFill: GREEN });
  mth(pw1, PCX, 318, '8^2 = (2^3)^2 = 2^6', { size: 38 });
  txt(pw2, PCX, 400, '**cube**: powers in the **3** times table', { size: 30, boldFill: ORANGE });
  mth(pw2, PCX, 456, '4^3 = (2^2)^3 = 2^6', { size: 38 });
  const rootG = G(Lp), rt1 = G(rootG), rt2 = G(rootG);
  const cRt1 = pill(rt1, '**square root**: halve every power', { col: GREEN, size: 28 }); tr(cRt1, PCX, 166); cRt1.set(1);
  const rm1 = mth(rt1, PCX, 250, 'sqrt(64) = sqrt(2^6) = 2^3 = 8', { size: 44 });
  const cRt2 = pill(rt2, '**cube root**: divide every power by **3**', { col: ORANGE, size: 28 }); tr(cRt2, PCX, 334); cRt2.set(1);
  const rm2 = mth(rt2, PCX, 420, 'cbrt(64) = cbrt(2^6) = 2^2 = 4', { size: 44 });

  /* ===== quiz / half / halve / fortytwo ===== */
  const quizG = G(Lp);
  E('rect', { x: PCX - 190, y: 132, width: 380, height: 170, rx: 12, fill: MK.paper, stroke: '#8A6A10', 'stroke-width': 5 }, quizG);
  E('rect', { x: PCX - 190, y: 132, width: 380, height: 44, rx: 12, fill: '#FFC247' }, quizG);
  T(quizG, PCX, 164, 'PARTY QUIZ', { size: 26, weight: 800, anchor: 'middle', fill: MK.ink, ls: 3 });
  mth(quizG, PCX, 262, 'sqrt(1764) = "?"', { size: 54, fill: MK.ink });
  const halfG = G(Lp);
  mth(halfG, PCX - 30, 384, '1764 ÷ 2 = 882', { size: 48, fill: ORANGE });
  const stHalf = fmStamp(Lp, 'not');
  const halveG = G(Lp);
  const cHalve = pill(halveG, 'halve the **powers**, not the number', { col: GREEN, size: 30 }); tr(cHalve, PCX, 352); cHalve.set(1);
  mth(halveG, PCX, 448, '1764 = 2^2 * 3^2 * 7^2', { size: 48 });
  const ftG = G(Lp), ft1 = G(ftG), ft2 = G(ftG), ft3 = G(ftG);
  mth(ft1, PCX, 190, 'sqrt(1764) = 2 * 3 * 7 = 42', { size: 46, fill: GOLD });
  const grp = (x, col) => { const c = pill(ft2, '{{2 × 3 × 7}}', { col, size: 34 }); tr(c, x, 290); c.set(1); txt(ft2, x, 372, '= {{42}}', { size: 32, fill: col }); };
  grp(PCX - 150, BLUE); grp(PCX + 150, PINK);
  txt(ft2, PCX, 302, '×', { size: 44 });
  const ftM = mth(ft3, PCX - 20, 460, '42 * 42 = 1764', { size: 44 });
  { const k = tick(ft3, 17, GREEN); tr(k, PCX - 20 + ftM.w / 2 + 34, 446); }

  /* ===== laddoos: ladd / times / eat / cubeit / more ===== */
  const ladG = G(Lp);
  const heapL = [];
  [9, 8, 7, 6, 4, 2].forEach((n, r) => { for (let c = 0; c < n; c++) heapL.push([640 - (n - 1) * 14 + c * 28, 478 - r * 25]); });
  const lads = heapL.map(() => fmLaddoo(ladG, 13));
  const sixPos = n => [560 + (n % 6) * 32, 300 + Math.floor(n / 6) * 32];
  const ladTray = E('rect', { x: 536, y: 288, width: 208, height: 208, rx: 12, fill: 'none', stroke: GOLD, 'stroke-width': 4 }, Lp);
  const lM = mth(Lp, PCX, 196, '180 = 2^2 * 3^2 * 5', { size: 48 });
  const odd5 = G(Lp);
  {
    const x5 = lM.x0 + lM.w - 13;
    E('circle', { cx: x5, cy: 180, r: 26, fill: 'none', stroke: RED, 'stroke-width': 4 }, odd5);
    const c = pill(odd5, '5 to the power **1**: **odd**', { col: RED, size: 26 }); tr(c, Math.min(x5, 990), 258); c.set(1);
  }
  const cLad = pill(Lp, '**180** laddoos', { col: ORANGE, size: 30 });
  const cNotSq = G(Lp);
  { const c = pill(cNotSq, 'not a **square**', { col: RED, size: 30 }); c.set(1); const x = cross(cNotSq, 13); tr(x, c.w / 2 + 20, -2); }
  // times: x 5 -> 900 = 30^2
  const tM = mth(Lp, PCX, 196, '180 * 5 = 900 = 30^2', { size: 46, fill: GOLD });
  const sq30 = G(Lp);
  E('rect', { x: 900, y: 290, width: 190, height: 190, rx: 6, fill: 'rgba(255,228,92,0.12)', stroke: GOLD, 'stroke-width': 5 }, sq30);
  txt(sq30, 995, 395, '{{30 × 30}}', { size: 32, fill: GOLD });
  // eat: / 5 -> 36 = 6^2; the other 144 slide over to Ah Boy
  const eM = mth(Lp, PCX, 196, '180 ÷ 5 = 36 = 6^2', { size: 46, fill: GREEN });
  const c66 = pill(Lp, 'a {{6 × 6}} square', { col: GREEN, size: 30 });
  const pile144 = G(Lhud);
  {
    let d = '';
    [11, 10, 9, 7, 5, 3].forEach((n, r) => { for (let c = 0; c < n; c++) { const x = -(n - 1) * 11 + c * 22, y = -r * 19; d += `M${x - 11},${y} a11,11 0 1,0 22,0 a11,11 0 1,0 -22,0 `; } });
    E('path', { d, fill: '#FFB347', stroke: '#8A4A10', 'stroke-width': 2 }, pile144);
    const c = pill(pile144, 'the other **144**', { col: ORANGE, size: 28 }); tr(c, 0, 44); c.set(1);
  }
  // cubeit: x 150 -> 27 000 = 30^3
  const wkC = mkWorking(Lp, 720, 132, ['180 = 2^2 * 3^2 * 5', { m: '* 2 * 3 * 5^2 = 150', col: ORANGE }, '180 * 150 = 2^3 * 3^3 * 5^3', { m: '= 27 000 = 30^3', col: GOLD }], { size: 32, gap: 10 });
  const mount = G(Lp);
  {
    let d = '';
    for (let r = 0; r < 7; r++) { const n = 19 - 2 * r; for (let c = 0; c < n; c++) { const x = 690 - (n - 1) * 11 + c * 22 + (r % 2) * 0, y = 492 - r * 18; d += `M${x - 11},${y} a11,11 0 1,0 22,0 a11,11 0 1,0 -22,0 `; } }
    E('path', { d, fill: '#FFB347', stroke: '#8A4A10', 'stroke-width': 2 }, mount);
  }
  const c27 = pill(Lp, '**27 000** laddoos!', { col: GOLD, size: 30 });
  // more: the square tray, 720 more
  const moreG = G(Lp);
  const cSqTray = pill(moreG, '**square** tray: {{30 × 30 = 900}}', { col: GOLD, size: 30 }); tr(cSqTray, PCX, 168); cSqTray.set(1);
  mth(moreG, 700, 300, '900 - 180 = 720', { size: 46 });
  txt(moreG, 700, 370, '**720** more laddoos', { size: 32, boldFill: ORANGE });
  E('rect', { x: 900, y: 252, width: 220, height: 220, rx: 6, fill: 'rgba(255,228,92,0.08)', stroke: GOLD, 'stroke-width': 5 }, moreG);
  E('rect', { x: 902.5, y: 428, width: 215, height: 41.5, fill: '#FFB347', opacity: 0.85 }, moreG);
  txt(moreG, 1010, 459, '180', { size: 28, fill: MK.ink });
  txt(moreG, 1010, 350, '720 more', { size: 30, fill: GOLD });

  /* ---------- HUD ---------- */
  const cTime = pill(Lhud, '**7:45 p.m.**', { col: GOLD, size: 32 });
  const star = G(Lhud);
  E('path', { d: 'M0,-26 L7.6,-8 L26,-8 L11,4 L16,23 L0,12 L-16,23 L-11,4 L-26,-8 L-7.6,-8 Z', fill: GOLD, stroke: '#8A6A10', 'stroke-width': 3, 'stroke-linejoin': 'round' }, star);
  const cMine = mkSpeechBubble(Lhud, '**64** is **my** number!', { size: 28, tail: 'down', tailX: -40 });

  /* ---------- the cast ---------- */
  const paati = cast(Lcast, 'paati');
  const kav = cast(Lcast, 'kavya');
  const boy = cast(Lcast, 'boy');
  const mum = cast(Lcast, 'mum');
  const tan = cast(Lcast, 'tan');
  const two = cast(Lcast, 'two');
  const cub = cast(Lfg, 'cubert');
  const ltCub = fmLowerThird(Lhud, 'cubert');
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* ---------- timing ---------- */
  const SA = 235, SB = 360, SY = 440, SS = 0.76;
  const k = id => at(id) - 0.06;
  const cTech = k('tech'), cPow = k('powers'), cQuiz = k('quiz'), cFT = k('fortytwo'), cLd = k('ladd');
  const KEYS = [[-9, 'heap'], [at('tray') + 0.1, 'sq'], [at('tower') + 0.2, 'cube']];

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    vd.upd(t);
    const who = scWho(S, t);
    [cHeap, cBoth, cLad, c66, c27, cTime, cMine].forEach(c => c.set(0));
    [tray, trayLab, cubeBack, cubeLab, cupG, mSq, mCube, perfG, bdayG, powG, rootG, quizG, halfG, halveG, ftG, ladG, ladTray, lM, odd5, cNotSq, tM, sq30, eM, pile144, wkC, mount, moreG, star].forEach(e => op(e, 0));
    stHalf.set(0); ltCub.set(0);
    const vis = { paati: 0, kav: 0, boy: 0, mum: 0, tan: 0, two: 0, cub: 0 };
    const put = (c, key, x, y, st) => { vis[key] = 1; tr(c, x, y, SS); c.set(Object.assign({ t }, st)); };
    popSet(cTime, t, at('cake') + 0.1, 1e9, 1060, 62);

    /* ===== Cubert, on the left end of the table from his entrance ===== */
    if (t >= at('cubert') - 0.5) {
      vis.cub = 1;
      const s = 0.6, inP = P(t, at('cubert') - 0.5, 0.8, easeOut);
      const hop = Math.abs(Math.sin((t - at('cubert')) * 9)) * 40 * (1 - inP);
      let bounce = who === 'cubert' ? Math.abs(Math.sin(t * 6)) * 6 * AMP : 0;
      tr(cub, lerp(-150, 80, inP), 530 - 122 * s - hop - bounce, s);
      let cm = 'happy', cl = 0.9, arms = 0.5;
      if (who === 'cubert') { cl = 0.9; arms = 1; }
      if (t >= at('half') && t < at('halve')) { cm = t > mid('half', 0.5) ? 'shock' : 'neutral'; arms = 0; }
      if (t >= at('bday') && t < cPow) { cm = 'neutral'; arms = 0.2; }
      if (t >= at('more')) { cm = t > mid('more', 0.6) ? 'sad' : 'neutral'; arms = 0; }
      cub.set({ t, talk: scTalk(S, t, 'cubert'), mood: cm, look: cl, arms });
      ltCub.set(win(t, at('cubert') + 0.1, at('cubert') + 3.2, 0.3));
      popSet(cMine, t, mid('cubert', 0.4), at('tray'), 250, 262);
    }

    /* ===== the cupcakes: cake, cubert, tray, tower, perfect ===== */
    if (t < cTech) {
      let pm = 'smug', pl = 0.8;
      if (t >= at('cubert') - 0.3 && t < at('tray')) { pm = 'neutral'; pl = -0.9; }
      if (t >= at('tray')) { pm = 'neutral'; pl = 0.9; }
      if (t >= at('perfect')) { pm = 'smug'; pl = t < end('perfect') ? -0.2 : 0.9; }
      put(paati, 'paati', SA, 418, { talk: scTalk(S, t, 'paati'), mood: pm, look: pl });
      let mm = 'neutral', ml = 0.9;
      if (t >= at('cubert') - 0.3 && t < at('tray')) { mm = 'shock'; ml = -0.9; }
      if (t >= at('tray')) { mm = t < at('tower') ? 'happy' : 'neutral'; ml = 0.9; }
      if (t >= at('perfect')) { mm = 'deadpan'; ml = -0.9; }
      put(mum, 'mum', SB, SY, { talk: scTalk(S, t, 'mum'), mood: mm, look: ml, lift: t >= at('tray') && t < end('tray') ? 1 : 0 });
      op(cupG, 1);
      cups.forEach((c, n) => { const [x, y, s] = cupAt(t, KEYS, n); tr(c, x, y, s); });
      popSet(cHeap, t, mid('cake', 0.45), at('tray'), PCX, 160);
      if (t >= at('tray')) {
        const sqOn = t < at('tower') + 0.2 ? 1 : 1 - P(t, at('tower') + 0.2, 0.3, linear);
        op(tray, P(t, at('tray'), 0.3, linear) * sqOn); op(trayLab, P(t, mid('tray', 0.4), 0.3, linear) * sqOn);
        op(mSq, P(t, mid('tray', 0.5), 0.3, linear));
      }
      if (t >= at('tower')) {
        op(cubeBack, P(t, mid('tower', 0.45), 0.4, linear)); op(cubeLab, P(t, mid('tower', 0.5), 0.4, linear));
        op(mCube, P(t, mid('tower', 0.55), 0.3, linear));
      }
      if (t >= at('perfect')) {
        popSet(cBoth, t, mid('perfect', 0.3), 1e9, 975, 430);
        const sp = P(t, mid('perfect', 0.55), 0.4, pop);
        op(star, clamp(sp * 3)); tr(star, SA - 46, 448, Math.max(0.01, sp * 0.8), Math.sin(t * 3) * 8);
      }
    }

    /* ===== tech, bday (Paati, Mr Tan) ===== */
    if (t >= cTech && t < cPow) {
      const inB = t >= at('bday');
      put(paati, 'paati', SA, 418, { talk: scTalk(S, t, 'paati'), mood: inB ? (t > mid('bday', 0.4) ? 'deadpan' : 'annoyed') : (t > mid('tech', 0.4) ? 'deadpan' : 'smug'), look: 0.9 });
      op(star, 1); tr(star, SA - 46, 448, 0.8, Math.sin(t * 3) * 8);
      const back = inB ? P(t, mid('bday', 0.4), 0.8, ease) : 0;
      vis.tan = 1;
      tr(tan, SB + 40 * back, SY + 14 * back, SS * (1 - 0.12 * back));
      tan.set({ t, talk: scTalk(S, t, 'tan'), mood: inB ? (t > mid('bday', 0.3) ? 'shock' : 'neutral') : 'happy', look: -0.9, lift: !inB && t < end('tech') ? 1 : 0 });
      if (!inB) {
        fadeIn(perfG, t, at('tech') + 0.1);
        op(pM, P(t, mid('tech', 0.55), 0.3, linear)); op(pF, P(t, mid('tech', 0.75), 0.3, linear));
      } else {
        op(perfG, 0);
        const bp = P(t, at('bday') + 0.05, 0.35, pop);
        op(bdayG, clamp(bp * 3));
      }
    }

    /* ===== powers, roots (Kavya, Mr Tan) ===== */
    if (t >= cPow && t < cQuiz) {
      const inR = t >= at('roots');
      put(kav, 'kav', SA, SY, { talk: 0, mood: inR && t > mid('roots', 0.5) ? 'happy' : 'neutral', look: inR ? 0.9 : 0.9 });
      put(tan, 'tan', SB, SY, { talk: 0, mood: t > mid('roots', 0.9) ? 'happy' : 'neutral', look: 0.9 });
      if (!inR) {
        op(powG, P(t, at('powers'), 0.3, linear));
        op(pw1, P(t, mid('powers', 0.3), 0.3, linear)); op(pw2, P(t, mid('powers', 0.62), 0.3, linear));
      } else {
        op(rootG, 1);
        op(rt1, P(t, at('roots') + 0.05, 0.3, linear)); op(rt2, P(t, mid('roots', 0.52), 0.3, linear));
      }
    }

    /* ===== quiz, half, halve (Ah Boy, Mr Tan), fortytwo (Ah Boy, Kavya) ===== */
    if (t >= cQuiz && t < cLd) {
      let bm = 'neutral', bl = 0.9, blift = 0;
      if (t >= at('half') && t < at('halve')) { bm = t > mid('half', 0.7) ? 'shock' : 'happy'; blift = t < mid('half', 0.7) ? 1 : 0; }
      if (t >= at('halve')) { bm = 'neutral'; bl = -0.9; }
      if (t >= cFT) { bm = t > mid('fortytwo', 0.5) ? 'happy' : 'neutral'; bl = 0.9; }
      put(boy, 'boy', SA, SY + 6, { talk: scTalk(S, t, 'boy'), mood: bm, look: bl, lift: blift });
      if (t < cFT) put(tan, 'tan', SB, SY, { talk: scTalk(S, t, 'tan'), mood: t < at('half') ? 'happy' : (t < at('halve') ? 'deadpan' : 'neutral'), look: -0.9, lift: t < end('quiz') ? 1 : 0 });
      else put(kav, 'kav', SB, SY, { talk: scTalk(S, t, 'kavya'), mood: t > mid('fortytwo', 0.75) ? 'smug' : 'neutral', look: 0.9 });
      if (t < cFT) {
        const qp = P(t, at('quiz') + 0.05, 0.35, pop);
        op(quizG, clamp(qp * 3));
        if (t >= at('half') && t < at('halve')) {
          fadeIn(halfG, t, at('half') + 0.1);
          const s0 = mid('half', 0.62);
          stHalf.set(t >= s0 ? P(t, s0, 0.35, linear) : 0); tr(stHalf, PCX - 30, 448, 0.44);
          // Big Two pops up from behind the table with his stamp
          vis.two = 1;
          const up = P(t, at('half') + 0.3, 0.35, pop) * (1 - P(t, end('half') + 0.1, 0.3, ease));
          const s2 = 0.5;
          tr(two, 1100, lerp(640, 530 - 164 * s2, up), s2);
          const stamp = P(t, s0 - 0.5, 0.3, ease) * (1 - P(t, s0 + 0.35, 0.3, ease));
          two.set({ t, talk: 0, mood: stamp > 0.1 ? 'smug' : 'deadpan', look: -1, stamp });
        }
        if (t >= at('halve')) {
          fadeIn(halveG, t, at('halve') + 0.05);
          op(halveG.lastChild, P(t, mid('halve', 0.45), 0.3, linear));
        }
      } else {
        op(ftG, 1);
        op(ft1, P(t, cFT, 0.25, linear));
        op(ft2, P(t, mid('fortytwo', 0.3), 0.3, linear));
        op(ft3, P(t, mid('fortytwo', 0.62), 0.3, linear));
      }
    }

    /* ===== the laddoos (Ah Boy, Mum) ===== */
    if (t >= cLd) {
      const inT = t >= at('times'), inE = t >= at('eat'), inC = t >= at('cubeit'), inM = t >= at('more');
      let bm = 'neutral', bl = 0.9, blift = 0;
      if (inE) { bm = 'happy'; blift = t < end('eat') ? 1 : 0; }
      if (inC) { bm = 'shock'; }
      if (inC && t > mid('cubeit', 0.85)) bm = 'happy';
      if (inM) { bm = t > mid('more', 0.5) ? 'sad' : 'happy'; bl = -0.9; }
      put(boy, 'boy', SA, SY + 6, { talk: scTalk(S, t, 'boy'), mood: bm, look: bl, lift: blift });
      let mm = 'neutral', ml = 0.9;
      if (inT) { mm = 'neutral'; }
      if (inE) { mm = 'annoyed'; ml = -0.9; }
      if (inC) { mm = t > mid('cubeit', 0.85) ? 'shock' : 'neutral'; ml = 0.9; }
      if (inM) { mm = t > mid('more', 0.4) ? 'smug' : 'neutral'; ml = -0.3; }
      put(mum, 'mum', SB, SY, { talk: scTalk(S, t, 'mum'), mood: mm, look: ml, lift: inM && t < end('more') ? 1 : 0 });
      if (!inC) {
        op(ladG, 1);
        lads.forEach((l, n) => {
          const [hx, hy] = heapL[n], [sx, sy] = sixPos(n), p = inE ? P(t, mid('eat', 0.1) + n * 0.01, 0.5, ease) : 0;
          tr(l, lerp(hx, sx, p), lerp(hy, sy, p) - Math.sin(p * Math.PI) * 20);
          op(l, P(t, at('ladd') + n * 0.008, 0.25, linear));
        });
      }
      if (!inT) {
        op(lM, P(t, at('ladd') + 0.1, 0.3, linear));
        popSet(cLad, t, at('ladd') + 0.1, 1e9, 1010, 340);
        op(cNotSq, P(t, mid('ladd', 0.3), 0.3, linear)); tr(cNotSq, 1000, 420);
        op(odd5, P(t, mid('ladd', 0.6), 0.3, linear) * (0.7 + 0.3 * Math.sin(t * 9)));
      } else if (!inE) {
        op(odd5, 1 - P(t, mid('times', 0.3), 0.3, linear)); tr(odd5, 0, -60 * P(t, at('times'), 0.3, linear));
        op(tM, P(t, mid('times', 0.25), 0.3, linear));
        const sp = P(t, mid('times', 0.6), 0.4, pop);
        op(sq30, clamp(sp * 3));
      } else if (!inC) {
        op(eM, P(t, at('eat') + 0.1, 0.3, linear));
        op(ladTray, P(t, mid('eat', 0.45), 0.3, linear));
        popSet(c66, t, mid('eat', 0.5), 1e9, 990, 250);
        const sl = P(t, mid('eat', 0.68), 1.2, ease);
        op(pile144, P(t, mid('eat', 0.6), 0.25, linear));
        tr(pile144, lerp(1000, 262, sl), lerp(470, 600, sl) - Math.sin(sl * Math.PI) * 60, lerp(1, 0.75, sl));
      } else if (!inM) {
        op(wkC, 1); wkC.set(0);
        [0.02, 0.18, 0.45, 0.65].forEach((f, i) => wkC.show(i, P(t, mid('cubeit', f), 0.35, linear)));
        const mp = P(t, mid('cubeit', 0.75), 0.5, easeOut);
        op(mount, mp); tr(mount, 0, 60 * (1 - mp));
        popSet(c27, t, mid('cubeit', 0.8), 1e9, 1010, 440);
      } else {
        fadeIn(moreG, t, at('more') + 0.05);
      }
    }

    op(paati, vis.paati); op(kav, vis.kav); op(boy, vis.boy); op(mum, vis.mum); op(tan, vis.tan); op(two, vis.two); op(cub, vis.cub);
  };
});
