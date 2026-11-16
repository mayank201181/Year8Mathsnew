/* Scene 3: Photo finish (rounding to decimal places).
   Shots (hard sitcom cuts):
   W  eleven   trackside: hurdles, the scoreboard top right; Priya (full body) clears the hurdles; Dad pops up with his
               stopwatch; the big stopwatch reads 10.4973, "4 d.p.: ten-thousandths".
      time     Dad: the scoreboard shows only "10.__" (2 d.p.), ringed; Priya (bust) smug.
   B  chop     the judges' board: 10.4973 big; Priya karate-chops the 73 off: 10.49; TWEET! from the Decider.
   C  ref      the Decider's confessional (lower third): one big eye; card 10.4973 with the 7 spotlit; "one digit only".
   B  cut      cut bar between 10.49 and 73; the 7 ringed: "decider".
      rule     "Five or more? Raise the score. / Four or less? Let it rest."; UP flag; 10.49|73 -> 10.50.
      line     Kavya: number line 10.49 ... 10.50 in thousandths, halfway 10.495, Priya's 10.4973 past it, hop to 10.50.
      short    Priya writes 10.5 (red); TWEET!
      zero     10.50 with the last 0 ringed: "2 d.p. = two digits after the point"; 10.5 struck; "That zero is evidence."
      drill    7.0649 to the nearest whole, 1, 2 and 3 d.p.: each row's cut bar, decider ring and answer.
   P  jump     the long-jump pit: sign KAVYA 2.996 m, 2.99|6, "9 + 1 = 10 ?!"; Dad confused, Kavya worried.
   B  roll     SHOWPIECE: odometers roll 199 -> 200 and 2.99 -> 3.00 (the 9s roll to 0s one after another, the carry
               ticks the next digit); UP flag; POINT TAKEN; Kavya holds up her "3.00 m" certificate.
      stages   Priya: 1.2349 -> 1.235 -> 1.24 ("3 d.p.", "2 d.p.").
      foul     TWEET!, red card DOUBLE ROUNDING; the chain struck out; 1.23|49, decider 4 -> 1.23; "round the original once".
      stole    10.5000 − 10.4973 = 0.0027 in columns; "twenty-seven ten-thousandths"; Priya annoyed. Hold. */
scene('photo', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const popSet = (el, t, t0, t1, x, y) => { const p = t >= t0 && t < t1 ? P(t, t0, 0.35, linear) : 0; el.set(p); if (x !== undefined) tr(el, x, y); };
  const fin = (t, t0, d) => P(t, t0, d || 0.3, linear);
  const GOLD = '#FFE45C', RED = '#D32F2F', GREEN = '#1E9E5A', BLUE = '#1E5FC0', INK = MK.ink, GREY = '#A3AEB8', AMBER = DR_LED;
  /* a row of big digits we can cut and ring: x is the centre, y the baseline */
  const digRow = (parent, str, cx, y, size, col) => {
    const g = G(parent), cw = size * 0.7, pw = size * 0.34, ch = [...str];
    const ws = ch.map(c => (c === '.' ? pw : cw)), W0 = ws.reduce((a, b) => a + b, 0);
    let x = cx - W0 / 2;
    g.xs = []; g.el = [];
    ch.forEach((c, i) => {
      const xc = x + ws[i] / 2; g.xs.push(xc);
      g.el.push(c === '.' ? E('circle', { cx: xc, cy: y - size * 0.07, r: size * 0.075, fill: col }, g) : T(g, xc, y, c, { size, weight: 700, anchor: 'middle', fill: col }));
      x += ws[i];
    });
    g.edge = i => (i <= 0 ? cx - W0 / 2 : i >= ch.length ? cx + W0 / 2 : g.xs[i - 1] + ws[i - 1] / 2);
    g.W = W0; g.y = y; g.size = size; g.cx = cx;
    g.tint = (i, c) => { const e = g.el[i]; if (e.tagName === 'circle') attr(e, 'fill', c); else attr(e, 'fill', c); };
    return g;
  };
  const cutBar = (parent, row, k, col) => mkDash(E('line', { x1: row.edge(k), y1: row.y - row.size * 0.92, x2: row.edge(k), y2: row.y + row.size * 0.2, stroke: col || RED, 'stroke-width': Math.max(5, row.size * 0.07), 'stroke-linecap': 'round' }, parent));
  const ringAt = (parent, row, k, col) => mkDash(E('ellipse', { cx: row.xs[k], cy: row.y - row.size * 0.36, rx: row.size * 0.34, ry: row.size * 0.52, fill: 'none', stroke: col || RED, 'stroke-width': Math.max(4, row.size * 0.06) }, parent));

  /* layers */
  const Lset = G(root), Lw = G(root), Lp = G(root), Lb = G(root), Lcast = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= the trackside set (W, B, P share it) ================= */
  const track = scTrack(Lset);
  const dim = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#0B1A28', opacity: 0.32 }, Lset);

  /* ================= W: hurdles, the scoreboard ================= */
  const HX = [330, 700, 1040], LANE = 640;
  const hurdle = (parent, x) => {
    const g = G(parent); tr(g, x, LANE);
    E('path', { d: 'M-40,0 L-40,-96 M40,0 L40,-96', stroke: '#5A6670', 'stroke-width': 6 }, g);
    E('path', { d: 'M-52,0 L-28,0 M28,0 L52,0', stroke: '#5A6670', 'stroke-width': 6, 'stroke-linecap': 'round' }, g);
    E('rect', { x: -50, y: -104, width: 100, height: 20, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
    E('path', { d: 'M-30,-104 l12,0 l0,20 l-12,0 Z M2,-104 l12,0 l0,20 l-12,0 Z M34,-104 l12,0 l0,20 l-12,0 Z', fill: SC_INK }, g);
    return g;
  };
  HX.forEach(x => hurdle(Lw, x));
  const sbG = G(Lw); tr(sbG, 900, 200, 0.5);
  const board = drScoreboard(sbG, { title: 'HURDLES', rows: [['PRIYA', '10__', 2, 's']], size: 64 });
  const sbRing = E('rect', { x: 900 + 0.5 * (board.ptXY(0, 0, 4)[0] - 30), y: 200 + 0.5 * (board.rowsEl[0].y - 64), width: 0.5 * (board.cw * 4 + 60), height: 0.5 * 84, rx: 10, fill: 'none', stroke: RED, 'stroke-width': 5 }, Lw);
  const c11 = mkChip(Lfg, '**11 a.m.** · HURDLES', { size: 32, col: GOLD });
  const bigWatch = drStopwatch(Lw, { text: '10.4973', s: 1.6 }); bigWatch.set(''); bigWatch.set('10.4973');
  const c4dp = mkChip(Lfg, '**4** d.p.: ten-thousandths', { size: 30, col: '#9CC8FF' });
  const c2dp = mkChip(Lfg, 'scoreboard: **2** decimal places', { size: 30, col: '#FF8A8A' });
  const priyaRun = cast(Lw, 'priya', { body: true, bottoms: 'shorts', bottomCol: '#1E2A44', shoes: '#F4F7FA' });

  /* ================= C: the Decider's confessional ================= */
  const conf = drConf(Lset, 'ref');
  const cCard = G(Lfg);
  E('rect', { x: -270, y: -140, width: 540, height: 250, rx: 22, fill: 'rgba(10,15,20,0.92)', stroke: '#C9D3DC', 'stroke-width': 4 }, cCard);
  const cRow = digRow(cCard, '10.4973', 0, 40, 100, '#5A6670');
  const cSpot = E('circle', { cx: cRow.xs[5], cy: 40 - 36, r: 58, fill: glow('#FFE45C'), opacity: 0.55 }, cCard);
  cCard.insertBefore(cSpot, cRow);
  const cOne = mkChip(Lfg, 'one digit **only**', { size: 34, col: GOLD });

  /* ================= P: the long-jump pit ================= */
  const pit = G(Lp);
  E('rect', { x: 370, y: 520, width: 860, height: 200, rx: 18, fill: '#E9C987', stroke: '#B08A4A', 'stroke-width': 6 }, pit);
  const rs = rng(5); let sd = '';
  for (let i = 0; i < 70; i++) sd += `M${(390 + rs() * 820).toFixed(0)},${(540 + rs() * 160).toFixed(0)} l6,0 `;
  E('path', { d: sd, stroke: '#C9A666', 'stroke-width': 3, 'stroke-linecap': 'round' }, pit);
  E('rect', { x: 330, y: 520, width: 26, height: 200, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, pit);   // take-off board
  const PXM = 180, PX0 = 356;                                     // 180 px per metre from the board
  E('rect', { x: PX0, y: 506, width: PXM * 3.4, height: 14, fill: '#FFD447', stroke: '#B08A20', 'stroke-width': 2 }, pit);   // the tape
  let tk = '';
  for (let m = 0; m <= 3; m++) tk += `M${PX0 + m * PXM},500 L${PX0 + m * PXM},526 `;
  E('path', { d: tk, stroke: SC_INK, 'stroke-width': 4 }, pit);
  [1, 2, 3].forEach(m => T(pit, PX0 + m * PXM, 494, m + ' m', { size: 26, weight: 800, anchor: 'middle', fill: '#FFFFFF' }));
  const fpX = PX0 + 2.996 * PXM;
  [[-26, 0], [-8, 14]].forEach(([dx, dy]) => E('ellipse', { cx: fpX + dx, cy: 590 + dy, rx: 11, ry: 20, fill: '#B9935A', opacity: 0.8 }, pit));
  const sign = G(Lp); tr(sign, 720, 0);
  E('path', { d: 'M-200,360 L-200,470 M200,360 L200,470', stroke: '#6B4423', 'stroke-width': 12 }, sign);
  E('rect', { x: -250, y: 170, width: 500, height: 200, rx: 16, fill: '#1E5C43', stroke: '#0E2E22', 'stroke-width': 6 }, sign);
  T(sign, 0, 214, 'LONG JUMP · KAVYA', { size: 30, weight: 800, anchor: 'middle', fill: GOLD, ls: 2 });
  const jRow = digRow(sign, '2.996', -36, 320, 84, '#FFFFFF');
  T(sign, jRow.edge(5) + 18, 320, 'm', { size: 56, weight: 700, fill: '#FFFFFF' });
  const jCut = cutBar(sign, jRow, 4, '#FF6B6B'), jRing = ringAt(sign, jRow, 4, '#FF6B6B');
  const cTen = mkChip(Lfg, '{{9 + 1 = 10}} ?!', { size: 40, col: RED, fill: '#FFFFFF' });
  const cAlmost = mkChip(Lfg, 'almost **3 m**', { size: 28, col: GOLD });

  /* ================= B: the judges' board ================= */
  const wb = mkWhiteboard(Lb, 720, 430); tr(wb, 800, 320);
  const plat = G(Lb); tr(plat, 230, 0);   // the referee's platform
  E('rect', { x: -120, y: 480, width: 240, height: 90, rx: 8, fill: '#26323C', stroke: SC_INK, 'stroke-width': 4 }, plat);
  E('rect', { x: -132, y: 470, width: 264, height: 20, rx: 6, fill: '#5A6670', stroke: SC_INK, 'stroke-width': 3 }, plat);
  T(plat, 0, 544, 'REFEREE', { size: 30, weight: 800, anchor: 'middle', fill: GOLD, ls: 3 });
  const tweet = drTweet(Lfg);
  const redCard = G(Lfg);
  E('rect', { x: -150, y: -40, width: 300, height: 80, rx: 10, fill: '#E8424F', stroke: SC_INK, 'stroke-width': 4 }, redCard);
  T(redCard, 0, 11, 'DOUBLE ROUNDING', { size: 30, weight: 800, anchor: 'middle', fill: '#FFFFFF' });

  // B1 chop / cut / rule: 10.4973
  const b1 = G(Lb);
  const R1 = digRow(b1, '10.4973', 800, 330, 110, INK);
  const slash = mkDash(E('path', { d: `M${R1.edge(5) + 70},150 L${R1.edge(5) - 70},440`, stroke: GOLD, 'stroke-width': 14, 'stroke-linecap': 'round', opacity: 0.9 }, b1));
  const r1Cut = cutBar(b1, R1, 5), r1Ring = ringAt(b1, R1, 5);
  const r1Dec = T(b1, R1.xs[5], 396, 'decider', { size: 30, weight: 800, anchor: 'middle', fill: RED });
  const r1Title = mkText(b1, 800, 175, 'cut after **2** decimal places', { size: 34, anchor: 'middle', fill: INK, boldFill: RED });
  const r1Rule = mkText(b1, 800, 168, '**Five or more? Raise the score.**\n**Four or less? Let it rest.**', { size: 32, anchor: 'middle', fill: INK, boldFill: BLUE, lh: 4 });
  const r1Arr = arrow(b1, 800, 410, 800, 446, { color: GREEN, width: 6 });
  const r1Res = mkMath(b1, 800, 510, '10.50', { size: 66, fill: GREEN, anchor: 'middle', weight: 700 });
  const r1Q = mkMath(b1, R1.edge(5) + 40, 420, '?', { size: 60, fill: RED, anchor: 'middle' });

  // B2 line: the number line 10.49 ... 10.50
  const b2 = G(Lb);
  const NL = mkNumberLine(b2, { from: 10.49, to: 10.5, step: 0.001, len: 600, labels: [[10.49, '10.49'], [10.495, '10.495'], [10.5, '10.50']], ink: INK, size: 30, hops: [{ a: 10.4973, b: 10.5, col: GREEN, height: 110 }] });
  tr(NL, 500, 330);
  const NX = v => 500 + NL.x(v);
  const half = G(b2);
  E('line', { x1: NX(10.495), y1: 262, x2: NX(10.495), y2: 352, stroke: AMBER, 'stroke-width': 5, 'stroke-dasharray': '10 8' }, half);
  T(half, NX(10.495) - 14, 266, 'halfway', { size: 28, weight: 800, anchor: 'end', fill: '#C27A00' });
  const pDot = G(b2);
  E('circle', { cx: NX(10.4973), cy: 330, r: 13, fill: RED, stroke: INK, 'stroke-width': 3 }, pDot);
  mkText(pDot, NX(10.4973), 432, 'Priya {{10.4973}}', { size: 28, anchor: 'middle', fill: RED });
  const nlTitle = mkText(b2, 800, 170, 'past halfway: round **up**', { size: 34, anchor: 'middle', fill: INK, boldFill: GREEN });
  const nlRes = mkText(b2, 800, 505, '{{10.4973 → 10.50}}   (2 d.p.)', { size: 38, anchor: 'middle', fill: GREEN });

  // B3 short / zero: 10.50
  const b3 = G(Lb);
  const R3 = digRow(b3, '10.50', 780, 300, 104, GREEN);
  const r3Ring = ringAt(b3, R3, 4, GREEN);
  const r3Short = mkMath(b3, 1065, 300, '10.5', { size: 66, fill: RED, anchor: 'middle', weight: 700 });
  const r3Strike = mkDash(E('line', { x1: 1065 - r3Short.w / 2 - 10, y1: 284, x2: 1065 + r3Short.w / 2 + 10, y2: 262, stroke: RED, 'stroke-width': 7, 'stroke-linecap': 'round' }, b3));
  const r3Q = mkText(b3, 1065, 372, 'shorter?', { size: 30, anchor: 'middle', fill: RED });
  const r3Txt = mkText(b3, 800, 412, '2 d.p. = **two** digits after the point', { size: 34, anchor: 'middle', fill: INK, boldFill: GREEN });
  const r3Brace = mkBrace(b3, R3.edge(4) - 6, 322, R3.edge(3) + 6, 322, { text: '', col: GREEN, depth: 16 });
  const cEvid = mkChip(b3, 'That zero is **evidence**.', { size: 32, col: BLUE, fill: '#E6F0FF' });

  // B4 drill: 7.0649
  const b4 = G(Lb);
  mkText(b4, 800, 162, 'Round {{7.0649}}', { size: 36, anchor: 'middle', fill: INK });
  const DR = [['whole number', 1, '7'], ['1 d.p.', 3, '7.1'], ['2 d.p.', 4, '7.06'], ['3 d.p.', 5, '7.065']];
  const dRows = DR.map(([lab, k, ans], i) => {
    const y = 240 + i * 74, g = G(b4);
    T(g, 462, y - 4, lab, { size: 28, weight: 700, fill: '#5A6670' });
    const row = digRow(g, '7.0649', 805, y, 50, INK);
    const cb = cutBar(g, row, k), rg = ringAt(g, row, k);
    const ar = mkMath(g, 930, y - 4, '→', { size: 40, fill: INK, anchor: 'middle' });
    const an = mkMath(g, 964, y, ans, { size: 50, fill: GREEN, weight: 700 });
    return { g, row, cb, rg, ar, an, k };
  });

  // B5 roll: odometers
  const b5 = G(Lb);
  mkText(b5, 800, 166, 'Nines **roll over**', { size: 36, anchor: 'middle', fill: INK, boldFill: BLUE });
  const odo = (parent, x, y, a, b) => {   // one odometer window: digit a rolls up to digit b
    const g = G(parent);
    E('rect', { x: x - 31, y: y - 44, width: 62, height: 88, rx: 8, fill: '#1A2420', stroke: SC_INK, 'stroke-width': 3 }, g);
    const cl = G(g, { 'clip-path': _clipUrl(`M${x - 29},${y - 42} L${x + 29},${y - 42} L${x + 29},${y + 42} L${x - 29},${y + 42} Z`) });
    const strip = G(cl);
    T(strip, x, y + 22, a, { size: 62, weight: 700, anchor: 'middle', fill: '#7CF0A8' });
    T(strip, x, y + 110, b, { size: 62, weight: 700, anchor: 'middle', fill: '#7CF0A8' });
    g.set = p => tr(strip, 0, -88 * ease(clamp(p)));
    return g;
  };
  const OX = [520, 588, 656];
  const o1 = ['1', '9', '9'].map((d, i) => odo(b5, OX[i], 240, d, ['2', '0', '0'][i]));
  const O2X = [520, 604, 672];
  const o2 = ['2', '9', '9'].map((d, i) => odo(b5, O2X[i], 400, d, ['3', '0', '0'][i]));
  E('circle', { cx: 562, cy: 436, r: 9, fill: INK }, b5);
  const carry1 = [mkText(b5, 622, 186, '+1', { size: 26, anchor: 'middle', fill: RED }), mkText(b5, 554, 186, '+1', { size: 26, anchor: 'middle', fill: RED })];
  const m1 = mkMath(b5, 726, 258, '199 + 1 = 200', { size: 44, fill: INK });
  const m2 = mkMath(b5, 726, 418, '2.99 + 0.01 = 3.00', { size: 42, fill: GREEN, weight: 700 });
  const stampOk = drStamp(Lfg, true);
  const cert = G(Lfg);
  E('rect', { x: -100, y: -62, width: 200, height: 124, rx: 6, fill: '#B07A45', stroke: SC_INK, 'stroke-width': 4 }, cert);
  E('rect', { x: -86, y: -48, width: 172, height: 96, fill: '#FFFDF6', stroke: '#E0B84A', 'stroke-width': 3 }, cert);
  T(cert, 0, -14, 'LONG JUMP', { size: 26, weight: 800, anchor: 'middle', fill: '#9A6A08' });
  T(cert, 0, 34, '3.00 m', { size: 40, weight: 800, anchor: 'middle', fill: INK });

  // B6 stages / foul: 1.2349
  const b6 = G(Lb);
  const ch1 = mkMath(b6, 0, 236, '1.2349', { size: 50, fill: INK, anchor: 'middle' });
  const ch2 = mkMath(b6, 0, 236, '1.235', { size: 50, fill: INK, anchor: 'middle' });
  const ch3 = mkMath(b6, 0, 236, '1.24', { size: 50, fill: RED, anchor: 'middle', weight: 700 });
  const GAP = 110, tot = ch1.w + ch2.w + ch3.w + 2 * GAP;
  let cxp = 800 - tot / 2;
  const chX = [ch1, ch2, ch3].map((m, i) => { const c = cxp + m.w / 2; tr(m, c, 0); cxp += m.w + GAP; return c; });
  const chM = [ch1, ch2, ch3];
  const chA = [0, 1].map(i => arrow(b6, chX[i] + chM[i].w / 2 + 16, 220, chX[i + 1] - chM[i + 1].w / 2 - 16, 220, { color: BLUE, width: 5 }));
  const chL = [0, 1].map(i => mkText(b6, (chX[i] + chM[i].w / 2 + chX[i + 1] - chM[i + 1].w / 2) / 2, 278, ['3 d.p.', '2 d.p.'][i], { size: 28, anchor: 'middle', fill: BLUE }));
  const chStrike = mkDash(E('line', { x1: chX[0] + ch1.w / 2 + 6, y1: 222, x2: chX[2] + ch3.w / 2 + 14, y2: 214, stroke: RED, 'stroke-width': 7, 'stroke-linecap': 'round' }, b6));
  const R6 = digRow(b6, '1.2349', 700, 410, 84, INK);
  const r6Cut = cutBar(b6, R6, 4), r6Ring = ringAt(b6, R6, 4);
  const r6Dec = T(b6, R6.xs[4], 466, 'decider', { size: 28, weight: 800, anchor: 'middle', fill: RED });
  const r6Res = mkMath(b6, R6.edge(6) + 40, 410, '→ 1.23', { size: 64, fill: GREEN, weight: 700 });
  const r6Txt = mkText(b6, 800, 512, 'round the **original**, **once**', { size: 32, anchor: 'middle', fill: INK, boldFill: GREEN });

  // B7 stole: 10.5000 − 10.4973 = 0.0027 in columns
  const b7 = G(Lb);
  const COLX = k => 700 + k * 44;   // cells: 1 0 . 5 0 0 0 (the point is cell 2)
  const colRow = (y, str, col, greys) => {
    const g = G(b7);
    [...str].forEach((c, k) => {
      if (c === ' ') return;
      if (c === '.') E('circle', { cx: COLX(k), cy: y - 5, r: 6, fill: col }, g);
      else T(g, COLX(k), y, c, { size: 66, weight: 700, anchor: 'middle', fill: greys && greys.includes(k) ? GREY : col });
    });
    return g;
  };
  const sr1 = colRow(220, '10.5000', INK, [4, 5, 6]);
  const sr2 = colRow(300, '10.4973', INK);
  const sMinus = T(b7, COLX(0) - 60, 300, '−', { size: 66, weight: 700, anchor: 'middle', fill: INK });
  const sLine = E('line', { x1: COLX(0) - 90, y1: 326, x2: COLX(6) + 30, y2: 326, stroke: INK, 'stroke-width': 5 }, b7);
  const sr3 = colRow(398, ' 0.0027', RED);
  const sUnit = T(b7, COLX(6) + 44, 398, 's', { size: 56, weight: 700, fill: RED });
  const sTxt = mkText(b7, 800, 486, '**twenty-seven** ten-thousandths of a second', { size: 32, anchor: 'middle', fill: INK, boldFill: RED });

  /* ================= the cast ================= */
  const ref = cast(Lcast, 'ref');
  const dad = cast(Lcast, 'dad', { watchText: '10.4973' });
  const priya = cast(Lcast, 'priya');
  const kav = cast(Lcast, 'kavya');
  if (dad.watch) { dad.watch.set(''); dad.watch.set('10.4973'); }
  const ltRef = drLowerThird(Lhud, 'ref');
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* positions in the board shot */
  const BY = 672, BS = 0.72, BX = { dad: 560, priya: 800, kav: 1040 }, REF = [230, 352, 0.95];

  /* cuts */
  const k = id => at(id) - 0.06;
  const segs = [['W', -1], ['B', k('chop')], ['C', k('ref')], ['B', k('cut')], ['P', k('jump')], ['B', k('roll')]];
  const shotAt = t => { let s = 'W'; for (const [n, t0] of segs) if (t >= t0) s = n; return s; };
  const runT0 = at('eleven') + 0.4, runDur = 3.2;

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const sh = shotAt(t), sW = sh === 'W' ? 1 : 0, sB = sh === 'B' ? 1 : 0, sC = sh === 'C' ? 1 : 0, sP = sh === 'P' ? 1 : 0;
    const who = scWho(S, t);
    track.upd(t, 0);
    op(track, 1 - sC); op(dim, sB ? 1 : 0);
    op(Lw, sW); op(Lp, sP); op(Lb, sB);
    conf.set(sC, t);
    [c11, c4dp, c2dp, cOne, cTen, cAlmost, stampOk].forEach(c => c.set(0));
    op(cCard, 0); op(cert, 0); op(redCard, 0); tweet.set(0); ltRef.set(0);
    const show = { ref: 0, dad: 0, priya: 0, kav: 0, run: 0 };
    let rf = { mood: 'deadpan', look: 0, flag: 0, whistle: 0 };

    /* ---------- W: hurdles ---------- */
    if (sW) {
      const isTime = t >= at('time') - 0.06;
      popSet(c11, t, at('eleven') + 0.1, mid('eleven', 0.62), 560, 170);
      if (!isTime) {
        // Priya clears the hurdles
        const rp = P(t, runT0, runDur, linear);
        if (rp > 0 && rp < 1) {
          show.run = 1;
          const x = lerp(-120, 1340, rp);
          let hop = 0; HX.forEach(h => { const d = Math.abs(x - h) / 110; if (d < 1) hop = Math.max(hop, Math.cos(d * Math.PI / 2)); });
          tr(priyaRun, x, LANE - 120 * hop, 1.05);
          priyaRun.pose(runPose(t, 3));
        }
        // Dad and his stopwatch
        const dIn = mid('eleven', 0.55);
        if (t >= dIn) {
          show.dad = 1;
          tr(dad, 150, lerp(830, 640, P(t, dIn, 0.35, pop)), 0.95);
          dad.set({ t, talk: 0, mood: 'smug', look: 0.6, lift: 1 });
        }
        const wp = P(t, mid('eleven', 0.64), 0.35, pop);
        op(bigWatch, clamp(wp * 3)); tr(bigWatch, 470, 330, Math.max(0.01, 0.7 + 0.3 * wp));
        popSet(c4dp, t, mid('eleven', 0.82), 1e9, 470, 506);
        op(sbRing, 0); board.row(0, '10__', 2, 'PRIYA');
      } else {
        show.dad = 1; show.priya = 1;
        tr(dad, 150, 640, 0.95);
        dad.set({ t, talk: scTalk(S, t, 'dad'), mood: 'smug', look: t < mid('time', 0.5) ? 0.4 : 0.9, lift: t < mid('time', 0.5) ? 1 : 0.4 });
        tr(priya, 1060, 650, 0.95);
        priya.set({ t, talk: 0, mood: t < mid('time', 0.5) ? 'smug' : 'neutral', look: t < mid('time', 0.5) ? -0.9 : -0.3 });
        op(bigWatch, 1); tr(bigWatch, 470, 330);
        c4dp.set(1); tr(c4dp, 470, 506);
        op(sbRing, fin(t, mid('time', 0.62)));
        popSet(c2dp, t, mid('time', 0.66), 1e9, 900, 330);
      }
    }

    /* ---------- C: the Decider's confessional ---------- */
    if (sC) {
      show.ref = 1;
      tr(ref, 320, 430, 1.4);
      rf = { mood: 'deadpan', look: t > mid('ref', 0.5) ? 0.6 : 0, flag: 0, whistle: 0 };
      ltRef.set(win(t, at('ref') + 0.1, at('ref') + 3.2, 0.3));
      const cp = P(t, mid('ref', 0.3), 0.35, pop);
      op(cCard, clamp(cp * 3)); tr(cCard, 850, 300, Math.max(0.01, 0.85 + 0.15 * cp));
      const sp = fin(t, mid('ref', 0.55));
      op(cSpot, sp); attr(cRow.el[5], 'fill', sp > 0.5 ? '#FFFFFF' : '#5A6670');
      popSet(cOne, t, mid('ref', 0.6), 1e9, 850, 520);
    }

    /* ---------- B: the judges' board ---------- */
    if (sB) {
      [b1, b2, b3, b4, b5, b6, b7].forEach(g => op(g, 0));
      show.ref = 1; tr(ref, REF[0], REF[1], REF[2]);
      show.dad = show.priya = show.kav = 1;
      tr(dad, BX.dad, BY, BS); tr(priya, BX.priya, BY, BS); tr(kav, BX.kav, BY, BS);
      let dm = 'neutral', dl = 0.6, pm = 'neutral', pl = -0.6, plift = 0, km = 'neutral', kl = -0.9, klift = 0;
      const tw = (t0, t1) => { const p = t >= t0 && t < t1 ? P(t, t0, 0.3, linear) : 0; tweet.set(p); tr(tweet, 300, 166); if (p > 0) rf.whistle = 1; return p; };

      if (t < k('ref')) {                                  // chop
        op(b1, 1);
        [R1, r1Title, r1Rule, r1Res, r1Q].forEach(e => op(e, 0)); op(R1, 1);
        op(r1Cut, 0); op(r1Ring, 0); op(r1Dec, 0); r1Arr.set(0);
        R1.el.forEach((e, i) => { attr(e, 'fill', INK); tr(e, 0, 0); op(e, 1); });
        const sl = mid('chop', 0.45);
        op(slash, t > sl && t < sl + 0.5 ? 1 : 0); mkDraw(slash, P(t, sl, 0.18, linear));
        const fall = P(t, sl + 0.1, 0.6, easeIn);
        [5, 6].forEach(i => { tr(R1.el[i], 30 * fall * (i - 4), 260 * fall); op(R1.el[i], 1 - fall); });
        const twp = tw(end('chop') - 0.15, 1e9);
        pm = twp > 0 ? 'shock' : 'smug'; pl = -0.3; plift = t > mid('chop', 0.25) && t < sl + 0.4 ? 1 : 0;
        dm = 'neutral'; dl = 0.9; km = 'deadpan'; kl = -0.9;
        rf.mood = twp > 0 ? 'annoyed' : 'deadpan'; rf.look = 0.9;
      } else if (t < k('line')) {                          // cut, rule
        op(b1, 1); op(r1Q, 0);
        R1.el.forEach(e => { tr(e, 0, 0); op(e, 1); });
        R1.el.forEach((e, i) => attr(e, 'fill', i >= 5 ? '#8A97A3' : INK));
        op(r1Cut, 1); mkDraw(r1Cut, P(t, mid('cut', 0.2), 0.35, linear));
        op(r1Ring, 1); mkDraw(r1Ring, P(t, mid('cut', 0.62), 0.35, linear));
        attr(R1.el[5], 'fill', t > mid('cut', 0.62) ? RED : '#8A97A3');
        op(r1Dec, fin(t, mid('cut', 0.7)));
        const isRule = t >= at('rule') - 0.06;
        op(r1Title, isRule ? 0 : fin(t, at('cut')));
        op(r1Rule, isRule ? fin(t, at('rule')) : 0);
        r1Arr.set(isRule ? P(t, mid('rule', 0.78), 0.3, linear) : 0);
        op(r1Res, isRule ? fin(t, mid('rule', 0.84)) : 0);
        rf.mood = 'deadpan'; rf.look = 0.9; rf.flag = isRule && t > mid('rule', 0.72) ? 1 : 0;
        pm = isRule ? 'annoyed' : 'neutral'; pl = -0.9; dm = 'neutral'; dl = -0.9; km = isRule ? 'happy' : 'neutral'; kl = -0.9;
      } else if (t < k('short')) {                         // line
        op(b2, 1);
        const pp = fin(t, mid('line', 0.05));
        op(NL, 1); op(half, fin(t, mid('line', 0.12)));
        op(pDot, fin(t, mid('line', 0.45)));
        NL.hop(0, P(t, mid('line', 0.62), 0.5, linear));
        op(nlTitle, fin(t, mid('line', 0.62)));
        op(nlRes, fin(t, mid('line', 0.82)));
        km = 'happy'; kl = -0.9; pm = 'smug'; pl = 0.9; dm = 'neutral'; dl = 0.9;
        rf.look = 0.9; rf.flag = t > mid('line', 0.85) ? 1 : 0; void pp;
      } else if (t < k('drill')) {                         // short, zero
        op(b3, 1);
        const isZero = t >= k('zero');
        op(R3, 1);
        op(r3Short, isZero ? 1 : fin(t, mid('short', 0.38)));
        op(r3Q, isZero ? 0 : fin(t, mid('short', 0.6)));
        op(r3Strike, isZero ? 1 : 0); mkDraw(r3Strike, P(t, mid('zero', 0.12), 0.3, linear));
        op(r3Ring, isZero ? 1 : 0); mkDraw(r3Ring, P(t, mid('zero', 0.3), 0.35, linear));
        op(r3Txt, isZero ? fin(t, mid('zero', 0.35)) : 0);
        r3Brace.set(isZero ? P(t, mid('zero', 0.35), 0.35, linear) : 0);
        popSet(cEvid, t, mid('zero', 0.68), 1e9, 800, 492);
        if (!isZero) {
          const twp = tw(mid('short', 0.84), 1e9);
          pm = twp > 0 ? 'shock' : 'smug'; pl = twp > 0 ? -0.9 : 0; plift = t > mid('short', 0.2) && twp === 0 ? 1 : 0;
          rf.mood = twp > 0 ? 'annoyed' : 'deadpan'; rf.look = 0.9;
          km = 'deadpan'; kl = -0.6; dm = 'neutral'; dl = 0.9;
        } else {
          tweet.set(t < at('zero') + 0.2 ? 1 : 0); tr(tweet, 300, 166); rf.whistle = t < at('zero') + 0.2 ? 1 : 0;
          pm = t > mid('zero', 0.7) ? 'sad' : 'annoyed'; pl = -0.9; km = t > mid('zero', 0.7) ? 'smug' : 'neutral'; kl = -0.9; dm = 'neutral'; dl = -0.9;
          rf.look = 0.9;
        }
      } else if (t < k('jump')) {                          // drill
        op(b4, 1);
        const rt = [0.3, 0.46, 0.63, 0.8];
        dRows.forEach((r, i) => {
          const a = mid('drill', rt[i]);
          op(r.g, fin(t, a - 0.25));
          op(r.cb, 1); mkDraw(r.cb, P(t, a - 0.15, 0.25, linear));
          op(r.rg, 1); mkDraw(r.rg, P(t, a, 0.25, linear));
          r.row.el.forEach((e, j) => attr(e, 'fill', j === r.k && t > a ? RED : j >= r.k ? '#8A97A3' : INK));
          op(r.ar, fin(t, a + 0.15)); op(r.an, fin(t, a + 0.25));
        });
        const up = [1, 3].some(i => { const a = mid('drill', rt[i]); return t > a && t < a + 0.7; });
        rf.flag = up ? 1 : 0; rf.look = 0.9;
        pm = 'neutral'; pl = -0.9; dm = 'neutral'; dl = -0.9; km = 'happy'; kl = -0.9;
      } else if (t < k('stages')) {                        // roll
        op(b5, 1);
        const r1 = [0.14, 0.22, 0.3], r2 = [0.5, 0.58, 0.66];
        o1.forEach((o, i) => o.set(P(t, mid('roll', r1[2 - i]), 0.3)));
        o2.forEach((o, i) => o.set(P(t, mid('roll', r2[2 - i]), 0.3)));
        op(carry1[0], win(t, mid('roll', r1[0]) + 0.1, mid('roll', r1[1]) + 0.35, 0.1));
        op(carry1[1], win(t, mid('roll', r1[1]) + 0.1, mid('roll', r1[2]) + 0.35, 0.1));
        op(m1, fin(t, mid('roll', 0.3) + 0.2));
        op(m2, fin(t, mid('roll', 0.66) + 0.2));
        rf.flag = t > mid('roll', 0.5) ? 1 : 0; rf.look = 0.9;
        stampOk.set(P(t, mid('roll', 0.9), 0.3, linear)); tr(stampOk, 610, 498, 0.42);
        const cp = P(t, mid('roll', 0.84), 0.35, pop);
        op(cert, clamp(cp * 3)); tr(cert, 1040, 506 + 20 * (1 - cp), Math.max(0.01, 0.7 + 0.3 * cp));
        km = t > mid('roll', 0.5) ? 'happy' : 'neutral'; kl = -0.9; dm = t > mid('roll', 0.5) ? 'sad' : 'shock'; dl = -0.9; pm = 'neutral'; pl = -0.9;
      } else if (t < k('stole')) {                         // stages, foul
        op(b6, 1);
        const isFoul = t >= k('foul');
        op(ch1, isFoul ? 1 : fin(t, mid('stages', 0.08)));
        chA[0].set(isFoul ? 1 : P(t, mid('stages', 0.48), 0.3, linear)); op(chL[0], isFoul ? 1 : fin(t, mid('stages', 0.5)));
        op(ch2, isFoul ? 1 : fin(t, mid('stages', 0.55)));
        chA[1].set(isFoul ? 1 : P(t, mid('stages', 0.78), 0.3, linear)); op(chL[1], isFoul ? 1 : fin(t, mid('stages', 0.8)));
        op(ch3, isFoul ? 1 : fin(t, mid('stages', 0.85)));
        [R6, r6Cut, r6Ring, r6Dec, r6Res, r6Txt, chStrike].forEach(e => op(e, 0));
        if (!isFoul) {
          pm = 'smug'; pl = 0; plift = t > mid('stages', 0.4) ? 1 : 0; km = 'neutral'; kl = -0.6; dm = 'happy'; dl = 0.9;
          rf.look = 0.9; rf.mood = t > mid('stages', 0.8) ? 'annoyed' : 'deadpan';
        } else {
          const twp = tw(at('foul') - 0.05, at('foul') + 0.9);
          const rc = P(t, at('foul') + 0.8, 0.35, pop);
          op(redCard, clamp(rc * 3)); tr(redCard, 250, 150, Math.max(0.01, 0.6 + 0.4 * rc), -6);
          op(chStrike, 1); mkDraw(chStrike, P(t, mid('foul', 0.3), 0.3, linear));
          op(R6, fin(t, mid('foul', 0.4)));
          op(r6Cut, 1); mkDraw(r6Cut, P(t, mid('foul', 0.5), 0.25, linear));
          op(r6Ring, 1); mkDraw(r6Ring, P(t, mid('foul', 0.6), 0.25, linear));
          R6.el.forEach((e, j) => attr(e, 'fill', j === 4 && t > mid('foul', 0.6) ? RED : j >= 4 ? '#8A97A3' : INK));
          op(r6Dec, fin(t, mid('foul', 0.62)));
          op(r6Res, fin(t, mid('foul', 0.8)));
          op(r6Txt, fin(t, mid('foul', 0.4)));
          rf.mood = 'deadpan'; rf.look = 0.9; void twp;
          pm = t < mid('foul', 0.5) ? 'shock' : 'sad'; pl = -0.9; km = 'deadpan'; kl = -0.6; dm = 'deadpan'; dl = 0.9;
        }
      } else {                                             // stole
        op(b7, 1);
        op(sr1, fin(t, at('stole'))); op(sr2, fin(t, at('stole') + 0.1)); op(sMinus, fin(t, at('stole') + 0.1)); op(sLine, fin(t, at('stole') + 0.2));
        op(sr3, fin(t, mid('stole', 0.35))); op(sUnit, fin(t, mid('stole', 0.35)));
        op(sTxt, fin(t, mid('stole', 0.55)));
        pm = t < mid('stole', 0.4) ? 'sad' : 'annoyed'; pl = 0; km = 'deadpan'; kl = -0.6; dm = 'deadpan'; dl = 0.9;
        rf.mood = 'deadpan'; rf.look = 0.7;
      }
      dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: dl, lift: 0 });
      priya.set({ t, talk: scTalk(S, t, 'priya'), mood: pm, look: pl, lift: plift, still: t > end('stole') });
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl, lift: klift });
    }

    /* ---------- P: the long-jump pit ---------- */
    if (sP) {
      show.dad = 1; show.kav = 1;
      tr(dad, 200, 612, 1.0); tr(kav, 1060, 622, 0.95);
      const ten = t > mid('jump', 0.72);
      dad.set({ t, talk: scTalk(S, t, 'dad'), mood: ten ? 'shock' : 'smug', look: 0.9, lift: 0.5, sweat: ten ? 1 : 0 });
      kav.set({ t, talk: 0, mood: ten ? 'deadpan' : 'happy', look: ten ? 0 : -0.9 });
      op(jCut, 1); mkDraw(jCut, P(t, mid('jump', 0.45), 0.3, linear));
      op(jRing, 1); mkDraw(jRing, P(t, mid('jump', 0.55), 0.3, linear));
      popSet(cAlmost, t, mid('jump', 0.3), 1e9, fpX, 658);
      popSet(cTen, t, mid('jump', 0.72), 1e9, 720, 430);
    }

    if (show.ref) ref.set({ t, talk: scTalk(S, t, 'ref'), mood: rf.mood, look: rf.look, flag: rf.flag, whistle: rf.whistle });
    op(ref, show.ref); op(dad, show.dad); op(priya, show.priya); op(kav, show.kav); op(priyaRun, show.run);
  };
});
