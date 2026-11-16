/* Scene 4: Flip and the pizzas (dividing fractions, reciprocals).
   Shots (hard sitcom cuts):
   O1 TOP VIEW, 3 p.m.: three pizzas, Mum's cutter cuts each into quarters -> Ah Boy: 3 ÷ 1/4, "÷ makes smaller?" ->
      Kavya: how many quarters fit? the slices slide apart and are counted 1-12: 3 ÷ 1/4 = 12.
   A  the party table: Ah Boy, "witchcraft" -> Flip (lower third) springs onto the table and somersaults.
   O2 Flip's cards somersault into their reciprocals: 2/5 -> 5/2, 7 -> 1/7, 1 3/4 = 7/4 -> 4/7, 0 just lies there ->
      KEEP, CHANGE, FLIP: a/b ÷ c/d = a/b × d/c -> Priya flips both cards (NOT ON MY BAR!) -> Flip: only the divisor
      flips: 2/3 × 5/4 = 10/12 = 5/6.
   A  Mum holds up the lime jug (2 1/4 litres) and a cup (3/8 litre): how many cups?
   O2 Kavya: improper first, 9/4 × 8/3 -> Flip cancels 9 with 3, 8 with 4: 6 cups, six cups fill ->
      Mum: the last 3/4 of a pizza cut into 6 equal pieces: 3/4 ÷ 6 = 3/4 × 1/6 = 3/24 = 1/8 each.
   A  Ah Boy holds up his eighth: "the biggest number!" Kavya, deadpan, to camera. Hold. */
scene('pizza', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;
  const talk = (t, who) => scTalk(S, t, who);

  /* ---------- local helpers ---------- */
  const GOLD = '#FFE45C', PINK = '#FF8FC8', RED = '#C62828', GREEN = '#1E9E5A', BLUE = '#2E6FD8', INK = MK.ink, BERRY = '#B8336A';
  const chipAt = (parent, text, o) => { o = o || {}; return mkChip(parent, text, Object.assign({ size: 30, col: C.ink }, o)); };
  const popSet = (el, t, t0, x, y) => { el.set(P(t, t0, 0.35, linear)); if (x !== undefined) tr(el, x, y); };
  const lookAt = (x, sx) => clamp((sx - x) / 260, -1, 1);
  const outline = (el, col, w) => { el.setAttribute('stroke', col); el.setAttribute('stroke-width', w); el.setAttribute('paint-order', 'stroke'); el.setAttribute('stroke-linejoin', 'round'); return el; };
  const pill = (parent, text, o) => {
    o = o || {};
    const g = G(parent), m = mkText(g, 0, 0, text, { size: o.size || 34, anchor: 'middle', fill: C.ink, boldFill: o.bold || GOLD });
    const w = m.w + 60, h = Math.max(64, m.h + 26);
    const r = E('rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: Math.min(32, h / 2), fill: 'rgba(10,27,39,0.9)', stroke: o.col || GOLD, 'stroke-width': 3 }, g);
    g.insertBefore(r, m); tr(m, 0, -m.top - m.h / 2);
    return g;
  };
  const paper = (parent, x, y, w, h) => { const g = G(parent); E('rect', { x: x + 6, y: y + 8, width: w, height: h, rx: 18, fill: 'rgba(90,20,50,0.18)' }, g); E('rect', { x, y, width: w, height: h, rx: 18, fill: MK.paper, stroke: BERRY, 'stroke-width': 4 }, g); return g; };
  /* a card that somersaults (vertical flip) from one face to the next: faces are mkMath sources */
  function flipCard(parent, faces, o) {
    o = o || {};
    const g = G(parent), inner = G(g), w = o.w || 150, h = o.h || 130, s = o.size || 62;
    E('rect', { x: -w / 2 + 5, y: -h / 2 + 7, width: w, height: h, rx: 16, fill: 'rgba(90,20,50,0.2)' }, inner);
    E('rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: 16, fill: '#FFFFFF', stroke: INK, 'stroke-width': 4 }, inner);
    const F = faces.map(([src, col]) => { const m = mkMath(inner, 0, 0, src, { size: s, anchor: 'middle', fill: col || INK }); tr(m, 0, (m.a - m.d) / 2); return m; });
    g.inner = inner;
    // p: 0..1 through one somersault from face a to face b; hop: height of the jump
    g.flip = (p, a, b, hop) => {
      p = clamp(p);
      const k = Math.max(0.03, Math.abs(Math.cos(Math.PI * p)));
      inner.setAttribute('transform', `translate(0 ${(-(hop === undefined ? 40 : hop) * Math.sin(Math.PI * p)).toFixed(1)}) scale(1 ${k.toFixed(3)})`);
      F.forEach((f, i) => op(f, i === (p < 0.5 ? a : b) ? 1 : 0));
    };
    g.flip(0, 0, 0);
    return g;
  }
  function cancelProd(parent, x, y, f1, f2, o) {
    const s = o.size || 84, g = G(parent), col = o.fill || INK, parts = {};
    let cx = x;
    const frac = (n, d, k) => {
      const w = Math.max(textWidth(String(n), s, FD, 700), textWidth(String(d), s, FD, 700)) + s * 0.34, c = cx + w / 2;
      const ny = y - s * 0.2, dy = y + s * 0.92;
      T(g, c, ny, String(n), { size: s, weight: 700, anchor: 'middle', fill: col });
      E('rect', { x: cx, y: y - s * 0.05, width: w, height: s * 0.1, rx: s * 0.05, fill: col }, g);
      T(g, c, dy, String(d), { size: s, weight: 700, anchor: 'middle', fill: col });
      parts['n' + k] = { c, y: ny, w: textWidth(String(n), s, FD, 700), top: true };
      parts['d' + k] = { c, y: dy, w: textWidth(String(d), s, FD, 700), top: false };
      cx += w;
    };
    frac(f1[0], f1[1], 1);
    cx += s * 0.22; T(g, cx + s * 0.3, y + s * 0.26, '×', { size: s * 0.9, weight: 700, anchor: 'middle', fill: col }); cx += s * 0.6 + s * 0.22;
    frac(f2[0], f2[1], 2);
    g.right = cx;
    const links = (o.links || []).map(([a, b, lc]) => {
      const A = parts[a], B = parts[b];
      return mkDash(E('path', { d: `M${A.c.toFixed(1)},${(A.y - s * 0.3).toFixed(1)} L${B.c.toFixed(1)},${(B.y - s * 0.3).toFixed(1)}`, stroke: lc, 'stroke-width': 4, opacity: 0.45, fill: 'none', 'stroke-linecap': 'round' }, g));
    });
    const strikes = {}, reps = {};
    for (const k in o.reps) {
      const A = parts[k], lc = o.cols[k], hw = A.w / 2 + 8;
      strikes[k] = mkDash(E('path', { d: `M${(A.c - hw).toFixed(1)},${(A.y + 4).toFixed(1)} L${(A.c + hw).toFixed(1)},${(A.y - s * 0.66).toFixed(1)}`, stroke: lc, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' }, g));
      reps[k] = T(g, A.c + A.w / 2 + 6, A.top ? A.y - s * 0.62 : A.y + s * 0.5, o.reps[k], { size: Math.round(s * 0.52), weight: 800, anchor: 'start', fill: lc });
    }
    g.link = (i, p) => { op(links[i], p > 0 ? 1 : 0); mkDraw(links[i], p); };
    g.cancel = (k, p) => { op(strikes[k], p > 0 ? 1 : 0); mkDraw(strikes[k], p); op(reps[k], clamp((p - 0.6) / 0.4)); };
    return g;
  }
  // a pizza lying flat on the party table (front view), 4 quarters
  function flatPizza(parent) {
    const g = G(parent);
    E('ellipse', { cx: 0, cy: 0, rx: 80, ry: 20, fill: '#F4F7FA', stroke: '#8F9CAB', 'stroke-width': 3 }, g);
    g.pz = G(g);
    E('ellipse', { cx: 0, cy: -4, rx: 66, ry: 15, fill: '#E9A951', stroke: '#8A5A20', 'stroke-width': 3 }, g.pz);
    E('ellipse', { cx: 0, cy: -5, rx: 56, ry: 11, fill: '#FFE7A8' }, g.pz);
    E('path', { d: 'M-30,-8 a5,3 0 1 0 10,0 a5,3 0 1 0 -10,0 M14,-2 a5,3 0 1 0 10,0 a5,3 0 1 0 -10,0 M-6,-12 a5,3 0 1 0 10,0 a5,3 0 1 0 -10,0', fill: '#D6304A' }, g.pz);
    E('path', { d: 'M-66,-4 L66,-4 M0,-19 L0,11', stroke: '#8A5A20', 'stroke-width': 2.5 }, g.pz);
    return g;
  }

  /* ---------- layers ---------- */
  const Lbg = G(root), Lins = G(root), Lcast = G(root), Lfront = G(root), Ltop = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= A: the party table ================= */
  const voidShot = G(Lbg);
  const vd = fcVoid(voidShot);
  Lfront.appendChild(vd.front);
  const flats = [250, 430, 990].map(x => { const p = flatPizza(Ltop); tr(p, x, 558); return p; });
  const pWitch = pill(Lfg, '**12** slices out of **3** pizzas?!', { size: 34, col: '#FF8A8A', bold: '#FF8A8A' });
  const cup = fcCup(Ltop, { s: 0.85 });
  const cJug = chipAt(Lfg, 'lime juice: {{2 1/4}} litres', { col: '#B8E35A', size: 30 });
  const cCup = chipAt(Lfg, 'a cup: {{3/8}} litre', { col: '#B8E35A', size: 30 });
  const pHow = pill(Lfg, 'How many **cups**?', { size: 36 });
  const bubEighth = mkSpeechBubble(Lfg, 'I get {{1/8}}! The **biggest**!', { size: 34, tail: 'right' });

  /* ================= overhead shots ================= */
  const overShot = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#F59CC4' }, overShot);
  { let d = ''; for (let y = 24, r = 0; y < 760; y += 52, r++) for (let x = r % 2 ? 26 : 0; x < 1230; x += 52) d += `M${x - 5},${y} a5,5 0 1 0 10,0 a5,5 0 1 0 -10,0 `;
    E('path', { d, fill: '#FFFFFF', opacity: 0.32 }, overShot); }
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: glow('#FFFFFF'), opacity: 0.25 }, overShot);

  /* --- O1: three pizzas --- */
  const shotP = G(Lins);
  const PX = [330, 600, 870], PY = 300, PR = 100;
  const pizzas = PX.map(x => { const p = fcPizza(shotP, { r: PR, n: 4 }); tr(p, x, PY); return p; });
  const cuts = [];
  PX.forEach(x => {
    cuts.push(mkDash(E('path', { d: `M${x},${PY - PR - 8} L${x},${PY + PR + 8}`, stroke: '#FFF6DE', 'stroke-width': 6, 'stroke-linecap': 'round', fill: 'none' }, shotP)));
    cuts.push(mkDash(E('path', { d: `M${x - PR - 8},${PY} L${x + PR + 8},${PY}`, stroke: '#FFF6DE', 'stroke-width': 6, 'stroke-linecap': 'round', fill: 'none' }, shotP)));
  });
  const sliceNums = [];
  PX.forEach((x, k) => [0, 1, 2, 3].forEach(i => {
    const a = -Math.PI / 2 + (i + 0.5) * TAU / 4, r = PR * 0.5 + 30;
    const w = outline(T(shotP, x + Math.cos(a) * r, PY + Math.sin(a) * r + 14, String(k * 4 + i + 1), { size: 40, weight: 800, anchor: 'middle', fill: '#FFFFFF' }), '#2A1A22', 8);
    sliceNums.push(w);
  }));
  const c3pm = chipAt(Lfg, '**3 p.m.**', { col: GOLD, size: 32 });
  const cQuarters = chipAt(Lfg, 'each one cut into **quarters**', { col: GOLD, size: 30 });
  const pQ = pill(shotP, 'How many {{1/4}} **fit** into **3**?', { size: 34 });
  const mDiv = mkMath(shotP, 600, 528, '3 ÷ 1/4', { size: 66, anchor: 'middle', fill: INK, halo: '#FFFFFF' });
  const mDiv12 = mkMath(shotP, 600, 528, '3 ÷ 1/4 = 12', { size: 66, anchor: 'middle', fill: GREEN, halo: '#FFFFFF' });
  const cSmall = chipAt(shotP, '**÷** makes things **smaller**?', { col: '#FF8A8A', size: 30 });
  const thinkLess = mkThoughtBubble(Lfg, 'less than **3** slices', { size: 28, tail: 'left' });
  const cFour = chipAt(shotP, '**4** quarters in each pizza', { col: GOLD, size: 30 });

  /* --- O2: the board card --- */
  const shotC = G(Lins);
  paper(shotC, 230, 120, 940, 420);
  // recip
  const recG = G(shotC);
  mkText(recG, 700, 176, 'Times by your **reciprocal**: you get **1**', { size: 34, anchor: 'middle', fill: INK, boldFill: BERRY });
  const RC = [[330, 290], [790, 290], [330, 450], [790, 450]];
  const rc1 = flipCard(recG, [['2/5'], ['5/2', GREEN]]);
  const rc2 = flipCard(recG, [['7'], ['1/7', GREEN]]);
  const rc3 = flipCard(recG, [['1 3/4'], ['7/4'], ['4/7', GREEN]]);
  const rc0 = flipCard(recG, [['0']]);
  [rc1, rc2, rc3, rc0].forEach((c, i) => tr(c, RC[i][0], RC[i][1]));
  const rn1 = mkMath(recG, 430, 302, '2/5 × 5/2 = 1', { size: 36, fill: INK });
  const rn2 = mkMath(recG, 890, 302, '7 × 1/7 = 1', { size: 36, fill: INK });
  const rn3 = mkMath(recG, 430, 462, '1 3/4 = 7/4 -> 4/7', { size: 36, fill: INK });
  const rn0 = mkText(recG, 890, 462, '0: **no** reciprocal', { size: 34, fill: RED });
  // kcf
  const kcfG = G(shotC);
  mkText(kcfG, 700, 182, 'To **divide** by a fraction, multiply by its **reciprocal**', { size: 32, anchor: 'middle', fill: INK, boldFill: BERRY });
  const kw = [['KEEP', BLUE, 420], ['CHANGE', '#E07A1A', 700], ['FLIP!', RED, 975]].map(([w, c, x]) => { const g = G(kcfG); outline(T(g, 0, 0, w, { size: 66, weight: 800, anchor: 'middle', fill: c, ls: 2 }), '#FFFFFF', 6); g.x = x; return g; });
  const kSub = [['a/b', 420], ['÷ -> ×', 700], ['c/d -> d/c', 975]].map(([src, x]) => mkMath(kcfG, x, 352, src, { size: 40, anchor: 'middle', fill: '#5A4A52' }));
  const kForm = mkMath(kcfG, 700, 480, 'a/b ÷ c/d = a/b × d/c', { size: 64, anchor: 'middle', fill: INK });
  // both / second
  const bsG = G(shotC);
  const bHead = mkText(bsG, 700, 176, 'Flip them **both**?', { size: 36, anchor: 'middle', fill: RED });
  const sHead = mkText(bsG, 700, 176, 'Only the **second** one flips: the **divisor**', { size: 34, anchor: 'middle', fill: INK, boldFill: GREEN });
  const bc1 = flipCard(bsG, [['2/3'], ['3/2', RED]], { size: 66 });
  const bc2 = flipCard(bsG, [['4/5'], ['5/4', RED], ['5/4', GREEN]], { size: 66 });
  tr(bc1, 400, 320); tr(bc2, 660, 320);
  const opDiv = T(bsG, 530, 344, '÷', { size: 70, weight: 700, anchor: 'middle', fill: INK });
  const opMul = T(bsG, 530, 344, '×', { size: 70, weight: 700, anchor: 'middle', fill: GREEN });
  const divLab = mkText(bsG, 660, 438, 'the **divisor**', { size: 30, anchor: 'middle', fill: GREEN });
  const bRes = mkMath(bsG, 760, 344, '= 10/12 = 5/6', { size: 62, fill: INK });
  const bRing = E('rect', { x: 0, y: 0, width: 1, height: 1, rx: 10, fill: 'none', stroke: GREEN, 'stroke-width': 5 }, bsG);
  const stampNo = fcStamp(bsG, false);
  // improper (lime juice)
  const impG = G(shotC);
  mkText(impG, 700, 180, '**Improper first**, then keep, change, flip', { size: 34, anchor: 'middle', fill: INK, boldFill: GREEN });
  const wImp = mkWorking(impG, 640, 236, ['2 1/4 ÷ 3/8 = 9/4 ÷ 3/8', '= 9/4 × 8/3'], { size: 60, fill: INK, gap: 26 });
  // six cups
  const sixG = G(shotC);
  mkText(sixG, 700, 176, 'Cancel: **9** with **3**, **8** with **4**', { size: 34, anchor: 'middle', fill: INK, boldFill: BERRY });
  const prod6 = cancelProd(sixG, 330, 300, [9, 4], [8, 3], { size: 80, reps: { n1: '3', d2: '1', n2: '2', d1: '1' },
    cols: { n1: RED, d2: RED, n2: BLUE, d1: BLUE }, links: [['n1', 'd2', RED], ['n2', 'd1', BLUE]] });
  const res6 = mkMath(sixG, prod6.right + 30, 318, '= (3 × 2)/(1 × 1) = 6', { size: 60, fill: INK });
  const cups6 = [0, 1, 2, 3, 4, 5].map(i => { const c = fcCup(sixG, { s: 0.62 }); tr(c, 420 + i * 72, 528); return c; });
  const lab6 = mkText(sixG, 880, 512, '**6** cups', { size: 40, anchor: 'start', fill: GREEN });
  // last 3/4 pizza for 6 kids
  const lastG = G(shotC);
  const pz4 = fcPizza(lastG, { r: 120, n: 4 }); tr(pz4, 400, 330);
  const pz8 = fcPizza(lastG, { r: 120, n: 8 }); tr(pz8, 400, 330);
  const kidN = [];
  for (let i = 0; i < 6; i++) { const a = -Math.PI / 2 + (i + 0.5) * TAU / 8, r = 120 * 0.58; const w = outline(T(lastG, 400 + Math.cos(a) * r, 330 + Math.sin(a) * r + 12, String(i + 1), { size: 32, weight: 800, anchor: 'middle', fill: '#FFFFFF' }), '#2A1A22', 7); kidN.push(w); }
  const lastT = mkText(lastG, 400, 506, '{{3/4}} of a pizza, **6** kids', { size: 30, anchor: 'middle', fill: INK });
  const wLast = mkWorking(lastG, 760, 220, ['3/4 ÷ 6 = 3/4 × 1/6', '= 3/24', '= 1/8'], { size: 50, fill: INK, gap: 22 });
  const lastEach = mkText(lastG, 900, 506, '**each**', { size: 34, anchor: 'start', fill: GREEN });

  /* ================= the cast ================= */
  const kav = cast(Lcast, 'kavya');
  const priya = cast(Lcast, 'priya');
  const mum = cast(Lcast, 'mum', { hand: true });
  const boy = cast(Lcast, 'boy', { hat: '#4CC9F0' });
  const flip = cast(Ltop, 'flip');
  // Mum's pizza cutter and the lime jug (in her raised hand)
  const cutter = G(mum.hand); tr(cutter, 0, 0, 1, 16);
  E('rect', { x: -7, y: -40, width: 14, height: 56, rx: 6, fill: '#E8424F', stroke: SC_INK, 'stroke-width': 3 }, cutter);
  E('circle', { cx: 0, cy: -66, r: 28, fill: '#DDE5EC', stroke: SC_INK, 'stroke-width': 3.5 }, cutter);
  E('circle', { cx: 0, cy: -66, r: 6, fill: '#8F9CAB' }, cutter);
  const jugH = G(mum.hand); tr(jugH, 10, 34, 0.6, 16);
  const jug = fcJug(jugH, {});
  // Ah Boy's slice
  const slice = G(boy.hand); tr(slice, 0, -6, 1, 16);
  E('path', { d: 'M-34,-120 Q0,-136 34,-120 L2,-10 Z', fill: '#E9A951', stroke: '#8A5A20', 'stroke-width': 4, 'stroke-linejoin': 'round' }, slice);
  E('path', { d: 'M-26,-112 Q0,-124 26,-112 L2,-24 Z', fill: '#FFE7A8' }, slice);
  E('path', { d: 'M-8,-92 a7,7 0 1 0 14,0 a7,7 0 1 0 -14,0 M2,-60 a6,6 0 1 0 12,0 a6,6 0 1 0 -12,0', fill: '#D6304A' }, slice);
  const lt = fcLowerThird(Lhud, 'flip');
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* ---------- shots ---------- */
  const cut = id => at(id) - 0.06;
  const SHOTS = [['O1', -9], ['A', cut('witch')], ['O2', cut('recip')], ['A2', cut('jug')], ['O3', cut('improper')], ['A3', cut('eighth')]];
  const shotAt = t => { let s = 'O1'; for (const [k, t0] of SHOTS) if (t >= t0) s = k; return s; };
  const WX = { kav: 140, priya: 320, flip: 600, mum: 870, boy: 1060 }, WY = 452, WS = 0.9;
  const SL = [125, 640], SR = [1078, 646], SS = 0.72;
  const FLIPY = 556 - 118 * 0.6;
  const spins = [mid('recip', 0.3), mid('recip', 0.46), mid('recip', 0.72), mid('kcf', 0.9), mid('second', 0.3), end('six') - 0.2];

  return t => {
    const sh = shotAt(t), who = scWho(S, t);
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const wide = sh[0] === 'A';
    op(voidShot, wide ? 1 : 0); op(vd.front, wide ? 1 : 0); op(overShot, wide ? 0 : 1);
    op(shotP, sh === 'O1' ? 1 : 0); op(shotC, sh === 'O2' || sh === 'O3' ? 1 : 0);
    vd.upd(t * AMP);
    flats.forEach(f => op(f, wide ? 1 : 0)); op(cup, sh === 'A2' ? 1 : 0);
    [c3pm, cQuarters, cJug, cCup, bubEighth, thinkLess].forEach(c => c.set(0));
    [pWitch, pHow].forEach(p => op(p, 0));
    lt.set(0);
    const shown = { kav: 0, priya: 0, mum: 0, boy: 0, flip: 0 };
    op(cutter, 0); op(jugH, 0); op(slice, 0);
    const show = (key, c, x, y, s, st, r) => { shown[key] = 1; c.set(Object.assign({ t }, st)); tr(c, x, y, s, r || 0); };
    const spinAng = spins.reduce((a, s0) => a + 360 * P(t, s0, 0.55, ease), 0);

    /* ---------- O1: three pizzas ---------- */
    if (sh === 'O1') {
      const inS = t >= at('smaller'), inF = t >= at('fit');
      cuts.forEach((c, i) => mkDraw(c, P(t, mid('three', 0.45) + i * 0.22, 0.25, linear) * (inF ? 0 : 1)));
      cuts.forEach(c => op(c, inF ? 0 : 1));
      pizzas.forEach((p, k) => [0, 1, 2, 3].forEach(i => p.lift(i, inF ? P(t, mid('fit', 0.12) + k * 0.15, 0.4, ease) : 0)));
      sliceNums.forEach((n, i) => op(n, inF ? P(t, mid('fit', 0.25) + i * 0.17, 0.12, linear) : 0));
      if (!inS) {
        popSet(c3pm, t, at('three') + 0.1, 760, 130);
        popSet(cQuarters, t, mid('three', 0.6), 600, 520);
      }
      op(pQ, inF ? P(t, at('fit') + 0.1, 0.3, linear) : 0); tr(pQ, 600, 130);
      op(mDiv, inS && !inF ? P(t, mid('smaller', 0.12), 0.3, linear) : 0);
      cSmall.set(inS && !inF ? P(t, mid('smaller', 0.35), 0.3, linear) : 0); tr(cSmall, 790, 616);
      if (inS && !inF) popSet(thinkLess, t, mid('smaller', 0.7), 385, 628);
      cFour.set(inF ? P(t, mid('fit', 0.4), 0.3, linear) * (1 - P(t, mid('fit', 0.82), 0.2, linear)) : 0); tr(cFour, 600, 520);
      op(mDiv12, inF ? P(t, mid('fit', 0.84), 0.3, linear) : 0);
      // slots
      if (!inS) {
        show('mum', mum, SL[0], SL[1] - 4, SS, { talk: 0, mood: 'happy', look: 0.8, lift: t > mid('three', 0.35) ? 1 : 0 });
        op(cutter, 1);
        show('boy', boy, SR[0], SR[1] + 6, SS, { talk: 0, mood: 'happy', look: -0.8 });
      } else if (!inF) {
        show('boy', boy, SL[0], SL[1] + 6, SS, { talk: talk(t, 'boy'), mood: 'smug', look: 0.8, lift: t > mid('smaller', 0.1) && t < mid('smaller', 0.7) ? 1 : 0 });
        show('kav', kav, SR[0], SR[1], SS, { talk: 0, mood: t > mid('smaller', 0.5) ? 'deadpan' : 'neutral', look: -0.8 });
      } else {
        show('kav', kav, SL[0], SL[1], SS, { talk: talk(t, 'kavya'), mood: t > mid('fit', 0.85) ? 'smug' : 'neutral', look: 0.8 });
        show('boy', boy, SR[0], SR[1] + 6, SS, { talk: 0, mood: t > mid('fit', 0.6) ? 'shock' : 'neutral', look: -0.8 });
      }
    }

    /* ---------- A: party table ---------- */
    if (wide) {
      const spk = who === 'boy' ? WX.boy : who === 'flip' ? WX.flip : who === 'mum' ? WX.mum : WX.flip;
      const flipIn = sh === 'A' ? t >= at('flip') - 0.25 : true;
      const eaten = sh === 'A3';
      flats.forEach(f => op(f.pz, eaten ? 0 : 1));
      let bm = 'happy', km = 'neutral', pm = 'smug', mm = 'happy';
      if (sh === 'A') {
        if (t < at('flip')) { bm = 'shock'; km = 'smug'; pm = 'deadpan'; mm = 'happy'; }
        else { bm = 'shock'; km = 'neutral'; pm = 'shock'; mm = 'shock'; if (t > mid('flip', 0.6)) { bm = 'happy'; pm = 'smug'; mm = 'happy'; } }
      } else if (sh === 'A2') { bm = 'neutral'; km = 'neutral'; pm = 'smug'; mm = 'happy'; }
      else { bm = 'happy'; km = 'deadpan'; pm = 'deadpan'; mm = 'happy'; }
      show('kav', kav, WX.kav, WY, WS, { talk: talk(t, 'kavya'), mood: km, look: eaten && t > mid('eighth', 0.5) ? 0 : lookAt(WX.kav, spk) });
      show('priya', priya, WX.priya, WY, WS, { talk: talk(t, 'priya'), mood: pm, look: lookAt(WX.priya, spk) });
      show('mum', mum, WX.mum, WY - 6, WS, { talk: talk(t, 'mum'), mood: mm, look: lookAt(WX.mum, spk), lift: sh === 'A2' && t > mid('jug', 0.08) ? 1 : 0 });
      op(jugH, sh === 'A2' ? 1 : 0);
      show('boy', boy, WX.boy, WY + 10, WS, { talk: talk(t, 'boy'), mood: bm, look: lookAt(WX.boy, spk), lift: eaten ? 1 : 0, sweat: sh === 'A' && t < at('flip') ? 1 : 0 });
      op(slice, eaten ? 1 : 0);
      if (flipIn) {
        let x = WX.flip, y = FLIPY, r = 0, arms = 0, s = 0.6;
        if (sh === 'A') {
          const j = P(t, at('flip') - 0.25, 0.9, linear);
          y = lerp(820, FLIPY, easeOut(clamp(j * 1.6))) - 140 * Math.sin(Math.PI * clamp(j)) * (j > 0.3 ? 1 : 0);
          r = 360 * ease(P(t, at('flip') + 0.2, 0.6, linear));
          arms = t > at('flip') + 0.9 ? 1 : 0;
          lt.set(win(t, at('flip') + 0.3, at('flip') + 3.6, 0.3));
        } else { arms = sh === 'A3' ? 1 : 0; }
        show('flip', flip, x, y, s, { talk: talk(t, 'flip'), mood: sh === 'A3' ? 'happy' : 'happy', look: lookAt(x, spk), arms }, r);
      }
      if (sh === 'A' && t < at('flip')) { op(pWitch, P(t, mid('witch', 0.2), 0.3, linear)); tr(pWitch, 600, 250); }
      if (sh === 'A2') {
        tr(cup, 700, 560);
        popSet(cJug, t, mid('jug', 0.12), 830, 220);
        popSet(cCup, t, mid('jug', 0.45), 560, 320);
        op(pHow, P(t, mid('jug', 0.75), 0.3, linear)); tr(pHow, 380, 230);
      }
      if (eaten) popSet(bubEighth, t, mid('eighth', 0.15), 760, 250);
    }

    /* ---------- O2 / O3: the card ---------- */
    if (sh === 'O2' || sh === 'O3') {
      const ln = t < at('kcf') ? 'recip' : t < at('both') ? 'kcf' : t < at('second') ? 'both' : t < at('jug') ? 'second' : t < at('six') ? 'improper' : t < at('last') ? 'six' : 'last';
      op(recG, ln === 'recip' ? 1 : 0); op(kcfG, ln === 'kcf' ? 1 : 0); op(bsG, ln === 'both' || ln === 'second' ? 1 : 0);
      op(impG, ln === 'improper' ? 1 : 0); op(sixG, ln === 'six' ? 1 : 0); op(lastG, ln === 'last' ? 1 : 0);
      if (ln === 'recip') {
        const T1 = mid('recip', 0.22), T2 = mid('recip', 0.4), T3a = mid('recip', 0.52), T3 = mid('recip', 0.66), T0 = mid('recip', 0.86);
        [rc1, rc2, rc3, rc0].forEach((c, i) => op(c, P(t, at('recip') + 0.1 + i * 0.12, 0.25, linear)));
        rc1.flip(P(t, T1, 0.55, linear), 0, 1);
        rc2.flip(P(t, T2, 0.55, linear), 0, 1);
        if (t < T3) rc3.flip(0, t < T3a ? 0 : 1, 1); else rc3.flip(P(t, T3, 0.55, linear), 1, 2);
        // zero tries to flip and flops back down
        const z = P(t, T0, 0.9, linear);
        rc0.flip(0, 0, 0); rc0.inner.setAttribute('transform', `translate(0 ${(-14 * Math.sin(Math.PI * z)).toFixed(1)}) rotate(${(12 * Math.sin(3 * Math.PI * z) * (1 - z)).toFixed(1)})`);
        op(rn1, P(t, T1 + 0.5, 0.3, linear)); op(rn2, P(t, T2 + 0.5, 0.3, linear)); op(rn3, P(t, T3a, 0.3, linear)); op(rn0, P(t, T0 + 0.3, 0.3, linear));
      } else if (ln === 'kcf') {
        op(kcfG.childNodes[0], P(t, at('kcf') + 0.05, 0.3, linear));
        op(kForm, P(t, mid('kcf', 0.35), 0.3, linear));
        kw.forEach((g, i) => { const p = P(t, mid('kcf', 0.6 + i * 0.12), 0.4, pop); op(g, clamp(p * 3)); tr(g, g.x, 280, Math.max(0.01, 0.5 + 0.5 * p)); op(kSub[i], P(t, mid('kcf', 0.66 + i * 0.12), 0.3, linear)); });
      } else {
        const inSec = ln === 'second';
        op(bHead, inSec ? 0 : 1); op(sHead, inSec ? P(t, at('second') + 0.05, 0.3, linear) : 0);
        if (!inSec) {
          const fb = P(t, mid('both', 0.62), 0.55, linear);
          bc1.flip(fb, 0, 1); bc2.flip(fb, 0, 1);
          op(opDiv, 1); op(opMul, 0); op(divLab, 0); op(bRes, 0); op(bRing, 0);
          stampNo.set(P(t, mid('both', 0.9), 0.35, linear)); tr(stampNo, 760, 476, 0.56);
        } else {
          stampNo.set(0);
          bc1.flip(P(t, mid('second', 0.14), 0.55, linear), 1, 0);   // pushed back on its feet
          bc2.flip(0, t < mid('second', 0.3) ? 1 : 2, 2);
          const ch = P(t, mid('second', 0.42), 0.3, linear);
          op(opDiv, 1 - ch); op(opMul, ch);
          op(divLab, P(t, mid('second', 0.3), 0.3, linear));
          op(bRes, P(t, mid('second', 0.62), 0.3, linear));
          op(bRing, P(t, mid('second', 0.85), 0.3, linear));
          attr(bRing, 'x', bRes.x0 + bRes.w - 64); attr(bRing, 'y', 344 - bRes.a - 6); attr(bRing, 'width', 70); attr(bRing, 'height', bRes.a + bRes.d + 12);
        }
      }
      if (ln === 'improper') {
        wImp.show(0, P(t, at('improper') + 0.1, 0.35, linear) * 1);
        // the line arrives in two beats: the improper conversion, then keep-change-flip
        wImp.show(1, P(t, mid('improper', 0.62), 0.35, linear));
        wImp.hl(0, P(t, mid('improper', 0.3), 0.3, linear) * (1 - P(t, mid('improper', 0.6), 0.3, linear)));
      }
      if (ln === 'six') {
        prod6.link(0, P(t, mid('six', 0.12), 0.3, linear)); prod6.cancel('n1', P(t, mid('six', 0.16), 0.35, linear)); prod6.cancel('d2', P(t, mid('six', 0.22), 0.35, linear));
        prod6.link(1, P(t, mid('six', 0.32), 0.3, linear)); prod6.cancel('n2', P(t, mid('six', 0.36), 0.35, linear)); prod6.cancel('d1', P(t, mid('six', 0.42), 0.35, linear));
        op(res6, P(t, mid('six', 0.55), 0.3, linear));
        cups6.forEach((c, i) => { op(c, P(t, mid('six', 0.6) + i * 0.12, 0.2, linear)); c.set(0.85 * P(t, mid('six', 0.65) + i * 0.12, 0.35, linear)); });
        op(lab6, P(t, mid('six', 0.9), 0.3, linear));
      }
      if (ln === 'last') {
        const cutP = P(t, mid('last', 0.3), 0.3, linear);
        op(pz4, 1 - cutP); pz4.set(3); op(pz8, cutP); pz8.set(6);
        pz8.lift(0, P(t, mid('last', 0.82), 0.4, ease));
        kidN.forEach((n, i) => op(n, P(t, mid('last', 0.34) + i * 0.1, 0.15, linear)));
        op(lastT, P(t, at('last') + 0.1, 0.3, linear));
        wLast.show(0, P(t, mid('last', 0.45), 0.35, linear)); wLast.show(1, P(t, mid('last', 0.68), 0.3, linear)); wLast.show(2, P(t, mid('last', 0.8), 0.3, linear));
        wLast.ring(2, P(t, mid('last', 0.86), 0.3, linear));
        op(lastEach, P(t, mid('last', 0.86), 0.3, linear));
      }
      // the cast in the corners
      const fl = (x, y, st) => show('flip', flip, x, y, 0.6, Object.assign({ talk: talk(t, 'flip'), mood: 'happy' }, st), spinAng);
      if (ln === 'recip' || ln === 'kcf') {
        fl(SL[0] + 5, 640, { look: 0.7, arms: (ln === 'kcf' && t > mid('kcf', 0.9) + 0.5) || (ln === 'recip' && t > mid('recip', 0.9)) ? 1 : 0 });
        show('boy', boy, SR[0], SR[1] + 6, SS, { talk: 0, mood: t > mid('recip', 0.85) && ln === 'recip' ? 'neutral' : 'happy', look: -0.8 });
      } else if (ln === 'both') {
        show('priya', priya, SL[0], SL[1], SS, { talk: talk(t, 'priya'), mood: t > mid('both', 0.9) ? 'shock' : 'smug', look: 0.8 });
        fl(SR[0], 640, { look: -0.7, mood: t > mid('both', 0.65) ? 'shock' : 'happy', arms: 0 });
      } else if (ln === 'second') {
        fl(SL[0] + 5, 640, { look: 0.7, arms: t > mid('second', 0.9) ? 1 : 0 });
        show('priya', priya, SR[0], SR[1], SS, { talk: 0, mood: t > mid('second', 0.6) ? 'annoyed' : 'neutral', look: -0.8 });
      } else if (ln === 'improper') {
        show('kav', kav, SL[0], SL[1], SS, { talk: talk(t, 'kavya'), mood: 'neutral', look: 0.8 });
        show('mum', mum, SR[0], SR[1] - 4, SS, { talk: 0, mood: 'happy', look: -0.8 });
      } else if (ln === 'six') {
        fl(SL[0] + 5, 640, { look: 0.7, arms: t > mid('six', 0.85) ? 1 : 0 });
        show('kav', kav, SR[0], SR[1], SS, { talk: 0, mood: t > mid('six', 0.6) ? 'happy' : 'neutral', look: -0.8 });
      } else {
        show('mum', mum, SL[0], SL[1] - 4, SS, { talk: talk(t, 'mum'), mood: 'happy', look: 0.8 });
        show('boy', boy, SR[0], SR[1] + 6, SS, { talk: 0, mood: t > mid('last', 0.85) ? 'happy' : 'neutral', look: -0.8 });
      }
    }

    op(kav, shown.kav); op(priya, shown.priya); op(mum, shown.mum); op(boy, shown.boy); op(flip, shown.flip);
  };
});
