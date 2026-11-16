/* Scene 7: The fun run, in groups (estimated mean from grouped data: stretch).
   Shots (hard sitcom cuts):
   A  fun-run footage at East Coast Park: runners stream past the FINISH arch; STRETCH round, 40 fun-run times.
   B  the big question screen, a different character in the corner for each line:
      Benny: the grouped table (Time t, f) row by row while a histogram grows
      -> Kavya: midpoint = (20 + 30)/2 = 25, the midpoint column 25, 35, 45, 55 and the dashed midpoint lines,
         the fx column 150, 525, 495, 440, totals 40 and 1610
      -> Mean: estimated mean = 1610/40 = 40.25 minutes; ESTIMATE: every runner slides onto the midpoint line
      -> Priya: (25 + 35 + 45 + 55) ÷ 4 = 40, WAY OFF!  -> Sigma: weight each midpoint by its f (15 runners vs 6)
      -> Mo: modal class 30 ≤ t < 40 glows -> Ranger: an arrow from 20 to 60, range < 40, exactly? unknown. Hold. */
scene('grouped', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const GOLD = AS.gold, GREEN = '#1E9E5A', RED = '#D32F2F', BLUE = '#2E6FD8', PINK = '#FF5FC8';
  const popSet = (el, t, t0, t1, x, y, s) => { const p = t >= t0 && t < t1 ? P(t, t0, 0.35, linear) : 0; el.set(p); if (x !== undefined) tr(el, x, y, s === undefined ? 1 : s); };

  const Lbg = G(root), Lcast = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= A: the fun run ================= */
  const runShot = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 340, fill: linGrad('#5EC4FF', '#CDEFFF', true) }, runShot);
  E('circle', { cx: 1060, cy: 120, r: 110, fill: glow('#FFE45C') }, runShot);
  E('circle', { cx: 1060, cy: 120, r: 46, fill: '#FFE45C' }, runShot);
  E('rect', { x: 0, y: 330, width: 1200, height: 56, fill: '#2E8FC9' }, runShot);   // the sea
  E('path', { d: 'M60,332 L160,332 M420,340 L560,340 M800,334 L900,334', stroke: '#FFFFFF', 'stroke-width': 3, opacity: 0.6 }, runShot);
  E('path', { d: 'M90,300 L120,248 L150,300 Z M940,306 L966,262 L992,306 Z', fill: '#FFFFFF', stroke: '#8FA3B8', 'stroke-width': 2 }, runShot);   // sails
  E('rect', { x: 0, y: 386, width: 1200, height: 364, fill: '#5BBF6A' }, runShot);
  E('rect', { x: 0, y: 520, width: 1200, height: 120, fill: '#D9C29A' }, runShot);   // the park connector
  E('path', { d: 'M0,520 L1200,520 M0,640 L1200,640', stroke: '#B59D72', 'stroke-width': 4 }, runShot);
  // palm trees
  [[230, 386], [720, 386]].forEach(([x, y]) => {
    E('path', { d: `M${x},${y} Q${x + 10},${y - 80} ${x - 6},${y - 150}`, fill: 'none', stroke: '#8A5A2B', 'stroke-width': 14, 'stroke-linecap': 'round' }, runShot);
    E('path', { d: `M${x - 6},${y - 150} q-60,-10 -90,30 M${x - 6},${y - 150} q60,-14 92,24 M${x - 6},${y - 150} q-30,-40 -70,-36 M${x - 6},${y - 150} q34,-42 74,-30`, fill: 'none', stroke: '#2E8B3A', 'stroke-width': 14, 'stroke-linecap': 'round' }, runShot);
  });
  // the finish arch
  const arch = G(runShot); tr(arch, 960, 640);
  E('rect', { x: -170, y: -250, width: 20, height: 250, fill: '#FF5FC8', stroke: SC_INK, 'stroke-width': 3 }, arch);
  E('rect', { x: 150, y: -250, width: 20, height: 250, fill: '#FF5FC8', stroke: SC_INK, 'stroke-width': 3 }, arch);
  E('rect', { x: -180, y: -300, width: 360, height: 64, rx: 12, fill: '#2A1150', stroke: GOLD, 'stroke-width': 5 }, arch);
  T(arch, 0, -256, 'FUN RUN · FINISH', { size: 32, weight: 800, anchor: 'middle', fill: GOLD, ls: 2 });
  const clock = T(arch, 0, -320, '', { size: 30, weight: 800, anchor: 'middle', fill: '#2A1150' });
  const RUN = [['#FF6B5C', '#C98E62'], ['#4CC9F0', '#8D5A3B'], ['#FFC247', '#E8B48A'], ['#56D69B', '#C98E62'], ['#B48CFF', '#F2D2AA']];
  const runners = RUN.map(([shirt, skin], i) => person(runShot, { shirt, skin, shorts: '#2A3A5A', hair: '#1E1A2E' }));
  const cStretch = mkChip(Lfg, '**STRETCH** round', { size: 34, col: GOLD });
  const c40 = mkChip(Lfg, '**40** audience members, **40** fun-run times', { size: 30, col: C.ink });

  /* ================= B: the big question screen ================= */
  const scrShot = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#120826', '#2E1460', true) }, scrShot);
  E('ellipse', { cx: 165, cy: 560, rx: 250, ry: 260, fill: glow('#9C6BFF'), opacity: 0.45 }, scrShot);
  E('rect', { x: 0, y: 688, width: 1200, height: 62, fill: '#1A0B36' }, scrShot);
  E('path', { d: 'M0,688 L1200,688', stroke: '#7A3CE0', 'stroke-width': 4, opacity: 0.7 }, scrShot);
  const SCX = 735, SCY = 397;
  const scr = asScreen(scrShot, 826, 540, { title: 'THE FUN RUN: GROUPED TIMES' }); tr(scr, SCX, SCY);
  const SC = scr.content;
  const toW = (x, y) => [SCX + x, SCY + y];

  // the grouped table
  const F = [6, 15, 11, 8], MIDS = [25, 35, 45, 55], FX = [150, 525, 495, 440];
  const rows = [['Time, {{t}} (min)', '{{f}}', 'midpoint {{x}}', '{{fx}}']];
  F.forEach((f, i) => rows.push([`{{${20 + i * 10} ≤ t < ${30 + i * 10}}}`, String(f), String(MIDS[i]), String(FX[i])]));
  rows.push(['**Total**', '**40**', '', '**1610**']);
  const TX = -398, TY = -206;
  const tbl = mkTable(SC, rows, { colW: [206, 70, 142, 104], rowH: 48, size: 26, ink: MK.ink, fill: 'rgba(46,111,216,0.05)', headFill: 'rgba(255,201,60,0.45)' });
  tr(tbl, TX, TY);
  const rowMark = [1, 2, 3, 4].map(r => { const m = E('rect', { x: 2, y: r * 48 + 2, width: 518, height: 44, rx: 6, fill: 'rgba(255,201,60,0.38)', stroke: GOLD, 'stroke-width': 3 }, tbl); tbl.insertBefore(m, tbl.children[1]); return m; });
  const fxMark = E('rect', { x: 418 + 2, y: 50, width: 100, height: 190, rx: 6, fill: 'rgba(30,158,90,0.18)', stroke: GREEN, 'stroke-width': 3 }, tbl);
  tbl.insertBefore(fxMark, tbl.children[1]);
  const fMark = E('rect', { x: 208, y: 50, width: 66, height: 190, rx: 6, fill: 'rgba(30,158,90,0.18)', stroke: GREEN, 'stroke-width': 3 }, tbl);
  tbl.insertBefore(fMark, tbl.children[1]);

  // the histogram
  const HX0 = 168, HW = 57.5, HB = 62, HU = 13.5;
  const hx = v => HX0 + (v - 20) / 10 * HW;
  const hist = G(SC);
  const bars = F.map((f, i) => E('rect', { x: hx(20 + i * 10), y: HB - f * HU, width: HW, height: f * HU, fill: ['#B9D7FF', '#FFC2E8', '#C8F59A', '#FFE0A8'][i], stroke: MK.ink, 'stroke-width': 3 }, hist));
  E('path', { d: `M${HX0 - 8},${HB} L${hx(60) + 12},${HB}`, stroke: MK.ink, 'stroke-width': 4 }, hist);
  [20, 30, 40, 50, 60].forEach(v => T(hist, hx(v), HB + 30, String(v), { size: 26, weight: 600, anchor: 'middle', fill: MK.ink }));
  const fLab = F.map((f, i) => T(hist, hx(25 + i * 10), HB - f * HU - 10, String(f), { size: 26, weight: 800, anchor: 'middle', fill: MK.ink }));
  const midL = E('path', { d: MIDS.map(m => `M${hx(m)},${HB - 2} L${hx(m)},${HB - F[MIDS.indexOf(m)] * HU - 2}`).join(' '), stroke: RED, 'stroke-width': 3, 'stroke-dasharray': '7 5' }, hist);
  const rr = rng(57), dots = [];
  F.forEach((f, i) => { for (let j = 0; j < f; j++) { const x = hx(20 + i * 10) + 9 + rr() * (HW - 18), y = HB - 8 - (j + 0.5) * (f * HU - 14) / f; dots.push({ d: E('circle', { cx: x, cy: y, r: 5, fill: '#2A1150' }, hist), x, y, m: hx(MIDS[i]) }); } });
  const rangeArr = G(hist);
  const rArrow = arrow(rangeArr, hx(20), HB + 48, hx(60), HB + 48, { color: '#8A5A08', width: 4, head: 12 });
  const rArrow2 = arrow(rangeArr, hx(60), HB + 48, hx(20), HB + 48, { color: '#8A5A08', width: 4, head: 12 });
  const wtag = (i, txt, col) => { const g = G(hist); E('rect', { x: hx(20 + i * 10) - 4, y: HB - F[i] * HU - 4, width: HW + 8, height: F[i] * HU + 8, rx: 6, fill: 'none', stroke: col, 'stroke-width': 6 }, g); return g; };
  const glow1 = wtag(0, '', GREEN), glow2 = wtag(1, '', GREEN), glowM = wtag(1, '', PINK);

  // the line under the table and histogram
  const bMid = mkText(SC, TX, 168, 'midpoint {{x = (20 + 30)/2 = 25}}', { size: 30, fill: MK.ink });
  const bEst = mkText(SC, TX, 168, 'estimated mean = {{1610/40 = 40.25}} minutes', { size: 30, fill: GREEN });
  const bEstNote = mkText(SC, TX, 232, 'only an **estimate**: everyone on a midpoint', { size: 26, fill: '#7A6A72', boldFill: RED });
  const bShort = G(SC);
  mkText(bShort, TX, 232, 'Priya: {{(25 + 35 + 45 + 55) ÷ 4 = 40}}', { size: 28, fill: RED });
  const bWeight = mkText(SC, TX, 232, 'weight each midpoint by its **f**: **15** runners outweigh **6**', { size: 26, fill: MK.ink, boldFill: GREEN });
  const bModal = mkText(SC, TX, 232, '**modal class**: {{30 ≤ t < 40}}, the most popular group', { size: 26, fill: MK.ink, boldFill: PINK });
  const bRange = mkText(SC, TX, 232, 'range < {{60 − 20 = 40}} minutes. Exactly? **Unknown.**', { size: 26, fill: '#8A5A08' });

  /* ================= the cast ================= */
  const stNo = asStamp(Lfg, false);
  const flash = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#FF2030' }, Lhud);
  const benny = cast(Lcast, 'benny');
  const kav = cast(Lcast, 'kavya');
  const priya = cast(Lcast, 'priya');
  const mean = cast(Lcast, 'mean'), sigma = cast(Lcast, 'sigma'), mo = cast(Lcast, 'mo'), ranger = cast(Lcast, 'ranger');
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  const k = id => at(id) - 0.06;
  const CORNER = [165, 612];

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const sRun = t < k('groups') ? 1 : 0, sScr = 1 - sRun;
    op(runShot, sRun); op(scrShot, sScr);
    cStretch.set(0); c40.set(0); stNo.set(0); op(flash, 0);
    const show = { benny: 0, kav: 0, priya: 0, mean: 0, sigma: 0, mo: 0, ranger: 0 };
    const talk = w => scTalk(S, t, w);

    /* ---------- A: the fun run ---------- */
    if (sRun) {
      runners.forEach((r, i) => {
        const sp = 150 + i * 22, x = ((t * sp * AMP + i * 260) % 1500) - 150;
        tr(r, x, 610 - (i % 2) * 22, 0.82 - (i % 2) * 0.06);
        r.pose(runPose(t + i * 0.37, 1.5 + i * 0.1));
      });
      const secs = 1715 + Math.floor(t * 7);
      setText(clock, `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`);
      popSet(cStretch, t, at('run') + 0.1, k('groups'), 600, 150);
      popSet(c40, t, mid('run', 0.5), k('groups'), 600, 222);
    }

    /* ---------- B: the screen ---------- */
    if (sScr) {
      scr.upd(t);
      const [cx, cy] = CORNER;
      const seg = t < k('mids') ? 'groups' : t < k('est') ? 'mids' : t < k('short') ? 'est' : t < k('weight') ? 'short' : t < k('modal') ? 'weight' : t < k('nobody') ? 'modal' : 'nobody';
      const after = id => t >= k(id);
      // corner character
      if (seg === 'groups') { show.benny = 1; tr(benny, cx, cy, 1.0); benny.set({ t, talk: talk('benny'), mood: 'happy', look: 0.7, lift: 1, ting: win(t, at('groups') + 0.05, at('groups') + 0.8, 0.15) }); }
      if (seg === 'mids') { show.kav = 1; tr(kav, cx, cy, 1.0); kav.set({ t, talk: talk('kavya'), mood: t > mid('mids', 0.88) ? 'happy' : 'neutral', look: 0.7 }); }
      if (seg === 'est') { show.mean = 1; tr(mean, cx, 610, 0.72); mean.set({ t, talk: talk('mean'), mood: t > mid('est', 0.5) ? 'deadpan' : 'smug', look: 0.6, arms: t > mid('est', 0.55) ? 1 : 0 }); }
      if (seg === 'short') { show.priya = 1; tr(priya, cx, cy, 1.0); priya.set({ t, talk: talk('priya'), mood: t > mid('short', 0.75) ? 'annoyed' : 'smug', look: 0.7, lift: t < mid('short', 0.7) ? 1 : 0 }); }
      if (seg === 'weight') { show.sigma = 1; tr(sigma, cx, 590, 0.62); sigma.set({ t, talk: talk('sigma'), mood: 'smug', look: 0.6, arms: t < mid('weight', 0.4) ? 1 : 0 }); }
      if (seg === 'modal') { show.mo = 1; tr(mo, cx, 572, 0.72); mo.set({ t, talk: talk('mo'), mood: 'happy', look: 0.6, hearts: 1, likes: '♥ 15' }); }
      if (seg === 'nobody') {
        show.ranger = 1;
        const lie = P(t, mid('nobody', 0.8), 0.8, ease);
        tr(ranger, cx - 10, 590 + 12 * lie, 0.78, -16 * lie);
        ranger.set({ t, talk: talk('ranger'), mood: lie > 0.5 ? 'happy' : 'neutral', look: 0.7, reach: 40 + 40 * P(t, mid('nobody', 0.1), 0.8, ease) });
      }

      // the table, row by row
      const rowT = [0.17, 0.4, 0.62, 0.82];
      tbl.cells.forEach((r, i) => r.forEach((cell, j) => {
        let p;
        if (i === 0) p = j < 2 ? P(t, at('groups') + 0.05, 0.3, linear) : (j === 2 ? (after('mids') ? P(t, mid('mids', 0.3), 0.3, linear) : 0) : (after('mids') ? P(t, mid('mids', 0.5), 0.3, linear) : 0));
        else if (i <= 4) p = j < 2 ? P(t, mid('groups', rowT[i - 1]), 0.3, linear) : (after('mids') ? P(t, mid('mids', (j === 2 ? 0.32 : 0.52) + (i - 1) * (j === 2 ? 0.045 : 0.075)), 0.3, linear) : 0);
        else p = after('mids') ? P(t, mid('mids', 0.88), 0.3, linear) : 0;
        op(cell, p);
      }));
      bars.forEach((b, i) => { const p = P(t, mid('groups', rowT[i]), 0.5, easeOut); attr(b, 'height', F[i] * HU * p); attr(b, 'y', HB - F[i] * HU * p); op(fLab[i], p); });
      op(midL, after('mids') ? P(t, mid('mids', 0.12), 0.4, linear) : 0);
      // the runners: dots appear with the bars, then slide onto the midpoint lines
      const slide = after('est') ? P(t, mid('est', 0.55), 1.6, ease) : 0;
      let di = 0;
      F.forEach((f, i) => { const p = P(t, mid('groups', rowT[i]) + 0.3, 0.4, linear); for (let j = 0; j < f; j++, di++) { const d = dots[di]; op(d.d, p); attr(d.d, 'cx', lerp(d.x, d.m, slide)); } });
      // highlights
      rowMark.forEach((m, i) => op(m, seg === 'modal' && i === 1 ? P(t, mid('modal', 0.2), 0.3, linear) : 0));
      op(fxMark, seg === 'weight' ? P(t, mid('weight', 0.5), 0.3, linear) : 0);
      op(fMark, seg === 'weight' ? P(t, mid('weight', 0.5), 0.3, linear) : 0);
      op(glow1, seg === 'weight' ? P(t, mid('weight', 0.62), 0.3, linear) : 0);
      op(glow2, seg === 'weight' ? P(t, mid('weight', 0.55), 0.3, linear) : 0);
      op(glowM, seg === 'modal' ? P(t, mid('modal', 0.15), 0.3, linear) * (0.75 + 0.25 * Math.sin(t * 8)) : 0);
      const ra = seg === 'nobody' ? P(t, mid('nobody', 0.12), 0.6, linear) : 0;
      op(rangeArr, ra > 0 ? 1 : 0); rArrow.set(ra); rArrow2.set(ra);
      // the line underneath
      op(bMid, seg === 'mids' ? P(t, mid('mids', 0.1), 0.3, linear) : 0);
      op(bEst, after('est') ? P(t, at('est') + 0.1, 0.4, linear) : 0);
      op(bEstNote, seg === 'est' ? P(t, mid('est', 0.5), 0.3, linear) : 0);
      op(bShort, seg === 'short' ? P(t, mid('short', 0.15), 0.3, linear) : 0);
      op(bWeight, seg === 'weight' ? P(t, mid('weight', 0.3), 0.3, linear) : 0);
      op(bModal, seg === 'modal' ? P(t, mid('modal', 0.25), 0.3, linear) : 0);
      op(bRange, seg === 'nobody' ? P(t, mid('nobody', 0.3), 0.3, linear) : 0);
      if (seg === 'short') {
        const sp = P(t, mid('short', 0.72), 0.35, linear);
        if (sp > 0) { stNo.set(sp); tr(stNo, ...toW(275, 222), 0.5); }
        op(flash, 0.28 * win(t, mid('short', 0.72), mid('short', 0.72) + 0.35, 0.12));
      }
    }

    op(benny, show.benny); op(kav, show.kav); op(priya, show.priya); op(mean, show.mean); op(sigma, show.sigma); op(mo, show.mo); op(ranger, show.ranger);
  };
});
