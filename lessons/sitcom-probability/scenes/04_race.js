/* Scene 4: The two-dice horse race (probability of combined events).
   Shots (hard sitcom cuts):
   T  2 p.m., top-down on the felt: the TWO-DICE HORSE RACE board, two dice.
   R  the living room: Mr Tan explains (12 horses; roll two dice, add, that horse moves); the dice roll 3 and 5 ->
      horse 8; "never say die" -> Cubert on the table wobbles, arms up.
   K  the picks: Ah Boy, Dad, Priya behind the table, the race board propped on the sofa: horse 1, horse 12 (lightning),
      horse 7.
   E  Dad: eleven totals 2..12, each 1/11 -> Cubert: NO CHANCE, the totals are not equally likely.
   G  the 6 x 6 grid of totals (red first dice down the side, blue second dice across): 36 ordered pairs -> total 7 on
      the diagonal, P(7) = 6/36 = 1/6 -> total 12, P(12) = 1/36 (Dad falls) -> [K: Ah Boy, "when does horse 1 move?"]
      -> no cell says 1, P(1) = 0 -> Mum's house rule: P(at least one 6) -> the six row + six column, 6 + 6 − 1 = 11 ->
      the 5 x 5 block with no six, P = 1 − 25/36 = 11/36.
   K  4 p.m.: horse 7 wins, the horses finish in the shape of the distribution, horse 1 has not moved. */
scene('race', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);          // hard sitcom cut
  const popSet = (el, t, t0, t1, x, y) => { const p = t >= t0 && t < t1 ? P(t, t0, 0.35, linear) : 0; el.set(p); if (x !== undefined) tr(el, x, y); };
  const popG = (el, t, t0, t1, x, y, s) => {
    const p = t >= t0 && t < t1 ? P(t, t0, 0.35, pop) : 0;
    op(el, clamp(p * 3)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.75 + 0.25 * p)));
  };
  const fadeIn = (el, t, t0, dy) => { const p = P(t, t0, 0.3, easeOut); op(el, p); tr(el, 0, (dy === undefined ? 10 : dy) * (1 - p)); };
  const chipAt = (parent, text, o) => { o = o || {}; return mkChip(parent, text, { size: o.size || 30, col: o.col || C.ink, solid: o.solid, fill: o.fill }); };
  const GOLD = '#FFE45C', RED = '#FF8A8A', GREEN = '#7FE0A8', BLUE = '#8FC8FF';
  const DRED = '#E8424F', DBLUE = '#3B82F6', INK = MK.ink;
  const feet = s => 548 - 138 * s;   // Cubert's centre y when he stands on the coffee table
  const flashAt = (t, t0) => Math.max(P(t, t0, 0.08, linear) * (1 - P(t, t0 + 0.12, 0.5, linear)), P(t, t0 + 0.35, 0.05, linear) * (1 - P(t, t0 + 0.42, 0.3, linear)));
  // a small flat die: one rect and one path of pips (2 elements)
  const PIPS = { 1: ['c'], 2: ['tl', 'br'], 3: ['tl', 'c', 'br'], 4: ['tl', 'tr', 'bl', 'br'], 5: ['tl', 'tr', 'c', 'bl', 'br'], 6: ['tl', 'tr', 'ml', 'mr', 'bl', 'br'] };
  function flatDie(parent, n, size, col, pip) {
    const g = G(parent), q = size * 0.27, r = size * 0.1;
    const at_ = { tl: [-q, -q], tr: [q, -q], ml: [-q, 0], c: [0, 0], mr: [q, 0], bl: [-q, q], br: [q, q] };
    E('rect', { x: -size / 2, y: -size / 2, width: size, height: size, rx: size * 0.2, fill: col, stroke: SC_INK, 'stroke-width': 3 }, g);
    let d = '';
    PIPS[n].forEach(k => { const [x, y] = at_[k]; d += `M${(x - r).toFixed(1)},${y.toFixed(1)} a${r.toFixed(1)},${r.toFixed(1)} 0 1 0 ${(2 * r).toFixed(1)},0 a${r.toFixed(1)},${r.toFixed(1)} 0 1 0 ${(-2 * r).toFixed(1)},0 `; });
    E('path', { d, fill: pip }, g);
    return g;
  }
  const panel = (parent, x, y, w, h, stroke, fill) => E('rect', { x, y, width: w, height: h, rx: 18, fill: fill || 'rgba(10,27,39,0.92)', stroke: stroke || C.line, 'stroke-width': 4 }, parent);

  /* layers: set, boards behind the cast, characters behind the table, the table, props on it, foreground */
  const Lset = G(root), Lboard = G(root), Lcast = G(root), Lfront = G(root), Ltop = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= sets ================= */
  const flat = pbFlat(Lset);
  Lfront.appendChild(flat.front); Ltop.appendChild(flat.top);
  const felt = pbTableTop(Lset);
  const track = pbTrack(Lboard, { len: 8 });
  const tdice = [mkDice(Lboard, 4, { size: 76 }), mkDice(Lboard, 2, { size: 76 })];   // two dice on the felt (shot T)
  const cTwo = chipAt(Lfg, '**2 p.m.**', { col: GOLD, size: 32 });
  const cTitle = chipAt(Lfg, '**TWO-DICE HORSE RACE**', { col: GOLD, size: 34 });

  /* ---------- R: the rules ---------- */
  const rdice = [mkDice(Ltop, 1, { size: 64 }), mkDice(Ltop, 1, { size: 64 })];
  const c12 = chipAt(Lfg, '**12** horses, lanes **1** to **12**', { size: 30 });
  const cRoll = chipAt(Lfg, 'roll **two dice**, add the scores', { size: 30, col: GOLD });
  const cEight = chipAt(Lfg, '{{3 + 5 = 8}}: horse **8** moves', { size: 30, col: GREEN });
  const cDie = chipAt(Lfg, 'never say "**die**"', { size: 30, col: RED });

  /* ---------- K: the picks ---------- */
  const cH1 = chipAt(Lfg, 'horse **1**', { size: 28, col: GOLD });
  const cH12 = chipAt(Lfg, 'horse **12**', { size: 28, col: GOLD });
  const cH7 = chipAt(Lfg, 'horse **7**', { size: 28, col: GOLD });
  const cFeel = chipAt(Lfg, '"I have a feeling."', { col: RED, size: 28 });
  const bolt1 = pbBolt(Lfg, 1.1);
  const think1 = mkThoughtBubble(Lfg, 'total {{1}}?', { size: 34, tail: 'down' });
  const c4pm = chipAt(Lfg, '**4 p.m.**', { col: GOLD, size: 32 });
  const cWin = chipAt(Lfg, 'horse **7** wins', { col: GREEN, size: 30 });
  const cStill = chipAt(Lfg, 'horse **1**: not moved', { col: RED, size: 30 });
  // race positions: mid-race (shot "one") and at 4 p.m. (the finish line is at 8): the shape of the distribution
  const MIDPOS = [0, 0, 1, 1, 2, 3, 4, 3, 2, 1, 1, 0];
  const ENDPOS = [0, 1, 2, 3, 4, 6, 8, 6, 5, 3, 2, 1];

  /* ---------- E: Dad's eleven totals ---------- */
  const elev = G(Lfg);
  panel(elev, 470, 108, 680, 196, GOLD);
  const elevTitle = mkText(elev, 810, 150, '**11** totals, {{2}} to {{12}}', { size: 30, anchor: 'middle', fill: C.ink, boldFill: GOLD });
  const elevNot = mkText(elev, 810, 150, 'the totals are **not** equally likely', { size: 30, anchor: 'middle', fill: C.ink, boldFill: RED });
  const slots = [];
  for (let k = 0; k < 11; k++) {
    const x = 810 + (k - 5) * 56, g = G(elev);
    E('rect', { x: x - 24, y: 168, width: 48, height: 48, rx: 10, fill: '#FFFDF6', stroke: GOLD, 'stroke-width': 3 }, g);
    T(g, x, 202, String(k + 2), { size: 28, weight: 800, anchor: 'middle', fill: INK });
    const fr = mkMath(g, x, 268, '1/11', { size: 26, anchor: 'middle', fill: GOLD });
    slots.push([g, fr]);
  }
  const stampNo = pbStamp(Lfg, false);

  /* ---------- G: the 6 x 6 grid of totals ---------- */
  const CS = 60, GX = 700, GY = 98;              // header column at GX, header row at GY; data cells from GX + CS, GY + CS
  const cx = c => GX + c * CS + CS / 2, cy = r => GY + r * CS + CS / 2;   // r = red (first) dice, c = blue (second) dice
  const grid = G(Lboard);
  E('rect', { x: 628, y: 34, width: 524, height: 500, rx: 18, fill: '#FFFDF6', stroke: '#8FA3B8', 'stroke-width': 5 }, grid);
  E('rect', { x: GX + CS, y: GY, width: 6 * CS, height: CS, fill: 'rgba(59,130,246,0.16)' }, grid);
  E('rect', { x: GX, y: GY + CS, width: CS, height: 6 * CS, fill: 'rgba(232,66,79,0.14)' }, grid);
  T(grid, GX + CS + 3 * CS, GY - 16, 'second dice', { size: 28, weight: 800, anchor: 'middle', fill: DBLUE });
  const sideLab = T(grid, 0, 0, 'first dice', { size: 28, weight: 800, anchor: 'middle', fill: DRED });
  sideLab.setAttribute('transform', `translate(${GX - 18} ${GY + CS + 3 * CS}) rotate(-90)`);
  const hlL = G(grid);
  const hlRect = (r0, c0, nr, nc, fill, stroke) => { const e = E('rect', { x: GX + c0 * CS + 3, y: GY + r0 * CS + 3, width: nc * CS - 6, height: nr * CS - 6, rx: 10, fill, stroke: stroke || 'none', 'stroke-width': 4 }, hlL); op(e, 0); return e; };
  const HLF = 'rgba(255,201,60,0.6)', HLS = '#B8860B';
  const diag = [1, 2, 3, 4, 5, 6].map(r => hlRect(r, 7 - r, 1, 1, HLF, HLS));
  const h66 = hlRect(6, 6, 1, 1, HLF, HLS);
  const hRow6 = hlRect(6, 1, 1, 6, 'rgba(232,66,79,0.28)', DRED);
  const hCol6 = hlRect(1, 6, 6, 1, 'rgba(59,130,246,0.28)', DBLUE);
  const h66b = hlRect(6, 6, 1, 1, 'rgba(255,201,60,0.9)', '#8E1B26');
  const hBlock = hlRect(1, 1, 5, 5, 'rgba(127,224,168,0.3)', '#1E9E5A');
  const hSweep = hlRect(1, 1, 1, 6, 'rgba(255,201,60,0.5)', HLS);
  const h11 = hlRect(1, 1, 1, 1, 'none', '#1E9E5A');
  let gl = '';
  for (let i = 0; i <= 7; i++) { gl += `M${GX + (i ? CS : 0)},${GY + i * CS} H${GX + 7 * CS} `; gl += `M${GX + i * CS},${GY + (i ? CS : 0)} V${GY + 7 * CS} `; }
  const gridLines = E('path', { d: gl, stroke: '#8FA3B8', 'stroke-width': 2.5 }, grid);
  E('rect', { x: GX + CS, y: GY + CS, width: 6 * CS, height: 6 * CS, fill: 'none', stroke: INK, 'stroke-width': 3 }, grid);
  const heads = [];
  for (let i = 1; i <= 6; i++) {
    const top = flatDie(grid, i, 40, '#DCEBFF', DBLUE); tr(top, cx(i), cy(0));
    const side = flatDie(grid, i, 40, '#FFE1E4', DRED); tr(side, cx(0), cy(i));
    heads.push(top, side);
  }
  const rowsG = [];
  for (let r = 1; r <= 6; r++) {
    const rg = G(grid);
    for (let c = 1; c <= 6; c++) T(rg, cx(c), cy(r) + 10, String(r + c), { size: 30, weight: 700, anchor: 'middle', fill: INK });
    rowsG.push(rg);
  }
  void gridLines;

  /* the working panel (top left, above the humans' heads) */
  const WX = 40, WY = 108, WW = 552, WH = 214, WC = WX + WW / 2;
  const wPanel = G(Lfg); panel(wPanel, WX, WY, WW, WH, C.line);
  const wPairs = G(Lfg);
  mkText(wPairs, WC, 178, '{{6 × 6 = 36}} ordered pairs', { size: 36, anchor: 'middle', fill: C.ink });
  const cEq = chipAt(wPairs, 'each one **equally likely**', { col: GOLD, size: 30 }); tr(cEq, WC, 262);
  const wSeven = G(Lfg);
  const pairs7 = ['(1, 6)', '(2, 5)', '(3, 4)', '(4, 3)', '(5, 2)', '(6, 1)'].map((m, i) => mkMath(wSeven, WC + ((i % 3) - 1) * 150, 162 + Math.floor(i / 3) * 46, m, { size: 32, anchor: 'middle', fill: GOLD }));
  const p7 = mkMath(wSeven, WC, 288, 'P(7) = 6/36 = 1/6', { size: 42, anchor: 'middle', fill: C.ink });
  const wTwelve = G(Lfg);
  const only66 = mkText(wTwelve, WC, 172, 'only {{(6, 6)}}', { size: 36, anchor: 'middle', fill: GOLD });
  const p12 = mkMath(wTwelve, WC, 272, 'P(12) = 1/36', { size: 46, anchor: 'middle', fill: C.ink });
  const cSorry = chipAt(wTwelve, 'sorry, Dad', { col: RED, size: 26 }); tr(cSorry, WX + WW - 84, 172);
  const wNever = G(Lfg);
  const noCell = mkText(wNever, WC, 168, 'no cell says {{1}}', { size: 32, anchor: 'middle', fill: GOLD });
  const small = mkText(wNever, WC, 168, 'smallest total: {{1 + 1 = 2}}', { size: 32, anchor: 'middle', fill: C.ink });
  const p1 = mkMath(wNever, WC - 90, 270, 'P(1) = 0', { size: 50, anchor: 'middle', fill: C.ink });
  const cImp = chipAt(wNever, '**impossible**', { col: RED, size: 30 }); tr(cImp, WC + 150, 256);
  const wBonus = G(Lfg);
  const rule = mkText(wBonus, WC, 158, 'house rule: a **6** on **either** dice\n= a **bonus** move', { size: 30, anchor: 'middle', fill: C.ink, boldFill: GOLD });
  const qAtl = mkMath(wBonus, WC, 290, 'P("at least one 6") = ?', { size: 40, anchor: 'middle', fill: C.ink });
  const wCount = G(Lfg);
  const cnt1 = mkText(wCount, WC, 160, 'six row: **6** cells,  six column: **6** cells', { size: 28, anchor: 'middle', fill: C.ink, boldFill: GOLD });
  const cnt2 = mkText(wCount, WC, 206, '{{(6, 6)}} is in **both**: count it once', { size: 28, anchor: 'middle', fill: C.ink, boldFill: GOLD });
  const cnt3 = mkMath(wCount, WC, 284, '6 + 6 − 1 = 11', { size: 50, anchor: 'middle', fill: GREEN });
  const wComp = G(Lfg);
  const cmp1 = mkText(wComp, WC, 166, 'no six on either: {{5 × 5 = 25}} cells', { size: 30, anchor: 'middle', fill: C.ink });
  const cmpA = mkMath(wComp, 0, 280, 'P = 1 − 25/36', { size: 44, anchor: 'start', fill: C.ink });
  const cmpEq = mkMath(wComp, 0, 280, '=', { size: 44, anchor: 'start', fill: GREEN });
  const cmpB = mkMath(wComp, 0, 280, '11/36', { size: 44, anchor: 'start', fill: GREEN });
  const cmpX0 = WC - (cmpA.w + 16 + cmpEq.w + 22 + cmpB.w) / 2, cmpXe = cmpX0 + cmpA.w + 16, cmpX1 = cmpXe + cmpEq.w + 22;
  tr(cmpEq, cmpXe, 0); tr(cmpB, cmpX1, 0);
  const cmpRing = E('rect', { x: cmpX1 - 10, y: 280 - cmpB.a - 8, width: cmpB.w + 20, height: cmpB.h + 16, rx: 10, fill: 'none', stroke: GREEN, 'stroke-width': 4 }, wComp);
  const wGroups = [wPairs, wSeven, wTwelve, wNever, wBonus, wCount, wComp];
  const stampG = G(Lfg);   // (unused slot for layering)
  void stampG; void small; void only66; void rule;

  /* ================= the cast ================= */
  const kav = cast(Lcast, 'kavya');
  const mum = cast(Lcast, 'mum', { prop: null, hand: true });
  const dad = cast(Lcast, 'dad', { prop: null });
  const priya = cast(Lcast, 'priya', { prop: null });
  const boy = cast(Lcast, 'boy');
  const tan = cast(Lcast, 'tan', { prop: null });
  const cube = cast(Ltop, 'cube');
  // Mum's whistle
  const wh = G(mum.hand); tr(wh, 0, -30, 1, -20);
  E('path', { d: 'M-26,-10 L14,-10 Q30,-10 30,6 Q30,22 14,22 Q2,22 -2,10 L-26,10 Z', fill: '#C9D3DC', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, wh);
  E('circle', { cx: 14, cy: 6, r: 6, fill: '#5A6670' }, wh);
  E('path', { d: 'M-26,0 Q-40,10 -36,30', fill: 'none', stroke: DRED, 'stroke-width': 3 }, wh);

  /* cut points */
  const k = id => at(id) - 0.06;
  const cR = k('rules'), cK = k('boy'), cE = k('eleven'), cG = mid('pairs', 0.5), cK2 = k('one'), cG2 = k('never'), cG3 = k('bonus'), cK3 = k('end');
  const thunder = mid('dad', 0.72);
  const dieT = mid('rules', 0.84);

  return t => {
    const sT = on(t, -1, cR), sR = on(t, cR, cK), sK = on(t, cK, cE), sE = on(t, cE, cG), sG1 = on(t, cG, cK2), sK2 = on(t, cK2, cG2),
      sG2 = on(t, cG2, cG3), sG3 = on(t, cG3, cK3), sK3 = on(t, cK3, 1e9);
    const sG = sG1 || sG2 || sG3, sKK = sK || sK2 || sK3, flatOn = !sT;
    const show = { kav: 0, mum: 0, dad: 0, priya: 0, boy: 0, tan: 0, cube: 0 };
    // reset
    [elev, wPanel, bolt1, ...wGroups].forEach(e => op(e, 0));
    [cTwo, cTitle, c12, cRoll, cEight, cDie, cH1, cH12, cH7, cFeel, think1, c4pm, cWin, cStill].forEach(c => c.set(0));
    stampNo.set(0);
    rdice.forEach(d => op(d, 0)); tdice.forEach(d => op(d, 0));
    for (let i = 0; i < 12; i++) { track.hl(i, 0); track.set(i, 0); }
    [...diag, h66, hRow6, hCol6, h66b, hBlock, hSweep, h11].forEach(e => op(e, 0));

    op(flat, flatOn); op(flat.front, flatOn); op(flat.top, flatOn); op(felt, sT);
    flat.upd(t, 1);
    flat.clock(2, Math.min(30, t * 0.35));
    flat.flash(sKK ? flashAt(t, thunder) : 0);
    op(track, sT || sKK); op(grid, sG);

    /* ---------- T: the board on the felt ---------- */
    if (sT) {
      tr(track, 330, 176, 0.92);
      popSet(cTitle, t, at('two') + 0.6, 1e9, 860, 72);
      popSet(cTwo, t, at('two') + 0.2, 1e9, 1000, 300);
      tdice.forEach((d, i) => { op(d, 1); tr(d, [960, 1050][i], [450, 500][i]); d.set([4, 2][i], [12, -16][i]); });
    }

    /* ---------- R: Mr Tan explains ---------- */
    if (sR) {
      show.tan = 1; show.kav = 1; show.cube = 1;
      tr(tan, 250, 418, 1.0); tr(kav, 1010, 430, 0.95);
      const wob = t >= dieT;
      tan.set({ t, talk: scTalk(S, t, 'tan'), mood: 'happy', look: wob ? 0.9 : 0.4 });
      kav.set({ t, mood: wob ? 'deadpan' : 'neutral', look: wob ? -0.6 : -0.9 });
      const w = wob ? Math.sin((t - dieT) * 14) * 8 * (1 - 0.5 * P(t, dieT + 1.2, 1, linear)) * AMP : 0;
      const cs = 0.75;
      tr(cube, 780, feet(cs), cs, w);
      cube.set({ t, talk: scTalk(S, t, 'cube'), mood: wob ? 'sad' : 'smug', look: wob ? -0.9 : -0.6, arms: wob ? P(t, dieT, 0.3, easeOut) : 0 });
      // two dice tumble along the table and land on 3 and 5
      const r0 = mid('rules', 0.2), land = mid('rules', 0.44);
      rdice.forEach((d, i) => {
        op(d, 1);
        const p = P(t, r0, land - r0, easeOut), bounce = t < land ? Math.abs(Math.sin((t - r0) * 9 + i)) * 26 * (1 - p) : 0;
        tr(d, lerp(380, [470, 560][i], p), 512 - bounce);
        d.set(t < land ? 1 + Math.floor(((t * 12 + i * 3) % 6)) : [3, 5][i], t < land ? (t * 400 + i * 90) % 360 : [-6, 8][i]);
      });
      popSet(c12, t, at('rules') + 0.05, mid('rules', 0.2), 640, 210);
      popSet(cRoll, t, mid('rules', 0.18), mid('rules', 0.5), 640, 210);
      popSet(cEight, t, mid('rules', 0.48), 1e9, 640, 210);
      popSet(cDie, t, dieT - 0.15, 1e9, 760, 290);
    }

    /* ---------- K: the picks / horse 1 / the finish ---------- */
    if (sKK) {
      tr(track, 650, 120, 0.86);
      show.boy = 1; show.dad = 1; show.priya = 1;
      tr(boy, 150, 466, 0.95); tr(dad, 335, 452, 0.92); tr(priya, 515, 456, 0.92);
      if (sK) {
        const toCam = t >= thunder;
        boy.set({ t, talk: scTalk(S, t, 'boy'), mood: toCam ? 'deadpan' : 'happy', look: toCam ? 0 : t < at('dad') ? 0.9 : 0.8, lift: t >= at('boy') - 0.1 && t < at('dad') ? 1 : 0 });
        dad.set({ t, talk: scTalk(S, t, 'dad'), mood: t >= at('priya') ? 'neutral' : 'smug', look: t < at('dad') ? -0.7 : t < at('priya') ? 0.7 : 0.8 });
        priya.set({ t, talk: scTalk(S, t, 'priya'), mood: t >= at('priya') ? 'smug' : toCam ? 'deadpan' : 'neutral', look: toCam && t < at('priya') ? 0 : t < at('priya') ? -0.8 : 0.9 });
        const h = (i, t0) => track.hl(i, P(t, t0, 0.25, linear));
        h(0, mid('boy', 0.25)); h(11, mid('dad', 0.15)); h(6, mid('priya', 0.15));
        popSet(cH1, t, mid('boy', 0.25), 1e9, 150, 290);
        popSet(cH12, t, mid('dad', 0.12), 1e9, 335, 290);
        popSet(cFeel, t, mid('dad', 0.45), 1e9, 335, 222);
        popSet(cH7, t, mid('priya', 0.15), 1e9, 515, 290);
        if (t >= thunder) { op(bolt1, 1 - P(t, thunder + 0.7, 0.3, linear)); tr(bolt1, 520, 200, 1.1 + 0.15 * Math.sin(t * 30) * AMP, 12); }
      } else if (sK2) {
        for (let i = 0; i < 12; i++) track.set(i, MIDPOS[i]);
        track.hl(0, P(t, at('one') + 0.1, 0.25, linear) * (0.75 + 0.25 * Math.sin(t * 7)));
        boy.set({ t, talk: scTalk(S, t, 'boy'), mood: 'neutral', look: 0.9, lift: t < mid('one', 0.6) ? 1 : 0 });
        dad.set({ t, mood: 'sad', look: 0.8 });
        priya.set({ t, mood: 'smug', look: -0.8 });
        popSet(think1, t, mid('one', 0.3), 1e9, 230, 230);
      } else {
        const run = P(t, at('end') + 0.15, 1.4, easeOut);
        for (let i = 0; i < 12; i++) track.set(i, lerp(MIDPOS[i], ENDPOS[i], run));
        track.hl(6, P(t, mid('end', 0.2), 0.3, linear));
        track.hl(0, P(t, mid('end', 0.55), 0.3, linear) * (0.75 + 0.25 * Math.sin(t * 7)));
        const done = t >= mid('end', 0.4);
        boy.set({ t, mood: 'happy', look: 0.8, lift: done ? (Math.sin(t * 8) > 0 ? 1 : 0.6) : 0 });
        dad.set({ t, mood: done ? 'sad' : 'neutral', look: 0.8 });
        priya.set({ t, mood: done ? 'smug' : 'happy', look: done ? 0 : 0.9 });
        popSet(c4pm, t, at('end') + 0.05, 1e9, 150, 150);
        popSet(cWin, t, mid('end', 0.25), 1e9, 405, 150);
        popSet(cStill, t, mid('end', 0.55), 1e9, 330, 222);
      }
    }

    /* ---------- E: eleven totals, each 1/11? ---------- */
    if (sE) {
      show.dad = 1; show.priya = 1; show.cube = 1;
      tr(dad, 220, 420, 1.0); tr(priya, 1040, 428, 0.95);
      const no = at('pairs') + 0.25;
      dad.set({ t, talk: scTalk(S, t, 'dad'), mood: t >= no + 0.2 ? 'shock' : 'smug', look: t >= at('pairs') ? 0.8 : 0.3, lift: t < at('pairs') && t >= mid('eleven', 0.6) ? 1 : 0 });
      priya.set({ t, mood: t >= at('pairs') ? 'smug' : 'deadpan', look: t >= at('pairs') ? -0.8 : -1 });
      const cs = 0.78;
      tr(cube, 560, feet(cs), cs);
      cube.set({ t, talk: scTalk(S, t, 'cube'), mood: t >= at('pairs') ? 'annoyed' : 'shock', look: t >= at('pairs') ? 0 : -0.9, arms: t >= at('pairs') && t < mid('pairs', 0.3) ? 0.8 : 0 });
      const ep = P(t, at('eleven') + 0.05, 0.35, pop);
      op(elev, clamp(ep * 3));
      slots.forEach(([g, fr], i) => { op(g, P(t, mid('eleven', 0.12 + i * 0.03), 0.2, linear)); op(fr, P(t, mid('eleven', 0.55 + i * 0.015), 0.2, linear)); });
      const sw = t >= at('pairs') ? P(t, mid('pairs', 0.26), 0.25, linear) : 0;
      op(elevTitle, 1 - sw); op(elevNot, sw);
      stampNo.set(t >= at('pairs') ? P(t, at('pairs') + 0.25, 0.35, linear) : 0); tr(stampNo, 810, 230, 0.62);
    }

    /* ---------- G: the grid ---------- */
    if (sG) {
      op(wPanel, 1);
      const bp = sG1 ? P(t, cG, 0.25, linear) : 1;
      op(grid, bp);
      // build: headers, then one row at a time
      heads.forEach(h => op(h, sG1 ? P(t, cG + 0.05, 0.25, linear) : 1));
      rowsG.forEach((rg, r) => op(rg, sG1 && t < at('seven') ? P(t, cG + 0.3 + r * 0.22, 0.2, linear) : 1));
      const cs = 0.62;
      tr(cube, 548, feet(cs), cs);
      let L = null, R = null;
      if (sG1) {
        L = kav; R = dad; show.kav = 1; show.dad = 1;
        const dadFall = t >= mid('twelve', 0.45);
        kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: t >= at('seven') ? (dadFall ? 'deadpan' : 'neutral') : 'neutral', look: t < at('seven') ? 1 : dadFall ? 0.9 : -0.3 });
        dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dadFall ? 'sad' : t >= at('seven') ? 'neutral' : 'shock', look: dadFall ? -0.8 : 0.9 });
        cube.set({ t, talk: scTalk(S, t, 'cube'), mood: t >= at('seven') ? 'smug' : 'neutral', look: t >= at('seven') ? 0.8 : 0.9 });
        if (t < at('seven')) {
          op(wGroups[0], P(t, cG + 0.1, 0.3, linear));
          fadeIn(wPairs.firstChild, t, cG + 0.1, 0); cEq.set(P(t, mid('pairs', 0.78), 0.35, linear));
        } else if (t < at('twelve')) {
          op(wSeven, 1);
          diag.forEach((e, i) => op(e, P(t, mid('seven', 0.12 + i * 0.075), 0.2, linear)));
          pairs7.forEach((m, i) => op(m, P(t, mid('seven', 0.12 + i * 0.075), 0.2, linear)));
          fadeIn(p7, t, mid('seven', 0.66), 0);
        } else {
          op(wTwelve, 1);
          op(h66, P(t, mid('twelve', 0.12), 0.2, linear) * (0.8 + 0.2 * Math.sin(t * 6)));
          fadeIn(only66, t, mid('twelve', 0.1), 0);
          fadeIn(p12, t, mid('twelve', 0.35), 0);
          cSorry.set(P(t, mid('twelve', 0.72), 0.3, linear));
        }
      } else if (sG2) {
        L = boy; R = priya; show.boy = 1; show.priya = 1;
        boy.set({ t, mood: 'happy', look: 0.9 });
        priya.set({ t, talk: scTalk(S, t, 'priya'), mood: 'smug', look: -0.8 });
        cube.set({ t, mood: 'smug', look: -0.8 });
        op(wNever, 1);
        // sweep row by row: no cell says 1
        const sw = P(t, mid('never', 0.08), (mid('never', 0.42) - mid('never', 0.08)), linear);
        const row = Math.min(5, Math.floor(sw * 6));
        op(hSweep, t < mid('never', 0.45) && t >= mid('never', 0.08) ? 1 : 0); tr(hSweep, 0, row * CS);
        op(h11, P(t, mid('never', 0.45), 0.2, linear));
        fadeIn(noCell, t, at('never') + 0.1, 0); op(noCell, P(t, at('never') + 0.1, 0.25, linear) * (1 - P(t, mid('never', 0.42), 0.2, linear)));
        fadeIn(small, t, mid('never', 0.45), 0);
        fadeIn(p1, t, mid('never', 0.62), 0);
        cImp.set(P(t, mid('never', 0.8), 0.35, linear));
      } else {
        L = mum; R = kav; show.mum = 1; show.kav = 1;
        const blow = t < mid('bonus', 0.3);
        mum.set({ t, talk: scTalk(S, t, 'mum'), mood: t >= at('comp') ? 'smug' : 'neutral', look: t < at('count') ? 0.3 : 0.9, lift: blow ? 1 : 0 });
        kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: t >= at('comp') ? 'happy' : 'neutral', look: t < at('count') ? -0.9 : t < at('comp') ? 0.9 : 0.9 });
        cube.set({ t, talk: scTalk(S, t, 'cube'), mood: t >= at('comp') ? 'smug' : 'neutral', look: t >= at('comp') ? 0.9 : -0.8, arms: t >= at('comp') && t < mid('comp', 0.2) ? 0.6 : 0 });
        if (t < at('count')) {
          op(wBonus, 1);
          fadeIn(rule, t, at('bonus') + 0.1, 0);
          fadeIn(qAtl, t, mid('bonus', 0.66), 0);
          op(h66b, 0);
        } else if (t < at('comp')) {
          op(wCount, 1);
          op(hRow6, P(t, mid('count', 0.08), 0.25, linear));
          op(hCol6, P(t, mid('count', 0.3), 0.25, linear));
          const fl = t >= mid('count', 0.5) ? P(t, mid('count', 0.5), 0.2, linear) * (0.5 + 0.5 * Math.abs(Math.sin((t - mid('count', 0.5)) * 7))) : 0;
          op(h66b, fl);
          fadeIn(cnt1, t, at('count') + 0.1, 0);
          fadeIn(cnt2, t, mid('count', 0.5), 0);
          fadeIn(cnt3, t, mid('count', 0.76), 0);
        } else {
          op(wComp, 1);
          op(hBlock, P(t, mid('comp', 0.2), 0.25, linear));
          fadeIn(cmp1, t, mid('comp', 0.2), 0);
          fadeIn(cmpA, t, mid('comp', 0.56), 0);
          tr(cmpA, cmpX0, 0);
          op(cmpB, P(t, mid('comp', 0.8), 0.3, linear)); op(cmpEq, P(t, mid('comp', 0.8), 0.3, linear));
          op(cmpRing, P(t, mid('comp', 0.88), 0.25, linear));
        }
      }
      tr(L, 150, 482, 0.92); tr(R, 362, 476, 0.92);
    }

    show.cube = show.cube || sG;
    op(kav, show.kav); op(mum, show.mum); op(dad, show.dad); op(priya, show.priya); op(boy, show.boy); op(tan, show.tan); op(cube, show.cube);
  };
});
