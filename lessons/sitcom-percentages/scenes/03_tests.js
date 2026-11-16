/* Scene 3: Mr Tan buys red pens (one quantity as a percentage of another).
   Shots (hard sitcom cuts):
   A  noon, the bookshop (pcShop books): Mr Tan walks in on the customer side with a fat bundle of red pens (lower third),
      Kavya and Priya behind the counter. The test papers fly onto a board: Kavya 18/24, Priya 21/30 -> Priya: 21 > 18
      -> Percy pops up on the counter: different totals! (raw bars 24 and 30 units long, 18 and 21 shaded) ->
      percentage = part/whole × 100 -> 18/24 = 0.75 = 75%, 21/30 = 0.7 = 70%: the bars stretch to the same 100% length,
      100% CORRECT -> "I demand a recount." (RECOUNT chip)
   B  the reaction shot: a slow push-in on Mr Tan's pun ("marked down"), deadpan faces, *cricket*.
   A2 the board again: Ah Boy pops up with sweets: 45 ÷ 2 × 100 = 2250%! -> same units first: $2 = 200 cents,
      45/200 × 100 = 22.5% (2250% crossed out) -> Percy's scorecard: 4. Mr Tan's smile fades. */
scene('tests', S => {
  const { at, end, mid } = S, root = S.root;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const view = (el, k, fx, fy, sx, sy) => el.setAttribute('transform', `translate(${sx.toFixed(1)} ${sy.toFixed(1)}) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const popAt = (el, t, t0, x, y, t1) => { el.set(t >= t0 && t < (t1 === undefined ? 1e9 : t1) ? P(t, t0, 0.4, linear) : 0); tr(el, x, y); };
  const chipM = (parent, text, col, size) => mkChip(parent, text, { size: size || 30, col: col || C.ink });
  const GOLD = '#FFE45C', RED = '#D32F2F', INK = MK.ink, BLUE = '#2E5AAC', GREEN = '#1E9E5A', PINKC = '#FF9AA4';
  const KCOL = '#4C8DF0', PCOL = '#E06BA8';

  /* layers: everything that the camera pushes in on lives in cam */
  const cam = G(root), Lhud = G(root), Lfg = G(root);

  /* ================= the bookshop ================= */
  const shop = pcShop(cam, { name: 'BOOKS', kind: 'books', col: '#2E7D4F', poster: '**SALE**' });
  const Lboard = G(shop.mid), Lmid = G(shop.mid);
  const Ltan = G(cam), Lpaper = G(cam);

  /* ================= the board (behind the girls, over the back wall) ================= */
  const BX = 830, BY = 356;
  const wb = mkWhiteboard(Lboard, 460, 330); tr(wb, BX, BY);
  const B = G(wb);   // local: x -206..206, y -141..164 visible above the counter

  // the bars: raw (24 and 30 units of 10 px), then stretched to the same 100% length (300 px)
  const bars = [['Kavya', 24, 18, KCOL, '75%'], ['Priya', 30, 21, PCOL, '70%']].map(([nm, n, k, col, pc], i) => {
    const g = G(B), y = -122 + i * 64;
    mkText(g, -196, y + 30, nm, { size: 28, anchor: 'start', fill: col, weight: 800 });
    const box = E('rect', { x: -96, y, width: n * 10, height: 40, fill: '#FFFFFF', stroke: INK, 'stroke-width': 3 }, g);
    const sh = E('rect', { x: -96, y, width: k * 10, height: 40, fill: col, stroke: INK, 'stroke-width': 3 }, g);
    let d = ''; for (let j = 1; j < n; j++) d += `M${-96 + j * 10},${y} L${-96 + j * 10},${y + 40} `;
    const ticks = E('path', { d, stroke: INK, 'stroke-width': 1.5, opacity: 0.5 }, g);
    const raw = T(g, -96 + k * 5, y + 30, `${k} of ${n}`, { size: 26, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
    const pct = T(g, -96 + 112, y + 30, pc, { size: 28, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
    return { g, box, sh, ticks, raw, pct, n, k, y };
  });
  // the formula
  const fGrp = G(B);
  mkMath(fGrp, 0, 46, '"percentage" = "part"/"whole" × 100', { size: 31, anchor: 'middle', fill: INK });
  const fNote = mkText(fGrp, -40, 136, 'the **whole**: after "out of"', { size: 28, anchor: 'middle', fill: '#5A6670', boldFill: RED });
  const fArrow = arrow(fGrp, 20, 112, 56, 84, { color: RED, width: 4 });
  // the working
  const wk = mkWorking(B, -10, -6, [{ m: '18/24 = 0.75 = 75%', col: KCOL }, { m: '21/30 = 0.7 = 70%', col: PCOL }], { size: 34, gap: 14 });
  wk.lines[0].inner.querySelectorAll('text').forEach(e => e.setAttribute('fill', '#2B63C9'));
  wk.lines[1].inner.querySelectorAll('text').forEach(e => e.setAttribute('fill', '#B8336A'));
  // the sweets
  const swG = G(B);
  mkText(swG, 0, -96, '**45c** of my **$2**', { size: 32, anchor: 'middle', fill: INK, boldFill: BLUE });
  const swA = mkMath(swG, 0, -18, '45 ÷ 2 × 100', { size: 44, anchor: 'middle', fill: RED });
  const swB = mkMath(swG, 0, 82, '= 2250%', { size: 72, anchor: 'middle', fill: RED });
  // same units
  const unG = G(B);
  const un0 = mkMath(unG, 0, -104, '45 ÷ 2 × 100 = 2250%', { size: 30, anchor: 'middle', fill: '#B9A0A0' });
  const unX = cross(unG, 22, RED); tr(unX, 160, -114);
  const unS = E('line', { x1: -150, y1: -114, x2: 150, y2: -114, stroke: RED, 'stroke-width': 4 }, unG);
  const un1 = mkText(unG, 0, -36, '{{$2}} = **200 cents**', { size: 36, anchor: 'middle', fill: INK, boldFill: BLUE });
  const un2 = mkMath(unG, 0, 70, '45/200 × 100 = 22.5%', { size: 44, anchor: 'middle', fill: GREEN });

  /* the test papers (fly from Mr Tan's hand onto the board) */
  const papers = [['Kavya', '18/24', KCOL], ['Priya', '21/30', PCOL]].map(([nm, fr, col], i) => {
    const g = G(Lpaper), inner = G(g);
    E('rect', { x: -95, y: -120, width: 190, height: 240, rx: 6, fill: '#FFFFFF', stroke: INK, 'stroke-width': 3 }, inner);
    E('rect', { x: -95, y: -120, width: 190, height: 44, rx: 6, fill: col }, inner);
    T(inner, 0, -88, nm, { size: 28, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
    for (let j = 0; j < 4; j++) E('line', { x1: -70, y1: 74 + j * 12, x2: 70, y2: 74 + j * 12, stroke: '#C9D3DC', 'stroke-width': 3 }, inner);
    const m = mkMath(inner, 0, 18, fr, { size: 62, anchor: 'middle', fill: RED, weight: 700 });
    E('ellipse', { cx: 0, cy: 6, rx: 72, ry: 78, fill: 'none', stroke: RED, 'stroke-width': 4 }, inner);
    g.inner = inner; g.m = m;
    return g;
  });
  const PAPER_AT = [[BX - 110, 350], [BX + 110, 350]];
  const ringP = E('rect', { x: -102, y: -127, width: 204, height: 254, rx: 10, fill: 'none', stroke: GOLD, 'stroke-width': 8 }, papers[1]);

  /* chips */
  const ch = {
    noon: chipM(Lfg, '**Noon**', GOLD, 34),
    pens: chipM(Lfg, '**RED PENS** × 50', PINKC, 30),
    win: mkChip(Lfg, '{{21 > 18}}', { size: 40, col: GOLD, solid: true }),
    diff: chipM(Lfg, 'different **totals**!', GOLD, 32),
    recount: mkChip(Lfg, 'RECOUNT', { size: 36, col: '#FF6B7A', solid: true }),
    units: chipM(Lfg, '**same units** first!', GOLD, 32),
    four: chipM(Lfg, '**4** out of 100', GOLD, 34),
  };
  const stampOK = pcStamp(Lfg, true);
  const cricket = G(Lfg);
  const crChip = chipM(cricket, '*cricket*', '#7EE08A', 28); crChip.set(1);
  const crB = G(cricket); tr(crB, 120, 4);
  E('ellipse', { cx: 0, cy: 0, rx: 24, ry: 11, fill: '#5BBF4A', stroke: SC_INK, 'stroke-width': 3 }, crB);
  E('circle', { cx: 22, cy: -4, r: 8, fill: '#5BBF4A', stroke: SC_INK, 'stroke-width': 3 }, crB);
  E('path', { d: 'M-10,6 L-26,22 M6,8 L0,24 M-20,-4 L-40,-26 L-30,8 M24,-10 Q40,-34 54,-30', fill: 'none', stroke: SC_INK, 'stroke-width': 3, 'stroke-linecap': 'round' }, crB);

  /* ================= the cast ================= */
  const kav = cast(Lmid, 'kavya', { s: 0.9 });
  const priya = cast(Lmid, 'priya', { s: 0.9, prop: 'paper' });
  const percy = cast(shop.top, 'percy', { s: 0.55 });
  const tan = cast(Ltan, 'tan', { prop: null, hand: true });
  const boy = cast(Ltan, 'boy', { s: 0.95 });
  // Mr Tan's bundle of red pens
  const bundle = G(tan.hand);
  [-24, -12, 0, 12, 24].forEach((a, i) => {
    const p = G(bundle); tr(p, (i - 2) * 6, 0, 1, a);
    E('rect', { x: -6, y: -92, width: 12, height: 80, rx: 4, fill: '#F4F7FA', stroke: SC_INK, 'stroke-width': 2.5 }, p);
    E('rect', { x: -7, y: -104, width: 14, height: 22, rx: 4, fill: '#E8424F', stroke: SC_INK, 'stroke-width': 2.5 }, p);
  });
  E('rect', { x: -26, y: -44, width: 52, height: 12, rx: 4, fill: '#FFC93C', stroke: SC_INK, 'stroke-width': 2 }, bundle);   // rubber band
  // Ah Boy's packet of sweets
  const sweets = G(boy.hand); tr(sweets, 0, -46);
  E('path', { d: 'M-34,-46 L34,-46 L30,40 L-30,40 Z', fill: '#FF5FA2', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, sweets);
  E('path', { d: 'M-34,-46 L-26,-58 L-16,-46 L-6,-58 L4,-46 L14,-58 L24,-46 L34,-58 L34,-46', fill: '#FF5FA2', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, sweets);
  [[-14, -10, '#FFE45C'], [12, 0, '#7EE08A'], [-6, 20, '#4CC9F0']].forEach(([x, y, c]) => E('circle', { cx: x, cy: y, r: 9, fill: c, stroke: SC_INK, 'stroke-width': 2 }, sweets));

  const lt = { tan: pcLowerThird(Lhud, 'tan') };
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cuts */
  const cB = at('joke') - 0.06, cA2 = at('sweets') - 0.06;
  const PERCY = [1090, 458];

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const sA = on(t, -1, cB) || on(t, cA2, 1e9), sB = on(t, cB, cA2);
    for (const k in ch) ch[k].set(0);
    stampOK.set(0); op(cricket, 0); lt.tan.set(0);
    const who = scWho(S, t);
    const show = { boy: 0, percy: 0 };

    /* camera: still in A, a slow push-in on the pun */
    if (sB) { const pz = P(t, cB, cA2 - cB - 0.2, ease); view(cam, lerp(1.0, 1.22, pz), 470, 430, lerp(470, 560, pz), 430); }
    else cam.removeAttribute('transform');

    /* the girls behind the counter */
    tr(kav, 360, 440, 0.9); tr(priya, 540, 440, 0.9);
    let km = 'neutral', kl = -0.8, pm = 'neutral', pl = -0.8, plift = 0;
    if (t < at('marks')) { km = 'happy'; pm = 'happy'; }
    else if (t < at('win')) { km = 'neutral'; pm = 'neutral'; }
    else if (t < at('rescale')) { km = 'annoyed'; kl = 0.8; pm = 'smug'; pl = 0.3; plift = 1; }
    else if (t < at('formula')) { km = 'neutral'; kl = 0.9; pm = 'smug'; pl = 0.9; plift = 1; }
    else if (t < at('calc')) { km = 'neutral'; kl = -0.8; pm = 'neutral'; pl = -0.8; }
    else if (t < at('recount')) { km = t > mid('calc', 0.7) ? 'smug' : 'neutral'; kl = 0.6; pm = t > mid('calc', 0.7) ? 'shock' : 'neutral'; pl = 0.6; }
    else if (t < cB) { km = 'smug'; kl = 0.8; pm = 'annoyed'; pl = -0.8; plift = 1; }
    else if (t < cA2) { const dp = t > mid('joke', 0.85); km = dp ? 'deadpan' : 'neutral'; pm = dp ? 'deadpan' : 'neutral'; kl = pl = -0.8; }
    else if (t < at('units')) { km = 'shock'; kl = 0.9; pm = 'happy'; pl = 0.9; }
    else if (t < at('score')) { km = 'neutral'; kl = 0.9; pm = 'neutral'; pl = 0.9; }
    else { km = 'deadpan'; kl = 0.9; pm = 'happy'; pl = 0.9; }
    kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
    priya.set({ t, talk: scTalk(S, t, 'priya'), mood: pm, look: pl, lift: plift });

    /* Mr Tan, customer side */
    const walk = P(t, at('noon') - 0.4, 1.2, easeOut);
    tr(tan, lerp(-160, 170, walk), 565, 1.0);
    let tm = 'happy', tl = 0.6, tlift = 0;
    if (t >= at('marks') && t < at('win')) tlift = 1;
    if (t >= at('win') && t < at('formula')) { tm = 'neutral'; tl = 0.8; }
    if (t >= at('formula') && t < at('calc')) { tm = 'happy'; tlift = 1; }
    if (t >= at('calc') && t < cB) { tm = 'happy'; tl = 0.8; }
    if (sB) { tm = 'happy'; tl = 0.6; tlift = 1; }
    if (t >= cA2 && t < at('score')) { tm = 'neutral'; tl = 0.9; }
    if (t >= at('score')) { tm = t > mid('score', 0.55) ? 'sad' : 'happy'; tl = 0.9; }
    tan.set({ t, talk: scTalk(S, t, 'tan'), mood: tm, look: tl, lift: tlift });
    lt.tan.set(win(t, mid('noon', 0.3), mid('noon', 0.3) + 3.2, 0.3));
    popAt(ch.noon, t, at('noon') + 0.1, 640, 60, at('marks'));
    popAt(ch.pens, t, mid('noon', 0.72), 330, 270, at('marks'));

    /* Percy on the counter, from "rescale" */
    if (t >= at('rescale') - 0.2) {
      show.percy = 1;
      const up = P(t, at('rescale') - 0.2, 0.35, pop);
      tr(percy, PERCY[0], lerp(PERCY[1] + 120, PERCY[1], up), 0.55);
      let mood = 'happy', look = -0.8, card = 0;
      if (sB) { mood = t > mid('joke', 0.85) ? 'deadpan' : 'neutral'; }
      if (t >= at('sweets') && t < at('units')) mood = 'shock';
      if (t >= at('score')) { mood = 'deadpan'; card = P(t, mid('score', 0.4), 0.35, pop); }
      percy.set({ t, talk: scTalk(S, t, 'percy'), mood, look, card, score: '4' });
    }

    /* the board: on from "marks" except in the reaction shot */
    const boardOn = t >= at('marks') - 0.1;
    op(wb, boardOn ? 1 : 0);
    // papers: fly from Mr Tan's hand onto the board during "marks", leave at "rescale"
    papers.forEach((pg, i) => {
      const k = P(t, mid('marks', 0.2 + 0.35 * i), 0.6, ease), gone = P(t, at('rescale') - 0.05, 0.3, easeIn);
      const vis = sA && t >= mid('marks', 0.2 + 0.35 * i) && t < at('rescale') + 0.25;
      op(pg, vis ? 1 - gone : 0);
      tr(pg, lerp(150, PAPER_AT[i][0], k), lerp(430, PAPER_AT[i][1], k) - Math.sin(k * Math.PI) * 80, lerp(0.3, 1, k), lerp(-30, i ? 4 : -4, k));
    });
    op(ringP, t >= at('win') ? P(t, mid('win', 0.2), 0.25, linear) : 0);
    if (t < cA2) {
      popAt(ch.win, t, mid('win', 0.25), 470, 282, at('rescale'));
      // bars
      const barsOn = t >= at('rescale');
      const st = P(t, mid('calc', 0.55), 0.8, ease);   // stretch to the same length
      bars.forEach((b, i) => {
        op(b.g, barsOn ? P(t, mid('rescale', 0.2 + 0.15 * i), 0.3, linear) : 0);
        const W = lerp(b.n * 10, 300, st);
        attr(b.box, 'width', W); attr(b.sh, 'width', b.k / b.n * W);
        op(b.ticks, 1 - st); op(b.raw, 1 - clamp(st * 3)); op(b.pct, P(t, mid('calc', 0.55) + 0.7, 0.3, linear));
      });
      popAt(ch.diff, t, mid('rescale', 0.3), 470, 282, at('formula'));
      op(fGrp, t >= at('formula') && t < at('calc') ? P(t, mid('formula', 0.05), 0.3, linear) : 0);
      op(fNote, P(t, mid('formula', 0.55), 0.3, linear)); fArrow.set(P(t, mid('formula', 0.6), 0.3, linear));
      op(wk, t >= at('calc') ? 1 : 0);
      wk.show(0, P(t, mid('calc', 0.05), 0.35, linear)); wk.show(1, P(t, mid('calc', 0.5), 0.35, linear));
      wk.ring(0, t >= at('recount') ? 1 : 0);
      stampOK.set(sA && t >= mid('calc', 0.85) ? P(t, mid('calc', 0.85), 0.35, linear) : 0); tr(stampOK, BX + 30, 200, 0.42);
      popAt(ch.recount, t, mid('recount', 0.3), 470, 282, cB);
      op(swG, 0); op(unG, 0);
    } else {
      bars.forEach(b => op(b.g, 0)); op(fGrp, 0); op(wk, 0);
    }

    /* B: the pun */
    if (sB) {
      op(cricket, P(t, end('joke') + 0.1, 0.3, linear)); tr(cricket, 700, 160);
    }

    /* A2: the sweets */
    if (t >= cA2) {
      show.boy = 1;
      const up = P(t, at('sweets') - 0.2, 0.35, pop);
      tr(boy, 990, lerp(820, 628, up), 0.95);
      const bm = t < at('units') ? 'happy' : t < mid('units', 0.6) ? 'shock' : 'happy';
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: bm, look: -0.7, lift: t < at('units') ? 1 : 0 });
      op(sweets, 1);
      const sw = t < at('units');
      op(swG, sw ? 1 : 0);
      op(swA, P(t, mid('sweets', 0.4), 0.3, linear));
      const sb = P(t, mid('sweets', 0.78), 0.35, pop);
      op(swB, t >= mid('sweets', 0.78) ? clamp(sb * 3) : 0);
      op(unG, sw ? 0 : 1);
      op(un0, 1); unS.style.opacity = P(t, mid('units', 0.55), 0.2, linear); op(unX, P(t, mid('units', 0.55), 0.2, linear));
      op(un1, P(t, mid('units', 0.25), 0.3, linear)); op(un2, P(t, mid('units', 0.6), 0.3, linear));
      popAt(ch.units, t, mid('units', 0.05), 470, 282, at('score'));
      popAt(ch.four, t, mid('score', 0.5), 470, 282);
    }

    op(boy, show.boy); op(percy, show.percy);
  };
});
