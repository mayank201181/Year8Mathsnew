/* Scene 1: Balloons and hopscotch (equivalent fractions, simplest form, comparing and ordering).
   Shots (hard sitcom cuts):
   A  10 a.m., the void deck party table: Priya (lower third) blows balloons, 42 of 56 done -> Vinny on the table:
      too crowded upstairs, divide by the HCF -> Kavya: 42 = 2 × 3 × 7, 56 = 2 × 2 × 2 × 7, HCF 14, 3/4 (SIMPLEST
      FORM) -> equivalent fractions 3/4 = 6/8 = 42/56 and three bars shaded to the same point -> Priya 49/56 = 7/8
      (a row of 8 balloons, 7 up) -> Kavya's goodie bags 8/9; both bars one piece short -> the ninth gap is smaller
      -> common denominator 72: 63/72 < 64/72, 8/9 wins -> Priya demands a recount.
   B  11 a.m., the chalk number line on the void-deck floor, from −1 to 1: Ah Boy on −3/4 thinks it beats −2/3
      (NOT ON MY BAR!) -> Mira, the mirror at zero (lower third), reflects the right half backwards -> 3/4 > 2/3
      reflect to −3/4 < −2/3 -> Priya's five cards -> tenths: −6/10, −5/10, −4/10; the cards sort themselves
      −3/5 < −1/2 < −2/5 < 0 < 1/4 -> "Mirror, mirror" -> negative three fifths -> −1/2 ≥ −2/5? -> FALSE. */
scene('balloons', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);          // hard sitcom cut
  const PINK = '#FF8FC8', GOLD = '#FFE45C', RED = '#D32F2F', BLUE = '#2E6FD8', GREEN = '#1E9E5A', PURP = '#8E5BD8';
  const chipAt = (parent, text, o) => { o = o || {}; return mkChip(parent, text, { size: o.size || 30, col: o.col || C.ink }); };
  const fadeIn = (t, t0, d) => P(t, t0, d || 0.3, linear);
  // maths centred vertically on y
  const mathC = (parent, x, y, src, o) => { const m = mkMeasure(src, o); return mkMath(parent, x, y + (m.a - m.d) / 2, src, o); };
  // a fraction card (white, coloured border), centred
  const fcard = (parent, src, col) => {
    const g = G(parent);
    g.box = E('rect', { x: -55, y: -55, width: 110, height: 110, rx: 16, fill: '#FFFDF6', stroke: col, 'stroke-width': 6 }, g);
    g.ring = E('rect', { x: -66, y: -66, width: 132, height: 132, rx: 22, fill: 'none', stroke: GOLD, 'stroke-width': 8 }, g);
    mathC(g, 0, 0, src, { size: 44, anchor: 'middle', fill: MK.ink });
    return g;
  };
  const lineAt = (g, x1, y1, x2, y2, col, w) => E('line', { x1, y1, x2, y2, stroke: col, 'stroke-width': w || 4, 'stroke-linecap': 'round' }, g);

  /* layers */
  const Lset = G(root), Lcast = G(root), Lfront = G(root), Ltop = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= A: the party table, 10 a.m. ================= */
  const shotA = G(Lset);
  const vd = fcVoid(shotA);
  Lfront.appendChild(vd.front); Ltop.appendChild(vd.top);
  // a heap of balloons on the table (left)
  const heap = G(vd.top);
  [['#FF5FA2', 40, 0.62, -8], ['#4CC9F0', 86, 0.56, 6], ['#FFC247', 18, 0.5, 4], ['#56D69B', 64, 0.48, -4]].forEach(([c, x, s, r]) => { const b = fcBalloon(heap, c, { s }); tr(b, x, 556, 1, r); });

  // the whiteboard on a stand behind the table (right half)
  const BX = 895, BY = 368;
  const wb = mkWhiteboard(Lcast, 520, 320, { stand: true }); tr(wb, BX, BY);
  const bd = G(Lcast);   // board content in stage coordinates (interior x 645..1145, y 218..518)
  const INK = MK.ink;

  // priya: 42 of 56 balloons (a 8 x 7 grid)
  const bPriya = G(bd);
  mkText(bPriya, 806, 246, '**42** of **56** balloons', { size: 28, anchor: 'middle', fill: INK });
  const BCOL = ['#FF5FA2', '#FFC247', '#4CC9F0', '#56D69B', '#B48CFF'];
  const gridDone = [];
  let gd = '';
  for (let r = 0; r < 7; r++) for (let c = 0; c < 8; c++) { const x = 687 + c * 34, y = 286 + r * 33; gd += `M${x - 12},${y} a12,14 0 1,0 24,0 a12,14 0 1,0 -24,0 `; }
  E('path', { d: gd, fill: 'none', stroke: '#9FB2C2', 'stroke-width': 3 }, bPriya);
  for (let r = 0; r < 7; r++) for (let c = 0; c < 8; c++) {
    const x = 687 + c * 34, y = 286 + r * 33, i = r * 8 + c;
    if (i < 42) gridDone.push(E('ellipse', { cx: x, cy: y, rx: 13, ry: 15, fill: BCOL[i % 5], stroke: INK, 'stroke-width': 2 }, bPriya));
  }
  const fr4256 = mathC(bPriya, 1060, 380, '42/56', { size: 84, anchor: 'middle', fill: PURP });

  // crowd: 42/56 jiggling, too crowded upstairs
  const bCrowd = G(bd);
  const crowdF = G(bCrowd); tr(crowdF, BX, 345);
  const crowdM = mathC(crowdF, 0, 0, '42/56', { size: 110, anchor: 'middle', fill: PURP });
  const crowdNum = G(bCrowd);
  mkText(bCrowd, BX, 485, '÷ top **and** bottom by the **HCF**', { size: 32, anchor: 'middle', fill: INK, boldFill: RED });

  // hcf: prime factors, HCF 14, 42/56 = 3/4
  const bHcf = G(bd);
  const wHcf = mkWorking(bHcf, 770, 226, ['42 = 2 × 3 × 7', '56 = 2 × 2 × 2 × 7', { m: 'HCF = 2 × 7 = 14', col: BLUE }], { size: 34, fill: INK, gap: 12 });
  const hcfLine = mkMath(bHcf, 668, 470, '42/56 = (42 ÷ 14)/(56 ÷ 14) = 3/4', { size: 40, anchor: 'start', fill: INK });

  // equiv: 3/4 = 6/8 = 42/56, arrows, three bars
  const bEq = G(bd);
  const EQY = 336;
  [[715, '3/4'], [790, '='], [860, '6/8'], [945, '='], [1050, '42/56']].forEach(([x, s]) => mathC(bEq, x, EQY, s, { size: 50, anchor: 'middle', fill: INK }));
  const eqArr = [
    arrow(bEq, 728, 276, 848, 276, { color: BLUE, width: 4, bend: -22, head: 12 }),
    arrow(bEq, 873, 276, 1036, 276, { color: BLUE, width: 4, bend: -22, head: 12 }),
    arrow(bEq, 728, 394, 848, 394, { color: BLUE, width: 4, bend: 20, head: 12 }),
    arrow(bEq, 873, 394, 1036, 394, { color: BLUE, width: 4, bend: 20, head: 12 }),
  ];
  const eqLab = [mkText(bEq, 788, 244, '× 2', { size: 28, anchor: 'middle', fill: BLUE }), mkText(bEq, 955, 244, '× 7', { size: 28, anchor: 'middle', fill: BLUE }),
    mkText(bEq, 750, 438, '× 2', { size: 26, anchor: 'middle', fill: BLUE }), mkText(bEq, 1010, 438, '× 7', { size: 26, anchor: 'middle', fill: BLUE })];
  // three bars (4, 8 and 56 equal parts) shaded to the same point: drawn lean (one fill, one path of cuts)
  const eqBars = [4, 8, 56].map((n, i) => {
    const b = G(bEq), w = 400, h = 16, x0 = BX - w / 2, y0 = 464 + i * 22 - h / 2;
    E('rect', { x: x0, y: y0, width: w, height: h, fill: '#EAF2F7' }, b);
    E('rect', { x: x0, y: y0, width: w * 3 / 4, height: h, fill: '#FFC247' }, b);
    let d = ''; for (let k = 1; k < n; k++) d += `M${(x0 + k * w / n).toFixed(1)},${y0} L${(x0 + k * w / n).toFixed(1)},${y0 + h} `;
    E('path', { d, stroke: INK, 'stroke-width': n > 20 ? 1.5 : 3 }, b);
    E('rect', { x: x0, y: y0, width: w, height: h, fill: 'none', stroke: INK, 'stroke-width': 3 }, b);
    return b;
  });

  // seven: 49/56 = 7/8, a row of 8 balloons, 7 up
  const bSev = G(bd);
  [[815, '49/56'], [905, '='], [985, '7/8']].forEach(([x, s]) => mathC(bSev, x, 330, s, { size: 54, anchor: 'middle', fill: PURP }));
  arrow(bSev, 835, 268, 970, 268, { color: BLUE, width: 4, bend: -20, head: 12 });
  arrow(bSev, 835, 392, 970, 392, { color: BLUE, width: 4, bend: 20, head: 12 });
  mkText(bSev, 902, 244, '÷ 7', { size: 28, anchor: 'middle', fill: BLUE });
  const sevB = [];
  for (let i = 0; i < 8; i++) {
    const x = 695 + i * 57;
    if (i < 7) { const b = fcBalloon(bSev, BCOL[i % 5], { s: 0.5 }); tr(b, x, 505); sevB.push(b); }
    else { const fl = G(bSev); E('path', { d: 'M-14,0 Q-18,-14 -6,-18 Q8,-22 12,-10 Q16,0 4,2 Z', fill: '#B48CFF', stroke: INK, 'stroke-width': 3 }, fl); tr(fl, x, 498, 1.3); sevB.push(fl); }
  }

  // eight: 9 goodie bags, 8 full; the two bars one piece short
  const bEight = G(bd);
  const bags = [];
  for (let i = 0; i < 9; i++) { const b = fcGoodieBag(bEight, i < 8 ? '#FFC247' : '#C9D3DC', { s: 0.5, full: i < 8 }); tr(b, 687 + i * 52, 306); bags.push(b); }
  const bars2 = G(bd);
  const barP = mkFractionBar(bars2, 8, 7, { w: 360, h: 44, col: PINK }); tr(barP, 950, 375);
  const barK = mkFractionBar(bars2, 9, 8, { w: 360, h: 44, col: '#7FB8FF' }); tr(barK, 950, 445);
  mathC(bars2, 715, 375, '7/8', { size: 40, anchor: 'middle', fill: PURP });
  mathC(bars2, 715, 445, '8/9', { size: 40, anchor: 'middle', fill: BLUE });
  // gap: the two empty pieces
  const gapHl = G(bars2);
  E('rect', { x: 950 + 180 - 45, y: 375 - 26, width: 45, height: 52, rx: 4, fill: 'none', stroke: RED, 'stroke-width': 6 }, gapHl);
  E('rect', { x: 950 + 180 - 40, y: 445 - 26, width: 40, height: 52, rx: 4, fill: 'none', stroke: GREEN, 'stroke-width': 6 }, gapHl);
  const gapTxt = G(bd);
  mkText(gapTxt, BX, 258, 'ninths are **smaller** pieces', { size: 30, anchor: 'middle', fill: INK, boldFill: GREEN });
  mkText(gapTxt, BX, 306, 'smaller gap ⇒ closer to **1**', { size: 30, anchor: 'middle', fill: INK, boldFill: GREEN });
  const gapArr = arrow(gapTxt, 1146, 330, 1124, 418, { color: GREEN, width: 4, head: 12 });

  // lcm: common denominator 72
  const bLcm = G(bd);
  const wLcm = mkWorking(bLcm, 880, 226, [{ m: '7/8 = 63/72', note: '(× 9)' }, { m: '8/9 = 64/72', note: '(× 8)' }], { size: 40, fill: INK, gap: 14, noteSize: 28, noteX: 110, noteCol: BLUE });
  const lcmRes = mkText(bLcm, BX, 492, '{{63/72 < 64/72}}, so {{8/9 > 7/8}}', { size: 34, anchor: 'middle', fill: INK });
  const lcmRing = E('rect', { x: 948, y: 440, width: 190, height: 74, rx: 12, fill: 'none', stroke: GREEN, 'stroke-width': 5 }, bLcm);

  const boards = [bPriya, bCrowd, bHcf, bEq, bSev, bEight, bars2, gapHl, gapTxt, bLcm];

  // chips (left, over the heads)
  const chA = {
    ten: chipAt(Lfg, '**10 a.m.**', { col: GOLD }),
    rule: chipAt(Lfg, 'same **×** or **÷**, top **and** bottom', { col: GOLD, size: 28 }),
    short: chipAt(Lfg, 'both **one piece short**', { col: PINK, size: 30 }),
    lcm: chipAt(Lfg, 'common denominator: **LCM(8, 9) = 72**', { col: GOLD, size: 26 }),
    wins: chipAt(Lfg, '{{8/9}} **wins**', { col: '#9FE0B5', size: 34 }),
  };
  const bubRec = mkSpeechBubble(Lfg, 'RECOUNT!', { size: 34, tail: 'down', tailX: -40 });
  const stOK = fcStamp(Lfg, true);

  /* ================= B: the chalk number line, 11 a.m. ================= */
  const shotB = G(Lset);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#9A9E9F' }, shotB);
  let fl = '';
  for (let x = -60; x <= 1260; x += 150) fl += `M${x},0 L${x + 60},750 `;
  for (let y = 60; y <= 750; y += 150) fl += `M0,${y} L1200,${y + 10} `;
  E('path', { d: fl, stroke: '#8A8E90', 'stroke-width': 3 }, shotB);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: glow('#FFFFFF'), opacity: 0.18 }, shotB);
  // faint old hopscotch squares (decor)
  const hs = G(shotB); op(hs, 0.22); tr(hs, 1080, 560, 1, -6);
  [[0, 0], [0, -70], [-35, -140], [35, -140]].forEach(([x, y]) => E('rect', { x: x - 35, y: y - 35, width: 70, height: 70, fill: 'none', stroke: '#FFFFFF', 'stroke-width': 4 }, hs));
  const LY = 470, X0 = 170, LEN = 860, X = v => X0 + (v + 1) / 2 * LEN;
  const CHALK = '#F7F4EA';
  const nl = mkNumberLine(Lcast, { from: -1, to: 1, step: 0.1, len: LEN, labels: [[-1, '-1'], [0, '0'], [1, '1']], ink: CHALK, size: 34 });
  tr(nl, X0, LY);
  const nlG = G(Lcast);   // marks on the line
  const dot = (v, col) => { const d = E('circle', { cx: X(v), cy: LY, r: 11, fill: col, stroke: MK.ink, 'stroke-width': 3 }, nlG); return d; };
  const lab = (v, src, col, dx, size) => mathC(nlG, X(v) + (dx || 0), LY - 50, src, { size: size || 34, anchor: 'middle', fill: col, halo: '#4A5056' });

  // neg: Ah Boy's spot
  const dBoy = dot(-0.75, '#FF8A3D');
  const negChip = chipAt(Lfg, '{{-3/4 > -2/3}} **?**', { col: '#FF8A8A', size: 40 });
  const negWhy = chipAt(Lfg, 'because {{3/4 > 2/3}}', { col: GOLD, size: 30 });
  const stNo = fcStamp(Lfg, false);

  // mira: the right half reflected backwards
  const refl = G(nlG);
  const rPos = G(refl);
  mathC(rPos, X(0.5), LY - 50, '1/2', { size: 34, anchor: 'middle', fill: GOLD, halo: '#5A6066' });
  mathC(rPos, X(1), LY - 50, '1', { size: 34, anchor: 'middle', fill: GOLD, halo: '#5A6066' });
  const rNeg = G(refl); rNeg.setAttribute('transform', `translate(${2 * 600} 0) scale(-1 1)`);
  mathC(rNeg, X(0.5), LY - 50, '1/2', { size: 34, anchor: 'middle', fill: '#FFFFFF' });
  mathC(rNeg, X(1), LY - 50, '1', { size: 34, anchor: 'middle', fill: '#FFFFFF' });
  const hourB = chipAt(Lfg, '**11 a.m.**', { col: GOLD });
  const reflNote = chipAt(Lfg, 'the right side, **backwards**', { col: '#FFFFFF', size: 30 });

  // flips: 3/4, 2/3 reflected
  const flipG = G(nlG);
  const fd = [[2 / 3, BLUE], [0.75, '#FF5FA2'], [-2 / 3, BLUE], [-0.75, '#FF5FA2']].map(([v, c]) => { const d = E('circle', { cx: X(v), cy: LY, r: 11, fill: c, stroke: MK.ink, 'stroke-width': 3 }, flipG); return d; });
  const fl23 = mathC(flipG, X(2 / 3) - 16, LY - 50, '2/3', { size: 34, anchor: 'middle', fill: '#9FD0FF', halo: '#5A6066' });
  const fl34 = mathC(flipG, X(0.75) + 18, LY - 50, '3/4', { size: 34, anchor: 'middle', fill: '#FFB3D6', halo: '#5A6066' });
  const fln23 = mathC(flipG, X(-2 / 3) + 22, LY - 50, '-2/3', { size: 34, anchor: 'middle', fill: '#9FD0FF', halo: '#5A6066' });
  const fln34 = mathC(flipG, X(-0.75) - 24, LY - 50, '-3/4', { size: 34, anchor: 'middle', fill: '#FFB3D6', halo: '#5A6066' });
  const arc = (x1, x2, top, col) => mkDash(E('path', { d: `M${x1},${LY - 92} C${x1},${top} ${x2},${top} ${x2},${LY - 92}`, fill: 'none', stroke: col, 'stroke-width': 5, 'stroke-dasharray': '1 1', 'stroke-linecap': 'round' }, flipG));
  const arc23 = arc(X(2 / 3) - 16, X(-2 / 3) + 22, 190, '#9FD0FF'), arc34 = arc(X(0.75) + 18, X(-0.75) - 24, 140, '#FFB3D6');
  const flRight = chipAt(Lfg, '{{3/4 > 2/3}}', { col: GOLD, size: 38 });
  const flLeft = chipAt(Lfg, '{{-3/4 < -2/3}}', { col: '#9FE0B5', size: 38 });
  const flSmall = mkText(Lfg, 140, 375, '← smaller', { size: 32, anchor: 'middle', fill: '#FFFFFF', halo: '#5A6066' });

  // five / tenths: Priya's five cards, then sorted
  const CARDS = [['-1/2', '#FF8A3D', -0.5, '= -5/10'], ['1/4', GREEN, 0.25, ''], ['-3/5', '#E8424F', -0.6, '= -6/10'], ['0', '#5A6670', 0, ''], ['-2/5', PURP, -0.4, '= -4/10']];
  const SLOT = [140, 290, 440, 760, 910], CY = 175;
  const SORTED = [2, 0, 4, 3, 1];   // card indices in order: −3/5, −1/2, −2/5, 0, 1/4
  const cards = CARDS.map(([src, col]) => fcard(Lfg, src, col));
  const tenL = CARDS.map(([, col, , ten]) => (ten ? mathC(Lfg, 0, 0, ten, { size: 32, anchor: 'middle', fill: '#FFFFFF', halo: '#5A6066' }) : null));
  const ltSigns = [215, 365, 600, 835].map(x => mathC(Lfg, x, CY, '<', { size: 48, anchor: 'middle', fill: GOLD, halo: '#5A6066' }));
  const cardDots = CARDS.map(([, col, v]) => dot(v, col));
  const useTenths = chipAt(Lfg, 'Use **tenths**', { col: GOLD, size: 30 });
  const bubMir = mkSpeechBubble(Lfg, "Who's the **smallest**?", { size: 30, tail: 'left' });
  const negPos = chipAt(Lfg, 'every **negative** < every **positive**', { col: GOLD, size: 28 });

  // geq / false
  const geqG = G(Lfg);
  const geqQ = chipAt(geqG, '{{-1/2 >= -2/5}} **?**', { col: GOLD, size: 46 });
  tr(geqQ, 880, 175);
  const geqKey = mkText(geqG, 900, 300, '{{>=}} means greater than **or equal to**', { size: 28, anchor: 'middle', fill: '#FFFFFF', halo: '#5A6066' });
  const gDots = [dot(-0.5, '#FF8A3D'), dot(-0.4, PURP)];
  const gLab = [lab(-0.5, '-1/2', '#FFC27A', -18), lab(-0.4, '-2/5', '#D9C2FF', 22)];
  const falseG = G(Lfg);
  const fAns = chipAt(falseG, '{{-1/2 < -2/5}}', { col: '#9FE0B5', size: 46 }); tr(fAns, 280, 175);
  const fLeft = mkText(falseG, 330, 380, '← further **left**', { size: 30, anchor: 'middle', fill: '#FFFFFF', halo: '#5A6066' });
  const stFalse = mkStamp(Lfg, 'FALSE', RED);

  /* ================= the cast ================= */
  const priya = cast(Lcast, 'priya', { hand: true, side: 'right' });
  // Priya's props: a balloon she is blowing (A), a stick of chalk (B)
  const pBal = G(priya.hand); E('ellipse', { cx: 0, cy: -50, rx: 36, ry: 44, fill: ball(mkShade('#FF5FA2', 0.35), '#FF5FA2'), stroke: SC_INK, 'stroke-width': 3 }, pBal);
  const pChalk = G(priya.hand); E('rect', { x: -8, y: -60, width: 16, height: 56, rx: 5, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, pChalk);
  const kav = cast(Lcast, 'kavya');
  const boy = cast(Lcast, 'boy', { hat: '#4CC9F0' });
  const vin = cast(Ltop, 'vinny');
  const mira = cast(Lcast, 'mira');
  const lt = { priya: fcLowerThird(Lhud, 'priya'), mira: fcLowerThird(Lhud, 'mira') };
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cuts */
  const cB = at('hop') - 0.06;
  const AY = 462;   // bust y behind the party table
  const BYb = 660;  // bust y in the floor shot (cropped by the frame)

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const sA = on(t, -1, cB), sB = 1 - sA;
    op(shotA, sA); op(vd.front, sA); op(vd.top, sA); op(wb, sA); op(bd, sA);
    op(shotB, sB); op(nl, sB); op(nlG, sB);
    for (const k in lt) lt[k].set(0);
    for (const k in chA) chA[k].set(0);
    bubRec.set(0); stOK.set(0); stNo.set(0); stFalse.set(0);
    negChip.set(0); negWhy.set(0); reflNote.set(0); flRight.set(0); flLeft.set(0); op(flSmall, 0);
    useTenths.set(0); bubMir.set(0); negPos.set(0); op(geqG, 0); op(falseG, 0);
    cards.forEach(c => op(c, 0)); tenL.forEach(l => l && op(l, 0)); ltSigns.forEach(s => op(s, 0));
    boards.forEach(b => op(b, 0));
    vd.upd(t * AMP);

    /* ---------- A: the party table ---------- */
    if (sA) {
      tr(priya, 110, AY, 0.95); tr(kav, 305, AY, 0.95); tr(boy, 545, AY + 6, 0.95);
      const vinY = 560 - 114 * 0.5;
      tr(vin, 425, vinY, 0.5);
      op(vin, 1); op(mira, 0); op(nl, 0);
      op(pBal, 1); op(pChalk, 0);
      // Priya blowing the balloon on 'ten': it grows
      const blow = t < at('priya') ? 0.45 + 0.55 * P(t, at('ten') + 0.8, 3.6, linear) : 1;
      pBal.setAttribute('transform', `scale(${blow.toFixed(3)})`);
      chA.ten.set(t < at('priya') ? fadeIn(t, mid('ten', 0.05)) : 0); tr(chA.ten, 300, 250);
      lt.priya.set(win(t, at('priya') + 0.1, at('priya') + 3.2, 0.3));

      // boards per line
      const inL = (a, b) => t >= at(a) - 0.05 && t < (b ? at(b) - 0.05 : 1e9);
      const bIn = (id, el, d) => { op(el, fadeIn(t, at(id) + (d || 0.05), 0.25)); };
      if (inL('priya', 'crowd')) {
        bIn('priya', bPriya);
        gridDone.forEach((e, i) => op(e, P(t, mid('priya', 0.25) + i * 0.03, 0.15, linear)));
        op(fr4256, fadeIn(t, mid('priya', 0.6)));
      }
      if (inL('crowd', 'hcf')) {
        bIn('crowd', bCrowd);
        const j = Math.sin(t * 22) * AMP * (t < mid('crowd', 0.55) ? 1 : 0.3);
        tr(crowdF, BX + 3 * j, 345, 1 + 0.03 * Math.abs(j), 3 * j);
        op(bCrowd.lastChild, fadeIn(t, mid('crowd', 0.45)));
      }
      if (inL('hcf', 'equiv')) {
        bIn('hcf', bHcf);
        wHcf.set(clamp((t - at('hcf') - 0.1) / 0.6) * 2 + clamp((t - mid('hcf', 0.32)) / 0.4));
        op(hcfLine, fadeIn(t, mid('hcf', 0.55)));
        stOK.set(P(t, mid('hcf', 0.85), 0.35, linear)); tr(stOK, 1062, 472, 0.32);
      }
      if (inL('equiv', 'seven')) {
        bIn('equiv', bEq);
        eqArr.forEach((a, i) => a.set(P(t, mid('equiv', 0.15 + (i % 2) * 0.22), 0.4, linear)));
        eqLab.forEach((l, i) => op(l, fadeIn(t, mid('equiv', 0.25 + (i % 2) * 0.22))));
        eqBars.forEach((b, i) => op(b, fadeIn(t, mid('equiv', 0.6 + i * 0.07))));
        chA.rule.set(fadeIn(t, mid('equiv', 0.45))); tr(chA.rule, 330, 250);
      }
      if (inL('seven', 'eight')) {
        bIn('seven', bSev);
        sevB.forEach((b, i) => op(b, fadeIn(t, at('seven') + 0.2 + i * 0.12, 0.2)));
      }
      if (inL('eight', 'lcm')) {
        if (t < at('gap') - 0.05) { op(bEight, 1); bags.forEach((b, i) => op(b, fadeIn(t, at('eight') + 0.05 + i * 0.1, 0.15))); }
        op(bars2, fadeIn(t, mid('eight', 0.5)));
        if (t < at('gap') - 0.05) { chA.short.set(fadeIn(t, mid('eight', 0.7))); tr(chA.short, 330, 250); }
        if (t >= at('gap') - 0.05) {
          op(gapHl, fadeIn(t, at('gap') + 0.1)); op(gapTxt, 1);
          op(gapTxt.children[0], fadeIn(t, at('gap') + 0.2)); op(gapTxt.children[1], fadeIn(t, mid('gap', 0.5)));
          gapArr.set(P(t, mid('gap', 0.6), 0.4, linear));
        }
      }
      if (inL('lcm')) {
        op(bLcm, 1);
        chA.lcm.set(fadeIn(t, at('lcm') + 0.1)); tr(chA.lcm, 300, 250);
        wLcm.set(clamp((t - mid('lcm', 0.3)) / 0.4) + clamp((t - mid('lcm', 0.5)) / 0.4));
        op(lcmRes, fadeIn(t, mid('lcm', 0.75)));
        op(lcmRing, t >= at('recount') ? 1 : 0);
        if (t >= at('recount')) { chA.lcm.set(0); chA.wins.set(fadeIn(t, at('recount'))); tr(chA.wins, 445, 250); }
        bubRec.set(t >= at('recount') ? fadeIn(t, at('recount') + 0.1) : 0); tr(bubRec, 150, 240);
      }

      // moods and looks
      let pm = 'smug', pl = 0.6, km = 'neutral', kl = -0.5, bm = 'happy', bl = -0.6, vm = 'deadpan', vl = 0, vs = 0, plift = 1;
      if (t < at('priya')) { pm = 'happy'; kl = -0.7; bl = -0.8; }
      else if (t < at('crowd')) { pm = 'smug'; pl = 0.3; kl = -0.7; }
      else if (t < at('hcf')) { vm = 'annoyed'; vl = 0.7; pm = 'shock'; pl = 0.9; kl = 0.8; bl = -0.6; plift = 0; }
      else if (t < at('equiv')) { km = 'happy'; kl = 0.7; pm = 'annoyed'; pl = 0.8; vm = 'neutral'; vl = -0.8; plift = 0; }
      else if (t < at('seven')) { vm = 'neutral'; vl = 0.6; kl = 0.8; pl = 0.9; plift = 0; }
      else if (t < at('eight')) { pm = 'smug'; pl = 0.9; kl = -0.7; vl = -0.8; }
      else if (t < at('gap')) { km = 'smug'; kl = -0.8; pm = 'neutral'; pl = 0.8; vl = -0.6; plift = 0; }
      else if (t < at('lcm')) { km = 'smug'; kl = 0.8; pm = 'annoyed'; pl = 0.8; vl = -0.6; plift = 0; }
      else if (t < at('recount')) { vm = 'smug'; vl = 0.8; km = 'happy'; kl = 0.7; pm = 'shock'; pl = 0.9; plift = 0; bl = -0.4; }
      else { pm = 'annoyed'; pl = 0.2; km = 'smug'; kl = -0.8; vm = 'deadpan'; vl = -0.8; bm = 'neutral'; bl = -0.9; plift = 0; }
      priya.set({ t, talk: scTalk(S, t, 'priya'), mood: pm, look: pl, lift: plift });
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: bm, look: bl });
      vin.set({ t, talk: scTalk(S, t, 'vinny'), mood: vm, look: vl, stop: vs });
      op(priya, 1); op(kav, 1); op(boy, 1);
    }

    /* ---------- B: the chalk number line ---------- */
    if (sB) {
      op(vin, 0); op(heap, 0);
      op(pBal, 0); op(pChalk, 1);
      tr(kav, 100, BYb, 0.95); tr(boy, 272, BYb - 16, 0.95); tr(priya, 1100, BYb, 0.95);
      op(nl, fadeIn(t, at('hop') + 0.05, 0.5));
      // marks: hide all, switch on per line
      for (const el of nlG.children) op(el, 0);
      const showMira = t >= at('mira') - 0.3;
      op(mira, showMira ? 1 : 0);
      if (showMira) { const up = P(t, at('mira') - 0.3, 0.45, pop); tr(mira, 600, LY + 2 - 200 * 0.8 + 60 * (1 - up), 0.8); }
      lt.mira.set(win(t, at('mira') + 0.1, at('mira') + 3.2, 0.3));

      hourB.set(t < at('neg') ? fadeIn(t, mid('hop', 0.1)) : 0); tr(hourB, 1000, 170);

      // neg
      if (t >= at('neg') && t < at('mira')) {
        op(dBoy, fadeIn(t, at('neg')));
        negChip.set(fadeIn(t, mid('neg', 0.15))); tr(negChip, 600, 200);
        negWhy.set(fadeIn(t, mid('neg', 0.6))); tr(negWhy, 600, 285);
        stNo.set(P(t, mid('neg', 0.8), 0.35, linear)); tr(stNo, 960, 380, 0.42);
      }
      if (t >= at('neg')) op(dBoy, 1);
      // mira: the reflection
      if (t >= at('mira') && t < at('flips')) {
        op(refl, 1); op(rPos, fadeIn(t, mid('mira', 0.3))); op(rNeg, fadeIn(t, mid('mira', 0.6)) * 0.85);
        reflNote.set(fadeIn(t, mid('mira', 0.65))); tr(reflNote, 330, 300);
      }
      // flips
      if (t >= at('flips') && t < at('five')) {
        op(flipG, 1);
        [fd[0], fd[1], fl23, fl34].forEach(e => op(e, fadeIn(t, at('flips'))));
        flRight.set(fadeIn(t, at('flips') + 0.1)); tr(flRight, 1060, 300);
        arc23.setAttribute('stroke-dashoffset', (1 - P(t, mid('flips', 0.15), 0.8)).toFixed(3));
        arc34.setAttribute('stroke-dashoffset', (1 - P(t, mid('flips', 0.25), 0.8)).toFixed(3));
        [fd[2], fd[3], fln23, fln34].forEach(e => op(e, fadeIn(t, mid('flips', 0.55))));
        flLeft.set(fadeIn(t, mid('flips', 0.7))); tr(flLeft, 140, 300);
        op(flSmall, fadeIn(t, mid('flips', 0.8)));
      }
      // five, tenths, mirror, darling: the cards
      if (t >= at('five') && t < at('geq')) {
        const sortP = P(t, mid('tenths', 0.45), 1.0, ease);
        CARDS.forEach((cd, i) => {
          const x0 = SLOT[i], x1 = SLOT[SORTED.indexOf(i)];
          const x = lerp(x0, x1, sortP), y = CY - 70 * Math.sin(Math.PI * sortP) * (x0 === x1 ? 0 : 1);
          const pIn = P(t, at('five') + 0.3 + i * 0.5, 0.35, pop);
          op(cards[i], clamp(pIn * 3)); tr(cards[i], x, y, Math.max(0.01, 0.6 + 0.4 * pIn));
          if (tenL[i]) { op(tenL[i], fadeIn(t, at('tenths') + 0.3 + [0, 0, 0.5, 0, 1.0][i])); tr(tenL[i], x, y + 100); }
          const dk = cardDots[i]; op(dk, fadeIn(t, mid('tenths', 0.55) + SORTED.indexOf(i) * 0.15));
        });
        ltSigns.forEach((s, i) => op(s, fadeIn(t, mid('tenths', 0.62) + i * 0.15)));
        useTenths.set(t < mid('tenths', 0.45) ? fadeIn(t, at('tenths') + 0.05) : 0); tr(useTenths, 900, 380);
        // ring on −3/5 for "darling"
        cards.forEach((c, i) => op(c.ring, i === 2 && t >= at('darling') ? 0.6 + 0.4 * Math.sin(t * 8) : 0));
        if (t >= at('mirror') && t < at('darling')) { bubMir.set(fadeIn(t, at('mirror') + 0.1)); tr(bubMir, 420, 590); }
        if (t >= at('darling')) {
          const dk = cardDots[2]; attr(dk, 'r', 11 + 4 * Math.abs(Math.sin(t * 6)));
          negPos.set(fadeIn(t, mid('darling', 0.4))); tr(negPos, 900, 370);
        }
      }
      // geq, false
      if (t >= at('geq')) {
        op(geqG, 1); op(geqQ, fadeIn(t, at('geq') + 0.1)); op(geqKey, fadeIn(t, mid('geq', 0.5)));
        gDots.forEach(d => op(d, fadeIn(t, mid('geq', 0.3)))); gLab.forEach(d => op(d, fadeIn(t, mid('geq', 0.3))));
        if (t >= at('false')) {
          op(falseG, 1); op(fAns, fadeIn(t, at('false') + 0.1)); op(fLeft, fadeIn(t, mid('false', 0.4)));
          stFalse.set(P(t, at('false') + 0.1, 0.35, linear)); tr(stFalse, 900, 310, 0.62);
          op(geqKey, 0);
        }
      }

      // moods and looks
      const who = scWho(S, t);
      const lookAt = { kavya: 100, boy: 270, priya: 1100, mira: 600 };
      const lk = (x0) => { const x = lookAt[who]; return x === undefined ? 0.3 : clamp((x - x0) / 300, -1, 1); };
      let km = 'neutral', bm = 'happy', pm = 'smug', mm = 'smug', blift = 0, shine = 0;
      if (t < at('neg')) { pm = 'happy'; km = 'neutral'; }
      else if (t < at('mira')) { bm = 'smug'; blift = 1; km = 'deadpan'; pm = 'neutral'; }
      else if (t < at('flips')) { bm = 'shock'; km = 'happy'; shine = P(t, mid('mira', 0.2), 1.0, linear); }
      else if (t < at('five')) { bm = 'shock'; km = 'happy'; pm = 'neutral'; }
      else if (t < at('tenths')) { pm = 'smug'; km = 'neutral'; }
      else if (t < at('mirror')) { km = 'happy'; pm = 'neutral'; }
      else if (t < at('darling')) { bm = 'happy'; blift = 1; km = 'deadpan'; mm = 'smug'; }
      else if (t < at('geq')) { mm = 'smug'; shine = P(t, at('darling'), 1.0, linear); bm = 'happy'; km = 'deadpan'; }
      else if (t < at('false')) { pm = 'smug'; km = 'neutral'; }
      else { km = 'smug'; pm = 'annoyed'; bm = 'happy'; }
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: lk(100) });
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: bm, look: t >= at('mirror') && t < at('darling') ? 1 : lk(285), lift: blift });
      priya.set({ t, talk: scTalk(S, t, 'priya'), mood: pm, look: lk(1100), lift: t < at('neg') || (t >= at('five') && t < at('tenths')) || (t >= at('geq') && t < at('false')) ? 1 : 0 });
      mira.set({ t, talk: scTalk(S, t, 'mira'), mood: mm, look: lk(600), shine });
      op(priya, 1); op(kav, 1); op(boy, 1);
    } else { op(mira, 0); op(heap, 1); hourB.set(0); }
  };
});
