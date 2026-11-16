/* Scene 8: The crew saves you some marks.
   Shots: "6 EXAM TRAPS" over the dimmed flat, the crew lined up on and behind the workbench with numbers ->
   seven snappy talking heads, one trap card each (Squared: area needs ², the ² drops onto cm; Cubed: volume needs ³,
   "−1 mark" stamp; Madam P: the ½ in A = ½bh and A = ½(a + b)h; Uncle Bala: the L-shaped room, every edge traced,
   the dashed line inside crossed, 7 + 9 + 5 + 4 + 2 + 5 = 32 m, then his tape bites him; Carton: 6 faces, not 3,
   SA = 2(lw + lh + wh) = 2(24 + 18 + 12) = 108 cm²; Cubert: 2 m = 200 cm first, 200 x 50 x 30 = 300,000 cm³, not
   3000; Dad: elevations are flat, his 3D cabinet becomes a fridge magnet) -> the box logo "will return" ->
   stinger at the void deck of Blk 417: Day 21, a lorry backs in; Uncle Bala's delivery note "55 m³ FLOOR TILES",
   the lorry tips a mountain of tiles; Mum shocked; Dad "biggest number"; Uncle Bala: "Can... cannot." (tape
   snaps), chip "55 m³ of 1 cm tiles = floors for 100 living rooms", Squared and Cubed hiding behind each other on
   top of the mountain. */
scene('traps', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;
  const talk = (t, who) => scTalk(S, t, who);

  /* ---------- helpers ---------- */
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 3, color: o.color || C.ink, weight: 700 }); };
  const outline = (el, col, w) => { el.setAttribute('stroke', col); el.setAttribute('stroke-width', w); el.setAttribute('paint-order', 'stroke'); el.setAttribute('stroke-linejoin', 'round'); return el; };
  const GOLD = '#FFE45C', INK = MK.ink, GREEN = '#1E9E5A', RED = '#C62828', BLUE = '#2E7DD8', TEAL = '#0E8FB0', ORANGE = '#E07B00';
  const CX = 880;
  function trCard(parent, n) {
    const g = G(parent);
    E('rect', { x: 606, y: 136, width: 560, height: 470, rx: 18, fill: 'rgba(0,0,0,0.3)' }, g);
    E('rect', { x: 600, y: 130, width: 560, height: 470, rx: 18, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, g);
    const head = chip(g, 'TRAP ' + n, { size: 30, fill: '#D32F2F', color: '#FFFFFF', weight: 800 }); tr(head, CX, 182);
    return g;
  }
  const txt = (parent, y, s, o) => mkText(parent, CX, y, s, Object.assign({ size: 34, anchor: 'middle', fill: INK }, o || {}));
  const mth = (parent, y, s, o) => mkMath(parent, CX, y, s, Object.assign({ size: 40, anchor: 'middle', fill: INK }, o || {}));
  const fadeIn = (el, t, t0) => { const p = P(t, t0, 0.3, easeOut); op(el, p); tr(el, 0, 10 * (1 - p)); return p; };
  function trNo(parent, y, s, o) {   // a crossed-out maths line
    const g = G(parent), m = mth(g, y, s, Object.assign({ fill: RED }, o || {}));
    const sl = strike(g, CX - m.w / 2 - 10, y - 12, CX + m.w / 2 + 10, RED);
    g.set = p => sl.set(p);
    return g;
  }

  /* ---------- layers ---------- */
  const Lbg = G(root), Lcast = G(root), Lfront = G(root), Lfg = G(root), Lhud = G(root);

  /* ---------- sets ---------- */
  const flatShot = G(Lbg);
  const flat = avFlat(flatShot);
  Lfront.appendChild(flat.front); Lfront.appendChild(flat.top);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#06110F', opacity: 0.55 }, flatShot);
  const CONFW = ['sq', 'cu', 'perp', 'bala', 'carton', 'cubert', 'dad'];
  const confs = {}; CONFW.forEach(w => { confs[w] = avConf(Lbg, w); });
  // the logo background (as in the cold open)
  const logoBg = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#0E3A5A', '#1E6E8C', true) }, logoBg);
  let rays = '';
  for (let i = 0; i < 16; i++) { const a0 = i / 16 * TAU, a1 = a0 + TAU / 40; rays += `M0,0 L${(Math.cos(a0) * 1100).toFixed(0)},${(Math.sin(a0) * 1100).toFixed(0)} L${(Math.cos(a1) * 1100).toFixed(0)},${(Math.sin(a1) * 1100).toFixed(0)} Z `; }
  const rayP = E('path', { d: rays, fill: '#FFE45C', opacity: 0.07 }, logoBg);
  E('ellipse', { cx: 600, cy: 620, rx: 620, ry: 170, fill: glow('#4CC9F0'), opacity: 0.3 }, logoBg);
  // the void deck of Blk 417
  const deck = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#E9E4DA' }, deck);
  E('rect', { x: 0, y: 0, width: 1200, height: 90, fill: '#B9B2A4' }, deck);
  E('rect', { x: 0, y: 86, width: 1200, height: 10, fill: '#8A8274' }, deck);
  E('rect', { x: 0, y: 560, width: 1200, height: 190, fill: linGrad('#9AA0A6', '#7D848B', true) }, deck);
  let fl = '';
  for (let i = 0; i < 14; i++) fl += `M${i * 100 - 100},750 L${i * 100 + 40},560 `;
  E('path', { d: fl + 'M0,620 L1200,620 M0,690 L1200,690', stroke: '#6E757C', 'stroke-width': 2, opacity: 0.6 }, deck);
  // letterboxes on the back wall
  let lb = '';
  for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) lb += `M${640 + c * 44},${190 + r * 40} h38 v32 h-38 Z `;
  E('path', { d: lb, fill: '#C9483E', stroke: '#7A2A22', 'stroke-width': 2 }, deck);
  [[60, 1], [440, 1], [1060, 1]].forEach(([x]) => {
    E('rect', { x, y: 96, width: 80, height: 470, fill: '#F4EBD8', stroke: '#B8A27A', 'stroke-width': 4 }, deck);
    E('rect', { x: x - 6, y: 96, width: 92, height: 22, fill: '#D9CBAE' }, deck);
  });
  E('rect', { x: 1040, y: 150, width: 120, height: 44, rx: 6, fill: '#2E7DD8', stroke: '#1E4E8C', 'stroke-width': 3 }, deck);
  T(deck, 1100, 182, 'BLK 417', { size: 28, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  // the lorry (side view, cab on the right); the box tips about its back bottom corner
  const lorry = G(deck);
  const box = G(lorry);
  E('rect', { x: 0, y: -230, width: 380, height: 200, rx: 8, fill: '#F4F7FA', stroke: SC_INK, 'stroke-width': 5 }, box);
  T(box, 190, -150, 'BALA RENO', { size: 44, weight: 800, anchor: 'middle', fill: '#E8742C' });
  T(box, 190, -104, 'Can, can!', { size: 30, weight: 700, anchor: 'middle', fill: '#5A6670' });
  const cab = G(lorry);
  E('path', { d: 'M390,-30 L390,-170 L470,-170 L520,-100 L520,-30 Z', fill: '#E8742C', stroke: SC_INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, cab);
  E('path', { d: 'M404,-156 L462,-156 L500,-104 L404,-104 Z', fill: '#BFE6F8', stroke: SC_INK, 'stroke-width': 3 }, cab);
  E('rect', { x: -10, y: -34, width: 540, height: 22, rx: 6, fill: '#5A6670', stroke: SC_INK, 'stroke-width': 4 }, lorry);
  [70, 300, 450].forEach(x => { E('circle', { cx: x, cy: -6, r: 34, fill: '#2A2F36', stroke: SC_INK, 'stroke-width': 4 }, lorry); E('circle', { cx: x, cy: -6, r: 12, fill: '#9AA6B2' }, lorry); });
  // the mountain of tiles
  const mount = G(deck);
  const MT = [];
  [[5, 640], [4, 580], [3, 520], [2, 460], [1, 400]].forEach(([n, y], row) => {
    for (let i = 0; i < n; i++) { const x = 360 - (n - 1) * 70 + i * 140; const tg = avTiles(mount, { n: 3, w: 120 }); tr(tg, x, y); MT.push({ tg, x, y, row }); }
  });
  // stinger chips and the delivery note
  const cDay21 = pill(Lfg, 'Day 21: party morning', { size: 32, color: GOLD, stroke: GOLD });
  const note = G(Lfg);
  E('rect', { x: -170, y: -86, width: 340, height: 172, rx: 10, fill: '#FFFDF6', stroke: SC_INK, 'stroke-width': 4 }, note);
  E('rect', { x: -170, y: -86, width: 340, height: 44, rx: 10, fill: '#E8742C' }, note);
  T(note, 0, -54, 'DELIVERY NOTE', { size: 28, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  mkMath(note, 0, 14, '55 "m"^3', { size: 54, anchor: 'middle', fill: RED, weight: 700 });
  T(note, 0, 64, 'FLOOR TILES', { size: 30, weight: 800, anchor: 'middle', fill: INK });
  const cBig = mkChip(Lfg, '{{55 "m"^3}} of 1 cm tiles = floors for **100** living rooms', { size: 28, col: GOLD });
  const star = G(Lfg);
  const starChip = pill(star, 'BIGGEST NUMBER', { size: 26, color: GOLD, stroke: GOLD });
  const starIcon = G(star);
  E('path', { d: 'M0,-22 L6,-7 L22,-7 L9,3 L14,19 L0,9 L-14,19 L-9,3 L-22,-7 L-6,-7 Z', fill: GOLD, stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, starIcon);
  tr(starChip, 0, 0); tr(starIcon, 130, -24);

  /* ===== intro: 6 EXAM TRAPS ===== */
  const sI = G(Lhud);
  const iHead = outline(T(sI, 600, 236, '6 EXAM TRAPS', { size: 80, weight: 800, anchor: 'middle', fill: GOLD, ls: 3 }), '#5A3A07', 10);
  const iSub = T(sI, 600, 292, 'the crew saves you some marks', { size: 34, weight: 600, anchor: 'middle', fill: C.ink });
  const badgeN = ['1', '1', '2', '3', '4', '5', '6'];
  const badges = badgeN.map(n => { const g = G(sI); E('circle', { r: 26, fill: GOLD, stroke: SC_INK, 'stroke-width': 4 }, g); T(g, 0, 11, n, { size: 30, weight: 800, anchor: 'middle', fill: SC_INK }); return g; });

  /* ===== trap cards ===== */
  // 1 Squared: area needs ²
  const c1 = trCard(Lfg, 1);
  const c1a = txt(c1, 262, 'Every **area** needs', { size: 40, boldFill: TEAL });
  const c1d = avUnitDrop(c1, '24 cm', '²', { size: 96, fill: INK }); tr(c1d, CX, 420);
  const c1e = txt(c1, 540, 'square units: {{"cm"^2}}, {{"m"^2}}', { size: 32, fill: '#5A4A52' });
  // 1 Cubed: volume needs ³
  const c1b = trCard(Lfg, 1);
  const c1ba = txt(c1b, 262, 'Every **volume** needs', { size: 40, boldFill: ORANGE });
  const c1bd = avUnitDrop(c1b, '24 cm', '³', { size: 96, fill: INK }); tr(c1bd, CX, 420);
  const c1bs = mkStamp(c1b, '−1 MARK', '#D32F2F'); tr(c1bs, CX, 530);
  // 2 Madam P: the ½
  const c2 = trCard(Lfg, 2);
  const c2a = txt(c2, 262, 'Never forget the **½**', { size: 42, boldFill: RED });
  const c2b = txt(c2, 330, 'triangle', { size: 30, fill: '#5A4A52' });
  const c2c = mth(c2, 400, 'A = 1/2 b h', { size: 48 });
  const c2d = txt(c2, 466, 'trapezium', { size: 30, fill: '#5A4A52' });
  const c2e = mth(c2, 540, 'A = 1/2 (a + b) h', { size: 48 });
  const halfRings = [[c2c, 400], [c2e, 540]].map(([m, y]) => E('ellipse', { cx: m.x0 + mkMeasure('A = ', { size: 48 }).w + 13, cy: y - 16, rx: 24, ry: 44, fill: 'none', stroke: RED, 'stroke-width': 4 }, c2));
  // 3 Uncle Bala: every edge, never the dashed line
  const c3 = trCard(Lfg, 3);
  const c3a = txt(c3, 250, 'Perimeter: **every** edge', { size: 38, boldFill: BLUE });
  const LP = [[760, 480], [994, 480], [994, 350], [890, 350], [890, 298], [760, 298]];
  const c3s = G(c3);
  E('path', { d: mkPoly(LP), fill: '#DDF1FB', stroke: INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, c3s);
  mkMath(c3s, 748, 400, '7 "m"', { size: 28, anchor: 'end', fill: INK });
  mkMath(c3s, 877, 514, '9 "m"', { size: 28, anchor: 'middle', fill: INK });
  mkMath(c3s, 942, 382, '4 "m"', { size: 28, anchor: 'middle', fill: INK });
  mkMath(c3s, 902, 334, '2 "m"', { size: 28, fill: INK });
  const q1 = mkMath(c3s, 825, 286, '?', { size: 30, anchor: 'middle', fill: RED }), q2 = mkMath(c3s, 1006, 426, '?', { size: 30, fill: RED });
  const f1 = mkMath(c3s, 825, 286, '5 "m"', { size: 28, anchor: 'middle', fill: ORANGE }), f2 = mkMath(c3s, 1006, 426, '5 "m"', { size: 28, fill: ORANGE });
  const c3tr = mkDash(E('path', { d: mkPoly(LP), fill: 'none', stroke: '#FFB020', 'stroke-width': 8, 'stroke-linejoin': 'round' }, c3));
  const c3in = G(c3);
  E('line', { x1: 760, y1: 350, x2: 890, y2: 350, stroke: RED, 'stroke-width': 4, 'stroke-dasharray': '10 8' }, c3in);
  const c3x = cross(c3in, 14, RED); tr(c3x, 825, 350);
  mkText(c3in, 825, 404, '**inside**', { size: 26, anchor: 'middle', fill: RED });
  const c3f = mth(c3, 572, '7 + 9 + 5 + 4 + 2 + 5 = 32 "m"', { size: 32, fill: GREEN });
  // 4 Carton: six faces
  const c4 = trCard(Lfg, 4);
  const c4a = txt(c4, 262, 'A cuboid has **6** faces', { size: 40, boldFill: ORANGE });
  const c4b = G(c4); const c4bt = txt(c4b, 326, 'not 3', { size: 34, fill: RED }); const c4bs = strike(c4b, CX - c4bt.w / 2 - 10, 314, CX + c4bt.w / 2 + 10, RED);
  const c4c = mth(c4, 410, 'SA = 2(lw + lh + wh)', { size: 46 });
  const c4d = txt(c4, 476, 'a {{6 × 4 × 3}} cm box:', { size: 30, fill: '#5A4A52' });
  const c4e = mth(c4, 548, '2(24 + 18 + 12) = 108 cm^2', { size: 38, fill: GREEN });
  // 5 Cubert: same units
  const c5 = trCard(Lfg, 5);
  const c5a = txt(c5, 262, '**Same units** first', { size: 42, boldFill: BLUE });
  const c5b = mth(c5, 336, '2 "m" × 50 cm × 30 cm', { size: 36 });
  const c5c = mth(c5, 410, '2 "m" = 200 cm', { size: 46, fill: BLUE });
  const c5d = mth(c5, 484, '200 × 50 × 30 = 300,000 cm^3', { size: 36, fill: GREEN });
  const c5e = trNo(c5, 554, '2 × 50 × 30 = 3000', { size: 32 });
  // 6 Dad: elevations are flat
  const c6 = trCard(Lfg, 6);
  const c6a = txt(c6, 262, 'Elevations are **flat**', { size: 40, boldFill: GREEN });
  const c63 = G(c6);   // Dad's 3D cabinet (oblique), with a fridge magnet
  E('path', { d: mkPoly([[660, 370], [780, 370], [780, 460], [660, 460]]), fill: '#E2C08A', stroke: INK, 'stroke-width': 4 }, c63);
  E('path', { d: mkPoly([[660, 370], [700, 330], [820, 330], [780, 370]]), fill: '#F0D7A8', stroke: INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, c63);
  E('path', { d: mkPoly([[780, 370], [820, 330], [820, 420], [780, 460]]), fill: '#C99A62', stroke: INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, c63);
  E('path', { d: 'M720,370 L720,460', stroke: INK, 'stroke-width': 3 }, c63);
  const mag = G(c63); tr(mag, 740, 326);
  E('path', { d: 'M-22,0 L-22,-20 A22,22 0 0 1 22,-20 L22,0 L10,0 L10,-20 A10,10 0 0 0 -10,-20 L-10,0 Z', fill: RED, stroke: INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, mag);
  E('path', { d: 'M-22,0 L-10,0 M10,0 L22,0', stroke: '#C9D3DC', 'stroke-width': 6 }, mag);
  mkText(c63, 740, 500, 'fridge magnet', { size: 26, anchor: 'middle', fill: '#5A4A52' });
  const c6x = cross(c6, 30, RED); tr(c6x, 740, 400);
  const c6f = G(c6);   // the flat front elevation
  E('rect', { x: 920, y: 350, width: 160, height: 120, fill: '#FFFFFF', stroke: INK, 'stroke-width': 4 }, c6f);
  E('path', { d: 'M1000,350 L1000,470', stroke: INK, 'stroke-width': 3 }, c6f);
  mkText(c6f, 1000, 500, 'front elevation', { size: 26, anchor: 'middle', fill: GREEN });
  const c6t = tick(c6f, 20, GREEN); tr(c6t, 1060, 320);
  const c6g = txt(c6, 560, 'true shape, no perspective', { size: 30, fill: '#5A4A52' });

  /* ===== logo ===== */
  const sR = G(Lhud);
  const logo = G(sR);
  E('path', { d: 'M-300,-120 L-250,-190 L250,-190 L300,-120 Z', fill: '#B9864A', stroke: SC_INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, logo);
  const flapL = E('path', { d: '', fill: '#EBC48A', stroke: SC_INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, logo);
  const flapR = E('path', { d: '', fill: '#EBC48A', stroke: SC_INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, logo);
  E('rect', { x: -300, y: -120, width: 600, height: 230, rx: 6, fill: '#D9A766', stroke: SC_INK, 'stroke-width': 6 }, logo);
  E('rect', { x: -40, y: -120, width: 80, height: 40, fill: '#C9B48A', opacity: 0.85 }, logo);
  outline(T(logo, 0, -24, 'THINK INSIDE', { size: 56, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 4 }), '#5A3A1A', 10);
  outline(T(logo, 0, 76, 'THE BOX', { size: 96, weight: 800, anchor: 'middle', fill: GOLD, ls: 6 }), '#5A3A1A', 12);
  const rSub = T(sR, 600, 480, 'will return', { size: 46, weight: 600, anchor: 'middle', fill: '#FFFFFF' });

  /* ---------- the cast ---------- */
  const sq = cast(Lcast, 'sq'), cu = cast(Lcast, 'cu'), perp = cast(Lcast, 'perp'), carton = cast(Lcast, 'carton'), cubert = cast(Lcast, 'cubert');
  const bala = cast(Lcast, 'bala'), dad = cast(Lcast, 'dad', { prop: null }), mum = cast(Lcast, 'mum');
  const ALL = [sq, cu, perp, carton, cubert, bala, dad, mum];
  // feet offsets (centre to feet, at s = 1) for standing on the bench
  const FEET = new Map([[sq, 90], [cu, 90], [perp, 140], [carton, 103], [cubert, 73]]);

  /* ---------- shots ---------- */
  const cut = id => at(id) - 0.06;
  const SHOTS = [['I', -9], ['sq', cut('t1')], ['cu', cut('t1b')], ['perp', cut('t2')], ['bala', cut('t3')], ['carton', cut('t4')], ['cubert', cut('t5')], ['dad', cut('t6')],
    ['R', cut('return')], ['W', cut('lorry')]];
  const shotAt = t => { let s = 'I'; for (const [k, t0] of SHOTS) if (t >= t0) s = k; return s; };
  const CARDS = { sq: c1, cu: c1b, perp: c2, bala: c3, carton: c4, cubert: c5, dad: c6 };
  // the intro line-up: [character, x, scale, on the bench?]
  const ROW = [[sq, 380, 0.5, 1], [cu, 470, 0.5, 1], [perp, 585, 0.5, 1], [bala, 725, 0.85, 0], [carton, 870, 0.42, 1], [cubert, 978, 0.55, 1], [dad, 1095, 0.85, 0]];
  const ROWB = [380, 470, 585, 725, 870, 978, 1095];

  return t => {
    const sh = shotAt(t);
    const who = scWho(S, t);
    op(flatShot, sh === 'I' ? 1 : 0); op(flat.front, sh === 'I' ? 1 : 0); op(flat.top, sh === 'I' ? 1 : 0);
    if (sh === 'I') { flat.upd(t); flat.open(0); }
    for (const k in confs) confs[k].set(sh === k ? 1 : 0, t);
    op(logoBg, sh === 'R' ? 1 : 0); op(sI, sh === 'I' ? 1 : 0); op(sR, sh === 'R' ? 1 : 0); op(deck, sh === 'W' ? 1 : 0);
    for (const k in CARDS) op(CARDS[k], sh === k ? 1 : 0);
    [cDay21, note, cBig, star].forEach(e => op(e, 0));
    ALL.forEach(c => op(c, 0));
    const show = (c, x, y, s, st) => { op(c, 1); tr(c, x, y, s); c.set(Object.assign({ t }, st)); };
    if (bala.tape) bala.tape.set(0);

    if (sh === 'I') {
      const hp = P(t, at('intro') + 0.05, 0.45, pop);
      op(iHead, clamp(hp * 2.5)); iHead.setAttribute('transform', `translate(600 210) scale(${Math.max(0.01, 0.6 + 0.4 * hp).toFixed(3)}) translate(-600 -210)`);
      op(iSub, P(t, mid('intro', 0.3), 0.4, linear));
      ROW.forEach(([c, x, s, bench], i) => {
        const p = P(t, mid('intro', 0.35) + i * 0.12, 0.45, pop);
        const y = bench ? 518 - FEET.get(c) * s : 440;
        show(c, x, y + 30 * (1 - clamp(p)), Math.max(0.01, s * (0.7 + 0.3 * p)), { mood: c === dad ? 'smug' : c === perp ? 'deadpan' : c === carton ? 'neutral' : 'happy', look: 0, wave: 0.6, sweat: c === carton ? 1 : 0 });
        op(c, clamp(p * 3));
        popIn(badges[i], t, mid('intro', 0.4) + i * 0.12, ROWB[i], 650);
      });
    } else if (CARDS[sh]) {
      const C0 = cut({ sq: 't1', cu: 't1b', perp: 't2', bala: 't3', carton: 't4', cubert: 't5', dad: 't6' }[sh]);
      const card = CARDS[sh], cp = P(t, C0, 0.25, easeOut);
      tr(card, 30 * (1 - cp), 0);
      if (sh === 'sq') {
        show(sq, 330, 400 - Math.abs(Math.sin(t * 4)) * 10 * AMP, 1.7, { talk: talk(t, 'sq'), mood: t > mid('t1', 0.6) ? 'smug' : 'happy', look: 0.4, wave: t > mid('t1', 0.6) ? 1 : 0.3 });
        fadeIn(c1a, t, at('t1') + 0.1);
        op(c1d, P(t, mid('t1', 0.12), 0.25, linear)); c1d.set(P(t, mid('t1', 0.3), 0.9, linear));
        fadeIn(c1e, t, mid('t1', 0.75));
      } else if (sh === 'cu') {
        show(cu, 330, 400 - Math.abs(Math.sin(t * 4)) * 10 * AMP, 1.7, { talk: talk(t, 'cu'), mood: t > mid('t1b', 0.62) ? 'annoyed' : 'happy', look: 0.4, wave: t < mid('t1b', 0.6) ? 1 : 0.2 });
        fadeIn(c1ba, t, at('t1b') + 0.1);
        op(c1bd, P(t, mid('t1b', 0.15), 0.25, linear)); c1bd.set(P(t, mid('t1b', 0.3), 1.0, linear));
        c1bs.set(P(t, mid('t1b', 0.75), 0.35, linear));
      } else if (sh === 'perp') {
        show(perp, 330, 400, 1.3, { talk: talk(t, 'perp'), mood: t > mid('t2', 0.7) ? 'annoyed' : 'deadpan', look: 0.5, check: t > mid('t2', 0.15) && t < mid('t2', 0.45) ? 1 : 0, point: t > mid('t2', 0.5) ? 1 : 0 });
        fadeIn(c2a, t, at('t2') + 0.1); fadeIn(c2b, t, mid('t2', 0.35)); fadeIn(c2c, t, mid('t2', 0.38));
        fadeIn(c2d, t, mid('t2', 0.55)); fadeIn(c2e, t, mid('t2', 0.58));
        halfRings.forEach(r => op(r, P(t, mid('t2', 0.82), 0.25, linear)));
      } else if (sh === 'bala') {
        const bite = end('t3') - 0.5, bit = t > bite;
        show(bala, 320, 560, 1.4, { talk: talk(t, 'bala'), mood: bit ? 'shock' : 'happy', look: 0.4, lift: 1, sweat: bit ? 1 : 0 });
        bala.tape.set(0.55 * P(t, at('t3') + 0.2, 0.5, easeOut) * (1 - P(t, bite, 0.12, easeIn)), bit ? P(t, bite, 0.6, linear) : 0);
        fadeIn(c3a, t, at('t3') + 0.1); fadeIn(c3s, t, mid('t3', 0.12));
        const tp = P(t, mid('t3', 0.3), mid('t3', 0.62) - mid('t3', 0.3), linear);
        mkDraw(c3tr, tp); op(c3tr, tp > 0 ? 1 : 0);
        const qa = P(t, mid('t3', 0.5), 0.3, linear);
        op(q1, 1 - qa); op(q2, 1 - qa); op(f1, qa); op(f2, qa);
        fadeIn(c3in, t, mid('t3', 0.72));
        fadeIn(c3f, t, mid('t3', 0.88));
      } else if (sh === 'carton') {
        show(carton, 330, 420, 1.35, { talk: talk(t, 'carton'), mood: t > mid('t4', 0.55) ? 'shock' : 'neutral', look: 0.4, sweat: 1, flap: 0.8 });
        fadeIn(c4a, t, at('t4') + 0.1); fadeIn(c4b, t, mid('t4', 0.3)); c4bs.set(P(t, mid('t4', 0.42), 0.3, linear));
        fadeIn(c4c, t, mid('t4', 0.55)); fadeIn(c4d, t, mid('t4', 0.7)); fadeIn(c4e, t, mid('t4', 0.78));
      } else if (sh === 'cubert') {
        show(cubert, 330, 440, 1.6, { talk: talk(t, 'cubert'), mood: 'deadpan', look: 0.4 });
        fadeIn(c5a, t, at('t5') + 0.1); fadeIn(c5b, t, mid('t5', 0.3)); fadeIn(c5c, t, mid('t5', 0.62));
        fadeIn(c5d, t, mid('t5', 0.78)); fadeIn(c5e, t, mid('t5', 0.88)); c5e.set(P(t, mid('t5', 0.95), 0.3, linear));
      } else if (sh === 'dad') {
        show(dad, 320, 572, 1.4, { talk: talk(t, 'dad'), mood: t > mid('t6', 0.55) ? (t > mid('t6', 0.85) ? 'smug' : 'sad') : 'neutral', look: 0.4 });
        fadeIn(c6a, t, at('t6') + 0.1); fadeIn(c63, t, mid('t6', 0.3)); op(c6x, P(t, mid('t6', 0.42), 0.25, linear));
        fadeIn(c6f, t, mid('t6', 0.38)); fadeIn(c6g, t, mid('t6', 0.48));
        const mg = P(t, mid('t6', 0.72), 0.35, easeIn);
        tr(mag, 740, lerp(296, 326, mg), 1, 0); op(mag, mg > 0 ? 1 : 0);
      }
    } else if (sh === 'R') {
      tr(rayP, 600, 620, 1, (t * 6 * AMP) % 360);
      popIn(logo, t, at('return') + 0.05, 600, 280);
      const fa = Math.sin(t * 2.2) * 6 * AMP;
      attr(flapL, 'd', `M-300,-120 L-40,-120 L${-70 + fa},${-188 - fa} L${-330 + fa},${-170 - fa} Z`);
      attr(flapR, 'd', `M300,-120 L40,-120 L${70 - fa},${-188 - fa} L${330 - fa},${-170 - fa} Z`);
      op(rSub, P(t, mid('return', 0.5), 0.4, linear));
    } else {
      /* ---------- the stinger: the void deck ---------- */
      popIn(cDay21, t, at('lorry') + 0.1, 860, 130); if (t > end('lorry') + 0.3) op(cDay21, 0);
      // the lorry backs in, then tips its box
      const back = P(t, mid('lorry', 0.4), 2.4, easeOut);
      tr(lorry, lerp(1300, 640, back), 600);
      const tip = P(t, mid('deliver', 0.55), 0.8, ease);
      box.setAttribute('transform', `rotate(${(-22 * tip).toFixed(2)} 0 -30)`);
      // the mountain: rows appear bottom first
      MT.forEach(({ tg, x, y, row }, i) => {
        const p = P(t, mid('deliver', 0.62) + i * 0.07, 0.3, easeOut);
        op(tg, p); tr(tg, x + 40 * (1 - p), y - 30 * (1 - p));
      });
      // the humans in the foreground
      const sayBala = who === 'bala';
      const snap = mid('cannot', 0.5), snapped = t > snap;
      show(bala, 230, 650, 1.0, { talk: talk(t, 'bala'), mood: t >= at('cannot') ? (snapped ? 'shock' : 'deadpan') : t >= at('who') ? 'sad' : 'happy', look: sayBala ? 0.5 : who === 'mum' ? 0.8 : who === 'dad' ? 1 : 0.6, lift: t >= at('deliver') && t < at('who') ? 1 : 0, sweat: snapped ? 1 : 0 });
      bala.tape.set(t >= at('cannot') ? 0.4 * (1 - P(t, snap, 0.12, easeIn)) : 0, snapped ? P(t, snap, 0.6, linear) : 0);
      const mIn = P(t, at('who') - 0.3, 0.35, pop);
      if (t >= at('who') - 0.3) show(mum, 600, lerp(800, 650, mIn), 1.0, { talk: talk(t, 'mum'), mood: t >= at('bigger') ? 'deadpan' : 'shock', look: who === 'dad' ? 0.8 : who === 'bala' ? -0.8 : -0.4 });
      const dIn = P(t, at('bigger') - 0.3, 0.35, pop);
      if (t >= at('bigger') - 0.3) show(dad, 960, lerp(800, 650, dIn), 1.0, { talk: talk(t, 'dad'), mood: t >= at('cannot') ? 'sad' : 'smug', look: -0.7 });
      if (t >= mid('deliver', 0.1)) { const np = popIn(note, t, mid('deliver', 0.1), 360, 330); if (t > at('who')) op(note, 0); }
      if (t >= mid('bigger', 0.35)) {
        const sp = P(t, mid('bigger', 0.35), 0.45, pop);
        op(star, clamp(sp * 2.5)); tr(star, 930, 470, Math.max(0.01, 0.6 + 0.4 * sp));
        const fall = P(t, mid('cannot', 0.6), 0.8, easeIn);
        tr(starIcon, 130 + 20 * fall, -24 + 420 * fall, 1, t * 40 * AMP + 200 * fall);
      }
      if (t >= mid('cannot', 0.6)) popIn(cBig, t, mid('cannot', 0.6), 640, 150);
      // Squared and Cubed hiding behind each other on top of the mountain
      if (t >= at('cannot') - 0.2) {
        const hp = P(t, at('cannot') - 0.2, 0.4, easeOut);
        show(cu, 392, 304 + 40 * (1 - hp), 0.42, { mood: 'shock', look: -0.6, wave: 0, still: true });
        show(sq, 348, 308 + 40 * (1 - hp), 0.42, { mood: 'shock', look: 0.6, wave: 0, still: true });
        op(cu, hp); op(sq, hp);
      }
    }
  };
});
