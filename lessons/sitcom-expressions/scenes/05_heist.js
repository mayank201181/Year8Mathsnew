/* Scene 5: The Great Factor Heist (factorising). THE SET PIECE.
   Shots (hard sitcom cuts):
   A  5 p.m. in the flat: Mum, Priya, Kavya and Ah Boy behind the table; twelve murukku packets, the ladoo tray (17)
      and a row of empty goodie bags on it; Agent X on the table; a card (top right) for the maths.
      five: "5 p.m.", the empty bags, "factorising" -> bags: Mum's job card (12 packets, 18 ladoos, identical bags, as
      many as possible) -> x: a packet with a "?" sticker: x pieces, 12x + 18 -> two: 2(6x + 9), two bags of 6 packets
      + 9 ladoos -> three: = 3(4x + 6), three bags -> fully: both check (ticks), but 6x + 9 = 3(2x + 3): not fully
      factorised -> hcf: the factors of 12 and of 18, 6 ringed, HCF = 6, six bags of 2 packets + 3 ladoos -> six:
      12x + 18 = 6(2x + 3), 6 × 2x = 12x, 6 × 3 = 18, IDENTITY CONFIRMED.
   H  Mr Tan shows Kavya the retest preview: Factorise fully 6x²y + 9xy². Kavya: shock.
   L  the heist: the lights dim, "THE GREAT FACTOR HEIST"; THE LINE-UP: 6x²y = 2 × 3 × x × x × y, 9xy² = 3 × 3 × x × y × y;
      the common 3, one x (the lowest power) and one y ring gold, HCF = 3xy; the ringed tiles march out to the left and
      merge into 3xy outside a big bracket, the leftovers slide in: 3xy(2x + 3y) -> answer: 6x²y + 9xy² = 3xy(2x + 3y)
      -> check: 3xy × 2x = 6x²y, 3xy × 3y = 9xy², IDENTITY CONFIRMED, the lights come back up.
   A  gap: Ah Boy's 5x + 5 = 5(x  ) with a hole -> one: 5 ÷ 5 = 1 drops in: 5(x + 1), check 5x + 5, never leave anyone
      behind -> like: Kavya hugs her test -> confess: only 17 ladoos, 12x + 17 -> prime: factors of 12 and 17, HCF = 1,
      the six bags collapse into one giant bag: AH BOY. */
scene('heist', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const GOLD = '#FFE45C', RED = '#D32F2F', BLUE = '#2E6FD8', GREEN = '#1E9E5A', GREY = '#5A6670', INK = MK.ink, AMBER = '#E07A12';
  const chipC = (parent, text, o) => { o = o || {}; return mkChip(parent, text, { size: o.size || 30, col: o.col || GOLD }); };
  const pc = (c, t, t0, t1) => c.set(t >= t0 && (t1 === undefined || t < t1) ? P(t, t0, 0.35, linear) : 0);
  const fin = (t, t0, d) => P(t, t0, d || 0.3, linear);
  const M = (parent, x, y, src, o) => mkMath(parent, x, y, src, Object.assign({ size: 50, fill: INK }, o || {}));
  const mw = (src, size) => mkMeasure(src, { size }).w;
  const after = (g, s) => g.x0 + g.w + 0.24 * s;
  const centreOf = (x0, upto, part, s) => x0 + mw(upto, s) - mw(part, s) / 2;
  const strikeL = (parent, x1, x2, y, col) => { const l = E('path', { d: `M${x1},${y} L${x2},${y - 6}`, stroke: col || RED, 'stroke-width': 6, 'stroke-linecap': 'round' }, parent); mkDash(l); return l; };
  const ringC = (parent, x, y, r, col) => { const c = E('circle', { cx: x, cy: y, r, fill: 'none', stroke: col || GOLD, 'stroke-width': 5 }, parent); mkDash(c); return c; };
  const paper = (parent, x, y, w, h) => E('rect', { x, y, width: w, height: h, rx: 18, fill: MK.paper, stroke: '#B8A27A', 'stroke-width': 5 }, parent);
  const outline = (el, col, w) => { el.setAttribute('stroke', col); el.setAttribute('stroke-width', w); el.setAttribute('paint-order', 'stroke'); el.setAttribute('stroke-linejoin', 'round'); };
  /* a cheap murukku packet (base centre, about 32 x 44) and a cheap goodie bag (base centre, about 70 x 96) */
  const packet = parent => {
    const g = G(parent);
    E('path', { d: 'M-16,0 L-15,-40 Q0,-44 15,-40 L16,0 Z', fill: 'rgba(255,255,255,0.6)', stroke: '#5A6670', 'stroke-width': 2.5 }, g);
    E('circle', { cx: 0, cy: -24, r: 10, fill: '#E2A21C', stroke: '#8A5A10', 'stroke-width': 2.5 }, g);
    E('rect', { x: -15, y: -10, width: 30, height: 8, rx: 2, fill: '#C62828' }, g);
    return g;
  };
  const BAGCOL = ['#E8457A', '#2E9EC4', '#F2A43A', '#7B4FD0', '#2FA36B', '#E8642E'];
  const bag = (parent, col) => {
    const g = G(parent);
    g.peek = E('path', { d: 'M-24,-62 a12,12 0 1 1 24,0 a12,12 0 1 1 22,0 Z', fill: '#FFB347', stroke: SC_INK, 'stroke-width': 2.5 }, g);
    E('path', { d: 'M-16,-64 Q-16,-96 0,-96 Q16,-96 16,-64', fill: 'none', stroke: '#E2B33C', 'stroke-width': 5 }, g);
    E('path', { d: 'M-32,-64 L32,-64 L36,0 L-36,0 Z', fill: col, stroke: SC_INK, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, g);
    E('path', { d: 'M-12,-30 Q0,-14 12,-30 L6,-34 Q0,-28 -6,-34 Z', fill: '#FFE45C', opacity: 0.85 }, g);
    return g;
  };

  /* layers: set, dimmer, humans, table, table dimmer, overlays, HUD */
  const Lbg = G(root), Ldim = G(root), Lcast = G(root), Lfront = G(root), Ldim2 = G(root), Ltoon = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= the living room ================= */
  const flat = xpFlat(Lbg);
  Lfront.appendChild(flat.front); Lfront.appendChild(flat.top);
  const dim1 = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#0A1020' }, Ldim);
  const dim2 = E('rect', { x: 0, y: 500, width: 1200, height: 250, fill: '#0A1020' }, Ldim2);
  // the table: twelve murukku packets, the ladoo tray (17), six goodie bags
  const packs = [];
  for (let i = 0; i < 12; i++) { const p = packet(flat.top); tr(p, 78 + i * 33, 530); packs.push(p); }
  const tray = xpTray(flat.top, { n: 18 }); tr(tray, 548, 532, 0.45); tray.set(17);
  const bags = BAGCOL.map(c => bag(flat.top, c));
  const giant = xpGoodieBag(flat.top, { col: '#E8457A' });
  const gLab = G(giant); E('rect', { x: -52, y: -86, width: 104, height: 30, rx: 6, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, gLab);
  T(gLab, 0, -63, 'AH BOY', { size: 22, weight: 800, anchor: 'middle', fill: '#C62828' });
  const crumbs = G(Ltoon);
  [[-14, 0], [10, 6], [-4, 14], [16, -6], [-20, 10]].forEach(([x, y]) => E('circle', { cx: x, cy: y, r: 4, fill: '#E07A12' }, crumbs));
  const c5pm = chipC(Lfg, '**5 p.m.**', { size: 32 });
  const cWord = chipC(Lfg, 'least favourite word: **factorising**', { col: '#FF8A8A' });
  const cBag = [['**6** packets + **9** ladoos', 'two'], ['**4** packets + **6** ladoos', 'three'], ['**2** packets + **3** ladoos', 'six']]
    .map(([s]) => chipC(Lfg, 'each bag: ' + s, { col: '#9FE0B5', size: 28 }));

  // the card (top right)
  const card = G(Lfg);
  paper(card, 590, 108, 580, 262);
  const CX = 880;
  // bags: Mum's job card
  const cJob = G(card);
  E('rect', { x: 590, y: 108, width: 580, height: 56, rx: 18, fill: '#B8233A' }, cJob);
  T(cJob, CX, 147, 'GOODIE BAGS', { size: 30, weight: 800, anchor: 'middle', fill: GOLD, ls: 2 });
  const jobRows = ['**12** packets of murukku', '**18** ladoos', 'identical bags, **as many as possible**'].map((s, i) => mkText(cJob, 625, 214 + i * 56, s, { size: 30, fill: INK, boldFill: '#B8233A', weight: 700 }));
  // x: a packet is x pieces; 12x + 18
  const cX = G(card);
  const bigPack = xpMurukku(cX, 1); tr(bigPack, 670, 330);
  const qSt = G(cX); tr(qSt, 670, 268);
  E('circle', { r: 24, fill: GOLD, stroke: SC_INK, 'stroke-width': 3 }, qSt);
  const qQ = T(qSt, 0, 11, '?', { size: 32, weight: 800, anchor: 'middle', fill: SC_INK });
  const qx = M(qSt, 0, 10, 'x', { size: 34, anchor: 'middle' });
  const xTxt = mkText(cX, 940, 172, 'pieces in a packet: {{x}}', { size: 32, anchor: 'middle', fill: GREY, weight: 700 });
  const SXe = 76, XXe = 760, YXe = 290;
  const xExp = M(cX, XXe, YXe, '12x + 18', { size: SXe });
  const x12 = M(cX, XXe + mw('12x', SXe) / 2, 340, '"12 packets"', { size: 28, anchor: 'middle', fill: BLUE });
  const x18 = M(cX, XXe + mw('12x + 18', SXe) - mw('18', SXe) / 2, 340, '"18 ladoos"', { size: 28, anchor: 'middle', fill: AMBER });
  // two / three / fully
  const cW = G(card);
  const wk = mkWorking(cW, 815, 128, [{ m: '12x + 18 = 2(6x + 9)', note: '2 bags' }, { m: '= 3(4x + 6)', note: '3 bags' }], { size: 42, fill: INK, noteX: 255, noteSize: 28, noteCol: GREY, gap: 22, hlCol: 'rgba(255,200,60,0.35)' });
  const ticks = [0, 1].map(i => { const k = tick(cW, 13); tr(k, 1105, wk.lineY[i] - 14); return k; });
  const wBut = mkText(cW, CX, 296, 'but {{6x + 9 = 3(2x + 3)}}', { size: 36, anchor: 'middle', fill: INK, weight: 700 });
  const cNotFully = chipC(cW, 'not **fully** factorised', { col: '#FF8A8A', size: 28 }); tr(cNotFully, CX, 342);
  // hcf: the factors of 12 and 18
  const cH = G(card);
  const F12 = [1, 2, 3, 4, 6, 12], F18 = [1, 2, 3, 6, 9, 18], FX = 710, FP = 74;
  const fRow = (list, y, lab) => { M(cH, 625, y, lab, { size: 38, fill: GREY }); return list.map((v, i) => M(cH, FX + i * FP, y, String(v), { size: 38, anchor: 'middle', fill: v === 6 ? GREEN : INK })); };
  const f12 = fRow(F12, 170, '12:'), f18 = fRow(F18, 236, '18:');
  const ring12 = ringC(cH, FX + 4 * FP, 157, 27), ring18 = ringC(cH, FX + 3 * FP, 223, 27);
  const fComm = mkText(cH, CX, 296, 'common factors: {{1, 2, 3, 6}}', { size: 30, anchor: 'middle', fill: GREY, weight: 700 });
  const hcf6 = M(cH, CX, 350, '"HCF" = 6', { size: 44, anchor: 'middle', fill: GREEN });
  // six: 12x + 18 = 6(2x + 3)
  const cS = G(card);
  const SS = 56, XS = 650, YS = 236;
  M(cS, XS, YS, '12x + 18 = 6(2x + 3)', { size: SS });
  const sRx = XS + mw('12x + 18 = ', SS) + 0.24 * SS;
  const p6 = XS + mw('12x + 18 = 6', SS) - mw('6', SS) / 2, p2x = centreOf(XS, '12x + 18 = 6(2x', '2x', SS), p3 = centreOf(XS, '12x + 18 = 6(2x + 3', '3', SS);
  const sAY = YS - 0.8 * SS;
  const sA1 = arrow(cS, p6, sAY, p2x, sAY, { color: BLUE, width: 4, bend: -26 });
  const sA2 = arrow(cS, p6, sAY, p3, sAY, { color: BLUE, width: 4, bend: -46 });
  const sP1 = M(cS, 745, 302, '6 * 2x = 12x', { size: 36, anchor: 'middle', fill: BLUE });
  const sP2 = M(cS, 1030, 302, '6 * 3 = 18', { size: 36, anchor: 'middle', fill: BLUE });
  const stampOk1 = xpStamp(Lfg, true);
  // gap / one: 5x + 5 = 5(x + 1)
  const cG = G(card);
  const SG = 64, XG = 655, YG = 248;
  const gA = M(cG, XG, YG, '5x + 5 = 5(x', { size: SG });
  const wFull = mw('5x + 5 = 5(x + 1)', SG), wParen = mw('5(x + 1)', SG) - mw('5(x + 1', SG);
  const gB = M(cG, XG + wFull - wParen, YG, ')', { size: SG });
  const gx1 = XG + gA.w + 0.12 * SG, gx2 = XG + wFull - wParen - 0.06 * SG;
  const gHole = E('rect', { x: gx1, y: YG - 0.72 * SG, width: gx2 - gx1, height: 0.86 * SG, rx: 8, fill: 'rgba(211,47,47,0.08)', stroke: RED, 'stroke-width': 3, 'stroke-dasharray': '8 6' }, cG);
  const gFull = M(cG, XG, YG, '5x + 5 = 5(x + 1)', { size: SG, fill: GREEN });
  const gDrop = M(cG, (gx1 + gx2) / 2, YG, '+ 1', { size: SG, anchor: 'middle', fill: GREEN });
  const gDiv = M(cG, CX, 160, '5 ÷ 5 = 1', { size: 40, anchor: 'middle', fill: BLUE });
  const gChk = mkText(cG, CX, 330, 'check: {{5(x + 1) = 5x + 5}} ✓', { size: 32, anchor: 'middle', fill: GREEN, weight: 700 });
  const cBehind = chipC(Lfg, 'never leave anyone **behind**', { col: '#9FE0B5' });
  // confess / prime: 17 ladoos, HCF 1
  const cP = G(card);
  const SP = 60, XP = 730, YP = 178;
  const pEx = G(cP);
  M(pEx, XP, YP, '12x +', { size: SP });
  const p18x = XP + mw('12x + 18', SP) - mw('18', SP);
  const p18 = M(pEx, p18x, YP, '18', { size: SP });
  const s18 = strikeL(pEx, p18x - 6, p18x + mw('18', SP) + 6, YP - 16);
  const p17 = M(pEx, p18x + mw('18', SP) + 24, YP, '17', { size: SP, fill: RED });
  const pR12 = mkText(cP, 640, 246, '12:  {{1}}, 2, 3, 4, 6, 12', { size: 36, fill: INK, weight: 700 });
  const pR17 = mkText(cP, 640, 302, '17:  {{1}}, 17', { size: 36, fill: INK, weight: 700 });
  const xr1 = 640 + textWidth('12:  ', 36, FD, 700) + 10, xr2 = 640 + textWidth('17:  ', 36, FD, 700) + 10;
  const pRing1 = ringC(cP, xr1, 234, 24), pRing2 = ringC(cP, xr2, 290, 24);
  const cHcf1 = chipC(Lfg, '{{"HCF of 12 and 17" = 1}}', { col: '#FF8A8A', size: 30 });
  const c17 = chipC(Lfg, 'only **17** ladoos', { col: '#FF8A8A' });

  /* ================= H: the retest preview ================= */
  const retest = G(Lfg);
  E('rect', { x: -264, y: -150, width: 528, height: 330, rx: 8, fill: 'rgba(0,0,0,0.22)' }, retest);
  E('rect', { x: -270, y: -158, width: 528, height: 330, rx: 8, fill: '#FFFFFF', stroke: '#B9C4CE', 'stroke-width': 3 }, retest);
  T(retest, -6, -104, 'RETEST: MONDAY', { size: 34, weight: 800, anchor: 'middle', fill: RED, ls: 2 });
  T(retest, -232, -40, 'Q1  Factorise fully', { size: 32, weight: 700, fill: SC_INK });
  M(retest, -6, 60, '6x^2y + 9xy^2', { size: 70, anchor: 'middle' });
  const cHard = chipC(retest, 'the **hardest** one', { col: '#FF8A8A', size: 28 }); tr(cHard, -6, 126);

  /* ================= L: the heist ================= */
  const cTitle = chipC(Lfg, '**THE GREAT FACTOR HEIST**', { col: GOLD, size: 40 });
  const cTake = chipC(Lfg, 'take out everything **every** term has', { col: '#9FD8FF', size: 30 });
  const LUX = 565, LUY = 110, LUW = 600, LUH = 405;
  const lu = xpLineup(Lfg, LUW, LUH); tr(lu, LUX, LUY);
  const luLab = G(Lfg);
  M(luLab, 590, 206, '6x^2y =', { size: 40, fill: '#FFFFFF' });
  M(luLab, 590, 346, '9xy^2 =', { size: 40, fill: '#FFFFFF' });
  const TS = 0.78, TP = 100, TX0 = 640, RY = [258, 398];
  const timesG = G(luLab);
  RY.forEach(y => { for (let i = 0; i < 4; i++) T(timesG, TX0 + TP * (i + 0.5), y + 10, '×', { size: 30, weight: 800, anchor: 'middle', fill: '#C9D3DC' }); });
  const R1 = ['2', '3', 'x', 'x', 'y'], R2 = ['3', '3', 'x', 'y', 'y'];
  const TCOL = { 2: '#FFE2B8', 3: '#FFE2B8', x: '#CFE9FF', y: '#D8F5D0' };
  const tiles = G(Lfg);
  const t1 = R1.map(s => xpFactor(tiles, s, { col: TCOL[s] })), t2 = R2.map(s => xpFactor(tiles, s, { col: TCOL[s] }));
  const xNote = mkText(Lfg, TX0 + 3 * TP, 330, 'only one {{x}} in row 2', { size: 26, anchor: 'middle', fill: '#C9D3DC', weight: 700 });
  const cLow = chipC(Lfg, 'take the **lowest power**', { col: '#9FD8FF', size: 30 });
  const cHcf = chipC(Lfg, '{{"HCF" = 3xy}}', { col: GOLD, size: 40 });
  // the result row (left, above the heads): [3][x][y] ( [2][x] + [3][y] )
  const RS = 0.7, RYr = 222, rc = 80;
  const slot = { c3: rc, cx: rc + 58, cy: rc + 116, l2: rc + 196, lx: rc + 254, l3: rc + 356, ly: rc + 414 };
  const rBr = G(Lfg);
  [[rc + 160, -1], [rc + 458, 1]].forEach(([x, sd]) => {
    const d = `M${x - sd * 8},${RYr - 52} Q${x + sd * 14},${RYr} ${x - sd * 8},${RYr + 52}`;
    E('path', { d, fill: 'none', stroke: SC_INK, 'stroke-width': 13, 'stroke-linecap': 'round' }, rBr);
    E('path', { d, fill: 'none', stroke: GOLD, 'stroke-width': 7, 'stroke-linecap': 'round' }, rBr);
  });
  const rPlus = T(rBr, rc + 305, RYr + 16, '+', { size: 54, weight: 800, anchor: 'middle', fill: '#FFFFFF' }); outline(rPlus, SC_INK, 8);
  // where every tile goes: [tile, slot key, which row]
  const MOVE = [[t1[1], 'c3', 'out'], [t2[0], 'c3', 'out'], [t1[2], 'cx', 'out'], [t2[2], 'cx', 'out'], [t1[4], 'cy', 'out'], [t2[3], 'cy', 'out'],
    [t1[0], 'l2', 'in'], [t1[3], 'lx', 'in'], [t2[1], 'l3', 'in'], [t2[4], 'ly', 'in']];
  // answer / check
  const cAns = G(Lfg);
  paper(cAns, 110, 115, 880, 215);
  const SA = 58, YA = 214;
  const aLs = '6x^2y + 9xy^2 =', aRs = '3xy(2x + 3y)';
  const aWt = mw(aLs, SA) + 0.24 * SA + mw(aRs, SA), aX0 = 550 - aWt / 2;
  M(cAns, aX0, YA, aLs, { size: SA });
  const aR = aX0 + mw(aLs, SA) + 0.24 * SA;
  M(cAns, aR, YA, aRs, { size: SA, fill: GREEN });
  const aUnder = E('path', { d: `M${aX0 - 10},${YA + 22} L${aX0 + aWt + 10},${YA + 22}`, stroke: '#E2B33C', 'stroke-width': 7, 'stroke-linecap': 'round' }, cAns);
  mkDash(aUnder);
  const q3xy = aR + mw('3xy', SA) / 2, q2x = centreOf(aR, '3xy(2x', '2x', SA), q3y = centreOf(aR, '3xy(2x + 3y', '3y', SA);
  const qY = YA - 0.8 * SA;
  const kA1 = arrow(cAns, q3xy, qY, q2x, qY, { color: BLUE, width: 4, bend: -26 });
  const kA2 = arrow(cAns, q3xy, qY, q3y, qY, { color: BLUE, width: 4, bend: -46 });
  const kP1 = M(cAns, 335, 298, '3xy * 2x = 6x^2y', { size: 38, anchor: 'middle', fill: BLUE });
  const kP2 = M(cAns, 765, 298, '3xy * 3y = 9xy^2', { size: 38, anchor: 'middle', fill: BLUE });
  const stampOk2 = xpStamp(Lfg, true);
  const glint = G(Ltoon);
  E('path', { d: 'M0,-22 L5,-5 L22,0 L5,5 L0,22 L-5,5 L-22,0 L-5,-5 Z', fill: '#FFFFFF' }, glint);

  /* ================= the cast ================= */
  const mum = cast(Lcast, 'mum');
  const priya = cast(Lcast, 'priya');
  const kav = cast(Lcast, 'kavya');
  const boy = cast(Lcast, 'boy');
  const tan = cast(Lcast, 'tan');
  const ax = cast(Ltoon, 'x', { s: 0.5 });
  const test = xpTest(Ltoon, { s: 0.3 });
  const sparks = [[-70, -60], [74, -40], [-50, 50]].map(([x, y]) => { const s = spark(Ltoon, 14, { color: GOLD }); return { s, x, y }; });
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cuts */
  const cH0 = at('hard') - 0.06, cL0 = at('heist') - 0.06, cA2 = at('gap') - 0.06;
  const bagX = (k, i) => 925 + (i - (k - 1) / 2) * (k === 2 ? 190 : k === 3 ? 150 : 84);

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const sH = on(t, cH0, cL0), sL = on(t, cL0, cA2), sA = 1 - sH - sL;
    flat.upd(t, 1);
    flat.clock.set(5, Math.floor(t / 60));
    [c5pm, cWord, cNotFully, cBehind, cHcf1, c17, cTitle, cTake, cLow, cHcf, ...cBag].forEach(c => c.set(0));
    op(card, 0); [cJob, cX, cW, cH, cS, cG, cP].forEach(g => op(g, 0));
    op(retest, 0); op(lu, 0); op(luLab, 0); op(tiles, 0); op(xNote, 0); op(rBr, 0); op(cAns, 0);
    stampOk1.set(0); stampOk2.set(0); op(glint, 0); op(test, 0); sparks.forEach(s => op(s.s, 0)); op(crumbs, 0);
    op(giant, 0);
    const show = { mum: 0, priya: 0, kav: 0, boy: 0, tan: 0, ax: 0 };

    // lights: dim for the heist, back up at the end of "check"
    const dimP = sL ? P(t, mid('heist', 0.05), 0.6, linear) * (1 - P(t, mid('check', 0.78), 0.6, linear)) : 0;
    op(dim1, 0.62 * dimP); op(dim2, 0.55 * dimP);

    // the table props
    packs.forEach(p => op(p, 1));
    op(tray, sL ? 0 : 1); tray.set(17);
    // bags: how many are in use, and filled
    let k = 6, kPrev = 6, kT = 0, fill = 0, bagsOn = 1;
    if (t < at('two')) { k = 6; kPrev = 6; fill = 0; }
    else if (t < at('three')) { k = 2; kPrev = 6; kT = at('two'); fill = 1; }
    else if (t < at('hcf')) { k = 3; kPrev = 2; kT = at('three'); fill = 1; }
    else { k = 6; kPrev = 3; kT = mid('hcf', 0.62); fill = t > mid('hcf', 0.62) ? 1 : 0; }
    if (sL) bagsOn = 0;
    const bp = P(t, kT, 0.45, easeOut);
    bags.forEach((b, i) => {
      const inK = i < k, inPrev = i < kPrev;
      let x = bagX(k, Math.min(i, k - 1)), o = inK ? 1 : 0;
      if (inK && inPrev) x = lerp(bagX(kPrev, i), bagX(k, i), bp);
      else if (inK) { x = bagX(k, i); o = bp; }
      else if (inPrev) { x = bagX(kPrev, i); o = 1 - bp; }
      // prime: the six bags slide together and vanish into one giant bag
      const col = t >= at('prime') ? P(t, mid('prime', 0.6), 0.45, easeIn) : 0;
      x = lerp(x, 925, col); o *= 1 - col;
      op(b, o * bagsOn); tr(b, x, 530, 0.95);
      op(b.peek, fill * (t < at('two') ? 0 : 1));
    });
    if (t >= at('prime')) {
      const gp = P(t, mid('prime', 0.78), 0.5, pop);
      op(giant, clamp(gp * 3)); tr(giant, 925, 530, Math.max(0.01, 1.3 * gp));
    }

    /* ---------- A: the table ---------- */
    if (sA) {
      show.mum = show.priya = show.kav = show.boy = show.ax = 1;
      tr(mum, 112, 448, 0.86); tr(priya, 262, 448, 0.88); tr(kav, 410, 448, 0.88); tr(boy, 548, 458, 0.9);
      op(crumbs, 1); tr(crumbs, 548, 488);
      let mm = 'neutral', ml = 0.5, pm = 'smug', pl = 0.5, km = 'neutral', kl = 0.5, bm = 'happy', bl = 0.5, blift = 0, plift = 0;
      let xm = 'deadpan', xl = -0.5, xarms = 0.55, xs = 1;
      const late = t >= cA2;
      if (!late) {
        // five
        pc(c5pm, t, mid('five', 0.05), at('bags')); tr(c5pm, 760, 170);
        pc(cWord, t, mid('five', 0.55), at('bags')); tr(cWord, CX, 260);
        if (t < at('bags')) { km = t > mid('five', 0.6) ? 'annoyed' : 'neutral'; kl = 0.6; }
        op(card, t >= at('bags') ? fin(t, at('bags')) : 0);
        if (t >= at('bags') && t < at('x')) {
          op(cJob, 1); jobRows.forEach((r, i) => op(r, fin(t, mid('bags', [0.05, 0.4, 0.62][i]))));
          ml = 0.8; kl = -0.7; pl = -0.7; bl = -0.8; mm = 'neutral';
        }
        if (t >= at('x') && t < at('two')) {
          op(cX, 1); km = 'neutral'; kl = 1; ml = 0.7; pl = 0.7;
          const qp = fin(t, mid('x', 0.45), 0.25); op(qQ, 1 - qp); op(qx, qp);
          op(xTxt, fin(t, mid('x', 0.3))); op(xExp, fin(t, mid('x', 0.62)));
          op(x12, fin(t, mid('x', 0.75))); op(x18, fin(t, mid('x', 0.82)));
        }
        if (t >= at('two') && t < at('hcf')) {
          op(cW, 1);
          wk.show(0, fin(t, mid('two', 0.2), 0.35));
          wk.show(1, t >= at('three') ? fin(t, mid('three', 0.2), 0.35) : 0);
          const inF = t >= at('fully');
          [0, 1].forEach(i => op(wk.lines[i].inner.lastChild, inF ? 1 - fin(t, mid('fully', 0.05), 0.2) : 1));
          ticks.forEach((k2, i) => op(k2, inF ? fin(t, mid('fully', 0.1 + 0.12 * i)) : 0));
          wk.hl(0, inF ? fin(t, mid('fully', 0.42)) : 0);
          op(wBut, inF ? fin(t, mid('fully', 0.45)) : 0);
          pc(cNotFully, t, mid('fully', 0.72));
          if (t < at('three')) { pm = 'smug'; pl = 1; plift = 1; ml = -0.5; kl = -0.7; bl = -0.7; pc(cBag[0], t, mid('two', 0.4)); tr(cBag[0], 925, 400); }
          else if (t < at('fully')) { bm = 'happy'; blift = 1; bl = 1; pl = 1; kl = 1; ml = 1; pm = 'annoyed'; pc(cBag[1], t, mid('three', 0.3)); tr(cBag[1], 925, 400); }
          else { ml = 1; pl = 1; kl = 1; bl = 1; pm = t > mid('fully', 0.6) ? 'shock' : 'smug'; xm = 'smug'; xl = -1; }
        }
        if (t >= at('hcf') && t < at('six')) {
          op(cH, 1); km = 'happy'; kl = 1; ml = 0.6; pl = 0.6; bl = -0.6;
          f12.forEach((m, i) => op(m, fin(t, mid('hcf', 0.04 + i * 0.03))));
          f18.forEach((m, i) => op(m, fin(t, mid('hcf', 0.14 + i * 0.03))));
          mkDraw(ring12, P(t, mid('hcf', 0.36), 0.4, linear)); mkDraw(ring18, P(t, mid('hcf', 0.36), 0.4, linear));
          op(fComm, fin(t, mid('hcf', 0.3))); op(hcf6, fin(t, mid('hcf', 0.45)));
          pc(cBag[2], t, mid('hcf', 0.66)); tr(cBag[2], 925, 400);
        }
        if (t >= at('six')) {
          op(cS, 1); xm = t > mid('six', 0.8) ? 'smug' : 'deadpan'; xarms = t > mid('six', 0.75) ? 1 : 0.55; xl = -1;
          ml = 1; kl = 1; pl = 1; bl = 1; km = t > mid('six', 0.8) ? 'happy' : 'neutral';
          sA1.set(P(t, mid('six', 0.4), 0.4, easeOut)); sA2.set(P(t, mid('six', 0.5), 0.45, easeOut));
          op(sP1, fin(t, mid('six', 0.45))); op(sP2, fin(t, mid('six', 0.55)));
          stampOk1.set(P(t, mid('six', 0.76), 0.35, linear)); tr(stampOk1, CX, 350, 0.42);
        }
      } else {
        // gap / one / like / confess / prime
        op(card, t < mid('prime', 0.62) ? 1 : 1 - fin(t, mid('prime', 0.62), 0.25));
        if (t < at('confess')) {
          op(cG, 1);
          const inOne = t >= at('one'), dropAt = mid('one', 0.38), fullAt = mid('one', 0.55);
          op(gA, inOne && t >= fullAt ? 0 : 1); op(gB, inOne && t >= fullAt ? 0 : 1);
          op(gHole, (t < fullAt ? 1 : 0) * fin(t, mid('gap', 0.5), 0.2));
          op(gFull, inOne ? fin(t, fullAt, 0.2) : 0);
          const dp = inOne ? P(t, dropAt, 0.45, easeIn) : 0;
          op(gDrop, inOne && t < fullAt + 0.2 ? fin(t, dropAt - 0.2, 0.2) : 0); tr(gDrop, 0, lerp(-110, 0, dp));
          op(gDiv, inOne ? fin(t, mid('one', 0.05)) : 0);
          op(gChk, inOne ? fin(t, mid('one', 0.68)) : 0);
          pc(cBehind, t, mid('one', 0.8), at('confess')); tr(cBehind, 470, 300);
          if (!inOne) { bm = 'happy'; blift = 1; bl = 1; ml = 1; pl = 1; kl = 1; km = t > mid('gap', 0.6) ? 'annoyed' : 'neutral'; }
          else { xm = t > mid('one', 0.5) ? 'smug' : 'deadpan'; xl = -1; bl = 1; kl = 1; ml = 1; pl = 1; bm = t > fullAt ? 'shock' : 'happy'; km = 'happy'; }
          if (t >= at('like')) {
            km = 'happy'; kl = 0; pm = 'smug'; pl = 0.8; ml = 0.8; bl = -1; xm = 'smug';
            op(test, 1); tr(test, 396, 536, 0.85, -8 + Math.sin(t * 5) * 3 * AMP);
            sparks.forEach(({ s, x, y }, i) => { op(s, 0.5 + 0.5 * Math.sin(t * 7 + i * 2)); tr(s, 410 + x * 1.2, 520 + y, 0.8 + 0.3 * Math.sin(t * 5 + i)); });
          }
        } else {
          op(cP, 1);
          tr(pEx, 0, t < at('prime') ? 72 : lerp(72, 0, P(t, at('prime') - 0.05, 0.35, ease)));
          // confess: only 17 ladoos; everyone turns to Ah Boy
          mkDraw(s18, P(t, mid('confess', 0.4), 0.3, linear)); op(p17, fin(t, mid('confess', 0.6)));
          pc(c17, t, mid('confess', 0.3), at('prime')); tr(c17, 470, 300);
          bm = 'happy'; bl = 0; ml = 1; mm = 'annoyed'; pl = 1; kl = 1; km = 'shock'; pm = 'shock'; xl = -1; xm = 'deadpan';
          const inP = t >= at('prime');
          op(pR12, inP ? fin(t, mid('prime', 0.05)) : 0); op(pR17, inP ? fin(t, mid('prime', 0.15)) : 0);
          mkDraw(pRing1, inP ? P(t, mid('prime', 0.3), 0.3, linear) : 0); mkDraw(pRing2, inP ? P(t, mid('prime', 0.3), 0.3, linear) : 0);
          if (inP) {
            pc(cHcf1, t, mid('prime', 0.35)); tr(cHcf1, 470, 300);
            km = 'deadpan'; pm = 'deadpan'; mm = t > mid('prime', 0.8) ? 'deadpan' : 'annoyed'; bm = 'happy'; xm = 'deadpan';
            if (t > mid('prime', 0.78)) { bl = 1; ml = 0.6; kl = 0.8; pl = 0.8; xl = 1; }
          }
          tray.set(17);
        }
      }
      mum.set({ t, talk: scTalk(S, t, 'mum'), mood: mm, look: ml });
      priya.set({ t, talk: scTalk(S, t, 'priya'), mood: pm, look: pl, lift: plift });
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: bm, look: bl, lift: blift });
      tr(ax, 655, 530 - 135 * 0.55, 0.55);
      ax.set({ t, talk: scTalk(S, t, 'x'), mood: xm, look: xl, arms: xarms, shades: xs, badge: 0 });
    }

    /* ---------- H: the retest preview ---------- */
    if (sH) {
      show.kav = show.tan = 1;
      tr(kav, 250, 448, 0.92); tr(tan, 440, 448, 0.92);
      kav.set({ t, mood: t > mid('hard', 0.55) ? 'shock' : 'neutral', look: 1, sweat: t > mid('hard', 0.6) ? 1 : 0 });
      tan.set({ t, talk: scTalk(S, t, 'tan'), mood: 'happy', look: 1, lift: 1 });
      const rp = P(t, mid('hard', 0.15), 0.4, pop);
      op(retest, clamp(rp * 3)); tr(retest, 872, 250, Math.max(0.01, 0.8 + 0.2 * rp));
      pc(cHard, t, mid('hard', 0.08));
    }

    /* ---------- L: the heist ---------- */
    if (sL) {
      show.mum = show.priya = show.kav = show.boy = show.ax = 1;
      tr(mum, 95, 452, 0.82); tr(boy, 210, 462, 0.86); tr(priya, 318, 452, 0.84); tr(kav, 440, 452, 0.84);
      op(crumbs, 1); tr(crumbs, 210, 492);
      const inLU = t >= at('lineup') - 0.1, inLeft = t >= at('left'), inAns = t >= at('answer'), inChk = t >= at('check');
      // the title, before the line-up rolls in
      if (!inLU) {
        pc(cTitle, t, mid('heist', 0.2)); tr(cTitle, 862, 270);
        pc(cTake, t, mid('heist', 0.55)); tr(cTake, 862, 360);
        op(glint, P(t, mid('heist', 0.12), 0.2, linear) * (1 - P(t, mid('heist', 0.12) + 0.5, 0.3, linear)));
        tr(glint, 520 + 14, 530 - 135 * 0.55 - 72 * 0.55, 0.6 + 0.6 * P(t, mid('heist', 0.12), 0.4, pop), t * 90);
      }
      // the line-up and its tiles
      const luP = inLU ? fin(t, at('lineup') - 0.1, 0.3) * (inAns ? 1 - fin(t, at('answer') - 0.05, 0.25) : 1) : 0;
      op(lu, luP); op(luLab, luP);
      const leftP = inLeft ? P(t, mid('left', 0.08), 0.5 * (end('left') - at('left')), ease) : 0;
      const inP = inLeft ? P(t, mid('left', 0.55), 0.35 * (end('left') - at('left')), ease) : 0;
      op(timesG, 1 - leftP);
      op(tiles, inLU ? (inAns ? 1 - fin(t, at('answer') + 0.1, 0.3) : 1) : 0);
      const tileIn = i => (inLU ? clamp(P(t, mid('lineup', 0.12 + i * 0.065), 0.25, linear)) : 0);
      const place = (tl, row, i) => {
        let x = TX0 + i * TP, y = RY[row], s = TS;
        const mv = MOVE.find(m => m[0] === tl);
        if (mv) {
          const p = mv[2] === 'out' ? leftP : inP, lift = mv[2] === 'out' ? Math.sin(clamp(leftP) * Math.PI) * 60 : 0;
          x = lerp(x, slot[mv[1]], p); y = lerp(y, RYr, p) - lift; s = lerp(TS, RS, p);
        }
        tr(tl, x, y, s);
        let o = tileIn(row * 5 + i);
        if (mv && mv[2] === 'out' && row === 1) o *= 1 - P(t, mid('left', 0.08) + 0.5 * (end('left') - at('left')) - 0.15, 0.2, linear);   // the two copies merge into one
        op(tl, o);
      };
      t1.forEach((tl, i) => place(tl, 0, i)); t2.forEach((tl, i) => place(tl, 1, i));
      // the gold rings: 3s on "num", one x each on "lowx", one y each on "lowy"
      const rg = (tl, t0) => tl.hl(t >= t0 && !inAns ? fin(t, t0, 0.25) : 0);
      [...t1, ...t2].forEach(tl => tl.hl(0));
      rg(t1[1], mid('num', 0.15)); rg(t2[0], mid('num', 0.3));
      rg(t1[2], mid('lowx', 0.4)); rg(t2[2], mid('lowx', 0.4));
      rg(t1[4], mid('lowy', 0.2)); rg(t2[3], mid('lowy', 0.2));
      op(xNote, t >= at('lowx') && !inLeft ? fin(t, mid('lowx', 0.2)) : 0);
      pc(cLow, t, mid('lowx', 0.65), at('left')); tr(cLow, 300, 170);
      pc(cHcf, t, mid('lowy', 0.5), at('left')); tr(cHcf, 300, 250);
      op(rBr, inLeft ? fin(t, mid('left', 0.5), 0.3) * (inAns ? 1 - fin(t, at('answer') + 0.1, 0.3) : 1) : 0);
      // answer and check
      if (inAns) {
        op(cAns, fin(t, at('answer') + 0.1, 0.3));
        mkDraw(aUnder, P(t, mid('answer', 0.55), 0.5, linear));
        kA1.set(inChk ? P(t, mid('check', 0.15), 0.45, easeOut) : 0); kA2.set(inChk ? P(t, mid('check', 0.38), 0.45, easeOut) : 0);
        op(kP1, inChk ? fin(t, mid('check', 0.2)) : 0); op(kP2, inChk ? fin(t, mid('check', 0.43)) : 0);
        stampOk2.set(inChk ? P(t, mid('check', 0.72), 0.35, linear) : 0); tr(stampOk2, 850, 430, 0.5);
      }
      // reactions
      let km = 'neutral', kl = 1, pm = 'smug', pl = 1, mm = 'neutral', ml = 1, bm = 'happy', bl = 1;
      if (t >= at('num') && t < at('lowx')) { pm = 'happy'; }
      if (t >= at('lowx') && t < at('lowy')) { km = 'neutral'; kl = 1; pl = 0.8; }
      if (t >= at('lowy') && t < at('left')) { pm = 'smug'; }
      if (t >= at('left') && t < at('answer')) { km = 'happy'; pm = 'happy'; bm = 'happy'; mm = 'happy'; kl = -0.2; pl = -0.2; ml = 0.4; bl = 0.6; }
      if (inAns) { km = 'happy'; pm = 'happy'; mm = 'happy'; kl = 0.3; pl = 0.6; ml = 0.8; bl = 0.8; }
      mum.set({ t, talk: scTalk(S, t, 'mum'), mood: mm, look: ml });
      priya.set({ t, talk: scTalk(S, t, 'priya'), mood: pm, look: pl });
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl, lift: 0 });
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: bm, look: bl });
      const hop = P(t, cL0, 0.4, pop);
      tr(ax, lerp(655, 520, clamp(hop)), 530 - 135 * 0.55 - Math.sin(clamp(hop) * Math.PI) * 50, 0.55);
      const xarms = t < at('lineup') ? 1 : inChk && t > mid('check', 0.72) ? 1 : 0.55;
      ax.set({ t, talk: scTalk(S, t, 'x'), mood: inChk && t > mid('check', 0.72) ? 'smug' : 'deadpan', look: 1, arms: xarms, shades: 1, badge: 0 });
    }

    op(mum, show.mum); op(priya, show.priya); op(kav, show.kav); op(boy, show.boy); op(tan, show.tan); op(ax, show.ax);
  };
});
