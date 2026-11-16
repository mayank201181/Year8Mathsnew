/* Scene 8: The fair saves you some marks.
   Shots: "6 EXAM TRAPS" over the fair's welcome stall, the six of them lined up with numbers -> six snappy
   confessionals, one trap card each (Dee: A = pi r^2 needs the radius, pi x 20^2 is 4 times too big; Ah Boy: square
   r first, pi r^2 is not (pi r)^2, Dad's calculator says SORRY; Perry: semicircle, quarter, sector: add the straight
   edges; Rad: C / pi = d, r = C / 2 pi; Dad: round once at the end, pi is not 3, "Close enough!" crossed out;
   Mr Tan: cm^2 for area, cm for length, "in terms of pi" keeps the pi) -> logo "EASY AS PI will return" ->
   stinger: 9 p.m., the empty hall, chairs stacked; Uncle Pi alone on the stage, still talking (ticker to 60);
   Mr Tan at the door with his keys: "Pies are round!"; Uncle Pi laughs (ticker to 68) as the lights go down to a
   single spotlight. */
scene('traps', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;
  const talk = (t, who) => scTalk(S, t, who);
  const home = (c, layer) => { if (c.parentNode !== layer) layer.appendChild(c); };

  /* ---------- helpers ---------- */
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 3, color: o.color || C.ink, weight: 700 }); };
  const outline = (el, col, w) => { el.setAttribute('stroke', col); el.setAttribute('stroke-width', w); el.setAttribute('paint-order', 'stroke'); el.setAttribute('stroke-linejoin', 'round'); return el; };
  const GOLD = '#FFE45C', INK = MK.ink, GREEN = '#1E9E5A', RED = '#C62828', BLUE = '#2E5AAC', BERRY = '#B8336A', ORANGE = '#E8751A';
  const CX = 880;
  function trCard(parent, n) {
    const g = G(parent);
    E('rect', { x: 606, y: 136, width: 560, height: 470, rx: 18, fill: 'rgba(0,0,0,0.3)' }, g);
    E('rect', { x: 600, y: 130, width: 560, height: 470, rx: 18, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, g);
    const head = chip(g, 'TRAP ' + n, { size: 30, fill: '#D32F2F', color: '#FFFFFF', weight: 800 }); tr(head, CX, 182);
    return g;
  }
  const txt = (parent, y, s, o) => mkText(parent, CX, y, s, Object.assign({ size: 34, anchor: 'middle', fill: INK, weight: 700 }, o || {}));
  const fadeIn = (el, t, t0) => { const p = P(t, t0, 0.3, easeOut); op(el, p); tr(el, 0, 10 * (1 - p)); };
  function trNo(parent, y, s, o) {
    const g = G(parent), m = txt(g, y, s, Object.assign({ fill: RED }, o || {}));
    const sl = strike(g, CX - m.w / 2 - 10, y - 12, CX + m.w / 2 + 10, RED);
    g.set = p => sl.set(p);
    return g;
  }

  /* ---------- layers ---------- */
  const Lbg = G(root), Lcast = G(root), Lfront = G(root), Lfg = G(root), Lhud = G(root), Ldark = G(root), Ltop = G(root);

  /* ---------- sets ---------- */
  const stallShot = G(Lbg);
  const stall = ciStall(stallShot, { title: 'PI DAY FAIR', col: '#2E5AAC', sub: 'exam corner' });
  Lfront.appendChild(stall.front); Lfront.appendChild(stall.top);
  const dim = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#06110F', opacity: 0.5 }, stallShot);
  const conf = ciConf(Lbg, 'dee');
  const TINT = {}; for (const k in CI_TINT) TINT[k] = linGrad(CI_TINT[k][0], CI_TINT[k][1], true);
  const logoBg = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#0E2A5A', '#2E5AAC', true) }, logoBg);
  let rays = '';
  for (let i = 0; i < 16; i++) { const a0 = i / 16 * TAU, a1 = a0 + TAU / 40; rays += `M0,0 L${(Math.cos(a0) * 1100).toFixed(0)},${(Math.sin(a0) * 1100).toFixed(0)} L${(Math.cos(a1) * 1100).toFixed(0)},${(Math.sin(a1) * 1100).toFixed(0)} Z `; }
  const rayP = E('path', { d: rays, fill: GOLD, opacity: 0.07 }, logoBg);
  E('ellipse', { cx: 600, cy: 610, rx: 600, ry: 160, fill: glow('#6EC8FF'), opacity: 0.35 }, logoBg);
  // the hall at night
  const hallShot = G(Lbg);
  const hall = ciHall(hallShot);
  const chairs = G(hallShot);
  [[150, 650], [260, 660], [940, 660], [1050, 650]].forEach(([x, y], k) => {
    const st = G(chairs); tr(st, x, y);
    let legs = '', seats = '';
    for (let i = 0; i < 5 - (k % 2); i++) {
      const yy = -i * 22;
      legs += `M-34,${yy} L-30,${yy - 60} M34,${yy} L30,${yy - 60} `;
      seats += `M-40,${yy - 66} h80 v14 h-80 Z `;
    }
    E('path', { d: legs, stroke: '#3A4A58', 'stroke-width': 5 }, st);
    E('path', { d: seats, fill: '#C62828', stroke: SC_INK, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, st);
  });
  const night = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#0A1430', opacity: 0.62 }, hallShot);
  const beam = E('path', { d: 'M560,0 L640,0 L760,430 L440,430 Z', fill: '#FFF2B0', opacity: 0.16 }, hallShot);
  const pool = E('ellipse', { cx: 600, cy: 405, rx: 170, ry: 26, fill: '#FFF2B0', opacity: 0.25 }, hallShot);
  // the lights go down: darkness everywhere except a spotlight on Uncle Pi
  const spotDark = E('path', { d: 'M0,0 L1200,0 L1200,750 L0,750 Z M600,280 m-190,0 a190,175 0 1 0 380,0 a190,175 0 1 0 -380,0 Z', fill: '#02050C', 'fill-rule': 'evenodd' }, Ldark);

  /* ===== intro: 6 EXAM TRAPS ===== */
  const sI = G(Lhud);
  const iHead = outline(T(sI, 600, 262, '6 EXAM TRAPS', { size: 80, weight: 800, anchor: 'middle', fill: GOLD, ls: 3 }), '#0E2A5A', 10);
  const iSub = outline(T(sI, 600, 318, 'the fair saves you some marks', { size: 34, weight: 600, anchor: 'middle', fill: '#FFFFFF' }), '#0E2A5A', 6);
  const ROWX = [150, 330, 510, 690, 870, 1050];
  const badges = ROWX.map((x, k) => { const g = G(sI); E('circle', { r: 26, fill: GOLD, stroke: SC_INK, 'stroke-width': 4 }, g); T(g, 0, 11, String(k + 1), { size: 30, weight: 800, anchor: 'middle', fill: SC_INK }); return g; });

  /* ===== trap cards ===== */
  // 1 Dee
  const c1 = trCard(Lfg, 1);
  const c1a = txt(c1, 260, '{{A = πr^2}} needs the **radius**', { size: 36, boldFill: BLUE });
  const c1b = txt(c1, 336, '{{d = 20}}  →  {{r = 10}}', { size: 38, fill: BLUE });
  const c1c = trNo(c1, 414, '{{π × 20^2 ≈ 1257}}', { size: 38 });
  const c1d = txt(c1, 466, '4 times too big', { size: 28, fill: RED });
  const c1e = txt(c1, 532, '{{π × 10^2 ≈ 314}} ✓', { size: 40, fill: GREEN });
  const c1f = txt(c1, 580, '**cut me in half first**', { size: 30, boldFill: BLUE, fill: BLUE });
  // 2 Ah Boy
  const c2 = trCard(Lfg, 2);
  const c2a = txt(c2, 260, 'square **r** first, then {{× π}}', { size: 36, boldFill: BERRY });
  const c2b = txt(c2, 340, '{{πr^2 ≠ (πr)^2}}', { size: 48, fill: BLUE });
  const c2c = txt(c2, 430, '{{r = 10}}:  {{π × 10^2 ≈ 314}} ✓', { size: 36, fill: GREEN });
  const c2d = trNo(c2, 520, '{{(π × 10)^2 ≈ 987}}', { size: 38 });
  const calc = mkCalculator(Lfg, { text: '987' });
  // 3 Perry
  const c3 = trCard(Lfg, 3);
  const c3a = txt(c3, 256, 'semicircle, quarter or sector?', { size: 32 });
  const c3s = G(c3);
  { const curve = (d) => E('path', { d, fill: 'none', stroke: '#2E7DD8', 'stroke-width': 7, 'stroke-linecap': 'round' }, c3s);
    const edge = (d) => E('path', { d, fill: 'none', stroke: '#E8424F', 'stroke-width': 8, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, c3s);
    const fill = (d) => E('path', { d, fill: '#F7C6D9', stroke: 'none' }, c3s);
    // semicircle, r 75, flat edge at y 420
    fill('M645,420 A75,75 0 0 1 795,420 Z'); curve('M645,420 A75,75 0 0 1 795,420'); edge('M645,420 L795,420');
    // quarter, r 100, corner (830, 420)
    fill('M830,420 L830,320 A100,100 0 0 1 930,420 Z'); curve('M830,320 A100,100 0 0 1 930,420'); edge('M930,420 L830,420 L830,320');
    // sector, 70 degrees, r 105, tip (1060, 420)
    const a = 35 * Math.PI / 180, sx = 105 * Math.sin(a), sy = 105 * Math.cos(a);
    fill(`M1060,420 L${(1060 - sx).toFixed(1)},${(420 - sy).toFixed(1)} A105,105 0 0 1 ${(1060 + sx).toFixed(1)},${(420 - sy).toFixed(1)} Z`);
    curve(`M${(1060 - sx).toFixed(1)},${(420 - sy).toFixed(1)} A105,105 0 0 1 ${(1060 + sx).toFixed(1)},${(420 - sy).toFixed(1)}`);
    edge(`M${(1060 - sx).toFixed(1)},${(420 - sy).toFixed(1)} L1060,420 L${(1060 + sx).toFixed(1)},${(420 - sy).toFixed(1)}`); }
  const c3l = G(c3);
  mkText(c3l, 720, 470, 'curve {{+ d}}', { size: 28, anchor: 'middle', fill: INK, weight: 700 });
  mkText(c3l, 880, 470, 'curve {{+ 2r}}', { size: 28, anchor: 'middle', fill: INK, weight: 700 });
  mkText(c3l, 1060, 470, 'arc {{+ 2r}}', { size: 28, anchor: 'middle', fill: INK, weight: 700 });
  const c3b = txt(c3, 552, '**+ add the straight edges**', { size: 36, boldFill: '#E8424F' });
  // 4 Rad
  const c4 = trCard(Lfg, 4);
  const c4a = txt(c4, 260, '{{C ÷ π}} gives the **diameter**', { size: 36, boldFill: BLUE });
  const c4b = txt(c4, 340, '{{d = C ÷ π}}', { size: 46, fill: BLUE });
  const c4c = txt(c4, 426, '{{r = C ÷ 2π}}', { size: 46, fill: ORANGE });
  const c4d = txt(c4, 492, 'to get **r**: cut it in half', { size: 30, boldFill: ORANGE });
  const c4e = txt(c4, 560, 'e.g. {{C = 40}}:  {{d ≈ 12.7}},  {{r ≈ 6.4}}', { size: 30, fill: '#5A4A52' });
  // 5 Dad
  const c5 = trCard(Lfg, 5);
  const c5a = txt(c5, 260, 'round **once**, at the **end**', { size: 38, boldFill: BERRY });
  const c5b = txt(c5, 342, '{{π ≠ 3}}', { size: 52, fill: RED });
  const c5c = txt(c5, 420, '{{π × 70 ≈ 219.9}} ✓', { size: 38, fill: GREEN });
  const c5d = trNo(c5, 488, '{{3 × 70 = 210}}', { size: 34 });
  const c5e = trNo(c5, 558, '"Close enough!"', { size: 34 });
  // 6 Mr Tan
  const c6 = trCard(Lfg, 6);
  const c6a = txt(c6, 262, 'area: **cm²**  ·  length: **cm**', { size: 38, boldFill: BLUE });
  const c6b = txt(c6, 346, '"**in terms of π**"', { size: 36, boldFill: BERRY });
  const c6c = txt(c6, 404, 'means **leave the π in**', { size: 34, boldFill: BERRY });
  const c6d = txt(c6, 480, '{{C = 9π}} cm', { size: 42, fill: BLUE });
  const c6e = txt(c6, 552, '{{A = 50π}} cm²', { size: 42, fill: BLUE });

  /* ===== logo ===== */
  const sR = G(Lhud);
  const logo = G(sR);
  const logo1 = outline(T(logo, -70, -40, 'EASY AS', { size: 70, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 6 }), '#0A1A3A', 12);
  const logo2 = outline(T(logo, -70, 70, 'PI', { size: 130, weight: 800, anchor: 'middle', fill: GOLD, ls: 6 }), '#0A1A3A', 12);
  const pie = G(logo); tr(pie, 200, 0);
  E('path', { d: `M0,0 L${(Math.cos(-0.5) * 92).toFixed(1)},${(Math.sin(-0.5) * 92).toFixed(1)} A92,92 0 1 1 ${(Math.cos(-1.3) * 92).toFixed(1)},${(Math.sin(-1.3) * 92).toFixed(1)} Z`, fill: CI_COL.crust, stroke: '#0A1A3A', 'stroke-width': 6, 'stroke-linejoin': 'round' }, pie);
  E('path', { d: `M0,0 L${(Math.cos(-0.5) * 76).toFixed(1)},${(Math.sin(-0.5) * 76).toFixed(1)} A76,76 0 1 1 ${(Math.cos(-1.3) * 76).toFixed(1)},${(Math.sin(-1.3) * 76).toFixed(1)} Z`, fill: '#F7C6D9' }, pie);
  T(pie, -6, 30, 'π', { size: 84, weight: 800, anchor: 'middle', fill: '#B8336A' });
  const slice = G(logo);
  E('path', { d: `M0,0 L${(Math.cos(-0.5) * 92).toFixed(1)},${(Math.sin(-0.5) * 92).toFixed(1)} A92,92 0 0 0 ${(Math.cos(-1.3) * 92).toFixed(1)},${(Math.sin(-1.3) * 92).toFixed(1)} Z`, fill: CI_COL.crust, stroke: '#0A1A3A', 'stroke-width': 6, 'stroke-linejoin': 'round' }, slice);
  const rSub = T(sR, 600, 470, 'will return', { size: 46, weight: 600, anchor: 'middle', fill: '#FFFFFF' });

  /* ===== stinger: 9 p.m. ===== */
  const sW = G(Lhud);
  const cNine = pill(sW, '9 p.m.', { size: 34, color: GOLD, stroke: GOLD });
  const cPies = mkChip(Ltop, 'Why {{πr^2}}? Pies are **round**!', { size: 32, col: GOLD, solid: true });

  /* ---------- the cast ---------- */
  const dee = cast(Lcast, 'dee'), boy = cast(Lcast, 'boy'), perry = cast(Lcast, 'perry'), rad = cast(Lcast, 'rad'),
    dad = cast(Lcast, 'dad', { prop: null }), tan = cast(Lcast, 'tan'), pi = cast(Lcast, 'pi');
  // Mr Tan's keys (in the stinger his stamp goes in his pocket)
  const stampG = tan.hand.lastChild;
  const keys = G(tan.hand);
  E('circle', { cx: 0, cy: -40, r: 16, fill: 'none', stroke: '#B9BEC4', 'stroke-width': 5 }, keys);
  E('path', { d: 'M-6,-54 L-20,-96 L-12,-98 L-10,-90 L-4,-92 M8,-54 L24,-90 L30,-84 L26,-80', fill: 'none', stroke: '#E2B33C', 'stroke-width': 6, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, keys);

  // Uncle Pi's ticker: 48 when the scene starts (after slice.laugh), 60 by the end of "still", 68 by the end of "laugh"
  const piDigits = t => {
    if (t < at('still')) return 48 + Math.max(0, t - at('night')) * 0.02;
    if (t < end('still')) return 48.1 + 11.9 * clamp((t - at('still')) / (end('still') - at('still')));
    if (t < mid('laugh', 0.45)) return 60 + (t - end('still')) * 0.02;
    if (t < end('laugh')) return 60.1 + 7.9 * clamp((t - mid('laugh', 0.45)) / (end('laugh') - mid('laugh', 0.45)));
    return 68 + (t - end('laugh')) * 0.4;
  };

  /* ---------- shots ---------- */
  const cut = id => at(id) - 0.06;
  const SHOTS = [['I', -9], ['1', cut('t1')], ['2', cut('t2')], ['3', cut('t3')], ['4', cut('t4')], ['5', cut('t5')], ['6', cut('t6')],
    ['R', cut('return')], ['W', cut('night')]];
  const shotAt = t => { let s = 'I'; for (const [k, t0] of SHOTS) if (t >= t0) s = k; return s; };
  const CARDS = { 1: c1, 2: c2, 3: c3, 4: c4, 5: c5, 6: c6 };
  const CONF = { 1: 'dee', 2: 'boy', 3: 'perry', 4: 'rad', 5: 'dad', 6: 'tan' };
  // the intro line-up: [character, mood, scale, y]
  const ROW = [[dee, 'smug', 0.5, 450], [boy, 'happy', 0.72, 466], [perry, 'neutral', 0.62, 440], [rad, 'happy', 0.68, 448], [dad, 'smug', 0.72, 456], [tan, 'happy', 0.72, 456]];

  return t => {
    const sh = shotAt(t), who = scWho(S, t);
    const stallOn = sh === 'I' ? 1 : 0;
    op(stallShot, stallOn); op(Lfront, stallOn); if (stallOn) stall.upd(t);
    op(logoBg, sh === 'R' ? 1 : 0); op(sI, stallOn); op(sR, sh === 'R' ? 1 : 0); op(sW, sh === 'W' ? 1 : 0); op(hallShot, sh === 'W' ? 1 : 0);
    for (const k in CARDS) op(CARDS[k], sh === k ? 1 : 0);
    const cw = CONF[sh];
    conf.set(cw ? 1 : 0, t); if (cw) conf.firstChild.setAttribute('fill', TINT[cw]);
    [dee, boy, perry, rad, dad, tan, pi, calc].forEach(e => op(e, 0));
    op(Ldark, 0); cPies.set(0);
    op(stampG, sh === 'W' ? 0 : 1); op(keys, sh === 'W' ? 1 : 0);
    const show = (c, x, y, s, st) => { op(c, 1); tr(c, x, y, s); c.set(Object.assign({ t }, st)); };
    const digits = piDigits(t);

    if (sh === 'I') {
      const hp = P(t, at('intro') + 0.05, 0.45, pop);
      op(iHead, clamp(hp * 2.5)); iHead.setAttribute('transform', `translate(600 236) scale(${Math.max(0.01, 0.6 + 0.4 * hp).toFixed(3)}) translate(-600 -236)`);
      op(iSub, P(t, mid('intro', 0.3), 0.4, linear));
      ROW.forEach(([c, mood, s, y], i) => {
        const p = P(t, mid('intro', 0.35) + i * 0.13, 0.45, pop);
        show(c, ROWX[i], y + 40 * (1 - clamp(p)), Math.max(0.01, s * (0.7 + 0.3 * p)), { mood, look: 0, arms: 0.4 });
        op(c, clamp(p * 3));
        popIn(badges[i], t, mid('intro', 0.4) + i * 0.13, ROWX[i], 640);
      });
    } else if (cw) {
      if (cw === 'dee') {
        show(dee, 330, 420, 1.12, { talk: talk(t, 'dee'), mood: t > mid('t1', 0.85) ? 'shock' : 'smug', look: 0.4, arms: t > mid('t1', 0.85) ? 1 : 0.5 });
        fadeIn(c1a, t, at('t1') + 0.1); fadeIn(c1b, t, mid('t1', 0.25)); fadeIn(c1c, t, mid('t1', 0.42)); c1c.set(P(t, mid('t1', 0.55), 0.3, linear));
        fadeIn(c1d, t, mid('t1', 0.55)); fadeIn(c1e, t, mid('t1', 0.66)); fadeIn(c1f, t, mid('t1', 0.8));
      } else if (cw === 'boy') {
        const sorry = mid('t2', 0.72);
        show(boy, 290, 548, 1.5, { talk: talk(t, 'boy'), mood: t > sorry ? 'sad' : 'happy', look: t > sorry ? 0.8 : 0.3, lift: t > sorry - 0.3 ? 1 : 0 });
        fadeIn(c2a, t, at('t2') + 0.1); fadeIn(c2b, t, mid('t2', 0.2)); fadeIn(c2c, t, mid('t2', 0.36));
        fadeIn(c2d, t, mid('t2', 0.5)); c2d.set(P(t, mid('t2', 0.6), 0.3, linear));
        if (t > mid('t2', 0.5)) {
          popIn(calc, t, mid('t2', 0.5), 500, 560, 0.48);
          calc.set(t > sorry ? 'SORRY' : '987');
        }
      } else if (cw === 'perry') {
        show(perry, 330, 410, 1.4, { talk: talk(t, 'perry'), mood: t > mid('t3', 0.6) ? 'happy' : 'annoyed', look: 0.4, walk: t * 9, wheel: t * 120, sweat: 1 });
        fadeIn(c3a, t, at('t3') + 0.1); fadeIn(c3s, t, mid('t3', 0.2)); fadeIn(c3l, t, mid('t3', 0.45)); fadeIn(c3b, t, mid('t3', 0.6));
      } else if (cw === 'rad') {
        show(rad, 330, 420, 1.5, { talk: talk(t, 'rad'), mood: 'happy', look: 0.4, arms: 0.6 });
        fadeIn(c4a, t, at('t4') + 0.05); fadeIn(c4b, t, mid('t4', 0.2)); fadeIn(c4c, t, mid('t4', 0.5));
        fadeIn(c4d, t, mid('t4', 0.62)); fadeIn(c4e, t, mid('t4', 0.75));
      } else if (cw === 'dad') {
        show(dad, 320, 572, 1.4, { talk: talk(t, 'dad'), mood: t > mid('t5', 0.7) ? 'sad' : 'neutral', look: 0.4 });
        fadeIn(c5a, t, at('t5') + 0.1); fadeIn(c5b, t, mid('t5', 0.35)); fadeIn(c5c, t, mid('t5', 0.45));
        fadeIn(c5d, t, mid('t5', 0.52)); c5d.set(P(t, mid('t5', 0.58), 0.3, linear));
        fadeIn(c5e, t, mid('t5', 0.7)); c5e.set(P(t, mid('t5', 0.85), 0.3, linear));
      } else if (cw === 'tan') {
        show(tan, 320, 572, 1.4, { talk: talk(t, 'tan'), mood: 'happy', look: 0.4, lift: t > mid('t6', 0.9) ? 1 : 0 });
        fadeIn(c6a, t, at('t6') + 0.1); fadeIn(c6b, t, mid('t6', 0.48)); fadeIn(c6c, t, mid('t6', 0.62));
        fadeIn(c6d, t, mid('t6', 0.74)); fadeIn(c6e, t, mid('t6', 0.84));
      }
    } else if (sh === 'R') {
      tr(rayP, 600, 600, 1, (t * 6 * AMP) % 360);
      popIn(logo, t, at('return') + 0.05, 600, 250);
      const hop = Math.max(0, Math.sin((t - at('return')) * 2.2)) * 18 * AMP;
      tr(slice, 200 + Math.cos(-0.9) * (14 + hop), Math.sin(-0.9) * (14 + hop));
      op(rSub, P(t, mid('return', 0.45), 0.4, linear));
    } else {
      /* ---------- the stinger: the empty hall at night ---------- */
      hall.upd(t);
      popIn(cNine, t, at('night') + 0.2, 1110, 60);
      const lit = t >= at('still') - 0.2;
      op(beam, lit ? P(t, at('still') - 0.2, 0.3, linear) : 0); op(pool, lit ? 1 : 0);
      // Uncle Pi alone on the stage, still talking
      if (t >= at('night') + 1.2) {
        const laughing = t >= at('laugh') && t < end('laugh') + 0.3;
        const bounce = laughing ? Math.abs(Math.sin(t * 9)) * 14 * AMP : 0;
        const pm = t >= at('pun') && t < at('laugh') ? (t > mid('pun', 0.7) ? 'shock' : 'neutral') : 'happy';
        const mutter = who !== 'pi' ? 0.12 + 0.3 * Math.abs(Math.sin(t * 8)) : 0;
        show(pi, 600, 296 - bounce, 0.55, { talk: who === 'pi' ? talk(t, 'pi') : mutter, mood: pm, look: t >= at('pun') && t < end('laugh') ? 0.8 : Math.sin(t * 0.8) * 0.4, digits });
        op(pi, P(t, at('night') + 1.2, 0.4, linear));
        home(pi, Ltop); tr(pi.ticker, 360, 40);
      }
      // Mr Tan at the side door with his keys
      if (t >= at('pun') - 0.3) {
        const inn = P(t, at('pun') - 0.3, 0.45, easeOut);
        show(tan, lerp(1300, 1060, inn), 620, 1.0, { talk: talk(t, 'tan'), mood: t >= at('laugh') ? 'happy' : 'happy', look: -0.8, lift: t < end('pun') + 0.4 ? 1 : 0 });
        tr(keys, 0, 0, 1, Math.sin(t * 7) * 8 * AMP);
        if (t < at('laugh') + 0.6) { cPies.set(P(t, mid('pun', 0.4), 0.35, linear)); tr(cPies, 700, 520); }
      }
      // the lights go down to a single spotlight
      const dark = P(t, mid('laugh', 0.55), 1.6, ease);
      op(Ldark, dark * 0.92);
    }
    if (sh !== 'W' && pi.parentNode !== Lcast) { Lcast.appendChild(pi); tr(pi.ticker, 0, 160); }
  };
});
