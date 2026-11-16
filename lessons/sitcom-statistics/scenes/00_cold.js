/* Scene 0: Cold open (no chapter card).
   Monday 7.40 a.m., Room 2-14, the Media Club studio (also the mop cupboard): Kavya, 12 -> Mr Tan: the canteen gets
   ONE new stall, bubble tea or ice kachang; the principal wants the data -> Priya: "100% want bubble tea!" "Who did
   you ask?" "My bubble tea group chat." -> documentary zoom into the old computer on the shelf -> the Fact-Check
   Desk: Inspector Axis -> the evidence board: her sample is 43 fans out of 1200 pupils: BIASED -> "It's not biased.
   It's loyal." -> Axis on the studio wall screen: 5 days, 1 canteen, 1200 pupils, check the axes -> title card. */
scene('cold', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);          // hard sitcom cut
  const viewStr = (k, fx, fy, sx, sy) => `translate(${sx.toFixed(1)} ${sy.toFixed(1)}) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`;
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); };
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 2, color: o.color || C.ink, weight: 700 }); };
  const GOLD = '#FFE45C', PURPLE = '#B48CFF', GREEN = '#56D69B';

  /* layers: sets, characters, desk fronts, foreground, HUD */
  const Lbg = G(root), Lcast = G(root), Lfront = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= the studio ================= */
  const studio = sdStudio(Lbg);
  Lfront.appendChild(studio.front); Lfront.appendChild(studio.top);
  const SC = studio.scr, scx = SC.x + SC.w / 2;
  // wall-screen pages (inside the clipped screen)
  const pgBreak = G(studio.screen);
  E('rect', { x: SC.x, y: SC.y, width: SC.w, height: 54, fill: SD_COL.news }, pgBreak);
  T(pgBreak, scx, SC.y + 38, 'BREAKING: ONE NEW STALL', { size: 30, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 1 });
  const bCup = sdCup(pgBreak, { s: 0.78 }); tr(bCup, scx - 150, SC.y + 236);
  const bBowl = sdBowl(pgBreak, { s: 0.95 }); tr(bBowl, scx + 150, SC.y + 236);
  const vs = T(pgBreak, scx, SC.y + 180, 'VS', { size: 60, weight: 800, anchor: 'middle', fill: GOLD });
  vs.setAttribute('stroke', '#0A2238'); vs.setAttribute('stroke-width', 8); vs.setAttribute('paint-order', 'stroke');
  const quote = G(pgBreak);
  E('rect', { x: SC.x + 70, y: SC.y + 228, width: SC.w - 140, height: 56, rx: 28, fill: '#0A1B27', stroke: GOLD, 'stroke-width': 3 }, quote);
  T(quote, scx, SC.y + 266, '"Show me the data."', { size: 32, weight: 800, anchor: 'middle', fill: GOLD });
  const pgPie = G(studio.screen);
  E('rect', { x: SC.x, y: SC.y, width: SC.w, height: SC.h, fill: '#2A1648' }, pgPie);
  const pie100 = mkPie(pgPie, [1], { r: 92, cols: ['#8E5BD8'], stroke: '#FFFFFF' }); tr(pie100, SC.x + 400, SC.y + 168);
  T(pgPie, SC.x + 400, SC.y + 180, '100%', { size: 44, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  T(pgPie, SC.x + 24, SC.y + 52, 'want bubble tea!', { size: 30, weight: 800, fill: GOLD });
  T(pgPie, SC.x + 24, SC.y + 92, 'by Priya', { size: 26, weight: 600, fill: '#D9C8FF', font: FB });
  const pgAxis = G(studio.screen);
  E('rect', { x: SC.x, y: SC.y, width: SC.w, height: SC.h, fill: linGrad('#0C1A2A', '#14304A', true) }, pgAxis);
  E('path', { d: `M${SC.x},${SC.y + 120} L${SC.x + SC.w},${SC.y + 40} L${SC.x + SC.w},${SC.y + 70} L${SC.x},${SC.y + 150} Z`, fill: '#FFE7A8', opacity: 0.08 }, pgAxis);
  const axHold = G(pgAxis); tr(axHold, SC.x + 250, SC.y + 172, 0.85);
  const axisS = cast(axHold, 'axis');
  const tickYs = [72, 40, 8, -24, -56, -88, -120];
  const tickHi = tickYs.map(y => E('path', { d: `M-96,${y} L-74,${y}`, stroke: GOLD, 'stroke-width': 9, 'stroke-linecap': 'round' }, axHold));
  // the mini Fact-Check Desk on the old PC's screen
  const pcPage = G(studio.pcScreen);
  E('rect', { x: -75, y: -52, width: 150, height: 104, fill: linGrad('#0C1A2A', '#14304A', true) }, pcPage);
  T(pcPage, 0, -36, 'FACT-CHECK DESK', { size: 12, weight: 800, anchor: 'middle', fill: GOLD });
  const miniHold = G(pcPage); tr(miniHold, -10, 14, 0.22);
  const axisM = cast(miniHold, 'axis');

  // chips for the studio shots
  const cKav = pill(Lfg, 'Kavya, age 12', { size: 32 });
  const cMon = pill(Lfg, 'Monday morning', { size: 30, color: GOLD, stroke: GOLD });
  const cRoom = pill(Lfg, 'Room 2-14: Media Club studio', { size: 28 });
  const cFair = mkChip(Lfg, '**FAIRLY.**', { size: 36, col: GREEN });
  const cDays = pill(Lfg, '5 days', { size: 34, color: GOLD, stroke: GOLD });
  const cCan = pill(Lfg, '1 canteen', { size: 34, color: GOLD, stroke: GOLD });
  const cPup = pill(Lfg, '1200 pupils', { size: 34, color: GOLD, stroke: GOLD });
  const cCheck = mkChip(Lfg, '**check the axes**', { size: 32, col: GOLD });
  // Priya's phone: the group chat
  const phone = G(Lfg);
  E('rect', { x: -150, y: -215, width: 300, height: 430, rx: 30, fill: '#26323C', stroke: SC_INK, 'stroke-width': 5 }, phone);
  E('rect', { x: -134, y: -190, width: 268, height: 380, rx: 10, fill: '#F2ECFF' }, phone);
  E('rect', { x: -134, y: -190, width: 268, height: 86, rx: 10, fill: '#8E5BD8' }, phone);
  T(phone, 0, -156, 'BUBBLE TEA FAN CLUB', { size: 22, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  T(phone, 0, -120, '43 members', { size: 26, weight: 700, anchor: 'middle', fill: '#E9DDFF' });
  const chatB = [['bubble tea!!', -60, -50], ['BUBBLE TEA', 50, 22], ['obviously', -50, 94]].map(([s, x, y]) => {
    const b = G(phone); tr(b, x, y);
    const w = textWidth(s, 26, FD, 700) + 36;
    E('rect', { x: -w / 2, y: -24, width: w, height: 48, rx: 18, fill: x < 0 ? '#FFFFFF' : '#C8F7D0', stroke: '#9A8CC0', 'stroke-width': 2 }, b);
    T(b, 0, 9, s, { size: 26, weight: 700, anchor: 'middle', fill: SC_INK });
    return b;
  });

  /* ================= the zoom HUD ================= */
  const finder = G(Lhud);
  E('path', { d: 'M40,140 L40,40 L140,40 M1060,40 L1160,40 L1160,140 M1160,610 L1160,710 L1060,710 M140,710 L40,710 L40,610', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 5, opacity: 0.8 }, finder);
  const zoomTxt = T(finder, 1130, 690, 'ZOOM ×1', { size: 30, weight: 700, anchor: 'end', fill: '#FFFFFF' });
  const recDot = E('circle', { cx: 1090, cy: 70, r: 10, fill: '#FF3B3B' }, finder);

  /* ================= the Fact-Check Desk ================= */
  const desk = sdDesk(Lbg);
  Lfront.appendChild(desk.front); Lfront.appendChild(desk.top);
  const BR = desk.boardRect;
  const ev = G(desk.board);
  // Priya's 100% pie, pinned
  const evPie = G(ev); tr(evPie, BR.x + 110, BR.y + 150);
  E('rect', { x: -96, y: -110, width: 192, height: 230, fill: '#FFFDF6', stroke: '#8A6B3A', 'stroke-width': 2 }, evPie);
  const ep = mkPie(evPie, [1], { r: 70, cols: ['#8E5BD8'], stroke: SC_INK }); tr(ep, 0, -14);
  T(evPie, 0, -2, '100%', { size: 34, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  T(evPie, 0, 96, "Priya's survey", { size: 26, weight: 700, anchor: 'middle', fill: SC_INK });
  E('circle', { cx: 0, cy: -100, r: 7, fill: '#E8424F', stroke: SC_INK, 'stroke-width': 2 }, evPie);
  // the population: 1200 pupils as ONE path (40 x 30), and the 43 fans in one corner
  const popG = G(ev); tr(popG, BR.x + 236, BR.y + 46);
  E('rect', { x: -8, y: -8, width: 230, height: 196, fill: '#FFFDF6', stroke: '#8A6B3A', 'stroke-width': 2 }, popG);
  let dd = '', fd = '';
  for (let r = 0; r < 30; r++) for (let c = 0; c < 40; c++) {
    const x = c * 5.4, y = r * 5.4, fan = c < 7 && r < 6 || (c === 7 && r === 0);
    if (fan) fd += `M${x.toFixed(1)},${y.toFixed(1)} h4 v4 h-4 Z `; else dd += `M${x.toFixed(1)},${y.toFixed(1)} h4 v4 h-4 Z `;
  }
  E('path', { d: dd, fill: '#9AA6B2' }, popG);
  const fans = E('path', { d: fd, fill: '#8E5BD8' }, popG);
  const ringF = E('ellipse', { cx: 20, cy: 16, rx: 34, ry: 28, fill: 'none', stroke: '#E8424F', 'stroke-width': 4 }, popG);
  E('circle', { cx: 107, cy: -8, r: 7, fill: '#E8424F', stroke: SC_INK, 'stroke-width': 2 }, popG);
  const popLab = G(ev);
  E('rect', { x: BR.x + 222, y: BR.y + 248, width: 238, height: 42, rx: 6, fill: '#FFFDF6', stroke: '#8A6B3A', 'stroke-width': 2 }, popLab);
  T(popLab, BR.x + 341, BR.y + 278, 'all 1200 pupils', { size: 26, weight: 700, anchor: 'middle', fill: SC_INK });
  const fanLab = mkChip(ev, 'her sample: **43 fans**', { size: 26, col: '#E8424F', fill: '#FFFDF6' });
  const string = E('path', { d: `M${BR.x + 110},${BR.y + 50} Q${BR.x + 200},${BR.y + 110} ${BR.x + 256},${BR.y + 62}`, fill: 'none', stroke: '#E8424F', 'stroke-width': 3 }, ev);
  const stampB = sdStamp(Lfg, 'biased');
  const axisD = cast(Lcast, 'axis');

  /* ================= the title card ================= */
  const titleShot = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#0C1A2A', '#1E3A5F', true) }, titleShot);
  let rays = '';
  for (let i = 0; i < 16; i++) { const a0 = i / 16 * TAU, a1 = a0 + TAU / 40; rays += `M0,0 L${(Math.cos(a0) * 1100).toFixed(0)},${(Math.sin(a0) * 1100).toFixed(0)} L${(Math.cos(a1) * 1100).toFixed(0)},${(Math.sin(a1) * 1100).toFixed(0)} Z `; }
  const rayP = E('path', { d: rays, fill: GOLD, opacity: 0.06 }, titleShot);
  // background bar chart that grows from zero
  const tBars = [0.35, 0.55, 0.8, 0.62, 0.95, 0.7].map((h, i) => E('rect', { x: 110 + i * 170, y: 600, width: 110, height: 0, rx: 6, fill: MK_COLS[i % 8], opacity: 0.22 }, titleShot));
  E('path', { d: 'M80,600 L1120,600', stroke: '#FFFFFF', 'stroke-width': 4, opacity: 0.25 }, titleShot);
  const logo = G(Lfg);
  const logo1 = T(logo, 0, -60, 'SHOW ME', { size: 62, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 6 });
  const logo2 = T(logo, 0, 34, 'THE DATA', { size: 100, weight: 800, anchor: 'middle', fill: GOLD, ls: 3 });
  [logo1, logo2].forEach(w => { w.setAttribute('stroke', '#0A1420'); w.setAttribute('stroke-width', 12); w.setAttribute('paint-order', 'stroke'); w.setAttribute('stroke-linejoin', 'round'); });
  const lens = G(logo); tr(lens, 340, -24);
  E('path', { d: 'M26,30 L66,74', stroke: '#6B4423', 'stroke-width': 14, 'stroke-linecap': 'round' }, lens);
  E('circle', { r: 42, fill: 'rgba(200,235,255,0.25)', stroke: '#E2B33C', 'stroke-width': 9 }, lens);
  const epi = T(Lfg, 600, 250, 'Episode 18: The Great Canteen Vote', { size: 40, weight: 700, anchor: 'middle', fill: '#FFFFFF' });
  const strip = E('rect', { x: 0, y: 612, width: 1200, height: 138, fill: SD_COL.news }, Lfg);
  const stripT = T(Lfg, 600, 676, '8B NEWS', { size: 44, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 4 });

  /* ================= the cast ================= */
  const tan = cast(Lcast, 'tan');
  const priya = cast(Lcast, 'priya');
  const kav = cast(Lcast, 'kavya');
  const rose = cast(Lcast, 'rose', { prop: null });            // title card only
  const lt = { kavya: sdLowerThird(Lhud, 'kavya'), tan: sdLowerThird(Lhud, 'tan'), priya: sdLowerThird(Lhud, 'priya'), axis: sdLowerThird(Lhud, 'axis') };
  const ltOn = (t, who, t0) => lt[who].set(win(t, t0, t0 + 3.1, 0.3));

  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cut points */
  const cB = at('tan') - 0.06, cC = at('priya') - 0.06, cD = at('tiny') - 0.06, cE = at('hi') - 0.06,
    cG = at('loyal') - 0.06, cH = at('charge') - 0.06, cI = at('title') - 0.06;
  const studioLayers = [studio, Lcast, Lfront];
  const PC = studio.pc;

  return t => {
    op(blackout, 1 - P(t, 0, 0.6, linear));
    const sA = on(t, -1, cB), sB = on(t, cB, cC), sC = on(t, cC, cD), sD = on(t, cD, cE), sE = on(t, cE, cG),
      sG = on(t, cG, cH), sH = on(t, cH, cI), sI = on(t, cI, 1e9);
    const stOn = sA || sB || sC || sD || sG || sH;
    for (const k in lt) lt[k].set(0);
    const show = { tan: 0, priya: 0, kav: 0, rose: 0, axisD: 0 };

    /* ---------- the studio (A, B, C, D, G, H) ---------- */
    op(studio, stOn); op(studio.front, stOn); op(studio.top, stOn);
    let vk = 1, vfx = 600, vfy = 375, vsx = 600, vsy = 375;
    if (sA) { const p = P(t, 0, cB, linear); vk = 1 + 0.1 * p; vfx = 520; vfy = 400; vsx = 600; vsy = 375 + 20 * p; }
    if (sC && t >= at('who') - 0.06 && t < at('chat') - 0.06) { const p = P(t, at('who') - 0.06, end('who') + 0.3 - at('who'), ease); vk = 1 + 0.28 * p; vfx = 470; vfy = 380; vsx = lerp(600, 520, p); vsy = 375; }
    if (sD) {
      const z = P(t, cD + 0.25, cE - cD - 0.35, ease), zc = ease(clamp(z * 2.2));
      vk = Math.pow(7.6, z); vfx = lerp(600, PC[0], zc); vfy = lerp(375, PC[1], zc); vsx = 600; vsy = 375;
      setText(zoomTxt, 'ZOOM ×' + vk.toFixed(1));
    }
    const vstr = stOn ? viewStr(vk, vfx, vfy, vsx, vsy) : '';
    studioLayers.forEach(el => el.setAttribute('transform', vstr));
    op(finder, sD); if (sD) op(recDot, Math.sin(t * TAU * 0.8) > 0 ? 1 : 0.2);
    if (stOn) {
      studio.upd(t); studio.onAir(0);
      axisM.set({ t, mood: 'deadpan', look: Math.sin(t * 1.3) * 0.5 });
    }
    // mop: topples on "Also the mop cupboard"
    const mopP = P(t, mid('kavya', 0.82), 0.7, easeIn);
    tr(studio.mop, 300, 560, 1, 62 * mopP);
    // wall-screen pages
    op(studio.logo, 0); op(pgBreak, 0); op(pgPie, 0); op(pgAxis, 0);
    if (sA || sD) op(studio.logo, 1);
    if (sB) {
      op(pgBreak, 1);
      const p1 = P(t, mid('tan', 0.55), 0.4, pop), p2 = P(t, mid('tan', 0.8), 0.4, pop);
      op(bCup, clamp(p1 * 3)); tr(bCup, scx - 150, SC.y + 236, 0.78 * Math.max(0.01, 0.6 + 0.4 * p1));
      op(bBowl, clamp(p2 * 3)); tr(bBowl, scx + 150, SC.y + 236, 0.95 * Math.max(0.01, 0.6 + 0.4 * p2));
      op(vs, clamp(P(t, mid('tan', 0.66), 0.3, linear)));
      const q = P(t, mid('words', 0.45), 0.4, pop);
      op(quote, clamp(q * 3)); tr(quote, 0, 30 * (1 - clamp(q)));
      tr(bCup, scx - 150, SC.y + 236 - 50 * clamp(q), 0.78 * Math.max(0.01, 0.6 + 0.4 * p1) * (1 - 0.25 * clamp(q)));
      tr(bBowl, scx + 150, SC.y + 236 - 50 * clamp(q), 0.95 * Math.max(0.01, 0.6 + 0.4 * p2) * (1 - 0.25 * clamp(q)));
      tr(vs, 0, -50 * clamp(q));
    }
    if (sC || sG) { op(pgPie, 1); pie100.set(sC ? P(t, mid('priya', 0.45), 0.6, ease) : 1); }
    if (sH) {
      op(pgAxis, 1);
      const chk = mid('charge', 0.72);
      axisS.set({ t, talk: scTalk(S, t, 'axis'), mood: 'deadpan', look: 0, glass: t > chk ? 1 : 0, tip: 0 });
      tickHi.forEach((e, i) => op(e, P(t, chk + i * 0.12, 0.15, linear)));
    }

    // chips
    op(cKav, 0); op(cMon, 0); op(cRoom, 0); cFair.set(0); op(cDays, 0); op(cCan, 0); op(cPup, 0); cCheck.set(0); op(phone, 0);
    if (sA) {
      popIn(cKav, t, mid('kavya', 0.05), 470, 250);
      popIn(cMon, t, mid('kavya', 0.3), 880, 372);
      popIn(cRoom, t, mid('kavya', 0.5), 860, 470);
      ltOn(t, 'kavya', at('kavya') + 1.2);
    }
    if (sB && t > mid('report', 0.6)) cFair.set(P(t, mid('report', 0.6), 0.4, linear)), tr(cFair, 470, 250);
    if (sC && t >= at('chat') - 0.06) {
      const pp = P(t, at('chat') - 0.06, 0.4, pop);
      op(phone, clamp(pp * 3)); tr(phone, 985, 380, Math.max(0.01, 0.4 + 0.6 * pp), 4);
      chatB.forEach((b, i) => op(b, P(t, mid('chat', 0.15 + i * 0.22), 0.2, linear)));
    }
    if (sH) {
      popIn(cDays, t, mid('charge', 0.02), 150, 210);
      popIn(cCan, t, mid('charge', 0.16), 330, 210);
      popIn(cPup, t, mid('charge', 0.32), 530, 210);
      if (t > mid('charge', 0.7)) { cCheck.set(P(t, mid('charge', 0.7), 0.4, linear)); tr(cCheck, 880, 470); }
    }

    // the humans in the studio
    if (sA) {
      show.kav = 1;
      tr(kav, 470, 440, 1.02);
      kav.set({ t, talk: 0, mood: t > mid('kavya', 0.9) ? 'deadpan' : 'neutral', look: t > mid('kavya', 0.86) ? -1 : 0.2 });
    }
    if (sB) {
      show.kav = 1; show.tan = 1;
      const up = P(t, cB, 0.4, easeOut);
      tr(tan, lerp(-120, 220, up), 446, 1.0);
      tan.set({ t, talk: scTalk(S, t, 'tan'), mood: t < at('report') ? 'happy' : 'neutral', look: t < at('report') ? 0.7 : 0.8, lift: t < at('words') ? 0.3 : 0 });
      tr(kav, 470, 440, 1.02);
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: t < at('words') ? 'shock' : t < at('report') ? 'neutral' : 'smug', look: t < at('report') ? -0.8 : 0 });
      ltOn(t, 'tan', at('tan') + 0.3);
    }
    if (sC || sG || sH) {
      show.kav = 1; show.tan = 1; show.priya = 1;
      let px = 780, kx = 470, tx = 220;
      if (sC) px = lerp(1320, 780, P(t, cC, 0.45, easeOut));
      if (sH) { px = 610; kx = 400; tx = 180; }
      tr(priya, px, 448, 1.0); tr(kav, kx, 440, 1.02); tr(tan, tx, 446, 1.0);
      let pm = 'happy', pl = -0.7, plift = 1, km = 'neutral', kl = 0.7, tm = 'neutral', tl = 0.7;
      if (sC) {
        if (t >= at('who') && t < at('chat')) { pm = 'neutral'; km = 'deadpan'; }
        if (t >= at('chat')) { pm = 'smug'; km = 'deadpan'; tm = 'deadpan'; kl = 0.9; }
        ltOn(t, 'priya', at('priya') + 0.3);
      }
      if (sG) { pm = 'smug'; pl = 0; km = t > end('loyal') ? 'deadpan' : 'neutral'; tm = 'deadpan'; plift = 0.6; kl = 0.9; tl = 0.9; }
      if (sH) { pm = 'shock'; km = 'neutral'; tm = 'neutral'; pl = 0.8; kl = 0.9; tl = 0.9; plift = 0; if (t > mid('charge', 0.72)) { km = 'smug'; pm = 'annoyed'; } }
      priya.set({ t, talk: scTalk(S, t, 'priya'), mood: pm, look: pl, lift: plift });
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
      tan.set({ t, mood: tm, look: tl });
    }

    /* ---------- E: the Fact-Check Desk ---------- */
    op(desk, sE); op(desk.front, sE); op(desk.top, sE); op(stampB, 0);
    if (sE) {
      desk.upd(t);
      show.axisD = 1;
      tr(axisD, 330, 392, 1.1);
      let mood = 'deadpan', look = 0, glass = 0, tip = 0;
      if (t < at('biased')) { glass = t > mid('hi', 0.22) && t < mid('hi', 0.7) ? 1 : 0; tip = P(t, mid('hi', 0.75), 0.3, ease) * (1 - P(t, end('hi') + 0.2, 0.3, ease)); }
      else { look = 1; glass = t > mid('biased', 0.05) && t < mid('biased', 0.55) ? 1 : 0; mood = t > mid('biased', 0.8) ? 'smug' : 'deadpan'; }
      axisD.set({ t, talk: scTalk(S, t, 'axis'), mood, look, glass, tip });
      ltOn(t, 'axis', at('hi') + 0.2);
      // the evidence board builds on "biased"
      const b0 = at('biased');
      op(evPie, P(t, b0 - 0.1, 0.3, linear));
      op(popG, P(t, mid('biased', 0.12), 0.3, linear)); op(popLab, P(t, mid('biased', 0.12), 0.3, linear));
      op(fans, 1); op(ringF, P(t, mid('biased', 0.22), 0.25, linear));
      op(string, P(t, mid('biased', 0.22), 0.25, linear));
      fanLab.set(P(t, mid('biased', 0.25), 0.4, linear)); tr(fanLab, BR.x + 340, BR.y + 22);
      if (t < b0 - 0.1) { op(evPie, 0); op(popG, 0); op(popLab, 0); op(ringF, 0); op(string, 0); fanLab.set(0); }
      const sp = P(t, mid('biased', 0.4), 0.35, linear);
      if (sp > 0) { stampB.set(sp); tr(stampB, BR.x + 112, BR.y + 150, 0.5); }
    }

    /* ---------- I: title card ---------- */
    op(titleShot, sI); op(logo, 0); op(epi, 0); op(strip, sI); op(stripT, sI);
    if (sI) {
      tr(rayP, 600, 420, 1, (t * 6 * AMP) % 360);
      const hs = [0.35, 0.55, 0.8, 0.62, 0.95, 0.7];
      tBars.forEach((b, i) => { const h = 420 * hs[i] * P(t, at('title') + 0.05 + i * 0.08, 0.6, easeOut); attr(b, 'y', 600 - h); attr(b, 'height', h); });
      const lp = P(t, at('title') + 0.05, 0.6, pop);
      op(logo, clamp(lp * 2.5)); tr(logo, 600, 150, Math.max(0.01, 0.5 + 0.5 * lp));
      tr(lens, 340, -24, 1, Math.sin(t * 2) * 8 * AMP);
      op(epi, P(t, mid('title', 0.4), 0.4, linear));
      const castT = i => mid('title', 0.5) + i * 0.13, xs = [180, 390, 600, 810, 1020];
      const row = [[priya, 'smug', 0.74, 'priya'], [kav, 'happy', 0.8, 'kav'], [axisD, 'deadpan', 0.72, 'axisD'], [tan, 'happy', 0.72, 'tan'], [rose, 'happy', 0.7, 'rose']];
      row.forEach(([c, mood, s, key], i) => {
        const p = P(t, castT(i), 0.45, pop);
        show[key] = 1; op(c, clamp(p * 3));
        const y = key === 'axisD' ? 470 : 520;
        tr(c, xs[i], y + 30 * (1 - clamp(p)), Math.max(0.01, s * p));
        c.set({ t, mood, look: 0, tip: key === 'axisD' ? P(t, castT(i) + 0.5, 0.4, ease) : 0, lift: 0 });
      });
    }

    /* characters not in this shot */
    if (!sI) { op(tan, show.tan); op(priya, show.priya); op(kav, show.kav); op(rose, 0); op(axisD, show.axisD); }
  };
});
