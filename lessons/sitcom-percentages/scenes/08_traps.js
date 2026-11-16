/* Scene 8: The mall saves you some marks (exam traps), then the stinger.
   Shots: "6 EXAM TRAPS" over the mall atrium, the six of them behind a game-show desk numbered 1-6 -> six snappy
   confessionals, one trap card each (Olive: % change ÷ the ORIGINAL, 10/40 = 25% not 10/50 = 20%; Multiplini: going
   back, ÷ the multiplier, 48 ÷ 0.8 = $60 not 48 + 20%; Ah Boy: 7% = 0.07, 0.5% = 0.005; Mr Tan: same units, 45/200
   × 100 = 22.5% not 2250%; Mum: reread the last line, the discount $9.60 or the price you pay $54.40?; Dad: 25% off
   then 9% GST is × 0.75 × 1.09 = × 0.8175, not 16% off) -> logo "OUT OF A HUNDRED will return" with the bulbs ->
   stinger: 6 p.m., the car park, boot full of bags; the receipt says $220.00 of a $200 budget; Dad: 110%! Kavya:
   220 ÷ 200 × 100 = 110%: he SPENT 110%; Percy pops up on the car roof with his scorecard: 110. */
scene('traps', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;
  const talk = (t, who) => scTalk(S, t, who);

  /* ---------- helpers ---------- */
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const popAt = (el, t, t0, x, y, t1) => { el.set(t >= t0 && t < (t1 === undefined ? 1e9 : t1) ? P(t, t0, 0.4, linear) : 0); tr(el, x, y); };
  const outline = (el, col, w) => { el.setAttribute('stroke', col); el.setAttribute('stroke-width', w); el.setAttribute('paint-order', 'stroke'); el.setAttribute('stroke-linejoin', 'round'); return el; };
  const GOLD = '#FFE45C', INK = MK.ink, GREEN = '#1E9E5A', RED = '#C62828', BLUE = '#2E5AAC', PURPLE = '#6A3FCF', MUTED = '#6B5E50';
  const CX = 880;
  function trCard(parent, n) {
    const g = G(parent);
    E('rect', { x: 606, y: 136, width: 560, height: 470, rx: 18, fill: 'rgba(0,0,0,0.3)' }, g);
    E('rect', { x: 600, y: 130, width: 560, height: 470, rx: 18, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, g);
    const head = chip(g, 'TRAP ' + n, { size: 30, fill: '#D32F2F', color: '#FFFFFF', weight: 800 }); tr(head, CX, 182);
    return g;
  }
  const txt = (parent, y, s, o) => mkText(parent, CX, y, s, Object.assign({ size: 34, anchor: 'middle', fill: INK }, o || {}));
  const fadeIn = (el, t, t0) => { const p = P(t, t0, 0.3, easeOut); op(el, p); tr(el, 0, 10 * (1 - p)); };
  // a line with a tick (ok) or a struck-out line with a cross (no)
  function trOk(parent, y, s, o) {
    const g = G(parent), m = txt(g, y, s, Object.assign({ fill: GREEN }, o || {}));
    const tk = tick(g, 18, GREEN); tr(tk, CX + m.w / 2 + 34, y - 12);
    return g;
  }
  function trNo(parent, y, s, o) {
    const g = G(parent), m = txt(g, y, s, Object.assign({ fill: RED }, o || {}));
    const sl = strike(g, CX - m.w / 2 - 10, y - 12, CX + m.w / 2 + 10, RED);
    const cx = cross(g, 14, RED); tr(cx, CX + m.w / 2 + 34, y - 12);
    g.set = p => { sl.set(p); op(cx, p); };
    g.set(0);
    return g;
  }

  /* ---------- layers ---------- */
  const Lbg = G(root), Lcast = G(root), Lfront = G(root), Lfg = G(root), Lhud = G(root);

  /* ---------- sets ---------- */
  const mallShot = G(Lbg);
  const mall = pcMall(mallShot);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#1A0A10', opacity: 0.68 }, mallShot);
  const desk = G(Lfront);   // a game-show desk in front of the six
  E('rect', { x: 40, y: 556, width: 1120, height: 22, rx: 8, fill: GOLD, stroke: '#7A4A08', 'stroke-width': 3 }, desk);
  E('rect', { x: 50, y: 578, width: 1100, height: 180, fill: linGrad('#C2203A', '#7A0E20', true), stroke: '#4A0812', 'stroke-width': 4 }, desk);
  const conf = pcConf(Lbg, 'olive');
  const TINT = {}; for (const k in PC_TINT) TINT[k] = linGrad(PC_TINT[k][0], PC_TINT[k][1], true);
  const logoBg = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#4A0816', '#B3203A', true) }, logoBg);
  let rays = '';
  for (let i = 0; i < 18; i++) { const a0 = i / 18 * TAU, a1 = a0 + TAU / 44; rays += `M0,0 L${(Math.cos(a0) * 1200).toFixed(0)},${(Math.sin(a0) * 1200).toFixed(0)} L${(Math.cos(a1) * 1200).toFixed(0)},${(Math.sin(a1) * 1200).toFixed(0)} Z `; }
  const rayP = E('path', { d: rays, fill: GOLD, opacity: 0.08 }, logoBg);
  E('ellipse', { cx: 600, cy: 640, rx: 620, ry: 160, fill: glow('#FF8FB0'), opacity: 0.35 }, logoBg);
  const parkShot = G(Lbg);
  pcCarPark(parkShot);

  /* ===== intro: 6 EXAM TRAPS ===== */
  const sI = G(Lhud);
  const iHead = outline(T(sI, 600, 236, '6 EXAM TRAPS', { size: 84, weight: 800, anchor: 'middle', fill: GOLD, ls: 3 }), '#5A3A07', 10);
  const iSub = T(sI, 600, 300, 'the mall saves you some marks', { size: 36, weight: 600, anchor: 'middle', fill: '#FFFFFF' });
  const ROWX = [150, 330, 510, 690, 870, 1050];
  const badges = ROWX.map((x, k) => { const g = G(sI); E('circle', { r: 30, fill: GOLD, stroke: SC_INK, 'stroke-width': 4 }, g); T(g, 0, 12, String(k + 1), { size: 34, weight: 800, anchor: 'middle', fill: SC_INK }); return g; });

  /* ===== trap cards ===== */
  // 1 Olive
  const c1 = trCard(Lfg, 1);
  const c1a = txt(c1, 256, 'percentage change =', { size: 34 });
  const c1b = txt(c1, 316, '{{"change" ÷}} **original** {{× 100}}', { size: 38, boldFill: RED });
  const c1c = txt(c1, 384, '{{$40 -> $50}}: change {{= $10}}', { size: 30, fill: MUTED });
  const c1d = trOk(c1, 466, '{{10/40 = 25%}}', { size: 40 });
  const c1e = trNo(c1, 556, '{{10/50 = 20%}}', { size: 40 });
  // 2 the Great Multiplini
  const c2 = trCard(Lfg, 2);
  const c2a = txt(c2, 258, 'Going back? **÷ the multiplier**', { size: 34, boldFill: PURPLE });
  const c2b = txt(c2, 326, 'jacket: **$48** after **20% off**', { size: 30, fill: MUTED });
  const c2c = trOk(c2, 414, '{{48 ÷ 0.8 = $60}}', { size: 46 });
  const c2d = trNo(c2, 500, '{{48 + 20% = $57.60}}', { size: 38 });
  const c2e = txt(c2, 566, 'never add the % back on', { size: 28, fill: MUTED });
  // 3 Ah Boy
  const c3 = trCard(Lfg, 3);
  const c3a = trOk(c3, 284, '{{7% = 0.07}}', { size: 54 });
  const c3b = txt(c3, 352, 'not {{0.7}}', { size: 34, fill: RED });
  const c3c = trOk(c3, 456, '{{0.5% = 0.005}}', { size: 54 });
  const c3d = txt(c3, 526, 'not {{0.5}}, and not **half**', { size: 34, fill: RED });
  const cChk = mkChip(Lfg, 'I checked.', { size: 30, col: GOLD });
  // 4 Mr Tan
  const c4 = trCard(Lfg, 4);
  const c4a = txt(c4, 256, '**Same units** first', { size: 40, boldFill: BLUE });
  const c4b = txt(c4, 324, '{{45}} cents of {{$2}}', { size: 34 });
  const c4c = txt(c4, 384, '{{$2 = 200}} cents', { size: 34, fill: BLUE });
  const c4d = trOk(c4, 470, '{{45/200 × 100 = 22.5%}}', { size: 40 });
  const c4e = trNo(c4, 556, '{{45/2 × 100 = 2250%}}', { size: 32 });
  const pens = G(c4);
  [0, 1].forEach(i => { const p = G(pens); tr(p, 1098 + i * 34, 330, 1, 8 - i * 16); scHandProp(p, 'marker', '#E8424F'); });
  // 5 Mum
  const c5 = trCard(Lfg, 5);
  const c5a = txt(c5, 256, 'Reread the **last line**', { size: 38, boldFill: '#B8336A' });
  const c5shoe = G(c5); pcShoes(c5shoe, { s: 0.55 }); tr(c5shoe, 770, 372);
  const c5b = mkText(c5, 880, 344, '{{$64}}, **15% off**', { size: 32, fill: INK, boldFill: RED });
  const c5c = txt(c5, 424, 'Do they want...', { size: 30, fill: MUTED });
  const c5d = txt(c5, 484, '**the discount**: {{$9.60}}', { size: 34, boldFill: '#C2571A' });
  const c5e = txt(c5, 552, 'or **the price you pay**: {{$54.40}}?', { size: 34, boldFill: GREEN });
  const c5r = [c5d, c5e].map((m, i) => E('rect', { x: CX - m.w / 2 - 16, y: [484, 552][i] - 36, width: m.w + 32, height: 50, rx: 12, fill: 'none', stroke: i ? GREEN : '#C2571A', 'stroke-width': 4 }, c5));
  // 6 Dad
  const c6 = trCard(Lfg, 6);
  const c6a = txt(c6, 256, '**25% off**, then **9% GST**', { size: 36, boldFill: RED });
  const c6b = trNo(c6, 326, '{{25% − 9% = 16%}} off', { size: 32 });
  const c6c = txt(c6, 414, '{{× 0.75 × 1.09}}', { size: 46, fill: BLUE });
  const c6d = trOk(c6, 488, '{{= × 0.8175}}', { size: 46 });
  const c6e = txt(c6, 560, 'an **18.25%** saving', { size: 32, boldFill: GREEN });

  /* ===== logo + bulbs ===== */
  const sR = G(Lhud);
  const logo = G(sR);
  const logo1 = outline(T(logo, 0, -84, 'OUT OF A', { size: 56, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 8 }), '#3A0612', 12);
  const logo2 = outline(T(logo, 0, 18, 'HUNDRED', { size: 112, weight: 800, anchor: 'middle', fill: GOLD, ls: 4 }), '#3A0612', 12);
  const pctL = [-1, 1].map(sd => outline(T(logo, sd * 360, 6, '%', { size: 90, weight: 800, anchor: 'middle', fill: PC.red }), '#FFFFFF', 6));
  const rSub = T(sR, 600, 420, 'will return', { size: 48, weight: 600, anchor: 'middle', fill: '#FFFFFF' });
  const bulbs = G(sR), bulbEls = [];
  for (let i = 0; i < 36; i++) {
    const d0 = i / 36 * 2 * (1160 + 710);
    let x, y;
    if (d0 < 1160) { x = 20 + d0; y = 20; } else if (d0 < 1160 + 710) { x = 1180; y = 20 + d0 - 1160; } else if (d0 < 2 * 1160 + 710) { x = 1180 - (d0 - 1160 - 710); y = 730; } else { x = 20; y = 730 - (d0 - 2 * 1160 - 710); }
    bulbEls.push(E('circle', { cx: x, cy: y, r: 9, fill: GOLD, stroke: '#7A4A08', 'stroke-width': 2 }, bulbs));
  }

  /* ===== stinger: the car park ===== */
  const sW = G(Lhud);
  const cSix = mkChip(sW, '**6 p.m.**', { size: 34, col: GOLD });
  const rec = mkReceipt(sW, { title: 'PLAZA SERATUS', w: 380, size: 26,
    items: [['Shoes', '$54.40'], ['Jacket', '$48.00'], ['Scarf', '$43.60'], ['Kaya toast × 4', '$20.00'], ["Dad's 'bargains'", '$54.00']],
    total: ['TOTAL', '$220.00'] });
  const cBud = mkChip(sW, 'budget: **$200**', { size: 34, col: '#9FE0B5' });
  const c110 = mkChip(sW, '**110%**!', { size: 44, col: GOLD });
  const cSpent = mkChip(sW, '{{220 ÷ 200 × 100 = 110%}}', { size: 40, col: GOLD });
  const cSpent2 = mkChip(sW, 'he **spent** 110%', { size: 32, col: '#FF8FB0' });

  /* ---------- the cast ---------- */
  const olive = cast(Lcast, 'olive'), multi = cast(Lcast, 'multi'), boy = cast(Lcast, 'boy'), tan = cast(Lcast, 'tan'),
    mum = cast(Lcast, 'mum'), dad = cast(Lcast, 'dad', { prop: null, hand: true }), kav = cast(Lcast, 'kavya'), percy = cast(Lcast, 'percy');

  /* ---------- shots ---------- */
  const cut = id => at(id) - 0.06;
  const SHOTS = [['I', -9], ['1', cut('t1')], ['2', cut('t2')], ['3', cut('t3')], ['4', cut('t4')], ['5', cut('t5')], ['6', cut('t6')],
    ['R', cut('return')], ['W', cut('six')]];
  const shotAt = t => { let s = 'I'; for (const [k, t0] of SHOTS) if (t >= t0) s = k; return s; };
  const CARDS = { 1: c1, 2: c2, 3: c3, 4: c4, 5: c5, 6: c6 };
  const CONF = { 1: 'olive', 2: 'multi', 3: 'boy', 4: 'tan', 5: 'mum', 6: 'dad' };
  const ROW = [[olive, 'annoyed', 0.6, 500], [multi, 'smug', 0.58, 500], [boy, 'happy', 0.74, 500], [tan, 'neutral', 0.72, 490], [mum, 'smug', 0.72, 490], [dad, 'happy', 0.72, 490]];
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const sh = shotAt(t);
    mall.upd(t);
    op(mallShot, sh === 'I' ? 1 : 0); op(desk, sh === 'I' ? 1 : 0);
    op(logoBg, sh === 'R' ? 1 : 0); op(parkShot, sh === 'W' ? 1 : 0);
    op(sI, sh === 'I' ? 1 : 0); op(sR, sh === 'R' ? 1 : 0); op(sW, sh === 'W' ? 1 : 0);
    for (const k in CARDS) op(CARDS[k], sh === k ? 1 : 0);
    const cw = CONF[sh];
    conf.set(cw ? 1 : 0, t); if (cw) conf.firstChild.setAttribute('fill', TINT[cw]);
    [olive, multi, boy, tan, mum, dad, kav, percy].forEach(e => op(e, 0));
    cChk.set(0);
    const show = (c, x, y, s, st) => { op(c, 1); tr(c, x, y, s); c.set(Object.assign({ t }, st)); };

    if (sh === 'I') {
      const hp = P(t, at('intro') + 0.05, 0.45, pop);
      op(iHead, clamp(hp * 2.5)); iHead.setAttribute('transform', `translate(600 210) scale(${Math.max(0.01, 0.6 + 0.4 * hp).toFixed(3)}) translate(-600 -210)`);
      op(iSub, P(t, mid('intro', 0.3), 0.4, linear));
      ROW.forEach(([c, mood, s, y], i) => {
        const p = P(t, mid('intro', 0.35) + i * 0.13, 0.45, pop);
        show(c, ROWX[i], y + 40 * (1 - clamp(p)), Math.max(0.01, s * (0.7 + 0.3 * p)), { mood, look: 0 });
        op(c, clamp(p * 3));
        popIn(badges[i], t, mid('intro', 0.4) + i * 0.13, ROWX[i], 664);
      });
    } else if (cw) {
      if (cw === 'olive') {
        show(olive, 330, 412, 1.3, { talk: talk(t, 'olive'), mood: t > mid('t1', 0.75) ? 'smug' : 'annoyed', look: 0.4, huff: t < mid('t1', 0.4) ? 0.6 : 0 });
        fadeIn(c1a, t, at('t1') + 0.05); fadeIn(c1b, t, mid('t1', 0.3)); fadeIn(c1c, t, mid('t1', 0.5));
        fadeIn(c1d, t, mid('t1', 0.6)); fadeIn(c1e, t, mid('t1', 0.72)); c1e.set(P(t, mid('t1', 0.82), 0.3, linear));
      } else if (cw === 'multi') {
        show(multi, 330, 420, 1.22, { talk: talk(t, 'multi'), mood: 'smug', look: 0.4, wand: t > mid('t2', 0.35) ? 1 : 0.3 });
        fadeIn(c2a, t, at('t2') + 0.05); fadeIn(c2b, t, mid('t2', 0.25)); fadeIn(c2c, t, mid('t2', 0.38));
        fadeIn(c2d, t, mid('t2', 0.6)); c2d.set(P(t, mid('t2', 0.7), 0.3, linear)); fadeIn(c2e, t, mid('t2', 0.75));
      } else if (cw === 'boy') {
        const chk = mid('t3', 0.86);
        show(boy, 310, 548, 1.5, { talk: talk(t, 'boy'), mood: t > chk ? 'smug' : 'happy', look: t > chk ? 0 : 0.5, lift: t > chk - 0.2 ? 1 : 0 });
        fadeIn(c3a, t, mid('t3', 0.12)); fadeIn(c3b, t, mid('t3', 0.3));
        fadeIn(c3c, t, mid('t3', 0.45)); fadeIn(c3d, t, mid('t3', 0.72));
        popAt(cChk, t, chk, 330, 336);
      } else if (cw === 'tan') {
        show(tan, 320, 572, 1.4, { talk: talk(t, 'tan'), mood: t > mid('t4', 0.75) ? 'happy' : 'neutral', look: 0.4, lift: t > mid('t4', 0.7) ? 1 : 0 });
        fadeIn(c4a, t, at('t4') + 0.05); fadeIn(c4b, t, mid('t4', 0.25)); fadeIn(c4c, t, mid('t4', 0.4));
        fadeIn(c4d, t, mid('t4', 0.55)); fadeIn(c4e, t, mid('t4', 0.6)); c4e.set(P(t, mid('t4', 0.66), 0.3, linear));
        fadeIn(pens, t, mid('t4', 0.75));
      } else if (cw === 'mum') {
        show(mum, 320, 572, 1.4, { talk: talk(t, 'mum'), mood: t > mid('t5', 0.8) ? 'smug' : 'neutral', look: 0.4, lift: t > mid('t5', 0.2) ? 1 : 0 });
        fadeIn(c5a, t, at('t5') + 0.05); fadeIn(c5shoe, t, mid('t5', 0.2)); fadeIn(c5b, t, mid('t5', 0.22));
        fadeIn(c5c, t, mid('t5', 0.4)); fadeIn(c5d, t, mid('t5', 0.5)); fadeIn(c5e, t, mid('t5', 0.75));
        op(c5r[0], t > mid('t5', 0.55) && t < mid('t5', 0.78) ? 1 : 0);
        op(c5r[1], t > mid('t5', 0.8) ? 0.5 + 0.5 * Math.sin(t * 7) : 0);
      } else if (cw === 'dad') {
        show(dad, 320, 572, 1.4, { talk: talk(t, 'dad'), mood: t < mid('t6', 0.25) ? 'smug' : t < mid('t6', 0.5) ? 'sad' : 'neutral', look: 0.4, lift: t > mid('t6', 0.55) ? 1 : 0 });
        fadeIn(c6a, t, at('t6') + 0.05); fadeIn(c6b, t, mid('t6', 0.3)); c6b.set(P(t, mid('t6', 0.42), 0.3, linear));
        fadeIn(c6c, t, mid('t6', 0.62)); fadeIn(c6d, t, mid('t6', 0.8)); fadeIn(c6e, t, mid('t6', 0.9));
      }
    } else if (sh === 'R') {
      tr(rayP, 600, 640, 1, (t * 6 * AMP) % 360);
      popIn(logo, t, at('return') + 0.05, 600, 260);
      pctL.forEach((d, i) => tr(d, (i ? 1 : -1) * 360, 6, 1, Math.sin(t * 2 + i) * 10 * AMP));
      op(rSub, P(t, mid('return', 0.45), 0.4, linear));
      bulbEls.forEach((b, i) => op(b, ((Math.floor(t * 8) + i) % 3 === 0) ? 1 : 0.35));
    } else {
      /* ---------- the stinger: the car park ---------- */
      popIn(cSix, t, at('six') + 0.1, 700, 60);
      const final = t >= at('final') - 0.1;
      const who = scWho(S, t);
      // the family in front of the car
      const look = c => (who === 'mum' ? -0.6 : who === 'dad' ? (c === 'mum' ? 0.8 : -0.8) : who === 'kavya' ? (c === 'boy' ? -0.8 : 0.8) : who === 'percy' ? 0 : 0);
      const dadMood = final ? 'sad' : t >= mid('spent', 0.55) ? 'sad' : t >= at('told') ? 'smug' : t >= at('total') && t > mid('total', 0.6) ? 'shock' : 'happy';
      show(mum, 190, 640, 0.92, { talk: talk(t, 'mum'), mood: final ? 'deadpan' : t >= at('told') ? 'annoyed' : t >= at('total') ? 'shock' : 'neutral', look: look('mum'), lift: t >= at('total') && t < at('told') ? 1 : 0 });
      const dUp = t >= at('told') ? P(t, at('told'), 0.3, ease) * (1 - P(t, mid('spent', 0.55), 0.4, ease)) : 0;
      show(dad, 410, 640 - 22 * dUp, 0.92, { talk: talk(t, 'dad'), mood: dadMood, look: look('dad'), lift: t >= at('told') && t < mid('spent', 0.55) ? 1 : 0 });
      show(kav, 650, 646, 0.92, { talk: talk(t, 'kavya'), mood: final ? 'deadpan' : t >= at('spent') ? 'annoyed' : 'neutral', look: look('kav') });
      show(boy, 870, 640, 0.92, { talk: 0, mood: final ? 'deadpan' : 'happy', look: final ? 0 : -0.6 });
      // total: the long receipt and the budget
      const rOn = t >= mid('total', 0.1) && t < at('told');
      op(rec, rOn ? 1 : 0);
      if (rOn) { tr(rec, 250, 112); rec.set(P(t, mid('total', 0.1), 1.2, linear) * 7); }
      popAt(cBud, t, mid('total', 0.65), 600, 220, at('told'));
      // told: 110%!
      const cp = t >= at('spent') ? 1 - P(t, mid('spent', 0.55), 0.4, easeIn) : 1;
      if (t >= mid('told', 0.55) && cp > 0.01) { c110.set(P(t, mid('told', 0.55), 0.4, linear) * cp); tr(c110, 410, 430); } else c110.set(0);
      // spent: Kavya's maths
      popAt(cSpent, t, mid('spent', 0.12), 600, 170, at('final') - 0.1);
      popAt(cSpent2, t, mid('spent', 0.62), 600, 250, at('final') - 0.1);
      // final: Percy pops up on the car roof with his scorecard
      if (final) {
        const pp = P(t, at('final') - 0.1, 0.45, pop);
        op(percy, clamp(pp * 3));
        tr(percy, 600, lerp(400, 304, clamp(pp)), Math.max(0.01, 0.85 * pp));
        percy.set({ t, talk: talk(t, 'percy'), mood: 'happy', look: -0.3, card: P(t, mid('final', 0.25), 0.35, pop), score: '110' });
      }
    }
  };
});
