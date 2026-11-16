/* Scene 1: The lucky dip (the probability scale).
   Shots (hard sitcom cuts):
   A  10 a.m., the living room: Ah Boy, Mum, Dad behind the coffee table; GAME 1: LUCKY DIP, red wins -> the two bags
      (A: 3 red, 5 blue; B: 5 red, 9 blue) -> Ah Boy: Bag B has more red (the reds ringed) -> Dad: "I have a
      feeling" (lightning, everyone to camera).
   B  the whiteboard: Cubert on the table, Kavya: P(event) = favourable / total, Wanted over All -> P(red from A) =
      3/8 = 0.375, P(red from B) = 5/14 ≈ 0.357, Bag A glows, SURE THING.
   C  the probability scale 0 (impossible) .. 1/2 (even chance) .. 1 (certain): roll a 7 at 0, under 7 at 1,
      even (2, 4, 6) at 3/6 = 1/2.
   D  Priya: P(red) = 3 : 8 -> crossed out: 3/8, 0.375, 37.5% (never a ratio).
   E  Dad's TOTO ticket: WIN | LOSE, 1/2 1/2 -> NO CHANCE -> not equally likely: 13,983,816 ways, 1 in 14 million,
      WIN shrinks to a hair -> "So there's still a chance." (lightning). */
scene('dip', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);          // hard sitcom cut
  const popSet = (el, t, t0, t1, x, y) => { const p = t >= t0 && t < t1 ? P(t, t0, 0.35, linear) : 0; el.set(p); if (x !== undefined) tr(el, x, y); };
  const popG = (el, t, t0, t1, x, y, s) => {   // pop a plain group in (scale overshoot) between t0 and t1
    const p = t >= t0 && t < t1 ? P(t, t0, 0.35, pop) : 0;
    op(el, clamp(p * 3)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.7 + 0.3 * p)));
  };
  const chipAt = (parent, text, o) => { o = o || {}; return mkChip(parent, text, { size: o.size || 30, col: o.col || C.ink, solid: o.solid }); };
  const GOLD = '#FFE45C', RED = '#FF8A8A', GREEN = '#7FE0A8', BLUE = '#8FC8FF';
  const panel = (parent, w, h, stroke, fill) => { const g = G(parent); E('rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: 18, fill: fill || 'rgba(10,27,39,0.9)', stroke: stroke || C.line, 'stroke-width': 4 }, g); return g; };
  const feet = s => 550 - 138 * s;   // Cubert's centre y when he stands on the coffee table

  /* layers: set, the board on the wall, characters behind the table, the table, props on it, foreground, HUD */
  const Lset = G(root), Lboard = G(root), Lcast = G(root), Lfront = G(root), Ltop = G(root), Lfg = G(root), Lhud = G(root);
  void Lhud;

  /* ================= the living room ================= */
  const flat = pbFlat(Lset);
  Lfront.appendChild(flat.front); Ltop.appendChild(flat.top);
  const bagGlow = E('ellipse', { cx: 0, cy: -60, rx: 120, ry: 110, fill: glow('#FFE45C'), opacity: 0 }, Ltop);
  const bagA = pbBag(Ltop, { red: 3, blue: 5, label: 'A' });
  const bagB = pbBag(Ltop, { red: 5, blue: 9, label: 'B' });

  /* ---------- A: the game ---------- */
  const c10 = chipAt(Lfg, '**10 a.m.**', { col: GOLD });
  const cGame = chipAt(Lfg, '**GAME 1: LUCKY DIP**', { col: GOLD, size: 34 });
  const cRed = chipAt(Lfg, '**red** wins', { col: RED });
  const cA = mkChip(Lfg, '**A:** 3 red, 5 blue', { size: 28, col: C.ink });
  const cB = mkChip(Lfg, '**B:** 5 red, 9 blue', { size: 28, col: C.ink });
  const cMore = mkChip(Lfg, '{{5 "red" > 3 "red"}}', { size: 32, col: RED });
  const cFeel = chipAt(Lfg, '"I have a feeling."', { col: RED });
  const bolt1 = pbBolt(Lfg, 1.1);

  /* ---------- B: the whiteboard ---------- */
  const BX = 855, BY = 268, board = mkWhiteboard(Lboard, 590, 320); tr(board, BX, BY);
  const bFrac = G(Lboard);
  mkMath(bFrac, BX, BY - 18, 'P("event") = "favourable outcomes"/"total outcomes"', { size: 40, anchor: 'middle', fill: MK.ink });
  const cWanted = mkChip(Lboard, '**Wanted** over **All**', { size: 32, col: '#B8860B', solid: true, ink: MK.ink });
  const work = mkWorking(Lboard, BX + 42, BY - 140, ['P("red from A") = 3/8 = 0.375', 'P("red from B") = 5/14 ~= 0.357'], { size: 42, fill: MK.ink, gap: 24, ringCol: '#1E9E5A' });
  const cCmp = mkChip(Lboard, '{{0.375 > 0.357}}', { size: 30, col: '#1E9E5A', fill: '#FFFFFF' });
  const cAwin = mkChip(Lfg, '**Bag A** wins. Just.', { size: 28, col: GREEN });
  const stampOK = pbStamp(Lfg, true);

  /* ---------- C: the probability scale ---------- */
  const SX = 200, SL = 800, SY = 228, sx = v => SX + v * SL;
  const scale = G(Lfg);
  E('rect', { x: 90, y: 108, width: 1020, height: 254, rx: 22, fill: 'rgba(10,27,39,0.92)', stroke: C.line, 'stroke-width': 4 }, scale);
  E('rect', { x: SX, y: SY - 9, width: SL / 2, height: 18, fill: linGrad('#FF6070', '#FFC247', false) }, scale);
  E('rect', { x: SX + SL / 2, y: SY - 9, width: SL / 2, height: 18, fill: linGrad('#FFC247', '#56D69B', false) }, scale);
  const sLine = mkDash(E('path', { d: `M${SX},${SY} H${SX + SL}`, stroke: C.ink, 'stroke-width': 5, 'stroke-linecap': 'round' }, scale));
  const sLab = [[0, '0', 'impossible', '#FF8A8A'], [0.5, '1/2', 'even chance', GOLD], [1, '1', 'certain', GREEN]].map(([v, m, w, col]) => {
    const g = G(scale);
    E('line', { x1: sx(v), y1: SY - 18, x2: sx(v), y2: SY + 18, stroke: C.ink, 'stroke-width': 5, 'stroke-linecap': 'round' }, g);
    mkMath(g, sx(v), SY + 58, m, { size: 34, anchor: 'middle', fill: C.ink });
    T(g, sx(v), SY + 116, w, { size: 30, weight: 800, anchor: 'middle', fill: col });
    return g;
  });
  const sMarks = [[0, 'roll a **7**', '#FF8A8A'], [1, 'roll **under 7**', GREEN], [0.5, 'even: {{3/6 = 1/2}}', GOLD]].map(([v, txt, col]) => {
    const g = G(scale), dot = G(g); tr(dot, sx(v), SY);
    E('circle', { r: 14, fill: col, stroke: '#2A1A22', 'stroke-width': 3 }, dot);
    const c = mkChip(g, txt, { size: 30, col }); tr(c, sx(v), SY - 66);
    E('path', { d: `M${sx(v)},${SY - 36} L${sx(v)},${SY - 18}`, stroke: col, 'stroke-width': 4 }, g);
    g.chip = c; return g;
  });
  const diceCard = panel(Lfg, 460, 150, GOLD);
  const dRow = [];
  for (let i = 0; i < 6; i++) { const d = mkDice(diceCard, i + 1, { size: 52 }); tr(d, -165 + i * 66, -28); const hl = E('rect', { x: -165 + i * 66 - 33, y: -61, width: 66, height: 66, rx: 12, fill: 'none', stroke: GOLD, 'stroke-width': 5 }, diceCard); dRow.push([d, hl]); }
  mkText(diceCard, 0, 48, 'the **event** "even": {{2, 4, 6}}', { size: 28, anchor: 'middle', fill: C.ink, boldFill: GOLD });

  /* ---------- D: never a ratio ---------- */
  const ratioCard = panel(Lfg, 400, 92, '#FF8A8A');
  mkMath(ratioCard, 0, 18, 'P("red") = 3 : 8', { size: 50, anchor: 'middle', fill: '#FF8A8A' });
  const ratioX = cross(Lfg, 46, '#FF5050');
  const cNever = chipAt(Lfg, 'never a **ratio**', { col: '#FF8A8A', size: 32 });
  const forms = [['3/8', 'fraction'], ['0.375', 'decimal'], ['37.5%', 'percentage']].map(([m, w]) => {
    const g = G(Lfg);
    E('rect', { x: -78, y: -62, width: 156, height: 124, rx: 16, fill: '#F2FFF7', stroke: '#1E9E5A', 'stroke-width': 4 }, g);
    const mm = mkMath(g, 0, 0, m, { size: 40, anchor: 'middle', fill: '#14532D' });
    tr(mm, 0, m === '3/8' ? -4 : 6);
    T(g, 0, 50, w, { size: 26, weight: 700, anchor: 'middle', fill: '#1E9E5A' });
    return g;
  });

  /* ---------- E: the TOTO ticket ---------- */
  const toto = pbToto(Lfg);
  const BW = 400, BXL = 590, BYB = 180;      // the WIN | LOSE bar
  const bar = G(Lfg);
  E('rect', { x: BXL - 16, y: BYB - 70, width: BW + 32, height: 196, rx: 18, fill: 'rgba(10,27,39,0.9)', stroke: C.line, 'stroke-width': 4 }, bar);
  const winR = E('rect', { x: BXL, y: BYB - 32, width: BW / 2, height: 64, fill: '#2FA36B', stroke: '#14532D', 'stroke-width': 3 }, bar);
  const loseR = E('rect', { x: BXL + BW / 2, y: BYB - 32, width: BW / 2, height: 64, fill: '#E8424F', stroke: '#8E1B26', 'stroke-width': 3 }, bar);
  const winT = T(bar, 0, 0, 'WIN', { size: 30, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  const loseT = T(bar, 0, 0, 'LOSE', { size: 30, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  const halves = G(bar);
  mkMath(halves, BXL + BW / 4, BYB + 76, '1/2', { size: 34, anchor: 'middle', fill: C.ink });
  mkMath(halves, BXL + BW * 3 / 4, BYB + 76, '1/2', { size: 34, anchor: 'middle', fill: C.ink });
  const cFifty = mkChip(bar, '"fifty-fifty!"', { size: 26, col: '#FF8A8A' }); tr(cFifty, BXL + BW / 2, BYB + 74);
  const cNotEq = mkChip(bar, '**not** equally likely', { size: 28, col: GOLD }); tr(cNotEq, BXL + BW / 2, BYB + 74);
  const stampNo = pbStamp(Lfg, false);
  const odds = panel(Lfg, 330, 196, GOLD);
  const oddsA = G(odds);
  T(oddsA, 0, -50, 'choose 6 of 1 to 49:', { size: 26, weight: 700, anchor: 'middle', fill: C.muted, font: FB });
  mkMath(oddsA, 0, 10, '13,983,816', { size: 46, anchor: 'middle', fill: C.ink });
  T(oddsA, 0, 54, 'possible tickets', { size: 26, weight: 700, anchor: 'middle', fill: C.muted, font: FB });
  const oddsB = G(odds);
  T(oddsB, 0, -30, 'about', { size: 28, weight: 700, anchor: 'middle', fill: C.muted, font: FB });
  T(oddsB, 0, 26, '1 in 14 million', { size: 44, weight: 800, anchor: 'middle', fill: GOLD });
  T(oddsB, 0, 70, 'to win', { size: 26, weight: 700, anchor: 'middle', fill: C.muted, font: FB });
  const bolt2 = pbBolt(Lfg, 1.1);

  /* ================= the cast ================= */
  const kav = cast(Lcast, 'kavya');
  const mum = cast(Lcast, 'mum');
  const dad = cast(Lcast, 'dad', { prop: null, hand: true });
  const priya = cast(Lcast, 'priya');
  const boy = cast(Lcast, 'boy');
  const cube = cast(Ltop, 'cube');
  // Dad's own TOTO ticket, in his hand
  const mini = G(dad.hand); tr(mini, 0, -38, 1, -8);
  E('rect', { x: -40, y: -22, width: 80, height: 44, rx: 4, fill: '#FFFDF6', stroke: '#7D8A96', 'stroke-width': 2.5 }, mini);
  E('rect', { x: -40, y: -22, width: 80, height: 13, rx: 4, fill: '#1E7A46' }, mini);
  E('path', { d: 'M-28,4 h10 M-10,4 h10 M8,4 h10 M-28,14 h10 M-10,14 h10 M8,14 h10', stroke: '#C62828', 'stroke-width': 3 }, mini);

  /* cut points */
  const k = id => at(id) - 0.06;
  const cutB = k('frac'), cutC = k('scale'), cutD = k('priya'), cutE = k('toto');
  const flashAt = (t, t0) => Math.max(P(t, t0, 0.08, linear) * (1 - P(t, t0 + 0.12, 0.5, linear)), P(t, t0 + 0.35, 0.05, linear) * (1 - P(t, t0 + 0.42, 0.3, linear)));
  const thunder1 = mid('dad', 0.62), thunder2 = end('still') + 0.15;

  return t => {
    const sA = on(t, -1, cutB), sB = on(t, cutB, cutC), sC = on(t, cutC, cutD), sD = on(t, cutD, cutE), sE = on(t, cutE, 1e9);
    const show = { kav: 0, mum: 0, dad: 0, priya: 0, boy: 0, cube: 0 };
    // reset
    [scale, diceCard, ratioCard, ratioX, toto, bar, odds, bolt1, bolt2, bFrac, bagGlow].forEach(e => op(e, 0));
    forms.forEach(f => op(f, 0));
    [c10, cGame, cRed, cA, cB, cMore, cFeel, cWanted, cCmp, cAwin, cNever].forEach(c => c.set(0));
    stampOK.set(0); stampNo.set(0); work.set(0); work.ring(0, 0);
    bagA.hl(0); bagB.hl(0);

    flat.upd(t, 1);
    flat.clock(10, Math.min(40, t * 0.5));
    flat.flash(sA ? flashAt(t, thunder1) : sE ? flashAt(t, thunder2) : 0);
    op(board, sB); op(Lboard, sB);
    op(bagA, sA || sB); op(bagB, sA || sB);

    /* ---------- A: Lucky Dip ---------- */
    if (sA) {
      show.boy = 1; show.mum = 1; show.dad = 1;
      const toCam = t >= thunder1 ? 1 : 0;
      tr(boy, 220, 440, 1.0); tr(mum, 600, 410, 1.02); tr(dad, 985, 414, 1.0);
      mum.set({ t, talk: scTalk(S, t, 'mum'), mood: toCam ? 'deadpan' : t < at('boy') ? 'smug' : 'neutral', look: toCam ? 0 : t < at('boy') ? 0 : t < at('dad') ? -0.7 : 0.8 });
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: toCam ? 'deadpan' : 'happy', look: toCam ? 0 : t < at('boy') ? 0.8 : t < at('dad') ? 1 : 1, lift: t >= at('boy') - 0.1 && t < at('dad') ? 1 : 0 });
      dad.set({ t, talk: scTalk(S, t, 'dad'), mood: t >= at('boy') ? 'smug' : 'happy', look: t < at('dad') ? -0.6 : -0.3, lift: 0 });
      // bags pop onto the table
      const bp = i => P(t, mid('bags', i ? 0.45 : 0.05), 0.4, pop);
      const pa = bp(0), pb = bp(1);
      op(bagA, clamp(pa * 3)); tr(bagA, 410, 556, Math.max(0.01, 0.7 * pa));
      op(bagB, clamp(pb * 3)); tr(bagB, 790, 556, Math.max(0.01, 0.7 * pb));
      popSet(c10, t, at('lucky') + 0.05, cutB, 300, 160);
      popSet(cGame, t, mid('lucky', 0.08), cutB, 610, 215);
      popSet(cRed, t, mid('lucky', 0.8), at('dad'), 990, 215);
      popSet(cA, t, mid('bags', 0.15), cutB, 410, 630);
      popSet(cB, t, mid('bags', 0.55), cutB, 790, 630);
      if (t >= mid('boy', 0.3)) bagB.hl(P(t, mid('boy', 0.3), 0.3, linear) * (0.75 + 0.25 * Math.sin(t * 8)));
      popSet(cMore, t, mid('boy', 0.45), cutB, 790, 342);
      popSet(cFeel, t, mid('dad', 0.25), cutB, 990, 215);
      if (t >= thunder1) { op(bolt1, 1 - P(t, thunder1 + 0.7, 0.3, linear)); tr(bolt1, 1125, 300, 1.1 + 0.15 * Math.sin(t * 30) * AMP, 12); }
    }

    /* ---------- B: Wanted over All ---------- */
    if (sB) {
      show.kav = 1; show.cube = 1;
      tr(kav, 410, 420, 1.0);
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: t < at('calc') ? 'neutral' : t > end('calc') - 0.4 ? 'smug' : 'neutral', look: t < at('calc') ? -0.9 : 0.8 });
      tr(cube, 160, feet(0.78), 0.78);
      cube.set({ t, talk: scTalk(S, t, 'cube'), mood: t < at('calc') ? 'smug' : 'happy', look: t < at('calc') ? 0.9 : 0.9, arms: t < at('calc') ? 0.6 * P(t, mid('frac', 0.55), 0.4) : 0 });
      tr(bagA, 700, 556, 0.45); tr(bagB, 965, 556, 0.45);
      const inCalc = t >= at('calc') - 0.1;
      op(bFrac, inCalc ? 1 - P(t, at('calc') - 0.1, 0.25, linear) : P(t, mid('frac', 0.1), 0.3, linear));
      popSet(cWanted, t, mid('frac', 0.6), at('calc'), BX, BY + 92);
      if (inCalc) {
        work.show(0, P(t, mid('calc', 0.05), 0.4));
        work.show(1, P(t, mid('calc', 0.42), 0.4));
        work.ring(0, P(t, mid('calc', 0.74), 0.25, linear));
        popSet(cCmp, t, mid('calc', 0.74), 1e9, BX + 150, BY + 104);
        const g = P(t, mid('calc', 0.74), 0.4, linear);
        op(bagGlow, g * (0.75 + 0.25 * Math.sin(t * 5))); tr(bagGlow, 700, 556);
        bagA.hl(g);
        popSet(cAwin, t, mid('calc', 0.8), 1e9, 700, 630);
        stampOK.set(P(t, mid('calc', 0.86), 0.35, linear)); tr(stampOK, BX - 140, BY + 104, 0.42);
      }
    }

    /* ---------- C: the scale ---------- */
    if (sC) {
      show.cube = 1; show.boy = 1;
      tr(cube, 220, feet(0.75), 0.75);
      cube.set({ t, talk: scTalk(S, t, 'cube'), mood: 'smug', look: 0.6, arms: t < at('roll') ? 0.5 : 0 });
      tr(boy, 1000, 470, 1.0);
      boy.set({ t, mood: t >= mid('roll', 0.1) && t < mid('roll', 0.3) ? 'shock' : 'happy', look: -0.8 });
      const sp = P(t, at('scale') + 0.02, 0.3, pop);
      op(scale, clamp(sp * 3)); scale.setAttribute('transform', `translate(600 235) scale(${Math.max(0.01, 0.92 + 0.08 * sp).toFixed(4)}) translate(-600 -235)`);
      mkDraw(sLine, P(t, at('scale') + 0.15, 0.6, easeOut));
      op(sLab[0], P(t, mid('scale', 0.3), 0.25, linear));
      op(sLab[2], P(t, mid('scale', 0.62), 0.25, linear));
      op(sLab[1], P(t, mid('scale', 0.85), 0.25, linear));
      [0.04, 0.3, 0.55].forEach((f, i) => {
        const p = t >= at('roll') ? P(t, mid('roll', f), 0.35, linear) : 0;
        op(sMarks[i], p > 0 ? 1 : 0); sMarks[i].chip.set(p); op(sMarks[i].firstChild, p);
        tr(sMarks[i].firstChild, sx([0, 1, 0.5][i]), SY - 40 * (1 - easeOut(p)));
      });
      const dp = t >= at('roll') ? P(t, mid('roll', 0.5), 0.35, pop) : 0;
      op(diceCard, clamp(dp * 3)); tr(diceCard, 610, 455, Math.max(0.01, 0.8 + 0.2 * dp));
      dRow.forEach(([d, hl], i) => { const ev = (i + 1) % 2 === 0; d.set(i + 1, Math.sin(t * 2 + i) * 5 * AMP); op(hl, ev ? P(t, mid('roll', 0.66), 0.25, linear) : 0); op(d, ev ? 1 : 1 - 0.5 * P(t, mid('roll', 0.66), 0.25, linear)); });
    }

    /* ---------- D: never a ratio ---------- */
    if (sD) {
      show.priya = 1; show.cube = 1; show.kav = 1;
      tr(priya, 250, 418, 1.0); tr(kav, 960, 418, 1.0);
      const crossed = t >= mid('ratio', 0.1);
      priya.set({ t, talk: scTalk(S, t, 'priya'), mood: crossed ? 'annoyed' : 'smug', look: crossed ? 0.6 : 0.2 });
      kav.set({ t, mood: t < at('ratio') ? 'deadpan' : 'happy', look: t < at('ratio') ? -1 : -0.5 });
      tr(cube, 615, feet(0.8), 0.8);
      cube.set({ t, talk: scTalk(S, t, 'cube'), mood: t < at('ratio') ? 'shock' : t < mid('ratio', 0.4) ? 'annoyed' : 'smug', look: t < at('ratio') ? -0.9 : -0.6, arms: t >= at('ratio') && t < mid('ratio', 0.4) ? 0.7 : 0 });
      popG(ratioCard, t, mid('priya', 0.2), 1e9, 430, 150);
      if (crossed) { op(ratioX, P(t, mid('ratio', 0.1), 0.2, linear)); tr(ratioX, 430, 150, 1.4); }
      popSet(cNever, t, mid('ratio', 0.14), 1e9, 935, 168);
      [0.5, 0.66, 0.82].forEach((f, i) => popG(forms[i], t, mid('ratio', f), 1e9, [430, 600, 770][i], 272));
    }

    /* ---------- E: the TOTO ticket ---------- */
    if (sE) {
      show.dad = 1; show.kav = 1; show.cube = 1;
      tr(dad, 960, 414, 1.0); tr(kav, 240, 418, 1.0);
      const still = t >= at('still') - 0.1;
      dad.set({ t, talk: scTalk(S, t, 'dad'), mood: still ? 'happy' : t >= at('nochance') + 0.3 && t < at('still') ? 'shock' : 'smug', look: t < at('nochance') ? -0.3 : -0.7, lift: t < at('nochance') ? P(t, at('toto'), 0.3) : still ? P(t, at('still'), 0.3) : 0 });
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: still ? 'deadpan' : t < at('equal') ? 'deadpan' : 'neutral', look: still ? 0 : 0.8 });
      tr(cube, 600, feet(0.8), 0.8);
      const ncA = at('nochance');
      cube.set({ t, talk: scTalk(S, t, 'cube'), mood: t < ncA ? 'shock' : t < at('equal') ? 'annoyed' : still ? 'deadpan' : 'smug', look: t < at('equal') ? 0.8 : -0.6, arms: t >= ncA && t < at('equal') ? 0.8 : 0 });
      // the ticket, then the odds card in its place
      const tk = P(t, mid('toto', 0.05), 0.35, pop), eqP = P(t, mid('equal', 0.45), 0.3, linear);
      op(toto, clamp(tk * 3) * (1 - eqP)); tr(toto, 330, 200, Math.max(0.01, 0.9 + 0.1 * tk));
      if (t >= mid('equal', 0.45)) {
        const op1 = P(t, mid('equal', 0.45), 0.3, pop);
        op(odds, clamp(op1 * 3)); tr(odds, 330, 205, Math.max(0.01, 0.85 + 0.15 * op1));
        const sw = P(t, mid('equal', 0.74), 0.3, linear);
        op(oddsA, 1 - sw); op(oddsB, sw); tr(oddsB, 0, 0, Math.max(0.01, 0.8 + 0.2 * P(t, mid('equal', 0.74), 0.35, pop)));
      }
      // the WIN | LOSE bar
      const bp = P(t, mid('toto', 0.55), 0.35, pop);
      op(bar, clamp(bp * 3));
      const shrink = P(t, mid('equal', 0.2), 1.6, ease);
      const ww = lerp(BW / 2, 3, shrink);
      attr(winR, 'width', ww); attr(loseR, 'x', BXL + ww); attr(loseR, 'width', BW - ww);
      winT.setAttribute('x', lerp(BXL + BW / 4, BXL + 30, shrink).toFixed(1)); winT.setAttribute('y', lerp(BYB + 11, BYB - 44, shrink).toFixed(1));
      attr(winT, 'fill', shrink > 0.5 ? '#7FE0A8' : '#FFFFFF');
      loseT.setAttribute('x', (BXL + ww + (BW - ww) / 2).toFixed(1)); loseT.setAttribute('y', (BYB + 11).toFixed(1));
      op(halves, P(t, mid('toto', 0.7), 0.25, linear) * (1 - P(t, at('equal'), 0.25, linear)));
      cFifty.set(0);
      cNotEq.set(t >= at('equal') ? P(t, mid('equal', 0.12), 0.35, linear) : 0);
      stampNo.set(t >= ncA && t < at('equal') + 0.4 ? P(t, ncA + 0.15, 0.35, linear) * (1 - P(t, at('equal') + 0.1, 0.3, linear)) : 0);
      tr(stampNo, BXL + BW / 2, BYB + 62, 0.62);
      if (t >= thunder2) { op(bolt2, 1 - P(t, thunder2 + 0.7, 0.3, linear)); tr(bolt2, 1125, 300, 1.1 + 0.15 * Math.sin(t * 30) * AMP, 12); }
    }

    op(kav, show.kav); op(mum, show.mum); op(dad, show.dad); op(priya, show.priya); op(boy, show.boy); op(cube, show.cube);
  };
});
