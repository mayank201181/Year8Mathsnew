/* Scene 3: Nobody invites the zero term (finding the nth term).
   Shots (hard sitcom cuts):
   A  4 p.m., the corridor: Zed, small and grey, waiting by the door since 2 p.m.
   TH Zed (lower third): THE ZERO TERM, one step before the first term (zero, 1st, 2nd, 3rd) -> an invitation flutters
      past him to somebody else
   C  Dad (remote, smug): his light show flashes 5, 8, 11, 14, hops +3: "n + 3" -> Kavya: n = 1 gives 4, not 5,
      PATTERN BROKEN, the lights bzzt
   Z  Zed at the card: add 3 -> 3n; a red hop back from 5 into his dotted slot: 5 − 3 = 2 -> nth term = 3n + 2
      (the + 2 flies out of his slot), PATTERN FOUND
   C  Kavya: n = 3: 3 × 3 + 2 = 11, tick on the 11
   C2 Mum and the laddoo tray: 20, 16, 12, 8 -> Dad: 4n + 16, PATTERN BROKEN
   Z  d = −4, back hop to his slot: 20 − (−4) = 24, nth term = 24 − 4n, PATTERN FOUND
   C3 4:30 p.m., Paati (lower third) with her taxi receipt: the meter reads $4.60, $5.20, $5.80 -> the row with hops
      +0.60, "$4 just for sitting down" in Zed's slot
   Z  d = 0.6, zero term = 4.60 − 0.60 = 4, fare = 0.6n + 4 -> the graph of 3n + 2: points (1, 5) ... (4, 14), a
      straight line, a hollow point at (0, 2) where it meets the axis
   G  close-up of the graph: Zed sitting in that point on the axis: "Finally. I'm on something." */
scene('zero', S => {
  const { at, end, mid } = S, root = S.root;

  /* ---------- local helpers ---------- */
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 2, color: o.color || C.ink, weight: 700 }); };
  const fadeIn = (el, t, t0, d) => { const p = P(t, t0, d || 0.3, easeOut); op(el, p); return p; };
  const GOLD = NX_COL.gold, PURPLE = NX_COL.purple, INK = MK.ink, GREEN = '#1E9E5A', RED = '#D32F2F', PINK = '#B8336A', GREY = '#7D8A96', ZGOLD = '#B8860B';
  const CX = 870;

  /* a row of terms with commas, centred on o.cx; r.set(i, p) pops term i in; commas follow automatically */
  function seqRow(parent, terms, o) {
    o = o || {};
    const size = o.size || 54, gap = o.gap || 44, y = o.y, g = G(parent);
    const ws = terms.map(s => mkMeasure(s, { size, weight: 700 }).w);
    const total = ws.reduce((a, b) => a + b, 0) + gap * (terms.length - 1);
    let x = (o.cx || CX) - total / 2;
    const xs = ws.map(w => { const c = x + w / 2; x += w + gap; return c; });
    const items = terms.map((s, i) => { const e = G(g); mkMath(e, 0, 0, s, { size, anchor: 'middle', fill: INK, weight: 700 }); tr(e, xs[i], y); return e; });
    const cI = terms.map((s, i) => (i < terms.length - 1 ? mkMath(g, xs[i] + ws[i] / 2 + 2, y, ',', { size, fill: INK, weight: 700 }) : null));
    const vis = terms.map(() => 0);
    const r = { g, xs, ws, y, items, size };
    r.set = (i, p) => { vis[i] = p; op(items[i], clamp(p * 2.5)); tr(items[i], xs[i], y, Math.max(0.01, 0.6 + 0.4 * pop(clamp(p)))); };
    r.done = () => cI.forEach((c, i) => { if (c) op(c, Math.min(clamp(vis[i] * 2.5), clamp(vis[i + 1] * 2.5))); });
    terms.forEach((s, i) => r.set(i, 0)); r.done();
    return r;
  }
  /* hop arrow above (or below) a row between slot centres xa and xb */
  function hopX(parent, xa, xb, y, label, col, o) {
    o = o || {};
    const g = G(parent), d = xb > xa ? 1 : -1, below = !!o.below;
    const x1 = xa + d * (o.dx || 12), x2 = xb - d * (o.dx || 12);
    const a = arrow(g, x1, y, x2, y, { color: col, width: 4, bend: (below ? 1 : -1) * d * 26 });
    const lab = mkMath(g, (x1 + x2) / 2, below ? y + 50 : y - 26, label, { size: o.lsize || 30, anchor: 'middle', fill: col, weight: 700 });
    g.set = p => { op(g, p > 0 ? 1 : 0); a.set(p); op(lab, clamp((p - 0.4) / 0.4)); };
    g.set(0);
    return g;
  }
  /* a stamp with a pale backing so it reads over the set */
  function stamp(parent, ok) {
    const g = G(parent), st = nxStamp(g, ok);
    const bk = E('rect', { x: -st.w / 2 - 6, y: -56, width: st.w + 12, height: 112, rx: 14, fill: '#FFFFFF', opacity: 0.8, transform: 'rotate(-8)' }, g);
    g.insertBefore(bk, st);
    g.set = p => { st.set(p); op(bk, p > 0.3 ? 0.8 : 0); op(g, p > 0 ? 1 : 0); };
    g.set(0);
    return g;
  }

  /* layers */
  const Lbg = G(root), Lcast = G(root), Lfront = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= sets ================= */
  const corShot = G(Lbg);
  const cor = nxCorridor(corShot);
  const corFront = G(Lfront); corFront.appendChild(cor.front); corFront.appendChild(cor.top);
  const conf = nxConf(Lbg, 'zed');
  const closeBg = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: MK.paper }, Lfg);   // the graph close-up

  /* ================= the talking head: plaque, positions, invitation ================= */
  const thG = G(Lfg);
  const plaque = G(thG); tr(plaque, 860, 250);
  E('rect', { x: -280, y: -80, width: 560, height: 160, rx: 18, fill: '#22262C', stroke: GOLD, 'stroke-width': 4 }, plaque);
  T(plaque, 0, -18, 'THE ZERO TERM', { size: 40, weight: 800, anchor: 'middle', fill: GOLD, ls: 3 });
  mkText(plaque, 0, 40, 'one step **before** the first term', { size: 30, anchor: 'middle', fill: '#DDE3EA', boldFill: GOLD });
  const posG = G(thG);
  const POS = ['zero', '1st', '2nd', '3rd'], PX = [700, 820, 940, 1060], PY = 460;
  const posBox = POS.map((w, i) => {
    const b = G(posG);
    E('rect', { x: PX[i] - 50, y: PY - 44, width: 100, height: 80, rx: 12, fill: i ? '#FFFDF6' : 'rgba(201,211,220,0.25)', stroke: i ? '#C9B48A' : '#C9D3DC', 'stroke-width': 4, 'stroke-dasharray': i ? 'none' : '10 8' }, b);
    T(b, PX[i], PY + 10, w, { size: 30, weight: 800, anchor: 'middle', fill: i ? INK : '#C9D3DC' });
    mkText(b, PX[i], PY + 80, `{{n = ${i}}}`, { size: 28, anchor: 'middle', fill: i ? '#DDE3EA' : '#C9D3DC' });
    return b;
  });
  const stepArc = arrow(posG, PX[1] - 14, PY - 56, PX[0] + 14, PY - 56, { color: GOLD, width: 4, bend: 26 });
  const stepLab = mkText(posG, (PX[0] + PX[1]) / 2, PY - 92, 'one step back', { size: 26, anchor: 'middle', fill: GOLD, weight: 700 });
  const env = G(Lfg);
  { const e = G(env);
    E('rect', { x: -56, y: -36, width: 112, height: 72, rx: 6, fill: '#FFE3EF', stroke: SC_INK, 'stroke-width': 3 }, e);
    E('path', { d: 'M-56,-36 L0,6 L56,-36', fill: 'none', stroke: SC_INK, 'stroke-width': 3 }, e);
    E('path', { d: 'M0,10 C-14,-6 -26,8 0,26 C26,8 14,-6 0,10 Z', fill: '#E8424F' }, e);
    T(e, 0, 64, 'YOU\'RE INVITED!', { size: 26, weight: 800, anchor: 'middle', fill: '#FFE3EF' }); }

  /* ================= the card ================= */
  const cardG = G(Lfg);
  const cardIn = G(cardG);   // zoomed for the close-up
  E('rect', { x: 578, y: 124, width: 596, height: 422, rx: 18, fill: 'rgba(0,0,0,0.22)' }, cardIn);
  E('rect', { x: 572, y: 118, width: 596, height: 422, rx: 18, fill: MK.paper, stroke: '#C9B48A', 'stroke-width': 5 }, cardIn);
  const RY = 320, HY = 262, NY = 364;
  /* a sequence with Zed's dotted slot one step to the left of the first term */
  function zRow(terms, zero, fwd, back, o) {
    o = o || {};
    const g = G(cardIn);
    const r = seqRow(g, terms, { y: RY, size: o.size || 54, gap: o.gap || 54, cx: CX + (o.shift || 60) });
    const sp = r.xs[1] - r.xs[0], zx = r.xs[0] - sp;
    const slot = G(g);
    const zw = Math.max(86, mkMeasure(zero, { size: r.size, weight: 700 }).w + 24);
    E('rect', { x: zx - zw / 2, y: RY - r.size * 0.95, width: zw, height: r.size * 1.3, rx: 12, fill: 'rgba(201,211,220,0.25)', stroke: GREY, 'stroke-width': 3, 'stroke-dasharray': '9 7' }, slot);
    const zv = G(g); mkMath(zv, 0, 0, zero, { size: r.size, anchor: 'middle', fill: ZGOLD, weight: 800 }); tr(zv, zx, RY);
    const hops = terms.slice(1).map((s, i) => hopX(g, r.xs[i], r.xs[i + 1], HY, fwd, PURPLE));
    const bk = hopX(g, r.xs[0], zx, HY, back, RED);
    const ns = G(g);
    const nl = [zx, ...r.xs].map((x, i) => mkText(ns, x, NY, `{{n = ${i}}}`, { size: 26, anchor: 'middle', fill: i ? '#5A6670' : GREY }));
    return { g, r, slot, zv, zx, hops, bk, ns, nl, sp };
  }
  const zA = zRow(['5', '8', '11', '14'], '2', '+3', '−3');
  const zB = zRow(['20', '16', '12', '8'], '24', '−4', '+4');
  const zC = zRow(['$4.60', '$5.20', '$5.80'], '$4', '+0.60', '−0.60', { size: 46, gap: 50, shift: 70 });
  const title = s => { const m = mkText(cardIn, CX, 172, s, { size: 32, anchor: 'middle', fill: INK, boldFill: PURPLE }); op(m, 0); return m; };
  const tA = title("Dad's light show"), tB = title('the laddoo tray'), tC = title('taxi fare after {{n}} km');
  const line = (y, s, o) => { const m = mkText(cardIn, CX, y, s, Object.assign({ size: 36, anchor: 'middle', fill: INK, boldFill: PURPLE }, o || {})); op(m, 0); return m; };
  const Y1 = 428, Y2 = 478, Y3 = 528;
  // 5, 8, 11, 14
  const wDad = line(Y1, "Dad's rule: {{n + 3}}", { fill: '#2E6FB8', boldFill: '#2E6FB8' });
  const wNo = line(Y2, '{{n = 1}}:  {{1 + 3 = 4 ≠ 5}}', { fill: RED });
  const w3n = line(Y1, 'add 3 every time → {{3n}}', { boldFill: PURPLE });
  const wZ = line(Y2, 'zero term: {{5 − 3 = 2}}', { fill: ZGOLD });
  const wRule = G(cardIn);
  const wRuleL = mkText(wRule, CX + 34, Y3, '{{n}}th term = {{3n}}', { size: 38, anchor: 'end', fill: GREEN, boldFill: GREEN });
  const wRuleR = G(wRule); mkMath(wRuleR, 0, 0, '+ 2', { size: 38 * 1.06, fill: ZGOLD, weight: 700 });
  const cDiff = mkChip(cardIn, 'difference × {{n}}  +  zero term', { size: 26, col: PURPLE, fill: '#F1ECFF' }); tr(cDiff, CX, Y2 - 8);
  const wChk = line(Y1 + 18, '{{n = 3}}:  {{3 × 3 + 2 = 11}}', { fill: GREEN });
  const chkT = tick(cardIn, 16, GREEN);
  const ring11 = E('circle', { cx: zA.r.xs[2], cy: RY - 18, r: 40, fill: 'none', stroke: GREEN, 'stroke-width': 5 }, cardIn);
  // 20, 16, 12, 8
  const wEasy = line(Y1, "Dad's rule: {{4n + 16}}", { fill: '#2E6FB8' });
  const wD = line(Y1, 'it goes **down**: {{d = −4}}', { boldFill: RED });
  const wZB = line(Y2, 'zero term: {{20 − (−4) = 24}}', { fill: ZGOLD });
  const wRuleB = line(Y3, '{{n}}th term = {{24 − 4n}}', { size: 38, fill: GREEN, boldFill: GREEN });
  // taxi
  const meter = nxTaxiMeter(cardIn); tr(meter, CX, 330, 1.45);
  const meterLab = line(470, 'the meter after **1**, **2**, **3** km', { size: 30, boldFill: INK });
  const cSit = mkChip(cardIn, '{{$4}} just for **sitting down**', { size: 30, col: ZGOLD, fill: '#FFF6DA' }); tr(cSit, CX, 458);
  const workC = mkWorking(cardIn, 820, 392, [
    'd = 0.6',
    { m: '"zero term" = 4.60 − 0.60 = 4', col: ZGOLD },
    { m: '"fare" = 0.6n + 4', col: GREEN }], { size: 33, fill: INK, gap: 15 });
  op(workC, 0);
  // the graph: term against position for 3n + 2
  const gr = G(cardIn);
  const OX = 668, OY = 494, UX = 82, UY = 15;
  const gx = n => OX + n * UX, gy = v => OY - v * UY;
  { let d = '';
    for (let n = 1; n <= 5; n++) d += `M${gx(n)},${gy(0)} L${gx(n)},${gy(20)} `;
    for (let v = 5; v <= 20; v += 5) d += `M${gx(0)},${gy(v)} L${gx(5.2)},${gy(v)} `;
    E('path', { d, stroke: MK.gridInk, 'stroke-width': 2 }, gr);
    E('path', { d: `M${gx(0)},${gy(0) + 8} L${gx(5.45)},${gy(0)} M${gx(0)},${gy(0) + 8} L${gx(0)},${gy(21.6)}`, stroke: INK, 'stroke-width': 4, 'stroke-linecap': 'round' }, gr);
    E('path', { d: `M${gx(5.45) + 14},${gy(0)} L${gx(5.45)},${gy(0) - 8} L${gx(5.45)},${gy(0) + 8} Z M${gx(0)},${gy(21.6) - 14} L${gx(0) - 8},${gy(21.6)} L${gx(0) + 8},${gy(21.6)} Z`, fill: INK }, gr);
    for (let n = 1; n <= 5; n++) T(gr, gx(n), OY + 32, String(n), { size: 26, weight: 700, anchor: 'middle', fill: INK });
    for (let v = 5; v <= 20; v += 5) T(gr, gx(0) - 12, gy(v) + 9, String(v), { size: 26, weight: 700, anchor: 'end', fill: INK });
    T(gr, gx(0) - 12, OY + 32, '0', { size: 26, weight: 700, anchor: 'end', fill: INK });
    mkMath(gr, gx(5.45) + 4, OY + 34, 'n', { size: 30, fill: INK });
    T(gr, gx(0) + 16, gy(21.6) + 4, 'term', { size: 28, weight: 700, fill: INK }); }
  const grLine = E('path', { d: `M${gx(0)},${gy(2)} L${gx(5.2)},${gy(17.6)}`, fill: 'none', stroke: MK.amber, 'stroke-width': 6, 'stroke-linecap': 'round' }, gr);
  mkDash(grLine);
  const grLab = mkMath(gr, gx(4.4), gy(17.2), '3n + 2', { size: 34, anchor: 'end', fill: '#C98A1E', weight: 700, halo: MK.paper });
  const grPts = [1, 2, 3, 4].map(n => {
    const p = G(gr); tr(p, gx(n), gy(3 * n + 2));
    const inner = G(p);
    E('circle', { r: 10, fill: RED, stroke: '#FFFFFF', 'stroke-width': 3 }, inner);
    mkText(inner, 14, 30, `{{(${n}, ${3 * n + 2})}}`, { size: 26, fill: RED, halo: MK.paper });
    return p;
  });
  const hollow = E('circle', { cx: gx(0), cy: gy(2), r: 12, fill: '#FFFFFF', stroke: ZGOLD, 'stroke-width': 4 }, gr);
  const face = G(gr); tr(face, gx(0), gy(2));
  E('ellipse', { rx: 22, ry: 28, fill: 'rgba(201,211,220,0.8)', stroke: GREY, 'stroke-width': 3 }, face);
  E('ellipse', { rx: 11, ry: 17, fill: '#EEF2F6', stroke: GREY, 'stroke-width': 2 }, face);
  [-5, 5].forEach(x => E('circle', { cx: x, cy: -4, r: 2.6, fill: SC_INK }, face));
  E('path', { d: 'M-5,6 Q0,10 5,6', fill: 'none', stroke: SC_INK, 'stroke-width': 2 }, face);
  const cMeet = mkChip(gr, 'meets the axis at the **zero term**, {{(0, 2)}}', { size: 26, col: ZGOLD, fill: '#FFF6DA' }); tr(cMeet, 920, 150);

  /* ---------- chips, stamps ---------- */
  const c4 = pill(Lhud, '4 p.m.', { size: 30, color: GOLD, stroke: GOLD });
  const c430 = pill(Lhud, '4:30 p.m.', { size: 30, color: GOLD, stroke: GOLD });
  const cWait = mkChip(Lfg, 'waiting since **2 p.m.**', { size: 30, col: '#C9D3DC' });
  const stBroken = stamp(Lhud, false), stFound = stamp(Lhud, true);

  /* ---------- the cast ---------- */
  const zed = cast(Lcast, 'zed');
  const kav = cast(Lcast, 'kavya');
  const dad = cast(Lcast, 'dad'); nxHandProp(dad.hand, 'remote');
  const mum = cast(Lcast, 'mum', { prop: null, hand: true }); nxHandProp(mum.hand, 'laddoos');
  const paati = cast(Lcast, 'paati');
  { const rc = G(paati.hand); tr(rc, 0, -40, 1, -8);
    E('rect', { x: -26, y: -40, width: 52, height: 76, rx: 4, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 2.5 }, rc);
    [-24, -12, 0, 12].forEach(y => E('path', { d: `M-16,${y} L16,${y}`, stroke: '#9CA8B4', 'stroke-width': 3 }, rc));
    E('path', { d: 'M-16,24 L16,24', stroke: SC_INK, 'stroke-width': 4 }, rc); }
  const zedFront = G(Lfg);   // Zed in the graph close-up sits in front of the card
  const lt = { zed: nxLowerThird(Lhud, 'zed'), paati: nxLowerThird(Lhud, 'paati') };
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* ---------- shots ---------- */
  const k = id => at(id) - 0.06;
  const SHOTS = [['A', -9], ['TH', k('zed')], ['C', k('dad')], ['Z', k('step')], ['C', k('check')], ['C2', k('tray')], ['Z', k('minus')],
    ['C3', k('taxi')], ['Z', k('taxirule')], ['G', k('finally')]];
  const shotAt = t => { let s = 'A'; for (const [kk, t0] of SHOTS) if (t >= t0) s = kk; return s; };
  const tBr1 = mid('four2', 0.62), tFd1 = mid('build', 0.7), tBr2 = mid('easy', 0.72), tFd2 = mid('minus', 0.86);

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const sh = shotAt(t), who = scWho(S, t);
    const corOn = sh !== 'TH' && sh !== 'G' ? 1 : 0;
    for (const kk in lt) lt[kk].set(0);
    const show = { zed: 0, kav: 0, dad: 0, mum: 0, paati: 0 };
    op(corShot, corOn); op(corFront, corOn); conf.set(sh === 'TH' ? 1 : 0, t);
    op(closeBg, sh === 'G' ? 1 : 0); op(thG, sh === 'TH' ? 1 : 0); op(env, 0);
    op(c4, 0); op(c430, 0); op(cWait, 0); stBroken.set(0); stFound.set(0);
    if (zed.parentNode !== (sh === 'G' ? zedFront : Lcast)) (sh === 'G' ? zedFront : Lcast).appendChild(zed);

    /* ---------- the lights ---------- */
    if (corOn) {
      cor.upd(t, 0);
      let mode = 'on', mp = 1;
      if (t >= at('dad') && t < at('four2')) {   // the light show flashes 5, 8, 11, 14
        const f = [0.25, 0.33, 0.41, 0.5].reduce((a, ff, i) => (t >= mid('dad', ff) ? [5, 8, 11, 14][i] : a), 0);
        mode = f ? 'chase' : 'off'; mp = f;
      }
      if (t >= tBr1 && t < at('step')) { mode = 'bzzt'; mp = clamp((t - tBr1) / 1.0); }
      if (t >= tFd1 && t < at('tray')) mode = 'ripple';
      if (t >= tBr2 && t < at('minus')) { mode = 'bzzt'; mp = clamp((t - tBr2) / 1.0); }
      if (t >= tFd2) mode = 'ripple';
      cor.lights.set(t, mode, mp);
    }

    /* ---------- the card ---------- */
    const cardOn = (sh === 'C' || sh === 'Z' || sh === 'C2' || sh === 'C3' || sh === 'G') && t >= at('dad') ? 1 : 0;
    op(cardG, cardOn);
    [zA, zB, zC].forEach(z => op(z.g, 0));
    [tA, tB, tC, wDad, wNo, w3n, wZ, wRule, wChk, chkT, ring11, wEasy, wD, wZB, wRuleB, meter, meterLab, workC, gr, face, hollow].forEach(e => op(e, 0));
    cDiff.set(0); cSit.set(0); cMeet.set(0);
    tr(cardIn, 0, 0);
    const rowIn = (z, t0, step) => { z.r.items.forEach((e, i) => z.r.set(i, P(t, t0 + i * step, 0.3, linear))); z.r.done(); };
    const allOn = z => { z.r.items.forEach((e, i) => z.r.set(i, 1)); z.r.done(); };
    if (cardOn) {
      if (t < at('tray') - 0.1) {
        // 5, 8, 11, 14
        const z = zA; op(z.g, 1); op(tA, 1);
        rowIn(z, mid('dad', 0.25), mid('dad', 0.33) - mid('dad', 0.25));
        z.hops.forEach((h, i) => h.set(P(t, mid('dad', 0.56 + i * 0.06), 0.3, linear)));
        op(z.ns, P(t, mid('dad', 0.2), 0.3, linear));
        op(z.zv, 0); op(z.slot, t >= at('step') - 0.1 ? 1 : 0.35);
        if (t < at('step') - 0.1) {
          fadeIn(wDad, t, mid('dad', 0.8));
          if (t >= at('four2')) fadeIn(wNo, t, mid('four2', 0.3));
        } else {
          z.bk.set(P(t, mid('step', 0.62), 0.4, linear));
          op(w3n, P(t, mid('step', 0.22), 0.3, linear) * (t < at('check') - 0.1 ? 1 : 0));
          op(wZ, P(t, mid('step', 0.72), 0.3, linear) * (t < at('check') - 0.1 ? 1 : 0));
          op(z.zv, P(t, mid('step', 0.8), 0.3, linear));
          if (t >= at('build') - 0.1) {
            op(wRule, 1);
            op(wRuleL, P(t, mid('build', 0.05), 0.3, linear));
            // the + 2 flies out of Zed's slot into the rule
            const fp = P(t, mid('build', 0.22), 0.6, ease);
            op(wRuleR, fp > 0 ? 1 : 0);
            tr(wRuleR, lerp(z.zx - 20, CX + 44, fp), lerp(RY, Y3, fp));
            if (t < at('check') - 0.1) cDiff.set(P(t, mid('build', 0.5), 0.4, linear));
          }
          if (t >= at('check') - 0.1) {
            fadeIn(wChk, t, mid('check', 0.15));
            popIn(chkT, t, mid('check', 0.6), CX + wChk.w / 2 + 30, Y1 + 6, 1);
            op(ring11, P(t, mid('check', 0.62), 0.3, linear));
          }
        }
      } else if (t < at('taxi') - 0.1) {
        // 20, 16, 12, 8
        const z = zB; op(z.g, 1); op(tB, 1);
        rowIn(z, mid('tray', 0.38), 0.32);
        op(z.ns, P(t, mid('tray', 0.3), 0.3, linear));
        op(z.slot, t >= at('minus') - 0.1 ? 1 : 0.35);
        op(z.zv, P(t, mid('minus', 0.55), 0.3, linear));
        if (t < at('minus') - 0.1) { if (t >= at('easy') - 0.1) fadeIn(wEasy, t, mid('easy', 0.2)); }
        else {
          z.hops.forEach((h, i) => h.set(P(t, mid('minus', 0.04 + i * 0.07), 0.3, linear)));
          fadeIn(wD, t, mid('minus', 0.18));
          z.bk.set(P(t, mid('minus', 0.38), 0.4, linear));
          fadeIn(wZB, t, mid('minus', 0.45));
          fadeIn(wRuleB, t, mid('minus', 0.78));
        }
      } else if (t < at('graph') - 0.1) {
        // the taxi
        if (t < at('paati') - 0.1) {
          op(meter, 1);
          const v = t >= mid('taxi', 0.82) ? '5.80' : t >= mid('taxi', 0.71) ? '5.20' : t >= mid('taxi', 0.6) ? '4.60' : '0.00';
          meter.set(v);
          op(meterLab, P(t, mid('taxi', 0.62), 0.3, linear));
        } else {
          const z = zC; op(z.g, 1); op(tC, 1); allOn(z); op(z.ns, 1);
          z.hops.forEach((h, i) => h.set(P(t, mid('paati', 0.1 + i * 0.1), 0.3, linear)));
          op(z.slot, 1);
          z.bk.set(P(t, mid('paati', 0.55), 0.4, linear));
          op(z.zv, P(t, mid('paati', 0.65), 0.3, linear));
          if (t < at('taxirule') - 0.1) cSit.set(P(t, mid('paati', 0.7), 0.4, linear));
          else { op(workC, 1); workC.show(0, P(t, mid('taxirule', 0.05), 0.3, linear)); workC.show(1, P(t, mid('taxirule', 0.25), 0.3, linear)); workC.show(2, P(t, mid('taxirule', 0.55), 0.3, linear)); workC.ring(2, P(t, mid('taxirule', 0.75), 0.2, linear)); }
        }
      } else {
        // the graph
        op(gr, 1);
        grPts.forEach((p, i) => mkPopIn(p, P(t, mid('graph', 0.08 + i * 0.07), 0.4, linear)));
        mkDraw(grLine, P(t, mid('graph', 0.38), 0.8, ease)); op(grLine, t >= mid('graph', 0.38) ? 1 : 0);
        op(grLab, P(t, mid('graph', 0.5), 0.3, linear));
        op(hollow, P(t, mid('graph', 0.62), 0.2, linear));
        if (sh !== 'G') {
          op(face, P(t, mid('graph', 0.74), 0.25, linear)); tr(face, gx(0), gy(2), Math.max(0.01, 0.3 + 0.7 * P(t, mid('graph', 0.74), 0.4, pop)));
          cMeet.set(P(t, mid('graph', 0.7), 0.4, linear));
        }
      }
    }

    /* ---------- A: Zed waiting by the door ---------- */
    if (sh === 'A') {
      show.zed = 1; tr(zed, 240, 448, 0.75);
      zed.set({ t, talk: 0, mood: 'sad', look: 0.4 });
      popIn(c4, t, at('four') + 0.1, 720, 66);
      if (t >= mid('four', 0.55)) popIn(cWait, t, mid('four', 0.55), 560, 300);
    }

    /* ---------- TH: Zed, the zero term ---------- */
    if (sh === 'TH') {
      show.zed = 1; tr(zed, 330, 420, 1.3);
      let look = 0.5, mood = 'sad';
      lt.zed.set(win(t, at('zed') + 0.2, at('zed') + 3.4, 0.3));
      op(plaque, P(t, mid('zed', 0.1), 0.3, linear));
      posBox.forEach((b, i) => op(b, P(t, mid('zed', 0.4 + (i ? i : 3.6) * 0.08), 0.3, linear)));
      op(posBox[0], P(t, mid('zed', 0.6), 0.3, linear));
      stepArc.set(P(t, mid('zed', 0.66), 0.4, linear)); op(stepLab, P(t, mid('zed', 0.75), 0.3, linear));
      if (t >= at('sad') - 0.1) {
        // an invitation flutters past him, to somebody else
        const u = clamp((t - mid('sad', 0.2)) / (end('sad') + 0.6 - mid('sad', 0.2)));
        const ex = lerp(-120, 1320, u), ey = 170 + 40 * Math.sin(u * 9);
        op(env, u > 0 && u < 1 ? 1 : 0); tr(env, ex, ey, 1, 14 * Math.sin(u * 12));
        look = clamp((ex - 330) / 260, -1, 1);
        mood = u > 0.15 && u < 0.32 ? 'neutral' : 'sad';
        op(plaque, 1 - P(t, mid('sad', 0.15), 0.3, linear));
      }
      zed.set({ t, talk: scTalk(S, t, 'zed'), mood, look });
    }

    /* ---------- C, C2, C3: the corridor with the humans; Zed small by the door ---------- */
    if (sh === 'C' || sh === 'C2' || sh === 'C3') {
      show.zed = 1; tr(zed, 108, 470, 0.55);
      zed.set({ t, talk: 0, mood: (t > tFd1 && t < at('tray')) || t > tFd2 ? 'neutral' : 'sad', look: 0.9 });
      if (sh === 'C') {
        show.dad = 1; show.kav = 1;
        tr(dad, 300, 446, 0.92); tr(kav, 470, 452, 0.9);
        const broke = t >= tBr1 && t < at('step');
        dad.set({ t, talk: scTalk(S, t, 'dad'), mood: broke ? 'shock' : t >= at('check') ? 'happy' : 'smug', look: who === 'kavya' ? 0.8 : 0.9, lift: t >= at('dad') && t < at('four2') ? 1 : 0 });
        kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: who === 'dad' ? 'deadpan' : broke ? 'annoyed' : 'neutral', look: who === 'dad' ? -0.8 : 0.9 });
        if (t >= tBr1 && t < at('step')) { stBroken.set(P(t, tBr1, 0.35, linear)); tr(stBroken, 300, 205, 0.5); }
      } else if (sh === 'C2') {
        show.dad = 1; show.mum = 1;
        tr(dad, 300, 446, 0.92);
        const mUp = P(t, at('tray') - 0.1, 0.4, pop);
        tr(mum, 470, lerp(700, 446, mUp), 0.92);
        const broke = t >= tBr2;
        dad.set({ t, talk: scTalk(S, t, 'dad'), mood: broke ? 'shock' : 'smug', look: 0.8, lift: who === 'dad' ? 1 : 0 });
        mum.set({ t, talk: scTalk(S, t, 'mum'), mood: broke ? 'annoyed' : who === 'dad' ? 'deadpan' : 'neutral', look: who === 'dad' ? -0.8 : 0.8, lift: who === 'mum' ? 1 : 0 });
        if (broke) { stBroken.set(P(t, tBr2, 0.35, linear)); tr(stBroken, 300, 205, 0.5); }
      } else {
        show.paati = 1; show.kav = 1;
        const pUp = P(t, mid('taxi', 0.3), 0.45, pop);
        tr(paati, 300, lerp(700, 452, pUp), 0.9); tr(kav, 470, 452, 0.9);
        popIn(c430, t, at('taxi') + 0.1, 720, 66);
        lt.paati.set(win(t, mid('taxi', 0.4), mid('taxi', 0.4) + 3.1, 0.3));
        paati.set({ t, talk: scTalk(S, t, 'paati'), mood: 'happy', look: who === 'paati' ? 0.8 : 0.5, lift: t >= mid('taxi', 0.4) ? 1 : 0 });
        kav.set({ t, talk: 0, mood: who === 'paati' ? 'happy' : 'neutral', look: who === 'paati' ? -0.8 : 0.9 });
      }
    }

    /* ---------- Z: Zed at the card ---------- */
    if (sh === 'Z') {
      show.zed = 1; tr(zed, 330, 440, 1.0);
      let mood = 'neutral', look = 0.8;
      if (t >= tFd1 && t < at('check')) mood = 'happy';
      if (t >= tFd2 && t < at('taxi')) mood = 'happy';
      if (t >= at('taxirule') && t < at('graph')) mood = 'neutral';
      if (t >= at('graph')) { mood = t >= mid('graph', 0.7) ? 'happy' : 'neutral'; look = t >= mid('graph', 0.7) ? 0.9 : 0.7; }
      zed.set({ t, talk: scTalk(S, t, 'zed'), mood, look, invited: 0 });
      if (t >= tFd1 && t < at('check')) { stFound.set(P(t, tFd1, 0.35, linear)); tr(stFound, 300, 205, 0.5); }
      if (t >= tFd2 && t < at('taxi')) { stFound.set(P(t, tFd2, 0.35, linear)); tr(stFound, 300, 205, 0.5); }
    }

    /* ---------- G: close-up of the graph, Zed on the axis ---------- */
    if (sh === 'G') {
      const zp = P(t, k('finally'), 0.25, easeOut), Z = lerp(1.6, 1.8, P(t, at('finally'), 3, linear));
      const fx = 610, fy = 430;
      cardIn.setAttribute('transform', `translate(${fx} ${fy}) scale(${Z.toFixed(4)}) translate(${-gx(0)} ${-gy(2)})`);
      op(gr, 1); grPts.forEach(p => mkPopIn(p, 1)); mkDraw(grLine, 1); op(grLine, 1); op(grLab, 1); op(hollow, 1); op(face, 0);
      show.zed = 1; tr(zed, fx, fy, 0.34 * Z / 1.6 * (0.9 + 0.1 * zp));
      zed.set({ t, talk: scTalk(S, t, 'zed'), mood: t > end('finally') ? 'happy' : 'neutral', look: 0, still: true });
    }

    op(zed, show.zed); op(kav, show.kav); op(dad, show.dad); op(mum, show.mum); op(paati, show.paati);
  };
});
