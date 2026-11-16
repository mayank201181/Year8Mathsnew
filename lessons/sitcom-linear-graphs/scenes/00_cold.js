/* Scene 0: Cold open (no chapter card).
   Saturday, 8 a.m., the family's living room: Kavya, 12 -> Dad unveils OPERATION BEACH DAY on a flipchart (a graph of
   fun against time) -> Kavya: "it's a beach" -> Mum: "let him have this" -> Ah Boy: "a graph for ice cream?" -> Dad: ice
   cream is at 3 p.m., it's on the graph -> documentary zoom into the line on the flipchart -> Lionel's confessional (a
   straight line; goes on forever; never bends) -> his gradient is his mood (uphill +, downhill -, flat 0) -> Ah Boy:
   "straight up?" -> Lionel swings vertical, panics (run = 0: no gradient) -> Lionel on the flipchart: one family, one
   beach, one straight plan -> title card. */
scene('cold', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);          // hard sitcom cut
  const view = (el, k, fx, fy, sx, sy) => el.setAttribute('transform', `translate(${sx.toFixed(1)} ${sy.toFixed(1)}) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 3, color: o.color || C.ink, weight: 700 }); };
  const GOLD = '#FFE45C', AMB = LG.amber, PINK = '#FF8FC8', GREEN = '#56D69B', RED = '#FF6070';

  /* layers: sets, characters, set fronts, foreground, HUD */
  const Lbg = G(root), Lcast = G(root), Lfront = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= A, F, G: the living room ================= */
  const flatShot = G(Lbg), flatCam = G(flatShot);
  const flat = lgFlat(flatCam);
  const castCam = G(Lcast), frontCam = G(Lfront);          // the camera moves the room, its cast and the sofa together
  frontCam.appendChild(flat.front); frontCam.appendChild(flat.top);
  const chart = flat.chart;
  const iceRing = E('circle', { r: 34, fill: 'none', stroke: '#E8424F', 'stroke-width': 5 }, chart.ice);
  const aChips = G(Lfg);
  const cKav = pill(aChips, 'Kavya, age 12', { size: 32 });
  const cSat = pill(aChips, 'Saturday, 8 a.m.', { size: 30, color: GOLD, stroke: GOLD });
  const cMeet = pill(aChips, 'family meeting', { size: 28 });
  const cPlan = pill(Lfg, 'every minute planned', { size: 30, color: GOLD, stroke: GOLD });
  const cIce = mkChip(Lfg, 'ice cream: **3 p.m.** Not before.', { size: 30, col: PINK });
  const cDays = [pill(Lfg, '1 family', { size: 34, color: GOLD, stroke: GOLD }), pill(Lfg, '1 beach', { size: 34, color: GOLD, stroke: GOLD }),
    pill(Lfg, '1 straight plan', { size: 34, color: AMB, stroke: AMB })];
  const qUp = mkSpeechBubble(Lfg, 'straight **up**?', { size: 34, tail: 'down' });

  /* ================= B: zoom into the line on the flipchart ================= */
  const zoomShot = G(Lbg), zoomWrap = G(zoomShot);
  E('rect', { x: -400, y: -400, width: 2000, height: 1550, fill: '#EBCFA8' }, zoomWrap);
  const bigChart = lgFlipchart(zoomWrap); tr(bigChart, 600, 110, 1.75);
  const ZX = 600 + bigChart.px(13) * 1.75, ZY = 110 + bigChart.py(1 + 8.4 * 5 / 12) * 1.75;   // a point on the line (1 p.m.)
  const finder = G(Lhud);
  E('path', { d: 'M40,140 L40,40 L140,40 M1060,40 L1160,40 L1160,140 M1160,610 L1160,710 L1060,710 M140,710 L40,710 L40,610', fill: 'none', stroke: SC_INK, 'stroke-width': 5, opacity: 0.75 }, finder);
  E('rect', { x: 960, y: 84, width: 186, height: 46, rx: 10, fill: '#FFFDF6', opacity: 0.9 }, finder);
  const zoomTxt = T(finder, 1130, 116, 'ZOOM ×1', { size: 30, weight: 700, anchor: 'end', fill: SC_INK });
  const recDot = E('circle', { cx: 80, cy: 670, r: 10, fill: '#FF3B3B' }, finder);

  /* ================= C, D, E: Lionel's confessional ================= */
  const conf = lgConf(Lbg, 'lionel');
  // hi: the plaque
  const plaque = G(Lfg);
  E('rect', { x: -250, y: -150, width: 500, height: 300, rx: 18, fill: '#2A1606', stroke: AMB, 'stroke-width': 5 }, plaque);
  T(plaque, 0, -92, 'A STRAIGHT LINE', { size: 40, weight: 800, anchor: 'middle', fill: AMB, ls: 2 });
  const plRod = G(plaque);
  E('path', { d: 'M-170,-14 L170,-14', stroke: AMB, 'stroke-width': 12, 'stroke-linecap': 'round' }, plRod);
  E('path', { d: 'M-200,-14 L-170,-32 L-170,4 Z M200,-14 L170,-32 L170,4 Z', fill: AMB }, plRod);
  const plFor = T(plaque, 0, 50, 'goes on forever, both ways', { size: 30, weight: 700, anchor: 'middle', fill: '#FFE7BF', font: FB });
  const plBend = T(plaque, 0, 106, 'never bends', { size: 34, weight: 800, anchor: 'middle', fill: GOLD });
  // mood: three mini graphs (positive, negative, zero)
  const moodBoard = G(Lfg);
  E('rect', { x: 0, y: 0, width: 470, height: 560, rx: 20, fill: MK.paper, stroke: '#C9935A', 'stroke-width': 5 }, moodBoard);
  mkText(moodBoard, 235, 52, 'the **gradient** = the mood', { size: 32, anchor: 'middle', fill: MK.ink, boldFill: '#B8640A' });
  const MOODS = [[1, 'uphill: **positive**', 'happy', '#1E9E5A'], [-1, 'downhill: **negative**', 'sad', '#D32F2F'], [0, 'flat: **zero**', 'bored', '#5A6670']];
  const moodRows = MOODS.map(([m, txt, , col], i) => {
    const row = G(moodBoard), y0 = 92 + i * 152;
    const ax = mkAxes(row, { xmin: -2, xmax: 2, ymin: -2, ymax: 2, unit: 32, ink: MK.ink, size: 18, grid: false, labelStep: 10, halo: MK.paper, xName: ' ', yName: ' ' });
    tr(ax, 34, y0 + 14);
    const ln = ax.line(m, 0, { col, width: 6 });
    mkText(row, 196, y0 + 86, txt, { size: 29, fill: MK.ink, boldFill: col });
    return { row, ln };
  });
  // faint: run = 0
  const vertCard = G(Lfg);
  E('rect', { x: -230, y: -150, width: 460, height: 300, rx: 18, fill: MK.paper, stroke: '#D32F2F', 'stroke-width': 5 }, vertCard);
  T(vertCard, 0, -92, 'VERTICAL', { size: 40, weight: 800, anchor: 'middle', fill: '#D32F2F', ls: 3 });
  const vMath = mkMath(vertCard, 0, 0, '"gradient" = "rise"/0', { size: 46, anchor: 'middle', fill: MK.ink });
  const vNo = mkText(vertCard, 0, 110, 'run = 0: **no gradient**', { size: 32, anchor: 'middle', fill: MK.ink, boldFill: '#D32F2F' });
  const vX = cross(vertCard, 20, '#D32F2F'); tr(vX, 186, -12);

  /* ================= H: title card ================= */
  const titleShot = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#0E3A5A', '#2786B8', true) }, titleShot);
  E('rect', { x: 0, y: 560, width: 1200, height: 190, fill: linGrad('#F2DFAE', '#E2C88A', true) }, titleShot);
  E('circle', { cx: 980, cy: 150, r: 90, fill: glow('#FFE45C'), opacity: 0.6 }, titleShot);
  // a big rise/run triangle behind the logo
  const triT = G(titleShot);
  E('path', { d: 'M180,470 L1020,470 L1020,120 Z', fill: '#FFE45C', opacity: 0.12 }, triT);
  E('path', { d: 'M180,470 L1020,120', stroke: AMB, 'stroke-width': 10, 'stroke-linecap': 'round', opacity: 0.55 }, triT);
  const logo = G(Lfg);
  const lRise = T(logo, 0, -60, 'RISE', { size: 112, weight: 800, anchor: 'middle', fill: GOLD, ls: 4 });
  const lBar = E('rect', { x: -230, y: -32, width: 460, height: 14, rx: 7, fill: '#FFFFFF' }, logo);
  const lRun = T(logo, 0, 74, 'OVER RUN', { size: 84, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 3 });
  [lRise, lRun].forEach(w => { w.setAttribute('stroke', '#0B2A40'); w.setAttribute('stroke-width', 12); w.setAttribute('paint-order', 'stroke'); w.setAttribute('stroke-linejoin', 'round'); });
  const epi = T(Lfg, 600, 404, 'Episode 12: Operation Beach Day', { size: 40, weight: 700, anchor: 'middle', fill: '#FFFFFF' });
  epi.setAttribute('stroke', '#0B2A40'); epi.setAttribute('stroke-width', 8); epi.setAttribute('paint-order', 'stroke');

  /* ================= the cast (one instance each) ================= */
  const kav = cast(castCam, 'kavya');
  const mum = cast(castCam, 'mum', { prop: 'mug', propCol: '#2E7DD8', side: 'right' });
  const boy = cast(castCam, 'boy');
  const dad = cast(castCam, 'dad');
  const lio = cast(Lcast, 'lionel');                     // not under the room camera: he lives in the confessional too
  const lt = { kavya: lgLowerThird(Lhud, 'kavya'), dad: lgLowerThird(Lhud, 'dad'), mum: lgLowerThird(Lhud, 'mum'), boy: lgLowerThird(Lhud, 'boy'), lionel: lgLowerThird(Lhud, 'lionel') };
  const ltOn = (t, who, t0) => lt[who].set(win(t, t0, t0 + 3.1, 0.3));

  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cut points */
  const cB = at('tiny') - 0.06, cC = at('hi') - 0.06, cF = at('up') - 0.06, cE = at('faint') - 0.06,
    cG = at('charge') - 0.06, cH = at('title') - 0.06;
  const KX = 210, MX = 420, BX = 330, DX = 640, HY = 470;   // busts behind the sofa: hem hidden at y 610

  return t => {
    op(blackout, 1 - P(t, 0, 0.6, linear));
    const sA = on(t, -1, cB), sB = on(t, cB, cC), sC = on(t, cC, cF), sF = on(t, cF, cE), sE = on(t, cE, cG),
      sG = on(t, cG, cH), sH = on(t, cH, 1e9);
    const flatOn = sA || sF || sG;
    for (const k in lt) lt[k].set(0);
    const who = scWho(S, t);
    const show = { kav: 0, mum: 0, boy: 0, dad: 0, lio: 0 };

    /* ---------- the living room (A: meeting; F: "straight up?"; G: the plan) ---------- */
    op(flatShot, flatOn); op(flat.front, flatOn); op(flat.top, flatOn);
    op(aChips, 0); op(cPlan, 0); op(cIce, 0); cDays.forEach(c => op(c, 0)); qUp.set(0);
    op(chart.ice, 1); op(iceRing, 0);
    if (flatOn) {
      flat.clock(8, sA ? Math.min(14, t / 4) : 20);
      // camera: gentle push towards the flipchart while Dad presents; a slow push on Kavya's deadpan
      let k = 1, fx = 600, fy = 375;
      if (sA) {
        if (t < at('plan')) { k = 1 + 0.04 * P(t, 0, at('plan'), linear); fx = 420; }
        else if (t < at('beach')) { k = 1.04; fx = 700; }
        else if (t < at('five')) { k = 1.04 + 0.08 * P(t, end('beach') - 0.1, 0.5, ease); fx = 260; fy = 360; }
        else { k = 1; }
      }
      [flatCam, castCam, frontCam].forEach(el => view(el, k, fx, fy, fx, fy));
    }
    if (sA) {
      chart.line.set(P(t, mid('plan', 0.55), 1.0, ease));
      // Kavya, from the start
      show.kav = 1;
      tr(kav, KX, HY, 1.0);
      let km = 'neutral', kl = 0.3;
      if (t < at('plan')) { km = t < mid('kavya', 0.5) ? 'neutral' : 'deadpan'; kl = 0.2; }
      else if (t < at('beach')) { km = 'deadpan'; kl = 0.9; }
      else if (t < at('five')) { km = who === 'kavya' ? 'annoyed' : 'deadpan'; kl = t < end('beach') ? 0.9 : 0; }
      else if (t < at('ice')) { km = 'deadpan'; kl = 0.8; }
      else if (t < at('three')) { km = 'neutral'; kl = 0.6; }
      else { km = 'deadpan'; kl = 0; }
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
      op(aChips, t < at('plan') + 0.2 ? 1 : 0);
      popIn(cKav, t, mid('kavya', 0.06), KX, 220);
      popIn(cSat, t, mid('kavya', 0.45), 860, 96);
      popIn(cMeet, t, mid('kavya', 0.66), 860, 486);
      ltOn(t, 'kavya', at('kavya') + 1.2);
      // Dad rises beside his flipchart, clipboard up
      if (t >= at('plan') - 0.35) {
        show.dad = 1;
        const up = P(t, at('plan') - 0.35, 0.4, easeOut);
        tr(dad, DX, lerp(700, HY, up), 1.0);
        const pointing = (t > mid('plan', 0.5) && t < at('beach')) || (t >= at('three') && t < end('three') + 0.3);
        dad.set({ t, talk: scTalk(S, t, 'dad'), mood: who === 'kavya' || who === 'mum' ? 'smug' : t >= at('three') ? 'smug' : 'happy', look: who === 'boy' ? -0.7 : who === 'kavya' || who === 'mum' ? -0.6 : 0.6, lift: pointing ? 1 : 0 });
        ltOn(t, 'dad', at('plan') + 0.1);
        if (t > mid('plan', 0.3) && t < at('beach') + 0.3) popIn(cPlan, t, mid('plan', 0.3), 860, 92);
      }
      // Mum, with her coffee
      if (t >= at('five') - 0.3) {
        show.mum = 1;
        const up = P(t, at('five') - 0.3, 0.4, easeOut);
        tr(mum, MX, lerp(720, HY + 4, up), 0.98);
        mum.set({ t, talk: scTalk(S, t, 'mum'), mood: who === 'mum' ? 'neutral' : t >= at('three') ? 'deadpan' : 'happy', look: who === 'mum' ? -0.7 : who === 'boy' ? -0.6 : 0.7, lift: t < end('five') + 0.2 ? 1 : 0 });
        ltOn(t, 'mum', at('five') + 0.05);
      }
      // Ah Boy pops up between Kavya and Mum, hand up
      if (t >= at('ice') - 0.3) {
        show.boy = 1;
        const up = P(t, at('ice') - 0.3, 0.35, pop);
        tr(boy, BX, lerp(720, 500, up), 0.95);
        boy.set({ t, talk: scTalk(S, t, 'boy'), mood: t >= at('three') && t < mid('three', 0.6) ? 'shock' : t >= mid('three', 0.6) ? 'sad' : 'happy', look: t >= at('three') ? 0.8 : 0.4, lift: t < at('three') ? 1 : 0 });
        ltOn(t, 'boy', at('ice') + 0.05);
      }
      // "Ice cream is at 3 p.m."
      if (t >= at('three')) {
        const rp = P(t, mid('three', 0.25), 0.5, easeOut);
        op(iceRing, rp > 0 ? (1 - rp) + 0.5 * Math.abs(Math.sin(t * 5)) : 0); attr(iceRing, 'r', 30 + 26 * rp);
        popIn(cIce, t, mid('three', 0.3), 860, 92);
        cIce.set(1);
      }
    }

    /* ---------- B: documentary zoom into the line ---------- */
    op(zoomShot, sB); op(finder, sB);
    if (sB) {
      const z = P(t, cB + 0.25, cC - cB - 0.35, easeIn);
      const k = Math.pow(16, z);
      view(zoomWrap, k, lerp(600, ZX, z), lerp(375, ZY, z), 600, 375);
      setText(zoomTxt, 'ZOOM ×' + (k >= 10 ? String(Math.round(k)) : k.toFixed(1)));
      op(recDot, Math.sin(t * TAU * 0.8) > 0 ? 1 : 0.2);
    }

    /* ---------- C, E: Lionel's confessional ---------- */
    const confOn = sC || sE;
    conf.set(confOn, t);
    op(plaque, 0); op(moodBoard, 0); op(vertCard, 0);
    if (confOn) {
      show.lio = 1;
      let tilt = 0, mood = 'smug', look = 0.3, sweat = 0, lx = 330, ly = 400, ls = 1.15;
      if (sC) {
        // hi: he slides in from the left, proud; mood: the rod tilts with each mood
        const enter = P(t, cC, 0.5, easeOut);
        lx = lerp(-300, 330, enter);
        ltOn(t, 'lionel', at('hi') + 0.2);
        const pp = P(t, mid('hi', 0.2), 0.45, pop) * (1 - P(t, at('mood') - 0.15, 0.2, linear));
        op(plaque, clamp(pp * 2.5)); tr(plaque, 870, 340, Math.max(0.01, 0.75 + 0.25 * pp));
        op(plFor, P(t, mid('hi', 0.32), 0.3, linear)); op(plBend, P(t, mid('hi', 0.72), 0.3, linear));
        tr(plRod, 0, 0, 1 + 0.06 * Math.sin(t * 3) * AMP, 0);
        if (t < at('mood')) { mood = t < mid('hi', 0.7) ? 'smug' : 'happy'; tilt = 0; }
        else {
          const b1 = mid('mood', 0.06), b2 = mid('mood', 0.4), b3 = mid('mood', 0.72);
          const up = P(t, b1, 0.5, pop), dn = P(t, b2, 0.5, pop), fl = P(t, b3, 0.5, ease);
          tilt = 30 * up - 60 * dn + 30 * fl;
          mood = t < b2 ? 'happy' : t < b3 ? 'sad' : 'deadpan';
          look = 0.6;
          const bp = P(t, at('mood') - 0.1, 0.4, easeOut);
          op(moodBoard, bp > 0 ? 1 : 0); tr(moodBoard, 690, 110 + 30 * (1 - bp));
          [b1, b2, b3].forEach((b, i) => { op(moodRows[i].row, P(t, b, 0.3, linear)); moodRows[i].ln.set(P(t, b + 0.05, 0.5, ease)); });
        }
      } else {
        // faint: he swings to vertical, panics, then snaps back flat and glares
        const sw = P(t, cE + 0.05, 0.7, ease), back = P(t, mid('faint', 0.62), 0.45, pop);
        tilt = 90 * sw * (1 - back) + (sw > 0.5 ? Math.sin(t * 40) * 3 * (1 - back) * AMP : 0);
        mood = back > 0.5 ? 'annoyed' : sw > 0.4 ? 'shock' : 'neutral';
        sweat = back > 0.5 ? 0.4 : sw;
        look = back > 0.5 ? 0 : 0.5;
        const cp = P(t, mid('faint', 0.18), 0.45, pop);
        op(vertCard, clamp(cp * 2.5)); tr(vertCard, 870, 330, Math.max(0.01, 0.75 + 0.25 * cp));
        op(vNo, P(t, mid('faint', 0.4), 0.3, linear)); op(vX, P(t, mid('faint', 0.34), 0.25, linear));
        if (t > end('faint')) { ls = 1.15 + 0.06 * P(t, end('faint'), 0.7, ease); }
      }
      tr(lio, lx, ly, ls);
      lio.set({ t, talk: scTalk(S, t, 'lionel'), mood, look, tilt, sweat });
    }

    /* ---------- F: "Can you go straight up?" ---------- */
    if (sF) {
      show.kav = show.boy = show.dad = show.mum = 1;
      tr(kav, KX, HY, 1.0); kav.set({ t, mood: 'neutral', look: 0.5 });
      tr(mum, MX + 40, HY + 4, 0.98); mum.set({ t, mood: 'neutral', look: -0.5, lift: 0 });
      tr(boy, BX, 500, 0.95); boy.set({ t, talk: scTalk(S, t, 'boy'), mood: 'happy', look: 0.8, lift: 1 });
      tr(dad, DX, HY, 1.0); dad.set({ t, mood: 'neutral', look: 0.8, lift: 0 });
      qUp.set(P(t, mid('up', 0.2), 0.35, linear)); tr(qUp, BX + 20, 250);
    }

    /* ---------- G: Lionel hops out in front of the flipchart ---------- */
    if (sG) {
      show.kav = show.boy = show.dad = show.mum = show.lio = 1;
      tr(kav, KX, HY, 1.0); kav.set({ t, mood: t > mid('charge', 0.7) ? 'deadpan' : 'neutral', look: 0.8 });
      tr(mum, MX, HY + 4, 0.98); mum.set({ t, mood: 'neutral', look: 0.8, lift: 0 });
      tr(boy, BX, 500, 0.95); boy.set({ t, mood: 'happy', look: 0.8, lift: 0 });
      tr(dad, DX - 20, HY, 1.0); dad.set({ t, mood: 'smug', look: 0.8, lift: 1 });
      const hop = P(t, cG, 0.45, pop);
      tr(lio, 885, lerp(360, 300, hop), 0.62);
      lio.set({ t, talk: scTalk(S, t, 'lionel'), mood: t > mid('charge', 0.75) ? 'happy' : 'smug', look: -0.6, tilt: 18 * P(t, mid('charge', 0.7), 0.5, pop) });
      popIn(cDays[0], t, mid('charge', 0.04), 260, 170);
      popIn(cDays[1], t, mid('charge', 0.2), 260, 240);
      popIn(cDays[2], t, mid('charge', 0.38), 860, 96);
    }

    /* ---------- H: title card ---------- */
    op(titleShot, sH); op(logo, 0); op(epi, 0);
    if (sH) {
      const lp = P(t, at('title') + 0.05, 0.6, pop);
      op(logo, clamp(lp * 2.5)); tr(logo, 600, 236, Math.max(0.01, 0.5 + 0.5 * lp));
      attr(lBar, 'width', 460 * P(t, at('title') + 0.25, 0.5, ease));
      op(epi, P(t, mid('title', 0.4), 0.4, linear));
      tr(triT, 0, 0, 1, 0); op(triT, 0.6 + 0.4 * Math.sin(t * 1.5) * AMP);
      const xs = [190, 400, 610, 820, 1020];
      const row = [[kav, 'smug', 0.8, 'kav'], [lio, 'smug', 0.5, 'lio'], [dad, 'happy', 0.74, 'dad'], [mum, 'neutral', 0.74, 'mum'], [boy, 'happy', 0.8, 'boy']];
      row.forEach(([c, mood, s, key], i) => {
        const p = P(t, mid('title', 0.48) + i * 0.13, 0.45, pop);
        show[key] = p > 0 ? 1 : 0;
        op(c, clamp(p * 3));
        const y = key === 'lio' ? 560 : 548 + (key === 'boy' ? 16 : 0);
        tr(c, xs[i], y + 30 * (1 - clamp(p)), Math.max(0.01, s * p));
        c.set({ t, mood, look: 0, tilt: key === 'lio' ? 20 : 0, lift: 0 });
      });
      [castCam].forEach(el => view(el, 1, 600, 375, 600, 375));
    }

    op(kav, show.kav); op(mum, show.mum); op(boy, show.boy); op(dad, show.dad); op(lio, show.lio);
  };
});
