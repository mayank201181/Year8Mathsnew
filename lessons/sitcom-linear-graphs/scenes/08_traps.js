/* Scene 8: The beach saves you some marks.
   "6 EXAM TRAPS" over the beach, the six of them lined up -> six snappy confessionals, one trap card each (Ex: (x, y),
   across first, never (y, x); Ah Boy: brackets, 4 - 3 x (-2) = 10, not -2; Lionel: one ruled straight line, never
   dot-to-dot; Mo: downhill = minus gradient, a little goat tumbles down the line; Priya: minutes aren't hours,
   6 / (1/3) = 18 km/h; Dad: midpoint, add then halve: (1, 1), not (2, 2)) -> "RISE OVER RUN will return" -> stinger:
   8 p.m., home, everyone sunburnt; Dad: everything went exactly to plan; Ah Boy flips the flipchart: ICE CREAMS
   against TIME, six ice creams all at 3 p.m., a vertical line; Mum: SIX?! -> Lionel swings vertical on Ah Boy's line,
   trembles, and topples over flat onto the easel ledge, asleep. */
scene('traps', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;
  const talk = (t, who) => scTalk(S, t, who);

  /* ---------- helpers ---------- */
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const outline = (el, col, w) => { el.setAttribute('stroke', col); el.setAttribute('stroke-width', w); el.setAttribute('paint-order', 'stroke'); el.setAttribute('stroke-linejoin', 'round'); return el; };
  const GOLD = '#FFE45C', INK = MK.ink, GREEN = '#1E9E5A', RED = '#C62828', BLUE = '#2E7DD8', AMBER = '#C77A0A', BERRY = '#B8336A';
  const CX = 880;
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
  const mark = (parent, ok, x, y) => { const g = ok ? tick(parent, 18, GREEN) : cross(parent, 16, RED); tr(g, x, y); return g; };

  /* ---------- layers ---------- */
  const Lbg = G(root), Lcast = G(root), Lfront = G(root), Lfg = G(root), Lstg = G(root), Lhud = G(root);

  /* ---------- sets ---------- */
  const parkShot = G(Lbg);
  const park = lgPark(parkShot, { sky: 'evening' });
  Lfront.appendChild(park.front);
  const dim = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#0A1B27', opacity: 0.55 }, parkShot);
  const conf = lgConf(Lbg, 'ex');
  const TINT = {}; for (const k in LG_TINT) TINT[k] = linGrad(LG_TINT[k][0], LG_TINT[k][1], true);
  const logoBg = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#0E3A5A', '#2786B8', true) }, logoBg);
  E('rect', { x: 0, y: 560, width: 1200, height: 190, fill: linGrad('#F2DFAE', '#E2C88A', true) }, logoBg);
  const logoTri = E('path', { d: 'M180,470 L1020,470 L1020,120 Z', fill: '#FFE45C', opacity: 0.12 }, logoBg);
  E('path', { d: 'M180,470 L1020,120', stroke: LG.amber, 'stroke-width': 10, 'stroke-linecap': 'round', opacity: 0.55 }, logoBg);
  const flatShot = G(Lbg);
  const flat = lgFlat(flatShot);
  E('rect', { x: 76, y: 116, width: 368, height: 248, fill: linGrad('#1E2A5A', '#C8643A', true), opacity: 0.88 }, flat.firstChild);   // evening window
  E('circle', { cx: 380, cy: 160, r: 4, fill: '#FFFFFF' }, flat.firstChild); E('circle', { cx: 150, cy: 140, r: 3, fill: '#FFFFFF' }, flat.firstChild);
  const flatFront = G(Lfront); flatFront.appendChild(flat.front); flatFront.appendChild(flat.top);
  const chart = flat.chart;

  /* ===== intro: 6 EXAM TRAPS ===== */
  const sI = G(Lhud);
  const iHead = outline(T(sI, 600, 236, '6 EXAM TRAPS', { size: 80, weight: 800, anchor: 'middle', fill: GOLD, ls: 3 }), '#5A3A07', 10);
  const iSub = T(sI, 600, 300, 'the beach saves you some marks', { size: 34, weight: 600, anchor: 'middle', fill: C.ink });
  const ROWX = [150, 330, 510, 690, 870, 1050];
  const badges = ROWX.map((x, k) => { const g = G(sI); E('circle', { r: 26, fill: GOLD, stroke: SC_INK, 'stroke-width': 4 }, g); T(g, 0, 11, String(k + 1), { size: 30, weight: 800, anchor: 'middle', fill: SC_INK }); return g; });

  /* ===== trap cards ===== */
  // 1 Ex
  const c1 = trCard(Lfg, 1);
  const c1a = txt(c1, 262, '**Across first**, then up or down', { size: 34, boldFill: RED });
  const c1b = G(c1); mkMath(c1b, CX, 362, '(x, y)', { size: 76, anchor: 'middle', fill: GREEN }); mark(c1b, true, CX + 120, 340);
  const c1c = trNo(c1, 440, 'never {{(y, x)}}', { size: 40 });
  const c1d = txt(c1, 530, '{{(2, 5)}}: **2** across, **5** up', { size: 32, boldFill: BLUE });
  // 2 Ah Boy
  const c2 = trCard(Lfg, 2);
  const c2a = txt(c2, 256, '**Brackets** for negatives', { size: 38, boldFill: BERRY });
  const c2w = mkWorking(c2, CX - 40, 290, ['y = 4 − 3 × (−2)', '= 4 + 6', '= 10'], { size: 42, fill: INK, gap: 18, ringCol: GREEN });
  const c2br = E('rect', { x: 0, y: 0, width: 10, height: 10, rx: 8, fill: 'rgba(255,228,92,0.7)' }, c2);
  { const l0 = c2w.lines[0], pre = mkMeasure('4 − 3 × ', { size: 42 }).w, bw = mkMeasure('(−2)', { size: 42 }).w, eqw = mkMeasure('=', { size: 42 }).w;
    const x0 = CX - 40 + eqw / 2 + 0.26 * 42 + pre;
    attr(c2br, 'x', x0 - 6); attr(c2br, 'y', l0.y - 38); attr(c2br, 'width', bw + 12); attr(c2br, 'height', 52);
    c2.insertBefore(c2br, c2w); }
  const c2no = trNo(c2, 548, '{{4 − 3 × 2 = −2}}', { size: 36 });
  // 3 Lionel
  const c3 = trCard(Lfg, 3);
  const c3a = txt(c3, 256, '**One ruled straight line**', { size: 38, boldFill: AMBER });
  const mini = (x, ok) => {
    const g = G(c3);
    const ax = mkAxes(g, { xmin: 0, xmax: 4, ymin: 0, ymax: 4, unit: 46, ink: INK, size: 20, grid: true, labelStep: 10, halo: MK.paper, xName: ' ', yName: ' ' });
    tr(ax, x, 300);
    const pts = ok ? [[0.5, 1.25], [1.5, 1.75], [2.5, 2.25], [3.5, 2.75]] : [[0.5, 1.4], [1.5, 1.6], [2.5, 2.5], [3.5, 2.6]];
    const ln = ok ? ax.line(0.5, 1, { col: GREEN, width: 6 }) : null;
    let zz = null;
    if (!ok) zz = mkDash(E('path', { d: 'M' + pts.map(([a, b]) => `${ax.px(a).toFixed(1)},${ax.py(b).toFixed(1)}`).join(' L'), fill: 'none', stroke: RED, 'stroke-width': 5, 'stroke-linejoin': 'round' }, ax));
    pts.forEach(([a, b]) => E('circle', { cx: ax.px(a), cy: ax.py(b), r: 7, fill: BLUE, stroke: '#FFFFFF', 'stroke-width': 2 }, ax));
    const lab = mkText(g, x + 76, 534, ok ? 'ruled' : 'dot-to-dot', { size: 28, anchor: 'middle', fill: ok ? GREEN : RED, weight: 800 });
    const mk = mark(g, ok, x + 76 + lab.w / 2 + 26, 522);
    g.ln = ln; g.zz = zz; g.mk = mk;
    return g;
  };
  const c3L = mini(650, false), c3R = mini(918, true);
  // label positions: put them under each mini graph
  const c3note = txt(c3, 578, 'across the **whole range**', { size: 28, boldFill: GREEN });
  // 4 Mo
  const c4 = trCard(Lfg, 4);
  const c4a = txt(c4, 256, '**Downhill** ⇒ **minus** gradient', { size: 34, boldFill: RED });
  const c4ax = mkAxes(c4, { xmin: 0, xmax: 3, ymin: 0, ymax: 4, unit: 54, ink: INK, size: 22, labelStep: 1, halo: MK.paper });
  tr(c4ax, 640, 300);
  const c4ln = c4ax.line(-2, 4, { col: AMBER, width: 7 });
  const c4m = G(c4); mkMath(c4m, 1000, 380, 'm = −2', { size: 48, anchor: 'middle', fill: GREEN }); mark(c4m, true, 1110, 362);
  const c4no = G(c4); { const m = mkMath(c4no, 1000, 460, 'm = 2', { size: 44, anchor: 'middle', fill: RED }); const sl = strike(c4no, 1000 - m.w / 2 - 10, 446, 1000 + m.w / 2 + 10, RED); c4no.set = p => sl.set(p); }
  const c4k = mkText(c4, 1000, 540, 'keep the **sign**', { size: 30, anchor: 'middle', fill: INK, boldFill: RED });
  const goat = G(c4), goatIn = G(goat);
  [-1, 1].forEach(sd => E('path', { d: `M${sd * 6},-14 Q${sd * 22},-34 ${sd * 24},-14`, fill: 'none', stroke: '#8F9CAB', 'stroke-width': 5, 'stroke-linecap': 'round' }, goatIn));
  E('circle', { r: 17, fill: '#FFF8EC', stroke: SC_INK, 'stroke-width': 3 }, goatIn);
  E('circle', { cx: -6, cy: -3, r: 2.6, fill: SC_INK }, goatIn); E('circle', { cx: 6, cy: -3, r: 2.6, fill: SC_INK }, goatIn);
  E('path', { d: 'M-4,22 Q0,32 4,22 Z', fill: '#E9DFC8', stroke: SC_INK, 'stroke-width': 2 }, goatIn);
  // 5 Priya
  const c5 = trCard(Lfg, 5);
  const c5a = txt(c5, 256, "**Minutes** aren't **hours**", { size: 38, boldFill: BLUE });
  const c5w = mkWorking(c5, CX - 30, 290, [{ m: '20 "min" = 1/3 "h"' }, { m: '6 ÷ 1/3 = 18 km\\/h', col: GREEN }], { size: 42, fill: INK, gap: 22, ringCol: GREEN });
  const c5no = trNo(c5, 540, '{{6 ÷ 20 = 0.3}}', { size: 36 });
  // 6 Dad
  const c6 = trCard(Lfg, 6);
  const c6a = txt(c6, 256, 'Midpoint: add, then **halve** both', { size: 32, boldFill: GREEN });
  const c6m = G(c6); mkMath(c6m, CX, 354, '((−3 + 5)/2, (−2 + 4)/2)', { size: 40, anchor: 'middle', fill: INK });
  const c6r = G(c6); mkMath(c6r, CX, 444, '= (1, 1)', { size: 52, anchor: 'middle', fill: GREEN }); mark(c6r, true, CX + 130, 426);
  const c6no = trNo(c6, 530, '{{(2, 2)}}  (Ah Boy)', { size: 36 });

  /* ===== logo ===== */
  const sR = G(Lhud);
  const logo = G(sR);
  const lRise = outline(T(logo, 0, -60, 'RISE', { size: 112, weight: 800, anchor: 'middle', fill: GOLD, ls: 4 }), '#0B2A40', 12);
  E('rect', { x: -230, y: -32, width: 460, height: 14, rx: 7, fill: '#FFFFFF' }, logo);
  const lRun = outline(T(logo, 0, 74, 'OVER RUN', { size: 84, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 3 }), '#0B2A40', 12);
  const rSub = outline(T(sR, 600, 420, 'will return', { size: 46, weight: 700, anchor: 'middle', fill: '#FFFFFF' }), '#0B2A40', 8);

  /* ===== stinger: 8 p.m. ===== */
  const sW = G(Lhud);
  const cEight = chip(sW, '8 p.m. Home.', { size: 32, fill: 'rgba(10,27,39,0.9)', stroke: GOLD, sw: 3, color: GOLD, weight: 700 });
  const cSix = mkChip(sW, '**SIX?!**', { size: 40, col: '#FF8FC8' });
  // Ah Boy's page on the flipchart
  const page = G(Lfg), pageIn = G(page); tr(page, 860, 150);
  { const W0 = 380, H0 = 300;
    E('rect', { x: -W0 / 2, y: 0, width: W0, height: H0, fill: '#FFFDF6', stroke: '#B8A27A', 'stroke-width': 3 }, pageIn);
    mkText(pageIn, 0, 36, '**ICE CREAMS** against **TIME**', { size: 26, anchor: 'middle', fill: SC_INK, boldFill: '#C62828' });
    const ox = chart.px(8), oy = 254, aw = chart.px(20) - ox, ah = 180;
    E('path', { d: `M${ox},${oy} L${ox + aw + 12},${oy} M${ox},${oy} L${ox},${oy - ah - 12}`, fill: 'none', stroke: SC_INK, 'stroke-width': 4, 'stroke-linecap': 'round' }, pageIn);
    let tk = ''; for (let k = 1; k <= 6; k++) tk += `M${ox - 5},${oy - k * 30} L${ox + 5},${oy - k * 30} `;
    E('path', { d: tk, stroke: SC_INK, 'stroke-width': 3 }, pageIn);
    T(pageIn, ox - 12, oy - 6 * 30 + 9, '6', { size: 26, weight: 800, anchor: 'end', fill: SC_INK });
    T(pageIn, ox - 12, oy + 9, '0', { size: 26, weight: 800, anchor: 'end', fill: SC_INK });
    const x3 = ox + 7 / 12 * aw;
    page.vline = mkDash(E('path', { d: `M${x3},${oy} L${x3},${oy - 180}`, stroke: '#C62828', 'stroke-width': 7, 'stroke-linecap': 'round' }, pageIn));
    page.dots = [1, 2, 3, 4, 5, 6].map(k => E('circle', { cx: x3, cy: oy - k * 30, r: 8, fill: '#FF8FC8', stroke: SC_INK, 'stroke-width': 2.5 }, pageIn));
    T(pageIn, x3, oy + 32, '3 p.m.', { size: 26, weight: 800, anchor: 'middle', fill: '#C62828' });
    page.x3 = 860 + x3; page.yTop = 150 + oy - 180; page.yBot = 150 + oy; }

  /* ---------- the cast ---------- */
  const ex = cast(Lcast, 'ex'), boy = cast(Lcast, 'boy'), lio = cast(Lcast, 'lionel', { len: 340 }), mo = cast(Lcast, 'mo'),
    priya = cast(Lcast, 'priya', { prop: null }), dad = cast(Lcast, 'dad', { blush: true }), kav = cast(Lcast, 'kavya'), mum = cast(Lcast, 'mum', { blush: true });

  /* ---------- shots ---------- */
  const cut = id => at(id) - 0.06;
  const SHOTS = [['I', -9], ['1', cut('t1')], ['2', cut('t2')], ['3', cut('t3')], ['4', cut('t4')], ['5', cut('t5')], ['6', cut('t6')],
    ['R', cut('return')], ['W', cut('eight')]];
  const shotAt = t => { let s = 'I'; for (const [k, t0] of SHOTS) if (t >= t0) s = k; return s; };
  const CARDS = { 1: c1, 2: c2, 3: c3, 4: c4, 5: c5, 6: c6 };
  const CONF = { 1: 'ex', 2: 'boy', 3: 'lionel', 4: 'mo', 5: 'priya', 6: 'dad' };
  const ROW = [[ex, 'smug', 0.55, 560], [boy, 'happy', 0.7, 566], [lio, 'smug', 0.42, 540], [mo, 'happy', 0.66, 568], [priya, 'smug', 0.7, 562], [dad, 'smug', 0.7, 562]];
  const fade = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  return t => {
    op(fade, 1 - P(t, 0, 0.35, linear));
    const sh = shotAt(t);
    park.upd(t);
    op(parkShot, sh === 'I' ? 1 : 0); op(park.front, sh === 'I' ? 1 : 0);
    op(flatShot, sh === 'W' ? 1 : 0); op(flatFront, sh === 'W' ? 1 : 0);
    op(logoBg, sh === 'R' ? 1 : 0); op(sI, sh === 'I' ? 1 : 0); op(sR, sh === 'R' ? 1 : 0); op(sW, sh === 'W' ? 1 : 0);
    for (const k in CARDS) op(CARDS[k], sh === k ? 1 : 0);
    const cw = CONF[sh];
    conf.set(cw ? 1 : 0, t); if (cw) conf.firstChild.setAttribute('fill', TINT[cw]);
    [ex, boy, lio, mo, priya, dad, kav, mum].forEach(e => op(e, 0));
    op(page, 0);
    const lioHome = sh === 'W' ? Lstg : Lcast;
    if (lio.parentNode !== lioHome) lioHome.appendChild(lio);
    const show = (c, x, y, s, st) => { op(c, 1); tr(c, x, y, s); c.set(Object.assign({ t }, st)); };

    if (sh === 'I') {
      const hp = P(t, at('intro') + 0.05, 0.45, pop);
      op(iHead, clamp(hp * 2.5)); iHead.setAttribute('transform', `translate(600 210) scale(${Math.max(0.01, 0.6 + 0.4 * hp).toFixed(3)}) translate(-600 -210)`);
      op(iSub, P(t, mid('intro', 0.3), 0.4, linear));
      ROW.forEach(([c, mood, s, y], i) => {
        const p = P(t, mid('intro', 0.35) + i * 0.13, 0.45, pop);
        show(c, ROWX[i], y + 40 * (1 - clamp(p)), Math.max(0.01, s * (0.7 + 0.3 * p)), { mood, look: 0, tilt: c === lio ? 20 : 0 });
        op(c, clamp(p * 3));
        popIn(badges[i], t, mid('intro', 0.4) + i * 0.13, ROWX[i], 400);
      });
    } else if (cw) {
      if (cw === 'ex') {
        show(ex, 330, 430, 1.3, { talk: talk(t, 'ex'), mood: t > mid('t1', 0.7) ? 'annoyed' : 'smug', look: 0.5 });
        fadeIn(c1a, t, at('t1') + 0.1); fadeIn(c1b, t, mid('t1', 0.5)); fadeIn(c1c, t, mid('t1', 0.72)); c1c.set(P(t, mid('t1', 0.85), 0.3, linear)); fadeIn(c1d, t, mid('t1', 0.9));
      } else if (cw === 'boy') {
        show(boy, 330, 560, 1.45, { talk: talk(t, 'boy'), mood: t > mid('t2', 0.85) ? 'shock' : 'happy', look: 0.4, lift: t > mid('t2', 0.2) && t < mid('t2', 0.6) ? 1 : 0 });
        fadeIn(c2a, t, at('t2') + 0.1);
        c2w.set(0); [0.3, 0.5, 0.62].forEach((f, i) => c2w.show(i, P(t, mid('t2', f), 0.3, linear)));
        op(c2br, P(t, mid('t2', 0.36), 0.3, linear)); c2w.ring(2, P(t, mid('t2', 0.7), 0.3, linear));
        fadeIn(c2no, t, mid('t2', 0.84)); c2no.set(P(t, mid('t2', 0.9), 0.3, linear));
      } else if (cw === 'lionel') {
        show(lio, 330, 400, 1.1, { talk: talk(t, 'lionel'), mood: t > mid('t3', 0.7) ? 'annoyed' : 'smug', look: 0.5, tilt: 0 });
        fadeIn(c3a, t, at('t3') + 0.1);
        fadeIn(c3R, t, mid('t3', 0.2)); if (c3R.ln) c3R.ln.set(P(t, mid('t3', 0.25), 0.7, ease)); op(c3R.mk, P(t, mid('t3', 0.45), 0.25, linear));
        fadeIn(c3L, t, mid('t3', 0.62)); mkDraw(c3L.zz, P(t, mid('t3', 0.66), 0.5, linear)); op(c3L.mk, P(t, mid('t3', 0.86), 0.25, linear));
        fadeIn(c3note, t, mid('t3', 0.45));
      } else if (cw === 'mo') {
        show(mo, 320, 430, 1.2, { talk: talk(t, 'mo'), mood: t > mid('t4', 0.7) ? 'shock' : 'happy', look: 0.5 });
        fadeIn(c4a, t, at('t4') + 0.1); c4ln.set(P(t, mid('t4', 0.15), 0.6, ease));
        fadeIn(c4m, t, mid('t4', 0.3)); fadeIn(c4no, t, mid('t4', 0.42)); c4no.set(P(t, mid('t4', 0.5), 0.3, linear)); fadeIn(c4k, t, mid('t4', 0.55));
        // a little goat tumbles down the line
        const gp = P(t, mid('t4', 0.72), 1.4, easeIn);
        op(goat, t > mid('t4', 0.7) ? 1 : 0);
        const gx = lerp(0.1, 1.9, gp), gy = -2 * gx + 4;
        tr(goat, 640 + c4ax.px(gx) + 14, 300 + c4ax.py(gy) - 22, 1, 0); tr(goatIn, 0, 0, 1, gp * 720);
      } else if (cw === 'priya') {
        show(priya, 320, 560, 1.4, { talk: talk(t, 'priya'), mood: t > mid('t5', 0.6) ? 'smug' : 'neutral', look: 0.4 });
        fadeIn(c5a, t, at('t5') + 0.1);
        c5w.set(0); c5w.show(0, P(t, mid('t5', 0.4), 0.3, linear)); c5w.show(1, P(t, mid('t5', 0.6), 0.3, linear));
        c5w.ring(1, P(t, mid('t5', 0.75), 0.3, linear));
        fadeIn(c5no, t, mid('t5', 0.8)); c5no.set(P(t, mid('t5', 0.88), 0.3, linear));
      } else if (cw === 'dad') {
        show(dad, 320, 560, 1.4, { talk: talk(t, 'dad'), mood: t > mid('t6', 0.8) ? 'smug' : 'neutral', look: t > mid('t6', 0.8) ? 1 : 0.4, lift: 0 });
        fadeIn(c6a, t, at('t6') + 0.1); fadeIn(c6m, t, mid('t6', 0.3)); fadeIn(c6r, t, mid('t6', 0.55));
        fadeIn(c6no, t, mid('t6', 0.8)); c6no.set(P(t, mid('t6', 0.88), 0.3, linear));
      }
    } else if (sh === 'R') {
      op(logoTri, 0.6 + 0.4 * Math.sin(t * 1.5) * AMP);
      const lp = P(t, at('return') + 0.05, 0.6, pop);
      op(logo, clamp(lp * 2.5)); tr(logo, 600, 236, Math.max(0.01, 0.5 + 0.5 * lp));
      op(rSub, P(t, mid('return', 0.45), 0.4, linear));
    } else {
      /* ---------- the stinger: 8 p.m., home ---------- */
      flat.clock(8, 0);
      popIn(cEight, t, at('eight') + 0.1, 600, 260);
      const flip = P(t, mid('graph', 0.12), 0.5, easeOut), fainted = t >= at('faint');
      const who = scWho(S, t);
      // the family on the sofa, sunburnt and tired
      show(kav, 130, 470, 1.0, { talk: talk(t, 'kavya'), mood: t >= at('six') ? 'shock' : t >= at('graph') ? 'neutral' : 'deadpan', look: t >= at('graph') ? 0.9 : 0.5, sweat: t < at('plan') ? 0.3 : 0 });
      show(mum, 290, 474, 0.98, { talk: talk(t, 'mum'), mood: t >= at('six') ? 'shock' : 'deadpan', look: t >= at('graph') ? 0.9 : 0.7, sweat: t >= at('six') ? 0.8 : 0, lift: 0 });
      show(dad, 455, 470, 1.0, { talk: talk(t, 'dad'), mood: t >= at('six') ? 'shock' : t >= at('plan') ? 'smug' : 'deadpan', look: t >= at('graph') ? 0.9 : 0.8, lift: t >= at('plan') && t < at('graph') ? 1 : 0 });
      show(boy, 595, 500, 0.95, { talk: talk(t, 'boy'), mood: 'happy', look: t >= at('six') && t < at('faint') ? -0.7 : 0.6, lift: t >= at('graph') && t < mid('graph', 0.5) ? 1 : 0 });
      op(chart.line, t >= at('plan') && t < at('graph') ? 0.6 + 0.4 * Math.sin(t * 6) : 1);
      // Ah Boy flips the page
      if (t >= mid('graph', 0.12)) {
        op(page, 1); pageIn.setAttribute('transform', `scale(1 ${Math.max(0.01, flip).toFixed(3)})`);
        mkDraw(page.vline, P(t, mid('graph', 0.5), 0.6, ease));
        page.dots.forEach((d, i) => op(d, P(t, mid('graph', 0.55) + i * 0.18, 0.2, linear)));
      }
      cSix.set(t >= at('six') ? P(t, at('six') + 0.05, 0.3, linear) : 0); tr(cSix, 290, 250);
      // Lionel swings vertical on Ah Boy's line, trembles, topples over flat onto the ledge
      if (fainted) {
        const ap = P(t, at('faint') - 0.1, 0.35, pop);
        const top = P(t, mid('faint', 0.8), 1.5, easeIn);
        const x = lerp(page.x3, 860, top), y = lerp((page.yTop + page.yBot) / 2, 428, top);
        const shake = top < 0.02 ? Math.sin(t * 40) * 3 * AMP : 0;
        show(lio, x, y, Math.max(0.01, 0.5 * ap), { talk: talk(t, 'lionel'), mood: top > 0.95 ? 'deadpan' : 'shock', look: 0, still: true,
          tilt: 90 * (1 - top) + shake, sweat: top < 0.5 ? 0.9 : 0, sleep: P(t, mid('faint', 0.8) + 1.6, 0.6, linear) });
      }
    }
  };
});
