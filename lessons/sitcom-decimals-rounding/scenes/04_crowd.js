/* Scene 4: Sig works the door (rounding to significant figures).
   Shots (hard sitcom cuts):
   B  noon     the announcer's box: Mr Tan on the microphone, Ah Boy beside him; "12 noon", "to 2 s.f.".
      gate     the gate tally card: 4 871 spectators.
      boy      Ah Boy: 48|71 -> 49, "49 people!".
      welcome  Mr Tan: "Welcome, all 49 of you!"; the stands BOOO; MISSING THE POINT. Hold.
   L  sig      the VIP stand door: Sig (lower third) at his velvet rope; THE LIST (a giant clipboard): 4 871 with
               1st, 2nd, 3rd, 4th significant figure under the digits, "count from the first non-zero digit".
      cut      48|71, decider 7 -> 49, then zeros fill the empty places: 4 900.
      size     Kavya: 4 900 ≠ 49; the crowd shrinks to 49 people and grows back.
      table    4 871 to 1, 2 and 3 s.f.: 5 000, 4 900, 4 870.
      never    Priya: "zeros are never significant?"; Sig pushes his sunglasses up.
   Q  inside   SHOWPIECE: digit cards queue at the rope. 3.07: every card goes in, the 0 between counts. 3.00: the
               end zeros count too.
      lead     0.0052: the 5 and the 2 go in; the leading zeros (and the point) WAIT OUTSIDE.
   L  photo    Dad's photo-finish print: two noses at the line, 0.00456 s.
      draw     Priya: 0.00|456 -> 0.00 (2 d.p.), "a draw?".
      small    Sig: the 4 is the 1st s.f.; 0.0045|6, decider 6 -> 0.0046; leading zeros stay to keep the size.
      rule     Kavya: d.p. count from the point; s.f. count from the first non-zero digit.
   Q  pun      Mr Tan: "Everyone here is significant"; the leading zeros wait outside; *cricket*; Priya: REMATCH. */
scene('crowd', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const popSet = (el, t, t0, t1, x, y) => { const p = t >= t0 && t < t1 ? P(t, t0, 0.35, linear) : 0; el.set(p); if (x !== undefined) tr(el, x, y); };
  const fin = (t, t0, d) => P(t, t0, d || 0.3, linear);
  const GOLD = '#FFE45C', RED = '#D32F2F', GREEN = '#1E9E5A', BLUE = '#1E5FC0', PURPLE = '#6A3FC0', INK = MK.ink, GREY = '#8A97A3', ORANGE = '#E07A10';
  /* a row of big digits (with '.' and a thin ' ' for thousands) we can cut and ring: x is the centre, y the baseline */
  const digRow = (parent, str, cx, y, size, col) => {
    const g = G(parent), cw = size * 0.66, pw = size * 0.34, sw = size * 0.3, ch = [...str];
    const ws = ch.map(c => (c === '.' ? pw : c === ' ' ? sw : cw)), W0 = ws.reduce((a, b) => a + b, 0);
    let x = cx - W0 / 2;
    g.xs = []; g.el = [];
    ch.forEach((c, i) => {
      const xc = x + ws[i] / 2; g.xs.push(xc);
      g.el.push(c === ' ' ? null : c === '.' ? E('circle', { cx: xc, cy: y - size * 0.07, r: size * 0.075, fill: col }, g) : T(g, xc, y, c, { size, weight: 700, anchor: 'middle', fill: col }));
      x += ws[i];
    });
    g.edge = i => (i <= 0 ? cx - W0 / 2 : i >= ch.length ? cx + W0 / 2 : g.xs[i - 1] + ws[i - 1] / 2);
    g.W = W0; g.y = y; g.size = size; g.cx = cx;
    g.tint = f => g.el.forEach((e, i) => { if (e) attr(e, 'fill', f(i)); });
    return g;
  };
  const cutBar = (parent, row, k, col) => mkDash(E('line', { x1: row.edge(k), y1: row.y - row.size * 0.92, x2: row.edge(k), y2: row.y + row.size * 0.2, stroke: col || RED, 'stroke-width': Math.max(5, row.size * 0.07), 'stroke-linecap': 'round' }, parent));
  const ringAt = (parent, row, k, col) => mkDash(E('ellipse', { cx: row.xs[k], cy: row.y - row.size * 0.36, rx: row.size * 0.34, ry: row.size * 0.52, fill: 'none', stroke: col || RED, 'stroke-width': Math.max(4, row.size * 0.06) }, parent));

  /* layers: sets, characters, the booth desk, boards and cards, pop-ups, HUD */
  const Lset = G(root), Lmid = G(root), Lfront = G(root), Lboard = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= B: the announcer's box ================= */
  const boothShot = G(Lset);
  const booth = drBooth(boothShot);
  const boothFront = G(Lfront); boothFront.appendChild(booth.front); boothFront.appendChild(booth.top);
  const cNoon = mkChip(Lfg, '**12 noon**', { size: 32, col: GOLD });
  const c2sf = mkChip(Lfg, 'the crowd, to **2 significant figures**', { size: 30, col: '#9CC8FF' });
  // the gate tally card
  const tally = G(Lboard);
  E('rect', { x: -210, y: -112, width: 420, height: 224, rx: 16, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, tally);
  E('rect', { x: -210, y: -112, width: 420, height: 56, rx: 16, fill: DR_BLUE }, tally);
  E('rect', { x: -210, y: -72, width: 420, height: 16, fill: DR_BLUE }, tally);
  T(tally, 0, -72, 'GATE TALLY', { size: 30, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 3 });
  const tRow = digRow(tally, '4 871', -58, 40, 86, INK);
  T(tally, -58, 92, 'spectators', { size: 28, weight: 700, anchor: 'middle', fill: '#5A6670', font: FB });
  const tCut = cutBar(tally, tRow, 3), tRing = ringAt(tally, tRow, 3);
  const tRes = mkMath(tally, 142, 34, '→ 49', { size: 52, fill: RED, anchor: 'middle', weight: 700 });
  const bubBoy = mkSpeechBubble(Lfg, '**49** people!', { size: 34, tail: 'right', boldFill: RED });
  const bubTan = mkSpeechBubble(Lfg, 'Welcome, all **49** of you!', { size: 34, tail: 'left', boldFill: RED });
  const boos = [[250, 150, -8], [440, 205, 6], [300, 265, 4], [1010, 122, -5]].map(([x, y, r]) => { const c = mkChip(Lfg, '**BOOO!**', { size: 30, col: '#FF8A8A' }); c.at = [x, y, r]; return c; });
  const stampBad = drStamp(Lfg, false);

  /* ================= L, Q: the VIP stand door ================= */
  const doorShot = G(Lset);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#7FD3FF', '#D6F0FF', true) }, doorShot);
  // spectators on the stand above the door
  const rs = rng(17); let sd = '';
  for (let row = 0; row < 2; row++) for (let x = 600; x < 1200; x += 26) sd += `M${(x + rs() * 6).toFixed(0)},${18 + row * 30} m-9,0 a9,9 0 1,0 18,0 a9,9 0 1,0 -18,0 `;
  E('path', { d: sd, fill: '#8F9CAB' }, doorShot);
  E('rect', { x: 0, y: 66, width: 1200, height: 340, fill: '#3B2E5A' }, doorShot);
  E('rect', { x: 0, y: 60, width: 1200, height: 14, fill: '#E0B84A' }, doorShot);
  let pan = '';
  for (let x = 40; x < 1200; x += 120) pan += `M${x},96 L${x + 80},96 L${x + 80},376 L${x},376 Z `;
  E('path', { d: pan, fill: 'none', stroke: '#4E3E74', 'stroke-width': 4 }, doorShot);
  // the doorway with its curtain
  E('rect', { x: 600, y: 170, width: 300, height: 236, rx: 10, fill: '#1A1028', stroke: '#E0B84A', 'stroke-width': 6 }, doorShot);
  E('path', { d: 'M606,176 Q650,290 640,400 L606,400 Z M894,176 Q850,290 860,400 L894,400 Z', fill: '#8C1C3A' }, doorShot);
  const sign = G(doorShot); tr(sign, 870, 126);
  E('rect', { x: -170, y: -34, width: 340, height: 68, rx: 12, fill: '#1E1530', stroke: '#E0B84A', 'stroke-width': 4 }, sign);
  T(sign, 0, 15, 'VIP STAND', { size: 42, weight: 800, anchor: 'middle', fill: '#E0B84A', ls: 6 });
  // the VIP platform (inside) and the pavement (outside)
  E('rect', { x: 0, y: 400, width: 1200, height: 52, fill: '#8C1C3A', stroke: '#5A0E24', 'stroke-width': 4 }, doorShot);
  E('rect', { x: 0, y: 452, width: 1200, height: 298, fill: '#A8B3BE' }, doorShot);
  let pv = '';
  for (let x = 0; x < 1200; x += 100) pv += `M${x},452 L${x - 60},750 `;
  E('path', { d: pv + 'M0,560 L1200,560 M0,660 L1200,660', stroke: '#8F9CAB', 'stroke-width': 3 }, doorShot);
  const ropeS = G(doorShot); tr(ropeS, 470, 600); drRope(ropeS, 190);
  const ropeB = G(doorShot); tr(ropeB, 690, 560); drRope(ropeB, 680);

  /* ================= L: THE LIST (a giant clipboard) ================= */
  const BXc = 860;                                   // the paper's centre line
  const list = G(Lboard);
  E('rect', { x: 560, y: 104, width: 600, height: 444, rx: 18, fill: '#B07A45', stroke: SC_INK, 'stroke-width': 5 }, list);
  E('rect', { x: 580, y: 130, width: 560, height: 400, rx: 6, fill: MK.paper }, list);
  E('rect', { x: 790, y: 90, width: 140, height: 44, rx: 10, fill: '#C9D3DC', stroke: SC_INK, 'stroke-width': 4 }, list);
  T(list, 860, 122, 'THE LIST', { size: 22, weight: 800, anchor: 'middle', fill: SC_INK, ls: 2 });

  // sig, cut: 4 871
  const bS = G(list);
  const sTitle = mkText(bS, BXc, 190, 'count from the **first non-zero digit**', { size: 32, anchor: 'middle', fill: INK, boldFill: PURPLE });
  const cTitle = mkText(bS, BXc, 190, '**2** s.f.: cut after the 2nd figure', { size: 32, anchor: 'middle', fill: INK, boldFill: RED });
  const R4 = digRow(bS, '4 871', BXc, 330, 112, INK);
  const ordG = G(bS);
  [[0, '1st'], [2, '2nd'], [3, '3rd'], [4, '4th']].forEach(([i, s], j) => T(ordG, R4.xs[i], 392, s, { size: 28, weight: 800, anchor: 'middle', fill: j < 2 ? PURPLE : GREY }));
  const r4Cut = cutBar(bS, R4, 3), r4Ring = ringAt(bS, R4, 3);
  const r4Dec = T(bS, R4.xs[3], 392, 'decider', { size: 28, weight: 800, anchor: 'middle', fill: RED });
  const r4a = mkMath(bS, 730, 470, '48 → 49', { size: 50, fill: INK, anchor: 'middle' });
  const r4b = mkMath(bS, 870, 470, '⇒', { size: 50, fill: INK, anchor: 'middle' });
  const r4c = mkMath(bS, 1005, 470, '"4 900"', { size: 56, fill: GREEN, anchor: 'middle', weight: 700 });
  const r4cRing = E('rect', { x: 1005 - r4c.w / 2 - 12, y: 470 - r4c.a - 8, width: r4c.w + 24, height: r4c.a + r4c.d + 16, rx: 10, fill: 'none', stroke: GREEN, 'stroke-width': 4 }, bS);
  const r4Note = mkText(bS, 1005, 516, 'zeros fill the places', { size: 26, anchor: 'middle', fill: GREEN });

  // size: 4 900 ≠ 49, the crowd shrinks
  const bZ = G(list);
  mkMath(bZ, BXc, 214, '"4 900" ≠ 49', { size: 62, fill: INK, anchor: 'middle' });
  const crowdG = G(bZ); tr(crowdG, BXc, 342);
  const crowdIn = G(crowdG);
  { const rc = rng(41), cols = ['#E8424F', DR_BLUE, '#FFC247', '#2FA36B', '#B48CFF', '#FF8A3D'];
    cols.forEach((c, ci) => { let d = ''; for (let i = 0; i < 26; i++) { const x = -220 + rc() * 440, y = -74 + rc() * 128; d += `M${x.toFixed(0)},${y.toFixed(0)} m-11,0 a11,11 0 1,0 22,0 a11,11 0 1,0 -22,0 `; } E('path', { d, fill: c, stroke: SC_INK, 'stroke-width': 2 }, crowdIn); void ci; }); }
  const zBig = mkText(bZ, BXc, 510, 'with the zeros: {{"4 900"}} people', { size: 32, anchor: 'middle', fill: GREEN });
  const zSmall = mkText(bZ, BXc, 510, 'without them: {{49}} people', { size: 32, anchor: 'middle', fill: RED });
  const zKeep = mkChip(Lfg, 'the zeros keep the **size**', { size: 32, col: GOLD });

  // table: 4 871 to 1, 2, 3 s.f.
  const bT = G(list);
  const tab = mkTable(bT, [['{{"4 871"}} to', 'rounded'], ['1 s.f.', '{{"5 000"}}'], ['2 s.f.', '{{"4 900"}}'], ['3 s.f.', '{{"4 870"}}']], { size: 36, colW: [230, 250], rowH: 84, ink: INK, fill: '#FFFFFF', headFill: 'rgba(106,63,192,0.18)' });
  tr(tab, BXc - 240, 162);
  const tMark = tab.mark(2, 1, 'rgba(47,163,107,0.22)');

  // never: which zeros count?
  const bN = G(list);
  const nTitle = mkText(bN, BXc, 194, 'zeros **never** count?', { size: 38, anchor: 'middle', fill: INK, boldFill: RED });
  const nRows = [['3.07', 1, [2]], ['3.00', 1, [2, 3]], ['0.0052', 1, [0, 2, 3]]].map(([s, , zs], i) => {
    const r = digRow(bN, s, BXc, 300 + i * 92, 74, INK);
    r.tint(j => (zs.includes(j) ? ORANGE : INK));
    return r;
  });
  const nQ = nRows.map(r => mkMath(bN, r.edge(99) + 40, r.y, '?', { size: 60, fill: RED, anchor: 'middle' }));

  // photo: the photo-finish print
  const bP = G(list);
  const pr = G(bP);
  E('rect', { x: 620, y: 150, width: 480, height: 270, rx: 8, fill: '#E6E1D3', stroke: '#5A6670', 'stroke-width': 4 }, pr);
  T(pr, 860, 186, 'PHOTO FINISH', { size: 28, weight: 800, anchor: 'middle', fill: '#5A6670', ls: 3 });
  E('line', { x1: 900, y1: 200, x2: 900, y2: 410, stroke: RED, 'stroke-width': 5 }, pr);
  const runner = (y, col, name, nose) => {
    E('path', { d: `M${nose - 150},${y + 70} Q${nose - 120},${y + 10} ${nose - 60},${y + 20} L${nose - 40},${y + 60} Z`, fill: col, stroke: SC_INK, 'stroke-width': 3 }, pr);
    E('circle', { cx: nose - 44, cy: y, r: 34, fill: '#8A5A3A', stroke: SC_INK, 'stroke-width': 3 }, pr);
    E('path', { d: `M${nose - 14},${y - 10} L${nose},${y + 4} L${nose - 14},${y + 8} Z`, fill: '#8A5A3A', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, pr);
    E('path', { d: `M${nose - 78},${y - 14} Q${nose - 44},${y - 44} ${nose - 14},${y - 18}`, fill: 'none', stroke: '#1E1410', 'stroke-width': 10, 'stroke-linecap': 'round' }, pr);
    T(pr, nose - 178, y + 10, name, { size: 26, weight: 800, anchor: 'end', fill: SC_INK });
  };
  runner(250, DR_BLUE, 'KAVYA', 904);
  runner(350, DR_BLUE, 'PRIYA', 896);
  const pGap = mkText(bP, BXc, 490, 'Kavya wins by {{0.00456}} s', { size: 38, anchor: 'middle', fill: INK });

  // draw: 0.00|456 -> 0.00
  const bD = G(list);
  mkText(bD, BXc, 192, 'to **2** decimal places', { size: 34, anchor: 'middle', fill: INK, boldFill: BLUE });
  const RD = digRow(bD, '0.00456', BXc, 320, 96, INK);
  const dCut = cutBar(bD, RD, 4), dRing = ringAt(bD, RD, 4);
  const dDec = T(bD, RD.xs[4], 384, 'decider', { size: 28, weight: 800, anchor: 'middle', fill: RED });
  const dRes = mkMath(bD, BXc, 436, '0.00456 → 0.00', { size: 52, fill: RED, anchor: 'middle', weight: 700 });
  const cDraw = mkChip(bD, 'a **draw**?', { size: 28, col: RED, fill: '#FFECEC' });

  // small: 0.0045|6 -> 0.0046
  const bM = G(list);
  mkText(bM, BXc, 192, 'to **2** significant figures', { size: 34, anchor: 'middle', fill: INK, boldFill: PURPLE });
  const RM = digRow(bM, '0.00456', BXc, 340, 96, INK);
  const m1st = G(bM);
  arrow(m1st, RM.xs[4], 226, RM.xs[4], 262, { color: PURPLE, width: 5 });
  T(m1st, RM.xs[4] - 26, 238, '1st s.f.', { size: 26, weight: 800, anchor: 'end', fill: PURPLE });
  const mCut = cutBar(bM, RM, 6), mRing = ringAt(bM, RM, 6);
  const mDec = T(bM, RM.xs[6], 404, 'decider', { size: 28, weight: 800, anchor: 'middle', fill: RED });
  const mRes = mkMath(bM, BXc, 466, '0.00456 → 0.0046', { size: 50, fill: GREEN, anchor: 'middle', weight: 700 });
  const mNote = mkText(bM, BXc, 512, 'leading zeros **stay**, to keep the size', { size: 28, anchor: 'middle', fill: INK, boldFill: GREEN });

  // rule: d.p. from the point, s.f. from the first non-zero digit
  const bR = G(list);
  const RR = digRow(bR, '0.00456', BXc, 350, 104, INK);
  const ruA = G(bR), ruB = G(bR);
  const yA = 236, yB = 402;
  E('line', { x1: RR.xs[1], y1: yA + 14, x2: RR.xs[1], y2: 290, stroke: BLUE, 'stroke-width': 4, 'stroke-dasharray': '6 6' }, ruA);
  const aA = arrow(ruA, RR.xs[1], yA + 14, RR.edge(7) + 20, yA + 14, { color: BLUE, width: 6 });
  mkText(ruA, BXc, yA - 16, '**d.p.** count from the **point**', { size: 32, anchor: 'middle', fill: BLUE });
  E('line', { x1: RR.xs[4] - 30, y1: 362, x2: RR.xs[4] - 30, y2: yB - 14, stroke: PURPLE, 'stroke-width': 4, 'stroke-dasharray': '6 6' }, ruB);
  const aB = arrow(ruB, RR.xs[4] - 30, yB - 14, RR.edge(7) + 20, yB - 14, { color: PURPLE, width: 6 });
  mkText(ruB, BXc, yB + 40, '**s.f.** count from where it **starts**', { size: 32, anchor: 'middle', fill: PURPLE });
  mkText(ruB, BXc, yB + 82, '(the first non-zero digit)', { size: 28, anchor: 'middle', fill: PURPLE });

  /* ================= Q: the queue of digit cards ================= */
  const CW = 86, PW = 44, CH = 112, CGAP = 10, QX = 690, YOUT = 606, YIN = 340;
  const cards = [];
  const cardL = G(Lboard);
  for (let i = 0; i < 6; i++) {
    const g = G(cardL), body = G(g);
    const rect = E('rect', { x: -CW / 2, y: -CH / 2, width: CW, height: CH, rx: 12, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 4 }, body);
    const txt = T(body, 0, 28, '0', { size: 80, weight: 800, anchor: 'middle', fill: INK });
    const pt = E('circle', { cx: 0, cy: 24, r: 9, fill: INK }, body);
    [-1, 1].forEach(sd => E('line', { x1: sd * 18, y1: CH / 2, x2: sd * 20, y2: CH / 2 + 14, stroke: SC_INK, 'stroke-width': 5, 'stroke-linecap': 'round' }, body));
    cards.push({ g, rect, txt, pt, s: null });
  }
  const layout = str => { const ch = [...str], ws = ch.map(c => (c === '.' ? PW : CW)), W = ws.reduce((a, b) => a + b, 0) + CGAP * (ch.length - 1); let x = QX - W / 2; return ch.map((c, i) => { const xc = x + ws[i] / 2; x += ws[i] + CGAP; return { c, x: xc, w: ws[i] }; }); };
  const L307 = layout('3.07'), L300 = layout('3.00'), L52 = layout('0.0052');
  const setCard = (cd, c, w, fill, ink) => {
    if (cd.s !== c + w) { cd.s = c + w; setText(cd.txt, c === '.' ? '' : c); attr(cd.rect, 'x', -w / 2); attr(cd.rect, 'width', w); op(cd.pt, c === '.' ? 1 : 0); }
    attr(cd.rect, 'fill', fill); attr(cd.txt, 'fill', ink); attr(cd.pt, 'fill', ink);
  };
  const qLabA = mkText(Lboard, L307[2].x, 438, 'between: **counts**', { size: 28, anchor: 'middle', fill: '#FFFFFF', boldFill: '#8FF0B8' });
  const qLabB = mkText(Lboard, (L300[2].x + L300[3].x) / 2, 438, 'end zeros: **count**', { size: 28, anchor: 'middle', fill: '#FFFFFF', boldFill: '#8FF0B8' });
  const qChipA = mkChip(Lfg, '{{3.07}}: **3** s.f.', { size: 36, col: '#8FF0B8' });
  const qChipB = mkChip(Lfg, '{{3.00}}: **3** s.f. too', { size: 36, col: '#8FF0B8' });
  const qChipC = mkChip(Lfg, '{{0.0052}}: only **2** s.f.', { size: 36, col: '#8FF0B8' });
  const qNote = mkChip(Lfg, 'leading zeros just show the **size**', { size: 26, col: GOLD });
  const waitSign = G(Lboard);
  E('path', { d: 'M-60,-30 L-70,-48 M60,-30 L70,-48', stroke: '#5A6670', 'stroke-width': 3 }, waitSign);
  E('rect', { x: -108, y: -30, width: 216, height: 52, rx: 8, fill: '#FFFFFF', stroke: RED, 'stroke-width': 4 }, waitSign);
  T(waitSign, 0, 6, 'WAIT OUTSIDE', { size: 28, weight: 800, anchor: 'middle', fill: RED });
  const cSig = mkChip(Lfg, 'Everyone here is **significant**.', { size: 34, col: GOLD });
  const cCricket = mkChip(Lfg, '*cricket*', { size: 30, col: '#A4BCCB' });
  const bubRe = mkSpeechBubble(Lfg, '**REMATCH.**', { size: 32, tail: 'down', tailX: 20, boldFill: RED });

  /* ================= the cast ================= */
  const sig = cast(Lmid, 'sig');
  const tan = cast(Lmid, 'tan');
  const boy = cast(Lmid, 'boy');
  const kav = cast(Lmid, 'kavya');
  const priya = cast(Lmid, 'priya');
  const dad = cast(Lmid, 'dad', { watchText: '0.00456' });
  if (dad.watch) dad.watch.set('0.00456');
  const ltSig = drLowerThird(Lhud, 'sig');
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* positions: the list shot (humans low at the right), Sig at the door */
  const RY = 704, RS = 0.72, RX = { kav: 680, priya: 880, dad: 1080 }, SIG = [200, 562, 1.32];

  /* cuts */
  const k = id => at(id) - 0.06;
  const segs = [['B', -1], ['L', k('sig')], ['Q', k('inside')], ['L', k('photo')], ['E', k('pun')]];
  const shotAt = t => { let s = 'B'; for (const [n, t0] of segs) if (t >= t0) s = n; return s; };

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const sh = shotAt(t), sB = sh === 'B' ? 1 : 0, sL = sh === 'L' ? 1 : 0, sQ = sh === 'Q' || sh === 'E' ? 1 : 0, sE = sh === 'E' ? 1 : 0;
    op(boothShot, sB); op(boothFront, sB); op(doorShot, 1 - sB);
    op(ropeS, sL); op(ropeB, sQ);
    op(tally, 0); op(list, sL); op(cardL, 0); op(waitSign, 0); op(qLabA, 0); op(qLabB, 0);
    [cNoon, c2sf, bubBoy, bubTan, stampBad, zKeep, cDraw, qChipA, qChipB, qChipC, qNote, cSig, cCricket, bubRe].forEach(c => c.set(0));
    boos.forEach(c => c.set(0));
    ltSig.set(0);
    const show = { sig: 0, tan: 0, boy: 0, kav: 0, priya: 0, dad: 0 };
    let sg = { mood: 'deadpan', look: 0.8, glasses: 1 };

    /* ---------- B: the announcer's box ---------- */
    if (sB) {
      booth.upd(t);
      show.tan = show.boy = 1;
      tr(tan, 400, 448, 1.1); tr(boy, 935, 482, 0.92);
      popSet(cNoon, t, at('noon') + 0.1, at('gate') - 0.1, 840, 170);
      popSet(c2sf, t, mid('noon', 0.5), at('gate') - 0.1, 840, 250);
      let tm = 'happy', tl = 0.3, tlift = 1, bm = 'happy', bl = -0.7, blift = 0;
      if (t >= at('gate') - 0.1 && t < at('welcome') - 0.06) {
        const cp = P(t, at('gate'), 0.4, pop);
        op(tally, clamp(cp * 3)); tr(tally, 840, 232, Math.max(0.01, 0.8 + 0.2 * cp));
        const isBoy = t >= at('boy') - 0.06;
        op(tCut, isBoy ? 1 : 0); mkDraw(tCut, P(t, mid('boy', 0.25), 0.3, linear));
        op(tRing, isBoy ? 1 : 0); mkDraw(tRing, P(t, mid('boy', 0.35), 0.3, linear));
        tRow.tint(i => (isBoy && i >= 3 && t > mid('boy', 0.25) ? (i === 3 && t > mid('boy', 0.35) ? RED : GREY) : INK));
        op(tRes, isBoy ? fin(t, mid('boy', 0.45)) : 0);
        popSet(bubBoy, t, mid('boy', 0.62), 1e9, 700, 420);
        if (isBoy) { tm = 'neutral'; tl = 0.9; tlift = 0; bl = -0.4; blift = t > at('boy') + 0.2 ? 1 : 0; bm = 'happy'; }
        else { tm = 'happy'; tl = 0.6; tlift = 1; bl = -0.4; }
      }
      if (t >= at('welcome') - 0.06) {
        popSet(bubTan, t, at('welcome') + 0.1, 1e9, 840, 205);
        const booT = mid('welcome', 0.75);
        boos.forEach((c, i) => { popSet(c, t, booT + i * 0.12, 1e9); const [x, y, r] = c.at; tr(c, x, y + Math.sin(t * 9 + i) * 4 * AMP, 1, r); });
        stampBad.set(P(t, end('welcome') + 0.15, 0.3, linear)); tr(stampBad, 800, 308, 0.45);
        const booed = t > booT;
        tm = booed ? 'shock' : 'happy'; tl = booed ? 0.2 : 0.4; tlift = 1;
        bm = 'happy'; bl = -0.8; blift = 1;
      }
      tan.set({ t, talk: scTalk(S, t, 'tan'), mood: tm, look: tl, lift: tlift, sweat: t > end('welcome') ? 1 : 0 });
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: bm, look: bl, lift: blift });
    }

    /* ---------- Sig at the door: in every door shot ---------- */
    if (!sB) { show.sig = 1; tr(sig, SIG[0], SIG[1], SIG[2]); }

    /* ---------- L: THE LIST ---------- */
    if (sL) {
      [bS, bZ, bT, bN, bP, bD, bM, bR].forEach(g => op(g, 0));
      show.kav = show.priya = show.dad = 1;
      tr(kav, RX.kav, RY, RS); tr(priya, RX.priya, RY, RS); tr(dad, RX.dad, RY, RS);
      let km = 'neutral', kl = -0.9, pm = 'neutral', pl = -0.9, plift = 0, dm = 'neutral', dl = -0.9, dlift = 0;
      if (t < k('size')) {                                 // sig, cut
        op(bS, 1);
        const isCut = t >= k('cut');
        ltSig.set(win(t, at('sig') + 0.1, at('sig') + 3.2, 0.3));
        op(sTitle, isCut ? 0 : fin(t, mid('sig', 0.5)));
        op(cTitle, isCut ? fin(t, at('cut')) : 0);
        op(R4, isCut ? 1 : fin(t, mid('sig', 0.35)));
        op(ordG, isCut ? 1 - fin(t, mid('cut', 0.2)) : fin(t, mid('sig', 0.66)));
        op(r4Cut, isCut ? 1 : 0); mkDraw(r4Cut, P(t, mid('cut', 0.08), 0.3, linear));
        op(r4Ring, isCut ? 1 : 0); mkDraw(r4Ring, P(t, mid('cut', 0.18), 0.3, linear));
        op(r4Dec, isCut ? fin(t, mid('cut', 0.24)) : 0);
        R4.tint(i => (isCut && i >= 3 && t > mid('cut', 0.08) ? (i === 3 && t > mid('cut', 0.18) ? RED : GREY) : INK));
        op(r4a, isCut ? fin(t, mid('cut', 0.3)) : 0);
        op(r4b, isCut ? fin(t, mid('cut', 0.55)) : 0);
        op(r4c, isCut ? fin(t, mid('cut', 0.7)) : 0);
        op(r4cRing, isCut ? fin(t, mid('cut', 0.86)) : 0);
        op(r4Note, isCut ? fin(t, mid('cut', 0.86)) : 0);
        sg = { mood: 'deadpan', look: 0.8, glasses: 1 };
        km = isCut ? 'neutral' : 'neutral'; pm = 'smug'; dm = 'neutral';
      } else if (t < k('table')) {                         // size
        op(bZ, 1);
        const sp = P(t, mid('size', 0.38), 0.5, ease), gp = P(t, mid('size', 0.72), 0.5, ease);
        const sc = gp > 0 ? lerp(0.1, 1, gp) : lerp(1, 0.1, sp);
        tr(crowdIn, 0, 0, Math.max(0.05, sc));
        op(zBig, sp < 0.5 || gp > 0.5 ? 1 : 0); op(zSmall, sp >= 0.5 && gp <= 0.5 ? 1 : 0);
        popSet(zKeep, t, mid('size', 0.82), 1e9, BXc, 452);
        km = 'smug'; kl = -0.4; pm = 'neutral'; pl = -0.7; dm = 'shock'; dl = -0.7;
        if (gp > 0.5) dm = 'happy';
        sg.look = 0.9;
      } else if (t < k('never')) {                         // table
        op(bT, 1);
        tab.cells.forEach((row, r) => row.forEach(c => op(c, r === 0 ? 1 : fin(t, mid('table', [0, 0.1, 0.33, 0.56][r])))));
        tMark.set(fin(t, mid('table', 0.4)));
        km = 'happy'; pm = 'neutral'; dm = 'neutral';
      } else if (t < k('inside')) {                        // never
        op(bN, 1);
        op(nTitle, fin(t, at('never')));
        nRows.forEach((r, i) => op(r, fin(t, mid('never', 0.15 + i * 0.12))));
        nQ.forEach((q, i) => op(q, fin(t, mid('never', 0.5 + i * 0.1))));
        pm = 'smug'; pl = -0.4; plift = 1; km = t > mid('never', 0.6) ? 'deadpan' : 'neutral'; kl = 0.6; dm = 'neutral'; dl = -0.6;
        sg = { mood: t > mid('never', 0.55) ? 'annoyed' : 'deadpan', look: 0.9, glasses: 1 - P(t, mid('never', 0.55), 0.4, ease) };
      } else if (t < k('draw')) {                          // photo
        op(bP, 1);
        op(pr, fin(t, at('photo')));
        op(pGap, fin(t, mid('photo', 0.55)));
        dm = 'smug'; dl = -0.3; dlift = 1; km = t > mid('photo', 0.4) ? 'happy' : 'neutral'; kl = 0.8; pm = t > mid('photo', 0.4) ? 'shock' : 'neutral'; pl = 0.8;
        sg.look = 0.9;
      } else if (t < k('small')) {                         // draw
        op(bD, 1);
        op(dCut, 1); mkDraw(dCut, P(t, mid('draw', 0.2), 0.3, linear));
        op(dRing, 1); mkDraw(dRing, P(t, mid('draw', 0.32), 0.3, linear));
        op(dDec, fin(t, mid('draw', 0.36)));
        RD.tint(i => (i >= 4 && t > mid('draw', 0.2) ? (i === 4 && t > mid('draw', 0.32) ? RED : GREY) : INK));
        op(dRes, fin(t, mid('draw', 0.52)));
        popSet(cDraw, t, mid('draw', 0.72), 1e9, BXc, 494);
        pm = 'smug'; pl = -0.4; plift = 1; km = 'annoyed'; kl = 0.6; dm = 'neutral'; dl = -0.6;
        sg = { mood: 'deadpan', look: 0.9, glasses: 0 };
      } else if (t < k('rule')) {                          // small
        op(bM, 1);
        op(m1st, fin(t, mid('small', 0.2)));
        op(mCut, 1); mkDraw(mCut, P(t, mid('small', 0.42), 0.3, linear));
        op(mRing, 1); mkDraw(mRing, P(t, mid('small', 0.52), 0.3, linear));
        op(mDec, fin(t, mid('small', 0.55)));
        RM.tint(i => (i === 4 && t > mid('small', 0.2) ? PURPLE : i >= 6 && t > mid('small', 0.42) ? (t > mid('small', 0.52) ? RED : GREY) : INK));
        op(mRes, fin(t, mid('small', 0.6)));
        op(mNote, fin(t, mid('small', 0.82)));
        pm = t > mid('small', 0.68) ? 'sad' : 'annoyed'; km = t > mid('small', 0.68) ? 'happy' : 'neutral'; dm = 'neutral';
        sg = { mood: 'deadpan', look: 0.9, glasses: P(t, at('small'), 0.4, ease) };
      } else {                                             // rule
        op(bR, 1);
        op(RR, fin(t, at('rule')));
        op(ruA, fin(t, mid('rule', 0.15))); aA.set(P(t, mid('rule', 0.15), 0.4, linear));
        op(ruB, fin(t, mid('rule', 0.55))); aB.set(P(t, mid('rule', 0.55), 0.4, linear));
        km = 'smug'; kl = 0.4; pm = 'neutral'; pl = -0.7; dm = 'happy'; dl = -0.8;
        sg.look = 0.9;
      }
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
      priya.set({ t, talk: scTalk(S, t, 'priya'), mood: pm, look: pl, lift: plift });
      dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: dl, lift: dlift });
    }

    /* ---------- Q: the queue at the rope ---------- */
    if (sQ && !sE) {
      op(cardL, 1);
      show.priya = 1; tr(priya, 1090, RY, RS);
      const isLead = t >= k('lead');
      let lay, t0, goes, green = [];
      if (!isLead) {
        const isB = t >= mid('inside', 0.55);
        lay = isB ? L300 : L307; t0 = isB ? mid('inside', 0.6) : mid('inside', 0.1);
        goes = [0, 1, 2, 3]; green = isB ? [2, 3] : [2];
        op(qLabA, !isB ? fin(t, mid('inside', 0.3)) : 0);
        op(qLabB, isB ? fin(t, mid('inside', 0.78)) : 0);
        popSet(qChipA, t, mid('inside', 0.36), mid('inside', 0.55), QX, 215);
        popSet(qChipB, t, mid('inside', 0.8), 1e9, QX, 215);
        priya.set({ t, talk: 0, mood: t > mid('inside', 0.3) ? 'annoyed' : 'smug', look: -0.9 });
        sg = { mood: 'deadpan', look: 0.9, glasses: 0 };
      } else {
        lay = L52; t0 = mid('lead', 0.2); goes = [4, 5];
        const ws = P(t, mid('lead', 0.4), 0.35, pop);
        op(waitSign, clamp(ws * 3)); tr(waitSign, (L52[0].x + L52[3].x) / 2, 532, 1, -4 + Math.sin(t * 3) * 2 * AMP);
        popSet(qChipC, t, mid('lead', 0.5), 1e9, QX, 215);
        popSet(qNote, t, mid('lead', 0.72), 1e9, QX + 40, 458);
        priya.set({ t, talk: 0, mood: t > mid('lead', 0.5) ? 'sad' : 'annoyed', look: -0.9 });
        sg = { mood: t > mid('lead', 0.4) ? 'smug' : 'deadpan', look: 0.9, glasses: P(t, at('lead'), 0.4, ease) };
      }
      cards.forEach((cd, i) => {
        const L = lay[i];
        if (!L) { op(cd.g, 0); return; }
        const app = fin(t, (isLead ? at('lead') : (t >= mid('inside', 0.55) ? mid('inside', 0.55) : at('inside'))) + i * 0.06, 0.25);
        const gi = goes.indexOf(i);
        const p = gi < 0 ? 0 : P(t, t0 + gi * 0.16, 0.45, ease);
        const y = lerp(YOUT, YIN, p) - Math.sin(p * Math.PI) * 60;
        op(cd.g, app); tr(cd.g, L.x, y);
        const left = isLead && gi < 0 && t > mid('lead', 0.38);
        const gr = green.includes(i) && t > t0 + gi * 0.16 + 0.3;
        setCard(cd, L.c, L.w, left ? '#D9DEE3' : gr ? '#D8F5E3' : '#FFFFFF', left ? GREY : gr ? GREEN : INK);
      });
    }

    /* ---------- E: the pun ---------- */
    if (sE) {
      op(cardL, 1);
      cards.forEach((cd, i) => {
        const L = L52[i];
        const inside = i >= 4;
        op(cd.g, 1); tr(cd.g, L.x - (inside ? 0 : 40), inside ? YIN : YOUT);
        setCard(cd, L.c, L.w, inside ? '#FFFFFF' : '#D9DEE3', inside ? INK : GREY);
      });
      op(waitSign, 1); tr(waitSign, (L52[0].x + L52[3].x) / 2 - 40, 532, 1, -4);
      show.kav = show.priya = show.tan = 1;
      tr(kav, 805, RY, 0.7); tr(priya, 960, RY, 0.7); tr(tan, 1104, RY, 0.68);
      popSet(cSig, t, mid('pun', 0.3), 1e9, QX + 60, 215);
      const cr = end('pun') + 0.25;
      popSet(cCricket, t, cr, 1e9, 1040, 470);
      popSet(bubRe, t, cr + 0.6, 1e9, 950, 548);
      const flat = t > cr;
      tan.set({ t, talk: scTalk(S, t, 'tan'), mood: 'happy', look: -0.6, lift: 1, still: t > cr + 2 });
      kav.set({ t, talk: 0, mood: flat ? 'deadpan' : 'neutral', look: flat ? 0 : 0.8, still: t > cr + 2 });
      priya.set({ t, talk: 0, mood: t > cr + 0.6 ? 'smug' : flat ? 'deadpan' : 'neutral', look: t > cr + 0.6 ? -0.9 : 0.8, lift: t > cr + 0.6 ? 1 : 0, still: t > cr + 2 });
      sg = { mood: 'deadpan', look: 0, glasses: 1 };
    }

    if (show.sig) sig.set({ t, talk: scTalk(S, t, 'sig'), mood: sg.mood, look: sg.look, glasses: sg.glasses, still: t > end('pun') + 2 });
    op(sig, show.sig); op(tan, show.tan); op(boy, show.boy); op(kav, show.kav); op(priya, show.priya); op(dad, show.dad);
  };
});
