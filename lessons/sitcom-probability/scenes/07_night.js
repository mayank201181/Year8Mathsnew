/* Scene 7: Spin to Win, and Uncle Banyan (expected outcomes; tree diagrams, stretch).
   Shots (hard sitcom cuts; the working board on the right, the family behind the coffee table on the left):
   A  9 p.m., night outside: Ah Boy's SPIN TO WIN sign on the table -> the 5-sector spinner, $1 a go, gold wins $3
      -> Cubert on the table: expected number = probability x number of trials -> 200 players, 1/5 x 200 = 40
      (200 dots, 40 gold).
   B  Dad: 200 x $1 = $200, 40 x $3 = $120, $200 - $120 = $80 -> Mr Tan: a prediction, not a promise.
   C  Mum: expect 80 reds in 200 picks, P(red)? -> Kavya: 80/200 = 0.4 -> Mum's forecast: Sunday 70%, Monday 70%.
   D  Dad: five heads in a row, tails is due (lightning) -> Penny flips in: have we met? -> Cubert: no memory,
      P(tails) = 1/2 every flip, independent.
   E  Uncle Banyan rises (lower third): the tree, rain 0.7 / dry 0.3 -> RR 0.7 x 0.7 = 0.49 -> RD + DR = 0.42
      -> the four ends add to 1, SURE THING.
   F  Mr Tan's sweets: 3 strawberry, 2 lemon; Ah Boy eats one, the bag changes -> the tree without replacement:
      3/5 x 2/4 = 3/10 -> Ah Boy eats all five: P = 1. */
scene('night', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);          // hard sitcom cut
  const vis = (el, t, a, b) => op(el, win(t, a, b, 0.18));
  const popSet = (el, t, t0, t1, x, y) => { const p = t >= t0 && t < t1 ? P(t, t0, 0.35, linear) : 0; el.set(p); if (x !== undefined) tr(el, x, y); };
  const chipAt = (parent, text, o) => { o = o || {}; return mkChip(parent, text, Object.assign({ size: 30, col: C.ink }, o)); };
  const GOLD = '#FFE45C', RED = '#D32F2F', GREEN = '#1E9E5A', INK = MK.ink, BLUEK = '#2E6FD8', GREY = '#5A6670';
  const BX = 925;                                           // board centre x (board x 680-1170, y 110-600)

  const Lset = G(root), Lcast = G(root), Lfront = G(root), Ltop = G(root), Lboard = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= the living room at night ================= */
  const flat = pbFlat(Lset);
  Lfront.appendChild(flat.front); Ltop.appendChild(flat.top);
  const W0 = flat.win;
  E('rect', { x: W0[0], y: W0[1], width: W0[2], height: W0[3], fill: '#060C22', opacity: 0.6 }, Lcast);   // night sky
  // a few lit windows across the way
  const lit = G(Lcast);
  [[150, 260], [184, 296], [330, 340], [362, 306], [150, 368]].forEach(([x, y]) => E('rect', { x, y, width: 20, height: 14, fill: '#FFD86B', opacity: 0.7 }, lit));
  // Ah Boy's sign, taped to the front of the coffee table
  const sign = G(flat.top); tr(sign, 330, 628, 1, -2);
  E('rect', { x: -140, y: -48, width: 280, height: 96, rx: 6, fill: '#C9A26A', stroke: '#6B4A28', 'stroke-width': 4 }, sign);
  T(sign, 0, -6, 'SPIN TO WIN', { size: 36, weight: 800, anchor: 'middle', fill: '#C62828' });
  T(sign, 0, 34, '$1 a go!', { size: 30, weight: 800, anchor: 'middle', fill: INK });
  const bolt = pbBolt(Lfg, 1.4);

  /* ================= the working board ================= */
  const board = G(Lboard);
  E('rect', { x: 686, y: 116, width: 490, height: 490, rx: 18, fill: 'rgba(0,0,0,0.25)' }, board);
  E('rect', { x: 680, y: 110, width: 490, height: 490, rx: 18, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, board);
  const item = () => G(board);
  const mathC = (parent, x, y, src, o) => mkMath(parent, x, y, src, Object.assign({ anchor: 'middle', fill: INK, size: 40 }, o || {}));
  const textC = (parent, x, y, str, o) => mkText(parent, x, y, str, Object.assign({ anchor: 'middle', fill: INK, size: 30, boldFill: '#C62828' }, o || {}));
  const xOut = (parent, x, y, w, h) => E('path', { d: `M${x - w / 2},${y - h / 2} L${x + w / 2},${y + h / 2} M${x + w / 2},${y - h / 2} L${x - w / 2},${y + h / 2}`, stroke: RED, 'stroke-width': 7, 'stroke-linecap': 'round' }, parent);

  // stall: the 5-sector spinner
  const bStall = item();
  textC(bStall, BX, 165, '**5** equal sectors', { size: 32, boldFill: INK });
  const spinner = mkSpinner(bStall, [{ label: '$3', col: '#FFC93C' }, { col: '#4CC9F0' }, { col: '#B48CFF' }, { col: '#56D69B' }, { col: '#FF8A3D' }], { r: 140, size: 34 });
  tr(spinner, BX, 345);
  const cGo = chipAt(bStall, '**$1** a go', { size: 28, col: INK, fill: '#FFFFFF' }); tr(cGo, 800, 550);
  const cWin = chipAt(bStall, 'gold wins **$3**', { size: 28, col: '#B8860B', fill: '#FFF8DC' }); tr(cWin, 1040, 550);
  // rule
  const bRule = item();
  textC(bRule, BX, 165, 'How many winners?', { size: 30, fill: GREY });
  textC(bRule, BX, 255, '**expected number**', { size: 38, boldFill: BLUEK });
  mathC(bRule, BX + 6, 330, '= "probability" × "number of trials"', { size: 32 });
  const cTries = chipAt(bRule, '**P** times the **tries**', { size: 34, col: '#B8860B', fill: '#FFF8DC' }); tr(cTries, BX, 460);
  // forty: 200 players, 40 winners
  const bForty = item();
  textC(bForty, BX, 160, '**200** players', { size: 32, boldFill: INK });
  const fl1 = G(bForty); mathC(fl1, BX, 232, 'P("win") = 1/5', { size: 38 });
  const fl2 = G(bForty); mathC(fl2, BX - 40, 318, '1/5 × 200 = 40', { size: 38 }); textC(fl2, BX + 130, 318, 'winners', { size: 30, anchor: 'start', fill: '#B8860B' });
  let dd = '', dg = '';
  for (let i = 0; i < 200; i++) {
    const r = Math.floor(i / 20), c = i % 20, x = 716 + c * 22.5, y = 380 + r * 20;
    const seg = `M${(x - 7).toFixed(1)},${y} a7,7 0 1 0 14,0 a7,7 0 1 0 -14,0 Z `;
    if (i % 5 === 4) dg += seg; else dd += seg;
  }
  const dots = E('path', { d: dd + dg, fill: '#B9C8D6' }, bForty);
  const gdots = E('path', { d: dg, fill: '#FFC93C', stroke: '#B8860B', 'stroke-width': 2 }, bForty);
  // money
  const bMoney = item();
  textC(bMoney, BX, 160, "Ah Boy's stall", { size: 30, fill: GREY });
  const wMoney = mkWorking(bMoney, 950, 215, [{ m: '200 × $1 = $200', note: 'in' }, { m: '40 × $3 = $120', note: 'out' }, { m: '$200 − $120 = $80', note: 'profit' }],
    { size: 40, fill: INK, noteCol: GREY, noteSize: 28, gap: 30 });
  // promise
  const bProm = item();
  const cAbout = chipAt(bProm, '**about** $80', { size: 32, col: '#B8860B', fill: '#FFF8DC' }); tr(cAbout, BX - 50, 440);
  const qMark = T(bProm, BX + 80, 458, '?', { size: 60, weight: 800, anchor: 'middle', fill: RED });
  const alt1 = G(bProm); textC(alt1, BX, 506, '35 winners? **$95**', { size: 28, fill: GREY, boldFill: INK });
  const alt2 = G(bProm); textC(alt2, BX, 506, '47 winners? **$59**', { size: 28, fill: GREY, boldFill: INK });
  const cProm = chipAt(bProm, 'a **prediction**, not a **promise**', { size: 30, col: GREEN, fill: '#EFFBF4' }); tr(cProm, BX, 560);
  // back / backa
  const bBack = item();
  textC(bBack, BX, 200, 'expect **80** reds', { size: 36, boldFill: '#C62828' });
  textC(bBack, BX, 250, 'in **200** picks', { size: 36, boldFill: INK });
  const q = G(bBack); mathC(q, BX, 370, 'P("red") = ?', { size: 46 });
  const a = G(bBack); mathC(a, BX, 370, 'P("red") = 80/200 = 0.4', { size: 44 });
  const aRing = E('rect', { x: BX + 112, y: 330, width: 90, height: 56, rx: 10, fill: 'none', stroke: GREEN, 'stroke-width': 4 }, a);
  const cDiv = chipAt(bBack, '**divide** by the number of trials', { size: 28, col: BLUEK, fill: '#EEF5FF' }); tr(cDiv, BX, 500);
  // fore: two forecasts
  const bFore = item();
  const ph1 = pbForecast(bFore, { day: 'SUNDAY', pct: '70%', text: 'Rain' }); tr(ph1, 805, 355, 0.92);
  const ph2 = pbForecast(bFore, { day: 'MONDAY', pct: '70%', text: 'Rain' }); tr(ph2, 1045, 355, 0.92);
  // due / memory: Penny's flips
  const bFlip = item();
  textC(bFlip, BX, 165, "Penny's last five flips", { size: 30, fill: GREY });
  const coin = (x, y, s, ghost) => {
    const cg = G(bFlip); tr(cg, x, y);
    E('circle', { r: 32, fill: ghost ? '#FFFFFF' : '#FFD54A', stroke: ghost ? RED : '#B8860B', 'stroke-width': 4, 'stroke-dasharray': ghost ? '8 6' : null }, cg);
    T(cg, 0, 12, s, { size: 32, weight: 800, anchor: 'middle', fill: ghost ? RED : '#6B4A00' });
    return cg;
  };
  const coins = [0, 1, 2, 3, 4].map(i => coin(730 + i * 78, 250, 'H'));
  const coinT = coin(730 + 5 * 78, 250, 'T?', true);
  const halves = [0, 1, 2, 3, 4, 5].map(i => { const h = G(bFlip); mathC(h, 730 + i * 78, 340, '1/2', { size: 32, fill: BLUEK }); return h; });
  const cDue = chipAt(bFlip, '"Tails is **due**."', { size: 30, col: RED, fill: '#FFF1F0', textCol: RED }); tr(cDue, BX, 400);
  const memA = G(bFlip); mathC(memA, BX, 445, 'P("tails") = 1/2', { size: 44 });
  const cInd = chipAt(bFlip, '**independent**: no memory', { size: 30, col: GREEN, fill: '#EFFBF4' }); tr(cInd, BX, 545);

  /* ================= E: the tree board (left of Uncle Banyan) ================= */
  const TB = { x: 320, y: 110, w: 520, h: 470 };
  const tBoard = G(Lboard);
  E('rect', { x: TB.x + 6, y: TB.y + 6, width: TB.w, height: TB.h, rx: 18, fill: 'rgba(0,0,0,0.25)' }, tBoard);
  E('rect', { x: TB.x, y: TB.y, width: TB.w, height: TB.h, rx: 18, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, tBoard);
  mkText(tBoard, TB.x + 24, 152, '**R** = rain, **D** = dry', { size: 28, fill: GREY, boldFill: INK });
  const TX = 360, TY = 362;                                  // the root
  const tree = mkTreeDiagram(tBoard, { first: [{ l: 'R', p: '0.7', col: '#CFE6FF' }, { l: 'D', p: '0.3', col: '#FFF1C2' }], second: [{ l: 'R', p: '0.7', col: '#CFE6FF' }, { l: 'D', p: '0.3', col: '#FFF1C2' }],
    w: 300, h: 300, size: 28, ink: INK, nodeInk: INK, pCol: '#C46A00', outCol: INK });
  tr(tree, TX, TY);
  T(tBoard, TX + 126, 200, 'Sunday', { size: 26, weight: 700, anchor: 'middle', fill: GREY });
  T(tBoard, TX + 258, 200, 'Monday', { size: 26, weight: 700, anchor: 'middle', fill: GREY });
  const leafY = [-109.5, -40.5, 40.5, 109.5], prods = ['0.49', '0.21', '0.21', '0.09'];
  const prodG = prods.map((s, i) => { const pg = G(tBoard); mkMath(pg, TX + 360, TY + leafY[i] + 10, s, { size: 30, fill: '#1E7A46', weight: 700 }); return pg; });
  const tw1 = G(tBoard); mathC(tw1, TB.x + TB.w / 2, 548, '0.7 + 0.3 = 1', { size: 36 });
  const tw2 = G(tBoard); mathC(tw2, TB.x + TB.w / 2, 548, '0.7 × 0.7 = 0.49', { size: 36 });
  const tw3 = G(tBoard); mathC(tw3, TB.x + TB.w / 2, 548, '0.21 + 0.21 = 0.42', { size: 36 });
  const tw4 = G(tBoard); mathC(tw4, TB.x + TB.w / 2, 548, '0.49 + 0.21 + 0.21 + 0.09 = 1', { size: 34 });
  const cAdds = chipAt(Lfg, 'branches add to **1**', { size: 30, col: GOLD });
  const cAnd = chipAt(Lfg, '**AND**: multiply', { size: 32, col: GOLD });
  const cOr = chipAt(Lfg, '**OR**: add', { size: 32, col: '#56D69B' });
  const stamp = pbStamp(Lfg, true);

  /* ================= F: the sweets ================= */
  const bSweet = item();
  const sLab1 = G(bSweet); textC(sLab1, BX, 165, '**3** strawberry, **2** lemon', { size: 32, boldFill: INK });
  const sLab3 = G(bSweet); textC(sLab3, BX, 165, 'Ah Boy eats **all five**', { size: 32, boldFill: INK });
  const sLab2 = G(bSweet); textC(sLab2, BX, 165, 'now **2** strawberry, **2** lemon', { size: 32, boldFill: INK });
  const bag = G(bSweet); tr(bag, BX, 470);
  E('path', { d: 'M-110,-250 L110,-250 L118,-12 Q118,0 106,0 L-106,0 Q-118,0 -118,-12 Z', fill: 'rgba(230,245,255,0.6)', stroke: '#7D8A96', 'stroke-width': 4, 'stroke-linejoin': 'round' }, bag);
  E('path', { d: 'M-110,-250 Q0,-270 110,-250 L104,-276 Q0,-292 -104,-276 Z', fill: '#FFFFFF', stroke: '#7D8A96', 'stroke-width': 3 }, bag);
  const SW = [[PB.straw, -60, -40], [PB.lemon, 0, -44], [PB.straw, 58, -38], [PB.straw, -30, -98], [PB.lemon, 32, -100]];
  const sweets = SW.map(([col, x, y], i) => { const sw = pbSweet(Lfg, col, 1.2); sw.home = [BX + x, 470 + y, (i % 2 ? 20 : -15)]; return sw; });
  const cRepl = chipAt(bSweet, '**without replacement**: the bag **changes**', { size: 26, col: RED, fill: '#FFF1F0', textCol: RED }); tr(cRepl, BX, 548);
  const bDep = item();
  mkText(bDep, 700, 146, '**S** = strawberry, **L** = lemon', { size: 26, fill: GREY, boldFill: INK });
  const mini = mkTreeDiagram(bDep, { first: [{ l: 'S', p: '3/5', col: '#FFD6E0' }, { l: 'L', p: '2/5', col: '#FFF6B8' }],
    second: [[{ l: 'S', p: '2/4', col: '#FFD6E0' }, { l: 'L', p: '2/4', col: '#FFF6B8' }], [{ l: 'S', p: '3/4', col: '#FFD6E0' }, { l: 'L', p: '1/4', col: '#FFF6B8' }]],
    w: 360, h: 380, size: 26, ink: INK, nodeInk: INK, pCol: '#C46A00', outCol: INK });
  tr(mini, 720, 338);
  const depW = G(bDep); mathC(depW, BX, 572, 'P("SS") = 3/5 × 2/4 = 3/10', { size: 36 });
  const depRing = E('rect', { x: BX + 112, y: 527, width: 74, height: 76, rx: 10, fill: 'none', stroke: GREEN, 'stroke-width': 4 }, depW);
  const cP1 = mkChip(Lfg, '{{P = 1}}: certain!', { size: 34, col: '#56D69B' });

  /* ================= the cast ================= */
  const boy = cast(Lcast, 'boy');
  const kav = cast(Lcast, 'kavya');
  const dad = cast(Lcast, 'dad');
  const mum = cast(Lcast, 'mum');
  const tan = cast(Lcast, 'tan', { prop: null });
  const priya = cast(Lcast, 'priya', { prop: null });
  const banyan = cast(Lcast, 'banyan');
  const cube = cast(Ltop, 'cube');
  const penny = cast(Ltop, 'penny');
  const ltBan = pbLowerThird(Lhud, 'banyan');
  const c9 = chipAt(Lfg, '**9 p.m.**', { col: GOLD, size: 32 });

  /* cut points */
  const k = id => at(id) - 0.06;
  const cMoney = k('money'), cProm2 = k('promise'), cBack = k('back'), cDue2 = k('due'), cTree = k('banyan'), cOne = k('one'), cSw = k('sweets'), cDep = k('dep');
  const XA = 200, XB = 420, YB = 446, SB = 0.85;
  const flashAt = mid('due', 0.62);

  return t => {
    const sA = on(t, -1, cMoney), sB = on(t, cMoney, cBack), sC = on(t, cBack, cDue2), sD = on(t, cDue2, cTree), sE = on(t, cTree, cSw), sF = on(t, cSw, 1e9);
    const show = { boy: 0, kav: 0, dad: 0, mum: 0, tan: 0, priya: 0, banyan: 0, cube: 0, penny: 0 };

    flat.upd(t, 1);
    const hour = 9 + t / 120;
    flat.clock(Math.floor(hour), (hour % 1) * 60);
    const fl = sD ? Math.max(P(t, flashAt, 0.08, linear) * (1 - P(t, flashAt + 0.12, 0.5, linear)), P(t, flashAt + 0.35, 0.05, linear) * (1 - P(t, flashAt + 0.42, 0.3, linear))) : 0;
    flat.flash(fl);
    op(bolt, sD && t > flashAt && t < flashAt + 0.9 ? 1 - P(t, flashAt + 0.6, 0.3, linear) : 0); tr(bolt, 300, 230, 1.4 + 0.15 * Math.sin(t * 30) * AMP, 12);

    [bStall, bRule, bForty, bMoney, bProm, bBack, bFore, bFlip, bSweet, bDep, tBoard].forEach(e => op(e, 0));
    [c9, cAdds, cAnd, cOr, cP1].forEach(c => c.set(0));
    stamp.set(0);
    op(board, sA ? (t >= at('stall') - 0.06 ? 1 : 0) : (sE ? 0 : 1));
    ltBan.set(win(t, at('banyan') + 0.9, at('banyan') + 4.0, 0.3));
    sweets.forEach(sw => op(sw, 0));

    /* ================= A: 9 p.m., Spin to Win ================= */
    if (sA) {
      show.boy = 1; show.kav = 1;
      tr(boy, XA, YB + 6, SB); tr(kav, 560, YB, SB);
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: 'happy', look: t < at('rule') ? 0.9 : 0.6, lift: t < at('rule') ? 1 : 0 });
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: t < at('forty') ? 'neutral' : 'smug', look: t < at('rule') ? -0.9 : t < at('forty') ? -0.6 : 0.9 });
      popSet(c9, t, mid('nine', 0.05), at('stall') - 0.06, 900, 230);
      vis(bStall, t, at('stall') - 0.06, at('rule'));
      spinner.set((t - at('stall')) * 220 * AMP + 20);
      cGo.set(P(t, mid('stall', 0.3), 0.3, linear)); cWin.set(P(t, mid('stall', 0.65), 0.3, linear));
      if (t >= at('rule') - 0.3) {
        show.cube = 1;
        const cp = P(t, at('rule') - 0.3, 0.4, pop);
        tr(cube, 385, 457 + 30 * (1 - cp), Math.max(0.01, 0.66 * cp));
        cube.set({ t, talk: scTalk(S, t, 'cube'), mood: 'smug', look: t < at('forty') ? 0.6 : 0.8, arms: 0.8 * win(t, at('rule'), mid('rule', 0.55), 0.3) });
      }
      vis(bRule, t, at('rule'), at('forty'));
      cTries.set(P(t, mid('rule', 0.62), 0.3, linear));
      if (t >= at('forty')) {
        op(bForty, 1);
        op(fl1, P(t, mid('forty', 0.15), 0.3, linear)); op(fl2, P(t, mid('forty', 0.5), 0.3, linear));
        op(dots, P(t, mid('forty', 0.02), 0.3, linear)); op(gdots, P(t, mid('forty', 0.7), 0.3, linear));
      }
    }

    /* ================= B: the money, the promise ================= */
    if (sB) {
      if (t < cProm2) {
        show.dad = 1; show.boy = 1;
        tr(dad, XA, YB - 4, SB); tr(boy, XB, YB + 6, SB);
        dad.set({ t, talk: scTalk(S, t, 'dad'), mood: 'smug', look: 0.9, lift: 1 });
        boy.set({ t, mood: 'happy', look: -0.9 });
      } else {
        show.tan = 1; show.dad = 1;
        tr(tan, XA, YB - 4, SB); tr(dad, XB, YB - 4, SB);
        tan.set({ t, talk: scTalk(S, t, 'tan'), mood: t < end('promise') ? 'neutral' : 'smug', look: 0.9 });
        dad.set({ t, mood: t < mid('promise', 0.5) ? 'smug' : 'deadpan', look: -0.9 });
      }
      op(bMoney, 1);
      wMoney.show(0, P(t, mid('money', 0.05), 0.3, linear));
      wMoney.show(1, P(t, mid('money', 0.38), 0.3, linear));
      wMoney.show(2, P(t, mid('money', 0.7), 0.3, linear));
      wMoney.ring(2, P(t, mid('money', 0.88), 0.25, linear));
      if (t >= cProm2) {
        op(bProm, 1);
        cAbout.set(P(t, mid('promise', 0.02), 0.3, linear));
        const flick = Math.floor(t * 2.5) % 2;
        op(qMark, P(t, mid('promise', 0.1), 0.25, linear));
        qMark.setAttribute('transform', `rotate(${(Math.sin(t * 9) * 10 * AMP).toFixed(1)} ${BX + 80} 438)`);
        op(alt1, t > mid('promise', 0.15) ? (flick ? 1 : 0) : 0); op(alt2, t > mid('promise', 0.15) ? (flick ? 0 : 1) : 0);
        cProm.set(P(t, mid('promise', 0.4), 0.3, linear));
      }
    }

    /* ================= C: backwards, the forecast ================= */
    if (sC) {
      show.mum = 1; show.kav = 1;
      tr(mum, XA, YB - 6, SB); tr(kav, XB, YB, SB);
      mum.set({ t, talk: scTalk(S, t, 'mum'), mood: t < at('backa') ? 'neutral' : t < at('fore') ? 'smug' : 'neutral', look: t < at('fore') ? 0.9 : 0.5, lift: t >= at('fore') ? 1 : 0 });
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: t < at('backa') ? 'neutral' : t < at('fore') ? 'happy' : 'neutral', look: t < at('fore') ? -0.8 : 0.9 });
      if (t < at('fore') - 0.06) {
        op(bBack, 1);
        op(q, t < at('backa') ? P(t, mid('back', 0.6), 0.3, linear) : 0);
        op(a, t >= at('backa') ? P(t, mid('backa', 0.1), 0.3, linear) : 0);
        op(aRing, P(t, mid('backa', 0.6), 0.25, linear));
        cDiv.set(P(t, mid('backa', 0.3), 0.3, linear));
      } else {
        op(bFore, 1);
        op(ph1, P(t, at('fore'), 0.3, linear)); op(ph2, P(t, mid('fore', 0.45), 0.3, linear));
        ph1.flash(0.5 + 0.5 * Math.sin(t * 8)); ph2.flash(0.5 + 0.5 * Math.sin(t * 8 + 1));
      }
    }

    /* ================= D: tails is due; Penny; no memory ================= */
    if (sD) {
      show.dad = 1; show.cube = 1;
      tr(dad, XA, YB - 4, SB);
      const afterFlash = t > flashAt;
      dad.set({ t, talk: scTalk(S, t, 'dad'), mood: t < at('memory') ? 'smug' : 'shock', look: afterFlash && t < at('penny') ? 0 : 0.9, lift: t < at('penny') ? 1 : 0 });
      tr(cube, 410, 457, 0.66);
      cube.set({ t, talk: scTalk(S, t, 'cube'), mood: t < at('penny') ? (afterFlash ? 'deadpan' : 'neutral') : t < at('memory') ? 'deadpan' : 'annoyed', look: afterFlash && t < at('penny') ? 0 : t < at('memory') ? 1 : -0.9 });
      if (t >= at('penny') - 0.3) {
        show.penny = 1;
        const pp = P(t, at('penny') - 0.3, 0.5, easeOut);
        tr(penny, lerp(760, 588, pp), 468 - Math.abs(Math.sin(pp * Math.PI * 2)) * 40 * (1 - pp), 0.62);
        penny.set({ t, talk: scTalk(S, t, 'penny'), mood: 'happy', look: -0.5, flip: t < at('penny') + 0.6 ? (t * 2.2) % 1 : (t > at('memory') ? (((t - at('memory')) * 0.8) % 1) * (t < end('memory') ? 1 : 0) : 0) });
      }
      op(bFlip, 1);
      coins.forEach((c, i) => op(c, P(t, mid('due', 0.08 + i * 0.07), 0.2, linear)));
      op(coinT, P(t, mid('due', 0.5), 0.25, linear) * (0.75 + 0.25 * Math.sin(t * 8)));
      cDue.set(t < at('memory') ? P(t, mid('due', 0.55), 0.3, linear) : 0);
      halves.forEach((h, i) => op(h, t >= at('memory') ? P(t, mid('memory', 0.3 + i * 0.05), 0.2, linear) : 0));
      op(memA, t >= at('memory') ? P(t, mid('memory', 0.12), 0.3, linear) : 0);
      cInd.set(t >= at('memory') ? P(t, mid('memory', 0.62), 0.3, linear) : 0);
    }

    /* ================= E: Uncle Banyan's tree ================= */
    if (sE) {
      op(tBoard, 1);
      show.banyan = 1;
      const rise = P(t, at('banyan'), 1.6, easeOut);
      tr(banyan, 1005, lerp(760, 470, rise), 0.85);
      let glow = -1;
      if (t >= at('and')) glow = 0;
      if (t >= at('one')) glow = 1 + (Math.floor((t - at('one')) * 1.5) % 2);
      if (t >= at('check')) glow = -1;
      banyan.set({ t, talk: scTalk(S, t, 'banyan'), mood: t < at('check') ? 'neutral' : 'happy', look: -0.6, glow });
      if (t < cOne) {
        show.kav = 1; tr(kav, 170, YB, 0.8);
        kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: t < at('and') ? 'neutral' : 'smug', look: 0.9 });
      } else {
        show.priya = 1; tr(priya, 170, YB, 0.8);
        priya.set({ t, talk: scTalk(S, t, 'priya'), mood: t < at('check') ? 'smug' : 'happy', look: 0.9 });
      }
      // the tree grows: Sunday, then Monday
      const s1 = P(t, mid('banyan', 0.25), 1.0, linear), s2 = P(t, at('and') + 0.1, 1.4, linear);
      tree.set((s1 * 2 + s2 * 4) / 6);
      for (let i = 0; i < 4; i++) tree.hl(i, 0);
      if (t >= at('and') && t < cOne) tree.hl(0, P(t, mid('and', 0.35), 0.3, linear));
      if (t >= cOne && t < at('check')) { tree.hl(1, P(t, mid('one', 0.1), 0.3, linear)); tree.hl(2, P(t, mid('one', 0.25), 0.3, linear)); }
      if (t >= at('check')) for (let i = 0; i < 4; i++) tree.hl(i, 0.5);
      op(prodG[0], P(t, mid('and', 0.55), 0.3, linear));
      op(prodG[1], P(t, mid('one', 0.15), 0.3, linear)); op(prodG[2], P(t, mid('one', 0.3), 0.3, linear));
      op(prodG[3], P(t, mid('check', 0.35), 0.3, linear));
      vis(tw1, t, mid('banyan', 0.6), at('and') + 0.1);
      vis(tw2, t, mid('and', 0.5), cOne);
      vis(tw3, t, mid('one', 0.5), at('check'));
      op(tw4, t >= at('check') ? P(t, mid('check', 0.1), 0.3, linear) : 0);
      popSet(cAdds, t, mid('banyan', 0.72), at('and'), 1000, 220);
      popSet(cAnd, t, mid('and', 0.4), cOne, 1000, 220);
      popSet(cOr, t, mid('one', 0.55), at('check'), 1000, 220);
      if (t >= at('check')) { stamp.set(P(t, mid('check', 0.65), 0.35, linear)); tr(stamp, 1000, 230, 0.48); }
    }

    /* ================= F: the sweets ================= */
    if (sF) {
      const late = t >= cDep;
      show.boy = 1;
      if (!late) { show.tan = 1; tr(tan, XA, YB - 4, SB); tan.set({ t, talk: scTalk(S, t, 'tan'), mood: 'neutral', look: t < mid('sweets', 0.35) ? 0.9 : 0.6 }); }
      else { show.kav = 1; tr(kav, XA, YB, SB); kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: t < at('all') ? 'neutral' : 'deadpan', look: t < at('all') ? 0.9 : 0.6 }); }
      tr(boy, XB, YB + 6, SB);
      const eat1 = mid('sweets', 0.42);
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: 'happy', look: t < at('all') ? 0.9 : 0.4, lift: (t > eat1 - 0.4 && t < eat1 + 0.3) || (t > at('all') && t < end('all')) ? 1 : 0 });
      // the sweets: one strawberry flies to Ah Boy, then the other four
      const mouth = [XB + 6, 470];
      sweets.forEach((sw, i) => {
        const [hx, hy, hr] = sw.home;
        let t0 = i === 0 ? eat1 - 0.35 : mid('all', 0.15 + (i - 1) * 0.14);
        const inBag = (!late && t < cDep) || t >= at('all') - 0.06;
        if (!inBag) { op(sw, 0); return; }
        const f = P(t, t0, 0.45, easeIn);
        if (f >= 1) { op(sw, 0); return; }
        op(sw, 1); tr(sw, lerp(hx, mouth[0], f), lerp(hy, mouth[1], f) - Math.sin(f * Math.PI) * 120, 1.2 * (1 - 0.5 * f), hr + f * 360);
      });
      if (!late) {
        op(bSweet, 1);
        op(sLab1, t < eat1 + 0.3 ? 1 : 0); op(sLab2, t < eat1 + 0.3 ? 0 : 1); op(sLab3, 0);
        cRepl.set(P(t, mid('sweets', 0.62), 0.3, linear));
      } else if (t < at('all') - 0.06) {
        op(bDep, 1);
        mini.set(P(t, cDep, 1.2, linear));
        for (let i = 0; i < 4; i++) mini.hl(i, 0);
        mini.hl(0, P(t, mid('dep', 0.35), 0.3, linear));
        op(depW, P(t, mid('dep', 0.3), 0.3, linear));
        op(depRing, P(t, mid('dep', 0.8), 0.25, linear));
      } else {
        op(bSweet, 1); op(sLab1, 0); op(sLab2, 0); op(sLab3, 1); cRepl.set(0);
        popSet(cP1, t, mid('all', 0.5), 1e9, 560, 250);
      }
    }

    op(boy, show.boy); op(kav, show.kav); op(dad, show.dad); op(mum, show.mum); op(tan, show.tan); op(priya, show.priya);
    op(banyan, show.banyan); op(cube, show.cube); op(penny, show.penny);
  };

});
