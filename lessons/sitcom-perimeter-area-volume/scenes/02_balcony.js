/* Scene 2: Cut, slide, double (parallelograms and trapezia)
   Set: the balcony (avBalcony). A big white card hangs on the left (behind the parapet) for the shapes, drawn TO
   SCALE; Madam Perpendicular stands on the parapet beside it; Mum and Dad (later Mum and Ah Boy) behind the parapet
   on the right; Mr Tan pops up over the divider at g.tanSpot; Kavya in the foreground, bottom left. Word chips go on
   the sky above the humans.
   A  (day..big) Mum's parallelogram tile (1 cm = 34 px): base 9 cm, slopes 5 cm, height 4 cm. Dad: 9 x 5 = 45? ->
      Madam P cuts the triangle off along the height and slides it across -> the 9 x 4 rectangle, A = b x h = 36 cm²
      -> slope 5 cm vs height 4 cm as bars, 45 crossed "too big" -> Dad: "I like big." (his star falls off).
   B  (bed..pun) Mum's trapezium flower bed (1 m = 40 px): 3 m and 7 m, 4 m apart. A copy turns 180° about the
      middle of its slanted side and fits on: a parallelogram, base 3 + 7 = 10 m, 10 x 4 = 40 m², one bed 20 m² ->
      A = ½(a + b)h -> Ah Boy's three chips -> Mr Tan and the dustpan field scroll -> Mrs Lim's dustpan: 52 m², 5 m and
      8 m, h = ? -> the working, h = 8 m -> two parallel lines that never meet, *cricket*. */
scene('balcony', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;
  const talk = (t, who) => scTalk(S, t, who);

  /* ---------- local helpers ---------- */
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 2, color: o.color || C.ink, weight: 700 }); };
  const GOLD = '#FFE45C', INK = MK.ink, ORANGE = '#E07B00', GREEN = '#1E9E5A', RED = '#C62828', BLUE = '#2E7DD8', TEAL = '#0E8FB0';
  const CX = 310, CY = 320;                      // the card's centre on the stage
  const SKY = 800;                               // centre x of the sky chips

  /* layers */
  const Lbg = G(root), Lfg = G(root), Lhud = G(root);
  const bal = avBalcony(Lbg);
  const Lcast = G(bal.mid), cardG = G(bal.top);   // the card is propped on the parapet, in front of the plant

  /* ---------- the card ---------- */
  tr(cardG, CX, CY);
  E('rect', { x: -264, y: -204, width: 540, height: 420, rx: 18, fill: 'rgba(0,0,0,0.25)' }, cardG);
  E('rect', { x: -270, y: -210, width: 540, height: 420, rx: 18, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, cardG);

  /* ================= A: the tile (1 cm = 34 px) ================= */
  const pA = G(cardG);
  const BL = [-190, -10], BR = [116, -10], TR = [218, -146], TL = [-88, -146], F = [-88, -10];
  const tTitle = mkText(pA, -240, -168, "Mum's tile: a **parallelogram**", { size: 28, fill: INK, boldFill: TEAL });
  const keep = E('path', { d: mkPoly([F, BR, TR, TL]), fill: '#BDEBFA', stroke: INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, pA);
  const triG = G(pA);
  E('path', { d: mkPoly([BL, F, TL]), fill: '#FFD9A8', stroke: INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, triG);
  const outline = mkDash(E('path', { d: mkPoly([BL, BR, TR, TL]), fill: 'none', stroke: INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, pA));
  const slopeHi = E('line', { x1: BL[0], y1: BL[1], x2: TL[0], y2: TL[1], stroke: ORANGE, 'stroke-width': 10, 'stroke-linecap': 'round' }, pA);
  const hLine = E('line', { x1: TL[0], y1: TL[1], x2: F[0], y2: F[1], stroke: GREEN, 'stroke-width': 5, 'stroke-dasharray': '11 8' }, pA);
  const cutLine = E('line', { x1: TL[0], y1: TL[1] - 14, x2: F[0], y2: F[1] + 14, stroke: RED, 'stroke-width': 6, 'stroke-linecap': 'round' }, pA);
  const scis = G(pA);
  E('circle', { cx: -9, cy: 12, r: 8, fill: 'none', stroke: RED, 'stroke-width': 4 }, scis);
  E('circle', { cx: 9, cy: 12, r: 8, fill: 'none', stroke: RED, 'stroke-width': 4 }, scis);
  E('path', { d: 'M-5,6 L8,-20 M5,6 L-8,-20', stroke: INK, 'stroke-width': 4, 'stroke-linecap': 'round' }, scis);
  const hMark = mkAngleMark(pA, F[0], F[1], 0, 90, { r: 36, col: GREEN, width: 4 });
  const l9 = mkMath(pA, (BL[0] + BR[0]) / 2, 24, '9 cm', { size: 28, anchor: 'middle', fill: INK });
  const l5 = mkMath(pA, -146, -70, '5 cm', { size: 28, anchor: 'end', fill: ORANGE });
  const l4 = mkMath(pA, -76, -66, '4 cm', { size: 28, fill: GREEN });
  const rectHi = E('rect', { x: F[0], y: TL[1], width: BR[0] - F[0], height: F[1] - TL[1], fill: 'none', stroke: BLUE, 'stroke-width': 7, 'stroke-dasharray': '14 8' }, pA);
  const r9 = mkMath(pA, (F[0] + TR[0]) / 2, 24, '9 cm', { size: 28, anchor: 'middle', fill: BLUE });
  // the working
  const wDad = G(pA), wDadM = mkMath(wDad, -230, 72, '9 * 5 = 45 cm^2 ?', { size: 34, fill: ORANGE });
  const wDadS = strike(wDad, -238, 60, -222 + wDadM.w, RED);
  const tooBig = mkText(pA, -214 + wDadM.w, 72, '**too big**', { size: 28, fill: RED });
  const wRect1 = mkMath(pA, -230, 134, 'A = b * h = 9 * 4 =', { size: 34, fill: INK });
  const wRect2 = mkMath(pA, -230 + wRect1.w + 10, 134, '36 cm^2', { size: 34, fill: GREEN });
  const ringR = E('rect', { x: wRect2.x0 - 8, y: 134 - wRect2.a - 6, width: wRect2.w + 16, height: wRect2.a + wRect2.d + 12, rx: 8, fill: 'none', stroke: GREEN, 'stroke-width': 4 }, pA);

  /* ================= B: the flower bed (1 m = 40 px) ================= */
  const pB = G(cardG);
  const OX = -204, OY = 10;   // 1 m = 34 px
  const q = (x, y) => [OX + x, OY + y];
  const A = q(0, 0), B = q(238, 0), Cc = q(170, -136), D = q(68, -136), M = q(204, -68);
  mkText(pB, -240, -176, "Mum's flower bed: a **trapezium**", { size: 28, fill: INK, boldFill: TEAL });
  const bedFill = E('path', { d: mkPoly([A, B, Cc, D]), fill: '#C9F0C0' }, pB);
  const flowers = G(pB);
  [[60, -30], [120, -50], [180, -24], [230, -40], [110, -110], [160, -130], [140, -78], [90, -70], [200, -86]].forEach(([x, y], i) => {
    const f = G(flowers); tr(f, OX + x * 0.85, OY + y * 0.85);
    [0, 72, 144, 216, 288].forEach(a => E('circle', { cx: Math.cos(a * Math.PI / 180) * 7, cy: Math.sin(a * Math.PI / 180) * 7, r: 6, fill: ['#FF6B9A', '#FFC247', '#B48CFF'][i % 3] }, f));
    E('circle', { r: 5, fill: '#FFE45C', stroke: INK, 'stroke-width': 1.5 }, f);
  });
  const bedLine = mkDash(E('path', { d: mkPoly([A, B, Cc, D]), fill: 'none', stroke: INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, pB));
  // the copy, turned 180° about M (the middle of the slanted side)
  const copyG = G(pB);
  E('path', { d: mkPoly([A, B, Cc, D]), fill: '#FFE3A8', stroke: INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, copyG);
  const paraLine = E('path', { d: mkPoly([A, q(340, 0), q(408, -136), D]), fill: 'none', stroke: BLUE, 'stroke-width': 6, 'stroke-dasharray': '14 8' }, pB);
  const topHi = E('line', { x1: D[0], y1: D[1], x2: Cc[0], y2: Cc[1], stroke: ORANGE, 'stroke-width': 9, 'stroke-linecap': 'round' }, pB);
  const botHi = E('line', { x1: A[0], y1: A[1], x2: B[0], y2: B[1], stroke: TEAL, 'stroke-width': 9, 'stroke-linecap': 'round' }, pB);
  const bH = E('line', { x1: D[0], y1: D[1], x2: D[0], y2: A[1], stroke: GREEN, 'stroke-width': 4, 'stroke-dasharray': '10 7' }, pB);
  const bMark = mkAngleMark(pB, D[0], A[1], 0, 90, { r: 30, col: GREEN, width: 4 });
  const b3 = mkMath(pB, (D[0] + Cc[0]) / 2, D[1] - 12, '3 "m"', { size: 28, anchor: 'middle', fill: INK });
  const b7 = mkMath(pB, (A[0] + B[0]) / 2, A[1] + 34, '7 "m"', { size: 28, anchor: 'middle', fill: INK });
  const ba = mkMath(pB, (D[0] + Cc[0]) / 2 + 36, D[1] - 12, 'a', { size: 30, anchor: 'start', fill: ORANGE });
  const bb = mkMath(pB, (A[0] + B[0]) / 2 + 36, A[1] + 34, 'b', { size: 30, anchor: 'start', fill: TEAL });
  const b4 = mkMath(pB, D[0] + 10, -50, '4 "m"', { size: 28, fill: GREEN, halo: '#C9F0C0' });
  const bPar = mkText(pB, 236, -142, '**parallelogram**', { size: 28, anchor: 'end', fill: BLUE });
  const pWork = mkWorking(pB, -110, 70, ['3 + 7 = 10 "m"', '10 * 4 = 40 "m"^2', '40 ÷ 2 = 20 "m"^2'], { size: 30, gap: 10, fill: INK });
  const pNotes = [mkText(pB, 20, pWork.lineY[0], 'base', { size: 26, fill: '#5A6670' }), mkText(pB, 70, pWork.lineY[2], '**one bed**', { size: 26, fill: GREEN })];
  const fBig = mkMath(pB, 0, 150, 'A = 1/2 (a + b) h', { size: 52, anchor: 'middle', fill: INK });

  /* ================= B2: Mrs Lim's dustpan (1 m = 20 px) ================= */
  const pC = G(cardG);
  mkText(pC, -240, -168, "Mrs Lim's dustpan: {{A = 52 \"m\"^2}}", { size: 28, fill: INK });
  const LA = [-250, 50], LB = [-90, 50], LC = [-120, -110], LD = [-220, -110];
  E('path', { d: mkPoly([LA, LB, LC, LD]), fill: '#C9F0C0', stroke: INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, pC);
  const lL5 = mkMath(pC, (LC[0] + LD[0]) / 2, LD[1] - 12, '5 "m"', { size: 28, anchor: 'middle', fill: ORANGE });
  const lL8 = mkMath(pC, (LA[0] + LB[0]) / 2, LA[1] + 34, '8 "m"', { size: 28, anchor: 'middle', fill: TEAL });
  const lLh = G(pC);
  E('line', { x1: -170, y1: LD[1], x2: -170, y2: LA[1], stroke: GREEN, 'stroke-width': 4, 'stroke-dasharray': '10 7' }, lLh);
  mkAngleMark(lLh, -170, LA[1], 0, 90, { r: 26, col: GREEN, width: 3 }).set(1);
  mkMath(lLh, -162, -20, 'h = ?', { size: 28, fill: GREEN, halo: '#C9F0C0' });
  const lWork = mkWorking(pC, 26, -112, ['5 + 8 = 13', '52 = 1/2 * 13 * h', '52 = 6.5h', 'h = 52 ÷ 6.5 = 8 "m"'], { size: 30, gap: 16, fill: INK, ringCol: GREEN });

  /* ---------- props and chips ---------- */
  const tiles = avTiles(bal.top, { n: 4, w: 96 }); tr(tiles, 858, 508);
  const cDay = pill(Lfg, 'Day 3', { size: 32, color: GOLD, stroke: GOLD });
  const star = G(Lfg);
  const starChip = pill(star, 'BIGGEST NUMBER', { size: 26, color: GOLD, stroke: GOLD });
  const starIcon = G(star);
  E('path', { d: 'M0,-22 L6,-7 L22,-7 L9,3 L14,19 L0,9 L-14,19 L-9,3 L-22,-7 L-6,-7 Z', fill: GOLD, stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, starIcon);
  const cLost = mkChip(Lfg, 'nothing lost, nothing added', { size: 28, col: '#7CF0B0' });
  // slope vs height bars
  const bars = G(Lfg);
  E('rect', { x: -200, y: -80, width: 400, height: 160, rx: 18, fill: 'rgba(10,27,39,0.9)', stroke: C.line, 'stroke-width': 2 }, bars);
  T(bars, -178, -28, 'slope', { size: 28, weight: 700, fill: '#FFB866' });
  const barS = E('rect', { x: -80, y: -50, width: 0, height: 30, rx: 6, fill: '#FF9A3D' }, bars);
  T(bars, -178, 42, 'height', { size: 28, weight: 700, fill: '#7CF0B0' });
  const barH = E('rect', { x: -80, y: 20, width: 0, height: 30, rx: 6, fill: '#56D69B' }, bars);
  const barSl = mkMath(bars, 0, -26, '5 cm', { size: 28, fill: '#FFB866' }), barHl = mkMath(bars, 0, 44, '4 cm', { size: 28, fill: '#7CF0B0' });
  // Ah Boy's mnemonic
  const mn = ['**Add** the parallel pair', '**halve** it', '**times** the height'].map((s, i) => mkChip(Lfg, s, { size: 30, col: ['#FFB866', '#7CF0B0', '#8FD8FF'][i] }));
  // Mr Tan's scroll
  const scroll = G(Lfg);
  E('rect', { x: -214, y: -78, width: 428, height: 156, rx: 10, fill: '#F3E3C0', stroke: '#8A6A3A', 'stroke-width': 4 }, scroll);
  [-1, 1].forEach(sd => E('rect', { x: sd > 0 ? 206 : -222, y: -88, width: 16, height: 176, rx: 8, fill: '#B07A45', stroke: '#6B4423', 'stroke-width': 3 }, scroll));
  T(scroll, 46, -36, 'The Nine Chapters', { size: 28, weight: 800, anchor: 'middle', fill: '#6B2A1A' });
  T(scroll, 46, 2, 'China, ~2000 years ago', { size: 26, weight: 600, anchor: 'middle', fill: '#6B4423', font: FB });
  T(scroll, 46, 48, '"dustpan field"', { size: 28, weight: 800, anchor: 'middle', fill: '#B8336A' });
  E('path', { d: 'M-196,40 L-136,40 L-146,-20 L-186,-20 Z', fill: '#C9F0C0', stroke: '#6B4423', 'stroke-width': 3, 'stroke-linejoin': 'round' }, scroll);
  E('path', { d: 'M-166,-20 L-166,-58', stroke: '#6B4423', 'stroke-width': 5, 'stroke-linecap': 'round' }, scroll);   // a dustpan's handle
  // the pun: two parallel lines that never meet
  const punG = G(Lfg);
  const pl1 = mkDash(E('line', { x1: 692, y1: 150, x2: 1000, y2: 150, stroke: '#1E4E8C', 'stroke-width': 6, 'stroke-linecap': 'round' }, punG));
  const pl2 = mkDash(E('line', { x1: 692, y1: 196, x2: 1000, y2: 196, stroke: '#1E4E8C', 'stroke-width': 6, 'stroke-linecap': 'round' }, punG));
  const cricket = mkChip(Lfg, '*cricket*', { size: 28, col: '#B9C4CE' });

  /* ---------- the cast ---------- */
  const mum = cast(Lcast, 'mum');
  const dad = cast(Lcast, 'dad', { prop: null });
  const boy = cast(Lcast, 'boy');
  const tan = cast(Lcast, 'tan');
  const perp = cast(bal.top, 'perp');
  const kav = cast(Lfg, 'kavya');
  const lt = { tan: avLowerThird(Lhud, 'tan') };

  const cB = at('bed') - 0.06;
  const PERP = [628, 508 - 140 * 0.6, 0.6];

  return t => {
    bal.upd(t);
    const sA = t < cB;
    const who = scWho(S, t);
    lt.tan.set(0);
    [cDay, star, cLost, bars, scroll, punG, cricket].concat(mn).forEach(e => op(e, 0));
    op(pA, sA ? 1 : 0); op(pB, !sA && t < at('lim') ? 1 : 0); op(pC, t >= at('lim') ? 1 : 0);
    op(dad, sA ? 1 : 0); op(boy, sA ? 0 : 1); op(tan, 0);
    op(tiles, sA ? 1 : 0);

    // Madam Perpendicular on the parapet
    tr(perp, PERP[0], PERP[1], PERP[2]);
    let pm = 'deadpan';
    if (t >= at('dad') && t < at('cut')) pm = 'annoyed';
    else if (t >= at('rect') && t < at('longer')) pm = 'smug';
    else if (t >= at('longer') && t < at('bed')) pm = t > mid('longer', 0.6) ? 'annoyed' : 'deadpan';
    else if ((t >= at('para') && t < at('pair')) || (t >= at('back') && t < at('pun'))) pm = 'smug';
    const pChk = (t > mid('cut', 0.42) && t < mid('cut', 0.72)) || (t > mid('longer', 0.3) && t < mid('longer', 0.55)) ? 1 : 0;
    perp.set({ t, talk: talk(t, 'perp'), mood: pm, look: who === 'perp' || who === 'narr' ? -0.6 : who === 'kavya' ? -0.9 : 0.8, point: who === 'perp' ? 1 : 0, check: pChk });

    // Kavya, foreground bottom left
    tr(kav, 130, 652, 1.0);
    let km = 'neutral';
    if (t >= at('dad') && t < at('cut')) km = 'deadpan';
    else if (t >= at('rect') && t < at('longer')) km = 'happy';
    else if (t >= at('big') && t < at('bed')) km = 'deadpan';
    else if ((t >= at('para') && t < at('formula')) || (t >= at('back') && t < at('pun'))) km = t > mid('back', 0.85) || t < at('formula') ? 'smug' : 'neutral';
    else if (t >= at('pun')) km = t > mid('pun', 0.6) ? 'deadpan' : 'neutral';
    kav.set({ t, talk: talk(t, 'kavya'), mood: km, look: who === 'kavya' ? 0.3 : who === 'perp' ? 0.9 : who === 'tan' ? 1 : 0.9 });

    // Mum (both halves)
    tr(mum, 748, 444, 0.9);
    let mm = 'happy';
    if (t >= at('dad') && t < at('rect')) mm = 'deadpan';
    else if (t >= at('big') && t < at('bed')) mm = 'deadpan';
    else if (t >= at('pun') && t > mid('pun', 0.6)) mm = 'deadpan';
    mum.set({ t, talk: talk(t, 'mum'), mood: mm, look: who === 'mum' ? -0.8 : who === 'dad' ? 0.8 : who === 'tan' || who === 'boy' ? 1 : -0.9 });

    if (sA) {
      /* ================= A: the tile ================= */
      tr(dad, 968, 444, 0.9);
      let dm = 'neutral';
      if (t >= at('tile') && t < at('dad')) dm = 'happy';
      else if (t >= at('dad') && t < at('cut')) dm = 'smug';
      else if (t >= at('cut') && t < at('big')) dm = t > mid('longer', 0.6) ? 'sad' : 'shock';
      else if (t >= at('big')) dm = t > end('big') ? 'deadpan' : 'smug';
      dad.set({ t, talk: talk(t, 'dad'), mood: dm, look: who === 'mum' ? -0.8 : -1 });

      popIn(cDay, t, at('day') + 0.1, 700, 150); if (t > end('day') + 0.3) op(cDay, 0);
      // day: the tile draws
      op(tTitle, P(t, mid('day', 0.3), 0.3, linear));
      const dr = P(t, mid('day', 0.45), 1.0, ease);
      mkDraw(outline, dr); op(keep, dr); op(triG, dr);
      // tile: labels
      op(l9, P(t, mid('tile', 0.1), 0.3, linear) * (1 - P(t, mid('cut', 0.8), 0.3, linear)));
      op(l5, P(t, mid('tile', 0.4), 0.3, linear) * (1 - P(t, mid('cut', 0.8), 0.3, linear)));
      const hp = P(t, mid('tile', 0.7), 0.4, easeOut);
      op(hLine, hp * (1 - P(t, mid('cut', 0.3), 0.2, linear)) + P(t, mid('cut', 0.8), 0.3, linear) * 0); attr(hLine, 'y2', lerp(TL[1], F[1], hp));
      hMark.set(P(t, mid('tile', 0.8), 0.3, linear));
      op(l4, P(t, mid('tile', 0.85), 0.3, linear));
      // dad: 9 x 5 = 45?, the slope highlighted, biggest number
      op(wDad, P(t, mid('dad', 0.15), 0.3, linear));
      op(slopeHi, P(t, mid('dad', 0.3), 0.3, linear) * (1 - P(t, at('cut'), 0.3, linear)));
      if (t >= mid('dad', 0.65)) {
        const sp = P(t, mid('dad', 0.65), 0.45, pop);
        op(star, clamp(sp * 2.5)); tr(star, 1010, 290, Math.max(0.01, 0.6 + 0.4 * sp));
        const fall = P(t, mid('big', 0.7), 0.8, easeIn);
        tr(starIcon, 130 + 30 * fall, -24 + 460 * fall, 1, t * 40 * AMP + 200 * fall);
      }
      tr(starChip, 0, 0);
      // cut: the red cut along the height, the triangle lifts and slides across
      const cp = P(t, mid('cut', 0.28), 0.4, easeOut);
      op(cutLine, cp * (1 - P(t, at('rect'), 0.3, linear))); attr(cutLine, 'y2', lerp(TL[1] - 14, F[1] + 14, cp));
      const scP = P(t, mid('cut', 0.28), 0.5, linear);
      op(scis, t > mid('cut', 0.28) && t < mid('cut', 0.8) ? 1 : 0); tr(scis, F[0], lerp(TL[1] - 20, F[1], scP), 1, Math.sin(t * 18) * 12);
      const lift = P(t, mid('cut', 0.6), 0.3, easeOut), slide = P(t, mid('cut', 0.78), at('rect') + 0.4 - mid('cut', 0.78), ease);
      tr(triG, 306 * slide, -14 * lift * (1 - slide));
      op(outline, 1 - P(t, mid('cut', 0.3), 0.3, linear));
      // rect: the rectangle, A = b x h = 36 cm²
      op(rectHi, P(t, mid('rect', 0.12), 0.3, linear) * (1 - P(t, at('longer'), 0.3, linear)));
      op(r9, P(t, mid('rect', 0.4), 0.3, linear));
      op(wRect1, P(t, mid('rect', 0.3), 0.3, linear)); op(wRect2, P(t, mid('rect', 0.62), 0.3, linear));
      op(ringR, P(t, mid('rect', 0.75), 0.25, linear));
      if (t >= mid('rect', 0.82) && t < at('longer')) popIn(cLost, t, mid('rect', 0.82), SKY, 170);
      // longer: bars, 45 crossed: too big
      if (t >= at('longer')) {
        popIn(bars, t, at('longer') + 0.1, SKY, 178);
        const g1 = P(t, mid('longer', 0.2), 0.5, easeOut), g2 = P(t, mid('longer', 0.35), 0.5, easeOut);
        attr(barS, 'width', 170 * g1); attr(barH, 'width', 136 * g2);
        tr(barSl, -80 + 170 * g1 + 12, 0); tr(barHl, -80 + 136 * g2 + 12, 0);
        op(barSl, g1); op(barHl, g2);
      }
      wDadS.set(P(t, mid('longer', 0.7), 0.3, linear));
      op(tooBig, P(t, mid('longer', 0.82), 0.3, linear));
    } else {
      /* ================= B: the flower bed ================= */
      tr(boy, 952, 452, 0.9);
      let bm = 'happy';
      if (t >= at('pun') && t > mid('pun', 0.6)) bm = 'deadpan';
      boy.set({ t, talk: talk(t, 'boy'), mood: bm, look: who === 'tan' ? 1 : who === 'mum' ? -0.8 : -1, lift: t >= at('pair') && t < end('pair') ? 1 : 0 });
      // Mr Tan over the divider
      if (t >= at('tan') - 0.35) {
        op(tan, 1);
        const up = P(t, at('tan') - 0.35, 0.45, pop);
        tr(tan, bal.tanSpot[0], lerp(640, bal.tanSpot[1], up), 0.9);
        let tm = 'neutral';
        if (t < mid('tan', 0.3)) tm = 'annoyed'; else if (t < at('lim')) tm = 'happy';
        if (t >= at('pun')) tm = 'happy';
        tan.set({ t, talk: talk(t, 'tan'), mood: tm, look: -1, lift: t >= at('pun') ? 1 : 0 });
        tr(lt.tan, 330, 600); lt.tan.set(win(t, at('tan') + 0.1, at('tan') + 3.2, 0.3));
      }
      // bed: the trapezium
      const dr = P(t, mid('bed', 0.12), 0.9, ease);
      mkDraw(bedLine, dr); op(bedFill, dr); op(flowers, P(t, mid('bed', 0.25), 0.4, linear));
      op(b3, P(t, mid('bed', 0.45), 0.3, linear)); op(b7, P(t, mid('bed', 0.58), 0.3, linear));
      const hp = P(t, mid('bed', 0.75), 0.4, easeOut);
      op(bH, hp); attr(bH, 'y2', lerp(D[1], A[1], hp)); bMark.set(P(t, mid('bed', 0.85), 0.3, linear));
      op(b4, P(t, mid('bed', 0.88), 0.3, linear));
      // para: the copy turns 180° about M and fits on
      const ca = P(t, at('para') + 0.05, 0.25, linear), rot = P(t, mid('para', 0.08), mid('para', 0.32) - mid('para', 0.08), ease);
      op(copyG, ca * (t > mid('para', 0.86) ? 0.55 : 1));
      copyG.setAttribute('transform', `rotate(${(180 * rot).toFixed(2)} ${M[0]} ${M[1]})`);
      op(paraLine, P(t, mid('para', 0.34), 0.3, linear) * (1 - P(t, at('formula'), 0.3, linear)));
      op(bPar, P(t, mid('para', 0.34), 0.3, linear) * (1 - P(t, at('formula'), 0.3, linear)));
      const wOff = 1 - P(t, at('formula'), 0.25, linear);
      [0.45, 0.65, 0.85].forEach((f, i) => pWork.show(i, P(t, mid('para', f), 0.3, linear)));
      op(pWork, wOff); pNotes.forEach((n, i) => op(n, P(t, mid('para', i ? 0.88 : 0.5), 0.3, linear) * wOff));
      // formula: A = ½(a + b)h; a and b on the shape
      op(fBig, P(t, mid('formula', 0.08), 0.3, linear));
      const ab = P(t, mid('formula', 0.55), 0.3, linear);
      op(topHi, ab); op(botHi, ab); op(ba, ab); op(bb, ab);
      // pair: the three chips
      if (t >= at('pair') && t < at('tan') + 0.3) [0.08, 0.42, 0.72].forEach((f, i) => popIn(mn[i], t, mid('pair', f), SKY, 150 + i * 64));
      // tan: the scroll
      if (t >= mid('tan', 0.45) && t < at('lim')) popIn(scroll, t, mid('tan', 0.45), SKY + 14, 200);
      // lim, back: Mrs Lim's dustpan
      const lp = P(t, at('lim') + 0.05, 0.3, linear);
      op(pC, lp);
      op(lL5, P(t, mid('lim', 0.4), 0.3, linear)); op(lL8, P(t, mid('lim', 0.55), 0.3, linear)); op(lLh, P(t, mid('lim', 0.8), 0.3, linear));
      [0.04, 0.18, 0.45, 0.72].forEach((f, i) => lWork.show(i, P(t, mid('back', f), 0.3, linear)));
      lWork.ring(3, P(t, mid('back', 0.9), 0.25, linear));
      // pun: the parallel lines, *cricket*
      if (t >= at('pun')) {
        op(punG, 1);
        mkDraw(pl1, P(t, mid('pun', 0.1), 1.6, easeOut)); mkDraw(pl2, P(t, mid('pun', 0.1), 1.6, easeOut));
        if (t > end('pun') + 0.2) popIn(cricket, t, end('pun') + 0.2, SKY, 262);
      }
    }
  };
});
