/* Scene 3: Dame Pie presents (Bar charts, pie charts & line graphs)
   Wednesday, rehearsal in the Media Club studio. Shots (hard sitcom cuts):
   W  wide studio: Kavya, Mr Tan and Priya behind the news desk; Dame Pie on the wall screen (pie), then on the desk (slice, dare)
   O  over-the-shoulder: the three humans on the left, a big graphics panel on the right   one, back, more, dual, compound, season, trend
   G  Dame Pie presenting on a graphics backdrop, a wide panel                               mult, totals, weather
   R  Auntie Rose's video call on the left, her pie in the wide panel                         rose
   Showpiece: the pie sweeping to 156°, 132°, 72° with the angles in the slices; then the dual bars sliding together
   into compound bars. */
scene('pie', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const GOLD = '#FFE45C', GREEN = '#56D69B', BT = '#B48CFF', IK = '#FF6B5C', DM = '#C9D3DC', LOW = '#4CC9F0', UPP = '#FFB24A';
  const popSet = (el, t, t0, t1, x, y, s) => { const p = t >= t0 && t < t1 ? P(t, t0, 0.35, linear) : 0; el.set(p); if (x !== undefined) tr(el, x, y, s); };
  const chipD = (parent, text, o) => { o = o || {}; return mkChip(parent, text, { size: o.size || 28, col: o.col || C.ink }); };
  const fade = (el, t, t0, d) => op(el, P(t, t0, d || 0.25, linear));

  /* layers */
  const Lbg = G(root), Lcast = G(root), Lpanel = G(root), Lfront = G(root), Ltop = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= the studio ================= */
  const studio = sdStudio(Lbg);
  Lfront.appendChild(studio.front); Lfront.appendChild(studio.top);
  const SC = studio.scr;
  // the wall screen: Dame Pie and her great-great-grandmother
  const scrPie = G(studio.screen);
  E('rect', { x: SC.x, y: SC.y, width: SC.w, height: SC.h, fill: linGrad('#3A1430', '#6E2A5C', true) }, scrPie);
  const spHold = G(scrPie); tr(spHold, SC.x + 140, SC.y + 172, 0.82);
  const pieS = cast(spHold, 'pie');
  const nf = G(scrPie); tr(nf, SC.x + 392, SC.y + 98);
  E('rect', { x: -86, y: -78, width: 172, height: 156, rx: 6, fill: '#E2B33C', stroke: '#8A6410', 'stroke-width': 4 }, nf);
  E('rect', { x: -72, y: -64, width: 144, height: 128, fill: '#F3E6C8', stroke: '#8A6410', 'stroke-width': 2 }, nf);
  { // Nightingale's rose: 12 wedges of different lengths
    const rl = [30, 44, 58, 52, 40, 34, 26, 22, 28, 36, 48, 54]; let d1 = '', d2 = '';
    rl.forEach((r, i) => { const w = 'M0,0 L' + mkArcD(0, 0, r, i * 30 - 90, i * 30 - 60).slice(1) + ' Z '; if (i % 2) d1 += w; else d2 += w; });
    E('path', { d: d1, fill: '#B9875A', stroke: '#6B4423', 'stroke-width': 1.5 }, nf);
    E('path', { d: d2, fill: '#D8A878', stroke: '#6B4423', 'stroke-width': 1.5 }, nf);
  }
  T(scrPie, SC.x + 392, SC.y + 224, 'Florence Nightingale,', { size: 26, weight: 700, anchor: 'middle', fill: '#FFE7A8' });
  T(scrPie, SC.x + 392, SC.y + 256, 'rose diagram, 1858', { size: 26, weight: 700, anchor: 'middle', fill: '#FFE7A8' });

  /* ================= the graphics backdrop (G, R) ================= */
  const gfx = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#2A1030', '#14243A', true) }, gfx);
  let rays = '';
  for (let i = 0; i < 14; i++) { const a0 = i / 14 * TAU, a1 = a0 + TAU / 36; rays += `M0,0 L${(Math.cos(a0) * 1100).toFixed(0)},${(Math.sin(a0) * 1100).toFixed(0)} L${(Math.cos(a1) * 1100).toFixed(0)},${(Math.sin(a1) * 1100).toFixed(0)} Z `; }
  const gRays = E('path', { d: rays, fill: '#FFFFFF', opacity: 0.04 }, gfx);
  E('rect', { x: 0, y: 690, width: 1200, height: 60, fill: SD_COL.news }, gfx);

  /* ================= the panel ================= */
  const panO = G(Lpanel), panG = G(Lpanel);
  E('rect', { x: 470, y: 110, width: 700, height: 410, rx: 16, fill: linGrad('#14305A', '#0B1A30', true), stroke: '#6E95C2', 'stroke-width': 4 }, panO);
  E('rect', { x: 360, y: 110, width: 810, height: 410, rx: 16, fill: linGrad('#14305A', '#0B1A30', true), stroke: '#6E95C2', 'stroke-width': 4 }, panG);
  const Lpc = G(Lpanel);   // panel content

  // one: 60 pupils share 360°
  const pgOne = G(Lpc);
  mkText(pgOne, 495, 160, '60 pupils share **360°**', { size: 32, fill: C.ink, boldFill: GOLD });
  const oneM = mkMath(pgOne, 680, 300, '360 ÷ 60 = 6°', { size: 56, fill: GOLD, anchor: 'middle' });
  const oneC = chipD(pgOne, '**one** pupil = **6°**', { col: GREEN, size: 32 }); tr(oneC, 680, 410);
  const wheel = G(pgOne); tr(wheel, 1030, 330);
  E('circle', { r: 128, fill: '#1E3F6B', stroke: C.ink, 'stroke-width': 4 }, wheel);
  let spk = ''; for (let i = 0; i < 60; i++) { const a = (i * 6 - 90) * Math.PI / 180; spk += `M0,0 L${(Math.cos(a) * 128).toFixed(1)},${(Math.sin(a) * 128).toFixed(1)} `; }
  E('path', { d: spk, stroke: '#6E95C2', 'stroke-width': 1.5, opacity: 0.8 }, wheel);
  const wedge = E('path', { d: 'M0,0 L' + mkArcD(0, 0, 128, -90, -84).slice(1) + ' Z', fill: GOLD, stroke: '#B58A12', 'stroke-width': 2 }, wheel);
  const wLab = T(wheel, 26, -142, '6°', { size: 30, weight: 800, fill: GOLD });

  // mult: one first, then multiply (G panel)
  const pgMult = G(Lpc);
  mkText(pgMult, 384, 160, '**One first, then multiply.**  1 pupil = 6°', { size: 30, fill: C.ink, boldFill: GOLD });
  const work = mkWorking(pgMult, 690, 196, [
    { m: '"Bubble tea:" 26 × 6 = 156°', col: BT }, { m: '"Ice kachang:" 22 × 6 = 132°', col: IK }, { m: '"Don\'t mind:" 12 × 6 = 72°', col: DM }], { size: 34, gap: 26 });
  const totM = mkMath(pgMult, 590, 486, '156 + 132 + 72 = 360°', { size: 38, fill: GREEN, anchor: 'middle' });
  const pieV = mkPie(pgMult, [26, 22, 12], { r: 140, cols: [BT, IK, DM], labels: ['156°', '132°', '72°'], size: 32, stroke: '#0A1B27' });
  tr(pieV, 1000, 318);
  const stampC = sdStamp(Lfg, 'checked');

  // Auntie Rose's pie (rose, back)
  const rosePie = G(Lpc);
  const rp = mkPie(rosePie, [90, 150, 120], { r: 132, cols: [IK, '#56D69B', '#F7A8C8'], labels: ['90°', 'Chendol', 'Bandung'], size: 26, stroke: '#0A1B27' });
  const roseLab = G(rosePie);
  E('path', { d: 'M0,-22 L22,-22 L22,0', fill: 'none', stroke: '#0A1B27', 'stroke-width': 3 }, roseLab);
  E('line', { x1: 70, y1: -108, x2: 112, y2: -134, stroke: C.ink, 'stroke-width': 3 }, roseLab);
  mkText(roseLab, 116, -132, '**Ice kachang**', { size: 28, fill: IK });
  const roseT = mkText(Lpc, 384, 160, "Rose's Kitchen: **200** customers", { size: 30, fill: C.ink, boldFill: GOLD });
  const backT = mkText(Lpc, 495, 160, '**Backwards**: angle → people', { size: 30, fill: C.ink, boldFill: GOLD });
  const backM = mkMath(Lpc, 1000, 330, '90/360 × 200 = 50', { size: 44, fill: GOLD, anchor: 'middle' });
  const backC = chipD(Lpc, '**50** customers', { col: GREEN, size: 32 });

  // more, totals: the two pies side by side
  const two = G(Lpc);
  const pA = G(two), pB = G(two);
  const pieA = mkPie(pA, [26, 22, 12], { r: 100, cols: [BT, IK, DM], labels: ['', '132°', ''], size: 32, stroke: '#0A1B27' });
  const pieB = mkPie(pB, [90, 150, 120], { r: 100, cols: [IK, '#56D69B', '#F7A8C8'], labels: ['90°', '', ''], size: 32, stroke: '#0A1B27' });
  const tA = mkText(pA, 0, -122, '**School vote**', { size: 28, anchor: 'middle', fill: C.ink });
  const tB = mkText(pB, 0, -122, "**Auntie's stall**", { size: 28, anchor: 'middle', fill: C.ink });
  const totA = mkText(pA, 0, 140, '**60** pupils', { size: 30, anchor: 'middle', fill: GOLD });
  const totB = mkText(pB, 0, 140, '**200** customers', { size: 30, anchor: 'middle', fill: GOLD });
  const wA = mkMath(pA, 0, 214, '132/360 × 60 = 22', { size: 34, fill: C.ink, anchor: 'middle' });
  const wB = mkMath(pB, 0, 214, '90/360 × 200 = 50', { size: 34, fill: C.ink, anchor: 'middle' });
  const vs = mkMath(two, 0, 0, '132° > 90°', { size: 40, fill: BT, anchor: 'middle' });
  const vsQ = T(two, 0, 0, '?', { size: 60, weight: 800, anchor: 'middle', fill: '#FF8A80' });

  // dual and compound bars
  const bars = G(Lpc);
  const BX = 590, BY = 466, BU = 8.6, BW = 50, catX = [670, 830, 990];
  let gl = '';
  for (let v = 0; v <= 30; v += 5) { gl += `M${BX},${BY - v * BU} L${BX + 480},${BY - v * BU} `; T(bars, BX - 12, BY - v * BU + 9, String(v), { size: 26, weight: 600, anchor: 'end', fill: C.ink }); }
  E('path', { d: gl, stroke: MK.grid, 'stroke-width': 2, 'stroke-dasharray': '6 6' }, bars);
  E('path', { d: `M${BX},${BY - 30 * BU - 16} L${BX},${BY} L${BX + 490},${BY}`, fill: 'none', stroke: C.ink, 'stroke-width': 4, 'stroke-linecap': 'round' }, bars);
  const yn = mkText(bars, 0, 0, 'pupils', { size: 26, anchor: 'middle', fill: MK.muted }); yn.setAttribute('transform', `translate(${BX - 58} ${BY - 15 * BU}) rotate(-90)`);
  ['Bubble tea', 'Ice kachang', "Don't mind"].forEach((c, i) => T(bars, catX[i], BY + 34, c, { size: 26, weight: 700, anchor: 'middle', fill: C.ink }));
  const keyG = G(bars);
  E('rect', { x: 640, y: 132, width: 26, height: 26, rx: 4, fill: LOW }, keyG); T(keyG, 676, 154, 'Lower sec', { size: 26, weight: 700, fill: C.ink });
  E('rect', { x: 840, y: 132, width: 26, height: 26, rx: 4, fill: UPP }, keyG); T(keyG, 876, 154, 'Upper sec', { size: 26, weight: 700, fill: C.ink });
  const LV = [17, 9, 5], UV = [9, 13, 7];
  const barEls = catX.map((cx, i) => {
    const lo = E('rect', { x: 0, y: 0, width: BW, height: 0, fill: LOW, stroke: '#0A1B27', 'stroke-width': 2 }, bars);
    const up = E('rect', { x: 0, y: 0, width: BW, height: 0, fill: UPP, stroke: '#0A1B27', 'stroke-width': 2 }, bars);
    const lt = T(bars, 0, 0, String(LV[i]), { size: 26, weight: 800, anchor: 'middle', fill: C.ink });
    const ut = T(bars, 0, 0, String(UV[i]), { size: 26, weight: 800, anchor: 'middle', fill: C.ink });
    const tot = T(bars, cx, BY - (LV[i] + UV[i]) * BU - 12, String(LV[i] + UV[i]), { size: 30, weight: 800, anchor: 'middle', fill: GOLD });
    return { lo, up, lt, ut, tot, cx };
  });

  // weather: the time series (bowls in hundreds per quarter)
  const ts = G(Lpc);
  const TX = 574, TY = 424, TQ = 74, TU = 3.4, Y1 = [42, 58, 47, 35], Y2 = [46, 63, 52, 39], V = Y1.concat(Y2);
  const qx = i => TX + 37 + i * TQ, vy = v => TY - v * TU;
  let tg = '';
  for (let v = 0; v <= 70; v += 10) { tg += `M${TX},${vy(v)} L${TX + 8 * TQ},${vy(v)} `; T(ts, TX - 10, vy(v) + 9, String(v), { size: 26, weight: 600, anchor: 'end', fill: C.ink }); }
  E('path', { d: tg, stroke: MK.grid, 'stroke-width': 2 }, ts);
  const xAx = E('path', { d: `M${TX},${TY - 70 * TU - 16} L${TX},${TY} L${TX + 8 * TQ + 12},${TY}`, fill: 'none', stroke: C.ink, 'stroke-width': 4, 'stroke-linecap': 'round' }, ts);
  const tyn = mkText(ts, 0, 0, 'bowls (100s)', { size: 26, anchor: 'middle', fill: MK.muted }); tyn.setAttribute('transform', `translate(${TX - 64} ${vy(35)}) rotate(-90)`);
  const QN = [['Jan–', 'Mar'], ['Apr–', 'Jun'], ['Jul–', 'Sep'], ['Oct–', 'Dec']];
  for (let i = 0; i < 8; i++) { T(ts, qx(i), TY + 26, QN[i % 4][0], { size: 26, weight: 600, anchor: 'middle', fill: C.ink }); T(ts, qx(i), TY + 50, QN[i % 4][1], { size: 26, weight: 600, anchor: 'middle', fill: C.ink }); }
  E('path', { d: `M${TX + 8},${TY + 60} L${TX + 4 * TQ - 8},${TY + 60} M${TX + 4 * TQ + 8},${TY + 60} L${TX + 8 * TQ - 8},${TY + 60}`, stroke: MK.muted, 'stroke-width': 3 }, ts);
  T(ts, TX + 2 * TQ, TY + 86, 'Year 1', { size: 26, weight: 800, anchor: 'middle', fill: MK.muted });
  T(ts, TX + 6 * TQ, TY + 86, 'Year 2', { size: 26, weight: 800, anchor: 'middle', fill: MK.muted });
  const timeArrow = arrow(ts, TX + 20, TY, TX + 8 * TQ + 14, TY, { color: GOLD, width: 7, head: 22 });
  const tsLine = mkDash(E('path', { d: 'M' + V.map((v, i) => `${qx(i)},${vy(v)}`).join(' L'), fill: 'none', stroke: IK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, ts));
  const tsDots = V.map((v, i) => { const d = G(ts); tr(d, qx(i), vy(v)); E('circle', { r: 8, fill: IK, stroke: '#FFFFFF', 'stroke-width': 3 }, d); return d; });
  const tsTitle = mkText(ts, 384, 160, "Auntie's ice kachang sales, every **3 months**", { size: 28, fill: C.ink, boldFill: GOLD });
  // season: suns on the Apr–Jun peaks, clouds on the Oct–Dec dips
  const sunAt = (i) => { const g = G(ts); tr(g, qx(i), vy(V[i]) - 46); E('circle', { r: 16, fill: GOLD, stroke: '#E2A21C', 'stroke-width': 3 }, g); let r = ''; for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; r += `M${(Math.cos(a) * 22).toFixed(1)},${(Math.sin(a) * 22).toFixed(1)} L${(Math.cos(a) * 30).toFixed(1)},${(Math.sin(a) * 30).toFixed(1)} `; } E('path', { d: r, stroke: GOLD, 'stroke-width': 4, 'stroke-linecap': 'round' }, g); return g; };
  const cloudAt = (i) => { const g = G(ts); tr(g, qx(i), vy(V[i]) - 42); E('path', { d: 'M-24,8 a12,12 0 0 1 4,-22 a16,16 0 0 1 28,-4 a12,12 0 0 1 16,18 Z', fill: '#C9D3DC', stroke: '#5A6670', 'stroke-width': 3 }, g); E('path', { d: 'M-12,16 l-4,10 M0,16 l-4,10 M12,16 l-4,10', stroke: LOW, 'stroke-width': 3, 'stroke-linecap': 'round' }, g); return g; };
  const suns = [sunAt(1), sunAt(5)], clouds = [cloudAt(3), cloudAt(7)];
  // trend: same quarter, year on year
  const arcs = [0, 1, 2, 3].map(i => {
    const g = G(ts), x1 = qx(i), x2 = qx(i + 4), y1 = vy(V[i]) - 14, y2 = vy(V[i + 4]) - 14, top = 168 + i * 0;
    const pth = mkDash(E('path', { d: `M${x1},${y1} C${x1},${top} ${x2},${top} ${x2},${y2}`, fill: 'none', stroke: GREEN, 'stroke-width': 4 }, g));
    const lab = T(g, x2, vy(V[i + 4]) + 40, '+' + (V[i + 4] - V[i]), { size: 28, weight: 800, anchor: 'middle', fill: GREEN });
    lab.setAttribute('stroke', '#0B1A30'); lab.setAttribute('stroke-width', 6); lab.setAttribute('paint-order', 'stroke');
    g.set = p => { op(g, p > 0 ? 1 : 0); mkDraw(pth, p); op(lab, (p - 0.6) / 0.4); };
    return g;
  });
  const trendL = E('path', { d: `M${qx(0)},${vy(44.4)} L${qx(7)},${vy(51.1)}`, fill: 'none', stroke: GOLD, 'stroke-width': 5, 'stroke-dasharray': '14 10' }, ts);
  const swoosh = G(Lpc);
  const swP = mkDash(E('path', { d: 'M420,470 C600,180 900,160 1120,300', fill: 'none', stroke: GOLD, 'stroke-width': 10, 'stroke-linecap': 'round', opacity: 0.6 }, swoosh));
  const swSun = G(swoosh); E('circle', { r: 26, fill: GOLD, stroke: '#E2A21C', 'stroke-width': 4 }, swSun);

  /* ================= chips ================= */
  const ch = {
    wed: chipD(Lfg, '**Wednesday**: rehearsal', { col: GOLD, size: 30 }),
    prop: chipD(Lfg, 'pies show **proportions**, not amounts', { col: GREEN, size: 30 }),
    dual: chipD(Lfg, '**dual bar chart**:\nbest for comparing groups', { col: LOW }),
    comp: chipD(Lfg, '**compound bar chart**:\nheight = the **total**', { col: UPP }),
    seas: chipD(Lfg, '**seasonal pattern**:\npeaks every Apr–Jun', { col: GOLD }),
    time: chipD(Lfg, '**time** along the bottom', { col: '#CFE3FF' }),
    same: chipD(Lfg, 'compare the **same** quarter', { col: GREEN }),
    trend: chipD(Lfg, 'trend: **upwards** ↗', { col: GOLD, size: 32 }),
    more: chipD(Lfg, '"so **more** people!"', { col: BT }),
  };
  const bubDare = mkSpeechBubble(Lfg, '**How dare you.**', { size: 36, tail: 'down', tailX: 60 });

  /* ================= the cast ================= */
  const kav = cast(Lcast, 'kavya');
  const tan = cast(Lcast, 'tan');
  const priya = cast(Lcast, 'priya', { prop: null, hand: true, side: 'right' });
  const fork = G(priya.hand);
  E('path', { d: 'M0,10 L0,-46 M-9,-46 L-9,-70 M0,-46 L0,-72 M9,-46 L9,-70 M-9,-46 Q0,-40 9,-46', fill: 'none', stroke: '#C9D3DC', 'stroke-width': 5, 'stroke-linecap': 'round' }, fork);
  const pie = cast(Lcast, 'pie');
  const call = sdRoseCall(Lcast, 300, 280, 'Auntie Rose');
  const lt = { pie: sdLowerThird(Lhud, 'pie') };
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cuts */
  const cut = id => at(id) - 0.06;
  const cOne = cut('one'), cMult = cut('mult'), cRose = cut('rose'), cBack = cut('back'), cTot = cut('totals'), cDual = cut('dual'),
    cWea = cut('weather'), cSea = cut('season'), cSli = cut('slice');

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const sW = on(t, -1, cOne) || on(t, cSli, 1e9);
    const sG = on(t, cMult, cRose) || on(t, cTot, cDual) || on(t, cWea, cSea);
    const sR = on(t, cRose, cBack);
    const sO = on(t, cOne, cMult) || on(t, cBack, cTot) || on(t, cDual, cWea) || on(t, cSea, cSli);
    for (const k in ch) ch[k].set(0);
    lt.pie.set(0); stampC.set(0); bubDare.set(0);

    /* ---------- sets ---------- */
    op(studio, sW || sO); op(studio.front, sW || sO); op(studio.top, sW || sO);
    op(gfx, sG || sR);
    if (sW || sO) { studio.onAir(0); studio.upd(t); }
    if (sG || sR) tr(gRays, 200, 420, 1, (t * 5 * AMP) % 360);
    op(panO, sO); op(panG, sG || sR); op(Lpc, sO || sG || sR);
    op(studio.logo, 0); op(scrPie, t < cOne ? 1 : 0);

    /* ---------- the panel pages ---------- */
    op(pgOne, on(t, cOne, cMult)); op(pgMult, on(t, cMult, cRose));
    op(rosePie, on(t, cRose, cTot) && t < cut('more') ? 1 : 0); op(roseT, sR); op(backT, on(t, cBack, cut('more')));
    op(backM, 0); backC.set(0);
    op(two, on(t, cut('more'), cDual)); op(bars, on(t, cDual, cWea)); op(ts, on(t, cWea, cSli)); op(swoosh, sG && t >= cWea ? 1 : 0);

    if (t >= cOne && t < cMult) {
      fade(oneM, t, mid('one', 0.45)); oneC.set(P(t, mid('one', 0.78), 0.35, linear));
      op(wedge, P(t, mid('one', 0.7), 0.25, linear)); op(wLab, P(t, mid('one', 0.72), 0.25, linear));
    }
    if (t >= cMult && t < cRose) {
      const l0 = mid('mult', 0.2), l1 = mid('mult', 0.45), l2 = mid('mult', 0.66);
      work.show(0, P(t, l0, 0.3, linear)); work.show(1, P(t, l1, 0.3, linear)); work.show(2, P(t, l2, 0.3, linear));
      // the pie sweeps slice by slice as each angle is said
      const sw = t < l0 ? 0 : t < l1 ? lerp(0, 156, P(t, l0 + 0.2, 0.7, ease)) : t < l2 ? lerp(156, 288, P(t, l1 + 0.2, 0.7, ease)) : lerp(288, 360, P(t, l2 + 0.2, 0.6, ease));
      pieV.set(sw / 360);
      fade(totM, t, mid('mult', 0.84));
      const sp = P(t, mid('mult', 0.92), 0.35, linear);
      if (sp > 0) { stampC.set(sp); tr(stampC, 590, 600, 0.6); }
    }
    if (t >= cRose && t < cut('more')) {
      if (sR) { tr(rosePie, 690, 340); rp.set(P(t, mid('rose', 0.3), 0.6, ease)); op(roseLab, P(t, mid('rose', 0.3) + 0.3, 0.25, linear)); }
      else {
        tr(rosePie, 640, 340); rp.set(1); op(roseLab, 1);
        fade(backM, t, mid('back', 0.2)); backC.set(P(t, mid('back', 0.72), 0.35, linear)); tr(backC, 1000, 446);
      }
    }
    if (t >= cut('more') && t < cDual) {
      const sGx = sG ? [570, 960] : [650, 990];
      tr(pA, sGx[0], sG ? 270 : 300); tr(pB, sGx[1], sG ? 270 : 300); tr(vs, 820, sO ? 488 : -100);
      const dim = sO ? P(t, mid('more', 0.15), 0.3, linear) : 1;
      [0, 2].forEach(i => op(pieA.secs[i].el, 1 - 0.7 * dim)); [1, 2].forEach(i => op(pieB.secs[i].el, 1 - 0.7 * dim));
      op(tA, 1); op(tB, 1);
      op(vs, sO ? P(t, mid('more', 0.55), 0.3, linear) : 0);
      op(vsQ, 0);
      fade(totA, t, mid('totals', 0.3)); fade(totB, t, mid('totals', 0.42));
      fade(wA, t, mid('totals', 0.55)); fade(wB, t, mid('totals', 0.78));
      if (sO) { op(totA, 0); op(totB, 0); op(wA, 0); op(wB, 0); }
      if (sG) popSet(ch.prop, t, mid('totals', 0.12), cDual, 765, 600);
    }
    if (t >= cDual && t < cWea) {
      // dual bars grow, then the upper bars slide on top (compound)
      const k = P(t, mid('compound', 0.15), 0.9, ease);
      barEls.forEach((b, i) => {
        const g = P(t, mid('dual', 0.1) + i * 0.15, 0.5, easeOut), lh = LV[i] * BU * g, uh = UV[i] * BU * g;
        const lx = lerp(b.cx - BW - 3, b.cx - BW / 2, k), ux = lerp(b.cx + 3, b.cx - BW / 2, k), uy = lerp(BY - uh, BY - lh - uh, k);
        attr(b.lo, 'x', lx); attr(b.lo, 'y', BY - lh); attr(b.lo, 'height', lh);
        attr(b.up, 'x', ux); attr(b.up, 'y', uy); attr(b.up, 'height', uh);
        // value labels: on top of each bar (dual), inside each part (compound)
        attr(b.lt, 'x', lx + BW / 2); attr(b.lt, 'y', lerp(BY - lh - 10, BY - lh / 2 + 9, k));
        attr(b.ut, 'x', ux + BW / 2); attr(b.ut, 'y', lerp(uy - 10, uy + uh / 2 + 9, k));
        op(b.lt, g > 0.95 ? 1 : 0); op(b.ut, g > 0.95 ? 1 : 0);
        op(b.tot, P(t, mid('compound', 0.62) + i * 0.15, 0.25, linear));
      });
      popSet(ch.dual, t, mid('dual', 0.5), cut('compound'), 240, 180);
      popSet(ch.comp, t, mid('compound', 0.55), cWea, 240, 180);
    }
    if (t >= cWea && t < cSli) {
      const sw = P(t, mid('weather', 0.05), 0.9, ease);
      mkDraw(swP, sw); op(swP, sw > 0 ? 1 - P(t, mid('weather', 0.4), 0.3, linear) : 0);
      const sp = sw;
      const px = sp < 1 ? 420 + 700 * sp : 1120, py = 470 - 260 * Math.sin(Math.PI * sp * 0.7);
      tr(swSun, px, py); op(swSun, clamp(sw * 4) * (1 - P(t, mid('weather', 0.4), 0.3, linear)));
      const b0 = mid('weather', 0.45);
      op(xAx, 1);
      mkDraw(tsLine, P(t, b0, 2.2, linear)); op(tsLine, t > b0 ? 1 : 0);
      tsDots.forEach((d, i) => mkPopIn(d, P(t, b0 + i * 0.27, 0.3, linear)));
      tr(tsTitle, sG ? 0 : 111, 0); op(tsTitle, t < cSea ? 1 : 0);
      suns.forEach((s, i) => op(s, t < cut('trend') ? P(t, mid('season', 0.5) + i * 0.2, 0.25, linear) : 0));
      clouds.forEach((s, i) => op(s, t < cut('trend') ? P(t, mid('season', 0.7) + i * 0.2, 0.25, linear) : 0));
      timeArrow.set(t < cut('trend') ? P(t, mid('season', 0.1), 0.6, ease) : 0); op(timeArrow, t >= cSea && t < cut('trend') ? 1 : 0);
      arcs.forEach((a, i) => a.set(P(t, mid('trend', 0.3) + i * 0.32, 0.4, ease)));
      op(trendL, P(t, mid('trend', 0.8), 0.3, linear));
      popSet(ch.time, t, mid('season', 0.12), at('trend'), 240, 290);
      popSet(ch.seas, t, mid('season', 0.45), at('trend'), 240, 180);
      popSet(ch.same, t, mid('trend', 0.15), cSli, 240, 160);
      popSet(ch.trend, t, mid('trend', 0.82), cSli, 240, 240);
    }

    /* ---------- the humans (W, O) ---------- */
    const hum = sW || sO;
    op(kav, hum); op(tan, hum); op(priya, hum);
    if (hum) {
      const W2 = t >= cSli;
      const X = sO ? [110, 262, 414] : W2 ? [170, 380, 600] : [150, 340, 530], k = sO ? 0.85 : 0.95, y = sO ? 452 : 446;
      tr(kav, X[0], y, k); tr(tan, X[1], y, k); tr(priya, X[2], y, k);
      const who = scWho(S, t), sx = { kavya: X[0], tan: X[1], priya: X[2] }[who];
      const tgt = sx !== undefined ? sx : (W2 ? 850 : 880);
      const lk = x => (sx === x ? 0.8 : clamp((tgt - x) / 200, -1, 1));
      let km = 'neutral', tm = 'neutral', pm = 'neutral', plift = 0;
      if (t < cOne) { km = 'happy'; tm = 'happy'; pm = 'happy'; }
      if (t >= cOne && t < cMult) { km = 'happy'; pm = 'smug'; }
      if (t >= cBack && t < cut('more')) { km = 'smug'; pm = 'neutral'; }
      if (t >= cut('more') && t < cTot) { pm = 'smug'; km = t > mid('more', 0.75) ? 'deadpan' : 'neutral'; tm = t > mid('more', 0.75) ? 'deadpan' : 'neutral'; plift = 0.4; }
      if (t >= cDual && t < cWea) { km = 'neutral'; tm = t >= at('compound') ? 'happy' : 'neutral'; pm = 'neutral'; }
      if (t >= cSea && t < cSli) { km = 'happy'; tm = t >= at('trend') ? 'smug' : 'neutral'; pm = 'annoyed'; }
      if (W2) { pm = t < at('dare') ? 'smug' : 'shock'; km = 'deadpan'; tm = 'deadpan'; plift = t < at('dare') ? P(t, mid('slice', 0.3), 0.5, ease) : 1 - P(t, mid('dare', 0.4), 0.4, ease); }
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: lk(X[0]) });
      tan.set({ t, talk: scTalk(S, t, 'tan'), mood: tm, look: lk(X[1]) });
      priya.set({ t, talk: scTalk(S, t, 'priya'), mood: pm, look: lk(X[2]), lift: plift });
      op(fork, W2 ? 1 : 0);
      if (t >= cut('more') && t < cTot) popSet(ch.more, t, mid('more', 0.8), cTot, 260, 200);
      if (t < cOne) popSet(ch.wed, t, at('pie') - 0.1, cOne, 330, 170);
    }

    /* ---------- Dame Pie ---------- */
    // on the wall screen (W, the first line)
    if (t < cOne) {
      const sw = P(t, at('pie') - 0.1, 0.6, easeOut);
      tr(spHold, lerp(SC.x + 600, SC.x + 140, sw), SC.y + 172, 0.82);
      pieS.set({ t, talk: scTalk(S, t, 'pie'), mood: 'smug', look: 0.5, arms: t > mid('pie', 0.1) && t < mid('pie', 0.4) ? 1 : 0.3 });
      op(nf, P(t, mid('pie', 0.5), 0.3, linear));
      lt.pie.set(win(t, at('pie') + 0.4, at('pie') + 3.5, 0.3));
    }
    op(pie, sG || (t >= cSli ? 1 : 0));
    if (sG) {
      tr(pie, 182, 420, 1.0);
      let mood = 'smug', arms = 0.2;
      if (t >= cWea) { mood = 'happy'; arms = t < mid('weather', 0.7) ? 1 : 0.4; }
      if (t >= cTot && t < cDual) { mood = 'smug'; arms = t > mid('totals', 0.1) && t < mid('totals', 0.3) ? 0.8 : 0.2; }
      pie.set({ t, talk: scTalk(S, t, 'pie'), mood, look: 0.8, arms });
    }
    if (t >= cSli) {
      const step = P(t, cSli, 0.4, easeOut);
      tr(pie, lerp(1000, 850, step), 428, 0.85);
      // "a slice?": she gasps and the gold slice jumps out; "How dare you": it snaps back shut
      const out = P(t, mid('slice', 0.72), 0.25, pop) * (1 - P(t, mid('dare', 0.55), 0.18, easeIn));
      const mood = t < mid('slice', 0.7) ? 'smug' : t < mid('dare', 0.55) ? 'shock' : 'annoyed';
      pie.set({ t, talk: scTalk(S, t, 'pie'), mood, look: -0.9, slice: out, arms: t >= at('dare') ? 0.6 : 0 });
      popSet(bubDare, t, at('dare'), 1e9, 900, 250);
    }

    /* ---------- Auntie Rose on a video call ---------- */
    op(call, sR);
    if (sR) {
      tr(call, 186, 380);
      call.rose.set({ t, talk: scTalk(S, t, 'rose'), mood: 'happy', look: 0.6 });
    }
  };
});
