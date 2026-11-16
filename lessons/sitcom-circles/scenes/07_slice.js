/* Scene 7: Sal the sector (arc length and sector area: stretch).
   3 p.m., Dad's Pi-zza: the last pizza, r = 15 cm, cut into 8 -> Sal the sector hops out onto the table -> the
   whiteboard: 360 / 8 = 45 degrees, 45/360 = 1/8 of the pizza -> her crust is an arc: theta/360 x 2 pi r =
   1/8 x 30 pi = 11.8 cm -> her area: theta/360 x pi r^2 = 1/8 x 225 pi = 88.4 cm^2 -> Mr Tan: "a pizza the
   action" -> only Uncle Pi laughs (ticker to 48) -> Ah Boy wants 120 degrees: Sal opens her wedge -> 120/360 = 1/3,
   1/3 x 225 pi = 75 pi = 235.6 cm^2 -> Priya: crust 1/3 x 30 pi = 10 pi = 31.4 cm -> Perry walks crust plus both
   radii: 31.4 + 15 + 15 = 61.4 cm -> Dad offers the guest of honour the last slice: 0 degrees. Uncle Pi stops. */
scene('slice', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 3, color: o.color || C.ink, weight: 700 }); };
  const GOLD = '#FFE45C', INK = MK.ink, BLUE = '#2E5AAC', ORANGE = '#E8751A', RED = '#D32F2F', GREEN = '#1E9E5A', BERRY = '#B8336A';
  const line = (el, t, t0, t1) => { const p = P(t, t0, 0.3, easeOut), q = t1 === undefined ? 1 : 1 - P(t, t1 - 0.15, 0.15, linear); op(el, t >= t0 - 0.01 ? Math.min(p, q) : 0); tr(el, 0, 10 * (1 - p)); };
  const eqRow = (parent, x, y, l, o, r, sz, col) => {
    const g = G(parent), f = col || INK;
    if (l) mkMath(g, x - sz * 0.42, y, l, { size: sz, anchor: 'end', fill: f, weight: 700 });
    if (o) mkMath(g, x, y, o, { size: sz, anchor: 'middle', fill: f, weight: 700 });
    if (r) mkText(g, x + sz * 0.42, y, r, { size: sz, fill: f, anchor: 'start', weight: 700, mathScale: 1 });
    return g;
  };
  const txt = (parent, x, y, str, o) => mkText(parent, x, y, str, Object.assign({ size: 34, anchor: 'middle', fill: INK, boldFill: BERRY, weight: 700 }, o || {}));
  const wedgeD = (cx, cy, r, a0, a1) => `M${cx},${cy} L` + mkArcD(cx, cy, r, a0, a1).slice(1) + ' Z';

  /* layers */
  const Lset = G(root), Lboard = G(root), Lcast = G(root), Lfront = G(root), Lbcast = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= W: Dad's Pi-zza, the stall ================= */
  const stall = ciStall(Lset, { title: "DAD'S PI-ZZA", col: '#C62828', sub: 'the last pizza' });
  Lfront.appendChild(stall.front); Lfront.appendChild(stall.top);
  const wShot = G(stall.top);
  // the pin board: today's last pizza
  // the pizza on its stand (top view, facing us)
  const PZX = 560, PZY = 372, PZR = 108;
  const stand = G(wShot);
  E('path', { d: `M${PZX - 60},${PZY + 100} L${PZX - 84},526 M${PZX + 60},${PZY + 100} L${PZX + 84},526`, stroke: '#5A6670', 'stroke-width': 8, 'stroke-linecap': 'round' }, stand);
  E('circle', { cx: PZX, cy: PZY, r: PZR + 14, fill: '#C9D3DC', stroke: '#7D8A96', 'stroke-width': 4 }, stand);
  const pzW = G(stand); tr(pzW, PZX, PZY, 1, 22.5);
  ciPizza(pzW, PZR, { cuts: 8, seed: 6 });
  const gap = E('path', { d: wedgeD(PZX, PZY, PZR + 1, -112.5, -67.5), fill: '#C9D3DC' }, stand);
  const rW = G(stand);
  { const a = 112.5 * Math.PI / 180; E('line', { x1: PZX, y1: PZY, x2: PZX + PZR * Math.cos(a), y2: PZY + PZR * Math.sin(a), stroke: ORANGE, 'stroke-width': 6, 'stroke-linecap': 'round' }, rW); }
  const cR15 = mkChip(Lfg, '{{r = 15}} cm, **8** slices', { size: 30, col: ORANGE, fill: '#FFF3E0', textCol: INK });
  const cThree = pill(Lhud, '3 p.m. · STRETCH', { size: 32, color: GOLD, stroke: GOLD });
  const cPun = mkChip(Lfg, '"**a pizza** the action"', { size: 32, col: GOLD, solid: true });
  const c120 = mkChip(Lfg, '{{120°}}!', { size: 36, col: '#F28C28', fill: '#FFF0E0', textCol: INK });
  // Dad's empty pizza box: a 0-degree "slice"
  const box = G(Lfg);
  E('rect', { x: -96, y: -150, width: 192, height: 70, rx: 4, fill: '#E6D3AE', stroke: SC_INK, 'stroke-width': 3, transform: 'skewX(-8)' }, box);
  E('rect', { x: -96, y: -80, width: 192, height: 150, rx: 4, fill: '#F2E6D0', stroke: SC_INK, 'stroke-width': 3 }, box);
  E('circle', { cx: 0, cy: -5, r: 58, fill: 'none', stroke: '#D9C49A', 'stroke-width': 3, 'stroke-dasharray': '6 6' }, box);
  E('line', { x1: 0, y1: -5, x2: 0, y2: -63, stroke: '#C62828', 'stroke-width': 4 }, box);
  E('circle', { cx: 0, cy: -5, r: 5, fill: '#C62828' }, box);
  const c0 = mkChip(Lfg, '{{0°}}', { size: 34, col: RED, fill: '#FFE4E4', textCol: INK });

  /* ================= B: the whiteboard close-up ================= */
  const boardG = G(Lboard);
  const wb = mkWhiteboard(boardG, 1100, 520); tr(wb, 600, 410);
  const DX = 360, DY = 385, DR = 170;
  const dPz = G(boardG); tr(dPz, DX, DY, 1, 22.5);
  ciPizza(dPz, DR, { cuts: 8, toppings: false });
  // the highlighted slices: Sal (45 degrees) and Ah Boy's (120 degrees)
  const mkWedge = (a0, a1) => {
    const g = G(boardG);
    const area = E('path', { d: wedgeD(DX, DY, DR, a0, a1), fill: '#FFE9A8', stroke: BLUE, 'stroke-width': 5, 'stroke-linejoin': 'round' }, g);
    const shade = E('path', { d: wedgeD(DX, DY, DR, a0, a1), fill: 'rgba(46,125,216,0.28)' }, g);
    const crust = E('path', { d: mkArcD(DX, DY, DR - 6, a0, a1), fill: 'none', stroke: CI_COL.crust, 'stroke-width': 18 }, g);
    const glowC = mkDash(E('path', { d: mkArcD(DX, DY, DR + 4, a0, a1), fill: 'none', stroke: RED, 'stroke-width': 12, 'stroke-linecap': 'round' }, g));
    g.area = area; g.shade = shade; g.glowC = glowC; g.crust = crust;
    return g;
  };
  const w45 = mkWedge(-112.5, -67.5), w120 = mkWedge(-150, -30);
  const ang45 = mkAngleMark(boardG, DX, DY, 67.5, 112.5, { r: 52, col: BLUE, width: 5, label: '{{45°}}', size: 30, lr: 92, labelCol: BLUE });
  const ang120 = mkAngleMark(boardG, DX, DY, 30, 150, { r: 46, col: BLUE, width: 5, label: '{{120°}}', size: 30, lr: 96, labelCol: BLUE });
  const radB = G(boardG);
  { const a = 112.5 * Math.PI / 180, x2 = DX + DR * Math.cos(a), y2 = DY + DR * Math.sin(a);
    E('line', { x1: DX, y1: DY, x2, y2, stroke: ORANGE, 'stroke-width': 6, 'stroke-linecap': 'round' }, radB);
    txt(radB, x2 - 10, y2 + 40, '{{r = 15}} cm', { size: 30, fill: ORANGE, anchor: 'middle' }); }
  const cutsHi = E('path', { d: (() => { let d = ''; for (let k = 0; k < 8; k++) { const a = (-67.5 + 45 * k) * Math.PI / 180; d += `M${DX},${DY} L${(DX + DR * Math.cos(a)).toFixed(1)},${(DY + DR * Math.sin(a)).toFixed(1)} `; } return d; })(), stroke: BLUE, 'stroke-width': 4 }, boardG);
  const radHi = E('path', { d: `M${DX + DR * Math.cos(-150 * Math.PI / 180)},${DY + DR * Math.sin(-150 * Math.PI / 180)} L${DX},${DY} L${DX + DR * Math.cos(-30 * Math.PI / 180)},${DY + DR * Math.sin(-30 * Math.PI / 180)}`, fill: 'none', stroke: GREEN, 'stroke-width': 10, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, boardG);
  E('circle', { cx: DX, cy: DY, r: 7, fill: INK }, boardG);
  // the working (right half of the board)
  const WX = 905, EX = 812;
  const work = G(boardG);
  const wA1 = txt(work, WX, 250, '{{360° ÷ 8 = 45°}}', { size: 44 });
  const wA2 = txt(work, WX, 380, '{{45/360 = 1/8}} of the pizza', { size: 40 });
  const wC0 = txt(work, WX, 228, 'Sal’s crust is an **arc**', { boldFill: RED });
  const wC1 = eqRow(work, EX, 330, '"arc"', '=', '{{θ/360 × 2πr}}', 38);
  const wC2 = eqRow(work, EX, 440, '', '=', '{{1/8 × 30π}}', 38);
  const wC3 = eqRow(work, EX, 540, '', '≈', '{{11.8}} cm', 40, GREEN);
  const wR0 = txt(work, WX, 228, 'Sal’s **area**', { boldFill: BLUE });
  const wR1 = eqRow(work, EX, 330, 'A', '=', '{{θ/360 × πr^2}}', 38);
  const wR2 = eqRow(work, EX, 440, '', '=', '{{1/8 × 225π}}', 38);
  const wR3 = eqRow(work, EX, 540, '', '≈', '{{88.4}} cm²', 40, GREEN);
  const wT0 = txt(work, WX, 262, '{{120/360 = 1/3}} of the pizza', { size: 40 });
  const wT1 = eqRow(work, EX, 380, 'A', '=', '{{1/3 × 225π}}', 38);
  const wT2 = eqRow(work, EX, 480, '', '=', '{{75π}}', 38);
  const wT3 = eqRow(work, EX, 560, '', '≈', '{{235.6}} cm²', 40, GREEN);
  const wK0 = txt(work, WX, 228, 'his crust: an **arc**', { boldFill: RED });
  const wK1 = eqRow(work, EX, 330, '"arc"', '=', '{{1/3 × 30π}}', 38);
  const wK2 = eqRow(work, EX, 430, '', '=', '{{10π}}', 38);
  const wK3 = eqRow(work, EX, 510, '', '≈', '{{31.4}} cm', 40, GREEN);
  const wP0 = txt(work, WX, 228, '**perimeter** = crust **+ two radii**', { size: 32, boldFill: GREEN });
  const wP1 = eqRow(work, EX - 30, 330, 'P', '=', '{{31.4 + 15 + 15}}', 40);
  const wP2 = eqRow(work, EX - 30, 420, '', '=', '{{61.4}} cm', 42, GREEN);
  const WORK = [wA1, wA2, wC0, wC1, wC2, wC3, wR0, wR1, wR2, wR3, wT0, wT1, wT2, wT3, wK0, wK1, wK2, wK3, wP0, wP1, wP2];

  /* ================= the cast ================= */
  const tan = cast(Lcast, 'tan'), boy = cast(Lcast, 'boy'), dad = cast(Lcast, 'dad');
  const kav = cast(Lbcast, 'kavya'), priya = cast(Lbcast, 'priya');
  const sal = cast(Lfg, 'sal'), perry = cast(Lfg, 'perry'), pi = cast(Lfg, 'pi');
  const ltSal = ciLowerThird(Lhud, 'sal');
  const tanB = tan;   // Mr Tan also leans into the board shot (moved, not copied)

  // Uncle Pi's ticker: 48 characters gone past by the end of "laugh" (he is mid-sentence from pi.laugh's 40)
  const piDigits = t => {
    if (t < at('laugh')) return 41;
    if (t < end('laugh')) return 41 + 7 * clamp((t - mid('laugh', 0.45)) / (end('laugh') - mid('laugh', 0.45)));
    const stop = at('left') + 0.2;
    return 48 + (Math.min(t, stop) - end('laugh')) * 0.3;
  };
  // Perry's walk: the 120-degree crust, then both radii (clockwise)
  const A0 = -150, A1 = -30, ARC = DR * (A1 - A0) * Math.PI / 180, PLEN = ARC + 2 * DR;
  const perryAt = u => {
    if (u < ARC) { const a = A0 + u / DR * 180 / Math.PI, r = a * Math.PI / 180; return [DX + DR * Math.cos(r), DY + DR * Math.sin(r), a]; }
    u -= ARC;
    const e1 = A1 * Math.PI / 180;
    if (u < DR) { const k = u / DR; return [DX + DR * Math.cos(e1) * (1 - k), DY + DR * Math.sin(e1) * (1 - k), A1 + 90]; }
    u -= DR; const e0 = A0 * Math.PI / 180, k = Math.min(1, u / DR);
    return [DX + DR * Math.cos(e0) * k, DY + DR * Math.sin(e0) * k, A0 - 90];
  };

  /* cuts: W (stall) / B (board) */
  const cB1 = at('angle') - 0.06, cW2 = at('pun') - 0.06, cB2 = at('third') - 0.06, cW3 = at('left') - 0.06;

  return t => {
    const sW = on(t, -1, cB1) || on(t, cW2, cB2) || on(t, cW3, 1e9), sB = !sW;
    const who = scWho(S, t);
    [tan, boy, dad, kav, priya, sal, perry, pi].forEach(c => op(c, 0));
    op(Lset, 1); op(Lfront, sW); op(boardG, sB);
    stall.upd(t);
    op(cThree, 0); cR15.set(0); cPun.set(0); c120.set(0); c0.set(0); op(box, 0);
    ltSal.set(win(t, at('sal') + 0.3, at('sal') + 3.4, 0.3));
    const digits = piDigits(t);

    /* ---------------- W: the stall ---------------- */
    if (sW) {
      if (t < at('sal') + 1) popIn(cThree, t, at('three') + 0.2, 1030, 60);
      op(gap, t >= mid('sal', 0.1) ? 1 : 0);
      op(rW, t < at('sal') ? P(t, mid('three', 0.55), 0.3, linear) : 0);
      if (t < at('sal')) { cR15.set(P(t, mid('three', 0.6), 0.35, linear)); tr(cR15, PZX, 220); }
      // Sal hops out of the pizza onto the table
      if (t >= mid('sal', 0.05)) {
        op(sal, 1);
        const hop = P(t, mid('sal', 0.05), 0.7, ease), s = lerp(0.3, 0.66, hop);
        const x = lerp(PZX, 722, hop), y = lerp(PZY - 40, 524 - 110 * 0.66, hop) - Math.sin(hop * Math.PI) * 110;
        let ang = 45, sm = 'happy', sl = -0.5;
        if (t >= at('pun')) { sm = 'deadpan'; sl = -0.8; }
        if (t >= at('laugh')) { sm = 'deadpan'; sl = 0.8; }
        if (t >= at('big') - 0.1) {
          const o = P(t, mid('big', 0.4), 0.9, easeOut);
          ang = 45 + 75 * o + (o > 0 && o < 1 ? Math.sin(t * 30) * 4 * AMP : 0) + (o >= 1 ? Math.sin(t * 9) * 1.5 * AMP : 0);
          sm = o > 0 && o < 1 ? 'shock' : 'happy'; sl = -0.7;
        }
        if (t >= at('left')) { ang = 120; sm = 'shock'; sl = 0.8; }
        tr(sal, x, y, s, hop < 1 ? (1 - hop) * -40 : 0);
        sal.set({ t, talk: scTalk(S, t, 'sal'), mood: sm, look: sl, ang: Math.round(ang * 2) / 2 });
      }
      if (t >= at('big') && t < at('left')) { c120.set(P(t, mid('big', 0.35), 0.35, linear)); tr(c120, 722, 250); }
      // busts behind the table
      op(tan, 1); tr(tan, 240, 446, 1.0);
      let tm = 'happy', tl = 0.6, tlift = 0;
      if (t >= at('sal') && t < at('pun')) { tm = 'happy'; tl = 0.9; }
      if (t >= at('pun') && t < at('laugh')) { tm = 'happy'; tl = 0.3; }
      if (t >= at('laugh') && t < at('big')) { tm = 'happy'; tl = 0.9; }
      if (t >= at('big')) { tm = 'neutral'; tl = 0.5; }
      if (t >= at('left')) { tm = 'deadpan'; tl = 0.9; }
      tan.set({ t, talk: scTalk(S, t, 'tan'), mood: tm, look: tl, lift: tlift });
      if (t >= at('pun') && t < at('laugh') + 0.4) { cPun.set(P(t, mid('pun', 0.45), 0.35, linear)); tr(cPun, 300, 236); }
      op(boy, 1); tr(boy, 392, 470, 0.92);
      let bm = 'happy', bl = 0.8, blift = 0;
      if (t >= mid('sal', 0.05) && t < at('pun')) { bm = 'shock'; bl = 0.9; }
      if (t >= at('pun') && t < at('big')) { bm = 'deadpan'; bl = -0.6; }
      if (t >= at('laugh') && t < at('big')) { bm = 'deadpan'; bl = 0.9; }
      if (t >= at('big')) { bm = 'happy'; bl = 0.9; blift = t < at('left') ? 1 : 0; }
      if (t >= at('left')) { bm = 'neutral'; bl = 0.9; }
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: bm, look: bl, lift: blift });
      op(dad, 1); tr(dad, 925, 446, 1.0);
      let dm = 'happy', dl = -0.6, dlift = 0;
      if (t >= mid('sal', 0.05) && t < at('pun')) { dm = 'shock'; dl = -0.8; }
      if (t >= at('pun') && t < at('laugh')) { dm = 'deadpan'; dl = -0.9; }
      if (t >= at('laugh') && t < at('big')) { dm = 'deadpan'; dl = 0.9; }
      if (t >= at('big')) { dm = 'neutral'; dl = -0.6; }
      if (t >= at('left')) { dm = 'smug'; dl = 0.8; dlift = 0; }
      dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: dl, lift: dlift });
      // the empty box: the guest of honour's slice
      if (t >= at('left')) {
        const up = P(t, at('left') + 0.05, 0.4, pop);
        op(box, 1); tr(box, 850, lerp(800, 618, up), 0.8);
        c0.set(P(t, mid('left', 0.55), 0.35, linear)); tr(c0, 690, 628);
      }
      // Uncle Pi: in front of the stall from "laugh"
      if (t >= at('laugh') - 0.3) {
        op(pi, 1);
        const up = P(t, at('laugh') - 0.3, 0.45, pop);
        const laughing = t >= at('laugh') && t < end('laugh') + 0.3;
        const bounce = laughing ? Math.abs(Math.sin(t * 9)) * 14 * AMP : 0;
        tr(pi, 1050, lerp(900, 556, up) - bounce, 0.7);
        const pm = t >= at('left') ? (t > mid('left', 0.5) ? 'shock' : 'happy') : 'happy';
        const muttering = t >= end('laugh') + 0.3 && t < at('left') + 0.2;
        pi.set({ t, talk: who === 'pi' ? scTalk(S, t, 'pi') : muttering ? 0.15 + 0.3 * Math.abs(Math.sin(t * 8)) : 0, mood: pm, look: t >= at('left') ? -0.9 : -0.6, digits });
      }
    }

    /* ---------------- B: the whiteboard ---------------- */
    if (sB) {
      const sec1 = t < cW2;          // angle, crust, area
      WORK.forEach(w => op(w, 0));
      op(w45, sec1 ? P(t, mid('angle', 0.35), 0.3, linear) : 0);
      op(w45.shade, t >= mid('area', 0.1) ? P(t, mid('area', 0.1), 0.3, linear) : 0);
      mkDraw(w45.glowC, P(t, mid('crust', 0.1), 0.8, ease)); op(w45.glowC, t >= mid('crust', 0.1) && t < at('area') ? 1 : 0);
      op(w120, !sec1 ? 1 : 0);
      op(w120.shade, t < at('crust2') ? P(t, mid('third', 0.35), 0.3, linear) : 0);
      mkDraw(w120.glowC, P(t, mid('crust2', 0.1), 0.8, ease)); op(w120.glowC, t >= mid('crust2', 0.1) ? 1 : 0);
      ang45.set(sec1 ? P(t, mid('angle', 0.45), 0.4, linear) : 0);
      ang120.set(!sec1 && t < at('perim') ? P(t, at('third') + 0.2, 0.4, linear) : 0);
      op(cutsHi, t >= at('angle') && t < mid('angle', 0.45) ? 0.5 + 0.5 * Math.sin(t * 10) : 0);
      op(radB, (sec1 && t >= at('crust')) || (!sec1 && t < at('perim')) ? 1 : 0);
      op(radHi, t >= mid('perim', 0.45) ? 0.85 : 0);
      // working
      line(wA1, t, at('angle') + 0.2, at('crust')); line(wA2, t, mid('angle', 0.55), at('crust'));
      line(wC0, t, at('crust') + 0.1, at('area')); line(wC1, t, mid('crust', 0.15), at('area'));
      line(wC2, t, mid('crust', 0.5), at('area')); line(wC3, t, mid('crust', 0.78), at('area'));
      line(wR0, t, at('area') + 0.1, cW2); line(wR1, t, mid('area', 0.15), cW2);
      line(wR2, t, mid('area', 0.5), cW2); line(wR3, t, mid('area', 0.78), cW2);
      line(wT0, t, at('third') + 0.1, at('crust2')); line(wT1, t, mid('third', 0.4), at('crust2'));
      line(wT2, t, mid('third', 0.6), at('crust2')); line(wT3, t, mid('third', 0.75), at('crust2'));
      line(wK0, t, at('crust2') + 0.1, at('perim')); line(wK1, t, mid('crust2', 0.2), at('perim'));
      line(wK2, t, mid('crust2', 0.5), at('perim')); line(wK3, t, mid('crust2', 0.7), at('perim'));
      line(wP0, t, at('perim') + 0.1); line(wP1, t, mid('perim', 0.3)); line(wP2, t, mid('perim', 0.6));
      // Sal beside the diagram
      op(sal, 1);
      const sAng = sec1 ? 45 : 120;
      tr(sal, 612, 640 - 110 * 0.36, 0.36);
      sal.set({ t, talk: scTalk(S, t, 'sal'), mood: who === 'sal' ? 'happy' : sec1 ? 'smug' : 'happy', look: who === 'sal' ? -0.7 : 0.6, ang: sAng });
      // Perry walks crust + both radii
      if (t >= at('perim') - 0.2) {
        op(perry, 1);
        const w = P(t, at('perim'), (end('perim') - at('perim')) * 0.88, linear), s = 0.27;
        const [x, y, a] = perryAt(PLEN * w), n = [Math.cos(a * Math.PI / 180), Math.sin(a * Math.PI / 180)];
        tr(perry, x + n[0] * 112 * s, y + n[1] * 112 * s, s, a + 90);
        perry.set({ t, talk: scTalk(S, t, 'perry'), mood: w >= 1 ? 'annoyed' : 'neutral', look: 0.4, walk: w < 1 ? t * 14 : 0, wheel: w * 1200, sweat: w > 0.5 ? 1 : 0 });
      }
      // one human at the front of the board shot
      const BX = 128, BYY = 690, BSC = 0.82;
      if (sec1) {
        op(kav, 1); tr(kav, BX, BYY, BSC);
        kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: who === 'kavya' ? 'happy' : 'neutral', look: 0.6 });
      } else if (t < at('crust2') - 0.2) {
        op(tanB, 1); tr(tanB, BX, BYY - 6, BSC);
        tanB.set({ t, talk: scTalk(S, t, 'tan'), mood: 'happy', look: 0.6 });
      } else {
        op(priya, 1);
        const up = P(t, at('crust2') - 0.2, 0.35, pop);
        tr(priya, BX, lerp(900, BYY, up), BSC);
        priya.set({ t, talk: scTalk(S, t, 'priya'), mood: who === 'priya' ? 'smug' : 'neutral', look: who === 'perry' ? 0.8 : 0.6 });
      }
    }
  };
});
