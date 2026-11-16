/* Scene 3: Brackets are a disguise (substitution).
   Shots (hard sitcom cuts):
   A  2:30 p.m. in the flat: Kavya, Ah Boy with the calculator, Agent X on the table, the ladoo tray; a revision card on
      the right. half -> q: find x² when x = −3 -> calc: the calculator, −3² = −9 -> bidmas: bracket every value, BIDMAS ->
      five: x = 5, 3x = 35 ? -> sq: 2x² at x = 3: 2 × 3² = 2 × 9 = 18, not (2 × 3)² = 36 -> ladoo: Ah Boy holds up a
      ladoo -> anyone: push in on Agent X: his badge says x = (a ladoo). Hold.
   B  Agent X's confessional and a board: brackets: x = −3, the bracket disguise; without it the minus falls off ->
      nine: the two calculators side by side, (−3)² = 9 and −3² = −9 -> fifteen: 3x = 3 × 5 = 15, not 35 ->
      frac: x = ½: 8x² = 8 × (½)² = 8 × ¼ = 2.
   R  Uncle Ravi's video call from Miami at 1:30 a.m. (night): ravi (lower third; kulfi freezes at −15 °C, the freezer
      only speaks °F) -> warm: Ravi in shock, fanning himself with the kulfi mould.
   K  Kavya's talking head with the board, Ravi's call small in the corner: f: F = 9/5 C + 32 = 9/5 × (−15) + 32
      = −27 + 32 = 5, so 5 °F. */
scene('sub', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const fadeIn = (t, t0, d) => P(t, t0, d || 0.3, linear);
  const GOLD = '#FFE45C', RED = '#D32F2F', BLUE = '#2E6FD8', GREEN = '#1E9E5A', GREY = '#5A6670', INK = MK.ink;
  const chipC = (parent, text, o) => { o = o || {}; return mkChip(parent, text, { size: o.size || 30, col: o.col || GOLD }); };
  const row = (parent, cx, y, parts, o) => {
    o = o || {}; const s = o.size || 50, gap = o.gap !== undefined ? o.gap : s * 0.24;
    const ms = parts.map(p => (typeof p === 'string' ? { m: p } : p)).map(p => Object.assign({}, p, mkMeasure(p.m, { size: s })));
    const Wd = ms.reduce((a, p) => a + p.w, 0) + gap * (ms.length - 1);
    let x = o.anchor === 'start' ? cx : cx - Wd / 2; const out = [];
    ms.forEach(p => { const g = mkMath(parent, x, y, p.m, { size: s, fill: p.col || o.fill || INK }); out.push({ g, x0: x, w: p.w, cx: x + p.w / 2, a: p.a }); x += p.w + gap; });
    out.W = Wd; out.x0 = out[0].x0; out.x1 = x - gap; return out;
  };
  const paper = (parent, x, y, w, h, o) => { o = o || {}; return E('rect', { x, y, width: w, height: h, rx: 18, fill: o.fill || MK.paper, stroke: o.stroke || '#B8A27A', 'stroke-width': 5 }, parent); };
  const view = (el, k, fx, fy, sx, sy) => el.setAttribute('transform', `translate(${sx.toFixed(1)} ${sy.toFixed(1)}) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const lcd = (parent, x, y, w, h, src, col) => {   // a calculator display strip
    const g = G(parent);
    E('rect', { x, y, width: w, height: h, rx: 14, fill: '#3A4A58', stroke: INK, 'stroke-width': 4 }, g);
    E('rect', { x: x + 12, y: y + 12, width: w - 24, height: h - 24, rx: 8, fill: '#BFE3C8', stroke: '#1E2A22', 'stroke-width': 3 }, g);
    mkMath(g, x + w - 28, y + h / 2 + 14, src, { size: 40, anchor: 'end', fill: col || '#1E2A1E' });
    return g;
  };

  /* layers */
  const Lbg = G(root), Lcast = G(root), Lfront = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= A: the living room ================= */
  const flatShot = G(Lbg);
  const flat = xpFlat(flatShot);
  Lfront.appendChild(flat.front); Lfront.appendChild(flat.top);
  const tray = xpTray(flat.top, { n: 18 }); tr(tray, 1010, 530, 0.62); tray.set(17);
  const c230 = chipC(Lfg, '**2:30 p.m.**', { size: 32 });
  const card = G(Lfg);
  paper(card, 600, 112, 560, 376);
  const CX = 880;
  // q: find x² when x = −3
  const aQ = G(card);
  mkText(aQ, CX, 178, 'Find {{x^2}} when {{x = -3}}', { size: 42, anchor: 'middle', fill: INK });
  // calc: the calculator
  const aCalc = G(card);
  const calc = mkCalculator(aCalc, {}); tr(calc, 800, 340, 0.6);
  const calcNo = mkText(aCalc, 1010, 330, '{{-9}} ?', { size: 56, anchor: 'middle', fill: RED, weight: 800 });
  // bidmas
  const aBid = G(card);
  const cBr = chipC(aBid, '**bracket** every value', { col: BLUE, size: 30 }); tr(cBr, CX, 248);
  attr(cBr.firstChild.firstChild, 'fill', '#EAF2FF');
  const bid = [['B', 'Brackets'], ['I', 'Indices'], ['DM', 'Division and Multiplication'], ['AS', 'Addition and Subtraction']].map(([k, w], i) => {
    const g = G(aBid), y = 316 + i * 44;
    T(g, 668, y, k, { size: 34, weight: 800, fill: '#E07A12' });
    T(g, 740, y, w, { size: 30, weight: 700, fill: INK });
    return g;
  });
  // five: 3x = 35 ?
  const aFive = G(card);
  mkMath(aFive, CX, 250, 'x = 5', { size: 56, anchor: 'middle', fill: INK });
  const fvR = row(aFive, CX - 20, 390, ['3x', '=', { m: '35', col: RED }], { size: 72, gap: 22 });
  T(aFive, fvR.x1 + 30, 390, '?', { size: 72, weight: 800, anchor: 'middle', fill: RED });
  mkText(aFive, fvR[2].cx, 450, 'a 3 next to a 5?', { size: 28, anchor: 'middle', fill: RED });
  // sq: 2x² at x = 3
  const aSq = G(card);
  mkText(aSq, CX, 168, '{{2x^2}} when {{x = 3}}: square **first**', { size: 34, anchor: 'middle', fill: INK, boldFill: BLUE });
  const wSq = mkWorking(aSq, 800, 196, ['2x^2 = 2 × 3^2', '= 2 × 9', { m: '= 18', col: GREEN }], { size: 44, fill: INK, gap: 16 });
  const sqTick = tick(aSq, 16); tr(sqTick, 800 + 140, wSq.lineY[2] - 14);
  const sqNo = G(aSq);
  const sqNoM = mkMath(sqNo, CX - 30, 452, '(2 × 3)^2 = 36', { size: 40, anchor: 'middle', fill: RED });
  E('line', { x1: CX - 30 - sqNoM.w / 2 - 8, y1: 438, x2: CX - 30 + sqNoM.w / 2 + 8, y2: 438, stroke: RED, 'stroke-width': 5, 'stroke-linecap': 'round' }, sqNo);
  T(sqNo, CX - 30 + sqNoM.w / 2 + 24, 452, 'not this', { size: 28, weight: 700, fill: RED });
  const cardPages = [aQ, aCalc, aBid, aFive, aSq];

  /* ================= B: Agent X's confessional and a board ================= */
  const confX = xpConf(Lbg, 'x');
  const board = G(Lfg);
  paper(board, 500, 108, 660, 556, { stroke: '#8FA3B8' });
  const BX = 830;
  const bTitle = ['Brackets are a disguise', 'Two calculators', '{{3x}} means {{3 × x}}', 'Fractions too'].map(s => mkText(board, BX, 160, s, { size: 34, anchor: 'middle', fill: INK, weight: 800 }));
  const bBr = G(board);
  const brBig = mkMath(bBr, BX, 330, 'x = (-3)', { size: 96, anchor: 'middle', fill: INK });
  mkText(bBr, BX, 420, 'the **brackets** keep the minus sign on', { size: 30, anchor: 'middle', fill: GREY, boldFill: BLUE });
  const brNo = mkText(bBr, BX, 520, 'no brackets?  {{-3}} turns into {{3}}', { size: 32, anchor: 'middle', fill: RED });
  const bNine = G(board);
  const lcdA = lcd(bNine, 520, 196, 300, 92, '(-3)^2 = 9'), lcdB = lcd(bNine, 840, 196, 300, 92, '-3^2 = -9');
  const okA = tick(bNine, 18); tr(okA, 670, 318); const noB = cross(bNine, 15); tr(noB, 990, 318);
  const nW1 = mkMath(bNine, BX, 406, '(-3)^2 = (-3) × (-3) = 9', { size: 42, anchor: 'middle', fill: GREEN });
  const nW2 = mkMath(bNine, BX, 486, '-3^2 = -(3 × 3) = -9', { size: 42, anchor: 'middle', fill: RED });
  const nNote = mkText(bNine, BX, 560, 'type {{-3^2}} and only the {{3}} is squared', { size: 30, anchor: 'middle', fill: GREY });
  const bFif = G(board);
  const wFif = mkWorking(bFif, 760, 220, ['3x = 3 × x', '= 3 × 5', { m: '= 15', col: GREEN }], { size: 56, fill: INK, gap: 22 });
  const fifNo = G(bFif);
  const f35 = mkMath(fifNo, BX, 540, '35', { size: 56, anchor: 'middle', fill: RED });
  E('line', { x1: BX - 50, y1: 540, x2: BX + 50, y2: 500, stroke: RED, 'stroke-width': 6, 'stroke-linecap': 'round' }, fifNo);
  T(fifNo, BX, 600, 'a number, not a digit', { size: 30, weight: 700, anchor: 'middle', fill: RED });
  const bFrac = G(board);
  mkText(bFrac, BX, 226, 'undercover as {{x = 1/2}}', { size: 32, anchor: 'middle', fill: BLUE });
  const wFrac = mkWorking(bFrac, 720, 270, ['8x^2 = 8 × (1/2)^2', '= 8 × 1/4', { m: '= 2', col: GREEN }], { size: 52, fill: INK, gap: 22 });
  const bPages = [bBr, bNine, bFif, bFrac];

  /* ================= R: Uncle Ravi's call; K: Kavya's board ================= */
  const callShot = G(Lfg);
  const call = xpRaviCall(callShot, 560, 360, 'Uncle Ravi · Miami', true);
  // the freezer (only speaks Fahrenheit) and the kulfi mould
  const fridge = G(call.screen); tr(fridge, 196, 10);
  E('rect', { x: -62, y: -150, width: 124, height: 330, rx: 12, fill: '#E9F1F7', stroke: INK, 'stroke-width': 4 }, fridge);
  E('line', { x1: -62, y1: -30, x2: 62, y2: -30, stroke: INK, 'stroke-width': 3 }, fridge);
  E('rect', { x: -44, y: -126, width: 88, height: 50, rx: 6, fill: '#14202A', stroke: INK, 'stroke-width': 2 }, fridge);
  T(fridge, 0, -90, '°F', { size: 34, weight: 800, anchor: 'middle', fill: '#7FD3FF' });
  T(fridge, 0, -46, '°F only', { size: 26, weight: 800, anchor: 'middle', fill: RED });
  E('rect', { x: 44, y: 0, width: 8, height: 60, rx: 3, fill: '#8F9CAB' }, fridge);
  const mould = G(call.screen);
  const mIn = G(mould);
  [-26, 0, 26].forEach((x, i) => {
    E('path', { d: `M${x - 12},-30 L${x + 12},-30 L${x},34 Z`, fill: '#C9D3DC', stroke: INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, mIn);
    E('line', { x1: x, y1: -30, x2: x, y2: -62, stroke: '#B07A45', 'stroke-width': 5, 'stroke-linecap': 'round' }, mIn);
  });
  E('rect', { x: -46, y: -36, width: 92, height: 12, rx: 4, fill: '#8F9CAB', stroke: INK, 'stroke-width': 2.5 }, mIn);
  const cMiami = chipC(Lfg, 'Miami: **1:30 a.m.**', { col: '#9FD8FF', size: 30 });
  const cKulfi = chipC(Lfg, 'kulfi freezes at {{-15 °C}}', { col: GOLD, size: 30 });
  const confK = xpConf(Lbg, 'kavya');
  const kBoard = G(Lfg);
  paper(kBoard, 500, 108, 660, 556, { stroke: '#8FA3B8' });
  mkText(kBoard, BX, 160, 'Substitute {{C = -15}}', { size: 34, anchor: 'middle', fill: INK, weight: 800 });
  const wF = mkWorking(kBoard, 680, 196, ['F = 9/5 C + 32', '= 9/5 × (-15) + 32', '= -27 + 32', { m: '= 5', col: GREEN }], { size: 46, fill: INK, gap: 20 });
  const fAns = chipC(kBoard, 'kulfi freezes at **5 °F**', { col: GREEN, size: 32 }); tr(fAns, BX, 614);
  attr(fAns.firstChild.firstChild, 'fill', '#EAFBF1');

  /* ================= the cast ================= */
  const kav = cast(Lcast, 'kavya');
  const boy = cast(Lcast, 'boy');
  const ax = cast(Lcast, 'x');
  // Ah Boy's calculator and his ladoo
  const mini = G(boy.hand);
  E('rect', { x: -26, y: -96, width: 52, height: 76, rx: 8, fill: '#33424E', stroke: SC_INK, 'stroke-width': 3 }, mini);
  E('rect', { x: -19, y: -88, width: 38, height: 18, rx: 3, fill: '#BFE3C8' }, mini);
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) E('rect', { x: -18 + c * 13, y: -62 + r * 12, width: 10, height: 8, rx: 2, fill: c === 2 ? '#FF8A3D' : '#E6EBEF' }, mini);
  const ldHand = G(boy.hand); tr(xpLadoo(ldHand, 0.9), 0, -50);
  // Agent X's badges
  const bmk = (src, size) => { const m = mkMath(ax.badge, 0, 0, src, { size: size || 34, fill: INK, anchor: 'middle' }); tr(m, 0, 2 + (m.a - m.d) / 2 - 6); return m; };
  const bm3 = G(ax.badge), bm3R = row(bm3, 0, 8, ['x', '=', '-', '3'], { size: 34, gap: 7 });
  const bFive = bmk('x = 5'), bHalf = bmk('x = 1/2', 26);
  const bLad = G(ax.badge);
  mkMath(bLad, -34, 8, 'x =', { size: 34, fill: INK, anchor: 'middle' });
  tr(xpLadoo(bLad, 0.72), 36, 0);
  const lt = { ravi: xpLowerThird(Lhud, 'ravi') };
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* shots */
  const SHOT = { brackets: 'B', nine: 'B', fifteen: 'B', frac: 'B', ravi: 'R', warm: 'R', f: 'K' };
  const ORDER = S.ch.lines.map(l => l.id);
  const cutAt = id => at(id) - 0.06;
  const curLine = t => { let cur = ORDER[0]; for (const id of ORDER) if (t >= cutAt(id)) cur = id; return cur; };
  const POS = { kav: 125, boy: 360, ax: 530, call: 860 };
  const SPK = { kavya: 'kav', boy: 'boy', x: 'ax', ravi: 'call' };
  const lookAt = (from, to) => { const x = POS[to]; return x === undefined ? 0 : clamp((x - POS[from]) / 240, -1, 1); };

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const cur = curLine(t), shot = SHOT[cur] || 'A';
    const sA = shot === 'A' || shot === 'R' ? 1 : 0, sB = shot === 'B' ? 1 : 0, sR = shot === 'R' ? 1 : 0, sK = shot === 'K' ? 1 : 0;
    const who = scWho(S, t), spk = SPK[who] || '';
    lt.ravi.set(0);
    op(flatShot, sA); op(flat.front, sA); op(flat.top, sA);
    op(card, 0); cardPages.forEach(p => op(p, 0)); c230.set(0); cMiami.set(0); cKulfi.set(0);
    op(kav, 0); op(boy, 0); op(ax, 0);
    op(bm3, 0); op(bFive, 0); op(bHalf, 0); op(bLad, 0);
    op(callShot, 0); op(kBoard, 0); confK.set(0); confX.set(0); op(board, 0);

    /* ---------- A (and R, which shares the flat) ---------- */
    if (sA) {
      flat.upd(t, 1);
      flat.clock.set(2, 30 + Math.min(29, Math.floor(t / 3)));
      // the push-in on Agent X at the end
      const k = cur === 'ladoo' || cur === 'anyone' ? 1 + 0.35 * P(t, mid('ladoo', 0.5), 1.6, ease) : 1;
      [flatShot, Lfront, Lcast].forEach(el => view(el, k, 500, 430, lerp(500, 600, (k - 1) / 0.35), 430));
      if (t < at('q')) { c230.set(P(t, at('half') + 0.3, 0.4, linear)); tr(c230, 900, 172); }
      // the card
      let pg = -1;
      if (cur === 'q' || cur === 'calc') pg = cur === 'q' ? 0 : 1;
      if (cur === 'bidmas') pg = 2;
      if (cur === 'five') pg = 3;
      if (cur === 'sq') pg = 4;
      if (pg >= 0) {
        op(card, 1); op(cardPages[pg], 1);
        if (pg === 0) op(aQ, fadeIn(t, mid('q', 0.05)));
        if (pg === 1) {
          op(aQ, 1);
          const typed = t > mid('calc', 0.5);
          calc.set(typed ? '−9' : t > mid('calc', 0.12) ? '−3²' : '0');
          calc.press(typed ? '=' : t > mid('calc', 0.3) ? 'x²' : '−', win(t, mid('calc', 0.1), mid('calc', 0.6), 0.05));
          op(calcNo, fadeIn(t, mid('calc', 0.55)));
        }
        if (pg === 2) { cBr.set(P(t, mid('bidmas', 0.05), 0.35, linear)); bid.forEach((g, i) => op(g, fadeIn(t, mid('bidmas', 0.38 + i * 0.08), 0.2))); }
        if (pg === 4) { wSq.show(0, P(t, mid('sq', 0.3), 0.3)); wSq.show(1, P(t, mid('sq', 0.5), 0.3)); wSq.show(2, P(t, mid('sq', 0.62), 0.3)); op(sqTick, fadeIn(t, mid('sq', 0.66))); op(sqNo, fadeIn(t, mid('sq', 0.68))); }
      }
      // the humans
      let km = 'neutral', kl = lookAt('kav', 'boy'), bm = 'happy', bl = lookAt('boy', 'kav'), blift = 1;
      if (cur === 'q') { km = 'neutral'; kl = 1; }
      if (cur === 'calc') { km = t > mid('calc', 0.6) ? 'annoyed' : 'neutral'; kl = lookAt('kav', 'boy'); bl = -0.3; }
      if (cur === 'bidmas') { km = 'happy'; kl = 1; bl = lookAt('boy', 'kav'); bm = 'neutral'; blift = 0; }
      if (cur === 'five') { km = 'deadpan'; kl = lookAt('kav', 'boy'); bm = 'happy'; bl = 0.6; }
      if (cur === 'sq') { km = 'happy'; kl = 1; bm = 'neutral'; bl = 0.8; blift = 0; }
      if (shot === 'R') { kl = 1; bl = 1; blift = 0; km = cur === 'warm' ? 'happy' : 'happy'; bm = cur === 'warm' ? 'shock' : 'happy'; }
      if (cur === 'ladoo' || cur === 'anyone') { km = 'deadpan'; kl = lookAt('kav', 'ax'); bm = 'happy'; bl = lookAt('boy', 'ax'); blift = 1; }
      op(kav, 1); tr(kav, POS.kav, 436, 0.95); kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
      op(boy, 1); tr(boy, POS.boy, 446, 1.0); boy.set({ t, talk: scTalk(S, t, 'boy'), mood: bm, look: bl, lift: blift });
      const ladooOn = cur === 'ladoo' || cur === 'anyone';
      op(mini, ladooOn ? 0 : 1); op(ldHand, ladooOn ? 1 : 0);
      // Agent X on the table
      let xm = 'deadpan', xl = spk && spk !== 'ax' ? lookAt('ax', spk) : 0.3, bd = 0;
      if (cur === 'calc' || cur === 'five') xm = 'smug';
      if (cur === 'anyone') { bd = P(t, at('anyone') - 0.1, 0.25, linear); op(bLad, 1); xl = 0; }
      if (cur === 'ladoo') xl = -0.9;
      op(ax, 1); tr(ax, POS.ax, 446, 0.62);
      ax.set({ t, talk: scTalk(S, t, 'x'), mood: xm, look: xl, arms: cur === 'anyone' ? 0.3 : shot === 'R' ? 0.1 : 0.55, shades: 1, badge: bd, still: cur === 'anyone' });
    } else { [flatShot, Lfront, Lcast].forEach(el => view(el, 1, 0, 0, 0, 0)); }

    /* ---------- R: the call ---------- */
    if (sR) {
      op(callShot, 1);
      tr(callShot, 860, 316);
      const rm = cur === 'warm' ? 'shock' : 'happy';
      call.ravi.set({ t, talk: scTalk(S, t, 'ravi'), mood: rm, look: -0.4 });
      if (cur === 'ravi') {
        lt.ravi.set(win(t, at('ravi') + 0.1, at('ravi') + 3.2, 0.3));
        cMiami.set(P(t, mid('ravi', 0.05), 0.35, linear)); tr(cMiami, 740, 180);
        cKulfi.set(P(t, mid('ravi', 0.45), 0.35, linear)); tr(cKulfi, 760, 566);
        tr(mould, -196, 70, 1, 0);
      } else {
        // warm: fanning himself with the kulfi mould
        tr(mould, -150, -10, 1, Math.sin(t * 16) * 22 * AMP);
        cMiami.set(1); tr(cMiami, 740, 180);
      }
    }

    /* ---------- K: Kavya's board, Ravi's call small ---------- */
    if (sK) {
      confK.set(1, t); op(kBoard, 1);
      op(kav, 1); tr(kav, 260, 560, 1.2); kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: t > mid('f', 0.68) ? 'happy' : 'neutral', look: 0.8 });
      wF.show(0, P(t, mid('f', 0.02), 0.3)); wF.show(1, P(t, mid('f', 0.2), 0.3)); wF.show(2, P(t, mid('f', 0.52), 0.3)); wF.show(3, P(t, mid('f', 0.64), 0.3));
      fAns.set(P(t, mid('f', 0.68), 0.35, linear));
      op(callShot, 1); tr(callShot, 260, 226, 0.48);
      call.ravi.set({ t, mood: 'neutral', look: 0.5 });
      tr(mould, -196, 70, 1, 0);
    }

    /* ---------- B: Agent X's board ---------- */
    if (sB) {
      confX.set(1, t); op(board, 1);
      const pg = { brackets: 0, nine: 1, fifteen: 2, frac: 3 }[cur];
      bPages.forEach((p, i) => op(p, i === pg ? 1 : 0)); bTitle.forEach((p, i) => op(p, i === pg ? 1 : 0));
      let xm = 'deadpan', brk = 0, arms = 0.55, shades = 1;
      tr(bm3R[2].g, 0, 0, 1, 0); op(bm3R[2].g, 1);
      if (pg === 0) {
        op(bm3, 1);
        // disguise on, then off (the minus falls off), then back on
        const onP = P(t, mid('brackets', 0.28), 0.35, easeOut), offAt = mid('brackets', 0.62), back = mid('brackets', 0.92);
        brk = t < offAt ? onP : t < back ? 0 : P(t, back, 0.25, easeOut);
        const fall = t >= offAt && t < back ? P(t, offAt + 0.1, 0.6, easeIn) : 0;
        tr(bm3R[2].g, 0, fall * 150, 1, fall * 200);
        op(bm3R[2].g, 1 - P(t, offAt + 0.5, 0.2, linear) * (t < back ? 1 : 0));
        xm = t >= offAt && t < back ? 'shock' : 'smug';
        op(brBig, fadeIn(t, mid('brackets', 0.1))); op(brNo, fadeIn(t, offAt));
        arms = t >= offAt && t < back ? 1 : 0.55;
      } else if (pg === 1) {
        op(bm3, 1); brk = 1;
        op(lcdA, fadeIn(t, mid('nine', 0.05))); op(okA, fadeIn(t, mid('nine', 0.2)));
        op(lcdB, fadeIn(t, mid('nine', 0.55))); op(noB, fadeIn(t, mid('nine', 0.6)));
        op(nW1, fadeIn(t, mid('nine', 0.15))); op(nW2, fadeIn(t, mid('nine', 0.6))); op(nNote, fadeIn(t, mid('nine', 0.64)));
      } else if (pg === 2) {
        op(bFive, 1);
        wFif.show(0, P(t, mid('fifteen', 0.05), 0.3)); wFif.show(1, P(t, mid('fifteen', 0.2), 0.3)); wFif.show(2, P(t, mid('fifteen', 0.32), 0.3));
        op(fifNo, fadeIn(t, mid('fifteen', 0.55)));
        xm = t > mid('fifteen', 0.6) ? 'smug' : 'deadpan';
      } else {
        op(bHalf, 1);
        wFrac.show(0, P(t, mid('frac', 0.2), 0.3)); wFrac.show(1, P(t, mid('frac', 0.4), 0.3)); wFrac.show(2, P(t, mid('frac', 0.6), 0.3));
        xm = 'deadpan';
      }
      op(ax, 1); tr(ax, 250, 430, 1.15);
      ax.set({ t, talk: scTalk(S, t, 'x'), mood: xm, look: 0.5, arms, shades, badge: 1, brackets: brk });
    }
  };
});
