/* Scene 4: Nine hundred kilometres an hour (speed, distance & time).
   The cabin, day. The seat-back flight map: 900 km/h, 2160 km to go, 2.4 h -> Trish the DST triangle pops up on the
   tray table: D on top, S and T below -> cover T: T = D ÷ S = 2160 ÷ 900 = 2.4 h -> cover S: speed = distance ÷ time;
   cover D: distance = speed × time -> Dad: takeoff 150 km in 20 min, 150 ÷ 20 = 7.5 km/h, slower than a bicycle
   (rosette) -> MEANWHILE, ON MARS (spacecraft 4) -> units must match: 20 min = 1/3 h -> 150 ÷ 1/3 = 450 km/h, a very
   fast bicycle -> Ah Boy: metres per second? -> 1 km = 1000 m, 1 h = 3600 s, so ÷ 3.6 -> 900 ÷ 3.6 = 250 m/s (two and
   a half football pitches every second) -> Ah Boy runs 5 m/s × 3.6 = 18 km/h -> Mum: not in the aisle. */
scene('speed', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);          // hard sitcom cut
  const show = (el, t, t0, t1) => { const p = P(t, t0, 0.3, easeOut), q = t1 === undefined ? 1 : 1 - P(t, t1, 0.2, linear); op(el, Math.min(p, q)); tr(el, 0, 10 * (1 - p)); };
  const GOLD = '#FFE45C', INK = MK.ink, GREEN = '#1E9E5A', RED = '#C62828', BLUE = '#2E7DD8', BERRY = '#B8336A', MUTED = '#5A4A52', CORAL = '#E8475B';
  const paper = (parent, x, y, w, h) => {
    E('rect', { x: x + 6, y: y + 6, width: w, height: h, rx: 16, fill: 'rgba(0,0,0,0.25)' }, parent);
    return E('rect', { x, y, width: w, height: h, rx: 16, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, parent);
  };
  const lookAt = (x, sx) => clamp((sx - x) / 260, -1, 1);
  // a bicycle, centred on (0,0), about 120 wide; o.jet adds a jet engine
  function spBike(parent, jet) {
    const g = G(parent);
    if (jet) {
      E('path', { d: 'M-70,-46 Q-130,-36 -150,-46 Q-130,-56 -70,-46 Z', fill: '#FF8A3D', stroke: '#FFE45C', 'stroke-width': 3 }, g);
      E('rect', { x: -78, y: -62, width: 64, height: 32, rx: 14, fill: '#8F9CAB', stroke: SC_INK, 'stroke-width': 3 }, g);
    }
    [-40, 40].forEach(x => { E('circle', { cx: x, cy: 0, r: 28, fill: 'none', stroke: SC_INK, 'stroke-width': 5 }, g); E('circle', { cx: x, cy: 0, r: 4, fill: SC_INK }, g); });
    E('path', { d: 'M-40,0 L-10,-36 L28,-36 L40,0 M-10,-36 L4,0 L28,-36 M-14,-46 L-2,-46 M24,-36 L20,-52 L34,-54', fill: 'none', stroke: jet ? '#2E7DD8' : '#E8424F', 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
    return g;
  }
  // a football pitch from above, w x h, top-left origin
  function spPitch(parent, x, w, h) {
    const g = G(parent); tr(g, x, 0);
    E('rect', { x: 0, y: 0, width: w, height: h, fill: '#4CAF50', stroke: '#FFFFFF', 'stroke-width': 2.5 }, g);
    E('path', { d: `M${w / 2},0 V${h} M0,${h * 0.3} h${w * 0.14} v${h * 0.4} h${-w * 0.14} M${w},${h * 0.3} h${-w * 0.14} v${h * 0.4} h${w * 0.14}`, fill: 'none', stroke: '#FFFFFF', 'stroke-width': 2.5 }, g);
    E('circle', { cx: w / 2, cy: h / 2, r: h * 0.16, fill: 'none', stroke: '#FFFFFF', 'stroke-width': 2.5 }, g);
    return g;
  }

  /* layers */
  const Lbg = G(root), Lcast = G(root), Lfront = G(root), Ltop = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= the cabin, day ================= */
  const cabShot = G(Lbg);
  const cab = lcCabin(cabShot, { day: true });
  const cabF = G(Lfront); cabF.appendChild(cab.front); cabF.appendChild(cab.top);

  /* the seat-back screen: the flight map and its readouts (map) */
  const screen = G(Lfg), SCX = 930;
  const fmap = lcFlightMap(screen, { p: 0.72, rows: [] }); tr(fmap, SCX, 262, 0.8);
  const rd = G(screen);
  E('rect', { x: 690, y: 420, width: 480, height: 204, rx: 16, fill: '#14161A' }, rd);
  E('rect', { x: 702, y: 432, width: 456, height: 180, rx: 8, fill: linGrad('#0E2A4A', '#1E4E7A', true) }, rd);
  const RD = [['Ground speed', '900 "km/h"'], ['Distance to go', '2160 km'], ['Time to go', '2.4 "h"']].map(([l, v], i) => {
    const y = 476 + i * 56;
    T(rd, 722, y, l, { size: 28, weight: 600, fill: '#C9DCE8', font: FB });
    return mkMath(rd, 1140, y + 2, v, { size: 34, anchor: 'end', fill: '#FFFFFF', weight: 800 });
  });
  const rdQ = T(rd, 868, 591, '?', { size: 40, weight: 800, fill: GOLD });
  const rdHi = E('rect', { x: 706, y: 544, width: 448, height: 54, rx: 8, fill: 'none', stroke: GOLD, 'stroke-width': 4 }, rd);

  /* the board (trish onwards) */
  const board = G(Lfg), BX = 930;
  paper(board, 690, 108, 478, 574);
  // (trish) the letters
  const bTri = G(board);
  mkText(bTri, BX, 172, 'the **DST** triangle', { size: 36, anchor: 'middle', fill: INK, boldFill: CORAL });
  const triRows = [['**D**istance', 'on top'], ['**S**peed', 'below, left'], ['**T**ime', 'below, right']].map(([a, b], i) => {
    const g = G(bTri), y = 262 + i * 84;
    E('rect', { x: 724, y: y - 46, width: 410, height: 66, rx: 12, fill: i ? '#FFF0F2' : '#FFE3E7' }, g);
    mkText(g, 746, y, a, { size: 40, fill: INK, boldFill: CORAL });
    mkText(g, 1112, y, b, { size: 28, anchor: 'end', fill: MUTED });
    return g;
  });
  const triNote = mkText(bTri, BX, 560, 'cover the one you **want**', { size: 32, anchor: 'middle', fill: INK, boldFill: CORAL });
  // (time) T = D ÷ S
  const bTime = G(board);
  mkText(bTime, BX, 168, 'cover **T**', { size: 34, anchor: 'middle', fill: INK, boldFill: CORAL });
  const timeW = mkWorking(bTime, 860, 220, ['T = D ÷ S', '= 2160 ÷ 900', { m: '= 2.4 "h"', col: GREEN }], { size: 50, fill: INK, gap: 26 });
  // (speed) the other two
  const bSpd = G(board);
  const spdA = G(bSpd);
  mkText(spdA, BX, 168, 'cover **S**', { size: 34, anchor: 'middle', fill: INK, boldFill: CORAL });
  mkMath(spdA, BX, 250, 'S = D ÷ T', { size: 52, anchor: 'middle', fill: INK, weight: 700 });
  mkText(spdA, BX, 302, '**speed** = distance ÷ time', { size: 30, anchor: 'middle', fill: MUTED, boldFill: CORAL });
  const spdB = G(bSpd);
  mkText(spdB, BX, 374, 'cover **D**', { size: 34, anchor: 'middle', fill: INK, boldFill: CORAL });
  mkMath(spdB, BX, 456, 'D = S × T', { size: 52, anchor: 'middle', fill: INK, weight: 700 });
  mkText(spdB, BX, 508, '**distance** = speed × time', { size: 30, anchor: 'middle', fill: MUTED, boldFill: CORAL });
  const cPer = mkChip(bSpd, '{{"km/h"}} = km **per** hour: **per** means ÷', { size: 26, col: BLUE, fill: '#EAF3FB' });
  tr(cPer, BX, 610);
  // (dad) 7.5 km/h
  const bDad = G(board);
  mkText(bDad, BX, 172, '**Takeoff:** 150 km in 20 minutes', { size: 30, anchor: 'middle', fill: INK, boldFill: BLUE });
  T(bDad, BX, 262, "Dad's maths:", { size: 30, weight: 700, anchor: 'middle', fill: MUTED });
  mkMath(bDad, BX, 342, '150 ÷ 20 = 7.5 "km/h"', { size: 46, anchor: 'middle', fill: RED, weight: 700 });
  const dBike = spBike(bDad); tr(dBike, BX - 80, 480, 1.2);
  const dSlow = mkText(bDad, BX + 70, 474, 'slower than\na **bicycle**?', { size: 30, anchor: 'start', fill: RED });
  // (match, fix) hours, not minutes
  const bFix = G(board);
  const cMatch = mkChip(bFix, '**units must match!**', { size: 32, col: CORAL, fill: '#FFF0F2' });
  tr(cMatch, BX, 162);
  const matchSub = mkText(bFix, BX, 222, '**hours**, not minutes', { size: 30, anchor: 'middle', fill: MUTED, boldFill: CORAL });
  const matchW = mkWorking(bFix, 855, 246, ['20 min = 20/60 "h"', '= 1/3 "h"'], { size: 42, fill: INK, gap: 18 });
  const fixW = mkWorking(bFix, 855, 436, ['150 ÷ 1/3 = 150 × 3', { m: '= 450 "km/h"', col: GREEN }], { size: 42, fill: INK, gap: 18 });
  const jBike = spBike(bFix, true); tr(jBike, 1080, 630, 0.75);
  const fixNo = mkMath(bFix, 730, 640, '7.5 "km/h"', { size: 32, fill: RED, weight: 700 });
  const fixStrike = strike(bFix, 722, 630, 730 + fixNo.w + 8, INK);
  // (ms, conv) km/h -> m/s
  const bConv = G(board);
  mkMath(bConv, BX, 172, '"km/h" -> "m/s" ?', { size: 44, anchor: 'middle', fill: BLUE, weight: 700 });
  const convW = mkWorking(bConv, 860, 230, ['1 km = 1000 "m"', '1 "h" = 3600 "s"'], { size: 40, fill: INK, gap: 18 });
  const convRule = G(bConv);
  E('line', { x1: 720, y1: 372, x2: 1140, y2: 372, stroke: '#C9D3DC', 'stroke-width': 3 }, convRule);
  mkMath(convRule, BX, 440, '× 1000 ÷ 3600', { size: 40, anchor: 'middle', fill: INK, weight: 700 });
  mkMath(convRule, BX, 530, '1000/3600 = 1/3.6', { size: 36, anchor: 'middle', fill: MUTED, weight: 600 });
  const convRes = mkChip(convRule, '**÷ 3.6**', { size: 44, col: GOLD, solid: true });
  tr(convRes, BX, 618);
  // (250) 900 ÷ 3.6 = 250 m/s
  const b250 = G(board);
  mkText(b250, BX, 172, 'km/h → m/s: **÷ 3.6**', { size: 32, anchor: 'middle', fill: INK, boldFill: BLUE });
  const m250 = mkMath(b250, BX, 262, '900 ÷ 3.6 = 250 "m/s"', { size: 48, anchor: 'middle', fill: GREEN, weight: 800 });
  const pitch = G(b250); tr(pitch, 735, 400);
  const PW = 156, PH = 92;
  spPitch(pitch, 0, PW, PH); spPitch(pitch, PW, PW, PH); spPitch(pitch, PW * 2, PW / 2, PH);
  const pBr = mkBrace(pitch, 0, -12, PW * 2.5, -12, { text: '**250 m**', size: 30, col: INK });
  mkText(b250, BX, 560, 'every **second**: about', { size: 30, anchor: 'middle', fill: MUTED, boldFill: INK });
  mkText(b250, BX, 604, '**2½ football pitches**', { size: 32, anchor: 'middle', fill: GREEN });
  const zip = G(pitch);
  E('path', { d: 'M18,0 L-14,-6 L-22,-22 L-28,-22 L-24,-4 L-30,-2 L-34,-10 L-38,-10 L-36,0 L-38,10 L-34,10 L-30,2 L-24,4 L-28,22 L-22,22 L-14,6 Z', fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 2 }, zip);
  // (run, aisle) Ah Boy's 5 m/s
  const bRun = G(board);
  mkText(bRun, BX, 172, 'm/s → km/h: the other way', { size: 30, anchor: 'middle', fill: MUTED });
  const runM = mkMath(bRun, BX, 280, '5 "m/s" × 3.6 = 18 "km/h"', { size: 46, anchor: 'middle', fill: GREEN, weight: 800 });
  const cX36 = mkChip(bRun, '{{"m/s" -> "km/h"}}: **× 3.6**', { size: 34, col: GOLD, solid: true });
  tr(cX36, BX, 380);
  const runRec = G(bRun);
  mkText(runRec, BX, 500, '{{"km/h" -> "m/s"}}: **÷ 3.6**', { size: 32, anchor: 'middle', fill: INK, boldFill: BLUE });
  mkText(runRec, BX, 560, '{{"m/s" -> "km/h"}}: **× 3.6**', { size: 32, anchor: 'middle', fill: INK, boldFill: GREEN });

  /* ================= Mars ================= */
  const marsShot = G(Lbg);
  const mars = lcMars(marsShot);

  /* ================= the cast ================= */
  const kav = cast(Lcast, 'kavya');
  const dad = cast(Lcast, 'dad', { prop: null, hand: true });
  const mum = cast(Lcast, 'mum', { prop: null, hand: true, side: 'right' });
  const boy = cast(Lcast, 'boy');
  const Ltri = G(Ltop);
  const trish = cast(Ltri, 'trish');
  const rosette = lcRosette(Lfg);
  const ltTrish = lcLowerThird(Lhud, 'trish');

  /* cut points and positions */
  const cM0 = end('dad') + 0.02, cM1 = at('match') + 0.7;
  const Y = 462, SC = 0.72, KX = 82, DX = 205, MX = 330, BYX = 452, TX = 598, TY = 548 - 160 * 0.58;
  const SPX = { kavya: KX, dad: DX, mum: MX, boy: BYX, trish: TX, narr: 930 };

  return t => {
    const sMars = on(t, cM0, cM1), sCab = 1 - sMars;
    const who = scWho(S, t);
    const sx = SPX[who] !== undefined ? SPX[who] : 930;
    op(cabShot, sCab); op(cabF, sCab); op(Lcast, sCab); op(Ltop, sCab); op(Lfg, sCab);
    op(marsShot, sMars);
    ltTrish.set(win(t, at('trish') + 0.1, at('trish') + 3.2, 0.3));
    if (sMars) mars.set(P(t, cM0, 0.9, linear), 4);
    rosette.set(0, 0);

    /* ---------- the screen, then the board ---------- */
    const boardOn = t >= at('trish') - 0.05;
    op(screen, boardOn ? 0 : 1); op(board, boardOn ? 1 : 0);
    if (!boardOn) {
      fmap.set({ p: 0.72 + 0.01 * P(t, 0, 8, linear), rows: [] });
      RD.forEach((r, i) => op(r, P(t, at('map') + 0.2 + i * 0.5, 0.3, linear)));
      op(rdQ, P(t, mid('map', 0.6), 0.25, linear)); op(rdHi, P(t, mid('map', 0.6), 0.25, linear));
    }
    const beat = (el, a, b) => show(el, t, a, b);
    beat(bTri, at('trish'), at('time') - 0.1);
    triRows.forEach((r, i) => op(r, P(t, mid('trish', 0.25 + i * 0.18), 0.25, linear)));
    op(triNote, P(t, mid('trish', 0.8), 0.25, linear));
    beat(bTime, at('time'), at('speed') - 0.1);
    timeW.show(0, P(t, mid('time', 0.15), 0.3, linear)); timeW.show(1, P(t, mid('time', 0.42), 0.3, linear)); timeW.show(2, P(t, mid('time', 0.62), 0.3, linear));
    timeW.ring(2, P(t, mid('time', 0.8), 0.3, linear));
    beat(bSpd, at('speed'), at('dad') - 0.1);
    op(spdA, P(t, at('speed') + 0.1, 0.3, linear)); op(spdB, P(t, mid('speed', 0.5), 0.3, linear));
    cPer.set(P(t, mid('speed', 0.8), 0.4, linear));
    beat(bDad, at('dad'), cM0);
    op(dBike, P(t, mid('dad', 0.6), 0.3, linear)); op(dSlow, P(t, mid('dad', 0.6), 0.3, linear));
    beat(bFix, cM1, at('ms') - 0.1);
    cMatch.set(P(t, cM1 + 0.05, 0.4, linear)); op(matchSub, P(t, mid('match', 0.3), 0.3, linear));
    matchW.show(0, P(t, mid('match', 0.45), 0.3, linear)); matchW.show(1, P(t, mid('match', 0.75), 0.3, linear));
    fixW.show(0, P(t, at('fix') + 0.2, 0.3, linear)); fixW.show(1, P(t, mid('fix', 0.4), 0.3, linear));
    fixW.ring(1, P(t, mid('fix', 0.55), 0.3, linear));
    op(jBike, P(t, mid('fix', 0.65), 0.3, linear)); tr(jBike, 1080 + 6 * Math.sin(t * 30) * AMP * (t > mid('fix', 0.65) ? 1 : 0), 630, 0.75);
    op(fixNo, P(t, mid('fix', 0.45), 0.3, linear)); fixStrike.set(P(t, mid('fix', 0.5), 0.3, linear));
    beat(bConv, at('ms'), at('250') - 0.1);
    convW.show(0, P(t, at('conv') + 0.2, 0.3, linear)); convW.show(1, P(t, mid('conv', 0.3), 0.3, linear));
    op(convRule, P(t, mid('conv', 0.55), 0.3, linear)); convRes.set(P(t, mid('conv', 0.8), 0.4, linear));
    beat(b250, at('250'), at('run') - 0.1);
    op(m250, P(t, at('250') + 0.2, 0.3, linear));
    if (t >= at('250')) { const f = ((t - at('250')) % 1); tr(zip, f * PW * 2.5, PH / 2); op(zip, t > mid('250', 0.4) ? 1 : 0); }
    beat(bRun, at('run'), 1e9);
    op(runM, P(t, at('run') + 0.2, 0.3, linear)); cX36.set(P(t, mid('run', 0.55), 0.4, linear)); op(runRec, P(t, mid('run', 0.85), 0.4, linear));

    /* ---------- the family ---------- */
    tr(kav, KX, Y, SC);
    kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: who === 'kavya' ? (t < at('trish') ? 'annoyed' : 'smug') : (who === 'dad' && t > mid('dad', 0.5)) || (t >= cM1 && t < at('fix')) ? 'deadpan' : t >= at('aisle') ? 'happy' : 'neutral', look: who === 'kavya' ? 1 : lookAt(KX, sx) });
    tr(dad, DX, Y, SC);
    let dm = 'neutral';
    if (who === 'dad') dm = t > mid('dad', 0.75) ? 'smug' : 'happy';
    else if (t >= cM1 && t < at('fix') + 1) dm = 'shock';
    else if (who === 'kavya' && t >= at('fix') && t < at('ms')) dm = 'sad';
    else if (who === 'trish') dm = 'neutral';
    dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: who === 'dad' ? 0.9 : lookAt(DX, sx) });
    if (t >= mid('dad', 0.45) && t < cM1 + 1) rosette.set(P(t, mid('dad', 0.45), 0.4, linear), P(t, cM1 + 0.05, 0.7, easeIn));
    tr(rosette, DX + 30, Y + 72, 0.5);
    // Ah Boy: hand up (ms), stands up and runs on the spot (run), pushed down (aisle)
    const upP = P(t, at('run') + 0.1, 0.4, easeOut) * (1 - P(t, mid('aisle', 0.25), 0.35, ease));
    const jog = upP > 0.5 ? Math.abs(Math.sin(t * 9)) * 14 * AMP : 0;
    tr(boy, BYX, Y - 70 * upP - jog, SC);
    boy.set({ t, talk: scTalk(S, t, 'boy'), mood: t >= at('aisle') ? (t > mid('aisle', 0.4) ? 'sad' : 'shock') : who === 'boy' ? 'happy' : t >= at('trish') && t < at('time') ? 'shock' : 'happy', look: who === 'boy' ? 0.8 : lookAt(BYX, sx), lift: who === 'boy' || (t >= at('run') && t < at('aisle')) ? 1 : 0 });
    // Mum: reaches over on "aisle"
    const reach = P(t, at('aisle') - 0.1, 0.35, easeOut) * (1 - P(t, end('aisle') + 0.3, 0.3, ease));
    tr(mum, MX + 22 * reach, Y, SC);
    mum.set({ t, talk: scTalk(S, t, 'mum'), mood: who === 'mum' ? 'annoyed' : t >= at('run') && t < at('aisle') ? 'annoyed' : t > end('aisle') ? 'smug' : (who === 'dad' && t > mid('dad', 0.6)) ? 'deadpan' : 'neutral', look: who === 'mum' ? 1 : lookAt(MX, sx), lift: reach });
    // Trish on the tray table
    const tp = P(t, at('trish') - 0.15, 0.45, pop);
    op(Ltri, t >= at('trish') - 0.15 ? sCab : 0);
    tr(trish, TX, TY + 40 * (1 - clamp(tp)), Math.max(0.01, 0.58 * clamp(tp, 0.1, 1.2)));
    let cov = -1, cp = 0;
    if (t >= mid('time', 0.05) && t < at('speed')) { cov = 2; cp = P(t, mid('time', 0.05), 0.4, ease); }
    else if (t >= at('speed') && t < mid('speed', 0.5)) { cov = 1; cp = P(t, at('speed'), 0.4, ease); }
    else if (t >= mid('speed', 0.5) && t < at('dad')) { cov = 0; cp = P(t, mid('speed', 0.5), 0.4, ease); }
    trish.set({ t, talk: scTalk(S, t, 'trish'), mood: who === 'trish' ? (t >= cM1 && t < at('fix') ? 'annoyed' : 'smug') : who === 'dad' ? (t > mid('dad', 0.6) ? 'shock' : 'neutral') : 'happy', look: who === 'trish' ? -0.6 : lookAt(TX, sx), cover: cov, coverP: cp });
  };
});
