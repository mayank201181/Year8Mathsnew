/* Scene 1: The Blue House banner (multiplying decimals).
   Shots (hard sitcom cuts):
   T  nine     the Blue House tent: the banner on its poles, Mum (lower third) paints the tiger; Priya, Kavya watch.
   S  size     close-up of the banner: 2.3 m and 1.4 m dimension arrows; "area = 2.3 × 1.4".
   B  calc     the whiteboard: Priya writes 23 × 14 = 322 and "322 m²" in red.
      ship     Dot hops onto the paint tin; a cruise ship with the banner as its sail slides past; MISSING THE POINT.
      est      Estimate first: 2.3 × 1.4 ≈ 2 × 1.5 = 3, "about 3".
      int      Kavya's working: 23 × 14 = 322 / 1 + 1 = 2 / 2.3 × 1.4 = 3.22 m² (ringed); tick by "≈ 3".
      rule     "Places in = places out"; POINT TAKEN.
   S  split    SHOWPIECE: the banner cuts into four pieces 2, 0.8, 0.3, 0.12; the sum; the camera dives into the
               corner: 3 × 4 hundredth squares, "tenths × tenths = hundredths".
   T  boy      Ah Boy (lower third) pops up in front of the table: "0.3 × 0.2 = 0.6 ?"
   B  tenths   Dot: 3 × 2 = 6, two decimal places, 0.06; the 0.6 crossed out.
   T  paint    Dad (lower third) arrives: the $13.50 / litre tag, "need 2.4 litres"; he pats his pockets.
   B  money    Kavya: estimate 2.5 × 13 = 32.5; 24 × 135 = 3240, 1 + 1 = 2 places, $32.40; Dad finds his calculator.
      zeros    Priya: 1.25 × 0.8, 125 × 8 = 1000, "drop the zeros: 1", "3 d.p.: 0.001" in red.
      first    Dot: place the point first: 1.000 (count 1, 2, 3), then tidy the zeros: 1; the 0.001 struck out.
   T  basic    Priya shrugs: "× 1000 out"; everyone deadpan. Hold. */
scene('banner', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);          // hard sitcom cut
  const view = (el, k, fx, fy, sx, sy) => el.setAttribute('transform', `translate(${sx.toFixed(1)} ${sy.toFixed(1)}) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const popSet = (el, t, t0, t1, x, y) => { const p = t >= t0 && t < t1 ? P(t, t0, 0.35, linear) : 0; el.set(p); if (x !== undefined) tr(el, x, y); };
  const fadeIn = (el, t, t0, t1) => op(el, t < t1 ? P(t, t0, 0.3, linear) : 0);
  const GOLD = '#FFE45C', RED = '#D32F2F', GREEN = '#1E9E5A', BLUE = '#1E5FC0', INK = MK.ink, GREY = '#5A6670';
  const WM = { size: 46, fill: INK, anchor: 'middle' };

  /* layers: set, characters behind the table, the table, props on it, close-up art, board, pop-ups, HUD */
  const Lset = G(root), Lclose = G(root), Lmid = G(root), Lfront = G(root), Ltop = G(root), Lboard = G(root), Lpop = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= T: the Blue House tent ================= */
  const tent = drTent(Lset);
  Lfront.appendChild(tent.front);
  // the banner on its poles, left
  const banT = drBannerCloth(Lmid, { w: 360, h: 219 }); tr(banT, 290, 318);
  const banTxt = banT.children[3], banTiger = banT.children[4];
  // the paint tin on the table (and the price tag)
  const paintTin = (parent) => {
    const g = G(parent);
    E('path', { d: 'M-46,-70 L46,-70 L42,0 L-42,0 Z', fill: '#C9D3DC', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
    E('rect', { x: -44, y: -58, width: 88, height: 42, fill: DR_BLUE }, g);
    T(g, 0, -28, 'PAINT', { size: 26, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
    E('ellipse', { cx: 0, cy: -70, rx: 46, ry: 9, fill: '#3E7FE6', stroke: SC_INK, 'stroke-width': 3 }, g);
    return g;
  };
  const tinT = paintTin(Ltop); tr(tinT, 400, 528);
  const tag = mkPriceTag(Lfg, '$13.50 / litre', { size: 32 });
  const cNeed = mkChip(Lfg, 'need **2.4 litres**', { size: 28, col: GOLD });
  const c9 = mkChip(Lfg, '**9 a.m.**', { size: 32, col: GOLD });
  const bubBoy = mkSpeechBubble(Lfg, '{{0.3 × 0.2 = 0.6}} ?', { size: 36, tail: 'right' });
  const cBasic = mkChip(Lfg, '{{× 1000}} out', { size: 34, col: '#FF8A8A' });

  /* ================= S: the banner close-up ================= */
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#1C3F66', '#0D2238', true) }, Lclose);
  const sWrap = G(Lclose);
  const BW = 640, BH = 390, BX0 = 200, BY0 = 170;                // the banner, 2.3 m by 1.4 m
  const banS = drBannerCloth(sWrap, { w: BW, h: BH }); tr(banS, BX0 + BW / 2, BY0 + BH / 2);
  op(banS.children[0], 0); op(banS.children[1], 0);              // no poles in the close-up
  const XC = BX0 + BW * 2 / 2.3, YC = BY0 + BH * 1 / 1.4;        // the cuts at 2 m and 1 m
  // dimension arrows
  const dims = G(sWrap);
  const dbl = (x1, y1, x2, y2) => { const mx = (x1 + x2) / 2, my = (y1 + y2) / 2; arrow(dims, mx, my, x1, y1, { color: GOLD, width: 5 }); arrow(dims, mx, my, x2, y2, { color: GOLD, width: 5 }); };
  dbl(BX0, 132, BX0 + BW, 132);
  dbl(BX0 + BW + 34, BY0, BX0 + BW + 34, BY0 + BH);
  const dW = mkChip(sWrap, '{{2.3}} m', { size: 34, col: GOLD });
  const dH = mkChip(sWrap, '{{1.4}} m', { size: 34, col: GOLD });
  const cArea = mkChip(Lfg, '**area** = {{2.3 × 1.4}}', { size: 34, col: '#9CC8FF' });
  // the four pieces
  const pieces = G(sWrap);
  const PC = ['#7FB8FF', '#FFD36B', '#8FE3A8', '#FF9CB8'];
  const pRect = [[BX0, BY0, XC - BX0, YC - BY0], [BX0, YC, XC - BX0, BY0 + BH - YC], [XC, BY0, BX0 + BW - XC, YC - BY0], [XC, YC, BX0 + BW - XC, BY0 + BH - YC]]
    .map(([x, y, w, h], i) => E('rect', { x, y, width: w, height: h, fill: PC[i], opacity: 0.92, stroke: INK, 'stroke-width': 3 }, pieces));
  const cutV = mkDash(E('line', { x1: XC, y1: BY0 - 14, x2: XC, y2: BY0 + BH + 14, stroke: RED, 'stroke-width': 6, 'stroke-dasharray': '1 1' }, sWrap));
  const cutH = mkDash(E('line', { x1: BX0 - 14, y1: YC, x2: BX0 + BW + 14, y2: YC, stroke: RED, 'stroke-width': 6 }, sWrap));
  const sideLab = (src, col, y) => {   // a label for the narrow 0.3 m column, out to the right, with a leader
    const g = G(sWrap);
    arrow(g, BX0 + BW + 50, y, (XC + BX0 + BW) / 2 + 8, y, { color: col, width: 4 });
    const c = mkChip(g, src, { size: 32, col }); c.set(1); tr(c, BX0 + BW + 190, y);
    return g;
  };
  const pLab = [
    mkMath(sWrap, (BX0 + XC) / 2, (BY0 + YC) / 2 + 16, '2 × 1 = 2', { size: 48, fill: INK, anchor: 'middle' }),
    mkMath(sWrap, (BX0 + XC) / 2, (YC + BY0 + BH) / 2 + 15, '2 × 0.4 = 0.8', { size: 42, fill: INK, anchor: 'middle' }),
    sideLab('{{0.3 × 1 = 0.3}}', '#8FE3A8', (BY0 + YC) / 2),
    sideLab('{{0.3 × 0.4 = 0.12}}', '#FF9CB8', (YC + BY0 + BH) / 2),
  ];
  // the corner: 3 by 4 hundredth squares
  const grid = G(sWrap);
  const cw = (BX0 + BW - XC) / 3, chh = (BY0 + BH - YC) / 4;
  let gd = '';
  for (let i = 1; i < 3; i++) gd += `M${(XC + i * cw).toFixed(1)},${YC} L${(XC + i * cw).toFixed(1)},${BY0 + BH} `;
  for (let j = 1; j < 4; j++) gd += `M${XC},${(YC + j * chh).toFixed(1)} L${BX0 + BW},${(YC + j * chh).toFixed(1)} `;
  E('path', { d: gd, stroke: INK, 'stroke-width': 1.6 }, grid);
  for (let i = 0; i < 3; i++) for (let j = 0; j < 4; j++) T(grid, XC + (i + 0.5) * cw, YC + (j + 0.5) * chh + 3.4, '0.01', { size: 9.6, weight: 700, anchor: 'middle', fill: INK });
  const cTenths = mkChip(Lfg, 'tenths × tenths = **hundredths**', { size: 34, col: GOLD });
  const c12 = mkChip(Lfg, '{{12 × 0.01 = 0.12}}', { size: 36, col: '#FF9CB8' });
  const sumPill = mkChip(Lfg, '{{2 + 0.8 + 0.3 + 0.12 = 3.22}}', { size: 40, col: GOLD });

  /* ================= B: the whiteboard ================= */
  const wb = mkWhiteboard(Lboard, 720, 460); tr(wb, 800, 410);
  const tinB = paintTin(Ltop); tr(tinB, 215, 512);
  const clip = _clipUrl('M440,180 L1160,180 L1160,640 L440,640 Z');
  const shipL = G(Lboard, { 'clip-path': clip }), ship = G(shipL);
  // a cruise ship whose sail is the banner
  E('path', { d: 'M-190,0 L190,0 L150,70 L-160,70 Z', fill: '#1E3A6E', stroke: INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, ship);
  E('path', { d: 'M-176,20 L180,20', stroke: '#FFFFFF', 'stroke-width': 6 }, ship);
  E('rect', { x: -120, y: -44, width: 150, height: 44, fill: '#FFFFFF', stroke: INK, 'stroke-width': 4 }, ship);
  for (let i = 0; i < 4; i++) E('circle', { cx: -100 + i * 34, cy: -22, r: 8, fill: '#7FD3FF', stroke: INK, 'stroke-width': 2 }, ship);
  E('rect', { x: 50, y: -84, width: 34, height: 84, fill: RED, stroke: INK, 'stroke-width': 4 }, ship);
  E('line', { x1: 130, y1: 0, x2: 130, y2: -250, stroke: '#9C6B3E', 'stroke-width': 8 }, ship);
  const sail = drBannerCloth(ship, { w: 170, h: 104 }); tr(sail, 130, -170); op(sail.children[0], 0); op(sail.children[1], 0);
  for (let i = 0; i < 3; i++) E('path', { d: `M${-210 - i * 40},${74 + i * 4} q12,-10 24,0 q12,10 24,0`, fill: 'none', stroke: '#7FD3FF', 'stroke-width': 4 }, ship);

  // B1: Priya's 322, the estimate, Kavya's working, the rule
  const b1Title = mkText(Lboard, 800, 228, '**area** = {{2.3 × 1.4 = ?}}', { size: 40, anchor: 'middle', fill: INK });
  const b1Calc = mkMath(Lboard, 800, 330, '23 × 14 = 322', Object.assign({}, WM, { size: 56 }));
  const b1Big = mkMath(Lboard, 800, 470, '322 "m²"', { size: 88, fill: RED, anchor: 'middle', weight: 700 });
  const stampBad = drStamp(Lfg, false);
  const bEst1 = mkText(Lboard, 800, 236, '**Estimate first:**', { size: 42, anchor: 'middle', fill: BLUE });
  const bEst2 = mkMath(Lboard, 800, 330, '2.3 × 1.4 ≈ 2 × 1.5 = 3', Object.assign({}, WM, { size: 54 }));
  const bEst3 = mkChip(Lboard, 'about **3**', { size: 38, col: GREEN, fill: '#E8F7EE' });
  const bEstTop = mkText(Lboard, 780, 222, 'estimate: {{2.3 × 1.4 ≈ 3}}', { size: 32, anchor: 'middle', fill: GREY });
  const tickEst = tick(Lboard, 16); tr(tickEst, 780 + bEstTop.w / 2 + 30, 210);
  const WKO = { size: 46, fill: INK, noteX: 170, noteSize: 30, noteCol: GREY };
  const bWork = mkWorking(Lboard, 700, 264, [{ m: '23 × 14 = 322', note: 'ignore the points' }, { m: '1 + 1 = 2', note: 'decimal places' }, { m: '2.3 × 1.4 = 3.22 "m²"', col: GREEN }], WKO);
  const cRule = mkChip(Lboard, '**Places in = places out**', { size: 36, col: BLUE, fill: '#E6F0FF' });
  const stampOk = drStamp(Lfg, true);

  // B2: tenths
  const bT0 = mkMath(Lboard, 780, 232, '0.3 × 0.2 = 0.6 ?', { size: 44, fill: RED, anchor: 'middle' });
  const crT = cross(Lboard, 18); tr(crT, 780 + bT0.w / 2 + 34, 216);
  const bWork2 = mkWorking(Lboard, 700, 282, [{ m: '3 × 2 = 6', note: 'ignore the points' }, { m: '1 + 1 = 2', note: 'decimal places' }, { m: '0.3 × 0.2 = 0.06', col: GREEN }], WKO);

  // B3: the paint bill
  const bM0 = mkText(Lboard, 800, 222, '{{2.4}} litres at {{$13.50}} a litre', { size: 32, anchor: 'middle', fill: GREY });
  const bMest = mkText(Lboard, 800, 282, 'estimate: {{2.5 × 13 = 32.5}}', { size: 38, anchor: 'middle', fill: BLUE });
  const bWork3 = mkWorking(Lboard, 700, 330, [{ m: '24 × 135 = 3240', note: 'ignore the points' }, { m: '1 + 1 = 2', note: 'decimal places' }, { m: '2.4 × 13.5 = 32.40', col: GREEN }], Object.assign({}, WKO, { size: 42 }));
  const cMoney = mkChip(Lboard, '{{$32.40}}', { size: 46, col: GREEN, fill: '#E8F7EE' });
  const tickM = tick(Lboard, 18);

  // B4: Priya's zeros, Dot's point
  const bZ0 = mkMath(Lboard, 800, 230, '1.25 × 0.8 = ?', WM);
  const bZ0b = mkMath(Lboard, 800, 230, '1.25 × 0.8 = 1', Object.assign({}, WM, { fill: GREEN }));
  const bZ1 = mkMath(Lboard, 800, 306, '125 × 8 = 1000', WM);
  const bZ2 = mkText(Lboard, 800, 374, 'drop the zeros: {{1}}', { size: 38, anchor: 'middle', fill: INK });
  const bZ3 = mkText(Lboard, 800, 450, '3 d.p.: {{0.001}}', { size: 42, anchor: 'middle', fill: RED });
  const stZ2 = mkDash(E('line', { x1: 800 - bZ2.w / 2 - 12, y1: 362, x2: 800 + bZ2.w / 2 + 12, y2: 362, stroke: RED, 'stroke-width': 6, 'stroke-linecap': 'round' }, Lboard));
  const stZ3 = mkDash(E('line', { x1: 800 - bZ3.w / 2 - 12, y1: 436, x2: 800 + bZ3.w / 2 + 12, y2: 436, stroke: RED, 'stroke-width': 6, 'stroke-linecap': 'round' }, Lboard));
  const big = G(Lboard);
  const DX = [585, 655, 707, 759];                               // 1 . 0 0 0
  const bigD = ['1', '0', '0', '0'].map((d, k) => T(big, DX[k], 566, d, { size: 76, weight: 700, anchor: 'middle', fill: INK }));
  const bigPt = E('circle', { cx: 620, cy: 558, r: 9, fill: DR_LED, stroke: '#B85F00', 'stroke-width': 3 }, big);
  const cnt = ['1', '2', '3'].map((d, k) => T(big, DX[k + 1], 612, d, { size: 28, weight: 800, anchor: 'middle', fill: BLUE }));
  const cFirst = mkChip(Lboard, 'place the point **FIRST**', { size: 28, col: BLUE, fill: '#E6F0FF' });
  const cTidy = mkChip(Lboard, 'then tidy the zeros', { size: 28, col: GREEN, fill: '#E8F7EE' });

  /* ================= the cast (one of each) ================= */
  const mum = cast(Lmid, 'mum');
  const priya = cast(Lmid, 'priya', { prop: 'pencil' });
  const kav = cast(Lmid, 'kavya');
  const dad = cast(Lmid, 'dad');
  const calc = G(dad.hand); scHandProp(calc, 'calculator');
  const boy = cast(Lpop, 'boy');
  const dot = cast(Ltop, 'dot');
  const lt = { mum: drLowerThird(Lhud, 'mum'), boy: drLowerThird(Lhud, 'boy'), dad: drLowerThird(Lhud, 'dad') };
  const ltOn = (t, who, t0) => lt[who].set(win(t, t0, t0 + 3.1, 0.3));
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* positions */
  const TY = 452, TS = 0.9, TX = { mum: 612, priya: 772, kav: 932, dad: 1085 };
  const BY = 665, BS = 0.78, BL = 105, BK = 315;                 // whiteboard shot: two busts low at the left
  const DOT_T = [520, 520 - 68], DOT_B = [215, 442 - 71];

  /* cuts */
  const k = id => at(id) - 0.06;
  const cS1 = k('size'), cB1 = k('calc'), cS2 = k('split'), cT2 = k('boy'), cB2 = k('tenths'), cT3 = k('paint'), cB3 = k('money'), cT4 = k('basic');

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const sT = on(t, -1, cS1) || on(t, cT2, cB2) || on(t, cT3, cB3) || on(t, cT4, 1e9);
    const sS = on(t, cS1, cB1) || on(t, cS2, cT2);
    const sB = 1 - sT - sS;
    const who = scWho(S, t);
    tent.upd(t); op(Lset, 1 - sS);
    for (const kk in lt) lt[kk].set(0);
    op(Lfront, sT); op(Ltop, sT || sB); op(Lmid, 1); op(banT, sT); op(tinT, sT); op(tinB, sB);
    op(Lclose, sS); op(Lboard, sB);
    [tag, cNeed, c9, bubBoy, cBasic, cArea, cTenths, c12, sumPill, stampBad, stampOk].forEach(c => c.set ? c.set(0) : op(c, 0));
    tag.set(0); op(tag, 0);
    const show = { mum: 0, priya: 0, kav: 0, dad: 0, boy: 0, dot: 0 };

    /* ---------- T: the tent ---------- */
    if (sT) {
      const seg1 = t < cS1, seg2 = t >= cT2 && t < cB2, seg3 = t >= cT3 && t < cB3, seg4 = t >= cT4;
      show.mum = 1; show.priya = 1; show.kav = 1;
      tr(mum, TX.mum, TY, TS); tr(priya, TX.priya, TY, TS); tr(kav, TX.kav, TY, TS);
      // the banner: the tiger appears as Mum paints
      op(banTxt, 1); op(banTiger, seg1 ? P(t, at('nine') + 0.6, 3.2, linear) : 1);
      let mm = 'happy', ml = -0.9, mlift = 1, pm = 'neutral', pl = -0.8, km = 'neutral', kl = -0.8;
      if (seg1) {
        mlift = 0.75 + 0.25 * Math.sin(t * 9) * AMP;
        popSet(c9, t, at('nine') + 0.1, 1e9, 860, 278);
        ltOn(t, 'mum', at('nine') + 0.4);
        pm = 'smug'; km = 'happy';
      }
      if (seg2) {
        show.boy = 1; show.dot = 1;
        const up = P(t, at('boy') - 0.25, 0.35, pop);
        tr(boy, 1060, lerp(830, 662, up), 0.95);
        boy.set({ t, talk: scTalk(S, t, 'boy'), mood: 'happy', look: -0.6, lift: 1 });
        ltOn(t, 'boy', at('boy') + 0.1);
        popSet(bubBoy, t, mid('boy', 0.55), 1e9, 770, 606);
        mlift = 0; ml = 0.9; mm = t > mid('boy', 0.7) ? 'deadpan' : 'neutral'; pl = 0.9; km = 'neutral'; kl = 0.9;
        tr(dot, DOT_T[0], DOT_T[1], 0.6);
        dot.set({ t, talk: 0, mood: t > mid('boy', 0.65) ? 'annoyed' : 'neutral', look: 0.9 });
      }
      if (seg3) {
        show.dad = 1; show.dot = 1;
        tr(dad, TX.dad, TY, TS);
        const lp = mid('paint', 0.75), pat = t > lp;
        dad.set({ t, talk: scTalk(S, t, 'dad'), mood: pat ? 'shock' : 'smug', look: pat ? 0 : -0.4, lift: pat ? 0.35 + 0.35 * Math.abs(Math.sin(t * 10)) : 1, sweat: pat ? 1 : 0 });
        op(dad.watch, 1); op(calc, 0);
        ltOn(t, 'dad', at('paint') + 0.1);
        op(tag, P(t, mid('paint', 0.18), 0.3, linear)); tag.set(Math.sin(t * 2.2) * 4 * AMP); tr(tag, 560, 286);
        popSet(cNeed, t, mid('paint', 0.5), 1e9, 1030, 272);
        mlift = 0; ml = 0.9; mm = 'neutral'; pl = 0.9; kl = 0.9;
        // "Calculator!": everyone else turns to the camera
        if (pat) { mm = 'deadpan'; ml = 0; pm = 'deadpan'; pl = 0; km = 'deadpan'; kl = 0; }
        tr(dot, DOT_T[0], DOT_T[1], 0.6);
        dot.set({ t, talk: 0, mood: pat ? 'deadpan' : 'neutral', look: pat ? 0 : 0.9 });
      }
      if (seg4) {
        show.dad = 1; show.dot = 1;
        tr(dad, TX.dad, TY, TS);
        op(dad.watch, 0); op(calc, 1);
        dad.set({ t, talk: 0, mood: 'deadpan', look: -0.7, lift: 1 });
        mlift = 0; mm = 'deadpan'; ml = 0.6;
        const shrug = t < end('basic') + 0.6;
        pm = t < mid('basic', 0.4) ? 'smug' : 'happy'; pl = shrug ? 0 : -0.4;
        km = 'deadpan'; kl = -0.9;
        popSet(cBasic, t, mid('basic', 0.4), 1e9, TX.priya, 274);
        tr(dot, DOT_T[0], DOT_T[1], 0.6);
        dot.set({ t, talk: 0, mood: 'deadpan', look: 0.9, still: t > end('basic') });
      }
      mum.set({ t, talk: scTalk(S, t, 'mum'), mood: mm, look: ml, lift: mlift });
      priya.set({ t, talk: scTalk(S, t, 'priya'), mood: pm, look: pl, lift: seg4 ? 1 : 0 });
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
    }

    /* ---------- S: the banner close-up ---------- */
    if (sS) {
      show.mum = 1;
      tr(mum, 110, 672, 0.78);
      const isSplit = t >= cS2;
      mum.set({ t, talk: scTalk(S, t, 'mum'), mood: isSplit ? 'smug' : 'happy', look: 0.8, lift: isSplit ? 1 : 0.6 });
      op(dims, isSplit ? 0 : 1);
      if (!isSplit) {
        view(sWrap, 1, 600, 375, 600, 375);
        const d1 = P(t, mid('size', 0.18), 0.35, linear), d2 = P(t, mid('size', 0.42), 0.35, linear);
        dims.children[0].set(d1); dims.children[1].set(d1); dims.children[2].set(d2); dims.children[3].set(d2);
        dW.set(d1); tr(dW, BX0 + BW / 2, 132);
        dH.set(d2); tr(dH, BX0 + BW + 120, BY0 + BH / 2);
        popSet(cArea, t, mid('size', 0.68), 1e9, 1000, 100);
        op(pieces, 0); op(cutV, 0); op(cutH, 0); pLab.forEach(m => op(m, 0)); op(grid, 0); op(banS.children[3], 1); op(banS.children[4], 1);
      } else {
        dW.set(0); dH.set(0);
        op(cutV, 1); op(cutH, 1);
        mkDraw(cutV, P(t, mid('split', 0.04), 0.4, linear)); mkDraw(cutH, P(t, mid('split', 0.1), 0.4, linear));
        op(pieces, 1);
        const pt = [0.2, 0.28, 0.36, 0.44];
        pRect.forEach((r, i) => op(r, P(t, mid('split', pt[i]) - 0.15, 0.3, linear) * 0.92));
        pLab.forEach((m, i) => op(m, P(t, mid('split', pt[i]), 0.3, linear) * (1 - P(t, mid('split', 0.66), 0.2, linear))));
        op(banS.children[4], 1 - P(t, mid('split', 0.66), 0.2, linear)); op(banS.children[3], 1 - P(t, mid('split', 0.66), 0.2, linear));
        popSet(sumPill, t, mid('split', 0.54), 1e9, 560, 640);
        const z = P(t, mid('split', 0.68), 0.9, ease);
        view(sWrap, lerp(1, 3, z), lerp(600, (XC + BX0 + BW) / 2, z), lerp(375, (YC + BY0 + BH) / 2, z), lerp(600, 640, z), lerp(375, 372, z));
        op(grid, P(t, mid('split', 0.7), 0.3, linear));
        popSet(cTenths, t, mid('split', 0.78), 1e9, 640, 150);
        popSet(c12, t, mid('split', 0.88), 1e9, 990, 372);
      }
    }

    /* ---------- B: the whiteboard ---------- */
    if (sB) {
      show.dot = 1;
      const g1 = t < cS2, g2 = t >= cB2 && t < cT3, g3 = t >= cB3 && t < k('zeros'), g4 = t >= k('zeros');
      // Dot on the paint tin (from his first line)
      const dotIn = t >= at('ship') - 0.25 || !g1;
      if (dotIn) {
        const up = g1 ? P(t, at('ship') - 0.25, 0.35, pop) : 1;
        tr(dot, DOT_B[0], lerp(DOT_B[1] + 40, DOT_B[1], up), 0.62 * Math.max(0.01, up));
      } else show.dot = 0;
      // which human is on the left
      let left = null, lm = 'neutral', ll = 0.8, llift = 0, km = 'neutral', kl = -0.6, dm = 'smug', dl = 0.8, arms = 0, point = 0;
      if (g1) {
        left = priya;
        if (t < at('ship')) { lm = 'smug'; llift = 1; km = 'neutral'; kl = 0.8; ll = 0.8; }
        else if (t < at('est')) { lm = t > end('ship') - 0.2 ? 'sad' : 'shock'; km = 'deadpan'; kl = -0.7; dm = t < mid('ship', 0.4) ? 'deadpan' : 'annoyed'; dl = 0.6; }
        else if (t < at('int')) { lm = 'annoyed'; ll = -0.2; km = 'neutral'; kl = -0.8; dm = 'smug'; point = 1; }
        else if (t < at('rule')) { lm = 'neutral'; ll = 0.8; km = 'happy'; kl = 0.8; dm = 'happy'; dl = 0.9; }
        else { lm = 'neutral'; km = 'happy'; kl = -0.9; dm = 'smug'; arms = t < mid('rule', 0.6) ? 1 : 0; dl = 0; }
      } else if (g2) {
        left = boy; lm = t > mid('tenths', 0.8) ? 'shock' : 'happy'; llift = 1; ll = 0.9; km = 'neutral'; kl = 0.9; dm = 'smug'; point = 1;
      } else if (g3) {
        left = dad; const found = t > mid('money', 0.82);
        lm = found ? 'smug' : 'neutral'; ll = 0.9; llift = found ? 1 : 0.3 + 0.3 * Math.abs(Math.sin(t * 9));
        op(dad.watch, found ? 0 : 1); op(calc, found ? 1 : 0);
        km = found ? 'deadpan' : 'smug'; kl = found ? -0.9 : 0.8; dm = found ? 'deadpan' : 'happy'; dl = found ? 0.4 : 0.8;
      } else {
        left = priya;
        if (t < at('first')) { lm = 'smug'; llift = 1; ll = 0.8; km = t > mid('zeros', 0.8) ? 'shock' : 'neutral'; kl = -0.8; dm = t > mid('zeros', 0.8) ? 'annoyed' : 'neutral'; dl = 0.6; }
        else { lm = t > mid('first', 0.5) ? 'annoyed' : 'neutral'; ll = 0.8; km = 'smug'; kl = 0.8; dm = t < mid('first', 0.3) ? 'annoyed' : 'smug'; point = 1; }
      }
      if (left) {
        const key = left === priya ? 'priya' : left === boy ? 'boy' : 'dad';
        show[key] = 1;
        tr(left, BL, BY, BS);
        left.set({ t, talk: scTalk(S, t, key), mood: lm, look: ll, lift: llift });
      }
      show.kav = 1; tr(kav, BK, BY, BS);
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
      if (show.dot) dot.set({ t, talk: scTalk(S, t, 'dot'), mood: dm, look: dl, arms, point: point * (who === 'dot' && t > 0 ? 1 : 0) });

      // the board contents
      [b1Title, b1Calc, b1Big, bEst1, bEst2, bEstTop, tickEst, bWork, ship, bT0, crT, bWork2, bM0, bMest, bWork3, tickM, bZ0, bZ0b, bZ1, bZ2, bZ3, stZ2, stZ3, big].forEach(e => op(e, 0));
      bEst3.set(0); cRule.set(0); cMoney.set(0); cFirst.set(0); cTidy.set(0);
      if (g1) {
        if (t < at('est')) {
          op(b1Title, 1);
          fadeIn(b1Calc, t, mid('calc', 0.3), 1e9);
          fadeIn(b1Big, t, mid('calc', 0.72), 1e9);
          if (t >= at('ship') - 0.1) {
            op(ship, 1);
            tr(ship, lerp(1420, 160, P(t, at('ship'), end('ship') - at('ship'), linear)), 556);
            stampBad.set(P(t, end('ship') - 0.05, 0.3, linear)); tr(stampBad, 800, 600, 0.55);
          }
        } else if (t < at('int')) {
          op(bEst1, P(t, at('est') + 0.05, 0.25, linear));
          fadeIn(bEst2, t, mid('est', 0.28), 1e9);
          popSet(bEst3, t, mid('est', 0.78), 1e9, 800, 430);
        } else {
          op(bEstTop, 1);
          op(bWork, 1);
          const wl = [mid('int', 0.08), mid('int', 0.42), mid('int', 0.7)];
          wl.forEach((tt, i) => bWork.show(i, P(t, tt, 0.35, linear)));
          bWork.ring(2, P(t, mid('int', 0.86), 0.25, linear));
          op(tickEst, P(t, mid('int', 0.92), 0.25, linear));
          if (t >= at('rule')) {
            popSet(cRule, t, at('rule') + 0.05, 1e9, 700, 590);
            stampOk.set(P(t, mid('rule', 0.62), 0.3, linear)); tr(stampOk, 1036, 592, 0.42);
          }
        }
      } else if (g2) {
        op(bT0, 1);
        op(crT, P(t, mid('tenths', 0.82), 0.25, linear));
        op(bWork2, 1);
        [0.08, 0.38, 0.62].forEach((f, i) => bWork2.show(i, P(t, mid('tenths', f), 0.35, linear)));
        bWork2.ring(2, P(t, mid('tenths', 0.78), 0.25, linear));
      } else if (g3) {
        op(bM0, 1);
        op(bMest, P(t, mid('money', 0.06), 0.3, linear));
        op(bWork3, 1);
        [0.36, 0.52, 0.66].forEach((f, i) => bWork3.show(i, P(t, mid('money', f), 0.35, linear)));
        bWork3.ring(2, P(t, mid('money', 0.76), 0.25, linear));
        popSet(cMoney, t, mid('money', 0.8), 1e9, 780, 590);
        op(tickM, P(t, mid('money', 0.9), 0.25, linear)); tr(tickM, 780 + cMoney.w / 2 + 34, 592);
      } else if (g4) {
        const isFirst = t >= at('first');
        const done = isFirst && t >= mid('first', 0.78);
        op(bZ0, done ? 0 : 1); op(bZ0b, done ? 1 : 0);
        fadeIn(bZ1, t, mid('zeros', 0.3), 1e9);
        op(bZ2, P(t, mid('zeros', 0.52), 0.3, linear) * (isFirst ? 0.45 : 1));
        op(bZ3, P(t, mid('zeros', 0.76), 0.3, linear) * (isFirst ? 0.55 : 1));
        if (isFirst) {
          op(stZ2, 1); op(stZ3, 1);
          mkDraw(stZ2, P(t, at('first') + 0.1, 0.3, linear)); mkDraw(stZ3, P(t, at('first') + 0.3, 0.3, linear));
          op(big, 1);
          // place the point first: 1000 -> 1.000 (count 1, 2, 3), then tidy the zeros: 1
          const drop = P(t, mid('first', 0.12), 0.35, ease);
          op(bigPt, drop > 0 ? 1 : 0); attr(bigPt, 'cy', lerp(470, 558, drop));
          const tidy = P(t, mid('first', 0.66), 0.35, linear);
          cnt.forEach((c, i) => op(c, P(t, mid('first', 0.2 + i * 0.08), 0.2, linear) * (1 - tidy)));
          bigD.slice(1).forEach(d => op(d, 1 - tidy)); op(bigPt, (drop > 0 ? 1 : 0) * (1 - tidy));
          tr(bigD[0], lerp(0, 85, P(t, mid('first', 0.72), 0.3, ease)), 0);
          popSet(cFirst, t, mid('first', 0.22), 1e9, 975, 540);
          popSet(cTidy, t, mid('first', 0.62), 1e9, 975, 604);
        }
      }
    }

    op(mum, show.mum); op(priya, show.priya); op(kav, show.kav); op(dad, show.dad); op(boy, show.boy); op(dot, show.dot);
  };
});
