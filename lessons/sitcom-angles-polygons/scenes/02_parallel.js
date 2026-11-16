/* Scene 2: Para and Lel never meet (angles in parallel lines).
   10 a.m., the bare kitchen floor from above: Dad snaps two chalk lines -> they open their eyes: Para and Lel, parallel
   lines married forty years who have never met -> Trevor the transversal zooms across both (they lean apart in shock)
   -> 115 degrees at Para; the four angle marks slide down Trevor and land on Lel: copy, paste -> eight angles, two
   sizes: 115 and 180 - 115 = 65 -> F (corresponding, equal), Z (alternate, equal) -> Dad: co-interior are equal?
   REJECTED: C, they add to 180 -> Ah Boy's mnemonic -> Trevor leans to 52 degrees: Priya's co-interior 128 and p,
   p = 180 - 128 = 52, APPROVED. */
scene('parallel', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 3, color: o.color || C.ink, weight: 700 }); };
  const GOLD = '#FFE45C', OR = '#D9480F', BL = '#1864AB', GR = '#2B8A3E', RED = '#FF6B6B', TRACE = '#FFD43B';
  const R2D = Math.PI / 180;

  /* layers: floor, diagram, busts, HUD */
  const Lbg = G(root), Lchar = G(root), Ltrace = G(root), Lfig = G(root), Lcast = G(root), Lhud = G(root);

  /* ================= the bare floor, from above ================= */
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#4A5568' }, Lbg);
  agFloor(Lbg, { pattern: 'bare' });

  /* ================= geometry (all true to size) ================= */
  const PS = 1.3, PX = 380, PY = 340, GAP = 120 * PS;
  const paraY = PY - GAP / 2, lelY = PY + GAP / 2, LX0 = PX - 120 * PS, LX1 = PX + 300 * PS;
  const TX = 480, TY = 340;
  const ix = (y, A) => TX + (TY - y) / Math.tan(A * R2D);
  const Pp = A => [ix(paraY, A), paraY], Lp = A => [ix(lelY, A), lelY];
  const P65 = Pp(65), L65 = Lp(65), P52 = Pp(52), L52 = Lp(52);

  /* plain chalk lines (before they wake up) */
  const chalk = G(Lchar);
  const chalkLines = [paraY, lelY].map(y => {
    const g = G(chalk);
    const a = mkDash(E('path', { d: `M${LX0},${y} L${LX1},${y}`, stroke: SC_INK, 'stroke-width': 22 * PS, 'stroke-linecap': 'round' }, g));
    const b = mkDash(E('path', { d: `M${LX0},${y} L${LX1},${y}`, stroke: '#F4F1E8', 'stroke-width': 14 * PS, 'stroke-linecap': 'round' }, g));
    const dust = [0, 1, 2, 3, 4].map(i => E('circle', { r: 10 + i * 3, fill: '#FFFFFF', opacity: 0.6 }, g));
    return { a, b, dust, y };
  });

  /* Para and Lel; Trevor */
  const parlel = cast(Lchar, 'parlel');
  const trevG = G(Lchar);
  const trev = cast(trevG, 'trev');
  // pulsing rings round the arrow marks (hi)
  const rings = [paraY, lelY].map(y => E('circle', { cx: PX + 158 * PS, cy: y, r: 30, fill: 'none', stroke: '#E8424F', 'stroke-width': 5 }, Lfig));

  /* angle marks: four at a crossing, around (0, 0), for a transversal at A degrees */
  const COL = { 115: OR, 65: BL };
  function crossing(parent, A, labels) {
    const g = G(parent), dirs = [[0, A], [A, 180], [180, 180 + A], [180 + A, 360]];
    const wedges = G(g), arcs = [], labs = [], wedge = [];
    dirs.forEach(([a1, a2], k) => {
      const deg = Math.round(a2 - a1), col = labels && labels[k] ? labels[k][1] : COL[deg] || OR;
      const w = mkAngleMark(wedges, 0, 0, a1, a2, { r: 40, col, fill: col === OR ? 'rgba(255,146,43,0.55)' : col === BL ? 'rgba(77,171,247,0.55)' : 'rgba(81,207,102,0.55)', width: 0.01 });
      w.set(1); op(w, 0); wedge.push(w);
      const m = mkAngleMark(g, 0, 0, a1, a2, { r: 40, col, width: 6 }); m.set(1); arcs.push(m);
      const md = (a1 + a2) / 2 * R2D, lr = 80;
      const txt = labels && labels[k] ? labels[k][0] : deg + '°';
      const lb = mkMath(g, Math.cos(md) * lr, -Math.sin(md) * lr + 11, txt, { size: 32, anchor: 'middle', fill: col, weight: 700, halo: '#FFFFFF' });
      labs.push(lb);
    });
    return { g, arcs, labs, wedge };
  }
  const xP = crossing(Lfig, 65), xL = crossing(Lfig, 65);
  tr(xP.g, P65[0], P65[1]);
  const x128 = crossing(Lfig, 52, [null, null, null, ['128°', OR]]);
  const xp = crossing(Lfig, 52, [['p', GR], null, null, null]);
  const p52lab = mkMath(xp.g, 112, -26, 'p = 52°', { size: 32, anchor: 'middle', fill: GR, weight: 700, halo: '#FFFFFF' });
  tr(x128.g, P52[0], P52[1]); tr(xp.g, L52[0], L52[1]);
  [0, 1, 2].forEach(k => { op(x128.arcs[k], 0); op(x128.labs[k], 0); });
  [1, 2, 3].forEach(k => { op(xp.arcs[k], 0); op(xp.labs[k], 0); });

  /* traces: F, Z, C (and C again for 52 degrees) */
  const trace = d => mkDash(E('path', { d, fill: 'none', stroke: TRACE, 'stroke-width': 18, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', opacity: 0.8 }, Ltrace));
  const up = [P65[0] + 90 * Math.cos(65 * R2D), P65[1] - 90 * Math.sin(65 * R2D)];
  const pt = p => p[0].toFixed(1) + ',' + p[1].toFixed(1);
  const trF = trace(`M${pt(up)} L${pt(P65)} L${pt(L65)} L${(L65[0] - 160).toFixed(1)},${lelY} M${pt(P65)} L${(P65[0] - 160).toFixed(1)},${paraY}`);
  const trZ = trace(`M${(P65[0] - 160).toFixed(1)},${paraY} L${pt(P65)} L${pt(L65)} L${(L65[0] + 160).toFixed(1)},${lelY}`);
  const trC = trace(`M${(P65[0] + 160).toFixed(1)},${paraY} L${pt(P65)} L${pt(L65)} L${(L65[0] + 160).toFixed(1)},${lelY}`);
  const trC2 = trace(`M${(P52[0] + 160).toFixed(1)},${paraY} L${pt(P52)} L${pt(L52)} L${(L52[0] + 160).toFixed(1)},${lelY}`);

  /* ================= the card (top right) ================= */
  const card = G(Lhud);
  E('rect', { x: 800, y: 118, width: 380, height: 190, rx: 18, fill: 'rgba(10,27,39,0.92)', stroke: C.line, 'stroke-width': 3 }, card);
  const CX = 990;
  const txt = (y, s, o) => mkText(card, (o && o.x) || CX, y, s, Object.assign({ size: 30, anchor: (o && o.x) ? 'start' : 'middle', fill: C.ink, boldFill: GOLD }, o || {}));
  const badge = (letter, col) => {
    const g = G(card);
    E('rect', { x: 818, y: 140, width: 74, height: 84, rx: 14, fill: col, stroke: SC_INK, 'stroke-width': 3 }, g);
    T(g, 855, 206, letter, { size: 70, weight: 800, anchor: 'middle', fill: SC_INK });
    return g;
  };
  const cParallel = G(card); mkText(cParallel, CX, 186, '**parallel**:', { size: 34, anchor: 'middle', fill: C.ink, boldFill: GOLD }); mkText(cParallel, CX, 244, 'same direction, always', { size: 30, anchor: 'middle', fill: C.ink });
  const cYears = G(card); mkText(cYears, CX, 186, '**40 years**', { size: 40, anchor: 'middle', fill: C.ink, boldFill: GOLD }); mkText(cYears, CX, 248, 'side by side', { size: 30, anchor: 'middle', fill: C.muted });
  const cSame = G(card); mkText(cSame, CX, 186, 'Lel is parallel, so:', { size: 30, anchor: 'middle', fill: C.ink }); mkText(cSame, CX, 248, '**same angle**, {{115°}}', { size: 34, anchor: 'middle', fill: C.ink, boldFill: GOLD });
  const cTwo = G(card);
  mkText(cTwo, CX, 166, '8 angles, **2 sizes**', { size: 30, anchor: 'middle', fill: C.ink, boldFill: GOLD });
  mkMath(cTwo, CX, 226, '180° − 115° = 65°', { size: 36, anchor: 'middle', fill: '#9FD8FF', weight: 700 });
  mkText(cTwo, CX, 280, 'angles on a straight line', { size: 26, anchor: 'middle', fill: C.muted });
  const cF = G(card); cF.appendChild(badge('F', TRACE)); mkText(cF, 910, 178, '**corresponding**', { size: 30, fill: C.ink, boldFill: GOLD }); mkText(cF, 910, 226, 'angles are **equal**', { size: 30, fill: C.ink, boldFill: '#7EE08A' });
  const cZ = G(card); cZ.appendChild(badge('Z', TRACE)); mkText(cZ, 910, 178, '**alternate**', { size: 30, fill: C.ink, boldFill: GOLD }); mkText(cZ, 910, 226, 'angles are **equal**', { size: 30, fill: C.ink, boldFill: '#7EE08A' });
  const cZsub = mkText(cZ, CX, 284, 'opposite sides of Trevor', { size: 26, anchor: 'middle', fill: C.muted });
  const cCo = G(card); mkText(cCo, CX, 186, '**co-interior**:', { size: 32, anchor: 'middle', fill: C.ink, boldFill: GOLD }); mkText(cCo, CX, 250, '**equal?**', { size: 40, anchor: 'middle', fill: C.ink, boldFill: RED });
  const cC = G(card); cC.appendChild(badge('C', TRACE)); mkText(cC, 910, 172, '**co-interior**', { size: 30, fill: C.ink, boldFill: GOLD }); mkText(cC, 910, 218, '**add to 180°**', { size: 30, fill: C.ink, boldFill: '#7EE08A' });
  mkMath(cC, CX, 282, '115° + 65° = 180°', { size: 34, anchor: 'middle', fill: '#9FD8FF', weight: 700 });
  const cMn = G(card);
  const mn1 = mkText(cMn, CX, 192, '**F** and **Z** are **equal**', { size: 34, anchor: 'middle', fill: C.ink, boldFill: GOLD });
  const mn2 = mkText(cMn, CX, 256, '**C** **C**ompletes **180°**', { size: 34, anchor: 'middle', fill: C.ink, boldFill: GOLD });
  const cW = G(card);
  const work = mkWorking(cW, 900, 132, ['p = 180° − 128°', '= 52°'], { size: 36, fill: C.ink, gap: 14 });
  const wNote = mkText(cW, CX, 286, 'co-interior angles add to 180°', { size: 26, anchor: 'middle', fill: '#7EE08A' });
  const cards = [cParallel, cYears, cSame, cTwo, cF, cZ, cCo, cC, cMn, cW];

  const c10 = pill(Lhud, '10 a.m.', { size: 34, color: GOLD, stroke: GOLD });
  const cNever = pill(Lhud, 'never met', { size: 30, color: '#FF8FC8', stroke: '#FF8FC8' });
  const cCopy = pill(Lhud, 'copy, paste!', { size: 28, color: GOLD, stroke: GOLD });
  const stRej = agStamp(Lhud, false), stOk = agStamp(Lhud, true);
  const phone = agPhone(Lhud, { speed: '2×' });

  /* ================= the cast ================= */
  const rex = cast(Lcast, 'rex');
  const boy = cast(Lcast, 'boy');
  const kav = cast(Lcast, 'kavya');
  const pri = cast(Lcast, 'priya');
  const dad = cast(Lcast, 'dad');
  op(boy.tools.scissors, 0); op(boy.tools.broom, 1);
  const lt = { parlel: agLowerThird(Lhud, 'parlel'), trev: agLowerThird(Lhud, 'trev'), priya: agLowerThird(Lhud, 'priya') };
  const ltOn = (t, who, t0) => lt[who].set(win(t, t0, t0 + 3.1, 0.3));

  return t => {
    for (const k in lt) lt[k].set(0);
    ltOn(t, 'parlel', at('hi') + 0.1);
    ltOn(t, 'trev', at('trev') + 0.1);
    ltOn(t, 'priya', at('115') + 0.05);

    /* ---------- ten: Dad snaps the chalk lines ---------- */
    const wake = P(t, at('hi') - 0.05, 0.35, linear);
    op(chalk, 1 - wake);
    chalkLines.forEach((c, i) => {
      const t0 = mid('ten', 0.3 + i * 0.3), p = P(t, t0, 0.55, easeOut);
      mkDraw(c.a, p); mkDraw(c.b, p);
      const x = lerp(LX0, LX1, p);
      c.dust.forEach((d, k) => {
        const f = clamp((t - t0 - k * 0.05) / 0.9);
        op(d, (p > 0 && f < 1 ? 0.55 * (1 - f) : 0));
        attr(d, 'cx', x - k * 26); attr(d, 'cy', c.y - 10 - f * 30 * (k % 2 ? 1 : -0.6));
      });
    });
    op(c10, 0);
    if (t < at('hi')) popIn(c10, t, mid('ten', 0.06), 990, 160);

    /* ---------- Para and Lel ---------- */
    op(parlel, wake);
    let lean = 1;
    if (t >= at('trev') && t < at('115')) lean = 1 + 0.12 * P(t, at('trev') + 0.35, 0.3, pop) * (1 - P(t, end('trev') - 0.2, 0.4, ease));
    parlel.setAttribute('transform', `translate(${PX} ${PY}) scale(${PS} ${(PS * lean).toFixed(4)})`);
    let pm = 'neutral', lm = 'neutral';
    if (t < at('trev')) { pm = t > mid('hi', 0.3) ? 'happy' : 'neutral'; lm = pm; }
    else if (t < at('115')) { pm = t > at('trev') + 0.35 ? 'shock' : 'neutral'; lm = pm; }
    else if (t >= at('mnem') && t < at('128')) { pm = 'happy'; lm = 'happy'; }
    else if (t >= at('c180') && t < at('mnem')) { pm = 'smug'; lm = 'happy'; }
    parlel.set({ t, talk: scTalk(S, t, 'para'), talkB: scTalk(S, t, 'lel'), mood: pm, moodB: lm, look: 0.3, lookB: 0.3 });
    rings.forEach((r, i) => { const w = win(t, mid('hi', 0.35), end('never'), 0.3); op(r, w * (0.6 + 0.4 * Math.sin(t * 8))); attr(r, 'r', 26 + 6 * Math.sin(t * 8)); });

    /* ---------- Trevor ---------- */
    const zoom = P(t, at('trev') - 0.1, 0.45, easeOut);
    const tilt = P(t, at('128') + 0.1, 0.6, ease);
    op(trevG, t >= at('trev') - 0.1 ? 1 : 0);
    const u = 760 * (1 - zoom);
    tr(trev, 0, 0, 1, 13 * tilt);
    tr(trevG, TX + u * Math.cos(65 * R2D), TY - u * Math.sin(65 * R2D));
    trev.set({ t, talk: scTalk(S, t, 'trev'), mood: t < at('115') ? 'happy' : t < at('c180') ? 'smug' : 'happy', look: -0.6, still: t > end('trev') });

    /* ---------- the angle marks ---------- */
    // 115: the four marks at Para, then a copy slides down Trevor onto Lel
    const marksOn = t >= at('115') && t < at('128') + 0.1;
    const fadeOld = 1 - P(t, at('128'), 0.25, linear);
    op(xP.g, marksOn ? fadeOld : 0); op(xL.g, marksOn ? fadeOld : 0);
    const slide = P(t, mid('115', 0.48), 0.7, ease);
    tr(xL.g, lerp(P65[0], L65[0], slide), lerp(P65[1], L65[1], slide));
    op(xL.g, marksOn && t > mid('115', 0.42) ? fadeOld : 0);
    xP.arcs.forEach((a, k) => a.set(P(t, mid('115', 0.06 + k * 0.05), 0.3, linear)));
    xL.arcs.forEach(a => a.set(1));
    const allLab = P(t, mid('two', 0.12), 0.3, linear);
    // highlighted pairs: [crossing, k]
    let hl = [];
    if (t >= at('corr') && t < at('alt')) hl = [[0, 1], [1, 1]];
    else if (t >= at('alt') && t < at('co')) hl = [[0, 2], [1, 0]];
    else if (t >= at('co') && t < at('mnem')) hl = [[0, 3], [1, 0]];
    const isHl = (c, k) => hl.some(h => h[0] === c && h[1] === k);
    [xP, xL].forEach((x, c) => {
      x.labs.forEach((lb, k) => {
        let v = k === 1 ? P(t, mid('115', c ? 0.82 : 0.3), 0.3, linear) : allLab;
        if (hl.length && !isHl(c, k)) v *= 0.3;
        op(lb, v);
        op(x.arcs[k], hl.length && !isHl(c, k) ? 0.35 : 1);
        op(x.wedge[k], isHl(c, k) ? P(t, Math.max(at('corr'), at(t < at('alt') ? 'corr' : t < at('co') ? 'alt' : 'co')) + 0.2, 0.3, linear) : 0);
      });
    });
    // 128: Trevor leans; the new pair
    const n128 = t >= at('128');
    op(x128.g, n128 ? 1 : 0); op(xp.g, n128 ? 1 : 0);
    x128.arcs[3].set(P(t, mid('128', 0.12), 0.35, linear)); op(x128.labs[3], P(t, mid('128', 0.2), 0.3, linear));
    xp.arcs[0].set(P(t, mid('128', 0.3), 0.35, linear));
    const solved = P(t, mid('128', 0.62), 0.3, linear);
    op(xp.labs[0], P(t, mid('128', 0.36), 0.3, linear) * (1 - solved)); op(p52lab, solved);
    op(x128.wedge[3], n128 ? P(t, mid('128', 0.4), 0.3, linear) : 0); op(xp.wedge[0], n128 ? P(t, mid('128', 0.4), 0.3, linear) : 0);

    // traces
    const trW = (el, t0, t1) => { const v = t >= t0 && t < t1 ? 1 : 0; op(el, v); mkDraw(el, P(t, t0, 0.7, ease)); };
    const m3 = (at('128') - at('mnem')) / 3;
    if (t >= at('mnem') && t < at('128')) {
      trW(trF, at('mnem'), at('mnem') + m3); trW(trZ, at('mnem') + m3, at('mnem') + 2 * m3); trW(trC, at('mnem') + 2 * m3, at('128'));
    } else {
      trW(trF, mid('corr', 0.15), at('alt')); trW(trZ, mid('alt', 0.15), at('co')); trW(trC, mid('c180', 0.3), at('mnem'));
    }
    trW(trC2, mid('128', 0.4), 1e9);

    /* ---------- the card ---------- */
    const show = (el, a, b) => { const v = t >= a && t < b ? 1 : 0; return v; };
    let cur = null, c0 = 0;
    if (t >= mid('hi', 0.3) && t < at('never')) { cur = cParallel; c0 = mid('hi', 0.3); }
    else if (t >= at('never') && t < at('trev')) { cur = cYears; c0 = mid('never', 0.1); }
    else if (t >= mid('115', 0.82) && t < at('two')) { cur = cSame; c0 = mid('115', 0.82); }
    else if (t >= at('two') && t < at('corr')) { cur = cTwo; c0 = mid('two', 0.3); }
    else if (t >= at('corr') && t < at('alt')) { cur = cF; c0 = mid('corr', 0.15); }
    else if (t >= at('alt') && t < at('co')) { cur = cZ; c0 = mid('alt', 0.15); }
    else if (t >= at('co') && t < at('c180')) { cur = cCo; c0 = mid('co', 0.3); }
    else if (t >= at('c180') && t < at('mnem')) { cur = cC; c0 = mid('c180', 0.3); }
    else if (t >= at('mnem') && t < at('128')) { cur = cMn; c0 = at('mnem') + 0.1; }
    else if (t >= at('128')) { cur = cW; c0 = mid('128', 0.45); }
    cards.forEach(c => op(c, c === cur ? 1 : 0));
    op(card.firstChild, cur ? P(t, c0 - 0.15, 0.2, linear) : 0);
    if (cur) { const p = P(t, c0, 0.3, linear); cur.style.opacity = p.toFixed(3); }
    if (cur === cMn) { op(mn1, P(t, at('mnem') + 0.1, 0.25, linear)); op(mn2, P(t, at('mnem') + 2 * m3 - 0.1, 0.25, linear)); }
    if (cur === cW) { work.set(P(t, mid('128', 0.45), 0.3, linear) + P(t, mid('128', 0.6), 0.3, linear)); op(wNote, P(t, mid('128', 0.72), 0.3, linear)); }
    if (cur === cZ) op(cZsub, P(t, mid('alt', 0.5), 0.3, linear));
    void show;

    // never met; copy, paste
    op(cNever, 0); op(cCopy, 0);
    if (t >= at('never') && t < at('trev') - 0.1) popIn(cNever, t, mid('never', 0.32), 680, PY);
    if (t >= mid('115', 0.42) && t < at('two')) popIn(cCopy, t, mid('115', 0.42), 690, PY);

    // stamps and the phone
    op(stRej, 0); op(stOk, 0); op(phone, 0);
    if (t >= mid('c180', 0.05) && t < at('mnem')) { stRej.set(P(t, mid('c180', 0.05), 0.35, linear)); tr(stRej, 885, 352, 0.45); }
    if (t >= mid('128', 0.84)) { stOk.set(P(t, mid('128', 0.84), 0.35, linear)); tr(stOk, 885, 352, 0.45); }
    if (t >= at('co') && t < at('c180')) {
      const p = popIn(phone, t, mid('co', 0.55), 930, 470, 0.38, -6);
      tr(phone.speed, 0, 122, 1 + 0.12 * Math.max(0, Math.sin(t * 9)));
      op(phone, clamp(p * 2.5) * (1 - P(t, end('co') - 0.1, 0.2, linear)));
    }

    /* ---------- the humans (busts along the bottom edge) and Rex ---------- */
    // Rex stands on the right the whole scene
    tr(rex, 1075, 420, 0.68);
    let rm = 'deadpan', rl = -0.8, tw = 0;
    if (t < at('115')) rm = t < at('trev') ? 'deadpan' : 'shock';
    else if (t >= at('two') && t < at('corr')) rm = t < mid('two', 0.6) ? 'neutral' : 'smug';
    else if (t >= at('co') && t < at('c180')) { rm = 'annoyed'; tw = t > mid('co', 0.55) ? 0.8 : 0; }
    else if (t >= at('c180') && t < at('mnem')) rm = t < mid('c180', 0.4) ? 'annoyed' : 'smug';
    else if (t >= at('mnem') && t < at('128')) { rm = 'deadpan'; rl = -0.9; }
    else if (t >= at('128')) rm = t < mid('128', 0.84) ? 'deadpan' : 'smug';
    rex.set({ t, talk: scTalk(S, t, 'rex'), mood: rm, look: rl, open: 90, twitch: tw });

    // Dad: from the start (he snapped the lines)
    tr(dad, 1035, 646, 0.78);
    let dm = 'smug', dl = -0.7, dlift = 0;
    if (t < at('hi')) { dm = 'happy'; dlift = t > mid('ten', 0.25) && t < end('ten') ? 1 : 0; }
    else if (t < at('trev')) dm = t < at('never') ? 'shock' : 'happy';
    else if (t < at('115')) dm = 'shock';
    else if (t < at('co')) dm = 'neutral';
    else if (t < at('c180')) { dm = 'smug'; dlift = 1; }
    else if (t < at('mnem')) dm = t < mid('c180', 0.15) ? 'shock' : 'sad';
    else dm = 'neutral';
    dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: dl, lift: dlift });

    // Priya pops up during Trevor's entrance
    const pUp = P(t, mid('trev', 0.5), 0.35, pop);
    op(pri, t >= mid('trev', 0.5) ? 1 : 0);
    tr(pri, 830, lerp(800, 642, pUp), 0.8);
    let prm = 'smug', prl = -0.7;
    if (t < at('115')) prm = 'smug';
    else if (t >= at('alt') && t < at('co')) prm = 'happy';
    else if (t >= at('co') && t < at('mnem')) { prm = t < at('c180') ? 'deadpan' : 'smug'; prl = 0.6; }
    else if (t >= at('128')) prm = t < mid('128', 0.84) ? 'smug' : 'happy';
    pri.set({ t, talk: scTalk(S, t, 'priya'), mood: prm, look: prl });

    // Kavya rises for her first line
    const kUp = P(t, at('115') - 0.3, 0.35, easeOut);
    op(kav, t >= at('115') - 0.3 ? 1 : 0);
    tr(kav, 640, lerp(800, 642, kUp), 0.8);
    let km = 'neutral', kl = -0.7;
    if (t >= at('co') && t < at('mnem')) { km = t < at('c180') ? 'deadpan' : 'smug'; kl = 0.8; }
    else if (t >= at('mnem') && t < at('128')) { km = 'happy'; kl = -0.9; }
    else if (t >= at('128')) { km = 'happy'; kl = 0.7; }
    kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });

    // Ah Boy, for the mnemonic
    const bUp = P(t, at('mnem') - 0.3, 0.35, pop);
    op(boy, t >= at('mnem') - 0.3 ? 1 : 0);
    tr(boy, 250, lerp(800, 626, bUp), 0.9);
    boy.set({ t, talk: scTalk(S, t, 'boy'), mood: t < at('128') ? 'happy' : 'neutral', look: t < at('128') ? 0.4 : 0.8, lift: t < end('mnem') ? 0.9 : 0.3 });
  };
});
