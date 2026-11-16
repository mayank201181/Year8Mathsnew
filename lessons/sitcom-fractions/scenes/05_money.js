/* Scene 5: Grandma's birthday money (fractions of amounts, finding the whole, "of the remainder").
   Shots (hard sitcom cuts):
   A  4 p.m., the party has started at the void deck: kids at the back, everyone in party hats, a bowl of 240 sweets
      -> Mum: 3/5 of them are chocolate.
   B  the paper napkin on the pink tablecloth (cast in the corners): a bar of 5 boxes, 240 ÷ 5 = 48 in each,
      3 boxes go chocolate: 48 × 3 = 144.
   A  Ah Boy holds up his robot: spent 3/8, $15 left. How much did Grandma give?
   B  bar model of 8 boxes: robot 3, $15 over 5 -> 1 box = $3, 8 boxes = $24 -> Vinny: 15 ÷ 5/8 = 15 × 8/5 = 24
      -> the robot cost 3 × $3 = $9; Ah Boy hides it.
   A  Mr Tan arrives (lower third): party games 45 min of the 2-hour party -> Ah Boy: 45/2 ?!
   B  same units first: 2 h = 120 min, 45/120 = 3/8 (÷ 15), a clock ring of 8 fifteen-minute slices, 3 shaded
      -> Mum: 18 kids vs 12: 18/12 = 3/2 = 1 1/2, a fraction can be more than 1.
   A  Dad, fingers in his ears: one and a half times the noise.
   B  Priya's money: 1/3 present, 1/4 of the remainder on bubble tea, $18 left -> bar of 6: tea = 1/4 × 2/3 = 1/6,
      spent 1/3 + 1/6 = 1/2 -> 3 boxes = $18, 1 box = $6, 6 × $6 = $36 -> the present: 2 × $6 = $12.
   A  Priya: "It's the thought that counts." Smug, then avoids his eyes. Hold. */
scene('money', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;
  const talk = (t, who) => scTalk(S, t, who);

  /* ---------- local helpers ---------- */
  const GOLD = '#FFE45C', PINK = '#FF8FC8', RED = '#C62828', GREEN = '#1E9E5A', BLUE = '#2E6FD8', INK = MK.ink, BERRY = '#B8336A';
  const CHOC = '#7A4424', ROBOT = '#FF8A8A', LEFT = '#7FD9A6', TEA = '#C9A27A';
  const chipAt = (parent, text, o) => { o = o || {}; return mkChip(parent, text, Object.assign({ size: 30, col: C.ink }, o)); };
  const popSet = (el, t, t0, x, y) => { el.set(P(t, t0, 0.35, linear)); if (x !== undefined) tr(el, x, y); };
  const fade = (t, t0, d) => P(t, t0, d || 0.3, linear);
  const lookAt = (x, sx) => clamp((sx - x) / 260, -1, 1);
  const outline = (el, col, w) => { el.setAttribute('stroke', col); el.setAttribute('stroke-width', w); el.setAttribute('paint-order', 'stroke'); el.setAttribute('stroke-linejoin', 'round'); return el; };
  const pill = (parent, text, o) => {
    o = o || {};
    const g = G(parent), m = mkText(g, 0, 0, text, { size: o.size || 34, anchor: 'middle', fill: C.ink, boldFill: o.bold || GOLD });
    const w = m.w + 60, h = Math.max(64, m.h + 26);
    const r = E('rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: Math.min(32, h / 2), fill: 'rgba(10,27,39,0.9)', stroke: o.col || GOLD, 'stroke-width': 3 }, g);
    g.insertBefore(r, m); tr(m, 0, -m.top - m.h / 2);
    return g;
  };
  const paper = (parent, x, y, w, h) => { const g = G(parent); E('rect', { x: x + 6, y: y + 8, width: w, height: h, rx: 18, fill: 'rgba(90,20,50,0.18)' }, g); E('rect', { x, y, width: w, height: h, rx: 18, fill: MK.paper, stroke: BERRY, 'stroke-width': 4 }, g); return g; };
  /* a bar of n equal boxes, left edge x0, top y0; g.box[i] = { fill rect, x, cx }; g.tint(i, col, p) overlays a colour */
  function bar(parent, x0, y0, n, u, h) {
    const g = G(parent); g.box = [];
    for (let i = 0; i < n; i++) {
      const bg = E('rect', { x: x0 + i * u, y: y0, width: u, height: h, fill: '#FFFFFF' }, g);
      const tint = E('rect', { x: x0 + i * u, y: y0, width: u, height: h, fill: '#FFFFFF' }, g);
      op(tint, 0);
      g.box.push({ bg, tint, x: x0 + i * u, cx: x0 + (i + 0.5) * u });
    }
    let d = ''; for (let i = 1; i < n; i++) d += `M${x0 + i * u},${y0} L${x0 + i * u},${y0 + h} `;
    E('path', { d, stroke: INK, 'stroke-width': 3 }, g);
    E('rect', { x: x0, y: y0, width: n * u, height: h, fill: 'none', stroke: INK, 'stroke-width': 4 }, g);
    g.labels = G(g);
    g.tint = (i, col, p) => { const b = g.box[i]; attr(b.tint, 'fill', col); op(b.tint, p); };
    g.x0 = x0; g.y0 = y0; g.u = u; g.h = h; g.n = n;
    return g;
  }
  const boxLabels = (b, texts, o) => texts.map((s, i) => s ? mkText(b.labels, b.box[i].cx, b.y0 + b.h / 2 + (o.size || 30) * 0.36, s, { size: o.size || 30, anchor: 'middle', fill: o.fill || INK }) : null);
  const ring = (parent, x, y, w, h) => { const r = E('rect', { x, y, width: w, height: h, rx: 8, fill: 'none', stroke: '#FFB800', 'stroke-width': 7 }, parent); op(r, 0); return r; };
  // a little kid at the back of the party (silhouette with a party hat): feet at (0,0)
  function kid(parent, col, hat) {
    const g = G(parent);
    E('path', { d: 'M-20,0 L-16,-58 Q0,-70 16,-58 L20,0 Z', fill: col, opacity: 0.85 }, g);
    E('circle', { cx: 0, cy: -80, r: 17, fill: '#C79A78' }, g);
    E('path', { d: 'M-12,-94 L2,-130 L13,-94 Z', fill: hat }, g);
    return g;
  }
  // a kid icon for the 18 vs 12 rows
  function kidIcon(parent, x, y, col) {
    return E('path', { d: 'M-11,14 Q-11,-2 0,-2 Q11,-2 11,14 Z M0,-6 m-8,0 a8,8 0 1 0 16,0 a8,8 0 1 0 -16,0', fill: col, stroke: INK, 'stroke-width': 2, transform: `translate(${x} ${y})` }, parent);
  }

  /* ---------- layers ---------- */
  const Lbg = G(root), Lins = G(root), Lcast = G(root), Lfront = G(root), Ltop = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= A: the party ================= */
  const voidShot = G(Lbg);
  const vd = fcVoid(voidShot);
  const kidsG = G(voidShot);
  const KIDS = [[212, '#6E7FA3', '#FF5FA2'], [402, '#9C6FA8', '#FFC247'], [590, '#5E9C8C', '#4CC9F0'], [786, '#A87A5E', '#56D69B'], [976, '#6E8FA3', '#B48CFF']];
  const kids = KIDS.map(([x, c, h]) => { const k = kid(kidsG, c, h); k.x = x; return k; });
  Lfront.appendChild(vd.front);
  const tableTop = G(Ltop);
  // the bowl of 240 sweets
  const bowl = G(tableTop); tr(bowl, 595, 558);
  { const r = rng(5), SW = ['#FF5FA2', '#FFE45C', '#4CC9F0', '#7A4424', '#56D69B'];
    let d = ['', '', '', '', ''];
    for (let i = 0; i < 34; i++) { const x = -70 + r() * 140, y = -30 - r() * 34 * (1 - Math.abs(x) / 90); d[i % 5] += `M${(x - 6).toFixed(1)},${y.toFixed(1)} a6,6 0 1 0 12,0 a6,6 0 1 0 -12,0 `; }
    d.forEach((dd, i) => E('path', { d: dd, fill: SW[i], stroke: INK, 'stroke-width': 1.5 }, bowl)); }
  E('path', { d: 'M-88,-30 Q-80,10 0,12 Q80,10 88,-30 Z', fill: '#FFFFFF', stroke: INK, 'stroke-width': 4 }, bowl);
  E('path', { d: 'M-70,-14 Q0,0 70,-14', fill: 'none', stroke: '#4CC9F0', 'stroke-width': 6 }, bowl);
  [[392, '#FF5FA2'], [792, '#4CC9F0']].forEach(([x, c]) => { const cp = fcCup(tableTop, { col: c, s: 0.55 }); tr(cp, x, 560); });
  [[205, '#FFC247'], [985, '#B48CFF']].forEach(([x, c]) => { const gb = fcGoodieBag(tableTop, c, { s: 0.6 }); tr(gb, x, 562); });
  const c4pm = chipAt(Lfg, '**4 p.m.**', { col: GOLD, size: 32 });
  const c18 = chipAt(Lfg, '**18** kids', { col: PINK, size: 32 });
  const c240 = chipAt(Lfg, '**240** sweets', { col: GOLD, size: 32 });
  const pChoc = pill(Lfg, '{{3/5}} of the sweets are **chocolate**. How many?', { size: 32 });
  const cSpent = chipAt(Lfg, 'spent {{3/8}} on a **robot**', { col: ROBOT, size: 30 });
  const cLeft = chipAt(Lfg, '**$15** left', { col: LEFT, size: 32 });
  const pGave = pill(Lfg, 'How much did **Grandma** give me?', { size: 32 });
  const pGames = pill(Lfg, 'Party games: **45 minutes**', { size: 32 });
  const pParty = pill(Lfg, 'the party: **2 hours**', { size: 32, col: '#9FD8FF', bold: '#9FD8FF' });
  const halvesG = G(Lfg);
  { E('rect', { x: -110, y: -58, width: 220, height: 116, rx: 18, fill: 'rgba(10,27,39,0.9)', stroke: '#FF8A8A', 'stroke-width': 3 }, halvesG);
    mkMath(halvesG, -26, 14, '45/2', { size: 50, anchor: 'middle', fill: '#FF8A8A' });
    outline(T(halvesG, 50, 22, '?!', { size: 58, weight: 800, anchor: 'middle', fill: '#FF8A8A' }), '#0A1B27', 4); }
  const cNoise = chipAt(Lfg, '{{1 1/2}} × the **noise**', { col: '#FF8A8A', size: 32 });
  const noiseG = G(Lfg);
  const noiseArcs = [0, 1, 2].map(i => E('path', { d: `M0,${-30 - i * 22} A${40 + i * 24},${40 + i * 24} 0 0 1 0,${30 + i * 22}`, fill: 'none', stroke: '#E8424F', 'stroke-width': 6, 'stroke-linecap': 'round' }, noiseG));
  const thoughtChip = chipAt(Lfg, "It's the **thought** that counts", { col: '#B48CFF', size: 30 });

  /* ================= B: the napkin on the tablecloth ================= */
  const overShot = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#F59CC4' }, overShot);
  { let d = ''; for (let y = 24, r = 0; y < 760; y += 52, r++) for (let x = r % 2 ? 26 : 0; x < 1230; x += 52) d += `M${x - 5},${y} a5,5 0 1 0 10,0 a5,5 0 1 0 -10,0 `;
    E('path', { d, fill: '#FFFFFF', opacity: 0.32 }, overShot); }
  const board = G(Lins);
  paper(board, 230, 120, 940, 420);

  // B1: 3/5 of 240
  const b1 = G(board);
  mkText(b1, 700, 182, '{{3/5}} of **240** sweets', { size: 42, anchor: 'middle', fill: INK, boldFill: BERRY });
  const bar5 = bar(b1, 375, 290, 5, 130, 76);
  const b5Top = mkBrace(b1, 375, 280, 1025, 280, { text: '**240**', col: INK, size: 32 });
  const lab48 = boxLabels(bar5, ['48', '48', '48', '48', '48'], { size: 36 });
  const lab48w = boxLabels(bar5, ['48', '48', '48', '', ''], { size: 36, fill: '#FFFFFF' });
  const b5Bot = mkBrace(b1, 375, 376, 765, 376, { text: '**144** chocolate', col: CHOC, size: 30, flip: true });
  const w1 = mkWorking(b1, 700, 440, ['240 ÷ 5 = 48', '48 × 3 = 144'], { size: 40, fill: INK, gap: 14 });
  // move the working right so the brace label below the bar stays clear
  tr(w1, 160, 0);
  const cRule = chipAt(Lfg, 'divide by the **bottom**, times the **top**', { col: GOLD, size: 30 });

  // B2: Grandma's money
  const b2 = G(board);
  mkText(b2, 700, 176, "Grandma's money: **8** equal boxes", { size: 36, anchor: 'middle', fill: INK, boldFill: BERRY });
  const bar8 = bar(b2, 340, 272, 8, 90, 72);
  const lab8 = boxLabels(bar8, ['$3', '$3', '$3', '$3', '$3', '$3', '$3', '$3'], { size: 32 });
  const b8Left = mkBrace(b2, 610, 262, 1060, 262, { text: '**$15** left', col: GREEN, size: 30 });
  const b8Robot = mkBrace(b2, 340, 354, 610, 354, { text: 'robot: {{3/8}}', col: RED, size: 30, flip: true });
  const b8All = mkBrace(b2, 340, 354, 1060, 354, { text: '**8** boxes: **$24**', col: BLUE, size: 30, flip: true });
  const b8Cost = mkBrace(b2, 340, 354, 610, 354, { text: '3 × $3 = **$9**', col: RED, size: 30, flip: true });
  const robotRing = ring(b2, 334, 266, 282, 84);
  const t5 = mkText(b2, 700, 488, '**5** boxes = **$15**', { size: 40, anchor: 'middle', fill: INK, boldFill: GREEN });
  const t1box = mkText(b2, 500, 488, '**1** box = **$3**', { size: 40, anchor: 'middle', fill: INK, boldFill: GREEN });
  const t8box = mkText(b2, 900, 488, '**8** boxes = **$24**', { size: 40, anchor: 'middle', fill: INK, boldFill: BLUE });
  const mStep = mkMath(b2, 700, 488, '15 ÷ 5/8 = 15 × 8/5 = 24', { size: 52, anchor: 'middle', fill: INK });
  const cWhole = chipAt(Lfg, '**whole** = part ÷ fraction', { col: GOLD, size: 30 });

  // B3: same units first
  const b3 = G(board);
  const unitsHead = mkText(b3, 700, 182, '**Same units first!**', { size: 42, anchor: 'middle', fill: GREEN });
  const tHours = mkText(b3, 520, 262, '2 hours = **120** minutes', { size: 36, anchor: 'middle', fill: INK, boldFill: BLUE });
  const f45 = mkMath(b3, 400, 420, '45/120', { size: 76, anchor: 'middle', fill: INK });
  const fEq = T(b3, 520, 428, '=', { size: 70, weight: 700, anchor: 'middle', fill: INK });
  const f38 = mkMath(b3, 620, 420, '3/8', { size: 76, anchor: 'middle', fill: GREEN });
  const arTop = arrow(b3, 440, 340, 600, 340, { color: BERRY, width: 4, bend: -40 });
  const arBot = arrow(b3, 440, 486, 600, 486, { color: BERRY, width: 4, bend: 40 });
  const dvTop = mkText(b3, 520, 312, '÷ 15', { size: 30, anchor: 'middle', fill: BERRY });
  const dvBot = mkText(b3, 520, 534, '÷ 15', { size: 30, anchor: 'middle', fill: BERRY });
  const clk = G(b3); tr(clk, 950, 330);
  const pie8 = mkPie(clk, [1, 1, 1, 1, 1, 1, 1, 1], { r: 120, cols: ['#FFC247', '#FFC247', '#FFC247', '#EAF2F7', '#EAF2F7', '#EAF2F7', '#EAF2F7', '#EAF2F7'], stroke: INK });
  E('circle', { r: 8, fill: INK }, clk);
  const clkLab = mkText(b3, 950, 506, 'each slice = **15** min', { size: 28, anchor: 'middle', fill: INK, boldFill: BLUE });
  const clkGames = mkText(clk, 128, -98, '**games**', { size: 28, anchor: 'start', fill: '#B57B12' });

  // B4: 18 kids vs 12
  const b4 = G(board);
  mkText(b4, 700, 176, 'Kids at the party', { size: 36, anchor: 'middle', fill: INK });
  const rowA = G(b4), rowB = G(b4);
  mkText(rowA, 450, 254, 'this year', { size: 30, anchor: 'end', fill: INK });
  mkText(rowB, 450, 324, 'last year', { size: 30, anchor: 'end', fill: INK });
  const iconsA = [], iconsB = [];
  for (let i = 0; i < 18; i++) iconsA.push(kidIcon(rowA, 482 + i * 34, 244, '#FF8FC8'));
  for (let i = 0; i < 12; i++) iconsB.push(kidIcon(rowB, 482 + i * 34, 314, '#9FD8FF'));
  const nA = mkText(rowA, 1086, 256, '**18**', { size: 34, anchor: 'start', fill: BERRY });
  const nB = mkText(rowB, 1086, 326, '**12**', { size: 34, anchor: 'start', fill: BLUE });
  const mMore = mkMath(b4, 700, 462, '18/12 = 3/2 = 1 1/2', { size: 64, anchor: 'middle', fill: INK });
  const moreRing = E('rect', { x: 0, y: 0, width: 1, height: 1, rx: 10, fill: 'none', stroke: GREEN, 'stroke-width': 5 }, b4);
  const cMore = chipAt(Lfg, 'a fraction can be **more than 1**', { col: GOLD, size: 30 });

  // B5: Priya's money
  const b5 = G(board);
  const remHead = mkText(b5, 700, 176, "Priya's money", { size: 38, anchor: 'middle', fill: INK });
  const list = [
    mkText(b5, 330, 262, '{{1/3}} on Ah Boy\'s **present**', { size: 36, fill: INK, boldFill: BERRY }),
    mkText(b5, 330, 350, 'then {{1/4}} of the **remainder** on bubble tea', { size: 36, fill: INK, boldFill: '#8A5A20' }),
    mkText(b5, 330, 438, '**$18** left', { size: 36, fill: INK, boldFill: GREEN }),
  ];
  const remG = G(b5);
  const bar6 = bar(remG, 370, 290, 6, 110, 72);
  const lab6a = boxLabels(bar6, ['present', 'present', 'tea', '', '', ''], { size: 27 });
  const lab6b = boxLabels(bar6, ['$6', '$6', '$6', '$6', '$6', '$6'], { size: 32 });
  const brPres = mkBrace(remG, 370, 280, 590, 280, { text: '{{1/3}}', col: BERRY, size: 28 });
  const brRem = mkBrace(remG, 590, 280, 1030, 280, { text: 'the **remainder**: {{2/3}}', col: '#5A4A52', size: 28 });
  const brLeft = mkBrace(remG, 700, 280, 1030, 280, { text: '**$18** left', col: GREEN, size: 30 });
  const brPresB = mkBrace(remG, 370, 372, 590, 372, { text: '2 × $6 = **$12**', col: BERRY, size: 30, flip: true });
  const presRing = ring(remG, 364, 284, 232, 84);
  const wRem = { g: [mkMath(remG, 500, 452, '1/4 × 2/3 = 1/6', { size: 46, anchor: 'middle', fill: INK }), mkMath(remG, 880, 452, '1/3 + 1/6 = 3/6 = 1/2', { size: 46, anchor: 'middle', fill: INK })],
    n: [mkText(remG, 500, 526, '**bubble tea**', { size: 28, anchor: 'middle', fill: '#8A5A20' }), mkText(remG, 880, 526, '**spent**', { size: 28, anchor: 'middle', fill: BERRY })] };
  wRem.show = (i, p) => { op(wRem.g[i], p); op(wRem.n[i], p); };
  const spentRing = E('rect', { x: 0, y: 0, width: 1, height: 1, rx: 10, fill: 'none', stroke: GREEN, 'stroke-width': 5 }, remG);
  const t18 = mkText(remG, 700, 466, '{{1/2}} = **3** boxes = **$18**, so **1** box = **$6**', { size: 34, anchor: 'middle', fill: INK, boldFill: GREEN });
  const t36 = mkText(remG, 700, 526, '**6** boxes = 6 × $6 = **$36**', { size: 38, anchor: 'middle', fill: INK, boldFill: BLUE });

  /* ================= the cast ================= */
  const kav = cast(Lcast, 'kavya');
  const priya = cast(Lcast, 'priya', { hat: '#B48CFF', hand: true });
  const mum = cast(Lcast, 'mum', { hat: '#FF5FA2', prop: 'paper' });
  const dad = cast(Lcast, 'dad', { hat: '#56D69B', prop: null });
  const boy = cast(Lcast, 'boy', { hat: '#4CC9F0' });
  const tan = cast(Lcast, 'tan', { hat: '#FFC247', hand: true });
  const vin = cast(Lcast, 'vinny');
  // Kavya's party hat (scKavya has no hat option)
  const kavHat = fcHat(kav.firstChild, '#FFE45C'); tr(kavHat, 14, -116, 0.9, 12);
  // Ah Boy's robot
  const robot = G(boy.hand); tr(robot, 0, -8, 1, 8);
  E('rect', { x: -26, y: -74, width: 52, height: 56, rx: 8, fill: '#9AA6B2', stroke: SC_INK, 'stroke-width': 3.5 }, robot);
  E('rect', { x: -21, y: -118, width: 42, height: 38, rx: 7, fill: '#BFC9D3', stroke: SC_INK, 'stroke-width': 3.5 }, robot);
  E('path', { d: 'M0,-118 L0,-132', stroke: SC_INK, 'stroke-width': 3 }, robot);
  E('circle', { cx: 0, cy: -136, r: 5, fill: '#E8424F', stroke: SC_INK, 'stroke-width': 2 }, robot);
  E('path', { d: 'M-12,-102 a5,5 0 1 0 10,0 a5,5 0 1 0 -10,0 M4,-102 a5,5 0 1 0 10,0 a5,5 0 1 0 -10,0', fill: '#4CC9F0', stroke: SC_INK, 'stroke-width': 2 }, robot);
  E('rect', { x: -12, y: -60, width: 24, height: 16, rx: 3, fill: '#FFE45C', stroke: SC_INK, 'stroke-width': 2 }, robot);
  // Priya's purse
  const purse = G(priya.hand); tr(purse, 0, -10, 1, 6);
  E('rect', { x: -40, y: -62, width: 80, height: 54, rx: 10, fill: '#8E5BD8', stroke: SC_INK, 'stroke-width': 3.5 }, purse);
  E('path', { d: 'M-40,-46 L40,-46', stroke: SC_INK, 'stroke-width': 3 }, purse);
  E('circle', { cx: 0, cy: -46, r: 6, fill: '#FFE45C', stroke: SC_INK, 'stroke-width': 2 }, purse);
  // Mr Tan's clipboard
  const clip = G(tan.hand); tr(clip, 0, -14, 0.55, 4);
  scClipboard(clip, 1);
  // Dad's hands over his ears
  const ears = G(Lfg);
  [-1, 1].forEach(s => {
    E('path', { d: `M${s * 112},150 Q${s * 118},60 ${s * 90},14`, fill: 'none', stroke: '#3D8B6E', 'stroke-width': 30, 'stroke-linecap': 'round' }, ears);   // sleeve
    E('path', { d: `M${s * 112},150 Q${s * 118},60 ${s * 90},14`, fill: 'none', stroke: SC_SKIN.deep, 'stroke-width': 22, 'stroke-linecap': 'round', 'stroke-dasharray': '0 70 200' }, ears);
    E('ellipse', { cx: s * 80, cy: 0, rx: 24, ry: 34, fill: SC_SKIN.deep, stroke: SC_INK, 'stroke-width': 3.5 }, ears);
    E('path', { d: `M${s * 66},-26 L${s * 64},-2 M${s * 78},-32 L${s * 76},-4 M${s * 90},-28 L${s * 88},-2`, stroke: SC_INK, 'stroke-width': 2.5, 'stroke-linecap': 'round' }, ears);
  });
  // Ah Boy's party blower (the noise)
  const hornW = G(Lfg), horn = fcHorn(hornW);
  const ltTan = fcLowerThird(Lhud, 'tan');
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* ---------- shots ---------- */
  const cut = id => at(id) - 0.06;
  const SHOTS = [['A1', -9], ['B1', cut('divmul')], ['A2', cut('robot')], ['B2', cut('bars')], ['A3', cut('tan')], ['B3', cut('units')],
    ['A4', cut('noise')], ['B5', cut('rem')], ['A5', cut('thought')]];
  const shotAt = t => { let s = 'A1'; for (const [k, t0] of SHOTS) if (t >= t0) s = k; return s; };
  // wide: everyone behind the party table
  const WX = { kav: 115, priya: 300, mum: 490, dad: 700, boy: 885, tan: 1075 }, WY = 452, WS = 0.88;
  const SL = [125, 640], SR = [1078, 646], SS = 0.72;
  const SPK = { kavya: 'kav', priya: 'priya', mum: 'mum', dad: 'dad', boy: 'boy', tan: 'tan' };

  return t => {
    const sh = shotAt(t), who = scWho(S, t);
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const wide = sh[0] === 'A';
    op(voidShot, wide ? 1 : 0); op(vd.front, wide ? 1 : 0); op(tableTop, wide ? 1 : 0); op(overShot, wide ? 0 : 1); op(board, wide ? 0 : 1);
    vd.upd(t * AMP);
    kids.forEach((k, i) => tr(k, k.x, 548 - Math.abs(Math.sin(t * 2.6 * AMP + i * 1.7)) * 12 * AMP, 0.9));
    [c4pm, c18, c240, cSpent, cLeft, cNoise, thoughtChip, cRule, cWhole, cMore].forEach(c => c.set(0));
    [pChoc, pGave, pGames, pParty, halvesG, noiseG, ears, hornW].forEach(p => op(p, 0));
    ltTan.set(0);
    const shown = { kav: 0, priya: 0, mum: 0, dad: 0, boy: 0, tan: 0, vin: 0 };
    op(robot, 0); op(purse, 0); op(clip, 0);
    const show = (key, c, x, y, s, st) => { shown[key] = 1; c.set(Object.assign({ t }, st)); tr(c, x, y, s); };

    /* ---------- A: the party table ---------- */
    if (wide) {
      const spKey = SPK[who] || 'mum', spk = WX[spKey];
      const tanIn = sh !== 'A1' && sh !== 'A2';
      let km = 'neutral', pm = 'happy', mm = 'happy', dm = 'happy', bm = 'happy', tm = 'happy';
      if (sh === 'A1') { km = t > at('choc') ? 'neutral' : 'happy'; pm = 'smug'; dm = 'happy'; }
      else if (sh === 'A2') { km = 'neutral'; pm = 'neutral'; mm = 'neutral'; dm = 'smug'; bm = 'happy'; }
      else if (sh === 'A3') {
        const inH = t >= at('halves');
        km = inH ? 'deadpan' : 'neutral'; pm = inH ? 'shock' : 'neutral'; mm = inH ? 'deadpan' : 'happy'; dm = inH ? 'shock' : 'neutral'; bm = inH ? 'happy' : 'neutral'; tm = inH ? 'shock' : 'happy';
      } else if (sh === 'A4') { km = 'happy'; pm = 'happy'; mm = 'happy'; dm = 'annoyed'; bm = 'happy'; tm = 'happy'; }
      else { km = 'deadpan'; pm = t < mid('thought', 0.55) ? 'smug' : 'neutral'; mm = 'deadpan'; dm = 'deadpan'; bm = 'deadpan'; tm = 'deadpan'; }
      const pLook = sh === 'A5' ? (t < mid('thought', 0.55) ? 1 : -1) : lookAt(WX.priya, spk);
      show('kav', kav, WX.kav, WY, WS, { talk: talk(t, 'kavya'), mood: km, look: sh === 'A5' ? 1 : lookAt(WX.kav, spk) });
      show('priya', priya, WX.priya, WY, WS, { talk: talk(t, 'priya'), mood: pm, look: pLook, lift: sh === 'A5' && t < mid('thought', 0.55) ? 1 : 0 });
      op(purse, sh === 'A5' ? 1 : 0);
      show('mum', mum, WX.mum, WY - 6, WS, { talk: talk(t, 'mum'), mood: mm, look: lookAt(WX.mum, spk), lift: sh === 'A1' && t > at('choc') ? 1 : 0 });
      show('dad', dad, WX.dad, WY - 6, WS, { talk: talk(t, 'dad'), mood: dm, look: sh === 'A4' ? 0 : lookAt(WX.dad, spk) });
      show('boy', boy, WX.boy, WY + 12, WS, { talk: sh === 'A4' ? 0.6 : talk(t, 'boy'), mood: bm, look: sh === 'A5' ? -1 : lookAt(WX.boy, spk), lift: sh === 'A2' || (sh === 'A3' && t >= at('halves')) ? 1 : 0 });
      op(robot, sh === 'A2' ? 1 : 0);
      if (tanIn) {
        const inP = sh === 'A3' ? P(t, at('tan') - 0.2, 0.45, easeOut) : 1;
        show('tan', tan, lerp(1320, WX.tan, inP), WY - 8, WS, { talk: talk(t, 'tan'), mood: tm, look: lookAt(WX.tan, spk), lift: sh === 'A3' && t < at('halves') ? 1 : 0 });
        op(clip, sh === 'A3' && t < at('halves') ? 1 : 0);
      }
      if (sh === 'A1') {
        const inC = t >= at('choc');
        if (!inC) {
          popSet(c4pm, t, at('four') + 0.1, 600, 228);
          popSet(c18, t, mid('four', 0.45), 360, 632);
          popSet(c240, t, mid('four', 0.75), 840, 632);
        } else {
          c240.set(1); tr(c240, 840, 632);
          op(pChoc, fade(t, at('choc') + 0.05)); tr(pChoc, 600, 228);
        }
      }
      if (sh === 'A2') {
        popSet(cSpent, t, mid('robot', 0.3), 420, 632);
        popSet(cLeft, t, mid('robot', 0.52), 780, 632);
        op(pGave, fade(t, mid('robot', 0.68))); tr(pGave, 600, 228);
      }
      if (sh === 'A3') {
        ltTan.set(win(t, at('tan') + 0.3, at('tan') + 3.3, 0.3));
        if (t < at('halves')) {
          op(pGames, fade(t, mid('tan', 0.6))); tr(pGames, 420, 632);
          op(pParty, fade(t, mid('tan', 0.82))); tr(pParty, 820, 632);
        } else {
          const p = P(t, at('halves') + 0.05, 0.35, pop);
          op(halvesG, clamp(p * 3)); tr(halvesG, 885, 632, Math.max(0.01, 0.7 + 0.3 * p));
        }
      }
      if (sh === 'A4') {
        op(ears, 1); tr(ears, WX.dad, WY - 6 + dad.head[1] * WS + 12 + Math.sin(t * 9) * 1.5 * AMP, WS);
        op(noiseG, 1); noiseG.setAttribute('transform', `translate(${WX.boy - 62} 372) scale(-0.6 0.6)`);
        op(hornW, 1); hornW.setAttribute('transform', `translate(${WX.boy - 6} ${WY + 12 + 40 * WS}) scale(-0.8 0.8) rotate(-14)`); horn.set(0.75 + 0.25 * Math.sin(t * 10 * AMP));
        noiseArcs.forEach((a, i) => op(a, 0.35 + 0.65 * wave(t * AMP, 0.5, -i * 0.18)));
        popSet(cNoise, t, at('noise') + 0.15, 600, 632);
      }
      if (sh === 'A5') popSet(thoughtChip, t, at('thought') + 0.1, 600, 632);
    }

    /* ---------- B: the napkin ---------- */
    if (!wide) {
      op(b1, sh === 'B1' ? 1 : 0); op(b2, sh === 'B2' ? 1 : 0); op(b3, sh === 'B3' && t < at('more') ? 1 : 0); op(b4, sh === 'B3' && t >= at('more') ? 1 : 0); op(b5, sh === 'B5' ? 1 : 0);
      if (sh === 'B1') {
        bar5.box.forEach((b, i) => bar5.tint(i, CHOC, fade(t, mid('divmul', 0.66) + i * 0.15, 0.25) * (i < 3 ? 1 : 0)));
        b5Top.set(fade(t, at('divmul') + 0.1));
        lab48.forEach((l, i) => { const w = i < 3 ? fade(t, mid('divmul', 0.66) + i * 0.15, 0.25) : 0; op(l, fade(t, mid('divmul', 0.3) + i * 0.1, 0.2) * (1 - w)); if (lab48w[i]) op(lab48w[i], w); });
        w1.show(0, fade(t, mid('divmul', 0.22))); w1.show(1, fade(t, mid('divmul', 0.62)));
        w1.ring(1, fade(t, mid('divmul', 0.9)));
        b5Bot.set(fade(t, mid('divmul', 0.9)));
        popSet(cRule, t, mid('divmul', 0.08), 650, 616);
        show('kav', kav, SL[0], SL[1], SS, { talk: talk(t, 'kavya'), mood: t > mid('divmul', 0.9) ? 'smug' : 'neutral', look: 0.8 });
        show('mum', mum, SR[0], SR[1] - 4, SS, { talk: 0, mood: 'happy', look: -0.8 });
      }
      if (sh === 'B2') {
        const L = t < at('onebox') ? 'bars' : t < at('step') ? 'onebox' : t < at('cost') ? 'step' : 'cost';
        bar8.box.forEach((b, i) => bar8.tint(i, i < 3 ? ROBOT : LEFT, i < 3 ? fade(t, mid('bars', 0.4)) : fade(t, mid('bars', 0.6))));
        b8Robot.set(L === 'bars' ? fade(t, mid('bars', 0.4)) : 0);
        b8Left.set(fade(t, mid('bars', 0.6)));
        op(t5, L === 'bars' ? fade(t, mid('bars', 0.72)) : 0);
        lab8.forEach((l, i) => op(l, L === 'bars' ? 0 : L === 'onebox' ? fade(t, mid('onebox', 0.28) + (i < 3 ? 0.5 : 0) + (i % 5) * 0.08, 0.2) : 1));
        op(t1box, L === 'onebox' ? fade(t, mid('onebox', 0.25)) : 0);
        op(t8box, L === 'onebox' ? fade(t, mid('onebox', 0.66)) : 0);
        b8All.set(L === 'onebox' ? fade(t, mid('onebox', 0.7)) : L === 'step' ? 1 : 0);
        op(mStep, L === 'step' ? fade(t, at('step') + 0.1) : L === 'cost' ? 1 : 0);
        if (L === 'step') popSet(cWhole, t, mid('step', 0.6), 650, 616);
        b8Cost.set(L === 'cost' ? fade(t, mid('cost', 0.2)) : 0);
        op(robotRing, L === 'cost' ? fade(t, at('cost') + 0.1) : 0);
        if (L === 'bars' || L === 'onebox') {
          show('kav', kav, SL[0], SL[1], SS, { talk: talk(t, 'kavya'), mood: L === 'onebox' && t > mid('onebox', 0.7) ? 'smug' : 'neutral', look: 0.8 });
          show('boy', boy, SR[0], SR[1] + 6, SS, { talk: 0, mood: L === 'onebox' && t > mid('onebox', 0.7) ? 'shock' : 'neutral', look: -0.8 });
        } else if (L === 'step') {
          show('vin', vin, SL[0] + 20, 606, 0.62, { talk: talk(t, 'vinny'), mood: 'smug', look: 0.6 });
          show('kav', kav, SR[0], SR[1], SS, { talk: 0, mood: 'happy', look: -0.8 });
        } else {
          // Ah Boy hides the robot behind his back
          const hide = P(t, mid('cost', 0.55), 0.3, ease);
          show('boy', boy, SL[0], SL[1] + 6, SS, { talk: talk(t, 'boy'), mood: hide > 0.5 ? 'smug' : 'happy', look: hide > 0.5 ? 0 : 0.8, lift: hide < 0.5 ? 1 : 0 });
          op(robot, 1 - hide);
          show('kav', kav, SR[0], SR[1], SS, { talk: 0, mood: t > mid('cost', 0.6) ? 'deadpan' : 'neutral', look: -0.8 });
        }
      }
      if (sh === 'B3' && t < at('more')) {
        op(unitsHead, fade(t, at('units') + 0.05));
        op(tHours, fade(t, mid('units', 0.25)));
        op(f45, fade(t, mid('units', 0.5))); op(fEq, fade(t, mid('units', 0.66))); op(f38, fade(t, mid('units', 0.8)));
        arTop.set(P(t, mid('units', 0.62), 0.35, linear)); arBot.set(P(t, mid('units', 0.66), 0.35, linear));
        op(dvTop, fade(t, mid('units', 0.66))); op(dvBot, fade(t, mid('units', 0.7)));
        pie8.set(P(t, mid('units', 0.3), 0.6, linear)); op(clkLab, fade(t, mid('units', 0.45)));
        op(clkGames, fade(t, mid('units', 0.85)));
        show('kav', kav, SL[0], SL[1], SS, { talk: talk(t, 'kavya'), mood: t > mid('units', 0.85) ? 'smug' : 'neutral', look: 0.8 });
        show('boy', boy, SR[0], SR[1] + 6, SS, { talk: 0, mood: t > mid('units', 0.5) ? 'shock' : 'neutral', look: -0.8 });
      }
      if (sh === 'B3' && t >= at('more')) {
        iconsA.forEach((ic, i) => op(ic, fade(t, at('more') + 0.1 + i * 0.05, 0.15)));
        iconsB.forEach((ic, i) => op(ic, fade(t, mid('more', 0.25) + i * 0.05, 0.15)));
        op(nA, fade(t, at('more') + 0.9)); op(nB, fade(t, mid('more', 0.25) + 0.6));
        op(mMore, fade(t, mid('more', 0.45)));
        attr(moreRing, 'x', mMore.x0 + mMore.w - 100); attr(moreRing, 'y', 462 - mMore.a - 8); attr(moreRing, 'width', 112); attr(moreRing, 'height', mMore.a + mMore.d + 16);
        op(moreRing, fade(t, mid('more', 0.75)));
        popSet(cMore, t, mid('more', 0.78), 650, 616);
        show('mum', mum, SL[0], SL[1] - 4, SS, { talk: talk(t, 'mum'), mood: 'happy', look: 0.8 });
        show('dad', dad, SR[0], SR[1] - 4, SS, { talk: 0, mood: t > mid('more', 0.6) ? 'shock' : 'neutral', look: -0.8 });
      }
      if (sh === 'B5') {
        const L = t < at('rem2') ? 'rem' : t < at('rem3') ? 'rem2' : t < at('present') ? 'rem3' : 'present';
        op(remHead, 1);
        list.forEach((l, i) => op(l, L === 'rem' ? fade(t, at('rem') + 0.2 + [0, 1.6, 3.9][i]) : 0));
        op(remG, L === 'rem' ? 0 : 1);
        if (L !== 'rem') {
          const inR3 = L === 'rem3' || L === 'present';
          bar6.tint(0, PINK, 1); bar6.tint(1, PINK, 1);
          bar6.tint(2, TEA, L === 'rem2' ? fade(t, mid('rem2', 0.3)) : 1);
          [3, 4, 5].forEach(i => bar6.tint(i, LEFT, inR3 ? fade(t, at('rem3') + 0.1) : 0));
          lab6a.forEach(l => l && op(l, inR3 ? 1 - fade(t, mid('rem3', 0.35)) : 1));
          op(lab6a[2], L === 'rem2' ? fade(t, mid('rem2', 0.3)) : inR3 ? 1 - fade(t, mid('rem3', 0.35)) : 0);
          lab6b.forEach(l => op(l, inR3 ? fade(t, mid('rem3', 0.4)) : 0));
          brPres.set(L === 'rem2' ? fade(t, at('rem2') + 0.1) : 0);
          brRem.set(L === 'rem2' ? fade(t, mid('rem2', 0.12)) : 0);
          brLeft.set(inR3 ? fade(t, at('rem3') + 0.1) : 0);
          wRem.show(0, L === 'rem2' ? fade(t, mid('rem2', 0.35)) : 0);
          wRem.show(1, L === 'rem2' ? fade(t, mid('rem2', 0.7)) : 0);
          { const m = wRem.g[1]; const wh = mkMeasure('1/2', { size: 46 }).w; attr(spentRing, 'x', m.x0 + m.w - wh - 3); attr(spentRing, 'y', 452 - m.a - 8); attr(spentRing, 'width', wh + 8); attr(spentRing, 'height', m.a + m.d + 16); }
          op(spentRing, L === 'rem2' ? fade(t, mid('rem2', 0.92)) : 0);
          op(t18, L === 'rem3' ? fade(t, at('rem3') + 0.15) : 0);
          op(t36, inR3 ? fade(t, mid('rem3', 0.7)) : 0);
          op(presRing, L === 'present' ? fade(t, at('present') + 0.05) : 0);
          brPresB.set(L === 'present' ? fade(t, mid('present', 0.3)) : 0);
        }
        if (L === 'rem') {
          show('priya', priya, SL[0], SL[1], SS, { talk: talk(t, 'priya'), mood: 'smug', look: 0.8, lift: 1 });
          op(purse, 1);
          show('kav', kav, SR[0], SR[1], SS, { talk: 0, mood: 'neutral', look: -0.8 });
        } else if (L === 'rem2' || L === 'rem3') {
          show('kav', kav, SL[0], SL[1], SS, { talk: talk(t, 'kavya'), mood: L === 'rem3' && t > mid('rem3', 0.7) ? 'smug' : 'neutral', look: 0.8 });
          show('priya', priya, SR[0], SR[1], SS, { talk: 0, mood: L === 'rem3' ? 'annoyed' : 'neutral', look: -0.8 });
        } else {
          show('boy', boy, SL[0], SL[1] + 6, SS, { talk: talk(t, 'boy'), mood: 'shock', look: 0.8 });
          show('priya', priya, SR[0], SR[1], SS, { talk: 0, mood: 'shock', look: -0.8, sweat: 1 });
        }
      }
    }

    op(kav, shown.kav); op(priya, shown.priya); op(mum, shown.mum); op(dad, shown.dad); op(boy, shown.boy); op(tan, shown.tan); op(vin, shown.vin);
  };
});
