/* Scene 6: Best buy, best density (unit pricing & density).
   A London supermarket, vegetable biryani for the wedding. Rice: 2 kg for £6.80 or 5 kg for £17.50; Mum: bigger is
   always cheaper -> Kavya: per kg means divide, £3.40 vs £3.50 per kg, the small bag wins (BEST BUY) -> juice: 750 ml for
   £2.10 or 2 l for £5.40; Dad: 750 > 2 -> MEANWHILE, ON MARS (spacecraft 5) -> same units: 750 ml = 0.75 l, £2.80 vs
   £2.70 per litre, the big one wins -> lowest price per unit wins. Uncle Raj's kitchen: Ah Boy's 1 kg pillow balances
   Mum's 1 kg of rice, so why is it so big? -> Trish's new letters M / D / V: density = mass / volume -> feathers:
   little mass in each cm³ -> Raj's ice: 460 g at 0.92 g/cm³, V = 460 / 0.92 = 500 cm³ -> as water, 460 cm³; less
   dense than water floats, more dense sinks -> the gold cufflink (19.3 g/cm³) sinks in his tea. */
scene('shop', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);          // hard sitcom cut
  const fade = (t, a, b) => win(t, a, b, 0.2);
  const show = (el, t, t0, t1) => { const p = P(t, t0, 0.3, easeOut), q = t1 === undefined ? 1 : 1 - P(t, t1, 0.2, linear); op(el, Math.min(p, q)); tr(el, 0, 10 * (1 - p)); };
  const GOLD = '#FFE45C', INK = MK.ink, GREEN = '#1E9E5A', RED = '#C62828', BLUE = '#2E7DD8', BERRY = '#B8336A', MUTED = '#5A4A52';
  const paper = (parent, x, y, w, h) => {
    E('rect', { x: x + 6, y: y + 6, width: w, height: h, rx: 16, fill: 'rgba(0,0,0,0.25)' }, parent);
    return E('rect', { x, y, width: w, height: h, rx: 16, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, parent);
  };
  // a yellow price sticker, centred
  const sticker = (parent, text, x, y) => {
    const g = G(parent), w = textWidth(text, 30, FD, 800) + 26;
    E('rect', { x: x - w / 2, y: y - 22, width: w, height: 44, rx: 8, fill: GOLD, stroke: SC_INK, 'stroke-width': 3 }, g);
    T(g, x, y + 11, text, { size: 30, weight: 800, anchor: 'middle', fill: SC_INK });
    return g;
  };
  // a sack of rice, base centre at (0,0)
  function shRice(parent, w, h, label, price) {
    const g = G(parent);
    E('path', { d: `M${-w / 2},0 Q${-w / 2 - 8},${-h * 0.5} ${-w / 2 + 6},${-h * 0.9} L${-w * 0.3},${-h} Q0,${-h * 0.94} ${w * 0.3},${-h} L${w / 2 - 6},${-h * 0.9} Q${w / 2 + 8},${-h * 0.5} ${w / 2},0 Z`, fill: '#F3E3C3', stroke: '#8B6B3A', 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
    E('path', { d: `M${-w * 0.3},${-h} Q0,${-h * 1.08} ${w * 0.3},${-h}`, fill: 'none', stroke: '#C62828', 'stroke-width': 6, 'stroke-linecap': 'round' }, g);
    T(g, 0, -h * 0.72, 'RICE', { size: 26, weight: 800, anchor: 'middle', fill: '#8B6B3A', ls: 2 });
    T(g, 0, -h * 0.44, label, { size: 36, weight: 800, anchor: 'middle', fill: SC_INK });
    if (price) sticker(g, price, 0, -h * 0.17);
    return g;
  }
  // a juice carton (gable top) or a bottle, base centre at (0,0)
  function shJuice(parent, kind, label, price) {
    const g = G(parent);
    if (kind === 'carton') {
      const w = 120, h = 180;
      E('path', { d: `M${-w / 2},0 L${-w / 2},${-h * 0.78} L0,${-h * 0.94} L${w / 2},${-h * 0.78} L${w / 2},0 Z`, fill: '#FFC247', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
      E('rect', { x: -14, y: -h, width: 28, height: 14, rx: 3, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
      E('circle', { cx: 0, cy: -h * 0.6, r: 20, fill: '#FF8A3D', stroke: SC_INK, 'stroke-width': 3 }, g);
      T(g, 0, -h * 0.34, label, { size: 32, weight: 800, anchor: 'middle', fill: SC_INK });
      sticker(g, price, 0, -h * 0.12);
    } else {
      const w = 130, h = 210;
      E('path', { d: `M${-w / 2},0 L${-w / 2},${-h * 0.62} Q${-w / 2},${-h * 0.78} ${-w * 0.18},${-h * 0.84} L${-w * 0.18},${-h * 0.95} L${w * 0.18},${-h * 0.95} L${w * 0.18},${-h * 0.84} Q${w / 2},${-h * 0.78} ${w / 2},${-h * 0.62} L${w / 2},0 Z`, fill: 'rgba(255,170,80,0.85)', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
      E('rect', { x: -w * 0.2, y: -h - 4, width: w * 0.4, height: 18, rx: 4, fill: '#2FA36B', stroke: SC_INK, 'stroke-width': 3 }, g);
      E('rect', { x: -w / 2 + 8, y: -h * 0.56, width: w - 16, height: 56, rx: 6, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
      T(g, 0, -h * 0.56 + 41, label, { size: 36, weight: 800, anchor: 'middle', fill: SC_INK });
      sticker(g, price, 0, -h * 0.13);
    }
    return g;
  }
  // a BEST BUY ribbon, centred
  function shRibbon(parent) {
    const g = G(parent);
    E('path', { d: 'M-96,-24 L96,-24 L84,0 L96,24 L-96,24 L-84,0 Z', fill: RED, stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
    T(g, 0, 10, 'BEST BUY', { size: 28, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 2 });
    return g;
  }
  // an oblique cube (front face s x s, top-left at 0,0)
  function shCube(parent, s, fill) {
    const g = G(parent), d = s * 0.35;
    E('path', { d: `M0,0 L${d},${-d} L${s + d},${-d} L${s},0 Z`, fill: mkShade(fill, 0.25), stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
    E('path', { d: `M${s},0 L${s + d},${-d} L${s + d},${s - d} L${s},${s} Z`, fill: mkShade(fill, -0.15), stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
    E('rect', { x: 0, y: 0, width: s, height: s, fill, stroke: SC_INK, 'stroke-width': 3 }, g);
    return g;
  }
  const feather = (parent, x, y, r) => {
    const g = G(parent); tr(g, x, y, 1, r);
    E('path', { d: 'M0,-28 Q14,-6 2,26 Q-14,-4 0,-28 Z', fill: '#FFFFFF', stroke: '#8F9CAB', 'stroke-width': 2 }, g);
    E('path', { d: 'M0,-24 L1,30', stroke: '#8F9CAB', 'stroke-width': 2 }, g);
    return g;
  };

  /* layers */
  const Lbg = G(root), Lcast = G(root), Lfront = G(root), Ltop = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= A: the supermarket ================= */
  const grocShot = G(Lbg);
  const groc = lcShop(grocShot, { kind: 'grocer' });
  const grocF = G(Lfront); grocF.appendChild(groc.front); grocF.appendChild(groc.top);
  const CY = groc.counterY;   // 560
  const rice2 = shRice(groc.top, 140, 160, '2 kg', '£6.80'); tr(rice2, 800, CY);
  const rice5 = shRice(groc.top, 190, 190, '5 kg', '£17.50'); tr(rice5, 1040, CY);
  const jc = shJuice(groc.top, 'carton', '750 ml', '£2.10'); tr(jc, 800, CY);
  const jb = shJuice(groc.top, 'bottle', '2 l', '£5.40'); tr(jb, 1040, CY);
  const ribbon = shRibbon(Ltop);
  const cBiryani = mkChip(Lfg, 'vegetable **biryani** for the wedding', { size: 32, col: GOLD });
  const board = G(Lfg), BX = 918;
  paper(board, 672, 108, 492, 252);
  const riceG = G(board);
  mkText(riceG, BX, 162, 'Which is the **best buy**?', { size: 34, anchor: 'middle', fill: INK, boldFill: BERRY });
  const riceClaim = mkText(riceG, BX, 240, 'Mum: "bigger is', { size: 32, anchor: 'middle', fill: '#B8336A' });
  const riceClaim2 = mkText(riceG, BX, 290, 'always cheaper"?', { size: 32, anchor: 'middle', fill: '#B8336A' });
  const unitG = G(board);
  mkText(unitG, BX, 160, '**per** kg means **÷ divide**', { size: 34, anchor: 'middle', fill: INK, boldFill: BLUE });
  const unitW = mkWorking(unitG, BX - 40, 196, ['6.80 ÷ 2 = £3.40 "per kg"', '17.50 ÷ 5 = £3.50 "per kg"'], { size: 36, fill: INK, gap: 22 });
  const juiceG = G(board);
  T(juiceG, BX, 160, "Dad's maths:", { size: 30, weight: 700, anchor: 'middle', fill: MUTED });
  const jM = mkMath(juiceG, BX - 20, 256, '750 > 2', { size: 72, anchor: 'middle', fill: RED, weight: 700 });
  T(juiceG, BX - 20 + jM.w / 2 + 14, 256, '?', { size: 72, weight: 800, fill: RED });
  mkText(juiceG, BX, 322, '"750 is way more!"', { size: 30, anchor: 'middle', fill: MUTED });
  const sameG = G(board);
  mkText(sameG, BX, 152, '**same units** first!', { size: 32, anchor: 'middle', fill: INK, boldFill: BERRY });
  const sameW = mkWorking(sameG, BX - 66, 176, ['750 ml = 0.75 "l"', '2.10 ÷ 0.75 = £2.80 "per litre"', '5.40 ÷ 2 = £2.70 "per litre"'], { size: 32, fill: INK, gap: 16 });
  const cPound = mkChip(Lfg, '**£** = money,   **lb** = mass', { size: 30, col: '#7FD3FF' });
  const cRate = mkChip(Lfg, 'rate: so much **per one** unit   (£/kg, km/h, l/min)', { size: 28, col: GOLD });
  const cWins = mkChip(Lfg, 'lowest price **per unit** wins', { size: 36, col: GOLD, solid: true });

  /* ================= B: Uncle Raj's kitchen ================= */
  const kitShot = G(Lbg);
  const kit = lcHouse(kitShot);
  const kitF = G(Lfront); kitF.appendChild(kit.front); kitF.appendChild(kit.top);
  const KY = kit.counterY;    // 540
  // K1: the balance
  const balG = G(kit.top); tr(balG, 600, KY);
  const bal = mkBalance(balG, { arm: 210 });
  const r1 = shRice(bal.left, 100, 100, '1 kg', null); tr(r1, 0, 0);
  const pillow = G(Ltop);
  E('path', { d: 'M-118,-6 Q-128,-60 -96,-104 Q0,-124 96,-104 Q128,-60 118,-6 Q0,10 -118,-6 Z', fill: '#FFFFFF', stroke: '#8F9CAB', 'stroke-width': 4, 'stroke-linejoin': 'round' }, pillow);
  E('path', { d: 'M-80,-52 Q0,-40 80,-52', fill: 'none', stroke: '#C9D3DC', 'stroke-width': 3 }, pillow);
  T(pillow, 0, -62, '1 kg', { size: 34, weight: 800, anchor: 'middle', fill: SC_INK });
  T(pillow, 0, -26, 'feathers', { size: 26, weight: 700, anchor: 'middle', fill: MUTED });
  const cSame = mkChip(Lfg, '**1 kg** of pillow  =  **1 kg** of rice', { size: 32, col: GOLD });
  const cWhy = mkChip(Lfg, 'same **mass**, so why so **big**?', { size: 32, col: '#FF8FC8' });
  // K2: density board
  const dBoard = G(Lfg), DX = 840;
  paper(dBoard, 520, 110, 640, 420);
  const densG = G(dBoard);
  mkText(densG, DX, 182, '**density** = mass ÷ volume', { size: 40, anchor: 'middle', fill: INK, boldFill: BERRY });
  const dFor = mkMath(densG, DX, 330, 'D = M/V', { size: 80, anchor: 'middle', fill: BERRY, weight: 700 });
  const dUnits = mkText(densG, DX, 460, 'units: **g/cm³**  (grams in each cm³)', { size: 30, anchor: 'middle', fill: INK, boldFill: BLUE });
  const featG = G(dBoard);
  const cubeF = shCube(featG, 140, '#EAF3FB'); tr(cubeF, 600, 262);
  [[640, 314, -20], [700, 354, 30], [665, 369, 70]].forEach(([x, y, r]) => feather(featG, x, y, r));
  const cubeR = shCube(featG, 140, '#F7EBD0'); tr(cubeR, 900, 262);
  let grains = ''; for (let i = 0; i < 7; i++) for (let j = 0; j < 7; j++) { const x = 912 + i * 19 + (j % 2) * 6, y = 276 + j * 18; grains += `M${x},${y} m-6,0 a6,4 0 1,0 12,0 a6,4 0 1,0 -12,0 `; }
  E('path', { d: grains, fill: '#FFFDF6', stroke: '#B9A57A', 'stroke-width': 1.5 }, featG);
  mkText(featG, 680, 186, '**low** density', { size: 32, anchor: 'middle', fill: INK, boldFill: BLUE });
  mkText(featG, 980, 186, '**high** density', { size: 32, anchor: 'middle', fill: INK, boldFill: RED });
  mkText(featG, 680, 446, '1 {{cm³}} of feathers', { size: 28, anchor: 'middle', fill: MUTED });
  mkText(featG, 980, 446, '1 {{cm³}} of rice', { size: 28, anchor: 'middle', fill: MUTED });
  const featNote = mkText(featG, DX, 496, 'little mass in each {{cm³}}: **1 kg** needs lots of **volume**', { size: 28, anchor: 'middle', fill: INK, boldFill: BERRY });
  // K3: the ice in Raj's iced tea
  const jug = G(kit.top); tr(jug, 520, KY);
  const tea = E('path', { d: 'M-72,-150 L72,-150 L66,-8 Q66,0 58,0 L-58,0 Q-66,0 -66,-8 Z', fill: 'rgba(196,120,40,0.55)' }, jug);
  const iceG = G(jug);
  E('rect', { x: -42, y: -42, width: 84, height: 84, rx: 8, fill: 'rgba(225,245,255,0.92)', stroke: '#5AB4E0', 'stroke-width': 3 }, iceG);
  E('path', { d: 'M-30,-30 L-10,-30', stroke: '#FFFFFF', 'stroke-width': 5, 'stroke-linecap': 'round' }, iceG);
  T(iceG, 0, 10, '460 g', { size: 26, weight: 800, anchor: 'middle', fill: '#1E5A7A' });
  E('path', { d: 'M-80,-226 L80,-226 L70,-6 Q70,4 58,4 L-58,4 Q-70,4 -70,-6 Z', fill: 'rgba(220,240,255,0.22)', stroke: '#8FB3CC', 'stroke-width': 5, 'stroke-linejoin': 'round' }, jug);
  E('path', { d: 'M80,-200 Q122,-196 118,-130 Q114,-86 74,-80', fill: 'none', stroke: '#8FB3CC', 'stroke-width': 8 }, jug);
  E('path', { d: 'M-58,-206 L-52,-30', stroke: '#FFFFFF', 'stroke-width': 6, opacity: 0.5, 'stroke-linecap': 'round' }, jug);
  const cuff = G(Ltop);
  E('ellipse', { rx: 16, ry: 10, fill: linGrad('#FFE27A', '#C9A24A', true), stroke: SC_INK, 'stroke-width': 2.5 }, cuff);
  E('circle', { r: 4, fill: '#FFF7C2' }, cuff);
  const cuffGlow = E('circle', { r: 30, fill: glow(GOLD) }, cuff);
  cuff.insertBefore(cuffGlow, cuff.firstChild);
  const iBoard = G(Lfg), IX = 905;
  paper(iBoard, 645, 108, 520, 248);
  const iceB = G(iBoard);
  mkText(iceB, IX, 150, 'my ice: **460 g**, density **0.92 g/cm³**', { size: 28, anchor: 'middle', fill: INK, boldFill: BLUE });
  const iceW = mkWorking(iceB, IX - 50, 172, ['V = M ÷ D', '= 460 ÷ 0.92', '= 500 cm³'], { size: 38, fill: INK, gap: 14 });
  const watB = G(iBoard);
  mkText(watB, IX, 150, 'as **water**, at **1 g/cm³**', { size: 30, anchor: 'middle', fill: INK, boldFill: BLUE });
  const watW = mkWorking(watB, IX - 50, 176, ['V = 460 ÷ 1', '= 460 cm³'], { size: 38, fill: INK, gap: 16 });
  const watNote = mkText(watB, IX, 330, 'the ice: **500 cm³**  (bigger!)', { size: 28, anchor: 'middle', fill: MUTED, boldFill: BLUE });
  // the density strip along the table
  const strip = G(Lfg);
  const stL = G(strip), stM = G(strip), stR = G(strip);
  E('rect', { x: 60, y: 598, width: 480, height: 88, rx: 14, fill: '#DDF1FF', stroke: BLUE, 'stroke-width': 4 }, stL);
  mkText(stL, 300, 634, 'less dense than water', { size: 28, anchor: 'middle', fill: INK });
  mkText(stL, 300, 672, 'ice {{0.92}}: **floats**', { size: 28, anchor: 'middle', fill: INK, boldFill: BLUE });
  E('rect', { x: 546, y: 590, width: 108, height: 104, rx: 14, fill: '#2E7DD8', stroke: SC_INK, 'stroke-width': 3 }, stM);
  T(stM, 600, 630, 'water', { size: 28, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  T(stM, 600, 670, '1 g/cm³', { size: 26, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  const stRbox = E('rect', { x: 660, y: 598, width: 480, height: 88, rx: 14, fill: '#FFE9D6', stroke: RED, 'stroke-width': 4 }, stR);
  mkText(stR, 900, 634, 'more dense than water', { size: 28, anchor: 'middle', fill: INK });
  mkText(stR, 900, 672, 'gold {{19.3}}: **sinks**', { size: 28, anchor: 'middle', fill: INK, boldFill: RED });
  strip.insertBefore(stR, stM);
  const goldGlow = E('rect', { x: 655, y: 593, width: 490, height: 98, rx: 16, fill: 'none', stroke: GOLD, 'stroke-width': 6 }, strip);

  /* ================= Mars ================= */
  const marsShot = G(Lbg);
  const mars = lcMars(marsShot);

  /* ================= the cast ================= */
  const mum = cast(Lcast, 'mum', { prop: null, hand: true });
  const kav = cast(Lcast, 'kavya');
  const dad = cast(Lcast, 'dad', { prop: null, hand: true });
  const boy = cast(Lcast, 'boy');
  const raj = cast(Lcast, 'raj', { prop: null, hand: true });
  const met = cast(Ltop, 'metre');
  const trish = cast(Ltop, 'trish');

  /* cut points */
  const cM0 = end('juice') + 0.02, cM1 = at('same') + 0.3;
  const cK = at('boy') - 0.06, cK2 = at('dens') - 0.06, cK3 = at('ice') - 0.06;
  const GY = 447, GS = 0.88;
  const SLOT = 'ABDFGHKLMNPRSTVW';

  return t => {
    const sMars = on(t, cM0, cM1);
    const sA = on(t, -1, cK) && !sMars, sK1 = on(t, cK, cK2), sK2 = on(t, cK2, cK3), sK3 = on(t, cK3, 1e9), sK = sK1 || sK2 || sK3;
    const who = scWho(S, t);
    op(grocShot, sA); op(grocF, sA); op(board, sA); op(ribbon, 0);
    op(cBiryani, 0); op(cPound, 0); op(cRate, 0); op(cWins, 0);
    op(kitShot, sK); op(kitF, sK); op(marsShot, sMars);
    op(cSame, 0); op(cWhy, 0); op(dBoard, sK2); op(iBoard, sK3); op(strip, 0);
    op(balG, sK1); op(pillow, 0); op(jug, sK3); op(cuff, 0);
    const vis = { mum: 0, kav: 0, dad: 0, boy: 0, raj: 0, met: 0, trish: 0 };

    /* ---------- A: the supermarket ---------- */
    if (sA) {
      vis.mum = vis.kav = vis.dad = vis.met = 1;
      tr(mum, 105, GY, GS); tr(kav, 285, GY, GS); tr(dad, 465, GY, GS);
      const rice = t < at('juice');
      op(rice2, rice ? 1 : 0); op(rice5, rice ? 1 : 0); op(jc, rice ? 0 : 1); op(jb, rice ? 0 : 1);
      // Mum
      let mm = 'neutral', ml = 0.7;
      if (t >= at('rice') && t < at('unit')) { mm = 'smug'; ml = 0.9; }
      else if (t >= at('unit') && t < at('juice')) { mm = t > mid('unit', 0.8) ? 'shock' : 'neutral'; ml = 0.6; }
      else if (t >= at('juice') && t < at('same')) { mm = 'deadpan'; ml = 0.9; }
      else if (t >= at('big')) { mm = 'smug'; ml = t > end('big') ? 0 : 0.8; }
      mum.set({ t, talk: scTalk(S, t, 'mum'), mood: mm, look: ml, lift: t > mid('rice', 0.5) && t < at('unit') ? 1 : t > mid('big', 0.1) && t < end('big') ? 1 : 0 });
      // Kavya
      let km = 'neutral', kl = who === 'mum' ? -0.8 : 0.7;
      if (t >= mid('rice', 0.6) && t < at('unit')) km = 'annoyed';
      else if (t >= at('unit') && t < at('juice')) { km = t > mid('unit', 0.75) ? 'smug' : 'neutral'; kl = 0.8; }
      else if (t >= at('juice') && t < at('same')) { km = 'deadpan'; kl = t > end('juice') - 0.6 ? 0 : 0.8; }
      else if (t >= at('same')) { km = t > mid('same', 0.7) ? 'smug' : 'neutral'; kl = who === 'mum' ? -0.8 : 0.8; }
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
      // Dad
      let dm = 'neutral', dl = -0.7;
      if (t >= at('juice') && t < at('same')) { dm = 'smug'; dl = 0.6; }
      else if (t >= at('same') && t < at('big')) { dm = t > mid('same', 0.7) ? 'shock' : 'neutral'; dl = -0.7; }
      else if (t >= at('big')) { dm = 'sad'; dl = -0.8; }
      dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: dl, lift: t > mid('juice', 0.1) && t < end('juice') ? 1 : 0 });
      // Mètre on the counter: twitches at the pounds
      tr(met, 600, CY - 186 * 0.55 + (t > mid('rice', 0.25) && t < at('unit') ? Math.sin(t * 40) * 2 * AMP : 0), 0.55);
      met.set({ t, talk: 0, mood: t > mid('rice', 0.25) && t < at('unit') ? 'annoyed' : t >= at('juice') && t < at('same') ? 'shock' : 'smug', look: who === 'kavya' || who === 'mum' ? -0.8 : 0.6, point: t > mid('same', 0.3) && t < end('same') ? 1 : 0 });
      // chips
      if (t < at('rice')) { cBiryani.set(P(t, mid('shop', 0.4), 0.4, linear)); tr(cBiryani, 600, 640); }
      if (t >= mid('rice', 0.25) && t < at('unit')) { cPound.set(P(t, mid('rice', 0.25), 0.4, linear)); tr(cPound, 600, 640); }
      if (t >= mid('unit', 0.82) && t < at('juice')) { cRate.set(P(t, mid('unit', 0.82), 0.4, linear)); tr(cRate, 600, 640); }
      if (t >= at('big')) { cWins.set(P(t, mid('big', 0.4), 0.4, linear)); tr(cWins, 600, 640); }
      // the board
      op(board, P(t, at('rice') - 0.1, 0.3, linear) * (t < at('juice') - 0.1 ? 1 : P(t, mid('juice', 0.5), 0.25, linear)));
      op(riceG, fade(t, at('rice') - 0.1, at('unit')));
      op(riceClaim, P(t, mid('rice', 0.6), 0.3, linear)); op(riceClaim2, P(t, mid('rice', 0.6), 0.3, linear));
      op(unitG, fade(t, at('unit') - 0.05, at('juice')));
      unitW.show(0, P(t, mid('unit', 0.25), 0.3, linear)); unitW.show(1, P(t, mid('unit', 0.5), 0.3, linear));
      unitW.ring(0, P(t, mid('unit', 0.75), 0.3, linear));
      op(juiceG, fade(t, mid('juice', 0.5), at('same')));
      op(sameG, fade(t, at('same'), 1e9));
      sameW.show(0, P(t, mid('same', 0.05), 0.3, linear)); sameW.show(1, P(t, mid('same', 0.35), 0.3, linear)); sameW.show(2, P(t, mid('same', 0.7), 0.3, linear));
      sameW.ring(2, P(t, mid('same', 0.85), 0.3, linear));
      // BEST BUY: the small rice bag, then the big juice
      if (t >= mid('unit', 0.75) && t < at('juice')) { const p = P(t, mid('unit', 0.75), 0.45, pop); op(ribbon, clamp(p * 3)); tr(ribbon, 800, 420, Math.max(0.01, 0.9 * (0.6 + 0.4 * p)), -8); }
      if (t >= mid('same', 0.85)) { const p = P(t, mid('same', 0.85), 0.45, pop); op(ribbon, clamp(p * 3)); tr(ribbon, 1040, 388, Math.max(0.01, 0.9 * (0.6 + 0.4 * p)), -8); }
    }

    /* ---------- Mars ---------- */
    if (sMars) mars.set(P(t, cM0, 0.9, linear), 5);

    /* ---------- K1: the pillow and the balance ---------- */
    if (sK1) {
      vis.mum = vis.boy = 1;
      tr(mum, 130, 438, GS); tr(boy, 1070, 444, GS);
      const fly = P(t, mid('boy', 0.12), 0.7, ease);
      const px = lerp(1040, 810, fly), py = lerp(430, 290 + 120, fly) - Math.sin(fly * Math.PI) * 140;
      // balance: left heavy until the pillow lands, then it wobbles level
      const land = mid('boy', 0.12) + 0.7, k = Math.max(0, t - land);
      const tilt = t < land ? -1 : -Math.exp(-2.6 * k) * Math.cos(k * 9);
      bal.set(tilt * (S.reduce ? 0.5 : 1));
      op(pillow, 1);
      if (t < land) tr(pillow, px, py, 0.85, -10 * (1 - fly));
      else {
        const a = tilt * 12 * Math.PI / 180;
        tr(pillow, 600 + Math.cos(a) * 210, KY - 250 + Math.sin(a) * 210 + 120, 0.85);
      }
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: 'happy', look: -0.7, lift: t < mid('boy', 0.2) ? 1 : 0 });
      mum.set({ t, talk: 0, mood: t > mid('boy', 0.7) ? 'smug' : 'neutral', look: 0.8, lift: 0 });
      if (t > land) { cSame.set(P(t, land + 0.1, 0.4, linear) * (1 - P(t, mid('boy', 0.82), 0.2, linear))); tr(cSame, 600, 640); }
      if (t > mid('boy', 0.8)) { cWhy.set(P(t, mid('boy', 0.82), 0.4, linear)); tr(cWhy, 600, 640); }
    }

    /* ---------- K2: Trish, density ---------- */
    if (sK2) {
      vis.boy = vis.trish = 1;
      tr(boy, 100, 446, 0.8);
      boy.set({ t, talk: 0, mood: t >= at('feather') ? 'happy' : 'neutral', look: 0.8, lift: 0 });
      const up = P(t, cK2, 0.4, pop);
      tr(trish, 330, KY - 160 * 0.72 + (1 - up) * 60, Math.max(0.01, 0.72 * (0.7 + 0.3 * up)));
      // new letters: a slot machine, then M / D / V
      const spin = t < mid('dens', 0.32);
      const letters = spin ? [0, 1, 2].map(i => SLOT[(Math.floor(t * 14) * 5 + i * 7) % SLOT.length]) : ['M', 'D', 'V'];
      trish.set({ t, talk: scTalk(S, t, 'trish'), mood: t >= at('feather') ? 'happy' : 'smug', look: 0.6, letters,
        cover: t > mid('dens', 0.62) && t < at('feather') ? 1 : undefined, coverP: P(t, mid('dens', 0.62), 0.35, ease) });
      op(densG, fade(t, cK2, at('feather')));
      op(dFor, P(t, mid('dens', 0.65), 0.3, linear));
      op(dUnits, P(t, mid('dens', 0.85), 0.3, linear));
      op(featG, fade(t, at('feather') - 0.05, 1e9));
      op(featNote, P(t, mid('feather', 0.55), 0.3, linear));
    }

    /* ---------- K3: the ice, the water, the gold ---------- */
    if (sK3) {
      vis.raj = vis.kav = vis.trish = 1;
      tr(raj, 135, 438, GS); tr(kav, 322, 444, GS);
      // ice floats with 92 % under the surface
      const surf = -150, bob = Math.sin(t * 2.2) * 2 * AMP;
      tr(iceG, -10, surf + 42 - 84 * 0.08 + bob);
      let rm = 'happy', rl = 0.7;
      if (who === 'kavya') rl = 0.8;
      if (t >= at('gold')) { rm = t > mid('gold', 0.66) ? (t > end('gold') ? 'deadpan' : 'shock') : 'smug'; rl = t > mid('gold', 0.66) ? 0.9 : 0.5; }
      raj.set({ t, talk: scTalk(S, t, 'raj'), mood: rm, look: rl, lift: (t > mid('ice', 0.05) && t < mid('ice', 0.5)) || (t > at('gold') && t < mid('gold', 0.55)) ? 1 : 0 });
      let km = 'neutral', kl = who === 'raj' ? -0.8 : 0.7;
      if (t >= at('gold')) { km = t > mid('gold', 0.66) ? 'deadpan' : 'happy'; kl = t > end('gold') ? 0 : -0.8; }
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
      tr(trish, 1080, KY - 160 * 0.5, 0.5);
      trish.set({ t, talk: 0, mood: t > mid('gold', 0.66) ? 'shock' : 'smug', look: -0.8, letters: ['M', 'D', 'V'], cover: t < at('water') ? 2 : undefined, coverP: P(t, at('ice') + 0.1, 0.35, ease) });
      // the boards
      op(iceB, fade(t, cK3, at('water')));
      iceW.show(0, P(t, mid('ice', 0.25), 0.3, linear)); iceW.show(1, P(t, mid('ice', 0.5), 0.3, linear)); iceW.show(2, P(t, mid('ice', 0.75), 0.3, linear));
      iceW.ring(2, P(t, mid('ice', 0.85), 0.3, linear));
      op(watB, fade(t, at('water') - 0.05, 1e9));
      watW.show(0, P(t, mid('water', 0.05), 0.3, linear)); watW.show(1, P(t, mid('water', 0.25), 0.3, linear));
      watW.ring(1, P(t, mid('water', 0.35), 0.3, linear));
      op(watNote, P(t, mid('water', 0.4), 0.3, linear));
      // the density strip
      op(strip, P(t, mid('water', 0.45), 0.3, linear));
      op(stL, P(t, mid('water', 0.5), 0.3, linear)); op(stM, P(t, mid('water', 0.45), 0.3, linear)); op(stR, P(t, mid('water', 0.78), 0.3, linear));
      op(goldGlow, t > at('gold') ? 0.55 + 0.45 * Math.sin(t * 6) : 0);
      // the cufflink: drops from Raj's hand into the tea and sinks
      if (t >= mid('gold', 0.55)) {
        op(cuff, 1);
        const f = P(t, mid('gold', 0.55), 0.55, linear), sink = P(t, mid('gold', 0.55) + 0.55, 0.9, easeIn);
        const x = lerp(220, 524, f), y = f < 1 ? lerp(400, KY - 150, f * f) - Math.sin(f * Math.PI) * 120 : lerp(KY - 150, KY - 12, sink);
        tr(cuff, x, y, 1, f * 200);
        op(cuffGlow, sink > 0.98 ? 0.5 + 0.5 * Math.sin(t * 6) : 0);
      }
    }

    op(mum, vis.mum); op(kav, vis.kav); op(dad, vis.dad); op(boy, vis.boy); op(raj, vis.raj); op(met, vis.met); op(trish, vis.trish);
  };
});
