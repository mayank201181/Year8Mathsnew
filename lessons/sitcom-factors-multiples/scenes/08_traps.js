/* Scene 8: The party saves you some marks.
   Shots: "6 EXAM TRAPS" over the void deck, the six lined up with numbers -> six snappy talking heads, one trap card
   each (Banyan: never leave a composite, 2² × 9 × 5 -> 2² × 3² × 5, multiply back; Hattie & Lottie: a product of
   primes is multiplied, in index form, not a list, not plus signs; Big Two: building up -> LCM, breaking down -> HCF;
   Paati: answer the question asked, 7:36 p.m. not 36, her sisters' bus; Mr Tan: HCF × LCM = a × b for two numbers
   only, 12, 18, 30 breaks it; Ah Boy: √1764, halve the powers, 42 not 882) -> logo "PRIME TIME will return" ->
   stinger at the club door, 10 p.m.: One tries again, THE LIST, NOT ON THE LIST -> Paati: "He's my plus one", +1
   badge -> Big Two sighs, unhooks the rope, PLUS ONE -> One runs in, the door glows, music notes -> Big Two to
   camera: "Still not prime." Final frame: the door ajar, PLUS ONE, Big Two deadpan. */
scene('traps', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;
  const talk = (t, who) => scTalk(S, t, who);

  /* ---------- helpers ---------- */
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const pill = (parent, text, o) => { o = o || {}; return mkChip(parent, text, { size: o.size || 30, col: o.col || C.ink }); };
  const outline = (el, col, w) => { el.setAttribute('stroke', col); el.setAttribute('stroke-width', w); el.setAttribute('paint-order', 'stroke'); el.setAttribute('stroke-linejoin', 'round'); return el; };
  const GOLD = '#FFE45C', INK = MK.ink, GREEN = '#1E9E5A', RED = '#C62828', BLUE = '#2E7DD8', BERRY = '#B8336A', PURP = '#6A3FD0';
  const CX = 880;
  function trCard(parent, n) {
    const g = G(parent);
    E('rect', { x: 606, y: 136, width: 560, height: 470, rx: 18, fill: 'rgba(0,0,0,0.3)' }, g);
    E('rect', { x: 600, y: 130, width: 560, height: 470, rx: 18, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, g);
    const head = chip(g, 'TRAP ' + n, { size: 30, fill: '#D32F2F', color: '#FFFFFF', weight: 800 }); tr(head, CX, 182);
    return g;
  }
  const txt = (parent, y, s, o) => mkText(parent, CX, y, s, Object.assign({ size: 34, anchor: 'middle', fill: INK }, o || {}));
  const mth = (parent, y, src, o) => mkMath(parent, CX, y, src, Object.assign({ size: 40, fill: INK, anchor: 'middle' }, o || {}));
  const fadeIn = (el, t, t0) => { const p = P(t, t0, 0.3, easeOut); op(el, p); tr(el, 0, 10 * (1 - p)); };
  // a crossed-out line of markup (mkText): g.set(p) draws the strike
  function trNo(parent, y, s, o) {
    const g = G(parent), m = txt(g, y, s, Object.assign({ fill: RED }, o || {}));
    const sl = strike(g, CX - m.w / 2 - 10, y - 12, CX + m.w / 2 + 10, RED);
    g.set = p => sl.set(p);
    return g;
  }
  const okMark = (parent, x, y) => { const k = tick(parent, 15, GREEN); tr(k, x, y); return k; };

  /* ---------- layers ---------- */
  const Lbg = G(root), Lcast = G(root), Lfront = G(root), Lfg = G(root), Lhud = G(root);

  /* ---------- sets ---------- */
  const voidShot = G(Lbg);
  const vd = fmVoid(voidShot);
  Lfront.appendChild(vd.front); Lfront.appendChild(vd.top);
  const dim = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#0A0614', opacity: 0.72 }, voidShot);
  const conf = fmConf(Lbg, 'two');
  const TINT = {}; for (const kk in FM_TINT) TINT[kk] = linGrad(FM_TINT[kk][0], FM_TINT[kk][1], true);
  const logoBg = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#24104A', '#5B2FA8', true) }, logoBg);
  let rays = '';
  for (let i = 0; i < 16; i++) { const a0 = i / 16 * TAU, a1 = a0 + TAU / 40; rays += `M0,0 L${(Math.cos(a0) * 1100).toFixed(0)},${(Math.sin(a0) * 1100).toFixed(0)} L${(Math.cos(a1) * 1100).toFixed(0)},${(Math.sin(a1) * 1100).toFixed(0)} Z `; }
  const rayP = E('path', { d: rays, fill: GOLD, opacity: 0.07 }, logoBg);
  E('ellipse', { cx: 600, cy: 610, rx: 620, ry: 170, fill: glow('#FF5FD2'), opacity: 0.3 }, logoBg);
  const clubShot = G(Lbg), clubWrap = G(clubShot);
  const club = fmClub(clubWrap);
  // the door, open: a warm glow in the doorway and the door swung inwards
  const doorOpen = G(clubWrap);
  E('rect', { x: 568, y: 256, width: 224, height: 384, rx: 12, fill: linGrad('#FFF3B0', '#FFB347', true) }, doorOpen);
  E('rect', { x: 568, y: 256, width: 224, height: 384, rx: 12, fill: glow('#FFFFFF'), opacity: 0.6 }, doorOpen);
  E('path', { d: 'M568,256 L646,282 L646,616 L568,640 Z', fill: linGrad(FM_COL.purple, FM_COL.purpleDk, true), stroke: '#1A1030', 'stroke-width': 4, 'stroke-linejoin': 'round' }, doorOpen);
  E('circle', { cx: 634, cy: 450, r: 9, fill: FM_COL.gold, stroke: SC_INK, 'stroke-width': 2 }, doorOpen);
  // the rope, unhooked: hanging from the left post
  const ropeDown = E('path', { d: 'M380,528 Q392,600 404,636', fill: 'none', stroke: '#8E1B3A', 'stroke-width': 14, 'stroke-linecap': 'round' }, clubWrap);

  /* ===== intro: 6 EXAM TRAPS ===== */
  const sI = G(Lhud);
  const iHead = outline(T(sI, 600, 236, '6 EXAM TRAPS', { size: 80, weight: 800, anchor: 'middle', fill: GOLD, ls: 3 }), '#3A1A07', 10);
  const iSub = T(sI, 600, 292, 'the party saves you some marks', { size: 34, weight: 600, anchor: 'middle', fill: C.ink });
  const ROWX = [130, 318, 506, 694, 882, 1070];
  const badges = ROWX.map((x, k) => { const g = G(sI); E('circle', { r: 26, fill: GOLD, stroke: SC_INK, 'stroke-width': 4 }, g); T(g, 0, 11, String(k + 1), { size: 30, weight: 800, anchor: 'middle', fill: SC_INK }); return g; });

  /* ===== trap cards ===== */
  // 1 Banyan: never leave a composite
  const c1 = trCard(Lfg, 1);
  const c1a = txt(c1, 260, 'Never leave a **composite**', { size: 38, boldFill: RED });
  const c1b = G(c1);
  const c1m = mth(c1b, 340, '180 = 2^2 * 9 * 5');
  const w9a = mkMeasure('180 = 2^2 * ', { size: 40 }).w, w9 = mkMeasure('9', { size: 40 }).w;
  const ring9 = E('circle', { cx: c1m.x0 + w9a + w9 / 2 + 5, cy: 326, r: 22, fill: 'none', stroke: RED, 'stroke-width': 4 }, c1b);
  const c1n = txt(c1, 392, 'split the {{9 = 3 × 3}}', { size: 30, fill: RED });
  const c1c = G(c1); { const m = mth(c1c, 456, '180 = 2^2 * 3^2 * 5', { fill: GREEN, size: 42 }); okMark(c1c, CX + m.w / 2 + 30, 440); }
  const c1d = txt(c1, 540, '**Multiply back:** {{4 × 9 × 5 = 180}} ✓', { size: 30, boldFill: BLUE });
  // 2 Hattie & Lottie: a product of primes is multiplied
  const c2 = trCard(Lfg, 2);
  const c2a = txt(c2, 256, 'A **product** of primes', { size: 38, boldFill: BERRY });
  const c2a2 = txt(c2, 304, 'means **multiplied**, in **index form**', { size: 30, boldFill: BERRY });
  const c2b = G(c2); { const m = mth(c2b, 380, '180 = 2^2 * 3^2 * 5', { fill: GREEN, size: 42 }); okMark(c2b, CX + m.w / 2 + 30, 364); }
  const c2c = trNo(c2, 462, '{{2, 2, 3, 3, 5}}  (a list)', { size: 32 });
  const c2d = trNo(c2, 540, '{{2^2 + 3^2 + 5}}  (plus signs)', { size: 32 });
  // 3 Big Two: decide first
  const c3 = trCard(Lfg, 3);
  const c3a = txt(c3, 260, 'Decide **first**:', { size: 40, boldFill: PURP });
  const c3b = txt(c3, 340, 'building **up** → **LCM**', { size: 40, boldFill: BLUE });
  const c3b2 = txt(c3, 388, 'next time **together**, fewest packs', { size: 28, fill: '#5A4A52' });
  const c3c = txt(c3, 470, 'breaking **down** → **HCF**', { size: 40, boldFill: GREEN });
  const c3c2 = txt(c3, 518, 'largest **equal groups**, nothing left', { size: 28, fill: '#5A4A52' });
  // 4 Paati: answer the question asked
  const c4 = trCard(Lfg, 4);
  const c4a = txt(c4, 258, 'Answer the question **asked**', { size: 36, boldFill: BERRY });
  const c4b = txt(c4, 324, 'buses every {{12}} and {{18}} min, from 7:00', { size: 28, fill: '#5A4A52' });
  const c4c = G(c4); mth(c4c, 384, 'LCM(12, 18) = 36', { size: 38 });
  const c4d = trNo(c4, 446, 'answer: {{36}}', { size: 34 });
  const c4e = G(c4); { const m = txt(c4e, 508, '7:00 + 36 min = **7:36 p.m.**', { size: 34, fill: GREEN, boldFill: GREEN }); okMark(c4e, CX + m.w / 2 + 28, 494); }
  const bus = G(c4);
  E('rect', { x: -70, y: -34, width: 140, height: 52, rx: 10, fill: '#E8424F', stroke: SC_INK, 'stroke-width': 3 }, bus);
  for (let i = 0; i < 4; i++) E('rect', { x: -60 + i * 32, y: -26, width: 24, height: 18, rx: 3, fill: '#BFEAFF' }, bus);
  [-40, 40].forEach(x => E('circle', { cx: x, cy: 20, r: 10, fill: '#2A2A2A', stroke: '#9AA6B2', 'stroke-width': 3 }, bus));
  // 5 Mr Tan: two numbers only
  const c5 = trCard(Lfg, 5);
  const c5a = G(c5); mth(c5a, 260, '"HCF" * "LCM" = a * b', { size: 42, fill: BLUE });
  const c5b = txt(c5, 318, '**two** numbers only', { size: 34, boldFill: GREEN });
  const c5c = txt(c5, 376, '{{60}}, {{72}}: {{12 × 360 = 4320 = 60 × 72}} ✓', { size: 26, fill: GREEN });
  const c5d = txt(c5, 446, '**three**? {{12}}, {{18}}, {{30}}: HCF {{6}}, LCM {{180}}', { size: 28, fill: RED, boldFill: RED });
  const c5e = G(c5); mth(c5e, 506, '6 * 180 = 1080', { size: 34, fill: RED });
  const c5f = G(c5); mth(c5f, 558, '!= 12 * 18 * 30 = 6480', { size: 34, fill: RED });
  // 6 Ah Boy: halve the powers
  const c6 = trCard(Lfg, 6);
  const c6a = txt(c6, 262, '{{sqrt(1764)}}: halve the **powers**', { size: 36, boldFill: BERRY });
  const c6b = G(c6); mth(c6b, 346, '1764 = 2^2 * 3^2 * 7^2', { size: 40 });
  const c6c = G(c6); { const m = mth(c6c, 432, 'sqrt(1764) = 2 * 3 * 7 = 42', { size: 40, fill: GREEN }); okMark(c6c, CX + m.w / 2 + 28, 414); }
  const c6d = trNo(c6, 516, '{{1764 ÷ 2 = 882}}', { size: 36 });
  const c6e = txt(c6, 566, 'not the **number**!', { size: 28, fill: RED, boldFill: RED });

  /* ===== logo ===== */
  const sR = G(Lhud);
  const logo = G(sR);
  outline(T(logo, 0, -20, 'PRIME', { size: 120, weight: 800, anchor: 'middle', fill: GOLD, ls: 6 }), '#1A0A36', 14);
  outline(T(logo, 0, 66, 'TIME', { size: 78, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 14 }), '#1A0A36', 12);
  const lnums = ['2', '3', '5', '7'].map((d, i) => {
    const g = G(logo); const x = [-330, 330, -420, 420][i], y = [-50, -50, 50, 50][i];
    E('circle', { r: 40, fill: ['#6A3FD0', '#FF8A3D', '#2FA36B', '#E8424F'][i], stroke: '#FFFFFF', 'stroke-width': 4 }, g);
    T(g, 0, 18, d, { size: 52, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
    return { g, x, y };
  });
  const rSub = T(sR, 600, 470, 'will return', { size: 46, weight: 600, anchor: 'middle', fill: '#FFFFFF' });

  /* ===== stinger: the club, 10 p.m. ===== */
  const sW = G(Lhud);
  const cTen = pill(sW, '**10 p.m.**', { col: GOLD, size: 32 });
  const cOne = pill(sW, 'factors of 1: **1**', { col: '#FFE9A8', size: 32 });
  const cPlus = mkChip(sW, '**+1**', { size: 40, col: '#8E44AD', solid: true, fill: '#E8D5FF' });
  const stNo = fmStamp(sW, 'not');
  const stPlus = fmStamp(sW, 'plus');
  const notes = ['♪', '♫', '♪'].map(n => { const g = G(sW); outline(T(g, 0, 0, n, { size: 56, weight: 800, anchor: 'middle', fill: GOLD }), '#3A1A07', 6); return g; });

  /* ---------- the cast ---------- */
  const banyan = cast(Lcast, 'banyan'), venn = cast(Lcast, 'venn'), two = cast(Lcast, 'two'),
    paati = cast(Lcast, 'paati'), tan = cast(Lcast, 'tan', { prop: null }), boy = cast(Lcast, 'boy'), one = cast(Lcast, 'one');

  /* ---------- shots ---------- */
  const cut = id => at(id) - 0.06;
  const SHOTS = [['I', -9], ['1', cut('t1')], ['2', cut('t2')], ['3', cut('t3')], ['4', cut('t4')], ['5', cut('t5')], ['6', cut('t6')],
    ['R', cut('return')], ['W', cut('now')]];
  const shotAt = t => { let s = 'I'; for (const [kk, t0] of SHOTS) if (t >= t0) s = kk; return s; };
  const CARDS = { 1: c1, 2: c2, 3: c3, 4: c4, 5: c5, 6: c6 };
  const CONF = { 1: 'banyan', 2: 'venn', 3: 'two', 4: 'paati', 5: 'tan', 6: 'boy' };
  const ROW = [[banyan, 'neutral', 0.3, 470], [venn, 'happy', 0.3, 470], [two, 'deadpan', 0.42, 466], [paati, 'smug', 0.62, 462], [tan, 'happy', 0.62, 466], [boy, 'happy', 0.66, 470]];

  return t => {
    const sh = shotAt(t);
    vd.upd(t);
    const voidOn = sh === 'I' ? 1 : 0;
    op(voidShot, voidOn); op(vd.front, voidOn); op(vd.top, voidOn);
    op(logoBg, sh === 'R' ? 1 : 0); op(sI, voidOn); op(sR, sh === 'R' ? 1 : 0); op(sW, sh === 'W' ? 1 : 0); op(clubShot, sh === 'W' ? 1 : 0);
    for (const kk in CARDS) op(CARDS[kk], sh === kk ? 1 : 0);
    const cw = CONF[sh];
    conf.set(cw ? 1 : 0, t); if (cw) conf.firstChild.setAttribute('fill', TINT[cw]);
    [banyan, venn, two, paati, tan, boy, one].forEach(e => op(e, 0));
    const show = (c, x, y, s, st) => { op(c, 1); tr(c, x, y, s); c.set(Object.assign({ t }, st)); };

    if (sh === 'I') {
      const hp = P(t, at('intro') + 0.05, 0.45, pop);
      op(iHead, clamp(hp * 2.5)); iHead.setAttribute('transform', `translate(600 210) scale(${Math.max(0.01, 0.6 + 0.4 * hp).toFixed(3)}) translate(-600 -210)`);
      op(iSub, P(t, mid('intro', 0.3), 0.4, linear));
      ROW.forEach(([c, mood, s, y], i) => {
        const p = P(t, mid('intro', 0.35) + i * 0.13, 0.45, pop);
        show(c, ROWX[i], y + 40 * (1 - clamp(p)), Math.max(0.01, s * (0.7 + 0.3 * p)), { mood, look: 0, moodB: 'deadpan' });
        op(c, clamp(p * 3));
        popIn(badges[i], t, mid('intro', 0.4) + i * 0.13, ROWX[i], 640);
      });
    } else if (cw) {
      if (cw === 'banyan') {
        show(banyan, 320, 400, 0.82, { talk: talk(t, 'banyan'), mood: t > mid('t1', 0.85) ? 'smug' : 'neutral', look: 0.5, lights: 1 });
        fadeIn(c1a, t, at('t1') + 0.05); fadeIn(c1b, t, mid('t1', 0.22));
        op(ring9, P(t, mid('t1', 0.45), 0.25, linear));
        fadeIn(c1n, t, mid('t1', 0.5)); fadeIn(c1c, t, mid('t1', 0.6)); fadeIn(c1d, t, mid('t1', 0.78));
      } else if (cw === 'venn') {
        show(venn, 320, 400, 0.78, { talk: talk(t, 'hattie'), mood: 'happy', look: 0.5, talkB: 0, moodB: t > mid('t2', 0.6) ? 'annoyed' : 'deadpan', lookB: -0.6 });
        fadeIn(c2a, t, at('t2') + 0.05); fadeIn(c2a2, t, mid('t2', 0.25)); fadeIn(c2b, t, mid('t2', 0.42));
        fadeIn(c2c, t, mid('t2', 0.62)); c2c.set(P(t, mid('t2', 0.7), 0.3, linear));
        fadeIn(c2d, t, mid('t2', 0.8)); c2d.set(P(t, mid('t2', 0.88), 0.25, linear));
      } else if (cw === 'two') {
        const stamp = P(t, mid('t3', 0.8), 0.4, ease);
        show(two, 320, 640 - 164 * 1.22, 1.22, { talk: talk(t, 'two'), mood: stamp > 0.3 ? 'smug' : 'deadpan', look: 0.5, stamp, list: t < mid('t3', 0.75) ? P(t, at('t3') + 0.1, 0.4, ease) : 0 });
        fadeIn(c3a, t, at('t3') + 0.05); fadeIn(c3b, t, mid('t3', 0.3)); fadeIn(c3b2, t, mid('t3', 0.4));
        fadeIn(c3c, t, mid('t3', 0.6)); fadeIn(c3c2, t, mid('t3', 0.7));
      } else if (cw === 'paati') {
        show(paati, 320, 560, 1.4, { talk: talk(t, 'paati'), mood: t > mid('t4', 0.75) ? 'smug' : 'deadpan', look: 0.4 });
        fadeIn(c4a, t, at('t4') + 0.05); fadeIn(c4b, t, mid('t4', 0.12)); fadeIn(c4c, t, mid('t4', 0.2));
        fadeIn(c4d, t, mid('t4', 0.32)); c4d.set(P(t, mid('t4', 0.4), 0.3, linear));
        fadeIn(c4e, t, mid('t4', 0.48));
        // her sisters' bus drives along the bottom of the card
        const bx = lerp(640, CX, P(t, mid('t4', 0.6), 1.2, easeOut));
        op(bus, P(t, mid('t4', 0.6), 0.2, linear)); tr(bus, bx, 560);
      } else if (cw === 'tan') {
        show(tan, 320, 572, 1.4, { talk: talk(t, 'tan'), mood: t > mid('t5', 0.85) ? 'smug' : 'neutral', look: 0.4 });
        fadeIn(c5a, t, at('t5') + 0.05); fadeIn(c5b, t, mid('t5', 0.4)); fadeIn(c5c, t, mid('t5', 0.48));
        fadeIn(c5d, t, mid('t5', 0.68)); fadeIn(c5e, t, mid('t5', 0.78)); fadeIn(c5f, t, mid('t5', 0.86));
      } else if (cw === 'boy') {
        const conf2 = t > mid('t6', 0.78);
        show(boy, 310, 548, 1.5, { talk: talk(t, 'boy'), mood: conf2 ? 'happy' : 'neutral', look: 0.4, lift: conf2 ? 1 : 0 });
        fadeIn(c6a, t, at('t6') + 0.05); fadeIn(c6b, t, mid('t6', 0.18)); fadeIn(c6c, t, mid('t6', 0.3));
        fadeIn(c6d, t, mid('t6', 0.48)); c6d.set(P(t, mid('t6', 0.56), 0.3, linear)); fadeIn(c6e, t, mid('t6', 0.6));
      }
    } else if (sh === 'R') {
      tr(rayP, 600, 600, 1, (t * 6 * AMP) % 360);
      popIn(logo, t, at('return') + 0.05, 600, 260);
      lnums.forEach((n, i) => tr(n.g, n.x, n.y + Math.sin(t * 2 + i) * 6 * AMP, 1, Math.sin(t * 1.5 + i) * 10 * AMP));
      op(rSub, P(t, mid('return', 0.45), 0.4, linear));
    } else {
      /* ---------- the stinger ---------- */
      club.upd(t);
      const opened = t >= mid('fine', 0.45);
      op(club.rope, opened ? 0 : 1); op(ropeDown, opened ? 1 : 0);
      const inT = at('in') - 0.1, gone = P(t, inT + 0.1, 1.0, easeIn);
      op(doorOpen, P(t, inT, 0.3, linear));
      // a slow push on Big Two for the last line
      const push = P(t, at('notprime') - 0.1, 1.6, ease);
      clubWrap.setAttribute('transform', `translate(300 470) scale(${(1 + 0.08 * push).toFixed(4)}) translate(-300 -470)`);
      const s2 = 1 + 0.08 * push;
      let tm = 'deadpan', tl = 1, list = 0, stamp = 0;
      if (t >= at('still') && t < at('plus')) { list = P(t, at('still') + 0.05, 0.4, ease); }
      if (t >= at('plus') && t < at('fine')) { tm = 'annoyed'; tl = 1; }
      if (t >= at('fine') && t < at('in')) { tm = t < mid('fine', 0.35) ? 'sad' : 'smug'; stamp = P(t, mid('fine', 0.35), 0.3, ease) * (1 - P(t, mid('fine', 0.85), 0.3, ease)); }
      if (t >= at('in')) { tm = 'deadpan'; tl = t > end('in') ? 0 : 0.6; }
      show(two, 300 + (250 - 300) * s2, 470 + (640 - 164 - 470) * s2, s2, { talk: talk(t, 'two'), mood: tm, look: tl, list, stamp });
      popIn(cTen, t, at('now') + 0.05, 1060, 62);
      // One: hopeful at the rope, refused, plus-oned, then runs in
      const hop = P(t, at('now') - 0.3, 0.6, easeOut);
      let ox = lerp(1300, 820, hop), oy = 530, os = 1.0;
      if (t >= inT) { ox = lerp(820, 690, gone); oy = lerp(530, 470, gone); os = lerp(1.0, 0.55, gone); }
      const oj = Math.abs(Math.sin(t * 8)) * (t < at('now') + 0.3 ? 26 * (1 - hop) : t >= inT ? 30 * (1 - gone) : 0);
      if (gone < 0.98) {
        let om = 'happy', wave = t < end('now') ? 1 : 0;
        if (t >= mid('still', 0.62) && t < at('plus')) om = 'shock';
        if (t >= at('in')) { om = 'happy'; wave = 1; }
        show(one, ox, oy - oj, os, { talk: talk(t, 'one'), mood: om, look: t >= at('plus') && t < at('in') ? 0.8 : -0.8, wave });
        op(one, 1 - clamp((gone - 0.7) / 0.28));
      }
      op(cOne, 0); op(cPlus, 0);
      if (t >= at('still') && t < at('fine')) popIn(cOne, t, mid('still', 0.2), 1010, 260);
      stNo.set(t >= mid('still', 0.62) && t < at('plus') + 0.3 ? P(t, mid('still', 0.62), 0.3, linear) : 0); tr(stNo, 820, 560, 0.42);
      // Paati at the right edge
      if (t >= at('plus') - 0.3) {
        const pin = P(t, at('plus') - 0.3, 0.45, easeOut);
        show(paati, lerp(1330, 1100, pin), 626, 0.9, { talk: talk(t, 'paati'), mood: t >= at('in') ? 'happy' : 'smug', look: t >= at('in') ? -1 : -0.9 });
        if (t < inT) popIn(cPlus, t, mid('plus', 0.6), 930, 330);
      }
      stPlus.set(t >= mid('fine', 0.62) ? P(t, mid('fine', 0.62), 0.3, linear) : 0); tr(stPlus, 940, 470, 0.44);
      if (t >= at('in')) notes.forEach((n, i) => { const p = P(t, at('in') + 0.15 + i * 0.25, 1.4, easeOut); op(n, Math.sin(Math.PI * clamp(p)) * (t < at('notprime') ? 1 : 0)); tr(n, 640 + i * 60, 360 - 120 * p); });
      else notes.forEach(n => op(n, 0));
    }
  };
});
