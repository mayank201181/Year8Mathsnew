/* Scene 8: The kitchen saves you some marks.
   Shots: "6 EXAM TRAPS" over the kitchen, the six of them lined up with numbers -> six snappy confessionals, one trap
   card each (Rex: reasons need names, not "Z angles"; Dad: not drawn to scale, don't measure (he hides the
   protractor); Priya: 360° ÷ n is the EXTERIOR angle; Kavya: x = 20, so the angle is 3 × 20 + 10 = 70°; Para & Lel:
   no arrows, no parallel; Ah Boy: isosceles 50°, apex or base, check both) -> logo "ALL THE RIGHT ANGLES will
   return" -> stinger: Monday 7 a.m., the finished floor gleams; the camera glides into the last corner: a thin
   wedge-shaped gap; Dad's protractor reads 91° ("I watched a video") -> Rex in the corner: "Ninety... one?" -> he
   lies down: 90° -> 180°, a straight angle; his hard hat rolls away. */
scene('traps', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;
  const talk = (t, who) => scTalk(S, t, who);

  /* ---------- helpers ---------- */
  const view = (el, k, fx, fy, sx, sy) => el.setAttribute('transform', `translate(${sx.toFixed(1)} ${sy.toFixed(1)}) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 3, color: o.color || C.ink, weight: 700 }); };
  const outline = (el, col, w) => { el.setAttribute('stroke', col); el.setAttribute('stroke-width', w); el.setAttribute('paint-order', 'stroke'); el.setAttribute('stroke-linejoin', 'round'); return el; };
  const GOLD = '#FFE45C', INK = MK.ink, GREEN = '#1E9E5A', RED = '#C62828', BLUE = '#2E6FD8', BERRY = '#B8336A';
  const CX = 880;
  const rad = a => a * Math.PI / 180;
  function trCard(parent, n) {
    const g = G(parent);
    E('rect', { x: 606, y: 136, width: 560, height: 470, rx: 18, fill: 'rgba(0,0,0,0.3)' }, g);
    E('rect', { x: 600, y: 130, width: 560, height: 470, rx: 18, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, g);
    const head = chip(g, 'TRAP ' + n, { size: 30, fill: '#D32F2F', color: '#FFFFFF', weight: 800 }); tr(head, CX, 182);
    return g;
  }
  const txt = (parent, y, s, o) => mkText(parent, CX, y, s, Object.assign({ size: 34, anchor: 'middle', fill: INK }, o || {}));
  const fadeIn = (el, t, t0) => { const p = P(t, t0, 0.3, easeOut); op(el, p); tr(el, 0, 10 * (1 - p)); };
  function trNo(parent, y, s, o) {
    const g = G(parent), m = txt(g, y, s, Object.assign({ fill: RED }, o || {}));
    const sl = strike(g, CX - m.w / 2 - 10, y - 12, CX + m.w / 2 + 10, RED);
    g.set = p => sl.set(p);
    return g;
  }
  const arrowMark = (parent, x, y, col) => E('path', { d: `M${x - 9},${y - 11} L${x + 5},${y} L${x - 9},${y + 11}`, fill: 'none', stroke: col || RED, 'stroke-width': 4.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, parent);

  /* ---------- layers ---------- */
  const Lbg = G(root), Lcast = G(root), Lfront = G(root), Lfg = G(root), Lhud = G(root);

  /* ---------- sets ---------- */
  const kitShot = G(Lbg);
  const kit = agKitchen(kitShot);
  kit.clock(19);
  const islandWrap = G(Lfront);
  islandWrap.appendChild(kit.front); islandWrap.appendChild(kit.top);
  const dim = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#06110F', opacity: 0.55 }, kitShot);
  const conf = agConf(Lbg, 'rex');
  const TINT = {}; for (const k in AG_TINT) TINT[k] = linGrad(AG_TINT[k][0], AG_TINT[k][1], true);
  const logoBg = agTitleBg(Lbg);
  // the floor (stinger)
  const floorShot = G(Lbg), floorWrap = G(floorShot);
  E('rect', { x: -400, y: -400, width: 2000, height: 1600, fill: '#4A5568' }, floorWrap);
  const floor = agFloor(floorWrap, { pattern: 'new' });
  const [FX, FY] = floor.corner;
  const gapH = floor.box.h, gapW = gapH * Math.tan(rad(1));
  const gap = E('path', { d: mkPoly([[FX, FY], [FX, FY - gapH], [FX - gapW, FY - gapH]]), fill: '#FF3040', stroke: '#FFE45C', 'stroke-width': 1 }, floorWrap);
  const sparkle = G(floorShot);
  const spk = [[420, 260], [760, 200], [930, 420], [560, 470], [300, 380], [860, 290]].map(([x, y]) => { const s = G(sparkle); tr(s, x, y); E('path', { d: 'M0,-22 L5,-5 L22,0 L5,5 L0,22 L-5,5 L-22,0 L-5,-5 Z', fill: '#FFFFFF' }, s); return s; });
  // the corner, front view (Rex lies down)
  const cornerShot = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#DCEFF0' }, cornerShot);
  E('rect', { x: 0, y: 0, width: 420, height: 600, fill: '#C5E2E4' }, cornerShot);   // the left wall, in shade
  { let d = ''; for (let x = 460; x <= 1200; x += 60) d += `M${x},0 L${x},600 `; for (let y = 60; y < 600; y += 60) d += `M0,${y} L1200,${y} `; E('path', { d, stroke: '#BBD9DB', 'stroke-width': 2 }, cornerShot); }
  E('path', { d: 'M420,0 L420,600', stroke: '#8FB5B8', 'stroke-width': 6 }, cornerShot);
  E('rect', { x: 0, y: 600, width: 1200, height: 150, fill: '#C9C2B4' }, cornerShot);
  E('rect', { x: 0, y: 590, width: 1200, height: 14, fill: '#9C8F7A' }, cornerShot);   // skirting
  { let d = ''; for (let x = -40; x <= 1240; x += 120) d += `M${x},604 L${x - 60},750 `; E('path', { d, stroke: '#8F887A', 'stroke-width': 2.5 }, cornerShot); }

  /* ===== intro: 6 EXAM TRAPS ===== */
  const sI = G(Lhud);
  const iHead = outline(T(sI, 600, 236, '6 EXAM TRAPS', { size: 80, weight: 800, anchor: 'middle', fill: GOLD, ls: 3 }), '#5A3A07', 10);
  const iSub = T(sI, 600, 290, 'the kitchen saves you some marks', { size: 34, weight: 600, anchor: 'middle', fill: C.ink });
  const ROWX = [150, 330, 510, 690, 875, 1055];
  const badges = ROWX.map((x, k) => { const g = G(sI); E('circle', { r: 26, fill: GOLD, stroke: SC_INK, 'stroke-width': 4 }, g); T(g, 0, 11, String(k + 1), { size: 30, weight: 800, anchor: 'middle', fill: SC_INK }); return g; });

  /* ===== trap cards ===== */
  // 1 Rex: reasons need names
  const c1 = trCard(Lfg, 1);
  const c1a = txt(c1, 262, 'Reasons need **names**', { size: 42, boldFill: BERRY });
  const c1c = txt(c1, 326, '**alternate angles**', { size: 40, boldFill: GREEN });
  const c1d = txt(c1, 374, '**are equal**', { size: 40, boldFill: GREEN });
  const c1z = G(c1);
  { const y1 = 430, y2 = 490, top = y1 - 18, bot = y2 + 18, xt = 960, xb = 800, zA = (xt - xb) / (bot - top), za = Math.atan2(bot - top, xt - xb) * 180 / Math.PI;
    const p1 = xt - (y1 - top) * zA, p2 = xt - (y2 - top) * zA;   // where the transversal crosses each line
    E('path', { d: `M760,${y1} L1000,${y1} M760,${y2} L1000,${y2}`, stroke: INK, 'stroke-width': 4, 'stroke-linecap': 'round' }, c1z);
    E('path', { d: `M760,${y1} L${p1},${y1} L${p2},${y2} L1000,${y2}`, fill: 'none', stroke: '#FFE45C', 'stroke-width': 14, 'stroke-linejoin': 'round', 'stroke-linecap': 'round', opacity: 0.8 }, c1z);
    arrowMark(c1z, 990, y1); arrowMark(c1z, 990, y2);
    E('path', { d: `M${xt},${top} L${xb},${bot}`, stroke: INK, 'stroke-width': 4, 'stroke-linecap': 'round' }, c1z);
    mkAngleMark(c1z, p1, y1, 180, 180 + za, { r: 26, col: '#F2B705', fill: 'rgba(242,183,5,0.45)', width: 3 }).set(1);
    mkAngleMark(c1z, p2, y2, 0, za, { r: 26, col: '#F2B705', fill: 'rgba(242,183,5,0.45)', width: 3 }).set(1); }
  const c1b = trNo(c1, 566, '"Z angles"', { size: 36 });
  const c1t = G(c1); tr(tick(c1t, 20, GREEN), 1080, 350);
  // 2 Dad: not drawn to scale
  const c2 = trCard(Lfg, 2);
  const c2a = txt(c2, 262, '**NOT DRAWN TO SCALE**', { size: 40, boldFill: RED });
  const c2b = txt(c2, 340, "so **don't measure** it:", { size: 36, boldFill: RED });
  const c2c = txt(c2, 400, '**calculate**, with reasons', { size: 36, boldFill: GREEN });
  const c2p = G(c2); tr(agProtractorProp(c2p, 1), 0, 0); const c2x = cross(c2p, 34, '#E53935'); tr(c2x, 0, -22);
  // 3 Priya: 360 ÷ n is the exterior angle
  const c3 = trCard(Lfg, 3);
  const c3a = txt(c3, 262, '{{360° ÷ n}} = the **EXTERIOR** angle', { size: 34, boldFill: RED });
  const c3b = txt(c3, 320, 'interior {{= 180° −}} exterior', { size: 34 });
  const c3c = txt(c3, 400, 'hexagon: {{360° ÷ 6 = 60°}} exterior', { size: 30, fill: '#5A4A52' });
  const c3d = txt(c3, 450, '{{180° − 60° = 120°}} interior', { size: 32, fill: GREEN, weight: 800 });
  const c3e = mkChip(c3, '**EX**terior **EX**its first', { size: 30, col: BERRY, fill: '#FFF0F5', textCol: INK }); tr(c3e, CX, 534);
  // 4 Kavya: finish the job
  const c4 = trCard(Lfg, 4);
  const c4a = txt(c4, 262, 'Found {{x}}? **Finish the job!**', { size: 38, boldFill: BERRY });
  const c4b = txt(c4, 336, '{{x = 20}}', { size: 40, fill: BLUE });
  const c4c = txt(c4, 404, 'angle {{= 3x + 10}}', { size: 36 });
  const c4d = txt(c4, 464, '{{= 3 × 20 + 10}}', { size: 36 });
  const c4e = txt(c4, 534, '{{= 70°}}', { size: 46, fill: GREEN, weight: 800 });
  const c4t = G(c4); tr(tick(c4t, 20, GREEN), CX + 110, 520);
  // 5 Para & Lel: no arrows, no parallel
  const c5 = trCard(Lfg, 5);
  const c5a = txt(c5, 262, '**No arrows, no parallel**', { size: 38, boldFill: BERRY });
  const c5no = G(c5);
  E('path', { d: 'M690,322 L960,316 M690,382 L960,382', stroke: INK, 'stroke-width': 5, 'stroke-linecap': 'round' }, c5no);
  mkText(c5no, 1040, 368, '?', { size: 60, anchor: 'middle', fill: RED, weight: 800 });
  const c5nt = txt(c5no, 428, 'looks parallel? **not given**', { size: 28, fill: '#5A4A52', boldFill: RED });
  const c5yes = G(c5);
  E('path', { d: 'M690,478 L960,478 M690,538 L960,538', stroke: INK, 'stroke-width': 5, 'stroke-linecap': 'round' }, c5yes);
  arrowMark(c5yes, 830, 478); arrowMark(c5yes, 830, 538);
  const c5t = tick(c5yes, 20, GREEN); tr(c5t, 1040, 510);
  const c5yt = txt(c5yes, 578, 'arrows: **parallel**', { size: 28, boldFill: GREEN });
  // 6 Ah Boy: isosceles, check both
  const c6 = trCard(Lfg, 6);
  const c6a = txt(c6, 252, 'Isosceles, one angle {{50°}}:', { size: 34 });
  const isoTri = (apex, cx) => {
    const g = G(c6), half = 90, h = half / Math.tan(rad(apex / 2)), by = 490;
    const pts = [[cx, by - h], [cx + half, by], [cx - half, by]], base = (180 - apex) / 2;
    mkTriangle(g, pts, { col: BLUE, fill: 'rgba(76,143,224,0.15)', angles: [mkFmt(apex) + '°', mkFmt(base) + '°', mkFmt(base) + '°'], angCol: BERRY, size: 30, ar: 26, ink: INK });
    // equal-side ticks
    [[pts[0], pts[1]], [pts[0], pts[2]]].forEach(([a, b]) => { const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, L = Math.hypot(b[0] - a[0], b[1] - a[1]), nx = -(b[1] - a[1]) / L * 10, ny = (b[0] - a[0]) / L * 10; E('path', { d: `M${mx - nx},${my - ny} L${mx + nx},${my + ny}`, stroke: INK, 'stroke-width': 3.5 }, g); });
    return g;
  };
  const c6t1 = isoTri(50, 745), c6t2 = isoTri(80, 1015);
  const c6l1 = mkText(c6, 745, 530, '{{50°}} at the apex', { size: 26, anchor: 'middle', fill: '#5A4A52' });
  const c6l2 = mkText(c6, 1015, 530, '{{50°}} at the base', { size: 26, anchor: 'middle', fill: '#5A4A52' });
  const c6b = mkChip(c6, 'check **BOTH** cases', { size: 28, col: BERRY, fill: '#FFF0F5', textCol: INK }); tr(c6b, CX, 568);

  /* ===== logo ===== */
  const sR = G(Lhud);
  const logo = G(sR);
  const logo1 = outline(T(logo, 0, -78, 'ALL THE', { size: 56, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 8 }), '#082A30', 12);
  const logo2 = outline(T(logo, 0, 26, 'RIGHT ANGLES', { size: 100, weight: 800, anchor: 'middle', fill: GOLD, ls: 2 }), '#082A30', 12);
  const brk = [[-400, 66, 0], [400, -128, 180]].map(([x, y, r]) => {
    const b = G(logo); tr(b, x, y, 1, r);
    E('path', { d: 'M0,-96 L0,0 L96,0', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 10, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, b);
    E('path', { d: 'M24,0 L24,-24 L0,-24', fill: 'none', stroke: GOLD, 'stroke-width': 6 }, b);
    return b;
  });
  const rSub = T(sR, 600, 440, 'will return', { size: 46, weight: 600, anchor: 'middle', fill: '#FFFFFF' });

  /* ===== stinger ===== */
  const sW = G(Lhud);
  const cMon = pill(sW, 'Monday, 7 a.m.', { size: 34, color: GOLD, stroke: GOLD });
  const cPerf = mkChip(sW, 'except... **that last corner**', { size: 30, col: '#FF8A8A' });
  const gapArrow = arrow(sW, 560, 300, 318, 300, { color: '#FF6060', width: 7 });
  const prot = mkProtractor(sW, 230, { readSize: 44 });
  const c91 = pill(sW, 'the corner: 91°', { size: 36, color: '#FF8A8A', stroke: '#FF8A8A' });
  const phone = agPhone(sW, { speed: '2×' });
  const lieArc = G(sW);
  const lieLab = mkChip(sW, '{{180°}}: a **straight angle**', { size: 36, col: GOLD });
  const oneQ = outline(T(sW, 0, 0, '91?!', { size: 110, weight: 800, anchor: 'middle', fill: '#FF6070' }), '#3A0A10', 12);
  // Rex's hard hat, rolling away
  const hatR = G(Lfg);
  { const h = G(hatR);
    E('path', { d: 'M-46,2 Q-46,-40 0,-42 Q46,-40 46,2 Z', fill: '#FFC247', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, h);
    E('rect', { x: -60, y: -2, width: 120, height: 12, rx: 5, fill: '#F2A20C', stroke: SC_INK, 'stroke-width': 3 }, h);
    E('path', { d: 'M-8,-40 L-8,-4 M8,-40 L8,-4', stroke: '#F2A20C', 'stroke-width': 4 }, h); }

  /* ---------- the cast ---------- */
  const rex = cast(Lcast, 'rex'), dad = cast(Lcast, 'dad'), pri = cast(Lcast, 'priya'), kav = cast(Lcast, 'kavya'),
    pl = cast(Lcast, 'parlel'), boy = cast(Lcast, 'boy'), mum = cast(Lcast, 'mum');
  const rexHat = rex.querySelector('g[transform="translate(60.00 -122.00)"]');
  const rexFace = rex.querySelector('g[transform="translate(60.00 -70.00)"]');
  const shut = G(rexFace);   // closed eyes, drawn over the face kit
  [-25, 25].forEach(x => { E('circle', { cx: x, cy: 0, r: 17, fill: '#F7CB2D' }, shut); E('path', { d: `M${x - 13},2 Q${x},12 ${x + 13},2`, fill: 'none', stroke: SC_INK, 'stroke-width': 4, 'stroke-linecap': 'round' }, shut); });
  op(shut, 0);

  /* ---------- shots ---------- */
  const cut = id => at(id) - 0.06;
  const SHOTS = [['I', -9], ['1', cut('t1')], ['2', cut('t2')], ['3', cut('t3')], ['4', cut('t4')], ['5', cut('t5')], ['6', cut('t6')],
    ['R', cut('return')], ['M', cut('monday')], ['X', cut('one')]];
  const shotAt = t => { let s = 'I'; for (const [k, t0] of SHOTS) if (t >= t0) s = k; return s; };
  const CARDS = { 1: c1, 2: c2, 3: c3, 4: c4, 5: c5, 6: c6 };
  const CONF = { 1: 'rex', 2: 'dad', 3: 'priya', 4: 'kavya', 5: 'parlel', 6: 'boy' };
  const RS = 1.25, VXs = 420, RY = 606 - 126 * RS, RXo = VXs + 70 * RS;   // Rex in the corner: vertex at x 420, feet on the floor
  { const vx = VXs, vy = RY + 74 * RS; E('path', { d: `M${vx + 110},${vy} A110,110 0 0 0 ${vx - 110},${vy} Z`, fill: 'rgba(255,228,92,0.3)', stroke: '#F2B705', 'stroke-width': 6 }, lieArc); }

  return t => {
    const sh = shotAt(t);
    kit.upd(t);
    op(kitShot, sh === 'I'); op(islandWrap, sh === 'I');
    op(logoBg, sh === 'R'); op(sI, sh === 'I'); op(sR, sh === 'R'); op(sW, sh === 'M' || sh === 'X');
    op(floorShot, sh === 'M'); op(cornerShot, sh === 'X');
    for (const k in CARDS) op(CARDS[k], sh === k);
    const cw = CONF[sh];
    conf.set(cw ? 1 : 0, t); if (cw) conf.firstChild.setAttribute('fill', TINT[cw]);
    [rex, dad, pri, kav, pl, boy, mum, hatR].forEach(e => op(e, 0));
    op(rexHat, 1); op(shut, 0); op(dad.tools.protractor, 1);
    op(boy.tools.scissors, 0); op(boy.tools.broom, 1);
    if (rex.parentNode !== (sh === 'I' ? Lfg : Lcast)) (sh === 'I' ? Lfg : Lcast).appendChild(rex);
    if (pl.parentNode !== (sh === 'I' ? Lfg : Lcast)) (sh === 'I' ? Lfg : Lcast).appendChild(pl);
    const show = (c, x, y, s, st) => { op(c, 1); tr(c, x, y, s); c.set(Object.assign({ t }, st)); };

    if (sh === 'I') {
      const hp = P(t, at('intro') + 0.05, 0.45, pop);
      op(iHead, clamp(hp * 2.5)); iHead.setAttribute('transform', `translate(600 210) scale(${Math.max(0.01, 0.6 + 0.4 * hp).toFixed(3)}) translate(-600 -210)`);
      op(iSub, P(t, mid('intro', 0.3), 0.4, linear));
      const ROW = [[rex, 'deadpan', 0.44, 520 - 126 * 0.44], [dad, 'smug', 0.62, 448], [pri, 'smug', 0.62, 448], [kav, 'happy', 0.62, 448], [pl, 'happy', 0.3, 444], [boy, 'happy', 0.64, 456]];
      ROW.forEach(([c, mood, s, y], i) => {
        const p = P(t, mid('intro', 0.4) + i * 0.12, 0.45, pop);
        show(c, ROWX[i] + (c === pl ? -12 : c === rex ? -20 : 0), y + 30 * (1 - clamp(p)), Math.max(0.01, s * (0.7 + 0.3 * p)), { mood, moodB: mood, look: 0, lift: 0, open: 90 });
        op(c, clamp(p * 3));
        popIn(badges[i], t, mid('intro', 0.45) + i * 0.12, ROWX[i], 640);
      });
    } else if (cw) {
      if (cw === 'rex') {
        show(rex, 330, 400, 1.32, { talk: talk(t, 'rex'), mood: t > mid('t1', 0.7) ? 'annoyed' : 'deadpan', look: 0.4, open: 90, twitch: t > mid('t1', 0.72) && t < mid('t1', 0.9) ? 0.8 : 0 });
        fadeIn(c1a, t, at('t1') + 0.05); fadeIn(c1c, t, mid('t1', 0.3)); fadeIn(c1d, t, mid('t1', 0.42)); fadeIn(c1z, t, mid('t1', 0.38)); fadeIn(c1t, t, mid('t1', 0.5));
        fadeIn(c1b, t, mid('t1', 0.66)); c1b.set(P(t, mid('t1', 0.8), 0.3, linear));
      } else if (cw === 'dad') {
        const hide = mid('t2', 0.62);
        show(dad, 320, 572, 1.4, { talk: talk(t, 'dad'), mood: t > hide ? 'sad' : 'neutral', look: t > hide ? -0.6 : 0.4, lift: 1 - P(t, hide - 0.4, 0.4, ease) });
        op(dad.tools.protractor, t > hide ? 0 : 1);
        fadeIn(c2a, t, at('t2') + 0.1); fadeIn(c2b, t, mid('t2', 0.28)); fadeIn(c2c, t, mid('t2', 0.45));
        popIn(c2p, t, mid('t2', 0.5), CX, 510, 1.6); op(c2x, P(t, mid('t2', 0.55), 0.2, linear));
      } else if (cw === 'priya') {
        show(pri, 320, 572, 1.4, { talk: talk(t, 'priya'), mood: t > mid('t3', 0.8) ? 'smug' : 'neutral', look: 0.4 });
        fadeIn(c3a, t, at('t3') + 0.1); fadeIn(c3b, t, mid('t3', 0.5)); fadeIn(c3c, t, mid('t3', 0.66)); fadeIn(c3d, t, mid('t3', 0.78));
        c3e.set(P(t, mid('t3', 0.9), 0.35, linear));
      } else if (cw === 'kavya') {
        show(kav, 320, 560, 1.4, { talk: talk(t, 'kavya'), mood: t > mid('t4', 0.85) ? 'smug' : 'neutral', look: 0.4 });
        fadeIn(c4a, t, at('t4') + 0.1); fadeIn(c4b, t, mid('t4', 0.18)); fadeIn(c4c, t, mid('t4', 0.55)); fadeIn(c4d, t, mid('t4', 0.72));
        fadeIn(c4e, t, mid('t4', 0.84)); fadeIn(c4t, t, mid('t4', 0.92));
      } else if (cw === 'parlel') {
        const shock = t > mid('t5', 0.25) && t < mid('t5', 0.6);
        show(pl, 300, 380, 0.95, { talk: talk(t, 'para'), talkB: talk(t, 'lel'), mood: shock ? 'shock' : 'neutral', moodB: shock ? 'shock' : 'happy', look: 0.4, lookB: 0.4 });
        fadeIn(c5a, t, at('t5') + 0.1); fadeIn(c5no, t, mid('t5', 0.3)); fadeIn(c5yes, t, mid('t5', 0.75));
      } else if (cw === 'boy') {
        show(boy, 310, 548, 1.5, { talk: talk(t, 'boy'), mood: t > mid('t6', 0.85) ? 'happy' : 'neutral', look: 0.4, lift: 0.4 });
        fadeIn(c6a, t, at('t6') + 0.1); fadeIn(c6t1, t, mid('t6', 0.35)); fadeIn(c6l1, t, mid('t6', 0.4));
        fadeIn(c6t2, t, mid('t6', 0.55)); fadeIn(c6l2, t, mid('t6', 0.6));
        c6b.set(P(t, mid('t6', 0.85), 0.35, linear));
      }
    } else if (sh === 'R') {
      logoBg.upd(t, AMP);
      popIn(logo, t, at('return') + 0.05, 600, 260);
      brk.forEach((b, i) => { const [x, y, r] = i ? [400, -128, 180] : [-400, 66, 0]; tr(b, x, y, 1, r + Math.sin(t * 2 + i) * 4 * AMP); });
      op(rSub, P(t, mid('return', 0.45), 0.4, linear));
    } else if (sh === 'M') {
      /* ---------- the finished floor; the last corner ---------- */
      [cMon, cPerf, gapArrow, prot, c91, phone, lieArc, lieLab, oneQ].forEach(e => op(e, 0));
      const zoom = P(t, mid('perfect', 0.35), 1.4, ease);
      const k = lerp(1, 1.3, zoom);
      view(floorWrap, k, FX, FY, lerp(FX, 300, zoom), lerp(FY, 640, zoom));
      op(sparkle, 1 - zoom);
      spk.forEach((s, i) => { const f = (t * 0.7 + i * 0.37) % 1; op(s, Math.sin(f * Math.PI)); tr(s, [420, 760, 930, 560, 300, 860][i], [260, 200, 420, 470, 380, 290][i], 0.5 + 0.6 * Math.sin(f * Math.PI)); });
      if (t < at('perfect')) popIn(cMon, t, at('monday') + 0.1, 760, 160);
      op(gap, zoom > 0.5 ? 0.6 + 0.4 * Math.sin(t * 7) : 1);
      if (t >= mid('perfect', 0.75) && t < at('ninety1')) { popIn(cPerf, t, mid('perfect', 0.72), 760, 300); op(gapArrow, 1); gapArrow.set(P(t, mid('perfect', 0.8), 0.4, linear)); }
      const sx = 300, sy = 640;   // the corner on screen once zoomed
      if (t >= at('ninety1') - 0.06) {
        const pp = P(t, at('ninety1') + 0.1, 0.4, easeOut);
        op(prot, pp); tr(prot, sx, sy); prot.set(lerp(70, 91, P(t, mid('ninety1', 0.2), 0.8, ease)), 1);
        popIn(c91, t, mid('ninety1', 0.42), 740, 200);
        if (t > mid('ninety1', 0.68)) { popIn(phone, t, mid('ninety1', 0.68), 640, 400, 0.6, -6); phone.set(0.5); tr(phone.speed, 0, 122, 1 + 0.12 * Math.max(0, Math.sin(t * 9))); }
      }
      // the family along the bottom edge
      const per = t >= at('perfect') - 0.06, n91 = t >= at('ninety1') - 0.06;
      show(kav, 626, 700, 0.72, { talk: talk(t, 'kavya'), mood: n91 ? 'shock' : per && t > mid('perfect', 0.6) ? 'deadpan' : 'happy', look: -0.8 });
      show(mum, 784, 700, 0.72, { talk: talk(t, 'mum'), mood: per && t > mid('perfect', 0.55) ? 'sad' : 'happy', look: -0.8, lift: 0 });
      show(dad, 942, 700, 0.72, { talk: talk(t, 'dad'), mood: n91 ? (t > mid('ninety1', 0.6) ? 'smug' : 'neutral') : 'happy', look: -0.8, lift: n91 ? 1 : 0 });
      show(boy, 1098, 712, 0.72, { talk: talk(t, 'boy'), mood: n91 ? 'shock' : 'happy', look: -0.8, lift: 0 });
    } else {
      /* ---------- X: Rex in the corner: "Ninety... one?"; he lies down ---------- */
      [cMon, cPerf, gapArrow, prot, c91, phone].forEach(e => op(e, 0));
      const lie = P(t, at('lie') + 0.1, 1.3, ease);
      const open = lerp(90, 180, lie);
      const shock = t < at('lie');
      show(rex, RXo, RY, RS, { talk: talk(t, 'rex'), mood: shock ? 'shock' : lie < 0.6 ? 'sad' : 'deadpan', look: 0, open, twitch: shock && t > mid('one', 0.2) ? 1 : 0, still: !shock });
      op(shut, P(t, at('lie') + 0.9, 0.3, linear));
      const qp = P(t, at('one') + 0.05, 0.35, pop);
      op(oneQ, shock ? clamp(qp * 3) : 1 - P(t, at('lie'), 0.2, linear)); tr(oneQ, 860 + Math.sin(t * 40) * 3 * AMP, 260, Math.max(0.01, 0.6 + 0.4 * qp), -4);
      // the straight angle: an arc over the vertex, then the label
      const vx = VXs, vy = RY + 74 * RS;
      op(lieArc, 0); op(lieLab, 0);
      if (lie > 0.95) {
        op(lieArc, 1);
        lieLab.set(P(t, at('lie') + 1.3, 0.4, linear)); tr(lieLab, 760, 250);
      }
      // the hard hat falls off and rolls away along the floor
      const off = at('lie') + 0.75;
      op(rexHat, t < off ? 1 : 0);
      if (t >= off) {
        const r = P(t, off, 1.6, easeOut);
        const hx0 = RXo - 10 * RS, hy0 = RY - 48 * RS;
        op(hatR, 1); tr(hatR, hx0 + 420 * r, lerp(hy0, 640, Math.min(1, r * 3)) - 30 * Math.abs(Math.sin(r * 8)) * (1 - r), RS * 0.9, 360 * 1.3 * r);
      }
    }
  };
});
