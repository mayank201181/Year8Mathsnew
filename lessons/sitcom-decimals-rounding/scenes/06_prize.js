/* Scene 6: Rita repeats herself (fractions, decimals & recurring decimals).
   Shots (hard sitcom cuts):
   W  two       the Blue House tent, 2 p.m.: Mr Tan hands over the BEST BANNER rosette; a $10 note on the table for the
                three painters (Kavya, Priya, Ah Boy).
   D  split     the prize whiteboard, the cast lined up in front of it: 10 ÷ 3 = 3.333… and the 3s keep coming.
   W  rita      Rita bursts in and lands on her perch (lower third), flapping; a trail of 3s floats off her.
   D  cent      3.33|33…, the decider 3 circled -> $3.33 each; 3 × $3.33 = $9.99.
   W  boy       three piles of coins on the table; Ah Boy grabs the 1-cent coin and keeps it for the rest of the scene.
   R  shush     Rita close up: Dot hops onto her head, the 3s stop; 0.3 with a real dot over the 3.
      quiet     "...three." One small 3. Hold.
   D  which     the board: 1/8, 1/6, 1/7 with question marks.
      eighth    bus stop 8 ) 1.000 -> 0.125, "terminating: it stops".
      sixth     0.1666… -> 0.16 with a dot over the 6 only.
      seventh   0.142857142857… -> dots over the 1 and the 7 of the block, the block braced.
      test      the rule card: simplify, factor the denominator, only 2s and 5s => it stops.
      why       8 = 2 × 2 × 2 tick; 6 = 2 × 3 cross (3 ringed); 7 prime cross.
      twelve    Priya: 9/12, 12 = 2 × 2 × 3, "recurring!"; MISSING THE POINT.
      simplify  9/12 = 3/4 = 0.75; 4 = 2 × 2: terminates; Priya annoyed.
      back      0.375 = 375/1000 = 3/8 (÷ 125); "3 decimal places: over 1000".
      fact      the 142857 wheel (1 → 4 → 2 → 8 → 5 → 7), then 142857 × 7 = 999 999; Mr Tan and Ah Boy deadpan. Hold. */
scene('prize', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const fin = (el, t, t0, d) => { const p = P(t, t0, d || 0.3, easeOut); op(el, p); return p; };
  const GOLD = '#FFE45C', INK = MK.ink, RED = '#D32F2F', GREEN = '#1E9E5A', BLUE = '#1E5FC0', AMBER = DR_LED, GREY = '#5A6670';
  const LT_RED = '#FF8A8A', LT_GREEN = '#8FE3A8';
  const MS = { size: 40, fill: INK, weight: 700 };
  const math = (parent, x, y, src, o) => mkMath(parent, x, y, src, Object.assign({}, MS, o || {}));
  const txt = (parent, x, y, s, o) => mkText(parent, x, y, s, Object.assign({ size: 30, fill: INK, anchor: 'middle' }, o || {}));
  // x of the centre of character k of a plain number string typeset by mkMath at (x0) with anchor start
  const charX = (x0, str, k, size) => x0 + textWidth(str.slice(0, k), size, FD, 700) + textWidth(str[k], size, FD, 700) / 2;
  // a decimal with real recurring dots above the chosen characters; anchor start at x
  function recur(parent, x, y, str, idx, o) {
    o = o || {};
    const size = o.size || 40, g = G(parent), m = math(g, x, y, str, { size, fill: o.fill || INK });
    idx.forEach(k => E('circle', { cx: charX(m.x0, str, k, size), cy: y - size * 0.86, r: Math.max(4, size * 0.075), fill: o.dot || o.fill || INK }, g));
    g.m = m; g.w = m.w;
    return g;
  }
  // a little bronze 1-cent coin
  function coin1(parent, s) {
    const g = G(parent), k = G(g); tr(k, 0, 0, s || 1);
    E('circle', { r: 30, fill: ball('#F0A868', '#9A5A28'), stroke: SC_INK, 'stroke-width': 3 }, k);
    E('circle', { r: 24, fill: 'none', stroke: '#7A4418', 'stroke-width': 2, 'stroke-dasharray': '2 3' }, k);
    T(k, 0, 11, '1¢', { size: 30, weight: 800, anchor: 'middle', fill: '#4A2408' });
    return g;
  }
  // a coin stack of n coins, base at (0,0)
  function pile(parent, n) {
    const g = G(parent);
    for (let i = 0; i < n; i++) {
      E('ellipse', { cx: 0, cy: -i * 9, rx: 30, ry: 10, fill: i % 2 ? '#D9DEE3' : '#E6EBEF', stroke: '#6E7B88', 'stroke-width': 2.5 }, g);
    }
    E('ellipse', { cx: 0, cy: -n * 9, rx: 30, ry: 10, fill: ball('#F4D35E', '#B8860B'), stroke: '#6E5208', 'stroke-width': 2.5 }, g);
    return g;
  }
  // a bus stop (short division): divisor ) dividend with the quotient above, column by column
  function busStop(parent, x, y, divisor, dividend, quotient, carries, o) {
    o = o || {};
    const size = o.size || 42, cw = size * 0.9, pw = size * 0.34, g = G(parent);
    const xs = []; let cx = x;
    for (const ch of dividend) { const w = ch === '.' ? pw : cw; xs.push(cx + w / 2); cx += w; }
    const x1 = x - 10, x2 = cx + 8, top = y - size * 1.0;
    dividend.split('').forEach((ch, k) => T(g, xs[k], y, ch, { size, weight: 700, anchor: 'middle', fill: INK }));
    E('path', { d: `M${x1},${top} L${x2},${top} M${x1},${top} Q${x1 + 14},${y - size * 0.4} ${x1},${y + size * 0.22}`, fill: 'none', stroke: INK, 'stroke-width': 4, 'stroke-linecap': 'round' }, g);
    T(g, x1 - 12, y, String(divisor), { size, weight: 700, anchor: 'end', fill: INK });
    g.q = quotient.split('').map((ch, k) => T(g, xs[k], top - 12, ch, { size, weight: 700, anchor: 'middle', fill: o.qCol || BLUE }));
    g.c = (carries || []).map(([k, v]) => T(g, xs[k] - cw * 0.4, y - size * 0.42, String(v), { size: 26, weight: 800, anchor: 'middle', fill: RED }));
    g.set = (k, kc) => { g.q.forEach((q, i) => op(q, clamp(k - i))); g.c.forEach((c, i) => op(c, clamp((kc === undefined ? k : kc) - i))); };
    g.xs = xs; g.top = top;
    return g;
  }
  // "pill" chip in the cold-open style
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 3, color: o.color || C.ink, weight: 700 }); };

  /* ---------- layers ---------- */
  const Lset = G(root), Lboard = G(root), Lcast = G(root), Lfront = G(root), Ltop = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= W: the tent ================= */
  const tent = drTent(Lset);
  Lfront.appendChild(tent.front);
  // on the table: the $10 note; later three coin piles and the 1-cent coin
  const note = G(Ltop); mkNote(note, '$10', { s: 0.62 });
  const piles = G(Ltop);
  [[290, 7], [470, 7], [650, 7]].forEach(([x, n]) => tr(pile(piles, n), x, 528));
  const pileLab = G(Ltop);
  [290, 470, 650].forEach(x => T(pileLab, x, 600, '$3.33', { size: 32, weight: 800, anchor: 'middle', fill: '#FFFFFF' }));
  const coinT = coin1(Ltop, 0.9);
  const c2pm = mkChip(Lfg, '**2 p.m.**', { size: 32, col: GOLD });
  const cBest = mkChip(Lfg, '**BEST BANNER**', { size: 32, col: '#7FD3FF' });
  const cPrize = mkChip(Lfg, 'prize {{$10}} for **3** painters', { size: 32, col: GOLD });
  const cLeft = mkChip(Lfg, '{{$10 − $9.99 = 1¢}} left over', { size: 32, col: LT_RED });
  const cFees = mkChip(Lfg, '"mascot fees"', { size: 28, col: '#FFC2D6' });

  /* ================= D: the prize whiteboard ================= */
  const board = G(Lboard);
  const wb = mkWhiteboard(board, 1040, 330); tr(wb, 600, 288);
  const pg1 = G(board), pg2 = G(board), pg3 = G(board), pg4 = G(board);

  // --- page 1: 10 ÷ 3 and the cent
  const A1 = math(pg1, 130, 222, '10 ÷ 3 = 3.', { size: 60 });
  const D3W = textWidth('3', 60, FD, 700);
  const threes = [];
  for (let k = 0; k < 13; k++) threes.push(T(pg1, A1.x0 + A1.w + D3W * (k + 0.5) + 2, 222, '3', { size: 60, weight: 700, anchor: 'middle', fill: k ? RED : INK }));
  const cNever = mkChip(pg1, 'the **3**s never stop', { size: 32, col: RED, fill: '#FFECEC' });
  const A2 = math(pg1, 130, 205, '10 ÷ 3 = 3.333…', { size: 46 });
  const nc = mkText(pg1, 1090, 205, 'to the nearest cent = **2 d.p.**', { size: 28, anchor: 'end', fill: GREY, boldFill: BLUE });
  const B1 = math(pg1, 150, 310, '3.33', { size: 56 });
  const B2 = math(pg1, B1.x0 + B1.w + 26, 310, '33…', { size: 56, fill: GREY });
  const cutX = B1.x0 + B1.w + 13;
  const cutBar = E('line', { x1: cutX, y1: 248, x2: cutX, y2: 326, stroke: RED, 'stroke-width': 6, 'stroke-linecap': 'round' }, pg1);
  const decRing = E('circle', { cx: B2.x0 + textWidth('3', 56, FD, 700) / 2, cy: 290, r: 30, fill: 'none', stroke: RED, 'stroke-width': 5 }, pg1);
  const decLab = T(pg1, B2.x0 + textWidth('3', 56, FD, 700) / 2, 365, 'decider: 3', { size: 26, weight: 700, anchor: 'middle', fill: RED });
  const B3 = math(pg1, B2.x0 + B2.w + 30, 310, '→ $3.33', { size: 56, fill: GREEN });
  const B4 = mkText(pg1, B3.x0 + B3.w + 18, 310, 'each', { size: 32, anchor: 'start', fill: GREEN });
  const C1 = math(pg1, 150, 420, '3 × $3.33 = $9.99', { size: 50 });
  const C2 = mkChip(pg1, '{{$9.99 ≠ $10}}', { size: 32, col: RED, fill: '#FFECEC' });

  // --- page 2: which ones stop?
  const COLX = [260, 600, 940];
  const pg2c = G(pg2);
  const div2 = G(pg2c);
  [430, 770].forEach(x => E('line', { x1: x, y1: 150, x2: x, y2: 440, stroke: '#C9D3DC', 'stroke-width': 3 }, div2));
  const fr = ['1/8', '1/6', '1/7'].map((s, i) => math(pg2c, COLX[i] - 20, 190, s, { size: 44, anchor: 'middle' }));
  const qm = COLX.map(x => T(pg2c, x + 28, 190, '?', { size: 46, weight: 800, anchor: 'middle', fill: RED }));
  const verdict = [['stops', GREEN], ['recurs', RED], ['recurs', RED]].map(([w, c], i) => T(pg2c, COLX[i] + 30, 190, w, { size: 30, weight: 800, anchor: 'start', fill: c }));
  // col 1: the bus stop
  const bus = busStop(pg2c, COLX[0] - 66, 322, 8, '1.000', '0.125', [[2, 1], [3, 2], [4, 4]], { size: 42 });
  const cTerm = mkChip(pg2c, '**terminating**: it stops', { size: 26, col: GREEN, fill: '#E6F7EC' });
  // col 2: 1/6
  const s6a = math(pg2c, COLX[1], 300, '0.1666…', { size: 42, anchor: 'middle' });
  const s6b = recur(pg2c, COLX[1] - textWidth('0.16', 50, FD, 700) / 2, 375, '0.16', [3], { size: 50, fill: BLUE, dot: RED });
  const s6n = mkText(pg2c, COLX[1], 300, 'only the **6** recurs', { size: 26, fill: GREY, boldFill: RED });
  // col 3: 1/7
  const s7aStr = '0.142857142857…';
  const s7a = math(pg2c, COLX[2], 300, s7aStr, { size: 34, anchor: 'middle' });
  const blkHi = E('rect', { x: charX(s7a.x0, s7aStr, 2, 34) - 12, y: 268, width: charX(s7a.x0, s7aStr, 7, 34) - charX(s7a.x0, s7aStr, 2, 34) + 24, height: 42, rx: 8, fill: 'rgba(255,228,92,0.55)' }, pg2c);
  pg2c.insertBefore(blkHi, s7a);
  const s7bX = COLX[2] - textWidth('0.142857', 50, FD, 700) / 2;
  const s7b = recur(pg2c, s7bX, 375, '0.142857', [2, 7], { size: 50, fill: BLUE, dot: RED });
  const brace7 = mkBrace(pg2c, charX(s7bX, '0.142857', 7, 50) + 14, 390, charX(s7bX, '0.142857', 2, 50) - 14, 390, { col: RED, depth: 14 });
  // row 4: the denominators' prime factors
  const why = [
    { m: math(pg2c, COLX[0] - 26, 432, '8 = 2 × 2 × 2', { size: 34, anchor: 'middle' }), ok: true },
    { m: math(pg2c, COLX[1] - 26, 432, '6 = 2 × 3', { size: 34, anchor: 'middle' }), ok: false },
    { m: mkText(pg2c, COLX[2] - 26, 432, '{{7}} is prime', { size: 32, fill: INK, anchor: 'middle' }), ok: false },
  ];
  why.forEach((w, i) => {
    const xr = COLX[i] - 26 + w.m.w / 2 + 34;
    w.mark = w.ok ? tick(pg2c, 16, GREEN) : cross(pg2c, 14, RED); tr(w.mark, xr, 420);
  });
  const ring3 = E('circle', { cx: why[1].m.x0 + why[1].m.w - textWidth('3', 34, FD, 700) / 2, cy: 420, r: 22, fill: 'none', stroke: RED, 'stroke-width': 4 }, pg2c);
  // the rule card (over the board)
  const ruleC = G(pg2);
  E('rect', { x: 196, y: 186, width: 808, height: 218, rx: 20, fill: 'rgba(0,0,0,0.25)' }, ruleC);
  E('rect', { x: 190, y: 180, width: 808, height: 218, rx: 20, fill: '#FFF6C9', stroke: '#C9931A', 'stroke-width': 5 }, ruleC);
  mkText(ruleC, 594, 244, '**1.** Simplify the fraction.', { size: 36, boldFill: BLUE, anchor: 'middle', fill: INK });
  mkText(ruleC, 594, 298, '**2.** Find the prime factors of the denominator.', { size: 34, boldFill: BLUE, anchor: 'middle', fill: INK });
  mkText(ruleC, 594, 364, '**Only 2s and 5s ⇒ it stops.**', { size: 42, boldFill: GREEN, anchor: 'middle', fill: INK });

  // --- page 3: 9/12, and backwards
  E('line', { x1: 615, y1: 150, x2: 615, y2: 440, stroke: '#C9D3DC', 'stroke-width': 3 }, pg3);
  const t1 = math(pg3, 150, 225, '9/12', { size: 48 });
  const t2 = math(pg3, 260, 225, '12 = 2 × 2 × 3', { size: 40 });
  const t3ring = E('circle', { cx: t2.x0 + t2.w - textWidth('3', 40, FD, 700) / 2, cy: 211, r: 26, fill: 'none', stroke: RED, 'stroke-width': 5 }, pg3);
  const t4 = mkChip(pg3, '**recurring!**', { size: 30, col: RED, fill: '#FFECEC' });
  const stampNo = drStamp(pg3, false);
  const u1 = math(pg3, 130, 362, '9/12 = 3/4 = 0.75', { size: 46, fill: GREEN });
  const u2 = math(pg3, 150, 444, '4 = 2 × 2', { size: 40 });
  const u2t = tick(pg3, 16, GREEN); tr(u2t, 345, 432);
  const u3 = mkChip(pg3, '**terminates**', { size: 28, col: GREEN, fill: '#E6F7EC' });
  const v0 = mkText(pg3, 865, 168, '**Backwards**: decimal → fraction', { size: 30, boldFill: BLUE, fill: INK, anchor: 'middle' });
  const v1 = math(pg3, 650, 305, '0.375 = 375/1000 = 3/8', { size: 44 });
  // the ÷ 125 arrows from 375/1000 to 3/8
  const fA = v1.x0 + textWidth('0.375 = ', 44, FD, 700) + 34, fB = v1.x0 + v1.w - 14;
  const v2 = G(pg3);
  arrow(v2, fA, 247, fB, 247, { color: RED, width: 4, bend: -26 });
  arrow(v2, fA, 343, fB, 343, { color: RED, width: 4, bend: 26 });
  T(v2, (fA + fB) / 2, 222, '÷ 125', { size: 28, weight: 800, anchor: 'middle', fill: RED });
  T(v2, (fA + fB) / 2, 392, '÷ 125', { size: 28, weight: 800, anchor: 'middle', fill: RED });
  const v3 = mkText(pg3, 865, 440, '**3** decimal places ⇒ over **1000**', { size: 30, boldFill: BLUE, fill: INK, anchor: 'middle' });

  // --- page 4: the 142857 wheel and the fun fact
  const WX = 320, WY = 292, WR = 112;
  const wheelDig = '142857'.split('');
  const wAng = k => -90 + k * 60;
  const wPos = k => [WX + WR * Math.cos(wAng(k) * Math.PI / 180), WY + WR * Math.sin(wAng(k) * Math.PI / 180)];
  E('circle', { cx: WX, cy: WY, r: WR, fill: 'none', stroke: '#C9D3DC', 'stroke-width': 3, 'stroke-dasharray': '8 8' }, pg4);
  const wArr = wheelDig.map((d, k) => {
    const a0 = wAng(k) + 14, a1 = wAng(k + 1) - 14;
    const p = mkDash(E('path', { d: mkArcD(WX, WY, WR, a0, a1), fill: 'none', stroke: AMBER, 'stroke-width': 6, 'stroke-linecap': 'round' }, pg4));
    const e = a1 * Math.PI / 180, hx = WX + WR * Math.cos(e), hy = WY + WR * Math.sin(e);
    const hd = E('path', { d: 'M0,0 L-14,-8 L-14,8 Z', fill: AMBER, transform: `translate(${hx.toFixed(1)} ${hy.toFixed(1)}) rotate(${(a1 + 90).toFixed(1)})` }, pg4);
    return { p, hd };
  });
  const wNum = wheelDig.map((d, k) => {
    const [x, y] = wPos(k), g = G(pg4); tr(g, x, y);
    const c = G(g);
    E('circle', { r: 30, fill: '#FFF6C9', stroke: '#C9931A', 'stroke-width': 4 }, c);
    T(c, 0, 13, d, { size: 38, weight: 800, anchor: 'middle', fill: INK });
    return g;
  });
  const wLab = math(pg4, WX, WY + 12, '1/7', { size: 40, anchor: 'middle', fill: BLUE });
  const f1 = mkText(pg4, 820, 215, '{{1/7 = 0.142857142857…}}', { size: 30, fill: BLUE, anchor: 'middle' });
  const f2 = math(pg4, 820, 316, '142857 × 7', { size: 52, anchor: 'middle' });
  const f3 = math(pg4, 820, 400, '= 999 999', { size: 60, anchor: 'middle', fill: GREEN });
  const f3hi = E('rect', { x: 820 - f3.w / 2 - 20, y: 400 - 52, width: f3.w + 40, height: 70, rx: 12, fill: 'rgba(255,228,92,0.55)' }, pg4);
  pg4.insertBefore(f3hi, f3);
  const cFun = mkChip(Lfg, '**Fun fact!**', { size: 32, col: GOLD });

  /* ================= R: Rita close up ================= */
  const rZero = G(Lfg);
  const zr = recur(rZero, 0, 0, '0.3', [], { size: 150, fill: '#FFFFFF' });
  const zrDot = E('circle', { cx: charX(zr.m.x0, '0.3', 2, 150), cy: -150 * 0.86, r: 13, fill: AMBER, stroke: '#FFFFFF', 'stroke-width': 3 }, rZero);
  const zrEq = mkText(rZero, 0, 90, '{{= 0.3333…}}', { size: 40, fill: '#FFFFFF', anchor: 'start' });
  const cForever = mkChip(Lfg, 'a **dot** on top = that digit **recurs for ever**', { size: 30, col: GOLD });

  /* ================= the cast ================= */
  const kav = cast(Lcast, 'kavya');
  const priya = cast(Lcast, 'priya');
  const boy = cast(Lcast, 'boy');
  const tan = cast(Lcast, 'tan', { prop: null, hand: true });
  while (tan.hand.firstChild) tan.hand.removeChild(tan.hand.firstChild);
  const roset = G(tan.hand); tr(roset, 0, -58);
  for (let k = 0; k < 10; k++) { const a = k * 36; E('ellipse', { cx: 0, cy: -34, rx: 14, ry: 22, fill: k % 2 ? '#5C95F0' : DR_BLUE, stroke: SC_INK, 'stroke-width': 2.5, transform: `rotate(${a})` }, roset); }
  E('path', { d: 'M-14,30 L-26,92 L-12,82 L-4,96 L2,30 Z M14,30 L26,92 L12,82 L4,96 L-2,30 Z', fill: DR_BLUE, stroke: SC_INK, 'stroke-width': 2.5 }, roset);
  E('circle', { r: 30, fill: ball('#FFE07A', '#C9931A'), stroke: SC_INK, 'stroke-width': 3 }, roset);
  T(roset, 0, 11, '1st', { size: 28, weight: 800, anchor: 'middle', fill: SC_INK });
  op(roset, 0);
  const coinH = coin1(boy.hand, 1); tr(coinH, 0, -34);
  // Rita, mirrored so that she faces left (towards the family), on her perch
  const ritaW = G(Lcast), ritaF = G(ritaW);
  ritaF.setAttribute('transform', 'scale(-1 1)');
  const rita = cast(ritaF, 'rita');
  const perch = drPerch(ritaW, 200); tr(perch, 0, 118);
  const dot = cast(Lcast, 'dot');
  const ltRita = drLowerThird(Lhud, 'rita');
  // her trail of 3s
  const trail = G(Lfg);
  const NTR = 12, trTxt = [];
  for (let i = 0; i < NTR; i++) {
    const tx = T(trail, 0, 0, '3', { size: 40, weight: 800, anchor: 'middle', fill: '#2FA36B' });
    tx.setAttribute('stroke', '#FFFFFF'); tx.setAttribute('stroke-width', 6); tx.setAttribute('paint-order', 'stroke');
    trTxt.push(tx);
  }
  const quietT = T(Lfg, 0, 0, '3', { size: 30, weight: 800, anchor: 'middle', fill: '#2FA36B' });

  /* ---------- shots ---------- */
  const cut = id => at(id) - 0.06;
  const SHOTS = [['W', -9], ['D1', cut('split')], ['W', cut('rita')], ['D1', cut('cent')], ['W', cut('boy')], ['R', cut('shush')],
    ['D2', cut('which')], ['D3', cut('twelve')], ['D4', cut('fact')]];
  const shotAt = t => { let s = 'W'; for (const [k, t0] of SHOTS) if (t >= t0) s = k; return s; };
  const tLand = mid('rita', 0.35);                 // Rita lands on her perch
  const tShush = mid('shush', 0.32);               // Dot lands on her head
  const tGrab = mid('boy', 0.18);                  // Ah Boy grabs the coin
  // the lineup in front of the board (D shots)
  const DX = { kavya: 150, priya: 365, boy: 580, tan: 805, rita: 1045 };
  const lookAt = (t, me) => { const w = scWho(S, t); if (!w || w === me || DX[w] === undefined) return 0; return clamp((DX[w] - DX[me]) / 260, -0.9, 0.9); };
  // W positions
  const WXp = { kavya: 200, priya: 410, boy: 600, tan: 830, rita: 1050 };
  const lookW = (t, me) => { const w = scWho(S, t); if (!w || w === me || WXp[w] === undefined) return 0; return clamp((WXp[w] - WXp[me]) / 260, -0.9, 0.9); };

  // trail of 3s from a beak at (bx, by): rate per second, travel vector, size scale
  function runTrail(t, on, bx, by, dx, dy, sc, chr) {
    if (!on) { op(trail, 0); return; }
    op(trail, 1);
    trTxt.forEach((tx, i) => {
      const u = ((t * 0.55 + i / NTR) % 1 + 1) % 1;
      const x = bx + dx * u + Math.sin((u * 5 + i) * 1.7) * 14 * AMP, y = by + dy * u;
      tx.setAttribute('x', x.toFixed(1)); tx.setAttribute('y', y.toFixed(1));
      tx.setAttribute('font-size', (sc * (26 + 22 * u)).toFixed(1));
      op(tx, clamp(on * Math.min(u * 6, (1 - u) * 3)));
      const c = typeof chr === 'string' ? chr[i % chr.length] : '3';
      if (tx.textContent !== c) tx.textContent = c;
    });
  }

  return t => {
    const sh = shotAt(t);
    tent.upd(t);
    const W = sh === 'W', R = sh === 'R', D = sh[0] === 'D';
    op(tent.front, W ? 1 : 0); op(Ltop, W ? 1 : 0);
    op(board, D ? 1 : 0);
    op(pg1, sh === 'D1'); op(pg2, sh === 'D2'); op(pg3, sh === 'D3'); op(pg4, sh === 'D4');
    [c2pm, cBest, cPrize, cLeft, cFees, cForever, cFun].forEach(c => c.set(0));
    op(rZero, 0); op(quietT, 0); op(roset, 0); ltRita.set(0);
    const who = scWho(S, t);
    // default visibility: everybody, Dot hidden
    op(kav, 1); op(priya, 1); op(boy, 1); op(tan, 1); op(ritaW, t >= at('rita') - 0.1 ? 1 : 0); op(dot, 0);
    const hasCoin = t >= tGrab;
    op(coinH, hasCoin ? 1 : 0);
    let trailOn = 0;
    const ritaTalk = scTalk(S, t, 'rita');
    const flap = who === 'rita' ? 1 : 0;

    if (W) {
      /* ---------- W: the tent ---------- */
      const s2 = t < cut('split'), sB = t >= cut('boy');
      tr(kav, WXp.kavya, 440, 1); tr(priya, WXp.priya, 446, 1); tr(boy, WXp.boy, 456, 1); tr(tan, WXp.tan, 440, 1);
      const shockR = t >= at('rita') && t < cut('cent');
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: s2 ? 'happy' : shockR ? (t < tLand + 0.4 ? 'shock' : 'deadpan') : 'deadpan', look: s2 ? 0.6 : shockR ? 0.9 : lookW(t, 'kavya') });
      priya.set({ t, talk: scTalk(S, t, 'priya'), mood: s2 ? 'smug' : shockR ? (t < tLand + 0.4 ? 'shock' : 'annoyed') : 'deadpan', look: s2 ? 0.6 : shockR ? 0.9 : lookW(t, 'priya') });
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: shockR ? 'shock' : 'happy', look: s2 ? 0.6 : shockR ? 0.9 : sB ? -0.3 : 0, lift: sB && hasCoin ? 1 : 0 });
      tan.set({ t, talk: scTalk(S, t, 'tan'), mood: shockR ? 'shock' : sB ? 'deadpan' : 'happy', look: s2 ? -0.7 : shockR ? 0.8 : -0.6, lift: s2 ? 1 : 0 });
      op(roset, s2 ? 1 : 0);
      // table props
      op(note, s2 || shockR ? 1 : 0); tr(note, 470, 498, 1, -4);
      op(piles, sB ? 1 : 0); op(pileLab, sB ? P(t, at('boy'), 0.25, linear) : 0);
      op(coinT, sB && !hasCoin ? 1 : 0); tr(coinT, 770, 512);
      // Rita
      if (t >= at('rita') - 0.1) {
        const fl = P(t, at('rita') - 0.1, tLand - at('rita') + 0.1, easeOut);
        const x = lerp(1340, WXp.rita, fl), y = lerp(200, 380, fl) - Math.sin(fl * Math.PI) * 60;
        tr(ritaW, x, y, 0.8);
        op(perch, 1); tr(perch, (WXp.rita - x) / 0.8, 118 + (380 - y) / 0.8);
        rita.set({ t, talk: ritaTalk, mood: 'happy', look: sB ? 0.6 : 0.3, flap: t < tLand + 0.3 || flap ? 1 : 0 });
        trailOn = t > tLand ? (who === 'rita' ? 1 : 0.6) : 0;
        if (trailOn) runTrail(t, trailOn, x - 34 * 0.8, y - 14 * 0.8, -360, -150, 1, '3');
      }
      if (s2) {
        c2pm.set(P(t, at('two') + 0.1, 0.4, linear)); tr(c2pm, 1040, 236);
        cBest.set(P(t, mid('two', 0.25), 0.4, linear)); tr(cBest, 830, 236);
        cPrize.set(P(t, mid('two', 0.55), 0.4, linear)); tr(cPrize, 330, 236);
      }
      if (shockR) ltRita.set(win(t, at('rita') + 0.1, at('rita') + 3.3, 0.3));
      if (sB) {
        cLeft.set(P(t, mid('boy', 0.25), 0.35, linear)); tr(cLeft, 420, 236);
        cFees.set(P(t, mid('boy', 0.6), 0.35, linear)); tr(cFees, 660, 300);
      }
    } else if (R) {
      /* ---------- R: Rita close up ---------- */
      op(tent.front, 0);
      const RXc = 840, RYc = 380, RS = 1.35;
      tr(ritaW, RXc, RYc, RS); op(perch, 1); tr(perch, 0, 118);
      op(boy, 0); op(tan, 0);
      tr(kav, 165, 690, 0.9); tr(priya, 395, 698, 0.9);
      const landed = t >= tShush;
      kav.set({ t, talk: 0, mood: landed ? 'happy' : 'deadpan', look: 0.9 });
      priya.set({ t, talk: 0, mood: landed ? 'smug' : 'annoyed', look: 0.9 });
      rita.set({ t, talk: ritaTalk, mood: t < tShush ? 'happy' : t < tShush + 0.6 ? 'shock' : t >= at('quiet') ? 'sad' : 'neutral', look: t >= tShush ? 0 : 0.3, flap: t < tShush ? 1 : 0, still: landed });
      // Dot hops on from the right and sits on her head
      op(dot, 1);
      const hx0 = 1180, hy0 = 640, hx1 = RXc + 8, hy1 = RYc - 140 * RS - 34;
      const hp = P(t, at('shush') + 0.1, tShush - at('shush') - 0.1, ease);
      tr(dot, lerp(hx0, hx1, hp), lerp(hy0, hy1, hp) - Math.sin(hp * Math.PI) * 160, lerp(0.5, 0.38, hp));
      dot.set({ t, talk: scTalk(S, t, 'dot'), mood: landed ? 'smug' : 'annoyed', look: landed ? -0.7 : -0.4, arms: hp < 1 ? 0.8 : 0, still: landed });
      if (t < tShush) runTrail(t, 1, RXc - 34 * RS, RYc - 14 * RS, -440, -120, 1.25, '3');
      else {
        // the last few 3s fall silent and fade
        const k = 1 - P(t, tShush, 0.4, linear);
        if (k > 0) runTrail(tShush, k, RXc - 34 * RS, RYc - 14 * RS, -440, -120, 1.25, '3'); else op(trail, 0);
      }
      // 0.3 with a real dot
      const zp = P(t, mid('shush', 0.45), 0.4, pop);
      op(rZero, clamp(zp * 2.5)); tr(rZero, 120, 330, Math.max(0.01, 0.7 + 0.3 * zp));
      const dd = P(t, mid('shush', 0.58), 0.35, easeOut);
      op(zrDot, dd); attr(zrDot, 'cy', -150 * 0.86 - 60 * (1 - dd));
      op(zrEq, P(t, mid('shush', 0.68), 0.3, linear));
      cForever.set(P(t, mid('shush', 0.75), 0.35, linear)); tr(cForever, 330, 520);
      if (t >= at('quiet')) {
        const q = P(t, at('quiet') + 0.1, 1.2, linear);
        op(quietT, clamp(q * 4) * (1 - P(t, end('quiet') + 0.5, 0.3, linear)));
        quietT.setAttribute('x', (RXc - 34 * RS - 60 * q).toFixed(1)); quietT.setAttribute('y', (RYc - 14 * RS - 40 * q).toFixed(1));
      }
    } else {
      /* ---------- D: the whiteboard and the lineup ---------- */
      tr(kav, DX.kavya, 655, 0.82); tr(priya, DX.priya, 660, 0.82); tr(boy, DX.boy, 668, 0.82); tr(tan, DX.tan, 672, 0.8);
      const inLine = t >= at('rita');
      op(ritaW, inLine ? 1 : 0); tr(ritaW, DX.rita, 612, 0.6); op(perch, 1); tr(perch, 0, 118);
      const sp = sh === 'D1', d2 = sh === 'D2', d3 = sh === 'D3', d4 = sh === 'D4';
      let mk = 'neutral', mp = 'neutral', mb = 'happy', mt = 'neutral', mr = 'happy';
      if (sp && t < cut('rita')) { mk = 'neutral'; mp = 'smug'; mb = 'happy'; mt = 'happy'; }
      if (sp && t >= cut('cent')) { mk = 'deadpan'; mp = 'smug'; mb = t > mid('cent', 0.75) ? 'shock' : 'happy'; mt = 'neutral'; }
      if (d2) { mk = who === 'kavya' ? 'smug' : 'neutral'; mp = 'neutral'; mt = 'happy'; mr = 'happy'; mb = 'happy'; }
      if (d3) {
        const stamped = t > end('twelve') + 0.1;
        mp = t < end('twelve') ? 'smug' : 'annoyed'; mk = stamped ? 'deadpan' : 'neutral'; mt = t >= at('simplify') ? 'happy' : 'deadpan'; mb = stamped ? 'deadpan' : 'happy'; mr = 'neutral';
        if (t >= at('back')) { mk = 'smug'; mp = 'sad'; }
      }
      if (d4) { mk = 'deadpan'; mp = 'deadpan'; mb = 'deadpan'; mt = 'deadpan'; mr = 'happy'; }
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: mk, look: lookAt(t, 'kavya') });
      priya.set({ t, talk: scTalk(S, t, 'priya'), mood: mp, look: lookAt(t, 'priya') });
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: mb, look: lookAt(t, 'boy'), lift: hasCoin && (d4 || d3) ? 1 : 0 });
      tan.set({ t, talk: scTalk(S, t, 'tan'), mood: mt, look: lookAt(t, 'tan') });
      rita.set({ t, talk: ritaTalk, mood: mr, look: -lookAt(t, 'rita'), flap: flap });
      if (sp && inLine) runTrail(t, 0.6, DX.rita - 34 * 0.6, 612 - 14 * 0.6, -60, -120, 0.85, '3');
      if (d2 && (who === 'rita') && t < end('seventh')) runTrail(t, 0.75, DX.rita - 34 * 0.6, 612 - 14 * 0.6, -60, -120, 0.85, t < at('seventh') ? '6' : '142857');

      if (sp) {
        // split: the 3s keep coming
        const longOn = t < cut('rita');
        op(A1, longOn ? 1 : 0); op(A2, longOn ? 0 : 1);
        const n = longOn ? clamp((t - mid('split', 0.25)) * 3.2, 0, 13) : 0;
        threes.forEach((d, k) => op(d, longOn ? clamp(n - k) : 0));
        cNever.set(longOn ? P(t, mid('split', 0.62), 0.35, linear) : 0); tr(cNever, 600, 330);
        // cent
        const cn = !longOn;
        op(nc, cn ? fin(nc, t, mid('cent', 0.05)) : 0);
        op(B1, cn ? fin(B1, t, mid('cent', 0.08)) : 0); op(B2, cn ? fin(B2, t, mid('cent', 0.08)) : 0);
        op(cutBar, cn ? P(t, mid('cent', 0.18), 0.2, linear) : 0);
        op(decRing, cn ? P(t, mid('cent', 0.26), 0.2, linear) : 0); op(decLab, cn ? P(t, mid('cent', 0.26), 0.2, linear) : 0);
        op(B3, cn ? fin(B3, t, mid('cent', 0.36)) : 0); op(B4, cn ? fin(B4, t, mid('cent', 0.4)) : 0);
        op(C1, cn ? fin(C1, t, mid('cent', 0.62)) : 0);
        C2.set(cn ? P(t, mid('cent', 0.82), 0.35, linear) : 0); tr(C2, 800, 405);
      }
      if (d2) {
        op(pg2c, t >= at('test') && t < cut('why') ? 0.22 : 1);   // dim the columns under the rule card
        // header row
        fr.forEach((f, i) => { op(f, fin(f, t, mid('which', 0.12 + i * 0.18))); });
        qm.forEach((q, i) => { op(q, t < [at('eighth'), at('sixth'), at('seventh')][i] + 0.3 ? P(t, mid('which', 0.2 + i * 0.18), 0.25, linear) : 0); });
        verdict.forEach((v, i) => op(v, t >= [mid('eighth', 0.6), mid('sixth', 0.45), mid('seventh', 0.45)][i] ? 1 : 0));
        // col 1
        op(bus, t >= at('eighth') ? 1 : 0);
        bus.set((t - mid('eighth', 0.1)) / 0.36, (t - mid('eighth', 0.1) - 0.2) / 0.36 - 1);
        cTerm.set(P(t, mid('eighth', 0.62), 0.35, linear)); tr(cTerm, COLX[0], 378);
        // col 2
        op(s6a, fin(s6a, t, mid('sixth', 0.08))); op(s6b, fin(s6b, t, mid('sixth', 0.5)));
        op(s6n, 0);
        // col 3
        op(s7a, fin(s7a, t, mid('seventh', 0.08))); op(blkHi, P(t, mid('seventh', 0.35), 0.3, linear));
        op(s7b, fin(s7b, t, mid('seventh', 0.55))); brace7.set(P(t, mid('seventh', 0.7), 0.4, linear));
        // why
        why.forEach((w, i) => { const t0 = mid('why', [0.05, 0.4, 0.72][i]); op(w.m, fin(w.m, t, t0)); op(w.mark, P(t, t0 + 0.6, 0.25, linear)); });
        op(ring3, P(t, mid('why', 0.55), 0.25, linear));
        // the rule card
        const rc = t >= at('test') && t < cut('why') ? P(t, at('test') + 0.05, 0.35, pop) : 0;
        op(ruleC, clamp(rc * 3)); ruleC.setAttribute('transform', `translate(600 290) scale(${Math.max(0.01, 0.7 + 0.3 * rc).toFixed(3)}) translate(-600 -290)`);
      }
      if (d3) {
        op(t1, fin(t1, t, at('twelve') + 0.05)); op(t2, fin(t2, t, mid('twelve', 0.3)));
        op(t3ring, P(t, mid('twelve', 0.55), 0.2, linear));
        t4.set(t < at('simplify') ? P(t, mid('twelve', 0.7), 0.3, linear) : 0); tr(t4, 330, 290);
        const st = P(t, end('twelve') + 0.05, 0.3, linear);
        stampNo.set(t < at('simplify') + 1.2 ? st : 0); tr(stampNo, 330, 385, 0.5);
            op(u1, fin(u1, t, mid('simplify', 0.2)));
        op(u2, fin(u2, t, mid('simplify', 0.62))); op(u2t, P(t, mid('simplify', 0.72), 0.25, linear));
        u3.set(P(t, mid('simplify', 0.8), 0.35, linear)); tr(u3, 490, 432);
        op(v0, fin(v0, t, at('back') + 0.05)); op(v1, fin(v1, t, mid('back', 0.15)));
        op(v2, P(t, mid('back', 0.5), 0.35, linear)); op(v3, fin(v3, t, mid('back', 0.72)));
      }
      if (d4) {
        wNum.forEach((g, k) => { const p = P(t, mid('fact', 0.1) + k * 0.28, 0.35, pop); op(g, clamp(p * 3)); g.firstChild.setAttribute('transform', `scale(${Math.max(0.01, 0.5 + 0.5 * p).toFixed(3)})`); });
        wArr.forEach(({ p, hd }, k) => { const q = P(t, mid('fact', 0.1) + k * 0.28 + 0.16, 0.26, linear); mkDraw(p, q); op(hd, q > 0.9 ? 1 : 0); });
        op(wLab, P(t, mid('fact', 0.1), 0.3, linear));
        op(f1, fin(f1, t, mid('fact', 0.25)));
        op(f2, fin(f2, t, mid('fact', 0.5)));
        const fp = P(t, mid('fact', 0.72), 0.4, pop);
        op(f3, clamp(fp * 3)); op(f3hi, P(t, mid('fact', 0.85), 0.3, linear));
        if (t > mid('fact', 0.4)) runTrail(t, 0.7, DX.rita - 34 * 0.6, 612 - 14 * 0.6, -60, -120, 0.85, '9');
      }
    }
    if (!trailOn && !R && !(sh === 'D1' && t >= at('rita')) && !(sh === 'D2' && who === 'rita' && t < end('seventh')) && !(sh === 'D4' && t > mid('fact', 0.4))) op(trail, 0);
  };
});
