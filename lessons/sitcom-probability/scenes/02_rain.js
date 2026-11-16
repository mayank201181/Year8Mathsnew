/* Scene 2: Spinella (unequal sectors; complements; mutually exclusive events).
   Shots (hard sitcom cuts):
   A  the living room: Mr Tan with a pineapple tart, GAME 2: SPIN, blue wins a tart -> Spinella twirls onto the table
      (lower third), red, blue, green -> Priya: three colours, so P(blue) = 1/3.
   B  the big spinner: red 150°, blue 90°, green 120°, cut into twelve 30° slices -> blue's 3 slices light:
      P(blue) = 3/12 = 1/4 = 90/360; Priya's 1/3 crossed out.
   C  Dad at the window: P(no rain) = 30% -> the bar of length 1: rain 0.7 | no rain 0.3, complements:
      P(no rain) = 1 − P(rain) = 1 − 0.7 = 0.3; P(not A) = 1 − P(A); "Wrong picnic" (lightning).
   D  Spinella's cousin, the table 0.25, 0.4, ?, 0.15 -> mutually exclusive, the bar builds with a gap ->
      green = 1 − (0.25 + 0.4 + 0.15) = 1 − 0.8 = 0.2, SURE THING -> P(red or blue) = 0.25 + 0.4 = 0.65, add.
   E  Mr Tan's T-shirt "NOT = 1 −"; deadpan faces; *drip*. */
scene('rain', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const popSet = (el, t, t0, t1, x, y) => { const p = t >= t0 && t < t1 ? P(t, t0, 0.35, linear) : 0; el.set(p); if (x !== undefined) tr(el, x, y); };
  const popG = (el, t, t0, t1, x, y, s) => {
    const p = t >= t0 && t < t1 ? P(t, t0, 0.35, pop) : 0;
    op(el, clamp(p * 3)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.7 + 0.3 * p)));
  };
  const chipAt = (parent, text, o) => { o = o || {}; return mkChip(parent, text, { size: o.size || 30, col: o.col || C.ink, solid: o.solid, ink: o.ink }); };
  const panel = (parent, w, h, stroke, fill) => { const g = G(parent); E('rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: 18, fill: fill || 'rgba(10,27,39,0.92)', stroke: stroke || C.line, 'stroke-width': 4 }, g); return g; };
  const GOLD = '#FFE45C', RED = '#FF8A8A', GREEN = '#7FE0A8', BLUE = '#8FC8FF';
  const SPIN_Y = s => 548 - 140 * s;   // Spinella's centre y when she stands on the coffee table
  const wedge = (parent, r, a0, a1, attrs) => E('path', Object.assign({ d: 'M0,0 L' + mkArcD(0, 0, r, a0, a1).slice(1) + ' Z' }, attrs), parent);

  const Lset = G(root), Lcast = G(root), Lfront = G(root), Ltop = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= the living room ================= */
  const flat = pbFlat(Lset);
  Lfront.appendChild(flat.front); Ltop.appendChild(flat.top);

  /* ---------- A ---------- */
  const cGame = chipAt(Lfg, '**GAME 2: SPIN**', { col: GOLD, size: 34 });
  const cTart = chipAt(Lfg, '**blue** wins a tart', { col: BLUE });
  const tags = [['red', '#E8424F', -105, -150], ['blue', '#3B82F6', 0, -150], ['green', '#2FA36B', 108, -150]].map(([w, col, dx, dy]) => {
    const c = mkChip(Lfg, `**${w}**`, { size: 28, col, solid: true, ink: '#FFFFFF', stroke: '#2A1A22' }); c.dx = dx; c.dy = dy; return c;
  });
  const cThree = chipAt(Lfg, '**3** colours', { col: RED });
  const cThird = mkChip(Lfg, '{{P("blue") = 1/3}}', { size: 36, col: RED });

  /* ---------- B: the big spinner ---------- */
  const R = 168, SPX = 300, SPY = 330;
  const big = G(Lfg);
  const bigSp = mkSpinner(big, PB_SPIN.map(s => ({ label: '', col: s.col, w: s.deg })), { r: R }); bigSp.set(120);
  const blueHl = [5, 6, 7].map(k => wedge(big, R, -90 + 30 * k, -60 + 30 * k, { fill: '#9CCBFF', 'fill-opacity': 0.75, stroke: GOLD, 'stroke-width': 6, 'stroke-linejoin': 'round' }));
  const cuts = [];
  for (let k = 0; k < 12; k++) {
    const a = (-90 + 30 * k) * Math.PI / 180;
    cuts.push(E('line', { x1: 0, y1: 0, x2: (Math.cos(a) * R).toFixed(1), y2: (Math.sin(a) * R).toFixed(1), stroke: '#FFFFFF', 'stroke-width': 4, 'stroke-dasharray': '10 7' }, big));
  }
  E('circle', { r: 16, fill: '#C9D3DC', stroke: MK.ink, 'stroke-width': 3 }, big);
  const degL = [[-15, '150°'], [105, '90°'], [210, '120°']].map(([a, s]) => {
    const r = a === 105 ? R * 0.6 : R * 0.58, x = Math.cos(a * Math.PI / 180) * r, y = Math.sin(a * Math.PI / 180) * r;
    const g = G(big); E('rect', { x: x - 46, y: y - 24, width: 92, height: 46, rx: 12, fill: 'rgba(10,27,39,0.8)' }, g);
    mkMath(g, x, y + 13, s, { size: 34, anchor: 'middle', fill: '#FFFFFF' });
    return g;
  });
  const c30 = mkChip(Lfg, '{{12}} slices of {{30°}}', { size: 30, col: GOLD });
  const workB = mkWorking(Lfg, 790, 128, ['P("blue") = 3/12 = 1/4', '= 90/360 = 1/4'], { size: 42, gap: 24 });
  const panelB = panel(Lfg, 560, 210, BLUE);
  Lfg.insertBefore(panelB, workB);
  const cPriyaX = mkChip(Lfg, '{{P("blue") = 1/3}}', { size: 30, col: RED });
  const xPriya = cross(Lfg, 26, '#FF5050');

  /* ---------- C: complements ---------- */
  const cDry = mkChip(Lfg, '{{P("no rain") = 30%}}', { size: 36, col: GOLD });
  const BL = 160, BW = 880, BT = 172, BH = 54;
  const barC = G(Lfg);
  E('rect', { x: BL - 16, y: BT - 60, width: BW + 32, height: BH + 76, rx: 16, fill: 'rgba(10,27,39,0.9)', stroke: C.line, 'stroke-width': 3 }, barC);
  const compT = mkText(barC, 600, BT - 18, 'rain and no rain: **complements**, together {{1}}', { size: 28, anchor: 'middle', fill: C.ink, boldFill: GOLD });
  const segRain = G(barC), segDry = G(barC);
  E('rect', { x: BL, y: BT, width: BW * 0.7, height: BH, fill: '#3B82F6', stroke: '#1B3F7A', 'stroke-width': 3 }, segRain);
  mkText(segRain, BL + BW * 0.35, BT + 38, 'rain  {{0.7}}', { size: 30, anchor: 'middle', fill: '#FFFFFF' });
  E('rect', { x: BL + BW * 0.7, y: BT, width: BW * 0.3, height: BH, fill: '#FFC93C', stroke: '#8A6400', 'stroke-width': 3 }, segDry);
  mkText(segDry, BL + BW * 0.85, BT + 38, 'no rain  {{0.3}}', { size: 30, anchor: 'middle', fill: MK.ink });
  const panelC = panel(Lfg, 540, 200, GOLD);
  const workC = mkWorking(Lfg, 600, 282, ['P("no rain") = 1 - P("rain")', '= 1 - 0.7 = 0.3'], { size: 40, gap: 26 });
  const cNot = mkChip(Lfg, '{{P("not A") = 1 - P(A)}}', { size: 30, col: GOLD });
  const cWrong = chipAt(Lfg, 'right maths, **wrong picnic**', { col: RED, size: 28 });
  const bolt = pbBolt(Lfg, 1.1);

  /* ---------- D: the cousin, the table, the bar of length 1 ---------- */
  const cousin = G(Ltop);
  E('path', { d: 'M-8,70 L-14,96 L14,96 L8,70 Z', fill: '#8F9CAB', stroke: SC_INK, 'stroke-width': 3 }, cousin);
  E('rect', { x: -46, y: 94, width: 92, height: 14, rx: 7, fill: '#5A6670', stroke: SC_INK, 'stroke-width': 3 }, cousin);
  const cSp = mkSpinner(cousin, [{ label: '', col: '#E8424F', w: 25 }, { label: '', col: '#3B82F6', w: 40 }, { label: '', col: '#2FA36B', w: 20 }, { label: '', col: '#FFC93C', w: 15 }], { r: 70 });
  const tabD = mkTable(Lfg, [['Colour', 'Red', 'Blue', 'Green', 'Yellow'], ['Probability', '{{0.25}}', '{{0.4}}', '', '{{0.15}}']], { size: 30, rowH: 58, colW: [200, 116, 116, 116, 116], side: true, fill: 'rgba(10,27,39,0.92)' });
  const TX = 600 - tabD.W / 2, TY = 112;
  tr(tabD, TX, TY);
  const gc = tabD.cell(1, 3);
  const qMark = mkMath(tabD, gc.x + gc.w / 2, gc.y + gc.h / 2 + 12, '?', { size: 36, anchor: 'middle', fill: GOLD });
  const q02 = mkMath(tabD, gc.x + gc.w / 2, gc.y + gc.h / 2 + 12, '0.2', { size: 32, anchor: 'middle', fill: GREEN });
  const gMark = tabD.mark(1, 3, 'rgba(47,163,107,0.45)');
  const DL = 300, DW = 600, DT = 258, DH = 50;
  const barD = G(Lfg);
  const segs = [[0, 0.25, '#E8424F', '0.25', '#FFFFFF'], [0.25, 0.4, '#3B82F6', '0.4', '#FFFFFF'], [0.65, 0.2, '#2FA36B', '0.2', '#FFFFFF'], [0.85, 0.15, '#FFC93C', '0.15', MK.ink]].map(([x0, w, col, lab, ink]) => {
    const g = G(barD);
    const r = E('rect', { x: DL + x0 * DW, y: DT, width: w * DW, height: DH, fill: col, stroke: '#1A2430', 'stroke-width': 3 }, g);
    mkMath(g, DL + (x0 + w / 2) * DW, DT + 35, lab, { size: 28, anchor: 'middle', fill: ink });
    g.r = r; return g;
  });
  const gap = E('rect', { x: DL + 0.65 * DW, y: DT, width: 0.2 * DW, height: DH, fill: 'rgba(255,255,255,0.08)', stroke: '#FFFFFF', 'stroke-width': 3, 'stroke-dasharray': '8 6' }, barD);
  const gapQ = mkMath(barD, DL + 0.75 * DW, DT + 36, '?', { size: 32, anchor: 'middle', fill: GOLD });
  const rbGlow = E('rect', { x: DL - 6, y: DT - 6, width: 0.65 * DW + 12, height: DH + 12, rx: 8, fill: 'none', stroke: GOLD, 'stroke-width': 6 }, barD);
  const cME = mkChip(Lfg, 'one colour per spin: **mutually exclusive**\nand they cover everything: total {{1}}', { size: 28, col: GOLD });
  const panelD = panel(Lfg, 590, 230, GREEN);
  const workG = mkWorking(Lfg, 528, 342, ['"green" = 1 - (0.25 + 0.4 + 0.15)', '= 1 - 0.8', '= 0.2'], { size: 36, gap: 20 });
  const workO = mkWorking(Lfg, 610, 372, ['P("red or blue") = 0.25 + 0.4', '= 0.65'], { size: 40, gap: 26 });
  const stampOK = pbStamp(Lfg, true);
  const cAdd = chipAt(Lfg, "can't happen together {{=>}} **add**", { col: GOLD, size: 30 });

  /* ---------- E: the T-shirt ---------- */
  const shirt = G(Lfg);
  E('path', { d: 'M-60,-110 Q0,-86 60,-110 L128,-74 L102,-20 L78,-34 L78,110 L-78,110 L-78,-34 L-102,-20 L-128,-74 Z', fill: '#FFFFFF', stroke: '#2A1A22', 'stroke-width': 5, 'stroke-linejoin': 'round' }, shirt);
  E('path', { d: 'M-30,-100 Q0,-74 30,-100', fill: 'none', stroke: '#2A1A22', 'stroke-width': 4 }, shirt);
  T(shirt, 0, -6, 'NOT', { size: 54, weight: 800, anchor: 'middle', fill: '#C62828' });
  mkMath(shirt, 0, 64, '= 1 -', { size: 54, anchor: 'middle', fill: MK.ink });
  const cDrip = mkChip(Lfg, '*drip*', { size: 28, col: BLUE });

  /* ================= the cast ================= */
  const kav = cast(Lcast, 'kavya');
  const mum = cast(Lcast, 'mum', { prop: null });
  const dad = cast(Lcast, 'dad', { prop: null, hand: true });
  const priya = cast(Lcast, 'priya', { prop: null });
  const tan = cast(Lcast, 'tan', { prop: null, hand: true });
  const spin = cast(Ltop, 'spin');
  const ltSpin = pbLowerThird(Lhud, 'spin');
  // Mr Tan's pineapple tart on a plate
  const tart = G(tan.hand); tr(tart, 0, -30);
  E('ellipse', { cx: 0, cy: 8, rx: 52, ry: 14, fill: '#FFFFFF', stroke: '#8FA3B8', 'stroke-width': 3 }, tart);
  E('ellipse', { cx: 0, cy: -4, rx: 30, ry: 15, fill: '#E0A040', stroke: '#8A5A20', 'stroke-width': 3 }, tart);
  E('ellipse', { cx: 0, cy: -8, rx: 18, ry: 8, fill: '#FFC93C' }, tart);
  E('path', { d: 'M-12,-12 l24,8 M-12,-4 l24,-8', stroke: '#B8860B', 'stroke-width': 2.5 }, tart);

  /* cut points */
  const k = id => at(id) - 0.06;
  const cutB = k('angles'), cutC = k('dad'), cutD = k('table'), cutE = k('mnem');
  const flashAt = (t, t0) => Math.max(P(t, t0, 0.08, linear) * (1 - P(t, t0 + 0.12, 0.5, linear)), P(t, t0 + 0.35, 0.05, linear) * (1 - P(t, t0 + 0.42, 0.3, linear)));
  const thunder = mid('comp', 0.86);

  return t => {
    const sA = on(t, -1, cutB), sB = on(t, cutB, cutC), sC = on(t, cutC, cutD), sD = on(t, cutD, cutE), sE = on(t, cutE, 1e9);
    const show = { kav: 0, mum: 0, dad: 0, priya: 0, tan: 0, spin: 0 };
    [big, panelB, workB, xPriya, barC, panelC, workC, bolt, cousin, tabD, barD, panelD, workG, workO, shirt].forEach(e => op(e, 0));
    [cGame, cTart, cThree, cThird, c30, cPriyaX, cDry, cNot, cWrong, cME, cAdd, cDrip].concat(tags).forEach(c => c.set(0));
    stampOK.set(0); ltSpin.set(0); op(tan.hand, sE ? 0 : 1);

    flat.upd(t, sC && t < at('comp') ? 1.6 : 1);
    flat.clock(10, Math.min(59, 42 + t * 0.2));
    flat.flash(sC ? flashAt(t, thunder) : 0);

    /* ---------- A ---------- */
    if (sA) {
      show.tan = 1; show.priya = 1; show.kav = 1;
      tr(tan, 215, 410, 1.0); tr(priya, 480, 418, 1.0); tr(kav, 1060, 418, 1.0);
      const sIn = at('spin') - 0.3;
      tan.set({ t, talk: scTalk(S, t, 'tan'), mood: t < at('priya') ? 'happy' : 'neutral', look: t < sIn ? 0.4 : 0.9, lift: t < at('priya') ? 1 : 0 });
      priya.set({ t, talk: scTalk(S, t, 'priya'), mood: t < sIn ? 'happy' : t < at('priya') ? 'shock' : 'smug', look: t < sIn ? -0.6 : t < at('priya') ? 0.8 : 0 });
      kav.set({ t, mood: t < sIn ? 'happy' : t < at('priya') ? 'shock' : 'deadpan', look: t < sIn ? -0.8 : t < at('priya') ? -0.5 : -0.9 });
      popSet(cGame, t, mid('game', 0.05), at('priya'), 480, 205);
      popSet(cTart, t, mid('game', 0.65), at('priya'), 840, 205);
      if (t >= sIn) {
        show.spin = 1;
        const p = P(t, sIn, 0.6, easeOut);
        tr(spin, lerp(1250, 790, p), SPIN_Y(0.9) - Math.sin(p * Math.PI) * 60, 0.9, (1 - p) * -360);
        spin.set({ t, talk: scTalk(S, t, 'spin'), mood: t < at('priya') ? 'smug' : 'annoyed', look: t < at('priya') ? -0.3 : -0.9, arrow: 20 + 900 * easeOut(clamp((t - sIn) / 2.2)) });
        ltSpin.set(win(t, at('spin') + 0.1, at('spin') + 3.2, 0.3));
        tags.forEach((c, i) => popSet(c, t, mid('spin', 0.45 + i * 0.12), cutB, 790 + c.dx, SPIN_Y(0.9) + c.dy));
      }
      popSet(cThree, t, mid('priya', 0.1), cutB, 215, 205);
      popSet(cThird, t, mid('priya', 0.45), cutB, 480, 222);
    }

    /* ---------- B: slicing the spinner ---------- */
    if (sB) {
      show.spin = 1; show.kav = 1;
      const bp = P(t, cutB + 0.05, 0.35, pop);
      op(big, clamp(bp * 3)); tr(big, SPX, SPY, Math.max(0.01, 0.9 + 0.1 * bp));
      degL.forEach((g, i) => op(g, P(t, mid('angles', 0.22 + i * 0.13), 0.25, linear)));
      cuts.forEach((c, i) => op(c, P(t, mid('angles', 0.62 + i * 0.028), 0.12, linear)));
      blueHl.forEach((h, i) => op(h, t >= at('slices') ? P(t, mid('slices', 0.14 + i * 0.07), 0.2, linear) * (0.75 + 0.25 * Math.sin(t * 6)) : 0));
      popSet(c30, t, mid('angles', 0.8), 1e9, SPX, 545);
      tr(spin, 640, SPIN_Y(0.8), 0.8);
      spin.set({ t, talk: scTalk(S, t, 'spin'), mood: t < at('slices') ? 'smug' : 'happy', look: t < at('slices') ? -0.9 : 0.8, arrow: 20 });
      tr(kav, 980, 418, 1.0);
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: t < at('slices') ? 'neutral' : 'smug', look: t < at('slices') ? -0.9 : -0.6 });
      if (t >= at('slices')) {
        const pp = P(t, mid('slices', 0.3), 0.3, pop);
        op(panelB, clamp(pp * 3)); tr(panelB, 860, 212);
        op(workB, 1); workB.show(0, P(t, mid('slices', 0.3), 0.4)); workB.show(1, P(t, mid('slices', 0.76), 0.4));
        popSet(cPriyaX, t, mid('slices', 0.55), 1e9, 760, 628);
        op(xPriya, P(t, mid('slices', 0.6), 0.2, linear)); tr(xPriya, 760, 628, 1.3);
      }
    }

    /* ---------- C: complements ---------- */
    if (sC) {
      show.dad = 1; show.kav = 1;
      const sorry = t >= thunder;
      tr(dad, 1000, 414, 1.0); tr(kav, 200, 418, 1.0);
      dad.set({ t, talk: scTalk(S, t, 'dad'), mood: sorry ? 'sad' : t < at('comp') ? 'smug' : 'neutral', look: t < at('comp') ? -1 : -0.8, lift: t < at('comp') ? P(t, at('dad'), 0.3) : 0 });
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: t < at('comp') ? 'deadpan' : sorry ? 'smug' : 'neutral', look: 0.9 });
      popSet(cDry, t, mid('dad', 0.5), at('comp'), 620, 230);
      if (t >= at('comp')) {
        op(barC, P(t, at('comp'), 0.2, linear));
        op(segRain, P(t, mid('comp', 0.06), 0.25, linear)); op(segDry, P(t, mid('comp', 0.14), 0.25, linear));
        op(compT, P(t, mid('comp', 0.14), 0.25, linear));
        const pp = P(t, mid('comp', 0.28), 0.3, pop);
        op(panelC, clamp(pp * 3)); tr(panelC, 600, 362);
        op(workC, 1); workC.show(0, P(t, mid('comp', 0.28), 0.4)); workC.show(1, P(t, mid('comp', 0.5), 0.4));
        workC.ring(1, P(t, mid('comp', 0.66), 0.25, linear));
        popSet(cNot, t, mid('comp', 0.68), 1e9, 600, 628);
        popSet(cWrong, t, mid('comp', 0.84), 1e9, 990, 272);
        if (sorry) { op(bolt, 1 - P(t, thunder + 0.7, 0.3, linear)); tr(bolt, 470, 300, 1.1 + 0.15 * Math.sin(t * 30) * AMP, -12); }
      }
    }

    /* ---------- D: the table ---------- */
    if (sD) {
      show.mum = 1; show.kav = 1;
      tr(mum, 175, 410, 1.0); tr(kav, 1025, 418, 1.0);
      const inG = t >= at('green') - 0.06;
      mum.set({ t, talk: scTalk(S, t, 'mum'), mood: t >= mid('green', 0.85) && t < at('or') ? 'smug' : 'neutral', look: t < at('me') ? 0.8 : t < at('or') ? 0.6 : 1 });
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: t < at('or') ? 'neutral' : 'happy', look: t < at('me') ? -0.6 : t < at('or') ? -1 : -0.6 });
      if (!inG) {
        show.spin = 1;
        tr(spin, 760, SPIN_Y(0.75), 0.75);
        spin.set({ t, talk: scTalk(S, t, 'spin'), mood: 'smug', look: -0.9, arrow: 340 });
        op(cousin, P(t, at('table') + 0.1, 0.3, linear)); tr(cousin, 470, 440, 1.0); cSp.set(30 + Math.sin(t * 1.3) * 8 * AMP);
      }
      op(tabD, P(t, mid('table', 0.15), 0.3, linear));
      const filled = t >= mid('green', 0.85);
      op(qMark, filled ? 0 : 1); op(q02, filled ? 1 : 0); gMark.set(t >= at('table') ? (filled ? 1 : 0.6 * P(t, mid('table', 0.8), 0.3, linear) * (0.6 + 0.4 * Math.sin(t * 6))) : 0);
      // the bar of length 1
      if (t >= at('me')) {
        op(barD, 1);
        op(segs[0], P(t, mid('me', 0.35), 0.25, linear)); op(segs[1], P(t, mid('me', 0.45), 0.25, linear)); op(segs[3], P(t, mid('me', 0.55), 0.25, linear));
        const fg = P(t, mid('green', 0.85), 0.3, linear);
        op(segs[2], fg); op(gap, P(t, mid('me', 0.62), 0.25, linear) * (1 - fg)); op(gapQ, P(t, mid('me', 0.62), 0.25, linear) * (1 - fg));
        op(rbGlow, t >= at('or') ? P(t, mid('or', 0.08), 0.3, linear) * (0.7 + 0.3 * Math.sin(t * 6)) : 0);
        popSet(cME, t, mid('me', 0.08), at('or'), 600, 628);
      }
      if (inG) {
        const pp = P(t, at('green') - 0.06, 0.3, pop);
        op(panelD, clamp(pp * 3)); tr(panelD, 600, 432);
        if (t < at('or')) {
          op(workG, 1); [0.08, 0.5, 0.78].forEach((f, i) => workG.show(i, P(t, mid('green', f), 0.35)));
          workG.ring(2, P(t, mid('green', 0.85), 0.25, linear));
          stampOK.set(P(t, mid('green', 0.9), 0.35, linear)); tr(stampOK, 755, 495, 0.42);
        } else {
          op(workO, 1); workO.show(0, P(t, mid('or', 0.12), 0.35)); workO.show(1, P(t, mid('or', 0.4), 0.35));
          workO.ring(1, P(t, mid('or', 0.45), 0.25, linear));
          popSet(cAdd, t, mid('or', 0.6), 1e9, 600, 628);
        }
      }
    }

    /* ---------- E: NOT means 1 minus ---------- */
    if (sE) {
      show.tan = 1; show.kav = 1; show.priya = 1;
      const dead = t >= end('mnem') - 0.3;
      tr(tan, 715, 410, 1.0); tr(kav, 200, 418, 1.0); tr(priya, 1020, 418, 1.0);
      tan.set({ t, talk: scTalk(S, t, 'tan'), mood: dead ? 'smug' : 'happy', look: dead ? 0 : -0.5, lift: 1 });
      const push = P(t, end('mnem') - 0.3, 1.8, linear);
      kav.set({ t, mood: t < mid('mnem', 0.4) ? 'neutral' : 'deadpan', look: t < mid('mnem', 0.4) ? 0.8 : 0 });
      priya.set({ t, mood: t < mid('mnem', 0.4) ? 'neutral' : 'deadpan', look: t < mid('mnem', 0.4) ? -0.8 : 0 });
      const sp = P(t, at('mnem') + 0.1, 0.35, pop);
      op(shirt, clamp(sp * 3)); tr(shirt, 500, 300 + 4 * Math.sin(t * 3) * AMP, Math.max(0.01, 0.85 + 0.15 * sp), -4);
      popSet(cDrip, t, end('mnem') + 0.1, 1e9, 1100, 585);
      Lcast.setAttribute('transform', `translate(600 420) scale(${(1 + 0.04 * push).toFixed(4)}) translate(-600 -420)`);
    } else Lcast.removeAttribute('transform');

    op(kav, show.kav); op(mum, show.mum); op(dad, show.dad); op(priya, show.priya); op(tan, show.tan); op(spin, show.spin);
  };
});
