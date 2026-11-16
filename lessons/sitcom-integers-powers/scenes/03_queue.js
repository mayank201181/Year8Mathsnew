/* Scene 3: Now serving: Brackets (order of operations).
   Shots (hard sitcom cuts):
   A  the MATHS QUIZ booth, 11 a.m.: the family team behind the table (Dad, Mum, Kavya; team sign "DAD AND THE
      CALCULATORS"), Queenie on her pole, the rice cooker glowing on the table, Mr Tan at his lectern; the question
      on a screen hung under the canopy. Q1 √4 + 16 × 2: answer cards 36, 6, 34 slap down.
   B  Queenie's queue board: Queenie big on the left, the board on the right. Her tickets B, I, D M, A S pop out
      of her slot and line up (showpiece); √4 = 2, 16 × 2 = 32, 2 + 32 = 34 (CORRECT!); Dad's and Mum's routes in
      red (BZZT!).
   A  Q2 12 ÷ 3 × 2 -> push in on Mum: 12 ÷ (3 × 2) = 12 ÷ 6 = 2 (BZZT!).
   B  D and M share one ticket: left to right, 12 ÷ 3 = 4, 4 × 2 = 8 (CORRECT!); A and S too.
   A  Q3 20 − 3 × (5 − 7)².
   B  the working, ticket by ticket: B, I, M, S -> 8.
   A  push in on Dad: his calculator says −3² = −9.
   B  −3² = −(3²) = −9 vs (−3)² = 9, the bracket glowing.
   A  third place: a calculator. "We are the calculators now." */
scene('queue', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);          // hard sitcom cut
  const view = (el, k, fx, fy, sx, sy) => el.setAttribute('transform', `translate(${sx.toFixed(1)} ${sy.toFixed(1)}) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const popAt = (c, t, t0, x, y, t1) => { c.set(t >= t0 && (t1 === undefined || t < t1) ? P(t, t0, 0.35, linear) : 0); if (x !== undefined) tr(c, x, y); };
  const fade = (el, t, t0, t1) => op(el, t1 === undefined ? P(t, t0, 0.3, linear) : Math.min(P(t, t0, 0.3, linear), 1 - P(t, t1 - 0.2, 0.2, linear)));
  const GOLD = '#FFE45C', RED = '#D32F2F', GREEN = '#1E9E5A', INK = MK.ink, TRED = '#C62828', MUTE = '#5A6670';

  /* a paper queue ticket, centred: big letters on top, a word underneath */
  const ticket = (parent, big, small, w, h) => {
    const g = G(parent), inner = G(g);
    E('rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: 8, fill: '#FFFDF6', stroke: SC_INK, 'stroke-width': 4 }, inner);
    E('line', { x1: -w / 2 + 10, y1: -h / 2 + 12, x2: w / 2 - 10, y2: -h / 2 + 12, stroke: '#C9D3DC', 'stroke-width': 3, 'stroke-dasharray': '6 5' }, inner);
    const big1 = T(inner, 0, small ? -h / 2 + 62 : 14, big, { size: small ? 46 : Math.round(h * 0.5), weight: 800, anchor: 'middle', fill: TRED, ls: 2 });
    if (small) mkText(inner, 0, h / 2 - 16, small, { size: 26, anchor: 'middle', fill: INK, weight: 700 });
    const hl = E('rect', { x: -w / 2 - 8, y: -h / 2 - 8, width: w + 16, height: h + 16, rx: 12, fill: 'none', stroke: GOLD, 'stroke-width': 7 }, g);
    op(hl, 0);
    g.hl = p => op(hl, p);
    g.inner = inner; g.big = big1;
    return g;
  };

  /* layers: set, hung screen, people, table, things on the table, Queenie's board (B), chips, HUD */
  const Lset = G(root), Lscreen = G(root), Lcast = G(root), Lfront = G(root), Ltop = G(root), Lboard = G(root), Lfg = G(root), Lhud = G(root);
  const ZOOM = [Lset, Lscreen, Lcast, Lfront, Ltop];

  /* ================= A: the quiz booth ================= */
  const booth = ipBooth(Lset, { title: 'MATHS QUIZ', col: '#C27C0E', cloth: '#FFC247' });
  Lfront.appendChild(booth.front); Lfront.appendChild(booth.top);
  // the team sign on the table cloth
  const sign = G(Lfront);
  E('rect', { x: 84, y: 560, width: 512, height: 62, rx: 12, fill: '#FFFDF6', stroke: SC_INK, 'stroke-width': 4 }, sign);
  T(sign, 340, 602, 'DAD AND THE CALCULATORS', { size: 30, weight: 800, anchor: 'middle', fill: '#2E3552', ls: 1 });
  // the question screen hung from the canopy
  const scr = G(Lscreen);
  E('path', { d: 'M190,176 L190,190 M550,176 L550,190', stroke: '#5A6670', 'stroke-width': 4 }, scr);
  E('rect', { x: 140, y: 188, width: 460, height: 112, rx: 14, fill: '#0E1A24', stroke: '#C27C0E', 'stroke-width': 5 }, scr);
  const qRes = T(scr, 370, 260, 'RESULTS', { size: 44, weight: 800, anchor: 'middle', fill: GOLD, ls: 4 });
  const qLab = ['Q1', 'Q2', 'Q3', 'Q4'].map(s => T(scr, 162, 222, s, { size: 26, weight: 800, fill: GOLD }));
  const qMath = [['sqrt(4) + 16 * 2', 50], ['12 ÷ 3 * 2', 52], ['20 - 3 * (5 - 7)^2', 44]].map(([src, sz]) => mkMath(scr, 390, 266, src, { size: sz, fill: C.ink, anchor: 'middle' }));
  // the rice cooker (1st prize) and its glow; Mr Tan's lectern
  const rcGlow = E('ellipse', { cx: 870, cy: 470, rx: 110, ry: 90, fill: glow(GOLD) }, Ltop);
  const rc = ipRiceCooker(Ltop, { s: 0.6 }); tr(rc, 870, 530, 0.6);
  const lect = G(Ltop);
  E('path', { d: 'M990,476 L1130,466 L1118,530 L1002,530 Z', fill: '#9C6B3E', stroke: '#5A3A1E', 'stroke-width': 4, 'stroke-linejoin': 'round' }, lect);
  E('rect', { x: 1022, y: 488, width: 84, height: 26, rx: 5, fill: '#FFC247', stroke: '#5A3A1E', 'stroke-width': 2.5 }, lect);
  T(lect, 1064, 509, 'QUIZ', { size: 20, weight: 800, anchor: 'middle', fill: '#5A3A1E' });
  // the answer cards slapped on the table
  const ansCard = (txt, x, col) => {
    const g = G(Ltop), inner = G(g); tr(g, x, 503);
    E('rect', { x: -62, y: -30, width: 124, height: 60, rx: 8, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 4 }, inner);
    T(inner, 0, 17, txt, { size: 46, weight: 800, anchor: 'middle', fill: col || INK });
    g.set = p => { p = clamp(p); op(g, p > 0 ? 1 : 0); const k = p < 0.6 ? lerp(1.8, 0.94, p / 0.6) : lerp(0.94, 1, (p - 0.6) / 0.4); tr(inner, 0, -60 * (1 - clamp(p / 0.6)), k); };
    return g;
  };
  const XD = 150, XM = 300, XK = 450, XQ = 705, XT = 1060, YB = 430;
  const cards = [ansCard('36', XD), ansCard('6', XM), ansCard('34', XK)];
  const c11 = mkChip(Lfg, '**11 a.m.**', { size: 30, col: GOLD });
  const c1st = mkChip(Lfg, '1st prize: **rice cooker**', { size: 28, col: GOLD });
  const cQuiz = mkChip(Lfg, 'Quizmaster **Tan**', { size: 28, col: '#9FD8FF' });
  // the prize calculator, with a "3rd" rosette
  const prizeC = G(Lfg);
  { const cc = mkCalculator(prizeC); tr(cc, 0, 0, 0.3); cc.set('3rd');
    const ros = G(prizeC); tr(ros, 34, -44);
    E('path', { d: 'M-8,8 L-15,40 L0,32 L15,40 L8,8 Z', fill: '#B7BEC6', stroke: SC_INK, 'stroke-width': 2.5 }, ros);
    E('circle', { r: 22, fill: '#E8E2D6', stroke: SC_INK, 'stroke-width': 3 }, ros);
    T(ros, 0, 8, '3rd', { size: 20, weight: 800, anchor: 'middle', fill: '#5A3A1E' }); }
  const c3rd = mkChip(Lfg, '**3rd** place: a **calculator**', { size: 30, col: '#C9D3DC' });
  // Mum's push-in: her working in a speech bubble
  const bubMum = mkSpeechBubble(Lfg, '{{12 ÷ (3 * 2)}}\n{{= 12 ÷ 6 = 2}}', { size: 40, tail: 'left', ink: RED });
  const cMult = mkChip(Lfg, '**Multiplication** first?', { size: 28, col: '#FF8A8A' });
  // Dad's push-in: his calculator, big
  const bigCalc = mkCalculator(Lfg);
  const cCalc = mkChip(Lfg, '"**broken**"?', { size: 30, col: '#FF8A8A' });

  /* ================= B: Queenie's queue board ================= */
  const bd = G(Lboard);
  E('rect', { x: 466, y: 188, width: 712, height: 500, rx: 18, fill: MK.board, stroke: '#8FA3B8', 'stroke-width': 6 }, bd);
  E('rect', { x: 466, y: 188, width: 712, height: 16, rx: 8, fill: '#C9D3DC' }, bd);
  const BX = 822;
  // the queue rail: four slots and the four tickets
  const TX = [586, 741, 896, 1051], TY = 268, TW = 138, TH = 112;
  TX.forEach(x => E('rect', { x: x - TW / 2 - 4, y: TY - TH / 2 - 4, width: TW + 8, height: TH + 8, rx: 10, fill: 'none', stroke: '#B8C4CE', 'stroke-width': 3, 'stroke-dasharray': '8 6' }, bd));
  const tks = [['B', 'Brackets'], ['I', 'Indices'], ['D M', '÷ and ×'], ['A S', '+ and −']].map(([b, s]) => ticket(bd, b, s, TW, TH));
  const tkWords = ['B', 'I', 'DM', 'AS'];
  const cEmpty = mkText(bd, BX, 420, 'Nobody **cuts** my queue.', { size: 38, anchor: 'middle', fill: '#1E7470', boldFill: TRED });
  const cIdx = mkText(bd, BX, 370, '**Indices**: powers **and** roots', { size: 32, anchor: 'middle', fill: '#1E7470', boldFill: '#1E7470' });
  // mini ticket badge for the working rows
  const badge = (parent, s, x, y) => { const g = ticket(parent, s, null, 74, 52); tr(g, x, y); return g; };
  // B1: question 1, Kavya's working
  const b1 = G(bd);
  const q1m = mkMath(b1, BX, 384, 'sqrt(4) + 16 * 2', { size: 54, fill: INK, anchor: 'middle' });
  const W1 = mkWorking(b1, 760, 420, ['sqrt(4) = 2', '16 * 2 = 32', '2 + 32 = 34'], { size: 44, fill: INK, gap: 26 });
  const bg1 = ['I', 'DM', 'AS'].map((s, i) => badge(b1, s, 540, W1.lineY[i] - 15));
  // B2: the queue cutters
  const b2 = G(bd);
  const c2a = mkText(b2, 498, 470, 'Dad: {{2 + 16 = 18}}, {{18 * 2 = 36}}', { size: 36, fill: RED, boldFill: RED });
  const c2b = mkText(b2, 498, 570, 'Mum: {{sqrt(4 + 16 * 2) = sqrt(36) = 6}}', { size: 36, fill: RED });
  const x2a = cross(b2, 18, RED); tr(x2a, 1130, 458);
  const x2b = cross(b2, 18, RED); tr(x2b, 1130, 556);
  const c2l = mkText(b2, BX, 640, 'left to right? all under the root? **No.**', { size: 28, anchor: 'middle', fill: MUTE, boldFill: RED });
  // B3: question 2, D and M share one ticket
  const b3 = G(bd);
  const q2m = mkMath(b3, BX, 384, '12 ÷ 3 * 2', { size: 58, fill: INK, anchor: 'middle' });
  const l2r = G(b3);
  { const x1 = BX - q2m.w / 2, x2 = BX + q2m.w / 2; const a = arrow(l2r, x1, 414, x2 + 10, 414, { color: '#2E6FD8', width: 6 });
    mkText(l2r, BX, 452, '**left to right**', { size: 30, anchor: 'middle', fill: '#2E6FD8' }); }
  const W3 = mkWorking(b3, 820, 488, ['12 ÷ 3 = 4', '4 * 2 = 8'], { size: 46, fill: INK, gap: 26 });
  // B4: question 3, the working ticket by ticket
  const b4 = G(bd);
  const q3m = mkMath(b4, BX, 378, '20 - 3 * (5 - 7)^2', { size: 50, fill: INK, anchor: 'middle' });
  const W4 = mkWorking(b4, 636, 404, [
    { m: '= 20 - 3 * (-2)^2', note: '{{5 - 7 = -2}}' }, { m: '= 20 - 3 * 4', note: '{{(-2)^2 = 4}}' },
    { m: '= 20 - 12', note: '{{3 * 4 = 12}}' }, { m: '= 8', note: '{{20 - 12 = 8}}' }], { size: 40, fill: INK, gap: 18, noteX: 352, noteSize: 30, noteCol: '#2E6FD8' });
  const bg4 = ['B', 'I', 'DM', 'AS'].map((s, i) => badge(b4, s, 540, W4.lineY[i] - 14));
  // B5: the power touches only the 3
  const b5 = G(bd);
  const t1 = mkMath(b5, BX, 420, '-3^2 = -(3^2) = -9', { size: 52, fill: INK, anchor: 'middle' });
  const t2g = G(b5);
  const t2w = mkMeasure('(-3)^2 = 9', { size: 52 }), t2b = mkMeasure('(-3)', { size: 52 });
  const t2x = BX - t2w.w / 2;
  const brGlow = E('rect', { x: t2x - 8, y: 520 - 52, width: t2b.w + 16, height: 68, rx: 14, fill: 'rgba(255,228,92,0.55)', stroke: '#F2B81C', 'stroke-width': 4 }, t2g);
  mkMath(t2g, t2x, 520, '(-3)^2 = 9', { size: 52, fill: GREEN });
  const t3 = mkText(b5, BX, 618, 'the power touches **only the 3**', { size: 32, anchor: 'middle', fill: '#1E7470', boldFill: TRED });

  /* ================= the cast ================= */
  const dad = cast(Lcast, 'dad', { s: 0.8 });
  const mum = cast(Lcast, 'mum', { s: 0.8 });
  const kav = cast(Lcast, 'kavya', { s: 0.8 });
  const tan = cast(Lcast, 'tan', { s: 0.82 });
  const queen = cast(Lcast, 'queenie', { s: 0.72 });
  const lt = { queenie: ipLowerThird(Lhud, 'queenie') };
  const stOK = ipStamp(Lhud, true), stNo = ipStamp(Lhud, false);
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cuts */
  const k = id => at(id) - 0.06;
  const cB1 = k('queenie'), cA2 = k('q2'), cB2 = k('ticket'), cA3 = k('q3'), cB3 = k('work3'), cA4 = k('calc'), cB4 = k('touch'), cA5 = k('prize');
  const SPX = { dad: XD, mum: XM, kavya: XK, queenie: XQ, tan: XT };
  const cam = (kk, cx, cy) => {   // zoom kk on world point (cx, cy), clamped so the set always fills the stage
    const w = 1200 / kk, h = 750 / kk, l = clamp(cx - w / 2, 0, 1200 - w), tp = clamp(cy - h / 2, 0, 750 - h);
    ZOOM.forEach(L => L.setAttribute('transform', `scale(${kk.toFixed(4)}) translate(${(-l).toFixed(1)} ${(-tp).toFixed(1)})`));
  };
  const lookTo = (x, t) => { const w = scWho(S, t); if (!w || SPX[w] === undefined || SPX[w] === x) return null; return clamp((SPX[w] - x) / 300, -1, 1); };

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const sB = on(t, cB1, cA2) || on(t, cB2, cA3) || on(t, cB3, cA4) || on(t, cB4, cA5), sA = 1 - sB;
    const zMum = on(t, at('mum2') - 0.06, cB2), zDad = on(t, cA4, cB4);
    const who = scWho(S, t);
    booth.upd(t);
    lt.queenie.set(0); stOK.set(0); stNo.set(0);
    [c11, c1st, cQuiz, c3rd, bubMum, cMult, cCalc].forEach(c => c.set(0));
    cards.forEach(c => c.set(0));
    op(prizeC, 0); op(bigCalc, 0);
    op(Lboard, sB); op(Lfront, sA); op(Ltop, sA); op(Lscreen, sA && !zMum && !zDad ? 1 : 0);
    const show = { dad: 0, mum: 0, kav: 0, tan: 0 };

    /* ---------- A: the booth ---------- */
    if (sA) {
      // camera: push-ins on Mum (mum2) and Dad (calc), a slow push on "are"
      if (zMum) { const z = P(t, at('mum2') - 0.06, 0.25, easeOut); cam(lerp(1, 1.6, z), lerp(600, 437, z), lerp(375, 404, z)); }
      else if (zDad) cam(1.6, 300, 404);
      else if (t >= at('are') - 0.1) { const z = P(t, at('are') - 0.1, end('are') + 0.8 - at('are'), ease); cam(1 + 0.22 * z, lerp(600, 330, z), lerp(375, 400, z)); }
      else ZOOM.forEach(L => L.removeAttribute('transform'));
      show.dad = show.mum = show.kav = show.tan = 1;
      tr(dad, XD, YB, 0.8); tr(mum, XM, YB, 0.8); tr(kav, XK, YB, 0.8); tr(tan, XT, YB, 0.82); tr(queen, XQ, 392, 0.72);

      // the screen: which question
      const qi = t < cA2 ? 0 : t < cA3 ? 1 : t < cA4 ? 2 : 3;
      qLab.forEach((q, i) => op(q, i === qi ? 1 : 0));
      qMath.forEach((q, i) => op(q, i === qi && t >= mid(['q1', 'q2', 'q3'][i], 0.42) ? P(t, mid(['q1', 'q2', 'q3'][i], 0.42), 0.25, linear) : 0));
      op(qRes, t >= cA5 ? 1 : 0);
      if (t >= cA5) { qLab.forEach(q => op(q, 0)); qMath.forEach(q => op(q, 0)); }
      // the rice cooker glows while Dad dreams of it
      op(rcGlow, t < at('q1') ? 0.5 + 0.4 * Math.sin(t * 5) : (t >= at('prize') && t < mid('prize', 0.4) ? 0.6 : 0));

      // moods and looks
      let dm = 'smug', mm = 'neutral', km = 'neutral', tm = 'happy', qm = 'smug';
      let dl = lookTo(XD, t), ml = lookTo(XM, t), kl = lookTo(XK, t), tl = lookTo(XT, t), ql = lookTo(XQ, t);
      let dlift = 0, tlift = 0;
      if (t < at('q1')) { dlift = t > mid('team', 0.5) ? 1 : 0; dl = 0.2; ml = -0.8; kl = -0.9; mm = 'deadpan'; km = 'neutral'; ql = -0.8; tl = -0.6; }
      else if (t < at('dad')) { dl = 1; ml = 1; kl = 1; km = 'neutral'; tlift = 1; }
      else if (t < at('kav') + 0.1) { if (t >= at('mum')) { dm = 'shock'; mm = 'smug'; } }
      else if (t < cB1) { dm = 'shock'; mm = 'annoyed'; km = 'smug'; ql = -0.6; }
      else if (t < cB2) {   // q2, mum2
        if (t < at('mum2')) { dl = 1; ml = 1; kl = 1; tlift = 1; mm = 'neutral'; dm = 'neutral'; }
        else { mm = t < mid('mum2', 0.88) ? 'smug' : 'shock'; ml = 0.6; kl = -0.6; dl = 0.6; km = 'deadpan'; dm = 'deadpan'; }
      } else if (t < cA4) {   // q3
        dl = 1; ml = 1; kl = 1; tlift = 1; dm = 'smug'; mm = 'neutral';
      } else if (t < cB4) {   // calc
        dm = 'shock'; dl = 0.7; dlift = 1; mm = 'deadpan'; ml = -0.8; km = 'neutral'; kl = -0.8;
      } else {             // prize, are
        if (t < mid('prize', 0.55)) { dm = 'sad'; dl = 1; }
        else { dm = 'happy'; dl = 0.4; dlift = 1; }
        if (t >= at('are')) { dm = 'happy'; dl = 0; mm = 'deadpan'; ml = -0.9; km = 'deadpan'; kl = -0.9; }
        else { mm = 'happy'; km = 'happy'; }
        tlift = t < mid('prize', 0.6) ? 1 : 0;
      }
      dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: dl === null ? 0.3 : dl, lift: dlift });
      mum.set({ t, talk: scTalk(S, t, 'mum'), mood: mm, look: ml === null ? 0 : ml });
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl === null ? 0 : kl });
      tan.set({ t, talk: scTalk(S, t, 'tan'), mood: tm, look: tl === null ? -0.6 : tl, lift: tlift });
      queen.set({ t, talk: scTalk(S, t, 'queenie'), mood: qm, look: ql === null ? -0.5 : ql, disp: t < cA5 ? ['Q1', 'Q2', 'Q3', 'Q4'][qi] : '3rd', ticket: 0, ding: 0 });

      if (t < cB1) {
        popAt(c11, t, at('team') + 0.1, 990, 248, at('q1'));
        popAt(c1st, t, mid('team', 0.72), 870, 372, at('q1'));
        popAt(cQuiz, t, at('q1') + 0.05, 1000, 262, at('dad'));
        // the three answers slap down, one per beat
        if (t >= at('dad')) cards.forEach((c, i) => c.set(P(t, at(['dad', 'mum', 'kav'][i]) + 0.05, 0.3, linear)));
      }
      if (zMum) {
        cards.forEach(c => c.set(0));
        popAt(bubMum, t, mid('mum2', 0.18), 700, 122);
        popAt(cMult, t, at('mum2') + 0.1, 985, 150, mid('mum2', 0.8));
        stNo.set(P(t, mid('mum2', 0.86), 0.3, linear)); tr(stNo, 905, 332, 0.7);
      }
      if (zDad) {
        op(bigCalc, 1); tr(bigCalc, 945, 380, 0.66);
        const typed = t >= mid('calc', 0.25);
        bigCalc.set(t < mid('calc', 0.12) ? '0' : t < mid('calc', 0.4) ? '−3²' : '−9');
        bigCalc.press(t >= mid('calc', 0.25) && t < mid('calc', 0.4) ? 'x²' : t >= mid('calc', 0.4) && t < mid('calc', 0.5) ? '=' : '', typed ? 1 : 0);
        popAt(cCalc, t, mid('calc', 0.72), 945, 572);
      }
      if (t >= cA5) {
        // the prize: Mr Tan holds it up, then it slides over to Dad
        const g1 = P(t, at('prize') + 0.2, 0.35, pop), mv = P(t, mid('prize', 0.5), 0.7, ease);
        op(prizeC, clamp(g1 * 3));
        tr(prizeC, lerp(985, XD + 72, mv), lerp(lerp(470, 352, g1), 490, mv), Math.max(0.01, lerp(0.6, 0.5, mv) + 0.4 * g1 * (1 - mv)));
        popAt(c3rd, t, mid('prize', 0.35), 705, 236, at('are'));
      }
    }

    /* ---------- B: Queenie's board ---------- */
    if (sB) {
      ZOOM.forEach(L => L.removeAttribute('transform'));
      op(b1, 0); op(b2, 0); op(b3, 0); op(b4, 0); op(b5, 0); op(cEmpty, 0); op(cIdx, 0);
      tr(queen, 290, 440, 1.0);
      // tickets: in the queue from "bidmas" on
      let serve = -1, disp = 'HI!', tk = 0, tkt = 'B', ding = 0, qm = 'smug', ql = 0.7;
      const bidT = [0.06, 0.27, 0.58, 0.82].map(f => mid('bidmas', f));
      tks.forEach((g, i) => {
        if (t < bidT[i]) { op(g, 0); return; }
        const p = P(t, bidT[i], 0.55, ease);
        op(g, 1); tr(g, lerp(290, TX[i], p), lerp(520, TY, p) - 90 * Math.sin(Math.PI * p), lerp(0.55, 1, p), lerp(-12, 0, p));
        g.hl(0);
      });
      const ding1 = t0 => { if (t >= t0 && t < t0 + 0.9) ding = Math.max(ding, 1); };
      if (t < at('bidmas')) {
        ding1(at('queenie')); disp = 'HI!';
        op(cEmpty, P(t, mid('queenie', 0.6), 0.3, linear));
        lt.queenie.set(win(t, at('queenie') + 0.1, at('queenie') + 3.2, 0.3));
      } else if (t < at('work')) {
        bidT.forEach((b, i) => { if (t >= b - 0.2) { disp = tkWords[i]; tkt = tkWords[i]; serve = i; } ding1(b - 0.2); });
        tk = bidT.reduce((a, b) => (t >= b - 0.3 && t < b + 0.1 ? clamp((t - (b - 0.3)) / 0.25) : a), 0);
        op(cIdx, t >= mid('bidmas', 0.36) ? P(t, mid('bidmas', 0.36), 0.3, linear) : 0);
      } else if (t < at('cut')) {
        op(b1, 1); op(W1, 1); ql = 0.4;
        const rT = [0.08, 0.42, 0.72].map(f => mid('work', f));
        W1.set(0); bg1.forEach(b => op(b, 0));
        rT.forEach((r, i) => { W1.show(i, P(t, r, 0.35, linear)); op(bg1[i], P(t, r, 0.25, linear)); if (t >= r - 0.15) { serve = [1, 2, 3][i]; disp = tkWords[serve]; } ding1(r - 0.15); });
        W1.ring(2, P(t, mid('work', 0.86), 0.25, linear));
        stOK.set(P(t, mid('work', 0.9), 0.3, linear)); tr(stOK, 1040, 610, 0.5);
        if (t >= mid('work', 0.86)) qm = 'happy';
      } else if (t < cA2) {
        op(b1, 1); W1.set(3); bg1.forEach(b => op(b, 1)); op(W1, 0); bg1.forEach(b => op(b, 0));
        op(b2, 1); qm = 'annoyed'; ql = 0.5; disp = 'NO!';
        op(c2a, P(t, at('cut') + 0.05, 0.3, linear)); op(x2a, P(t, mid('cut', 0.3), 0.2, linear));
        op(c2b, P(t, mid('cut', 0.42), 0.3, linear)); op(x2b, P(t, mid('cut', 0.62), 0.2, linear));
        op(c2l, P(t, mid('cut', 0.7), 0.3, linear));
        stNo.set(P(t, mid('cut', 0.82), 0.3, linear)); tr(stNo, 1062, 382, 0.5);
      } else if (t < cA3) {   // ticket
        op(b3, 1);
        const tD = mid('ticket', 0.04), tAS = mid('ticket', 0.86);
        tks[2].hl(t >= tD && t < tAS ? 0.6 + 0.4 * Math.sin(t * 8) : 0);
        tks[3].hl(t >= tAS ? 0.6 + 0.4 * Math.sin(t * 8) : 0);
        disp = t < tAS ? 'DM' : 'AS'; tkt = disp;
        ding1(tD); ding1(tAS);
        tk = (t >= tD && t < tD + 0.6) || (t >= tAS && t < tAS + 0.6) ? 1 : 0;
        op(l2r, P(t, mid('ticket', 0.2), 0.3, linear));
        W3.set(0); W3.show(0, P(t, mid('ticket', 0.42), 0.35, linear)); W3.show(1, P(t, mid('ticket', 0.6), 0.35, linear));
        W3.ring(1, P(t, mid('ticket', 0.7), 0.25, linear));
        stOK.set(P(t, mid('ticket', 0.74), 0.3, linear)); tr(stOK, 1040, 620, 0.5);
        qm = t >= mid('ticket', 0.74) ? 'happy' : 'smug';
      } else if (t < cA4) {   // work3
        op(b4, 1); ql = 0.4;
        const rT = [0.05, 0.3, 0.55, 0.8].map(f => mid('work3', f));
        W4.set(0);
        rT.forEach((r, i) => { W4.show(i, P(t, r, 0.35, linear)); op(bg4[i], P(t, r, 0.25, linear)); if (t >= r - 0.15) { serve = i; disp = tkWords[i]; tkt = tkWords[i]; } ding1(r - 0.15); });
        tk = rT.reduce((a, r) => (t >= r - 0.3 && t < r + 0.4 ? 1 : a), 0);
        W4.ring(3, P(t, mid('work3', 0.9), 0.25, linear));
        if (t >= mid('work3', 0.9)) qm = 'happy';
      } else {                // touch
        op(b5, 1); serve = 1; disp = 'I'; tkt = 'I';
        ding1(at('touch'));
        op(t1, P(t, at('touch') + 0.05, 0.3, linear));
        op(t2g, P(t, mid('touch', 0.6), 0.3, linear));
        op(brGlow, t >= mid('touch', 0.6) ? 0.55 + 0.45 * Math.sin(t * 7) : 0);
        op(t3, P(t, mid('touch', 0.25), 0.3, linear));
        qm = t < mid('touch', 0.6) ? 'smug' : 'happy';
      }
      if (serve >= 0 && t >= at('work') && !(t >= cB2 && t < cA3)) tks.forEach((g, i) => g.hl(i === serve ? 1 : 0));
      if (t >= at('cut') && t < cA2) tks.forEach(g => g.hl(0));
      queen.set({ t, talk: scTalk(S, t, 'queenie'), mood: qm, look: who === 'kavya' ? -0.8 : ql, disp, ticket: tk, tkt, ding });
      // Kavya pops in for her own working
      if (t >= cB1 && t < cA2 ? t >= at('work') - 0.3 && t < at('cut') : t >= cB3 && t < cA4) {
        show.kav = 1;
        const t0 = t < cA2 ? at('work') - 0.3 : at('work3') - 0.3;
        tr(kav, 112, lerp(860, 664, P(t, t0, 0.35, pop)), 0.72);
        kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: who === 'kavya' ? 'happy' : 'smug', look: 0.8 });
      }
    }

    op(dad, show.dad); op(mum, show.mum); op(kav, show.kav); op(tan, show.tan);
  };
});
