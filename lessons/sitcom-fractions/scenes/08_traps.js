/* Scene 8: The party saves you some marks.
   Shots: "6 EXAM TRAPS" over the dimmed void deck, the six of them lined up with numbers -> six snappy
   confessionals, one trap card each (Dad holding his flat, sad cake: never add the bottoms; Kavya: borrow a whole;
   Flip: only the second fraction flips; Priya and her empty wallet: of the REMAINDER; Ah Boy: same units first;
   Mr Tan: only cancel factors, Mister X waving from the corner) -> logo "PIECE OF / CAKE will return" ->
   stinger, 6 p.m.: everyone in party hats, Victoria with an "8" candle -> Mum with the knife: a quarter? an eighth?
   -> Ah Boy, wise: smaller bottom, bigger piece... one-oneth -> Mum slides him the whole cake -> Victoria swoons ->
   close-up: Vinny on the table, a single tear, SIMPLEST FORM. Hold. */
scene('traps', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;
  const talk = (t, who) => scTalk(S, t, who);

  /* ---------- helpers ---------- */
  const GOLD = '#FFE45C', PINK = '#FF8FC8', INK = MK.ink, GREEN = '#1E9E5A', RED = '#C62828', BLUE = '#2E7DD8', BERRY = '#B8336A';
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const outline = (el, col, w) => { el.setAttribute('stroke', col); el.setAttribute('stroke-width', w); el.setAttribute('paint-order', 'stroke'); el.setAttribute('stroke-linejoin', 'round'); return el; };
  const chipAt = (parent, text, o) => { o = o || {}; return mkChip(parent, text, Object.assign({ size: 30, col: C.ink }, o)); };
  const lookAt = (x, sx) => clamp((sx - x) / 260, -1, 1);
  const CX = 880;
  function trCard(parent, n) {
    const g = G(parent);
    E('rect', { x: 606, y: 136, width: 560, height: 470, rx: 18, fill: 'rgba(0,0,0,0.3)' }, g);
    E('rect', { x: 600, y: 130, width: 560, height: 470, rx: 18, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, g);
    const head = chip(g, 'TRAP ' + n, { size: 30, fill: '#D32F2F', color: '#FFFFFF', weight: 800 }); tr(head, CX, 182);
    return g;
  }
  const txt = (parent, y, s, o) => mkText(parent, CX, y, s, Object.assign({ size: 36, anchor: 'middle', fill: INK }, o || {}));
  const fadeIn = (el, t, t0) => { const p = P(t, t0, 0.3, easeOut); op(el, p); tr(el, 0, 10 * (1 - p)); };
  function trNo(parent, y, s, o) {
    const g = G(parent), m = txt(g, y, s, Object.assign({ fill: RED }, o || {}));
    const sl = strike(g, CX - m.w / 2 - 12, y - 12, CX + m.w / 2 + 12, RED);
    g.set = p => sl.set(p);
    return g;
  }

  /* ---------- layers ---------- */
  const Lbg = G(root), Lcast = G(root), Lfront = G(root), Ltop = G(root), Lfg = G(root), Lhud = G(root);

  /* ---------- sets ---------- */
  const voidShot = G(Lbg);
  const vd = fcVoid(voidShot);
  Lfront.appendChild(vd.front);
  const dim = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#0A0614', opacity: 0.55 }, voidShot);
  const conf = fcConf(Lbg, 'dad');
  const TINT = {}; for (const k in FC_TINT) TINT[k] = linGrad(FC_TINT[k][0], FC_TINT[k][1], true);
  const logoBg = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#3A1050', '#8E2A7A', true) }, logoBg);
  let rays = '';
  for (let i = 0; i < 16; i++) { const a0 = i / 16 * TAU, a1 = a0 + TAU / 40; rays += `M0,0 L${(Math.cos(a0) * 1100).toFixed(0)},${(Math.sin(a0) * 1100).toFixed(0)} L${(Math.cos(a1) * 1100).toFixed(0)},${(Math.sin(a1) * 1100).toFixed(0)} Z `; }
  const rayP = E('path', { d: rays, fill: '#FFE45C', opacity: 0.07 }, logoBg);
  E('ellipse', { cx: 600, cy: 620, rx: 620, ry: 170, fill: glow('#FF8FC8'), opacity: 0.35 }, logoBg);

  /* ===== intro ===== */
  const sI = G(Lhud);
  const iHead = outline(T(sI, 600, 296, '6 EXAM TRAPS', { size: 80, weight: 800, anchor: 'middle', fill: GOLD, ls: 3 }), '#5A3A07', 10);
  const iSub = outline(T(sI, 600, 346, 'the party saves you some marks', { size: 34, weight: 700, anchor: 'middle', fill: '#FFFFFF' }), '#2A1A22', 6);
  const ROWX = [150, 330, 510, 690, 870, 1050];
  const badges = ROWX.map((x, k) => { const g = G(sI); E('circle', { r: 26, fill: GOLD, stroke: SC_INK, 'stroke-width': 4 }, g); T(g, 0, 11, String(k + 1), { size: 30, weight: 800, anchor: 'middle', fill: SC_INK }); return g; });

  /* ===== trap cards ===== */
  // 1 Dad: never add the bottoms
  const c1 = trCard(Lfg, 1);
  const c1a = txt(c1, 254, 'Never add the **bottoms**', { size: 40, boldFill: RED });
  const c1b = trNo(c1, 340, '{{2/3 + 3/5 = 5/8}}', { size: 42 });
  const c1c = txt(c1, 436, '{{2/3 + 3/5 = 10/15 + 9/15}}', { size: 40 });
  const c1d = txt(c1, 532, '{{= 19/15 = 1 4/15}}', { size: 44, fill: GREEN, weight: 800 });
  // 2 Kavya: borrow a whole
  const c2 = trCard(Lfg, 2);
  const c2a = txt(c2, 254, '**Borrow a whole**', { size: 42, boldFill: BLUE });
  const c2b = txt(c2, 330, '{{3 1/4 − 1 2/3}}', { size: 40 });
  const c2c = txt(c2, 412, '{{= 2 15/12 − 1 8/12}}', { size: 40 });
  const c2d = txt(c2, 494, '{{= 1 7/12}}', { size: 46, fill: GREEN, weight: 800 });
  const c2e = trNo(c2, 568, 'not {{2 5/12}}', { size: 34 });
  // 3 Flip: only the second flips
  const c3 = trCard(Lfg, 3);
  const c3a = txt(c3, 254, 'Only the **second** one flips', { size: 38, boldFill: RED });
  const c3b = txt(c3, 360, '{{a/b ÷ c/d = a/b × d/c}}', { size: 54 });
  const c3c = txt(c3, 470, '{{2/3 ÷ 4/5 = 2/3 × 5/4}}', { size: 40, fill: GREEN });
  const c3d = txt(c3, 560, 'the first one stays on its feet', { size: 28, fill: '#5A4A52' });
  // 4 Priya: of the remainder
  const c4 = trCard(Lfg, 4);
  const c4a = txt(c4, 250, "'Of the **remainder**'", { size: 40, boldFill: BERRY });
  const c4bar = mkBarModel(c4, { unit: 70, h: 64, size: 26, ink: INK, rows: [{ units: 6, col: '#9FE0B5', labels: ['', '', 'tea', '', '', ''] }],
    braces: [{ row: 0, from: 0, to: 1, text: 'present', below: true }, { row: 0, from: 2, to: 5, text: 'the **remainder**', below: true }] });
  tr(c4bar, 670, 300);
  c4bar.rowsG[0].cells.forEach((c, j) => attr(c.firstChild, 'fill', j < 2 ? '#FF9FCB' : j === 2 ? '#FFC247' : '#9FE0B5'));
  const c4b = txt(c4, 476, '{{1/4}} of the {{2/3}} left {{= 1/6}}', { size: 32 });
  const c4c = txt(c4, 560, 'a fraction of what\'s **left**', { size: 32, boldFill: BERRY });
  // 5 Ah Boy: same units first
  const c5 = trCard(Lfg, 5);
  const c5a = txt(c5, 254, '**Same units first**', { size: 42, boldFill: BLUE });
  const c5b = txt(c5, 334, '{{2 "h" = 120 "min"}}', { size: 40 });
  const c5c = txt(c5, 440, '{{45/120 = 3/8}}', { size: 52, fill: GREEN, weight: 800 });
  const c5d = trNo(c5, 548, 'not {{45/2}}', { size: 36 });
  // 6 Mr Tan: only cancel factors
  const c6 = trCard(Lfg, 6);
  const c6a = txt(c6, 254, 'Only cancel **factors**', { size: 40, boldFill: BERRY });
  const c6b = txt(c6, 350, '{{(x + 6)/(x + 3) != 2}}', { size: 50, fill: RED });
  const c6c = txt(c6, 440, 'try {{x = 1}}:', { size: 32, fill: '#5A4A52' });
  const c6d = txt(c6, 530, '{{(1 + 6)/(1 + 3) = 7/4}}', { size: 44, fill: GREEN, weight: 800 });

  /* ===== logo ===== */
  const sR = G(Lhud);
  const logo = G(sR);
  outline(T(logo, 0, -46, 'PIECE OF', { size: 76, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 6 }), '#3A0820', 12);
  E('rect', { x: -250, y: -22, width: 500, height: 20, rx: 10, fill: GOLD, stroke: '#3A0820', 'stroke-width': 5 }, logo);
  outline(T(logo, 0, 82, 'CAKE', { size: 110, weight: 800, anchor: 'middle', fill: GOLD, ls: 8 }), '#3A0820', 12);
  const rSub = T(sR, 600, 470, 'will return', { size: 46, weight: 600, anchor: 'middle', fill: '#FFFFFF' });

  /* ===== stinger ===== */
  const sW = G(Lfg);
  const c6pm = chipAt(sW, '**6 p.m.**', { col: GOLD, size: 32 });
  const bubWhich = mkSpeechBubble(sW, 'A **quarter**? An **eighth**?', { size: 32, tail: 'down', tailX: -60 });
  const cRule = chipAt(sW, '**smaller** bottom, **bigger** piece', { col: '#9FE0B5', size: 30 });
  const drift = [['1/4', -1], ['1/8', 1]].map(([src]) => { const g = G(sW); E('circle', { r: 46, fill: 'rgba(10,27,39,0.88)', stroke: GOLD, 'stroke-width': 3 }, g); const m = mkMath(g, 0, 0, src, { size: 40, anchor: 'middle', fill: C.ink }); tr(m, 0, (m.a - m.d) / 2); return g; });
  const bubOne = mkSpeechBubble(sW, '{{1/1}}', { size: 56, tail: 'down', tailX: 40 });
  const cWhole = chipAt(sW, '{{1/1}} = **1 whole** cake', { col: PINK, size: 32 });
  const stampSF = fcStamp(Lhud, true);

  /* ---------- the cast ---------- */
  const HAT = { kavya: '#FF5FA2', mum: '#FFC247', dad: '#56D69B', priya: '#B48CFF', tan: '#FF8A3D' };
  const dad = cast(Lcast, 'dad', { prop: null, hand: true, hat: HAT.dad });
  const kav = cast(Lcast, 'kavya', { hat: HAT.kavya });
  const priya = cast(Lcast, 'priya', { hand: true, hat: HAT.priya });
  const boy = cast(Lcast, 'boy', { hat: '#4CC9F0' });
  const tan = cast(Lcast, 'tan', { hat: HAT.tan });
  const mum = cast(Lcast, 'mum', { hand: true, hat: HAT.mum });
  const flip = cast(Ltop, 'flip');
  const vic = cast(Ltop, 'vic');
  const vinny = cast(Ltop, 'vinny');
  const ex = cast(Lfg, 'ex');
  const hats = [dad, kav, priya, tan, mum].map(c => c.hatG);
  // Dad's flat, sad cake
  const flatCake = G(dad.hand); tr(flatCake, -62, -46, 1, 16);
  E('path', { d: 'M-70,-40 Q0,-58 70,-40 L74,-14 Q0,0 -74,-14 Z', fill: '#E9B868', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, flatCake);
  E('path', { d: 'M-66,-44 Q0,-60 66,-44 Q60,-30 50,-38 Q40,-24 30,-36 Q14,-26 0,-38 Q-16,-26 -30,-36 Q-42,-24 -52,-38 Q-60,-30 -66,-44 Z', fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, flatCake);
  E('path', { d: 'M-16,-24 a3,3 0 1 0 6,0 a3,3 0 1 0 -6,0 M10,-24 a3,3 0 1 0 6,0 a3,3 0 1 0 -6,0', fill: SC_INK }, flatCake);
  E('path', { d: 'M-10,-10 Q0,-18 10,-10', fill: 'none', stroke: SC_INK, 'stroke-width': 3, 'stroke-linecap': 'round' }, flatCake);
  // Priya's empty wallet
  const wallet = G(priya.hand); tr(wallet, -58, 10, 1, 16);
  E('path', { d: 'M-54,-96 L54,-96 L54,-6 L-54,-6 Z', fill: '#8A5A3A', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, wallet);
  E('path', { d: 'M-46,-88 L46,-88 L46,-40 L-46,-40 Z', fill: '#3A2418', stroke: SC_INK, 'stroke-width': 3 }, wallet);
  E('path', { d: 'M-20,-64 q6,-10 12,0 q6,10 12,0 q6,-10 12,0', fill: 'none', stroke: '#C9D3DC', 'stroke-width': 3, 'stroke-linecap': 'round' }, wallet);   // a moth's flutter
  // Mum's cake knife
  const knife = G(mum.hand); tr(knife, -6, 4, 1.35, 22);
  E('rect', { x: -7, y: -30, width: 14, height: 44, rx: 5, fill: '#3A2A20', stroke: SC_INK, 'stroke-width': 3 }, knife);
  E('path', { d: 'M-9,-30 L-9,-150 Q8,-140 10,-30 Z', fill: '#DDE5EC', stroke: SC_INK, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, knife);
  // Victoria's "8" candle (rides on her, so it moves and tilts with her)
  const candle = G(vic.firstChild); tr(candle, -66, -96);
  outline(T(candle, 0, 0, '8', { size: 64, weight: 800, anchor: 'middle', fill: '#4CC9F0' }), SC_INK, 6);
  E('line', { x1: 0, y1: -46, x2: 0, y2: -58, stroke: SC_INK, 'stroke-width': 3 }, candle);
  const flame = E('path', { d: 'M0,-58 Q-10,-70 0,-88 Q10,-70 0,-58 Z', fill: '#FFC247', stroke: '#E07A1A', 'stroke-width': 2 }, candle);

  /* ---------- shots ---------- */
  const cut = id => at(id) - 0.06;
  const SHOTS = [['I', -9], ['1', cut('t1')], ['2', cut('t2')], ['3', cut('t3')], ['4', cut('t4')], ['5', cut('t5')], ['6', cut('t6')],
    ['R', cut('return')], ['W', cut('six')], ['V', cut('tear')]];
  const shotAt = t => { let s = 'I'; for (const [k, t0] of SHOTS) if (t >= t0) s = k; return s; };
  const CARDS = { 1: c1, 2: c2, 3: c3, 4: c4, 5: c5, 6: c6 };
  const CONF = { 1: 'dad', 2: 'kavya', 3: 'flip', 4: 'priya', 5: 'boy', 6: 'tan' };
  const ROW = [[dad, 'smug', 0.62, 470], [kav, 'smug', 0.62, 470], [flip, 'happy', 0.42, 556 - 118 * 0.42], [priya, 'smug', 0.62, 470], [boy, 'happy', 0.64, 478], [tan, 'happy', 0.62, 466]];
  const WX = { priya: 95, kav: 245, dad: 395, mum: 560, vic: 780, boy: 1062, vinny: 172 }, WY = 452, WS = 0.9;
  const VICY = 560 - 110 * 0.82;

  return t => {
    const sh = shotAt(t), who = scWho(S, t);
    vd.upd(t * AMP);
    const wide = sh === 'I' || sh === 'W' || sh === 'V';
    op(voidShot, wide ? 1 : 0); op(vd.front, wide ? 1 : 0); op(dim, sh === 'I' ? 1 : 0);
    op(logoBg, sh === 'R' ? 1 : 0); op(sI, sh === 'I' ? 1 : 0); op(sR, sh === 'R' ? 1 : 0); op(sW, sh === 'W' ? 1 : 0);
    for (const k in CARDS) op(CARDS[k], sh === k ? 1 : 0);
    const cw = CONF[sh];
    conf.set(cw ? 1 : 0, t); if (cw) conf.firstChild.setAttribute('fill', TINT[cw]);
    [dad, kav, priya, boy, tan, mum, flip, vic, vinny, ex].forEach(e => op(e, 0));
    [flatCake, wallet, knife].forEach(e => op(e, 0));
    hats.forEach(h => op(h, sh === 'W' || sh === 'V' ? 1 : 0));
    stampSF.set(0);
    [c6pm, bubWhich, cRule, bubOne, cWhole].forEach(c => c.set(0)); drift.forEach(d => op(d, 0));
    const show = (c, x, y, s, st, r) => { op(c, 1); c.set(Object.assign({ t }, st)); tr(c, x, y, s, r || 0); };

    if (sh === 'I') {
      const hp = P(t, at('intro') + 0.05, 0.45, pop);
      op(iHead, clamp(hp * 2.5)); iHead.setAttribute('transform', `translate(600 270) scale(${Math.max(0.01, 0.6 + 0.4 * hp).toFixed(3)}) translate(-600 -270)`);
      op(iSub, P(t, mid('intro', 0.3), 0.4, linear));
      ROW.forEach(([c, mood, s, y], i) => {
        const p = P(t, mid('intro', 0.35) + i * 0.14, 0.45, pop);
        show(c, ROWX[i], y + 40 * (1 - clamp(p)), Math.max(0.01, s * (0.7 + 0.3 * p)), { mood, look: 0, arms: c === flip ? 1 : 0, lift: 0 });
        op(c, clamp(p * 3));
        popIn(badges[i], t, mid('intro', 0.4) + i * 0.14, ROWX[i], 640);
      });
    } else if (cw) {
      if (cw === 'dad') {
        show(dad, 320, 572, 1.4, { talk: talk(t, 'dad'), mood: t > mid('t1', 0.75) ? 'sad' : 'neutral', look: 0.4, lift: t > mid('t1', 0.7) ? 1 : 0 });
        op(flatCake, t > mid('t1', 0.7) ? 1 : 0);
        fadeIn(c1a, t, at('t1') + 0.1); fadeIn(c1b, t, mid('t1', 0.2)); c1b.set(P(t, mid('t1', 0.32), 0.3, linear));
        fadeIn(c1c, t, mid('t1', 0.45)); fadeIn(c1d, t, mid('t1', 0.6));
      } else if (cw === 'kavya') {
        show(kav, 320, 560, 1.4, { talk: talk(t, 'kavya'), mood: t > mid('t2', 0.8) ? 'smug' : 'neutral', look: 0.4 });
        fadeIn(c2a, t, at('t2') + 0.1); fadeIn(c2b, t, mid('t2', 0.2)); fadeIn(c2c, t, mid('t2', 0.42)); fadeIn(c2d, t, mid('t2', 0.6));
        fadeIn(c2e, t, mid('t2', 0.78)); c2e.set(P(t, mid('t2', 0.86), 0.3, linear));
      } else if (cw === 'flip') {
        const sp = 360 * P(t, mid('t3', 0.45), 0.6, ease);
        show(flip, 320, 430, 1.3, { talk: talk(t, 'flip'), mood: 'happy', look: 0.4, arms: t > mid('t3', 0.45) + 0.6 ? 1 : 0 }, sp);
        fadeIn(c3a, t, at('t3') + 0.1); fadeIn(c3b, t, mid('t3', 0.25)); fadeIn(c3c, t, mid('t3', 0.45)); fadeIn(c3d, t, mid('t3', 0.65));
      } else if (cw === 'priya') {
        const wl = t > mid('t4', 0.72);
        show(priya, 320, 560, 1.4, { talk: talk(t, 'priya'), mood: wl ? 'sad' : 'smug', look: 0.4, lift: wl ? 1 : 0 });
        op(wallet, wl ? 1 : 0);
        fadeIn(c4a, t, at('t4') + 0.1);
        c4bar.row(0, P(t, mid('t4', 0.15), 0.5, linear)); c4bar.brace(0, P(t, mid('t4', 0.3), 0.3, linear)); c4bar.brace(1, P(t, mid('t4', 0.4), 0.3, linear));
        fadeIn(c4b, t, mid('t4', 0.5)); fadeIn(c4c, t, mid('t4', 0.6));
      } else if (cw === 'boy') {
        show(boy, 310, 548, 1.5, { talk: talk(t, 'boy'), mood: 'happy', look: 0.4, lift: t > mid('t5', 0.2) && t < mid('t5', 0.6) ? 1 : 0 });
        fadeIn(c5a, t, at('t5') + 0.1); fadeIn(c5b, t, mid('t5', 0.35)); fadeIn(c5c, t, mid('t5', 0.6));
        fadeIn(c5d, t, mid('t5', 0.78)); c5d.set(P(t, mid('t5', 0.86), 0.3, linear));
      } else {
        show(tan, 320, 572, 1.4, { talk: talk(t, 'tan'), mood: t > mid('t6', 0.8) ? 'happy' : 'neutral', look: 0.4 });
        fadeIn(c6a, t, at('t6') + 0.1); fadeIn(c6b, t, mid('t6', 0.3)); fadeIn(c6c, t, mid('t6', 0.62)); fadeIn(c6d, t, mid('t6', 0.72));
        const xp = P(t, mid('t6', 0.4), 0.5, easeOut);
        show(ex, 540, lerp(780, 610, xp), 0.42, { talk: 0, mood: 'smug', look: -0.6, guard: 1 }, 10 * Math.sin(t * 7) * AMP);
      }
    } else if (sh === 'R') {
      tr(rayP, 600, 640, 1, (t * 6 * AMP) % 360);
      popIn(logo, t, at('return') + 0.05, 600, 260);
      op(rSub, P(t, mid('return', 0.45), 0.4, linear));
    } else if (sh === 'W') {
      /* ---------- stinger: 6 p.m. ---------- */
      const inWhich = t >= at('which'), inLearnt = t >= at('learnt'), inOne = t >= at('oneth'), inBday = t >= at('birthday'), inWhole = t >= at('whole');
      const spk = who === 'mum' ? WX.mum : who === 'boy' ? WX.boy : who === 'vic' ? WX.vic : WX.vic;
      const shockAll = inOne && !inBday;
      show(priya, WX.priya, WY, WS, { talk: 0, mood: shockAll ? 'shock' : inWhole ? 'happy' : 'happy', look: lookAt(WX.priya, spk) });
      show(kav, WX.kav, WY, WS, { talk: 0, mood: shockAll ? 'deadpan' : 'happy', look: inLearnt && !inBday ? 0 : lookAt(WX.kav, spk) });
      show(dad, WX.dad, WY - 6, WS, { talk: 0, mood: shockAll ? 'shock' : 'happy', look: lookAt(WX.dad, spk) });
      const knifeUp = inWhich && !inBday;
      show(mum, WX.mum, WY - 6, WS, { talk: talk(t, 'mum'), mood: inBday ? (inWhole ? 'happy' : 'deadpan') : shockAll ? 'shock' : 'happy', look: lookAt(WX.mum, inBday ? WX.boy : spk), lift: knifeUp ? 1 : 0 });
      op(knife, knifeUp ? 1 : 0);
      show(boy, WX.boy, WY + 10, WS, { talk: talk(t, 'boy'), mood: inWhole ? 'happy' : inLearnt ? 'smug' : 'happy', look: inLearnt && !inBday ? -0.2 : lookAt(WX.boy, spk), lift: inLearnt && !inBday ? 1 : 0 });
      // Victoria slides along the table to Ah Boy on "birthday", then swoons
      const sl = P(t, mid('birthday', 0.3), 0.8, ease);
      const vx = lerp(WX.vic, 878, sl);
      show(vic, vx, VICY, 0.82, { talk: talk(t, 'vic'), mood: inWhole ? 'happy' : inWhich && !inBday ? 'shock' : 'smug', look: inWhich && !inBday ? -0.9 : 0.5, swoon: P(t, at('whole') + 0.1, 0.6, ease), sweat: inWhich && !inBday ? 1 : 0 });
      flame.setAttribute('transform', `scale(${(1 + 0.12 * Math.sin(t * 17) * AMP).toFixed(3)} ${(1 + 0.18 * Math.sin(t * 13) * AMP).toFixed(3)})`);
      show(vinny, WX.vinny, 556 - 114 * 0.4, 0.4, { talk: 0, mood: inWhole ? 'neutral' : 'deadpan', look: lookAt(WX.vinny, spk) });
      if (!inWhich) { c6pm.set(P(t, at('six') + 0.1, 0.35, linear)); tr(c6pm, 600, 250); }
      else if (!inLearnt) { bubWhich.set(P(t, mid('which', 0.25), 0.35, linear)); tr(bubWhich, 640, 266); }
      else if (!inOne) {
        cRule.set(P(t, mid('learnt', 0.5), 0.35, linear)); tr(cRule, 600, 250);
        drift.forEach((d, i) => { const p = P(t, mid('learnt', 0.15) + i * 0.25, 0.45, pop); op(d, clamp(p * 3)); tr(d, i ? 1010 : 190, 236 + 8 * Math.sin(t * 2.4 + i * 2) * AMP, Math.max(0.01, 0.6 + 0.4 * p)); });
      } else if (!inBday) { bubOne.set(P(t, at('oneth') + 0.05, 0.3, linear)); tr(bubOne, 960, 250); }
      else if (inWhole) { cWhole.set(P(t, mid('whole', 0.3), 0.35, linear)); tr(cWhole, 760, 262); }
    } else if (sh === 'V') {
      /* ---------- close-up: Vinny's tear ---------- */
      show(vinny, 360, 556 - 114 * 1.0, 1.0, { talk: talk(t, 'vinny'), mood: 'sad', look: 0.6, tear: P(t, mid('tear', 0.55), 1.4, linear), still: true });
      show(boy, 930, 446, 1.05, { talk: 0, mood: 'happy', look: -0.4 });
      show(vic, 760, 560 - 110 * 0.8, 0.8, { talk: 0, mood: 'happy', look: 0.6, swoon: 1 });
      flame.setAttribute('transform', `scale(${(1 + 0.12 * Math.sin(t * 17) * AMP).toFixed(3)} ${(1 + 0.18 * Math.sin(t * 13) * AMP).toFixed(3)})`);
      stampSF.set(P(t, mid('tear', 0.75), 0.35, linear)); tr(stampSF, 745, 262, 0.5);
    }
  };
});
