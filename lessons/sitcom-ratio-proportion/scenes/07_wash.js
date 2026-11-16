/* Scene 7: Ivy never touches the axes (inverse proportion, stretch).
   Sunday 9 p.m., the stall at night, a mountain of cups: six washers (Mum, Dad, Kavya, Priya, Ah Boy, Mr Tan with his
   third kopi) take 10 minutes -> Mum and Dad go upstairs: 4 people, ? minutes -> Ivy arrives on the counter: one up,
   the other down; fewer people, more time -> 6 x 10 = 60 person-minutes (a 6 by 10 rectangle on the graph) ->
   60 / 4 = 15 minutes (a 4 by 15 rectangle, same area) -> x y = 60, y = 60/x: the curve draws, never touching the
   axes -> "Personal space." -> Mr Tan's pun: chirp, chirp -> Priya sings: twice the singers, half the time? -> No: the
   song is still 3:00 -> Auntie Rose calls from the coach: 80 km/h for 3 h; 60 km/h tonight -> 240 km / 60 = 4 hours. */
scene('wash', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);          // hard sitcom cut
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 3, color: o.color || C.ink, weight: 700 }); };
  const GOLD = '#FFE45C', INK = MK.ink, GREEN = '#1E9E5A', RED = '#C62828', BLUE = '#2E7DD8', BERRY = '#B8336A', LILAC = '#C9A8FF';
  const paper = (parent, x, y, w, h) => {
    E('rect', { x: x + 6, y: y + 6, width: w, height: h, rx: 16, fill: 'rgba(0,0,0,0.3)' }, parent);
    return E('rect', { x, y, width: w, height: h, rx: 16, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, parent);
  };
  const line = (el, t, t0, t1) => { const p = P(t, t0, 0.3, easeOut), q = t1 === undefined ? 1 : 1 - P(t, t1, 0.2, linear); op(el, Math.min(p, q)); tr(el, 0, 10 * (1 - p)); };
  function waNote(parent, col) {   // a music note
    const g = G(parent);
    E('ellipse', { cx: 0, cy: 0, rx: 11, ry: 8, fill: col, transform: 'rotate(-20)' }, g);
    E('path', { d: 'M9,-3 L9,-40 Q20,-34 24,-24', fill: 'none', stroke: col, 'stroke-width': 4, 'stroke-linecap': 'round' }, g);
    return g;
  }
  function waBadge(parent, n) {
    const g = G(parent);
    E('circle', { r: 22, fill: GOLD, stroke: SC_INK, 'stroke-width': 3 }, g);
    T(g, 0, 10, String(n), { size: 28, weight: 800, anchor: 'middle', fill: SC_INK });
    return g;
  }

  /* layers */
  const Lset = G(root), Lboard = G(root), Lfront = G(root), Lhud = G(root);

  /* ================= the stall at night ================= */
  const stall = rpStall(Lset);
  stall.insertBefore(E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#0A1830', opacity: 0.42 }, stall), stall.mid);
  const nightFront = E('rect', { x: 90, y: 520, width: 1020, height: 230, fill: '#0A1830', opacity: 0.25 }, stall.top);
  // the mountain of cups (left end of the counter)
  const pile = G(stall.top);
  const PILE = [[3, 0], [3, 0], [2, 20], [2, 20], [1, 40]];
  PILE.forEach(([n, dx], r) => { for (let k = 0; k < n; k++) {
    const x = 70 + dx + k * 40, y = 530 - r * 44;
    E('path', { d: `M${x - 18},${y - 42} L${x + 18},${y - 42} L${x + 14},${y} L${x - 14},${y} Z`, fill: (r + k) % 2 ? '#FFFFFF' : '#E6F4FF', stroke: '#5A6670', 'stroke-width': 3, 'stroke-linejoin': 'round' }, pile);
    E('path', { d: `M${x - 12},${y - 30} L${x + 12},${y - 30}`, stroke: '#F6A3C4', 'stroke-width': 4 }, pile);
  } });
  const bubbles = Array.from({ length: 10 }, (_, i) => E('circle', { r: 7 + (i % 3) * 4, fill: 'rgba(255,255,255,0.35)', stroke: '#FFFFFF', 'stroke-width': 2 }, stall.top));

  // the cast behind the counter
  const mum = cast(stall.mid, 'mum', { prop: 'mug' });
  const dad = cast(stall.mid, 'dad', { prop: 'mug', side: 'right' });
  const kav = cast(stall.mid, 'kavya');
  const priya = cast(stall.mid, 'priya', { prop: 'mug', side: 'right' });
  const boy = cast(stall.mid, 'boy', { prop: 'mug' });
  const tan = cast(stall.mid, 'tan');
  const ivy = cast(stall.top, 'ivy');

  /* ---------- A: chips and head counts ---------- */
  const cNine = pill(Lhud, '9 p.m.', { size: 34, color: GOLD, stroke: GOLD });
  const cMount = pill(Lhud, 'a mountain of cups', { size: 30, color: '#BFE3FF', stroke: '#BFE3FF' });
  const cSix = mkChip(Lhud, '**6 people** → **10 minutes**', { size: 36, col: GOLD });
  const cFour = mkChip(Lhud, '**4 people** → **? minutes**', { size: 36, col: '#FF8A8A' });
  const cKopi = pill(Lhud, 'kopi no. 3', { size: 28, color: '#E8C39E', stroke: '#E8C39E' });
  const XS = [255, 405, 555, 705, 855, 1005];
  const badges6 = XS.map((x, i) => waBadge(Lhud, i + 1)), badges4 = [0, 1, 2, 3].map(i => waBadge(Lhud, i + 1));

  /* ---------- B: the graph board and the working card ---------- */
  const board = G(Lboard);
  paper(board, 40, 112, 570, 548);
  const ax = mkAxes(board, { xmin: 0, xmax: 30, ymin: 0, ymax: 30, unit: 14, step: 5, labelStep: 10, ink: INK, size: 28, gridCol: MK.gridInk });
  tr(ax, 120, 150);
  const rect6 = ax.poly([[0, 0], [6, 0], [6, 10], [0, 10]], { fill: 'rgba(76,201,240,0.35)', col: BLUE });
  const rect4 = ax.poly([[0, 0], [4, 0], [4, 15], [0, 15]], { fill: 'rgba(255,194,71,0.4)', col: '#E8A21C' });
  const curve = ax.plot(x => 60 / x, { col: '#9C6BFF', width: 7, n: 300 });
  const pt6 = ax.point(6, 10, { col: BLUE, label: '(6, 10)', pos: 'e', halo: MK.paper });
  const pt4 = ax.point(4, 15, { col: '#E8A21C', label: '(4, 15)', pos: 'e', labelCol: '#B87A00', halo: MK.paper });
  // never touches: the gaps at both ends
  const gaps = G(board);
  [[ax.px(30) + 120, ax.py(2) + 150, ax.px(30) + 120, ax.py(0) + 150], [ax.px(0) + 120, ax.py(30) + 150, ax.px(2) + 120, ax.py(30) + 150]].forEach(([x1, y1, x2, y2]) => {
    E('path', { d: `M${x1},${y1} L${x2},${y2}`, stroke: '#E8A21C', 'stroke-width': 5, 'stroke-linecap': 'round' }, gaps);
    E('circle', { cx: (x1 + x2) / 2, cy: (y1 + y2) / 2, r: 22, fill: 'none', stroke: '#E8424F', 'stroke-width': 4 }, gaps);
  });
  const gapTxt = mkText(board, 120 + ax.px(30), 150 + ax.py(8), 'never touches', { size: 28, anchor: 'end', fill: RED, weight: 800 });
  const axLeg = mkText(board, 325, 640, '{{x}} = people,   {{y}} = minutes', { size: 28, anchor: 'middle', fill: INK });
  // the working card (right)
  const card = G(Lboard);
  paper(card, 630, 112, 540, 228);
  const CX = 900, CY = [170, 232, 294];
  const kIvy1 = mkText(card, CX, CY[0], '**Inverse proportion**', { size: 36, anchor: 'middle', fill: INK, boldFill: '#7A4CD8' });
  const kIvy2 = mkText(card, CX, CY[1], 'one goes **up** ↑, the other goes **down** ↓', { size: 30, anchor: 'middle', fill: INK, boldFill: BERRY });
  const kExp = mkText(card, CX, CY[2], 'fewer people ⇒ **more time**: > 10 min', { size: 30, anchor: 'middle', fill: INK, boldFill: RED });
  const kProd = mkText(card, CX, CY[0], '{{6 × 10 = 60}} person-minutes', { size: 34, anchor: 'middle', fill: BLUE });
  const kFif = mkText(card, CX, CY[1], '{{60 ÷ 4 = 15}} minutes', { size: 34, anchor: 'middle', fill: '#B87A00', boldFill: '#B87A00' });
  const kGr = mkText(card, CX, CY[2] + 6, '{{x × y = 60}},  so  {{y = 60/x}}', { size: 32, anchor: 'middle', fill: '#7A4CD8' });
  const cSame = mkChip(Lhud, 'product stays the **same**', { size: 28, col: LILAC });

  /* ---------- C: the pun, the song ---------- */
  const cChirp = pill(Lhud, 'chirp ... chirp ...', { size: 30, color: '#7EE08A', stroke: '#7EE08A' });
  const cSing = mkChip(Lhud, '**2 ×** singers ⇒ **half** the time?', { size: 30, col: '#FF8FC8' });
  const singX = G(Lhud), singL = strike(singX, -cSing.w / 2 + 8, 0, cSing.w / 2 - 8, '#FF4D5E');
  const cNot = mkChip(Lhud, '**not** proportional at all', { size: 30, col: '#FF8A8A' });
  const t1 = mkChip(Lhud, '1 singer: **3:00**', { size: 28, col: LILAC }), t2 = mkChip(Lhud, '2 singers: **3:00**', { size: 28, col: LILAC });
  const notes = [0, 1, 2, 3, 4].map(i => waNote(Lhud, ['#FF8FC8', '#FFE45C', '#7EE08A', '#6EC8FF', '#FF8FC8'][i]));

  /* ---------- D: Auntie Rose on the coach ---------- */
  const callG = G(Lboard);
  const call = rpRoseCall(callG, 440, 280);
  op(call.bg, 0);
  const coach = G(call.screen); call.screen.insertBefore(coach, call.bg.nextSibling);
  E('rect', { x: -220, y: -140, width: 440, height: 280, fill: '#3A4A6A' }, coach);   // coach interior
  const win_ = G(coach);
  E('rect', { x: -200, y: -120, width: 400, height: 150, rx: 14, fill: '#1E2A44', stroke: '#C9D3DC', 'stroke-width': 6 }, win_);
  E('rect', { x: -194, y: -114, width: 388, height: 60, fill: '#33507A' }, win_);
  E('rect', { x: -194, y: -54, width: 388, height: 78, fill: '#5A6670' }, win_);
  const dashes = E('path', { d: '', stroke: '#FFE45C', 'stroke-width': 5 }, win_);
  const cars = [[-150, '#E8424F'], [-50, '#4CC9F0'], [50, '#FFC247'], [150, '#7EE08A']].map(([x, c]) => {
    const g = G(win_); tr(g, x, -22);
    E('rect', { x: -32, y: -18, width: 64, height: 24, rx: 8, fill: c, stroke: SC_INK, 'stroke-width': 2.5 }, g);
    E('circle', { cx: 26, cy: -4, r: 5, fill: '#FF3B3B' }, g);
    return { g, x };
  });
  E('path', { d: 'M-220,140 L-220,60 Q-200,30 -150,32 L150,32 Q200,30 220,60 L220,140 Z', fill: '#2E5AAC', stroke: SC_INK, 'stroke-width': 3, opacity: 0.6 }, coach);   // seat backs
  const dCard = G(Lboard);
  paper(dCard, 600, 112, 570, 330);
  const DX = 885, DY = [166, 222, 290, 350, 410];
  const d1 = mkText(dCard, DX, DY[0], 'usual: {{80 "km/h"}} for **3 hours**', { size: 32, anchor: 'middle', fill: INK, boldFill: INK });
  const d2 = mkText(dCard, DX, DY[1], 'tonight: {{60 "km/h"}} for **? hours**', { size: 32, anchor: 'middle', fill: INK, boldFill: RED });
  const d3 = mkText(dCard, DX, DY[2], 'slower ⇒ **longer**', { size: 32, anchor: 'middle', fill: '#7A4CD8', boldFill: '#7A4CD8' });
  const d4 = mkText(dCard, DX, DY[3], '{{"speed" × "time" = 80 × 3 = 240}} km', { size: 30, anchor: 'middle', fill: INK });
  const d5 = mkText(dCard, DX, DY[4], '{{240 ÷ 60 = 4}} hours', { size: 34, anchor: 'middle', fill: GREEN, boldFill: GREEN });
  const ring4 = E('rect', { x: DX - 150, y: DY[4] - 40, width: 300, height: 54, rx: 14, fill: 'none', stroke: GREEN, 'stroke-width': 4 }, dCard);
  const kavF = cast(Lfront, 'kavya'), ivyF = cast(Lfront, 'ivy');

  const ltIvy = rpLowerThird(Lhud, 'ivy'), ltRose = rpLowerThird(Lhud, 'rose');

  /* cut points */
  const cB = at('ivy') - 0.06, cC = at('pun') - 0.06, cD = at('speed') - 0.06;

  return t => {
    const sA = on(t, -1, cB), sB = on(t, cB, cC), sC = on(t, cC, cD), sD = on(t, cD, 1e9);
    const who = scWho(S, t);
    stall.upd(t);
    // everything off unless a shot turns it on
    [cNine, cMount, cSix, cFour, cKopi, cChirp, cNot, t1, t2, singX, cSame].forEach(e => op(e, 0));
    cSix.set(0); cFour.set(0); cSing.set(0); cNot.set(0); t1.set(0); t2.set(0); cSame.set(0);
    badges6.forEach(b => op(b, 0)); badges4.forEach(b => op(b, 0)); notes.forEach(n => op(n, 0));
    [mum, dad, kav, priya, boy, tan, ivy, kavF, ivyF].forEach(c => op(c, 0));
    op(board, sB); op(card, sB); op(callG, sD); op(dCard, sD); op(pile, sA || sC); op(nightFront, 1);
    ltIvy.set(win(t, at('ivy') + 0.1, at('ivy') + 3.2, 0.3));
    ltRose.set(sD ? win(t, at('speed') + 0.2, at('speed') + 3.3, 0.3) : 0);
    bubbles.forEach((b, i) => {
      const f = (t * 0.35 + i * 0.137) % 1;
      attr(b, 'cx', 200 + i * 92 + Math.sin(t * 2 + i) * 10 * AMP); attr(b, 'cy', 524 - f * 150);
      op(b, sA || (sC && t < at('sing')) ? 0.9 * Math.sin(f * Math.PI) : 0);   // bubbles for Mr Tan's pun too
    });
    const show = (c, x, y, s, st) => { op(c, 1); tr(c, x, y, s); c.set(Object.assign({ t }, st)); };
    const scrub = i => 0.35 + 0.25 * Math.sin(t * 5 + i * 1.7) * AMP;   // washing up

    /* ---------- A: six washers, then four ---------- */
    if (sA) {
      popIn(cNine, t, at('nine') + 0.05, 880, 60);
      if (t < at('six')) popIn(cMount, t, mid('nine', 0.5), 330, 230);
      if (t >= at('six') && t < at('four')) cSix.set(P(t, mid('six', 0.32), 0.4, linear)), tr(cSix, 600, 232);
      if (t >= at('four')) { cFour.set(P(t, mid('four', 0.62), 0.4, linear)); tr(cFour, 600, 232); }
      if (t > mid('six', 0.55) && t < at('four')) popIn(cKopi, t, mid('six', 0.58), 1060, 232);
      const gone = P(t, mid('four', 0.4), 0.7, easeIn);
      const mx = lerp(XS[0], -200, gone), dx = lerp(XS[1], -120, gone);
      const look = i => who === 'mum' ? -0.8 : who === 'dad' ? (i > 1 ? -0.8 : 0.8) : 0;
      if (gone < 1) {
        show(mum, mx, 448, 0.78, { talk: scTalk(S, t, 'mum'), mood: t < at('four') ? 'neutral' : 'happy', look: who === 'dad' ? 0.8 : 0.3, lift: t < at('four') ? scrub(0) : 0 });
        show(dad, dx, 448, 0.78, { talk: scTalk(S, t, 'dad'), mood: t < at('four') ? 'neutral' : 'happy', look: who === 'mum' ? -0.8 : 0.4, lift: t < at('four') ? scrub(1) : 0 });
      }
      const later = t >= at('four');
      show(kav, XS[2], 452, 0.8, { talk: 0, mood: later ? (t > mid('four', 0.5) ? 'shock' : 'neutral') : 'neutral', look: look(2) });
      show(priya, XS[3], 452, 0.78, { mood: later && t > mid('four', 0.5) ? 'annoyed' : 'neutral', look: look(3), lift: scrub(3) });
      show(boy, XS[4], 458, 0.78, { mood: later && t > mid('four', 0.5) ? 'sad' : 'happy', look: look(4), lift: scrub(4) });
      const wave = t > mid('six', 0.55) && t < at('four') ? 1 : 0.2 + 0.1 * Math.sin(t * 3);
      show(tan, XS[5], 448, 0.78, { mood: wave === 1 ? 'happy' : 'neutral', look: look(5), lift: wave });
      // head counts
      badges6.forEach((b, i) => {
        const p = P(t, mid('six', 0.12) + i * 0.1, 0.35, pop), x = i === 0 ? mx : i === 1 ? dx : XS[i];
        if (t < mid('four', 0.4) + 0.4) { op(b, clamp(p * 3) * (i < 2 ? 1 - gone : 1)); tr(b, x, 312, Math.max(0.01, 0.6 + 0.4 * p)); }
      });
      if (t > mid('four', 0.4) + 0.4) badges4.forEach((b, i) => popIn(b, t, mid('four', 0.4) + 0.4 + i * 0.08, XS[i + 2], 312));
    }

    /* ---------- B: Ivy, the graph ---------- */
    if (sB) {
      const bp = P(t, cB, 0.3, easeOut); tr(board, -20 * (1 - bp), 0); tr(card, 0, -12 * (1 - bp));
      // the card: Ivy's rule, then the numbers
      line(kIvy1, t, at('ivy') + 0.3, at('product') - 0.1); line(kIvy2, t, mid('ivy', 0.5), at('product') - 0.1);
      line(kExp, t, mid('expect', 0.15), at('product') - 0.1);
      line(kProd, t, mid('product', 0.25)); line(kFif, t, mid('fifteen', 0.3)); line(kGr, t, mid('graph', 0.12));
      if (t > at('product')) { cSame.set(P(t, mid('product', 0.7), 0.35, linear)); tr(cSame, 900, 372); }
      if (t > at('graph')) op(cSame, 0);
      rect6.set(P(t, mid('product', 0.45), 0.4, linear)); pt6.set(P(t, mid('product', 0.5), 0.4, linear));
      rect4.set(P(t, mid('fifteen', 0.45), 0.4, linear)); pt4.set(P(t, mid('fifteen', 0.5), 0.4, linear));
      curve.set(P(t, mid('graph', 0.3), 1.6, ease));
      const gp = P(t, mid('graph', 0.75), 0.3, linear);
      op(gaps, gp * (t > at('space') - 0.1 ? 0.55 + 0.45 * Math.sin(t * 9) : 1)); op(gapTxt, gp);
      op(axLeg, P(t, at('ivy') + 3.4, 0.3, linear));   // after Ivy's lower third, which sits on top of it
      // the cast: Kavya and Priya behind the counter, Ivy on it
      show(kav, 730, 452, 0.8, { talk: scTalk(S, t, 'kavya'), mood: who === 'kavya' ? 'happy' : t > at('space') ? 'deadpan' : 'neutral', look: who === 'kavya' ? -0.6 : 0.8 });
      show(priya, 1090, 452, 0.78, { mood: t > at('space') ? 'deadpan' : 'neutral', look: who === 'kavya' ? -0.9 : -0.6 });
      const ip = P(t, at('ivy') - 0.05, 0.45, pop);
      op(ivy, clamp(ip * 3));
      tr(ivy, 915, 438 + 40 * (1 - clamp(ip)), Math.max(0.01, 0.8 * ip));
      ivy.set({ t, talk: scTalk(S, t, 'ivy'), mood: who === 'kavya' ? 'happy' : 'smug', look: who === 'kavya' ? -0.8 : -0.5, gap: t > at('space') - 0.1 ? 1 : 0.6 });
    }

    /* ---------- C: the pun and the song ---------- */
    if (sC) {
      show(tan, 275, 448, 0.8, { talk: scTalk(S, t, 'tan'), mood: t < at('sing') ? 'happy' : 'neutral', look: t < at('sing') ? 0.4 : 0.8, lift: t < at('sing') ? 1 : 0.2 });
      const dead = t > mid('pun', 0.75) && t < at('sing');
      show(kav, 450, 452, 0.8, { mood: dead ? 'deadpan' : t > at('not') ? 'smug' : 'neutral', look: t < at('sing') ? -0.8 : 0.8 });
      show(boy, 622, 458, 0.78, { mood: dead ? 'deadpan' : 'happy', look: t < at('sing') ? -0.8 : 0.8, lift: 0.2 });
      show(priya, 800, 452, 0.8, { talk: scTalk(S, t, 'priya'), mood: dead ? 'deadpan' : t >= at('not') ? 'annoyed' : 'happy', look: t < at('sing') ? -0.8 : t >= at('not') ? 0.8 : 0, lift: t >= at('sing') && t < at('not') ? 1 : 0 });
      show(ivy, 1010, 438, 0.8, { talk: scTalk(S, t, 'ivy'), mood: dead ? 'deadpan' : 'smug', look: -0.7 });
      if (dead || (t > at('pun') && t < at('sing'))) popIn(cChirp, t, mid('pun', 0.88), 600, 230);
      // Priya sings
      if (t >= at('sing') && t < at('not') + 1) notes.forEach((n, i) => {
        const f = ((t - at('sing')) * 0.6 + i * 0.2) % 1;
        op(n, Math.sin(f * Math.PI)); tr(n, 830 + i * 18 + Math.sin(t * 3 + i) * 20 * AMP, 330 - f * 140, 1, Math.sin(t * 4 + i) * 15);
      });
      if (t >= at('sing')) { cSing.set(P(t, mid('sing', 0.3), 0.4, linear)); tr(cSing, 400, 214); }
      if (t >= at('not')) {
        op(singX, 1); singL.set(P(t, at('not') + 0.1, 0.3, linear)); tr(singX, 400, 214);
        cNot.set(P(t, mid('not', 0.2), 0.4, linear)); tr(cNot, 400, 288);
        t1.set(P(t, mid('not', 0.45), 0.4, linear)); tr(t1, 880, 214);
        t2.set(P(t, mid('not', 0.6), 0.4, linear)); tr(t2, 880, 278);
      }
    }

    /* ---------- D: the coach ---------- */
    if (sD) {
      const cp = P(t, cD, 0.3, easeOut);
      tr(callG, 300, 300 + 24 * (1 - cp));
      call.rose.set({ t, talk: scTalk(S, t, 'rose'), mood: who === 'ivy' ? 'neutral' : 'shock', look: who === 'ivy' ? 0.6 : 0 });
      // the traffic crawls
      const crawl = t * 14 * AMP;
      let d = ''; for (let k = -1; k < 6; k++) { const x = -194 + ((k * 90 - crawl) % 450 + 450) % 450; d += `M${x.toFixed(1)},14 L${(x + 44).toFixed(1)},14 `; }
      attr(dashes, 'd', d);
      cars.forEach(({ g, x }, i) => tr(g, x + Math.sin(t * 0.7 + i) * 3, -22));
      line(d1, t, mid('speed', 0.3)); line(d2, t, mid('speed', 0.75));
      line(d3, t, at('time') + 0.1); line(d4, t, mid('time', 0.28)); line(d5, t, mid('time', 0.68));
      op(ring4, P(t, mid('time', 0.85), 0.3, linear));
      show(kavF, 470, 614, 0.85, { talk: 0, mood: t > mid('time', 0.7) ? 'happy' : 'neutral', look: who === 'ivy' ? 0.8 : -0.7 });
      const ip = P(t, at('time') - 0.3, 0.45, pop);
      if (ip > 0) { show(ivyF, 1010, 586, Math.max(0.01, 0.72 * ip), { talk: scTalk(S, t, 'ivy'), mood: 'smug', look: -0.8, gap: 0.8 }); op(ivyF, clamp(ip * 3)); }
    }
  };
});
