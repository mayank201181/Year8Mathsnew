/* Scene 5: Lionel's family reunion (matching and writing equations; the line through two points).
   Shots (hard sitcom cuts):
   M  1 p.m., lunch on the mat: the family behind the mat (left), a whiteboard (right). Kavya's phone flies big:
      80% at 9 a.m., -5% an hour (table) -> Cece (TWEET!): start 80 = c, -5 an hour = m, B = 80 - 5t, a small
      graph from (0, 80) down -> Dad's gym: C = 25n + 30 ($25 a month, $30 to join) -> Mum: c is what you pay
      even if you never go -> Mr Tan, lap three: a lunch quiz, three graphs and three equations; sign of m, size
      of m, c -> Kavya matches them, ticks.
   F  The reunion: one set of axes, three Lionels lying on y = 2x + 3, y = 2x, y = 2x - 2 (same tilt) -> the gap
      stays 3 (arrows); the brothers try to wave and can't reach -> Priya: parallel => equal gradients, only c
      differs.
   M  Mr Tan's stretch: (1, 5) and (4, 14), no graph -> m = (14 - 5)/(4 - 1) = 9/3 = 3, same order (colour-matched)
      -> 5 = 3 x 1 + c, c = 2; check 3 x 4 + 2 = 14 -> y = 3x + 2 draws through both points, ON THE LINE ->
      Priya: that's my drone's line! The drone flies along it. */
scene('lunch', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const winP = (t, a, b, d) => (t >= a && t < b ? P(t, a, d || 0.3, linear) : 0);
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 3, color: o.color || C.ink, weight: 700 }); };
  const popIn = (el, t, t0, x, y, s) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p))); return p; };
  const GOLD = '#FFE45C', INK = MK.ink, GREEN = '#1E9E5A', RED = '#D32F2F', BLUE = '#1E5AAC', PURPLE = '#7B3FC4', ORANGE = '#E8751A',
    AMBER = '#C77A0A', BOARD = MK.board;
  // typeset src like mkMath, but colour each glyph with colFn(textIndex, str) (for colour-matched working)
  const mathCol = (parent, x, y, src, o, colFn) => {
    const box = mkLayout(src, o), an = o.anchor || 'start', font = o.font || FD, wt = o.weight || 600;
    const x0 = x - (an === 'middle' ? box.w / 2 : an === 'end' ? box.w : 0), g = G(parent);
    g.items = []; let k = 0;
    box.items.forEach(it => {
      if (it.k === 't') {
        const col = colFn(k, it.str) || o.fill || INK;
        E('text', { x: (x0 + it.x).toFixed(1), y: (y + it.y).toFixed(1), 'font-size': it.s.toFixed(1), 'font-family': font, 'font-weight': wt, fill: col, 'font-style': it.it ? 'italic' : null }, g).textContent = it.str;
        g.items.push({ str: it.str, x: x0 + it.x, y: y + it.y, w: textWidth(it.str, it.s, font, wt), s: it.s });
        k++;
      } else if (it.k === 'l') E('line', { x1: (x0 + it.x).toFixed(1), y1: (y + it.y).toFixed(1), x2: (x0 + it.x + it.dx).toFixed(1), y2: (y + it.y + it.dy).toFixed(1), stroke: o.fill || INK, 'stroke-width': it.sw.toFixed(1), 'stroke-linecap': 'round' }, g);
      else E('path', { d: it.d, transform: `translate(${(x0 + it.x).toFixed(1)} ${(y + it.y).toFixed(1)})`, fill: 'none', stroke: o.fill || INK, 'stroke-width': it.sw.toFixed(1), 'stroke-linecap': 'round' }, g);
    });
    g.w = box.w;
    g.at = i => { const it = g.items[i]; return [it.x + it.w / 2, it.y]; };
    return g;
  };
  const noZero = axg => Array.from(axg.querySelectorAll('text')).forEach(el => { if (el.textContent === '0') el.remove(); });

  /* layers */
  const Lset = G(root), Lcast = G(root), Lfront = G(root), Lboard = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= the picnic lawn ================= */
  const pic = lgPicnic(Lset);
  Lfront.appendChild(pic.front); Lfront.appendChild(pic.top);

  /* ================= M: the whiteboard (centre 885, 395; content in board coordinates) ================= */
  const BX = 885, BY = 395;
  const wb = mkWhiteboard(Lboard, 540, 520); tr(wb, BX, BY);
  const bpage = () => G(wb.content);
  // P1: the battery table
  const bP1 = bpage();
  const tbl = mkTable(bP1, [['time', 'battery'], ['9 a.m.', '80%'], ['10 a.m.', '75%'], ['11 a.m.', '70%'], ['noon', '65%'], ['1 p.m.', '60%']],
    { colW: [200, 170], rowH: 58, size: 32, ink: INK, fill: '#FFFFFF', headFill: 'rgba(46,125,216,0.18)' });
  tr(tbl, -215, -190);
  const tblMinus = [1, 2, 3, 4].map(i => { const m = mkMath(bP1, 172, -190 + 58 * (i + 1) + 11, '−5', { size: 30, fill: RED, weight: 700 }); return m; });
  const tblArrows = [1, 2, 3, 4].map(i => E('path', { d: `M164,${-190 + 58 * i + 30} q14,29 0,58`, fill: 'none', stroke: RED, 'stroke-width': 3.5 }, bP1));
  // P2: B = 80 - 5t, the small graph, C = 25n + 30
  const bP2 = bpage();
  const eqB = mathCol(bP2, 0, -150, 'B = 80 − 5t', { size: 60, anchor: 'middle', fill: INK }, (k, s) => (s === '80' ? RED : s === '−' && k === 3 ? BLUE : s === '5' ? BLUE : null));
  const p80 = eqB.at(2), p5 = eqB.at(4);
  const labC = G(bP2), labM = G(bP2);
  E('path', { d: `M${p80[0]},${p80[1] + 10} L${-120},${-96}`, stroke: RED, 'stroke-width': 3 }, labC);
  mkText(labC, -120, -66, 'start {{80}}: that\'s {{c}}', { size: 28, anchor: 'middle', fill: RED });
  E('path', { d: `M${p5[0]},${p5[1] + 10} L${120},${-96}`, stroke: BLUE, 'stroke-width': 3 }, labM);
  mkText(labM, 125, -66, '{{−5}} an hour: {{m}}', { size: 28, anchor: 'middle', fill: BLUE });
  const mini = G(bP2);
  {
    const ox = -150, oy = 190, sx = 17.5, sy = 2.1;     // t 0..16 across, B 0..80 up
    E('path', { d: `M${ox},${oy} L${ox + 300},${oy} M${ox},${oy} L${ox},${oy - 190}`, stroke: INK, 'stroke-width': 4, 'stroke-linecap': 'round' }, mini);
    E('path', { d: `M${ox + 312},${oy} l-14,-8 l0,16 Z M${ox},${oy - 202} l-8,14 l16,0 Z`, fill: INK }, mini);
    mini.line = mkDash(E('path', { d: `M${ox},${oy - 80 * sy} L${ox + 16 * sx},${oy}`, stroke: AMBER, 'stroke-width': 6, 'stroke-linecap': 'round', fill: 'none' }, mini));
    E('circle', { cx: ox, cy: oy - 80 * sy, r: 9, fill: RED, stroke: '#FFFFFF', 'stroke-width': 3 }, mini);
    mini.ring = E('circle', { cx: ox, cy: oy - 80 * sy, r: 20, fill: 'none', stroke: RED, 'stroke-width': 4 }, mini);
    mkText(mini, ox - 14, oy - 80 * sy + 10, '80', { size: 28, anchor: 'end', fill: RED });
    mkText(mini, ox - 14, oy + 10, '0', { size: 26, anchor: 'end', fill: INK });
    E('path', { d: `M${ox + 16 * sx},${oy - 7} L${ox + 16 * sx},${oy + 7}`, stroke: INK, 'stroke-width': 3 }, mini);
    mkText(mini, ox + 16 * sx, oy + 36, '16', { size: 26, anchor: 'middle', fill: INK });
    mkMath(mini, ox + 324, oy + 10, 't', { size: 32, fill: INK });
    mkMath(mini, ox + 16, oy - 196, 'B', { size: 32, fill: INK });
  }
  const eqCg = G(bP2);
  const eqC = mathCol(eqCg, 0, 40, 'C = 25n + 30', { size: 60, anchor: 'middle', fill: INK }, (k, s) => (s === '25' ? BLUE : s === '30' ? RED : null));
  const p25 = eqC.at(2), p30 = eqC.at(5);
  E('path', { d: `M${p25[0]},${p25[1] + 12} L${-110},${88}`, stroke: BLUE, 'stroke-width': 3 }, eqCg);
  mkText(eqCg, -110, 118, '**$25** a month', { size: 30, anchor: 'middle', fill: BLUE });
  E('path', { d: `M${p30[0]},${p30[1] + 12} L${130},${88}`, stroke: RED, 'stroke-width': 3 }, eqCg);
  mkText(eqCg, 130, 118, '**$30** to join', { size: 30, anchor: 'middle', fill: RED });
  const ring30 = E('ellipse', { cx: p30[0], cy: p30[1] - 21, rx: 44, ry: 38, fill: 'rgba(255,228,92,0.45)', stroke: RED, 'stroke-width': 5 }, bP2);
  bP2.insertBefore(ring30, eqCg);
  const never = mkChip(bP2, 'even if you **never go**', { size: 30, col: RED, fill: '#FFFFFF' }); tr(never, 0, 190);
  // P3: the lunch quiz
  const bP3 = bpage();
  T(bP3, 0, -192, 'LUNCH QUIZ', { size: 34, weight: 800, anchor: 'middle', fill: '#2E7DD8', ls: 3 });
  const QX = [-168, 0, 168];
  const QL = [[3, 1, '1'], [-0.5, 4, '4'], [1, -3, '−3']];
  QL.forEach(([m, c, lb], i) => {
    const g = G(bP3); tr(g, QX[i] - 75, -160);
    const a = mkAxes(g, { xmin: -5, xmax: 5, ymin: -5, ymax: 5, unit: 15, ink: INK, size: 26, labelStep: 100, xName: ' ', yName: ' ', halo: BOARD });
    noZero(a);
    a.line(m, c, { col: [GREEN, PURPLE, ORANGE][i], width: 6 }).set(1);
    const ip = G(g); tr(ip, a.px(0), a.py(c));
    E('circle', { r: 7, fill: RED, stroke: '#FFFFFF', 'stroke-width': 2.5 }, ip);
    mkText(ip, -12, 9, lb, { size: 28, anchor: 'end', fill: RED, halo: BOARD });
  });
  const QE = ['y = 3x + 1', 'y = −1/2 x + 4', 'y = x − 3'];
  const qStart = [168, 0, -168];      // scrambled: 3x + 1 starts on the right, x - 3 on the left
  const qChips = QE.map((e, i) => mkChip(bP3, `{{${e}}}`, { size: 28, col: [GREEN, PURPLE, ORANGE][i], fill: '#FFFFFF' }));
  const qTicks = QX.map(x => { const tk = tick(bP3, 20, GREEN); tr(tk, x, 150); return tk; });
  // P5: the stretch graph, x 0..5, y 0..16
  const bP5 = bpage();
  const sAx = G(bP5); tr(sAx, -150, -196);
  const sa = mkAxes(sAx, { xmin: 0, xmax: 5, ymin: 0, ymax: 16, unit: 60, unitY: 24, ink: INK, size: 26, labelStep: 100, halo: BOARD });
  [1, 2, 3, 4, 5].forEach(v => T(sAx, sa.px(v), sa.py(0) + 34, String(v), { size: 26, anchor: 'middle', fill: INK, weight: 600 }));
  [5, 10, 15].forEach(v => T(sAx, sa.px(0) - 12, sa.py(v) + 9, String(v), { size: 26, anchor: 'end', fill: INK, weight: 600 }));
  { let d = ''; [5, 10, 15].forEach(v => { d += `M${sa.px(0) - 7},${sa.py(v)} L${sa.px(0) + 7},${sa.py(v)} `; }); E('path', { d, stroke: INK, 'stroke-width': 3 }, sAx); }
  const sLine = sa.line(3, 2, { col: AMBER, width: 7 });
  const sLab = mkMath(sAx, sa.px(2.85), sa.py(8.6), 'y = 3x + 2', { size: 36, fill: AMBER, anchor: 'start', halo: BOARD });
  const sPt = (x, y, col, label, pos) => {
    const g = G(sAx); tr(g, sa.px(x), sa.py(y)); const inner = G(g);
    E('circle', { r: 10, fill: col, stroke: '#FFFFFF', 'stroke-width': 3 }, inner);
    const dx = pos === 'e' ? 16 : -16;
    mkText(inner, dx, pos === 'e' ? 10 : -10, label, { size: 30, anchor: pos === 'e' ? 'start' : 'end', fill: col, halo: BOARD });
    g.set = p => mkPopIn(g, p); g.set(0);
    return g;
  };
  const pt15 = sPt(1, 5, RED, '{{(1, 5)}}', 'e'), pt414 = sPt(4, 14, BLUE, '{{(4, 14)}}', 'w');
  const stOn = lgStamp(bP5, true);
  const drone = lgDrone(bP5, { s: 0.3 });
  const bPages = [bP1, bP2, bP3, bP5];

  /* ================= M: the notes card (left), for the stretch ================= */
  const NW = 560, NH = 328;
  const notes = G(Lfg); tr(notes, 36, 112);
  E('rect', { x: 6, y: 6, width: NW, height: NH, rx: 18, fill: 'rgba(0,0,0,0.22)' }, notes);
  E('rect', { x: 0, y: 0, width: NW, height: NH, rx: 18, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, notes);
  const nPage = () => G(notes);
  const nStr = nPage();
  const cStretch = mkChip(nStr, '**STRETCH**', { size: 34, col: GOLD, solid: true }); tr(cStretch, NW / 2, 56);
  const nStr1 = mkText(nStr, NW / 2, 150, '**No graph.** Find the line through', { size: 32, anchor: 'middle', fill: INK, boldFill: RED });
  const nStr2 = G(nStr);
  mkMath(nStr2, 110, 236, '(1, 5)', { size: 48, fill: RED });
  mkText(nStr2, NW / 2, 232, 'and', { size: 32, anchor: 'middle', fill: INK });
  mkMath(nStr2, 330, 236, '(4, 14)', { size: 48, fill: BLUE });
  const nGrad = nPage();
  const kCol = [0, 0, BLUE, 0, RED, BLUE, 0, RED];
  const fr = mathCol(nGrad, NW / 2, 120, 'm = (14 − 5)/(4 − 1) = 9/3 = 3', { size: 48, anchor: 'middle', fill: INK }, k => kCol[k] || null);
  const ansBox = E('rect', { x: fr.items[fr.items.length - 1].x - 12, y: 120 - 46, width: fr.items[fr.items.length - 1].w + 24, height: 60, rx: 10, fill: 'none', stroke: GREEN, 'stroke-width': 4 }, nGrad);
  const nOrd = mkText(nGrad, NW / 2, 250, 'Subtract in the **same order**,', { size: 32, anchor: 'middle', fill: INK, boldFill: ORANGE });
  const nOrd2 = mkText(nGrad, NW / 2, 294, '{{(4, 14)}} first, then {{(1, 5)}}', { size: 30, anchor: 'middle', fill: INK });
  const nC = nPage();
  const nCh = mkText(nC, NW / 2, 50, '{{m = 3}}, so {{y = 3x + c}}', { size: 32, anchor: 'middle', fill: INK });
  const wk = mkWorking(nC, 206, 86, [{ m: '5 = 3 × 1 + c', note: '{{(1, 5)}}', noteCol: RED }, { m: 'c = 2' }, { m: '3 × 4 + 2 = 14', note: '{{(4, 14)}}', noteCol: BLUE }],
    { size: 38, fill: INK, noteSize: 30, gap: 24, noteX: 196 });
  const wkTick = tick(nC, 18, GREEN); tr(wkTick, 524, wk.lineY[2] - 12);
  const nPages = [nStr, nGrad, nC];

  /* ================= F: the reunion (one set of axes, three Lionels) ================= */
  const shotF = G(Lboard);
  E('rect', { x: 607, y: 111, width: 506, height: 572, rx: 18, fill: 'rgba(0,0,0,0.22)' }, shotF);
  E('rect', { x: 600, y: 104, width: 506, height: 572, rx: 18, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, shotF);
  const fAx = G(shotF); tr(fAx, 670, 160);
  const fa = mkAxes(fAx, { xmin: -2, xmax: 3.5, ymin: -3, ymax: 5, unit: 63, ink: INK, size: 26, halo: MK.paper });
  noZero(fa);
  const FX = x => 670 + fa.px(x), FY = y => 160 + fa.py(y);
  const FAM = [[3, GREEN], [0, AMBER], [-2, PURPLE]];
  const fLines = FAM.map(([c, col]) => fa.line(2, c, { col, width: 6 }));
  const gapL = G(shotF);
  const gapArr = [-0.3, 1.0].map(x => {
    const g = G(gapL), y1 = FY(2 * x + 3) + 8, y2 = FY(2 * x) - 8, xx = FX(x);
    E('path', { d: `M${xx},${y1} L${xx},${y2} M${xx},${y1} l-8,13 l16,0 Z M${xx},${y2} l-8,-13 l16,0 Z`, stroke: ORANGE, fill: ORANGE, 'stroke-width': 4 }, g);
    mkText(g, xx + 12, (y1 + y2) / 2 + 10, '**3**', { size: 30, fill: ORANGE, halo: MK.paper });
    return g;
  });
  const cDots = FAM.map(([c, col]) => { const g = G(shotF); tr(g, FX(0), FY(c)); E('circle', { r: 16, fill: 'none', stroke: RED, 'stroke-width': 4 }, g); E('circle', { r: 8, fill: RED, stroke: '#FFFFFF', 'stroke-width': 2.5 }, g); return g; });
  const lioL = G(shotF);
  const HEAD = [[-1.25, 3], [0.35, 0], [2.3, -2]].map(([x, c]) => [x, 2 * x + c]);
  const lios = HEAD.map(() => cast(lioL, 'lionel'));
  const TILT = Math.atan(2) * 180 / Math.PI;
  // the legend (left)
  const leg = G(Lfg);
  const legT = mkChip(leg, "**Lionel's family reunion**", { size: 32, col: GOLD }); tr(legT, 295, 146);
  const legPanel = E('rect', { x: 40, y: 182, width: 512, height: 206, rx: 16, fill: 'rgba(255,253,246,0.94)', stroke: '#8FA3B8', 'stroke-width': 4 }, leg);
  leg.insertBefore(legPanel, legT);
  const legRows = [['y = 2x + 3', 'brother'], ['y = 2x', '**me**'], ['y = 2x − 2', 'brother']].map(([e, w], i) => {
    const g = G(leg), y = 232 + i * 64;
    E('path', { d: `M64,${y - 12} L104,${y - 12}`, stroke: FAM[i][1], 'stroke-width': 8, 'stroke-linecap': 'round' }, g);
    mkMath(g, 120, y, e, { size: 40, fill: INK });
    const who = mkText(g, 520, y - 2, w, { size: 30, anchor: 'end', fill: '#5A6670', boldFill: AMBER });
    const mc = G(g); mkMath(mc, 336, y, 'm = 2', { size: 30, fill: BLUE }); mkMath(mc, 440, y, 'c = ' + mkFmt(FAM[i][0]), { size: 30, fill: RED });
    return { g, who, mc };
  });
  const cMeet = mkChip(Lfg, 'same gradient: they **never meet**', { size: 30, col: ORANGE });
  const cPara = mkChip(Lfg, '**parallel** ⇒ **equal gradients**', { size: 32, col: GOLD });
  const cOnlyC = mkChip(Lfg, 'only {{c}} is different', { size: 30, col: '#FF8A8A' });

  /* ================= chips, HUD, the cast ================= */
  const cOne = pill(Lhud, '1 p.m.', { size: 32, color: GOLD, stroke: GOLD });
  const phone = lgPhone(Lhud, { s: 1 });
  const cHrs = mkChip(Lfg, '{{t}} = hours after 9 a.m.', { size: 30, col: '#FFE45C' });
  const cLose = mkChip(Lfg, 'loses **5%** every **hour**', { size: 30, col: '#FF8A8A' });
  const cSign = mkChip(Lfg, 'the **sign** of {{m}}', { size: 30, col: '#7FD3FF' });
  const cSize = mkChip(Lfg, 'the **size** of {{m}}', { size: 30, col: '#7FD3FF' });
  const cC = mkChip(Lfg, 'and {{c}}', { size: 30, col: '#FF8A8A' });
  const cLap = mkChip(Lhud, 'LAP 3', { size: 32, col: '#4FB6E8', solid: true });
  const cMine = mkChip(Lfg, "my **drone's** line!", { size: 32, col: '#C9B6FF' });
  const cece = cast(Lfg, 'cece');
  const priya = cast(Lcast, 'priya'), kav = cast(Lcast, 'kavya'), mum = cast(Lcast, 'mum'), dad = cast(Lcast, 'dad'), tan = cast(Lcast, 'tan');
  const fade = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cut points */
  const cF = at('family') - 0.06, cM2 = at('stretch') - 0.06;
  const HY = 604;

  return t => {
    const who = scWho(S, t);
    op(fade, 1 - P(t, at('one') - 0.3, 0.3, linear));
    pic.upd(t * AMP);
    const sF = on(t, cF, cM2), sM = 1 - sF;

    /* ---------- HUD: time, the phone ---------- */
    popIn(cOne, t, at('one') + 0.1, 622, 58);
    {
      const big = P(t, mid('one', 0.35), 0.5, ease) * (1 - P(t, end('phone') + 0.1, 0.5, ease));
      const x = lerp(700, 170, big), y = lerp(58, 290, big), s = lerp(0.32, 1.15, big);
      const flash = t >= at('one') && t < at('phone') ? 0.75 + 0.25 * Math.sin(t * 9) : 1;
      tr(phone, x, y, s * (1 + (t < at('phone') ? 0.03 * Math.sin(t * 9) * AMP : 0)));
      op(phone, P(t, at('one') + 0.3, 0.3, linear) * flash);
      const rows = clamp((t - (at('phone') + 0.3)) / (end('phone') - at('phone') - 0.3) * 5);
      phone.set(t < at('phone') ? 60 : t < end('phone') + 0.1 ? 80 - 5 * Math.min(4, Math.floor(rows)) : 60);
    }
    cLose.set(winP(t, mid('phone', 0.55), at('words'))); tr(cLose, 400, 200);
    cHrs.set(sM ? winP(t, mid('words', 0.62), at('gym')) : 0); tr(cHrs, 400, 410);

    /* ---------- M: the whiteboard ---------- */
    op(wb, sM); bPages.forEach(p => op(p, 0)); op(notes, 0); nPages.forEach(p => op(p, 0));
    if (sM) {
      // which page
      if (t < at('words')) op(bP1, P(t, mid('one', 0.5), 0.3, linear));
      else if (t < at('quiz')) op(bP2, 1);
      else if (t < cF) op(bP3, 1);
      else op(bP5, 1);
      // P1: the table rows
      const r0 = at('phone') + 0.3, rd = (end('phone') - r0) / 5;
      tbl.cells.forEach((row, i) => row.forEach(c => op(c, i === 0 ? 1 : t >= at('phone') ? P(t, r0 + (i - 1) * rd, 0.25, linear) : 0)));
      tblMinus.forEach((m, i) => op(m, t >= at('phone') ? P(t, r0 + (i + 0.5) * rd, 0.25, linear) : 0));
      tblArrows.forEach((m, i) => op(m, t >= at('phone') ? P(t, r0 + (i + 0.5) * rd, 0.25, linear) : 0));
      // P2: B = 80 - 5t
      op(eqB, P(t, mid('words', 0.62), 0.3, linear));
      op(labC, P(t, mid('words', 0.12), 0.3, linear)); op(labM, P(t, mid('words', 0.4), 0.3, linear));
      const miniP = t < at('gym') ? P(t, mid('words', 0.5), 0.3, linear) : 1 - P(t, at('gym'), 0.25, linear);
      op(mini, miniP); mkDraw(mini.line, P(t, mid('words', 0.55), 1.0, ease));
      op(mini.ring, t < at('gym') ? 0.5 + 0.5 * Math.sin(t * 7) : 0);
      const tagC = eqCg.childNodes;
      // the parts of Dad's equation arrive on his beats: $30 to join, $25 a month
      op(tagC[3], P(t, mid('gym', 0.22), 0.3, linear)); op(tagC[4], P(t, mid('gym', 0.22), 0.3, linear));
      op(tagC[1], P(t, mid('gym', 0.42), 0.3, linear)); op(tagC[2], P(t, mid('gym', 0.42), 0.3, linear));
      if (t >= at('gym')) { op(eqCg, 1); op(eqC, P(t, mid('gym', 0.6), 0.3, linear)); } else op(eqCg, 0);
      op(ring30, t >= at('never') ? P(t, mid('never', 0.15), 0.3, linear) * (0.75 + 0.25 * Math.sin(t * 8)) : 0);
      never.set(t >= at('never') ? P(t, mid('never', 0.4), 0.4, linear) : 0);
      // P3: the quiz
      const tg = [mid('match', 0.04), mid('match', 0.38), mid('match', 0.72)];
      qChips.forEach((c, i) => {
        c.set(P(t, mid('quiz', 0.32 + i * 0.07), 0.35, linear));
        const f = P(t, tg[i], 0.6, ease);
        tr(c, lerp(qStart[i], QX[i], f), lerp(196, 82, f) - Math.sin(f * Math.PI) * 40);
      });
      qTicks.forEach((k, i) => op(k, P(t, tg[i] + 0.65, 0.2, linear)));
      // P5: the stretch
      pt15.set(P(t, mid('stretch', 0.55), 0.35, linear)); pt414.set(P(t, mid('stretch', 0.68), 0.35, linear));
      sLine.set(P(t, mid('c', 0.78), 0.8, ease)); op(sLab, P(t, mid('c', 0.9), 0.3, linear));
      stOn.set(t >= at('c') ? P(t, end('c') - 0.2, 0.35, linear) : 0); tr(stOn, 70, 120, 0.42);
      const dp = P(t, at('mine') + 0.2, 2.6, ease);
      op(drone, t >= at('mine') ? 1 : 0);
      if (t >= at('mine')) { const dx = lerp(0.3, 4.55, dp), dy = 3 * dx + 2; tr(drone, -150 + sa.px(dx), -196 + sa.py(dy) - 20 - 4 * Math.sin(t * 7) * AMP); drone.set(t, true); }
      // the notes card (stretch)
      if (t >= cM2) {
        op(notes, P(t, cM2, 0.3, linear));
        if (t < at('grad')) op(nStr, 1); else if (t < at('c')) op(nGrad, 1); else op(nC, 1);
        cStretch.set(P(t, cM2 + 0.1, 0.4, linear));
        op(nStr1, P(t, mid('stretch', 0.3), 0.3, linear)); op(nStr2, P(t, mid('stretch', 0.55), 0.3, linear));
        op(fr, P(t, at('grad') + 0.1, 0.3, linear)); op(ansBox, P(t, mid('grad', 0.45), 0.3, linear));
        op(nOrd, P(t, mid('grad', 0.62), 0.3, linear)); op(nOrd2, P(t, mid('grad', 0.75), 0.3, linear));
        op(nCh, P(t, at('c') + 0.05, 0.3, linear));
        wk.show(0, P(t, mid('c', 0.1), 0.4, linear)); wk.show(1, P(t, mid('c', 0.38), 0.4, linear)); wk.show(2, P(t, mid('c', 0.6), 0.4, linear));
        wk.ring(1, P(t, mid('c', 0.45), 0.3, linear));
        op(wkTick, P(t, mid('c', 0.85), 0.25, linear));
      }
    }
    cSign.set(sM && t >= at('quiz') && t < at('match') ? P(t, mid('quiz', 0.62), 0.35, linear) : 0); tr(cSign, 300, 190);
    cSize.set(sM && t >= at('quiz') && t < at('match') ? P(t, mid('quiz', 0.74), 0.35, linear) : 0); tr(cSize, 300, 262);
    cC.set(sM && t >= at('quiz') && t < at('match') ? P(t, mid('quiz', 0.88), 0.35, linear) : 0); tr(cC, 300, 334);
    cMine.set(sM && t >= at('mine') ? P(t, mid('mine', 0.4), 0.4, linear) : 0); tr(cMine, 316, 470);

    /* ---------- F: the reunion ---------- */
    op(shotF, sF); op(leg, sF);
    cMeet.set(0); cPara.set(0); cOnlyC.set(0);
    if (sF) {
      const arr = [mid('family', 0.55), mid('family', 0.25), mid('family', 0.78)];   // me first, then the brothers
      lios.forEach((l, i) => {
        const p = P(t, arr[i], 0.6, easeOut);
        fLines[i].set(P(t, arr[i], 0.6, ease));
        const [hx, hy] = HEAD[i];
        // slide in along the line from below-left
        const off = 2.2 * (1 - p), x = hx - off, y = hy - 2 * off;
        op(l, p > 0.01 ? clamp(p * 3) : 0);
        let wave = 0;
        if (i !== 1 && t >= at('meet')) { const w = Math.max(0, Math.sin((t - at('meet')) * 5)) * (1 - P(t, end('meet'), 0.6, linear)); wave = 12 * w * AMP * (i === 0 ? 1 : -1); }
        tr(l, FX(x) + wave * 0.894, FY(y) + wave * 0.447, 0.5);
        let mood = 'smug', look = 0;
        if (i === 1) { mood = t >= mid('meet', 0.6) ? 'sad' : t >= at('meet') ? 'neutral' : 'smug'; look = t < at('meet') ? -0.3 : 0.6; }
        else { mood = t >= mid('meet', 0.55) ? 'sad' : 'happy'; look = i === 0 ? 1 : -1; }
        if (t >= at('para')) { mood = 'deadpan'; look = -0.8; }
        l.set({ t, talk: i === 1 ? scTalk(S, t, 'lionel') : 0, mood, look, tilt: TILT });
      });
      gapArr.forEach((g, i) => op(g, P(t, mid('meet', 0.15 + i * 0.12), 0.3, linear)));
      cDots.forEach((d, i) => op(d, t >= at('para') ? P(t, mid('para', 0.6), 0.3, linear) * (0.7 + 0.3 * Math.sin(t * 6 + i)) : 0));
      // legend
      legRows.forEach((r, i) => {
        op(r.g, P(t, arr[i] + 0.1, 0.3, linear));
        op(r.who, t < at('para') ? 1 : 0); op(r.mc, t >= at('para') ? P(t, mid('para', 0.25), 0.3, linear) : 0);
      });
      cMeet.set(t >= at('meet') && t < at('para') ? P(t, mid('meet', 0.3), 0.4, linear) : 0); tr(cMeet, 290, 430);
      cPara.set(t >= at('para') ? P(t, at('para') + 0.15, 0.4, linear) : 0); tr(cPara, 295, 146);
      cOnlyC.set(t >= at('para') ? P(t, mid('para', 0.6), 0.4, linear) : 0); tr(cOnlyC, 295, 430);
      legT.set(t >= at('para') ? 0 : 1);
    }

    /* ---------- the cast ---------- */
    [priya, kav, mum, dad, tan].forEach(c => op(c, 0)); op(cece, 0);
    if (sM) {
      [priya, kav, mum, dad].forEach(c => op(c, 1));
      const s = 0.78;
      tr(priya, 92, HY, s); tr(kav, 218, HY, s); tr(mum, 344, HY, s); tr(dad, 470, HY, s);
      const tanOn = (t >= at('quiz') - 0.5 && t < cF) || t >= cM2;
      const lookR = (w, me) => (w === me ? 0.6 : ({ priya: 0, kavya: 1, mum: 2, dad: 3, tan: 4, cece: -2 }[w] ?? 5) > ({ priya: 0, kavya: 1, mum: 2, dad: 3 }[me]) ? 1 : -1);
      const boardLook = 1;
      // Priya
      let pm = 'neutral', pl = who ? lookR(who, 'priya') : boardLook;
      if (who === 'priya') { pm = 'happy'; pl = 1; }
      if (t >= at('c') && t < at('mine')) pm = 'smug';
      priya.set({ t, talk: scTalk(S, t, 'priya'), mood: pm, look: pl, lift: t >= at('mine') ? 1 : 0 });
      // Kavya
      let km = 'neutral', kl = who ? lookR(who, 'kavya') : boardLook;
      if (t < at('words')) { km = who === 'kavya' ? 'annoyed' : 'sad'; kl = -0.7; }
      else if (who === 'kavya') { km = 'happy'; kl = 1; }
      else if (who === 'mum') { km = 'deadpan'; }
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
      // Mum
      let mm = 'neutral', ml = who ? lookR(who, 'mum') : boardLook;
      if (who === 'dad') { mm = 'deadpan'; }
      else if (who === 'mum') { mm = 'deadpan'; ml = 1; }
      mum.set({ t, talk: scTalk(S, t, 'mum'), mood: mm, look: ml });
      // Dad
      let dm = 'neutral', dl = who ? lookR(who, 'dad') : boardLook;
      if (who === 'dad') { dm = 'smug'; dl = 1; }
      else if (t >= at('never') && t < at('quiz')) { dm = 'sad'; dl = -1; }
      dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: dl, lift: who === 'dad' ? 1 : 0 });
      // Mr Tan jogs in from the left (lap three), sweatier
      if (tanOn) {
        op(tan, 1);
        const t0 = t >= cM2 ? cM2 - 0.2 : at('quiz') - 0.5;
        const jin = P(t, t0, 0.8, easeOut), bob = Math.abs(Math.sin(t * 9)) * 10 * AMP;
        tr(tan, lerp(-140, 556, jin), HY - 6 - bob, s);
        tan.set({ t, talk: scTalk(S, t, 'tan'), mood: who === 'kavya' ? 'smug' : 'happy', look: who === 'tan' ? 1 : who === 'priya' || who === 'kavya' || who === 'mum' ? -1 : 1, sweat: 0.7, lift: who === 'tan' ? 1 : 0, still: true });
      }
      cLap.set(tanOn && t < at('match') ? P(t, at('quiz') + 0.3, 0.4, linear) : 0); tr(cLap, 556, 466);
      // Cece pops up on the left for "words"
      const ci = winP(t, at('words') - 0.2, at('gym'), 0.3);
      if (ci > 0) {
        op(cece, 1);
        const pp = P(t, at('words') - 0.2, 0.45, pop);
        tr(cece, 150, 300 + 40 * (1 - pp), 0.62 * (0.7 + 0.3 * pp));
        const tw = t >= mid('words', 0.1) && t < mid('words', 0.45) ? P(t, mid('words', 0.1), 0.35, linear) : 0;
        cece.set({ t, talk: scTalk(S, t, 'cece'), mood: 'neutral', look: 1, tweet: tw });
        op(cece, ci);
      }
    }
    if (sF) {
      [priya, kav, mum].forEach(c => op(c, 1));
      const s = 0.8;
      tr(priya, 104, HY, s); tr(kav, 244, HY, s); tr(mum, 384, HY, s);
      const aw = t >= at('meet') && t < at('para');
      priya.set({ t, talk: scTalk(S, t, 'priya'), mood: who === 'priya' ? 'smug' : aw && t > mid('meet', 0.6) ? 'deadpan' : 'happy', look: who === 'priya' ? 1 : 1, lift: who === 'priya' ? 1 : 0 });
      kav.set({ t, mood: aw && t > mid('meet', 0.6) ? 'deadpan' : who === 'priya' ? 'neutral' : 'happy', look: who === 'priya' ? -1 : 1 });
      mum.set({ t, mood: aw && t > mid('meet', 0.6) ? 'deadpan' : 'neutral', look: who === 'priya' ? -1 : 1 });
    }
  };
});
