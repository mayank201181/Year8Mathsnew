/* Scene 6: One lap (compound shapes with circles).
   2 p.m., the school track: Priya challenges Dad to one lap -> Mr Tan's plan on the whiteboard: two 100 m straights,
   a semicircle at each end, 60 m across -> Dad: "200 m and a bit. Close enough." -> the two ends slide off the plan
   and join into one whole circle, d = 60 m -> lap = 2 x 100 + pi x 60 = 200 + 188.5 = 388.5 m, HALF-BAKED for Dad
   -> "I'll walk." -> Perry walks the outside only; the join lines inside are crossed out -> the field inside:
   rectangle + circle = 6000 + 2827.4 = 8827 m^2 -> Mum's pond: r = 3 m, a 1 m path, R = 4 m -> Priya:
   pi x (4 - 3)^2 = pi = 3.1 m^2, a ridiculously thin ring -> "That path is for ants." Perry: "Thank you." -> subtract
   areas, not radii: 16pi - 9pi = 7pi = 22.0 m^2 -> a ring: pi(R^2 - r^2), never pi(R - r)^2. */
scene('track', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 3, color: o.color || C.ink, weight: 700 }); };
  const GOLD = '#FFE45C', INK = MK.ink, BLUE = '#2E7DD8', ORANGE = '#E8751A', RED = '#D32F2F', GREEN = '#1E9E5A', BERRY = '#B8336A';
  // a line of working: fades in (sliding up a touch) at t0, out at t1
  const line = (el, t, t0, t1) => { const p = P(t, t0, 0.3, easeOut), q = t1 === undefined ? 1 : 1 - P(t, t1 - 0.15, 0.15, linear); op(el, t >= t0 - 0.01 ? Math.min(p, q) : 0); tr(el, 0, 10 * (1 - p)); };
  // an aligned row of working: left (maths, right-aligned), the sign on column x, right (text markup with {{maths}})
  const eqRow = (parent, x, y, l, o, r, sz, col) => {
    const g = G(parent), f = col || INK;
    if (l) mkMath(g, x - sz * 0.42, y, l, { size: sz, anchor: 'end', fill: f, weight: 700 });
    if (o) mkMath(g, x, y, o, { size: sz, anchor: 'middle', fill: f, weight: 700 });
    if (r) mkText(g, x + sz * 0.42, y, r, { size: sz, fill: f, anchor: 'start', weight: 700, mathScale: 1 });
    return g;
  };
  const txt = (parent, x, y, str, o) => mkText(parent, x, y, str, Object.assign({ size: 32, anchor: 'middle', fill: INK, boldFill: BERRY, weight: 700 }, o || {}));
  function hedge(parent) {
    const g = G(parent);
    let d = 'M0,750 L0,640 ';
    for (let x = 0; x <= 1200; x += 60) d += `Q${x + 30},${606 + (x / 60 % 2) * 8} ${x + 60},640 `;
    d += 'L1200,750 Z';
    E('path', { d, fill: linGrad('#3E9A4A', '#2A6E34', true), stroke: '#24602E', 'stroke-width': 4 }, g);
    const r = rng(16);
    let dots = '';
    for (let i = 0; i < 46; i++) { const x = r() * 1200, y = 650 + r() * 90; dots += `M${x.toFixed(0)},${y.toFixed(0)} a7,5 0 1 0 14,0 a7,5 0 1 0 -14,0 `; }
    E('path', { d: dots, fill: '#57B862', opacity: 0.55 }, g);
    return g;
  }
  const paper = (parent, x, y, w, h) => {
    E('rect', { x: x + 6, y: y + 6, width: w, height: h, rx: 16, fill: 'rgba(0,0,0,0.25)' }, parent);
    return E('rect', { x, y, width: w, height: h, rx: 16, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, parent);
  };

  /* layers */
  const Lbg = G(root), Lboard = G(root), Lcast = G(root), Lhedge = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= the field and the track ================= */
  const field = ciField(Lbg);
  // the start line on the track
  E('path', { d: 'M330,470 L318,560', stroke: '#FFFFFF', 'stroke-width': 8 }, Lbg);
  T(Lbg, 300, 455, 'START', { size: 26, weight: 800, anchor: 'end', fill: '#FFFFFF' });
  hedge(Lhedge);

  /* ================= the whiteboard ================= */
  const boardG = G(Lboard);
  const wb = mkWhiteboard(boardG, 540, 500, { stand: true }); tr(wb, 880, 375);
  /* ---- the track plan: straights 100 m (220 px), ends r = 30 m (66 px) ---- */
  const K = 2.2, SL = 100 * K, RR = 30 * K, PCX = 880, PCY = 285, XL = PCX - SL / 2, XR = PCX + SL / 2, YT = PCY - RR, YB = PCY + RR;
  const plan = G(boardG);
  const stadium = `M${XL},${YT} L${XR},${YT} A${RR},${RR} 0 0 1 ${XR},${YB} L${XL},${YB} A${RR},${RR} 0 0 1 ${XL},${YT} Z`;
  const fillRect = E('rect', { x: XL, y: YT, width: SL, height: 2 * RR, fill: '#BDE5B5' }, plan);
  const fillEndL = E('path', { d: `M${XL},${YB} A${RR},${RR} 0 0 1 ${XL},${YT} Z`, fill: '#E3F2C8' }, plan);
  const fillEndR = E('path', { d: `M${XR},${YT} A${RR},${RR} 0 0 1 ${XR},${YB} Z`, fill: '#E3F2C8' }, plan);
  const joins = E('path', { d: `M${XL},${YT} L${XL},${YB} M${XR},${YT} L${XR},${YB}`, stroke: '#7D8A96', 'stroke-width': 3, 'stroke-dasharray': '9 7' }, plan);
  const outline = mkDash(E('path', { d: stadium, fill: 'none', stroke: INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, plan));
  const straights = E('path', { d: `M${XL},${YT} L${XR},${YT} M${XL},${YB} L${XR},${YB}`, stroke: ORANGE, 'stroke-width': 9, 'stroke-linecap': 'round' }, plan);
  const ends = E('path', { d: `M${XR},${YT} A${RR},${RR} 0 0 1 ${XR},${YB} M${XL},${YB} A${RR},${RR} 0 0 1 ${XL},${YT}`, fill: 'none', stroke: BLUE, 'stroke-width': 9, 'stroke-linecap': 'round' }, plan);
  const l100a = txt(plan, PCX, YT - 16, '100 m', { size: 28, fill: ORANGE });
  const l100b = txt(plan, PCX, YB + 38, '100 m', { size: 28, fill: ORANGE });
  const dim60 = G(plan);
  E('path', { d: `M${XR - 14},${YT + 8} L${XR - 14},${YB - 8}`, stroke: BLUE, 'stroke-width': 4 }, dim60);
  E('path', { d: `M${XR - 22},${YT + 18} L${XR - 14},${YT + 6} L${XR - 6},${YT + 18} M${XR - 22},${YB - 18} L${XR - 14},${YB - 6} L${XR - 6},${YB - 18}`, fill: 'none', stroke: BLUE, 'stroke-width': 4, 'stroke-linejoin': 'round' }, dim60);
  txt(dim60, XR - 26, PCY + 10, '60 m', { size: 28, fill: BLUE, anchor: 'end' });
  const lRect = mkMath(plan, PCX - 20, PCY + 11, '100 × 60', { size: 30, anchor: 'middle', fill: GREEN, weight: 700 });
  const xJoins = [XL, XR].map(x => { const c = cross(plan, 14, RED); tr(c, x, PCY); return c; });
  // the two ends, copied, slide together into one whole circle
  const JCX = 880, JCY = 498;
  const endL = G(boardG), endR = G(boardG);
  E('path', { d: `M0,${RR} A${RR},${RR} 0 0 1 0,${-RR} Z`, fill: '#E3F2C8', stroke: BLUE, 'stroke-width': 6, 'stroke-linejoin': 'round' }, endL);
  E('path', { d: `M0,${-RR} A${RR},${RR} 0 0 1 0,${RR} Z`, fill: '#E3F2C8', stroke: BLUE, 'stroke-width': 6, 'stroke-linejoin': 'round' }, endR);
  const jDia = E('line', { x1: JCX - RR, y1: JCY, x2: JCX + RR, y2: JCY, stroke: BLUE, 'stroke-width': 4, 'stroke-dasharray': '8 6' }, boardG);
  const jRad = E('line', { x1: JCX, y1: JCY, x2: JCX + RR, y2: JCY, stroke: ORANGE, 'stroke-width': 5 }, boardG);
  const jD = txt(boardG, JCX, 600, 'one whole circle, {{d = 60}} m', { size: 30, fill: BLUE });
  const jR = txt(boardG, JCX, 600, 'circle: {{r = 30}} m', { size: 30, fill: GREEN });
  const jPi = mkMath(boardG, JCX, JCY + 38, 'π × 30^2', { size: 26, anchor: 'middle', fill: GREEN, weight: 700, halo: '#E3F2C8' });

  /* ---- the pond plan: r = 3 m, R = 4 m (40 px per m) ---- */
  const U = 40, QX = 880, QY = 360, Ro = 4 * U, Ri = 3 * U;
  const pond = G(boardG);
  const pathFill = E('path', { d: `M${QX - Ro},${QY} A${Ro},${Ro} 0 1 1 ${QX + Ro},${QY} A${Ro},${Ro} 0 1 1 ${QX - Ro},${QY} Z M${QX - Ri},${QY} A${Ri},${Ri} 0 1 0 ${QX + Ri},${QY} A${Ri},${Ri} 0 1 0 ${QX - Ri},${QY} Z`, fill: '#FFB86B', opacity: 0.85 }, pond);
  const pathLine = E('circle', { cx: QX, cy: QY, r: Ro, fill: 'none', stroke: '#8A6232', 'stroke-width': 4, 'stroke-dasharray': '12 8' }, pond);
  E('circle', { cx: QX, cy: QY, r: Ri, fill: '#9FD8FF', stroke: BLUE, 'stroke-width': 5 }, pond);
  // ripples and a lily pad
  E('path', { d: `M${QX - 60},${QY + 40} q20,-10 40,0 M${QX + 20},${QY - 50} q16,-8 32,0`, fill: 'none', stroke: '#FFFFFF', 'stroke-width': 4, 'stroke-linecap': 'round' }, pond);
  E('path', { d: `M${QX - 40},${QY - 30} a18,14 0 1 0 6,-12 L${QX - 40},${QY - 30} Z`, fill: '#2FA36B', stroke: '#1E6E44', 'stroke-width': 2 }, pond);
  E('circle', { cx: QX, cy: QY, r: 6, fill: INK }, pond);
  const rLine = G(pond);
  { const a = -150 * Math.PI / 180; E('line', { x1: QX, y1: QY, x2: QX + Ri * Math.cos(a), y2: QY + Ri * Math.sin(a), stroke: INK, 'stroke-width': 4 }, rLine);
    txt(rLine, QX - 50, QY - 12, '{{r = 3}} m', { size: 28, anchor: 'end', halo: '#9FD8FF' }); }
  const RLine = G(pond);
  { const a = -40 * Math.PI / 180; E('line', { x1: QX, y1: QY, x2: QX + Ro * Math.cos(a), y2: QY + Ro * Math.sin(a), stroke: RED, 'stroke-width': 4 }, RLine);
    txt(RLine, QX + Ro * Math.cos(a) + 6, QY + Ro * Math.sin(a) - 12, '{{R = 4}} m', { size: 28, anchor: 'start', fill: RED }); }
  const wLab = G(pond);
  E('path', { d: `M${QX + Ri},${QY + 6} L${QX + Ro},${QY + 6}`, stroke: '#8A4A12', 'stroke-width': 4 }, wLab);
  E('path', { d: `M${QX + Ri},${QY - 4} L${QX + Ri},${QY + 16} M${QX + Ro},${QY - 4} L${QX + Ro},${QY + 16}`, stroke: '#8A4A12', 'stroke-width': 4 }, wLab);
  txt(wLab, QX + (Ri + Ro) / 2, QY + 44, '1 m', { size: 28, fill: '#8A4A12', halo: '#FFE2C2' });
  const Rthin = Math.sqrt(10) * U;   // pi x (R'^2 - 9) = pi  ->  R' = sqrt(10)
  const thin = E('circle', { cx: QX, cy: QY, r: (Ri + Rthin) / 2, fill: 'none', stroke: RED, 'stroke-width': Rthin - Ri }, pond);
  const pondLab = txt(boardG, 880, 595, 'pond {{r = 3}} m, path {{1}} m wide', { size: 30 });
  const thinLab = txt(boardG, 880, 595, "Priya's path: only {{π ≈ 3.1}} m²", { size: 30, fill: RED });
  const ringLab = txt(boardG, 880, 595, 'the real path: {{7π ≈ 22.0}} m²', { size: 30, fill: '#B5530C' });

  /* ================= the working card (top left) ================= */
  const cardG = G(Lboard);
  paper(cardG, 40, 112, 550, 312);
  const CX0 = 315;
  // two / track / easy
  const wVs = txt(cardG, CX0, 200, '**ONE LAP**', { size: 46, boldFill: BLUE });
  const wVs2 = txt(cardG, CX0, 270, 'Priya **vs** Dad', { size: 40, boldFill: RED });
  const wT1 = txt(cardG, CX0, 180, 'two straights: **100 m** each', { size: 32, boldFill: ORANGE });
  const wT2 = txt(cardG, CX0, 250, 'each end: a **semicircle**', { size: 32, boldFill: BLUE });
  const wT3 = txt(cardG, CX0, 320, '**60 m** across', { size: 32, boldFill: BLUE });
  const wDad = txt(cardG, CX0, 180, 'Dad: {{2 × 100 = 200}} m + a bit', { size: 32, fill: RED });
  const wDad2 = txt(cardG, CX0, 250, '"Close enough!"', { size: 34, fill: RED });
  // push / lap
  const wP1 = txt(cardG, CX0, 250, '2 semicircles = **1 whole circle**', { size: 32, boldFill: BLUE });
  const LX = 190;
  const wL1 = eqRow(cardG, LX, 255, '"lap"', '=', '{{2 × 100 + π × 60}}', 36);
  const wL2 = eqRow(cardG, LX, 320, '', '=', '{{200 + 188.5}}', 36);
  const wL3 = eqRow(cardG, LX, 388, '', '≈', '{{388.5}} m', 38, GREEN);
  const strikeDad = E('line', { x1: 100, y1: 170, x2: 530, y2: 170, stroke: RED, 'stroke-width': 4 }, cardG);
  // perry
  const wPe1 = txt(cardG, CX0, 210, '**Perimeter**: the **outside** only', { size: 34, boldFill: '#B5530C' });
  const wPe2 = txt(cardG, CX0, 290, 'lines **inside** don’t count', { size: 34, boldFill: RED });
  // field
  const wF0 = txt(cardG, CX0, 172, '**Add** the pieces: rectangle **+** circle', { size: 30, boldFill: GREEN });
  const FX = 120;
  const wF1 = eqRow(cardG, FX, 245, 'A', '=', '{{100 × 60 + π × 30^2}}', 34);
  const wF2 = eqRow(cardG, FX, 315, '', '=', '{{6000 + 2827.4}}', 34);
  const wF3 = eqRow(cardG, FX, 385, '', '≈', '{{8827}} m²', 36, GREEN);
  // pond / wrong
  const wQ0 = txt(cardG, CX0, 172, 'How much **paving**?', { size: 34, boldFill: '#B5530C' });
  const wQ1 = txt(cardG, CX0, 240, 'pond: {{r = 3}} m', { size: 32 });
  const wQ2 = txt(cardG, CX0, 300, 'path: {{1}} m wide', { size: 32 });
  const wQ3 = txt(cardG, CX0, 362, 'outside: {{R = 3 + 1 = 4}} m', { size: 32, fill: RED });
  const wW1 = txt(cardG, CX0, 260, 'Priya: {{π × (4 − 3)^2 = π}}', { size: 34, fill: RED });
  const wW2 = txt(cardG, CX0, 340, '{{π ≈ 3.1}} m²', { size: 38, fill: RED });
  // ring
  const wR0 = txt(cardG, CX0, 168, 'Subtract **areas**, not radii', { size: 32, boldFill: GREEN });
  const wRw = txt(cardG, CX0, 218, '{{π × (4 − 3)^2 = π}}', { size: 28, fill: '#C0848A' });
  const strikeW = E('line', { x1: 200, y1: 208, x2: 430, y2: 208, stroke: RED, 'stroke-width': 4 }, cardG);
  const RX = 130;
  const wR1 = eqRow(cardG, RX, 278, 'A', '=', '{{π × 4^2 − π × 3^2}}', 34);
  const wR2 = eqRow(cardG, RX, 336, '', '=', '{{16π − 9π}}', 34);
  const wR3 = eqRow(cardG, RX, 396, '', '=', '{{7π ≈ 22.0}} m²', 34, GREEN);
  // rule
  const wU0 = txt(cardG, CX0, 180, 'A **ring**:', { size: 40, boldFill: BLUE });
  const wU1 = mkMath(cardG, CX0, 270, 'π(R^2 − r^2)', { size: 54, anchor: 'middle', fill: GREEN, weight: 700 });
  const okTick = tick(cardG, 18, GREEN); tr(okTick, 500, 252);
  const wU2 = G(cardG);
  mkMath(wU2, CX0, 380, 'π(R − r)^2', { size: 46, anchor: 'middle', fill: '#C0848A', weight: 700 });
  E('line', { x1: CX0 - 120, y1: 366, x2: CX0 + 120, y2: 366, stroke: RED, 'stroke-width': 5 }, wU2);
  txt(wU2, CX0 + 140, 376, '**never**', { size: 30, anchor: 'start', fill: RED, boldFill: RED });

  const CARD = [wVs, wVs2, wT1, wT2, wT3, wDad, wDad2, wP1, wL1, wL2, wL3, strikeDad, wPe1, wPe2, wF0, wF1, wF2, wF3, wQ0, wQ1, wQ2, wQ3, wW1, wW2, wR0, wRw, strikeW, wR1, wR2, wR3, wU0, wU1, okTick, wU2];
  const cTwo = pill(Lhud, '2 p.m.', { size: 34, color: GOLD, stroke: GOLD });
  const stDad = ciStamp(Lhud, false), stPri = ciStamp(Lhud, false), stOk = ciStamp(Lhud, true);

  /* ================= the cast ================= */
  const dad = cast(Lcast, 'dad'), priya = cast(Lcast, 'priya'), tan = cast(Lcast, 'tan'), kav = cast(Lcast, 'kavya'),
    mum = cast(Lcast, 'mum'), boy = cast(Lcast, 'boy');
  const perry = cast(Lfg, 'perry');
  // Perry's walk round the stadium (clockwise from the top-left corner): point and outward normal at distance u
  const LEN = 2 * SL + 2 * Math.PI * RR;
  const stadAt = u => {
    u = ((u % LEN) + LEN) % LEN;
    if (u < SL) return [XL + u, YT, -90];
    u -= SL; const arc = Math.PI * RR;
    if (u < arc) { const a = -90 + u / arc * 180, r = a * Math.PI / 180; return [XR + RR * Math.cos(r), PCY + RR * Math.sin(r), a]; }
    u -= arc;
    if (u < SL) return [XR - u, YB, 90];
    u -= SL; const a = 90 + u / arc * 180, r = a * Math.PI / 180; return [XL + RR * Math.cos(r), PCY + RR * Math.sin(r), a];
  };

  /* cut point: the field (plan) / the pond */
  const cQ = at('pond') - 0.06;
  // slots behind the hedge
  const S1 = { dad: 100, priya: 250, tan: 400, kav: 540 }, S2 = { mum: 82, priya: 196, boy: 310, kav: 424, tan: 538 };

  return t => {
    const sF = t < cQ, sQ = !sF;
    const who = scWho(S, t);
    field.upd(t);
    [dad, priya, tan, kav, mum, boy, perry].forEach(c => op(c, 0));
    CARD.forEach(e => op(e, 0));
    op(cTwo, 0); stDad.set(0); stPri.set(0); stOk.set(0);
    op(plan, sF); op(pond, sQ);
    [endL, endR, jDia, jRad, jD, jR, jPi].forEach(e => op(e, 0));
    op(pondLab, 0); op(thinLab, 0); op(ringLab, 0);
    const bp = P(t, at('track') - 0.1, 0.35, easeOut);
    op(boardG, bp); tr(boardG, 0, 16 * (1 - bp));

    /* ---------------- section 1: the track ---------------- */
    if (sF) {
      popIn(cTwo, t, at('two') + 0.3, 1080, 60);
      // the plan draws itself during "track"
      mkDraw(outline, P(t, at('track') + 0.1, 1.4, ease));
      op(straights, t >= mid('track', 0.15) && t < at('push') ? win(t, mid('track', 0.15), at('push'), 0.25) : 0);
      op(ends, t >= mid('track', 0.45) && t < end('lap') ? win(t, mid('track', 0.45), end('lap'), 0.25) : 0);
      const noL = t >= at('perry') - 0.2 && t < at('field') ? 0 : 1;
      op(l100a, noL * P(t, mid('track', 0.22), 0.3, linear)); op(l100b, noL * P(t, mid('track', 0.3), 0.3, linear));
      op(dim60, t < at('field') ? P(t, mid('track', 0.75), 0.3, linear) : 0);
      const fs = P(t, mid('field', 0.15), 0.4, linear);
      op(fillRect, 0.35 + 0.65 * fs); op(fillEndL, 0.35 + 0.65 * fs); op(fillEndR, 0.35 + 0.65 * fs);
      op(lRect, P(t, mid('field', 0.35), 0.3, linear));
      const pf = t >= at('perry') && t < at('field');
      op(joins, pf ? 0.6 + 0.4 * Math.sin(t * 9) : 1);
      xJoins.forEach((c, i) => op(c, pf && t > mid('perry', 0.6 + i * 0.08) ? 1 : 0));
      // the two ends slide together into one circle (from "push" on)
      if (t >= at('push')) {
        const sl = P(t, mid('push', 0.15), 1.4, ease);
        op(endL, 1); op(endR, 1);
        tr(endL, lerp(XL, JCX, sl), lerp(PCY, JCY, sl)); tr(endR, lerp(XR, JCX, sl), lerp(PCY, JCY, sl));
        const fieldOn = t >= at('field');
        op(jDia, !fieldOn && sl >= 1 ? 1 : 0);
        op(jD, !fieldOn ? P(t, mid('push', 0.6), 0.3, linear) : 0);
        op(jRad, fieldOn ? 1 : 0); op(jR, fieldOn ? P(t, at('field') + 0.2, 0.3, linear) : 0);
        op(jPi, fieldOn ? P(t, mid('field', 0.4), 0.3, linear) : 0);
      }
      // the working card
      line(wVs, t, at('two') + 0.2, at('track')); line(wVs2, t, mid('two', 0.4), at('track'));
      line(wT1, t, mid('track', 0.2), at('easy')); line(wT2, t, mid('track', 0.45), at('easy')); line(wT3, t, mid('track', 0.72), at('easy'));
      line(wDad, t, at('easy') + 0.15, at('perry')); line(wDad2, t, mid('easy', 0.55), at('push'));
      op(strikeDad, t >= mid('lap', 0.9) && t < at('perry') ? 1 : 0);
      line(wP1, t, mid('push', 0.3), at('lap'));
      line(wL1, t, at('lap') + 0.1, at('perry')); line(wL2, t, mid('lap', 0.45), at('perry')); line(wL3, t, mid('lap', 0.75), at('perry'));
      line(wPe1, t, at('perry') + 0.1, at('field')); line(wPe2, t, mid('perry', 0.5), at('field'));
      line(wF0, t, at('field') + 0.1, cQ); line(wF1, t, mid('field', 0.2), cQ); line(wF2, t, mid('field', 0.5), cQ); line(wF3, t, mid('field', 0.75), cQ);
      if (t >= mid('lap', 0.9) && t < at('perry')) { stDad.set(P(t, mid('lap', 0.92), 0.35, linear)); tr(stDad, 400, 172, 0.36); }
      // Perry walks the outside of the plan
      if (t >= at('perry') - 0.2 && t < at('field')) {
        op(perry, 1);
        const w = P(t, at('perry'), (end('perry') - at('perry')) * 0.9, linear), s = 0.22;
        const [x, y, a] = stadAt(LEN * w), n = [Math.cos(a * Math.PI / 180), Math.sin(a * Math.PI / 180)];
        tr(perry, x + n[0] * 112 * s, y + n[1] * 112 * s, s, a + 90);
        perry.set({ t, talk: scTalk(S, t, 'perry'), mood: 'annoyed', look: 0.5, walk: w < 1 ? t * 14 : 0, wheel: w * 900, sweat: 1 });
      }

      /* the humans */
      // Dad: walks off on "walk"
      const dOut = P(t, at('walk'), 1.6, linear);
      if (dOut < 1) {
        op(dad, 1);
        tr(dad, S1.dad - 260 * dOut, 572 + (dOut > 0 ? Math.abs(Math.sin(t * 7)) * 8 : 0), 0.78);
        let dm = 'smug', dl = 0.8;
        if (t >= at('track') && t < at('easy')) { dm = 'neutral'; dl = 0.9; }
        if (t >= at('push')) { dm = t > mid('lap', 0.9) ? 'sad' : 'neutral'; dl = 0.9; }
        if (t >= at('walk')) { dm = 'deadpan'; dl = -0.8; }
        dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: dl, lift: who === 'dad' && t < at('walk') ? 0.8 : 0 });
      }
      // Priya: sprints off right at the end of "walk"
      const pOut = P(t, end('walk') + 0.1, 0.45, easeIn);
      if (pOut < 1) {
        op(priya, 1);
        tr(priya, S1.priya + 1000 * pOut, 580, 0.78);
        let pm = 'smug', pl = -0.8;
        if (t >= at('track')) { pm = 'neutral'; pl = 0.6; }
        if (t >= at('easy')) { pm = 'smug'; pl = -0.8; }
        if (t >= at('lap')) { pm = t > mid('lap', 0.8) ? 'happy' : 'neutral'; pl = 0.7; }
        if (t >= at('walk')) { pm = 'smug'; pl = -0.8; }
        priya.set({ t, talk: scTalk(S, t, 'priya'), mood: pm, look: pl });
      }
      op(tan, 1); tr(tan, S1.tan, 572, 0.78);
      let tm = 'happy', tl = 0.8;
      if (t >= at('easy') && t < at('perry')) { tm = 'deadpan'; tl = -0.8; }
      if (t >= at('lap')) tl = 0.8;
      tan.set({ t, talk: scTalk(S, t, 'tan'), mood: tm, look: tl, lift: t > mid('lap', 0.85) && t < at('walk') ? 1 : 0 });
      op(kav, 1); tr(kav, S1.kav, 584, 0.78);
      let km = 'neutral', kl = 0.8;
      if (t >= at('easy') && t < at('push')) { km = 'deadpan'; kl = -0.8; }
      if (t >= at('push') && t < at('walk')) { km = 'happy'; kl = 0.8; }
      if (t >= at('walk') && t < at('perry')) { km = 'deadpan'; kl = -0.8; }
      if (who === 'tan') kl = -0.6;
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
    }

    /* ---------------- section 2: the pond ---------------- */
    if (sQ) {
      op(pathFill, P(t, mid('ring', 0.15), 0.4, linear) * (t >= at('ring') ? 1 : 0));
      op(pathLine, 1);
      op(rLine, P(t, mid('pond', 0.15), 0.3, linear)); op(wLab, P(t, mid('pond', 0.5), 0.3, linear));
      op(RLine, P(t, mid('pond', 0.8), 0.3, linear));
      op(thin, t >= mid('wrong', 0.3) && t < at('ring') ? P(t, mid('wrong', 0.3), 0.3, linear) : 0);
      op(pondLab, t < at('wrong') ? P(t, mid('pond', 0.2), 0.3, linear) : 0);
      op(thinLab, t >= at('wrong') && t < at('ring') ? P(t, mid('wrong', 0.6), 0.3, linear) : 0);
      op(ringLab, t >= at('ring') ? P(t, mid('ring', 0.8), 0.3, linear) : 0);
      // the card
      line(wQ0, t, at('pond') + 0.1, at('wrong')); line(wQ1, t, mid('pond', 0.15), at('wrong'));
      line(wQ2, t, mid('pond', 0.45), at('wrong')); line(wQ3, t, mid('pond', 0.8), at('wrong'));
      line(wW1, t, mid('wrong', 0.2), at('ring')); line(wW2, t, mid('wrong', 0.6), at('ring'));
      line(wR0, t, at('ring') + 0.1, at('rule')); line(wRw, t, at('ring') + 0.1, at('rule')); op(strikeW, t >= at('ring') + 0.3 && t < at('rule') ? 1 : 0);
      line(wR1, t, mid('ring', 0.2), at('rule')); line(wR2, t, mid('ring', 0.5), at('rule')); line(wR3, t, mid('ring', 0.75), at('rule'));
      line(wU0, t, at('rule') + 0.1); line(wU1, t, mid('rule', 0.1)); line(wU2, t, mid('rule', 0.55));
      op(okTick, P(t, mid('rule', 0.35), 0.3, linear));
      if (t >= at('ring') && t < at('rule')) {
        stPri.set(P(t, at('ring') + 0.4, 0.35, linear)); tr(stPri, 492, 212, 0.3);
        stOk.set(P(t, mid('ring', 0.85), 0.35, linear)); tr(stOk, 880, 166, 0.34);
      }
      // Perry on Priya's thin path
      if (t >= at('thanks') - 0.3 && t < at('ring')) {
        op(perry, 1);
        const a = -112 + (t - at('thanks')) * 22, s = 0.14, rr = Rthin + 112 * s - 2, ar = a * Math.PI / 180;
        tr(perry, QX + rr * Math.cos(ar), QY + rr * Math.sin(ar), s, a + 90);
        perry.set({ t, talk: scTalk(S, t, 'perry'), mood: 'happy', look: 0.3, walk: t * 12, wheel: a * 6 });
      }
      // the humans
      op(mum, 1);
      const mu = P(t, cQ, 0.35, pop);
      tr(mum, S2.mum, lerp(760, 576, mu), 0.72);
      mum.set({ t, talk: scTalk(S, t, 'mum'), mood: t >= at('ring') ? 'smug' : 'neutral', look: who === 'mum' ? 0.8 : 0.6, lift: who === 'mum' ? 0.7 : 0 });
      op(priya, 1); tr(priya, S2.priya, 584, 0.72);
      let pm = 'neutral', pl = -0.6;
      if (who === 'priya' || (t >= at('wrong') && t < at('ants'))) { pm = 'smug'; pl = 0.6; }
      if (t >= at('ants') && t < at('ring')) { pm = 'annoyed'; pl = 0.6; }
      if (t >= at('ring')) { pm = t > at('ring') + 0.5 ? 'sad' : 'shock'; pl = 0.8; }
      priya.set({ t, talk: scTalk(S, t, 'priya'), mood: pm, look: pl, sweat: t < at('wrong') ? 1 : 0 });
      if (t >= at('ants') - 0.3) {
        op(boy, 1);
        const up = P(t, at('ants') - 0.3, 0.35, pop);
        tr(boy, S2.boy, lerp(760, 596, up), 0.72);
        boy.set({ t, talk: scTalk(S, t, 'boy'), mood: 'happy', look: who === 'perry' ? 0.8 : -0.5, lift: who === 'boy' ? 1 : 0 });
      }
      op(kav, 1); tr(kav, S2.kav, 584, 0.72);
      let km = 'neutral', kl = -0.6;
      if (t >= at('wrong') && t < at('ring')) { km = 'deadpan'; kl = -0.7; }
      if (t >= at('ring')) { km = 'happy'; kl = 0.8; }
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
      op(tan, 1); tr(tan, S2.tan, 576, 0.72);
      const stamp = t >= at('ring') && t < at('rule');
      tan.set({ t, talk: scTalk(S, t, 'tan'), mood: who === 'priya' ? 'deadpan' : stamp ? 'happy' : 'neutral', look: who === 'tan' ? 0.4 : -0.7, lift: stamp && t < mid('ring', 0.9) ? 1 : 0 });
    }
  };
});
