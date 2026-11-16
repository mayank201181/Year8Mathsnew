/* Scene 3: The drone that bent (plotting straight lines).
   11 a.m., the park. Priya's drone will fly along y = 3x + 2 -> her table of values has a slip (6 at x = 1) -> cut to
   the sky: the drone follows the points, bends at (0, 2) into the coconut tree at (1, 6); a coconut drops; Lionel
   pops up appalled (OFF THE LINE) -> back at the table: differences +3, +3, +4, +2 -> 3 x 1 + 2 = 5, all +3 ->
   brackets for the negative: 3 x (-2) + 2 = -4 -> Lionel: table, substitute, plot, one ruled straight line (a ruler
   slides along and the line draws) -> Ah Boy's dot-to-dot zigzag in the sand -> Mr Tan, lap two: (-3, -7) is ON THE
   LINE; (4, 15) is just above it (OFF THE LINE) -> fixed table, relaunch: the drone flies the straight line ... and
   lands on Dad's sandwich. */
scene('plot', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);          // hard sitcom cut
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 3, color: o.color || C.ink, weight: 700 }); };
  const winP = (t, a, b, d) => (t >= a && t < b ? P(t, a, d || 0.3, linear) : 0);
  const GOLD = '#FFE45C', INK = MK.ink, GREEN = '#1E9E5A', RED = '#D32F2F', BLUE = '#1E5AAC', AMBER = '#C77A0A', ORANGE = '#E8751A';

  /* layers */
  const Lset = G(root), Lsky = G(root), Lcast = G(root), Lfront = G(root), Lcard = G(root), Lguest = G(root), Lfront2 = G(root), Lhud = G(root);

  const park = lgPark(Lset, { sky: 'day' });
  Lfront.appendChild(park.front);

  /* ================= G: the plan (graph card right, notes card left) ================= */
  const shotG = G(Lcard);
  // the graph card
  E('rect', { x: 646, y: 111, width: 524, height: 576, rx: 18, fill: 'rgba(0,0,0,0.22)' }, shotG);
  E('rect', { x: 640, y: 105, width: 524, height: 576, rx: 18, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, shotG);
  const axG = G(shotG); tr(axG, 705, 175);
  const ax = mkAxes(axG, { xmin: -4, xmax: 5, ymin: -8, ymax: 16, unit: 44, unitY: 20, ink: MK.ink, size: 26, labelStep: 2, halo: MK.paper });
  const X = x => 705 + ax.px(x), Y = y => 175 + ax.py(y);
  mkMath(shotG, 664, 156, 'y = 3x + 2', { size: 38, fill: '#B8336A', weight: 700 });
  const plotL = G(shotG);
  const ptG = (x, y, col, r) => { const g = G(plotL); tr(g, X(x), Y(y)); const inner = G(g); E('circle', { r: r || 9, fill: col, stroke: '#FFFFFF', 'stroke-width': 3 }, inner); g.set = p => mkPopIn(g, p); g.set(0); return g; };
  const TRUE = [[-2, -4], [-1, -1], [0, 2], [1, 5], [2, 8]], WRONG = [[-2, -4], [-1, -1], [0, 2], [1, 6], [2, 8]];
  const pts = WRONG.map(([x, y]) => ptG(x, y, '#2E7DD8'));
  const pt6 = pts[3];
  const bentPath = E('path', { d: 'M' + WRONG.map(([x, y]) => `${X(x)},${Y(y)}`).join(' L'), fill: 'none', stroke: RED, 'stroke-width': 4, 'stroke-dasharray': '10 7', 'stroke-linejoin': 'round' }, plotL);
  const ln = ax.line(3, 2, { col: '#C77A0A', width: 6 });
  // the ruler sliding along the line
  const ANG = Math.atan2(-(3 * 20), 44) * 180 / Math.PI;          // screen angle of y = 3x + 2
  const ruler = G(plotL);
  const rIn = G(ruler);
  E('rect', { x: -170, y: 8, width: 340, height: 34, rx: 5, fill: '#F6D365', stroke: '#B08A2A', 'stroke-width': 3, opacity: 0.92 }, rIn);
  { let d = ''; for (let k = -16; k <= 16; k++) d += `M${k * 10},8 L${k * 10},${k % 5 === 0 ? 22 : 15} `; E('path', { d, stroke: INK, 'stroke-width': 1.6 }, rIn); }
  // Mr Tan's points
  const pChk = ptG(-3, -7, GREEN, 10), pOff = ptG(4, 15, RED, 10), p14 = ptG(4, 14, '#C77A0A', 7);
  const lChk = mkText(plotL, X(-3) - 18, Y(-7) + 10, '{{(−3, −7)}}', { size: 28, fill: GREEN, halo: MK.paper, anchor: 'end' });
  const lOff = mkText(plotL, X(4) - 18, Y(15) + 8, '{{(4, 15)}}', { size: 28, fill: RED, halo: MK.paper, anchor: 'end' });
  const l14 = mkText(plotL, X(4) - 18, Y(14) + 30, '{{(4, 14)}}', { size: 26, fill: AMBER, halo: MK.paper, anchor: 'end' });
  const gapB = E('path', { d: `M${X(4) + 16},${Y(15)} L${X(4) + 22},${Y(15)} L${X(4) + 22},${Y(14)} L${X(4) + 16},${Y(14)}`, fill: 'none', stroke: RED, 'stroke-width': 3 }, plotL);
  const lAbove = mkText(plotL, X(4) + 30, Y(14.5) + 9, 'above', { size: 26, fill: RED, halo: MK.paper });

  // the notes card (left)
  const notes = G(shotG);
  E('rect', { x: 42, y: 118, width: 584, height: 322, rx: 18, fill: 'rgba(0,0,0,0.22)' }, notes);
  E('rect', { x: 36, y: 112, width: 584, height: 322, rx: 18, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, notes);
  const TX = 58, TY = 126, CW0 = 80, CW = 94, RH = 56;
  const cellX = j => TX + CW0 + CW * (j - 1) + CW / 2;   // j = 1..5
  const tbl = mkTable(notes, [['x', '−2', '−1', '0', '1', '2'], ['y', '', '', '', '', '']], { colW: [CW0, CW, CW, CW, CW, CW], rowH: RH, size: 30, ink: INK, side: true, headFill: 'rgba(46,125,216,0.16)' });
  tr(tbl, TX, TY);
  const yv = ['−4', '−1', '2', '6', '8'];
  const yCells = yv.map((v, i) => mkText(notes, cellX(i + 1), TY + RH * 1.5 + 11, v, { size: 30, anchor: 'middle', fill: INK, weight: 700 }));
  const y5 = mkText(notes, cellX(4), TY + RH * 1.5 + 11, '5', { size: 32, anchor: 'middle', fill: GREEN, weight: 800 });
  const strike6 = E('line', { x1: cellX(4) - 18, y1: TY + RH * 1.5 + 14, x2: cellX(4) + 18, y2: TY + RH * 1.5 - 14, stroke: RED, 'stroke-width': 5, 'stroke-linecap': 'round' }, notes);
  const rowHL = E('rect', { x: TX + CW0 + 3, y: TY + RH + 3, width: CW * 5 - 6, height: RH - 6, rx: 8, fill: 'rgba(86,214,155,0.3)', stroke: GREEN, 'stroke-width': 3 }, notes);
  // differences
  const DY = TY + RH * 2;
  const diffs = [0, 1, 2, 3].map(i => {
    const g = G(notes), x1 = cellX(i + 1) + 8, x2 = cellX(i + 2) - 8;
    E('path', { d: `M${x1},${DY + 6} Q${(x1 + x2) / 2},${DY + 30} ${x2},${DY + 6}`, fill: 'none', stroke: '#5A6670', 'stroke-width': 3 }, g);
    E('path', { d: `M${x2},${DY + 6} l-12,2 M${x2},${DY + 6} l-4,11`, fill: 'none', stroke: '#5A6670', 'stroke-width': 3, 'stroke-linecap': 'round' }, g);
    g.bad = mkText(g, (x1 + x2) / 2, DY + 60, i === 2 ? '+4' : i === 3 ? '+2' : '+3', { size: 30, anchor: 'middle', fill: i >= 2 ? RED : INK, weight: 800 });
    g.good = mkText(g, (x1 + x2) / 2, DY + 60, '+3', { size: 30, anchor: 'middle', fill: GREEN, weight: 800 });
    return g;
  });
  const W1 = 352, W2 = 408, NX = 328;
  const wFix = mkMath(notes, NX, W1 + 6, 'x = 1:  3 × 1 + 2 = 5', { size: 36, anchor: 'middle', fill: INK });
  const fixNote = mkText(notes, NX, W2 + 6, 'each step of 1 in {{x}} adds **3**', { size: 30, anchor: 'middle', fill: INK, boldFill: GREEN });
  // brackets
  const brSrc = 'y = 3 × (−2) + 2 = −6 + 2 = −4';
  const wBr = mkMath(notes, NX, W1 + 34, brSrc, { size: 34, anchor: 'middle', fill: INK });
  const preW = mkMeasure('y = 3 × ', { size: 34 }).w, brW = mkMeasure('(−2)', { size: 34 }).w;
  const brHL = E('rect', { x: NX - wBr.w / 2 + preW - 6, y: W1 + 34 - 32, width: brW + 12, height: 44, rx: 8, fill: 'rgba(255,228,92,0.6)', stroke: '#E2B33C', 'stroke-width': 3 }, notes);
  notes.insertBefore(brHL, wBr);
  const brNote = mkText(notes, NX, W1 - 18, '**brackets** protect the negative', { size: 30, anchor: 'middle', fill: INK, boldFill: AMBER });
  // method: four steps
  const steps = [['1  Table', 150, W1 - 8], ['2  Substitute', 360, W1 - 8], ['3  Plot', 530, W1 - 8], ['4  **one ruled straight line**', NX, W2 + 2]].map(([s, x, y], i) => {
    const c = mkChip(notes, s, { size: i === 3 ? 30 : 28, col: i === 3 ? '#C77A0A' : BLUE, fill: i === 3 ? '#FFF3D6' : '#EAF2FC', textCol: INK }); c.x = x; c.y = y; return c;
  });
  // Ah Boy's sand drawing
  const sand = G(notes);
  E('rect', { x: 70, y: 300, width: 516, height: 124, rx: 30, fill: '#F2DFAE', stroke: '#D9BE82', 'stroke-width': 4 }, sand);
  const sp = [[120, 400], [210, 365], [300, 392], [390, 330], [470, 352], [550, 316]];
  E('path', { d: 'M' + sp.map(([x, y], i) => `${x + (i % 2 ? 4 : -3)},${y + (i % 2 ? -3 : 4)}`).join(' Q') .replace(/Q/g, ' L'), fill: 'none', stroke: '#8B5A2B', 'stroke-width': 5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, sand);
  sp.forEach(([x, y]) => E('circle', { cx: x, cy: y, r: 7, fill: '#6B4423' }, sand));
  mkText(sand, 82, 330, 'dot-to-dot', { size: 26, fill: '#8B5A2B' });
  const zzX = cross(notes, 34, RED); tr(zzX, 328, 362);
  const zzChip = mkChip(notes, '**one** line, with a **ruler**', { size: 30, col: '#C77A0A', fill: '#FFF3D6', textCol: INK });
  // Mr Tan's checks
  const wChk = mkMath(notes, NX, W1, '3 × (−3) + 2 = −7', { size: 38, anchor: 'middle', fill: INK });
  const chkTick = tick(notes, 18, GREEN); tr(chkTick, NX + wChk.w / 2 + 26, W1 - 12);
  const wOff = mkMath(notes, NX, W1, '3 × 4 + 2 = 14 != 15', { size: 38, anchor: 'middle', fill: INK });
  const stOn = lgStamp(notes, true), stOff2 = lgStamp(notes, false);
  const wAgain = mkText(notes, NX, W1 + 20, 'fixed: **straight**, all steps **+3**', { size: 32, anchor: 'middle', fill: INK, boldFill: GREEN });

  /* ================= S: the sky (the drone bends into a coconut tree) ================= */
  const shotS = G(Lsky);
  const SX = x => 200 + (x + 2) * 200, SY = y => 480 - (y + 4) * 36;
  const tree = lgTree(shotS, 1.2); tr(tree, 769, 478, 1.2);
  const trail = E('path', { d: 'M' + WRONG.slice(0, 4).map(([x, y]) => `${SX(x)},${SY(y)}`).join(' L'), fill: 'none', stroke: '#FFFFFF', 'stroke-width': 7, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-dasharray': '2 14' }, shotS);
  const ghost = E('path', { d: `M${SX(0)},${SY(2)} L${SX(1.4)},${SY(6.2)}`, fill: 'none', stroke: '#56D69B', 'stroke-width': 6, 'stroke-dasharray': '14 10', 'stroke-linecap': 'round' }, shotS);
  const sDots = WRONG.slice(0, 4).map(([x, y], i) => { const d = E('circle', { cx: SX(x), cy: SY(y), r: 10, fill: i === 3 ? '#FF6070' : '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, shotS); return d; });
  const sLab = mkChip(shotS, '{{(1, 6)}}?!', { size: 30, col: '#FF6070' });
  const coconut = E('circle', { r: 16, fill: '#7A5A2A', stroke: SC_INK, 'stroke-width': 3 }, shotS);
  const stBent = lgStamp(shotS, false);
  const bendChip = mkChip(shotS, 'a straight line **never bends**', { size: 32, col: '#FFB020' });

  /* ================= the cast ================= */
  const kav = cast(Lcast, 'kavya'), priya = cast(Lcast, 'priya'), boy = cast(Lcast, 'boy'), tan = cast(Lcast, 'tan');
  const dad = cast(Lcast, 'dad', { prop: null, hand: true });
  const sw = G(Lfront2), swIn = G(sw); lgSandwich(swIn, 1.05);
  const lio = cast(Lguest, 'lionel', { len: 340 }), ex = cast(Lguest, 'ex');
  const lioS = cast(Lfront2, 'lionel');
  const drone = lgDrone(Lhud, { s: 0.42 });
  const cEleven = pill(Lhud, '11 a.m.', { size: 32, color: GOLD, stroke: GOLD });
  const phone = lgPhone(Lhud, { s: 0.32 });
  const cLap = mkChip(Lhud, 'LAP 2', { size: 32, col: '#4FB6E8', solid: true });
  const fade = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cut points */
  const cS = end('table') - 0.45, cG2 = at('diff') - 0.06;
  const HY = 586, PX = 98, KX = 232, DX = 366, BX = 500, TXN = 500;

  return t => {
    const who = scWho(S, t);
    op(fade, 1 - P(t, at('eleven') - 0.3, 0.3, linear));
    park.upd(t); tree.upd(t);
    const sS = on(t, cS, cG2), sG = 1 - sS;
    op(shotG, sG); op(shotS, sS); op(Lguest, sG);

    popIn(cEleven, t, at('eleven') + 0.1, 626, 58);
    op(phone, P(t, at('eleven') + 0.3, 0.3, linear)); tr(phone, 706, 58); phone.set(70);

    /* ---------- G ---------- */
    if (sG) {
      const gp = P(t, mid('eleven', 0.3), 0.4, easeOut);
      op(shotG, gp); tr(shotG, 0, 20 * (1 - gp));
      // table of values
      const fixedOn = t >= mid('fix', 0.55);
      yCells.forEach((c, i) => {
        let v = P(t, mid('table', 0.32 + i * 0.1), 0.25, linear);
        if (i === 3 && t >= mid('fix', 0.75)) v = 1 - P(t, mid('fix', 0.75), 0.25, linear);
        op(c, v);
        if (i === 3) c.setAttribute('fill', t >= at('diff') && !fixedOn ? RED : INK);
      });
      op(strike6, fixedOn ? 1 - P(t, mid('fix', 0.75), 0.25, linear) : 0); op(y5, t >= mid('fix', 0.75) ? P(t, mid('fix', 0.8), 0.3, linear) : 0);
      if (t > at('again')) { op(yCells[3], 0); op(strike6, 0); }
      op(rowHL, t >= at('again') ? P(t, at('again') + 0.1, 0.3, linear) * (0.6 + 0.4 * Math.sin(t * 5)) : 0);
      // points on the graph
      pts.forEach((p, i) => p.set(P(t, mid('table', 0.32 + i * 0.1), 0.35, linear)));
      tr(pt6, X(1), Y(lerp(6, 5, P(t, mid('fix', 0.55), 0.5, ease))));
      op(bentPath, t >= at('diff') && t < mid('fix', 0.6) ? P(t, at('diff') + 0.1, 0.3, linear) : 0);
      // differences
      diffs.forEach((d, i) => {
        op(d, t >= at('diff') && t < at('sand') ? P(t, mid('diff', 0.1 + i * 0.12), 0.3, linear) : 0);
        const good = i < 2 || t >= mid('fix', 0.75);
        op(d.bad, good ? 0 : 1); op(d.good, good ? 1 : 0);
        if (i < 2) op(d.bad, 0);
      });
      op(wFix, winP(t, mid('fix', 0.35), at('brackets'))); op(fixNote, winP(t, at('fix') + 0.1, at('brackets')));
      // brackets
      op(wBr, winP(t, mid('brackets', 0.2), at('method'))); op(brNote, winP(t, at('brackets') + 0.1, at('method')));
      op(brHL, winP(t, mid('brackets', 0.25), at('method')) * (0.7 + 0.3 * Math.sin(t * 6)));
      // method: four steps, the ruler, the line
      steps.forEach((c, i) => { c.set(winP(t, mid('method', [0.02, 0.14, 0.28, 0.45][i]), at('sand'))); tr(c, c.x, c.y); });
      const rs = P(t, mid('method', 0.5), 1.6, ease);
      op(ruler, t >= mid('method', 0.45) && t < at('sand') ? 1 : 0);
      const [e0, e1] = ln.ends, rx = lerp(e0[0] + 2.3, e1[0] - 2.3, rs), ry = 3 * rx + 2;
      tr(ruler, X(rx), Y(ry), 1, ANG); tr(rIn, 0, 0);
      ln.set(t >= mid('method', 0.5) ? rs : 0);
      // Ah Boy's sand, Lionel's verdict
      op(sand, winP(t, at('sand') + 0.05, at('check')));
      op(zzX, t >= at('zigzag') && t < at('check') ? P(t, mid('zigzag', 0.3), 0.25, linear) : 0);
      zzChip.set(winP(t, mid('zigzag', 0.55), at('check'))); tr(zzChip, 328, 274);
      // Mr Tan: lap two
      pChk.set(t >= at('check') ? P(t, mid('check', 0.35), 0.4, linear) : 0);
      op(lChk, t >= at('check') ? P(t, mid('check', 0.38), 0.3, linear) : 0);
      op(wChk, winP(t, mid('check', 0.45), at('off'))); op(chkTick, winP(t, mid('check', 0.88), at('off')));
      stOn.set(t >= at('check') && t < at('off') ? P(t, mid('check', 0.9), 0.35, linear) : 0); tr(stOn, 328, W2 - 8, 0.55);
      pOff.set(t >= at('off') ? P(t, mid('off', 0.1), 0.4, linear) : 0); op(lOff, t >= at('off') ? P(t, mid('off', 0.12), 0.3, linear) : 0);
      p14.set(t >= at('off') ? P(t, mid('off', 0.5), 0.4, linear) : 0); op(l14, t >= at('off') ? P(t, mid('off', 0.5), 0.3, linear) : 0);
      op(gapB, t >= at('off') ? P(t, mid('off', 0.75), 0.3, linear) : 0); op(lAbove, t >= at('off') ? P(t, mid('off', 0.78), 0.3, linear) : 0);
      op(wOff, winP(t, mid('off', 0.2), at('again')));
      stOff2.set(t >= at('off') && t < at('again') ? P(t, mid('off', 0.82), 0.35, linear) : 0); tr(stOff2, 328, W2 - 8, 0.55);
      op(wAgain, t >= at('again') ? P(t, mid('again', 0.5), 0.3, linear) : 0);
      cLap.set(t >= at('check') - 0.2 && t < at('again') ? P(t, at('check'), 0.4, linear) : 0); tr(cLap, 560, 470);
    }

    /* ---------- S: the bend ---------- */
    if (sS) {
      const fly = P(t, cS + 0.35, at('bent') + 0.9 - cS - 0.35, linear);
      const k = fly * 3, seg = Math.min(2, Math.floor(k)), f = k - seg;
      const [x0, y0] = WRONG[seg], [x1, y1] = WRONG[seg + 1];
      const fx = fly >= 1 ? 1 : lerp(x0, x1, f), fy = fly >= 1 ? 6 : lerp(y0, y1, f);
      // the trail grows behind the drone
      trail.setAttribute('d', 'M' + WRONG.slice(0, seg + 1).map(([x, y]) => `${SX(x)},${SY(y)}`).join(' L') + ` L${SX(fx).toFixed(1)},${SY(fy).toFixed(1)}`);
      sDots.forEach((d, i) => op(d, k >= i - 0.02 ? 1 : 0));
      op(ghost, P(t, mid('bent', 0.45), 0.3, linear));
      sLab.set(P(t, at('bent') + 0.95, 0.3, linear)); tr(sLab, SX(1) + 120, SY(6) + 40);
      const crash = P(t, at('bent') + 0.9, 0.25, linear);
      const drop = P(t, at('bent') + 1.0, 0.7, easeIn);
      op(coconut, crash > 0 ? 1 : 0); attr(coconut, 'cx', SX(1) - 24); attr(coconut, 'cy', lerp(SY(6) + 30, 465, drop) - (drop >= 1 ? Math.abs(Math.sin((t - at('bent') - 1.7) * 9)) * 18 * Math.max(0, 1 - (t - at('bent') - 1.7) * 2) : 0));
      stBent.set(P(t, mid('bent', 0.75), 0.35, linear)); tr(stBent, 330, 170, 0.45);
      bendChip.set(P(t, mid('bent', 0.55), 0.35, linear)); tr(bendChip, 330, 250);
      op(drone, 1);
      const wob = crash > 0 ? Math.sin(t * 30) * 10 * (1 - crash) + 28 : 0;
      tr(drone, SX(fx), SY(fy) - 4, 1, wob);
      drone.set(t, crash < 1);
      // Lionel pops up, appalled
      const lp = P(t, at('bent') - 0.1, 0.45, pop);
      op(lioS, lp > 0.01 ? 1 : 0);
      tr(lioS, 560, lerp(820, 600, lp), 0.62);
      lioS.set({ t, talk: scTalk(S, t, 'lionel'), mood: 'shock', look: 0.6, sweat: 0.7, tilt: Math.sin(t * 18) * 3 * AMP });
    } else op(lioS, 0);

    /* ---------- the drone in shot G ---------- */
    if (sG) {
      let dxp = 170, dyp = 452, dr = 0, dOn = false;
      if (t < cS) {
        const up = P(t, mid('table', 0.88), 0.6, easeIn);
        dyp = lerp(452, -80, up); dOn = t > mid('table', 0.8);
        op(drone, t > mid('eleven', 0.4) ? 1 : 0);
      } else if (t < at('again')) op(drone, 0);
      else {
        op(drone, 1); dOn = true;
        const [e0, e1] = ln.ends;
        const a = P(t, mid('again', 0.2), 2.4, ease), b = P(t, at('sandwich') - 0.1, 1.2, ease);
        const ex0 = e0[0], ex1 = 2;
        const gx = lerp(ex0, ex1, a), gy = 3 * gx + 2;
        dxp = X(gx); dyp = Y(gy) - 18;
        if (t < mid('again', 0.2)) { dxp = X(ex0); dyp = lerp(-80, Y(3 * ex0 + 2) - 18, P(t, at('again'), mid('again', 0.2) - at('again'), easeOut)); }
        // ... and down onto Dad's sandwich
        const sx = DX - 92, sy = 594 + 22 * P(t, at('sandwich') + 0.55, 0.25, easeOut);
        dxp = lerp(dxp, sx, b); dyp = lerp(dyp, sy - 34, b) - Math.sin(b * Math.PI) * 120;
        dr = b > 0.95 ? 8 : 0; dOn = b < 0.95;
      }
      tr(drone, dxp, dyp - (dOn ? 3 * Math.sin(t * 6) * AMP : 0), 1, dr);
      drone.set(t, dOn);
    }

    /* ---------- the cast ---------- */
    [kav, priya, boy, tan, dad].forEach(c => op(c, 0)); op(lio, 0); op(ex, 0);
    if (sG) {
      op(priya, 1); tr(priya, PX, HY, 0.8);
      let pm = 'smug';
      if (t >= at('diff') && t < at('method')) pm = 'annoyed';
      else if (t >= at('again')) pm = t > at('sandwich') ? 'shock' : 'happy';
      priya.set({ t, talk: scTalk(S, t, 'priya'), mood: pm, look: who === 'priya' ? 0.7 : who === 'boy' ? 0.9 : 1, lift: (t > at('table') && t < cS) || (t > at('again') && t < at('sandwich')) ? 1 : 0 });
      op(kav, 1); tr(kav, KX, HY, 0.8);
      let km = 'neutral', kl = 1;
      if (who === 'kavya') { km = 'happy'; kl = 1; }
      else if (t < at('table')) km = 'happy';
      else if (t < cS) { km = 'neutral'; kl = -0.8; }
      else if (t >= at('sand') && t < at('check')) { km = 'deadpan'; kl = 0.8; }
      else if (t >= at('sandwich')) { km = 'deadpan'; kl = 0.8; }
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
      op(dad, 1); tr(dad, DX, HY, 0.8);
      const squash = P(t, at('sandwich') + 0.55, 0.25, easeOut);
      tr(sw, DX - 92, 588); tr(swIn, 0, 26 * squash, `${(1 + 0.25 * squash).toFixed(3)} ${(1 - 0.55 * squash).toFixed(3)}`);
      op(sw, t >= mid('again', 0.4) ? 1 : 0);
      dad.set({ t, talk: scTalk(S, t, 'dad'), mood: t >= at('sandwich') ? (t > mid('sandwich', 0.3) ? 'sad' : 'shock') : t >= at('again') ? 'happy' : 'neutral', look: t >= at('sandwich') ? -0.3 : who === 'priya' ? -1 : 1, lift: t >= mid('again', 0.4) ? 1 : 0 });
      // Ah Boy; Mr Tan jogs out from behind the graph and takes his place for lap two
      const tanIn = P(t, at('check') - 0.4, 0.6, easeOut) * (1 - P(t, end('off') + 0.3, 0.6, easeIn));
      const boyOut = clamp(tanIn * 3);
      op(boy, boyOut < 0.98 ? 1 : 0); tr(boy, BX, HY + 6 + 230 * boyOut, 0.8);
      let bm = 'happy', bl = 0.9, blift = 0;
      if (t >= at('sand') && t < at('zigzag')) { blift = 1; bl = 1; }
      else if (t >= at('zigzag') && t < at('check')) { bm = t > mid('zigzag', 0.5) ? 'sad' : 'happy'; bl = 1; }
      else if (t >= at('sandwich')) { bm = 'happy'; bl = -1; }
      else if (who === 'kavya' || who === 'priya') bl = -1;
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: bm, look: bl, lift: blift });
      if (tanIn > 0.01) {
        op(tan, 1);
        tr(tan, lerp(820, TXN, tanIn), HY - 4 - Math.abs(Math.sin(t * 9)) * 9 * AMP, 0.8);
        tan.set({ t, talk: scTalk(S, t, 'tan'), mood: t >= at('off') && t > mid('off', 0.7) ? 'smug' : 'happy', look: 1, sweat: 0.55, lift: who === 'tan' ? 1 : 0, still: true });
      }
      // guests on the empty corner of the graph paper
      const exIn = winP(t, at('brackets') - 0.15, at('method') - 0.1, 0.3);
      if (exIn > 0) { op(ex, 1); tr(ex, 790, 300, 0.45 * (0.6 + 0.4 * exIn)); ex.set({ t, talk: scTalk(S, t, 'ex'), mood: 'smug', look: -0.8 }); }
      const lIn = winP(t, at('method') - 0.15, at('check') - 0.1, 0.3);
      if (lIn > 0) {
        op(lio, 1); tr(lio, 790, 300, 0.48 * (0.6 + 0.4 * lIn));
        let lm = 'smug', tilt = 0;
        if (t < at('sand')) { lm = t > mid('method', 0.5) ? 'happy' : 'smug'; tilt = 20 * P(t, mid('method', 0.5), 0.6, pop); }
        else if (t < at('zigzag')) { lm = 'shock'; tilt = 0; }
        else { lm = 'annoyed'; tilt = 0; }
        lio.set({ t, talk: scTalk(S, t, 'lionel'), mood: lm, look: t >= at('sand') ? -1 : -0.6, tilt });
      }
    }
    if (sS) {
      op(priya, 1); tr(priya, 140, 600, 0.85);
      priya.set({ t, talk: scTalk(S, t, 'priya'), mood: t > at('bent') + 0.9 ? 'annoyed' : 'happy', look: 1, lift: 1 });
      op(dad, 1); tr(dad, 960, 600, 0.85); op(sw, 0);
      dad.set({ t, mood: t > at('bent') + 0.9 ? 'shock' : 'happy', look: -0.6, lift: 0 });
      op(kav, 1); tr(kav, 1090, 600, 0.85);
      kav.set({ t, mood: t > at('bent') + 0.9 ? 'deadpan' : 'neutral', look: -0.8 });
    }
  };
});
