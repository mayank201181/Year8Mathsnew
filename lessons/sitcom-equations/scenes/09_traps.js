/* Scene 9: The Vault saves you some marks.
   Shots: "6 EXAM TRAPS" over the vault door, the six presenters line up with numbers -> six snappy talking heads,
   one trap card each (Judge Even: undo the + 4 first, not x + 4 = 19/3; Dee: −3(x − 4) = −3x + 12, not −3x − 12;
   Kavya: 5x − 2 = 2x + 13 gives 3x = 15, not 11; Wiper: × EVERY term, EVERY. SINGLE. WINDOW.; Priya: answer the
   question: 100° and 80°, not x = 30; Snappy: x > 5 is a range, open circle, never x = 5, check) -> logo
   "BALANCING ACT will return" -> the lobby: the family bursts out of the door, Mr Tan behind the desk, the clock
   on 00:07 -> Dad, push-in: "Seven." -> the leaderboard gets a fourth row, BALANCING ACT 59:53, and Ex, mask back on,
   pops up beside it: "Curses. Again." Hold. */
scene('traps', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;
  const talk = (t, who) => scTalk(S, t, who);

  /* ---------- helpers ---------- */
  const view = (el, k, fx, fy) => el.setAttribute('transform', `translate(600 375) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r || 0); return p; };
  const outline = (el, col, w) => { el.setAttribute('stroke', col); el.setAttribute('stroke-width', w); el.setAttribute('paint-order', 'stroke'); el.setAttribute('stroke-linejoin', 'round'); return el; };
  const pulse = (t, t0) => (t < t0 - 0.18 ? 0 : t < t0 ? P(t, t0 - 0.18, 0.18, easeIn) : 1 - P(t, t0 + 0.35, 0.35, ease));
  const GOLD = '#FFE45C', INK = MK.ink, GREEN = '#1E9E5A', RED = '#C62828', PURP = '#6A3CD8', ORANGE = '#E8751A', GREY = '#6A5A62', LILAC = '#B48CFF';
  const CX = 880;
  function trCard(parent, n) {
    const g = G(parent);
    E('rect', { x: 606, y: 136, width: 560, height: 470, rx: 18, fill: 'rgba(0,0,0,0.3)' }, g);
    E('rect', { x: 600, y: 130, width: 560, height: 470, rx: 18, fill: MK.paper, stroke: '#B8A27A', 'stroke-width': 5 }, g);
    const head = chip(g, 'TRAP ' + n, { size: 30, fill: '#D32F2F', color: '#FFFFFF', weight: 800 }); tr(head, CX, 182);
    return g;
  }
  const txt = (parent, y, s, o) => mkText(parent, CX, y, s, Object.assign({ size: 34, anchor: 'middle', fill: INK }, o || {}));
  const fadeIn = (el, t, t0) => { const p = P(t, t0, 0.3, easeOut); op(el, p); tr(el, 0, 10 * (1 - p)); };
  function trNo(parent, y, s, o) {
    const g = G(parent), m = txt(g, y, s, Object.assign({ fill: RED }, o || {}));
    const sl = strike(g, CX - m.w / 2 - 10, y - 12, CX + m.w / 2 + 10, RED);
    const x = cross(g, 14, RED); tr(x, CX + m.w / 2 + 38, y - 12);
    g.set = p => { sl.set(p); op(x, p > 0.9 ? 1 : 0); };
    return g;
  }
  const okTick = (parent, x, y) => { const g = tick(parent, 15, GREEN); tr(g, x, y); return g; };

  /* ---------- layers ---------- */
  const Lworld = G(root), Lconf = G(root), Lth = G(root), Lfg = G(root), Lhud = G(root);

  /* ---------- sets ---------- */
  const vault = eqRoom(Lworld, 'vault');
  const dim = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#06080C', opacity: 0.55 }, vault);
  const lobWrap = G(Lworld);
  const lob = eqLobby(lobWrap);
  const row4 = G(lob.mid);   // the new leaderboard row (world coords; the leaderboard is centred at 175, 340)
  const r4hl = E('rect', { x: 50, y: 438, width: 250, height: 30, rx: 6, fill: '#FFE45C', opacity: 0.25 }, row4);
  T(row4, 59, 460, '4. BALANCING ACT', { size: 18, weight: 700, fill: '#FFE45C' });
  T(row4, 291, 460, '59:53', { size: 21, weight: 800, anchor: 'end', fill: '#FFE45C' });
  const seven = G(lob.top);
  { const s7 = outline(T(seven, 0, 0, '7', { size: 54, weight: 800, anchor: 'middle', fill: GOLD }), '#5A3A07', 8); void s7;
    [[-44, -30, 10], [40, -44, 8], [48, 6, 6], [-36, 12, 6]].forEach(([x, y, r]) => E('path', { d: `M${x},${y - r * 1.8} L${x + r * 0.4},${y - r * 0.4} L${x + r * 1.8},${y} L${x + r * 0.4},${y + r * 0.4} L${x},${y + r * 1.8} L${x - r * 0.4},${y + r * 0.4} L${x - r * 1.8},${y} L${x - r * 0.4},${y - r * 0.4} Z`, fill: '#FFFFFF' }, seven)); }
  const conf = eqConf(Lconf, 'judge');
  const TINT = {}; for (const kk in EQ_TINT) TINT[kk] = linGrad(EQ_TINT[kk][0], EQ_TINT[kk][1], true);
  const logoBg = G(Lconf);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#1A0E3A', '#4A2A8A', true) }, logoBg);
  let rays = '';
  for (let i = 0; i < 16; i++) { const a0 = i / 16 * TAU, a1 = a0 + TAU / 40; rays += `M0,0 L${(Math.cos(a0) * 1100).toFixed(0)},${(Math.sin(a0) * 1100).toFixed(0)} L${(Math.cos(a1) * 1100).toFixed(0)},${(Math.sin(a1) * 1100).toFixed(0)} Z `; }
  const rayP = E('path', { d: rays, fill: '#FFE45C', opacity: 0.07 }, logoBg);
  E('ellipse', { cx: 600, cy: 610, rx: 600, ry: 170, fill: glow('#B48CFF'), opacity: 0.35 }, logoBg);

  /* ===== intro ===== */
  const sI = G(Lhud);
  const iHead = outline(T(sI, 600, 236, '6 EXAM TRAPS', { size: 80, weight: 800, anchor: 'middle', fill: GOLD, ls: 3 }), '#3A2A07', 10);
  const iSub = outline(T(sI, 600, 296, 'the Vault saves you some marks', { size: 34, weight: 700, anchor: 'middle', fill: '#FFFFFF' }), '#06080C', 8);
  const ROWX = [130, 290, 450, 610, 770, 920];
  const badges = ROWX.map((x, k) => { const g = G(sI); E('circle', { r: 26, fill: GOLD, stroke: SC_INK, 'stroke-width': 4 }, g); T(g, 0, 11, String(k + 1), { size: 30, weight: 800, anchor: 'middle', fill: SC_INK }); return g; });

  /* ===== trap cards ===== */
  // 1 Judge Even: undo the + 4 first
  const c1 = trCard(Lfg, 1);
  const c1a = txt(c1, 268, '{{3x + 4 = 19}}', { size: 48 });
  const c1b = txt(c1, 332, 'undo the **+ 4** first', { size: 36, boldFill: PURP });
  const c1c = trNo(c1, 416, '{{x + 4 = 19/3}}', { size: 38 });
  const c1d = txt(c1, 470, '(the 4 never got divided)', { size: 26, fill: GREY });
  const c1e = G(c1); txt(c1e, 548, '{{3x = 15}},  so  {{x = 5}}', { size: 40, fill: GREEN }); okTick(c1e, CX + 186, 532);
  // 2 Dee: deliver to every term
  const c2 = trCard(Lfg, 2);
  const E2 = '−3(x − 4)', S2 = 52, Y2 = 296;
  const e2 = G(c2); mkMath(e2, CX, Y2, E2, { size: S2, anchor: 'middle', fill: INK });
  const w2 = mkMeasure(E2, { size: S2 }).w, x2a = CX - w2 / 2 + mkMeasure('−3', { size: S2 }).w / 2,
    x2x = CX - w2 / 2 + mkMeasure('−3(', { size: S2 }).w + mkMeasure('x', { size: S2 }).w / 2,
    x24 = CX - w2 / 2 + (mkMeasure('−3(x', { size: S2 }).w + mkMeasure('−3(x − 4', { size: S2 }).w) / 2;
  const a2a = arrow(c2, x2a, Y2 - 42, x2x, Y2 - 38, { color: ORANGE, width: 5, head: 14, bend: -30 });
  const a2b = arrow(c2, x2a, Y2 - 42, x24, Y2 - 38, { color: ORANGE, width: 5, head: 14, bend: -46 });
  const c2b = txt(c2, 374, '{{−3 × x = −3x}}', { size: 34 });
  const c2c = txt(c2, 428, '{{−3 × (−4) = +12}}', { size: 34 });
  const c2d = G(c2); txt(c2d, 496, '{{−3(x − 4) = −3x + 12}}', { size: 40, fill: GREEN }); okTick(c2d, CX + 236, 480);
  const c2e = trNo(c2, 560, '{{−3x − 12}}', { size: 36 });
  // 3 Kavya: watch the signs
  const c3 = trCard(Lfg, 3);
  const c3w = mkWorking(c3, 880, 236, [
    { m: '5x − 2 = 2x + 13' }, { m: '3x − 2 = 13', note: '− 2x' }, { m: '3x = 15', note: '+ 2', col: GREEN }],
    { size: 42, gap: 20, fill: INK, noteX: 150, noteSize: 30, noteCol: PURP });
  const c3t = okTick(c3, 0, 0); tr(c3t, 1000, c3w.lineY[2] - 14);
  const c3n = trNo(c3, 540, '{{3x = 11}}', { size: 40 });
  const c3s = txt(c3, 486, '−2 moves over as **+ 2**', { size: 28, fill: GREY, boldFill: GREEN });
  // 4 Wiper: every term
  const c4 = trCard(Lfg, 4);
  const c4a = txt(c4, 266, '× **every** term', { size: 48, boldFill: '#1E6FB8' });
  const c4b = txt(c4, 352, '{{x/4 + 3 = 5}}', { size: 40 });
  const c4c = G(c4); txt(c4c, 438, '{{× 4}}:  {{x + 12 = 20}}', { size: 38, fill: GREEN }); okTick(c4c, CX + 196, 424);
  const c4s = ['EVERY.', 'SINGLE.', 'WINDOW.'].map(w => mkStamp(c4, w, '#1E6FB8'));
  // 5 Priya: answer the question asked
  const c5 = trCard(Lfg, 5);
  const c5a = txt(c5, 262, 'answer the **question**', { size: 42, boldFill: '#B8336A' });
  const c5b = txt(c5, 330, 'angles {{(3x + 10)°}} and {{(2x + 20)°}}', { size: 30 });
  const c5c = G(c5); tr(txt(c5c, 394, '{{x = 30}}', { size: 40 }), -70, 0);
  const c5chip = mkChip(c5c, 'not the answer!', { size: 26, col: '#B8336A' }); tr(c5chip, CX + 110, 382);
  const c5d = G(c5); txt(c5d, 470, '{{3 × 30 + 10 = 100°}}', { size: 36, fill: GREEN });
  const c5e = G(c5); txt(c5e, 528, '{{2 × 30 + 20 = 80°}}', { size: 36, fill: GREEN }); okTick(c5e, CX + 170, 514);
  const c5f = txt(c5, 578, 'the angle · the length · the age', { size: 26, fill: GREY });
  // 6 Snappy: a range, and check
  const c6 = trCard(Lfg, 6);
  const c6a = G(c6); txt(c6a, 266, '{{x > 5}}  is a **range**', { size: 44, boldFill: GREEN });
  const nl = mkNumberLine(c6, { from: 2, to: 9, len: 420, size: 28, ink: INK }); tr(nl, CX - 210, 352);
  const ray = G(c6);
  E('line', { x1: CX - 210 + nl.x(5) + 12, y1: 352, x2: CX - 210 + nl.x(9) + 22, y2: 352, stroke: GREEN, 'stroke-width': 9, 'stroke-linecap': 'round' }, ray);
  E('path', { d: `M${CX - 210 + nl.x(9) + 44},352 l-22,-14 l0,28 Z`, fill: GREEN }, ray);
  E('circle', { cx: CX - 210 + nl.x(5), cy: 352, r: 13, fill: '#FFFFFF', stroke: GREEN, 'stroke-width': 5 }, ray);
  const c6b = txt(c6, 446, '**open** circle: 5 is not included', { size: 30, boldFill: GREEN });
  const c6c = trNo(c6, 504, '{{x = 5}}', { size: 40 });
  const c6d = mkChip(c6, '**check**: substitute back', { size: 28, col: PURP, solid: true, fill: '#EDE4FF' }); tr(c6d, CX, 560);

  /* ===== logo ===== */
  const sR = G(Lhud);
  const logo = G(sR);
  const lg1 = outline(T(logo, 0, -78, 'BALANCING', { size: 92, weight: 800, anchor: 'middle', fill: GOLD, ls: 3 }), '#140A30', 12);
  const lg2 = outline(T(logo, 0, 6, 'ACT', { size: 72, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 10 }), '#140A30', 12);
  void lg1; void lg2;
  const beam = G(logo);
  E('rect', { x: -300, y: -8, width: 600, height: 16, rx: 8, fill: '#E2B33C', stroke: '#140A30', 'stroke-width': 4 }, beam);
  E('path', { d: 'M0,10 L-22,44 L22,44 Z', fill: '#E2B33C', stroke: '#140A30', 'stroke-width': 4 }, logo);
  const rSub = T(sR, 600, 400, 'will return', { size: 48, weight: 600, anchor: 'middle', fill: '#FFFFFF' });

  /* ===== lobby chips ===== */
  const chSpare = mkChip(Lfg, '**7** seconds to spare', { size: 34, col: GOLD });

  /* ---------- the cast ---------- */
  const judge = cast(Lth, 'judge'), dee = cast(Lth, 'dee'), wiper = cast(Lth, 'wiper'), croc = cast(Lth, 'croc');
  const kav = cast(Lth, 'kavya'), pri = cast(Lth, 'priya');
  const mum = cast(lob.mid, 'mum', { s: 0.9 }), boy = cast(lob.mid, 'boy', { s: 0.85 }), dad = cast(lob.mid, 'dad', { s: 0.92 });
  const tan = cast(lob.mid, 'tan', { s: 0.92 });
  const ex = cast(lob.mid, 'ex', { s: 0.45 });

  /* ---------- shots ---------- */
  const cut = id => at(id) - 0.06;
  const SHOTS = [['I', -9], ['1', cut('t1')], ['2', cut('t2')], ['3', cut('t3')], ['4', cut('t4')], ['5', cut('t5')], ['6', cut('t6')],
    ['R', cut('return')], ['L', cut('time')], ['D', cut('dad')], ['X', cut('curses')]];
  const shotAt = t => { let s = 'I'; for (const [kk, t0] of SHOTS) if (t >= t0) s = kk; return s; };
  const CARDS = { 1: c1, 2: c2, 3: c3, 4: c4, 5: c5, 6: c6 };
  const CONF = { 1: 'judge', 2: 'dee', 3: 'kavya', 4: 'wiper', 5: 'priya', 6: 'croc' };
  const ROW = [[judge, 'deadpan', 0.5, 478], [dee, 'happy', 0.58, 486], [kav, 'smug', 0.66, 470], [wiper, 'happy', 0.55, 478], [pri, 'happy', 0.66, 470], [croc, 'happy', 0.46, 486]];
  const LX = { boy: 170, mum: 310, kav: 450, tan: 620, pri: 790, dad: 910 }, LY = 432;
  const home = (c, p) => { if (c.parentNode !== p) p.appendChild(c); };

  return t => {
    const sh = shotAt(t);
    const vaultOn = sh === 'I', lobOn = sh === 'L' || sh === 'D' || sh === 'X';
    op(vault, vaultOn ? 1 : 0); op(lobWrap, lobOn ? 1 : 0); op(dim, 1);
    op(logoBg, sh === 'R' ? 1 : 0); op(sI, vaultOn ? 1 : 0); op(sR, sh === 'R' ? 1 : 0);
    for (const kk in CARDS) op(CARDS[kk], sh === kk ? 1 : 0);
    const cw = CONF[sh];
    conf.set(cw ? 1 : 0, t); if (cw) conf.firstChild.setAttribute('fill', TINT[cw]);
    [judge, dee, wiper, croc, kav, pri, mum, boy, dad, tan, ex, row4, seven].forEach(e => op(e, 0));
    chSpare.set(0);
    lobWrap.removeAttribute('transform');
    const kavHome = lobOn ? lob.mid : Lth;
    home(kav, kavHome); home(pri, kavHome);
    const show = (c, x, y, s, st) => { op(c, 1); tr(c, x, y, s); c.set(Object.assign({ t }, st)); };

    if (sh === 'I') {
      vault.upd(t);
      const hp = P(t, at('intro') + 0.05, 0.45, pop);
      op(iHead, clamp(hp * 2.5)); iHead.setAttribute('transform', `translate(600 210) scale(${Math.max(0.01, 0.6 + 0.4 * hp).toFixed(3)}) translate(-600 -210)`);
      op(iSub, P(t, mid('intro', 0.3), 0.4, linear));
      ROW.forEach(([c, mood, s, y], i) => {
        const p = P(t, mid('intro', 0.35) + i * 0.13, 0.45, pop);
        show(c, ROWX[i], y + 40 * (1 - clamp(p)), Math.max(0.01, s * (0.7 + 0.3 * p)), { mood, look: 0 });
        op(c, clamp(p * 3));
        popIn(badges[i], t, mid('intro', 0.4) + i * 0.13, ROWX[i], 655);
      });
    } else if (cw) {
      if (cw === 'judge') {
        const b = at('t1') + 0.25;
        show(judge, 330, 440, 1.15, { talk: talk(t, 'judge'), mood: t > mid('t1', 0.55) ? 'annoyed' : 'deadpan', look: 0.4, bang: pulse(t, b), tilt: t > mid('t1', 0.55) ? 0.6 * P(t, mid('t1', 0.55), 0.3, pop) : 0 });
        fadeIn(c1a, t, at('t1') + 0.1); fadeIn(c1b, t, mid('t1', 0.25));
        fadeIn(c1c, t, mid('t1', 0.5)); c1c.set(P(t, mid('t1', 0.62), 0.3, linear)); fadeIn(c1d, t, mid('t1', 0.66));
        fadeIn(c1e, t, mid('t1', 0.8));
      } else if (cw === 'dee') {
        show(dee, 330, 440, 1.35, { talk: talk(t, 'dee'), mood: 'happy', look: 0.5, wave: t > mid('t2', 0.2) && t < mid('t2', 0.7) ? 1 : 0 });
        fadeIn(e2, t, at('t2') + 0.1);
        a2a.set(P(t, mid('t2', 0.25), 0.45, ease)); a2b.set(P(t, mid('t2', 0.36), 0.45, ease));
        fadeIn(c2b, t, mid('t2', 0.42)); fadeIn(c2c, t, mid('t2', 0.55)); fadeIn(c2d, t, mid('t2', 0.66));
        fadeIn(c2e, t, mid('t2', 0.8)); c2e.set(P(t, mid('t2', 0.86), 0.3, linear));
      } else if (cw === 'kavya') {
        show(kav, 320, 560, 1.5, { talk: talk(t, 'kavya'), mood: t > mid('t3', 0.6) ? 'smug' : 'neutral', look: 0.4 });
        c3w.show(0, P(t, mid('t3', 0.16), 0.3, linear)); c3w.show(1, P(t, mid('t3', 0.4), 0.3, linear)); c3w.show(2, P(t, mid('t3', 0.55), 0.3, linear));
        op(c3t, P(t, mid('t3', 0.6), 0.3, linear)); fadeIn(c3s, t, mid('t3', 0.62));
        fadeIn(c3n, t, mid('t3', 0.78)); c3n.set(P(t, mid('t3', 0.84), 0.3, linear));
      } else if (cw === 'wiper') {
        const thump = [0.6, 0.74, 0.88].map(f => mid('t4', f));
        const bump = thump.reduce((a, f) => a + (t > f && t < f + 0.15 ? 1 - (t - f) / 0.15 : 0), 0);
        show(wiper, 320, 420 + 8 * bump, 1.25, { talk: talk(t, 'wiper'), mood: t > thump[0] ? 'annoyed' : 'happy', look: 0.4, wipe: t > thump[0] - 0.4 ? 1 : 0.3 });
        fadeIn(c4a, t, at('t4') + 0.1); fadeIn(c4b, t, mid('t4', 0.22)); fadeIn(c4c, t, mid('t4', 0.4));
        c4s.forEach((s, i) => { s.set(P(t, thump[i], 0.3, linear)); tr(s, [716, 880, 1044][i], [530, 548, 530][i], 0.4, 0); });
      } else if (cw === 'priya') {
        show(pri, 320, 560, 1.5, { talk: talk(t, 'priya'), mood: t > mid('t5', 0.5) ? 'sad' : 'neutral', look: 0.4 });
        fadeIn(c5a, t, at('t5') + 0.1); fadeIn(c5b, t, mid('t5', 0.2)); fadeIn(c5c, t, mid('t5', 0.32));
        op(c5chip, P(t, mid('t5', 0.45), 0.3, linear));
        fadeIn(c5d, t, mid('t5', 0.52)); fadeIn(c5e, t, mid('t5', 0.62)); fadeIn(c5f, t, mid('t5', 0.75));
      } else if (cw === 'croc') {
        show(croc, 300, 430, 1.1, { talk: talk(t, 'croc'), mood: t > mid('t6', 0.8) ? 'smug' : 'happy', look: 0.4, snap: pulse(t, at('t6') + 0.2) + pulse(t, mid('t6', 0.62)) });
        fadeIn(c6a, t, at('t6') + 0.1);
        const nlp = P(t, mid('t6', 0.18), 0.3, linear); op(nl, nlp); op(ray, P(t, mid('t6', 0.26), 0.3, linear));
        fadeIn(c6b, t, mid('t6', 0.34)); fadeIn(c6c, t, mid('t6', 0.5)); c6c.set(P(t, mid('t6', 0.58), 0.3, linear));
        c6d.set(P(t, mid('t6', 0.8), 0.35, linear));
      }
    } else if (sh === 'R') {
      tr(rayP, 600, 600, 1, (t * 6 * AMP) % 360);
      popIn(logo, t, at('return') + 0.05, 600, 250);
      const wob = (1 - P(t, at('return') + 0.3, 1.8, easeOut)) * Math.sin((t - at('return')) * 7) * 6 * AMP;
      tr(beam, 0, 44, 1, wob);
      op(rSub, P(t, mid('return', 0.45), 0.4, linear));
    } else {
      /* ---------- the lobby ---------- */
      lob.upd(t);
      lob.clock.set(7);
      lob.keypad.set('', 1);
      op(lob.deskText, 1);
      const who = scWho(S, t);
      // the family bursts out of the door at the right, one after another
      const burst = (key, i) => { const p = P(t, cut('time') + 0.05 + i * 0.12, 0.45, easeOut); return lerp(1150, LX[key], p); };
      const shocked = sh === 'X';
      const look = x => (who === 'tan' ? clamp((LX.tan - x) / 200, -1, 1) * 0.8 : who === 'dad' ? 0.8 : -0.6);
      if (sh !== 'X') {
        show(tan, LX.tan, LY, 0.92, { talk: talk(t, 'tan'), mood: 'happy', look: who === 'dad' ? 0.8 : 0 });
        show(dad, burst('dad', 0), LY, 0.92, { talk: talk(t, 'dad'), mood: sh === 'D' || t > mid('time', 0.75) ? 'smug' : 'happy', look: sh === 'D' ? 0 : look(LX.dad) });
        show(pri, burst('pri', 1), LY, 0.88, { mood: sh === 'D' ? 'deadpan' : 'happy', look: look(LX.pri) });
        show(kav, burst('kav', 2), LY, 0.88, { mood: sh === 'D' ? 'deadpan' : 'happy', look: sh === 'D' ? 0 : look(LX.kav) });
        show(mum, burst('mum', 3), LY, 0.9, { mood: sh === 'D' ? 'deadpan' : 'happy', look: look(LX.mum) });
        show(boy, burst('boy', 4), LY + 12, 0.85, { mood: 'happy', look: look(LX.boy) });
      }
      if (sh === 'L') {
        chSpare.set(P(t, mid('time', 0.55), 0.35, linear)); tr(chSpare, 600, 290);
      } else if (sh === 'D') {
        const push = P(t, cut('dad'), cut('curses') - cut('dad'), linear);
        view(lobWrap, 1.35 + 0.2 * push, 780, 380);
        op(seven, P(t, mid('dad', 0.4), 0.3, linear)); tr(seven, LX.dad, 262 + 4 * Math.sin(t * 5), 1, Math.sin(t * 3) * 6 * AMP);
      } else {
        // the leaderboard: a fourth row, and Ex, mask back on
        const push = P(t, cut('curses'), 3, linear);
        view(lobWrap, 2.05 + 0.1 * push, 290, 352);
        op(row4, P(t, at('curses') - 0.06, 0.3, linear)); op(r4hl, 0.25 + 0.2 * Math.sin(t * 6));
        const pp = P(t, at('curses') + 0.05, 0.4, pop);
        op(ex, 1); tr(ex, 412, lerp(460, 360, pp), 0.45);
        const mk = 1 - P(t, at('curses') + 0.35, 0.5, ease);
        ex.set({ t, talk: talk(t, 'ex'), mood: 'annoyed', look: -0.6, unmask: mk, val: '5', cape: Math.sin(t * 2) * 0.2 * AMP });
        void shocked;
      }
    }
  };
});
