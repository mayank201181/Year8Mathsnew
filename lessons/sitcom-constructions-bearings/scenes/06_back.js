/* Scene 6: The way back (back bearings).
   4 p.m., the drinks stall in the kampong: Dad and Ah Boy walked from the well to the stall on 065° -> which bearing
   back? -> Priya: 360° - 65° = 295° (an arm into the mangroves) -> Captain Needle: OFF COURSE, that reflects you in
   the North line -> a half turn: 065° + 180° = 245° (ON COURSE) -> Kavya's rule card: under 180 add it on, 180 or
   more take it off -> Mum's card: Q from P is 298°, so P from Q is 298° - 180° = 118° -> Ah Boy: why 180? -> North
   lines are parallel -> 65° at the well and 65° from South at the stall: alternate angles, a Z -> 180° to South and
   65° more: 245° -> Mr Tan: a plane over a Changi runway, 02 / 20: 020° and 200° -> Dad: "Two four five. Trust me,
   I knew that." */
scene('back', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);          // hard sitcom cut
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 3, color: o.color || C.ink, weight: 700 }); };
  const show = (el, t, t0, t1) => { const p = P(t, t0, 0.25, linear), q = t1 === undefined ? 1 : 1 - P(t, t1, 0.15, linear); op(el, Math.min(p, q)); return Math.min(p, q); };
  const GOLD = '#FFE45C', INK = MK.ink, BLUE = '#2E7DD8', RED = '#C62828', GREEN = '#1E9E5A', PURP = '#7A5CFF', BERRY = '#B8336A', AMBER = '#E08A00';
  const CX = 877;
  const row = (parent, y, text, o) => { o = o || {}; return mkText(parent, o.x || CX, y, text, { size: o.size || 30, anchor: o.anchor || 'middle', fill: o.fill || INK, boldFill: o.bold || BERRY, weight: 700 }); };
  const rowMath = (parent, y, src, col, size) => mkMath(parent, CX, y, src, { size: size || 40, anchor: 'middle', fill: col || INK, weight: 700 });
  const lab = (parent, x, y, s, o) => { o = o || {}; return T(parent, x, y, s, { size: o.size || 30, weight: 800, anchor: o.anchor || 'middle', fill: o.col || INK }); };
  const bp = (b, d, c) => [c[0] + Math.sin(b * Math.PI / 180) * d, c[1] - Math.cos(b * Math.PI / 180) * d];
  // an arc between two BEARINGS (clockwise from North), drawable; o.dash for a dashed one (fades instead)
  const brgArc = (parent, c, r, b0, b1, col, o) => {
    o = o || {};
    const el = E('path', { d: mkArcD(c[0], c[1], r, b0 - 90, b1 - 90), fill: 'none', stroke: col, 'stroke-width': o.width || 5, 'stroke-linecap': 'round' }, parent);
    if (o.dash) { el.setAttribute('stroke-dasharray', o.dash); el.set = p => op(el, p); }
    else { mkDash(el); el.set = p => { op(el, p > 0.001 ? 1 : 0); mkDraw(el, p); }; }
    el.set(0); return el;
  };
  const wedge = (parent, c, r, b0, b1, col) => { const a = bp(b0, r, c); return E('path', { d: `M${c[0]},${c[1]} L${a[0].toFixed(1)},${a[1].toFixed(1)} ` + mkArcD(c[0], c[1], r, b0 - 90, b1 - 90).replace(/^M[^A]*/, '') + ' Z', fill: col, opacity: 0.22 }, parent); };
  const arcTip = (parent, c, r, b, dir, col) => {
    const a = (b - 90) * Math.PI / 180, x = c[0] + r * Math.cos(a), y = c[1] + r * Math.sin(a), ux = -Math.sin(a) * dir, uy = Math.cos(a) * dir;
    return E('path', { d: `M${(x + ux * 12).toFixed(1)},${(y + uy * 12).toFixed(1)} L${(x - ux * 4 + Math.cos(a) * 9).toFixed(1)},${(y - uy * 4 + Math.sin(a) * 9).toFixed(1)} L${(x - ux * 4 - Math.cos(a) * 9).toFixed(1)},${(y - uy * 4 - Math.sin(a) * 9).toFixed(1)} Z`, fill: col }, parent);
  };
  const seg = (parent, a, b, col, w, dash) => E('path', { d: `M${a[0].toFixed(1)},${a[1].toFixed(1)} L${b[0].toFixed(1)},${b[1].toFixed(1)}`, stroke: col, 'stroke-width': w || 5, 'stroke-linecap': 'round', 'stroke-dasharray': dash || null, fill: 'none' }, parent);
  const coconut = parent => { const g = G(parent); E('path', { d: 'M10,-50 L22,-86', stroke: '#E8424F', 'stroke-width': 5, 'stroke-linecap': 'round' }, g); E('circle', { cx: 0, cy: -26, r: 26, fill: '#7FB04A', stroke: SC_INK, 'stroke-width': 3.5 }, g); E('ellipse', { cx: 0, cy: -46, rx: 14, ry: 5, fill: '#F4F1E8', stroke: SC_INK, 'stroke-width': 2 }, g); return g; };

  /* layers */
  const Lset = G(root), Lcard = G(root), Lhud = G(root);

  /* ================= the kampong, the drinks stall ================= */
  const isl = cbIsland(Lset, 'kampong');
  const stall = G(isl.mid); tr(stall, 640, 560);
  [-100, 100].forEach(x => E('rect', { x: x - 6, y: -250, width: 12, height: 250, fill: '#8A6232' }, stall));
  E('path', { d: 'M-130,-250 L130,-250 L118,-212 L-118,-212 Z', fill: '#FFFFFF', stroke: '#8A6232', 'stroke-width': 4, 'stroke-linejoin': 'round' }, stall);
  for (let i = 0; i < 6; i++) E('path', { d: `M${-130 + i * 44},-250 L${-130 + i * 44 + 22},-250 L${-118 + i * 40 + 20},-212 L${-118 + i * 40},-212 Z`, fill: '#E8424F' }, stall);
  E('rect', { x: -110, y: -140, width: 220, height: 140, rx: 8, fill: '#3FA4D8', stroke: '#1E5A8A', 'stroke-width': 4 }, stall);
  E('rect', { x: -96, y: -128, width: 192, height: 44, rx: 6, fill: '#FFFFFF', stroke: '#1E5A8A', 'stroke-width': 3 }, stall);
  T(stall, 0, -96, 'ICE DRINKS', { size: 28, weight: 800, anchor: 'middle', fill: '#1E5A8A' });
  [-60, 0, 60].forEach(x => { E('circle', { cx: x, cy: -160, r: 20, fill: '#7FB04A', stroke: SC_INK, 'stroke-width': 3 }, stall); });
  const flag = cbFlag(isl.mid, 0.8); tr(flag, 1110, 566);

  /* ================= the cast ================= */
  const kav = cast(isl.mid, 'kavya'), dad = cast(isl.mid, 'dad'), boy = cast(isl.mid, 'boy'), priya = cast(isl.mid, 'priya'),
    mum = cast(isl.mid, 'mum'), tan = cast(isl.mid, 'tan');
  coconut(dad.hand); coconut(boy.hand);
  const ndl = cast(isl.mid, 'needle', { s: 0.55 });
  const Y0 = 452, SB = 0.8;

  /* ================= card W-S: the well and the stall ================= */
  const wCard = G(Lcard);
  cbPaper(wCard, 585, 94, 585, 578);
  const Wp = [700, 590], Sp = bp(65, 320, Wp);
  const glowW = seg(wCard, Wp, [Wp[0], Wp[1] - 150], GOLD, 16), glowS = seg(wCard, Sp, [Sp[0], Sp[1] - 150], GOLD, 16);
  const zPath = E('path', { d: `M${Wp[0]},${Wp[1] - 150} L${Wp[0]},${Wp[1]} L${Sp[0].toFixed(1)},${Sp[1].toFixed(1)} L${Sp[0].toFixed(1)},${(Sp[1] + 150).toFixed(1)}`, fill: 'none', stroke: AMBER, 'stroke-width': 12, 'stroke-linejoin': 'round', 'stroke-linecap': 'round', opacity: 0.35 }, wCard);
  const nWl = cbNorth(wCard, 150, { col: INK, size: 30 }); tr(nWl, Wp[0], Wp[1]);
  const nSl = cbNorth(wCard, 150, { col: INK, size: 30 }); tr(nSl, Sp[0], Sp[1]);
  const southS = seg(wCard, Sp, [Sp[0], Sp[1] + 150], INK, 3.5, '10 8');
  const southLab = lab(wCard, Sp[0] + 20, Sp[1] + 150, 'S', { size: 28, col: '#5A6670', anchor: 'start' });
  const chev = G(wCard);
  [Wp, Sp].forEach(p => [0, 16].forEach(k => E('path', { d: `M${p[0] - 11},${p[1] - 70 - k} L${p[0]},${p[1] - 84 - k} L${p[0] + 11},${p[1] - 70 - k}`, fill: 'none', stroke: AMBER, 'stroke-width': 4.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, chev)));
  // the 065° walk, W -> S
  const wedgeW = wedge(wCard, Wp, 56, 0, 65, BLUE);
  const arcW = brgArc(wCard, Wp, 56, 0, 65, BLUE);
  const tipW = arcTip(wCard, Wp, 56, 65, 1, BLUE);
  const l065 = lab(wCard, ...bp(32.5, 92, Wp).map((v, i) => v + (i ? 10 : 0)), '065°', { size: 30, col: BLUE });
  const walk = mkDash(seg(wCard, Wp, Sp, INK, 5));
  E('circle', { cx: Wp[0], cy: Wp[1], r: 7, fill: INK }, wCard); E('circle', { cx: Sp[0], cy: Sp[1], r: 7, fill: INK }, wCard);
  lab(wCard, Wp[0] - 16, Wp[1] + 40, 'well', { size: 28, col: '#5A4A3A', anchor: 'end' });
  lab(wCard, Sp[0] + 30, Sp[1] - 122, 'stall', { size: 28, col: '#1E5A8A', anchor: 'start' });
  // Priya's 295° and the mirror
  const ghost = seg(wCard, Sp, bp(65, 150, Sp), BLUE, 4, '10 8');
  const arm295 = mkDash(seg(wCard, Sp, bp(295, 210, Sp), RED, 5));
  const e295 = bp(295, 210, Sp), mang = lab(wCard, e295[0] - 6, e295[1] - 22, 'mangroves!', { size: 26, col: RED });
  const mirror = seg(wCard, [Sp[0], Sp[1] - 190], [Sp[0], Sp[1] + 40], '#9FD8FF', 10);
  wCard.insertBefore(mirror, nSl);
  const mirG = G(wCard);
  brgArc(mirG, Sp, 60, 0, 65, BLUE).set(1); brgArc(mirG, Sp, 60, 295, 360, RED).set(1);
  lab(mirG, ...bp(32.5, 92, Sp).map((v, i) => v + (i ? 10 : 0)), '65°', { size: 28, col: BLUE });
  lab(mirG, ...bp(327.5, 92, Sp).map((v, i) => v + (i ? 10 : 0)), '65°', { size: 28, col: RED });
  // the half turn at the stall, and the way back
  const halfArc = brgArc(wCard, Sp, 72, 65, 245, AMBER, { dash: '10 7', width: 4.5 });
  const halfTip = arcTip(wCard, Sp, 72, 245, 1, AMBER);
  const lHalf = lab(wCard, ...bp(150, 100, Sp).map((v, i) => v + (i ? 10 : 0)), '+180°', { size: 28, col: AMBER });
  const back = mkDash(seg(wCard, Sp, Wp, GREEN, 7));
  const tipBack = E('path', { d: 'M0,0 L-20,-11 L-20,11 Z', fill: GREEN, transform: `translate(${(Wp[0] + 14 * Math.sin(65 * Math.PI / 180)).toFixed(1)} ${(Wp[1] - 14 * Math.cos(65 * Math.PI / 180)).toFixed(1)}) rotate(${(180 - 25).toFixed(1)})` }, wCard);
  // alternate angles and the 245° sum at the stall
  const zW = wedge(wCard, Wp, 56, 0, 65, AMBER), zS = wedge(wCard, Sp, 56, 180, 245, AMBER);
  const zSArc = brgArc(wCard, Sp, 56, 180, 245, AMBER);
  const zLW = lab(wCard, ...bp(32.5, 92, Wp).map((v, i) => v + (i ? 10 : 0)), '65°', { size: 30, col: AMBER });
  const zLS = lab(wCard, ...bp(212.5, 94, Sp).map((v, i) => v + (i ? 10 : 0)), '65°', { size: 30, col: AMBER });
  const s180 = brgArc(wCard, Sp, 56, 0, 180, BLUE);
  const l180 = lab(wCard, ...bp(90, 92, Sp).map((v, i) => v + (i ? 10 : 0)), '180°', { size: 28, col: BLUE });
  const tip245 = arcTip(wCard, Sp, 56, 245, 1, AMBER);
  // rows
  const rFour = row(wCard, 165, 'well → stall: **065°**', { size: 34, bold: BLUE });
  const rWhich = row(wCard, 165, 'stall → well: **?**', { size: 34, bold: RED });
  const rPriya = rowMath(wCard, 172, '360° − 65° = 295°', RED);
  const rOff2 = row(wCard, 225, 'a **reflection** in the North line', { size: 28, bold: RED });
  const rHalf = rowMath(wCard, 172, '065° + 180° = 245°', GREEN);
  const rHalf2 = row(wCard, 225, 'a **half turn**', { size: 28, bold: AMBER });
  const rWhy = row(wCard, 165, 'why **180°**?', { size: 34, bold: RED });
  const rPar = row(wCard, 165, 'all North lines are **parallel**', { size: 32, bold: AMBER });
  const rZ = row(wCard, 165, '**alternate angles**: a Z', { size: 32, bold: AMBER });
  const rSum = rowMath(wCard, 172, '180° + 65° = 245°', GREEN);
  const stOff = cbStamp(wCard, false), stOn = cbStamp(wCard, true);

  /* ================= card: the back-bearing rule ================= */
  const ruleCard = G(Lcard);
  cbPaper(ruleCard, 585, 94, 585, 578);
  const rr1 = row(ruleCard, 160, 'Under **180**: **add** 180', { size: 34, bold: GREEN });
  const rr2 = row(ruleCard, 214, '**180** or more: **take off** 180', { size: 34, bold: RED });
  const tbl = mkTable(ruleCard, [['bearing', 'back bearing'], ['065°', '245°'], ['120°', '300°'], ['200°', '020°'], ['310°', '130°']],
    { colW: [170, 220], rowH: 62, size: 32, ink: INK, head: true, fill: '#FFFFFF', headFill: '#E3F0FF' });
  tr(tbl, 672, 252);
  const notes = [['+ 180', GREEN], ['+ 180', GREEN], ['− 180', RED], ['− 180', RED]].map(([s, c], i) => mkText(ruleCard, 1078, 252 + 62 * (i + 1) + 42, s, { size: 28, fill: c, weight: 800 }));
  const rBack = row(ruleCard, 644, 'the **back bearing**: the way back', { size: 30, bold: GREEN });

  /* ================= card: Mum's P and Q ================= */
  const pqCard = G(Lcard);
  cbPaper(pqCard, 585, 94, 585, 578);
  const Pq = [1000, 560], Qq = bp(298, 320, Pq);
  const nP = cbNorth(pqCard, 150, { col: INK, size: 30 }); tr(nP, Pq[0], Pq[1]);
  const nQ = cbNorth(pqCard, 120, { col: INK, size: 30 }); tr(nQ, Qq[0], Qq[1]);
  const pqLine = mkDash(seg(pqCard, Pq, Qq, INK, 5));
  const aP = brgArc(pqCard, Pq, 50, 0, 298, RED), tP = arcTip(pqCard, Pq, 50, 298, 1, RED);
  const lP = lab(pqCard, ...bp(149, 86, Pq).map((v, i) => v + (i ? 10 : 0)), '298°', { size: 30, col: RED });
  const aQ = brgArc(pqCard, Qq, 46, 0, 118, GREEN), tQ = arcTip(pqCard, Qq, 46, 118, 1, GREEN);
  const lQ = lab(pqCard, ...bp(59, 82, Qq).map((v, i) => v + (i ? 10 : 0)), '118°', { size: 30, col: GREEN });
  E('circle', { cx: Pq[0], cy: Pq[1], r: 7, fill: INK }, pqCard); E('circle', { cx: Qq[0], cy: Qq[1], r: 7, fill: INK }, pqCard);
  lab(pqCard, Pq[0] + 28, Pq[1] + 12, 'P', { anchor: 'start' }); lab(pqCard, Qq[0] - 22, Qq[1] + 30, 'Q', { anchor: 'end' });
  const rMum1 = row(pqCard, 165, 'Q from P: **298°**', { size: 34, bold: RED });
  const rMum2 = rowMath(pqCard, 222, '298° − 180° = 118°', GREEN, 38);

  /* ================= card: the Changi runway ================= */
  const rwCard = G(Lcard);
  cbPaper(rwCard, 585, 94, 585, 578);
  const Rc = [900, 400], RL = 190;
  const rw = G(rwCard); tr(rw, Rc[0], Rc[1], 1, 20);
  E('rect', { x: -26, y: -RL, width: 52, height: 2 * RL, rx: 4, fill: '#4A5560', stroke: INK, 'stroke-width': 3 }, rw);
  E('path', { d: `M0,${-RL + 70} L0,${RL - 70}`, stroke: '#FFFFFF', 'stroke-width': 4, 'stroke-dasharray': '18 14' }, rw);
  const n02 = T(rw, 0, RL - 22, '02', { size: 30, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  const n20 = T(rw, 0, -RL + 46, '20', { size: 30, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  const nR = cbNorth(rwCard, 110, { col: INK, size: 30 }); tr(nR, 650, 360);
  const ax = s => [Rc[0] + Math.sin(20 * Math.PI / 180) * RL * s, Rc[1] - Math.cos(20 * Math.PI / 180) * RL * s];
  const off = (p, k) => [p[0] + Math.cos(20 * Math.PI / 180) * k, p[1] + Math.sin(20 * Math.PI / 180) * k];
  const a020 = arrow(rwCard, ...off(ax(-0.7), 66), ...off(ax(0.75), 66), { color: BLUE, width: 6 });
  const a200 = arrow(rwCard, ...off(ax(0.7), -66), ...off(ax(-0.75), -66), { color: GREEN, width: 6 });
  const l020 = lab(rwCard, ...off(ax(0.8), 120), '020°', { size: 32, col: BLUE });
  const l200 = lab(rwCard, ...off(ax(-0.86), -112), '200°', { size: 32, col: GREEN });
  const rRun = row(rwCard, 165, 'a Changi runway: **02** / **20**', { size: 32, bold: BLUE });
  const wRun = rowMath(rwCard, 646, '020° + 180° = 200°', GREEN, 38);
  const cBack = mkChip(rwCard, 'the **back bearing**', { size: 28, col: GREEN, fill: '#E4F5EC', textCol: INK }); tr(cBack, 712, 590);
  const plane = cbPlane(Lhud, 0.75);

  /* ================= chips ================= */
  const cTime = pill(Lhud, '4 p.m.', { size: 34, color: GOLD, stroke: GOLD });
  const c245 = mkChip(Lhud, '{{245°}}', { size: 40, col: GREEN, fill: 'rgba(10,27,39,0.9)' });
  const cTrust = pill(Lhud, '"Trust me."', { size: 30, color: '#FFFFFF', stroke: '#9FD8FF' });

  /* cut points */
  const cB1 = mid('four', 0.45), cB2 = at('off') - 0.06, cB3 = at('rule') - 0.06, cB4 = at('mum') - 0.06, cB5 = at('why') - 0.06, cC = at('plane') - 0.06, cD = at('knew') - 0.06;

  return t => {
    const sA = on(t, -1, cB1), sB1 = on(t, cB1, cB2), sB2 = on(t, cB2, cB3), sB3 = on(t, cB3, cB4), sB4 = on(t, cB4, cB5), sB5 = on(t, cB5, cC),
      sC = on(t, cC, cD), sD = on(t, cD, 1e9), sW = sB1 || sB2 || sB5;
    const who = scWho(S, t);
    isl.upd(t * AMP);
    op(wCard, sW); op(ruleCard, sB3); op(pqCard, sB4); op(rwCard, sC);
    [kav, dad, boy, priya, mum, tan, ndl].forEach(c => op(c, 0));
    [cTime, c245, cTrust, plane].forEach(c => op(c, 0));
    op(stall, sA); op(flag, sA || sD);

    const place = (c, x, y, s) => { op(c, 1); tr(c, x, y === undefined ? Y0 : y, s || SB); };
    const lookTo = (myX, xs) => { const sp = xs[who]; if (sp === undefined) return 0.75; if (Math.abs(sp - myX) < 1) return 0.8; return sp > myX ? 0.8 : -0.8; };
    const needleAt = (x, mood, look) => { op(ndl, 1); tr(ndl, x, 532 - 138 * 0.6, 0.6); ndl.set({ t, talk: scTalk(S, t, 'needle'), mood, look }); };
    const slide = (g, t0) => tr(g, 0, 16 * (1 - P(t, t0, 0.3, easeOut)));

    /* ---------- A: the drinks stall ---------- */
    if (sA) {
      place(kav, 100); place(dad, 270); place(boy, 430); place(priya, 860); place(mum, 1020);
      kav.set({ t, mood: 'neutral', look: 0.8 });
      dad.set({ t, mood: 'happy', look: 0.8, lift: wave(t, 2.4) > 0.6 ? 1 : 0 });
      boy.set({ t, mood: 'happy', look: -0.8, lift: wave(t, 2.0, 0.5) > 0.6 ? 1 : 0 });
      priya.set({ t, mood: 'smug', look: -0.8 });
      mum.set({ t, mood: 'smug', look: -0.8 });
      popIn(cTime, t, at('four') + 0.1, 905, 70);
    }

    /* ---------- the well -> stall card ---------- */
    if (sW) {
      if (sB1) slide(wCard, cB1); else if (sB5) slide(wCard, cB5); else tr(wCard, 0, 0);
      // the walk at 065°: always there
      nWl.set(sB1 ? P(t, cB1 + 0.1, 0.4, ease) : 1);
      nSl.set(sB1 ? P(t, cB1 + 0.3, 0.4, ease) : 1);
      const pw = sB1 ? P(t, cB1 + 0.2, 0.7, ease) : 1;
      arcW.set(pw); op(wedgeW, pw); op(tipW, pw > 0.95 ? 1 : 0); op(l065, P(t, cB1 + 0.6, 0.3, linear));
      walk.style.display = ''; mkDraw(walk, sB1 ? P(t, cB1 + 0.3, 0.8, ease) : 1);
      show(rFour, t, cB1 + 0.1, at('which'));
      show(rWhich, t, at('which') + 0.1, at('priya'));
      // Priya's 295° (until the half turn)
      const p295 = t < mid('half', 0.3) ? P(t, mid('priya', 0.55), 0.6, ease) * (1 - P(t, mid('half', 0.15), 0.2, linear)) : 0;
      op(arm295, p295 > 0.001 ? (t < mid('half', 0.15) ? 1 : p295) : 0); mkDraw(arm295, t < mid('half', 0.15) ? P(t, mid('priya', 0.55), 0.6, ease) : 1);
      op(mang, t < mid('half', 0.3) ? P(t, mid('priya', 0.85), 0.3, linear) * (1 - P(t, mid('half', 0.15), 0.2, linear)) : 0);
      show(rPriya, t, mid('priya', 0.2), at('off'));
      // OFF COURSE: the mirror
      stOff.set(sB2 && t < at('half') ? P(t, at('off') + 0.1, 0.35, linear) : 0); tr(stOff, CX, 172, 0.42);
      show(rOff2, t, mid('off', 0.45), at('half'));
      op(mirror, sB2 && t < at('half') ? 0.5 + 0.5 * Math.abs(Math.sin((t - at('off')) * 3)) : 0);
      show(mirG, t, mid('off', 0.4), at('half'));
      op(ghost, t >= mid('off', 0.35) && t < at('rule') ? P(t, mid('off', 0.35), 0.3, linear) * (1 - P(t, mid('half', 0.75), 0.2, linear)) : 0);
      // the half turn
      halfArc.set(sB2 && t >= at('half') ? P(t, mid('half', 0.2), 0.4, linear) : 0);
      op(halfTip, sB2 && t > mid('half', 0.3) ? 1 : 0); op(lHalf, sB2 && t >= at('half') ? P(t, mid('half', 0.3), 0.3, linear) : 0);
      const pb = t >= at('half') ? P(t, mid('half', 0.38), 0.7, ease) : 0;
      op(back, pb > 0.001 ? 1 : 0); mkDraw(back, pb); op(tipBack, pb > 0.95 ? 1 : 0);
      show(rHalf, t, mid('half', 0.25), at('rule')); show(rHalf2, t, mid('half', 0.3), at('rule'));
      stOn.set(sB2 && t >= at('half') ? P(t, mid('half', 0.85), 0.35, linear) : 0); tr(stOn, 1040, 640, 0.38);
      if (sB5) { op(back, 1); mkDraw(back, 1); op(tipBack, 1); }
      // why / parallel / Z / 245°
      show(rWhy, t, at('why') + 0.05, at('par'));
      show(rPar, t, at('par') + 0.1, at('z'));
      const pg = sB5 && t >= at('par') && t < at('z') + 0.3 ? 0.35 + 0.35 * Math.abs(Math.sin((t - at('par')) * 3)) : 0;
      op(glowW, pg); op(glowS, pg);
      op(chev, sB5 && t >= at('par') ? P(t, mid('par', 0.5), 0.3, linear) : 0);
      const ps = sB5 && t >= at('par') ? P(t, mid('par', 0.7), 0.4, linear) : 0;
      op(southS, ps); op(southLab, ps);
      show(rZ, t, at('z') + 0.05, at('sum'));
      const zp = sB5 && t >= at('z') ? 1 : 0;
      op(zW, zp * P(t, mid('z', 0.1), 0.3, linear)); op(zLW, zp * P(t, mid('z', 0.12), 0.3, linear));
      op(l065, sB5 && t >= at('z') ? 0 : P(t, cB1 + 0.6, 0.3, linear));
      zSArc.set(zp * P(t, mid('z', 0.4), 0.4, ease)); op(zS, zp * P(t, mid('z', 0.45), 0.3, linear)); op(zLS, zp * P(t, mid('z', 0.5), 0.3, linear));
      op(zPath, zp * P(t, mid('z', 0.72), 0.4, linear) * (1 - P(t, at('sum'), 0.3, linear)));
      s180.set(sB5 && t >= at('sum') ? P(t, mid('sum', 0.1), 0.8, ease) : 0); op(l180, sB5 && t >= at('sum') ? P(t, mid('sum', 0.3), 0.3, linear) : 0);
      op(tip245, sB5 && t >= at('sum') ? P(t, mid('sum', 0.55), 0.2, linear) : 0);
      show(rSum, t, mid('sum', 0.45));

      // the cast
      if (sB1) {
        const xs = { dad: 130, boy: 300, priya: 470 };
        place(dad, 130); place(boy, 300); place(priya, 470);
        dad.set({ t, talk: scTalk(S, t, 'dad'), mood: who === 'dad' ? 'neutral' : t > at('priya') ? 'happy' : 'neutral', look: lookTo(130, xs), lift: who === 'dad' ? 0 : 0 });
        boy.set({ t, mood: 'happy', look: lookTo(300, xs), lift: t < at('which') && wave(t, 2.0) > 0.7 ? 1 : 0 });
        priya.set({ t, talk: scTalk(S, t, 'priya'), mood: 'smug', look: lookTo(470, xs), lift: who === 'priya' ? 1 : 0 });
      } else if (sB2) {
        const xs = { needle: 130, priya: 300, dad: 470 };
        needleAt(130, t < at('half') ? 'annoyed' : 'smug', lookTo(130, xs));
        place(priya, 300); place(dad, 470);
        priya.set({ t, mood: t < at('half') ? 'annoyed' : 'deadpan', look: lookTo(300, xs) });
        dad.set({ t, mood: t < at('half') ? 'shock' : 'happy', look: lookTo(470, xs) });
      } else {
        const xs = { needle: 130, boy: 300, kavya: 470 };
        needleAt(130, 'smug', lookTo(130, xs));
        place(boy, 300); place(kav, 470);
        boy.set({ t, talk: scTalk(S, t, 'boy'), mood: who === 'boy' ? 'neutral' : t > at('sum') ? 'happy' : 'neutral', look: lookTo(300, xs), lift: who === 'boy' ? 1 : 0 });
        kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: who === 'kavya' ? 'happy' : 'neutral', look: lookTo(470, xs) });
      }
    }

    /* ---------- B3: Kavya's rule card ---------- */
    if (sB3) {
      slide(ruleCard, cB3);
      const xs = { needle: 130, kavya: 300, boy: 470 };
      needleAt(130, 'smug', lookTo(130, xs));
      place(kav, 300); place(boy, 470);
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: 'happy', look: lookTo(300, xs) });
      boy.set({ t, mood: 'happy', look: lookTo(470, xs) });
      show(rr1, t, at('rule') + 0.1); show(rr2, t, mid('rule', 0.35));
      op(tbl.cells[0][0], 1); op(tbl.cells[0][1], 1);
      const rT = [mid('rule', 0.12), mid('rule', 0.24), mid('rule', 0.45), mid('rule', 0.57)];
      rT.forEach((t0, i) => { const p = P(t, t0, 0.3, linear); op(tbl.cells[i + 1][0], p); op(tbl.cells[i + 1][1], P(t, t0 + 0.2, 0.3, linear)); op(notes[i], P(t, t0 + 0.2, 0.3, linear)); });
      show(rBack, t, mid('rule', 0.78));
    }

    /* ---------- B4: Mum's card ---------- */
    if (sB4) {
      slide(pqCard, cB4);
      const xs = { mum: 130, priya: 300, kavya: 470 };
      place(mum, 130); place(priya, 300); place(kav, 470);
      mum.set({ t, talk: scTalk(S, t, 'mum'), mood: 'smug', look: lookTo(130, xs), lift: who === 'mum' ? 1 : 0 });
      priya.set({ t, mood: 'smug', look: lookTo(300, xs) });
      kav.set({ t, mood: t > mid('mum', 0.8) ? 'happy' : 'neutral', look: lookTo(470, xs) });
      show(rMum1, t, at('mum') + 0.1);
      nP.set(P(t, at('mum') + 0.2, 0.4, ease));
      mkDraw(pqLine, P(t, mid('mum', 0.15), 0.6, ease));
      aP.set(P(t, mid('mum', 0.2), 0.8, ease)); op(tP, P(t, mid('mum', 0.2) + 0.75, 0.15, linear)); op(lP, P(t, mid('mum', 0.32), 0.3, linear));
      nQ.set(P(t, mid('mum', 0.48), 0.4, ease));
      aQ.set(P(t, mid('mum', 0.5), 0.5, ease)); op(tQ, P(t, mid('mum', 0.5) + 0.45, 0.15, linear)); op(lQ, P(t, mid('mum', 0.6), 0.3, linear));
      show(rMum2, t, mid('mum', 0.5));
    }

    /* ---------- C: the Changi runway ---------- */
    if (sC) {
      slide(rwCard, cC + 0.6);
      const xs = { tan: 130, boy: 300, dad: 470 };
      place(tan, 130); place(boy, 300); place(dad, 470);
      tan.set({ t, talk: scTalk(S, t, 'tan'), mood: 'happy', look: lookTo(130, xs), lift: 1 });
      boy.set({ t, mood: 'happy', look: t < mid('plane', 0.15) ? 0.8 : lookTo(300, xs), lift: t > mid('plane', 0.86) ? 1 : 0 });
      dad.set({ t, mood: t < mid('plane', 0.15) ? 'shock' : 'neutral', look: t < mid('plane', 0.15) ? -0.8 : lookTo(470, xs), lift: 0 });
      // the plane roars over first
      const fp = P(t, at('plane') - 0.2, 2.0, linear);
      op(plane, fp > 0 && fp < 1 ? 1 : 0); tr(plane, lerp(1350, -250, fp), lerp(210, 150, fp), 1, -6);
      op(rwCard, P(t, mid('plane', 0.1), 0.3, linear));
      show(rRun, t, mid('plane', 0.14));
      nR.set(P(t, mid('plane', 0.14), 0.4, ease));
      op(n02, P(t, mid('plane', 0.2), 0.3, linear)); a020.set(P(t, mid('plane', 0.3), 0.6, ease)); op(l020, P(t, mid('plane', 0.4), 0.3, linear));
      op(n20, P(t, mid('plane', 0.52), 0.3, linear)); a200.set(P(t, mid('plane', 0.62), 0.6, ease)); op(l200, P(t, mid('plane', 0.72), 0.3, linear));
      cBack.set(P(t, mid('plane', 0.84), 0.35, linear));
      show(wRun, t, mid('plane', 0.86));
    }

    /* ---------- D: Dad knew it all along ---------- */
    if (sD) {
      place(kav, 310, Y0, 0.9); place(dad, 600, 440, 1.0); place(boy, 890, Y0, 0.9);
      kav.set({ t, mood: 'deadpan', look: 0.8 });
      dad.set({ t, talk: scTalk(S, t, 'dad'), mood: 'smug', look: 0, lift: 1 });
      boy.set({ t, mood: 'deadpan', look: -0.8 });
      c245.set(P(t, at('knew') + 0.1, 0.35, linear)); tr(c245, 820, 210);
      if (t > mid('knew', 0.5)) popIn(cTrust, t, mid('knew', 0.5), 400, 210);
    }
  };
});
