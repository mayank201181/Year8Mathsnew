/* Scene 1: Who do we ask? (Data, enquiries & sampling)
   Monday night, dinner in the flat; Inspector Axis on Kavya's laptop. Shots (hard sitcom cuts):
   F  the family at the table (Dad, Mum, Ah Boy, Kavya; laptop on the table)        cycle (open), all, thousand
   D  the Fact-Check Desk, Axis with his evidence board                              cycle (the four boxes), census
   L  close-up of the laptop (Axis), a card on the right                             digest, three
   P  the family squeezed left, the SURVEY PLAN card on the right                    system ... shoe2
   Showpiece: the 1200-pupil dot grid (40 x 30, one path) lighting every 20th dot from 7 (two columns of dots). */
scene('survey', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const GOLD = '#FFE45C', RED = '#D32F2F', GREEN = '#1E9E5A', BLUE = '#2E6FD8', PURPLE = '#8E5BD8', INK = MK.ink;
  const popSet = (el, t, t0, t1, x, y, s) => { const p = t >= t0 && t < t1 ? P(t, t0, 0.35, linear) : 0; el.set(p); if (x !== undefined) tr(el, x, y, s); };
  const chipD = (parent, text, o) => { o = o || {}; return mkChip(parent, text, { size: o.size || 28, col: o.col || C.ink, fill: o.fill }); };
  const lookAt = (x0, x1) => clamp((x1 - x0) / 220, -1, 1);
  const sq = (x, y, d) => `M${x.toFixed(1)},${y.toFixed(1)} h${d} v${d} h${-d} Z `;
  // a 40 x 30 grid of 1200 pupils: dot n (1..1200) in row order. Returns { g, xy(n), lit (path), set(list) }
  const dotGrid = (parent, x0, y0, pitch, d, col) => {
    const g = G(parent); tr(g, x0, y0);
    const xy = n => [((n - 1) % 40) * pitch, Math.floor((n - 1) / 40) * pitch];
    let all = '';
    for (let n = 1; n <= 1200; n++) { const [x, y] = xy(n); all += sq(x, y, d); }
    g.base = E('path', { d: all, fill: col || '#9AA6B2' }, g);
    g.lit = E('path', { d: '', fill: GOLD, stroke: '#B58A12', 'stroke-width': 1 }, g);
    g.xy = xy; g.d = d; g.pitch = pitch;
    g.show = list => { let s = ''; list.forEach(n => { const [x, y] = xy(n); s += sq(x - 1, y - 1, d + 2); }); attr(g.lit, 'd', s); };
    return g;
  };
  // a thought cloud (one path of circles + a body), centred, w x h, trail to (tx, ty) relative
  const cloud = (parent, w, h, tx, ty) => {
    const g = G(parent);
    let d = '';
    const n = Math.round(w / 70), m = Math.max(1, Math.round(h / 80));
    const circ = (cx, cy, r) => `M${(cx - r).toFixed(1)},${cy.toFixed(1)} a${r},${r} 0 1 0 ${2 * r},0 a${r},${r} 0 1 0 ${-2 * r},0 `;
    for (let i = 0; i <= n; i++) { const x = -w / 2 + i * w / n; d += circ(x, -h / 2, 34) + circ(x, h / 2, 34); }
    for (let j = 1; j <= m; j++) { const y = -h / 2 + j * h / (m + 1); d += circ(-w / 2, y, 34) + circ(w / 2, y, 34); }
    E('path', { d, fill: '#FFFFFF', stroke: INK, 'stroke-width': 5 }, g);
    E('rect', { x: -w / 2, y: -h / 2, width: w, height: h, fill: '#FFFFFF' }, g);
    [[0.35, 16], [0.62, 11], [0.86, 7]].forEach(([k, r]) => E('circle', { cx: tx * k, cy: h / 2 + 30 + (ty - h / 2 - 30) * k, r, fill: '#FFFFFF', stroke: INK, 'stroke-width': 4 }, g));
    return g;
  };
  // a tick box with a label, left edge at (x, y) = box centre-left
  const tickBox = (parent, x, y, label, o) => {
    o = o || {};
    const g = G(parent);
    E('rect', { x, y: y - 17, width: 34, height: 34, rx: 5, fill: '#FFFFFF', stroke: INK, 'stroke-width': 3 }, g);
    mkText(g, x + 52, y + 11, label, { size: o.size || 32, fill: o.col || INK });
    return g;
  };
  const sneaker = (parent) => {
    const g = G(parent);
    E('path', { d: 'M-70,10 L-66,-28 Q-60,-40 -40,-38 L-6,-30 Q20,-24 36,-8 L66,0 Q80,6 74,22 L-64,22 Q-72,20 -70,10 Z', fill: '#E8424F', stroke: INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
    E('path', { d: 'M-72,14 L76,14 L74,24 Q70,30 60,30 L-62,30 Q-72,28 -72,14 Z', fill: '#FFFFFF', stroke: INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
    E('path', { d: 'M-30,-34 L-8,-14 M-18,-36 L2,-18 M-6,-34 L12,-18', stroke: '#FFFFFF', 'stroke-width': 4, 'stroke-linecap': 'round' }, g);
    g.hole = G(g);
    E('ellipse', { cx: 62, cy: 0, rx: 11, ry: 9, fill: SC_SKIN.medium, stroke: INK, 'stroke-width': 3 }, g.hole);   // a toe pokes out
    E('path', { d: 'M54,-6 q4,-4 8,0', fill: 'none', stroke: INK, 'stroke-width': 2 }, g.hole);
    return g;
  };

  /* layers */
  const Lbg = G(root), Lcard = G(root), Lcast = G(root), Lfront = G(root), Ltop = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= sets ================= */
  const flat = sdFlat(Lbg);
  Lfront.appendChild(flat.front); Lfront.appendChild(flat.top);
  const desk = sdDesk(Lbg);
  Lfront.appendChild(desk.front); Lfront.appendChild(desk.top);
  const BR = desk.boardRect;

  /* ================= the laptop ================= */
  const lap = sdDevice(Ltop, 'laptop');

  /* ================= the evidence board (desk) ================= */
  // the enquiry cycle: four boxes clockwise
  const cyc = G(desk.board);
  const boxes = [['1  Plan', 778, 214], ['2  Collect', 1012, 214], ['3  Process and\nrepresent', 1012, 352], ['4  Interpret', 778, 352]].map(([s, x, y]) => {
    const b = G(cyc); tr(b, x, y);
    const fillR = E('rect', { x: -100, y: -42, width: 200, height: 84, rx: 12, fill: '#FFFDF6', stroke: '#8A6B3A', 'stroke-width': 3 }, b);
    const hi = E('rect', { x: -100, y: -42, width: 200, height: 84, rx: 12, fill: '#FFF2B0', stroke: '#E2A21C', 'stroke-width': 6 }, b);
    const tx = mkText(b, 0, 0, s.replace(/^(\d)  (.*)$/s, '**$1**  $2'), { size: 28, anchor: 'middle', fill: INK, weight: 700 });
    tr(tx, 0, -tx.top - tx.h / 2);
    b.hi = hi; b.fillR = fillR;
    return b;
  });
  const cArrows = [[880, 214, 910, 214], [1012, 258, 1012, 308], [910, 352, 880, 352], [778, 308, 778, 258]].map(([a, b, c, d]) => arrow(cyc, a, b, c, d, { color: '#B8336A', width: 6, head: 18 }));
  const again = G(cyc);
  E('path', { d: mkArcD(895, 283, 24, -60, 230), fill: 'none', stroke: '#B8336A', 'stroke-width': 5, 'stroke-linecap': 'round' }, again);
  E('path', { d: 'M0,0 L-14,-8 L-12,8 Z', fill: '#B8336A', transform: `translate(${(895 + 24 * Math.cos(230 * Math.PI / 180)).toFixed(1)} ${(283 + 24 * Math.sin(230 * Math.PI / 180)).toFixed(1)}) rotate(-35)` }, again);
  const againT = mkText(cyc, 895, 432, '**round again**', { size: 26, anchor: 'middle', fill: '#8E1B4A' });
  // the population and the sample
  const cen = G(desk.board);
  mkText(cen, 680, 184, '**population**: all 1200 pupils', { size: 26, fill: INK });
  const gridD = dotGrid(cen, 682, 200, 7.6, 5.4);
  const sampR = rng(5), sampN = [];
  while (sampN.length < 60) { const n = 1 + Math.floor(sampR() * 1200); if (!sampN.includes(n)) sampN.push(n); }
  const flyP = E('path', { d: '', fill: GOLD, stroke: '#B58A12', 'stroke-width': 1 }, cen);
  const sBox = G(cen);
  E('rect', { x: 1004, y: 214, width: 112, height: 150, rx: 8, fill: 'rgba(255,253,246,0.85)', stroke: INK, 'stroke-width': 3, 'stroke-dasharray': '10 7' }, sBox);
  mkText(sBox, 1060, 398, '**sample**', { size: 26, anchor: 'middle', fill: INK });
  mkText(sBox, 1060, 432, '60 pupils', { size: 26, anchor: 'middle', fill: INK });
  const boxXY = i => [1030 + (i % 6) * 11, 228 + Math.floor(i / 6) * 12.5];
  const axisD = cast(Lcast, 'axis');
  const ch = {
    cycle: chipD(Lfg, 'the **enquiry cycle**', { col: GOLD, size: 30 }),
    census: chipD(Lfg, 'asking **everyone** = a **census**', { col: GOLD }),
    slow: chipD(Lfg, 'census: **too slow!**', { col: '#FF8A80' }),
    rep: chipD(Lfg, '**representative**: like the population', { col: '#9FE0B5', size: 26 }),
  };

  /* ================= the SURVEY PLAN card (flat) and the queue ================= */
  const card = G(Lcard);
  E('rect', { x: 618, y: 116, width: 550, height: 420, rx: 12, fill: 'rgba(0,0,0,0.22)' }, card);
  E('rect', { x: 610, y: 108, width: 550, height: 420, rx: 12, fill: MK.paper, stroke: '#B8A27A', 'stroke-width': 4 }, card);
  const cardHead = T(card, 632, 146, 'SURVEY PLAN', { size: 28, weight: 800, fill: '#B8336A', ls: 2 });
  // page 1: the dot grid (system, seven, last)
  const pg1 = G(card);
  const grid = dotGrid(pg1, 652, 168, 8.4, 6);
  T(pg1, 642, 175, '1', { size: 26, weight: 700, anchor: 'end', fill: '#5A6670' });
  T(pg1, 984, 418, '1200', { size: 26, weight: 700, fill: '#5A6670' });
  const randR = rng(11), randN = [];
  while (randN.length < 60) { const n = 1 + Math.floor(randR() * 1200); if (!randN.includes(n)) randN.push(n); }
  const sysN = []; for (let k = 0; k < 60; k++) sysN.push(7 + 20 * k);
  const ringDot = E('circle', { r: 11, fill: 'none', stroke: RED, 'stroke-width': 4 }, pg1);
  const list = ['7', '27', '47', '67', '…'].map((s, i) => T(pg1, 1080, 214 + i * 40, s, { size: 32, weight: 800, anchor: 'middle', fill: i < 4 ? '#B8336A' : '#5A6670' }));
  const listHead = T(pg1, 1080, 176, 'every 20th', { size: 26, weight: 700, anchor: 'middle', fill: INK });
  const m1 = mkMath(pg1, 885, 486, '1200 ÷ 60 = 20', { size: 44, fill: BLUE, anchor: 'middle' });
  const m2 = mkMath(pg1, 885, 486, '7 + 59 × 20 = 1187', { size: 44, fill: BLUE, anchor: 'middle' });
  const m2r = mkMeasure('1187', { size: 44 }).w;
  const m2ring = E('rect', { x: m2.x0 + m2.w - m2r - 10, y: 486 - m2.a - 8, width: m2r + 20, height: m2.a + m2.d + 16, rx: 8, fill: 'none', stroke: GREEN, 'stroke-width': 4 }, pg1);
  const lastLab = mkChip(pg1, '**1187**', { size: 26, col: '#B8336A', fill: '#FFFDF6' });
  // page 2: stratified (strat)
  const pg2 = G(card);
  const tbl = mkTable(pg2, [['Year', 'Pupils', 'Sample'], ['Sec 1', '320', '16'], ['Sec 2', '300', '15'], ['Sec 3', '300', '15'], ['Sec 4', '280', '14'], ['**Total**', '**1200**', '**60**']],
    { size: 28, ink: INK, colW: [150, 150, 150], rowH: 46, fill: '#FFFFFF', headFill: '#F4D9E6' });
  tr(tbl, 660, 166);
  const tblMark = tbl.mark(1, 2, 'rgba(255,228,92,0.45)');
  const tblCol = E('rect', { x: 300, y: 46, width: 150, height: 230, rx: 8, fill: 'rgba(46,111,216,0.10)' }, tbl);
  const m3 = mkMath(pg2, 885, 486, '320 ÷ 20 = 16', { size: 44, fill: BLUE, anchor: 'middle' });
  // page 3: Mum's question (question, three)
  const pg3 = G(card);
  T(pg3, 1138, 146, 'by Mum', { size: 26, weight: 700, anchor: 'end', fill: '#5A6670', font: FB });
  mkText(pg3, 636, 196, 'How much do you spend on drinks?', { size: 30, fill: INK, weight: 700 });
  const qb = [['$0–$2', 248], ['$2–$4', 298], ['$5 or more', 348]].map(([s, y]) => tickBox(pg3, 650, y, s));
  const nl1 = mkNumberLine(pg3, { from: 0, to: 6, step: 1, len: 420, size: 28, ink: INK, labels: v => '$' + v });
  tr(nl1, 680, 440);
  const segs1 = [[0, 2, BLUE, -10], [2, 4, GREEN, 10], [5, 6.6, '#E8892C', -10]].map(([a, b, col, dy]) => {
    const s = E('path', { d: `M${nl1.x(a)},${dy} L${nl1.x(b)},${dy}`, stroke: col, 'stroke-width': 12, 'stroke-linecap': 'round', opacity: 0.85 }, nl1);
    return s;
  });
  const ov = E('circle', { cx: nl1.x(2), cy: 0, r: 22, fill: 'none', stroke: RED, 'stroke-width': 5 }, nl1);
  const gapR = E('rect', { x: nl1.x(4) + 6, y: -22, width: nl1.x(5) - nl1.x(4) - 12, height: 44, rx: 8, fill: 'rgba(211,47,47,0.18)', stroke: RED, 'stroke-width': 3, 'stroke-dasharray': '6 5' }, nl1);
  const drop = G(nl1);
  E('path', { d: 'M0,-4 L-12,-26 L12,-26 Z', fill: RED }, drop);
  mkText(drop, 0, -38, '**$4.50 → ?**', { size: 28, anchor: 'middle', fill: RED });
  const ring2a = E('ellipse', { cx: 760, cy: 248, rx: 34, ry: 24, fill: 'none', stroke: RED, 'stroke-width': 4 }, pg3);
  const ring2b = E('ellipse', { cx: 702, cy: 298, rx: 34, ry: 24, fill: 'none', stroke: RED, 'stroke-width': 4 }, pg3);
  const perDay = mkChip(pg3, 'per day? per week?', { size: 26, col: RED, fill: '#FFF4F2' });
  // page 4: the fixed question (fixed)
  const pg4 = G(card);
  mkText(pg4, 636, 192, 'In the **last 5 school days**, how much', { size: 28, fill: INK, weight: 600, boldFill: GREEN });
  mkText(pg4, 636, 228, 'did you spend on drinks?', { size: 28, fill: INK, weight: 600 });
  const fb = [['under $5', 276], ['$5 to $9.99', 322], ['$10 or more', 368]].map(([s, y]) => tickBox(pg4, 650, y, s, { size: 30 }));
  const nl2 = mkNumberLine(pg4, { from: 0, to: 12, step: 1, len: 420, size: 28, ink: INK, labels: [[0, '$0'], [5, '$5'], [10, '$10']] });
  tr(nl2, 680, 450);
  const segs2 = [[0, 5, BLUE], [5, 10, GREEN], [10, 12.8, '#E8892C']].map(([a, b, col]) => E('rect', { x: nl2.x(a), y: -9, width: nl2.x(b) - nl2.x(a), height: 18, fill: col, opacity: 0.85 }, nl2));
  const fTick = tick(pg4, 26, GREEN); tr(fTick, 1110, 300);
  // page 5: types of data (types, shoe)
  const pg5 = G(card);
  const colX = [705, 885, 1065];
  const tcols = [['**Name it**', 'categorical', 'favourite stall'], ['**Count it**', 'discrete', 'cups a week'], ['**Measure it**', 'continuous', 'queue time']].map(([a, b, c], i) => {
    const g = G(pg5);
    mkText(g, colX[i], 340, a, { size: 30, anchor: 'middle', fill: INK });
    mkText(g, colX[i], 382, b, { size: 28, anchor: 'middle', fill: [BLUE, GREEN, '#C2410C'][i], weight: 800 });
    mkText(g, colX[i], 424, c, { size: 26, anchor: 'middle', fill: '#5A6670' });
    return g;
  });
  // icons: a stall sign, cups 1 2 3, a stopwatch
  const ic1 = G(tcols[0]); tr(ic1, colX[0], 250);
  E('rect', { x: -66, y: -50, width: 132, height: 92, rx: 6, fill: '#FFFDF6', stroke: INK, 'stroke-width': 3 }, ic1);
  E('path', { d: 'M-72,-52 L72,-52 L66,-22 L-66,-22 Z', fill: SD_COL.kachang, stroke: INK, 'stroke-width': 3 }, ic1);
  E('path', { d: 'M-36,-52 L-33,-22 M0,-52 L0,-22 M36,-52 L33,-22', stroke: '#FFFFFF', 'stroke-width': 8 }, ic1);
  const bwl = sdBowl(ic1, { s: 0.42 }); tr(bwl, 0, 38);
  const ic2 = G(tcols[1]); tr(ic2, colX[1], 270);
  [-48, 0, 48].forEach((x, i) => { const c = sdCup(ic2, { s: 0.36 }); tr(c, x, 10); T(ic2, x, -76, String(i + 1), { size: 28, weight: 800, anchor: 'middle', fill: GREEN }); });
  const ic3 = G(tcols[2]); tr(ic3, colX[2], 262);
  E('rect', { x: -8, y: -62, width: 16, height: 12, rx: 3, fill: '#8F9CAB', stroke: INK, 'stroke-width': 3 }, ic3);
  E('circle', { r: 48, fill: '#E6EBEF', stroke: INK, 'stroke-width': 5 }, ic3);
  E('circle', { r: 38, fill: '#FFFFFF', stroke: '#9FB2C2', 'stroke-width': 3 }, ic3);
  const swHand = E('line', { x1: 0, y1: 0, x2: 0, y2: -32, stroke: '#E8424F', 'stroke-width': 4, 'stroke-linecap': 'round' }, ic3);
  const contQ = mkChip(pg5, 'continuous?', { size: 26, col: '#C2410C', fill: '#FFF4E8' });
  // page 6: feet and shoe sizes (shoe2)
  const pg6 = G(card);
  mkText(pg6, 636, 196, '**foot length**: ', { size: 30, fill: INK });
  const footT = mkText(pg6, 832, 196, 'continuous', { size: 30, fill: '#C2410C', weight: 800 });
  E('rect', { x: 650, y: 222, width: 460, height: 40, rx: 6, fill: '#F7E7B0', stroke: INK, 'stroke-width': 3 }, pg6);
  let rt = ''; for (let i = 0; i <= 23; i++) rt += `M${650 + i * 20},222 l0,${i % 5 === 0 ? 16 : 9} `;
  E('path', { d: rt, stroke: INK, 'stroke-width': 2 }, pg6);
  const footBar = E('rect', { x: 650, y: 268, width: 10, height: 18, rx: 6, fill: '#C2410C' }, pg6);
  mkText(pg6, 636, 346, '**shoe size**: ', { size: 30, fill: INK });
  const shoeT = mkText(pg6, 806, 346, 'discrete', { size: 30, fill: GREEN, weight: 800 });
  const nl3 = mkNumberLine(pg6, { from: 2, to: 4, step: 0.5, len: 400, size: 28, ink: INK, arrows: false,
    labels: [[2, '2'], [2.5, '2 1/2'], [3, '3'], [3.5, '3 1/2'], [4, '4']],
    marks: [{ v: 2, col: GREEN }, { v: 2.5, col: GREEN }, { v: 3, col: GREEN }],
    hops: [{ a: 2, b: 2.5, col: GREEN, height: 34 }, { a: 2.5, b: 3, col: GREEN, height: 34 }] });
  tr(nl3, 690, 420);
  const nothing = mkChip(pg6, 'nothing in between', { size: 26, col: '#5A6670', fill: '#FFFDF6' });

  // the queue outside the bubble tea shop: content centred on (0,0), about 500 x 190
  const queue = G(Lcard);
  const shop = G(queue);
  E('rect', { x: -250, y: -80, width: 124, height: 170, fill: '#F2ECFF', stroke: INK, 'stroke-width': 3 }, shop);
  E('rect', { x: -256, y: -96, width: 136, height: 64, rx: 6, fill: PURPLE, stroke: INK, 'stroke-width': 3 }, shop);
  T(shop, -188, -68, 'BUBBLE', { size: 29, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  T(shop, -188, -40, 'TEA', { size: 29, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  E('rect', { x: -232, y: -14, width: 88, height: 104, fill: '#C9B8EE', stroke: INK, 'stroke-width': 3 }, shop);
  let qh = '', qbd = '', qc = '';
  const qPts = [];
  for (let r = 0; r < 2; r++) for (let i = 0; i < 9; i++) { const x = -96 + i * 40 + (r ? 20 : 0), y = r ? 72 : 6; qPts.push([x, y]); }
  qPts.forEach(([x, y]) => {
    qh += `M${x - 10},${y - 46} a10,10 0 1 0 20,0 a10,10 0 1 0 -20,0 `;
    qbd += `M${x - 13},${y} L${x - 11},${y - 30} Q${x},${y - 38} ${x + 11},${y - 30} L${x + 13},${y} Z `;
    qc += `M${x + 12},${y - 30} l12,0 l-2,18 l-8,0 Z `;
  });
  E('path', { d: qbd, fill: '#5C6F86' }, queue);
  E('path', { d: qh, fill: '#C68E62' }, queue);
  const qCups = E('path', { d: qc, fill: PURPLE, stroke: INK, 'stroke-width': 1.5 }, queue);
  const qChip = mkChip(queue, '**1000** people', { size: 30, col: PURPLE, fill: '#FFFFFF' }); tr(qChip, 80, -78);
  const think = cloud(Lcard, 580, 150, -40, 150);   // the thought cloud (behind the queue): Lcard order puts it on top, so move it
  Lcard.insertBefore(think, queue);
  const stampB = sdStamp(Lfg, 'biased');

  /* ================= chips, bubbles ================= */
  const cMon = chipD(Lfg, '**Monday night**: dinner', { col: GOLD, size: 30 });
  const bubDad = mkSpeechBubble(Lfg, 'Ask **all 1200** pupils!', { size: 32, tail: 'down', tailX: -90 });
  const pc = {
    conv: chipD(Lfg, '**convenience** sample: big, easy, **biased**', { col: '#FF8A80', size: 27 }),
    how: chipD(Lfg, '**how** you choose > **how many**', { col: GOLD }),
    rand: chipD(Lfg, '**simple random**: a computer picks', { col: '#CFE3FF' }),
    sys: chipD(Lfg, '**systematic**: every **20th** name,\nfrom a random start', { col: GOLD }),
    start: chipD(Lfg, 'random start: **7**', { col: GOLD }),
    still: chipD(Lfg, '{{1187 <= 1200}} ✓ still on the list', { col: '#9FE0B5' }),
    strat: chipD(Lfg, '**stratified**: each year group\nin proportion', { col: GOLD }),
    each: chipD(Lfg, '{{1200 ÷ 60 = 20}}: **1 in every 20**', { col: '#CFE3FF', size: 26 }),
    p1: chipD(Lfg, '**1** no time frame', { col: '#FF8A80', size: 26 }),
    p2: chipD(Lfg, '**2** overlap at $2', { col: '#FF8A80', size: 26 }),
    p3: chipD(Lfg, '**3** a gap', { col: '#FF8A80', size: 26 }),
    fixed: chipD(Lfg, '**time frame**, no overlaps, no gaps', { col: '#9FE0B5' }),
    shoe: chipD(Lfg, 'shoe size: **continuous?**', { col: '#FFB27A' }),
  };
  const shoe = sneaker(Lfg);

  /* ================= the cast ================= */
  const dad = cast(Lcast, 'dad');
  const mum = cast(Lcast, 'mum');
  const boy = cast(Lcast, 'boy');
  const kav = cast(Lcast, 'kavya');
  const lt = { dad: sdLowerThird(Lhud, 'dad'), boy: sdLowerThird(Lhud, 'boy'), mum: sdLowerThird(Lhud, 'mum') };
  const ltOn = (t, who, t0) => lt[who].set(win(t, t0, t0 + 3.1, 0.3));
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cut points */
  const c1 = mid('cycle', 0.27), c2 = at('all') - 0.06, c3 = at('census') - 0.06, c4 = at('thousand') - 0.06, c5 = at('digest') - 0.06,
    c6 = at('system') - 0.06, c7 = at('three') - 0.06, c8 = at('fixed') - 0.06;
  const FX = { dad: 160, mum: 370, boy: 580, kav: 790 }, PX = { dad: 112, mum: 246, boy: 380, kav: 514 };

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const sF = on(t, -1, c1) || on(t, c2, c3) || on(t, c4, c5), sD = on(t, c1, c2) || on(t, c3, c4),
      sL = on(t, c5, c6) || on(t, c7, c8), sP = on(t, c6, c7) || on(t, c8, 1e9);
    const sFlat = sF || sP || sL;
    for (const k in lt) lt[k].set(0);
    for (const k in ch) ch[k].set(0);
    for (const k in pc) pc[k].set(0);
    cMon.set(0); bubDad.set(0); stampB.set(0); op(shoe, 0);

    /* ---------- sets ---------- */
    op(flat, sFlat); op(flat.front, sFlat); op(flat.top, sFlat);
    op(desk, sD); op(desk.front, sD); op(desk.top, sD);
    if (sD) desk.upd(t);

    /* ---------- the desk: cycle, census ---------- */
    op(cyc, sD && t < c2 ? 1 : 0); op(cen, sD && t >= c3 ? 1 : 0); op(axisD, sD);
    if (sD) {
      tr(axisD, 330, 392, 1.1);
      let glass = 0, look = 0.9;
      if (t < c2) {
        const lit = [mid('cycle', 0.42), mid('cycle', 0.52), mid('cycle', 0.62), mid('cycle', 0.76)];
        boxes.forEach((b, i) => { op(b, P(t, c1 + i * 0.08, 0.2, linear)); op(b.hi, P(t, lit[i], 0.2, linear)); });
        cArrows.forEach((a, i) => a.set(P(t, lit[i] + 0.15, 0.35, ease)));
        op(again, P(t, mid('cycle', 0.86), 0.3, linear)); op(againT, P(t, mid('cycle', 0.86), 0.3, linear));
        tr(again, 0, 0);
        ch.cycle.set(P(t, c1 + 0.1, 0.3, linear)); tr(ch.cycle, 895, 495);
      } else {
        const t0 = at('census');
        op(gridD, 1);
        // everyone: a gold ripple over every dot
        const evP = win(t, mid('census', 0.08), mid('census', 0.36), 0.15);
        op(gridD.lit, 1);
        if (evP > 0) { attr(gridD.base, 'fill', evP > 0.5 ? GOLD : '#9AA6B2'); } else attr(gridD.base, 'fill', '#9AA6B2');
        // the sample: 60 dots light up, then fly into the box
        const sp = P(t, mid('census', 0.5), 0.3, linear);
        gridD.show(sp > 0 ? sampN : []);
        const fly = P(t, mid('census', 0.6), 0.9, ease);
        let fd = '';
        if (fly > 0) sampN.forEach((n, i) => { const [gx, gy] = gridD.xy(n); const [bx, by] = boxXY(i); fd += sq(lerp(682 + gx, bx, fly) - 1, lerp(200 + gy, by, fly) - 1, 7.4); });
        attr(flyP, 'd', fd);
        op(sBox, P(t, mid('census', 0.58), 0.3, linear));
        ch.census.set(win(t, mid('census', 0.1), mid('census', 0.36), 0.15)); tr(ch.census, 895, 495);
        ch.slow.set(win(t, mid('census', 0.36), mid('census', 0.62), 0.12)); tr(ch.slow, 895, 495);
        ch.rep.set(t >= mid('census', 0.72) ? P(t, mid('census', 0.72), 0.3, linear) : 0); tr(ch.rep, 895, 495);
        glass = t > mid('census', 0.5) && t < mid('census', 0.9) ? 1 : 0;
        if (t < t0) op(cen, 0);
      }
      axisD.set({ t, talk: scTalk(S, t, 'axis'), mood: 'deadpan', look, glass });
    }

    /* ---------- the laptop ---------- */
    op(lap, sF || sL);
    if (sF) { tr(lap, 1040, 452, 0.6); }
    if (sL) { tr(lap, 322, 392, 1.1); }
    if (sF || sL) {
      let glass = 0;
      if (sL && t >= c7) glass = t > mid('three', 0.08) ? 1 : 0;
      if (sL && t < c7) glass = t > mid('digest', 0.3) && t < mid('digest', 0.7) ? 1 : 0;
      lap.axis.set({ t, talk: scTalk(S, t, 'axis'), mood: 'deadpan', look: sL ? 0.8 : -0.6, glass });
    }

    /* ---------- the card ---------- */
    const cardOn = sP || sL;
    op(card, cardOn);
    op(pg1, 0); op(pg2, 0); op(pg3, 0); op(pg4, 0); op(pg5, 0); op(pg6, 0);
    op(queue, 0); op(think, 0);
    // the queue: a thought (F, thousand) or a card (L, digest)
    if (sF && t >= c4) {
      const p = P(t, mid('thousand', 0.3), 0.35, pop);
      op(think, clamp(p * 3)); op(queue, clamp(p * 3));
      tr(think, 600, 214, Math.max(0.01, 0.6 + 0.4 * p)); tr(queue, 600, 220, Math.max(0.01, 0.9 * (0.6 + 0.4 * p)));
      op(qCups, 0);
    }
    if (sL && t < c7) {
      op(queue, 1); tr(queue, 885, 330, 1);
      op(qCups, P(t, mid('digest', 0.35), 0.3, linear));
      setText(cardHead, "AH BOY'S PLAN");
      const st = P(t, mid('digest', 0.45), 0.35, linear);
      if (st > 0) { stampB.set(st); tr(stampB, 940, 360, 0.68); }
    }
    if (sL && t >= c7) setText(cardHead, "MUM'S QUESTION");
    if (sP) setText(cardHead, t < at('question') ? 'SURVEY PLAN' : t < at('fixed') ? "MUM'S QUESTION" : t < at('types') ? 'FIXED QUESTION' : 'TYPES OF DATA');

    if (sP && t < at('strat')) {
      op(pg1, 1);
      // simple random, then systematic
      let litN = [];
      const rp = P(t, mid('system', 0.08), 0.32 * (end('system') - at('system')), linear);
      if (t < mid('system', 0.5)) litN = randN.slice(0, Math.floor(rp * 60));
      const s7 = mid('seven', 0.12), sRace = mid('seven', 0.62);
      if (t >= s7) {
        const k = t < sRace ? 1 + Math.floor(clamp((t - s7) / (sRace - s7)) * 4) : 4 + Math.floor(P(t, sRace, end('seven') - sRace + 0.4, linear) * 56);
        litN = sysN.slice(0, Math.min(60, k));
      }
      grid.show(litN);
      op(list[0], 0); list.forEach((l, i) => op(l, t >= s7 ? P(t, s7 + i * (sRace - s7) / 4, 0.15, linear) : 0));
      op(listHead, P(t, mid('system', 0.62), 0.3, linear));
      // the ring on the newest systematic dot
      if (t >= s7 && t < sRace + 0.2) { const k = Math.min(3, Math.floor(clamp((t - s7) / (sRace - s7)) * 4)); const [x, y] = grid.xy(sysN[k]); attr(ringDot, 'cx', 652 + x + 3); attr(ringDot, 'cy', 168 + y + 3); op(ringDot, 1); }
      else if (t >= at('last')) { const [x, y] = grid.xy(1187); attr(ringDot, 'cx', 652 + x + 3); attr(ringDot, 'cy', 168 + y + 3); op(ringDot, P(t, mid('last', 0.5), 0.2, linear)); }
      else op(ringDot, 0);
      op(m1, t < at('last') ? P(t, mid('system', 0.52), 0.3, linear) : 0);
      op(m2, P(t, mid('last', 0.12), 0.3, linear)); op(m2ring, P(t, mid('last', 0.55), 0.2, linear));
      lastLab.set(t >= mid('last', 0.5) ? P(t, mid('last', 0.5), 0.3, linear) : 0);
      const [lx, ly] = grid.xy(1187); tr(lastLab, 652 + lx + 3, 168 + ly - 26);
    }
    if (sP && t >= at('strat') && t < at('question')) {
      op(pg2, 1);
      tbl.cells.forEach((row, r) => row.forEach((c, j) => op(c, j < 2 || r === 0 ? 1 : P(t, mid('strat', 0.55) + (r - 1) * 0.18, 0.2, linear))));
      tblMark.set(P(t, mid('strat', 0.62), 0.3, linear));
      op(tblCol, P(t, mid('strat', 0.55), 0.3, linear));
      op(m3, P(t, mid('strat', 0.6), 0.3, linear));
    }
    if ((sP && t >= at('question') && t < at('fixed')) || (sL && t >= c7)) {
      op(pg3, 1);
      const q = sP && t < c7;
      qb.forEach((b, i) => op(b, q ? P(t, mid('question', 0.4 + i * 0.16), 0.25, linear) : 1));
      const tf = sL ? 1 : 0;
      perDay.set(tf * P(t, mid('three', 0.18), 0.3, linear)); tr(perDay, 1010, 236);
      op(nl1, tf * P(t, mid('three', 0.3), 0.3, linear));
      segs1.forEach((s, i) => op(s, P(t, mid('three', 0.34 + i * 0.05), 0.2, linear)));
      op(ov, P(t, mid('three', 0.46), 0.2, linear)); op(ring2a, tf * P(t, mid('three', 0.46), 0.2, linear)); op(ring2b, tf * P(t, mid('three', 0.46), 0.2, linear));
      op(gapR, P(t, mid('three', 0.7), 0.2, linear));
      const dp = P(t, mid('three', 0.74), 0.5, easeIn);
      op(drop, dp > 0 ? 1 : 0); tr(drop, nl1.x(4.5), lerp(-60, 0, dp));
    }
    if (sP && t >= at('fixed') && t < at('types')) {
      op(pg4, 1);
      fb.forEach((b, i) => op(b, P(t, mid('fixed', 0.45 + i * 0.14), 0.25, linear)));
      op(nl2, P(t, mid('fixed', 0.45), 0.3, linear));
      segs2.forEach((s, i) => op(s, P(t, mid('fixed', 0.5 + i * 0.14), 0.25, linear)));
      op(fTick, P(t, mid('fixed', 0.88), 0.25, linear));
    }
    if (sP && t >= at('types') && t < at('shoe2')) {
      op(pg5, 1);
      tcols.forEach((c, i) => op(c, P(t, mid('types', [0.04, 0.38, 0.7][i]), 0.25, linear)));
      swHand.setAttribute('transform', `rotate(${((t * 120 * AMP) % 360).toFixed(1)})`);
      contQ.set(t >= at('shoe') ? P(t, mid('shoe', 0.4), 0.3, linear) : 0); tr(contQ, colX[2], 466);
    }
    if (sP && t >= at('shoe2')) {
      op(pg6, 1);
      const fl = P(t, mid('shoe2', 0.05), 0.3 * (end('shoe2') - at('shoe2')), linear);
      attr(footBar, 'width', 10 + 400 * fl);
      op(footT, P(t, mid('shoe2', 0.12), 0.25, linear));
      const sh = mid('shoe2', 0.3);
      nl3.marks.forEach((m, i) => nl3.mark(i, P(t, sh + i * 0.35, 0.3, linear)));
      nl3.hops.forEach((h, i) => h.set(P(t, sh + 0.15 + i * 0.35, 0.3, linear)));
      op(shoeT, P(t, mid('shoe2', 0.6), 0.25, linear));
      nothing.set(P(t, mid('shoe2', 0.55), 0.3, linear)); tr(nothing, 1040, 386);
    }

    /* ---------- the humans ---------- */
    op(dad, sF || sP); op(mum, sF || sP); op(boy, sF || sP); op(kav, sF || sP);
    if (sF || sP) {
      const X = sF ? FX : PX, k = sF ? 0.92 : 0.8, y = sF ? 462 : 466;
      tr(dad, X.dad, y, k); tr(mum, X.mum, y, k); tr(boy, X.boy, y, k); tr(kav, X.kav, y, k);
      const who = scWho(S, t);
      const spk = { dad: X.dad, mum: X.mum, boy: X.boy, kavya: X.kav }[who];
      const tgt = spk !== undefined ? spk : (sF ? 1040 : 885);
      const lk = x => (spk === x ? (sF ? 0.6 : 0.9) : lookAt(x, tgt));
      let dm = 'neutral', mm = 'neutral', bm = 'happy', km = 'neutral', blift = 0, dlift = 0;
      if (t < c1) { blift = 0.6 + 0.4 * Math.sin(t * 9); km = 'happy'; }
      if (t >= c2 && t < c3) { dm = t < mid('all', 0.4) ? 'happy' : 'smug'; mm = 'deadpan'; km = t > mid('all', 0.6) ? 'deadpan' : 'neutral'; dlift = P(t, mid('all', 0.3), 0.3, ease); }
      if (t >= c4 && t < c5) { blift = 1; dm = 'happy'; mm = 'annoyed'; km = 'deadpan'; }
      if (sP && t < at('strat')) { km = 'neutral'; if (t >= at('seven') && t < at('last')) { blift = 1; km = 'happy'; } if (t >= at('last')) km = 'smug'; dm = 'neutral'; }
      if (sP && t >= at('strat') && t < c7) { mm = t < at('question') ? 'happy' : 'smug'; dm = 'happy'; km = 'neutral'; }
      if (sP && t >= c8) { km = t < at('shoe') ? 'neutral' : 'deadpan'; mm = 'neutral'; }
      if (sP && t >= at('fixed') && t < at('types')) { km = 'smug'; mm = 'happy'; }
      if (sP && t >= at('shoe') && t < at('shoe2')) { blift = 0.8; bm = 'happy'; mm = 'deadpan'; dm = 'smug'; }
      if (sP && t >= at('shoe2')) { mm = t < mid('shoe2', 0.82) ? 'deadpan' : 'smug'; bm = t < mid('shoe2', 0.82) ? 'happy' : 'shock'; dm = 'happy'; km = 'deadpan'; }
      dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: lk(X.dad), lift: dlift });
      mum.set({ t, talk: scTalk(S, t, 'mum'), mood: mm, look: lk(X.mum), lift: sP && t >= at('strat') && t < at('three') ? 0.5 : 0 });
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: bm, look: lk(X.boy), lift: blift });
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: lk(X.kav) });
    }

    /* ---------- chips ---------- */
    if (sF && t < c1) popSet(cMon, t, at('cycle') + 0.1, c1, 330, 150);
    if (sF && t >= c2 && t < c3) popSet(bubDad, t, mid('all', 0.3), c3, 290, 230);
    if (sF) {
      ltOn(t, 'dad', at('all') + 0.2);
      ltOn(t, 'boy', at('thousand') + 0.2);
    }
    if (sL && t < c7) {
      popSet(pc.conv, t, mid('digest', 0.04), c6, 310, 150);
      popSet(pc.how, t, mid('digest', 0.72), c6, 310, 212);
    }
    if (sL && t >= c7) {
      popSet(pc.p1, t, mid('three', 0.18), 1e9, 160, 150);
      popSet(pc.p2, t, mid('three', 0.46), 1e9, 420, 150);
      popSet(pc.p3, t, mid('three', 0.7), 1e9, 160, 210);
    }
    if (sP) {
      popSet(pc.rand, t, mid('system', 0.08), mid('system', 0.5), 310, 150);
      popSet(pc.sys, t, mid('system', 0.55), at('seven'), 310, 180);
      popSet(pc.start, t, mid('seven', 0.08), at('last'), 380, 170);
      popSet(pc.still, t, mid('last', 0.62), at('strat'), 310, 170);
      popSet(pc.strat, t, mid('strat', 0.05), at('question'), 310, 160);
      popSet(pc.each, t, mid('strat', 0.42), at('question'), 310, 268);
      popSet(pc.fixed, t, mid('fixed', 0.88), at('types'), 310, 170);
      if (t >= at('shoe') && t < at('shoe2')) {
        popSet(pc.shoe, t, mid('shoe', 0.2), at('shoe2'), 380, 160);
        const p = P(t, mid('shoe', 0.3), 0.4, pop); op(shoe, clamp(p * 3)); tr(shoe, 380, 270 - 10 * Math.abs(Math.sin(t * 5)) * AMP, Math.max(0.01, 0.9 * p), -10);
        op(shoe.hole, 0);
      }
      if (t >= at('shoe2')) {
        const p = P(t, mid('shoe2', 0.82), 0.35, pop);
        op(shoe, clamp(p * 3)); tr(shoe, 380, 250, Math.max(0.01, 1.1 * p), -6); op(shoe.hole, 1);
      }
      ltOn(t, 'mum', at('strat') + 0.2);
    }
  };
});
