/* Scene 5: Space Trumps (comparing and ordering standard form; calculator displays).
   Shots (hard sitcom cuts):
   L  the lift (STUCK: 50 min): SPACE TRUMPS, bigger number wins: Priya slaps down 9.9 × 10⁴ -> Ah Boy's 1.1 × 10⁵,
      "9.9 is bigger, you win", Priya's card glows -> WRONG FLOOR: powers first: 110 000 > 99 000, the glow jumps.
   B  Block 208 cutaway: #12-05: the floor (12) says how high, the flat (05) which unit; #09-99 is lower, even
      though 99 > 05 -> the Index: floor first, then the flat: in 1.1 × 10⁵ the power is the floor, A the flat; DING!
      -> Ah Boy dances: his card on floor 5, Priya's on floor 4.
   L  Priya's card has a bent corner -> Mr Tan deals four cards -> Kavya: group by power (10⁴ | 10⁵ 10⁵ | 10⁶), the
      two 10⁵ cards swap (4.2 < 8.1): 2.7 × 10⁴ < 4.2 × 10⁵ < 8.1 × 10⁵ < 3.9 × 10⁶; check 27 000 < … < 3 900 000
      -> Ah Boy: smallest wins, 2 × 10⁻³ -> Priya: 9 × 10⁻⁵, −5 is lower than −3 on a number line; 0.000 09 < 0.002.
   K  calculator close-up: Priya types 0.0006 × 0.000 04 = ; the display shows 2.4E-08; E climbs out (lower third).
   L  Ah Boy: 2.4⁻⁸? -> E: E means × 10 to the power: 2.4 × 10⁻⁸ = 0.000 000 024; 2.4⁻⁸ crossed out; E = exponent
      -> the Index, happy for once: index, power, EXPONENT. Hold. */
scene('compare', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 2, color: o.color || C.ink, weight: 700 }); };
  const popSet = (el, t, t0, t1, x, y) => { const p = t >= t0 && t < t1 ? P(t, t0, 0.35, linear) * (1 - P(t, t1 - 0.2, 0.2, linear)) : 0; el.set(p); if (x !== undefined) tr(el, x, y); };
  const write = (el, t, t0, t1) => {   // marker writing: fade in, slide from the left
    const p = t >= t0 && t < t1 ? P(t, t0, 0.35, easeOut) : 0;
    op(el, t >= t0 && t < t1 ? Math.min(clamp(p * 2), 1 - P(t, t1 - 0.15, 0.15, linear)) : 0);
    tr(el, -18 * (1 - p), 0);
  };
  const stampAt = (st, t, t0, t1, x, y, s) => { st.set(t >= t0 && t < t1 ? P(t, t0, 0.35, linear) : 0); tr(st, x, y, s); };
  const INK = SF.marker, RED = SF.red, GREEN = SF.green, ORANGE = '#E8641E', GREY = '#3A4650', GOLD = '#FFE45C';
  const LIGHT = 'rgba(255,253,246,0.96)';
  // sfSeg's point circles keep their opacity="0" attribute after op(.., 1), so the decimal point never shows:
  // drop the attribute once and let op() (style) control them
  const segDots = (g, str) => { g.querySelectorAll('circle').forEach(c => c.removeAttribute('opacity')); if (g.set) g.set(str); };
  const bchip = (parent, text, col, size) => mkChip(parent, text, { size: size || 30, col: col || INK, fill: LIGHT });

  /* layers */
  const Lbg = G(root), Lboard = G(root), Lcast = G(root), Lfront = G(root), Lrail = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= L: the lift ================= */
  const liftShot = G(Lbg);
  const lift = sfLift(liftShot);
  const frontWrap = G(Lfront);
  frontWrap.appendChild(lift.front); frontWrap.appendChild(lift.top);
  const cStuck = pill(Lfg, 'STUCK: 50 min', { size: 26, color: '#FF8A8A', stroke: '#FF8A8A' });

  // card, mine, powers
  const bDuel = G(Lboard);
  const cTitle = bchip(bDuel, '**SPACE TRUMPS**: bigger number wins', '#2E4C8C', 28);
  const cardB = sfCard(bDuel, { art: 'star', src: '1.1 * 10^5', col: '#C0602A' });   // Ah Boy's
  const cardP = sfCard(bDuel, { art: 'planet', src: '9.9 * 10^4', col: '#2E4C8C' });  // Priya's
  const BX = 300, PX = 900, CY = 262, CS = 0.66;
  const cYouWin = mkChip(bDuel, '{{9.9 > 1.1}}, so you win?', { size: 30, col: ORANGE, fill: LIGHT });
  const pw1 = mkMath(bDuel, 600, 205, '1.1 * 10^5 = "110 000"', { size: 38, fill: INK, anchor: 'middle' });
  const pw2 = mkMath(bDuel, 600, 260, '9.9 * 10^4 = "99 000"', { size: 38, fill: INK, anchor: 'middle' });
  const pw3 = mkMath(bDuel, 600, 330, '"110 000" > "99 000"', { size: 42, fill: GREEN, anchor: 'middle' });
  const cPowers = bchip(bDuel, '**powers first**', RED, 30);
  const stWrong = sfStamp(Lfg, 'wrong');

  // order, sort
  const bSort = G(Lboard);
  const DEAL = [['4.2 * 10^5', 'planet', '#2E4C8C'], ['3.9 * 10^6', 'star', '#C0602A'], ['8.1 * 10^5', 'moon', '#5A6670'], ['2.7 * 10^4', 'planet', '#1E7A4A']];
  const SLOTX = [285, 475, 665, 855], SY = 262, SS = 0.55;
  const sCards = DEAL.map(([src, art, col]) => sfCard(bSort, { art, src, col, size: 52 }));
  // slots: dealt order 0 1 2 3; grouped by power: 2.7e4 | 8.1e5 4.2e5 | 3.9e6; then the 10⁵ pair swaps
  const GROUP = [2, 3, 1, 0], FINAL = [1, 3, 2, 0];         // slot index of card i
  const grpLab = G(bSort);
  [[SLOTX[0], '10^4'], [(SLOTX[1] + SLOTX[2]) / 2, '10^5'], [SLOTX[3], '10^6']].forEach(([x, m]) => { const c = mkChip(grpLab, `{{${m}}}`, { size: 30, col: '#8A3A8E', fill: LIGHT }); c.set(1); tr(c, x, 128); });
  const grpBrk = E('path', { d: `M${SLOTX[1] - 66},150 L${SLOTX[1] - 66},140 L${SLOTX[2] + 66},140 L${SLOTX[2] + 66},150`, fill: 'none', stroke: '#8A3A8E', 'stroke-width': 4 }, grpLab);
  const cSwap = mkChip(bSort, '{{4.2 < 8.1}}: swap!', { size: 30, col: ORANGE, fill: LIGHT });
  const lts = G(bSort);
  [0, 1, 2].forEach(i => mkMath(lts, (SLOTX[i] + SLOTX[i + 1]) / 2, SY + 18, '<', { size: 56, fill: GREEN, anchor: 'middle' }));
  const cCheck = mkChip(bSort, '{{"27 000" < "420 000" < "810 000" < "3 900 000"}}', { size: 28, col: GREEN, fill: LIGHT });

  // tiny, beat
  const bTiny = G(Lboard);
  const cardT = sfCard(bTiny, { art: 'bug', src: '2 * 10^(-3)', col: '#C0602A' });
  const cardN = sfCard(bTiny, { art: 'cell', src: '9 * 10^(-5)', col: '#2E4C8C' });
  const cSmallest = bchip(bTiny, '**smallest** wins!', ORANGE, 30);
  const nl = mkNumberLine(bTiny, { from: -6, to: -2, step: 1, len: 360, size: 28, ink: MK.ink, arrows: false,
    marks: [{ v: -5, col: '#2E4C8C' }, { v: -3, col: '#C0602A' }] });
  const NLX = 420, NLY = 160;
  tr(nl, NLX, NLY);
  const nlBg = E('rect', { x: NLX - 30, y: NLY - 40, width: 420, height: 100, rx: 14, fill: LIGHT, stroke: '#8FA3B8', 'stroke-width': 3 }, bTiny);
  bTiny.insertBefore(nlBg, nl);
  const nlLab = mkText(bTiny, 600, 120, 'power {{-5}} is lower than {{-3}}', { size: 28, fill: INK, anchor: 'middle' });
  const bt1 = mkMath(bTiny, 600, 262, '9 * 10^(-5) = "0.000 09"', { size: 36, fill: INK, anchor: 'middle' });
  const bt2 = mkMath(bTiny, 600, 312, '2 * 10^(-3) = 0.002', { size: 36, fill: INK, anchor: 'middle' });
  const bt3 = mkMath(bTiny, 600, 370, '"0.000 09" < 0.002', { size: 40, fill: GREEN, anchor: 'middle', halo: '#C9D1D8' });

  // power, means: E on the board
  const bE = G(Lboard);
  const lcd = G(bE);
  E('rect', { x: 165, y: 118, width: 360, height: 104, rx: 14, fill: '#3A4A58', stroke: MK.ink, 'stroke-width': 4 }, lcd);
  E('rect', { x: 177, y: 130, width: 336, height: 80, rx: 8, fill: SF.lcd, stroke: '#1E2A22', 'stroke-width': 3 }, lcd);
  const lcdSeg = sfSeg(lcd, '2.4E-08', { h: 56, col: SF.lcdInk, dim: 'rgba(30,42,30,0.06)', max: 6, anchor: 'middle' }); tr(lcdSeg, 345, 170);
  segDots(lcdSeg, '2.4E-08');
  const eRing = E('ellipse', { cx: 334, cy: 170, rx: 30, ry: 40, fill: 'none', stroke: RED, 'stroke-width': 5 }, lcd);
  const boyPow = G(bE);
  mkMath(boyPow, 760, 196, '2.4^(-8)', { size: 72, fill: ORANGE, anchor: 'middle' });
  T(boyPow, 885, 196, '?', { size: 80, weight: 800, anchor: 'middle', fill: ORANGE });
  const boyPowX = G(bE);
  mkMath(boyPowX, 345, 352, '2.4^(-8)', { size: 46, fill: ORANGE, anchor: 'middle' });
  const boyStrike = strike(boyPowX, 280, 338, 410, RED);
  const eArrow = arrow(bE, 540, 172, 620, 172, { color: GREEN, width: 6 });
  const me1 = mkMath(bE, 790, 190, '2.4 * 10^(-8)', { size: 62, fill: GREEN, anchor: 'middle' });
  const me2 = mkMath(bE, 790, 268, '= "0.000 000 024"', { size: 40, fill: INK, anchor: 'middle' });
  const meE = mkText(bE, 345, 270, '**E** means {{× 10}} to the power', { size: 28, fill: INK, anchor: 'middle' });
  const cExp = mkChip(bE, '**E** = **exponent**', { size: 32, col: '#1E7A4A', fill: '#E6F6EC' });

  // name: index, power, EXPONENT
  const bName = G(Lboard);
  const nm1 = mkChip(bName, '**index**', { size: 34, col: '#B8862E', fill: LIGHT });
  const nm2 = mkChip(bName, '**power**', { size: 34, col: '#C62828', fill: LIGHT });
  const nm3 = mkChip(bName, '**EXPONENT**', { size: 68, col: '#1F3A93', solid: true, fill: GOLD, stroke: '#1F3A93' });

  /* ================= B: Block 208 cutaway ================= */
  const hdbShot = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#9FD8FF', '#E8F6FF', true) }, hdbShot);
  E('ellipse', { cx: 300, cy: 120, rx: 120, ry: 34, fill: '#FFFFFF', opacity: 0.8 }, hdbShot);
  E('ellipse', { cx: 380, cy: 100, rx: 80, ry: 30, fill: '#FFFFFF', opacity: 0.8 }, hdbShot);
  E('rect', { x: 0, y: 660, width: 1200, height: 90, fill: '#8FBF7A' }, hdbShot);
  const BKX = 720, BKW = 300, RH = 40, FY = k => 650 - RH * (k - 0.5);   // floor k centre y
  E('rect', { x: BKX - 10, y: 650 - 12 * RH - 30, width: BKW + 20, height: 30, fill: '#C0602A', stroke: '#6B3A1A', 'stroke-width': 3 }, hdbShot);   // roof
  E('rect', { x: BKX, y: 650 - 12 * RH, width: BKW, height: 12 * RH + 10, fill: '#F2EAD8', stroke: '#8C7A5A', 'stroke-width': 4 }, hdbShot);
  let wins = '', slabs = '';
  for (let k = 1; k <= 12; k++) {
    for (let u = 0; u < 6; u++) wins += `M${BKX + 14 + u * 48},${FY(k) - 12} h34 v22 h-34 Z `;
    slabs += `M${BKX},${650 - RH * k} L${BKX + BKW},${650 - RH * k} `;
  }
  E('path', { d: slabs, stroke: '#D8CBB0', 'stroke-width': 3 }, hdbShot);
  E('path', { d: wins, fill: '#7FA8C9', stroke: '#4A6A86', 'stroke-width': 2 }, hdbShot);
  for (let k = 1; k <= 12; k++) T(hdbShot, BKX - 14, FY(k) + 9, String(k), { size: 26, weight: 800, anchor: 'end', fill: '#3A4650' });
  { const s = G(hdbShot); tr(s, BKX + BKW / 2, 650 - 12 * RH - 15); T(s, 0, 9, 'BLK 208', { size: 24, weight: 800, anchor: 'middle', fill: '#FFFFFF' }); }
  const hiA = E('rect', { x: BKX + 14 + 4 * 48 - 4, y: FY(12) - 16, width: 42, height: 30, rx: 4, fill: GOLD, stroke: '#B8700A', 'stroke-width': 4 }, hdbShot);
  const hiB = E('rect', { x: BKX + 14 + 5 * 48 - 4, y: FY(9) - 16, width: 42, height: 30, rx: 4, fill: '#FF8A8A', stroke: RED, 'stroke-width': 4 }, hdbShot);
  const hdbFg = G(Lfg);
  const tag1205 = mkChip(hdbFg, '**#12-05**', { size: 30, col: '#B8700A', fill: LIGHT });
  const tag0999 = mkChip(hdbFg, '**#09-99**', { size: 30, col: RED, fill: LIGHT });
  // the address, with braces
  const ADX = 330, ADY = 220, AS = 96;
  const addr = G(hdbFg);
  const wH = textWidth('#', AS, FD, 800), w12 = textWidth('12', AS, FD, 800), wD = textWidth('-', AS, FD, 800), w05 = textWidth('05', AS, FD, 800);
  const ax0 = ADX - (wH + w12 + wD + w05) / 2;
  T(addr, ax0, ADY, '#', { size: AS, weight: 800, fill: '#3A4650' });
  T(addr, ax0 + wH, ADY, '12', { size: AS, weight: 800, fill: '#1F3A93' });
  T(addr, ax0 + wH + w12, ADY, '-', { size: AS, weight: 800, fill: '#3A4650' });
  T(addr, ax0 + wH + w12 + wD, ADY, '05', { size: AS, weight: 800, fill: '#B8336A' });
  const br12 = mkBrace(hdbFg, ax0 + wH, ADY + 18, ax0 + wH + w12, ADY + 18, { text: '**floor**: how high', col: '#1F3A93', size: 28, flip: true });
  const br05 = mkBrace(hdbFg, ax0 + wH + w12 + wD, ADY + 18, ax0 + wH + w12 + wD + w05, ADY + 18, { text: '**flat**', col: '#B8336A', size: 28, flip: true });
  const hdbNote = mkText(hdbFg, ADX, 400, '**#09-99** is lower, even though {{99 > 05}}', { size: 30, fill: '#3A4650', anchor: 'middle' });
  const hdbNote2 = mkText(hdbFg, ADX, 446, 'same floor? **then** compare the flat', { size: 30, fill: '#3A4650', anchor: 'middle' });
  // floor: in 1.1 × 10⁵, the power is the floor, A is the flat
  const flG = G(hdbFg);
  const flChip = mkChip(flG, '**Floor first, then the flat.**', { size: 32, col: '#1F3A93', fill: LIGHT }); flChip.set(1); tr(flChip, ADX, 140);
  const FMS = 96, fm = mkMath(flG, ADX, 290, '1.1 * 10^5', { size: FMS, fill: MK.ink, anchor: 'middle' });
  const fwA = mkMeasure('1.1', { size: FMS }).w, fwAll = mkMeasure('1.1 * 10^5', { size: FMS }).w, fwP = mkMeasure('10^5', { size: FMS }).w;
  const fx0 = ADX - fwAll / 2;
  const flBrA = mkBrace(flG, fx0, 312, fx0 + fwA, 312, { text: '**flat**', col: '#B8336A', size: 30, flip: true });
  const flBrP = mkBrace(flG, fx0 + fwAll - fwP, 312, fx0 + fwAll, 312, { text: '**floor**', col: '#1F3A93', size: 30, flip: true });
  const stDing = sfStamp(Lfg, 'ding');
  // win: the cards on floors 5 and 4
  const winT = mkText(hdbFg, ADX, 230, 'floor **5** beats floor **4**', { size: 50, fill: '#3A4650', anchor: 'middle', boldFill: '#1F3A93' });
  const mB = mkChip(hdbFg, '{{1.1 * 10^5}}', { size: 30, col: '#C0602A', fill: LIGHT });
  const mP = mkChip(hdbFg, '{{9.9 * 10^4}}', { size: 30, col: '#2E4C8C', fill: LIGHT });
  const arB = arrow(hdbFg, 650, FY(5), 700, FY(5), { color: '#C0602A', width: 5 });
  const arP = arrow(hdbFg, 650, FY(4), 700, FY(4), { color: '#2E4C8C', width: 5 });

  /* ================= K: calculator close-up ================= */
  const calcShot = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#D3DAE0', '#A7B2BC', true) }, calcShot);
  let brs = '';
  for (let i = 0; i < 22; i++) brs += `M${20 + i * 56},0 L${20 + i * 56},750 `;
  E('path', { d: brs, stroke: '#FFFFFF', 'stroke-width': 3, opacity: 0.18 }, calcShot);
  const calcFg = G(Lfg);
  const calc = sfCalc(calcFg, { text: '0' });
  segDots(calc, '0'); calc.set('0');
  attr(calc.lastChild.firstChild.firstChild, 'fill', 'none');   // the unlit slots run wider than the LCD: hide them
  const typed = mkMath(calcFg, 640, 150, '0.0006 * "0.000 04" =', { size: 48, fill: INK, anchor: 'middle', halo: '#D3DAE0' });
  const cLong = mkChip(calcFg, 'answer too long → **E**', { size: 30, col: '#1E7A4A', fill: '#E6F6EC' });

  /* ================= the cast ================= */
  const LS = 0.84, LY = 520;
  const XS = { kavya: 185, mum: 335, dad: 485, boy: 630, priya: 775, tan: 920 };
  const IXp = 64, IYp = 525, IS = 0.85;          // the Index on the handrail, left
  const EXr = 1010, EYr = 549, ES = 0.55;        // E on the handrail, right
  const kav = cast(Lcast, 'kavya', { s: LS });
  const mum = cast(Lcast, 'mum', { s: LS });
  sfRice(mum.hand, 0.62);
  const dad = cast(Lcast, 'dad', { s: LS });
  const boy = cast(Lcast, 'boy', { s: LS });
  const priya = cast(Lcast, 'priya', { s: LS });
  const tan = cast(Lcast, 'tan', { s: LS });
  const H = { kavya: kav, mum, dad, boy, priya, tan };
  const idx = cast(Lrail, 'index', { s: IS, val: 'n' });
  const ee = cast(Lrail, 'e', { s: ES });
  const X = Object.assign({ index: IXp, e: EXr }, XS);
  const ltE = sfLowerThird(Lhud, 'e');
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cut points */
  const cB = at('hdb') - 0.06, cL2 = at('bent') - 0.06, cK = at('calc') - 0.06, cL3 = at('power') - 0.06;
  const tWrong = at('powers') + 0.05, tDing = mid('floor', 0.6), tOut = mid('e', 0.05);

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const sL = on(t, -1, cB) || on(t, cL2, cK) || on(t, cL3, 1e9), sB = on(t, cB, cL2), sK = on(t, cK, cL3);
    const spk = scWho(S, t);
    const lookAt = k => (spk && X[spk] !== undefined && spk !== k ? clamp((X[spk] - X[k]) / 300, -1, 1) : 0);
    const lookX = (x, k) => clamp((x - X[k]) / 300, -1, 1);
    const show = { kavya: 0, mum: 0, dad: 0, boy: 0, priya: 0, tan: 0 };
    ltE.set(0); stWrong.set(0); stDing.set(0);

    /* ---------- L: the lift ---------- */
    op(liftShot, sL); op(frontWrap, sL); op(cStuck, sL);
    [bDuel, bSort, bTiny, bE, bName].forEach(b => op(b, 0));
    op(idx, 0); op(ee, 0);
    if (sL) {
      lift.dim(1); lift.upd(t); lift.lights(12);
      const flash = t > tWrong && t < tWrong + 0.7 && Math.sin((t - tWrong) * 30) > 0;
      lift.disp.set(flash ? '  ' : '10');
      const t50 = at('card') + 0.2;
      tr(cStuck, 1075, 42, 1 + 0.3 * (1 - P(t, t50, 0.4, easeOut)));

      /* card, mine, powers (and bent) */
      if (t < cB || (t >= cL2 && t < at('order') - 0.06)) {
        op(bDuel, 1);
        popSet(cTitle, t, at('card') + 0.05, at('powers') + 0.1, 600, 124);
        // Priya slaps her card down (right), Ah Boy his (left)
        const pp = P(t, mid('card', 0.35), 0.35, pop), bp = P(t, at('mine') + 0.1, 0.35, pop);
        const bentUp = t >= cL2 ? P(t, cL2, 0.35, ease) : 0;
        op(cardP, clamp(pp * 3)); tr(cardP, PX, CY - 40 * (1 - clamp(pp)) - 20 * bentUp, CS * (1 + 0.12 * bentUp), -6 * bentUp);
        op(cardB, clamp(bp * 3)); tr(cardB, BX, CY - 40 * (1 - clamp(bp)), CS);
        const swap = P(t, tWrong + 0.2, 0.3, linear);
        cardP.hl(t < at('powers') ? P(t, mid('mine', 0.55), 0.3, linear) : t < cB ? 1 - swap : 0);
        cardB.hl(t < at('powers') ? 0 : swap);
        cardP.bent(t >= cL2 ? 1 : 0);
        popSet(cYouWin, t, mid('mine', 0.45), at('powers'), 600, 250);
        stampAt(stWrong, t, tWrong, mid('powers', 0.35), 600, 250, 0.5);
        if (t < cB) {
          popSet(cPowers, t, mid('powers', 0.3), cB, 600, 150);
          write(pw1, t, mid('powers', 0.45), 1e9);
          write(pw2, t, mid('powers', 0.6), 1e9);
          write(pw3, t, mid('powers', 0.78), 1e9);
        } else { cPowers.set(0); op(pw1, 0); op(pw2, 0); op(pw3, 0); }
      }
      /* order, sort */
      if (t >= at('order') - 0.06 && t < at('tiny') - 0.06) {
        op(bSort, 1);
        const g1 = P(t, mid('sort', 0.04), 0.6, ease), g2 = P(t, mid('sort', 0.58), 0.6, ease);
        sCards.forEach((c, i) => {
          const dp = P(t, mid('order', 0.1 + i * 0.16), 0.4, easeOut);
          const x0 = lerp(XS.tan, SLOTX[i], dp), y0 = lerp(430, SY, dp);
          const xg = lerp(x0, SLOTX[GROUP[i]], g1), x = lerp(xg, SLOTX[FINAL[i]], g2);
          const lift_ = (i === 0 || i === 2) && g2 > 0 && g2 < 1 ? Math.sin(Math.PI * g2) * (i === 0 ? -70 : 70) : 0;
          op(c, dp > 0 ? 1 : 0);
          tr(c, x, y0 + lift_, SS, (1 - dp) * 25);
        });
        op(grpLab, t > mid('sort', 0.1) ? P(t, mid('sort', 0.1), 0.3, linear) * (1 - P(t, mid('sort', 0.48), 0.15, linear)) : 0);
        popSet(cSwap, t, mid('sort', 0.5), mid('sort', 0.84), (SLOTX[1] + SLOTX[2]) / 2, 124);
        op(lts, P(t, mid('sort', 0.8), 0.3, linear));
        popSet(cCheck, t, mid('sort', 0.86), 1e9, 570, 124);
      }
      /* tiny, beat */
      if (t >= at('tiny') - 0.06 && t < cK) {
        op(bTiny, 1);
        const bp = P(t, at('tiny') - 0.06, 0.35, pop), pp = P(t, at('beat') + 0.1, 0.35, pop);
        op(cardT, clamp(bp * 3)); tr(cardT, BX, CY - 40 * (1 - clamp(bp)), CS);
        op(cardN, clamp(pp * 3)); tr(cardN, PX, CY - 40 * (1 - clamp(pp)), CS);
        cardN.hl(P(t, mid('beat', 0.8), 0.3, linear));
        popSet(cSmallest, t, mid('tiny', 0.2), at('beat'), 600, 200);
        const np = P(t, mid('beat', 0.3), 0.3, linear);
        op(nl, np); op(nlBg, np); op(nlLab, P(t, mid('beat', 0.4), 0.3, linear));
        nl.mark(0, P(t, mid('beat', 0.35), 0.3, linear)); nl.mark(1, P(t, mid('beat', 0.35), 0.3, linear));
        write(bt1, t, mid('beat', 0.5), 1e9);
        write(bt2, t, mid('beat', 0.6), 1e9);
        write(bt3, t, mid('beat', 0.75), 1e9);
      }
      /* power, means */
      if (t >= cL3 && t < at('name') - 0.06) {
        op(bE, 1);
        op(lcd, P(t, cL3, 0.2, linear));
        const mOn = t >= at('means') - 0.06;
        op(boyPow, !mOn ? P(t, mid('power', 0.35), 0.3, linear) : 0);
        tr(boyPow, 0, 6 * Math.sin(t * 5) * AMP);
        op(boyPowX, mOn ? P(t, mid('means', 0.05), 0.2, linear) : 0);
        boyStrike.set(P(t, mid('means', 0.1), 0.3, linear));
        op(eRing, mOn ? P(t, mid('means', 0.15), 0.2, linear) : 0);
        write(meE, t, mid('means', 0.2), 1e9);
        op(eArrow, mOn ? 1 : 0); eArrow.set(P(t, mid('means', 0.25), 0.3, linear));
        write(me1, t, mid('means', 0.35), 1e9);
        write(me2, t, mid('means', 0.55), 1e9);
        popSet(cExp, t, mid('means', 0.78), 1e9, 790, 345);
      }
      /* name */
      if (t >= at('name') - 0.06) {
        op(bName, 1);
        popSet(nm1, t, mid('name', 0.15), 1e9, 300, 150);
        popSet(nm2, t, mid('name', 0.3), 1e9, 300, 235);
        popSet(nm3, t, mid('name', 0.5), 1e9, 660, 290);
        tr(nm3, 660, 290, 1, 4 * Math.sin(t * 6) * AMP);
      }

      /* the humans */
      ['kavya', 'mum', 'dad', 'boy', 'priya', 'tan'].forEach(k => {
        show[k] = 1;
        tr(H[k], XS[k], LY + (k === 'boy' ? 14 : 0), LS);
        let mood = 'neutral', look = lookAt(k), lift_ = 0;
        if (t < at('mine')) { mood = k === 'priya' ? 'smug' : 'neutral'; look = k === 'priya' ? 0.5 : lookX(PX, k); if (k === 'priya') lift_ = t < mid('card', 0.6) ? 1 : 0; }
        else if (t < at('powers')) { mood = k === 'boy' ? 'happy' : k === 'priya' ? 'smug' : k === 'kavya' ? 'deadpan' : 'neutral'; if (k === 'boy') { lift_ = t < mid('mine', 0.4) ? 1 : 0; look = 0.6; } }
        else if (t < cB) { mood = k === 'priya' ? (t < mid('powers', 0.4) ? 'shock' : 'annoyed') : k === 'boy' ? (t < mid('powers', 0.4) ? 'shock' : 'happy') : 'neutral'; look = k === 'boy' || k === 'priya' ? lookX(BX, k) : lookX(IXp, k); }
        else if (t < at('order')) { mood = k === 'priya' ? 'annoyed' : 'deadpan'; look = k === 'priya' ? 0 : lookX(XS.priya, k); if (k === 'priya') lift_ = 1; }
        else if (t < at('sort')) { mood = k === 'tan' ? 'happy' : 'neutral'; look = lookX(570, k); if (k === 'tan') { lift_ = 1; look = -0.5; } }
        else if (t < at('tiny')) { mood = k === 'kavya' ? 'happy' : 'neutral'; look = k === 'kavya' ? 0.5 : lookX(570, k); }
        else if (t < at('beat')) { mood = k === 'boy' ? 'happy' : 'neutral'; if (k === 'boy') lift_ = 1; look = k === 'boy' ? -0.6 : lookX(BX, k); }
        else if (t < cK) { mood = k === 'priya' ? 'smug' : k === 'boy' ? (t > mid('beat', 0.8) ? 'sad' : 'shock') : 'neutral'; look = k === 'priya' ? 0.5 : lookX(PX, k); }
        else if (t < at('means')) { mood = k === 'boy' ? 'happy' : 'neutral'; look = k === 'boy' ? -0.5 : lookX(XS.boy, k); }
        else if (t < at('name')) { mood = k === 'boy' ? 'shock' : 'neutral'; look = lookX(EXr, k); if (k === 'kavya') mood = 'happy'; }
        else { mood = k === 'boy' ? 'happy' : 'deadpan'; look = lookX(IXp, k); }
        H[k].set({ t, talk: scTalk(S, t, k), mood, look, lift: lift_ });
      });
      // the Index on the handrail (happy only for "exponent")
      op(idx, 1);
      const named = t >= at('name') - 0.06;
      const hop = named ? Math.abs(Math.sin((t - at('name')) * 7)) * 14 * AMP : 0;
      tr(idx, IXp, IYp - hop, IS, named ? 8 * Math.sin(t * 9) * AMP : 0);
      let im = 'smug';
      if (t >= at('powers') && t < cB) im = 'annoyed';
      if (named) im = 'happy';
      idx.set({ t, talk: scTalk(S, t, 'index'), mood: im, look: spk === 'index' || !spk ? 0.5 : lookAt('index'), val: 'n', point: spk === 'index' || named ? 1 : 0 });
      // E on the handrail
      if (t >= cL3) {
        op(ee, 1); tr(ee, EXr, EYr, ES);
        ee.set({ t, talk: scTalk(S, t, 'e'), mood: 'happy', look: spk === 'e' ? -0.3 : lookAt('e') });
      }
    }

    /* ---------- B: Block 208 ---------- */
    op(hdbShot, sB); op(hdbFg, sB);
    if (sB) {
      // hdb
      const hd = t < at('floor') - 0.06;
      op(addr, hd ? P(t, at('hdb') + 0.05, 0.25, linear) : 0);
      br12.set(hd ? P(t, mid('hdb', 0.35), 0.35, linear) : 0);
      br05.set(hd ? P(t, mid('hdb', 0.48), 0.35, linear) : 0);
      op(hiA, P(t, mid('hdb', 0.2), 0.25, linear) * (0.7 + 0.3 * wave(t, 0.7)));
      op(hiB, P(t, mid('hdb', 0.62), 0.25, linear));
      popSet(tag1205, t, mid('hdb', 0.2), 1e9, 1100, FY(12));
      popSet(tag0999, t, mid('hdb', 0.62), 1e9, 1100, FY(9));
      op(hdbNote, hd ? P(t, mid('hdb', 0.62), 0.3, linear) : 0);
      op(hdbNote2, hd ? P(t, mid('hdb', 0.8), 0.3, linear) : 0);
      // floor
      const fl = t >= at('floor') - 0.06 && t < at('win') - 0.06;
      op(flG, fl ? P(t, at('floor') - 0.06, 0.2, linear) : 0);
      flBrP.set(fl ? P(t, mid('floor', 0.25), 0.35, linear) : 0);
      flBrA.set(fl ? P(t, mid('floor', 0.5), 0.35, linear) : 0);
      stampAt(stDing, t, tDing, at('win') - 0.06, 560, 470, 0.42);
      // win
      const wn = t >= at('win') - 0.06;
      op(winT, wn ? P(t, at('win'), 0.25, linear) : 0);
      const fb = P(t, at('win') + 0.1, 0.5, ease), fp = P(t, at('win') + 0.4, 0.5, ease);
      mB.set(wn ? 1 : 0); tr(mB, lerp(ADX, 560, fb), lerp(330, FY(5), fb));
      mP.set(wn ? 1 : 0); tr(mP, lerp(ADX, 560, fp), lerp(330, FY(4), fp));
      op(arB, wn ? 1 : 0); arB.set(P(t, at('win') + 0.6, 0.25, linear));
      op(arP, wn ? 1 : 0); arP.set(P(t, at('win') + 0.9, 0.25, linear));
      // Kavya, then the Index, then Ah Boy dancing
      show.kavya = 1;
      tr(kav, 150, 640, 1.0);
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: t < at('win') ? 'happy' : 'deadpan', look: t < at('floor') ? 0.5 : 1, lift: 0 });
      if (fl) {
        op(idx, 1);
        const p = P(t, at('floor') - 0.06, 0.4, pop);
        tr(idx, 440, 600 + 60 * (1 - clamp(p)), 1.0);
        idx.set({ t, talk: scTalk(S, t, 'index'), mood: 'smug', look: -0.3, val: 'n', point: 1 });
      }
      if (wn) {
        show.boy = 1;
        const p = P(t, at('win') - 0.06, 0.35, pop), dance = Math.sin((t - at('win')) * 10) * AMP;
        tr(boy, 400 + 14 * dance, 650 + 50 * (1 - clamp(p)) - 10 * Math.abs(dance), 1.0, 6 * dance);
        boy.set({ t, talk: scTalk(S, t, 'boy'), mood: 'happy', look: 0.6, lift: 1 });
      }
    }

    /* ---------- K: the calculator ---------- */
    op(calcShot, sK); op(calcFg, sK);
    if (sK) {
      show.priya = 1;
      tr(priya, 1000, 560, 1.45);
      op(priya.hand, 0);
      priya.set({ t, talk: scTalk(S, t, 'priya'), mood: t < at('e') ? 'smug' : 'shock', look: -0.8, lift: 0 });
      const cp = P(t, cK, 0.3, easeOut);
      tr(calc, 640, 430 + 30 * (1 - cp), 0.86);
      const k1 = mid('calc', 0.25), k2 = mid('calc', 0.55), k3 = mid('calc', 0.85);
      calc.set(t < k1 ? '0.0006' : t < k2 ? '0.0006' : t < k3 ? '0.00004' : '2.4E-08');
      calc.press(t > k1 - 0.1 && t < k1 + 0.15 ? '×' : t > k3 - 0.1 && t < k3 + 0.15 ? '=' : '', 1);
      write(typed, t, at('calc'), 1e9);
      // E climbs out of the display
      if (t >= tOut) {
        op(ee, 1);
        const ep = P(t, tOut, 0.6, ease), hopY = Math.sin(Math.PI * ep) * 120;
        tr(ee, lerp(640, 330, ep), lerp(330, 420, ep) - hopY, lerp(0.3, 1.0, ep));
        ee.set({ t, talk: scTalk(S, t, 'e'), mood: 'happy', look: ep > 0.9 ? 0.6 : 0 });
        ltE.set(win(t, tOut + 0.3, tOut + 3.4, 0.3));
        popSet(cLong, t, mid('e', 0.45), 1e9, 330, 230);
      } else cLong.set(0);
    }

    /* characters not in this shot */
    for (const k in show) op(H[k], show[k]);
    if (!sK) op(priya.hand, 1);
  };
});
