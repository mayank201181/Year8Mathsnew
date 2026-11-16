/* Scene 6: The Direct Proportion Club (direct proportion graphs).
   2 p.m. Dad jogs back from a run: "five miles", says his London watch -> Mum: how many km? -> Ori the origin, bouncer
   of the Direct Proportion Club: lines get in through (0, 0) -> the conversion graph y = 1.6x, straight through the
   origin (Ori unfolds his arms: this way) -> reading it: 5 -> 8, 10 -> 16, 25 -> 40 -> km / miles = 1.6 = k, the
   gradient -> Priya's phone plans: P $3 per GB, Q $6 + $2 per GB -> P: (0, 0), (2, 6), (4, 12), double the data, double
   the cost -> Q: (2, 10), (4, 14): not doubled -> Q misses the origin: its card bounces off the velvet rope (OFF THE
   LINE) -> Ah Boy: but it's straight! -> straight AND through the origin: no input, no output -> Plan P, y = 3x, is
   waved in (ON THE LINE). */
scene('club', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 3, color: o.color || C.ink, weight: 700 }); };
  const winP = (t, a, b, d) => (t >= a && t < b ? P(t, a, d || 0.3, linear) : 0);
  const GOLD = '#FFE45C', INK = MK.ink, GREEN = '#1E9E5A', RED = '#D32F2F', BLUE = '#1E5AAC', PLUM = '#6A3A8C', PINK = '#B8336A', ORANGE = '#E8751A';

  /* layers */
  const Lset = G(root), Lcast = G(root), Lrope = G(root), Lfront = G(root), Lcard = G(root), Lhud = G(root);

  /* ================= the club (shifted down 40 px to keep the scene tag clear) ================= */
  E('rect', { x: 0, y: 0, width: 1200, height: 80, fill: '#120A20' }, Lset);
  const clubG = G(Lset); tr(clubG, 0, 40);
  const club = lgClub(clubG);
  Lrope.appendChild(club.rope); tr(club.rope, 490, 650);
  const front = G(Lfront);
  E('rect', { x: 0, y: 652, width: 1200, height: 98, fill: '#1A1420' }, front);
  E('path', { d: 'M0,656 L1200,656', stroke: '#3A2456', 'stroke-width': 6 }, front);
  E('path', { d: 'M400,652 L800,652 L840,750 L360,750 Z', fill: '#8E0F33' }, front);   // the carpet runs on
  const glint = G(Lhud);
  E('path', { d: 'M0,-16 L4,-4 L16,0 L4,4 L0,16 L-4,4 L-16,0 L-4,-4 Z', fill: '#FFF3A0' }, glint);

  /* ================= the graph board (right) ================= */
  const board = G(Lcard);
  E('rect', { x: 746, y: 236, width: 424, height: 454, rx: 18, fill: 'rgba(0,0,0,0.35)' }, board);
  E('rect', { x: 740, y: 230, width: 424, height: 454, rx: 18, fill: MK.paper, stroke: '#E2B33C', 'stroke-width': 5 }, board);
  const OX = 815, OY = 282;
  // graph 1: miles -> km
  const g1 = G(board), a1G = G(g1); tr(a1G, OX, OY);
  const ax1 = mkAxes(a1G, { xmin: 0, xmax: 30, ymin: 0, ymax: 50, unit: 10, unitY: 6.4, step: 5, labelStep: 1000, ink: INK, size: 26, xName: ' ', yName: ' ', halo: MK.paper });
  const X1 = x => OX + ax1.px(x), Y1 = y => OY + ax1.py(y);
  for (let m = 5; m <= 30; m += 5) T(g1, X1(m), Y1(0) + 32, String(m), { size: 26, anchor: 'middle', fill: INK, weight: 600 });
  for (let k = 10; k <= 50; k += 10) T(g1, OX - 12, Y1(k) + 9, String(k), { size: 26, anchor: 'end', fill: INK, weight: 600 });
  T(g1, OX - 12, Y1(0) + 30, '0', { size: 26, anchor: 'end', fill: INK, weight: 600 });
  T(g1, 965, 670, 'miles', { size: 28, anchor: 'middle', fill: INK, weight: 700 });
  T(g1, OX + 14, 262, 'km', { size: 28, anchor: 'start', fill: INK, weight: 700 });
  const conv = ax1.line(1.6, 0, { col: PLUM, width: 7, label: 'y = 1.6x', labelAt: 14, dx: -14, dy: -14, size: 32 });
  const reads = [[5, 8], [10, 16], [25, 40]].map(([m, k], i) => {
    const g = G(g1);
    const d = E('path', { d: `M${X1(m)},${Y1(0)} L${X1(m)},${Y1(k)} L${X1(0)},${Y1(k)}`, fill: 'none', stroke: ORANGE, 'stroke-width': 4, 'stroke-dasharray': '9 7' }, g);
    E('circle', { cx: X1(m), cy: Y1(k), r: 8, fill: ORANGE, stroke: '#FFFFFF', 'stroke-width': 3 }, g);
    mkText(g, X1(m) + 10, Y1(k) + 30, `**${k}**`, { size: 30, fill: ORANGE, halo: MK.paper });
    return g;
  });
  const kChip = mkChip(Lcard, '{{k = 1.6}}: the **gradient**', { size: 28, col: PLUM, fill: '#F3EAFB', textCol: INK });
  // graph 2: data (GB) -> cost ($)
  const g2 = G(board), a2G = G(g2); tr(a2G, OX, OY);
  const ax2 = mkAxes(a2G, { xmin: 0, xmax: 5, ymin: 0, ymax: 20, unit: 60, unitY: 16, step: 1, labelStep: 1000, ink: INK, size: 26, xName: ' ', yName: ' ', halo: MK.paper });
  const X2 = x => OX + ax2.px(x), Y2 = y => OY + ax2.py(y);
  for (let m = 1; m <= 5; m++) T(g2, X2(m), Y2(0) + 32, String(m), { size: 26, anchor: 'middle', fill: INK, weight: 600 });
  for (let k = 4; k <= 20; k += 4) T(g2, OX - 12, Y2(k) + 9, String(k), { size: 26, anchor: 'end', fill: INK, weight: 600 });
  T(g2, OX - 12, Y2(0) + 30, '0', { size: 26, anchor: 'end', fill: INK, weight: 600 });
  T(g2, 965, 670, 'data (GB)', { size: 28, anchor: 'middle', fill: INK, weight: 700 });
  T(g2, OX + 14, 262, 'cost ($)', { size: 28, anchor: 'start', fill: INK, weight: 700 });
  const lineP = ax2.line(3, 0, { col: GREEN, width: 7, label: '"P:" y = 3x', labelAt: 3.4, dx: 16, dy: 34, anchor: 'start', size: 30 });
  const lineQ = ax2.line(2, 6, { col: RED, width: 7, label: '"Q:" y = 2x + 6', labelAt: 4.5, dx: -16, dy: -16, anchor: 'end', size: 30 });
  const ptP = [[0, 0], [2, 6], [4, 12]].map(([x, y]) => { const p = G(g2); tr(p, X2(x), Y2(y)); const inn = G(p); E('circle', { r: 10, fill: GREEN, stroke: '#FFFFFF', 'stroke-width': 3 }, inn); p.set = q => mkPopIn(p, q); p.set(0); return p; });
  const ptQ = [[0, 6], [2, 10], [4, 14]].map(([x, y]) => { const p = G(g2); tr(p, X2(x), Y2(y)); const inn = G(p); E('circle', { r: 10, fill: RED, stroke: '#FFFFFF', 'stroke-width': 3 }, inn); p.set = q => mkPopIn(p, q); p.set(0); return p; });
  const qGap = E('path', { d: `M${OX},${Y2(0)} L${OX},${Y2(6)}`, stroke: RED, 'stroke-width': 12, 'stroke-linecap': 'round', opacity: 0.55 }, g2);
  const lab6 = mkText(g2, OX - 14, Y2(6) + 10, '**$6**', { size: 28, fill: RED, anchor: 'end', halo: MK.paper });
  const oRing = E('circle', { cx: OX, cy: Y2(0), r: 22, fill: 'none', stroke: GREEN, 'stroke-width': 5 }, board);
  const oRingR = E('circle', { cx: OX, cy: Y2(0), r: 22, fill: 'none', stroke: RED, 'stroke-width': 5, 'stroke-dasharray': '7 6' }, board);

  /* ================= the left card ================= */
  const card = G(Lcard);
  E('rect', { x: 42, y: 242, width: 440, height: 232, rx: 16, fill: 'rgba(0,0,0,0.35)' }, card);
  E('rect', { x: 36, y: 236, width: 440, height: 232, rx: 16, fill: MK.paper, stroke: '#E2B33C', 'stroke-width': 5 }, card);
  const CX = 256, R = [290, 352, 414];
  const txt = (y, s, o) => mkText(card, CX, y, s, Object.assign({ size: 30, anchor: 'middle', fill: INK }, o || {}));
  const conv1 = txt(R[0], '**straight** line', { boldFill: PLUM }), conv2 = txt(R[1], 'through the **origin** {{(0, 0)}}', { boldFill: PLUM }),
    conv3 = txt(R[2], '= **direct proportion**', { boldFill: GREEN, size: 32 });
  const tbl = mkTable(card, [['miles', '5', '10', '25'], ['km', '8', '16', '40'], ['km ÷ miles', '1.6', '1.6', '1.6']], { colW: [170, 80, 80, 80], rowH: 58, size: 28, ink: INK, side: true, head: false, headFill: 'rgba(106,58,140,0.14)' });
  tr(tbl, 46, 254);
  const kRowHL = tbl.mark(2, 1, 'rgba(255,228,92,0.4)'), kRowHL2 = tbl.mark(2, 2, 'rgba(255,228,92,0.4)'), kRowHL3 = tbl.mark(2, 3, 'rgba(255,228,92,0.4)');
  // phone-plan cards
  const planCard = (x, name, line1, line2, col) => {
    const g = G(card), inn = G(g);
    E('rect', { x: -96, y: -48, width: 192, height: 110, rx: 14, fill: '#FFFFFF', stroke: col, 'stroke-width': 5 }, inn);
    E('rect', { x: -96, y: -48, width: 192, height: 36, rx: 12, fill: col }, inn);
    T(inn, 0, -20, name, { size: 26, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 1 });
    mkText(inn, 0, 20, line1, { size: 28, anchor: 'middle', fill: INK, boldFill: col });
    if (line2) mkText(inn, 0, 52, line2, { size: 26, anchor: 'middle', fill: INK, boldFill: col });
    g.x = x;
    return g;
  };
  const cardP = planCard(146, 'PLAN P', '**$3** per GB', null, GREEN), cardQ = planCard(366, 'PLAN Q', '**$6** a month', '+ **$2** per GB', RED);
  const pRow = txt(392, '{{0 → $0}},  {{2 → $6}},  {{4 → $12}}', { size: 28 });
  const pDbl = mkChip(Lcard, 'double the data, **double the cost**', { size: 26, col: GREEN, fill: '#E3F6EA', textCol: INK });
  const qRow = txt(392, '{{2 → $10}},  {{4 → $14}}', { size: 28, fill: RED });
  const qNot = mkChip(Lcard, '{{2 × 10 = 20 != 14}}', { size: 26, col: RED, fill: '#FFE4E4', textCol: INK });
  const lMiss = txt(R[0], 'Q starts at **$6**:', { boldFill: RED }), lMiss2 = txt(R[1], 'it **misses the origin**', { boldFill: RED });
  const stOff = lgStamp(card, false), stOn = lgStamp(card, true);
  const b1 = txt(R[0], '**straight** line ✓', { boldFill: PLUM }), b2 = txt(R[1], '**+** through the **origin** ✓', { boldFill: PLUM }),
    b3 = txt(R[2], 'no input, **no output**', { boldFill: GREEN });
  const vip1 = txt(R[0], 'Plan P: {{y = 3x}}', { size: 32 }), vip2 = txt(R[1], '**ON THE LIST** ✓', { boldFill: GREEN, size: 32 });
  // chips above the card
  const cMiles = mkChip(Lhud, '**5 miles**', { size: 34, col: GOLD });
  const cKm = mkChip(Lhud, '{{5 "miles"}} = **?** km', { size: 32, col: '#FF8FC8' });
  const cOri1 = mkChip(Lhud, 'the **origin** {{(0, 0)}}', { size: 30, col: '#C9A2FF' });
  const cOri2 = mkChip(Lhud, 'lines get in **through me**', { size: 30, col: '#C9A2FF' });
  const cStraight = mkSpeechBubble(Lhud, "but it's a **straight line**!", { size: 30, tail: 'down' });
  const cNotList = mkChip(Lhud, '**NOT** on the list', { size: 32, col: '#FF6070' });
  const watchBig = lgWatch(Lhud, { s: 1.5 });

  /* ================= the cast ================= */
  const dad = cast(Lcast, 'dad', { prop: null, hand: true, watch: true });
  const mum = cast(Lcast, 'mum'), kav = cast(Lcast, 'kavya'), priya = cast(Lcast, 'priya', { prop: null }), boy = cast(Lcast, 'boy');
  const ori = cast(Lcast, 'ori');
  const ltOri = lgLowerThird(Lhud, 'ori');
  const cTwo = pill(Lhud, '2 p.m.', { size: 32, color: GOLD, stroke: GOLD });
  const phone = lgPhone(Lhud, { s: 0.32 });
  const fade = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  const HY = 590, X0 = 105, X1h = 245, X2h = 385;

  return t => {
    const who = scWho(S, t);
    op(fade, 1 - P(t, at('two') - 0.3, 0.3, linear));
    club.upd(t);
    popIn(cTwo, t, at('two') + 0.1, 1000, 62);
    op(phone, P(t, at('two') + 0.3, 0.3, linear)); tr(phone, 1082, 62); phone.set(55);
    ltOri.set(win(t, at('ori') + 0.15, at('ori') + 3.2, 0.3));
    // the pendant glints when Ori introduces himself
    const gl = t >= mid('ori', 0.25) && t < mid('ori', 0.55) ? Math.sin((t - mid('ori', 0.25)) / (mid('ori', 0.55) - mid('ori', 0.25)) * Math.PI) : 0;
    op(glint, gl); tr(glint, 630, 500, 0.6 + gl, t * 90);

    /* ---------- the board ---------- */
    const bp = P(t, at('conv') - 0.1, 0.4, easeOut);
    op(board, bp > 0 ? 1 : 0); tr(board, 460 * (1 - bp), 0);
    const g2on = t >= at('plans');
    op(g1, g2on ? 0 : 1); op(g2, g2on ? P(t, at('plans'), 0.3, linear) : 0);
    conv.set(P(t, mid('conv', 0.15), 1.4, ease));
    reads.forEach((r, i) => op(r, t >= at('read') ? P(t, mid('read', [0.08, 0.5, 0.72][i]), 0.4, linear) : 0));
    kChip.set(winP(t, mid('k', 0.55), at('plans'), 0.4)); tr(kChip, 1012, 210);
    ptP.forEach((p, i) => p.set(t >= at('p') ? P(t, mid('p', [0.05, 0.3, 0.55][i]), 0.35, linear) : 0));
    lineP.set(t >= at('p') ? P(t, mid('p', 0.62), 0.7, ease) : 0);
    ptQ.forEach((p, i) => p.set(t >= at('q') ? P(t, i === 0 ? mid('q', 0.75) : mid('q', [0, 0.1, 0.35][i]), 0.35, linear) : 0));
    lineQ.set(t >= at('q') ? P(t, mid('q', 0.78), 0.7, ease) : 0);
    op(qGap, t >= at('list') && t < at('vip') ? P(t, mid('list', 0.2), 0.3, linear) * (0.6 + 0.4 * Math.sin(t * 6)) : 0);
    op(lab6, t >= at('list') ? P(t, at('list') + 0.1, 0.3, linear) : 0);
    op(oRingR, t >= at('list') && t < at('both') ? P(t, mid('list', 0.4), 0.3, linear) : 0);
    op(oRing, t >= mid('both', 0.6) ? P(t, mid('both', 0.6), 0.3, linear) * (0.6 + 0.4 * Math.abs(Math.sin(t * 4))) : 0);
    // Plan Q's line dims once it is turned away; Plan P's glows when it is waved in
    if (t >= at('vip')) { op(lineQ, 0.35); }

    /* ---------- the left card ---------- */
    const cp = P(t, at('conv') - 0.1, 0.3, easeOut);
    op(card, cp);
    op(conv1, winP(t, mid('conv', 0.4), at('read'))); op(conv2, winP(t, mid('conv', 0.6), at('read'))); op(conv3, winP(t, mid('conv', 0.8), at('read')));
    op(tbl, t >= at('read') && t < at('plans') ? 1 : 0);
    // reveal the table column by column with the reading; the k row with "k"
    const colA = [mid('read', 0.08), mid('read', 0.5), mid('read', 0.72)];
    [1, 2, 3].forEach(j => { op(tbl.cells[0][j], P(t, colA[j - 1], 0.3, linear)); op(tbl.cells[1][j], P(t, colA[j - 1] + 0.4, 0.3, linear)); op(tbl.cells[2][j], P(t, mid('k', 0.1 + 0.08 * j), 0.3, linear)); });
    op(tbl.cells[2][0], P(t, mid('k', 0.05), 0.3, linear));
    [kRowHL, kRowHL2, kRowHL3].forEach(m => m.set(t >= mid('k', 0.55) ? 1 : 0));
    // the phone plans
    const plansOn = t >= at('plans') && t < at('both');
    [cardP, cardQ].forEach((c, i) => {
      let p = plansOn ? P(t, mid('plans', i ? 0.55 : 0.2), 0.4, linear) : 0;
      let x = c.x, y = 296, r = 0;
      if (i === 1 && t >= at('list')) {
        // Plan Q tries the club: slides to the velvet rope and bounces off
        const go = P(t, mid('list', 0.05), 0.6, easeIn), back = P(t, mid('list', 0.05) + 0.6, 0.7, easeOut);
        x = lerp(c.x, 560, go); y = 300 + 210 * go; r = -80 * back * (1 - back);
        if (t >= mid('list', 0.05) + 0.6) x = lerp(560, c.x, back), y = lerp(510, 300, back);
      }
      if (i === 0 && t >= at('vip')) {
        // Plan P is waved in
        const go = P(t, mid('vip', 0.3), 1.1, ease);
        x = lerp(c.x, 600, go); y = lerp(300, 470, go); p = 1 - P(t, mid('vip', 0.3) + 1.0, 0.4, linear);
        if (t >= at('vip')) p = Math.max(p, 0) * 1;
      }
      if (i === 0 && t >= at('vip')) p = 1 - P(t, mid('vip', 0.3) + 1.0, 0.35, linear);
      if (i === 0 && t >= at('list') && t < at('vip')) p = 0;
      if (i === 1 && t >= at('list')) p = 1 - P(t, mid('list', 0.05) + 1.1, 0.3, linear);
      op(c, i === 0 && t >= at('vip') ? clamp(p) : p);
      tr(c, x, y, 1, r);
      tr(c.firstChild, 0, 0, i === 0 && t >= at('vip') ? lerp(1, 0.5, P(t, mid('vip', 0.3), 1.1, ease)) : 1);
    });
    op(pRow, winP(t, mid('p', 0.05), at('q'))); pDbl.set(winP(t, mid('p', 0.8), at('q'))); tr(pDbl, 256, 438);
    op(qRow, winP(t, mid('q', 0.05), at('list'))); qNot.set(winP(t, mid('q', 0.6), at('list'))); tr(qNot, 256, 438);
    op(lMiss, winP(t, mid('list', 0.3), at('straight'))); op(lMiss2, winP(t, mid('list', 0.45), at('straight')));
    stOff.set(t >= at('list') && t < at('both') ? P(t, mid('list', 0.55), 0.35, linear) : 0); tr(stOff, 256, 418, 0.6);
    op(b1, winP(t, mid('both', 0.05), at('vip'))); op(b2, winP(t, mid('both', 0.22), at('vip'))); op(b3, winP(t, mid('both', 0.6), at('vip')));
    op(vip1, t >= at('vip') ? P(t, mid('vip', 0.25), 0.3, linear) : 0); op(vip2, t >= at('vip') ? P(t, mid('vip', 0.6), 0.3, linear) : 0);
    stOn.set(t >= at('vip') ? P(t, mid('vip', 0.75), 0.35, linear) : 0); tr(stOn, 256, 418, 0.6);
    // chips
    cMiles.set(winP(t, mid('five', 0.3), at('km'))); tr(cMiles, 380, 300);
    cKm.set(winP(t, at('km') + 0.05, at('ori'))); tr(cKm, 256, 330);
    op(watchBig, winP(t, mid('five', 0.15), at('km'))); tr(watchBig, 200, 326); watchBig.set('5.0 mi');
    cOri1.set(winP(t, mid('ori', 0.2), at('conv'))); tr(cOri1, 256, 300);
    cOri2.set(winP(t, mid('ori', 0.7), at('conv'))); tr(cOri2, 256, 380);
    cStraight.set(t >= at('straight') && t < at('both') ? P(t, at('straight'), 0.3, linear) : 0); tr(cStraight, 256, 300);
    cNotList.set(t >= at('list') && t < at('straight') ? P(t, mid('list', 0.75), 0.35, linear) : 0); tr(cNotList, 600, 290);

    /* ---------- the cast ---------- */
    // Dad (in the queue until Priya takes his place)
    const dOut = P(t, at('plans') - 0.3, 0.35, easeIn);
    const dIn = P(t, at('two') + 0.2, 0.9, easeOut);
    op(dad, dOut < 0.98 ? 1 : 0);
    tr(dad, lerp(-160, X0, dIn), HY + 230 * dOut + (dIn < 1 ? Math.abs(Math.sin(t * 9)) * -8 : 0), 0.8);
    let dm = 'happy';
    if (t >= at('km') && t < at('ori')) dm = 'sad';
    else if (t >= at('read') && t < at('plans')) dm = t > mid('read', 0.3) ? 'smug' : 'neutral';
    if (dad.watch) dad.watch.set('5.0 mi');
    dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: who === 'mum' ? 1 : who === 'ori' || t >= at('conv') ? 1 : 0.6, sweat: t < at('ori') ? 0.8 : 0.2, lift: t >= at('five') && t < at('ori') ? 1 : 0 });
    // Priya takes Dad's place
    const pIn = P(t, at('plans') - 0.15, 0.4, pop);
    op(priya, pIn > 0.01 ? 1 : 0); tr(priya, X0, lerp(820, HY, pIn), 0.8);
    priya.set({ t, talk: scTalk(S, t, 'priya'), mood: t >= at('vip') ? 'smug' : t >= at('list') && t < at('both') ? 'annoyed' : 'happy', look: who === 'boy' ? 0.7 : 1 });
    // Mum (ducks out for Ah Boy)
    const mOut = P(t, at('straight') - 0.35, 0.3, easeIn);
    op(mum, mOut < 0.98 ? 1 : 0); tr(mum, X1h, HY + 230 * mOut, 0.8);
    mum.set({ t, talk: scTalk(S, t, 'mum'), mood: t >= at('km') && t < at('ori') ? 'deadpan' : 'neutral', look: who === 'dad' || (t >= at('km') && t < at('ori')) ? -1 : 1 });
    const bIn = P(t, at('straight') - 0.2, 0.4, pop);
    op(boy, bIn > 0.01 ? 1 : 0); tr(boy, X1h, lerp(820, HY + 6, bIn), 0.8);
    boy.set({ t, talk: scTalk(S, t, 'boy'), mood: t < at('both') ? 'annoyed' : t < at('vip') ? 'sad' : 'happy', look: 1, lift: t >= at('straight') && t < at('both') ? 1 : 0 });
    // Kavya
    tr(kav, X2h, HY, 0.8);
    let km = 'neutral', kl = 1;
    if (who === 'kavya') km = 'happy';
    else if (t < at('ori')) { km = t >= at('km') ? 'deadpan' : 'happy'; kl = -1; }
    else if (t >= at('list') && t < at('both')) km = 'neutral';
    else if (t >= at('vip')) km = 'happy';
    kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
    // Ori: arms folded; "this way" for lines through the origin
    tr(ori, 600, 432, 0.9);
    const thisWay = (t >= mid('conv', 0.15) && t < at('read')) || (t >= mid('vip', 0.25));
    let om = 'deadpan';
    if (who === 'ori' && t >= at('both')) om = 'neutral';
    if (thisWay) om = 'smug';
    if (t >= at('list') && t < at('both')) om = 'annoyed';
    ori.set({ t, talk: scTalk(S, t, 'ori'), mood: om, look: who === 'ori' ? -0.6 : -0.9, arms: thisWay ? 1 : 0 });
    club.rope.set(t >= at('vip') ? P(t, mid('vip', 0.2), 0.6, ease) : 0);
  };
});
