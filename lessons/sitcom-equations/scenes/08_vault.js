/* Scene 8: The Vault (simultaneous equations: stretch).
   Shots (hard sitcom cuts):
   W  the vault room: the round vault door with a dial plate (x ?, y ?), five minutes left, the wheel turns.
   V  Madame Y beside Ex on the table (lower third): 2 unknowns -> 2 clues.
   W  Kavya: clue 1 x + y = 7, clue 2 x − y = 1 -> Ah Boy: a table of pairs for x + y = 7: (3, 4), (2, 5), (10, −3) ...
   V  Madame Y: both true at the same time: simultaneous equations.
   T  Mum's bubble-tea board: 2 teas + a waffle = $11, a tea + a waffle = $7; subtract: a tea = $4 (2t + w = 11,
      t + w = 7, t = 4).
   W  Kavya: add the clues, +y and −y cancel: 2x = 8, x = 4 -> Priya: 4 + y = 7, y = 3, check 4 − 3 = 1, BALANCED.
   J  Judge Even: elimination: Same Signs Subtract (the tea), opposite signs add (the clues).
   W  the graph: x + y = 7 and x − y = 1 cross at (4, 3).
   V  Ex and Madame Y unmasked together: 4 and 3; the dials spin to 4 and 3.
   W  "Go, go, go!": the vault door swings open, light floods in, the clock freezes at 00:07. */
scene('vault', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;
  const talk = (t, who) => scTalk(S, t, who);

  /* ---------- local helpers ---------- */
  const view = (el, k, fx, fy) => el.setAttribute('transform', `translate(600 375) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const fade = (el, t, t0, d) => { const p = P(t, t0, d || 0.3, linear); op(el, p); return p; };
  const pulse = (t, t0) => (t < t0 - 0.18 ? 0 : t < t0 ? P(t, t0 - 0.18, 0.18, easeIn) : 1 - P(t, t0 + 0.35, 0.35, ease));
  const GOLD = '#FFE45C', RED = '#D32F2F', GREEN = '#1E9E5A', INK = MK.ink, PURP = '#6A3CD8', BLUE = '#2E6FD8', ORANGE = '#E8751A', PINK = '#FF8FC8';
  const CX = 782, CY = 305;

  /* ---------- layers ---------- */
  const Lworld = G(root), Lfg = G(root), Lhud = G(root);
  const room = eqRoom(Lworld, 'vault');
  const boardL = G(room); room.insertBefore(boardL, room.mid);
  // behind the vault door: a bright opening (seen when the door swings open)
  const back = room.decor.parentNode;
  const hole = G(back); back.insertBefore(hole, room.decor);
  E('circle', { cx: 330, cy: 300, r: 205, fill: '#FFF6C8' }, hole);
  E('circle', { cx: 330, cy: 300, r: 205, fill: glow('#FFFFFF'), opacity: 0.9 }, hole);
  // the dial plate on the vault door: x ? and y ?
  const plate = G(room.decor);
  E('rect', { x: 206, y: 128, width: 248, height: 88, rx: 14, fill: '#1A1F26', stroke: '#E2B33C', 'stroke-width': 4 }, plate);
  const dial = (lx, dx, letter) => {
    const lab = T(plate, lx, 186, letter, { size: 38, weight: 700, anchor: 'middle', fill: GOLD, font: "'Times New Roman', Georgia, serif" });
    lab.setAttribute('font-style', 'italic');
    const d = G(plate); tr(d, dx, 172);
    E('circle', { r: 34, fill: '#2A3038', stroke: '#9AA6B2', 'stroke-width': 4 }, d);
    const ticks = G(d);
    let tk = ''; for (let i = 0; i < 10; i++) { const a = i / 10 * TAU; tk += `M${(Math.cos(a) * 26).toFixed(1)},${(Math.sin(a) * 26).toFixed(1)} L${(Math.cos(a) * 32).toFixed(1)},${(Math.sin(a) * 32).toFixed(1)} `; }
    E('path', { d: tk, stroke: '#9AA6B2', 'stroke-width': 3 }, ticks);
    const v = T(d, 0, 12, '?', { size: 34, weight: 800, anchor: 'middle', fill: '#FFC247' });
    return { ticks, v, last: '?' };
  };
  const dX = dial(236, 292, 'x'), dY = dial(352, 408, 'y');
  const setDial = (D, s, ang) => { if (s !== D.last) { setText(D.v, s); D.last = s; } tr(D.ticks, 0, 0, 1, ang); };
  const flood = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#FFF3B0', opacity: 0 }, Lhud);
  const chRoom = mkChip(Lfg, '**THE VAULT** · 5:00', { size: 32, col: GOLD });
  const ch5min = mkChip(Lfg, '**5 minutes** left', { size: 30, col: '#FF8A8A' });

  /* ---------- W board: the clues and the pairs ---------- */
  const bClue = G(boardL);
  const c1 = eqCard(bClue, 440, 400, { title: 'TWO CLUES' }); tr(c1, CX, CY);
  const wkC = mkWorking(bClue, CX + 30, 188, ['x + y = 7', 'x − y = 1'], { size: 42, gap: 16, fill: INK });
  const lab1 = T(bClue, CX - 196, wkC.lineY[0], 'clue 1', { size: 26, weight: 700, fill: PURP });
  const lab2 = T(bClue, CX - 196, wkC.lineY[1], 'clue 2', { size: 26, weight: 700, fill: PURP });
  const tbl = mkTable(bClue, [['{{x}}', '{{y}}'], ['3', '4'], ['2', '5'], ['10', '{{−3}}'], ['…', '…']], { colW: 90, rowH: 38, size: 28, ink: INK, fill: 'rgba(46,111,216,0.06)', headFill: 'rgba(106,60,216,0.16)' });
  tr(tbl, CX - 180, 302);
  const tblNote = mkText(bClue, CX + 120, 360, 'for\n{{x + y = 7}}', { size: 28, anchor: 'middle', fill: BLUE });
  const tblMany = mkText(bClue, CX + 120, 462, '**lots** of pairs!', { size: 28, anchor: 'middle', fill: RED, boldFill: RED });

  /* ---------- W board: add the clues ---------- */
  const bAdd = G(boardL);
  const c2 = eqCard(bAdd, 440, 400, { title: 'ADD THE CLUES' }); tr(c2, CX, CY);
  const wkA = mkWorking(bAdd, CX + 10, 186, [
    { m: 'x + y = 7' }, { m: 'x − y = 1' }, { m: '2x = 8', col: BLUE }, { m: 'x = 4', note: '÷ 2', noteCol: PURP, col: GREEN }], { size: 42, gap: 18, fill: INK, noteX: 100, noteSize: 30 });
  const plus = T(bAdd, CX - 170, wkA.lineY[1], '+', { size: 44, weight: 800, anchor: 'middle', fill: BLUE });
  const ruleA = E('line', { x1: CX - 150, y1: wkA.lineY[1] + 18, x2: CX + 90, y2: wkA.lineY[1] + 18, stroke: INK, 'stroke-width': 4 }, bAdd);
  const eqW = mkMeasure('=', { size: 42 }).w, lE = CX + 10 - eqW / 2 - 0.26 * 42;
  const yw = mkMeasure('+ y', { size: 42 }).w;
  const stY = [0, 1].map(i => strike(bAdd, lE - yw - 4, wkA.lineY[i] - 14, lE + 4, RED));
  const chOpp = mkText(bAdd, CX, 478, '{{+y}} and {{−y}}: **opposite** signs, so **add**', { size: 26, anchor: 'middle', fill: RED, boldFill: RED });

  /* ---------- W board: substitute ---------- */
  const bSub = G(boardL);
  const c3 = eqCard(bSub, 440, 400, { title: 'NOW FIND y' }); tr(c3, CX, CY);
  const wkS = mkWorking(bSub, CX - 20, 190, [
    { m: 'x = 4', col: GREEN }, { m: '4 + y = 7', note: 'clue 1', noteCol: PURP }, { m: 'y = 3', col: GREEN }], { size: 42, gap: 16, fill: INK, noteX: 110, noteSize: 26 });
  const chk = G(bSub);
  E('line', { x1: CX - 196, y1: 398, x2: CX + 196, y2: 398, stroke: '#D8C8A8', 'stroke-width': 2 }, chk);
  T(chk, CX - 196, 432, 'check clue 2:', { size: 26, weight: 700, fill: '#6A5A62' });
  mkMath(chk, CX - 10, 476, '4 − 3 = 1', { size: 38, anchor: 'middle', fill: GREEN });
  tr(tick(chk, 14, GREEN), CX + 110, 462);
  const stOk = eqStamp(bSub, true);

  /* ---------- W board: the graph ---------- */
  const bGr = G(boardL);
  const gc = eqCard(bGr, 440, 400, {}); tr(gc, CX, CY);
  const ax = mkAxes(bGr, { xmin: 0, xmax: 8, ymin: 0, ymax: 8, unit: 38, size: 26, ink: INK, halo: MK.paper });
  tr(ax, CX - 150, 150);
  const L1 = ax.line(-1, 7, { col: BLUE, width: 6, label: 'x + y = 7', labelAt: 0.6, dx: 14, dy: -12, size: 28 });
  const L2 = ax.line(1, -1, { col: ORANGE, width: 6, label: 'x − y = 1', labelAt: 6.6, dx: -10, dy: -14, size: 28 });
  const X43 = ax.point(4, 3, { col: RED, label: '(4, 3)', pos: 'e', size: 30, r: 10 });
  const xGlow = E('circle', { cx: ax.px(4), cy: ax.py(3), r: 26, fill: glow('#FFE45C'), opacity: 0.9 }, ax);
  ax.insertBefore(xGlow, ax.lastChild);

  /* ---------- T: Mum's bubble-tea board ---------- */
  const tea = G(Lfg);
  const tc = eqCard(tea, 720, 410, { title: 'BUBBLE TEA' }); tr(tc, 800, 305);
  const cup = (parent, x, y) => {
    const g = G(parent); tr(g, x, y);
    E('path', { d: 'M3,-58 L14,-80', stroke: '#FF5FA2', 'stroke-width': 5, 'stroke-linecap': 'round' }, g);
    E('path', { d: 'M-22,-54 L22,-54 L17,0 L-17,0 Z', fill: '#D9A06B', stroke: INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
    E('path', { d: 'M-25,-54 Q0,-66 25,-54 Z', fill: '#E8F4FA', stroke: INK, 'stroke-width': 3 }, g);
    E('path', { d: 'M-9,-10 h0.1 M0,-14 h0.1 M9,-10 h0.1 M-4,-20 h0.1 M6,-22 h0.1', stroke: '#3A2418', 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
    return g;
  };
  const waffle = (parent, x, y) => {
    const g = G(parent); tr(g, x, y);
    E('rect', { x: -26, y: -52, width: 52, height: 52, rx: 10, fill: '#F2B648', stroke: INK, 'stroke-width': 3 }, g);
    E('path', { d: 'M-26,-35 h52 M-26,-17 h52 M-9,-52 v52 M9,-52 v52', stroke: '#B57B12', 'stroke-width': 3 }, g);
    return g;
  };
  const plusT = (parent, x, y) => T(parent, x, y - 18, '+', { size: 34, weight: 800, anchor: 'middle', fill: INK });
  const TR = [254, 352, 470];
  const tRow = [G(tea), G(tea), G(tea)];
  cup(tRow[0], 520, TR[0]); cup(tRow[0], 572, TR[0]); plusT(tRow[0], 618, TR[0]); waffle(tRow[0], 666, TR[0]);
  mkMath(tRow[0], 712, TR[0] - 10, '= $11', { size: 38, fill: INK });
  mkMath(tRow[0], 880, TR[0] - 10, '2t + w = 11', { size: 38, fill: BLUE });
  cup(tRow[1], 572, TR[1]); plusT(tRow[1], 618, TR[1]); waffle(tRow[1], 666, TR[1]);
  mkMath(tRow[1], 712, TR[1] - 10, '= $7', { size: 38, fill: INK });
  mkMath(tRow[1], 880, TR[1] - 10, 't + w = 7', { size: 38, fill: BLUE });
  T(tRow[1], 480, TR[1] - 16, '−', { size: 48, weight: 800, anchor: 'middle', fill: RED });
  E('line', { x1: 470, y1: TR[1] + 16, x2: 1130, y2: TR[1] + 16, stroke: INK, 'stroke-width': 4 }, tRow[1]);
  cup(tRow[2], 572, TR[2] - 18);
  mkMath(tRow[2], 712, TR[2] - 28, '= $4', { size: 40, fill: GREEN });
  mkMath(tRow[2], 880, TR[2] - 28, 't = 4', { size: 40, fill: GREEN });
  const teaRing = E('rect', { x: 696, y: TR[2] - 72, width: 104, height: 58, rx: 10, fill: 'none', stroke: GREEN, 'stroke-width': 4 }, tea);
  const teaNote = mkText(tea, 1140, 496, '{{+w}}, {{+w}}: same signs, so **subtract**', { size: 26, anchor: 'end', fill: PURP, boldFill: RED });
  const chTea = mkChip(Lfg, 'one tea = **$4**', { size: 30, col: GOLD });

  /* ---------- J: elimination ---------- */
  const elim = G(Lfg);
  const ec = eqCard(elim, 460, 400, { title: 'ELIMINATION' }); tr(ec, CX, CY);
  const e1 = mkText(elim, CX, 216, '**S**ame **S**igns **S**ubtract', { size: 38, anchor: 'middle', fill: INK, boldFill: RED });
  const e1b = mkText(elim, CX, 266, '{{+w}} and {{+w}}: the tea', { size: 28, anchor: 'middle', fill: '#6A5A62' });
  const eRule = E('line', { x1: CX - 200, y1: 306, x2: CX + 200, y2: 306, stroke: '#D8C8A8', 'stroke-width': 2 }, elim);
  const e2 = mkText(elim, CX, 368, '**Opposite** signs: **add**', { size: 38, anchor: 'middle', fill: INK, boldFill: BLUE });
  const e2b = mkText(elim, CX, 418, '{{+y}} and {{−y}}: the clues', { size: 28, anchor: 'middle', fill: '#6A5A62' });
  const sss = T(elim, CX, 480, 'S · S · S', { size: 34, weight: 800, anchor: 'middle', fill: RED, ls: 4 });

  /* ---------- V: the villains' chips ---------- */
  const ch2u = mkChip(Lfg, '**2** unknowns → **2** clues', { size: 32, col: PINK });
  const chSame = mkChip(Lfg, 'both true **at the same time**', { size: 30, col: PINK });
  const chSim = mkChip(Lfg, '**simultaneous** equations', { size: 30, col: GOLD });
  const chPair = mkChip(Lfg, 'a **pair** of values: {{(4, 3)}}', { size: 32, col: GOLD });
  const chOpen = mkChip(Lfg, '**OPEN**', { size: 30, col: '#56D69B' });

  /* ---------- the cast ---------- */
  const dad = cast(room.mid, 'dad', { s: 0.74 });
  const kav = cast(room.mid, 'kavya', { s: 0.74 });
  const mum = cast(room.mid, 'mum', { s: 0.74 });
  const boy = cast(room.mid, 'boy', { s: 0.74 });
  const pri = cast(room.mid, 'priya', { s: 0.74 });
  const judge = cast(room.top, 'judge', { s: 0.82 });
  const ex = cast(room.top, 'ex', { s: 0.78 });
  const ym = cast(room.top, 'ymad', { s: 0.82 });
  const XS = { dad: 85, kav: 185, mum: 285, boy: 380, pri: 475 }, Y0 = 448, HS = 0.74;
  const HUM = [[dad, 'dad'], [kav, 'kav'], [mum, 'mum'], [boy, 'boy'], [pri, 'pri']];
  const lt = { ymad: eqLowerThird(Lhud, 'ymad') };

  /* ---------- shots ---------- */
  const k = id => at(id) - 0.06;
  const SHOTS = [['W', -9], ['V', k('y')], ['W', k('clues')], ['V', k('same')], ['T', k('tea')], ['W', k('add')], ['J', k('sss')], ['W', k('graph')], ['V', k('unmask')], ['W', k('go')]];
  const shotAt = t => { let s = 'W'; for (const [n, t0] of SHOTS) if (t >= t0) s = n; return s; };
  const SPX = { dad: XS.dad, kavya: XS.kav, mum: XS.mum, boy: XS.boy, priya: XS.pri, narr: 780, judge: 780, ymad: 780, ex: 780 };
  const lookTo = (x0, who) => (SPX[who] === undefined ? 0.8 : clamp((SPX[who] - x0) / 160, -1, 1) * 0.85);
  const tGo = at('go') + 0.25;
  const tSpin = at('unmask') + 0.3;

  return t => {
    const sh = shotAt(t), who = scWho(S, t);
    room.upd(t);
    // the countdown runs fast from 5:00 and freezes at 0:07 on "Go"
    room.clock.set(lerp(300, 7, P(t, 0, tGo, linear)));
    lt.ymad.set(0);
    [chRoom, ch5min, ch2u, chSame, chSim, chPair, chOpen, chTea].forEach(c => c.set(0));
    HUM.forEach(([c]) => op(c, 0)); op(judge, 0); op(ex, 0); op(ym, 0);
    op(bClue, 0); op(bAdd, 0); op(bSub, 0); op(bGr, 0); op(tea, 0); op(elim, 0);
    Lworld.removeAttribute('transform');
    // the wheel turns a little at the start, and spins on "Go"
    const wa = 30 * P(t, at('room') + 0.4, 1.6, ease) + 300 * P(t, at('go') + 0.1, 1.2, ease);
    tr(room.decor.wheel, 330, 300, 1, wa);
    // the dials: ? until the villains are unmasked, then they spin to 4 and 3
    const sp = P(t, tSpin, 1.0, linear);
    if (t < tSpin) { setDial(dX, '?', 0); setDial(dY, '?', 0); }
    else if (sp < 1) { setDial(dX, String(Math.floor(sp * 23) % 10), sp * 720); setDial(dY, String(Math.floor(sp * 31 + 5) % 10), -sp * 720); }
    else { setDial(dX, '4', 0); setDial(dY, '3', 0); }
    // the door swings open on "Go"
    const sw = P(t, tGo, 1.0, easeIn);
    room.decor.setAttribute('transform', `translate(120 0) scale(${Math.max(0.04, 1 - 0.96 * sw).toFixed(3)} 1) translate(-120 0)`);
    op(hole, sw > 0 ? 1 : 0);
    attr(flood, 'opacity', 0.32 * P(t, tGo + 0.5, 0.8, linear));
    room.keypad.set(t >= tGo ? '43' : '', t >= tGo ? 1 : 0);

    /* ================= W: the room ================= */
    if (sh === 'W') {
      HUM.forEach(([c, key]) => { op(c, 1); tr(c, XS[key], Y0, HS); });
      const go = t >= k('go');
      if (t < k('y')) {
        chRoom.set(P(t, at('room') + 0.1, 0.4, linear)); tr(chRoom, 785, 230);
        ch5min.set(P(t, mid('room', 0.3), 0.35, linear)); tr(ch5min, 785, 300);
      }
      const clueT = t >= k('clues') && t < k('same'), manyT = t >= k('many') && t < k('same');
      if (clueT) {
        op(bClue, 1);
        wkC.show(0, P(t, mid('clues', 0.15), 0.3, linear)); op(lab1, P(t, mid('clues', 0.15), 0.3, linear));
        wkC.show(1, P(t, mid('clues', 0.55), 0.3, linear)); op(lab2, P(t, mid('clues', 0.55), 0.3, linear));
        const rows = tbl.cells;
        rows.forEach((r, i) => r.forEach(c => op(c, i === 0 ? P(t, at('many') + 0.2, 0.3, linear) : P(t, mid('many', [0, 0.3, 0.48, 0.68, 0.86][i]), 0.3, linear))));
        op(tbl, manyT ? 1 : 0);
        op(tblNote, manyT ? P(t, at('many') + 0.2, 0.3, linear) : 0);
        op(tblMany, manyT ? P(t, mid('many', 0.86), 0.3, linear) : 0);
      }
      const addT = t >= k('add') && t < k('sub'), subT = t >= k('sub') && t < k('sss');
      if (addT) {
        op(bAdd, 1);
        wkA.show(0, 1); wkA.show(1, 1);
        op(plus, P(t, at('add') + 0.2, 0.3, linear)); op(ruleA, P(t, at('add') + 0.2, 0.3, linear));
        stY.forEach(s => s.set(P(t, mid('add', 0.3), 0.3, linear)));
        op(chOpp, P(t, mid('add', 0.4), 0.3, linear));
        wkA.show(2, P(t, mid('add', 0.6), 0.3, linear));
        wkA.show(3, P(t, mid('add', 0.8), 0.3, linear)); wkA.ring(3, P(t, mid('add', 0.88), 0.3, linear));
      }
      if (subT) {
        op(bSub, 1);
        wkS.show(0, 1);
        wkS.show(1, P(t, at('sub') + 0.2, 0.3, linear));
        wkS.show(2, P(t, mid('sub', 0.3), 0.3, linear)); wkS.ring(2, P(t, mid('sub', 0.4), 0.3, linear));
        op(chk, P(t, mid('sub', 0.6), 0.3, linear));
        stOk.set(P(t, mid('sub', 0.8), 0.35, linear)); tr(stOk, CX + 104, 362, 0.4);
      }
      const grT = t >= k('graph') && t < k('unmask');
      if (grT) {
        op(bGr, 1);
        L1.set(P(t, at('graph') + 0.3, 0.8, ease)); L2.set(P(t, mid('graph', 0.3), 0.8, ease));
        X43.set(P(t, mid('graph', 0.62), 0.4, linear));
        op(xGlow, P(t, mid('graph', 0.62), 0.3, linear) * (0.6 + 0.4 * Math.sin(t * 6)));
      }
      // the family
      const manyBoy = t >= k('many') && t < k('same');
      const won = subT && t > mid('sub', 0.8);
      kav.set({ t, talk: talk(t, 'kavya'), mood: go ? 'happy' : addT && t > mid('add', 0.85) ? 'smug' : 'neutral', look: go ? 0.6 : who === 'kavya' ? 0.85 : lookTo(XS.kav, who) });
      boy.set({ t, talk: talk(t, 'boy'), mood: go ? 'happy' : 'happy', look: go ? 0.6 : who === 'boy' ? 0.85 : lookTo(XS.boy, who), lift: manyBoy ? 1 : 0 });
      pri.set({ t, talk: talk(t, 'priya'), mood: go ? 'shock' : won ? 'smug' : 'neutral', look: go ? -0.6 : who === 'priya' ? 0.85 : lookTo(XS.pri, who), lift: subT && t < mid('sub', 0.5) ? 1 : 0 });
      mum.set({ t, mood: go ? 'happy' : won ? 'happy' : 'neutral', look: go ? -0.6 : lookTo(XS.mum, who) });
      dad.set({ t, mood: go ? 'shock' : grT ? 'neutral' : 'neutral', look: go ? -0.8 : lookTo(XS.dad, who), lift: go ? 1 : 0 });
      if (go && t >= tGo) { chOpen.set(P(t, tGo, 0.3, linear)); tr(chOpen, 1092, 362); }
    }

    /* ================= V: the villains on the table ================= */
    if (sh === 'V') {
      op(ex, 1); op(ym, 1);
      const yIn = P(t, at('y') - 0.06, 0.45, pop);
      tr(ex, 690, 452, 0.78);
      tr(ym, 876, t < k('clues') ? lerp(760, 446, yIn) : 446, 0.82);
      const um = t >= k('unmask') ? P(t, at('unmask') + 0.1, 0.5, ease) : 0;
      const shock = um > 0.4 && t < mid('unmask', 0.8);
      ex.set({ t, talk: talk(t, 'ex'), mood: um > 0 ? (shock ? 'shock' : 'annoyed') : 'smug', look: who === 'ymad' ? 0.9 : 0, unmask: um, val: '4',
        cape: um > 0 ? Math.sin(t * 8) * 0.8 * AMP : Math.sin(t * 2) * 0.2 });
      ym.set({ t, talk: talk(t, 'ymad'), mood: um > 0 ? (shock ? 'shock' : 'annoyed') : 'smug', look: um > 0 ? -0.6 : -0.3, unmask: um, val: '3',
        cape: Math.sin(t * 2.4 + 1) * 0.3 });
      // Kavya and Ah Boy at the left, in front of the vault door
      op(kav, 1); tr(kav, 110, Y0, HS); op(boy, 1); tr(boy, 260, Y0, HS);
      kav.set({ t, mood: um > 0 ? 'smug' : t >= k('same') ? 'neutral' : 'deadpan', look: 0.9 });
      boy.set({ t, mood: um > 0 ? 'happy' : 'shock', look: 0.9 });
      if (t < k('clues')) {
        lt.ymad.set(win(t, at('y') + 0.3, at('y') + 3.4, 0.3));
        ch2u.set(P(t, mid('y', 0.62), 0.35, linear)); tr(ch2u, 790, 250);
      } else if (t < k('tea')) {
        chSame.set(P(t, mid('same', 0.35), 0.35, linear)); tr(chSame, 790, 196);
        chSim.set(P(t, mid('same', 0.66), 0.35, linear)); tr(chSim, 790, 268);
      } else {
        chPair.set(P(t, mid('unmask', 0.5), 0.35, linear)); tr(chPair, 790, 250);
      }
    }

    /* ================= T: the bubble-tea board ================= */
    if (sh === 'T') {
      op(tea, 1); op(room.decor, 0);
      op(tRow[0], P(t, at('tea') + 0.6, 0.3, linear));
      op(tRow[1], P(t, mid('tea', 0.42), 0.3, linear));
      op(tRow[2], P(t, mid('tea', 0.72), 0.3, linear));
      op(teaRing, P(t, mid('tea', 0.86), 0.3, linear)); op(teaNote, P(t, mid('tea', 0.72), 0.3, linear));
      op(mum, 1); tr(mum, 110, Y0, 0.8); op(dad, 1); tr(dad, 290, Y0, 0.8);
      mum.set({ t, talk: talk(t, 'mum'), mood: t > mid('tea', 0.85) ? 'happy' : 'neutral', look: 0.85 });
      dad.set({ t, mood: t > mid('tea', 0.85) ? 'happy' : 'neutral', look: t < mid('tea', 0.2) ? -0.6 : 0.85 });
      chTea.set(P(t, mid('tea', 0.88), 0.35, linear)); tr(chTea, 200, 230);
    } else op(room.decor, 1);

    /* ================= J: Judge Even, elimination ================= */
    if (sh === 'J') {
      op(elim, 1);
      op(judge, 1); tr(judge, 330, 530 - 128 * 0.82, 0.82);
      op(pri, 1); tr(pri, 96, Y0, 0.8);
      judge.set({ t, talk: talk(t, 'judge'), mood: t > mid('sss', 0.8) ? 'happy' : 'deadpan', look: 0.6, bang: pulse(t, at('sss') + 0.25) });
      pri.set({ t, mood: 'neutral', look: 0.8 });
      fade(e1, t, mid('sss', 0.22)); fade(e1b, t, mid('sss', 0.42)); op(sss, P(t, mid('sss', 0.22), 0.3, linear));
      fade(e2, t, mid('sss', 0.66)); fade(e2b, t, mid('sss', 0.78)); op(eRule, P(t, mid('sss', 0.6), 0.3, linear));
    }
  };
});
