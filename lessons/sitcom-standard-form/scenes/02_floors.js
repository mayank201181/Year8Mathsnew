/* Scene 2: Every floor is a power of 10 (positive and negative powers of 10).
   Shots (hard sitcom cuts):
   A  the lift, half an hour in (STUCK: 30 min): Ah Boy presses every button, the panel lights up 1-12 -> Big Ten
      (behind the humans, the Index on his shoulder): "Ten. Ten. Ten." -> three amber 10 tiles with × between ->
      10³ = 10 × 10 × 10 = 1000 (base under the 10, index over the 3) -> Kavya: 10⁶ = 1 000 000, a 1 and six cream
      zeros counted 1-6.
   B  the floor chart on the steel wall (showpiece): the car rides down 10³ -> 10² -> 10¹, ÷ 10 arrows, "?" at G ->
      Ah Boy: 10⁰ = 0? -> WRONG FLOOR: 10 ÷ 10 = 1, 10⁰ = 1, the ground floor glows, DING! -> Priya: the basements
      are negative, −100? -> WRONG FLOOR: the car rides into the basements, 10⁻¹ = 1/10 = 0.1, 10⁻² = 1/100 = 0.01,
      small, not negative -> Kavya: the place-value names light up (tenths = 10⁻¹, hundredths = 10⁻²).
      The speaker pops in small at the lower right.
   A  the lift: lift rules (× add, ÷ subtract) -> Dad: 10⁵ × 10⁻² = 10³ on a little shaft (up 5, down 2) -> Kavya:
      10³ ÷ 10⁴ = 10⁻¹ = 0.1 (down 4) -> Mr Tan: MADS, then the pun; lift music, deadpan faces -> Big Ten: "Ten."
      The Index slowly turns to look at him. */
scene('floors', S => {
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
  const stampAt = (st, t, t0, t1, x, y, s) => { st.set(t >= t0 && t < t1 ? P(t, t0, 0.35, linear) : 0); tr(st, x, y, s); };
  const segTile = (parent, x, y) => {   // an amber lift-display "10"
    const g = G(parent), inner = G(g);
    E('rect', { x: -66, y: -46, width: 132, height: 92, rx: 12, fill: '#101014', stroke: '#5A5A66', 'stroke-width': 4 }, inner);
    sfSeg(inner, '10', { h: 60, anchor: 'middle' });
    tr(g, x, y); g.inner = inner;
    return g;
  };
  const GOLD = '#FFE45C', ORANGE = '#E8641E', INK = SF.marker, RED = SF.red, GREEN = SF.green, PURPLE = '#8A3A8E';

  /* the floor chart: a variant of sfFloors with the place-value names in their own group (they light up on
     their own line) and one ÷ 10 arrow per floor, so they can draw in one at a time */
  const floorChart = (parent, o) => {
    const top = o.top, bot = o.bottom, rowH = o.rowH, w = o.w, size = o.size, ink = MK.ink, g = G(parent);
    const H = (top - bot + 1) * rowH;
    g.y = k => (top - k) * rowH + rowH / 2;
    E('rect', { x: -14, y: -14, width: w + 28, height: H + 28, rx: 16, fill: '#E9EEF2', stroke: '#7D8A96', 'stroke-width': 4 }, g);
    E('rect', { x: 0, y: g.y(0) + rowH / 2, width: w, height: (0 - bot) * rowH, fill: '#D6DCE2' }, g);   // the basements
    const hlL = G(g), rowL = G(g);
    g.rows = {};
    for (let k = top; k >= bot; k--) {
      const y = g.y(k), r = {};
      r.hl = E('rect', { x: 4, y: y - rowH / 2 + 4, width: w - 8, height: rowH - 8, rx: 10, fill: '#FFE45C', opacity: 0 }, hlL);
      r.btn = G(rowL); tr(r.btn, 70, y);
      E('rect', { x: -58, y: -rowH / 2 + 8, width: 116, height: rowH - 16, rx: (rowH - 16) / 2, fill: k === 0 ? '#FFE9A8' : '#FFFFFF', stroke: '#5A6670', 'stroke-width': 3 }, r.btn);
      mkMath(r.btn, 0, size * 0.36, k < 0 ? `10^(${k})` : `10^${k}`, { size, fill: ink, anchor: 'middle' });
      r.val = mkMath(rowL, 150, y + size * 0.36, `"${SF_FLOORVAL[k]}"`, { size, fill: k < 0 ? '#1E7A4A' : k === 0 ? '#B8862E' : '#2E4C8C', anchor: 'start' });
      r.name = T(rowL, w - 16, y + 9, (k === 0 ? 'G · ' : k < 0 ? 'B' + (-k) + ' · ' : '') + SF_FLOORNAME[k], { size: 26, weight: 700, anchor: 'end', fill: '#5A6670', font: FB });
      g.rows[k] = r;
    }
    E('path', { d: `M0,${g.y(0) + rowH / 2} L${w},${g.y(0) + rowH / 2}`, stroke: '#5A6670', 'stroke-width': 4, 'stroke-dasharray': '12 8' }, g);
    g.steps = {};
    for (let k = top; k > bot; k--) {
      const sg = G(g);
      const a = arrow(sg, -22, g.y(k) + 8, -22, g.y(k - 1) - 8, { color: '#E8424F', width: 4, bend: -16 });
      const lab = T(sg, -40, (g.y(k) + g.y(k - 1)) / 2 + 9, '÷ 10', { size: 26, weight: 800, anchor: 'end', fill: '#E8424F' });
      g.steps[k] = { sg, a, lab };
    }
    const car = G(g);
    E('path', { d: 'M0,-24 L0,-70', stroke: '#5A6670', 'stroke-width': 3 }, car);
    E('rect', { x: -24, y: -26, width: 48, height: 52, rx: 6, fill: '#FFB020', stroke: SC_INK, 'stroke-width': 3 }, car);
    E('path', { d: 'M0,-20 L0,20', stroke: '#B57B12', 'stroke-width': 3 }, car);
    g.car = pos => { op(car, 1); tr(car, w + 46, g.y(pos)); };
    g.W = w; g.H = H;
    return g;
  };

  /* layers */
  const Lbg = G(root), Lboard = G(root), Lcast = G(root), Lfront = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= A: the lift ================= */
  const liftShot = G(Lbg);
  const lift = sfLift(liftShot);
  const frontWrap = G(Lfront);
  frontWrap.appendChild(lift.front); frontWrap.appendChild(lift.top);
  const cStuck = pill(Lfg, 'STUCK: 30 min', { size: 26, color: '#FF8A8A', stroke: '#FF8A8A' });
  const cHalf = mkChip(Lfg, '**Half an hour** in', { size: 34, col: GOLD });

  // lesson: ten to the power three
  const bLesson = G(Lboard);
  const lesEq = mkMath(bLesson, 420, 250, '10^3', { size: 120, fill: INK, anchor: 'middle' });
  const lesTxt = mkText(bLesson, 420, 330, 'ten to the **power** three', { size: 34, fill: INK, anchor: 'middle' });

  // three: Ten. Ten. Ten.
  const bThree = G(Lboard);
  const tens = [230, 430, 630].map(x => segTile(bThree, x, 220));
  const times = [330, 530].map(x => mkMath(bThree, x, 238, '*', { size: 64, fill: INK, anchor: 'middle' }));

  // cube: 10³ = 10 × 10 × 10 = 1000
  const bCube = G(Lboard);
  const CX = 180, CY = 248, CS = 64;
  const cubeEq = mkMath(bCube, CX, CY, '10^3 = 10 * 10 * 10 = 1000', { size: CS, fill: INK });
  const w10 = mkMeasure('10', { size: CS }).w, w103 = mkMeasure('10^3', { size: CS }).w;
  const baseLab = G(bCube);
  T(baseLab, CX + w10 / 2, 342, 'base', { size: 30, weight: 800, anchor: 'middle', fill: ORANGE });
  const baseAr = arrow(baseLab, CX + w10 / 2, 314, CX + w10 / 2, CY + 12, { color: ORANGE, width: 4 });
  const idxLab = G(bCube);
  T(idxLab, CX + w10 + 60, 140, 'index', { size: 30, weight: 800, anchor: 'start', fill: PURPLE });
  const idxAr = arrow(idxLab, CX + w10 + 56, 136, CX + (w10 + w103) / 2 + 6, CY - CS * 0.62, { color: PURPLE, width: 4, bend: -14 });
  const cHow = mkChip(Lboard, 'the index: how many **tens** multiply', { size: 28, col: PURPLE, fill: 'rgba(255,253,246,0.96)' });

  // million: 10⁶ = 1 000 000
  const bMil = G(Lboard);
  const milEq = mkMath(bMil, 180, 180, '10^6 = "1 000 000"', { size: 60, fill: INK });
  const milTiles = [], milNums = [];
  for (let i = 0; i < 7; i++) {
    const x = 210 + i * 72, y = 268, zero = i > 0, tg = G(bMil);
    E('rect', { x: x - 31, y: y - 37, width: 62, height: 74, rx: 10, fill: zero ? SF.holder : SF.tile, stroke: zero ? SF.holderInk : MK.ink, 'stroke-width': 3 }, tg);
    T(tg, x, y + 16, zero ? '0' : '1', { size: 46, weight: 800, anchor: 'middle', fill: zero ? SF.holderInk : MK.ink });
    milTiles.push(tg);
    if (zero) milNums.push(T(bMil, x, 338, String(i), { size: 30, weight: 800, anchor: 'middle', fill: PURPLE }));
  }
  const cMil = mkChip(bMil, 'a **million**', { size: 34, col: INK, fill: 'rgba(255,253,246,0.96)' });

  /* ================= B: the floor chart on the wall ================= */
  const chartShot = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#D3DAE0', '#A7B2BC', true) }, chartShot);
  let brs = '';
  for (let i = 0; i < 22; i++) brs += `M${20 + i * 56},0 L${20 + i * 56},750 `;
  E('path', { d: brs, stroke: '#FFFFFF', 'stroke-width': 3, opacity: 0.18 }, chartShot);
  E('path', { d: 'M790,0 L790,750', stroke: '#8C98A4', 'stroke-width': 6 }, chartShot);
  // the lift's floor display, top right (it flashes on WRONG FLOOR)
  const mini = G(chartShot); tr(mini, 1090, 62);
  E('rect', { x: -66, y: -34, width: 132, height: 68, rx: 10, fill: '#101014', stroke: '#5A6670', 'stroke-width': 4 }, mini);
  const miniSeg = sfSeg(mini, '10', { h: 42, max: 2, anchor: 'middle' });
  const chartFg = G(Lboard);
  const CH = floorChart(chartFg, { top: 3, bottom: -3, rowH: 66, w: 560, size: 34 });
  const CHX = 150, CHY = 118;
  tr(CH, CHX, CHY);
  const qMark = T(chartFg, CHX + 150, CHY + CH.y(0) + 16, '?', { size: 50, weight: 800, anchor: 'start', fill: RED });
  const RX = 990;   // centre of the right-hand panel
  const cDiv = mkChip(chartFg, 'each floor **down**: {{÷ 10}}', { size: 30, col: RED, fill: 'rgba(255,253,246,0.96)' });
  const pZero = G(chartFg);
  mkMath(pZero, RX, 220, '10^0 = 0 "?"', { size: 56, fill: ORANGE, anchor: 'middle' });
  const cNoTens = mkChip(pZero, 'no tens!', { size: 32, col: ORANGE, fill: 'rgba(255,253,246,0.96)' });
  tr(cNoTens, RX, 300); cNoTens.set(1);
  const wOne = mkWorking(chartFg, RX - 30, 160, ['10 ÷ 10 = 1', '10^0 = 1'], { size: 50, fill: INK, gap: 30 });
  const cGround = mkChip(chartFg, 'the **ground floor**', { size: 30, col: '#B8862E', fill: 'rgba(255,253,246,0.96)' });
  const pNeg = G(chartFg);
  mkText(pNeg, RX, 190, '{{10^(-1)}},  {{10^(-2)}}', { size: 48, fill: INK, anchor: 'middle' });
  mkText(pNeg, RX, 262, 'negative?', { size: 36, fill: RED, anchor: 'middle' });
  const neg100 = mkMath(pNeg, RX, 360, '-100 "?"', { size: 64, fill: RED, anchor: 'middle' });
  const wSmall = mkWorking(chartFg, RX - 70, 140, ['10^(-1) = 1/10 = 0.1', '10^(-2) = 1/100 = 0.01'], { size: 42, fill: INK, gap: 30 });
  const cSmall = mkChip(chartFg, '**small**, not negative', { size: 30, col: GREEN, fill: 'rgba(255,253,246,0.96)' });
  const pCols = G(chartFg);
  const colA = mkText(pCols, RX, 290, 'tenths = {{10^(-1)}}', { size: 38, fill: INK, anchor: 'middle' });
  const colB = mkText(pCols, RX, 360, 'hundredths = {{10^(-2)}}', { size: 38, fill: INK, anchor: 'middle' });
  const cCols = mkChip(chartFg, 'place-value columns\nare **powers of 10**', { size: 30, col: GREEN, fill: 'rgba(255,253,246,0.96)' });
  const stWrong = sfStamp(Lfg, 'wrong'), stDing = sfStamp(Lfg, 'ding');

  /* ================= A again: lift rules, Dad, Kavya, MADS ================= */
  const bRule = G(Lboard);
  const rule1 = mkMath(bRule, 180, 168, '10^a * 10^b = 10^(a + b)', { size: 56, fill: INK });
  const note1 = mkText(bRule, 180, 216, '**multiply**: **add** the indices', { size: 30, fill: GREEN });
  const rule2 = mkMath(bRule, 180, 290, '10^a ÷ 10^b = 10^(a - b)', { size: 56, fill: INK });
  const note2 = mkText(bRule, 180, 338, '**divide**: **subtract** them', { size: 30, fill: RED });

  // the little shaft (floors 10⁵ down to 10⁻¹) and the working
  const bShaft = G(Lboard);
  const SX = 272, SY = (k) => 136 + (5 - k) * 36;
  E('rect', { x: SX - 22, y: SY(5) - 18, width: 44, height: SY(-1) - SY(5) + 36, rx: 8, fill: 'rgba(255,253,246,0.9)', stroke: '#5A6670', 'stroke-width': 3 }, bShaft);
  for (let k = 5; k >= -1; k--) {
    E('path', { d: `M${SX - 22},${SY(k) + 18} L${SX + 22},${SY(k) + 18}`, stroke: k === 0 ? '#5A6670' : '#C9D3DC', 'stroke-width': k === 0 ? 4 : 2 }, bShaft);
    mkMath(bShaft, SX - 32, SY(k) + 9, k < 0 ? `10^(${k})` : `10^${k}`, { size: 26, fill: k === 0 ? '#B8862E' : INK, anchor: 'end' });
  }
  const sCar = G(bShaft);
  E('rect', { x: -15, y: -14, width: 30, height: 28, rx: 5, fill: '#FFB020', stroke: SC_INK, 'stroke-width': 2.5 }, sCar);
  const hopUp = T(bShaft, SX + 32, SY(2.5) + 9, '+5', { size: 30, weight: 800, anchor: 'start', fill: GREEN });
  const hopDn = T(bShaft, SX + 32, SY(4) + 9, '−2', { size: 30, weight: 800, anchor: 'start', fill: RED });
  const hopDn4 = T(bShaft, SX + 32, SY(1) + 9, '−4', { size: 30, weight: 800, anchor: 'start', fill: RED });
  const WK = mkWorking(Lboard, 580, 124, ['10^5 * 10^(-2) = 10^(5 + (-2))', '= 10^3', '10^3 ÷ 10^4 = 10^(3 - 4)', '= 10^(-1) = 0.1'], { size: 38, fill: INK, gap: 14 });
  const cCheck = mkChip(Lboard, 'check: {{"100 000" * 0.01 ÷ "10 000" = 0.1}}', { size: 28, col: GREEN, fill: 'rgba(255,253,246,0.96)' });

  // MADS
  const bMads = G(Lboard);
  const madsG = G(bMads);
  const madsCol = [INK, GREEN, INK, RED];
  let mx = 180;
  ['M', 'A', 'D', 'S'].forEach((ch, i) => { T(madsG, mx, 212, ch, { size: 112, weight: 800, fill: madsCol[i] }); mx += textWidth(ch, 112, FD, 800) + 6; });
  const madsL1 = mkText(bMads, 190, 280, '**M**ultiply → **A**dd', { size: 36, fill: INK, boldFill: GREEN });
  const madsL2 = mkText(bMads, 190, 336, '**D**ivide → **S**ubtract', { size: 36, fill: INK, boldFill: RED });
  const cMusic = pill(Lfg, '♪ lift music ♪', { size: 30, color: '#B9F0C8', stroke: '#B9F0C8' });

  /* ================= the cast ================= */
  const TENX = 930, TENY = 300, TENS = 0.8;
  const ten = cast(Lcast, 'ten', { s: TENS });
  const idx = cast(Lcast, 'index', { val: 'n' });
  const LS = 0.84, LY = 500;
  const XS = { kavya: 165, mum: 325, dad: 485, boy: 640, priya: 790, tan: 945 };
  const kav = cast(Lcast, 'kavya', { s: LS });
  const mum = cast(Lcast, 'mum', { s: LS });
  sfRice(mum.hand, 0.62);
  const dad = cast(Lcast, 'dad', { s: LS });
  const boy = cast(Lcast, 'boy', { s: LS });
  const priya = cast(Lcast, 'priya', { s: LS });
  const tan = cast(Lcast, 'tan', { s: LS });
  const H = { kavya: kav, mum, dad, boy, priya, tan };
  const PER = sfPerch(TENX, TENY, TENS);
  const X = Object.assign({ index: PER[0], ten: TENX }, XS);
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cut points */
  const cB = at('down') - 0.06, cC = at('rule') - 0.06;
  const tW1 = at('one') + 0.05, tW2 = at('small') + 0.05;          // WRONG FLOOR buzzes
  const tCheck = mid('divide', 0.8);

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const sA = on(t, -1, cB) || on(t, cC, 1e9), sB = on(t, cB, cC);
    const spk = scWho(S, t);
    const lookAt = k => (spk && X[spk] !== undefined && spk !== k ? clamp((X[spk] - X[k]) / 300, -1, 1) : 0);
    const show = { kavya: 0, mum: 0, dad: 0, boy: 0, priya: 0, tan: 0, ten: 0, idx: 0 };

    /* ---------- A: the lift ---------- */
    op(liftShot, sA); op(frontWrap, sA);
    [bLesson, bThree, bCube, bMil, bRule, bShaft, bMads, baseLab, idxLab].forEach(b => op(b, 0));
    cHow.set(0); cHalf.set(0); cCheck.set(0); WK.set(0); op(cStuck, 0); op(cMusic, 0);
    if (sA) {
      lift.upd(t); lift.dim(1);
      lift.disp.set('10');
      tr(cStuck, 1075, 42); op(cStuck, 1);
      // Ah Boy presses every button
      lift.lights(t < at('buttons') ? 0 : Math.min(12, 12.4 * P(t, mid('buttons', 0.12), end('buttons') - mid('buttons', 0.12) - 0.3, linear)));
      popSet(cHalf, t, at('buttons') + 0.1, at('lesson'), 330, 170);

      /* lesson */
      if (t >= at('lesson') - 0.06 && t < at('three') - 0.06) {
        op(bLesson, 1);
        write(lesEq, t, mid('lesson', 0.45), 1e9); write(lesTxt, t, mid('lesson', 0.6), 1e9);
      }
      /* three: Ten. Ten. Ten. */
      if (t >= at('three') - 0.06 && t < at('cube') - 0.06) {
        op(bThree, 1);
        tens.forEach((g, i) => { const p = P(t, mid('three', 0.08 + i * 0.3), 0.35, pop); op(g, clamp(p * 3)); tr(g.inner, 0, 0, Math.max(0.01, 0.6 + 0.4 * p)); });
        times.forEach((m, i) => op(m, P(t, mid('three', 0.08 + (i + 1) * 0.3), 0.2, linear)));
      }
      /* cube */
      if (t >= at('cube') - 0.06 && t < at('million') - 0.06) {
        op(bCube, 1);
        write(cubeEq, t, at('cube'), 1e9);
        op(baseLab, P(t, mid('cube', 0.5), 0.3, linear)); baseAr.set(P(t, mid('cube', 0.5), 0.35, linear));
        op(idxLab, P(t, mid('cube', 0.66), 0.3, linear)); idxAr.set(P(t, mid('cube', 0.66), 0.35, linear));
        popSet(cHow, t, mid('cube', 0.8), 1e9, 575, 318);
      }
      /* million */
      if (t >= at('million') - 0.06 && t < cB) {
        op(bMil, 1);
        write(milEq, t, mid('million', 0.05), 1e9);
        milTiles.forEach((g, i) => op(g, P(t, mid('million', 0.22 + i * 0.07), 0.2, linear)));
        milNums.forEach((n, i) => op(n, P(t, mid('million', 0.29 + i * 0.07), 0.2, linear)));
        popSet(cMil, t, mid('million', 0.8), 1e9, 720, 160);
      }

      /* rule */
      if (t >= cC && t < at('updown') - 0.06) {
        op(bRule, 1);
        write(rule1, t, mid('rule', 0.08), 1e9); write(note1, t, mid('rule', 0.3), 1e9);
        write(rule2, t, mid('rule', 0.55), 1e9); write(note2, t, mid('rule', 0.75), 1e9);
      }
      /* updown, divide: the shaft and the working */
      if (t >= at('updown') - 0.06 && t < at('mads') - 0.06) {
        op(bShaft, 1);
        const u0 = mid('updown', 0.3), u1 = mid('updown', 0.55), u2 = mid('updown', 0.8);
        const d0 = mid('divide', 0.3), d1 = mid('divide', 0.55);
        let pos = 0;
        if (t < at('divide')) pos = t < u1 ? lerp(0, 5, P(t, u0, u1 - u0, ease)) : lerp(5, 3, P(t, u1 + 0.1, u2 - u1 - 0.1, ease));
        else pos = lerp(3, -1, P(t, d0, d1 - d0, ease));
        tr(sCar, SX, SY(pos));
        op(hopUp, t < at('divide') ? P(t, u0, 0.3, linear) : 0.25);
        op(hopDn, t < at('divide') ? P(t, u1 + 0.1, 0.3, linear) : 0.25);
        op(hopDn4, P(t, d0, 0.3, linear));
        tr(hopUp, 0, 0); tr(hopDn, 0, 0);
        const lateD = t >= tCheck ? 1 - P(t, tCheck, 0.25, linear) : 1;
        WK.show(0, P(t, mid('updown', 0.12), 0.35, linear) * lateD);
        WK.show(1, P(t, u2, 0.35, linear) * lateD);
        WK.show(2, P(t, mid('divide', 0.08), 0.35, linear));
        WK.show(3, P(t, d1, 0.35, linear));
        WK.ring(1, P(t, u2 + 0.4, 0.25, linear) * lateD);
        WK.ring(3, P(t, d1 + 0.6, 0.25, linear));
        popSet(cCheck, t, tCheck + 0.1, 1e9, 560, 168);
      }
      /* mads, laugh */
      if (t >= at('mads') - 0.06) {
        op(bMads, 1);
        write(madsG, t, mid('mads', 0.04), 1e9);
        write(madsL1, t, mid('mads', 0.16), 1e9);
        write(madsL2, t, mid('mads', 0.3), 1e9);
        if (t > end('mads') + 0.05) { const p = P(t, end('mads') + 0.05, 0.35, pop); op(cMusic, clamp(p * 3)); tr(cMusic, 690, 180, Math.max(0.01, 0.6 + 0.4 * p)); }
      }

      /* Big Ten and the Index on his shoulder */
      show.ten = 1; show.idx = 1;
      const tenTalk = scTalk(S, t, 'ten');
      const beat = t >= at('three') && t < end('three') ? Math.max(0, Math.sin((t - at('three')) / (end('three') - at('three')) * Math.PI * 3)) : 0;
      tr(ten, TENX, TENY, TENS);
      ten.set({ t, talk: tenTalk, mood: 'deadpan', look: spk === 'ten' ? -0.3 : lookAt('ten'), glow: 0.6 + 0.4 * beat, flex: beat * AMP });
      tr(idx, PER[0], PER[1], PER[2]);
      let iv = 'n', im = 'smug', ip = 0, il = lookAt('index');
      if (t >= at('lesson') && t < at('million')) iv = '3';
      if (t >= at('million') && t < cB) iv = '6';
      if (t >= at('updown') && t < at('divide')) iv = t > mid('updown', 0.8) ? '3' : '5';
      if (t >= at('divide') && t < at('mads')) iv = t > mid('divide', 0.55) ? '−1' : '3';
      if (spk === 'index') { ip = 1; il = 0.3; }
      if (t >= at('lesson') && t < end('lesson')) { il = -0.8; ip = 1; }
      if (t >= at('mads') && t > mid('mads', 0.55)) { im = 'deadpan'; il = lookAt('index'); }
      if (t >= at('laugh')) { il = -clamp(P(t, at('laugh') + 0.2, 1.4, ease)); im = 'deadpan'; ip = 0; }
      idx.set({ t, talk: scTalk(S, t, 'index'), mood: im, look: il, val: iv, point: ip });

      /* the humans */
      ['kavya', 'mum', 'dad', 'boy', 'priya', 'tan'].forEach(k => {
        show[k] = 1;
        tr(H[k], XS[k], LY + (k === 'boy' ? 22 : 0), LS);
        let mood = 'neutral', look = lookAt(k), lift_ = 0;
        if (t < at('lesson')) {        // Ah Boy presses every button; the others deadpan
          mood = k === 'boy' ? 'happy' : 'deadpan'; look = k === 'boy' ? 0.8 : clamp((XS.boy - XS[k]) / 300, -1, 1);
          if (k === 'boy') lift_ = 1;
        } else if (t < at('million')) {
          mood = k === 'boy' ? 'happy' : 'neutral';
          if (spk !== 'index' && spk !== 'ten') look = clamp((PER[0] - XS[k]) / 300, -1, 1);
        } else if (t < cB) {
          mood = k === 'kavya' ? 'happy' : k === 'boy' ? 'shock' : 'neutral';
        } else if (t < at('updown')) {
          mood = 'neutral';
        } else if (t < at('divide')) {
          mood = k === 'dad' ? 'smug' : k === 'kavya' && t > mid('updown', 0.8) ? 'shock' : 'neutral';
          if (k === 'dad') look = -0.5;
        } else if (t < at('mads')) {
          mood = k === 'kavya' ? 'happy' : k === 'dad' ? 'happy' : 'neutral';
          if (k === 'kavya') look = 0.6;
        } else if (t < at('laugh')) {   // Mr Tan's pun lands to silence
          const punch = mid('mads', 0.55);
          if (k === 'tan') { mood = 'happy'; lift_ = t < punch ? 1 : 0; look = t < punch ? -0.6 : 0; }
          else { mood = t < punch ? 'neutral' : 'deadpan'; if (t > end('mads')) look = 0; }
        } else {
          mood = 'deadpan'; look = 0;
        }
        H[k].set({ t, talk: scTalk(S, t, k), mood, look, lift: lift_ });
      });
    }

    /* ---------- B: the floor chart ---------- */
    op(chartShot, sB); op(chartFg, sB);
    stWrong.set(0); stDing.set(0);
    if (sB) {
      // the display flashes on WRONG FLOOR
      const fl = (t > tW1 && t < tW1 + 0.7) || (t > tW2 && t < tW2 + 0.7);
      miniSeg.set(fl && Math.sin(t * 30) > 0 ? '  ' : '10');
      const tDown = [mid('down', 0.18), mid('down', 0.38), mid('down', 0.58)];   // 1000, 100, 10
      const tG = mid('down', 0.78);
      const tOne = mid('one', 0.55), tB1 = mid('small', 0.3), tB2 = mid('small', 0.5), tB3 = mid('small', 0.68);
      const tNegRows = mid('basement', 0.12);
      for (let k = 3; k >= -3; k--) {
        const r = CH.rows[k];
        let rowP = 0, valP = 0;
        if (k > 0) { rowP = P(t, tDown[3 - k] - 0.3, 0.3, linear); valP = P(t, tDown[3 - k], 0.3, linear); }
        if (k === 0) { rowP = P(t, tG - 0.3, 0.3, linear); valP = P(t, tOne, 0.3, linear); }
        if (k < 0) { rowP = k >= -2 ? P(t, tNegRows + (-1 - k) * 0.3, 0.3, linear) : P(t, tB3 - 0.3, 0.3, linear); valP = P(t, [tB1, tB2, tB3][-1 - k], 0.3, linear); }
        op(r.btn, rowP); op(r.val, valP);
        // the names light up on Kavya's line, top to bottom
        const tn = mid('columns', 0.1 + (3 - k) * 0.06);
        op(r.name, P(t, tn, 0.25, linear));
        let hl = 0;
        if (k === 0) hl = t >= tOne && t < at('basement') ? P(t, tOne, 0.3, linear) : 0;
        if (t >= at('columns')) hl = win(t, tn, tn + 0.9, 0.2);
        if (t >= at('small') && t < at('columns') && k < 0) hl = win(t, [tB1, tB2, tB3][-1 - k], [tB1, tB2, tB3][-1 - k] + 0.8, 0.2);
        op(r.hl, 0.75 * hl);
        if (r.name.getAttribute('fill') !== (k < 0 ? '#1E7A4A' : '#5A6670')) r.name.setAttribute('fill', k < 0 ? '#1E7A4A' : '#5A6670');
      }
      for (let k = 3; k > -3; k--) {
        const s = CH.steps[k];
        const ts = k > 1 ? tDown[3 - k] + 0.15 : k === 1 ? tG - 0.15 : [tB1, tB2, tB3][-k] - 0.25;
        const p = P(t, ts - 0.3, 0.35, linear);
        op(s.sg, p > 0 ? 1 : 0); s.a.set(p); op(s.lab, P(t, ts - 0.1, 0.25, linear));
      }
      // the car
      let pos = 3;
      if (t < tDown[0]) pos = 3;
      else if (t < tG) pos = lerp(3, 0, clamp((t - tDown[0]) / (tG - tDown[0])));
      else if (t < tB1) pos = 0;
      else pos = lerp(0, -3, P(t, tB1 - 0.4, tB3 - tB1 + 0.4, linear));
      if (t >= tDown[0] && t < tG) { const seg = (t - tDown[0]) / (tG - tDown[0]) * 3; pos = 3 - Math.floor(seg) - ease(clamp((seg % 1) * 2.2)); }
      CH.car(pos);
      op(qMark, t >= tG && t < tOne ? P(t, tG, 0.25, linear) : 0);

      // the right-hand panel
      popSet(cDiv, t, mid('down', 0.15), at('zero'), RX, 200);
      fadeWin(pZero, t, at('zero') + 0.1, at('one') + 0.15);
      stampAt(stWrong, t, t < at('basement') ? tW1 : tW2, t < at('basement') ? tW1 + 1.4 : tW2 + 1.4, RX, 260, 0.42);
      wOne.show(0, t >= tW1 + 1.4 && t < at('basement') ? P(t, tW1 + 1.4, 0.35, linear) : 0);
      wOne.show(1, t >= tW1 + 1.4 && t < at('basement') ? P(t, tOne, 0.35, linear) : 0);
      wOne.ring(1, t < at('basement') ? P(t, tOne + 0.3, 0.25, linear) : 0);
      popSet(cGround, t, tOne + 0.5, at('basement'), RX, 345);
      stampAt(stDing, t, tOne + 0.8, at('basement'), RX, 440, 0.45);
      fadeWin(pNeg, t, at('basement') + 0.1, at('small') + 0.05);
      op(neg100, P(t, mid('basement', 0.62), 0.3, linear));
      const smallOn = t >= tW2 + 1.4 && t < at('columns');
      wSmall.show(0, smallOn ? P(t, tB1, 0.35, linear) : 0);
      wSmall.show(1, smallOn ? P(t, tB2, 0.35, linear) : 0);
      popSet(cSmall, t, tB3, at('columns'), RX, 400);
      popSet(cCols, t, mid('columns', 0.08), 1e9, RX, 180);
      op(colA, P(t, mid('columns', 0.62), 0.3, linear));
      op(colB, P(t, mid('columns', 0.8), 0.3, linear));

      // the speaker pops in, small, at the lower right
      const popWho = { index: 'idx', boy: 'boy', priya: 'priya', kavya: 'kavya' };
      const ln = ['columns', 'small', 'basement', 'one', 'zero', 'down'].find(id => t >= at(id) - 0.25 && t < at(id) + (end(id) - at(id)) + 0.45);
      const lnWho = ln ? { down: 'index', zero: 'boy', one: 'index', basement: 'priya', small: 'index', columns: 'kavya' }[ln] : null;
      if (lnWho) {
        const c = lnWho === 'index' ? idx : H[lnWho];
        show[popWho[lnWho]] = 1;
        const p = P(t, at(ln) - 0.25, 0.35, pop);
        const base = lnWho === 'index' ? [1060, 620, 0.95] : lnWho === 'boy' ? [1060, 640, 0.8] : [1060, 630, 0.72];
        tr(c, base[0], base[1] + 160 * (1 - clamp(p)), base[2]);
        if (lnWho === 'index') c.set({ t, talk: scTalk(S, t, 'index'), mood: ln === 'down' ? 'smug' : 'annoyed', look: -0.6, val: ln === 'down' ? '3' : ln === 'one' ? '0' : '−1', point: ln === 'down' ? 1 : 0 });
        else c.set({ t, talk: scTalk(S, t, lnWho), mood: lnWho === 'boy' ? 'happy' : lnWho === 'priya' ? 'smug' : 'happy', look: -0.6, lift: lnWho === 'boy' ? 1 : 0 });
      }
    }

    /* characters not in this shot */
    op(ten, show.ten); op(idx, show.idx);
    for (const k of ['kavya', 'mum', 'dad', 'boy', 'priya', 'tan']) op(H[k], show[k]);
  };
});
