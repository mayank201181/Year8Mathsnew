/* Scene 2: Ten, five, one (percentages of amounts).
   Shots (hard sitcom cuts):
   A  11 a.m., the shoe shop (pcShop shoes, poster "15% OFF"): Dad, Mum, Kavya and Ah Boy behind the counter, the $64
      school shoes on it. Ah Boy: $64, 15% off; Mum stops Dad's calculator ("in your head!"); Tenner (the 10% block)
      drops onto the counter (lower third).
   B  the bar card: $64 = 100% as ten blocks; Tenner lights one block: 10% of $64 = 64 ÷ 10 = $6.40; Fiver pops in:
      half a block, 5% = 10% ÷ 2 = $3.20; Kavya: brace over 1½ blocks, 15% = 10% + 5%, 6.40 + 3.20 = $9.60;
      Mum: 64 − 9.60 = $54.40 (you pay), 100% CORRECT.
   C  Percy's bonus card: x% of y = y% of x; 4% of 25 = 25% of 4 = 1 (the 4 and the 25 swap along arcs).
   A2 the shop again: Dad and the $260 blender (37% off), calculator up.
   D  the calculator card: 'of' means ×, 37% = 0.37, 0.37 × 260 = 96.2; Dad: "$96.02?"; Kavya: $96.20, money has
      2 decimal places; Percy: 37% ≈ 1/3, a third of $260 ≈ $87, so $96.20 is believable.
   A3 the shop: Uno joins; Tenner, Fiver and Uno do push-ups on the counter: 10 – 5 – 1. */
scene('chunks', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const view = (el, k, fx, fy, sx, sy) => el.setAttribute('transform', `translate(${sx.toFixed(1)} ${sy.toFixed(1)}) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const popAt = (el, t, t0, x, y, t1) => { el.set(t >= t0 && t < (t1 === undefined ? 1e9 : t1) ? P(t, t0, 0.4, linear) : 0); tr(el, x, y); };
  const chipM = (parent, text, col, size) => mkChip(parent, text, { size: size || 30, col: col || C.ink });
  const fadeIn = (el, t, t0, d) => op(el, P(t, t0, d || 0.3, linear));
  const GOLD = '#FFE45C', RED = '#D32F2F', INK = MK.ink, GREEN = '#1E9E5A', BLUE = '#2E5AAC';
  const ORANGE = '#FF8A3D', ORANGE_L = '#FFC98F', PAYG = '#BFEACF';
  function panel(parent, x0, y0, x1, y1) {
    const g = G(parent);
    E('rect', { x: x0 + 6, y: y0 + 8, width: x1 - x0, height: y1 - y0, rx: 20, fill: 'rgba(0,0,0,0.16)' }, g);
    E('rect', { x: x0, y: y0, width: x1 - x0, height: y1 - y0, rx: 20, fill: MK.paper, stroke: '#C9B48A', 'stroke-width': 5 }, g);
    return g;
  }

  /* ================= the shop ================= */
  const shop = pcShop(root, { name: 'SHOES', kind: 'shoes', col: '#C0392B', poster: '**15%** OFF' });
  const back = shop.firstChild;
  const glowP = E('rect', { x: 935 - 136, y: 300 - 106, width: 272, height: 212, rx: 18, fill: 'none', stroke: GOLD, 'stroke-width': 10 }, back);
  const Lwash = G(shop.mid), Lboard = G(shop.mid), Lmid = G(shop.mid);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#EEF3FA', opacity: 0.88 }, Lwash);
  const Lfg = G(root), Lstar = G(root), Lhud = G(root);

  // the shoes, with their own tag over the box (no string, so it never crosses a face)
  const shoes = pcShoes(shop.top, { s: 0.6 }); tr(shoes, 735, 524);
  const tag64 = mkPriceTag(shop.top, '$64', { size: 34, string: false }); tr(tag64, 676, 588);
  // the boxed blender
  const blender = G(shop.top), blIn = G(blender);
  E('rect', { x: -100, y: -74, width: 186, height: 74, rx: 6, fill: '#D9A86C', stroke: SC_INK, 'stroke-width': 4 }, blIn);
  E('path', { d: 'M-100,-74 L-84,-88 L102,-88 L86,-74 Z', fill: '#EBC48E', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, blIn);
  E('path', { d: 'M86,-74 L102,-88 L102,-14 L86,0 Z', fill: '#B98A52', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, blIn);
  T(blIn, -36, -26, 'BLENDER', { size: 26, weight: 800, anchor: 'middle', fill: '#6B4423' });
  E('rect', { x: -40, y: -128, width: 80, height: 40, rx: 8, fill: '#3A4A58', stroke: SC_INK, 'stroke-width': 4 }, blIn);
  E('circle', { cx: 0, cy: -108, r: 9, fill: '#FF5F5F', stroke: SC_INK, 'stroke-width': 2.5 }, blIn);
  E('path', { d: 'M-34,-128 L-44,-236 L44,-236 L34,-128 Z', fill: 'rgba(190,230,255,0.75)', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, blIn);
  E('path', { d: 'M-30,-170 L30,-170 L33,-136 L-33,-136 Z', fill: '#FF9AA4', opacity: 0.8 }, blIn);   // strawberry smoothie
  E('rect', { x: -48, y: -248, width: 96, height: 16, rx: 6, fill: '#3A4A58', stroke: SC_INK, 'stroke-width': 3 }, blIn);
  E('path', { d: 'M44,-220 Q74,-206 70,-170 Q66,-148 40,-150', fill: 'none', stroke: SC_INK, 'stroke-width': 8, 'stroke-linecap': 'round' }, blIn);
  const tag260 = mkPriceTag(blIn, '$260', { size: 30, string: false }); tr(tag260, -150, -150);
  const stick = G(blIn); tr(stick, 64, -40, 1, 10);
  E('circle', { r: 42, fill: RED, stroke: '#FFFFFF', 'stroke-width': 4 }, stick);
  T(stick, 0, -3, '37%', { size: 28, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  T(stick, 0, 24, 'OFF', { size: 26, weight: 800, anchor: 'middle', fill: GOLD });

  /* ================= B: the bar card ================= */
  const BCX = 735, CW = 80, BX = BCX - 5 * CW, BY = 218, BH = 76;
  const cardB = panel(Lboard, 300, 110, 1170, 600);
  const bHead = mkText(cardB, BCX, 164, '**$64** = **100%**', { size: 42, anchor: 'middle', fill: INK, boldFill: RED });
  const cells = [];
  for (let i = 0; i < 10; i++) {
    const g = G(cardB), x = BX + i * CW;
    E('rect', { x, y: BY, width: CW, height: BH, fill: '#FFFFFF' }, g);
    const full = E('rect', { x, y: BY, width: CW, height: BH, fill: ORANGE }, g);
    const half = E('rect', { x, y: BY, width: CW / 2, height: BH, fill: ORANGE_L }, g);
    const pay = E('rect', { x: i === 1 ? x + CW / 2 : x, y: BY, width: i === 1 ? CW / 2 : CW, height: BH, fill: PAYG }, g);
    E('rect', { x, y: BY, width: CW, height: BH, fill: 'none', stroke: INK, 'stroke-width': 3 }, g);
    const halfLine = E('line', { x1: x + CW / 2, y1: BY, x2: x + CW / 2, y2: BY + BH, stroke: INK, 'stroke-width': 3, 'stroke-dasharray': '7 5' }, g);
    const p10 = T(g, x + CW / 2, BY - 12, '10%', { size: 26, weight: 700, anchor: 'middle', fill: '#8A6A44' });
    const money = T(g, x + CW / 2, BY + BH / 2 + 9, '$6.40', { size: 26, weight: 700, anchor: 'middle', fill: INK });
    const five = T(g, x + CW / 4, BY + BH / 2 + 9, '5%', { size: 26, weight: 800, anchor: 'middle', fill: '#8A4A10' });
    [full, half, pay, halfLine, five].forEach(e => op(e, 0));
    cells.push({ g, full, half, pay, halfLine, p10, money, five });
  }
  const bBr5 = mkBrace(cardB, BX + CW, BY + BH + 8, BX + 1.5 * CW, BY + BH + 8, { flip: true, text: '**$3.20**', col: INK, size: 28, depth: 16 });
  const bBr15 = mkBrace(cardB, BX, BY + BH + 8, BX + 1.5 * CW, BY + BH + 8, { flip: true, text: '**15%** off', col: '#C2571A', size: 30 });
  const bBrPay = mkBrace(cardB, BX + 1.5 * CW, BY + BH + 8, BX + 10 * CW, BY + BH + 8, { flip: true, text: '**85%**: what you pay', col: GREEN, size: 30 });
  const wTen = mkWorking(cardB, BCX, 398, ['10% "of" $64 = 64 ÷ 10', '= $6.40'], { size: 46, fill: INK, gap: 26 });
  const wFive = mkWorking(cardB, BCX - 60, 398, ['5% = 10% ÷ 2', '= 6.40 ÷ 2 = $3.20'], { size: 46, fill: INK, gap: 26 });
  const wFif = mkWorking(cardB, BCX - 40, 384, ['15% = 10% + 5%', '= 6.40 + 3.20', { m: '= $9.60', note: '**off**', noteCol: '#C2571A' }], { size: 44, fill: INK, gap: 18, noteSize: 34, noteX: 165 });
  const wPay = mkWorking(cardB, BCX, 418, ['64 − 9.60 = $54.40'], { size: 56, fill: INK, ringCol: GREEN });

  /* ================= C: Percy's bonus card ================= */
  const CCX = 430;
  const cardC = panel(Lboard, 60, 130, 800, 540);
  const cHead = mkText(cardC, CCX, 192, '**Bonus** swap trick', { size: 36, anchor: 'middle', fill: INK, boldFill: '#C2185B' });
  const cRule = mkMath(cardC, CCX, 272, 'x% "of" y = y% "of" x', { size: 50, anchor: 'middle', fill: '#C2185B' });
  // 4% of 25 = 25% of 4 = 1, built in pieces so the 4 and the 25 can fly
  const SZ = 52, gapW = SZ * 0.3;
  const PCS = [['4', 0], ['%', 0.04], ['"of"', 1], ['25', 1], ['=', 1], ['25', 1, 'f25'], ['%', 0.04], ['"of"', 1], ['4', 1, 'f4'], ['=', 1], ['1', 1]];
  let wSum = 0;
  const meas = PCS.map(([src, g]) => { const m = mkMeasure(src, { size: SZ }); wSum += (wSum ? g * gapW : 0) + m.w; return m; });
  let xx = CCX - wSum / 2;
  const ROWY = 420, pcsX = [];
  const pcsG = PCS.map(([src, g, tag], i) => {
    if (i) xx += g * gapW;
    pcsX.push(xx);
    const el = mkMath(cardC, 0, 0, src, { size: SZ, fill: INK });
    tr(el, xx, ROWY);
    xx += meas[i].w;
    return el;
  });
  const f4 = pcsG[8], f25 = pcsG[5];
  const swapArcs = G(cardC);
  const arc4 = E('path', { d: `M${pcsX[0] + meas[0].w / 2},${ROWY - 50} Q${(pcsX[0] + pcsX[8]) / 2 + 20},${ROWY - 170} ${pcsX[8] + meas[8].w / 2},${ROWY - 50}`, fill: 'none', stroke: BLUE, 'stroke-width': 4, 'stroke-dasharray': '10 8' }, swapArcs);
  const arc25 = E('path', { d: `M${pcsX[3] + meas[3].w / 2},${ROWY + 18} Q${(pcsX[3] + pcsX[5]) / 2 + meas[3].w / 2},${ROWY + 90} ${pcsX[5] + meas[5].w / 2},${ROWY + 18}`, fill: 'none', stroke: '#C2571A', 'stroke-width': 4, 'stroke-dasharray': '10 8' }, swapArcs);
  const swapLab = T(cardC, (pcsX[3] + pcsX[5]) / 2 + 20, ROWY + 106, 'swap!', { size: 28, weight: 700, anchor: 'middle', fill: '#C2571A' });

  /* ================= D: the calculator card ================= */
  const DCX = 640;
  const cardD = panel(Lboard, 300, 110, 1170, 580);
  const dHead = mkText(cardD, DCX, 186, "**'of'** means **×**", { size: 42, anchor: 'middle', fill: INK, boldFill: BLUE });
  const wOf = mkWorking(cardD, DCX + 20, 236, ['37% = 0.37', '0.37 × 260 = 96.2'], { size: 46, fill: INK, gap: 30 });
  const calc = mkCalculator(cardD, {}); tr(calc, 1035, 345, 0.75);
  const d96 = G(cardD);
  const d96a = mkMath(d96, 0, 0, '$96.2', { size: 78, fill: INK });
  const d96b = mkMath(d96, 0, 0, '0', { size: 78, fill: '#E08A00' });
  const d96w = d96a.w + d96b.w;
  tr(d96a, -d96w / 2, 0); tr(d96b, -d96w / 2 + d96a.w, 0);
  const d96ring = E('rect', { x: -d96w / 2 + d96a.w - 8, y: -d96b.a - 8, width: d96b.w + 16, height: d96b.a + d96b.d + 16, rx: 10, fill: 'none', stroke: GOLD, 'stroke-width': 5 }, d96);
  const cDp = mkChip(cardD, 'money: **2 decimal places**', { size: 30, col: '#2E7D4F', solid: true, fill: '#DFF5E6' });
  // est: a third
  const eq37 = mkMath(cardD, 735, 212, '37% ≈ 1/3', { size: 46, anchor: 'middle', fill: INK });
  const thirds = G(cardD), TX = 495, TW = 160, TY = 268;
  T(thirds, TX - 14, TY + 42, '$260:', { size: 30, weight: 800, anchor: 'end', fill: INK });
  const thirdCells = [0, 1, 2].map(i => {
    const g = G(thirds);
    const f = E('rect', { x: TX + i * TW, y: TY, width: TW, height: 60, fill: i ? '#FFFFFF' : '#FFE29A', stroke: INK, 'stroke-width': 3 }, g);
    T(g, TX + i * TW + TW / 2, TY + 40, '≈ $87', { size: 28, weight: 700, anchor: 'middle', fill: INK });
    return { g, f };
  });
  const thBr = mkBrace(cardD, TX, TY + 68, TX + TW, TY + 68, { flip: true, text: 'a third ≈ **$87**', col: '#B8860B', size: 28, depth: 16 });
  const estTick = tick(cardD, 22, GREEN);
  const estTxt = T(cardD, 0, 0, 'believable', { size: 30, weight: 700, fill: GREEN });

  /* ================= chips, stamp, bubble, sparkles ================= */
  const ch = {
    eleven: chipM(Lfg, '**11 a.m.**', GOLD, 34),
    head: chipM(Lfg, 'in your **head**!', '#FF8FB0', 32),
    ten: chipM(Lfg, '**10%** = {{÷ 10}}', GOLD, 34),
    calc: chipM(Lfg, 'calculator time!', '#9FE0B5', 30),
    one: chipM(Lfg, '**1%** = {{÷ 100}}', GOLD, 34),
    gym: chipM(Lfg, '**10 – 5 – 1**', '#FFB37A', 40),
  };
  const stampOK = pcStamp(Lfg, true);
  const bubble = mkSpeechBubble(Lfg, '$96.02**?**', { size: 42, tail: 'left', boldFill: RED });
  const stars = [];
  for (let i = 0; i < 10; i++) stars.push(spark(Lstar, 12 + (i % 3) * 5, { color: i % 2 ? GOLD : '#FFFFFF' }));

  /* ================= the cast ================= */
  const dad = cast(Lmid, 'dad', { s: 0.82 });
  const mum = cast(Lmid, 'mum', { s: 0.82, prop: null, hand: true });
  const kav = cast(Lmid, 'kavya', { s: 0.82 });
  const boy = cast(Lmid, 'boy', { s: 0.82 });
  const tenner = cast(Lfg, 'tenner', { s: 0.6 });
  const percy = cast(Lfg, 'percy', { s: 0.9 });
  const lt = { tenner: pcLowerThird(Lhud, 'tenner') };
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cuts */
  const cB = at('ten') - 0.06, cC = at('swap') - 0.06, cA2 = at('blender') - 0.06, cD = at('of') - 0.06, cA3 = at('gym') - 0.06;
  const XA = { dad: 140, mum: 290, kav: 440, boy: 590 };      // shop A
  const XA2 = { mum: 130, kav: 275, boy: 415, dad: 555 };     // shop A2, A3 (Dad by the blender)
  const LEAN = [140, 668, 0.95, 6];
  const TEN_Y = s => 520 - 118 * s;                            // Tenner standing on the counter

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const sA = on(t, -1, cB), sB = on(t, cB, cC), sC = on(t, cC, cA2), sA2 = on(t, cA2, cD), sD = on(t, cD, cA3), sA3 = on(t, cA3, 1e9);
    const shopOn = sA || sA2 || sA3, board = !shopOn;
    for (const k in ch) ch[k].set(0);
    stampOK.set(0); bubble.set(0); lt.tenner.set(0);
    stars.forEach(s => op(s, 0));
    const show = { dad: 0, mum: 0, kav: 0, boy: 0, tenner: 0, percy: 0 };
    const who = scWho(S, t);

    /* ---------- the set ---------- */
    op(Lwash, board ? 1 : 0); op(shop.front, shopOn); op(shop.top, shopOn);
    if (board) view(back, 1.35, 600, 330, 600, 375); else back.removeAttribute('transform');
    op(cardB, sB); op(cardC, sC); op(cardD, sD);
    op(glowP, sA && t >= at('boy') - 0.1 && t < at('tenner') ? 0.6 + 0.4 * Math.sin(t * 8) : 0);
    op(shoes, sA); op(tag64, sA); op(blender, sA2 || sA3);

    /* ---------- A: the shoe shop ---------- */
    if (sA) {
      show.dad = show.mum = show.kav = show.boy = 1;
      tr(dad, XA.dad, 446, 0.82); tr(mum, XA.mum, 446, 0.82); tr(kav, XA.kav, 448, 0.82); tr(boy, XA.boy, 432, 0.82);
      popAt(ch.eleven, t, at('shoes') + 0.1, 700, 60, at('tenner'));
      // the tag swings when Ah Boy reads it
      const sw = t >= mid('boy', 0.15) ? Math.sin((t - mid('boy', 0.15)) * 7) * 14 * Math.exp(-(t - mid('boy', 0.15)) * 1.2) * AMP : 0;
      tag64.set(sw);
      let dm = 'happy', dl = 0.5, dlift = 0, mm = 'neutral', ml = 0.6, mlift = 0, km = 'neutral', kl = 0.6, bm = 'happy', bl = 0.9, blift = 0;
      if (t >= at('boy') && t < at('tenner')) {
        blift = 1; bl = 0.8;
        dlift = t > mid('boy', 0.45) ? 1 : 0; dm = 'smug';
        mlift = t > mid('boy', 0.6) ? 1 : 0; mm = t > mid('boy', 0.6) ? 'annoyed' : 'neutral'; ml = -0.8;
        if (t > mid('boy', 0.6)) dm = 'sad';
        popAt(ch.head, t, mid('boy', 0.62), 215, 262);
        km = 'neutral'; kl = 0.8;
      }
      if (t >= at('tenner') - 0.1) {
        // Tenner drops onto the counter
        show.tenner = 1;
        const t0 = at('tenner') - 0.1, f = P(t, t0, 0.45, easeIn), land = t0 + 0.45;
        const sq = t > land ? Math.exp(-(t - land) * 6) * Math.sin((t - land) * 18) * 0.12 : 0;
        const ts = 0.58;
        tr(tenner, 930, lerp(-160, TEN_Y(ts * (1 - sq)), f), `${(ts * (1 + sq)).toFixed(4)} ${(ts * (1 - sq)).toFixed(4)}`);
        if (t > land && t < land + 0.8) { const pf = P(t, land, 0.8, easeOut); stars.forEach((s, i) => { const a = Math.PI + (i / 9) * Math.PI; op(s, 1 - pf); tr(s, 930 + Math.cos(a) * 150 * pf, 515 + Math.sin(a) * 70 * pf, 1); s.upd(t); }); }
        tenner.set({ t, talk: scTalk(S, t, 'tenner'), mood: 'happy', look: -0.6, arms: t > land ? 1 : 0.4 });
        lt.tenner.set(win(t, land, land + 3.2, 0.3));
        popAt(ch.ten, t, mid('tenner', 0.6), 700, 252);
        const shock = t > land && t < land + 0.9;
        dm = shock ? 'shock' : 'happy'; mm = shock ? 'shock' : 'neutral'; km = shock ? 'shock' : 'happy'; bm = shock ? 'shock' : 'happy';
        dl = ml = kl = bl = 0.9; dlift = mlift = blift = 0;
      }
      dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: dl, lift: dlift });
      mum.set({ t, talk: scTalk(S, t, 'mum'), mood: mm, look: ml, lift: mlift });
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: bm, look: bl, lift: blift });
    }

    /* ---------- B: the bar card ---------- */
    if (sB) {
      show.tenner = 1;
      tr(tenner, 140, 340, 0.75);
      const pumping = who === 'tenner';
      tenner.set({ t, talk: scTalk(S, t, 'tenner'), mood: 'happy', look: who === 'tenner' ? 0.6 : -0.3, arms: pumping ? 0.7 + 0.3 * Math.sin(t * 6) : 0.5, fiver: P(t, mid('fiver', 0.12), 0.4, linear) });
      // the leaning human: Ah Boy (listening), Kavya (fifteen), Mum (pay)
      let hum = boy, key = 'boy', hw = 'boy', enter = cB, hm = 'happy', hl = 0.7, lift = 0, ly = 640;
      if (t >= at('fifteen') - 0.1 && t < at('pay') - 0.1) { hum = kav; key = 'kav'; hw = 'kavya'; enter = at('fifteen') - 0.1; ly = LEAN[1]; hm = t > mid('fifteen', 0.75) ? 'smug' : 'neutral'; }
      else if (t >= at('pay') - 0.1) { hum = mum; key = 'mum'; hw = 'mum'; enter = at('pay') - 0.1; ly = LEAN[1]; hm = t > mid('pay', 0.55) ? 'smug' : 'neutral'; lift = t > mid('pay', 0.7) ? 1 : 0; }
      show[key] = 1;
      const up = P(t, enter, 0.35, pop);
      tr(hum, LEAN[0], lerp(ly + 220, ly, up), LEAN[2], LEAN[3]);
      hum.set({ t, talk: scTalk(S, t, hw), mood: hm, look: hl, lift });

      // the bar
      const tenOn = t < at('fiver'), fivOn = t >= at('fiver') && t < at('fifteen'), fifOn = t >= at('fifteen') && t < at('pay'), payOn = t >= at('pay');
      fadeIn(bHead, t, cB + 0.05, 0.25);
      cells.forEach((c, i) => {
        op(c.g, P(t, mid('ten', 0.04) + i * 0.06, 0.2, linear));
        op(c.p10, 1);
        op(c.full, i === 0 ? P(t, mid('ten', 0.2), 0.3, linear) : 0);
        const hf = i === 1 ? P(t, mid('fiver', 0.42), 0.3, linear) : 0;
        op(c.money, P(t, mid('ten', 0.78) + i * 0.03, 0.25, linear) * (1 - hf));
        op(c.five, hf);
        op(c.half, i === 1 ? P(t, mid('fiver', 0.42), 0.3, linear) : 0);
        op(c.halfLine, i === 1 ? P(t, mid('fiver', 0.42), 0.3, linear) : 0);
        op(c.pay, i >= 1 && payOn ? P(t, mid('pay', 0.25) + (i - 1) * 0.04, 0.25, linear) : 0);
      });
      bBr5.set(fivOn ? P(t, mid('fiver', 0.82), 0.3, linear) : 0);
      bBr15.set(t >= at('fifteen') ? P(t, mid('fifteen', 0.15), 0.3, linear) : 0);
      bBrPay.set(payOn ? P(t, mid('pay', 0.3), 0.3, linear) : 0);
      op(wTen, tenOn ? 1 : 0); op(wFive, fivOn ? 1 : 0); op(wFif, fifOn ? 1 : 0); op(wPay, payOn ? 1 : 0);
      if (tenOn) { wTen.show(0, P(t, mid('ten', 0.3), 0.35, linear)); wTen.show(1, P(t, mid('ten', 0.7), 0.35, linear)); wTen.ring(1, P(t, mid('ten', 0.8), 0.2, linear)); }
      if (fivOn) { wFive.show(0, P(t, mid('fiver', 0.45), 0.35, linear)); wFive.show(1, P(t, mid('fiver', 0.72), 0.35, linear)); wFive.ring(1, P(t, mid('fiver', 0.86), 0.2, linear)); }
      if (fifOn) { wFif.show(0, P(t, mid('fifteen', 0.08), 0.35, linear)); wFif.show(1, P(t, mid('fifteen', 0.45), 0.35, linear)); wFif.show(2, P(t, mid('fifteen', 0.72), 0.35, linear)); wFif.ring(2, P(t, mid('fifteen', 0.82), 0.2, linear)); }
      if (payOn) {
        wPay.show(0, P(t, mid('pay', 0.12), 0.35, linear)); wPay.ring(0, P(t, mid('pay', 0.45), 0.2, linear));
        stampOK.set(t >= mid('pay', 0.62) ? P(t, mid('pay', 0.62), 0.35, linear) : 0); tr(stampOK, BCX, 546, 0.5);
      }
    }

    /* ---------- C: Percy's bonus card ---------- */
    if (sC) {
      show.percy = 1;
      const pp = P(t, cC, 0.4, pop);
      tr(percy, 990, 400, Math.max(0.01, 0.95 * pp));
      percy.set({ t, talk: scTalk(S, t, 'percy'), mood: t > mid('swap', 0.9) ? 'smug' : 'happy', look: -0.6, mic: who === 'percy' ? 0.6 : 0 });
      show.kav = 1;
      tr(kav, LEAN[0], lerp(LEAN[1] + 220, LEAN[1], P(t, cC + 0.3, 0.35, pop)), LEAN[2], LEAN[3]);
      kav.set({ t, talk: 0, mood: t > mid('swap', 0.9) ? 'happy' : 'neutral', look: 0.7 });
      fadeIn(cHead, t, cC + 0.1, 0.25);
      fadeIn(cRule, t, mid('swap', 0.08));
      const rowP = P(t, mid('swap', 0.42), 0.3, linear);
      [0, 1, 2, 3].forEach(i => op(pcsG[i], rowP));
      const sw = P(t, mid('swap', 0.58), 0.8, ease);
      op(swapArcs, t >= mid('swap', 0.56) ? P(t, mid('swap', 0.56), 0.2, linear) : 0);
      op(swapLab, t >= mid('swap', 0.6) ? P(t, mid('swap', 0.6), 0.2, linear) : 0);
      [4, 6, 7].forEach(i => op(pcsG[i], P(t, mid('swap', 0.6), 0.3, linear)));
      // the flying numbers
      op(f4, t >= mid('swap', 0.58) ? 1 : 0); op(f25, t >= mid('swap', 0.58) ? 1 : 0);
      tr(f4, lerp(pcsX[0], pcsX[8], sw), ROWY - Math.sin(sw * Math.PI) * 120);
      tr(f25, lerp(pcsX[3], pcsX[5], sw), ROWY + Math.sin(sw * Math.PI) * 60);
      [9, 10].forEach(i => op(pcsG[i], P(t, mid('swap', 0.86), 0.3, linear)));
    }

    /* ---------- A2, A3: the shop, Dad by the blender ---------- */
    if (sA2 || sA3) {
      show.dad = show.mum = show.kav = show.boy = show.tenner = 1;
      tr(mum, XA2.mum, 446, 0.82); tr(kav, XA2.kav, 448, 0.82); tr(boy, XA2.boy, 432, 0.82); tr(dad, XA2.dad, 446, 0.82);
      tr(blender, 772, 524, 0.82);
      tag260.set(sA2 ? Math.sin((t - cA2) * 6) * 10 * Math.exp(-(t - cA2) * 1.4) * AMP : 0);
      if (sA2) {
        const lift = t > mid('blender', 0.6) ? 1 : 0;
        dad.set({ t, talk: scTalk(S, t, 'dad'), mood: 'smug', look: 0.6, lift });
        mum.set({ t, talk: 0, mood: t > mid('blender', 0.65) ? 'annoyed' : 'neutral', look: 0.9 });
        kav.set({ t, talk: 0, mood: t > mid('blender', 0.65) ? 'deadpan' : 'neutral', look: 0.9 });
        boy.set({ t, talk: 0, mood: 'happy', look: 0.9 });
        popAt(ch.calc, t, mid('blender', 0.66), 540, 262);
        tr(tenner, 930, TEN_Y(0.58), 0.58);
        tenner.set({ t, talk: 0, mood: 'happy', look: -0.9, arms: 0.4 });
      } else {
        // push-ups: ten, five, one
        const pu = t > mid('gym', 0.2) ? 0.5 - 0.5 * Math.cos((t - mid('gym', 0.2)) * TAU * 1.1) : 0, sq = 0.16 * pu * (S.reduce ? 0.5 : 1);
        const ts = 0.58, sy = ts * (1 - sq);
        tr(tenner, 908, TEN_Y(sy), `${ts.toFixed(4)} ${sy.toFixed(4)}`);
        tenner.set({ t, talk: scTalk(S, t, 'tenner'), mood: 'happy', look: -0.4, arms: 0.3 + 0.7 * pu, fiver: 1, uno: P(t, at('gym') + 0.05, 0.4, linear), still: pu > 0 });
        popAt(ch.one, t, mid('gym', 0.12), 400, 200);
        popAt(ch.gym, t, mid('gym', 0.5), 400, 272);
        dad.set({ t, talk: 0, mood: 'deadpan', look: 0.9 });
        mum.set({ t, talk: 0, mood: 'deadpan', look: 0.9 });
        kav.set({ t, talk: 0, mood: 'deadpan', look: 0.9 });
        boy.set({ t, talk: 0, mood: 'happy', look: 0.9, lift: t > end('gym') ? 1 : 0 });
      }
    }

    /* ---------- D: the calculator card ---------- */
    if (sD) {
      show.percy = 1;
      tr(percy, 150, 360, 0.85);
      const est = t >= at('est') - 0.05;
      percy.set({ t, talk: scTalk(S, t, 'percy'), mood: who === 'percy' ? (est && t > mid('est', 0.8) ? 'smug' : 'happy') : 'neutral', look: who === 'percy' ? 0.7 : -0.4, mic: who === 'percy' ? 0.5 : 0 });
      // the leaning human: Dad (cents), then Kavya (dp, est)
      if (t >= at('cents') - 0.1 && t < at('dp') - 0.1) {
        show.dad = 1;
        tr(dad, LEAN[0], lerp(LEAN[1] + 220, LEAN[1], P(t, at('cents') - 0.1, 0.35, pop)), LEAN[2], LEAN[3]);
        dad.set({ t, talk: scTalk(S, t, 'dad'), mood: t > mid('cents', 0.5) ? 'sad' : 'neutral', look: 0.7, lift: 1 });
        bubble.set(P(t, mid('cents', 0.35), 0.4, linear)); tr(bubble, 400, 520);
      } else if (t >= at('dp') - 0.1) {
        show.kav = 1;
        tr(kav, LEAN[0], lerp(LEAN[1] + 220, LEAN[1], P(t, at('dp') - 0.1, 0.35, pop)), LEAN[2], LEAN[3]);
        kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: est ? (t > mid('est', 0.85) ? 'happy' : 'neutral') : t > mid('dp', 0.5) ? 'smug' : 'annoyed', look: 0.7 });
      }
      // the card
      op(dHead, est ? 0 : P(t, cD + 0.05, 0.25, linear));
      op(wOf, est ? 0 : 1);
      if (!est) { wOf.show(0, P(t, mid('of', 0.35), 0.35, linear)); wOf.show(1, P(t, mid('of', 0.6), 0.35, linear)); wOf.ring(1, P(t, mid('of', 0.85), 0.2, linear) * (t < at('dp') ? 1 : 0)); }
      op(calc, est ? 1 - P(t, at('est') - 0.05, 0.2, linear) : P(t, mid('of', 0.55), 0.3, linear));
      calc.set(t < mid('of', 0.82) ? '0.37×260' : t < at('dp') + 0.3 ? '96.2' : '96.20');
      calc.press('=', t > mid('of', 0.78) && t < mid('of', 0.86) ? 1 : 0);
      // dp: $96.20, the 0 pops in gold
      const dpOn = t >= at('dp');
      op(d96, dpOn ? 1 : 0);
      if (dpOn) {
        tr(d96, est ? 650 : 640, est ? 488 : 480);
        op(d96a, P(t, mid('dp', 0.08), 0.3, linear));
        const zp = P(t, mid('dp', 0.3), 0.45, pop);
        op(d96b, clamp(zp * 3)); tr(d96b, -d96w / 2 + d96a.w, -40 * (1 - clamp(zp)));
        op(d96ring, est ? 0 : P(t, mid('dp', 0.4), 0.2, linear));
        cDp.set(est ? 0 : P(t, mid('dp', 0.6), 0.4, linear)); tr(cDp, 640, 548);
      } else cDp.set(0);
      // est: 37% is about a third
      op(eq37, est ? P(t, mid('est', 0.05), 0.3, linear) : 0);
      op(thirds, est ? P(t, mid('est', 0.3), 0.3, linear) : 0);
      thirdCells.forEach((c, i) => op(c.g, est ? P(t, mid('est', 0.3) + i * 0.12, 0.25, linear) : 0));
      thBr.set(est ? P(t, mid('est', 0.55), 0.3, linear) : 0);
      op(estTick, est ? P(t, mid('est', 0.85), 0.25, linear) : 0); tr(estTick, 650 + d96w / 2 + 40, 470);
      op(estTxt, est ? P(t, mid('est', 0.88), 0.25, linear) : 0); tr(estTxt, 650 + d96w / 2 + 70, 482);
    }

    op(dad, show.dad); op(mum, show.mum); op(kav, show.kav); op(boy, show.boy); op(tenner, show.tenner); op(percy, show.percy);
  };
});
