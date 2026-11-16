/* Scene 0: Cold open (no chapter card).
   9 a.m., the HDB kitchen: Kavya, 12 -> Mum with the party list (20 kids, void deck, 4 p.m.) -> Dad in an apron:
   "Piece of cake." (famous last words #1) -> Ah Boy in a party hat wants 1/8 "because eight is the biggest" -> Kavya:
   1/4 vs 1/8 cakes -> "I've done maths" (8 > 4) -> documentary zoom into the 3/4 mark on Mum's measuring jug, into
   the fraction bar -> Vinny's confessional (the fraction bar, a bouncer: tops upstairs, bottoms downstairs; numerator
   and denominator on 3/4; 1/8 < 1/4 bars) -> back in the kitchen, Vinny on the counter: "one-oneth" = the whole cake
   -> house rules, STOP palm, NOT ON MY BAR! -> title card (PIECE OF / CAKE written as a fraction). */
scene('cold', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);          // hard sitcom cut
  const view = (el, k, fx, fy, sx, sy) => el.setAttribute('transform', `translate(${sx.toFixed(1)} ${sy.toFixed(1)}) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); };
  const chipAt = (parent, text, o) => { o = o || {}; return mkChip(parent, text, { size: o.size || 30, col: o.col || C.ink }); };
  const PINK = '#FF8FC8', GOLD = '#FFE45C', BLUE = '#2E6FD8';
  const outline = (el, col, w) => { el.setAttribute('stroke', col); el.setAttribute('stroke-width', w); el.setAttribute('paint-order', 'stroke'); el.setAttribute('stroke-linejoin', 'round'); };

  /* layers: sets, characters behind the counter, the counter, foreground, HUD */
  const Lbg = G(root), Lcast = G(root), Lfront = G(root), Ltop = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= A, D: the kitchen ================= */
  const kitShot = G(Lbg);
  const kit = fcKitchen(kitShot);
  Lfront.appendChild(kit.front); Ltop.appendChild(kit.top);
  const jug = fcMeasuringJug(kit.top, { level: 0.75 }); tr(jug, 400, 548, 0.55);
  const list = G(Lfg);   // Mum's party list
  E('rect', { x: -150, y: -110, width: 300, height: 220, rx: 12, fill: '#FFFDF6', stroke: '#B8A27A', 'stroke-width': 4 }, list);
  T(list, 0, -68, 'PARTY LIST', { size: 30, weight: 800, anchor: 'middle', fill: '#C62828' });
  const li = ['20 kids', 'void deck', '4 p.m.'].map((s, i) => mkText(list, -110, -16 + i * 46, '• ' + s, { size: 30, fill: MK.ink, weight: 700 }));
  const ch = {
    kav: chipAt(Lfg, 'Kavya, age **12**', { size: 32 }),
    sat: chipAt(Lfg, 'Saturday, **9 a.m.**', { col: GOLD }),
    party: chipAt(Lfg, "party at **4 p.m.**", { col: PINK }),
    flw: chipAt(Lfg, 'famous last words **#1**', { col: '#FF8A8A', size: 28 }),
    big: chipAt(Lfg, '**8 > 4**, so {{1/8}} > {{1/4}}?', { col: GOLD, size: 32 }),
    same: chipAt(Lfg, '**same-size** pieces', { col: GOLD, size: 32 }),
    adds: chipAt(Lfg, 'nobody adds the **bottoms**', { col: '#FF8A8A', size: 30 }),
  };
  const bubBoy = mkSpeechBubble(Lfg, 'I want {{1/8}}!', { size: 40, tail: 'down', tailX: 60 });
  const bubOne = mkSpeechBubble(Lfg, 'I want {{1/1}}!', { size: 40, tail: 'down', tailX: 60 });
  // two cakes: 1/4 and 1/8 (the pieces Ah Boy is choosing between)
  const cakes = G(Lfg);
  E('rect', { x: -330, y: -150, width: 660, height: 300, rx: 22, fill: 'rgba(10,27,39,0.9)', stroke: '#4A6A7E', 'stroke-width': 3 }, cakes);
  const CAKE = '#F6D8A8', HI = '#FF5FA2';
  const pie4 = mkPie(cakes, [1, 1, 1, 1], { r: 92, cols: [HI, CAKE, CAKE, CAKE], stroke: '#6B4423' }); tr(pie4, -160, -10);
  const pie8 = mkPie(cakes, [1, 1, 1, 1, 1, 1, 1, 1], { r: 92, cols: [HI, CAKE, CAKE, CAKE, CAKE, CAKE, CAKE, CAKE], stroke: '#6B4423' }); tr(pie8, 160, -10);
  mkMath(cakes, -160, 134, '1/4', { size: 40, anchor: 'middle', fill: GOLD });
  mkMath(cakes, 160, 134, '1/8', { size: 40, anchor: 'middle', fill: GOLD });
  const cakesGt = mkText(cakes, 0, 6, '**>**', { size: 60, anchor: 'middle', fill: '#9FE0B5' });
  // the whole cake (one-oneth)
  const whole = G(Lfg);
  E('rect', { x: -170, y: -170, width: 340, height: 330, rx: 22, fill: 'rgba(10,27,39,0.9)', stroke: '#4A6A7E', 'stroke-width': 3 }, whole);
  mkPie(whole, [1], { r: 100, cols: [HI], stroke: '#6B4423' }); tr(whole.lastChild, 0, -40);
  const wholeT = mkText(whole, 0, 120, '{{1/1}} = **1 whole cake**', { size: 30, anchor: 'middle', fill: GOLD });
  const stamp = fcStamp(Lfg, false);

  /* ================= B: zoom into the 3/4 mark on the measuring jug ================= */
  const jugShot = G(Lbg), jugWrap = G(jugShot);
  E('rect', { x: -400, y: -300, width: 2000, height: 1350, fill: linGrad('#DDF0FA', '#A9CFE4', false) }, jugWrap);
  E('rect', { x: -400, y: -300, width: 2000, height: 1350, fill: '#FFF6EA', opacity: 0.35 }, jugWrap);
  for (let i = 0; i < 4; i++) {
    const y = 120 + i * 170;
    E('line', { x1: 240, y1: y, x2: 560, y2: y, stroke: '#C62828', 'stroke-width': 10 }, jugWrap);
  }
  E('path', { d: 'M150,-100 L170,900', stroke: '#FFFFFF', 'stroke-width': 26, opacity: 0.45, 'stroke-linecap': 'round' }, jugWrap);
  // the big 3/4 next to the third mark (y = 460): its fraction bar is what we zoom into
  const CX = 700, BAR = 290;
  const n3 = T(jugWrap, CX, BAR - 26, '3', { size: 150, weight: 800, anchor: 'middle', fill: '#C62828' });
  const vin = E('rect', { x: CX - 70, y: BAR - 7, width: 140, height: 14, rx: 7, fill: '#C62828' }, jugWrap);
  const d4 = T(jugWrap, CX, BAR + 128, '4', { size: 150, weight: 800, anchor: 'middle', fill: '#C62828' });
  [[120, '1'], [460, '1/2'], [630, '1/4']].forEach(([y, src]) => { const m = mkMath(jugWrap, 610, y + 24, src, { size: 70, fill: '#C62828', anchor: 'start' }); op(m, 0.55); });
  const finder = G(Lhud);
  E('path', { d: 'M40,140 L40,40 L140,40 M1060,40 L1160,40 L1160,140 M1160,610 L1160,710 L1060,710 M140,710 L40,710 L40,610', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 5, opacity: 0.85 }, finder);
  const zoomTxt = T(finder, 1130, 690, 'ZOOM ×1', { size: 30, weight: 700, anchor: 'end', fill: '#FFFFFF' });
  const zoomTag = T(finder, 70, 130, "Mum's measuring jug", { size: 28, weight: 700, anchor: 'start', fill: '#FFFFFF', font: FB });
  [zoomTxt, zoomTag].forEach(w => outline(w, '#0A1B27', 6));

  /* ================= C: Vinny's confessional ================= */
  const conf = fcConf(Lbg, 'vinny');
  const board = G(Lfg);
  E('rect', { x: -300, y: -230, width: 600, height: 460, rx: 20, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, board);
  // hi: the door sign
  const door = G(board);
  T(door, 0, -150, 'THE FRACTION BAR', { size: 40, weight: 800, anchor: 'middle', fill: '#2A2F38', ls: 2 });
  const upT = mkText(door, 0, -60, '**TOPS**: upstairs ↑', { size: 38, anchor: 'middle', fill: BLUE });
  E('rect', { x: -230, y: -12, width: 460, height: 22, rx: 11, fill: '#2A2F38' }, door);
  const dnT = mkText(door, 0, 92, '**BOTTOMS**: downstairs ↓', { size: 38, anchor: 'middle', fill: '#C62828' });
  T(door, 0, 180, 'members only. same-size pieces.', { size: 26, weight: 600, anchor: 'middle', fill: '#5A6670', font: FB });
  // num: 3/4 with its labels and a bar of 4 equal parts, 3 shaded
  const numG = G(board);
  const big34 = mkMath(numG, -205, -40, '3/4', { size: 110, anchor: 'middle', fill: MK.ink });
  const numL = mkText(numG, -130, -100, '**numerator**: pieces you\'ve got', { size: 27, fill: BLUE });
  const denL = mkText(numG, -130, 18, '**denominator**: equal pieces', { size: 27, fill: '#C62828' });
  const denL2 = mkText(numG, -130, 54, 'in **one whole**', { size: 27, fill: '#C62828' });
  const fb34 = mkFractionBar(numG, 4, 3, { w: 480, h: 66, col: '#FFC247', cellLabels: true, size: 28 }); tr(fb34, 0, 150);
  // size: 1/4 vs 1/8 bars of the same whole
  const sizeG = G(board);
  T(sizeG, 0, -170, 'same whole, cut more ways', { size: 30, weight: 700, anchor: 'middle', fill: '#5A6670', font: FB });
  const fb4 = mkFractionBar(sizeG, 4, 1, { w: 440, h: 60, col: '#FF5FA2', cellLabels: true, size: 26 }); tr(fb4, -55, -90);
  const fb8 = mkFractionBar(sizeG, 8, 1, { w: 440, h: 60, col: '#FF5FA2', cellLabels: true, size: 22 }); tr(fb8, -55, 10);
  mkText(sizeG, 180, -80, '4 parts', { size: 26, anchor: 'start', fill: '#5A6670' });
  mkText(sizeG, 180, 20, '8 parts', { size: 26, anchor: 'start', fill: '#5A6670' });
  const ltM = mkMath(sizeG, 0, 150, '1/8 < 1/4', { size: 76, anchor: 'middle', fill: '#C62828' });
  // the bar's own bracket: the two shaded parts side by side
  const cmpG = G(sizeG);
  E('rect', { x: -275, y: -125, width: 110, height: 70, fill: 'none', stroke: '#2E6FD8', 'stroke-width': 5, rx: 4 }, cmpG);
  E('rect', { x: -275, y: -25, width: 55, height: 70, fill: 'none', stroke: '#2E6FD8', 'stroke-width': 5, rx: 4 }, cmpG);

  /* ================= E: title card ================= */
  const titleShot = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#3A1050', '#8E2A7A', true) }, titleShot);
  let rays = '';
  for (let i = 0; i < 16; i++) { const a0 = i / 16 * TAU, a1 = a0 + TAU / 40; rays += `M0,0 L${(Math.cos(a0) * 1100).toFixed(0)},${(Math.sin(a0) * 1100).toFixed(0)} L${(Math.cos(a1) * 1100).toFixed(0)},${(Math.sin(a1) * 1100).toFixed(0)} Z `; }
  const rayP = E('path', { d: rays, fill: '#FFE45C', opacity: 0.07 }, titleShot);
  const conf8 = G(titleShot), rr = rng(41), CONF = ['#FF5FA2', '#FFE45C', '#4CC9F0', '#56D69B', '#FFFFFF'];
  const confetti = [];
  for (let i = 0; i < 26; i++) { const c = E('rect', { x: -6, y: -3, width: 12, height: 6, fill: CONF[i % 5] }, conf8); confetti.push([c, rr() * 1200, rr() * 750, rr() * 360, 20 + rr() * 40]); }
  E('ellipse', { cx: 600, cy: 620, rx: 620, ry: 170, fill: glow('#FF8FC8'), opacity: 0.35 }, titleShot);
  const logo = G(Lfg);
  const logo1 = T(logo, 0, -46, 'PIECE OF', { size: 76, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 6 });
  const logoBar = E('rect', { x: -250, y: -22, width: 500, height: 20, rx: 10, fill: GOLD, stroke: '#3A0820', 'stroke-width': 5 }, logo);
  const logo2 = T(logo, 0, 82, 'CAKE', { size: 110, weight: 800, anchor: 'middle', fill: GOLD, ls: 8 });
  [logo1, logo2].forEach(w => outline(w, '#3A0820', 12));
  const epi = T(Lfg, 600, 330, 'Episode 4: Ah Boy Turns Eight', { size: 42, weight: 700, anchor: 'middle', fill: '#FFFFFF' });

  /* ================= the cast ================= */
  const kav = cast(Lcast, 'kavya');
  const mum = cast(Lcast, 'mum', { prop: 'paper' });
  const dad = cast(Lcast, 'dad', { style: 'apron', under: 'tee', shirt: '#3D8B6E', apron: '#FFFFFF', apronText: 'CHEF' });
  const boy = cast(Lcast, 'boy', { hat: '#4CC9F0' });
  const vinC = cast(Lcast, 'vinny');      // in the confessional
  const vinK = cast(Ltop, 'vinny');       // on the counter (in front of it)
  const lt = { kavya: fcLowerThird(Lhud, 'kavya'), mum: fcLowerThird(Lhud, 'mum'), dad: fcLowerThird(Lhud, 'dad'), boy: fcLowerThird(Lhud, 'boy'), vinny: fcLowerThird(Lhud, 'vinny') };
  const ltOn = (t, who, t0) => lt[who].set(win(t, t0, t0 + 3.1, 0.3));
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cut points */
  const cB = at('tiny') - 0.06, cC = at('hi') - 0.06, cD = at('oneth') - 0.06, cE = at('title') - 0.06;
  const KY = 452;   // bust y behind the kitchen counter

  return t => {
    op(blackout, 1 - P(t, 0, 0.6, linear));
    const sA = on(t, -1, cB), sB = on(t, cB, cC), sC = on(t, cC, cD), sD = on(t, cD, cE), sE = on(t, cE, 1e9);
    const kitOn = sA || sD;
    for (const k in lt) lt[k].set(0);
    for (const k in ch) ch[k].set(0);
    bubBoy.set(0); bubOne.set(0); stamp.set(0);
    op(list, 0); op(cakes, 0); op(whole, 0);
    const show = { kav: 0, mum: 0, dad: 0, boy: 0, vinC: 0, vinK: 0 };

    /* ---------- A: the kitchen, 9 a.m. ---------- */
    op(kitShot, kitOn); op(kit.front, kitOn); op(kit.top, kitOn);
    if (sA) tr(jug, 400, 548, 0.55);
    if (kitOn) { kit.clock(sA ? 9 : 9, sA ? 0 : 2); kit.oven(sD ? 0.3 : 0); }
    if (sA) {
      // Kavya, left
      show.kav = 1;
      tr(kav, 230, KY, 1.0);
      let km = 'neutral', kl = 0.3;
      if (t < at('mum')) km = t < mid('kavya', 0.6) ? 'neutral' : 'happy';
      else if (t < at('dad')) { km = 'shock'; kl = 0.7; }
      else if (t < at('boy')) { km = 'deadpan'; kl = 0.9; }
      else if (t < at('quarter')) { km = 'neutral'; kl = 0.9; }
      else if (t < at('maths')) { km = 'neutral'; kl = 0.9; }
      else { km = 'deadpan'; kl = 0.9; }
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
      ch.kav.set(t < at('mum') ? P(t, mid('kavya', 0.05), 0.35, linear) : 0);
      ch.sat.set(t < at('mum') ? P(t, mid('kavya', 0.38), 0.35, linear) : 0); tr(ch.sat, 820, 300);
      ch.party.set(t < at('mum') ? P(t, mid('kavya', 0.7), 0.35, linear) : 0); tr(ch.party, 820, 370);
      tr(ch.kav, 230, 250);
      ltOn(t, 'kavya', at('kavya') + 1.2);
      // Mum bursts in from the right with the party list
      if (t >= at('mum') - 0.3) {
        show.mum = 1;
        const inP = P(t, at('mum') - 0.3, 0.4, easeOut);
        tr(mum, lerp(1300, 560, inP), KY - 8, 1.0);
        mum.set({ t, talk: scTalk(S, t, 'mum'), mood: t < at('dad') ? 'happy' : t < at('boy') ? 'deadpan' : 'neutral', look: t < at('dad') ? 0.6 : t < at('quarter') ? 0.8 : -0.6, lift: t < at('dad') ? 1 : 0 });
        ltOn(t, 'mum', at('mum') + 0.1);
        if (t < at('dad')) { op(list, P(t, mid('mum', 0.15), 0.3, linear)); tr(list, 790, 260, 0.9, 3); li.forEach((l, i) => op(l, P(t, mid('mum', 0.2 + i * 0.18), 0.25, linear))); }
      }
      // Dad rises behind the counter in his apron
      if (t >= at('dad') - 0.35) {
        show.dad = 1;
        const up = P(t, at('dad') - 0.35, 0.4, easeOut);
        tr(dad, 820, lerp(660, KY - 8, up), 1.0);
        dad.set({ t, talk: scTalk(S, t, 'dad'), mood: t < at('boy') ? 'smug' : t < at('maths') ? 'neutral' : 'happy', look: t < at('boy') ? -0.4 : 0.8, lift: t < at('boy') ? 1 : 0 });
        ltOn(t, 'dad', at('dad') + 0.05);
        if (t < at('boy')) { ch.flw.set(P(t, mid('dad', 0.65), 0.3, linear)); tr(ch.flw, 820, 230); }
      }
      // Ah Boy pops up between Kavya and Mum
      if (t >= at('boy') - 0.3) {
        show.boy = 1;
        const up = P(t, at('boy') - 0.3, 0.35, pop);
        tr(boy, 1030, lerp(680, KY + 12, up), 1.0);
        let bm = 'happy';
        if (t >= at('quarter') && t < at('maths')) bm = 'neutral';
        if (t >= at('maths')) bm = 'smug';
        boy.set({ t, talk: scTalk(S, t, 'boy'), mood: bm, look: t < at('quarter') ? -0.3 : -0.9, lift: t < at('quarter') ? 1 : 0 });
        ltOn(t, 'boy', at('boy') + 0.05);
        if (t < at('quarter')) { bubBoy.set(P(t, mid('boy', 0.3), 0.3, linear)); tr(bubBoy, 960, 250); }
      }
      // quarter: the two cakes
      if (t >= at('quarter') && t < at('maths')) {
        const p = P(t, at('quarter') + 0.05, 0.4, pop);
        op(cakes, clamp(p * 3)); tr(cakes, 600, 250, Math.max(0.01, 0.8 + 0.2 * p));
        pie4.set(P(t, at('quarter') + 0.1, 0.5, linear)); pie8.set(P(t, at('quarter') + 0.3, 0.5, linear));
        op(cakesGt, P(t, mid('quarter', 0.6), 0.25, linear));
      }
      if (t >= at('maths')) { ch.big.set(P(t, mid('maths', 0.3), 0.3, linear)); tr(ch.big, 640, 170); }
    }

    /* ---------- B: documentary zoom into the 3/4 on the jug ---------- */
    op(jugShot, sB); op(finder, sB);
    if (sB) {
      const z = P(t, cB + 0.3, cC - cB - 0.3, easeIn);
      const k = 0.55 * Math.pow(16 / 0.55, z);
      view(jugWrap, k, lerp(600, CX, z), lerp(375, BAR, z), 600, 375);
      const zr = k / 0.55;
      setText(zoomTxt, 'ZOOM ×' + (zr >= 10 ? String(Math.round(zr)) : zr.toFixed(1)));
    }

    /* ---------- C: Vinny's confessional ---------- */
    conf.set(sC, t);
    op(board, 0);
    if (sC) {
      show.vinC = 1;
      tr(vinC, 300, 420, 1.12);
      let vm = 'deadpan', vl = 0;
      if (t < at('num')) vm = t < mid('hi', 0.45) ? 'neutral' : 'smug';
      else if (t < at('size')) { vl = 0.5; vm = 'neutral'; }
      else { vl = 0.6; vm = t > mid('size', 0.75) ? 'smug' : 'deadpan'; }
      vinC.set({ t, talk: scTalk(S, t, 'vinny'), mood: vm, look: vl });
      ltOn(t, 'vinny', at('hi') + 0.1);
      const bp = P(t, mid('hi', 0.2), 0.4, pop);
      op(board, clamp(bp * 3)); tr(board, 850, 360, Math.max(0.01, 0.85 + 0.15 * bp));
      const inHi = t < at('num'), inNum = t >= at('num') && t < at('size'), inSize = t >= at('size');
      op(door, inHi ? 1 : 0); op(numG, inNum ? 1 : 0); op(sizeG, inSize ? 1 : 0);
      if (inHi) { op(upT, P(t, mid('hi', 0.4), 0.25, linear)); op(dnT, P(t, mid('hi', 0.6), 0.25, linear)); }
      if (inNum) {
        op(big34, P(t, at('num'), 0.3, linear));
        op(numL, P(t, mid('num', 0.08), 0.3, linear));
        op(denL, P(t, mid('num', 0.5), 0.3, linear)); op(denL2, P(t, mid('num', 0.62), 0.3, linear));
        op(fb34, P(t, mid('num', 0.75), 0.3, linear)); fb34.set(3 * P(t, mid('num', 0.8), 0.6, linear));
      }
      if (inSize) {
        op(fb8, P(t, mid('size', 0.05), 0.3, linear)); op(fb4, P(t, mid('size', 0.3), 0.3, linear));
        op(cmpG, P(t, mid('size', 0.55), 0.25, linear));
        op(ltM, P(t, mid('size', 0.6), 0.3, linear));
      }
    }

    /* ---------- D: back in the kitchen, Vinny on the counter ---------- */
    if (sD) {
      show.kav = 1; show.boy = 1; show.vinK = 1; show.dad = 1;
      tr(kav, 210, KY, 1.0);
      tr(dad, 1030, KY - 8, 1.0);
      tr(boy, 400, KY + 12, 1.0);
      const inWhole = t >= at('whole'), inRules = t >= at('rules');
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: inWhole ? (inRules ? 'neutral' : 'happy') : 'happy', look: 0.8, lift: t < at('whole') ? 1 : 0 });
      kav.set({ t, mood: inWhole && !inRules ? 'deadpan' : 'neutral', look: 0.8 });
      dad.set({ t, mood: inRules ? 'shock' : 'neutral', look: -0.8 });
      // Vinny hops onto the counter
      const hop = P(t, cD, 0.4, pop);
      tr(vinK, 760, lerp(620, 548 - 114 * 0.62, hop), 0.62);
      vinK.set({ t, talk: scTalk(S, t, 'vinny'), mood: inRules ? 'annoyed' : 'deadpan', look: -0.6, stop: inRules && t > mid('rules', 0.55) ? 1 : 0 });
      tr(jug, 575, 548, 0.55);
      if (!inWhole) { bubOne.set(P(t, mid('oneth', 0.25), 0.3, linear)); tr(bubOne, 470, 250); }
      if (inWhole && !inRules) {
        const p = P(t, at('whole') + 0.05, 0.4, pop);
        op(whole, clamp(p * 3)); tr(whole, 760, 230, Math.max(0.01, 0.7 + 0.3 * p));
      }
      if (inRules) {
        ch.same.set(P(t, mid('rules', 0.1), 0.3, linear)); tr(ch.same, 330, 240);
        ch.adds.set(P(t, mid('rules', 0.38), 0.3, linear)); tr(ch.adds, 860, 240);
        stamp.set(P(t, mid('rules', 0.66), 0.35, linear)); tr(stamp, 640, 340, 0.55);
      }
    }

    /* ---------- E: title card ---------- */
    op(titleShot, sE); op(logo, 0); op(epi, 0);
    if (sE) {
      tr(rayP, 600, 640, 1, (t * 6 * AMP) % 360);
      confetti.forEach(([c, x, y, r0, sp], i) => tr(c, x, (y + (t - cE) * sp * AMP) % 760, 1, r0 + t * 90 * AMP));
      const lp = P(t, at('title') + 0.05, 0.6, pop);
      op(logo, clamp(lp * 2.5)); tr(logo, 600, 170, Math.max(0.01, 0.5 + 0.5 * lp));
      op(epi, P(t, mid('title', 0.42), 0.4, linear));
      const castT = i => mid('title', 0.5) + i * 0.13, xs = [180, 390, 600, 810, 1020];
      const row = [[mum, 'happy', 0.68, 'mum'], [kav, 'smug', 0.72, 'kav'], [vinC, 'deadpan', 0.5, 'vinC'], [boy, 'happy', 0.8, 'boy'], [dad, 'smug', 0.68, 'dad']];
      row.forEach(([c, mood, s, key], i) => {
        const p = P(t, castT(i), 0.45, pop);
        show[key] = 1; op(c, clamp(p * 3));
        tr(c, xs[i], 540 + 30 * (1 - clamp(p)), Math.max(0.01, s * p));
        c.set({ t, mood, look: 0, lift: 0, stop: 0 });
      });
    }

    /* characters not in this shot */
    if (!sE) { op(mum, show.mum); op(kav, show.kav); op(vinC, show.vinC); op(boy, show.boy); op(dad, show.dad); }
    op(vinK, show.vinK);
  };
});
