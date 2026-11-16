/* Scene 2: Measure a circle, win a prize (discovering pi).
   10 a.m., the hall: Uncle Pi's stall MEASURE A CIRCLE · WIN A PRIZE (prize: a giant pi plush) -> Kavya wraps a string
   once round a coin, straightens it on a ruler (7.8 cm) and lays a ruler across (2.5 cm) -> Priya fills the table:
   mug, plate, bike wheel -> Uncle Pi: divide C by d -> 3.12, 3.15, 3.14, 3.14: every one just over 3 -> pi = C / d,
   the same for a coin and a Ferris wheel -> Mr Tan: measuring errors (stretchy string, rounded readings) -> Dad: "pi
   is 22/7, close enough!" -> 22/7 = 3.142857 142857... repeats; pi doesn't; HALF-BAKED -> which value to use ->
   Ah Boy: how does a circle ever close? -> Uncle Pi frozen -> the circle closes, the number never ends -> Mr Tan's
   pun ("on and on"), and only Uncle Pi laughs. */
scene('pi', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const view = (el, k, fx, fy, sx, sy) => el.setAttribute('transform', `translate(${sx.toFixed(1)} ${sy.toFixed(1)}) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 3, color: o.color || C.ink, weight: 700 }); };
  const stage = (el, t, a, b) => op(el, t >= a - 0.05 && t < b - 0.05 ? Math.min(P(t, a - 0.05, 0.15, linear), 1 - P(t, b - 0.2, 0.15, linear)) : 0);
  const show = (el, t, t0, d) => op(el, P(t, t0, d || 0.3, linear));
  const GOLD = '#FFE45C', INK = MK.ink, BLUE = '#2E7DD8', RED = '#D32F2F', GREEN = '#1E9E5A', ORANGE = '#E8751A', MUTED = '#5A4A52';

  /* ---------- layers (everything in the camera except the time chip) ---------- */
  const cam = G(root), Lhud = G(root);
  const stall = ciStall(cam, { title: 'MEASURE A CIRCLE · WIN A PRIZE', col: '#2E7DD8', sub: '' });
  const Lboard = G(cam), Lfg = G(cam), Lover = G(cam);

  /* ---------- the cast ---------- */
  const tan = cast(stall.mid, 'tan');
  const dad = cast(stall.mid, 'dad');
  const boy = cast(stall.mid, 'boy');
  const pi = cast(stall.mid, 'pi');
  Lover.appendChild(pi.ticker);                     // his digits ticker floats above his head, full size
  const kav = cast(Lfg, 'kavya');                    // customer side, in front of the table
  const pri = cast(Lfg, 'priya', { prop: null, hand: true });
  const pPencil = scHandProp(pri.hand, 'pencil');
  const pString = G(pri.hand);                      // her tangled, stretchy string
  E('path', { d: 'M0,-6 C-30,-30 30,-50 -10,-70 C-46,-86 34,-104 4,-120 C-20,-132 26,-140 10,-150', fill: 'none', stroke: '#E8424F', 'stroke-width': 5, 'stroke-linecap': 'round' }, pString);
  // the prize: a giant pi plush on the table
  const plush = G(stall.top); tr(plush, 604, 520);
  E('path', { d: 'M-46,-96 Q0,-108 46,-100 M-24,-100 Q-26,-50 -36,-8 M20,-100 Q18,-50 24,-14 Q30,-2 44,-8', fill: 'none', stroke: SC_INK, 'stroke-width': 26, 'stroke-linecap': 'round' }, plush);
  E('path', { d: 'M-46,-96 Q0,-108 46,-100 M-24,-100 Q-26,-50 -36,-8 M20,-100 Q18,-50 24,-14 Q30,-2 44,-8', fill: 'none', stroke: '#D9843A', 'stroke-width': 18, 'stroke-linecap': 'round' }, plush);
  [[-12, -112], [12, -112]].forEach(([x, y]) => { E('circle', { cx: x, cy: y, r: 7, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 2 }, plush); E('circle', { cx: x, cy: y, r: 3, fill: SC_INK }, plush); });
  const tag = G(plush); tr(tag, 0, -46, 0.9, -6);
  E('rect', { x: -52, y: -20, width: 104, height: 38, rx: 8, fill: '#C62828', stroke: SC_INK, 'stroke-width': 3 }, tag);
  T(tag, 0, 9, 'PRIZE', { size: 26, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 1 });

  /* ---------- the board (stands on the table, right) ---------- */
  const BX = 910;
  const board = G(Lboard);
  E('rect', { x: 656, y: 202, width: 520, height: 490, rx: 18, fill: 'rgba(0,0,0,0.22)' }, board);
  E('rect', { x: 650, y: 196, width: 520, height: 490, rx: 18, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, board);

  // B0 (ten): the four things to measure
  const b0 = G(board);
  mkText(b0, BX, 252, '**Measure** a circle', { size: 38, anchor: 'middle', fill: INK, boldFill: BLUE });
  const objCoin = (parent, r) => {
    const g = G(parent);
    E('circle', { r, fill: '#E2B33C', stroke: '#8A6508', 'stroke-width': 4 }, g);
    E('circle', { r: r * 0.78, fill: 'none', stroke: '#FFE08A', 'stroke-width': 3 }, g);
    T(g, 0, r * 0.32, '1', { size: Math.max(26, r * 0.9), weight: 800, anchor: 'middle', fill: '#8A6508' });
    return g;
  };
  const objMug = parent => {
    const g = G(parent);
    E('path', { d: 'M38,-34 q34,0 34,26 q0,26 -34,26', fill: 'none', stroke: SC_INK, 'stroke-width': 8 }, g);
    E('path', { d: 'M-40,-50 L40,-50 L36,40 Q36,48 28,48 L-28,48 Q-36,48 -36,40 Z', fill: '#4CC9F0', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
    E('ellipse', { cx: 0, cy: -50, rx: 40, ry: 10, fill: '#7A4A2E', stroke: SC_INK, 'stroke-width': 3 }, g);
    T(g, 0, 16, 'π', { size: 34, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
    return g;
  };
  const objPlate = (parent, r) => {
    const g = G(parent);
    E('circle', { r, fill: '#FFFFFF', stroke: '#2E5AAC', 'stroke-width': 5 }, g);
    E('circle', { r: r * 0.66, fill: '#F2F6FA', stroke: '#9FB2C2', 'stroke-width': 3 }, g);
    return g;
  };
  const OBJ = [
    ['coin', 790, 360, g => objCoin(g, 34)],
    ['mug', 1030, 360, g => objMug(g)],
    ['plate', 790, 540, g => objPlate(g, 62)],
    ['bike wheel', 1030, 540, g => ciWheel(g, 66)],
  ].map(([name, x, y, draw]) => {
    const g = G(b0), d = G(g); tr(d, x, y); draw(d);
    mkText(g, x, y + (name === 'coin' || name === 'mug' ? 88 : 104), name, { size: 28, anchor: 'middle', fill: MUTED });
    return g;
  });

  // B1 (string): string once round the coin, then straight along a ruler; a ruler across
  const b1 = G(board);
  const U = 50, CR = 7.8 * U / TAU, CCX = 735, CCY = 300;   // the coin drawn to scale: C = 7.8 cm -> d = 2.48 cm
  const coin = objCoin(b1, CR); tr(coin, CCX, CCY);
  const ruler1 = mkRuler(b1, 8, { unit: U, readCol: RED }); tr(ruler1, CCX, 470);
  const ruler2 = mkRuler(b1, 3, { unit: U, readCol: RED, col: '#BFE6FF' }); tr(ruler2, CCX - CR, CCY);
  const strP = E('path', { d: '', fill: 'none', stroke: RED, 'stroke-width': 6, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, b1);
  const STRL = 7.8 * U;
  const strD = (wrap, unroll, drop) => {   // wrap 0..1 drawn round the coin; unroll 0..1 laid straight; drop 0..1 onto the ruler
    const pts = [], R = CR + 4, by = CCY + R + (470 - CCY - R) * drop;
    const arc = wrap * (1 - unroll) * 360, a0 = 90 + arc;
    if (drop < 0.02) for (let k = 0; k <= 72; k++) { const a = (a0 - arc * k / 72) * Math.PI / 180; pts.push([CCX + Math.cos(a) * R, CCY + Math.sin(a) * R]); }
    pts.push([CCX, by]); pts.push([CCX + STRL * wrap * unroll, by]);
    return 'M' + pts.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' L');
  };
  const rC = mkText(b1, BX, 604, 'round: {{C = 7.8 cm}}', { size: 34, anchor: 'middle', fill: INK });
  const rD = mkText(b1, BX, 656, 'across: {{d = 2.5 cm}}', { size: 34, anchor: 'middle', fill: INK });

  // B2 (more, divide, results, error): the measuring table
  const b2 = G(board);
  const TBL = [['Object', '{{C}} (cm)', '{{d}} (cm)', '{{C ÷ d}}'], ['coin', '7.8', '2.5', '3.12'], ['mug', '25.2', '8', '3.15'],
    ['plate', '81.6', '26', '3.14'], ['bike wheel', '207.5', '66', '3.14']];
  const tbl = mkTable(b2, TBL, { size: 30, ink: INK, colW: [170, 110, 100, 110], rowH: 60, fill: '#FFFFFF', headFill: 'rgba(46,125,216,0.16)' });
  tr(tbl, 665, 214);
  const hdrMark = tbl.mark(0, 3, 'rgba(255,228,92,0.6)');
  const colMarks = [1, 2, 3, 4].map(r => tbl.mark(r, 3, 'rgba(126,224,138,0.35)'));
  const errMarks = [1, 2].map(r => tbl.mark(r, 3, 'rgba(255,170,90,0.45)'));
  const divNote = mkText(b2, 840, 600, '**divide**: {{C ÷ d}}, every one', { size: 32, anchor: 'middle', fill: INK, boldFill: BLUE });
  const brace = mkBrace(b2, 1152, 530, 1048, 530, { col: GREEN, depth: 18 });
  const over3 = mkText(b2, 1156, 590, 'just over **3**', { size: 30, anchor: 'end', fill: GREEN });
  const cStretch = mkChip(b2, 'stretchy string', { size: 30, col: ORANGE, fill: '#FFF1E0' });
  const cRound = mkChip(b2, 'rounded readings', { size: 30, col: ORANGE, fill: '#FFF1E0' });
  tr(cStretch, 820, 590); tr(cRound, 820, 650);

  // B3 (me): pi = C / d, the same for every circle
  const b3 = G(board);
  mkMath(b3, BX, 322, 'π = C ÷ d', { size: 92, anchor: 'middle', fill: BLUE, weight: 700 });
  const cSame = mkChip(b3, 'the **same** for every circle', { size: 30, col: GREEN, fill: '#E6F7EC' }); tr(cSame, BX, 396);
  const meCoin = G(b3); tr(meCoin, 770, 530); objCoin(meCoin, 30);
  T(meCoin, 0, 76, 'coin', { size: 28, weight: 700, anchor: 'middle', fill: MUTED });
  const ferris = G(b3); tr(ferris, 1020, 515);
  E('path', { d: 'M0,0 L-58,118 M0,0 L58,118 M-74,118 L74,118', fill: 'none', stroke: '#5A6670', 'stroke-width': 8, 'stroke-linecap': 'round' }, ferris);
  const fSpin = G(ferris);
  E('circle', { r: 86, fill: 'none', stroke: '#2E5AAC', 'stroke-width': 6 }, fSpin);
  E('circle', { r: 70, fill: 'none', stroke: '#9FB2C2', 'stroke-width': 3 }, fSpin);
  let fsp = '';
  for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; fsp += `M0,0 L${(Math.cos(a) * 86).toFixed(1)},${(Math.sin(a) * 86).toFixed(1)} `; }
  E('path', { d: fsp, stroke: '#9FB2C2', 'stroke-width': 2.5 }, fSpin);
  const caps = [];
  for (let i = 0; i < 8; i++) caps.push(E('circle', { r: 11, fill: MK_COLS[i], stroke: SC_INK, 'stroke-width': 2 }, ferris));
  E('circle', { r: 9, fill: '#5A6670', stroke: SC_INK, 'stroke-width': 2 }, ferris);
  T(ferris, 0, 153, 'Ferris wheel', { size: 28, weight: 700, anchor: 'middle', fill: MUTED });

  // B4 (dad, repeat): 22/7 repeats, pi never does
  const b4 = G(board);
  const claimBig = mkMath(b4, BX, 330, 'π = 22/7 ?', { size: 72, anchor: 'middle', fill: RED, weight: 700 });
  const claimSmall = mkMath(b4, BX, 262, 'π = 22/7 ?', { size: 40, anchor: 'middle', fill: RED, weight: 700 });
  const MO = { size: 42, fill: INK, weight: 600 };
  const EQX = 790, Y1 = 390, Y2 = 480;
  const rowA = G(b4), rowB = G(b4);
  mkMath(rowA, EQX - 18, Y1, '22/7', Object.assign({ anchor: 'end' }, MO));
  mkMath(rowA, EQX, Y1, '=', Object.assign({ anchor: 'middle' }, MO));
  const a1 = mkMath(rowA, EQX + 18, Y1, '3.142857', MO);
  const gapW = textWidth('0', 42, FD, 600) * 0.6;
  const a2x = EQX + 18 + a1.w + gapW;
  const a2 = mkMath(rowA, a2x, Y1, '142857…', MO);
  mkMath(rowB, EQX - 18, Y2, 'π', Object.assign({ anchor: 'end' }, MO));
  mkMath(rowB, EQX, Y2, '=', Object.assign({ anchor: 'middle' }, MO));
  const b1n = mkMath(rowB, EQX + 18, Y2, '3.14159265…', MO);
  const blk = mkMeasure('142857', MO).w, w314 = mkMeasure('3.14', MO).w;
  const ul = [EQX + 18 + a1.w - blk, a2x].map(x => mkDash(E('path', { d: `M${x.toFixed(1)},${Y1 + 12} L${(x + blk).toFixed(1)},${Y1 + 12} M${x.toFixed(1)},${Y1 + 20} L${(x + blk).toFixed(1)},${Y1 + 20}`, fill: 'none', stroke: ORANGE, 'stroke-width': 4, 'stroke-linecap': 'round' }, b4)));
  const repNote = mkText(b4, 1120, Y1 + 58, '**repeats**', { size: 30, anchor: 'end', fill: ORANGE });
  const ring = [Y1, Y2].map((y, i) => {
    const x = EQX + 18 + mkMeasure(i ? '3.141' : '3.142', MO).w - mkMeasure(i ? '1' : '2', MO).w / 2;
    return E('ellipse', { cx: x, cy: y - 14, rx: 20, ry: 28, fill: 'none', stroke: RED, 'stroke-width': 4 }, b4);
  });
  // place the rings and underlines on the rendered glyphs (the fonts may load after the layout was measured)
  const fitB4 = () => {
    try {
      const ta = a1.querySelector('text'), tb = b1n.querySelector('text'), tc = a2.querySelector('text');
      const ea = ta.getExtentOfChar(4), eb = tb.getExtentOfChar(4);
      attr(ring[0], 'cx', ea.x + ea.width / 2); attr(ring[1], 'cx', eb.x + eb.width / 2);
      const s1 = ta.getStartPositionOfChar(2).x, e1 = ta.getEndPositionOfChar(7).x, s2 = tc.getStartPositionOfChar(0).x, e2 = tc.getEndPositionOfChar(5).x;
      [[s1, e1], [s2, e2]].forEach(([x0, x1], i) => attr(ul[i], 'd', `M${x0.toFixed(1)},${Y1 + 12} L${x1.toFixed(1)},${Y1 + 12} M${x0.toFixed(1)},${Y1 + 20} L${x1.toFixed(1)},${Y1 + 20}`));
    } catch (e) { /* not laid out yet */ }
  };
  const cIrr = mkChip(b4, '**irrational**: never ends, never repeats', { size: 28, col: BLUE, fill: '#E4EEFF' }); tr(cIrr, BX, 600);

  // B5 (which): which value of pi to use
  const b5 = G(board);
  const calcIcon = G(b5); tr(calcIcon, 712, 282, 0.82); scHandProp(calcIcon, 'calculator'); tr(calcIcon.firstChild, 0, 48);
  const pencilIcon = G(b5); tr(pencilIcon, 712, 440, 0.9, 30); scHandProp(pencilIcon, 'pencil');
  const exactIcon = G(b5); tr(exactIcon, 712, 588);
  E('circle', { r: 32, fill: '#E4EEFF', stroke: BLUE, 'stroke-width': 4 }, exactIcon);
  T(exactIcon, 0, 15, 'π', { size: 44, weight: 800, anchor: 'middle', fill: BLUE });
  const W1 = G(b5), W2 = G(b5), W3 = G(b5);
  mkText(W1, 768, 262, 'calculator:', { size: 28, fill: MUTED });
  mkText(W1, 768, 312, 'the **π button**', { size: 38, fill: INK, boldFill: BLUE });
  mkText(W2, 768, 408, 'no calculator:', { size: 28, fill: MUTED });
  mkText(W2, 768, 470, '{{3.14}}  or  {{22/7}}', { size: 38, fill: INK });
  mkText(W3, 768, 566, 'exact:', { size: 28, fill: MUTED });
  mkText(W3, 768, 616, 'leave the **π** in', { size: 38, fill: INK, boldFill: BLUE });

  // B6 (close, fine, pun): the circle closes; the number never ends
  const b6 = G(board);
  const OX = BX, OY = 345, OR = 112;
  const circP = mkDash(E('path', { d: `M${OX},${OY - OR} A${OR},${OR} 0 1 1 ${OX - 0.01},${OY - OR}`, fill: 'none', stroke: BLUE, 'stroke-width': 8, 'stroke-linecap': 'round' }, b6));
  const pen = G(b6); scHandProp(pen, 'pencil');
  const qMark = T(b6, OX, OY + 32, '?', { size: 96, weight: 800, anchor: 'middle', fill: RED });
  const okTick = tick(b6, 22, GREEN);
  const closes = mkText(b6, BX, 520, 'the **circle** closes', { size: 34, anchor: 'middle', fill: INK, boldFill: GREEN });
  const strip = G(b6);
  E('rect', { x: 668, y: 548, width: 484, height: 50, rx: 10, fill: '#0A1B27' }, strip);
  const stripClip = G(strip, { 'clip-path': _clipUrl('M674,548 L1146,548 L1146,598 L674,598 Z') });
  const stripTxt = T(stripClip, 680, 584, CI_PI, { size: 30, weight: 700, fill: GOLD, ls: 2 });
  const neverEnds = mkText(b6, BX, 652, 'the **number** never ends', { size: 34, anchor: 'middle', fill: INK, boldFill: ORANGE });
  const onAndOn = mkText(b6, BX, 652, 'he goes **on and on**…', { size: 34, anchor: 'middle', fill: INK, boldFill: ORANGE });

  /* ---------- chips, stamp, bubble ---------- */
  const cTen = pill(Lhud, '10 a.m.', { size: 34, color: GOLD, stroke: GOLD });
  const cClose = pill(Lover, '"Close enough!"', { size: 30, color: '#FF8A8A', stroke: '#FF8A8A' });
  const stHalf = ciStamp(Lover, false);
  const hoho = mkSpeechBubble(Lover, 'Ho ho!', { size: 34, tail: 'left' });

  /* ---------- cut points and Uncle Pi's digits ---------- */
  const cN = at('nobody') - 0.06, cF = at('fine') - 0.06, cL = at('laugh') - 0.06;
  const freeze0 = at('nobody'), freeze1 = at('fine');
  const creep = 0.04;
  const piDigits = t => {
    const d0 = at('divide');
    if (t < d0) return 24 + 2 * clamp(t / d0);
    const dA = mid('divide', 0.45), dB = end('divide');
    if (t < dB) return 26 + 6 * clamp((t - dA) / (dB - dA));
    const frozen = Math.max(0, Math.min(t, freeze1) - freeze0);
    const lA = mid('laugh', 0.4), lB = end('laugh');
    const base = 32 + creep * (Math.min(t, lA) - dB - frozen);
    if (t < lA) return base;
    if (t < lB) return lerp(base, 40, clamp((t - lA) / (lB - lA)));
    return 40 + creep * (t - lB);
  };

  /* slots: behind the table T1 / T2 / T3, in front F1 / F2 */
  const TY = 435, FY = 632;

  return t => {
    stall.upd(t);
    const who = scWho(S, t);
    const sN = on(t, cN, cF), sL = on(t, cL, 1e9);

    /* ---------- camera ---------- */
    if (sN) { const k = 1.9 + 0.15 * P(t, cN, end('nobody') + 0.5 - cN, linear); view(cam, k, 310, 395, 600, 375); }
    else if (sL) { const k = 1 + 0.06 * P(t, cL, end('laugh') + 0.6 - cL, linear); view(cam, k, 420, 420, 420, 420); }
    else view(cam, 1, 600, 375, 600, 375);

    /* ---------- Uncle Pi (T2) ---------- */
    const digits = piDigits(t);
    const frozen = t >= freeze0 && t < freeze1;
    const laughing = t >= at('laugh') && t < end('laugh') + 0.5;
    const bounce = laughing ? Math.abs(Math.sin((t - at('laugh')) * 9)) * 12 * AMP : 0;
    tr(pi, 310, 462 - bounce, 0.84);
    const mutter = (who === '' || who === 'narr') && !frozen ? 0.15 + 0.25 * Math.abs(Math.sin(t * 9)) : 0;
    let pl = 0.4;
    if (who === 'kavya') pl = -0.8; else if (who === 'priya' || who === 'dad' || who === 'boy') pl = 0.8; else if (who === 'tan') pl = -0.7;
    if (t >= at('which') && t < at('close')) pl = -0.7;
    let pm = 'happy';
    if (frozen) pm = 'shock';
    else if (t >= at('dad') && t < at('repeat')) pm = 'annoyed';
    pi.set({ t, talk: frozen ? 0.55 : Math.max(scTalk(S, t, 'pi'), mutter), mood: pm, look: frozen ? 0 : pl, digits, still: frozen });
    tr(pi.ticker, 310, 274, 0.9);

    /* ---------- Mr Tan (T1), from "error" ---------- */
    const tanUp = P(t, at('error') - 0.35, 0.35, pop);
    op(tan, t >= at('error') - 0.35 ? 1 : 0);
    tr(tan, 125, lerp(660, TY, tanUp), 0.95);
    const stampBeat = mid('repeat', 0.86);
    let tm = 'happy', tl = 0.5, lift = 0;
    if (t < at('dad')) { tm = 'neutral'; tl = 0.6; }
    else if (t < at('repeat')) { tm = 'deadpan'; tl = 0.8; }
    else if (t < at('which')) { tm = t < stampBeat ? 'neutral' : 'deadpan'; tl = 0.8; lift = t > stampBeat - 0.6 && t < stampBeat + 0.5 ? 1 : 0; }
    else if (t < at('close')) { tm = 'happy'; tl = 0.6; }
    else if (t < at('fine')) { tm = 'neutral'; tl = 0.8; }
    else if (t < at('pun')) { tm = 'neutral'; tl = -0.2; }
    else if (t < at('laugh')) { tm = 'happy'; tl = 0.3; }
    else { tm = 'happy'; tl = 0.6; }
    tan.set({ t, talk: scTalk(S, t, 'tan'), mood: tm, look: tl, lift });

    /* ---------- Dad (T3) for dad / repeat; Ah Boy (T3) from "close" ---------- */
    const dadIn = P(t, at('dad') - 0.35, 0.35, easeOut), dadOut = P(t, at('which') + 0.3, 0.3, easeIn);
    op(dad, t >= at('dad') - 0.35 && dadOut < 1 ? 1 : 0);
    tr(dad, 480, lerp(660, TY, dadIn - dadOut), 0.95);
    const stamped = t > stampBeat;
    dad.set({ t, talk: scTalk(S, t, 'dad'), mood: t < at('repeat') ? 'smug' : stamped ? 'sad' : 'neutral', look: who === 'pi' ? -0.8 : who === 'tan' ? -0.9 : -0.4, lift: t < at('repeat') ? 1 : 0 });
    const boyIn = P(t, at('close') - 0.3, 0.35, pop);
    op(boy, t >= at('close') - 0.3 ? 1 : 0);
    tr(boy, 480, lerp(660, 452, boyIn), 0.95);
    let bm = 'neutral', bl = 0.9;
    if (t >= at('nobody')) { bm = 'neutral'; bl = -0.8; }
    if (t >= at('fine')) { bm = 'happy'; bl = -0.6; }
    if (t >= at('pun')) { bm = 'deadpan'; bl = -0.9; }
    if (t >= at('laugh')) { bm = 'deadpan'; bl = -0.6; }
    boy.set({ t, talk: scTalk(S, t, 'boy'), mood: bm, look: bl, lift: t < end('close') + 0.2 ? 1 : 0 });

    /* ---------- Kavya (F1) and Priya (F2), customer side ---------- */
    tr(kav, 140, FY, 1.0);
    let km = 'neutral', kl = 0.5;
    if (who === 'kavya') { km = 'happy'; kl = 0.5; }
    else if (who === 'priya') { km = 'neutral'; kl = 0.9; }
    else if (who === 'dad') { km = 'deadpan'; kl = 0.9; }
    else if (who === 'tan') kl = -0.3;
    else if (who === 'boy') kl = 0.9;
    if (t >= at('results') && t < at('me')) km = 'happy';
    if (t >= at('repeat') && t < at('which')) { km = 'smug'; kl = 0.6; }
    if (t >= at('nobody') && t < at('fine')) { km = 'neutral'; kl = 0.4; }
    if (t >= at('fine') && t < at('pun')) { km = 'happy'; kl = 0.9; }
    if (t >= at('pun')) { km = 'deadpan'; kl = t >= at('laugh') ? 0.4 : -0.2; }
    kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
    tr(pri, 480, FY, 1.0);
    let prm = 'happy', prl = -0.4;
    if (who === 'kavya') prl = -0.9;
    if (t >= at('more') && t < at('divide')) { prm = 'smug'; prl = 0.4; }
    if (t >= at('error') && t < at('dad')) { prm = 'annoyed'; prl = -0.7; }
    if (t >= at('dad') && t < at('which')) { prm = t > stampBeat ? 'smug' : 'deadpan'; prl = -0.2; }
    if (t >= at('close')) { prm = 'neutral'; prl = -0.5; }
    if (t >= at('pun')) { prm = 'deadpan'; prl = -0.7; }
    pri.set({ t, talk: scTalk(S, t, 'priya'), mood: prm, look: prl, lift: (t >= at('more') && t < end('more') + 0.3) || (t >= at('error') && t < end('error') + 0.2) ? 1 : 0 });
    const strOn = t >= at('error') && t < at('dad');
    op(pPencil, strOn ? 0 : 1); op(pString, strOn ? 1 : 0);
    if (strOn) tr(pString, Math.sin(t * 7) * 3 * AMP, 0);

    /* ---------- the board ---------- */
    stage(b0, t, -1, at('string'));
    stage(b1, t, at('string'), at('more'));
    stage(b2, t, at('more'), at('me'));
    if (t >= at('error') - 0.05 && t < at('dad')) stage(b2, t, at('error'), at('dad'));
    stage(b3, t, at('me'), at('error'));
    stage(b4, t, at('dad'), at('which'));
    stage(b5, t, at('which'), at('close'));
    stage(b6, t, at('close'), 1e9);

    // B0
    OBJ.forEach((g, i) => op(g, P(t, mid('ten', 0.35 + 0.1 * i), 0.3, linear)));
    // B1: wrap, unroll, drop, across
    {
      const wrap = P(t, mid('string', 0.02), 0.25 * (end('string') - at('string')), ease);
      const unroll = P(t, mid('string', 0.26), 0.16 * (end('string') - at('string')), ease);
      const drop = P(t, mid('string', 0.44), 0.35, ease);
      attr(strP, 'd', strD(Math.max(0.001, wrap), unroll, drop));
      show(ruler1, t, mid('string', 0.2));
      ruler1.set(7.8, drop >= 1 ? 1 : 0);
      const acr = P(t, mid('string', 0.5), 0.3, linear);
      op(ruler2, acr); ruler2.set(2.48, t > mid('string', 0.58) ? 1 : 0);
      show(rC, t, mid('string', 0.62)); show(rD, t, mid('string', 0.74));
    }
    // B2
    {
      op(tbl.cells[1][0], 1); op(tbl.cells[1][1], 1); op(tbl.cells[1][2], 1);
      [2, 3, 4].forEach((r, i) => {
        const f = 0.03 + 0.26 * i;
        op(tbl.cells[r][0], P(t, mid('more', f), 0.25, linear));
        op(tbl.cells[r][1], P(t, mid('more', f + 0.08), 0.25, linear));
        op(tbl.cells[r][2], P(t, mid('more', f + 0.14), 0.25, linear));
      });
      hdrMark.set(t >= at('divide') && t < at('results') ? 0.6 + 0.4 * Math.sin(t * 6) : t >= at('results') ? 0.5 : 0);
      [1, 2, 3, 4].forEach((r, i) => {
        const p = P(t, mid('results', 0.04 + 0.17 * i), 0.3, linear);
        op(tbl.cells[r][3], p); colMarks[i].set(t < at('error') ? p : 0.25);
      });
      op(divNote, t >= at('divide') && t < at('results') + 0.2 ? P(t, mid('divide', 0.25), 0.3, linear) * (1 - P(t, at('results'), 0.2, linear)) : 0);
      const bp = P(t, mid('results', 0.74), 0.35, linear);
      brace.set(bp); op(over3, bp);
      // measuring errors: the 3.12 and the 3.15 wobble
      const errOn = t >= at('error');
      errMarks.forEach((m, i) => { m.set(errOn ? P(t, mid('error', 0.3), 0.3, linear) : 0); });
      [1, 2].forEach(r => tr(tbl.cells[r][3], errOn && t > mid('error', 0.3) ? Math.sin(t * 16 + r) * 4 * AMP : 0, 0));
      cStretch.set(errOn ? P(t, mid('error', 0.5), 0.35, linear) : 0);
      cRound.set(errOn ? P(t, mid('error', 0.62), 0.35, linear) : 0);
    }
    // B3
    {
      cSame.set(P(t, mid('me', 0.5), 0.35, linear));
      op(meCoin, P(t, mid('me', 0.5), 0.3, linear));
      op(ferris, P(t, mid('me', 0.58), 0.3, linear));
      const rot = (t * 20 * AMP) % 360;
      tr(fSpin, 0, 0, 1, rot);
      caps.forEach((c, i) => { const a = (i / 8 * 360 + rot) * Math.PI / 180; attr(c, 'cx', Math.cos(a) * 86); attr(c, 'cy', Math.sin(a) * 86 + 8); });
    }
    // B4
    if (t >= at('repeat') - 0.3 && t < at('which') + 0.3) fitB4();
    {
      const rep = t >= at('repeat');
      op(claimBig, rep ? 0 : P(t, mid('dad', 0.3), 0.3, linear));
      op(claimSmall, rep ? 1 : 0);
      show(rowA, t, mid('repeat', 0.03));
      ul.forEach((u, i) => mkDraw(u, P(t, mid('repeat', 0.2 + 0.12 * i), 0.35, linear)));
      show(repNote, t, mid('repeat', 0.42));
      show(rowB, t, mid('repeat', 0.55));
      ring.forEach(r => op(r, P(t, mid('repeat', 0.66), 0.25, linear)));
      cIrr.set(P(t, mid('repeat', 0.76), 0.35, linear));
    }
    // B5
    show(W1, t, mid('which', 0.02)); show(calcIcon, t, mid('which', 0.02));
    show(W2, t, mid('which', 0.3)); show(pencilIcon, t, mid('which', 0.3));
    show(W3, t, mid('which', 0.6)); show(exactIcon, t, mid('which', 0.6));
    // B6
    {
      const dp = t < at('fine') ? 0.9 * P(t, at('close') + 0.1, (end('close') - at('close')) * 0.8, ease) : 0.9 + 0.1 * P(t, mid('fine', 0.08), 0.5, ease);
      mkDraw(circP, dp);
      const a = (-90 + 360 * dp) * Math.PI / 180;
      tr(pen, OX + Math.cos(a) * OR, OY + Math.sin(a) * OR, 0.8, 20);
      op(pen, dp > 0 && dp < 0.999 ? 1 : 0);
      op(qMark, t > mid('close', 0.6) && t < mid('fine', 0.1) ? 1 : 0);
      op(okTick, t > mid('fine', 0.2) ? 1 : 0); tr(okTick, OX, OY - OR - 4);
      show(closes, t, mid('fine', 0.22));
      show(strip, t, mid('fine', 0.45));
      tr(stripTxt, -Math.max(0, t - mid('fine', 0.45)) * 70, 0);
      op(neverEnds, t < at('pun') ? P(t, mid('fine', 0.55), 0.3, linear) : 0);
      op(onAndOn, P(t, mid('pun', 0.55), 0.3, linear));
    }

    /* ---------- chips, stamp, bubble ---------- */
    op(cTen, 0);
    if (t < at('string')) popIn(cTen, t, mid('ten', 0.05), 880, 60);
    op(cClose, 0);
    if (t >= mid('dad', 0.7) && t < at('repeat')) popIn(cClose, t, mid('dad', 0.7), 910, 470);
    stHalf.set(t >= stampBeat && t < at('which') + 0.25 ? P(t, stampBeat, 0.35, linear) : 0); tr(stHalf, 480, 222, 0.45);
    hoho.set(laughing ? P(t, at('laugh'), 0.35, linear) : t >= end('laugh') + 0.5 ? 1 : 0); tr(hoho, 445, 214);
  };
});
