/* Scene 0: Cold open (no chapter card).
   7 a.m., the hawker centre under Block 208: Kavya, 12 -> Rose's Kitchen: Auntie Rose is off to Melaka, leaves the
   recipe card ("just keep it in proportion!") and goes -> Dad in Rose's apron: "how hard can it be?" -> Ah Boy's
   4 : 1 bandung (deep pink) -> documentary zoom into the colon on the recipe card -> the Colonel's confessional
   (the ratio sign; 1 : 4 as a bar model; not 4 : 1) -> salute, ORDER. MATTERS. -> "It tastes nice, though":
   OUT OF PROPORTION stamp -> the Colonel on the counter: 2 days, 1 stall, 3 amateurs -> title card. */
scene('cold', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);          // hard sitcom cut
  const view = (el, k, fx, fy, sx, sy) => el.setAttribute('transform', `translate(${sx.toFixed(1)} ${sy.toFixed(1)}) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); };
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 2, color: o.color || C.ink, weight: 700 }); };
  const PINK = '#FF8FC8', GOLD = '#FFE45C';

  /* layers: sets, characters behind the counter, the counter, foreground, HUD */
  const Lbg = G(root), Lcast = G(root), Lfront = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= A: the hawker centre, 7 a.m. ================= */
  const hawkShot = G(Lbg), hawkWrap = G(hawkShot);
  const hawk = rpHawker(hawkWrap);
  const aChips = G(Lfg);
  const cKav = pill(aChips, 'Kavya, age 12', { size: 32 });
  const cSat = pill(aChips, 'Saturday, 7 a.m.', { size: 30, color: GOLD, stroke: GOLD });
  const cBlk = pill(aChips, 'hawker centre, Blk 208', { size: 28 });

  /* ================= B, G, H: Rose's Kitchen ================= */
  const stallShot = G(Lbg);
  const stall = rpStall(stallShot);
  Lfront.appendChild(stall.front); Lfront.appendChild(stall.top);    // the counter sits in front of Lcast
  const suit = G(stall.top);
  E('rect', { x: -62, y: -110, width: 124, height: 110, rx: 14, fill: '#FF6FA8', stroke: SC_INK, 'stroke-width': 4 }, suit);
  E('path', { d: 'M-26,-110 L-26,-130 L26,-130 L26,-110', fill: 'none', stroke: SC_INK, 'stroke-width': 6 }, suit);
  E('rect', { x: -44, y: -78, width: 88, height: 34, rx: 6, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 2.5 }, suit);
  T(suit, 0, -53, 'MELAKA', { size: 22, weight: 800, anchor: 'middle', fill: '#C62828' });
  const cardS = rpRecipeCard(stall.top, { lines: ['rose syrup : milk', '{{1 : 4}}'], size: 34, w: 400, h: 250 });
  const sludge = rpJug(stall.top, { col: rpMix(4, 1) });
  const cWed = pill(Lfg, "off to Melaka: niece's wedding", { size: 28, color: PINK, stroke: PINK });
  const cKeep = pill(Lfg, 'keep it in proportion!', { size: 30, color: GOLD, stroke: GOLD });
  const cBoy = pill(Lfg, '4 cups syrup + 1 cup milk', { size: 30, color: PINK, stroke: PINK });
  const stamp = rpStamp(Lfg, false);
  const cDays = pill(Lfg, '2 days', { size: 34, color: GOLD, stroke: GOLD });
  const cStall = pill(Lfg, '1 stall', { size: 34, color: GOLD, stroke: GOLD });
  const cAm = pill(Lfg, '3 amateurs', { size: 34, color: '#FF8A8A', stroke: '#FF8A8A' });

  /* ================= C: zoom into the colon on the recipe card ================= */
  const cardShot = G(Lbg), cardWrap = G(cardShot);
  E('rect', { x: -200, y: -200, width: 1600, height: 1150, fill: '#9C6B3E' }, cardWrap);   // the counter-top close up
  const bigCard = rpRecipeCard(cardWrap, { w: 860, h: 520, size: 48, lines: ['rose syrup : milk', ''] });
  tr(bigCard, 600, 380);
  const CX = 600, CY = 380 + 150;                                   // where the big colon sits (stage coords)
  T(cardWrap, CX - 90, CY + 42, '1', { size: 150, weight: 800, anchor: 'middle', fill: '#B8336A' });
  T(cardWrap, CX + 90, CY + 42, '4', { size: 150, weight: 800, anchor: 'middle', fill: '#B8336A' });
  E('circle', { cx: CX, cy: CY - 26, r: 13, fill: '#2A3A8C' }, cardWrap);
  E('circle', { cx: CX, cy: CY + 30, r: 13, fill: '#2A3A8C' }, cardWrap);
  const finder = G(Lhud);
  E('path', { d: 'M40,140 L40,40 L140,40 M1060,40 L1160,40 L1160,140 M1160,610 L1160,710 L1060,710 M140,710 L40,710 L40,610', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 5, opacity: 0.8 }, finder);
  const zoomTxt = T(finder, 1130, 690, 'ZOOM ×1', { size: 30, weight: 700, anchor: 'end', fill: '#FFFFFF' });

  /* ================= D, E, F: the Colonel's confessional ================= */
  const conf = rpConf(Lbg, 'colonel');
  const plaque = G(Lfg);
  E('rect', { x: -250, y: -150, width: 500, height: 300, rx: 18, fill: '#0E1530', stroke: GOLD, 'stroke-width': 5 }, plaque);
  T(plaque, 0, -88, 'THE RATIO SIGN', { size: 40, weight: 800, anchor: 'middle', fill: GOLD, ls: 2 });
  E('circle', { cx: 0, cy: -24, r: 22, fill: ball('#5566E0', '#1E2878'), stroke: '#FFFFFF', 'stroke-width': 3 }, plaque);
  E('circle', { cx: 0, cy: 40, r: 22, fill: ball('#5566E0', '#1E2878'), stroke: '#FFFFFF', 'stroke-width': 3 }, plaque);
  T(plaque, 0, 120, 'two dots, one job', { size: 30, weight: 700, anchor: 'middle', fill: '#CFD8FF', font: FB });
  // the order board: syrup : milk = 1 : 4 as a bar model; not 4 : 1
  const board = G(Lfg);
  E('rect', { x: -300, y: -220, width: 600, height: 440, rx: 20, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, board);
  const bMath = mkMath(board, 0, -142, '"syrup" : "milk" = 1 : 4', { size: 46, fill: MK.ink, anchor: 'middle' });
  const bar = mkBarModel(board, { unit: 84, h: 66, gap: 26, size: 28, ink: MK.ink,
    rows: [{ name: 'syrup', units: 1, col: '#E2559A', label: '1' }, { name: 'milk', units: 4, col: '#FFF1E0', labels: ['1', '2', '3', '4'] }] });
  tr(bar, -150, -80);
  const notG = G(board);
  const notT = mkText(notG, -30, 150, 'not {{4 : 1}}', { size: 46, fill: '#C62828', weight: 800, anchor: 'middle' });
  const notX = cross(notG, 30); tr(notX, 130, 134);
  const wOrder = T(Lfg, 0, 0, 'ORDER.', { size: 110, weight: 800, anchor: 'middle', fill: GOLD });
  const wMatters = T(Lfg, 0, 0, 'MATTERS.', { size: 110, weight: 800, anchor: 'middle', fill: GOLD });
  [wOrder, wMatters].forEach(w => { w.setAttribute('stroke', '#1E2878'); w.setAttribute('stroke-width', 12); w.setAttribute('paint-order', 'stroke'); w.setAttribute('stroke-linejoin', 'round'); });

  /* ================= I: title card ================= */
  const titleShot = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#5A1030', '#A8285A', true) }, titleShot);
  let rays = '';
  for (let i = 0; i < 16; i++) { const a0 = i / 16 * TAU, a1 = a0 + TAU / 40; rays += `M0,0 L${(Math.cos(a0) * 1100).toFixed(0)},${(Math.sin(a0) * 1100).toFixed(0)} L${(Math.cos(a1) * 1100).toFixed(0)},${(Math.sin(a1) * 1100).toFixed(0)} Z `; }
  const rayP = E('path', { d: rays, fill: '#FFE45C', opacity: 0.07 }, titleShot);
  E('ellipse', { cx: 600, cy: 600, rx: 600, ry: 170, fill: glow('#FF8FC8'), opacity: 0.35 }, titleShot);
  const logo = G(Lfg);
  const logo1 = T(logo, 0, -70, 'KEEP IT IN', { size: 58, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 6 });
  const logo2 = T(logo, 0, 20, 'PROPORTION', { size: 96, weight: 800, anchor: 'middle', fill: GOLD, ls: 2 });
  [logo1, logo2].forEach(w => { w.setAttribute('stroke', '#3A0820'); w.setAttribute('stroke-width', 12); w.setAttribute('paint-order', 'stroke'); w.setAttribute('stroke-linejoin', 'round'); });
  const dots = [-1, 1].map(sd => { const d = G(logo); tr(d, sd * 390, -58); E('circle', { cy: -16, r: 13, fill: ball('#5566E0', '#1E2878'), stroke: '#FFFFFF', 'stroke-width': 3 }, d); E('circle', { cy: 18, r: 13, fill: ball('#5566E0', '#1E2878'), stroke: '#FFFFFF', 'stroke-width': 3 }, d); return d; });
  const epi = T(Lfg, 600, 300, 'Episode 7: Auntie Rose Goes to Melaka', { size: 40, weight: 700, anchor: 'middle', fill: '#FFFFFF' });

  /* ================= the cast ================= */
  const rose = cast(Lcast, 'rose', { prop: null });
  const dad = cast(Lcast, 'dad', { style: 'apron', under: 'tee', apron: '#F4F7FA', apronText: "ROSE'S", prop: null });
  const boy = cast(Lcast, 'boy');
  const kavB = cast(Lcast, 'kavya');                 // behind the counter (and on the title card)
  const col = cast(Lcast, 'colonel');
  const kavF = cast(Lfg, 'kavya');                   // customer side, in front of the counter
  const lt = { kavya: rpLowerThird(Lhud, 'kavya'), rose: rpLowerThird(Lhud, 'rose'), dad: rpLowerThird(Lhud, 'dad'), boy: rpLowerThird(Lhud, 'boy'), colonel: rpLowerThird(Lhud, 'colonel') };
  const ltOn = (t, who, t0) => lt[who].set(win(t, t0, t0 + 3.1, 0.3));

  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cut points */
  const cB = at('rose') - 0.06, cC = at('tiny') - 0.06, cD = at('hi') - 0.06, cF = at('matters') - 0.06,
    cG = at('nice') - 0.06, cH = at('charge') - 0.06, cI = at('title') - 0.06;
  const ROSE_X = 760, exitT = mid('card', 0.72);

  return t => {
    op(blackout, 1 - P(t, 0, 0.6, linear));
    const sA = on(t, -1, cB), sB = on(t, cB, cC), sC = on(t, cC, cD), sD = on(t, cD, cF), sF = on(t, cF, cG),
      sG = on(t, cG, cH), sH = on(t, cH, cI), sI = on(t, cI, 1e9);
    const stallOn = sB || sG || sH;
    for (const k in lt) lt[k].set(0);   // every lower third off unless its shot turns it on below
    const show = { rose: 0, dad: 0, boy: 0, kavB: 0, col: 0, kavF: 0 };

    /* ---------- A: wide shot of the hawker centre ---------- */
    op(hawkShot, sA); op(aChips, 0);
    if (sA) {
      hawk.upd(t);
      const push = P(t, 0, cB, linear);
      view(hawkWrap, 1 + 0.22 * push, hawk.rose[0], 470, lerp(hawk.rose[0], 700, push), 470);
      show.kavF = 1;
      tr(kavF, 210, 548, 1.02);
      kavF.set({ t, talk: 0, mood: t < mid('kavya', 0.6) ? 'neutral' : 'happy', look: t > mid('kavya', 0.5) ? 0.8 : 0 });
      op(aChips, 1);
      popIn(cKav, t, mid('kavya', 0.05), 210, 372);
      popIn(cSat, t, mid('kavya', 0.4), 930, 240);
      popIn(cBlk, t, mid('kavya', 0.62), 930, 310);
      ltOn(t, 'kavya', at('kavya') + 1.4);
    }

    /* ---------- B, G, H: the stall ---------- */
    op(stallShot, stallOn); op(stall.front, stallOn); op(stall.top, stallOn);
    op(suit, 0); op(cardS, 0); op(sludge, 0); op(cWed, 0); op(cKeep, 0); op(cBoy, 0); op(stamp, 0);
    op(cDays, 0); op(cStall, 0); op(cAm, 0);
    if (stallOn) stall.upd(t);
    if (sB) {
      // Auntie Rose, behind the counter, with her suitcase; she leaves on "Bye!"
      const gone = P(t, exitT, 0.9, easeIn), rx = ROSE_X + 700 * gone;
      if (gone < 1) {
        show.rose = 1;
        tr(rose, rx, 432, 1.08);
        let mood = 'happy', look = -0.5;
        if (t >= at('know') && t < at('card')) mood = 'neutral';
        rose.set({ t, talk: scTalk(S, t, 'rose'), mood, look: t > exitT ? 0.8 : look, lift: t > mid('card', 0.55) && t < exitT + 0.2 ? 1 : 0 });
        op(suit, 1); tr(suit, 960 + 700 * gone, 532, 0.95);
      }
      ltOn(t, 'rose', at('rose') + 0.15);
      popIn(cWed, t, mid('rose', 0.32), 600, 250); if (t > mid('know', 0.1)) op(cWed, 0);
      // the recipe card, slapped on the counter
      const cp = P(t, mid('card', 0.2), 0.35, pop);
      op(cardS, clamp(cp * 3)); tr(cardS, 500, 440, Math.max(0.01, 0.86 * (0.7 + 0.3 * cp)), -3);
      if (t > mid('card', 0.45) && t < at('hard')) popIn(cKeep, t, mid('card', 0.45), 500, 270);
      // Dad rises behind the counter in Rose's apron
      if (t >= at('hard') - 0.35) {
        show.dad = 1;
        const up = P(t, at('hard') - 0.35, 0.4, easeOut);
        tr(dad, 760, lerp(640, 432, up), 1.08);
        dad.set({ t, talk: scTalk(S, t, 'dad'), mood: t < at('boy') ? 'smug' : 'shock', look: t >= at('boy') ? 0.8 : -0.3 });
        ltOn(t, 'dad', at('hard') + 0.05);
      }
      // Ah Boy and his 4 : 1 bandung
      if (t >= at('boy') - 0.3) {
        show.boy = 1;
        const up = P(t, at('boy') - 0.3, 0.35, pop);
        tr(boy, 990, lerp(660, 452, up), 1.05);
        boy.set({ t, talk: scTalk(S, t, 'boy'), mood: 'happy', look: -0.4, lift: 1 });
        op(sludge, 1); tr(sludge, 1095, 532, 0.72);
        ltOn(t, 'boy', at('boy') + 0.05);
        popIn(cBoy, t, mid('boy', 0.4), 900, 250);
      }
      // Kavya, customer side
      show.kavF = 1;
      tr(kavF, 210, 545, 1.05);
      let km = 'neutral', kl = 0.7;
      if (t < at('know')) km = 'happy';
      else if (t < at('card')) km = t < end('know') ? 'sad' : 'neutral';
      else if (t < at('hard')) km = 'annoyed';
      else if (t < at('boy')) { km = 'deadpan'; kl = 0.9; }
      else km = t < mid('boy', 0.5) ? 'neutral' : 'shock';
      kavF.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
    }

    /* ---------- C: documentary zoom into the colon ---------- */
    op(cardShot, sC); op(finder, sC);
    if (sC) {
      const z = P(t, cC + 0.3, cD - cC - 0.3, easeIn);
      const k = 0.55 * Math.pow(14 / 0.55, z);
      view(cardWrap, k, lerp(600, CX, z), lerp(380, CY + 2, z), 600, 375);
      setText(zoomTxt, 'ZOOM ×' + (k / 0.55 >= 10 ? String(Math.round(k / 0.55)) : (k / 0.55).toFixed(1)));
    }

    /* ---------- D, E, F: the confessional ---------- */
    const confOn = sD || sF;
    conf.set(confOn, t);
    op(plaque, 0); op(board, 0); op(wOrder, 0); op(wMatters, 0);
    if (confOn) {
      show.col = 1;
      const push = sF ? P(t, cF, cG - cF, linear) : 0;
      const k = sF ? 1.04 + 0.06 * push : 1;
      tr(col, 330, 410, 1.42 * k);
      let mood = 'deadpan', look = 0;
      if (t < at('order')) mood = t < mid('hi', 0.4) ? 'neutral' : 'smug';
      else if (t < at('matters')) { look = t > mid('order', 0.1) ? 0.6 : 0; mood = t > mid('order', 0.8) ? 'annoyed' : 'deadpan'; }
      else mood = 'annoyed';
      col.set({ t, talk: scTalk(S, t, 'colonel'), mood, look, salute: sF && t > at('matters') + 0.05 ? 1 : 0, point: t > mid('order', 0.75) && !sF ? 1 : 0 });
      ltOn(t, 'colonel', at('hi') + 0.1);
      // hi: the plaque
      const pp = P(t, mid('hi', 0.25), 0.45, pop) * (1 - P(t, at('order') - 0.15, 0.2, linear));
      op(plaque, clamp(pp * 2.5)); tr(plaque, 850, 330, Math.max(0.01, 0.7 + 0.3 * pp));
      // order: the board builds
      if (sD && t >= at('order') - 0.1) {
        const bp = P(t, at('order') - 0.1, 0.4, pop);
        op(board, clamp(bp * 3)); tr(board, 850, 350, Math.max(0.01, 0.85 + 0.15 * bp));
        op(bMath, P(t, at('order') + 0.05, 0.3, linear));
        bar.row(0, P(t, mid('order', 0.2), 0.3, linear));
        bar.row(1, P(t, mid('order', 0.36), mid('order', 0.66) - mid('order', 0.36), linear));
        op(notG, P(t, mid('order', 0.82), 0.25, linear));
      }
      // matters: ORDER. MATTERS.
      if (sF) {
        const p1 = P(t, at('matters') + 0.02, 0.3, pop), p2 = P(t, mid('matters', 0.5), 0.3, pop);
        op(wOrder, clamp(p1 * 3)); tr(wOrder, 850, 330, Math.max(0.01, 0.5 + 0.5 * p1), -3);
        op(wMatters, clamp(p2 * 3)); tr(wMatters, 850, 470, Math.max(0.01, 0.5 + 0.5 * p2), -3);
      }
    }

    /* ---------- G: "It tastes nice, though." ---------- */
    if (sG) {
      show.boy = 1; show.dad = 1; show.kavF = 1;
      const stamped = t > end('nice') + 0.1;
      tr(boy, 560, 452, 1.15);
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: stamped ? 'shock' : 'happy', look: stamped ? 0.8 : 0, lift: 1 });
      op(sludge, 1); tr(sludge, 790, 532, 0.8);
      tr(dad, 360, 432, 1.08); dad.set({ t, mood: 'deadpan', look: 0.8 });
      tr(kavF, 170, 566, 1.0); kavF.set({ t, mood: stamped ? 'smug' : 'deadpan', look: 0.8 });
      stamp.set(P(t, end('nice') + 0.1, 0.35, linear)); tr(stamp, 830, 470, 0.4);
    }

    /* ---------- H: the Colonel on the counter ---------- */
    if (sH) {
      show.col = 1; show.dad = 1; show.boy = 1; show.kavB = 1;
      const jump = P(t, cH, 0.4, pop);
      tr(col, 600, lerp(560, 418, jump), 1.0);
      col.set({ t, talk: scTalk(S, t, 'colonel'), mood: t > mid('charge', 0.55) ? 'annoyed' : 'deadpan', look: t < mid('charge', 0.5) ? Math.sin(t * 2) * 0.6 : 0, point: t > mid('charge', 0.6) ? 1 : 0 });
      tr(kavB, 290, 432, 1.05); kavB.set({ t, mood: t > mid('charge', 0.4) ? 'annoyed' : 'neutral', look: 0.8 });
      tr(dad, 900, 432, 1.05); dad.set({ t, mood: 'smug', look: -0.8 });
      tr(boy, 1030, 456, 1.0); boy.set({ t, mood: 'happy', look: -0.8, lift: 1 });
      op(sludge, 1); tr(sludge, 1120, 532, 0.62);
      popIn(cDays, t, mid('charge', 0.04), 300, 240);
      popIn(cStall, t, mid('charge', 0.2), 600, 240);
      popIn(cAm, t, mid('charge', 0.38), 900, 240);
    }

    /* ---------- I: title card ---------- */
    op(titleShot, sI); op(logo, 0); op(epi, 0);
    if (sI) {
      tr(rayP, 600, 600, 1, (t * 6 * AMP) % 360);
      const lp = P(t, at('title') + 0.05, 0.6, pop);
      op(logo, clamp(lp * 2.5)); tr(logo, 600, 190, Math.max(0.01, 0.5 + 0.5 * lp));
      dots.forEach((d, i) => tr(d, (i ? 1 : -1) * 390, -58, 1, Math.sin(t * 2 + i) * 8 * AMP));
      op(epi, P(t, mid('title', 0.42), 0.4, linear));
      const castT = i => mid('title', 0.5) + i * 0.13, xs = [180, 390, 600, 810, 1020];
      const row = [[rose, 'happy', 0.7, 'rose'], [kavB, 'smug', 0.82, 'kavB'], [col, 'deadpan', 0.62, 'col'], [dad, 'smug', 0.7, 'dad'], [boy, 'happy', 0.78, 'boy']];
      row.forEach(([c, mood, s, key], i) => {
        const p = P(t, castT(i), 0.45, pop);
        show[key] = 1; op(c, clamp(p * 3));
        tr(c, xs[i], 520 + 30 * (1 - clamp(p)), Math.max(0.01, s * p));
        c.set({ t, mood, look: 0, salute: key === 'col' ? 1 : 0, lift: 0 });
      });
    }

    /* characters not in this shot */
    if (!sI) { op(rose, show.rose); op(dad, show.dad); op(boy, show.boy); op(kavB, show.kavB); op(col, show.col); }
    op(kavF, show.kavF);
  };
});
