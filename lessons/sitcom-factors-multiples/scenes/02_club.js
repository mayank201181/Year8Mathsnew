/* Scene 2: At the door of the Prime Club (odd is not prime, testing for primes, divisibility tests).
   Shots (hard sitcom cuts):
   V1  6 p.m. at the void deck: Paati, Kavya and Priya at the table.
   C   the club door: a queue of numbers 9, 15, 21, 91 -> odd: Priya leans in at the left edge, "all odd numbers are
       prime", the numbers cheer -> nine: 9, 15, 21 step up in turn, Big Two splits each, COMPOSITE -> ninety: 91
       steps up, proud -> test: THE LIST, test the primes 2, 3, 5, 7, 11, stop when prime² > 91 -> seven: Kavya leans
       in; 2, 3, 5 ✗, 11² = 121 > 91 stop, 91 ÷ 7 = 13 ✓, 91 = 7 × 13, COMPOSITE.
   V2  back at the void deck: Mr Tan (lower third) with a present -> gift: the MERLION jigsaw, 7452 pieces -> four:
       last two digits 52 = 4 × 13 ✓ -> wrong: Priya's 7 + 4 + 5 + 2 = 18, 18 is not a multiple of 4 ✗.
   L   the box lid: the divisibility table; digit sum only for 3 and 9 (marked), 2, 4, 8: check the last 1, 2, 3
       digits -> rest: ✓/✗ for 7452 (3 ✓ 9 ✓ 6 ✓ 2 ✓ 4 ✓, 8 ✗ with 452 = 8 × 56 + 4, 5 ✗ 10 ✗).
   V3  the pun: 6, 7, 8, 9 on the table, 7 eats 9, *cricket*, deadpan faces -> veg: VEGETARIAN PARTY, 7 spits 9
       back out, Mr Tan shock, everyone laughs. */
scene('club', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const pill = (parent, text, o) => { o = o || {}; return mkChip(parent, text, { size: o.size || 30, col: o.col || C.ink }); };
  const popSet = (el, t, t0, t1, x, y) => { const p = t >= t0 && t < t1 ? P(t, t0, 0.35, linear) : 0; el.set(p); if (x !== undefined) tr(el, x, y); };
  const fadeIn = (el, t, t0, t1) => { const p = t >= t0 && t < (t1 === undefined ? 1e9 : t1) ? P(t, t0, 0.3, easeOut) : 0; op(el, p); return p; };
  const GOLD = '#FFE45C', PINK = '#FF8FC8', RED = '#FF6B6B', GREEN = '#56D69B', LIL = '#C9B6FF', BLUE = '#6EC8FF', INK = MK.ink;

  /* layers */
  const Lbg = G(root), Lpanel = G(root), Lcast = G(root), Lfront = G(root), Lq = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= the void deck (V1, V2, V3, and dimmed behind the lid) ================= */
  const voidShot = G(Lbg);
  const vd = fmVoid(voidShot);
  Lfront.appendChild(vd.front); Lfront.appendChild(vd.top);
  const present = G(vd.top);
  E('rect', { x: -52, y: -70, width: 104, height: 70, rx: 6, fill: '#4CC9F0', stroke: SC_INK, 'stroke-width': 3 }, present);
  E('path', { d: 'M0,-70 L0,0 M-52,-36 L52,-36', stroke: '#E8424F', 'stroke-width': 8 }, present);
  E('path', { d: 'M0,-70 C-26,-96 -40,-74 0,-70 C40,-74 26,-96 0,-70', fill: '#FF5FA2', stroke: SC_INK, 'stroke-width': 2.5 }, present);
  const dim = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#08121A', opacity: 0.6 }, voidShot);

  // V2 panel
  const PX0 = 610, PX1 = 1170, PY0 = 112, PY1 = 508, PCX = (PX0 + PX1) / 2;
  const panel = G(Lpanel);
  E('rect', { x: PX0 + 6, y: PY0 + 6, width: PX1 - PX0, height: PY1 - PY0, rx: 18, fill: 'rgba(0,0,0,0.25)' }, panel);
  E('rect', { x: PX0, y: PY0, width: PX1 - PX0, height: PY1 - PY0, rx: 18, fill: '#12222E', stroke: '#8FA3B8', 'stroke-width': 4 }, panel);
  // the jigsaw box
  const box = G(Lpanel);
  { const b = G(box);
    E('rect', { x: -210, y: -120, width: 420, height: 240, rx: 12, fill: '#2E7DD8', stroke: '#F4F7FA', 'stroke-width': 5 }, b);
    let pz = '';
    for (let x = -180; x <= 180; x += 60) pz += `M${x},-110 L${x},110 `;
    for (let y = -90; y <= 90; y += 60) pz += `M-200,${y} L200,${y} `;
    E('path', { d: pz, stroke: '#5FA0E8', 'stroke-width': 3, opacity: 0.7 }, b);
    E('path', { d: 'M110,30 q0,-40 30,-50 q34,-6 40,26 q8,20 -6,34 l-10,30 l-54,0 Z', fill: '#F4F7FA', stroke: SC_INK, 'stroke-width': 3, opacity: 0.9 }, b);   // a Merlion-ish silhouette
    E('path', { d: 'M180,8 q30,-20 50,-6', fill: 'none', stroke: '#BFEAFF', 'stroke-width': 6, 'stroke-linecap': 'round' }, b);
    T(b, -60, -50, 'MERLION', { size: 48, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 3 });
    T(b, -60, 30, '7452', { size: 72, weight: 800, anchor: 'middle', fill: GOLD });
    T(b, -60, 80, 'PIECES', { size: 32, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 4 });
    tr(b, 0, 0); box.b = b; }
  const cShare = pill(Lpanel, 'share **equally**?', { col: GOLD, size: 32 });
  // four: 7452 with the last two digits boxed
  const big = G(Lpanel);
  const bigN = mkMath(big, PCX, 0, '7452', { size: 84, fill: C.ink, anchor: 'middle' });
  const w74 = mkMeasure('74', { size: 84 }).w;
  const box52 = E('rect', { x: bigN.x0 + w74 - 6, y: -bigN.a - 8, width: bigN.w - w74 + 12, height: bigN.a + bigN.d + 16, rx: 10, fill: 'none', stroke: GOLD, 'stroke-width': 5 }, big);
  const m52 = G(Lpanel);
  mkMath(m52, PCX - 20, 0, '52 = 4 * 13', { size: 44, fill: C.ink, anchor: 'middle' });
  { const k = tick(m52, 16); tr(k, PCX + 150, -14); }
  const c4t = pill(Lpanel, '**4** tables ✓', { col: GREEN, size: 32 });
  const cLast2 = pill(Lpanel, 'check the **last two** digits', { col: GOLD, size: 28 });
  const mWrong = G(Lpanel);
  mkMath(mWrong, PCX, 0, '7 + 4 + 5 + 2 = 18', { size: 44, fill: RED, anchor: 'middle' });
  const mWrong2 = G(Lpanel);
  mkText(mWrong2, PCX - 16, 0, '{{18}} is not a multiple of {{4}}', { size: 32, fill: RED, anchor: 'middle' });
  { const x = cross(mWrong2, 14); tr(x, PCX + 222, -12); }
  const cQ = pill(Lpanel, "**Priya's** test", { col: PINK, size: 28 });

  /* ================= the club door (C) ================= */
  const clubShot = G(Lbg);
  const club = fmClub(clubShot);
  const QX = [790, 905, 1020, 1135], QY = 690, DOOR = [540, 690];
  const NUMS = [['9', '#FF8A3D'], ['15', '#4CC9F0'], ['21', '#7EE08A'], ['91', '#FF5FA2']];
  const guests = NUMS.map(([s, col]) => fmNum(Lq, s, { col, s: 0.8 }));
  const eqs = ['9 = 3 * 3', '15 = 3 * 5', '21 = 3 * 7'].map((src, i) => { const g = G(Lfg); mkMath(g, 1010, 268 + i * 66, src, { size: 42, fill: C.ink, anchor: 'middle' }); return g; });
  const cOddComp = pill(Lfg, '**odd**, but **composite**', { col: RED, size: 30 });
  const cOddPrime = pill(Lfg, 'all **odd** numbers\nare **prime**?', { col: PINK, size: 30 });
  const c91 = pill(Lfg, '{{91}}: **prime**?', { col: PINK, size: 34 });
  const stComp = fmStamp(Lfg, 'comp');
  // the test card
  const card = G(Lfg);
  E('rect', { x: 826, y: 236, width: 350, height: 360, rx: 16, fill: MK.paper, stroke: '#B07A45', 'stroke-width': 6 }, card);
  const CX2 = 1001;
  const tHead = mkText(card, CX2, 286, 'Is {{91}} prime?', { size: 36, anchor: 'middle', fill: INK, weight: 800 });
  const tPr = G(card);
  mkText(tPr, CX2, 342, 'test the **primes**', { size: 28, anchor: 'middle', fill: INK });
  const pchips = ['2', '3', '5', '7', '11'].map((s, i) => { const c = mkChip(tPr, s, { size: 30, col: '#1E9E5A', solid: true, fill: '#DFF5E6' }); tr(c, CX2 - 128 + i * 64, 392); return c; });
  const tRule = G(card);
  mkText(tRule, CX2, 462, 'stop when', { size: 28, anchor: 'middle', fill: INK });
  mkText(tRule, CX2, 504, '**prime²** > **91**', { size: 34, anchor: 'middle', fill: '#B8336A' });
  // the working
  const wk = G(card);
  const w1 = G(wk); mkText(w1, CX2, 342, '÷{{2}} ✗   ÷{{3}} ✗   ÷{{5}} ✗', { size: 30, anchor: 'middle', fill: '#C62828' });
  const w2 = G(wk); mkMath(w2, CX2, 400, '11^2 = 121 > 91', { size: 34, fill: INK, anchor: 'middle' });
  const w2b = G(wk); mkText(w2b, CX2, 442, '**stop** at {{7}}', { size: 28, anchor: 'middle', fill: '#B8336A' });
  const w3 = G(wk); mkMath(w3, CX2 - 16, 498, '91 ÷ 7 = 13', { size: 36, fill: '#1E7A4A', anchor: 'middle' }); { const k = tick(w3, 13); tr(k, CX2 + 112, 486); }
  const w4 = G(wk); E('rect', { x: CX2 - 120, y: 524, width: 240, height: 56, rx: 10, fill: '#FFF3C2', stroke: '#B8336A', 'stroke-width': 3 }, w4); mkMath(w4, CX2, 564, '91 = 7 * 13', { size: 36, fill: INK, anchor: 'middle' });

  /* ================= the lid (L) ================= */
  const lid = G(Lpanel);
  E('rect', { x: 386, y: 118, width: 790, height: 556, rx: 16, fill: 'rgba(0,0,0,0.3)' }, lid);
  E('rect', { x: 378, y: 110, width: 790, height: 556, rx: 16, fill: '#FFF6E2', stroke: '#2E7DD8', 'stroke-width': 8 }, lid);
  T(lid, 773, 156, 'DIVISIBILITY TESTS', { size: 34, weight: 800, anchor: 'middle', fill: '#2E7DD8', ls: 3 });
  const ROWS = [['÷ by', 'test', '7452'],
    ['2', 'last digit **even**', ''], ['3', '**digit sum** ÷ 3', ''], ['4', '**last two** digits ÷ 4', ''], ['5', 'ends in **0** or **5**', ''],
    ['6', 'passes **2** and **3**', ''], ['8', '**last three** digits ÷ 8', ''], ['9', '**digit sum** ÷ 9', ''], ['10', 'ends in **0**', '']];
  const tbl = mkTable(lid, ROWS, { colW: [100, 410, 150], rowH: 46, size: 28, ink: INK, headFill: 'rgba(46,125,216,0.22)', fill: 'rgba(46,125,216,0.05)' });
  const TX = 443, TY = 176; tr(tbl, TX, TY);
  const RES = { 1: [1, ''], 2: [1, '18'], 3: [1, '52'], 4: [0, ''], 5: [1, ''], 6: [0, ''], 7: [1, '18'], 8: [0, ''] };
  const marks = {}, res = {};
  [2, 7].forEach(r => { marks[r] = tbl.mark(r, 1, 'rgba(255,228,92,0.45)'); });
  [1, 3, 6].forEach(r => { marks[r] = tbl.mark(r, 1, 'rgba(110,200,255,0.4)'); });
  for (const r in RES) {
    const c = tbl.cell(+r, 2), g = G(lid), [ok, note] = RES[r];
    const m = ok ? tick(g, 13, '#1E9E5A') : cross(g, 12, '#C62828');
    tr(m, TX + c.x + (note ? 44 : c.w / 2), TY + c.y + c.h / 2);
    if (note) mkText(g, TX + c.x + 104, TY + c.y + c.h / 2 + 10, note, { size: 28, anchor: 'middle', fill: INK, weight: 700 });
    res[r] = g;
  }
  const cDS = mkChip(Lpanel, '**digit sum**: only for **3** and **9**', { size: 30, col: '#8A6A10', solid: true, fill: '#FFF3C2' });
  const cMn = mkChip(Lpanel, '**2, 4, 8**: check the **last 1, 2, 3** digits', { size: 30, col: '#1E5FA8', solid: true, fill: '#DCEEFF' });
  const c452 = G(Lpanel);
  { const ch = mkChip(c452, '÷ 8? {{452 = 8 × 56 + 4}}', { size: 30, col: '#C62828', solid: true, fill: '#FFE1E1' }); const x = cross(c452, 12, '#C62828'); tr(x, ch.w / 2 + 26, 0); c452.ch = ch; }

  /* ================= V3: the pun ================= */
  const PUN = [['6', '#FFC247'], ['7', '#FF5FA2'], ['8', '#4CC9F0'], ['9', '#FF8A3D']];
  const pn = PUN.map(([s, col], i) => (i === 3 ? guests[0] : fmNum(Lq, s, { col, s: 0.6 })));
  const cCricket = pill(Lfg, '*cricket* … *cricket*', { col: '#9FB2C2', size: 28 });
  const cAte = pill(Lfg, '**7** ate **9**', { col: PINK, size: 30 });
  const vegSign = G(Lfg);
  E('rect', { x: -260, y: -50, width: 520, height: 100, rx: 14, fill: '#2FA36B', stroke: '#FFFFFF', 'stroke-width': 5 }, vegSign);
  E('path', { d: 'M-248,0 q20,-26 40,0 q-20,26 -40,0 Z M208,0 q20,-26 40,0 q-20,26 -40,0 Z', fill: '#B8F0C8', stroke: '#1E6E40', 'stroke-width': 2.5 }, vegSign);
  T(vegSign, 0, 14, 'VEGETARIAN PARTY', { size: 38, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 2 });
  const vegBit = G(vegSign);
  const laughs = [[700, 170], [1120, 160]].map(([x, y]) => { const c = pill(Lfg, '**HA!**', { col: GOLD, size: 30 }); c.xy = [x, y]; return c; });

  /* ================= HUD ================= */
  const cSix = pill(Lhud, '**6 p.m.**', { col: GOLD, size: 32 });
  const cGuests = pill(Lhud, 'the guests arrive...', { col: '#FFC2E0', size: 28 });

  /* ================= the cast ================= */
  const two = cast(Lcast, 'two');
  const tan = cast(Lcast, 'tan', { prop: null });
  const paati = cast(Lcast, 'paati');
  const kav = cast(Lfg, 'kavya');
  const priya = cast(Lfg, 'priya', { prop: null });
  const ltTan = fmLowerThird(Lhud, 'tan');
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* ---------- cuts ---------- */
  const k = id => at(id) - 0.06;
  const cC = mid('six', 0.45), cV2 = k('tan'), cL = k('digit'), cV3 = k('pun');
  const NW = [0.02, 0.34, 0.66].map(f => mid('nine', f)), NWL = (end('nine') - at('nine')) / 3;

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const sV1 = on(t, -9, cC), sC = on(t, cC, cV2), sV2 = on(t, cV2, cL), sL = on(t, cL, cV3), sV3 = on(t, cV3, 1e9);
    const voidOn = sV1 || sV2 || sL || sV3;
    op(voidShot, voidOn); op(vd.front, voidOn && !sL); op(vd.top, voidOn && !sL);
    [kav, priya].forEach(c => { const home = sC ? Lfg : Lcast; if (c.parentNode !== home) home.appendChild(c); }); op(dim, sL); op(clubShot, sC);
    if (voidOn) vd.upd(t);
    if (sC) club.upd(t);
    ltTan.set(0); cSix.set(0); cGuests.set(0);
    [cShare, c4t, cLast2, cQ, cOddComp, cOddPrime, c91, cDS, cMn, cCricket, cAte].forEach(c => c.set(0)); laughs.forEach(c => c.set(0));
    [panel, box, big, m52, mWrong, mWrong2, card, tPr, tRule, wk, w1, w2, w2b, w3, w4, lid, c452, vegSign, present].forEach(e => op(e, 0));
    eqs.forEach(e => op(e, 0)); stComp.set(0);
    for (const r in marks) marks[r].set(0);
    for (const r in res) op(res[r], 0);
    guests.forEach(g => op(g, 0)); pn.forEach(g => op(g, 0));
    const vis = { two: 0, tan: 0, paati: 0, kav: 0, priya: 0 };
    const who = scWho(S, t);
    const put = (c, key, x, y, s, st) => { vis[key] = 1; tr(c, x, y, s); c.set(Object.assign({ t }, st)); };

    /* ---------- V1: 6 p.m. ---------- */
    if (sV1) {
      popSet(cSix, t, at('six') + 0.05, 1e9, 1060, 62);
      popSet(cGuests, t, at('six') + 0.4, 1e9, 1060, 128);
      put(paati, 'paati', 300, 418, 0.86, { mood: 'smug', look: 0.6 });
      put(kav, 'kav', 520, 440, 0.86, { mood: 'happy', look: -0.6 });
      put(priya, 'priya', 740, 440, 0.86, { mood: 'happy', look: -0.6 });
    }

    /* ---------- C: the club door ---------- */
    if (sC) {
      // Big Two at the rope
      const s2 = 0.92;
      let tm = 'deadpan', tl = 0.8, list = 0, stamp = 0;
      if (t >= at('nine') && t < at('ninety')) {
        NW.forEach(w => { const a = P(t, w + NWL * 0.32, 0.3, ease) * (1 - P(t, w + NWL * 0.62, 0.25, ease)); stamp = Math.max(stamp, a); });
        tm = stamp > 0.2 ? 'smug' : 'deadpan';
      }
      if (t >= at('test') && t < at('seven')) { list = P(t, at('test') + 0.05, 0.4, ease); tl = 1; }
      if (t >= at('seven')) { stamp = P(t, mid('seven', 0.72), 0.3, ease) * (1 - P(t, mid('seven', 0.95), 0.3, ease)); list = 0; tm = stamp > 0.2 ? 'smug' : 'deadpan'; }
      if (t < at('nine')) { tm = who === 'priya' ? 'deadpan' : 'neutral'; tl = who === 'priya' ? -1 : 0.8; }
      if (who === 'priya' || who === 'kavya') tl = -1;
      put(two, 'two', 260, 640 - 164 * s2, s2, { talk: scTalk(S, t, 'two'), mood: tm, look: tl, list, stamp });

      // the queue walks in, then each number takes its turn at the door
      guests.forEach((g, i) => {
        let x = QX[i], y = QY, s = 0.8, mood = 'neutral', look = -0.6, a = 1, jump = 0;
        const walkIn = P(t, cC, 1.2, easeOut);
        x += (1 - walkIn) * 520;
        jump += Math.abs(Math.sin((t - cC) * 9)) * 16 * (1 - walkIn);
        // the queue shuffles forward as each guest leaves
        const gone = NW.filter((w, j) => j < i && t > w + NWL * 0.9).length;
        x = lerp(x, QX[Math.max(0, i - gone)], P(t, gone ? NW[gone - 1] + NWL * 0.9 : 0, 0.5, ease));
        if (t >= at('odd') && t < at('nine')) { mood = 'happy'; jump += Math.abs(Math.sin(t * 7 + i)) * 22 * AMP; }
        if (i < 3) {
          const w = NW[i];
          if (t >= w) {
            const step = P(t, w, 0.45, ease);
            x = lerp(QX[0], DOOR[0], step); s = lerp(0.8, 1.0, step);
            mood = t > w + NWL * 0.5 ? 'shock' : 'smug'; look = -1;
            const out = P(t, w + NWL * 0.82, 0.3, easeIn);
            a = 1 - out; y += 30 * out;
          }
        } else if (t >= at('ninety') - 0.1) {
          const step = P(t, at('ninety') - 0.1, 0.5, ease);
          x = lerp(QX[0], DOOR[0], step); s = lerp(0.8, 1.05, step);
          mood = t < at('seven') ? 'smug' : t > mid('seven', 0.72) ? 'shock' : 'neutral'; look = t < at('test') ? 0.6 : -1;
        }
        if (a > 0.01) { op(g, a); tr(g, x, y - jump, s); g.set({ t, mood, look }); }
      });
      // odd: Priya's rule; nine: Big Two splits each one
      popSet(cOddPrime, t, mid('odd', 0.3), at('nine'), 1010, 300);
      if (t >= at('nine') && t < at('ninety')) {
        eqs.forEach((e, i) => fadeIn(e, t, NW[i] + NWL * 0.2));
        popSet(cOddComp, t, mid('nine', 0.78), at('ninety'), 1010, 474);
        NW.forEach(w => { if (t >= w + NWL * 0.5 && t < w + NWL * 0.95) { stComp.set(P(t, w + NWL * 0.5, 0.3, linear)); tr(stComp, DOOR[0], 600, 0.42); } });
      }
      popSet(c91, t, mid('ninety', 0.3), at('test'), 1010, 300);
      if (t >= at('test')) {
        fadeIn(card, t, at('test'));
        if (t < at('seven')) {
          op(tPr, P(t, mid('test', 0.15), 0.3, linear));
          pchips.forEach((c, i) => c.set(P(t, mid('test', 0.18 + i * 0.07), 0.35, linear)));
          fadeIn(tRule, t, mid('test', 0.58));
        } else {
          op(wk, 1);
          fadeIn(w1, t, at('seven') + 0.1); fadeIn(w2, t, mid('seven', 0.08)); fadeIn(w2b, t, mid('seven', 0.3));
          fadeIn(w3, t, mid('seven', 0.48)); fadeIn(w4, t, mid('seven', 0.64));
          if (t >= mid('seven', 0.8)) { stComp.set(P(t, mid('seven', 0.8), 0.3, linear)); tr(stComp, DOOR[0], 600, 0.42); }
        }
      }
      // Priya (then Kavya) leaning in at the left edge
      if (t >= at('odd') - 0.3 && t < at('seven') - 0.06) {
        const lean = P(t, at('odd') - 0.3, 0.4, pop);
        let pm = 'smug', pl = 0.6;
        if (t >= at('nine') && t < at('ninety')) { pm = t > mid('nine', 0.5) ? 'annoyed' : 'neutral'; }
        if (t >= at('ninety')) { pm = 'smug'; }
        if (t >= at('test')) { pm = 'neutral'; pl = 0.9; }
        put(priya, 'priya', lerp(-120, 70, lean), 631, 0.85, { talk: scTalk(S, t, 'priya'), mood: pm, look: pl });
      }
      if (t >= at('seven') - 0.06) put(kav, 'kav', 70, 631, 0.85, { talk: scTalk(S, t, 'kavya'), mood: t > mid('seven', 0.8) ? 'smug' : 'neutral', look: 0.9 });
    }

    /* ---------- V2: Mr Tan's jigsaw ---------- */
    if (sV2) {
      const TXp = 110, KXp = 240, PRx = 370, PAx = 500, SS = 0.74;
      let tm = 'happy', tl = 0.6;
      if (who === 'kavya') tl = 0.9;
      if (who === 'priya') { tm = 'neutral'; tl = 1; }
      put(tan, 'tan', TXp, 444, SS, { talk: scTalk(S, t, 'tan'), mood: tm, look: tl });
      put(kav, 'kav', KXp, 444, SS, { talk: scTalk(S, t, 'kavya'), mood: t >= at('wrong') ? 'annoyed' : 'neutral', look: who === 'tan' ? -1 : who === 'priya' ? 1 : 0.9 });
      put(priya, 'priya', PRx, 444, SS, { talk: scTalk(S, t, 'priya'), mood: t >= at('wrong') ? 'smug' : 'neutral', look: who === 'priya' ? 1 : -1 });
      put(paati, 'paati', PAx, 424, SS, { talk: 0, mood: t < at('gift') ? 'happy' : 'deadpan', look: -1 });
      ltTan.set(win(t, at('tan') + 0.05, at('tan') + 3.2, 0.3));
      if (t < at('gift') + 0.4) { op(present, 1); tr(present, TXp + 10, 530, 1); }
      if (t >= at('gift') - 0.06) {
        op(panel, 1);
        if (t < at('four')) {
          const bp = P(t, at('gift') + 0.05, 0.45, pop);
          op(box, clamp(bp * 3)); tr(box, PCX, 280, Math.max(0.01, 0.6 + 0.4 * bp) * 1.15);
          popSet(cShare, t, mid('gift', 0.62), at('four'), PCX, 452);
        } else {
          fadeIn(big, t, at('four')); tr(big, 0, t < at('wrong') ? 240 : 196);
          op(box52, t < at('wrong') ? P(t, mid('four', 0.25), 0.3, linear) : 0.35);
          if (t < at('wrong')) {
            popSet(cLast2, t, mid('four', 0.2), at('wrong'), PCX, 320);
            fadeIn(m52, t, mid('four', 0.45)); tr(m52, 0, 396);
            popSet(c4t, t, mid('four', 0.75), at('wrong'), PCX, 462);
          } else {
            popSet(cQ, t, at('wrong') + 0.05, 1e9, PCX, 262);
            fadeIn(mWrong, t, mid('wrong', 0.12)); tr(mWrong, 0, 350);
            fadeIn(mWrong2, t, mid('wrong', 0.55)); tr(mWrong2, 0, 430);
          }
        }
      }
    }

    /* ---------- L: the divisibility table on the lid ---------- */
    if (sL) {
      op(lid, 1);
      const inRest = t >= at('rest');
      put(tan, 'tan', 108, 624, 0.9, { talk: scTalk(S, t, 'tan'), mood: inRest ? 'happy' : 'neutral', look: 1 });
      put(kav, 'kav', 266, 624, 0.9, { talk: scTalk(S, t, 'kavya'), mood: inRest ? 'happy' : 'neutral', look: 1 });
      if (!inRest) {
        const a = P(t, mid('digit', 0.05), 0.3, linear), b = P(t, mid('digit', 0.5), 0.3, linear);
        marks[2].set(a); marks[7].set(a); [1, 3, 6].forEach(r => marks[r].set(b));
        popSet(cDS, t, mid('digit', 0.08), mid('digit', 0.48), 773, 622);
        popSet(cMn, t, mid('digit', 0.5), 1e9, 773, 622);
      } else {
        const R = { 2: 0.05, 7: 0.14, 1: 0.3, 5: 0.38, 6: 0.56, 3: 0.86, 4: 0.9, 8: 0.94 };
        for (const r in R) op(res[r], P(t, mid('rest', R[r]), 0.25, linear));
        if (t >= mid('rest', 0.56)) { marks[6].set(1); }
        op(c452, P(t, mid('rest', 0.58), 0.3, linear)); tr(c452, 773 - 18, 622); c452.ch.set(1);
      }
    }

    /* ---------- V3: the pun and the vegetarian party ---------- */
    if (sV3) {
      const SS = 0.8, X = [130, 290, 450, 610];
      const veg = t >= at('veg');
      const tanM = veg ? (t > mid('veg', 0.75) ? 'happy' : 'shock') : 'happy';
      put(tan, 'tan', X[0], 440, SS, { talk: scTalk(S, t, 'tan'), mood: tanM, look: veg ? 1 : 0.7 });
      const dp = veg && t > mid('veg', 0.75) ? 'happy' : t > mid('pun', 0.55) ? 'deadpan' : 'neutral';
      put(kav, 'kav', X[1], 440, SS, { talk: 0, mood: dp, look: veg ? 1 : -1 });
      put(priya, 'priya', X[2], 440, SS, { talk: 0, mood: dp, look: veg ? 1 : -1 });
      put(paati, 'paati', X[3], 418, SS, { talk: scTalk(S, t, 'paati'), mood: veg ? 'smug' : 'deadpan', look: veg ? -1 : -1 });
      // 6, 7, 8, 9 on the table: 7 chases 9 and eats it
      const chase = P(t, mid('pun', 0.55), 0.7, ease), eat = P(t, mid('pun', 0.72), 0.25, linear);
      const spit = veg ? P(t, mid('veg', 0.5), 0.4, easeOut) : 0;
      const NX = [760, 860, 960, 1120];
      pn.forEach((g, i) => {
        let x = NX[i], s = 0.6, mood = 'neutral', look = 0.5, a = 1, jump = 0;
        if (i === 1) { x = lerp(NX[1], NX[3] - 60, chase) - spit * 10; mood = chase > 0.1 ? 'smug' : 'neutral'; look = 1; jump = Math.abs(Math.sin(t * 9)) * 14 * chase * (1 - eat) + Math.sin(Math.PI * clamp((lerp(NX[1], NX[3] - 60, chase) - 900) / 120)) * 70; s = 0.6 + 0.08 * eat * (1 - spit); if (veg) mood = 'shock'; }
        if (i === 3) { mood = chase > 0.05 ? 'shock' : 'neutral'; look = -1; a = (1 - eat) + spit; s = 0.6 * Math.max(0.3, 1 - eat * 0.7 + spit * 0.7); x = lerp(NX[3], NX[3] + 25, spit); jump = spit * Math.sin(spit * Math.PI) * 60; }
        if (i === 0 || i === 2) { mood = chase > 0.1 ? 'shock' : 'neutral'; look = chase > 0.1 ? 1 : 0.4; }
        if (a > 0.01) { op(g, clamp(a)); tr(g, x, 530 - jump, s); g.set({ t, mood, look }); }
      });
      popSet(cAte, t, mid('pun', 0.74), at('veg'), 935, 330);
      popSet(cCricket, t, end('pun') + 0.05, at('veg'), 935, 330);
      if (veg) {
        const vp = P(t, mid('veg', 0.3), 0.45, pop);
        op(vegSign, clamp(vp * 3)); tr(vegSign, 900, 290, Math.max(0.01, 0.6 + 0.4 * vp), Math.sin(t * 2) * 2 * AMP);
        laughs.forEach((c, i) => popSet(c, t, mid('veg', 0.8) + i * 0.15, 1e9, c.xy[0], c.xy[1]));
      }
    }

    op(two, vis.two); op(tan, vis.tan); op(paati, vis.paati); op(kav, vis.kav); op(priya, vis.priya);
  };
});
