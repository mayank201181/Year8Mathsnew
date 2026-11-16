/* Scene 8: The stall saves you some marks.
   Shots: "6 EXAM TRAPS" over the stall, the six of them lined up with numbers -> six snappy confessionals, one trap
   card each (the Colonel: order matters; Dad: same units first, 50 cm : 2 m = 1 : 4, not 25 : 1; Ah Boy: divide by
   the TOTAL number of parts, the $42 goes back in the jar; Barry: difference -> difference in parts; Monty:
   1 km = 100 000 cm, stamped EVERY. SINGLE. TIME.; Auntie Rose on a video call: RM 85 / 3.40 = $25, not $289) ->
   logo "KEEP IT IN PROPORTION will return" -> stinger: Monday 6 a.m., Auntie Rose is back, picks up Ah Boy's deep
   pink 4 : 1 jug, sips: "Ah Boy Special, $6.00" goes on the menu -> the Colonel: "Order... matters..." and keels
   over, his cap rolling away along the counter. */
scene('traps', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;
  const talk = (t, who) => scTalk(S, t, who);

  /* ---------- helpers ---------- */
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 3, color: o.color || C.ink, weight: 700 }); };
  const outline = (el, col, w) => { el.setAttribute('stroke', col); el.setAttribute('stroke-width', w); el.setAttribute('paint-order', 'stroke'); el.setAttribute('stroke-linejoin', 'round'); return el; };
  const GOLD = '#FFE45C', INK = MK.ink, GREEN = '#1E9E5A', RED = '#C62828', BLUE = '#2E7DD8', BERRY = '#B8336A';
  const CX = 880;
  function trCard(parent, n) {
    const g = G(parent);
    E('rect', { x: 606, y: 136, width: 560, height: 470, rx: 18, fill: 'rgba(0,0,0,0.3)' }, g);
    E('rect', { x: 600, y: 130, width: 560, height: 470, rx: 18, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, g);
    const head = chip(g, 'TRAP ' + n, { size: 30, fill: '#D32F2F', color: '#FFFFFF', weight: 800 }); tr(head, CX, 182);
    return g;
  }
  // a line of card text that fades in (mkText markup)
  const txt = (parent, y, s, o) => mkText(parent, CX, y, s, Object.assign({ size: 34, anchor: 'middle', fill: INK }, o || {}));
  const fadeIn = (el, t, t0) => { const p = P(t, t0, 0.3, easeOut); op(el, p); tr(el, 0, 10 * (1 - p)); };
  // a crossed-out line: g.set(p) draws the strike
  function trNo(parent, y, s, o) {
    const g = G(parent), m = txt(g, y, s, Object.assign({ fill: RED }, o || {}));
    const sl = strike(g, CX - m.w / 2 - 10, y - 12, CX + m.w / 2 + 10, RED);
    g.set = p => sl.set(p);
    return g;
  }

  /* ---------- layers ---------- */
  const Lbg = G(root), Lcast = G(root), Lfront = G(root), Lfg = G(root), Lhud = G(root);

  /* ---------- sets ---------- */
  const stallShot = G(Lbg);
  const stall = rpStall(stallShot);
  Lfront.appendChild(stall.front); Lfront.appendChild(stall.top);    // the counter sits in front of Lcast
  const dim = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#06110F', opacity: 0.55 }, stallShot);
  const conf = rpConf(Lbg, 'colonel');
  const TINT = {}; for (const k in RP_TINT) TINT[k] = linGrad(RP_TINT[k][0], RP_TINT[k][1], true);
  const logoBg = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#5A1030', '#A8285A', true) }, logoBg);
  let rays = '';
  for (let i = 0; i < 16; i++) { const a0 = i / 16 * TAU, a1 = a0 + TAU / 40; rays += `M0,0 L${(Math.cos(a0) * 1100).toFixed(0)},${(Math.sin(a0) * 1100).toFixed(0)} L${(Math.cos(a1) * 1100).toFixed(0)},${(Math.sin(a1) * 1100).toFixed(0)} Z `; }
  const rayP = E('path', { d: rays, fill: '#FFE45C', opacity: 0.07 }, logoBg);
  E('ellipse', { cx: 600, cy: 600, rx: 600, ry: 170, fill: glow('#FF8FC8'), opacity: 0.35 }, logoBg);

  /* ===== intro: 6 EXAM TRAPS ===== */
  const sI = G(Lhud);
  const iHead = outline(T(sI, 600, 262, '6 EXAM TRAPS', { size: 80, weight: 800, anchor: 'middle', fill: GOLD, ls: 3 }), '#5A3A07', 10);
  const iSub = T(sI, 600, 314, 'the stall saves you some marks', { size: 34, weight: 600, anchor: 'middle', fill: C.ink });
  const ROWX = [150, 330, 510, 690, 870, 1050];
  const badges = ROWX.map((x, k) => { const g = G(sI); E('circle', { r: 26, fill: GOLD, stroke: SC_INK, 'stroke-width': 4 }, g); T(g, 0, 11, String(k + 1), { size: 30, weight: 800, anchor: 'middle', fill: SC_INK }); return g; });

  /* ===== trap cards ===== */
  // 1 the Colonel
  const c1 = trCard(Lfg, 1);
  const c1a = txt(c1, 262, '**Order matters.**', { size: 46, boldFill: BERRY });
  const c1b = txt(c1, 350, '{{"boys" : "girls"}}', { size: 42 });
  const c1c = txt(c1, 418, '≠', { size: 50, fill: RED, weight: 800 });
  const c1d = txt(c1, 492, '{{"girls" : "boys"}}', { size: 42 });
  const c1e = txt(c1, 562, 'e.g. {{3 : 5}} is not {{5 : 3}}', { size: 30, fill: '#5A4A52' });
  // 2 Dad
  const c2 = trCard(Lfg, 2);
  const c2a = txt(c2, 262, '**Same units first**', { size: 42, boldFill: BLUE });
  const c2b = txt(c2, 334, '{{50 "cm" : 2 "m"}}', { size: 40 });
  const c2c = txt(c2, 400, '{{= 50 : 200}}  (2 m = 200 cm)', { size: 34 });
  const c2d = txt(c2, 466, '{{= 1 : 4}}', { size: 46, fill: GREEN, weight: 800 });
  const c2e = trNo(c2, 548, '{{50 : 2 = 25 : 1}}', { size: 34 });
  // 3 Ah Boy
  const c3 = trCard(Lfg, 3);
  const c3a = txt(c3, 262, '÷ by the **TOTAL** parts', { size: 40, boldFill: RED });
  const c3b = txt(c3, 330, '{{$84}} shared {{2 : 5 : 7}}', { size: 34 });
  const c3c = trNo(c3, 400, '{{84 ÷ 2 = 42}}', { size: 38 });
  const c3d = txt(c3, 470, '{{2 + 5 + 7 = 14}} parts', { size: 36, fill: GREEN });
  const c3e = txt(c3, 540, '{{84 ÷ 14 = 6}} per part ✓', { size: 36, fill: GREEN });
  const jar = rpTipsJar(Lfg, { s: 0.8 });
  // 4 Barry
  const c4 = trCard(Lfg, 4);
  const c4a = txt(c4, 262, 'Given the **difference**?', { size: 40, boldFill: BERRY });
  const c4bar = mkBarModel(c4, { unit: 46, h: 52, gap: 22, size: 28, ink: INK,
    rows: [{ name: 'Kavya', units: 7, col: '#A8D8FA' }, { name: 'Priya', units: 4, col: '#A8D8FA' }],
    braces: [{ row: 0, from: 4, to: 6, text: '3 parts' }] });
  tr(c4bar, 712, 356);
  const c4hi = E('rect', { x: 712 + 4 * 46, y: 356, width: 3 * 46, height: 52, fill: '#FFE45C', stroke: INK, 'stroke-width': 3 }, c4);
  c4.insertBefore(c4hi, c4bar.nextSibling);
  const c4hiL = G(c4); [4, 5, 6].forEach(j => E('rect', { x: 712 + j * 46, y: 356, width: 46, height: 52, fill: 'none', stroke: INK, 'stroke-width': 3 }, c4hiL));
  const c4c = txt(c4, 520, 'use the **difference in parts**', { size: 34, boldFill: BERRY });
  const c4d = txt(c4, 572, '{{7 − 4 = 3}} parts, **not** the total {{11}}', { size: 30 });
  // 5 Monty
  const c5 = trCard(Lfg, 5);
  const c5a = txt(c5, 280, '{{1 "km" = "100 000" "cm"}}', { size: 50, fill: BLUE, weight: 800 });
  const c5b = txt(c5, 352, '{{1 "km" = 1000 "m"}},  {{1 "m" = 100 "cm"}}', { size: 30, fill: '#5A4A52' });
  const c5s = ['EVERY.', 'SINGLE.', 'TIME.'].map(w => mkStamp(c5, w, '#D32F2F'));
  // 6 Auntie Rose (on a video call)
  const c6 = trCard(Lfg, 6);
  const c6a = txt(c6, 262, 'Currency: **check!**', { size: 42, boldFill: BERRY });
  const c6b = txt(c6, 334, '{{"RM" 85 -> $}}: **divide**', { size: 36, boldFill: GREEN });
  const c6c = txt(c6, 402, '{{85 ÷ 3.40 = $25}}', { size: 42, fill: GREEN, weight: 800 });
  const c6d = trNo(c6, 466, '{{85 × 3.40 = $289}}', { size: 34 });
  const c6e = mkChip(c6, 'ringgit number is the **bigger** one', { size: 28, col: '#2E7D4F', solid: true, fill: '#DFF5E6' });
  tr(c6e, CX, 548);
  const callG = G(Lfg);
  const call = rpRoseCall(callG, 460, 320);

  /* ===== logo ===== */
  const sR = G(Lhud);
  const logo = G(sR);
  const logo1 = outline(T(logo, 0, -70, 'KEEP IT IN', { size: 58, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 6 }), '#3A0820', 12);
  const logo2 = outline(T(logo, 0, 20, 'PROPORTION', { size: 96, weight: 800, anchor: 'middle', fill: GOLD, ls: 2 }), '#3A0820', 12);
  const dots = [-1, 1].map(sd => { const d = G(logo); tr(d, sd * 390, -58); E('circle', { cy: -16, r: 13, fill: ball('#5566E0', '#1E2878'), stroke: '#FFFFFF', 'stroke-width': 3 }, d); E('circle', { cy: 18, r: 13, fill: ball('#5566E0', '#1E2878'), stroke: '#FFFFFF', 'stroke-width': 3 }, d); return d; });
  const rSub = T(sR, 600, 440, 'will return', { size: 46, weight: 600, anchor: 'middle', fill: '#FFFFFF' });

  /* ===== stinger: Monday ===== */
  const sW = G(Lhud);
  const cMon = pill(sW, 'Monday, 6 a.m.', { size: 34, color: GOLD, stroke: GOLD });
  const cMe = mkChip(sW, '**4** parts syrup : **1** part milk', { size: 30, col: '#FF8FC8' });
  const cMe2 = mkChip(sW, '{{4 : 1}}', { size: 44, col: '#FF8FC8' });
  const suit = G(Lfront);
  E('rect', { x: -62, y: -110, width: 124, height: 110, rx: 14, fill: '#FF6FA8', stroke: SC_INK, 'stroke-width': 4 }, suit);
  E('path', { d: 'M-26,-110 L-26,-130 L26,-130 L26,-110', fill: 'none', stroke: SC_INK, 'stroke-width': 6 }, suit);
  E('rect', { x: -44, y: -78, width: 88, height: 34, rx: 6, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 2.5 }, suit);
  T(suit, 0, -53, 'MELAKA', { size: 22, weight: 800, anchor: 'middle', fill: '#C62828' });
  // the new row on Auntie's menu board
  const special = G(stallShot);
  E('rect', { x: 676, y: 470, width: 368, height: 46, rx: 8, fill: '#FFE45C', stroke: '#5A3A1A', 'stroke-width': 3 }, special);
  mkText(special, 716, 502, 'Ah Boy Special {{4 : 1}}', { size: 26, fill: MK.ink, weight: 800 });
  mkText(special, 1030, 502, '$6.00', { size: 26, anchor: 'end', fill: '#B8336A', weight: 800 });
  const jugC = rpJug(Lfront, { col: rpMix(4, 1), s: 0.62 });   // on the counter
  // the Colonel's cap (rolls away when he keels over)
  const capR = G(Lfront);
  { const cap = G(capR);
    E('path', { d: 'M-44,4 Q-48,-34 0,-36 Q48,-34 44,4 Z', fill: '#7A7A3A', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, cap);
    E('rect', { x: -46, y: -6, width: 92, height: 14, rx: 4, fill: '#C62828', stroke: SC_INK, 'stroke-width': 3 }, cap);
    E('path', { d: 'M-48,8 Q0,24 48,8 L44,14 Q0,30 -44,14 Z', fill: '#2A2A1A', stroke: SC_INK, 'stroke-width': 3 }, cap);
    E('circle', { cx: 0, cy: -20, r: 11, fill: '#E2B33C', stroke: SC_INK, 'stroke-width': 2.5 }, cap); }

  /* ---------- the cast ---------- */
  const col = cast(Lcast, 'colonel'), dad = cast(Lcast, 'dad', { prop: null }), boy = cast(Lcast, 'boy'), barry = cast(Lcast, 'barry'),
    monty = cast(Lcast, 'monty'), rose = cast(Lcast, 'rose', { prop: null, hand: true, side: 'right' }), kav = cast(Lcast, 'kavya');
  const jugH = rpJug(G(rose.hand), { col: rpMix(4, 1), s: 0.62 });
  const colCap = col.querySelector('g[transform="translate(0.00 -92.00)"]');

  /* ---------- shots ---------- */
  const cut = id => at(id) - 0.06;
  const SHOTS = [['I', -9], ['1', cut('t1')], ['2', cut('t2')], ['3', cut('t3')], ['4', cut('t4')], ['5', cut('t5')], ['6', cut('t6')],
    ['R', cut('return')], ['W', cut('monday')]];
  const shotAt = t => { let s = 'I'; for (const [k, t0] of SHOTS) if (t >= t0) s = k; return s; };
  const CARDS = { 1: c1, 2: c2, 3: c3, 4: c4, 5: c5, 6: c6 };
  const CONF = { 1: 'colonel', 2: 'dad', 3: 'boy', 4: 'barry', 5: 'monty', 6: 'rose' };
  const ROW = [[col, 'deadpan', 0.62, 449], [dad, 'smug', 0.72, 456], [boy, 'happy', 0.74, 462], [barry, 'smug', 0.55, 462], [monty, 'smug', 0.55, 444], [rose, 'happy', 0.72, 456]];
  const COLX = 165, COLS = 0.72, BASE = 114 * COLS;   // the Colonel on the counter (stinger); BASE = centre to feet
  const tTip = end('faint') + 0.1;

  return t => {
    const sh = shotAt(t);
    stall.upd(t);
    const stallOn = sh === 'I' || sh === 'W' ? 1 : 0;
    op(stallShot, stallOn); op(stall.front, stallOn); op(stall.top, stallOn); op(dim, sh === 'I' ? 1 : 0);
    op(logoBg, sh === 'R' ? 1 : 0); op(sI, sh === 'I' ? 1 : 0); op(sR, sh === 'R' ? 1 : 0); op(sW, sh === 'W' ? 1 : 0);
    for (const k in CARDS) op(CARDS[k], sh === k ? 1 : 0);
    const cw = CONF[sh];
    conf.set(cw ? 1 : 0, t); if (cw) conf.firstChild.setAttribute('fill', TINT[cw]);
    [col, dad, boy, barry, monty, rose, kav, callG, jar, suit, jugC, capR, special, jugH].forEach(e => op(e, 0));
    const colHome = sh === 'W' ? Lfront : Lcast;   // on the counter in the stinger, behind it elsewhere
    if (col.parentNode !== colHome) colHome.appendChild(col);
    const show = (c, x, y, s, st) => { op(c, 1); tr(c, x, y, s); c.set(Object.assign({ t }, st)); };

    if (sh === 'I') {
      const hp = P(t, at('intro') + 0.05, 0.45, pop);
      op(iHead, clamp(hp * 2.5)); iHead.setAttribute('transform', `translate(600 236) scale(${Math.max(0.01, 0.6 + 0.4 * hp).toFixed(3)}) translate(-600 -236)`);
      op(iSub, P(t, mid('intro', 0.3), 0.4, linear));
      ROW.forEach(([c, mood, s, y], i) => {
        const p = P(t, mid('intro', 0.4) + i * 0.14, 0.45, pop);
        show(c, ROWX[i], y + 40 * (1 - clamp(p)), Math.max(0.01, s * (0.7 + 0.3 * p)), { mood, look: 0, salute: c === col ? 1 : 0 });
        op(c, clamp(p * 3));
        popIn(badges[i], t, mid('intro', 0.45) + i * 0.14, ROWX[i], 655);
      });
    } else if (cw) {
      const line = 't' + sh;
      if (cw === 'colonel') {
        show(col, 330, 420, 1.35, { talk: talk(t, 'colonel'), mood: 'deadpan', look: 0.3, salute: t > at('t1') + 0.05 && t < mid('t1', 0.5) ? 1 : 0, point: t > mid('t1', 0.55) ? 1 : 0 });
        fadeIn(c1a, t, at('t1') + 0.05); fadeIn(c1b, t, mid('t1', 0.35)); fadeIn(c1c, t, mid('t1', 0.55)); fadeIn(c1d, t, mid('t1', 0.62)); fadeIn(c1e, t, mid('t1', 0.85));
      } else if (cw === 'dad') {
        show(dad, 320, 572, 1.4, { talk: talk(t, 'dad'), mood: t > mid('t2', 0.7) ? 'sad' : 'neutral', look: 0.4 });
        fadeIn(c2a, t, at('t2') + 0.1); fadeIn(c2b, t, mid('t2', 0.28)); fadeIn(c2c, t, mid('t2', 0.4)); fadeIn(c2d, t, mid('t2', 0.55));
        fadeIn(c2e, t, mid('t2', 0.66)); c2e.set(P(t, mid('t2', 0.74), 0.3, linear));
      } else if (cw === 'boy') {
        const back = mid('t3', 0.72);
        show(boy, 310, 548, 1.5, { talk: talk(t, 'boy'), mood: t > back ? 'happy' : 'neutral', look: t > back ? 0.8 : 0.3, lift: t > back - 0.3 && t < back + 1.2 ? 1 : 0 });
        fadeIn(c3a, t, at('t3') + 0.1); fadeIn(c3b, t, mid('t3', 0.2)); fadeIn(c3c, t, mid('t3', 0.32)); c3c.set(P(t, mid('t3', 0.42), 0.3, linear));
        fadeIn(c3d, t, mid('t3', 0.5)); fadeIn(c3e, t, mid('t3', 0.6));
        if (t > back - 0.2) { popIn(jar, t, back - 0.2, 530, 690, 0.8); jar.set(4 + 4 * P(t, back + 0.2, 0.8, linear)); }
      } else if (cw === 'barry') {
        show(barry, 330, 420, 1.05, { talk: talk(t, 'barry'), mood: 'smug', look: 0.4, lit: t > mid('t4', 0.3) ? 3 : 0 });
        fadeIn(c4a, t, at('t4') + 0.1);
        c4bar.row(0, P(t, mid('t4', 0.15), 0.4, linear)); c4bar.row(1, P(t, mid('t4', 0.25), 0.3, linear));
        op(c4hi, P(t, mid('t4', 0.42), 0.3, linear)); op(c4hiL, P(t, mid('t4', 0.42), 0.3, linear)); c4bar.brace(0, P(t, mid('t4', 0.45), 0.4, linear));
        fadeIn(c4c, t, mid('t4', 0.5)); fadeIn(c4d, t, mid('t4', 0.75));
      } else if (cw === 'monty') {
        const thump = [0.58, 0.72, 0.86].map(f => mid('t5', f));
        const bump = thump.reduce((a, f) => a + (t > f && t < f + 0.15 ? 1 - (t - f) / 0.15 : 0), 0);
        show(monty, 330, 410 + 8 * bump, 1.3, { talk: talk(t, 'monty'), mood: t > thump[0] ? 'annoyed' : 'smug', look: 0.4 });
        const cp = P(t, at('t5') + 0.1, 0.45, pop);
        op(c5a, clamp(cp * 2.5)); c5a.setAttribute('transform', `translate(${CX} 262) scale(${Math.max(0.01, 0.6 + 0.4 * cp).toFixed(3)}) translate(${-CX} -262)`);
        fadeIn(c5b, t, mid('t5', 0.3));
        c5s.forEach((s, i) => { s.set(P(t, thump[i], 0.3, linear)); tr(s, [740, 900, 1050][i], [450, 515, 450][i], 0.5, 0); });
      } else if (cw === 'rose') {
        op(callG, 1);
        const cp = P(t, cut('t6'), 0.3, easeOut);
        tr(callG, 310, 380 + 20 * (1 - cp));
        call.rose.set({ t, talk: talk(t, 'rose'), mood: t > mid('t6', 0.62) ? 'shock' : 'neutral', look: 0.3 });
        fadeIn(c6a, t, at('t6') + 0.1); fadeIn(c6b, t, mid('t6', 0.25)); fadeIn(c6c, t, mid('t6', 0.38));
        fadeIn(c6d, t, mid('t6', 0.6)); c6d.set(P(t, mid('t6', 0.72), 0.3, linear));
        c6e.set(P(t, mid('t6', 0.86), 0.4, linear));
      }
    } else if (sh === 'R') {
      tr(rayP, 600, 600, 1, (t * 6 * AMP) % 360);
      popIn(logo, t, at('return') + 0.05, 600, 300);
      dots.forEach((d, i) => tr(d, (i ? 1 : -1) * 390, -58, 1, Math.sin(t * 2 + i) * 8 * AMP));
      op(rSub, P(t, mid('return', 0.5), 0.4, linear));
    } else {
      /* ---------- the stinger ---------- */
      popIn(cMon, t, at('monday') + 0.05, 880, 60); op(cMe, 0); op(cMe2, 0);
      op(suit, 1); tr(suit, 1000, 700);
      // Kavya and Ah Boy behind the counter, Auntie Rose back in charge
      const who = scWho(S, t);
      const grab = mid('pink', 0.4), sip = mid('menu', 0.15), fainted = t > tTip;
      show(kav, 300, 445, 0.9, { talk: talk(t, 'kavya'), mood: fainted ? 'shock' : t > at('menu') ? 'deadpan' : 'neutral', look: fainted ? -0.8 : 0.8 });
      show(boy, 445, 455, 0.86, { talk: talk(t, 'boy'), mood: fainted ? 'shock' : 'happy', look: fainted ? -0.8 : who === 'rose' ? 0.8 : 0.4, lift: t >= at('me') - 0.2 && t < at('menu') ? 1 : 0 });
      const rIn = P(t, at('monday') + 0.2, 0.5, easeOut);
      show(rose, lerp(760, 595, rIn), 440, 0.95, { talk: talk(t, 'rose'), mood: t >= at('menu') ? 'happy' : t >= at('pink') && t < grab + 0.2 ? 'neutral' : 'happy', look: fainted ? -0.8 : t >= at('pink') && t < at('menu') ? -0.6 : -0.3, lift: t > grab ? 1 : 0 });
      op(jugH, t > grab ? 1 : 0);
      tr(jugH, 0, 30, 1, t > sip && t < sip + 1.6 ? -28 * Math.sin(Math.min(1, (t - sip) / 1.6) * Math.PI) : 0);
      if (t < grab) { op(jugC, 1); tr(jugC, 520, 530); }
      if (t >= at('me')) { popIn(cMe, t, mid('me', 0.1), 380, 236); popIn(cMe2, t, mid('me', 0.25), 380, 304); }
      if (t >= at('menu')) { op(cMe, 0); op(cMe2, 0); }
      // the menu gets a new row
      const nr = P(t, mid('menu', 0.45), 0.4, pop);
      op(special, clamp(nr * 3)); special.setAttribute('transform', `translate(860 493) scale(${Math.max(0.01, 0.6 + 0.4 * nr).toFixed(3)}) translate(-860 -493)`);
      // the Colonel on the counter: "Order... matters..." then keels over, cap rolling away
      const tip = P(t, tTip, 0.9, easeIn);
      const ang = 90 * tip, rad = ang * Math.PI / 180;
      const cx = COLX + BASE * Math.sin(rad), cy = 520 - BASE * Math.cos(rad) - 36 * Math.sin(rad);
      show(col, cx, cy, COLS, { talk: talk(t, 'colonel'), mood: t > mid('faint', 0.3) ? 'sad' : t >= at('menu') ? 'shock' : 'deadpan', look: 0.8, still: t > tTip });
      tr(col, cx, cy, COLS, ang);
      op(colCap, t > tTip + 0.25 ? 0 : 1);
      if (t > tTip + 0.25) {
        const roll = P(t, tTip + 0.25, 1.4, easeOut);
        op(capR, 1); tr(capR, COLX + 110 + 220 * roll, 506 - 6 * Math.abs(Math.sin(roll * 9)) * (1 - roll), 0.72, 360 * 1.6 * roll);
      }
    }
  };
});
