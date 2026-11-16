/* Scene 0: Cold open (no chapter card).
   Deepavali, 2 p.m., the 8th-floor corridor of Block 208 outside #08-14: Kavya, 12 -> Mum bursts out: open house at
   seven SHARP, forty guests -> Dad with a coil of $9.90 fairy lights, PATTERN MODE: "I have a system" (famous last
   words: Kavya and Mum turn to camera) -> close-up of the NEXTA-LITE box on the wall -> documentary zoom into its
   crystal-ball logo -> the curtains open on Madame Nexta, the term-to-term rule -> "2, 4, 6..." -> her crystal ball
   shows 8 (+2, +2, +2) -> Ah Boy: "What's the hundredth one?" -> she starts counting, step by step (term 7 of 100)
   -> Mum, deadpan, five hours to go -> title card. */
scene('cold', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);          // hard sitcom cut
  const view = (el, k, fx, fy, sx, sy) => el.setAttribute('transform', `translate(${sx.toFixed(1)} ${sy.toFixed(1)}) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 2, color: o.color || C.ink, weight: 700 }); };
  const GOLD = NX_COL.gold, PINK = '#FF8FC8', LILAC = '#C9A6FF', INK = MK.ink;

  /* layers: sets, characters, things in front of the characters (railing, curtains), foreground, HUD */
  const Lbg = G(root), Lcast = G(root), Lfront = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= A, B, C, G, I, K: the corridor ================= */
  const corShot = G(Lbg), corCam = G(corShot);
  const cor = nxCorridor(corCam);
  const corFront = G(Lfront); corFront.appendChild(cor.front); corFront.appendChild(cor.top);
  const aChips = G(Lfg);
  const cKav = pill(aChips, 'Kavya, age 12', { size: 32 });
  const cDay = pill(aChips, 'Deepavali, 2 p.m.', { size: 30, color: GOLD, stroke: GOLD });
  const cBlk = pill(aChips, 'Blk 208, 8th floor', { size: 28 });
  const cSharp = mkChip(Lfg, 'open house: **7 p.m. SHARP**', { size: 34, col: GOLD });
  const cGuests = mkChip(Lfg, '**40** guests', { size: 32, col: PINK });
  const list = G(Lfg);   // Mum's checklist
  E('rect', { x: -150, y: -112, width: 300, height: 224, rx: 14, fill: MK.paper, stroke: '#C9B48A', 'stroke-width': 4 }, list);
  T(list, 0, -70, 'TO DO', { size: 32, weight: 800, anchor: 'middle', fill: NX_COL.magenta, ls: 3 });
  const listRows = ['lights', 'kolam', 'murukku'].map((w, i) => {
    const r = G(list), y = -20 + i * 50;
    E('rect', { x: -110, y: y - 22, width: 28, height: 28, rx: 5, fill: '#FFFFFF', stroke: INK, 'stroke-width': 3 }, r);
    T(r, -66, y, w, { size: 30, weight: 700, fill: INK });
    return r;
  });
  const cMode = mkChip(Lfg, '**PATTERN MODE** · $9.90', { size: 32, col: GOLD });
  const cFamous = pill(Lhud, 'famous last words', { size: 28, color: PINK, stroke: PINK });
  // the 2, 4, 6 card on the wall (G)
  const card246 = G(Lfg);
  E('rect', { x: -230, y: -70, width: 460, height: 140, rx: 16, fill: MK.paper, stroke: '#C9B48A', 'stroke-width': 4 }, card246);
  mkMath(card246, 0, 26, '2,  4,  6,  ...', { size: 72, anchor: 'middle', fill: INK, weight: 700 });
  const c100 = mkChip(Lfg, 'term number **100**?', { size: 36, col: GOLD });
  const cHours = mkChip(Lfg, '**5 hours** to go', { size: 36, col: '#FF8A8A' });

  /* ================= D, E: the controller box, close up, and the zoom ================= */
  const boxShot = G(Lbg), boxCam = G(boxShot);
  E('rect', { x: -400, y: -400, width: 2000, height: 1600, fill: '#F6EEDC' }, boxCam);
  E('path', { d: 'M-400,180 Q600,240 1600,180', fill: 'none', stroke: '#2E5A3A', 'stroke-width': 5 }, boxCam);
  const bigBox = nxBox(boxCam); tr(bigBox, 700, 330, 2.6);
  const BOX_LOGO = [700 - 36 * 2.6, 330 - 8 * 2.6];               // the crystal-ball logo, in stage coords
  const slogan = mkSpeechBubble(Lfg, '"Madame **Nexta** predicts\nyour next light."', { size: 34, tail: 'up', boldFill: NX_COL.purple });
  const finder = G(Lhud);
  E('path', { d: 'M40,140 L40,40 L140,40 M1060,40 L1160,40 L1160,140 M1160,610 L1160,710 L1060,710 M140,710 L40,710 L40,610', fill: 'none', stroke: '#2A1A22', 'stroke-width': 9, opacity: 0.5 }, finder);
  E('path', { d: 'M40,140 L40,40 L140,40 M1060,40 L1160,40 L1160,140 M1160,610 L1160,710 L1060,710 M140,710 L40,710 L40,610', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 5, opacity: 0.9 }, finder);
  const zoomTxt = T(finder, 1130, 690, 'ZOOM ×1', { size: 30, weight: 700, anchor: 'end', fill: '#FFFFFF' });
  zoomTxt.setAttribute('stroke', '#2A1A22'); zoomTxt.setAttribute('stroke-width', 6); zoomTxt.setAttribute('paint-order', 'stroke');
  const recDot = E('circle', { cx: 80, cy: 680, r: 10, fill: '#FF3B3B' }, finder);

  /* ================= F, H, J: inside the box: Madame Nexta's tiny theatre ================= */
  const stageShot = G(Lbg);
  const stage = nxBoxStage(stageShot);
  const curtF = G(Lfront); curtF.appendChild(stage.curt);
  const plaque = G(Lfg);
  E('rect', { x: -230, y: -60, width: 460, height: 120, rx: 18, fill: '#2A0E40', stroke: GOLD, 'stroke-width': 4 }, plaque);
  T(plaque, 0, -10, 'TERM-TO-TERM RULE', { size: 34, weight: 800, anchor: 'middle', fill: GOLD, ls: 2 });
  T(plaque, 0, 34, 'sees the next term', { size: 28, weight: 700, anchor: 'middle', fill: LILAC, font: FB });
  // the scroll: 2, 4, 6, ? -> 8, then the long count
  const scroll = G(Lfg);
  E('rect', { x: -250, y: -150, width: 500, height: 300, rx: 16, fill: '#FFF3D6', stroke: '#B8860B', 'stroke-width': 5 }, scroll);
  [-1, 1].forEach(s => E('rect', { x: -262, y: s * 150 - 14, width: 524, height: 28, rx: 14, fill: '#C9A227', stroke: '#8A6508', 'stroke-width': 3 }, scroll));
  const SX = [-180, -60, 60, 180], seqT = [];
  ['2', '4', '6'].forEach((v, i) => seqT.push(mkMath(scroll, SX[i], 40, v, { size: 64, anchor: 'middle', fill: INK, weight: 700 })));
  const qMark = mkMath(scroll, SX[3], 40, '?', { size: 64, anchor: 'middle', fill: '#B8336A', weight: 700 });
  const eightG = G(scroll); mkMath(eightG, SX[3], 40, '8', { size: 72, anchor: 'middle', fill: '#1E9E5A', weight: 800 });
  const hops = [0, 1, 2].map(i => {
    const g = G(scroll);
    const a = arrow(g, SX[i] + 10, -26, SX[i + 1] - 10, -26, { color: NX_COL.purple, width: 4, bend: -30 });
    mkMath(g, (SX[i] + SX[i + 1]) / 2, -66, '+2', { size: 32, anchor: 'middle', fill: NX_COL.purple, weight: 700 });
    return { g, a };
  });
  const sTitle = mkText(scroll, 0, -100, 'rule: **add 2**', { size: 30, anchor: 'middle', fill: INK, boldFill: NX_COL.purple });
  // the count: term 7 of 100, a progress bar
  const countG = G(scroll);
  const cntBig = mkMath(countG, 0, 10, '14', { size: 96, anchor: 'middle', fill: NX_COL.purple, weight: 800 });
  const cntLab = T(countG, 0, 80, 'term 7 of 100', { size: 30, weight: 700, anchor: 'middle', fill: INK });
  E('rect', { x: -200, y: 100, width: 400, height: 22, rx: 11, fill: '#E8DCC0', stroke: '#B8860B', 'stroke-width': 2 }, countG);
  const bar = E('rect', { x: -198, y: 102, width: 10, height: 18, rx: 9, fill: NX_COL.purple }, countG);
  T(countG, 0, -100, 'the 100th term of 2, 4, 6...', { size: 28, weight: 700, anchor: 'middle', fill: INK, font: FB });

  /* ================= L: title card ================= */
  const titleShot = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#1E0E3A', '#5A1E7A', true) }, titleShot);
  let rays = '';
  for (let i = 0; i < 16; i++) { const a0 = i / 16 * TAU, a1 = a0 + TAU / 40; rays += `M0,0 L${(Math.cos(a0) * 1100).toFixed(0)},${(Math.sin(a0) * 1100).toFixed(0)} L${(Math.cos(a1) * 1100).toFixed(0)},${(Math.sin(a1) * 1100).toFixed(0)} Z `; }
  const rayP = E('path', { d: rays, fill: GOLD, opacity: 0.07 }, titleShot);
  E('ellipse', { cx: 600, cy: 620, rx: 620, ry: 170, fill: glow('#FF9F1C'), opacity: 0.35 }, titleShot);
  const tLights = nxLights(titleShot, { n: 26, x0: 30, x1: 1170, y: 40, sag: 24, gold: i => i % 3 === 0 });
  const tDiyas = [90, 1110].map(x => { const d = nxDiya(titleShot, 1.3); tr(d, x, 700); return d; });
  const logo = G(Lfg);
  const logo1 = T(logo, 0, -70, 'WHAT COMES', { size: 64, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 6 });
  const logo2 = T(logo, -30, 26, 'NEXT', { size: 110, weight: 800, anchor: 'middle', fill: GOLD, ls: 4 });
  const logoQ = T(logo, 150, 26, '?', { size: 110, weight: 800, anchor: 'middle', fill: '#FF8FC8' });
  [logo1, logo2, logoQ].forEach(w => { w.setAttribute('stroke', '#2A0E40'); w.setAttribute('stroke-width', 12); w.setAttribute('paint-order', 'stroke'); w.setAttribute('stroke-linejoin', 'round'); });
  const ldots = [0, 1, 2].map(i => E('circle', { cx: 220 + i * 34, cy: 18, r: 11, fill: GOLD, stroke: '#2A0E40', 'stroke-width': 3 }, logo));
  const epi = T(Lfg, 600, 300, 'Episode 11: Festival of Lights', { size: 40, weight: 700, anchor: 'middle', fill: '#FFFFFF' });

  /* ================= the cast ================= */
  const mum = cast(Lcast, 'mum');
  const dad = cast(Lcast, 'dad'); nxHandProp(dad.hand, 'coil');
  const boy = cast(Lcast, 'boy');
  const kav = cast(Lcast, 'kavya');
  const nexta = cast(Lcast, 'nexta');
  const lt = { kavya: nxLowerThird(Lhud, 'kavya'), mum: nxLowerThird(Lhud, 'mum'), dad: nxLowerThird(Lhud, 'dad'), boy: nxLowerThird(Lhud, 'boy'), nexta: nxLowerThird(Lhud, 'nexta') };
  const ltOn = (t, who, t0) => lt[who].set(win(t, t0, t0 + 3.1, 0.3));

  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cut points */
  const cD = at('box') - 0.06, cE = at('tiny') - 0.06, cF = at('hi') - 0.06, cG = at('test') - 0.06, cH = at('eight') - 0.06,
    cI = at('boy') - 0.06, cJ = at('count') - 0.06, cK = at('hours') - 0.06, cL = at('title') - 0.06;

  return t => {
    op(blackout, 1 - P(t, 0, 0.6, linear));
    const sA = on(t, -1, cD), sD = on(t, cD, cE), sE = on(t, cE, cF), sF = on(t, cF, cG), sG = on(t, cG, cH),
      sH = on(t, cH, cI), sI = on(t, cI, cJ), sJ = on(t, cJ, cK), sK = on(t, cK, cL), sL = on(t, cL, 1e9);
    const corOn = sA || sG || sI || sK, stageOn = sF || sH || sJ;
    for (const k in lt) lt[k].set(0);
    const show = { mum: 0, dad: 0, boy: 0, kav: 0, nexta: 0 };
    const who = scWho(S, t);

    /* ---------- the corridor ---------- */
    op(corShot, corOn); op(corFront, corOn);
    op(aChips, 0); op(cSharp, 0); op(cGuests, 0); op(list, 0); op(cMode, 0); op(cFamous, 0); op(card246, 0); op(c100, 0); op(cHours, 0);
    if (corOn) {
      cor.upd(t, 0);
      // the lights: off until Dad's line, then pattern mode
      cor.lights.set(t, t < mid('system', 0.5) ? 'off' : 'ripple');
    }
    if (sA) {
      // slow push towards the door while the narrator talks, then a medium shot
      const push = P(t, 0, at('mum'), linear);
      view(corCam, 1 + 0.08 * push, 420, 420, 420 + 40 * push, 420);
      show.kav = 1;
      const kx = t < at('mum') ? 560 : 520;
      tr(kav, kx, 452, 1.0);
      let km = 'neutral', kl = 0;
      if (t < at('mum')) { km = t > mid('kavya', 0.6) ? 'happy' : 'neutral'; kl = t > mid('kavya', 0.4) ? -0.6 : 0.3; }
      else if (t < at('system')) { km = 'shock'; kl = -0.8; }
      else { km = t > end('system') ? 'deadpan' : 'neutral'; kl = t > end('system') ? 0 : 0.8; }
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
      if (t < at('mum')) {
        op(aChips, 1);
        popIn(cKav, t, mid('kavya', 0.05), 660, 262);
        popIn(cDay, t, mid('kavya', 0.3), 900, 330);
        popIn(cBlk, t, mid('kavya', 0.55), 900, 400);
        ltOn(t, 'kavya', at('kavya') + 1.6);
      }
      // Mum bursts out of the door
      if (t >= at('mum') - 0.3) {
        show.mum = 1;
        const p = P(t, at('mum') - 0.3, 0.35, pop);
        tr(mum, lerp(120, 240, p), 440, 1.05);
        const fam = t > end('system') + 0.05;
        mum.set({ t, talk: scTalk(S, t, 'mum'), mood: fam ? 'deadpan' : t < at('system') ? 'shock' : 'annoyed', look: fam ? 0 : who === 'dad' ? 0.9 : 0.4, lift: t < at('system') ? 1 : 0 });
        ltOn(t, 'mum', at('mum') + 0.2);
        if (t < at('system') + 0.2) {
          popIn(cSharp, t, mid('mum', 0.1), 700, 190);
          popIn(cGuests, t, mid('mum', 0.32), 700, 262);
          popIn(list, t, mid('mum', 0.38), 1010, 350, 0.85);
          listRows.forEach((r, i) => op(r, P(t, mid('mum', 0.46 + i * 0.09), 0.2, linear)));
        }
      }
      // Dad rises with the coil of lights
      if (t >= at('system') - 0.3) {
        show.dad = 1;
        const up = P(t, at('system') - 0.3, 0.4, easeOut);
        tr(dad, 860, lerp(660, 440, up), 1.05);
        dad.set({ t, talk: scTalk(S, t, 'dad'), mood: 'smug', look: t > end('system') ? -0.3 : -0.6, lift: 1 });
        ltOn(t, 'dad', at('system') + 0.1);
        popIn(cMode, t, mid('system', 0.3), 860, 250);
        if (t > end('system') + 0.05) popIn(cFamous, t, end('system') + 0.08, 600, 652);
      }
    }
    if (sG) {
      // Kavya at the box: "2, 4, 6..."
      view(corCam, 1.15, 430, 330, 470, 360);
      show.kav = 1; tr(kav, 330, 440, 1.0);
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: 'smug', look: 0.6 });
      popIn(card246, t, at('test') + 0.05, 780, 330);
    }
    if (sI) {
      // Ah Boy pops up: the hundredth?
      view(corCam, 1, 600, 375, 600, 375);
      show.kav = 1; tr(kav, 330, 452, 1.0);
      kav.set({ t, mood: t > mid('boy', 0.6) ? 'shock' : 'neutral', look: 0.8 });
      show.boy = 1;
      const up = P(t, at('boy') - 0.25, 0.35, pop);
      tr(boy, 720, lerp(660, 448, up), 1.05);
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: 'happy', look: -0.5, lift: 1 });
      ltOn(t, 'boy', at('boy') + 0.05);
      popIn(c100, t, mid('boy', 0.45), 720, 230);
    }
    if (sK) {
      // Mum, deadpan, to camera; the lights doing their thing
      const push = P(t, at('hours'), cL - at('hours'), linear);
      view(corCam, 1 + 0.08 * push, 300, 420, 300, 420);
      show.mum = 1; show.dad = 1; show.kav = 1;
      tr(mum, 300, 440, 1.05); mum.set({ t, talk: scTalk(S, t, 'mum'), mood: 'deadpan', look: 0 });
      tr(kav, 560, 452, 1.0); kav.set({ t, mood: 'deadpan', look: -0.7 });
      tr(dad, 860, 440, 1.05); dad.set({ t, mood: 'smug', look: -0.8, lift: 1 });
      popIn(cHours, t, mid('hours', 0.5), 720, 225);
    }

    /* ---------- D, E: the box, close up, and the zoom into its logo ---------- */
    op(boxShot, sD || sE); op(slogan, 0); op(finder, sE); op(recDot, sE && Math.sin(t * TAU * 0.8) > 0 ? 1 : 0.2);
    if (sD) {
      view(boxCam, 1, 600, 375, 600, 375);
      bigBox.set(0.5 + 0.5 * Math.sin(t * 5));
      show.kav = 1; tr(kav, 220, 600, 1.1);
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: 'neutral', look: 0.9 });
      slogan.set(P(t, mid('box', 0.25), 0.35, linear)); tr(slogan, 720, 570);
    }
    if (sE) {
      const z = P(t, cE + 0.25, cF - cE - 0.35, easeIn);
      const k = Math.pow(16, z);
      view(boxCam, k, lerp(600, BOX_LOGO[0], z), lerp(375, BOX_LOGO[1], z), 600, 375);
      bigBox.set(1);
      setText(zoomTxt, 'ZOOM ×' + (k >= 10 ? String(Math.round(k)) : k.toFixed(1)));
    }

    /* ---------- F, H, J: Madame Nexta's theatre ---------- */
    op(stageShot, stageOn); op(curtF, stageOn);
    op(plaque, 0); op(scroll, 0);
    if (stageOn) {
      show.nexta = 1;
      stage.curtain(sF ? P(t, cF, 0.8, ease) : 1);
      let nx = 400, ns = 1.35;
      if (sH || sJ) { nx = 330; ns = 1.2; }
      tr(nexta, nx, 430, ns);
      let ball = '', glowV = 0.3, hands = 0, mood = 'smug', look = 0;
      if (sF) { hands = t > mid('hi', 0.55) ? 1 : 0.3; mood = t > mid('hi', 0.5) ? 'happy' : 'smug'; glowV = 0.5; }
      if (sH) {
        hands = t < mid('eight', 0.6) ? 1 : 0.2; glowV = t > mid('eight', 0.62) ? 1 : 0.6;
        ball = t > mid('eight', 0.62) ? '8' : ''; mood = t > mid('eight', 0.62) ? 'happy' : 'smug'; look = 0.5;
      }
      if (sJ) {
        // step by step: 8, 10, 12, 14 ... (she has 93 more steps to go)
        const steps = ['8', '10', '12', '14', '16'];
        const k = Math.min(4, Math.floor(clamp((t - mid('count', 0.35)) / ((end('count') + 0.4 - mid('count', 0.35)) / 4), 0, 4)));
        ball = t < mid('count', 0.35) ? '' : steps[k];
        hands = t > mid('count', 0.3) ? 1 : 0; glowV = 0.8;
        mood = t < mid('count', 0.25) ? 'shock' : t > end('count') ? 'annoyed' : 'neutral';
        look = 0.3;
      }
      nexta.set({ t, talk: scTalk(S, t, 'nexta'), mood, look, ball, glow: glowV, hands });
      if (sF) {
        ltOn(t, 'nexta', at('hi') + 0.6);
        const pp = P(t, mid('hi', 0.45), 0.45, pop);
        op(plaque, clamp(pp * 2.5)); tr(plaque, 870, 330, Math.max(0.01, 0.75 + 0.25 * pp));
      }
      if (sH || sJ) {
        op(scroll, 1); tr(scroll, 850, 330, 1);
        op(countG, sJ ? 1 : 0);
        const seqOn = sH ? 1 : 0;
        seqT.forEach(e => op(e, seqOn)); op(sTitle, sH ? P(t, mid('eight', 0.3), 0.3, linear) : 0);
        hops.forEach((h, i) => { op(h.g, seqOn && t > mid('eight', 0.1 + i * 0.1) ? 1 : 0); h.a.set(P(t, mid('eight', 0.1 + i * 0.1), 0.3, linear)); });
        const ep = sH ? P(t, mid('eight', 0.62), 0.4, pop) : 0;
        op(qMark, sH && ep < 0.3 ? 1 : 0);
        op(eightG, clamp(ep * 3)); tr(eightG, 0, 0, 1);
        if (sJ) {
          const steps = [['8', 4], ['10', 5], ['12', 6], ['14', 7], ['16', 8]];
          const k = t < mid('count', 0.35) ? 0 : Math.min(4, Math.floor(clamp((t - mid('count', 0.35)) / ((end('count') + 0.4 - mid('count', 0.35)) / 4), 0, 4)));
          mkMathSet(cntBig, steps[k][0]);
          setText(cntLab, `term ${steps[k][1]} of 100`);
          attr(bar, 'width', Math.max(18, 396 * steps[k][1] / 100));
        }
      }
    }

    /* ---------- L: title card ---------- */
    op(titleShot, sL); op(logo, 0); op(epi, 0);
    if (sL) {
      tr(rayP, 600, 620, 1, (t * 6 * AMP) % 360);
      tLights.set(t, 'chase', (t - cL) * 14);
      tDiyas.forEach(d => d.set(t, 1));
      const lp = P(t, at('title') + 0.05, 0.6, pop);
      op(logo, clamp(lp * 2.5)); tr(logo, 600, 190, Math.max(0.01, 0.5 + 0.5 * lp));
      ldots.forEach((d, i) => op(d, ((t * 2.5 - i * 0.4) % 1.6) < 1.1 ? 1 : 0.25));
      op(epi, P(t, mid('title', 0.42), 0.4, linear));
      const castT = i => mid('title', 0.5) + i * 0.13, xs = [180, 390, 600, 810, 1020];
      const row = [[mum, 'happy', 0.7, 'mum'], [kav, 'smug', 0.8, 'kav'], [nexta, 'smug', 0.66, 'nexta'], [dad, 'smug', 0.7, 'dad'], [boy, 'happy', 0.78, 'boy']];
      row.forEach(([c, mood, s, key], i) => {
        const p = P(t, castT(i), 0.45, pop);
        show[key] = 1; op(c, clamp(p * 3));
        tr(c, xs[i], 520 + 30 * (1 - clamp(p)), Math.max(0.01, s * p));
        c.set({ t, mood, look: 0, lift: 0, ball: key === 'nexta' ? '?' : '', glow: 1, hands: 0.4 });
      });
    }

    /* characters not in this shot */
    if (!sL) { op(mum, show.mum); op(dad, show.dad); op(boy, show.boy); op(kav, show.kav); op(nexta, show.nexta); }
  };
});
