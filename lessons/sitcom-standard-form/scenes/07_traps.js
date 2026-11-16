/* Scene 7: The lift saves you some marks.
   Shots: "6 EXAM TRAPS" over the dimmed lift, the six trap-givers lined up with numbered badges -> six snappy
   confessionals, one trap card each (Dad: count places, not zeros: 45 000 = 4.5 × 10⁴, not 4.5 × 10³; Norm:
   24 × 10⁸ is not on the list: 2.4 × 10⁹; Ah Boy with Spotty's jar: tiny → minus: 0.003 = 3 × 10⁻³; E: don't copy
   2.4E-08, write 2.4 × 10⁻⁸; Auntie Rose on a video call: adding, don't add the powers: 2 × 10³ + 3 × 10³ = 5 × 10³;
   Nought, badge on: keep the place-holder zeros: 3.08 × 10⁻⁵ = 0.000 030 8, not 0.000 308) -> logo "MIND THE ZEROS
   will return" -> stinger: Monday, 8 a.m., the lift is fixed (display 12, lights bright), Dad alone with his
   briefcase presses G -> 11, ding, Mr Tan steps in -> 11 → 10 → CLUNK, lights dim, Dad's smile freezes -> the
   Index pops up at the superscript spot -> Big Ten rises behind them: "Make yourselves comfortable." Final hold. */
scene('traps', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;
  const talk = (t, who) => scTalk(S, t, who);

  /* ---------- helpers ---------- */
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 3, color: o.color || C.ink, weight: 700 }); };
  const outline = (el, col, w) => { el.setAttribute('stroke', col); el.setAttribute('stroke-width', w); el.setAttribute('paint-order', 'stroke'); el.setAttribute('stroke-linejoin', 'round'); return el; };
  const segDots = (g, str) => { g.querySelectorAll('circle').forEach(c => c.removeAttribute('opacity')); if (g.set) g.set(str); };   // sfSeg points: see 05_compare.js
  const GOLD = '#FFE45C', AMBER = SF.amber, INK = MK.ink, GREEN = '#1E7A4A', RED = '#C62828', GREY = '#5A6670';
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
  function trNo(parent, x, y, s, o) {      // a crossed-out line: g.set(p) draws the strike
    const g = G(parent), m = mkText(g, x, y, s, Object.assign({ size: 34, anchor: 'middle', fill: RED }, o || {}));
    const sl = strike(g, x - m.w / 2 - 10, y - 12, x + m.w / 2 + 10, RED);
    g.set = p => sl.set(p);
    return g;
  }

  /* ---------- layers ---------- */
  const cam = G(root);
  const Lbg = G(cam), Lcast = G(cam), Lfront = G(cam), Lrail = G(cam), Lfg = G(cam), Lhud = G(root);

  /* ---------- sets ---------- */
  const liftShot = G(Lbg);
  const lift = sfLift(liftShot);
  const frontWrap = G(Lfront);
  frontWrap.appendChild(lift.front); frontWrap.appendChild(lift.top);
  const dimR = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#06101A', opacity: 0.6 }, liftShot);
  const conf = sfConf(Lbg, 'dad');
  const TINT = {}; for (const k in SF_TINT) TINT[k] = linGrad(SF_TINT[k][0], SF_TINT[k][1], true);
  const logoBg = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#14161C', '#2E2A20', true) }, logoBg);
  let rays = '';
  for (let i = 0; i < 16; i++) { const a0 = i / 16 * TAU, a1 = a0 + TAU / 40; rays += `M0,0 L${(Math.cos(a0) * 1100).toFixed(0)},${(Math.sin(a0) * 1100).toFixed(0)} L${(Math.cos(a1) * 1100).toFixed(0)},${(Math.sin(a1) * 1100).toFixed(0)} Z `; }
  const rayP = E('path', { d: rays, fill: AMBER, opacity: 0.07 }, logoBg);
  const bigSeg = sfSeg(logoBg, '10', { h: 420, dim: 'rgba(255,176,32,0.04)', col: 'rgba(255,176,32,0.10)', anchor: 'middle' }); tr(bigSeg, 600, 300);
  E('ellipse', { cx: 600, cy: 610, rx: 620, ry: 170, fill: glow('#FFB020'), opacity: 0.3 }, logoBg);

  /* ===== intro: 6 EXAM TRAPS ===== */
  const sI = G(Lhud);
  const iHead = outline(T(sI, 600, 210, '6 EXAM TRAPS', { size: 80, weight: 800, anchor: 'middle', fill: GOLD, ls: 3 }), '#5A3A07', 10);
  const iSub = T(sI, 600, 270, 'the lift saves you some marks', { size: 36, weight: 600, anchor: 'middle', fill: C.ink });
  const ROWX = [150, 330, 510, 690, 870, 1050];
  const badges = ROWX.map((x, k) => { const g = G(sI); E('circle', { r: 26, fill: GOLD, stroke: SC_INK, 'stroke-width': 4 }, g); T(g, 0, 11, String(k + 1), { size: 30, weight: 800, anchor: 'middle', fill: SC_INK }); return g; });

  /* ===== trap cards ===== */
  // 1 Dad: count places, not zeros
  const c1 = trCard(Lfg, 1);
  const c1a = txt(c1, 262, 'Count **places**, not zeros', { size: 38, boldFill: '#1F3A93' });
  const c1b = txt(c1, 350, '{{"45 000" = 4.5 * 10^4}}', { size: 48, fill: GREEN, weight: 800 });
  const c1c = txt(c1, 420, 'the point hops **4** places', { size: 30, fill: GREY });
  const c1d = trNo(c1, CX, 500, '{{4.5 * 10^3}}', { size: 44 });
  const c1e = txt(c1, 560, '({{4.5 * 10^3}} is only {{4500}})', { size: 28, fill: GREY });
  // 2 Norm: A must be 1 to under 10
  const c2 = trCard(Lfg, 2);
  const c2a = txt(c2, 262, '**A** must be {{1 <= A < 10}}', { size: 38, boldFill: RED });
  const c2b = txt(c2, 340, '{{24 * 10^8}}', { size: 48, fill: '#E8641E', weight: 800 });
  const c2st = sfStamp(c2, 'list');
  const c2c = txt(c2, 474, '{{24 = 2.4 * 10^1}}', { size: 32, fill: GREY });
  const c2d = txt(c2, 540, '{{24 * 10^8 = 2.4 * 10^9}}', { size: 42, fill: GREEN, weight: 800 });
  // 3 Ah Boy: tiny → minus
  const c3 = trCard(Lfg, 3);
  const c3a = txt(c3, 262, '**tiny** → **minus** power', { size: 40, boldFill: RED });
  const c3b = txt(c3, 350, '{{0.003 = 3 * 10^(-3)}}', { size: 48, fill: GREEN, weight: 800 });
  const c3c = trNo(c3, CX, 440, '{{3 * 10^3 = 3000}} (big!)', { size: 36 });
  const c3d = txt(c3, 530, 'check: {{3 * 0.001 = 0.003}}', { size: 30, fill: GREY });
  const jar = sfJar(Lfg, 1.0);
  // 4 E: don't copy the screen
  const c4 = trCard(Lfg, 4);
  const c4a = txt(c4, 262, "**Don't** copy the screen", { size: 38, boldFill: RED });
  const c4lcd = G(c4);
  E('rect', { x: CX - 150, y: 290, width: 300, height: 76, rx: 12, fill: '#3A4A58', stroke: INK, 'stroke-width': 3 }, c4lcd);
  E('rect', { x: CX - 140, y: 299, width: 280, height: 58, rx: 6, fill: SF.lcd, stroke: '#1E2A22', 'stroke-width': 2 }, c4lcd);
  const c4seg = sfSeg(c4lcd, '2.4E-08', { h: 40, col: SF.lcdInk, dim: 'rgba(30,42,30,0.06)', max: 6, anchor: 'middle' }); tr(c4seg, CX, 328);
  segDots(c4seg, '2.4E-08');
  const c4b = txt(c4, 440, 'write {{2.4 * 10^(-8)}}', { size: 46, fill: GREEN, weight: 800 });
  const c4c = trNo(c4, CX - 125, 530, '{{"2.4E-08"}}', { size: 36 });
  const c4d = trNo(c4, CX + 125, 530, '{{2.4^(-8)}}', { size: 36 });
  // 5 Auntie Rose: adding, don't add the powers
  const c5 = trCard(Lfg, 5);
  const c5a = txt(c5, 262, "Adding? **Don't** add the powers", { size: 36, boldFill: RED });
  const c5b = txt(c5, 345, '{{2 * 10^3 + 3 * 10^3 = 5 * 10^3}}', { size: 38, fill: GREEN, weight: 800 });
  const c5c = txt(c5, 415, '{{2000 + 3000 = 5000}}', { size: 32, fill: GREY });
  const c5d = trNo(c5, CX, 495, '{{5 * 10^6}}', { size: 44 });
  const c5e = txt(c5, 556, '({{5 * 10^6}} is {{"5 000 000"}})', { size: 28, fill: GREY });
  const callG = G(Lfg);
  const call = sfRoseCall(callG, 460, 320);
  // 6 Nought: keep the place-holder zeros
  const c6 = trCard(Lfg, 6);
  const c6a = txt(c6, 262, 'Keep the **place-holder zeros**', { size: 36, boldFill: '#B8862E' });
  const c6b = txt(c6, 332, '{{3.08 * 10^(-5) =}}', { size: 40 });
  const c6t = G(c6);
  const TW = 50, TP = 56, digs = '00000308';
  const tx0 = CX - (8 * TP + 14) / 2 + TW / 2 + 3;
  let glowZ = null;
  digs.split('').forEach((ch, i) => {
    const x = tx0 + i * TP + (i >= 1 ? 14 : 0), hold = ch === '0' && i > 0;
    if (i === 4) glowZ = E('rect', { x: x - TW / 2 - 6, y: 366, width: TW + 12, height: 76, rx: 12, fill: GOLD, stroke: '#FFB020', 'stroke-width': 5 }, c6t);
    E('rect', { x: x - TW / 2, y: 372, width: TW, height: 64, rx: 8, fill: hold ? SF.holder : i === 0 ? '#EEF2F6' : SF.tile, stroke: hold ? SF.holderInk : INK, 'stroke-width': hold ? 3 : 2 }, c6t);
    T(c6t, x, 418, ch, { size: 38, weight: 800, anchor: 'middle', fill: hold ? SF.holderInk : INK });
  });
  E('circle', { cx: tx0 + TW / 2 + 10, cy: 430, r: 6, fill: '#E8424F' }, c6t);   // the decimal point
  const c6d = trNo(c6, CX, 505, '{{"0.000 308"}}', { size: 40 });
  const c6e = txt(c6, 562, 'drop a zero: **× 10** too big', { size: 28, fill: RED, boldFill: RED });

  /* ===== logo ===== */
  const sR = G(Lhud);
  const logo = G(sR);
  outline(T(logo, 0, -78, 'MIND THE', { size: 60, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 8 }), '#1A1206', 12);
  outline(T(logo, 0, 26, 'ZEROS', { size: 132, weight: 800, anchor: 'middle', fill: AMBER, ls: 6 }), '#1A1206', 14);
  const rSub = T(sR, 600, 450, 'will return', { size: 46, weight: 600, anchor: 'middle', fill: '#FFFFFF' });

  /* ===== stinger ===== */
  const sW = G(Lfg);
  const cMon = pill(sW, 'Monday, 8 a.m.', { size: 32, color: GOLD, stroke: GOLD });
  const cFixed = pill(sW, 'lift: FIXED', { size: 28, color: '#B9F0C8', stroke: '#B9F0C8' });
  const cG = pill(sW, '▼ to G', { size: 30, color: AMBER, stroke: AMBER });
  const cDing = pill(sW, 'ding! doors open', { size: 28, color: '#B9F0C8', stroke: '#B9F0C8' });
  const clunk = outline(T(sW, 0, 0, 'CLUNK!', { size: 110, weight: 800, anchor: 'middle', fill: '#FF8A3D' }), '#3A1A00', 12);
  const c10n = mkChip(sW, '{{10^n}}', { size: 40, col: GOLD });
  const brief = G(Lrail);
  E('rect', { x: -58, y: -66, width: 116, height: 70, rx: 10, fill: '#6B4423', stroke: SC_INK, 'stroke-width': 4 }, brief);
  E('path', { d: 'M-20,-66 L-20,-82 L20,-82 L20,-66', fill: 'none', stroke: SC_INK, 'stroke-width': 6 }, brief);
  E('rect', { x: -8, y: -44, width: 16, height: 12, rx: 2, fill: '#E2B33C' }, brief);

  /* ---------- the cast ---------- */
  const ten = cast(Lcast, 'ten');                         // drawn first: behind the humans
  const dad = cast(Lcast, 'dad', { prop: null, hand: true });
  const tan = cast(Lcast, 'tan');
  const boy = cast(Lcast, 'boy');
  const norm = cast(Lcast, 'norm');
  const ee = cast(Lcast, 'e');
  const nought = cast(Lcast, 'nought');
  const idx = cast(Lfg, 'index', { val: 'n' });
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* ---------- shots ---------- */
  const cut = id => at(id) - 0.06;
  const SHOTS = [['I', -9], ['1', cut('t1')], ['2', cut('t2')], ['3', cut('t3')], ['4', cut('t4')], ['5', cut('t5')], ['6', cut('t6')],
    ['R', cut('return')], ['W', cut('monday')]];
  const shotAt = t => { let s = 'I'; for (const [k, t0] of SHOTS) if (t >= t0) s = k; return s; };
  const CARDS = { 1: c1, 2: c2, 3: c3, 4: c4, 5: c5, 6: c6 };
  const CONF = { 1: 'dad', 2: 'norm', 3: 'boy', 4: 'e', 5: 'rose', 6: 'nought' };
  const DX = 400, TX = 800, LS = 0.84, LY = 520;           // stinger: Dad and Mr Tan in the lift
  const TENX = 600, TENY = 270, TENS = 0.92;
  const tG = mid('ground', 0.35), t11 = mid('ground', 0.55), tTanIn = mid('ground', 0.65);
  const t10 = mid('again', 0.55), tClunk = mid('again', 0.8);

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const sh = shotAt(t);
    const liftOn = sh === 'I' || sh === 'W' ? 1 : 0;
    op(liftShot, liftOn); op(frontWrap, liftOn); op(dimR, sh === 'I' ? 1 : 0);
    op(logoBg, sh === 'R' ? 1 : 0); op(sI, sh === 'I' ? 1 : 0); op(sR, sh === 'R' ? 1 : 0); op(sW, sh === 'W' ? 1 : 0);
    for (const k in CARDS) op(CARDS[k], sh === k ? 1 : 0);
    const cw = CONF[sh];
    conf.set(cw ? 1 : 0, t); if (cw) conf.firstChild.setAttribute('fill', TINT[cw]);
    [ten, dad, tan, boy, norm, ee, nought, idx, callG, jar, brief].forEach(e => op(e, 0));
    tr(cam, 0, 0);
    const show = (c, x, y, s, st) => { op(c, 1); tr(c, x, y, s); c.set(Object.assign({ t }, st)); };

    if (sh === 'I') {
      lift.dim(1); lift.upd(t); lift.lights(12); lift.disp.set('10');
      const hp = P(t, at('intro') + 0.05, 0.45, pop);
      op(iHead, clamp(hp * 2.5)); iHead.setAttribute('transform', `translate(600 186) scale(${Math.max(0.01, 0.6 + 0.4 * hp).toFixed(3)}) translate(-600 -186)`);
      op(iSub, P(t, mid('intro', 0.25), 0.4, linear));
      const ROW = [[dad, 0.72, 470, { mood: 'smug', lift: 0 }], [norm, 0.52, 470, { mood: 'deadpan' }], [boy, 0.78, 478, { mood: 'happy', lift: 0 }],
        [ee, 0.85, 460, { mood: 'happy' }], [callG, 0.4, 455, null], [nought, 0.85, 460, { mood: 'happy', badge: 1 }]];
      ROW.forEach(([c, s, y, st], i) => {
        const p = P(t, mid('intro', 0.35) + i * 0.13, 0.45, pop);
        op(c, clamp(p * 3)); tr(c, ROWX[i], y + 40 * (1 - clamp(p)), Math.max(0.01, s * (0.7 + 0.3 * p)));
        if (st) c.set(Object.assign({ t, look: 0 }, st));
        else call.rose.set({ t, mood: 'happy', look: 0 });
        popIn(badges[i], t, mid('intro', 0.42) + i * 0.13, ROWX[i], 655);
      });
    } else if (cw) {
      if (cw === 'dad') {
        show(dad, 330, 560, 1.45, { talk: talk(t, 'dad'), mood: t > mid('t1', 0.72) ? 'sad' : 'neutral', look: 0.4, lift: 0 });
        fadeIn(c1a, t, at('t1') + 0.1); fadeIn(c1b, t, mid('t1', 0.3)); fadeIn(c1c, t, mid('t1', 0.45));
        fadeIn(c1d, t, mid('t1', 0.58)); c1d.set(P(t, mid('t1', 0.64), 0.3, linear)); fadeIn(c1e, t, mid('t1', 0.72));
      } else if (cw === 'norm') {
        const st = mid('t2', 0.3);
        show(norm, 320, 470, 1.15, { talk: talk(t, 'norm'), mood: 'deadpan', look: 0.4, stop: t > st && t < mid('t2', 0.6) ? 1 : 0, list: t < st ? 1 : 0 });
        fadeIn(c2a, t, at('t2') + 0.1); fadeIn(c2b, t, mid('t2', 0.12));
        c2st.set(P(t, st, 0.35, linear)); tr(c2st, CX, 392, 0.38);
        fadeIn(c2c, t, mid('t2', 0.6)); fadeIn(c2d, t, mid('t2', 0.72));
      } else if (cw === 'boy') {
        show(boy, 310, 548, 1.5, { talk: talk(t, 'boy'), mood: 'happy', look: 0.3, lift: t > mid('t3', 0.1) ? 1 : 0 });
        op(jar, 1); tr(jar, 140, 600 - 30 * P(t, mid('t3', 0.1), 0.4, ease), 1.0, 3 * Math.sin(t * 6) * AMP);
        fadeIn(c3a, t, at('t3') + 0.1); fadeIn(c3b, t, mid('t3', 0.35)); fadeIn(c3c, t, mid('t3', 0.6)); c3c.set(P(t, mid('t3', 0.68), 0.3, linear));
        fadeIn(c3d, t, mid('t3', 0.8));
      } else if (cw === 'e') {
        show(ee, 320, 420, 1.6, { talk: talk(t, 'e'), mood: 'happy', look: 0.4 });
        fadeIn(c4a, t, at('t4') + 0.05); fadeIn(c4lcd, t, mid('t4', 0.15));
        fadeIn(c4b, t, mid('t4', 0.45));
        fadeIn(c4c, t, mid('t4', 0.65)); c4c.set(P(t, mid('t4', 0.7), 0.25, linear));
        fadeIn(c4d, t, mid('t4', 0.75)); c4d.set(P(t, mid('t4', 0.8), 0.25, linear));
      } else if (cw === 'rose') {
        op(callG, 1);
        const cp = P(t, cut('t5'), 0.3, easeOut);
        tr(callG, 310, 380 + 20 * (1 - cp));
        call.rose.set({ t, talk: talk(t, 'rose'), mood: t > mid('t5', 0.6) ? 'annoyed' : 'happy', look: 0.3 });
        fadeIn(c5a, t, at('t5') + 0.05); fadeIn(c5b, t, mid('t5', 0.3)); fadeIn(c5c, t, mid('t5', 0.5));
        fadeIn(c5d, t, mid('t5', 0.65)); c5d.set(P(t, mid('t5', 0.72), 0.3, linear)); fadeIn(c5e, t, mid('t5', 0.8));
      } else if (cw === 'nought') {
        const proud = t > mid('t6', 0.75);
        show(nought, 320, 420 - (proud ? 10 * Math.abs(Math.sin(t * 6)) * AMP : 0), 1.6, { talk: talk(t, 'nought'), mood: 'happy', look: 0.4, badge: 1, wave: proud ? 1 : 0 });
        fadeIn(c6a, t, at('t6') + 0.05); fadeIn(c6b, t, mid('t6', 0.12)); fadeIn(c6t, t, mid('t6', 0.2));
        op(glowZ, P(t, mid('t6', 0.4), 0.3, linear) * (0.6 + 0.4 * wave(t, 0.6)));
        fadeIn(c6d, t, mid('t6', 0.5)); c6d.set(P(t, mid('t6', 0.56), 0.3, linear)); fadeIn(c6e, t, mid('t6', 0.62));
      }
    } else if (sh === 'R') {
      tr(rayP, 600, 600, 1, (t * 6 * AMP) % 360);
      popIn(logo, t, at('return') + 0.05, 600, 270);
      op(rSub, P(t, mid('return', 0.45), 0.4, linear));
    } else {
      /* ---------- the stinger ---------- */
      const stuck = t > tClunk;
      lift.dim(stuck ? 1 : 0); lift.upd(t); lift.lights(0);
      lift.press(11, t > tG && t < t10 ? 1 : 0);
      lift.disp.set(t < t11 ? '12' : t < t10 ? '11' : '10');
      lift.alarm(0);
      const j = stuck ? Math.exp(-(t - tClunk) * 7) : 0;
      tr(cam, 0, Math.sin(t * 70) * 10 * j * AMP);
      if (t < at('again')) popIn(cMon, t, at('monday') + 0.05, 860, 150); else op(cMon, 1 - P(t, at('again'), 0.2, linear));
      if (t < at('ground')) popIn(cFixed, t, mid('monday', 0.5), 860, 220); else op(cFixed, 0);
      if (t > tG && t < t10) popIn(cG, t, tG, 880, 230); else op(cG, 0);
      if (t > tTanIn - 0.2 && t < at('again')) popIn(cDing, t, tTanIn - 0.2, 880, 300); else op(cDing, 0);
      op(clunk, stuck && t < tClunk + 1.1 ? 1 - P(t, tClunk + 0.7, 0.4, linear) : 0);
      tr(clunk, 600, 220, 0.7 + 0.3 * P(t, tClunk, 0.25, pop), -4);
      // Dad, with his briefcase on the rail
      op(brief, 1); tr(brief, DX + 120, 596);
      let dm = 'happy', dl = 0.3;
      if (t >= at('ground')) dm = 'smug';
      if (t > tTanIn) dl = 0.8;
      if (t >= at('again')) { dm = 'smug'; dl = 0.8; }
      if (t > t10) { dm = 'deadpan'; dl = 0.4; }
      if (stuck) { dm = 'shock'; dl = 0; }
      if (t > end('again') + 0.1) { dm = 'deadpan'; dl = t > at('comfy') ? 0 : 0.4; }
      show(dad, DX, LY, LS, { talk: talk(t, 'dad'), mood: dm, look: dl, lift: t > tG - 0.3 && t < tG + 0.6 ? 1 : 0 });
      // Mr Tan steps in from the right
      if (t > tTanIn) {
        const tp = P(t, tTanIn, 0.6, easeOut);
        show(tan, lerp(1240, TX, tp), LY + 6 * Math.abs(Math.sin(t * 9)) * (tp < 1 ? 1 : 0), LS,
          { talk: talk(t, 'tan'), mood: stuck ? (t > tClunk + 0.4 ? 'happy' : 'shock') : 'happy', look: t > at('comfy') ? 0 : stuck ? -0.3 : -0.6, lift: t >= at('again') && t < t10 + 0.3 ? 1 : 0 });
      }
      // the Index pops up at the superscript spot; Big Ten rises beneath him
      const per = sfPerch(TENX, TENY, TENS);
      if (t >= at('welcome') - 0.15) {
        const ip = P(t, at('welcome') - 0.15, 0.45, pop);
        op(idx, clamp(ip * 3)); tr(idx, per[0], per[1], Math.max(0.01, per[2] * ip));
        idx.set({ t, talk: talk(t, 'index'), mood: 'smug', look: -0.3, val: 'n', point: t > mid('welcome', 0.3) && t < at('comfy') ? 1 : 0 });
        if (t < at('comfy')) popIn(c10n, t, mid('welcome', 0.3), 860, 160); else c10n.set(1 - P(t, at('comfy'), 0.2, linear));
      } else c10n.set(0);
      if (t >= at('comfy') - 0.3) {
        const rp = P(t, at('comfy') - 0.3, 0.7, easeOut);
        op(ten, 1); tr(ten, TENX, lerp(TENY + 260, TENY, rp), TENS);
        ten.set({ t, talk: talk(t, 'ten'), mood: 'deadpan', look: 0, glow: 0.9 });
      }
    }
  };
});
