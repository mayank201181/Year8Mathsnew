/* Scene 7: Dr Shrink's final clue (scale drawings and maps).
   Shots (hard sitcom cuts):
   A  5 p.m., Race HQ: both teams behind the trestle table, tired; a very small scientist pops up on the table.
   B  Dr Shrink (lower third) zaps the big tree: it lands on a little map, every length divided by the same number ->
      he zaps a triangle: 8 cm becomes 4 cm, the 60° angle stays 60° (so a bearing can be read straight off a map).
   C  Kavya and Dad at the race map (1 : 25 000): 1 cm on the map is 25 000 cm -> HQ to jetty 9 cm, Dad: 225 000 KM
      (Dr Shrink in shock) -> past halfway to the Moon; 225 000 cm = 2250 m = 2.25 km -> map to real: multiply, real
      to map: divide, 1 km = 100 000 cm.
   D  Mum and Priya: the road is 1.5 km -> 150 000 cm ÷ 25 000 = 6 cm, ruled on the map.
   E  Mr Tan's final clue card: 12 m on 040°, then 9 m on 130°, 1 cm to 2 m -> 6 cm and 4.5 cm.
   F  The scale drawing on squared paper (1 cm = 40 px): North line at the tree, 040°, 6 cm; a NEW North line at the
      turn, 130°, 4.5 cm -> Team Priya runs both legs, Kavya rules the shortcut: 7.5 cm × 2 = 15 m on about 077°;
      ON COURSE; Ah Boy reaches the treasure. */
scene('treasure', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const GOLD = '#FFE45C', RED = '#C62828', BLUE = '#1E5BB8', GREEN = '#1E8E50', VIO = '#7A5CFF', PINK = '#E0457B', TEAL = '#0E7A6E';
  const INK = MK.ink;
  const chipOn = (c, t, t0, t1, x, y) => { c.set(t >= t0 && t < t1 ? P(t, t0, 0.35, linear) : 0); if (x !== undefined) tr(c, x, y); };
  const fadeOn = (el, t, t0, d) => { const p = P(t, t0, d || 0.3, easeOut); op(el, p); return p; };
  const popAt = (el, t, t0, x, y, s) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p))); return p; };
  const bpt = (x, y, b, d) => [x + Math.sin(b * Math.PI / 180) * d, y - Math.cos(b * Math.PI / 180) * d];   // bearing b, distance d

  /* ---------- layers ---------- */
  const Lset = G(root), Lpaper = G(root), Lcast = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= Race HQ ================= */
  const set = cbIsland(Lset, 'hq');
  // the big tree (behind the table, shot B)
  const bigTree = G(set.mid);
  const drawTree = (g) => {
    E('path', { d: 'M-16,0 L-10,-170 L10,-170 L16,0 Z', fill: '#8B5A2B', stroke: '#4A2A10', 'stroke-width': 4 }, g);
    E('path', { d: 'M-4,-120 L-46,-170 M6,-140 L40,-190', stroke: '#8B5A2B', 'stroke-width': 9, 'stroke-linecap': 'round' }, g);
    [[0, -250, 92], [-70, -200, 64], [72, -210, 66], [-30, -300, 60], [40, -300, 58]].forEach(([x, y, r], i) =>
      E('circle', { cx: x, cy: y, r, fill: i % 2 ? '#3FA35E' : '#2E8B4E', stroke: '#1E5A32', 'stroke-width': 4 }, g));
  };
  drawTree(bigTree);
  const flag = cbFlag(set.mid, 0.8);
  const kav = cast(set.mid, 'kavya'), dad = cast(set.mid, 'dad'), boy = cast(set.mid, 'boy'),
    mum = cast(set.mid, 'mum'), pri = cast(set.mid, 'priya'), tan = cast(set.mid, 'tan');
  const HY = { kav: 452, dad: 445, boy: 466, mum: 445, pri: 450, tan: 445 };
  const HS = { kav: 0.84, dad: 0.86, boy: 0.8, mum: 0.84, pri: 0.82, tan: 0.86 };
  // a clue card in Mr Tan's hand (shot E)
  const tanCard = G(tan.hand || Lfg);
  E('rect', { x: -34, y: -96, width: 68, height: 50, rx: 5, fill: '#FFFDF6', stroke: SC_INK, 'stroke-width': 3 }, tanCard);
  E('path', { d: 'M-24,-82 l48,0 M-24,-70 l40,0 M-24,-58 l30,0', stroke: '#8FA3B8', 'stroke-width': 3 }, tanCard);

  /* ================= the cartoon cast ================= */
  const shrink = cast(Lcast, 'shrink', { s: 0.95 });
  const needle = cast(Lcast, 'needle', { s: 0.5 });

  /* ================= shot B: the mini map and the triangle ================= */
  const mini = G(Lpaper);
  cbPaper(mini, 620, 330, 300, 190, { fill: '#F2F8EC' });
  E('path', { d: 'M650,470 Q660,380 760,372 Q860,360 890,420 Q900,490 820,500 Q700,512 650,470 Z', fill: '#CDEBC0', stroke: '#7FB070', 'stroke-width': 3 }, mini);
  const miniTree = G(mini); drawTree(miniTree); tr(miniTree, 770, 462, 0.24);
  mkText(mini, 770, 506, 'on the map', { size: 26, fill: INK, anchor: 'middle', weight: 700 });
  const triCard = G(Lpaper);
  cbPaper(triCard, 600, 236, 360, 290);
  const triPath = E('path', { d: '', fill: 'rgba(30,91,184,0.12)', stroke: BLUE, 'stroke-width': 5, 'stroke-linejoin': 'round' }, triCard);
  const triArc = E('path', { d: '', fill: 'rgba(255,194,71,0.35)', stroke: '#E08A00', 'stroke-width': 4 }, triCard);
  const triAng = mkText(triCard, 0, 0, '**60°**', { size: 30, fill: '#B85C00', anchor: 'middle' });
  const triSide = [mkText(triCard, 0, 0, '**8 cm**', { size: 30, fill: INK, anchor: 'middle' }), mkText(triCard, 0, 0, '**4 cm**', { size: 30, fill: GREEN, anchor: 'middle' })];
  const TB = [[630, 470], [910, 470], [744, 272]], TS = [[700, 452], [840, 452], [757, 353]];
  const cEvery = mkChip(Lfg, 'every length **÷ the same number**', { size: 30, col: GOLD });
  const cStay = mkChip(Lfg, 'lengths **÷**, angles **stay the same**', { size: 30, col: GOLD });
  const cBear = mkChip(Lfg, 'so a **bearing** comes straight off the map', { size: 28, col: '#9FD8FF' });
  const cFive = mkChip(Lfg, '**5 p.m.** Race HQ', { size: 32, col: GOLD });
  const cSmall = mkChip(Lfg, 'a **very** small scientist', { size: 28, col: '#7EE08A' });

  /* ================= shots C-F: the big card ================= */
  const CX0 = 590, CY0 = 108, CW = 580, CH = 554, CM = CX0 + CW / 2;   // centre x 880
  const card = G(Lpaper);
  const plain = cbPaper(card, CX0, CY0, CW, CH);
  const sq = cbPaper(card, CX0, CY0, CW, CH, { grid: true, cell: 40 });
  // --- the race map (C, D) ---
  const hdr = mkText(card, CM, 162, '**Race map**    Scale {{1 : "25 000"}}', { size: 32, fill: INK, anchor: 'middle', boldFill: TEAL });
  const mapG = G(card);
  E('path', { d: 'M626,250 Q640,196 760,200 Q900,186 1040,206 Q1146,214 1140,290 Q1136,380 1020,384 Q860,396 720,386 Q620,380 626,250 Z', fill: '#D6EFCB', stroke: '#7FB070', 'stroke-width': 3 }, mapG);
  E('path', { d: 'M1110,300 Q1150,290 1166,300 L1166,384 Q1120,388 1090,380 Z', fill: '#A8D8F0' }, mapG);
  const HQ = [680, 282], JT = [1040, 282];
  E('path', { d: `M${HQ[0]},${HQ[1]} L${JT[0]},${JT[1]}`, stroke: INK, 'stroke-width': 3.5, 'stroke-dasharray': '10 8' }, mapG);
  cbDot(mapG, HQ[0], HQ[1], 'HQ', { dx: 0, dy: -18, size: 28 });
  cbDot(mapG, JT[0], JT[1], 'JETTY', { dx: 0, dy: -18, size: 28 });
  const m9 = mkText(mapG, 860, 264, '**9 cm**', { size: 30, fill: RED, anchor: 'middle', halo: '#D6EFCB' });
  const ruler9 = mkRuler(mapG, 9, { unit: 40 }); tr(ruler9, HQ[0], 300);
  // scale
  const scaleG = G(card);
  mkText(scaleG, CM, 452, '**1 cm** on the map\n= **25 000 cm** in real life', { size: 34, fill: INK, anchor: 'middle', boldFill: TEAL });
  const cSame = mkChip(scaleG, '**same unit** on both sides', { size: 28, col: TEAL, fill: '#FFFFFF' }); tr(cSame, CM, 600);
  // Dad's sum
  const dadG = G(card);
  mkText(dadG, CM, 452, 'HQ to the jetty: **9 cm** on the map', { size: 30, fill: INK, anchor: 'middle', boldFill: RED });
  const dadSum = mkMath(dadG, CM - 40, 540, '9 × "25 000" = "225 000"', { size: 42, fill: INK, anchor: 'middle' });
  const dadKm = mkText(dadG, CM - 40 + dadSum.w / 2 + 12, 540, '**km?!**', { size: 42, fill: RED });
  // the Moon
  const moonG = G(card);
  const EA = [652, 290], MO = [1112, 290], DADX = EA[0] + (MO[0] - EA[0]) * 225000 / 384400;
  E('path', { d: `M${EA[0] + 36},${EA[1]} L${MO[0] - 24},${MO[1]}`, stroke: '#5A6670', 'stroke-width': 4, 'stroke-dasharray': '3 10', 'stroke-linecap': 'round' }, moonG);
  E('circle', { cx: EA[0], cy: EA[1], r: 34, fill: ball('#4CA8E8', '#1E5A9E'), stroke: INK, 'stroke-width': 3 }, moonG);
  E('path', { d: `M${EA[0] - 18},${EA[1] - 14} q14,-8 22,4 q-4,14 -16,10 Z M${EA[0] + 6},${EA[1] + 10} q12,-4 16,6 q-8,10 -16,2 Z`, fill: '#56C26A' }, moonG);
  E('circle', { cx: MO[0], cy: MO[1], r: 24, fill: ball('#EEF0F2', '#9AA6B2'), stroke: INK, 'stroke-width': 3 }, moonG);
  E('circle', { cx: MO[0] - 6, cy: MO[1] - 6, r: 5, fill: '#B9C2CB' }, moonG);
  mkText(moonG, EA[0], EA[1] + 70, 'Earth', { size: 26, fill: INK, anchor: 'middle', weight: 700 });
  mkText(moonG, MO[0] - 8, MO[1] + 66, 'Moon', { size: 26, fill: INK, anchor: 'middle', weight: 700 });
  E('path', { d: `M${(EA[0] + MO[0]) / 2},${EA[1] - 18} L${(EA[0] + MO[0]) / 2},${EA[1] + 18}`, stroke: '#5A6670', 'stroke-width': 4 }, moonG);
  mkText(moonG, (EA[0] + MO[0]) / 2, EA[1] + 50, 'halfway', { size: 26, fill: '#5A6670', anchor: 'middle', weight: 700 });
  const dadPin = G(moonG);
  E('path', { d: `M${DADX},${EA[1]} L${DADX},${EA[1] - 44}`, stroke: RED, 'stroke-width': 4 }, dadPin);
  E('path', { d: `M${DADX},${EA[1] - 44} l30,10 l-30,10 Z`, fill: RED }, dadPin);
  E('circle', { cx: DADX, cy: EA[1], r: 8, fill: RED, stroke: '#FFFFFF', 'stroke-width': 2 }, dadPin);
  mkText(dadPin, DADX, EA[1] - 58, "**Dad: 225 000 km**", { size: 26, fill: RED, anchor: 'middle' });
  const workMoon = mkWorking(card, 912, 420, [
    { m: '9 × "25 000" = "225 000" cm' },
    { m: '"225 000" cm ÷ 100 = 2250 "m"' },
    { m: '2250 "m" ÷ 1000 = 2.25 km', col: GREEN }], { size: 36, fill: INK, gap: 22, ringCol: GREEN });
  // the rule
  const ruleG = G(card);
  const rr1 = mkText(ruleG, CM, 250, 'map → real:  **× multiply**', { size: 38, fill: INK, anchor: 'middle', boldFill: GREEN });
  const rr2 = mkText(ruleG, CM, 340, 'real → map:  **÷ divide**', { size: 38, fill: INK, anchor: 'middle', boldFill: BLUE });
  const rBox = G(ruleG);
  E('rect', { x: CM - 230, y: 420, width: 460, height: 92, rx: 16, fill: '#FFF6CC', stroke: '#E0A100', 'stroke-width': 4 }, rBox);
  mkMath(rBox, CM, 482, '1 km = "100 000" cm', { size: 44, fill: INK, anchor: 'middle' });
  const rSmall = mkText(ruleG, CM, 572, '{{1 km = 1000 "m"}},  {{1 "m" = 100 cm}}', { size: 28, fill: '#5A6670', anchor: 'middle' });
  // the road (D)
  const roadG = G(card);
  mkText(roadG, CM, 232, 'Road to the jetty: **1.5 km**', { size: 32, fill: INK, anchor: 'middle', boldFill: RED });
  const roadQ = mkChip(roadG, 'on the map: **? cm**', { size: 30, col: TEAL, fill: '#FFFFFF' }); tr(roadQ, CM, 320);
  const R0 = [700, 330];
  const roadLine = cbSeg(roadG, R0[0], R0[1], R0[0] + 240, R0[1], { col: RED, width: 6 });
  const roadEnds = G(roadG);
  cbDot(roadEnds, R0[0], R0[1], '', {}); cbDot(roadEnds, R0[0] + 240, R0[1], '', {});
  const roadJet = mkText(roadG, R0[0] + 270, R0[1] + 10, 'JETTY', { size: 26, fill: INK, weight: 800 });
  const road6 = mkText(roadG, R0[0] + 120, R0[1] - 18, '**6 cm**', { size: 30, fill: RED, anchor: 'middle' });
  const ruler6 = mkRuler(roadG, 7, { unit: 40 }); tr(ruler6, R0[0], R0[1] + 14);
  const workRoad = mkWorking(roadG, 930, 470, [
    { m: '1.5 km = "150 000" cm' },
    { m: '"150 000" ÷ "25 000" = 6 cm', col: GREEN }], { size: 36, fill: INK, gap: 24, ringCol: GREEN });
  // the final clue (E)
  const clueG = G(card);
  mkText(clueG, CM, 168, '**FINAL CLUE**', { size: 40, fill: RED, anchor: 'middle' });
  const cl1 = mkText(clueG, CM, 228, 'From the **big tree**:', { size: 32, fill: INK, anchor: 'middle', boldFill: '#2E7D4F' });
  const cl2 = mkText(clueG, CM, 288, '{{12 "m"}} on a bearing of {{040°}}', { size: 34, fill: INK, anchor: 'middle' });
  const cl3 = mkText(clueG, CM, 344, 'then {{9 "m"}} on {{130°}}', { size: 34, fill: INK, anchor: 'middle' });
  const cl4 = mkText(clueG, CM, 404, 'Scale: {{1 cm}} to {{2 "m"}}', { size: 34, fill: BLUE, anchor: 'middle' });
  const workClue = mkWorking(clueG, 880, 452, [
    { m: '12 ÷ 2 = 6 cm', col: GREEN },
    { m: '9 ÷ 2 = 4.5 cm', col: GREEN }], { size: 40, fill: INK, gap: 24 });
  // the scale drawing (F): T the big tree, U the turn, X the treasure (1 cm = 40 px)
  const drawG = G(card);
  const Tp = [690, 572], Up = bpt(690, 572, 40, 240), Xp = bpt(Up[0], Up[1], 130, 180);
  const b1 = cbBearing(drawG, { len: 240, r: 80, col: RED, arcCol: BLUE, size: 30 }); tr(b1, Tp[0], Tp[1]);
  const b2 = cbBearing(drawG, { len: 180, r: 50, col: RED, arcCol: BLUE, size: 30 }); tr(b2, Up[0], Up[1]);
  const lab6 = mkText(drawG, 0, 0, '**6 cm**', { size: 30, fill: RED, halo: MK.paper });
  const lab45 = mkText(drawG, 0, 0, '**4.5 cm**', { size: 30, fill: RED, halo: MK.paper });
  const rightU = mkAngleMark(drawG, Up[0], Up[1], 90 - 220, 90 - 130, { r: 34, col: '#E08A00', right: true });
  const dT = cbDot(drawG, Tp[0], Tp[1], 'T', { dx: -26, dy: 10 }), dU = cbDot(drawG, Up[0], Up[1], 'U', { dx: -26, dy: 10 }),
    dX = cbDot(drawG, Xp[0], Xp[1], 'X', { dx: 26, dy: 10, col: '#B0123E' });
  const treeLab = mkText(drawG, Tp[0] + 4, Tp[1] + 50, 'big tree', { size: 26, fill: '#2E7D4F', anchor: 'middle', weight: 700, halo: MK.paper });
  const shortArcEl = E('path', { d: mkArcD(Tp[0], Tp[1], 190, -90, -90 + 76.87), fill: 'none', stroke: '#E08A00', 'stroke-width': 4.5, 'stroke-linecap': 'round' }, drawG);
  mkDash(shortArcEl);
  const shortSeg = cbSeg(drawG, Tp[0], Tp[1], Xp[0], Xp[1], { col: '#E08A00', width: 5, dash: '14 9' });
  const lab75 = mkText(drawG, (Tp[0] + Xp[0]) / 2 + 12, (Tp[1] + Xp[1]) / 2 + 44, '**7.5 cm**', { size: 30, fill: '#B85C00', anchor: 'middle', halo: MK.paper });
  const legScale = mkText(drawG, 1052, 164, 'Scale {{1 cm}} : {{2 "m"}}', { size: 28, fill: BLUE, anchor: 'middle' });
  const legNew = mkText(drawG, 1056, 214, '**new North line**\nat the turn', { size: 28, fill: INK, anchor: 'middle', boldFill: '#B0123E' });
  const shortW = mkMath(drawG, 1052, 168, '7.5 × 2 = 15 "m"', { size: 36, fill: GREEN, anchor: 'middle' });
  const shortB = mkText(drawG, 1052, 222, 'bearing ≈ **077°**', { size: 30, fill: '#B85C00', anchor: 'middle' });
  const cTurn = mkChip(drawG, 'check: {{220° − 130° = 90°}}', { size: 26, col: '#B85C00', fill: '#FFFFFF' }); tr(cTurn, 960, 634);
  const runP = G(drawG), runK = G(drawG);
  E('circle', { r: 13, fill: '#FF6FA8', stroke: '#FFFFFF', 'stroke-width': 3.5 }, runP);
  E('circle', { r: 13, fill: '#2E7DD8', stroke: '#FFFFFF', 'stroke-width': 3.5 }, runK);
  const box = cbWaffles(drawG);
  const newN = E('rect', { x: Up[0] - 14, y: Up[1] - 150, width: 28, height: 150, rx: 10, fill: 'rgba(255,228,92,0.55)' }, drawG);
  drawG.insertBefore(newN, drawG.firstChild);
  // leg labels
  { const m1 = [(Tp[0] + Up[0]) / 2, (Tp[1] + Up[1]) / 2]; tr(lab6, m1[0] + 22, m1[1] + 26); }
  { const m2 = [(Up[0] + Xp[0]) / 2, (Up[1] + Xp[1]) / 2]; tr(lab45, m2[0] + 26, m2[1] - 26); }

  /* ---------- HUD ---------- */
  const LT = cbLowerThird(Lhud, 'shrink');
  const stamp = cbStamp(Lhud, true);
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* ---------- cuts ---------- */
  const k = id => at(id) - 0.06;
  const cB = k('shrink'), cC = k('scale'), cD = k('road'), cE = k('clue'), cF = k('legs');
  const ZAP1 = mid('shrink', 0.42), ZAP2 = mid('angles', 0.12);
  const RUN0 = mid('short', 0.08), RUN1 = mid('short', 0.7);

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    set.upd(t * AMP);
    const sA = on(t, -9, cB), sB = on(t, cB, cC), sC = on(t, cC, cD), sD = on(t, cD, cE), sE = on(t, cE, cF), sF = on(t, cF, 1e9);
    const who = scWho(S, t);

    /* ---------- the humans: where each one stands in this shot ---------- */
    const POS = sA ? { mum: 110, pri: 250, tan: 600, kav: 830, dad: 975, boy: 1110 }
      : sB ? { boy: 95, kav: 1085 }
      : sC ? { kav: 130, dad: 305 }
      : sD ? { mum: 130, pri: 300 }
      : sE ? { tan: 130, kav: 305 }
      : { kav: 130, boy: 300 };
    const H = { kav, dad, boy, mum, pri, tan };
    const jump = sF ? 34 * P(t, mid('short', 0.86), 0.3, pop) : 0;
    for (const key in H) { const x = POS[key]; op(H[key], x === undefined ? 0 : 1); if (x !== undefined) tr(H[key], x, HY[key] - (key === 'boy' ? jump : 0), HS[key]); }
    // who looks where: listeners look at the speaker (or at the card on the right)
    const lookAt = (x) => {
      const spk = { kavya: POS.kav, dad: POS.dad, boy: POS.boy, mum: POS.mum, priya: POS.pri, tan: POS.tan, shrink: sB ? 330 : 470, needle: 470, narr: undefined }[who];
      const tx = spk !== undefined && spk !== x ? spk : (sA ? 600 : 880);
      return clamp((tx - x) / 260, -0.9, 0.9);
    };
    const shock225 = t > mid('dad', 0.78) && t < at('rule');
    // Kavya
    { let m = 'neutral';
      if (sA) m = 'sad'; else if (sB) m = t > ZAP1 + 0.3 ? 'happy' : 'shock';
      else if (who === 'kavya') m = 'smug'; else if (who === 'dad') m = t > mid('dad', 0.78) ? 'deadpan' : 'neutral';
      else if (sF && t > RUN1) m = 'happy';
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: m, look: POS.kav !== undefined ? lookAt(POS.kav) : 0 }); }
    // Dad
    { let m = 'neutral', lift = 0;
      if (sA) m = 'sad';
      else if (who === 'dad') { m = 'smug'; lift = t > mid('dad', 0.6) ? 1 : 0; }
      else if (sC && t < at('rule')) m = 'sad';
      else if (sC) m = 'sad';
      dad.set({ t, talk: scTalk(S, t, 'dad'), mood: m, look: POS.dad !== undefined ? lookAt(POS.dad) : 0, lift, sweat: sA ? 1 : sC && t > at('moon') && t < at('rule') ? 1 : 0 }); }
    // Ah Boy
    { let m = 'happy', lift = 0;
      if (sA) { m = 'neutral'; }
      else if (sB) { m = t > ZAP1 ? 'happy' : 'shock'; lift = t > ZAP1 + 0.4 && t < ZAP1 + 2 ? 1 : 0; }
      else if (sF) { m = t > RUN1 ? 'happy' : 'neutral'; lift = t > mid('short', 0.86) ? 1 : 0; }
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: m, look: POS.boy !== undefined ? lookAt(POS.boy) : 0, lift }); }
    // Mum and Priya
    mum.set({ t, talk: scTalk(S, t, 'mum'), mood: sA ? 'neutral' : who === 'mum' ? 'smug' : 'happy', look: POS.mum !== undefined ? lookAt(POS.mum) : 0,
      lift: who === 'mum' ? 1 : 0 });
    pri.set({ t, talk: scTalk(S, t, 'priya'), mood: sA ? 'neutral' : 'smug', look: POS.pri !== undefined ? lookAt(POS.pri) : 0, lift: who === 'priya' ? 1 : 0 });
    // Mr Tan: the megaphone is swapped for the clue card in shot E
    op(tanCard, sE ? 1 : 0);
    if (tan.hand) op(tan.hand.firstChild, sE ? 0 : 1);
    tan.set({ t, talk: scTalk(S, t, 'tan'), mood: who === 'tan' ? 'happy' : 'neutral', look: POS.tan !== undefined ? lookAt(POS.tan) : 0, lift: sE && t < end('clue') ? 1 : 0 });

    /* ---------- props in the set ---------- */
    op(flag, sA); tr(flag, 720, 548, 0.8);
    op(bigTree, sB && t < ZAP2 ? 1 : 0);
    if (sB) {
      const z = P(t, ZAP1 + 0.15, 0.55, easeIn);
      op(bigTree, t < ZAP1 + 0.7 ? 1 - z * 0.2 : 0);
      tr(bigTree, 780, 540 - 70 * z, Math.max(0.01, 1 - 0.85 * z));
    }

    /* ---------- the cartoon cast ---------- */
    op(shrink, sA || sB || sC || sD ? 1 : 0);
    if (sA) {   // a very small scientist
      const p = P(t, mid('five', 0.62), 0.45, pop);
      op(shrink, clamp(p * 3));
      tr(shrink, 440, 540 - 114 * 0.32 + 30 * (1 - clamp(p)), Math.max(0.01, 0.32 * p));
      shrink.set({ t, talk: 0, mood: 'happy', look: 0.6 });
    } else if (sB) {
      tr(shrink, 330, 540 - 114 * 0.95, 0.95);
      const zap = Math.max(win(t, ZAP1, ZAP1 + 0.9, 0.12), win(t, ZAP2, ZAP2 + 0.9, 0.12));
      shrink.set({ t, talk: scTalk(S, t, 'shrink'), mood: 'happy', look: 0.6, zap });
    } else if (sC || sD) {
      tr(shrink, 470, 540 - 114 * 0.5, 0.5);
      const sh = sC && shock225;
      shrink.set({ t, talk: scTalk(S, t, 'shrink'), mood: sh ? (t < at('moon') ? 'shock' : 'annoyed') : 'happy', look: who === 'shrink' ? 0.6 : -0.7 });
    }
    op(needle, sF);
    if (sF) {
      tr(needle, 470, 540 - 138 * 0.5, 0.5);
      needle.set({ t, talk: scTalk(S, t, 'needle'), mood: t > mid('short', 0.8) ? 'happy' : 'smug', look: who === 'needle' ? 0.7 : -0.6, point: who === 'needle' && t < mid('legs', 0.25) ? 1 : 0 });
    }

    /* ---------- shot A chips ---------- */
    chipOn(cFive, t, at('five') + 0.15, cB, 880, 118);
    chipOn(cSmall, t, mid('five', 0.72), cB, 440, 300);

    /* ---------- shot B: zap the tree, zap the triangle ---------- */
    op(mini, sB && t >= ZAP1 + 0.55 && t < ZAP2 ? 1 : 0);
    if (sB && t >= ZAP1 + 0.55 && t < ZAP2) op(mini, P(t, ZAP1 + 0.45, 0.3, linear));
    chipOn(cEvery, t, mid('shrink', 0.62), at('angles'), 770, 150);
    op(triCard, sB && t >= at('angles') - 0.1 ? 1 : 0);
    if (sB && t >= at('angles') - 0.1) {
      const z = P(t, ZAP2 + 0.15, 0.6, ease);
      const V = TB.map((p, i) => [lerp(p[0], TS[i][0], z), lerp(p[1], TS[i][1], z)]);
      attr(triPath, 'd', mkPoly(V));
      const A = V[0], ar = lerp(54, 34, z);
      const a2 = Math.atan2(-(V[2][1] - A[1]), V[2][0] - A[0]) * 180 / Math.PI;   // 60
      attr(triArc, 'd', `M${A[0]},${A[1]} L${(A[0] + ar).toFixed(1)},${A[1]} A${ar},${ar} 0 0 0 ${(A[0] + ar * Math.cos(a2 * Math.PI / 180)).toFixed(1)},${(A[1] - ar * Math.sin(a2 * Math.PI / 180)).toFixed(1)} Z`);
      const lr = lerp(92, 66, z);
      tr(triAng, A[0] + lr * Math.cos(Math.PI / 6), A[1] - lr * Math.sin(Math.PI / 6) + 10);
      const pulse = t > ZAP2 + 0.8 && t < ZAP2 + 1.6 ? 1 + 0.18 * Math.sin((t - ZAP2 - 0.8) / 0.8 * Math.PI) : 1;
      triAng.setAttribute('transform', triAng.getAttribute('transform') + ` scale(${pulse.toFixed(3)})`);
      tr(triSide[0], (V[0][0] + V[1][0]) / 2, V[0][1] + 40); op(triSide[0], 1 - clamp(z * 2));
      tr(triSide[1], (V[0][0] + V[1][0]) / 2, V[0][1] + 40); op(triSide[1], clamp(z * 2 - 1));
    }
    chipOn(cStay, t, ZAP2 + 0.8, cC, 780, 150);
    chipOn(cBear, t, mid('angles', 0.62), cC, 780, 216);
    LT.set(sB ? win(t, at('shrink') + 0.1, at('shrink') + 3.6, 0.3) : 0);

    /* ---------- the big card ---------- */
    const cardOn = sC || sD || sE || sF;
    op(card, cardOn);
    op(plain, sC || sD || sE ? 1 : 0); op(sq, sF);
    op(hdr, sC && t < at('moon') || sD ? 1 : 0);
    op(mapG, sC && t < at('moon') ? 1 : 0);
    op(scaleG, sC && t < at('dad') ? 1 : 0);
    op(dadG, sC && t >= at('dad') - 0.1 && t < at('moon') ? 1 : 0);
    op(moonG, sC && t >= at('moon') - 0.1 && t < at('rule') ? 1 : 0);
    op(workMoon, sC && t >= at('moon') - 0.1 && t < at('rule') ? 1 : 0);
    op(ruleG, sC && t >= at('rule') - 0.1 ? 1 : 0);
    op(roadG, sD); op(clueG, sE); op(drawG, sF);
    if (sC) {
      if (t < at('dad')) {
        fadeOn(scaleG.firstChild, t, mid('scale', 0.3));
        cSame.set(P(t, mid('scale', 0.78), 0.4, linear));
        op(m9, 0); op(ruler9, 0.35);
      } else if (t < at('moon')) {
        op(m9, P(t, at('dad') + 0.3, 0.3, linear)); op(ruler9, 1);
        ruler9.set(9, 0);
        fadeOn(dadSum, t, mid('dad', 0.32));
        const kp = P(t, mid('dad', 0.72), 0.35, pop); op(dadKm, clamp(kp * 3));
        dadKm.setAttribute('transform', `translate(${(CM - 40 + dadSum.w / 2 + 12).toFixed(1)} 540) scale(${Math.max(0.01, 0.6 + 0.4 * kp).toFixed(3)}) translate(${-(CM - 40 + dadSum.w / 2 + 12)} -540)`);
      } else if (t < at('rule')) {
        const pp = P(t, mid('moon', 0.04), 0.5, easeOut);
        op(dadPin, pp); tr(dadPin, 0, -20 * (1 - pp));
        workMoon.show(0, P(t, mid('moon', 0.28), 0.35, linear));
        workMoon.show(1, P(t, mid('moon', 0.5), 0.35, linear));
        workMoon.show(2, P(t, mid('moon', 0.78), 0.35, linear));
        workMoon.ring(2, P(t, end('moon') - 0.3, 0.3, linear));
      } else {
        fadeOn(rr1, t, mid('rule', 0.04)); fadeOn(rr2, t, mid('rule', 0.3)); fadeOn(rBox, t, mid('rule', 0.62)); fadeOn(rSmall, t, mid('rule', 0.8));
      }
    }
    if (sD) {
      roadQ.set(t < mid('six', 0.66) ? P(t, mid('road', 0.55), 0.35, linear) : 0);
      workRoad.show(0, P(t, at('six') + 0.15, 0.35, linear));
      workRoad.show(1, P(t, mid('six', 0.42), 0.35, linear));
      workRoad.ring(1, P(t, mid('six', 0.7), 0.3, linear));
      const dr = P(t, mid('six', 0.66), 0.8, ease);
      roadLine.set(dr); op(roadEnds, dr > 0.98 ? 1 : 0); op(road6, P(t, mid('six', 0.66) + 0.8, 0.3, linear)); op(roadJet, dr > 0.98 ? 1 : 0);
      op(ruler6, dr > 0 ? 1 : 0); ruler6.set(0, 0);
    }
    if (sE) {
      op(cl1, P(t, mid('clue', 0.12), 0.3, linear)); op(cl2, P(t, mid('clue', 0.25), 0.3, linear));
      op(cl3, P(t, mid('clue', 0.55), 0.3, linear)); op(cl4, P(t, mid('clue', 0.8), 0.3, linear));
      workClue.show(0, P(t, at('cm') + 0.1, 0.35, linear)); workClue.show(1, P(t, mid('cm', 0.55), 0.35, linear));
    }
    if (sF) {
      const nT = P(t, at('legs') + 0.1, 0.4, linear), l1 = P(t, mid('legs', 0.18), 0.5, linear), a1 = P(t, mid('legs', 0.18), 0.5, linear), r1 = P(t, mid('legs', 0.3), 0.6, ease);
      b1.north.set(nT); b1.set(40, r1, a1); op(dT, 1); op(treeLab, 1);
      op(lab6, P(t, mid('legs', 0.36), 0.3, linear));
      const nU = P(t, mid('legs', 0.5), 0.5, linear);
      op(b2, r1 > 0.99 ? 1 : 0); op(dU, r1 > 0.99 ? 1 : 0);
      b2.north.set(nU); b2.set(130, P(t, mid('legs', 0.78), 0.6, ease), P(t, mid('legs', 0.7), 0.5, linear));
      op(newN, t > mid('legs', 0.5) ? 0.5 + 0.5 * Math.sin((t - mid('legs', 0.5)) * 5) : 0);
      op(lab45, P(t, mid('legs', 0.88), 0.3, linear));
      op(dX, t > mid('legs', 0.78) + 0.6 ? 1 : 0);
      op(legScale, t < at('short') ? 1 : 0); op(legNew, t > mid('legs', 0.5) && t < at('short') ? 1 : 0);
      rightU.set(1); op(rightU, t > at('short') ? 1 : 0);
      // the race: pink runs both legs, blue takes the shortcut, same speed
      const v = 300 / (RUN1 - RUN0);
      const dP = Math.max(0, (t - RUN0) * v), dK = Math.max(0, (t - RUN0) * v);
      const pp = dP < 240 ? bpt(Tp[0], Tp[1], 40, dP) : bpt(Up[0], Up[1], 130, Math.min(180, dP - 240));
      const kk = [lerp(Tp[0], Xp[0], Math.min(1, dK / 300)), lerp(Tp[1], Xp[1], Math.min(1, dK / 300))];
      const racing = t > RUN0 - 0.2 ? 1 : 0;
      op(runP, racing); op(runK, racing); tr(runP, pp[0], pp[1]); tr(runK, kk[0], kk[1]);
      shortSeg.set(P(t, RUN0, RUN1 - RUN0, linear));
      op(lab75, P(t, mid('short', 0.38), 0.3, linear));
      mkDraw(shortArcEl, P(t, mid('short', 0.62), 0.5, linear)); op(shortArcEl, t > mid('short', 0.62) ? 1 : 0);
      op(shortW, P(t, mid('short', 0.45), 0.3, linear)); op(shortB, P(t, mid('short', 0.66), 0.3, linear));
      cTurn.set(P(t, mid('short', 0.74), 0.4, linear));
      // the treasure box at X when Ah Boy gets there
      const bp = P(t, mid('short', 0.86), 0.45, pop);
      op(box, clamp(bp * 3)); tr(box, Xp[0] + 4, Xp[1] + 74, Math.max(0.01, 0.34 * bp)); box.set(0, 4);
      op(runK, racing && bp < 0.5 ? 1 : 0);
    }
    stamp.set(sF ? P(t, mid('short', 0.8), 0.35, linear) : 0); tr(stamp, 300, 236, 0.5);
  };
});
