/* Scene 6: Rice, sunlight and a viral video (calculating in standard form: stretch).
   Shots (hard sitcom cuts):
   A  the lift, one hour in (STUCK: 1 hour, STRETCH): stomachs rumble -> Mum lifts the rice: 1 kg, one grain
      ≈ 0.02 g (magnified), how many grains? Ah Boy starts counting.
   W  close-up of the steel wall (the showpiece): 1 kg = 1000 g = 1 × 10³ g, 0.02 g = 2 × 10⁻² g,
      grains = (1 × 10³) ÷ (2 × 10⁻²) -> Kavya: = (1 ÷ 2) × 10^(3 − (−2)) = 0.5 × 10⁵. The speaker pops in small.
   C  Club Standard Form: 0.5 × 10⁵ NOT ON THE LIST -> 0.5 × 10⁵ = 5 × 10⁴ (A × 10, power − 1; not 5 × 10⁶;
      check 1000 ÷ 0.02 = 50 000) -> YOU'RE IN.
   A  Ah Boy's counter says 4. Grains = 50 000. Sad.
   S  space: light from the Sun to the Earth: speed 3 × 10⁸ m/s, time 5 × 10² s (Mr Tan pops in).
   A  Priya on the wall: (3 × 10⁸) × (5 × 10²) = (3 × 5) × 10^(8 + 2) = 15 × 10¹⁰.
   C  Club: 15 × 10¹⁰ NOT ON THE LIST -> 1.5 × 10¹¹ m (= 1.5 × 10⁸ km, Kavya's Sun) YOU'RE IN.
   A  Auntie Rose's video call (far too close), her phone: 6.2 × 10⁵ views, + 4.5 × 10⁴ today -> the call shrinks:
      Dad adds everything, 10.7 × 10⁹ (orange) -> the world is only 8.2 × 10⁹ -> WRONG FLOOR: 620 000 + 45 000 as a
      column sum -> Kavya: 665 000 = 6.65 × 10⁵ views, DING! -> ondeh-ondeh in the call -> "The lift is stuck,
      Auntie." Rose's smile freezes. */
scene('calc', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 2, color: o.color || C.ink, weight: 700 }); };
  const popSet = (el, t, t0, t1, x, y) => { const p = t >= t0 && t < t1 ? P(t, t0, 0.35, linear) * (1 - P(t, t1 - 0.2, 0.2, linear)) : 0; el.set(p); if (x !== undefined) tr(el, x, y); };
  const fadeWin = (el, t, t0, t1) => op(el, t >= t0 && t < t1 ? Math.min(P(t, t0, 0.2, linear), 1 - P(t, t1 - 0.15, 0.15, linear)) : 0);
  const write = (el, t, t0, t1) => {   // marker writing: fade in, slide from the left
    const p = t >= t0 && t < t1 ? P(t, t0, 0.35, easeOut) : 0;
    op(el, t >= t0 && t < t1 ? Math.min(clamp(p * 2), 1 - P(t, t1 - 0.15, 0.15, linear)) : 0);
    tr(el, -18 * (1 - p), 0);
  };
  const stampAt = (st, t, t0, t1, x, y, s) => { st.set(t >= t0 && t < t1 ? P(t, t0, 0.35, linear) : 0); tr(st, x, y, s); };
  const steelBg = parent => {
    const g = G(parent);
    E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#D3DAE0', '#A7B2BC', true) }, g);
    let brs = '';
    for (let i = 0; i < 22; i++) brs += `M${20 + i * 56},0 L${20 + i * 56},750 `;
    E('path', { d: brs, stroke: '#FFFFFF', 'stroke-width': 3, opacity: 0.18 }, g);
    return g;
  };
  const GOLD = '#FFE45C', ORANGE = '#E8641E', INK = SF.marker, RED = SF.red, GREEN = SF.green;
  const PAPER = 'rgba(255,253,246,0.96)';

  /* layers */
  const Lbg = G(root), Lboard = G(root), Lcast = G(root), Lfront = G(root), Lrail = G(root), Lfg = G(root), Lcall = G(root), Lhud = G(root);

  /* ================= A: the lift ================= */
  const liftShot = G(Lbg);
  const lift = sfLift(liftShot);
  const frontWrap = G(Lfront);
  frontWrap.appendChild(lift.front); frontWrap.appendChild(lift.top);
  const cStuck = pill(Lfg, 'STUCK: 1 hour', { size: 26, color: '#FF8A8A', stroke: '#FF8A8A' });
  const cStretch = mkChip(Lfg, '**STRETCH**', { size: 26, col: GOLD, solid: true });
  const cHour = mkChip(Lfg, '**One hour** in', { size: 34, col: GOLD });
  const grrs = [[335, 560, -8], [485, 556, 6], [630, 566, -4], [775, 556, 8]].map(([x, y, r]) => {
    const g = T(Lfg, 0, 0, 'grr…', { size: 30, weight: 800, anchor: 'middle', fill: ORANGE });
    g.setAttribute('stroke', '#FFFDF6'); g.setAttribute('stroke-width', 7); g.setAttribute('paint-order', 'stroke');
    g.pos = [x, y, r]; g.set = p => op(g, p); return g;
  });

  // rice
  const bRice = G(Lboard);
  const riceTxt = mkText(bRice, 180, 170, 'rice: **1 kg**', { size: 46, fill: INK });
  const lens = G(bRice); tr(lens, 300, 290);
  E('path', { d: 'M52,52 L100,100', stroke: '#5A6670', 'stroke-width': 16, 'stroke-linecap': 'round' }, lens);
  E('circle', { r: 72, fill: '#FFFDF6', stroke: '#5A6670', 'stroke-width': 8 }, lens);
  E('ellipse', { rx: 46, ry: 20, fill: '#F2EBD6', stroke: '#9C8A6A', 'stroke-width': 3, transform: 'rotate(-18)' }, lens);
  E('ellipse', { cx: -14, cy: -6, rx: 14, ry: 5, fill: '#FFFFFF', opacity: 0.8, transform: 'rotate(-18)' }, lens);
  const grainTxt = mkText(bRice, 400, 300, '1 grain ≈ **0.02 g**', { size: 42, fill: INK });
  const cHowMany = mkChip(bRice, 'how many **grains**?', { size: 34, col: RED, fill: PAPER });
  const counter = G(Lfg);
  E('circle', { r: 28, fill: PAPER, stroke: ORANGE, 'stroke-width': 3 }, counter);
  const counterT = T(counter, 0, 11, '1', { size: 32, weight: 800, anchor: 'middle', fill: ORANGE });

  // fifty
  const bFifty = G(Lboard);
  const fifty = mkMath(bFifty, 600, 220, '"grains" = 5 * 10^4 = "50 000"', { size: 62, fill: INK, anchor: 'middle' });

  // mult
  const bMult = G(Lboard);
  const wMult = mkWorking(bMult, 420, 118, ['"distance" = "speed" * "time"', '= (3 * 10^8) * (5 * 10^2)', '= (3 * 5) * 10^(8 + 2)', '= 15 * 10^10'], { size: 42, fill: INK, gap: 12 });
  const cMA = mkChip(bMult, '**M**ultiply the numbers,\n**A**dd the powers', { size: 28, col: GREEN, fill: PAPER });

  // add, world (Dad, in orange)
  const bAdd = G(Lboard);
  const wAdd = mkWorking(bAdd, 330, 132, ['6.2 + 4.5 = 10.7', '5 + 4 = 9'], { size: 48, fill: ORANGE, gap: 22 });
  const addAns = mkMath(bAdd, 180, 335, '10.7 * 10^9 "views!"', { size: 56, fill: ORANGE });
  const bWorld = G(Lboard);
  const globe = G(bWorld); tr(globe, 210, 300);
  E('circle', { r: 44, fill: ball('#4CC9F0', '#1D5FA6'), stroke: '#0E2A4A', 'stroke-width': 3 }, globe);
  E('path', { d: 'M-24,-14 q12,-18 30,-8 q10,12 -4,20 q-18,6 -26,-12 Z M8,16 q14,-4 22,8 q-10,12 -22,-8 Z', fill: '#56D69B' }, globe);
  mkText(bWorld, 280, 316, 'world: {{8.2 * 10^9}} people', { size: 44, fill: INK });
  const worldQ = mkText(bWorld, 700, 214, 'more views\nthan people?!', { size: 34, fill: RED, anchor: 'middle' });

  // never, views
  const bNever = G(Lboard);
  const cNever = mkChip(bNever, 'when you **add**, never add the powers', { size: 30, col: RED, fill: PAPER });
  const wConv = mkWorking(bNever, 392, 196, ['6.2 * 10^5 = "620 000"', '4.5 * 10^4 = "45 000"'], { size: 42, fill: INK, gap: 26 });
  // the column sum, digits lined up by place value
  const colSum = G(bNever);
  const XR = 836, PITCH = 30, colX = p => XR - p * PITCH - (p >= 3 ? 14 : 0);
  const sumRow = (str, y, col) => { const g = G(colSum); const ds = str.split(''); ds.forEach((ch, i) => T(g, colX(ds.length - 1 - i), y, ch, { size: 46, weight: 700, anchor: 'middle', fill: col || INK })); return g; };
  const sumA = sumRow('620000', 236), sumB = sumRow('45000', 296);
  const plus = T(colSum, colX(5) - 36, 296, '+', { size: 46, weight: 700, anchor: 'middle', fill: INK });
  const sumLine = E('path', { d: `M${colX(5) - 56},314 L${XR + 18},314`, stroke: INK, 'stroke-width': 4 }, colSum);
  const totDigits = '665000'.split('').map((ch, i) => T(colSum, colX(5 - i), 362, ch, { size: 46, weight: 800, anchor: 'middle', fill: GREEN }));
  const viewsEq = mkMath(bNever, 420, 152, '"665 000" = 6.65 * 10^5 "views"', { size: 46, fill: GREEN, anchor: 'middle' });
  const stWrong = sfStamp(Lfg, 'wrong'), stDing = sfStamp(Lfg, 'ding');

  // the video call (Auntie Rose, far too close) and her phone
  const callW = G(Lcall);
  const call = sfRoseCall(callW, 600, 380);
  const plate = G(call.screen); tr(plate, 190, 120);
  E('ellipse', { cx: 0, cy: 24, rx: 110, ry: 34, fill: '#FFFFFF', stroke: '#9AA6B2', 'stroke-width': 4 }, plate);
  [[-60, 4], [-20, 10], [20, 6], [60, 4], [-40, -24], [0, -20], [40, -24], [-20, -50], [20, -48]].forEach(([x, y]) => {
    E('circle', { cx: x, cy: y, r: 22, fill: ball('#7BD67F', '#2E8B3E'), stroke: '#1E5A28', 'stroke-width': 2.5 }, plate);
    E('path', { d: `M${x - 10},${y - 10} l4,2 M${x + 4},${y - 14} l3,3 M${x + 8},${y - 2} l3,-2`, stroke: '#FFFFFF', 'stroke-width': 3, 'stroke-linecap': 'round' }, plate);
  });
  const phone = sfPhone(Lcall, { screen: 'video' });
  mkMath(phone.views, 0, 12, '6.2 * 10^5', { size: 36, fill: MK.ink, anchor: 'middle' });
  const cToday = mkChip(Lcall, '{{+ 4.5 * 10^4}} today', { size: 30, col: GREEN, fill: PAPER });
  const ltRose = sfLowerThird(Lhud, 'rose');

  /* ================= W: close-up of the steel wall ================= */
  const wallShot = G(Lbg);
  steelBg(wallShot);
  const mini = G(wallShot); tr(mini, 1090, 62);
  E('rect', { x: -66, y: -34, width: 132, height: 68, rx: 10, fill: '#101014', stroke: '#5A6670', 'stroke-width': 4 }, mini);
  sfSeg(mini, '10', { h: 42, max: 2, anchor: 'middle' });
  const wallFg = G(Lboard);
  const cGrains = mkChip(wallFg, 'how many **grains**?', { size: 32, col: RED, fill: PAPER });
  const wRice = mkWorking(wallFg, 420, 190, ['1 "kg" = 1000 "g" = 1 * 10^3 "g"', '0.02 "g" = 2 * 10^(-2) "g"', '"grains" = (1 * 10^3) ÷ (2 * 10^(-2))', '= (1 ÷ 2) * 10^(3 - (-2))', '= 0.5 * 10^5'], { size: 52, fill: INK, gap: 24 });
  const cDS = mkChip(wallFg, '**D**ivide the numbers, **S**ubtract the powers', { size: 30, col: GREEN, fill: PAPER });
  const cHalf = mkChip(wallFg, '{{1 ÷ 2 = 0.5}}', { size: 32, col: INK, fill: PAPER });
  const cFive = mkChip(wallFg, '{{3 - (-2) = 5}}', { size: 32, col: INK, fill: PAPER });

  /* ================= C: Club Standard Form ================= */
  const clubShot = G(Lbg);
  const club = sfClub(clubShot);
  const clubFg = G(Lfg);
  const GUEST = [235, 540];
  const guest = (src) => {   // a number queuing at the rope: a chip with little legs
    const g = G(clubFg);
    E('path', { d: 'M-24,30 L-28,70 M24,30 L28,70', stroke: '#FFE45C', 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
    E('ellipse', { cx: -32, cy: 72, rx: 14, ry: 7, fill: '#B3122E' }, g); E('ellipse', { cx: 32, cy: 72, rx: 14, ry: 7, fill: '#B3122E' }, g);
    const c = mkChip(g, `{{${src}}}`, { size: 44, col: '#FFE45C', fill: 'rgba(12,10,16,0.92)' }); c.set(1);
    return g;
  };
  const gHalf = guest('0.5 * 10^5'), gFive = guest('5 * 10^4'), g15 = guest('15 * 10^10'), g15f = guest('1.5 * 10^11 "m"');
  const notA1 = mkText(clubFg, 250, 448, '{{A = 0.5}}: not {{>= 1}}', { size: 34, fill: '#FF8A8A', anchor: 'middle' });
  const notA2 = mkText(clubFg, 250, 448, '{{A = 15}}: not {{< 10}}', { size: 34, fill: '#FF8A8A', anchor: 'middle' });
  const stList = sfStamp(Lfg, 'list'), stIn = sfStamp(Lfg, 'in');
  const card1 = G(clubFg);
  E('rect', { x: 36, y: 228, width: 660, height: 224, rx: 16, fill: '#FFFDF6', stroke: '#C9A44A', 'stroke-width': 4 }, card1);
  mkMath(card1, 366, 290, '0.5 * 10^5 = 5 * 10^4', { size: 48, fill: MK.ink, anchor: 'middle' });
  mkText(card1, 366, 338, '**A** too small? {{* 10}}, and the power {{- 1}}', { size: 30, fill: '#1E7A4A', anchor: 'middle' });
  const notSix = G(card1);
  mkText(notSix, 70, 410, 'not {{5 * 10^6}}', { size: 32, fill: RED });
  E('path', { d: 'M66,398 L262,398', stroke: RED, 'stroke-width': 5, 'stroke-linecap': 'round' }, notSix);
  const chk1 = mkChip(card1, 'check: {{1000 ÷ 0.02 = "50 000"}}', { size: 26, col: '#2E4C8C', fill: '#EAF2FF' });
  tr(chk1, 498, 400); chk1.set(1);
  const card2 = G(clubFg);
  E('rect', { x: 36, y: 228, width: 660, height: 224, rx: 16, fill: '#FFFDF6', stroke: '#C9A44A', 'stroke-width': 4 }, card2);
  mkMath(card2, 366, 296, '15 * 10^10 = 1.5 * 10^11 "m"', { size: 48, fill: MK.ink, anchor: 'middle' });
  mkText(card2, 366, 346, '**A** too big? {{÷ 10}}, and the power {{+ 1}}', { size: 30, fill: '#1E7A4A', anchor: 'middle' });
  const sunNote = G(card2);
  mkText(sunNote, 366, 412, '{{1.5 * 10^11 "m" = 1.5 * 10^8 "km"}}: Kavya\'s Sun ✓', { size: 30, fill: '#2E4C8C', anchor: 'middle' });

  /* ================= S: space ================= */
  const spaceShot = G(Lbg);
  const space = sfSpace(spaceShot);
  const spaceFg = G(Lfg);
  const beam = E('path', { d: 'M150,388 L486,400', stroke: '#FFE45C', 'stroke-width': 6, 'stroke-dasharray': '18 12', 'stroke-linecap': 'round' }, spaceFg);
  const photon = E('circle', { r: 12, fill: glow('#FFF7C2'), opacity: 0 }, spaceFg);
  const photonCore = E('circle', { r: 6, fill: '#FFFFFF' }, spaceFg);
  const spd = mkMath(spaceFg, 830, 170, '"speed" = 3 * 10^8 "m/s"', { size: 46, fill: '#FFFFFF', anchor: 'middle', halo: '#0E1430' });
  const tim = mkMath(spaceFg, 830, 245, '"time" = 5 * 10^2 "s"', { size: 46, fill: '#FFFFFF', anchor: 'middle', halo: '#0E1430' });
  const cFar = mkChip(spaceFg, 'how **far**?', { size: 34, col: GOLD });
  const sunLab = mkText(spaceFg, 150, 640, 'the Sun', { size: 30, fill: '#FFE45C', anchor: 'middle' });
  const earthLab = mkText(spaceFg, 520, 470, 'Earth', { size: 30, fill: '#9FD8FF', anchor: 'middle' });

  /* ================= the cast ================= */
  const LS = 0.84, LY = 520;
  const XS = { kavya: 185, mum: 335, dad: 485, boy: 630, priya: 775, tan: 920 };
  const IXp = 64, IYp = 525, IS = 0.85;          // the Index on the handrail, left
  const kav = cast(Lcast, 'kavya', { s: LS });
  const mum = cast(Lcast, 'mum', { s: LS });
  sfRice(mum.hand, 0.62);
  const dad = cast(Lcast, 'dad', { s: LS });
  const boy = cast(Lcast, 'boy', { s: LS });
  const priya = cast(Lcast, 'priya', { s: LS });
  const tan = cast(Lcast, 'tan', { s: LS });
  const H = { kavya: kav, mum, dad, boy, priya, tan };
  const norm = cast(clubShot, 'norm', { s: 1 });
  const idx = cast(Lrail, 'index', { s: IS, val: 'n' });
  const CALLX = { call: [470, 352, 1], small: [1000, 228, 0.45], big: [560, 330, 0.78] };
  const X = Object.assign({ index: IXp, rose: 1000 }, XS);
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cut points */
  const cW = at('split') - 0.06, cC1 = at('renorm') - 0.06, cA2 = at('fifty') - 0.06, cS = at('light') - 0.06,
    cA3 = at('mult') - 0.06, cC2 = at('club') - 0.06, cA4 = at('call') - 0.06;
  const tWrong = at('never') + 0.05;

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const sA = on(t, -1, cW) || on(t, cA2, cS) || on(t, cA3, cC2) || on(t, cA4, 1e9);
    const sW = on(t, cW, cC1), sC = on(t, cC1, cA2) || on(t, cC2, cA4), sS = on(t, cS, cA3);
    const spk = scWho(S, t);
    // where the call window is
    const cz = t < at('add') ? CALLX.call : t < at('ondeh') - 0.1 ? CALLX.small : CALLX.big;
    X.rose = cz[0];
    const lookAt = k => (spk && X[spk] !== undefined && spk !== k ? clamp((X[spk] - X[k]) / 300, -1, 1) : 0);
    const show = { kavya: 0, mum: 0, dad: 0, boy: 0, priya: 0, tan: 0 };
    ltRose.set(0);

    /* ---------- A: the lift ---------- */
    op(liftShot, sA); op(frontWrap, sA); op(Lrail, sA || sW);
    [bRice, bFifty, bMult, bAdd, bWorld, bNever].forEach(b => op(b, 0));
    op(cStuck, 0); cStretch.set(0); cHour.set(0); grrs.forEach(g => g.set(0)); op(counter, 0);
    stWrong.set(0); stDing.set(0); op(Lcall, 0);
    if (sA) {
      lift.upd(t); lift.dim(1); lift.lights(12);
      const flash = t > tWrong && t < tWrong + 0.7 && Math.sin((t - tWrong) * 30) > 0;
      lift.disp.set(flash ? '  ' : '10');
      op(cStuck, 1); tr(cStuck, 1075, 42);
      cStretch.set(t < at('hour') ? 0 : P(t, mid('hour', 0.45), 0.35, linear)); tr(cStretch, 890, 42);

      /* hour */
      if (t < at('rice')) {
        popSet(cHour, t, at('hour') + 0.1, at('rice') - 0.1, 330, 170);
        grrs.forEach((g, i) => { const t0 = mid('hour', 0.3 + i * 0.15); if (t > t0) { g.set(P(t, t0, 0.3, linear) * (1 - P(t, t0 + 1.0, 0.3, linear))); tr(g, g.pos[0], g.pos[1] + 4 * Math.sin(t * 40) * AMP * (t < t0 + 0.4 ? 1 : 0), 1, g.pos[2]); } });
      }
      /* rice */
      if (t >= at('rice') - 0.06 && t < cW) {
        op(bRice, 1);
        write(riceTxt, t, mid('rice', 0.08), 1e9);
        op(lens, P(t, mid('rice', 0.35), 0.3, linear));
        write(grainTxt, t, mid('rice', 0.4), 1e9);
        popSet(cHowMany, t, mid('rice', 0.72), 1e9, 820, 190);
        const k = Math.min(2, Math.floor((t - mid('rice', 0.8)) / 0.45));
        if (t > mid('rice', 0.8)) { op(counter, 1); if (counterT.textContent !== String(k + 1)) setText(counterT, String(k + 1)); tr(counter, XS.boy, 420, 0.8 + 0.2 * P(t, mid('rice', 0.8) + k * 0.45, 0.2, pop)); }
      }
      /* fifty: the counter says 4 */
      if (t >= cA2 && t < cS) {
        op(bFifty, 1); write(fifty, t, cA2, 1e9);
        op(counter, 1); if (counterT.textContent !== '4') setText(counterT, '4'); tr(counter, XS.boy, 420);
      }
      /* mult */
      if (t >= cA3 && t < cC2) {
        op(bMult, 1);
        wMult.show(0, P(t, at('mult'), 0.3, linear));
        wMult.show(1, P(t, mid('mult', 0.12), 0.35, linear));
        wMult.show(2, P(t, mid('mult', 0.4), 0.35, linear));
        wMult.show(3, P(t, mid('mult', 0.75), 0.35, linear));
        wMult.ring(3, P(t, mid('mult', 0.85), 0.25, linear));
        popSet(cMA, t, mid('mult', 0.2), 1e9, 820, 330);
      }
      /* the call, Dad's addition, the world, never, views */
      if (t >= cA4) {
        op(Lcall, 1);
        // the call window moves between its three places with a quick slide
        const tS = at('add'), tB = at('ondeh') - 0.1;
        let cx, cy, cs;
        if (t < tS) [cx, cy, cs] = CALLX.call;
        else if (t < tB) { const p = P(t, tS, 0.35, ease); cx = lerp(CALLX.call[0], CALLX.small[0], p); cy = lerp(CALLX.call[1], CALLX.small[1], p); cs = lerp(1, CALLX.small[2], p); }
        else { const p = P(t, tB, 0.35, ease); cx = lerp(CALLX.small[0], CALLX.big[0], p); cy = lerp(CALLX.small[1], CALLX.big[1], p); cs = lerp(CALLX.small[2], CALLX.big[2], p); }
        const cp = P(t, cA4, 0.35, pop);
        tr(callW, cx, cy, cs * Math.max(0.01, 0.7 + 0.3 * cp));
        op(callW, clamp(cp * 3));
        let rm = 'happy', rl = 0.2, still = false;
        if (t >= at('add') && t < at('world')) { rm = 'happy'; rl = -0.6; }
        if (t >= at('world') && t < at('never')) rm = 'shock';
        if (t >= at('never') && t < at('ondeh')) { rm = 'neutral'; rl = -0.6; }
        if (t >= at('views') && t < at('ondeh')) rm = t > mid('views', 0.6) ? 'happy' : 'neutral';
        if (t >= at('stuck')) { rm = 'happy'; rl = 0; still = t > mid('stuck', 0.4); }
        call.rose.set({ t, talk: scTalk(S, t, 'rose'), mood: rm, look: rl, still });
        op(plate, P(t, mid('ondeh', 0.3), 0.3, linear));
        // her phone and today's views
        const php = t < at('add') ? P(t, mid('call', 0.35), 0.35, pop) : 1 - P(t, at('add'), 0.2, linear);
        op(phone, clamp(php * 3)); tr(phone, 975, 380 + 50 * (1 - clamp(php)), 0.78, 5);
        popSet(cToday, t, mid('call', 0.72), at('add'), 975, 610);
        ltRose.set(win(t, at('call') + 0.2, at('call') + 3.3, 0.3));

        /* add, world */
        if (t >= at('add') - 0.06 && t < at('never') - 0.06) {
          op(bAdd, 1);
          const late = t >= at('world') ? 1 - P(t, at('world'), 0.2, linear) : 1;
          wAdd.show(0, P(t, mid('add', 0.12), 0.35, linear) * late);
          wAdd.show(1, P(t, mid('add', 0.48), 0.35, linear) * late);
          op(addAns, P(t, mid('add', 0.72), 0.3, linear));
          tr(addAns, t >= at('world') ? 0 : -18 * (1 - P(t, mid('add', 0.72), 0.35, easeOut)), t >= at('world') ? lerp(0, -150, P(t, at('world'), 0.35, ease)) : 0);
          op(bWorld, t >= at('world') ? P(t, mid('world', 0.35), 0.3, linear) : 0);
          op(worldQ, P(t, mid('world', 0.7), 0.3, linear));
        }
        /* never, views, ondeh, stuck */
        if (t >= at('never') - 0.06) {
          op(bNever, 1 - P(t, at('ondeh') - 0.1, 0.25, linear));
          stampAt(stWrong, t, tWrong, tWrong + 1.3, 470, 260, 0.55);
          cNever.set(t < at('views') ? P(t, tWrong + 1.2, 0.35, linear) * (1 - P(t, at('views') - 0.1, 0.2, linear)) : 0); tr(cNever, 480, 140);
          const convOut = 1 - P(t, mid('views', 0.66), 0.25, linear);
          wConv.show(0, P(t, mid('never', 0.3), 0.35, linear) * convOut);
          wConv.show(1, P(t, mid('never', 0.42), 0.35, linear) * convOut);
          op(sumA, P(t, mid('never', 0.58), 0.3, linear));
          const pb = P(t, mid('never', 0.7), 0.3, linear);
          op(sumB, pb); op(plus, pb); op(sumLine, pb);
          totDigits.forEach((d, i) => op(d, P(t, mid('views', 0.06 + (5 - i) * 0.05), 0.2, linear)));
          op(viewsEq, P(t, mid('views', 0.48), 0.3, linear)); tr(viewsEq, -18 * (1 - P(t, mid('views', 0.48), 0.35, easeOut)), 0);
          stampAt(stDing, t, mid('views', 0.7), 1e9, 330, 262, 0.5);
          if (t >= at('ondeh')) stDing.set(0);
        }
      }

      /* the humans */
      ['kavya', 'mum', 'dad', 'boy', 'priya', 'tan'].forEach(k => {
        show[k] = 1;
        tr(H[k], XS[k], LY + (k === 'boy' ? 14 : 0), LS);
        let mood = 'neutral', look = lookAt(k), lift_ = 0;
        if (t < at('rice')) { mood = k === 'boy' ? 'sad' : 'deadpan'; look = 0; }
        else if (t < cW) {
          mood = k === 'mum' ? 'neutral' : k === 'boy' ? 'happy' : 'neutral';
          if (k === 'mum') lift_ = 1;
          if (k === 'boy' && t > mid('rice', 0.8)) { look = 0.6; }
        } else if (t < cS) {                                    // fifty: the counter says 4
          mood = k === 'boy' ? (t > mid('fifty', 0.5) ? 'sad' : 'shock') : 'deadpan';
          look = k === 'boy' ? (t > mid('fifty', 0.5) ? 0 : -0.4) : clamp((XS.boy - XS[k]) / 300, -1, 1);
        } else if (t < cC2) {                                   // mult
          mood = k === 'priya' ? 'smug' : 'neutral';
          if (k === 'priya') look = -0.6;
        } else if (t < at('add')) {                             // the call
          mood = k === 'kavya' ? 'happy' : 'neutral'; look = clamp((CALLX.call[0] - XS[k]) / 300, -1, 1);
        } else if (t < at('never')) {                           // Dad adds everything
          mood = k === 'dad' ? 'smug' : k === 'kavya' ? 'deadpan' : 'neutral';
          if (k === 'dad') { look = -0.4; lift_ = t < at('world') ? 1 : 0; }
          if (t >= at('world')) { mood = k === 'dad' ? 'smug' : 'shock'; look = clamp((X.rose - XS[k]) / 300, -1, 1); }
        } else if (t < at('views')) {
          mood = k === 'dad' ? 'sad' : 'neutral';
        } else if (t < at('ondeh')) {
          mood = k === 'kavya' ? 'happy' : k === 'dad' ? 'sad' : 'neutral';
          if (k === 'kavya') look = 0.5;
        } else if (t < at('stuck')) {
          mood = 'happy'; look = clamp((CALLX.big[0] - XS[k]) / 300, -1, 1);
        } else {
          mood = k === 'kavya' ? 'deadpan' : 'deadpan'; look = k === 'kavya' ? 0 : t > end('stuck') ? 0 : look;
        }
        H[k].set({ t, talk: scTalk(S, t, k), mood, look, lift: lift_ });
      });
      // the Index on the handrail
      let im = 'smug', ipt = 0;
      if (t >= at('never') && t < at('views')) { im = 'annoyed'; ipt = 1; }
      if (spk === 'index') ipt = 1;
      tr(idx, IXp, IYp, IS);
      idx.set({ t, talk: scTalk(S, t, 'index'), mood: im, look: spk === 'index' || !spk ? 0.5 : lookAt('index'), val: 'n', point: ipt });
    }

    /* ---------- W: close-up of the wall ---------- */
    op(wallShot, sW); op(wallFg, sW);
    if (sW) {
      popSet(cGrains, t, cW, 1e9, 640, 128);
      wRice.show(0, P(t, at('split'), 0.3, linear));
      wRice.show(1, P(t, mid('split', 0.25), 0.3, linear));
      wRice.show(2, P(t, mid('split', 0.5), 0.35, linear));
      wRice.show(3, P(t, mid('work', 0.12), 0.35, linear));
      wRice.show(4, P(t, mid('work', 0.72), 0.35, linear));
      wRice.ring(4, P(t, mid('work', 0.82), 0.25, linear));
      popSet(cDS, t, mid('split', 0.72), at('work') + 0.3, 470, 650);
      popSet(cHalf, t, mid('work', 0.2), 1e9, 300, 650);
      popSet(cFive, t, mid('work', 0.45), 1e9, 600, 650);
      // the speaker pops in, small, at the lower right
      const who = t < at('work') - 0.25 ? 'index' : 'kavya';
      const t0 = who === 'index' ? at('split') - 0.25 : at('work') - 0.25;
      const p = P(t, t0, 0.35, pop);
      if (who === 'index') {
        tr(idx, 1060, 620 + 160 * (1 - clamp(p)), 0.95);
        idx.set({ t, talk: scTalk(S, t, 'index'), mood: 'smug', look: -0.6, val: '−2', point: 1 });
      } else {
        show.kavya = 1;
        tr(kav, 1060, 630 + 160 * (1 - clamp(p)), 0.72);
        kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: 'happy', look: -0.6 });
      }
    }

    /* ---------- C: Club Standard Form ---------- */
    op(clubShot, sC); op(clubFg, sC); stList.set(0); stIn.set(0);
    [gHalf, gFive, g15, g15f].forEach(g => op(g, 0));
    op(notA1, 0); op(notA2, 0); op(card1, 0); op(card2, 0);
    if (sC) {
      const first = t < cA2;
      const L = first ? 'renorm' : 'club';
      const tCard = mid(L, 0.36), tIn = mid(L, 0.8);
      club.rope(t < tIn ? 0 : P(t, tIn, 0.6, ease));
      tr(norm, 845, 470, 1);
      const nl = t < mid(L, 0.3) ? P(t, at(L), 0.3, ease) : 1 - P(t, mid(L, 0.3), 0.25, ease);
      const ns = t < tCard ? P(t, mid(L, 0.12), 0.25, pop) : 1 - P(t, tCard, 0.3, ease);
      norm.set({ t, talk: scTalk(S, t, 'norm'), mood: 'deadpan', look: -0.7, list: nl, stop: ns });
      const gBad = first ? gHalf : g15, gGood = first ? gFive : g15f;
      const walk = (g, t0) => { const w = P(t, t0, 1.0, easeIn); op(g, 1 - P(t, t0 + 0.7, 0.3, linear)); tr(g, lerp(GUEST[0], 640, w), GUEST[1] - 6 * Math.abs(Math.sin(t * 9)) * (w > 0 && w < 1 ? 1 : 0)); };
      if (t < tIn - 0.3) { op(gBad, 1); tr(gBad, GUEST[0], GUEST[1] - 4 * Math.abs(Math.sin(t * 3))); }
      else if (t < tIn + 0.4) { const p = P(t, tIn - 0.3, 0.3, pop); op(gGood, clamp(p * 3)); tr(gGood, GUEST[0], GUEST[1]); }
      else walk(gGood, tIn + 0.4);
      stampAt(stList, t, mid(L, 0.14), tCard, 330, 300, 0.55);
      fadeWin(first ? notA1 : notA2, t, mid(L, 0.18), tCard + 0.1);
      const card = first ? card1 : card2;
      op(card, t >= tCard ? P(t, tCard, 0.25, linear) : 0);
      if (first) { op(notSix, P(t, mid(L, 0.55), 0.3, linear)); chk1.set(P(t, mid(L, 0.66), 0.3, linear)); }
      else op(sunNote, P(t, mid(L, 0.6), 0.3, linear));
      stampAt(stIn, t, tIn, 1e9, 600, 585, 0.5);
    }

    /* ---------- S: space ---------- */
    op(spaceShot, sS); op(spaceFg, sS); cFar.set(0);
    if (sS) {
      space.upd(t);
      const bp = P(t, at('light') + 0.2, 1.2, linear);
      beam.setAttribute('stroke-dashoffset', (-t * 60 * AMP).toFixed(1));
      op(beam, bp);
      const ph = ((t - at('light')) / 1.6) % 1;
      tr(photon, lerp(150, 486, ph), lerp(388, 400, ph)); tr(photonCore, lerp(150, 486, ph), lerp(388, 400, ph));
      op(photon, bp); op(photonCore, bp);
      op(spd, P(t, mid('light', 0.12), 0.3, linear)); tr(spd, -18 * (1 - P(t, mid('light', 0.12), 0.35, easeOut)), 0);
      op(tim, P(t, mid('light', 0.55), 0.3, linear)); tr(tim, -18 * (1 - P(t, mid('light', 0.55), 0.35, easeOut)), 0);
      popSet(cFar, t, mid('light', 0.85), 1e9, 830, 320);
      op(sunLab, bp); op(earthLab, bp);
      show.tan = 1;
      const p = P(t, at('light') - 0.1, 0.35, pop);
      tr(tan, 1060, 630 + 160 * (1 - clamp(p)), 0.72);
      tan.set({ t, talk: scTalk(S, t, 'tan'), mood: 'happy', look: -0.6, lift: 1 });
    }

    /* characters not in this shot */
    for (const k in show) op(H[k], show[k]);
    op(idx, sA || sW ? (sW && t >= at('work') - 0.25 ? 0 : 1) : 0);
    op(norm, sC);
  };
});
