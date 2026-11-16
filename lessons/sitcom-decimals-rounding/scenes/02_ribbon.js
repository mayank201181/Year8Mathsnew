/* Scene 2: Fifteen medals (dividing decimals).
   Shots (hard sitcom cuts):
   T  ten      the medal table in the tent: Mr Tan unrolls the blue ribbon along the table; "10 a.m."
   R  q        the cutting mat, close up: the 6 m ribbon marked in metres; a 0.4 m piece braced; 6 ÷ 0.4 = ? medals.
   T  smaller  Dad, smug: thought bubble "÷ makes it smaller: fewer than 6"; everyone turns to the camera.
   R  fit      SHOWPIECE: the 0.4 m pieces tick off along the ribbon, 1 to 15; "how many 0.4s fit into 6?"
      shift    Dot on the mat: 6 ÷ 0.4, "× 10" under BOTH numbers, 60 ÷ 4 = 15; the ribbon relabels 0 to 60 (10 cm).
   T  lie      fifteen medals drop onto the table edge; 15 > 6; Dad shock, then sad.
   B  rule     Mr Tan: ÷ by a number between 0 and 1: bigger, 8 ÷ 0.5 = 16; × by it: smaller, 8 × 0.5 = 4.
   R  short    Priya moves only the 0.4: 6 ÷ 4 = 1.5 medals; MISSING THE POINT.
      both     Dot: "Shift both, then divide." Both LED points hop one place right in step: 60 ÷ 4 = 15; POINT TAKEN.
   B  harder   2.73 ÷ 0.3, × 10 both, 27.3 ÷ 3 = 9.1; check 0.3 × 9.1 = 2.73.
      bus      $7.36 and four house flags; the bus stop 4 ) 7.36, the answer's point right above the point.
      steps    Kavya: 7 ÷ 4 = 1 r 3, 33 ÷ 4 = 8 r 1, 16 ÷ 4 = 4: $1.84 each.
      zeros    Ah Boy pops up worried; 5.3 = 5.300; 4 ) 5.300 = 1.325.
   T  pun      Mr Tan with the ribbon roll, delighted; everyone deadpan; "cricket… cricket…". Hold. */
scene('ribbon', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const popSet = (el, t, t0, t1, x, y) => { const p = t >= t0 && t < t1 ? P(t, t0, 0.35, linear) : 0; el.set(p); if (x !== undefined) tr(el, x, y); };
  const fin = (t, t0) => P(t, t0, 0.3, linear);
  const GOLD = '#FFE45C', RED = '#D32F2F', GREEN = '#1E9E5A', BLUE = '#1E5FC0', INK = MK.ink, GREY = '#5A6670', AMBER = DR_LED;
  const WHITE = '#F4F7FA', LRED = '#FF8A8A', LGREEN = '#8FE3A8';

  /* layers */
  const Lset = G(root), Lmat = G(root), Lmid = G(root), Lfront = G(root), Ltop = G(root), Lboard = G(root), Lpop = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= T: the medal table ================= */
  const tent = drTent(Lset);
  Lfront.appendChild(tent.front);
  const roll = G(Ltop); tr(roll, 112, 512);
  E('rect', { x: -26, y: -40, width: 52, height: 40, rx: 6, fill: DR_BLUE, stroke: SC_INK, 'stroke-width': 4 }, roll);
  E('ellipse', { cx: 0, cy: -40, rx: 26, ry: 8, fill: '#5C95F0', stroke: SC_INK, 'stroke-width': 3 }, roll);
  E('ellipse', { cx: 0, cy: -40, rx: 8, ry: 3, fill: '#FFFFFF' }, roll);
  const strip = E('rect', { x: 130, y: 512, width: 0, height: 14, fill: DR_BLUE, stroke: '#14306B', 'stroke-width': 2 }, Ltop);
  const scis = G(Ltop); tr(scis, 1110, 516, 1, -20);
  E('path', { d: 'M0,0 L-60,-10 M0,0 L-60,10', stroke: '#9AA6B2', 'stroke-width': 6, 'stroke-linecap': 'round' }, scis);
  E('circle', { cx: 14, cy: -8, r: 9, fill: 'none', stroke: '#E8424F', 'stroke-width': 5 }, scis);
  E('circle', { cx: 14, cy: 8, r: 9, fill: 'none', stroke: '#E8424F', 'stroke-width': 5 }, scis);
  const medals = [];
  for (let i = 0; i < 15; i++) { const m = G(Ltop); drMedal(m, 0.66); medals.push(m); }
  const c10 = mkChip(Lfg, '**10 a.m.**', { size: 32, col: GOLD });
  const bubDad = mkThoughtBubble(Lfg, '{{÷}} makes it **smaller**:\nfewer than {{6}}', { size: 30, tail: 'down' });
  const c15 = mkChip(Lfg, '{{15 > 6}}', { size: 38, col: LRED });
  const cCricket = mkChip(Lfg, 'cricket… cricket…', { size: 28, col: '#B6C2CC' });

  /* ================= R: the cutting mat ================= */
  const RX0 = 120, RX1 = 1080, RY = 300, RH = 40, PXM = (RX1 - RX0) / 6;   // 160 px per metre
  const rx = m => RX0 + m * PXM;
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#2F8A63', '#1E5C43', true) }, Lmat);
  let gd = '';
  for (let x = 40; x < 1200; x += 80) gd += `M${x},0 L${x},750 `;
  for (let y = 30; y < 750; y += 80) gd += `M0,${y} L1200,${y} `;
  E('path', { d: gd, stroke: '#FFFFFF', 'stroke-width': 1.5, opacity: 0.12 }, Lmat);
  const rib = G(Lmat);
  E('rect', { x: RX0, y: RY, width: RX1 - RX0, height: RH, fill: DR_BLUE, stroke: '#0E2A5A', 'stroke-width': 3 }, rib);
  E('rect', { x: RX0, y: RY + RH / 2 - 4, width: RX1 - RX0, height: 8, fill: '#FFFFFF', opacity: 0.8 }, rib);
  const pieceL = G(rib);
  const pieceR = [];
  for (let i = 0; i < 15; i++) pieceR.push(E('rect', { x: rx(i * 0.4) + 2, y: RY + 2, width: PXM * 0.4 - 4, height: RH - 4, rx: 4, fill: i % 2 ? '#FFD36B' : '#FF9CB8', opacity: 0.95 }, pieceL));
  let tk = '';
  for (let k = 0; k <= 30; k++) { const x = rx(k * 0.2), L = k % 5 === 0 ? 20 : 10; tk += `M${x.toFixed(1)},${RY + RH + 4} L${x.toFixed(1)},${RY + RH + 4 + L} `; }
  E('path', { d: tk, stroke: WHITE, 'stroke-width': 3 }, rib);
  const labM = G(rib), lab10 = G(rib);
  for (let m = 0; m <= 6; m++) {
    T(labM, rx(m), RY + RH + 58, m + ' m', { size: 30, weight: 700, anchor: 'middle', fill: WHITE });
    T(lab10, rx(m), RY + RH + 58, String(m * 10), { size: 30, weight: 700, anchor: 'middle', fill: GOLD });
  }
  const cUnit = mkChip(Lmat, 'in {{10}} cm pieces', { size: 28, col: GOLD });
  const cntL = G(rib);
  const cnt = [];
  for (let i = 0; i < 15; i++) cnt.push(T(cntL, rx(i * 0.4 + 0.2), RY - 14, String(i + 1), { size: 28, weight: 800, anchor: 'middle', fill: GOLD }));
  const brace = mkBrace(Lmat, rx(0), RY - 8, rx(0.4), RY - 8, { text: '{{0.4}} m', col: GOLD, size: 30 });
  const cQ = mkChip(Lmat, '{{6 ÷ 0.4 = ?}} medals', { size: 42, col: WHITE });
  const cFit = mkChip(Lmat, 'how many {{0.4}}s fit into {{6}}?', { size: 36, col: GOLD });
  const c15p = mkChip(Lmat, '**15** pieces!', { size: 36, col: LGREEN });
  // two-row working on the mat: 6 ÷ 0.4 -> (× 10 both) -> 60 ÷ 4 = 15
  const MT = { size: 56, fill: WHITE, anchor: 'middle' };
  const XA = 470, XO = 560, XB = 650, Y1 = 520, Y2 = 640;
  const r1 = G(Lmat); mkMath(r1, XA, Y1, '6', MT); mkMath(r1, XO, Y1, '÷', MT); mkMath(r1, XB, Y1, '0.4', MT);
  const r2 = G(Lmat); mkMath(r2, XA, Y2, '60', MT); mkMath(r2, XO, Y2, '÷', MT); mkMath(r2, XB, Y2, '4', MT);
  const r2eq = mkMath(Lmat, XB + 50, Y2, '= 15', Object.assign({}, MT, { anchor: 'start', fill: LGREEN }));
  const r2bad = G(Lmat); mkMath(r2bad, XA, Y2, '6', Object.assign({}, MT, { fill: LRED })); mkMath(r2bad, XO, Y2, '÷', Object.assign({}, MT, { fill: LRED })); mkMath(r2bad, XB, Y2, '4', Object.assign({}, MT, { fill: LRED }));
  const r2badEq = mkMath(Lmat, XB + 50, Y2, '= 1.5 "medals"', Object.assign({}, MT, { anchor: 'start', fill: LRED }));
  const arrA = G(Lmat), arrB = G(Lmat);
  [[arrA, XA], [arrB, XB]].forEach(([g, x]) => { arrow(g, x, Y1 + 18, x, Y2 - 52, { color: GOLD, width: 5 }); mkMath(g, x - 16, (Y1 + Y2) / 2 - 2, '× 10', { size: 30, fill: GOLD, anchor: 'end' }); });
  const cWhole = mkChip(Lmat, 'make the divisor **whole**', { size: 32, col: GOLD });
  const cOnly = mkChip(Lmat, 'only the {{0.4}} moved', { size: 30, col: LRED });
  const missQ = mkMath(Lmat, XA - 20, (Y1 + Y2) / 2 + 10, '?', { size: 48, fill: LRED, anchor: 'middle' });
  const cBoth = mkChip(Lmat, '**Shift both, then divide.**', { size: 36, col: GOLD });
  // the LED points hopping in step: 6.0 ÷ 0.4 -> 60 ÷ 04 -> 60 ÷ 4
  const hop = G(Lmat);
  const HD = { size: 72, weight: 700, anchor: 'middle', fill: WHITE };
  const hx = [380, 432, 560, 668, 720];   // 6 0 ÷ 0 4
  const hDig = [['6', 0], ['0', 1], ['÷', 2], ['0', 3], ['4', 4]].map(([d, i]) => T(hop, hx[i], 600, d, HD));
  const hPtA = E('circle', { cx: 406, cy: 592, r: 9, fill: AMBER, stroke: '#B85F00', 'stroke-width': 3 }, hop);
  const hPtB = E('circle', { cx: 694, cy: 592, r: 9, fill: AMBER, stroke: '#B85F00', 'stroke-width': 3 }, hop);
  const hEq = mkMath(hop, 790, 600, '= 15', { size: 64, fill: LGREEN });
  const hLabA = T(hop, 406, 660, 'one place →', { size: 26, weight: 700, anchor: 'middle', fill: GOLD });
  const hLabB = T(hop, 694, 660, 'one place →', { size: 26, weight: 700, anchor: 'middle', fill: GOLD });
  const stampBad = drStamp(Lfg, false), stampOk = drStamp(Lfg, true);

  /* ================= B: the whiteboard ================= */
  const wb = mkWhiteboard(Lboard, 720, 460); tr(wb, 800, 410);
  const crate = G(Lboard); tr(crate, 215, 512);    // a box of medals for Dot to stand on
  E('rect', { x: -60, y: -70, width: 120, height: 70, rx: 6, fill: '#B07A45', stroke: SC_INK, 'stroke-width': 4 }, crate);
  E('path', { d: 'M-60,-35 L60,-35', stroke: '#6B4423', 'stroke-width': 3 }, crate);
  T(crate, 0, -24, 'MEDALS', { size: 26, weight: 800, anchor: 'middle', fill: '#FFF2B0' });
  // B1: the rule
  const ru = G(Lboard);
  const ru1n = mkText(ru, 800, 238, '÷ by a number **between 0 and 1**: **bigger**', { size: 30, anchor: 'middle', fill: GREEN });
  const ru1 = mkMath(ru, 800, 320, '8 ÷ 0.5 = 16', { size: 58, fill: INK, anchor: 'middle' });
  const ru2n = mkText(ru, 800, 438, '× by a number **between 0 and 1**: **smaller**', { size: 30, anchor: 'middle', fill: RED });
  const ru2 = mkMath(ru, 800, 520, '8 × 0.5 = 4', { size: 58, fill: INK, anchor: 'middle' });
  const upA = arrow(ru, 800 + ru1.w / 2 + 40, 322, 800 + ru1.w / 2 + 40, 270, { color: GREEN, width: 7 });
  const dnA = arrow(ru, 800 + ru2.w / 2 + 40, 470, 800 + ru2.w / 2 + 40, 522, { color: RED, width: 7 });
  // B2: harder
  const ha = G(Lboard), HM = { size: 54, fill: INK, anchor: 'middle' };
  const HXA = 640, HXO = 755, HXB = 850, HY1 = 262, HY2 = 386;
  const ha1 = G(ha); mkMath(ha1, HXA, HY1, '2.73', HM); mkMath(ha1, HXO, HY1, '÷', HM); mkMath(ha1, HXB, HY1, '0.3', HM);
  const ha2 = G(ha); mkMath(ha2, HXA, HY2, '27.3', HM); mkMath(ha2, HXO, HY2, '÷', HM); mkMath(ha2, HXB, HY2, '3', HM);
  const ha2eq = mkMath(ha, HXB + 44, HY2, '= 9.1', Object.assign({}, HM, { anchor: 'start', fill: GREEN }));
  const haArr = G(ha);
  [HXA, HXB].forEach(x => { arrow(haArr, x, HY1 + 16, x, HY2 - 50, { color: BLUE, width: 5 }); mkMath(haArr, x - 14, (HY1 + HY2) / 2 - 4, '× 10', { size: 30, fill: BLUE, anchor: 'end' }); });
  const haChk = mkChip(ha, 'multiply back: {{0.3 × 9.1 = 2.73}}', { size: 32, col: GREEN, fill: '#E8F7EE' });
  const haTick = tick(ha, 16);
  // B3 / B4: bus stops
  const busStop = (parent, x0, y, divisor, dig, ptAfter, ans, carries, grey) => {
    const g = G(parent), CW = 54, PX = 26;
    const cx = i => x0 + i * CW + (i >= ptAfter ? PX : 0);
    const n = dig.length, xr = cx(n - 1) + 34;
    E('path', { d: `M${x0 - 40},${y + 16} Q${x0 - 22},${y - 22} ${x0 - 40},${y - 62} L${xr},${y - 62}`, fill: 'none', stroke: INK, 'stroke-width': 5, 'stroke-linecap': 'round' }, g);
    mkMath(g, x0 - 60, y, String(divisor), { size: 60, fill: INK, anchor: 'end' });
    g.dig = dig.map((d, i) => T(g, cx(i), y, d, { size: 60, weight: 700, anchor: 'middle', fill: grey && grey.includes(i) ? '#8A97A3' : INK }));
    const px = cx(ptAfter - 1) + CW / 2 + PX / 2 - 2;
    E('circle', { cx: px, cy: y - 6, r: 7, fill: INK }, g);
    g.ans = ans.map((d, i) => T(g, cx(i), y - 84, d, { size: 60, weight: 700, anchor: 'middle', fill: GREEN }));
    g.apt = E('circle', { cx: px, cy: y - 90, r: 8, fill: AMBER, stroke: '#B85F00', 'stroke-width': 3 }, g);
    g.car = carries.map((c, i) => c ? T(g, cx(i) - 24, y - 26, c, { size: 30, weight: 800, anchor: 'middle', fill: RED }) : null);
    g.up = arrow(g, px, y - 22, px, y - 74, { color: AMBER, width: 4 });
    g.px = px; g.x1 = xr;
    return g;
  };
  const tag = mkPriceTag(Lboard, '$7.36', { size: 40 });
  const flags = G(Lboard);
  ['#2E6FD8', '#E8424F', '#2FA36B', '#FFC21A'].forEach((c, i) => {
    const f = G(flags); tr(f, 90 + i * 84, 400);
    E('line', { x1: 0, y1: 0, x2: 0, y2: 90, stroke: '#6B4423', 'stroke-width': 6 }, f);
    E('path', { d: 'M0,0 L56,14 L0,30 Z', fill: c, stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, f);
  });
  const bs1 = busStop(Lboard, 640, 470, 4, ['7', '3', '6'], 1, ['1', '8', '4'], [null, '3', '1']);
  const bsTitle = mkText(Lboard, 800, 240, '{{$7.36}} shared by {{4}} houses', { size: 34, anchor: 'middle', fill: GREY });
  const cAbove = mkChip(Lboard, 'the point sits **above** the point', { size: 30, col: BLUE, fill: '#E6F0FF' });
  const stepL = ['7 ÷ 4 = 1 r 3', '33 ÷ 4 = 8 r 1', '16 ÷ 4 = 4'].map((s, i) => mkMath(Lboard, 900, 330 + i * 62, s, { size: 36, fill: BLUE }));
  const cEach = mkChip(Lboard, '{{$1.84}} each', { size: 40, col: GREEN, fill: '#E8F7EE' });
  const z0 = mkMath(Lboard, 800, 242, '5.3 = 5.300', { size: 50, fill: INK, anchor: 'middle' });
  const bs2 = busStop(Lboard, 600, 470, 4, ['5', '3', '0', '0'], 1, ['1', '3', '2', '5'], [null, '1', '1', '2'], [2, 3]);
  const zStep = ['5 ÷ 4 = 1 r 1', '13 ÷ 4 = 3 r 1', '10 ÷ 4 = 2 r 2', '20 ÷ 4 = 5'].map((s, i) => mkMath(Lboard, 910, 318 + i * 54, s, { size: 32, fill: BLUE }));
  const zRes = mkMath(Lboard, 800, 600, '5.3 ÷ 4 = 1.325', { size: 46, fill: GREEN, anchor: 'middle' });
  const cFinish = mkChip(Lpop, "doesn't finish?", { size: 30, col: GOLD });

  /* ================= the cast ================= */
  const tan = cast(Lmid, 'tan', { prop: 'paper' });
  const tRoll = G(tan.hand); tr(tRoll, 0, -40);
  E('rect', { x: -30, y: -30, width: 60, height: 44, rx: 6, fill: DR_BLUE, stroke: SC_INK, 'stroke-width': 4 }, tRoll);
  E('ellipse', { cx: -30, cy: -8, rx: 8, ry: 22, fill: '#5C95F0', stroke: SC_INK, 'stroke-width': 3 }, tRoll);
  const tPaper = tan.hand.firstChild;
  const dad = cast(Lmid, 'dad');
  const kav = cast(Lmid, 'kavya');
  const priya = cast(Lmid, 'priya');
  const boy = cast(Lpop, 'boy');
  const dot = cast(Lpop, 'dot');
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* positions */
  const TY = 458, TS = 0.9, TX = { tan: 250, dad: 480, kav: 720, priya: 950 };
  const RL = [110, 690, 0.75], RR = [1090, 690, 0.75], DOT_R = [1080, 520, 0.6];
  const BL = [105, 665, 0.78], BR = [315, 665, 0.78], DOT_B = [215, 442 - 71, 0.62];
  const MX = i => 165 + i * 62;

  /* cuts */
  const k = id => at(id) - 0.06;
  const segs = [['T', -1], ['R', k('q')], ['T', k('smaller')], ['R', k('fit')], ['T', k('lie')], ['B', k('rule')], ['R', k('short')], ['B', k('harder')], ['T', k('pun')]];
  const shotAt = t => { let s = 'T'; for (const [n, t0] of segs) if (t >= t0) s = n; return s; };

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const sh = shotAt(t), sT = sh === 'T' ? 1 : 0, sR = sh === 'R' ? 1 : 0, sB = sh === 'B' ? 1 : 0;
    const who = scWho(S, t);
    tent.upd(t);
    op(Lset, 1 - sR); op(Lfront, sT); op(Ltop, sT); op(Lmat, sR); op(Lboard, sB);
    [c10, bubDad, c15, cCricket, cUnit, brace, cQ, cFit, c15p, cWhole, cOnly, cBoth, stampBad, stampOk, haChk, cAbove, cEach, cFinish].forEach(c => c.set(0));
    const show = { tan: 0, dad: 0, kav: 0, priya: 0, boy: 0, dot: 0 };
    op(tRoll, 0); op(tPaper, 1);

    /* ---------- T: the medal table ---------- */
    if (sT) {
      show.tan = show.dad = show.kav = show.priya = 1;
      tr(tan, TX.tan, TY, TS); tr(dad, TX.dad, TY, TS); tr(kav, TX.kav, TY, TS); tr(priya, TX.priya, TY, TS);
      const isPun = t >= k('pun'), isLie = t >= k('lie') && !isPun, isSm = t >= k('smaller') && t < k('fit');
      attr(strip, 'width', (RX1 - 150) * (t < k('q') ? P(t, mid('ten', 0.2), 3, linear) : 1));
      let tm = 'happy', tl = 0.3, tlift = 0.4, dm = 'neutral', dl = -0.6, km = 'neutral', kl = -0.7, pm = 'neutral', pl = -0.8;
      medals.forEach(m => op(m, 0));
      if (t < k('q')) {
        popSet(c10, t, at('ten') + 0.1, 1e9, 860, 276);
        tl = -0.3; tlift = 0; dl = -0.8; km = 'happy';
      } else if (isSm) {
        dm = 'smug'; dl = 0.2; tl = 0.6; kl = -0.6; pl = -0.7;
        popSet(bubDad, t, mid('smaller', 0.25), 1e9, 560, 258);
        if (t > mid('smaller', 0.72)) { tm = 'deadpan'; tl = 0; km = 'deadpan'; kl = 0; pm = 'deadpan'; pl = 0; }
      } else if (isLie) {
        medals.forEach((m, i) => { const d = P(t, at('lie') - 0.05 + i * 0.05, 0.4, easeOut); op(m, d > 0 ? 1 : 0); tr(m, MX(i), lerp(300, 530, d)); });
        popSet(c15, t, mid('lie', 0.3), 1e9, 480, 270);
        dm = t < mid('lie', 0.5) ? 'shock' : 'sad'; dl = 0; tm = 'smug'; tl = 0.6; km = 'happy'; kl = -0.6; pm = 'happy'; pl = -0.8;
      } else if (isPun) {
        medals.forEach((m, i) => { op(m, 1); tr(m, MX(i), 530); });
        op(tRoll, 1); op(tPaper, 0);
        tm = 'happy'; tl = 0; tlift = 1; dm = 'deadpan'; dl = -0.6; km = 'deadpan'; kl = -0.8; pm = 'deadpan'; pl = 0;
        popSet(cCricket, t, end('pun') + 0.2, 1e9, 720, 270);
      }
      tan.set({ t, talk: scTalk(S, t, 'tan'), mood: tm, look: tl, lift: tlift });
      dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: dl, lift: isSm ? 1 : 0 });
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
      priya.set({ t, talk: scTalk(S, t, 'priya'), mood: pm, look: pl });
    }

    /* ---------- R: the cutting mat ---------- */
    if (sR) {
      const isQ = t < k('smaller'), isFit = t >= k('fit') && t < k('shift'), isShift = t >= k('shift') && t < k('lie');
      const isShort = t >= k('short') && t < k('both'), isBoth = t >= k('both');
      let left = tan, lm = 'happy', ll = 0.8, km = 'neutral', kl = -0.8, dm = 'smug', dl = -0.5, arms = 0, point = 0;
      op(pieceL, 0); op(cntL, 0); op(labM, 1); op(lab10, 0);
      [r1, r2, r2eq, r2bad, r2badEq, arrA, arrB, missQ, hop].forEach(e => op(e, 0));
      if (isQ) {
        popSet(cQ, t, mid('q', 0.2), 1e9, 600, 500);
        brace.set(P(t, mid('q', 0.5), 0.35, linear));
        lm = 'happy'; ll = 0.7; km = 'neutral'; kl = -0.8;
      } else if (isFit) {
        km = 'happy'; kl = -0.5; lm = 'happy'; ll = 0.8;
        popSet(cFit, t, at('fit') + 0.05, 1e9, 600, 500);
        op(pieceL, 1); op(cntL, 1);
        const c = P(t, mid('fit', 0.22), (end('fit') - mid('fit', 0.22)) * 0.85, linear) * 15;
        pieceR.forEach((r, i) => op(r, clamp(c - i)));
        cnt.forEach((n, i) => op(n, clamp(c - i)));
        popSet(c15p, t, mid('fit', 0.9), 1e9, 600, 600);
      } else if (isShift) {
        left = dad; lm = t < mid('shift', 0.85) ? 'smug' : 'shock'; ll = 0.8; km = 'happy'; kl = -0.2; dm = 'smug'; dl = -0.8; point = -1;
        op(pieceL, 1); pieceR.forEach(r => op(r, 1));
        popSet(cWhole, t, mid('shift', 0.1), 1e9, 600, 448);
        op(r1, fin(t, at('shift')));
        op(arrA, fin(t, mid('shift', 0.42))); op(arrB, fin(t, mid('shift', 0.42)));
        op(r2, fin(t, mid('shift', 0.55)));
        op(r2eq, fin(t, mid('shift', 0.82)));
        const rl = P(t, mid('shift', 0.55), 0.4, linear);
        op(labM, 1 - rl); op(lab10, rl); popSet(cUnit, t, mid('shift', 0.6), 1e9, RX1 - 40, RY - 34);
      } else if (isShort) {
        left = priya; lm = t < end('short') ? 'smug' : 'sad'; ll = 0.8; km = t < mid('short', 0.5) ? 'neutral' : 'deadpan'; kl = -0.8; dm = t < mid('short', 0.5) ? 'neutral' : 'annoyed'; dl = -0.8;
        op(r1, 1);
        op(arrB, fin(t, mid('short', 0.32)));
        op(r2bad, fin(t, mid('short', 0.55))); op(r2badEq, fin(t, mid('short', 0.75)));
        op(missQ, fin(t, mid('short', 0.85)));
        popSet(cOnly, t, mid('short', 0.85), 1e9, 290, 448);
        stampBad.set(P(t, end('short') + 0.05, 0.3, linear)); tr(stampBad, 890, 455, 0.45);
      } else if (isBoth) {
        left = priya; lm = 'sad'; ll = 0.8; km = 'happy'; kl = 0.8; dm = 'smug'; dl = -0.7; arms = t > mid('both', 0.88) ? 1 : 0;
        popSet(cBoth, t, at('both') + 0.05, 1e9, 560, 448);
        op(hop, 1);
        const h = P(t, mid('both', 0.4), 0.5, ease);
        attr(hPtA, 'cx', lerp(406, 458, h)); attr(hPtB, 'cx', lerp(694, 746, h));
        attr(hPtA, 'cy', 592 - Math.sin(h * Math.PI) * 50); attr(hPtB, 'cy', 592 - Math.sin(h * Math.PI) * 50);
        op(hLabA, h > 0 && h < 1 ? 1 : 0); op(hLabB, h > 0 && h < 1 ? 1 : 0);
        const tidy = P(t, mid('both', 0.7), 0.3, linear);
        op(hPtA, 1 - tidy); op(hPtB, 1 - tidy); op(hDig[3], 1 - tidy);
        tr(hDig[4], -26 * tidy, 0); tr(hEq, -26 * tidy, 0);
        op(hEq, fin(t, mid('both', 0.78)));
        stampOk.set(P(t, mid('both', 0.88), 0.3, linear)); tr(stampOk, 880, 455, 0.38);
      }
      show.kav = 1; tr(kav, RR[0], RR[1], RR[2]);
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
      const key = left === tan ? 'tan' : left === dad ? 'dad' : 'priya';
      show[key] = 1; tr(left, RL[0], RL[1], RL[2]);
      left.set({ t, talk: scTalk(S, t, key), mood: lm, look: ll, lift: key === 'tan' ? 1 : 0 });
      if (!isQ && !isFit) {
        show.dot = 1;
        const up = isShift ? P(t, at('shift') - 0.3, 0.35, pop) : 1;
        tr(dot, DOT_R[0], lerp(DOT_R[1] + 50, DOT_R[1], up), DOT_R[2] * Math.max(0.01, up));
        dot.set({ t, talk: scTalk(S, t, 'dot'), mood: dm, look: dl, arms, point: who === 'dot' ? point || -1 : 0 });
      }
    }

    /* ---------- B: the whiteboard ---------- */
    if (sB) {
      const isRule = t < k('short'), isHarder = t >= k('harder') && t < k('bus'), isBus = t >= k('bus') && t < k('steps');
      const isSteps = t >= k('steps') && t < k('zeros'), isZeros = t >= k('zeros');
      [ru, ha, tag, flags, bs1, bsTitle, z0, bs2, zRes, crate].forEach(e => op(e, 0));
      stepL.forEach(e => op(e, 0)); zStep.forEach(e => op(e, 0));
      let tm = 'happy', tl = 0.9, km = 'neutral', kl = 0.9, dm = 'smug', dl = 0.8;
      if (isRule || isHarder) {
        op(crate, 1); show.dot = 1; tr(dot, DOT_B[0], DOT_B[1], DOT_B[2]);
      }
      if (isRule) {
        op(ru, 1);
        op(ru1n, fin(t, mid('rule', 0.04))); op(ru1, fin(t, mid('rule', 0.42))); upA.set(P(t, mid('rule', 0.5), 0.3, linear));
        op(ru2n, fin(t, mid('rule', 0.72))); op(ru2, fin(t, mid('rule', 0.76))); dnA.set(P(t, mid('rule', 0.84), 0.3, linear));
        km = 'happy';
      } else if (isHarder) {
        op(ha, 1);
        op(ha1, fin(t, at('harder') + 0.05)); op(haArr, fin(t, mid('harder', 0.42)));
        op(ha2, fin(t, mid('harder', 0.55))); op(ha2eq, fin(t, mid('harder', 0.82)));
        popSet(haChk, t, mid('harder', 0.9), 1e9, 800, 560);
        op(haTick, fin(t, mid('harder', 0.96))); tr(haTick, 800 + haChk.w / 2 + 30, 562);
      } else if (isBus || isSteps) {
        op(tag, 1); tr(tag, 130, 292); tag.set(Math.sin(t * 2) * 4 * AMP);
        op(flags, 1); op(bsTitle, 1);
        op(bs1, fin(t, isBus ? mid('bus', 0.42) : -1));
        const st = isSteps;
        bs1.ans.forEach(a => op(a, 0)); bs1.car.forEach(c => c && op(c, 0));
        const ap = st ? 1 : P(t, mid('bus', 0.72), 0.3, linear);
        op(bs1.apt, ap); bs1.up.set(st ? 0 : P(t, mid('bus', 0.66), 0.35, linear));
        if (isBus) popSet(cAbove, t, mid('bus', 0.74), 1e9, 800, 590);
        if (st) {
          const sf = [[0.04, 0.12], [0.3, 0.38], [0.58, 0.6]];
          sf.forEach(([a, c], i) => { op(bs1.ans[i], fin(t, mid('steps', a + 0.06))); if (bs1.car[i + 1]) op(bs1.car[i + 1], fin(t, mid('steps', c + 0.08))); op(stepL[i], fin(t, mid('steps', a))); });
          popSet(cEach, t, mid('steps', 0.8), 1e9, 800, 590);
          km = 'happy'; tm = 'happy'; tl = 0.9; kl = 0.9;
        }
      } else if (isZeros) {
        op(z0, fin(t, mid('zeros', 0.18)));
        op(bs2, fin(t, mid('zeros', 0.45)));
        bs2.up.set(0);
        const zs = [0.56, 0.66, 0.75, 0.84];
        bs2.ans.forEach((a, i) => op(a, fin(t, mid('zeros', zs[i]))));
        op(bs2.apt, fin(t, mid('zeros', zs[0])));
        bs2.car.forEach((c, i) => c && op(c, fin(t, mid('zeros', zs[i - 1] + 0.04))));
        zStep.forEach((s, i) => op(s, fin(t, mid('zeros', zs[i]))));
        op(zRes, fin(t, mid('zeros', 0.92)));
      }
      show.tan = 1; tr(tan, BL[0], BL[1], BL[2]);
      tan.set({ t, talk: scTalk(S, t, 'tan'), mood: tm, look: tl, lift: who === 'tan' ? 1 : 0 });
      if (isZeros) {
        show.boy = 1;
        const up = P(t, at('zeros') - 0.25, 0.35, pop);
        tr(boy, BR[0], lerp(820, BR[1], up), BR[2]);
        boy.set({ t, talk: 0, mood: t < mid('zeros', 0.9) ? 'sad' : 'happy', look: -0.8, sweat: t < mid('zeros', 0.6) ? 1 : 0 });
        popSet(cFinish, t, at('zeros') + 0.1, 1e9, 230, 470);
      } else {
        show.kav = 1; tr(kav, BR[0], BR[1], BR[2]);
        kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
      }
      if (show.dot) dot.set({ t, talk: 0, mood: dm, look: dl });
    }

    op(tan, show.tan); op(dad, show.dad); op(kav, show.kav); op(priya, show.priya); op(boy, show.boy); op(dot, show.dot);
  };
});
