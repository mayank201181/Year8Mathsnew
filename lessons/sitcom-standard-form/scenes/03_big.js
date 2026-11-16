/* Scene 3: Club Standard Form (standard form for large numbers).
   Shots (hard sitcom cuts):
   A  space cutaway: Kavya presents her science project: the Sun is 150 000 000 km away; nine digits, zeros pulsing.
   B  the lift: the Index on the handrail: A × 10ⁿ, 1 ≤ A < 10, n an integer -> Dot hops (under protest) along the
      digit tiles 1 5 0 0 0 0 0 0 0, eight hops, to sit after the 1: A = 1.5 -> Kavya numbers the hops: 9 digits,
      8 hops -> 150 000 000 = 1.5 × 10⁸ km, DING! -> Dad counts the zeros of 45 000: 4.5 × 10³ (orange) -> WRONG FLOOR:
      5 digits, 4 hops, 4.5 × 10⁴ -> Mr Tan: the Moon is 3.84 × 10⁵ km away (inset) -> Kavya: the digits slide 5
      places left on a place-value grid: 384 000, the new zeros in Nought's cream -> Nought: "my whole family!"
   C  close shot: Dad and his phone: 256 GB FULL, 1 GB = 10⁹ bytes, 256 × 10⁹ bytes.
   D  Club Standard Form: the guest 256 × 10⁹ at the rope, Norm reads the list: NOT ON THE LIST -> the working:
      256 = 2.56 × 10², so 2.56 × 10¹¹, YOU'RE IN -> the rule: A too big? ÷ 10, power + 1: 34 × 10² = 3.4 × 10³.
   B  the lift again: Dad: "How long can it take?" (STUCK: 40 min, everyone to camera) -> the Index: 2.4 × 10³ seconds
      -> Kavya: = 2400 s = 40 min. */
scene('big', S => {
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
  const scaleAbout = (el, cx, cy, k) => el.setAttribute('transform', `translate(${cx.toFixed(1)} ${cy.toFixed(1)}) scale(${k.toFixed(3)}) translate(${(-cx).toFixed(1)} ${(-cy).toFixed(1)})`);
  const stampAt = (st, t, t0, t1, x, y, s) => { st.set(t >= t0 && t < t1 ? P(t, t0, 0.35, linear) : 0); tr(st, x, y, s); };
  const GOLD = '#FFE45C', ORANGE = '#E8641E', INK = SF.marker, RED = SF.red, GREEN = SF.green;
  // a row of digit tiles (like the place-value grid's tiles), centred at y; tile k centre x = x0 + k * pitch
  const tiles = (parent, digits, x0, y, o) => {
    o = o || {};
    const pitch = o.pitch || 72, w = o.w || 64, h = o.h || 76, g = G(parent); g.t = [];
    String(digits).split('').forEach((ch, k) => {
      const tg = G(g), cx = x0 + k * pitch, zero = ch === '0' && o.cream;
      const r = E('rect', { x: cx - w / 2, y: y - h / 2, width: w, height: h, rx: 10, fill: zero ? SF.holder : SF.tile, stroke: zero ? SF.holderInk : MK.ink, 'stroke-width': 3 }, tg);
      const tx = T(tg, cx, y + h * 0.22, ch, { size: o.size || 48, weight: 800, anchor: 'middle', fill: zero ? SF.holderInk : MK.ink });
      g.t.push({ g: tg, r, tx, cx, cy: y });
    });
    return g;
  };

  /* layers */
  const Lbg = G(root), Lboard = G(root), Lcast = G(root), Lfront = G(root), Lrail = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= A: space (Kavya's project) ================= */
  const spaceShot = G(Lbg);
  const space = sfSpace(spaceShot);
  const spaceFg = G(Lfg);
  const sunLine = E('path', { d: 'M150,398 L484,398', stroke: '#FFFFFF', 'stroke-width': 4, 'stroke-dasharray': '14 10' }, spaceFg);
  const sunLab = mkMath(spaceFg, 317, 368, '"150 000 000 km"', { size: 32, fill: '#FFFFFF', anchor: 'middle', halo: '#0E1430' });
  const projChip = mkChip(spaceFg, "Kavya's **science project**", { size: 30, col: '#9FD8FF' });
  const bigDigits = tiles(spaceFg, '150000000', 618, 190, { pitch: 62, w: 56, h: 72, size: 44 });
  const tooMany = mkChip(spaceFg, 'too many **zeros**!', { size: 32, col: '#FF8A8A' });

  /* ================= B: the lift ================= */
  const liftShot = G(Lbg);
  const lift = sfLift(liftShot);
  const frontWrap = G(Lfront);
  frontWrap.appendChild(lift.front); frontWrap.appendChild(lift.top);
  const cStuck30 = pill(Lfg, 'STUCK: 30 min', { size: 26, color: '#FF8A8A', stroke: '#FF8A8A' });
  const cStuck40 = pill(Lfg, 'STUCK: 40 min', { size: 26, color: '#FF8A8A', stroke: '#FF8A8A' });

  // sf: A × 10ⁿ
  const bSF = G(Lboard);
  const SFY = 236, sfSize = 92;
  const sfW = mkMeasure('A * 10^n', { size: sfSize }).w, sfA = mkMeasure('A', { size: sfSize }).w;
  const sfN = mkMeasure('10^n', { size: sfSize }).w - mkMeasure('10', { size: sfSize }).w;
  const sfX0 = 600 - sfW / 2;
  const sfMath = mkMath(bSF, 600, SFY, 'A * 10^n', { size: sfSize, fill: INK, anchor: 'middle' });
  const sfChip = mkChip(bSF, '**standard form**', { size: 30, col: INK, fill: 'rgba(255,253,246,0.95)' });
  const braceA = mkBrace(bSF, sfX0 - 6, SFY + 16, sfX0 + sfA + 6, SFY + 16, { text: '{{1 <= A < 10}}', col: RED, size: 32, flip: true });
  const nX = sfX0 + sfW - sfN / 2;
  const nLab = G(bSF);
  mkText(nLab, nX + 90, 170, '**n**: an integer', { size: 32, fill: GREEN });
  const nArr = arrow(nLab, nX + 82, 160, nX + 22, 160, { color: GREEN, width: 4 });

  // hop and count: 1 5 0 0 0 0 0 0 0 and Dot
  const bHop = G(Lboard);
  const TX = 262, TY = 185, PITCH = 72;
  const gapX = j => TX - PITCH / 2 + PITCH * j;          // between tile j-1 and tile j
  const hop = tiles(bHop, '150000000', TX, TY);
  const hopArcs = G(bHop), hopNums = [];
  for (let i = 1; i <= 8; i++) {
    const a = gapX(10 - i), b = gapX(9 - i), hg = G(hopArcs);
    const ar = arrow(hg, a, 262, b + 4, 262, { color: '#8A3A8E', width: 4, bend: -22 });
    const n = T(hg, (a + b) / 2, 318, String(i), { size: 30, weight: 800, anchor: 'middle', fill: '#8A3A8E' });
    hopNums.push({ hg, ar, n });
  }
  const cA15 = mkChip(bHop, '{{A = 1.5}}', { size: 36, col: '#8A3A8E', fill: 'rgba(255,253,246,0.96)' });
  const c98 = mkChip(bHop, '**9** digits\n→ **8** hops', { size: 30, col: INK, fill: 'rgba(255,253,246,0.96)' });

  // n8
  const bN8 = G(Lboard);
  const n8a = mkMath(bN8, 600, 200, '"150 000 000" = 1.5 * 10^8 "km"', { size: 54, fill: INK, anchor: 'middle' });
  const n8b = mkMath(bN8, 600, 278, '"check:" 1.5 * "100 000 000" = "150 000 000"', { size: 34, fill: '#5A6670', anchor: 'middle' });
  const stDing = sfStamp(Lfg, 'ding');

  // zeros and places: 45 000
  const bZ = G(Lboard);
  const z = tiles(bZ, '45000', TX, TY);
  const rings = [2, 3, 4].map(k => E('ellipse', { cx: TX + k * PITCH, cy: TY, rx: 42, ry: 50, fill: 'none', stroke: ORANGE, 'stroke-width': 6 }, bZ));
  const dadAns = mkMath(bZ, 640, 208, '= 4.5 * 10^3', { size: 58, fill: ORANGE });
  const rightAns = mkMath(bZ, 640, 208, '= 4.5 * 10^4', { size: 58, fill: INK });
  const fiveD = mkText(bZ, TX + 2 * PITCH, 130, '**5** digits', { size: 30, fill: INK, anchor: 'middle' });
  const zArcs = [];
  for (let i = 1; i <= 4; i++) {
    const a = gapX(6 - i), b = gapX(5 - i), hg = G(bZ);
    const ar = arrow(hg, a, 262, b + 4, 262, { color: '#8A3A8E', width: 4, bend: -22 });
    T(hg, (a + b) / 2, 318, String(i), { size: 30, weight: 800, anchor: 'middle', fill: '#8A3A8E' });
    zArcs.push({ hg, ar });
  }
  const cPlaces = mkChip(bZ, 'count **places**, not zeros', { size: 30, col: RED, fill: 'rgba(255,253,246,0.96)' });
  const stWrong = sfStamp(Lfg, 'wrong');

  // moon and back
  const bMoon = G(Lboard);
  const moonTxt = mkText(bMoon, 440, 222, 'Moon: {{3.84 * 10^5}} km', { size: 54, fill: INK, anchor: 'middle' });
  const inset = G(bMoon);
  const IX = 820, IY = 112, IW = 230, IH = 160;
  const icp = E('clipPath', { id: 'sfBigInset' }, defs()); E('rect', { x: IX, y: IY, width: IW, height: IH, rx: 12 }, icp);
  const inClip = G(inset, { 'clip-path': 'url(#sfBigInset)' }), inView = G(inClip);
  sfSpace(inView);
  inView.setAttribute('transform', `translate(${IX + IW / 2} ${IY + IH / 2 + 6}) scale(1.6) translate(-560 -380)`);
  E('rect', { x: IX, y: IY, width: IW, height: IH, rx: 12, fill: 'none', stroke: '#5A6670', 'stroke-width': 5 }, inset);
  T(inset, IX + 50, IY + IH - 16, 'Earth', { size: 26, weight: 700, anchor: 'middle', fill: '#FFFFFF' });
  T(inset, IX + IW - 46, IY + 36, 'Moon', { size: 26, weight: 700, anchor: 'middle', fill: '#FFFFFF' });
  const bBack = G(Lboard);
  const grid = sfPVGrid(bBack, { from: 5, to: -2, cell: 76, rows: 1, head: 'power', size: 28 });
  tr(grid, 600 - grid.W / 2, 112);
  const r384 = grid.num('3.84', 0), r384k = grid.num('384000', 0);
  const backEq = mkMath(bBack, 600, 330, '3.84 * 10^5 = "384 000 km"', { size: 44, fill: INK, anchor: 'middle' });
  const cFive = mkChip(bBack, 'digits **5 places left**', { size: 28, col: INK, fill: 'rgba(255,253,246,0.96)' });

  // long, sofar, said
  const bEnd = G(Lboard);
  const so1 = mkMath(bEnd, 600, 210, '"So far:" 2.4 * 10^3 "seconds"', { size: 60, fill: INK, anchor: 'middle' });
  const so2 = mkMath(bEnd, 600, 310, '2.4 * 10^3 = 2400 "s" = 40 "min"', { size: 54, fill: GREEN, anchor: 'middle' });

  /* ================= C: close shot, Dad and his phone ================= */
  const closeShot = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#D3DAE0', '#A7B2BC', true) }, closeShot);
  let brs = '';
  for (let i = 0; i < 22; i++) brs += `M${20 + i * 56},0 L${20 + i * 56},750 `;
  E('path', { d: brs, stroke: '#FFFFFF', 'stroke-width': 3, opacity: 0.18 }, closeShot);
  E('path', { d: 'M640,0 L640,750', stroke: '#8C98A4', 'stroke-width': 6 }, closeShot);
  const closeFront = G(Lfront);
  E('rect', { x: 0, y: 662, width: 1200, height: 88, fill: linGrad('#9AA6B2', '#6E7A86', true) }, closeFront);
  E('rect', { x: 0, y: 642, width: 1200, height: 28, rx: 12, fill: linGrad('#F2F5F7', '#9AA6B2', true), stroke: '#5A6670', 'stroke-width': 3 }, closeFront);
  const phone = sfPhone(Lfg, { screen: 'storage' });
  const ph1 = mkMath(Lfg, 910, 250, '1 "GB" = 10^9 "bytes"', { size: 46, fill: INK, anchor: 'middle' });
  const ph2 = mkMath(Lfg, 910, 350, '256 "GB" = 256 * 10^9 "bytes"', { size: 40, fill: INK, anchor: 'middle' });

  /* ================= D: Club Standard Form ================= */
  const clubShot = G(Lbg);
  const club = sfClub(clubShot);
  const clubFg = G(Lfg);
  const GUEST = [235, 540];
  const guest = (src) => {   // a number queuing at the rope: a chip with little legs
    const g = G(clubFg);
    E('path', { d: 'M-24,30 L-28,70 M24,30 L28,70', stroke: '#FFE45C', 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
    E('ellipse', { cx: -32, cy: 72, rx: 14, ry: 7, fill: '#B3122E' }, g); E('ellipse', { cx: 32, cy: 72, rx: 14, ry: 7, fill: '#B3122E' }, g);
    const c = mkChip(g, `{{${src}}}`, { size: 44, col: '#FFE45C', fill: 'rgba(12,10,16,0.92)' }); c.set(1);
    g.chip = c;
    return g;
  };
  const g256 = guest('256 * 10^9'), g256f = guest('2.56 * 10^11'), g34 = guest('34 * 10^2'), g34f = guest('3.4 * 10^3');
  const w256c = mkMeasure('256 * 10^9', { size: 44 * 1.06 }).w, w256 = mkMeasure('256', { size: 44 * 1.06 }).w;
  const ring256 = E('ellipse', { cx: -w256c / 2 + w256 / 2, cy: -2, rx: w256 / 2 + 14, ry: 34, fill: 'none', stroke: '#FF5A5A', 'stroke-width': 5 }, g256);
  const notLess = mkText(clubFg, 250, 432, '{{A = 256}}: not {{< 10}}', { size: 34, fill: '#FF8A8A', anchor: 'middle' });
  const stList = sfStamp(Lfg, 'list'), stIn = sfStamp(Lfg, 'in');
  const card = G(clubFg);
  E('rect', { x: 36, y: 240, width: 660, height: 200, rx: 16, fill: '#FFFDF6', stroke: '#C9A44A', 'stroke-width': 4 }, card);
  const fixW = mkWorking(card, 300, 262, ['256 = 2.56 * 10^2', '256 * 10^9 = 2.56 * 10^2 * 10^9', '= 2.56 * 10^11'], { size: 36, fill: MK.ink, gap: 22 });
  const addNote = mkText(card, 500, fixW.lineY[2], '(2 + 9 = 11)', { size: 28, fill: '#1E7A4A' });
  const ruleG = G(card);
  mkText(ruleG, 366, 292, '**A** too big? {{÷ 10}}, and the power {{+ 1}}', { size: 32, fill: MK.ink, anchor: 'middle' });
  mkMath(ruleG, 366, 360, '34 * 10^2 = 3.4 * 10^3', { size: 42, fill: '#2E4C8C', anchor: 'middle' });
  mkText(ruleG, 366, 418, 'both = 3400', { size: 30, fill: '#5A6670', anchor: 'middle' });

  /* ================= the cast ================= */
  const LS = 0.84, LY = 520;
  const XS = { kavya: 185, mum: 335, dad: 485, boy: 630, priya: 775, tan: 920 };
  const IXp = 64, IYp = 525, IS = 0.85;          // the Index on the handrail, left
  const NX = 1010, NY = 549, NS = 0.5;           // Nought on the handrail, right
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
  const nought = cast(Lrail, 'nought', { s: NS });
  const dot = cast(Lboard, 'dot', { s: 0.34 });
  const X = Object.assign({ index: IXp, nought: NX, dot: 600 }, XS);
  const lt = { norm: sfLowerThird(Lhud, 'norm') };
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cut points */
  const cB = at('sf') - 0.06, cC = at('phone') - 0.06, cD = at('norm') - 0.06, cE = at('long') - 0.06;
  const tHop0 = mid('hop', 0.3), tHop1 = mid('hop', 0.88);      // Dot's eight hops
  const tWrong = at('places') + 0.05;

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const sA = on(t, -1, cB), sB = on(t, cB, cC) || on(t, cE, 1e9), sC = on(t, cC, cD), sD = on(t, cD, cE);
    lt.norm.set(0);
    const spk = scWho(S, t);
    const lookAt = k => (spk && X[spk] !== undefined && spk !== k ? clamp((X[spk] - X[k]) / 300, -1, 1) : 0);
    const show = { kavya: 0, mum: 0, dad: 0, boy: 0, priya: 0, tan: 0 };

    /* ---------- A: space ---------- */
    op(spaceShot, sA); op(spaceFg, sA);
    if (sA) {
      space.upd(t);
      show.kavya = 1;
      tr(kav, 175, 600, 1.1);
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: t < mid('project', 0.7) ? 'happy' : 'annoyed', look: 0.5 });
      projChip.set(P(t, at('project') + 0.1, 0.35, linear)); tr(projChip, 330, 140);
      const pl = P(t, mid('project', 0.15), 0.5, easeOut);
      op(sunLine, pl); op(sunLab, pl);
      bigDigits.t.forEach((d, k) => {
        op(d.g, P(t, mid('project', 0.3) + k * 0.08, 0.2, linear));
        const zero = k >= 2, pulse = zero && t > mid('project', 0.62) ? wave(t, 0.7, k * 0.12) : 0;
        attr(d.r, 'fill', pulse > 0.5 ? '#FFD6D6' : SF.tile);
        attr(d.r, 'stroke', pulse > 0.5 ? RED : MK.ink);
        scaleAbout(d.g, d.cx, d.cy, 1 + 0.1 * pulse * AMP);
      });
      popSet(tooMany, t, mid('project', 0.7), 1e9, 880, 300);
    }

    /* ---------- B: the lift ---------- */
    op(liftShot, sB); op(frontWrap, sB); op(Lboard, sB); op(Lrail, sB);
    op(cStuck30, 0); op(cStuck40, 0);
    [bSF, bHop, bN8, bZ, bMoon, bBack, bEnd].forEach(b => op(b, 0));
    stDing.set(0); stWrong.set(0); op(dot, 0); op(nought, 0);
    if (sB) {
      lift.upd(t); lift.dim(1); lift.lights(12);
      const flash = t > tWrong && t < tWrong + 0.7 && Math.sin((t - tWrong) * 30) > 0;
      lift.disp.set(flash ? '  ' : '10');
      const t40 = mid('long', 0.5);
      op(cStuck30, t < t40 ? 1 : 0); op(cStuck40, t >= t40 ? 1 : 0);
      tr(cStuck30, 1075, 42); tr(cStuck40, 1075, 42, t >= t40 ? 1 + 0.3 * (1 - P(t, t40, 0.4, easeOut)) : 1);

      /* sf: A × 10ⁿ */
      if (t < at('hop') - 0.06) {
        op(bSF, 1);
        write(sfMath, t, mid('sf', 0.12), 1e9);
        popSet(sfChip, t, mid('sf', 0.05), 1e9, 600, 126);
        braceA.set(P(t, mid('sf', 0.42), 0.4, linear));
        op(nLab, P(t, mid('sf', 0.78), 0.3, linear)); nArr.set(P(t, mid('sf', 0.8), 0.3, linear));
      }
      /* hop, count: Dot hops along 1 5 0 0 0 0 0 0 0 */
      if (t >= at('hop') - 0.06 && t < at('n8') - 0.06) {
        op(bHop, 1);
        hop.t.forEach((d, k) => { op(d.g, k >= 2 && t > tHop1 + 0.2 ? 1 - 0.6 * P(t, tHop1 + 0.2, 0.3, linear) : 1); });
        // Dot: eight hops from after the last digit to just after the 1
        op(dot, 1);
        const hp = clamp((t - tHop0) / (tHop1 - tHop0)) * 8, hi = Math.min(7, Math.floor(hp)), hf = hp - hi;
        const xa = gapX(9 - hi), xb = gapX(8 - hi), inAir = t > tHop0 && t < tHop1;
        const dx = t <= tHop0 ? gapX(9) : t >= tHop1 ? gapX(1) : lerp(xa, xb, ease(hf));
        const dy = 246 - (inAir ? 118 * Math.sin(Math.PI * hf) : 0);
        tr(dot, dx, dy, 0.34);
        X.dot = dx;
        dot.set({ t, talk: scTalk(S, t, 'dot'), mood: t < tHop1 + 0.3 ? 'annoyed' : 'neutral', look: inAir ? -0.8 : 0, hop: inAir ? 1 : 0 });
        // the hops, numbered as Kavya counts them
        hopNums.forEach((h, i) => {
          const done = clamp(hp - i);
          const cp = P(t, mid('count', 0.08 + i * 0.07), 0.2, linear);
          op(h.hg, t < at('count') ? (done > 0 ? 1 : 0) : 1);
          h.ar.set(t < at('count') ? done : 1);
          op(h.n, cp);
        });
        popSet(cA15, t, tHop1 + 0.3, 1e9, 965, 185);
        popSet(c98, t, mid('count', 0.7), 1e9, 965, 300);
      }
      /* n8 */
      if (t >= at('n8') - 0.06 && t < at('zeros') - 0.06) {
        op(bN8, 1);
        write(n8a, t, at('n8'), 1e9);
        write(n8b, t, mid('n8', 0.55), 1e9);
        stampAt(stDing, t, mid('n8', 0.42), 1e9, 600, 345, 0.6);
      }
      /* zeros, places: 45 000 */
      if (t >= at('zeros') - 0.06 && t < at('moon') - 0.06) {
        op(bZ, 1);
        z.t.forEach((d, k) => op(d.g, P(t, mid('zeros', 0.15) + k * 0.06, 0.2, linear)));
        rings.forEach((r, i) => { const p = P(t, mid('zeros', 0.38) + i * 0.1, 0.25, linear); op(r, t < mid('places', 0.3) ? p : 1 - P(t, mid('places', 0.3), 0.2, linear)); });
        write(dadAns, t, mid('zeros', 0.68), mid('places', 0.35));
        stampAt(stWrong, t, tWrong, mid('places', 0.4), 830, 200, 0.5);
        op(fiveD, P(t, mid('places', 0.42), 0.25, linear));
        zArcs.forEach((h, i) => { const p = P(t, mid('places', 0.48) + i * 0.08, 0.25, linear); op(h.hg, p > 0 ? 1 : 0); h.ar.set(p); });
        write(rightAns, t, mid('places', 0.6), 1e9);
        popSet(cPlaces, t, mid('places', 0.25), 1e9, 840, 300);
      }
      /* moon, back, family */
      if (t >= at('moon') - 0.06 && t < cC) {
        op(bMoon, t < at('back') - 0.06 ? 1 : 0);
        op(moonTxt, P(t, mid('moon', 0.35), 0.35, linear)); tr(moonTxt, -18 * (1 - P(t, mid('moon', 0.35), 0.35, easeOut)), 0);
        op(inset, P(t, mid('moon', 0.1), 0.3, linear));
        if (t >= at('back') - 0.06) {
          op(bBack, 1);
          const done = mid('back', 0.62);
          r384.set(t < done ? P(t, at('back'), 0.25, linear) : 1 - P(t, done, 0.2, linear));
          r384.shift(5 * P(t, mid('back', 0.12), 1.4, ease));
          r384k.set(P(t, done, 0.25, linear));
          // family: the cream zeros pulse
          r384k.tiles.forEach((tg, k) => {
            const pulse = k >= 3 && t > at('family') ? wave(t, 0.6, k * 0.15) : 0;
            const cx = grid.x(5 - k) + 0, cy = grid.rowY(0);
            scaleAbout(tg, cx, cy, 1 + 0.12 * pulse * AMP);
          });
          popSet(cFive, t, mid('back', 0.12), 1e9, 160, 300);
          write(backEq, t, mid('back', 0.7), 1e9);
        }
      }
      /* long, sofar, said */
      if (t >= cE) {
        op(bEnd, 1);
        write(so1, t, mid('sofar', 0.2), 1e9);
        write(so2, t, mid('said', 0.25), 1e9);
      }

      /* the humans */
      ['kavya', 'mum', 'dad', 'boy', 'priya', 'tan'].forEach(k => {
        show[k] = 1;
        tr(H[k], XS[k], LY + (k === 'boy' ? 14 : 0), LS);
        let mood = 'neutral', look = lookAt(k), lift_ = 0;
        if (t < at('hop')) { look = lookAt('index') || clamp((IXp - XS[k]) / 300, -1, 1); }
        else if (t < at('count')) { look = clamp((X.dot - XS[k]) / 300, -1, 1); mood = k === 'boy' ? 'happy' : 'neutral'; }
        else if (t < at('n8')) { mood = k === 'kavya' ? 'happy' : 'neutral'; }
        else if (t < at('zeros')) { mood = 'happy'; }
        else if (t < at('places')) { mood = k === 'dad' ? 'smug' : k === 'kavya' ? 'deadpan' : 'neutral'; if (k === 'dad') { lift_ = 1; look = 0.3; } }
        else if (t < at('moon')) { mood = k === 'dad' ? (t < mid('places', 0.5) ? 'shock' : 'sad') : k === 'kavya' ? 'smug' : 'neutral'; }
        else if (t < at('back')) { mood = k === 'tan' ? 'happy' : 'neutral'; if (k === 'tan') { lift_ = 1; look = -0.5; } }
        else if (t < at('family')) { mood = k === 'kavya' ? 'happy' : 'neutral'; }
        else if (t < cC) { mood = 'happy'; look = clamp((NX - XS[k]) / 300, -1, 1); }
        else if (t < at('sofar')) {   // "How long can it take?": everyone to camera, deadpan
          if (t > mid('long', 0.6)) { mood = k === 'dad' ? 'neutral' : 'deadpan'; look = 0; }
          else { mood = k === 'dad' ? 'neutral' : 'deadpan'; }
        }
        else if (t < at('said')) { mood = 'neutral'; look = lookAt('index') || clamp((IXp - XS[k]) / 300, -1, 1); }
        else { mood = k === 'dad' ? 'sad' : 'deadpan'; if (k === 'kavya') look = 0.6; else if (k === 'dad') look = -0.6; else look = t > mid('said', 0.7) ? 0 : look; }
        H[k].set({ t, talk: scTalk(S, t, k), mood, look, lift: lift_ });
      });
      // the Index on the handrail
      let im = 'smug', ipt = 0;
      if (t >= at('places') && t < at('moon')) { im = 'annoyed'; ipt = t < mid('places', 0.4) ? 1 : 0; }
      if (spk === 'index') ipt = 1;
      tr(idx, IXp, IYp, IS);
      idx.set({ t, talk: scTalk(S, t, 'index'), mood: im, look: spk === 'index' || !spk ? 0.5 : lookAt('index'), val: 'n', point: ipt });
      // Nought pops up for "my whole family"
      if (t >= at('family') - 0.15 && t < cC) {
        op(nought, 1);
        const p = P(t, at('family') - 0.15, 0.4, pop);
        tr(nought, NX, NY + 140 * (1 - clamp(p)), NS);
        nought.set({ t, talk: scTalk(S, t, 'nought'), mood: 'happy', look: -0.8, badge: 1, wave: 1 });
      }
    }

    /* ---------- C: Dad and his phone ---------- */
    op(closeShot, sC); op(closeFront, sC); op(phone, 0); op(ph1, 0); op(ph2, 0);
    if (sC) {
      show.dad = 1;
      tr(dad, 245, 430, 1.7);
      dad.set({ t, talk: scTalk(S, t, 'dad'), mood: 'smug', look: 0.5, lift: 0 });
      op(dad.hand, 0);
      const pp = P(t, at('phone') + 0.05, 0.4, pop);
      op(phone, clamp(pp * 3)); tr(phone, 535, 400 + 60 * (1 - clamp(pp)), 0.85, -6);
      write(ph1, t, mid('phone', 0.38), 1e9);
      write(ph2, t, mid('phone', 0.62), 1e9);
    }

    /* ---------- D: Club Standard Form ---------- */
    op(clubShot, sD); op(clubFg, sD); stList.set(0); stIn.set(0);
    if (sD) {
      const tFixIn = mid('fix', 0.82), tNew = mid('toobig', 0.25), t34In = mid('toobig', 0.78);
      // the rope: closed; open for 2.56 × 10¹¹; closed for the next guest; open again
      club.rope(t < tFixIn ? 0 : t < tNew ? P(t, tFixIn, 0.6, ease) : t < t34In ? 0 : P(t, t34In, 0.6, ease));
      // Norm
      tr(norm, 845, 470, 1);
      const nl = t < mid('norm', 0.5) ? P(t, mid('norm', 0.05), 0.3, ease) : 1 - P(t, mid('norm', 0.5), 0.25, ease);
      const ns = t < at('fix') ? P(t, mid('norm', 0.55), 0.25, pop) : 1 - P(t, at('fix'), 0.3, ease);
      norm.set({ t, talk: scTalk(S, t, 'norm'), mood: 'deadpan', look: -0.7, list: t < at('fix') ? nl : t > mid('toobig', 0.1) && t < t34In ? 0.6 : 0, stop: ns });
      lt.norm.set(win(t, at('norm') + 0.1, at('norm') + 3.2, 0.3));
      // the guests
      [g256, g256f, g34, g34f].forEach(g => op(g, 0));
      const walk = (g, t0) => { const w = P(t, t0, 1.0, easeIn); op(g, 1 - P(t, t0 + 0.7, 0.3, linear)); tr(g, lerp(GUEST[0], 640, w), GUEST[1] - 6 * Math.abs(Math.sin(t * 9)) * (w > 0 && w < 1 ? 1 : 0)); };
      if (t < mid('fix', 0.78)) { op(g256, 1); tr(g256, GUEST[0], GUEST[1] - 4 * Math.abs(Math.sin(t * 3))); }
      else if (t < tNew) { walk(g256f, tFixIn + 0.4); if (t < tFixIn + 0.4) { op(g256f, 1); tr(g256f, GUEST[0], GUEST[1]); } }
      else if (t < mid('toobig', 0.72)) { const p = P(t, tNew, 0.4, pop); op(g34, clamp(p * 3)); tr(g34, lerp(-120, GUEST[0], clamp(p)), GUEST[1]); }
      else { op(g34f, 1); tr(g34f, GUEST[0], GUEST[1]); if (t > t34In + 0.4) walk(g34f, t34In + 0.4); }
      op(ring256, t < at('fix') ? P(t, mid('norm', 0.62), 0.25, linear) : 0);
      fadeWin(notLess, t, mid('norm', 0.66), at('fix') + 0.2);
      stampAt(stList, t, mid('norm', 0.58), at('fix'), 300, 300, 0.55);
      // the working, then the rule
      op(card, t >= at('fix') ? P(t, at('fix'), 0.25, linear) : 0);
      fixW.show(0, P(t, mid('fix', 0.08), 0.35, linear));
      fixW.show(1, P(t, mid('fix', 0.4), 0.35, linear));
      fixW.show(2, P(t, mid('fix', 0.62), 0.35, linear));
      fixW.ring(2, P(t, mid('fix', 0.75), 0.25, linear));
      op(addNote, t < at('toobig') ? P(t, mid('fix', 0.66), 0.3, linear) : 0);
      op(fixW, t < at('toobig') ? 1 : 0); op(ruleG, t >= at('toobig') ? P(t, at('toobig'), 0.3, linear) : 0);
      stampAt(stIn, t, t < at('toobig') ? tFixIn : t34In, t < at('toobig') ? at('toobig') : 1e9, 600, 585, 0.5);
    }

    /* characters not in this shot */
    for (const k in show) op(H[k], show[k]);
    if (!sC) op(dad.hand, 1);
    op(idx, sB); op(norm, sD);
  };
});
