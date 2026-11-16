/* Scene 1: Forty ice-cream sticks (term-to-term rules and pattern sequences).
   Shots (hard sitcom cuts):
   C  2:15 p.m., the corridor: Priya (lower third) pops up behind the railing next to Kavya, "fortune teller?" ->
      she writes 1/2, 3/4, 1, 1 1/4 on the card on the wall
   N  inside the NEXTA-LITE box: Madame Nexta, the card beside her: three hops "+1/4", the ball shows 1 1/2
   C  Priya: 2.3, 2.75, 3.2, 3.65         N  gaps +0.45 under each pair, next 4.1
   N  a sequence = first term + rule      C  Priya: ?, 80, 20, 5 (what came before?)
   N  hops ÷ 4 forwards to 5/4, a red hop × 4 backwards: 80 × 4 = 320, the inverse
   C  Priya: 1, 2, 4 ...                  N  × 2: 8
   C  Paati (lower third): +1, +2, +3: 7  N  both rows; the crystal ball cracks into 8 | 7
   C  Kavya: check the rule on EVERY gap: 1, 2, 4, 8, 16 with a tick under every gap
   C2 Ah Boy's door border: 1, 2, 3 squares = 4, 7, 10 sticks, "10 squares: 40 sticks?" PATTERN BROKEN, lights bzzt
      -> the 3 new sticks of each square glow, +3 hops -> pattern n = 4 + (n − 1) × 3, pattern 10 = 31, PATTERN
      FOUND, the 31-stick row slides along -> Ah Boy holds up his sheet: ten separate squares, 40 sticks glued. */
scene('sticks', S => {
  const { at, end, mid } = S, root = S.root;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 2, color: o.color || C.ink, weight: 700 }); };
  const fadeIn = (el, t, t0, d) => { const p = P(t, t0, d || 0.3, easeOut); op(el, p); return p; };
  const GOLD = NX_COL.gold, PURPLE = NX_COL.purple, INK = MK.ink, GREEN = '#1E9E5A', RED = '#D32F2F', PINK = '#B8336A', ORANGE = '#E8751A';
  const CX = 870;   // centre of the card on the wall

  /* a row of terms with commas, laid out from measured widths and centred on CX.
     r.set(i, p) pops term i in; r.q[i] is a '?' placeholder (if asked); commas follow automatically */
  function seqRow(parent, terms, o) {
    o = o || {};
    const size = o.size || 54, gap = o.gap || 44, y = o.y, g = G(parent);
    const ws = terms.map(s => mkMeasure(s, { size, weight: 700 }).w);
    const total = ws.reduce((a, b) => a + b, 0) + gap * (terms.length - 1);
    let x = (o.cx || CX) - total / 2;
    const xs = ws.map(w => { const c = x + w / 2; x += w + gap; return c; });
    const items = terms.map((s, i) => { const e = G(g); mkMath(e, 0, 0, s, { size, anchor: 'middle', fill: (o.cols && o.cols[i]) || INK, weight: 700 }); tr(e, xs[i], y); return e; });
    const q = {}, cI = [], cQ = [];
    (o.q || []).forEach(i => { const e = G(g); mkMath(e, 0, 0, '?', { size, anchor: 'middle', fill: PINK, weight: 700 }); tr(e, xs[i], y); q[i] = e; });
    const qw = mkMeasure('?', { size, weight: 700 }).w;
    terms.forEach((s, i) => {
      cI.push(i < terms.length - 1 ? mkMath(g, xs[i] + ws[i] / 2 + 2, y, ',', { size, fill: INK, weight: 700 }) : null);
      cQ.push(i < terms.length - 1 && q[i] ? mkMath(g, xs[i] + qw / 2 + 2, y, ',', { size, fill: INK, weight: 700 }) : null);
    });
    const vis = terms.map(() => 0), qv = terms.map(() => 0);
    const r = { g, xs, ws, y, items, q, size };
    r.set = (i, p) => { vis[i] = p; op(items[i], clamp(p * 2.5)); tr(items[i], xs[i], y, Math.max(0.01, 0.6 + 0.4 * pop(clamp(p)))); };
    r.setQ = (i, p) => { qv[i] = p; if (q[i]) op(q[i], p); };
    r.done = () => terms.forEach((s, i) => {
      if (i >= terms.length - 1) return;
      const nxt = Math.max(clamp(vis[i + 1] * 2.5), qv[i + 1]);
      op(cI[i], Math.min(clamp(vis[i] * 2.5), nxt));
      if (cQ[i]) op(cQ[i], vis[i] > 0.05 ? 0 : Math.min(qv[i], nxt));
    });
    r.hide = () => { terms.forEach((s, i) => { r.set(i, 0); r.setQ(i, 0); }); r.done(); };
    r.hide();
    return r;
  }
  /* a hop arrow between two slots of a row, above (default) or below, with a label */
  function hop(parent, r, i, j, label, col, o) {
    o = o || {};
    const g = G(parent), below = !!o.below, dx = o.dx || 4;
    const d = j > i ? 1 : -1, x1 = r.xs[i] + d * (Math.min(r.ws[i], 60) * 0.2 + dx), x2 = r.xs[j] - d * (Math.min(r.ws[j], 60) * 0.2 + dx);
    const yy = below ? r.y + (o.down || 26) : r.y - (o.up || r.size * 1.05);
    const bend = (below ? 1 : -1) * (j > i ? 1 : -1) * (o.bend || 26);
    const a = arrow(g, x1, yy, x2, yy, { color: col, width: 4, bend });
    const lab = mkMath(g, (x1 + x2) / 2, below ? yy + 50 : yy - (o.lup || 26), label, { size: o.lsize || 30, anchor: 'middle', fill: col, weight: 700 });
    g.set = p => { op(g, p > 0 ? 1 : 0); a.set(p); op(lab, clamp((p - 0.4) / 0.4)); };
    g.set(0);
    return g;
  }

  /* layers: sets, characters, things in front of the characters, the card, HUD */
  const Lbg = G(root), Lcast = G(root), Lfront = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= the corridor ================= */
  const corShot = G(Lbg);
  const cor = nxCorridor(corShot);
  const corFront = G(Lfront); corFront.appendChild(cor.front); corFront.appendChild(cor.top);

  /* ================= inside the box ================= */
  const stageShot = G(Lbg);
  const stage = nxBoxStage(stageShot); stage.curtain(1);
  const curtF = G(Lfront); curtF.appendChild(stage.curt);

  /* ================= the card on the wall ================= */
  const cardG = G(Lfg);
  E('rect', { x: 578, y: 124, width: 596, height: 422, rx: 18, fill: 'rgba(0,0,0,0.22)' }, cardG);
  E('rect', { x: 572, y: 118, width: 596, height: 422, rx: 18, fill: MK.paper, stroke: '#C9B48A', 'stroke-width': 5 }, cardG);
  const title = (s, o) => { const m = mkText(cardG, CX, 176, s, Object.assign({ size: 32, anchor: 'middle', fill: INK, boldFill: PURPLE }, o || {})); op(m, 0); return m; };

  // fractions: 1/2, 3/4, 1, 1 1/4, [1 1/2]
  const rF = seqRow(cardG, ['1/2', '3/4', '1', '1 1/4', '1 1/2'], { y: 392, size: 56, gap: 46, q: [4], cols: [INK, INK, INK, INK, GREEN] });
  const hF = [0, 1, 2, 3].map(i => hop(cardG, rF, i, i + 1, '+1/4', PURPLE, { up: 92, lup: 36, lsize: 36 }));
  const tF = title('rule: **add** {{1/4}}');
  // decimals: 2.3, 2.75, 3.2, 3.65, [4.1]
  const rD = seqRow(cardG, ['2.3', '2.75', '3.2', '3.65', '4.1'], { y: 330, size: 50, gap: 40, q: [4], cols: [INK, INK, INK, INK, GREEN] });
  const hD = [0, 1, 2, 3].map(i => hop(cardG, rD, i, i + 1, '+0.45', PURPLE, { below: true, down: 24, lsize: 30 }));
  const tD = title('every gap is **0.45**');
  // a sequence = first term + rule
  const bTwo = G(cardG);
  { const a = mkChip(bTwo, '**first term**', { size: 36, col: GOLD, fill: '#2A0E40' }); tr(a, 720, 280);
    const b = mkChip(bTwo, '**rule**', { size: 36, col: GOLD, fill: '#2A0E40' }); tr(b, 1030, 280);
    mkMath(bTwo, 890, 294, '+', { size: 56, anchor: 'middle', fill: INK, weight: 800 });
    mkText(bTwo, CX, 420, '= a **sequence**', { size: 44, anchor: 'middle', fill: INK, boldFill: PURPLE });
    mkText(bTwo, CX, 490, 'e.g. first term {{2}}, rule **add 2**: {{2, 4, 6, 8}}', { size: 28, anchor: 'middle', fill: '#5A4A52', boldFill: '#5A4A52' }); }
  // backwards: ?, 80, 20, 5, [5/4]   (? becomes 320)
  const rB = seqRow(cardG, ['320', '80', '20', '5', '5/4'], { y: 330, size: 54, gap: 44, q: [0], cols: [RED, INK, INK, INK, GREEN] });
  const hB = [0, 1, 2].map(i => hop(cardG, rB, i + 1, i + 2, '÷ 4', PURPLE, { up: 60 }));
  const hBack = hop(cardG, rB, 1, 0, '× 4', RED, { below: true, down: 26 });
  const bArrow = G(cardG);
  { const a = arrow(bArrow, rB.xs[1] - 20, 450, rB.xs[0] + 6, 400, { color: PINK, width: 5 }); mkText(bArrow, rB.xs[1] + 10, 478, 'what came **before**?', { size: 28, anchor: 'start', fill: PINK, boldFill: PINK }); }
  const tB = title('rule: **÷ 4**');
  const cInv = mkChip(cardG, 'backwards: use the **inverse**', { size: 28, col: RED, fill: '#FFF0F0' }); tr(cInv, CX, 446);
  const wInv = mkMath(cardG, CX, 510, '80 × 4 = 320', { size: 40, anchor: 'middle', fill: RED, weight: 700 });
  // two rules: 1, 2, 4, [8]  and  1, 2, 4, [7]
  const rT1 = seqRow(cardG, ['1', '2', '4', '8'], { y: 286, size: 56, gap: 70, q: [3], cx: 900, cols: [INK, INK, INK, PURPLE] });
  const rT2 = seqRow(cardG, ['1', '2', '4', '7'], { y: 470, size: 56, gap: 70, q: [3], cx: 900, cols: [INK, INK, INK, GREEN] });
  const hT1 = [0, 1, 2].map(i => hop(cardG, rT1, i, i + 1, '× 2', PURPLE, { up: 58 }));
  const hT2 = [0, 1, 2].map(i => hop(cardG, rT2, i, i + 1, ['+1', '+2', '+3'][i], GREEN, { up: 58 }));
  const lT1 = mkText(cardG, 612, 286, 'Nexta', { size: 26, fill: PURPLE, weight: 800 });
  const lT2 = mkText(cardG, 612, 470, 'Paati', { size: 26, fill: GREEN, weight: 800 });
  const ring8 = E('circle', { cx: rT1.xs[3], cy: 268, r: 38, fill: 'none', stroke: PURPLE, 'stroke-width': 5 }, cardG);
  const ring7 = E('circle', { cx: rT2.xs[3], cy: 452, r: 38, fill: 'none', stroke: GREEN, 'stroke-width': 5 }, cardG);
  // check every gap: 1, 2, 4, 8, 16
  const rE = seqRow(cardG, ['1', '2', '4', '8', '16'], { y: 330, size: 56, gap: 60 });
  const hE = [0, 1, 2, 3].map(i => hop(cardG, rE, i, i + 1, '× 2', PURPLE, { up: 60 }));
  const ticksE = [0, 1, 2, 3].map(i => { const k = tick(cardG, 16, GREEN); tr(k, (rE.xs[i] + rE.xs[i + 1]) / 2, 384); return k; });
  const cEvery = mkChip(cardG, 'check the rule on **every** gap', { size: 30, col: '#1B6B44', fill: '#E6F7EC' }); tr(cEvery, CX, 470);
  // Ah Boy's border: 1, 2, 3 squares
  const bStk = G(cardG);
  const SC = 52, SX = [646, 768, 942], SY = 322;
  const pats = [1, 2, 3].map((n, i) => { const p = nxSticks(bStk, n, { cell: SC }); tr(p, SX[i], SY); return p; });
  const pLab = ['1 square', '2 squares', '3 squares'].map((s, i) => mkText(bStk, SX[i] + (i + 1) * SC / 2, 238, s, { size: 26, anchor: 'middle', fill: '#5A4A52', weight: 700 }));
  const cnt = G(cardG), CNTY = 404;
  const cntX = [0, 1, 2].map(i => SX[i] + (i + 1) * SC / 2);
  const cntR = { xs: cntX, ws: [120, 120, 140], y: CNTY, size: 40 };
  ['4', '7', '10'].forEach((s, i) => mkText(cnt, cntX[i], CNTY, `**${s}** sticks`, { size: 34, anchor: 'middle', fill: '#5A4A52', boldFill: INK, weight: 700 }));
  const hS = [0, 1].map(i => hop(cardG, cntR, i, i + 1, '+3', ORANGE, { below: true, down: 22 }));
  const cNew = mkChip(cardG, 'each new square: **3** new sticks', { size: 28, col: ORANGE, fill: '#FFF3E6' }); tr(cNew, CX, 506);
  // the rule, and the 31-stick row
  const work = mkWorking(cardG, 818, 150, [
    '"pattern" n = 4 + (n − 1) × 3',
    '"pattern" 10 = 4 + 9 × 3',
    { m: '= 31', col: GREEN }], { size: 34, fill: INK, gap: 14 });
  const row10 = nxSticks(cardG, 10, { cell: 42 }); tr(row10, CX - 210, 424);
  const lab31 = mkText(cardG, CX, 494, '**31** sticks', { size: 36, anchor: 'middle', fill: INK, boldFill: GREEN });
  // Ah Boy's sheet: ten separate squares, 40 sticks
  const sheet = G(cardG);
  { const sh = G(sheet);
    E('rect', { x: -262, y: -70, width: 524, height: 140, rx: 8, fill: '#FFFFFF', stroke: '#9CA8B4', 'stroke-width': 4 }, sh);
    const rr = rng(77);
    for (let k = 0; k < 10; k++) {
      const q = G(sh); tr(q, -230 + k * 51 + 18, -6 + (rr() - 0.5) * 18, 1, (rr() - 0.5) * 22);
      [[-17, -19, 34, 8], [-17, 11, 34, 8], [-19, -17, 8, 34], [11, -17, 8, 34]].forEach(([x, y, w, h]) => E('rect', { x, y, width: w, height: h, rx: 4, fill: '#F2D49B', stroke: '#9C7A3E', 'stroke-width': 1.5 }, q));
    }
    mkText(sh, 0, 58, '**40** sticks', { size: 28, anchor: 'middle', fill: RED, boldFill: RED }); }
  const sheetIn = sheet.firstChild;

  /* ---------- chips, bubbles, stamps ---------- */
  const cTime = pill(Lhud, '2:15 p.m.', { size: 30, color: GOLD, stroke: GOLD });
  const thinkP = mkThoughtBubble(Lfg, 'fortune teller?', { size: 30, tail: 'left' });
  const bubBoy = mkSpeechBubble(Lfg, '**10** squares: **40** sticks?', { size: 30, tail: 'down', tailX: -10, boldFill: RED });
  const stBroken = nxStamp(Lhud, false), stFound = nxStamp(Lhud, true);
  // the crack in the crystal ball (divided)
  const crack = G(Lfg);
  E('path', { d: 'M-4,-40 L5,-22 L-6,-6 L6,10 L-4,26 L3,40', fill: 'none', stroke: '#2A1A22', 'stroke-width': 4, 'stroke-linejoin': 'round' }, crack);
  T(crack, -18, 9, '8', { size: 30, weight: 800, anchor: 'middle', fill: PURPLE });
  T(crack, 20, 9, '7', { size: 30, weight: 800, anchor: 'middle', fill: GREEN });

  /* ---------- the cast ---------- */
  const kav = cast(Lcast, 'kavya');
  const priya = cast(Lcast, 'priya');
  const paati = cast(Lcast, 'paati');
  const boy = cast(Lcast, 'boy'); nxHandProp(boy.hand, 'sticks');
  const nexta = cast(Lcast, 'nexta');
  const lt = { priya: nxLowerThird(Lhud, 'priya'), paati: nxLowerThird(Lhud, 'paati') };
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* ---------- cuts ---------- */
  const k = id => at(id) - 0.06;
  const NLINES = ['quarter', 'point', 'two', 'inverse', 'double', 'divided'];
  const nShot = t => NLINES.some((id, i) => t >= k(id) && t < k(['decs', 'two', 'back', 'trick', 'paati', 'every'][i]));
  const c2 = k('sticks');

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const sN = nShot(t) ? 1 : 0, sC = 1 - sN, sC2 = sC && t >= c2 ? 1 : 0;
    const who = scWho(S, t);
    for (const kk in lt) lt[kk].set(0);
    const show = { kav: 0, priya: 0, paati: 0, boy: 0, nexta: 0 };

    /* ---------- card contents: which board is up ---------- */
    const B = t < k('decs') ? 'F' : t < k('two') ? 'D' : t < k('back') ? 'T2' : t < k('trick') ? 'B' : t < k('every') ? 'T' : t < c2 ? 'E' : 'S';
    const cardOn = t >= mid('fracs', 0.08) ? 1 : 0;
    op(cardG, cardOn);
    [rF, rD, rB, rT1, rT2, rE].forEach(r => op(r.g, 0));
    [tF, tD, tB, bTwo, bArrow, cInv, wInv, lT1, lT2, ring8, ring7, cEvery, bStk, cnt, cNew, work, row10, lab31, sheet].forEach(e => op(e, 0));
    [...hF, ...hD, ...hB, hBack, ...hT1, ...hT2, ...hE, ...hS].forEach(h => h.set(0));
    ticksE.forEach(e => op(e, 0));
    if (B === 'F') {
      op(rF.g, 1);
      [0, 1, 2, 3].forEach(i => rF.set(i, P(t, mid('fracs', 0.4 + i * 0.13), 0.35, linear)));
      rF.setQ(4, t >= mid('fracs', 0.85) && t < mid('quarter', 0.78) ? 1 : 0);
      if (t >= at('quarter') - 0.1) {
        hF.forEach((h, i) => { if (i < 3) h.set(P(t, mid('quarter', 0.05 + i * 0.1), 0.35, linear)); });
        op(tF, P(t, mid('quarter', 0.4), 0.3, linear));
        hF[3].set(P(t, mid('quarter', 0.68), 0.3, linear));
        rF.set(4, P(t, mid('quarter', 0.78), 0.45, linear));
      } else rF.set(4, 0);
      rF.done();
    } else if (B === 'D') {
      op(rD.g, 1);
      [0, 1, 2, 3].forEach(i => rD.set(i, P(t, mid('decs', 0.22 + i * 0.17), 0.35, linear)));
      rD.setQ(4, t >= mid('decs', 0.88) && t < mid('point', 0.72) ? 1 : 0);
      if (t >= at('point') - 0.1) {
        hD.forEach((h, i) => { if (i < 3) h.set(P(t, mid('point', 0.05 + i * 0.12), 0.35, linear)); });
        op(tD, P(t, mid('point', 0.2), 0.3, linear));
        hD[3].set(P(t, mid('point', 0.62), 0.3, linear));
        rD.set(4, P(t, mid('point', 0.72), 0.45, linear));
      } else rD.set(4, 0);
      rD.done();
    } else if (B === 'T2') {
      op(bTwo, 1);
      const parts = bTwo.childNodes;
      [[3, 0.1], [0, 0.45], [2, 0.56], [1, 0.62], [4, 0.78]].forEach(([n, f]) => op(parts[n], P(t, mid('two', f), 0.25, linear)));
    } else if (B === 'B') {
      op(rB.g, 1);
      [1, 2, 3].forEach(i => rB.set(i, P(t, mid('back', 0.05 + (i - 1) * 0.12), 0.35, linear)));
      const inv = t >= at('inverse') - 0.1;
      rB.setQ(0, t >= mid('back', 0.6) && t < mid('inverse', 0.86) ? 1 : 0);
      op(bArrow, t >= mid('back', 0.62) && !inv ? P(t, mid('back', 0.62), 0.3, linear) : 0);
      if (inv) {
        op(tB, P(t, mid('inverse', 0.02), 0.3, linear));
        hB.forEach((h, i) => h.set(P(t, mid('inverse', 0.05 + i * 0.12), 0.35, linear)));
        rB.set(4, P(t, mid('inverse', 0.35), 0.45, linear));
        hBack.set(P(t, mid('inverse', 0.56), 0.4, linear));
        cInv.set(P(t, mid('inverse', 0.6), 0.4, linear));
        op(wInv, P(t, mid('inverse', 0.74), 0.3, linear));
        rB.set(0, P(t, mid('inverse', 0.86), 0.45, linear));
      } else { rB.set(0, 0); rB.set(4, 0); cInv.set(0); }
      rB.done();
    } else if (B === 'T') {
      op(rT1.g, 1);
      [0, 1, 2].forEach(i => rT1.set(i, P(t, mid('trick', 0.3 + i * 0.18), 0.35, linear)));
      rT1.setQ(3, t >= mid('trick', 0.85) && t < mid('double', 0.5) ? 1 : 0);
      hT1.forEach((h, i) => h.set(P(t, mid('double', 0.02 + i * 0.12), 0.3, linear)));
      rT1.set(3, P(t, mid('double', 0.5), 0.4, linear));
      op(lT1, P(t, mid('double', 0.1), 0.3, linear));
      rT1.done();
      if (t >= at('paati') - 0.1) {
        op(rT2.g, 1);
        [0, 1, 2].forEach(i => rT2.set(i, P(t, mid('paati', 0.0 + i * 0.05), 0.3, linear)));
        op(lT2, P(t, mid('paati', 0.0), 0.3, linear));
        hT2.forEach((h, i) => h.set(P(t, mid('paati', 0.12 + i * 0.13), 0.3, linear)));
        rT2.setQ(3, t < mid('paati', 0.62) ? 1 : 0);
        rT2.set(3, P(t, mid('paati', 0.62), 0.4, linear));
        rT2.done();
      }
      if (t >= at('divided') - 0.1) { op(ring8, P(t, mid('divided', 0.1), 0.3, linear)); op(ring7, P(t, mid('divided', 0.25), 0.3, linear)); }
    } else if (B === 'E') {
      op(rE.g, 1);
      [0, 1, 2, 3, 4].forEach(i => rE.set(i, P(t, mid('every', 0.05 + i * 0.06), 0.3, linear)));
      rE.done();
      hE.forEach((h, i) => h.set(P(t, mid('every', 0.4 + i * 0.1), 0.3, linear)));
      ticksE.forEach((e, i) => popIn(e, t, mid('every', 0.48 + i * 0.1), (rE.xs[i] + rE.xs[i + 1]) / 2, 386, 1));
      cEvery.set(P(t, mid('every', 0.3), 0.4, linear));
    } else {
      // Ah Boy's border
      const ruleOn = t >= at('rule') - 0.1;
      const gl = t >= at('glued') - 0.1;
      op(bStk, ruleOn ? 0 : 1); op(cnt, ruleOn ? 0 : 1);
      pats.forEach((p, i) => { p.set(clamp((t - mid('sticks', 0.12 + i * 0.16)) / 0.5) * (i + 1), t >= mid('share', 0.1) ? 1 : 0); });
      pLab.forEach((e, i) => op(e, P(t, mid('sticks', 0.12 + i * 0.16), 0.3, linear)));
      [...cnt.childNodes].forEach((e, i) => op(e, P(t, mid('sticks', 0.2 + i * 0.16), 0.3, linear)));
      if (!ruleOn) {
        hS.forEach((h, i) => h.set(P(t, mid('share', 0.45 + i * 0.15), 0.35, linear)));
        cNew.set(P(t, mid('share', 0.25), 0.4, linear));
      } else cNew.set(0);
      if (ruleOn) {
        op(work, gl ? 1 - P(t, at('glued') - 0.1, 0.2, linear) : 1);
        work.show(0, P(t, mid('rule', 0.02), 0.3, linear)); work.show(1, P(t, mid('rule', 0.45), 0.3, linear)); work.show(2, P(t, mid('rule', 0.78), 0.3, linear));
        work.ring(2, P(t, mid('rule', 0.86), 0.2, linear));
        op(row10, 1); row10.set(clamp((t - mid('rule', 0.5)) / 2.0) * 10, 0);
        op(lab31, P(t, mid('rule', 0.82), 0.3, linear));
      }
      if (gl) {
        const sp = P(t, at('glued') - 0.05, 0.45, pop);
        op(sheet, clamp(sp * 2.5)); tr(sheet, CX, 250);
        tr(sheetIn, 0, 30 * (1 - clamp(sp)), Math.max(0.01, 0.92 + 0.08 * sp), -3);
      }
    }

    /* ---------- the corridor ---------- */
    op(corShot, sC); op(corFront, sC);
    op(cTime, 0); thinkP.set(0); bubBoy.set(0); stBroken.set(0); stFound.set(0);
    if (sC) {
      cor.upd(t, 0);
      // the lights: twinkle; bzzt after the broken pattern; ripple once the rule is found
      const tB = mid('sticks', 0.82), tF = mid('rule', 0.86);
      let mode = 'on', mp = 1;
      if (t >= tB && t < at('share') - 0.1) { mode = 'bzzt'; mp = clamp((t - tB) / 1.0); }
      else if (t >= tF) mode = 'ripple';
      cor.lights.set(t, mode, mp);
      if (!sC2) {
        // C: Kavya, Priya, (Paati)
        show.kav = 1; show.priya = 1;
        tr(kav, 130, 452, 0.9);
        const pUp = P(t, at('priya') + 0.5, 0.4, pop);
        tr(priya, 300, lerp(700, 452, pUp), 0.9);
        lt.priya.set(win(t, at('priya') + 0.9, at('priya') + 4.0, 0.3));
        popIn(cTime, t, at('priya') + 0.1, 720, 66);
        if (t < at('fracs')) { thinkP.set(P(t, mid('priya', 0.55), 0.4, linear)); tr(thinkP, 560, 236); }
        const pIn = t >= at('paati') - 0.3;
        if (pIn) {
          show.paati = 1;
          const up = P(t, at('paati') - 0.3, 0.4, pop);
          tr(paati, 470, lerp(700, 452, up), 0.9);
          lt.paati.set(win(t, at('paati') + 0.1, at('paati') + 3.2, 0.3));
        }
        // moods and looks
        const pSpeak = who === 'priya';
        let pm = 'smug', pl = 0.8, plift = 0, km = 'neutral', kl = 0.8, am = 'happy', al = 0.8;
        if (t < at('fracs')) { pm = 'smug'; pl = -0.7; km = 'neutral'; kl = 0.7; }
        else if (pSpeak) { pm = 'smug'; pl = 0.8; plift = 1; }
        if (t >= at('decs') && t < at('back')) pm = pSpeak ? 'smug' : 'annoyed';
        if (t >= at('back') && !pSpeak) pm = 'annoyed';
        if (t >= at('paati')) { pm = t >= at('every') ? 'annoyed' : 'shock'; pl = 0.9; km = t >= at('every') ? 'smug' : 'happy'; kl = who === 'paati' ? 0.9 : 0.8; }
        if (t >= at('every')) { km = 'neutral'; kl = 0.9; pl = -0.8; am = 'happy'; al = -0.9; plift = 0; }
        if (who === 'paati') { am = 'happy'; al = 0.8; }
        kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
        priya.set({ t, talk: scTalk(S, t, 'priya'), mood: pm, look: pl, lift: plift });
        if (pIn) paati.set({ t, talk: scTalk(S, t, 'paati'), mood: am, look: al, lift: who === 'paati' ? 1 : 0 });
      } else {
        // C2: Kavya, Ah Boy, Priya
        show.kav = 1; show.boy = 1; show.priya = 1;
        tr(kav, 130, 452, 0.9); tr(priya, 470, 452, 0.9);
        const bUp = P(t, c2 - 0.1, 0.4, pop);
        tr(boy, 300, lerp(700, 460, bUp), 0.95);
        const gl = t >= at('glued') - 0.1;
        const bub = t >= mid('sticks', 0.66) && t < at('share') - 0.1;
        if (bub) { bubBoy.set(P(t, mid('sticks', 0.66), 0.35, linear)); tr(bubBoy, 300, 196); }
        if (t >= tB && t < at('share') - 0.1) { stBroken.set(P(t, tB, 0.35, linear)); tr(stBroken, CX, 482, 0.5); }
        if (t >= tF && t < at('glued') - 0.1) { stFound.set(P(t, tF, 0.35, linear)); tr(stFound, CX, 344, 0.5); }
        const bm = t >= tB && t < at('share') ? 'shock' : 'happy';
        boy.set({ t, talk: scTalk(S, t, 'boy'), mood: gl ? 'happy' : bm, look: who === 'kavya' ? -0.8 : 0.7, lift: (t < at('share') - 0.1 && t >= at('sticks')) || gl ? 1 : 0 });
        kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: gl ? 'deadpan' : t >= tB && t < at('share') ? 'annoyed' : 'neutral', look: gl ? 0 : who === 'boy' ? 0.8 : 0.9 });
        priya.set({ t, talk: 0, mood: gl ? 'deadpan' : t >= tF ? 'happy' : 'smug', look: gl ? 0 : who === 'boy' ? -0.7 : -0.9 });
      }
    }

    /* ---------- N: Madame Nexta's theatre ---------- */
    op(stageShot, sN); op(curtF, sN); op(crack, 0);
    if (sN) {
      show.nexta = 1;
      tr(nexta, 300, 420, 1.15);
      let ball = '', glowV = 0.5, hands = 0.3, mood = 'smug', look = 0.6;
      const L = NLINES.find(id => t >= k(id) && t < end(id) + 2);
      if (L === 'quarter') { hands = t < mid('quarter', 0.7) ? 1 : 0.2; ball = t >= mid('quarter', 0.78) ? '1½' : ''; glowV = ball ? 1 : 0.6; mood = ball ? 'happy' : 'smug'; }
      if (L === 'point') { hands = t < mid('point', 0.6) ? 1 : 0.2; ball = t >= mid('point', 0.72) ? '4.1' : ''; glowV = ball ? 1 : 0.6; mood = ball ? 'happy' : 'smug'; }
      if (L === 'two') { hands = 0.6; mood = 'smug'; look = 0.2; }
      if (L === 'inverse') { hands = t < mid('inverse', 0.3) ? 1 : 0.3; ball = t >= mid('inverse', 0.86) ? '320' : t >= mid('inverse', 0.35) ? '5/4' : ''; glowV = ball ? 1 : 0.6; mood = t >= mid('inverse', 0.86) ? 'happy' : 'smug'; }
      if (L === 'double') { hands = 1; ball = t >= mid('double', 0.5) ? '8' : ''; glowV = 1; mood = 'happy'; }
      if (L === 'divided') {
        ball = ''; glowV = 0.2; hands = 0; mood = t >= mid('divided', 0.2) ? 'shock' : 'neutral'; look = 0;
        const cp = P(t, at('divided') - 0.05, 0.25, linear);
        op(crack, cp); tr(crack, 300, 420 + 88 * 1.15, 1.15);
      }
      nexta.set({ t, talk: scTalk(S, t, 'nexta'), mood, look, ball, glow: glowV, hands });
    }

    op(kav, show.kav); op(priya, show.priya); op(paati, show.paati); op(boy, show.boy); op(nexta, show.nexta);
  };
});
