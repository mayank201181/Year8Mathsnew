/* Scene 7: The family photo (types of number).
   One set: the void deck at 4 p.m., the photo backdrop "RC FAMILY DAY 2026". A giant nested diagram fills the
   backdrop: Natural inside Integers inside Rational, inside the Real numbers rectangle, with an Irrational zone at
   the right. The family pose in a front row (busts at the bottom), Mr Tan holds the phone-camera bottom right.
   tan       4 p.m.; the ovals draw in
   natural   the Natural oval fills: 1, 2, 3, 4, … (Ah Boy)
   integers  Dash hops into the Integers ring next to −2 and 0: smug (his only time), a tiny heart
   rational  2/5, 0.75 = 3/4, 0.333… = 1/3; "a/b of integers, b ≠ 0"
   dolls     −6 = −6/1; natural ⊂ integers ⊂ rational, the ovals pulse like nesting dolls
   simplify  √16 = 4 natural, −√9 = −3 integer, 12/4 = 3 natural: each answer flies into its oval
   pi        Uncle Pi (lower third) squeezes into the rational oval, digits ticker running (showpiece)
   irr       ... and is moved OUTSIDE it, to the Irrational zone with √2 = 1.41421356…: never ends, never repeats
   real      the rectangle lights: Real numbers; Mr Tan raises the camera: cheese
   pi3       FLASH: freeze frame of the photo, everyone smiling, Uncle Pi mid-word, his ticker still going. */
scene('family', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const popAt = (c, t, t0, x, y, t1) => { c.set(t >= t0 && (t1 === undefined || t < t1) ? P(t, t0, 0.35, linear) : 0); if (x !== undefined) tr(c, x, y); };
  const GOLD = '#FFE45C', PINK = '#FF8FC8', BLUE = '#9FD8FF';
  const COL = { nat: '#56D69B', int: '#4CC9F0', rat: '#FFC247', irr: '#FF8A8A', real: '#E6E9F0' };
  const arc = (a, b, h, p) => [lerp(a[0], b[0], p), lerp(a[1], b[1], p) - h * 4 * p * (1 - p)];
  const tok = (parent, src, col, size) => { const g = G(parent); mkMath(g, 0, 0, src, { size: size || 34, fill: col || C.ink, anchor: 'middle' }); return g; };

  /* layers: everything that is "the photo" lives in Lworld (scaled down for the freeze frame) */
  const Lback = G(root), Lworld = G(root), Lhud = G(root);
  const Lset = G(Lworld), Ldia = G(Lworld), Lcast = G(Lworld), Lfg = G(Lworld);

  /* ================= the set ================= */
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#141A22' }, Lback);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#F4EEE2' }, Lset);
  E('rect', { x: 0, y: 0, width: 1200, height: 96, fill: '#E2D9C6' }, Lset);
  [300, 820].forEach(x => E('rect', { x, y: 60, width: 160, height: 10, rx: 5, fill: '#FFFFFF', stroke: '#C9D3DC', 'stroke-width': 2 }, Lset));
  E('rect', { x: 0, y: 580, width: 1200, height: 170, fill: '#D9CFBC' }, Lset);
  E('rect', { x: 120, y: 104, width: 960, height: 62, rx: 10, fill: '#E8424F', stroke: SC_INK, 'stroke-width': 4 }, Lset);
  const bnr = T(Lset, 600, 149, 'RC FAMILY DAY 2026', { size: 40, weight: 800, anchor: 'middle', fill: GOLD, ls: 3 });
  bnr.setAttribute('stroke', SC_INK); bnr.setAttribute('stroke-width', 5); bnr.setAttribute('paint-order', 'stroke');
  const bunt = ipBunting(Lset, 120, 1080, 168, 6, 20);

  /* ================= the diagram ================= */
  const RX0 = 30, RY0 = 184, RX1 = 1170, RY1 = 566;
  const realR = E('rect', { x: RX0, y: RY0, width: RX1 - RX0, height: RY1 - RY0, rx: 22, fill: '#10293A', stroke: COL.real, 'stroke-width': 4 }, Ldia);
  const realGlow = E('rect', { x: RX0 - 4, y: RY0 - 4, width: RX1 - RX0 + 8, height: RY1 - RY0 + 8, rx: 26, fill: 'none', stroke: GOLD, 'stroke-width': 8 }, Ldia);
  const realLab = T(Ldia, 48, 224, 'Real numbers', { size: 28, weight: 800, fill: GOLD });
  const OV = {
    rat: { cx: 420, cy: 380, rx: 385, ry: 178, name: 'Rational', ly: 238 },
    int: { cx: 350, cy: 393, rx: 265, ry: 136, name: 'Integers', ly: 294 },
    nat: { cx: 280, cy: 405, rx: 160, ry: 88, name: 'Natural', ly: 352 },
  };
  const ov = {};
  ['rat', 'int', 'nat'].forEach(k => {
    const o = OV[k], g = G(Ldia);
    const fill = E('ellipse', { cx: o.cx, cy: o.cy, rx: o.rx, ry: o.ry, fill: COL[k], opacity: 0.12 }, g);
    const line = mkDash(E('ellipse', { cx: o.cx, cy: o.cy, rx: o.rx, ry: o.ry, fill: 'none', stroke: COL[k], 'stroke-width': 5 }, g));
    const pulse = E('ellipse', { cx: o.cx, cy: o.cy, rx: o.rx, ry: o.ry, fill: COL[k], opacity: 0 }, g);
    const lab = T(g, o.cx, o.ly, o.name, { size: 30, weight: 800, anchor: 'middle', fill: COL[k] });
    ov[k] = { g, fill, line, pulse, lab };
  });
  // the irrational zone (right of the rational oval)
  const irrG = G(Ldia);
  const irrBand = E('rect', { x: 812, y: 196, width: 346, height: 358, rx: 16, fill: COL.irr, opacity: 0.12, stroke: COL.irr, 'stroke-width': 3, 'stroke-dasharray': '10 8' }, irrG);
  const irrLab = T(irrG, 993, 238, 'Irrational', { size: 30, weight: 800, anchor: 'middle', fill: COL.irr });

  // the members of each family
  const natNums = mkText(Ldia, 280, 410, '1, 2, 3, 4, …', { size: 36, anchor: 'middle', fill: C.ink });
  const iM2 = tok(Ldia, '-2', C.ink, 36), i0 = tok(Ldia, '0', C.ink, 36), iM6 = tok(Ldia, '-6', C.ink, 36);
  tr(iM2, 470, 342); tr(i0, 560, 406); tr(iM6, 548, 344);
  const r25 = tok(Ldia, '2/5', C.ink, 32), r34 = tok(Ldia, '0.75 = 3/4', C.ink, 28), r13 = tok(Ldia, '0.333… = 1/3', C.ink, 26);
  tr(r25, 640, 286); tr(r34, 712, 392); tr(r13, 650, 482);
  // right-zone notes (before Uncle Pi moves in)
  const nRat = mkText(Ldia, 993, 330, '{{a/b}}: integers,\n{{b != 0}}', { size: 30, anchor: 'middle', fill: COL.rat });
  const nM6 = mkChip(Ldia, '{{-6 = -6/1}}', { size: 32, col: COL.int });
  const chain = ['natural', '⊂ integers', '⊂ rational'].map((s, i) => T(Ldia, 993, 400 + i * 46, s, { size: 30, weight: 800, anchor: 'middle', fill: [COL.nat, COL.int, COL.rat][i] }));
  const simp = [['{{sqrt(16) = 4}}: natural', COL.nat], ['{{-sqrt(9) = -3}}: integer', COL.int], ['{{12/4 = 3}}: natural', COL.nat]].map(([s, c], i) => mkText(Ldia, 993, 300 + i * 82, s, { size: 28, anchor: 'middle', fill: c }));
  const sTok = [['4', [1040, 290], [215, 462]], ['-3', [1040, 372], [176, 334]], ['3', [1040, 454], [345, 462]]].map(([s, a, b]) => ({ g: tok(Ldia, s, GOLD, 36), a, b }));
  // irrational members
  const sq2 = mkMath(irrG, 993, 520, 'sqrt(2) = 1.41421356…', { size: 28, fill: C.ink, anchor: 'middle' });
  const irrChips = ['never **ends**', 'never **repeats**', 'not a **fraction**'].map(s => mkChip(irrG, s, { size: 26, col: COL.irr }));

  /* ================= the cast ================= */
  const YF = 688;
  const dad = cast(Lcast, 'dad', { s: 0.68 });
  const mum = cast(Lcast, 'mum', { s: 0.68 });
  const kav = cast(Lcast, 'kavya', { s: 0.68 });
  const boy = cast(Lcast, 'boy', { s: 0.7 });
  const tan = cast(Lcast, 'tan', { s: 0.8, prop: 'phone' });
  const dash = cast(Ldia, 'dash', { s: 0.3 });
  const pi = cast(Ldia, 'pi', { s: 0.5 });
  op(pi.ticker, 0);
  const heart = G(Ldia);
  E('path', { d: 'M0,10 C-14,0 -14,-12 -6,-12 C-2,-12 0,-8 0,-6 C0,-8 2,-12 6,-12 C14,-12 14,0 0,10 Z', fill: '#FF5F9A', stroke: SC_INK, 'stroke-width': 2 }, heart);
  // Uncle Pi's own digits ticker (bigger than the kit one, so the digits stay readable)
  const DIG = '3.14159265358979323846264338327950288419716939937510582097494459230781640628620899';
  const TKW = 210, tkG = G(Ldia);
  E('rect', { x: -TKW / 2, y: -25, width: TKW, height: 50, rx: 25, fill: 'rgba(10,27,39,0.92)', stroke: '#FFC98E', 'stroke-width': 3 }, tkG);
  const tkWin = G(tkG, { 'clip-path': _clipUrl(`M${-TKW / 2 + 14},-24 L${TKW / 2 - 14},-24 L${TKW / 2 - 14},24 L${-TKW / 2 + 14},24 Z`) });
  const tape = T(tkWin, -TKW / 2 + 16, 11, DIG, { size: 30, weight: 700, fill: GOLD, ls: 2 });
  const w10 = textWidth('3.1415926535', 30, FD, 700) + 12 * 2;   // ten digits after the point, with letter-spacing
  const c4 = mkChip(Lfg, '**4 p.m.**', { size: 30, col: GOLD });
  const cheese = mkSpeechBubble(Lfg, 'Say **cheese**!', { size: 30, tail: 'right' });
  const flash = ipFlash(Lhud);
  const photoBorder = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: 'none', stroke: '#FFFFFF', 'stroke-width': 26 }, Lworld);
  const lt = { pi: ipLowerThird(Lhud, 'pi') };
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  const XS = { dad: 130, mum: 290, kavya: 450, boy: 610, tan: 1065, dash: 500, pi: 880 };
  const lookTo = (x, t, d) => { const w = scWho(S, t); if (!w || XS[w] === undefined || Math.abs(XS[w] - x) < 5) return d; return clamp((XS[w] - x) / 300, -1, 1); };
  const DASH0 = [712, 548], DASH1 = [500, 476], PI0 = [1290, 352], PIIN = [770, 352], PIOUT = [912, 352];
  const tF = at('pi3') + 0.12;          // the shutter
  const rate = w10 / (mid('pi3', 0.4) - end('pi'));

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const frozen = t >= tF;
    const tc = frozen ? tF : t;           // the cast's clock stops in the photo
    bunt.upd(tc);
    lt.pi.set(win(t, at('pi') + 0.15, at('pi') + 3.3, 0.3));
    flash.set(t >= at('pi3') ? 1 - P(t, tF, 0.5, easeOut) : 0);
    if (t >= at('pi3') && t < tF) flash.set(P(t, at('pi3'), 0.12, linear));
    // the freeze frame: the photo shrinks into a white border
    const fz = frozen ? P(t, tF + 0.15, 0.5, easeOut) : 0;
    tr(Lworld, 600 - 600 * (1 - 0.06 * fz), 375 - 375 * (1 - 0.06 * fz), 1 - 0.06 * fz, -1.2 * fz);
    op(photoBorder, fz); op(Lback, fz > 0 ? 1 : 0);

    /* ---------- the diagram ---------- */
    const draw = k => P(t, mid('tan', { rat: 0.35, int: 0.5, nat: 0.65 }[k]), 0.6, ease);
    ['rat', 'int', 'nat'].forEach(k => {
      const d = draw(k);
      mkDraw(ov[k].line, d); op(ov[k].fill, 0.12 * d); op(ov[k].lab, P(t, mid('tan', { rat: 0.55, int: 0.7, nat: 0.85 }[k]), 0.3, linear));
      const dt = mid('dolls', { nat: 0.5, int: 0.64, rat: 0.78 }[k]);
      op(ov[k].pulse, t >= dt && t < dt + 0.9 ? 0.4 * Math.sin(Math.PI * (t - dt) / 0.9) : 0);
    });
    // natural, integers, rational members
    op(natNums, P(t, mid('natural', 0.32), 0.4, linear));
    op(iM2, P(t, mid('integers', 0.32), 0.3, linear)); op(i0, P(t, mid('integers', 0.5), 0.3, linear));
    op(iM6, P(t, mid('dolls', 0.12), 0.3, linear));
    op(r25, P(t, mid('rational', 0.42), 0.3, linear)); op(r34, P(t, mid('rational', 0.6), 0.3, linear)); op(r13, P(t, mid('rational', 0.82), 0.3, linear));
    // right-zone notes
    const freeR = 1 - P(t, at('pi') - 0.1, 0.25, linear);
    op(nRat, t < at('dolls') ? P(t, mid('rational', 0.2), 0.3, linear) : 0);
    popAt(nM6, t, mid('dolls', 0.12), 993, 304, at('simplify'));
    chain.forEach((c, i) => op(c, t < at('simplify') ? P(t, mid('dolls', 0.5 + i * 0.14), 0.25, linear) : 0));
    simp.forEach((s, i) => op(s, t >= at('simplify') ? P(t, mid('simplify', 0.16 + i * 0.3), 0.3, linear) * freeR : 0));
    sTok.forEach((s, i) => {
      const t0 = mid('simplify', 0.26 + i * 0.3);
      if (t < t0) { op(s.g, 0); return; }
      op(s.g, 1);
      const p = P(t, t0, 0.55, ease); const [x, y] = arc(s.a, s.b, 90, p);
      tr(s.g, x, y, 1.15 - 0.15 * p);
    });
    // the irrational zone
    op(irrBand, P(t, mid('irr', 0.08), 0.3, linear)); op(irrLab, P(t, mid('irr', 0.08), 0.3, linear));
    irrChips.forEach((c, i) => popAt(c, t, mid('irr', 0.3 + i * 0.13), 1076, 290 + i * 54));
    op(sq2, P(t, mid('irr', 0.8), 0.3, linear));
    // real numbers
    op(realLab, P(t, mid('real', 0.25), 0.3, linear));
    op(realGlow, t >= mid('real', 0.25) && !frozen ? 0.5 + 0.5 * Math.sin(t * 6) : (t >= mid('real', 0.25) ? 0.6 : 0));

    /* ---------- the people ---------- */
    const photo = t >= mid('real', 0.4);
    const smile = (m) => (photo ? 'happy' : m);
    tr(dad, XS.dad, YF, 0.68); tr(mum, XS.mum, YF, 0.68); tr(kav, XS.kavya, YF, 0.68); tr(boy, XS.boy, YF + 4, 0.7);
    tr(tan, XS.tan, 676, 0.8);
    const lk = (x, d) => (photo ? 0 : lookTo(x, t, d));
    dad.set({ t: tc, talk: frozen ? 0 : scTalk(S, t, 'dad'), mood: smile(t >= at('pi') && t < at('real') ? 'shock' : 'smug'), look: lk(XS.dad, 0.4) });
    mum.set({ t: tc, talk: frozen ? 0 : scTalk(S, t, 'mum'), mood: smile(t >= at('pi') && t < at('real') ? 'deadpan' : 'neutral'), look: lk(XS.mum, 0.3) });
    kav.set({ t: tc, talk: frozen ? 0 : scTalk(S, t, 'kavya'), mood: smile(t >= at('rational') && t < at('pi') ? 'happy' : 'neutral'), look: lk(XS.kavya, 0.3) });
    boy.set({ t: tc, talk: frozen ? 0 : scTalk(S, t, 'boy'), mood: 'happy', look: lk(XS.boy, 0.3), lift: t >= at('natural') && t < at('integers') ? 1 : 0 });
    tan.set({ t: tc, talk: frozen ? 0 : scTalk(S, t, 'tan'), mood: 'happy', look: t >= at('real') ? -0.3 : lookTo(XS.tan, t, -0.6), lift: t >= mid('real', 0.3) ? 1 : 0 });
    popAt(c4, t, at('tan') + 0.1, 1065, 500, at('natural'));
    if (!frozen) popAt(cheese, t, mid('real', 0.45), 860, 610); else cheese.set(1);

    /* ---------- Dash ---------- */
    let dp = [DASH0[0], DASH0[1]], dm = 'sad';
    if (t >= mid('integers', 0.05)) { const p = P(t, mid('integers', 0.05), 0.6, linear); dp = arc(DASH0, DASH1, 90, p); }
    if (t >= mid('integers', 0.62)) dm = 'smug';
    if (t >= at('rational')) dm = 'sad';
    if (photo) dm = 'deadpan';
    tr(dash, dp[0], dp[1], 0.3);
    dash.set({ t: tc, talk: frozen ? 0 : scTalk(S, t, 'dash'), mood: dm, look: photo ? 0 : lookTo(DASH1[0], t, 0) });
    const hp = t >= mid('integers', 0.65) && t < at('rational') + 0.4 ? P(t, mid('integers', 0.65), 0.4, pop) * (1 - P(t, at('rational'), 0.4, linear)) : 0;
    op(heart, clamp(hp * 2)); tr(heart, DASH1[0] + 30, DASH1[1] - 44 - 10 * hp, Math.max(0.01, hp * 1.4));

    /* ---------- Uncle Pi ---------- */
    let px = PI0[0], pmood = 'happy';
    if (t >= at('pi')) {
      const pin = P(t, at('pi') + 0.1, 0.9, easeOut), squeeze = P(t, mid('pi', 0.55), 0.6, ease);
      px = lerp(PI0[0], PIOUT[0], pin) + (PIIN[0] - PIOUT[0]) * squeeze * (1 - P(t, at('irr'), 0.5, ease));
      if (t >= at('irr')) px = lerp(PIIN[0], PIOUT[0], P(t, at('irr'), 0.5, ease));
    }
    const piOn = t >= at('pi') ? 1 : 0;
    op(pi, piOn); op(tkG, piOn);
    tr(pi, px + (t >= mid('pi', 0.55) && t < at('irr') ? Math.sin(t * 22) * 3 * AMP : 0), PI0[1], 0.5, t >= mid('pi', 0.55) && t < at('irr') ? -6 : 0);
    tr(tkG, px, PI0[1] + 92);
    // r34 gets shoved when he squeezes in
    if (t >= mid('pi', 0.55) && t < at('irr') + 0.5) tr(r34, 712 - 26 * P(t, mid('pi', 0.6), 0.3, ease) * (1 - P(t, at('irr'), 0.5, ease)), 392 + 18 * P(t, mid('pi', 0.6), 0.3, ease) * (1 - P(t, at('irr'), 0.5, ease)));
    else tr(r34, 712, 392);
    // he never stops talking: always mid-word, even in the photo
    pi.set({ t: tc, talk: piOn ? (scWho(S, t) === 'pi' ? scTalk(S, t, 'pi') : 0.35 + 0.35 * Math.abs(Math.sin(tc * 9))) : 0, mood: frozen ? 'happy' : pmood, look: -0.4 });
    if (frozen) pi.set({ t: tc, talk: 0.8, mood: 'happy', look: -0.4 });
    tr(tape, -Math.max(0, t - end('pi')) * rate, 0);
  };
});
