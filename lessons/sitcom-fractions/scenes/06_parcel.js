/* Scene 6: Pass the parcel (calculating with fractions: distributive law, order of operations, commutative law,
   powers, estimating).
   Shots (hard sitcom cuts):
   A  5 p.m., the party table: Mr Tan's five-layer parcel hops from hand to hand; TWEET! the music stops at Priya,
      she tears layer one (scraps fly).
   B  Mr Tan's whiteboard (cast in the corners): 7/9 × 13 + 7/9 × 5, a 10-second timer -> distributive law:
      7/9 × (13 + 5) = 7/9 × 18 = 14; a 13-wide and a 5-wide strip of height 7/9 slide together into one 18 wide.
   A  TWEET! Dad tears layer two: 1/2 + 1/3 × 3/4.
   B  Dad, left to right: (1/2 + 1/3) × 3/4 = 5/6 × 3/4 = 5/8 (famous last words #4) -> Vinny: NOT ON MY BAR! ->
      order of operations: B, I, ÷ ×, + −: 1/3 × 3/4 = 1/4, 1/2 + 1/4 = 3/4; Dad's sum gets its brackets.
   A  TWEET! Ah Boy tears layer three: 3/7 × 15 × 7/3.
   B  commutative law: 15 and 7/3 swap places, (3/7 × 7/3) × 15 = 1 × 15 = 15 -> Kavya: (2/3)² = 2/3 × 2/3 = 4/9
      -> estimate: 2 7/8 × 3 9/10 ≈ 3 × 4 = 12, both rounded up so a bit less (exact 11 17/80).
   A  Mr Tan's pun: fraction <- Latin frangere, to break; an ice cube cracks; deadpan faces; Ah Boy's blower unrolls
      and droops. Ah Boy holds up the last, smallest layer: a prize? Hold. */
scene('parcel', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;
  const talk = (t, who) => scTalk(S, t, who);

  /* ---------- local helpers ---------- */
  const GOLD = '#FFE45C', PINK = '#FF8FC8', RED = '#C62828', GREEN = '#1E9E5A', BLUE = '#2E6FD8', INK = MK.ink, BERRY = '#B8336A';
  const chipAt = (parent, text, o) => { o = o || {}; return mkChip(parent, text, Object.assign({ size: 30, col: C.ink }, o)); };
  const popSet = (el, t, t0, x, y) => { el.set(P(t, t0, 0.35, linear)); if (x !== undefined) tr(el, x, y); };
  const fade = (t, t0, d) => P(t, t0, d || 0.3, linear);
  const lookAt = (x, sx) => clamp((sx - x) / 260, -1, 1);
  const outline = (el, col, w) => { el.setAttribute('stroke', col); el.setAttribute('stroke-width', w); el.setAttribute('paint-order', 'stroke'); el.setAttribute('stroke-linejoin', 'round'); return el; };
  // a dark card with typeset maths, centred
  const card = (parent, text, o) => {
    o = o || {};
    const g = G(parent), m = mkText(g, 0, 0, text, { size: o.size || 34, anchor: 'middle', fill: C.ink, boldFill: o.bold || GOLD });
    const w = m.w + 60, h = Math.max(64, m.h + 26);
    const r = E('rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: Math.min(28, h / 2), fill: 'rgba(10,27,39,0.92)', stroke: o.col || GOLD, 'stroke-width': 3 }, g);
    g.insertBefore(r, m); tr(m, 0, -m.top - m.h / 2);
    return g;
  };
  // maths pieces laid left to right on one baseline, centred on x; returns the pieces (op them one by one)
  function seq(parent, x, y, parts, o) {
    const s = o.size || 50, gap = s * 0.3;
    const ws = parts.map(([src]) => mkMeasure(src, { size: s }).w);
    let cx = x - (ws.reduce((a, b) => a + b, 0) + gap * (parts.length - 1)) / 2;
    return parts.map(([src, col], i) => { const m = mkMath(parent, cx, y, src, { size: s, fill: col || INK, anchor: 'start' }); m.cx = cx; cx += ws[i] + gap; return m; });
  }
  const ringAround = (parent, m, y, pad) => { pad = pad || 8; const r = E('rect', { x: m.cx - pad, y: y - m.a - pad, width: m.w + 2 * pad, height: m.a + m.d + 2 * pad, rx: 10, fill: 'none', stroke: GREEN, 'stroke-width': 5 }, parent); op(r, 0); return r; };

  /* ---------- layers ---------- */
  const Lbg = G(root), Lins = G(root), Lcast = G(root), Lfront = G(root), Ltop = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= A: the party table ================= */
  const voidShot = G(Lbg);
  const vd = fcVoid(voidShot);
  Lfront.appendChild(vd.front);
  const parcelW = G(Ltop), parcel = fcParcel(parcelW, { layers: 5 });
  const LCOL = ['#FF5FA2', '#4CC9F0', '#FFC247', '#56D69B', '#B48CFF'];   // layer k colour = LCOL[k - 1]
  const scrapG = G(Ltop), scraps = [];
  { const r = rng(17); for (let i = 0; i < 9; i++) { const sz = 14 + r() * 16; scraps.push({ el: E('path', { d: `M${-sz},${-sz * 0.6} L${sz},${-sz * 0.3} L${sz * 0.5},${sz * 0.7} L${-sz * 0.8},${sz * 0.4} Z`, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 2.5 }, scrapG), vx: (r() - 0.5) * 520, vy: 260 + r() * 260, rot: (r() - 0.5) * 720 }); } }
  const notes = [0, 1, 2, 3].map(i => outline(T(Lfg, 0, 0, i % 2 ? '♫' : '♪', { size: 44, weight: 700, anchor: 'middle', fill: '#8E5BD8' }), '#FFFFFF', 5));
  const tweet = G(Lfg);
  { E('path', { d: 'M-96,-30 L-60,-46 L-40,-70 L-8,-48 L30,-66 L46,-40 L92,-42 L72,-8 L100,20 L56,26 L44,58 L8,36 L-30,60 L-44,28 L-92,24 L-72,-2 Z', fill: GOLD, stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, tweet);
    T(tweet, 0, 12, 'TWEET!', { size: 32, weight: 800, anchor: 'middle', fill: RED }); }
  const c5pm = chipAt(Lfg, '**5 p.m.**', { col: GOLD, size: 32 });
  const cEvery = chipAt(Lfg, 'under **every** layer: a **calculation**', { col: GOLD, size: 30 });
  const cWrap = chipAt(Lfg, 'wrapped by **Mr Tan**', { col: '#9FD8FF', size: 30 });
  const card1 = card(Lfg, '**Layer 1:** {{7/9 × 13 + 7/9 × 5}}', { size: 34 });
  const card2 = card(Lfg, '**Layer 2:** {{1/2 + 1/3 × 3/4}}', { size: 36 });
  const card3 = card(Lfg, '**Layer 3:** {{3/7 × 15 × 7/3}}', { size: 36 });
  const punCard = G(Lfg);
  { E('rect', { x: -300, y: -58, width: 600, height: 116, rx: 22, fill: 'rgba(10,27,39,0.92)', stroke: '#9FD8FF', 'stroke-width': 3 }, punCard);
    mkText(punCard, -110, -8, 'fraction ← Latin **frangere**', { size: 32, anchor: 'middle', fill: C.ink, boldFill: '#9FD8FF' });
    mkText(punCard, -110, 36, '= to **break**', { size: 32, anchor: 'middle', fill: C.ink, boldFill: GOLD }); }
  // the ice cube that breaks
  const ice = G(punCard); tr(ice, 205, 0);
  const iceL = G(ice), iceR = G(ice);
  E('path', { d: 'M-44,-40 L4,-40 L-8,-6 L6,14 L-4,40 L-44,40 Z', fill: '#CDEFFF', stroke: '#4A9CC8', 'stroke-width': 4, 'stroke-linejoin': 'round' }, iceL);
  E('path', { d: 'M4,-40 L44,-40 L44,40 L-4,40 L6,14 L-8,-6 Z', fill: '#CDEFFF', stroke: '#4A9CC8', 'stroke-width': 4, 'stroke-linejoin': 'round' }, iceR);
  E('path', { d: 'M-34,-28 L-24,-28 M24,-26 L34,-26', stroke: '#FFFFFF', 'stroke-width': 5, 'stroke-linecap': 'round' }, ice);
  const cPrize = chipAt(Lfg, 'a **prize**?', { col: GOLD, size: 32 });
  const hornW = G(Lfg), horn = fcHorn(hornW);

  /* ================= B: Mr Tan's whiteboard ================= */
  const boardShot = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#E9E6DA' }, boardShot);
  E('rect', { x: 0, y: 590, width: 1200, height: 70, fill: '#2E9C8C' }, boardShot);
  E('rect', { x: 0, y: 660, width: 1200, height: 90, fill: '#B8B8AE' }, boardShot);
  { let d = ''; for (const x of [70, 1130]) d += `M${x - 40},0 L${x - 40},590 M${x + 40},0 L${x + 40},590 `; E('path', { d, stroke: '#CFCBBD', 'stroke-width': 4 }, boardShot); }
  const board = G(Lins);
  const wb = mkWhiteboard(board, 940, 420); tr(wb, 700, 330);
  const tag = n => { const g = G(board); E('rect', { x: 252, y: 140, width: 130, height: 44, rx: 12, fill: BERRY }, g); T(g, 317, 172, 'LAYER ' + n, { size: 26, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 1 }); return g; };

  // B1: layer 1 and the distributive law
  const b1 = G(board);
  const tag1 = tag(1); b1.appendChild(tag1);
  const q1 = mkMath(b1, 700, 262, '7/9 × 13 + 7/9 × 5', { size: 60, anchor: 'middle', fill: INK });
  const timer = G(b1); tr(timer, 1100, 180);
  E('circle', { r: 40, fill: '#FFFFFF', stroke: '#C9D3DC', 'stroke-width': 8 }, timer);
  const tArc = E('circle', { r: 40, fill: 'none', stroke: RED, 'stroke-width': 8, pathLength: 1, 'stroke-dasharray': '1 1', transform: 'rotate(-90)' }, timer);
  const tNum = T(timer, 0, 14, '10', { size: 38, weight: 800, anchor: 'middle', fill: RED });
  const distHead = mkText(b1, 700, 174, '**Distributive** law', { size: 36, anchor: 'middle', fill: INK, boldFill: BLUE });
  const d1 = seq(b1, 700, 378, [['= 7/9 × (13 + 5)'], ['= 7/9 × 18'], ['= 14', GREEN]], { size: 50 });
  const dRing = ringAround(b1, d1[2], 378);
  // the two strips of height 7/9
  const STRIP = G(b1), SU = 22, SY = 420, SH = 62, SX = 470;
  const stA = E('rect', { x: SX, y: SY, width: 13 * SU, height: SH, rx: 4, fill: '#9FD8FF', stroke: INK, 'stroke-width': 3 }, STRIP);
  const stB = E('rect', { x: 0, y: SY, width: 5 * SU, height: SH, rx: 4, fill: '#FFC247', stroke: INK, 'stroke-width': 3 }, STRIP);
  const sh79 = mkMath(STRIP, SX - 16, SY + SH / 2 + 14, '7/9', { size: 34, anchor: 'end', fill: INK });
  const l13 = mkText(STRIP, SX + 13 * SU / 2, SY + SH + 34, '13', { size: 30, anchor: 'middle', fill: INK });
  const l5 = mkText(STRIP, 0, SY + SH + 34, '5', { size: 30, anchor: 'middle', fill: INK });
  const l18 = mkText(STRIP, SX + 9 * SU, SY + SH + 34, '**18**', { size: 30, anchor: 'middle', fill: GREEN });

  // B2: layer 2, Dad left to right, order of operations
  const b2 = G(board);
  b2.appendChild(tag(2));
  const q2 = mkMath(b2, 700, 244, '1/2 + 1/3 × 3/4', { size: 56, anchor: 'middle', fill: INK });
  const dadLine = mkMath(b2, 700, 390, '(1/2 + 1/3) × 3/4 = 5/6 × 3/4 = 5/8', { size: 48, anchor: 'middle', fill: RED });
  const dadLab = mkText(b2, 700, 474, "Dad: **left to right**", { size: 32, anchor: 'middle', fill: RED });
  const stamp = fcStamp(b2, false);
  const order = G(b2);
  mkText(order, 280, 316, '**B**rackets', { size: 30, fill: INK, boldFill: BLUE });
  mkText(order, 280, 356, '**I**ndices', { size: 30, fill: INK, boldFill: BLUE });
  const ordMD = mkText(order, 280, 396, '**÷ ×**  first', { size: 30, fill: INK, boldFill: BLUE });
  mkText(order, 280, 436, '**+ −**  last', { size: 30, fill: INK, boldFill: BLUE });
  const ordHl = E('rect', { x: 266, y: 368, width: 170, height: 40, rx: 8, fill: 'rgba(255,228,92,0.55)' }, order);
  order.insertBefore(ordHl, order.firstChild);
  const wB = mkWorking(b2, 840, 290, ['1/3 × 3/4 = 1/4', '1/2 + 1/4 = 3/4'], { size: 46, fill: INK, gap: 18 });
  const dadSmall = mkMath(b2, 272, 506, '(1/2 + 1/3) × 3/4 = 5/8', { size: 30, anchor: 'start', fill: RED });
  const brkRing = E('rect', { x: 0, y: 0, width: 1, height: 1, rx: 10, fill: 'none', stroke: '#E07A1A', 'stroke-width': 4 }, b2);
  const brkLab = mkText(b2, 0, 0, '**brackets**!', { size: 26, anchor: 'start', fill: '#E07A1A' });
  const cFlw = chipAt(Lfg, 'famous last words **#4**', { col: '#FF8A8A', size: 30 });

  // B3: layer 3 (commutative), power, estimate
  const b3 = G(board);
  const tag3 = tag(3); b3.appendChild(tag3);
  const commHead = mkText(b3, 700, 174, '**Commutative** law: swap the order', { size: 34, anchor: 'middle', fill: INK, boldFill: BLUE });
  const tiles = [['3/7', 470], ['×', 570], ['15', 660], ['×', 760], ['7/3', 860]].map(([src, x]) => { const g = G(b3), m = mkMath(g, 0, 0, src, { size: 64, anchor: 'middle', fill: src === '15' ? BLUE : INK }); tr(m, 0, (m.a - m.d) / 2 - 4); g.x = x; return g; });
  const brL = T(b3, 0, 0, '(', { size: 90, weight: 500, anchor: 'middle', fill: GREEN }), brR = T(b3, 0, 0, ')', { size: 90, weight: 500, anchor: 'middle', fill: GREEN });
  const cOne = mkMath(b3, 650, 400, '3/7 × 7/3 = 1', { size: 40, anchor: 'middle', fill: GREEN });
  const cRes = mkMath(b3, 700, 500, '= 1 × 15 = 15', { size: 54, anchor: 'middle', fill: INK });
  const cResRing = E('rect', { x: 0, y: 0, width: 1, height: 1, rx: 10, fill: 'none', stroke: GREEN, 'stroke-width': 5 }, b3);
  const powG = G(b3);
  mkText(powG, 700, 186, 'Square the top **and** the bottom', { size: 36, anchor: 'middle', fill: INK, boldFill: BERRY });
  const pw = seq(powG, 700, 340, [['(2/3)^2'], ['= 2/3 × 2/3'], ['= 4/9', GREEN]], { size: 66 });
  const pwNote = mkText(powG, 700, 480, 'top: {{2 × 2 = 4}}     bottom: {{3 × 3 = 9}}', { size: 32, anchor: 'middle', fill: '#5A4A52' });
  const estG = G(b3);
  mkText(estG, 700, 186, 'Always **estimate**', { size: 38, anchor: 'middle', fill: INK, boldFill: BERRY });
  const es = seq(estG, 700, 300, [['2 7/8 × 3 9/10'], ['≈ 3 × 4'], ['= 12', BLUE]], { size: 58 });
  const upA = mkText(estG, es[0].cx + mkMeasure('2 7/8', { size: 58 }).w / 2, 392, '↑ **3**', { size: 30, anchor: 'middle', fill: '#E07A1A' });
  const upB = mkText(estG, es[0].cx + es[0].w - mkMeasure('3 9/10', { size: 58 }).w / 2, 392, '↑ **4**', { size: 30, anchor: 'middle', fill: '#E07A1A' });
  const estLess = mkText(estG, 700, 452, 'both rounded **up**, so the answer is a bit **less** than 12', { size: 32, anchor: 'middle', fill: INK, boldFill: '#E07A1A' });
  const estExact = mkText(estG, 700, 518, '(exact: {{11 17/80}})', { size: 28, anchor: 'middle', fill: '#5A4A52' });

  /* ================= the cast ================= */
  const kav = cast(Lcast, 'kavya');
  const priya = cast(Lcast, 'priya', { hat: '#B48CFF', hand: true });
  const boy = cast(Lcast, 'boy', { hat: '#4CC9F0' });
  const dad = cast(Lcast, 'dad', { hat: '#56D69B', prop: null, hand: true });
  const mum = cast(Lcast, 'mum', { hat: '#FF5FA2', hand: true });
  const tan = cast(Lcast, 'tan', { hat: '#FFC247', hand: true });
  const vin = cast(Lcast, 'vinny');
  const kavHat = fcHat(kav.firstChild, '#FFE45C'); tr(kavHat, 14, -116, 0.9, 12);
  // Mr Tan's whistle
  const whistle = G(tan.hand); tr(whistle, 0, -6, 1, -20);
  E('path', { d: 'M-14,-34 L22,-34 Q36,-34 36,-20 Q36,-6 22,-6 L-2,-6 L-14,-20 Z', fill: '#C9D3DC', stroke: SC_INK, 'stroke-width': 3 }, whistle);
  E('rect', { x: -30, y: -32, width: 18, height: 12, rx: 3, fill: '#C9D3DC', stroke: SC_INK, 'stroke-width': 3 }, whistle);
  E('path', { d: 'M0,-6 Q-6,20 6,40', fill: 'none', stroke: '#E8424F', 'stroke-width': 3 }, whistle);
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* ---------- shots and the parcel's journey ---------- */
  const cut = id => at(id) - 0.06;
  const SHOTS = [['A1', -9], ['B1', mid('layer1', 0.32)], ['A2', cut('layer2')], ['B2', cut('left')], ['A3', cut('layer3')], ['B3', mid('layer3', 0.3)], ['A4', cut('pun')]];
  const shotAt = t => { let s = 'A1'; for (const [k, t0] of SHOTS) if (t >= t0) s = k; return s; };
  const WX = { priya: 120, kav: 305, boy: 495, dad: 690, mum: 880, tan: 1075 }, WY = 452, WS = 0.88;
  const SL = [125, 640], SR = [1078, 646], SS = 0.72;
  const SPK = { kavya: 'kav', priya: 'priya', mum: 'mum', dad: 'dad', boy: 'boy', tan: 'tan' };
  const RING = ['priya', 'kav', 'boy', 'dad', 'mum', 'dad', 'boy', 'kav', 'priya'];
  const P0 = at('five') + 0.6, P1 = at('layer1') - 0.25, HOP = (P1 - P0) / (RING.length - 1);
  const TEAR = [[at('layer1') + 0.3, 5, 'priya'], [at('layer2') + 0.35, 4, 'dad'], [at('layer3') + 0.35, 3, 'boy']];
  const parcelState = t => {
    // -> { x, y, k (layers on), holder }
    if (t < P1) {
      const u = clamp((t - P0) / HOP, 0, RING.length - 1), i = Math.min(RING.length - 2, Math.floor(u)), f = ease(clamp((u - i) / 0.55));
      const a = WX[RING[i]], b = WX[RING[i + 1]];
      return { x: lerp(a, b, f), y: 520 - 70 * Math.sin(Math.PI * f), k: 5, holder: f < 0.5 ? RING[i] : RING[i + 1], moving: f > 0 && f < 1 };
    }
    let k = 5, holder = 'priya';
    for (const [T0, k0, h] of TEAR) if (t >= T0 - 0.6) { holder = h; k = k0 - P(t, T0, 0.35, linear); }
    if (t >= at('power')) { k = 1; holder = 'boy'; }
    return { x: WX[holder] + (holder === 'boy' ? -90 : 0), y: 520, k, holder, moving: false };
  };

  return t => {
    const sh = shotAt(t), who = scWho(S, t);
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const wide = sh[0] === 'A';
    op(voidShot, wide ? 1 : 0); op(vd.front, wide ? 1 : 0); op(boardShot, wide ? 0 : 1); op(board, wide ? 0 : 1);
    vd.upd(t * AMP);
    [c5pm, cEvery, cWrap, cFlw, cPrize].forEach(c => c.set(0));
    [card1, card2, card3, punCard, tweet, scrapG, parcelW, hornW].forEach(c => op(c, 0));
    notes.forEach(n => op(n, 0));
    stamp.set(0);
    const shown = { kav: 0, priya: 0, mum: 0, dad: 0, boy: 0, tan: 0, vin: 0 };
    const show = (key, c, x, y, s, st) => { shown[key] = 1; c.set(Object.assign({ t }, st)); tr(c, x, y, s); };

    /* ---------- A: the party table ---------- */
    if (wide) {
      const ps = parcelState(t), spKey = SPK[who] || 'tan', spk = WX[spKey];
      const pun = sh === 'A4', inPrize = t >= at('prize');
      const punFlat = pun && t > mid('pun', 0.72);
      const watch = ps.x;   // everyone watches the parcel during the game
      const mood = (key, base) => (punFlat && key !== 'tan' ? 'deadpan' : base);
      const lk = (key) => (sh === 'A1' && t < P1 ? lookAt(WX[key], watch) : lookAt(WX[key], inPrize ? WX.boy : spk));
      const holds = key => ps.holder === key && !ps.moving && sh !== 'A4';
      show('priya', priya, WX.priya, WY, WS, { talk: talk(t, 'priya'), mood: mood('priya', sh === 'A1' && t > TEAR[0][0] ? 'happy' : 'smug'), look: lk('priya'), lift: holds('priya') ? 1 : 0 });
      show('kav', kav, WX.kav, WY, WS, { talk: talk(t, 'kavya'), mood: mood('kav', 'happy'), look: lk('kav') });
      show('boy', boy, WX.boy, WY + 12, WS, { talk: talk(t, 'boy'), mood: mood('boy', inPrize ? 'happy' : sh === 'A3' ? 'smug' : 'happy'), look: inPrize ? 0 : lk('boy'), lift: holds('boy') || inPrize ? 1 : 0 });
      show('dad', dad, WX.dad, WY - 6, WS, { talk: talk(t, 'dad'), mood: mood('dad', sh === 'A2' ? 'smug' : 'happy'), look: lk('dad'), lift: holds('dad') ? 1 : 0 });
      show('mum', mum, WX.mum, WY - 6, WS, { talk: talk(t, 'mum'), mood: mood('mum', 'happy'), look: lk('mum') });
      const blow = TEAR.some(([T0]) => t > T0 - 0.65 && t < T0 + 0.25);
      show('tan', tan, WX.tan, WY - 8, WS, { talk: talk(t, 'tan'), mood: pun ? 'happy' : 'happy', look: lookAt(WX.tan, watch), lift: blow || (sh === 'A1' && t < P1) ? 1 : 0 });
      if (blow) { const T0 = TEAR.find(([T0]) => t > T0 - 0.65 && t < T0 + 0.25)[0]; const p = P(t, T0 - 0.65, 0.3, pop); op(tweet, clamp(p * 3)); tr(tweet, 960, 236, Math.max(0.01, 0.6 + 0.4 * p), -6); }
      // the parcel
      op(parcelW, 1);
      let px = ps.x, py = ps.y, psz = 0.42;
      if (inPrize) { px = WX.boy - 90; py = 520 - 20 * P(t, at('prize'), 0.3, pop); psz = 0.6; }
      else if (pun) { px = WX.boy - 90; py = 532; psz = 0.5; }
      tr(parcelW, px, py, psz, ps.moving ? 12 * Math.sin(t * 9) : 0);
      parcel.set(pun ? 1 : ps.k);
      // scraps from the latest tear
      for (const [T0, k0] of TEAR) {
        const u = (t - T0) / 1.0;
        if (u > 0 && u < 1) {
          op(scrapG, 1);
          scraps.forEach(s => { attr(s.el, 'fill', LCOL[k0 - 1]); tr(s.el, px + s.vx * u, py - s.vy * u + 520 * u * u, 1, s.rot * u); op(s.el, 1 - u * u); });
        }
      }
      if (sh === 'A1' && t < P1) notes.forEach((n, i) => { const u = ((t * 0.6 + i * 0.25) % 1); op(n, Math.sin(Math.PI * u)); tr(n, 260 + i * 220 + 20 * Math.sin(t * 2 + i), 300 - 90 * u); });
      if (sh === 'A1') {
        if (t < at('layer1')) {
          popSet(c5pm, t, at('five') + 0.1, 600, 228);
          popSet(cEvery, t, mid('five', 0.35), 600, 632);
          if (t > mid('five', 0.72)) { cEvery.set(0); popSet(cWrap, t, mid('five', 0.72), 600, 632); }
        } else { op(card1, fade(t, TEAR[0][0] + 0.2)); tr(card1, 600, 632); }
      }
      if (sh === 'A2') { op(card2, fade(t, TEAR[1][0] + 0.2)); tr(card2, 600, 632); }
      if (sh === 'A3') { op(card3, fade(t, TEAR[2][0] + 0.2)); tr(card3, 600, 632); }
      if (pun) {
        const p = P(t, mid('pun', 0.1), 0.35, pop);
        op(punCard, clamp(p * 3)); tr(punCard, 600, 632, Math.max(0.01, 0.8 + 0.2 * p));
        const br = P(t, mid('pun', 0.62), 0.35, easeOut);
        tr(iceL, -16 * br, 6 * br, 1, -14 * br); tr(iceR, 16 * br, 6 * br, 1, 14 * br);
        // the blower: out on the punchline, then slowly droops through the silence
        const out = P(t, mid('pun', 0.72), 0.25, easeOut), droop = P(t, end('pun') + 0.1, 1.0, ease);
        if (!inPrize) { op(hornW, 1); hornW.setAttribute('transform', `translate(${WX.boy + 6} ${WY + 12 + 40 * WS}) rotate(${(-30 + 55 * droop).toFixed(1)}) scale(0.65)`); horn.set(out * (1 - 0.8 * droop)); }
        if (inPrize) popSet(cPrize, t, at('prize') + 0.1, 495, 228);
      }
    }

    /* ---------- B: the whiteboard ---------- */
    if (!wide) {
      op(b1, sh === 'B1' ? 1 : 0); op(b2, sh === 'B2' ? 1 : 0); op(b3, sh === 'B3' ? 1 : 0);
      if (sh === 'B1') {
        const inD = t >= at('dist');
        op(tag1, inD ? 0 : 1); op(distHead, inD ? fade(t, at('dist') + 0.05) : 0);
        tr(q1, 0, 0);
        // the 10-second timer
        const T0 = mid('layer1', 0.82), stop = mid('dist', 0.78), tt = clamp(Math.min(t, stop) - T0, 0, 10);
        op(timer, t > T0 - 0.3 ? 1 : 0);
        setText(tNum, String(Math.ceil(10 - tt - 1e-6)));
        attr(tArc, 'stroke-dashoffset', (tt / 10).toFixed(3));
        d1.forEach((m, i) => op(m, inD ? fade(t, mid('dist', [0.08, 0.45, 0.72][i])) : 0));
        op(dRing, inD ? fade(t, mid('dist', 0.82)) : 0);
        // strips: apart, then slide together
        const sl = P(t, mid('dist', 0.35), 0.6, ease);
        op(STRIP, inD ? fade(t, at('dist') + 0.15) : 0);
        attr(stB, 'x', lerp(SX + 13 * SU + 70, SX + 13 * SU, sl)); tr(l5, lerp(SX + 13 * SU + 70, SX + 13 * SU, sl) + 5 * SU / 2, 0);
        op(l13, 1 - sl); op(l5, 1 - sl); op(l18, sl);
        show('tan', tan, SL[0], SL[1] - 4, SS, { talk: talk(t, 'tan'), mood: inD && t > mid('dist', 0.8) ? 'smug' : 'happy', look: 0.8 });
        show('priya', priya, SR[0], SR[1], SS, { talk: 0, mood: inD ? (t > mid('dist', 0.8) ? 'shock' : 'neutral') : 'shock', look: -0.8, sweat: inD ? 0 : 1 });
      }
      if (sh === 'B2') {
        const L = t < at('nobar') ? 'left' : t < at('bidmas') ? 'nobar' : 'bidmas';
        const inB = L === 'bidmas';
        op(q2, 1);
        op(dadLine, inB ? 0 : L === 'nobar' ? 0.3 : fade(t, mid('left', 0.18)));
        op(dadLab, inB ? 0 : fade(t, mid('left', 0.18)));
        if (L === 'left') popSet(cFlw, t, mid('left', 0.6), 650, 616);
        if (L === 'nobar') { stamp.set(P(t, at('nobar') + 0.05, 0.35, linear)); tr(stamp, 700, 390, 0.6); }
        op(order, inB ? fade(t, at('bidmas') + 0.1) : 0); op(ordHl, inB ? fade(t, mid('bidmas', 0.1)) : 0);
        wB.show(0, inB ? fade(t, mid('bidmas', 0.22)) : 0); wB.show(1, inB ? fade(t, mid('bidmas', 0.45)) : 0);
        wB.ring(1, inB ? fade(t, mid('bidmas', 0.55)) : 0);
        op(dadSmall, inB ? fade(t, mid('bidmas', 0.68)) : 0);
        attr(brkRing, 'x', dadSmall.x0 - 6); attr(brkRing, 'y', 506 - dadSmall.a - 6); attr(brkRing, 'width', mkMeasure('(1/2 + 1/3)', { size: 32 }).w + 12); attr(brkRing, 'height', dadSmall.a + dadSmall.d + 12);
        op(brkRing, inB ? fade(t, mid('bidmas', 0.8)) : 0);
        op(brkLab, 0);
        if (L === 'left') {
          show('dad', dad, SL[0], SL[1] - 4, SS, { talk: talk(t, 'dad'), mood: 'smug', look: 0.8 });
          show('kav', kav, SR[0], SR[1], SS, { talk: 0, mood: t > mid('left', 0.5) ? 'deadpan' : 'neutral', look: -0.8 });
        } else if (L === 'nobar') {
          show('vin', vin, SL[0] + 20, 606, 0.62, { talk: talk(t, 'vinny'), mood: 'annoyed', look: 0.6, stop: 1 });
          show('dad', dad, SR[0], SR[1] - 4, SS, { talk: 0, mood: 'shock', look: -0.8 });
        } else {
          show('tan', tan, SL[0], SL[1] - 4, SS, { talk: talk(t, 'tan'), mood: 'happy', look: 0.8 });
          show('dad', dad, SR[0], SR[1] - 4, SS, { talk: 0, mood: 'sad', look: -0.8 });
        }
      }
      if (sh === 'B3') {
        const L = t < at('power') ? 'layer3' : t < at('est') ? 'power' : 'est';
        const in3 = L === 'layer3';
        op(tag3, in3 ? 1 : 0); op(commHead, in3 ? 1 : 0);
        const sw = P(t, mid('layer3', 0.5), 0.7, ease);
        tiles.forEach((g, i) => {
          op(g, in3 ? 1 : 0);
          let x = g.x, y = 300;
          if (i === 2) { x = lerp(660, 860, sw); y = 300 - 95 * Math.sin(Math.PI * sw); }
          if (i === 4) { x = lerp(860, 660, sw); y = 300 + 95 * Math.sin(Math.PI * sw); }
          tr(g, x, y);
        });
        const bp = in3 ? fade(t, mid('layer3', 0.68)) : 0;
        op(brL, bp); op(brR, bp); tr(brL, 420, 326); tr(brR, 710, 326);
        op(cOne, in3 ? fade(t, mid('layer3', 0.7)) : 0); tr(cOne, 0, 0);
        op(cRes, in3 ? fade(t, mid('layer3', 0.85)) : 0);
        { const w15 = mkMeasure('15', { size: 54 }).w; attr(cResRing, 'x', cRes.x0 + cRes.w - w15 - 4); attr(cResRing, 'width', w15 + 10); } attr(cResRing, 'y', 500 - cRes.a - 8); attr(cResRing, 'height', cRes.a + cRes.d + 16);
        op(cResRing, in3 ? fade(t, mid('layer3', 0.92)) : 0);
        op(powG, L === 'power' ? 1 : 0);
        if (L === 'power') { pw.forEach((m, i) => op(m, fade(t, mid('power', [0.02, 0.3, 0.5][i])))); op(pwNote, fade(t, mid('power', 0.62))); }
        op(estG, L === 'est' ? 1 : 0);
        if (L === 'est') {
          es.forEach((m, i) => op(m, fade(t, mid('est', [0.02, 0.3, 0.45][i]))));
          op(upA, fade(t, mid('est', 0.3))); op(upB, fade(t, mid('est', 0.34)));
          op(estLess, fade(t, mid('est', 0.62))); op(estExact, fade(t, mid('est', 0.85)));
        }
        if (L === 'layer3') {
          show('tan', tan, SL[0], SL[1] - 4, SS, { talk: talk(t, 'tan'), mood: 'happy', look: 0.8 });
          show('boy', boy, SR[0], SR[1] + 6, SS, { talk: 0, mood: t > mid('layer3', 0.85) ? 'happy' : 'neutral', look: -0.8 });
        } else if (L === 'power') {
          show('kav', kav, SL[0], SL[1], SS, { talk: talk(t, 'kavya'), mood: 'smug', look: 0.8 });
          show('tan', tan, SR[0], SR[1] - 4, SS, { talk: 0, mood: 'happy', look: -0.8 });
        } else {
          show('tan', tan, SL[0], SL[1] - 4, SS, { talk: talk(t, 'tan'), mood: 'happy', look: 0.8 });
          show('kav', kav, SR[0], SR[1], SS, { talk: 0, mood: 'neutral', look: -0.8 });
        }
      }
    }

    op(kav, shown.kav); op(priya, shown.priya); op(mum, shown.mum); op(dad, shown.dad); op(boy, shown.boy); op(tan, shown.tan); op(vin, shown.vin);
    op(whistle, shown.tan && wide ? 1 : 0);
  };
});
