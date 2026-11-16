/* Scene 8: The open house saves you some marks (exam traps) and the stinger.
   Shots: "6 EXAM TRAPS" over the dimmed flat, the six of them in a row with number badges -> six snappy confessionals,
   one trap card each (Dad: unlike terms, 2a + 3b is not 5ab, "Not the same thing."; Handy: 3(x + 4) = 3x + 12 with both
   handshakes; Mum: −3(x − 2) = −3x + 6; Ah Boy: (−5)² = 25, and he gives the calculator back; Square: 2x² at x = 3 is
   2 × 9 = 18, not 36; Kavya: factorise fully, 12x + 18 = 6(2x + 3), and never lose a term, 5x + 5 = 5(x + 1)) -> logo
   "ON GOOD TERMS will return" -> Monday in the classroom: Mr Tan hands back the retest, 10/10, Factorising ✓ ->
   the flat: Ah Boy does his trick on Agent X (X secretly picks 7: 7 → 14 → 24 → 12 → 5) -> "Your answer is 5!" ->
   "...How did you know?": shades down, COVER BLOWN on Agent X himself, Ah Boy takes a bow. */
scene('traps', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;
  const talk = (t, who) => scTalk(S, t, who);

  /* ---------- helpers ---------- */
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.4, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const fadeIn = (el, t, t0) => { const p = P(t, t0, 0.3, easeOut); op(el, p); tr(el, 0, 10 * (1 - p)); };
  const outline = (el, col, w) => { el.setAttribute('stroke', col); el.setAttribute('stroke-width', w); el.setAttribute('paint-order', 'stroke'); el.setAttribute('stroke-linejoin', 'round'); return el; };
  const GOLD = '#FFE45C', INK = MK.ink, GREEN = '#1E9E5A', RED = '#C62828', BLUE = '#2E6FD8', ORANGE = '#E07A12', GREY = '#5A6670', PURPLE = '#8E44AD';
  const CX = 880;
  function trCard(parent, n) {
    const g = G(parent);
    E('rect', { x: 606, y: 136, width: 560, height: 480, rx: 18, fill: 'rgba(0,0,0,0.3)' }, g);
    E('rect', { x: 600, y: 130, width: 560, height: 480, rx: 18, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, g);
    const head = chip(g, 'TRAP ' + n, { size: 30, fill: '#D32F2F', color: '#FFFFFF', weight: 800 }); tr(head, CX, 182);
    return g;
  }
  const txt = (parent, y, s, o) => mkText(parent, CX, y, s, Object.assign({ size: 34, anchor: 'middle', fill: INK, weight: 700 }, o || {}));
  function trNo(parent, y, s, o) {
    const g = G(parent), m = txt(g, y, s, Object.assign({ fill: RED }, o || {}));
    const sl = strike(g, CX - m.w / 2 - 10, y - 12, CX + m.w / 2 + 10, RED);
    g.set = p => sl.set(p);
    return g;
  }
  /* maths pieces on one baseline, centred on cx */
  const row = (parent, cx, y, parts, o) => {
    o = o || {}; const s = o.size || 50, gap = o.gap !== undefined ? o.gap : s * 0.24;
    const ms = parts.map(p => (typeof p === 'string' ? { m: p } : p)).map(p => Object.assign({}, p, mkMeasure(p.m, { size: s })));
    const Wd = ms.reduce((a, p) => a + p.w, 0) + gap * (ms.length - 1);
    let x = cx - Wd / 2; const out = [];
    ms.forEach(p => { const g = mkMath(parent, x, y, p.m, { size: s, fill: p.col || o.fill || INK }); out.push({ g, x0: x, w: p.w, cx: x + p.w / 2 }); x += p.w + gap; });
    return out;
  };
  // centre of a character inside a bracket term, e.g. the x and the 4 of (x + 4)
  const subX = (r, src, before, ch, s) => r.x0 + mkMeasure(before, { size: s }).w + mkMeasure(ch, { size: s }).w / 2 + (before.endsWith(' ') ? 0 : 0);

  /* ---------- layers ---------- */
  const Lbg = G(root), Lcast = G(root), Lfront = G(root), Lfg = G(root), Lhud = G(root);

  /* ---------- sets ---------- */
  const flatShot = G(Lbg);
  const flat = xpFlat(flatShot);
  Lfront.appendChild(flat.front); Lfront.appendChild(flat.top);
  const dim = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#0A0614', opacity: 0.6 }, Lfront);
  const conf = xpConf(Lbg, 'dad');
  const TINT = {}; for (const k in XP_TINT) TINT[k] = linGrad(XP_TINT[k][0], XP_TINT[k][1], true);
  // the logo card
  const logoBg = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#0E1838', '#3A1E5A', true) }, logoBg);
  let rays = '';
  for (let i = 0; i < 16; i++) { const a0 = i / 16 * TAU, a1 = a0 + TAU / 40; rays += `M0,0 L${(Math.cos(a0) * 1100).toFixed(0)},${(Math.sin(a0) * 1100).toFixed(0)} L${(Math.cos(a1) * 1100).toFixed(0)},${(Math.sin(a1) * 1100).toFixed(0)} Z `; }
  const rayP = E('path', { d: rays, fill: '#FFC247', opacity: 0.08 }, logoBg);
  E('ellipse', { cx: 600, cy: 640, rx: 640, ry: 170, fill: glow('#FFB020'), opacity: 0.3 }, logoBg);
  const lDiyas = [170, 1030].map(x => { const d = xpDiya(logoBg, 1.1); tr(d, x, 560); return d; });
  // the classroom (Monday)
  const classShot = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#E4F0E8', '#CFE3D6', true) }, classShot);
  E('rect', { x: 0, y: 470, width: 1200, height: 280, fill: '#B9CBBF' }, classShot);
  const wb = mkWhiteboard(classShot, 400, 240, {}); tr(wb, 245, 245);
  mkText(wb, 0, -40, 'Retest: Algebra', { size: 40, anchor: 'middle', fill: MK.ink, weight: 800 });
  mkText(wb, 0, 30, 'Factorise fully!', { size: 32, anchor: 'middle', fill: BLUE, weight: 700 });
  const desk = G(Lfront);
  E('rect', { x: 0, y: 530, width: 1200, height: 220, fill: '#C9935A', stroke: '#6B4423', 'stroke-width': 4 }, desk);
  E('rect', { x: 0, y: 522, width: 1200, height: 18, fill: '#A87E44', stroke: '#6B4423', 'stroke-width': 3 }, desk);

  /* ===== intro: 6 EXAM TRAPS ===== */
  const sI = G(Lhud);
  const iHead = outline(T(sI, 600, 236, '6 EXAM TRAPS', { size: 80, weight: 800, anchor: 'middle', fill: GOLD, ls: 3 }), '#5A3A07', 10);
  const iSub = T(sI, 600, 296, 'the open house saves you some marks', { size: 34, weight: 600, anchor: 'middle', fill: C.ink });
  const ROWX = [150, 330, 510, 690, 870, 1050];
  const badges = ROWX.map((x, k) => { const g = G(sI); E('circle', { r: 26, fill: GOLD, stroke: SC_INK, 'stroke-width': 4 }, g); T(g, 0, 11, String(k + 1), { size: 30, weight: 800, anchor: 'middle', fill: SC_INK }); return g; });

  /* ===== trap cards ===== */
  // 1 Dad
  const c1 = trCard(Lfg, 1);
  const c1a = txt(c1, 262, '**Unlike terms** don’t combine', { size: 36, boldFill: BLUE });
  const c1b = txt(c1, 350, '{{2a + 3b}}', { size: 56 });
  const c1c = trNo(c1, 430, '{{2a + 3b = 5ab}}', { size: 40 });
  const c1d = txt(c1, 500, 'different letters: leave it as it is', { size: 28, fill: GREY });
  const c1e = mkChip(c1, '“**Not** the same thing.”', { size: 30, col: GREEN, fill: '#DFF5E6' }); tr(c1e, CX, 560);
  // 2 Handy
  const c2 = trCard(Lfg, 2);
  const c2a = txt(c2, 262, 'Everyone inside gets a **handshake**', { size: 32, boldFill: ORANGE });
  const c2b = G(c2);
  const r2 = row(c2b, CX, 380, ['3', '(x + 4)', '=', '3x + 12'], { size: 56, gap: 10 });
  const r2x = subX(r2[1], '', '(', 'x', 56), r2four = r2[1].x0 + r2[1].w - mkMeasure(')', { size: 56 }).w - mkMeasure('4', { size: 56 }).w / 2;
  const a2 = [r2x, r2four].map((x2, i) => arrow(c2b, r2[0].cx, 330, x2, 334, { color: ORANGE, width: 4, bend: -(26 + i * 26) }));
  const c2c = txt(c2, 456, '{{3 × x = 3x}},   {{3 × 4 = 12}}', { size: 32, fill: GREEN });
  const c2d = trNo(c2, 536, '{{3(x + 4) = 3x + 4}}', { size: 36 });
  // 3 Mum
  const c3 = trCard(Lfg, 3);
  const c3a = txt(c3, 262, 'A negative flips **both** signs', { size: 34, boldFill: PURPLE });
  const c3b = G(c3);
  const r3 = row(c3b, CX, 380, ['-3', '(x - 2)', '=', '-3x + 6'], { size: 54, gap: 10 });
  const r3x = subX(r3[1], '', '(', 'x', 54), r3two = r3[1].x0 + r3[1].w - mkMeasure(')', { size: 54 }).w - mkMeasure('2', { size: 54 }).w / 2;
  const a3 = [r3x, r3two].map((x2, i) => arrow(c3b, r3[0].cx, 330, x2, 334, { color: PURPLE, width: 4, bend: -(26 + i * 26) }));
  const c3c = txt(c3, 456, '{{-3 × x = -3x}},   {{-3 × -2 = +6}}', { size: 32, fill: GREEN });
  const c3d = trNo(c3, 536, '{{-3(x - 2) = -3x - 6}}', { size: 36 });
  // 4 Ah Boy
  const c4 = trCard(Lfg, 4);
  const c4a = txt(c4, 262, '**Bracket** your negatives', { size: 38, boldFill: BLUE });
  const c4b = txt(c4, 336, 'if {{x = -5}}:', { size: 36 });
  const c4c = txt(c4, 420, '{{x^2 = (-5)^2 = 25}}', { size: 50, fill: GREEN });
  const c4d = trNo(c4, 500, '{{-5^2 = -25}}', { size: 40 });
  const c4e = txt(c4, 568, '{{(-5) × (-5) = +25}}', { size: 30, fill: GREY });
  // 5 Square
  const c5 = trCard(Lfg, 5);
  const c5a = txt(c5, 266, '{{2x^2}} at {{x = 3}}', { size: 44 });
  const c5b = txt(c5, 356, '{{2 × 3^2 = 2 × 9 = 18}}', { size: 44, fill: GREEN });
  const c5c = trNo(c5, 440, '{{(2 × 3)^2 = 36}}', { size: 40 });
  const c5d = mkChip(c5, '**square first**, darling', { size: 32, col: '#1E6E8E', fill: '#E0F4FB' }); tr(c5d, CX, 530);
  // 6 Kavya
  const c6 = trCard(Lfg, 6);
  const c6a = txt(c6, 258, 'Factorise **fully**: take out the **HCF**', { size: 30, boldFill: GREEN });
  const c6b = txt(c6, 326, '{{12x + 18 = 6(2x + 3)}}', { size: 42, fill: GREEN });
  const c6c = txt(c6, 408, 'and **never lose a term**', { size: 32, boldFill: RED });
  const c6d = txt(c6, 480, '{{5x + 5 = 5(x + 1)}}', { size: 48, fill: GREEN });
  const c6e = trNo(c6, 556, '{{5(x)}}', { size: 40 });
  const c6f = txt(c6, 556, '{{5 ÷ 5 = 1}}', { size: 30, fill: GREY });

  /* ===== logo ===== */
  const sR = G(Lhud);
  const logo = G(sR);
  const logo1 = outline(T(logo, 0, -70, 'ON GOOD', { size: 64, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 6 }), '#1A0E30', 12);
  const logo2 = outline(T(logo, 0, 26, 'TERMS', { size: 104, weight: 800, anchor: 'middle', fill: GOLD, ls: 4 }), '#1A0E30', 12);
  const xs = [-1, 1].map(sd => { const g = G(logo); tr(g, sd * 290, -30); const w = T(g, 0, 40, 'x', { size: 150, weight: 700, anchor: 'middle', fill: '#FF8FC8', font: "Georgia, 'Times New Roman', serif" }); w.setAttribute('font-style', 'italic'); outline(w, '#1A0E30', 10); return g; });
  const rSub = T(sR, 600, 450, 'will return', { size: 46, weight: 600, anchor: 'middle', fill: '#FFFFFF' });

  /* ===== stinger A: Monday, the retest ===== */
  const sW = G(Lfg);
  const cMon = mkChip(sW, '**Monday**', { size: 34, col: GOLD });
  const retest = G(sW), rtIn = G(retest);
  E('rect', { x: -150, y: -190, width: 300, height: 380, rx: 6, fill: '#FFFFFF', stroke: '#B9C4CE', 'stroke-width': 3 }, rtIn);
  T(rtIn, 0, -150, 'RETEST: ALGEBRA', { size: 26, weight: 800, anchor: 'middle', fill: INK });
  T(rtIn, -126, -108, 'Name: Kavya', { size: 26, weight: 700, fill: '#2E4C8C', font: FB });
  mkText(rtIn, -126, -50, 'Factorise {{12x + 18}}', { size: 28, fill: INK, weight: 700 });
  mkMath(rtIn, -110, 4, '= 6(2x + 3)', { size: 34, fill: '#2E4C8C' });
  tr(tick(rtIn, 16, '#D32F2F'), 112, -8);
  const ten = G(rtIn); tr(ten, 0, 92, 1, -8);
  E('ellipse', { rx: 92, ry: 48, fill: 'none', stroke: '#D32F2F', 'stroke-width': 6 }, ten);
  T(ten, 0, 16, '10/10', { size: 46, weight: 800, anchor: 'middle', fill: '#D32F2F' });
  T(rtIn, 0, 172, 'Factorising ✓', { size: 28, weight: 800, anchor: 'middle', fill: '#D32F2F' });

  /* ===== stinger B: the trick on Agent X ===== */
  const sX = G(Lfg);
  const STEPS = ['**1** double it', '**2** add {{10}}', '**3** cut it in half', '**4** take away your number'];
  const stepChips = STEPS.map(s => mkChip(sX, s, { size: 28, col: GOLD }));
  const stepX = (() => { const ws = stepChips.map(c => c.w), gap = 18, tot = ws.reduce((a, b) => a + b, 0) + gap * 3; let x = 590 - tot / 2; return ws.map(w => { const c = x + w / 2; x += w + gap; return c; }); })();
  const thinkG = G(sX);
  const think = mkThoughtBubble(thinkG, ' ', { w: 400, size: 26, tail: 'down', tailX: -110 }); think.set(1);
  const thinkR = row(thinkG, 0, 10, ['7', '->', '14', '->', '24', '->', '12', '->', { m: '5', col: GREEN }], { size: 36, gap: 10 });
  const five = G(sX);
  const fiveT = outline(T(five, 0, 40, '5!', { size: 110, weight: 800, anchor: 'middle', fill: GOLD }), '#5A3A07', 10);
  const stampX = xpStamp(sX, false);
  const crumbs = G(Lcast);
  [[-14, 0], [10, 6], [-4, 14], [16, -6], [-20, 10]].forEach(([x, y]) => E('circle', { cx: x, cy: y, r: 4, fill: '#E07A12' }, crumbs));

  /* ---------- the cast ---------- */
  const dad = cast(Lcast, 'dad'), handy = cast(Lcast, 'handy'), mum = cast(Lcast, 'mum'), boy = cast(Lcast, 'boy', { prop: 'calculator' }),
    square = cast(Lcast, 'square'), kav = cast(Lcast, 'kavya'), tan = cast(Lcast, 'tan'), ax = cast(Lcast, 'x');
  const calcGo = boy.hand;   // the calculator in Ah Boy's hand

  /* ---------- shots ---------- */
  const cut = id => at(id) - 0.06;
  const SHOTS = [['I', -9], ['1', cut('t1')], ['2', cut('t2')], ['3', cut('t3')], ['4', cut('t4')], ['5', cut('t5')], ['6', cut('t6')],
    ['R', cut('return')], ['W', cut('ten')], ['X', cut('trick')]];
  const shotAt = t => { let s = 'I'; for (const [k, t0] of SHOTS) if (t >= t0) s = k; return s; };
  const CARDS = { 1: c1, 2: c2, 3: c3, 4: c4, 5: c5, 6: c6 };
  const CONF = { 1: 'dad', 2: 'handy', 3: 'mum', 4: 'boy', 5: 'square', 6: 'kavya' };
  const ROW = [[dad, 'smug', 0.72, 456], [handy, 'happy', 0.5, 460], [mum, 'neutral', 0.72, 456], [boy, 'happy', 0.74, 462], [square, 'smug', 0.5, 455], [kav, 'happy', 0.72, 452]];
  const ALL = [dad, handy, mum, boy, square, kav, tan, ax, crumbs];
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const sh = shotAt(t);
    const flatOn = sh === 'I' || sh === 'X' ? 1 : 0;
    op(flatShot, flatOn); op(flat.front, flatOn); op(flat.top, flatOn); op(dim, sh === 'I' ? 1 : 0);
    if (flatOn) { flat.upd(t, 1); flat.clock.set(sh === 'X' ? 5 : 9, 30); tr(flat.clock, sh === 'X' ? 1124 : 1050, sh === 'X' ? 246 : 170); }
    op(classShot, sh === 'W' ? 1 : 0); op(desk, sh === 'W' ? 1 : 0);
    op(logoBg, sh === 'R' ? 1 : 0); op(sI, sh === 'I' ? 1 : 0); op(sR, sh === 'R' ? 1 : 0); op(sW, sh === 'W' ? 1 : 0); op(sX, sh === 'X' ? 1 : 0);
    for (const k in CARDS) op(CARDS[k], sh === k ? 1 : 0);
    const cw = CONF[sh];
    conf.set(cw ? 1 : 0, t); if (cw) conf.firstChild.setAttribute('fill', TINT[cw]);
    ALL.forEach(e => op(e, 0));
    op(calcGo, sh === '4' ? 1 : 0);
    const show = (c, x, y, s, st, r) => { op(c, 1); tr(c, x, y, s, r); if (c.set) c.set(Object.assign({ t }, st || {})); };

    if (sh === 'I') {
      const hp = P(t, at('intro') + 0.05, 0.45, pop);
      op(iHead, clamp(hp * 2.5)); iHead.setAttribute('transform', `translate(600 210) scale(${Math.max(0.01, 0.6 + 0.4 * hp).toFixed(3)}) translate(-600 -210)`);
      op(iSub, P(t, mid('intro', 0.3), 0.4, linear));
      ROW.forEach(([c, mood, s, y], i) => {
        const p = P(t, mid('intro', 0.35) + i * 0.13, 0.45, pop);
        show(c, ROWX[i], y + 40 * (1 - clamp(p)), Math.max(0.01, s * (0.7 + 0.3 * p)), { mood, look: 0, val: '3' });
        op(c, clamp(p * 3));
        popIn(badges[i], t, mid('intro', 0.4) + i * 0.13, ROWX[i], 640);
      });
    } else if (cw) {
      if (cw === 'dad') {
        show(dad, 320, 572, 1.4, { talk: talk(t, 'dad'), mood: t > mid('t1', 0.78) ? 'sad' : 'neutral', look: 0.4 });
        fadeIn(c1a, t, at('t1') + 0.1); fadeIn(c1b, t, mid('t1', 0.32)); fadeIn(c1c, t, mid('t1', 0.45)); c1c.set(P(t, mid('t1', 0.6), 0.3, linear));
        fadeIn(c1d, t, mid('t1', 0.66)); c1e.set(P(t, mid('t1', 0.8), 0.4, linear));
      } else if (cw === 'handy') {
        const sk = t > mid('t2', 0.45);
        show(handy, 330, 420, 1.3, { talk: talk(t, 'handy'), mood: 'happy', look: 0.5, shake: sk ? 1 : 0.2, val: '3' });
        fadeIn(c2a, t, at('t2') + 0.1); op(c2b, P(t, mid('t2', 0.42), 0.3, linear));
        a2.forEach((a, i) => a.set(P(t, mid('t2', 0.55 + i * 0.12), 0.35, linear)));
        fadeIn(c2c, t, mid('t2', 0.75)); fadeIn(c2d, t, mid('t2', 0.84)); c2d.set(P(t, mid('t2', 0.9), 0.3, linear));
      } else if (cw === 'mum') {
        show(mum, 320, 572, 1.4, { talk: talk(t, 'mum'), mood: t > mid('t3', 0.7) ? 'smug' : 'neutral', look: 0.4 });
        fadeIn(c3a, t, at('t3') + 0.1); op(c3b, P(t, mid('t3', 0.35), 0.3, linear));
        a3.forEach((a, i) => a.set(P(t, mid('t3', 0.5 + i * 0.12), 0.35, linear)));
        fadeIn(c3c, t, mid('t3', 0.72)); fadeIn(c3d, t, mid('t3', 0.84)); c3d.set(P(t, mid('t3', 0.9), 0.3, linear));
      } else if (cw === 'boy') {
        const back = mid('t4', 0.7), gone = P(t, back + 0.2, 0.7, easeIn);
        show(boy, 310, 548, 1.5, { talk: talk(t, 'boy'), mood: t > back ? 'happy' : 'neutral', look: t > back ? 0.8 : 0.3, lift: t < back + 0.9 ? 1 : 0 });
        tr(calcGo, -44.8 + 420 * gone, 122 - 60 * gone, 0.85, -16 + 40 * gone); op(calcGo, 1 - clamp((gone - 0.7) / 0.3));
        fadeIn(c4a, t, at('t4') + 0.1); fadeIn(c4b, t, mid('t4', 0.18)); fadeIn(c4c, t, mid('t4', 0.32));
        fadeIn(c4d, t, mid('t4', 0.45)); c4d.set(P(t, mid('t4', 0.52), 0.3, linear)); fadeIn(c4e, t, mid('t4', 0.58));
      } else if (cw === 'square') {
        show(square, 330, 410, 1.25, { talk: talk(t, 'square'), mood: t > mid('t5', 0.55) ? 'annoyed' : 'smug', look: 0.5 });
        fadeIn(c5a, t, at('t5') + 0.1); fadeIn(c5b, t, mid('t5', 0.3)); fadeIn(c5c, t, mid('t5', 0.5)); c5c.set(P(t, mid('t5', 0.58), 0.3, linear));
        c5d.set(P(t, mid('t5', 0.75), 0.4, linear));
      } else if (cw === 'kavya') {
        show(kav, 320, 560, 1.4, { talk: talk(t, 'kavya'), mood: t > mid('t6', 0.8) ? 'happy' : 'neutral', look: 0.4 });
        fadeIn(c6a, t, at('t6') + 0.1); fadeIn(c6b, t, mid('t6', 0.22)); fadeIn(c6c, t, mid('t6', 0.42)); fadeIn(c6d, t, mid('t6', 0.62));
        fadeIn(c6e, t, mid('t6', 0.8)); c6e.set(P(t, mid('t6', 0.86), 0.3, linear));
        op(c6e, t > mid('t6', 0.8) ? 1 : 0); tr(c6e, -110, 0); fadeIn(c6f, t, mid('t6', 0.9)); tr(c6f, 110, 0);
      }
    } else if (sh === 'R') {
      tr(rayP, 600, 640, 1, (t * 6 * AMP) % 360);
      lDiyas.forEach(d => d.upd(t));
      popIn(logo, t, at('return') + 0.05, 600, 300);
      xs.forEach((g, i) => tr(g, (i ? 1 : -1) * 290, -30, 1, Math.sin(t * 2 + i) * 8 * AMP));
      op(rSub, P(t, mid('return', 0.5), 0.4, linear));
    } else if (sh === 'W') {
      cMon.set(P(t, at('ten') + 0.1, 0.4, linear)); tr(cMon, 900, 160);
      const hand = mid('ten', 0.3), rp = P(t, hand, 0.5, easeOut);
      op(retest, clamp(rp * 3)); tr(retest, lerp(860, 620, rp), lerp(420, 350, rp), 1, lerp(10, -4, rp));
      const ten0 = P(t, mid('ten', 0.7), 0.35, pop); tr(ten, 0, 92, Math.max(0.01, 0.5 + 0.5 * ten0), -8); op(ten, clamp(ten0 * 3));
      show(kav, 290, 452, 1.0, { talk: talk(t, 'kavya'), mood: t > mid('ten', 0.72) ? 'happy' : 'neutral', look: 0.8 });
      show(tan, 950, 444, 1.0, { talk: talk(t, 'tan'), mood: t > mid('ten', 0.72) ? 'happy' : 'neutral', look: -0.8 });
    } else {
      /* ---------- the trick on Agent X ---------- */
      const stepT = [0.36, 0.5, 0.6, 0.78].map(f => mid('trick', f));
      const fiveAt = mid('five', 0.2), howAt = mid('how', 0.3);
      stepChips.forEach((c, i) => { c.set(t < fiveAt ? P(t, stepT[i], 0.4, linear) : 0); tr(c, stepX[i], 146); });
      // Agent X works it out in secret: 7 -> 14 -> 24 -> 12 -> 5
      const thinkOn = t > mid('trick', 0.2);
      op(thinkG, thinkOn ? 1 : 0); tr(thinkG, 820, 250);
      think.set(thinkOn ? P(t, mid('trick', 0.2), 0.4, linear) : 0);
      const tk = [0.24, 0.4, 0.54, 0.64, 0.84];
      thinkR.forEach((r, i) => op(r.g, t > mid('trick', tk[Math.ceil(i / 2)]) ? 1 : 0));
      if (t >= fiveAt - 0.1) { popIn(five, t, fiveAt - 0.1, 400, 220, 1, Math.sin(t * 3) * 3 * AMP); } else op(five, 0);
      stampX.set(P(t, howAt + 0.5, 0.35, linear)); tr(stampX, 700, 440, 0.42);
      const bow = P(t, mid('how', 0.6), 0.5, ease);
      show(boy, 330, 448 + 18 * bow, 1.0, { talk: talk(t, 'boy'), mood: 'happy', look: t > howAt ? 0 : 0.8, lift: t >= at('five') && t < howAt ? 1 : 0 }, -14 * bow);
      show(crumbs, 330, 480 + 18 * bow, 1);
      const shocked = t > at('how') - 0.1;
      show(kav, 1020, 452, 0.95, { talk: 0, mood: t > howAt + 0.5 ? 'happy' : shocked ? 'shock' : 'neutral', look: -0.9 });
      show(ax, 700, 431, 0.7, { talk: talk(t, 'x'), mood: shocked ? 'shock' : t > fiveAt ? 'shock' : 'deadpan', look: -0.6, arms: t > fiveAt ? 1 : 0.4, shades: 1 - P(t, at('how') - 0.1, 0.8, easeOut), still: t > end('how') });
    }
  };
});
