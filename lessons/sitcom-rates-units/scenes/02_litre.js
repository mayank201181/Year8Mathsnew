/* Scene 2: Twenty-five litres of boy (area & volume units).
   Gate C, Changi: the cabin-bag sizer 55 cm x 40 cm x 20 cm -> Lita the litre cube bounces out: 10 x 10 x 10 =
   1000 cm³ = 1 litre -> each 1 cm cube is 1 ml -> the sizer: 55 x 40 x 20 = 44 000 cm³ = 44 litres (it fills with
   litre squares) -> Ah Boy climbs in: "about 25 litres of boy" -> Mum: you are not hand luggage. The cabin, seat 47A,
   night: Dad's blanket 2 m by 1.5 m = 3 m², "so 300 cm²" (rosette) -> MEANWHILE, ON MARS (spacecraft 3) -> Lita on the
   tray table: 1 m² is 100 little squares along and 100 rows -> 1 m² = 100 x 100 = 10 000 cm², square it -> Kavya
   changes the lengths first: 200 x 150 = 30 000 cm² -> cube it: 1 m³ = 1 000 000 cm³ = 1000 litres, a thousand
   Litas -> Dad, still cold under 30 000 cm² of blanket. */
scene('litre', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);          // hard sitcom cut
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const show = (el, t, t0, t1) => { const p = P(t, t0, 0.3, easeOut), q = t1 === undefined ? 1 : 1 - P(t, t1, 0.2, linear); op(el, Math.min(p, q)); tr(el, 0, 10 * (1 - p)); };
  const GOLD = '#FFE45C', INK = MK.ink, GREEN = '#1E9E5A', RED = '#C62828', BLUE = '#2E7DD8', BERRY = '#B8336A', MUTED = '#5A4A52';
  const paper = (parent, x, y, w, h) => {
    E('rect', { x: x + 6, y: y + 6, width: w, height: h, rx: 16, fill: 'rgba(0,0,0,0.25)' }, parent);
    return E('rect', { x, y, width: w, height: h, rx: 16, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, parent);
  };
  const lookAt = (x, sx) => clamp((sx - x) / 260, -1, 1);
  // a tartan blanket, centred on (0,0), w x h
  function lbBlanket(parent, w, h) {
    const g = G(parent);
    E('rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: 10, fill: '#2E5A9C', stroke: SC_INK, 'stroke-width': 4 }, g);
    let d1 = '', d2 = '';
    for (let i = 1; i < 8; i++) { d1 += `M${-w / 2 + i * w / 8},${-h / 2} V${h / 2} `; d2 += `M${-w / 2},${-h / 2 + i * h / 6} H${w / 2} `; }
    E('path', { d: d1 + d2, stroke: '#C62828', 'stroke-width': 9, opacity: 0.55 }, g);
    E('path', { d: d1 + d2, stroke: '#FFE45C', 'stroke-width': 2, opacity: 0.7 }, g);
    let fr = ''; for (let x = -w / 2 + 8; x < w / 2; x += 14) fr += `M${x},${h / 2} v12 `;
    E('path', { d: fr, stroke: '#2E5A9C', 'stroke-width': 4 }, g);
    return g;
  }
  // a small litre cube icon (front face square + top/side), size k px, centred on (0,0)
  function lbCube(parent, k, col) {
    const g = G(parent), d = k * 0.3;
    E('path', { d: `M${-k / 2},${-k / 2} l${d},${-d} h${k} l${-d},${d} Z M${k / 2},${-k / 2} l${d},${-d} v${k} l${-d},${d} Z`, fill: mkShade(col, -0.15), stroke: '#1E5A7A', 'stroke-width': 2 }, g);
    E('rect', { x: -k / 2, y: -k / 2, width: k, height: k, fill: col, stroke: '#1E5A7A', 'stroke-width': 2 }, g);
    return g;
  }

  /* layers: sets, busts behind the front, the fronts, the sizer (with Ah Boy inside), props on top, boards, HUD */
  const Lbg = G(root), Lcast = G(root), Lfront = G(root), Lbox = G(root), Ltop = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= A: Gate C and the cabin-bag sizer ================= */
  const gateShot = G(Lbg);
  const gate = lcAirport(gateShot, { front: 'rail', sign: 'Gate C  →' });
  const gateF = G(Lfront);
  E('rect', { x: 40, y: 534, width: 1120, height: 226, fill: linGrad('#9AA8B6', '#7D8A96', true) }, gateF);   // frosted panel behind the glass
  gateF.appendChild(gate.front); gateF.appendChild(gate.top);
  // the sizer: an oblique wire frame, 40 cm wide, 55 cm tall, 20 cm deep at 4 px per cm; base at y 680
  const U = 4, SZX = 478, SZB = 680, SW = 40 * U, SH = 55 * U, SDX = 20 * U * 0.5 * Math.cos(Math.PI / 6), SDY = -20 * U * 0.5 * Math.sin(Math.PI / 6);
  const sizer = G(Lbox), szBack = G(sizer), boyBox = G(sizer), szFill = G(sizer), szFront = G(sizer);
  const MET = '#7D8A96', METD = '#4A545E';
  E('rect', { x: SZX + SDX, y: SZB - SH + SDY, width: SW, height: SH, fill: 'rgba(200,220,235,0.25)', stroke: METD, 'stroke-width': 5 }, szBack);
  E('path', { d: `M${SZX},${SZB - SH} l${SDX},${SDY} M${SZX + SW},${SZB - SH} l${SDX},${SDY} M${SZX},${SZB} l${SDX},${SDY}`, stroke: METD, 'stroke-width': 5 }, szBack);
  // 22 litre squares on the front (4 across x 5.5 up, 10 cm each) and a "x 2 deep" note
  const fillCells = [];
  for (let r = 0; r < 6; r++) for (let c = 0; c < 4; c++) {
    const hgt = r === 5 ? 5 * U : 10 * U;
    fillCells.push(E('rect', { x: SZX + c * 10 * U + 2, y: SZB - r * 10 * U - hgt + 2, width: 10 * U - 4, height: hgt - 4, rx: 3, fill: '#6EC8FF', stroke: '#1E5A7A', 'stroke-width': 2, opacity: 0 }, szFill));
  }
  E('rect', { x: SZX, y: SZB - SH, width: SW, height: SH, fill: 'none', stroke: MET, 'stroke-width': 8 }, szFront);
  E('path', { d: `M${SZX + SW},${SZB} l${SDX},${SDY} V${SZB - SH + SDY} M${SZX + SW},${SZB - SH} l${SDX},${SDY}`, fill: 'none', stroke: MET, 'stroke-width': 8 }, szFront);
  const plate = G(szFront);   // the sign plate at the bottom (also hides Ah Boy's shirt hem)
  E('rect', { x: SZX - 4, y: SZB - 52, width: SW + 8, height: 56, rx: 6, fill: '#FFD23F', stroke: '#14161A', 'stroke-width': 4 }, plate);
  T(plate, SZX + SW / 2, SZB - 16, 'CABIN', { size: 28, weight: 800, anchor: 'middle', fill: '#14161A', ls: 2 });
  const szLab = G(szFront);
  mkMath(szLab, SZX + SW / 2, SZB - SH + 34, '40 cm', { size: 28, anchor: 'middle', fill: '#FFFFFF', weight: 700, halo: '#3A4250' });
  mkMath(szLab, SZX - 12, SZB - SH / 2 - 20, '55 cm', { size: 28, anchor: 'end', fill: '#FFFFFF', weight: 700, halo: '#3A4250' });
  mkMath(szLab, SZX + SW + SDX + 10, SZB - SH / 2 + 30, '20 cm', { size: 28, anchor: 'start', fill: '#FFFFFF', weight: 700, halo: '#3A4250' });

  // the gate board
  const gBoard = G(Lfg), BX = 935;
  paper(gBoard, 702, 108, 466, 470);
  // (gate) the rule
  const gRule = G(gBoard);
  E('path', { d: 'M702,124 Q702,108 718,108 L1152,108 Q1168,108 1168,124 L1168,160 L702,160 Z', fill: '#14161A' }, gRule);
  T(gRule, BX, 145, 'CABIN BAGS MUST FIT', { size: 28, weight: 800, anchor: 'middle', fill: '#FFD23F', ls: 2 });
  mkText(gRule, BX, 226, 'the measuring frame:', { size: 30, anchor: 'middle', fill: MUTED });
  mkMath(gRule, BX, 300, '55 cm × 40 cm × 20 cm', { size: 40, anchor: 'middle', fill: INK, weight: 700 });
  // (lita, ml) Lita's cube diagram and working
  const gLita = G(gBoard);
  const cubeD = mkCuboid(gLita, 1, 1, 1, { unit: 130, col: '#9FD8F5', ink: INK, labels: ['10 cm', '10 cm', '10 cm'], size: 28 });
  tr(cubeD, 830, 330);
  const cubeGrid = G(gLita); let cg = '';
  for (let i = 1; i < 10; i++) cg += `M${830 + i * 13},330 v-130 M830,${330 - i * 13} h130 `;
  E('path', { d: cg, stroke: '#2E7DB8', 'stroke-width': 1.5, opacity: 0.8 }, cubeGrid);
  const tinyHi = E('rect', { x: 830, y: 317, width: 13, height: 13, fill: '#FF6B8A', stroke: INK, 'stroke-width': 2 }, gLita);
  const litaW = mkWorking(gLita, 900, 420, ['10 × 10 × 10 = 1000 cm³', '= 1 "litre"'], { size: 36, fill: INK, gap: 16 });
  const mlG = G(gLita);
  const tinyBig = lbCube(mlG, 60, '#FF6B8A'); tr(tinyBig, 1070, 262);
  mkMath(mlG, 1080, 210, '1 cm', { size: 28, anchor: 'middle', fill: INK, weight: 700 });
  const mlPath = E('path', { d: 'M846,316 Q960,210 1036,262', fill: 'none', stroke: '#FF6B8A', 'stroke-width': 4, 'stroke-dasharray': '10 8' }, mlG);
  const mlMath = G(gLita);
  E('rect', { x: 740, y: 470, width: 390, height: 76, rx: 14, fill: 'rgba(255,107,138,0.14)', stroke: '#FF6B8A', 'stroke-width': 3 }, mlMath);
  mkMath(mlMath, BX, 525, '1 cm³ = 1 ml', { size: 46, anchor: 'middle', fill: INK, weight: 800 });
  // (sizer) 44 litres
  const gSz = G(gBoard);
  mkText(gSz, BX, 214, 'the **frame** holds', { size: 32, anchor: 'middle', fill: INK, boldFill: BLUE });
  const szW = mkWorking(gSz, 975, 250, ['55 × 40 × 20 = 44,000 cm³', '44,000 ÷ 1000 = 44 "litres"'], { size: 32, fill: INK, gap: 22 });
  const szCube = G(gSz);
  for (let i = 0; i < 6; i++) tr(lbCube(szCube, 26, '#6EC8FF'), 780 + i * 34, 448);
  const szNote = mkText(szCube, 990, 458, '× 44', { size: 36, fill: BLUE });
  const szDiv = mkText(gSz, BX, 530, '{{1000 cm³ = 1}} litre, so **÷ 1000**', { size: 28, anchor: 'middle', fill: MUTED, boldFill: BERRY });
  // (fit)
  const gFit = G(gBoard);
  mkMath(gFit, BX - 20, 220, '25 "litres" < 44 "litres"', { size: 38, anchor: 'middle', fill: GREEN, weight: 700 });
  tr(tick(gFit, 18, GREEN), BX + 196, 206);
  const cBoy = mkChip(Lfg, 'Ah Boy ≈ **25 litres**', { size: 32, col: '#FF8A3D' });
  const cFit = mkChip(Lfg, 'cabin bags must fit', { size: 30, col: GOLD });
  const gNot = G(gBoard);
  mkText(gNot, BX, 300, 'Ah Boy is', { size: 36, anchor: 'middle', fill: INK });
  mkText(gNot, BX, 370, '**NOT**', { size: 64, anchor: 'middle', fill: RED });
  mkText(gNot, BX, 430, 'hand luggage', { size: 36, anchor: 'middle', fill: INK });

  /* ================= B: the cabin, seat 47A, night ================= */
  const cabShot = G(Lbg);
  const cab = lcCabin(cabShot, {});
  const cabF = G(Lfront); cabF.appendChild(cab.front); cabF.appendChild(cab.top);
  const seatTag = G(cabShot); tr(seatTag, 330, 223);
  E('rect', { x: -44, y: -22, width: 88, height: 44, rx: 8, fill: '#14161A' }, seatTag);
  T(seatTag, 0, 11, '47A', { size: 30, weight: 800, anchor: 'middle', fill: '#FFD23F' });
  // the blanket, held up (seat, dad), then over Dad (cold)
  const blanketUp = G(Lfg);
  lbBlanket(blanketUp, 300, 225);
  mkMath(blanketUp, 0, -128, '2 "m"', { size: 34, anchor: 'middle', fill: INK, weight: 800, halo: '#FFFFFF' });
  mkMath(blanketUp, 166, 12, '1.5 "m"', { size: 34, anchor: 'start', fill: INK, weight: 800, halo: '#FFFFFF' });
  const cBlank = mkChip(Lfg, 'Seat **47A** · the blanket', { size: 30, col: GOLD });
  // Dad's maths card
  const dCard = G(Lfg);
  paper(dCard, 690, 430, 470, 236);
  T(dCard, 925, 474, "Dad's maths:", { size: 30, weight: 700, anchor: 'middle', fill: MUTED });
  const dW = mkWorking(dCard, 925, 500, [{ m: '2 × 1.5 = 3 "m"^2', col: INK }, { m: '3 × 100 = 300 cm²', col: RED }], { size: 40, gap: 22 });
  const dQ = T(dCard, 925 + 190, dW.lineY[1], '?', { size: 44, weight: 800, fill: RED });
  // the board for Lita's lesson
  const cBoard = G(Lfg), CX = 905;
  paper(cBoard, 640, 108, 528, 572);
  // (area, square) the 1 m square, 100 x 100
  const gSq = G(cBoard), SQX = 765, SQY = 196, SQ = 300;
  const sqFill = E('rect', { x: SQX, y: SQY, width: SQ, height: 0, fill: '#BFE6FF' }, gSq);
  let gd = ''; for (let i = 1; i < 100; i++) { const v = (i * SQ / 100).toFixed(1); gd += `M${SQX + +v},${SQY} v${SQ} M${SQX},${SQY + +v} h${SQ} `; }
  E('path', { d: gd, stroke: '#2E7DB8', 'stroke-width': 0.7, opacity: 0.55 }, gSq);
  E('rect', { x: SQX, y: SQY, width: SQ, height: SQ, fill: 'none', stroke: INK, 'stroke-width': 4 }, gSq);
  const rowHi = E('rect', { x: SQX, y: SQY, width: SQ, height: 3, fill: '#FF6B8A' }, gSq);
  const colHi = E('rect', { x: SQX, y: SQY, width: 3, height: SQ, fill: '#FF6B8A' }, gSq);
  const lAlong = mkText(gSq, SQX + SQ / 2, SQY - 18, '**100** squares along', { size: 28, anchor: 'middle', fill: INK, boldFill: BERRY });
  const lRows = G(gSq); mkText(lRows, 0, 0, '**100** rows', { size: 28, anchor: 'middle', fill: INK, boldFill: BERRY });
  lRows.setAttribute('transform', `translate(${SQX - 18} ${SQY + SQ / 2}) rotate(-90)`);
  const lOne = G(gSq);
  mkMath(lOne, SQX + SQ + 14, SQY + SQ / 2 + 10, '1 "m"', { size: 30, fill: INK, weight: 700 });
  const sqMath = mkMath(gSq, CX, 570, '1 "m"^2 = 100 × 100 = 10,000 cm²', { size: 36, anchor: 'middle', fill: INK, weight: 700 });
  const sqRing = E('rect', { x: CX + sqMath.w / 2 - 170, y: 535, width: 178, height: 50, rx: 10, fill: 'none', stroke: GREEN, 'stroke-width': 4 }, gSq);
  const cSq = mkChip(cBoard, '**square it** for area', { size: 32, col: BERRY, solid: false, fill: '#FFF0F6' });
  tr(cSq, CX, 638);
  // (safe) change the lengths first
  const gSafe = G(cBoard);
  mkText(gSafe, CX, 168, 'change the **lengths** first', { size: 32, anchor: 'middle', fill: INK, boldFill: BLUE });
  const safeW = mkWorking(gSafe, 880, 210, ['2 "m" = 200 cm', '1.5 "m" = 150 cm', { m: '200 × 150 = 30,000 cm²', col: GREEN }], { size: 38, fill: INK, gap: 22 });
  const safeChk = G(gSafe);
  E('line', { x1: 680, y1: 470, x2: 1130, y2: 470, stroke: '#C9D3DC', 'stroke-width': 3 }, safeChk);
  mkText(safeChk, CX, 520, 'check: **same answer**', { size: 28, anchor: 'middle', fill: MUTED, boldFill: GREEN });
  mkMath(safeChk, CX - 20, 590, '3 × 10,000 = 30,000', { size: 40, anchor: 'middle', fill: GREEN, weight: 700 });
  tr(tick(safeChk, 18, GREEN), CX + 200, 576);
  // (cube) 1 m³ = 1000 litres
  const gCube = G(cBoard);
  const CUX = 680, CUY = 612, CU = 150;
  const bigCube = mkCuboid(gCube, 1, 1, 1, { unit: CU, col: '#CFEAFB', ink: INK, labels: ['1 m', '', ''], size: 28 });
  tr(bigCube, CUX, CUY);
  const litas = G(gCube);   // little Litas stacking in the front layer
  const LC = CU / 10;
  const litaCells = [];
  for (let r = 0; r < 10; r++) for (let c = 0; c < 10; c++) if (r === 0 || c === 0 || (r <= 3 && c < 5)) {
    litaCells.push({ el: E('rect', { x: CUX + c * LC + 1, y: CUY - (r + 1) * LC + 1, width: LC - 2, height: LC - 2, fill: '#6EC8FF', stroke: '#1E5A7A', 'stroke-width': 1.2 }, litas), k: r * 10 + c });
  }
  litaCells.sort((a, b) => a.k - b.k);   // the bottom row first, then upwards
  const cubeX = mkText(gCube, 1035, 492, '**× 1000**\nof me!', { size: 32, anchor: 'middle', fill: BLUE });
  const cubeW = mkWorking(gCube, 785, 168, ['1 "m"^3 = 100 × 100 × 100 cm³', '= 1,000,000 cm³', { m: '= 1000 "litres"', col: GREEN }], { size: 31, fill: INK, gap: 18 });
  const cCube = mkChip(cBoard, '**cube it** for volume', { size: 30, col: BLUE, fill: '#EAF3FB' });
  tr(cCube, 1040, 646);
  const cubeCm = mkMath(gCube, 1035, 425, '"1 m = 100 cm"', { size: 26, anchor: 'middle', fill: MUTED });
  // the blanket over Dad (cold)
  const blanketOn = G(Ltop);
  lbBlanket(blanketOn, 200, 110);
  const blTag = mkChip(blanketOn, '30,000 cm²', { size: 28, col: '#FFFFFF', fill: 'rgba(10,27,39,0.85)' });
  tr(blTag, 0, -4);
  const shiver = G(Lfg);
  E('path', { d: 'M-130,-40 l-14,-8 M-136,-14 l-18,0 M-130,12 l-14,8 M130,-40 l14,-8 M136,-14 l18,0 M130,12 l14,8', stroke: '#7FD3FF', 'stroke-width': 5, 'stroke-linecap': 'round' }, shiver);

  /* ================= Mars ================= */
  const marsShot = G(Lbg);
  const mars = lcMars(marsShot);

  /* ================= the cast (built once) ================= */
  const mum = cast(Lcast, 'mum', { prop: null, hand: true });
  const dad = cast(Lcast, 'dad', { prop: null, hand: true });
  const kav = cast(Lcast, 'kavya');
  const boy = cast(Lcast, 'boy');
  const Llita = G(Ltop);
  const lita = cast(Llita, 'lita');
  const rosette = lcRosette(Lfg);
  const ltLita = lcLowerThird(Lhud, 'lita');

  /* cut points */
  const cB = at('seat') - 0.06;
  const cM0 = end('dad') + 0.02, cM1 = at('area') + 0.6;      // Mars
  // gate positions
  const GY = 455, GS = 0.8, XM = 80, XD = 200, XK = 320, XB = 432;
  const BOXX = SZX + SW / 2, BOXY = 598;                       // Ah Boy inside the sizer
  const LTOPX = SZX + SW / 2 + SDX / 2, LTOPY = SZB - SH + SDY / 2 - 6;   // Lita standing on the sizer
  // cabin positions
  const CY = 452, KX = 120, DX = 330, MX = 520, LX = 578, LY = 620;

  return t => {
    const sMars = on(t, cM0, cM1);
    const sA = on(t, -1, cB), sB = on(t, cB, 1e9) && !sMars;
    const who = scWho(S, t);
    op(gateShot, sA); op(gateF, sA); op(sizer, sA); op(gBoard, sA);
    op(cabShot, sB); op(cabF, sB); op(cBoard, 0); op(blanketUp, 0); op(dCard, 0); op(blanketOn, 0); op(shiver, 0);
    op(marsShot, sMars);
    op(cBoy, 0); op(cFit, 0); op(cBlank, 0);
    rosette.set(0, 0);
    ltLita.set(win(t, at('lita') + 0.15, at('lita') + 3.2, 0.3));
    const vis = { mum: 0, dad: 0, kav: 0, boy: 0, lita: 0 };

    /* ---------- A: the gate ---------- */
    if (sA) {
      // the board: one beat per line
      show(gRule, t, at('gate') + 0.3, at('lita') - 0.2);
      show(gLita, t, at('lita') + 0.2, at('sizer') - 0.15);
      litaW.show(0, P(t, mid('lita', 0.45), 0.4, linear)); litaW.show(1, P(t, mid('lita', 0.8), 0.4, linear));
      cubeD.labels(P(t, mid('lita', 0.3), 0.4, linear));
      op(litaW, 1 - P(t, at('ml') + 0.1, 0.2, linear));
      op(cubeGrid, P(t, at('ml'), 0.3, linear));
      op(tinyHi, P(t, mid('ml', 0.2), 0.3, linear));
      op(mlG, P(t, mid('ml', 0.3), 0.3, linear));
      mkDraw(mlPath, P(t, mid('ml', 0.3), 0.4, ease));
      op(mlMath, P(t, mid('ml', 0.55), 0.3, linear));
      show(gSz, t, at('sizer') + 0.1, mid('fit', 0.2));
      szW.show(0, P(t, at('sizer') + 0.2, 0.4, linear)); szW.show(1, P(t, mid('sizer', 0.55), 0.4, linear));
      op(szCube, P(t, mid('sizer', 0.7), 0.3, linear)); op(szDiv, P(t, mid('sizer', 0.55), 0.3, linear));
      szW.ring(1, P(t, mid('sizer', 0.85), 0.3, linear));
      show(gFit, t, mid('fit', 0.3), 1e9);
      // the sizer fills with litre squares while Kavya works out 44 litres
      const fp = P(t, mid('sizer', 0.25), dur('sizer') * 0.6, linear) * (1 - P(t, at('fit') + 0.1, 0.3, linear));
      fillCells.forEach((c, i) => op(c, clamp(fp * 24 - i) * 0.85));
      if (t < at('lita') - 0.1) { cFit.set(P(t, mid('gate', 0.55), 0.4, linear)); tr(cFit, 600, 395); }
      if (t >= mid('fit', 0.3) && t < at('not') + 0.4) { cBoy.set(P(t, mid('fit', 0.3), 0.4, linear)); tr(cBoy, 935, 520); }
      if (t >= at('not')) { op(gFit, 0); }
      op(gNot, P(t, mid('not', 0.3), 0.25, linear));

      // the family behind the rail
      vis.mum = vis.dad = vis.kav = vis.boy = 1;
      const SPX = { kavya: XK, mum: XM, dad: XD, boy: XB, lita: LTOPX, narr: 700 };
      const sx = SPX[who] !== undefined ? SPX[who] : 700;
      tr(mum, XM, GY, GS); tr(dad, XD, GY, GS); tr(kav, XK, GY, GS);
      // Mum: brisk; deadpan for "not"
      const notT = t >= at('not') - 0.1;
      mum.set({ t, talk: scTalk(S, t, 'mum'), mood: notT ? 'deadpan' : who === 'boy' ? 'annoyed' : 'neutral', look: notT ? 1 : lookAt(XM, sx) });
      dad.set({ t, talk: 0, mood: who === 'lita' ? 'shock' : who === 'boy' ? 'happy' : 'neutral', look: lookAt(XD, sx) });
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: who === 'kavya' ? 'smug' : t >= at('fit') ? 'deadpan' : who === 'lita' ? 'happy' : 'neutral', look: who === 'kavya' ? 1 : lookAt(XK, sx) });
      // Ah Boy: behind the rail, then into the sizer (fit), then out again (not)
      const inP = P(t, at('fit') + 0.1, 0.55, ease), outP = P(t, mid('not', 0.25), 0.5, ease);
      const inBox = t >= at('fit') + 0.1 && outP < 0.5;
      const want = inBox ? boyBox : Lcast;
      if (boy.parentNode !== want) want.appendChild(boy);
      let bx = XB, by = GY, bs = GS;
      if (inBox) {
        const p = outP > 0 ? 1 - outP : inP;
        bx = lerp(XB, BOXX, p); by = lerp(GY - 60, BOXY, p) - Math.sin(p * Math.PI) * 120 * (outP > 0 ? 0 : 1); bs = lerp(GS, 0.68, p);
        if (outP > 0) by = lerp(BOXY, BOXY - 230, outP * 2);
      } else if (outP >= 0.5) {
        bx = lerp(BOXX, XB, (outP - 0.5) * 2); by = lerp(GY - 140, GY, (outP - 0.5) * 2);
      }
      tr(boy, bx, by, bs);
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: outP > 0.05 ? 'shock' : 'happy', look: who === 'boy' ? -0.6 : lookAt(bx, sx), lift: who === 'boy' ? 1 : 0 });
      // Lita: bounces out of the sizer on her line and stands on top of it
      if (t >= at('lita') - 0.1) {
        vis.lita = 1;
        const up = P(t, at('lita') - 0.1, 0.6, linear);
        const ly = lerp(SZB - 80, LTOPY - 140 * 0.55, easeOut(up)) - Math.sin(up * Math.PI) * 110;
        const hop = who === 'lita' ? Math.abs(Math.sin(t * 5)) * 8 * AMP : 0;
        tr(lita, LTOPX, ly - hop, 0.55);
        lita.set({ t, talk: scTalk(S, t, 'lita'), mood: t >= at('not') ? 'shock' : who === 'boy' ? 'happy' : 'happy', look: who === 'lita' ? 0.5 : lookAt(LTOPX, sx), grid: who === 'lita' && t >= at('ml') ? 1 : 0, level: 0.75 });
      }
    }

    /* ---------- Mars ---------- */
    if (sMars) mars.set(P(t, cM0, 0.9, linear), 3);

    /* ---------- B: the cabin ---------- */
    if (sB) {
      vis.mum = vis.dad = vis.kav = 1;
      const SPX = { kavya: KX, mum: MX, dad: DX, lita: LX, narr: 900 };
      const sx = SPX[who] !== undefined ? SPX[who] : 900;
      tr(kav, KX, CY, 0.85); tr(mum, MX, CY, 0.85);
      const coldP = P(t, at('cold') - 0.1, 0.4, ease);
      const shake = t >= at('cold') - 0.1 ? Math.sin(t * 40) * 3 * AMP : 0;
      tr(dad, DX + shake, CY + 4 * coldP, 0.9);
      // Dad and the blanket
      const holding = t < at('area') - 0.2;
      let dm = 'neutral';
      if (t < at('dad')) dm = 'happy';
      else if (t < cM0) dm = 'smug';
      else if (t < at('cold') - 0.1) dm = who === 'lita' || who === 'kavya' ? 'sad' : 'neutral';
      else dm = 'sad';
      if (t >= cM1 && t < cM1 + 1.2) dm = 'shock';
      dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: who === 'dad' ? 0.9 : lookAt(DX, sx), lift: holding && t > at('seat') + 0.4 ? 1 : 0, sweat: t >= at('cold') ? 1 : 0 });
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: who === 'kavya' ? 'smug' : (t >= mid('dad', 0.5) && t < at('area')) ? 'annoyed' : t >= at('cold') ? 'deadpan' : 'neutral', look: who === 'kavya' ? 1 : lookAt(KX, sx) });
      mum.set({ t, talk: 0, mood: t >= at('cold') ? 'deadpan' : who === 'lita' ? 'happy' : (t >= mid('dad', 0.5) && t < at('area')) ? 'annoyed' : 'neutral', look: lookAt(MX, sx) });
      if (t < at('area') - 0.2) {
        // the blanket held up (seat), and Dad's working (dad)
        const bp = P(t, at('seat') + 0.3, 0.6, pop);
        op(blanketUp, clamp(bp * 3)); tr(blanketUp, 905, 262, Math.max(0.01, 0.5 + 0.5 * bp));
        if (t < at('dad')) { cBlank.set(P(t, at('seat') + 0.1, 0.4, linear)); tr(cBlank, 905, 425); }
        if (t >= at('dad') - 0.1) {
          op(dCard, 1);
          dW.show(0, P(t, at('dad') + 0.2, 0.4, linear)); dW.show(1, P(t, mid('dad', 0.35), 0.4, linear)); op(dQ, P(t, mid('dad', 0.5), 0.3, linear));
        }
        // "Trust me, I did the maths": the rosette pops on, and falls after Mars
        if (t >= mid('dad', 0.72)) rosette.set(P(t, mid('dad', 0.72), 0.4, linear), P(t, cM1 + 0.05, 0.7, easeIn));
        tr(rosette, DX + 40, CY + 72, 0.6);
      }
      // Lita on the tray table, and the board
      if (t >= cM1 - 0.1) {
        vis.lita = 1;
        const up = P(t, cM1 - 0.1, 0.45, pop);
        tr(lita, LX, LY + 40 * (1 - clamp(up)), Math.max(0.01, 0.5 * clamp(up, 0.2, 1.2)));
        lita.set({ t, talk: scTalk(S, t, 'lita'), mood: t >= at('cold') ? 'sad' : who === 'kavya' ? 'happy' : 'happy', look: who === 'lita' ? 1 : lookAt(LX, sx), grid: who === 'lita' && t < at('safe') ? 1 : 0 });
        op(cBoard, 1 - P(t, at('cold') - 0.15, 0.25, linear));
        // area: the square fills, row by row
        const sqOn = t < at('safe') - 0.1;
        op(gSq, sqOn ? 1 : 0);
        if (sqOn) {
          const rp = P(t, at('area') + 0.4, dur('area') - 0.4, linear);
          attr(sqFill, 'height', SQ * rp);
          op(rowHi, P(t, at('area') + 0.2, 0.3, linear) * (1 - P(t, mid('area', 0.55), 0.3, linear)));
          op(colHi, P(t, mid('area', 0.55), 0.3, linear) * (1 - P(t, end('area'), 0.3, linear)));
          attr(rowHi, 'width', SQ * P(t, at('area') + 0.2, dur('area') * 0.45, linear));
          attr(colHi, 'height', SQ * P(t, mid('area', 0.55), dur('area') * 0.4, linear));
          op(lAlong, P(t, at('area') + 0.4, 0.3, linear)); op(lRows, P(t, mid('area', 0.6), 0.3, linear)); op(lOne, P(t, at('area') + 0.2, 0.3, linear));
          op(sqMath, P(t, at('square') + 0.2, 0.4, linear)); op(sqRing, P(t, mid('square', 0.5), 0.3, linear));
          cSq.set(P(t, mid('square', 0.55), 0.4, linear));
        } else op(cSq, 0);
        // safe: change the lengths first
        op(gSafe, t >= at('safe') - 0.1 && t < at('cube') - 0.1 ? 1 : 0);
        safeW.show(0, P(t, at('safe') + 0.3, 0.35, linear)); safeW.show(1, P(t, mid('safe', 0.3), 0.35, linear)); safeW.show(2, P(t, mid('safe', 0.55), 0.35, linear));
        op(safeChk, P(t, mid('safe', 0.82), 0.3, linear));
        // cube: a thousand Litas
        const cubeOn = t >= at('cube') - 0.1;
        op(gCube, cubeOn ? 1 : 0); op(cCube, cubeOn ? 1 : 0);
        if (cubeOn) {
          bigCube.labels(1);
          const fp = P(t, at('cube') + 0.3, dur('cube') * 0.7, linear);
          litaCells.forEach((c, i) => op(c.el, clamp(fp * litaCells.length * 1.05 - i)));
          op(cubeX, P(t, mid('cube', 0.7), 0.3, linear));
          cubeW.show(0, P(t, at('cube') + 0.3, 0.35, linear)); cubeW.show(1, P(t, mid('cube', 0.35), 0.35, linear)); cubeW.show(2, P(t, mid('cube', 0.6), 0.35, linear));
          op(cubeCm, P(t, at('cube') + 0.4, 0.3, linear));
          cCube.set(P(t, mid('cube', 0.75), 0.4, linear));
        }
      }
      // cold: the blanket over Dad, shivering
      if (t >= at('cold') - 0.1) {
        op(blanketOn, coldP); tr(blanketOn, DX + shake, CY + 98, 1, -3);
        op(shiver, coldP * (0.6 + 0.4 * Math.sin(t * 12))); tr(shiver, DX, CY - 20, 0.9);
      }
    }

    /* characters not in this shot */
    op(mum, vis.mum); op(dad, vis.dad); op(kav, vis.kav); op(boy, vis.boy); op(Llita, vis.lita);
  };

  function dur(id) { return end(id) - at(id); }
});
