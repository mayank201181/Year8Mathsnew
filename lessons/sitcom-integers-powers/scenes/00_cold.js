/* Scene 0: Cold open (no chapter card).
   Friday evening, Kavya's flat in Block 208: the test comes back, 12/20, every lost mark a minus sign -> Mum
   (corrections; RC Family Day tomorrow), Ah Boy (ice cream, lucky draw, Priya's robot), Dad (the rice cooker)
   -> "I hate minus signs" -> documentary zoom into the minus of "5 − (−3) = 2": it opens its eyes -> Dash's
   confessional (the minus sign, less than zero, lives on the cold side of the number line; his poem that
   doesn't rhyme) -> the flat: Dash sits up on the test, "Kavya, your test is talking" -> title card. */
scene('cold', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);          // hard sitcom cut
  const view = (el, k, fx, fy, sx, sy) => el.setAttribute('transform', `translate(${sx.toFixed(1)} ${sy.toFixed(1)}) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const pc = (parent, text, col, size) => mkChip(parent, text, { size: size || 30, col: col || C.ink });
  const popAt = (c, t, t0, x, y, t1) => { c.set(t >= t0 && (t1 === undefined || t < t1) ? P(t, t0, 0.35, linear) : 0); tr(c, x, y); };
  const GOLD = '#FFE45C', PINK = '#FF8FC8', RED = '#FF8A8A', BLUE = '#9FD8FF';

  /* layers: sets, the family behind the table, the table, paper and chips, Dash (on top of his paper), HUD */
  const Lbg = G(root), Lcast = G(root), Lfront = G(root), Lpaper = G(root), Lfg = G(root), Ltop = G(root), Lhud = G(root);

  /* ================= A, D: the flat, Friday evening ================= */
  const flatShot = G(Lbg), flatWrap = G(flatShot);
  const flat = ipFlat(flatWrap, { night: true });
  const frontWrap = G(Lfront);
  frontWrap.appendChild(flat.front); frontWrap.appendChild(flat.top);
  const test = ipTest(Lpaper);
  const cKav = pc(Lfg, '**Kavya**, age 12', C.ink, 32);
  const cFri = pc(Lfg, '**Friday evening**', GOLD);
  const cBlk = pc(Lfg, 'Block 208', BLUE);
  const cLost = pc(Lfg, '8 marks lost: **all minus signs**', RED);
  const cCorr = pc(Lfg, 'corrections **tonight**', GOLD);
  const poster = G(Lfg);
  E('rect', { x: -230, y: -64, width: 460, height: 128, rx: 14, fill: '#E8424F', stroke: '#FFE45C', 'stroke-width': 4 }, poster);
  T(poster, 0, -12, 'RC FAMILY DAY', { size: 40, weight: 800, anchor: 'middle', fill: '#FFE45C', ls: 2 });
  T(poster, 0, 36, 'Saturday · the void deck', { size: 28, weight: 700, anchor: 'middle', fill: '#FFFFFF' });
  const boyChips = [['free **ice cream**', BLUE], ['**lucky draw**', GOLD], ["Priya's **robot**", '#C9B8FF']].map(([s, c]) => pc(Lfg, s, c));
  const prize = G(Lfg);
  E('rect', { x: -150, y: -150, width: 300, height: 250, rx: 18, fill: '#FFFDF6', stroke: '#C27C0E', 'stroke-width': 5 }, prize);
  T(prize, 0, -108, 'MATHS QUIZ', { size: 30, weight: 800, anchor: 'middle', fill: '#C27C0E' });
  const rc = ipRiceCooker(prize, { s: 0.62 }); tr(rc, -10, 70, 0.62);
  T(prize, 0, -72, '1st prize', { size: 28, weight: 700, anchor: 'middle', fill: MK.ink, font: FB });
  const cPlan = pc(Lfg, 'Tomorrow: prove minus signs are **useful**', GOLD);

  /* ================= B: zoom into the minus sign ================= */
  const zoomShot = G(Lbg), zoomWrap = G(zoomShot);
  E('rect', { x: -400, y: -300, width: 2000, height: 1350, fill: '#FFFFFF' }, zoomWrap);
  let rules = '';
  for (let y = 120; y < 760; y += 90) rules += `M-400,${y} L1600,${y} `;
  E('path', { d: rules, stroke: '#BFD8EE', 'stroke-width': 3 }, zoomWrap);
  E('line', { x1: 150, y1: -300, x2: 150, y2: 1050, stroke: '#F2A0A0', 'stroke-width': 4 }, zoomWrap);
  const ZS = 120, ZY = 430, INK = '#26324A';
  T(zoomWrap, 300, ZY - 180, 'Question 1', { size: 60, weight: 700, fill: INK });
  const x5 = 300, w5 = mkMeasure('5', { size: ZS }).w;
  mkMath(zoomWrap, x5, ZY, '5', { size: ZS, fill: INK });
  const DX0 = x5 + w5 + 34, DW = 84, DY = ZY - 46;           // the hand-drawn minus sign we zoom into
  E('rect', { x: DX0, y: DY - 7, width: DW, height: 14, rx: 7, fill: INK }, zoomWrap);
  const eyes = G(zoomWrap); tr(eyes, DX0 + DW / 2, DY);
  [-14, 14].forEach(x => { const e = G(eyes); tr(e, x, 0); E('ellipse', { rx: 5, ry: 4.2, fill: '#FFFFFF' }, e); E('circle', { r: 2.2, fill: '#121218' }, e); });
  mkMath(zoomWrap, DX0 + DW + 34, ZY, '(-3) = 2', { size: ZS, fill: INK });
  const zx = cross(zoomWrap, 34, '#D32F2F'); tr(zx, 1060, ZY - 40);
  const finder = G(Lhud);
  E('path', { d: 'M40,140 L40,40 L140,40 M1060,40 L1160,40 L1160,140 M1160,610 L1160,710 L1060,710 M140,710 L40,710 L40,610', fill: 'none', stroke: '#5A6670', 'stroke-width': 5, opacity: 0.8 }, finder);
  const zoomTxt = T(finder, 1130, 690, 'ZOOM ×1', { size: 30, weight: 700, anchor: 'end', fill: '#5A6670' });

  /* ================= C: Dash's confessional ================= */
  const conf = ipConf(Lbg, 'dash');
  const plaque = G(Lfg);
  E('rect', { x: -250, y: -150, width: 500, height: 300, rx: 18, fill: '#0E1222', stroke: '#9FB0E0', 'stroke-width': 5 }, plaque);
  T(plaque, 0, -88, 'THE MINUS SIGN', { size: 40, weight: 800, anchor: 'middle', fill: '#CFD8FF', ls: 2 });
  E('rect', { x: -70, y: -22, width: 140, height: 34, rx: 17, fill: ball('#8C98C8', '#2E3552'), stroke: '#FFFFFF', 'stroke-width': 3 }, plaque);
  T(plaque, 0, 100, 'less than zero', { size: 32, weight: 700, anchor: 'middle', fill: '#9FB0E0', font: FB });
  const homeG = G(Lfg);
  const NL = mkNumberLine(homeG, { from: -5, to: 5, len: 520, size: 28, ink: C.ink });
  const nx0 = NL.x(-5), nx1 = NL.x(0);
  homeG.insertBefore(E('rect', { x: nx0 - 10, y: -40, width: nx1 - nx0 + 10, height: 52, rx: 10, fill: '#5A6AA8', opacity: 0.45 }), homeG.firstChild);
  T(homeG, (nx0 + nx1) / 2, -56, 'home (cold)', { size: 28, weight: 700, anchor: 'middle', fill: BLUE });
  T(homeG, (NL.x(0) + NL.x(5)) / 2, -56, 'everyone else', { size: 28, weight: 600, anchor: 'middle', fill: C.muted, font: FB });
  // the poem page
  const page = G(Lfg);
  E('rect', { x: -270, y: -200, width: 540, height: 400, rx: 10, fill: '#FFFDF6', stroke: '#9AA6B2', 'stroke-width': 4 }, page);
  let pr = '';
  for (let y = -110; y < 190; y += 64) pr += `M-250,${y} L250,${y} `;
  E('path', { d: pr, stroke: '#BFD8EE', 'stroke-width': 2 }, page);
  T(page, -240, -150, 'POEM No. 47', { size: 34, weight: 800, fill: '#2E3552' });
  const pLines = ['Roses are red.', 'Violets are blue.', 'I am less than zero.'].map((s, i) => T(page, -240, -66 + i * 64, s, { size: 34, weight: 600, fill: INK, font: FB }));
  const pNo = G(page);
  T(pNo, -240, 134, "(doesn't rhyme)", { size: 32, weight: 700, fill: '#D32F2F', font: FB });
  const pX = cross(pNo, 18, '#D32F2F'); tr(pX, 50, 122);

  /* ================= E: title card ================= */
  const titleShot = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#121A3A', '#7A1E58', true) }, titleShot);
  let rays = '';
  for (let i = 0; i < 16; i++) { const a0 = i / 16 * TAU, a1 = a0 + TAU / 40; rays += `M0,0 L${(Math.cos(a0) * 1100).toFixed(0)},${(Math.sin(a0) * 1100).toFixed(0)} L${(Math.cos(a1) * 1100).toFixed(0)},${(Math.sin(a1) * 1100).toFixed(0)} Z `; }
  const rayP = E('path', { d: rays, fill: '#9FB0E0', opacity: 0.07 }, titleShot);
  E('ellipse', { cx: 600, cy: 610, rx: 600, ry: 170, fill: glow('#FF8FC8'), opacity: 0.3 }, titleShot);
  const logo = G(Lfg);
  const logo1 = T(logo, 0, -66, 'NEGATIVE', { size: 70, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 6 });
  const logo2 = T(logo, 0, 30, 'VIBES', { size: 112, weight: 800, anchor: 'middle', fill: GOLD, ls: 8 });
  [logo1, logo2].forEach(w => { w.setAttribute('stroke', '#1A0E2A'); w.setAttribute('stroke-width', 12); w.setAttribute('paint-order', 'stroke'); w.setAttribute('stroke-linejoin', 'round'); });
  const bars = [-1, 1].map(sd => { const b = G(logo); tr(b, sd * 330, -20); E('rect', { x: -48, y: -16, width: 96, height: 32, rx: 16, fill: ball('#8C98C8', '#2E3552'), stroke: '#FFFFFF', 'stroke-width': 3 }, b); return b; });
  const epi = T(Lfg, 600, 302, 'Episode 1: Two Wrongs Make a Right', { size: 40, weight: 700, anchor: 'middle', fill: '#FFFFFF' });

  /* ================= the cast ================= */
  const mum = cast(Lcast, 'mum');
  const dad = cast(Lcast, 'dad');
  const boy = cast(Lcast, 'boy');
  const kav = cast(Lcast, 'kavya');
  const dash = cast(Ltop, 'dash');
  const lt = { kavya: ipLowerThird(Lhud, 'kavya'), mum: ipLowerThird(Lhud, 'mum'), dad: ipLowerThird(Lhud, 'dad'), boy: ipLowerThird(Lhud, 'boy'), dash: ipLowerThird(Lhud, 'dash') };
  const ltOn = (t, who, t0) => lt[who].set(win(t, t0, t0 + 3.1, 0.3));
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cut points */
  const cB = at('tiny') - 0.06, cC = at('hi') - 0.06, cD = at('talk') - 0.06, cE = at('title') - 0.06;
  const XK = 230, XM = 530, XD = 775, XB = 1000, YB = 446;      // where the family stands behind the table

  return t => {
    op(blackout, 1 - P(t, 0, 0.6, linear));
    const sA = on(t, -1, cB), sB = on(t, cB, cC), sC = on(t, cC, cD), sD = on(t, cD, cE), sE = on(t, cE, 1e9);
    for (const k in lt) lt[k].set(0);
    const show = { mum: 0, dad: 0, boy: 0, kav: 0, dash: 0 };
    [cKav, cFri, cBlk, cLost, cCorr, cPlan].forEach(c => c.set(0)); boyChips.forEach(c => c.set(0));
    op(poster, 0); op(prize, 0); op(test, 0);

    /* ---------- A, D: the flat ---------- */
    const flatOn = sA || sD;
    op(flatShot, flatOn); op(frontWrap, flatOn);
    if (sA) {
      // slow push, then a push-in on Kavya for "I hate minus signs"
      const push = P(t, 0, at('hate'), linear), hate = P(t, at('hate') - 0.1, 0.5, easeOut);
      const k = 1 + 0.05 * push + 0.42 * hate;
      const fx = lerp(600, XK + 40, hate), fy = lerp(400, 400, hate);
      view(flatWrap, k, fx, fy, lerp(600, 520, hate), 375); view(frontWrap, k, fx, fy, lerp(600, 520, hate), 375);
      view(Lcast, k, fx, fy, lerp(600, 520, hate), 375); view(Lpaper, k, fx, fy, lerp(600, 520, hate), 375);
      // Kavya
      show.kav = 1; tr(kav, XK, YB, 1.02);
      let km = 'neutral', kl = 0.3;
      if (t >= at('score') - 0.2 && t < at('mum')) { km = 'sad'; kl = 0.6; }
      else if (t >= at('mum') && t < at('hate')) { km = 'sad'; kl = 0.9; }
      else if (t >= at('hate')) { km = 'annoyed'; kl = 0; }
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
      ltOn(t, 'kavya', at('kavya') + 1.4);
      popAt(cKav, t, mid('kavya', 0.12), 480, 300, at('score'));
      popAt(cFri, t, mid('kavya', 0.5), 850, 160, at('score'));
      popAt(cBlk, t, mid('kavya', 0.62), 850, 230, at('score'));
      // the test: up big on "score", then propped on the table
      if (t >= at('score') - 0.1) {
        op(test, 1);
        const up = P(t, at('score') - 0.1, 0.4, pop), down = P(t, end('score') + 0.2, 0.45, ease);
        const x = lerp(820, 372, down), y = lerp(lerp(640, 360, up), 462, down), s = lerp(0.82, 0.26, down);
        tr(test, x, y, Math.max(0.01, s), lerp(-3, -6, down));
        test.show(0);
        popAt(cLost, t, mid('score', 0.45), 820, 680 - 40, at('mum'));
      }
      // Mum
      if (t >= at('mum') - 0.3) {
        show.mum = 1;
        const upM = P(t, at('mum') - 0.3, 0.35, easeOut);
        tr(mum, XM, lerp(660, YB, upM), 1.02);
        mum.set({ t, talk: scTalk(S, t, 'mum'), mood: t < at('boy') ? 'neutral' : t >= at('hate') ? 'deadpan' : 'smug', look: t < at('boy') ? -0.8 : t < at('dad') ? 0.8 : t < at('hate') ? 0.8 : -0.8 });
        ltOn(t, 'mum', at('mum') + 0.05);
        popAt(cCorr, t, mid('mum', 0.15), 760, 150, at('boy'));
        if (t >= mid('mum', 0.5) && t < at('boy')) { op(poster, P(t, mid('mum', 0.5), 0.3, linear)); tr(poster, 820, 270); }
      }
      // Ah Boy
      if (t >= at('boy') - 0.3) {
        show.boy = 1;
        const upB = P(t, at('boy') - 0.3, 0.35, pop);
        tr(boy, XB, lerp(680, YB + 12, upB), 1.02);
        boy.set({ t, talk: scTalk(S, t, 'boy'), mood: t >= at('hate') ? 'shock' : 'happy', look: t < at('dad') ? -0.3 : -0.8, lift: t < at('dad') ? 1 : 0 });
        ltOn(t, 'boy', at('boy') + 0.05);
        boyChips.forEach((c, i) => popAt(c, t, mid('boy', 0.08 + i * 0.3), [700, 860, 1030][i], [150, 230, 150][i], at('dad')));
      }
      // Dad and the rice cooker
      if (t >= at('dad') - 0.3) {
        show.dad = 1;
        const upD = P(t, at('dad') - 0.3, 0.35, easeOut);
        tr(dad, XD, lerp(680, YB, upD), 1.02);
        dad.set({ t, talk: scTalk(S, t, 'dad'), mood: t >= at('hate') ? 'shock' : 'smug', look: t >= at('hate') ? -0.9 : 0.2, lift: t >= mid('dad', 0.3) && t < at('hate') ? 1 : 0 });
        ltOn(t, 'dad', at('dad') + 0.05);
        if (t >= mid('dad', 0.35) && t < at('hate')) { const pp = P(t, mid('dad', 0.35), 0.4, pop); op(prize, clamp(pp * 3)); tr(prize, 990, 240, Math.max(0.01, 0.62 + 0.18 * pp)); }
      }
    }

    /* ---------- B: documentary zoom into the minus sign ---------- */
    op(zoomShot, sB); op(finder, sB);
    if (sB) {
      const z = P(t, cB + 0.25, cC - cB - 0.7, easeIn);
      const k = 0.62 * Math.pow(14 / 0.62, z);
      view(zoomWrap, k, lerp(640, DX0 + DW / 2, z), lerp(400, DY, z), 600, 375);
      setText(zoomTxt, 'ZOOM ×' + (k / 0.62 >= 10 ? String(Math.round(k / 0.62)) : (k / 0.62).toFixed(1)));
      const open = P(t, cC - 0.55, 0.3, easeOut);
      eyes.setAttribute('transform', `translate(${DX0 + DW / 2} ${DY}) scale(1 ${Math.max(0.01, open).toFixed(3)})`);
    }

    /* ---------- C: Dash's confessional ---------- */
    conf.set(sC, t);
    op(plaque, 0); op(homeG, 0); op(page, 0);
    if (sC) {
      show.dash = 1;
      const push = t >= at('poem') ? P(t, at('poem'), end('poem') + 0.6 - at('poem'), linear) : 0;
      tr(dash, 320, 420, 1.42 * (1 + 0.06 * push));
      let dm = 'sad', dl = 0;
      if (t >= at('poem')) { dm = t > mid('poem', 0.7) ? 'deadpan' : 'sad'; dl = t < mid('poem', 0.6) ? 0.5 : 0; }
      dash.set({ t, talk: scTalk(S, t, 'dash'), mood: dm, look: dl, arms: t > mid('hi', 0.75) && t < at('poem') ? 0.5 : 0 });
      ltOn(t, 'dash', at('hi') + 0.1);
      if (t < at('poem') - 0.1) {
        const pp = P(t, mid('hi', 0.08), 0.45, pop);
        op(plaque, clamp(pp * 2.5)); tr(plaque, 850, 270, Math.max(0.01, 0.7 + 0.3 * pp));
        const hp = P(t, mid('hi', 0.4), 0.4, linear);
        op(homeG, hp); tr(homeG, 850 - 260, 560);
      } else {
        const pg = P(t, at('poem') - 0.1, 0.35, pop);
        op(page, clamp(pg * 2.5)); tr(page, 850, 370, Math.max(0.01, 0.82 + 0.18 * pg), -2);
        pLines.forEach((l, i) => op(l, P(t, mid('poem', 0.13 + i * 0.13), 0.25, linear)));
        op(pNo, P(t, mid('poem', 0.6), 0.25, linear));
      }
    }

    /* ---------- D: "Your test is talking." ---------- */
    if (sD) {
      [flatWrap, frontWrap, Lcast, Lpaper].forEach(L => L.removeAttribute('transform'));
      show.kav = 1; show.boy = 1; show.dash = 1;
      tr(kav, 250, YB, 1.02);
      kav.set({ t, mood: 'shock', look: 0.7 });
      tr(boy, 950, YB + 12, 1.02);
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: 'happy', look: -0.8, lift: t < at('plan') ? 1 : 0 });
      op(test, 1); test.show(0); tr(test, 600, 392, 0.58, -2);
      const sit = P(t, cD + 0.2, 0.5, pop);
      const pushD = t >= at('plan') ? P(t, at('plan'), end('plan') - at('plan'), linear) : 0;
      tr(dash, 600, lerp(320, 205, sit), 0.62 * (1 + 0.1 * pushD));
      dash.set({ t, talk: scTalk(S, t, 'dash'), mood: t < at('plan') ? 'sad' : 'deadpan', look: t < at('plan') ? -0.6 : 0 });
      popAt(cPlan, t, mid('plan', 0.25), 600, 640);
    }

    /* ---------- E: title card ---------- */
    op(titleShot, sE); op(logo, 0); op(epi, 0);
    if (sE) {
      tr(rayP, 600, 640, 1, (t * 6 * AMP) % 360);
      const lp = P(t, at('title') + 0.05, 0.6, pop);
      op(logo, clamp(lp * 2.5)); tr(logo, 600, 190, Math.max(0.01, 0.5 + 0.5 * lp));
      bars.forEach((b, i) => tr(b, (i ? 1 : -1) * 330, -20, 1, Math.sin(t * 2 + i) * 6 * AMP));
      op(epi, P(t, mid('title', 0.42), 0.4, linear));
      const castT = i => mid('title', 0.5) + i * 0.13, xs = [180, 390, 600, 810, 1020];
      const row = [[mum, 'smug', 0.66, 'mum', 0], [kav, 'happy', 0.74, 'kav', 0], [dash, 'sad', 0.6, 'dash', 0], [dad, 'smug', 0.66, 'dad', 0], [boy, 'happy', 0.74, 'boy', 1]];
      row.forEach(([c, mood, s, key, lift], i) => {
        const p = P(t, castT(i), 0.45, pop);
        show[key] = 1; op(c, clamp(p * 3));
        const y = key === 'dash' ? 560 : 512;
        tr(c, xs[i], y + 30 * (1 - clamp(p)), Math.max(0.01, s * p));
        c.set({ t, mood, look: 0, lift });
      });
    }

    /* characters not in this shot */
    if (!sE) { op(mum, show.mum); op(dad, show.dad); op(boy, show.boy); op(kav, show.kav); op(dash, show.dash); }
    if (sB || sC || sE) { Lcast.removeAttribute('transform'); Lpaper.removeAttribute('transform'); }
  };
});
