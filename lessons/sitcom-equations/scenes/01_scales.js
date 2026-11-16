/* Scene 1: The Scales Room (solving one- and two-step equations).
   Shots (hard sitcom cuts):
   W  the room: the family behind the table at the left, a big balance on the table at the right: three bags of x and
      4 kg against 19 kg; 3x + 4 = 19 -> Dad: "x = 7?" -> Kavya: 3 × 7 + 4 = 25 ≠ 19, the bags swell to 7, the
      balance tips hard and snaps back.
   B  the balance close, Judge Even pops onto the table (ORDER! gavel) -> 4 kg off BOTH pans, the beam stays level
      -> each pan shared into three: one bag balances one 5 kg block, x = 5 ringed.
   W  Mum substitutes: the bags read 5, 3 × 5 + 4 = 19, level, BALANCED.
   X  zoom into the left pan: Ex jumps out of a bag, the mask flies off: badge 5. Curses!
   C  the clue card on the wall: socks and shoes (build x -> 3x -> 3x + 4, undo − 4 then ÷ 3) -> Priya: 3x = 12, x = 9.
   J  the judge at the card: TIPPED!, x = 12 ÷ 3 = 4.
   C  Priya: 6x + 11 = 2, 6x = −9, impossible?!   J  Overruled! answers can be negative or fractions.
   C  Kavya: x = −9/6 = −3/2 = −1.5, the check; the keypad: −1.5, OPEN.
   TH Ex, unmasked: −1.5. "I didn't know I could do that." */
scene('scales', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;
  const talk = (t, who) => scTalk(S, t, who);

  /* ---------- local helpers ---------- */
  const view = (el, k, fx, fy) => el.setAttribute('transform', `translate(600 375) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const fade = (el, t, t0, d) => { const p = P(t, t0, d || 0.3, linear); op(el, p); return p; };
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.4, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r || 0); return p; };
  const pulse = (t, t0) => (t < t0 - 0.18 ? 0 : t < t0 ? P(t, t0 - 0.18, 0.18, easeIn) : 1 - P(t, t0 + 0.35, 0.35, ease));
  const bangs = (t, ts) => ts.reduce((m, x) => Math.max(m, pulse(t, x)), 0);
  const outline = (el, col, w) => { el.setAttribute('stroke', col); el.setAttribute('stroke-width', w); el.setAttribute('paint-order', 'stroke'); el.setAttribute('stroke-linejoin', 'round'); return el; };
  const GOLD = '#FFE45C', RED = '#D32F2F', GREEN = '#1E9E5A', LILAC = '#B48CFF', INK = MK.ink, PURP = '#6A3CD8';
  const panel = (parent, x, y, w, h, col) => E('rect', { x, y, width: w, height: h, rx: 18, fill: 'rgba(10,27,39,0.9)', stroke: col || GOLD, 'stroke-width': 3 }, parent);

  /* a mystery sack (base centre at 0,0, 60 wide, 66 tall) with two labels: x and a trial value */
  function bag(parent) {
    const g = G(parent), inner = G(g);
    E('path', { d: 'M-29,0 Q-37,-34 -19,-52 L-11,-58 L11,-58 L19,-52 Q37,-34 29,0 Z', fill: linGrad('#E8C98A', '#C49A50', true), stroke: SC_INK, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, inner);
    E('path', { d: 'M-14,-58 Q0,-70 14,-58', fill: 'none', stroke: '#8A5A30', 'stroke-width': 3.5, 'stroke-linecap': 'round' }, inner);
    const lx = T(inner, 0, -14, 'x', { size: 42, weight: 700, anchor: 'middle', fill: '#5A2A7A', font: "'Times New Roman', Georgia, serif" });
    lx.setAttribute('font-style', 'italic');
    const lv = T(inner, 0, -14, '7', { size: 36, weight: 800, anchor: 'middle', fill: '#5A2A7A' });
    op(lv, 0);
    g.inner = inner;
    g.val = v => { if (v) { setText(lv, v); op(lv, 1); op(lx, 0); } else { op(lv, 0); op(lx, 1); } };
    return g;
  }
  /* an iron weight, base centre at (0,0), 60 tall, with a big label */
  function wt(parent, label, w, size) {
    const g = G(parent);
    E('path', { d: 'M-13,-60 Q0,-76 13,-60', fill: 'none', stroke: '#3A4048', 'stroke-width': 6, 'stroke-linecap': 'round' }, g);
    E('path', { d: `M${-w / 2},0 L${w / 2},0 L${w / 2 - 10},-58 L${-w / 2 + 10},-58 Z`, fill: linGrad('#8F9CAB', '#4A5560', true), stroke: SC_INK, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, g);
    T(g, 0, -18, label, { size: size || 32, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
    return g;
  }

  /* ---------- layers ---------- */
  const Lworld = G(root), Lconf = G(root), Lfg = G(root), Lhud = G(root);
  const room = eqRoom(Lworld, 'scales');
  const cardL = G(room); room.insertBefore(cardL, room.mid);    // boards: in front of the wall, behind the cast
  const conf = eqConf(Lconf, 'ex');

  /* ---------- the balance ---------- */
  const bal = mkBalance(room.top, { arm: 180, col: '#D9A93A' });
  const bagsL = [-88, -34, 20].map(x => { const b = bag(bal.left); tr(b, x, 0); return b; });
  const w4L = wt(bal.left, '4 kg', 76); bal.left.insertBefore(w4L, bal.left.firstChild); tr(w4L, 84, 0);
  const w19 = wt(bal.right, '19 kg', 140, 34);
  const w15 = wt(bal.right, '15 kg', 118, 34);
  const w4R = wt(bal.right, '4 kg', 76);
  const w5 = [-76, 0, 76].map(x => { const g = wt(bal.right, '5 kg', 72, 30); tr(g, x, 0); return g; });
  // Ex, jumping out of the middle bag (curses)
  const exPan = cast(bal.left, 'ex', { s: 0.45 });
  const tableL = G(room.top);
  const lab3x = mkMath(tableL, 0, 0, '3x + 4', { size: 42, anchor: 'middle', fill: C.ink });
  const lab19 = mkMath(tableL, 0, 0, '19', { size: 42, anchor: 'middle', fill: C.ink });

  /* ---------- W: the panel above the balance ---------- */
  const wp = G(Lfg);
  panel(wp, 575, 112, 430, 186);
  const wpRoom = G(wp);
  const chRoom = mkChip(wpRoom, '**Room 1** · 58:20', { size: 30, col: GOLD }); tr(chRoom, 790, 160);
  const eqMain = mkMath(wpRoom, 790, 258, '3x + 4 = 19', { size: 56, anchor: 'middle', fill: C.ink });
  const wpCheck = G(wp);
  const ck1 = mkMath(wpCheck, 790, 186, '3 × 7 + 4 = 25', { size: 50, anchor: 'middle', fill: C.ink });
  const ck2 = mkMath(wpCheck, 790, 262, '25 ≠ 19', { size: 50, anchor: 'middle', fill: '#FF6B6B' });
  const xk = cross(wpCheck, 18, '#FF6B6B'); tr(xk, 925, 246);
  const wpSub = G(wp);
  const sb1 = mkMath(wpSub, 770, 186, '3 × 5 + 4 = 19', { size: 50, anchor: 'middle', fill: C.ink });
  const sbT = tick(wpSub, 18, '#56D69B'); tr(sbT, 960, 170);
  const stampOk = eqStamp(wpSub, true);
  const bubSeven = mkSpeechBubble(Lfg, '{{x = 7}}?', { size: 40, tail: 'down', tailX: -40 });

  /* ---------- B: the working above the beam ---------- */
  const bp = G(Lfg);
  panel(bp, 565, 108, 440, 178);
  const chBoth = mkChip(bp, 'do the same to **both** sides', { size: 30, col: GOLD });
  tr(chBoth, 785, 196);
  const wk = mkWorking(bp, 700, 130, [
    { m: '3x + 4 = 19', note: '− 4 both sides' },
    { m: '3x = 15', note: '÷ 3 both sides' },
    { m: 'x = 5' }], { size: 40, gap: 16, noteX: 120, noteSize: 28, noteCol: GOLD });
  const lt = { judge: eqLowerThird(Lhud, 'judge'), mum: eqLowerThird(Lhud, 'mum') };

  /* ---------- C / J: the clue card on the wall ---------- */
  const CX = 780, CY = 305;
  const card = eqCard(cardL, 440, 390, { title: ' ' }); tr(card, CX, CY);
  const cTitle = (g, s) => T(g, -192, -145, s, { size: 30, weight: 800, fill: PURP });
  // socks and shoes
  const cs = G(card);
  cTitle(cs, 'SOCKS AND SHOES');
  const row = (g, y, items, ops, cols) => {
    const r = G(g), parts = [];
    items.forEach(([s, x]) => parts.push(mkMath(r, x, y, s, { size: 38, anchor: 'middle', fill: INK })));
    ops.forEach(([s, x1, x2], i) => {
      const a = G(r);
      arrow(a, x1, y - 13, x2, y - 13, { color: cols[i], width: 4, head: 12 });
      mkMath(a, (x1 + x2) / 2, y - 30, s, { size: 30, anchor: 'middle', fill: cols[i] });
      parts.push(a);
    });
    return { r, parts };
  };
  const r1 = row(cs, -50, [['x', -178], ['3x', -40], ['3x + 4', 130]], [['× 3', -158, -70, 0], ['+ 4', -10, 62]], [PURP, PURP]);
  const sockT = mkText(cs, -114, -2, 'socks', { size: 26, anchor: 'middle', fill: '#6A5A62' });
  const shoeT = mkText(cs, 26, -2, 'shoes', { size: 26, anchor: 'middle', fill: '#6A5A62' });
  const undoT = mkText(cs, 0, 50, 'undo in **reverse order**', { size: 28, anchor: 'middle', fill: INK, boldFill: RED });
  const r2 = row(cs, 120, [['3x + 4', -132], ['3x', 30], ['x', 172]], [['− 4', -62, 2], ['÷ 3', 60, 150]], [RED, RED]);
  const chInv = mkChip(cs, '**inverse operations**, reverse order', { size: 26, col: GREEN, solid: true, fill: '#DFF5E6' });
  tr(chInv, 0, 168);
  // lock 2: 3x = 12
  const c2 = G(card);
  cTitle(c2, 'LOCK 2');
  const wk2 = mkWorking(c2, -70, -100, [
    { m: '3x = 12' },
    { m: 'x = 12 − 3 = 9', col: RED },
    { m: 'x = 12 ÷ 3', col: GREEN },
    { m: '= 4', col: GREEN }], { size: 40, gap: 16, fill: INK });
  const st2 = strike(c2, wk2.left - 10, wk2.lineY[1] - 14, wk2.right + 10, RED);
  const note2 = mkText(c2, 0, 162, '{{3x}} means {{3 × x}}: **÷ 3** both sides', { size: 28, anchor: 'middle', fill: INK, boldFill: GREEN });
  const stampNo = eqStamp(c2, false);
  // lock 3: 6x + 11 = 2
  const c3 = G(card);
  cTitle(c3, 'LOCK 3');
  const wk3 = mkWorking(c3, -86, -98, [
    { m: '6x + 11 = 2' },
    { m: '6x = -9', note: '− 11' },
    { m: 'x = -9/6 = -3/2 = -1.5' }], { size: 36, gap: 16, fill: INK, noteX: 80, noteSize: 28, noteCol: PURP });
  const chk3 = G(c3);
  mkMath(chk3, -10, 162, '6 × (-1.5) + 11 = 2', { size: 32, anchor: 'middle', fill: GREEN });
  tr(tick(chk3, 14, GREEN), 170, 150);
  E('line', { x1: -196, y1: 118, x2: 196, y2: 118, stroke: '#D8C8A8', 'stroke-width': 2 }, chk3);
  T(chk3, -196, 108, 'check:', { size: 26, weight: 700, fill: '#6A5A62' });
  // chips over the room
  const chImp = mkChip(Lfg, '**impossible?!**', { size: 32, col: '#FF8A8A' });
  const chNeg = mkChip(Lfg, 'answers can be **negative**\nor **fractions**', { size: 30, col: GOLD });
  const chPad = mkChip(Lfg, '**−1.5**', { size: 30, col: GOLD });
  const chOpen = mkChip(Lfg, '**OPEN**', { size: 30, col: '#56D69B' });

  /* ---------- TH: Ex, unmasked ---------- */
  const exTH = cast(Lconf, 'ex');
  const plq = G(Lconf);
  E('rect', { x: -220, y: -130, width: 440, height: 260, rx: 18, fill: '#0E0A20', stroke: LILAC, 'stroke-width': 5 }, plq);
  T(plq, 0, -78, 'UNMASKED', { size: 36, weight: 800, anchor: 'middle', fill: LILAC, ls: 2 });
  mkMath(plq, 0, 20, 'x = -1.5', { size: 66, anchor: 'middle', fill: GOLD });
  mkMath(plq, 0, 104, '= -3/2', { size: 40, anchor: 'middle', fill: '#CFC2FF' });

  /* ---------- the cast ---------- */
  const dad = cast(room.mid, 'dad', { s: 0.78 });
  const kav = cast(room.mid, 'kavya', { s: 0.78 });
  const mum = cast(room.mid, 'mum', { s: 0.78 });
  const boy = cast(room.mid, 'boy', { s: 0.72 });
  const pri = cast(room.mid, 'priya', { s: 0.78 });
  const judge = cast(room.top, 'judge', { s: 0.8 });
  const XS = { dad: 80, kav: 174, mum: 268, boy: 358, pri: 448 }, Y0 = 452, HS = 0.7;
  const HUM = [[dad, 'dad'], [kav, 'kav'], [mum, 'mum'], [boy, 'boy'], [pri, 'pri']];

  /* ---------- shots ---------- */
  const k = id => at(id) - 0.06;
  const SHOTS = [['W', -9], ['B', k('order')], ['W', k('subst')], ['X', k('curses')], ['C', k('socks')], ['J', k('tipped')],
    ['C', k('neg')], ['J', k('overruled')], ['C', k('frac')], ['T', k('didnt')]];
  const shotAt = t => { let s = 'W'; for (const [n, t0] of SHOTS) if (t >= t0) s = n; return s; };
  const SPX = { dad: XS.dad, kavya: XS.kav, mum: XS.mum, boy: XS.boy, priya: XS.pri, judge: 300, narr: 790, ex: 790 };
  const lookTo = (x0, who) => (SPX[who] === undefined ? 0 : clamp((SPX[who] - x0) / 160, -1, 1) * 0.85);
  const tSplit = mid('level', 0.42), tLift = mid('level', 0.62), tFive = mid('share', 0.3), tPair = mid('share', 0.55);
  const tBag7 = mid('check', 0.3), tBack = end('check') + 0.25;

  return t => {
    const sh = shotAt(t), who = scWho(S, t);
    room.upd(t);
    room.clock.set(3502 - t);
    for (const kk in lt) lt[kk].set(0);
    [chRoom, chBoth, chImp, chNeg, chPad, chOpen, bubSeven].forEach(c => c.set(0));
    op(wp, 0); op(bp, 0); op(Lworld, sh === 'T' ? 0 : 1);
    HUM.forEach(([c]) => op(c, 0)); op(judge, 0); op(bal, 0); op(tableL, 0); op(card, 0); op(exPan, 0);
    room.keypad.set('', 0);
    Lworld.removeAttribute('transform');

    /* ---- the balance's state (by time, whatever the shot) ---- */
    const pre = t < at('level'), sub = sh === 'W' && t >= k('subst'), xs = sh === 'X';
    const restore = sub || xs;                       // Mum's check and Ex's jump use the original pans
    const liftP = restore ? 0 : P(t, tLift, 0.7, ease);
    op(w4L, restore ? 1 : 1 - liftP); tr(w4L, 84, -110 * liftP);
    const split = !restore && t >= tSplit;
    op(w19, split ? 0 : 1);
    const fiveOn = !restore && t >= tFive;
    op(w15, split && !fiveOn ? 1 : 0); tr(w15, -38, 0);
    op(w4R, split ? 1 - liftP : 0); tr(w4R, 66, -110 * liftP);
    w5.forEach((g, i) => { const p = fiveOn ? P(t, tFive + i * 0.08, 0.35, pop) : 0; op(g, clamp(p * 3)); });
    const pair = !restore && t >= tPair && t < end('share') + 1;
    bagsL.forEach((b, i) => {
      op(b, xs && i === 1 && t > at('curses') + 0.1 ? 0 : (pair && i !== 1 ? 0.3 : 1));
      b.val(sub ? '5' : t >= tBag7 && t < tBack ? '7' : '');
      const sw = t >= tBag7 && t < tBack ? 1 + 0.14 * P(t, tBag7, 0.3, pop) : 1;
      tr(b.inner, 0, 0, sw);
    });
    w5.forEach((g, i) => { if (pair && i !== 1) op(g, 0.3); });
    // the tip: hard to the left on 3 × 7 + 4 = 25, then it snaps back
    let tilt = 0;
    if (sh === 'W' && t >= tBag7 && t < tBack + 0.6) tilt = -P(t, tBag7 + 0.15, 0.35, easeOut) + P(t, tBack, 0.5, pop);

    /* ================= W: the room ================= */
    if (sh === 'W') {
      op(room.decor, 1);
      op(bal, 1); tr(bal, 800, 530, 0.85); bal.set(tilt);
      op(tableL, 1);
      tr(lab3x, 800 - 153, 618); tr(lab19, 800 + 153, 618);
      HUM.forEach(([c, key]) => { op(c, 1); tr(c, XS[key], key === 'boy' ? Y0 + 8 : Y0, key === 'boy' ? HS * 0.92 : HS); });
      op(wp, 1);
      const isRoom = t < at('seven') - 0.06, isCheck = t >= k('check') && t < k('order'), isSub = sub;
      op(wpRoom, t < k('check') ? 1 : 0); op(wpCheck, isCheck ? 1 : 0); op(wpSub, isSub ? 1 : 0);
      if (t < k('check')) {
        chRoom.set(P(t, at('room') + 0.1, 0.4, linear));
        fade(eqMain, t, mid('room', 0.62), 0.35);
        fade(lab3x, t, mid('room', 0.7), 0.35); fade(lab19, t, mid('room', 0.78), 0.35);
      }
      if (isCheck) { fade(ck1, t, at('check') + 0.15); fade(ck2, t, mid('check', 0.5)); fade(xk, t, mid('check', 0.6)); }
      if (isSub) {
        fade(sb1, t, at('subst') + 0.2); fade(sbT, t, mid('subst', 0.55));
        stampOk.set(P(t, mid('subst', 0.6), 0.35, linear)); tr(stampOk, 790, 254, 0.5);
        lt.mum.set(win(t, at('subst') + 0.1, at('subst') + 3.2, 0.3));
      }
      // the family
      const wrongNow = t >= mid('check', 0.55) && t < k('order');
      dad.set({ t, talk: talk(t, 'dad'), mood: wrongNow ? 'shock' : t >= at('seven') - 0.1 && t < k('check') ? 'smug' : isSub ? 'happy' : 'neutral',
        look: who === 'dad' ? 0.9 : who ? lookTo(XS.dad, who) : 0.9, lift: t >= at('seven') && t < end('seven') + 0.3 ? 1 : 0 });
      kav.set({ t, talk: talk(t, 'kavya'), mood: isCheck ? 'deadpan' : isSub ? 'happy' : 'neutral', look: isCheck ? (t < mid('check', 0.45) ? -0.8 : 0) : who ? lookTo(XS.kav, who) : 0.8 });
      mum.set({ t, talk: talk(t, 'mum'), mood: isSub ? 'happy' : wrongNow ? 'deadpan' : 'neutral', look: isSub ? 0.8 : who ? lookTo(XS.mum, who) : 0.8 });
      boy.set({ t, mood: isSub ? 'happy' : 'happy', look: who ? lookTo(XS.boy, who) : 0.8 });
      pri.set({ t, mood: wrongNow ? 'deadpan' : isSub ? 'happy' : 'neutral', look: who ? lookTo(XS.pri, who) : 0.8 });
      if (t >= at('seven') - 0.06 && t < k('check')) bubSeven.set(P(t, mid('seven', 0.3), 0.3, linear)), tr(bubSeven, XS.dad + 110, 250);
      void isRoom;
    }

    /* ================= B / X: the balance close-up, the judge on the table ================= */
    if (sh === 'B' || sh === 'X') {
      op(room.decor, 0);
      op(bal, 1); tr(bal, 790, 530, 0.9); bal.set(0);
      op(kav, 1); tr(kav, 84, Y0, HS);
      const jp = sh === 'B' ? P(t, at('order') - 0.06, 0.4, pop) : 1;
      op(judge, 1); tr(judge, 300, lerp(760, 428, jp), 0.8);
      const happyJ = t > mid('share', 0.8);
      judge.set({ t, talk: talk(t, 'judge'), mood: happyJ ? 'happy' : 'deadpan', look: sh === 'X' ? 0.9 : who === 'kavya' ? -0.8 : 0.3,
        bang: bangs(t, [at('order') + 0.15]) });
      kav.set({ t, talk: talk(t, 'kavya'), mood: happyJ ? 'smug' : 'neutral', look: 0.8 });
      if (sh === 'B') {
        op(bp, 1);
        lt.judge.set(win(t, at('order') + 0.1, at('order') + 3.2, 0.3));
        chBoth.set(t < at('level') ? P(t, mid('order', 0.6), 0.35, linear) : 0);
        wk.show(0, P(t, at('level') + 0.1, 0.35, linear));
        wk.show(1, P(t, at('share') + 0.1, 0.35, linear));
        wk.show(2, P(t, tPair, 0.35, linear));
        wk.ring(2, P(t, mid('share', 0.72), 0.3, linear));
      } else {
        // zoom into the left pan: Ex jumps out of the middle bag
        const push = P(t, k('curses'), end('curses') + 0.6 - k('curses'), linear);
        view(Lworld, 2.1 + 0.12 * push, 612, 350);
        op(exPan, 1);
        const jump = P(t, at('curses') + 0.05, 0.4, pop);
        tr(exPan, -34, lerp(30, -56, jump), 0.45);
        const um = P(t, mid('curses', 0.3), 0.55, ease);
        exPan.set({ t, talk: talk(t, 'ex'), mood: um < 0.4 ? 'smug' : t < mid('curses', 0.75) ? 'shock' : 'annoyed', look: 0.2,
          unmask: um, val: '5', cape: Math.sin(t * 5) * 0.4 * AMP });
      }
    }

    /* ================= C / J: the clue card ================= */
    if (sh === 'C' || sh === 'J') {
      op(room.decor, 0); op(card, 1);
      const sock = t < k('move'), lock2 = t >= k('move') && t < k('neg'), lock3 = t >= k('neg');
      op(cs, sock ? 1 : 0); op(c2, lock2 ? 1 : 0); op(c3, lock3 ? 1 : 0);
      if (sock) {
        const b0 = mid('socks', 0.14);
        r1.parts.forEach((p, i) => fade(p, t, b0 + [0, 0.5, 1.0, 0.25, 0.75][i] * 1.6));
        fade(sockT, t, b0 + 0.25 * 1.6); fade(shoeT, t, b0 + 0.75 * 1.6);
        fade(undoT, t, mid('socks', 0.5));
        const b1 = mid('socks', 0.58);
        r2.parts.forEach((p, i) => fade(p, t, b1 + [0, 0.45, 0.9, 0.22, 0.68][i] * 1.2));
        chInv.set(P(t, mid('socks', 0.84), 0.4, linear));
      }
      if (lock2) {
        wk2.show(0, P(t, at('move') + 0.15, 0.3, linear));
        wk2.show(1, P(t, mid('move', 0.55), 0.3, linear));
        st2.set(P(t, at('tipped') + 0.2, 0.3, linear));
        stampNo.set(P(t, at('tipped') + 0.1, 0.35, linear)); tr(stampNo, 100, wk2.lineY[1] - 26, 0.46);
        wk2.show(2, P(t, mid('tipped', 0.62), 0.3, linear));
        wk2.show(3, P(t, mid('tipped', 0.8), 0.3, linear));
        wk2.ring(3, P(t, mid('tipped', 0.88), 0.3, linear));
        op(note2, P(t, mid('tipped', 0.3), 0.3, linear));
      }
      if (lock3) {
        wk3.show(0, P(t, at('neg') + 0.2, 0.3, linear));
        wk3.show(1, P(t, mid('neg', 0.52), 0.3, linear));
        wk3.show(2, P(t, at('frac') + 0.15, 0.4, linear));
        wk3.ring(2, P(t, mid('frac', 0.45), 0.3, linear));
        op(chk3, P(t, mid('frac', 0.55), 0.35, linear));
      }
      if (sh === 'C') {
        HUM.forEach(([c, key]) => { op(c, 1); tr(c, XS[key], key === 'boy' ? Y0 + 8 : Y0, key === 'boy' ? HS * 0.92 : HS); });
        const pImp = lock3 && t < k('overruled') && t > mid('neg', 0.72);
        const opened = t > mid('frac', 0.8);
        dad.set({ t, mood: pImp ? 'shock' : opened ? 'happy' : 'neutral', look: who ? lookTo(XS.dad, who) : 0.8 });
        kav.set({ t, talk: talk(t, 'kavya'), mood: lock2 ? 'deadpan' : t >= at('frac') ? 'smug' : 'neutral', look: who === 'kavya' ? 0.8 : lock2 ? 0 : lookTo(XS.kav, who) });
        mum.set({ t, talk: talk(t, 'mum'), mood: sock ? 'neutral' : opened ? 'happy' : 'neutral', look: who === 'mum' ? 0.8 : lookTo(XS.mum, who) });
        boy.set({ t, mood: sock ? (t > mid('socks', 0.55) ? 'happy' : 'neutral') : opened ? 'happy' : pImp ? 'shock' : 'happy', look: sock ? lookTo(XS.boy, 'mum') : lookTo(XS.boy, who),
          lift: sock && t < mid('socks', 0.55) ? 1 : 0 });
        pri.set({ t, talk: talk(t, 'priya'), mood: lock2 ? 'smug' : pImp ? 'shock' : t >= at('frac') ? 'annoyed' : 'neutral',
          look: who === 'priya' ? 0.8 : lookTo(XS.pri, who), lift: lock2 && t > mid('move', 0.5) ? 1 : 0 });
        if (pImp) chImp.set(P(t, mid('neg', 0.72), 0.35, linear)), tr(chImp, 400, 214);
        if (t >= at('frac')) {
          const typed = t > mid('frac', 0.58), open = t > mid('frac', 0.8);
          room.keypad.set(typed ? '−1.5' : '', open ? 1 : 0);
          if (typed && !open) { chPad.set(P(t, mid('frac', 0.58), 0.3, linear)); tr(chPad, 1092, 372); }
          if (open) { chOpen.set(P(t, mid('frac', 0.8), 0.3, linear)); tr(chOpen, 1092, 372); }
        }
      } else {
        // the judge, big at the left, with Priya at the edge
        op(judge, 1); tr(judge, 320, 532 - 128 * 0.9, 0.9);
        op(pri, 1); tr(pri, 84, Y0, HS);
        const isT = t < k('neg');
        const t0 = isT ? at('tipped') : at('overruled');
        judge.set({ t, talk: talk(t, 'judge'), mood: 'annoyed', look: -0.6, tilt: (isT ? 1 : -1) * P(t, t0, 0.3, pop), bang: bangs(t, [t0 + 0.12]) });
        pri.set({ t, mood: t > t0 + 0.3 ? 'shock' : 'smug', look: 0.8 });
        if (!isT) { chNeg.set(P(t, mid('overruled', 0.4), 0.35, linear)); tr(chNeg, 330, 190); }
      }
    }

    /* ================= TH: Ex, unmasked ================= */
    conf.set(sh === 'T' ? 1 : 0, t);
    op(exTH, sh === 'T' ? 1 : 0); op(plq, sh === 'T' ? 1 : 0);
    if (sh === 'T') {
      const push = P(t, k('didnt'), 3.4, linear);
      tr(exTH, 330, 420, 1.42 * (1 + 0.05 * push));
      const um = P(t, at('didnt') + 0.1, 0.5, ease);
      exTH.set({ t, talk: talk(t, 'ex'), mood: t < mid('didnt', 0.45) ? 'shock' : 'happy', look: 0.4, unmask: um, val: '−1.5',
        cape: t > mid('didnt', 0.5) ? Math.sin((t - mid('didnt', 0.5)) * 7) * 0.5 * AMP : 0 });
      const pp = P(t, mid('didnt', 0.18), 0.45, pop);
      op(plq, clamp(pp * 2.5)); tr(plq, 860, 330, Math.max(0.01, 0.7 + 0.3 * pp));
    }
  };
});
