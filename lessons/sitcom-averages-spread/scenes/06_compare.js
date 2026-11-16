/* Scene 6: The beanbag final (comparing distributions).
   Shots (hard sitcom cuts; one studio world with a camera, plus the big question screen):
   A  studio wide: FINAL, the beanbag toss, 5 practice sessions × 10 throws; beanbags fly into the bucket.
   B  the screen: two dot plots on the same 0-10 scale. Mum's dots drop at 6, 6, 7, 6, 5 (Mum in the corner)
      -> Dad's at 10, 2, 9, 3, 6, "A ten!" (Dad) -> Mean: 30 ÷ 5 = 6 for both, a dashed mean line through both plots
      -> Ranger: braces, 7 − 5 = 2 and 10 − 2 = 8 -> Kavya: "consistent" and "variable".
   A  Dad: "I prefer exciting." Kavya to camera.  Mr Tan, the judge: an average AND the spread, in context.
   B  the two sentences: Centre, Spread, Story -> "On average ... a mean of 6 each." -> "But Mum's scores were more
      consistent ... 2 compared with 8." with the weak answer crossed out, SPOT ON!
   A  Benny: BREAKING NEWS, the viewers' poll, Team Priya 9, Team Kavya 7 -> Kavya: how many voted?
      -> Priya: three (Mum and Dad in the car park, and Priya) -> Mr Tan: a sample of 3 is far too small. Hold. */
scene('compare', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const GOLD = AS.gold, GREEN = '#1E9E5A', RED = '#D32F2F', ORANGE = '#E8730C', PINK = '#FFC2E8', SKY = '#7FD3FF', LIME = '#C8F59A';
  const popSet = (el, t, t0, t1, x, y, s) => { const p = t >= t0 && t < t1 ? P(t, t0, 0.35, linear) : 0; el.set(p); if (x !== undefined) tr(el, x, y, s === undefined ? 1 : s); };
  const chipA = (parent, text, col, size) => mkChip(parent, text, { size: size || 30, col: col || C.ink });
  const cam = (k, x0, y0) => [k, clamp(x0, 0, 1200 - 1200 / k), clamp(y0, 0, 750 - 750 / k)];
  const WIDE = cam(1, 0, 0);
  const view = (el, c) => el.setAttribute('transform', c[0] === 1 ? '' : `scale(${c[0].toFixed(4)}) translate(${(-c[1]).toFixed(1)} ${(-c[2]).toFixed(1)})`);
  const pSign = parent => {
    const g = G(parent);
    E('rect', { x: -4, y: -64, width: 8, height: 64, fill: '#8F9CAB', stroke: SC_INK, 'stroke-width': 2 }, g);
    E('rect', { x: -24, y: -112, width: 48, height: 48, rx: 9, fill: '#1F5FBF', stroke: '#FFFFFF', 'stroke-width': 4 }, g);
    T(g, 0, -76, 'P', { size: 36, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
    return g;
  };

  const Lbg = G(root), Lcast = G(root), Lfront = G(root), Lfore = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= A: Studio 5 ================= */
  const studioShot = G(Lbg);
  const studio = asStudio(studioShot);
  Lfront.appendChild(studio.front); Lfront.appendChild(studio.top);
  const carrier = asCarrier(studio.top); tr(carrier, 1100, 530, 0.7);
  const sign = pSign(studio.top); tr(sign, 738, 532);
  const bucket = asBucket(studio.top); tr(bucket, 660, 530, 0.72);
  const BAGS = [['#E8427F', 270], ['#2FA36B', 550], ['#E8427F', 270], ['#2FA36B', 550], ['#E8427F', 270]];
  const bags = BAGS.map(([col]) => asBeanbag(studio.top, col));
  const cFinal = chipA(Lfg, '**FINAL**: the beanbag toss', GOLD, 34);
  const cSess = chipA(Lfg, '**5** practice sessions × **10** throws', C.ink, 30);
  const cExc = chipA(Lfg, '"exciting" = range **8**', '#FFB070', 32);
  const cTwo = mkChip(Lfg, 'compare an **average** AND the **spread**,\nin **context**', { size: 32, col: GOLD });
  const cHow = chipA(Lfg, 'how many **voters**?', SKY, 32);
  const c3 = chipA(Lfg, '**3** votes', '#FF8A8A', 36);
  const cMe = chipA(Lfg, '+ Priya herself', PINK, 28);
  const cSmall = chipA(Lfg, 'a sample of **3**: far too small', '#FF8A8A', 30);
  const cProve = chipA(Lfg, 'the data **suggest**; they don’t **prove**', GOLD, 30);
  // the car in the car park: Priya's parents voting
  const car = G(Lfg);
  E('path', { d: 'M-90,10 L-90,-14 Q-84,-30 -60,-32 L-40,-58 Q-34,-64 -24,-64 L34,-64 Q44,-64 50,-56 L66,-32 Q90,-30 92,-12 L92,10 Z', fill: '#E8424F', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, car);
  E('path', { d: 'M-34,-34 L-22,-54 L8,-54 L8,-34 Z M16,-34 L16,-54 L40,-54 L54,-34 Z', fill: '#BFE6FF', stroke: SC_INK, 'stroke-width': 3 }, car);
  E('path', { d: 'M-14,-38 a9,9 0 1,0 18,0 a9,9 0 1,0 -18,0 M24,-38 a9,9 0 1,0 18,0 a9,9 0 1,0 -18,0', fill: '#C98E62', stroke: SC_INK, 'stroke-width': 2.5 }, car);
  E('path', { d: 'M-70,10 a16,16 0 1,0 32,0 a16,16 0 1,0 -32,0 M40,10 a16,16 0 1,0 32,0 a16,16 0 1,0 -32,0', fill: '#2A2A34', stroke: SC_INK, 'stroke-width': 3 }, car);
  const carP = G(car); tr(carP, 120, -20);
  E('rect', { x: -22, y: -22, width: 44, height: 44, rx: 8, fill: '#1F5FBF', stroke: '#FFFFFF', 'stroke-width': 4 }, carP);
  T(carP, 0, 12, 'P', { size: 32, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  const carL = mkText(car, 0, 52, 'Mum + Dad', { size: 26, anchor: 'middle', fill: C.ink });
  // the viewers' poll
  const poll = G(Lfg);
  E('rect', { x: 66, y: 112, width: 530, height: 158, rx: 18, fill: 'rgba(10,8,30,0.92)', stroke: '#FF5FC8', 'stroke-width': 4 }, poll);
  T(poll, 331, 150, "BREAKING NEWS: VIEWERS' POLL", { size: 28, weight: 800, anchor: 'middle', fill: '#FF5FC8', ls: 1 });
  const pollRows = [['Team Priya', 9, PINK], ['Team Kavya', 7, SKY]].map(([nm, v, col], i) => {
    const y = 186 + i * 48, g = G(poll);
    T(g, 90, y + 10, nm, { size: 26, weight: 700, fill: col });
    E('rect', { x: 252, y: y - 14, width: 260, height: 28, rx: 6, fill: 'rgba(255,255,255,0.12)' }, g);
    const bar = E('rect', { x: 252, y: y - 14, width: 0, height: 28, rx: 6, fill: col }, g);
    const lab = T(g, 532, y + 11, String(v), { size: 30, weight: 800, fill: '#FFFFFF' });
    return { bar, lab, v };
  });

  /* ================= B: the big question screen ================= */
  const scrShot = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#120826', '#2E1460', true) }, scrShot);
  E('ellipse', { cx: 165, cy: 560, rx: 250, ry: 260, fill: glow('#9C6BFF'), opacity: 0.45 }, scrShot);
  E('rect', { x: 0, y: 688, width: 1200, height: 62, fill: '#1A0B36' }, scrShot);
  E('path', { d: 'M0,688 L1200,688', stroke: '#7A3CE0', 'stroke-width': 4, opacity: 0.7 }, scrShot);
  const SCX = 735, SCY = 397;
  const scr = asScreen(scrShot, 826, 540, { title: 'PRACTICE SCORES' }); tr(scr, SCX, SCY);
  const SC = scr.content;
  const toW = (x, y) => [SCX + x, SCY + y];

  // the two dot plots, 0 to 10
  const gPlot = G(SC);
  const NX0 = -380, NU = 50, NX = v => NX0 + v * NU;
  const plotLine = (y) => {
    const g = G(gPlot);
    E('path', { d: `M${NX0 - 24},${y} L${NX(10) + 24},${y} M${NX(10) + 36},${y} L${NX(10) + 20},${y - 10} L${NX(10) + 20},${y + 10} Z`, stroke: MK.ink, 'stroke-width': 5, fill: MK.ink, 'stroke-linejoin': 'round' }, g);
    let d = ''; for (let v = 0; v <= 10; v++) { d += `M${NX(v)},${y - 11} L${NX(v)},${y + 11} `; T(g, NX(v), y + 42, String(v), { size: 26, weight: 600, anchor: 'middle', fill: MK.ink }); }
    E('path', { d, stroke: MK.ink, 'stroke-width': 4 }, g);
    return g;
  };
  const MY = -60, DY = 150;
  const lineM = plotLine(MY), lineD = plotLine(DY);
  const txtM = mkText(gPlot, NX0, -176, '**Mum:** 6, 6, 7, 6, 5', { size: 30, fill: '#B0236E' });
  const txtD = mkText(gPlot, NX0, 34, '**Dad:** 10, 2, 9, 3, 6', { size: 30, fill: '#1E7A4A' });
  const meanL = G(gPlot);
  E('path', { d: `M${NX(6)},-140 L${NX(6)},${DY + 14}`, stroke: RED, 'stroke-width': 4, 'stroke-dasharray': '12 8' }, meanL);
  T(meanL, NX(6) + 10, 30, 'mean', { size: 26, weight: 800, fill: RED });
  const mkDots = (vals, y, col) => vals.map((v, i) => {
    const lvl = vals.slice(0, i).filter(u => u === v).length;
    const d = E('circle', { cx: NX(v), cy: y - 18 - lvl * 32, r: 14, fill: col, stroke: MK.ink, 'stroke-width': 3 }, gPlot);
    return { d, y: y - 18 - lvl * 32 };
  });
  const MUM = [6, 6, 7, 6, 5], DAD = [10, 2, 9, 3, 6];
  const dotsM = mkDots(MUM, MY, '#FF5FA2'), dotsD = mkDots(DAD, DY, '#56D69B');
  const ten = E('circle', { cx: NX(10), cy: DY - 18, r: 24, fill: 'none', stroke: GOLD, 'stroke-width': 5 }, gPlot);
  const brM = mkBrace(gPlot, NX(7), MY + 50, NX(5), MY + 50, { col: GREEN, depth: 16 });
  const brD = mkBrace(gPlot, NX(10), DY + 54, NX(2), DY + 54, { col: ORANGE, depth: 16 });
  const SX0 = 168;
  const stM = [mkText(gPlot, SX0, -150, 'mean {{30 ÷ 5 = 6}}', { size: 28, fill: MK.ink }), mkText(gPlot, SX0, -104, 'range {{7 − 5 = 2}}', { size: 28, fill: GREEN })];
  const stD = [mkText(gPlot, SX0, 70, 'mean {{30 ÷ 5 = 6}}', { size: 28, fill: MK.ink }), mkText(gPlot, SX0, 116, 'range {{10 − 2 = 8}}', { size: 28, fill: ORANGE })];
  const same = mkChip(gPlot, 'the **same** mean', { size: 26, col: RED, fill: '#FFF0F0' });
  tr(same, SX0 + 110, -20);
  const lbM = mkChip(gPlot, '**consistent**', { size: 30, col: GREEN, fill: '#E6F7EC' }); tr(lbM, SX0 + 100, -48);
  const lbD = mkChip(gPlot, '**variable**', { size: 30, col: ORANGE, fill: '#FFF0E0' }); tr(lbD, SX0 + 100, 170);

  // the two sentences
  const gSent = G(SC);
  const css = ['**Centre**', '**Spread**', '**Story**'].map((s, i) => { const c = mkChip(gSent, s, { size: 30, col: [GREEN, ORANGE, '#5B2A9E'][i], fill: ['#E6F7EC', '#FFF0E0', '#F0E8FF'][i] }); tr(c, -250 + i * 250, -168); return c; });
  const s1 = mkText(gSent, NX0, -96, '1. On average, Mum and Dad scored the **same**:\n    a mean of **6** each.', { size: 30, fill: MK.ink, boldFill: GREEN });
  const s2 = mkText(gSent, NX0, 4, '2. But Mum’s scores were **more consistent**,\n    because her range was smaller: **2** compared with **8**.', { size: 28, fill: MK.ink, boldFill: ORANGE });
  const weak = G(gSent);
  mkText(weak, NX0, 150, 'weak: “Mum’s range is smaller.”', { size: 26, fill: '#9A8A92' });
  E('line', { x1: NX0 + 72, y1: 141, x2: NX0 + 360, y2: 141, stroke: RED, 'stroke-width': 4 }, weak);
  tr(cross(weak, 14), NX0 + 384, 141);
  mkText(weak, NX0, 196, 'no numbers, no comparison', { size: 26, fill: RED });
  const tk2 = tick(gSent, 18); tr(tk2, 372, 40);

  /* ================= the cast ================= */
  const stOK = asStamp(Lfg, true);
  const POS = { boy: [130, 452, 0.86], mum: [270, 440, 0.86], kav: [410, 440, 0.88], dad: [550, 440, 0.86], priya: [815, 446, 0.88], tan: [990, 440, 0.86] };
  const boy = cast(Lcast, 'boy', { s: POS.boy[2] });
  const mum = cast(Lcast, 'mum', { s: POS.mum[2] });
  const kav = cast(Lcast, 'kavya', { s: POS.kav[2] });
  const dad = cast(Lcast, 'dad', { s: POS.dad[2] });
  const priya = cast(Lcast, 'priya', { s: POS.priya[2], prop: 'phone' });
  const tan = cast(Lcast, 'tan', { s: POS.tan[2] });
  const mean = cast(Lcast, 'mean'), ranger = cast(Lcast, 'ranger');
  const benny = cast(Lfore, 'benny');
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cut points */
  const k = id => at(id) - 0.06;
  const SCREEN = [[k('mum'), k('exciting')], [k('css'), k('poll')]];
  const CORNER = [165, 612];

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const sScr = SCREEN.some(([a, b]) => t >= a && t < b) ? 1 : 0, sStu = 1 - sScr;
    op(studioShot, sStu); op(Lfront, sStu); op(scrShot, sScr);
    [cFinal, cSess, cExc, cTwo, cHow, c3, cMe, cSmall, cProve].forEach(c => c.set(0));
    stOK.set(0); op(car, 0); op(poll, 0);
    const show = { boy: 0, mum: 0, kav: 0, dad: 0, priya: 0, tan: 0, mean: 0, ranger: 0, benny: 0 };
    const who = scWho(S, t);
    const talk = w => scTalk(S, t, w);

    /* ---------- A: the studio ---------- */
    if (sStu) {
      studio.upd(t);
      op(studio.applause, 0); op(studio.logo, 0);
      let c = WIDE;
      if (t >= k('exciting') && t < k('two')) c = cam(1.5, 190, 120);          // Kavya and Dad
      else if (t >= k('two') && t < k('poll')) c = cam(1.6, 450, 120);         // Mr Tan, the judge
      else if (t >= k('how') && t < k('three')) c = cam(1.6, 140, 120);        // Kavya
      else if (t >= k('three')) c = cam(1.6, 450, 120);                        // Priya, then Mr Tan
      [studioShot, Lcast, Lfront, Lfore].forEach(el => view(el, c));
      op(studio.board, c[0] === 1 ? 1 : 0);
      ['priya', 'tan'].forEach(n => op(studio.plates[n], c[0] >= 1.5 ? 0 : 1));
      op(studio.plates.kavya, c[0] >= 1.5 ? 0 : 1);
      studio.board.set(0, '6'); studio.board.set(1, '–'); studio.board.set(2, '–'); studio.board.set(3, t < k('poll') ? '8' : '–');
      [0, 1, 2, 3].forEach(i => studio.board.lit(i, 0));
      carrier.set({ t, look: who === 'priya' ? -0.9 : who === 'tan' ? -0.5 : 0.2 });

      ['boy', 'mum', 'kav', 'dad', 'priya', 'tan'].forEach(kk => { show[kk] = 1; });
      Object.entries({ boy, mum, kav, dad, priya, tan }).forEach(([kk, ch]) => tr(ch, ...POS[kk]));
      const spk = { dad: POS.dad[0], kavya: POS.kav[0], tan: POS.tan[0], priya: POS.priya[0], benny: 1100 }[who];
      const L = x0 => (spk === undefined || Math.abs(spk - x0) < 1 ? 0 : clamp((spk - x0) / 260, -1, 1));
      let bm = 'happy', mm = 'neutral', km = 'neutral', dm = 'smug', pm = 'smug', tm = 'neutral';
      let bl = L(POS.boy[0]), ml = L(POS.mum[0]), kl = L(POS.kav[0]), dl = L(POS.dad[0]), pl = L(POS.priya[0]), tl = L(POS.tan[0]);
      let mlift = 0, dlift = 0, plift = 0;
      if (t < k('mum')) {   // the toss
        bl = 0.9; kl = 0.9; ml = 0.8; dl = 0.6; mm = 'happy'; pl = -0.9; tl = -0.9;
        mlift = Math.sin(t * 2.2) > 0.2 ? 1 : 0; dlift = Math.sin(t * 2.2 + 2.5) > 0.2 ? 1 : 0;
      }
      if (t >= k('exciting') && t < k('two')) { dm = 'smug'; dl = -0.5; km = t > end('exciting') - 0.6 ? 'deadpan' : 'annoyed'; kl = t > end('exciting') - 0.6 ? 0 : 0.8; }
      if (t >= k('two') && t < k('poll')) { tm = 'neutral'; pm = 'neutral'; }
      if (t >= k('poll') && t < k('how')) { pm = 'smug'; km = t > mid('poll', 0.7) ? 'annoyed' : 'neutral'; mm = t > mid('poll', 0.7) ? 'shock' : 'neutral'; dm = t > mid('poll', 0.7) ? 'shock' : 'neutral'; }
      if (t >= k('how') && t < k('three')) { km = 'annoyed'; kl = 0.9; pm = 'smug'; }
      if (t >= k('three') && t < k('sample')) { pm = t > end('three') ? 'neutral' : 'smug'; plift = t < mid('three', 0.7) ? 1 : 0; pl = 0; tl = -0.8; tm = 'deadpan'; }
      if (t >= k('sample')) { tm = t > mid('sample', 0.5) ? 'smug' : 'neutral'; tl = 0; pm = 'sad'; pl = 0.8; }
      boy.set({ t, talk: talk('boy'), mood: bm, look: bl });
      mum.set({ t, talk: talk('mum'), mood: mm, look: ml, lift: mlift });
      kav.set({ t, talk: talk('kavya'), mood: km, look: kl });
      dad.set({ t, talk: talk('dad'), mood: dm, look: dl, lift: dlift });
      priya.set({ t, talk: talk('priya'), mood: pm, look: pl, lift: plift });
      tan.set({ t, talk: talk('tan'), mood: tm, look: tl });

      // the toss: beanbags arc into the bucket (one of Dad's misses)
      op(bucket, t < k('mum') ? 1 : 0);
      bags.forEach((b, i) => {
        const t0 = at('final') + 0.6 + i * 1.15, p = clamp((t - t0) / 0.9);
        const fromX = BAGS[i][1], miss = i === 3;
        if (t >= k('mum') || p <= 0) { op(b, 0); return; }
        op(b, 1);
        const x1 = miss ? 1260 : 660, y1 = miss ? 380 : 455;
        const x = lerp(fromX, x1, p), y = lerp(330, y1, p) - Math.sin(p * Math.PI) * (miss ? 200 : 150);
        tr(b, x, y, p >= 1 && !miss ? 0.8 : 0.9, p * 300);
        if (p >= 1 && !miss) op(b, 0);
      });
      popSet(cFinal, t, at('final') + 0.1, k('mum'), 335, 150);
      popSet(cSess, t, mid('final', 0.45), k('mum'), 335, 226);
      popSet(cExc, t, mid('exciting', 0.3), k('two'), 470, 170);
      popSet(cTwo, t, mid('two', 0.3), k('poll'), 560, 178);
      if (t >= k('poll') && t < k('how')) {
        show.benny = 1;
        const up = P(t, at('poll') - 0.3, 0.4, pop);
        tr(benny, 1040, lerp(960, 572, up), 0.96);
        benny.set({ t, talk: talk('benny'), mood: 'happy', look: -0.8, lift: 1, ting: win(t, at('poll') + 0.1, at('poll') + 0.9, 0.15) });
        op(poll, P(t, at('poll') + 0.1, 0.3, linear));
        pollRows.forEach((r, i) => { const p = P(t, mid('poll', i ? 0.62 : 0.4), 0.6, easeOut); attr(r.bar, 'width', 260 * r.v / 10 * p); op(r.lab, p); });
      }
      popSet(cHow, t, mid('how', 0.2), k('three'), 470, 170);
      if (t >= k('three') && t < k('sample')) {
        popSet(c3, t, at('three') + 0.05, k('sample'), 300, 150);
        const cp = P(t, mid('three', 0.3), 0.35, pop);
        op(car, clamp(cp * 3)); tr(car, 760, 190, Math.max(0.01, 0.6 + 0.4 * cp));
        popSet(cMe, t, mid('three', 0.62), k('sample'), 300, 222);
      }
      popSet(cSmall, t, mid('sample', 0.1), 1e9, 470, 148);
      popSet(cProve, t, mid('sample', 0.48), 1e9, 470, 222);
    }

    /* ---------- B: the screen ---------- */
    if (sScr) {
      scr.upd(t);
      [Lcast, Lfore].forEach(el => view(el, WIDE));
      const plots = t < k('css');
      setText(scr.titleText, plots ? 'PRACTICE SCORES' : 'COMPARE: TWO SENTENCES');
      op(gPlot, plots); op(gSent, !plots);
      const [cx, cy] = CORNER;
      if (plots) {
        const seg = t < k('dad') ? 'mum' : t < k('means') ? 'dad' : t < k('spread') ? 'means' : t < k('consistent') ? 'spread' : 'consistent';
        if (seg === 'mum') { show.mum = 1; tr(mum, cx, cy, 1.0); mum.set({ t, talk: talk('mum'), mood: 'happy', look: 0.7 }); }
        if (seg === 'dad') { show.dad = 1; tr(dad, cx, cy, 1.0); dad.set({ t, talk: talk('dad'), mood: 'smug', look: 0.7, lift: t > mid('dad', 0.6) ? 1 : 0 }); }
        if (seg === 'means') { show.mean = 1; tr(mean, cx, 610, 0.72); mean.set({ t, talk: talk('mean'), mood: t > mid('means', 0.75) ? 'smug' : 'deadpan', look: 0.6, arms: t > mid('means', 0.7) ? 1 : 0 }); }
        if (seg === 'spread') { show.ranger = 1; tr(ranger, cx - 10, 590, 0.78); ranger.set({ t, talk: talk('ranger'), mood: 'neutral', look: 0.7, reach: 40 + 60 * P(t, mid('spread', 0.3), 1.2, ease) }); }
        if (seg === 'consistent') { show.kav = 1; tr(kav, cx, cy, 1.0); kav.set({ t, talk: talk('kavya'), mood: t > mid('consistent', 0.6) ? 'smug' : 'neutral', look: 0.7 }); }
        const dropIn = (dots, t0, gap) => dots.forEach(({ d, y }, i) => { const p = P(t, t0 + i * gap, 0.35, easeIn); attr(d, 'cy', lerp(y - 70, y, p)); op(d, clamp(p * 4)); });
        op(txtM, P(t, at('mum') + 0.05, 0.3, linear));
        dropIn(dotsM, mid('mum', 0.2), 0.32);
        op(txtD, P(t, at('dad'), 0.3, linear));
        if (t >= k('dad')) dropIn(dotsD, at('dad') + 0.25, 0.42); else dotsD.forEach(({ d }) => op(d, 0));
        op(ten, t >= k('dad') && t < k('means') ? P(t, mid('dad', 0.62), 0.25, linear) : 0);
        const mOn = t >= k('means');
        op(meanL, mOn ? P(t, mid('means', 0.7), 0.4, linear) : 0);
        op(stM[0], mOn ? P(t, at('means') + 0.1, 0.3, linear) : 0);
        op(stD[0], mOn ? P(t, mid('means', 0.38), 0.3, linear) : 0);
        same.set(mOn && t < k('consistent') ? P(t, mid('means', 0.72), 0.35, linear) : 0);
        const rOn = t >= k('spread');
        brM.set(rOn ? P(t, mid('spread', 0.36), 0.5, linear) : 0); brD.set(rOn ? P(t, mid('spread', 0.66), 0.5, linear) : 0);
        op(stM[1], rOn ? P(t, mid('spread', 0.4), 0.3, linear) : 0); op(stD[1], rOn ? P(t, mid('spread', 0.7), 0.3, linear) : 0);
        const cOn = t >= k('consistent');
        lbM.set(cOn ? P(t, at('consistent') + 0.3, 0.35, linear) : 0); lbD.set(cOn ? P(t, mid('consistent', 0.42), 0.35, linear) : 0);
      } else {
        const st = t >= k('story');
        show.kav = 1; tr(kav, cx, cy, 1.0); kav.set({ t, talk: talk('kavya'), mood: st && t > mid('story', 0.8) ? 'happy' : 'neutral', look: 0.7 });
        css.forEach((c, i) => c.set(st ? 1 : P(t, at('css') + 0.1 + i * 0.45, 0.35, linear)));
        op(s1, st ? 1 : P(t, mid('css', 0.42), 0.4, linear));
        op(s2, st ? P(t, at('story') + 0.1, 0.4, linear) : 0);
        op(weak, st ? P(t, mid('story', 0.62), 0.35, linear) : 0);
        op(tk2, st ? P(t, mid('story', 0.8), 0.25, linear) : 0);
        const so = st ? P(t, mid('story', 0.84), 0.35, linear) : 0;
        if (so > 0) { stOK.set(so); tr(stOK, ...toW(268, 176), 0.5); }
      }
    }

    op(boy, show.boy); op(mum, show.mum); op(kav, show.kav); op(dad, show.dad); op(priya, show.priya); op(tan, show.tan);
    op(mean, show.mean); op(ranger, show.ranger); op(benny, show.benny);
  };
});
