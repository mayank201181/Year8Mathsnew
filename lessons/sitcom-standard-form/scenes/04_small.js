/* Scene 4: Spotty, pollen and Nought's big day (standard form for small numbers).
   Shots (hard sitcom cuts):
   L  the lift (STUCK: 40 min): Ah Boy lifts Spotty's jar, microscope inset: 0.005 m -> the Index: 0.005 = 5 × 10⁻³,
      big → plus, tiny → minus -> Priya: 0.000 52 on the place-value grid, the 5 glows, A = 5.2 -> Dot hops RIGHT
      four places (numbered 1-4): 0.000 52 = 5.2 × 10⁻⁴, DING! -> Kavya counts the four zeros in front (one before
      the point) -> Nought pops up, the zero tiles cheer -> Mum: ACHOO! (pollen specks, the lift shakes) -> Mr Tan
      writes 3.08 × 10⁻⁵ m, microscope: pollen.
   W  the steel wall close-up, Kavya bottom left: 3.08 slides 5 places right on a big grid: 0.000 030 8 m, the zeros
      in Nought's cream -> Nought jumps into his place-holder zero (it glows); a second row without him, 0.000 308,
      in red: × 10 too big!
   L  Mum thanks Nought (on the rail beside her) -> Priya: red blood cell 8 × 10⁻⁶ m (microscope) -> Dad (smug):
      0.45 × 10⁻³ in orange.
   C  Club Standard Form: 0.45 × 10⁻³ at the rope, NOT ON THE LIST -> 0.45 = 4.5 × 10⁻¹, so 4.5 × 10⁻⁴, the rule
      A too small? × 10, power − 1; check 0.45 ÷ 1000 = 0.000 45; YOU'RE IN.
   L  Kavya: the sign of the power (big / small) vs the sign of A (positive / negative): 3 × 10⁻² = 0.03 and
      −3 × 10⁻² = −0.03 -> Ah Boy holds up Spotty: 5 × 10⁻³, small, but positive. Hold. */
scene('small', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 2, color: o.color || C.ink, weight: 700 }); };
  const popSet = (el, t, t0, t1, x, y) => { const p = t >= t0 && t < t1 ? P(t, t0, 0.35, linear) * (1 - P(t, t1 - 0.2, 0.2, linear)) : 0; el.set(p); if (x !== undefined) tr(el, x, y); };
  const fadeWin = (el, t, t0, t1) => op(el, t >= t0 && t < t1 ? Math.min(P(t, t0, 0.2, linear), 1 - P(t, t1 - 0.15, 0.15, linear)) : 0);
  const write = (el, t, t0, t1) => {   // marker writing: fade in, slide from the left
    const p = t >= t0 && t < t1 ? P(t, t0, 0.35, easeOut) : 0;
    op(el, t >= t0 && t < t1 ? Math.min(clamp(p * 2), 1 - P(t, t1 - 0.15, 0.15, linear)) : 0);
    tr(el, -18 * (1 - p), 0);
  };
  const scaleAbout = (el, cx, cy, k) => el.setAttribute('transform', `translate(${cx.toFixed(1)} ${cy.toFixed(1)}) scale(${k.toFixed(3)}) translate(${(-cx).toFixed(1)} ${(-cy).toFixed(1)})`);
  const stampAt = (st, t, t0, t1, x, y, s) => { st.set(t >= t0 && t < t1 ? P(t, t0, 0.35, linear) : 0); tr(st, x, y, s); };
  const outline = (el, col, w) => { el.setAttribute('stroke', col); el.setAttribute('stroke-width', w); el.setAttribute('paint-order', 'stroke'); el.setAttribute('stroke-linejoin', 'round'); return el; };
  const INK = SF.marker, RED = SF.red, GREEN = SF.green, ORANGE = '#E8641E', PURPLE = '#8A3A8E', GREY = '#5A6670';
  const LIGHT = 'rgba(255,253,246,0.96)';
  const bchip = (parent, text, col, size) => mkChip(parent, text, { size: size || 30, col: col || INK, fill: LIGHT });

  /* layers (inside a camera group, so Mum's sneeze can shake the shot) */
  const cam = G(root);
  const Lbg = G(cam), Lboard = G(cam), Lcast = G(cam), Lfront = G(cam), Lrail = G(cam), Lfg = G(cam), Lhud = G(root);

  /* ================= L: the lift ================= */
  const liftShot = G(Lbg);
  const lift = sfLift(liftShot);
  const frontWrap = G(Lfront);
  frontWrap.appendChild(lift.front); frontWrap.appendChild(lift.top);
  const cStuck = pill(Lfg, 'STUCK: 40 min', { size: 26, color: '#FF8A8A', stroke: '#FF8A8A' });

  // microscope inset (right of the board)
  const SCX = 860, SCY = 236;
  const scopeG = G(Lboard);
  const scope = sfScope(scopeG, 104);
  tr(scope, SCX, SCY);

  // spotty: 0.005 m
  const bSpot = G(Lboard);
  const spot1 = mkText(bSpot, 420, 190, 'Spotty the **ladybird**', { size: 40, fill: INK, anchor: 'middle' });
  const spot2 = mkMath(bSpot, 420, 290, '"length" = 0.005 "m"', { size: 58, fill: INK, anchor: 'middle' });

  // neg: 0.005 = 5 × 10⁻³; big → plus, tiny → minus
  const bNeg = G(Lboard);
  const neg1 = mkMath(bNeg, 400, 210, '0.005 = 5 * 10^(-3)', { size: 64, fill: INK, anchor: 'middle' });
  const neg2 = mkMath(bNeg, 400, 290, '"check:" 5 * 0.001 = 0.005', { size: 34, fill: '#3A4650', anchor: 'middle' });
  const bigC = G(bNeg), tinyC = G(bNeg);
  { const c = bchip(bigC, '**big** → **plus** power', GREEN, 30); c.set(1); tr(c, 835, 170); const a = arrow(bigC, 690, 196, 690, 140, { color: GREEN, width: 6 }); a.set(1); }
  { const c = bchip(tinyC, '**tiny** → **minus** power', RED, 30); c.set(1); tr(c, 835, 270); const a = arrow(tinyC, 690, 244, 690, 300, { color: RED, width: 6 }); a.set(1); }

  // ONE place-value grid (10⁰ … 10⁻⁷, two rows) serves both shots: on the lift's wall (scaled 0.72) for
  // watch / hopr / short / counted, and full size in the wall close-up for right5 / me
  const bGrid = G(Lboard);                 // the lift's right-hand panel (chips, working)
  const pvG = G(Lboard);                   // the grid and its overlays, in grid coordinates
  const WC = 92, LK = 0.72, LGX = 150, LGY = 112, WGX = 232, WGY = 104;
  const grid2 = sfPVGrid(pvG, { from: 0, to: -7, cell: WC, rows: 2, head: 'power', size: 36 });
  const r52 = grid2.num('0.00052', 0);
  const rSmall = grid2.num('0.0000308', 0), rBig = grid2.num('0.000308', 1, { col: '#FFD6D6' });
  const gR0 = grid2.rowY(0), gR1 = grid2.rowY(1);
  const glowT = E('rect', { x: grid2.x(-4) - 46, y: gR0 - 50, width: 92, height: 100, rx: 14, fill: 'rgba(255,228,92,0.3)', stroke: '#FFB020', 'stroke-width': 8 }, pvG);
  const gGap = k => grid2.pointX + k * WC;         // k = 0: the decimal point; k = 4: after the 5 (grid coords)
  const hopArcs = [];
  for (let k = 1; k <= 4; k++) {
    const hg = G(pvG);
    const ar = arrow(hg, gGap(k - 1) + 6, gR1 + 34, gGap(k) - 6, gR1 + 34, { color: PURPLE, width: 6, bend: -28 });
    const n = T(hg, (gGap(k - 1) + gGap(k)) / 2, gR1 + 6, String(k), { size: 38, weight: 800, anchor: 'middle', fill: PURPLE });
    hopArcs.push({ hg, ar, n });
  }
  const zeroCount = [0, -1, -2, -3].map((pw, i) => {
    const g = G(pvG);
    E('ellipse', { cx: grid2.x(pw), cy: gR0, rx: 42, ry: 48, fill: 'none', stroke: ORANGE, 'stroke-width': 7 }, g);
    E('circle', { cx: grid2.x(pw), cy: gR1, r: 26, fill: ORANGE, stroke: '#FFFFFF', 'stroke-width': 3 }, g);
    T(g, grid2.x(pw), gR1 + 13, String(i + 1), { size: 38, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
    return g;
  });
  const dotXY = k => [LGX + LK * gGap(k), LGY + LK * (gR1 + 14)];
  const cFirst = bchip(bGrid, 'first **non-zero** digit: **5**', '#B8700A', 30);
  const wA = mkMath(bGrid, 845, 262, 'A = 5.2', { size: 56, fill: PURPLE, anchor: 'middle' });
  const wEq1 = mkMath(bGrid, 845, 190, '"0.000 52"', { size: 50, fill: INK, anchor: 'middle' });
  const wEq2 = mkMath(bGrid, 845, 262, '= 5.2 * 10^(-4)', { size: 50, fill: INK, anchor: 'middle' });
  const cFront = bchip(bGrid, '**4** zeros in front\n→ {{n = -4}}', ORANGE, 30);
  const stDing = sfStamp(Lfg, 'ding');

  // achoo: the sneeze, pollen specks
  const sneeze = G(Lfg);
  const puffs = [[0, 0, 26], [34, -16, 22], [30, 22, 20], [66, 2, 24], [58, -30, 16]].map(([x, y, r]) => E('circle', { cx: x, cy: y, r, fill: '#FFFFFF', stroke: '#C9D3DC', 'stroke-width': 3 }, sneeze));
  const achooT = outline(T(Lfg, 0, 0, 'ACHOO!', { size: 84, weight: 800, anchor: 'middle', fill: '#FF8A3D' }), '#3A1A00', 10);
  const cPollen = bchip(Lfg, '**pollen**', '#B8700A', 30);
  const specks = [];
  { const r = rng(44); for (let i = 0; i < 9; i++) specks.push({ el: E('circle', { r: 5 + r() * 4, fill: '#F2B33C', stroke: '#9C6B1E', 'stroke-width': 2 }, Lfg), a: r(), b: r(), c: r() }); }

  // pollen: 3.08 × 10⁻⁵ m
  const bPol = G(Lboard);
  const pol1 = mkText(bPol, 420, 170, 'a **pollen grain**:', { size: 40, fill: INK, anchor: 'middle' });
  const pol2 = mkMath(bPol, 420, 256, '3.08 * 10^(-5) "m"', { size: 64, fill: INK, anchor: 'middle' });
  const pol3 = mkText(bPol, 420, 330, 'as an **ordinary number**?', { size: 34, fill: ORANGE, anchor: 'middle' });

  // thanks
  const heart = T(Lfg, 0, 0, '♥', { size: 48, weight: 800, anchor: 'middle', fill: '#E8424F' });

  // cell: 8 × 10⁻⁶ m
  const bCell = G(Lboard);
  const cel1 = mkText(bCell, 420, 170, 'a **red blood cell**:', { size: 40, fill: INK, anchor: 'middle' });
  const cel2 = mkMath(bCell, 420, 256, '8 * 10^(-6) "m"', { size: 64, fill: INK, anchor: 'middle' });
  const cel3 = mkMath(bCell, 420, 330, '= "0.000 008 m"', { size: 40, fill: GREY, anchor: 'middle' });

  // mine: Dad's 0.45 × 10⁻³
  const bMine = G(Lboard);
  const mine1 = bchip(bMine, "Dad's answer", ORANGE, 30);
  const mine2 = mkMath(bMine, 570, 280, '0.45 * 10^(-3)', { size: 76, fill: ORANGE, anchor: 'middle' });

  // sign: the sign of the power vs the sign of A
  const bSign = G(Lboard);
  E('rect', { x: 150, y: 104, width: 840, height: 290, rx: 18, fill: 'rgba(255,253,246,0.94)', stroke: '#8FA3B8', 'stroke-width': 3 }, bSign);
  E('path', { d: 'M570,226 L570,384', stroke: '#C9D3DC', 'stroke-width': 3 }, bSign);
  const sg1 = mkText(bSign, 570, 150, 'sign of the **power** → **big** or **small**', { size: 34, fill: INK, anchor: 'middle', boldFill: '#1E7A4A' });
  const sg2 = mkText(bSign, 570, 200, 'sign of **A** → **positive** or **negative**', { size: 34, fill: INK, anchor: 'middle', boldFill: '#B8336A' });
  const sgL = G(bSign), sgR = G(bSign);
  mkMath(sgL, 360, 292, '3 * 10^(-2) = 0.03', { size: 46, fill: MK.ink, anchor: 'middle' });
  { const c = mkChip(sgL, 'small, **positive**', { size: 28, col: '#1E7A4A', fill: '#E6F6EC' }); c.set(1); tr(c, 360, 350); }
  mkMath(sgR, 780, 292, '-3 * 10^(-2) = -0.03', { size: 46, fill: MK.ink, anchor: 'middle' });
  { const c = mkChip(sgR, 'small, **negative**', { size: 28, col: '#B8336A', fill: '#FBE6EE' }); c.set(1); tr(c, 780, 350); }

  // like: Spotty, small but positive
  const bLike = G(Lboard);
  const like1 = mkMath(bLike, 450, 220, '"Spotty:" 5 * 10^(-3) "m"', { size: 58, fill: INK, anchor: 'middle' });
  const like2 = bchip(bLike, 'small, but **positive**', GREEN, 34);

  /* ================= W: the steel wall close-up ================= */
  const wallShot = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#D3DAE0', '#A7B2BC', true) }, wallShot);
  let brs = '';
  for (let i = 0; i < 22; i++) brs += `M${20 + i * 56},0 L${20 + i * 56},750 `;
  E('path', { d: brs, stroke: '#FFFFFF', 'stroke-width': 3, opacity: 0.18 }, wallShot);
  const w2X = pw => WGX + grid2.x(pw), w2Y = i => WGY + grid2.rowY(i);
  const cRight5 = bchip(Lfg, 'digits **5 places right**', PURPLE, 30);
  const eq5 = mkMath(Lfg, 650, 470, '3.08 * 10^(-5) = "0.000 030 8 m"', { size: 50, fill: INK, anchor: 'middle', halo: '#C9D1D8' });
  const eqBig = mkMath(Lfg, 650, 470, '"0.000 308" = 10 * "0.000 030 8"', { size: 46, fill: RED, anchor: 'middle', halo: '#C9D1D8' });
  const cTooBig = mkChip(Lfg, 'no place-holder → **× 10 too big!**', { size: 32, col: RED, fill: '#FFF0F0' });
  const xBig = cross(Lfg, 22, RED); tr(xBig, 1010, w2Y(1));
  const tickS = tick(Lfg, 22, GREEN); tr(tickS, 1010, w2Y(0));

  /* ================= C: Club Standard Form ================= */
  const clubShot = G(Lbg);
  const club = sfClub(clubShot);
  const clubFg = G(Lfg);
  const GUEST = [235, 560];
  const guest = (src) => {   // a number queuing at the rope: a chip with little legs
    const g = G(clubFg);
    E('path', { d: 'M-24,30 L-28,70 M24,30 L28,70', stroke: '#FFE45C', 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
    E('ellipse', { cx: -32, cy: 72, rx: 14, ry: 7, fill: '#B3122E' }, g); E('ellipse', { cx: 32, cy: 72, rx: 14, ry: 7, fill: '#B3122E' }, g);
    const c = mkChip(g, `{{${src}}}`, { size: 44, col: '#FFE45C', fill: 'rgba(12,10,16,0.92)' }); c.set(1);
    return g;
  };
  const g45 = guest('0.45 * 10^(-3)'), g45f = guest('4.5 * 10^(-4)');
  const w45c = mkMeasure('0.45 * 10^(-3)', { size: 44 * 1.06 }).w, w45 = mkMeasure('0.45', { size: 44 * 1.06 }).w;
  const ring45 = E('ellipse', { cx: -w45c / 2 + w45 / 2, cy: -2, rx: w45 / 2 + 14, ry: 34, fill: 'none', stroke: '#FF5A5A', 'stroke-width': 5 }, g45);
  const notBig = mkText(clubFg, 250, 452, '{{A = 0.45}}: not {{>= 1}}', { size: 34, fill: '#FF8A8A', anchor: 'middle' });
  const stList = sfStamp(Lfg, 'list'), stIn = sfStamp(Lfg, 'in');
  const card = G(clubFg);
  E('rect', { x: 30, y: 112, width: 680, height: 368, rx: 16, fill: '#FFFDF6', stroke: '#C9A44A', 'stroke-width': 4 }, card);
  const cOne = mkChip(card, '**one digit, then the point**', { size: 30, col: '#8A3A8E', fill: '#F6E9F7' }); cOne.set(1); tr(cOne, 370, 152);
  const fixW = mkWorking(card, 330, 192, ['0.45 = 4.5 * 10^(-1)', '0.45 * 10^(-3) = 4.5 * 10^(-1) * 10^(-3)', '= 4.5 * 10^(-4)'], { size: 34, fill: MK.ink, gap: 20 });
  const ruleT = mkText(card, 370, 412, '**A** too small? {{× 10}}, and the power {{− 1}}', { size: 30, fill: MK.ink, anchor: 'middle' });
  const checkT = mkMath(card, 370, 462, '"check:" 0.45 ÷ 1000 = "0.000 45"', { size: 30, fill: '#1E7A4A', anchor: 'middle' });

  /* ================= the cast ================= */
  const LS = 0.84, LY = 520;
  const XS = { kavya: 185, mum: 335, dad: 485, boy: 630, priya: 775, tan: 920 };
  const IXp = 64, IYp = 525, IS = 0.85;          // the Index on the handrail, left
  const JX = 540, JY = 596;                      // Spotty's jar on the handrail, by Ah Boy
  const kav = cast(Lcast, 'kavya', { s: LS });
  const mum = cast(Lcast, 'mum', { s: LS });
  sfRice(mum.hand, 0.62);
  const dad = cast(Lcast, 'dad', { s: LS });
  const boy = cast(Lcast, 'boy', { s: LS });
  const priya = cast(Lcast, 'priya', { s: LS });
  const tan = cast(Lcast, 'tan', { s: LS });
  const H = { kavya: kav, mum, dad, boy, priya, tan };
  const norm = cast(clubShot, 'norm', { s: 1 });
  const idx = cast(Lrail, 'index', { s: IS, val: '−3' });
  const nought = cast(Lrail, 'nought', { s: 0.5 });
  const dot = cast(Lboard, 'dot', { s: 0.4 });
  const jar = sfJar(Lrail, 0.8);
  const X = Object.assign({ index: IXp, nought: 830, dot: 300, norm: 900 }, XS);
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);
  const mumHead = [XS.mum + mum.head[0] * LS, LY + mum.head[1] * LS];

  /* cut points */
  const cW = at('right5') - 0.06, cL2 = at('thanks') - 0.06, cC = at('small') - 0.06, cL3 = at('sign') - 0.06;
  const tHop0 = mid('hopr', 0.1), tHop1 = mid('hopr', 0.5);     // Dot's four hops
  const tSneeze = at('achoo') + 0.25;

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const sL = on(t, -1, cW) || on(t, cL2, cC) || on(t, cL3, 1e9), sW = on(t, cW, cL2), sC = on(t, cC, cL3);
    const spk = scWho(S, t);
    const lookAt = k => (spk && X[spk] !== undefined && spk !== k ? clamp((X[spk] - X[k]) / 300, -1, 1) : 0);
    const lookX = (x, k) => clamp((x - X[k]) / 300, -1, 1);
    const show = { kavya: 0, mum: 0, dad: 0, boy: 0, priya: 0, tan: 0 };

    // the sneeze shakes the camera
    const sj = t > tSneeze ? Math.exp(-(t - tSneeze) * 6) : 0;
    tr(cam, Math.sin(t * 61) * 9 * sj * AMP, Math.sin(t * 47) * 6 * sj * AMP);

    /* ---------- L: the lift ---------- */
    op(liftShot, sL); op(frontWrap, sL); op(cStuck, sL);
    [scopeG, bSpot, bNeg, bGrid, pvG, bPol, bCell, bMine, bSign, bLike].forEach(b => op(b, 0));
    stDing.set(0); op(dot, 0); op(nought, 0); op(jar, 0); op(idx, 0);
    op(sneeze, 0); op(achooT, 0); cPollen.set(0); specks.forEach(s => op(s.el, 0)); op(heart, 0);
    if (sL) {
      lift.dim(1); lift.upd(t); lift.lights(12);
      lift.disp.set('10');
      tr(cStuck, 1075, 42);

      /* microscope inset: ladybird (spotty), pollen, cell */
      const scopeOn = (a, b) => t >= a && t < b;
      let scK = null, scT0 = 0;
      if (scopeOn(at('spotty'), end('spotty') + 0.2)) { scK = 'ladybird'; scT0 = mid('spotty', 0.2); }
      else if (scopeOn(at('pollen') - 0.06, cW)) { scK = 'pollen'; scT0 = mid('pollen', 0.45); }
      else if (scopeOn(at('cell') - 0.06, at('mine') - 0.06)) { scK = 'cell'; scT0 = mid('cell', 0.3); }
      if (scK) {
        const p = P(t, scT0, 0.4, pop);
        op(scopeG, clamp(p * 3)); tr(scopeG, 0, 0); scaleAbout(scopeG, SCX, SCY, Math.max(0.01, 0.6 + 0.4 * p));
        scope.show(scK, 1);
      }

      /* spotty */
      if (t < at('neg') - 0.06) {
        op(bSpot, 1);
        write(spot1, t, mid('spotty', 0.1), 1e9);
        write(spot2, t, mid('spotty', 0.55), 1e9);
      }
      /* neg */
      if (t >= at('neg') - 0.06 && t < at('watch') - 0.06) {
        op(bNeg, 1);
        write(neg1, t, mid('neg', 0.05), 1e9);
        write(neg2, t, mid('neg', 0.4), 1e9);
        const pb = P(t, mid('neg', 0.62), 0.35, pop), pt = P(t, mid('neg', 0.8), 0.35, pop);
        op(bigC, clamp(pb * 3)); scaleAbout(bigC, 835, 170, Math.max(0.01, 0.6 + 0.4 * pb));
        op(tinyC, clamp(pt * 3)); scaleAbout(tinyC, 835, 270, Math.max(0.01, 0.6 + 0.4 * pt));
      }
      /* watch, hopr, short, counted: the grid */
      if (t >= at('watch') - 0.06 && t < at('achoo') - 0.06) {
        op(bGrid, 1); op(pvG, P(t, at('watch') - 0.06, 0.25, linear));
        pvG.setAttribute('transform', `translate(${LGX} ${LGY}) scale(${LK})`);
        [rSmall, rBig].forEach(r => r.set(0));
        r52.set(P(t, mid('watch', 0.3), 0.3, linear));
        const g5 = t < at('hopr') ? P(t, mid('watch', 0.55), 0.25, linear) : 1 - P(t, at('hopr'), 0.25, linear);
        op(glowT, g5 * (0.75 + 0.25 * wave(t, 0.6)));
        popSet(cFirst, t, mid('watch', 0.55), at('hopr') - 0.06, 860, 150);
        op(wA, t < at('hopr') - 0.06 ? P(t, mid('watch', 0.8), 0.3, linear) : 0);
        // Dot hops right four places, from the point to just after the 5
        const dotOn = t >= at('hopr') - 0.3 && t < at('short') - 0.06;
        if (dotOn) {
          op(dot, P(t, at('hopr') - 0.3, 0.25, linear));
          const hp = clamp((t - tHop0) / (tHop1 - tHop0)) * 4, hi = Math.min(3, Math.floor(hp)), hf = hp - hi;
          const inAir = t > tHop0 && t < tHop1;
          const dx = t <= tHop0 ? dotXY(0)[0] : t >= tHop1 ? dotXY(4)[0] : lerp(dotXY(hi)[0], dotXY(hi + 1)[0], ease(hf));
          const dy = dotXY(0)[1] - (inAir ? 70 * Math.sin(Math.PI * hf) : 0);
          tr(dot, dx, dy, 0.4);
          X.dot = dx;
          dot.set({ t, talk: scTalk(S, t, 'dot'), mood: inAir ? 'annoyed' : 'neutral', look: inAir ? 0.8 : 0, hop: inAir ? 1 : 0 });
        }
        hopArcs.forEach((h, i) => {
          const done = clamp((t - tHop0) / (tHop1 - tHop0) * 4 - i);
          op(h.hg, t >= at('hopr') - 0.06 && t < at('short') - 0.06 && done > 0 ? 1 : 0);
          h.ar.set(done); op(h.n, done > 0.6 && t < at('short') - 0.06 ? 1 : 0);
        });
        if (t >= at('hopr') - 0.06 && t < at('short') - 0.06) {
          write(wEq1, t, tHop1 + 0.1, 1e9);
          write(wEq2, t, tHop1 + 0.35, 1e9);
        } else { op(wEq1, 0); op(wEq2, 0); }
        stampAt(stDing, t, tHop1 + 0.5, at('short') - 0.06, 845, 335, 0.42);
        // short: the four zeros in front
        zeroCount.forEach((z, i) => op(z, t >= at('short') - 0.06 && t < at('counted') + 0.2 ? P(t, mid('short', 0.15 + i * 0.13), 0.2, linear) : 0));
        popSet(cFront, t, mid('short', 0.7), at('counted') - 0.06, 845, 220);
        // counted: Nought pops up, the zero tiles cheer
        if (t >= at('counted') - 0.15) {
          op(nought, 1);
          const p = P(t, at('counted') - 0.15, 0.4, pop);
          tr(nought, 845, 250 + 30 * (1 - clamp(p)), Math.max(0.01, 0.75 * p));
          X.nought = 845;
          nought.set({ t, talk: scTalk(S, t, 'nought'), mood: 'happy', look: -0.8, badge: 1, wave: 1 });
        }
        r52.tiles.forEach((tg, i) => {
          const cheer = i < 4 && t > at('counted') ? Math.abs(Math.sin((t - at('counted')) * 9 + i * 0.9)) : 0;
          scaleAbout(tg, grid2.x(-i), gR0, 1 + 0.08 * cheer * AMP);
          tg.setAttribute('transform', `translate(0 ${(-12 * cheer * AMP).toFixed(1)}) ` + tg.getAttribute('transform'));
        });
      }
      /* achoo: Mum sneezes; pollen specks float */
      if (t >= at('achoo') - 0.06 && t < cW) {
        const sp = P(t, tSneeze, 0.5, easeOut);
        if (t < end('achoo') + 0.2) {
          op(sneeze, t > tSneeze ? 1 - P(t, tSneeze + 1.2, 0.5, linear) : 0);
          tr(sneeze, mumHead[0] - 10 - 20 * sp, mumHead[1] - 120 - 50 * sp, 0.6 + 0.8 * sp);
          op(achooT, t > tSneeze ? 1 - P(t, tSneeze + 1.4, 0.4, linear) : 0);
          tr(achooT, 580, 220, 0.7 + 0.3 * P(t, tSneeze, 0.25, pop), -6);
          popSet(cPollen, t, mid('achoo', 0.6), end('achoo') + 0.2, 760, 330);
        }
        const fl = P(t, mid('achoo', 0.45), 0.4, linear) * (1 - P(t, mid('pollen', 0.5), 0.5, linear));
        specks.forEach((s, i) => {
          const u = (t - at('achoo')) * (0.18 + 0.12 * s.a);
          const x = JX + 30 + (s.b - 0.3) * 260 + Math.sin(t * (0.9 + s.c) + i) * 26;
          const y = 470 - 260 * ((u + s.c) % 1);
          op(s.el, fl * Math.min(1, ((u + s.c) % 1) * 6)); tr(s.el, x, y);
        });
      }
      /* pollen */
      if (t >= at('pollen') - 0.06 && t < cW) {
        op(bPol, 1);
        write(pol1, t, mid('pollen', 0.05), 1e9);
        write(pol2, t, mid('pollen', 0.15), 1e9);
        write(pol3, t, mid('pollen', 0.75), 1e9);
      }
      /* thanks: Nought on the rail beside Mum */
      if (t >= cL2 && t < at('cell') - 0.06) {
        op(nought, 1);
        const p = P(t, cL2, 0.35, pop);
        tr(nought, 412, 546 + 40 * (1 - clamp(p)), 0.5);
        X.nought = 412;
        nought.set({ t, talk: scTalk(S, t, 'nought'), mood: 'happy', look: -0.8, badge: 1, wave: t > mid('thanks', 0.2) ? 1 : 0 });
        const hp = P(t, mid('thanks', 0.35), 0.4, pop);
        op(heart, clamp(hp * 3)); tr(heart, 412, 470 - 10 * Math.sin(t * 4), Math.max(0.01, hp));
      }
      /* cell */
      if (t >= at('cell') - 0.06 && t < at('mine') - 0.06) {
        op(bCell, 1);
        write(cel1, t, mid('cell', 0.05), 1e9);
        write(cel2, t, mid('cell', 0.4), 1e9);
        write(cel3, t, mid('cell', 0.75), 1e9);
      }
      /* mine */
      if (t >= at('mine') - 0.06 && t < cC) {
        op(bMine, 1);
        popSet(mine1, t, at('mine'), 1e9, 570, 160);
        write(mine2, t, mid('mine', 0.3), 1e9);
      }
      /* sign */
      if (t >= cL3 && t < at('like') - 0.06) {
        op(bSign, P(t, cL3, 0.2, linear));
        write(sg1, t, mid('sign', 0.04), 1e9);
        write(sg2, t, mid('sign', 0.42), 1e9);
        op(sgL, P(t, mid('sign', 0.25), 0.3, linear));
        op(sgR, P(t, mid('sign', 0.62), 0.3, linear));
      }
      /* like */
      if (t >= at('like') - 0.06) {
        op(bLike, 1);
        write(like1, t, at('like') + 0.05, 1e9);
        popSet(like2, t, mid('like', 0.4), 1e9, 450, 310);
      }

      /* Spotty's jar on the rail: lifted for spotty and like */
      op(jar, 1);
      const lifted = t < end('spotty') ? P(t, at('spotty') + 0.1, 0.4, ease) * (1 - P(t, end('spotty'), 0.4, ease)) : t >= at('like') - 0.06 ? P(t, at('like'), 0.4, ease) : 0;
      tr(jar, JX - 10 * lifted, JY - 60 * lifted, 0.8, lifted * 4 * Math.sin(t * 7) * AMP);
      tr(jar.spotty, (lifted > 0.5 ? 4 * Math.sin(t * 13) : 0) * AMP, -50);

      /* the humans */
      ['kavya', 'mum', 'dad', 'boy', 'priya', 'tan'].forEach(k => {
        show[k] = 1;
        tr(H[k], XS[k], LY + (k === 'boy' ? 14 : 0), LS);
        let mood = 'neutral', look = lookAt(k), lift_ = 0;
        if (t < at('neg')) { look = k === 'boy' ? 0.2 : lookX(JX, k); mood = k === 'boy' ? 'happy' : k === 'mum' ? 'neutral' : 'happy'; if (k === 'boy') lift_ = 1; }
        else if (t < at('watch')) { look = lookX(IXp, k); }
        else if (t < at('hopr')) { mood = k === 'priya' ? 'smug' : 'neutral'; look = k === 'priya' ? -0.4 : lookX(400, k); }
        else if (t < at('short')) { look = lookX(X.dot, k); mood = k === 'boy' ? 'happy' : 'neutral'; }
        else if (t < at('counted')) { mood = k === 'kavya' ? 'happy' : 'neutral'; look = k === 'kavya' ? 0.3 : lookX(300, k); }
        else if (t < at('achoo')) { mood = 'happy'; look = lookX(845, k); }
        else if (t < at('pollen')) {
          const sneezing = t > tSneeze - 0.25 && t < tSneeze + 0.15;
          if (k === 'mum') { mood = sneezing ? 'shock' : t > tSneeze ? 'sad' : 'neutral'; look = 0.4; }
          else { mood = t > tSneeze ? 'shock' : 'neutral'; look = lookX(XS.mum, k); if (t > mid('achoo', 0.6)) { mood = 'neutral'; look = lookX(JX, k); } }
        }
        else if (t < cW) { mood = k === 'tan' ? 'happy' : 'neutral'; if (k === 'tan') { lift_ = 1; look = -0.6; } else look = lookX(XS.tan, k); if (k === 'mum') mood = 'sad'; }
        else if (t < at('cell')) { mood = 'happy'; look = lookX(412, k); if (k === 'mum') look = 0.5; }
        else if (t < at('mine')) { mood = k === 'priya' ? 'smug' : 'neutral'; look = k === 'priya' ? 0.4 : lookAt(k); }
        else if (t < cC) { mood = k === 'dad' ? 'smug' : k === 'kavya' ? 'deadpan' : 'neutral'; if (k === 'dad') { lift_ = 1; look = 0.3; } }
        else if (t < at('like')) { mood = k === 'kavya' ? 'happy' : k === 'dad' ? 'sad' : 'neutral'; look = k === 'kavya' ? 0.5 : lookX(570, k); }
        else { mood = k === 'kavya' ? 'deadpan' : 'happy'; look = k === 'boy' ? 0 : lookX(XS.boy, k); if (k === 'boy') lift_ = 1; }
        if (k === 'mum' && t >= at('pollen') && t < at('thanks')) mood = 'sad';
        H[k].set({ t, talk: scTalk(S, t, k), mood, look, lift: lift_ });
      });
      // the Index on the handrail
      op(idx, 1);
      tr(idx, IXp, IYp, IS);
      idx.set({ t, talk: scTalk(S, t, 'index'), mood: 'smug', look: spk === 'index' || !spk ? 0.5 : lookAt('index'), val: t < at('watch') ? '−3' : 'n', point: spk === 'index' ? 1 : 0 });
    }

    /* ---------- W: the wall close-up ---------- */
    op(wallShot, sW);
    cRight5.set(0); op(eq5, 0); op(eqBig, 0); cTooBig.set(0); op(xBig, 0); op(tickS, 0);
    if (sW) {
      show.kavya = 1;
      op(pvG, 1); pvG.setAttribute('transform', `translate(${WGX} ${WGY})`);
      r52.set(0); zeroCount.forEach(z => op(z, 0)); hopArcs.forEach(h => op(h.hg, 0));
      tr(kav, 112, 628, 1.08);
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: t < at('me') ? 'happy' : 'shock', look: t < at('me') ? 0.8 : 1, lift: 0 });
      // 3.08 slides 5 places right, then reads 0.000 030 8 with the cream place-holders
      const done = mid('right5', 0.6);
      // 3.08 (tiles 5-7 of 0.000 030 8, starting 5 columns left) slides right; then the place-holders fill in
      rSmall.set(1);
      rSmall.shift(5 - 5 * P(t, mid('right5', 0.12), 1.6, ease));
      rSmall.tiles.forEach((tg, i) => op(tg, i >= 5 ? 1 : P(t, done + i * 0.05, 0.2, linear)));
      popSet(cRight5, t, mid('right5', 0.08), at('me') - 0.06, 600, w2Y(1));
      if (t < at('me') - 0.06) write(eq5, t, mid('right5', 0.66), 1e9);
      // me: Nought jumps into his place-holder zero; the row without him is ten times too big
      const meOn = t >= at('me') - 0.06;
      op(glowT, meOn ? P(t, mid('me', 0.2), 0.25, linear) * (0.7 + 0.3 * wave(t, 0.5)) : 0);
      if (meOn) {
        op(nought, 1);
        const jp = P(t, at('me'), 0.55, ease), jy = Math.sin(Math.PI * jp) * 90;
        tr(nought, lerp(1110, w2X(-4), jp), lerp(w2Y(0) + 40, w2Y(0) + 6, jp) - jy, lerp(0.5, 0.42, jp));
        X.nought = w2X(-4);
        nought.set({ t, talk: scTalk(S, t, 'nought'), mood: t > mid('me', 0.6) ? 'shock' : 'happy', look: t > mid('me', 0.6) ? 0 : -0.5, badge: 0, wave: t < mid('me', 0.5) ? 1 : 0 });
        rBig.set(P(t, mid('me', 0.5), 0.3, linear));
        op(xBig, P(t, mid('me', 0.62), 0.2, linear)); op(tickS, P(t, mid('me', 0.62), 0.2, linear));
        write(eqBig, t, mid('me', 0.62), 1e9);
        popSet(cTooBig, t, mid('me', 0.72), 1e9, 650, 560);
      } else rBig.set(0);
    }

    /* ---------- C: Club Standard Form ---------- */
    op(clubShot, sC); op(clubFg, sC); stList.set(0); stIn.set(0);
    if (sC) {
      const tWork = mid('small', 0.3), tIn = mid('small', 0.86);
      club.rope(t < tIn ? 0 : P(t, tIn, 0.6, ease));
      tr(norm, 870, 470, 1);
      X.norm = 870;
      const nl = t < tWork ? P(t, at('small') + 0.05, 0.3, ease) * (1 - P(t, tWork - 0.3, 0.25, ease)) : 0;
      const ns = t < tWork ? P(t, mid('small', 0.08), 0.25, pop) : 1 - P(t, tWork, 0.3, ease);
      norm.set({ t, talk: scTalk(S, t, 'norm'), mood: 'deadpan', look: -0.7, list: nl, stop: ns });
      op(g45, 0); op(g45f, 0);
      if (t < mid('small', 0.82)) { op(g45, 1); tr(g45, GUEST[0], GUEST[1] - 4 * Math.abs(Math.sin(t * 3))); }
      else {
        const w = P(t, tIn + 0.35, 1.0, easeIn);
        op(g45f, 1 - P(t, tIn + 1.05, 0.3, linear));
        tr(g45f, lerp(GUEST[0], 640, w), GUEST[1] - 6 * Math.abs(Math.sin(t * 9)) * (w > 0 && w < 1 ? 1 : 0));
      }
      op(ring45, t < tWork + 0.2 ? P(t, mid('small', 0.1), 0.25, linear) : 0);
      fadeWin(notBig, t, mid('small', 0.12), tWork + 0.1);
      stampAt(stList, t, mid('small', 0.06), tWork, 330, 300, 0.55);
      // the working
      op(card, t >= tWork - 0.05 ? P(t, tWork - 0.05, 0.2, linear) : 0);
      fixW.show(0, P(t, mid('small', 0.31), 0.3, linear));
      fixW.show(1, P(t, mid('small', 0.46), 0.3, linear));
      fixW.show(2, P(t, mid('small', 0.58), 0.3, linear));
      fixW.ring(2, P(t, mid('small', 0.66), 0.25, linear));
      op(ruleT, P(t, mid('small', 0.68), 0.3, linear));
      op(checkT, P(t, mid('small', 0.78), 0.3, linear));
      stampAt(stIn, t, tIn, 1e9, 960, 660, 0.45);
    }

    /* characters not in this shot */
    for (const k in show) op(H[k], show[k]);
    op(norm, sC);
  };
});
