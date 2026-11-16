/* Scene 2: The Post Room (equations with brackets).
   Shots (hard sitcom cuts):
   W  the Post Room: pigeonhole lockers glow; the family behind the table, LOCKER 1 on the card at the right ->
      Ah Boy: 4(x + 3) = 20, his 4x + 3 = 20 in red.
   J  Judge Even pops up at the card: BANG, TIPPED! over Ah Boy's line.
   D  Dee rides in along the table, waving: delivers to EVERY term -> the showpiece: two delivery arrows from the 4,
      the parcels 4 × x = 4x and 4 × 3 = 12 land: 4(x + 3) = 4x + 12.
   K  the big card: Kavya EXPAND FIRST (4x + 12 = 20, 4x = 8, x = 2) | Priya DIVIDE FIRST (20 ÷ 4 = 5, x + 3 = 5, x = 2).
   F  the judge: both columns ticked; divide first when it divides exactly, otherwise expand.
   M  Mum and Dee at LOCKER 2: 5(x + 1) − 2(x − 3) = 26; the −2 delivers twice (−2x and +6); collect like terms,
      3x + 11 = 26, x = 5; the check 5 × 6 − 2 × 2 = 26; BALANCED; locker 2 swings open.
   Z  zoom into locker 2: Ex pops out, unmasked again: 5.
   T  the CCTV screen: Mr Tan's pun; *cricket*; a pair of socks.
   W  Dad: "Mine never do." odd socks. */
scene('brackets', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;
  const talk = (t, who) => scTalk(S, t, who);

  /* ---------- local helpers ---------- */
  const view = (el, k, fx, fy) => el.setAttribute('transform', `translate(600 375) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const fade = (el, t, t0, d) => { const p = P(t, t0, d || 0.3, linear); op(el, p); return p; };
  const pulse = (t, t0) => (t < t0 - 0.18 ? 0 : t < t0 ? P(t, t0 - 0.18, 0.18, easeIn) : 1 - P(t, t0 + 0.35, 0.35, ease));
  const GOLD = '#FFE45C', RED = '#D32F2F', GREEN = '#1E9E5A', INK = MK.ink, PURP = '#6A3CD8', ORANGE = '#E8751A', GREY = '#6A5A62';
  const cTitle = (g, h, s) => T(g, -0, 0, s, { size: 30, weight: 800, fill: PURP });
  void cTitle;
  /* x positions of pieces inside an mkMath typeset with anchor middle at cx */
  const mw = (src, size) => mkMeasure(src, { size }).w;
  const pos = (full, size, cx, pre, piece) => { const x0 = cx - mw(full, size) / 2, a = pre ? mw(pre, size) : 0; return x0 + a + mw(piece, size) / 2; };
  /* a delivery parcel with a maths label */
  function parcel(parent, src, w) {
    const g = G(parent);
    E('rect', { x: -w / 2, y: -30, width: w, height: 60, rx: 6, fill: '#E2B07A', stroke: SC_INK, 'stroke-width': 3.5 }, g);
    E('rect', { x: -10, y: -30, width: 20, height: 60, fill: '#D9C08A', opacity: 0.9 }, g);
    E('rect', { x: -w / 2 + 10, y: -20, width: w - 20, height: 40, rx: 5, fill: '#FFFDF6', stroke: '#B8A27A', 'stroke-width': 2 }, g);
    mkMath(g, 0, 12, src, { size: 32, anchor: 'middle', fill: INK });
    return g;
  }
  function sock(parent, col, stripe) {
    const g = G(parent);
    E('path', { d: 'M-18,-46 L18,-46 L18,2 Q20,14 36,16 Q56,20 54,36 Q52,48 34,48 L6,48 Q-18,48 -20,26 Z', fill: col, stroke: SC_INK, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, g);
    E('path', { d: 'M-18,-34 L18,-34 M-18,-22 L18,-22', stroke: stripe, 'stroke-width': 6 }, g);
    E('path', { d: 'M36,16 Q56,20 54,36 Q52,48 34,48 Z', fill: scShade(col, -0.25), stroke: SC_INK, 'stroke-width': 2.5 }, g);
    return g;
  }

  /* ---------- layers ---------- */
  const Lworld = G(root), Lmon = G(root), Lfg = G(root), Lhud = G(root);
  const room = eqRoom(Lworld, 'post');
  const cardL = G(room); room.insertBefore(cardL, room.mid);

  // the lockers glow; locker 2 (column 1, row 0) can swing open
  const glowL = G(room.decor);
  for (let i = 0; i < 5; i++) for (let j = 0; j < 4; j++) E('rect', { x: 130 + i * 92 - 3, y: 150 + j * 80 - 3, width: 90, height: 78, rx: 6, fill: 'none', stroke: '#FFC247', 'stroke-width': 5 }, glowL);
  const LKX = 222, LKY = 150;
  const lockerL = G(room); room.insertBefore(lockerL, room.mid);
  E('rect', { x: LKX + 4, y: LKY + 4, width: 76, height: 64, fill: '#1A0E08' }, lockerL);
  const exL = cast(lockerL, 'ex', { s: 0.3 });
  const door = G(lockerL);
  E('rect', { x: 0, y: 0, width: 84, height: 72, rx: 4, fill: '#8A6A50', stroke: '#3A2418', 'stroke-width': 3 }, door);
  E('circle', { cx: 70, cy: 36, r: 5, fill: '#E2B33C' }, door);
  T(door, 30, 44, '2', { size: 22, weight: 800, anchor: 'middle', fill: '#F7E9D0' });
  const doorAt = p => door.setAttribute('transform', `translate(${LKX} ${LKY}) scale(${(1 - 1.12 * p).toFixed(3)} 1)`);

  /* ---------- the small card (LOCKER 1) ---------- */
  const CX = 780, CY = 305;
  const cardS = eqCard(cardL, 440, 390, { title: ' ' }); tr(cardS, CX, CY);
  T(cardS, -192, -145, 'LOCKER 1', { size: 30, weight: 800, fill: PURP });
  const sRead = G(cardS);
  const rdEq = mkMath(sRead, 0, -30, '4(x + 3) = 20', { size: 54, anchor: 'middle', fill: INK });
  const rdBad = G(sRead);
  mkMath(rdBad, 0, 70, '4x + 3 = 20', { size: 46, anchor: 'middle', fill: RED });
  const rdStamp = eqStamp(rdBad, false); tr(rdStamp, 40, 128, 0.5);
  // the delivery
  const sBoth = G(cardS);
  const DE = '4(x + 3)', DS = 62, DY = -6;
  mkMath(sBoth, 0, DY, DE, { size: DS, anchor: 'middle', fill: INK });
  const x4 = pos(DE, DS, 0, '', '4'), xx = pos(DE, DS, 0, '4(', 'x'), x3 = mw('4(x + 3', DS) - mw('3', DS) / 2 - mw(DE, DS) / 2;
  const dTop = DY - DS * 0.78;
  const arX = arrow(sBoth, x4, dTop, xx, dTop + 4, { color: ORANGE, width: 5, head: 15, bend: -44 });
  const ar3 = arrow(sBoth, x4, dTop, x3, dTop + 4, { color: ORANGE, width: 5, head: 15, bend: -62 });
  const pX = parcel(sBoth, '4 × x = 4x', 196), p3 = parcel(sBoth, '4 × 3 = 12', 196);
  const dFull = mkMath(sBoth, 0, 168, '4(x + 3) = 4x + 12', { size: 40, anchor: 'middle', fill: GREEN });
  const chDee = mkChip(Lfg, 'delivers to **every** term', { size: 30, col: '#FFB347' });

  /* ---------- the big card ---------- */
  const BX = 665, BY = 305, BW = 670, BH = 410;
  const cardB = eqCard(cardL, BW, BH, { title: ' ' }); tr(cardB, BX, BY);
  const bT1 = G(cardB);
  T(bT1, -BW / 2 + 28, -BH / 2 + 50, 'LOCKER 1', { size: 30, weight: 800, fill: PURP });
  mkMath(bT1, -50, -BH / 2 + 52, '4(x + 3) = 20', { size: 36, anchor: 'start', fill: INK });
  const bT2 = G(cardB);
  T(bT2, -BW / 2 + 28, -BH / 2 + 50, 'LOCKER 2', { size: 30, weight: 800, fill: PURP });
  // K: two methods
  const kExp = G(cardB), kDiv = G(cardB);
  T(kExp, -165, -98, 'EXPAND FIRST', { size: 28, weight: 800, anchor: 'middle', fill: '#2E6FD8' });
  T(kDiv, 165, -98, 'DIVIDE FIRST', { size: 28, weight: 800, anchor: 'middle', fill: '#B8336A' });
  const kLine = E('line', { x1: 0, y1: -120, x2: 0, y2: 180, stroke: '#D8C8A8', 'stroke-width': 3 }, cardB);
  const wE = mkWorking(kExp, -150, -62, [
    { m: '4x + 12 = 20' }, { m: '4x = 8', note: '− 12' }, { m: 'x = 2', col: '#2E6FD8' }],
    { size: 36, gap: 22, fill: INK, noteX: 76, noteSize: 28, noteCol: PURP });
  const wD = mkWorking(kDiv, 170, -62, [
    { m: '20 ÷ 4 = 5', col: GREY }, { m: 'x + 3 = 5', note: '÷ 4' }, { m: 'x = 2', note: '− 3', col: '#B8336A' }],
    { size: 36, gap: 22, fill: INK, noteX: 76, noteSize: 28, noteCol: PURP });
  const tkE = tick(kExp, 20, GREEN); tr(tkE, -165, 160);
  const tkD = tick(kDiv, 20, GREEN); tr(tkD, 165, 160);
  const chFair = mkChip(Lfg, 'divide first when it **divides exactly**\notherwise, **expand**', { size: 30, col: GOLD });
  // M: the big locker
  const sBig = G(cardB);
  const BE = '5(x + 1) − 2(x − 3) = 26', BS = 46, BYL = -60;
  mkMath(sBig, 0, BYL, BE, { size: BS, anchor: 'middle', fill: INK });
  const bx0 = -mw(BE, BS) / 2;
  const at5 = bx0 + mw('5', BS) / 2, atX1 = bx0 + mw('5(', BS) + mw('x', BS) / 2, at1 = bx0 + mw('5(x + 1', BS) - mw('1', BS) / 2;
  const atM2 = bx0 + (mw('5(x + 1)', BS) + mw('5(x + 1) − 2', BS)) / 2, atX2 = bx0 + mw('5(x + 1) − 2(', BS) + mw('x', BS) / 2;
  const atM3 = bx0 + (mw('5(x + 1) − 2(x', BS) + mw('5(x + 1) − 2(x − 3', BS)) / 2;
  const bTop = BYL - BS * 0.76, bBot = BYL + 12;
  const arrM = G(sBig);
  const a5x = arrow(arrM, at5, bTop, atX1, bTop + 4, { color: PURP, width: 4, head: 13, bend: -30 });
  const a51 = arrow(arrM, at5, bTop, at1, bTop + 4, { color: PURP, width: 4, head: 13, bend: -44 });
  const a2x = arrow(arrM, atM2, bBot, atX2, bBot - 2, { color: RED, width: 4, head: 13, bend: 30 });
  const a23 = arrow(arrM, atM2 + 6, bBot, atM3, bBot - 2, { color: RED, width: 4, head: 13, bend: 42 });
  const nd1 = mkMath(sBig, -150, 60, '−2 × x = −2x', { size: 34, anchor: 'middle', fill: RED });
  const nd2g = G(sBig);
  const ND2 = '−2 × (−3) = +6';
  const glow6 = E('rect', { x: 150 + mw(ND2, 34) / 2 - mw('+6', 34) - 10, y: 60 - 34, width: mw('+6', 34) + 20, height: 46, rx: 10, fill: '#FFE45C' }, nd2g);
  mkMath(nd2g, 150, 60, ND2, { size: 34, anchor: 'middle', fill: RED });
  const wM = mkWorking(sBig, 10, -22, [
    { m: '5x + 5 − 2x + 6 = 26' }, { m: '3x + 11 = 26', note: 'collect like terms' }, { m: '3x = 15', note: '− 11' }, { m: 'x = 5', note: '÷ 3' }],
    { size: 34, gap: 8, fill: INK, noteX: 84, noteSize: 26, noteCol: PURP });
  const chkM = mkChip(sBig, 'check: {{5 × 6 − 2 × 2 = 26}} ✓', { size: 26, col: GREEN, solid: true, fill: '#DFF5E6' });
  tr(chkM, 0, 180);
  const stampOk = eqStamp(Lfg, true);

  /* ---------- the CCTV screen ---------- */
  const monBg = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#0E0A18', '#1E1430', true) }, Lmon);
  const monWrap = G(Lmon);
  const mon = eqMonitor(monWrap, 620, 400); tr(mon, 560, 380);
  const chCricket = mkChip(Lfg, '*cricket*', { size: 30, col: '#9FE0B5' });
  const socks = G(Lmon);
  T(socks, 0, -84, '( )', { size: 56, weight: 800, anchor: 'middle', fill: GOLD });
  tr(sock(socks, '#4CC9F0', '#FFFFFF'), -46, 0, 1); tr(sock(socks, '#4CC9F0', '#FFFFFF'), 30, 8, 1);
  T(socks, 0, 96, 'a pair', { size: 30, weight: 700, anchor: 'middle', fill: C.ink });
  void monBg;
  // odd socks for Dad
  const odd = G(Lfg);
  E('rect', { x: -130, y: -84, width: 260, height: 168, rx: 18, fill: 'rgba(10,27,39,0.9)', stroke: '#FF8A8A', 'stroke-width': 3 }, odd);
  tr(sock(odd, '#FF6B5C', '#FFE45C'), -62, -10, 0.85, -8); tr(sock(odd, '#56D69B', '#B48CFF'), 22, -6, 0.85, 8);
  T(odd, 0, 70, 'odd socks', { size: 28, weight: 800, anchor: 'middle', fill: '#FF8A8A' });

  /* ---------- the cast ---------- */
  const dad = cast(room.mid, 'dad', { s: 0.7 });
  const kav = cast(room.mid, 'kavya', { s: 0.7 });
  const mum = cast(room.mid, 'mum', { s: 0.7 });
  const boy = cast(room.mid, 'boy', { s: 0.65 });
  const pri = cast(room.mid, 'priya', { s: 0.7 });
  const judge = cast(room.top, 'judge', { s: 0.9 });
  const dee = cast(room.top, 'dee', { s: 0.8 });
  const XS = { dad: 80, kav: 174, mum: 268, boy: 358, pri: 448 }, Y0 = 452, HS = 0.7;
  const HUM = [[dad, 'dad'], [kav, 'kav'], [mum, 'mum'], [boy, 'boy'], [pri, 'pri']];
  const lt = { boy: eqLowerThird(Lhud, 'boy'), dee: eqLowerThird(Lhud, 'dee') };
  const chRoom = mkChip(Lfg, '**Room 2** · 49:18', { size: 30, col: GOLD });
  const chEvery = mkChip(Lfg, 'every locker: a **bracket**', { size: 30, col: '#FFB347' });

  /* ---------- shots ---------- */
  const k = id => at(id) - 0.06;
  const tDee = at('dee') + 1.35;
  const SHOTS = [['W', -9], ['J', k('dee')], ['D', tDee], ['K', k('expand')], ['F', k('fair')], ['M', k('big')], ['Z', k('again')],
    ['T', k('pun')], ['W', k('mine')]];
  const shotAt = t => { let s = 'W'; for (const [n, t0] of SHOTS) if (t >= t0) s = n; return s; };
  const SPX = { dad: XS.dad, kavya: XS.kav, mum: XS.mum, boy: XS.boy, priya: XS.pri, narr: 600 };
  const lookTo = (x0, who) => (SPX[who] === undefined ? 0.6 : clamp((SPX[who] - x0) / 160, -1, 1) * 0.85);
  const tOpen = mid('collect', 0.9);

  return t => {
    const sh = shotAt(t), who = scWho(S, t);
    room.upd(t);
    room.clock.set(2960 - t);
    for (const kk in lt) lt[kk].set(0);
    [chRoom, chEvery, chDee, chFair, chCricket].forEach(c => c.set(0));
    op(odd, 0); stampOk.set(0);
    HUM.forEach(([c]) => op(c, 0)); op(judge, 0); op(dee, 0);
    op(cardS, 0); op(cardB, 0); op(glowL, 0); op(exL, 0);
    op(Lworld, sh === 'T' ? 0 : 1); op(Lmon, sh === 'T' ? 1 : 0);
    Lworld.removeAttribute('transform');
    doorAt(sh === 'Z' ? 1 : sh === 'M' ? P(t, tOpen, 0.4, ease) : 0);
    const family = () => HUM.forEach(([c, key]) => { op(c, 1); tr(c, XS[key], key === 'boy' ? Y0 + 8 : Y0, key === 'boy' ? HS * 0.92 : HS); });

    /* ================= W: the Post Room ================= */
    if (sh === 'W') {
      family();
      if (t < k('dee')) {
        op(cardS, P(t, k('read'), 0.2, linear)); op(sRead, 1); op(sBoth, 0);
        op(glowL, t < k('read') ? (0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * 5))) * P(t, mid('room', 0.45), 0.4, linear) : 0);
        chRoom.set(t < k('read') ? P(t, at('room') + 0.1, 0.4, linear) : 0); tr(chRoom, 330, 150);
        chEvery.set(t < k('read') ? P(t, mid('room', 0.5), 0.4, linear) : 0); tr(chEvery, 780, 300);
        op(rdEq, P(t, at('read') + 0.15, 0.3, linear));
        op(rdBad, P(t, mid('read', 0.62), 0.3, linear)); rdStamp.set(0);
        lt.boy.set(win(t, at('read') + 0.1, at('read') + 3.2, 0.3));
        const rd = t >= at('read') - 0.1;
        dad.set({ t, mood: 'neutral', look: rd ? lookTo(XS.dad, 'boy') : 0.8 });
        kav.set({ t, mood: rd && t > mid('read', 0.65) ? 'deadpan' : 'neutral', look: rd ? lookTo(XS.kav, 'boy') : 0.8 });
        mum.set({ t, mood: 'neutral', look: rd ? lookTo(XS.mum, 'boy') : 0.8 });
        boy.set({ t, talk: talk(t, 'boy'), mood: 'happy', look: 0.6, lift: rd ? 1 : 0 });
        pri.set({ t, mood: rd && t > mid('read', 0.65) ? 'smug' : 'neutral', look: rd ? lookTo(XS.pri, 'boy') : 0.8 });
      } else {
        // "Mine never do."
        op(odd, P(t, at('mine') + 0.1, 0.3, linear)); tr(odd, 300, 210);
        const sad = t < mid('mine', 0.6);
        dad.set({ t, talk: talk(t, 'dad'), mood: sad ? 'sad' : 'smug', look: 0.3 });
        [kav, mum, boy, pri].forEach((c, i) => c.set({ t, mood: 'deadpan', look: -0.8 + 0 * i }));
      }
    }

    /* ================= J: the judge stamps Ah Boy's line ================= */
    if (sh === 'J') {
      op(cardS, 1); op(sRead, 1); op(sBoth, 0); op(rdEq, 1); op(rdBad, 1);
      op(boy, 1); tr(boy, 84, Y0 + 8, HS * 0.92);
      op(judge, 1);
      const jp = P(t, k('dee'), 0.3, pop);
      tr(judge, 330, lerp(760, 532 - 128 * 0.9, jp), 0.9);
      judge.set({ t, mood: 'annoyed', look: 0.7, tilt: P(t, at('dee') + 0.25, 0.3, pop), bang: pulse(t, at('dee') + 0.4) });
      rdStamp.set(P(t, at('dee') + 0.45, 0.35, linear));
      boy.set({ t, mood: t > at('dee') + 0.5 ? 'shock' : 'happy', look: 0.8 });
    }

    /* ================= D: Dee delivers ================= */
    if (sh === 'D') {
      op(cardS, 1);
      const inBoth = t >= k('both');
      op(sRead, inBoth ? 0 : 1); op(sBoth, inBoth ? 1 : 0); rdStamp.set(1); op(rdEq, 1); op(rdBad, 1);
      op(boy, 1); tr(boy, 84, Y0 + 8, HS * 0.92);
      op(dee, 1);
      const ride = P(t, tDee, 0.5, easeOut);
      tr(dee, lerp(760, 320, ride), 532 - 114 * 0.8 + (ride < 1 ? -6 * Math.abs(Math.sin(t * 20)) : 0), 0.8, ride < 1 ? -8 : 0);
      dee.set({ t, talk: talk(t, 'dee'), mood: 'happy', look: inBoth ? 0.9 : 0.2, wave: inBoth ? 0 : 1 });
      boy.set({ t, mood: inBoth ? 'happy' : 'shock', look: 0.8 });
      lt.dee.set(win(t, tDee + 0.2, tDee + 3.3, 0.3));
      chDee.set(!inBoth ? P(t, tDee + 0.6, 0.35, linear) : 0); tr(chDee, 330, 200);
      if (inBoth) {
        arX.set(P(t, at('both') + 0.1, 0.5, ease)); ar3.set(P(t, mid('both', 0.38), 0.5, ease));
        const dp = (g, t0, x) => { const p = P(t, t0, 0.4, easeOut); op(g, clamp(p * 3)); tr(g, x, 82 - 40 * (1 - p)); };
        dp(pX, mid('both', 0.22), -104); dp(p3, mid('both', 0.5), 104);
        op(dFull, P(t, mid('both', 0.72), 0.35, linear));
      }
    }

    /* ================= K / F: the two methods ================= */
    if (sh === 'K' || sh === 'F') {
      op(cardB, 1); op(bT1, 1); op(bT2, 0); op(kExp, 1); op(kDiv, 1); op(kLine, 1); op(sBig, 0);
      wE.show(0, P(t, at('expand') + 0.2, 0.3, linear)); wE.show(1, P(t, mid('expand', 0.5), 0.3, linear)); wE.show(2, P(t, mid('expand', 0.72), 0.3, linear));
      op(kDiv, t >= at('divide') - 0.1 ? 1 : 0); op(kExp.firstChild, 1);
      wD.show(0, P(t, mid('divide', 0.28), 0.3, linear)); wD.show(1, P(t, mid('divide', 0.4), 0.3, linear)); wD.show(2, P(t, mid('divide', 0.55), 0.3, linear));
      op(tkE, P(t, at('fair') + 0.3, 0.3, linear)); op(tkD, P(t, at('fair') + 0.5, 0.3, linear));
      wE.ring(2, P(t, at('fair') + 0.3, 0.3, linear)); wD.ring(2, P(t, at('fair') + 0.5, 0.3, linear));
      if (sh === 'K') {
        op(kav, 1); tr(kav, 88, Y0, HS); op(pri, 1); tr(pri, 224, Y0, HS);
        const pr = t >= at('divide') - 0.1;
        kav.set({ t, talk: talk(t, 'kavya'), mood: pr ? (t > mid('divide', 0.7) ? 'annoyed' : 'neutral') : 'smug', look: pr ? 0.8 : 0.9 });
        pri.set({ t, talk: talk(t, 'priya'), mood: pr ? 'smug' : 'neutral', look: pr ? 0.9 : -0.8, lift: pr && t > mid('divide', 0.6) ? 1 : 0 });
      } else {
        op(judge, 1); tr(judge, 180, 532 - 128 * 0.85, 0.85);
        judge.set({ t, talk: talk(t, 'judge'), mood: t > mid('fair', 0.4) ? 'happy' : 'deadpan', look: 0.8, tilt: 0 });
        chFair.set(P(t, mid('fair', 0.35), 0.4, linear)); tr(chFair, 665, 608);
      }
    }

    /* ================= M: the big locker ================= */
    if (sh === 'M') {
      op(cardB, 1); op(bT1, 0); op(bT2, 1); op(kExp, 0); op(kDiv, 0); op(kLine, 0); op(sBig, 1);
      op(mum, 1); tr(mum, 88, Y0, HS);
      op(dee, 1); tr(dee, 240, 532 - 114 * 0.72, 0.72);
      const col = t >= at('collect');
      // the deliveries
      const dl = col ? 1 - P(t, at('collect'), 0.3, linear) : 1;
      op(arrM, dl); op(nd1, dl); op(nd2g, dl);
      a5x.set(P(t, at('negdel') + 0.1, 0.4, ease)); a51.set(P(t, at('negdel') + 0.35, 0.4, ease));
      a2x.set(P(t, mid('negdel', 0.3), 0.45, ease)); a23.set(P(t, mid('negdel', 0.55), 0.45, ease));
      op(nd1, dl * P(t, mid('negdel', 0.42), 0.3, linear));
      op(nd2g, dl * P(t, mid('negdel', 0.72), 0.3, linear));
      op(glow6, t > mid('negdel', 0.8) ? 0.55 + 0.45 * Math.sin(t * 7) : 0);
      // collect
      wM.show(0, P(t, at('collect') + 0.2, 0.3, linear)); wM.show(1, P(t, mid('collect', 0.35), 0.3, linear));
      wM.show(2, P(t, mid('collect', 0.62), 0.3, linear)); wM.show(3, P(t, mid('collect', 0.74), 0.3, linear));
      wM.ring(3, P(t, mid('collect', 0.78), 0.3, linear));
      chkM.set(P(t, mid('collect', 0.82), 0.35, linear));
      stampOk.set(P(t, mid('collect', 0.86), 0.35, linear)); tr(stampOk, 665, 610, 0.5);
      const opened = t > tOpen;
      mum.set({ t, talk: talk(t, 'mum'), mood: opened ? 'happy' : 'neutral', look: who === 'dee' ? 0.8 : 0.9 });
      dee.set({ t, talk: talk(t, 'dee'), mood: 'happy', look: who === 'mum' ? -0.8 : 0.9, wave: who === 'dee' ? 1 : 0 });
    }

    /* ================= Z: Ex in locker 2 ================= */
    if (sh === 'Z') {
      const push = P(t, k('again'), end('again') + 0.8 - k('again'), linear);
      view(Lworld, 2.5 + 0.12 * push, 264, 196);
      op(exL, 1);
      const pp = P(t, at('again') + 0.05, 0.45, pop);
      tr(exL, LKX + 42, LKY + 70 - 34 * pp, 0.26 + 0.08 * pp);
      const um = P(t, at('again') + 0.35, 0.5, ease);
      exL.set({ t, talk: talk(t, 'ex'), mood: um < 0.5 ? 'shock' : 'annoyed', look: 0.1, unmask: um, val: '5', cape: Math.sin(t * 4) * 0.3 * AMP });
    }

    /* ================= T: Mr Tan's pun ================= */
    if (sh === 'T') {
      mon.upd(t);
      const push = P(t, k('pun'), end('pun') + 1.3 - k('pun'), linear);
      view(monWrap, 1 + 0.06 * push, 560, 380);
      mon.tan.set({ t, talk: talk(t, 'tan'), mood: 'happy', look: 0 });
      op(socks, P(t, mid('pun', 0.6), 0.3, linear)); tr(socks, 1010, 360);
      chCricket.set(P(t, end('pun') + 0.2, 0.3, linear)); tr(chCricket, 560, 650);
    }
  };
});
