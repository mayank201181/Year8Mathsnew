/* Scene 3: Mr Tan orders a kopi (ratios and fractions).
   Shots (hard sitcom cuts):
   A  5 p.m.: Mr Tan (lower third) on the customer side, Kavya and Priya behind the counter, the menu: "Kopi / teh"
      -> "what fraction was bandung?" -> the working board: bandung : lime = 2 : 3 (2 pink cups, 3 green) -> Priya: 2/3
      -> the Colonel pops up: OUT OF PROPORTION -> Barry's bar: 2 + 3 = 5 boxes -> bandung 2/5, lime 3/5,
      2/5 + 3/5 = 1 -> part to part 2/3 (as many bandung as lime) vs part of whole 2/5 -> backwards: Kavya is 4/5 of
      Dad, together 324 cm (silhouettes) -> Kavya : Dad = 4 : 5, 9 parts = 324 cm, one part 36 cm -> 4 × 36 = 144 cm,
      5 × 36 = 180 cm, Dad pops up, 4/5 of 180 = 144 ✓.
   B  the reaction shot: Mr Tan's ratio joke, deadpan faces, a cricket -> Ah Boy pops up: 0/5. */
scene('fraction', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const PINK = '#FF8FC8', GOLD = '#FFE45C', RED = '#D32F2F', BLUE = '#2E6FD8', GREEN = '#1E9E5A';
  const BAND = '#F7A3C4', LIME = '#C8F08C';
  const popSet = (el, t, t0, t1, x, y) => { const p = t >= t0 && t < t1 ? P(t, t0, 0.35, linear) : 0; el.set(p); if (x !== undefined) tr(el, x, y); };
  const chipAt = (parent, text, o) => { o = o || {}; return mkChip(parent, text, { size: o.size || 30, col: o.col || C.ink }); };
  const boxes = (parent, x0, y, cols, u, h, labs) => {   // a row of equal boxes, coloured one by one
    const g = G(parent); g.cells = [];
    cols.forEach((c, j) => {
      const cg = G(g);
      E('rect', { x: x0 + j * u, y, width: u, height: h, fill: c, stroke: MK.ink, 'stroke-width': 3 }, cg);
      const lt = labs ? T(cg, x0 + j * u + u / 2, y + h / 2 + 10, labs, { size: 28, weight: 700, anchor: 'middle', fill: MK.ink }) : null;
      g.cells.push({ cg, lt });
    });
    g.grow = p => g.cells.forEach((c, j) => op(c.cg, clamp(p * g.cells.length - j)));
    g.lab = p => g.cells.forEach(c => c.lt && op(c.lt, p));
    return g;
  };
  const silhouette = (parent, x, h, col) => {   // a person of height h px standing on y = 0
    const g = G(parent); tr(g, x, 0);
    const r = h * 0.11;
    E('circle', { cx: 0, cy: -h + r, r, fill: col }, g);
    E('path', { d: `M${-h * 0.15},${-h + 2.3 * r} Q0,${-h + 2 * r} ${h * 0.15},${-h + 2.3 * r} L${h * 0.13},${-h * 0.45} L${h * 0.1},0 L${-h * 0.1},0 L${-h * 0.13},${-h * 0.45} Z`, fill: col }, g);
    return g;
  };

  /* layers */
  const Lset = G(root), Lboard = G(root), Lcast = G(root), Lfront = G(root), Ltop = G(root), Ltan = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= the stall ================= */
  const stall = rpStall(Lset);
  Lfront.appendChild(stall.front); Lfront.appendChild(stall.top);
  const sludge = rpJug(stall.top, { col: rpMix(4, 1), s: 0.4 }); tr(sludge, 1150, 532);

  /* the working board (covers the menu from "ratio" on) */
  const board = G(Lboard);
  E('rect', { x: 625, y: 192, width: 458, height: 360, rx: 14, fill: MK.board, stroke: '#8FA3B8', 'stroke-width': 5 }, board);
  E('rect', { x: 625, y: 192, width: 458, height: 14, rx: 7, fill: '#C9D3DC' }, board);
  const CX = 852;
  // bandung : lime = 2 : 3
  const hRatio = mkMath(board, CX, 260, '"bandung" : "lime" = 2 : 3', { size: 36, fill: MK.ink, anchor: 'middle' });
  const cups = G(board);
  const cupEls = [BAND, BAND, LIME, LIME, LIME].map((c, i) => { const cp = rpCup(cups, { col: c, s: 0.6 }); tr(cp, 700 + i * 76 + (i > 1 ? 20 : 0), 440); return cp; });
  // Barry's bar: 2 pink + 3 green
  const bar5 = boxes(board, 680, 300, [BAND, BAND, LIME, LIME, LIME], 70, 60);
  const br5 = mkBrace(board, 680, 368, 1030, 368, { text: '{{2 + 3 = 5}} boxes', col: MK.ink, size: 30, flip: true });
  const brB = mkBrace(board, 680, 368, 820, 368, { text: 'bandung {{2/5}}', col: '#B8336A', size: 28, flip: true });
  const brL = mkBrace(board, 820, 368, 1030, 368, { text: 'lime {{3/5}}', col: GREEN, size: 28, flip: true });
  const sum1 = mkMath(board, 820, 500, '2/5 + 3/5 = 1', { size: 36, fill: BLUE, anchor: 'middle' });
  // part to part
  const pp = G(board);
  mkText(pp, 785, 315, 'bandung', { size: 28, anchor: 'end', fill: '#B8336A', weight: 700 });
  mkText(pp, 785, 369, 'lime', { size: 28, anchor: 'end', fill: GREEN, weight: 700 });
  boxes(pp, 800, 284, [BAND, BAND], 60, 42).grow(1);
  boxes(pp, 800, 338, [LIME, LIME, LIME], 60, 42).grow(1);
  const ppBig = mkMath(pp, 1030, 348, '2/3', { size: 50, fill: '#B8336A', anchor: 'middle' });
  const ppL1 = mkText(pp, 648, 430, '**part to part**: {{2/3}}', { size: 30, fill: '#B8336A' });
  const ppL2 = mkText(pp, 648, 484, '**part of whole**: {{2/5}}', { size: 30, fill: MK.ink });
  // backwards: Kavya is 4/5 of Dad, together 324 cm
  const bw = G(board);
  mkText(bw, CX, 252, '**Backwards now**', { size: 30, anchor: 'middle', fill: '#5A6670' });
  const bw1 = mkText(bw, CX, 304, 'Kavya = {{4/5}} of Dad', { size: 32, anchor: 'middle', fill: MK.ink });
  const bw2 = mkText(bw, CX, 356, 'together: **324 cm**', { size: 32, anchor: 'middle', fill: BLUE });
  const silG = G(bw); tr(silG, 0, 512);
  const silK = silhouette(silG, 770, 144 * 0.8, '#2E7DD8'), silD = silhouette(silG, 900, 180 * 0.8, '#2E7D4F');
  mkText(bw, 740, 470, 'Kavya', { size: 26, anchor: 'end', fill: '#2E7DD8', weight: 700 });
  mkText(bw, 935, 420, 'Dad', { size: 26, anchor: 'start', fill: '#2E7D4F', weight: 700 });
  // Kavya : Dad = 4 : 5
  const kd = G(board);
  mkMath(kd, CX, 258, '"Kavya" : "Dad" = 4 : 5', { size: 36, fill: MK.ink, anchor: 'middle' });
  mkText(kd, 745, 316, 'Kavya', { size: 28, anchor: 'end', fill: '#2E7DD8', weight: 700 });
  mkText(kd, 745, 376, 'Dad', { size: 28, anchor: 'end', fill: '#2E7D4F', weight: 700 });
  const rowK = boxes(kd, 760, 284, ['#B9D7FF', '#B9D7FF', '#B9D7FF', '#B9D7FF'], 52, 46, '36');
  const rowD = boxes(kd, 760, 344, ['#B8EBC8', '#B8EBC8', '#B8EBC8', '#B8EBC8', '#B8EBC8'], 52, 46, '36');
  const kd1 = mkText(kd, 648, 446, '**9 parts** = 324 cm', { size: 32, fill: MK.ink });
  const kd2 = mkText(kd, 648, 500, '1 part = {{324 ÷ 9 = 36}} cm', { size: 32, fill: BLUE });
  const kd3 = mkText(kd, 648, 446, 'Kavya: {{4 × 36 = 144}} cm', { size: 32, fill: '#2E7DD8' });
  const kd4 = mkText(kd, 648, 500, 'Dad: {{5 × 36 = 180}} cm', { size: 32, fill: '#2E7D4F' });

  /* chips and bubbles */
  const ch = {
    five: chipAt(Lfg, '**5 p.m.**', { col: GOLD }),
    sat: chipAt(Lfg, 'still teaching. On a **Saturday**.', { col: '#CFE3FF' }),
    den: chipAt(Lfg, 'add the parts → **denominator**', { col: '#CFE3FF' }),
    asmany: chipAt(Lfg, '{{2/3}} **as many** bandung **as** lime', { col: PINK }),
    chk: chipAt(Lfg, '{{4/5}} of 180 = 144 ✓', { col: '#9FE0B5' }),
    zero: chipAt(Lfg, '{{0/5}}', { col: GOLD, size: 34 }),
  };
  const bubQ = mkSpeechBubble(Lfg, 'What **fraction** was bandung?', { size: 30, tail: 'down', tailX: -110 });
  const bubP = mkSpeechBubble(Lfg, 'Bandung = {{2/3}}!', { size: 36, tail: 'down', tailX: 50 });
  const stampOut = rpStamp(Lfg, false);
  const cricket = G(Lfg);
  const crChip = chipAt(cricket, '*cricket*', { col: '#7EE08A', size: 28 }); crChip.set(1);
  const crB = G(cricket); tr(crB, 125, 4);
  E('ellipse', { cx: 0, cy: 0, rx: 24, ry: 11, fill: '#5BBF4A', stroke: SC_INK, 'stroke-width': 3 }, crB);
  E('circle', { cx: 22, cy: -4, r: 8, fill: '#5BBF4A', stroke: SC_INK, 'stroke-width': 3 }, crB);
  E('path', { d: 'M-10,6 L-26,22 M6,8 L0,24 M-20,-4 L-40,-26 L-30,8 M24,-10 Q40,-34 54,-30', fill: 'none', stroke: SC_INK, 'stroke-width': 3, 'stroke-linecap': 'round' }, crB);

  /* ================= the cast ================= */
  const kav = cast(Lcast, 'kavya', { s: 0.92 });
  const priya = cast(Lcast, 'priya', { s: 0.92 });
  const dad = cast(Lcast, 'dad', { s: 0.92, prop: null });
  const boy = cast(Lcast, 'boy', { s: 0.92 });
  const col = cast(Ltop, 'colonel', { s: 0.6 });
  const barry = cast(Ltop, 'barry', { s: 0.42 });
  const tan = cast(Ltan, 'tan');
  const lt = { tan: rpLowerThird(Lhud, 'tan') };
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  const cB = at('joke') - 0.06;
  const BARRY = [1092, 530 - 106 * 0.42];

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const sA = on(t, -1, cB), sB = 1 - sA;
    stall.upd(t);
    for (const k in ch) ch[k].set(0);
    bubQ.set(0); bubP.set(0); stampOut.set(0); op(cricket, 0);
    lt.tan.set(0);
    const show = { kav: 1, priya: 0, dad: 0, boy: 0, col: 0, barry: 1, tan: 1 };

    // Mr Tan, customer side
    const walk = P(t, at('five') - 0.6, 1.1, easeOut);
    tr(tan, sA ? lerp(-160, 190, walk) : 170, 548, 1.0);
    let tm = 'happy', tl = 0.6;
    if (t >= at('ratio') && t < at('fifths')) { tm = 'neutral'; tl = 0.7; }
    if (t >= at('out') && t < at('boxes')) tm = 'deadpan';
    if (t >= at('parts') && t < cB) { tm = 'smug'; tl = 0.8; }
    if (sB) { tm = 'happy'; tl = 0.5; }
    tan.set({ t, talk: scTalk(S, t, 'tan'), mood: tm, look: tl, lift: t >= at('kopi') && t < at('ratio') ? 1 : 0 });
    lt.tan.set(win(t, mid('five', 0.25), mid('five', 0.25) + 3.2, 0.3));

    /* ---------- A: the stall and the board ---------- */
    op(board, sA && t >= at('ratio') - 0.1 ? P(t, at('ratio') - 0.1, 0.25, linear) : 0);
    op(stall.menu, sA && t >= at('ratio') ? 0 : 1);
    if (sA) {
      stall.menu.hl(3, P(t, mid('kopi', 0.05), 0.3, linear) * (1 - P(t, at('ratio'), 0.2, linear)));
      // Kavya and Priya behind the counter (Priya ducks when Dad pops up)
      tr(kav, 352, 440, 0.92);
      let km = 'neutral', kl = -0.7;
      if (t < at('kopi')) km = 'happy';
      else if (t >= at('priya') && t < at('boxes')) { km = t >= at('out') ? 'smug' : 'deadpan'; kl = 0.8; }
      else if (t >= at('parts') && t < at('heights')) { km = 'neutral'; kl = 0.7; }
      else if (t >= at('heights')) { km = 'happy'; kl = 0.8; }
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
      const duck = P(t, at('heights') - 0.1, 0.3, easeIn);
      if (duck < 1) {
        show.priya = 1;
        tr(priya, 520, lerp(440, 680, duck), 0.92);
        let pm = 'neutral', pl = -0.7;
        if (t >= at('priya') && t < at('out')) pm = 'smug';
        else if (t >= at('out') && t < at('fifths')) { pm = 'shock'; pl = 0.6; }
        else if (t >= at('fifths')) { pm = 'neutral'; pl = 0.7; }
        priya.set({ t, talk: scTalk(S, t, 'priya'), mood: pm, look: pl });
      }
      if (t >= at('heights') - 0.1) {
        show.dad = 1;
        const up = P(t, at('heights'), 0.4, pop);
        tr(dad, 520, lerp(680, 430, up), 0.92);
        dad.set({ t, mood: t > mid('heights', 0.6) ? 'smug' : 'happy', look: -0.6 });
      }
      // Barry on the counter, in front of the board
      tr(barry, BARRY[0], BARRY[1], 0.42);
      barry.set({ t, talk: scTalk(S, t, 'barry'), mood: t >= at('boxes') && t < at('fifths') ? 'smug' : 'neutral', look: -0.6, lit: t >= at('boxes') && t < at('fifths') ? clamp((t - mid('boxes', 0.3)) * 6, 0, 5) : 0 });
      // the Colonel pops up for "Out of proportion!"
      if (t >= at('out') - 0.25 && t < at('boxes') + 0.3) {
        show.col = 1;
        const up = P(t, at('out') - 0.25, 0.25, pop) * (1 - P(t, at('boxes'), 0.3, easeIn));
        tr(col, 870, lerp(820, 590, up), 0.85);
        col.set({ t, talk: scTalk(S, t, 'colonel'), mood: 'annoyed', look: -0.8, point: 0 });
      }

      // chips and bubbles
      popSet(ch.five, t, at('five') + 0.05, at('kopi'), 560, 230);
      popSet(ch.sat, t, mid('five', 0.62), at('kopi'), 420, 290);
      popSet(bubQ, t, mid('kopi', 0.3), at('ratio'), 420, 260);
      popSet(bubP, t, mid('priya', 0.3), at('boxes'), 470, 245);
      if (t >= mid('out', 0.3) && t < at('boxes')) op(bubP, 1 - 0.65 * P(t, mid('out', 0.3), 0.2, linear));
      stampOut.set(t >= at('out') && t < at('boxes') ? P(t, mid('out', 0.3), 0.3, linear) : 0); tr(stampOut, 470, 250, 0.5);
      popSet(ch.den, t, mid('fifths', 0.7), at('part'), 360, 270);
      popSet(ch.asmany, t, mid('part', 0.35), at('bonus'), 330, 270);
      popSet(ch.chk, t, mid('heights', 0.6), 1e9, 330, 270);

      // the board
      op(hRatio, t < at('bonus') ? 1 : 0);
      op(cups, t >= at('ratio') && t < at('boxes') ? 1 : 0);
      cupEls.forEach((c, i) => op(c, P(t, at('ratio') + 0.15 + i * 0.18, 0.2, linear)));
      const barOn = t >= at('boxes') && t < at('part');
      op(bar5, barOn ? 1 : 0); bar5.grow(P(t, at('boxes') + 0.1, 1.0, linear));
      br5.set(barOn ? P(t, mid('boxes', 0.45), 0.3, linear) * (1 - P(t, at('fifths'), 0.2, linear)) : 0);
      brB.set(barOn ? P(t, mid('fifths', 0.1), 0.3, linear) : 0);
      brL.set(barOn ? P(t, mid('fifths', 0.35), 0.3, linear) : 0);
      op(sum1, barOn ? P(t, mid('fifths', 0.6), 0.3, linear) : 0);
      op(pp, t >= at('part') && t < at('bonus') ? 1 : 0);
      op(ppBig, P(t, mid('part', 0.05), 0.3, linear)); op(ppL1, P(t, mid('part', 0.2), 0.3, linear)); op(ppL2, P(t, mid('part', 0.55), 0.3, linear));
      op(bw, t >= at('bonus') && t < at('parts') ? 1 : 0);
      op(bw1, P(t, mid('bonus', 0.2), 0.3, linear)); op(bw2, P(t, mid('bonus', 0.65), 0.3, linear));
      op(silK, P(t, mid('bonus', 0.25), 0.3, linear)); op(silD, P(t, mid('bonus', 0.3), 0.3, linear));
      op(kd, t >= at('parts') ? 1 : 0);
      rowK.grow(P(t, at('parts') + 0.3, 0.6, linear)); rowD.grow(P(t, at('parts') + 0.5, 0.7, linear));
      op(kd1, P(t, mid('parts', 0.45), 0.3, linear) * (1 - P(t, at('heights'), 0.2, linear)));
      op(kd2, P(t, mid('parts', 0.62), 0.3, linear) * (1 - P(t, at('heights'), 0.2, linear)));
      rowK.lab(P(t, at('heights') + 0.05, 0.3, linear)); rowD.lab(P(t, at('heights') + 0.05, 0.3, linear));
      op(kd3, P(t, mid('heights', 0.12), 0.3, linear)); op(kd4, P(t, mid('heights', 0.5), 0.3, linear));
    }

    /* ---------- B: the joke, the reaction shot ---------- */
    if (sB) {
      show.dad = 1; show.priya = 1;
      tr(kav, 390, 440, 0.92); tr(dad, 570, 430, 0.92); tr(priya, 750, 440, 0.92);
      const dp = t > mid('joke', 0.8);
      kav.set({ t, mood: dp ? 'deadpan' : 'neutral', look: -0.8 });
      dad.set({ t, mood: dp ? 'deadpan' : 'neutral', look: -0.8 });
      priya.set({ t, mood: dp ? 'deadpan' : 'neutral', look: -0.8 });
      tr(barry, 1085, BARRY[1], 0.42);
      barry.set({ t, mood: 'deadpan', look: -0.8, still: true });
      const cp = P(t, end('joke') + 0.1, 0.3, linear);
      op(cricket, cp); tr(cricket, 540, 232);
      if (t >= at('none') - 0.3) {
        show.boy = 1;
        const up = P(t, at('none') - 0.3, 0.3, pop);
        tr(boy, 925, lerp(680, 448, up), 0.92);
        boy.set({ t, talk: scTalk(S, t, 'boy'), mood: 'happy', look: -0.6, lift: 1 });
        popSet(ch.zero, t, mid('none', 0.4), 1e9, 925, 270);
      }
    }

    op(kav, show.kav); op(priya, show.priya); op(dad, show.dad); op(boy, show.boy); op(col, show.col); op(barry, show.barry); op(tan, show.tan);
  };
});
