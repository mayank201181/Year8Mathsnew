/* Scene 5: North, clockwise, three figures (three-figure bearings).
   3 p.m., checkpoint 5 by the old well in the kampong garden, no map. Priya's clue card says 060° from the old well;
   she crosses out the "silly zero" -> Captain Needle (on the well roof): a bearing is from North, clockwise, three
   figures (the 060° diagram builds with each word; every ship in the Singapore Strait says 060°) -> Ah Boy: N-C-3 ->
   Kavya: FROM = FEET (footprints and the North line at the well) -> Dad measures 72° anticlockwise -> OFF COURSE:
   clockwise it is 360° - 72° = 288° -> the compass rose: Never Eat Soggy Waffles -> Ah Boy, disgusted -> 000°,
   090°, 180°, 270° (ON COURSE), then 045°, 135°, 225°, 315° -> Mr Tan: draw 230° -> to South (180°) then 50° more,
   or 130° anticlockwise -> "Bearings. I find them very bearable." Silence. */
scene('bearings', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);          // hard sitcom cut
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 3, color: o.color || C.ink, weight: 700 }); };
  const show = (el, t, t0, t1) => { const p = P(t, t0, 0.25, linear), q = t1 === undefined ? 1 : 1 - P(t, t1, 0.15, linear); op(el, Math.min(p, q)); return Math.min(p, q); };
  const GOLD = '#FFE45C', INK = MK.ink, BLUE = '#2E7DD8', RED = '#C62828', GREEN = '#1E9E5A', PURP = '#7A5CFF', BERRY = '#B8336A', ORANGE = '#E07A00';
  const CX = 877;
  const row = (parent, y, text, o) => { o = o || {}; return mkText(parent, o.x || CX, y, text, { size: o.size || 30, anchor: o.anchor || 'middle', fill: o.fill || INK, boldFill: o.bold || BERRY, weight: 700 }); };
  const lab = (parent, x, y, s, o) => { o = o || {}; return T(parent, x, y, s, { size: o.size || 30, weight: 800, anchor: o.anchor || 'middle', fill: o.col || INK }); };
  const cardChip = (parent, text, col, fill) => mkChip(parent, text, { size: 30, col, fill, textCol: INK });
  // an arc around (cx, cy) between two BEARINGS (clockwise from North), drawable
  const brgArc = (parent, cx, cy, r, b0, b1, col, o) => { o = o || {}; const el = mkDash(E('path', { d: mkArcD(cx, cy, r, b0 - 90, b1 - 90), fill: 'none', stroke: col, 'stroke-width': o.width || 5, 'stroke-linecap': 'round' }, parent)); el.set = p => { op(el, p > 0.001 ? 1 : 0); mkDraw(el, p); }; el.set(0); return el; };
  // an arrowhead at the end of a bearing arc (pointing along the turn)
  const arcTip = (parent, cx, cy, r, b, dir, col) => {
    const a = (b - 90) * Math.PI / 180, x = cx + r * Math.cos(a), y = cy + r * Math.sin(a), ux = -Math.sin(a) * dir, uy = Math.cos(a) * dir;
    return E('path', { d: `M${(x + ux * 12).toFixed(1)},${(y + uy * 12).toFixed(1)} L${(x - ux * 4 + Math.cos(a) * 9).toFixed(1)},${(y - uy * 4 + Math.sin(a) * 9).toFixed(1)} L${(x - ux * 4 - Math.cos(a) * 9).toFixed(1)},${(y - uy * 4 - Math.sin(a) * 9).toFixed(1)} Z`, fill: col }, parent);
  };
  const bp = (b, d, c) => [c[0] + Math.sin(b * Math.PI / 180) * d, c[1] - Math.cos(b * Math.PI / 180) * d];

  /* layers */
  const Lset = G(root), Lcard = G(root), Lhud = G(root);

  /* ================= the kampong garden ================= */
  const isl = cbIsland(Lset, 'kampong');
  const well = cbWell(isl.mid, 1);
  const flag = cbFlag(isl.mid, 0.8); tr(flag, 1105, 566);

  /* ================= the cast ================= */
  const dad = cast(isl.mid, 'dad'), boy = cast(isl.mid, 'boy'), kav = cast(isl.mid, 'kavya'), priya = cast(isl.mid, 'priya'), tan = cast(isl.mid, 'tan');
  const ndl = cast(isl.mid, 'needle', { s: 0.5 });
  const Y0 = 452, SB = 0.8;

  /* ================= A: Priya's clue card ================= */
  const clue = G(Lhud);
  E('rect', { x: -196, y: -76, width: 392, height: 152, rx: 12, fill: '#FFF6E0', stroke: '#8A6A3A', 'stroke-width': 4, transform: 'rotate(-3)' }, clue);
  E('rect', { x: -196, y: -76, width: 392, height: 34, rx: 12, fill: '#FF9A3D', transform: 'rotate(-3)' }, clue);
  const clIn = G(clue); tr(clIn, 0, 0, 1, -3);
  T(clIn, 0, -50, 'CLUE 5', { size: 26, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 2 });
  const zW = textWidth('0', 34, FD, 800), restW = textWidth('60° from the old well', 34, FD, 800), x0 = -(zW + restW) / 2;
  T(clIn, x0, 12, '0', { size: 34, weight: 800, fill: INK });
  T(clIn, x0 + zW, 12, '60° from the old well', { size: 34, weight: 800, fill: INK });
  const scrib = mkDash(E('path', { d: `M${(x0 - 6).toFixed(1)},${-8} L${(x0 + zW + 6).toFixed(1)},${-2} M${(x0 - 4).toFixed(1)},${2} L${(x0 + zW + 4).toFixed(1)},${-12}`, stroke: RED, 'stroke-width': 5, 'stroke-linecap': 'round', fill: 'none' }, clIn));
  const just = T(clIn, 0, 58, 'just 60°?', { size: 32, weight: 800, anchor: 'middle', fill: RED });

  /* ================= B: the bearing card ================= */
  const bCard = G(Lcard);
  cbPaper(bCard, 585, 94, 585, 578);
  const Wc = [CX, 410];
  const nW = cbNorth(bCard, 165, { col: INK, size: 30 }); tr(nW, Wc[0], Wc[1]);
  const nGlow = E('path', { d: `M${Wc[0]},${Wc[1]} L${Wc[0]},${Wc[1] - 165}`, stroke: GOLD, 'stroke-width': 16, 'stroke-linecap': 'round', opacity: 0.7 }, bCard);
  bCard.insertBefore(nGlow, nW);
  const b060 = cbBearing(bCard, { len: 200, r: 62, col: RED, arcCol: BLUE, north: false, size: 32 }); tr(b060, Wc[0], Wc[1]);
  const ckG = G(bCard); const ck = bp(60, 200, Wc);
  const ckF = cbFlag(ckG, 0.42); tr(ckF, ck[0] + 4, ck[1] + 2);
  lab(ckG, ck[0] - 14, ck[1] - 40, 'checkpoint', { size: 26, col: '#C25E00', anchor: 'end' });
  const feet = G(bCard);
  [[-13, 1], [13, -1]].forEach(([dx, s]) => { const f = G(feet); tr(f, Wc[0] + dx, Wc[1] + 30, 1, s * 8);
    E('ellipse', { cx: 0, cy: 0, rx: 8, ry: 14, fill: '#8A5A2A' }, f);
    [-6, -2, 2, 6].forEach((x, i) => E('circle', { cx: x, cy: -17 - (i === 1 || i === 2 ? 2 : 0), r: 2.6, fill: '#8A5A2A' }, f)); });
  lab(bCard, Wc[0] - 30, Wc[1] + 44, 'well', { size: 28, col: '#5A4A3A', anchor: 'end' });
  const b72 = cbBearing(bCard, { len: 200, r: 58, col: RED, arcCol: RED, north: false, anti: true, size: 32 }); tr(b72, Wc[0], Wc[1]);
  const b288 = cbBearing(bCard, { len: 200, r: 96, col: RED, arcCol: BLUE, north: false, size: 34 }); tr(b288, Wc[0], Wc[1]);
  // rows
  const rBear = row(bCard, 165, 'A **bearing**', { size: 36, bold: BLUE });
  const ship = G(bCard);
  { const s = G(ship); tr(s, 0, 0);
    E('path', { d: 'M-40,0 L40,0 L28,18 L-30,18 Z', fill: '#C62828', stroke: INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, s);
    E('rect', { x: -22, y: -16, width: 34, height: 16, fill: '#FFFFFF', stroke: INK, 'stroke-width': 2.5 }, s);
    E('rect', { x: -4, y: -30, width: 10, height: 14, fill: '#FFC247', stroke: INK, 'stroke-width': 2.5 }, s); }
  const shipTxt = row(ship, 12, 'Singapore Strait: **060°**', { x: 56, anchor: 'start', size: 30, bold: BLUE });
  const shipW = 56 + shipTxt.w; tr(ship, CX - shipW / 2 + 40, 160);
  const cNorth = cardChip(bCard, 'from **North**', BLUE, '#E3F0FF'), cClock = cardChip(bCard, '**clockwise**', BLUE, '#E3F0FF'), cThree = cardChip(bCard, '**three figures**', BLUE, '#E3F0FF');
  tr(cNorth, 770, 585); tr(cClock, 990, 585); tr(cThree, CX, 643);
  const nc3 = G(bCard);
  [['N', BLUE, -120], ['–', INK, -60], ['C', GREEN, 0], ['–', INK, 60], ['3', RED, 120]].forEach(([s, c, dx]) => lab(nc3, CX + dx, 640, s, { size: 72, col: c }));
  const rFeet = cardChip(bCard, '**FROM** = **FEET**', '#8A5A2A', '#F6EBCB'); tr(rFeet, CX, 165);
  const rFeet1 = row(bCard, 600, 'feet at the **well**', { size: 32, bold: '#8A5A2A' });
  const rFeet2 = row(bCard, 648, 'North line at the **well**', { size: 32, bold: '#8A5A2A' });
  const rDad = cardChip(bCard, 'Dad: **72°**, this way ↺', RED, '#FFE4E4'); tr(rDad, CX, 165);
  const rAnti = row(bCard, 165, 'clockwise from North: **288°**', { size: 32, bold: BLUE });
  const wAnti = mkMath(bCard, CX, 630, '360° − 72° = 288°', { size: 42, anchor: 'middle', fill: INK, weight: 700 });
  const stOff = cbStamp(bCard, false);

  /* ================= C: the compass rose ================= */
  const rCard = G(Lcard);
  cbPaper(rCard, 585, 94, 585, 578);
  const Rc = [CX, 380];
  let sp = '', dg = '';
  for (let i = 0; i < 4; i++) { const e = bp(i * 90, 150, Rc); sp += `M${Rc[0]},${Rc[1]} L${e[0].toFixed(1)},${e[1].toFixed(1)} `; const f = bp(45 + i * 90, 104, Rc); dg += `M${Rc[0]},${Rc[1]} L${f[0].toFixed(1)},${f[1].toFixed(1)} `; }
  E('path', { d: dg, stroke: '#9AA6B2', 'stroke-width': 3.5, 'stroke-dasharray': '8 6' }, rCard);
  E('path', { d: sp, stroke: INK, 'stroke-width': 4.5, 'stroke-linecap': 'round' }, rCard);
  E('circle', { cx: Rc[0], cy: Rc[1], r: 7, fill: INK }, rCard);
  const sweep = brgArc(rCard, Rc[0], Rc[1], 118, 4, 356, BLUE, { width: 5 });
  const sweepTip = arcTip(rCard, Rc[0], Rc[1], 118, 356, 1, BLUE);
  const letters = [['N', 0, RED], ['E', 90, INK], ['S', 180, INK], ['W', 270, INK]].map(([s, b, c]) => { const p = bp(b, 180, Rc); return lab(rCard, p[0], p[1] + 14, s, { size: 42, col: c }); });
  const listL = [['000°', Rc[0] + 34, Rc[1] - 166, 'start'], ['090°', Rc[0] + 180, Rc[1] + 54, 'middle'], ['180°', Rc[0] + 34, Rc[1] + 194, 'start'], ['270°', Rc[0] - 180, Rc[1] + 54, 'middle']]
    .map(([s, x, y, a]) => lab(rCard, x, y, s, { size: 32, col: BLUE, anchor: a }));
  const halfL = [['NE', '045°', 45], ['SE', '135°', 135], ['SW', '225°', 225], ['NW', '315°', 315]].map(([n, s, b]) => {
    const g = G(rCard), p = bp(b, 146, Rc), below = b === 135 || b === 225;
    lab(g, p[0], p[1] + (below ? 22 : -14), n, { size: 26, col: '#5A6670' });
    lab(g, p[0], p[1] + (below ? 52 : 16), s, { size: 30, col: GREEN });
    return g;
  });
  const words = [['**N**ever', 0], ['**E**at', 0], ['**S**oggy', 0], ['**W**affles', 0]].map(([w]) => mkText(rCard, 0, 0, w, { size: 38, fill: INK, boldFill: RED, weight: 700 }));
  { const gap = 16, tot = words.reduce((a, w) => a + w.w, 0) + gap * 3; let x = CX - tot / 2; words.forEach(w => { w.x = x; x += w.w + gap; }); }
  const stOn = cbStamp(rCard, true);

  /* the soggy waffle (Ah Boy's horror) */
  const soggy = G(Lhud);
  E('path', { d: 'M-70,-20 Q-30,-34 0,-24 Q34,-34 70,-20 Q76,10 60,30 Q54,46 50,30 Q30,40 10,34 Q4,52 -2,34 Q-30,40 -50,30 Q-58,48 -62,28 Q-76,10 -70,-20 Z', fill: '#D9A24A', stroke: '#8A5A1A', 'stroke-width': 4, 'stroke-linejoin': 'round' }, soggy);
  E('path', { d: 'M-40,-24 Q-42,0 -36,26 M-12,-26 Q-14,4 -10,30 M16,-26 Q14,4 18,30 M44,-24 Q42,0 46,26 M-66,-4 Q0,-10 68,-4 M-62,16 Q0,10 62,16', fill: 'none', stroke: '#B8782A', 'stroke-width': 3 }, soggy);
  E('path', { d: 'M54,34 q4,14 0,18 q-4,-4 0,-18 Z M-56,34 q4,14 0,18 q-4,-4 0,-18 Z', fill: '#9FD8FF', stroke: '#2E7DA8', 'stroke-width': 2 }, soggy);
  const soggyChip = pill(soggy, 'soggy?!', { size: 30, color: '#FF8A8A', stroke: '#FF8A8A' }); tr(soggyChip, 0, -70);

  /* ================= D: draw 230° ================= */
  const dCard = G(Lcard);
  cbPaper(dCard, 585, 94, 585, 578);
  const Dc = [CX, 385];
  const nD = cbNorth(dCard, 150, { col: INK, size: 30, down: 150 }); tr(nD, Dc[0], Dc[1]);
  lab(dCard, Dc[0] + 22, Dc[1] + 150, 'S', { size: 30, col: '#5A6670', anchor: 'start' });
  const a180 = brgArc(dCard, Dc[0], Dc[1], 66, 0, 180, BLUE);
  const a50 = brgArc(dCard, Dc[0], Dc[1], 66, 180, 230, ORANGE);
  const tip50 = arcTip(dCard, Dc[0], Dc[1], 66, 230, 1, ORANGE);
  const a130 = E('path', { d: mkArcD(Dc[0], Dc[1], 108, -220, -90), fill: 'none', stroke: PURP, 'stroke-width': 5, 'stroke-dasharray': '12 8', 'stroke-linecap': 'round' }, dCard);
  const tip130 = arcTip(dCard, Dc[0], Dc[1], 108, 230, -1, PURP);
  const arm230 = cbSeg(dCard, Dc[0], Dc[1], ...bp(230, 205, Dc), { col: RED, width: 5 });
  E('circle', { cx: Dc[0], cy: Dc[1], r: 7, fill: INK }, dCard);
  const l180 = lab(dCard, Dc[0] + 116, Dc[1] + 12, '180°', { size: 30, col: BLUE });
  const l50p = bp(205, 104, Dc), l50 = lab(dCard, l50p[0] + 4, l50p[1] + 18, '50°', { size: 30, col: ORANGE });
  const l130p = bp(295, 148, Dc), l130 = lab(dCard, l130p[0], l130p[1] + 10, '130°', { size: 30, col: PURP });
  const e230 = bp(230, 205, Dc), l230 = lab(dCard, e230[0] - 12, e230[1] + 38, '230°', { size: 34, col: RED });
  const rDraw = row(dCard, 165, 'draw a bearing of **230°**', { size: 34, bold: RED });
  const rSouth = row(dCard, 165, '{{230° > 180°}}: past **South**', { size: 32, bold: BLUE });
  const wS1 = mkMath(dCard, CX, 598, '180° + 50° = 230°', { size: 38, anchor: 'middle', fill: INK, weight: 700 });
  const wS2 = mkMath(dCard, CX, 650, '360° − 230° = 130°', { size: 38, anchor: 'middle', fill: PURP, weight: 700 });

  /* ================= chips, lower third ================= */
  const cTime = pill(Lhud, '3 p.m.  Checkpoint 5', { size: 30, color: GOLD, stroke: GOLD });
  const cNoMap = pill(Lhud, 'no map!', { size: 28, color: '#FF9A9A', stroke: '#FF9A9A' });
  const cCrick = pill(Lhud, '(cricket chirps)', { size: 30, color: '#B7F5A0', stroke: '#B7F5A0' });
  const ltN = cbLowerThird(Lhud, 'needle');

  /* cut points */
  const cB = at('rules') - 0.06, cC = at('nesw') - 0.06, cC2 = at('list') - 0.06, cD = at('draw') - 0.06, cE = at('pun') - 0.06;

  return t => {
    const sA = on(t, -1, cB), sB = on(t, cB, cC), sC = on(t, cC, cC2), sC2 = on(t, cC2, cD), sD = on(t, cD, cE), sE = on(t, cE, 1e9), sW = sA || sE;
    const who = scWho(S, t);
    isl.upd(t * AMP);
    op(bCard, sB); op(rCard, sC || sC2); op(dCard, sD);
    [dad, boy, kav, priya, tan].forEach(c => op(c, 0));
    [cTime, cNoMap, cCrick, clue, soggy].forEach(c => op(c, 0));
    op(flag, sW); op(well, sD ? 0 : 1); op(ndl, sD ? 0 : 1);
    ltN.set(win(t, at('rules') + 0.1, at('rules') + 3.2, 0.3));

    const place = (c, x, y, s) => { op(c, 1); tr(c, x, y === undefined ? Y0 : y, s || SB); };
    const lookTo = (myX, xs) => { const sp = xs[who]; if (sp === undefined) return 0.75; if (Math.abs(sp - myX) < 1) return 0.8; return sp > myX ? 0.8 : -0.8; };
    // the well (with Captain Needle on its roof) at x, scale s
    const wellAt = (x, s, mood, look, extra) => {
      tr(well, x, 566, s);
      const ns = 0.5 * s / 0.85;
      tr(ndl, x, 566 - 206 * s - 138 * ns + 4, ns);
      ndl.set(Object.assign({ t, talk: scTalk(S, t, 'needle'), mood, look, still: false }, extra || {}));
    };

    /* ---------- A / E: the wide shot ---------- */
    if (sW) {
      const xs = { dad: 100, boy: 250, kavya: 400, needle: 590, priya: 790, tan: 980 };
      place(dad, 100); place(boy, 250); place(kav, 400); place(priya, 790); place(tan, 980);
      wellAt(590, 0.85, sE ? 'deadpan' : 'smug', sE ? 0.8 : 0.6);
      if (sA) {
        popIn(cTime, t, at('card') - 0.5, 905, 64);
        popIn(cNoMap, t, at('card') - 0.1, 905, 126);
        popIn(clue, t, at('card') + 0.15, 830, 250, 1);
        mkDraw(scrib, P(t, mid('card', 0.45), 0.4, linear)); op(scrib, t > mid('card', 0.45) ? 1 : 0);
        op(just, P(t, mid('card', 0.72), 0.3, linear));
        dad.set({ t, mood: 'happy', look: 0.8 });
        boy.set({ t, mood: 'happy', look: 0.8 });
        kav.set({ t, mood: t > mid('card', 0.5) ? 'deadpan' : 'neutral', look: 0.8 });
        priya.set({ t, talk: scTalk(S, t, 'priya'), mood: 'smug', look: -0.6, lift: 1 });
        tan.set({ t, mood: 'neutral', look: -0.8 });
      } else {
        popIn(cCrick, t, mid('pun', 0.95), 905, 90);
        const dead = t > mid('pun', 0.55);
        dad.set({ t, mood: dead ? 'deadpan' : 'neutral', look: 0.8 });
        boy.set({ t, mood: dead ? 'deadpan' : 'neutral', look: 0.8 });
        kav.set({ t, mood: dead ? 'deadpan' : 'neutral', look: 0.8 });
        priya.set({ t, mood: dead ? 'deadpan' : 'neutral', look: 0.8 });
        tan.set({ t, talk: scTalk(S, t, 'tan'), mood: 'happy', look: -0.6, lift: 1 });
      }
    }

    /* ---------- B: from North, clockwise, three figures ---------- */
    if (sB) {
      const pIn = P(t, cB, 0.3, easeOut); tr(bCard, 0, 16 * (1 - pIn));
      // the cast (two cuts: rules / nc3 with Priya and Ah Boy; feet / dad / anti with Kavya and Dad)
      const g1 = t < at('feet') - 0.06;
      const xs = g1 ? { needle: 130, priya: 300, boy: 470 } : { needle: 130, kavya: 300, dad: 470 };
      let nm = 'smug';
      if (t >= at('anti')) nm = t < mid('anti', 0.55) ? 'annoyed' : 'smug';
      else if (who === 'dad') nm = 'deadpan';
      wellAt(130, 0.7, nm, lookTo(130, xs), { point: who === 'needle' && t < mid('rules', 0.3) ? P(t, at('rules'), 0.3, pop) : 0 });
      if (g1) {
        place(priya, 300); place(boy, 470);
        priya.set({ t, talk: scTalk(S, t, 'priya'), mood: t < mid('rules', 0.5) ? 'annoyed' : 'neutral', look: lookTo(300, xs) });
        boy.set({ t, talk: scTalk(S, t, 'boy'), mood: 'happy', look: lookTo(470, xs), lift: who === 'boy' ? 1 : 0 });
      } else {
        place(kav, 300); place(dad, 470);
        kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: who === 'kavya' ? 'happy' : t > at('anti') ? 'deadpan' : 'neutral', look: lookTo(300, xs) });
        const dm = t < at('dad') ? 'neutral' : t < at('anti') ? 'smug' : 'sad';
        dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: lookTo(470, xs), lift: t > mid('dad', 0.45) && t < at('anti') + 0.3 ? 1 : 0 });
      }
      // rules: the diagram builds with the words
      show(rBear, t, at('rules') + 0.05, mid('rules', 0.58));
      show(ship, t, mid('rules', 0.62), at('nc3'));
      const fade060 = 1 - P(t, mid('dad', 0.3), 0.2, linear);
      nW.set(P(t, mid('rules', 0.2), 0.5, ease));
      op(nGlow, t > at('feet') && t < at('dad') ? 0.3 + 0.4 * Math.abs(Math.sin((t - at('feet')) * 4)) : 0);
      b060.set(60, P(t, mid('rules', 0.42), 0.5, ease) * fade060, P(t, mid('rules', 0.28), 0.7, ease) * fade060);
      op(b060, fade060);
      op(ckG, P(t, mid('rules', 0.5), 0.3, linear) * fade060);
      cNorth.set(t < at('nc3') ? P(t, mid('rules', 0.18), 0.35, linear) : 0);
      cClock.set(t < at('nc3') ? P(t, mid('rules', 0.27), 0.35, linear) : 0);
      cThree.set(t < at('nc3') ? P(t, mid('rules', 0.36), 0.35, linear) : 0);
      show(nc3, t, at('nc3') + 0.1, at('feet'));
      // feet
      rFeet.set(t >= at('feet') && t < at('dad') ? P(t, at('feet') + 0.1, 0.35, linear) : 0);
      op(feet, P(t, mid('feet', 0.3), 0.3, linear) * fade060);
      show(rFeet1, t, mid('feet', 0.45), at('dad')); show(rFeet2, t, mid('feet', 0.72), at('dad'));
      // Dad's 72° the wrong way, then 288°
      rDad.set(t >= at('dad') && t < at('anti') ? P(t, mid('dad', 0.2), 0.35, linear) : 0);
      const p72 = P(t, mid('dad', 0.45), 0.6, ease);
      b72.set(288, p72, p72); op(b72, t > mid('dad', 0.4) ? 1 : 0);
      stOff.set(t >= at('anti') ? P(t, at('anti') + 0.1, 0.35, linear) : 0); tr(stOff, CX, 170, 0.45);
      show(rAnti, t, mid('anti', 0.8));
      if (t > mid('anti', 0.78)) stOff.set(1 - P(t, mid('anti', 0.75), 0.15, linear));
      const q288 = P(t, mid('anti', 0.42), 0.9, ease);
      b288.set(288, t > mid('anti', 0.4) ? 1 : 0, q288); op(b288, t > mid('anti', 0.4) ? 1 : 0);
      show(wAnti, t, mid('anti', 0.6));
    }

    /* ---------- C: the compass rose ---------- */
    if (sC || sC2) {
      const xs = sC ? { needle: 130, boy: 300, kavya: 470 } : { needle: 130, kavya: 300, priya: 470 };
      wellAt(130, 0.7, sC2 && t > mid('list', 0.85) ? 'happy' : 'smug', lookTo(130, xs), { point: sC && t < mid('nesw', 0.25) ? P(t, at('nesw'), 0.3, pop) : 0 });
      if (sC) {
        place(boy, 300); place(kav, 470);
        boy.set({ t, talk: scTalk(S, t, 'boy'), mood: t >= at('why') - 0.1 ? 'annoyed' : 'happy', look: lookTo(300, xs), lift: who === 'boy' ? 1 : 0 });
        kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: t >= at('why') ? 'deadpan' : 'neutral', look: lookTo(470, xs) });
        if (t >= at('why')) popIn(soggy, t, at('why') + 0.05, 330, 245, 0.9);
      } else {
        place(kav, 300); place(priya, 470);
        kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: who === 'kavya' ? 'happy' : 'neutral', look: lookTo(300, xs) });
        priya.set({ t, talk: scTalk(S, t, 'priya'), mood: who === 'priya' ? 'smug' : 'neutral', look: lookTo(470, xs), lift: who === 'priya' ? 1 : 0 });
      }
      const pIn = P(t, cC, 0.3, easeOut); tr(rCard, 0, sC ? 16 * (1 - pIn) : 0);
      // N, E, S, W clockwise with the four words
      const tw = [mid('nesw', 0.42), mid('nesw', 0.58), mid('nesw', 0.72), mid('nesw', 0.86)];
      letters.forEach((l, i) => op(l, P(t, tw[i] - 0.1, 0.25, linear)));
      words.forEach((w, i) => { const p = P(t, tw[i], 0.3, easeOut); op(w, p); tr(w, w.x, 652 + 10 * (1 - p)); });
      const sw = P(t, tw[0] - 0.1, tw[3] - tw[0] + 0.3, linear);
      sweep.set(sw); op(sweepTip, sw > 0.98 ? 1 : 0); op(sweep, sw > 0.001 && t < at('list') + 0.2 ? 1 : 0);
      if (t >= at('list') + 0.2) { sweep.set(0); op(sweepTip, 0); }
      listL.forEach((l, i) => op(l, P(t, mid('list', 0.1 + i * 0.22), 0.3, linear)));
      halfL.forEach((l, i) => op(l, P(t, mid('halves', 0.22 + i * 0.2), 0.3, linear)));
      stOn.set(t >= at('list') && t < at('halves') + 0.4 ? P(t, mid('list', 0.9), 0.35, linear) * (1 - P(t, at('halves') + 0.2, 0.2, linear)) : 0);
      tr(stOn, 1046, 150, 0.4);
    }

    /* ---------- D: draw 230° ---------- */
    if (sD) {
      const xs = { tan: 130, kavya: 300, dad: 470 };
      place(tan, 130); place(kav, 300); place(dad, 470);
      tan.set({ t, talk: scTalk(S, t, 'tan'), mood: 'happy', look: lookTo(130, xs), lift: who === 'tan' ? 1 : 0 });
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: who === 'kavya' ? 'happy' : 'neutral', look: lookTo(300, xs) });
      dad.set({ t, mood: t > mid('south', 0.5) ? 'shock' : 'neutral', look: lookTo(470, xs) });
      const pIn = P(t, cD, 0.3, easeOut); tr(dCard, 0, 16 * (1 - pIn));
      show(rDraw, t, mid('draw', 0.3), at('south')); show(rSouth, t, at('south') + 0.05);
      nD.set(P(t, mid('draw', 0.4), 0.5, ease));
      a180.set(P(t, mid('south', 0.2), 0.8, ease)); op(l180, P(t, mid('south', 0.3), 0.3, linear));
      a50.set(P(t, mid('south', 0.38), 0.5, ease)); op(tip50, t > mid('south', 0.38) + 0.45 ? 1 : 0); op(l50, P(t, mid('south', 0.42), 0.3, linear));
      arm230.set(P(t, mid('south', 0.42), 0.5, ease)); op(l230, P(t, mid('south', 0.5), 0.3, linear));
      show(wS1, t, mid('south', 0.45));
      op(a130, P(t, mid('south', 0.7), 0.3, linear)); op(tip130, P(t, mid('south', 0.72), 0.3, linear));
      op(l130, P(t, mid('south', 0.74), 0.3, linear));
      show(wS2, t, mid('south', 0.8));
    }
  };
});
