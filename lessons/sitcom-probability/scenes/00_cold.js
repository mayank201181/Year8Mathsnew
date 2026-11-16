/* Scene 0: Cold open (no chapter card).
   A  8 a.m., the living room: Kavya, 12 -> Mum's phone: 70% chance of thunderstorms -> Dad with the picnic basket:
      "30% no rain. I have a feeling." -> Kavya: 70% is LIKELY (a mini probability scale) -> lightning, the rain starts.
   B  9 a.m.: picnic OFF; Mr Tan comes down with his game box -> Priya: "I win them."
   C  documentary zoom into Mr Tan's game box: the lid lifts, light pours out.
   D  Cubert's confessional: a DICE, six faces, each 1/6 -> Mr Tan, close-up: "the singular is die" -> Cubert, wounded:
      "so... final".
   E  the living room: Ah Boy: "Roll me a seven!" -> Cubert on the table: P(7) = 0, NO CHANCE.
   F  title card: WHAT ARE THE CHANCES? Episode 20. */
scene('cold', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);          // hard sitcom cut
  const view = (el, k, fx, fy, sx, sy) => el.setAttribute('transform', `translate(${sx.toFixed(1)} ${sy.toFixed(1)}) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const chipAt = (parent, text, o) => { o = o || {}; return mkChip(parent, text, { size: o.size || 30, col: o.col || C.ink }); };
  const popSet = (el, t, t0, t1, x, y) => { const p = t >= t0 && t < t1 ? P(t, t0, 0.35, linear) : 0; el.set(p); if (x !== undefined) tr(el, x, y); };
  const GOLD = '#FFE45C', RED = '#FF8A8A', BLUE = '#8FC8FF';

  /* layers: set, characters behind the table, the table, props on it, foreground, HUD */
  const Lset = G(root), Lcast = G(root), Lfront = G(root), Ltop = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= A, B, E: the living room ================= */
  const flat = pbFlat(Lset);
  Lfront.appendChild(flat.front); Ltop.appendChild(flat.top);
  // the picnic basket on the table
  const basket = G(flat.top); tr(basket, 960, 556);
  E('path', { d: 'M-70,-70 L70,-70 L60,0 L-60,0 Z', fill: '#C9935A', stroke: '#6B4423', 'stroke-width': 4, 'stroke-linejoin': 'round' }, basket);
  E('path', { d: 'M-66,-50 H66 M-62,-28 H62 M-40,-70 V0 M0,-70 V0 M40,-70 V0', stroke: '#8A5E34', 'stroke-width': 3 }, basket);
  E('path', { d: 'M-50,-70 Q0,-130 50,-70', fill: 'none', stroke: '#6B4423', 'stroke-width': 7 }, basket);
  E('path', { d: 'M-72,-74 L72,-74 L64,-62 L-64,-62 Z', fill: '#E8424F' }, basket);
  for (let i = 0; i < 6; i++) E('rect', { x: -70 + i * 24, y: -74, width: 12, height: 12, fill: '#FFFFFF' }, basket);
  const basketX = G(flat.top); tr(basketX, 960, 520); cross(basketX, 44);
  const forecast = pbForecast(Lfg, { day: 'SATURDAY', pct: '70%', text: 'Thunderstorms' });
  const cKav = chipAt(Lfg, 'Kavya, age **12**', { size: 32 });
  const cSat = chipAt(Lfg, '**Saturday, 8 a.m.**', { col: GOLD });
  const cBlk = chipAt(Lfg, 'Block 208', { size: 28 });
  const cRain = mkChip(Lfg, '{{P("rain") = 70%}}', { size: 34, col: BLUE });
  const cDry = mkChip(Lfg, '{{P("no rain") = 30%}}', { size: 34, col: GOLD });
  const cFeel = chipAt(Lfg, '"I have a feeling."', { col: RED, size: 30 });
  // the mini probability scale: 0 impossible ... 1 certain, marker at 0.7 "likely" (later at 0 "impossible")
  const scl = G(Lfg);
  E('rect', { x: -330, y: -78, width: 660, height: 156, rx: 20, fill: 'rgba(10,27,39,0.9)', stroke: C.line, 'stroke-width': 3 }, scl);
  E('rect', { x: -270, y: -6, width: 270, height: 12, fill: '#FF8A8A', opacity: 0.6 }, scl);
  E('rect', { x: 0, y: -6, width: 270, height: 12, fill: '#56D69B', opacity: 0.6 }, scl);
  E('line', { x1: -270, y1: 0, x2: 270, y2: 0, stroke: C.ink, 'stroke-width': 4 }, scl);
  [[-270, '0'], [0, '1/2'], [270, '1']].forEach(([x, s]) => { E('line', { x1: x, y1: -14, x2: x, y2: 14, stroke: C.ink, 'stroke-width': 4 }, scl); mkMath(scl, x, 56, s, { size: 30, anchor: 'middle', fill: C.ink }); });
  const sclMark = G(scl);
  E('circle', { r: 13, fill: GOLD, stroke: '#2A1A22', 'stroke-width': 3 }, sclMark);
  const sclLikely = G(scl); T(sclLikely, 0, -26, 'likely: 0.7', { size: 30, weight: 800, anchor: 'middle', fill: GOLD });
  const sclImp = G(scl); T(sclImp, 0, -26, 'impossible: 0', { size: 30, weight: 800, anchor: 'middle', fill: RED });
  const c9 = chipAt(Lfg, '**9 a.m.**  picnic: **OFF**', { col: GOLD });
  const box = pbBox(flat.top);
  const stamp = pbStamp(Lfg, false);
  const cP7 = mkChip(Lfg, '{{P(7) = 0}}', { size: 40, col: RED });
  const bolt1 = pbBolt(Lfg, 1.6);

  /* ================= C: zoom into the game box ================= */
  const boxShot = G(Lset), boxWrap = G(boxShot);
  E('rect', { x: -400, y: -300, width: 2000, height: 1400, fill: '#E8D6BA' }, boxWrap);
  E('rect', { x: -400, y: 560, width: 2000, height: 700, fill: '#A0703F' }, boxWrap);
  const bigBox = pbBox(boxWrap); tr(bigBox, 600, 600, 1.6);
  const finder = G(Lhud);
  E('path', { d: 'M40,140 L40,40 L140,40 M1060,40 L1160,40 L1160,140 M1160,610 L1160,710 L1060,710 M140,710 L40,710 L40,610', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 5, opacity: 0.8 }, finder);
  const zoomTxt = T(finder, 1130, 690, 'ZOOM ×1', { size: 30, weight: 700, anchor: 'end', fill: '#FFFFFF' });

  /* ================= D: Cubert's confessional ================= */
  const conf = pbConf(Lset, 'cube');
  const faces = G(Lfg);
  E('rect', { x: -300, y: -150, width: 600, height: 300, rx: 22, fill: 'rgba(10,27,39,0.88)', stroke: GOLD, 'stroke-width': 4 }, faces);
  T(faces, 0, -96, 'ONE DICE, SIX FACES', { size: 34, weight: 800, anchor: 'middle', fill: GOLD, ls: 2 });
  const fdice = [];
  for (let i = 0; i < 6; i++) {
    const x = -225 + i * 90, d = mkDice(faces, i + 1, { size: 64 }); tr(d, x, -10);
    const lab = mkMath(faces, x, 90, '1/6', { size: 30, anchor: 'middle', fill: C.ink });
    fdice.push([d, lab]);
  }
  const cEq = chipAt(Lfg, 'each face **equally likely**', { col: GOLD, size: 30 });
  // Mr Tan's close-up card
  const dieCard = G(Lfg);
  E('rect', { x: -260, y: -80, width: 520, height: 160, rx: 20, fill: '#FFFDF6', stroke: '#8FA3B8', 'stroke-width': 5 }, dieCard);
  mkText(dieCard, 0, -18, 'one **die**, two **dice**', { size: 40, anchor: 'middle', fill: MK.ink, boldFill: '#C62828' });
  mkText(dieCard, 0, 44, '(technically)', { size: 30, anchor: 'middle', fill: '#5A6670' });
  const cFinal = chipAt(Lfg, '"...so **final**."', { col: RED, size: 34 });

  /* ================= F: title card ================= */
  const titleShot = G(Lset);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#0E1E3A', '#1F3E6E', true) }, titleShot);
  let rays = '';
  for (let i = 0; i < 16; i++) { const a0 = i / 16 * TAU, a1 = a0 + TAU / 40; rays += `M0,0 L${(Math.cos(a0) * 1100).toFixed(0)},${(Math.sin(a0) * 1100).toFixed(0)} L${(Math.cos(a1) * 1100).toFixed(0)},${(Math.sin(a1) * 1100).toFixed(0)} Z `; }
  const rayP = E('path', { d: rays, fill: GOLD, opacity: 0.06 }, titleShot);
  const tRain = E('path', { d: '', stroke: '#9FC4E0', 'stroke-width': 2.5, 'stroke-linecap': 'round', opacity: 0.45 }, titleShot);
  const rr = rng(20), tDrops = []; for (let i = 0; i < 40; i++) tDrops.push([rr() * 1300, rr(), 0.7 + rr() * 0.5]);
  E('ellipse', { cx: 600, cy: 620, rx: 600, ry: 160, fill: glow('#6EC8FF'), opacity: 0.3 }, titleShot);
  const logo = G(Lfg);
  const logo1 = T(logo, 0, -70, 'WHAT ARE THE', { size: 58, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 6 });
  const logo2 = T(logo, 0, 26, 'CHANCES?', { size: 104, weight: 800, anchor: 'middle', fill: GOLD, ls: 2 });
  [logo1, logo2].forEach(w => { w.setAttribute('stroke', '#0A1430'); w.setAttribute('stroke-width', 12); w.setAttribute('paint-order', 'stroke'); w.setAttribute('stroke-linejoin', 'round'); });
  const ldice = [[-370, -10, 5], [370, -10, 2]].map(([x, y, f]) => { const d = mkDice(logo, f, { size: 74 }); tr(d, x, y); return d; });
  const epi = T(Lfg, 600, 300, 'Episode 20: Seventy Per Cent Chance of Game Night', { size: 36, weight: 700, anchor: 'middle', fill: '#FFFFFF' });

  /* ================= the cast ================= */
  const kav = cast(Lcast, 'kavya');
  const mum = cast(Lcast, 'mum', { prop: 'phone' });
  const dad = cast(Lcast, 'dad', { prop: null });
  const tan = cast(Lcast, 'tan', { prop: null });
  const priya = cast(Lcast, 'priya', { prop: null });
  const boy = cast(Lcast, 'boy');
  const cube = cast(Lcast, 'cube');
  const lt = { kavya: pbLowerThird(Lhud, 'kavya'), mum: pbLowerThird(Lhud, 'mum'), dad: pbLowerThird(Lhud, 'dad'), tan: pbLowerThird(Lhud, 'tan'),
    priya: pbLowerThird(Lhud, 'priya'), cube: pbLowerThird(Lhud, 'cube'), boy: pbLowerThird(Lhud, 'boy') };
  const ltOn = (t, who, t0) => lt[who].set(win(t, t0, t0 + 3.1, 0.3));
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cut points */
  const k = id => at(id) - 0.06;
  const cB = k('nine'), cC = k('box'), cD = k('hi'), cT = k('die'), cD2 = k('final'), cE = k('seven'), cF = k('title');
  const thunder = end('likely') + 0.1;

  return t => {
    op(blackout, 1 - P(t, 0, 0.6, linear));
    const sA = on(t, -1, cB), sB = on(t, cB, cC), sC = on(t, cC, cD), sD = on(t, cD, cT) || on(t, cD2, cE), sT = on(t, cT, cD2),
      sE = on(t, cE, cF), sF = on(t, cF, 1e9);
    const flatOn = sA || sB || sE || sT;
    for (const kk in lt) lt[kk].set(0);
    const show = { kav: 0, mum: 0, dad: 0, tan: 0, priya: 0, boy: 0, cube: 0 };
    // reset the foreground
    [forecast, scl, basket, basketX, box, bolt1, faces, dieCard, logo, epi].forEach(e => op(e, 0));
    [cKav, cSat, cBlk, cRain, cDry, cFeel, c9, cP7, cEq, cFinal].forEach(c => c.set(0));
    stamp.set(0);

    /* ---------- the living room ---------- */
    op(Lset.firstChild, flatOn); op(flat.front, flatOn); op(flat.top, flatOn);
    if (flatOn) {
      const raining = t > thunder ? 1 : 0;
      flat.upd(t, raining);
      flat.clock(sA ? 8 : 9, sA ? Math.min(20, t * 0.4) : 5 + (t - cB) * 0.2);
      const fl = sA ? Math.max(P(t, thunder, 0.08, linear) * (1 - P(t, thunder + 0.12, 0.5, linear)), P(t, thunder + 0.35, 0.05, linear) * (1 - P(t, thunder + 0.42, 0.3, linear))) : 0;
      flat.flash(fl);
    }
    if (sA) {
      show.kav = 1; show.mum = 1;
      tr(kav, 330, 418, 1.0); tr(mum, 640, 410, 1.02);
      let km = 'happy', kl = 0.6, mm = 'neutral', ml = 0;
      if (t >= at('mum')) { km = 'neutral'; kl = 0.7; mm = t < at('dad') ? 'neutral' : 'deadpan'; ml = t < at('dad') ? -0.4 : 0.8; }
      if (t >= at('likely')) { km = 'deadpan'; kl = 0.9; }
      if (t > thunder) { km = 'smug'; kl = 0.9; mm = 'smug'; ml = 0.8; }
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
      mum.set({ t, talk: scTalk(S, t, 'mum'), mood: mm, look: ml, lift: t >= at('mum') - 0.2 && t < at('dad') + 0.4 ? 1 : 0 });
      // Dad rises with his picnic basket
      if (t >= at('dad') - 0.35) {
        show.dad = 1;
        const up = P(t, at('dad') - 0.35, 0.4, easeOut);
        tr(dad, 910, lerp(640, 410, up), 1.02);
        dad.set({ t, talk: scTalk(S, t, 'dad'), mood: t > thunder ? 'shock' : 'smug', look: t > thunder ? -1 : -0.6 });
        op(basket, 1);
        ltOn(t, 'dad', at('dad') + 0.05);
      }
      // chips
      popSet(cKav, t, mid('kavya', 0.05), at('mum'), 330, 230);
      popSet(cSat, t, mid('kavya', 0.4), at('mum'), 760, 220);
      popSet(cBlk, t, mid('kavya', 0.62), at('mum'), 760, 290);
      ltOn(t, 'kavya', at('kavya') + 1.6);
      if (t >= at('mum') && t < at('dad')) {
        const fp = P(t, at('mum') + 0.1, 0.4, pop);
        op(forecast, clamp(fp * 3)); tr(forecast, 900, 330, Math.max(0.01, 0.62 * (0.7 + 0.3 * fp))); forecast.flash(0.5 + 0.5 * Math.sin(t * 8));
        ltOn(t, 'mum', at('mum') + 0.05);
      }
      popSet(cRain, t, mid('mum', 0.55), at('dad'), 640, 200);
      popSet(cDry, t, mid('dad', 0.1), at('likely'), 640, 200);
      popSet(cFeel, t, mid('dad', 0.5), at('likely'), 910, 280);
      // the scale: 0.7 is likely
      if (t >= at('likely')) {
        const sp = P(t, at('likely') + 0.05, 0.35, pop);
        op(scl, clamp(sp * 3)); tr(scl, 600, 190, Math.max(0.01, 0.8 + 0.2 * sp));
        tr(sclMark, lerp(-270, 270, 0.7 * P(t, mid('likely', 0.3), 0.6, easeOut)), 0);
        op(sclLikely, P(t, mid('likely', 0.5), 0.25, linear)); tr(sclLikely, 108, 0); op(sclImp, 0);
      }
      if (t > thunder) { op(bolt1, 1 - P(t, thunder + 0.6, 0.3, linear)); tr(bolt1, 1060, 240, 1.6 + 0.2 * Math.sin(t * 30) * AMP, 12); }
    }

    /* ---------- B: 9 a.m., Mr Tan and Priya ---------- */
    if (sB) {
      show.kav = 1; show.dad = 1; show.tan = 1;
      tr(kav, 300, 418, 1.0); kav.set({ t, mood: t < at('priya') ? 'happy' : 'deadpan', look: t < at('priya') ? 0.7 : 0.9 });
      tr(dad, 1010, 414, 0.96); dad.set({ t, mood: 'sad', look: -0.7 });
      op(basket, 1); op(basketX, P(t, cB + 0.3, 0.3, linear)); tr(basket, 960, 556);
      popSet(c9, t, at('nine') + 0.1, at('tan'), 600, 200);
      // Mr Tan comes in from the right, the box on the table
      const inn = P(t, at('tan') - 0.4, 0.5, easeOut);
      tr(tan, lerp(1300, 560, inn), 410, 1.02);
      tan.set({ t, talk: scTalk(S, t, 'tan'), mood: 'happy', look: t < at('priya') ? -0.5 : 0.7 });
      op(box, inn); tr(box, lerp(1300, 600, inn), 556, 0.62);
      ltOn(t, 'tan', at('tan') + 0.1);
      if (t >= at('priya') - 0.3) {
        show.priya = 1;
        const up = P(t, at('priya') - 0.3, 0.35, pop);
        tr(priya, 790, lerp(660, 418, up), 1.0);
        priya.set({ t, talk: scTalk(S, t, 'priya'), mood: 'smug', look: -0.3 });
        ltOn(t, 'priya', at('priya') + 0.05);
      }
    }

    /* ---------- C: zoom into the game box ---------- */
    op(boxShot, sC); op(finder, sC);
    if (sC) {
      const z = P(t, cC + 0.2, cD - cC - 0.2, easeIn);
      const kz = 0.7 * Math.pow(4.2 / 0.7, z);
      view(boxWrap, kz, 600, lerp(470, 395, z), 600, 375);
      bigBox.open(P(t, mid('box', 0.35), 0.8, easeOut));
      setText(zoomTxt, 'ZOOM ×' + (kz / 0.7).toFixed(1));
    }

    /* ---------- D: Cubert's confessional ---------- */
    conf.set(sD, t);
    if (sD) {
      show.cube = 1;
      const late = t >= cD2;
      const push = late ? P(t, cD2, cE - cD2, linear) : 0;
      tr(cube, 330, 400, 1.3 * (1 + 0.08 * push));
      let mood = 'smug', arms = 0;
      if (t < at('hi') + 0.4) mood = 'neutral';
      if (late) { mood = 'sad'; arms = P(t, cD2 + 0.1, 0.5, easeOut); }
      cube.set({ t, talk: scTalk(S, t, 'cube'), mood, look: late ? 0 : 0.3, arms });
      ltOn(t, 'cube', at('hi') + 0.1);
      if (!late) {
        const fp = P(t, mid('hi', 0.2), 0.4, pop);
        op(faces, clamp(fp * 3)); tr(faces, 860, 330, Math.max(0.01, 0.8 + 0.2 * fp));
        fdice.forEach(([d, lab], i) => { const q = P(t, mid('hi', 0.25 + i * 0.06), 0.25, linear); op(d, q); op(lab, P(t, mid('hi', 0.6), 0.3, linear)); d.set(i + 1, Math.sin(t * 2 + i) * 6 * AMP); });
        popSet(cEq, t, mid('hi', 0.62), cT, 860, 560);
      } else popSet(cFinal, t, mid('final', 0.6), 1e9, 860, 330);
    }

    /* ---------- the "die" close-up: Mr Tan ---------- */
    if (sT) {
      show.tan = 1;
      tr(tan, 420, 400, 1.35);
      tan.set({ t, talk: scTalk(S, t, 'tan'), mood: t > end('die') ? 'smug' : 'neutral', look: 0.6 });
      const dp = P(t, mid('die', 0.3), 0.35, pop);
      op(dieCard, clamp(dp * 3)); tr(dieCard, 860, 300, Math.max(0.01, 0.8 + 0.2 * dp));
    }

    /* ---------- E: "Roll me a seven!" ---------- */
    if (sE) {
      show.boy = 1; show.cube = 1; show.kav = 1;
      tr(kav, 260, 420, 0.96); kav.set({ t, mood: t > end('no') ? 'smug' : 'neutral', look: 0.7 });
      tr(boy, 900, 432, 1.05);
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: t > end('no') + 0.1 ? 'shock' : 'happy', look: -0.8, lift: t < at('no') ? 1 : 0 });
      ltOn(t, 'boy', at('seven') + 0.05);
      // Cubert on the table, rolling; he stops and answers
      const roll = t < at('no') ? Math.sin(t * 9) * 10 * AMP : 0;
      tr(cube, 580, 436 - (t < at('no') ? Math.abs(Math.sin(t * 9)) * 22 * AMP : 0), 0.82, roll);
      cube.set({ t, talk: scTalk(S, t, 'cube'), mood: t < at('no') ? 'shock' : 'annoyed', look: 0.7 });
      if (t >= at('no')) {
        const sp = P(t, at('no') + 0.05, 0.35, pop);
        op(scl, clamp(sp * 3)); tr(scl, 600, 190, Math.max(0.01, 0.8 + 0.2 * sp));
        tr(sclMark, -270, 0); op(sclLikely, 0); op(sclImp, 1); tr(sclImp, -150, 0);
        popSet(cP7, t, mid('no', 0.25), 1e9, 870, 330);
      }
      stamp.set(P(t, mid('no', 0.72), 0.35, linear)); tr(stamp, 610, 320, 0.66);
    }

    /* ---------- F: title card ---------- */
    op(titleShot, sF);
    if (sF) {
      tr(rayP, 600, 600, 1, (t * 6 * AMP) % 360);
      let d = '';
      tDrops.forEach(([x, ph, sp]) => { const f = (ph + t * sp * 0.8) % 1; d += `M${(x - f * 60).toFixed(1)},${(f * 800 - 30).toFixed(1)} l-6,22 `; });
      tRain.setAttribute('d', d);
      const lp = P(t, at('title') + 0.05, 0.6, pop);
      op(logo, clamp(lp * 2.5)); tr(logo, 600, 170, Math.max(0.01, 0.5 + 0.5 * lp));
      ldice.forEach((dd, i) => dd.set([5, 2][i], Math.sin(t * 2 + i * 2) * 14 * AMP));
      op(epi, P(t, mid('title', 0.42), 0.4, linear));
      const castT = i => mid('title', 0.5) + i * 0.13, xs = [180, 390, 600, 810, 1020];
      const row = [[mum, 'happy', 0.66, 'mum'], [kav, 'smug', 0.8, 'kav'], [cube, 'smug', 0.66, 'cube'], [dad, 'happy', 0.66, 'dad'], [boy, 'happy', 0.76, 'boy']];
      row.forEach(([c, mood, s, key], i) => {
        const p = P(t, castT(i), 0.45, pop);
        show[key] = 1; op(c, clamp(p * 3));
        tr(c, xs[i], 540 + 30 * (1 - clamp(p)), Math.max(0.01, s * p));
        c.set({ t, mood, look: 0, lift: 0, arms: key === 'cube' ? 0.8 : 0 });
      });
    }

    /* characters not in this shot */
    if (!sF) { op(kav, show.kav); op(mum, show.mum); op(dad, show.dad); op(boy, show.boy); op(cube, show.cube); }
    op(tan, show.tan); op(priya, show.priya);
  };
});
