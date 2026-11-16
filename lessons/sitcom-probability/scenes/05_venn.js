/* Scene 5: Venna seats everyone (two-way tables and Venn diagrams).
   Shots (hard sitcom cuts):
   A  4:30 p.m., the living room: Priya's puzzle card (class of 30: 18 badminton, 15 chess, 7 neither).
   B  Ah Boy: 18 + 15 + 7 = 40, forty people squeezing onto thirty chairs.
   C  Venna on the coffee table beside a big Venn diagram: neither 7, 30 − 7 = 23 -> 18 + 15 = 33, 33 − 23 = 10 drop
      into the overlap -> 18 − 10 = 8, 15 − 10 = 5, check 8 + 10 + 5 + 7 = 30 (SURE THING) -> P(badminton or chess) =
      (8 + 10 + 5)/30 = 23/30, the overlap counts once.
   D  Mr Tan at the whiteboard: P(badminton) + P(chess) − P(both) = 18/30 + 15/30 − 10/30 = 23/30.
   E  Mum's RC drinks survey, a two-way table: pick anyone, 34/80 = 17/40 -> pick a child, Dad's 34/80 crossed out,
      34/40 = 17/20, divide by the group you choose from -> Mum hands Dad the kettle. */
scene('venn', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);          // hard sitcom cut
  const popSet = (el, t, t0, t1, x, y) => { const p = t >= t0 && t < t1 ? P(t, t0, 0.35, linear) : 0; el.set(p); if (x !== undefined) tr(el, x, y); };
  const popG = (el, t, t0, t1, x, y, s) => {
    const p = t >= t0 && t < t1 ? P(t, t0, 0.35, pop) : 0;
    op(el, clamp(p * 3)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.75 + 0.25 * p)));
  };
  const fadeIn = (el, t, t0) => op(el, P(t, t0, 0.3, linear));
  const chipAt = (parent, text, o) => { o = o || {}; return mkChip(parent, text, { size: o.size || 30, col: o.col || C.ink, solid: o.solid, fill: o.fill }); };
  const GOLD = '#FFE45C', RED = '#FF8A8A', GREEN = '#7FE0A8', BLUE = '#8FC8FF', PINK = '#FF9CC8';
  const INK = MK.ink;
  const panel = (parent, x, y, w, h, stroke, fill) => E('rect', { x, y, width: w, height: h, rx: 18, fill: fill || 'rgba(10,27,39,0.92)', stroke: stroke || C.line, 'stroke-width': 4 }, parent);
  const feetV = s => 548 - 132 * s;   // Venna's centre y when she stands on the coffee table

  /* layers */
  const Lset = G(root), Lboard = G(root), Lcast = G(root), Lfront = G(root), Ltop = G(root), Lfg = G(root), Lhud = G(root);

  const flat = pbFlat(Lset);
  Lfront.appendChild(flat.front); Ltop.appendChild(flat.top);

  /* ================= A: the puzzle ================= */
  const puz = G(Lfg);
  panel(puz, 570, 108, 580, 196, GOLD);
  mkText(puz, 860, 160, "**Priya's class:** {{30}} pupils", { size: 34, anchor: 'middle', fill: C.ink, boldFill: GOLD });
  const puzL2 = mkText(puz, 860, 218, '**18** badminton,  **15** chess', { size: 34, anchor: 'middle', fill: C.ink, boldFill: GOLD });
  const puzL3 = mkText(puz, 860, 276, '**7** neither', { size: 34, anchor: 'middle', fill: C.ink, boldFill: GOLD });

  /* ================= B: forty people, thirty chairs ================= */
  const chairs = G(Lfg);
  panel(chairs, 520, 104, 632, 436, RED);
  const sum40 = mkMath(chairs, 836, 178, '18 + 15 + 7 = 40', { size: 50, anchor: 'middle', fill: RED });
  const CHX = n => 600 + n * 52, CHY = r => 262 + r * 82;
  let cd = '', hd = '', hh = '';
  for (let r = 0; r < 3; r++) for (let n = 0; n < 10; n++) {
    const x = CHX(n), y = CHY(r);
    cd += `M${x - 18},${y + 30} h36 M${x - 16},${y + 30} v26 M${x + 16},${y + 30} v26 M${x + 16},${y + 30} v-34 `;
    hd += `M${x - 15},${y + 8} a15,15 0 1 0 30,0 a15,15 0 1 0 -30,0 `;
    hh += `M${x - 15},${y + 6} Q${x},${y - 14} ${x + 15},${y + 6} Z `;
  }
  E('path', { d: cd, fill: 'none', stroke: '#C9935A', 'stroke-width': 5, 'stroke-linecap': 'round' }, chairs);
  E('path', { d: hd, fill: '#E0A878', stroke: SC_INK, 'stroke-width': 2 }, chairs);
  E('path', { d: hh, fill: '#2A1E18' }, chairs);
  // ten more, squeezing in between (they wobble)
  const extra = [];
  for (let i = 0; i < 10; i++) {
    const g = G(chairs), r = i % 3, x = CHX(i) + 26, y = CHY(r) - 4;
    E('circle', { cx: x, cy: y, r: 15, fill: '#C98A5E', stroke: SC_INK, 'stroke-width': 2 }, g);
    E('path', { d: `M${x - 15},${y - 2} Q${x},${y - 22} ${x + 15},${y - 2} Z`, fill: '#3A2416' }, g);
    extra.push(g);
  }
  const c30 = chipAt(chairs, '**30** chairs, **40** people?!', { col: RED, size: 30 }); tr(c30, 836, 506);

  /* ================= C: Venna's Venn diagram ================= */
  const VX = 885, VY = 300;
  const vennG = G(Lboard);
  panel(vennG, 606, 100, 558, 400, C.line);
  const venn = mkVenn(vennG, { w: 540, h: 380, labels: ['', ''], counts: { a: 8, b: 5, ab: 10, none: 7 }, cols: ['#5AA9FF', '#FF7EB6'] });
  tr(venn, VX, VY);
  T(venn, -110, -150, 'badminton', { size: 30, weight: 800, anchor: 'middle', fill: BLUE });
  T(venn, 110, -150, 'chess', { size: 30, weight: 800, anchor: 'middle', fill: PINK });
  const cOnce = chipAt(vennG, 'the overlap counts **once**', { col: GOLD, size: 28 }); tr(cOnce, VX - 30, VY + 160);
  const cSeats = chipAt(vennG, 'nobody gets **two seats**', { col: GOLD, size: 28 }); tr(cSeats, VX - 30, VY + 160);
  const stampOK = pbStamp(Lfg, true);

  /* the working panel (top left) */
  const WX = 40, WY = 108, WW = 552, WH = 248, WC = WX + WW / 2;
  const wPanel = G(Lfg); panel(wPanel, WX, WY, WW, WH, C.line);
  const wVenna = G(Lfg);
  const vXi = mkText(wVenna, WC, 180, 'ξ: the whole class, {{30}} pupils', { size: 32, anchor: 'middle', fill: C.ink });
  const cOne = chipAt(wVenna, 'everyone in exactly **one** region', { col: GOLD, size: 30 }); tr(cOne, WC, 270);
  const wFill = G(Lfg);
  const cOut = chipAt(wFill, 'fill from the **overlap** outwards', { col: GOLD, size: 30 }); tr(cOut, WC, 165);
  const f2 = mkMath(wFill, WC, 262, '30 − 7 = 23', { size: 48, anchor: 'middle', fill: C.ink });
  const f3 = mkText(wFill, WC, 322, 'play **at least one**', { size: 30, anchor: 'middle', fill: C.ink, boldFill: GOLD });
  const wBoth = G(Lfg);
  const bw = mkWorking(wBoth, WC - 40, 150, [{ m: '18 + 15 = 33' }, { m: '33 − 23 = 10', note: 'counted **twice**', noteCol: GOLD }], { size: 42, gap: 30, noteSize: 30 });
  const cBoth = chipAt(wBoth, 'they play **both**', { col: GOLD, size: 30 }); tr(cBoth, WC, 316);
  const wOnly = G(Lfg);
  const ow = mkWorking(wOnly, WX + 262, 138, [{ m: '18 − 10 = 8', note: 'badminton only', noteCol: BLUE }, { m: '15 − 10 = 5', note: 'chess only', noteCol: PINK },
    { m: '8 + 10 + 5 + 7 = 30', note: '✓', noteCol: GREEN }], { size: 36, gap: 26, noteSize: 28, noteX: 66 });
  const wOr = G(Lfg);
  const orHead = mkMath(wOr, WC, 168, 'P("badminton or chess")', { size: 38, anchor: 'middle', fill: C.ink });
  const orA = mkMath(wOr, 0, 286, '= (8 + 10 + 5)/30', { size: 42, anchor: 'start', fill: C.ink });
  const orB = mkMath(wOr, 0, 286, '= 23/30', { size: 42, anchor: 'start', fill: GREEN });
  { const x0 = WC - (orA.w + 18 + orB.w) / 2; tr(orA, x0, 0); tr(orB, x0 + orA.w + 18, 0); }

  /* ================= D: Mr Tan's whiteboard ================= */
  const BX = 850, BY = 305;
  const board = mkWhiteboard(Lboard, 620, 400); tr(board, BX, BY);
  const bHead = mkMath(Lboard, BX, 170, 'P("badminton") + P("chess") − P("both")', { size: 36, anchor: 'middle', fill: INK });
  const bwk = mkWorking(Lboard, 650, 200, [{ m: '= 18/30 + 15/30 − 10/30' }, { m: '= 23/30' }], { size: 48, fill: INK, gap: 22, ringCol: '#1E9E5A' });
  const gen = mkText(Lboard, BX, 452, 'In general: {{P("A or B") = P(A) + P(B) − P("A and B")}}', { size: 26, anchor: 'middle', fill: '#5A6670' });

  /* ================= E: Mum's drinks survey ================= */
  const TX = 640, TY = 118;
  const tabG = G(Lboard);
  panel(tabG, 612, 96, 552, 446, C.line);
  const tab = mkTwoWayTable(tabG, { rows: ['Adult', 'Child'], cols: ['Hot', 'Cold'], data: [[22, 18], [6, 34]], size: 32, colW: [150, 112, 112, 124], rowH: 68 });
  tr(tab, TX, TY);
  const ring = (r0, nr, col) => { const e = E('rect', { x: TX - 8, y: TY + r0 * 68 - 6, width: tab.W + 16, height: nr * 68 + 12, rx: 14, fill: 'none', stroke: col, 'stroke-width': 5 }, tabG); op(e, 0); return e; };
  const ringAll = ring(1, 3, GOLD), ringChild = ring(2, 1, GOLD);
  const dims = [1, 3].map(r => { const e = E('rect', { x: TX + 2, y: TY + r * 68 + 2, width: tab.W - 4, height: 64, fill: '#06121B', opacity: 0 }, tabG); return e; });
  const m34 = tab.mark(2, 2, 'rgba(255,228,92,0.4)'), m80 = tab.mark(3, 3, 'rgba(255,228,92,0.4)'), m40 = tab.mark(2, 3, 'rgba(127,224,168,0.45)');
  const a1 = mkMath(tabG, 888, 490, '34/80 = 17/40', { size: 46, anchor: 'middle', fill: GOLD });
  const a2 = mkMath(tabG, 888, 490, '34/40 = 17/20', { size: 46, anchor: 'middle', fill: GREEN });
  const c80 = chipAt(Lfg, 'RC drinks survey: **80** people', { col: GOLD, size: 30 });
  const cAny = chipAt(Lfg, 'pick **anyone**', { col: GOLD, size: 34 });
  const cChild = chipAt(Lfg, 'pick a **child**', { col: GREEN, size: 34 });
  const cGroup = chipAt(Lfg, '÷ the **group** you choose from', { col: GREEN, size: 30 });
  const cDad = chipAt(Lfg, 'same again: {{34/80}}', { col: RED, size: 30 });
  const dadX = cross(Lfg, 34, '#FF5050');
  const cHot = chipAt(Lfg, 'Dad: on **hot drinks**', { col: GOLD, size: 28 });

  /* ================= the cast ================= */
  const kav = cast(Lcast, 'kavya');
  const mum = cast(Lcast, 'mum', { prop: null, hand: true });
  const dad = cast(Lcast, 'dad', { prop: null });
  const priya = cast(Lcast, 'priya', { prop: null });
  const boy = cast(Lcast, 'boy');
  const tan = cast(Lcast, 'tan', { prop: 'marker' });
  const venna = cast(Ltop, 'venna');
  const lt = pbLowerThird(Lhud, 'venna');
  // Mum's kettle
  const ket = G(mum.hand); tr(ket, 0, -44);
  E('path', { d: 'M-30,30 L-24,-14 Q0,-26 24,-14 L30,30 Z', fill: '#E8EEF3', stroke: SC_INK, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, ket);
  E('path', { d: 'M26,0 Q46,-6 52,-24', fill: 'none', stroke: SC_INK, 'stroke-width': 6, 'stroke-linecap': 'round' }, ket);
  E('path', { d: 'M-18,-20 Q0,-50 18,-20', fill: 'none', stroke: SC_INK, 'stroke-width': 5 }, ket);
  E('rect', { x: -30, y: 14, width: 60, height: 10, fill: '#E8424F' }, ket);

  /* cut points */
  const k = id => at(id) - 0.06;
  const cB = k('boy'), cC = k('venna'), cD = k('formula'), cE = k('survey');

  return t => {
    const sA = on(t, -1, cB), sB = on(t, cB, cC), sC = on(t, cC, cD), sD = on(t, cD, cE), sE = on(t, cE, 1e9);
    const show = { kav: 0, mum: 0, dad: 0, priya: 0, boy: 0, tan: 0, venna: 0 };
    // reset
    [puz, chairs, vennG, wPanel, wVenna, wFill, wBoth, wOnly, wOr, board, bwk, bHead, gen, tabG, dadX].forEach(e => op(e, 0));
    [c80, cAny, cChild, cGroup, cDad, cHot].forEach(c => c.set(0));
    stampOK.set(0); lt.set(0);

    flat.upd(t, 1);
    flat.clock(4, 30 + Math.min(20, t * 0.2));
    flat.flash(0);

    /* ---------- A: the puzzle ---------- */
    if (sA) {
      show.priya = 1; show.kav = 1; show.boy = 1;
      tr(priya, 290, 420, 1.0); tr(boy, 610, 452, 0.95); tr(kav, 1010, 428, 0.95);
      priya.set({ t, talk: scTalk(S, t, 'priya'), mood: 'smug', look: 0.6, lift: t < mid('puzzle', 0.5) ? 1 : 0 });
      boy.set({ t, mood: 'happy', look: -0.8 });
      kav.set({ t, mood: 'neutral', look: -0.9 });
      popG(puz, t, at('puzzle') + 0.1, 1e9, 0, 0);
      tr(puz, 860, 206, 1); puz.setAttribute('transform', `translate(860 206) scale(${Math.max(0.01, 0.8 + 0.2 * P(t, at('puzzle') + 0.1, 0.35, pop)).toFixed(3)}) translate(-860 -206)`);
      op(puzL2, P(t, mid('puzzle', 0.4), 0.25, linear)); op(puzL3, P(t, mid('puzzle', 0.75), 0.25, linear));
    }

    /* ---------- B: Ah Boy's forty ---------- */
    if (sB) {
      show.boy = 1;
      tr(boy, 250, 468, 1.15);
      const done = t >= end('boy') - 0.2;
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: done ? 'happy' : 'happy', look: done ? 0 : 0.8, lift: t < mid('boy', 0.4) ? 1 : 0 });
      const cp = P(t, at('boy') + 0.05, 0.35, pop);
      op(chairs, clamp(cp * 3));
      op(sum40, P(t, at('boy') + 0.1, 0.3, linear));
      const sq = P(t, mid('boy', 0.55), 0.4, linear);
      extra.forEach((g, i) => { op(g, sq); tr(g, Math.sin(t * 9 + i * 1.7) * 5 * AMP, -Math.abs(Math.sin(t * 7 + i)) * 6 * AMP); });
      c30.set(P(t, mid('boy', 0.62), 0.35, linear));
    }

    /* ---------- C: Venna ---------- */
    if (sC) {
      show.venna = 1; show.kav = 1; show.priya = 1;
      tr(kav, 130, 486, 0.88); tr(priya, 305, 488, 0.86);
      op(vennG, P(t, at('venna') + 0.2, 0.3, linear)); op(wPanel, 1);
      const walk = P(t, at('venna') - 0.06, 0.9, easeOut), vs = 0.7;
      tr(venna, lerp(760, 470, walk), feetV(vs) - (walk < 1 ? Math.abs(Math.sin(t * 12)) * 8 * AMP : 0), vs);
      lt.set(win(t, at('venna') + 0.1, at('venna') + 3.2, 0.3));
      const who = scWho(S, t);
      venna.set({ t, talk: scTalk(S, t, 'venna'), mood: t >= at('or') && t < mid('or', 0.75) ? 'neutral' : 'neutral', look: who === 'kavya' ? -0.9 : 0.6,
        lit: t >= mid('both', 0.6) && t < at('or') ? P(t, mid('both', 0.6), 0.3, linear) : 0 });
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: t >= mid('only', 0.85) ? 'smug' : 'neutral', look: who === 'kavya' ? 0.9 : 1 });
      priya.set({ t, mood: t < at('fill') ? 'neutral' : t >= at('only') ? 'happy' : 'neutral', look: who === 'kavya' ? -0.8 : 1 });
      // counts appear in the order they are found
      const cnt = venn.counts;
      op(cnt.none, P(t, mid('fill', 0.5), 0.25, linear));
      const drop = P(t, mid('both', 0.6), 0.5, easeOut);
      op(cnt.ab, t >= mid('both', 0.6) ? 1 : 0); tr(cnt.ab, 0, -200 * (1 - drop));
      op(cnt.a, P(t, mid('only', 0.15), 0.25, linear)); op(cnt.b, P(t, mid('only', 0.36), 0.25, linear));
      // highlights
      venn.hl('AB', t >= at('fill') && t < mid('fill', 0.45) ? 0.7 * (0.6 + 0.4 * Math.sin(t * 6)) : t >= mid('both', 0.6) && t < at('only') ? 0.8 : 0);
      venn.hl('none', t >= mid('fill', 0.5) && t < at('both') ? 0.6 : 0);
      venn.hl('AorB', t >= mid('fill', 0.6) && t < at('both') ? 0.35 : t >= at('or') ? P(t, mid('or', 0.05), 0.3, linear) * 0.8 : 0);
      venn.hl('Aonly', t >= mid('only', 0.15) && t < mid('only', 0.36) ? 0.7 : 0);
      venn.hl('Bonly', t >= mid('only', 0.36) && t < mid('only', 0.58) ? 0.7 : 0);
      cOnce.set(t >= at('or') ? P(t, mid('or', 0.55), 0.3, linear) * (1 - P(t, mid('or', 0.76), 0.2, linear)) : 0);
      cSeats.set(t >= mid('or', 0.76) ? P(t, mid('or', 0.76), 0.3, linear) : 0);
      // the working
      if (t < at('fill')) {
        op(wVenna, 1); fadeIn(vXi, t, mid('venna', 0.3)); cOne.set(P(t, mid('venna', 0.55), 0.35, linear));
      } else if (t < at('both')) {
        op(wFill, 1); cOut.set(P(t, at('fill') + 0.1, 0.35, linear)); fadeIn(f2, t, mid('fill', 0.5)); fadeIn(f3, t, mid('fill', 0.72));
      } else if (t < at('only')) {
        op(wBoth, 1); bw.show(0, P(t, mid('both', 0.06), 0.35)); bw.show(1, P(t, mid('both', 0.36), 0.35)); cBoth.set(P(t, mid('both', 0.78), 0.35, linear));
      } else if (t < at('or')) {
        op(wOnly, 1); ow.show(0, P(t, mid('only', 0.12), 0.35)); ow.show(1, P(t, mid('only', 0.34), 0.35)); ow.show(2, P(t, mid('only', 0.6), 0.35));
        ow.ring(2, P(t, mid('only', 0.8), 0.25, linear));
        stampOK.set(P(t, mid('only', 0.85), 0.35, linear)); tr(stampOK, VX - 10, VY + 160, 0.42);
      } else {
        op(wOr, 1); fadeIn(orHead, t, mid('or', 0.04)); fadeIn(orA, t, mid('or', 0.22)); fadeIn(orB, t, mid('or', 0.42));
      }
    }

    /* ---------- D: Mr Tan's formula ---------- */
    if (sD) {
      show.tan = 1; show.kav = 1;
      tr(tan, 220, 420, 1.0); tr(kav, 420, 446, 0.9);
      tan.set({ t, talk: scTalk(S, t, 'tan'), mood: t >= end('formula') - 0.2 ? 'smug' : 'happy', look: 0.6, lift: t < mid('formula', 0.7) ? 1 : 0 });
      kav.set({ t, mood: 'neutral', look: 0.9 });
      op(board, 1); op(bwk, 1);
      op(bHead, P(t, at('formula') + 0.15, 0.3, linear)); bwk.show(0, P(t, mid('formula', 0.42), 0.35)); bwk.show(1, P(t, mid('formula', 0.78), 0.35));
      bwk.ring(1, P(t, mid('formula', 0.86), 0.25, linear));
      op(gen, P(t, mid('formula', 0.9), 0.3, linear));
    }

    /* ---------- E: the two-way table ---------- */
    if (sE) {
      show.priya = 1; show.dad = 1; show.mum = 1; show.kav = 1;
      tr(priya, 100, 486, 0.8); tr(dad, 248, 482, 0.78); tr(mum, 396, 480, 0.8); tr(kav, 535, 488, 0.8);
      const who = scWho(S, t);
      const lookTo = { priya: 100, dad: 248, mum: 396, kavya: 535 }, X = { priya: 100, dad: 248, mum: 396, kav: 535 };
      const lk = me => { const tx = lookTo[who]; if (tx === undefined || Math.abs(tx - X[me]) < 1) return 0.9; return tx > X[me] ? 0.9 : -0.9; };
      const crossed = t >= mid('a2', 0.1), hot = t >= at('hot');
      priya.set({ t, talk: scTalk(S, t, 'priya'), mood: t >= mid('a1', 0.6) && t < at('q2') ? 'smug' : 'neutral', look: lk('priya') });
      dad.set({ t, talk: scTalk(S, t, 'dad'), mood: hot ? 'deadpan' : crossed ? 'sad' : t >= at('dad') ? 'smug' : 'neutral', look: hot ? 0 : lk('dad') });
      mum.set({ t, talk: scTalk(S, t, 'mum'), mood: hot ? 'smug' : 'neutral', look: hot ? -0.9 : lk('mum'), lift: hot ? P(t, at('hot') + 0.1, 0.3) : 0 });
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: t >= mid('a2', 0.5) ? 'smug' : 'neutral', look: lk('kav') });
      op(ket, hot ? 1 : 0);
      const tp = P(t, at('survey') + 0.1, 0.3, linear);
      op(tabG, tp);
      // the table fills as Mum reads it
      const cells = tab.cells, cf = (r, c, f) => op(cells[r][c], t >= at('q1') ? 1 : P(t, mid('survey', f), 0.25, linear));
      [0, 1, 2, 3].forEach(c => cf(0, c, 0.22));
      cf(1, 0, 0.35); cf(1, 1, 0.42); cf(1, 2, 0.52);
      cf(2, 0, 0.6); cf(2, 1, 0.66); cf(2, 2, 0.78);
      cf(1, 3, 0.9); cf(2, 3, 0.9); [0, 1, 2, 3].forEach(c => cf(3, c, 0.9));
      popSet(c80, t, mid('survey', 0.05), at('q1'), 300, 170);
      // pick anyone
      op(ringAll, t >= at('q1') && t < at('q2') ? P(t, mid('q1', 0.3), 0.25, linear) : 0);
      popSet(cAny, t, at('q1') + 0.05, at('q2'), 300, 170);
      m34.set(t >= at('a1') ? P(t, mid('a1', 0.12), 0.25, linear) : 0);
      m80.set(t >= at('a1') && t < at('q2') ? P(t, mid('a1', 0.3), 0.25, linear) : 0);
      op(a1, t >= at('a1') && t < at('q2') ? P(t, mid('a1', 0.4), 0.3, linear) : 0);
      // pick a child
      dims.forEach(d => op(d, t >= at('q2') ? 0.62 * P(t, mid('q2', 0.3), 0.3, linear) : 0));
      op(ringChild, t >= at('q2') ? P(t, mid('q2', 0.3), 0.25, linear) : 0);
      popSet(cChild, t, at('q2') + 0.05, mid('a2', 0.72), 300, 170);
      popSet(cDad, t, mid('dad', 0.25), at('hot'), 248, 280);
      if (crossed && t < at('hot')) { op(dadX, P(t, mid('a2', 0.1), 0.2, linear)); tr(dadX, 248, 280); }
      m40.set(t >= at('a2') ? P(t, mid('a2', 0.18), 0.25, linear) : 0);
      op(a2, t >= at('a2') ? P(t, mid('a2', 0.36), 0.3, linear) : 0);
      popSet(cGroup, t, mid('a2', 0.72), 1e9, 300, 170);
      popSet(cHot, t, at('hot') + 0.1, 1e9, 248, 280);
    }

    op(kav, show.kav); op(mum, show.mum); op(dad, show.dad); op(priya, show.priya); op(boy, show.boy); op(tan, show.tan); op(venna, show.venna);
  };
});
