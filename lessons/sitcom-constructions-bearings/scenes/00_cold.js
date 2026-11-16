/* Scene 0: Cold open (no chapter card).
   8 a.m., the bumboat to Pulau Ubin: Kavya, 12, and everyone -> Mr Tan's Great Ubin Orienteering Race (prize: his
   homemade waffles) -> Dad's excellent sense of direction: "Ubin is... that way" -> it's Changi Airport -> Mum has
   defected to Team Priya ("Bring tissues") -> documentary zoom into the brass compass in Mr Tan's hand -> Captain
   Needle's confessional: seventy years at sea, only ever looked one way: NORTH. -> Ah Boy spins him round; the
   needle still points North; Dad is pointing south-west: OFF COURSE -> title card. */
scene('cold', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);          // hard sitcom cut
  const view = (el, k, fx, fy, sx, sy) => el.setAttribute('transform', `translate(${sx.toFixed(1)} ${sy.toFixed(1)}) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 3, color: o.color || C.ink, weight: 700 }); };
  const GOLD = '#FFE45C', SKY = '#9FD8FF', PINK = '#FF8FC8';
  const big = (parent, text, size, fill, stroke) => { const w = T(parent, 0, 0, text, { size, weight: 800, anchor: 'middle', fill }); w.setAttribute('stroke', stroke); w.setAttribute('stroke-width', Math.round(size * 0.11)); w.setAttribute('paint-order', 'stroke'); w.setAttribute('stroke-linejoin', 'round'); return w; };

  /* layers: sets, foreground, HUD */
  const Lbg = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= the bumboat (shots A, R, D, M, S) ================= */
  const boatShot = G(Lbg), boatWrap = G(boatShot);
  const boat = cbBoat(boatWrap);
  const top = G(boat.rock);                     // in front of the hull: things held up over the gunwale
  // the six humans, left to right: Dad (pointing at Changi), Kavya, Mum, Priya, Ah Boy, Mr Tan (at the bow, by the island)
  const mum = cast(boat.mid, 'mum'), priya = cast(boat.mid, 'priya'), dad = cast(boat.mid, 'dad'),
    kav = cast(boat.mid, 'kavya'), boy = cast(boat.mid, 'boy'), tan = cast(boat.mid, 'tan');
  const POS = { dad: [180, 445, 0.86], kav: [350, 452, 0.84], mum: [540, 445, 0.84], priya: [700, 450, 0.82], boy: [860, 466, 0.8], tan: [1040, 445, 0.86] };
  const place = (c, k) => tr(c, POS[k][0], POS[k][1], POS[k][2]);
  place(mum, 'mum'); place(priya, 'priya'); place(dad, 'dad'); place(kav, 'kav'); place(boy, 'boy'); place(tan, 'tan');
  // Captain Needle, small, held up by Ah Boy (spin shot)
  const ndlS = cast(top, 'needle', { s: 0.42 });
  // the big pointing arrow from Dad's finger (boat coords)
  const dadArrow = G(top);
  E('path', { d: 'M0,0 L-120,0', stroke: GOLD, 'stroke-width': 10, 'stroke-linecap': 'round' }, dadArrow);
  E('path', { d: 'M-146,0 L-116,-18 L-116,18 Z', fill: GOLD }, dadArrow);
  // chips (screen coords)
  const cKav = pill(Lfg, 'Kavya, age 12', { size: 32 });
  const cSat = pill(Lfg, 'Saturday, 8 a.m.', { size: 30, color: GOLD, stroke: GOLD });
  const cBoat = pill(Lfg, 'bumboat to Pulau Ubin', { size: 28, color: SKY, stroke: SKY });
  const banner = G(Lfg);
  { const b = pill(banner, 'THE GREAT UBIN ORIENTEERING RACE', { size: 34, color: '#FFFFFF', stroke: '#FF8A3D', fill: '#C2410C' }); b.box.setAttribute('stroke-width', 5); }
  const prize = G(Lfg), waf = cbWaffles(prize); tr(waf, 0, 0, 0.9); waf.set(1, 4);
  const cPrize = pill(prize, 'PRIZE: waffles', { size: 30, color: GOLD, stroke: GOLD }); tr(cPrize, 0, 50);
  const cAir = pill(Lfg, 'CHANGI AIRPORT', { size: 30, color: SKY, stroke: SKY });
  const cTeam = pill(Lfg, 'TEAM PRIYA', { size: 34, color: PINK, stroke: PINK });
  const cTiss = pill(Lfg, 'Bring tissues.', { size: 30, color: '#FFFFFF', stroke: PINK });
  const cStill = G(Lfg);
  { const c = pill(cStill, 'still North', { size: 32, color: GOLD, stroke: GOLD }); attr(c.box, 'x', -c.w / 2 - 44); attr(c.box, 'width', c.w + 44);
    const n = cbNorth(c, 26, { col: GOLD, size: 18 }); tr(n, -c.w / 2 - 14, 16); }
  // a little compass rose showing where Dad really points: south-west
  const rose = G(Lfg);
  E('circle', { r: 64, fill: 'rgba(10,27,39,0.9)', stroke: GOLD, 'stroke-width': 3 }, rose);
  E('path', { d: 'M0,-50 L8,0 L0,50 L-8,0 Z M-50,0 L0,-8 L50,0 L0,8 Z', fill: '#C9D3DC', opacity: 0.6 }, rose);
  T(rose, 0, -36, 'N', { size: 22, weight: 800, anchor: 'middle', fill: '#FF8A8A' });
  E('path', { d: 'M0,0 L-40,40', stroke: GOLD, 'stroke-width': 7, 'stroke-linecap': 'round' }, rose);
  E('path', { d: 'M-48,48 L-44,28 L-28,44 Z', fill: GOLD }, rose);
  T(rose, 30, 50, 'SW', { size: 26, weight: 800, anchor: 'middle', fill: GOLD });
  const stamp = cbStamp(Lhud, false);

  /* ================= insert: the brass compass in Mr Tan's hand ================= */
  const insShot = G(Lbg), insWrap = G(insShot);
  E('rect', { x: -400, y: -300, width: 2000, height: 1400, fill: linGrad('#2E7DD8', '#1E5A9E', true) }, insWrap);   // the canopy, blurred
  for (let i = 0; i < 6; i++) E('circle', { cx: 120 + i * 200, cy: 120 + (i % 2) * 80, r: 60 + (i % 3) * 20, fill: '#FFFFFF', opacity: 0.06 }, insWrap);
  const palm = G(insWrap);
  E('path', { d: 'M380,760 Q360,560 450,470 Q600,420 760,470 Q860,520 840,760 Z', fill: '#F0C9A4', stroke: SC_INK, 'stroke-width': 6 }, palm);   // palm and wrist
  E('rect', { x: 430, y: 700, width: 360, height: 120, fill: '#CFE3F5', stroke: SC_INK, 'stroke-width': 6 }, palm);     // shirt cuff
  const ndlI = cast(insWrap, 'needle', { s: 1.25 });
  tr(ndlI, 600, 300);
  const fingers = G(insWrap);
  [[520, 455], [575, 468], [630, 468], [685, 455]].forEach(([x, y]) => E('ellipse', { cx: x, cy: y, rx: 30, ry: 42, fill: '#F0C9A4', stroke: SC_INK, 'stroke-width': 5 }, fingers));
  const thumb = G(insWrap);
  E('path', { d: 'M760,520 Q840,470 820,400 Q800,370 770,390 Q760,440 700,470 Z', fill: '#F0C9A4', stroke: SC_INK, 'stroke-width': 6, 'stroke-linejoin': 'round' }, thumb);
  const finder = G(Lhud);
  E('path', { d: 'M40,140 L40,40 L140,40 M1060,40 L1160,40 L1160,140 M1160,610 L1160,710 L1060,710 M140,710 L40,710 L40,610', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 5, opacity: 0.8 }, finder);
  const zoomTxt = T(finder, 1130, 690, 'ZOOM ×1', { size: 30, weight: 700, anchor: 'end', fill: '#FFFFFF' });
  const recDot = E('circle', { cx: 1090, cy: 82, r: 10, fill: '#FF3B3B' }, finder);
  T(finder, 1110, 92, 'REC', { size: 26, weight: 700, fill: '#FFFFFF' });

  /* ================= Captain Needle's confessional ================= */
  const conf = cbConf(Lbg, 'needle');
  const ndlC = cast(Lbg, 'needle');
  const plaque = G(Lfg);
  E('rect', { x: -260, y: -150, width: 520, height: 300, rx: 18, fill: '#0E1A2A', stroke: '#E2B33C', 'stroke-width': 5 }, plaque);
  big(plaque, 'MAGNETIC COMPASS', 40, GOLD, '#0E1A2A'); plaque.lastChild.setAttribute('y', -84);
  { const w = G(plaque); tr(w, 0, 6);   // a ship's wheel
    E('circle', { r: 44, fill: 'none', stroke: '#C98A4A', 'stroke-width': 9 }, w);
    let sp = ''; for (let i = 0; i < 8; i++) { const a = i * TAU / 8; sp += `M${(Math.cos(a) * 14).toFixed(1)},${(Math.sin(a) * 14).toFixed(1)} L${(Math.cos(a) * 62).toFixed(1)},${(Math.sin(a) * 62).toFixed(1)} `; }
    E('path', { d: sp, stroke: '#C98A4A', 'stroke-width': 8, 'stroke-linecap': 'round' }, w);
    E('circle', { r: 14, fill: '#E2B33C', stroke: SC_INK, 'stroke-width': 3 }, w); }
  T(plaque, 0, 112, '70 years at sea. One direction.', { size: 28, weight: 700, anchor: 'middle', fill: '#CFE3F5', font: FB });
  const northG = G(Lfg);
  const nArrow = cbNorth(northG, 150, { col: GOLD, size: 56 }); tr(nArrow, 0, 190);
  const wNorth = big(northG, 'NORTH.', 120, GOLD, '#0E1A2A'); wNorth.setAttribute('y', 300);

  /* ================= title card ================= */
  const titleShot = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#0B2340', '#1E5A8A', true) }, titleShot);
  let rays = '';
  for (let i = 0; i < 16; i++) { const a0 = i / 16 * TAU, a1 = a0 + TAU / 40; rays += `M0,0 L${(Math.cos(a0) * 1100).toFixed(0)},${(Math.sin(a0) * 1100).toFixed(0)} L${(Math.cos(a1) * 1100).toFixed(0)},${(Math.sin(a1) * 1100).toFixed(0)} Z `; }
  const rayP = E('path', { d: rays, fill: '#FFE45C', opacity: 0.07 }, titleShot);
  const roseBig = G(titleShot); tr(roseBig, 600, 360);
  E('path', { d: 'M0,-300 L40,0 L0,300 L-40,0 Z M-300,0 L0,-40 L300,0 L0,40 Z', fill: '#FFFFFF', opacity: 0.06 }, roseBig);
  E('circle', { r: 230, fill: 'none', stroke: '#FFFFFF', 'stroke-width': 4, opacity: 0.08 }, roseBig);
  E('ellipse', { cx: 600, cy: 610, rx: 600, ry: 160, fill: glow('#6EC8FF'), opacity: 0.3 }, titleShot);
  const logo = G(Lfg);
  const logoN = cbNorth(logo, 70, { col: '#FF6B5C', size: 40 }); tr(logoN, 0, -78);
  big(logo, 'TRUE NORTH', 112, GOLD, '#0B2340'); logo.lastChild.setAttribute('y', 40);
  const epi = T(Lfg, 600, 300, 'Episode 14: The Great Ubin Race', { size: 40, weight: 700, anchor: 'middle', fill: '#FFFFFF' });
  // title-card cast: copies built for this shot only
  const titleCast = G(Lfg);
  const tTan = cast(titleCast, 'tan'), tKav = cast(titleCast, 'kavya'), tNdl = cast(titleCast, 'needle'), tDad = cast(titleCast, 'dad'), tBoy = cast(titleCast, 'boy');

  /* ================= lower thirds ================= */
  const LT = {};
  ['kavya', 'tan', 'dad', 'mum', 'priya', 'needle'].forEach(k => { LT[k] = cbLowerThird(Lhud, k); });
  const ltOn = (t, who, t0) => LT[who].set(win(t, t0, t0 + 3.1, 0.3));

  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cut points */
  const cR = at('race') - 0.06, cD = at('dad') - 0.06, cM = at('mum') - 0.06, cI = at('tiny') - 0.06, cC = at('hi') - 0.06,
    cS = at('spin') - 0.06, cW = mid('still', 0.62), cT = at('title') - 0.06;
  const SPIN0 = at('spin') + 0.15, SPIN1 = end('spin') + 0.15;

  return t => {
    op(blackout, 1 - P(t, 0, 0.6, linear));
    const sA = on(t, -1, cR), sR = on(t, cR, cD), sD = on(t, cD, cM), sM = on(t, cM, cI), sI = on(t, cI, cC), sC = on(t, cC, cS),
      sS = on(t, cS, cW), sW = on(t, cW, cT), sT = on(t, cT, 1e9);
    const boatOn = sA || sR || sD || sM || sS || sW;
    const who = scWho(S, t);
    for (const k in LT) LT[k].set(0);
    [cKav, cSat, cBoat, banner, prize, cAir, cTeam, cTiss, cStill, rose, plaque, northG, logo, epi, titleCast, dadArrow, ndlS].forEach(e => op(e, 0));
    stamp.set(0);

    /* ---------- the bumboat ---------- */
    op(boatShot, boatOn);
    if (boatOn) {
      boat.upd(t * AMP);
      // the plane: climbs out of Changi, from behind the tower, in the airport line
      const fly = P(t, at('airport') - 0.6, 5, linear);
      tr(boat.plane, lerp(400, 40, fly), lerp(170, 105, fly), 0.5, -8);
      // camera
      if (sA) { const p = P(t, 0, cR, linear); view(boatWrap, 1 + 0.08 * p, 600, 440, 600, 440); }
      else if (sR) { const p = P(t, cR, 0.35, easeOut); view(boatWrap, lerp(1.25, 1.32, P(t, cR, cD - cR, linear)), 1000, 420, lerp(760, 800, p), 430); }
      else if (sD) {
        const p = P(t, at('airport') - 0.05, 0.4, ease);   // whip-pan to the airport
        view(boatWrap, lerp(1.45, 1.15, p), lerp(265, 260, p), lerp(440, 380, p), lerp(600, 640, p), 420);
      } else if (sM) view(boatWrap, 1.5 + 0.04 * P(t, cM, cI - cM, linear), 620, 440, 600, 430);
      else if (sS) view(boatWrap, 1.45, 840, 400, 700, 420);
      else if (sW) view(boatWrap, 1.5 + 0.06 * P(t, cW, cT - cW, linear), 240, 440, 600, 430);

      // --- moods and looks, per line ---
      const lookTan = 0.8;
      // Mum
      let mm = 'neutral', ml = 0.6;
      if (t < at('race')) { mm = 'happy'; ml = 0.7; }
      else if (t < at('mum')) { mm = 'smug'; ml = 0.8; }
      else if (t < at('tiny')) { mm = 'smug'; ml = who === 'priya' ? 0.8 : 0.3; }
      mum.set({ t, talk: scTalk(S, t, 'mum'), mood: mm, look: ml, lift: t > at('mum') + 0.2 && t < end('mum') ? 1 : 0 });
      // Priya
      let pm = 'smug', pl = -0.6;
      if (t < at('race')) { pm = 'happy'; pl = -0.7; }
      else if (t < at('mum')) { pm = 'smug'; pl = lookTan; }
      else if (t < at('priya')) { pm = 'smug'; pl = -0.7; }
      else { pm = 'smug'; pl = 0.1; }
      priya.set({ t, talk: scTalk(S, t, 'priya'), mood: pm, look: pl, lift: t > at('priya') && t < end('priya') + 0.3 ? 1 : 0 });
      // Dad
      let dm = 'smug', dl = 0.8, dLift = 0;
      if (t < at('race')) { dm = 'happy'; dl = 0.5; }
      else if (t < at('dad')) { dm = 'happy'; dl = lookTan; }
      else if (t < at('mum')) { dm = 'smug'; dl = t > mid('dad', 0.72) ? -0.7 : 0.8; dLift = t > mid('dad', 0.72) ? 1 : 0; }
      else if (t < at('spin')) { dm = 'sad'; dl = -0.6; }
      else if (sS) { dm = 'neutral'; dl = 0.8; }
      else { dm = 'smug'; dl = -0.7; dLift = 1; }
      dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: dl, lift: dLift });
      // Kavya
      let km = 'happy', kl = 0;
      if (t < at('race')) { km = t < mid('kavya', 0.4) ? 'neutral' : 'happy'; kl = t < mid('kavya', 0.5) ? 0 : 0.8; }
      else if (t < at('dad')) { km = 'happy'; kl = lookTan; }
      else if (t < at('airport')) { km = t > mid('dad', 0.75) ? 'deadpan' : 'neutral'; kl = -0.8; }
      else if (t < at('mum')) { km = 'deadpan'; kl = -0.8; }
      else if (sS) { km = 'neutral'; kl = 0.8; }
      else { km = 'deadpan'; kl = -0.8; }
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
      // Ah Boy
      let bm = 'happy', bl = 0.8, bLift = 0;
      if (t < at('race')) bl = 0.6;
      else if (t < at('dad')) { bm = t > mid('race', 0.7) ? 'happy' : 'neutral'; bl = 0.8; bLift = t > mid('race', 0.8) ? 1 : 0; }
      else if (t < at('spin')) { bm = 'neutral'; bl = -0.8; }
      else if (sS) { bm = 'happy'; bl = 0.6; bLift = 1; }
      else { bm = 'neutral'; bl = -0.8; }
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: bm, look: bl, lift: bLift });
      // Mr Tan
      tan.set({ t, talk: scTalk(S, t, 'tan'), mood: t >= at('race') && t < at('dad') ? 'happy' : 'neutral', look: t < at('race') ? 0 : -0.7,
        lift: t > at('race') - 0.2 && t < end('race') + 0.3 ? 1 : 0 });

      // --- shot A: chips ---
      if (sA) {
        popIn(cKav, t, mid('kavya', 0.06), 380, 248);
        popIn(cSat, t, mid('kavya', 0.4), 900, 130);
        popIn(cBoat, t, mid('kavya', 0.62), 900, 196);
        ltOn(t, 'kavya', at('kavya') + 1.4);
      }
      // --- shot R: the race ---
      if (sR) {
        ltOn(t, 'tan', at('race') + 0.1);
        popIn(banner, t, mid('race', 0.12), 640, 150, 0.95);
        if (t > mid('race', 0.62)) popIn(prize, t, mid('race', 0.62), 1060, 300, 0.6);
      }
      // --- shot D: Dad's sense of direction, then the airport ---
      if (sD) {
        if (t < at('airport')) ltOn(t, 'dad', at('dad') + 0.1);
        if (dLift) {
          op(dadArrow, P(t, mid('dad', 0.72), 0.25, linear));
          tr(dadArrow, 112 - 24 * P(t, mid('dad', 0.72), 0.5, pop), 472, 1);
        }
        if (t > at('airport')) popIn(cAir, t, at('airport') + 0.25, 640, 175);
      }
      // --- shot M: Team Priya ---
      if (sM) {
        popIn(cTeam, t, at('mum') + 0.3, 610, 150);
        ltOn(t, t < at('priya') ? 'mum' : 'priya', t < at('priya') ? at('mum') + 0.1 : at('priya') + 0.05);
        if (t > mid('priya', 0.55)) popIn(cTiss, t, mid('priya', 0.55), 860, 250);
      }
      // --- shot S: Ah Boy spins Captain Needle ---
      if (sS || sW) {
        op(ndlS, 1);
        const sp = P(t, SPIN0, SPIN1 - SPIN0, ease), r = 720 * sp;
        const wob = t > SPIN1 ? Math.sin((t - SPIN1) * 9) * 6 * Math.exp(-(t - SPIN1) * 3) * AMP : 0;
        tr(ndlS, 862, 506 + (t < SPIN1 && t > SPIN0 ? -6 * Math.sin(sp * Math.PI) : 0), 0.42, r + wob);
        ndlS.set({ t, talk: scTalk(S, t, 'needle'), mood: who === 'needle' ? 'smug' : 'deadpan', look: 0, needle: -(r + wob), still: true });
        if (sS && t > end('spin') + 0.1) popIn(cStill, t, end('spin') + 0.1, 1000, 170);
      }
      // --- shot W: Dad is pointing south-west ---
      if (sW) {
        op(dadArrow, 1); tr(dadArrow, 112, 472, 1);
        popIn(rose, t, cW + 0.1, 330, 220, 1);
        stamp.set(P(t, end('still') + 0.05, 0.35, linear)); tr(stamp, 640, 600, 0.5);
      }
    }

    /* ---------- insert: zoom into the compass in Mr Tan's hand ---------- */
    op(insShot, sI); op(finder, sI || sC ? 1 : 0); op(ndlI, sI);
    if (sI) {
      const z = P(t, cI + 0.2, cC - cI - 0.2, easeIn);
      const k = 0.62 * Math.pow(5.2 / 0.62, z);
      view(insWrap, k, lerp(600, 600, z), lerp(420, 300 + 54 * 1.25, z), 600, 375);
      setText(zoomTxt, 'ZOOM ×' + (k / 0.62 >= 10 ? String(Math.round(k / 0.62)) : (k / 0.62).toFixed(1)));
      ndlI.set({ t, mood: 'deadpan', look: 0, needle: 0 });
      op(recDot, Math.sin(t * TAU * 0.8) > 0 ? 1 : 0.15);
    }
    if (sC) { setText(zoomTxt, ''); op(finder, 0); }

    /* ---------- confessional ---------- */
    conf.set(sC, t); op(ndlC, sC);
    if (sC) {
      const push = P(t, at('north'), cS - at('north'), linear);
      tr(ndlC, 330, 420, 1.42 * (1 + 0.06 * push));
      let mood = 'smug';
      if (t >= at('north')) mood = t > end('north') + 0.2 ? 'deadpan' : 'smug';
      ndlC.set({ t, talk: scTalk(S, t, 'needle'), mood, look: t < mid('hi', 0.5) ? 0 : 0.5, point: t >= at('north') - 0.1 ? P(t, at('north') - 0.1, 0.3, pop) : 0 });
      ltOn(t, 'needle', at('hi') + 0.1);
      const pp = P(t, mid('hi', 0.2), 0.45, pop) * (1 - P(t, at('north') - 0.15, 0.2, linear));
      op(plaque, clamp(pp * 2.5)); tr(plaque, 860, 330, Math.max(0.01, 0.7 + 0.3 * pp));
      if (t >= at('north') - 0.1) { const np = P(t, at('north'), 0.4, pop); op(northG, clamp(np * 3)); tr(northG, 860, 120, Math.max(0.01, 0.5 + 0.5 * np)); }
    }

    /* ---------- title card ---------- */
    op(titleShot, sT);
    if (sT) {
      tr(rayP, 600, 360, 1, (t * 6 * AMP) % 360);
      tr(roseBig, 600, 360, 1, Math.sin(t * 0.6) * 4 * AMP);
      const lp = P(t, at('title') + 0.05, 0.6, pop);
      op(logo, clamp(lp * 2.5)); tr(logo, 600, 190, Math.max(0.01, 0.5 + 0.5 * lp));
      op(epi, P(t, mid('title', 0.42), 0.4, linear));
      op(titleCast, 1);
      const castT = i => mid('title', 0.5) + i * 0.13, xs = [180, 390, 600, 810, 1020];
      const row = [[tTan, 'happy', 0.7], [tKav, 'smug', 0.8], [tNdl, 'smug', 0.66], [tDad, 'smug', 0.7], [tBoy, 'happy', 0.78]];
      row.forEach(([c, mood, s], i) => {
        const p = P(t, castT(i), 0.45, pop);
        op(c, clamp(p * 3));
        tr(c, xs[i], 540 + 30 * (1 - clamp(p)), Math.max(0.01, s * p));
        c.set({ t, mood, look: 0, point: c === tNdl ? 1 : 0, lift: c === tDad || c === tTan ? 1 : 0 });
      });
    }
  };
});
