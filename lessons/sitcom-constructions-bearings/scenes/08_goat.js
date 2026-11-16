/* Scene 8: Gertie's circle (loci and special angles, stretch).
   Shots (hard sitcom cuts):
   G  5.30 p.m., a kampong garden: the treasure box on the grass, Gertie the goat (lower third) tied to a post.
   K  the top-down card (1 m = 30 px): the post and Gertie's 5 m rope -> "Can she reach?" -> Madame Compassa
      pirouettes the circle: every point 5 m from the post, a LOCUS -> the box is 6 m away, outside: safe ->
      less than 5 m: inside, dashed; at least 5 m: solid -> the post is really a 10 m rail -> every point within
      5 m of the rail: two straight sides and two semicircles, a running track, and the box is inside it.
   G  Gertie slides along the rail and eats the waffles; everyone in shock -> Mr Tan: tie-breaker, construct 60°.
   K  Compassa: arc from A cutting the line at B, the same radius from B, crossing at C (Euclid, Elements, Book 1,
      Proposition 1) -> Kavya: AB = AC = BC, equilateral, 60°; bisect: 30°; perpendicular: 90°; bisect: 45°.
   G  Mr Tan opens the box: empty -> Gertie, crumbs on her beard: "What waffles?" -> Ah Boy: NEVER EAT SOGGY WAFFLES! */
scene('goat', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const GOLD = '#FFE45C', RED = '#C62828', BLUE = '#1E5BB8', GREEN = '#1E8E50', VIO = '#7A5CFF', PINK = '#E0457B';
  const INK = MK.ink;
  const chipOn = (c, t, t0, t1, x, y) => { c.set(t >= t0 && t < t1 ? P(t, t0, 0.35, linear) : 0); if (x !== undefined) tr(c, x, y); };
  const fadeOn = (el, t, t0, d) => { const p = P(t, t0, d || 0.3, easeOut); op(el, p); return p; };
  const ticks = (parent, x1, y1, x2, y2, n, col) => {   // equal-length tick marks across the middle of a segment
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L;
    let d = '';
    for (let i = 0; i < n; i++) { const o = (i - (n - 1) / 2) * 10, cx = mx + ux * o, cy = my + uy * o; d += `M${(cx - uy * 13).toFixed(1)},${(cy + ux * 13).toFixed(1)} L${(cx + uy * 13).toFixed(1)},${(cy - ux * 13).toFixed(1)} `; }
    return E('path', { d, stroke: col || INK, 'stroke-width': 4, 'stroke-linecap': 'round' }, parent);
  };
  /* Madame Compassa placed by her NEEDLE tip at (x, y), turned th degrees (the pencil points along th, screen
     degrees), fx 1 (needle left) or -1, a = half-opening (from 02_quarry.js) */
  const CL = 168, CHY = -54;
  const placeC = (c, x, y, s, th, fx, a) => {
    const ar = a * Math.PI / 180, nx = -Math.sin(ar) * CL, ny = CHY + Math.cos(ar) * CL, r = th * Math.PI / 180;
    const lx = fx * s * nx, ly = s * ny;
    const X = x - (lx * Math.cos(r) - ly * Math.sin(r)), Y = y - (lx * Math.sin(r) + ly * Math.cos(r));
    c.setAttribute('transform', `translate(${X.toFixed(2)} ${Y.toFixed(2)}) rotate(${th.toFixed(2)}) scale(${(fx * s).toFixed(4)} ${s.toFixed(4)})`);
  };
  const openFor = (r, s) => Math.asin(r / (2 * CL * s)) * 180 / Math.PI;
  const outline = (el, col, w) => { el.setAttribute('stroke', col); el.setAttribute('stroke-width', w); el.setAttribute('paint-order', 'stroke'); el.setAttribute('stroke-linejoin', 'round'); return el; };

  /* ---------- layers ---------- */
  const Lset = G(root), Lpaper = G(root), Lcast = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= the kampong garden ================= */
  const set = cbIsland(Lset, 'kampong');
  const flag = cbFlag(set.mid, 0.8); tr(flag, 1150, 560);
  const post = G(set.mid);
  E('rect', { x: -9, y: -120, width: 18, height: 130, rx: 4, fill: '#8A5A2A', stroke: '#4A2A10', 'stroke-width': 3 }, post);
  E('circle', { cx: 0, cy: -12, r: 12, fill: 'none', stroke: '#9AA6B2', 'stroke-width': 5 }, post);
  const gert = cast(set.mid, 'gertie', { s: 0.85 });
  const kav = cast(set.mid, 'kavya'), dad = cast(set.mid, 'dad'), boy = cast(set.mid, 'boy'),
    mum = cast(set.mid, 'mum'), pri = cast(set.mid, 'priya'), tan = cast(set.mid, 'tan', { prop: null, hand: true });
  const HY = { kav: 452, dad: 445, boy: 466, mum: 445, pri: 450, tan: 445 };
  const HS = { kav: 0.84, dad: 0.86, boy: 0.8, mum: 0.84, pri: 0.82, tan: 0.86 };
  // the rail (in front of the bushes) with the ring her rope slides on
  const railG = G(Lcast);
  E('path', { d: 'M40,566 L640,566', stroke: '#7D8A96', 'stroke-width': 9, 'stroke-linecap': 'round' }, railG);
  E('path', { d: 'M40,566 L640,566', stroke: '#D9E1E8', 'stroke-width': 3, 'stroke-linecap': 'round' }, railG);
  [50, 630].forEach(x => E('rect', { x: x - 7, y: 566, width: 14, height: 40, fill: '#8A5A2A', stroke: '#4A2A10', 'stroke-width': 3 }, railG));
  const ring = G(Lcast);
  E('circle', { r: 14, fill: 'none', stroke: '#5A6670', 'stroke-width': 6 }, ring);
  const ropeG = E('path', { d: '', fill: 'none', stroke: '#B08A4A', 'stroke-width': 7, 'stroke-linecap': 'round' }, Lcast);
  const box = cbWaffles(Lcast);
  const crumbs = G(Lfg);
  [[-10, 0], [8, 6], [0, 14], [14, -6], [-16, 12]].forEach(([x, y], i) => E('circle', { cx: x, cy: y, r: i % 2 ? 4 : 5, fill: '#C98A3A', stroke: '#8A5A1A', 'stroke-width': 1.5 }, crumbs));
  // chips (garden)
  const cTime = mkChip(Lfg, '**5:30 p.m.** A kampong garden', { size: 30, col: GOLD });
  const cTie = mkChip(Lfg, '**TIE-BREAKER!**', { size: 34, col: '#FFFFFF', fill: '#C62828', stroke: '#FFE45C' });
  const cTie2 = mkChip(Lfg, 'construct {{60°}} with **compasses only**', { size: 30, col: GOLD });
  const cEmpty = mkChip(Lfg, '**EMPTY.**', { size: 36, col: '#FFFFFF', fill: '#5A3A1A', stroke: GOLD });
  const cGulp = mkChip(Lfg, '*munch*', { size: 30, col: '#FFFFFF' });
  const soggyG = G(Lfg);
  const sg1 = outline(T(soggyG, 0, 0, 'NEVER EAT', { size: 76, weight: 800, anchor: 'middle', fill: GOLD, ls: 2 }), '#3A2410', 10);
  const sg2 = outline(T(soggyG, 0, 90, 'SOGGY WAFFLES!', { size: 76, weight: 800, anchor: 'middle', fill: GOLD, ls: 2 }), '#3A2410', 10);

  /* ================= the top-down card (1 m = 30 px) ================= */
  const K = G(Lpaper);
  cbPaper(K, 430, 108, 740, 554, { grid: true, cell: 30 });
  const U = 30, Pp = [640, 400], Bx = [640 + 4.8 * U, 400 - 3.6 * U];   // the box: 4.8 m across, 3.6 m up: 6 m from the post
  const titles = {};
  const title = (key, s) => { titles[key] = mkText(K, 800, 162, s, { size: 32, fill: INK, anchor: 'middle', boldFill: VIO }); };
  title('rope', "Gertie's rope: **5 m** long");
  title('locus', '**locus**: every point {{5 "m"}} from the post');
  title('think', '**Less than** or **at least**?');
  title('rail', 'the rope slides along a **10 m rail**');
  title('track', 'every point within {{5 "m"}} of the **rail**');
  title('sixty', 'Construct **60°**: compasses only');
  title('equi', '{{AB = AC = BC}}: **equilateral**');
  const mainG = G(K);
  // the running track (drawn under everything)
  const trackD = `M${Pp[0]},${Pp[1] - 5 * U} L${Pp[0] + 10 * U},${Pp[1] - 5 * U} A${5 * U},${5 * U} 0 0 1 ${Pp[0] + 10 * U},${Pp[1] + 5 * U} L${Pp[0]},${Pp[1] + 5 * U} A${5 * U},${5 * U} 0 0 1 ${Pp[0]},${Pp[1] - 5 * U} Z`;
  const trackFill = E('path', { d: trackD, fill: 'rgba(47,163,107,0.18)' }, mainG);
  const trackLine = mkDash(E('path', { d: trackD, fill: 'none', stroke: GREEN, 'stroke-width': 5, 'stroke-linejoin': 'round' }, mainG));
  const ghost = E('circle', { cx: Pp[0], cy: Pp[1], r: 5 * U, fill: 'rgba(122,92,255,0.08)', stroke: VIO, 'stroke-width': 3, 'stroke-dasharray': '10 8' }, mainG);
  const circFill = E('circle', { cx: Pp[0], cy: Pp[1], r: 5 * U, fill: 'rgba(122,92,255,0.1)' }, mainG);
  const circ = cbArc(mainG, Pp[0], Pp[1], 5 * U, -30, 329.6, { col: VIO, width: 5 });
  const railK = E('path', { d: `M${Pp[0]},${Pp[1]} L${Pp[0] + 10 * U},${Pp[1]}`, stroke: '#5A6670', 'stroke-width': 9, 'stroke-linecap': 'round' }, mainG);
  mkDash(railK);
  const rail10 = mkText(mainG, Pp[0] + 5 * U, Pp[1] + 40, '**10 m** rail', { size: 28, fill: '#3A4A58', anchor: 'middle', halo: MK.paper });
  const semiL = mkText(mainG, Pp[0] - 76, Pp[1] + 10, 'semi-\ncircle', { size: 26, fill: GREEN, anchor: 'middle', weight: 700, halo: MK.paper });
  const semiR = mkText(mainG, Pp[0] + 10 * U + 76, Pp[1] + 10, 'semi-\ncircle', { size: 26, fill: GREEN, anchor: 'middle', weight: 700, halo: MK.paper });
  const straightT = mkText(mainG, Pp[0] + 5 * U + 80, Pp[1] - 5 * U - 12, 'straight side', { size: 26, fill: GREEN, anchor: 'middle', weight: 700, halo: MK.paper });
  const straightB = mkText(mainG, Pp[0] + 5 * U, Pp[1] + 5 * U + 32, 'straight side', { size: 26, fill: GREEN, anchor: 'middle', weight: 700, halo: MK.paper });
  // the rope and the goat (top-down), moving with the ring
  const ropeK = E('path', { d: '', stroke: '#B08A4A', 'stroke-width': 5, 'stroke-linecap': 'round' }, mainG);
  const rope5 = mkText(mainG, 0, 0, '**5 m**', { size: 30, fill: '#8A5A1A', anchor: 'middle', halo: MK.paper });
  const goatTop = G(mainG);
  E('ellipse', { rx: 22, ry: 15, fill: '#FFFFFF', stroke: INK, 'stroke-width': 3 }, goatTop);
  E('circle', { cx: 22, cy: 0, r: 10, fill: '#FFFFFF', stroke: INK, 'stroke-width': 3 }, goatTop);
  E('path', { d: 'M24,-8 l10,-8 M24,8 l10,8', stroke: '#C9B48A', 'stroke-width': 4, 'stroke-linecap': 'round' }, goatTop);
  const postK = G(mainG);
  E('circle', { r: 11, fill: '#8A5A2A', stroke: '#4A2A10', 'stroke-width': 3 }, postK);
  const postLab = mkText(mainG, Pp[0] - 4, Pp[1] - 22, 'post', { size: 26, fill: '#4A2A10', anchor: 'middle', weight: 700, halo: MK.paper });
  // the box
  const boxK = G(mainG);
  E('rect', { x: -26, y: -18, width: 52, height: 36, rx: 5, fill: '#B07A45', stroke: INK, 'stroke-width': 3 }, boxK);
  E('path', { d: 'M-26,-4 L26,-4', stroke: '#8A5A2A', 'stroke-width': 3 }, boxK);
  E('rect', { x: -14, y: 1, width: 28, height: 11, rx: 2, fill: '#FFE45C' }, boxK);
  tr(boxK, Bx[0], Bx[1]);
  const boxLab = mkText(mainG, Bx[0] + 40, Bx[1] + 10, 'box', { size: 26, fill: '#8A3A10', weight: 800, halo: MK.paper });
  const cReach = mkChip(mainG, '**?**', { size: 34, col: RED, fill: '#FFFFFF' }); tr(cReach, Bx[0] + 50, Bx[1] - 44);
  const dash6 = cbSeg(mainG, Pp[0], Pp[1], Bx[0], Bx[1], { col: RED, width: 4, dash: '10 7' });
  const lab6 = mkText(mainG, (Pp[0] + Bx[0]) / 2 + 22, (Pp[1] + Bx[1]) / 2 + 22, '**6 m**', { size: 30, fill: RED, halo: MK.paper });
  const cSafe = G(mainG);
  { const c = mkChip(cSafe, '{{6 "m" > 5 "m"}}: outside, **safe!**', { size: 30, col: GREEN, fill: '#FFFFFF' }); c.set(1); const tk = tick(cSafe, 16, GREEN); tr(tk, c.w / 2 + 30, 0); }
  tr(cSafe, 780, 618);
  const cIn = G(mainG);
  { const c = mkChip(cIn, 'the box is **inside**!', { size: 30, col: RED, fill: '#FFFFFF' }); c.set(1); }
  tr(cIn, 800, 618);
  // less than / at least
  const thinkG = G(K);
  { const L0 = [620, 380], R0 = [985, 380], r = 110;
    E('circle', { cx: L0[0], cy: L0[1], r, fill: 'rgba(122,92,255,0.2)', stroke: VIO, 'stroke-width': 5, 'stroke-dasharray': '14 10' }, thinkG);
    E('path', { d: `M${R0[0] - 160},${R0[1] - 150} L${R0[0] + 160},${R0[1] - 150} L${R0[0] + 160},${R0[1] + 150} L${R0[0] - 160},${R0[1] + 150} Z M${R0[0] + r},${R0[1]} A${r},${r} 0 1 0 ${R0[0] - r},${R0[1]} A${r},${r} 0 1 0 ${R0[0] + r},${R0[1]} Z`, fill: 'rgba(122,92,255,0.2)', 'fill-rule': 'evenodd' }, thinkG);
    E('circle', { cx: R0[0], cy: R0[1], r, fill: 'none', stroke: VIO, 'stroke-width': 5 }, thinkG);
    [L0, R0].forEach(c => { E('circle', { cx: c[0], cy: c[1], r: 9, fill: '#8A5A2A' }, thinkG); E('path', { d: `M${c[0]},${c[1]} L${c[0] + r},${c[1]}`, stroke: '#B08A4A', 'stroke-width': 4 }, thinkG); mkText(thinkG, c[0] + r / 2, c[1] - 12, '**5 m**', { size: 26, fill: '#8A5A1A', anchor: 'middle', halo: '#E8E2F8' }); });
    thinkG.l = mkText(thinkG, L0[0], 568, '**less than** 5 m:\ninside, **dashed** line', { size: 28, fill: INK, anchor: 'middle', boldFill: VIO });
    thinkG.r = mkText(thinkG, R0[0], 568, '**at least** 5 m:\n**solid** line, on it or outside', { size: 28, fill: INK, anchor: 'middle', boldFill: VIO });
  }
  // the 60° construction: A, B on a line, radius 200 px
  const sixG = G(K);
  const A = [490, 540], B = [690, 540], Cc = [590, 540 - 200 * Math.sqrt(3) / 2];
  const baseL = cbSeg(sixG, 460, 540, 800, 540, { width: 5 });
  const arcA = cbArc(sixG, A[0], A[1], 200, 12, -76, { col: VIO, width: 4.5 });
  const arcB = cbArc(sixG, B[0], B[1], 200, -104, -192, { col: PINK, width: 4.5 });
  const segAC = cbSeg(sixG, A[0], A[1], Cc[0], Cc[1], { width: 5 }), segBC = cbSeg(sixG, B[0], B[1], Cc[0], Cc[1], { width: 5 });
  const dA = cbDot(sixG, A[0], A[1], 'A', { dx: -8, dy: 38 }), dB = cbDot(sixG, B[0], B[1], 'B', { dx: 6, dy: 38 }),
    dC = cbDot(sixG, Cc[0], Cc[1], 'C', { dx: 0, dy: -20, col: '#B0123E' });
  const ang60 = mkAngleMark(sixG, A[0], A[1], 0, 60, { r: 54, col: '#E08A00', label: '**60°**', size: 30, lr: 88 });
  const tk3 = G(sixG);
  ticks(tk3, A[0], A[1], B[0], B[1], 1, '#E08A00'); ticks(tk3, A[0], A[1], Cc[0], Cc[1], 1, '#E08A00'); ticks(tk3, B[0], B[1], Cc[0], Cc[1], 1, '#E08A00');
  const cEuclid = mkChip(sixG, 'Euclid, **Elements**, Book 1, Prop. 1 (about 300 BC)', { size: 26, col: '#B0123E', fill: '#FFFFFF' }); tr(cEuclid, 800, 622);
  // four special angles, one under another
  const minis = [[60, '**60°** equilateral'], [30, '**30°** bisect 60°'], [90, '**90°** perpendicular'], [45, '**45°** bisect 90°']].map(([a, s], i) => {
    const g = G(sixG), v = [836, 268 + i * 104], L = 84;
    E('path', { d: `M${v[0]},${v[1]} L${v[0] + L},${v[1]} M${v[0]},${v[1]} L${(v[0] + L * Math.cos(a * Math.PI / 180)).toFixed(1)},${(v[1] - L * Math.sin(a * Math.PI / 180)).toFixed(1)}`, stroke: INK, 'stroke-width': 4, 'stroke-linecap': 'round' }, g);
    mkAngleMark(g, v[0], v[1], 0, a, { r: 34, col: '#E08A00', right: a === 90 }).set(1);
    mkText(g, v[0] + 100, v[1] - 6, s, { size: 26, fill: INK, boldFill: '#B85C00' });
    return g;
  });

  /* ---------- the cartoon cast ---------- */
  const cmp = cast(Lcast, 'compassa', { s: 0.7 });

  /* ---------- HUD ---------- */
  const LT = cbLowerThird(Lhud, 'gertie');
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* ---------- cuts ---------- */
  const k = id => at(id) - 0.06;
  const cK = k('rope'), cG2 = k('munch'), cK2 = k('sixty'), cS = k('share'), cW = k('what'), cY = k('soggy');
  const sLocus = mid('locus', 0.1), eLocus = mid('locus', 0.72);
  const a5 = openFor(5 * U, 0.7), a200 = openFor(200, 0.8);
  const MUNCH0 = at('munch') - 0.2, MUNCH1 = end('munch') + 0.5;

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    set.upd(t * AMP);
    const sG1 = on(t, -9, cK), sK = on(t, cK, cG2), sG2 = on(t, cG2, cK2), sK2 = on(t, cK2, cS), sS = on(t, cS, cW), sW = on(t, cW, cY), sY = on(t, cY, 1e9);
    const garden = sG1 || sG2 || sS || sW || sY, cardOn = sK || sK2;
    const who = scWho(S, t);

    /* ---------- where everyone stands ---------- */
    const slot2 = t < at('safe') ? 'boy' : 'kav';
    let POS, GP;   // humans: key -> x;  Gertie: [x, y, s]
    if (sG1 || sG2) {
      POS = { kav: 690, boy: 820, dad: 950, tan: 1080 };
      const slide = sG2 ? P(t, MUNCH0, 0.8, ease) : 0;
      GP = [lerp(240, 400, slide), 462, 0.85];
    } else if (sK) { POS = { [slot2]: 310 }; GP = [112, 470, 0.72]; }
    else if (sK2) { POS = { tan: 110, kav: 300 }; GP = null; }
    else if (sS) { POS = { tan: 680, mum: 790, pri: 915, kav: 1030, boy: 1130 }; GP = [420, 462, 0.85]; }
    else if (sW) { POS = { tan: 1010 }; GP = [400, 410, 1.25]; }
    else { POS = { boy: 380 }; GP = [1010, 470, 0.85]; }
    const H = { kav, dad, boy, mum, pri, tan };
    for (const key in H) { const x = POS[key]; op(H[key], x === undefined ? 0 : 1); if (x !== undefined) tr(H[key], x, HY[key], HS[key]); }
    if (sY) tr(boy, 380, 392, 1.35);
    const spkX = { kavya: POS.kav, dad: POS.dad, boy: POS.boy, mum: POS.mum, priya: POS.pri, tan: POS.tan, gertie: GP ? GP[0] : undefined, compassa: 800 }[who];
    const lookAt = x => { const tx = spkX !== undefined && spkX !== x ? spkX : (cardOn ? 800 : (GP ? GP[0] : 600)); return clamp((tx - x) / 260, -0.9, 0.9); };
    const munching = t > MUNCH0 && t < cK2;
    // reactions
    const shockMunch = sG2 && t > mid('munch', 0.3);
    kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: shockMunch ? 'shock' : sS ? (t > mid('share', 0.7) ? 'deadpan' : 'happy') : who === 'kavya' ? 'smug' : 'neutral', look: POS.kav !== undefined ? lookAt(POS.kav) : 0 });
    dad.set({ t, talk: scTalk(S, t, 'dad'), mood: shockMunch ? 'shock' : 'neutral', look: POS.dad !== undefined ? lookAt(POS.dad) : 0, sweat: shockMunch ? 1 : 0 });
    { let m = 'happy', lift = 0;
      if (t < at('locus')) m = who === 'boy' ? 'sad' : 'neutral';
      if (shockMunch) m = 'shock';
      if (sS) m = t > mid('share', 0.7) ? 'sad' : 'happy';
      if (sY) { m = 'shock'; lift = 1; }
      if (who === 'boy' && t < at('locus')) lift = 1;
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: m, look: POS.boy !== undefined ? lookAt(POS.boy) : 0, lift, sweat: sY ? 1 : 0 }); }
    mum.set({ t, talk: 0, mood: t > mid('share', 0.7) ? 'shock' : 'happy', look: POS.mum !== undefined ? lookAt(POS.mum) : 0 });
    pri.set({ t, talk: 0, mood: t > mid('share', 0.7) ? 'annoyed' : 'smug', look: POS.pri !== undefined ? lookAt(POS.pri) : 0 });
    const tanOpen = P(t, mid('share', 0.45), 0.5, ease);
    tan.set({ t, talk: scTalk(S, t, 'tan'), mood: sW ? 'deadpan' : sS ? (t > mid('share', 0.7) ? 'shock' : 'happy') : who === 'tan' ? 'happy' : shockMunch ? 'neutral' : 'neutral',
      look: POS.tan !== undefined ? (sS ? -0.6 : lookAt(POS.tan)) : 0, lift: (who === 'tan' && !sS) || (sS && t > mid('share', 0.35) && t < mid('share', 0.75)) ? 1 : 0 });

    /* ---------- Gertie ---------- */
    op(gert, GP ? 1 : 0);
    if (GP) {
      tr(gert, GP[0], GP[1], GP[2]);
      const chew = munching || sK2 ? 0.25 + 0.25 * Math.sin(t * 13) : 0;
      let m = 'deadpan';
      if (t >= at('rail') && t < end('track') + 0.2) m = 'smug';
      if (sW || sY) m = 'smug';
      gert.set({ t, talk: Math.max(scTalk(S, t, 'gertie'), munching ? chew : 0), mood: m, look: sK ? 0.8 : sY ? -0.8 : munching ? 0.6 : sW ? 0.3 : 0.5 });
    }
    // garden: post or rail + ring, the rope from her collar to it
    op(post, sG1 && t < at('rail') ? 1 : 0); tr(post, 70, 566);
    const railOn = garden && GP && !sW && !sY && t >= at('rail');
    op(railG, railOn ? 1 : 0); op(ring, railOn ? 1 : 0); op(ropeG, garden && GP && !sW && !sY ? 1 : 0);
    if (railOn) {
      const rx = GP[0] - 170;
      tr(ring, Math.max(70, rx), 566);
    }
    if (garden && GP && !sW && !sY) {
      const ex = railOn ? Math.max(70, GP[0] - 170) : 70, ey = railOn ? 566 : 554;
      attr(ropeG, 'd', `M${GP[0] - 48},${GP[1] + 70} Q${(GP[0] - 48 + ex) / 2},${GP[1] + 110} ${ex},${ey}`);
    }
    // the box in the garden
    op(box, garden && !sY && !sW ? 1 : 0);
    let bOpen = 0, bK = 4;
    if (sG2) { bOpen = P(t, MUNCH0 + 0.5, 0.4, ease) * (1 - P(t, MUNCH1, 0.4, ease)); bK = 4 - 4 * P(t, MUNCH0 + 0.8, end('munch') - MUNCH0 - 0.6, linear); }
    if (sS || sW) { bOpen = sW ? 1 : tanOpen; bK = 0; }
    box.set(bOpen * 0.55, bK);
    tr(box, 600, 700, 0.8);
    op(crumbs, sW ? 1 : 0); tr(crumbs, GP ? GP[0] + 2 : 0, GP ? GP[1] + 104 * (GP[2]) : 0, 1.3);
    // garden chips
    chipOn(cTime, t, at('garden') + 0.2, cK, 880, 118);
    LT.set(sG1 ? win(t, mid('garden', 0.45), mid('garden', 0.45) + 3.3, 0.3) : 0);
    chipOn(cGulp, t, mid('munch', 0.2), at('tie'), 560, 300);
    chipOn(cTie, t, at('tie') + 0.05, cK2, 820, 128);
    chipOn(cTie2, t, mid('tie', 0.35), cK2, 820, 200);
    chipOn(cEmpty, t, mid('share', 0.62), cW, 600, 270);
    op(soggyG, sY);
    if (sY) { const p = P(t, at('soggy') + 0.05, 0.4, pop); op(soggyG, clamp(p * 3)); soggyG.setAttribute('transform', `translate(770 190) scale(${Math.max(0.01, 0.6 + 0.4 * p).toFixed(3)}) rotate(${(-3 + Math.sin(t * 9) * 1.5 * AMP).toFixed(2)})`); }

    /* ---------- the card ---------- */
    op(K, cardOn);
    for (const key in titles) op(titles[key], 0);
    op(mainG, 0); op(thinkG, 0); op(sixG, 0);
    op(cmp, 0);
    if (sK) {
      const line = t < at('locus') ? 'rope' : t < at('think') ? 'locus' : t < at('rail') ? 'think' : t < at('track') ? 'rail' : 'track';
      op(titles[line], 1);
      if (line === 'think') {
        op(thinkG, 1);
        op(thinkG.l, P(t, mid('think', 0.08), 0.3, linear)); op(thinkG.r, P(t, mid('think', 0.5), 0.3, linear));
      } else {
        op(mainG, 1);
        // the ring position on the rail (it slides in 'rail')
        const slideP = t >= at('rail') ? 0.5 - 0.5 * Math.cos(P(t, mid('rail', 0.35), 2.2, linear) * TAU) : 0;
        const ringX = Pp[0] + 10 * U * (line === 'rail' ? slideP : 0);
        tr(postK, ringX, Pp[1]);
        op(postLab, line === 'rope' || line === 'locus' ? 1 : 0);
        const railP = line === 'rail' ? P(t, at('rail') + 0.2, 0.6, linear) : line === 'track' ? 1 : 0;
        op(railK, railP > 0 ? 1 : 0); mkDraw(railK, railP); op(rail10, railP > 0.9 ? 1 : 0);
        // rope and goat: at 150° (screen) from the ring
        const showGoat = line === 'rope' || line === 'rail';
        const ga = 150 * Math.PI / 180, gx = ringX + Math.cos(ga) * 5 * U, gy = Pp[1] + Math.sin(ga) * 5 * U;
        const ropeOn = line === 'rope' || line === 'locus' || line === 'rail';
        op(ropeK, ropeOn ? 1 : 0); attr(ropeK, 'd', `M${ringX},${Pp[1]} L${gx.toFixed(1)},${gy.toFixed(1)}`);
        op(rope5, ropeOn ? 1 : 0); tr(rope5, (ringX + gx) / 2 + 16, (Pp[1] + gy) / 2 - 16);
        op(goatTop, showGoat ? 1 : 0); tr(goatTop, gx, gy, 1, 150 + 180);
        // the circle
        const cp = line === 'rope' ? 0 : line === 'locus' ? P(t, sLocus + 0.5, eLocus - sLocus - 0.5, ease) : 1;
        circ.set(cp); op(circFill, line === 'locus' ? clamp(cp * 3 - 2) : line === 'rope' ? 0 : line === 'track' ? 0 : 1);
        if (line === 'track') op(circ, 1 - P(t, mid('track', 0.5), 0.4, linear));
        // the box
        op(boxK, line === 'rope' && t < at('reach') - 0.1 ? 0 : 1); op(boxLab, line === 'rope' && t < at('reach') - 0.1 ? 0 : 1);
        cReach.set(t >= at('reach') && t < at('locus') ? P(t, at('reach') + 0.1, 0.3, linear) : 0);
        const sp = line === 'locus' && t >= at('safe') - 0.1 ? 1 : 0;
        op(dash6, 0); op(lab6, 0); op(cSafe, 0); op(cIn, 0);
        if (t >= at('safe') && t < at('think')) {
          dash6.set(P(t, at('safe') + 0.1, 0.6, linear)); op(lab6, P(t, mid('safe', 0.3), 0.3, linear));
          op(cSafe, P(t, mid('safe', 0.55), 0.3, linear));
        }
        // track: a ghost circle slides along the rail, then the track
        op(ghost, 0); op(trackFill, 0); op(trackLine, 0); [semiL, semiR, straightT, straightB].forEach(e => op(e, 0));
        if (line === 'track') {
          const gp = P(t, at('track') + 0.2, 1.6, ease);
          op(ghost, gp < 1 ? 1 : 1 - P(t, at('track') + 1.8, 0.4, linear)); attr(ghost, 'cx', Pp[0] + 10 * U * gp);
          op(trackLine, 1); mkDraw(trackLine, P(t, mid('track', 0.15), 1.2, linear));
          op(trackFill, P(t, mid('track', 0.3), 0.4, linear));
          op(straightT, P(t, mid('track', 0.32), 0.3, linear)); op(straightB, P(t, mid('track', 0.36), 0.3, linear));
          op(semiL, P(t, mid('track', 0.48), 0.3, linear)); op(semiR, P(t, mid('track', 0.52), 0.3, linear));
          op(cIn, P(t, mid('track', 0.8), 0.3, linear));
        }
        // Madame Compassa: draws the circle (locus); stands aside (track)
        if (line === 'locus' && t < at('safe')) {
          op(cmp, P(t, at('locus'), 0.25, linear));
          const ph = -30 + 360 * P(t, sLocus + 0.5, eLocus - sLocus - 0.5, ease);
          placeC(cmp, Pp[0], Pp[1], 0.7, ph, 1, a5);
          cmp.set({ t, talk: scTalk(S, t, 'compassa'), mood: 'smug', look: 0, open: a5, arms: 1, still: true });
          placeC(cmp, Pp[0], Pp[1], 0.7, ph, 1, a5);
        } else if (line === 'track') {
          op(cmp, 1); tr(cmp, 1108, 222, 0.5);
          cmp.set({ t, talk: scTalk(S, t, 'compassa'), mood: 'smug', look: -0.6, arms: 1 });
        }
      }
    }
    if (sK2) {
      const line = t < at('equi') ? 'sixty' : 'equi';
      op(titles[line], 1); op(sixG, 1);
      baseL.set(P(t, at('sixty') + 0.05, 0.4, linear));
      // Compassa: needle on A, arc through B and C; same radius from B, arc through C
      const p1 = P(t, mid('sixty', 0.12), 1.2, ease), p2 = P(t, mid('sixty', 0.42), 1.2, ease);
      arcA.set(p1); arcB.set(p2);
      op(dB, p1 > 0.15 ? 1 : 0); op(dC, p2 > 0.98 ? 1 : 0);
      const rc = P(t, mid('sixty', 0.7), 0.5, linear);
      segAC.set(rc); segBC.set(rc);
      cEuclid.set(line === 'sixty' ? P(t, mid('sixty', 0.78), 0.4, linear) : 0);
      if (line === 'sixty' && t < mid('sixty', 0.7)) {
        op(cmp, 1);
        const onB = t > mid('sixty', 0.36);
        const th = onB ? lerp(-192, -104, p2) : lerp(12, -76, p1);
        // needle on A: pencil sweeps from 12° to -76°; needle on B: mirrored (fx -1), pencil angle th
        if (!onB) placeC(cmp, A[0], A[1], 0.8, th, 1, a200);
        else placeC(cmp, B[0], B[1], 0.8, th + 180, -1, a200);
        cmp.set({ t, talk: scTalk(S, t, 'compassa'), mood: 'smug', look: 0, open: a200, arms: 0.8, still: true });
        if (!onB) placeC(cmp, A[0], A[1], 0.8, th, 1, a200); else placeC(cmp, B[0], B[1], 0.8, th + 180, -1, a200);
      }
      op(tk3, line === 'equi' ? P(t, at('equi') + 0.2, 0.3, linear) : 0);
      ang60.set(line === 'equi' ? P(t, mid('equi', 0.2), 0.5, linear) : 0);
      const mt = [0.22, 0.42, 0.6, 0.82];
      minis.forEach((g, i) => op(g, line === 'equi' ? P(t, mid('equi', mt[i]), 0.3, linear) : 0));
    }
  };
});
