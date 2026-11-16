/* Scene 8: Game Night saves you some marks.
   Shots: "6 EXAM TRAPS" over the dimmed, rainy living room, the six of them lined up with numbers -> six snappy
   confessionals, one trap card each (Priya: a fraction, decimal or percentage, never 3 : 10; Dad: a probability
   bigger than 1 flies off the scale; Penny: HH, HT, TH, TT; Mum: a child is chosen, 34/40 not 34/80; Venna: this or
   that, 8 + 10 + 5 not 18 + 15; Dr Freq: pool 74/200 = 0.37, never average) -> logo "WHAT ARE THE CHANCES? will
   return" -> stinger: Sunday 6 a.m., sunshine, the pail overflowing; Mum in her dressing gown; Ah Boy, eyes baggy,
   still rolling, horse 1 still at the start; Dad sits beside him with his TOTO ticket; Cubert: "Total of one.
   Probability... zero." and tips over backwards; one last flash from a clear sky. */
scene('traps', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;
  const talk = (t, who) => scTalk(S, t, who);

  /* ---------- helpers ---------- */
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const outline = (el, col, w) => { el.setAttribute('stroke', col); el.setAttribute('stroke-width', w); el.setAttribute('paint-order', 'stroke'); el.setAttribute('stroke-linejoin', 'round'); return el; };
  const GOLD = '#FFE45C', INK = MK.ink, GREEN = '#1E9E5A', RED = '#C62828', BLUE = '#2E7DD8', PINKD = '#C2185B';
  const CX = 880;
  function trCard(parent, n, y0, h) {
    const g = G(parent); y0 = y0 || 130; h = h || 470;
    E('rect', { x: 606, y: y0 + 6, width: 560, height: h, rx: 18, fill: 'rgba(0,0,0,0.3)' }, g);
    E('rect', { x: 600, y: y0, width: 560, height: h, rx: 18, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, g);
    const head = chip(g, 'TRAP ' + n, { size: 30, fill: '#D32F2F', color: '#FFFFFF', weight: 800 }); tr(head, CX, y0 + 52);
    return g;
  }
  const txt = (parent, y, s, o) => mkText(parent, CX, y, s, Object.assign({ size: 34, anchor: 'middle', fill: INK }, o || {}));
  const fadeIn = (el, t, t0) => { const p = P(t, t0, 0.3, easeOut); op(el, p); tr(el, 0, 10 * (1 - p)); };
  function trNo(parent, x, y, s, o) {   // a crossed-out red line of markup; g.set(p) draws the strike
    const g = G(parent), m = mkText(g, x, y, s, Object.assign({ size: 34, anchor: 'middle', fill: RED }, o || {}));
    const sl = strike(g, x - m.w / 2 - 10, y - 10, x + m.w / 2 + 10, RED);
    g.set = p => sl.set(p);
    return g;
  }

  /* ---------- layers ---------- */
  const Lbg = G(root), Lcast = G(root), Lfront = G(root), Ltop = G(root), Lfg = G(root), Lhud = G(root);

  /* ---------- sets ---------- */
  const flatShot = G(Lbg);
  const flat = pbFlat(flatShot);
  Lfront.appendChild(flat.front); Ltop.appendChild(flat.top);
  // Sunday: sunshine through the window, the pail overflowing
  const W = flat.win, sunny = G(flatShot);
  E('rect', { x: W[0], y: W[1], width: W[2], height: W[3], fill: linGrad('#8FD3FF', '#DFF3FF', true) }, sunny);
  E('circle', { cx: W[0] + 300, cy: W[1] + 70, r: 40, fill: '#FFE45C', stroke: '#FFC93C', 'stroke-width': 6 }, sunny);
  E('rect', { x: W[0] + 30, y: W[1] + 120, width: 150, height: 200, fill: '#C9D3DC' }, sunny);
  E('rect', { x: W[0] + 220, y: W[1] + 160, width: 140, height: 160, fill: '#D5DDE5' }, sunny);
  E('path', { d: `M${W[0] + W[2] / 2},${W[1]} V${W[1] + W[3]} M${W[0]},${W[1] + 150} H${W[0] + W[2]}`, stroke: '#FFFFFF', 'stroke-width': 9 }, sunny);
  E('ellipse', { cx: 1132, cy: 704, rx: 96, ry: 16, fill: '#7FC4F5', opacity: 0.8 }, sunny);
  E('path', { d: 'M1094,642 Q1086,670 1090,700 M1170,642 Q1178,670 1174,700', fill: 'none', stroke: '#7FC4F5', 'stroke-width': 6, 'stroke-linecap': 'round' }, sunny);
  const dim = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#06121B', opacity: 0.55 }, flatShot);
  const conf = pbConf(Lbg, 'priya');
  const TINT = {}; for (const kk in PB_TINT) TINT[kk] = linGrad(PB_TINT[kk][0], PB_TINT[kk][1], true);
  const logoBg = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#0E1E3A', '#1F3E6E', true) }, logoBg);
  let rays = '';
  for (let i = 0; i < 16; i++) { const a0 = i / 16 * TAU, a1 = a0 + TAU / 40; rays += `M0,0 L${(Math.cos(a0) * 1100).toFixed(0)},${(Math.sin(a0) * 1100).toFixed(0)} L${(Math.cos(a1) * 1100).toFixed(0)},${(Math.sin(a1) * 1100).toFixed(0)} Z `; }
  const rayP = E('path', { d: rays, fill: GOLD, opacity: 0.06 }, logoBg);
  E('ellipse', { cx: 600, cy: 620, rx: 600, ry: 160, fill: glow('#6EC8FF'), opacity: 0.3 }, logoBg);

  /* ===== intro: 6 EXAM TRAPS ===== */
  const sI = G(Lhud);
  const iHead = outline(T(sI, 600, 236, '6 EXAM TRAPS', { size: 80, weight: 800, anchor: 'middle', fill: GOLD, ls: 3 }), '#3A2A07', 10);
  const iSub = outline(T(sI, 600, 296, 'Game Night saves you some marks', { size: 36, weight: 700, anchor: 'middle', fill: '#FFFFFF' }), '#06121B', 8);
  const ROWX = [150, 330, 510, 690, 870, 1050];
  const badges = ROWX.map((x, k) => { const g = G(sI); E('circle', { r: 26, fill: GOLD, stroke: SC_INK, 'stroke-width': 4 }, g); T(g, 0, 11, String(k + 1), { size: 30, weight: 800, anchor: 'middle', fill: SC_INK }); return g; });

  /* ===== trap cards ===== */
  // 1 Priya: never a ratio
  const c1 = trCard(Lfg, 1);
  const c1a = txt(c1, 254, 'A probability is a', { size: 32 });
  const c1b = txt(c1, 300, '**fraction**, **decimal** or **percentage**', { size: 30, boldFill: GREEN });
  const tiles1 = ['3/10', '0.3', '30%'].map((m, i) => {
    const g = G(c1), x = CX + (i - 1) * 170;
    E('rect', { x: x - 72, y: 336, width: 144, height: 110, rx: 16, fill: '#F2FFF7', stroke: GREEN, 'stroke-width': 4 }, g);
    mkMath(g, x, m === '3/10' ? 392 : 404, m, { size: 42, anchor: 'middle', fill: '#14532D' });
    return g;
  });
  const c1n = trNo(c1, CX - 60, 530, '{{3 : 10}}', { size: 44 });
  const c1m = txt(c1, 530, '✗ never a **ratio**', { size: 30, fill: RED });
  tr(c1m, 110, 0);
  // 2 Dad: a probability bigger than 1
  const c2 = trCard(Lfg, 2);
  const c2a = txt(c2, 254, 'A probability **bigger than 1**?', { size: 32, boldFill: RED });
  const c2s = G(c2);
  const SX0 = 700, SX1 = 1040, SY = 380;
  E('rect', { x: SX0, y: SY - 7, width: SX1 - SX0, height: 14, rx: 7, fill: linGrad('#FF8A8A', '#7FE0A8', false) }, c2s);
  E('line', { x1: SX0, y1: SY, x2: SX1, y2: SY, stroke: INK, 'stroke-width': 4 }, c2s);
  [[SX0, '0'], [(SX0 + SX1) / 2, '1/2'], [SX1, '1']].forEach(([x, m]) => { E('line', { x1: x, y1: SY - 16, x2: x, y2: SY + 16, stroke: INK, 'stroke-width': 4 }, c2s); mkMath(c2s, x, SY + 56, m, { size: 30, anchor: 'middle', fill: INK }); });
  const c2m = G(c2); E('circle', { r: 14, fill: '#FFC93C', stroke: SC_INK, 'stroke-width': 3 }, c2m);
  const c2mL = mkMath(c2m, 0, -26, 'P = 1.3', { size: 28, anchor: 'middle', fill: RED });
  const c2x = cross(c2, 26, '#E53935');
  const c2b = txt(c2, 500, '{{0 <= P <= 1}}', { size: 44, fill: GREEN, weight: 800 });
  const c2c = txt(c2, 560, 'Over 1? **Check your working.**', { size: 30, boldFill: RED });
  // 3 Penny: HT and TH are different
  const c3 = trCard(Lfg, 3);
  const c3a = txt(c3, 254, '**HT** and **TH** are **different**', { size: 34, boldFill: PINKD });
  const coin = (parent, x, y, L) => { E('circle', { cx: x, cy: y, r: 26, fill: '#FFD45C', stroke: '#B8860B', 'stroke-width': 4 }, parent); T(parent, x, y + 10, L, { size: 28, weight: 800, anchor: 'middle', fill: '#6B4A00' }); };
  const tiles3 = ['HH', 'HT', 'TH', 'TT'].map((s, i) => {
    const g = G(c3), x = CX + (i % 2 ? 105 : -105), y = 340 + Math.floor(i / 2) * 104;
    const mid_ = s === 'HT' || s === 'TH';
    E('rect', { x: x - 86, y: y - 42, width: 172, height: 84, rx: 16, fill: mid_ ? '#FFF6C8' : '#FFFFFF', stroke: mid_ ? '#E0A800' : '#9FB2C2', 'stroke-width': mid_ ? 5 : 3 }, g);
    coin(g, x - 32, y, s[0]); coin(g, x + 32, y, s[1]);
    return g;
  });
  const c3b = txt(c3, 566, '**4** outcomes: list them **both**', { size: 32, boldFill: PINKD });
  // 4 Mum: a child is chosen
  const c4 = trCard(Lfg, 4);
  const c4a = txt(c4, 254, '"**A child** is chosen"', { size: 34, boldFill: GREEN });
  const tab4 = mkTwoWayTable(c4, { rows: ['Adult', 'Child'], cols: ['Hot', 'Cold'], data: [[22, 18], [6, 34]], size: 26, colW: [104, 84, 84, 96], rowH: 48, ink: INK, headFill: 'rgba(76,140,200,0.22)' });
  const T4X = CX - tab4.W / 2, T4Y = 282; tr(tab4, T4X, T4Y);
  const dim4 = [1, 3].map(r => E('rect', { x: T4X + 2, y: T4Y + r * 48 + 2, width: tab4.W - 4, height: 44, fill: '#FFFDF6', opacity: 0 }, c4));
  const ring4 = E('rect', { x: T4X - 6, y: T4Y + 2 * 48 - 4, width: tab4.W + 12, height: 56, rx: 10, fill: 'none', stroke: GREEN, 'stroke-width': 5 }, c4);
  const c4ok = mkText(c4, CX - 110, 548, '{{34/40}} ✓', { size: 34, anchor: 'middle', fill: GREEN });
  const c4no = trNo(c4, CX + 110, 548, '{{34/80}}', { size: 34 });
  const c4x = cross(c4no, 12, RED); tr(c4x, CX + 160, 538);
  // 5 Venna: this or that
  const c5 = trCard(Lfg, 5, 130, 486);
  const c5a = txt(c5, 240, 'this **or** that? Count the **overlap** once.', { size: 28, boldFill: PINKD });
  const venn5 = mkVenn(c5, { w: 420, h: 220, labels: ['', ''], counts: { a: 8, b: 5, ab: 10, none: 7 }, ink: INK, size: 26, cols: ['#2E7DD8', '#D63A7A'] });
  tr(venn5, CX, 400);
  T(venn5, -66, -122, 'badminton', { size: 26, weight: 800, anchor: 'middle', fill: BLUE });
  T(venn5, 66, -122, 'chess', { size: 26, weight: 800, anchor: 'middle', fill: PINKD });
  const c5ok = txt(c5, 552, '{{8 + 10 + 5 = 23}} ✓', { size: 32, fill: GREEN });
  const c5no = trNo(c5, CX - 14, 596, '{{18 + 15 = 33}}', { size: 30 });
  const c5x = cross(c5no, 11, RED); tr(c5x, CX + 106, 586);
  // 6 Dr Freq: pool, never average
  const c6 = trCard(Lfg, 6);
  const c6a = txt(c6, 254, '**Pool** the totals', { size: 36, boldFill: GREEN });
  const w6 = mkWorking(c6, 920, 290, [{ m: '9 + 18 + 47 = 74', note: 'sides' }, { m: '20 + 50 + 130 = 200', note: 'tosses' }, { m: '74/200 = 0.37', col: GREEN }],
    { size: 40, fill: INK, gap: 24, noteSize: 28, noteCol: '#5A6670', ringCol: GREEN });
  const c6no = txt(c6, 572, '✗ never **average** {{0.45, 0.36, 0.36}}', { size: 28, fill: RED });

  /* ===== logo ===== */
  const sR = G(Lhud);
  const logo = G(sR);
  const logo1 = outline(T(logo, 0, -70, 'WHAT ARE THE', { size: 58, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 6 }), '#0A1430', 12);
  const logo2 = outline(T(logo, 0, 26, 'CHANCES?', { size: 104, weight: 800, anchor: 'middle', fill: GOLD, ls: 2 }), '#0A1430', 12);
  void logo1; void logo2;
  const ldice = [[-370, -10, 5], [370, -10, 2]].map(([x, y, f]) => { const d = mkDice(logo, f, { size: 74 }); tr(d, x, y); return d; });
  const rSub = T(sR, 600, 440, 'will return', { size: 48, weight: 600, anchor: 'middle', fill: '#FFFFFF' });

  /* ===== stinger: Sunday ===== */
  const sW = G(Lhud);
  const cSun = mkChip(sW, '**Sunday, 6 a.m.**', { size: 34, col: GOLD });
  const cAll = mkChip(sW, 'rolling dice **all night**', { size: 30, col: '#FF8A8A' });
  const cH1 = mkChip(sW, 'horse **1**: still at the start', { size: 30, col: GOLD });
  const cZero = mkChip(sW, '{{P("total of 1") = 0}}', { size: 34, col: '#FF8A8A' });
  const track = pbTrack(Lcast, { len: 8 });
  const sdice = [mkDice(Ltop, 1, { size: 56 }), mkDice(Ltop, 1, { size: 56 })];
  const flashH = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#EAF2FF', opacity: 0 }, Lhud);

  /* ---------- the cast ---------- */
  const priya = cast(Lcast, 'priya', { prop: null }), dad = cast(Lcast, 'dad', { prop: null, hand: true }), mum = cast(Lcast, 'mum', { prop: null }),
    boy = cast(Lcast, 'boy'), penny = cast(Lcast, 'penny'), venna = cast(Lcast, 'venna'), freq = cast(Lcast, 'freq'), cube = cast(Ltop, 'cube');
  // Dad's TOTO ticket
  const mini = G(dad.hand); tr(mini, 0, -38, 1, -8);
  E('rect', { x: -40, y: -22, width: 80, height: 44, rx: 4, fill: '#FFFDF6', stroke: '#7D8A96', 'stroke-width': 2.5 }, mini);
  E('rect', { x: -40, y: -22, width: 80, height: 13, rx: 4, fill: '#1E7A46' }, mini);
  E('path', { d: 'M-28,4 h10 M-10,4 h10 M8,4 h10 M-28,14 h10 M-10,14 h10 M8,14 h10', stroke: '#C62828', 'stroke-width': 3 }, mini);
  // Mum's dressing gown (over the kurta) for the stinger
  const robe = G(mum.firstChild);
  E('path', { d: 'M-110,140 Q-106,56 -44,42 L-6,124 L-6,140 Z M110,140 Q106,56 44,42 L6,124 L6,140 Z', fill: '#8EC5E8', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, robe);
  E('path', { d: 'M-44,42 L-6,124 M44,42 L6,124', stroke: '#FFFFFF', 'stroke-width': 8, 'stroke-linecap': 'round' }, robe);
  // Ah Boy's tired eyes
  const bags = G(boy.firstChild);
  E('path', { d: 'M-40,30 Q-25,40 -10,30 M10,30 Q25,40 40,30', fill: 'none', stroke: '#9A5A8A', 'stroke-width': 4, 'stroke-linecap': 'round', opacity: 0.8 }, bags);

  /* ---------- shots ---------- */
  const cut = id => at(id) - 0.06;
  const SHOTS = [['I', -9], ['1', cut('t1')], ['2', cut('t2')], ['3', cut('t3')], ['4', cut('t4')], ['5', cut('t5')], ['6', cut('t6')],
    ['R', cut('return')], ['W', cut('sunday')]];
  const shotAt = t => { let s = 'I'; for (const [kk, t0] of SHOTS) if (t >= t0) s = kk; return s; };
  const CARDS = { 1: c1, 2: c2, 3: c3, 4: c4, 5: c5, 6: c6 };
  const CONF = { 1: 'priya', 2: 'dad', 3: 'penny', 4: 'mum', 5: 'venna', 6: 'freq' };
  // the intro row: [character, mood, scale, y]
  const ROW = [[priya, 'smug', 0.62, 470], [dad, 'smug', 0.6, 470], [penny, 'happy', 0.55, 548 - 129 * 0.55], [mum, 'smug', 0.6, 470],
    [venna, 'neutral', 0.48, 548 - 132 * 0.48], [freq, 'neutral', 0.5, 548 - 136 * 0.5]];
  const CS = 0.64, FX = 772, BASE = 138 * CS;   // Cubert on the table in the stinger
  const tTip = mid('zero', 0.72), tFlash = end('zero') + 0.35;

  return t => {
    const sh = shotAt(t);
    const flatOn = sh === 'I' || sh === 'W' ? 1 : 0;
    op(flatShot, flatOn); op(flat.front, flatOn); op(flat.top, flatOn); op(dim, sh === 'I' ? 1 : 0); op(sunny, sh === 'W' ? 1 : 0);
    flat.upd(t, sh === 'W' ? 0 : 1); flat.clock(sh === 'W' ? 6 : 9, sh === 'W' ? 2 : 40); flat.flash(0);
    op(logoBg, sh === 'R' ? 1 : 0); op(sI, sh === 'I' ? 1 : 0); op(sR, sh === 'R' ? 1 : 0); op(sW, sh === 'W' ? 1 : 0);
    for (const kk in CARDS) op(CARDS[kk], sh === kk ? 1 : 0);
    const cw = CONF[sh];
    conf.set(cw ? 1 : 0, t); if (cw) conf.firstChild.setAttribute('fill', TINT[cw]);
    [priya, dad, mum, boy, penny, venna, freq, cube, track, robe, bags, mini].forEach(e => op(e, 0));
    sdice.forEach(d => op(d, 0)); op(flashH, 0);
    const show = (c, x, y, s, st) => { op(c, 1); tr(c, x, y, s); c.set(Object.assign({ t }, st)); };

    if (sh === 'I') {
      flat.flash(0);
      const hp = P(t, at('intro') + 0.05, 0.45, pop);
      op(iHead, clamp(hp * 2.5)); iHead.setAttribute('transform', `translate(600 210) scale(${Math.max(0.01, 0.6 + 0.4 * hp).toFixed(3)}) translate(-600 -210)`);
      op(iSub, P(t, mid('intro', 0.3), 0.4, linear));
      ROW.forEach(([c, mood, s, y], i) => {
        const p = P(t, mid('intro', 0.4) + i * 0.14, 0.45, pop);
        show(c, ROWX[i], y + 30 * (1 - clamp(p)), Math.max(0.01, s * (0.7 + 0.3 * p)), { mood, look: 0 });
        op(c, clamp(p * 3));
        popIn(badges[i], t, mid('intro', 0.45) + i * 0.14, ROWX[i], 626);
      });
    } else if (cw) {
      if (cw === 'priya') {
        show(priya, 320, 562, 1.4, { talk: talk(t, 'priya'), mood: 'smug', look: 0.4 });
        fadeIn(c1a, t, at('t1') + 0.1); fadeIn(c1b, t, mid('t1', 0.22));
        tiles1.forEach((g, i) => fadeIn(g, t, mid('t1', 0.36 + i * 0.07)));
        fadeIn(c1n, t, mid('t1', 0.62)); c1n.set(P(t, mid('t1', 0.72), 0.3, linear));
        fadeIn(c1m, t, mid('t1', 0.74)); tr(c1m, 110, 10 * (1 - P(t, mid('t1', 0.74), 0.3, easeOut)));
      } else if (cw === 'dad') {
        const flown = mid('t2', 0.45);
        show(dad, 320, 572, 1.4, { talk: talk(t, 'dad'), mood: t > mid('t2', 0.72) ? 'smug' : t > flown ? 'shock' : 'neutral', look: 0.4 });
        fadeIn(c2a, t, at('t2') + 0.1); fadeIn(c2s, t, mid('t2', 0.12));
        // the marker runs past 1 and flies off the end of the scale
        const run = P(t, mid('t2', 0.16), flown - mid('t2', 0.16), easeIn);
        const mx = lerp(SX0, SX1 + 70, run);
        const fly = P(t, flown, 0.6, easeIn);
        op(c2m, t >= mid('t2', 0.14) ? 1 - fly : 0); tr(c2m, mx + 160 * fly, SY - 220 * fly, 1, 300 * fly);
        attr(c2m.firstChild, 'fill', mx > SX1 ? '#FF5050' : '#FFC93C'); op(c2mL, mx > SX1 + 10 ? 1 : 0);
        op(c2x, P(t, flown + 0.2, 0.2, linear)); tr(c2x, SX1 + 70, SY - 50);
        fadeIn(c2b, t, mid('t2', 0.55)); fadeIn(c2c, t, mid('t2', 0.66));
      } else if (cw === 'penny') {
        const fl = P(t, at('t3') + 0.05, 0.7, easeOut);
        show(penny, 330, 400, 1.3, { talk: talk(t, 'penny'), mood: t > mid('t3', 0.7) ? 'neutral' : 'happy', look: 0.4, flip: fl * 2 });
        fadeIn(c3a, t, at('t3') + 0.1);
        tiles3.forEach((g, i) => fadeIn(g, t, mid('t3', 0.2 + i * 0.08)));
        fadeIn(c3b, t, mid('t3', 0.55));
      } else if (cw === 'mum') {
        show(mum, 320, 566, 1.4, { talk: talk(t, 'mum'), mood: t > mid('t4', 0.8) ? 'smug' : 'neutral', look: 0.4 });
        fadeIn(c4a, t, at('t4') + 0.1); fadeIn(tab4, t, mid('t4', 0.15)); tr(tab4, T4X, T4Y + 10 * (1 - P(t, mid('t4', 0.15), 0.3, easeOut)));
        const dp = P(t, mid('t4', 0.35), 0.3, linear);
        dim4.forEach(d => op(d, 0.62 * dp)); op(ring4, dp);
        fadeIn(c4ok, t, mid('t4', 0.55));
        fadeIn(c4no, t, mid('t4', 0.7)); c4no.set(P(t, mid('t4', 0.8), 0.3, linear));
      } else if (cw === 'venna') {
        show(venna, 320, 400, 1.2, { talk: talk(t, 'venna'), mood: 'neutral', look: 0.5, lit: 1 });
        fadeIn(c5a, t, at('t5') + 0.1); fadeIn(venn5, t, mid('t5', 0.12)); tr(venn5, CX, 400 + 10 * (1 - P(t, mid('t5', 0.12), 0.3, easeOut)));
        venn5.hl('AorB', P(t, mid('t5', 0.3), 0.3, linear) * 0.8);
        fadeIn(c5ok, t, mid('t5', 0.5)); fadeIn(c5no, t, mid('t5', 0.62)); c5no.set(P(t, mid('t5', 0.72), 0.3, linear));
      } else {
        show(freq, 320, 410, 1.25, { talk: talk(t, 'freq'), mood: 'neutral', look: 0.5, count: Math.min(200, Math.floor(Math.max(0, t - at('t6')) * 60)) });
        fadeIn(c6a, t, at('t6') + 0.1);
        [0.18, 0.32, 0.46].forEach((f, i) => w6.show(i, P(t, mid('t6', f), 0.35)));
        w6.ring(2, P(t, mid('t6', 0.56), 0.25, linear));
        fadeIn(c6no, t, mid('t6', 0.66));
      }
    } else if (sh === 'R') {
      tr(rayP, 600, 600, 1, (t * 6 * AMP) % 360);
      popIn(logo, t, at('return') + 0.05, 600, 260);
      ldice.forEach((d, i) => d.set([5, 2][i], Math.sin(t * 2 + i * 2) * 14 * AMP));
      op(rSub, P(t, mid('return', 0.45), 0.4, linear));
    } else {
      /* ---------- the stinger: Sunday, 6 a.m. ---------- */
      const who = scWho(S, t), fallen = t > tTip;
      popIn(cSun, t, at('sunday') + 0.1, 290, 150);
      cAll.set(t >= at('night') && t < at('horse') ? P(t, mid('night', 0.4), 0.35, linear) : 0); tr(cAll, 290, 222);
      cH1.set(t >= at('horse') && t < at('zero') ? P(t, mid('horse', 0.3), 0.35, linear) : 0); tr(cH1, 985, 160);
      cZero.set(t >= mid('zero', 0.45) ? P(t, mid('zero', 0.45), 0.35, linear) : 0); tr(cZero, 985, 160);
      // the race board, horse 1 at the start
      op(track, 1); tr(track, 856, 214, 0.54);
      for (let i = 0; i < 12; i++) track.set(i, [0, 1, 2, 3, 4, 6, 8, 6, 5, 3, 2, 1][i]);
      track.hl(0, t >= at('horse') ? P(t, at('horse') + 0.2, 0.3, linear) * (0.75 + 0.25 * Math.sin(t * 6)) : 0);
      // Ah Boy, still rolling
      const rolling = !fallen;
      show(boy, 548, 462, 0.95, { talk: talk(t, 'boy'), mood: fallen ? 'shock' : t >= at('son') ? 'happy' : t >= at('horse') ? 'happy' : 'deadpan', look: fallen ? 0.8 : who === 'mum' ? -0.9 : who === 'dad' ? -0.8 : 0.2, lift: rolling && Math.sin(t * 5) > 0.3 ? 1 : 0 });
      op(bags, 1);
      sdice.forEach((d, i) => { op(d, 1); const ph = (t * 1.6 + i * 0.3) % 1; tr(d, [500, 566][i], 522 - Math.abs(Math.sin(ph * Math.PI)) * 24 * AMP * (rolling ? 1 : 0)); d.set(rolling ? 1 + Math.floor((t * 3 + i * 2) % 6) : [1, 1][i] + [0, 0][i], rolling ? Math.sin(t * 7 + i) * 20 : 0); });
      // Mum, in her dressing gown
      if (t >= at('night') - 0.3) {
        const inn = P(t, at('night') - 0.3, 0.4, easeOut);
        show(mum, lerp(-120, 170, inn), 426, 1.0, { talk: talk(t, 'mum'), mood: fallen ? 'deadpan' : t >= at('horse') ? 'deadpan' : 'shock', look: fallen ? 0.9 : 0.9 });
        op(robe, 1);
      }
      // Dad sits down beside him with his TOTO ticket
      if (t >= at('son') - 0.4) {
        const sit = P(t, at('son') - 0.4, 0.5, easeOut);
        show(dad, 360, lerp(700, 440, sit), 0.95, { talk: talk(t, 'dad'), mood: fallen ? 'shock' : 'happy', look: fallen ? 0.9 : 0.8, lift: fallen ? 0 : 1 });
        op(mini, 1);
      }
      // Cubert: "Total of one. Probability... zero." and over he goes
      const tip = P(t, tTip, 0.9, easeIn), rad = tip * Math.PI / 2;
      const cxx = FX - BASE * Math.sin(rad), cyy = 548 - BASE * Math.cos(rad) - 78 * CS * Math.sin(rad);
      op(cube, 1); tr(cube, cxx, cyy, CS, -90 * tip);
      cube.set({ t, talk: talk(t, 'cube'), mood: t > mid('zero', 0.45) ? 'sad' : 'deadpan', look: -0.6, arms: 0, still: fallen });
      op(flashH, 0.75 * Math.max(P(t, tFlash, 0.06, linear) * (1 - P(t, tFlash + 0.1, 0.45, linear)), 0));
    }
  };
});
