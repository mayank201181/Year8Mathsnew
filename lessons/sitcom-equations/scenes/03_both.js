/* Scene 3: The Bike Shed (unknowns on both sides).
   Shots (hard sitcom cuts):
   W  the room: the family behind the table, two stall signs on the wall: STALL A $3 + $5 an hour, STALL B $15 + $2
      an hour, "same cost?" -> Dad points at STALL A: "smallest fee!".
   B  the big board, Judge Even on the table: Let h be the hours, 5h + 3 = 2h + 15 (h terms ringed on BOTH sides),
      the bar model (exact lengths: 23 units each); 2h shaded and crossed out of BOTH bars -> cut: Kavya and Mum at
      the board: 3h + 3 = 15 => 3h = 12 => h = 4 hours.
   W  Mum's check card: A 5 × 4 + 3 = $23, B 2 × 4 + 15 = $23, BALANCED -> 6 hours: A $33, B $27 (B cheaper)
      -> push in on Dad: the smile melts.
   W  the shed door card: 2x + 9 = 5x − 6, 5x ringed (bigger), 9 = 3x − 6 (− 2x), 15 = 3x (+ 6)
   J  Judge Even and Ah Boy (puzzled): 15 = 3x <-> 3x = 15, x = 5.
   Z  zoom to the exit door: Ex pops out, unmasked: 5. "Third time today!" (keypad 5)
   W  the padlock card: 7 − 4x = x + 2, −4x ringed, + 4x both sides: 7 = 5x + 2, 5 = 5x, x = 1; padlock opens, OPEN.
   TH Ex, unmasked: 1. "Finally. A new face." */
scene('both', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;
  const talk = (t, who) => scTalk(S, t, who);

  /* ---------- local helpers ---------- */
  const view = (el, k, fx, fy) => el.setAttribute('transform', `translate(600 375) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const fade = (el, t, t0, d) => { const p = P(t, t0, d || 0.3, linear); op(el, p); return p; };
  const pulse = (t, t0) => (t < t0 - 0.18 ? 0 : t < t0 ? P(t, t0 - 0.18, 0.18, easeIn) : 1 - P(t, t0 + 0.35, 0.35, ease));
  const GOLD = '#FFE45C', RED = '#D32F2F', GREEN = '#1E9E5A', LILAC = '#B48CFF', INK = MK.ink, PURP = '#6A3CD8', BLUE = '#2E6FD8';
  const W_ = s => mkMeasure(s, { size: S_ }).w;
  let S_ = 40;
  // ring (ellipse) around a span of a typeset line: x1..x2 at baseline y, size s
  const ringAt = (parent, x1, x2, y, s, col) => {
    const e = E('ellipse', { cx: (x1 + x2) / 2, cy: y - s * 0.32, rx: (x2 - x1) / 2 + s * 0.16, ry: s * 0.6, fill: 'none', stroke: col || RED, 'stroke-width': 4 }, parent);
    mkDash(e); e.set = p => { mkDraw(e, p); op(e, p > 0 ? 1 : 0); }; e.set(0);
    return e;
  };

  /* ---------- layers ---------- */
  const Lworld = G(root), Lconf = G(root), Lfg = G(root), Lhud = G(root);
  const room = eqRoom(Lworld, 'bike');
  const boardL = G(room); room.insertBefore(boardL, room.mid);     // boards: in front of the wall, behind the cast
  const conf = eqConf(Lconf, 'ex');
  const lock = eqPadlock(room.top, { s: 0.62, col: '#9AA6B2' }); tr(lock, 1092, 610);

  /* ================= W: the two stall signs ================= */
  const signs = G(boardL);
  const sign = (x, name, l1, l2, col) => {
    const g = G(signs); tr(g, x, 286);
    E('path', { d: 'M-60,-96 L0,-130 L60,-96', fill: 'none', stroke: '#C9D3DC', 'stroke-width': 3 }, g);
    E('rect', { x: -104, y: -96, width: 208, height: 176, rx: 12, fill: '#FFFDF6', stroke: col, 'stroke-width': 5 }, g);
    E('rect', { x: -104, y: -96, width: 208, height: 50, rx: 12, fill: col }, g);
    T(g, 0, -60, name, { size: 30, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 1 });
    mkText(g, 0, -2, l1, { size: 34, anchor: 'middle', fill: INK });
    mkText(g, 0, 50, l2, { size: 28, anchor: 'middle', fill: INK });
    g.hl = E('rect', { x: -112, y: -104, width: 224, height: 192, rx: 16, fill: 'none', stroke: GOLD, 'stroke-width': 6 }, g);
    return g;
  };
  const sA = sign(676, 'STALL A', '**$3**', '+ **$5** an hour', '#E8751A');
  const sB = sign(894, 'STALL B', '**$15**', '+ **$2** an hour', BLUE);
  const chRoom = mkChip(Lfg, '**Room 3** · 41:50', { size: 30, col: GOLD });
  const chSame = mkChip(Lfg, 'the **same** cost?', { size: 32, col: GOLD });
  const chFee = mkChip(Lfg, 'smallest fee!', { size: 30, col: '#9FE0B5' });

  /* ================= B: the big board with the bar model ================= */
  const BX = 800, BY = 305;
  const bigB = G(boardL);
  const bb = eqCard(bigB, 720, 400, {}); tr(bb, BX, BY);
  const bLet = mkText(bigB, 470, 152, 'Let {{h}} be the hours', { size: 30, fill: PURP });
  S_ = 46;
  const EQ = '5h + 3 = 2h + 15', eqX = BX - W_(EQ) / 2, eqY = 214;
  const bEq = mkMath(bigB, eqX, eqY, EQ, { size: 46, fill: INK });
  const r5h = ringAt(bigB, eqX, eqX + W_('5h'), eqY, 46, BLUE);
  const r2h = ringAt(bigB, eqX + W_('5h + 3 = 2h') - W_('2h'), eqX + W_('5h + 3 = 2h'), eqY, 46, BLUE);
  const chBoth = mkText(bigB, 1140, 160, 'unknowns on **both** sides', { size: 28, anchor: 'end', fill: BLUE, boldFill: BLUE });
  // the bar model: 26 px per unit, h = 4 units: A = 5h + 3, B = 2h + 15, both 23 units = 598 px
  const U = 26, X0 = 540, RY = [246, 326], RH = 62;
  const bars = G(bigB);
  const rowG = [G(bars), G(bars)];
  const cell = (r, x, w, lab, col, isH) => {
    const g = G(rowG[r]);
    E('rect', { x, y: RY[r], width: w, height: RH, fill: col, stroke: INK, 'stroke-width': 3 }, g);
    mkMath(g, x + w / 2, RY[r] + RH / 2 + 12, lab, { size: 34, anchor: 'middle', fill: INK, italic: isH });
    return g;
  };
  const cellsA = [], cellsB = [];
  for (let i = 0; i < 5; i++) cellsA.push(cell(0, X0 + i * 4 * U, 4 * U, 'h', '#FFC247', true));
  cellsA.push(cell(0, X0 + 20 * U, 3 * U, '3', '#FFE29A'));
  for (let i = 0; i < 2; i++) cellsB.push(cell(1, X0 + i * 4 * U, 4 * U, 'h', '#9FD8FF', true));
  cellsB.push(cell(1, X0 + 8 * U, 15 * U, '15', '#D6EEFF'));
  T(rowG[0], X0 - 16, RY[0] + 42, 'A', { size: 32, weight: 800, anchor: 'end', fill: '#E8751A' });
  T(rowG[1], X0 - 16, RY[1] + 42, 'B', { size: 32, weight: 800, anchor: 'end', fill: BLUE });
  const cutBars = [0, 1].map(r => {
    const g = G(bars);
    E('rect', { x: X0, y: RY[r], width: 8 * U, height: RH, fill: '#4A525C', stroke: RED, 'stroke-width': 4, 'stroke-dasharray': '10 6' }, g);
    mkMath(g, X0 + 4 * U, RY[r] + RH / 2 + 13, '−2h', { size: 38, anchor: 'middle', fill: '#FFFFFF', halo: '#3A3A44' });
    return g;
  });
  // solve: 3h + 3 = 15 => 3h = 12 => h = 4 hours, one row under the bars
  const solveRow = G(bigB);
  const sv = [['{{3h + 3 = 15}}', 470], ['{{=> 3h = 12}}', 690], ['{{=> h = 4}} hours', 895]].map(([s, x]) => mkText(solveRow, x, 458, s, { size: 38, fill: INK, mathScale: 1 }));
  const s4x = 895 + mkMeasure('=>', { size: 38 }).w + 10;
  const svRing = E('rect', { x: s4x - 4, y: 420, width: 895 + sv[2].w - s4x + 14, height: 54, rx: 8, fill: 'none', stroke: GREEN, 'stroke-width': 4 }, solveRow);

  /* ================= W: Mum's check card ================= */
  const CX = 782, CY = 305;
  const chkC = G(boardL);
  const cc = eqCard(chkC, 440, 400, { title: 'CHECK' }); tr(cc, CX, CY);
  const c4 = mkText(chkC, CX - 196, 214, '**4 hours**', { size: 28, fill: PURP });
  const wk4 = mkWorking(chkC, CX + 40, 228, [
    '5 × 4 + 3 = $23',
    '2 × 4 + 15 = $23'], { size: 32, gap: 12, fill: INK });
  const abLab = (wk, i) => { const g = T(wk.lines[i].inner, CX - 168, wk.lineY[i], i ? 'B' : 'A', { size: 30, weight: 800, anchor: 'middle', fill: i ? BLUE : '#E8751A' }); return g; };
  abLab(wk4, 0); abLab(wk4, 1);
  const tk4 = tick(chkC, 14, GREEN); tr(tk4, CX + 186, 300);
  const stOk = eqStamp(chkC, true);
  const c6 = mkText(chkC, CX - 196, 386, '**6 hours**', { size: 28, fill: RED });
  const wk6 = mkWorking(chkC, CX + 40, 400, [
    '5 × 6 + 3 = $33',
    { m: '2 × 6 + 15 = $27', col: GREEN }], { size: 32, gap: 12, fill: INK });
  abLab(wk6, 0); abLab(wk6, 1);
  const cheap = mkChip(chkC, 'cheaper!', { size: 26, col: GREEN, solid: true, fill: '#DFF5E6' });

  /* ================= W / J: the shed door ================= */
  const door = G(boardL);
  const dc = eqCard(door, 440, 400, { title: 'SHED DOOR' }); tr(dc, CX, CY);
  S_ = 38;
  const wkD = mkWorking(door, CX - 30, 188, [
    { m: '2x + 9 = 5x − 6' },
    { m: '9 = 3x − 6', note: '− 2x', noteCol: PURP },
    { m: '15 = 3x', note: '+ 6', noteCol: PURP },
    { m: '3x = 15', col: GREEN },
    { m: 'x = 5', col: GREEN }], { size: 38, gap: 14, fill: INK, noteX: 150, noteSize: 30 });
  const eqWd = mkMeasure('=', { size: 38 }).w, rs = CX - 30 + eqWd / 2 + 0.26 * 38;
  const r5x = ringAt(door, rs, rs + W_('5x'), wkD.lineY[0], 38, RED);
  const big5 = mkText(door, CX + 196, wkD.lineY[0] + 46, '{{5x}} is bigger', { size: 26, anchor: 'end', fill: RED });
  // the two-way arrow between 15 = 3x and 3x = 15
  const twoWay = G(door);
  const yA = wkD.lineY[2] - 12, yB = wkD.lineY[3] - 12, ax = CX - 178;
  E('path', { d: `M${ax},${yA + 4} Q${ax - 46},${(yA + yB) / 2} ${ax},${yB - 4}`, fill: 'none', stroke: BLUE, 'stroke-width': 4 }, twoWay);
  E('path', { d: `M${ax},${yA + 4} l-4,14 M${ax},${yA + 4} l-14,6 M${ax},${yB - 4} l-4,-14 M${ax},${yB - 4} l-14,-6`, stroke: BLUE, 'stroke-width': 4, 'stroke-linecap': 'round' }, twoWay);
  const chWays = mkText(door, CX + 196, wkD.lineY[3], 'both ways', { size: 26, anchor: 'end', fill: BLUE });

  /* ================= W: the padlock ================= */
  const pad = G(boardL);
  const pc = eqCard(pad, 440, 400, { title: 'PADLOCK' }); tr(pc, CX, CY);
  const wkP = mkWorking(pad, CX - 70, 196, [
    { m: '7 − 4x = x + 2' },
    { m: '7 = 5x + 2', note: '+ 4x', noteCol: PURP },
    { m: '5 = 5x', note: '− 2', noteCol: PURP },
    { m: 'x = 1', note: '÷ 5', noteCol: PURP, col: GREEN }], { size: 38, gap: 18, fill: INK, noteX: 140, noteSize: 30 });
  const pBoth = mkText(pad, CX, 482, 'add {{4x}} to **both** sides', { size: 28, anchor: 'middle', fill: PURP, boldFill: PURP });
  const le = CX - 70 - eqWd / 2 - 0.26 * 38;
  const rm4 = ringAt(pad, le - (W_('7 − 4x') - W_('7')) + 6, le, wkP.lineY[0], 38, RED);

  /* ================= the cast ================= */
  const dad = cast(room.mid, 'dad', { s: 0.74 });
  const kav = cast(room.mid, 'kavya', { s: 0.74 });
  const mum = cast(room.mid, 'mum', { s: 0.74 });
  const boy = cast(room.mid, 'boy', { s: 0.74 });
  const pri = cast(room.mid, 'priya', { s: 0.74 });
  const judge = cast(room.top, 'judge', { s: 0.78 });
  const exDoor = cast(room.top, 'ex', { s: 0.5 });
  const exTH = cast(Lconf, 'ex');
  const XS = { dad: 85, kav: 185, mum: 285, boy: 380, pri: 475 }, Y0 = 448, HS = 0.74;
  const HUM = [[dad, 'dad'], [kav, 'kav'], [mum, 'mum'], [boy, 'boy'], [pri, 'pri']];
  const plq = G(Lconf);
  E('rect', { x: -220, y: -130, width: 440, height: 260, rx: 18, fill: '#0E0A20', stroke: LILAC, 'stroke-width': 5 }, plq);
  T(plq, 0, -74, 'A NEW FACE', { size: 38, weight: 800, anchor: 'middle', fill: LILAC, ls: 2 });
  mkMath(plq, 0, 40, 'x = 1', { size: 80, anchor: 'middle', fill: GOLD });
  T(plq, 0, 104, 'finally', { size: 28, weight: 700, anchor: 'middle', fill: '#CFC2FF', font: FB });
  const ch3rd = mkChip(Lfg, '**3rd** time today', { size: 32, col: '#FF8A8A' });
  const chPad5 = mkChip(Lfg, '**5**', { size: 30, col: GOLD });
  const chOpen = mkChip(Lfg, '**OPEN**', { size: 30, col: '#56D69B' });

  /* ---------- shots ---------- */
  const k = id => at(id) - 0.06;
  const SHOTS = [['W', -9], ['B', k('eq')], ['W', k('cost')], ['J', k('ways')], ['Z', k('mask')], ['W', k('padlock')], ['T', k('new')]];
  const shotAt = t => { let s = 'W'; for (const [n, t0] of SHOTS) if (t >= t0) s = n; return s; };
  const SPX = { dad: XS.dad, kavya: XS.kav, mum: XS.mum, boy: XS.boy, priya: XS.pri, judge: 760, narr: 780, ex: 1000 };
  const lookTo = (x0, who) => (SPX[who] === undefined ? 0.8 : clamp((SPX[who] - x0) / 160, -1, 1) * 0.85);
  const placeAll = () => HUM.forEach(([c, key]) => { op(c, 1); tr(c, XS[key], Y0, HS); });

  return t => {
    const sh = shotAt(t), who = scWho(S, t);
    room.upd(t);
    room.clock.set(2510 - t);
    [chRoom, chSame, chFee, ch3rd, chPad5, chOpen].forEach(c => c.set(0));
    HUM.forEach(([c]) => op(c, 0)); op(judge, 0); op(exDoor, 0);
    op(signs, 0); op(bigB, 0); op(chkC, 0); op(door, 0); op(pad, 0);
    op(Lworld, sh === 'T' ? 0 : 1);
    Lworld.removeAttribute('transform');
    op(room.decor, 1);
    // the door: keypad 5 after the shed door, padlock opens on x = 1
    const typed5 = t >= mid('ways', 0.8), padOpen = t >= mid('padlock', 0.92);
    room.keypad.set(padOpen ? '1' : typed5 ? '5' : '', padOpen ? 1 : 0);
    lock.set(padOpen ? P(t, mid('padlock', 0.92), 0.4, pop) : 0);

    /* ================= W: the room ================= */
    if (sh === 'W') {
      placeAll();
      const early = t < k('eq'), check = t >= k('cost') && t < k('right'), shed = t >= k('right') && t < k('padlock'), padS = t >= k('padlock');
      if (early) {
        op(signs, 1);
        chRoom.set(P(t, at('clue') - 0.2, 0.4, linear)); tr(chRoom, 785, 132);
        attr(sA.hl, 'opacity', t >= mid('fee', 0.2) ? 1 : 0); attr(sB.hl, 'opacity', 0);
        if (t < k('fee')) { chSame.set(P(t, mid('clue', 0.82), 0.35, linear)); tr(chSame, 785, 440); }
        else { chFee.set(P(t, mid('fee', 0.35), 0.35, linear)); tr(chFee, 676, 440); }
      }
      if (check) {
        op(chkC, t >= k('small') ? 0 : 1);
        wk4.show(0, P(t, at('cost') + 0.5, 0.3, linear)); wk4.show(1, P(t, mid('cost', 0.45), 0.3, linear));
        op(c4, P(t, at('cost'), 0.3, linear)); op(tk4, P(t, mid('cost', 0.7), 0.3, linear));
        stOk.set(P(t, mid('cost', 0.78), 0.35, linear) * (1 - P(t, at('six'), 0.25, linear))); tr(stOk, CX + 70, 344, 0.42);
        const s6 = t >= at('six');
        op(c6, s6 ? P(t, at('six') + 0.1, 0.3, linear) : 0);
        wk6.show(0, s6 ? P(t, mid('six', 0.45), 0.3, linear) : 0); wk6.show(1, s6 ? P(t, mid('six', 0.6), 0.3, linear) : 0);
        wk6.hl(1, s6 ? P(t, mid('six', 0.74), 0.3, linear) : 0);
        cheap.set(s6 ? P(t, mid('six', 0.76), 0.35, linear) : 0); tr(cheap, CX + 120, 386 - 12);
      }
      if (shed) {
        op(door, 1);
        wkD.show(0, P(t, at('right') + 0.4, 0.3, linear));
        r5x.set(P(t, mid('right', 0.3), 0.4, linear)); op(big5, P(t, mid('right', 0.32), 0.3, linear) * (1 - P(t, mid('right', 0.5), 0.2, linear)));
        wkD.show(1, P(t, mid('right', 0.55), 0.3, linear));
        wkD.show(2, P(t, mid('right', 0.82), 0.3, linear));
        wkD.show(3, 0); wkD.show(4, 0); op(twoWay, 0); op(chWays, 0);
      }
      if (padS) {
        op(pad, 1);
        wkP.show(0, P(t, at('padlock') + 0.5, 0.3, linear));
        rm4.set(P(t, mid('padlock', 0.28), 0.4, linear));
        wkP.show(1, P(t, mid('padlock', 0.5), 0.3, linear)); op(pBoth, P(t, mid('padlock', 0.36), 0.3, linear));
        wkP.show(2, P(t, mid('padlock', 0.7), 0.3, linear));
        wkP.show(3, P(t, mid('padlock', 0.84), 0.3, linear));
        wkP.ring(3, P(t, mid('padlock', 0.9), 0.3, linear));
        if (padOpen) { chOpen.set(P(t, mid('padlock', 0.92), 0.3, linear)); tr(chOpen, 1092, 362); }
      }
      // the family
      const feeT = t >= at('fee') - 0.1 && t < k('eq');
      const sixT = t >= mid('six', 0.7) && t < k('right');
      const smallT = t >= k('small') && t < k('right');
      dad.set({ t, talk: talk(t, 'dad'), mood: smallT ? (t > mid('small', 0.35) ? 'sad' : 'smug') : sixT ? 'shock' : feeT ? 'smug' : check ? 'neutral' : 'neutral',
        look: who === 'dad' ? 0.9 : lookTo(XS.dad, who), lift: feeT && t > mid('fee', 0.15) ? 1 : 0 });
      kav.set({ t, talk: talk(t, 'kavya'), mood: feeT ? 'deadpan' : smallT ? 'deadpan' : padS && t > mid('padlock', 0.85) ? 'smug' : 'neutral',
        look: who === 'kavya' ? 0.85 : feeT ? -0.8 : lookTo(XS.kav, who) });
      mum.set({ t, talk: talk(t, 'mum'), mood: check && t > mid('cost', 0.75) && !sixT ? 'happy' : smallT ? 'deadpan' : 'neutral', look: who === 'mum' ? 0.85 : smallT ? -0.8 : lookTo(XS.mum, who) });
      boy.set({ t, mood: smallT ? 'deadpan' : padOpen ? 'happy' : 'happy', look: smallT ? -0.8 : lookTo(XS.boy, who) });
      pri.set({ t, mood: smallT ? 'deadpan' : feeT ? 'neutral' : padOpen ? 'happy' : 'neutral', look: smallT ? -0.9 : lookTo(XS.pri, who) });
      // push in on Dad's face as the smile melts
      if (smallT) { const p = P(t, k('small'), 1.2, ease); view(Lworld, 1 + 0.9 * p, lerp(600, 330, p), lerp(375, 380, p)); }
    }

    /* ================= B: the big board ================= */
    if (sh === 'B') {
      op(bigB, 1); op(room.decor, 0);
      const isSolve = t >= k('solve');
      fade(bLet, t, at('eq') + 0.2, 0.3);
      op(bEq, P(t, mid('eq', 0.14), 0.3, linear));
      const hlP = P(t, mid('eq', 0.42), 0.4, linear) * (isSolve ? 0 : 1);
      r5h.set(hlP); r2h.set(hlP); op(chBoth, hlP);
      const bp = P(t, mid('eq', 0.5), 0.6, linear);
      cellsA.forEach((c, i) => op(c, clamp(bp * 6 - i))); cellsB.forEach((c, i) => op(c, clamp(bp * 6 - i * 2)));
      op(rowG[0], bp > 0 ? 1 : 0); op(rowG[1], bp > 0 ? 1 : 0);
      cutBars.forEach(c => op(c, P(t, mid('eq', 0.84), 0.3, linear)));
      op(sv[0], P(t, at('solve') + 0.2, 0.3, linear)); op(sv[1], P(t, mid('solve', 0.45), 0.3, linear)); op(sv[2], P(t, mid('solve', 0.72), 0.3, linear));
      op(svRing, P(t, mid('solve', 0.86), 0.3, linear));
      if (!isSolve) {
        const jp = P(t, at('eq') - 0.06, 0.4, pop);
        op(judge, 1); tr(judge, 230, lerp(760, 530 - 128 * 0.78, jp), 0.78);
        judge.set({ t, talk: talk(t, 'judge'), mood: 'deadpan', look: 0.8, tilt: 0, bang: pulse(t, mid('eq', 0.84)) });
      } else {
        op(kav, 1); tr(kav, 120, Y0, 0.8); op(mum, 1); tr(mum, 300, Y0, 0.8);
        kav.set({ t, talk: talk(t, 'kavya'), mood: t > mid('solve', 0.75) ? 'smug' : 'neutral', look: 0.85 });
        mum.set({ t, mood: t > mid('solve', 0.8) ? 'happy' : 'neutral', look: -0.6 });
      }
    }

    /* ================= J: the judge and Ah Boy at the shed door card ================= */
    if (sh === 'J') {
      op(door, 1); op(room.decor, 0);
      [0, 1, 2].forEach(i => wkD.show(i, 1)); r5x.set(0); op(big5, 0);
      wkD.show(3, P(t, mid('ways', 0.3), 0.3, linear)); op(twoWay, P(t, mid('ways', 0.38), 0.3, linear)); op(chWays, P(t, mid('ways', 0.45), 0.3, linear));
      wkD.show(4, P(t, mid('ways', 0.75), 0.3, linear)); wkD.ring(4, P(t, mid('ways', 0.85), 0.3, linear));
      op(judge, 1); tr(judge, 340, 530 - 128 * 0.82, 0.82);
      op(boy, 1); tr(boy, 96, Y0, 0.8);
      judge.set({ t, talk: talk(t, 'judge'), mood: t > mid('ways', 0.8) ? 'happy' : 'deadpan', look: -0.5, tilt: 0 });
      boy.set({ t, mood: t < mid('ways', 0.45) ? 'shock' : 'happy', look: 0.8, lift: t < mid('ways', 0.45) ? 1 : 0 });
    }

    /* ================= Z: zoom to the exit door: Ex, unmasked ================= */
    if (sh === 'Z') {
      op(room.decor, 1);
      const push = P(t, k('mask'), end('mask') + 0.5 - k('mask'), linear);
      view(Lworld, 1.5 + 0.08 * push, 948, 420);
      op(exDoor, 1);
      const jump = P(t, at('mask') - 0.05, 0.4, pop);
      tr(exDoor, 880, lerp(660, 452, jump), 0.6);
      const um = P(t, at('mask') + 0.15, 0.5, ease);
      exDoor.set({ t, talk: talk(t, 'ex'), mood: um < 0.4 ? 'smug' : t < mid('mask', 0.35) ? 'shock' : 'annoyed', look: -0.3,
        unmask: um, val: '5', cape: Math.sin(t * 9) * (t > mid('mask', 0.35) ? 1 : 0.3) * AMP });
      ch3rd.set(P(t, mid('mask', 0.55), 0.35, linear)); tr(ch3rd, 560, 200);
    }

    /* ================= TH: Ex, unmasked: 1 ================= */
    conf.set(sh === 'T' ? 1 : 0, t);
    op(exTH, sh === 'T' ? 1 : 0); op(plq, sh === 'T' ? 1 : 0);
    if (sh === 'T') {
      const push = P(t, k('new'), 3.4, linear);
      tr(exTH, 330, 420, 1.42 * (1 + 0.05 * push));
      const um = P(t, at('new') + 0.05, 0.5, ease);
      exTH.set({ t, talk: talk(t, 'ex'), mood: t < mid('new', 0.3) ? 'shock' : 'happy', look: 0.4, unmask: um, val: '1',
        cape: Math.sin(t * 6) * 0.4 * AMP });
      const pp = P(t, mid('new', 0.3), 0.45, pop);
      op(plq, clamp(pp * 2.5)); tr(plq, 860, 330, Math.max(0.01, 0.7 + 0.3 * pp));
    }
  };
});
