/* Scene 5: Grow, shrink or flip (THE SET PIECE: powers and roots of decimals and negatives).
   Shots (hard sitcom cuts):
   A  the ROBOTICS CLUB booth, as in `inator`: Ah Boy and Kavya (left), Pip on the table, Priya (right), the board
      (far right). Numbers go IN the hopper as balls and roll OUT of the chute; each result goes on the board with
      a SHRINK / GROW / FLIP tag in the zone colour (amber, green, red); the rule of each beat is a chip at the bottom.
      half   0.5 in: 0.5² = 0.5 × 0.5 = 0.25, a 0.5 × 0.5 square inside a 1 × 1 square
      broken Priya's "squaring always makes it bigger" gets the BZZT!; 0.25 < 0.5 SHRINK
      quarter "half of a half = a quarter": between 0 and 1 squaring makes it smaller
      tenth / milli  0.1³ = 0.1 × 0.1 × 0.1 = 0.001: SHRINK again
      root / grow    √0.25 = 0.5, because 0.5² = 0.25: the root is bigger, GROW
      me / nine / off  Dash climbs in as −3: (−3)² = (−3) × (−3) = 9, he slides out as a "+" (push in: showpiece)
      flip / cube    −2 cubed: (−2)³ = 4 × (−2) = −8, three negatives, still negative
      one    ∛(−8) = −2 because (−2)³ = −8: exactly one cube root
      big / error    √(−9): 3² = 9, (−3)² = 9, nothing squares to −9: ERROR, smoke
   B  Mr Tan's board: ipZones builds zone by zone (above 1, 0 to 1, below 0), then the pins at 0 and 1; Mr Tan in an
      inset, top right.
   A  label: Pip on his side, smoking gently; Priya slaps on "WARNING: NOT ALL INPUTS GROW". */
scene('zones', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const popAt = (c, t, t0, x, y, t1) => { c.set(t >= t0 && (t1 === undefined || t < t1) ? P(t, t0, 0.35, linear) : 0); if (x !== undefined) tr(c, x, y); };
  const fadeIn = (el, t, t0, d) => op(el, P(t, t0, d || 0.3, linear));
  const GOLD = '#FFE45C', RED = '#D32F2F', GREEN = '#1E9E5A', AMBER = '#C27C0E', INK = MK.ink, MUTE = '#5A6670', PURP = '#5B3CC4', DASHC = '#3E4A78';
  const numBall = (parent, txt, fill, ink, size) => {
    const g = G(parent);
    E('circle', { r: 34, fill: ball(fill, mkShade(fill, -0.35)), stroke: SC_INK, 'stroke-width': 4 }, g);
    T(g, 0, 11, txt, { size: size || 30, weight: 800, anchor: 'middle', fill: ink || SC_INK });
    return g;
  };
  const arc = (a, b, h, p) => [lerp(a[0], b[0], p), lerp(a[1], b[1], p) - h * 4 * p * (1 - p)];
  const tag = (parent, x, y, word, col) => {   // a SHRINK / GROW / FLIP tag
    const g = G(parent); tr(g, x, y);
    const w = textWidth(word, 30, FD, 800) + 34;
    E('rect', { x: -w / 2, y: -24, width: w, height: 48, rx: 12, fill: col, stroke: SC_INK, 'stroke-width': 3 }, g);
    T(g, 0, 11, word, { size: 30, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 2 });
    return g;
  };

  /* layers */
  const Lset = G(root), Lboard = G(root), Lcast = G(root), Lfront = G(root), Ltop = G(root), Lzone = G(root), Lfg = G(root), Lhud = G(root);
  const ZOOM = [Lset, Lboard, Lcast, Lfront, Ltop];
  const cam = (kk, cx, cy) => {
    const w = 1200 / kk, h = 750 / kk, l = clamp(cx - w / 2, 0, 1200 - w), tp = clamp(cy - h / 2, 0, 750 - h);
    ZOOM.forEach(L => L.setAttribute('transform', `scale(${kk.toFixed(4)}) translate(${(-l).toFixed(1)} ${(-tp).toFixed(1)})`));
  };

  /* ================= A: the booth ================= */
  const booth = ipBooth(Lset, { title: 'ROBOTICS CLUB', col: '#6A4BC4', cloth: '#B48CFF' });
  Lfront.appendChild(booth.front); Lfront.appendChild(booth.top);

  /* ---------- the board ---------- */
  const bd = G(Lboard);
  E('rect', { x: 790, y: 192, width: 380, height: 360, rx: 14, fill: MK.board, stroke: '#8FA3B8', 'stroke-width': 5 }, bd);
  E('rect', { x: 790, y: 192, width: 380, height: 14, rx: 7, fill: '#C9D3DC' }, bd);
  const BX = 980;
  // g0: 0.5 squared, as an area
  const g0 = G(bd);
  mkMath(g0, BX, 234, '0.5^2 = 0.5 * 0.5 = 0.25', { size: 34, fill: INK, anchor: 'middle' });
  const SQX = 910, SQY = 274, SQ = 128;
  E('rect', { x: SQX, y: SQY, width: SQ, height: SQ, fill: '#FFFFFF', stroke: INK, 'stroke-width': 4 }, g0);
  const qSh = E('rect', { x: SQX, y: SQY, width: SQ / 2, height: SQ / 2, fill: '#FFC247', stroke: INK, 'stroke-width': 3 }, g0);
  const qLab = G(g0);
  T(qLab, SQX + SQ / 4, SQY + SQ / 4 + 9, '0.25', { size: 26, weight: 800, anchor: 'middle', fill: INK });
  T(qLab, SQX - 10, SQY + SQ / 4 + 9, '0.5', { size: 26, weight: 700, anchor: 'end', fill: AMBER });
  T(qLab, SQX + SQ / 4, SQY - 8, '0.5', { size: 26, weight: 700, anchor: 'middle', fill: AMBER });
  T(g0, SQX + SQ + 12, SQY + SQ / 2 + 9, '1', { size: 28, weight: 700, fill: MUTE });
  T(g0, SQX + SQ / 2, SQY + SQ + 30, '1', { size: 28, weight: 700, anchor: 'middle', fill: MUTE });
  const q14 = mkText(g0, BX, 482, '{{1/2}} of {{1/2}} = {{1/4}}', { size: 26, anchor: 'middle', fill: INK });
  const gLess = G(g0);
  mkMath(gLess, 930, 484, '0.25 < 0.5', { size: 32, fill: INK, anchor: 'middle' });
  tag(gLess, 1084, 474, 'SHRINK', '#E09A12');
  // g1: 0.1 cubed
  const g1 = G(bd);
  const w1 = mkWorking(g1, 940, 236, ['0.1^3 = 0.1 * 0.1 * 0.1', '= 0.001'], { size: 34, fill: INK });
  const dotBig = E('circle', { cx: 880, cy: 410, r: 46, fill: '#FFC247', stroke: INK, 'stroke-width': 3 }, g1);
  const dotArrow = arrow(g1, 940, 410, 1040, 410, { color: INK, width: 5 });
  const dotSmall = E('circle', { cx: 1070, cy: 410, r: 5, fill: '#FFC247', stroke: INK, 'stroke-width': 2 }, g1);
  T(g1, 880, 490, '0.1', { size: 28, weight: 700, anchor: 'middle', fill: MUTE });
  T(g1, 1070, 490, '0.001', { size: 28, weight: 700, anchor: 'middle', fill: MUTE });
  const tag1 = tag(g1, BX, 334, 'SHRINK', '#E09A12');
  // g2: root of 0.25
  const g2 = G(bd);
  const rQ = mkMath(g2, BX, 266, 'sqrt(0.25) = ?', { size: 44, fill: INK, anchor: 'middle' });
  const rA = mkMath(g2, BX, 266, 'sqrt(0.25) = 0.5', { size: 44, fill: INK, anchor: 'middle' });
  const rB = mkText(g2, BX, 340, 'because {{0.5^2 = 0.25}}', { size: 30, anchor: 'middle', fill: MUTE });
  const rC = mkMath(g2, BX, 406, '0.5 > 0.25', { size: 40, fill: GREEN, anchor: 'middle' });
  const tag2 = tag(g2, BX, 466, 'GROW', '#2FB673');
  // g3: (−3) squared
  const g3 = G(bd);
  const nIn = mkText(g3, BX, 262, 'Input: {{-3}}', { size: 38, fill: DASHC, anchor: 'middle' });
  const w3 = mkWorking(g3, 916, 306, ['(-3)^2 = (-3) * (-3)', '= 9'], { size: 36, fill: INK });
  const tag3 = tag(g3, BX, 424, 'FLIP', '#E5484D');
  const nCube = mkText(g3, BX, 492, 'Now **cube** him: {{-2}}', { size: 30, anchor: 'middle', fill: INK, boldFill: PURP });
  // g4: (−2) cubed
  const g4 = G(bd);
  const w4 = mkWorking(g4, 900, 236, ['(-2)^3 = (-2) * (-2) * (-2)', '= 4 * (-2)', '= -8'], { size: 30, fill: INK });
  const c4 = mkText(g4, BX, 448, '**three** negatives:', { size: 28, anchor: 'middle', fill: INK, boldFill: RED });
  const c4b = mkText(g4, BX, 490, 'still **negative**', { size: 28, anchor: 'middle', fill: INK, boldFill: RED });
  // g5: cube root of −8
  const g5 = G(bd);
  const cbA = mkMath(g5, BX, 280, 'cbrt(-8) = -2', { size: 50, fill: INK, anchor: 'middle' });
  const cbB = mkText(g5, BX, 360, 'because {{(-2)^3 = -8}}', { size: 30, anchor: 'middle', fill: MUTE });
  const cbC = mkText(g5, BX, 450, 'exactly **one** cube root', { size: 30, anchor: 'middle', fill: INK, boldFill: GREEN });
  // g6: root of −9
  const g6 = G(bd);
  const eQ = mkMath(g6, BX, 262, 'sqrt(-9) = ?', { size: 48, fill: INK, anchor: 'middle' });
  const e1 = mkMath(g6, BX, 326, '3^2 = 9', { size: 36, fill: INK, anchor: 'middle' });
  const e2 = mkMath(g6, BX, 378, '(-3)^2 = 9', { size: 36, fill: INK, anchor: 'middle' });
  const e3 = mkText(g6, BX, 432, 'nothing squares to {{-9}}', { size: 28, anchor: 'middle', fill: RED });
  const e4 = mkText(g6, BX, 484, '**no real answer**', { size: 30, anchor: 'middle', fill: RED, boldFill: RED });
  // g7: Power-inator 2
  const g7 = G(bd);
  T(g7, BX, 268, 'POWER-INATOR', { size: 34, weight: 800, anchor: 'middle', fill: PURP, ls: 2 });
  T(g7, BX, 380, '2', { size: 110, weight: 800, anchor: 'middle', fill: PURP });
  mkText(g7, BX, 470, 'GROW · SHRINK · FLIP', { size: 28, anchor: 'middle', fill: INK, weight: 800 });
  const GROUPS = [g0, g1, g2, g3, g4, g5, g6, g7];

  /* ---------- the cast ---------- */
  const XB = 115, XK = 270, XP = 480, XR = 690, YB = 430;
  const boy = cast(Lcast, 'boy', { s: 0.8 });
  const kav = cast(Lcast, 'kavya', { s: 0.8 });
  const priya = cast(Lcast, 'priya', { s: 0.8 });
  const pip = cast(Ltop, 'pip', { s: 0.72 });
  const dash = cast(Ltop, 'dash', { s: 0.4 });
  const PIPY = 530 - 166 * 0.72;
  const HOP = [XP - 123 * 0.72, PIPY - 104 * 0.72], CHUTE = [XP + 186 * 0.72, PIPY + 76 * 0.72];
  const HAND = [XB - 41, 462], DASHP = [336, 530 - 82 * 0.4], DASHOUT = [716, 530 - 82 * 0.4];
  // balls
  const bHalf = numBall(Ltop, '0.5', '#FF8FC8'), b25 = numBall(Ltop, '0.25', '#FFC247', null, 26);
  const bTenth = numBall(Ltop, '0.1', '#56D69B'), b001 = G(Ltop);
  E('circle', { cy: 24, r: 9, fill: ball('#56D69B', '#2F8A5A'), stroke: SC_INK, 'stroke-width': 2.5 }, b001);
  const b05 = numBall(Ltop, '0.5', '#56D69B');
  const bm8 = numBall(Ltop, '−8', '#8C98C8', '#FFFFFF'), bm9 = numBall(Ltop, '−9', '#8C98C8', '#FFFFFF');
  const BALLS = [bHalf, b25, bTenth, b001, b05, bm8, bm9];
  // Dash's number tag (he IS the minus sign: the digit rides beside him)
  const dTag = G(Ltop);
  E('circle', { r: 22, fill: '#FFFFFF', stroke: DASHC, 'stroke-width': 4 }, dTag);
  const dTag3 = T(dTag, 0, 11, '3', { size: 32, weight: 800, anchor: 'middle', fill: DASHC });
  const dTag2 = T(dTag, 0, 11, '2', { size: 32, weight: 800, anchor: 'middle', fill: DASHC });

  /* ---------- chips (foreground, bottom centre) ---------- */
  const CH = (s, col) => mkChip(Lfg, s, { size: 30, col: col || C.ink });
  const cAlways = CH('squaring **always** makes it **bigger**', '#C9B8FF');
  const stBzzt = ipStamp(Lfg, false);
  const cSmaller = CH('between {{0}} and {{1}}: squaring makes it **smaller**', '#FFC247');
  const cSmaller2 = CH('**even smaller**', '#FFC247');
  const cRoot = CH('then a root must shrink it too?', '#C9B8FF');
  const cBigger = CH('the root is **bigger**', '#7FE0A8');
  const cMe = CH('Put **me** in. {{-3}}. Squared.', '#9FB0E0');
  const cFlip = CH('FLIP: a negative squared is **positive**', '#FF8A8A');
  const cOff = CH('Get it **off** me.', '#9FB0E0');
  const cSame = CH('same signs → **+**', '#FF8A8A');
  const cOdd = CH('odd number of negatives → still **negative**', '#FF8A8A');
  const cOne = CH('every number: exactly **one** cube root', '#7FE0A8');
  const cBig = CH('Last one. {{sqrt(-9)}}', '#9FB0E0');
  const cErr = CH('{{sqrt(-9)}}: **no real answer**', '#FF8A8A');
  const CHIPS = [cAlways, cSmaller, cSmaller2, cRoot, cBigger, cMe, cFlip, cOff, cSame, cOdd, cOne, cBig, cErr];

  /* ================= B: Mr Tan's zones board ================= */
  const zShot = G(Lzone);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#0E2433', '#173B4E', true) }, zShot);
  let grid = '';
  for (let x = 0; x <= 1200; x += 60) grid += `M${x},0 L${x},750 `;
  for (let y = 0; y <= 750; y += 60) grid += `M0,${y} L1200,${y} `;
  E('path', { d: grid, stroke: '#FFFFFF', 'stroke-width': 1, opacity: 0.04 }, zShot);
  const zb = ipZones(zShot); tr(zb, 600, 382);
  // Mr Tan's inset, top right
  const inset = G(zShot);
  E('rect', { x: 960, y: 14, width: 214, height: 150, rx: 16, fill: linGrad('#33506E', '#1A2A3A', true), stroke: '#FFE45C', 'stroke-width': 4 }, inset);
  const inClip = _clipUrl('M964,18 L1170,18 L1170,160 L964,160 Z');
  const inWin = G(inset, { 'clip-path': inClip });
  const tan = cast(inWin, 'tan', { s: 0.62, prop: 'pointer' });
  tr(tan, 1067, 118, 0.62);

  /* ================= HUD ================= */
  const stopBlk = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);
  const sticker = G(Lfg);
  const stIn = G(sticker);
  E('rect', { x: -180, y: -50, width: 360, height: 100, rx: 10, fill: '#FFE45C', stroke: SC_INK, 'stroke-width': 5 }, stIn);
  E('rect', { x: -170, y: -40, width: 340, height: 80, rx: 6, fill: 'none', stroke: SC_INK, 'stroke-width': 2, 'stroke-dasharray': '10 6' }, stIn);
  T(stIn, 0, -8, 'WARNING:', { size: 32, weight: 800, anchor: 'middle', fill: '#B3122A', ls: 2 });
  T(stIn, 0, 30, 'NOT ALL INPUTS GROW', { size: 30, weight: 800, anchor: 'middle', fill: SC_INK });
  const puffs = [0, 1, 2].map(() => E('circle', { r: 18, fill: '#9AA6B2', stroke: '#6E7884', 'stroke-width': 3 }, Ltop));

  const SPX = { boy: XB, kavya: XK, pip: XP, dash: DASHP[0], priya: XR };
  const lookTo = (x, t, d) => { const w = scWho(S, t); if (!w || SPX[w] === undefined || Math.abs(SPX[w] - x) < 5) return d; return clamp((SPX[w] - x) / 200, -1, 1); };
  const rollOut = (b, t, t0, x1) => {
    if (t < t0) { op(b, 0); return; }
    op(b, 1);
    const p = P(t, t0, 0.7, easeOut);
    const [x, y] = p < 0.4 ? arc(CHUTE, [lerp(CHUTE[0], x1, 0.4), 496], -10, p / 0.4) : [lerp(lerp(CHUTE[0], x1, 0.4), x1, (p - 0.4) / 0.6), 496];
    tr(b, x, y, 0.95, (x - x1) * 2.2);
  };
  const throwIn = (b, t, t0, dur, from, h) => {
    const p = P(t, t0, dur, linear);
    if (p >= 1) { op(b, 0); return; }
    op(b, 1);
    const [x, y] = arc(from || HAND, [HOP[0], HOP[1] + 10], h || 190, Math.min(p / 0.85, 1));
    tr(b, x, y + (p > 0.85 ? (p - 0.85) * 200 : 0), lerp(0.95, 0.7, p), p * 300);
  };
  const hold = (b, t, t0, t1, pos, s) => { if (t >= t0 && t < t1) { op(b, 1); tr(b, pos[0], pos[1], s || 0.95); } };

  /* cuts */
  const cZ = at('zones') - 0.06, cL = at('label') - 0.06;

  return t => {
    op(stopBlk, 1 - P(t, 0, 0.5, linear));
    const sZ = on(t, cZ, cL), sA = 1 - sZ;
    op(Lzone, sZ);
    [Lset, Lboard, Lcast, Lfront, Ltop].forEach(L => op(L, sA));
    CHIPS.forEach(c => c.set(0)); stBzzt.set(0); op(sticker, 0); puffs.forEach(p => op(p, 0));
    BALLS.forEach(b => op(b, 0)); op(dTag, 0);
    booth.upd(t);
    const who = scWho(S, t);

    /* ================= A ================= */
    if (sA) {
      // which board
      const gi = t < at('tenth') ? 0 : t < at('root') ? 1 : t < at('me') ? 2 : t < at('cube') ? 3 : t < at('one') ? 4 : t < at('big') ? 5 : t < cL ? 6 : 7;
      GROUPS.forEach((g, i) => op(g, i === gi ? 1 : 0));

      // camera: push in on Dash as a "+" for "Get it off me."
      const zOff = t >= at('off') - 0.06 && t < at('flip') - 0.06;
      if (zOff) cam(1.9, 650, 476); else ZOOM.forEach(L => L.removeAttribute('transform'));
      op(Lboard, zOff ? 0 : 1);

      tr(boy, XB, 440, 0.8); tr(kav, XK, YB, 0.8); tr(priya, XR, YB, 0.8);

      /* ---------- Pip ---------- */
      let btn = -1, read = '', shake = 0, light = 0, pm = 'happy', err = 0, smoke = 0;
      if (t < at('broken')) { btn = t >= mid('half', 0.3) ? 0 : -1; read = t >= mid('half', 0.62) ? '0.25' : ''; light = t >= mid('half', 0.3) && t < mid('half', 0.62) ? 1 : 0; }
      else if (t < at('tenth')) { btn = 0; read = '0.25'; }
      else if (t < at('root')) { btn = t >= mid('milli', 0.0) ? 1 : -1; read = t >= mid('milli', 0.62) ? '0.001' : ''; }
      else if (t < at('me')) { btn = t >= mid('root', 0.55) ? 2 : -1; read = t >= at('grow') ? '0.5' : t >= mid('root', 0.7) ? '?' : ''; }
      else if (t < at('flip')) { btn = t >= at('nine') ? 0 : -1; read = t >= mid('nine', 0.75) ? '9' : ''; light = t >= at('nine') && t < mid('nine', 0.6) ? 1 : 0; }
      else if (t < at('one')) { btn = t >= at('cube') ? 1 : -1; read = t >= mid('cube', 0.75) ? '−8' : ''; light = t >= at('cube') && t < mid('cube', 0.5) ? 1 : 0; }
      else if (t < at('big')) { btn = t >= mid('one', 0.25) ? 3 : -1; read = t >= mid('one', 0.4) ? '−2' : ''; }
      else if (t < cL) {
        btn = t >= mid('error', 0.0) ? 2 : -1;
        const eT = mid('error', 0.55);
        if (t >= mid('error', 0.05)) { shake = t < eT ? 0.6 : 1; light = 1; read = t < eT ? '...' : ''; }
        if (t >= eT) { err = 1; smoke = 1; pm = 'shock'; }
      }
      pip.set({ t, talk: scTalk(S, t, 'pip'), mood: pm, look: lookTo(XP, t, 0), btn, read, shake: shake * AMP, light, err, smoke: smoke * (S.reduce ? 0.5 : 1) });
      if (t >= cL) {
        // Pip on his side, smoking gently
        const fall = P(t, cL, 0.45, easeOut);
        tr(pip, XP + 20 * fall, lerp(PIPY, 530 - 140 * 0.72, fall), 0.72, -90 * fall);
        pip.set({ t, talk: 0, mood: 'deadpan', look: 0, btn: -1, read: '', err: 0, smoke: 0, still: true });
        puffs.forEach((pf, i) => {
          const f = (t * 0.5 + i / 3) % 1;
          op(pf, 0.7 * (1 - f)); tr(pf, XP - 120 + Math.sin(t * 2 + i) * 8 * AMP + 20 * f, 440 - f * 140, 0.6 + f * 0.9);
        });
      } else tr(pip, XP, PIPY, 0.72);

      /* ---------- humans ---------- */
      let bm = 'happy', km = 'neutral', rm = 'smug', blift = 0, rlift = 0, kl = null, rl = null;
      if (t < at('broken')) { rm = t >= mid('half', 0.62) ? 'shock' : 'smug'; blift = t < mid('half', 0.15) ? 1 : 0; }
      else if (t < at('quarter')) { rm = 'shock'; km = 'deadpan'; }
      else if (t < at('tenth')) { rm = 'annoyed'; km = 'happy'; }
      else if (t < at('root')) { blift = t < mid('tenth', 0.5) ? 1 : 0; rm = 'annoyed'; }
      else if (t < at('grow')) { rm = 'smug'; rlift = t >= mid('root', 0.5) ? 1 : 0; }
      else if (t < at('me')) { rm = t >= mid('grow', 0.55) ? 'annoyed' : 'neutral'; km = 'happy'; }
      else if (t < at('off')) { rm = t >= mid('nine', 0.6) ? 'shock' : 'neutral'; bm = t >= mid('nine', 0.6) ? 'shock' : 'happy'; km = t >= mid('nine', 0.6) ? 'shock' : 'neutral'; }
      else if (t < at('flip')) { km = 'deadpan'; rm = 'deadpan'; }
      else if (t < at('one')) { km = t < at('cube') ? 'smug' : 'neutral'; rm = 'neutral'; }
      else if (t < at('big')) { blift = t < mid('one', 0.2) ? 1 : 0; km = 'happy'; }
      else if (t < cL) { km = t >= mid('error', 0.55) ? 'shock' : 'neutral'; rm = t >= mid('error', 0.55) ? 'shock' : 'neutral'; bm = t >= mid('error', 0.55) ? 'shock' : 'happy'; }
      else { rm = 'smug'; km = 'deadpan'; bm = 'happy'; rlift = t >= mid('label', 0.15) && t < mid('label', 0.6) ? 1 : 0; rl = -1; kl = 0.8; }
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: bm, look: lookTo(XB, t, 0.8), lift: blift });
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl !== null ? kl : lookTo(XK, t, 0.6) });
      priya.set({ t, talk: scTalk(S, t, 'priya'), mood: rm, look: rl !== null ? rl : lookTo(XR, t, -0.6), lift: rlift });

      /* ---------- Dash ---------- */
      let dx = DASHP[0], dy = DASHP[1], ds = 0.4, dmood = 'sad', dshow = 1, plus = 0, drot = 0, darms = 0;
      const inA = mid('me', 0.62), outA = mid('nine', 0.55), inB = mid('flip', 0.7), outB = mid('cube', 0.62), home = at('one');
      const climb = (p, from) => { const [x, y] = arc(from, [HOP[0], HOP[1] + 6], 120, Math.min(p / 0.8, 1)); return [x, y, 0.4 * (p < 0.8 ? 1 : 1 - (p - 0.8) / 0.2), p < 1 ? 1 : 0]; };
      const slide = p => { const [x, y] = p < 0.45 ? arc(CHUTE, [lerp(CHUTE[0], DASHOUT[0], 0.5), DASHOUT[1]], -6, p / 0.45) : [lerp(lerp(CHUTE[0], DASHOUT[0], 0.5), DASHOUT[0], (p - 0.45) / 0.55), DASHOUT[1]]; return [x, y, 0.4 * clamp(0.3 + p * 3)]; };
      if (t >= inA && t < outA) { const p = P(t, inA, 0.5, linear); [dx, dy, ds, dshow] = climb(p, DASHP); drot = -20; }
      else if (t >= outA && t < inB) { const p = P(t, outA, 0.55, linear); [dx, dy, ds] = slide(p); plus = P(t, outA + 0.1, 0.4, pop); }
      else if (t >= inB && t < outB) { const p = P(t, inB, 0.5, linear); [dx, dy, ds, dshow] = climb(p, DASHOUT); drot = -20; plus = 0; }
      else if (t >= outB && t < home) { const p = P(t, outB, 0.55, linear); [dx, dy, ds] = slide(p); }
      else if (t >= home && t < at('big') + 0.6) { const p = P(t, home, 0.6, linear); [dx, dy] = arc(DASHOUT, DASHP, 150, p); ds = 0.4; }
      // plus bar fades during "flip" (Kavya talks him back into a minus)
      if (t >= at('flip') && t < inB) plus = 1 - P(t, mid('flip', 0.35), 0.4, linear);
      if (t >= at('off') && t < at('flip')) drot = Math.sin(t * 22) * 7 * AMP;   // shaking the bar off
      if (t < at('me')) dmood = 'sad';
      else if (t < outA) { dmood = 'annoyed'; darms = t < inA ? 0.6 : 0; }
      else if (t < at('off')) dmood = 'shock';
      else if (t < at('flip')) { dmood = 'annoyed'; darms = 1; }
      else if (t < outB) dmood = 'deadpan';
      else if (t < at('big')) dmood = 'sad';
      else if (t < mid('error', 0.55)) { dmood = 'annoyed'; darms = t < mid('error', 0.06) ? 0.8 : 0; }
      else if (t < cL) dmood = 'deadpan';
      else dmood = 'deadpan';
      op(dash, dshow); tr(dash, dx, dy, Math.max(0.01, ds), drot);
      dash.set({ t, talk: scTalk(S, t, 'dash'), mood: dmood, look: who === 'dash' ? 0.3 : lookTo(dx, t, 0), arms: darms, plus });
      // his number tag: "3" from "me" until he is squared, "2" on "flip" until cubed
      if (t >= mid('me', 0.3) && t < inA + 0.4) { op(dTag, 1); op(dTag3, 1); op(dTag2, 0); tr(dTag, dx + 66 * ds / 0.4, dy - 4, Math.max(0.01, ds / 0.4)); }
      if (t >= mid('flip', 0.6) && t < inB + 0.4) { op(dTag, 1); op(dTag3, 0); op(dTag2, 1); tr(dTag, dx + 66 * ds / 0.4, dy - 4, Math.max(0.01, ds / 0.4)); }

      /* ---------- balls ---------- */
      if (t < at('broken')) { if (t < mid('half', 0.12)) hold(bHalf, t, 0, 1e9, HAND); else throwIn(bHalf, t, mid('half', 0.12), 0.75); }
      if (t < at('root') + 0.1) rollOut(b25, t, mid('half', 0.66), 650);
      if (t >= at('root') && t < at('grow')) throwIn(b25, t, mid('root', 0.15), 0.8, [650, 496], 170);
      if (t >= at('tenth') - 0.2 && t < at('root')) { if (t < mid('tenth', 0.45)) hold(bTenth, t, 0, 1e9, HAND); else throwIn(bTenth, t, mid('tenth', 0.45), 0.75); }
      if (t >= at('milli') && t < at('root') + 0.2) rollOut(b001, t, mid('milli', 0.66), 730);
      if (t >= at('grow') && t < at('me') + 0.2) rollOut(b05, t, mid('grow', 0.3), 650);
      if (t >= at('one') - 0.2 && t < at('big')) { if (t < mid('one', 0.08)) hold(bm8, t, 0, 1e9, HAND); else throwIn(bm8, t, mid('one', 0.08), 0.75); }
      if (t >= at('big') && t < at('error') + 1) {
        if (t < mid('error', 0.04)) hold(bm9, t, 0, 1e9, [DASHP[0] + 58, DASHP[1] - 34], 0.8);
        else throwIn(bm9, t, mid('error', 0.04), 0.5, [DASHP[0] + 58, DASHP[1] - 34], 60);
      }

      /* ---------- board beats ---------- */
      if (gi === 0) {
        op(qSh, P(t, mid('half', 0.55), 0.3, linear)); op(qLab, P(t, mid('half', 0.6), 0.3, linear));
        op(gLess, P(t, mid('broken', 0.55), 0.3, linear) * (t < at('quarter') + 0.1 ? 1 : 0));
        op(q14, P(t, mid('quarter', 0.2), 0.3, linear));
      }
      if (gi === 1) { w1.show(1, P(t, mid('milli', 0.62), 0.35, linear)); op(dotSmall, P(t, mid('milli', 0.72), 0.3, linear)); dotArrow.set(P(t, mid('milli', 0.65), 0.4, linear)); op(tag1, P(t, mid('milli', 0.8), 0.3, linear)); }
      if (gi === 2) {
        op(rQ, t < at('grow') ? 1 : 0); op(rA, t >= at('grow') ? 1 : 0);
        fadeIn(rB, t, mid('grow', 0.4)); fadeIn(rC, t, mid('grow', 0.52)); fadeIn(tag2, t, mid('grow', 0.62));
      }
      if (gi === 3) {
        op(nIn, P(t, mid('me', 0.45), 0.3, linear));
        w3.show(0, P(t, at('nine'), 0.35, linear)); w3.show(1, P(t, mid('nine', 0.75), 0.35, linear));
        fadeIn(tag3, t, mid('nine', 0.88));
        fadeIn(nCube, t, mid('flip', 0.6));
      }
      if (gi === 4) {
        w4.show(0, P(t, at('cube'), 0.35, linear)); w4.show(1, P(t, mid('cube', 0.42), 0.35, linear)); w4.show(2, P(t, mid('cube', 0.55), 0.35, linear));
        fadeIn(c4, t, mid('cube', 0.6)); fadeIn(c4b, t, mid('cube', 0.66));
      }
      if (gi === 5) { fadeIn(cbA, t, mid('one', 0.12)); fadeIn(cbB, t, mid('one', 0.32)); fadeIn(cbC, t, mid('one', 0.6)); }
      if (gi === 6) {
        fadeIn(eQ, t, mid('big', 0.5)); fadeIn(e1, t, mid('error', 0.06)); fadeIn(e2, t, mid('error', 0.2));
        fadeIn(e3, t, mid('error', 0.38)); fadeIn(e4, t, mid('error', 0.6));
      }

      /* ---------- chips ---------- */
      const BOT = [560, 640];
      popAt(cAlways, t, at('broken'), BOT[0], BOT[1], at('quarter'));
      if (t >= mid('broken', 0.35) && t < at('quarter')) { stBzzt.set(P(t, mid('broken', 0.35), 0.3, linear)); tr(stBzzt, BOT[0] + 200, BOT[1] - 50, 0.5); }
      popAt(cSmaller, t, mid('quarter', 0.45), BOT[0], BOT[1], at('tenth'));
      popAt(cSmaller2, t, mid('milli', 0.8), BOT[0], BOT[1], at('root'));
      popAt(cRoot, t, mid('root', 0.1), BOT[0], BOT[1], at('grow'));
      popAt(cBigger, t, mid('grow', 0.56), BOT[0], BOT[1], at('me'));
      popAt(cMe, t, mid('me', 0.15), BOT[0], BOT[1], at('nine'));
      popAt(cFlip, t, mid('nine', 0.85), BOT[0], BOT[1], at('off'));
      popAt(cOff, t, mid('off', 0.2), BOT[0], BOT[1], at('flip'));
      popAt(cSame, t, mid('flip', 0.1), BOT[0], BOT[1], at('cube'));
      popAt(cOdd, t, mid('cube', 0.68), BOT[0], BOT[1], at('one'));
      popAt(cOne, t, mid('one', 0.62), BOT[0], BOT[1], at('big'));
      popAt(cBig, t, mid('big', 0.2), BOT[0], BOT[1], at('error'));
      popAt(cErr, t, mid('error', 0.6), BOT[0], BOT[1], cL);
    }

    /* ================= B: the zones board ================= */
    if (sZ) {
      const z1 = at('zones'), z2 = at('neg');
      zb.title(P(t, z1, 0.3, linear));
      const zp = [P(t, z2 + 0.15, 0.3, linear), P(t, mid('zones', 0.55), 0.3, linear), P(t, mid('zones', 0.13), 0.3, linear)];
      zp.forEach((p, i) => { zb.zone(i, p); zb.card(i, p); });
      [[2, [0.24, 0.33, 0.43]], [1, [0.68, 0.76, 0.86]]].forEach(([i, fs]) => fs.forEach((f, r) => zb.row(i, r, P(t, mid('zones', f), 0.3, linear))));
      [0.12, 0.27, 0.4, 0.53].forEach((f, r) => zb.row(0, r, P(t, mid('neg', f), 0.3, linear)));
      zb.pins(P(t, mid('neg', 0.76), 0.35, linear));
      tan.set({ t, talk: scTalk(S, t, 'tan'), mood: 'happy', look: -0.6, lift: t >= mid('zones', 0.1) && t < mid('neg', 0.9) ? 1 : 0 });
    }

    /* ================= A: the warning label ================= */
    if (t >= cL) {
      const sp = P(t, mid('label', 0.45), 0.3, easeOut);
      if (t >= mid('label', 0.45)) { op(sticker, 1); tr(sticker, 590, 438, lerp(1.4, 0.9, sp), -6); op(stIn, clamp(sp * 3)); }
    }
  };
});
