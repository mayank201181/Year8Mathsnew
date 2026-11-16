/* Scene 1: Security, kilos and Gate C (metric conversions).
   Changi, Saturday night. Security: Officer Siti's 100 ml rule -> Dad's 0.25 l shampoo, "0.25 < 100", trust me,
   I did the maths (rosette) -> MEANWHILE, ON MARS (spacecraft 2) -> Mètre: same unit first! -> the metric family
   kilo / centi / milli -> 0.25 l = 0.25 x 1000 = 250 ml -> the shampoo goes in the bin -> Mum's 8 cl = 80 ml, allowed
   -> the golden rule (smaller unit: multiply; bigger unit: divide) and the km-m-cm-mm ladder. Check-in: Ah Boy's
   bag reads 4250 -> Dad panics (limit 20 kg) -> Kavya: grams, 4250 / 1000 = 4.25 kg. Gate C: four routes, Dad avoids
   79 500 mm -> all in metres: 800, 750, 810, 79.5 -> the shortest! -> sensible units (phone mm, flight km) ->
   Mètre leans on Ah Boy, his favourite. */
scene('metric', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);          // hard sitcom cut
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 3, color: o.color || C.ink, weight: 700 }); };
  const fade = (t, a, b) => win(t, a, b, 0.2);
  const show = (el, t, t0, t1) => { const p = P(t, t0, 0.3, easeOut), q = t1 === undefined ? 1 : 1 - P(t, t1, 0.2, linear); op(el, Math.min(p, q)); tr(el, 0, 10 * (1 - p)); };
  const GOLD = '#FFE45C', INK = MK.ink, GREEN = '#1E9E5A', RED = '#C62828', BLUE = '#2E7DD8', BERRY = '#B8336A', MUTED = '#5A4A52';
  const paper = (parent, x, y, w, h) => {
    E('rect', { x: x + 6, y: y + 6, width: w, height: h, rx: 16, fill: 'rgba(0,0,0,0.25)' }, parent);
    return E('rect', { x, y, width: w, height: h, rx: 16, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, parent);
  };
  // a plastic bottle, base centre at (0,0); the label tag is big enough to read when the bottle is small
  function lmBottle(parent, o) {
    const g = G(parent), w = o.w, h = o.h, col = o.col;
    E('path', { d: `M${-w / 2},0 L${-w / 2},${-h * 0.68} Q${-w / 2},${-h * 0.82} ${-w * 0.2},${-h * 0.85} L${-w * 0.2},${-h} L${w * 0.2},${-h} L${w * 0.2},${-h * 0.85} Q${w / 2},${-h * 0.82} ${w / 2},${-h * 0.68} L${w / 2},0 Z`, fill: col, stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
    E('rect', { x: -w * 0.24, y: -h - 18, width: w * 0.48, height: 20, rx: 4, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
    E('path', { d: `M${-w * 0.32},${-h * 0.62} L${-w * 0.32},${-h * 0.12}`, stroke: '#FFFFFF', 'stroke-width': 6, opacity: 0.45, 'stroke-linecap': 'round' }, g);
    const lw = Math.max(w * 0.86, textWidth(o.label, o.size, FD, 800) + 22), lh = o.size * 1.3;
    E('rect', { x: -lw / 2, y: -h * 0.42 - lh / 2, width: lw, height: lh, rx: 6, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
    T(g, 0, -h * 0.42 + o.size * 0.36, o.label, { size: o.size, weight: 800, anchor: 'middle', fill: SC_INK });
    return g;
  }
  // a little member of the metric family: a yellow ruler-face with a beret (k = size)
  function lmFace(parent, k, beret) {
    const g = G(parent); tr(g, 0, 0, k);
    E('rect', { x: -22, y: -24, width: 44, height: 50, rx: 10, fill: '#F2C24A', stroke: SC_INK, 'stroke-width': 3 }, g);
    E('path', { d: `M-28,-22 Q-26,-${34 + beret} 2,-${36 + beret} Q30,-${34 + beret} 28,-22 Q0,-14 -28,-22 Z`, fill: '#1E1E28', stroke: SC_INK, 'stroke-width': 2 }, g);
    E('path', { d: 'M-9,-4 v6 M9,-4 v6 M-8,12 Q0,18 8,12', fill: 'none', stroke: SC_INK, 'stroke-width': 3.5, 'stroke-linecap': 'round' }, g);
    return g;
  }

  /* layers: sets, busts behind the counters, the counters, things standing on them, boards, HUD */
  const Lbg = G(root), Lcast = G(root), Lfront = G(root), Ltop = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= A: security ================= */
  const secShot = G(Lbg);
  const sec = lcAirport(secShot, { front: 'belt', sign: 'Security' });
  const secF = G(Lfront); secF.appendChild(sec.front); secF.appendChild(sec.top);
  const binG = G(secF);                                      // the bin, in front of the belt
  E('path', { d: 'M-58,-104 L58,-104 L48,0 L-48,0 Z', fill: '#5A6670', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, binG);
  E('rect', { x: -66, y: -116, width: 132, height: 18, rx: 6, fill: '#7D8A96', stroke: SC_INK, 'stroke-width': 3 }, binG);
  E('path', { d: 'M-30,-86 L-26,-16 M0,-86 L0,-16 M30,-86 L26,-16', stroke: '#3A4250', 'stroke-width': 5, 'stroke-linecap': 'round' }, binG);
  tr(binG, 560, 686);
  // the liquids sign standing on the belt (siti)
  const liqSign = G(Ltop);
  E('path', { d: 'M-120,128 L-100,0 M120,128 L100,0', stroke: '#5A6670', 'stroke-width': 6 }, liqSign);
  E('rect', { x: -170, y: -10, width: 340, height: 130, rx: 12, fill: '#FFFFFF', stroke: RED, 'stroke-width': 6 }, liqSign);
  E('rect', { x: -170, y: -10, width: 340, height: 40, rx: 10, fill: RED }, liqSign);
  T(liqSign, 0, 20, 'LIQUIDS', { size: 30, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 3 });
  mkText(liqSign, 0, 72, 'max **100 ml**', { size: 40, anchor: 'middle', fill: INK, boldFill: RED });
  T(liqSign, 0, 108, 'per bottle', { size: 28, weight: 700, anchor: 'middle', fill: MUTED });
  tr(liqSign, 900, 402);
  const cSat = pill(Lfg, 'Changi Airport · Saturday night', { size: 30, color: GOLD, stroke: GOLD });

  // the security board (stands over the X-ray machine)
  const board = G(Lfg), BX = 905;
  paper(board, 650, 112, 510, 396);
  E('path', { d: 'M650,128 Q650,112 666,112 L1144,112 Q1160,112 1160,128 L1160,162 L650,162 Z', fill: RED }, board);
  mkText(board, BX, 147, 'LIQUIDS: max **100 ml** per bottle', { size: 28, anchor: 'middle', fill: '#FFFFFF' });
  // Dad's maths
  const dadG = G(board);
  T(dadG, BX, 218, "Dad's maths:", { size: 30, weight: 700, anchor: 'middle', fill: MUTED });
  const dadM = mkMath(dadG, BX - 20, 312, '0.25 < 100', { size: 70, anchor: 'middle', fill: RED, weight: 700 });
  const dadQ = T(dadG, BX - 20 + dadM.w / 2 + 16, 312, '?', { size: 70, weight: 800, fill: RED });
  const dadStrike = strike(dadG, BX - 20 - dadM.w / 2 - 14, 288, BX - 20 + dadM.w / 2 + 56, INK);
  const unitsG = G(board);
  mkText(unitsG, BX, 392, '{{0.25 "l"}}  vs  {{100 ml}}', { size: 40, anchor: 'middle', fill: INK });
  const unitsCh = mkChip(unitsG, '**same unit first!**', { size: 34, col: GOLD, solid: true });
  tr(unitsCh, BX, 456);
  // the metric family
  const famG = G(board);
  mkText(famG, BX, 212, 'the **metric family**', { size: 36, anchor: 'middle', fill: INK, boldFill: BERRY });
  const FAM = [['**kilo**  (k)', '× 1000', 1.25, 10], ['**centi**  (c)', '1/100', 1.0, 6], ['**milli**  (m)', '1/1000', 0.72, 4]].map(([name, val, k, b], i) => {
    const row = G(famG), y = 290 + i * 82;
    tr(lmFace(row, k, b), 712, y - 12);
    mkText(row, 760, y, name, { size: 36, fill: INK, boldFill: BLUE });
    mkMath(row, 1130, y, val, { size: 42, anchor: 'end', fill: INK, weight: 700 });
    return row;
  });
  // 0.25 l = 250 ml
  const convW = mkWorking(board, BX - 10, 196, ['1 "l" = 1000 ml', '0.25 "l" = 0.25 × 1000', '= 250 ml'], { size: 42, fill: INK });
  const binM = G(board);
  mkMath(binM, BX - 30, 468, '250 ml > 100 ml', { size: 44, anchor: 'middle', fill: RED, weight: 700 });
  tr(cross(binM, 18, RED), BX + 170, 452);
  // Mum's 8 cl
  const mumW = mkWorking(board, BX - 10, 196, ['1 "cl" = 10 ml', '8 "cl" = 8 × 10', '= 80 ml'], { size: 42, fill: INK });
  const mumOk = G(board);
  mkMath(mumOk, BX - 30, 468, '80 ml <= 100 ml', { size: 44, anchor: 'middle', fill: GREEN, weight: 700 });
  tr(tick(mumOk, 18, GREEN), BX + 160, 456);
  // the golden rule
  const ruleG = G(board);
  mkText(ruleG, BX, 206, '**Golden rule**', { size: 36, anchor: 'middle', fill: BERRY });
  const r1 = mkText(ruleG, BX, 256, 'to a **smaller** unit: **× multiply**', { size: 31, anchor: 'middle', fill: INK, boldFill: GREEN });
  const r2 = mkText(ruleG, BX, 304, 'to a **bigger** unit: **÷ divide**', { size: 31, anchor: 'middle', fill: INK, boldFill: BLUE });
  const ladG = G(ruleG), LXS = [BX - 195, BX - 65, BX + 65, BX + 195], LY = 412;
  ['km', 'm', 'cm', 'mm'].forEach((u, i) => {
    E('rect', { x: LXS[i] - 34, y: LY - 27, width: 68, height: 54, rx: 10, fill: '#EAF3FB', stroke: BLUE, 'stroke-width': 3 }, ladG);
    if (u === 'm') mkMath(ladG, LXS[i], LY + 11, '"m"', { size: 32, anchor: 'middle', fill: INK, weight: 700 });
    else mkMath(ladG, LXS[i], LY + 11, u, { size: 32, anchor: 'middle', fill: INK, weight: 700 });
  });
  const ladUp = [], ladDn = [];
  ['× 1000', '× 100', '× 10'].forEach((lab, i) => {
    const g = G(ladG), x1 = LXS[i] + 6, x2 = LXS[i + 1] - 6;
    const a = arrow(g, x1 + 14, LY - 28, x2 - 14, LY - 28, { color: GREEN, width: 4, bend: -24 });
    mkMath(g, (x1 + x2) / 2, LY - 66, lab, { size: 26, anchor: 'middle', fill: GREEN, weight: 700 });
    ladUp.push({ g, a });
    const g2 = G(ladG);
    const a2 = arrow(g2, x2 - 14, LY + 28, x1 + 14, LY + 28, { color: BLUE, width: 4, bend: -24 });
    mkMath(g2, (x1 + x2) / 2, LY + 84, lab.replace('×', '÷'), { size: 26, anchor: 'middle', fill: BLUE, weight: 700 });
    ladDn.push({ g: g2, a: a2 });
  });

  /* ================= B: check-in ================= */
  const chkShot = G(Lbg);
  const chk = lcAirport(chkShot, { front: 'counter', sign: 'Check-in' });
  const chkF = G(Lfront); chkF.appendChild(chk.front); chkF.appendChild(chk.top);
  const bag = lcSuitcase(chk.top, { col: '#C2453A', w: 150, h: 170, tag: '' });
  tr(bag, 905, 520, 0.8);
  const scaleGlow = E('rect', { x: 780, y: 590, width: 240, height: 100, rx: 16, fill: 'none', stroke: GOLD, 'stroke-width': 6 }, chkF);
  const chkBoard = G(Lfg);
  paper(chkBoard, 650, 112, 510, 214);
  const limG = G(chkBoard);
  T(limG, BX, 162, "Dad's maths:", { size: 30, weight: 700, anchor: 'middle', fill: MUTED });
  const limM = mkMath(limG, BX - 20, 250, '4250 > 20', { size: 66, anchor: 'middle', fill: RED, weight: 700 });
  T(limG, BX - 20 + limM.w / 2 + 14, 250, '?!', { size: 66, weight: 800, fill: RED });
  const grG = G(chkBoard);
  mkText(grG, BX, 168, '{{"g" -> kg}}: **bigger** unit, so **÷**', { size: 32, anchor: 'middle', fill: INK, boldFill: BLUE });
  const grM = mkMath(grG, BX, 262, '4250 ÷ 1000 = 4.25 kg', { size: 46, anchor: 'middle', fill: INK, weight: 700 });
  const grRing = E('rect', { x: BX + grM.w / 2 - 128, y: 222, width: 142, height: 58, rx: 10, fill: 'none', stroke: GREEN, 'stroke-width': 5 }, grG);
  const cLim = mkChip(Lfg, 'limit: **20 kg**', { size: 32, col: '#FF8A8A' });

  /* ================= C: Gate C ================= */
  const gateShot = G(Lbg);
  const gate = lcAirport(gateShot, { front: 'rail', sign: 'Gate C  →' });
  const gateF = G(Lfront);
  E('rect', { x: 40, y: 534, width: 1120, height: 226, fill: linGrad('#9AA8B6', '#7D8A96', true) }, gateF);   // frosted panel behind the glass
  gateF.appendChild(gate.front); gateF.appendChild(gate.top);
  const SW = 600, SX = 850, SY = 112, SS = 30, RH = SS * 1.7;
  const way = lcWaySign(gateShot, [['Route A   0.8 km', ''], ['Route B   750 m', ''], ['Route C   81 000 cm', ''], ['Route D   79 500 mm', '']], { w: SW, size: SS });
  tr(way, SX, SY);
  const rowY = i => SY + 8 + i * RH + RH * 0.68;
  const vals = ['800 m', '750 m', '810 m', '79.5 m'].map((v, i) => T(gateShot, SX + SW / 2 - 64, rowY(i), v, { size: SS, weight: 800, anchor: 'end', fill: i === 3 ? '#7CF0A8' : '#FFFFFF' }));
  const xD = cross(gateShot, 15, '#FF5A5A'); tr(xD, SX + SW / 2 - 34, rowY(3) - 10);
  const tD = tick(gateShot, 16, '#56D69B'); tr(tD, SX + SW / 2 - 34, rowY(3) - 12);
  const card = G(Lfg);
  paper(card, 740, 380, 420, 230);
  mkText(card, 950, 424, 'all in **metres**', { size: 32, anchor: 'middle', fill: INK, boldFill: BLUE });
  const wayW = mkWorking(card, 1012, 446, ['0.8 × 1000 = 800', '81 000 ÷ 100 = 810', '79 500 ÷ 1000 = 79.5'], { size: 34, fill: INK, gap: 14 });
  const cShort = mkChip(Lfg, 'Route D is the **shortest!**', { size: 30, col: '#56D69B' });
  const cFav = mkChip(Lfg, 'a **sensible** unit for a sensible number', { size: 30, col: GOLD });
  const senseCh = [['phone ≈ **8 mm** thick', 432], ['flight ≈ **11 000 km**', 500], ['durian: **kg**   coin: **g**', 568]].map(([s, y]) => { const c = mkChip(Lfg, s, { size: 30, col: GOLD }); return { c, y }; });

  /* ================= Mars ================= */
  const marsShot = G(Lbg);
  const mars = lcMars(marsShot);

  /* ================= the cast (built once) ================= */
  const dad = cast(Lcast, 'dad', { prop: null, hand: true });
  const mum = cast(Lcast, 'mum', { prop: null, hand: true });
  const siti = cast(Lcast, 'siti');
  const kav = cast(Lcast, 'kavya');
  const boy = cast(Lcast, 'boy');
  const Lmet = G(Ltop);
  const met = cast(Lmet, 'metre');
  // props in hands
  const shampoo = lmBottle(dad.hand, { w: 70, h: 120, col: '#FF8FC8', label: '0.25 l', size: 38 }); tr(shampoo, 0, 8);
  const tiny = lmBottle(mum.hand, { w: 40, h: 70, col: '#7FD3FF', label: '8 cl', size: 38 }); tr(tiny, 0, -6);
  const flyB = lmBottle(Lfg, { w: 70, h: 120, col: '#FF8FC8', label: '0.25 l', size: 38 });
  const rosette = lcRosette(Lfg);
  const ltSiti = lcLowerThird(Lhud, 'siti');

  /* cut points */
  const cM0 = end('dad') + 0.02, cM1 = at('units') + 0.85;   // Mars
  const cB = at('boy') - 0.06, cC = at('avoid') - 0.06;
  const DADX = 105, MUMX = 285, SITIX = 460, BY = 448;

  return t => {
    const sMars = on(t, cM0, cM1);
    const sA = on(t, -1, cB) && !sMars, sB = on(t, cB, cC), sC = on(t, cC, 1e9);
    const who = scWho(S, t);
    sec.upd(t);
    op(secShot, sA); op(secF, sA); op(liqSign, sA); op(board, sA);
    op(chkShot, sB); op(chkF, sB); op(chkBoard, sB); op(cLim, 0);
    op(gateShot, sC); op(gateF, sC); op(card, sC); op(cShort, 0); op(cFav, 0); senseCh.forEach(s => op(s.c, 0));
    op(marsShot, sMars); op(cSat, 0); op(flyB, 0);
    ltSiti.set(win(t, at('siti') + 0.2, at('siti') + 3.3, 0.3));
    const vis = { dad: 0, mum: 0, siti: 0, kav: 0, boy: 0, met: 0 };
    rosette.set(0, 0);

    /* ---------- A: security ---------- */
    if (sA) {
      vis.dad = vis.mum = vis.siti = 1;
      tr(dad, DADX, BY, 0.85); tr(mum, MUMX, BY, 0.85); tr(siti, SITIX, BY, 0.85);
      // Siti
      let sm = 'neutral', sl = -0.6;
      if (t >= at('bin') && t < at('mum')) { sm = 'deadpan'; sl = t > end('bin') ? 0 : -0.8; }
      else if (who === 'metre') { sm = 'neutral'; sl = 0.8; }
      else if (who === 'mum') { sm = 'neutral'; sl = -0.7; }
      siti.set({ t, talk: scTalk(S, t, 'siti'), mood: sm, look: sl });
      // Dad: smug, then shock, sad
      let dm = 'neutral', dl = 0.7;
      if (t >= at('dad') && t < at('units')) { dm = 'smug'; dl = 0.6; }
      else if (t >= at('units') && t < at('bin')) { dm = t < at('family') ? 'shock' : 'neutral'; dl = who === 'metre' ? 1 : 0.7; }
      else if (t >= at('bin') && t < at('mum')) { dm = 'sad'; dl = t > end('bin') ? 0 : 0.8; }
      else if (t >= at('mum') && t < at('rule')) { dm = 'annoyed'; dl = 0.7; }
      dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: dl, lift: t >= mid('dad', 0.06) && t < mid('bin', 0.25) ? 1 : 0 });
      op(shampoo, t < mid('bin', 0.25) ? 1 : 0);
      // Mum
      let mm = 'neutral', ml = -0.6;
      if (who === 'siti') ml = 0.8;
      else if (who === 'metre') ml = 1;
      if (t >= at('bin') && t < at('mum')) { mm = 'deadpan'; ml = -0.7; }
      else if (t >= at('mum') && t < at('rule')) { mm = 'smug'; ml = 0.8; }
      mum.set({ t, talk: scTalk(S, t, 'mum'), mood: mm, look: ml, lift: t >= at('mum') && t < at('rule') + 0.4 ? 1 : 0 });
      op(tiny, 1);
      // Mètre pops up on the belt (after Mars)
      if (t >= cM1) {
        vis.met = 1;
        const up = P(t, cM1, 0.4, pop);
        tr(met, 592, lerp(560, 530 - 186 * 0.58, up), 0.58);
        let mo = 'annoyed';
        if (t >= at('family') && t < at('bin')) mo = 'smug';
        else if (t >= at('bin') && t < at('mum')) mo = 'deadpan';
        else if (t >= at('mum')) mo = 'happy';
        met.set({ t, talk: scTalk(S, t, 'metre'), mood: mo, look: who === 'metre' ? 0.6 : who === 'dad' ? -0.8 : -0.5,
          point: (t > mid('units', 0.55) && t < at('family')) || (t > mid('family', 0.2) && t < end('conv')) || (t > mid('rule', 0.1) && t < end('rule')) ? 1 : 0 });
      }
      // the Saturday-night chip, the liquids sign
      if (t < at('siti') + 2.2) { op(cSat, fade(t, at('siti'), at('siti') + 2.2)); tr(cSat, 850, 66); }
      const bp = P(t, at('dad') - 0.1, 0.35, easeOut);
      op(liqSign, 1 - bp);
      op(board, bp); tr(board, 0, 30 * (1 - bp));
      // Dad's maths
      op(dadG, fade(t, mid('dad', 0.1), at('family')));
      op(dadM, 1); op(dadQ, P(t, mid('dad', 0.4), 0.2, linear));
      dadStrike.set(P(t, cM1 + 0.1, 0.4, ease));
      op(unitsG, fade(t, cM1 + 0.15, at('family')));
      unitsCh.set(P(t, mid('units', 0.6), 0.4, linear));
      // the metric family
      op(famG, fade(t, at('family') - 0.05, at('conv')));
      FAM.forEach((r, i) => show(r, t, mid('family', [0.2, 0.5, 0.75][i])));
      // 0.25 l = 250 ml, then the bin
      op(convW, fade(t, at('conv') - 0.05, at('mum')));
      convW.show(0, P(t, mid('conv', 0.05), 0.3, linear)); convW.show(1, P(t, mid('conv', 0.4), 0.3, linear)); convW.show(2, P(t, mid('conv', 0.72), 0.3, linear));
      convW.ring(2, P(t, mid('conv', 0.85), 0.3, linear));
      op(binM, fade(t, at('bin'), at('mum')));
      // the bottle goes in the bin
      if (t >= mid('bin', 0.25) && t < at('mum')) {
        const f = P(t, mid('bin', 0.25), 0.9, linear), x = lerp(DADX + 70, 560, f), y = lerp(400, 640, f * f) - 160 * Math.sin(f * Math.PI);
        op(flyB, f < 1 ? 1 : 0); tr(flyB, x, y, 0.72, f * 260);
      }
      // Mum's 8 cl
      op(mumW, fade(t, at('mum'), at('rule')));
      mumW.show(0, P(t, mid('mum', 0.02), 0.3, linear)); mumW.show(1, P(t, mid('mum', 0.2), 0.3, linear)); mumW.show(2, P(t, mid('mum', 0.42), 0.3, linear));
      mumW.ring(2, P(t, mid('mum', 0.5), 0.3, linear));
      op(mumOk, fade(t, mid('mum', 0.72), at('rule')));
      // the golden rule
      op(ruleG, fade(t, at('rule') - 0.05, 1e9));
      op(r1, P(t, mid('rule', 0.15), 0.3, linear)); op(r2, P(t, mid('rule', 0.5), 0.3, linear));
      op(ladG, P(t, mid('rule', 0.3), 0.3, linear));
      ladUp.forEach((l, i) => l.a.set(P(t, mid('rule', 0.3) + i * 0.25, 0.35, linear)));
      ladDn.forEach((l, i) => l.a.set(P(t, mid('rule', 0.62) + (2 - i) * 0.25, 0.35, linear)));
      ladUp.forEach((l, i) => op(l.g, t > mid('rule', 0.3) + i * 0.25 ? 1 : 0));
      ladDn.forEach((l, i) => op(l.g, t > mid('rule', 0.62) + (2 - i) * 0.25 ? 1 : 0));
      // the rosette: on at "Trust me", falls off after Mars
      if (t >= mid('dad', 0.66)) rosette.set(P(t, mid('dad', 0.66), 0.4, linear), P(t, cM1 + 0.05, 0.7, easeIn));
      tr(rosette, DADX + 34, 486, 0.55);
    }

    /* ---------- Mars ---------- */
    if (sMars) {
      mars.set(P(t, cM0, 0.95, linear), 2);
      if (t >= at('units') - 0.1) {
        vis.met = 1;
        const up = P(t, at('units') - 0.1, 0.35, easeOut);
        tr(met, 200, lerp(900, 560, up), 0.85);
        met.set({ t, talk: scTalk(S, t, 'metre'), mood: 'annoyed', look: 0.7 });
      }
    }

    /* ---------- B: check-in ---------- */
    if (sB) {
      vis.kav = vis.dad = vis.boy = vis.met = 1;
      tr(kav, 110, 440, 0.85); tr(dad, 290, BY, 0.85); tr(boy, 470, 440, 0.85);
      chk.scale.set(t < mid('grams', 0.78) ? '4250 g' : '4.25 kg');
      op(scaleGlow, who === 'boy' || (t > mid('grams', 0.75) && t < end('grams') + 0.3) ? 0.55 + 0.45 * Math.sin(t * 7) : 0);
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: 'happy', look: who === 'boy' ? 0.6 : who === 'dad' ? -0.8 : -0.9, lift: t < end('boy') + 0.2 ? 1 : 0 });
      let dm = 'neutral', dl = 0.8;
      if (t >= at('limit') && t < mid('grams', 0.75)) { dm = 'shock'; dl = t < at('grams') ? 0.8 : -0.8; }
      else if (t >= mid('grams', 0.75)) { dm = 'happy'; dl = -0.6; }
      dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: dl, lift: 0 });
      op(shampoo, 0);
      let km = 'neutral', kl = 0.8;
      if (t >= at('limit') && t < at('grams')) km = 'annoyed';
      else if (t >= at('grams')) { km = t > mid('grams', 0.8) ? 'smug' : 'neutral'; kl = 0.6; }
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
      tr(met, 596, 520 - 186 * 0.58, 0.58);
      met.set({ t, talk: 0, mood: t >= at('limit') && t < at('grams') ? 'shock' : t >= mid('grams', 0.75) ? 'happy' : 'smug', look: who === 'boy' ? -0.6 : -0.9, point: t > mid('grams', 0.5) ? 1 : 0 });
      // Dad's panic, then Kavya's grams
      op(chkBoard, t >= at('limit') ? 1 : 0);
      op(limG, fade(t, mid('limit', 0.3), at('grams')));
      op(grG, fade(t, at('grams'), 1e9));
      show(grG, t, at('grams'));
      op(grM, P(t, mid('grams', 0.45), 0.3, linear));
      op(grRing, P(t, mid('grams', 0.75), 0.3, linear));
      if (t >= at('limit') && t < at('grams')) { cLim.set(P(t, mid('limit', 0.55), 0.4, linear)); tr(cLim, 290, 282); }
    }

    /* ---------- C: Gate C ---------- */
    if (sC) {
      vis.mum = vis.dad = vis.kav = vis.boy = 1;
      tr(mum, 100, BY, 0.85); tr(dad, 280, BY, 0.85); tr(kav, 460, 440, 0.85); tr(boy, 640, 440, 0.85);
      op(tiny, 0); op(shampoo, 0);
      let dm = 'smug', dl = 0.9;
      if (t >= at('metres') && t < at('fav')) { dm = t < mid('metres', 0.75) ? 'neutral' : 'shock'; dl = 0.7; }
      else if (t >= at('fav')) { dm = 'sad'; dl = 0.9; }
      dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: dl, lift: t > mid('avoid', 0.35) && t < at('metres') ? 1 : 0 });
      mum.set({ t, talk: 0, mood: t >= at('fav') ? 'happy' : t >= mid('metres', 0.8) ? 'smug' : 'neutral', look: who === 'dad' ? 0.6 : 0.9, lift: 0 });
      let km = t < at('metres') ? 'annoyed' : t < at('sense') ? 'neutral' : 'happy', kl = who === 'dad' ? -0.7 : 0.7;
      if (who === 'kavya') kl = 0.9;
      if (t >= at('fav')) { km = 'deadpan'; kl = t > end('fav') - 0.6 ? 0 : 0.8; }
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: 'happy', look: t >= at('fav') ? 0.7 : who === 'boy' ? 0.5 : -0.6, lift: t > at('sense') && t < end('sense') ? 1 : 0 });
      // the sign: Dad avoids D; then every route in metres
      xD.style.opacity = (t > mid('avoid', 0.5) ? 1 : 0) * (1 - P(t, mid('metres', 0.8), 0.25, linear));
      op(tD, P(t, mid('metres', 0.82), 0.25, linear));
      vals.forEach((v, i) => op(v, P(t, mid('metres', [0.12, 0.25, 0.36, 0.72][i]), 0.25, linear)));
      way.hl(3, t > mid('metres', 0.72) ? 0.6 + 0.4 * Math.sin(t * 6) : 0);
      // the working card
      op(card, fade(t, at('metres'), at('sense')));
      wayW.show(0, P(t, mid('metres', 0.12), 0.3, linear)); wayW.show(1, P(t, mid('metres', 0.36), 0.3, linear)); wayW.show(2, P(t, mid('metres', 0.72), 0.3, linear));
      wayW.ring(2, P(t, mid('metres', 0.85), 0.3, linear));
      if (t > mid('metres', 0.86) && t < at('sense')) { cShort.set(P(t, mid('metres', 0.86), 0.4, linear)); tr(cShort, 950, 652); }
      // sensible units
      if (t >= at('sense') && t < at('fav') + 0.2) senseCh.forEach((s, i) => { s.c.set(P(t, mid('sense', [0.15, 0.6, 0.85][i]), 0.4, linear) * (1 - P(t, at('fav'), 0.2, linear))); tr(s.c, 950, s.y); });
      // Mètre hops onto the rail and leans on Ah Boy
      if (t >= at('fav') - 0.2) {
        vis.met = 1;
        const h = P(t, at('fav') - 0.2, 0.55, ease), lean = P(t, mid('fav', 0.45), 0.5, ease);
        tr(met, lerp(1000, 748, h), 520 - 186 * 0.48 - Math.sin(h * Math.PI) * 120, 0.48, -14 * lean);
        met.set({ t, talk: scTalk(S, t, 'metre'), mood: 'happy', look: -0.8 });
        cFav.set(P(t, mid('fav', 0.1), 0.4, linear)); tr(cFav, 600, 628);
      }
    }

    op(dad, vis.dad); op(mum, vis.mum); op(siti, vis.siti); op(kav, vis.kav); op(boy, vis.boy); op(met, vis.met);
  };
});
