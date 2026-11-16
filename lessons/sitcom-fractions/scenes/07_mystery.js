/* Scene 7: Mister X cancels (algebraic fractions, stretch).
   Shots (hard sitcom cuts):
   A  the party table: TWEET! Ah Boy tears the last layer of the parcel: a bare gift box that rattles.
   B  Mr Tan's whiteboard (cast in the corners): x/3 × 6/x, any x except 0 -> Priya: x = 7 gives 2 -> Ah Boy: x = a
      million gives 2 ?!
   A  the box bursts in a puff of confetti and Mister X rises out of it (lower third). Everyone gasps.
   B  x/3 × 6/x = 6x/3x = 2: the two x's are struck out and fly away with a puff (x/x = 1) -> harder: 2x/3 × 9/(4x),
      cancel first: x with x, 2 with 4, 9 with 3 -> (1 × 3)/(1 × 2) = 3/2 = 1 1/2, check x = 2 -> dividing:
      4x/9 ÷ 2x/3 = 4x/9 × 3/(2x), cancel -> 2/3 -> Ah Boy: (x + 5)/(x + 7), the x's struck out -> 5/7? ->
      Mister X and his + 5 bodyguard: the strikes bounce off, NOT ON MY BAR!, only factors cancel -> Kavya: x = 1
      gives 6/8 = 3/4, not 5/7.
   A  Mr Tan's pun: "He always cancels." Mister X tips his hat and vanishes; deadpan faces; the blower droops. Hold. */
scene('mystery', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;
  const talk = (t, who) => scTalk(S, t, who);

  /* ---------- local helpers ---------- */
  const GOLD = '#FFE45C', PINK = '#FF8FC8', RED = '#C62828', GREEN = '#1E9E5A', BLUE = '#2E6FD8', INK = MK.ink, BERRY = '#B8336A', PURP = '#7B3FC4';
  const chipAt = (parent, text, o) => { o = o || {}; return mkChip(parent, text, Object.assign({ size: 30, col: C.ink }, o)); };
  const popSet = (el, t, t0, x, y) => { el.set(P(t, t0, 0.35, linear)); if (x !== undefined) tr(el, x, y); };
  const fade = (t, t0, d) => P(t, t0, d || 0.3, linear);
  const lookAt = (x, sx) => clamp((sx - x) / 260, -1, 1);
  const outline = (el, col, w) => { el.setAttribute('stroke', col); el.setAttribute('stroke-width', w); el.setAttribute('paint-order', 'stroke'); el.setAttribute('stroke-linejoin', 'round'); return el; };
  const card = (parent, text, o) => {
    o = o || {};
    const g = G(parent), m = mkText(g, 0, 0, text, { size: o.size || 34, anchor: 'middle', fill: C.ink, boldFill: o.bold || GOLD });
    const w = m.w + 60, h = Math.max(64, m.h + 26);
    const r = E('rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: Math.min(28, h / 2), fill: 'rgba(10,27,39,0.92)', stroke: o.col || GOLD, 'stroke-width': 3 }, g);
    g.insertBefore(r, m); tr(m, 0, -m.top - m.h / 2);
    return g;
  };
  /* An algebra row built from single tokens, so each x or number can be struck out, replaced or sent flying.
     items: { n: [tok...], d: [tok...] } (a fraction) or a string (an operator or a number on the line);
     tok: 'x' or ['x', key]. Letters are italic. o: size, fill, anchor ('middle' | 'start'),
     cancels { key: [colour, replacement or null] }.
     g.cancel(key, p) draws the strike and shows the replacement; g.fly(key, p) sends a token (and its strike) up and away;
     g.tok[key] = { el, cx, y, w }; g.right, g.left. */
  function algRow(parent, x, y, items, o) {
    const s = o.size || 64, col = o.fill || INK, g = G(parent);
    const isOp = str => /^[+−×÷=]$/.test(str);
    const tokW = str => textWidth(str, s, FD, 700) + (isOp(str) ? s * 0.34 : s * 0.03);
    const runW = toks => toks.reduce((a, k) => a + tokW(Array.isArray(k) ? k[0] : k), 0);
    const itemW = it => (typeof it === 'string' ? tokW(it) + s * 0.12 : Math.max(runW(it.n), runW(it.d)) + s * 0.34);
    const total = items.reduce((a, it) => a + itemW(it), 0);
    let cx = o.anchor === 'start' ? x : x - total / 2;
    g.left = cx; g.tok = {};
    const put = (k, tc, by, top) => {
      const str = Array.isArray(k) ? k[0] : k, key = Array.isArray(k) ? k[1] : null;
      const el = T(g, tc, by, str, { size: s, weight: 700, anchor: 'middle', fill: col });
      if (/[a-z]/.test(str)) { el.setAttribute('font-style', 'italic'); el.setAttribute('fill', o.xCol || col); }
      if (key) g.tok[key] = { el, cx: tc, y: by, w: textWidth(str, s, FD, 700), top };
    };
    const run = (toks, c, by, top) => { let rx = c - runW(toks) / 2; toks.forEach(k => { const w = tokW(Array.isArray(k) ? k[0] : k); put(k, rx + w / 2, by, top); rx += w; }); };
    items.forEach(it => {
      const w = itemW(it);
      if (typeof it === 'string') put(it, cx + w / 2, y + s * 0.33, true);
      else {
        run(it.n, cx + w / 2, y - s * 0.2, true);
        E('rect', { x: cx + s * 0.1, y: y - s * 0.05, width: w - s * 0.2, height: s * 0.1, rx: s * 0.05, fill: col }, g);
        run(it.d, cx + w / 2, y + s * 0.92, false);
      }
      cx += w;
    });
    g.right = cx;
    const strikes = {}, reps = {};
    for (const key in (o.cancels || {})) {
      const A = g.tok[key], [lc, rep] = o.cancels[key], hw = A.w / 2 + 8;
      strikes[key] = mkDash(E('path', { d: `M${(A.cx - hw).toFixed(1)},${(A.y + 4).toFixed(1)} L${(A.cx + hw).toFixed(1)},${(A.y - s * 0.68).toFixed(1)}`, stroke: lc, 'stroke-width': Math.max(5, s * 0.08), fill: 'none', 'stroke-linecap': 'round' }, g));
      if (rep) reps[key] = T(g, A.cx, A.top ? A.y - s * 0.86 : A.y + s * 0.52, rep, { size: Math.round(s * 0.52), weight: 800, anchor: 'middle', fill: lc });
    }
    g.cancel = (key, p) => { op(strikes[key], p > 0 ? 1 : 0); mkDraw(strikes[key], p); if (reps[key]) op(reps[key], clamp((p - 0.6) / 0.4)); };
    g.fly = (key, p) => {
      const A = g.tok[key]; p = clamp(p);
      const tf = p > 0 ? `translate(${(30 * p).toFixed(1)} ${(-90 * easeOut(p)).toFixed(1)}) rotate(${(40 * p).toFixed(1)} ${A.cx.toFixed(1)} ${A.y.toFixed(1)})` : '';
      A.el.setAttribute('transform', tf); op(A.el, 1 - p);
      if (strikes[key]) { strikes[key].setAttribute('transform', tf); if (p > 0) op(strikes[key], 1 - p); }
    };
    g.reset = () => { for (const k in strikes) g.cancel(k, 0); for (const k in g.tok) { g.tok[k].el.setAttribute('transform', ''); op(g.tok[k].el, 1); } };
    g.reset();
    return g;
  }
  // a little puff of smoke for cancelled x's
  function puff(parent) {
    const g = G(parent), r = rng(29), bits = [];
    for (let i = 0; i < 7; i++) { const a = i / 7 * TAU + r() * 0.4; bits.push({ el: E('circle', { r: 10 + r() * 8, fill: i % 2 ? '#E7D8FF' : '#FFFFFF', stroke: '#B9A3E0', 'stroke-width': 2 }, g), a, d: 34 + r() * 20 }); }
    g.set = (p, x, y) => { p = clamp(p); op(g, p > 0 && p < 1 ? 1 : 0); bits.forEach(b => { tr(b.el, x + Math.cos(b.a) * b.d * easeOut(p), y + Math.sin(b.a) * b.d * easeOut(p), 0.5 + p); op(b.el, 1 - p); }); };
    return g;
  }

  /* ---------- layers ---------- */
  const Lbg = G(root), Lins = G(root), Lcast = G(root), Lfront = G(root), Ltop = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= A: the party table ================= */
  const voidShot = G(Lbg);
  const vd = fcVoid(voidShot);
  Lfront.appendChild(vd.front);
  const exHole = G(Ltop);            // Mister X rises behind the box
  const boxW = G(Ltop), parcel = fcParcel(boxW, { layers: 5 });
  const scrapG = G(Ltop), scraps = [];
  { const r = rng(23); for (let i = 0; i < 9; i++) { const sz = 14 + r() * 16; scraps.push({ el: E('path', { d: `M${-sz},${-sz * 0.6} L${sz},${-sz * 0.3} L${sz * 0.5},${sz * 0.7} L${-sz * 0.8},${sz * 0.4} Z`, fill: '#FF5FA2', stroke: SC_INK, 'stroke-width': 2.5 }, scrapG), vx: (r() - 0.5) * 520, vy: 260 + r() * 260, rot: (r() - 0.5) * 720 }); } }
  const confG = G(Ltop), confs = [];
  { const r = rng(31), CC = ['#FF5FA2', '#FFE45C', '#4CC9F0', '#56D69B', '#B48CFF', '#FFFFFF'];
    for (let i = 0; i < 16; i++) confs.push({ el: E('rect', { x: -7, y: -4, width: 14, height: 8, fill: CC[i % 6], stroke: SC_INK, 'stroke-width': 1 }, confG), vx: (r() - 0.5) * 700, vy: 300 + r() * 380, rot: r() * 900 }); }
  const smoke = puff(Ltop);
  const tweet = G(Lfg);
  { E('path', { d: 'M-96,-30 L-60,-46 L-40,-70 L-8,-48 L30,-66 L46,-40 L92,-42 L72,-8 L100,20 L56,26 L44,58 L8,36 L-30,60 L-44,28 L-92,24 L-72,-2 Z', fill: GOLD, stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, tweet);
    T(tweet, 0, 12, 'TWEET!', { size: 32, weight: 800, anchor: 'middle', fill: RED }); }
  const cardLast = card(Lfg, '**The last layer!**', { size: 34 });
  const cardRattle = card(Lfg, 'rattle, rattle...', { size: 32, col: '#9FD8FF' });
  const cardEx = card(Lfg, 'Any number. **Except 0.**', { size: 34, col: '#B48CFF', bold: '#D9B8FF' });
  const cardPun = card(Lfg, 'He always **cancels**.', { size: 36 });
  const hornW = G(Lfg), horn = fcHorn(hornW);

  /* ================= B: Mr Tan's whiteboard ================= */
  const boardShot = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#E9E6DA' }, boardShot);
  E('rect', { x: 0, y: 590, width: 1200, height: 70, fill: '#2E9C8C' }, boardShot);
  E('rect', { x: 0, y: 660, width: 1200, height: 90, fill: '#B8B8AE' }, boardShot);
  { let d = ''; for (const x of [70, 1130]) d += `M${x - 40},0 L${x - 40},590 M${x + 40},0 L${x + 40},590 `; E('path', { d, stroke: '#CFCBBD', 'stroke-width': 4 }, boardShot); }
  const board = G(Lins);
  const wb = mkWhiteboard(board, 940, 420); tr(wb, 700, 330);

  // B1: think of a number
  const b1 = G(board);
  { const g = G(b1); E('rect', { x: 252, y: 140, width: 190, height: 44, rx: 12, fill: BERRY }, g); T(g, 347, 172, 'LAST LAYER', { size: 26, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 1 }); }
  const q1 = mkMath(b1, 700, 248, 'x/3 × 6/x', { size: 64, anchor: 'middle', fill: INK });
  const anyX = mkText(b1, 700, 366, 'any number **x**, except **0**', { size: 34, anchor: 'middle', fill: INK, boldFill: PURP });
  const r7 = mkMath(b1, 700, 372, 'x = 7: 7/3 × 6/7 = 42/21 = 2', { size: 44, anchor: 'middle', fill: BLUE });
  const rM = mkMath(b1, 670, 488, 'x = 1,000,000: 1,000,000/3 × 6/1,000,000 = 2', { size: 40, anchor: 'middle', fill: '#E07A1A' });
  const rMq = outline(T(b1, 0, 0, '?!', { size: 52, weight: 800, anchor: 'start', fill: RED }), '#FFFFFF', 4);

  // B2: Mister X cancels himself out
  const b2 = G(board);
  const b2head = mkText(b2, 700, 176, 'an **x** on top, an **x** on the bottom: **cancel**', { size: 34, anchor: 'middle', fill: INK, boldFill: PURP });
  const rowC = algRow(b2, 700, 300, [{ n: [['x', 'a']], d: ['3'] }, '×', { n: ['6'], d: [['x', 'b']] }, '=', { n: ['6', ['x', 'c']], d: ['3', ['x', 'd']] }, '=', '2'],
    { size: 72, xCol: PURP, cancels: { a: [PURP, '1'], b: [PURP, '1'], c: [PURP, null], d: [PURP, null] } });
  const ringC = E('rect', { x: rowC.tok ? 0 : 0, y: 0, width: 1, height: 1, rx: 10, fill: 'none', stroke: GREEN, 'stroke-width': 5 }, b2);
  const xx1 = mkMath(b2, 700, 480, 'x/x = 1', { size: 46, anchor: 'middle', fill: PURP });
  const puffA = puff(b2), puffB = puff(b2);

  // B3: harder (cancel first)
  const b3 = G(board);
  mkText(b3, 700, 176, 'Harder! **Cancel first.**', { size: 36, anchor: 'middle', fill: INK, boldFill: BERRY });
  const rowH = algRow(b3, 560, 300, [{ n: [['2', 'n2'], ['x', 'nx']], d: [['3', 'd3']] }, '×', { n: [['9', 'n9']], d: [['4', 'd4'], ['x', 'dx']] }],
    { size: 76, xCol: PURP, cancels: { nx: [PURP, null], dx: [PURP, null], n2: [RED, '1'], d4: [RED, '2'], n9: [BLUE, '3'], d3: [BLUE, '1'] } });
  const resH = mkMath(b3, rowH.right + 20, 320, '= (1 × 3)/(1 × 2) = 3/2 = 1 1/2', { size: 50, fill: INK });
  tr(resH, 0, 0);
  const ringH = E('rect', { x: 0, y: 0, width: 1, height: 1, rx: 10, fill: 'none', stroke: GREEN, 'stroke-width': 5 }, b3);
  const chkH = mkText(b3, 700, 514, 'check, x = 2: {{4/3 × 9/8 = 36/24 = 3/2}} ✓', { size: 32, anchor: 'middle', fill: GREEN });
  const pairH = mkText(b3, 700, 456, '**x** with **x**   ·   **2** with **4**   ·   **9** with **3**', { size: 30, anchor: 'middle', fill: '#5A4A52' });

  // B4: dividing
  const b4 = G(board);
  mkText(b4, 700, 176, 'Dividing: **keep, change, flip**, then **cancel**', { size: 34, anchor: 'middle', fill: INK, boldFill: BERRY });
  const q4 = mkMath(b4, 700, 250, '4x/9 ÷ 2x/3', { size: 56, anchor: 'middle', fill: INK });
  const rowD = algRow(b4, 300, 400, ['=', { n: [['4', 'n4'], ['x', 'nx']], d: [['9', 'd9']] }, '×', { n: [['3', 'n3']], d: [['2', 'd2'], ['x', 'dx']] }],
    { size: 66, anchor: 'start', xCol: PURP, cancels: { nx: [PURP, null], dx: [PURP, null], n4: [RED, '2'], d2: [RED, '1'], n3: [BLUE, '1'], d9: [BLUE, '3'] } });
  const resD = mkMath(b4, rowD.right + 24, 424, '= (2 × 1)/(3 × 1) = 2/3', { size: 52, fill: INK });
  const ringD = E('rect', { x: 0, y: 0, width: 1, height: 1, rx: 10, fill: 'none', stroke: GREEN, 'stroke-width': 5 }, b4);
  const flipLab = mkText(b4, 0, 0, '**flip**', { size: 28, anchor: 'middle', fill: RED });

  // B5: (x + 5)/(x + 7)
  const b5 = G(board);
  const b5head = mkText(b5, 700, 176, 'Cancel the **x**’s?', { size: 36, anchor: 'middle', fill: INK, boldFill: PURP });
  const rowP = algRow(b5, 520, 290, [{ n: [['x', 'nx'], ['+', 'np'], ['5', 'n5']], d: [['x', 'dx'], ['+', 'dp'], ['7', 'd7']] }],
    { size: 80, xCol: PURP, cancels: { nx: [RED, null], dx: [RED, null] } });
  const wrongP = mkMath(b5, rowP.right + 30, 316, '= 5/7 ?', { size: 64, fill: RED });
  const boxTop = E('rect', { x: rowP.left + 16, y: 290 - 0.2 * 80 - 64, width: rowP.right - rowP.left - 32, height: 78, rx: 12, fill: 'none', stroke: '#E07A1A', 'stroke-width': 5 }, b5);
  const boxBot = E('rect', { x: rowP.left + 16, y: 290 + 0.92 * 80 - 64, width: rowP.right - rowP.left - 32, height: 78, rx: 12, fill: 'none', stroke: '#E07A1A', 'stroke-width': 5 }, b5);
  const stuck = mkText(b5, rowP.left - 14, 290 - 40, '**+ 5** is stuck to **x**', { size: 28, anchor: 'end', fill: '#E07A1A' });
  const factorT = mkText(b5, 700, 446, 'Only **factors** cancel: things that **multiply**\nthe **whole** top and the **whole** bottom', { size: 32, anchor: 'middle', fill: INK, boldFill: GREEN, lh: 42 });
  const tryM = mkMath(b5, 700, 470, 'x = 1: (1 + 5)/(1 + 7) = 6/8 = 3/4 != 5/7', { size: 48, anchor: 'middle', fill: BLUE });
  const stampNo = fcStamp(b5, false);
  const cFactors = chipAt(Lfg, 'only **factors** cancel', { col: GOLD, size: 30 });

  /* ================= the cast ================= */
  const kav = cast(Lcast, 'kavya');
  const priya = cast(Lcast, 'priya', { hat: '#B48CFF' });
  const boy = cast(Lcast, 'boy', { hat: '#4CC9F0' });
  const dad = cast(Lcast, 'dad', { hat: '#56D69B', prop: null });
  const tan = cast(Lcast, 'tan', { hat: '#FFC247', hand: true });
  const ex = cast(exHole, 'ex');
  const exC = cast(Lcast, 'ex');     // in the board-shot corners
  const kavHat = fcHat(kav.firstChild, '#FFE45C'); tr(kavHat, 14, -116, 0.9, 12);
  const whistle = G(tan.hand); tr(whistle, 0, -6, 1, -20);
  E('path', { d: 'M-14,-34 L22,-34 Q36,-34 36,-20 Q36,-6 22,-6 L-2,-6 L-14,-20 Z', fill: '#C9D3DC', stroke: SC_INK, 'stroke-width': 3 }, whistle);
  E('rect', { x: -30, y: -32, width: 18, height: 12, rx: 3, fill: '#C9D3DC', stroke: SC_INK, 'stroke-width': 3 }, whistle);
  E('path', { d: 'M0,-6 Q-6,20 6,40', fill: 'none', stroke: '#E8424F', 'stroke-width': 3 }, whistle);
  const ltEx = fcLowerThird(Lhud, 'ex');
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* ---------- shots ---------- */
  const cut = id => at(id) - 0.06;
  const SHOTS = [['A1', -9], ['B1', mid('final', 0.42)], ['A2', cut('ex')], ['B2', cut('cancel')], ['A3', cut('pun')]];
  const shotAt = t => { let s = 'A1'; for (const [k, t0] of SHOTS) if (t >= t0) s = k; return s; };
  const WX = { priya: 110, kav: 285, boy: 455, ex: 640, dad: 840, tan: 1065 }, WY = 452, WS = 0.88;
  const SL = [125, 640], SR = [1078, 646], SS = 0.72;
  const SPK = { kavya: 'kav', priya: 'priya', dad: 'dad', boy: 'boy', tan: 'tan', ex: 'ex' };
  const TEAR = at('final') + 0.55, BURST = at('ex') + 0.05;

  return t => {
    const sh = shotAt(t), who = scWho(S, t);
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const wide = sh[0] === 'A';
    op(voidShot, wide ? 1 : 0); op(vd.front, wide ? 1 : 0); op(boardShot, wide ? 0 : 1); op(board, wide ? 0 : 1);
    vd.upd(t * AMP);
    [cardLast, cardRattle, cardEx, cardPun, tweet, scrapG, confG, boxW, hornW, exHole].forEach(c => op(c, 0));
    smoke.set(0, 0, 0);
    ltEx.set(0); cFactors.set(0); stampNo.set(0);
    const shown = { kav: 0, priya: 0, dad: 0, boy: 0, tan: 0, exC: 0 };
    const show = (key, c, x, y, s, st, r) => { shown[key] = 1; c.set(Object.assign({ t }, st)); tr(c, x, y, s, r || 0); };

    /* ---------- A: the party table ---------- */
    if (wide) {
      const spKey = SPK[who] || 'tan', spk = WX[spKey];
      const A1 = sh === 'A1', A2 = sh === 'A2', A3 = sh === 'A3';
      const gasp = A2 && t > BURST + 0.3;
      const flat = A3 && t > mid('pun', 0.75);
      const md = (key, base) => (flat && key !== 'tan' ? 'deadpan' : gasp && key !== 'tan' ? (t > mid('ex', 0.75) ? 'neutral' : 'shock') : base);
      const lk = key => lookAt(WX[key], A2 ? WX.ex : spk);
      show('priya', priya, WX.priya, WY, WS, { talk: talk(t, 'priya'), mood: md('priya', 'smug'), look: lk('priya') });
      show('kav', kav, WX.kav, WY, WS, { talk: talk(t, 'kavya'), mood: md('kav', 'neutral'), look: lk('kav') });
      show('boy', boy, WX.boy, WY + 12, WS, { talk: talk(t, 'boy'), mood: md('boy', 'happy'), look: lk('boy'), lift: A1 ? 1 : 0 });
      show('dad', dad, WX.dad, WY - 6, WS, { talk: talk(t, 'dad'), mood: md('dad', 'happy'), look: lk('dad') });
      const blow = A1 && t > TEAR - 0.7 && t < TEAR + 0.2;
      show('tan', tan, WX.tan, WY - 8, WS, { talk: talk(t, 'tan'), mood: A2 ? 'happy' : 'happy', look: lk('tan'), lift: blow ? 1 : 0 });
      if (blow) { const p = P(t, TEAR - 0.7, 0.3, pop); op(tweet, clamp(p * 3)); tr(tweet, 950, 236, Math.max(0.01, 0.6 + 0.4 * p), -6); }
      // the parcel / the box
      op(boxW, 1);
      if (A1) {
        const k = 1 - P(t, TEAR, 0.35, linear);
        parcel.set(k);
        const rattle = t > TEAR + 0.4 ? Math.sin(t * 40) * 6 * AMP : 0;
        tr(boxW, WX.boy - 90, 520, 0.55, rattle);
        const u = (t - TEAR) / 1.0;
        if (u > 0 && u < 1) { op(scrapG, 1); scraps.forEach(s => { tr(s.el, WX.boy - 90 + s.vx * u, 520 - s.vy * u + 520 * u * u, 1, s.rot * u); op(s.el, 1 - u * u); }); }
        op(cardLast, fade(t, at('final') + 0.1)); tr(cardLast, 600, 632);
        if (t > TEAR + 0.4) { op(cardLast, 0); op(cardRattle, fade(t, TEAR + 0.4)); tr(cardRattle, 600, 632); }
      } else {
        parcel.set(0);
        const shake = A2 && t < BURST + 0.1 ? Math.sin(t * 50) * 8 * AMP : 0;
        tr(boxW, WX.ex, 520, 0.6, shake);
      }
      // Mister X rises from behind the box
      if (A2 || (A3 && t < end('pun') + 0.4)) {
        op(exHole, 1);
        let ey = lerp(560, 372, P(t, BURST + 0.1, 0.6, pop)), es = 0.78, er = 0;
        let exOp = 1;
        if (A3) {
          ey = 372;
          const tip = P(t, mid('pun', 0.6), 0.4, ease), van = P(t, mid('pun', 0.85), 0.35, easeIn);
          er = -12 * Math.sin(Math.PI * tip); es = 0.78 * (1 - van); exOp = 1 - van;
          smoke.set(P(t, mid('pun', 0.85), 0.7, linear), WX.ex, 380);
        }
        op(ex, exOp);
        if (es > 0.01) show('ex', ex, WX.ex, ey, es, { talk: talk(t, 'ex'), mood: 'smug', look: A3 ? 0.6 : 0 }, er);
        if (A2) {
          const u = (t - BURST) / 1.3;
          if (u > 0 && u < 1) { op(confG, 1); confs.forEach(c => { tr(c.el, WX.ex + c.vx * u, 500 - c.vy * u + 600 * u * u, 1, c.rot * u); op(c.el, 1 - u * u); }); }
          if (t > BURST) smoke.set(P(t, BURST, 0.8, linear), WX.ex, 480);
          ltEx.set(win(t, at('ex') + 0.5, at('ex') + 3.6, 0.3));
          op(cardEx, fade(t, mid('ex', 0.62))); tr(cardEx, 760, 632);
        }
      }
      if (A3) {
        op(cardPun, fade(t, mid('pun', 0.55))); tr(cardPun, 600, 632);
        const out = P(t, mid('pun', 0.78), 0.25, easeOut), droop = P(t, end('pun') + 0.1, 1.0, ease);
        op(hornW, out > 0 ? 1 : 0);
        hornW.setAttribute('transform', `translate(${WX.boy + 6} ${WY + 12 + 40 * WS}) rotate(${(-30 + 55 * droop).toFixed(1)}) scale(0.65)`);
        horn.set(out * (1 - 0.8 * droop));
      }
    }

    /* ---------- B: the whiteboard ---------- */
    if (!wide) {
      const ln = t < at('seven') ? 'final' : t < at('million') ? 'seven' : t < at('cancel') ? 'million' : t < at('harder') ? 'cancel'
        : t < at('halves') ? 'harder' : t < at('divide') ? 'halves' : t < at('plus') ? 'divide' : t < at('guard') ? 'plus' : t < at('try') ? 'guard' : 'try';
      op(b1, sh === 'B1' ? 1 : 0); op(b2, ln === 'cancel' ? 1 : 0); op(b3, ln === 'harder' || ln === 'halves' ? 1 : 0); op(b4, ln === 'divide' ? 1 : 0);
      op(b5, ln === 'plus' || ln === 'guard' || ln === 'try' ? 1 : 0);
      if (sh === 'B1') {
        op(q1, 1);
        op(anyX, ln === 'final' ? fade(t, mid('final', 0.6)) : 0);
        op(r7, ln === 'final' ? 0 : ln === 'seven' ? fade(t, at('seven') + 0.05, 0.25) : 1);
        op(rM, ln === 'million' ? fade(t, at('million') + 0.05, 0.25) : 0);
        tr(rMq, rM.x0 + rM.w + 12, 500); op(rMq, ln === 'million' ? fade(t, mid('million', 0.6), 0.2) : 0);
        if (ln === 'final') {
          show('tan', tan, SL[0], SL[1] - 4, SS, { talk: talk(t, 'tan'), mood: 'happy', look: 0.8 });
          show('boy', boy, SR[0], SR[1] + 6, SS, { talk: 0, mood: 'neutral', look: -0.8 });
        } else if (ln === 'seven') {
          show('priya', priya, SL[0], SL[1], SS, { talk: talk(t, 'priya'), mood: 'smug', look: 0.8 });
          show('tan', tan, SR[0], SR[1] - 4, SS, { talk: 0, mood: 'happy', look: -0.8 });
        } else {
          show('boy', boy, SL[0], SL[1] + 6, SS, { talk: talk(t, 'boy'), mood: 'shock', look: 0.8 });
          show('priya', priya, SR[0], SR[1], SS, { talk: 0, mood: 'shock', look: -0.8 });
        }
      }
      if (ln === 'cancel') {
        rowC.reset();
        ['a', 'b'].forEach((k, i) => rowC.cancel(k, P(t, mid('cancel', 0.12 + i * 0.08), 0.3, linear)));
        ['c', 'd'].forEach((k, i) => rowC.cancel(k, P(t, mid('cancel', 0.36 + i * 0.06), 0.3, linear)));
        const flyT = mid('cancel', 0.55);
        ['c', 'd'].forEach(k => rowC.fly(k, P(t, flyT, 0.6, linear)));
        const ta = rowC.tok.c, tb = rowC.tok.d;
        puffA.set(P(t, flyT, 0.6, linear), ta.cx, ta.y - 26); puffB.set(P(t, flyT, 0.6, linear), tb.cx, tb.y - 26);
        // the row arrives: x/3 × 6/x first, then = 6x/3x, then = 2
        op(rowC, 1);
        op(xx1, fade(t, mid('cancel', 0.62)));
        const r2 = rowC.right;
        attr(ringC, 'x', r2 - 66); attr(ringC, 'y', 300 + 0.33 * 72 - 62); attr(ringC, 'width', 64); attr(ringC, 'height', 76);
        op(ringC, fade(t, mid('cancel', 0.8)));
        show('exC', exC, SL[0] + 10, 610, 0.62, { talk: talk(t, 'ex'), mood: 'smug', look: 0.6 });
        show('tan', tan, SR[0], SR[1] - 4, SS, { talk: 0, mood: 'happy', look: -0.8 });
      }
      if (ln === 'harder' || ln === 'halves') {
        rowH.reset();
        const inH = ln === 'halves';
        const c = (k, f) => rowH.cancel(k, inH ? P(t, mid('halves', f), 0.3, linear) : 0);
        c('nx', 0.05); c('dx', 0.1); c('n2', 0.22); c('d4', 0.28); c('n9', 0.38); c('d3', 0.44);
        op(pairH, inH ? fade(t, at('halves') + 0.05) : 0);
        op(resH, inH ? fade(t, mid('halves', 0.55)) : 0);
        attr(ringH, 'x', resH.x0 + resH.w - mkMeasure('1 1/2', { size: 50 }).w - 8); attr(ringH, 'y', 320 - resH.a - 8); attr(ringH, 'width', mkMeasure('1 1/2', { size: 50 }).w + 16); attr(ringH, 'height', resH.a + resH.d + 16);
        op(ringH, inH ? fade(t, mid('halves', 0.75)) : 0);
        op(chkH, inH ? fade(t, mid('halves', 0.85)) : 0);
        if (!inH) {
          show('tan', tan, SL[0], SL[1] - 4, SS, { talk: talk(t, 'tan'), mood: 'happy', look: 0.8 });
          show('kav', kav, SR[0], SR[1], SS, { talk: 0, mood: 'neutral', look: -0.8 });
        } else {
          show('kav', kav, SL[0], SL[1], SS, { talk: talk(t, 'kavya'), mood: t > mid('halves', 0.7) ? 'smug' : 'neutral', look: 0.8 });
          show('exC', exC, SR[0] - 10, 610, 0.62, { talk: 0, mood: 'smug', look: -0.6 });
        }
      }
      if (ln === 'divide') {
        rowD.reset();
        op(q4, fade(t, at('divide') + 0.05));
        op(rowD, fade(t, mid('divide', 0.2)));
        const fl = rowD.tok.n3;
        op(flipLab, 0);
        const c = (k, f) => rowD.cancel(k, P(t, mid('divide', f), 0.3, linear));
        c('nx', 0.4); c('dx', 0.44); c('n4', 0.52); c('d2', 0.56); c('n3', 0.62); c('d9', 0.66);
        op(resD, fade(t, mid('divide', 0.76)));
        attr(ringD, 'x', resD.x0 + resD.w - mkMeasure('2/3', { size: 52 }).w - 8); attr(ringD, 'y', 424 - resD.a - 8); attr(ringD, 'width', mkMeasure('2/3', { size: 52 }).w + 16); attr(ringD, 'height', resD.a + resD.d + 16);
        op(ringD, fade(t, mid('divide', 0.88)));
        show('tan', tan, SL[0], SL[1] - 4, SS, { talk: talk(t, 'tan'), mood: 'happy', look: 0.8 });
        show('exC', exC, SR[0] - 10, 610, 0.62, { talk: 0, mood: 'smug', look: -0.6 });
      }
      if (ln === 'plus' || ln === 'guard' || ln === 'try') {
        rowP.reset();
        const inP = ln === 'plus', inG = ln === 'guard', inT = ln === 'try';
        op(b5head, inP ? 1 : 0);
        // Ah Boy's strikes; in "guard" they bounce off and retract
        const sp = inP ? P(t, mid('plus', 0.5), 0.3, linear) : inG ? 1 - P(t, at('guard') + 0.4, 0.5, easeOut) : 0;
        rowP.cancel('nx', sp); rowP.cancel('dx', sp);
        const bounce = inG ? Math.sin(Math.PI * P(t, at('guard') + 0.25, 0.5, linear)) * 10 : 0;
        rowP.setAttribute('transform', `translate(0 ${(-bounce).toFixed(1)})`);
        op(wrongP, inP ? fade(t, mid('plus', 0.62)) : inG ? 1 : 0);
        if (inG) { stampNo.set(P(t, mid('guard', 0.12), 0.35, linear)); tr(stampNo, wrongP.x0 + wrongP.w / 2, 300, 0.42); }
        const bx = inG ? fade(t, mid('guard', 0.3)) : inT ? 1 : 0;
        op(boxTop, bx); op(boxBot, bx); op(stuck, inG ? fade(t, mid('guard', 0.2)) : 0);
        op(factorT, inG ? fade(t, mid('guard', 0.5)) : 0);
        op(tryM, inT ? fade(t, at('try') + 0.1) : 0);
        if (inT) popSet(cFactors, t, mid('try', 0.6), 650, 616);
        if (inP) {
          show('boy', boy, SL[0], SL[1] + 6, SS, { talk: talk(t, 'boy'), mood: 'happy', look: 0.8 });
          show('exC', exC, SR[0] - 10, 610, 0.62, { talk: 0, mood: t > mid('plus', 0.6) ? 'annoyed' : 'smug', look: -0.6 });
        } else if (inG) {
          show('exC', exC, SL[0] + 10, 610, 0.62, { talk: talk(t, 'ex'), mood: 'smug', look: 0.6, guard: 1 });
          show('boy', boy, SR[0], SR[1] + 6, SS, { talk: 0, mood: t > mid('guard', 0.3) ? 'shock' : 'neutral', look: -0.8 });
        } else {
          show('kav', kav, SL[0], SL[1], SS, { talk: talk(t, 'kavya'), mood: t > mid('try', 0.7) ? 'smug' : 'neutral', look: 0.8 });
          show('boy', boy, SR[0], SR[1] + 6, SS, { talk: 0, mood: t > mid('try', 0.6) ? 'sad' : 'neutral', look: -0.8 });
        }
      }
    }

    op(kav, shown.kav); op(priya, shown.priya); op(dad, shown.dad); op(boy, shown.boy); op(tan, shown.tan); op(exC, shown.exC);
    op(whistle, wide ? 1 : 0);
  };
});
