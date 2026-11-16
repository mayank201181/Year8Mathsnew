/* Scene 3: Twenty-three thirty-five (time calculations).
   Changi, Gate C, night. Flip the departures board clacks onto LONDON 23:35 -> the 24-hour clock: from 1 pm add 12
   (a 12-hour | 24-hour table, a clock face at 11:35) -> Dad takes the clock times away: 2310 − 2245 = 65 minutes,
   curry puff time (rosette) -> Flip: an hour has 60 minutes, not 100! -> Kavya counts on along a number line:
   +15 min to 23:00, +10 min to 23:10: only 25 minutes -> Mum: RUN! (the family zips off, the curry puff hangs in the
   air) -> the cabin, night: flight 13 h 50 min, London 7 h behind -> 23:35 + 13 h = 12:35, + 50 min = 13:25 (next
   day, Singapore time) -> back 7 h: 06:25 in London -> Mum pushes up her eye mask: 23:50 to 07:20 via midnight,
   10 min + 7 h + 20 min = 7 h 30 min -> Ah Boy: are we there yet? Flip: 2.4 h. "Two hours forty." No! 0.4 × 60 = 24:
   2 h 24 min (decimal part × 60; the other way ÷ 60) -> 1 MINUTE LATER: "Are we there yet?" -> Flip, deadpan:
   two hours twenty-three minutes. */
scene('clock', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);          // hard sitcom cut
  const show = (el, t, t0, t1) => { const p = P(t, t0, 0.3, easeOut), q = t1 === undefined ? 1 : 1 - P(t, t1, 0.2, linear); op(el, Math.min(p, q)); tr(el, 0, 10 * (1 - p)); };
  const fade = (el, t, t0, d) => op(el, P(t, t0, d || 0.3, linear));
  const GOLD = '#FFE45C', INK = MK.ink, GREEN = '#1E9E5A', RED = '#C62828', BLUE = '#2E7DD8', MUTED = '#5A4A52', AMBER = '#E8A21C';
  const paper = (parent, x, y, w, h) => {
    E('rect', { x: x + 6, y: y + 6, width: w, height: h, rx: 16, fill: 'rgba(0,0,0,0.25)' }, parent);
    return E('rect', { x, y, width: w, height: h, rx: 16, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, parent);
  };
  const lookAt = (x, sx) => clamp((sx - x) / 260, -1, 1);
  // a potato curry puff, centred, about 76 wide
  function curryPuff(parent) {
    const g = G(parent);
    E('path', { d: 'M-38,10 Q-34,-40 0,-42 Q34,-40 38,10 Z', fill: '#E9A94E', stroke: '#8B5A1A', 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, g);
    let cr = ''; for (let i = 0; i < 9; i++) { const a = Math.PI * (0.06 + 0.88 * i / 8), x = -Math.cos(a) * 36, y = -Math.sin(a) * 40 + 8; cr += `M${x.toFixed(1)},${y.toFixed(1)} l${(-Math.cos(a) * 6).toFixed(1)},${(-Math.sin(a) * 6).toFixed(1)} `; }
    E('path', { d: cr, stroke: '#8B5A1A', 'stroke-width': 3, 'stroke-linecap': 'round' }, g);
    E('path', { d: 'M-18,-14 Q0,-24 16,-16', fill: 'none', stroke: '#FFE29A', 'stroke-width': 4, 'stroke-linecap': 'round', opacity: 0.8 }, g);
    return g;
  }
  // a clock face, centred, radius r, showing h:m
  function clockFace(parent, r, h, m) {
    const g = G(parent);
    E('circle', { r, fill: '#FFFFFF', stroke: '#3A4A58', 'stroke-width': 6 }, g);
    let tk = ''; for (let i = 0; i < 12; i++) { const a = i * TAU / 12; tk += `M${(Math.sin(a) * r * 0.78).toFixed(1)},${(-Math.cos(a) * r * 0.78).toFixed(1)} L${(Math.sin(a) * r * 0.9).toFixed(1)},${(-Math.cos(a) * r * 0.9).toFixed(1)} `; }
    E('path', { d: tk, stroke: '#3A4A58', 'stroke-width': 4 }, g);
    const ha = (h % 12 + m / 60) / 12 * TAU, ma = m / 60 * TAU;
    E('path', { d: `M0,0 L${(Math.sin(ha) * r * 0.5).toFixed(1)},${(-Math.cos(ha) * r * 0.5).toFixed(1)}`, stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
    E('path', { d: `M0,0 L${(Math.sin(ma) * r * 0.76).toFixed(1)},${(-Math.cos(ma) * r * 0.76).toFixed(1)}`, stroke: SC_INK, 'stroke-width': 5, 'stroke-linecap': 'round' }, g);
    E('circle', { r: 5, fill: RED }, g);
    return g;
  }
  // a yellow-on-black departures row
  function depRow(parent, x, y, w, left, right, s) {
    const g = G(parent);
    E('rect', { x: x - w / 2, y: y - s * 1.05, width: w, height: s * 1.5, rx: 10, fill: '#14161A', stroke: '#3A4250', 'stroke-width': 3 }, g);
    T(g, x - w / 2 + 22, y, left, { size: s, weight: 800, fill: '#FFD23F', ls: 2 });
    g.val = mkMath(g, x + w / 2 - 22, y, right, { size: s, anchor: 'end', fill: '#FFD23F', weight: 800 });
    return g;
  }

  /* layers */
  const Lbg = G(root), Lcast = G(root), Lfront = G(root), Ltop = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= A: the gate ================= */
  const gateShot = G(Lbg);
  const gate = lcAirport(gateShot, { front: 'rail', title: '', sign: 'Gate C  →' });
  const gateF = G(Lfront); gateF.appendChild(gate.front); gateF.appendChild(gate.top);
  const GX = 929;                                                   // centre of the right-hand card
  const gBoard = G(Lfg);
  paper(gBoard, 690, 345, 478, 339);
  // (flip) LONDON 23:35
  const bFlip = G(gBoard);
  T(bFlip, GX, 410, 'DEPARTURES', { size: 30, weight: 800, anchor: 'middle', fill: MUTED, ls: 4 });
  const dLon = depRow(bFlip, GX, 500, 420, 'LONDON', '"23:35"', 46);
  mkText(bFlip, GX, 600, 'Gate **C** · boarding now', { size: 30, anchor: 'middle', fill: INK, boldFill: BLUE });
  // (rule) the 24-hour clock
  const bRule = G(gBoard);
  const tab = mkTable(bRule, [['12-hour', '24-hour'], ['11:35 pm', '**23:35**'], ['3:15 pm', '15:15'], ['7:30 am', '07:30'], ['12:05 am', '00:05']],
    { size: 30, colW: 200, rowH: 50, ink: INK, fill: '#FFFFFF', headFill: '#DCEBF8' });
  tr(tab, GX - 200, 362);
  const tabHi = tab.mark(1, 1, 'rgba(255,228,92,0.55)');
  const cAdd12 = mkChip(bRule, 'from **1 pm**: **add 12**', { size: 30, col: BLUE, fill: '#EAF3FB' });
  tr(cAdd12, GX, 646);
  const face = clockFace(Lfg, 58, 11, 35); tr(face, 690, 205);
  const faceL = T(Lfg, 690, 300, '11:35 pm', { size: 28, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  faceL.setAttribute('stroke', '#14161A'); faceL.setAttribute('stroke-width', 6); faceL.setAttribute('paint-order', 'stroke');
  const bub23 = mkSpeechBubble(Lfg, '**23** o\'clock?', { size: 30, tail: 'down', fill: '#FFFFFF', ink: INK });
  tr(bub23, 470, 318);
  // (dad, sixty) take-away maths
  const bDad = G(gBoard);
  mkText(bDad, GX, 400, 'now **22:45** · gate shuts **23:10**', { size: 30, anchor: 'middle', fill: INK, boldFill: BLUE });
  T(bDad, GX, 470, "Dad's maths:", { size: 28, weight: 700, anchor: 'middle', fill: MUTED });
  const dMath = mkMath(bDad, GX, 546, '2310 − 2245 = 65', { size: 50, anchor: 'middle', fill: RED, weight: 800 });
  const dStrike = strike(bDad, GX - dMath.w / 2 - 10, 530, GX + dMath.w / 2 + 10, INK);
  const dPuff = mkText(bDad, GX, 620, '**65 minutes**: curry puff time!', { size: 30, anchor: 'middle', fill: RED });
  const c60 = mkChip(bDad, '1 hour = **60** min, not 100', { size: 32, col: RED, fill: '#FFF0F2' });
  tr(c60, GX, 630);
  // (count) count on
  const bCount = G(gBoard);
  mkText(bCount, GX, 400, '**count on** from 22:45', { size: 32, anchor: 'middle', fill: INK, boldFill: GREEN });
  const NL0 = GX - 190;
  const nl = mkNumberLine(bCount, { from: 0, to: 25, step: 5, len: 380, ink: INK, size: 28, arrows: false,
    labels: [[0, '"22:45"'], [15, '"23:00"'], [25, '"23:10"']],
    hops: [{ a: 0, b: 15, label: '**+15 min**', col: AMBER, height: 66 }, { a: 15, b: 25, label: '**+10 min**', col: BLUE, height: 58 }] });
  tr(nl, NL0, 548);
  const cTot = mkChip(bCount, 'only **25 min**!', { size: 34, col: GREEN, fill: '#E6F6EC' });
  tr(cTot, GX, 646);
  // (run) speed lines
  const speedL = G(Lfg);
  for (let i = 0; i < 7; i++) E('path', { d: `M${40 + (i % 3) * 60},${340 + i * 26} h${300 + (i % 2) * 140}`, stroke: '#FFFFFF', 'stroke-width': 6, 'stroke-linecap': 'round', opacity: 0.7 }, speedL);
  const freePuff = curryPuff(Lfg);

  /* ================= B: the cabin, night ================= */
  const cabShot = G(Lbg);
  const cab = lcCabin(cabShot, { day: false });
  const cabF = G(Lfront); cabF.appendChild(cab.front); cabF.appendChild(cab.top);
  const CX = 929;
  const cBoard = G(Lfg);
  paper(cBoard, 690, 250, 478, 434);
  // (board) the flight
  const bBoard = G(cBoard);
  const cFl = mkChip(bBoard, 'flight: **13 h 50 min**', { size: 34, col: BLUE, fill: '#EAF3FB' }); tr(cFl, CX, 320);
  const cBh = mkChip(bBoard, 'London: **7 h behind** (in June)', { size: 30, col: RED, fill: '#FFF0F2' }); tr(cBh, CX, 410);
  const route = G(bBoard);
  E('path', { d: `M${CX - 170},560 Q${CX},470 ${CX + 170},560`, fill: 'none', stroke: '#8FA3B8', 'stroke-width': 4, 'stroke-dasharray': '10 9' }, route);
  [[CX - 170, 'SIN'], [CX + 170, 'LHR']].forEach(([x, l]) => { E('circle', { cx: x, cy: 560, r: 9, fill: GOLD, stroke: INK, 'stroke-width': 3 }, route); T(route, x, 606, l, { size: 30, weight: 800, anchor: 'middle', fill: INK }); });
  const plane = G(route);
  E('path', { d: 'M18,0 L-14,-6 L-22,-22 L-28,-22 L-24,-4 L-30,-2 L-34,-10 L-38,-10 L-36,0 L-38,10 L-34,10 L-30,2 L-24,4 L-28,22 L-22,22 L-14,6 Z', fill: '#FFFFFF', stroke: INK, 'stroke-width': 2.5 }, plane);
  // (add, back) Singapore time, then London
  const bAdd = G(cBoard);
  mkText(bAdd, CX, 300, 'in **Singapore** time:', { size: 30, anchor: 'middle', fill: MUTED, boldFill: BLUE });
  const addW = mkWorking(bAdd, 1000, 324, ['"23:35" + 13 "h" = "12:35"', { m: '"12:35" + 50 "min" = "13:25"', col: INK }], { size: 36, fill: INK, gap: 20 });
  const cNext = mkChip(bAdd, '**next day**', { size: 28, col: AMBER, fill: '#FFF6DC' }); tr(cNext, CX + 160, 470);
  const bBack = G(bAdd);
  E('line', { x1: 720, y1: 506, x2: 1138, y2: 506, stroke: '#C9D3DC', 'stroke-width': 3 }, bBack);
  mkText(bBack, CX, 548, 'London: back **7 h**', { size: 30, anchor: 'middle', fill: MUTED, boldFill: RED });
  const backM = mkMath(bBack, CX - 30, 616, '"13:25" − 7 "h" = "06:25"', { size: 40, anchor: 'middle', fill: GREEN, weight: 800 });
  const sunG = G(bBack); tr(sunG, CX - 30 + backM.w / 2 + 52, 604);
  E('path', { d: 'M-30,8 A30,30 0 0 1 30,8 Z', fill: '#FFC247', stroke: '#E8751A', 'stroke-width': 3 }, sunG);
  E('path', { d: 'M0,-34 V-44 M-26,-24 L-33,-31 M26,-24 L33,-31 M-38,8 H38', stroke: '#E8751A', 'stroke-width': 4, 'stroke-linecap': 'round' }, sunG);
  // (sleep) Mum, via midnight
  const bSleep = G(cBoard);
  mkText(bSleep, CX, 306, 'Mum slept **23:50** → **07:20**', { size: 32, anchor: 'middle', fill: INK, boldFill: BERRY_C() });
  const sl = mkNumberLine(bSleep, { from: 0, to: 3, step: 1, len: 390, ink: INK, size: 28, arrows: false,
    labels: [[0, '"23:50"'], [1, '"00:00"'], [2, '"07:00"'], [3, '"07:20"']],
    hops: [{ a: 0, b: 1, label: '**+10 min**', col: AMBER, height: 58 }, { a: 1, b: 2, label: '**+7 h**', col: BLUE, height: 58 }, { a: 2, b: 3, label: '**+20 min**', col: GREEN, height: 58 }] });
  tr(sl, CX - 195, 462);
  const moon = G(bSleep); tr(moon, CX - 195 + 130, 548);
  E('path', { d: 'M8,-16 A17,17 0 1 0 8,16 A13,13 0 1 1 8,-16 Z', fill: '#FFD23F', stroke: '#8B6B1A', 'stroke-width': 2.5 }, moon);
  T(moon, 18, 9, 'midnight', { size: 26, weight: 700, fill: MUTED });
  const cSlept = mkChip(bSleep, '= **7 h 30 min**', { size: 36, col: GREEN, fill: '#E6F6EC' }); tr(cSlept, CX, 628);
  // (left, forty, dec) 2.4 h
  const bDec = G(cBoard);
  const dTime = depRow(bDec, CX, 318, 430, 'LONDON', '2.4 "h"', 44);
  const fortyM = mkMath(bDec, CX, 396, '2 "h" 40 "min" ?', { size: 40, anchor: 'middle', fill: RED, weight: 800 });
  const fortyS = strike(bDec, CX - fortyM.w / 2 - 8, 382, CX + fortyM.w / 2 + 8, INK);
  const decW = mkWorking(bDec, 802, 418, ['0.4 "h" = 0.4 × 60 = 24 "min"', { m: '2.4 "h" = 2 "h" 24 "min"', col: GREEN }], { size: 36, fill: INK, gap: 16 });
  const cDec = mkChip(bDec, 'decimal part **× 60**', { size: 28, col: BLUE, fill: '#EAF3FB' }); tr(cDec, CX, 552);
  const mini = mkTable(bDec, [['min', '15', '30', '45'], ['h', '0.25', '0.5', '0.75']], { size: 26, colW: [80, 92, 92, 92], rowH: 44, ink: INK, head: false, side: true, fill: '#FFFFFF', headFill: '#DCEBF8' });
  tr(mini, 708, 590);
  const cDiv = mkChip(bDec, '**÷ 60**', { size: 28, col: AMBER, fill: '#FFF6DC' }); tr(cDiv, 1118, 634);
  // (again) one minute later
  const later = G(Lhud);
  E('rect', { x: 260, y: 130, width: 540, height: 86, rx: 14, fill: '#14161A', stroke: GOLD, 'stroke-width': 5 }, later);
  T(later, 530, 188, '1 MINUTE LATER', { size: 46, weight: 800, anchor: 'middle', fill: GOLD, ls: 4 });

  /* ================= C: Flip's confessional ================= */
  const conf = lcConf(Lbg, 'flip');
  const cNow = mkChip(Lfg, '**2 h 23 min** to go', { size: 46, col: GOLD, solid: true });

  /* ================= the cast ================= */
  const kav = cast(Lcast, 'kavya');
  const dad = cast(Lcast, 'dad', { prop: null, hand: true });
  const mum = cast(Lcast, 'mum', { prop: null });
  const boy = cast(Lcast, 'boy');
  const puff = curryPuff(dad.hand); tr(puff, 0, -10);
  // Dad's blanket (the cabin): blue tartan over his shoulders
  const blanket = G(Lcast);
  E('path', { d: 'M-118,150 L-112,70 Q-100,26 -40,30 Q0,48 40,30 Q100,26 112,70 L118,150 Z', fill: '#2E4C8C', stroke: '#14224A', 'stroke-width': 4, 'stroke-linejoin': 'round' }, blanket);
  E('path', { d: 'M-80,34 V150 M-30,40 V150 M20,40 V150 M70,32 V150 M-112,80 H112 M-116,120 H116', stroke: '#E8424F', 'stroke-width': 4, opacity: 0.8 }, blanket);
  E('path', { d: 'M-56,36 V150 M46,36 V150 M-114,100 H114', stroke: '#FFC247', 'stroke-width': 2.5, opacity: 0.8 }, blanket);
  const brr = T(Lcast, 0, 0, 'brrr', { size: 28, weight: 800, fill: '#7FD3FF' });
  brr.setAttribute('stroke', '#14224A'); brr.setAttribute('stroke-width', 5); brr.setAttribute('paint-order', 'stroke');
  // Mum's eye mask (down = asleep, up = on her forehead)
  const mask = G(mum.firstChild);
  E('path', { d: 'M-76,-36 Q0,-46 76,-36', fill: 'none', stroke: '#3A2A6E', 'stroke-width': 7 }, mask);
  E('path', { d: 'M-58,-50 Q-30,-58 0,-48 Q30,-58 58,-50 Q66,-30 52,-16 Q26,-10 0,-20 Q-26,-10 -52,-16 Q-66,-30 -58,-50 Z', fill: '#6B4FB8', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, mask);
  E('path', { d: 'M-38,-34 Q-26,-26 -14,-34 M14,-34 Q26,-26 38,-34', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 3, 'stroke-linecap': 'round' }, mask);
  const flip = cast(Ltop, 'flip');
  const rosette = lcRosette(Lfg);
  const ltFlip = lcLowerThird(Lhud, 'flip');

  /* cut points and positions */
  const cB = at('board') - 0.06, cC = at('now') - 0.06;
  const Y = 455, YC = 462, SC = 0.72, KX = 82, DX = 205, MX = 330, BYX = 452;
  const FX = 920, FY = 215, FS = 0.75, FCX = 930, FCY = 150, FCS = 0.5;
  // Flip's display: [start, text]; the tiles shuffle for 0.6 s after each change
  const FLIPS = [[at('flip'), '23:35'], [at('sixty'), '60 MIN'], [at('count'), '22:45'], [mid('count', 0.32), '23:00'], [mid('count', 0.62), '23:10'],
    [at('run') - 0.1, 'BOARDING'], [cB, 'LHR'], [mid('add', 0.55), '13:25'], [at('back'), '06:25'], [at('left'), '2.4 H'], [mid('dec', 0.6), '2H 24MIN'], [cC, '2H 23MIN']];
  const flipState = t => { let k = 0; for (let i = 0; i < FLIPS.length; i++) if (t >= FLIPS[i][0]) k = i; return { text: FLIPS[k][1], flap: P(t, FLIPS[k][0], 0.6, linear) }; };
  function BERRY_C() { return '#B8336A'; }

  return t => {
    const sA = on(t, -1, cB), sB = on(t, cB, cC), sC = on(t, cC, 1e9);
    const who = scWho(S, t);
    op(gateShot, sA); op(gateF, sA); op(gBoard, sA * (1 - P(t, at('run'), 0.2, linear)));
    op(cabShot, sB); op(cabF, sB); op(cBoard, sB);
    conf.set(sC, t);
    op(Lcast, sC ? 0 : 1);
    ltFlip.set(win(t, at('flip') + 0.1, at('flip') + 3.2, 0.3));
    rosette.set(0, 0);
    [face, faceL, speedL, freePuff, later].forEach(e => op(e, 0));
    bub23.set(0); cNow.set(0);
    op(blanket, 0); op(brr, 0);

    /* ---------- Flip ---------- */
    const fs = flipState(t);
    let fx = FX, fy = FY, fsc = FS;
    if (sB) { fx = FCX; fy = FCY; fsc = FCS; }
    if (sC) { fx = 330; fy = 410; fsc = 1.25; }
    const sx0 = { flip: fx, kavya: KX, dad: DX, mum: MX, boy: BYX }[who];
    const sx = sx0 !== undefined ? sx0 : 900;
    let fm = 'happy';
    if (t >= at('sixty') && t < at('count')) fm = 'annoyed';
    else if (t >= at('run') && t < cB) fm = 'shock';
    else if (t >= at('forty') && t < at('dec')) fm = 'shock';
    else if (t >= at('dec') && t < mid('dec', 0.5)) fm = 'annoyed';
    else if (t >= at('again')) fm = 'deadpan';
    else if (who === 'dad') fm = 'neutral';
    tr(flip, fx, fy + (sC ? 6 * P(t, cC, 2.5, linear) : 0), fsc * (sC ? 1 + 0.05 * P(t, cC, 2.5, linear) : 1));
    flip.set({ t, talk: scTalk(S, t, 'flip'), mood: fm, look: who === 'flip' ? (sC ? 0.3 : -0.6) : sC ? 0.3 : lookAt(fx, sx) * 0.8, text: fs.text, flap: fs.flap });

    /* ---------- A: the gate ---------- */
    if (sA) {
      const beat = (el, a, b) => show(el, t, a, b);
      beat(bFlip, at('flip') + 0.4, at('rule') - 0.1);
      op(dLon.val, P(t, at('flip') + 1.0, 0.3, linear));
      beat(bRule, at('rule'), at('dad') - 0.1);
      tab.cells.forEach((row, i) => row.forEach(c => op(c, i === 0 ? 1 : P(t, mid('rule', 0.12 + 0.13 * i), 0.25, linear))));
      tabHi.set(P(t, mid('rule', 0.2), 0.3, linear));
      cAdd12.set(P(t, mid('rule', 0.32), 0.4, linear));
      if (t >= at('rule') && t < at('dad') - 0.1) { op(face, P(t, mid('rule', 0.28), 0.3, linear)); op(faceL, P(t, mid('rule', 0.28), 0.3, linear)); }
      if (t >= at('rule') && t < mid('rule', 0.55)) bub23.set(P(t, at('rule') + 0.1, 0.4, linear));
      beat(bDad, at('dad'), at('count') - 0.1);
      op(dMath, P(t, mid('dad', 0.4), 0.3, linear));
      op(dPuff, P(t, mid('dad', 0.72), 0.3, linear) * (1 - P(t, at('sixty'), 0.2, linear)));
      dStrike.set(P(t, at('sixty') + 0.2, 0.35, linear));
      c60.set(P(t, mid('sixty', 0.3), 0.4, linear));
      beat(bCount, at('count'), at('run'));
      nl.hop(0, P(t, mid('count', 0.08), 0.6, ease)); nl.hop(1, P(t, mid('count', 0.42), 0.6, ease));
      cTot.set(P(t, mid('count', 0.72), 0.4, linear));

      // the family behind the rail; on "RUN!" they zip off to the right
      const zip = P(t, at('run') + 0.1, 0.45, easeIn), dx = 1500 * zip;
      if (zip > 0 && zip < 1) { op(speedL, 1); tr(speedL, 600 * zip - 60, 0); }
      const lk = x => (who === 'flip' || who === '' ? lookAt(x, FX) : lookAt(x, sx));
      // Kavya
      let km = 'neutral';
      if (who === 'kavya') km = t > mid('count', 0.6) ? 'smug' : 'annoyed';
      else if (t >= mid('dad', 0.5) && t < at('sixty')) km = 'annoyed';
      else if (t >= at('sixty') && t < at('count')) km = 'deadpan';
      else if (t >= at('run')) km = 'shock';
      tr(kav, KX + dx, Y, SC);
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: who === 'kavya' ? 1 : lk(KX) });
      // Dad: the curry puff, the rosette
      let dm = 'neutral';
      if (who === 'dad') dm = 'smug';
      else if (t >= at('sixty') && t < at('count')) dm = 'shock';
      else if (t >= at('count') && t < at('run')) dm = t > mid('count', 0.75) ? 'shock' : 'sad';
      else if (t >= at('run')) dm = 'shock';
      const puffOn = t >= mid('dad', 0.78) && t < at('run');
      const lift = puffOn ? P(t, mid('dad', 0.78), 0.3, easeOut) : 0;
      tr(dad, DX + dx, Y, SC);
      dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: who === 'dad' ? 0.9 : lk(DX), lift });
      op(puff, puffOn ? 1 : 0);
      if (t >= mid('dad', 0.45) && t < at('count') + 0.8) rosette.set(P(t, mid('dad', 0.45), 0.4, linear), P(t, at('sixty') + 0.1, 0.8, easeIn));
      tr(rosette, DX + 30 + dx, Y + 72, 0.5);
      if (t >= at('run')) { op(freePuff, 1); const bob = Math.sin(t * 6) * 3 * AMP; tr(freePuff, DX - 50, Y + 20 + bob, 1.0, -16); }
      // Mum
      let mm = 'neutral';
      if (who === 'mum') mm = 'shock';
      else if (who === 'dad') mm = t > mid('dad', 0.6) ? 'deadpan' : 'neutral';
      else if (t >= at('count') && t < at('run')) mm = t > mid('count', 0.7) ? 'shock' : 'neutral';
      tr(mum, MX + dx, Y, SC);
      mum.set({ t, talk: scTalk(S, t, 'mum'), mood: mm, look: who === 'mum' ? 0.4 : lk(MX), lift: 0 });
      // Ah Boy: puzzled at "23"
      let bm = 'happy';
      if (t >= at('rule') && t < mid('rule', 0.6)) bm = 'shock';
      else if (t >= at('run')) bm = 'happy';
      tr(boy, BYX + dx, Y, SC);
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: bm, look: lk(BYX), lift: t >= at('rule') && t < mid('rule', 0.55) ? 1 : 0 });
    }

    /* ---------- B: the cabin, night ---------- */
    if (sB) {
      const beat = (el, a, b) => show(el, t, a, b);
      beat(bBoard, cB + 0.1, at('add') - 0.1);
      cFl.set(P(t, mid('board', 0.1), 0.4, linear)); cBh.set(P(t, mid('board', 0.5), 0.4, linear));
      fade(route, t, mid('board', 0.25));
      const pp = P(t, cB, 6, linear), bx = CX - 170 + 340 * pp * 0.35, by = 560 - 90 * Math.sin(pp * 0.35 * Math.PI) * 1.0;
      tr(plane, bx, by, 1, -18 + 36 * pp * 0.35);
      beat(bAdd, at('add'), at('sleep') - 0.1);
      addW.show(0, P(t, mid('add', 0.08), 0.3, linear)); addW.show(1, P(t, mid('add', 0.45), 0.3, linear));
      addW.ring(1, P(t, mid('add', 0.7), 0.3, linear));
      cNext.set(P(t, mid('add', 0.78), 0.4, linear));
      op(bBack, P(t, at('back') + 0.05, 0.3, linear));
      op(backM, P(t, mid('back', 0.25), 0.3, linear)); op(sunG, P(t, mid('back', 0.6), 0.3, linear));
      beat(bSleep, at('sleep'), at('left') - 0.1);
      sl.hop(0, P(t, mid('sleep', 0.32), 0.5, ease)); sl.hop(1, P(t, mid('sleep', 0.5), 0.5, ease)); sl.hop(2, P(t, mid('sleep', 0.64), 0.5, ease));
      op(moon, P(t, mid('sleep', 0.36), 0.3, linear));
      cSlept.set(P(t, mid('sleep', 0.8), 0.4, linear));
      beat(bDec, at('left'), cC);
      op(dTime.val, P(t, at('left') + 0.5, 0.3, linear));
      op(fortyM, P(t, mid('forty', 0.25), 0.3, linear)); fortyS.set(P(t, at('dec') + 0.1, 0.3, linear));
      decW.show(0, P(t, mid('dec', 0.12), 0.3, linear)); decW.show(1, P(t, mid('dec', 0.55), 0.3, linear));
      decW.ring(1, P(t, mid('dec', 0.72), 0.3, linear));
      cDec.set(P(t, mid('dec', 0.3), 0.4, linear));
      op(mini, P(t, mid('dec', 0.85), 0.3, linear)); cDiv.set(P(t, mid('dec', 0.9), 0.4, linear));
      if (t >= at('again') - 0.1) { const lp = P(t, at('again') - 0.1, 0.3, pop); op(later, clamp(lp * 3)); later.setAttribute('transform', `translate(530 173) scale(${Math.max(0.01, 0.7 + 0.3 * lp).toFixed(3)}) translate(-530 -173)`); }

      // the family in their row
      // Kavya
      let km = 'neutral';
      if (who === 'kavya') km = 'smug';
      else if (who === 'boy') km = t >= at('again') ? 'deadpan' : 'neutral';
      else if (t >= at('dec') && t < at('again')) km = 'happy';
      tr(kav, KX, YC, SC);
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: who === 'kavya' ? 1 : lookAt(KX, sx) });
      // Dad: cold, under the blanket, shivering
      const sh = Math.sin(t * 47) * 2.2 * AMP;
      tr(dad, DX + sh, YC, SC);
      dad.set({ t, talk: 0, mood: who === 'boy' ? 'deadpan' : 'sad', look: lookAt(DX, sx), lift: 0 });
      op(puff, 0);
      op(blanket, 1); tr(blanket, DX + sh, YC, SC);
      const bw = (t % 3.2) < 1.2; op(brr, bw ? 1 : 0); tr(brr, DX - 70, YC - 128 - 6 * Math.sin(t * 4));
      // Mum: eye mask down (asleep) until her line, then up on her forehead
      const up = P(t, at('sleep') - 0.2, 0.35, easeOut);
      tr(mask, 0, -44 * up);
      let mm = up < 0.5 ? 'deadpan' : 'neutral';
      if (who === 'mum') mm = t > mid('sleep', 0.75) ? 'smug' : 'neutral';
      else if (up >= 0.5 && who === 'boy') mm = t >= at('again') ? 'annoyed' : 'deadpan';
      tr(mum, MX, YC, SC);
      mum.set({ t, talk: scTalk(S, t, 'mum'), mood: mm, look: up < 0.5 ? 0 : who === 'mum' ? 0.9 : lookAt(MX, sx) });
      // Ah Boy
      let bm = 'happy';
      if (t >= at('dec') && t < at('again')) bm = 'shock';
      tr(boy, BYX, YC, SC);
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: bm, look: who === 'boy' ? 0.9 : lookAt(BYX, sx), lift: who === 'boy' ? 1 : 0 });
    }
    op(mask, sB);

    /* ---------- C: Flip, deadpan ---------- */
    if (sC) {
      cNow.set(P(t, mid('now', 0.35), 0.4, linear));
      tr(cNow, 850, 400);
    }
  };
});
