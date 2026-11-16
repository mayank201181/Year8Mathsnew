/* Scene 5: The Library (forming and solving equations).
   Shots (hard sitcom cuts):
   W   the library: the family behind the table; "no equations, only words" -> Priya reads the scroll CLUE 1
       (three consecutive whole numbers add up to 96).
   B1  the big scroll: "Let n be the smallest number." Three book spines n, n + 1, n + 2; Ex peeks out from behind
       the scroll and bows (he likes being introduced properly) -> Mum: n + (n + 1) + (n + 2) = 96, 3n + 3 = 96,
       3n = 93, n = 31; the spines read 31, 32, 33; keypad 313233 OPEN.
   B2  CLUE 2: a straight line with (3x + 10)° and (2x + 20)°; Priya: 5x + 30 = 180, x = 30, "Done!" -> Kavya: the
       lock wants the angles: 3 × 30 + 10 = 100°, 2 × 30 + 20 = 80°, 100° + 80° = 180°.
   B3  CLUE 3: Ah Boy's picture frame (2x + 3) cm by x cm, perimeter 36 cm -> Mum: 2(2x + 3) + 2x = 36, 6x + 6 = 36,
       x = 5, length = 2 × 5 + 3 = 13 cm.
   W4  Ex leaps onto the table, unmasked: 5 (4th time), furious.
   M   the CCTV screen: Mr Tan's clue: Dad = 3 × Kavya; in 12 years Dad = 2 × Kavya.
   B4  CLUE 4: Let k be my age; table now / in 12 years; 3k + 12 = 2(k + 12) -> Mum: 3k + 12 = 2k + 24, k + 12 = 24,
       k = 12, Dad = 3 × 12 = 36.
   Wh  push in on Dad, suspicious -> M2 Mr Tan: PARENTS' EVENING -> Dad sinks behind the table. Hold. */
scene('forming', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;
  const talk = (t, who) => scTalk(S, t, who);

  /* ---------- local helpers ---------- */
  const view = (el, k, fx, fy) => el.setAttribute('transform', `translate(600 375) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const F = (t, t0, d) => P(t, t0, d || 0.3, linear);
  const pulse = (t, t0) => (t < t0 - 0.18 ? 0 : t < t0 ? P(t, t0 - 0.18, 0.18, easeIn) : 1 - P(t, t0 + 0.35, 0.35, ease));
  const GOLD = '#FFE45C', RED = '#D32F2F', GREEN = '#1E9E5A', INK = MK.ink, PURP = '#6A3CD8', BLUE = '#2E6FD8', ORANGE = '#E8751A', BROWN = '#8A5A30';
  const W_ = (s, size) => mkMeasure(s, { size }).w;
  const EQW = size => mkMeasure('=', { size }).w;
  const ring = (parent, x, y, w, h, col) => { const r = E('rect', { x, y, width: w, height: h, rx: 10, fill: 'none', stroke: col || GREEN, 'stroke-width': 4 }, parent); op(r, 0); return r; };

  /* ---------- layers ---------- */
  const Lworld = G(root), Lmon = G(root), Lfg = G(root), Lhud = G(root);
  const room = eqRoom(Lworld, 'library');
  const boardL = G(room); room.insertBefore(boardL, room.mid);     // boards: in front of the wall, behind the cast
  const exPeekL = G(boardL);                                        // Ex hides behind the big scroll
  const BX = 720, BY = 300;                                         // the big scroll (B shots): x 440-1000, y 90-510

  /* ================= W: the small scroll, CLUE 1 ================= */
  const cW = G(boardL);
  const cWc = eqCard(cW, 440, 380, { title: 'CLUE 1' }); tr(cWc, 780, 300);
  const clueTxt = mkText(cW, 780, 236, 'Three **consecutive**\n**whole numbers**\nadd up to **96**.', { size: 38, anchor: 'middle', fill: INK, boldFill: PURP, lh: 8 });
  const clueCode = mkText(cW, 780, 452, 'The code is the three numbers.', { size: 26, anchor: 'middle', fill: BROWN });
  const chRoom = mkChip(Lfg, '**Room 5** · 27:40', { size: 30, col: GOLD });
  const chWords = mkChip(Lfg, 'no equations · only **words**', { size: 32, col: '#FFB86B' });

  /* ================= B1: CLUE 1, the big scroll ================= */
  const c1 = G(boardL);
  const c1c = eqCard(c1, 560, 420, { title: 'CLUE 1' }); tr(c1c, BX, BY);
  const letN = mkText(c1, BX, 202, 'Let {{n}} be the smallest number.', { size: 32, anchor: 'middle', fill: PURP, weight: 800 });
  const SPX = [590, 720, 850], SPC = ['#B8336A', '#2E6FD8', '#1E9E5A'], SPL = ['n', 'n + 1', 'n + 2'], SPV = ['31', '32', '33'];
  const spines = SPX.map((x, i) => {
    const g = G(c1); tr(g, x, 266);
    E('rect', { x: -56, y: -50, width: 112, height: 100, rx: 6, fill: SPC[i], stroke: '#2A1A22', 'stroke-width': 3 }, g);
    E('path', { d: 'M-56,-38 L56,-38 M-56,38 L56,38', stroke: '#FFE45C', 'stroke-width': 4 }, g);
    g.lab = mkMath(g, 0, -2, SPL[i], { size: 34, anchor: 'middle', fill: '#FFFFFF' });
    g.val = T(g, 0, 32, SPV[i], { size: 28, weight: 800, anchor: 'middle', fill: GOLD });
    return g;
  });
  const S1 = 36, l1 = 'n + (n + 1) + (n + 2)', eq1X = 470 + W_(l1, S1) + 0.26 * S1 + EQW(S1) / 2;
  const wk1 = mkWorking(c1, eq1X, 334, [
    { m: 'n + (n + 1) + (n + 2) = 96' },
    { m: '3n + 3 = 96', note: 'collect' },
    { m: '3n = 93', note: '− 3' },
    { m: 'n = 31', note: '÷ 3', col: GREEN }], { size: S1, gap: 12, fill: INK, noteX: 120, noteSize: 26, noteCol: PURP });
  const exPeek = cast(exPeekL, 'ex', { s: 0.5 });

  /* ================= B2: CLUE 2, angles on a straight line ================= */
  const c2 = G(boardL);
  const c2c = eqCard(c2, 560, 420, { title: 'CLUE 2' }); tr(c2c, BX, BY);
  const OX = 720, OY = 288, RL = 112, RA = 80 * Math.PI / 180;
  const diag = G(c2);
  E('path', { d: `M478,${OY} L962,${OY}`, stroke: INK, 'stroke-width': 5, 'stroke-linecap': 'round' }, diag);
  E('path', { d: `M${OX},${OY} L${(OX + RL * Math.cos(RA)).toFixed(1)},${(OY - RL * Math.sin(RA)).toFixed(1)}`, stroke: INK, 'stroke-width': 5, 'stroke-linecap': 'round' }, diag);
  E('circle', { cx: OX, cy: OY, r: 6, fill: INK }, diag);
  const angR = mkAngleMark(c2, OX, OY, 0, 80, { r: 42, col: BLUE, width: 5 });
  const angL = mkAngleMark(c2, OX, OY, 80, 180, { r: 54, col: ORANGE, width: 5 });
  const labL = mkMath(c2, 600, 262, '(3x + 10)°', { size: 30, anchor: 'middle', fill: ORANGE });
  const labR = mkMath(c2, 842, 262, '(2x + 20)°', { size: 30, anchor: 'middle', fill: BLUE });
  const valL = mkMath(c2, 612, 264, '100°', { size: 40, anchor: 'middle', fill: GREEN });
  const valR = mkMath(c2, 836, 264, '80°', { size: 40, anchor: 'middle', fill: GREEN });
  const note180 = mkText(c2, BX, 330, 'angles on a straight line add up to **180°**', { size: 26, anchor: 'middle', fill: PURP, boldFill: PURP });
  const noteAsk = mkText(c2, BX, 330, 'the lock wants the **angles**, not {{x}}', { size: 26, anchor: 'middle', fill: RED, boldFill: RED });
  const S2 = 34;
  const wk2 = mkWorking(c2, 700, 352, [
    { m: '5x + 30 = 180' },
    { m: '5x = 150', note: '− 30' },
    { m: 'x = 30', note: '÷ 5', col: GREEN }], { size: S2, gap: 8, fill: INK, noteX: 130, noteSize: 26, noteCol: PURP });
  const wk2b = mkWorking(c2, 724, 352, [
    { m: '3 × 30 + 10 = 100°', col: ORANGE },
    { m: '2 × 30 + 20 = 80°', col: BLUE },
    { m: '100° + 80° = 180°', col: GREEN }], { size: S2, gap: 8, fill: INK });
  const tk2 = tick(c2, 14, GREEN); tr(tk2, wk2b.right + 26, wk2b.lineY[2] - 12);
  const chDone = mkChip(Lfg, 'Done!', { size: 30, col: '#B48CFF' });

  /* ================= B3: CLUE 3, the picture frame ================= */
  const c3 = G(boardL);
  const c3c = eqCard(c3, 560, 420, { title: 'CLUE 3' }); tr(c3c, BX, BY);
  const frm = G(c3);
  const FX0 = 600, FY0 = 206, FW = 221, FH = 85;                     // 13 by 5, to scale
  E('rect', { x: FX0, y: FY0, width: FW, height: FH, rx: 4, fill: '#9C6B3E', stroke: '#5A3618', 'stroke-width': 3 }, frm);
  E('rect', { x: FX0 + 12, y: FY0 + 12, width: FW - 24, height: FH - 24, fill: '#BFE6FF', stroke: '#5A3618', 'stroke-width': 2 }, frm);
  E('path', { d: `M${FX0 + 12},${FY0 + FH - 12} Q${FX0 + 70},${FY0 + 34} ${FX0 + 120},${FY0 + FH - 22} Q${FX0 + 160},${FY0 + 40} ${FX0 + FW - 12},${FY0 + FH - 16} L${FX0 + FW - 12},${FY0 + FH - 12} Z`, fill: '#56D69B' }, frm);
  E('circle', { cx: FX0 + FW - 44, cy: FY0 + 32, r: 10, fill: '#FFC247' }, frm);
  const fTop = mkMath(c3, FX0 + FW / 2, FY0 - 12, '(2x + 3) cm', { size: 28, anchor: 'middle', fill: ORANGE });
  const fSide = mkMath(c3, FX0 - 14, FY0 + FH / 2 + 10, 'x cm', { size: 28, anchor: 'end', fill: BLUE });
  const fPer = mkText(c3, FX0 + FW + 20, FY0 + 34, 'perimeter\n= **36 cm**', { size: 28, fill: PURP, boldFill: PURP, lh: 2 });
  const S3 = 32;
  const wk3 = mkWorking(c3, 690, 316, [
    { m: '2(2x + 3) + 2x = 36' },
    { m: '6x + 6 = 36', note: 'expand' },
    { m: 'x = 5', note: '− 6, ÷ 6', col: GREEN },
    { m: '"length" = 2 × 5 + 3 = 13 cm', col: PURP }], { size: S3, gap: 8, fill: INK, noteX: 150, noteSize: 26, noteCol: PURP });
  wk3.ring(3, 0);

  /* ================= M: the CCTV screen ================= */
  const monShot = G(Lmon);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#1A0E14', '#2E1A22', true) }, monShot);
  const monWrap = G(monShot);
  const mon = eqMonitor(monWrap, 560, 360); tr(mon, 380, 390);
  const tanCard = G(monWrap);
  const tcc = eqCard(tanCard, 440, 300, { title: "MR TAN'S CLUE" }); tr(tcc, 905, 390);
  const tc1 = mkText(tanCard, 905, 375, 'Dad = **3 ×** Kavya', { size: 36, anchor: 'middle', fill: INK, boldFill: ORANGE });
  const tc2 = mkText(tanCard, 905, 436, 'in **12** years:', { size: 30, anchor: 'middle', fill: PURP, boldFill: PURP });
  const tc3 = mkText(tanCard, 905, 492, 'Dad = **2 ×** Kavya', { size: 36, anchor: 'middle', fill: INK, boldFill: BLUE });
  const chPte = G(monWrap);
  E('rect', { x: -200, y: -52, width: 400, height: 104, rx: 18, fill: '#FFFDF6', stroke: RED, 'stroke-width': 6 }, chPte);
  T(chPte, 0, 14, "PARENTS' EVENING", { size: 38, weight: 800, anchor: 'middle', fill: RED, ls: 1 });

  /* ================= B4: CLUE 4, the ages ================= */
  const c4 = G(boardL);
  const c4c = eqCard(c4, 560, 420, { title: 'CLUE 4' }); tr(c4c, BX, BY);
  const letK = mkText(c4, BX, 202, 'Let {{k}} be my age in years.', { size: 30, anchor: 'middle', fill: PURP });
  const tab = mkTable(c4, [['', 'Kavya', 'Dad'], ['now', '{{k}}', '{{3k}}'], ['in 12 years', '{{k + 12}}', '{{3k + 12}}']],
    { size: 28, ink: INK, colW: [190, 140, 170], rowH: 50, fill: 'rgba(255,255,255,0.6)', headFill: 'rgba(76,201,240,0.3)', side: true });
  tr(tab, BX - 250, 222);
  const tabRow = r => tab.cells[r];
  const eq4 = mkMath(c4, BX, 432, '3k + 12 = 2(k + 12)', { size: 40, anchor: 'middle', fill: INK });
  const eq4n = mkText(c4, BX, 484, 'in 12 years: Dad = **2 ×** Kavya', { size: 26, anchor: 'middle', fill: PURP, boldFill: PURP });
  const S4 = 36;
  const wk4 = mkWorking(c4, 650, 178, [
    { m: '3k + 12 = 2(k + 12)' },
    { m: '3k + 12 = 2k + 24', note: 'expand' },
    { m: 'k + 12 = 24', note: '− 2k' },
    { m: 'k = 12', note: '− 12', col: GREEN },
    { m: '"Dad" = 3 × 12 = 36', col: PURP }], { size: S4, gap: 12, fill: INK, noteX: 210, noteSize: 26, noteCol: PURP });
  const r4k = ring(c4, 0, 0, 0, 0); const r4d = ring(c4, 0, 0, 0, 0, PURP);
  {
    const ln = wk4.lines[3], ld = wk4.lines[4];
    attr(r4k, 'x', ln.x1 - 10); attr(r4k, 'y', ln.y - ln.a - 6); attr(r4k, 'width', ln.x2 - ln.x1 + 20); attr(r4k, 'height', ln.a + ln.d + 12);
    const w36 = W_('36', S4);
    attr(r4d, 'x', ld.x2 - w36 - 10); attr(r4d, 'y', ld.y - ld.a - 6); attr(r4d, 'width', w36 + 20); attr(r4d, 'height', ld.a + ld.d + 12);
    r4k.remove(); ln.g.appendChild(r4k); r4d.remove(); ld.g.appendChild(r4d);
  }

  /* ================= the cast ================= */
  const kav = cast(room.mid, 'kavya', { s: 0.74 });
  const mum = cast(room.mid, 'mum', { s: 0.74 });
  const boy = cast(room.mid, 'boy', { s: 0.74 });
  {   // Ah Boy's picture frame, in his raised hand
    const pf = G(boy.hand); tr(pf, 0, -34, 1, -8);
    E('rect', { x: -46, y: -30, width: 92, height: 44, rx: 3, fill: '#9C6B3E', stroke: '#5A3618', 'stroke-width': 3 }, pf);
    E('rect', { x: -38, y: -22, width: 76, height: 28, fill: '#BFE6FF' }, pf);
    E('path', { d: 'M-38,6 Q-14,-14 4,2 Q20,-12 38,4 L38,6 Z', fill: '#56D69B' }, pf);
    boy.frame = pf;
  }
  const pri = cast(room.mid, 'priya', { s: 0.74 });
  const dad = cast(room.mid, 'dad', { s: 0.74 });
  const exT = cast(room.top, 'ex', { s: 0.62 });
  const ch4th = mkChip(Lfg, '**4th** time', { size: 32, col: '#FF8A8A' });
  const XS = { kav: 90, mum: 186, boy: 280, pri: 374, dad: 466 }, Y0 = 448, HS = 0.74;
  const HUM = [[kav, 'kav'], [mum, 'mum'], [boy, 'boy'], [pri, 'pri'], [dad, 'dad']];
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);
  op(blackout, 0);

  /* ---------- shots ---------- */
  const k = id => at(id) - 0.06;
  const tDadSink = end('pte') + 0.15;
  const SHOTS = [['W', -9], ['B1', k('let')], ['B2', k('angles')], ['B3', k('frame')], ['W4', k('four')], ['M', k('ages')],
    ['B4', k('letk')], ['Wh', k('how')], ['M2', k('pte')], ['Wd', tDadSink]];
  const shotAt = t => { let s = 'W'; for (const [n, t0] of SHOTS) if (t >= t0) s = n; return s; };
  const SPK = { kavya: XS.kav, mum: XS.mum, boy: XS.boy, priya: XS.pri, dad: XS.dad, ex: 760, tan: 900, narr: 780 };
  const lookTo = (x0, who) => (SPK[who] === undefined ? 0.6 : clamp((SPK[who] - x0) / 140, -1, 1) * 0.85);
  const placeAll = () => HUM.forEach(([c, key]) => { op(c, 1); tr(c, XS[key], Y0 + (key === 'boy' ? 6 : 0), HS); });
  // the keypad: each solved clue types its code and flashes OPEN
  const KEYS = [[mid('form', 0.8), end('form'), '313233'], [mid('asked', 0.8), end('asked'), '10080'],
    [mid('perim', 0.86), end('perim'), '13'], [mid('agesolve', 0.82), end('agesolve'), '12']];

  return t => {
    const sh = shotAt(t), who = scWho(S, t);
    room.upd(t);
    room.clock.set(1660 - t);
    let kt = '', ks = 0;
    KEYS.forEach(([a, b, code], i) => { const nx = KEYS[i + 1] ? KEYS[i + 1][0] - 0.8 : 1e9; if (t >= a && t < Math.min(nx, b + 2.5)) { kt = code; ks = t >= b ? 1 : 0; } });
    room.keypad.set(kt, ks);

    // hide everything, then show what this shot needs
    [chRoom, chWords, chDone, ch4th].forEach(c => c.set(0));
    HUM.forEach(([c]) => op(c, 0)); op(exT, 0); op(exPeek, 0); op(boy.frame, 0);
    [cW, c1, c2, c3, c4].forEach(g => op(g, 0));
    op(Lworld, 1); op(Lmon, 0);
    Lworld.removeAttribute('transform');
    op(room.decor, 1);

    /* ================= W: the library, CLUE 1 ================= */
    if (sh === 'W') {
      placeAll();
      const isRoom = t < k('clue');
      if (isRoom) {
        chRoom.set(F(t, at('room') - 0.1, 0.35)); tr(chRoom, 785, 134);
        chWords.set(F(t, mid('room', 0.62), 0.35)); tr(chWords, 780, 330);
      } else {
        op(cW, F(t, k('clue'), 0.25));
        op(clueTxt, F(t, at('clue') + 0.1, 0.3)); op(clueCode, F(t, mid('clue', 0.72), 0.3));
      }
      const sway = Math.sin(t * 1.3) * 0.7;
      kav.set({ t, talk: talk(t, 'kavya'), mood: 'neutral', look: isRoom ? sway : lookTo(XS.kav, 'priya') });
      mum.set({ t, talk: talk(t, 'mum'), mood: 'neutral', look: isRoom ? -sway : lookTo(XS.mum, 'priya') });
      boy.set({ t, talk: talk(t, 'boy'), mood: isRoom ? 'shock' : 'happy', look: isRoom ? sway : lookTo(XS.boy, 'priya') });
      pri.set({ t, talk: talk(t, 'priya'), mood: isRoom ? 'neutral' : 'happy', look: isRoom ? 0.9 : 0.9, lift: isRoom ? 0 : 1 });
      dad.set({ t, talk: talk(t, 'dad'), mood: isRoom ? 'neutral' : 'smug', look: isRoom ? -sway : -0.7 });
    }

    /* ================= B1: let n, 3n + 3 = 96 ================= */
    if (sh === 'B1') {
      op(c1, 1); op(room.decor, 0);
      const isForm = t >= k('form');
      op(letN, F(t, at('let') + 0.1, 0.3));
      spines.forEach((g, i) => {
        const p = P(t, mid('let', 0.42 + i * 0.13), 0.4, pop);
        op(g, clamp(p * 2.5)); tr(g, SPX[i], 266 + 30 * (1 - clamp(p)));
        op(g.val, F(t, mid('form', 0.76 + i * 0.04), 0.25));
      });
      wk1.show(0, isForm ? F(t, at('form') + 0.2) : 0);
      wk1.show(1, F(t, mid('form', 0.24))); wk1.show(2, F(t, mid('form', 0.48))); wk1.show(3, F(t, mid('form', 0.62)));
      wk1.ring(3, F(t, mid('form', 0.7)));
      // Ex peeks out from behind the scroll and bows on "Let n be"
      if (!isForm) {
        op(exPeek, 1);
        const pk = P(t, at('let') + 0.2, 0.5, ease), bow = P(t, mid('let', 0.3), 0.6, ease) * (1 - P(t, end('let') - 0.3, 0.4, ease));
        tr(exPeek, lerp(1110, 1036, pk), 300, 0.5, -24 * bow);
        exPeek.set({ t, mood: bow > 0.3 ? 'happy' : 'smug', look: -1, cape: 0 });
      }
      op(kav, 1); tr(kav, 112, Y0 + 2, 0.8); op(mum, 1); tr(mum, 292, Y0 + 2, 0.8);
      kav.set({ t, talk: talk(t, 'kavya'), mood: isForm && t > mid('form', 0.7) ? 'happy' : 'smug', look: who === 'kavya' ? 0.9 : -0.8 });
      mum.set({ t, talk: talk(t, 'mum'), mood: isForm && t > mid('form', 0.8) ? 'happy' : 'neutral', look: who === 'mum' ? 0.9 : -0.8, lift: isForm ? 1 : 0 });
    }

    /* ================= B2: the angles ================= */
    if (sh === 'B2') {
      op(c2, 1); op(room.decor, 0);
      const isAsk = t >= k('asked');
      op(diag, F(t, at('angles') + 0.05, 0.3));
      angL.set(P(t, mid('angles', 0.12), 0.5, linear)); angR.set(P(t, mid('angles', 0.3), 0.5, linear));
      const swap = isAsk ? P(t, mid('asked', 0.42), 0.2, linear) : 0, swap2 = isAsk ? P(t, mid('asked', 0.58), 0.2, linear) : 0;
      op(labL, F(t, mid('angles', 0.14), 0.3) * (1 - swap)); op(valL, swap);
      op(labR, F(t, mid('angles', 0.32), 0.3) * (1 - swap2)); op(valR, swap2);
      op(note180, F(t, mid('angles', 0.48), 0.3) * (isAsk ? 1 - F(t, at('asked'), 0.2) : 1));
      op(noteAsk, isAsk ? F(t, at('asked') + 0.1, 0.25) : 0);
      if (!isAsk) {
        op(wk2, 1); op(wk2b, 0); op(tk2, 0);
        wk2.show(0, F(t, mid('angles', 0.46))); wk2.show(1, F(t, mid('angles', 0.58))); wk2.show(2, F(t, mid('angles', 0.66)));
        wk2.ring(2, F(t, mid('angles', 0.72)));
        chDone.set(P(t, mid('angles', 0.8), 0.4, linear)); tr(chDone, 925, 470);
      } else {
        op(wk2, 0); op(wk2b, 1);
        wk2b.show(0, F(t, mid('asked', 0.38))); wk2b.show(1, F(t, mid('asked', 0.54))); wk2b.show(2, F(t, mid('asked', 0.68)));
        op(tk2, F(t, mid('asked', 0.74)));
      }
      op(pri, 1); tr(pri, 112, Y0 + 2, 0.8); op(kav, 1); tr(kav, 292, Y0 + 2, 0.8);
      pri.set({ t, talk: talk(t, 'priya'), mood: isAsk ? (t > mid('asked', 0.3) ? 'annoyed' : 'smug') : t > mid('angles', 0.86) ? 'smug' : 'happy', look: isAsk ? 0.8 : 0.9, lift: isAsk ? 0 : 1 });
      kav.set({ t, talk: talk(t, 'kavya'), mood: isAsk ? 'smug' : t > mid('angles', 0.9) ? 'deadpan' : 'neutral', look: isAsk ? 0.9 : -0.8 });
    }

    /* ================= B3: the picture frame ================= */
    if (sh === 'B3') {
      op(c3, 1); op(room.decor, 0);
      const isPer = t >= k('perim');
      const fp = P(t, at('frame') + 0.1, 0.45, pop);
      op(frm, clamp(fp * 2.5));
      op(fTop, F(t, mid('frame', 0.2))); op(fSide, F(t, mid('frame', 0.42))); op(fPer, F(t, mid('frame', 0.7)));
      wk3.show(0, isPer ? F(t, at('perim') + 0.25) : 0);
      wk3.show(1, F(t, mid('perim', 0.34))); wk3.show(2, F(t, mid('perim', 0.56))); wk3.show(3, F(t, mid('perim', 0.76)));
      wk3.ring(2, F(t, mid('perim', 0.62))); wk3.ring(3, F(t, mid('perim', 0.88)));
      op(boy, 1); tr(boy, 116, Y0 + 8, 0.8); op(mum, 1); tr(mum, 292, Y0 + 2, 0.8);
      boy.set({ t, talk: talk(t, 'boy'), mood: 'happy', look: isPer ? 0.8 : 0.9, lift: isPer ? 0 : 1 }); op(boy.frame, 1);
      mum.set({ t, talk: talk(t, 'mum'), mood: isPer && t > mid('perim', 0.85) ? 'happy' : 'neutral', look: isPer ? 0.9 : -0.8, lift: isPer ? 1 : 0 });
    }

    /* ================= W4: Ex, unmasked again ================= */
    if (sh === 'W4') {
      placeAll();
      op(exT, 1);
      const jump = P(t, at('four') - 0.08, 0.42, pop);
      tr(exT, 770, lerp(700, 456, jump), 0.62);
      const um = P(t, at('four') + 0.12, 0.5, ease);
      const rage = t > mid('four', 0.3);
      exT.set({ t, talk: talk(t, 'ex'), mood: um < 0.4 ? 'smug' : rage ? 'annoyed' : 'shock', look: -0.4, unmask: um, val: '5',
        cape: Math.sin(t * 9) * (rage ? 1 : 0.3) * AMP });
      ch4th.set(P(t, mid('four', 0.5), 0.35, linear)); tr(ch4th, 780, 170);
      const reac = t > at('four') + 0.4;
      [[kav, 'kav'], [mum, 'mum'], [boy, 'boy'], [pri, 'pri'], [dad, 'dad']].forEach(([c, key]) => c.set({ t,
        mood: key === 'boy' ? 'happy' : reac ? (key === 'dad' ? 'shock' : 'deadpan') : 'shock', look: 0.9 }));
    }

    /* ================= M / M2: the CCTV screen ================= */
    if (sh === 'M' || sh === 'M2') {
      op(Lworld, 0); op(Lmon, 1);
      mon.upd(t);
      const second = sh === 'M2';
      const push = second ? P(t, k('pte'), 1.6, linear) : P(t, k('ages'), 6, linear);
      view(monWrap, second ? 1.04 + 0.08 * push : 1 + 0.03 * push, 600, 380);
      op(tanCard, second ? 0 : 1);
      if (!second) {
        op(tc1, F(t, mid('ages', 0.2))); op(tc2, F(t, mid('ages', 0.45))); op(tc3, F(t, mid('ages', 0.6)));
      }
      const pp = second ? P(t, mid('pte', 0.3), 0.4, pop) : 0;
      op(chPte, clamp(pp * 2.5)); tr(chPte, 905, 390, Math.max(0.01, 0.7 + 0.3 * pp), -4);
      mon.tan.set({ t, talk: talk(t, 'tan'), mood: second ? 'deadpan' : 'happy', look: 0 });
    }

    /* ================= B4: the ages ================= */
    if (sh === 'B4') {
      op(c4, 1); op(room.decor, 0);
      const isSolve = t >= k('agesolve');
      const tabOff = isSolve ? 1 - F(t, at('agesolve'), 0.25) : 1;
      op(letK, F(t, at('letk') + 0.1) * tabOff);
      op(tab, F(t, mid('letk', 0.3)) * tabOff);
      op(tabRow(1)[1], F(t, mid('letk', 0.3))); op(tabRow(1)[2], F(t, mid('letk', 0.46)));
      op(tabRow(2)[1], F(t, mid('letk', 0.6))); op(tabRow(2)[2], F(t, mid('letk', 0.64)));
      op(eq4, F(t, mid('letk', 0.64)) * tabOff); op(eq4n, F(t, mid('letk', 0.68)) * tabOff);
      wk4.show(0, isSolve ? F(t, at('agesolve') + 0.2) : 0);
      wk4.show(1, F(t, mid('agesolve', 0.26))); wk4.show(2, F(t, mid('agesolve', 0.46))); wk4.show(3, F(t, mid('agesolve', 0.6)));
      wk4.show(4, F(t, mid('agesolve', 0.78)));
      op(r4k, F(t, mid('agesolve', 0.66))); op(r4d, F(t, mid('agesolve', 0.88)));
      const lead = isSolve ? mum : kav, leadWho = isSolve ? 'mum' : 'kavya';
      op(lead, 1); tr(lead, 112, Y0 + 2, 0.8); op(dad, 1); tr(dad, 292, Y0 + 2, 0.8);
      lead.set({ t, talk: talk(t, leadWho), mood: isSolve ? (t > mid('agesolve', 0.7) ? 'happy' : 'neutral') : 'smug', look: 0.9, lift: isSolve ? 1 : 0 });
      dad.set({ t, talk: talk(t, 'dad'), mood: isSolve && t > mid('agesolve', 0.85) ? 'shock' : t > mid('letk', 0.4) ? 'annoyed' : 'neutral', look: -0.8 });
    }

    /* ================= Wh / Wd: Dad, suspicious; then sinking ================= */
    if (sh === 'Wh' || sh === 'Wd') {
      placeAll();
      const sink = sh === 'Wd';
      if (sink) {
        const p = P(t, tDadSink + 0.1, 0.9, ease);
        tr(dad, XS.dad, Y0 + 70 * p, HS);
        view(Lworld, 1.55, 470, 400);
      } else {
        const p = P(t, k('how'), end('how') + 0.3 - k('how'), ease);
        view(Lworld, 1 + 0.5 * p, lerp(600, 470, p), lerp(375, 395, p));
      }
      kav.set({ t, mood: sink ? 'deadpan' : 'neutral', look: 0.8 });
      mum.set({ t, mood: sink ? 'deadpan' : 'neutral', look: 0.8 });
      boy.set({ t, mood: 'happy', look: 0.8 });
      pri.set({ t, mood: sink ? 'deadpan' : 'neutral', look: 0.8 });
      dad.set({ t, talk: talk(t, 'dad'), mood: sink ? 'sad' : 'annoyed', look: sink ? 0 : 1 });
    }
  };
});
