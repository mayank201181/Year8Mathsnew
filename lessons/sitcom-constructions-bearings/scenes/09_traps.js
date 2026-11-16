/* Scene 9: The island saves you some marks (exam traps) and the stinger.
   Shots: "6 EXAM TRAPS" over the bumboat at dusk, the six of them in the boat with numbers -> six snappy
   confessionals, one trap card each (Inner & Outer: estimate first, acute is not 130°; Captain Needle: three
   figures, 045° not 45°; Kavya: FROM = FEET, stand at the point after "from", turn clockwise; Madame Compassa:
   same width from both ends, keep your arcs; Dad: 225 000 cm = 2.25 km, not to the Moon; Priya: a new North line
   at every turn, parallel) -> logo "TRUE NORTH will return" -> stinger: 6 p.m., the bumboat home, Captain Needle
   riding on Ah Boy's head; Ah Boy's fridge magnet swings the needle round to South for the first time in seventy
   years; a tear -> Dad points the same way: "Finally. A compass that agrees with me." OFF COURSE. */
scene('traps', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;
  const talk = (t, who) => scTalk(S, t, who);

  /* ---------- helpers ---------- */
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const outline = (el, col, w) => { el.setAttribute('stroke', col); el.setAttribute('stroke-width', w); el.setAttribute('paint-order', 'stroke'); el.setAttribute('stroke-linejoin', 'round'); return el; };
  const view = (el, k, fx, fy, sx, sy) => el.setAttribute('transform', `translate(${sx.toFixed(1)} ${sy.toFixed(1)}) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const GOLD = '#FFE45C', INK = MK.ink, GREEN = '#1E9E5A', RED = '#C62828', BLUE = '#2E7DD8', VIO = '#7A5CFF', PINK = '#E0457B';
  const CX = 880;
  function trCard(parent, n) {
    const g = G(parent);
    E('rect', { x: 606, y: 136, width: 560, height: 470, rx: 18, fill: 'rgba(0,0,0,0.3)' }, g);
    E('rect', { x: 600, y: 130, width: 560, height: 470, rx: 18, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, g);
    const head = chip(g, 'TRAP ' + n, { size: 30, fill: '#D32F2F', color: '#FFFFFF', weight: 800 }); tr(head, CX, 182);
    return g;
  }
  const txt = (parent, x, y, s, o) => mkText(parent, x, y, s, Object.assign({ size: 34, anchor: 'middle', fill: INK }, o || {}));
  const fadeIn = (el, t, t0) => { const p = P(t, t0, 0.3, easeOut); op(el, p); tr(el, 0, 10 * (1 - p)); };
  function trNo(parent, x, y, s, o) {   // a crossed-out line: g.set(p) draws the strike
    const g = G(parent), m = txt(g, x, y, s, Object.assign({ fill: RED }, o || {}));
    const sl = strike(g, x - m.w / 2 - 10, y - 12, x + m.w / 2 + 10, RED);
    g.set = p => sl.set(p);
    return g;
  }
  const bpt = (x, y, b, d) => [x + Math.sin(b * Math.PI / 180) * d, y - Math.cos(b * Math.PI / 180) * d];

  /* ---------- layers ---------- */
  const Lbg = G(root), Lcast = G(root), Lfg = G(root), Lhud = G(root);

  /* ---------- sets ---------- */
  const boatShot = G(Lbg), boatWrap = G(boatShot);
  const boat = cbBoat(boatWrap, { dusk: true, tower: 1240 });
  const top = G(boat.rock);   // in front of the hull
  const conf = cbConf(Lbg, 'needle');
  const TINT = {}; for (const k in CB_TINT) TINT[k] = linGrad(CB_TINT[k][0], CB_TINT[k][1], true);
  const logoBg = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#0B2340', '#1E5A8A', true) }, logoBg);
  let rays = '';
  for (let i = 0; i < 16; i++) { const a0 = i / 16 * TAU, a1 = a0 + TAU / 40; rays += `M0,0 L${(Math.cos(a0) * 1100).toFixed(0)},${(Math.sin(a0) * 1100).toFixed(0)} L${(Math.cos(a1) * 1100).toFixed(0)},${(Math.sin(a1) * 1100).toFixed(0)} Z `; }
  const rayP = E('path', { d: rays, fill: '#FFE45C', opacity: 0.07 }, logoBg);
  E('ellipse', { cx: 600, cy: 610, rx: 600, ry: 160, fill: glow('#6EC8FF'), opacity: 0.3 }, logoBg);

  /* ---------- the cast (each built once; moved between the boat and the confessional) ---------- */
  const proto = cast(boat.mid, 'proto'), kav = cast(boat.mid, 'kavya'), dad = cast(boat.mid, 'dad'),
    pri = cast(boat.mid, 'priya'), mum = cast(boat.mid, 'mum'), tan = cast(boat.mid, 'tan'), boy = cast(boat.mid, 'boy'),
    cmp = cast(boat.mid, 'compassa'), needle = cast(boat.mid, 'needle');
  // Ah Boy's souvenir, in his hand
  const mag = G(boy.hand); tr(mag, 0, -62, 0.72); cbMagnet(mag, 1);
  // Captain Needle's tear
  const tear = E('path', { d: 'M34,-50 Q26,-36 34,-30 Q42,-36 34,-50 Z', fill: '#7FD0FF', stroke: SC_INK, 'stroke-width': 2 }, needle.firstChild);
  // Dad points the same way as the needle
  const dadArrow = G(top);
  E('path', { d: 'M0,0 L0,92', stroke: GOLD, 'stroke-width': 10, 'stroke-linecap': 'round' }, dadArrow);
  E('path', { d: 'M0,120 L-18,88 L18,88 Z', fill: GOLD }, dadArrow);
  const glowS = E('ellipse', { cx: 980, cy: 330, rx: 380, ry: 240, fill: glow('#FFB347'), opacity: 0 }, boatWrap);
  boatWrap.insertBefore(glowS, boat.nextSibling);

  /* ===== intro: 6 EXAM TRAPS ===== */
  const sI = G(Lhud);
  const iHead = outline(T(sI, 600, 172, '6 EXAM TRAPS', { size: 80, weight: 800, anchor: 'middle', fill: GOLD, ls: 3 }), '#5A2A07', 10);
  const iSubC = chip(sI, 'the island saves you some marks', { size: 32, fill: 'rgba(10,27,39,0.88)', color: '#FFFFFF', weight: 700 }); tr(iSubC, 600, 250);
  const ROWX = [150, 335, 515, 690, 870, 1055];
  const badges = ROWX.map((x, k) => { const g = G(sI); E('circle', { r: 28, fill: GOLD, stroke: SC_INK, 'stroke-width': 4 }, g); T(g, 0, 11, String(k + 1), { size: 32, weight: 800, anchor: 'middle', fill: SC_INK }); return g; });

  /* ===== trap cards ===== */
  // 1 Inner & Outer
  const c1 = trCard(Lfg, 1);
  const c1a = txt(c1, CX, 258, '**Estimate first.**', { size: 44, boldFill: BLUE });
  const c1d = G(c1);
  { const v = [700, 470]; E('path', { d: `M${v[0]},${v[1]} L${v[0] + 170},${v[1]} M${v[0]},${v[1]} L${(v[0] + 170 * Math.cos(50 * Math.PI / 180)).toFixed(1)},${(v[1] - 170 * Math.sin(50 * Math.PI / 180)).toFixed(1)}`, stroke: INK, 'stroke-width': 5, 'stroke-linecap': 'round' }, c1d);
    mkAngleMark(c1d, v[0], v[1], 0, 50, { r: 56, col: '#E08A00', fill: 'rgba(255,194,71,0.3)' }).set(1);
    mkAngleMark(c1d, v[0], v[1], 0, 90, { r: 44, col: '#8FA3B8', right: true }).set(1);
    E('path', { d: `M${v[0]},${v[1]} L${v[0]},${v[1] - 120}`, stroke: '#8FA3B8', 'stroke-width': 3, 'stroke-dasharray': '8 6' }, c1d);
    mkText(c1d, v[0] + 40, v[1] + 44, '**acute**: less than {{90°}}', { size: 28, fill: INK, boldFill: '#B85C00' }); }
  const c1e = txt(c1, 1040, 350, '{{50°}}', { size: 44, fill: GREEN, weight: 800 });
  const c1t = tick(c1, 16, GREEN); tr(c1t, 1104, 336);
  const c1f = trNo(c1, 1040, 430, '{{130°}}', { size: 44 });
  const c1g = txt(c1, CX, 570, 'acute? Then it **isn\'t** {{130°}}', { size: 30, boldFill: RED });
  const c180 = mkChip(Lfg, '{{"Outer" + "Inner" = 180°}}', { size: 28, col: GOLD });
  // 2 Captain Needle
  const c2 = trCard(Lfg, 2);
  const c2a = txt(c2, CX, 258, '**Three figures.**', { size: 44, boldFill: BLUE });
  const c2b = trNo(c2, 760, 370, '{{45°}}', { size: 52 });
  const c2c = txt(c2, 760, 470, '{{045°}}', { size: 56, fill: GREEN, weight: 800 });
  const c2t = tick(c2, 18, GREEN); tr(c2t, 760 + 100, 452);
  const c2d = cbBearing(c2, { len: 150, r: 52, col: RED, arcCol: BLUE, size: 30 }); tr(c2d, 1030, 568);
  const c2n = txt(c2, 760, 556, 'always **3** digits', { size: 28, fill: '#5A6670', boldFill: BLUE });
  // 3 Kavya
  const c3 = trCard(Lfg, 3);
  const c3a = txt(c3, CX, 258, '**FROM = FEET**', { size: 46, boldFill: '#B0123E' });
  const c3b = txt(c3, CX, 310, 'stand at the point after **from**,', { size: 30, boldFill: '#B0123E' });
  const c3c = txt(c3, CX, 352, 'then turn **clockwise** from North', { size: 30, boldFill: BLUE });
  const A3 = [720, 566], B3 = bpt(720, 566, 60, 160);
  const c3d = cbBearing(c3, { len: 160, r: 52, col: RED, arcCol: BLUE, size: 30 }); tr(c3d, A3[0], A3[1]);
  const feet = G(c3);
  [[-30, 8], [-14, 16]].forEach(([x, y], i) => { const f = G(feet); tr(f, A3[0] + x, A3[1] + y, 1, -10); E('ellipse', { rx: 7, ry: 12, fill: '#8A5A2A' }, f); E('circle', { cx: 0, cy: -16, r: 4, fill: '#8A5A2A' }, f); });
  const c3A = cbDot(c3, A3[0], A3[1], 'A', { dx: 28, dy: 26 }), c3B = cbDot(c3, B3[0], B3[1], 'B', { dx: 22, dy: -10 });
  const c3e = txt(c3, 1010, 476, 'bearing of', { size: 28 });
  const c3f = txt(c3, 1010, 516, '**B** from **A**', { size: 32, boldFill: '#B0123E' });
  const c3g = txt(c3, 1010, 566, 'feet at **A**', { size: 28, boldFill: '#B0123E' });
  // 4 Madame Compassa
  const c4 = trCard(Lfg, 4);
  const c4a = txt(c4, CX, 258, '**Same width** from both ends', { size: 38, boldFill: VIO });
  const c4b = txt(c4, CX, 304, 'and **keep** your arcs!', { size: 30, boldFill: PINK });
  const A4 = [720, 470], B4 = [1040, 470];
  const c4s = cbSeg(c4, A4[0], A4[1], B4[0], B4[1], { width: 5 });
  const c4arcs = [cbArc(c4, A4[0], A4[1], 190, -52, -16, { col: VIO, width: 4.5 }), cbArc(c4, A4[0], A4[1], 190, 16, 52, { col: VIO, width: 4.5 }),
    cbArc(c4, B4[0], B4[1], 190, -128, -164, { col: PINK, width: 4.5 }), cbArc(c4, B4[0], B4[1], 190, 128, 164, { col: PINK, width: 4.5 })];
  cbDot(c4, A4[0], A4[1], 'A', { dx: -24, dy: 10 }); cbDot(c4, B4[0], B4[1], 'B', { dx: 24, dy: 10 });
  const c4r = [mkText(c4, 780, 430, '**r**', { size: 30, fill: VIO, anchor: 'middle', halo: MK.paper }), mkText(c4, 982, 430, '**r**', { size: 30, fill: PINK, anchor: 'middle', halo: MK.paper })];
  E('path', { d: `M${A4[0]},${A4[1]} L${(A4[0] + 190 * Math.cos(-34 * Math.PI / 180)).toFixed(1)},${(A4[1] + 190 * Math.sin(-34 * Math.PI / 180)).toFixed(1)} M${B4[0]},${B4[1]} L${(B4[0] + 190 * Math.cos(-146 * Math.PI / 180)).toFixed(1)},${(B4[1] + 190 * Math.sin(-146 * Math.PI / 180)).toFixed(1)}`, stroke: '#8FA3B8', 'stroke-width': 3, 'stroke-dasharray': '8 6' }, c4);
  const c4heart = G(c4); tr(c4heart, 880, 368);
  E('path', { d: 'M0,10 C-22,-8 -14,-26 0,-16 C14,-26 22,-8 0,10 Z', fill: '#FF6FA8', stroke: SC_INK, 'stroke-width': 2.5 }, c4heart);
  // 5 Dad
  const c5 = trCard(Lfg, 5);
  const c5a = txt(c5, CX, 258, '**Convert your units**', { size: 40, boldFill: BLUE });
  const c5w = mkWorking(c5, 900, 302, [{ m: '"225 000" cm = 2250 "m"' }, { m: '= 2.25 km', col: GREEN }], { size: 40, fill: INK, gap: 22, ringCol: GREEN });
  const c5n = trNo(c5, 820, 500, '{{"225 000" km}}', { size: 38 });
  const c5m = G(c5); tr(c5m, 1060, 488);
  E('circle', { r: 30, fill: ball('#EEF0F2', '#9AA6B2'), stroke: INK, 'stroke-width': 3 }, c5m);
  E('circle', { cx: -8, cy: -8, r: 6, fill: '#B9C2CB' }, c5m);
  const c5x = cross(c5m, 26, RED);
  const c5k = txt(c5, CX, 570, '{{1 km = "100 000" cm}}', { size: 32, fill: '#5A6670' });
  // 6 Priya
  const c6 = trCard(Lfg, 6);
  const c6a = txt(c6, CX, 256, 'A **new North line**', { size: 40, boldFill: '#B0123E' });
  const c6b = txt(c6, CX, 302, 'at **every turn** of a journey', { size: 30, boldFill: '#B0123E' });
  const T6 = [700, 575], U6 = bpt(700, 575, 40, 160), X6 = bpt(U6[0], U6[1], 130, 130);
  const c6d1 = cbBearing(c6, { len: 160, r: 46, col: RED, arcCol: BLUE, size: 28 }); tr(c6d1, T6[0], T6[1]);
  const c6hl = E('rect', { x: U6[0] - 12, y: U6[1] - 124, width: 24, height: 124, rx: 9, fill: 'rgba(255,228,92,0.6)' }, c6);
  const c6d2 = cbBearing(c6, { len: 130, r: 44, col: RED, arcCol: BLUE, size: 28 }); tr(c6d2, U6[0], U6[1]);
  const c6par = txt(c6, 1050, 420, '**parallel**', { size: 32, boldFill: '#B0123E' });
  const c6par2 = txt(c6, 1050, 458, 'to the first', { size: 28, fill: '#5A6670' });
  const c6ar = arrow(c6, 990, 410, U6[0] + 26, U6[1] - 70, { color: '#B0123E', width: 4, bend: 20 });

  /* ===== logo ===== */
  const sR = G(Lhud);
  const logo = G(sR);
  const logoN = cbNorth(logo, 70, { col: '#FF6B5C', size: 40 }); tr(logoN, 0, -78);
  outline(T(logo, 0, 40, 'TRUE NORTH', { size: 112, weight: 800, anchor: 'middle', fill: GOLD }), '#0B2340', 12);
  const rSub = T(sR, 600, 420, 'will return', { size: 46, weight: 600, anchor: 'middle', fill: '#FFFFFF' });

  /* ===== stinger chips ===== */
  const cHome = chip(Lhud, '6 p.m. The bumboat home', { size: 32, fill: 'rgba(10,27,39,0.88)', stroke: GOLD, sw: 3, color: GOLD, weight: 700 });
  const cMag = mkChip(Lhud, 'a fridge **magnet**', { size: 30, col: '#FF8A8A' });
  const cSouth = mkChip(Lhud, '**South**, for the first time in 70 years', { size: 30, col: GOLD });
  const stamp = cbStamp(Lhud, false);

  /* ---------- shots ---------- */
  const cut = id => at(id) - 0.06;
  const SHOTS = [['I', -9], ['1', cut('t1')], ['2', cut('t2')], ['3', cut('t3')], ['4', cut('t4')], ['5', cut('t5')], ['6', cut('t6')],
    ['R', cut('return')], ['W', cut('magnet')]];
  const shotAt = t => { let s = 'I'; for (const [k, t0] of SHOTS) if (t >= t0) s = k; return s; };
  const CARDS = { 1: c1, 2: c2, 3: c3, 4: c4, 5: c5, 6: c6 };
  const CONF = { 1: 'proto', 2: 'needle', 3: 'kavya', 4: 'compassa', 5: 'dad', 6: 'priya' };
  const ALL = [proto, kav, dad, pri, mum, tan, boy, cmp, needle];
  const SW0 = at('southward') + 0.15;   // the needle swings

  return t => {
    const sh = shotAt(t);
    const boatOn = sh === 'I' || sh === 'W' ? 1 : 0;
    op(boatShot, boatOn); op(logoBg, sh === 'R' ? 1 : 0); op(sI, sh === 'I' ? 1 : 0); op(sR, sh === 'R' ? 1 : 0);
    for (const k in CARDS) op(CARDS[k], sh === k ? 1 : 0);
    const cw = CONF[sh];
    conf.set(cw ? 1 : 0, t); if (cw) conf.firstChild.setAttribute('fill', TINT[cw]);
    ALL.forEach(c => { op(c, 0); const home = boatOn ? boat.mid : Lcast; if (c.parentNode !== home) home.appendChild(c); });
    if (needle.parentNode === boat.mid && boat.mid.lastChild !== needle) boat.mid.appendChild(needle);
    [c180, cMag, cSouth].forEach(c => c.set(0));
    op(cHome, 0); op(dadArrow, 0); op(tear, 0); op(mag, 0); stamp.set(0); op(glowS, 0);
    const show = (c, x, y, s, st) => { op(c, 1); tr(c, x, y, s); c.set(Object.assign({ t }, st)); };

    if (boatOn) boat.upd(t * AMP);
    if (sh === 'I') {
      view(boatWrap, 1, 0, 0, 0, 0);
      tr(boat.plane, -400, -400, 0.5);
      const hp = P(t, at('intro') + 0.05, 0.45, pop);
      op(iHead, clamp(hp * 2.5)); iHead.setAttribute('transform', `translate(600 150) scale(${Math.max(0.01, 0.6 + 0.4 * hp).toFixed(3)}) translate(-600 -150)`);
      op(iSubC, P(t, mid('intro', 0.3), 0.4, linear));
      const ROW = [[proto, 0.62, 470, { mood: 'deadpan', moodB: 'smug' }], [needle, 0.6, 452, { mood: 'smug', point: 1, needle: 0 }], [kav, 0.84, 452, { mood: 'happy' }],
        [cmp, 0.62, 446, { mood: 'smug', arms: 1 }], [dad, 0.86, 445, { mood: 'smug', lift: 1 }], [pri, 0.82, 450, { mood: 'smug' }]];
      ROW.forEach(([c, s, y, st], i) => {
        const p = P(t, mid('intro', 0.35) + i * 0.13, 0.45, pop);
        show(c, ROWX[i], y + 40 * (1 - clamp(p)), s, Object.assign({ look: 0 }, st));
        op(c, clamp(p * 3));
        popIn(badges[i], t, mid('intro', 0.42) + i * 0.13, ROWX[i], 610);
      });
    } else if (cw) {
      const line = 't' + sh;
      if (cw === 'proto') {
        const bick = t > mid('t1', 0.72);
        show(proto, 330, 430, 1.3, { talk: talk(t, 'outer'), mood: 'deadpan', look: bick ? 1 : 0.4, talkB: talk(t, 'inner'), moodB: 'smug', lookB: bick ? -1 : 0.4 });
        fadeIn(c1a, t, at('t1') + 0.1); fadeIn(c1d, t, mid('t1', 0.2));
        fadeIn(c1e, t, mid('t1', 0.38)); op(c1t, P(t, mid('t1', 0.42), 0.3, linear));
        fadeIn(c1f, t, mid('t1', 0.5)); c1f.set(P(t, mid('t1', 0.58), 0.3, linear));
        fadeIn(c1g, t, mid('t1', 0.66));
        popIn(c180, t, mid('t1', 0.74), 330, 210); c180.set(P(t, mid('t1', 0.74), 0.4, linear));
      } else if (cw === 'needle') {
        show(needle, 330, 400, 1.35, { talk: talk(t, 'needle'), mood: 'smug', look: 0.5, point: t > mid('t2', 0.6) ? 1 : 0, needle: 0 });
        fadeIn(c2a, t, at('t2') + 0.1);
        fadeIn(c2b, t, mid('t2', 0.32)); c2b.set(P(t, mid('t2', 0.42), 0.3, linear));
        fadeIn(c2c, t, mid('t2', 0.55)); op(c2t, P(t, mid('t2', 0.62), 0.3, linear));
        const bp = P(t, mid('t2', 0.6), 0.8, ease); c2d.set(45, bp, bp);
        fadeIn(c2n, t, mid('t2', 0.75));
      } else if (cw === 'kavya') {
        show(kav, 320, 560, 1.4, { talk: talk(t, 'kavya'), mood: 'smug', look: 0.5 });
        fadeIn(c3a, t, at('t3') + 0.1); fadeIn(c3b, t, mid('t3', 0.3)); fadeIn(c3c, t, mid('t3', 0.6));
        op(feet, P(t, mid('t3', 0.3), 0.3, linear)); op(c3A, 1);
        const bp = P(t, mid('t3', 0.62), 0.8, ease); c3d.set(60, bp, bp); op(c3B, bp > 0.95 ? 1 : 0);
        fadeIn(c3e, t, mid('t3', 0.4)); fadeIn(c3f, t, mid('t3', 0.4)); fadeIn(c3g, t, mid('t3', 0.45));
      } else if (cw === 'compassa') {
        const hug = t > mid('t4', 0.62);
        show(cmp, 330, 420, 1.25, { talk: talk(t, 'compassa'), mood: hug ? 'happy' : 'smug', look: 0.5, arms: hug ? 0 : 1, open: 16 });
        fadeIn(c4a, t, at('t4') + 0.1); fadeIn(c4b, t, mid('t4', 0.6));
        c4s.set(P(t, mid('t4', 0.1), 0.3, linear));
        c4arcs[0].set(P(t, mid('t4', 0.18), 0.35, linear)); c4arcs[1].set(P(t, mid('t4', 0.24), 0.35, linear));
        c4arcs[2].set(P(t, mid('t4', 0.34), 0.35, linear)); c4arcs[3].set(P(t, mid('t4', 0.4), 0.35, linear));
        c4r.forEach((r, i) => op(r, P(t, mid('t4', 0.22 + i * 0.16), 0.3, linear)));
        const hp = P(t, mid('t4', 0.66), 0.4, pop); op(c4heart, clamp(hp * 3)); tr(c4heart, 880, 368 - 6 * Math.sin(t * 5) * hp, Math.max(0.01, hp));
      } else if (cw === 'dad') {
        show(dad, 320, 572, 1.4, { talk: talk(t, 'dad'), mood: t > mid('t5', 0.72) ? 'sad' : 'neutral', look: 0.4, sweat: t > mid('t5', 0.72) ? 1 : 0 });
        fadeIn(c5a, t, at('t5') + 0.1);
        c5w.show(0, P(t, mid('t5', 0.3), 0.3, linear)); c5w.show(1, P(t, mid('t5', 0.4), 0.3, linear)); c5w.ring(1, P(t, mid('t5', 0.5), 0.3, linear));
        fadeIn(c5n, t, mid('t5', 0.56)); c5n.set(P(t, mid('t5', 0.62), 0.3, linear));
        const mp = P(t, mid('t5', 0.56), 0.4, pop); op(c5m, clamp(mp * 3)); op(c5x, P(t, mid('t5', 0.66), 0.25, linear));
        fadeIn(c5k, t, mid('t5', 0.8));
      } else if (cw === 'priya') {
        show(pri, 320, 575, 1.4, { talk: talk(t, 'priya'), mood: 'smug', look: 0.5 });
        fadeIn(c6a, t, at('t6') + 0.1); fadeIn(c6b, t, mid('t6', 0.22));
        const p1 = P(t, mid('t6', 0.15), 0.6, ease); c6d1.set(40, p1, p1);
        op(c6d2, p1 > 0.98 ? 1 : 0);
        const p2 = P(t, mid('t6', 0.4), 0.6, ease); c6d2.set(130, p2, p2);
        op(c6hl, t > mid('t6', 0.4) ? 0.55 + 0.45 * Math.sin(t * 6) : 0);
        fadeIn(c6par, t, mid('t6', 0.7)); fadeIn(c6par2, t, mid('t6', 0.74)); c6ar.set(P(t, mid('t6', 0.72), 0.4, linear));
      }
    } else if (sh === 'R') {
      tr(rayP, 600, 360, 1, (t * 6 * AMP) % 360);
      popIn(logo, t, at('return') + 0.05, 600, 250);
      op(rSub, P(t, mid('return', 0.45), 0.4, linear));
    } else {
      /* ---------- the stinger: the bumboat home ---------- */
      tr(boat.plane, -400, -400, 0.5);
      const swing = P(t, SW0, 1.1, easeOut);
      // camera: wide -> push in on Ah Boy and the Captain -> wider for Dad
      let k = 1.05, fx = 620, fy = 420, sx = 600, sy = 420;
      if (t >= at('southward') - 0.1 && t < at('agrees') - 0.1) { const p = P(t, at('southward') - 0.1, 0.3, ease); k = lerp(1.05, 1.75, p); fx = lerp(620, 840, p); fy = lerp(420, 420, p); sx = lerp(600, 600, p); sy = lerp(420, 400, p); }
      else if (t >= at('agrees') - 0.1) { k = 1.3; fx = 720; fy = 440; sx = 600; sy = 420; }
      view(boatWrap, k, fx, fy, sx, sy);
      op(glowS, t > at('lovely') - 0.2 ? 0.5 * P(t, at('lovely') - 0.2, 0.8, linear) : 0);
      const awake = t > at('southward');
      show(kav, 140, 452, 0.84, { mood: awake ? 'shock' : 'deadpan', look: 0.8 });
      show(mum, 300, 445, 0.84, { mood: awake ? 'happy' : 'deadpan', look: 0.8, lift: 0 });
      show(pri, 455, 450, 0.82, { mood: awake ? 'shock' : 'deadpan', look: 0.8 });
      const dLift = t > mid('agrees', 0.15) ? 1 : 0;
      show(dad, 640, 445, 0.86, { talk: talk(t, 'dad'), mood: t > at('agrees') ? 'smug' : awake ? 'shock' : 'neutral', look: t > at('agrees') ? -0.3 : 0.8, lift: dLift });
      show(boy, 860, 466, 0.8, { talk: talk(t, 'boy'), mood: t > at('agrees') ? 'happy' : 'happy', look: awake ? -0.4 : 0.2, lift: 1 });
      show(tan, 1060, 445, 0.86, { mood: awake ? 'shock' : 'deadpan', look: -0.8 });
      op(mag, 1);
      // Captain Needle riding on Ah Boy's head; the needle swings to the magnet (about 205°)
      const NX = 860, NY = 466 + (-76) * 0.8 + 6 - 138 * 0.4;
      const ang = 205 * swing + (swing > 0.02 && t < SW0 + 2.5 ? Math.sin((t - SW0) * 10) * 10 * (1 - swing * 0.85) * Math.exp(-(t - SW0) * 1.5) : 0);
      let nm = 'deadpan';
      if (t >= at('southward')) nm = t < mid('southward', 0.55) ? 'shock' : 'happy';
      if (t >= at('agrees')) nm = 'happy';
      show(needle, NX, NY, 0.4, { talk: talk(t, 'needle'), mood: nm, look: t > SW0 ? -0.5 : 0, needle: ang, still: true });
      op(tear, t > at('lovely') + 0.1 ? P(t, at('lovely') + 0.1, 0.3, linear) : 0);
      tr(tear, 0, t > at('lovely') + 0.1 ? 26 * P(t, at('lovely') + 0.4, 1.4, easeIn) : 0);
      op(cHome, t < at('southward') - 0.1 ? P(t, at('magnet') + 0.05, 0.3, linear) : 0); tr(cHome, 880, 120);
      cMag.set(t > mid('magnet', 0.5) && t < at('southward') ? P(t, mid('magnet', 0.5), 0.35, linear) : 0); tr(cMag, 600, 230);
      cSouth.set(t > mid('southward', 0.5) && t < at('agrees') - 0.1 ? P(t, mid('southward', 0.5), 0.35, linear) : 0); tr(cSouth, 600, 140);
      if (dLift) {   // Dad points the same way as the needle: 205°, down and a little left
        op(dadArrow, P(t, mid('agrees', 0.15), 0.25, linear));
        tr(dadArrow, 640 - 70 * 0.86, 445 + 48 * 0.86 - 30, 1.25, 205 - 180);
      }
      stamp.set(P(t, end('agrees') + 0.15, 0.35, linear)); tr(stamp, 600, 160, 0.55);
    }
  };
});
