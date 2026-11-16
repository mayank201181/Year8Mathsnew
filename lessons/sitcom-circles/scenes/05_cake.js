/* Scene 5: Half a cake (semicircles and quarter circles).
   1 p.m., MUM'S CAKES: round cakes, d = 20 cm, sold by the half and the quarter -> Mum: a ribbon right round every
   half-cake; Priya, scissors -> the whiteboard: Priya ribbons the curve only, 1/2 x pi x 20 = 31.4 cm -> Perry walks
   the ribbon and stops at the cut: the straight edge is bare -> Kavya traces it: 31.4 + 20 = 51.4 cm -> Mr Tan:
   exact 10 pi + 20 cm, which don't combine, like 10x + 20 -> Mum: the top, 1/2 x pi x 10^2 = 50 pi = 157 cm^2 ->
   the stall: Ah Boy wants a quarter, with a quarter of a ribbon -> the board: Perry walks both radii ("My legs."),
   curve 1/4 x 2 pi x 10 = 5 pi = 15.7, P = 15.7 + 10 + 10 = 35.7 cm -> Mum: A = 1/4 x pi x 10^2 = 25 pi = 78.5 cm^2,
   EASY AS PI -> close-up: Ah Boy's fork hovers; Perry is still walking round it. */
scene('cake', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 3, color: o.color || C.ink, weight: 700 }); };
  const GOLD = '#FFE45C', INK = MK.ink, BLUE = '#2E5AAC', ORANGE = '#E8751A', RED = '#D32F2F', GREEN = '#1E9E5A', BERRY = '#B8336A';
  const line = (el, t, t0, t1) => { const p = P(t, t0, 0.3, easeOut), q = t1 === undefined ? 1 : 1 - P(t, t1 - 0.15, 0.15, linear); op(el, t >= t0 - 0.01 ? Math.min(p, q) : 0); tr(el, 0, 10 * (1 - p)); };
  const eqRow = (parent, x, y, l, o, r, sz, col) => {
    const g = G(parent), f = col || INK;
    if (l) mkMath(g, x - sz * 0.62, y, l, { size: sz, anchor: 'end', fill: f, weight: 700 });
    if (o) mkMath(g, x, y, o, { size: sz, anchor: 'middle', fill: f, weight: 700 });
    if (r) mkText(g, x + sz * 0.62, y, r, { size: sz, fill: f, anchor: 'start', weight: 700, mathScale: 1 });
    return g;
  };
  const txt = (parent, x, y, str, o) => mkText(parent, x, y, str, Object.assign({ size: 34, anchor: 'middle', fill: INK, boldFill: BERRY, weight: 700 }, o || {}));
  const home = (c, layer) => { if (c.parentNode !== layer) layer.appendChild(c); };
  const flash = t => 0.55 + 0.45 * Math.sin(t * 12);
  // Perry walking a curve or a straight edge: (x, y) a point on the edge, a the outward normal (screen degrees)
  const perryOn = (x, y, a, s) => { const r = a * Math.PI / 180; tr(perry, x + Math.cos(r) * 112 * s, y + Math.sin(r) * 112 * s, s, a + 90); };

  /* layers */
  const Lset = G(root), Lcast = G(root), Lfront = G(root), Lshot = G(root), Lbcast = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= A: MUM'S CAKES ================= */
  const stallG = G(Lset);
  const stall = ciStall(stallG, { title: "MUM'S CAKES", col: BERRY, sub: 'by the half & quarter' });
  Lfront.appendChild(stall.front); Lfront.appendChild(stall.top);
  // the cake display board on the table
  const disp = G(stall.top);
  E('path', { d: 'M470,516 L440,530 M810,516 L840,530', stroke: '#5A6670', 'stroke-width': 8, 'stroke-linecap': 'round' }, disp);
  E('rect', { x: 388, y: 236, width: 504, height: 284, rx: 14, fill: '#FFFDF6', stroke: '#8FA3B8', 'stroke-width': 5 }, disp);
  const dWhole = ciCake(disp, 72, 'full'); tr(dWhole, 482, 360);
  const dHalf = ciCake(disp, 72, 'half'); tr(dHalf, 650, 410);
  const dQuar = ciCake(disp, 92, 'quarter', { ribbonW: 8 }); tr(dQuar, 760, 418);
  const dDia = G(disp);
  E('line', { x1: 410, y1: 360, x2: 554, y2: 360, stroke: RED, 'stroke-width': 6, 'stroke-linecap': 'round' }, dDia);
  const dDiaL = mkChip(disp, '{{d = 20}} cm', { size: 28, col: RED, fill: '#FFFFFF', textCol: INK });
  tr(dDiaL, 482, 474);
  const dLab = G(disp);
  T(dLab, 650, 470, 'half', { size: 28, weight: 800, anchor: 'middle', fill: BERRY });
  T(dLab, 806, 470, 'quarter', { size: 28, weight: 800, anchor: 'middle', fill: BERRY });
  const dQbare = E('path', { d: 'M852,418 L760,418 L760,326', fill: 'none', stroke: RED, 'stroke-width': 8, 'stroke-linecap': 'round', 'stroke-dasharray': '10 8' }, disp);
  // the ribbon reel
  const reel = G(stall.top); tr(reel, 300, 500);
  E('circle', { r: 30, fill: CI_COL.ribbon, stroke: SC_INK, 'stroke-width': 3 }, reel);
  E('circle', { r: 10, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 2 }, reel);
  E('path', { d: 'M28,10 Q60,20 90,10', fill: 'none', stroke: CI_COL.ribbon, 'stroke-width': 7, 'stroke-linecap': 'round' }, reel);
  const cOne = pill(Lhud, '1 p.m.', { size: 32, color: GOLD, stroke: GOLD });
  const cRib = mkChip(Lfg, 'a ribbon **right round** the edge', { size: 30, col: BERRY, fill: '#FFE6F0', textCol: INK });
  const cQrib = mkChip(Lfg, 'a **quarter** of a ribbon?', { size: 30, col: BERRY, fill: '#FFE6F0', textCol: INK });

  /* ================= D1: the half-cake board ================= */
  const b1 = G(Lshot);
  const wb1 = mkWhiteboard(b1, 1100, 520); tr(wb1, 600, 410);
  const HX = 330, HY = 500, HR = 170;
  const hCake = ciCake(b1, HR, 'half', { ribbonW: 12 }); tr(hCake, HX, HY);
  const hShade = E('path', { d: `M${HX - HR},${HY} A${HR},${HR} 0 0 1 ${HX + HR},${HY} Z`, fill: 'rgba(46,125,216,0.35)', stroke: BLUE, 'stroke-width': 5 }, b1);
  const hBare = E('line', { x1: HX - HR, y1: HY, x2: HX + HR, y2: HY, stroke: RED, 'stroke-width': 10, 'stroke-linecap': 'round', 'stroke-dasharray': '14 10' }, b1);
  const hBrace = mkBrace(b1, HX - HR, HY + 14, HX + HR, HY + 14, { flip: true, text: '{{20}} cm', col: INK, size: 30, depth: 18 });
  const hRad = G(b1);
  E('line', { x1: HX, y1: HY, x2: HX - HR * 0.5, y2: HY - HR * 0.866, stroke: ORANGE, 'stroke-width': 7, 'stroke-linecap': 'round' }, hRad);
  E('circle', { cx: HX, cy: HY, r: 7, fill: INK }, hRad);
  txt(hRad, HX - HR * 0.5 - 16, HY - HR * 0.866 - 4, '{{r = 10}} cm', { size: 30, fill: ORANGE, anchor: 'end' });
  const cTrace = mkChip(b1, 'trace it with your **finger**', { size: 30, col: BERRY, fill: '#FFE6F0', textCol: INK });
  tr(cTrace, HX, 212);
  const WX1 = 865;
  const h1 = txt(b1, WX1, 236, 'curve: {{1/2 × π × 20 ≈ 31.4}} cm', { size: 34 });
  const h2a = txt(b1, WX1, 318, 'straight edge: **bare!**', { size: 34, fill: RED, boldFill: RED });
  const h2b = txt(b1, WX1, 318, '+ straight edge: {{20}} cm', { size: 34, fill: RED });
  const h3 = txt(b1, WX1, 404, '{{P = 31.4 + 20 = 51.4}} cm', { size: 40, fill: GREEN });
  const h4 = txt(b1, WX1, 492, 'exact: {{P = 10π + 20}} cm', { size: 38, fill: BLUE, boldFill: BLUE });
  const h5 = txt(b1, WX1, 572, '{{10π}} and {{20}} don’t combine,', { size: 30, fill: '#5A4A52' });
  const h6 = txt(b1, WX1, 618, 'just like {{10x + 20}}', { size: 30, fill: '#5A4A52' });
  const AX = 800;
  const a0 = txt(b1, WX1, 236, 'the top: **half** the area', { size: 36 });
  const a1 = eqRow(b1, AX, 330, 'A', '=', '{{1/2 × π × 10^2}}', 42);
  const a2 = eqRow(b1, AX, 428, '', '=', '{{50π}}', 42, BLUE);
  const a3 = eqRow(b1, AX, 512, '', '≈', '{{157}} cm²', 44, GREEN);

  /* ================= D2: the quarter-cake board ================= */
  const b2 = G(Lshot);
  const wb2 = mkWhiteboard(b2, 1100, 520); tr(wb2, 600, 410);
  const QX = 230, QY = 560, QR = 250;
  const qCake = ciCake(b2, QR, 'quarter', { ribbonW: 12 }); tr(qCake, QX, QY);
  const qBare = E('path', { d: `M${QX + QR},${QY} L${QX},${QY} L${QX},${QY - QR}`, fill: 'none', stroke: RED, 'stroke-width': 10, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-dasharray': '14 10' }, b2);
  const qShade = E('path', { d: `M${QX},${QY} L${QX},${QY - QR} A${QR},${QR} 0 0 1 ${QX + QR},${QY} Z`, fill: 'rgba(46,125,216,0.35)', stroke: BLUE, 'stroke-width': 5 }, b2);
  const qAng = mkAngleMark(b2, QX, QY, 0, 90, { r: 34, col: BLUE });
  const qL1 = txt(b2, QX + QR / 2, QY + 46, '{{10}} cm', { size: 30, fill: ORANGE });
  const qL2 = txt(b2, QX - 16, QY - QR / 2 + 10, '{{10}} cm', { size: 30, fill: ORANGE, anchor: 'end' });
  const QEX = 790, QWX = 880;
  const q0 = txt(b2, QWX, 230, '**two** straight edges = **two radii**', { size: 32, boldFill: RED });
  const q1 = eqRow(b2, QEX, 310, '"curve"', '=', '{{1/4 × 2π × 10}}', 38);
  const q2 = eqRow(b2, QEX, 392, '', '=', '{{5π ≈ 15.7}}', 38);
  const q3 = eqRow(b2, QEX, 466, 'P', '=', '{{15.7 + 10 + 10}}', 38);
  const q4 = eqRow(b2, QEX, 544, '', '=', '{{35.7}} cm', 42, GREEN);
  const q4ring = E('rect', { x: QEX + 21, y: 506, width: 178, height: 56, rx: 10, fill: 'none', stroke: GREEN, 'stroke-width': 5 }, b2);
  const k0 = mkChip(b2, '**Perimeter**: curve **+** straight edges', { size: 28, col: RED, fill: '#FFECEC', textCol: INK });
  tr(k0, QWX, 228);
  const k1 = txt(b2, QWX, 300, '{{P ≈ 35.7}} cm', { size: 34, fill: '#5A4A52' });
  const k2 = eqRow(b2, QEX, 384, 'A', '=', '{{1/4 × π × 10^2}}', 40);
  const k3 = eqRow(b2, QEX, 470, '', '=', '{{25π}}', 40, BLUE);
  const k4 = eqRow(b2, QEX, 546, '', '≈', '{{78.5}} cm²', 42, GREEN);
  const k5 = mkChip(b2, '**Area**: take the fraction', { size: 28, col: BLUE, fill: '#E3ECFF', textCol: INK });
  tr(k5, QWX, 618);
  const stEasy = ciStamp(Lfg, true);

  /* ================= X: the close-up ================= */
  const xG = G(Lshot);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#FFE6F0' }, xG);
  let check = '';
  for (let k = 0; k < 13; k++) check += `M${k * 100},0 h50 v750 h-50 Z M0,${k * 100} v50 h1200 v-50 Z `;
  E('path', { d: check, fill: BERRY, opacity: 0.16 }, xG);
  E('circle', { cx: 470, cy: 430, r: 270, fill: '#FFFFFF', stroke: '#C9D3DC', 'stroke-width': 6 }, xG);
  E('circle', { cx: 470, cy: 430, r: 220, fill: 'none', stroke: '#E6EBEF', 'stroke-width': 4 }, xG);
  const XX = 340, XY = 560, XR = 270;
  const xCake = ciCake(xG, XR, 'quarter', { ribbonW: 12 }); tr(xCake, XX, XY);
  xCake.ribbon(1, 1);
  const cEat = mkSpeechBubble(Lfg, 'Can I eat it **now**?', { size: 32, tail: 'down', tailX: 60 });
  const cWait = mkChip(Lfg, '…still walking round it', { size: 28, col: '#8E3B2E', fill: '#FFF3E0', textCol: INK });

  /* ================= the cast ================= */
  const mum = cast(Lcast, 'mum'), priya = cast(Lcast, 'priya', { prop: null, hand: true });
  const boy = cast(Lfg, 'boy'), kav = cast(Lbcast, 'kavya'), tan = cast(Lbcast, 'tan', { prop: null, hand: true });
  const perry = cast(Lbcast, 'perry');
  // Priya's scissors and Ah Boy's fork
  { const sc = G(priya.hand);
    E('path', { d: 'M-4,-10 L-16,-86 M4,-10 L16,-86', stroke: '#8F9CAB', 'stroke-width': 7, 'stroke-linecap': 'round' }, sc);
    E('circle', { cx: -10, cy: 4, r: 11, fill: 'none', stroke: '#E8424F', 'stroke-width': 5 }, sc);
    E('circle', { cx: 10, cy: 4, r: 11, fill: 'none', stroke: '#E8424F', 'stroke-width': 5 }, sc);
    E('circle', { cx: 0, cy: -10, r: 3, fill: SC_INK }, sc); }
  const fork = G(boy.hand);
  E('line', { x1: 0, y1: 6, x2: 0, y2: -60, stroke: '#9AA6B2', 'stroke-width': 7, 'stroke-linecap': 'round' }, fork);
  E('path', { d: 'M-14,-58 L14,-58 M-14,-58 L-14,-96 M-5,-58 L-5,-96 M5,-58 L5,-96 M14,-58 L14,-96', fill: 'none', stroke: '#9AA6B2', 'stroke-width': 5, 'stroke-linecap': 'round' }, fork);
  { const tg = tan.hand; if (tg && tg.lastChild) op(tg.lastChild, 0); }   // Mr Tan visits without his stamp
  const ALL = [mum, priya, boy, kav, tan, perry];

  /* cuts */
  const cD1 = at('half') - 0.06, cA2 = at('quarter') - 0.06, cD2 = at('legs') - 0.06, cX = at('eat') - 0.06;
  // Perry on the half cake: walks the curve during "stuck", left end -> over the top -> the cut (right end)
  const tW0 = at('stuck') + 0.1, tW1 = mid('stuck', 0.62);

  return t => {
    const sA = on(t, -1, cD1) || on(t, cA2, cD2), s1 = on(t, cD1, cA2), s2 = on(t, cD2, cX), sX = on(t, cX, 1e9);
    const who = scWho(S, t);
    ALL.forEach(c => op(c, 0));
    op(stallG, sA); op(Lfront, sA); op(b1, s1); op(b2, s2); op(xG, sX);
    op(cOne, 0); cRib.set(0); cQrib.set(0); cEat.set(0); cWait.set(0); stEasy.set(0);
    op(fork, sX ? 1 : 0);

    /* ---------------- A: the stall ---------------- */
    if (sA) {
      stall.upd(t);
      const first = t < cD1;
      if (first) popIn(cOne, t, at('one') + 0.2, 1040, 60);
      op(dDia, first ? P(t, mid('one', 0.45), 0.3, linear) : 0); op(dDiaL, first ? P(t, mid('one', 0.45), 0.3, linear) : 0);
      op(dLab, first ? P(t, mid('one', 0.7), 0.3, linear) : 1);
      dHalf.ribbon(first ? P(t, mid('ribbon', 0.35), 0.8, ease) : 1, first ? P(t, mid('ribbon', 0.5), 0.5, ease) : 1);
      dQuar.ribbon(first ? 0 : P(t, mid('quarter', 0.5), 0.5, ease), 0);
      op(dQbare, !first ? flash(t) * P(t, mid('quarter', 0.6), 0.2, linear) : 0);
      op(reel, 1);
      if (t >= at('ribbon') && first) { cRib.set(P(t, mid('ribbon', 0.3), 0.35, linear)); tr(cRib, 640, 630); }
      if (!first) { cQrib.set(P(t, mid('quarter', 0.45), 0.35, linear)); tr(cQrib, 640, 630); }
      // Mum
      op(mum, 1); home(mum, Lcast); tr(mum, 240, 446, 1.0);
      let mm = 'neutral', ml = 0.6;
      if (t >= at('ribbon') && first) { mm = 'neutral'; ml = 0.9; }
      if (!first) { mm = 'smug'; ml = -0.5; }
      mum.set({ t, talk: scTalk(S, t, 'mum'), mood: mm, look: ml });
      // Priya with scissors
      op(priya, 1); home(priya, Lcast); tr(priya, 1000, 462, 0.96);
      priya.set({ t, talk: scTalk(S, t, 'priya'), mood: first ? (t >= mid('ribbon', 0.6) ? 'smug' : 'neutral') : 'neutral', look: first ? -0.8 : -0.9, lift: first && t >= mid('ribbon', 0.6) ? 1 : 0 });
      // Ah Boy, front left, hand up
      if (!first) {
        op(boy, 1); home(boy, Lfg);
        const up = P(t, cA2, 0.35, pop);
        tr(boy, 150, lerp(820, 632, up), 1.0);
        boy.set({ t, talk: scTalk(S, t, 'boy'), mood: 'happy', look: 0.6, lift: 1 });
      }
    }

    /* ---------------- D1: the half cake ---------------- */
    if (s1) {
      hCake.ribbon(P(t, mid('half', 0.15), 1.2, ease), P(t, mid('trace', 0.2), 1.6, ease));
      op(hBare, t >= mid('stuck', 0.6) && t < mid('trace', 0.2) ? flash(t) : 0);
      hBrace.set(P(t, at('trace') + 0.1, 0.3, linear) * (t < at('area') ? 1 : 0));
      op(hShade, t >= at('area') ? P(t, mid('area', 0.1), 0.4, linear) : 0);
      op(hRad, t >= at('area') ? P(t, mid('area', 0.25), 0.3, linear) : 0);
      cTrace.set(t >= at('trace') && t < at('exact') ? P(t, at('trace') + 0.15, 0.35, linear) : 0);
      line(h1, t, mid('half', 0.35), at('area'));
      line(h2a, t, mid('stuck', 0.55), at('trace'));
      line(h2b, t, at('trace') + 0.2, at('area'));
      line(h3, t, mid('trace', 0.55), at('area'));
      line(h4, t, mid('exact', 0.15), at('area'));
      line(h5, t, mid('exact', 0.5), at('area')); line(h6, t, mid('exact', 0.6), at('area'));
      line(a0, t, at('area') + 0.1); line(a1, t, mid('area', 0.25)); line(a2, t, mid('area', 0.55)); line(a3, t, mid('area', 0.72));
      // Perry walks the curve and stops at the cut
      if (t >= at('stuck') - 0.1) {
        op(perry, 1); home(perry, Lbcast);
        const s = 0.33, w = P(t, tW0, tW1 - tW0, linear), a = 180 + 180 * w;
        const rr = HR + 6, x = HX + rr * Math.cos(a * Math.PI / 180), y = HY + rr * Math.sin(a * Math.PI / 180);
        if (w < 1) perryOn(x, y, a, s);
        else { tr(perry, HX + HR + 40, HY - 112 * s, s, 0); }   // stands at the cut, by the bare edge
        const walking = w > 0 && w < 1;
        perry.set({ t, talk: scTalk(S, t, 'perry'), mood: w >= 1 ? (t >= at('trace') ? 'neutral' : 'annoyed') : 'neutral', look: w >= 1 ? -0.7 : 0, walk: walking ? t * 14 : 0, wheel: w * 900, sweat: w >= 1 && t < at('trace') ? 1 : 0, still: walking });
      }
      // one human at the front of the board
      const BX = 128, BY = 690, BS = 0.82;
      let h = priya, hm = 'smug', hl = 0.6, hlift = 0;
      if (t >= at('stuck')) { hm = 'shock'; hl = 0.7; }
      if (t >= at('trace') - 0.2) { h = kav; hm = t > mid('trace', 0.6) ? 'happy' : 'neutral'; hl = 0.6; }
      if (t >= at('exact') - 0.2) { h = tan; hm = 'happy'; hl = 0.6; hlift = 0; }
      if (t >= at('area') - 0.2) { h = mum; hm = t > mid('area', 0.7) ? 'smug' : 'neutral'; hl = 0.6; }
      const t0 = h === priya ? cD1 : h === kav ? at('trace') - 0.2 : h === tan ? at('exact') - 0.2 : at('area') - 0.2;
      op(h, 1); home(h, Lbcast);
      const up = h === priya ? 1 : P(t, t0, 0.35, pop);
      tr(h, BX, lerp(900, h === tan || h === mum ? BY - 6 : BY, up), BS);
      h.set({ t, talk: scTalk(S, t, h === priya ? 'priya' : h === kav ? 'kavya' : h === tan ? 'tan' : 'mum'), mood: hm, look: hl, lift: hlift });
    }

    /* ---------------- D2: the quarter cake ---------------- */
    if (s2) {
      // Perry walks the curve, then both radii (bottom edge, then up the left edge)
      const pw0 = at('legs') + 0.1, pw1 = end('legs') - 0.3;
      const w = P(t, pw0, pw1 - pw0, linear), Larc = QR * Math.PI / 2, Ltot = Larc + 2 * QR, u = w * Ltot, s = 0.3;
      op(qBare, t < mid('qcalc', 0.5) ? flash(t) * P(t, mid('legs', 0.3), 0.2, linear) : 0);
      qCake.ribbon(P(t, at('qcalc') + 0.1, 0.9, ease), P(t, mid('qcalc', 0.5), 0.9, ease));
      op(qShade, t >= at('qarea') ? P(t, mid('qarea', 0.15), 0.4, linear) : 0);
      qAng.set(P(t, mid('legs', 0.4), 0.4, linear));
      op(qL1, P(t, mid('legs', 0.45), 0.3, linear)); op(qL2, P(t, mid('legs', 0.55), 0.3, linear));
      line(q0, t, mid('legs', 0.35), at('qarea'));
      line(q1, t, mid('qcalc', 0.05), at('qarea')); line(q2, t, mid('qcalc', 0.3), at('qarea'));
      line(q3, t, mid('qcalc', 0.55), at('qarea')); line(q4, t, mid('qcalc', 0.78), at('qarea'));
      op(q4ring, t >= mid('qcalc', 0.88) && t < at('qarea') ? 1 : 0);
      k0.set(t >= at('qarea') ? P(t, at('qarea') + 0.1, 0.35, linear) : 0);
      line(k1, t, at('qarea') + 0.2); line(k2, t, mid('qarea', 0.2)); line(k3, t, mid('qarea', 0.45)); line(k4, t, mid('qarea', 0.62));
      k5.set(t >= mid('qarea', 0.8) ? P(t, mid('qarea', 0.8), 0.35, linear) : 0);
      if (t >= at('qarea')) { stEasy.set(P(t, mid('qarea', 0.7), 0.35, linear)); tr(stEasy, 1040, 470, 0.38); }
      op(perry, 1); home(perry, Lbcast);
      const walking = w > 0 && w < 1;
      if (u < Larc) { const a = 270 + u / QR * 180 / Math.PI; perryOn(QX + (QR + 6) * Math.cos(a * Math.PI / 180), QY + (QR + 6) * Math.sin(a * Math.PI / 180), a, s); }
      else if (u < Larc + QR) { const k = (u - Larc) / QR; tr(perry, QX + QR * (1 - k), QY - 112 * s, s, 0); }
      else { const k = Math.min(1, (u - Larc - QR) / QR); tr(perry, QX + 112 * s, QY - QR * k, s, 90); }
      if (w >= 1) tr(perry, QX + 112 * s, QY - QR, s, 90);
      perry.set({ t, talk: scTalk(S, t, 'perry'), mood: who === 'perry' ? 'annoyed' : 'neutral', look: 0.3, walk: walking ? t * 14 : 0, wheel: w * 1400, sweat: w > 0.3 ? 1 : 0, still: walking });
      // the human at the front: Kavya (legs, qcalc), Mum (qarea)
      const BX = 128, BY = 690, BS = 0.82;
      if (t < at('qarea') - 0.2) {
        op(kav, 1); home(kav, Lbcast); tr(kav, BX, BY, BS);
        kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: who === 'perry' ? 'neutral' : 'happy', look: 0.6 });
      } else {
        op(mum, 1); home(mum, Lbcast);
        const up = P(t, at('qarea') - 0.2, 0.35, pop);
        tr(mum, BX, lerp(900, BY - 6, up), BS);
        mum.set({ t, talk: scTalk(S, t, 'mum'), mood: t > mid('qarea', 0.75) ? 'smug' : 'neutral', look: 0.6 });
      }
    }

    /* ---------------- X: the close-up ---------------- */
    if (sX) {
      // Perry still walking round the quarter, slowly (loops the curve, both radii)
      const Larc = XR * Math.PI / 2, Ltot = Larc + 2 * XR, s = 0.36;
      const u = (((t - cX) * 70 + Larc * 0.15) % Ltot + Ltot) % Ltot;
      op(perry, 1); home(perry, Lbcast);
      if (u < Larc) { const a = 270 + u / XR * 180 / Math.PI; perryOn(XX + (XR + 6) * Math.cos(a * Math.PI / 180), XY + (XR + 6) * Math.sin(a * Math.PI / 180), a, s); }
      else if (u < Larc + XR) { const k = (u - Larc) / XR; tr(perry, XX + XR * (1 - k), XY - 112 * s, s, 0); }
      else { const k = (u - Larc - XR) / XR; tr(perry, XX + 112 * s, XY - XR * k, s, 90); }
      perry.set({ t, talk: scTalk(S, t, 'perry'), mood: who === 'perry' ? 'annoyed' : 'neutral', look: -0.4, walk: t * 8, wheel: (t - cX) * 200, sweat: 1, still: true });
      // Ah Boy and his fork
      op(boy, 1); home(boy, Lfg);
      const waiting = t >= at('wait');
      tr(boy, 985, 600, 1.15);
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: waiting ? 'deadpan' : 'happy', look: -0.8, lift: 1 });
      tr(fork, 0, 0, 1, waiting ? -6 + Math.sin(t * 3) * 3 * AMP : -20 + Math.sin(t * 8) * 6 * AMP);
      if (!waiting) { cEat.set(P(t, at('eat') + 0.05, 0.3, linear)); tr(cEat, 900, 300); }
      else { cWait.set(P(t, mid('wait', 0.3), 0.35, linear)); tr(cWait, 900, 300); }
    }
  };
});
