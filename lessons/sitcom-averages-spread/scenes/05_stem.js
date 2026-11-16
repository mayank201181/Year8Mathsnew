/* Scene 5: The durian round (averages from stem-and-leaf diagrams).
   Shots (hard sitcom cuts):
   W    Studio 5 wide: "Round 5: getting to the studio", 15 people timed in minutes.
   SCR  the big screen, the speaker on the left: Benny builds the stem-and-leaf (key 1 | 5 means 15 minutes)
        -> Ah Boy: "It's a plant!" (a pot doodle sprouts under the stems) -> Medi: already in order
        -> Medi counts the leaves: (15 + 1)/2 = 8th; stem 0 has 2, stem 1 has 5 more: 7 -> the 8th is 20 minutes
        -> Mo: three 5s on stem 1: mode 15 minutes (a 5 on stem 2 would be 25) -> Ranger: 45 − 8 = 37 minutes.
   W    the prize: a crate of twelve durians on the desk ...
   SCR  ... labelled with a stem-and-leaf diagram (key 2 | 5 means 2.5 kg) -> Ah Boy: "1 | 4! A 14 kg durian!"
        WAY OFF! -> Kavya: read the key: 1 | 4 is 1.4 kg, SPOT ON! (the giant durian shrinks)
        -> Medi: 12 durians, the 6th and 7th: (2.2 + 2.5)/2 = 2.35 kg -> Mo: mode 1.6 kg; range 3.8 − 1.4 = 2.4 kg.
   W    the smell: green stink lines over the desk; Dad: "With air-con." -> Mum: "The smell is definitely an
        outlier." Otto peeks in, sniffs, and leaves. Hold. */
scene('stem', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const popSet = (el, t, t0, t1, x, y, s) => { const p = t >= t0 && t < t1 ? P(t, t0, 0.35, linear) : 0; el.set(p); if (x !== undefined) tr(el, x, y, s === undefined ? 1 : s); };
  const fade = (el, t, t0, d) => op(el, P(t, t0, d || 0.3, linear));
  const GOLD = AS.gold, GREEN = '#1E9E5A', RED = '#D32F2F', BLUE = '#2E6FD8', PINK = '#FFC2E8', BERRY = '#C2187A', GREY = '#5A6670';

  /* layers */
  const Lbg = G(root), Lcard = G(root), Lcast = G(root), Lfront = G(root), Lpet = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= W: Studio 5 ================= */
  const studioShot = G(Lbg);
  const studio = asStudio(studioShot);
  Lfront.appendChild(studio.front); Lfront.appendChild(studio.top);
  const carrier = asCarrier(Lpet);
  const cRound = mkChip(Lfg, '**Round 5**: getting to the studio', { size: 30, col: GOLD });
  const cPeople = mkChip(Lfg, '**15** people, timed in **minutes**', { size: 30, col: '#7FD3FF' });
  const cPrize = mkChip(Lfg, 'the **PRIZE**: twelve durians', { size: 32, col: GOLD });
  const cSniff = mkChip(Lfg, '*sniff*', { size: 30, col: '#C8F59A' });
  // the durian crate on the desk
  const crate = G(Lpet);
  const CR = [678, 530];
  {
    const back = G(crate);
    for (let i = 0; i < 12; i++) { const d = asDurian(back, 0.36); tr(d, -65 + (i % 6) * 26 + (i >= 6 ? 13 : 0), i >= 6 ? -84 : -66); }
    E('rect', { x: -92, y: -66, width: 184, height: 66, rx: 6, fill: '#B98A4E', stroke: SC_INK, 'stroke-width': 4 }, crate);
    const lab = G(crate); tr(lab, 0, -33);
    E('rect', { x: -84, y: -20, width: 168, height: 40, rx: 6, fill: '#FFFDF6', stroke: SC_INK, 'stroke-width': 3 }, lab);
    T(lab, 0, 9, '12 DURIANS', { size: 26, weight: 800, anchor: 'middle', fill: '#2A5A1E' });
  }
  // stink lines
  const stinks = [0, 1, 2, 3, 4].map(i => E('path', { d: 'M0,0 q12,-14 0,-28 q-12,-14 0,-28 q12,-14 0,-28', fill: 'none', stroke: '#7FD36A', 'stroke-width': 5, 'stroke-linecap': 'round', opacity: 0 }, Lfg));

  /* ================= SCR: the big screen ================= */
  const SCX = 818, SCY = 400;
  const scr = asScreen(Lcard, 680, 480, { title: 'MINUTES TO THE STUDIO' });
  const C0 = scr.content;
  const X0 = -300, Y0 = -184, SZ = 40, RH = SZ * 1.45, LW = SZ * 0.85;
  const rowB = i => Y0 + SZ * 1.2 + (i + 1) * RH;              // baseline of row i
  const leafX = j => X0 + SZ * 2.2 + 22 + j * LW + SZ * 0.3;   // centre of leaf j
  const hlFor = (parent, rows) => rows.map(([, lv], i) => lv.map((_, j) => { const c = E('circle', { cx: leafX(j), cy: rowB(i) - SZ * 0.36, r: 20, fill: 'rgba(255,228,92,0.7)' }, parent); op(c, 0); return c; }));
  const ringFor = (parent, i, j, col) => { const c = E('circle', { cx: leafX(j), cy: rowB(i) - SZ * 0.36, r: 23, fill: 'none', stroke: col, 'stroke-width': 4.5 }, parent); op(c, 0); return c; };

  // the minutes diagram
  const ROWS = [[0, [8, 9]], [1, [2, 5, 5, 5, 7]], [2, [0, 3, 6, 8, 8]], [3, [1, 4]], [4, [5]]];
  const gMin = G(C0);
  const hlM = hlFor(gMin, ROWS);
  const slM = mkStemLeaf(gMin, ROWS, { size: SZ, ink: MK.ink, headCol: GREY });
  tr(slM, X0, Y0);
  const keyM = mkText(gMin, X0, 222, 'Key: **1 | 5** means **15** minutes', { size: 30, fill: MK.ink, boldFill: BLUE });
  const pot = G(gMin);
  E('path', { d: `M${X0 + 66},176 L${X0 + 110},176 L${X0 + 104},196 L${X0 + 72},196 Z`, fill: '#D9774A', stroke: MK.ink, 'stroke-width': 3, 'stroke-linejoin': 'round' }, pot);
  const sprout = E('path', { d: `M${X0 + 88},-176 q-6,-8 -20,-8 q4,10 20,8 M${X0 + 88},-150 q8,-12 22,-12 q-4,12 -22,12`, fill: '#56D69B', stroke: '#1E7A4A', 'stroke-width': 2.5 }, pot);
  const cOrder = mkChip(gMin, 'already **in order** ✓', { size: 28, col: GREEN, fill: '#E6F7EC' });
  tr(cOrder, 190, -100);
  const runH = mkText(gMin, 40, -158, 'running\ntotal', { size: 26, anchor: 'middle', fill: GREY, lh: 2 });
  const runV = [2, 7, 12, 14, 15].map((v, i) => mkText(gMin, 40, rowB(i), String(v), { size: 32, anchor: 'middle', fill: GREEN }));
  const RXc = 212;
  const mL1 = mkText(gMin, RXc, -130, '**15** leaves', { size: 30, anchor: 'middle', fill: MK.ink });
  const mL2 = mkMath(gMin, RXc, -46, '(15 + 1)/2', { size: 32, fill: MK.ink, anchor: 'middle' });
  const mL3 = mkText(gMin, RXc, 10, '= the **8th** value', { size: 28, anchor: 'middle', fill: MK.ink });
  const cntT = mkText(gMin, RXc, 70, 'count: ', { size: 30, anchor: 'middle', fill: BLUE });
  const cntN = [1, 2, 3, 4, 5, 6, 7, 8].map(n => mkText(gMin, RXc, 70, `count: **${n}**`, { size: 30, anchor: 'middle', fill: BLUE }));
  op(cntT, 0);
  const mL4 = mkText(gMin, RXc, 124, 'median =', { size: 28, anchor: 'middle', fill: GREEN });
  const mL5 = mkText(gMin, RXc, 164, '**20** minutes', { size: 30, anchor: 'middle', fill: GREEN });
  const ring8 = ringFor(gMin, 2, 0, GREEN);
  // mode
  const RXm = 175;
  const moL1 = mkText(gMin, RXm, -110, 'three **5**s on **stem 1**', { size: 28, anchor: 'middle', fill: BERRY });
  const moL2 = mkText(gMin, RXm, -50, 'mode = **15** minutes', { size: 30, anchor: 'middle', fill: BERRY });
  const moL3 = G(gMin);
  E('rect', { x: RXm - 140, y: 0, width: 280, height: 64, rx: 12, fill: '#FFF0F0', stroke: RED, 'stroke-width': 3, 'stroke-dasharray': '8 6' }, moL3);
  mkText(moL3, RXm, 44, '2 | 5 = **25**, not 15', { size: 28, anchor: 'middle', fill: RED });
  // range
  const raL1 = mkText(gMin, RXm, -110, 'last value − first value', { size: 28, anchor: 'middle', fill: MK.ink });
  const raL2 = mkMath(gMin, RXm, -30, '45 − 8 = 37', { size: 50, fill: MK.ink, anchor: 'middle' });
  const raL3 = mkText(gMin, RXm, 16, 'minutes', { size: 30, anchor: 'middle', fill: MK.ink });
  const ringFirst = ringFor(gMin, 0, 0, '#B07A00'), ringLast = ringFor(gMin, 4, 0, '#B07A00');

  // the durian diagram
  const DROWS = [[1, [4, 6, 6, 6]], [2, [0, 2, 5, 9]], [3, [1, 3, 6, 8]]];
  const gDur = G(C0);
  const hlD = hlFor(gDur, DROWS);
  const slD = mkStemLeaf(gDur, DROWS, { size: SZ, ink: MK.ink, headCol: GREY });
  tr(slD, X0, Y0);
  const keyBox = E('rect', { x: X0 - 12, y: 92, width: 420, height: 56, rx: 12, fill: 'rgba(86,214,155,0.25)', stroke: GREEN, 'stroke-width': 4 }, gDur);
  const keyD = G(gDur);
  const keyDt = mkText(keyD, 0, 0, 'Key: **2 | 5** means **2.5 kg**', { size: 30, fill: MK.ink, boldFill: BLUE });
  const ring14 = ringFor(gDur, 0, 0, RED);
  const dR1 = mkText(gDur, RXc - 20, -100, '1 | 4 = **14 kg**?', { size: 34, fill: RED, anchor: 'middle' });
  const dR1s = strike(gDur, RXc - 20 - dR1.w / 2 - 8, -112, RXc - 20 + dR1.w / 2 + 8, RED);
  const dK = mkText(gDur, RXc - 20, -30, '1 | 4 = **1.4 kg**', { size: 36, fill: GREEN, anchor: 'middle' });
  const runDH = mkText(gDur, 40, -158, 'running\ntotal', { size: 26, anchor: 'middle', fill: GREY, lh: 2 });
  const runD = [4, 8, 12].map((v, i) => mkText(gDur, 40, rowB(i), String(v), { size: 32, anchor: 'middle', fill: GREEN }));
  const ring6 = ringFor(gDur, 1, 1, GREEN), ring7 = ringFor(gDur, 1, 2, GREEN);
  const dM1 = mkText(gDur, RXc, -130, '**12** durians:', { size: 28, anchor: 'middle', fill: MK.ink });
  const dM2 = mkText(gDur, RXc, -90, 'the **6th** and **7th**', { size: 28, anchor: 'middle', fill: MK.ink });
  const dM3 = mkMath(gDur, RXc, -10, '(2.2 + 2.5)/2', { size: 32, fill: MK.ink, anchor: 'middle' });
  const dM4 = mkText(gDur, RXc, 52, '= **2.35 kg**', { size: 32, anchor: 'middle', fill: GREEN });
  const dO1 = mkText(gDur, RXm, -110, 'mode = **1.6 kg**', { size: 32, anchor: 'middle', fill: BERRY });
  const dO2 = mkText(gDur, RXm, -70, '(three of them)', { size: 26, anchor: 'middle', fill: BERRY });
  const dO3 = mkText(gDur, RXm, -4, 'range:', { size: 28, anchor: 'middle', fill: MK.ink });
  const dO4 = mkMath(gDur, RXm, 50, '3.8 − 1.4 = 2.4 "kg"', { size: 36, fill: MK.ink, anchor: 'middle' });
  const ringA = ringFor(gDur, 0, 0, '#B07A00'), ringB = ringFor(gDur, 2, 3, '#B07A00');

  // the giant (imaginary) durian
  const giant = G(Lfg);
  const giantD = asDurian(giant, 1);
  const cGiant = mkChip(Lfg, '**14 kg**?!', { size: 34, col: '#FF8A8A' });

  /* stamps */
  const sOff = asStamp(Lfg, false), sOn = asStamp(Lfg, true);

  /* ================= the cast ================= */
  const mum = cast(Lcast, 'mum'), kav = cast(Lcast, 'kavya'), dad = cast(Lcast, 'dad'), boy = cast(Lcast, 'boy');
  const priya = cast(Lcast, 'priya'), tan = cast(Lcast, 'tan');
  const benny = cast(Lcast, 'benny');
  const medi = cast(Lcast, 'medi'), mo = cast(Lcast, 'mo'), ranger = cast(Lcast, 'ranger'), otto = cast(Lcast, 'otto');
  const H = { mum, kav, dad, boy, priya, tan, benny };
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cuts */
  const k = id => at(id) - 0.06;
  const cPlant = k('plant'), cPrz = mid('prize', 0.45), cSmell = k('smell');
  const POS = { mum: [120, 446, 0.9], kav: [258, 440, 0.92], dad: [396, 446, 0.9], boy: [528, 456, 0.9], priya: [826, 446, 0.88], tan: [990, 440, 0.88] };
  const SPK = [330, 594, 1.1], LIS = [112, 604, 1.04], LIS2 = [104, 640, 0.98];
  const CART = { medi: [252, 380, 0.84], mo: [262, 360, 0.92], ranger: [244, 380, 0.84] };

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const sS = on(t, cPlant, k('prize')) || on(t, cPrz, cSmell);
    const sW = sS ? 0 : 1;
    [cRound, cPeople, cPrize, cSniff, cGiant, sOff, sOn].forEach(c => c.set(0));
    stinks.forEach(s => op(s, 0));
    op(giant, 0);
    const show = { mum: 0, kav: 0, dad: 0, boy: 0, priya: 0, tan: 0, benny: 0, medi: 0, mo: 0, ranger: 0, otto: 0 };
    const setH = (key, mood, look, extra) => H[key].set(Object.assign({ t, talk: scTalk(S, t, key === 'kav' ? 'kavya' : key), mood, look }, extra || {}));
    const toFront = c => Lcast.appendChild(c);

    /* ---------- backgrounds ---------- */
    op(studioShot, 1); op(Lfront, sW); studio.upd(t);
    op(studio.applause, 0);
    const mb = studio.board, dur = t >= k('prize');
    if (!dur) { mb.set(0, '?'); mb.set(1, t > mid('twenty', 0.6) ? '20' : '?'); mb.set(2, t > mid('mode', 0.5) ? '15' : '?'); mb.set(3, t > mid('range', 0.6) ? '37' : '?'); }
    else { mb.set(0, '?'); mb.set(1, t > mid('dmedian', 0.8) ? '2.35' : '?'); mb.set(2, t > mid('dmode', 0.25) ? '1.6' : '?'); mb.set(3, t > mid('dmode', 0.8) ? '2.4' : '?'); }
    [0, 1, 2, 3].forEach(i => mb.lit(i, 0));

    /* ---------- W: Studio 5 ---------- */
    op(crate, sW && t >= k('prize') ? 1 : 0); tr(crate, ...CR);
    if (sW) {
      ['mum', 'kav', 'dad', 'boy', 'priya', 'tan'].forEach(kk => { show[kk] = 1; tr(H[kk], ...POS[kk]); toFront(H[kk]); });
      tr(carrier, 1100, 530, 0.7);
      if (t < cPlant) {
        ['kav', 'mum', 'dad', 'boy', 'priya', 'tan'].forEach(kk => setH(kk, kk === 'priya' ? 'smug' : 'neutral', POS[kk][0] < 600 ? 0.6 : -0.6));
        popSet(cRound, t, at('round') + 0.1, cPlant, 330, 262);
        popSet(cPeople, t, mid('round', 0.45), cPlant, 880, 262);
        carrier.set({ t, look: 0 });
      } else if (t < cSmell) {
        // the prize crate
        const lookC = kk => (POS[kk][0] < CR[0] ? 0.8 : -0.8);
        ['kav', 'mum', 'dad', 'boy', 'priya', 'tan'].forEach(kk => setH(kk, kk === 'boy' || kk === 'dad' ? 'happy' : 'neutral', lookC(kk), kk === 'boy' ? { lift: 1 } : {}));
        popSet(cPrize, t, at('prize') + 0.1, cPrz, 600, 262);
        carrier.set({ t, look: -0.6 });
      } else {
        // the smell, then Mum; Otto peeks in
        const smell = P(t, cSmell + 0.3, 1.2, linear);
        stinks.forEach((s, i) => {
          const f = ((t * 0.45 + i * 0.21) % 1);
          tr(s, CR[0] - 100 + i * 50 + Math.sin(t * 2 + i) * 8, 452 - f * 70, 1);
          op(s, smell * Math.sin(f * Math.PI) * 0.9);
        });
        const mumT = t >= k('outlier');
        setH('dad', 'annoyed', mumT ? -0.8 : 0.6, { sweat: 1 });
        setH('kav', mumT ? 'deadpan' : 'annoyed', mumT ? -0.8 : 0.6);
        setH('boy', 'sad', -0.6);
        setH('mum', mumT ? 'deadpan' : 'annoyed', mumT ? (t > end('outlier') ? 0 : 0.2) : 0.8);
        setH('priya', 'annoyed', -0.6, { sweat: 0.6 });
        setH('tan', 'annoyed', -0.6);
        carrier.set({ t, look: -0.6, blink: 0.6 });
        // Otto peeks in from the right edge, sniffs and leaves
        const inP = P(t, mid('outlier', 0.1), 0.5, easeOut), outP = P(t, end('outlier') + 0.25, 0.5, easeIn);
        if (inP > 0 && outP < 1) {
          show.otto = 1;
          tr(otto, lerp(1400, 1150, inP) + 300 * outP, 392, 0.66);
          otto.set({ t, mood: t < end('outlier') - 0.6 ? 'happy' : 'shock', look: -1, wave: 0.2, sweat: t > end('outlier') - 0.6 ? 1 : 0 });
          popSet(cSniff, t, mid('outlier', 0.55), end('outlier') + 0.3, 1060, 262);
        }
      }
    }

    /* ---------- SCR: the big screen ---------- */
    op(scr, sS);
    if (sS) {
      tr(scr, SCX, SCY); scr.upd(t);
      tr(carrier, -400, 0);
      const pair = (spk, lis, lisPos) => { show[spk] = 1; tr(H[spk], ...SPK); if (lis) { show[lis] = 1; tr(H[lis], ...(lisPos || LIS)); toFront(H[lis]); } toFront(H[spk]); };
      const cart = (c, key, lis) => { show[key] = 1; tr(c, ...CART[key]); if (lis) { show[lis] = 1; tr(H[lis], ...LIS2); toFront(H[lis]); } toFront(c); };
      const durS = t >= cPrz;
      op(gMin, durS ? 0 : 1); op(gDur, durS ? 1 : 0);
      [pot, cOrder, runH, ...runV, mL1, mL2, mL3, cntT, ...cntN, mL4, mL5, ring8, moL1, moL2, moL3, raL1, raL2, raL3, ringFirst, ringLast,
        keyBox, ring14, dR1, dK, runDH, ...runD, ring6, ring7, dM1, dM2, dM3, dM4, dO1, dO2, dO3, dO4, ringA, ringB].forEach(e => op(e, 0));
      dR1s.set(0);
      hlM.flat().forEach(c => { op(c, 0); attr(c, 'fill', 'rgba(255,228,92,0.7)'); });
      hlD.flat().forEach(c => { op(c, 0); attr(c, 'fill', 'rgba(255,228,92,0.7)'); });
      tr(keyD, X0, 130);

      if (!durS) {
        setText(scr.titleText, 'MINUTES TO THE STUDIO');
        slM.set(t < k('order') ? 15 * P(t, mid('plant', 0.1), 2.4, linear) + 0.001 : 15);
        op(keyM, t < k('order') ? P(t, mid('plant', 0.62), 0.3, linear) : 1);
        if (t < k('order')) {
          // Benny builds it; Ah Boy: a plant!
          pair('benny', 'boy');
          const talk = scTalk(S, t, 'benny');
          H.benny.set({ t, talk, mood: 'happy', look: 0.8, lift: 1, ting: win(t, at('plant') + 0.1, at('plant') + 0.9, 0.15) });
          const bt = t >= at('boy') - 0.05;
          setH('boy', 'happy', bt ? 0.5 : 0.8, { lift: bt ? 1 : 0 });
          op(pot, P(t, at('boy'), 0.3, linear));
        } else if (t < k('mode')) {
          // Medi: in order; counting to the 8th
          cart(medi, 'medi', 'boy');
          setH('boy', t < k('count') ? 'sad' : 'neutral', 0.6);
          const ws = t >= k('count') && t < mid('count', 0.08);
          medi.set({ t, talk: ws ? 0 : scTalk(S, t, 'medi'), mood: t < k('count') ? 'smug' : t > mid('twenty', 0.5) ? 'happy' : 'neutral', look: 0.8, point: t >= k('count') ? 1 : 0, whistle: ws ? 1 : 0 });
          if (t < k('count')) { op(pot, 1 - P(t, mid('order', 0.6), 0.3, linear)); popSet(cOrder, t, mid('order', 0.35), 1e9); tr(cOrder, 190, -100); }
          else {
            fade(mL1, t, mid('count', 0.02)); fade(mL2, t, mid('count', 0.14)); fade(mL3, t, mid('count', 0.24));
            fade(runH, t, mid('count', 0.45));
            fade(runV[0], t, mid('count', 0.6)); fade(runV[1], t, mid('count', 0.86));
            // count the leaves: 1..7 during "stem 0 has 2, stem 1 has 5 more", then 8 on "the 8th"
            const order = [[0, 0], [0, 1], [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [2, 0]];
            let n = 0;
            order.forEach(([i, j], q) => {
              const tq = q < 7 ? mid('count', 0.5 + q * 0.065) : mid('twenty', 0.12);
              if (t >= tq) { op(hlM[i][j], 1); n = q + 1; }
            });
            cntN.forEach((c, q) => op(c, n === q + 1 ? 1 : 0));
            if (t >= k('twenty')) {
              fade(ring8, t, mid('twenty', 0.15));
              fade(mL4, t, mid('twenty', 0.55)); fade(mL5, t, mid('twenty', 0.55));
              runV.forEach((v, i) => op(v, 1));
            }
          }
        } else if (t < k('range')) {
          // Mo: the mode
          cart(mo, 'mo', 'priya');
          mo.set({ t, talk: scTalk(S, t, 'mo'), mood: 'happy', look: 0.8, hearts: t > mid('mode', 0.25) && t < mid('mode', 0.6) ? 1 : 0.2, likes: '♥ 3' });
          setH('priya', 'neutral', 0.6);
          [1, 2, 3].forEach(j => { attr(hlM[1][j], 'fill', 'rgba(255,95,200,0.5)'); fade(hlM[1][j], t, mid('mode', 0.1 + j * 0.06)); });
          fade(moL1, t, mid('mode', 0.15)); fade(moL2, t, mid('mode', 0.35));
          fade(moL3, t, mid('mode', 0.62));
        } else {
          // Ranger: last − first
          cart(ranger, 'ranger', 'mum');
          const str = P(t, mid('range', 0.2), 1.0, ease);
          ranger.set({ t, talk: scTalk(S, t, 'ranger'), mood: t > mid('range', 0.8) ? 'smug' : 'neutral', look: 0.8, reach: 40 + 80 * str });
          setH('mum', 'neutral', 0.6);
          fade(raL1, t, mid('range', 0.1));
          fade(ringFirst, t, mid('range', 0.45)); fade(ringLast, t, mid('range', 0.35));
          fade(raL2, t, mid('range', 0.5)); fade(raL3, t, mid('range', 0.55));
        }
      } else {
        setText(scr.titleText, 'THE PRIZE: 12 DURIANS');
        slD.set(t < k('rich') ? 12 * P(t, cPrz + 0.15, 1.3, linear) + 0.001 : 12);
        op(keyD, t < k('rich') ? P(t, cPrz + 1.5, 0.3, linear) : 1);
        if (t < k('rich')) {
          pair('kav', 'boy');
          setH('kav', 'neutral', 0.8); setH('boy', 'happy', 0.8);
        } else if (t < k('key')) {
          // Ah Boy's 14 kg durian
          pair('boy', 'kav');
          setH('boy', 'happy', 0.6, { lift: 1 });
          setH('kav', t > mid('rich', 0.85) ? 'deadpan' : 'annoyed', 0.8);
          const g = P(t, at('rich') + 0.1, 0.45, pop);
          op(giant, clamp(g * 3)); tr(giant, 320, 330 + Math.sin(t * 5) * 6 * AMP, Math.max(0.01, 2.1 * g));
          popSet(cGiant, t, mid('rich', 0.3), 1e9, 120, 250);
          fade(ring14, t, mid('rich', 0.1)); fade(dR1, t, mid('rich', 0.3));
          popSet(sOff, t, mid('rich', 0.88), 1e9, SCX + 190, SCY + 150, 0.55);
        } else if (t < k('dmedian')) {
          // Kavya: read the key
          pair('kav', 'boy');
          setH('kav', t > mid('key', 0.85) ? 'happy' : 'neutral', 0.8);
          const shrink = P(t, mid('key', 0.62), 0.8, ease);
          setH('boy', shrink > 0.5 ? 'sad' : 'shock', -0.4, { lift: 1 });
          op(giant, 1); tr(giant, lerp(320, 150, shrink), lerp(330, 470, shrink), lerp(2.1, 0.62, shrink));
          op(ring14, 1); op(dR1, 1); dR1s.set(P(t, mid('key', 0.5), 0.3, linear));
          const kp = P(t, mid('key', 0.05), 0.4, ease);
          op(keyBox, kp); tr(keyD, X0 + 4 * kp, 130 + 0 * kp, 1 + 0.12 * kp);
          fade(dK, t, mid('key', 0.6));
          popSet(sOn, t, mid('key', 0.86), 1e9, SCX + 200, SCY + 28, 0.55);
        } else if (t < k('dmode')) {
          // Medi: the 6th and 7th
          cart(medi, 'medi', 'kav');
          medi.set({ t, talk: scTalk(S, t, 'medi'), mood: t > mid('dmedian', 0.85) ? 'happy' : 'neutral', look: 0.8, point: 1 });
          setH('kav', 'neutral', 0.6);
          fade(dM1, t, mid('dmedian', 0.03)); fade(dM2, t, mid('dmedian', 0.22));
          fade(runDH, t, mid('dmedian', 0.2)); runD.forEach((v, i) => fade(v, t, mid('dmedian', 0.22 + i * 0.06)));
          fade(ring6, t, mid('dmedian', 0.42)); fade(ring7, t, mid('dmedian', 0.48));
          fade(dM3, t, mid('dmedian', 0.5)); fade(dM4, t, mid('dmedian', 0.78));
        } else {
          // Mo: the mode; then the range (Ranger listens, tape out)
          cart(mo, 'mo');
          show.ranger = 1; tr(ranger, 112, 600, 0.62); toFront(ranger);
          mo.set({ t, talk: scTalk(S, t, 'mo'), mood: 'happy', look: 0.8, hearts: t > mid('dmode', 0.1) && t < mid('dmode', 0.45) ? 1 : 0.2, likes: '♥ 3' });
          const rr = P(t, mid('dmode', 0.5), 0.8, ease);
          ranger.set({ t, mood: rr > 0.5 ? 'smug' : 'neutral', look: 0.8, reach: 40 + 70 * rr });
          [1, 2, 3].forEach(j => { attr(hlD[0][j], 'fill', 'rgba(255,95,200,0.5)'); fade(hlD[0][j], t, mid('dmode', 0.08 + j * 0.05)); });
          fade(dO1, t, mid('dmode', 0.12)); fade(dO2, t, mid('dmode', 0.3));
          fade(dO3, t, mid('dmode', 0.5)); fade(ringA, t, mid('dmode', 0.6)); fade(ringB, t, mid('dmode', 0.6));
          fade(dO4, t, mid('dmode', 0.62));
        }
      }
    }

    /* ---------- visibility ---------- */
    for (const kk in H) op(H[kk], show[kk]);
    op(medi, show.medi); op(mo, show.mo); op(ranger, show.ranger); op(otto, show.otto);
    op(carrier, sW);
  };
});
