/* Scene 9: The void deck saves you some marks.
   Shots: "6 EXAM TRAPS" over the void deck, six of the cast lined up behind a desk with numbers -> six snappy
   confessionals, one trap card each (Queenie: × and ÷ left to right, 12 ÷ 3 × 2 = 8; Tiny: 3⁴ = 81, not 3 × 4;
   Kavya: x² = 25 has two answers; Dad: type (−3)² with brackets; Mum: a fraction bar is a bracket,
   (8 + 4)/(2 × 3) = 2; Auntie Rose: −7 °C to 5 °C is a rise of 12) -> logo "NEGATIVE VIBES will return" ->
   stinger: Monday evening at the flat, 20 out of 20, the family claps, Dash is so proud he turns into a "+" ->
   the void deck at night, chairs stacked, one tube light on: Uncle Pi alone, still talking. */
scene('traps', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;
  const talk = (t, who) => scTalk(S, t, who);

  /* ---------- helpers ---------- */
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const outline = (el, col, w) => { el.setAttribute('stroke', col); el.setAttribute('stroke-width', w); el.setAttribute('paint-order', 'stroke'); el.setAttribute('stroke-linejoin', 'round'); return el; };
  const GOLD = '#FFE45C', INK = MK.ink, GREEN = '#1E9E5A', RED = '#C62828', BLUE = '#2E6FD8', GREY = '#5A4A52';
  const CX = 880;
  function trCard(parent, n) {
    const g = G(parent);
    E('rect', { x: 606, y: 136, width: 560, height: 470, rx: 18, fill: 'rgba(0,0,0,0.3)' }, g);
    E('rect', { x: 600, y: 130, width: 560, height: 470, rx: 18, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, g);
    const head = chip(g, 'TRAP ' + n, { size: 30, fill: '#D32F2F', color: '#FFFFFF', weight: 800 }); tr(head, CX, 182);
    return g;
  }
  const txt = (parent, y, s, o, x) => mkText(parent, x || CX, y, s, Object.assign({ size: 34, anchor: 'middle', fill: INK }, o || {}));
  const mth = (parent, y, s, o, x) => mkMath(parent, x || CX, y, s, Object.assign({ size: 44, anchor: 'middle', fill: INK }, o || {}));
  const fadeIn = (el, t, t0) => { const p = P(t, t0, 0.3, easeOut); op(el, p); tr(el, 0, 10 * (1 - p)); };
  /* a crossed-out maths line: g.set(p) draws the strike */
  function trNo(parent, y, src, o, x) {
    const g = G(parent), m = mth(g, y, src, Object.assign({ fill: RED, size: 38 }, o || {}), x);
    const xc = x || CX;
    const sl = strike(g, xc - m.w / 2 - 10, y - 13, xc + m.w / 2 + 10, RED);
    g.set = p => sl.set(p);
    return g;
  }
  const okTick = (parent, x, y) => { const k = tick(parent, 15, GREEN); tr(k, x, y); return k; };

  /* ---------- layers ---------- */
  const Lbg = G(root), Lcast = G(root), Lfront = G(root), Ltop = G(root), Lfg = G(root), Lhud = G(root);

  /* ---------- sets ---------- */
  const deckShot = G(Lbg);
  const deck = ipVoidDeck(deckShot);
  const dim = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#06110F', opacity: 0.68 }, deckShot);
  const night = G(deckShot);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#0A1030', opacity: 0.78 }, night);
  E('ellipse', { cx: 590, cy: 232, rx: 260, ry: 120, fill: glow('#FFF7C2'), opacity: 0.55 }, night);
  E('rect', { x: 520, y: 228, width: 140, height: 8, rx: 4, fill: '#FFFDE8' }, night);
  E('path', { d: 'M520,236 L380,700 L800,700 L660,236 Z', fill: '#FFF7C2', opacity: 0.07 }, night);
  // stacked plastic chairs
  const chairs = (x, col) => {
    const g = G(night); tr(g, x, 690);
    for (let i = 0; i < 4; i++) {
      const y = -i * 22;
      E('path', { d: `M-46,${y - 70} L-40,${y - 150} L40,${y - 150} L46,${y - 70} Z`, fill: col, stroke: '#1A1A24', 'stroke-width': 3 }, g);
      E('rect', { x: -54, y: y - 74, width: 108, height: 14, rx: 6, fill: col, stroke: '#1A1A24', 'stroke-width': 3 }, g);
    }
    E('path', { d: 'M-48,-60 L-56,0 M48,-60 L56,0', stroke: '#1A1A24', 'stroke-width': 5 }, g);
    return g;
  };
  chairs(230, '#C0392B'); chairs(370, '#2E6FB0'); chairs(980, '#C0392B');
  const conf = ipConf(Lbg, 'queenie');
  const TINT = {}; for (const k in IP_TINT) TINT[k] = linGrad(IP_TINT[k][0], IP_TINT[k][1], true);
  const flatShot = G(Lbg);
  const flat = ipFlat(flatShot, { night: true });
  const flatFront = G(Lfront); flatFront.appendChild(flat.front); flatFront.appendChild(flat.top);
  const logoBg = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#121A3A', '#7A1E58', true) }, logoBg);
  let rays = '';
  for (let i = 0; i < 16; i++) { const a0 = i / 16 * TAU, a1 = a0 + TAU / 40; rays += `M0,0 L${(Math.cos(a0) * 1100).toFixed(0)},${(Math.sin(a0) * 1100).toFixed(0)} L${(Math.cos(a1) * 1100).toFixed(0)},${(Math.sin(a1) * 1100).toFixed(0)} Z `; }
  const rayP = E('path', { d: rays, fill: '#9FB0E0', opacity: 0.07 }, logoBg);
  E('ellipse', { cx: 600, cy: 610, rx: 600, ry: 170, fill: glow('#FF8FC8'), opacity: 0.3 }, logoBg);

  /* ===== intro: 6 EXAM TRAPS ===== */
  const sI = G(Lhud);
  const iHead = outline(T(sI, 600, 168, '6 EXAM TRAPS', { size: 80, weight: 800, anchor: 'middle', fill: GOLD, ls: 3 }), '#5A3A07', 10);
  const iSub = T(sI, 600, 222, 'the Family Day saves you some marks', { size: 34, weight: 600, anchor: 'middle', fill: C.ink });
  const desk = G(Lfront);
  E('rect', { x: 50, y: 590, width: 1100, height: 100, rx: 16, fill: '#16233A', stroke: GOLD, 'stroke-width': 4 }, desk);
  const ROWX = [150, 330, 510, 690, 870, 1050];
  const badges = ROWX.map((x, k) => { const g = G(sI); E('circle', { r: 26, fill: GOLD, stroke: SC_INK, 'stroke-width': 4 }, g); T(g, 0, 11, String(k + 1), { size: 30, weight: 800, anchor: 'middle', fill: SC_INK }); return g; });

  /* ===== trap cards ===== */
  // 1 Queenie
  const c1 = trCard(Lfg, 1);
  const c1a = txt(c1, 258, '**×** and **÷** share a ticket', { size: 36 });
  const c1b = txt(c1, 308, '**left to right**', { size: 34, fill: BLUE });
  const c1c = mth(c1, 380, '12 ÷ 3 * 2');
  const c1d = mth(c1, 448, '= 4 * 2 = 8', { fill: GREEN });
  const c1e = trNo(c1, 532, '12 ÷ 6 = 2');
  // 2 Tiny
  const c2 = trCard(Lfg, 2);
  const c2a = txt(c2, 262, '{{3^4}}: the index counts the **3s**', { size: 34 });
  const c2b = mth(c2, 344, '3^4 = 3 * 3 * 3 * 3');
  const c2c = mth(c2, 414, '= 81', { fill: GREEN, size: 50 });
  const c2d = trNo(c2, 506, '3 * 4 = 12');
  const c2e = txt(c2, 566, 'not "3 times 4"', { size: 28, fill: GREY });
  // 3 Kavya
  const c3 = trCard(Lfg, 3);
  const c3a = txt(c3, 258, '**two** answers', { size: 40, boldFill: BLUE });
  const c3b = mth(c3, 334, 'x^2 = 25', { size: 50 });
  const c3c = txt(c3, 412, '{{x = 5}} or {{x = -5}}', { size: 42, fill: GREEN });
  const c3d = txt(c3, 478, '{{5^2 = 25}} and {{(-5)^2 = 25}}', { size: 30, fill: GREY });
  const c3e = G(c3); okTick(c3e, CX - 190, 540); txt(c3e, 552, 'Question 6: **4 marks back**', { size: 30, fill: GREEN }, CX + 18);
  // 4 Dad
  const c4 = trCard(Lfg, 4);
  const c4a = txt(c4, 258, 'Type the **brackets**', { size: 40, boldFill: BLUE });
  const c4b = G(c4); mth(c4b, 344, '(-3)^2 = 9', { size: 52, fill: GREEN }); okTick(c4b, CX + 150, 326);
  const c4c = txt(c4, 420, '**without** brackets:', { size: 28, fill: GREY });
  const c4d = mth(c4, 482, '-3^2 = -(3^2) = -9', { size: 40, fill: RED });
  const c4e = txt(c4, 548, 'the power touches only the **3**', { size: 28, fill: GREY });
  // 5 Mum
  const c5 = trCard(Lfg, 5);
  const c5a = txt(c5, 258, 'a **fraction bar** is a bracket', { size: 36, boldFill: '#B8336A' });
  const c5b = G(c5), c5box = G(c5);
  { const fo = { size: 46, fill: INK }, wF = mkMeasure('(8 + 4)/(2 * 3)', fo).w, wR = mkMeasure('= 12/6 = 2', fo).w, x0 = CX - (wF + 16 + wR) / 2, y = 400;
    const fm = mkMath(c5b, x0, y, '(8 + 4)/(2 * 3)', fo); mkMath(c5b, x0 + wF + 16, y, '= 12/6 = 2', fo);
    const ax = y - 0.3 * 46;   // the fraction bar
    E('rect', { x: x0 - 8, y: y - fm.a - 6, width: wF + 16, height: fm.a - 0.3 * 46 + 2, rx: 8, fill: 'rgba(76,201,240,0.18)', stroke: BLUE, 'stroke-width': 3 }, c5box);
    E('rect', { x: x0 - 8, y: ax + 6, width: wF + 16, height: fm.d + 0.3 * 46, rx: 8, fill: 'rgba(255,143,200,0.18)', stroke: '#B8336A', 'stroke-width': 3 }, c5box);
    c5b.insertBefore(c5box, c5b.firstChild); }
  const c5c = txt(c5, 530, 'whole **top**, whole **bottom**, then **divide**', { size: 28 });
  // 6 Auntie Rose
  const c6 = trCard(Lfg, 6);
  const c6a = txt(c6, 258, '**rise** = final − start', { size: 36, boldFill: '#B8336A' }, 930);
  const TQ = G(c6); tr(TQ, 690, 560);
  const tk = 9.6, TY = v => -40 - (v + 10) * tk;
  E('rect', { x: -12, y: TY(10) - 12, width: 24, height: -TY(10) + 12, rx: 12, fill: '#E9F2F7', stroke: '#8FB0C2', 'stroke-width': 3 }, TQ);
  E('circle', { r: 22, fill: '#E8424F', stroke: '#8FB0C2', 'stroke-width': 3 }, TQ);
  const tCol = E('rect', { x: -6, y: TY(-7), width: 12, height: -TY(-7) + 4, rx: 6, fill: '#E8424F' }, TQ);
  { let d = ''; for (let v = -10; v <= 10; v += 1) d += `M-14,${TY(v).toFixed(1)} L${v % 5 === 0 ? -28 : -20},${TY(v).toFixed(1)} `; E('path', { d, stroke: INK, 'stroke-width': 2.5 }, TQ);
    [-10, -5, 0, 5, 10].forEach(v => T(TQ, -34, TY(v) + 9, mkFmt(v), { size: 26, weight: 700, anchor: 'end', fill: v < 0 ? BLUE : INK })); }
  const tM7 = G(TQ); E('line', { x1: -14, y1: TY(-7), x2: 20, y2: TY(-7), stroke: BLUE, 'stroke-width': 5, 'stroke-linecap': 'round' }, tM7);
  const tM5 = G(TQ); E('line', { x1: -14, y1: TY(5), x2: 20, y2: TY(5), stroke: RED, 'stroke-width': 5, 'stroke-linecap': 'round' }, tM5);
  const tBr = mkBrace(TQ, 26, TY(5), 26, TY(-7), { text: '{{+12}}', col: GREEN, size: 30, depth: 18 });
  const c6b = txt(c6, 330, '{{-7}} °C → {{5}} °C', { size: 36 }, 950);
  const c6c = mth(c6, 410, '5 - (-7) = 12', { fill: GREEN, size: 46 }, 960);
  const c6d = trNo(c6, 488, '7 - 5 = 2', {}, 960);
  const c6e = txt(c6, 556, 'a rise of **12** degrees', { size: 30, fill: GREEN }, 960);

  /* ===== logo ===== */
  const sR = G(Lhud);
  const logo = G(sR);
  const logo1 = outline(T(logo, 0, -66, 'NEGATIVE', { size: 70, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 6 }), '#1A0E2A', 12);
  const logo2 = outline(T(logo, 0, 30, 'VIBES', { size: 112, weight: 800, anchor: 'middle', fill: GOLD, ls: 8 }), '#1A0E2A', 12);
  const bars = [-1, 1].map(sd => { const b = G(logo); tr(b, sd * 330, -20); E('rect', { x: -48, y: -16, width: 96, height: 32, rx: 16, fill: ball('#8C98C8', '#2E3552'), stroke: '#FFFFFF', 'stroke-width': 3 }, b); return b; });
  const rSub = T(sR, 600, 450, 'will return', { size: 46, weight: 600, anchor: 'middle', fill: '#FFFFFF' });

  /* ===== stinger: Monday evening ===== */
  const sW = G(Lhud);
  const cMon = mkChip(sW, '**Monday evening**', { size: 32, col: GOLD });
  const test = ipTest(Ltop, { rows: ['1. {{5 - (-3) = 8}}', '6. {{x^2 = 49, x = +-7}}', '9. {{-4 + (-6) = -10}}'] });
  test.marks.forEach(m => op(m, 0)); test.ticks.forEach(k => op(k, 1)); test.show(1);
  setText(test.note, 'Brilliant! Mr T'); test.note.setAttribute('fill', '#1E9E5A');
  const cProud = mkChip(sW, 'not **one** minus sign lost', { size: 30, col: '#9FD8FF' });
  const cMean = mkChip(Lhud, 'Meanwhile, at the void deck...', { size: 32, col: GOLD });

  /* ---------- the cast ---------- */
  const queenie = cast(Lcast, 'queenie'), tiny = cast(Lcast, 'tiny'), kav = cast(Lcast, 'kavya'), dad = cast(Lcast, 'dad'),
    mum = cast(Lcast, 'mum'), rose = cast(Lcast, 'rose'), boy = cast(Lcast, 'boy'), dash = cast(Lfg, 'dash'), pi = cast(Lcast, 'pi');

  /* ---------- shots ---------- */
  const cut = id => at(id) - 0.06;
  const SHOTS = [['I', -9], ['1', cut('t1')], ['2', cut('t2')], ['3', cut('t3')], ['4', cut('t4')], ['5', cut('t5')], ['6', cut('t6')],
    ['R', cut('return')], ['W', cut('twenty')], ['N', cut('meanwhile')]];
  const shotAt = t => { let s = 'I'; for (const [k, t0] of SHOTS) if (t >= t0) s = k; return s; };
  const CARDS = { 1: c1, 2: c2, 3: c3, 4: c4, 5: c5, 6: c6 };
  const CONF = { 1: 'queenie', 2: 'tiny', 3: 'kavya', 4: 'dad', 5: 'mum', 6: 'rose' };
  const ROW = [[queenie, 'smug', 0.42, 500], [tiny, 'happy', 0.7, 520], [kav, 'happy', 0.7, 500], [dad, 'smug', 0.7, 500], [mum, 'smug', 0.7, 500], [rose, 'happy', 0.7, 500]];
  // the digits on Uncle Pi's ticker: "2643383279" starts after 22 characters of "3.14159265358979323846"
  const charW = (textWidth('3.14159265358979323846', 30, FD, 700) + 22 * 2) / 22;
  const PI0 = (8 * charW) / 1500, PI1 = (32 * charW - 300) / 1500;   // ends with ...2643383279 at the right

  return t => {
    const sh = shotAt(t);
    deck.upd(t);
    const deckOn = sh === 'I' || sh === 'N' ? 1 : 0;
    op(deckShot, deckOn); op(dim, sh === 'I' ? 1 : 0); op(night, sh === 'N' ? 1 : 0); op(desk, sh === 'I' ? 1 : 0);
    op(logoBg, sh === 'R' ? 1 : 0); op(sI, sh === 'I' ? 1 : 0); op(sR, sh === 'R' ? 1 : 0); op(sW, sh === 'W' ? 1 : 0);
    op(flatShot, sh === 'W' ? 1 : 0); op(flatFront, sh === 'W' ? 1 : 0); op(test, sh === 'W' ? 1 : 0);
    for (const k in CARDS) op(CARDS[k], sh === k ? 1 : 0);
    const cw = CONF[sh];
    conf.set(cw ? 1 : 0, t); if (cw) conf.firstChild.setAttribute('fill', TINT[cw]);
    [queenie, tiny, kav, dad, mum, rose, boy, dash, pi].forEach(e => op(e, 0));
    cMean.set(0);
    const show = (c, x, y, s, st) => { op(c, 1); tr(c, x, y, s); c.set(Object.assign({ t }, st)); };

    if (sh === 'I') {
      const hp = P(t, at('intro') + 0.05, 0.45, pop);
      op(iHead, clamp(hp * 2.5)); iHead.setAttribute('transform', `translate(600 142) scale(${Math.max(0.01, 0.6 + 0.4 * hp).toFixed(3)}) translate(-600 -142)`);
      op(iSub, P(t, mid('intro', 0.3), 0.4, linear));
      ROW.forEach(([c, mood, s, y], i) => {
        const p = P(t, mid('intro', 0.35) + i * 0.13, 0.45, pop);
        show(c, ROWX[i], y + 40 * (1 - clamp(p)), Math.max(0.01, s * (0.7 + 0.3 * p)), { mood, look: 0, idx: '4', disp: 'B' });
        op(c, clamp(p * 3));
        popIn(badges[i], t, mid('intro', 0.4) + i * 0.13, ROWX[i], 640);
      });
    } else if (cw) {
      if (cw === 'queenie') {
        show(queenie, 330, 392, 1.0, { talk: talk(t, 'queenie'), mood: t > mid('t1', 0.75) ? 'annoyed' : 'smug', look: 0.4, disp: 'D M', tkt: 'D M', ticket: P(t, mid('t1', 0.12), 0.5, easeOut), ding: win(t, at('t1'), at('t1') + 1.0, 0.15) });
        fadeIn(c1a, t, at('t1') + 0.05); fadeIn(c1b, t, mid('t1', 0.3)); fadeIn(c1c, t, mid('t1', 0.45)); fadeIn(c1d, t, mid('t1', 0.6));
        fadeIn(c1e, t, mid('t1', 0.8)); c1e.set(P(t, mid('t1', 0.86), 0.3, linear));
      } else if (cw === 'tiny') {
        show(tiny, 330, 430, 1.8, { talk: talk(t, 'tiny'), mood: t > mid('t2', 0.75) ? 'annoyed' : 'happy', look: 0.4, idx: '4', arms: 0.9 });
        fadeIn(c2a, t, at('t2') + 0.05); fadeIn(c2b, t, mid('t2', 0.3)); fadeIn(c2c, t, mid('t2', 0.58)); fadeIn(c2d, t, mid('t2', 0.75)); c2d.set(P(t, mid('t2', 0.8), 0.3, linear));
        fadeIn(c2e, t, mid('t2', 0.85));
      } else if (cw === 'kavya') {
        show(kav, 300, 554, 1.4, { talk: talk(t, 'kavya'), mood: t > mid('t3', 0.75) ? 'smug' : 'neutral', look: 0.5 });
        fadeIn(c3a, t, at('t3') + 0.05); fadeIn(c3b, t, mid('t3', 0.15)); fadeIn(c3c, t, mid('t3', 0.4)); fadeIn(c3d, t, mid('t3', 0.6)); fadeIn(c3e, t, mid('t3', 0.78));
      } else if (cw === 'dad') {
        show(dad, 320, 554, 1.4, { talk: talk(t, 'dad'), mood: t > mid('t4', 0.75) ? 'happy' : 'smug', look: 0.5, lift: t > mid('t4', 0.72) ? 1 : 0 });
        fadeIn(c4a, t, at('t4') + 0.05); fadeIn(c4b, t, mid('t4', 0.18)); fadeIn(c4c, t, mid('t4', 0.45)); fadeIn(c4d, t, mid('t4', 0.52)); fadeIn(c4e, t, mid('t4', 0.62));
      } else if (cw === 'mum') {
        show(mum, 320, 554, 1.4, { talk: talk(t, 'mum'), mood: 'smug', look: 0.5 });
        fadeIn(c5a, t, at('t5') + 0.05); fadeIn(c5b, t, mid('t5', 0.3)); fadeIn(c5c, t, mid('t5', 0.7));
        op(c5box, P(t, mid('t5', 0.45), 0.3, linear));
      } else if (cw === 'rose') {
        show(rose, 320, 554, 1.4, { talk: talk(t, 'rose'), mood: t > mid('t6', 0.7) ? 'smug' : 'neutral', look: 0.5 });
        fadeIn(c6a, t, at('t6') + 0.05);
        op(tM7, P(t, mid('t6', 0.12), 0.3, linear)); op(tM5, P(t, mid('t6', 0.3), 0.3, linear));
        const rise = P(t, mid('t6', 0.15), 0.9, ease); attr(tCol, 'y', TY(lerp(-7, 5, rise))); attr(tCol, 'height', -TY(lerp(-7, 5, rise)) + 4);
        op(tBr, P(t, mid('t6', 0.45), 0.3, linear));
        fadeIn(c6b, t, mid('t6', 0.12)); fadeIn(c6c, t, mid('t6', 0.4)); fadeIn(c6d, t, mid('t6', 0.62)); c6d.set(P(t, mid('t6', 0.68), 0.3, linear)); fadeIn(c6e, t, mid('t6', 0.8));
      }
    } else if (sh === 'R') {
      tr(rayP, 600, 640, 1, (t * 6 * AMP) % 360);
      popIn(logo, t, at('return') + 0.05, 600, 300);
      bars.forEach((b, i) => tr(b, (i ? 1 : -1) * 330, -20, 1, Math.sin(t * 2 + i) * 6 * AMP));
      op(rSub, P(t, mid('return', 0.45), 0.4, linear));
    } else if (sh === 'W') {
      /* ---------- Monday evening: 20 out of 20 ---------- */
      popIn(cMon, t, at('twenty') + 0.05, 860, 110);
      const clap = k => (t > mid('twenty', 0.35) && t < at('proud') + 0.6 && Math.sin(t * 13 + k) > 0 ? 1 : 0);
      const proudOn = t >= at('proud') - 0.1, late = t >= at('ugh') - 0.1;
      show(kav, 205, 446, 1.02, { talk: talk(t, 'kavya'), mood: late ? 'deadpan' : 'happy', look: proudOn ? 0.8 : 0.5, lift: 0 });
      show(boy, 395, 458, 0.96, { talk: talk(t, 'boy'), mood: proudOn && t > mid('proud', 0.8) ? 'shock' : 'happy', look: 0.7, lift: clap(0) });
      show(mum, 820, 446, 1.02, { talk: talk(t, 'mum'), mood: late ? 'deadpan' : 'happy', look: -0.8, lift: clap(1.5) });
      show(dad, 1020, 446, 1.02, { talk: talk(t, 'dad'), mood: proudOn && t > mid('proud', 0.8) ? 'shock' : 'happy', look: -0.8, lift: clap(3) });
      const tp = P(t, at('twenty') - 0.1, 0.4, pop);
      tr(test, 600, 392 + 30 * (1 - tp), Math.max(0.01, 0.58 * (0.8 + 0.2 * tp)), -2);
      if (proudOn) {
        const sit = P(t, at('proud') - 0.1, 0.4, pop);
        op(dash, 1); tr(dash, 600, lerp(330, 205, sit), 0.62);
        const plus = late ? 1 : 0.55 * P(t, mid('proud', 0.62), 0.9, ease) + (t > end('proud') ? 0.45 * P(t, end('proud'), 0.5, ease) : 0);
        let dm = 'happy';
        if (t > mid('proud', 0.72)) dm = 'shock';
        if (late) dm = 'deadpan';
        dash.set({ t, talk: talk(t, 'dash'), mood: dm, look: late ? 0 : -0.4, plus, arms: t < mid('proud', 0.7) ? 0.8 : 0 });
        if (!late) { cProud.set(P(t, mid('proud', 0.08), 0.35, linear)); tr(cProud, 600, 640); } else cProud.set(0);
      } else cProud.set(0);
    } else {
      /* ---------- the void deck at night: Uncle Pi, still talking ---------- */
      if (t < at('still')) { cMean.set(P(t, at('meanwhile') + 0.05, 0.35, linear)); tr(cMean, 600, 140); }
      show(pi, 600, 440, 0.95, { talk: talk(t, 'pi'), mood: 'happy', look: Math.sin(t * 0.8) * 0.4, digits: lerp(PI0, PI1, P(t, at('meanwhile'), end('still') - at('meanwhile'), linear)) });
    }
  };
});
