/* Scene 1: Auntie Rose's freezer (adding and subtracting negative numbers).
   Shots (hard sitcom cuts):
   A  9 a.m., the void deck on Family Day, a push in on the ICE CREAM booth.
   B  the booth: Auntie Rose behind her freezer, Kavya and Ah Boy, Dash on the table, a big thermometer panel on
      the pillar (left) and the working board (right). The freezer warms from −18 °C to −5 °C; change = final − start;
      −5 − (−18) = −5 + 18 = 13 (the +13 brace on the thermometer); Ah Boy's "two negatives make a positive" BZZT;
      the difference between a Singapore afternoon and the freezer, 33 − (−18) = 51.
   C  close-up of the whiteboard (Kavya and Ah Boy watching from below): the pattern 5 − 3, 5 − 2 ... 5 − (−2);
      Dash rides the number line: −4 + (−6) = −10 (6 left); −7 + 4 − (−5): −7 → −3 → 2 (showpiece). */
scene('freezer', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const view = (el, k, fx, fy, sx, sy) => el.setAttribute('transform', `translate(${sx.toFixed(1)} ${sy.toFixed(1)}) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const fade = (el, t, t0, t1) => op(el, t1 === undefined ? P(t, t0, 0.3, linear) : Math.min(P(t, t0, 0.3, linear), 1 - P(t, t1, 0.2, linear)));
  const popAt = (c, t, t0, x, y, t1) => { c.set(t >= t0 && (t1 === undefined || t < t1) ? P(t, t0, 0.35, linear) : 0); tr(c, x, y); };
  const GOLD = '#FFE45C', RED = '#D32F2F', GREEN = '#1E9E5A', BLUE = '#2E6FD8', ICE = '#9FD8FF', INK = MK.ink;

  /* a thermometer drawn for this scene (labels on the LEFT, so marks and braces fit on the right).
     Bulb at (0,0); Y(v) is the height of v °C; g.set(v) sets the column and the readout */
  function thermo(parent) {
    const g = G(parent), k = 5.2, Y = v => -48 - (v + 20) * k;
    E('rect', { x: -14, y: Y(40) - 14, width: 28, height: -Y(40) + 14, rx: 14, fill: '#E9F2F7', stroke: '#8FB0C2', 'stroke-width': 3 }, g);
    E('circle', { r: 26, fill: '#E8424F', stroke: '#8FB0C2', 'stroke-width': 3 }, g);
    const colm = E('rect', { x: -7, y: 0, width: 14, height: 0, rx: 7, fill: '#E8424F' }, g);
    let d = '';
    for (let v = -20; v <= 40; v += 2) { const y = Y(v).toFixed(1); d += `M-16,${y} L${v % 10 === 0 ? -32 : -24},${y} `; }
    E('path', { d, stroke: C.ink, 'stroke-width': 3 }, g);
    for (let v = -20; v <= 40; v += 10) T(g, -40, Y(v) + 9, mkFmt(v), { size: 26, weight: 700, anchor: 'end', fill: v < 0 ? ICE : C.ink });
    E('line', { x1: -16, y1: Y(0), x2: 16, y2: Y(0), stroke: ICE, 'stroke-width': 2.5, 'stroke-dasharray': '5 4' }, g);
    const rd = T(g, 0, Y(40) - 30, '', { size: 30, weight: 800, anchor: 'middle', fill: GOLD });
    g.Y = Y;
    g.set = v => { const y = Y(v); attr(colm, 'y', y); attr(colm, 'height', -y + 4); const s = mkFmt(Math.round(v)) + ' °C'; if (rd.textContent !== s) setText(rd, s); };
    g.set(-18);
    return g;
  }
  /* a mark across the thermometer tube, its value to the right */
  const tMark = (parent, Y, v, col, src) => { const g = G(parent); E('line', { x1: -18, y1: Y(v), x2: 26, y2: Y(v), stroke: col, 'stroke-width': 5, 'stroke-linecap': 'round' }, g); mkMath(g, 60, Y(v) + 10, src || String(v), { size: 28, fill: col, weight: 700 }); return g; };

  /* layers */
  const Lbg = G(root), Lboard = G(root), Lcast = G(root), Lfront = G(root), Ltop = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= A: the void deck ================= */
  const deckShot = G(Lbg), deckWrap = G(deckShot);
  const deck = ipVoidDeck(deckWrap);
  const cSat = mkChip(Lfg, '**Saturday, 9 a.m.**', { size: 34, col: GOLD });
  const cRC = mkChip(Lfg, 'the **RC Family Day**', { size: 30, col: ICE });

  /* ================= B: the booth ================= */
  const boothShot = G(Lbg);
  const booth = ipBooth(boothShot, { title: "AUNTIE ROSE'S ICE CREAM", col: '#2E7DD8', cloth: '#7FD0F5' });
  const frontWrap = G(Lfront); frontWrap.appendChild(booth.front); frontWrap.appendChild(booth.top);
  const freezer = ipFreezer(Ltop); tr(freezer, 385, 530, 0.75);

  // the thermometer panel, on the left pillar
  const panel = G(Lfg);
  E('rect', { x: 24, y: 132, width: 238, height: 466, rx: 18, fill: 'rgba(10,27,39,0.94)', stroke: '#4CC9F0', 'stroke-width': 4 }, panel);
  const TH = G(panel); tr(TH, 140, 562);
  const hlBand = E('rect', { x: -12, y: 0, width: 24, height: 0, rx: 10, fill: GOLD, opacity: 0.85 }, TH);
  const th = thermo(TH); const Y = th.Y;
  TH.insertBefore(hlBand, null);   // in front of the tube, behind the marks
  const mk18 = tMark(TH, Y, -18, ICE, '-18'), mk5 = tMark(TH, Y, -5, '#FF8A8A', '-5');
  const br13 = mkBrace(TH, 30, Y(-5), 30, Y(-18), { text: '{{+13}}', col: GOLD, size: 28, depth: 18 });
  const br51 = mkBrace(TH, 30, Y(33), 30, Y(-18), { text: '{{51}}', col: GOLD, size: 30, depth: 22 });
  // the diff beat's marks (the 51 brace sits between them)
  const mk33d = tMark(TH, Y, 33, '#FFC247', '33'), mk18d = tMark(TH, Y, -18, ICE, '-18');
  [mk33d, mk18d].forEach(m => tr(m.lastChild, 6, 0));

  // the board (right), its bottom hidden by the table
  const board = G(Lboard);
  E('rect', { x: 765, y: 190, width: 415, height: 360, rx: 14, fill: MK.board, stroke: '#8FA3B8', 'stroke-width': 5 }, board);
  E('rect', { x: 765, y: 190, width: 415, height: 14, rx: 7, fill: '#C9D3DC' }, board);
  const BX = 972;
  // rose: −18 °C -> −5 °C
  const bRose = G(board);
  mkText(bRose, BX, 246, "**Rose's freezer**", { size: 32, anchor: 'middle', fill: '#5A6670' });
  const bR18 = G(bRose); mkText(bR18, BX + 40, 470, '{{-18}} °C', { size: 50, anchor: 'middle', fill: BLUE }); T(bR18, 800, 466, 'must be', { size: 26, weight: 700, fill: '#5A6670', font: FB });
  const bR5 = G(bRose); mkText(bR5, BX + 40, 330, '{{-5}} °C', { size: 50, anchor: 'middle', fill: RED }); T(bR5, 800, 326, 'now', { size: 26, weight: 700, fill: '#5A6670', font: FB });
  const bRup = arrow(bRose, BX + 40, 420, BX + 40, 352, { color: '#C27C0E', width: 6, head: 18 });
  const bRupT = T(bRose, BX + 70, 398, 'warmer', { size: 26, weight: 700, fill: '#C27C0E' });
  // warmer: change = final − start
  const bWarm = G(board);
  const bW1 = mkText(bWarm, BX, 256, '**up** = warmer: {{-5 > -18}}', { size: 32, anchor: 'middle', fill: INK });
  const bW2 = mkChip(bWarm, 'change = **final − start**', { size: 30, col: '#2E7DD8', fill: '#E3F1FF' }); tr(bW2, BX, 336);
  const bW3 = G(bWarm); mkMath(bW3, BX + 50, 450, '-5 - (-18) =', { size: 44, fill: INK, anchor: 'end' }); mkMath(bW3, BX + 66, 450, '?', { size: 44, fill: RED });
  // rule: a − (−b) = a + b
  const bRule = G(board);
  const bRu1 = mkChip(bRule, '{{a - (-b) = a + b}}', { size: 32, col: '#C27C0E', fill: '#FFF6D6' }); tr(bRu1, BX, 244);
  const bRuW = mkWorking(bRule, 1000, 296, ['-5 - (-18)', '= -5 + 18', { m: '= 13', col: GREEN }], { size: 36, fill: INK, gap: 16 });
  // two: Ah Boy's rule
  const bTwo = G(board);
  const bT1 = mkMath(bTwo, BX, 400, '-4 + (-6) = 10', { size: 46, fill: RED, anchor: 'middle' });
  const bubTwo = mkSpeechBubble(Lfg, 'Two negatives make\na **positive**!', { size: 28, tail: 'left' });
  // diff: Singapore afternoon vs the freezer
  const bDiff = G(board);
  const sunB = G(bDiff); tr(sunB, 812, 240);
  E('circle', { r: 16, fill: '#FFC247', stroke: '#C27C0E', 'stroke-width': 3 }, sunB);
  let rays = ''; for (let i = 0; i < 8; i++) { const a = i * TAU / 8; rays += `M${(Math.cos(a) * 21).toFixed(1)},${(Math.sin(a) * 21).toFixed(1)} L${(Math.cos(a) * 29).toFixed(1)},${(Math.sin(a) * 29).toFixed(1)} `; }
  E('path', { d: rays, stroke: '#C27C0E', 'stroke-width': 4, 'stroke-linecap': 'round' }, sunB);
  const bD1 = G(bDiff); bD1.appendChild(sunB); mkText(bD1, 850, 250, 'Singapore, 3 p.m.: {{33}} °C', { size: 28, fill: INK });
  const bD2 = mkText(bDiff, 850, 306, 'freezer: {{-18}} °C', { size: 28, fill: INK });
  const flake = G(bDiff); tr(flake, 812, 296);
  E('path', { d: 'M0,-18 L0,18 M-16,-9 L16,9 M-16,9 L16,-9', stroke: BLUE, 'stroke-width': 4, 'stroke-linecap': 'round' }, flake);
  bD2.appendChild(flake);
  const bD3 = mkText(bDiff, BX, 368, 'difference = **higher − lower**', { size: 28, anchor: 'middle', fill: '#5A6670', boldFill: INK });
  const bD4 = G(bDiff); const d4 = mkText(bD4, BX, 448, '{{33 - (-18) = 51}} °C', { size: 38, anchor: 'middle', fill: GREEN });
  E('rect', { x: BX - d4.w / 2 - 14, y: 448 - 44, width: d4.w + 28, height: 60, rx: 10, fill: 'none', stroke: GREEN, 'stroke-width': 4 }, bD4);

  /* ================= C: the whiteboard close-up ================= */
  const wbShot = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#F4EEE2', '#E2D6BE', true) }, wbShot);
  E('rect', { x: 46, y: 98, width: 1108, height: 424, rx: 16, fill: '#C9D3DC', stroke: '#7D8C99', 'stroke-width': 3 }, wbShot);
  E('rect', { x: 60, y: 112, width: 1080, height: 396, rx: 8, fill: MK.board }, wbShot);
  E('path', { d: 'M700,112 L860,112 L700,508 L540,508 Z', fill: '#FFFFFF', opacity: 0.5 }, wbShot);
  E('rect', { x: 300, y: 508, width: 600, height: 16, rx: 6, fill: '#AEB9C3', stroke: '#7D8C99', 'stroke-width': 2 }, wbShot);
  const wb = G(Lboard);
  // the pattern: 5 − 3 = 2 ... 5 − (−2) = 7, in columns
  const pat = G(wb);
  const PR = [['3', '2'], ['2', '3'], ['1', '4'], ['0', '5'], ['(-1)', '6'], ['(-2)', '7']];
  const pRows = PR.map(([b, a], i) => {
    const g = G(pat), y = 214 + i * 49, col = i >= 4 ? GREEN : INK;
    mkMath(g, 500, y, '5 -', { size: 40, fill: col, anchor: 'end' });
    mkMath(g, 562, y, b, { size: 40, fill: col, anchor: 'middle' });
    mkMath(g, 642, y, '=', { size: 40, fill: col, anchor: 'middle' });
    mkMath(g, 712, y, a, { size: 40, fill: col, anchor: 'middle' });
    return g;
  });
  const pArrL = arrow(pat, 422, 196, 422, 452, { color: '#C27C0E', width: 5, head: 16 });
  const pTxtL = mkText(pat, 400, 312, 'take away\n**1 less**', { size: 30, anchor: 'end', fill: '#C27C0E' });
  const pArrR = arrow(pat, 790, 196, 790, 452, { color: GREEN, width: 5, head: 16 });
  const pTxtR = mkText(pat, 812, 312, 'answer\n**1 more**', { size: 30, fill: GREEN });
  const pBand = E('rect', { x: 444, y: 214 + 4 * 49 - 38, width: 300, height: 98, rx: 12, fill: 'rgba(86,214,155,0.22)' }, pat);
  pat.insertBefore(pBand, pat.firstChild);
  // −4 + (−6) = −10
  const lft = G(wb);
  const lEq = mkMath(lft, 600, 184, '-4 + (-6) = -10', { size: 52, fill: GREEN, anchor: 'middle' });
  const lChip = mkChip(lft, '"two negatives make a positive" is for **× and ÷** only', { size: 28, col: RED, fill: '#FFF0F0' }); tr(lChip, 600, 250);
  const NL1 = mkNumberLine(lft, { from: -12, to: 2, len: 840, size: 28, ink: INK,
    marks: [{ v: -4, col: '#FFC247' }, { v: -10, col: '#56D69B' }],
    hops: [{ a: -4, b: -10, height: 90, col: RED, label: '{{+ (-6)}}: **6 left**', size: 30 }] });
  tr(NL1, 180, 410);
  // −7 + 4 − (−5) = 2
  const chn = G(wb);
  const cEqL = mkMath(chn, 690, 184, '-7 + 4 - (-5)', { size: 52, fill: INK, anchor: 'end' });
  const cEqR = mkMath(chn, 706, 184, '= 2', { size: 52, fill: GREEN });
  const NL2 = mkNumberLine(chn, { from: -8, to: 4, len: 840, size: 28, ink: INK,
    marks: [{ v: -7, col: '#FFC247' }, { v: -3, col: '#4CC9F0' }, { v: 2, col: '#56D69B' }],
    hops: [{ a: -7, b: -3, height: 90, col: BLUE, label: '{{+4}}: **4 right**', size: 30 }, { a: -3, b: 2, height: 90, col: GREEN, label: '{{-(-5) = +5}}: **5 right**', size: 30 }] });
  tr(NL2, 180, 410);

  /* ================= the cast ================= */
  const rose = cast(Lcast, 'rose', { s: 0.85 });
  const kav = cast(Lcast, 'kavya', { s: 0.85 });
  const boy = cast(Lcast, 'boy', { s: 0.82 });
  const dash = cast(Ltop, 'dash', { s: 0.42 });
  const ltRose = ipLowerThird(Lhud, 'rose');
  const stampOK = ipStamp(Lhud, true), stampNo = ipStamp(Lhud, false);
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cut points */
  const cB = mid('nine', 0.62), cC = at('pattern') - 0.06, cB2 = at('rule') - 0.06, cC2 = at('left') - 0.06, cB3 = at('diff') - 0.06;
  const XR = 385, YR = 375, XK = 560, YK = 432, XB = 700, YB = 442, XD = 636, YD = 530 - 82 * 0.42;
  /* where Dash stands on a hop arc: u 0..1 from a to b (number line nl at x0, y 410) */
  const hopPos = (nl, a, b, h, u) => { const x = 180 + lerp(nl.x(a), nl.x(b), u), c = -h * 4 / 3; return [x, 410 + 3 * u * (1 - u) * c * 0.98]; };
  const DS = 0.42, DFOOT = 82 * DS;

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const sA = on(t, -1, cB), sB = on(t, cB, cC) || on(t, cB2, cC2) || on(t, cB3, 1e9), sC = on(t, cC, cB2) || on(t, cC2, cB3);
    op(deckShot, sA); op(boothShot, sB); op(frontWrap, sB); op(freezer, sB); op(panel, 0); op(board, sB);
    op(wbShot, sC); op(wb, sC);
    if (sB) booth.upd(t);
    cSat.set(0); cRC.set(0); ltRose.set(0); stampOK.set(0); stampNo.set(0); bubTwo.set(0);
    [bRose, bWarm, bRule, bTwo, bDiff, pat, lft, chn].forEach(g => op(g, 0));
    const show = { rose: 0, kav: 0, boy: 0, dash: 0 };

    /* ---------- A: the void deck, push in on the ICE CREAM booth ---------- */
    if (sA) {
      deck.upd(t);
      const z = P(t, 0, cB, ease);
      const k = 1 + 0.45 * z, hw = 600 / k, hh = 375 / k;
      view(deckWrap, k, clamp(lerp(600, 300, z), hw, 1200 - hw), clamp(lerp(375, 460, z), hh, 750 - hh), 600, 375);
      popAt(cSat, t, at('nine') + 0.1, 600, 590);
      popAt(cRC, t, mid('nine', 0.3), 600, 650);
    }

    /* ---------- B: the booth ---------- */
    if (sB) {
      show.rose = 1; show.kav = 1; show.boy = 1; show.dash = 1;
      tr(rose, XR, YR, 0.85); tr(kav, XK, YK, 0.85); tr(boy, XB, YB, 0.82); tr(dash, XD, YD, DS);
      const inRose = t < at('warmer'), inDiff = t >= cB3;
      // the lid: open (Ah Boy left it open) until Rose shuts it; Ah Boy opens it again in diff
      let lid = 0;
      if (t < at('warmer')) lid = 1 - P(t, mid('rose', 0.88), 0.3, ease);
      if (inDiff) lid = P(t, at('diff') + 0.1, 0.3, ease) * (1 - P(t, mid('diff', 0.84), 0.25, easeIn));
      let tv = -18;
      if (inRose) tv = lerp(-18, -5, P(t, mid('rose', 0.6), 0.9, ease));
      else if (t < cC) tv = -5;
      else if (!inDiff) tv = -5;
      freezer.set({ t, lid, temp: mkFmt(inDiff ? -18 : Math.round(tv)) + ' °C' });
      // thermometer panel
      op(panel, inRose ? P(t, at('rose') + 0.1, 0.3, linear) : 1);
      th.set(inDiff ? -18 : tv);
      [mk18, mk5, mk33d, mk18d, br13, br51].forEach(e => op(e, 0));
      attr(hlBand, 'height', 0);
      if (!inDiff) {
        fade(mk18, t, at('rose') + 0.2);
        if (t >= mid('rose', 0.75)) fade(mk5, t, mid('rose', 0.75));
        if (t >= at('warmer')) {
          const hp = P(t, mid('warmer', 0.15), 0.7, ease);
          const y1 = Y(-18), y0 = lerp(y1, Y(-5), hp);
          attr(hlBand, 'y', y0); attr(hlBand, 'height', Math.max(0, y1 - y0));
          op(hlBand, t >= cB2 ? 0.55 : 0.85);
        }
        if (t >= cB2) op(br13, P(t, mid('rule', 0.55), 0.3, linear));
      } else {
        fade(mk18d, t, at('diff') + 0.1);
        fade(mk33d, t, mid('diff', 0.12));
        op(br51, P(t, mid('diff', 0.5), 0.35, linear));
      }

      // Auntie Rose
      let rm = 'happy', rl = 0.5;
      if (inRose) { rm = t < mid('rose', 0.25) ? 'happy' : 'shock'; if (t > mid('rose', 0.6)) rm = 'annoyed'; rl = t < mid('rose', 0.45) ? 0.6 : -0.9; }
      else if (t < cC) { rm = 'neutral'; rl = 0.9; }
      else if (t >= cB2 && t < at('two')) { rm = 'happy'; rl = 0.9; }
      else if (t >= at('two') && !inDiff) { rm = t > mid('two', 0.8) ? 'deadpan' : 'neutral'; rl = 0.9; }
      else if (inDiff) { rm = t < mid('diff', 0.8) ? 'smug' : 'annoyed'; rl = t < mid('diff', 0.7) ? -0.9 : 0.9; }
      rose.set({ t, talk: scTalk(S, t, 'rose'), mood: rm, look: rl });
      if (inRose) ltRose.set(win(t, at('rose') + 0.05, at('rose') + 3.2, 0.3));

      // Kavya
      let km = 'neutral', kl = -0.6;
      if (t < at('rose')) { km = 'happy'; kl = -0.6; }
      else if (inRose) { km = 'shock'; kl = -0.8; }
      else if (t < cC) { km = 'sad'; kl = t < mid('warmer', 0.5) ? 0.4 : 0.9; }
      else if (t >= cB2 && t < at('two')) { km = t > mid('rule', 0.7) ? 'happy' : 'neutral'; kl = 0.9; }
      else if (t >= at('two') && !inDiff) { km = t > mid('two', 0.8) ? 'deadpan' : 'neutral'; kl = 0.6; }
      else if (inDiff) { km = 'happy'; kl = -0.8; }
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });

      // Ah Boy
      let bm = 'happy', bl = -0.8, bLift = 0;
      if (inRose) { bm = 'happy'; bl = -0.9; }
      else if (t >= at('two') && !inDiff) { bm = 'happy'; bl = 0.8; bLift = t < end('two') ? 1 : 0; }
      else if (inDiff) { bm = t > mid('diff', 0.84) ? 'shock' : 'happy'; bl = -0.9; bLift = t < mid('diff', 0.84) ? 1 : 0; }
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: bm, look: bl, lift: bLift });

      // Dash on the table
      let dm = 'sad', dl = -0.6, arms = 0;
      if (t >= at('warmer') && t < cC) { dm = 'neutral'; dl = -1; arms = t > mid('warmer', 0.1) && t < mid('warmer', 0.6) ? 0.9 : 0.3; }
      else if (t >= cB2 && t < at('two')) { dm = t > mid('rule', 0.8) ? 'smug' : 'neutral'; dl = -1; arms = t > mid('rule', 0.55) ? 0.5 : 0; }
      else if (t >= at('two') && !inDiff) { dm = t > mid('two', 0.7) ? 'deadpan' : 'sad'; dl = 0.8; }
      else if (inDiff) { dm = 'sad'; dl = -0.9; }
      dash.set({ t, talk: scTalk(S, t, 'dash'), mood: dm, look: dl, arms });

      // the board
      if (inRose) {
        op(bRose, P(t, at('rose') + 0.1, 0.3, linear));
        op(bR18, P(t, at('rose') + 0.3, 0.3, linear));
        op(bR5, P(t, mid('rose', 0.78), 0.3, linear));
        bRup.set(P(t, mid('rose', 0.6), 0.5, linear)); op(bRupT, P(t, mid('rose', 0.7), 0.3, linear));
      } else if (t < cC) {
        op(bWarm, 1);
        fade(bW1, t, mid('warmer', 0.05));
        bW2.set(P(t, mid('warmer', 0.38), 0.35, linear));
        fade(bW3, t, mid('warmer', 0.66));
      } else if (t < at('two')) {
        op(bRule, 1);
        bRu1.set(P(t, at('rule') + 0.05, 0.35, linear));
        bRuW.show(0, P(t, mid('rule', 0.3), 0.3, linear)); bRuW.show(1, P(t, mid('rule', 0.45), 0.3, linear)); bRuW.show(2, P(t, mid('rule', 0.6), 0.3, linear));
        bRuW.ring(2, P(t, mid('rule', 0.68), 0.3, linear));
        if (t >= mid('rule', 0.76)) { stampOK.set(P(t, mid('rule', 0.76), 0.35, linear)); tr(stampOK, 1000, 625, 0.55); }
      } else if (!inDiff) {
        op(bTwo, 1);
        fade(bT1, t, mid('two', 0.45));
        popAt(bubTwo, t, mid('two', 0.12), 960, 268);
        if (t >= mid('two', 0.82)) { stampNo.set(P(t, mid('two', 0.82), 0.35, linear)); tr(stampNo, 990, 625, 0.6); }
      } else {
        op(bDiff, 1);
        fade(bD1, t, mid('diff', 0.04)); fade(bD2, t, mid('diff', 0.2)); fade(bD3, t, mid('diff', 0.32)); fade(bD4, t, mid('diff', 0.42));
      }
    }

    /* ---------- C: the whiteboard close-up ---------- */
    if (sC) {
      show.kav = 1; show.boy = 1; show.dash = 1;
      tr(kav, 150, 662, 0.9); tr(boy, 330, 670, 0.85);
      const inPat = t < cB2;
      if (inPat) {
        op(pat, 1);
        pRows.forEach((r, i) => {
          const t0 = i < 4 ? mid('pattern', 0.1 + i * 0.17) : mid('up', 0.05 + (i - 4) * 0.33);
          const p = P(t, t0, 0.3, easeOut); op(r, p); tr(r, -16 * (1 - p), 0);
        });
        pArrL.set(P(t, mid('pattern', 0.72), 0.5, linear)); op(pTxtL, P(t, mid('pattern', 0.78), 0.3, linear));
        pArrR.set(P(t, mid('pattern', 0.72), 0.5, linear)); op(pTxtR, P(t, mid('pattern', 0.78), 0.3, linear));
        op(pBand, P(t, mid('up', 0.7), 0.3, linear));
        tr(dash, 1010, 508 - 82 * 0.55, 0.55);
        dash.set({ t, talk: scTalk(S, t, 'dash'), mood: t >= at('up') ? 'smug' : 'neutral', look: -0.9, arms: t < at('up') && t > mid('pattern', 0.75) ? 0.5 : 0 });
        kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: t >= at('up') ? 'happy' : 'neutral', look: 0.6 });
        boy.set({ t, talk: scTalk(S, t, 'boy'), mood: 'happy', look: 0.6 });
      } else if (t < at('chain')) {
        op(lft, 1);
        fade(lChip, t, at('left') + 0.1);
        NL1.mark(0, P(t, mid('left', 0.25), 0.3, linear));
        const hp = P(t, mid('left', 0.38), 1.4, ease);
        NL1.hop(0, hp); NL1.mark(1, P(t, mid('left', 0.38) + 1.35, 0.3, linear));
        fade(lEq, t, mid('left', 0.58));
        const [x, y] = hopPos(NL1, -4, -10, 90, hp);
        tr(dash, x, y - DFOOT * 1.1 - 4, DS * 1.1);
        dash.set({ t, talk: scTalk(S, t, 'dash'), mood: 'annoyed', look: hp > 0 && hp < 1 ? -1 : 0.3, arms: hp > 0 && hp < 1 ? 1 : 0, still: hp > 0 && hp < 1 });
        kav.set({ t, mood: 'neutral', look: 0.8 });
        boy.set({ t, mood: t > mid('left', 0.6) ? 'shock' : 'happy', look: 0.6 });
      } else {
        op(chn, 1);
        fade(cEqL, t, at('chain') + 0.05);
        NL2.mark(0, P(t, mid('chain', 0.1), 0.3, linear));
        const h1 = P(t, mid('chain', 0.18), 1.2, ease), h2 = P(t, mid('chain', 0.5), 1.4, ease);
        NL2.hop(0, h1); NL2.mark(1, P(t, mid('chain', 0.18) + 1.15, 0.3, linear));
        NL2.hop(1, h2); NL2.mark(2, P(t, mid('chain', 0.5) + 1.35, 0.3, linear));
        fade(cEqR, t, mid('chain', 0.78));
        const [x, y] = h2 > 0 ? hopPos(NL2, -3, 2, 90, h2) : hopPos(NL2, -7, -3, 90, h1);
        const moving = (h1 > 0 && h1 < 1) || (h2 > 0 && h2 < 1);
        tr(dash, x, y - DFOOT * 1.1 - 4, DS * 1.1);
        dash.set({ t, mood: h2 >= 1 ? 'smug' : 'neutral', look: moving ? 1 : -0.3, arms: moving ? 1 : 0, still: moving });
        kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: t > mid('chain', 0.78) ? 'happy' : 'neutral', look: 0.7 });
        boy.set({ t, mood: 'happy', look: 0.7 });
      }
    }

    op(rose, show.rose); op(kav, show.kav); op(boy, show.boy); op(dash, show.dash);
    if (sC) { Lcast.removeAttribute('transform'); }
    // Kavya and Ah Boy are in front of the whiteboard in C; Dash rides the board
    if (sC && dash.parentNode !== Lfg) Lfg.appendChild(dash);
    if (!sC && dash.parentNode !== Ltop) Ltop.appendChild(dash);
  };
});
