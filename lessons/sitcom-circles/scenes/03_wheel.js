/* Scene 3: Guess the roll (circumference).
   11 a.m., the GUESS THE ROLL stall: Mr Tan's bicycle wheel, d = 70 cm, one turn: more or less than 2 m? ->
   Priya: "Less." -> Dad: pi is 3, 3 x 70 = 210 cm, "Close enough!" -> the hall floor: the wheel rolls exactly one
   turn along a tape, the valve dot traces its arch and lands at pi x 70 = 219.9 cm, past the 2 m flag (three d's
   and a bit); Uncle Pi pops up -> back at the stall: 10 cm short, HALF-BAKED on Dad -> Ah Boy: Cherry Pie
   Delicious, C = pi d -> the whiteboard: Rad lies on the radius, d = 2r so C = 2 pi r; r = 4.5 cm: C = 9 pi cm,
   = 28.27... = 28.3 cm (1 d.p.), check 3 x 9 = 27 -> the Singapore Flyer, 150 m across: one lap = 471 m ->
   the school pond, C = 40 m: Dad: 40 / pi = 12.7 m "Close enough!" -> Dee barges in across the pond: C / pi is
   the DIAMETER, HALF-BAKED -> Kavya: r = C / 2 pi = 40 / 2 pi = 6.4 m, Rad on the radius, EASY AS PI. */
scene('wheel', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 3, color: o.color || C.ink, weight: 700 }); };
  const GOLD = '#FFE45C', INK = MK.ink, BLUE = '#2E5AAC', ORANGE = '#E8751A', RED = '#D32F2F', GREEN = '#1E9E5A', BERRY = '#B8336A';
  // a line of working that fades in at t0 (and out at t1)
  const line = (el, t, t0, t1) => { const p = P(t, t0, 0.3, easeOut), q = t1 === undefined ? 1 : 1 - P(t, t1 - 0.15, 0.15, linear); op(el, t >= t0 - 0.01 ? Math.min(p, q) : 0); tr(el, 0, 10 * (1 - p)); };
  // a row of working aligned on its relation sign at x
  const eqRow = (parent, x, y, l, o, r, sz, col) => {
    const g = G(parent), f = col || INK;
    if (l) mkMath(g, x - sz * 0.62, y, l, { size: sz, anchor: 'end', fill: f, weight: 700 });
    if (o) mkMath(g, x, y, o, { size: sz, anchor: 'middle', fill: f, weight: 700 });
    if (r) mkText(g, x + sz * 0.62, y, r, { size: sz, fill: f, anchor: 'start', weight: 700, mathScale: 1 });
    return g;
  };
  const txt = (parent, x, y, str, o) => mkText(parent, x, y, str, Object.assign({ size: 34, anchor: 'middle', fill: INK, boldFill: BERRY, weight: 700 }, o || {}));
  const home = (c, layer) => { if (c.parentNode !== layer) layer.appendChild(c); };
  // a rod character lying along a radius/diameter: (cx, cy) = the circle's centre, a = degrees from "up", clockwise
  const rodAt = (c, cx, cy, s, a, off) => { const r = a * Math.PI / 180; tr(c, cx + off * s * Math.sin(r), cy - off * s * Math.cos(r), s, a); };

  /* layers */
  const Lset = G(root), Lcast = G(root), Lfront = G(root), Lshot = G(root), Lbcast = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= A: the GUESS THE ROLL stall ================= */
  const stallG = G(Lset);
  const stall = ciStall(stallG, { title: 'GUESS THE ROLL', col: '#2FA36B', sub: "Mr Tan's bike" });
  Lfront.appendChild(stall.front); Lfront.appendChild(stall.top);
  const WX = 560, WY = 360, WR = 95;
  const standG = G(stall.top);
  E('path', { d: `M${WX - 70},526 L${WX},${WY} L${WX + 70},526`, fill: 'none', stroke: '#5A6670', 'stroke-width': 9, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, standG);
  E('rect', { x: WX - 92, y: 518, width: 184, height: 14, rx: 6, fill: '#8F9CAB', stroke: SC_INK, 'stroke-width': 3 }, standG);
  const sWheel = ciWheel(standG, WR);
  tr(sWheel, WX, WY);
  const sDia = mkDash(E('line', { x1: WX - WR, y1: WY, x2: WX + WR, y2: WY, stroke: RED, 'stroke-width': 7, 'stroke-linecap': 'round' }, standG));
  const sDiaEnds = G(standG);
  [-1, 1].forEach(sd => E('circle', { cx: WX + sd * WR, cy: WY, r: 8, fill: RED, stroke: SC_INK, 'stroke-width': 2 }, sDiaEnds));
  const cEleven = pill(Lhud, '11 a.m.', { size: 32, color: GOLD, stroke: GOLD });
  const cD70 = mkChip(Lfg, '{{d = 70}} cm', { size: 32, col: RED, fill: '#FFF0F0', textCol: INK });
  const cQ = mkChip(Lfg, 'one turn: **more** or **less** than {{2}} m?', { size: 32, col: '#1E7A4A', fill: '#E6F7EC', textCol: INK });
  const bLess = mkSpeechBubble(Lfg, '**LESS.**', { size: 38, tail: 'down' });
  const cDad = mkChip(Lfg, '{{π = 3}}, so {{3 × 70 = 210}} cm', { size: 32, col: RED, fill: '#FFE4E4', textCol: INK });
  const cClose = pill(Lfg, '"Close enough!"', { size: 30, color: '#FF8A8A', stroke: '#FF8A8A' });
  const cShort = mkChip(Lfg, '{{219.9 − 210 ≈ 10}} cm **short**', { size: 32, col: RED, fill: '#FFE4E4', textCol: INK });
  const cOnce = mkChip(Lfg, 'π button · round **once**, at the **end**', { size: 30, col: GOLD, solid: true });
  const stHalf1 = ciStamp(Lfg, false);
  // Ah Boy's mnemonic card
  const cherry = G(Lfg);
  E('rect', { x: -300, y: -70, width: 600, height: 140, rx: 18, fill: MK.paper, stroke: '#C2410C', 'stroke-width': 5 }, cherry);
  mkText(cherry, 0, -14, '**C**herry  **P**ie  **D**elicious', { size: 42, anchor: 'middle', fill: INK, boldFill: '#C62828', weight: 700 });
  mkText(cherry, 0, 48, '→  {{C = πd}}', { size: 44, anchor: 'middle', fill: '#C62828', weight: 800 });

  /* ================= R: the roll (hall floor) ================= */
  const rollG = G(Lshot);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#E6EEDF', '#D5E2CC', true) }, rollG);
  ciArchWindow(rollG, 70, 150, 110, 190); ciArchWindow(rollG, 1010, 150, 110, 190);
  E('rect', { x: 0, y: 420, width: 1200, height: 22, fill: '#B9C7AE' }, rollG);
  E('rect', { x: 0, y: 442, width: 1200, height: 308, fill: linGrad('#D9A86A', '#B9843F', true) }, rollG);
  E('path', { d: 'M0,470 L1200,470 M0,505 L1200,505 M0,615 L1200,615 M0,668 L1200,668', stroke: '#A8763A', 'stroke-width': 2 }, rollG);
  const X0 = 150, KP = 3.6, FL = 540, RR = 35 * KP;     // 3.6 px per cm; the wheel's radius is 35 cm
  const xc = cm => X0 + cm * KP;
  // the 2 m flag (behind the wheel)
  E('line', { x1: xc(200), y1: FL, x2: xc(200), y2: 228, stroke: '#5A6670', 'stroke-width': 6, 'stroke-linecap': 'round' }, rollG);
  E('rect', { x: xc(200) - 82, y: 230, width: 80, height: 44, rx: 4, fill: '#E8424F', stroke: SC_INK, 'stroke-width': 3 }, rollG);
  T(rollG, xc(200) - 42, 262, '2 m', { size: 28, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  // the tape along the floor
  E('rect', { x: X0 - 12, y: FL + 6, width: 250 * KP + 34, height: 46, rx: 4, fill: '#FFD24A', stroke: SC_INK, 'stroke-width': 3 }, rollG);
  let ticks = '';
  for (let cm = 0; cm <= 250; cm += 10) ticks += `M${xc(cm).toFixed(1)},${FL + 6} L${xc(cm).toFixed(1)},${FL + (cm % 50 ? 14 : 20)} `;
  E('path', { d: ticks, stroke: SC_INK, 'stroke-width': 2.5 }, rollG);
  [0, 50, 100, 150, 200, 250].forEach(cm => T(rollG, xc(cm), FL + 45, String(cm), { size: 26, weight: 700, anchor: 'middle', fill: SC_INK }));
  T(rollG, xc(250) + 34, FL + 45, 'cm', { size: 26, weight: 700, fill: '#5A4A52' });
  // the chalk line (contact) and the valve dot's arch
  const contact = E('line', { x1: X0, y1: FL, x2: X0, y2: FL, stroke: '#FFFFFF', 'stroke-width': 6, 'stroke-linecap': 'round' }, rollG);
  let cyc = '';
  for (let i = 0; i <= 72; i++) { const th = i / 72 * TAU; cyc += (i ? ' L' : 'M') + (X0 + RR * (th - Math.sin(th))).toFixed(1) + ',' + (FL - RR * (1 - Math.cos(th))).toFixed(1); }
  const cycP = mkDash(E('path', { d: cyc, fill: 'none', stroke: '#E8424F', 'stroke-width': 4, 'stroke-dasharray': '1 1' }, rollG));
  const valveMark = G(rollG);
  E('path', { d: `M${xc(219.9)},${FL + 2} L${xc(219.9) - 10},${FL - 16} L${xc(219.9) + 10},${FL - 16} Z`, fill: '#E8424F', stroke: SC_INK, 'stroke-width': 2 }, valveMark);
  E('line', { x1: xc(219.9), y1: FL + 6, x2: xc(219.9), y2: FL + 52, stroke: '#E8424F', 'stroke-width': 5 }, valveMark);
  // three diameters and a bit
  const braces = [0, 1, 2].map(k => mkBrace(rollG, xc(70 * k) + 3, FL + 60, xc(70 * k + 70) - 3, FL + 60, { flip: true, text: '{{d}}', col: BLUE, size: 30, depth: 18 }));
  const bit = E('rect', { x: xc(210), y: FL + 8, width: xc(219.9) - xc(210), height: 42, fill: 'rgba(232,66,79,0.45)' }, rollG);
  const cBit = txt(rollG, 1035, FL + 116, 'just over {{3d}}', { size: 30, fill: BLUE, boldFill: BLUE });
  const rWheel = ciWheel(rollG, RR);
  const rT1 = txt(rollG, 600, 138, 'one turn = one **circumference**', { size: 36 });
  const rT2 = txt(rollG, 600, 204, '{{C = πd = π × 70 ≈ 219.9}} cm', { size: 42, fill: '#1E5A36' });
  const rLab = txt(rollG, xc(219.9) + 30, 276, '{{219.9}} cm', { size: 32, fill: '#C62828' });

  /* ================= B: the whiteboard ================= */
  const boardG = G(Lshot);
  const wb = mkWhiteboard(boardG, 1100, 520); tr(wb, 600, 410);
  const BX = 330, BY = 410, BR = 150;
  E('circle', { cx: BX, cy: BY, r: BR, fill: 'rgba(46,125,216,0.08)', stroke: BLUE, 'stroke-width': 6 }, boardG);
  const bCirc = mkDash(E('circle', { cx: BX, cy: BY, r: BR + 1, fill: 'none', stroke: RED, 'stroke-width': 10, transform: `rotate(-90 ${BX} ${BY})` }, boardG));
  E('circle', { cx: BX, cy: BY, r: 7, fill: INK }, boardG);
  const bRlab = txt(boardG, BX + BR + 16, BY + 12, '{{r = 4.5}} cm', { size: 30, fill: ORANGE, anchor: 'start' });
  const bCl = txt(boardG, BX, BY - BR - 22, '**C** = all the way round', { size: 28, boldFill: RED });
  const EX = 820;
  const bR1 = eqRow(boardG, EX, 262, 'd', '=', '{{2r}}', 46);
  const bR2 = eqRow(boardG, EX, 362, 'C', '=', '{{πd = 2πr}}', 50, BLUE);
  const bR2ring = E('rect', { x: EX + 21, y: 318, width: 262, height: 62, rx: 10, fill: 'none', stroke: GREEN, 'stroke-width': 5 }, boardG);
  const bE1 = eqRow(boardG, EX, 250, 'C', '=', '{{2 × π × 4.5}}', 42);
  const bE2 = eqRow(boardG, EX, 330, '', '=', '{{9π}} cm', 46, BLUE);
  const bE2ring = E('rect', { x: EX + 22, y: 290, width: 156, height: 56, rx: 10, fill: 'none', stroke: GREEN, 'stroke-width': 5 }, boardG);
  const cExact = mkChip(boardG, '**exact**: in terms of {{π}}', { size: 30, col: BLUE, fill: '#E3ECFF', textCol: INK });
  tr(cExact, 860, 420);
  const bE3 = eqRow(boardG, EX, 420, '', '=', '{{28.27…}}', 42);
  const bE4 = eqRow(boardG, EX, 500, '', '≈', '{{28.3}} cm (1 d.p.)', 42, GREEN);
  const bE5 = txt(boardG, 860, 580, 'check: {{3 × 9 = 27}} ✓ just over', { size: 30, fill: '#5A4A52', boldFill: GREEN });

  /* ================= F: the Singapore Flyer ================= */
  const flyG = G(Lshot);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#FFB98A', '#BFE6FF', true) }, flyG);
  E('circle', { cx: 980, cy: 110, r: 120, fill: glow('#FFE45C'), opacity: 0.7 }, flyG);
  let sky = '';
  [[680, 520, 50, 120], [740, 470, 40, 170], [790, 500, 60, 140], [860, 440, 44, 200], [910, 490, 70, 150], [1090, 480, 60, 160], [40, 540, 70, 100]].forEach(([x, y, w, h]) => { sky += `M${x},${y} h${w} v${h} h${-w} Z `; });
  E('path', { d: sky, fill: '#7A8CA8', opacity: 0.55 }, flyG);
  E('rect', { x: 0, y: 610, width: 1200, height: 140, fill: linGrad('#4C8FC4', '#2E5A8C', true) }, flyG);
  const FX = 410, FY = 350, FR = 230;
  E('path', { d: `M${FX},${FY} L${FX - 140},640 M${FX},${FY} L${FX + 140},640 M${FX - 100},560 L${FX + 100},560`, stroke: '#E6EBEF', 'stroke-width': 12, 'stroke-linecap': 'round' }, flyG);
  E('rect', { x: FX - 220, y: 630, width: 440, height: 40, rx: 8, fill: '#C9D3DC', stroke: '#7D8A96', 'stroke-width': 3 }, flyG);
  let fsp = '';
  for (let i = 0; i < 24; i++) { const a = i / 24 * TAU; fsp += `M${FX},${FY} L${(FX + Math.cos(a) * FR).toFixed(1)},${(FY + Math.sin(a) * FR).toFixed(1)} `; }
  E('path', { d: fsp, stroke: '#FFFFFF', 'stroke-width': 2, opacity: 0.8 }, flyG);
  E('circle', { cx: FX, cy: FY, r: FR, fill: 'none', stroke: '#F4F7FA', 'stroke-width': 10 }, flyG);
  E('circle', { cx: FX, cy: FY, r: FR - 14, fill: 'none', stroke: '#C9D3DC', 'stroke-width': 4 }, flyG);
  let caps = '';
  for (let i = 0; i < 28; i++) { const a = i / 28 * TAU, x = FX + Math.cos(a) * (FR + 10), y = FY + Math.sin(a) * (FR + 10); caps += `M${(x - 12).toFixed(1)},${y.toFixed(1)} a12,8 0 1 0 24,0 a12,8 0 1 0 -24,0 Z `; }
  E('path', { d: caps, fill: '#BFE6FF', stroke: '#5A6670', 'stroke-width': 2 }, flyG);
  E('circle', { cx: FX, cy: FY, r: 24, fill: '#C9D3DC', stroke: '#5A6670', 'stroke-width': 4 }, flyG);
  const fLap = mkDash(E('circle', { cx: FX, cy: FY, r: FR + 10, fill: 'none', stroke: GOLD, 'stroke-width': 9, transform: `rotate(90 ${FX} ${FY})` }, flyG));
  const fDia = G(flyG);
  E('line', { x1: FX - FR, y1: FY, x2: FX + FR, y2: FY, stroke: RED, 'stroke-width': 7, 'stroke-linecap': 'round' }, fDia);
  const fDl = mkChip(fDia, '{{d = 150}} m', { size: 30, col: RED, fill: '#FFFFFF', textCol: INK });
  tr(fDl, FX, FY - 50);
  const rider = G(flyG);
  E('ellipse', { rx: 22, ry: 15, fill: GOLD, stroke: SC_INK, 'stroke-width': 3 }, rider);
  // Uncle Pi's capsule cut-out
  const capsule = G(flyG); tr(capsule, 1000, 430);
  E('ellipse', { rx: 175, ry: 150, fill: 'rgba(191,230,255,0.55)', stroke: '#5A6670', 'stroke-width': 10 }, capsule);
  E('path', { d: 'M-175,0 L175,0', stroke: '#5A6670', 'stroke-width': 4, opacity: 0.5 }, capsule);
  E('path', { d: 'M0,-150 L0,-200', stroke: '#E6EBEF', 'stroke-width': 10 }, capsule);
  const fCard = G(flyG);
  E('rect', { x: 640, y: 120, width: 330, height: 150, rx: 16, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 4 }, fCard);
  const fT1 = txt(fCard, 805, 178, 'one lap = {{π × 150}}', { size: 34 });
  const fT2 = txt(fCard, 805, 246, '{{≈ 471}} m', { size: 44, fill: GREEN });
  const cWhee = pill(Lfg, 'Wheee!', { size: 32, color: GOLD, stroke: GOLD });

  /* ================= Pd: the school pond ================= */
  const pondG = G(Lshot);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad(CI_COL.grass, CI_COL.grassDk, true) }, pondG);
  const gr = rng(16);
  let tufts = '';
  for (let i = 0; i < 40; i++) { const x = gr() * 1200, y = 120 + gr() * 600; tufts += `M${x.toFixed(0)},${y.toFixed(0)} l-6,-14 M${(x + 6).toFixed(0)},${y.toFixed(0)} l0,-18 M${(x + 12).toFixed(0)},${y.toFixed(0)} l6,-14 `; }
  E('path', { d: tufts, stroke: '#2F8A3C', 'stroke-width': 3, 'stroke-linecap': 'round', opacity: 0.6 }, pondG);
  const PX = 330, PY = 400, PR = 160;
  E('circle', { cx: PX, cy: PY, r: PR + 10, fill: '#A8A08A', stroke: '#7A705A', 'stroke-width': 4 }, pondG);
  E('circle', { cx: PX, cy: PY, r: PR, fill: linGrad('#4CC9F0', '#1D84A6', true), stroke: '#1D6E8C', 'stroke-width': 4 }, pondG);
  [[-70, -60, 22], [60, 70, 26], [80, -50, 18], [-50, 80, 16]].forEach(([x, y, r]) => E('path', { d: `M${PX + x},${PY + y} m${r},0 A${r},${r} 0 1 1 ${PX + x + r * 0.7},${PY + y - r * 0.7} L${PX + x},${PY + y} Z`, fill: '#3FA463', stroke: '#22844A', 'stroke-width': 2 }, pondG));
  const pTape = E('circle', { cx: PX, cy: PY, r: PR + 12, fill: 'none', stroke: '#FFD24A', 'stroke-width': 9, 'stroke-dasharray': '18 8' }, pondG);
  const cC40 = mkChip(pondG, '{{C = 40}} m round', { size: 30, col: '#B8860B', fill: '#FFF6D6', textCol: INK });
  tr(cC40, PX, PY - PR - 46);
  E('circle', { cx: PX, cy: PY, r: 6, fill: '#FFFFFF' }, pondG);
  const pCard = G(pondG);
  E('rect', { x: 646, y: 126, width: 520, height: 424, rx: 16, fill: 'rgba(0,0,0,0.22)' }, pCard);
  E('rect', { x: 640, y: 120, width: 520, height: 424, rx: 16, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 4 }, pCard);
  const PEX = 860;
  const pR1 = eqRow(pCard, PEX, 190, 'C', '=', '{{40}} m', 44);
  const pR2 = txt(pCard, 900, 270, 'radius: {{r = ?}}', { size: 40, fill: BLUE });
  const pD1 = eqRow(pCard, PEX, 270, '40 ÷ π', '≈', '{{12.7}} m', 42, '#C62828');
  const pDstrike = strike(pCard, 690, 256, 1110, RED);
  const pD2 = txt(pCard, 900, 348, '{{C ÷ π}} = the **diameter**', { size: 36, boldFill: BLUE });
  const pK1 = eqRow(pCard, PEX, 270, 'r', '=', '{{C ÷ 2π}}', 44, BLUE);
  const pK2 = eqRow(pCard, PEX, 350, '', '=', '{{40 ÷ 2π}}', 44);
  const pK3 = eqRow(pCard, PEX, 430, '', '≈', '{{6.4}} m', 46, GREEN);
  const pK3ring = E('rect', { x: PEX + 22, y: 388, width: 146, height: 60, rx: 10, fill: 'none', stroke: GREEN, 'stroke-width': 5 }, pCard);
  const cClose2 = pill(Lfg, '"Close enough!"', { size: 30, color: '#FF8A8A', stroke: '#FF8A8A' });
  const cAcross = mkChip(Lfg, '"**across**"?', { size: 32, col: '#2E7DD8', fill: '#E3F1FF', textCol: INK });
  const stHalf2 = ciStamp(Lfg, false), stEasy = ciStamp(Lfg, true);

  /* ================= the cast ================= */
  const tan = cast(Lcast, 'tan'), priya = cast(Lcast, 'priya'), dad = cast(Lcast, 'dad');
  const boy = cast(Lfg, 'boy'), kav = cast(Lbcast, 'kavya'), mum = cast(Lbcast, 'mum', { prop: null });
  const pi = cast(Lfg, 'pi'), rad = cast(Lbcast, 'rad'), dee = cast(Lbcast, 'dee');
  const ALL = [tan, priya, dad, boy, kav, mum, pi, rad, dee];
  // Uncle Pi is muttering between pi.laugh (40) and slice.laugh (48)
  const piDigits = t => 40.3 + t * 0.012;

  /* cuts */
  const cR = at('roll') - 0.06, cA2 = at('short') - 0.06, cB = at('rad') - 0.06, cF = at('flyer') - 0.06, cP = at('pond') - 0.06;

  return t => {
    const sA = on(t, -1, cR) || on(t, cA2, cB), sR = on(t, cR, cA2), sB = on(t, cB, cF), sF = on(t, cF, cP), sP = on(t, cP, 1e9);
    const who = scWho(S, t), digits = piDigits(t);
    ALL.forEach(c => op(c, 0));
    op(stallG, sA); op(Lfront, sA); op(rollG, sR); op(boardG, sB); op(flyG, sF); op(pondG, sP);
    op(cEleven, 0); [cD70, cQ, bLess, cDad, cShort, cOnce, cExact, cAcross].forEach(c => c.set(0));
    op(cClose, 0); op(cClose2, 0); op(cWhee, 0); stHalf1.set(0); stHalf2.set(0); stEasy.set(0); op(cherry, 0);

    /* ---------------- A: the stall ---------------- */
    if (sA) {
      stall.upd(t);
      sWheel.set((t * 20 * AMP) % 360);
      const first = t < cR;
      if (first) popIn(cEleven, t, at('eleven') + 0.2, 1040, 60);
      // the diameter across the wheel
      const dp = first ? P(t, mid('wheel', 0.25), 0.5, ease) : 1;
      mkDraw(sDia, dp); op(sDia, dp > 0 ? 1 : 0); op(sDiaEnds, dp >= 1 ? 1 : 0);
      if (t >= mid('wheel', 0.3) && t < at('short')) { cD70.set(P(t, mid('wheel', 0.3), 0.35, linear)); tr(cD70, WX, 232); }
      if (t >= mid('wheel', 0.55) && t < at('dad')) { cQ.set(P(t, mid('wheel', 0.55), 0.35, linear)); tr(cQ, 600, 628); }
      if (t >= at('less') && t < at('dad')) { bLess.set(P(t, at('less') + 0.1, 0.35, linear)); tr(bLess, 790, 250); }
      if (t >= at('dad') && t < end('dad') + 0.2) {
        cDad.set(P(t, mid('dad', 0.35), 0.35, linear)); tr(cDad, 870, 232);
        if (t > mid('dad', 0.72)) popIn(cClose, t, mid('dad', 0.72), 990, 640);
      }
      // second visit: 10 cm short, HALF-BAKED, Cherry Pie Delicious
      if (!first && t < at('cherry')) {
        cShort.set(P(t, mid('short', 0.08), 0.35, linear)); tr(cShort, WX, 232);
        cOnce.set(P(t, mid('short', 0.55), 0.35, linear)); tr(cOnce, 520, 632);
        stHalf1.set(P(t, mid('short', 0.3), 0.35, linear)); tr(stHalf1, 985, 632, 0.42);
      }
      if (t >= at('cherry') - 0.2) {
        const p = P(t, at('cherry') + 0.1, 0.45, pop);
        op(cherry, clamp(p * 2.5)); tr(cherry, 540, 620, Math.max(0.01, 0.6 + 0.4 * p));
      }
      // Mr Tan
      op(tan, 1); home(tan, Lcast); tr(tan, 250, 446, 1.0);
      let tm = 'happy', tl = 0.5, lift = 0;
      if (t >= at('less') && t < at('dad')) { tm = 'neutral'; tl = 0.9; }
      if (t >= at('dad') && t < cR) { tm = 'deadpan'; tl = 0.9; }
      if (!first) { tm = t < at('cherry') ? 'deadpan' : 'happy'; tl = 0.9; lift = t < at('cherry') ? (t < mid('short', 0.3) ? P(t, at('short'), 0.3, ease) : t < mid('short', 0.55) ? 1 : 0) : 0; }
      tan.set({ t, talk: scTalk(S, t, 'tan'), mood: tm, look: tl, lift });
      // Priya
      op(priya, 1); home(priya, Lcast); tr(priya, 770, 462, 0.96);
      let pm = 'neutral', pl = -0.8;
      if (t >= at('less') && t < at('dad')) { pm = 'smug'; pl = 0; }
      if (t >= at('dad') && t < cR) { pm = 'smug'; pl = 0.8; }
      if (!first) { pm = t < at('cherry') ? 'annoyed' : 'deadpan'; pl = t < at('cherry') ? -0.6 : 0.8; }
      priya.set({ t, talk: scTalk(S, t, 'priya'), mood: pm, look: pl });
      // Dad
      op(dad, 1); home(dad, Lcast); tr(dad, 990, 446, 1.0);
      let dm = 'happy', dl = -0.6, dlift = 0;
      if (t >= at('wheel') && t < at('dad')) { dm = 'neutral'; dl = -0.8; }
      if (t >= at('dad') && t < cR) { dm = 'smug'; dl = -0.2; dlift = t < end('dad') ? 1 : 0; }
      if (!first) { dm = t > mid('short', 0.3) ? 'sad' : 'neutral'; dl = -0.8; if (t >= at('cherry')) { dm = 'deadpan'; dl = 0.4; } }
      dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: dl, lift: dlift });
      // Ah Boy pops up, customer side
      if (!first && t >= at('cherry') - 0.3) {
        op(boy, 1); home(boy, Lfg);
        const up = P(t, at('cherry') - 0.3, 0.4, pop);
        tr(boy, 1065, lerp(820, 620, up), 1.0);
        boy.set({ t, talk: scTalk(S, t, 'boy'), mood: 'happy', look: -0.6, lift: 1 });
      }
    }

    /* ---------------- R: one turn of the wheel ---------------- */
    if (sR) {
      const rp = P(t, at('roll') + 0.3, (end('roll') - at('roll')) * 0.5, ease);
      const cx = X0 + 219.9 * KP * rp;
      tr(rWheel, cx, FL - RR); rWheel.set(360 * rp);
      attr(contact, 'x2', cx);
      mkDraw(cycP, rp);
      op(valveMark, rp >= 1 ? 1 : 0);
      line(rT1, t, at('roll') + 0.15); line(rT2, t, mid('roll', 0.5));
      line(rLab, t, mid('roll', 0.6));
      braces.forEach((b, k) => b.set(P(t, mid('roll', 0.62) + k * 0.25, 0.3, linear)));
      op(bit, P(t, mid('roll', 0.82), 0.3, linear)); op(cBit, P(t, mid('roll', 0.86), 0.3, linear));
      op(pi, 1); home(pi, Lfg);
      const up = P(t, at('roll') - 0.06, 0.45, pop);
      tr(pi, 1082, lerp(-120, 150, up), 0.38);
      pi.set({ t, talk: scTalk(S, t, 'pi'), mood: 'happy', look: -0.8, digits });
    }

    /* ---------------- B: the whiteboard ---------------- */
    if (sB) {
      const cp = P(t, at('rad') + 0.2, 1.0, ease);
      mkDraw(bCirc, cp); op(bCirc, t < at('exact') && cp > 0 ? 1 : 0);
      op(bCl, t < at('exact') ? P(t, at('rad') + 0.3, 0.3, linear) : 0);
      line(bR1, t, mid('rad', 0.35), at('exact')); line(bR2, t, mid('rad', 0.6), at('exact'));
      op(bR2ring, t >= mid('rad', 0.8) && t < at('exact') ? 1 : 0);
      op(bRlab, P(t, at('exact') + 0.1, 0.3, linear));
      line(bE1, t, mid('exact', 0.22)); line(bE2, t, mid('exact', 0.5));
      op(bE2ring, t >= mid('exact', 0.62) ? 1 : 0);
      if (t >= mid('exact', 0.7) && t < at('round')) { cExact.set(P(t, mid('exact', 0.7), 0.35, linear)); }
      line(bE3, t, mid('round', 0.2)); line(bE4, t, mid('round', 0.45)); line(bE5, t, mid('round', 0.72));
      // Rad lies along the radius (pointing up-right)
      op(rad, 1); home(rad, Lbcast);
      const rs = BR / 160;
      rodAt(rad, BX, BY, rs, 55, 80);
      rad.set({ t, talk: scTalk(S, t, 'rad'), mood: who === 'rad' ? 'happy' : 'neutral', look: who === 'rad' ? 0.6 : 0.8, still: true, arms: who === 'rad' ? 0.6 : 0.25 });
      // a human at the front of the board
      const BXH = 128, BYH = 690, BSC = 0.82;
      if (t < at('round') - 0.2) {
        op(tan, 1); home(tan, Lbcast); tr(tan, BXH, BYH - 6, BSC);
        tan.set({ t, talk: scTalk(S, t, 'tan'), mood: 'happy', look: 0.7 });
      } else {
        op(kav, 1); home(kav, Lbcast);
        const up = P(t, at('round') - 0.2, 0.35, pop);
        tr(kav, BXH, lerp(900, BYH, up), BSC);
        kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: t > mid('round', 0.75) ? 'happy' : 'neutral', look: 0.7 });
      }
    }

    /* ---------------- F: the Singapore Flyer ---------------- */
    if (sF) {
      const lp = P(t, mid('flyer', 0.4), (end('flyer') - mid('flyer', 0.4)) * 0.8, ease);
      const a = Math.PI / 2 + lp * TAU;
      tr(rider, FX + Math.cos(a) * (FR + 10), FY + Math.sin(a) * (FR + 10), 1);
      mkDraw(fLap, lp); op(fLap, lp > 0 ? 1 : 0);
      op(fDia, P(t, mid('flyer', 0.1), 0.3, linear)); op(fCard, P(t, mid('flyer', 0.38), 0.3, linear));
      line(fT1, t, mid('flyer', 0.4)); line(fT2, t, mid('flyer', 0.62));
      op(pi, 1); home(pi, Lfg);
      tr(pi, 1000, 452, 0.62);
      pi.set({ t, talk: scTalk(S, t, 'pi'), mood: 'happy', look: -0.8, digits });
      if (t > mid('flyer', 0.85)) popIn(cWhee, t, mid('flyer', 0.85), 1000, 210);
      op(boy, 1); home(boy, Lfg);
      tr(boy, 730, 650, 0.84);
      boy.set({ t, mood: lp > 0.05 ? 'happy' : 'shock', look: -0.7 + 0.4 * Math.sin(lp * Math.PI) });
    }

    /* ---------------- Pd: the school pond ---------------- */
    if (sP) {
      op(pTape, P(t, at('pond') + 0.2, 0.4, linear)); op(pCard, P(t, mid('pond', 0.25), 0.3, linear));
      op(cC40, P(t, mid('pond', 0.3), 0.3, linear));
      line(pR1, t, mid('pond', 0.3)); line(pR2, t, mid('pond', 0.65), at('dadback'));
      line(pD1, t, mid('dadback', 0.25), at('back')); pDstrike.set(t < at('back') ? P(t, mid('dee', 0.55), 0.35, linear) : 0);
      line(pD2, t, mid('dee', 0.5), at('back'));
      line(pK1, t, mid('back', 0.2)); line(pK2, t, mid('back', 0.45)); line(pK3, t, mid('back', 0.7));
      op(pK3ring, t >= mid('back', 0.8) ? 1 : 0);
      if (t >= at('dadback') && t < at('dee')) popIn(cClose2, t, mid('dadback', 0.6), 820, 610);
      if (t >= at('dee') && t < at('back')) { stHalf2.set(P(t, mid('dee', 0.6), 0.35, linear)); tr(stHalf2, 900, 500, 0.4); }
      if (t >= at('dee') && t < mid('dee', 0.5)) { cAcross.set(P(t, at('dee') + 0.1, 0.3, linear)); tr(cAcross, 820, 610); }
      if (t >= at('back')) { stEasy.set(P(t, mid('back', 0.85), 0.35, linear)); tr(stEasy, 900, 500, 0.4); }
      // Dee barges in across the pond; leaves when Kavya halves him
      const DA = -55;
      if (t >= at('dee') - 0.2 && t < mid('back', 0.35)) {
        op(dee, 1); home(dee, Lbcast);
        const inn = P(t, at('dee') - 0.2, 0.5, easeOut), out = P(t, at('back'), 0.5, easeIn);
        tr(dee, PX + 900 * (1 - inn) - 900 * out, PY, PR / 160, DA);
        dee.set({ t, talk: scTalk(S, t, 'dee'), mood: t >= at('back') ? 'shock' : 'smug', look: 0.6, still: true, arms: who === 'dee' ? 0.9 : 0.4 });
      }
      if (t >= mid('back', 0.2)) {
        op(rad, 1); home(rad, Lbcast);
        const rp = P(t, mid('back', 0.2), 0.45, pop);
        rodAt(rad, PX, PY, Math.max(0.01, PR / 160 * rp), DA, 80);
        rad.set({ t, mood: 'happy', look: 0.6, still: true, arms: 0.4 });
      }
      // humans at the front
      const BYH = 690, BSC = 0.82;
      if (t < at('back') - 0.2) {
        op(mum, 1); home(mum, Lbcast); tr(mum, 128, BYH, BSC);
        mum.set({ t, talk: scTalk(S, t, 'mum'), mood: who === 'dee' ? 'neutral' : t >= at('dadback') ? 'deadpan' : 'neutral', look: t >= at('dadback') ? 0.9 : 0.5 });
      } else {
        op(kav, 1); home(kav, Lbcast);
        const up = P(t, at('back') - 0.2, 0.35, pop);
        tr(kav, 128, lerp(900, BYH, up), BSC);
        kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: t > mid('back', 0.85) ? 'happy' : 'neutral', look: 0.6 });
      }
      if (t >= at('dadback') - 0.3) {
        op(dad, 1); home(dad, Lbcast);
        const up = P(t, at('dadback') - 0.3, 0.4, pop);
        tr(dad, 1080, lerp(900, 700, up), 0.85);
        let dm = 'smug', dlift = t < end('dadback') ? 1 : 0;
        if (t >= at('dee')) dm = t > mid('dee', 0.6) ? 'sad' : 'shock';
        if (t >= at('back')) dm = t > mid('back', 0.85) ? 'deadpan' : 'sad';
        dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: -0.7, lift: dlift });
      }
    }
  };
});
