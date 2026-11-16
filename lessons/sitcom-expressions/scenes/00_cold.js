/* Scene 0: Cold open (no chapter card).
   Deepavali morning in the flat (#08-208, Blk 208): Kavya, 12, with her class test -> close-up: Q1 "Factorise 12x + 18",
   her answer 12(x + 18) -> Dad: "Same thing." -> close-up: REVISE!, Retest: Monday -> Mum: fifty guests at four, the jobs
   list; the ladoo tray (18) -> Ah Boy, cheeks full: "I haven't touched any ladoos" (17) -> documentary zoom into the x
   on the test -> Agent X's confessional: dossier (value classified); x = 5, x = -3 (bracket disguise), x = ?;
   12(x + 18) = 12x + 216, not 12x + 18: COVER BLOWN -> Agent X on the dining table: the mission -> Ah Boy: "a spy!" ->
   Mum hands him a goodie bag -> title card. */
scene('cold', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);          // hard sitcom cut
  const view = (el, k, fx, fy, sx, sy) => el.setAttribute('transform', `translate(${sx.toFixed(1)} ${sy.toFixed(1)}) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); };
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 2, color: o.color || C.ink, weight: 700 }); };
  const GOLD = '#FFE45C', RED = '#FF8A8A', BLUE = '#9FD8FF';
  const outline = (el, col, w) => { el.setAttribute('stroke', col); el.setAttribute('stroke-width', w); el.setAttribute('paint-order', 'stroke'); el.setAttribute('stroke-linejoin', 'round'); };

  /* layers: sets, characters behind the table, the table, foreground, HUD */
  const Lbg = G(root), Lcast = G(root), Lfront = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= A, C, E, H: the living room ================= */
  const flatShot = G(Lbg), flatWrap = G(flatShot);
  const flat = xpFlat(flatWrap);
  Lfront.appendChild(flat.front); Lfront.appendChild(flat.top);      // the table sits in front of Lcast
  const tTest = xpTest(flat.top, { s: 0.3 });                         // Kavya holds up her test
  const tray = xpTray(flat.top, { n: 18 });
  const bag = xpGoodieBag(flat.top, { col: '#E8457A' });
  const aChips = G(Lfg);
  const cKav = pill(aChips, 'Kavya, age 12', { size: 32 });
  const cDay = pill(aChips, 'Deepavali morning', { size: 30, color: GOLD, stroke: GOLD });
  const cBlk = pill(aChips, '#08-208, Blk 208', { size: 28 });
  const cSame = pill(Lfg, '"Same thing."', { size: 34, color: GOLD, stroke: GOLD });
  // Mum's jobs card
  const jobs = G(Lfg);
  E('rect', { x: -230, y: -120, width: 460, height: 240, rx: 16, fill: '#FFFDF6', stroke: '#B8A27A', 'stroke-width': 4 }, jobs);
  E('rect', { x: -230, y: -120, width: 460, height: 56, rx: 16, fill: '#B8233A' }, jobs);
  T(jobs, 0, -80, 'OPEN HOUSE: 4 P.M.', { size: 30, weight: 800, anchor: 'middle', fill: '#FFE45C' });
  const jobRows = ['**50** guests', 'Kavya: goodie bags', "Ah Boy: don't touch the ladoos"].map((s, i) => mkText(jobs, -204, -18 + i * 50, s, { size: 28, fill: MK.ink, boldFill: '#B8233A', weight: 700 }));
  const c18 = pill(Lfg, 'ladoos: 18', { size: 28, color: '#FFB347', stroke: '#FFB347' });
  const c17 = pill(Lfg, 'ladoos: 17', { size: 28, color: RED, stroke: RED });
  const crumbs = G(Lfg);
  [[-14, 0], [10, 6], [-4, 14], [16, -6], [-20, 10]].forEach(([x, y]) => E('circle', { cx: x, cy: y, r: 4, fill: '#E07A12' }, crumbs));
  const cMis1 = pill(Lfg, 'MISSION: Monday’s retest', { size: 32, color: GOLD, stroke: GOLD });
  const cMis2 = pill(Lfg, 'Do not alert 50 guests', { size: 28, color: RED, stroke: RED });

  /* ================= B, D: the test paper, close up ================= */
  const testShot = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#8E5A34' }, testShot);   // the table top, close
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#B8233A', opacity: 0.35 }, testShot);
  const bigTest = xpTest(testShot, { s: 1.12 }); tr(bigTest, 600, 380);

  /* ================= F: zoom into the x on the test ================= */
  const zoomShot = G(Lbg), zoomWrap = G(zoomShot);
  E('rect', { x: -300, y: -300, width: 1800, height: 1350, fill: '#FFFFFF' }, zoomWrap);
  let zl = '';
  for (let y = 80; y < 760; y += 80) zl += `M-300,${y} L1500,${y} `;
  E('path', { d: zl, stroke: '#CFE3F5', 'stroke-width': 3 }, zoomWrap);
  E('path', { d: 'M130,-300 L130,1050', stroke: '#F4A0A8', 'stroke-width': 4 }, zoomWrap);
  const ZX0 = 210, ZY = 440, ZS = 110;
  const zq = mkText(zoomWrap, ZX0, ZY - 170, 'Q1  Factorise', { size: 60, fill: MK.ink, weight: 700 });
  const z12 = mkMath(zoomWrap, ZX0, ZY, '12', { size: ZS, fill: MK.ink });
  const zx = mkMath(zoomWrap, ZX0 + z12.w + ZS * 0.04, ZY, 'x', { size: ZS, fill: MK.ink });
  const zp = mkMath(zoomWrap, ZX0 + z12.w + ZS * 0.04 + zx.w + ZS * 0.3, ZY, '+', { size: ZS, fill: MK.ink });
  mkMath(zoomWrap, ZX0 + z12.w + ZS * 0.04 + zx.w + ZS * 0.6 + zp.w, ZY, '18', { size: ZS, fill: MK.ink });
  const XC = [ZX0 + z12.w + ZS * 0.04 + zx.w / 2, ZY - zx.a * 0.42];   // the centre of the x
  const finder = G(Lhud);
  E('path', { d: 'M40,140 L40,40 L140,40 M1060,40 L1160,40 L1160,140 M1160,610 L1160,710 L1060,710 M140,710 L40,710 L40,610', fill: 'none', stroke: '#1E2A44', 'stroke-width': 5, opacity: 0.7 }, finder);
  const zoomTxt = T(finder, 1130, 690, 'ZOOM ×1', { size: 30, weight: 700, anchor: 'end', fill: '#1E2A44' });

  /* ================= G: Agent X's confessional ================= */
  const conf = xpConf(Lbg, 'x');
  // the dossier
  const dossier = G(Lfg);
  E('path', { d: 'M-250,-170 L-90,-170 L-70,-196 L40,-196 L60,-170 L250,-170 L250,190 L-250,190 Z', fill: '#E2C27A', stroke: '#8A6A2A', 'stroke-width': 5, 'stroke-linejoin': 'round' }, dossier);
  T(dossier, 0, -110, 'TOP SECRET', { size: 34, weight: 800, anchor: 'middle', fill: '#C62828', ls: 5 });
  const dn = T(dossier, 0, -30, 'AGENT X', { size: 64, weight: 800, anchor: 'middle', fill: SC_INK, ls: 3 });
  T(dossier, -200, 60, 'VALUE:', { size: 34, weight: 800, fill: SC_INK });
  E('rect', { x: -60, y: 26, width: 260, height: 46, fill: '#141418' }, dossier);
  const cls = G(dossier); tr(cls, 0, 140, 1, -8);
  E('rect', { x: -170, y: -34, width: 340, height: 64, rx: 8, fill: 'none', stroke: '#C62828', 'stroke-width': 6 }, cls);
  T(cls, 0, 14, 'CLASSIFIED', { size: 44, weight: 800, anchor: 'middle', fill: '#C62828', ls: 4 });
  // the values he could be
  const vals = ['x = 5', 'x = -3', 'x = ?'].map((src, i) => {
    const g = G(Lfg);
    E('rect', { x: -170, y: -70, width: 340, height: 140, rx: 20, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 5 }, g);
    E('rect', { x: -170, y: -70, width: 340, height: 26, rx: 12, fill: '#C62828' }, g);
    const m = mkMath(g, 0, 0, src, { size: 70, fill: MK.ink, anchor: 'middle' }); tr(m, 0, 22 + (m.a - m.d) / 2 - 10);
    return g;
  });
  const cAny = pill(Lfg, 'I could be anyone.', { size: 34, color: GOLD, stroke: GOLD });
  // the badge values on Agent X himself (filled below, once X exists)
  // the board: her answer, expanded
  const board = G(Lfg);
  E('rect', { x: -310, y: -200, width: 620, height: 400, rx: 20, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, board);
  T(board, 0, -142, "Kavya's answer, expanded", { size: 30, weight: 700, anchor: 'middle', fill: '#5A6670', font: FB });
  const bw = mkWorking(board, -30, -110, ['12(x + 18) = 12x + 216'], { size: 50, fill: MK.ink });
  const bArr = G(board);
  arrow(bArr, -228, -112, -150, -112, { color: '#2E6FD8', width: 4, bend: -26 });
  arrow(bArr, -228, -112, -42, -112, { color: '#2E6FD8', width: 4, bend: -44 });
  const bNot = G(board);
  mkMath(bNot, 0, 70, '12x + 216 != 12x + 18', { size: 46, fill: '#C62828', anchor: 'middle' });
  mkText(bNot, 0, 150, 'should be {{6(2x + 3)}}', { size: 34, fill: '#1E9E5A', anchor: 'middle', weight: 700 });
  const stampNo = xpStamp(Lfg, false);

  /* ================= I: title card ================= */
  const titleShot = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#0E1838', '#3A1E5A', true) }, titleShot);
  let rays = '';
  for (let i = 0; i < 16; i++) { const a0 = i / 16 * TAU, a1 = a0 + TAU / 40; rays += `M0,0 L${(Math.cos(a0) * 1100).toFixed(0)},${(Math.sin(a0) * 1100).toFixed(0)} L${(Math.cos(a1) * 1100).toFixed(0)},${(Math.sin(a1) * 1100).toFixed(0)} Z `; }
  const rayP = E('path', { d: rays, fill: '#FFC247', opacity: 0.08 }, titleShot);
  E('ellipse', { cx: 600, cy: 640, rx: 640, ry: 170, fill: glow('#FFB020'), opacity: 0.3 }, titleShot);
  const tDiyas = [150, 330, 870, 1050].map(x => { const d = xpDiya(titleShot, 1.1); tr(d, x, 360); return d; });
  const logo = G(Lfg);
  const logo1 = T(logo, 0, -70, 'ON GOOD', { size: 64, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 6 });
  const logo2 = T(logo, 0, 26, 'TERMS', { size: 104, weight: 800, anchor: 'middle', fill: GOLD, ls: 4 });
  [logo1, logo2].forEach(w => outline(w, '#1A0E30', 12));
  const xs = [-1, 1].map(sd => { const g = G(logo); tr(g, sd * 290, -30); const w = T(g, 0, 40, 'x', { size: 150, weight: 700, anchor: 'middle', fill: '#FF8FC8', font: "Georgia, 'Times New Roman', serif" }); w.setAttribute('font-style', 'italic'); outline(w, '#1A0E30', 10); return g; });
  const epi = T(Lfg, 600, 300, 'Episode 9: The Open House', { size: 42, weight: 700, anchor: 'middle', fill: '#FFFFFF' });

  /* ================= the cast ================= */
  const mum = cast(Lcast, 'mum', { hand: true });
  const dad = cast(Lcast, 'dad');
  const boy = cast(Lcast, 'boy');
  const kav = cast(Lcast, 'kavya');
  const ax = cast(Lcast, 'x');
  // Agent X's badge values
  const badgeVals = ['x = 5', 'x = -3', 'x = ?'].map(src => { const m = mkMath(ax.badge, 0, 0, src, { size: 34, fill: MK.ink, anchor: 'middle' }); tr(m, 0, 2 + (m.a - m.d) / 2 - 6); return m; });
  const lt = { kavya: xpLowerThird(Lhud, 'kavya'), dad: xpLowerThird(Lhud, 'dad'), mum: xpLowerThird(Lhud, 'mum'), boy: xpLowerThird(Lhud, 'boy'), x: xpLowerThird(Lhud, 'x') };
  const ltOn = (t, who, t0) => lt[who].set(win(t, t0, t0 + 3.1, 0.3));

  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cut points */
  const cB = at('test') - 0.06, cC = at('same') - 0.06, cD = at('revise') - 0.06, cE = at('guests') - 0.06,
    cF = at('tiny') - 0.06, cG = at('name') - 0.06, cH = at('mission') - 0.06, cI = at('title') - 0.06;

  return t => {
    op(blackout, 1 - P(t, 0, 0.6, linear));
    const sA = on(t, -1, cB), sB = on(t, cB, cC), sC = on(t, cC, cD), sD = on(t, cD, cE), sE = on(t, cE, cF),
      sF = on(t, cF, cG), sG = on(t, cG, cH), sH = on(t, cH, cI), sI = on(t, cI, 1e9);
    const flatOn = sA || sC || sE || sH;
    for (const k in lt) lt[k].set(0);
    const show = { mum: 0, dad: 0, boy: 0, kav: 0, ax: 0 };

    /* ---------- the living room (A, C, E, H) ---------- */
    op(flatShot, flatOn); op(flat.front, flatOn); op(flat.top, flatOn);
    op(aChips, 0); op(cSame, 0); op(jobs, 0); op(c18, 0); op(c17, 0); op(crumbs, 0); op(cMis1, 0); op(cMis2, 0);
    op(tTest, 0); op(bag, 0); op(tray, 0);
    [tTest.revise, tTest.cross, tTest.retest].forEach(e => op(e, t > cD ? 1 : 0));
    if (flatOn) {
      flat.upd(t, 0);   // the fairy lights are not up yet
      flat.clock.set(10, Math.min(59, Math.floor(t / 6)));
      // a slow documentary push-in in A; steady elsewhere
      const k = sA ? 1 + 0.08 * P(t, 0, cB, linear) : 1;
      view(flatWrap, k, 520, 420, 520, 420);
      view(flat.front, k, 520, 420, 520, 420); view(flat.top, k, 520, 420, 520, 420);
      view(Lcast, k, 520, 420, 520, 420);
      op(tray, 1); tr(tray, sH ? 745 : 960, 528, sH ? 0.7 : 0.9);
      tray.set(t < mid('ladoo', 0.3) ? 18 : 17);
    } else { view(Lcast, 1, 0, 0, 0, 0); }

    if (sA) {
      show.kav = 1;
      tr(kav, 420, 430, 1.08);
      kav.set({ t, talk: 0, mood: 'sad', look: 0.2 });
      op(tTest, 1); tr(tTest, 430, 548);
      op(aChips, 1);
      popIn(cKav, t, mid('kavya', 0.05), 420, 250);
      popIn(cDay, t, mid('kavya', 0.4), 860, 300);
      popIn(cBlk, t, mid('kavya', 0.62), 860, 380);
      ltOn(t, 'kavya', at('kavya') + 1.4);
    }
    if (sC) {
      show.kav = 1; show.dad = 1;
      tr(kav, 420, 430, 1.08); kav.set({ t, mood: t > mid('same', 0.7) ? 'annoyed' : 'sad', look: 0.8 });
      op(tTest, 1); tr(tTest, 430, 548);
      const lean = P(t, cC, 0.4, easeOut);
      tr(dad, lerp(860, 700, lean), 420, 1.1);
      dad.set({ t, talk: scTalk(S, t, 'dad'), mood: 'smug', look: -0.7 });
      ltOn(t, 'dad', at('same') + 0.1);
      popIn(cSame, t, mid('same', 0.7), 760, 200);
    }
    if (sE) {
      // Mum sweeps in from the left with the jobs; Ah Boy pops up on "ladoo"
      show.mum = 1; show.kav = 1;
      const inP = P(t, cE, 0.45, easeOut);
      tr(mum, lerp(-120, 230, inP), 420, 1.1);
      const mumMood = t >= at('ladoo') ? (t > end('ladoo') ? 'deadpan' : 'neutral') : 'neutral';
      mum.set({ t, talk: scTalk(S, t, 'mum'), mood: mumMood, look: t >= at('ladoo') ? 1 : 0.3 });
      ltOn(t, 'mum', at('guests') + 0.15);
      tr(kav, 520, 436, 1.02); kav.set({ t, mood: t < at('ladoo') ? 'sad' : 'deadpan', look: t >= at('ladoo') ? 0.9 : -0.8 });
      const jp = P(t, mid('guests', 0.08), 0.4, pop);
      op(jobs, clamp(jp * 3)); tr(jobs, 770, 260, Math.max(0.01, 0.75 + 0.25 * jp) * 0.95);
      jobRows.forEach((r, i) => op(r, P(t, mid('guests', [0.12, 0.42, 0.68][i]), 0.25, linear)));
      if (t < at('ladoo')) popIn(c18, t, mid('guests', 0.75), 960, 430);
      if (t >= at('ladoo') - 0.3) {
        show.boy = 1;
        const up = P(t, at('ladoo') - 0.3, 0.35, pop);
        tr(boy, 790, lerp(660, 446, up), 1.02);
        boy.set({ t, talk: scTalk(S, t, 'boy'), mood: 'happy', look: -0.3 });
        op(crumbs, 1); tr(crumbs, 790, 476);
        ltOn(t, 'boy', at('ladoo') + 0.05);
        popIn(c17, t, mid('ladoo', 0.4), 960, 430);
      }
    }
    if (sH) {
      // Agent X stands on the dining table; the family behind it
      show.ax = 1; show.kav = 1; show.boy = 1; show.mum = 1; show.dad = 1;
      const jump = P(t, cH, 0.4, pop);
      tr(ax, 600, lerp(560, 418, jump), 0.8);
      let xArms = 1, xMood = 'deadpan';
      if (t >= at('spy')) { xArms = 1; xMood = t > mid('spy', 0.4) ? 'shock' : 'deadpan'; }
      if (t >= at('bags')) { xArms = 0.35; xMood = t > mid('bags', 0.6) ? 'deadpan' : 'neutral'; }
      ax.set({ t, talk: scTalk(S, t, 'x'), mood: xMood, look: t >= at('spy') && t < at('bags') ? -0.6 : 0, arms: xArms, still: t >= at('spy') && t < at('bags') });
      tr(kav, 330, 436, 1.0); kav.set({ t, mood: t >= at('spy') ? 'shock' : 'neutral', look: 0.8 });
      tr(boy, 880, 450, 1.0);
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: t >= at('spy') ? 'shock' : 'happy', look: -0.8, lift: t >= at('spy') && t < at('bags') ? 1 : 0 });
      op(crumbs, 1); tr(crumbs, 880, 480);
      // Mum: busy, does not even look up; hands over a goodie bag
      tr(mum, 140, 426, 1.0);
      mum.set({ t, talk: scTalk(S, t, 'mum'), mood: 'neutral', look: t >= at('bags') ? 0.6 : -0.4, lift: t >= at('bags') && t < mid('bags', 0.7) ? 1 : 0 });
      tr(dad, 1060, 426, 1.0); dad.set({ t, mood: t >= at('spy') ? 'shock' : 'smug', look: -0.8 });
      popIn(cMis1, t, mid('mission', 0.08), 600, 170);
      popIn(cMis2, t, mid('mission', 0.5), 600, 240);
      if (t >= at('spy')) { op(cMis1, 0); op(cMis2, 0); }
      if (t >= at('bags')) {
        // the goodie bag travels from Mum to Agent X
        const bp = P(t, mid('bags', 0.15), 0.8, easeOut);
        op(bag, 1);
        tr(bag, lerp(200, 560, bp), lerp(520, 470, bp) - Math.sin(bp * Math.PI) * 60, 0.62);
      }
    }

    /* ---------- B, D: the test paper close up ---------- */
    const testOn = sB || sD;
    op(testShot, testOn);
    if (testOn) {
      const k = 1 + 0.03 * (sB ? P(t, cB, cC - cB, linear) : P(t, cD, cE - cD, linear));
      tr(bigTest, 600, 380, k);
      const ap = sB ? P(t, mid('test', 0.62), 0.35, pop) : 1;
      op(bigTest.ans, clamp(ap * 2));
      op(bigTest.cross, sD ? 1 : 0);
      const rp = sD ? P(t, mid('revise', 0.12), 0.35, pop) : 0;
      op(bigTest.revise, clamp(rp * 3)); tr(bigTest.revise, 0, 70, Math.max(0.01, lerp(1.6, 1, clamp(rp))), -6);
      op(bigTest.retest, sD ? P(t, mid('revise', 0.6), 0.3, linear) : 0);
    }

    /* ---------- F: the documentary zoom into the x ---------- */
    op(zoomShot, sF); op(finder, sF);
    if (sF) {
      const z = P(t, cF + 0.25, cG - cF - 0.25, easeIn);
      const k = 0.62 * Math.pow(16 / 0.62, z);
      view(zoomWrap, k, lerp(600, XC[0], z), lerp(380, XC[1], z), 600, 375);
      setText(zoomTxt, 'ZOOM ×' + (k / 0.62 >= 10 ? String(Math.round(k / 0.62)) : (k / 0.62).toFixed(1)));
    }

    /* ---------- G: Agent X's confessional ---------- */
    conf.set(sG, t);
    op(dossier, 0); vals.forEach(v => op(v, 0)); op(cAny, 0); op(board, 0); stampNo.set(0);
    badgeVals.forEach(b => op(b, 0));
    if (sG) {
      show.ax = 1;
      const blownAt = mid('blown', 0.78);
      let mood = 'deadpan', shades = 1, arms = 0.55, badge = 0, brackets = 0, look = 0;
      if (t < at('anyone')) mood = t < mid('name', 0.6) ? 'deadpan' : 'smug';
      else if (t < at('blown')) {
        badge = 1; mood = 'smug';
        const k = t < mid('anyone', 0.3) ? 0 : t < mid('anyone', 0.62) ? 1 : 2;
        op(badgeVals[k], 1);
        brackets = k === 1 ? P(t, mid('anyone', 0.3), 0.3, easeOut) : 0;
        arms = k === 2 ? 1 : 0.55;
      } else {
        look = 0.6; mood = t > blownAt ? 'smug' : 'deadpan';
        shades = 1 - P(t, blownAt - 0.4, 0.5, easeOut);
      }
      tr(ax, 330, 420, 1.3);
      ax.set({ t, talk: scTalk(S, t, 'x'), mood, look, shades, arms, badge, brackets });
      ltOn(t, 'x', at('name') + 0.1);
      // name: the dossier
      const dp = P(t, mid('name', 0.15), 0.45, pop) * (1 - P(t, at('anyone') - 0.15, 0.2, linear));
      op(dossier, clamp(dp * 2.5)); tr(dossier, 850, 350, Math.max(0.01, 0.75 + 0.25 * dp) * 0.95);
      // anyone: the values
      if (t >= at('anyone') - 0.1 && t < at('blown')) {
        const k = t < mid('anyone', 0.3) ? 0 : t < mid('anyone', 0.62) ? 1 : 2;
        const t0 = [at('anyone') - 0.05, mid('anyone', 0.3), mid('anyone', 0.62)][k];
        popIn(vals[k], t, t0, 850, 300, 1);
        if (k === 2) popIn(cAny, t, mid('anyone', 0.7), 850, 470);
      }
      // blown: the board, then the stamp
      if (t >= at('blown') - 0.1) {
        const bp = P(t, at('blown') - 0.1, 0.4, pop);
        op(board, clamp(bp * 3)); tr(board, 850, 360, Math.max(0.01, 0.85 + 0.15 * bp));
        bw.set(clamp(P(t, mid('blown', 0.12), 0.5, linear) * 1));
        op(bArr, P(t, mid('blown', 0.25), 0.3, linear));
        op(bNot, P(t, mid('blown', 0.5), 0.3, linear));
        stampNo.set(P(t, blownAt, 0.35, linear)); tr(stampNo, 850, 622, 0.56);
      }
    }

    /* ---------- I: title card ---------- */
    op(titleShot, sI); op(logo, 0); op(epi, 0);
    if (sI) {
      tr(rayP, 600, 640, 1, (t * 6 * AMP) % 360);
      tDiyas.forEach(d => d.upd(t));
      const lp = P(t, at('title') + 0.05, 0.6, pop);
      op(logo, clamp(lp * 2.5)); tr(logo, 600, 170, Math.max(0.01, 0.5 + 0.5 * lp));
      xs.forEach((g, i) => tr(g, (i ? 1 : -1) * 290, -30, 1, Math.sin(t * 2 + i) * 8 * AMP));
      op(epi, P(t, mid('title', 0.42), 0.4, linear));
      const castT = i => mid('title', 0.5) + i * 0.13, xp = [180, 390, 600, 810, 1020];
      const row = [[mum, 'happy', 0.78, 'mum'], [kav, 'happy', 0.82, 'kav'], [ax, 'smug', 0.66, 'ax'], [dad, 'smug', 0.74, 'dad'], [boy, 'happy', 0.8, 'boy']];
      row.forEach(([c, mood, s, key], i) => {
        const p = P(t, castT(i), 0.45, pop);
        show[key] = 1; op(c, clamp(p * 3));
        tr(c, xp[i], 540 + 30 * (1 - clamp(p)) - (key === 'ax' ? 20 : 0), Math.max(0.01, s * p));
        c.set({ t, mood, look: 0, lift: 0, arms: 1, shades: 1, badge: 0, brackets: 0 });
      });
    }

    /* characters not in this shot */
    if (!sI) { op(mum, show.mum); op(dad, show.dad); op(boy, show.boy); op(kav, show.kav); op(ax, show.ax); }
  };
});
