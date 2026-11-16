/* Scene 2: Red and black (multiplying and dividing negative numbers).
   Shots (hard sitcom cuts):
   B  the CARD GAMES booth: Priya and Kavya behind the table, their cards propped on the front of the table with
      value chips (black = +, red = −), Dash on the table, the board (right). 3 × (−4) = −12 (three hops of −4);
      (−3) × (−4) = ?; the pattern 3 × (−4) ... −3 × (−4) going up 4 each time (showpiece, CORRECT!).
   D  push in on the table top: Dasha bounces in, crosses Dash into a "+" (he hates it). Later she hugs him.
   B  the sign table (same signs +, different −; −12 ÷ (−3) = 4); Ah Boy's friend/enemy rule; the final round with
      five reds: 1 × 2 × 3 × 4 × 5 = 120, five negatives is odd, −120; Mr Tan's estimate −38 × 21 ≈ −40 × 20 = −800,
      exact −798; 12 > −12, Priya "let" Kavya win. */
scene('cards', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const view = (el, k, fx, fy, sx, sy) => el.setAttribute('transform', `translate(${sx.toFixed(1)} ${sy.toFixed(1)}) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const fade = (el, t, t0) => op(el, P(t, t0, 0.3, linear));
  const popAt = (c, t, t0, x, y, t1) => { c.set(t >= t0 && (t1 === undefined || t < t1) ? P(t, t0, 0.35, linear) : 0); tr(c, x, y); };
  const GOLD = '#FFE45C', RED = '#D32F2F', GREEN = '#1E9E5A', BLUE = '#2E6FD8', INK = MK.ink, GREY = '#8A96A3';
  const BX = 970;

  /* layers */
  const Lset = G(root), Lboard = G(root), Lcast = G(root), Lfront = G(root), Ltop = G(root), Lfg = G(root), Lhud = G(root);
  const ZOOM = [Lset, Lboard, Lcast, Lfront, Ltop];

  /* ================= the booth ================= */
  const booth = ipBooth(Lset, { title: 'CARD GAMES', col: '#1E9E5A', cloth: '#56D69B' });
  Lfront.appendChild(booth.front); Lfront.appendChild(booth.top);

  /* the cards, propped on the front of the table, and their value chips */
  const CS = 0.55, CY = 584, VY = 662;
  const mkCardAt = (rank, red, x, val) => {
    const c = ipCard(Ltop, rank, red, { s: CS }); tr(c, x, CY, CS);
    const v = mkChip(Ltop, `{{${val}}}`, { size: 28, col: red ? '#FFB3B3' : '#FFFFFF', fill: red ? '#7A1414' : '#1E1E26' }); tr(v, x, VY);
    return { c, v, x };
  };
  const pC = [mkCardAt('3', false, 145, '3'), mkCardAt('4', true, 240, '-4')];
  const kC = [mkCardAt('3', true, 400, '-3'), mkCardAt('4', true, 495, '-4')];
  const fiveC = [1, 2, 3, 4, 5].map(n => mkCardAt(String(n), true, 30 + n * 100, '-' + n));
  const badges = fiveC.map((f, i) => { const g = G(Ltop); E('circle', { r: 19, fill: GOLD, stroke: SC_INK, 'stroke-width': 3 }, g); T(g, 0, 9, String(i + 1), { size: 26, weight: 800, anchor: 'middle', fill: SC_INK }); tr(g, f.x + 34, 540); return g; });

  /* the board (right), bottom hidden by the table */
  const board = G(Lboard);
  E('rect', { x: 760, y: 188, width: 420, height: 360, rx: 14, fill: MK.board, stroke: '#8FA3B8', 'stroke-width': 5 }, board);
  E('rect', { x: 760, y: 188, width: 420, height: 14, rx: 7, fill: '#C9D3DC' }, board);
  // priya: the rules
  const bRules = G(board);
  const r0 = mkText(bRules, BX, 248, '**CARD BATTLE**', { size: 34, anchor: 'middle', fill: '#1E7A48' });
  const r1 = G(bRules); { const c = ipCard(r1, '5', false, { s: 0.42 }); tr(c, 830, 318, 0.42); mkText(r1, 880, 330, '**black** = positive', { size: 30, fill: INK }); }
  const r2 = G(bRules); { const c = ipCard(r2, '5', true, { s: 0.42 }); tr(c, 830, 410, 0.42); mkText(r2, 880, 422, '**red** = negative', { size: 30, fill: RED }); }
  const r3 = mkText(bRules, BX, 500, 'biggest **product** wins', { size: 30, anchor: 'middle', fill: INK });
  // mine: 3 × (−4) = −12, three hops of −4
  const bMine = G(board);
  const m1 = mkMath(bMine, BX, 262, '3 * (-4) = -12', { size: 44, fill: INK, anchor: 'middle' });
  const m2 = mkText(bMine, BX, 318, 'three lots of {{-4}}', { size: 28, anchor: 'middle', fill: '#5A6670' });
  const NLm = mkNumberLine(bMine, { from: -12, to: 0, len: 330, size: 28, ink: INK, arrows: false,
    labels: [[-12, '-12'], [-8, '-8'], [-4, '-4'], [0, '0']],
    hops: [0, 1, 2].map(i => ({ a: -4 * i, b: -4 * (i + 1), height: 38, col: RED, label: '{{-4}}', size: 28 })) });
  tr(NLm, 805, 446);
  // reds: (−3) × (−4) = ?
  const bReds = G(board);
  const q1 = mkMath(bReds, BX, 300, '(-3) * (-4) = ?', { size: 44, fill: INK, anchor: 'middle' });
  const q2 = G(bReds); mkMath(q2, BX, 410, '-12 ?', { size: 52, fill: GREY, anchor: 'middle' }); T(q2, BX, 462, 'also?', { size: 28, weight: 700, anchor: 'middle', fill: GREY, font: FB });
  // pattern and up
  const bPat = G(board);
  const PW = mkWorking(bPat, 1000, 208, ['3 * (-4) = -12', '2 * (-4) = -8', '1 * (-4) = -4', '0 * (-4) = 0',
    { m: '-1 * (-4) = 4', col: GREEN }, { m: '-2 * (-4) = 8', col: GREEN }, { m: '-3 * (-4) = 12', col: GREEN }], { size: 30, fill: INK, gap: 9, slide: 16 });
  const plus4 = [];
  for (let i = 0; i < 6; i++) { const y = (PW.lineY[i] + PW.lineY[i + 1]) / 2 - 2; plus4.push(mkMath(bPat, 1124, y + 9, '+4', { size: 26, fill: GREEN, weight: 700 })); }
  // rule: the sign table
  const bRule = G(board);
  const ST = mkTable(bRule, [['× ÷', '+', '−'], ['+', '+', '−'], ['−', '−', '+']], { size: 32, colW: 88, rowH: 54, ink: INK, head: true, side: true, fill: '#FFFFFF', headFill: 'rgba(76,201,240,0.25)' });
  tr(ST, BX - 132, 204);
  const stSame = [ST.mark(1, 1, 'rgba(86,214,155,0.45)'), ST.mark(2, 2, 'rgba(86,214,155,0.45)')];
  const stDiff = [ST.mark(1, 2, 'rgba(255,107,92,0.35)'), ST.mark(2, 1, 'rgba(255,107,92,0.35)')];
  const ru1 = mkText(bRule, BX, 404, '**same** signs → **+**', { size: 30, anchor: 'middle', fill: GREEN });
  const ru2 = mkText(bRule, BX, 446, '**different** signs → **−**', { size: 30, anchor: 'middle', fill: RED });
  const ru3 = mkMath(bRule, BX, 502, '-12 ÷ (-3) = 4', { size: 36, fill: INK, anchor: 'middle' });
  // friend: Ah Boy's rule
  const bFr = G(board);
  const FR = [['friend × friend = **friend**', '(+) * (+) = +', GREEN], ['enemy × enemy = **friend**', '(-) * (-) = +', GREEN], ['friend × enemy = **enemy**', '(+) * (-) = -', RED]].map(([w, m, c], i) => {
    const g = G(bFr), y = 252 + i * 92;
    const ch = mkChip(g, w, { size: 28, col: c, fill: '#FFFFFF' }); tr(ch, BX, y); ch.set(1);
    mkMath(g, BX, y + 48, m, { size: 28, fill: c, anchor: 'middle' });
    return g;
  });
  // five and count
  const bFive = G(board);
  const f1 = mkText(bFive, BX, 244, 'Final round: **five reds**', { size: 30, anchor: 'middle', fill: '#5A6670', boldFill: RED });
  const f2 = mkMath(bFive, BX, 300, '(-1) * (-2) * (-3)', { size: 36, fill: INK, anchor: 'middle' });
  const f3 = mkMath(bFive, BX, 350, '* (-4) * (-5)', { size: 36, fill: INK, anchor: 'middle' });
  const f4 = mkText(bFive, BX, 412, 'size: {{1 * 2 * 3 * 4 * 5 = 120}}', { size: 28, anchor: 'middle', fill: INK });
  const f5 = mkText(bFive, BX, 462, '**5** negatives: **odd**', { size: 30, anchor: 'middle', fill: RED });
  const f6 = G(bFive); const f6m = mkMath(f6, BX, 508, '= -120', { size: 40, fill: GREEN, anchor: 'middle' });
  E('rect', { x: BX - f6m.w / 2 - 14, y: 508 - 40, width: f6m.w + 28, height: 52, rx: 10, fill: 'none', stroke: GREEN, 'stroke-width': 4 }, f6);
  const cEven = mkChip(Lfg, '**even** number of negatives → **+**', { size: 28, col: GOLD });
  // est: Mr Tan
  const bEst = G(board);
  const e1 = mkText(bEst, BX, 246, '**Estimate** first', { size: 32, anchor: 'middle', fill: BLUE });
  const e2 = mkMath(bEst, BX, 304, '-38 * 21 ~= -40 * 20', { size: 34, fill: INK, anchor: 'middle' });
  const e3 = mkMath(bEst, BX, 356, '= -800', { size: 38, fill: BLUE, anchor: 'middle' });
  const e4 = mkText(bEst, BX, 432, '**Exact:** {{-38 * 21 = -798}}', { size: 30, anchor: 'middle', fill: INK });
  const e5 = G(bEst); { const k = tick(e5, 14, GREEN); tr(k, BX - 56, 486); mkText(e5, BX - 30, 496, '**close!**', { size: 30, fill: GREEN }); }
  // let: 12 > −12
  const bLet = G(board);
  const l1 = mkMath(bLet, BX, 352, '12 > -12', { size: 72, fill: GREEN, anchor: 'middle' });
  const l2 = mkText(bLet, BX, 440, 'Kavya {{12}}  ·  Priya {{-12}}', { size: 28, anchor: 'middle', fill: '#5A6670' });

  /* chips over the booth */
  const cPlus = mkChip(Lhud, '{{(-) * (-) = +}}', { size: 40, col: GOLD });
  const bubLet = mkSpeechBubble(Lfg, 'I **let** you win.', { size: 28, tail: 'down', tailX: -40 });

  /* ================= the cast ================= */
  const priya = cast(Lcast, 'priya', { s: 0.85, prop: null, hand: true });
  const kav = cast(Lcast, 'kavya', { s: 0.85 });
  const boy = cast(Lcast, 'boy', { s: 0.82 });
  const tan = cast(Lcast, 'tan', { s: 0.85 });
  const dash = cast(Ltop, 'dash', { s: 0.42 });
  const dasha = cast(Ltop, 'dasha', { s: 0.42 });
  const lt = { priya: ipLowerThird(Lhud, 'priya'), dasha: ipLowerThird(Lhud, 'dasha'), tan: ipLowerThird(Lhud, 'tan') };
  const stampOK = ipStamp(Lhud, true);
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cuts */
  const cD = at('dasha') - 0.06, cB2 = at('rule') - 0.06, cD2 = at('sister') - 0.06, cB3 = at('five') - 0.06;
  const XP = 190, XK = 445, XS = 650, YH = 440, DS = 0.42, YT = 530 - 82 * DS, XDa = 600, XDb = 712;

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const sD = on(t, cD, cB2) || on(t, cD2, cB3), sB = 1 - sD;
    booth.upd(t);
    for (const k in lt) lt[k].set(0);
    stampOK.set(0); cPlus.set(0); cEven.set(0); bubLet.set(0);
    [bRules, bMine, bReds, bPat, bRule, bFr, bFive, bEst, bLet].forEach(g => op(g, 0));
    const show = { priya: 0, kav: 0, boy: 0, tan: 0, dash: 1, dasha: 0 };

    /* camera: the push-in on the table top in D */
    if (sD) ZOOM.forEach(L => view(L, 2.2, 656, 470, 600, 420));
    else ZOOM.forEach(L => L.removeAttribute('transform'));
    op(board, sB);

    /* cards */
    const final = t >= cB3, fiveOn = final && t < at('est') + 0.3, letOn = t >= at('let') - 0.2;
    const four = (!final || letOn) ? 1 : 0;
    [...pC, ...kC].forEach(o => { op(o.c, four); op(o.v, four); o.c.hl(0); });
    const out5 = P(t, at('est') - 0.1, 0.35, easeIn);
    fiveC.forEach(o => { op(o.c, fiveOn ? 1 - out5 : 0); op(o.v, fiveOn ? 1 - out5 : 0); tr(o.c, o.x, CY + 120 * out5, CS); o.c.hl(0); });
    badges.forEach(b => op(b, 0));
    const deal = P(t, mid('priya', 0.78), 0.4, easeOut);
    if (sD) [...pC, ...kC, ...fiveC].forEach(o => { op(o.c, 0); op(o.v, 0); });
    else if (!final) {
      pC.forEach((o, i) => { const p = P(t, mid('mine', 0.06 + i * 0.16), 0.4, linear); o.c.set(p); op(o.v, P(t, mid('mine', 0.2 + i * 0.16), 0.3, linear)); });
      kC.forEach((o, i) => { const p = P(t, mid('reds', 0.08 + i * 0.14), 0.4, linear); o.c.set(p); op(o.v, P(t, mid('reds', 0.22 + i * 0.14), 0.3, linear)); });
      [...pC, ...kC].forEach(o => { op(o.c, deal); tr(o.c, o.x, CY + 60 * (1 - deal), CS); });
    } else if (letOn) {
      const back = P(t, at('let') - 0.2, 0.35, easeOut);
      [...pC, ...kC].forEach(o => { o.c.set(1); op(o.c, back); op(o.v, back); tr(o.c, o.x, CY + 60 * (1 - back), CS); });
      kC.forEach(o => o.c.hl(P(t, mid('let', 0.1), 0.3, linear)));
    } else if (fiveOn) {
      fiveC.forEach((o, i) => { const p = P(t, mid('five', 0.12 + i * 0.12), 0.35, linear); o.c.set(p); op(o.v, (1 - out5) * P(t, mid('five', 0.2 + i * 0.12), 0.3, linear)); });
      if (t >= at('count')) badges.forEach((b, i) => { const p = P(t, mid('count', 0.4 + i * 0.05), 0.3, pop); op(b, clamp(p * 3) * (1 - out5)); tr(b, fiveC[i].x + 34, 540 + 120 * out5, Math.max(0.01, 0.6 + 0.4 * p)); });
    }

    /* ---------- B: the booth ---------- */
    if (sB) {
      show.priya = 1; show.kav = 1;
      tr(priya, XP, YH, 0.85); tr(kav, XK, YH, 0.85);
      // Priya
      let pm = 'smug', pl = 0.7, pLift = 0;
      if (t < at('mine')) { pm = 'smug'; pl = 0.3; pLift = 1; }
      else if (t < at('reds')) { pm = 'smug'; pl = 0.6; }
      else if (t < cD) { pm = t < at('pattern') ? 'smug' : t < at('up') ? 'neutral' : 'shock'; pl = t < at('pattern') ? 0.6 : 0.9; }
      else if (t < cD2) { pm = 'neutral'; pl = t < at('friend') ? 0.9 : 0.9; }
      else if (t < at('count')) { pm = 'smug'; pl = 0.6; pLift = t < end('five') ? 1 : 0; }
      else if (t < at('est')) { pm = t > mid('count', 0.7) ? 'shock' : 'neutral'; pl = 0.6; }
      else if (t < at('let')) { pm = 'annoyed'; pl = 0.9; }
      else { pm = t < mid('let', 0.45) ? 'annoyed' : 'smug'; pl = t < mid('let', 0.45) ? 0.6 : 0; }
      priya.set({ t, talk: scTalk(S, t, 'priya'), mood: pm, look: pl, lift: pLift });
      if (t < at('mine')) lt.priya.set(win(t, at('priya') + 0.05, at('priya') + 3.2, 0.3));
      // Kavya
      let km = 'neutral', kl = -0.7;
      if (t < at('reds')) { km = t < at('mine') ? 'neutral' : 'sad'; kl = -0.8; }
      else if (t < at('pattern')) { km = 'sad'; kl = 0.2; }
      else if (t < at('up')) { km = 'neutral'; kl = 0.9; }
      else if (t < cD) { km = t > mid('up', 0.6) ? 'happy' : 'shock'; kl = 0.9; }
      else if (t < cD2) { km = 'happy'; kl = t < at('friend') ? 0.9 : 0.8; }
      else if (t < at('count')) { km = 'neutral'; kl = -0.8; }
      else if (t < at('est')) { km = t > mid('count', 0.7) ? 'happy' : 'neutral'; kl = 0.9; }
      else if (t < at('let')) { km = 'neutral'; kl = 0.8; }
      else { km = 'deadpan'; kl = -0.9; }
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
      // Ah Boy (friend)
      if (t >= at('friend') - 0.3 && t < cD2) {
        show.boy = 1;
        const up = P(t, at('friend') - 0.3, 0.35, pop);
        tr(boy, XS, lerp(680, YH + 12, up), 0.82);
        boy.set({ t, talk: scTalk(S, t, 'boy'), mood: 'happy', look: 0.6, lift: 1 });
      }
      // Mr Tan (est)
      if (t >= at('est') - 0.4 && t < at('let') + 0.6) {
        show.tan = 1;
        const inn = P(t, at('est') - 0.4, 0.45, easeOut), out = P(t, at('let') + 0.1, 0.45, easeIn);
        tr(tan, lerp(760, XS, inn) + 140 * out, YH, 0.85);
        tan.set({ t, talk: scTalk(S, t, 'tan'), mood: 'happy', look: t < mid('est', 0.15) ? -0.6 : 0.8, lift: t > mid('est', 0.2) && t < at('let') ? 1 : 0 });
        lt.tan.set(win(t, at('est') + 0.05, at('est') + 3.2, 0.3));
        op(tan, clamp(1 - out * 1.5));
      }
      // Dash and Dasha on the table
      tr(dash, XDa, YT, DS);
      const plus = t < cB2 ? 0 : 1 - P(t, at('rule'), 0.6, ease);
      let dm = 'sad', dl = -0.8, da = 0;
      if (t >= at('pattern') && t < cD) { dm = t >= at('up') ? 'neutral' : 'neutral'; dl = 1; da = t < mid('pattern', 0.9) ? 0.5 : 0; }
      if (t >= cB2 && t < at('friend')) { dm = t < at('rule') + 0.5 ? 'shock' : 'neutral'; dl = 1; da = t > mid('rule', 0.2) ? 0.4 : 0; }
      if (t >= at('friend') && t < cD2) { dm = 'deadpan'; dl = 0.6; }
      if (final) { dm = t >= at('count') && t > mid('count', 0.6) ? 'deadpan' : 'sad'; dl = -0.8; }
      dash.set({ t, talk: scTalk(S, t, 'dash'), mood: dm, look: dl, arms: da, plus });
      if (t >= cB2) {
        show.dasha = 1;
        tr(dasha, XDb, YT, DS);
        dasha.set({ t, talk: scTalk(S, t, 'dasha'), mood: 'happy', look: -0.5, arms: t >= at('friend') && t < cD2 ? 0.6 : 0.2 });
      }

      // the board
      if (t < at('mine')) {
        op(bRules, 1);
        op(r0, P(t, at('priya') + 0.1, 0.3, linear));
        fade(r1, t, mid('priya', 0.36)); fade(r2, t, mid('priya', 0.55)); fade(r3, t, mid('priya', 0.78));
      } else if (t < at('reds')) {
        op(bMine, 1);
        fade(m1, t, mid('mine', 0.4)); fade(m2, t, mid('mine', 0.48));
        [0, 1, 2].forEach(i => NLm.hop(i, P(t, mid('mine', 0.5 + i * 0.13), 0.45, ease)));
      } else if (t < at('pattern')) {
        op(bReds, 1);
        fade(q1, t, mid('reds', 0.35)); fade(q2, t, mid('reds', 0.6));
      } else if (t < cD) {
        op(bPat, 1);
        for (let i = 0; i < 7; i++) PW.show(i, i < 4 ? P(t, mid('pattern', 0.1 + i * 0.21), 0.3, linear) : P(t, mid('up', 0.28 + (i - 4) * 0.2), 0.3, linear));
        plus4.forEach((e, i) => op(e, i < 3 ? P(t, mid('up', 0.05), 0.3, linear) : P(t, mid('up', 0.28 + (i - 3) * 0.2), 0.3, linear)));
        PW.ring(6, P(t, mid('up', 0.8), 0.3, linear));
        if (t >= mid('up', 0.85)) { stampOK.set(P(t, mid('up', 0.85), 0.35, linear)); tr(stampOK, 640, 618, 0.55); }
      } else if (t < at('friend')) {
        op(bRule, 1);
        op(ST, P(t, at('rule') + 0.1, 0.3, linear));
        stSame.forEach(m => m.set(P(t, mid('rule', 0.12), 0.3, linear)));
        stDiff.forEach(m => m.set(P(t, mid('rule', 0.32), 0.3, linear)));
        fade(ru1, t, mid('rule', 0.12)); fade(ru2, t, mid('rule', 0.32));
        fade(ru3, t, mid('rule', 0.6));
      } else if (!final) {
        op(bFr, 1);
        FR.forEach((g, i) => fade(g, t, mid('friend', 0.1 + i * 0.3)));
      } else if (t < at('est')) {
        op(bFive, 1);
        fade(f1, t, at('five') + 0.05); fade(f2, t, mid('five', 0.3)); fade(f3, t, mid('five', 0.6));
        op(f4, P(t, mid('count', 0.08), 0.3, linear)); op(f5, P(t, mid('count', 0.42), 0.3, linear)); op(f6, P(t, mid('count', 0.58), 0.3, linear));
        if (t >= at('count')) popAt(cEven, t, mid('count', 0.72), 960, 630);
      } else if (t < at('let')) {
        op(bEst, 1);
        fade(e1, t, at('est') + 0.1); fade(e2, t, mid('est', 0.18)); fade(e3, t, mid('est', 0.45)); fade(e4, t, mid('est', 0.6)); fade(e5, t, mid('est', 0.84));
      } else {
        op(bLet, 1);
        fade(l1, t, at('let') + 0.05); fade(l2, t, mid('let', 0.3));
        popAt(bubLet, t, mid('let', 0.55), 260, 236);
      }
    }

    /* ---------- D: the table top, close ---------- */
    if (sD) {
      tr(dash, XDa, YT, DS);
      show.dasha = 1;
      if (t < cB2) {
        // Dasha bounces in from the right, twirls, and two negatives make a positive
        const inn = P(t, at('dasha') - 0.05, 0.9, easeOut);
        const hop = Math.abs(Math.sin(P(t, at('dasha') - 0.05, 0.9, linear) * Math.PI * 3)) * (1 - inn) * 24;
        const twirl = P(t, at('ugh') - 0.1, 0.45, ease);
        const slide = P(t, at('ugh') + 0.1, 0.35, ease) * (1 - P(t, mid('ugh', 0.75), 0.4, ease));
        tr(dasha, lerp(900, XDb, inn) - 22 * slide, YT - hop, DS, 360 * twirl);
        dasha.set({ t, talk: scTalk(S, t, 'dasha'), mood: 'happy', look: -0.9, arms: t < at('ugh') ? 1 : 0.6 });
        lt.dasha.set(win(t, at('dasha') + 0.3, at('dasha') + 3.3, 0.3));
        const plus = P(t, at('ugh') + 0.25, 0.5, pop);
        const dmood = t < at('ugh') ? 'sad' : t < mid('ugh', 0.55) ? 'shock' : 'deadpan';
        dash.set({ t, talk: scTalk(S, t, 'dash'), mood: dmood, look: t < at('ugh') ? 1 : 0, plus: t < at('ugh') ? 0 : plus, arms: t >= at('ugh') && t < mid('ugh', 0.55) ? 1 : 0 });
        if (t >= at('ugh')) popAt(cPlus, t, at('ugh') + 0.35, 600, 150);
      } else {
        // sister: the hug
        const hug = P(t, at('sister') - 0.05, 0.4, ease);
        tr(dasha, lerp(XDb, XDa + 70, hug), YT, DS, -8 * hug);
        dasha.set({ t, mood: 'happy', look: -0.9, arms: 1 });
        dash.set({ t, talk: scTalk(S, t, 'dash'), mood: 'deadpan', look: 0, still: true });
      }
    }

    op(priya, show.priya); op(kav, show.kav); op(boy, show.boy); op(dash, show.dash); op(dasha, show.dasha);
    if (!show.tan) op(tan, 0);
  };
});
