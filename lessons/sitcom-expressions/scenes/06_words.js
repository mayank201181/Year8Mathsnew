/* Scene 6: Think of a number (writing expressions & formulae).
   Shots (hard sitcom cuts):
   A  6 p.m., the party in full swing (guests behind): Ah Boy the magician on a chair (paper hat, tea-towel cape, wand),
      Kavya, Priya, Dad, Mr Tan; Agent X on the table. six: clock 6:00, "6 p.m." -> trick: the four steps pop as
      numbered chips -> five: a big "5!" with sparkles; Dad and Mr Tan shock -> how: Mr Tan, deadpan, slow push-in.
   B  Agent X's confessional with the magic mat (the showpiece): one cup (n) -> two cups (2n) -> ten coins (2n + 10)
      -> half of it goes (n + 5) -> the cup vanishes: exactly 5 coins (5); the algebra builds row by row.
   C  two humans at the table (left), Agent X on the table when he speaks, and a card on the right:
      ident: (2n + 10)/2 − n = n + 5 − n = 5, (2n + 10)/2 − n ≡ 5, IDENTITY CONFIRMED
      less / order: "n less than 10" -> Priya's n − 10 ? -> number line: start at 10, step back n: 10 − n;
             "10 less than n" = n − 10
      dad / blown: "add 3, then double" -> Dad's 2n + 3 ? -> undercover as n = 4: 4 + 3 = 7, 7 × 2 = 14 but
             2 × 4 + 3 = 11, 14 ≠ 11, COVER BLOWN, 2(n + 3)
      money: Priya's $p bar in quarters: ¼p gift, $3 bubble tea: p − ¼p − 3 = ¾p − 3
      taxi / formula / subject: $4 flag-down + $0.70 per km: 4 + 0.7 × 5 = $7.50, 4 + 0.7 × 12 = $12.40,
             C = 4 + 0.7d (C: cost in $, d: distance in km), the gold ring round C: the subject. */
scene('words', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.4, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const fadeIn = (t, t0, d) => P(t, t0, d || 0.3, linear);
  const view = (el, k, fx, fy, sx, sy) => el.setAttribute('transform', `translate(${sx.toFixed(1)} ${sy.toFixed(1)}) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const GOLD = '#FFE45C', RED = '#D32F2F', BLUE = '#2E6FD8', GREEN = '#1E9E5A', GREY = '#5A6670', INK = MK.ink, ORANGE = '#E07A12', PURPLE = '#8E44AD';
  const chipC = (parent, text, o) => { o = o || {}; return mkChip(parent, text, Object.assign({ size: o.size || 30, col: o.col || GOLD }, o)); };
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 3, color: o.color || C.ink, weight: 700 }); };
  /* maths pieces on one baseline, centred on cx (or starting at cx with anchor 'start') */
  const row = (parent, cx, y, parts, o) => {
    o = o || {}; const s = o.size || 50, gap = o.gap !== undefined ? o.gap : s * 0.24;
    const ms = parts.map(p => (typeof p === 'string' ? { m: p } : p)).map(p => Object.assign({}, p, mkMeasure(p.m, { size: s })));
    const Wd = ms.reduce((a, p) => a + p.w, 0) + gap * (ms.length - 1);
    let x = o.anchor === 'start' ? cx : cx - Wd / 2; const out = [];
    ms.forEach(p => { const g = mkMath(parent, x, y, p.m, { size: s, fill: p.col || o.fill || INK }); out.push({ g, x0: x, w: p.w, cx: x + p.w / 2, a: p.a }); x += p.w + gap; });
    out.W = Wd; out.x0 = out[0].x0; out.x1 = x - gap; return out;
  };
  const strikeLine = (parent, x1, y, x2) => { const l = E('line', { x1, y1: y, x2, y2: y, stroke: RED, 'stroke-width': 7, 'stroke-linecap': 'round' }, parent); mkDash(l); return l; };

  /* layers */
  const Lbg = G(root), Lcast = G(root), Lfront = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= the living room (A and C) ================= */
  const flatShot = G(Lbg), flatWrap = G(flatShot);
  const flat = xpFlat(flatWrap);
  Lfront.appendChild(flat.front); Lfront.appendChild(flat.top);
  // party guests behind the cast: soft silhouettes with paper plates
  const guests = [[700, 372, '#C79A6E', 1.0], [905, 380, '#B98AA0', 0.92], [1110, 368, '#8FA3B8', 1.05], [235, 385, '#A8B48A', 0.9]].map(([x, y, c, s], i) => {
    const g = G(flat.mid); tr(g, x, y, s);
    E('path', { d: 'M-70,120 Q-66,40 -30,30 L30,30 Q66,40 70,120 Z', fill: c, opacity: 0.55 }, g);
    E('circle', { cx: 0, cy: -10, r: 36, fill: c, opacity: 0.55 }, g);
    E('ellipse', { cx: i % 2 ? -46 : 46, cy: 48, rx: 30, ry: 8, fill: '#FFFFFF', opacity: 0.8 }, g);
    return { g, x, y, s };
  });
  // paper plates and a cup on the table
  [[180, 528], [430, 532], [1000, 530]].forEach(([x, y]) => { E('ellipse', { cx: x, cy: y, rx: 40, ry: 10, fill: '#FFFFFF', stroke: '#B9C4CE', 'stroke-width': 3 }, flat.top); });
  const cA6 = pill(Lfg, '6 p.m.', { size: 34, color: GOLD, stroke: GOLD });
  // the four steps of the trick
  const STEPS = ['**1** double it', '**2** add {{10}}', '**3** cut it in half', '**4** take away your number'];
  const stepChips = STEPS.map(s => chipC(Lfg, s, { size: 28, col: GOLD }));
  const stepX = (() => { const ws = stepChips.map(c => c.w), gap = 18, tot = ws.reduce((a, b) => a + b, 0) + gap * 3; let x = 600 - tot / 2; return ws.map(w => { const c = x + w / 2; x += w + gap; return c; }); })();
  // "5!"
  const five = G(Lfg);
  const fiveT = T(five, 0, 40, '5!', { size: 120, weight: 800, anchor: 'middle', fill: GOLD });
  fiveT.setAttribute('stroke', '#5A3A07'); fiveT.setAttribute('stroke-width', 10); fiveT.setAttribute('paint-order', 'stroke');
  const sparks = [[-110, -30], [100, -50], [-80, 60], [120, 40], [0, -90]].map(([x, y]) => { const s = spark(five, 18, { color: GOLD }); tr(s, x, y); return s; });

  /* ================= C: the card ================= */
  const card = G(Lfg);
  E('rect', { x: 576, y: 116, width: 590, height: 540, rx: 18, fill: 'rgba(0,0,0,0.25)' }, card);
  E('rect', { x: 570, y: 110, width: 590, height: 540, rx: 18, fill: MK.paper, stroke: '#B8A27A', 'stroke-width': 5 }, card);
  const CX = 865;
  const title = s => T(G(card), CX, 162, s, { size: 34, weight: 800, anchor: 'middle', fill: INK });

  // ident: the trick is an identity
  const pId = G(card);
  T(pId, CX, 162, "Ah Boy's trick, in algebra", { size: 34, weight: 800, anchor: 'middle', fill: INK });
  const wId = mkWorking(pId, 830, 205, ['(2n + 10)/2 - n = n + 5 - n', '= 5'], { size: 46, fill: INK, gap: 30 });
  const idR = row(pId, CX, 470, ['(2n + 10)/2 - n', { m: '≡', col: PURPLE }, { m: '5', col: PURPLE }], { size: 54, gap: 20 });
  const cEvery = chipC(pId, '**5** for **every** {{n}}', { col: PURPLE, size: 30, fill: '#F3E8FA' }); tr(cEvery, CX, 548);
  const stampId = xpStamp(pId, true);

  // less / order: n less than 10
  const pLess = G(card);
  mkText(pLess, CX, 168, '“{{n}} less than {{10}}”', { size: 40, anchor: 'middle', fill: INK, weight: 700 });
  const lessP = G(pLess);
  const lpR = row(lessP, 760, 252, [{ m: 'n - 10', col: RED }, { m: '?', col: RED }], { size: 54, gap: 14 });
  const lessS = strikeLine(lessP, lpR.x0 - 10, 234, lpR[0].x0 + lpR[0].w + 10);
  const lessOk = G(pLess);
  const loR = row(lessOk, 1000, 252, [{ m: '10 - n', col: GREEN }], { size: 54 });
  tr(tick(lessOk, 16, GREEN), loR.x1 + 30, 236);
  const nl = mkNumberLine(pLess, { from: 0, to: 10, len: 470, size: 26, ink: INK,
    marks: [{ v: 10, col: BLUE }, { v: 6, col: GREEN }],
    hops: [{ a: 10, b: 6, label: 'back {{n}}', col: ORANGE, height: 46, size: 28 }] });
  tr(nl, CX - 235, 372);
  const nlStart = mkText(pLess, CX - 235 + nl.x(10), 462, 'start', { size: 28, anchor: 'middle', fill: BLUE, weight: 700 });
  const nlLand = mkText(pLess, CX - 235 + nl.x(6), 466, '{{10 - n}}', { size: 30, anchor: 'middle', fill: GREEN, weight: 700 });
  const lessL1 = mkText(pLess, CX, 540, '“{{n}} less than {{10}}” = {{10 - n}}', { size: 32, anchor: 'middle', fill: GREEN, weight: 700 });
  const lessL2 = mkText(pLess, CX, 600, '“{{10}} less than {{n}}” = {{n - 10}}', { size: 32, anchor: 'middle', fill: BLUE, weight: 700 });

  // dad / blown: add 3, then double
  const pDad = G(card);
  mkText(pDad, CX, 168, '“add {{3}}, then double”', { size: 40, anchor: 'middle', fill: INK, weight: 700 });
  const dadC = G(pDad);
  const dcR = row(dadC, CX, 250, [{ m: 'Dad:', col: GREY }, '2n + 3', { m: '?', col: RED }], { size: 50, gap: 18 });
  const dadS = strikeLine(dadC, dcR[1].x0 - 8, 234, dcR[1].x0 + dcR[1].w + 8);
  const bl1 = mkText(pDad, CX, 328, 'undercover as {{n = 4}}', { size: 30, anchor: 'middle', fill: BLUE, weight: 700 });
  const bl2 = mkText(pDad, CX, 392, 'add 3: {{4 + 3 = 7}},  double: {{7 × 2 = 14}}', { size: 32, anchor: 'middle', fill: INK });
  const bl3 = mkText(pDad, CX, 452, '{{2n + 3}}:  {{2 × 4 + 3 = 11}}', { size: 32, anchor: 'middle', fill: INK });
  const bl4 = mkMath(pDad, CX, 518, '14 != 11', { size: 50, anchor: 'middle', fill: RED });
  const blFix = G(pDad);
  const bfR = row(blFix, CX - 80, 604, [{ m: '2(n + 3)', col: GREEN }], { size: 52 });
  mkText(blFix, bfR.x1 + 20, 598, 'brackets keep\nthe order', { size: 26, fill: GREEN, weight: 700, lh: 0 });
  tr(blFix, 0, 0);
  const stampDad = xpStamp(pDad, false);

  // money: Priya's p dollars
  const pMon = G(card);
  mkText(pMon, CX, 166, "Priya's money: {{p}} dollars", { size: 36, anchor: 'middle', fill: INK, weight: 700 });
  const BX0 = 620, BW = 480, BY = 250, BH = 66;
  const barAll = E('rect', { x: BX0, y: BY, width: BW, height: BH, rx: 6, fill: '#E8F4FF', stroke: INK, 'stroke-width': 4 }, pMon);
  const qLines = G(pMon);
  E('path', { d: [1, 2, 3].map(k => `M${BX0 + k * BW / 4},${BY} L${BX0 + k * BW / 4},${BY + BH}`).join(' '), stroke: INK, 'stroke-width': 3, 'stroke-dasharray': '8 6' }, qLines);
  const pBrace = mkBrace(pMon, BX0, BY - 8, BX0 + BW, BY - 8, { text: '{{p}}', col: BLUE, size: 34, depth: 18 });
  const qGift = G(pMon);
  E('rect', { x: BX0 + 2, y: BY + 2, width: BW / 4 - 4, height: BH - 4, fill: '#FF8FC8' }, qGift);
  mkText(qGift, BX0 + BW / 8, BY + 44, 'gift', { size: 26, anchor: 'middle', fill: INK, weight: 700 });
  const qGiftL = mkText(pMon, BX0 + BW / 8, BY + BH + 46, '{{1/4 p}}', { size: 32, anchor: 'middle', fill: '#C2185B' });
  const tea = G(pMon);
  E('rect', { x: BX0 + BW / 4, y: BY + 2, width: 70, height: BH - 4, fill: '#56D69B' }, tea);
  mkText(tea, BX0 + BW / 4 + 35, BY + 44, '$3', { size: 28, anchor: 'middle', fill: INK, weight: 800 });
  const teaL = mkText(pMon, BX0 + BW / 4 + 35, BY + BH + 46, 'tea', { size: 28, anchor: 'middle', fill: GREEN, weight: 700 });
  const leftB = mkBrace(pMon, BX0 + BW, BY + BH + 8, BX0 + BW / 4 + 70, BY + BH + 8, { text: 'left', col: PURPLE, size: 30, depth: 16 });
  const wMon = mkWorking(pMon, 790, 420, ['"left" = p - 1/4 p - 3', '= 3/4 p - 3'], { size: 46, fill: INK, gap: 28 });

  // taxi / formula / subject
  const pTax = G(card);
  const taxi = xpTaxi(pTax, 0.62); tr(taxi, 700, 232);
  mkText(pTax, 820, 184, '{{$4}} flag-down', { size: 32, fill: INK, weight: 700 });
  mkText(pTax, 820, 234, '+ {{$0.70}} per km', { size: 32, fill: INK, weight: 700 });
  const tx1 = G(pTax), tx2 = G(pTax), tx3 = G(pTax);
  mkText(tx1, 600, 330, '**5** km', { size: 30, fill: GREY, boldFill: ORANGE, weight: 700 });
  row(tx1, 720, 330, ['4 + 0.7 ×', { m: '5', col: ORANGE }, '=', { m: '$7.50', col: GREEN }], { size: 42, anchor: 'start', gap: 12 });
  mkText(tx2, 600, 404, '**12** km', { size: 30, fill: GREY, boldFill: ORANGE, weight: 700 });
  row(tx2, 720, 404, ['4 + 0.7 ×', { m: '12', col: ORANGE }, '=', { m: '$12.40', col: GREEN }], { size: 42, anchor: 'start', gap: 12 });
  mkText(tx3, 600, 494, '**d** km', { size: 30, fill: GREY, boldFill: ORANGE, weight: 700 });
  const fR = row(tx3, 720, 494, ['C', '=', '4 + 0.7', { m: 'd', col: ORANGE }], { size: 58, anchor: 'start', gap: 12 });
  tr(fR[3].g, -10, 0);
  const fBox = E('rect', { x: 706, y: 440, width: fR.x1 - 700, height: 76, rx: 12, fill: 'none', stroke: GREEN, 'stroke-width': 4 }, tx3);
  const txNotes = mkText(pTax, CX, 560, '{{C}}: cost in $      {{d}}: distance in km', { size: 28, anchor: 'middle', fill: GREY, weight: 700 });
  const cRing = E('ellipse', { cx: fR[0].cx, cy: 474, rx: 34, ry: 40, fill: 'none', stroke: '#E2A21C', 'stroke-width': 6 }, pTax);
  mkDash(cRing);
  const cSubj = chipC(pTax, '**subject**: the letter on its own', { col: '#B57B12', size: 28, fill: '#FFF4D0' }); tr(cSubj, CX, 616);
  const pages = [pId, pLess, pDad, pMon, pTax];

  /* ================= B: Agent X's confessional, the magic mat ================= */
  const conf = xpConf(Lbg, 'x');
  const mat = G(Lfg);
  E('rect', { x: 546, y: 116, width: 616, height: 540, rx: 18, fill: 'rgba(0,0,0,0.3)' }, mat);
  E('rect', { x: 540, y: 110, width: 616, height: 540, rx: 18, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, mat);
  E('rect', { x: 560, y: 128, width: 576, height: 246, rx: 16, fill: '#1E6B44', stroke: '#0E3A24', 'stroke-width': 4 }, mat);
  E('rect', { x: 572, y: 140, width: 552, height: 222, rx: 12, fill: 'none', stroke: '#FFE45C', 'stroke-width': 2, opacity: 0.4 }, mat);
  const divider = E('line', { x1: 848, y1: 146, x2: 848, y2: 356, stroke: '#FFFFFF', 'stroke-width': 4, 'stroke-dasharray': '12 10' }, mat);
  const mkCup = parent => {
    const g = G(parent);
    E('path', { d: 'M-42,0 L42,0 L30,-86 L-30,-86 Z', fill: '#E8424F', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
    E('rect', { x: -46, y: -8, width: 92, height: 12, rx: 5, fill: '#B8232F', stroke: SC_INK, 'stroke-width': 3 }, g);
    E('path', { d: 'M-18,-76 L-22,-14', stroke: '#FFFFFF', 'stroke-width': 4, opacity: 0.5, 'stroke-linecap': 'round' }, g);
    mkMath(g, 2, -26, 'n', { size: 48, fill: '#FFFFFF', anchor: 'middle' });
    return g;
  };
  const mkCoin = parent => { const g = G(parent); E('circle', { r: 18, fill: '#FFC247', stroke: '#8A5A10', 'stroke-width': 3 }, g); E('circle', { r: 11, fill: 'none', stroke: '#B57B12', 'stroke-width': 2 }, g); return g; };
  const GX = [706, 990];
  const grp = GX.map(() => G(mat));
  const cups = grp.map(g => mkCup(g));
  const coins = [];
  grp.forEach((g, gi) => { for (let k = 0; k < 5; k++) coins.push({ c: mkCoin(g), gi, k }); });
  const coinGlow = E('ellipse', { cx: GX[0], cy: 322, rx: 120, ry: 34, fill: glow('#FFE45C'), opacity: 0 }, mat);
  mat.insertBefore(coinGlow, grp[0]);
  const ROWS = [['think of a number', 'n'], ['double it', '2n'], ['add 10', '2n + 10'], ['cut it in half', 'n + 5'], ['take away your number', '5']];
  const rowY = [432, 478, 524, 570, 620];
  const rowHl = E('rect', { x: 556, y: 0, width: 584, height: 46, rx: 10, fill: 'rgba(255,228,92,0.45)' }, mat);
  const rowsG = ROWS.map(([lab, ex], i) => {
    const g = G(mat);
    mkText(g, 880, rowY[i], lab, { size: 28, anchor: 'end', fill: GREY, weight: 700 });
    mkMath(g, 905, rowY[i] + 2, ex, { size: i === 4 ? 46 : 40, fill: i === 4 ? GREEN : INK });
    return g;
  });

  /* ================= the cast ================= */
  const kav = cast(Lcast, 'kavya');
  const priya = cast(Lcast, 'priya');
  const mum = cast(Lcast, 'mum', { prop: 'phone', propCol: '#FFC247' });
  const tan = cast(Lcast, 'tan');
  const dad = cast(Lcast, 'dad');
  // Ah Boy the magician: tea-towel cape behind him, paper hat, a wand
  const cape = G(Lcast);
  E('path', { d: 'M-104,40 Q-120,120 -96,150 L96,150 Q120,120 104,40 Q0,0 -104,40 Z', fill: '#C62828', stroke: SC_INK, 'stroke-width': 4 }, cape);
  E('path', { d: 'M-108,70 L108,70 M-112,100 L112,100 M-60,30 L-70,150 M60,30 L70,150', stroke: '#FFFFFF', 'stroke-width': 6, opacity: 0.85 }, cape);
  const boy = cast(Lcast, 'boy', { hand: true });
  const wand = G(boy.hand);
  E('path', { d: 'M0,10 L0,-96', stroke: SC_INK, 'stroke-width': 10, 'stroke-linecap': 'round' }, wand);
  E('path', { d: 'M0,-80 L0,-98', stroke: '#FFFFFF', 'stroke-width': 8, 'stroke-linecap': 'round' }, wand);
  const wStar = spark(wand, 14, { color: GOLD }); tr(wStar, 0, -110);
  const hat = G(Lcast);
  E('path', { d: 'M-46,0 L0,-96 L46,0 Z', fill: '#2E7DD8', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, hat);
  E('path', { d: 'M-20,-20 l6,-12 l6,12 Z M8,-50 l5,-10 l5,10 Z', fill: GOLD }, hat);
  E('circle', { cx: 0, cy: -98, r: 9, fill: GOLD, stroke: SC_INK, 'stroke-width': 3 }, hat);
  const crumbs = G(Lcast);
  [[-14, 0], [10, 6], [-4, 14], [16, -6]].forEach(([x, y]) => E('circle', { cx: x, cy: y, r: 4, fill: '#E07A12' }, crumbs));
  const ax = cast(Lcast, 'x');
  const BADGE = { n: 'n', four: 'n = 4' };
  const badge = {};
  for (const k in BADGE) { const m = mkMath(ax.badge, 0, 0, BADGE[k], { size: 34, fill: INK, anchor: 'middle' }); tr(m, 0, 2 + (m.a - m.d) / 2 - 6); badge[k] = m; }

  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* ---------- shots ---------- */
  const cut = id => at(id) - 0.06;
  const SH = [['A', -9], ['B', cut('n')], ['C', cut('ident')]];
  const shotAt = t => { let s = 'A'; for (const [k, t0] of SH) if (t >= t0) s = k; return s; };
  const pageAt = t => (t < cut('less') ? 0 : t < cut('dad') ? 1 : t < cut('money') ? 2 : t < cut('taxi') ? 3 : 4);
  const ALL = [kav, priya, mum, tan, dad, boy, ax, cape, hat, crumbs];

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const sh = shotAt(t), who = scWho(S, t);
    const flatOn = sh === 'A' || sh === 'C' ? 1 : 0;
    op(flatShot, flatOn); op(flat.front, flatOn); op(flat.top, flatOn);
    ALL.forEach(c => op(c, 0));
    op(cA6, 0); stepChips.forEach(c => c.set(0)); op(five, 0);
    op(card, 0); pages.forEach(p => op(p, 0));
    for (const k in badge) op(badge[k], 0);
    const show = (c, x, y, s, st) => { op(c, 1); tr(c, x, y, s); if (c.set) c.set(Object.assign({ t }, st)); };

    if (flatOn) {
      flat.upd(t, 1);
      flat.clock.set(6, Math.min(59, Math.floor(t / 4))); tr(flat.clock, 1124, 246);
      guests.forEach(({ g, x, y, s }, i) => tr(g, x, y + Math.sin(t * 1.6 + i * 2) * 3 * AMP, s));
    }

    /* ---------- A: the magic show ---------- */
    if (sh === 'A') {
      const k = t > at('how') ? 1 + 0.16 * P(t, at('how') + 0.1, end('how') + 0.3 - at('how'), ease) : 1;
      view(flatWrap, k, 990, 400, 990, 400); view(Lcast, k, 990, 400, 990, 400);
      view(flat.front, k, 990, 400, 990, 400); view(flat.top, k, 990, 400, 990, 400);
      if (t < at('trick')) popIn(cA6, t, at('six') + 0.3, 300, 168);
      const stepT = [0.24, 0.38, 0.49, 0.7].map(f => mid('trick', f));
      const fiveAt = mid('five', 0.45);
      if (t >= at('trick') && t < fiveAt - 0.1) stepChips.forEach((c, i) => { c.set(P(t, stepT[i], 0.4, linear)); tr(c, stepX[i], 160); });
      if (t >= fiveAt - 0.1) {
        const p = popIn(five, t, fiveAt - 0.1, 860, 210, 1, Math.sin(t * 3) * 3 * AMP);
        sparks.forEach((s, i) => { op(s, clamp(p * 2) * (0.6 + 0.4 * Math.sin(t * 9 + i * 1.7))); });
      }
      // Ah Boy the magician, on a chair
      const waving = t >= at('trick') && t < end('five') + 0.3;
      const bx = 560, by = 398;
      show(cape, bx, by, 1);
      show(boy, bx, by, 1.0, { talk: scTalk(S, t, 'boy'), mood: 'happy', look: t >= at('how') ? 0.9 : 0.5, lift: waving ? 1 : 0.35 });
      tr(wand, 0, 0, 1, waving ? Math.sin(t * 7) * 18 * AMP : 0); op(wStar, waving ? 1 : 0.5);
      show(hat, bx + 4, by - 70, 1); tr(hat, bx + 4, by - 70, 1, -8);
      show(crumbs, bx + 4, by + 34, 1);
      const shocked = t >= fiveAt && t < at('how');
      show(kav, 150, 444, 0.95, { talk: scTalk(S, t, 'kavya'), mood: shocked ? 'happy' : t > at('how') ? 'deadpan' : 'neutral', look: t > at('how') ? 0.9 : 0.6 });
      show(priya, 335, 448, 0.95, { talk: scTalk(S, t, 'priya'), mood: shocked ? 'shock' : 'smug', look: 0.5 });
      show(dad, 800, 444, 0.95, { talk: scTalk(S, t, 'dad'), mood: shocked || t >= at('how') ? 'shock' : 'happy', look: -0.6 });
      const tanMood = t >= at('how') ? 'deadpan' : shocked ? 'shock' : 'neutral';
      show(tan, 1000, 444, 0.95, { talk: scTalk(S, t, 'tan'), mood: tanMood, look: t >= at('how') ? 0 : -0.8, still: t > end('how') });
      show(ax, 688, 450, 0.55, { talk: 0, mood: shocked ? 'shock' : 'deadpan', look: -0.5, arms: shocked ? 1 : 0.3, shades: 1, still: shocked });
    } else { view(flatWrap, 1, 0, 0, 0, 0); view(Lcast, 1, 0, 0, 0, 0); view(flat.front, 1, 0, 0, 0, 0); view(flat.top, 1, 0, 0, 0, 0); }

    /* ---------- B: the magic mat ---------- */
    conf.set(sh === 'B' ? 1 : 0, t); op(mat, sh === 'B' ? 1 : 0);
    if (sh === 'B') {
      const f = [0.04, 0.17, 0.3, 0.45, 0.76].map(x => mid('n', x));
      // cups
      const c0 = P(t, f[0], 0.4, pop);
      op(cups[0], clamp(c0 * 3));
      const lift = P(t, f[4], 0.6, easeIn);
      tr(cups[0], 0, 250 - 120 * lift, Math.max(0.01, 0.6 + 0.4 * c0));
      if (t > f[4]) op(cups[0], 1 - lift);
      tr(grp[0], 0, 0);
      const c1 = P(t, f[1], 0.5, easeOut);
      op(cups[1], t >= f[1] ? 1 : 0);
      // the second cup slides out from behind the first
      tr(cups[1], 0, 250);
      const halve = P(t, f[3] + 0.25, 0.6, easeIn);
      tr(grp[1], (GX[0] - GX[1]) * (1 - c1) + 180 * halve, 0); op(grp[1], 1 - halve);
      tr(grp[0], GX[0], 0); tr(grp[1], GX[1] + (GX[0] - GX[1]) * (1 - c1) + 180 * halve, 0);
      tr(cups[0], 0, 250 - 120 * lift, Math.max(0.01, 0.6 + 0.4 * c0));
      // coins drop in (five beside each cup's row)
      coins.forEach(({ c, gi, k }) => {
        const t0 = f[2] + (gi * 5 + k) * 0.07, p = P(t, t0, 0.3, easeIn);
        op(c, t >= t0 ? 1 : 0);
        const pulse = gi === 0 && t > f[4] + 0.4 ? 1 + 0.1 * Math.sin(t * 8 + k) : 1;
        tr(c, (k - 2) * 44, lerp(150, 322, p), pulse);
      });
      op(divider, t >= f[3] && t < f[3] + 1.2 ? fadeIn(t, f[3], 0.2) : 0);
      op(coinGlow, t > f[4] + 0.3 ? 0.9 * fadeIn(t, f[4] + 0.3, 0.4) : 0);
      // the algebra, row by row
      let cur = -1;
      rowsG.forEach((g, i) => { const p = fadeIn(t, f[i] + 0.05, 0.3); op(g, p); tr(g, -20 * (1 - p), 0); if (t >= f[i]) cur = i; });
      op(rowHl, cur >= 0 ? 1 : 0); attr(rowHl, 'y', rowY[Math.max(0, cur)] - 34);
      // Agent X
      op(ax, 1); tr(ax, 300, 420, 1.3);
      ax.set({ t, talk: scTalk(S, t, 'x'), mood: t > f[4] + 0.3 ? 'smug' : 'deadpan', look: 0.7, arms: t > f[4] ? 1 : 0.55, shades: 1, badge: 1 });
      op(badge.n, 1);
    }

    /* ---------- C: the card ---------- */
    if (sh === 'C') {
      op(card, 1);
      const pg = pageAt(t);
      op(pages[pg], 1);
      // who stands where
      if (pg === 0) {
        wId.show(0, P(t, mid('ident', 0.05), 0.35)); wId.show(1, P(t, mid('ident', 0.2), 0.35));
        const ip = fadeIn(t, mid('ident', 0.35)); idR.forEach(r => op(r.g, ip));
        cEvery.set(P(t, mid('ident', 0.45), 0.4, linear));
        stampId.set(P(t, mid('ident', 0.75), 0.35, linear)); tr(stampId, CX, 612, 0.42);
        show(priya, 150, 452, 1.0, { talk: scTalk(S, t, 'priya'), mood: 'happy', look: 0.8 });
        show(kav, 362, 450, 1.0, { talk: scTalk(S, t, 'kavya'), mood: 'happy', look: 0.6 });
      } else if (pg === 1) {
        const ordering = t >= at('order') - 0.1;
        op(lessP, fadeIn(t, mid('less', 0.55))); mkDraw(lessS, ordering ? P(t, mid('order', 0.36), 0.3, linear) : 0);
        op(lessOk, ordering ? fadeIn(t, mid('order', 0.4)) : 0);
        op(nl, ordering ? fadeIn(t, at('order') - 0.05, 0.25) : 0);
        nl.mark(0, ordering ? P(t, mid('order', 0.08), 0.4, linear) : 0); op(nlStart, ordering ? fadeIn(t, mid('order', 0.08)) : 0);
        nl.hop(0, ordering ? P(t, mid('order', 0.16), 0.5, linear) : 0);
        nl.mark(1, ordering ? P(t, mid('order', 0.28), 0.4, linear) : 0); op(nlLand, ordering ? fadeIn(t, mid('order', 0.3)) : 0);
        op(lessL1, ordering ? fadeIn(t, mid('order', 0.42)) : 0);
        op(lessL2, ordering ? fadeIn(t, mid('order', 0.66)) : 0);
        show(priya, 150, 452, 1.0, { talk: scTalk(S, t, 'priya'), mood: ordering ? (t > mid('order', 0.36) ? 'shock' : 'neutral') : 'smug', look: ordering ? 1 : 0.4 });
        show(kav, 362, 450, 1.0, { talk: 0, mood: ordering ? (t > mid('order', 0.5) ? 'happy' : 'neutral') : 'annoyed', look: ordering ? 0.8 : -0.8 });
        if (ordering) { const jp = P(t, at('order') - 0.1, 0.35, pop); show(ax, 500, lerp(560, 450, jp), 0.58, { talk: scTalk(S, t, 'x'), mood: 'deadpan', look: -0.6, arms: 0.55, shades: 1 }); }
      } else if (pg === 2) {
        const blown = t >= at('blown') - 0.1, blownAt = mid('blown', 0.62);
        op(dadC, fadeIn(t, mid('dad', 0.5))); mkDraw(dadS, 0); op(dadS, 0);
        op(bl1, blown ? fadeIn(t, mid('blown', 0.04)) : 0);
        op(bl2, blown ? fadeIn(t, mid('blown', 0.14)) : 0);
        op(bl3, blown ? fadeIn(t, mid('blown', 0.32)) : 0);
        op(bl4, blown ? fadeIn(t, mid('blown', 0.5)) : 0);
        stampDad.set(blown ? P(t, blownAt, 0.35, linear) : 0); tr(stampDad, CX, 246, 0.42);
        op(blFix, blown ? fadeIn(t, mid('blown', 0.76)) : 0);
        const dm = blown ? (t > blownAt + 0.2 ? 'sad' : t > blownAt ? 'shock' : 'smug') : t > mid('dad', 0.75) ? 'smug' : 'happy';
        show(dad, 150, 450, 1.0, { talk: scTalk(S, t, 'dad'), mood: dm, look: blown ? 1 : 0.5 });
        show(tan, 330, 452, 0.95, { talk: 0, mood: blown ? (t > blownAt ? 'smug' : 'neutral') : 'deadpan', look: blown ? 1 : -0.8 });
        const sh0 = 1 - P(t, blownAt - 0.4, 0.5, easeOut);
        show(ax, 495, 450, 0.58, { talk: scTalk(S, t, 'x'), mood: blown && t > blownAt ? 'smug' : 'deadpan', look: -0.7, arms: 0.55, shades: blown ? sh0 : 1, badge: blown ? fadeIn(t, at('blown'), 0.2) : 0 });
        op(badge.four, 1);
      } else if (pg === 3) {
        const m0 = at('money');
        op(barAll, fadeIn(t, m0)); op(qLines, fadeIn(t, mid('money', 0.12))); pBrace.set(fadeIn(t, mid('money', 0.06)));
        op(qGift, fadeIn(t, mid('money', 0.3))); op(qGiftL, fadeIn(t, mid('money', 0.34)));
        op(tea, fadeIn(t, mid('money', 0.52))); op(teaL, fadeIn(t, mid('money', 0.56)));
        leftB.set(fadeIn(t, mid('money', 0.72)));
        wMon.show(0, P(t, mid('money', 0.74), 0.35)); wMon.show(1, P(t, mid('money', 0.88), 0.35));
        show(priya, 150, 452, 1.0, { talk: scTalk(S, t, 'priya'), mood: t > mid('money', 0.7) ? 'smug' : 'happy', look: 0.7 });
        show(kav, 362, 450, 1.0, { talk: 0, mood: 'neutral', look: -0.8 });
      } else {
        op(tx1, fadeIn(t, mid('taxi', 0.62))); op(tx2, t >= at('formula') ? fadeIn(t, mid('formula', 0.05)) : 0);
        op(tx3, t >= at('formula') ? fadeIn(t, mid('formula', 0.6)) : 0); op(fBox, t >= at('formula') ? fadeIn(t, mid('formula', 0.8)) : 0);
        op(txNotes, t >= at('formula') ? fadeIn(t, mid('formula', 0.82)) : 0);
        const subj = t >= at('subject') - 0.1;
        op(cRing, subj ? 1 : 0); mkDraw(cRing, subj ? P(t, mid('subject', 0.3), 0.5, linear) : 0);
        cSubj.set(subj ? P(t, mid('subject', 0.5), 0.4, linear) : 0);
        op(txNotes, subj ? 0 : t >= at('formula') ? fadeIn(t, mid('formula', 0.82)) : 0);
        show(mum, 150, 450, 1.0, { talk: scTalk(S, t, 'mum'), mood: t >= at('formula') ? 'happy' : 'neutral', look: t >= at('formula') ? 1 : 0.6, lift: t < end('taxi') ? 0.7 : 0 });
        show(kav, 362, 450, 1.0, { talk: scTalk(S, t, 'kavya'), mood: t >= at('formula') ? 'happy' : 'neutral', look: t >= at('formula') ? 0.8 : -0.8 });
        if (subj) { const jp = P(t, at('subject') - 0.1, 0.35, pop); show(ax, 500, lerp(560, 450, jp), 0.58, { talk: scTalk(S, t, 'x'), mood: t > mid('subject', 0.6) ? 'smug' : 'deadpan', look: 0.6, arms: 0.55, shades: 1 }); }
      }
    }
  };
});
