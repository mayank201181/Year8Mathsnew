/* Scene 0: Cold open (no chapter card).
   A  9 a.m., Studio 5, wide: Kavya at the TEAM KAVYA desk (Priya and Mr Tan, with Pythagoras, at theirs) ->
      Benny Lim springs up with the microphone: $1000, APPLAUSE -> Dad rises: "ABOVE average" -> Mum rises: "$1000" ->
      Dad: "EXTREMELY average" (Kavya and Mum to camera) -> Kavya: "That's the whole point."
   B  the documentary zoom into the little scoreboard (viewfinder, ZOOM readout).
   C  the giant scoreboard: Mean, Medi, Mo and Ranger in their panels; Mean shares five cube towers (2, 7, 3, 5, 8)
      out fairly: every tower 5 -> Ah Boy peeks in: "You look a bit mean."
   D  Mean's confessional: "I am not mean. I am THE Mean." -> Otto bursts in from the right; Mean tilts towards him,
      the bubble sliding, sweating -> "Absolutely not. That is an outlier."
   E  title card: PERFECTLY AVERAGE, Episode 19, the cast pops in. */
scene('cold', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);          // hard sitcom cut
  const view = (el, k, fx, fy, sx, sy) => el.setAttribute('transform', `translate(${sx.toFixed(1)} ${sy.toFixed(1)}) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const popSet = (el, t, t0, t1, x, y) => { const p = t >= t0 && t < t1 ? P(t, t0, 0.35, linear) : 0; el.set(p); if (x !== undefined) tr(el, x, y); };
  const GOLD = AS.gold, PINK = '#FFC2E8';
  const outline = (w, col) => { w.setAttribute('stroke', col); w.setAttribute('stroke-width', 10); w.setAttribute('paint-order', 'stroke'); w.setAttribute('stroke-linejoin', 'round'); };

  /* layers: sets, characters, the desk, foreground, HUD */
  const Lbg = G(root), Lcast = G(root), Lfront = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= A, B: Studio 5 ================= */
  const studioShot = G(Lbg);
  const studio = asStudio(studioShot);
  Lfront.appendChild(studio.front); Lfront.appendChild(studio.top);
  ['MEAN', 'MEDIAN', 'MODE', 'RANGE'].forEach((s, i) => studio.board.set(i, '?'));
  const carrier = asCarrier(studio.top); tr(carrier, 1092, 530, 0.7);
  const cKav = mkChip(Lfg, 'Kavya, age 12', { size: 30, col: C.ink });
  const cSat = mkChip(Lfg, 'Saturday, **9 a.m.**', { size: 30, col: GOLD });
  const cStu = mkChip(Lfg, '**Studio 5**: game shows', { size: 30, col: PINK });
  const cPrize = mkChip(Lfg, 'prize: **$1000**', { size: 36, col: GOLD });
  const cAbove = mkChip(Lfg, '**ABOVE** average ↑', { size: 32, col: '#7FD3FF' });
  const cExtreme = mkChip(Lfg, '**EXTREMELY** average', { size: 32, col: '#FF8A8A' });
  const cMoney = mkChip(Lfg, '**$1000**', { size: 40, col: GOLD });
  // the viewfinder for the zoom
  const finder = G(Lhud);
  E('path', { d: 'M40,140 L40,40 L140,40 M1060,40 L1160,40 L1160,140 M1160,610 L1160,710 L1060,710 M140,710 L40,710 L40,610', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 5, opacity: 0.8 }, finder);
  const recDot = E('circle', { cx: 1040, cy: 676, r: 9, fill: '#FF3B3B' }, finder);
  T(finder, 1056, 686, 'REC', { size: 26, weight: 700, fill: '#FFFFFF' });
  const zoomTxt = T(finder, 70, 690, 'ZOOM ×1', { size: 30, weight: 700, fill: '#FFFFFF' });

  /* ================= C: the giant scoreboard ================= */
  const boardShot = G(Lbg);
  const board = asBoardShot(boardShot);
  // the fair-share card: five cube towers 2, 7, 3, 5, 8 level out to 5
  const card = asScreen(Lfg, 480, 380, { title: 'FAIR SHARE' });
  const CU = 28, BASE = 140, TX = [-160, -80, 0, 80, 160], HTS = [2, 7, 3, 5, 8];
  const towers = G(card.content);
  const cubeAt = (i, lv) => [TX[i] - CU / 2, BASE - (lv + 1) * CU];
  const cube = (col) => E('rect', { x: 0, y: 0, width: CU, height: CU, fill: col, stroke: '#334155', 'stroke-width': 2 }, towers);
  const MOVES = [[1, 5, 0, 2], [1, 6, 0, 3], [4, 5, 0, 4], [4, 6, 2, 3], [4, 7, 2, 4]];   // [from tower, level, to tower, level]
  const moving = new Set(MOVES.map(m => m[0] + ':' + m[1]));
  HTS.forEach((h, i) => { for (let lv = 0; lv < h; lv++) if (!moving.has(i + ':' + lv)) { const c = cube('#C7D2FE'); const [x, y] = cubeAt(i, lv); attr(c, 'x', x); attr(c, 'y', y); } });
  const gaps = MOVES.map(([, , ti, tl]) => { const [x, y] = cubeAt(ti, tl); return E('rect', { x, y, width: CU, height: CU, fill: '#BBF7D0', stroke: '#15803D', 'stroke-width': 2, 'stroke-dasharray': '4 3' }, towers); });
  const movers = MOVES.map(() => cube('#FECACA'));
  TX.forEach((x, i) => T(card.content, x, BASE + 32, String(HTS[i]), { size: 28, weight: 700, anchor: 'middle', fill: MK.ink }));
  const meanLine = E('line', { x1: -205, y1: BASE - 5 * CU, x2: 205, y2: BASE - 5 * CU, stroke: '#B91C1C', 'stroke-width': 4, 'stroke-dasharray': '10 7' }, card.content);
  const meanLab = mkText(card.content, -200, BASE - 5 * CU - 14, 'every tower: **5**', { size: 28, fill: '#B91C1C' });
  const cFair = mkChip(Lfg, 'share it out **fairly**', { size: 32, col: GOLD });
  const cSum = mkChip(Lfg, '{{2 + 7 + 3 + 5 + 8 = 25}}, {{25 ÷ 5 = 5}}', { size: 30, col: C.ink });

  /* ================= D: Mean's confessional ================= */
  const conf = asConf(Lbg, 'mean');
  const plaque = G(Lfg);
  E('rect', { x: -260, y: -170, width: 520, height: 340, rx: 20, fill: '#2A1E06', stroke: GOLD, 'stroke-width': 5 }, plaque);
  const pT = T(plaque, 0, -104, 'THE MEAN', { size: 52, weight: 800, anchor: 'middle', fill: GOLD, ls: 4 });
  outline(pT, '#120C02');
  const unkind = G(plaque);
  T(unkind, -20, -36, 'mean (= unkind)', { size: 34, weight: 700, anchor: 'middle', fill: '#FF8A8A' });
  E('line', { x1: -150, y1: -46, x2: 110, y2: -46, stroke: '#FF6060', 'stroke-width': 5 }, unkind);
  tr(cross(unkind, 18), 160, -48);
  const fairM = mkMath(plaque, 0, 70, '"mean" = "total"/"number of values"', { size: 40, fill: '#FFF4D6', anchor: 'middle' });
  const cOut = mkChip(Lfg, '**OUTLIER**', { size: 36, col: '#FF6070' });
  const outArrow = arrow(Lfg, 720, 230, 830, 300, { color: '#FF6070', width: 6 });

  /* ================= E: title card ================= */
  const titleShot = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#1A0B36', '#5B2A9E', true) }, titleShot);
  let rays = '';
  for (let i = 0; i < 16; i++) { const a0 = i / 16 * TAU, a1 = a0 + TAU / 40; rays += `M0,0 L${(Math.cos(a0) * 1100).toFixed(0)},${(Math.sin(a0) * 1100).toFixed(0)} L${(Math.cos(a1) * 1100).toFixed(0)},${(Math.sin(a1) * 1100).toFixed(0)} Z `; }
  const rayP = E('path', { d: rays, fill: GOLD, opacity: 0.07 }, titleShot);
  E('ellipse', { cx: 600, cy: 610, rx: 600, ry: 170, fill: glow('#FF5FC8'), opacity: 0.3 }, titleShot);
  const logo = G(Lfg);
  const logo1 = T(logo, 0, -78, 'PERFECTLY', { size: 62, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 8 });
  const logo2 = T(logo, 0, 30, 'AVERAGE', { size: 116, weight: 800, anchor: 'middle', fill: GOLD, ls: 4 });
  [logo1, logo2].forEach(w => outline(w, '#2A0B4A'));
  // a spirit level under the logo: the bubble wobbles, then settles in the middle
  const lvl = G(logo); tr(lvl, 0, 84);
  E('rect', { x: -250, y: -20, width: 500, height: 40, rx: 12, fill: linGrad('#FFE07A', '#F2B21C', true), stroke: '#2A0B4A', 'stroke-width': 5 }, lvl);
  E('rect', { x: -60, y: -13, width: 120, height: 26, rx: 13, fill: '#C8F59A', stroke: '#2A0B4A', 'stroke-width': 3 }, lvl);
  E('path', { d: 'M-16,-13 L-16,13 M16,-13 L16,13', stroke: '#2A0B4A', 'stroke-width': 3 }, lvl);
  const lvlBub = E('ellipse', { cx: 0, cy: 0, rx: 13, ry: 8, fill: '#F4FFE8', stroke: '#6E9E3A', 'stroke-width': 2 }, lvl);
  const epi = T(Lfg, 600, 410, 'Episode 19: The Most Average Family in Singapore', { size: 38, weight: 700, anchor: 'middle', fill: '#FFFFFF' });

  /* ================= the cast ================= */
  const mum = cast(Lcast, 'mum'), kav = cast(Lcast, 'kavya'), dad = cast(Lcast, 'dad');
  const priya = cast(Lcast, 'priya'), tan = cast(Lcast, 'tan');
  const mean = cast(Lcast, 'mean'), medi = cast(Lcast, 'medi'), mo = cast(Lcast, 'mo'), ranger = cast(Lcast, 'ranger');
  const otto = cast(Lcast, 'otto');
  const benny = cast(Lfg, 'benny');
  const boy = cast(Lfg, 'boy');
  Lfg.appendChild(logo); Lfg.appendChild(epi);   // keep the title above the cast row
  const LT = ['kavya', 'benny', 'dad', 'mum', 'mean', 'boy', 'otto'];
  const lt = {}; LT.forEach(k => { lt[k] = asLowerThird(Lhud, k); });
  const ltOn = (t, who, t0) => lt[who].set(win(t, t0, t0 + 3.1, 0.3));
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cut points */
  const k = id => at(id) - 0.06;
  const cB = k('tiny'), cC = k('hi'), cD = k('not'), cE = k('title');
  const POS = { mum: [165, 440, 0.92], kav: [330, 440, 0.95], dad: [495, 440, 0.92], priya: [785, 446, 0.88], tan: [965, 440, 0.88] };

  return t => {
    op(blackout, 1 - P(t, 0, 0.6, linear));
    const sA = on(t, -1, cB), sB = on(t, cB, cC), sC = on(t, cC, cD), sD = on(t, cD, cE), sE = on(t, cE, 1e9);
    for (const kk in lt) lt[kk].set(0);
    [cKav, cSat, cStu, cPrize, cAbove, cExtreme, cMoney, cFair, cSum, cOut].forEach(c => c.set(0));
    op(outArrow, 0);
    const show = { mum: 0, kav: 0, dad: 0, priya: 0, tan: 0, mean: 0, medi: 0, mo: 0, ranger: 0, otto: 0, benny: 0, boy: 0 };
    Lcast.removeAttribute('transform'); Lfront.removeAttribute('transform');

    /* ---------- A, B: the studio ---------- */
    const studioOn = sA || sB;
    op(studioShot, studioOn); op(Lfront, studioOn); op(finder, sB);
    if (studioOn) {
      studio.upd(t);
      let kz = 1 + 0.06 * P(t, 0, cB, linear), fx = 600, fy = 375, sx = 600, sy = 375;
      if (sB) {
        const z = P(t, cB + 0.25, cC - cB - 0.6, ease);
        kz = 1.06 * Math.pow(2.3 / 1.06, z); fx = lerp(600, 887, z); fy = lerp(375, 100, z);
        setText(zoomTxt, 'ZOOM ×' + kz.toFixed(1));
        op(recDot, Math.sin(t * TAU * 0.8) > 0 ? 1 : 0.15);
        [0, 1, 2, 3].forEach(i => studio.board.lit(i, t > mid('tiny', 0.25 + i * 0.12) ? 1 : 0));
      } else [0, 1, 2, 3].forEach(i => studio.board.lit(i, 0));
      [studioShot, Lcast, Lfront].forEach(el => view(el, kz, fx, fy, sx, sy));
      studio.applause.set(t > mid('benny', 0.55) && t < at('above') + 0.4 ? 1 : 0);
      carrier.set({ t, look: t < at('benny') ? 0.6 : -0.3 });

      show.kav = 1; show.priya = 1; show.tan = 1;
      tr(kav, ...POS.kav);
      tr(priya, ...POS.priya); tr(tan, ...POS.tan);
      // moods and looks
      let km = 'neutral', kl = 0;
      if (t < at('benny')) { km = t < mid('kavya', 0.5) ? 'neutral' : 'happy'; kl = Math.sin(t * 1.4) * 0.7; }
      else if (t < at('above')) { km = 'happy'; kl = 0.9; }
      else if (t < at('money')) { km = 'deadpan'; kl = 0.8; }
      else if (t < at('extreme')) { km = 'neutral'; kl = -0.8; }
      else if (t < at('point')) { km = 'deadpan'; kl = t > end('extreme') ? 0 : 0.8; }
      else { km = 'annoyed'; kl = 0.8; }
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
      priya.set({ t, mood: t < at('benny') ? 'smug' : 'happy', look: t < at('above') ? 0.8 : -0.8 });
      tan.set({ t, mood: t > at('extreme') ? 'deadpan' : 'neutral', look: t < at('above') ? 0.6 : -0.9 });
      // Dad and Mum rise behind the desk
      if (t >= at('above') - 0.35) {
        show.dad = 1;
        const up = P(t, at('above') - 0.35, 0.4, easeOut);
        tr(dad, POS.dad[0], lerp(640, POS.dad[1], up), POS.dad[2]);
        dad.set({ t, talk: scTalk(S, t, 'dad'), mood: t < at('point') ? 'smug' : 'neutral', look: t < at('money') ? 0.3 : -0.8 });
      }
      if (t >= at('money') - 0.35) {
        show.mum = 1;
        const up = P(t, at('money') - 0.35, 0.4, easeOut);
        tr(mum, POS.mum[0], lerp(640, POS.mum[1], up), POS.mum[2]);
        let mm = 'deadpan', ml = 0.8;
        if (t >= at('extreme') && t < end('extreme')) ml = 0.8;
        else if (t >= end('extreme') && t < at('point')) ml = 0;
        mum.set({ t, talk: scTalk(S, t, 'mum'), mood: mm, look: ml });
      }
      // Benny springs up from the bottom right, then slides out
      if (t >= at('benny') - 0.25 && t < at('money')) {
        show.benny = 1;
        const up = P(t, at('benny') - 0.25, 0.45, pop), out = P(t, end('benny') + 0.3, 0.5, easeIn);
        tr(benny, 1010 + 360 * out, lerp(980, 560, up), 0.98);
        const talk = scTalk(S, t, 'benny');
        benny.set({ t, talk, mood: 'happy', look: -0.7, lift: talk > 0 || t < end('benny') ? 1 : 0, ting: win(t, mid('benny', 0.78), end('benny') + 0.2, 0.15) });
      }
      // chips
      if (sA) {
        popSet(cKav, t, mid('kavya', 0.08), at('benny'), 330, 262);
        popSet(cSat, t, mid('kavya', 0.45), at('benny'), 860, 252);
        popSet(cStu, t, mid('kavya', 0.62), at('benny'), 860, 318);
        popSet(cPrize, t, mid('benny', 0.7), at('above'), 640, 330);
        popSet(cAbove, t, mid('above', 0.55), at('extreme') + 0.15, 560, 264);
        popSet(cMoney, t, mid('money', 0.55), at('point'), 165, 262);
        if (cMoney.set && t >= mid('money', 0.55) && t < at('point')) tr(cMoney, 165, 262, 1 + 0.06 * Math.sin(t * 9));
        popSet(cExtreme, t, at('extreme') + 0.15, 1e9, 575, 264);
        ltOn(t, 'kavya', at('kavya') + 2.2);
        ltOn(t, 'benny', at('benny') + 0.3);
        ltOn(t, 'dad', at('above') + 0.1);
        if (t > end('above') + 0.4) ltOn(t, 'mum', at('money') + 0.05);
        if (t > at('money') + 3.1 && t < at('extreme')) lt.dad.set(0);
      }
    }

    /* ---------- C: the giant scoreboard ---------- */
    op(boardShot, sC); op(card, 0);
    if (sC) {
      show.mean = 1; show.medi = 1; show.mo = 1; show.ranger = 1;
      const sl = board.slots;
      const pop0 = P(t, at('hi') - 0.05, 0.4, pop);
      tr(mean, sl[0].x, sl[0].y + 30, 0.72 * (0.85 + 0.15 * pop0));
      tr(medi, sl[1].x, sl[1].y + 14, 0.74); tr(mo, sl[2].x, sl[2].y, 0.7); tr(ranger, sl[3].x - 24, sl[3].y + 20, 0.74);
      const levelled = t > mid('hi', 0.96);
      board.lit(0, 1);
      [1, 2, 3].forEach(i => board.lit(i, 0));
      board.set(0, levelled ? '5' : '?'); board.set(1, '?'); board.set(2, '?'); board.set(3, '?');
      const who = scWho(S, t);
      mean.set({ t, talk: scTalk(S, t, 'mean'), mood: t < at('look') ? (t < mid('hi', 0.5) ? 'smug' : 'happy') : (t > end('look') + 0.2 ? 'annoyed' : 'neutral'), look: t >= at('look') ? 0.9 : 0, arms: t > mid('hi', 0.45) && t < at('look') ? 1 : 0 });
      medi.set({ t, mood: 'neutral', look: -0.8 });
      mo.set({ t, mood: 'happy', look: -0.8, hearts: 0 });
      ranger.set({ t, mood: 'neutral', look: -0.8, reach: 30 });
      ltOn(t, 'mean', at('hi') + 0.2);
      // the fair-share card over panels 2-3
      const cp = P(t, mid('hi', 0.36), 0.35, easeOut) * (1 - P(t, at('look') - 0.25, 0.2, linear));
      if (cp > 0) {
        op(card, 1); tr(card, 880, lerp(860, 400, cp)); card.upd(t);
        const mv = P(t, mid('hi', 0.56), 2.3, linear);
        MOVES.forEach(([fi, fl, ti, tl], j) => {
          const p = ease(clamp(mv * MOVES.length - j)), [x0, y0] = cubeAt(fi, fl), [x1, y1] = cubeAt(ti, tl);
          attr(movers[j], 'x', lerp(x0, x1, p)); attr(movers[j], 'y', lerp(y0, y1, p) - Math.sin(p * Math.PI) * 50);
          attr(movers[j], 'fill', p >= 1 ? '#C7D2FE' : '#FECACA');
          op(gaps[j], p >= 1 ? 0 : 1);
        });
        const done = P(t, mid('hi', 0.56) + 2.3, 0.3, linear);
        op(meanLine, done); op(meanLab, done);
        popSet(cFair, t, mid('hi', 0.4), at('look') - 0.2, 880, 640);
        if (done > 0) { cFair.set(0); popSet(cSum, t, mid('hi', 0.56) + 2.35, at('look') - 0.2, 880, 640); }
      }
      // Ah Boy peeks in at the bottom right
      if (t >= at('look') - 0.35) {
        show.boy = 1;
        const up = P(t, at('look') - 0.35, 0.35, pop);
        tr(boy, 1040, lerp(820, 556, up), 0.95);
        boy.set({ t, talk: scTalk(S, t, 'boy'), mood: 'happy', look: -0.9, lift: 1 });
        ltOn(t, 'boy', at('look') - 0.1);
      }
    }

    /* ---------- D: the confessional ---------- */
    conf.set(sD, t); op(plaque, 0);
    if (sD) {
      show.mean = 1;
      // Otto arrives and drags Mean over
      const oIn = P(t, at('otto') - 0.3, 0.7, easeOut);
      const pull = P(t, at('otto') + 0.4, 2.2, ease);
      let ang = 13 * pull;
      if (t >= at('no')) ang = 13 - 7 * P(t, at('no'), 0.6, ease) + 8 * P(t, mid('no', 0.75), 1.4, easeIn);   // he fights it, then loses
      const push = 1 + 0.05 * P(t, cD, at('otto') - cD, linear);
      tr(mean, 330 + 24 * pull, 430, 1.32 * push, ang * AMP);
      let mm = 'deadpan', ml = 0;
      if (t < at('otto')) { mm = t < mid('not', 0.4) ? 'annoyed' : 'deadpan'; }
      else if (t < at('no')) { mm = t < at('otto') + 0.5 ? 'deadpan' : 'shock'; ml = 0.9; }
      else { mm = t < mid('no', 0.25) ? 'shock' : 'annoyed'; ml = t < mid('no', 0.5) ? 0 : 0.9; }
      mean.set({ t, talk: scTalk(S, t, 'mean'), mood: mm, look: ml, tilt: ang * AMP, sweat: pull, arms: t >= at('no') ? 1 : 0 });
      const pp = P(t, mid('not', 0.15), 0.4, pop) * (1 - P(t, at('otto') - 0.35, 0.25, linear));
      op(plaque, clamp(pp * 2.5)); tr(plaque, 860, 350, Math.max(0.01, 0.75 + 0.25 * pp));
      op(fairM, P(t, mid('not', 0.55), 0.3, linear));
      if (oIn > 0) {
        show.otto = 1;
        tr(otto, lerp(1450, 960, oIn), 420 + Math.sin(t * 3) * 6 * AMP, 0.95);
        otto.set({ t, talk: scTalk(S, t, 'otto'), mood: 'happy', look: -0.9, wave: 1 });
        ltOn(t, 'otto', at('otto') + 0.2);
      }
      if (t >= at('no')) {
        popSet(cOut, t, mid('no', 0.45), 1e9, 700, 190);
        op(outArrow, P(t, mid('no', 0.5), 0.3, linear)); outArrow.set(P(t, mid('no', 0.5), 0.35, linear));
      }
    }

    /* ---------- E: title card ---------- */
    op(titleShot, sE); op(logo, 0); op(epi, 0);
    if (sE) {
      tr(rayP, 600, 610, 1, (t * 6 * AMP) % 360);
      const lp = P(t, at('title') + 0.05, 0.6, pop);
      op(logo, clamp(lp * 2.5)); tr(logo, 600, 190, Math.max(0.01, 0.5 + 0.5 * lp));
      const settle = P(t, at('title') + 0.4, 2.2, linear);
      attr(lvlBub, 'cx', (Math.sin(settle * 14) * 70 * (1 - settle) * AMP).toFixed(1));
      op(epi, P(t, mid('title', 0.42), 0.4, linear));
      const castT = i => mid('title', 0.5) + i * 0.13, xs = [170, 385, 600, 815, 1030];
      const row = [[benny, 'benny', 0.66, 'happy'], [kav, 'kav', 0.72, 'smug'], [mean, 'mean', 0.5, 'deadpan'], [dad, 'dad', 0.66, 'smug'], [mum, 'mum', 0.66, 'happy']];
      row.forEach(([c, key, s, mood], i) => {
        const p = P(t, castT(i), 0.45, pop);
        show[key] = p > 0 ? 1 : 0;
        tr(c, xs[i], (key === 'mean' ? 585 : 560) + 30 * (1 - clamp(p)), Math.max(0.01, s * p));
        c.set({ t, mood, look: 0, lift: 0, ting: key === 'benny' ? win(t, castT(0) + 0.3, castT(0) + 0.9, 0.15) : 0, tilt: 0 });
      });
    }

    op(mum, show.mum); op(kav, show.kav); op(dad, show.dad); op(priya, show.priya); op(tan, show.tan);
    op(mean, show.mean); op(medi, show.medi); op(mo, show.mo); op(ranger, show.ranger); op(otto, show.otto);
    op(benny, show.benny); op(boy, show.boy); op(carrier, studioOn ? 1 : 0);
  };
});
