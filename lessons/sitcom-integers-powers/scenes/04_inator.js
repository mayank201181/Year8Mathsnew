/* Scene 4: The Power-inator (squares, cubes, ± square roots, estimating roots).
   One booth, ROBOTICS CLUB, noon: Ah Boy and Kavya behind the table on the left, Pip (Priya's robot) on the table,
   Priya on the right, Priya's board on the far right. Numbers go IN the hopper as balls; results show on Pip's
   readout and the board; balls roll OUT of the chute.
   priya  the four buttons light: square, cube, square root, cube root (legend on the board)
   seven  Ah Boy throws a "7" ball into the hopper
   sq     Pip (lower third): 7² = 7 × 7 = 49, the square numbers to 225 (49 lit)
   cube   4³ = 4 × 4 × 4 = 64, the cube numbers, 10³ = 1000
   rev    √49 = 7: one "7" ball rolls out
   me     push in: Dash climbs into the hopper, (−7) × (−7) = 49, a "−7" ball rolls out (showpiece)
   pm     49 has two square roots ±7; √ alone means the positive one
   x2     x² = 49 ⇒ x = ±7; question 6 on Kavya's test gets its tick (CORRECT!)
   trap   √50: 49 < 50 < 64 ⇒ 7 < √50 < 8 on a number line 6..9
   check  7.1² = 50.41 too big, √50 ≈ 7.07
   bigger / half   "squaring always makes it bigger" ... Ah Boy holds up a ½ ball. */
scene('inator', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const popAt = (c, t, t0, x, y, t1) => { c.set(t >= t0 && (t1 === undefined || t < t1) ? P(t, t0, 0.35, linear) : 0); if (x !== undefined) tr(c, x, y); };
  const GOLD = '#FFE45C', RED = '#D32F2F', GREEN = '#1E9E5A', INK = MK.ink, MUTE = '#5A6670', PURP = '#5B3CC4', DASHC = '#3E4A78';
  const numBall = (parent, txt, fill, ink) => {
    const g = G(parent);
    E('circle', { r: 32, fill: ball(fill, mkShade(fill, -0.35)), stroke: SC_INK, 'stroke-width': 4 }, g);
    T(g, 0, 13, txt, { size: 36, weight: 800, anchor: 'middle', fill: ink || SC_INK });
    return g;
  };
  const arc = (a, b, h, p) => [lerp(a[0], b[0], p), lerp(a[1], b[1], p) - h * 4 * p * (1 - p)];

  /* layers */
  const Lset = G(root), Lboard = G(root), Lcast = G(root), Lfront = G(root), Ltop = G(root), Lfg = G(root), Lhud = G(root);
  const ZOOM = [Lset, Lboard, Lcast, Lfront, Ltop];
  const cam = (kk, cx, cy) => {
    const w = 1200 / kk, h = 750 / kk, l = clamp(cx - w / 2, 0, 1200 - w), tp = clamp(cy - h / 2, 0, 750 - h);
    ZOOM.forEach(L => L.setAttribute('transform', `scale(${kk.toFixed(4)}) translate(${(-l).toFixed(1)} ${(-tp).toFixed(1)})`));
  };

  /* ================= the booth ================= */
  const booth = ipBooth(Lset, { title: 'ROBOTICS CLUB', col: '#6A4BC4', cloth: '#B48CFF' });
  Lfront.appendChild(booth.front); Lfront.appendChild(booth.top);

  /* ================= the board ================= */
  const bd = G(Lboard);
  E('rect', { x: 790, y: 192, width: 380, height: 360, rx: 14, fill: MK.board, stroke: '#8FA3B8', 'stroke-width': 5 }, bd);
  E('rect', { x: 790, y: 192, width: 380, height: 14, rx: 7, fill: '#C9D3DC' }, bd);
  const BX = 980;
  // g0: the four buttons
  const g0 = G(bd);
  T(g0, BX, 246, 'POWER-INATOR', { size: 32, weight: 800, anchor: 'middle', fill: PURP, ls: 2 });
  const legBand = [], legRows = [['x^2', 'square'], ['x^3', 'cube'], ['sqrt(x)', 'square root'], ['cbrt(x)', 'cube root']].map(([m, w], i) => {
    const y = 300 + i * 54;
    const band = E('rect', { x: 812, y: y - 38, width: 336, height: 50, rx: 10, fill: 'rgba(255,228,92,0.6)' }, g0); op(band, 0); legBand.push(band);
    const r = G(g0);
    mkMath(r, 870, y, m, { size: 32, fill: INK, anchor: 'middle' });
    T(r, 936, y, w, { size: 30, weight: 700, fill: INK });
    return r;
  });
  // g1: squares
  const g1 = G(bd);
  mkMath(g1, BX, 254, '7^2 = 7 * 7 = 49', { size: 40, fill: INK, anchor: 'middle' });
  T(g1, BX, 300, 'square numbers', { size: 26, weight: 700, anchor: 'middle', fill: MUTE });
  const SQ = mkTable(g1, [['1', '4', '9', '16', '25'], ['36', '49', '64', '81', '100'], ['121', '144', '169', '196', '225']], { colW: 70, rowH: 44, size: 28, ink: INK, head: false, fill: '#FFFFFF' });
  tr(SQ, 805, 316);
  const sq49 = SQ.mark(1, 1, 'rgba(255,194,71,0.75)');
  // g2: cubes
  const g2 = G(bd);
  mkMath(g2, BX, 254, '4^3 = 4 * 4 * 4 = 64', { size: 36, fill: INK, anchor: 'middle' });
  T(g2, BX, 304, 'cube numbers', { size: 26, weight: 700, anchor: 'middle', fill: MUTE });
  mkText(g2, BX, 356, '1, 8, 27, **64**, 125, …', { size: 32, anchor: 'middle', fill: INK, boldFill: '#C27C0E' });
  const c1000 = mkMath(g2, BX, 440, '10^3 = 1000', { size: 44, fill: PURP, anchor: 'middle' });
  // g3: √49, (−7) × (−7), ±7
  const g3 = G(bd);
  const r49 = mkMath(g3, BX, 270, 'sqrt(49) = 7', { size: 54, fill: INK, anchor: 'middle' });
  const m77 = mkMath(g3, BX, 340, '(-7) * (-7) = 49', { size: 38, fill: DASHC, anchor: 'middle' });
  const pm1 = mkText(g3, BX, 412, '**two** square roots: {{+-7}}', { size: 34, anchor: 'middle', fill: INK, boldFill: GREEN });
  const pm2 = mkText(g3, BX, 470, '√ alone = the **positive** one', { size: 28, anchor: 'middle', fill: MUTE, boldFill: GREEN });
  // g4: x² = 49
  const g4 = G(bd);
  mkMath(g4, 820, 262, 'x^2 = 49', { size: 46, fill: INK });
  mkMath(g4, 820, 330, '=> x = +-7', { size: 46, fill: GREEN });
  const q6card = G(g4);
  E('rect', { x: 808, y: 372, width: 344, height: 64, rx: 8, fill: '#FFFFFF', stroke: '#B8C4CE', 'stroke-width': 3 }, q6card);
  const q6a = mkText(q6card, 822, 414, '6. {{x^2 = 49, x = 7}}', { size: 28, fill: INK });
  const q6b = mkText(q6card, 822, 414, '6. {{x^2 = 49, x = +-7}}', { size: 28, fill: INK });
  const q6x = cross(q6card, 14, RED); tr(q6x, 1124, 404);
  const q6t = tick(q6card, 16, GREEN); tr(q6t, 1124, 404);
  const q6m = mkText(g4, BX, 482, '**4 marks** back', { size: 30, anchor: 'middle', fill: GREEN });
  // g5: √50, trapped
  const g5 = G(bd);
  mkMath(g5, BX, 252, 'sqrt(50) = ?', { size: 38, fill: INK, anchor: 'middle' });
  const NL = mkNumberLine(g5, { from: 6, to: 9, len: 300, size: 28, ink: INK, arrows: false,
    marks: [{ v: Math.sqrt(50), label: '{{sqrt(50)}}', col: RED, size: 26 }] });
  tr(NL, 830, 336);
  [36, 49, 64, 81].forEach((v, i) => T(g5, 830 + NL.x(6 + i), 412, String(v), { size: 26, weight: 700, anchor: 'middle', fill: i === 1 || i === 2 ? '#C27C0E' : MUTE }));
  const tr1 = mkMath(g5, BX, 458, '49 < 50 < 64', { size: 32, fill: INK, anchor: 'middle' });
  const tr2 = mkMath(g5, BX, 508, '=> 7 < sqrt(50) < 8', { size: 32, fill: GREEN, anchor: 'middle' });
  // g6: check
  const g6 = G(bd);
  mkMath(g6, BX, 262, '7.1^2 = 50.41', { size: 42, fill: RED, anchor: 'middle' });
  const tooBig = mkText(g6, BX, 312, '**too big**', { size: 28, anchor: 'middle', fill: RED });
  const ck2 = mkMath(g6, BX, 410, 'sqrt(50) ~= 7.07', { size: 50, fill: GREEN, anchor: 'middle' });
  // g7: always bigger?
  const g7 = G(bd);
  mkText(g7, BX, 286, 'squaring **always**', { size: 36, anchor: 'middle', fill: INK, boldFill: PURP });
  mkText(g7, BX, 336, 'makes it **bigger**', { size: 36, anchor: 'middle', fill: INK, boldFill: PURP });
  const qmark = T(g7, BX, 478, '?', { size: 96, weight: 800, anchor: 'middle', fill: RED });
  const GROUPS = [g0, g1, g2, g3, g4, g5, g6, g7];

  /* ================= the cast ================= */
  const XB = 115, XK = 270, XP = 480, XR = 690, YB = 430;
  const boy = cast(Lcast, 'boy', { s: 0.8 });
  const kav = cast(Lcast, 'kavya', { s: 0.8 });
  const priya = cast(Lcast, 'priya', { s: 0.8 });
  const pip = cast(Ltop, 'pip', { s: 0.72 });
  const dash = cast(Ltop, 'dash', { s: 0.4 });
  const PIPY = 530 - 166 * 0.72;
  const HOP = [XP - 123 * 0.72, PIPY - 104 * 0.72], CHUTE = [XP + 186 * 0.72, PIPY + 76 * 0.72];
  const HAND = [XB - 41, 462], DASHP = [336, 530 - 82 * 0.4];
  // the balls
  const b7in = numBall(Ltop, '7', '#FFD23C'), b7 = numBall(Ltop, '7', '#FFD23C'), bm7 = numBall(Ltop, '−7', '#8C98C8', '#FFFFFF');
  const b50 = numBall(Ltop, '50', '#56D69B'), bHalf = numBall(Ltop, '½', '#FF8FC8');
  const c77 = mkChip(Lfg, '{{(-7) * (-7) = 49}}', { size: 40, col: '#9FB0E0' });
  const cNobody = mkChip(Lfg, 'Nobody ever counts **me**.', { size: 30, col: '#9FB0E0' });
  const lt = { pip: ipLowerThird(Lhud, 'pip') };
  const stOK = ipStamp(Lhud, true);
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);
  const SPX = { boy: XB, kavya: XK, pip: XP, dash: DASHP[0], priya: XR };
  const lookTo = (x, t, d) => { const w = scWho(S, t); if (!w || SPX[w] === undefined || Math.abs(SPX[w] - x) < 5) return d; return clamp((SPX[w] - x) / 200, -1, 1); };
  // where a ball that rolled out of the chute comes to rest
  const rollOut = (b, t, t0, x1) => {
    if (t < t0) { op(b, 0); return; }
    op(b, 1);
    const p = P(t, t0, 0.7, easeOut);
    const [x, y] = p < 0.4 ? arc(CHUTE, [lerp(CHUTE[0], x1, 0.4), 498], -10, p / 0.4) : [lerp(lerp(CHUTE[0], x1, 0.4), x1, (p - 0.4) / 0.6), 498];
    tr(b, x, y, 0.95, (x - x1) * 2.2);
  };
  const throwIn = (b, t, t0, dur) => {
    const p = P(t, t0, dur, linear);
    if (p >= 1) { op(b, 0); return; }
    op(b, 1);
    const [x, y] = arc(HAND, [HOP[0], HOP[1] + 10], 190, Math.min(p / 0.85, 1));
    tr(b, x, y + (p > 0.85 ? (p - 0.85) * 200 : 0), lerp(0.95, 0.7, p), p * 300);
  };

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    booth.upd(t);
    lt.pip.set(win(t, at('sq') + 0.1, at('sq') + 3.2, 0.3));
    stOK.set(0); c77.set(0); cNobody.set(0);
    [b7in, b7, bm7, b50, bHalf].forEach(b => op(b, 0));
    const who = scWho(S, t);

    // which board
    const gi = t < at('sq') ? 0 : t < at('cube') ? 1 : t < at('rev') ? 2 : t < at('x2') ? 3 : t < at('trap') ? 4 : t < at('check') ? 5 : t < at('bigger') ? 6 : 7;
    GROUPS.forEach((g, i) => op(g, i === gi ? 1 : 0));

    // camera: push in on the hopper for Dash's climb
    const zMe = t >= at('me') - 0.06 && t < at('pm') - 0.06;
    if (zMe) cam(1.55, 470, 412); else ZOOM.forEach(L => L.removeAttribute('transform'));

    tr(boy, XB, 440, 0.8); tr(kav, XK, YB, 0.8); tr(priya, XR, YB, 0.8); tr(pip, XP, PIPY, 0.72);

    /* ---------- Pip ---------- */
    let btn = -1, read = '', shake = 0, light = 0, pm = 'happy';
    if (t < at('seven')) { const bt = [0.34, 0.46, 0.6, 0.78].map(f => mid('priya', f)); bt.forEach((b, i) => { if (t >= b) btn = i; }); legBand.forEach((b, i) => op(b, btn === i ? 1 : 0)); }
    else if (t < at('sq')) { btn = t >= mid('seven', 0.6) ? 0 : -1; legBand.forEach((b, i) => op(b, i === 0 && btn === 0 ? 1 : 0)); light = t >= mid('seven', 0.8) ? 1 : 0; }
    else if (t < at('cube')) { btn = 0; read = t >= mid('sq', 0.6) ? '49' : ''; }
    else if (t < at('rev')) { btn = 1; read = t < mid('cube', 0.66) ? '64' : '1000'; }
    else if (t < at('x2')) { btn = 2; read = t < at('pm') ? '7' : '±7'; }
    else if (t < at('trap')) { read = '±7'; }
    else if (t < at('check')) { btn = 2; shake = t >= mid('trap', 0.2) && t < mid('trap', 0.7) ? 1 : 0; read = t >= mid('trap', 0.5) ? '7.?' : ''; light = shake; }
    else if (t < at('bigger')) { btn = 2; read = t >= mid('check', 0.5) ? '7.07' : '7.?'; }
    else { btn = t < at('half') ? 0 : -1; read = ''; pm = t >= at('half') ? 'shock' : 'happy'; }
    if (t >= at('half')) { op(g7, 1); }
    pip.set({ t, talk: scTalk(S, t, 'pip'), mood: pm, look: lookTo(XP, t, 0), btn, read, shake: shake * AMP, light });
    op(qmark, P(t, at('half') + 0.1, 0.3, linear));

    /* ---------- the humans ---------- */
    let bm = 'happy', km = 'neutral', rm = 'smug', blift = 0;
    if (t < at('seven')) { km = 'neutral'; }
    else if (t < at('sq')) { blift = 1; }
    else if (t < at('rev')) { km = 'happy'; }
    else if (t < at('x2')) { km = t >= at('pm') ? 'happy' : 'neutral'; rm = t >= at('me') ? 'annoyed' : 'smug'; bm = t >= at('me') ? 'shock' : 'happy'; }
    else if (t < at('trap')) { km = 'happy'; rm = 'neutral'; }
    else if (t < at('bigger')) { km = 'neutral'; blift = t < mid('trap', 0.1) ? 1 : 0; }
    else if (t < at('half')) { rm = 'smug'; km = 'deadpan'; }
    else { blift = 1; rm = 'shock'; km = 'smug'; }
    boy.set({ t, talk: scTalk(S, t, 'boy'), mood: bm, look: lookTo(XB, t, 0.8), lift: blift });
    kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: lookTo(XK, t, 0.6) });
    priya.set({ t, talk: scTalk(S, t, 'priya'), mood: rm, look: t >= at('half') ? -1 : lookTo(XR, t, -0.6), lift: 0 });

    /* ---------- Dash: in the hopper and out again ---------- */
    let dx = DASHP[0], dy = DASHP[1], ds = 0.4, dmood = 'sad', dshow = 1;
    const cIn = mid('me', 0.66), cOut = mid('pm', 0.08);
    if (t >= cIn && t < cOut) {
      const p = P(t, cIn, 0.5, linear);
      [dx, dy] = arc(DASHP, [HOP[0], HOP[1] + 6], 120, Math.min(p / 0.8, 1));
      ds = 0.4 * (p < 0.8 ? 1 : 1 - (p - 0.8) / 0.2);
      dshow = p < 1 ? 1 : 0;
    } else if (t >= cOut) {
      const p = P(t, cOut, 0.55, linear);
      [dx, dy] = arc([HOP[0], HOP[1] - 10], DASHP, 110, p);
      ds = 0.4 * clamp(0.3 + p * 3);
    }
    if (t >= at('me') && t < cOut) dmood = 'annoyed';
    else if (t >= cOut && t < at('trap')) dmood = 'deadpan';
    op(dash, dshow); tr(dash, dx, dy, Math.max(0.01, ds), t >= cIn && t < cOut ? -20 : 0);
    dash.set({ t, talk: scTalk(S, t, 'dash'), mood: dmood, look: who === 'dash' ? 0.3 : lookTo(DASHP[0], t, 0), arms: t >= at('me') && t < cIn ? 0.6 : 0 });

    /* ---------- the balls ---------- */
    if (t >= at('seven') - 0.2 && t < at('sq')) { if (t < mid('seven', 0.4)) { op(b7in, 1); tr(b7in, HAND[0], HAND[1], 0.95); } else throwIn(b7in, t, mid('seven', 0.4), 0.8); }
    if (t < at('trap') + 0.2) {
      const fadeB = 1 - P(t, at('trap'), 0.2, linear);
      rollOut(b7, t, mid('rev', 0.72), 640); if (t >= mid('rev', 0.72)) op(b7, fadeB);
      rollOut(bm7, t, mid('me', 0.94), 716); if (t >= mid('me', 0.94)) op(bm7, fadeB);
    }
    if (t >= at('trap') - 0.1 && t < at('check')) { if (t < mid('trap', 0.06)) { op(b50, 1); tr(b50, HAND[0], HAND[1], 0.95); } else throwIn(b50, t, mid('trap', 0.06), 0.8); }
    if (t >= at('half') - 0.2) { op(bHalf, 1); tr(bHalf, HAND[0], HAND[1] - 8 * Math.sin(t * 3) * AMP, 1.05); }

    /* ---------- board beats ---------- */
    if (gi === 1) op(sq49, t >= mid('sq', 0.75) ? 1 : 0);
    if (gi === 2) op(c1000, P(t, mid('cube', 0.66), 0.3, linear));
    if (gi === 3) {
      op(r49, P(t, mid('rev', 0.3), 0.3, linear));
      op(m77, t >= at('pm') ? 1 : 0);
      op(pm1, P(t, mid('pm', 0.25), 0.3, linear)); op(pm2, P(t, mid('pm', 0.62), 0.3, linear));
    }
    if (gi === 4) {
      op(q6t, P(t, mid('x2', 0.62), 0.25, linear)); op(q6b, P(t, mid('x2', 0.55), 0.2, linear)); op(q6a, 1 - P(t, mid('x2', 0.55), 0.2, linear)); op(q6x, 1 - P(t, mid('x2', 0.55), 0.2, linear));
      op(q6m, P(t, mid('x2', 0.8), 0.3, linear));
      stOK.set(P(t, mid('x2', 0.66), 0.3, linear)); tr(stOK, 1090, 258, 0.4);
    }
    if (gi === 5) {
      NL.mark(0, P(t, mid('trap', 0.72), 0.35, linear));
      op(tr1, P(t, mid('trap', 0.45), 0.3, linear)); op(tr2, P(t, mid('trap', 0.7), 0.3, linear));
    }
    if (gi === 6) { op(tooBig, P(t, mid('check', 0.3), 0.3, linear)); op(ck2, P(t, mid('check', 0.6), 0.3, linear)); }
    if (zMe) {
      popAt(c77, t, mid('me', 0.2), 680, 112);
      popAt(cNobody, t, mid('me', 0.62), 600, 640);
    }
  };
});
