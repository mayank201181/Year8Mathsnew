/* Scene 0: Cold open (no chapter card).
   Saturday 14 March, 8 a.m., the school hall: Kavya, 12 -> the welcome stall: Mr Tan, 14 MAR = 3.14, Pi Day ->
   "Why am I here?" -> the Pi Passport and the EASY AS PI stamp -> Dad's Pi-zza, pi rounded to 3, "Close enough!" ->
   HALF-BAKED -> Ah Boy points at the side door -> documentary zoom: Uncle Pi talking to a pot plant -> Uncle Pi's
   confessional (3.14159265358979..., the Ep 1 family photo) -> "When does he stop?" "He doesn't. He's irrational."
   -> Uncle Pi on the hall stage, every circle in the hall lights up -> title card. */
scene('cold', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);          // hard sitcom cut
  const view = (el, k, fx, fy, sx, sy) => el.setAttribute('transform', `translate(${sx.toFixed(1)} ${sy.toFixed(1)}) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 3, color: o.color || C.ink, weight: 700 }); };
  const GOLD = '#FFE45C', PINK = '#FF8FC8', GREEN = '#7EE08A', RED = '#FF8A8A';
  const outline = (el, col, w) => { el.setAttribute('stroke', col); el.setAttribute('stroke-width', w); el.setAttribute('paint-order', 'stroke'); el.setAttribute('stroke-linejoin', 'round'); };
  // Uncle Pi's ticker: characters of CI_PI gone past at time t (16 by the end of "pi", 24 by the end of "every")
  const piDigits = t => {
    if (t < at('pi')) return 0;
    if (t < end('pi')) return 16 * clamp((t - at('pi')) / (end('pi') - at('pi')));
    if (t < at('every')) return 16 + 2 * clamp((t - end('pi')) / Math.max(0.1, at('every') - end('pi')));
    if (t < end('every')) return 18 + 6 * clamp((t - mid('every', 0.45)) / (end('every') - mid('every', 0.45)));
    return 24 + (t - end('every')) * 0.4;
  };

  /* layers: sets, characters behind the stall table, the table, foreground, HUD */
  const Lbg = G(root), Lcast = G(root), Lfront = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= A, C, F: the school hall ================= */
  const hallShot = G(Lbg), hallWrap = G(hallShot);
  const hall = ciHall(hallWrap);
  // a pot plant by the side door (Uncle Pi's audience in shot C)
  const plant = G(hallWrap); tr(plant, 1010, 420);
  E('path', { d: 'M-26,0 L-20,-44 L20,-44 L26,0 Z', fill: '#C8553D', stroke: SC_INK, 'stroke-width': 3 }, plant);
  [[-30, -100], [-8, -120], [16, -112], [34, -86], [0, -90]].forEach(([x, y]) => E('path', { d: `M0,-44 Q${x / 2},${(y - 44) / 2} ${x},${y}`, fill: 'none', stroke: '#2FA36B', 'stroke-width': 9, 'stroke-linecap': 'round' }, plant));
  const aChips = G(Lfg);
  const cKav = pill(aChips, 'Kavya, age 12', { size: 32 });
  const cSat = pill(aChips, 'Saturday, 14 March', { size: 30, color: GOLD, stroke: GOLD });
  const cHall = pill(aChips, 'school hall, 8 a.m.', { size: 28 });
  // F: every circle in the hall lights up
  const rings = G(Lfg);
  const ringList = [[1000, 102, 40, 40], [160, 118, 30, 9], [600, 590, 236, 75]].concat(hall.stalls.map(([x]) => [x, 542, 30, 30]))
    .map(([x, y, rx, ry], i) => { const e = E('ellipse', { cx: x, cy: y, rx, ry, fill: 'none', stroke: GOLD, 'stroke-width': 8 }, rings); return { e, i }; });
  const cEvery = mkChip(Lfg, 'every **circle** is mine!', { size: 32, col: GOLD, solid: true });

  /* ================= B, E: the welcome stall ================= */
  const stallShot = G(Lbg);
  const stall = ciStall(stallShot, { title: 'WELCOME · PI PASSPORTS', col: '#2E5AAC', sub: 'Pi Day Fair' });
  Lfront.appendChild(stall.front); Lfront.appendChild(stall.top);    // the table sits in front of Lcast
  // the calendar on the pin board: 14 MAR -> 3.14
  const cal = G(stall.board); tr(cal, 205, 300);
  E('rect', { x: -78, y: -70, width: 156, height: 140, rx: 10, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 4 }, cal);
  E('rect', { x: -78, y: -70, width: 156, height: 40, rx: 10, fill: '#E8424F', stroke: SC_INK, 'stroke-width': 4 }, cal);
  E('circle', { cx: -40, cy: -72, r: 7, fill: '#5A6670' }, cal); E('circle', { cx: 40, cy: -72, r: 7, fill: '#5A6670' }, cal);
  const calMar = T(cal, 0, -40, 'MARCH', { size: 26, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  const cal14 = T(cal, 0, 44, '14', { size: 70, weight: 800, anchor: 'middle', fill: SC_INK });
  const cal314 = T(cal, 0, 40, '3.14', { size: 56, weight: 800, anchor: 'middle', fill: '#2E5AAC' });
  // the Pi Passport, Dad's pizza boxes, the stamps
  const pass = ciPassport(stall.top, { name: 'KAVYA' });
  const boxes = G(stall.top);
  [0, 1].forEach(k => {
    const b = G(boxes); tr(b, 0, -k * 46);
    E('rect', { x: -110, y: -44, width: 220, height: 44, rx: 4, fill: '#F2E6D0', stroke: SC_INK, 'stroke-width': 3 }, b);
    E('path', { d: 'M-110,-30 L110,-30', stroke: '#C9B48A', 'stroke-width': 3 }, b);
    T(b, 0, -6, "DAD'S PI-ZZA", { size: 22, weight: 800, anchor: 'middle', fill: '#C62828' });
  });
  const stEasy = ciStamp(Lfg, true), stHalf = ciStamp(Lfg, false);
  const cPiDay = mkChip(Lfg, '**3.14** = **PI DAY!**', { size: 34, col: '#2E5AAC', fill: '#DCE8FF' });
  const cEleven = pill(Lfg, 'planned for 11 months', { size: 28, color: GOLD, stroke: GOLD });
  const cPass = mkChip(Lfg, 'right answer → **EASY AS PI**', { size: 30, col: '#1E9E5A', fill: '#E6F7EC' });
  const cThree = mkChip(Lfg, '{{pi = 3}}?', { size: 34, col: '#C62828', fill: '#FFE4E4' });
  const cClose = pill(Lfg, '"Close enough!"', { size: 30, color: RED, stroke: RED });
  const cWrong = mkChip(Lfg, 'wrong answer → **HALF-BAKED**', { size: 30, col: '#C62828', fill: '#FFE4E4' });
  const cIrr = mkChip(Lfg, '**irrational**: never ends, never repeats', { size: 32, col: GOLD, solid: true });

  /* ================= C: the documentary zoom (HUD) ================= */
  const finder = G(Lhud);
  E('path', { d: 'M40,140 L40,40 L140,40 M1060,40 L1160,40 L1160,140 M1160,610 L1160,710 L1060,710 M140,710 L40,710 L40,610', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 5, opacity: 0.85 }, finder);
  const zoomTxt = T(finder, 1130, 690, 'ZOOM ×1', { size: 30, weight: 700, anchor: 'end', fill: '#FFFFFF' });
  const recDot = E('circle', { cx: 80, cy: 676, r: 10, fill: '#FF3B3B' }, finder);
  T(finder, 98, 686, 'REC', { size: 28, weight: 700, fill: '#FFFFFF' });

  /* ================= D: Uncle Pi's confessional ================= */
  const conf = ciConf(Lbg, 'pi');
  const digCard = G(Lfg);
  E('rect', { x: -270, y: -150, width: 540, height: 300, rx: 20, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, digCard);
  T(digCard, 0, -84, 'π =', { size: 52, weight: 800, anchor: 'middle', fill: '#2E5AAC' });
  const dRow1 = T(digCard, 0, 4, '', { size: 66, weight: 800, anchor: 'middle', fill: MK.ink, ls: 3 });
  const dRow2 = T(digCard, 0, 96, '', { size: 66, weight: 800, anchor: 'middle', fill: MK.ink, ls: 3 });
  const ROW1 = '3.1415926', ROW2 = '5358979…';
  // the family photo from Ep 1 (Uncle Pi squeezed in at the edge)
  const photo = G(Lfg);
  E('rect', { x: -250, y: -170, width: 500, height: 340, rx: 10, fill: '#C9935A', stroke: '#6B4423', 'stroke-width': 6 }, photo);
  E('rect', { x: -222, y: -142, width: 444, height: 240, fill: linGrad('#FFF1D6', '#F2D8A8', true) }, photo);
  [['1', '#FFC247', -170], ['2', '#4CC9F0', -90], ['−3', '#B48CFF', -10], ['10', '#56D69B', 70]].forEach(([n, col, x]) => {
    E('circle', { cx: x, cy: -20, r: 34, fill: col, stroke: SC_INK, 'stroke-width': 3 }, photo);
    T(photo, x, -8, n, { size: 30, weight: 800, anchor: 'middle', fill: SC_INK });
    E('path', { d: `M${x - 10},${10} Q${x},${18} ${x + 10},${10}`, fill: 'none', stroke: SC_INK, 'stroke-width': 3 }, photo);
  });
  const mini = G(photo); tr(mini, 168, -14, 1, 12);
  E('path', { d: 'M-36,-8 Q0,-14 36,-12 M-16,-10 Q-18,20 -24,44 M14,-10 Q12,24 18,40', fill: 'none', stroke: '#D9843A', 'stroke-width': 12, 'stroke-linecap': 'round' }, mini);
  E('circle', { cx: 0, cy: -34, r: 22, fill: '#E8B98A', stroke: SC_INK, 'stroke-width': 3 }, mini);
  E('path', { d: 'M-8,-28 Q0,-22 8,-28', fill: 'none', stroke: SC_INK, 'stroke-width': 3 }, mini);
  T(photo, 0, 140, 'FAMILY PHOTO · EP 1', { size: 28, weight: 800, anchor: 'middle', fill: '#FFF1D6' });
  const cSame = pill(Lfg, 'still the same sentence', { size: 28, color: GOLD, stroke: GOLD });

  /* ================= G: title card ================= */
  const titleShot = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#0E2A5A', '#2E5AAC', true) }, titleShot);
  let rays = '';
  for (let i = 0; i < 16; i++) { const a0 = i / 16 * TAU, a1 = a0 + TAU / 40; rays += `M0,0 L${(Math.cos(a0) * 1100).toFixed(0)},${(Math.sin(a0) * 1100).toFixed(0)} L${(Math.cos(a1) * 1100).toFixed(0)},${(Math.sin(a1) * 1100).toFixed(0)} Z `; }
  const rayP = E('path', { d: rays, fill: GOLD, opacity: 0.07 }, titleShot);
  E('ellipse', { cx: 600, cy: 610, rx: 600, ry: 160, fill: glow('#6EC8FF'), opacity: 0.35 }, titleShot);
  const logo = G(Lfg);
  const logo1 = T(logo, -70, -40, 'EASY AS', { size: 70, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 6 });
  const logo2 = T(logo, -70, 70, 'PI', { size: 130, weight: 800, anchor: 'middle', fill: GOLD, ls: 6 });
  [logo1, logo2].forEach(w => outline(w, '#0A1A3A', 12));
  // the pie with one slice missing
  const pie = G(logo); tr(pie, 200, 0);
  E('path', { d: `M0,0 L${(Math.cos(-0.5) * 92).toFixed(1)},${(Math.sin(-0.5) * 92).toFixed(1)} A92,92 0 1 1 ${(Math.cos(-1.3) * 92).toFixed(1)},${(Math.sin(-1.3) * 92).toFixed(1)} Z`, fill: CI_COL.crust, stroke: '#0A1A3A', 'stroke-width': 6, 'stroke-linejoin': 'round' }, pie);
  E('path', { d: `M0,0 L${(Math.cos(-0.5) * 76).toFixed(1)},${(Math.sin(-0.5) * 76).toFixed(1)} A76,76 0 1 1 ${(Math.cos(-1.3) * 76).toFixed(1)},${(Math.sin(-1.3) * 76).toFixed(1)} Z`, fill: '#F7C6D9' }, pie);
  T(pie, -6, 30, 'π', { size: 84, weight: 800, anchor: 'middle', fill: '#B8336A' });
  const slice = G(logo);
  E('path', { d: `M0,0 L${(Math.cos(-0.5) * 92).toFixed(1)},${(Math.sin(-0.5) * 92).toFixed(1)} A92,92 0 0 0 ${(Math.cos(-1.3) * 92).toFixed(1)},${(Math.sin(-1.3) * 92).toFixed(1)} Z`, fill: CI_COL.crust, stroke: '#0A1A3A', 'stroke-width': 6, 'stroke-linejoin': 'round' }, slice);
  const epi = T(Lfg, 600, 344, 'Episode 16: The Pi Day Fair', { size: 42, weight: 700, anchor: 'middle', fill: '#FFFFFF' });

  /* ================= the cast ================= */
  const tan = cast(Lcast, 'tan');
  const dad = cast(Lcast, 'dad');
  const boy = cast(Lcast, 'boy');
  const pi = cast(Lcast, 'pi');
  const kav = cast(Lfg, 'kavya');                   // customer side, in front of the table (and on the title card)
  const lt = { kavya: ciLowerThird(Lhud, 'kavya'), tan: ciLowerThird(Lhud, 'tan'), dad: ciLowerThird(Lhud, 'dad'), boy: ciLowerThird(Lhud, 'boy'), pi: ciLowerThird(Lhud, 'pi') };
  const ltOn = (t, who, t0) => lt[who].set(win(t, t0, t0 + 3.1, 0.3));

  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cut points */
  const cB = at('tan') - 0.06, cC = at('guest') - 0.06, cD = at('pi') - 0.06, cE = at('stop') - 0.06,
    cF = at('every') - 0.06, cG = at('title') - 0.06;
  const ZK = 2.0, ZX = 900, ZY = 330;              // the zoom on the side door

  return t => {
    op(blackout, 1 - P(t, 0, 0.6, linear));
    const sA = on(t, -1, cB), sB = on(t, cB, cC), sC = on(t, cC, cD), sD = on(t, cD, cE), sE = on(t, cE, cF),
      sF = on(t, cF, cG), sG = on(t, cG, 1e9);
    const stallOn = sB || sE, hallOn = sA || sC || sF;
    for (const k in lt) lt[k].set(0);
    const show = { tan: 0, dad: 0, boy: 0, pi: 0, kav: 0 };
    const digits = piDigits(t);

    /* ---------- A, C, F: the hall ---------- */
    op(hallShot, hallOn); op(aChips, 0); op(rings, 0); cEvery.set(0); op(finder, sC);
    if (hallOn) hall.upd(t);
    if (sA) {
      const push = P(t, 0, cB, linear);
      view(hallWrap, 1 + 0.12 * push, 600, 375, 600, 375 + 20 * push);
      show.kav = 1;
      tr(kav, 210, 548, 1.02);
      kav.set({ t, talk: 0, mood: t < mid('kavya', 0.55) ? 'neutral' : 'deadpan', look: t > mid('kavya', 0.5) ? 0.8 : 0 });
      op(aChips, 1);
      popIn(cKav, t, mid('kavya', 0.05), 210, 372);
      popIn(cSat, t, mid('kavya', 0.4), 930, 250);
      popIn(cHall, t, mid('kavya', 0.66), 930, 318);
      ltOn(t, 'kavya', at('kavya') + 1.4);
    }
    if (sC) {
      const z = P(t, cC + 0.3, Math.max(0.5, end('guest') - cC - 0.6), ease);
      const k = lerp(1, ZK, z), fx = lerp(600, ZX, z), fy = lerp(375, ZY, z);
      view(hallWrap, k, fx, fy, 600, 375);
      setText(zoomTxt, 'ZOOM ×' + k.toFixed(1));
      op(recDot, Math.sin(t * TAU * 0.8) > 0 ? 1 : 0.15);
      // Uncle Pi, by the door, chatting to the pot plant (hall coords -> screen)
      show.pi = 1;
      const hx = 1080, hy = 420 - 112 * 0.48;
      tr(pi, 600 + (hx - fx) * k, 375 + (hy - fy) * k, 0.48 * k);
      pi.set({ t, talk: 0.25 + 0.6 * Math.abs(Math.sin(t * 9)), mood: 'happy', look: -0.8, digits: 2 + (t - cC) * 2.2 });
    }
    if (sF) {
      view(hallWrap, 1, 600, 375, 600, 375);
      show.pi = 1;
      const up = P(t, cF, 0.45, pop);
      tr(pi, 600, lerp(470, 300, up), 0.55); op(pi.ticker, 0);
      pi.set({ t, talk: scTalk(S, t, 'pi'), mood: 'happy', look: Math.sin(t * 1.5) * 0.5, digits });
      op(rings, 1);
      ringList.forEach(({ e, i }) => { const p = P(t, mid('every', 0.12) + i * 0.12, 0.3, linear); op(e, p * (0.55 + 0.45 * Math.sin(t * 6 + i))); });
      cEvery.set(P(t, mid('every', 0.2), 0.35, linear)); tr(cEvery, 600, 660);
    }

    /* ---------- B, E: the welcome stall ---------- */
    op(stallShot, stallOn); op(stall.front, stallOn); op(stall.top, stallOn);
    op(pass, 0); op(boxes, 0); stEasy.set(0); stHalf.set(0);
    [cPiDay, cPass, cThree, cWrong, cIrr].forEach(c => c.set(0)); op(cEleven, 0); op(cClose, 0);
    if (stallOn) stall.upd(t);
    if (sB) {
      // the calendar flips from 14 MARCH to 3.14
      const flip = t > mid('tan', 0.32);
      op(cal14, flip ? 0 : 1); op(calMar, flip ? 0 : 1); op(cal314, flip ? 1 : 0);
      tr(cal, 205, 300, 1, flip ? Math.sin(Math.min(1, (t - mid('tan', 0.32)) * 3) * Math.PI) * -8 : 0);
      // Mr Tan, behind the table
      show.tan = 1;
      tr(tan, 560, 432, 1.08);
      let tm = 'happy', tl = -0.5, lift = 0;
      if (t >= at('why') && t < at('passport')) { tm = 'neutral'; tl = -0.7; }
      if (t >= at('dad') && t < at('baked')) { tm = 'deadpan'; tl = 0.8; }
      if (t >= at('baked')) { tm = t < end('baked') + 0.2 ? 'deadpan' : 'happy'; tl = 0.8; lift = t < end('baked') + 0.4 ? P(t, at('baked'), 0.3, ease) : 0; }
      if (t >= at('passport') && t < at('dad')) lift = t > mid('passport', 0.55) && t < end('passport') + 0.2 ? 1 : 0;
      if (t >= at('boy')) { tm = 'neutral'; tl = 0.9; lift = 0; }
      tan.set({ t, talk: scTalk(S, t, 'tan'), mood: tm, look: tl, lift });
      ltOn(t, 'tan', at('tan') + 0.1);
      cPiDay.set(t < at('why') ? P(t, mid('tan', 0.4), 0.3, linear) : 0); tr(cPiDay, 860, 260);
      if (t > mid('tan', 0.7) && t < at('why')) popIn(cEleven, t, mid('tan', 0.7), 860, 330);
      // the passport pops up, then lies on the table
      if (t >= at('passport') - 0.1) {
        op(pass, 1);
        const pp = P(t, at('passport') - 0.1, 0.4, pop), down = P(t, at('dad') - 0.2, 0.4, ease);
        tr(pass, lerp(860, 450, down), lerp(380, 610, down), Math.max(0.01, lerp(0.85, 0.42, down) * (0.6 + 0.4 * pp)));
        pass.mark(0, true, P(t, mid('passport', 0.75), 0.4, linear));
        cPass.set(t < at('dad') ? P(t, mid('passport', 0.5), 0.3, linear) : 0); tr(cPass, 860, 630);
        if (t < at('dad')) { stEasy.set(P(t, mid('passport', 0.8), 0.35, linear)); tr(stEasy, 860, 380, 0.5); }
      }
      // Dad and his pizza boxes
      if (t >= at('dad') - 0.35) {
        show.dad = 1;
        const up = P(t, at('dad') - 0.35, 0.4, easeOut);
        tr(dad, 900, lerp(660, 432, up), 1.08);
        const stamped = t > mid('baked', 0.35);
        dad.set({ t, talk: scTalk(S, t, 'dad'), mood: t < at('baked') ? 'smug' : stamped ? 'sad' : 'neutral', look: t >= at('boy') ? 0.8 : -0.6, lift: t < at('baked') ? 1 : 0 });
        op(boxes, 1); tr(boxes, 900, 600);
        ltOn(t, 'dad', at('dad') + 0.05);
        if (t < at('baked')) { cThree.set(P(t, mid('dad', 0.5), 0.3, linear)); tr(cThree, 1040, 250); }
        if (t > mid('dad', 0.75) && t < at('baked')) popIn(cClose, t, mid('dad', 0.75), 900, 650);
        if (t >= at('baked')) {
          stHalf.set(t < at('boy') ? P(t, mid('baked', 0.35), 0.35, linear) : 0); tr(stHalf, 740, 214, 0.45);
          cWrong.set(t < at('boy') ? P(t, mid('baked', 0.1), 0.3, linear) : 0); tr(cWrong, 620, 650);
        }
      }
      // Ah Boy pops up between them and points at the side door
      if (t >= at('boy') - 0.3) {
        show.boy = 1;
        const up = P(t, at('boy') - 0.3, 0.35, pop);
        tr(boy, 740, lerp(660, 456, up), 1.0);
        boy.set({ t, talk: scTalk(S, t, 'boy'), mood: 'neutral', look: 0.9, lift: 1 });
        ltOn(t, 'boy', at('boy') + 0.05);
      }
      // Kavya, customer side
      show.kav = 1;
      tr(kav, 200, 548, 1.04);
      let km = 'neutral', kl = 0.7;
      if (t < at('why')) km = t < mid('tan', 0.5) ? 'shock' : 'neutral';
      else if (t < at('passport')) { km = 'deadpan'; kl = 0; }
      else if (t < at('dad')) km = 'neutral';
      else if (t < at('boy')) { km = 'deadpan'; kl = 0.9; }
      else { km = 'neutral'; kl = 0.9; }
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
    }
    if (sE) {
      op(cal14, 0); op(calMar, 0); op(cal314, 1); tr(cal, 205, 300);
      show.tan = 1; show.boy = 1; show.dad = 1; show.kav = 1;
      tr(tan, 560, 432, 1.08); tr(boy, 740, 456, 1.0); tr(dad, 900, 432, 1.08); tr(kav, 200, 548, 1.04);
      const tanTalks = t >= at('never');
      tan.set({ t, talk: scTalk(S, t, 'tan'), mood: tanTalks ? 'deadpan' : 'neutral', look: tanTalks ? 0.5 : 0.9 });
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: tanTalks && t > mid('never', 0.5) ? 'sad' : 'shock', look: tanTalks ? -0.8 : 0.9, lift: tanTalks ? 0 : 1 });
      dad.set({ t, mood: 'deadpan', look: 0.9 });
      kav.set({ t, mood: tanTalks ? 'deadpan' : 'neutral', look: tanTalks ? 0.8 : 0.9 });
      op(boxes, 1); tr(boxes, 900, 600);
      op(pass, 1); tr(pass, 450, 610, 0.42); pass.mark(0, true, 1);
      cIrr.set(P(t, mid('never', 0.25), 0.35, linear)); tr(cIrr, 680, 650);
    }

    /* ---------- D: Uncle Pi's confessional ---------- */
    conf.set(sD, t);
    op(digCard, 0); op(photo, 0); op(cSame, 0);
    if (sD) {
      show.pi = 1;
      const push = P(t, at('hi'), Math.max(0.5, cE - at('hi')), linear);
      tr(pi, 330, 400, 1.0 * (1 + 0.05 * push));
      pi.set({ t, talk: scTalk(S, t, 'pi'), mood: 'happy', look: t < at('hi') ? 0.5 : Math.sin(t) * 0.3, digits });
      ltOn(t, 'pi', at('pi') + 0.2);
      if (t < at('hi') - 0.1) {
        const cp = P(t, at('pi') - 0.05, 0.35, pop);
        op(digCard, clamp(cp * 3)); tr(digCard, 880, 340, Math.max(0.01, 0.85 + 0.15 * cp));
        const n = Math.min(16, Math.floor(digits + 0.5));
        setText(dRow1, ROW1.slice(0, Math.min(n, ROW1.length)));
        setText(dRow2, n > ROW1.length ? ROW2.slice(0, n - ROW1.length) + (n >= 16 ? '…' : '') : '');
      } else {
        const pp = P(t, at('hi') - 0.1, 0.4, pop);
        op(photo, clamp(pp * 3)); tr(photo, 880, 330, Math.max(0.01, 0.85 + 0.15 * pp), -3);
        tr(mini, 168, -14 + Math.sin(t * 7) * 2 * AMP, 1, 12);
        if (t > mid('hi', 0.7)) popIn(cSame, t, mid('hi', 0.7), 880, 560);
      }
    }

    /* ---------- G: title card ---------- */
    op(titleShot, sG); op(logo, 0); op(epi, 0);
    if (sG) {
      tr(rayP, 600, 600, 1, (t * 6 * AMP) % 360);
      const lp = P(t, at('title') + 0.05, 0.6, pop);
      op(logo, clamp(lp * 2.5)); tr(logo, 600, 170, Math.max(0.01, 0.5 + 0.5 * lp));
      // the missing slice hops away and back
      const hop = Math.max(0, Math.sin((t - at('title')) * 2.2)) * 18 * AMP;
      tr(slice, 200 + Math.cos(-0.9) * (14 + hop), Math.sin(-0.9) * (14 + hop));
      op(epi, P(t, mid('title', 0.4), 0.4, linear));
      const castT = i => mid('title', 0.5) + i * 0.13, xs = [180, 390, 600, 810, 1020];
      const row = [[tan, 'happy', 0.68, 'tan'], [kav, 'smug', 0.8, 'kav'], [pi, 'happy', 0.52, 'pi'], [dad, 'smug', 0.68, 'dad'], [boy, 'happy', 0.78, 'boy']];
      row.forEach(([c, mood, s, key], i) => {
        const p = P(t, castT(i), 0.45, pop);
        show[key] = 1; op(c, clamp(p * 3));
        const y = key === 'pi' ? 500 : 540;
        tr(c, xs[i], y + 30 * (1 - clamp(p)), Math.max(0.01, s * p));
        c.set({ t, mood, look: 0, lift: 0, digits: key === 'pi' ? digits : undefined });
      });
    }

    /* characters not in this shot */
    if (!sF) op(pi.ticker, 1);
    if (!sG) { op(tan, show.tan); op(dad, show.dad); op(boy, show.boy); op(pi, show.pi); op(kav, show.kav); }
  };
});
