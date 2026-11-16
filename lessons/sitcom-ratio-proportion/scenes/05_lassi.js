/* Scene 5: Lassi for six, and a kebaya (recipes & currency conversion).
   10 a.m.: the lassi recipe serves 4, a family of 6 waves at the counter -> Priya adds 2 to everything -> the
   Colonel reads it out: 4 mangoes, 502 g, 202 ml... OUT OF PROPORTION -> Uni: never add, multiply by new ÷ old = 1.5
   -> the × 1.5 column, IN PROPORTION -> 11 a.m.: Mum at the fridge, batches per ingredient, yoghurt is the limiting
   ingredient, 3 batches = 12 lassis -> Dad and his "best buy" pot -> Auntie Rose calls from Melaka (phone far too
   close): $1 = RM 3.40, double number line -> the kebaya is RM 85, Ah Boy multiplies: $289?! -> Kavya divides: $25
   -> Auntie buys two. */
scene('lassi', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);          // hard sitcom cut
  const about = (el, cx, cy, k) => el.setAttribute('transform', `translate(${(cx * (1 - k)).toFixed(1)} ${(cy * (1 - k)).toFixed(1)}) scale(${Math.max(0.01, k).toFixed(4)})`);
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 3, color: o.color || C.ink, weight: 700 }); };
  const fade = (t, a, b) => win(t, a, b, 0.2);
  const GOLD = '#FFE45C', PINK = '#FF8FC8', INK = MK.ink, GREEN = '#1E9E5A', RED = '#D32F2F', BERRY = '#B8336A';
  const paper = (parent, x, y, w, h) => {
    E('rect', { x: x + 6, y: y + 6, width: w, height: h, rx: 16, fill: 'rgba(0,0,0,0.25)' }, parent);
    return E('rect', { x, y, width: w, height: h, rx: 16, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, parent);
  };
  // a family member seen from behind (back of the head, shoulders, a waving arm)
  function laFan(parent, hairCol, shirt, skin, bun) {
    const g = G(parent);
    const arm = G(g); tr(arm, 56, 16);
    E('path', { d: 'M0,0 L30,-74', stroke: shirt, 'stroke-width': 26, 'stroke-linecap': 'round' }, arm);
    E('circle', { cx: 32, cy: -84, r: 15, fill: skin, stroke: SC_INK, 'stroke-width': 3.5 }, arm);
    E('path', { d: 'M-84,120 L-84,62 Q-80,6 0,2 Q80,6 84,62 L84,120 Z', fill: shirt, stroke: SC_INK, 'stroke-width': 4 }, g);
    E('rect', { x: -18, y: -12, width: 36, height: 22, fill: skin }, g);
    E('ellipse', { cx: -48, cy: -40, rx: 10, ry: 16, fill: skin, stroke: SC_INK, 'stroke-width': 3 }, g);
    E('ellipse', { cx: 48, cy: -40, rx: 10, ry: 16, fill: skin, stroke: SC_INK, 'stroke-width': 3 }, g);
    E('ellipse', { cx: 0, cy: -46, rx: 50, ry: 54, fill: hairCol, stroke: SC_INK, 'stroke-width': 4 }, g);
    if (bun) E('circle', { cx: 0, cy: -96, r: 20, fill: hairCol, stroke: SC_INK, 'stroke-width': 3.5 }, g);
    g.arm = arm;
    return g;
  }
  // a kebaya on a hanger, centred on its collar
  function laKebaya(parent, col, trim) {
    const g = G(parent);
    E('path', { d: 'M0,-34 L0,-50 Q12,-56 10,-66', fill: 'none', stroke: '#8F9CAB', 'stroke-width': 4 }, g);
    E('path', { d: 'M-60,-20 L0,-34 L60,-20', fill: 'none', stroke: '#8F9CAB', 'stroke-width': 5, 'stroke-linecap': 'round' }, g);
    E('path', { d: 'M-30,-28 L-86,0 L-100,58 L-70,64 L-60,26 L-56,120 L56,120 L60,26 L70,64 L100,58 L86,0 L30,-28 L0,36 Z', fill: col, stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
    E('path', { d: 'M-30,-28 L0,36 L30,-28 M0,36 L0,120', fill: 'none', stroke: trim, 'stroke-width': 7 }, g);
    E('path', { d: 'M-56,112 L56,112', stroke: trim, 'stroke-width': 8 }, g);
    [[-36, 60], [36, 60], [-30, 92], [30, 92], [-80, 30], [80, 30]].forEach(([x, y]) => E('circle', { cx: x, cy: y, r: 7, fill: trim, stroke: SC_INK, 'stroke-width': 2 }, g));
    return g;
  }

  /* layers */
  const Lset = G(root), Lhud = G(root);

  /* ================= the stall (every shot) ================= */
  const stallShot = G(Lset);
  const stall = rpStall(stallShot);

  // B: the fridge, behind the counter on the left
  const fridge = G(stall.mid);
  E('rect', { x: 96, y: 188, width: 190, height: 360, rx: 12, fill: '#E6EBEF', stroke: '#5A6670', 'stroke-width': 5 }, fridge);
  E('rect', { x: 110, y: 202, width: 162, height: 346, rx: 6, fill: '#D6F0FF', stroke: '#8FB3CC', 'stroke-width': 3 }, fridge);
  E('path', { d: 'M96,196 L46,214 L46,548 L96,548 Z', fill: '#F4F7FA', stroke: '#5A6670', 'stroke-width': 4, 'stroke-linejoin': 'round' }, fridge);   // open door
  [300, 412].forEach(y => E('rect', { x: 110, y, width: 162, height: 8, fill: '#FFFFFF', stroke: '#8FB3CC', 'stroke-width': 2 }, fridge));
  [[132, 290], [168, 290], [204, 290], [240, 290], [150, 258], [186, 258], [222, 258]].forEach(([x, y]) => rpMango(fridge, 0.48).setAttribute('transform', `translate(${x} ${y}) scale(0.48)`));
  [140, 191, 242].forEach(x => tr(rpYoghurt(fridge, 'M'), x, 410, 0.46));
  const milk = G(fridge); tr(milk, 191, 516);
  E('path', { d: 'M-36,0 L-36,-96 L-24,-116 L24,-116 L36,-96 L36,0 Z', fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, milk);
  E('rect', { x: -36, y: -96, width: 72, height: 24, fill: '#2E7DD8' }, milk);
  T(milk, 0, -32, '1 L', { size: 30, weight: 800, anchor: 'middle', fill: '#2E7DD8' });

  // the cast, behind the counter
  const kav = cast(stall.mid, 'kavya');
  const priya = cast(stall.mid, 'priya', { side: 'right' });
  const mum = cast(stall.mid, 'mum', { prop: null });
  const dad = cast(stall.mid, 'dad', { prop: null, hand: true, side: 'right' });
  tr(rpYoghurt(G(dad.hand), 'M'), 0, 4, 0.75);
  const boy = cast(stall.mid, 'boy', { prop: 'calculator' });
  const uni = cast(stall.mid, 'uni');
  // the Colonel stands on the counter
  const col = cast(stall.top, 'colonel');
  // twelve cups of lassi (B)
  const cups = Array.from({ length: 12 }, () => rpCup(stall.top, { col: RP_DRINK.lassi, s: 0.3 }));

  /* ---------- A: the recipe board ---------- */
  const boardA = G(stallShot);
  paper(boardA, 600, 180, 570, 380);
  mkText(boardA, 885, 226, '**MANGO LASSI**', { size: 36, anchor: 'middle', fill: BERRY });
  const tbl = mkTable(boardA, [['', 'serves 4', '+ 2 (Priya)', '× 1.5'], ['mangoes', '2', '4', '3'], ['yoghurt', '500 g', '502 g', '750 g'], ['milk', '200 ml', '202 ml', '300 ml'], ['sugar', '40 g', '42 g', '60 g']],
    { size: 28, ink: INK, side: true, colW: [140, 130, 168, 116], rowH: 58, headFill: 'rgba(46,125,216,0.14)', fill: '#FFFFFF' });
  tr(tbl, 608, 252);
  const mServe = tbl.mark(0, 1, 'rgba(255,228,92,0.6)');
  const addMarks = [1, 2, 3, 4].map(r => tbl.mark(r, 2, 'rgba(255,138,138,0.35)'));
  const mulMarks = [1, 2, 3, 4].map(r => tbl.mark(r, 3, 'rgba(126,224,138,0.45)'));
  const strikeAdd = G(boardA);
  { const c0 = tbl.cell(0, 2), c4 = tbl.cell(4, 2), x0 = 608 + c0.x + 10, x1 = 608 + c0.x + c0.w - 10, y0 = 252 + 8, y1 = 252 + c4.y + c4.h - 8;
    E('path', { d: `M${x0},${y0} L${x1},${y1} M${x1},${y0} L${x0},${y1}`, stroke: RED, 'stroke-width': 7, 'stroke-linecap': 'round', opacity: 0.85 }, strikeAdd); }
  // left-top panel: Priya's plan, the Colonel's verdict, Uni's multiplier
  const cFam = pill(Lhud, 'a family of 6', { size: 32, color: PINK, stroke: PINK });
  const cTen = pill(Lhud, '10 a.m.', { size: 34, color: GOLD, stroke: GOLD });
  const cAdd = mkChip(Lhud, '**+ 2** to everything!', { size: 38, col: '#FF8A8A' });
  const words = ['OUT.', 'OF.', 'PROPORTION.'].map(w => { const tx = T(Lhud, 0, 0, w, { size: 52, weight: 800, anchor: 'middle', fill: '#FF6B6B' }); tx.setAttribute('stroke', '#3A0820'); tx.setAttribute('stroke-width', 9); tx.setAttribute('paint-order', 'stroke'); tx.setAttribute('stroke-linejoin', 'round'); return tx; });
  const multCard = G(Lhud);
  paper(multCard, 88, 186, 500, 120);
  const mNever = mkText(multCard, 338, 226, '**Never add!** Multiply:', { size: 30, anchor: 'middle', fill: INK, boldFill: RED });
  const mForm = mkMath(multCard, 338, 284, '"new" ÷ "old" = 6/4 = 1.5', { size: 38, anchor: 'middle', fill: INK, weight: 700 });
  const stampNo = rpStamp(Lhud, false), stampOk = rpStamp(Lhud, true);
  // the family of six, from behind
  const fam = G(stallShot);
  const FAM = [[230, 1.1, '#2A1E18', '#3B7DD8', SC_SKIN.deep, false], [420, 1.05, '#1E1410', '#C94E7C', SC_SKIN.brown, true], [600, 0.98, SC_HAIR.silver, '#7E57C2', SC_SKIN.tan, true],
    [770, 0.76, '#1E1410', '#F2A93B', SC_SKIN.medium, false], [900, 0.72, '#2A1E18', '#2FA36B', SC_SKIN.medium, true], [1040, 0.9, '#1E1410', '#E8424F', SC_SKIN.brown, false]].map(([x, s, h, sh, sk, b]) => {
    const f = laFan(fam, h, sh, sk, b); return { f, x, s };
  });

  /* ---------- B: the batches board ---------- */
  const boardB = G(stallShot);
  paper(boardB, 600, 180, 570, 380);
  mkText(boardB, 885, 224, '**As many lassis as possible**', { size: 32, anchor: 'middle', fill: BERRY });
  mkText(boardB, 885, 266, '1 batch (serves 4): 2 mangoes,', { size: 28, anchor: 'middle', fill: INK });
  mkText(boardB, 885, 302, '500 g yoghurt, 200 ml milk', { size: 28, anchor: 'middle', fill: INK });
  const BY = [370, 432, 494];
  const bHl = E('rect', { x: 612, y: BY[1] - 36, width: 546, height: 50, rx: 10, fill: 'rgba(255,228,92,0.6)' }, boardB);
  const bLab = ['mangoes', 'yoghurt', 'milk'].map((n, i) => T(boardB, 620, BY[i], n, { size: 28, weight: 700, fill: '#5A4A52' }));
  const bHave = ['7', '1500 g', '1 litre = 1000 ml'].map((v, i) => mkText(boardB, 760, BY[i], 'have **' + v + '**', { size: 32, fill: INK }));
  const bWork = ['7 ÷ 2 = 3.5', '1500 ÷ 500 = 3', '1000 ÷ 200 = 5'].map((m, i) => mkMath(boardB, 752, BY[i], m, { size: 34, fill: INK, weight: 700 }));
  const bBars = [3.5, 3, 5].map((v, i) => E('rect', { x: 1004, y: BY[i] - 26, width: v * 30, height: 28, rx: 6, fill: i === 1 ? '#E8424F' : '#4CC9F0', stroke: INK, 'stroke-width': 2.5 }, boardB));
  const bTotal = mkText(boardB, 885, 546, '{{3 × 4 = 12}} lassis', { size: 36, anchor: 'middle', fill: GREEN, weight: 800 });
  const cEleven = pill(Lhud, '11 a.m.', { size: 34, color: GOLD, stroke: GOLD });
  const cLimit = mkChip(Lhud, 'yoghurt runs out first: **limiting ingredient**', { size: 32, col: '#FF8A8A' });

  /* ---------- C: Auntie Rose on a video call ---------- */
  const callG = G(stallShot);
  const call = rpRoseCall(callG, 600, 380);
  const keb1 = laKebaya(call.screen, '#FFF2F7', '#E8679A'); tr(keb1, -196, 10, 0.95);
  const tag85 = mkPriceTag(keb1, '{{"RM" 85}}', { size: 30, string: false }); tr(tag85, -96, 84, 1 / 0.95);
  const keb2 = laKebaya(call.screen, '#DDF6F2', '#1FA38A'); tr(keb2, 210, 20, 0.85);
  const cRate = mkChip(Lhud, '{{$1 = "RM" 3.40}}', { size: 40, col: GOLD });
  const cToRM = mkChip(Lhud, '{{$ -> "RM"}}: **multiply** by 3.40', { size: 32, col: GOLD });
  const cAsk = mkChip(Lhud, '{{"RM" 85 -> $}} ?', { size: 36, col: PINK });
  const cToS = mkChip(Lhud, '{{"RM" -> $}}: **divide** by 3.40', { size: 32, col: GOLD });
  const cBig = mkChip(Lhud, 'ringgit number is **bigger**: {{"RM" 85 > $25}}', { size: 28, col: '#7EE08A' });
  const k50 = mkChip(Lhud, '{{50 × 3.40 = 170}}', { size: 40, col: '#7EE08A' });
  const k289 = mkChip(Lhud, '{{85 × 3.40 = $289}}', { size: 40, col: '#FF6B6B' });
  const k25 = mkChip(Lhud, '{{85 ÷ 3.40 = $25}}', { size: 40, col: '#7EE08A' });
  const no289 = cross(Lhud, 26);
  // the double number line
  const dnl = G(Lhud);
  paper(dnl, 110, 560, 1000, 126);
  const NX = v => 250 + v * 16;          // $ value -> x (the RM line shares it: RM = 3.40 × $)
  const YD = 604, YR = 640;
  E('path', { d: `M${NX(0)},${YD} L${NX(52)},${YD} M${NX(0)},${YR} L${NX(52)},${YR}`, stroke: INK, 'stroke-width': 4, 'stroke-linecap': 'round' }, dnl);
  T(dnl, 176, YD + 9, '$', { size: 30, weight: 800, anchor: 'end', fill: '#2E7DD8' });
  T(dnl, 176, YR + 10, 'RM', { size: 28, weight: 800, anchor: 'end', fill: BERRY });
  const tick = (v, dl, rl, aD, aR) => {
    const g = G(dnl);
    E('path', { d: `M${NX(v)},${YD - 10} L${NX(v)},${YD + 10} M${NX(v)},${YR - 10} L${NX(v)},${YR + 10}`, stroke: INK, 'stroke-width': 4 }, g);
    mkMath(g, NX(v) + (aD === 'start' ? 6 : aD === 'end' ? -6 : 0), YD - 16, dl, { size: 28, anchor: aD, fill: '#2E7DD8', weight: 700 });
    mkMath(g, NX(v) + (aR === 'start' ? 6 : aR === 'end' ? -6 : 0), YR + 36, rl, { size: 28, anchor: aR, fill: BERRY, weight: 700 });
    return g;
  };
  const t0 = tick(0, '$0', '"RM" 0', 'end', 'end'), t1 = tick(1, '$1', '"RM" 3.40', 'start', 'start');
  const t50 = tick(50, '$50', '"RM" 170', 'middle', 'middle'), t25 = tick(25, '$25', '"RM" 85', 'middle', 'middle');
  const dArr = G(dnl); arrow(dArr, NX(50), YD + 8, NX(50), YR - 4, { color: GREEN, width: 4, head: 12 });
  mkMath(dArr, NX(50) - 14, YD + 28, '× 3.40', { size: 26, anchor: 'end', fill: GREEN, weight: 700 });
  const uArr = G(dnl); arrow(uArr, NX(25), YR - 8, NX(25), YD + 4, { color: GREEN, width: 4, head: 12 });
  mkMath(uArr, NX(25) - 14, YD + 28, '÷ 3.40', { size: 26, anchor: 'end', fill: GREEN, weight: 700 });

  const ltRose = rpLowerThird(Lhud, 'rose');

  /* cut points */
  const cB = at('big') - 0.06, cC = at('rate') - 0.06;

  return t => {
    const sA = on(t, -1, cB), sB = on(t, cB, cC), sC = on(t, cC, 1e9);
    const who = scWho(S, t);
    stall.upd(t);
    stall.menu.hl(2, 0);
    // everything off unless a shot turns it on
    [cFam, cTen, cAdd, multCard, cEleven, cLimit, cRate, cToRM, cAsk, cToS, cBig, k50, k289, k25, no289, dnl].forEach(e => op(e, 0));
    words.forEach(w => op(w, 0)); stampNo.set(0); stampOk.set(0);
    const show = { kav: 0, priya: 0, mum: 0, dad: 0, boy: 0, uni: 0, col: 0 };

    /* ---------- A: lassi for six ---------- */
    op(boardA, sA); op(fam, 0);
    if (sA) {
      popIn(cTen, t, at('ten') + 0.05, 880, 60);
      // the family waves
      if (t < at('add') - 0.06) {
        op(fam, 1);
        FAM.forEach(({ f, x, s }, i) => {
          const p = P(t, mid('ten', 0.5) + i * 0.08, 0.4, easeOut);
          tr(f, x, lerp(800, 690, p), s);
          tr(f.arm, 56, 16, 1, -18 + 22 * Math.sin(t * 7 + i * 1.3) * AMP);
        });
        popIn(cFam, t, mid('ten', 0.62), 330, 240);
      }
      mServe.set(t < at('add') ? P(t, mid('ten', 0.38), 0.3, linear) : 0);
      // Priya's "+ 2" column
      [0, 1, 2, 3, 4].forEach(r => op(tbl.cells[r][2], 0));
      op(tbl.cells[0][2], P(t, mid('add', 0.45), 0.3, linear));
      const addT = [0.08, 0.24, 0.46, 0.62];
      [1, 2, 3, 4].forEach((r, k) => { const p = P(t, mid('result', addT[k]), 0.3, linear); op(tbl.cells[r][2], p); addMarks[k].set(p); });
      if (t >= at('add') - 0.05 && t < at('result')) popIn(cAdd, t, mid('add', 0.3), 330, 240);
      // OUT. OF. PROPORTION.
      if (t > mid('result', 0.7) && t < at('multiply') + 0.2) {
        [0.72, 0.8, 0.88].forEach((f, i) => { const p = P(t, mid('result', f), 0.3, pop); op(words[i], clamp(p * 3)); tr(words[i], [190, 330, 330][i], [236, 236, 294][i], Math.max(0.01, 0.92 * (0.5 + 0.5 * p)), -4); });
      }
      if (t < at('multiply') + 0.3) stampNo.set(P(t, mid('result', 0.9), 0.35, linear));
      tr(stampNo, 885, 618, 0.45);
      // Uni's multiplier
      const mp = P(t, at('multiply') + 0.05, 0.35, easeOut);
      op(multCard, mp); tr(multCard, 0, 20 * (1 - mp));
      op(mNever, 1); op(mForm, P(t, mid('multiply', 0.4), 0.35, linear));
      op(strikeAdd, P(t, mid('multiply', 0.12), 0.25, linear));
      // the × 1.5 column
      [0, 1, 2, 3, 4].forEach(r => op(tbl.cells[r][3], 0));
      op(tbl.cells[0][3], P(t, mid('multiply', 0.75), 0.3, linear));
      const mulT = [0.1, 0.28, 0.55, 0.8];
      [1, 2, 3, 4].forEach((r, k) => { const p = P(t, mid('scaled', mulT[k]), 0.3, linear); op(tbl.cells[r][3], p); mulMarks[k].set(p); });
      stampOk.set(P(t, mid('scaled', 0.86), 0.35, linear)); tr(stampOk, 885, 618, 0.45);
      // the cast
      show.kav = 1; show.priya = 1;
      tr(kav, 118, 445, 0.9);
      tr(priya, 285, 445, 0.9);
      const lost = t > end('result');
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: t < at('add') ? 'happy' : t < at('multiply') ? 'deadpan' : who === 'kavya' ? 'happy' : 'neutral', look: who === 'priya' ? 0.7 : 0.9 });
      priya.set({ t, talk: scTalk(S, t, 'priya'), mood: !lost ? (t >= at('add') ? 'smug' : 'happy') : t > end('scaled') ? 'annoyed' : 'sad', look: who === 'kavya' ? -0.7 : 0.8, lift: t >= at('add') && t < at('result') ? 1 : 0 });
      if (t >= at('result') - 0.4) {
        show.col = 1;
        const hop = P(t, at('result') - 0.4, 0.4, pop);
        tr(col, 532, lerp(560, 452, hop), 0.7);
        col.set({ t, talk: scTalk(S, t, 'colonel'), mood: t < at('multiply') ? (t > mid('result', 0.65) ? 'annoyed' : 'deadpan') : t > end('scaled') ? 'smug' : 'deadpan', look: who === 'uni' ? -0.7 : who === 'kavya' ? -0.9 : 0.6, salute: t > end('scaled') + 0.1 ? 1 : 0 });
      }
      if (t >= at('multiply') - 0.15) {
        show.uni = 1;
        const up = P(t, at('multiply') - 0.15, 0.4, pop);
        tr(uni, 418, 452, Math.max(0.01, 0.74 * up));
        uni.set({ t, talk: scTalk(S, t, 'uni'), mood: 'happy', look: who === 'kavya' ? -0.8 : 0.8 });
      }
    }

    /* ---------- B: as many as possible ---------- */
    op(boardB, sB); op(fridge, sB); cups.forEach(c => op(c, 0));
    if (sB) {
      popIn(cEleven, t, at('big') + 0.05, 880, 60);
      bLab.forEach(l => op(l, P(t, at('fridge'), 0.3, linear)));
      bHave.forEach((h, i) => op(h, fade(t, mid('fridge', 0.1 + 0.25 * i), at('batches') + 0.15 + 0.12 * i)));
      bWork.forEach((w, i) => op(w, P(t, at('batches') + 0.15 + (i ? mid('batches', 0.32 * i) - at('batches') : 0), 0.3, linear)));
      bBars.forEach((b, i) => { const p = P(t, (i ? mid('batches', 0.32 * i) : at('batches')) + 0.3, 0.4, easeOut); op(b, p > 0 ? 1 : 0); attr(b, 'width', [3.5, 3, 5][i] * 30 * p); });
      op(bHl, P(t, at('limit') + 0.05, 0.3, linear));
      op(bTotal, P(t, mid('limit', 0.68), 0.3, linear));
      if (t > at('limit')) popIn(cLimit, t, mid('limit', 0.12), 885, 618);
      cups.forEach((c, i) => { const p = P(t, mid('limit', 0.72) + i * 0.06, 0.3, easeOut); op(c, p > 0 ? 1 : 0); tr(c, 120 + i * 40, 532 - 20 * (1 - p)); });
      show.mum = 1; show.kav = 1;
      tr(mum, 372, 440, 0.9);
      mum.set({ t, talk: scTalk(S, t, 'mum'), mood: t > at('pot') ? 'deadpan' : who === 'mum' ? 'happy' : 'neutral', look: who === 'kavya' ? 0.8 : who === 'dad' ? -0.8 : -0.4 });
      tr(kav, 515, 448, 0.85);
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: t > at('pot') ? 'deadpan' : 'neutral', look: who === 'kavya' ? 0.6 : -0.8 });
      if (t >= at('pot') - 0.3) {
        show.dad = 1;
        const up = P(t, at('pot') - 0.3, 0.4, easeOut);
        tr(dad, 190, lerp(640, 450, up), 0.92);
        dad.set({ t, talk: scTalk(S, t, 'dad'), mood: 'sad', look: 0.6, lift: 1 });
      }
    }

    /* ---------- C: Auntie Rose calls from Melaka ---------- */
    op(callG, sC);
    ltRose.set(sC ? win(t, at('rate') + 0.1, at('rate') + 3.2, 0.3) : 0);
    if (sC) {
      const cp = P(t, cC, 0.3, easeOut);
      const shake = t > at('what') && t < end('what') + 0.3 ? Math.sin(t * 60) * 7 * AMP : 0;
      tr(callG, 380 + shake, 340 + 30 * (1 - cp));
      const rMood = t >= at('what') && t < at('divide') ? 'shock' : t >= at('two') - 0.2 || (t > at('divide') && t > mid('divide', 0.55)) ? 'happy' : 'happy';
      call.rose.set({ t, talk: scTalk(S, t, 'rose'), mood: rMood, look: who === 'boy' || who === 'kavya' ? 0.7 : 0 });
      op(keb1, P(t, at('kebaya') + 0.1, 0.3, linear)); op(keb2, P(t, mid('two', 0.3), 0.3, linear));
      { const p = P(t, mid('kebaya', 0.45), 0.4, pop); op(tag85, clamp(p * 3)); tag85.set(Math.sin(t * 2.4) * 5 * AMP); }
      // the chips on the right
      const RX = 930, R1 = 200, R2 = 286;
      if (t < at('mult')) popIn(cRate, t, mid('rate', 0.12), RX, R1);
      else if (t < at('kebaya')) popIn(cToRM, t, at('mult') + 0.05, RX, R1);
      else if (t < at('divide')) popIn(cAsk, t, mid('kebaya', 0.5), RX, R1);
      else if (t < mid('divide', 0.62)) popIn(cToS, t, at('divide') + 0.05, RX, R1);
      else popIn(cBig, t, mid('divide', 0.62), 935, R1);
      if (t >= at('mult') && t < at('kebaya')) popIn(k50, t, mid('mult', 0.45), RX, R2);
      if (t >= at('boy') && t < at('divide') + 0.6) {
        popIn(k289, t, mid('boy', 0.4), RX, R2);
        if (t > at('divide')) { op(no289, 1); tr(no289, RX, R2); }
      }
      if (t >= at('divide') + 0.6) popIn(k25, t, mid('divide', 0.4), RX, R2);
      // the double number line (after the lower third)
      const np = P(t, mid('rate', 0.55), 0.3, linear);
      op(dnl, np); tr(dnl, 0, 16 * (1 - np));
      op(t0, 1); op(t1, 1);
      op(t50, P(t, mid('rate', 0.75), 0.3, linear));
      op(dArr, P(t, mid('mult', 0.2), 0.3, linear));
      op(t25, P(t, mid('divide', 0.42), 0.3, linear));
      op(uArr, P(t, mid('divide', 0.3), 0.3, linear));
      // Kavya and Ah Boy at the counter
      show.kav = 1; show.boy = 1;
      tr(kav, 830, 470, 0.85);
      let km = 'neutral';
      if (t >= at('boy') && t < at('divide')) km = t > at('what') ? 'shock' : 'deadpan';
      else if (t >= at('divide')) km = 'smug';
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: who === 'boy' ? 0.8 : -0.8 });
      tr(boy, 1040, 478, 0.85);
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: t >= at('what') && t < at('two') ? 'shock' : 'happy', look: who === 'kavya' ? -0.8 : -0.6, lift: t >= at('kebaya') + 1 && t < at('divide') ? 1 : 0 });
    }

    op(kav, show.kav); op(priya, show.priya); op(mum, show.mum); op(dad, show.dad); op(boy, show.boy); op(uni, show.uni); op(col, show.col);
  };
});
