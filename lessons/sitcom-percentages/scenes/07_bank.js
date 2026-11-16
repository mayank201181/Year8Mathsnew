/* Scene 7: Snowy at the bank (profit and loss, simple interest; compound interest and repeated change).
   Shots (hard sitcom cuts):
   A  4 p.m., the bank (pcShop bank, the SAVINGS RATES board): Ah Boy, Priya, Kavya and Dad behind the counter. Ah Boy
      holds up his ang bao: $500 -> Priya the businesswoman: her old bike, bought $150, sold $186.
   B  the whiteboard (board right, Percy in the left slot, a human leaning in bottom-left): profit = 186 − 150 = $36,
      36/150 × 100 = 24% out of the cost price (Olive peeks in: cost price = the original) -> Ah Boy: P = $500, R = 3%,
      T = 4 years -> Dad: I = PRT/100 = (500 × 3 × 4)/100 = $60 -> Kavya: $15 a year, coin stacks, 500 + 60 = $560.
   A2 the bank: Snowy rolls along the counter (lower third), the Compound 10% p.a. rate glows.
   C  the whiteboard, Snowy in the slot growing: the table year 0-3, compound $1000 -> $1100 -> $1210 -> $1331 (× 1.1),
      then the simple column $1000 -> $1300 (+$100): same amount vs same percentage -> the showpiece graph, years 0-10:
      simple line to $2000, compound curve to 1000 × 1.1^10 ≈ $2593.74, a little snowball rolling up the curve ->
      Ah Boy (his banner in the corner): +10% then −10% = back to the start? -> Olive: WRONG WHOLE!, bars to scale
      $100 -> $110 (+$10) -> $99 (−$11) -> Snowy: × 1.1 × 0.9 = × 0.99, a 1% loss, 100% CORRECT -> Kavya: the banner,
      × 0.5 × 0.8 = × 0.4, pay 40% = 60% off, not 70%.
   A3 the bank: Ah Boy dreams of $10 -> $1,000,000 at 2% compound; Snowy: about 582 years (an old Ah Boy appears in
      the dream); "I can wait." Hold. */
scene('bank', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const view = (el, k, fx, fy, sx, sy) => el.setAttribute('transform', `translate(${sx.toFixed(1)} ${sy.toFixed(1)}) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const popAt = (el, t, t0, x, y, t1) => { el.set(t >= t0 && t < (t1 === undefined ? 1e9 : t1) ? P(t, t0, 0.4, linear) : 0); tr(el, x, y); };
  const chipM = (parent, text, col, size) => mkChip(parent, text, { size: size || 30, col: col || C.ink });
  const fadeIn = (el, t, t0, d) => op(el, P(t, t0, d || 0.3, linear));
  const GOLD = '#FFE45C', RED = '#D32F2F', INK = MK.ink, GREEN = '#1E9E5A', BLUE = '#2E5AAC', MUTED = '#6B5E50', SNOW = '#3A8DDE';
  const BXC = 840;   // whiteboard centre x

  /* a bicycle, centred, about 180 x 110 */
  const bike = (parent, col) => {
    const g = G(parent);
    [-56, 56].forEach(x => { E('circle', { cx: x, cy: 20, r: 36, fill: 'none', stroke: SC_INK, 'stroke-width': 7 }, g); E('circle', { cx: x, cy: 20, r: 5, fill: SC_INK }, g); });
    E('path', { d: 'M-56,20 L-18,-30 L40,-30 L56,20 M-18,-30 L4,20 L40,-30 M4,20 L-56,20 M40,-30 L34,-52 L54,-56', fill: 'none', stroke: col || '#C2185B', 'stroke-width': 7, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
    E('path', { d: 'M-30,-40 L-4,-40', stroke: SC_INK, 'stroke-width': 8, 'stroke-linecap': 'round' }, g);
    return g;
  };
  /* a gold coin seen at an angle, centred */
  const coin = (parent, x, y, s) => {
    const g = G(parent); tr(g, x, y, s || 1);
    E('ellipse', { cy: 5, rx: 34, ry: 11, fill: PC.goldDk, stroke: SC_INK, 'stroke-width': 3 }, g);
    E('ellipse', { rx: 34, ry: 11, fill: ball(PC.gold, PC.goldDk), stroke: SC_INK, 'stroke-width': 3 }, g);
    return g;
  };

  /* ================= the bank ================= */
  const shop = pcShop(root, { name: 'BANK', kind: 'bank', col: '#1E3A5A', poster: null });
  const back = shop.firstChild;
  const rateGlow = E('rect', { x: 400 - 216, y: 200 + 120, width: 432, height: 46, rx: 10, fill: 'none', stroke: GOLD, 'stroke-width': 6 }, back);
  // Ah Boy's banner, small, from 'updown' on (on the back wall in the shop; top-left in the board shots)
  const Lban = G(root), miniBan = G(Lban);
  const mb1 = pcBanner(miniBan, '**50%** OFF', { w: 180, h: 70, size: 30 }); tr(mb1, 0, 0);
  const mb2 = pcBanner(miniBan, '+ **20%** OFF', { w: 180, h: 70, size: 30, col: '#C2185B' }); tr(mb2, 220, 0);
  const Lwash = G(shop.mid), Lboard = G(shop.mid), Lmid = G(shop.mid);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#EEF2F6', opacity: 0.88 }, Lwash);
  const Lfg = G(root), Lstar = G(root), Lhud = G(root);

  // A: the ang bao in Ah Boy's hand; Priya's bike card
  const bikeCard = G(Lfg);
  E('rect', { x: -170, y: -120, width: 340, height: 240, rx: 18, fill: '#FFFDF6', stroke: '#9C8A6A', 'stroke-width': 5 }, bikeCard);
  const bk = bike(bikeCard); tr(bk, 0, -50, 0.85);
  const bc1 = mkText(bikeCard, 0, 38, 'bought **$150**', { size: 34, anchor: 'middle', fill: INK, boldFill: RED });
  const bc2 = mkText(bikeCard, 0, 88, 'sold **$186**', { size: 34, anchor: 'middle', fill: INK, boldFill: GREEN });

  /* ================= the whiteboard ================= */
  const wb = mkWhiteboard(Lboard, 620, 470); tr(wb, BXC, 370);
  const txt = (parent, y, s, o) => mkText(parent, BXC, y, s, Object.assign({ size: 34, anchor: 'middle', fill: INK }, o || {}));
  const mth = (parent, y, s, o) => mkMath(parent, BXC, y, s, Object.assign({ size: 46, anchor: 'middle', fill: INK }, o || {}));
  // pct: profit %
  const bPct = G(Lboard);
  const pA = txt(bPct, 200, 'Bought **$150**, sold **$186**', { size: 32, boldFill: BLUE });
  const pB = mth(bPct, 280, '"profit" = 186 − 150 = $36', { size: 42 });
  const pC = mth(bPct, 390, '36/150 × 100 = 24%', { size: 50, fill: GREEN });
  const fracW = mkMeasure('36/150', { size: 50 }).w, fracX = pC.x0 + fracW / 2;
  const pD = G(bPct);
  mkText(pD, fracX, 500, '**cost price**', { size: 30, anchor: 'middle', fill: RED, boldFill: RED });
  arrow(pD, fracX, 470, fracX, 438, { color: RED, width: 4, head: 14 });
  const pE = txt(bPct, 560, 'profit % is out of the **cost price**', { size: 30, boldFill: RED });
  // save
  const bSave = G(Lboard);
  const sA = txt(bSave, 200, 'Ah Boy: **simple interest**', { size: 34, boldFill: BLUE });
  const sRows = [['**P** = $500', 'principal'], ['**R** = 3%', 'rate, a year'], ['**T** = 4', 'years']].map(([a, b], i) => {
    const g = G(bSave), y = 290 + i * 74;
    mkText(g, 620, y, a, { size: 40, fill: INK, boldFill: BLUE });
    mkText(g, 860, y, b, { size: 30, fill: MUTED });
    return g;
  });
  const sQ = txt(bSave, 540, 'How much after **4 years**?', { size: 32, boldFill: RED });
  // si
  const bSi = G(Lboard);
  const iA = txt(bSi, 196, '**Simple interest**', { size: 34, boldFill: BLUE });
  const iW = mkWorking(bSi, BXC - 80, 236, ['I = PRT/100', '= (500 × 3 × 4)/100', '= $60'], { size: 46, fill: INK, gap: 22, ringCol: GREEN });
  // same: coins
  const bSame = G(Lboard);
  const cA = txt(bSame, 200, '{{60 ÷ 4 = $15}} every year', { size: 36 });
  const stacks = [];
  for (let k = 1; k <= 4; k++) {
    const g = G(bSame), x = BXC - 225 + (k - 1) * 150, coins = [];
    for (let j = 0; j < k; j++) coins.push(coin(g, x, 380 - j * 22, 1));
    T(g, x, 438, 'Year ' + k, { size: 26, weight: 700, anchor: 'middle', fill: MUTED });
    const v = mkMath(g, x, 476, '$' + 15 * k, { size: 32, anchor: 'middle', fill: '#8A5A08' });
    stacks.push({ g, coins, v });
  }
  const cW = mkWorking(bSame, BXC + 20, 508, ['500 + 60 = $560'], { size: 46, fill: GREEN, ringCol: GREEN });
  // roll and simple: the table
  const bTab = G(Lboard);
  const TX = BXC - 280, TY = 168;
  const tab = mkTable(bTab, [['Year', 'Simple', 'Compound'], ['0', '$1000', '$1000'], ['1', '$1100', '$1100'], ['2', '$1200', '$1210'], ['3', '$1300', '$1331']],
    { colW: [100, 180, 200], rowH: 62, size: 32, ink: INK, fill: '#FFFFFF', headFill: '#DCE8FA' });
  tr(tab, TX, TY);
  const xArr = [1, 2, 3].map(r => {
    const g = G(bTab), y0 = TY + r * 62 + 31, y1 = y0 + 62;
    arrow(g, TX + 498, y0 + 4, TX + 498, y1 - 4, { color: SNOW, width: 4, head: 12, bend: -22 });
    mkMath(g, TX + 522, (y0 + y1) / 2 + 10, '× 1.1', { size: 26, fill: SNOW });
    return g;
  });
  const sumS = mkText(bTab, TX + 150, 520, 'same **amount**\n+$100 a year', { size: 26, anchor: 'middle', fill: INK, boldFill: '#C2185B', lh: 2 });
  const sumC = mkText(bTab, TX + 400, 520, 'same **percentage**\n{{× 1.1}} a year', { size: 26, anchor: 'middle', fill: INK, boldFill: SNOW, lh: 2 });
  // power: the graph, years 0-10, $1000-$2600
  const bGr = G(Lboard);
  const GX0 = 650, GW = 450, GY0 = 570, KY = 0.175;
  const gx = yr => GX0 + yr * GW / 10, gy = v => GY0 - (v - 1000) * KY;
  const grid = G(bGr);
  [1000, 1500, 2000, 2500].forEach(v => {
    E('line', { x1: GX0, y1: gy(v), x2: GX0 + GW, y2: gy(v), stroke: '#C9D3DC', 'stroke-width': 2 }, grid);
    T(grid, GX0 - 10, gy(v) + 9, '$' + v, { size: 26, weight: 700, anchor: 'end', fill: MUTED });
  });
  [0, 2, 4, 6, 8, 10].forEach(yr => T(grid, gx(yr), GY0 + 30, String(yr), { size: 26, weight: 700, anchor: 'middle', fill: MUTED }));
  E('path', { d: `M${GX0},${gy(2600)} L${GX0},${GY0} L${GX0 + GW + 10},${GY0}`, fill: 'none', stroke: INK, 'stroke-width': 4 }, grid);
  T(grid, GX0 + GW + 6, GY0 - 12, 'years', { size: 26, weight: 700, anchor: 'end', fill: MUTED });
  const simL = E('path', { d: `M${gx(0)},${gy(1000)} L${gx(10)},${gy(2000)}`, fill: 'none', stroke: '#C2185B', 'stroke-width': 6, 'stroke-linecap': 'round' }, bGr);
  mkDash(simL);
  let cd = '';
  for (let i = 0; i <= 50; i++) { const yr = i / 5; cd += (i ? 'L' : 'M') + gx(yr).toFixed(1) + ',' + gy(1000 * Math.pow(1.1, yr)).toFixed(1) + ' '; }
  const comL = E('path', { d: cd, fill: 'none', stroke: SNOW, 'stroke-width': 6, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, bGr);
  mkDash(comL);
  const ptS = G(bGr); E('circle', { cx: gx(10), cy: gy(2000), r: 8, fill: '#C2185B' }, ptS);
  mkText(ptS, gx(10), GY0 - 40, 'simple: **$2000**', { size: 28, anchor: 'end', fill: INK, boldFill: '#C2185B', halo: '#F7FAFC' });
  const ptC = G(bGr); E('circle', { cx: gx(10), cy: gy(2593.74), r: 8, fill: SNOW }, ptC);
  mkText(ptC, gx(10) - 14, gy(2593.74) + 8, 'compound', { size: 28, anchor: 'end', fill: SNOW, weight: 800, halo: '#F7FAFC' });
  const grT = mth(bGr, 196, '1000 × 1.1^10 ≈ $2593.74', { size: 40, fill: SNOW });
  const ball2 = G(bGr);
  E('circle', { r: 12, fill: ball('#FFFFFF', PC.iceDk), stroke: SC_INK, 'stroke-width': 3 }, ball2);
  // updown and wrong
  const bUp = G(Lboard);
  const uA = txt(bUp, 210, '**+10%**, then **−10%**', { size: 40, boldFill: BLUE });
  const uB = txt(bUp, 270, '= back to the start?', { size: 34, fill: MUTED });
  const BAR0 = 650, KB = 3.6;
  const barRows = [[100, '$100', '#9FC3EE', 'start'], [110, '$110', '#7FD49A', '+10%'], [99, '$99', '#F2A27A', '−10%']].map(([v, lab, col, nm], i) => {
    const g = G(bUp), y = 320 + i * 72;
    T(g, BAR0 - 12, y + 36, nm, { size: 28, weight: 800, anchor: 'end', fill: INK });
    E('rect', { x: BAR0, y, width: v * KB, height: 50, fill: col, stroke: INK, 'stroke-width': 3 }, g);
    T(g, BAR0 + 14, y + 35, lab, { size: 28, weight: 800, fill: INK });
    return g;
  });
  const extra = G(bUp);
  E('rect', { x: BAR0 + 360, y: 392, width: 36, height: 50, fill: '#3FB37A', stroke: INK, 'stroke-width': 3 }, extra);
  T(extra, BAR0 + 404, 428, '+$10', { size: 28, weight: 800, fill: GREEN });
  const cutP = G(bUp);
  E('rect', { x: BAR0 + 356.4, y: 464, width: 39.6, height: 50, fill: 'none', stroke: RED, 'stroke-width': 3, 'stroke-dasharray': '7 5' }, cutP);
  T(cutP, BAR0 + 404, 500, '−$11', { size: 28, weight: 800, fill: RED });
  const dash100 = E('line', { x1: BAR0 + 360, y1: 306, x2: BAR0 + 360, y2: 528, stroke: INK, 'stroke-width': 3, 'stroke-dasharray': '8 6' }, bUp);
  const uC = txt(bUp, 572, '10% **of 110** = $11', { size: 32, boldFill: RED });
  // chain
  const bCh = G(Lboard);
  const hA = mkChip(bCh, 'Changes in a row? **Multiply the multipliers**', { size: 26, col: SNOW, solid: true, fill: '#DCEBFA' });
  tr(hA, BXC, 200);
  const hB = mth(bCh, 300, '× 1.1 × 0.9 = × 0.99', { size: 52 });
  const hC = txt(bCh, 390, '{{0.99 = 99%}}: a **1%** loss', { size: 38, boldFill: RED });
  // banner
  const bBan = G(Lboard);
  const nA = txt(bBan, 200, '**50%** off, then **20%** off', { size: 36, boldFill: RED });
  const nB = mth(bBan, 290, '× 0.5 × 0.8 = × 0.4', { size: 52 });
  const nC = txt(bBan, 380, 'pay **40%** → **60% off**', { size: 42, boldFill: GREEN });
  const nD = G(bBan);
  mkText(nD, BXC, 480, 'not **70%** off', { size: 38, anchor: 'middle', fill: MUTED, boldFill: RED });
  const nX = cross(nD, 20, RED); tr(nX, BXC + 150, 466);

  /* ================= chips, bubble, stamps, sparkles ================= */
  const ch = {
    four: chipM(Lfg, '**4 p.m.**', GOLD, 34),
    p500: chipM(Lfg, 'ang bao: **$500**', '#FF8FB0', 34),
    cost: chipM(Lfg, 'cost price = the **original**', GOLD, 28),
    rate: chipM(Lfg, 'interest on my **interest**!', '#9FD8FF', 30),
    two: chipM(Lfg, '{{$10}} at **2%** compound', GOLD, 28),
    yrs: chipM(Lfg, 'about **582 years**', '#9FD8FF', 36),
  };
  // Ah Boy's dream: a thought bubble with a money mountain, then an old Ah Boy beside it
  const dream = mkThoughtBubble(Lfg, '**$10** → **$1,000,000**\n \n ', { size: 30, tail: 'right', w: 400 });
  const dIn = dream.firstChild;
  const mount = G(dIn);
  [[0, 4], [1, 3], [2, 2], [3, 1]].forEach(([row, n]) => { for (let i = 0; i < n; i++) coin(mount, -90 + (i - (n - 1) / 2) * 44, 54 - row * 16, 0.62); });
  const oldBoy = G(dIn); tr(oldBoy, 110, 30, 0.7);
  E('path', { d: 'M40,-40 L46,40', stroke: '#6B4423', 'stroke-width': 6, 'stroke-linecap': 'round' }, oldBoy);    // cane
  E('path', { d: 'M-28,40 L-22,-14 Q0,-34 22,-14 L30,40 Z', fill: '#FF8A3D', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, oldBoy);   // orange tee
  E('path', { d: 'M3,4 l4,9 l10,1 l-8,6 l3,10 l-9,-6 l-9,6 l3,-10 l-8,-6 l10,-1 Z', fill: '#FFE45C' }, oldBoy);   // the star
  E('path', { d: 'M22,-8 Q40,0 40,-36', fill: 'none', stroke: '#B07A55', 'stroke-width': 7, 'stroke-linecap': 'round' }, oldBoy);   // arm on the cane
  E('circle', { cx: -2, cy: -42, r: 20, fill: '#B07A55', stroke: SC_INK, 'stroke-width': 3 }, oldBoy);
  E('path', { d: 'M-20,-36 Q-2,-6 16,-36 Q-2,-24 -20,-36 Z', fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 2 }, oldBoy);   // long white beard
  E('path', { d: 'M-21,-50 Q-24,-64 -12,-62 M17,-50 Q22,-64 10,-62', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 5, 'stroke-linecap': 'round' }, oldBoy);
  E('path', { d: 'M-10,-46 l6,0 M4,-46 l6,0', stroke: SC_INK, 'stroke-width': 3, 'stroke-linecap': 'round' }, oldBoy);
  const stampNo = pcStamp(Lfg, false), stampOK = pcStamp(Lfg, true);
  const stars = [];
  for (let i = 0; i < 10; i++) stars.push(spark(Lstar, 12 + (i % 3) * 5, { color: i % 2 ? GOLD : '#FFFFFF' }));

  /* ================= the cast ================= */
  const boy = cast(Lmid, 'boy', { s: 0.8 });
  const priya = cast(Lmid, 'priya', { s: 0.8 });
  const kav = cast(Lmid, 'kavya', { s: 0.8 });
  const dad = cast(Lmid, 'dad', { s: 0.8 });
  const angbao = G(boy.hand); tr(angbao, 0, -46); pcAngBao(angbao, { s: 0.62 });
  const percy = cast(Lfg, 'percy', { s: 0.95 });
  const olive = cast(Lfg, 'olive', { s: 0.8 });
  const snowy = cast(Lfg, 'snowy', { s: 0.6 });
  const ltSnowy = pcLowerThird(Lhud, 'snowy');
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cuts */
  const cB = at('pct') - 0.06, cA2 = at('snowy') - 0.06, cC = at('roll') - 0.06, cA3 = at('million') - 0.06;
  const XS = { boy: 640, priya: 790, kav: 935, dad: 1065 };
  const YS = 452;
  const LEAN = [140, 668, 0.95, 6];
  const SLOT = [300, 380];
  const SNOW_ON = [420, 520 - 114 * 0.6];
  const puff = (t, t0, x, y, r) => {
    if (t < t0 || t > t0 + 0.9) return;
    const pf = P(t, t0, 0.9, easeOut);
    stars.forEach((s, i) => { const a = i / stars.length * TAU; op(s, 1 - pf); tr(s, x + Math.cos(a) * r * pf, y + Math.sin(a) * r * 0.85 * pf, 1); s.upd(t); });
  };

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const sB = on(t, cB, cA2), sC = on(t, cC, cA3), board = sB || sC, setOn = 1 - board;
    for (const k in ch) ch[k].set(0);
    dream.set(0); stampNo.set(0); stampOK.set(0); ltSnowy.set(0);
    stars.forEach(s => op(s, 0));
    op(bikeCard, 0); op(angbao, 0);
    const show = { boy: 0, priya: 0, kav: 0, dad: 0, percy: 0, olive: 0, snowy: 0 };
    const who = scWho(S, t);

    /* ---------- the set ---------- */
    op(Lwash, board); op(Lboard, board); op(shop.front, setOn); op(shop.top, setOn);
    if (board) view(back, 1.35, 600, 330, 600, 375); else back.removeAttribute('transform');
    op(rateGlow, setOn && t >= cA2 && t < cC ? P(t, mid('snowy', 0.45), 0.3, linear) * (0.6 + 0.4 * Math.sin(t * 7)) : 0);
    // the mini banner: in the shop on the back wall; in the board shots it sits top-left of the zoomed wall
    const banOn = t >= at('updown') - 0.06;
    op(miniBan, banOn ? 1 : 0);
    if (banOn) {
      if (board) tr(miniBan, 180, 168); else tr(miniBan, 830, 202, 0.7);
      mb1.set(Math.sin(t * 1.4) * 2 * AMP); mb2.set(Math.sin(t * 1.4 + 1) * 2 * AMP);
    }

    /* ---------- the bank shots ---------- */
    if (setOn) {
      show.boy = show.priya = show.kav = show.dad = 1;
      tr(boy, XS.boy, YS + 12, 0.8); tr(priya, XS.priya, YS, 0.8); tr(kav, XS.kav, YS, 0.8); tr(dad, XS.dad, YS, 0.8);
      if (t < cB) {
        // A: four, profit
        popAt(ch.four, t, at('four') + 0.1, 700, 60);
        const holding = t >= mid('four', 0.35) && t < at('profit') + 0.4;
        op(angbao, holding ? 1 : 0);
        popAt(ch.p500, t, mid('four', 0.5), 560, 300, at('profit'));
        if (t >= mid('profit', 0.2)) {
          const p = P(t, mid('profit', 0.2), 0.4, pop);
          op(bikeCard, clamp(p * 3)); tr(bikeCard, 420, 296, Math.max(0.01, 0.6 + 0.4 * p));
          op(bc1, P(t, mid('profit', 0.45), 0.3, linear)); op(bc2, P(t, mid('profit', 0.6), 0.3, linear));
        }
        const pr = t >= at('profit');
        boy.set({ t, talk: 0, mood: 'happy', look: pr ? 0.6 : 0, lift: holding ? 1 : 0 });
        priya.set({ t, talk: scTalk(S, t, 'priya'), mood: pr ? 'smug' : 'neutral', look: pr ? -0.4 : -0.7, lift: pr && t > mid('profit', 0.3) ? 1 : 0 });
        kav.set({ t, talk: 0, mood: pr ? 'deadpan' : 'happy', look: -0.8 });
        dad.set({ t, talk: 0, mood: pr ? 'neutral' : 'happy', look: -0.8 });
      } else if (t < cC) {
        // A2: Snowy rolls along the counter
        show.snowy = 1;
        const r = P(t, at('snowy') - 0.05, 1.1, easeOut);
        tr(snowy, lerp(-140, SNOW_ON[0], r), SNOW_ON[1], 0.6, (1 - r) * 540);
        snowy.set({ t, talk: scTalk(S, t, 'snowy'), mood: 'happy', look: 0.7, still: r < 1 });
        ltSnowy.set(win(t, at('snowy') + 0.3, at('snowy') + 3.4, 0.3));
        popAt(ch.rate, t, mid('snowy', 0.55), 800, 300);
        boy.set({ t, talk: 0, mood: 'shock', look: -1 });
        priya.set({ t, talk: 0, mood: 'shock', look: -1 });
        kav.set({ t, talk: 0, mood: 'happy', look: -1 });
        dad.set({ t, talk: 0, mood: 'happy', look: -1 });
      } else {
        // A3: million, years, wait
        show.snowy = 1;
        tr(snowy, 190, 520 - 114 * 0.6, 0.6);
        const yrs = t >= at('years');
        snowy.set({ t, talk: scTalk(S, t, 'snowy'), mood: 'happy', look: 0.8 });
        const dp = P(t, mid('million', 0.25), 0.4, linear);
        dream.set(dp); tr(dream, 390, 236);
        op(oldBoy, yrs ? P(t, mid('years', 0.45), 0.3, linear) : 0);
        popAt(ch.two, t, mid('million', 0.5), 430, 400);
        popAt(ch.yrs, t, mid('years', 0.35), 430, 400);
        if (yrs) ch.two.set(0);
        boy.set({ t, talk: scTalk(S, t, 'boy'), mood: t >= at('years') && t < at('wait') ? 'shock' : 'happy', look: -0.6, lift: t < at('years') ? 1 : 0 });
        const after = t >= at('wait');
        priya.set({ t, talk: 0, mood: after ? 'deadpan' : yrs ? 'shock' : 'neutral', look: after ? -0.8 : -0.9 });
        kav.set({ t, talk: 0, mood: after ? 'deadpan' : yrs ? 'shock' : 'neutral', look: -0.9 });
        dad.set({ t, talk: 0, mood: after ? 'deadpan' : 'neutral', look: -0.9 });
      }
    }

    /* ---------- the board shots ---------- */
    if (board) {
      // the human leaning in from the bottom-left
      let hum = null, key = '', hw = '', enter = 0, hm = 'neutral', hl = 0.7, hlift = 0;
      if (sB) {
        if (t < at('save') - 0.1) { hum = priya; key = 'priya'; hw = 'priya'; enter = cB; hm = 'smug'; }
        else if (t < at('si') - 0.1) { hum = boy; key = 'boy'; hw = 'boy'; enter = at('save') - 0.1; hm = 'happy'; hlift = 1; }
        else if (t < at('same') - 0.1) { hum = dad; key = 'dad'; hw = 'dad'; enter = at('si') - 0.1; hm = t > mid('si', 0.8) ? 'smug' : 'happy'; hlift = t > mid('si', 0.2) ? 1 : 0; }
        else { hum = kav; key = 'kav'; hw = 'kavya'; enter = at('same') - 0.1; hm = t > mid('same', 0.7) ? 'happy' : 'neutral'; }
      } else {
        if (t < at('simple') - 0.1) { hum = boy; key = 'boy'; hw = 'boy'; enter = cC; hm = 'shock'; }
        else if (t < at('updown') - 0.1) { hum = kav; key = 'kav'; hw = 'kavya'; enter = at('simple') - 0.1; hm = t >= at('power') ? 'shock' : 'neutral'; }
        else if (t < at('banner') - 0.1) { hum = boy; key = 'boy'; hw = 'boy'; enter = at('updown') - 0.1;
          hm = t < at('wrong') ? 'happy' : t < mid('wrong', 0.4) ? 'shock' : t < at('chain') ? 'sad' : 'happy'; hlift = t < at('wrong') ? 1 : 0; }
        else { hum = kav; key = 'kav'; hw = 'kavya'; enter = at('banner') - 0.1; hm = t > mid('banner', 0.6) ? 'smug' : 'neutral'; }
      }
      if (hum) {
        show[key] = 1;
        tr(hum, LEAN[0], lerp(LEAN[1] + 220, LEAN[1], P(t, enter, 0.35, pop)), LEAN[2], LEAN[3]);
        hum.set({ t, talk: scTalk(S, t, hw), mood: hm, look: hl, lift: hlift });
      }
      if (sB) {
        // Percy in the slot; Olive peeks in on 'pct'
        show.percy = 1;
        const p = P(t, cB, 0.4, pop);
        tr(percy, SLOT[0], SLOT[1] + 10, Math.max(0.01, 0.95 * p));
        const spk = who === 'percy';
        percy.set({ t, talk: scTalk(S, t, 'percy'), mood: spk ? 'happy' : (who === 'dad' && t > mid('si', 0.8) ? 'smug' : 'happy'), look: spk ? 0.6 : -0.3, mic: spk ? 1 : 0 });
        if (t < at('save')) {
          const pk = t >= mid('pct', 0.55) ? P(t, mid('pct', 0.55), 0.4, ease) : 0;
          if (pk > 0) {
            show.olive = 1;
            tr(olive, lerp(-60, 92, pk), 270, 0.5, lerp(30, 12, pk));
            olive.set({ t, talk: 0, mood: 'smug', look: 0.8 });
          }
          popAt(ch.cost, t, mid('pct', 0.6), 330, 150);
        }
      } else {
        // Snowy in the slot, growing; aside from 'updown'; Olive arrives on 'wrong'
        show.snowy = 1;
        let s = 0.62, x = SLOT[0], y = SLOT[1] + 30;
        if (t < at('simple')) s = lerp(0.62, 0.8, P(t, mid('roll', 0.2), 4.0, ease));
        else if (t < at('power')) s = 0.82;
        else if (t < at('updown')) s = lerp(0.82, 1.05, P(t, mid('power', 0.15), 3.5, ease));
        else { const a = P(t, at('updown') - 0.1, 0.4, ease); s = lerp(1.05, 0.8, a); x = lerp(SLOT[0], 400, a); y = lerp(SLOT[1] + 30, 420, a); }
        const p = P(t, cC, 0.4, pop);
        tr(snowy, x, y, Math.max(0.01, s * p));
        const spk = who === 'snowy';
        snowy.set({ t, talk: scTalk(S, t, 'snowy'), mood: who === 'olive' ? 'neutral' : 'happy', look: spk ? 0.6 : (who === 'olive' ? -0.8 : 0.5) });
        if (t >= at('wrong') - 0.05) {
          show.olive = 1;
          const op_ = P(t, at('wrong') - 0.05, 0.4, pop);
          tr(olive, 160, 410, Math.max(0.01, 0.8 * op_));
          puff(t, at('wrong') - 0.05, 160, 410, 140);
          const ospk = who === 'olive';
          olive.set({ t, talk: scTalk(S, t, 'olive'), mood: ospk ? 'annoyed' : 'smug', look: ospk ? 0.7 : 0.8, huff: ospk && t < mid('wrong', 0.5) ? 1 : 0 });
        }
      }

      /* B: board content */
      op(bPct, 0); op(bSave, 0); op(bSi, 0); op(bSame, 0); op(bTab, 0); op(bGr, 0); op(bUp, 0); op(bCh, 0); op(bBan, 0);
      if (sB) {
        if (t < at('save')) {
          op(bPct, 1);
          fadeIn(pA, t, cB + 0.1); fadeIn(pB, t, mid('pct', 0.05));
          fadeIn(pC, t, mid('pct', 0.42)); fadeIn(pD, t, mid('pct', 0.5)); fadeIn(pE, t, mid('pct', 0.8));
        } else if (t < at('si')) {
          op(bSave, 1);
          fadeIn(sA, t, at('save') + 0.05);
          sRows.forEach((g, i) => fadeIn(g, t, mid('save', [0.25, 0.4, 0.62][i])));
          fadeIn(sQ, t, mid('save', 0.72));
        } else if (t < at('same')) {
          op(bSi, 1);
          fadeIn(iA, t, at('si') + 0.05);
          iW.show(0, P(t, mid('si', 0.1), 0.3, linear)); iW.show(1, P(t, mid('si', 0.42), 0.3, linear)); iW.show(2, P(t, mid('si', 0.82), 0.3, linear));
          iW.ring(2, P(t, mid('si', 0.9), 0.2, linear));
        } else {
          op(bSame, 1);
          fadeIn(cA, t, at('same') + 0.05);
          stacks.forEach((st, k) => {
            const t0 = mid('same', 0.12) + k * 0.4;
            op(st.g, P(t, t0, 0.2, linear));
            st.coins.forEach((c, j) => { const pc = P(t, t0 + j * 0.06, 0.25, easeOut); op(c, pc); tr(c, BXC - 225 + k * 150, 380 - j * 22 - 30 * (1 - pc)); });
          });
          op(cW, P(t, mid('same', 0.62), 0.3, linear)); cW.ring(0, P(t, mid('same', 0.85), 0.2, linear));
        }
      }

      /* C: board content */
      if (sC) {
        if (t < at('power')) {
          op(bTab, 1);
          const simple = t >= at('simple');
          // compound column (col 2) row by row; simple column (col 1) on 'simple'
          const rowT = [at('roll') + 0.1, mid('roll', 0.32), mid('roll', 0.62), mid('roll', 0.86)];
          for (let r = 1; r <= 4; r++) {
            op(tab.cells[r][0], P(t, rowT[r - 1], 0.25, linear));
            op(tab.cells[r][2], P(t, rowT[r - 1], 0.25, linear));
            op(tab.cells[r][1], simple ? P(t, mid('simple', 0.1) + (r - 1) * 0.25, 0.25, linear) : 0);
          }
          xArr.forEach((g, i) => op(g, P(t, rowT[i + 1] - 0.15, 0.25, linear)));
          op(sumS, simple ? P(t, mid('simple', 0.35), 0.3, linear) : 0);
          op(sumC, simple ? P(t, mid('simple', 0.72), 0.3, linear) : 0);
        } else if (t < at('updown')) {
          op(bGr, 1);
          const g0 = at('power');
          const ps = P(t, g0 + 0.2, 1.4, ease), pc = P(t, g0 + 0.4, 2.6, easeIn);
          mkDraw(simL, ps); mkDraw(comL, pc);
          op(ptS, P(t, g0 + 1.6, 0.3, linear)); op(ptC, P(t, g0 + 3.0, 0.3, linear));
          fadeIn(grT, t, g0 + 0.1);
          const yr = 10 * pc;
          tr(ball2, gx(yr), gy(1000 * Math.pow(1.1, yr)) - 12 - 6 * pc, 1 + 0.7 * pc, yr * 90);
          op(ball2, pc > 0 && pc < 1 ? 1 : 0);
        } else if (t < at('chain')) {
          op(bUp, 1);
          const w = t >= at('wrong');
          const dim = w ? 0.3 : 1;
          op(uA, P(t, at('updown') + 0.05, 0.3, linear) * (w ? 0.5 : 1));
          op(uB, P(t, mid('updown', 0.55), 0.3, linear) * dim);
          if (w) { stampNo.set(P(t, mid('wrong', 0.04), 0.35, linear)); tr(stampNo, BXC + 120, 262, 0.45); }
          barRows.forEach((g, i) => op(g, w ? P(t, mid('wrong', [0.12, 0.25, 0.62][i]), 0.25, linear) : 0));
          op(extra, w ? P(t, mid('wrong', 0.3), 0.25, linear) : 0);
          op(cutP, w ? P(t, mid('wrong', 0.66), 0.25, linear) : 0);
          op(dash100, w ? P(t, mid('wrong', 0.75), 0.25, linear) : 0);
          op(uC, w ? P(t, mid('wrong', 0.45), 0.3, linear) : 0);
        } else if (t < at('banner')) {
          op(bCh, 1);
          hA.set(P(t, at('chain') + 0.05, 0.4, linear));
          fadeIn(hB, t, mid('chain', 0.3)); fadeIn(hC, t, mid('chain', 0.6));
          stampOK.set(t >= mid('chain', 0.82) ? P(t, mid('chain', 0.82), 0.35, linear) : 0); tr(stampOK, BXC, 500, 0.5);
        } else {
          op(bBan, 1);
          fadeIn(nA, t, at('banner') + 0.05); fadeIn(nB, t, mid('banner', 0.2));
          fadeIn(nC, t, mid('banner', 0.5)); fadeIn(nD, t, mid('banner', 0.78));
          op(nX, P(t, mid('banner', 0.85), 0.2, linear));
        }
      }
    }

    op(boy, show.boy); op(priya, show.priya); op(kav, show.kav); op(dad, show.dad);
    op(percy, show.percy); op(olive, show.olive); op(snowy, show.snowy);
  };
});
