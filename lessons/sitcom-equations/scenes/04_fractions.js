/* Scene 4: The Glass Room (equations with fractions).
   Every lock is written on a window pane on the right wall; Wiper (the squeegee) stands on the table.
   Shots (hard sitcom cuts):
   W  the room: windows glint, Room 4 · 34:xx.
   K  Wiper slides along the table (lower third): x/3 = x ÷ 3, a fraction bar means divide, so multiply.
   W  Kavya: x/3 + 2 = 7 -> x/3 = 5 (− 2) -> x = 15 (× 3), with the bar x = 5 + 5 + 5.
   W  Priya: x/4 + 3 = 5 -> her x + 3 = 20, x = 17 (red).
   K  Wiper, annoyed: the un-multiplied 3 smudged and ringed, TIPPED!, x + 12 = 20, x = 8 (multiply EVERY term).
   K  the skylight: (2x − 1)/5 = 3; brackets appear round the numerator; × 5 first.
   W  Dad: 2x − 1 = 15, 2x = 16, x = 8, BALANCED; Dad amazed.
   K  the big window: x/2 + x/3 = 10, two denominators, LCM of 2 and 3 = 6, 6 × every term.
   W  Kavya: 3x + 2x = 60, 5x = 60, x = 12; the door opens.
   W  Priya: (2/3)x = 8, 2x = 24 (× 3), x = 12 (÷ 2).
   M  the CCTV screen: Mr Tan holds up a papyrus: x + x/7 = 19, about 1550 BCE.
   W  Ah Boy: "But did he escape?" Everyone turns to him. Hold. */
scene('fractions', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;
  const talk = (t, who) => scTalk(S, t, who);

  /* ---------- local helpers ---------- */
  const view = (el, k, fx, fy) => el.setAttribute('transform', `translate(600 375) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const fade = (el, t, t0, d) => { const p = P(t, t0, d || 0.3, linear); op(el, p); return p; };
  const GOLD = '#FFE45C', RED = '#D32F2F', GREEN = '#1E9E5A', INK = MK.ink, BLUE = '#1E6FB8', PURP = '#6A3CD8';
  const CX = 782, CY = 305, PW = 440, PH = 400;

  /* a window pane on the wall: pale glass in a white frame, a title and a rule */
  const pane = (parent, title) => {
    const g = G(parent);
    E('rect', { x: CX - PW / 2 + 7, y: CY - PH / 2 + 9, width: PW, height: PH, rx: 10, fill: 'rgba(0,0,0,0.3)' }, g);
    E('rect', { x: CX - PW / 2, y: CY - PH / 2, width: PW, height: PH, rx: 10, fill: linGrad('#F2FAFF', '#D6EEFC', true), stroke: '#E6EBEF', 'stroke-width': 12 }, g);
    E('path', { d: `M${CX + 60},${CY - PH / 2 + 8} L${CX + 120},${CY - PH / 2 + 8} L${CX - 20},${CY + PH / 2 - 8} L${CX - 80},${CY + PH / 2 - 8} Z`, fill: '#FFFFFF', opacity: 0.45 }, g);
    T(g, CX - PW / 2 + 26, CY - PH / 2 + 50, title, { size: 30, weight: 800, fill: BLUE });
    E('line', { x1: CX - PW / 2 + 18, y1: CY - PH / 2 + 66, x2: CX + PW / 2 - 18, y2: CY - PH / 2 + 66, stroke: '#6EC8FF', 'stroke-width': 3 }, g);
    return g;
  };
  const ringAt = (parent, x1, x2, y, s, col) => {
    const e = E('ellipse', { cx: (x1 + x2) / 2, cy: y - s * 0.32, rx: (x2 - x1) / 2 + s * 0.2, ry: s * 0.6, fill: 'none', stroke: col || RED, 'stroke-width': 4 }, parent);
    mkDash(e); e.set = p => { mkDraw(e, p); op(e, p > 0 ? 1 : 0); }; e.set(0);
    return e;
  };

  /* ---------- layers ---------- */
  const Lworld = G(root), Lmon = G(root), Lfg = G(root), Lhud = G(root);
  const room = eqRoom(Lworld, 'glass');
  const boardL = G(room); room.insertBefore(boardL, room.mid);
  // a glint sweeping across the two decor windows (clipped to the glass)
  const clip = E('clipPath', { id: 'eqfrGlint' }, defs());
  E('rect', { x: 110, y: 130, width: 200, height: 300 }, clip); E('rect', { x: 330, y: 130, width: 200, height: 300 }, clip);
  const glintC = G(room.decor, { 'clip-path': 'url(#eqfrGlint)' });
  const glint = E('path', { d: 'M0,0 L60,0 L-120,320 L-180,320 Z', fill: '#FFFFFF', opacity: 0.6 }, glintC);
  const chRoom = mkChip(Lfg, '**Room 4** · 34:50', { size: 30, col: GOLD });

  /* ---------- P0: what a fraction bar means ---------- */
  const p0 = pane(boardL, 'THE FRACTION BAR');
  const p0a = mkMath(p0, CX, 262, 'x/3 = x ÷ 3', { size: 56, anchor: 'middle', fill: INK });
  const p0b = mkText(p0, CX, 360, 'a fraction bar means **divide**', { size: 30, anchor: 'middle', fill: INK, boldFill: RED });
  const p0c = mkText(p0, CX, 420, 'so to clear it: **multiply**', { size: 30, anchor: 'middle', fill: INK, boldFill: GREEN });

  /* ---------- P1: x/3 + 2 = 7 ---------- */
  const p1 = pane(boardL, 'WINDOW 1');
  const wk1 = mkWorking(p1, CX - 30, 190, [
    { m: 'x/3 + 2 = 7' },
    { m: 'x/3 = 5', note: '− 2', noteCol: PURP },
    { m: 'x = 15', note: '× 3', noteCol: PURP, col: GREEN }], { size: 40, gap: 16, fill: INK, noteX: 110, noteSize: 30 });
  const bar1 = G(p1);
  mkMath(bar1, CX - 150, 466, 'x', { size: 36, anchor: 'middle', fill: INK });
  [0, 1, 2].forEach(i => { E('rect', { x: CX - 120 + i * 66, y: 428, width: 66, height: 52, fill: '#FFC247', stroke: INK, 'stroke-width': 3 }, bar1); T(bar1, CX - 87 + i * 66, 464, '5', { size: 30, weight: 800, anchor: 'middle', fill: INK }); });
  mkMath(bar1, CX + 92, 466, '= 15', { size: 36, fill: GREEN });

  /* ---------- P2: x/4 + 3 = 5, Priya's trap and the fix ---------- */
  const p2 = pane(boardL, 'WINDOW 2');
  const wk2 = mkWorking(p2, CX - 20, 190, [
    { m: 'x/4 + 3 = 5' },
    { m: 'x + 3 = 20', note: '× 4', noteCol: RED, col: RED },
    { m: 'x = 17', col: RED }], { size: 40, gap: 16, fill: INK, noteX: 100, noteSize: 30 });
  const wk2b = mkWorking(p2, CX - 20, 190, [
    { m: 'x/4 + 3 = 5' },
    { m: 'x + 12 = 20', note: '× 4', noteCol: GREEN, col: GREEN },
    { m: 'x = 8', note: '− 12', noteCol: GREEN, col: GREEN }], { size: 40, gap: 16, fill: INK, noteX: 100, noteSize: 30 });
  const eqW40 = mkMeasure('=', { size: 40 }).w, lEnd = CX - 20 - eqW40 / 2 - 0.26 * 40;
  const w3 = mkMeasure('3', { size: 40 }).w;
  const smudge = G(p2);
  E('ellipse', { cx: lEnd - w3 / 2, cy: wk2.lineY[1] - 14, rx: 26, ry: 22, fill: '#8F9CAB', opacity: 0.35 }, smudge);
  const r3 = ringAt(p2, lEnd - w3, lEnd, wk2.lineY[1], 40, RED);
  const strikes = [1, 2].map(i => strike(p2, wk2.lines[i].x1 - 8, wk2.lineY[i] - 13, wk2.lines[i].x2 + 8, RED));
  const every = mkText(p2, CX, 470, 'multiply **every** term', { size: 30, anchor: 'middle', fill: GREEN, boldFill: GREEN });
  const stNo = eqStamp(p2, false);

  /* ---------- P3: the skylight ---------- */
  const p3 = pane(boardL, 'SKYLIGHT');
  const wk3a = mkWorking(p3, CX - 20, 186, [{ m: '(2x - 1)/5 = 3' }], { size: 40, fill: INK });
  const wk3 = mkWorking(p3, CX - 20, 186, [
    { m: '((2x - 1))/5 = 3' },
    { m: '2x - 1 = 15', note: '× 5', noteCol: PURP },
    { m: '2x = 16', note: '+ 1', noteCol: PURP },
    { m: 'x = 8', note: '÷ 2', noteCol: PURP, col: GREEN }], { size: 40, gap: 14, fill: INK, noteX: 100, noteSize: 30 });
  const ch5 = mkChip(p3, '**× 5** first', { size: 28, col: GREEN, solid: true, fill: '#DFF5E6' });
  const chBr = mkText(p3, CX + 200, wk3.lineY[0] - 30, 'like a\n**bracket**', { size: 26, anchor: 'end', fill: PURP, boldFill: PURP });
  const stOk = eqStamp(p3, true);

  /* ---------- P4: the big window ---------- */
  const p4 = pane(boardL, 'THE BIG WINDOW');
  const lA = mkMath(p4, CX, 250, 'x/2 + x/3 = 10', { size: 44, anchor: 'middle', fill: INK });
  const lDen = mkChip(p4, 'two denominators', { size: 26, col: RED });
  const lLcm = mkText(p4, CX, 330, '**LCM** of 2 and 3 = **6**', { size: 32, anchor: 'middle', fill: INK, boldFill: PURP });
  const lBg = G(p4);
  const lB = mkMath(lBg, CX, 0, '6 × x/2 + 6 × x/3 = 6 × 10', { size: 36, anchor: 'middle', fill: INK });
  const lBn = mkText(lBg, CX, 62, '**× 6** every term', { size: 28, anchor: 'middle', fill: PURP, boldFill: PURP });
  const wk4 = mkWorking(p4, CX - 10, 280, [
    { m: '3x + 2x = 60' },
    { m: '5x = 60' },
    { m: 'x = 12', note: '÷ 5', noteCol: PURP, col: GREEN }], { size: 40, gap: 14, fill: INK, noteX: 100, noteSize: 30 });

  /* ---------- P5: two thirds of x ---------- */
  const p5 = pane(boardL, 'LAST PANE');
  const wk5 = mkWorking(p5, CX - 30, 196, [
    { m: '{2/3}x = 8' },
    { m: '2x = 24', note: '× 3', noteCol: PURP },
    { m: 'x = 12', note: '÷ 2', noteCol: PURP, col: GREEN }], { size: 44, gap: 22, fill: INK, noteX: 110, noteSize: 30 });
  const PANES = [p0, p1, p2, p3, p4, p5];
  // the wipe band: Wiper's squeegee stroke across the glass
  const band = E('rect', { x: 0, y: CY - PH / 2 + 10, width: 70, height: PH - 20, rx: 8, fill: '#FFFFFF', opacity: 0.85 }, boardL);

  /* ---------- M: the CCTV screen with the papyrus ---------- */
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#0E1A2A', '#1E3048', true) }, Lmon);
  const mon = eqMonitor(Lmon, 760, 440); tr(mon, 600, 390);
  tr(mon.tan.parentNode, -190, 440 * 0.2);
  const papy = G(mon.screen); tr(papy, 170, 20, 1, -3);
  E('path', { d: 'M-150,-140 L150,-140 Q162,-128 150,-116 L150,140 Q138,152 150,164 L-150,164 Q-162,152 -150,140 L-150,-116 Q-138,-128 -150,-140 Z', fill: linGrad('#F2DFA8', '#D9BC78', true), stroke: '#8A6A30', 'stroke-width': 4 }, papy);
  // a strip of little hieroglyphs: an eye, a bird, waves, a reed
  const hg = G(papy); tr(hg, 0, -96);
  E('path', { d: 'M-118,0 Q-98,-16 -78,0 Q-98,16 -118,0 Z M-34,8 Q-26,-18 -6,-10 L4,-14 L-2,-6 Q4,6 -10,10 Z M34,-6 l10,-8 l10,8 l10,-8 l10,8 M34,6 l10,-8 l10,8 l10,-8 l10,8 M104,14 L104,-18 Q116,-12 104,-6',
    fill: 'none', stroke: '#6B4A1E', 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, hg);
  E('circle', { cx: -98, cy: -96, r: 5, fill: '#6B4A1E' }, papy);
  const pEq = mkMath(papy, 0, 20, 'x + x/7 = 19', { size: 46, anchor: 'middle', fill: '#4A2E10' });
  const pDate = T(papy, 0, 110, 'about 1550 BCE', { size: 28, weight: 700, anchor: 'middle', fill: '#6B4A1E' });
  const chYears = mkChip(Lmon, 'about **3,500** years ago', { size: 32, col: GOLD });

  /* ---------- the cast ---------- */
  const dad = cast(room.mid, 'dad', { s: 0.74 });
  const kav = cast(room.mid, 'kavya', { s: 0.74 });
  const mum = cast(room.mid, 'mum', { s: 0.74 });
  const boy = cast(room.mid, 'boy', { s: 0.74 });
  const pri = cast(room.mid, 'priya', { s: 0.74 });
  const wiper = cast(room.top, 'wiper', { s: 0.85 });
  const XS = { dad: 85, kav: 185, mum: 285, boy: 380, pri: 475 }, Y0 = 448, HS = 0.74;
  const HUM = [[dad, 'dad'], [kav, 'kav'], [mum, 'mum'], [boy, 'boy'], [pri, 'pri']];
  const BY = { dad, kavya: kav, mum, boy, priya: pri };
  const lt = { wiper: eqLowerThird(Lhud, 'wiper') };
  const chOpen = mkChip(Lfg, '**OPEN**', { size: 30, col: '#56D69B' });

  /* ---------- shots ---------- */
  const k = id => at(id) - 0.06;
  const SHOTS = [['W', -9], ['K', k('wiper')], ['W', k('undo')], ['K', k('spot')], ['W', k('dad')], ['K', k('lcm')], ['W', k('six')], ['M', k('papyrus')], ['W', k('escape')]];
  const shotAt = t => { let s = 'W'; for (const [n, t0] of SHOTS) if (t >= t0) s = n; return s; };
  const SPX = { dad: XS.dad, kavya: XS.kav, mum: XS.mum, boy: XS.boy, priya: XS.pri, wiper: 760, narr: 780, tan: 780 };
  const lookTo = (x0, who) => (SPX[who] === undefined ? 0.8 : clamp((SPX[who] - x0) / 160, -1, 1) * 0.85);
  // which pane is up
  const paneAt = t => t < k('undo') ? 0 : t < k('trap') ? 1 : t < k('sky') ? 2 : t < k('lcm') ? 3 : t < k('coef') ? 4 : 5;
  const wipes = [mid('wiper', 0.1), at('spot') + 0.05, at('sky') + 0.05, at('lcm') + 0.05];
  const tOpen = mid('six', 0.9);

  return t => {
    const sh = shotAt(t), who = scWho(S, t);
    room.upd(t);
    room.clock.set(2090 - t);
    lt.wiper.set(0); chRoom.set(0); chOpen.set(0);
    HUM.forEach(([c]) => op(c, 0)); op(wiper, 0);
    op(Lworld, sh === 'M' ? 0 : 1); op(Lmon, sh === 'M' ? 1 : 0);
    Lworld.removeAttribute('transform');
    room.keypad.set(t >= tOpen ? '12' : '', t >= tOpen ? 1 : 0);
    // the glint across the windows at the start
    const gp = P(t, at('room') + 0.3, 1.4, ease);
    op(glintC, gp > 0 && gp < 1 ? 1 : 0); tr(glint, lerp(110, 720, gp), 120);

    /* ---- the pane on the wall ---- */
    const pi = paneAt(t);
    PANES.forEach((p, i) => op(p, i === pi && t >= at('wiper') - 0.06 && t < k('escape') ? 1 : 0));
    let bandX = -1;
    wipes.forEach(w0 => { const p = (t - w0) / 0.6; if (p >= 0 && p <= 1) bandX = p; });
    op(band, bandX >= 0 ? 1 : 0); attr(band, 'x', CX - PW / 2 + 10 + (PW - 90) * Math.max(0, bandX));
    if (pi === 0) {
      fade(p0a, t, mid('wiper', 0.15)); fade(p0b, t, mid('wiper', 0.38)); fade(p0c, t, mid('wiper', 0.6));
    }
    if (pi === 1) {
      wk1.show(0, P(t, at('undo') + 0.6, 0.3, linear));
      wk1.show(1, P(t, mid('undo', 0.45), 0.3, linear));
      wk1.show(2, P(t, mid('undo', 0.78), 0.3, linear)); wk1.ring(2, P(t, mid('undo', 0.88), 0.3, linear));
      fade(bar1, t, mid('undo', 0.86));
    }
    if (pi === 2) {
      const fix = t >= mid('spot', 0.5);
      op(wk2, fix ? 0 : 1); op(wk2b, fix ? 1 : 0);
      wk2.show(0, P(t, at('trap') + 0.5, 0.3, linear));
      wk2.show(1, P(t, mid('trap', 0.5), 0.3, linear)); wk2.show(2, P(t, mid('trap', 0.78), 0.3, linear));
      op(smudge, fix ? 0 : P(t, at('spot') + 0.6, 0.3, linear)); r3.set(fix ? 0 : P(t, at('spot') + 0.7, 0.4, linear));
      strikes.forEach(s => s.set(fix ? 0 : P(t, mid('spot', 0.32), 0.3, linear)));
      stNo.set(t < mid('spot', 0.5) ? P(t, mid('spot', 0.28), 0.35, linear) : 0); tr(stNo, CX + 60, wk2.lineY[2] - 40, 0.42);
      wk2b.show(0, 1); wk2b.show(1, P(t, mid('spot', 0.52), 0.3, linear)); wk2b.show(2, P(t, mid('spot', 0.8), 0.3, linear));
      wk2b.ring(2, P(t, mid('spot', 0.9), 0.3, linear));
      op(every, P(t, mid('spot', 0.55), 0.3, linear));
    }
    if (pi === 3) {
      const br = t >= mid('sky', 0.5);
      op(wk3a, br ? 0 : P(t, at('sky') + 0.5, 0.3, linear));
      wk3.show(0, br ? 1 : 0);
      op(chBr, P(t, mid('sky', 0.5), 0.3, linear));
      ch5.set(t < k('dad') ? P(t, mid('sky', 0.64), 0.35, linear) : 0); tr(ch5, CX + 120, wk3.lineY[0] + 52);
      wk3.show(1, P(t, at('dad') + 0.2, 0.3, linear));
      wk3.show(2, P(t, mid('dad', 0.28), 0.3, linear));
      wk3.show(3, P(t, mid('dad', 0.48), 0.3, linear)); wk3.ring(3, P(t, mid('dad', 0.56), 0.3, linear));
      stOk.set(P(t, mid('dad', 0.6), 0.35, linear)); tr(stOk, CX + 30, 466, 0.44);
    }
    if (pi === 4) {
      const sx = t >= k('six');
      const up = sx ? P(t, at('six') - 0.05, 0.4, ease) : 0;
      op(lA, (P(t, at('lcm') + 0.5, 0.3, linear)) * (1 - up));
      lDen.set(P(t, mid('lcm', 0.2), 0.3, linear) * (1 - P(t, mid('lcm', 0.4), 0.2, linear))); tr(lDen, CX, 292);
      op(lLcm, P(t, mid('lcm', 0.42), 0.3, linear) * (1 - up));
      op(lBg, P(t, mid('lcm', 0.6), 0.3, linear)); tr(lBg, 0, lerp(396, 216, up));
      op(lBn, 1 - up);
      wk4.show(0, P(t, at('six') + 0.3, 0.3, linear));
      wk4.show(1, P(t, mid('six', 0.5), 0.3, linear));
      wk4.show(2, P(t, mid('six', 0.75), 0.3, linear)); wk4.ring(2, P(t, mid('six', 0.85), 0.3, linear));
    }
    if (pi === 5) {
      wk5.show(0, P(t, at('coef') + 0.4, 0.3, linear));
      wk5.show(1, P(t, mid('coef', 0.5), 0.3, linear));
      wk5.show(2, P(t, mid('coef', 0.78), 0.3, linear)); wk5.ring(2, P(t, mid('coef', 0.86), 0.3, linear));
    }

    /* ================= W: the room ================= */
    if (sh === 'W') {
      HUM.forEach(([c, key]) => { op(c, 1); tr(c, XS[key], Y0, HS); });
      if (t < k('wiper')) { chRoom.set(P(t, at('room') + 0.1, 0.4, linear)); tr(chRoom, 785, 300); }
      const trapT = t >= k('trap') && t < k('spot');
      const dadT = t >= k('dad') && t < k('lcm');
      const amazed = dadT && t > mid('dad', 0.66);
      const esc = t >= k('escape');
      const opened = t >= tOpen && t < k('papyrus');
      dad.set({ t, talk: talk(t, 'dad'), mood: amazed ? (t > end('dad') ? 'happy' : 'shock') : dadT ? 'neutral' : esc ? 'neutral' : opened ? 'happy' : 'neutral',
        look: esc ? lookTo(XS.dad, 'boy') : who === 'dad' ? 0.9 : lookTo(XS.dad, who), lift: dadT && t < mid('dad', 0.6) ? 1 : 0 });
      kav.set({ t, talk: talk(t, 'kavya'), mood: amazed ? 'shock' : trapT ? 'deadpan' : opened ? 'smug' : esc ? 'neutral' : 'neutral',
        look: esc ? lookTo(XS.kav, 'boy') : who === 'kavya' ? 0.85 : amazed ? -0.8 : lookTo(XS.kav, who) });
      mum.set({ t, mood: amazed ? 'happy' : opened ? 'happy' : 'neutral', look: esc ? lookTo(XS.mum, 'boy') : amazed ? -0.8 : lookTo(XS.mum, who) });
      boy.set({ t, talk: talk(t, 'boy'), mood: esc ? 'neutral' : amazed ? 'shock' : 'happy', look: esc ? 0 : amazed ? -0.8 : lookTo(XS.boy, who), lift: esc && t < end('escape') ? 1 : 0 });
      pri.set({ t, talk: talk(t, 'priya'), mood: trapT ? 'smug' : amazed ? 'shock' : t >= k('coef') && t < k('papyrus') ? (t > mid('coef', 0.85) ? 'smug' : 'neutral') : 'neutral',
        look: esc ? lookTo(XS.pri, 'boy') : who === 'priya' ? 0.85 : lookTo(XS.pri, who), lift: trapT && t > mid('trap', 0.45) ? 1 : 0 });
      if (opened) { chOpen.set(P(t, tOpen, 0.3, linear)); tr(chOpen, 1092, 362); }
      // the escape question: slow push-in on Ah Boy and the long pause
      if (esc) { const p = P(t, k('escape'), 1.6, ease); view(Lworld, 1 + 0.3 * p, lerp(600, 470, p), lerp(375, 390, p)); }
    }

    /* ================= K: Wiper on the table ================= */
    if (sh === 'K') {
      const slide = P(t, at('wiper') - 0.06, 0.55, easeOut);
      const isIntro = t < k('undo');
      op(wiper, 1); tr(wiper, isIntro ? lerp(-200, 330, slide) : 330, 530 - 140 * 0.85, 0.85);
      const spotT = t >= k('spot') && t < k('sky');
      const angry = spotT && t < mid('spot', 0.45);
      const wiping = wipes.some(w0 => t >= w0 - 0.1 && t < w0 + 0.8) || isIntro;
      wiper.set({ t, talk: talk(t, 'wiper'), mood: angry ? 'annoyed' : 'happy', look: 0.6, wipe: wiping ? 1 : angry ? 0.6 : 0 });
      if (isIntro) lt.wiper.set(win(t, at('wiper') + 0.3, at('wiper') + 3.4, 0.3));
      // one human at the edge of the shot reacts
      const edge = isIntro ? 'kavya' : spotT ? 'priya' : t < k('dad') ? 'dad' : 'kavya';
      const h = BY[edge]; op(h, 1); tr(h, 92, Y0, 0.8);
      let mood = 'neutral';
      if (spotT) mood = t < mid('spot', 0.4) ? 'shock' : 'annoyed';
      else if (edge === 'dad') mood = t > mid('sky', 0.6) ? 'smug' : 'neutral';
      else if (!isIntro) mood = t > mid('lcm', 0.75) ? 'happy' : 'neutral';
      h.set({ t, mood, look: 0.8 });
    }

    /* ================= M: the CCTV screen ================= */
    if (sh === 'M') {
      mon.upd(t);
      mon.tan.set({ t, talk: talk(t, 'tan'), mood: t > end('papyrus') ? 'smug' : 'happy', look: 0.5 });
      const pp = P(t, at('papyrus') + 0.1, 0.45, pop);
      op(papy, clamp(pp * 3)); tr(papy, 170, lerp(240, 20, clamp(pp)), 1, -3);
      fade(pEq, t, mid('papyrus', 0.3)); fade(pDate, t, mid('papyrus', 0.55));
      chYears.set(P(t, mid('papyrus', 0.6), 0.35, linear)); tr(chYears, 600, 660);
    }
  };
});
