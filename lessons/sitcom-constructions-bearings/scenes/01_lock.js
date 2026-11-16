/* Scene 1: Inner and Outer (measuring and drawing angles).
   Shots (hard sitcom cuts):
   W  Checkpoint 1, Ubin Bicycle Rental: Mr Tan's clue (the lock code is the REFLEX angle between the signpost arms).
   M  the measuring card: the protractor on the 50° signpost angle. Priya reads the red outer scale (130°), Kavya the
      blue inner scale (50°).
   P  Inner & Outer hop onto the signpost: Outer read 130, Inner read 50, 50° + 130° = 180°.
   M  estimate first (acute, so 50° not 130°; the five angle types) -> how to measure (centre cross, baseline, count
      up from the 0).
   D  Dad tries 050: the lock stays shut.
   M  reflex = 360° − 50°.
   D  Ah Boy: 360° − 50° = 310°, the lock springs open: ON COURSE.
   M  Inner: drawing 295°: draw its partner 360° − 295° = 65°, label the outside 295°.
   W  Mr Tan's pun: cricket. */
scene('lock', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const view = (el, k, fx, fy, sx, sy) => el.setAttribute('transform', `translate(${sx.toFixed(1)} ${sy.toFixed(1)}) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const GOLD = '#FFE45C', RED = '#C62828', BLUE = '#1E5BB8', GREEN = '#1E9E5A', WOOD = '#8A5A2A';
  const lookAt = (x0, x1) => clamp((x1 - x0) / 260, -1, 1);
  const pt = (cx, cy, r, m) => [cx + Math.cos(m * Math.PI / 180) * r, cy - Math.sin(m * Math.PI / 180) * r];
  /* wedge between maths angles m0 < m1 (anticlockwise), centre (cx, cy) */
  const wedgeD = (cx, cy, r, m0, m1) => {
    const a = pt(cx, cy, r, m0), b = pt(cx, cy, r, m1);
    return `M${cx},${cy} L${a[0].toFixed(1)},${a[1].toFixed(1)} A${r},${r} 0 ${m1 - m0 > 180 ? 1 : 0} 0 ${b[0].toFixed(1)},${b[1].toFixed(1)} Z`;
  };
  const arcD = (cx, cy, r, m0, m1) => {
    const a = pt(cx, cy, r, m0), b = pt(cx, cy, r, m1);
    return `M${a[0].toFixed(1)},${a[1].toFixed(1)} A${r},${r} 0 ${m1 - m0 > 180 ? 1 : 0} 0 ${b[0].toFixed(1)},${b[1].toFixed(1)}`;
  };
  const chipOn = (c, t, t0, t1, x, y) => { c.set(t >= t0 && t < t1 ? P(t, t0, 0.35, linear) : 0); if (x !== undefined) tr(c, x, y); };
  const paperChip = (parent, text, col, size) => mkChip(parent, text, { size: size || 30, col, fill: '#FFFFFF' });
  /* the episode's protractor: red OUTER scale from the left, blue INNER scale from the right (like Inner & Outer) */
  const prot = (parent, r) => {
    const g = G(parent);
    E('path', { d: `M${-r},0 A${r},${r} 0 0 1 ${r},0 L${r},14 L${-r},14 Z`, fill: 'rgba(170,215,255,0.72)', stroke: '#6E9CC8', 'stroke-width': 3 }, g);
    let d = '';
    for (let k = 0; k <= 180; k++) {
      const a = k * Math.PI / 180, L = k % 10 === 0 ? 0.1 : k % 5 === 0 ? 0.065 : 0.035;
      d += `M${(Math.cos(a) * r).toFixed(1)},${(-Math.sin(a) * r).toFixed(1)} L${(Math.cos(a) * r * (1 - L)).toFixed(1)},${(-Math.sin(a) * r * (1 - L)).toFixed(1)} `;
    }
    E('path', { d, stroke: '#1E3A5F', 'stroke-width': 1.6 }, g);
    E('path', { d: `M${-r * 0.6},0 A${r * 0.6},${r * 0.6} 0 0 1 ${r * 0.6},0`, fill: 'none', stroke: '#6E9CC8', 'stroke-width': 2 }, g);
    g.lab = {};
    for (let k = 0; k <= 180; k += 10) {
      const a = (180 - k) * Math.PI / 180, b = k * Math.PI / 180;
      g.lab['o' + k] = T(g, Math.cos(a) * r * 0.82, -Math.sin(a) * r * 0.82 + 7, String(k), { size: 19, anchor: 'middle', fill: RED, weight: 800 });
      g.lab['i' + k] = T(g, Math.cos(b) * r * 0.68, -Math.sin(b) * r * 0.68 + 6, String(k), { size: 16, anchor: 'middle', fill: BLUE, weight: 800 });
    }
    E('path', { d: `M${-r},0 L${r},0`, stroke: '#1E3A5F', 'stroke-width': 3 }, g);
    E('path', { d: 'M-16,0 L16,0 M0,-16 L0,10', stroke: RED, 'stroke-width': 4 }, g);   // the centre cross
    return g;
  };

  /* ---------- layers ---------- */
  const world = G(root), Lpaper = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= the bicycle shop ================= */
  const set = cbIsland(world, 'shop');
  const flag = cbFlag(set.mid, 0.85); tr(flag, 40, 600);
  const post = cbSignpost(set.mid, 50, { len: 200, names: ['JETTY', 'CHEK JAWA'] }); tr(post, 790, 600);
  const VX = 790, VY = 340;   // the signpost vertex (world)
  const dad = cast(set.mid, 'dad'), boy = cast(set.mid, 'boy'), kav = cast(set.mid, 'kavya'), pri = cast(set.mid, 'priya'), tan = cast(set.mid, 'tan');
  const HX = { dad: 175, boy: 325, kav: 470, pri: 615, tan: 1095 };
  const lockG = G(world), lock = cbLock(lockG); tr(lockG, 420, 600, 0.62);
  const pro = cast(world, 'proto', { s: 0.75 });

  /* chips on the wide shot */
  const cCheck = G(Lfg);
  { const c = mkChip(cCheck, 'Checkpoint 1: **bicycle shop**', { size: 30, col: GOLD }); tr(c, 0, 0); c.set(1); }
  const cClue = mkChip(Lfg, '**Lock code** = the **reflex angle**\nbetween the arms of the signpost', { size: 30, col: '#FFFFFF', fill: 'rgba(194,65,12,0.94)', stroke: '#FFB37A' });
  const cCricket = mkChip(Lfg, 'cricket... cricket...', { size: 28, col: '#A4BCCB' });
  // Inner & Outer on the signpost
  const n130 = G(Lfg), n50 = G(Lfg);
  E('rect', { x: -110, y: -60, width: 220, height: 112, rx: 20, fill: 'rgba(10,27,39,0.85)' }, n130);
  E('rect', { x: -110, y: -60, width: 220, height: 112, rx: 20, fill: 'rgba(10,27,39,0.85)' }, n50);
  { const w = mkText(n130, 0, 0, '**130°**', { size: 56, fill: '#FF6B6B', halo: '#3A0E0E', anchor: 'middle' }); T(n130, 0, 40, 'outer scale', { size: 26, weight: 700, anchor: 'middle', fill: '#FFFFFF' }); }
  { const w = mkText(n50, 0, 0, '**50°**', { size: 56, fill: '#7FB8FF', halo: '#0E1E3A', anchor: 'middle' }); T(n50, 0, 40, 'inner scale', { size: 26, weight: 700, anchor: 'middle', fill: '#FFFFFF' }); }
  const c180 = mkChip(Lfg, '{{50° + 130° = 180°}}', { size: 38, col: GOLD });
  // Dad's try and Ah Boy's sum
  const c050 = mkChip(Lfg, 'code {{050}}?', { size: 34, col: '#FF8A8A' });
  const wCode = G(Lfg);
  { E('rect', { x: -250, y: -46, width: 500, height: 92, rx: 46, fill: 'rgba(10,27,39,0.92)', stroke: GOLD, 'stroke-width': 4 }, wCode);
    mkMath(wCode, 0, 18, '360° − 50° = 310°', { size: 50, fill: C.ink, anchor: 'middle' }); }
  const stampOk = cbStamp(Lhud, true);
  { const inr = stampOk.firstChild; inr.insertBefore(E('rect', { x: -stampOk.w / 2 - 6, y: -56, width: stampOk.w + 12, height: 112, rx: 16, fill: '#FFFFFF', opacity: 0.92 }), inr.firstChild); }

  /* ================= the measuring card ================= */
  const pap = cbPaper(Lpaper, 470, 110, 700, 550, { grid: true });
  const VX2 = 830, VY2 = 550, ARM = 300, R = 250;
  const angG = G(pap);
  const armA = E('path', { d: `M${VX2},${VY2} L${VX2 + ARM},${VY2}`, stroke: WOOD, 'stroke-width': 7, 'stroke-linecap': 'round' }, angG);
  const e2 = pt(VX2, VY2, ARM, 50);
  const armB = E('path', { d: `M${VX2},${VY2} L${e2[0].toFixed(1)},${e2[1].toFixed(1)}`, stroke: WOOD, 'stroke-width': 7, 'stroke-linecap': 'round' }, angG);
  E('circle', { cx: VX2, cy: VY2, r: 8, fill: MK.ink }, angG);
  // reading wedges (under the protractor)
  const protG = G(pap), P1 = prot(protG, R);
  const wOut = E('path', { d: wedgeD(VX2, VY2, 110, 50, 180), fill: 'rgba(232,66,79,0.3)', stroke: RED, 'stroke-width': 4 }, pap);
  const wIn = E('path', { d: wedgeD(VX2, VY2, 110, 0, 50), fill: 'rgba(59,130,246,0.32)', stroke: BLUE, 'stroke-width': 4 }, pap);
  // reading rings
  const oP = pt(0, 0, R * 0.82, 50), iP = pt(0, 0, R * 0.68, 50);
  const ringO = E('circle', { cx: oP[0], cy: oP[1], r: 22, fill: 'none', stroke: RED, 'stroke-width': 4 }, protG);
  const ringI = E('circle', { cx: iP[0], cy: iP[1], r: 19, fill: 'none', stroke: BLUE, 'stroke-width': 4 }, protG);
  const rdO = paperChip(Lpaper, 'outer scale: **130°**', RED, 32);
  const rdI = paperChip(Lpaper, 'inner scale: **50°**', BLUE, 32);
  // estimate first
  const estG = G(pap);
  const rightCorner = G(estG);
  E('path', { d: `M${VX2},${VY2} L${VX2},${VY2 - 230}`, stroke: '#7A5CFF', 'stroke-width': 4, 'stroke-dasharray': '12 9' }, rightCorner);
  E('path', { d: `M${VX2 + 30},${VY2} L${VX2 + 30},${VY2 - 30} L${VX2},${VY2 - 30}`, fill: 'none', stroke: '#7A5CFF', 'stroke-width': 4 }, rightCorner);
  T(rightCorner, VX2 - 14, VY2 - 240, '90°', { size: 30, weight: 800, anchor: 'end', fill: '#7A5CFF' });
  const m50 = mkAngleMark(estG, VX2, VY2, 0, 50, { r: 84, col: BLUE, fill: 'rgba(59,130,246,0.25)', label: '**50°** ✓', size: 32, lr: 160 });
  const x130 = G(estG);
  mkText(x130, 0, 0, '{{130°}}', { size: 38, fill: RED, anchor: 'middle' });
  { const c = cross(x130, 18); tr(c, 84, -14); }
  tr(x130, VX2 - 170, VY2 - 70);
  const types = [['acute', '< 90°'], ['right', '90°'], ['obtuse', '90°–180°'], ['straight', '180°'], ['reflex', '> 180°']].map(([a, b], i) =>
    mkChip(Lpaper, `**${a}**\n{{${b}}}`, { size: 26, col: i === 0 ? MK.ink : '#5A6670', fill: i === 0 ? GOLD : '#FFFFFF', stroke: i === 0 ? '#8A6508' : '#8FA3B8' }));
  const typeX = [];
  { let tx = 820 - (types.reduce((a, c) => a + c.w, 0) + 12 * 4) / 2; types.forEach(c => { typeX.push(tx + c.w / 2); tx += c.w + 12; }); }
  // how to measure
  const howG = G(Lpaper), howSteps = [];
  [['1', '**centre cross** on the vertex'], ['2', '**baseline** along one arm'], ['3', 'count up from the **0** on that arm']].forEach(([n, s], i) => {
    const g = G(howG); tr(g, 510, 168 + i * 50);
    E('circle', { cx: 18, cy: -10, r: 19, fill: '#7A5CFF' }, g);
    T(g, 18, 0, n, { size: 26, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
    mkText(g, 50, 0, s, { size: 30, fill: MK.ink, boldFill: '#5A3FD8' });
    howSteps.push(g);
  });
  const count = mkChip(Lpaper, '50°', { size: 34, col: BLUE, fill: '#FFFFFF' });
  // reflex
  const refG = G(pap);
  const refW = E('path', { d: wedgeD(VX2, VY2, 86, 50, 360), fill: 'rgba(255,196,40,0.35)', stroke: 'none' }, refG);
  const refA = mkDash(E('path', { d: arcD(VX2, VY2, 86, 50, 360), fill: 'none', stroke: '#E07A00', 'stroke-width': 6, 'stroke-linecap': 'round' }, refG));
  mkAngleMark(refG, VX2, VY2, 0, 50, { r: 54, col: BLUE, label: '**50°**', size: 28, lr: 96 }).set(1);
  const refL = mkText(refG, VX2 - 150, VY2 + 76, '**reflex**', { size: 32, fill: '#B85C00', anchor: 'middle', halo: MK.paper });
  const refT = mkText(Lpaper, 820, 175, '**reflex**: more than {{180°}}, the angle round the **other side**', { size: 28, fill: MK.ink, anchor: 'middle', boldFill: '#B85C00' });
  const refM = mkMath(Lpaper, 820, 250, '"reflex" = 360° − 50°', { size: 46, fill: MK.ink, anchor: 'middle' });
  // drawing 295°
  const drawG = G(pap);
  const dTitle = mkText(Lpaper, 820, 172, 'Draw {{295°}}: draw its **partner**', { size: 34, fill: MK.ink, anchor: 'middle', boldFill: '#5A3FD8' });
  const dWork = mkMath(Lpaper, 820, 245, '360° − 295° = 65°', { size: 46, fill: MK.ink, anchor: 'middle' });
  const dArm1 = cbSeg(drawG, VX2, VY2, VX2 + ARM, VY2, { width: 5 });
  const dDot = pt(VX2, VY2, R + 4, 65), dEnd = pt(VX2, VY2, ARM + 20, 65);
  const dot65 = cbDot(drawG, dDot[0], dDot[1], '', { col: RED });
  const dArm2 = cbSeg(drawG, VX2, VY2, dEnd[0], dEnd[1], { width: 5 });
  const in65 = mkAngleMark(drawG, VX2, VY2, 0, 65, { r: 64, col: BLUE, label: '**65°**', size: 30, lr: 104 });
  const out295W = E('path', { d: wedgeD(VX2, VY2, 92, 65, 360), fill: 'rgba(122,92,255,0.18)', stroke: 'none' }, drawG);
  const out295 = mkDash(E('path', { d: arcD(VX2, VY2, 92, 65, 360), fill: 'none', stroke: '#7A5CFF', 'stroke-width': 6, 'stroke-linecap': 'round' }, drawG));
  const lab295 = mkText(drawG, VX2 - 160, VY2 + 82, '**295°**', { size: 40, fill: '#5A3FD8', anchor: 'middle', halo: MK.paper });
  const stampDraw = mkChip(Lpaper, 'label the **outside**', { size: 28, col: '#5A3FD8', fill: '#FFFFFF' });

  /* lower thirds, blackout */
  const LT = { proto: cbLowerThird(Lhud, 'proto'), boy: cbLowerThird(Lhud, 'boy') };
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cuts */
  const k = id => at(id) - 0.06;
  const cM1 = k('priya'), cP = k('outer'), cM2 = k('est'), cD1 = k('dad'), cM3 = k('reflex'), cD2 = k('code'), cM4 = k('partner'), cW2 = k('pun');

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const sW = on(t, -1, cM1) || on(t, cW2, 1e9), sM = on(t, cM1, cP) || on(t, cM2, cD1) || on(t, cM3, cD2) || on(t, cM4, cW2),
      sP = on(t, cP, cM2), sD = on(t, cD1, cM3) || on(t, cD2, cM4);
    const who = scWho(S, t);
    set.upd(t * AMP);
    for (const kk in LT) LT[kk].set(0);
    [cClue, cCricket, c180, c050, stampOk, rdO, rdI, count, stampDraw].forEach(c => c.set(0));
    types.forEach(c => c.set(0));
    [cCheck, n130, n50, wCode].forEach(e => op(e, 0));
    op(Lpaper, sM);

    /* camera */
    if (sW) view(world, 1, 600, 375, 600, 375);
    else if (sP) view(world, 1.4, 720, 330, 640, 420);
    else if (sD) view(world, 1.4, 430, 470, 600, 400);
    else view(world, 1, 600, 375, 600, 375);

    /* who is on the set in this shot */
    const vis = { dad: sW || sD, boy: sW || sD, kav: 1, pri: 1, tan: sW, lock: sW || sD };
    const protoLeft = sM && (t >= at('how') - 0.06 && t < cD1 || t >= cM4);
    if (protoLeft) { vis.kav = 0; vis.pri = 0; }
    op(dad, vis.dad); op(boy, vis.boy); op(kav, vis.kav); op(pri, vis.pri); op(tan, vis.tan); op(lockG, vis.lock);
    const X = Object.assign({}, HX);
    if (sM) { X.pri = 130; X.kav = 340; }
    const hy = sM ? 452 : 440;
    tr(dad, X.dad, hy, 0.85); tr(boy, X.boy, hy + 18, 0.8); tr(kav, X.kav, hy, 0.85); tr(pri, X.pri, hy + 6, 0.83); tr(tan, X.tan, hy, 0.86);

    /* moods and looks */
    let dm = 'happy', dl = lookAt(X.dad, X.tan), dLift = 0;
    let bm = 'happy', bl = lookAt(X.boy, X.tan), bLift = 0;
    let km = 'neutral', kl = lookAt(X.kav, X.tan);
    let pm = 'smug', pl = lookAt(X.pri, X.tan);
    let tm = 'neutral', tl = -0.7, tLift = 0;
    if (t < cM1) { tm = 'happy'; tLift = t < end('clue') ? 1 : 0; tl = t < mid('clue', 0.5) ? -0.6 : -0.9; km = t > mid('clue', 0.55) ? 'neutral' : 'happy'; }
    else if (t < cP) { pm = t < at('kavya') ? 'smug' : 'annoyed'; pl = t < at('kavya') ? 0.8 : 0.9; km = t < at('kavya') ? 'neutral' : 'smug'; kl = t < at('kavya') ? 0.9 : 0.7; }
    else if (t < cM2) { pm = t < at('inner') ? 'smug' : 'neutral'; pl = 0.9; km = 'happy'; kl = 1; }
    else if (t < cD1) { pm = 'annoyed'; pl = 0.6; km = 'smug'; kl = 0.8; }
    else if (t < cM3) {   // Dad tries 050
      const melt = t > mid('dad', 0.72);
      dm = melt ? 'sad' : 'smug'; dl = 0.4; dLift = t < mid('dad', 0.6) ? 1 : 0;
      bm = melt ? 'neutral' : 'happy'; bl = -0.7; km = 'deadpan'; kl = -1;
    } else if (t < cD2) { km = 'annoyed'; kl = 0.8; }
    else if (t < cM4) {   // Ah Boy opens it
      bm = 'happy'; bLift = 1; bl = 0.3; dm = t > mid('code', 0.55) ? 'happy' : 'neutral'; dl = 0.8; km = 'happy'; kl = -0.8;
    } else if (t >= cW2) {   // the pun
      tm = 'happy'; tl = -0.6; dm = 'deadpan'; dl = 1; bm = 'deadpan'; bl = 1; km = 'deadpan'; kl = 1; pm = 'deadpan'; pl = 1;
    }
    dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: dl, lift: dLift });
    boy.set({ t, talk: scTalk(S, t, 'boy'), mood: bm, look: bl, lift: bLift });
    kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
    pri.set({ t, talk: scTalk(S, t, 'priya'), mood: pm, look: pl, lift: who === 'priya' ? 1 : 0 });
    tan.set({ t, talk: scTalk(S, t, 'tan'), mood: tm, look: tl, lift: tLift });

    /* Inner & Outer */
    const proOn = sP || protoLeft || (sW && t >= cW2);
    op(pro, proOn ? 1 : 0);
    if (proOn) {
      let x, y, s;
      if (sP) {   // hop onto the signpost arm
        const hop = P(t, at('outer') - 0.05, 0.45, pop);
        x = VX + 20; y = lerp(VY + 160, VY - 24 - 102 * 0.75, hop); s = 0.75;
      } else if (sW) { x = VX + 20; y = VY - 24 - 102 * 0.75; s = 0.75; }
      else { x = 285; y = 545 - 102 * 0.95; s = 0.95; }
      tr(pro, x, y, s);
      let mo = 'deadpan', mi = 'smug', lo = 0, li = 0;
      if (sP && t < at('inner')) { mo = 'deadpan'; mi = 'neutral'; lo = -0.6; li = -0.6; }
      else if (sP) { mo = t > mid('inner', 0.45) ? 'deadpan' : 'neutral'; mi = 'smug'; lo = 1; li = -1; }
      else if (t >= cW2) { mo = 'deadpan'; mi = 'deadpan'; lo = 0.8; li = 0.8; }
      else { mo = 'neutral'; mi = 'happy'; lo = 0.8; li = 0.8; }
      pro.set({ t, talk: scTalk(S, t, 'outer'), mood: mo, look: lo, talkB: scTalk(S, t, 'inner'), moodB: mi, lookB: li });
    }

    /* the lock */
    let code = '000', open = 0, rattle = 0;
    if (t >= at('dad')) {
      const p = P(t, mid('dad', 0.25), 0.9, easeOut);
      code = '0' + (Math.round(lerp(0, 5, p)) % 10) + '0';
      if (t > mid('dad', 0.55)) rattle = Math.sin(t * 60) * 5 * (1 - P(t, mid('dad', 0.55), 0.8, linear)) * AMP;
    }
    if (t >= at('code')) {
      const p = P(t, mid('code', 0.35), 1.1, easeOut);
      const f = [0, 5, 0], g2 = [3, 11, 10];
      code = f.map((a, i) => String(Math.round(lerp(a, g2[i], p)) % 10)).join('');
      open = P(t, mid('code', 0.7), 0.35, pop);
    }
    lock.set(code, open);
    tr(lockG, 420 + rattle, 600, 0.62);

    /* ---------- W: the wide shot ---------- */
    if (sW && t < cM1) {
      op(cCheck, P(t, at('clue') - 0.1, 0.3, linear)); tr(cCheck, 880, 62);
      chipOn(cClue, t, mid('clue', 0.3), 1e9, 330, 192);
    }
    if (t >= cW2) {
      op(cCheck, 1); tr(cCheck, 880, 62);
      chipOn(cCricket, t, end('pun') + 0.1, 1e9, 1040, 250);
    }

    /* ---------- P: Inner & Outer ---------- */
    if (sP) {
      if (t < at('inner') + 3) LT.proto.set(win(t, at('outer') + 0.1, at('outer') + 3.2, 0.3));
      const a = P(t, mid('outer', 0.45), 0.35, pop);
      op(n130, clamp(a * 3)); tr(n130, 470, 232, Math.max(0.01, 0.6 + 0.4 * a));
      const b = P(t, mid('inner', 0.12), 0.35, pop);
      op(n50, clamp(b * 3)); tr(n50, 1060, 232, Math.max(0.01, 0.6 + 0.4 * b));
      chipOn(c180, t, mid('inner', 0.55), 1e9, 766, 520);
      if (t > mid('inner', 0.62)) tr(c180, 766, 520, 1 + 0.06 * Math.sin((t - mid('inner', 0.62)) * 8) * AMP);
    }

    /* ---------- D: the lock close-up ---------- */
    if (sD) {
      if (t < cM3) chipOn(c050, t, mid('dad', 0.3), 1e9, 820, 190);
      else {
        LT.boy.set(win(t, at('code') + 0.05, at('code') + 3.1, 0.3));
        const p = P(t, mid('code', 0.05), 0.4, pop);
        op(wCode, clamp(p * 3)); tr(wCode, 650, 170, Math.max(0.01, 0.6 + 0.4 * p));
        stampOk.set(P(t, mid('code', 0.85), 0.35, linear)); tr(stampOk, 960, 615, 0.5);
      }
    }

    /* ---------- M: the measuring card ---------- */
    if (sM) {
      const ph = t < cP ? 'read' : t < at('how') - 0.06 ? 'est' : t < cD1 ? 'how' : t < cD2 ? 'reflex' : 'draw';
      op(angG, ph === 'draw' ? 0 : 1);
      op(wOut, 0); op(wIn, 0); op(ringO, 0); op(ringI, 0); op(estG, 0); op(howG, 0); op(refG, 0); op(refT, 0); op(refM, 0);
      op(drawG, 0); op(dTitle, 0); op(dWork, 0); op(protG, 0);
      let px = VX2, py = VY2, prr = 0, pOp = 0;
      if (ph === 'read') {
        pOp = 1;
        const pr = P(t, mid('priya', 0.35), 0.4, linear);
        op(wOut, pr); op(ringO, pr);
        chipOn(rdO, t, mid('priya', 0.45), 1e9, 640, 180);
        if (t >= at('kavya')) {
          const kp = P(t, mid('kavya', 0.3), 0.4, linear);
          op(wIn, kp); op(ringI, kp); op(wOut, 1 - 0.6 * kp);
          chipOn(rdI, t, mid('kavya', 0.45), 1e9, 1010, 180);
        }
      } else if (ph === 'est') {
        op(estG, 1);
        op(rightCorner, P(t, mid('est', 0.3), 0.4, linear));
        m50.set(P(t, mid('est', 0.45), 0.5, linear));
        op(x130, P(t, mid('est', 0.68), 0.3, linear));
        types.forEach((c, i) => chipOn(c, t, at('est') + 0.15 + i * 0.12, 1e9, typeX[i], 176));
      } else if (ph === 'how') {
        op(howG, 1);
        howSteps.forEach((g, i) => op(g, P(t, at('how') + [0.05, 0.33, 0.62][i] * (end('how') - at('how')), 0.3, linear)));
        // the protractor slides onto the vertex, turns onto the arm, then we count up
        const s1 = P(t, mid('how', 0.05), 1.0, ease), s2 = P(t, mid('how', 0.33), 1.0, ease);
        px = lerp(VX2 - 120, VX2, s1); py = lerp(VY2 - 40, VY2, s1); prr = lerp(-24, 0, s2); pOp = 1;
        const c3 = P(t, mid('how', 0.64), 1.3, linear);
        if (t > mid('how', 0.62)) {
          const v = Math.round(50 * c3 / 10) * 10, vv = Math.min(50, Math.round(50 * c3));
          count.set(1); mkTextSafe(count, vv);
          const cp = pt(VX2, VY2, R * 0.68 - 50, Math.max(4, vv));
          tr(count, cp[0], cp[1]);
          op(wIn, 0.4 + 0.6 * c3);
          attr(wIn, 'd', wedgeD(VX2, VY2, 110, 0, Math.max(0.5, vv)));
          op(ringI, c3 >= 1 ? 1 : 0);
        }
      } else if (ph === 'reflex') {
        op(refG, 1);
        const rp = P(t, mid('reflex', 0.3), 1.2, ease);
        op(refW, rp); mkDraw(refA, rp); op(refL, P(t, mid('reflex', 0.45), 0.3, linear));
        op(refT, P(t, at('reflex') + 0.1, 0.3, linear));
        op(refM, P(t, mid('reflex', 0.62), 0.3, linear));
      } else {
        op(drawG, 1);
        op(dTitle, P(t, at('partner') + 0.05, 0.3, linear));
        op(dWork, P(t, mid('partner', 0.3), 0.3, linear));
        dArm1.set(P(t, mid('partner', 0.36), 0.4, linear));
        const pIn = P(t, mid('partner', 0.42), 0.3, linear), pOut = 1 - P(t, mid('partner', 0.6), 0.3, linear);
        pOp = Math.min(pIn, pOut);
        dot65.set(P(t, mid('partner', 0.5), 0.2, linear));
        dArm2.set(P(t, mid('partner', 0.58), 0.4, linear));
        in65.set(P(t, mid('partner', 0.64), 0.4, linear));
        const o = P(t, mid('partner', 0.74), 0.8, ease);
        mkDraw(out295, o); op(out295W, o); op(lab295, P(t, mid('partner', 0.8), 0.3, linear));
        chipOn(stampDraw, t, mid('partner', 0.84), 1e9, 1040, 610);
      }
      op(protG, pOp); protG.setAttribute('transform', `translate(${px.toFixed(1)} ${py.toFixed(1)}) rotate(${prr.toFixed(2)})`);
      if (ph !== 'how') attr(wIn, 'd', wedgeD(VX2, VY2, 110, 0, 50));
    }
  };

  /* small: set a chip's number without rebuilding the chip box (the box fits up to two digits) */
  function mkTextSafe(c, v) { const tx = c.querySelectorAll('text'); if (tx.length) setText(tx[tx.length - 1], String(v) + '°'); }
});
