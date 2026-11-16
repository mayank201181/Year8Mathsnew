/* Scene 0: Cold open (no chapter card).
   10 a.m., Plaza Seratus, the Great Singapore Sale: Kavya, 12 -> the family: Mum's $200 budget and rule one (never pay
   full price), Dad's "a hundred and ten per cent", Kavya: "a hundred per cent is everything", Ah Boy's banner maths
   (50% off then another 20% off = 70% off?) -> documentary zoom into the "%" on the banner -> Percy's confessional
   (the per cent sign = out of a hundred; a 100 that fell over; per cento; scorecard: 12 out of 100; "Let's play...")
   -> game-show title card. */
scene('cold', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);          // hard sitcom cut
  const view = (el, k, fx, fy, sx, sy) => el.setAttribute('transform', `translate(${sx.toFixed(1)} ${sy.toFixed(1)}) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const popAt = (el, t, t0, x, y, t1) => { el.set(t >= t0 && t < (t1 === undefined ? 1e9 : t1) ? P(t, t0, 0.4, linear) : 0); tr(el, x, y); };
  const chipM = (parent, text, col, size) => mkChip(parent, text, { size: size || 30, col: col || C.ink });
  const outline = (el, col, w) => { el.setAttribute('stroke', col); el.setAttribute('stroke-width', w); el.setAttribute('paint-order', 'stroke'); el.setAttribute('stroke-linejoin', 'round'); return el; };
  const GOLD = '#FFE45C', PINK = '#FF8FB0', RED = PC.red;

  /* layers: sets, characters, foreground, HUD */
  const Lbg = G(root), Lcast = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= A, B: the mall ================= */
  const mallShot = G(Lbg), mallWrap = G(mallShot);
  const mall = pcMall(mallWrap);
  const aChips = G(Lfg);
  const cKav = chipM(aChips, '**Kavya**, age 12', C.ink, 32);
  const cSat = chipM(aChips, 'Saturday, **10 a.m.**', GOLD, 30);
  const cMall = chipM(aChips, 'Plaza Seratus mall', C.ink, 28);
  // B: the family's chips and the two banners
  const bChips = G(Lfg);
  const cBudget = chipM(bChips, 'Budget: **$200**', GOLD, 36);
  const cRule = chipM(bChips, 'Rule 1: **never pay full price**', PINK, 30);
  const c110 = chipM(bChips, '**110%**!', GOLD, 44);
  const c100 = chipM(bChips, '{{100%}} = **everything**', '#9FE0B5', 32);
  const ban50 = pcBanner(bChips, '**50%** OFF', { w: 340, h: 130, size: 58 });
  const ban20 = pcBanner(bChips, '+ another **20%** OFF', { w: 400, h: 100, size: 36, col: '#C2185B' });
  const cSum = chipM(bChips, '{{50% + 20% = 70%}} off!', GOLD, 34);
  const qMark = T(bChips, 0, 0, '?', { size: 80, weight: 800, anchor: 'middle', fill: '#FF8A8A' });
  outline(qMark, '#1A2430', 8);

  /* ================= C: zoom into the % on the banner ================= */
  const zoomShot = G(Lbg), zWrap = G(zoomShot);
  E('rect', { x: -300, y: -300, width: 1800, height: 1350, fill: linGrad('#F0525E', '#C62838', true) }, zWrap);
  E('rect', { x: 70, y: 90, width: 1060, height: 580, rx: 20, fill: 'none', stroke: GOLD, 'stroke-width': 8, opacity: 0.8 }, zWrap);
  T(zWrap, 520, 470, '50', { size: 300, weight: 800, anchor: 'end', fill: '#FFFFFF' });
  const PX = 700, PY = 370;                                         // the big drawn "%"
  E('path', { d: `M${PX - 62},${PY + 126} L${PX + 62},${PY - 126}`, stroke: '#FFFFFF', 'stroke-width': 44, 'stroke-linecap': 'round' }, zWrap);
  E('circle', { cx: PX - 66, cy: PY - 66, r: 46, fill: 'none', stroke: '#FFFFFF', 'stroke-width': 30 }, zWrap);
  E('circle', { cx: PX + 66, cy: PY + 74, r: 46, fill: 'none', stroke: '#FFFFFF', 'stroke-width': 30 }, zWrap);
  T(zWrap, 600, 620, 'OFF', { size: 96, weight: 800, anchor: 'middle', fill: GOLD, ls: 8 });
  const finder = G(Lhud);
  E('path', { d: 'M40,140 L40,40 L140,40 M1060,40 L1160,40 L1160,140 M1160,610 L1160,710 L1060,710 M140,710 L40,710 L40,610', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 5, opacity: 0.85 }, finder);
  const zoomTxt = T(finder, 1130, 690, 'ZOOM ×1', { size: 30, weight: 700, anchor: 'end', fill: '#FFFFFF' });

  /* ================= D: Percy's confessional ================= */
  const conf = pcConf(Lbg, 'percy');
  const RX = 880, RY = 340;                                         // centre of the right-hand panel
  // hi: the plaque
  const plaque = G(Lfg);
  E('rect', { x: -250, y: -160, width: 500, height: 320, rx: 18, fill: '#2A0810', stroke: GOLD, 'stroke-width': 5 }, plaque);
  T(plaque, 0, -98, 'THE PER CENT SIGN', { size: 38, weight: 800, anchor: 'middle', fill: GOLD, ls: 2 });
  T(plaque, 0, 50, '%', { size: 150, weight: 800, anchor: 'middle', fill: RED });
  mkText(plaque, 0, 126, 'per cent = **out of a hundred**', { size: 32, anchor: 'middle', fill: '#FFFFFF', boldFill: GOLD });
  // lazy: a 100 falls over and becomes %
  const board = G(Lfg);
  E('rect', { x: -260, y: -190, width: 520, height: 380, rx: 20, fill: MK.paper, stroke: '#C9B48A', 'stroke-width': 5 }, board);
  const morph = G(board);
  const one = E('rect', { x: -15, y: -78, width: 30, height: 156, rx: 12, fill: RED, stroke: MK.ink, 'stroke-width': 4 }, morph);
  const zeros = [0, 1].map(() => {
    const z = G(morph);
    E('ellipse', { rx: 44, ry: 70, fill: 'none', stroke: MK.ink, 'stroke-width': 30 }, z);
    E('ellipse', { rx: 44, ry: 70, fill: 'none', stroke: RED, 'stroke-width': 20 }, z);
    return z;
  });
  const lab100 = mkText(board, 0, 150, '**100**: a hundred', { size: 34, anchor: 'middle', fill: MK.ink });
  const labPct = mkText(board, 0, 150, 'a slash and two zeros: **%**', { size: 34, anchor: 'middle', fill: MK.ink, boldFill: RED });
  const thud = T(board, 170, -120, 'thud.', { size: 30, weight: 700, anchor: 'middle', fill: '#8A7A64', font: FB });
  // nonno: from per cento to %
  const hist = G(Lfg);
  E('rect', { x: -275, y: -170, width: 550, height: 340, rx: 16, fill: '#F6E7C4', stroke: '#B8955A', 'stroke-width': 5 }, hist);
  T(hist, 0, -116, "'for each hundred'", { size: 32, weight: 700, anchor: 'middle', fill: '#6B4423', font: FB });
  const st1 = G(hist), st2 = G(hist), st3 = G(hist);
  T(st1, -180, 10, 'per cento', { size: 36, weight: 700, anchor: 'middle', fill: '#4A2E14' });
  T(st1, -180, 70, '1400s', { size: 26, weight: 700, anchor: 'middle', fill: '#8A6A44', font: FB });
  T(st2, -18, 10, 'per', { size: 36, weight: 700, anchor: 'middle', fill: '#4A2E14' });
  E('circle', { cx: 34, cy: -14, r: 8, fill: 'none', stroke: '#4A2E14', 'stroke-width': 4 }, st2);
  E('path', { d: 'M28,12 L52,-20', stroke: '#4A2E14', 'stroke-width': 4, 'stroke-linecap': 'round' }, st2);
  E('circle', { cx: 50, cy: 10, r: 8, fill: 'none', stroke: '#4A2E14', 'stroke-width': 4 }, st2);
  T(st2, 10, 70, 'squashed', { size: 26, weight: 700, anchor: 'middle', fill: '#8A6A44', font: FB });
  T(st3, 190, 24, '%', { size: 84, weight: 800, anchor: 'middle', fill: RED });
  T(st3, 190, 70, 'today', { size: 26, weight: 700, anchor: 'middle', fill: '#8A6A44', font: FB });
  const hArr = [arrow(hist, -88, 0, -64, 0, { color: '#8A6A44', width: 4, head: 14 }), arrow(hist, 84, 0, 128, 0, { color: '#8A6A44', width: 4, head: 14 })];
  const merch = T(hist, 0, 140, 'Italian merchants, scribbling faster', { size: 26, weight: 600, anchor: 'middle', fill: '#6B4423', font: FB });
  // rate: Ah Boy's banner maths, rated
  const rateB = G(Lfg);
  E('rect', { x: -260, y: -150, width: 520, height: 300, rx: 20, fill: MK.paper, stroke: '#C9B48A', 'stroke-width': 5 }, rateB);
  mkText(rateB, 0, -60, '**50%** off, then **20%** off', { size: 36, anchor: 'middle', fill: MK.ink, boldFill: RED });
  mkText(rateB, 0, 10, '= **70%** off?', { size: 44, anchor: 'middle', fill: MK.ink, boldFill: RED });
  const rateX = cross(rateB, 26); tr(rateX, 170, -6);
  const c12 = chipM(Lfg, '**12** out of 100', GOLD, 34);
  // play: game-show bulbs (also on the title card)
  const bulbs = G(Lhud), bulbEls = [];
  for (let i = 0; i < 36; i++) {
    const f = i / 36, per = 2 * (1160 + 710), d0 = f * per;
    let x, y;
    if (d0 < 1160) { x = 20 + d0; y = 20; } else if (d0 < 1160 + 710) { x = 1180; y = 20 + d0 - 1160; } else if (d0 < 2 * 1160 + 710) { x = 1180 - (d0 - 1160 - 710); y = 730; } else { x = 20; y = 730 - (d0 - 2 * 1160 - 710); }
    bulbEls.push(E('circle', { cx: x, cy: y, r: 9, fill: GOLD, stroke: '#7A4A08', 'stroke-width': 2 }, bulbs));
  }
  const cMoney = chipM(Lfg, '**$200**', GOLD, 40);
  const cFam = chipM(Lfg, '**1** family', '#9FE0B5', 36);
  const lets = T(Lfg, 0, 0, "LET'S PLAY...", { size: 76, weight: 800, anchor: 'middle', fill: GOLD });
  outline(lets, '#5A0E1E', 12);

  /* ================= E: title card ================= */
  const titleShot = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#4A0816', '#B3203A', true) }, titleShot);
  let rays = '';
  for (let i = 0; i < 18; i++) { const a0 = i / 18 * TAU, a1 = a0 + TAU / 44; rays += `M0,0 L${(Math.cos(a0) * 1200).toFixed(0)},${(Math.sin(a0) * 1200).toFixed(0)} L${(Math.cos(a1) * 1200).toFixed(0)},${(Math.sin(a1) * 1200).toFixed(0)} Z `; }
  const rayP = E('path', { d: rays, fill: GOLD, opacity: 0.08 }, titleShot);
  E('ellipse', { cx: 600, cy: 640, rx: 620, ry: 160, fill: glow('#FF8FB0'), opacity: 0.35 }, titleShot);
  const logo = G(Lfg);
  const logo1 = T(logo, 0, -84, 'OUT OF A', { size: 56, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 8 });
  const logo2 = T(logo, 0, 18, 'HUNDRED', { size: 112, weight: 800, anchor: 'middle', fill: GOLD, ls: 4 });
  [logo1, logo2].forEach(w => outline(w, '#3A0612', 12));
  const pctL = [-1, 1].map(sd => { const d = T(logo, sd * 360, 6, '%', { size: 90, weight: 800, anchor: 'middle', fill: RED }); outline(d, '#FFFFFF', 6); return d; });
  const epi = T(Lfg, 600, 318, 'Episode 6: The Great Singapore Sale', { size: 40, weight: 700, anchor: 'middle', fill: '#FFFFFF' });

  /* ================= the cast ================= */
  const mum = cast(Lcast, 'mum');
  const dad = cast(Lcast, 'dad');
  const boy = cast(Lcast, 'boy');
  const kav = cast(Lcast, 'kavya');
  const percy = cast(Lcast, 'percy');
  const lt = { kavya: pcLowerThird(Lhud, 'kavya'), mum: pcLowerThird(Lhud, 'mum'), dad: pcLowerThird(Lhud, 'dad'), boy: pcLowerThird(Lhud, 'boy'), percy: pcLowerThird(Lhud, 'percy') };
  const ltOn = (t, who, t0) => lt[who].set(win(t, t0, t0 + 3.1, 0.3));
  tr(lt.dad, 380, 600);   // under Dad himself, not over Mum
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cut points */
  const cB = at('budget') - 0.06, cC = at('tiny') - 0.06, cD = at('hi') - 0.06, cE = at('title') - 0.06;
  const XS = { mum: 300, dad: 540, kav: 790, boy: 1020 };

  return t => {
    op(blackout, 1 - P(t, 0, 0.6, linear));
    const sA = on(t, -1, cB), sB = on(t, cB, cC), sC = on(t, cC, cD), sD = on(t, cD, cE), sE = on(t, cE, 1e9);
    for (const k in lt) lt[k].set(0);
    const show = { mum: 0, dad: 0, boy: 0, kav: 0, percy: 0 };
    const who = scWho(S, t);

    /* ---------- A, B: the mall ---------- */
    op(mallShot, sA || sB); op(aChips, sA); op(bChips, sB);
    if (sA || sB) mall.upd(t);
    if (sA) {
      const push = P(t, 0, cB, linear);
      view(mallWrap, 1 + 0.12 * push, 600, 400, 600, 400);
      show.kav = 1;
      tr(kav, 640, 618, 1.05);
      kav.set({ t, talk: 0, mood: t < mid('kavya', 0.55) ? 'neutral' : 'happy', look: t > mid('kavya', 0.4) ? 0.7 : 0 });
      popAt(cKav, t, mid('kavya', 0.06), 640, 430);
      popAt(cSat, t, mid('kavya', 0.4), 930, 600);
      popAt(cMall, t, mid('kavya', 0.62), 930, 668);
      ltOn(t, 'kavya', at('kavya') + 1.3);
    }
    if (sB) {
      view(mallWrap, 1.45, 600, 330, 600, 290);
      show.mum = show.dad = show.kav = show.boy = 1;
      // positions: the family in a row, hems below the frame
      tr(mum, XS.mum, 612, 1.0); tr(dad, XS.dad, 612, 1.0); tr(kav, XS.kav, 618, 1.0); tr(boy, XS.boy, 640, 1.05);
      // moods and looks
      let mm = 'smug', ml = 0.3, dm = 'happy', dl = -0.4, km = 'neutral', kl = -0.5, bm = 'happy', bl = -0.3, mlift = 0, dlift = 0, blift = 0;
      if (t < at('ten')) { mlift = 1; ml = 0.4; dl = -0.8; kl = -0.8; bl = -0.6; km = 'neutral'; }
      else if (t < at('whole')) { dm = 'happy'; dlift = 1; mm = 'deadpan'; ml = 0.8; km = 'annoyed'; kl = -0.7; bl = -0.6; }
      else if (t < at('boy')) { km = 'annoyed'; kl = -0.8; dm = 'smug'; dl = 0.6; mm = 'neutral'; ml = 0.8; bl = -0.4; }
      else {
        blift = 1; bm = 'happy'; bl = -0.2;
        const after = t > end('boy');
        mm = after ? 'happy' : 'neutral'; dm = after ? 'happy' : 'neutral'; ml = 0.9; dl = 0.9;
        km = after ? 'deadpan' : 'neutral'; kl = 0.8;
      }
      mum.set({ t, talk: scTalk(S, t, 'mum'), mood: mm, look: ml, lift: mlift });
      dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: dl, lift: dlift });
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: bm, look: bl, lift: blift });
      ltOn(t, 'mum', at('budget') + 0.1);
      if (t >= at('ten')) ltOn(t, 'dad', at('ten') + 0.05);
      if (t >= at('boy')) ltOn(t, 'boy', at('boy') + 0.05);
      // chips, in the order said
      popAt(cBudget, t, mid('budget', 0.22), 420, 330, at('ten'));
      popAt(cRule, t, mid('budget', 0.58), 420, 410, at('ten'));
      popAt(c110, t, mid('ten', 0.45), XS.dad, 400, at('boy'));
      popAt(c100, t, mid('whole', 0.6), XS.kav, 410, at('boy'));
      // the banners, then Ah Boy's sum
      const b1 = P(t, mid('boy', 0.05), 0.4, pop), b2 = P(t, mid('boy', 0.35), 0.4, pop);
      op(ban50, t >= at('boy') ? clamp(b1 * 3) : 0); tr(ban50, 880, 170, Math.max(0.01, 0.6 + 0.4 * b1)); ban50.set(Math.sin(t * 1.4) * 2 * AMP);
      op(ban20, t >= at('boy') ? clamp(b2 * 3) : 0); tr(ban20, 880, 300, Math.max(0.01, 0.6 + 0.4 * b2)); ban20.set(Math.sin(t * 1.4 + 1) * 2 * AMP);
      popAt(cSum, t, mid('boy', 0.6), 560, 420);
      const q = P(t, end('boy') + 0.1, 0.35, pop);
      op(qMark, t > end('boy') + 0.1 ? 1 : 0); tr(qMark, 840, 440, Math.max(0.01, q), 12);
    }

    /* ---------- C: zoom into the % ---------- */
    op(zoomShot, sC); op(finder, sC);
    if (sC) {
      const z = P(t, cC + 0.25, cD - cC - 0.25, easeIn);
      const k = 0.9 * Math.pow(16 / 0.9, z);
      view(zWrap, k, lerp(600, PX - 66, z), lerp(380, PY - 66, z), 600, 375);
      setText(zoomTxt, 'ZOOM ×' + (k / 0.9 >= 10 ? String(Math.round(k / 0.9)) : (k / 0.9).toFixed(1)));
    }

    /* ---------- D: Percy's confessional ---------- */
    conf.set(sD, t);
    op(plaque, 0); op(board, 0); op(hist, 0); op(rateB, 0); c12.set(0); cMoney.set(0); cFam.set(0); op(lets, 0);
    const bulbsOn = sD && t >= at('play') - 0.1 || sE;
    op(bulbs, bulbsOn ? 1 : 0);
    if (bulbsOn) bulbEls.forEach((b, i) => op(b, ((Math.floor(t * 8) + i) % 3 === 0) ? 1 : 0.35));
    if (sD) {
      show.percy = 1;
      tr(percy, 330, 400, 1.38);
      let mood = 'happy', look = 0.15, card = 0, mic = 0;
      if (t < at('lazy')) mood = 'happy';
      else if (t < at('nonno')) mood = t > mid('lazy', 0.55) ? 'smug' : 'happy';
      else if (t < at('rate')) { mood = 'neutral'; look = 0.6; }
      else if (t < at('play')) { mood = t > mid('rate', 0.6) ? 'deadpan' : 'smug'; look = 0.5; card = P(t, mid('rate', 0.62), 0.35, pop); }
      else { mood = 'happy'; mic = P(t, at('play'), 0.4, ease); look = 0; }
      percy.set({ t, talk: scTalk(S, t, 'percy'), mood, look, card, score: '12', mic });
      ltOn(t, 'percy', at('hi') + 0.15);
      // hi: the plaque
      if (t < at('lazy')) { const pp = P(t, mid('hi', 0.2), 0.45, pop); op(plaque, clamp(pp * 2.5)); tr(plaque, RX, RY, Math.max(0.01, 0.7 + 0.3 * pp)); }
      // lazy: the 100 falls over
      else if (t < at('nonno')) {
        const bp = P(t, at('lazy') - 0.05, 0.35, pop);
        op(board, clamp(bp * 3)); tr(board, RX, RY, Math.max(0.01, 0.85 + 0.15 * bp));
        const f = P(t, mid('lazy', 0.45), 0.7, easeIn), bounce = Math.sin(clamp((t - mid('lazy', 0.45) - 0.7) / 0.35) * Math.PI) * 10 * (t > mid('lazy', 0.45) + 0.7 ? 1 : 0);
        one.setAttribute('transform', `translate(${lerp(-150, 0, f).toFixed(1)} ${(lerp(-30, -10, f) - bounce).toFixed(1)}) rotate(${lerp(0, 32, f).toFixed(1)}) scale(1 ${lerp(1, 1.3, f).toFixed(3)})`);
        zeros.forEach((z, i) => {
          const x = lerp(i ? 130 : -10, i ? 74 : -74, f), y = lerp(-30, i ? 56 : -76, f) - bounce, s = lerp(1, 0.62, f);
          z.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${s.toFixed(3)})`);
          const ry = lerp(70, 44, f).toFixed(1); z.firstChild.setAttribute('ry', ry); z.lastChild.setAttribute('ry', ry);
        });
        op(lab100, 1 - clamp(f * 2.2)); op(labPct, clamp(f * 2.2 - 1.2));   // no overlap: one label out, then the other in
        op(thud, f >= 1 ? P(t, mid('lazy', 0.45) + 0.7, 0.2, linear) : 0);
      }
      // nonno: per cento -> %
      else if (t < at('rate')) {
        const hp = P(t, at('nonno') - 0.05, 0.35, pop);
        op(hist, clamp(hp * 3)); tr(hist, RX, RY, Math.max(0.01, 0.85 + 0.15 * hp));
        op(st1, P(t, mid('nonno', 0.12), 0.3, linear));
        hArr[0].set(P(t, mid('nonno', 0.62), 0.3, linear)); op(st2, P(t, mid('nonno', 0.68), 0.3, linear));
        hArr[1].set(P(t, mid('nonno', 0.82), 0.3, linear)); op(st3, P(t, mid('nonno', 0.88), 0.3, linear));
        op(merch, P(t, mid('nonno', 0.55), 0.3, linear));
      }
      // rate: the scorecard
      else if (t < at('play')) {
        const rp = P(t, at('rate') - 0.05, 0.35, pop);
        op(rateB, clamp(rp * 3)); tr(rateB, RX, RY - 30, Math.max(0.01, 0.85 + 0.15 * rp));
        op(rateX, P(t, mid('rate', 0.7), 0.25, linear));
        popAt(c12, t, mid('rate', 0.72), RX, RY + 180);
      }
      // play: game-show lights
      else {
        popAt(cMoney, t, mid('play', 0.05), RX - 140, 260);
        popAt(cFam, t, mid('play', 0.3), RX + 120, 260);
        const lp = P(t, mid('play', 0.8), 0.4, pop);
        op(lets, t > mid('play', 0.8) ? clamp(lp * 3) : 0); tr(lets, RX, 430, Math.max(0.01, 0.5 + 0.5 * lp), -4);
      }
    }

    /* ---------- E: title card ---------- */
    op(titleShot, sE); op(logo, 0); op(epi, 0);
    if (sE) {
      tr(rayP, 600, 640, 1, (t * 6 * AMP) % 360);
      const lp = P(t, at('title') + 0.05, 0.6, pop);
      op(logo, clamp(lp * 2.5)); tr(logo, 600, 190, Math.max(0.01, 0.5 + 0.5 * lp));
      pctL.forEach((d, i) => tr(d, (i ? 1 : -1) * 360, 6, 1, Math.sin(t * 2 + i) * 10 * AMP));
      op(epi, P(t, mid('title', 0.42), 0.4, linear));
      const castT = i => mid('title', 0.5) + i * 0.13, xs = [170, 385, 600, 815, 1030];
      const row = [[mum, 'happy', 0.72, 'mum', 560], [kav, 'smug', 0.8, 'kav', 560], [percy, 'happy', 0.82, 'percy', 520], [dad, 'smug', 0.72, 'dad', 560], [boy, 'happy', 0.8, 'boy', 575]];
      row.forEach(([c, mood, s, key, y], i) => {
        const p = P(t, castT(i), 0.45, pop);
        show[key] = 1; op(c, clamp(p * 3));
        tr(c, xs[i], y + 30 * (1 - clamp(p)), Math.max(0.01, s * p));
        c.set({ t, mood, look: 0, lift: key === 'dad' ? 1 : 0, card: key === 'percy' ? 1 : 0, score: '100' });
      });
    }

    /* characters not in this shot */
    if (!sE) { op(mum, show.mum); op(dad, show.dad); op(boy, show.boy); op(kav, show.kav); op(percy, show.percy); }
  };
});
