/* Scene 5: Wavy does the shopping (estimation).
   Shots (hard sitcom cuts):
   K  one      the Blue House tent as a drinks kiosk: Mum and Kavya behind the table, the cooler, Mum's purse;
               "1 p.m.", the notes fan out: budget $32.
      list     Mum's shopping list: 6 × $3.85 isotonic, 4 × $1.79 oranges, "is $32 enough?".
   W  wavy     Wavy's confessional: he rides in on a wave (lower third); a giant ≈; "approximately equal to", "not =".
   B  round    the whiteboard (Mum and Kavya low left, Wavy floating above them): round to 1 s.f.: $3.85 ≈ $4,
               $1.79 ≈ $2; "6 and 4 are exact".
      sum      Kavya: 6 × 4 + 4 × 2 = 24 + 8 = 32.
      over     both prices rounded UP: an overestimate, the real total < $32.
      enough   the till receipt prints: 6 × 3.85 = 23.10, 4 × 1.79 = 7.16, TOTAL $30.26 < $32; Mum smug; POINT TAKEN.
   C  calc     Dad's big calculator: he types 61.5 × 3.8 (!) and gets 233.7; "Official calculation!", "$233.70".
      ten      Wavy: 0.38 ≈ 0.4, 61.5 ≈ 60: 0.4 × 60 = 24, so 233.7 is about 10 × too big.
      dot      Dot drops onto the display, then hops one place left: 23.37; "you typed 3.8"; MISSING THE POINT.
      stats    Priya: (48.7 × 3.1)/0.52 = 29.03 on the calculator.
      three    Wavy: (50 × 3)/0.5 = 150/0.5 = 300; ÷ 0.5 is × 2; 29.03 is about 10 × too small.
      typed    Priya: "typed 5.2"; Dot hops one place right: 290.3, the true value to 1 d.p.
   B  table    Wavy: ÷ 0.5 = × 2, ÷ 0.2 = × 5, ÷ 0.1 = × 10.
      homework Ah Boy pops up with his homework.
      no       Wavy: "Approximately... no." Hold. */
scene('drinks', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const popSet = (el, t, t0, t1, x, y) => { const p = t >= t0 && t < t1 ? P(t, t0, 0.35, linear) : 0; el.set(p); if (x !== undefined) tr(el, x, y); };
  const fin = (t, t0, d) => P(t, t0, d || 0.3, linear);
  const place = (c, layer) => { if (c.parentNode !== layer) layer.appendChild(c); };
  const GOLD = '#FFE45C', RED = '#D32F2F', GREEN = '#1E9E5A', BLUE = '#1E5FC0', TEAL = '#1E8C84', INK = MK.ink, GREY = '#5A6670';

  /* layers: set, characters behind the table, the table, props on it, boards, front characters, pop-ups, HUD */
  const Lset = G(root), Lmid = G(root), Lfront = G(root), Ltop = G(root), Lboard = G(root), Lcast = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= K: the drinks kiosk (the Blue House tent) ================= */
  const tent = drTent(Lset);
  Lfront.appendChild(tent.front);
  const kTop = G(Ltop);
  // the cooler box
  const cooler = G(kTop); tr(cooler, 118, 530);
  E('rect', { x: -78, y: -92, width: 156, height: 92, rx: 10, fill: '#F4F7FA', stroke: SC_INK, 'stroke-width': 4 }, cooler);
  E('rect', { x: -84, y: -108, width: 168, height: 24, rx: 8, fill: '#E8424F', stroke: SC_INK, 'stroke-width': 4 }, cooler);
  T(cooler, 0, -38, 'DRINKS', { size: 28, weight: 800, anchor: 'middle', fill: DR_BLUE });
  // Mum's purse
  const purse = G(kTop); tr(purse, 640, 528);
  E('path', { d: 'M-50,0 L-44,-56 Q0,-66 44,-56 L50,0 Z', fill: '#B8336A', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, purse);
  E('path', { d: 'M-26,-60 Q0,-92 26,-60', fill: 'none', stroke: '#E0B84A', 'stroke-width': 6 }, purse);
  E('circle', { cx: 0, cy: -44, r: 7, fill: '#E0B84A', stroke: SC_INK, 'stroke-width': 2 }, purse);
  // the budget: three $10 notes and a $2 note
  const notes = G(Ltop);
  const noteEls = ['$10', '$10', '$10', '$2'].map((v, i) => { const g = G(notes); mkNote(g, v); return g; });
  const c1pm = mkChip(Lfg, '**1 p.m.**', { size: 32, col: GOLD });
  const cBudget = mkChip(Lfg, 'budget: **$32**', { size: 34, col: GOLD });
  // the shopping list
  const shop = G(Lboard);
  E('rect', { x: -205, y: -175, width: 410, height: 350, rx: 10, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, shop);
  E('line', { x1: -165, y1: -175, x2: -165, y2: 175, stroke: '#F2A0A0', 'stroke-width': 3 }, shop);
  T(shop, 20, -122, 'SHOPPING LIST', { size: 32, weight: 800, anchor: 'middle', fill: DR_BLUE, ls: 2 });
  const sRow1 = G(shop), sRow2 = G(shop);
  mkText(sRow1, -145, -70, '6 packs of isotonic', { size: 28, fill: GREY });
  mkMath(sRow1, -145, -18, '6 × $3.85', { size: 46, fill: INK });
  mkText(sRow2, -145, 34, '4 bags of oranges', { size: 28, fill: GREY });
  mkMath(sRow2, -145, 86, '4 × $1.79', { size: 46, fill: INK });
  const sQ = mkText(shop, 20, 148, 'is **$32** enough?', { size: 32, anchor: 'middle', fill: RED });

  /* ================= W: Wavy's confessional ================= */
  const conf = drConf(Lset, 'wavy');
  const surf = G(Lfg);
  E('path', { d: 'M-240,40 Q-160,-20 -60,30 Q40,80 150,10 Q210,-30 250,20 L250,170 L-240,170 Z', fill: '#2BB3A8', stroke: SC_INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, surf);
  E('path', { d: 'M-200,46 q20,-16 40,0 q20,16 40,0 M40,40 q20,-16 40,0 q20,16 40,0', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 6, 'stroke-linecap': 'round' }, surf);
  const bigApprox = G(Lfg);
  E('circle', { r: 150, fill: glow('#46D3C6'), opacity: 0.45 }, bigApprox);
  mkMath(bigApprox, 0, 80, '≈', { size: 300, fill: '#46D3C6', anchor: 'middle' });
  const cApprox = mkChip(Lfg, '**approximately** equal to', { size: 34, col: '#8FF0E4' });
  const cNotEq = mkChip(Lfg, 'not {{=}}', { size: 34, col: '#FF8A8A' });
  const ltWavy = drLowerThird(Lhud, 'wavy');

  /* ================= B: the whiteboard ================= */
  const wb = mkWhiteboard(Lboard, 720, 460); tr(wb, 800, 410);
  const bAll = G(Lboard);
  // round
  const bR = G(bAll);
  mkText(bR, 800, 250, 'round every price to **1 significant figure**', { size: 32, anchor: 'middle', fill: INK, boldFill: TEAL });
  const rL1 = mkMath(bR, 800, 350, '$3.85 ≈ $4', { size: 62, fill: INK, anchor: 'middle' });
  const rL2 = mkMath(bR, 800, 450, '$1.79 ≈ $2', { size: 62, fill: INK, anchor: 'middle' });
  const rExact = mkChip(bR, '{{6}} and {{4}} are exact', { size: 30, col: BLUE, fill: '#E6F0FF' });
  tr(rExact, 800, 540);
  // sum, over
  const bS = G(bAll);
  const sm1 = mkMath(bS, 620, 252, '$3.85 ≈ $4', { size: 40, fill: GREY, anchor: 'middle' });
  const sm2 = mkMath(bS, 930, 252, '$1.79 ≈ $2', { size: 40, fill: GREY, anchor: 'middle' });
  const ups = [sm1, sm2].map(m => { const g = G(bS); mkText(g, m.x0 + m.w + 14, 252, '↑ **up**', { size: 30, fill: RED, boldFill: RED }); return g; });
  const sWork = mkWorking(bS, 880, 312, ['6 × 4 + 4 × 2 = 24 + 8', '= 32'], { size: 54, fill: INK });
  const sAbout = mkChip(bS, 'about **$32**', { size: 30, col: GREEN, fill: '#E8F7EE' });
  tr(sAbout, 1060, sWork.lineY[1] - 18);
  const sOver = mkText(bS, 800, 560, '**overestimate**: the real total is **less** than $32', { size: 30, anchor: 'middle', fill: INK, boldFill: RED });
  // enough: the receipt
  const bE = G(bAll);
  const rcpt = mkReceipt(bE, { title: 'STADIUM KIOSK', items: [['{{6 × 3.85}}', '23.10'], ['{{4 × 1.79}}', '7.16']], total: ['TOTAL', '$30.26'], w: 380, size: 28 });
  tr(rcpt, 940, 206);
  const eEst = mkText(bE, 600, 290, 'estimate', { size: 32, anchor: 'middle', fill: GREY });
  const eEst2 = mkMath(bE, 600, 360, '≈ $32', { size: 58, fill: TEAL, anchor: 'middle', weight: 700 });
  const eCmp = mkMath(bE, 600, 470, '$30.26 < $32', { size: 44, fill: GREEN, anchor: 'middle', weight: 700 });
  const eTick = tick(bE, 18); tr(eTick, 600, 530);
  const stampOk = drStamp(Lfg, true);
  // table: dividing by a small decimal
  const bT = G(bAll);
  mkText(bT, 800, 250, 'dividing by a small decimal', { size: 34, anchor: 'middle', fill: INK });
  const tab = mkTable(bT, [['{{÷ 0.5}}', 'is', '{{× 2}}'], ['{{÷ 0.2}}', 'is', '{{× 5}}'], ['{{÷ 0.1}}', 'is', '{{× 10}}']], { size: 46, colW: [200, 90, 200], rowH: 92, ink: INK, head: false, fill: '#FFFFFF' });
  tr(tab, 800 - 245, 296);
  // homework, no
  const bH = G(bAll);
  const hw = G(bH); tr(hw, 680, 400, 0.85, -3);
  E('rect', { x: -170, y: -190, width: 340, height: 380, rx: 6, fill: '#FFFFFF', stroke: '#8FA3B8', 'stroke-width': 4 }, hw);
  T(hw, 0, -138, 'HOMEWORK', { size: 34, weight: 800, anchor: 'middle', fill: DR_BLUE, ls: 3 });
  ['Q1', 'Q2', 'Q3', 'Q4'].forEach((q, i) => { T(hw, -140, -70 + i * 66, q, { size: 26, weight: 700, fill: GREY }); E('line', { x1: -90, y1: -70 + i * 66, x2: 140, y2: -70 + i * 66, stroke: '#C9D3DC', 'stroke-width': 3 }, hw); });
  const hNo = mkChip(Lfg, 'Approximately... **no**.', { size: 40, col: RED, fill: '#FFFFFF', textCol: RED });
  const bubHw = mkSpeechBubble(Lfg, 'estimate my **homework**?', { size: 28, tail: 'down', tailX: 70, boldFill: DR_BLUE });

  /* ================= C: Dad's calculator ================= */
  const cShot = G(Lset);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#1C3F66', '#0D2238', true) }, cShot);
  E('ellipse', { cx: 600, cy: 360, rx: 360, ry: 300, fill: glow('#4C8DF0'), opacity: 0.35 }, cShot);
  const CX = 600, CY = 340, CS = 1.12;
  const calcG = G(Lboard); tr(calcG, CX, CY, CS);
  const calc = mkCalculator(calcG); calc.set('');
  const typeT = T(calcG, 98, -124, '', { size: 34, anchor: 'end', fill: '#1E2A1E', weight: 700 });
  const DW = 27, PG = 34;
  const dCells = [0, 1, 2, 3].map(() => T(calcG, 0, -122, '', { size: 44, anchor: 'middle', fill: '#1E2A1E', weight: 700 }));
  const dPt = E('circle', { cx: 0, cy: -128, r: 4.5, fill: '#1E2A1E' }, calcG);
  // write 4 digits with the point after k of them; returns the point's centre in stage coordinates
  const showNum = (digits, k, lit) => {
    const total = digits.length * DW + PG; let x = 100 - total, ptx = 0;
    digits.split('').forEach((d, i) => { if (i === k) { ptx = x + PG / 2; x += PG; } setText(dCells[i], d); attr(dCells[i], 'x', (x + DW / 2).toFixed(1)); x += DW; });
    attr(dPt, 'cx', ptx.toFixed(1)); op(dPt, lit ? 1 : 0);
    return [CX + CS * ptx, CY + CS * -142];
  };
  const hideNum = () => { dCells.forEach(c => setText(c, '')); op(dPt, 0); };
  const cCard = G(Lboard);
  E('rect', { x: 772, y: 116, width: 396, height: 392, rx: 14, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, cCard);
  const CXc = 970;
  // calc
  const kCalc = G(cCard);
  mkText(kCalc, CXc, 172, '**61.5** litres at **$0.38**', { size: 30, anchor: 'middle', fill: INK });
  mkMath(kCalc, CXc, 250, '61.5 × 0.38', { size: 52, fill: INK, anchor: 'middle' });
  const kTyped = mkText(kCalc, CXc, 336, 'Dad typed: {{61.5 × 3.8}}', { size: 30, anchor: 'middle', fill: GREY });
  const cOff = mkChip(Lfg, '**Official** calculation!', { size: 30, col: GOLD });
  const cAns = mkChip(Lfg, '{{$233.70}}', { size: 40, col: '#FF8A8A' });
  const stampBad = drStamp(Lfg, false);
  // ten
  const kTen = G(cCard);
  mkText(kTen, CXc, 168, '**Estimate**', { size: 32, anchor: 'middle', fill: TEAL });
  const tR = mkMath(kTen, CXc, 228, '0.38 ≈ 0.4   61.5 ≈ 60', { size: 32, fill: GREY, anchor: 'middle' });
  const tE = mkMath(kTen, CXc, 306, '0.4 × 60 = 24', { size: 52, fill: TEAL, anchor: 'middle', weight: 700 });
  const tC = mkMath(kTen, CXc, 392, '233.7 vs 24', { size: 44, fill: INK, anchor: 'middle' });
  const tBig = mkText(kTen, CXc, 462, 'about **10 ×** too big', { size: 34, anchor: 'middle', fill: RED });
  // dot
  const kDot = G(cCard);
  mkText(kDot, CXc, 172, 'you typed **3.8**', { size: 34, anchor: 'middle', fill: INK, boldFill: RED });
  const dWrong = mkMath(kDot, CXc, 262, '61.5 × 3.8 = 233.7', { size: 40, fill: RED, anchor: 'middle' });
  const dStrike = mkDash(E('line', { x1: CXc - dWrong.w / 2 - 8, y1: 254, x2: CXc + dWrong.w / 2 + 8, y2: 236, stroke: RED, 'stroke-width': 6, 'stroke-linecap': 'round' }, kDot));
  const dRight = mkMath(kDot, CXc, 350, '61.5 × 0.38 = 23.37', { size: 40, fill: GREEN, anchor: 'middle', weight: 700 });
  const dMoney = mkChip(kDot, '{{$23.37}}', { size: 40, col: GREEN, fill: '#E8F7EE' }); tr(dMoney, CXc, 438);
  // stats
  const kSt = G(cCard);
  mkText(kSt, CXc, 172, '**Relay stats**', { size: 32, anchor: 'middle', fill: BLUE });
  const stM = mkMath(kSt, CXc, 296, '(48.7 × 3.1)/0.52 = 29.03', { size: 42, fill: INK, anchor: 'middle' });
  const cDone = mkChip(Lfg, '**Done.**', { size: 32, col: '#9CC8FF' });
  // three
  const kTh = G(cCard);
  const thW = mkWorking(kTh, 920, 150, ['(50 × 3)/0.5 = 150/0.5', '= 300'], { size: 40, fill: TEAL });
  const thTip = mkChip(kTh, '{{÷ 0.5}} is {{× 2}}', { size: 30, col: TEAL, fill: '#E6FAF7' }); tr(thTip, CXc, 380);
  const thSmall = mkText(kTh, CXc, 462, '{{29.03}}: **10 ×** too small', { size: 32, anchor: 'middle', fill: RED });
  // typed
  const kTy = G(cCard);
  mkText(kTy, CXc, 180, 'Priya typed {{5.2}},', { size: 32, anchor: 'middle', fill: INK });
  mkText(kTy, CXc, 228, 'not {{0.52}}', { size: 32, anchor: 'middle', fill: INK });
  const tyTrue = mkMath(kTy, CXc, 330, '290.3', { size: 72, fill: GREEN, anchor: 'middle', weight: 700 });
  mkText(kTy, CXc, 396, 'the true value (1 d.p.)', { size: 28, anchor: 'middle', fill: GREEN });
  const cTyped = mkChip(Lfg, 'typed **5.2**. Tell no one.', { size: 28, col: '#FF8A8A' });

  /* ================= the cast ================= */
  const mum = cast(Lmid, 'mum', { prop: 'paper' });
  const kav = cast(Lmid, 'kavya');
  const dad = cast(Lcast, 'dad', { watchText: '233.7' });
  if (dad.watch) dad.watch.set('233.7');
  const priya = cast(Lcast, 'priya');
  const boy = cast(Lcast, 'boy', { prop: 'paper' });
  const wavy = cast(Lcast, 'wavy');
  const dot = cast(Lcast, 'dot');
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* positions */
  const TY = 452, TS = 0.9, BY = 665, BS = 0.78, WB = [250, 300, 0.7];
  /* cuts */
  const k = id => at(id) - 0.06;
  const segs = [['K', -1], ['W', k('wavy')], ['B', k('round')], ['C', k('calc')], ['B', k('table')]];
  const shotAt = t => { let s = 'K'; for (const [n, t0] of segs) if (t >= t0) s = n; return s; };
  const keys = ['6', '1', '.', '5', '×', '3', '.', '8', '='];
  const typed = ['6', '61', '61.', '61.5', '61.5×', '61.5×3', '61.5×3.', '61.5×3.8'];

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const sh = shotAt(t), sK = sh === 'K' ? 1 : 0, sW = sh === 'W' ? 1 : 0, sB = sh === 'B' ? 1 : 0, sC = sh === 'C' ? 1 : 0;
    op(tent, sK || sB ? 1 : 0); op(Lfront, sK); op(kTop, sK); op(notes, sK); op(shop, 0);
    conf.set(sW, t); op(cShot, sC);
    op(wb, sB); op(bAll, sB); op(calcG, sC); op(cCard, sC);
    [c1pm, cBudget, cApprox, cNotEq, stampOk, cOff, cAns, stampBad, cDone, cTyped, hNo, bubHw].forEach(c => c.set(0));
    op(surf, 0); op(bigApprox, 0); ltWavy.set(0);
    const show = { mum: 0, kav: 0, dad: 0, priya: 0, boy: 0, wavy: 0, dot: 0 };
    let wv = { mood: 'smug', look: 0, wob: 1 };
    if (sK || sB) tent.upd(t);

    /* ---------- K: the kiosk ---------- */
    if (sK) {
      show.mum = show.kav = 1;
      place(mum, Lmid); place(kav, Lmid);
      tr(mum, 270, TY, TS); tr(kav, 435, TY, TS);
      popSet(c1pm, t, at('one') + 0.1, at('list') - 0.1, 470, 200);
      const isList = t >= k('list');
      // the budget notes fan out of the purse
      const np = isList ? 1 : P(t, mid('one', 0.6), 0.5, ease);
      noteEls.forEach((n, i) => { tr(n, lerp(640, 588 + i * 30, np), lerp(500, 414 - i * 4, np), Math.max(0.01, 0.36 * np), lerp(0, -18 + i * 12, np)); });
      op(notes, np > 0.02 ? 1 : 0);
      popSet(cBudget, t, mid('one', 0.75), 1e9, 620, 320);
      if (isList) {
        const sp = P(t, at('list'), 0.4, pop);
        op(shop, clamp(sp * 3)); tr(shop, 935, 320, Math.max(0.01, 0.8 + 0.2 * sp));
        op(sRow1, fin(t, mid('list', 0.08))); op(sRow2, fin(t, mid('list', 0.45)));
        op(sQ, fin(t, mid('list', 0.75)));
      }
      mum.set({ t, talk: scTalk(S, t, 'mum'), mood: isList ? 'smug' : 'neutral', look: isList ? 0.7 : 0.3, lift: isList ? 1 : 0 });
      kav.set({ t, talk: 0, mood: isList && t > mid('list', 0.75) ? 'deadpan' : 'neutral', look: isList ? 0.8 : -0.6 });
    }

    /* ---------- W: Wavy's confessional ---------- */
    if (sW) {
      show.wavy = 1;
      const ride = P(t, at('wavy') - 0.06, 0.7, easeOut);
      const x = lerp(1350, 330, ride);
      tr(wavy, x, 410 + Math.sin(ride * Math.PI * 2) * 20, 1.3);
      wv = { mood: t > mid('wavy', 0.7) ? 'deadpan' : 'smug', look: t > mid('wavy', 0.3) ? 0.6 : 0, wob: 1.6 };
      op(surf, 1 - fin(t, at('wavy') + 0.55, 0.25)); tr(surf, x, 600);
      ltWavy.set(win(t, at('wavy') + 0.8, at('wavy') + 3.9, 0.3));
      const ap = P(t, mid('wavy', 0.3), 0.45, pop);
      op(bigApprox, clamp(ap * 3)); tr(bigApprox, 860, 280, Math.max(0.01, 0.6 + 0.4 * ap));
      popSet(cApprox, t, mid('wavy', 0.35), 1e9, 860, 480);
      popSet(cNotEq, t, mid('wavy', 0.55), 1e9, 860, 560);
    }

    /* ---------- B: the whiteboard ---------- */
    if (sB) {
      [bR, bS, bE, bT, bH].forEach(g => op(g, 0));
      show.mum = show.kav = show.wavy = 1;
      place(mum, Lcast); place(kav, Lcast);
      tr(mum, 105, BY, BS); tr(kav, 315, BY, BS);
      tr(wavy, WB[0], WB[1] + Math.sin(t * 1.6) * 6 * AMP, WB[2]);
      let mm = 'neutral', ml = 0.8, km = 'neutral', kl = 0.8;
      wv = { mood: 'smug', look: 0.8, wob: 1 };
      if (t < k('sum')) {                                  // round
        op(bR, 1);
        op(rL1, fin(t, mid('round', 0.3))); op(rL2, fin(t, mid('round', 0.62)));
        op(rExact, fin(t, mid('round', 0.85)));
        mm = 'neutral'; ml = -0.5; km = 'neutral'; kl = -0.6;
      } else if (t < k('enough')) {                        // sum, over
        op(bS, 1);
        const isOver = t >= k('over');
        sWork.show(0, P(t, mid('sum', 0.1), 0.35, linear)); sWork.show(1, P(t, mid('sum', 0.7), 0.35, linear));
        sWork.ring(1, isOver ? 1 : fin(t, mid('sum', 0.85)));
        sAbout.set(isOver ? 1 : P(t, mid('sum', 0.88), 0.35, linear));
        ups.forEach((u, i) => op(u, isOver ? fin(t, mid('over', 0.12 + i * 0.12)) : 0));
        op(sOver, isOver ? fin(t, mid('over', 0.45)) : 0);
        km = isOver ? 'neutral' : 'happy'; kl = isOver ? -0.6 : 0.8; mm = isOver ? 'happy' : 'neutral'; ml = isOver ? -0.6 : 0.8;
        if (isOver) wv.look = 0.7;
      } else if (t < k('calc')) {                          // enough
        op(bE, 1);
        rcpt.set(1 + 3 * P(t, at('enough') + 0.1, mid('enough', 0.55) - at('enough'), linear));
        op(eEst, 1); op(eEst2, 1);
        op(eCmp, fin(t, mid('enough', 0.55))); op(eTick, fin(t, mid('enough', 0.62)));
        stampOk.set(P(t, mid('enough', 0.7), 0.3, linear)); tr(stampOk, 800, 590, 0.45);
        mm = 'smug'; ml = 0.6; km = 'happy'; kl = -0.6;
        wv = { mood: 'happy', look: -0.6, wob: 1.4 };
      } else if (t < k('homework')) {                      // table
        op(bT, 1);
        tab.cells.forEach((row, r) => row.forEach(c => op(c, fin(t, mid('table', [0.05, 0.32, 0.58][r])))));
        mm = 'neutral'; ml = -0.6; km = 'neutral'; kl = -0.6;
      } else {                                             // homework, no
        op(bH, 1);
        show.boy = 1;
        const up = P(t, at('homework') - 0.25, 0.35, pop);
        tr(boy, 1065, lerp(830, 660, up), 0.95);
        const isNo = t >= k('no');
        boy.set({ t, talk: scTalk(S, t, 'boy'), mood: isNo && t > mid('no', 0.6) ? 'sad' : 'happy', look: -0.8, lift: 1, still: t > end('no') + 0.8 });
        popSet(bubHw, t, at('homework') + 0.15, at('no') - 0.1, 990, 440);
        popSet(hNo, t, mid('no', 0.35), 1e9, 760, 400);
        mm = isNo ? 'deadpan' : 'neutral'; ml = 0.9; km = isNo ? 'deadpan' : 'happy'; kl = 0.9;
        wv = { mood: 'smug', look: isNo ? 0 : 0.9, wob: 1 };
      }
      mum.set({ t, talk: scTalk(S, t, 'mum'), mood: mm, look: ml, lift: 0, still: t > end('no') + 0.8 });
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl, still: t > end('no') + 0.8 });
    }

    /* ---------- C: the calculator ---------- */
    if (sC) {
      [kCalc, kTen, kDot, kSt, kTh, kTy].forEach(g => op(g, 0));
      show.dad = show.wavy = 1;
      tr(dad, 150, 668, 0.82);
      tr(wavy, 235, 225, 0.62);
      setText(typeT, ''); hideNum(); calc.press('', 0);
      let dm = 'neutral', dl = 0.6, dlift = 0, pm = 'neutral', pl = -0.6, plift = 0;
      wv = { mood: 'smug', look: 0.5, wob: 1 };
      const priyaIn = t >= k('stats');
      if (t < k('ten')) {                                  // calc
        op(kCalc, 1);
        const k0 = mid('calc', 0.12), k1 = mid('calc', 0.62), kd = (k1 - k0) / keys.length;
        const n = Math.floor((t - k0) / kd);
        if (t >= k0 && n < keys.length) calc.press(keys[n], 1);
        if (t >= k0 && n < keys.length - 1) setText(typeT, typed[Math.min(n, typed.length - 1)]);
        if (n >= keys.length - 1) showNum('2337', 3, true);
        op(kTyped, fin(t, mid('calc', 0.4)));
        popSet(cOff, t, at('calc') + 0.1, 1e9, 250, 420);
        popSet(cAns, t, mid('calc', 0.7), 1e9, 250, 500);
        dm = 'smug'; dl = 0.6; dlift = 1;
        wv = { mood: 'deadpan', look: 0, wob: 0.6 };
      } else if (t < k('dot')) {                           // ten
        op(kTen, 1);
        showNum('2337', 3, true);
        op(tR, fin(t, mid('ten', 0.05))); op(tE, fin(t, mid('ten', 0.25)));
        op(tC, fin(t, mid('ten', 0.55))); op(tBig, fin(t, mid('ten', 0.72)));
        cAns.set(1); tr(cAns, 250, 500);
        dm = t > mid('ten', 0.72) ? 'shock' : 'smug'; dl = -0.7; dlift = 1;
        wv = { mood: 'smug', look: 0.8, wob: 1 };
      } else if (!priyaIn) {                               // dot
        op(kDot, 1);
        const land = mid('dot', 0.12), hop = mid('dot', 0.55);
        const hp = P(t, hop, 0.45, ease);
        const pA = showNum(hp < 0.5 ? '2337' : '2337', 3, false);
        const pB = (() => { const total = 4 * DW + PG; const ptx = 100 - total + 2 * DW + PG / 2; return [CX + CS * ptx, CY + CS * -142]; })();
        if (hp >= 0.5) showNum('2337', 2, false);
        show.dot = 1;
        const dp = P(t, at('dot') - 0.1, land - at('dot') + 0.1, easeIn);
        let x = pA[0], y = lerp(-60, pA[1], dp), s = 0.2;
        if (hp > 0) { x = lerp(pA[0], pB[0], hp); y = pA[1] - Math.sin(hp * Math.PI) * 50; }
        tr(dot, x, y, s);
        dot.set({ t, talk: scTalk(S, t, 'dot'), mood: hp > 0.9 ? 'annoyed' : 'shock', look: -0.6, arms: hp > 0 && hp < 1 ? 1 : 0, point: hp === 0 && t > land ? -1 : 0 });
        op(dStrike, 1); mkDraw(dStrike, P(t, mid('dot', 0.4), 0.3, linear));
        op(dWrong, 1); op(dRight, fin(t, mid('dot', 0.62))); dMoney.set(P(t, mid('dot', 0.78), 0.35, linear));
        cAns.set(1); tr(cAns, 250, 500);
        stampBad.set(P(t, mid('dot', 0.25), 0.3, linear)); tr(stampBad, 290, 418, 0.45);
        dm = t > mid('dot', 0.25) ? 'sad' : 'shock'; dl = 0.6;
        wv = { mood: 'smug', look: 0.8, wob: 1 };
      } else {                                             // stats, three, typed
        show.priya = show.dot = 1;
        tr(priya, 1070, 668, 0.82);
        const isThree = t >= k('three'), isTyped = t >= k('typed');
        const hp = isTyped ? P(t, mid('typed', 0.45), 0.45, ease) : 0;
        const pA = showNum('2903', 2, false);
        const pB = (() => { const total = 4 * DW + PG; const ptx = 100 - total + 3 * DW + PG / 2; return [CX + CS * ptx, CY + CS * -142]; })();
        if (hp >= 0.5) showNum('2903', 3, false);
        const shown = t >= mid('stats', 0.55);
        if (!shown) hideNum();
        op(dot, 1);
        const x = lerp(pA[0], pB[0], hp), y = pA[1] - Math.sin(hp * Math.PI) * 50;
        tr(dot, x, y, shown ? 0.2 : 0.01);
        dot.set({ t, talk: 0, mood: isTyped ? (hp > 0.9 ? 'smug' : 'shock') : isThree ? 'annoyed' : 'neutral', look: hp > 0 ? 0.6 : 0, arms: hp > 0 && hp < 1 ? 1 : 0 });
        if (!shown) show.dot = 0;
        if (!isThree) {
          op(kSt, 1); op(stM, fin(t, mid('stats', 0.2)));
          if (t > mid('stats', 0.15) && t < mid('stats', 0.55)) calc.press(['4', '8', '.', '7', '×', '3', '.', '1', '÷', '5', '.', '2', '='][Math.floor((t - mid('stats', 0.15)) / ((mid('stats', 0.55) - mid('stats', 0.15)) / 13))] || '', 1);
          popSet(cDone, t, mid('stats', 0.85), 1e9, 1070, 532);
          pm = 'smug'; pl = -0.6; plift = 1; dm = 'neutral'; dl = 0.8;
          wv = { mood: 'deadpan', look: 0.8, wob: 0.8 };
        } else if (!isTyped) {
          op(kTh, 1);
          thW.show(0, P(t, mid('three', 0.08), 0.3, linear)); thW.show(1, P(t, mid('three', 0.4), 0.3, linear));
          op(thTip, fin(t, mid('three', 0.3)));
          op(thSmall, fin(t, mid('three', 0.72)));
          pm = t > mid('three', 0.72) ? 'shock' : 'smug'; pl = -0.8; dm = 'smug'; dl = 0.8;
          wv = { mood: 'smug', look: 0.8, wob: 1 };
        } else {
          op(kTy, 1); op(tyTrue, fin(t, mid('typed', 0.7)));
          popSet(cTyped, t, mid('typed', 0.15), 1e9, 1010, 532);
          pm = 'sad'; pl = 0.3; dm = 'smug'; dl = 0.8;
          wv = { mood: 'smug', look: 0.8, wob: 1 };
        }
      }
      dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: dl, lift: dlift });
      if (priyaIn) priya.set({ t, talk: scTalk(S, t, 'priya'), mood: pm, look: pl, lift: plift });
    }

    if (show.wavy) wavy.set({ t, talk: scTalk(S, t, 'wavy'), mood: wv.mood, look: wv.look, wob: wv.wob * AMP, still: t > end('no') + 0.8 });
    op(mum, show.mum); op(kav, show.kav); op(dad, show.dad); op(priya, show.priya); op(boy, show.boy); op(wavy, show.wavy); op(dot, show.dot);
  };
});
