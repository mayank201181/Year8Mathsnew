/* Scene 7: Lionel takes a nap (real-life and distance-time graphs).
   3 p.m.: ICE CREAM! -> the bike-hire shops: X $8 + $3 an hour, Y $5 an hour -> the graph: C = 3h + 8 and C = 5h ->
   they cross at h = 4, both $20 -> Dad: ride 6 hours -> Mum: X $26, Y $30, shop X; and we ride for one -> the park:
   Priya rides to the jetty and back; her watch draws a distance-time graph -> three Lionels make the three pieces
   (up 6 km in 30 min, flat 20 min, down home in 20 min) -> Dad: steady speed? -> the flat Lionel is asleep: she
   stopped (OFF THE LINE) -> Mo: gradient = speed, steeper = faster, down = coming back -> minutes to hours: 12 km/h
   out, 18 km/h back -> Ah Boy's curve -> Curvy, Lionel's cousin: a curve means the speed is changing -> two
   distance-time graphs cross where two people meet. */
scene('ride', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 3, color: o.color || C.ink, weight: 700 }); };
  const winP = (t, a, b, d) => (t >= a && t < b ? P(t, a, d || 0.3, linear) : 0);
  const GOLD = '#FFE45C', INK = MK.ink, GREEN = '#1E9E5A', RED = '#D32F2F', BLUE = '#2E7DD8', ORANGE = '#E8751A', AMBER = '#C77A0A', BERRY = '#B8336A';
  const paperCard = (parent, x, y, w, h) => {
    E('rect', { x: x + 6, y: y + 7, width: w, height: h, rx: 18, fill: 'rgba(0,0,0,0.22)' }, parent);
    return E('rect', { x, y, width: w, height: h, rx: 18, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, parent);
  };
  // axes with separate x and y steps (mkAxes draws one step for both)
  function axes2(parent, o) {
    const ax = mkAxes(parent, Object.assign({}, o, { grid: false, labelStep: 1e6 }));
    const gr = G(ax); ax.insertBefore(gr, ax.firstChild);
    let d = '', tk = '';
    for (let x = o.xmin + o.xs; x <= o.xmax + 1e-9; x += o.xs) d += `M${ax.px(x).toFixed(1)},0 L${ax.px(x).toFixed(1)},${ax.H.toFixed(1)} `;
    for (let y = o.ymin + o.ys; y <= o.ymax + 1e-9; y += o.ys) d += `M0,${ax.py(y).toFixed(1)} L${ax.W.toFixed(1)},${ax.py(y).toFixed(1)} `;
    E('path', { d, stroke: MK.gridInk, 'stroke-width': 2 }, gr);
    const s = o.size || 24;
    for (let x = o.xmin + o.xl; x <= o.xmax + 1e-9; x += o.xl) { tk += `M${ax.px(x).toFixed(1)},${ax.H - 7} L${ax.px(x).toFixed(1)},${ax.H + 7} `; T(ax, ax.px(x), ax.H + 10 + s * 0.85, mkFmt(x), { size: s, anchor: 'middle', fill: INK, weight: 600 }); }
    for (let y = o.ymin + o.yl; y <= o.ymax + 1e-9; y += o.yl) { tk += `M-7,${ax.py(y).toFixed(1)} L7,${ax.py(y).toFixed(1)} `; T(ax, -12, ax.py(y) + s * 0.35, mkFmt(y), { size: s, anchor: 'end', fill: INK, weight: 600 }); }
    E('path', { d: tk, stroke: INK, 'stroke-width': 3 }, ax);
    return ax;
  }

  /* layers */
  const Lbg = G(root), Lset = G(root), Lcast = G(root), Lfront = G(root), Lcard = G(root), Lguest = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= sets ================= */
  const parkShot = G(Lset);
  const park = lgPark(parkShot, { sky: 'day' });
  const parkFront = park.front; Lfront.appendChild(parkFront);
  const shopShot = G(Lset);
  E('rect', { x: 0, y: 0, width: 1200, height: 60, fill: '#7FD3FF' }, shopShot);
  const shopCam = G(shopShot); tr(shopCam, 0, 30);                 // shifted down: the signs clear the scene tag
  const shops = lgShops(shopCam);
  const shopFront = shops.front; Lfront.appendChild(shopFront);
  const signHL = [[40, 540], [620, 540]].map(([x, w]) => E('rect', { x: x + 52, y: 62, width: w - 104, height: 100, rx: 16, fill: 'none', stroke: GOLD, 'stroke-width': 9 }, shopCam));
  const cFee = mkChip(shopCam, 'fixed fee **$8**', { size: 30, col: BLUE });
  const cNoFee = mkChip(shopCam, '**no** fixed fee', { size: 30, col: ORANGE });

  /* ================= the bike-hire graph ================= */
  const hire = G(Lcard);
  paperCard(hire, 560, 105, 610, 548);
  const HX = 640, HY0 = 160;
  const hAx = axes2(hire, { xmin: 0, xmax: 7, ymin: 0, ymax: 40, unit: 64, unitY: 10, xs: 1, ys: 5, xl: 1, yl: 10, ink: INK, size: 24, halo: MK.paper, xName: 'h', yName: 'C' });
  tr(hAx, HX, HY0);
  const hx = h => HX + hAx.px(h), hy = c => HY0 + hAx.py(c);
  T(hire, (HX + hx(7)) / 2, 640, 'hours', { size: 26, weight: 700, anchor: 'middle', fill: '#5A6670' });
  T(hire, 600, 140, '$', { size: 28, weight: 800, anchor: 'middle', fill: '#5A6670' });
  const lnX = hAx.line(3, 8, { col: BLUE, width: 7 }), lnY = hAx.line(5, 0, { col: ORANGE, width: 7 });
  const legX = mkText(hire, 664, 208, 'X: {{C = 3h + 8}}', { size: 30, fill: BLUE, weight: 700, halo: MK.paper });
  const legY = mkText(hire, 664, 254, 'Y: {{C = 5h}}', { size: 30, fill: ORANGE, weight: 700, halo: MK.paper });
  const crossG = G(hire);
  E('path', { d: `M${hx(4)},${hy(20)} L${hx(4)},${hy(0)} M${hx(4)},${hy(20)} L${hx(0)},${hy(20)}`, stroke: '#5A6670', 'stroke-width': 3, 'stroke-dasharray': '8 6' }, crossG);
  const crossPt = hAx.point(4, 20, { col: GREEN, r: 11 });
  const crossLab = mkText(hire, hx(4) + 18, hy(20) + 40, '{{(4, 20)}}', { size: 28, fill: GREEN, halo: MK.paper });
  const sixG = G(hire);
  E('path', { d: `M${hx(6)},${hy(0)} L${hx(6)},${hy(38)}`, stroke: '#7A4A9C', 'stroke-width': 4, 'stroke-dasharray': '10 7' }, sixG);
  const sixLab = mkText(sixG, hx(6), hy(38) - 8, '6 h', { size: 26, anchor: 'middle', fill: '#7A4A9C', halo: MK.paper });
  const p26 = hAx.point(6, 26, { col: BLUE, r: 10 }), p30 = hAx.point(6, 30, { col: ORANGE, r: 10 });
  const l26 = mkText(hire, hx(6) + 14, hy(26) + 28, '$26', { size: 28, fill: BLUE, weight: 800, halo: MK.paper });
  const l30 = mkText(hire, hx(6) - 14, hy(30) - 12, '$30', { size: 28, anchor: 'end', fill: ORANGE, weight: 800, halo: MK.paper });

  // left column: equations and working, on a dark panel
  const panel = E('rect', { x: 30, y: 108, width: 515, height: 336, rx: 18, fill: 'rgba(10,27,39,0.84)', stroke: C.line, 'stroke-width': 2 }, Lcard);
  const eqs = G(Lfg);
  mkText(eqs, 60, 200, 'X: {{C = 3h + 8}}', { size: 40, fill: '#8FC3FF', weight: 700 });
  mkText(eqs, 60, 280, 'Y: {{C = 5h}}', { size: 40, fill: '#FFB070', weight: 700 });
  const eqsNote = mkText(eqs, 60, 330, 'through the **origin**', { size: 30, fill: C.ink, boldFill: GOLD });
  const wCross = mkWorking(Lfg, 260, 130, ['3h + 8 = 5h', '8 = 2h', 'h = 4'], { size: 44, fill: C.ink, gap: 26 });
  const cBoth = mkChip(Lfg, 'both cost **$20**', { size: 34, col: '#56D69B' });
  const cSix = mkChip(Lfg, 'Operation Beach Day:\nride **6 hours**', { size: 32, col: GOLD });
  const wSix = mkWorking(Lfg, 300, 130, [{ m: '"X:" 3 × 6 + 8 = $26', col: '#8FC3FF' }, { m: '"Y:" 5 × 6 = $30', col: '#FFB070' }], { size: 40, fill: C.ink, gap: 26 });
  const cShopX = mkChip(Lfg, 'Shop **X** ✓', { size: 36, col: '#8FC3FF' });
  const cOne = mkChip(Lfg, 'we ride for **one** hour', { size: 32, col: '#FF8FC8' });

  /* ================= Priya's distance-time graph ================= */
  const dt = G(Lcard);
  paperCard(dt, 560, 105, 610, 548);
  const OX = 620, OY = 165;
  const dAx = axes2(dt, { xmin: 0, xmax: 70, ymin: 0, ymax: 7, unit: 6.2, unitY: 56, xs: 10, ys: 1, xl: 10, yl: 1, ink: INK, size: 24, halo: MK.paper, xName: '"min"', yName: '"km"' });
  tr(dAx, OX, OY);
  const dx = m => OX + dAx.px(m), dy = k => OY + dAx.py(k);
  T(dt, (dx(0) + dx(70)) / 2, 636, 'time (minutes)', { size: 26, weight: 700, anchor: 'middle', fill: '#5A6670' });
  const dtTitle = mkText(dt, 1150, 150, "Priya's watch", { size: 26, anchor: 'end', fill: '#5A6670', halo: MK.paper });
  const PIECES = [[0, 0, 30, 6], [30, 6, 50, 6], [50, 6, 70, 0]];
  const segs = PIECES.map(([a, b, c, d]) => dAx.seg(a, b, c, d, { col: AMBER, width: 6 }));
  const glowUp = mkDash(E('path', { d: `M${dx(0)},${dy(0)} L${dx(30)},${dy(6)}`, stroke: 'rgba(255,228,92,0.85)', 'stroke-width': 26, 'stroke-linecap': 'round' }, dt));
  const glowDn = mkDash(E('path', { d: `M${dx(50)},${dy(6)} L${dx(70)},${dy(0)}`, stroke: 'rgba(255,228,92,0.85)', 'stroke-width': 26, 'stroke-linecap': 'round' }, dt));
  dt.insertBefore(glowUp, dAx); dt.insertBefore(glowDn, dAx);
  const dPts = [[30, 6], [50, 6], [70, 0]].map(([m, k]) => dAx.point(m, k, { col: AMBER, r: 9 }));
  const lUp = mkText(dt, 752, 470, '**6 km** in **30 min**', { size: 26, fill: INK, boldFill: AMBER, halo: MK.paper });
  const lFlat = mkText(dt, dx(40), 304, '**20 min**', { size: 26, anchor: 'middle', fill: INK, boldFill: AMBER, halo: MK.paper });
  const lDown = mkText(dt, 1020, 505, 'home in **20 min**', { size: 26, anchor: 'end', fill: INK, boldFill: AMBER, halo: MK.paper });
  const lBack = mkText(dt, 1020, 505, 'coming **back**', { size: 26, anchor: 'end', fill: INK, boldFill: RED, halo: MK.paper });
  const lFast = mkText(dt, 1020, 505, '**faster**: 18 > 12', { size: 26, anchor: 'end', fill: INK, boldFill: RED, halo: MK.paper });
  // Ah Boy's curve, Curvy
  const curve = dAx.plot(m => (m <= 40 ? 7 * (m / 40) * (m / 40) : NaN), { col: ORANGE, width: 7 });
  const curveLab = mkText(dt, dx(40) + 14, dy(7) + 30, 'Ah Boy', { size: 28, fill: ORANGE, weight: 800, halo: MK.paper });
  const curvy = G(dt); tr(curvy, dx(30), dy(7 * 0.5625));
  { const f = G(curvy); tr(f, 30, 6);
    E('circle', { cx: -9, cy: 0, r: 8, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, f); E('circle', { cx: 9, cy: 0, r: 8, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, f);
    E('circle', { cx: -8, cy: 1, r: 3.5, fill: SC_INK }, f); E('circle', { cx: 10, cy: 1, r: 3.5, fill: SC_INK }, f);
    E('path', { d: 'M-10,14 Q0,24 10,14', fill: 'none', stroke: SC_INK, 'stroke-width': 3, 'stroke-linecap': 'round' }, f); }
  const curvyHand = G(curvy); tr(curvyHand, 58, -24);
  E('path', { d: 'M-16,22 L0,0', stroke: ORANGE, 'stroke-width': 5, 'stroke-linecap': 'round' }, curvyHand);
  E('circle', { cx: 0, cy: 0, r: 9, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, curvyHand);
  const curvyLab = mkText(dt, dx(30) + 50, dy(7 * 0.5625) + 52, 'Curvy', { size: 28, fill: ORANGE, weight: 800, halo: MK.paper });
  // meet: two people
  const mP = dAx.seg(0, 0, 30, 6, { col: '#7A4A9C', width: 6 }), mD = dAx.seg(0, 6, 60, 0, { col: GREEN, width: 6 });
  const mPl = mkText(dt, dx(30) + 14, dy(6) + 10, 'Priya', { size: 28, fill: '#7A4A9C', weight: 800, halo: MK.paper });
  const mDl = mkText(dt, dx(0) + 12, dy(6) - 14, 'Dad', { size: 28, fill: GREEN, weight: 800, halo: MK.paper });
  const meetGlow = E('circle', { cx: dx(20), cy: dy(4), r: 30, fill: glow(GOLD), opacity: 0 }, dt);
  const meetPt = dAx.point(20, 4, { col: RED, r: 11 });
  const meetLab = mkText(dt, dx(20) + 24, dy(4) + 44, '**meet**', { size: 28, fill: RED, halo: MK.paper });

  // left column for the distance-time part
  const cDT = mkChip(Lfg, '**distance–time** graph', { size: 34, col: GOLD });
  const bSteady = mkSpeechBubble(Lfg, 'the flat bit:\n**steady speed**?', { size: 32, tail: 'down', tailX: 60 });
  const stOff = lgStamp(Lfg, false);
  const cStop = mkChip(Lfg, 'distance **not changing**\n⇒ she **stopped**', { size: 32, col: '#FF8F8F' });
  const cSp = [mkChip(Lfg, 'gradient = **speed**', { size: 34, col: GOLD }), mkChip(Lfg, '**steeper** ⇒ **faster**', { size: 34, col: GOLD }), mkChip(Lfg, '**down** ⇒ coming **back**', { size: 34, col: '#FF8F8F' })];
  const cUnits = mkChip(Lfg, 'minutes → **hours** first!', { size: 30, col: '#7FD3FF' });
  const wUnits = mkWorking(Lfg, 210, 190, [
    { m: '30 "min" = 1/2 "h"' }, { m: '6 ÷ 1/2 = 12 km\\/h', col: '#FFC247' },
    { m: '20 "min" = 1/3 "h"' }, { m: '6 ÷ 1/3 = 18 km\\/h', col: '#FF8F8F' },
  ], { size: 32, fill: C.ink, gap: 12 });
  const cCurve = mkChip(Lfg, '**curved**: faster and faster', { size: 32, col: '#FFB070' });
  const cCurvy = mkChip(Lfg, 'curve ⇒ **speed changing**', { size: 34, col: '#FFB070' });
  const cMeet = mkChip(Lfg, 'lines **cross** ⇒ they **meet**\nsame place, same time', { size: 32, col: GOLD });

  /* ================= HUD ================= */
  const cThree = mkChip(Lhud, '**3 p.m.** ICE CREAM!', { size: 40, col: '#FF8FC8' });
  const phone = lgPhone(Lhud, { s: 0.32 }); phone.set(50);
  const ices = [[250, 210, -14], [960, 190, 12], [1080, 300, -8]].map(([x, y, r]) => { const g = G(Lhud), inner = G(g); lgIceCream(inner, 0.8); g.x = x; g.y = y; g.r = r; return g; });

  /* ================= the cast ================= */
  const mum = cast(Lcast, 'mum'), kav = cast(Lcast, 'kavya'), boy = cast(Lcast, 'boy'), dad = cast(Lcast, 'dad');
  const priya = cast(Lcast, 'priya', { prop: null }), mo = cast(Lcast, 'mo');
  const boyIce = G(boy.hand); lgIceCream(boyIce, 0.62); tr(boyIce, 0, 34);
  const bike = G(Lfront); lgBike(bike, 1.2);
  Lfront.appendChild(parkFront);                                   // the hedge hides the bike's wheels
  // three Lionels: the three pieces of Priya's graph; one more for "Curvy"
  const LS = 0.5;
  const pcs = PIECES.map(([a, b, c, d]) => {
    const x1 = dx(a), y1 = dy(b), x2 = dx(c), y2 = dy(d), len = Math.hypot(x2 - x1, y2 - y1);
    const l = cast(Lguest, 'lionel', { len: len / LS });
    l.cx = (x1 + x2) / 2; l.cy = (y1 + y2) / 2; l.tilt = -Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    return l;
  });
  const lio = cast(Lcast, 'lionel', { len: 320 });

  /* cut points */
  const cS = at('shops') - 0.06, cG = at('eqs') - 0.06, cP = at('priya') - 0.06;
  const HY = 586, L1 = 150, L2 = 400;
  const fade = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  return t => {
    const who = scWho(S, t);
    op(fade, 1 - P(t, 0, 0.35, linear));
    const s1 = on(t, -9, cS), sS = on(t, cS, cG), sG = on(t, cG, cP), sP = on(t, cP, 1e9);
    park.upd(t);
    op(parkShot, s1 || sP); op(parkFront, s1 || sP); op(shopShot, sS || sG); op(shopFront, sS || sG);
    op(hire, sG); op(eqs, 0); wCross.set(0); cBoth.set(0); cSix.set(0); wSix.set(0); cShopX.set(0); cOne.set(0);
    op(dt, 0); op(Lguest, 0); cDT.set(0); bSteady.set(0); stOff.set(0); cStop.set(0); cSp.forEach(c => c.set(0)); cUnits.set(0); wUnits.set(0);
    cCurve.set(0); cCurvy.set(0); cMeet.set(0); cThree.set(0); op(phone, 0); ices.forEach(g => op(g, 0)); op(bike, 0);
    signHL.forEach(h => op(h, 0)); cFee.set(0); cNoFee.set(0);
    op(panel, sG || (sP && t >= at('units') && t < at('curve')) ? 1 : 0);
    const show = { mum: 0, kav: 0, boy: 0, dad: 0, priya: 0, mo: 0, lio: 0 };
    const put = (c, key, x, y, s, st) => { show[key] = 1; tr(c, x, y, s); c.set(Object.assign({ t, talk: scTalk(S, t, key === 'kav' ? 'kavya' : key === 'lio' ? 'lionel' : key) }, st)); };
    op(boyIce, t < cP || (t >= at('curve') && t < at('meet')) ? 1 : 0);

    /* ---------- 3 p.m.: ICE CREAM ---------- */
    if (s1) {
      op(phone, 1); tr(phone, 1130, 70);
      const jump = Math.abs(Math.sin(t * 9)) * 22 * (t < end('three') + 0.3 ? 1 : 0.3) * AMP;
      put(mum, 'mum', 300, HY, 0.8, { mood: 'happy', look: 0.6 });
      put(kav, 'kav', 470, HY, 0.8, { mood: 'happy', look: 0.6 });
      put(boy, 'boy', 640, HY + 4 - jump, 0.8, { mood: 'happy', look: 0, lift: 1 });
      put(dad, 'dad', 830, HY, 0.8, { mood: 'happy', look: -0.6, lift: 0 });
      popIn(cThree, t, at('three') + 0.05, 600, 180);
      cThree.set(1);
      ices.forEach((g, i) => { const p = P(t, at('three') + 0.25 + i * 0.15, 0.4, pop); op(g, clamp(p * 3)); tr(g, g.x, g.y + 6 * Math.sin(t * 3 + i), Math.max(0.01, p), g.r); });
    }

    /* ---------- the bike-hire shops ---------- */
    if (sS) {
      op(phone, 1); tr(phone, 1130, 70);
      op(signHL[0], winP(t, mid('shops', 0.3), mid('shops', 0.65)) * (0.6 + 0.4 * Math.sin(t * 7)));
      op(signHL[1], winP(t, mid('shops', 0.65), 1e9) * (0.6 + 0.4 * Math.sin(t * 7)));
      cFee.set(P(t, mid('shops', 0.38), 0.4, linear)); tr(cFee, 310, 220);
      cNoFee.set(P(t, mid('shops', 0.85), 0.4, linear)); tr(cNoFee, 890, 220);
      const pointY = t > mid('shops', 0.62);
      put(dad, 'dad', 200, HY, 0.8, { mood: 'happy', look: pointY ? 0.9 : 0.2, lift: 1 });
      put(mum, 'mum', 370, HY, 0.8, { mood: 'neutral', look: -0.8 });
      put(kav, 'kav', 540, HY, 0.8, { mood: 'neutral', look: -0.8 });
      put(boy, 'boy', 720, HY + 4, 0.8, { mood: 'happy', look: -0.6, lift: 1 });
    }

    /* ---------- the graph: C = 3h + 8 and C = 5h ---------- */
    if (sG) {
      const gp = P(t, cG, 0.3, easeOut); op(hire, gp);
      lnX.set(P(t, mid('eqs', 0.1), 0.8, ease)); lnY.set(P(t, mid('eqs', 0.5), 0.8, ease));
      op(legX, P(t, mid('eqs', 0.1), 0.3, linear)); op(legY, P(t, mid('eqs', 0.5), 0.3, linear));
      const eqOn = t < at('cross');
      op(eqs, eqOn ? 1 : 0);
      if (eqOn) { op(eqs.children[0], P(t, mid('eqs', 0.08), 0.3, linear)); op(eqs.children[1], P(t, mid('eqs', 0.48), 0.3, linear)); op(eqsNote, P(t, mid('eqs', 0.72), 0.3, linear)); }
      // cross
      const crossOn = t >= at('cross') && t < at('six');
      op(crossG, t >= at('cross') ? P(t, mid('cross', 0.15), 0.3, linear) : 0);
      crossPt.set(t >= at('cross') ? P(t, mid('cross', 0.1), 0.4, linear) : 0);
      op(crossLab, t >= at('cross') ? P(t, mid('cross', 0.85), 0.3, linear) : 0);
      if (crossOn) {
        [0.3, 0.55, 0.7].forEach((f, i) => wCross.show(i, P(t, mid('cross', f), 0.3, linear)));
        wCross.ring(2, P(t, mid('cross', 0.78), 0.3, linear));
        cBoth.set(P(t, mid('cross', 0.85), 0.4, linear)); tr(cBoth, 300, 400);
      }
      // six
      op(sixG, t >= at('six') ? P(t, mid('six', 0.4), 0.3, linear) : 0);
      if (t >= at('six') && t < at('x')) { cSix.set(P(t, at('six') + 0.1, 0.4, linear)); tr(cSix, 290, 260); }
      // x
      const xOn = t >= at('x');
      p26.set(xOn ? P(t, mid('x', 0.18), 0.35, linear) : 0); p30.set(xOn ? P(t, mid('x', 0.38), 0.35, linear) : 0);
      op(l26, xOn ? P(t, mid('x', 0.2), 0.3, linear) : 0); op(l30, xOn ? P(t, mid('x', 0.4), 0.3, linear) : 0);
      if (xOn) {
        wSix.show(0, P(t, at('x') + 0.3, 0.3, linear)); wSix.show(1, P(t, mid('x', 0.36), 0.3, linear));
        cShopX.set(P(t, mid('x', 0.55), 0.4, linear)); tr(cShopX, 290, 300);
        cOne.set(P(t, mid('x', 0.8), 0.4, linear)); tr(cOne, 290, 380);
      }
      // the humans on the left
      const dadSad = xOn && t > mid('x', 0.55);
      put(kav, 'kav', 140, HY, 0.8, { mood: t >= at('six') ? 'deadpan' : 'happy', look: t >= at('six') ? 0.7 : 0.9 });
      put(dad, 'dad', 300, HY, 0.8, { mood: dadSad ? 'sad' : t >= at('six') ? 'smug' : 'neutral', look: xOn ? 0.8 : 0.9, lift: t >= at('six') && t < at('x') ? 1 : 0 });
      put(mum, 'mum', 455, HY, 0.8, { mood: xOn && t > mid('x', 0.75) ? 'deadpan' : 'neutral', look: xOn ? -0.8 : 0.9 });
    }

    /* ---------- Priya's ride: a distance-time graph ---------- */
    if (sP) {
      const gp = P(t, mid('priya', 0.4), 0.35, easeOut);
      op(dt, gp); op(Lguest, t >= at('parts') && t < at('curve') ? 1 : 0);
      op(dtTitle, 1);
      const inDT = t < at('curve');
      segs.forEach((s, i) => s.set(inDT ? P(t, mid('parts', 0.1 + i * 0.3), 0.5, linear) : 0));
      dPts.forEach((p, i) => p.set(inDT ? P(t, mid('parts', 0.3 + i * 0.3), 0.3, linear) : 0));
      op(lUp, inDT ? P(t, mid('parts', 0.2), 0.3, linear) : 0); op(lFlat, inDT ? P(t, mid('parts', 0.55), 0.3, linear) : 0);
      const dl = inDT && t < at('speed') ? P(t, mid('parts', 0.82), 0.3, linear) : 0;
      op(lDown, dl);
      op(lBack, t >= at('speed') && t < at('units') ? P(t, mid('speed', 0.75), 0.3, linear) : 0);
      op(lFast, t >= at('units') && inDT ? P(t, mid('units', 0.85), 0.3, linear) : 0);
      const gU = t >= at('speed') && t < at('units') ? P(t, mid('speed', 0.3), 0.6, linear) : 0;
      mkDraw(glowUp, gU); op(glowUp, gU > 0 ? 0.8 : 0);
      const gD = (t >= at('speed') && t < at('units')) ? P(t, mid('speed', 0.62), 0.6, linear) : (t >= at('units') && inDT ? P(t, mid('units', 0.8), 0.5, linear) : 0);
      mkDraw(glowDn, gD); op(glowDn, gD > 0 ? 0.8 : 0);
      // the three Lionel pieces
      pcs.forEach((l, i) => {
        const p = P(t, mid('parts', 0.08 + i * 0.3), 0.45, pop);
        op(l, clamp(p * 3));
        const asleep = i === 1 && t >= at('nap') && t < at('curve');
        tr(l, l.cx, l.cy - 40 * (1 - clamp(p)), LS);
        l.set({ t, talk: (who === 'lionel' && (i === 1 || t < at('steady'))) ? scTalk(S, t, 'lionel') : 0, still: true,
          mood: asleep ? 'deadpan' : i === 0 ? 'happy' : i === 2 ? 'sad' : t >= at('steady') ? 'annoyed' : 'deadpan', look: i === 1 ? -0.4 : 0.3, tilt: l.tilt, sleep: asleep ? P(t, mid('nap', 0.35), 0.5, linear) : 0 });
      });
      // the curve and Curvy
      const cuOn = t >= at('curve') && t < at('meet');
      curve.set(cuOn ? P(t, at('curve') + 0.2, 1.2, ease) : 0);
      op(curveLab, cuOn ? P(t, mid('curve', 0.6), 0.3, linear) : 0);
      const cvOn = t >= at('curvy') && t < at('meet');
      op(curvy, cvOn ? P(t, mid('curvy', 0.15), 0.3, linear) : 0); op(curvyLab, cvOn ? P(t, mid('curvy', 0.2), 0.3, linear) : 0);
      tr(curvyHand, 58, -24, 1, Math.sin(t * 9) * 25 * AMP);
      // meet
      const mtOn = t >= at('meet');
      mP.set(mtOn ? P(t, at('meet') + 0.1, 0.6, linear) : 0); mD.set(mtOn ? P(t, at('meet') + 0.3, 0.8, linear) : 0);
      op(mPl, mtOn ? P(t, mid('meet', 0.2), 0.3, linear) : 0); op(mDl, mtOn ? P(t, mid('meet', 0.25), 0.3, linear) : 0);
      meetPt.set(mtOn ? P(t, mid('meet', 0.45), 0.35, linear) : 0);
      op(meetGlow, mtOn ? P(t, mid('meet', 0.45), 0.3, linear) * (0.6 + 0.4 * Math.sin(t * 5)) : 0); attr(meetGlow, 'r', 34 + 6 * Math.sin(t * 5));
      op(meetLab, mtOn ? P(t, mid('meet', 0.55), 0.3, linear) : 0);

      // the left column and the humans
      if (t < at('parts')) {
        // Priya rides past behind the hedge; Ah Boy with his ice cream
        const rp = P(t, cP, 3.6, linear);
        const px = lerp(-160, 330, rp), bob = Math.sin(t * 14) * 3 * AMP;
        put(priya, 'priya', px, HY - 30 + bob, 0.8, { mood: 'happy', look: 1 });
        op(bike, 1); tr(bike, px + 10, 712 + bob);
        put(boy, 'boy', 470, HY + 4, 0.8, { mood: 'happy', look: -0.8, lift: 1 });
        op(boyIce, 1);
        cDT.set(P(t, mid('priya', 0.55), 0.4, linear)); tr(cDT, 290, 200);
      } else if (t < at('speed')) {
        put(priya, 'priya', L1, HY, 0.8, { mood: t >= at('steady') && t < at('nap') ? 'annoyed' : 'smug', look: t >= at('steady') && t < at('nap') ? 1 : 0.9 });
        const dadTalk = t >= at('steady') && t < at('nap');
        put(dad, 'dad', L2, HY, 0.8, { mood: t >= at('nap') ? (t > mid('nap', 0.5) ? 'sad' : 'neutral') : t >= at('steady') ? 'smug' : 'neutral', look: t >= at('steady') ? 0.9 : 0.8, lift: dadTalk ? 1 : 0 });
        if (t >= at('steady')) { bSteady.set(P(t, at('steady') + 0.1, 0.35, linear)); tr(bSteady, 300, 230); }
        if (t >= at('nap')) {
          stOff.set(P(t, mid('nap', 0.45), 0.35, linear)); tr(stOff, 300, 240, 0.5);
          cStop.set(P(t, mid('nap', 0.2), 0.4, linear)); tr(cStop, 290, 380);
        }
      } else if (t < at('units')) {
        put(mo, 'mo', 175, HY, 0.8, { mood: 'happy', look: 0.9 });
        put(priya, 'priya', 420, HY, 0.8, { mood: 'happy', look: 0.9 });
        [0.05, 0.3, 0.62].forEach((f, i) => { cSp[i].set(P(t, mid('speed', f), 0.4, linear)); tr(cSp[i], 290, 170 + i * 90); });
      } else if (t < at('curve')) {
        put(kav, 'kav', L1, HY, 0.8, { mood: 'happy', look: 0.9 });
        put(priya, 'priya', L2, HY, 0.8, { mood: t > mid('units', 0.85) ? 'smug' : 'happy', look: 0.9 });
        cUnits.set(P(t, at('units') + 0.05, 0.4, linear)); tr(cUnits, 290, 140);
        [0.18, 0.4, 0.62, 0.8].forEach((f, i) => wUnits.show(i, P(t, mid('units', f), 0.3, linear)));
      } else if (t < at('meet')) {
        const cv = t >= at('curvy');
        put(boy, 'boy', L1, HY + 4, 0.8, { mood: cv ? 'happy' : 'happy', look: 0.9, lift: cv ? 0 : 1 });
        if (!cv) {
          put(kav, 'kav', L2, HY, 0.8, { mood: 'neutral', look: 0.8 });
          cCurve.set(P(t, mid('curve', 0.3), 0.4, linear)); tr(cCurve, 290, 200);
        } else {
          const lp = P(t, at('curvy') - 0.1, 0.45, pop);
          put(lio, 'lio', 390, 560, Math.max(0.01, 0.62 * lp), { mood: t > mid('curvy', 0.7) ? 'annoyed' : 'deadpan', look: 1, tilt: 0 });
          cCurvy.set(P(t, mid('curvy', 0.35), 0.4, linear)); tr(cCurvy, 290, 180);
        }
      } else {
        put(kav, 'kav', L1, HY, 0.8, { mood: 'happy', look: 0.9 });
        put(priya, 'priya', L2, HY, 0.8, { mood: 'happy', look: 0.9 });
        cMeet.set(P(t, mid('meet', 0.5), 0.4, linear)); tr(cMeet, 290, 260);
      }
    }

    op(mum, show.mum); op(kav, show.kav); op(boy, show.boy); op(dad, show.dad); op(priya, show.priya); op(mo, show.mo); op(lio, show.lio);
  };
});
