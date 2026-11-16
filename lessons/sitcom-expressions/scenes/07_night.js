/* Scene 7: Socks and shoes (changing the subject; double brackets, stretch).
   Shots (hard sitcom cuts):
   N  9 p.m., the party is over: the flat at night (dark window, fairy lights glowing), paper plates; the phone rings.
   R  Uncle Ravi's video call (8 a.m., sunshine in Miami): 77 °F on a thermometer; Kavya and Ah Boy listen.
   M  the machine shot: Kavya, Phil the function machine on the table (lower third), Ravi small in a call window, a card:
      phil: C -> × 9/5 -> + 32 -> F, 25 -> 45 -> 77; a number runs through Phil
      back: lever to REVERSE: F -> − 32 -> × 5/9 -> C, 77 -> 45 -> 25; 77 − 32 = 45, 45 × 5/9 = 25 °C
      letters: changing the subject: F = 9/5 C + 32, F − 32 = 9/5 C, C = 5/9 (F − 32)
      order: y = 3x + 6: x -> × 3 -> + 6 -> y, reversed: y -> − 6 -> ÷ 3 -> x; y − 6 = 3x, x = (y − 6)/3, check 12 -> 2
   K  Ah Boy and Kavya: socks then shoes ON, shoes then socks OFF; then Ah Boy tugging a sock with the shoe still on.
   X  Agent X's confessional: C = 5/9 (F − 32), the ring round C: the subject. "Lucky C."
   D  Dad, Kavya and Agent X: y = 3x + 6 so x = y/3 − 6 ?; undercover as x = 2: y = 12, Dad's gives −2: COVER BLOWN
   F  the front door at night (Mum, Kavya, Dad) with the kolam in an inset: x + 3 by x + 2, area (x + 3)(x + 2);
      Dad: (x + 4)² = x² + 16 ?; the final hold: (x + 4)² = x² + 8x + 16, fairy lights round the door, Dad sad.
   T  top-down kolam: the area model and the four handshakes (Handy); x², 2x, 3x, 6 -> x² + 5x + 6;
      then the square (x + 4)(x + 4): x², 4x, 4x, 16, the two 4x cells flash, x² + 8x + 16, COVER BLOWN. */
scene('night', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.4, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const fadeIn = (t, t0, d) => P(t, t0, d || 0.3, linear);
  const GOLD = '#FFE45C', RED = '#D32F2F', BLUE = '#2E6FD8', GREEN = '#1E9E5A', GREY = '#5A6670', INK = MK.ink, ORANGE = '#E07A12', PURPLE = '#8E44AD';
  const chipC = (parent, text, o) => { o = o || {}; return mkChip(parent, text, Object.assign({ size: o.size || 30, col: o.col || GOLD }, o)); };
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 3, color: o.color || C.ink, weight: 700 }); };
  /* maths pieces on one baseline; gaps: a number or an array (gap after each piece) */
  const row = (parent, cx, y, parts, o) => {
    o = o || {}; const s = o.size || 50, gp = o.gap !== undefined ? o.gap : s * 0.24, gapAt = i => (Array.isArray(gp) ? (gp[i] || 0) : gp);
    const ms = parts.map(p => (typeof p === 'string' ? { m: p } : p)).map(p => Object.assign({}, p, mkMeasure(p.m, { size: s })));
    const Wd = ms.reduce((a, p, i) => a + p.w + (i < ms.length - 1 ? gapAt(i) : 0), 0);
    let x = o.anchor === 'start' ? cx : cx - Wd / 2; const out = [];
    ms.forEach((p, i) => { const g = mkMath(parent, x, y, p.m, { size: s, fill: p.col || o.fill || INK }); out.push({ g, x0: x, w: p.w, cx: x + p.w / 2, a: p.a }); x += p.w + gapAt(i); });
    out.W = Wd; out.x0 = out[0].x0; out.x1 = out[out.length - 1].x0 + out[out.length - 1].w; return out;
  };
  const paper = (parent, x, y, w, h) => { E('rect', { x: x + 6, y: y + 6, width: w, height: h, rx: 18, fill: 'rgba(0,0,0,0.25)' }, parent); return E('rect', { x, y, width: w, height: h, rx: 18, fill: MK.paper, stroke: '#B8A27A', 'stroke-width': 5 }, parent); };
  const strikeLine = (parent, x1, y, x2) => { const l = E('line', { x1, y1: y, x2, y2: y, stroke: RED, 'stroke-width': 7, 'stroke-linecap': 'round' }, parent); mkDash(l); return l; };

  /* layers */
  const Lbg = G(root), Lcast = G(root), Lfront = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= the flat at night ================= */
  const flatShot = G(Lbg);
  const flat = xpFlat(flatShot);
  Lfront.appendChild(flat.front); Lfront.appendChild(flat.top);
  { // night outside the window (under the fairy lights)
    const nightW = G(flat.lights.parentNode); flat.lights.parentNode.insertBefore(nightW, flat.lights);
    E('rect', { x: 150, y: 150, width: 300, height: 270, fill: '#0E1838', opacity: 0.86 }, nightW);
    E('rect', { x: 186, y: 210, width: 150, height: 210, fill: '#2A3550' }, nightW);
    let lw = '';
    [[0, 0], [2, 1], [1, 2], [0, 3], [2, 3]].forEach(([k, r]) => { lw += `M${198 + k * 46},${224 + r * 48} h30 v22 h-30 Z `; });
    E('path', { d: lw, fill: '#FFD86B' }, nightW);
    E('circle', { cx: 405, cy: 190, r: 18, fill: '#FFF6D0' }, nightW);
    E('path', { d: 'M370,240 h3 v3 h-3 Z M420,300 h3 v3 h-3 Z M360,330 h3 v3 h-3 Z M240,180 h3 v3 h-3 Z', fill: '#FFFFFF' }, nightW);
    E('rect', { x: 0, y: 0, width: 1200, height: 470, fill: '#2A1A40', opacity: 0.12 }, flat.mid);
  }
  [[200, 530], [420, 534], [760, 528], [1010, 532]].forEach(([x, y], i) => { const p = G(flat.top); tr(p, x, y, 1, i * 7 - 10); E('ellipse', { rx: 38, ry: 9, fill: '#FFFFFF', stroke: '#B9C4CE', 'stroke-width': 3 }, p); E('ellipse', { cx: 6, cy: -2, rx: 12, ry: 3, fill: '#E2A21C', opacity: 0.6 }, p); });
  const c9 = pill(Lfg, '9 p.m.', { size: 34, color: GOLD, stroke: GOLD });
  const ring = G(Lfg);
  { const b = mkChip(ring, '☎ Uncle Ravi calling…', { size: 30, col: '#56D69B' }); b.set(1); }

  /* the video call (Ravi), built once: big in R, small in M */
  const callG = G(Lfg);
  const call = xpRaviCall(callG, 540, 340, 'Uncle Ravi · Miami');
  const thermo = mkThermometer(Lfg, { min: 0, max: 100, step: 20, minor: 5, h: 290, unit: '°F', ink: INK, readCol: '#C62828', size: 26 });
  const cMiami = chipC(Lfg, 'Miami: **8 a.m.**', { col: '#FFB347' });

  /* ================= the cards on the right (M, K, D) ================= */
  const cardM = G(Lfg); paper(cardM, 600, 110, 560, 545);
  // a box in a machine chain: [x] or [× 9/5]
  const box = (parent, x, y, src, w, col) => { const g = G(parent); E('rect', { x: x - w / 2, y: y - 32, width: w, height: 64, rx: 12, fill: col || '#E9F6FF', stroke: INK, 'stroke-width': 3.5 }, g); const m = mkMath(g, x, y, src, { size: 34, anchor: 'middle', fill: INK }); tr(m, 0, (m.a - m.d) / 2); return g; };
  const CH = [640, 790, 960, 1110], CW = [58, 124, 124, 58];
  function chain(parent, y, srcs, rev, cols) {
    const g = G(parent), parts = srcs.map((s, i) => box(g, CH[i], y, s, CW[i], cols && cols[i]));
    const arr = [0, 1, 2].map(i => { const a = CH[i] + CW[i] / 2 + 6, b = CH[i + 1] - CW[i + 1] / 2 - 6; return rev ? arrow(g, b, y, a, y, { color: ORANGE, width: 4 }) : arrow(g, a, y, b, y, { color: BLUE, width: 4 }); });
    g.parts = parts; g.arr = arr; return g;
  }
  const vals = (parent, y, list, col) => list.map(([x, s]) => { const m = mkMath(parent, x, y, s, { size: 34, anchor: 'middle', fill: col || INK }); return m; });
  const VX = [CH[0], (CH[1] + CH[2]) / 2, CH[3]];
  // page 1: Fahrenheit
  const p1 = G(cardM);
  const fw1 = chain(p1, 180, ['C', '× 9/5', '+ 32', 'F'], false, ['#DFF5E6', null, null, '#FFE2E2']);
  const fv1 = vals(p1, 252, [[VX[0], '25'], [VX[1], '45'], [VX[2], '77']], BLUE);
  const rv1h = mkText(p1, 880, 314, '**REVERSE**: the other way round', { size: 28, anchor: 'middle', fill: GREY, boldFill: ORANGE, weight: 700 });
  const rw1 = chain(p1, 370, ['C', '× 5/9', '- 32', 'F'], true, ['#DFF5E6', '#FFF1D6', '#FFF1D6', '#FFE2E2']);
  const rv1 = vals(p1, 442, [[VX[0], '25'], [VX[1], '45'], [VX[2], '77']], ORANGE);
  const wk1 = mkWorking(p1, 870, 476, ['77 - 32 = 45', '45 × 5/9 = 25'], { size: 40, fill: INK, gap: 22, ringCol: GREEN });
  const ans1 = chipC(p1, '**25 °C**', { col: GREEN, size: 32, fill: '#DFF5E6' }); tr(ans1, 1085, 610);
  // page 2: changing the subject
  const p2 = G(cardM);
  T(p2, 880, 160, 'Changing the subject', { size: 34, weight: 800, anchor: 'middle', fill: INK });
  const wk2 = mkWorking(p2, 800, 196, ['F = 9/5 C + 32', 'F - 32 = 9/5 C', 'C = 5/9 (F - 32)'], { size: 46, fill: INK, gap: 46, ringCol: GREEN });
  const n2a = mkText(p2, 1140, wk2.lineY[1] + 46, '− 32 from both sides', { size: 26, anchor: 'end', fill: ORANGE, weight: 700 });
  const n2b = mkText(p2, 1140, wk2.lineY[2] + 50, '× 5/9 on both sides', { size: 26, anchor: 'end', fill: ORANGE, weight: 700 });
  const c2 = chipC(p2, 'undo it in **reverse order**', { col: ORANGE, size: 28, fill: '#FFF1D6' }); tr(c2, 880, 610);
  // page 3: y = 3x + 6
  const p3 = G(cardM);
  mkText(p3, 880, 160, 'Make {{x}} the subject of {{y = 3x + 6}}', { size: 30, anchor: 'middle', fill: INK, weight: 700 });
  const fw3 = mkText(p3, 880, 236, '**on:**   {{x -> × 3 -> + 6 -> y}}', { size: 36, anchor: 'middle', fill: BLUE, weight: 700 });
  const rw3 = mkText(p3, 880, 306, '**off:**   {{y -> - 6 -> ÷ 3 -> x}}', { size: 36, anchor: 'middle', fill: ORANGE, weight: 700 });
  const wk3 = mkWorking(p3, 830, 368, ['y - 6 = 3x', 'x = (y - 6)/3'], { size: 46, fill: INK, gap: 28, ringCol: GREEN });
  const ck3 = G(p3);
  const ckm = mkText(ck3, 870, 612, 'check {{y = 12}}:  {{(12 - 6)/3 = 2}}', { size: 32, anchor: 'middle', fill: GREEN, weight: 700 });
  tr(tick(ck3, 14, GREEN), 870 + ckm.w / 2 + 26, 600);
  const pagesM = [p1, p2, p3];

  // socks card
  const cardK = G(Lfg); paper(cardK, 600, 120, 560, 470);
  T(cardK, 880, 172, 'Socks and shoes', { size: 36, weight: 800, anchor: 'middle', fill: INK });
  const sockRow = (y, lab, first, second, col) => {
    const g = G(cardK);
    T(g, 640, y - 30, lab, { size: 34, weight: 800, fill: col });
    const a = xpSocks(g, { col: '#FF8FC8' }); tr(a, 790, y, 0.62); a.set(first[0], first[1]);
    const b = xpSocks(g, { col: '#FF8FC8' }); tr(b, 1010, y, 0.62); b.set(second[0], second[1]);
    arrow(g, 870, y - 36, 940, y - 36, { color: col, width: 5 });
    return g;
  };
  const kOn = sockRow(300, 'ON', [0, 1], [1, 1], BLUE);
  mkText(kOn, 795, 344, '**1** socks', { size: 28, anchor: 'middle', fill: INK, boldFill: BLUE, weight: 700 });
  mkText(kOn, 1020, 344, '**2** shoes', { size: 28, anchor: 'middle', fill: INK, boldFill: BLUE, weight: 700 });
  const kOff = sockRow(480, 'OFF', [1, 1], [0, 1], ORANGE);
  mkText(kOff, 795, 524, '**1** shoes', { size: 28, anchor: 'middle', fill: INK, boldFill: ORANGE, weight: 700 });
  mkText(kOff, 1020, 524, '**2** socks', { size: 28, anchor: 'middle', fill: INK, boldFill: ORANGE, weight: 700 });
  const cLast = chipC(Lfg, 'on **last** = off **first**', { col: ORANGE, size: 30 });

  // Dad's card
  const cardD = G(Lfg); paper(cardD, 600, 110, 560, 545);
  const dClaim = G(cardD);
  mkText(dClaim, 880, 172, 'Dad: {{y = 3x + 6}}', { size: 40, anchor: 'middle', fill: INK, weight: 700 });
  const dcR = row(dClaim, 880, 262, ['so', 'x = y/3 - 6', { m: '?', col: RED }], { size: 50, gap: 16 });
  const d1 = mkText(cardD, 880, 344, 'undercover as {{x = 2}}', { size: 30, anchor: 'middle', fill: BLUE, weight: 700 });
  const d2 = mkText(cardD, 880, 410, '{{y = 3 × 2 + 6 = 12}}', { size: 36, anchor: 'middle', fill: INK });
  const d3 = mkText(cardD, 880, 494, "Dad's:  {{x = 12/3 - 6 = -2}}", { size: 36, anchor: 'middle', fill: INK });
  const d4 = mkMath(cardD, 880, 590, '-2 != 2', { size: 56, anchor: 'middle', fill: RED });
  const stampD = xpStamp(cardD, false);

  /* ================= X: Agent X's confessional ================= */
  const conf = xpConf(Lbg, 'x');
  const cardX = G(Lfg); paper(cardX, 560, 150, 590, 440);
  T(cardX, 855, 214, 'Changing the subject', { size: 34, weight: 800, anchor: 'middle', fill: GREY });
  const xR = row(cardX, 855, 370, [{ m: 'C', col: GREEN }, '=', '5/9 (F - 32)'], { size: 76, gap: 22 });
  const xRing = E('ellipse', { cx: xR[0].cx, cy: 345, rx: 46, ry: 54, fill: 'none', stroke: '#E2A21C', 'stroke-width': 7 }, cardX); mkDash(xRing);
  const xChip = chipC(cardX, '{{C}} is the **subject**: on its own', { col: '#B57B12', size: 32, fill: '#FFF4D0' }); tr(xChip, 855, 500);

  /* ================= F: the front door at night ================= */
  const doorShot = G(Lbg);
  const door = xpDoor(doorShot);
  Lfront.appendChild(door.front); Lfront.appendChild(door.top);
  E('rect', { x: 880, y: 60, width: 320, height: 500, fill: '#0E1838', opacity: 0.8 }, doorShot);
  E('path', { d: 'M950,120 h3 v3 h-3 Z M1100,90 h3 v3 h-3 Z M1010,250 h3 v3 h-3 Z M1140,200 h3 v3 h-3 Z', fill: '#FFFFFF' }, doorShot);
  // fairy lights round the door frame (cheap: one path per colour, twinkling together)
  const doorLights = G(doorShot);
  E('path', { d: 'M338,560 L338,118 L642,118 L642,560', fill: 'none', stroke: '#2E4A3A', 'stroke-width': 3 }, doorLights);
  const DLC = ['#FF5F5F', '#FFE45C', '#56D69B', '#6EC8FF', '#FF8FC8'], dlP = DLC.map(() => '');
  const dlPts = [];
  for (let i = 0; i < 9; i++) dlPts.push([338, 540 - i * 50]);
  for (let i = 0; i < 6; i++) dlPts.push([370 + i * 50, 118]);
  for (let i = 0; i < 9; i++) dlPts.push([642, 140 + i * 50]);
  const dlD = DLC.map((c, k) => dlPts.filter((q, i) => i % 5 === k).map(([x, y]) => `M${x + 7},${y} A7,9 0 1 1 ${x - 7},${y} A7,9 0 1 1 ${x + 7},${y} Z`).join(' '));
  const dlE = DLC.map((c, k) => E('path', { d: dlD[k], fill: c, stroke: SC_INK, 'stroke-width': 1.5 }, doorLights));
  doorLights.set = (p, t) => dlE.forEach((e, k) => op(e, 0.55 + 0.45 * Math.sin(t * 4 + k * 1.7)));
  const insetF = G(Lfg);
  paper(insetF, 640, 110, 520, 470);
  const kolF = xpKolam(insetF, 480, 430, {}); tr(kolF, 900, 345);
  const AF = { x0: 760, y0: 230, xl: 200, u: 36 };   // x + 3 by x + 2
  const afW = AF.xl + 3 * AF.u, afH = AF.xl + 2 * AF.u;
  const areaF = G(insetF);
  E('rect', { x: AF.x0, y: AF.y0, width: afW, height: afH, fill: 'rgba(255,240,200,0.45)', stroke: '#FFFFFF', 'stroke-width': 6 }, areaF);
  E('path', { d: `M${AF.x0 + AF.xl},${AF.y0} L${AF.x0 + AF.xl},${AF.y0 + afH} M${AF.x0},${AF.y0 + AF.xl} L${AF.x0 + afW},${AF.y0 + AF.xl}`, stroke: '#FFFFFF', 'stroke-width': 4, 'stroke-dasharray': '12 8' }, areaF);
  const labF = (x, y, s) => mkMath(areaF, x, y, s, { size: 44, anchor: 'middle', fill: GOLD, halo: '#6E2418' });
  labF(AF.x0 + AF.xl / 2, AF.y0 - 14, 'x'); labF(AF.x0 + AF.xl + 1.5 * AF.u, AF.y0 - 14, '3');
  labF(AF.x0 - 26, AF.y0 + AF.xl / 2 + 12, 'x'); labF(AF.x0 - 26, AF.y0 + AF.xl + AF.u + 12, '2');
  const cAreaF = chipC(Lfg, '"Area" = {{(x + 3)(x + 2)}}', { col: GOLD, size: 34 });
  const cardDsq = G(Lfg); paper(cardDsq, 640, 160, 520, 340);
  T(cardDsq, 900, 224, 'Dad:', { size: 36, weight: 800, anchor: 'middle', fill: GREY });
  const dsqR = row(cardDsq, 900, 330, ['(x + 4)^2 = x^2 + 16', { m: '?', col: RED }], { size: 54, gap: 16 });
  const dsqFix = G(cardDsq);
  mkMath(dsqFix, 900, 440, '(x + 4)^2 = x^2 + 8x + 16', { size: 48, anchor: 'middle', fill: GREEN });
  const dsqS = strikeLine(cardDsq, dsqR[0].x0 + mkMeasure('(x + 4)^2 =', { size: 54 }).w + 8, 314, dsqR[0].x0 + dsqR[0].w + 6);

  /* ================= T: the kolam, top down ================= */
  const topShot = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#A8402E' }, topShot);
  { let tl = ''; for (let x = 60; x < 1200; x += 60) tl += `M${x},0 L${x},750 `; for (let y = 30; y < 750; y += 60) tl += `M0,${y} L1200,${y} `; E('path', { d: tl, stroke: '#8E3424', 'stroke-width': 2 }, topShot); }
  const kolT = xpKolam(topShot, 580, 560, {}); tr(kolT, 330, 405);
  const cardT = G(Lfg); paper(cardT, 650, 110, 510, 545);
  // area model A: (x + 3)(x + 2); model B: (x + 4)(x + 4)
  function areaModel(parent, x0, y0, xl, u, a, b, cells, cols) {
    const g = G(parent), W = xl + a * u, Hh = xl + b * u;
    const rects = [[x0, y0, xl, xl], [x0 + xl, y0, a * u, xl], [x0, y0 + xl, xl, b * u], [x0 + xl, y0 + xl, a * u, b * u]];
    const cg = rects.map(([x, y, w, h], i) => { const c = G(g); E('rect', { x, y, width: w, height: h, fill: cols[i], opacity: 0.92 }, c); const m = mkMath(c, x + w / 2, y + h / 2, cells[i], { size: 44, anchor: 'middle', fill: INK }); tr(m, 0, (m.a - m.d) / 2); return c; });
    const flash = rects.map(([x, y, w, h]) => E('rect', { x: x + 4, y: y + 4, width: w - 8, height: h - 8, fill: 'none', stroke: GOLD, 'stroke-width': 8 }, g));
    E('rect', { x: x0, y: y0, width: W, height: Hh, fill: 'none', stroke: '#FFFFFF', 'stroke-width': 7 }, g);
    E('path', { d: `M${x0 + xl},${y0} L${x0 + xl},${y0 + Hh} M${x0},${y0 + xl} L${x0 + W},${y0 + xl}`, stroke: '#FFFFFF', 'stroke-width': 5 }, g);
    const L = (x, y, s) => mkMath(g, x, y, s, { size: 42, anchor: 'middle', fill: GOLD, halo: '#5A1A10' });
    L(x0 + xl / 2, y0 - 16, 'x'); L(x0 + xl + a * u / 2, y0 - 16, String(a));
    L(x0 - 28, y0 + xl / 2 + 14, 'x'); L(x0 - 28, y0 + xl + b * u / 2 + 14, String(b));
    g.cells = cg; g.flash = flash;
    return g;
  }
  const KC = ['#FFE45C', '#FF8FC8', '#56D69B', '#6EC8FF'];
  const amA = areaModel(topShot, 150, 255, 230, 46, 3, 2, ['x^2', '3x', '2x', '6'], KC);
  const amB = areaModel(topShot, 150, 225, 220, 40, 4, 4, ['x^2', '4x', '4x', '16'], [KC[0], KC[1], KC[1], KC[3]]);
  // the right card: the handshakes and the working
  const pA = G(cardT), pB = G(cardT);
  const hsR = row(pA, 905, 230, ['(', 'x', '+', '3', ')(', 'x', '+', '2', ')'], { size: 62, gap: [2, 14, 14, 2, 2, 14, 14, 2] });
  const HX = { a: hsR[1].cx, b: hsR[3].cx, c: hsR[5].cx, d: hsR[7].cx };
  const hs = [
    arrow(pA, HX.a, 172, HX.c, 172, { color: BLUE, width: 4, bend: -30 }),
    arrow(pA, HX.a, 172, HX.d, 168, { color: BLUE, width: 4, bend: -56 }),
    arrow(pA, HX.b, 254, HX.c, 256, { color: ORANGE, width: 4, bend: 30 }),
    arrow(pA, HX.b, 254, HX.d, 258, { color: ORANGE, width: 4, bend: 52 }),
  ];
  const wkA = mkWorking(pA, 720, 350, ['= x^2 + 2x + 3x + 6', '= x^2 + 5x + 6'], { size: 46, fill: INK, gap: 30, ringCol: GREEN });
  const collA = E('rect', { x: 0, y: 0, width: 10, height: 10, rx: 10, fill: 'rgba(86,214,155,0.35)' }, pA);
  pA.insertBefore(collA, pA.firstChild);
  const c4 = chipC(pA, '**4** handshakes, **4** products', { col: BLUE, size: 30, fill: '#E8F1FF' }); tr(c4, 905, 600);
  const bR = row(pB, 905, 200, ['(x + 4)^2', '=', '(x + 4)(x + 4)'], { size: 46, gap: 14 });
  const wkB = mkWorking(pB, 700, 260, ['= x^2 + 4x + 4x + 16', '= x^2 + 8x + 16'], { size: 44, fill: INK, gap: 30, ringCol: GREEN });
  const bDad = G(pB);
  const bdR = row(bDad, 905, 510, [{ m: 'Dad:', col: GREY }, { m: 'x^2 + 16', col: RED }], { size: 44, gap: 18 });
  const bdS = strikeLine(bDad, bdR[1].x0 - 8, 496, bdR[1].x0 + bdR[1].w + 8);
  const stampB = xpStamp(pB, false);

  /* ================= the cast ================= */
  const kav = cast(Lcast, 'kavya');
  const mum = cast(Lcast, 'mum', { hand: true });
  const bowl = G(mum.hand);
  E('path', { d: 'M-40,-40 Q0,10 40,-40 Z', fill: '#C8642E', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, bowl);
  E('ellipse', { cx: 0, cy: -40, rx: 40, ry: 9, fill: '#FFFDF6', stroke: SC_INK, 'stroke-width': 3 }, bowl);
  const dad = cast(Lcast, 'dad');
  const boy = cast(Lcast, 'boy');
  // Ah Boy's pulling arm, the shoe on the table and the stretched sock
  const boyArm = G(Lcast);
  const armP0 = E('path', { d: '', fill: 'none', stroke: SC_INK, 'stroke-width': 30, 'stroke-linecap': 'round' }, boyArm);
  const armP1 = E('path', { d: '', fill: 'none', stroke: '#F28C28', 'stroke-width': 22, 'stroke-linecap': 'round' }, boyArm);
  const shoeG = G(flat.top);
  const shoe = xpSocks(shoeG, { col: '#FF8FC8' }); shoe.set(1, 0);
  const sockO = E('path', { d: '', fill: 'none', stroke: SC_INK, 'stroke-width': 36, 'stroke-linecap': 'round' }, Lfg);
  const sockI = E('path', { d: '', fill: 'none', stroke: '#FF8FC8', 'stroke-width': 28, 'stroke-linecap': 'round' }, Lfg);
  const sockS = E('path', { d: '', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 28, 'stroke-dasharray': '6 22', opacity: 0.7 }, Lfg);
  const fist = E('circle', { r: 19, fill: SC_SKIN.medium, stroke: SC_INK, 'stroke-width': 4 }, Lfg);
  const phil = cast(Lcast, 'phil');
  const slots = {};
  const hlA = E('rect', { x: -54, y: -32, width: 108, height: 64, rx: 8, fill: '#FFE45C', opacity: 0 }, phil.slotA);
  const hlB = E('rect', { x: -54, y: -32, width: 108, height: 64, rx: 8, fill: '#FFE45C', opacity: 0 }, phil.slotB);
  [['A', '× 9/5'], ['A', '× 5/9'], ['A', '× 3'], ['A', '÷ 3'], ['B', '+ 32'], ['B', '- 32'], ['B', '+ 6'], ['B', '- 6']].forEach(([k, s]) => {
    const m = mkMath(k === 'A' ? phil.slotA : phil.slotB, 0, 0, s, { size: 32, anchor: 'middle', fill: INK }); tr(m, 0, (m.a - m.d) / 2); slots[k + s] = m;
  });
  const ax = cast(Lcast, 'x');
  const badgeX2 = mkMath(ax.badge, 0, 0, 'x = 2', { size: 34, fill: INK, anchor: 'middle' }); tr(badgeX2, 0, 2 + (badgeX2.a - badgeX2.d) / 2 - 6);
  const handy = cast(Lhud, 'handy');
  // the number that runs through Phil
  const tok = G(Lfg);
  E('rect', { x: -48, y: -30, width: 96, height: 60, rx: 14, fill: '#FFFFFF', stroke: INK, 'stroke-width': 4 }, tok);
  const tokV = {};
  ['25', '77', '25 °C', '12', '2'].forEach(s => { const m = mkMath(tok, 0, 0, s, { size: s.length > 2 ? 28 : 36, anchor: 'middle', fill: INK }); tr(m, 0, (m.a - m.d) / 2); tokV[s] = m; });
  const ltPhil = xpLowerThird(Lhud, 'phil');

  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* ---------- shots ---------- */
  const cut = id => at(id) - 0.06;
  const SHOT = { nine: 'N', ravi: 'R', phil: 'M', back: 'M', socks: 'K', shoes: 'K', letters: 'M', subj: 'X', dad: 'D', blown: 'D', order: 'M',
    kolam: 'F', double: 'T', grid: 'T', dadsq: 'F', sq: 'T' };
  const ORDER = S.ch.lines.map(l => l.id);
  const lineAt = t => { let cur = ORDER[0]; for (const id of ORDER) if (t >= cut(id)) cur = id; return cur; };
  const ALL = [kav, mum, dad, boy, boyArm, phil, ax, handy];
  const PX = 400, PY = 405, PS = 1.08;   // Phil on the table
  const pAbs = (lx, ly) => [PX + lx * PS, PY + ly * PS];

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const cur = lineAt(t), endHold = t > end('sq') + 0.12;
    const sh = endHold ? 'F' : SHOT[cur];
    const flatOn = 'NRMKD'.includes(sh) ? 1 : 0, doorOn = sh === 'F' ? 1 : 0;
    op(flatShot, flatOn); op(flat.front, flatOn); op(flat.top, flatOn);
    op(doorShot, doorOn); op(door.front, doorOn); op(door.top, doorOn);
    op(topShot, sh === 'T' ? 1 : 0); conf.set(sh === 'X' ? 1 : 0, t);
    ALL.forEach(c => op(c, 0));
    [c9, ring, callG, thermo, cardM, cardK, cardD, cardX, insetF, cardDsq, cardT, tok, shoeG, sockO, sockI, sockS, fist].forEach(e => op(e, 0));
    cMiami.set(0); cLast.set(0); cAreaF.set(0);
    ltPhil.set(0);
    const show = (c, x, y, s, st) => { op(c, 1); tr(c, x, y, s); if (c.set) c.set(Object.assign({ t }, st)); };
    if (flatOn) { flat.upd(t, 1); flat.clock.set(9, Math.min(59, Math.floor(t / 4))); }
    if (doorOn) { door.upd(t); doorLights.set(1, t); }

    /* ---------- N: nine p.m. ---------- */
    if (sh === 'N') {
      popIn(c9, t, at('nine') + 0.3, 300, 168);
      if (t > mid('nine', 0.72)) { popIn(ring, t, mid('nine', 0.72), 860, 260, 1, Math.sin(t * 40) * 3 * AMP); }
      const ringing = t > mid('nine', 0.72);
      show(kav, 160, 448, 0.95, { mood: ringing ? 'shock' : 'sad', look: ringing ? 0.8 : 0.3, still: !ringing });
      show(boy, 360, 456, 0.95, { mood: 'happy', look: 0.6 });
      show(ax, 590, 450, 0.55, { mood: 'deadpan', look: 0.4, arms: 0.1 });
      show(mum, 800, 446, 0.95, { mood: ringing ? 'neutral' : 'sad', look: -0.5, still: !ringing });
      show(dad, 1010, 446, 0.95, { mood: ringing ? 'shock' : 'sad', look: -0.6, still: !ringing });
    }

    /* ---------- R: Uncle Ravi ---------- */
    if (sh === 'R') {
      op(callG, 1); tr(callG, 850, 340, Math.max(0.01, P(t, cut('ravi'), 0.25, easeOut)));
      call.ravi.set({ t, talk: scTalk(S, t, 'ravi'), mood: t > mid('ravi', 0.55) ? 'shock' : 'happy', look: -0.3 });
      cMiami.set(P(t, mid('ravi', 0.05), 0.35, linear)); tr(cMiami, 850, 572);
      op(thermo, fadeIn(t, mid('ravi', 0.2))); tr(thermo, 1045, 492, 0.85); thermo.set(lerp(20, 77, P(t, mid('ravi', 0.25), 0.8, easeOut)));
      show(kav, 200, 452, 1.0, { talk: scTalk(S, t, 'kavya'), mood: 'neutral', look: 0.9, lift: 0 });
      show(boy, 410, 458, 0.98, { mood: 'happy', look: 0.9 });
    }

    /* ---------- M: Phil the function machine ---------- */
    if (sh === 'M') {
      op(callG, 1); tr(callG, 150, 216, 0.42);
      const isL = id => cur === id;
      call.ravi.set({ t, talk: scTalk(S, t, 'ravi'), mood: cur === 'back' && t > mid('back', 0.85) ? 'happy' : 'neutral', look: 0.6 });
      op(cardM, 1); pagesM.forEach(p => op(p, 0));
      // Phil
      const rev = cur === 'phil' ? 0 : cur === 'back' ? P(t, mid('back', 0.04), 0.4, ease) : 1;
      for (const k in slots) op(slots[k], 0);
      if (cur === 'order') { op(slots[rev > 0.5 ? 'A÷ 3' : 'A× 3'], 1); op(slots[rev > 0.5 ? 'B- 6' : 'B+ 6'], 1); }
      else { op(slots[rev > 0.5 ? 'A× 5/9' : 'A× 9/5'], 1); op(slots[rev > 0.5 ? 'B- 32' : 'B+ 32'], 1); }
      const pin = P(t, cut('phil'), 0.4, pop);
      const phMood = 'neutral';
      show(phil, PX, lerp(560, PY, Math.min(1, pin)), PS, { talk: scTalk(S, t, 'phil'), mood: phMood, look: -0.3, rev: cur === 'order' ? (t > mid('order', 0.08) ? 1 : 0) : rev, run: 0.6 });
      if (cur === 'phil') ltPhil.set(win(t, at('phil') + 0.1, at('phil') + 3.2, 0.3));
      // the number running through Phil: forward (funnel -> chute) or reverse (chute -> funnel)
      let tk = null;
      const route = (t0, d, fwd, a, b) => {
        const p = clamp((t - t0) / d); if (p <= 0 || p >= 1) return;
        const IN = fwd ? [[-190, -190], [-64, -140]] : [[250, 140], [176, 116]], OUT = fwd ? [[176, 116], [250, 140]] : [[-64, -140], [-190, -190]];
        let q, v, s = 1;
        if (p < 0.3) { const k = p / 0.3; q = [lerp(IN[0][0], IN[1][0], k), lerp(IN[0][1], IN[1][1], k)]; v = a; s = 1 - 0.5 * k * k; }
        else if (p < 0.62) { q = null; hlA.style.opacity = 0; }
        else { const k = (p - 0.62) / 0.38; q = [lerp(OUT[0][0], OUT[1][0], k), lerp(OUT[0][1], OUT[1][1], k)]; v = b; s = 0.5 + 0.5 * Math.min(1, k * 2); }
        const inner = p >= 0.3 && p < 0.62 ? (p - 0.3) / 0.32 : -1;
        op(hlA, inner >= 0 ? (fwd ? (inner < 0.5 ? 0.8 : 0) : (inner >= 0.5 ? 0.8 : 0)) : 0);
        op(hlB, inner >= 0 ? (fwd ? (inner >= 0.5 ? 0.8 : 0) : (inner < 0.5 ? 0.8 : 0)) : 0);
        if (q) { const [x, y] = pAbs(q[0], q[1]); tk = [x, y, v, s]; }
      };
      op(hlA, 0); op(hlB, 0);
      if (cur === 'phil') route(mid('phil', 0.45), 2.6, true, '25', '77');
      if (cur === 'back') route(mid('back', 0.12), 4.2, false, '77', '25 °C');
      if (cur === 'order') route(mid('order', 0.1), 3.4, false, '12', '2');
      if (tk) { op(tok, 1); tr(tok, tk[0], tk[1], tk[3]); for (const k in tokV) op(tokV[k], k === tk[2] ? 1 : 0); }
      // the card
      if (cur === 'phil' || cur === 'back') {
        op(p1, 1);
        fw1.parts.forEach((b, i) => op(b, fadeIn(t, mid('phil', [0.2, 0.32, 0.42, 0.55][i]))));
        fw1.arr.forEach((a, i) => a.set(P(t, mid('phil', [0.3, 0.4, 0.52][i]), 0.3, linear)));
        fv1.forEach((m, i) => op(m, fadeIn(t, mid('phil', 0.45) + [0.1, 1.1, 2.1][i])));
        const bk = cur === 'back';
        op(rv1h, bk ? fadeIn(t, mid('back', 0.04)) : 0);
        rw1.parts.forEach((b, i) => op(b, bk ? fadeIn(t, mid('back', [0.3, 0.3, 0.18, 0.3][i])) : 0));
        rw1.arr.forEach((a, i) => a.set(bk ? P(t, mid('back', [0.66, 0.42, 0.14][i]), 0.3, linear) : 0));
        rv1.forEach((m, i) => op(m, bk ? fadeIn(t, mid('back', [0.82, 0.38, 0.1][i])) : 0));
        wk1.show(0, bk ? P(t, mid('back', 0.32), 0.35) : 0); wk1.show(1, bk ? P(t, mid('back', 0.6), 0.35) : 0);
        wk1.ring(1, bk && t > mid('back', 0.85) ? 1 : 0);
        ans1.set(bk ? P(t, mid('back', 0.86), 0.4, linear) : 0);
      } else if (cur === 'letters') {
        op(p2, 1);
        wk2.show(0, P(t, mid('letters', 0.12), 0.35)); wk2.show(1, P(t, mid('letters', 0.3), 0.35)); wk2.show(2, P(t, mid('letters', 0.62), 0.35));
        op(n2a, fadeIn(t, mid('letters', 0.34))); op(n2b, fadeIn(t, mid('letters', 0.66)));
        wk2.ring(2, t > mid('letters', 0.85) ? 1 : 0);
        c2.set(P(t, mid('letters', 0.85), 0.4, linear));
      } else if (cur === 'order') {
        op(p3, 1);
        op(fw3, 1); op(rw3, fadeIn(t, mid('order', 0.1)));
        wk3.show(0, P(t, mid('order', 0.2), 0.35)); wk3.show(1, P(t, mid('order', 0.6), 0.35));
        wk3.ring(1, t > mid('order', 0.85) ? 1 : 0);
        op(ck3, fadeIn(t, mid('order', 0.88)));
      }
      // Kavya
      const km = cur === 'back' ? (t > mid('back', 0.85) ? 'happy' : 'neutral') : cur === 'order' ? 'happy' : cur === 'letters' ? 'neutral' : 'neutral';
      show(kav, 140, 452, 1.0, { talk: scTalk(S, t, 'kavya'), mood: km, look: cur === 'back' ? -0.2 : 0.9 });
    }

    /* ---------- K: socks and shoes ---------- */
    if (sh === 'K') {
      const tug = cur === 'shoes';
      show(kav, 140, 452, 1.0, { talk: 0, mood: tug ? 'deadpan' : 'happy', look: 0.9, still: tug && t > end('shoes') });
      const bx = 360, by = 446;
      if (!tug) {
        op(cardK, 1);
        op(kOn, fadeIn(t, mid('socks', 0.15))); op(kOff, fadeIn(t, mid('socks', 0.5)));
        cLast.set(P(t, mid('socks', 0.75), 0.4, linear)); tr(cLast, 880, 640);
        show(boy, bx, by, 1.05, { talk: scTalk(S, t, 'boy'), mood: 'happy', look: 0.8 });
      } else {
        // the tug: the shoe stays on, the sock stretches
        const k = 0.5 + 0.5 * Math.sin((t - at('shoes')) * 9);
        const fx = 520 - 40 * k * AMP, fy = 300 - 30 * k * AMP;
        show(boy, bx - 6 * k, by, 1.05, { talk: scTalk(S, t, 'boy'), mood: 'annoyed', look: 0.8, sweat: 1 });
        op(boyArm, 1); tr(boyArm, 0, 0);
        const ad = `M${bx + 60},${by + 70} Q${bx + 110},${by - 20} ${fx.toFixed(1)},${fy.toFixed(1)}`;
        attr(armP0, 'd', ad); attr(armP1, 'd', ad);
        op(shoeG, 1); tr(shoeG, 650, 524, 1.3);
        const cx0 = 650 - 4, cy0 = 524 - 40;
        const sd = `M${cx0},${cy0} Q${(cx0 - 10).toFixed(1)},${((cy0 + fy) / 2).toFixed(1)} ${fx.toFixed(1)},${fy.toFixed(1)}`;
        [sockO, sockI, sockS].forEach(e => { op(e, 1); attr(e, 'd', sd); });
        op(fist, 1); tr(fist, fx, fy);
      }
    }

    /* ---------- X: Lucky C ---------- */
    if (sh === 'X') {
      op(cardX, 1); op(xRing, 1); mkDraw(xRing, P(t, mid('subj', 0.12), 0.5, linear));
      xChip.set(P(t, mid('subj', 0.3), 0.4, linear));
      show(ax, 300, 420, 1.3, { talk: scTalk(S, t, 'x'), mood: 'deadpan', look: 0.6, arms: 0.55, shades: t > mid('subj', 0.6) ? 1 - 0.7 * win(t, mid('subj', 0.6), end('subj') + 0.2, 0.2) : 1 });
    }

    /* ---------- D: Dad's shortcut ---------- */
    if (sh === 'D') {
      op(cardD, 1);
      const bl = cur === 'blown', blAt = mid('blown', 0.68);
      op(dClaim, fadeIn(t, mid('dad', 0.45)));
      op(d1, bl ? fadeIn(t, mid('blown', 0.04)) : 0); op(d2, bl ? fadeIn(t, mid('blown', 0.2)) : 0);
      op(d3, bl ? fadeIn(t, mid('blown', 0.42)) : 0); op(d4, bl ? fadeIn(t, mid('blown', 0.6)) : 0);
      stampD.set(bl ? P(t, blAt, 0.35, linear) : 0); tr(stampD, 880, 258, 0.45);
      const dm = bl ? (t > blAt + 0.2 ? 'sad' : t > blAt ? 'shock' : 'smug') : t > mid('dad', 0.7) ? 'smug' : 'happy';
      show(dad, 150, 450, 1.0, { talk: scTalk(S, t, 'dad'), mood: dm, look: 0.8 });
      show(kav, 340, 452, 0.95, { talk: 0, mood: bl ? (t > blAt ? 'smug' : 'neutral') : 'annoyed', look: bl ? 1 : -0.8 });
      const sh0 = 1 - P(t, blAt - 0.4, 0.5, easeOut);
      show(ax, 500, 452, 0.6, { talk: scTalk(S, t, 'x'), mood: bl && t > blAt ? 'smug' : 'deadpan', look: -0.6, arms: 0.55, shades: bl ? sh0 : 1, badge: bl ? fadeIn(t, at('blown'), 0.2) : 0 });
    }

    /* ---------- F: the front door ---------- */
    if (sh === 'F') {
      const sq = cur === 'dadsq' && !endHold;
      if (cur === 'kolam') {
        op(insetF, fadeIn(t, cut('kolam'), 0.2));
        op(areaF, fadeIn(t, mid('kolam', 0.2)));
        cAreaF.set(P(t, mid('kolam', 0.62), 0.4, linear)); tr(cAreaF, 900, 625);
      } else {
        op(cardDsq, 1); op(dsqFix, endHold ? 1 : 0);
        mkDraw(dsqS, endHold ? 1 : 0); op(dsqR[1].g, endHold ? 0 : fadeIn(t, mid('dadsq', 0.6)));
      }
      show(mum, 150, 442, 1.0, { talk: scTalk(S, t, 'mum'), mood: endHold ? 'deadpan' : 'happy', look: 0.6, lift: cur === 'kolam' && !endHold ? 1 : 0 });
      op(bowl, cur === 'kolam' ? 1 : 0);
      show(kav, 335, 448, 0.95, { talk: 0, mood: sq ? 'annoyed' : endHold ? 'smug' : 'neutral', look: sq ? 0.8 : endHold ? 0.8 : -0.6 });
      const dm = endHold ? 'sad' : sq ? (t > mid('dadsq', 0.6) ? 'smug' : 'happy') : 'neutral';
      show(dad, 520, 442, 1.0, { talk: scTalk(S, t, 'dad'), mood: dm, look: endHold ? -0.4 : -0.6, still: endHold });
    }

    /* ---------- T: the kolam, top down ---------- */
    if (sh === 'T') {
      op(cardT, 1);
      const isB = cur === 'sq';
      op(amA, isB ? 0 : 1); op(amB, isB ? 1 : 0); op(pA, isB ? 0 : 1); op(pB, isB ? 1 : 0);
      amA.flash.forEach(f => op(f, 0)); amB.flash.forEach(f => op(f, 0));
      if (!isB) {
        const g = cur === 'grid';
        const cellT = [0.02, 0.14, 0.24, 0.33];   // x², 2x, 3x, 6 (said in that order: TL, BL, TR, BR)
        const order = [0, 2, 1, 3];
        order.forEach((ci, k) => op(amA.cells[ci], g ? fadeIn(t, mid('grid', cellT[k])) : 0));
        hs.forEach((a, i) => a.set(g ? 1 : P(t, mid('double', 0.42 + i * 0.1), 0.3, linear)));
        // the handshakes light up the matching cell while Handy talks
        if (!g) order.forEach((ci, k) => op(amA.flash[ci], t > mid('double', 0.42 + k * 0.1) + 0.25 && t < mid('double', 0.42 + k * 0.1) + 0.6 ? 1 : 0));
        wkA.show(0, g ? P(t, mid('grid', 0.08), 0.35) : 0); wkA.show(1, g ? P(t, mid('grid', 0.55), 0.35) : 0);
        const ln = wkA.lines[0], cl = g && t > mid('grid', 0.42) && t < mid('grid', 0.75);
        op(collA, cl ? 1 : 0);
        if (cl) { const x1 = wkA.left + mkMeasure('= x^2 +', { size: 46 }).w + 2, w = mkMeasure('2x + 3x', { size: 46 }).w + 14; attr(collA, 'x', x1); attr(collA, 'y', ln.y - 44); attr(collA, 'width', w); attr(collA, 'height', 60); }
        wkA.ring(1, g && t > mid('grid', 0.85) ? 1 : 0);
        c4.set(P(t, g ? at('grid') : mid('double', 0.86), 0.4, linear)); tr(c4, 905, g ? 600 : 400);
        if (!g) {
          const hin = P(t, cut('double'), 0.35, pop);
          show(handy, 905, lerp(800, 560, hin), 0.72, { talk: scTalk(S, t, 'handy'), mood: 'happy', look: 0.6, shake: t > mid('double', 0.4) ? 1 : 0.3, val: '' });
        }
      } else {
        amB.cells.forEach((c, i) => op(c, fadeIn(t, mid('sq', [0.04, 0.12, 0.2, 0.3][i]))));
        const fl = t > mid('sq', 0.08) && t < mid('sq', 0.4) && Math.sin(t * 14) > -0.2;
        op(amB.flash[1], fl ? 1 : 0); op(amB.flash[2], fl ? 1 : 0);
        op(bR[0].g, 1); op(bR[1].g, 1); op(bR[2].g, 1);
        wkB.show(0, P(t, mid('sq', 0.1), 0.35)); wkB.show(1, P(t, mid('sq', 0.42), 0.35)); wkB.ring(1, t > mid('sq', 0.55) ? 1 : 0);
        op(bDad, fadeIn(t, mid('sq', 0.5))); mkDraw(bdS, P(t, mid('sq', 0.62), 0.3, linear));
        const blAt = mid('sq', 0.8);
        stampB.set(P(t, blAt, 0.35, linear)); tr(stampB, 905, 594, 0.42);
        const sin = P(t, cut('sq'), 0.35, pop);
        show(ax, 590, lerp(760, 612, sin), 0.62, { talk: scTalk(S, t, 'x'), mood: t > blAt ? 'smug' : 'deadpan', look: -0.8, arms: 0.55, shades: 1 - P(t, blAt - 0.4, 0.5, easeOut) });
      }
    }
  };
});
