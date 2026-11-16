/* Scene 6: The jacket was $48 (reverse percentages).
   Shots (hard sitcom cuts):
   A  3 p.m., the fashion shop (pcShop clothes, poster "20% OFF"): Priya, Kavya and Mum behind the counter, THE jacket
      on the rail, tag $48, already 20% off. Mum wants the original price, for bragging.
   B  the whiteboard (board right, a speaker in the left slot, a human leaning in bottom-left): Priya: $48 plus 20%,
      48 × 1.2 = $57.60 -> Kavya checks: 57.60 × 0.8 = $46.08 ≠ $48 -> Olive pops in, WRONG WHOLE! -> the bar model:
      ten 10% blocks, 8 shaded = 80% = $48, 48 ÷ 8 = $6 each, 100% = 10 × $6 = $60 -> the Great Multiplini undoes his
      trick: original × 0.8 = $48, so 48 ÷ 0.8 = $60, "Ad-aT!", 100% CORRECT -> original = new amount ÷ multiplier.
   A2 the shop, Olive and Multiplini on the counter: Mum saved $60 − $48 = $12; Priya sulks.
   C  the whiteboard: the receipt, TOTAL $43.60 incl. 9% GST -> Priya: take 9% off, 43.60 × 0.91 ≈ $39.68 ->
      WRONG WHOLE! again: 9% of the price before GST -> 109%: ÷ 1.09, 43.60 ÷ 1.09 = $40, check 40 × 1.09 = 43.60.
   A3 the shop: "I demand a recount." Hold. */
scene('jacket', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const view = (el, k, fx, fy, sx, sy) => el.setAttribute('transform', `translate(${sx.toFixed(1)} ${sy.toFixed(1)}) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const popAt = (el, t, t0, x, y, t1) => { el.set(t >= t0 && t < (t1 === undefined ? 1e9 : t1) ? P(t, t0, 0.4, linear) : 0); tr(el, x, y); };
  const chipM = (parent, text, col, size) => mkChip(parent, text, { size: size || 30, col: col || C.ink });
  const fadeIn = (el, t, t0, d) => op(el, P(t, t0, d || 0.3, linear));
  const GOLD = '#FFE45C', RED = '#D32F2F', INK = MK.ink, GREEN = '#1E9E5A', BLUE = '#2E5AAC', PURPLE = '#6A3FCF', MUTED = '#6B5E50';
  const BXC = 840;   // whiteboard centre x

  /* ================= the shop ================= */
  const shop = pcShop(root, { name: 'FASHION', kind: 'clothes', col: '#8E44AD', poster: '**20%** OFF' });
  const back = shop.firstChild;
  // THE jacket, on the end of the rail
  const jG = G(back);
  const jGlow = E('ellipse', { cx: 0, cy: 140, rx: 120, ry: 140, fill: glow(GOLD) }, jG);
  const jIn = G(jG);
  pcJacket(jIn, { s: 0.62, col: '#C0392B' });
  const tag48 = mkPriceTag(jIn, '$48', { size: 30, string: false }); tr(tag48, -66, 92);
  const Lwash = G(shop.mid), Lboard = G(shop.mid), Lmid = G(shop.mid);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#F4EEF9', opacity: 0.88 }, Lwash);
  const Lfg = G(root), Lstar = G(root), Lhud = G(root);

  /* ================= the whiteboard ================= */
  const wb = mkWhiteboard(Lboard, 620, 470); tr(wb, BXC, 370);
  const txt = (parent, y, s, o) => mkText(parent, BXC, y, s, Object.assign({ size: 34, anchor: 'middle', fill: INK }, o || {}));
  const mth = (parent, y, s, o) => mkMath(parent, BXC, y, s, Object.assign({ size: 46, anchor: 'middle', fill: INK }, o || {}));
  // B1 Priya, then Kavya's check
  const bP = G(Lboard);
  const pHead = txt(bP, 206, '**$48** plus **20%**', { size: 40, boldFill: '#C2185B' });
  const pEq = mth(bP, 286, '48 × 1.2 = $57.60', { size: 50 });
  const kHead = txt(bP, 376, 'Check: **20% off** $57.60', { size: 32, boldFill: BLUE });
  const kEq = mth(bP, 446, '57.60 × 0.8 = $46.08', { size: 46 });
  const kNe = mth(bP, 530, '$46.08 ≠ $48', { size: 52, fill: RED });
  const pX = cross(bP, 22, RED); tr(pX, BXC + 230, 270);
  const wNote = txt(Lboard, 588, 'the 20% came off the **original**', { size: 30, boldFill: RED });
  // B2 the bar model
  const bBar = G(Lboard), CW = 54, BX = BXC - 5 * CW, BY = 272, BH = 64;
  const barHead = txt(bBar, 184, 'sale price = **80%** of the original', { size: 30, boldFill: GREEN });
  const cells = [];
  for (let i = 0; i < 10; i++) {
    const g = G(bBar), x = BX + i * CW;
    E('rect', { x, y: BY, width: CW, height: BH, fill: '#FFFFFF' }, g);
    const sh = E('rect', { x, y: BY, width: CW, height: BH, fill: i < 8 ? '#7FD49A' : '#FFE29A' }, g);
    E('rect', { x, y: BY, width: CW, height: BH, fill: 'none', stroke: INK, 'stroke-width': 3 }, g);
    const lab = T(g, x + CW / 2, BY + BH / 2 + 9, '$6', { size: 26, weight: 800, anchor: 'middle', fill: INK });
    op(sh, 0); op(lab, 0);
    cells.push({ g, sh, lab });
  }
  const br80 = mkBrace(bBar, BX, BY - 8, BX + 8 * CW, BY - 8, { text: '**80%** = **$48**', col: '#1E7A46', size: 28, depth: 16 });
  const br100 = mkBrace(bBar, BX, BY + BH + 8, BX + 10 * CW, BY + BH + 8, { flip: true, text: '**100%** = {{10 × $6}} = **$60**', col: INK, size: 30, depth: 16 });
  const barEq = mkWorking(bBar, BXC, 452, ['48 ÷ 8 = $6'], { size: 46, fill: INK, ringCol: GREEN });
  const barNote = txt(bBar, 560, '{{10%}} each', { size: 30, fill: MUTED });
  // B3 undo: × 0.8 forwards, ÷ 0.8 backwards
  const bUndo = G(Lboard);
  const boxO = G(bUndo), boxN = G(bUndo);
  tr(boxO, BXC - 200, 236); tr(boxN, BXC + 200, 236);
  E('rect', { x: -86, y: -44, width: 172, height: 88, rx: 14, fill: '#FFF8E6', stroke: INK, 'stroke-width': 4, 'stroke-dasharray': '10 6' }, boxO);
  T(boxO, 0, -56, 'original', { size: 28, weight: 700, anchor: 'middle', fill: MUTED });
  const oQ = mkMath(boxO, 0, 17, '?', { size: 50, anchor: 'middle', fill: MUTED });
  const o60 = mkMath(boxO, 0, 17, '$60', { size: 50, anchor: 'middle', fill: GREEN });
  E('rect', { x: -86, y: -44, width: 172, height: 88, rx: 14, fill: '#E6F6EC', stroke: INK, 'stroke-width': 4 }, boxN);
  T(boxN, 0, -56, 'sale price', { size: 28, weight: 700, anchor: 'middle', fill: MUTED });
  mkMath(boxN, 0, 17, '$48', { size: 50, anchor: 'middle', fill: INK });
  const fwd = arrow(bUndo, BXC - 104, 220, BXC + 104, 220, { color: PURPLE, width: 6 });
  const fwdL = mkMath(bUndo, BXC, 200, '× 0.8', { size: 34, anchor: 'middle', fill: PURPLE });
  const bwd = arrow(bUndo, BXC + 200, 290, BXC - 200, 290, { color: '#C2185B', width: 6, bend: -70 });
  const bwdL = mkMath(bUndo, BXC, 382, '÷ 0.8', { size: 38, anchor: 'middle', fill: '#C2185B' });
  const undoEq = mth(bUndo, 470, '48 ÷ 0.8 = $60', { size: 52, fill: GREEN });
  // B4 the formula
  const bForm = G(Lboard);
  const fA = mth(bForm, 236, '"original" =', { size: 46, fill: INK });
  const fB = mth(bForm, 316, '"new amount" ÷ "multiplier"', { size: 44, fill: PURPLE });
  const fC = mth(bForm, 410, '48 ÷ 0.8 = 60', { size: 38, fill: MUTED });
  const fChip = mkChip(bForm, 'Going back? **Divide**, don\'t subtract.', { size: 28, col: '#2E7D4F', solid: true, fill: '#DFF5E6' });
  tr(fChip, BXC, 520);
  // C the receipt and the GST
  const rcp = G(Lboard), rIn = G(rcp);
  {
    let zig = 'M-180,0 L180,0 L180,300';
    for (let x = 180, k = 0; x > -180; x -= 20, k++) zig += ` L${x - 10},${k % 2 ? 300 : 312} L${x - 20},300`;
    E('path', { d: zig + ' Z', fill: '#FFFFFF', stroke: '#B9B2A0', 'stroke-width': 3 }, rIn);
    T(rIn, 0, 46, 'PLAZA SERATUS', { size: 30, weight: 800, anchor: 'middle', fill: INK, font: FB });
    T(rIn, 0, 84, 'Fashion · 3:42 p.m.', { size: 26, weight: 600, anchor: 'middle', fill: MUTED, font: FB });
    E('line', { x1: -160, y1: 106, x2: 160, y2: 106, stroke: INK, 'stroke-width': 2, 'stroke-dasharray': '6 5' }, rIn);
    T(rIn, -160, 150, 'Scarf', { size: 30, weight: 600, fill: INK, font: FB });
    T(rIn, 160, 150, '× 1', { size: 30, weight: 600, anchor: 'end', fill: INK, font: FB });
    E('line', { x1: -160, y1: 180, x2: 160, y2: 180, stroke: INK, 'stroke-width': 3 }, rIn);
    T(rIn, -160, 226, 'TOTAL', { size: 36, weight: 800, fill: INK, font: FB });
    T(rIn, 160, 226, '$43.60', { size: 36, weight: 800, anchor: 'end', fill: INK, font: FB });
    T(rIn, 0, 272, '(incl. 9% GST)', { size: 28, weight: 700, anchor: 'middle', fill: RED, font: FB });
  }
  const rQ = txt(Lboard, 572, 'price **before** GST = **?**', { size: 34, boldFill: BLUE });
  const cHead = txt(Lboard, 196, '**$43.60** incl. **9% GST**', { size: 36, boldFill: RED });
  const bTake = G(Lboard);
  const tA = txt(bTake, 280, 'Take **9%** off:', { size: 34, boldFill: '#C2185B' });
  const tB = mth(bTake, 360, '43.60 × 0.91 ≈ $39.68', { size: 46 });
  const tX = G(bTake); E('line', { x1: BXC - 230, y1: 346, x2: BXC + 230, y2: 336, stroke: RED, 'stroke-width': 7, 'stroke-linecap': 'round' }, tX);
  const tNote = txt(bTake, 452, '9% of the price **before** GST', { size: 32, boldFill: RED });
  const tNote2 = txt(bTake, 506, '(not 9% of $43.60)', { size: 28, fill: MUTED });
  const bDiv = G(Lboard);
  const dA = txt(bDiv, 270, 'with GST: **109%** → {{÷ 1.09}}', { size: 34, boldFill: BLUE });
  const dB = mkWorking(bDiv, BXC + 60, 330, ['43.60 ÷ 1.09 = $40'], { size: 54, fill: GREEN, ringCol: GREEN });
  const dC = txt(bDiv, 470, 'check: {{40 × 1.09 = 43.60}}', { size: 34, fill: INK });
  const dTick = tick(bDiv, 20, GREEN); tr(dTick, BXC + 262, 458);

  /* ================= chips, stamps, sparkles ================= */
  const ch = {
    three: chipM(Lfg, '**3 p.m.**', GOLD, 34),
    off: chipM(Lfg, 'already **20% off**: {{$48}}', '#FF8FB0', 30),
    brag: chipM(Lfg, 'for **bragging**', GOLD, 32),
    adat: chipM(Lfg, '**Ad-aT!**', GOLD, 40),
    saved: chipM(Lfg, '{{$60 − $48 = $12}} **saved**', '#9FE0B5', 34),
    recount: mkChip(Lfg, '**RECOUNT**', { size: 34, col: RED, solid: true, fill: '#FFD6D6' }),
  };
  const stampNo = pcStamp(Lfg, false), stampNo2 = pcStamp(Lfg, false), stampOK = pcStamp(Lfg, true);
  const stars = [];
  for (let i = 0; i < 10; i++) stars.push(spark(Lstar, 12 + (i % 3) * 5, { color: i % 2 ? GOLD : '#FFFFFF' }));

  /* ================= the cast ================= */
  const priya = cast(Lmid, 'priya', { s: 0.82 });
  const kav = cast(Lmid, 'kavya', { s: 0.82 });
  const mum = cast(Lmid, 'mum', { s: 0.82, prop: null, hand: true, side: 'right' });
  const olive = cast(Lfg, 'olive', { s: 0.62 });
  const multi = cast(Lfg, 'multi', { s: 0.58 });
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cuts */
  const cB = at('priya') - 0.06, cA2 = at('saved') - 0.06, cC = at('gst') - 0.06, cA3 = at('recount') - 0.06;
  const XS = { priya: 170, kav: 340, mum: 510 };
  const LEAN = [140, 668, 0.95, 6];
  const SLOT = [300, 380];                                   // the speaker's slot left of the board
  const ON_COUNTER = { olive: [870, 520 - 126 * 0.62, 0.62], multi: [1000, 520 - 124 * 0.58, 0.58] };
  const puff = (t, t0, x, y, r) => {
    if (t < t0 || t > t0 + 0.9) return;
    const pf = P(t, t0, 0.9, easeOut);
    stars.forEach((s, i) => { const a = i / stars.length * TAU; op(s, 1 - pf); tr(s, x + Math.cos(a) * r * pf, y + Math.sin(a) * r * 0.85 * pf, 1); s.upd(t); });
  };

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const sB = on(t, cB, cA2), sC = on(t, cC, cA3), board = sB || sC, shopOn = 1 - board;
    for (const k in ch) ch[k].set(0);
    stampNo.set(0); stampNo2.set(0); stampOK.set(0);
    stars.forEach(s => op(s, 0));
    const show = { priya: 0, kav: 0, mum: 0, olive: 0, multi: 0 };
    const who = scWho(S, t);

    /* ---------- the set ---------- */
    op(Lwash, board); op(Lboard, board); op(shop.front, shopOn); op(shop.top, shopOn);
    if (board) view(back, 1.35, 600, 330, 600, 375); else back.removeAttribute('transform');
    op(jG, shopOn);
    // jacket: hangs on the rail; lifts and swings when Mum shows it off
    const lift = t >= mid('three', 0.25) && t < at('priya') ? P(t, mid('three', 0.25), 0.4, ease) : 0;
    tr(jG, 705, 222 - 16 * lift);
    tr(jIn, 0, 0, 1, Math.sin(t * 2.4) * 2.5 * AMP * (0.4 + lift));
    op(jGlow, t < at('priya') ? P(t, mid('three', 0.2), 0.3, linear) * (0.55 + 0.25 * Math.sin(t * 6)) : 0);
    tag48.set(Math.sin(t * 3.1) * 6 * AMP);

    /* ---------- the shop shots ---------- */
    if (shopOn) {
      show.priya = show.kav = show.mum = 1;
      tr(priya, XS.priya, 448, 0.82); tr(kav, XS.kav, 448, 0.82); tr(mum, XS.mum, 446, 0.82);
      const late = t >= cA2;
      if (late) {
        show.olive = show.multi = 1;
        tr(olive, ...ON_COUNTER.olive); tr(multi, ...ON_COUNTER.multi);
      }
      if (t < cB) {
        // A: three, brag
        popAt(ch.three, t, at('three') + 0.1, 700, 60);
        popAt(ch.off, t, mid('three', 0.55), 790, 448);
        popAt(ch.brag, t, mid('brag', 0.55), 470, 268);
        const bragging = t >= at('brag');
        mum.set({ t, talk: scTalk(S, t, 'mum'), mood: bragging ? 'smug' : 'happy', look: bragging ? -0.2 : 0.9, lift: lift > 0.5 ? 1 : 0 });
        priya.set({ t, talk: 0, mood: 'neutral', look: 0.8 });
        kav.set({ t, talk: 0, mood: bragging && t > mid('brag', 0.7) ? 'deadpan' : 'neutral', look: 0.8 });
      } else if (t < cC) {
        // A2: saved
        popAt(ch.saved, t, mid('saved', 0.2), 380, 266);
        mum.set({ t, talk: scTalk(S, t, 'mum'), mood: 'smug', look: t > mid('saved', 0.55) ? -0.9 : 0.2, lift: 1 });
        priya.set({ t, talk: 0, mood: t > mid('saved', 0.55) ? 'annoyed' : 'sad', look: 0.8 });
        kav.set({ t, talk: 0, mood: 'happy', look: 0.8 });
        olive.set({ t, talk: 0, mood: 'smug', look: -0.8 });
        multi.set({ t, talk: 0, mood: 'smug', look: -0.8, wand: 0.3 });
      } else {
        // A3: recount (hold)
        popAt(ch.recount, t, mid('recount', 0.45), 200, 268);
        priya.set({ t, talk: scTalk(S, t, 'priya'), mood: 'annoyed', look: 0.9, lift: 1 });
        kav.set({ t, talk: 0, mood: 'deadpan', look: -0.8 });
        mum.set({ t, talk: 0, mood: 'smug', look: -0.8, lift: 0 });
        olive.set({ t, talk: 0, mood: 'smug', look: -0.9, huff: 0.6 });
        multi.set({ t, talk: 0, mood: t > end('recount') ? 'happy' : 'smug', look: -0.9, wand: 0.2 });
      }
    }

    /* ---------- the board shots ---------- */
    if (board) {
      // the human leaning in from the bottom-left
      let hum = null, key = '', hw = '', enter = 0, hm = 'neutral', hl = 0.7, hlift = 0;
      if (sB) {
        if (t < at('check') - 0.1) { hum = priya; key = 'priya'; hw = 'priya'; enter = cB; hm = 'smug'; hlift = t > mid('priya', 0.6) ? 1 : 0; }
        else if (t < at('wrong') - 0.1) { hum = kav; key = 'kav'; hw = 'kavya'; enter = at('check') - 0.1; hm = t > mid('check', 0.8) ? 'smug' : 'neutral'; }
        else if (t < at('bar') - 0.1) { hum = priya; key = 'priya'; hw = 'priya'; enter = at('wrong') - 0.1; hm = t < mid('wrong', 0.45) ? 'shock' : 'annoyed'; hl = 0.3; }
        else { hum = kav; key = 'kav'; hw = 'kavya'; enter = at('bar') - 0.1; hm = t > at('undo') ? 'happy' : 'neutral'; }
      } else {
        if (t < at('take') - 0.1) { hum = kav; key = 'kav'; hw = 'kavya'; enter = cC; hm = 'neutral'; }
        else if (t < at('divide') - 0.1) { hum = priya; key = 'priya'; hw = 'priya'; enter = at('take') - 0.1; hm = t < at('again') ? 'smug' : t < mid('again', 0.4) ? 'shock' : 'annoyed'; hlift = t < at('again') && t > mid('take', 0.4) ? 1 : 0; }
        else { hum = kav; key = 'kav'; hw = 'kavya'; enter = at('divide') - 0.1; hm = t > mid('divide', 0.6) ? 'happy' : 'neutral'; }
      }
      if (hum) {
        show[key] = 1;
        tr(hum, LEAN[0], lerp(LEAN[1] + 220, LEAN[1], P(t, enter, 0.35, pop)), LEAN[2], LEAN[3]);
        hum.set({ t, talk: scTalk(S, t, hw), mood: hm, look: hl, lift: hlift });
      }
      // Olive and the Great Multiplini in the slot left of the board
      const oIn = sB ? at('wrong') - 0.05 : at('again') - 0.05, mIn = sB ? at('undo') - 0.05 : at('divide') - 0.05;
      if (t >= oIn) {
        show.olive = 1;
        const p = P(t, oIn, 0.4, pop), aside = P(t, mIn, 0.45, ease);
        tr(olive, lerp(SLOT[0], 130, aside), lerp(SLOT[1], 340, aside), Math.max(0.01, lerp(1.05, 0.72, aside) * p));
        const spk = who === 'olive';
        let om = spk ? 'annoyed' : 'neutral';
        if (sB && t >= at('formula')) om = t > mid('formula', 0.5) ? 'smug' : 'annoyed';
        if (sB && t >= at('undo') && t < at('formula')) om = t > mid('undo', 0.85) ? 'smug' : 'neutral';
        if (sC && t >= at('divide')) om = t > mid('divide', 0.7) ? 'smug' : 'neutral';
        olive.set({ t, talk: scTalk(S, t, 'olive'), mood: om, look: spk ? 0.6 : 0.8, huff: (sB && t < mid('wrong', 0.6)) || (sC && t < mid('again', 0.6)) ? P(t, oIn, 0.3, linear) : 0 });
      }
      if (t >= mIn) {
        show.multi = 1;
        const p = P(t, mIn + 0.05, 0.45, pop);
        tr(multi, 370, 372, Math.max(0.01, 0.85 * p));
        puff(t, mIn, 370, 372, 170);
        const spk = who === 'multi';
        const wandT = sB ? mid('undo', 0.3) : mid('divide', 0.3);
        multi.set({ t, talk: scTalk(S, t, 'multi'), mood: spk ? 'smug' : (who === 'olive' ? 'neutral' : 'smug'), look: spk ? 0.7 : -0.6, wand: t > wandT ? 1 : 0.3 });
      }

      /* B: board content */
      op(bP, 0); op(wNote, 0); op(bBar, 0); op(bUndo, 0); op(bForm, 0);
      op(rcp, 0); op(rQ, 0); op(cHead, 0); op(bTake, 0); op(bDiv, 0);
      if (sB) {
        if (t < at('bar')) {
          op(bP, 1);
          const dim = t >= at('wrong') ? 0.25 : 1;
          fadeIn(pHead, t, mid('priya', 0.08)); fadeIn(pEq, t, mid('priya', 0.45));
          op(pX, t >= at('check') ? P(t, mid('check', 0.85), 0.25, linear) : 0);
          op(kHead, t >= at('check') ? P(t, mid('check', 0.1), 0.3, linear) * dim : 0);
          op(kEq, t >= at('check') ? P(t, mid('check', 0.35), 0.3, linear) * dim : 0);
          op(kNe, t >= at('check') ? P(t, mid('check', 0.72), 0.3, linear) * dim : 0);
          if (dim < 1) { op(pHead, 0.25); op(pEq, 0.25); op(pX, 0.25); }
          if (t >= at('wrong')) {
            stampNo.set(P(t, mid('wrong', 0.08), 0.35, linear)); tr(stampNo, BXC, 330, 0.55);
            fadeIn(wNote, t, mid('wrong', 0.55));
          }
        } else if (t < at('undo')) {
          op(bBar, 1);
          fadeIn(barHead, t, at('bar') + 0.05);
          cells.forEach((c, i) => {
            op(c.g, P(t, at('bar') + 0.1 + i * 0.05, 0.2, linear));
            op(c.sh, i < 8 ? P(t, mid('bar', 0.18) + i * 0.06, 0.2, linear) : P(t, mid('bar', 0.8), 0.3, linear));
            op(c.lab, P(t, mid('bar', 0.6) + i * 0.04, 0.2, linear));
          });
          br80.set(P(t, mid('bar', 0.3), 0.3, linear));
          fadeIn(barEq, t, mid('bar', 0.45)); barEq.ring(0, P(t, mid('bar', 0.58), 0.2, linear));
          fadeIn(barNote, t, mid('bar', 0.5));
          br100.set(P(t, mid('bar', 0.8), 0.3, linear));
        } else if (t < at('formula')) {
          op(bUndo, 1);
          const p0 = at('undo');
          op(boxN, P(t, p0 + 0.05, 0.25, linear)); op(boxO, P(t, p0 + 0.15, 0.25, linear));
          fwd.set(P(t, mid('undo', 0.1), 0.35, linear)); op(fwdL, P(t, mid('undo', 0.15), 0.3, linear));
          bwd.set(P(t, mid('undo', 0.35), 0.5, linear)); op(bwdL, P(t, mid('undo', 0.42), 0.3, linear));
          const got = P(t, mid('undo', 0.62), 0.3, linear);
          op(oQ, 1 - got); op(o60, got);
          fadeIn(undoEq, t, mid('undo', 0.6));
          popAt(ch.adat, t, mid('undo', 0.8), 370, 170);
          stampOK.set(t >= mid('undo', 0.86) ? P(t, mid('undo', 0.86), 0.35, linear) : 0); tr(stampOK, BXC, 562, 0.45);
        } else {
          op(bForm, 1);
          fadeIn(fA, t, at('formula') + 0.05); fadeIn(fB, t, mid('formula', 0.15));
          fadeIn(fC, t, mid('formula', 0.4));
          fChip.set(P(t, mid('formula', 0.55), 0.4, linear));
        }
      }

      /* C: board content */
      if (sC) {
        if (t < at('take')) {
          op(rcp, 1);
          const rp = P(t, cC + 0.05, 0.4, pop);
          tr(rcp, BXC, 170); tr(rIn, 0, 0, Math.max(0.01, 0.85 + 0.15 * rp));
          op(rIn, clamp(rp * 3));
          fadeIn(rQ, t, mid('gst', 0.68));
        } else {
          fadeIn(cHead, t, at('take') - 0.05, 0.2);
          if (t < at('divide')) {
            op(bTake, 1);
            fadeIn(tA, t, mid('take', 0.1)); fadeIn(tB, t, mid('take', 0.4));
            op(tX, t >= at('again') ? P(t, mid('again', 0.15), 0.25, linear) : 0);
            op(tNote, t >= at('again') ? P(t, mid('again', 0.55), 0.3, linear) : 0);
            op(tNote2, t >= at('again') ? P(t, mid('again', 0.7), 0.3, linear) : 0);
            if (t >= at('again')) { stampNo2.set(P(t, mid('again', 0.05), 0.35, linear)); tr(stampNo2, BXC, 566, 0.55); }
          } else {
            op(bDiv, 1);
            fadeIn(dA, t, mid('divide', 0.05)); fadeIn(dB, t, mid('divide', 0.3));
            dB.ring(0, P(t, mid('divide', 0.55), 0.2, linear));
            fadeIn(dC, t, mid('divide', 0.68)); op(dTick, P(t, mid('divide', 0.9), 0.2, linear));
          }
        }
      }
    }

    op(priya, show.priya); op(kav, show.kav); op(mum, show.mum); op(olive, show.olive); op(multi, show.multi);
  };
});
