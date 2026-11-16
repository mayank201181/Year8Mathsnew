/* Scene 6: Monty the map (scale factors, scale drawings & maps).
   1 p.m., the copy corner of the hawker centre: Kavya enlarges the 4 cm by 6 cm menu so the long side is 15 cm ->
   Ah Boy adds 9 to both sides: a squashed 13 by 15 menu, OUT OF PROPORTION -> Monty the map unfolds on the copier:
   similar shapes, same angles, every length x k -> k = 15 / 6 = 2.5 on the long (corresponding) sides -> 4 x 2.5 =
   10 cm, both 2 : 3, IN PROPORTION (the squashed menu stays as a red ghost behind it) -> 2 p.m.: Auntie Rose is lost
   in Melaka, map upside down -> 1 : 50 000, the ruler shows 7 cm -> 1 cm -> 50 000 cm, 7 x 50 000 = 350 000 cm =
   3500 m = 3.5 km (take a trishaw) -> the 6 km trishaw tour: 600 000 cm / 50 000 = 12 cm, drawn on the map ->
   Monty's confessional: real world huge, multiply; map tiny, divide -> the trishaw uncle, sweating. */
scene('map', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);          // hard sitcom cut
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 3, color: o.color || C.ink, weight: 700 }); };
  const GOLD = '#FFE45C', INK = MK.ink, GREEN = '#1E9E5A', RED = '#C62828', BLUE = '#2E7DD8', BERRY = '#B8336A';
  const paper = (parent, x, y, w, h) => {
    E('rect', { x: x + 6, y: y + 6, width: w, height: h, rx: 16, fill: 'rgba(0,0,0,0.25)' }, parent);
    return E('rect', { x, y, width: w, height: h, rx: 16, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, parent);
  };
  // fade a line of working in, sliding up a touch
  const line = (el, t, t0, t1) => { const p = P(t, t0, 0.3, easeOut), q = t1 === undefined ? 1 : 1 - P(t, t1, 0.2, linear); op(el, Math.min(p, q)); tr(el, 0, 10 * (1 - p)); };
  // the menu card, drawn in a 100 x 150 box (portrait 2 : 3); stretched when it is out of proportion
  function maMenu(parent) {
    const g = G(parent), ns = { 'vector-effect': 'non-scaling-stroke' };
    E('rect', Object.assign({ x: 0, y: 0, width: 100, height: 150, rx: 5, fill: '#FFF6E0', stroke: INK, 'stroke-width': 3 }, ns), g);
    E('rect', { x: 0, y: 0, width: 100, height: 34, rx: 5, fill: '#C62828' }, g);
    T(g, 50, 25, 'MENU', { size: 20, weight: 800, anchor: 'middle', fill: '#FFE45C' });
    [52, 74, 96, 118].forEach((y, i) => {
      E('rect', { x: 12, y, width: 50, height: 9, rx: 4, fill: '#C9B48A' }, g);
      E('rect', { x: 72, y, width: 16, height: 9, rx: 4, fill: i % 2 ? '#B8336A' : '#2E7D4F' }, g);
    });
    E('circle', { cx: 50, cy: 138, r: 5, fill: '#FF8FC8' }, g);
    // x0, y1 = bottom-left corner; grows out of that corner
    g.place = (x0, y1, w, h, p) => { p = Math.max(0.01, clamp(p)); op(g, p > 0.011 ? 1 : 0); g.setAttribute('transform', `translate(${x0.toFixed(1)} ${(y1 - h * p).toFixed(1)}) scale(${(w * p / 100).toFixed(4)} ${(h * p / 150).toFixed(4)})`); };
    return g;
  }
  // a ruler, the 0 mark at (0,0) on its top edge; numbers every cm (26 px)
  function maRuler(parent, cm, u) {
    const g = G(parent);
    E('rect', { x: -18, y: 0, width: cm * u + 36, height: 60, rx: 6, fill: '#F6D365', stroke: '#B08A2A', 'stroke-width': 3 }, g);
    let d = '';
    for (let k = 0; k <= cm * 10; k++) { const x = k * u / 10, h = k % 10 === 0 ? 20 : k % 5 === 0 ? 14 : 8; d += `M${x.toFixed(1)},0 L${x.toFixed(1)},${h} `; }
    E('path', { d, stroke: INK, 'stroke-width': 1.6 }, g);
    for (let k = 0; k <= cm; k++) T(g, k * u, 50, String(k), { size: 26, anchor: 'middle', fill: INK, weight: 700 });
    const mk = G(g);
    E('path', { d: 'M0,0 L-12,-22 L12,-22 Z', fill: RED, stroke: INK, 'stroke-width': 2 }, mk);
    g.set = (v, p) => { tr(mk, v * u, 0); op(mk, p); };
    return g;
  }
  // a little trishaw (side view), wheels on y = 0
  function maTrishaw(parent, s) {
    const g = G(parent), inner = G(g); tr(inner, 0, 0, s || 1);
    E('circle', { cx: -40, cy: -18, r: 18, fill: 'none', stroke: SC_INK, 'stroke-width': 4 }, inner);
    E('circle', { cx: 42, cy: -18, r: 18, fill: 'none', stroke: SC_INK, 'stroke-width': 4 }, inner);
    E('path', { d: 'M-64,-34 L-4,-34 L-4,-74 Q-34,-88 -64,-74 Z', fill: '#FF6B8A', stroke: SC_INK, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, inner);
    [[-56, -82, '#FFE45C'], [-36, -90, '#FF8FC8'], [-16, -84, '#7EE08A']].forEach(([x, y, col]) => E('circle', { cx: x, cy: y, r: 8, fill: col, stroke: SC_INK, 'stroke-width': 2 }, inner));
    E('path', { d: 'M-4,-34 L42,-18 M-4,-50 L50,-46 L56,-56', fill: 'none', stroke: SC_INK, 'stroke-width': 4, 'stroke-linecap': 'round' }, inner);
    return g;
  }

  /* layers */
  const Lset = G(root), Lcast = G(root), Lfront = G(root), Lboard = G(root), Lhud = G(root);

  /* ================= the copy corner of the hawker centre ================= */
  const corner = G(Lset);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#2A3640', '#3E4C58', true) }, corner);
  E('rect', { x: 0, y: 118, width: 1200, height: 420, fill: '#F0EBDD' }, corner);
  let tiles = '';
  for (let x = 0; x <= 1200; x += 60) tiles += `M${x},118 L${x},538 `;
  for (let y = 118; y <= 538; y += 60) tiles += `M0,${y} L1200,${y} `;
  E('path', { d: tiles, stroke: '#D9D0BC', 'stroke-width': 2 }, corner);
  E('rect', { x: 0, y: 108, width: 1200, height: 14, fill: '#8E3B2E' }, corner);
  const cornerSign = G(corner); tr(cornerSign, 290, 170);
  E('rect', { x: -130, y: -28, width: 260, height: 54, rx: 10, fill: '#2E7DD8', stroke: '#1E3560', 'stroke-width': 4 }, cornerSign);
  T(cornerSign, 0, 11, 'COPY CORNER', { size: 28, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 2 });
  const fan = rpFan(corner, 0.7); tr(fan, 470, 196);
  // the table (hides the busts' shirt hems)
  const table = G(Lfront);
  E('rect', { x: 0, y: 520, width: 1200, height: 26, fill: '#C9A06A', stroke: '#8A6232', 'stroke-width': 4 }, table);
  E('rect', { x: 0, y: 546, width: 1200, height: 204, fill: linGrad('#B07A45', '#7A5028', true), stroke: '#5A3A1A', 'stroke-width': 4 }, table);
  // the photocopier
  const copier = G(Lfront), copIn = G(copier);
  E('rect', { x: 30, y: 318, width: 200, height: 372, rx: 10, fill: linGrad('#E6EBEF', '#B9C4CE', true), stroke: '#5A6670', 'stroke-width': 5 }, copIn);
  E('rect', { x: 22, y: 300, width: 216, height: 24, rx: 6, fill: '#8F9CAB', stroke: '#5A6670', 'stroke-width': 4 }, copIn);   // lid
  E('rect', { x: 48, y: 344, width: 116, height: 56, rx: 6, fill: '#1E2A33', stroke: '#5A6670', 'stroke-width': 3 }, copIn);   // display
  const disp = T(copIn, 106, 382, '100%', { size: 26, weight: 800, anchor: 'middle', fill: '#7EE08A' });
  const lamp = E('circle', { cx: 196, cy: 372, r: 10, fill: '#56D69B', stroke: '#2A3B44', 'stroke-width': 2 }, copIn);
  [[52, 420], [52, 470], [52, 520]].forEach(([x, y]) => E('rect', { x, y, width: 156, height: 38, rx: 6, fill: '#D6DEE4', stroke: '#8F9CAB', 'stroke-width': 3 }, copIn));
  E('rect', { x: 228, y: 432, width: 50, height: 12, rx: 4, fill: '#8F9CAB', stroke: '#5A6670', 'stroke-width': 3 }, copIn);   // output tray
  const scan = E('rect', { x: 26, y: 303, width: 10, height: 18, fill: '#B8FFD0', opacity: 0.9 }, copIn);
  const sheet = G(copIn);    // the squashed copy sliding out
  E('rect', { x: -30, y: -40, width: 60, height: 40, fill: '#FFF6E0', stroke: INK, 'stroke-width': 2.5 }, sheet);
  E('rect', { x: -30, y: -40, width: 60, height: 10, fill: '#C62828' }, sheet);
  const smallMenu = maMenu(Lfront);   // the original menu waiting on the copier lid

  /* ---------- A: the menu board (squared paper) ---------- */
  const boardA = G(Lboard);
  paper(boardA, 575, 104, 595, 558);
  const grid = mkGrid(boardA, { cols: 30, rows: 18, cell: 18, ink: INK }); tr(grid, 600, 168);
  const gx = c => 600 + c * 18, gy = r => 168 + r * 18;
  const O = [gx(2), gy(12), gx(6), gy(18)];                 // original 4 x 6: x0, y0, x1, y1
  const RX0 = gx(12), RY0 = gy(3), RY1 = gy(18), SQX1 = gx(25), OKX1 = gx(22);
  const ghost = E('rect', { x: RX0, y: RY0, width: SQX1 - RX0, height: RY1 - RY0, fill: 'none', stroke: RED, 'stroke-width': 4, 'stroke-dasharray': '12 9', opacity: 0.8 }, boardA);
  const mOrig = maMenu(boardA), mSq = maMenu(boardA), mOk = maMenu(boardA);
  mOrig.place(O[0], O[3], O[2] - O[0], O[3] - O[1], 1);
  // long sides (corresponding) and right-angle marks
  const longO = E('path', { d: `M${O[2]},${O[1]} L${O[2]},${O[3]}`, stroke: '#FFC247', 'stroke-width': 11, 'stroke-linecap': 'round', opacity: 0.9 }, boardA);
  const longR = E('path', { d: `M${OKX1},${RY0} L${OKX1},${RY1}`, stroke: '#FFC247', 'stroke-width': 11, 'stroke-linecap': 'round', opacity: 0.9 }, boardA);
  const corners = (x0, y0, x1, y1, r) => [[x0, y1, 0, 90], [x1, y1, 90, 180], [x1, y0, 180, 270], [x0, y0, 270, 360]].map(([x, y, a, b]) => mkAngleMark(boardA, x, y, a, b, { r, col: BLUE, width: 4 }));
  const angO = corners(O[0], O[1], O[2], O[3], 26), angR = corners(RX0, RY0, OKX1, RY1, 34);
  // dimension labels
  const lab = (x, y, s, an, col) => mkText(boardA, x, y, s, { size: 30, anchor: an || 'middle', fill: col || INK, weight: 700 });
  const l4 = lab((O[0] + O[2]) / 2, 528, '4 cm'), l6 = lab(O[2] + 12, (O[1] + O[3]) / 2 + 10, '6 cm', 'start');
  const l13 = lab((RX0 + SQX1) / 2, 528, '13 cm', 'middle', RED), l15s = lab(SQX1 + 10, 368, '15 cm', 'start', RED);
  const l15 = lab(OKX1 + 10, 368, '15 cm', 'start'), lQ = lab((RX0 + OKX1) / 2, 528, '? cm', 'middle', BLUE), l10 = lab((RX0 + OKX1) / 2, 528, '10 cm', 'middle', GREEN);
  // title row and working
  const TX = 872.5, W1 = 582, W2 = 636;
  const tMenu = mkText(boardA, TX, 148, 'long side → **15 cm**', { size: 34, anchor: 'middle', fill: INK, boldFill: BERRY });
  const tK = mkText(boardA, TX, 148, 'use **corresponding** sides: the long ones', { size: 30, anchor: 'middle', fill: INK, boldFill: BERRY });
  const tShort = mkText(boardA, TX, 148, 'scale factor {{k = 2.5}}', { size: 34, anchor: 'middle', fill: GREEN, weight: 700 });
  const wBoy1 = mkText(boardA, TX, W1, '{{6 + 9 = 15}}, so **+ 9** to both sides', { size: 34, anchor: 'middle', fill: RED });
  const wBoy2 = mkText(boardA, TX, W2, '{{4 + 9 = 13}}  →  **13 cm by 15 cm**', { size: 34, anchor: 'middle', fill: RED });
  const wSim1 = mkText(boardA, TX, W1, '**Similar**: same angles, and', { size: 34, anchor: 'middle', fill: INK, boldFill: BLUE });
  const wSim2 = mkText(boardA, TX, W2, 'every length × the same **scale factor k**', { size: 32, anchor: 'middle', fill: INK, boldFill: BERRY });
  const wK1 = mkMath(boardA, TX, W1, 'k = "new" ÷ "original"', { size: 38, anchor: 'middle', fill: INK, weight: 700 });
  const wK2 = mkMath(boardA, TX, W2, 'k = 15 ÷ 6 = 2.5', { size: 38, anchor: 'middle', fill: INK, weight: 700 });
  const wS1 = mkText(boardA, TX, W1, 'short side: {{4 × 2.5 = 10}} cm', { size: 34, anchor: 'middle', fill: INK });
  const wS2 = mkText(boardA, TX, W2, '{{4 : 6 = 2 : 3}}   and   {{10 : 15 = 2 : 3}}', { size: 34, anchor: 'middle', fill: GREEN });
  const cOne = pill(Lhud, '1 p.m.', { size: 34, color: GOLD, stroke: GOLD });
  const stOut = rpStamp(Lhud, false), stIn = rpStamp(Lhud, true);

  /* ================= B: Auntie Rose lost in Melaka ================= */
  const callG = G(Lboard);
  const call = rpRoseCall(callG, 420, 270);
  const rMap = G(call.screen);    // Auntie's map, held up to the camera
  { const m = G(rMap);
    E('rect', { x: -78, y: -54, width: 156, height: 108, rx: 6, fill: '#F7F1DC', stroke: SC_INK, 'stroke-width': 3 }, m);
    E('path', { d: 'M-70,-10 Q-30,-40 10,-14 Q40,6 70,-24', fill: 'none', stroke: '#6EC8FF', 'stroke-width': 8 }, m);
    E('path', { d: 'M-70,24 L70,24 M-20,-50 L-20,50', stroke: '#B9C4CE', 'stroke-width': 6 }, m);
    T(m, 0, 46, 'MELAKA', { size: 26, weight: 800, anchor: 'middle', fill: '#B7322C' });
    E('path', { d: 'M56,-44 L62,-30 L50,-30 Z', fill: SC_INK }, m); }
  const uncle = scHuman(call.screen, { age: 'senior', hair: 'bald', skin: SC_SKIN.tan, style: 'tee', shirt: '#F4F7FA', seed: 31 });
  { const towel = G(uncle.firstChild); E('path', { d: 'M-60,60 Q0,96 60,60 L66,76 Q0,112 -66,76 Z', fill: '#FF8A8A', stroke: SC_INK, 'stroke-width': 3 }, towel); }
  const boardB = G(Lboard);
  paper(boardB, 600, 104, 570, 558);
  // the map of Melaka
  const MX0 = 616, MX1 = 1154, MY0 = 176, MY1 = 446, U = 40, RA = 252, RB = 380, PX = 640;
  E('rect', { x: MX0, y: MY0, width: MX1 - MX0, height: MY1 - MY0, rx: 10, fill: '#E4F2D9', stroke: '#9CB89A', 'stroke-width': 3 }, boardB);
  E('path', { d: `M${MX0},214 Q760,190 880,214 Q1000,238 ${MX1},206 L${MX1},224 Q1000,256 880,232 Q760,208 ${MX0},232 Z`, fill: '#9FD8FF' }, boardB);   // river
  const r9 = rng(9);
  for (let k = 0; k < 9; k++) { const x = 660 + k * 56 + r9() * 16, y = k % 2 ? 300 : 322; E('rect', { x, y, width: 34, height: 26, rx: 4, fill: '#D6CDBA', stroke: '#A89C82', 'stroke-width': 2 }, boardB); }
  [RA, RB].forEach(y => E('rect', { x: MX0, y: y - 10, width: MX1 - MX0, height: 20, fill: '#C9D3DC', stroke: '#9AA6B2', 'stroke-width': 2 }, boardB));
  const hiA = mkDash(E('path', { d: `M${PX},${RA} L${PX + 7 * U},${RA}`, stroke: '#FFC247', 'stroke-width': 14, 'stroke-linecap': 'round' }, boardB));
  const route = E('path', { d: `M${PX},${RB} L${PX + 12 * U},${RB}`, stroke: '#E8424F', 'stroke-width': 8, 'stroke-dasharray': '14 9', 'stroke-linecap': 'round' }, boardB);
  const routeClip = (() => { const id = 'maroute'; const cp = E('clipPath', { id }, defs()); const r = E('rect', { x: PX - 10, y: RB - 20, width: 0, height: 40 }, cp); route.setAttribute('clip-path', `url(#${id})`); return r; })();
  // pins: Auntie and the hotel
  const pin = G(boardB); tr(pin, PX, RA);
  E('path', { d: 'M0,0 C-6,-14 -16,-20 -16,-32 A16,16 0 1 1 16,-32 C16,-20 6,-14 0,0 Z', fill: '#E8424F', stroke: SC_INK, 'stroke-width': 3 }, pin);
  E('circle', { cx: 0, cy: -32, r: 6, fill: '#FFFFFF' }, pin);
  mkText(boardB, PX - 16, RA - 56, 'Auntie', { size: 26, fill: BERRY, weight: 800 });
  const hotel = G(boardB); tr(hotel, PX + 7 * U, RA - 12);
  E('rect', { x: -22, y: -46, width: 44, height: 46, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, hotel);
  E('path', { d: 'M-26,-46 L0,-62 L26,-46 Z', fill: '#2E7DD8', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, hotel);
  T(hotel, 34, -24, 'HOTEL', { size: 26, weight: 800, fill: BLUE });
  const ruler = maRuler(boardB, 12, U);
  const trishaw = maTrishaw(boardB, 0.62);
  const scaleChip = mkChip(boardB, '{{1 : "50 000"}}', { size: 32, col: '#2E7D4F', solid: true, fill: '#DFF5E6' });
  tr(scaleChip, MX1 - scaleChip.w / 2, 140);
  const leftChip = (text) => { const c = mkChip(boardB, text, { size: 28, col: BERRY }); c.x = MX0 + c.w / 2; return c; };
  const cSame = leftChip('same units on **both** sides'), cMult = leftChip('map → real: **multiply**'),
    cKm = leftChip('{{1 "km" = "100 000" "cm"}}'), cTour = leftChip('trishaw tour: **6 km**'), cDiv = leftChip('real → map: **divide**');
  const c7 = mkChip(boardB, '**7 cm**', { size: 28, col: '#B08A2A', fill: '#FFF3C4', textCol: INK });
  const cQ = mkChip(boardB, '**6 km** = ? cm', { size: 28, col: RED, fill: '#FFE4E4', textCol: INK });
  const c12 = mkChip(boardB, '**12 cm**', { size: 28, col: RED, fill: '#FFE4E4', textCol: INK });
  // working under the map
  const BX = 885, BY = [500, 550, 600, 650];
  const bScale = mkText(boardB, BX, BY[0], '{{1 "cm"}} (map) → {{"50 000" "cm"}} (real)', { size: 32, anchor: 'middle', fill: INK });
  const bReal = mkText(boardB, BX, BY[1], '{{7 × "50 000" = "350 000"}} cm', { size: 32, anchor: 'middle', fill: INK });
  const bM = mkText(boardB, BX, BY[2], '{{"350 000" ÷ 100 = 3500}} m', { size: 32, anchor: 'middle', fill: INK });
  const bKm = mkText(boardB, BX, BY[3], '{{3500 ÷ 1000 = 3.5}} km', { size: 32, anchor: 'middle', fill: GREEN, boldFill: GREEN });
  const bT1 = mkText(boardB, BX, BY[0], '{{6 "km" = 6000 "m" = "600 000" "cm"}}', { size: 32, anchor: 'middle', fill: INK });
  const bT2 = mkText(boardB, BX, BY[1], '{{"600 000" ÷ "50 000" = 12}} cm', { size: 34, anchor: 'middle', fill: GREEN, boldFill: GREEN });
  const cTwo = pill(Lhud, '2 p.m.', { size: 34, color: GOLD, stroke: GOLD });

  /* ================= R: Monty's confessional ================= */
  const conf = rpConf(Lset, 'monty');
  const ruleCard = G(Lboard);
  paper(ruleCard, 630, 170, 520, 400);
  const rHuge = mkText(ruleCard, 890, 262, '**Real world is huge**', { size: 40, anchor: 'middle', fill: INK, boldFill: BLUE });
  const rMul = mkText(ruleCard, 890, 328, 'map → real: **× multiply**', { size: 36, anchor: 'middle', fill: INK, boldFill: GREEN });
  const rTiny = mkText(ruleCard, 890, 444, '**Map is tiny**', { size: 40, anchor: 'middle', fill: INK, boldFill: BERRY });
  const rDiv = mkText(ruleCard, 890, 510, 'real → map: **÷ divide**', { size: 36, anchor: 'middle', fill: INK, boldFill: GREEN });
  E('line', { x1: 670, y1: 380, x2: 1110, y2: 380, stroke: '#C9D3DC', 'stroke-width': 3 }, ruleCard);

  /* ================= the cast ================= */
  const kav = cast(Lcast, 'kavya'), boy = cast(Lcast, 'boy'), col = cast(Lfront, 'colonel');
  const monty = cast(Lfront, 'monty');
  const kavB = cast(Lhud, 'kavya'), montyB = cast(Lhud, 'monty');   // shot B: in front of the table
  const ltMonty = rpLowerThird(Lhud, 'monty'), ltRose = rpLowerThird(Lhud, 'rose');

  /* cut points */
  const cB = at('lost') - 0.06, cR = at('rule') - 0.06, cU = at('uncle') - 0.06;

  return t => {
    const sA = on(t, -1, cB), sB = on(t, cB, cR), sR = on(t, cR, cU), sU = on(t, cU, 1e9), sBU = sB || sU;
    const who = scWho(S, t);
    // everything off unless a shot turns it on
    op(corner, sA || sBU); op(table, sA || sBU); op(copier, sA); op(smallMenu, 0);
    op(boardA, sA); op(callG, sBU); op(boardB, sBU); op(ruleCard, sR); conf.set(sR, t);
    [kav, boy, col, monty, kavB, montyB].forEach(c => op(c, 0));
    [cOne, cTwo].forEach(c => op(c, 0)); stOut.set(0); stIn.set(0);
    ltMonty.set(win(t, at('monty') + 0.1, at('monty') + 3.2, 0.3));
    ltRose.set(sB ? win(t, at('lost') + 0.3, at('lost') + 3.4, 0.3) : 0);
    fan.upd(t);

    /* ---------- A: the copy corner ---------- */
    if (sA) {
      popIn(cOne, t, at('one') + 0.05, 880, 60);
      // the copier: scans during "one", copies (and spits out the squashed menu) during "boy"
      const busy = (t > at('one') + 0.4 && t < end('one')) || (t > at('boy') + 0.3 && t < mid('boy', 0.6));
      tr(copIn, busy ? Math.sin(t * 50) * 1.5 * AMP : 0, 0);
      attr(scan, 'x', busy ? 26 + ((t * 1.2) % 1) * 200 : 26); op(scan, busy ? 0.9 : 0);
      op(lamp, busy && Math.sin(t * 14) > 0 ? 1 : 0.45);
      setText(disp, t > at('short') + 0.3 ? '250%' : t > at('boy') ? '+9 cm?' : '100%');
      const sp = P(t, mid('boy', 0.45), 0.5, easeOut);
      op(sheet, sp > 0 && t < at('similar') ? 1 : 0); tr(sheet, 230 + 40 * sp, 432);
      if (t < at('monty') - 0.3) { op(smallMenu, 1); smallMenu.setAttribute('transform', 'translate(112 246) scale(0.36)'); }
      // the board
      const bp = P(t, at('menu') - 0.1, 0.35, easeOut);
      op(boardA, sA * bp); tr(boardA, 0, 18 * (1 - bp));
      op(mOrig, 1);
      op(l4, P(t, mid('menu', 0.1), 0.3, linear)); op(l6, P(t, mid('menu', 0.25), 0.3, linear));
      op(tMenu, t < at('k') ? P(t, mid('menu', 0.6), 0.3, linear) : 0);
      op(tK, t >= at('k') && t < at('short') ? 1 : 0); op(tShort, t >= at('short') ? P(t, at('short'), 0.3, linear) : 0);
      // Ah Boy's squashed menu
      const sq = P(t, mid('boy', 0.55), 0.6, easeOut);
      mSq.place(RX0, RY1, SQX1 - RX0, RY1 - RY0, sq); if (t >= at('similar')) op(mSq, 0);
      op(ghost, t >= at('similar') ? 0.85 : 0);
      op(l13, t < at('similar') ? P(t, mid('boy', 0.8), 0.3, linear) : 0); op(l15s, t < at('similar') ? P(t, mid('boy', 0.8), 0.3, linear) : 0);
      line(wBoy1, t, mid('boy', 0.12), at('similar') - 0.2); line(wBoy2, t, mid('boy', 0.55), at('similar') - 0.2);
      if (t < at('similar')) { stOut.set(P(t, mid('squash', 0.2), 0.35, linear)); tr(stOut, 896, 300, 0.42); }
      // the right enlargement
      const ok = P(t, mid('similar', 0.2), 0.6, easeOut);
      mOk.place(RX0, RY1, OKX1 - RX0, RY1 - RY0, ok);
      op(l15, t >= at('similar') ? P(t, mid('similar', 0.4), 0.3, linear) : 0);
      op(lQ, t >= at('similar') && t < mid('short', 0.3) ? P(t, mid('similar', 0.4), 0.3, linear) : 0);
      op(l10, P(t, mid('short', 0.3), 0.3, linear));
      angO.forEach((a, i) => a.set(t < at('similar') ? 0 : P(t, mid('similar', 0.38) + i * 0.08, 0.3, linear)));
      angR.forEach((a, i) => a.set(t < at('similar') ? 0 : P(t, mid('similar', 0.5) + i * 0.08, 0.3, linear)));
      line(wSim1, t, at('similar') + 0.1, at('k') - 0.2); line(wSim2, t, mid('similar', 0.55), at('k') - 0.2);
      op(longO, t >= at('k') ? P(t, mid('k', 0.1), 0.3, linear) : 0); op(longR, t >= at('k') ? P(t, mid('k', 0.18), 0.3, linear) : 0);
      line(wK1, t, mid('k', 0.4), at('short') - 0.2); line(wK2, t, mid('k', 0.62), at('short') - 0.2);
      line(wS1, t, at('short') + 0.1); line(wS2, t, mid('short', 0.5));
      if (t >= at('short')) { stIn.set(P(t, mid('short', 0.85), 0.35, linear)); tr(stIn, 872, 300, 0.32); }
      // the cast
      op(kav, 1); tr(kav, 330, 445, 0.95);
      let km = 'neutral', kl = 0.8;
      if (t < at('menu')) { km = 'happy'; kl = -0.6; }
      else if (t < at('boy')) km = 'happy';
      else if (t < at('squash')) { km = t > mid('boy', 0.6) ? 'deadpan' : 'neutral'; kl = 0.7; }
      else if (t < at('monty')) km = 'deadpan';
      else if (t < at('short')) { km = 'neutral'; kl = who === 'monty' ? -0.8 : 0.8; }
      else km = t > mid('short', 0.85) ? 'smug' : 'happy';
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
      op(boy, 1); tr(boy, 480, 455, 0.9);
      let bm = 'happy', bl = -0.6;
      if (t >= at('squash') && t < at('monty')) { bm = 'shock'; bl = -0.4; }
      else if (t >= at('monty')) { bm = t > mid('short', 0.85) ? 'happy' : 'neutral'; bl = who === 'monty' ? -0.9 : 0.6; }
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: bm, look: bl, lift: t >= at('boy') && t < at('squash') ? 1 : 0 });
      // the Colonel hops onto the table to stamp it
      if (t > at('squash') - 0.35 && t < at('monty') - 0.1) {
        op(col, 1);
        const hop = P(t, at('squash') - 0.35, 0.4, pop);
        tr(col, 405, lerp(800, 618, hop), 0.78);
        col.set({ t, talk: scTalk(S, t, 'colonel'), mood: 'annoyed', look: 0.8, point: t > mid('squash', 0.15) ? 1 : 0 });
      }
      // Monty unfolds on the copier lid
      if (t >= at('monty') - 0.15) {
        op(monty, 1);
        const u = P(t, at('monty') - 0.15, 0.7, pop);
        tr(monty, 130, 214, `${(0.72 * lerp(0.08, 1, u)).toFixed(4)} 0.72`);
        monty.set({ t, talk: scTalk(S, t, 'monty'), mood: who === 'kavya' ? 'happy' : 'smug', look: who === 'kavya' ? 0.7 : 0.5 });
      }
    }

    /* ---------- B / U: Auntie Rose on a video call, the map on the board ---------- */
    if (sBU) {
      if (sB) popIn(cTwo, t, at('lost') + 0.05, 880, 60);
      const cp = P(t, cB, 0.3, easeOut);
      tr(callG, 300, 290 + 24 * (1 - cp));
      const rMood = sU ? 'sad' : t < at('hotel') ? 'shock' : t >= at('km') && t < at('route') ? 'shock' : who === 'rose' ? 'neutral' : 'neutral';
      call.rose.set({ t, talk: scTalk(S, t, 'rose'), mood: rMood, look: who === 'kavya' || who === 'monty' ? 0.6 : 0 });
      // Auntie's map: upside down, then the right way round
      const flip = P(t, at('hotel') + 0.1, 0.5, ease);
      op(rMap, sB ? 1 : 0); tr(rMap, -118, 72 + Math.sin(t * 3) * 3 * AMP, 1, 180 * (1 - flip) - 8);
      // the trishaw uncle (U)
      op(uncle, sU);
      if (sU) {
        const up = P(t, cU, 0.4, easeOut);
        tr(uncle, lerp(330, 130, up), 70, 0.7);
        uncle.set({ t, mood: 'sad', look: -0.6, sweat: 1 });
      }
      // the map board
      const bp = P(t, at('hotel') - 0.1, 0.35, easeOut);
      op(boardB, bp); tr(boardB, 0, 18 * (1 - bp));
      mkDraw(hiA, t < at('route') ? P(t, mid('hotel', 0.55), 0.6, linear) : 0); op(hiA, t < at('route') ? 1 : 0);
      // the ruler: under road A (7 cm), then under road B (12 cm)
      const rDown = P(t, at('tomap') + 0.1, 0.5, ease);
      tr(ruler, PX, lerp(RA + 12, RB + 12, rDown));
      op(ruler, P(t, mid('hotel', 0.4), 0.3, linear));
      if (t < at('tomap')) ruler.set(7 * P(t, mid('hotel', 0.55), 0.6, linear), P(t, mid('hotel', 0.5), 0.2, linear));
      else ruler.set(12 * P(t, mid('tomap', 0.62), 0.7, easeOut), P(t, mid('tomap', 0.6), 0.2, linear));
      c7.set(t < at('route') ? P(t, mid('hotel', 0.85), 0.35, linear) : 0); tr(c7, PX + 3.5 * U, RA - 44);
      // chips
      const lc = [[cSame, at('scale'), mid('scale', 0.55)], [cMult, at('real'), at('real') + 0.1], [cKm, at('km'), mid('km', 0.1)],
        [cTour, at('route'), mid('route', 0.45)], [cDiv, at('tomap'), mid('tomap', 0.55)]];
      lc.forEach(([c, a, t0], i) => { const b = i < lc.length - 1 ? lc[i + 1][1] - 0.05 : 1e9; c.set(t >= a - 0.05 && t < b ? P(t, t0, 0.35, linear) : 0); tr(c, c.x, 140); });
      cQ.set(t >= at('route') && t < at('tomap') + 0.1 ? P(t, mid('route', 0.6), 0.35, linear) : 0); tr(cQ, PX + 6 * U, RB + 44);
      c12.set(t >= at('tomap') ? P(t, mid('tomap', 0.85), 0.35, linear) : 0); tr(c12, PX + 6 * U, RB - 40);
      attr(routeClip, 'width', t >= at('tomap') ? 12 * U * P(t, mid('tomap', 0.62), 0.7, easeOut) + 20 : 0);
      // the trishaw: appears at Auntie's pin, then rides the 12 cm tour
      const ride = P(t, mid('tomap', 0.62), 0.7, easeOut);
      op(trishaw, t > mid('km', 0.7) ? P(t, mid('km', 0.7), 0.3, linear) : 0);
      tr(trishaw, PX + 44 + (12 * U - 50) * ride, RB - 8 - Math.abs(Math.sin(t * 6)) * 2 * AMP);
      // working
      line(bScale, t, mid('scale', 0.1), at('route') - 0.1);
      line(bReal, t, mid('real', 0.4), at('route') - 0.1);
      line(bM, t, mid('km', 0.05), at('route') - 0.1);
      line(bKm, t, mid('km', 0.32), at('route') - 0.1);
      line(bT1, t, mid('tomap', 0.12));
      line(bT2, t, mid('tomap', 0.55));
      // Kavya, in front of the table, holding the call; Monty beside her from "scale"
      op(kavB, 1); tr(kavB, 480, 606, 0.85);
      let km = 'neutral';
      if (sU) km = 'deadpan';
      else if (t < at('hotel')) km = 'shock';
      else if (who === 'kavya') km = t > mid('km', 0.6) && t < at('route') ? 'smug' : 'happy';
      kavB.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: who === 'monty' ? -0.8 : who === 'kavya' ? 0.7 : -0.6 });
      if (t >= at('scale') - 0.3) {
        op(montyB, 1);
        const up = P(t, at('scale') - 0.3, 0.45, pop);
        tr(montyB, 190, lerp(800, 588, up), 0.75);
        montyB.set({ t, talk: scTalk(S, t, 'monty'), mood: sU ? 'deadpan' : 'smug', look: who === 'kavya' ? 0.8 : who === 'rose' ? 0.3 : 0.9 });
      }
    }

    /* ---------- R: Monty's confessional ---------- */
    if (sR) {
      op(monty, 1);
      const grow = P(t, mid('rule', 0.05), 0.5, pop), shrink = P(t, mid('rule', 0.55), 0.5, pop);
      const k = 1.25 * (1 + 0.3 * grow - 0.55 * shrink);
      tr(monty, 330, 410 - 40 * grow + 60 * shrink, k);
      monty.set({ t, talk: scTalk(S, t, 'monty'), mood: shrink > 0.5 ? 'deadpan' : 'smug', look: 0.6 });
      op(rHuge, P(t, at('rule') + 0.05, 0.3, linear)); op(rMul, P(t, mid('rule', 0.22), 0.3, linear));
      op(rTiny, P(t, mid('rule', 0.55), 0.3, linear)); op(rDiv, P(t, mid('rule', 0.75), 0.3, linear));
    }
  };
});
