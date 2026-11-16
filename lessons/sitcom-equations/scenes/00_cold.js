/* Scene 0: Cold open (no chapter card).
   2 p.m., THE VAULT OF X, an escape room in Bugis: Kavya, 12 -> Priya, birthday girl: 7 rooms, 60 minutes ->
   the GAME MASTER on the CCTV screen is Mr Tan -> Kavya: "Mr Tan?!" (the whole family in the lobby) -> "On weekends
   I am the Game Master" (push-in) -> Dad types SEVEN: WRONG -> documentary zoom into the keypad's display, where an x
   blinks -> Ex's confessional (the unknown; a different number behind every door; cape swish) -> Ah Boy: "So he's the
   bad guy?" -> "I'm a mystery" -> Kavya: every lock is an equation, find x -> Ex on the desk: 60 minutes, 7 doors,
   1 unknown; the clock starts -> title card. */
scene('cold', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);          // hard sitcom cut
  const view = (el, k, fx, fy, sx, sy) => el.setAttribute('transform', `translate(${sx.toFixed(1)} ${sy.toFixed(1)}) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const pill = (parent, text, col, size) => mkChip(parent, text, { size: size || 30, col: col || C.ink });
  const popAt = (c, t, t0, t1, x, y) => { c.set(t >= t0 && t < t1 ? P(t, t0, 0.35, linear) : 0); tr(c, x, y); };
  const GOLD = '#FFE45C', PINK = '#FF8FC8', LILAC = '#B48CFF';

  /* layers: sets, characters behind the desk, the desk, foreground, HUD */
  const Lbg = G(root), Lcast = G(root), Lfront = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= the lobby ================= */
  const lobShot = G(Lbg), lobWrap = G(lobShot);
  const lob = eqLobby(lobWrap);
  Lfront.appendChild(lob.front); Lfront.appendChild(lob.top);
  const chKav = pill(Lfg, 'Kavya, age 12', C.ink, 32);
  const chSat = pill(Lfg, 'Saturday, 2 p.m.', GOLD);
  const chBug = pill(Lfg, 'an escape room in Bugis', C.ink, 28);
  const chRooms = pill(Lfg, '**7** locked rooms', GOLD, 34);
  const chMins = pill(Lfg, '**60** minutes', GOLD, 34);
  const bubSir = mkSpeechBubble(Lfg, 'Mr Tan?!', { size: 40, tail: 'down', tailX: -30 });
  const chSeven = pill(Lfg, 'the code is **7**. always.', '#9FE0B5', 30);
  const chEq = G(Lfg);
  E('rect', { x: -330, y: -42, width: 660, height: 84, rx: 42, fill: 'rgba(10,27,39,0.92)', stroke: GOLD, 'stroke-width': 3 }, chEq);
  mkText(chEq, 0, 13, 'every lock = an **equation**', { size: 38, anchor: 'middle', fill: C.ink, boldFill: GOLD });
  const chFind = G(Lfg);
  E('rect', { x: -250, y: -42, width: 500, height: 84, rx: 42, fill: 'rgba(10,27,39,0.92)', stroke: '#9FE0B5', 'stroke-width': 3 }, chFind);
  mkText(chFind, 0, 14, 'find {{x}} → the door opens', { size: 38, anchor: 'middle', fill: C.ink });
  const ch60 = pill(Lfg, '**60** minutes', GOLD, 34);
  const ch7 = pill(Lfg, '**7** doors', GOLD, 34);
  const ch1 = pill(Lfg, '**1** unknown', LILAC, 34);

  /* ================= the CCTV close-up ================= */
  const monShot = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#0E0A18', '#1E1430', true) }, monShot);
  const monWrap = G(monShot);
  const mon = eqMonitor(monWrap, 660, 420); tr(mon, 600, 380);
  const chGM = pill(Lfg, 'every door: **one number**', GOLD, 32);

  /* ================= zoom into the keypad ================= */
  const padShot = G(Lbg), padWrap = G(padShot);
  E('rect', { x: -400, y: -400, width: 2000, height: 1550, fill: '#2E2248' }, padWrap);
  const bigPad = eqKeypad(padWrap, { s: 2.2 }); tr(bigPad, 600, 420);
  const PADX = 600, PADY = 420 - 83 * 2.2;                       // the display, stage coords at zoom 1
  const xBlink = T(padWrap, PADX, PADY + 22, 'x', { size: 60, weight: 700, anchor: 'middle', fill: '#FFC247', font: "'Times New Roman', Georgia, serif" });
  xBlink.setAttribute('font-style', 'italic');
  const finder = G(Lhud);
  E('path', { d: 'M40,140 L40,40 L140,40 M1060,40 L1160,40 L1160,140 M1160,610 L1160,710 L1060,710 M140,710 L40,710 L40,610', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 5, opacity: 0.8 }, finder);
  const zoomTxt = T(finder, 1130, 690, 'ZOOM ×1', { size: 30, weight: 700, anchor: 'end', fill: '#FFFFFF' });

  /* ================= Ex's confessional ================= */
  const conf = eqConf(Lbg, 'ex');
  const plaque = G(Lfg);
  E('rect', { x: -230, y: -150, width: 460, height: 300, rx: 18, fill: '#0E0A20', stroke: LILAC, 'stroke-width': 5 }, plaque);
  T(plaque, 0, -92, 'THE UNKNOWN', { size: 40, weight: 800, anchor: 'middle', fill: LILAC, ls: 2 });
  const px = T(plaque, -60, 50, 'x', { size: 140, weight: 700, anchor: 'middle', fill: GOLD, font: "'Times New Roman', Georgia, serif" });
  px.setAttribute('font-style', 'italic');
  T(plaque, 50, 46, '= ?', { size: 84, weight: 800, anchor: 'start', fill: '#FFFFFF' });
  T(plaque, 0, 122, 'you\'ll never find him', { size: 28, weight: 700, anchor: 'middle', fill: '#CFC2FF', font: FB });
  const doors = G(Lfg);   // a row of three doors, each with a different number behind it
  [['2', -170], ['−1.5', 0], ['31', 170]].forEach(([v, dx]) => {
    const d = G(doors); tr(d, dx, 0);
    E('rect', { x: -66, y: -100, width: 132, height: 200, rx: 6, fill: '#4A3A6A', stroke: LILAC, 'stroke-width': 4 }, d);
    E('rect', { x: -50, y: -40, width: 100, height: 56, rx: 8, fill: '#0E1A14', stroke: '#6A7884', 'stroke-width': 2 }, d);
    T(d, 0, -2, v, { size: 30, weight: 800, anchor: 'middle', fill: '#FFC247' });
    T(d, 0, -62, '?', { size: 34, weight: 800, anchor: 'middle', fill: GOLD });
  });
  const wNever = T(Lfg, 0, 0, 'NEVER.', { size: 110, weight: 800, anchor: 'middle', fill: LILAC });
  wNever.setAttribute('stroke', '#140F2A'); wNever.setAttribute('stroke-width', 12); wNever.setAttribute('paint-order', 'stroke'); wNever.setAttribute('stroke-linejoin', 'round');
  const chMyst = pill(Lfg, 'a **mystery**. completely different.', LILAC, 30);

  /* ================= title card ================= */
  const titleShot = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#1A0E3A', '#4A2A8A', true) }, titleShot);
  let rays = '';
  for (let i = 0; i < 16; i++) { const a0 = i / 16 * TAU, a1 = a0 + TAU / 40; rays += `M0,0 L${(Math.cos(a0) * 1100).toFixed(0)},${(Math.sin(a0) * 1100).toFixed(0)} L${(Math.cos(a1) * 1100).toFixed(0)},${(Math.sin(a1) * 1100).toFixed(0)} Z `; }
  const rayP = E('path', { d: rays, fill: '#FFE45C', opacity: 0.07 }, titleShot);
  E('ellipse', { cx: 600, cy: 610, rx: 600, ry: 170, fill: glow('#B48CFF'), opacity: 0.35 }, titleShot);
  const logo = G(Lfg);
  const logo1 = T(logo, 0, -78, 'BALANCING', { size: 92, weight: 800, anchor: 'middle', fill: GOLD, ls: 3 });
  const logo2 = T(logo, 0, 6, 'ACT', { size: 72, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 10 });
  [logo1, logo2].forEach(w => { w.setAttribute('stroke', '#140A30'); w.setAttribute('stroke-width', 12); w.setAttribute('paint-order', 'stroke'); w.setAttribute('stroke-linejoin', 'round'); });
  const tBeam = G(logo);   // a balance beam under the logo that wobbles and settles level
  E('rect', { x: -300, y: -8, width: 600, height: 16, rx: 8, fill: '#E2B33C', stroke: '#140A30', 'stroke-width': 4 }, tBeam);
  E('path', { d: 'M-300,8 L-300,30 M300,8 L300,30', stroke: '#140A30', 'stroke-width': 4 }, tBeam);
  E('path', { d: 'M-0,10 L-22,44 L22,44 Z', fill: '#E2B33C', stroke: '#140A30', 'stroke-width': 4 }, logo);
  const epi = T(Lfg, 600, 318, 'Episode 10: The Vault of X', { size: 40, weight: 700, anchor: 'middle', fill: '#FFFFFF' });

  /* ================= the cast ================= */
  const boy = cast(Lcast, 'boy', { s: 0.9 });
  const mum = cast(Lcast, 'mum', { s: 0.95 });
  const kav = cast(Lcast, 'kavya', { s: 0.95 });
  const pri = cast(Lcast, 'priya', { s: 0.95 });
  const dad = cast(Lcast, 'dad', { s: 0.98 });
  const ex = cast(Lcast, 'ex');
  const exTop = cast(Lfg, 'ex', { s: 0.62 });         // Ex standing on the desk for "Let the games begin"
  const lt = { kavya: eqLowerThird(Lhud, 'kavya'), priya: eqLowerThird(Lhud, 'priya'), tan: eqLowerThird(Lhud, 'tan'),
    dad: eqLowerThird(Lhud, 'dad'), ex: eqLowerThird(Lhud, 'ex') };
  const ltOn = (t, who, t0) => lt[who].set(win(t, t0, t0 + 3.1, 0.3));

  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cut points */
  const k = id => at(id) - 0.06;
  const cB = k('gm'), cC = k('sir'), cD = k('weekend'), cE = k('seven'), cF = k('tiny'), cG = k('ex'), cH = k('baddie'),
    cI = k('mystery'), cJ = k('plan'), cK = k('games'), cL = k('title');
  const XS = { boy: 190, mum: 360, kav: 535, pri: 715, dad: 885 }, Y0 = 428;
  const startClock = mid('games', 0.82);

  return t => {
    op(blackout, 1 - P(t, 0, 0.6, linear));
    const sA = on(t, -1, cB), sB = on(t, cB, cC) || on(t, cD, cE), sC = on(t, cC, cD), sE = on(t, cE, cF), sF = on(t, cF, cG),
      sG = on(t, cG, cH) || on(t, cI, cJ), sH = on(t, cH, cI), sJ = on(t, cJ, cK), sK = on(t, cK, cL), sL = on(t, cL, 1e9);
    const lobbyOn = sA || sC || sE || sH || sJ || sK;
    for (const kk in lt) lt[kk].set(0);
    const show = { boy: 0, mum: 0, kav: 0, pri: 0, dad: 0, ex: 0, exTop: 0 };
    [chKav, chSat, chBug, chRooms, chMins, bubSir, chSeven, ch60, ch7, ch1, chGM, chMyst].forEach(c => c.set(0));
    op(chEq, 0); op(chFind, 0);

    /* ---------- the lobby (A, C, E, H, J, K) ---------- */
    op(lobShot, lobbyOn); op(lob.front, lobbyOn); op(lob.top, lobbyOn);
    if (lobbyOn) {
      lob.upd(t);
      // the countdown: 60:00 until Ex starts the game, then it runs
      lob.clock.set(3600 - Math.max(0, t - startClock));
      lob.keypad.set('', 0); op(lob.deskText, sJ || sK ? 0 : 1);
      let k0 = 1, fx = 600, fy = 375;
      if (sA) { const p = P(t, 0, cB, linear); k0 = 1.18 - 0.14 * p; fx = lerp(470, 560, p); fy = 400; }
      if (sE) { const p = P(t, cE, cF - cE, linear); k0 = 1 + 0.08 * p; fx = lerp(600, 640, p); fy = 400; }
      if (sH) { k0 = 1.3; fx = 470; fy = 420; }
      view(lobWrap, k0, fx, fy, 600, 375);
      // everyone lives in the same lobby wrap transform: copy it to the cast layer
      Lcast.setAttribute('transform', lobWrap.getAttribute('transform'));
      Lfront.setAttribute('transform', lobWrap.getAttribute('transform'));
    } else { Lcast.removeAttribute('transform'); Lfront.removeAttribute('transform'); }

    if (sA) {
      show.kav = 1; tr(kav, XS.kav - 120, Y0, 0.95);
      const pUp = P(t, at('priya') - 0.35, 0.35, pop);
      kav.set({ t, talk: 0, mood: t < at('priya') ? 'neutral' : 'happy', look: t < at('priya') ? 0 : 0.8 });
      if (t >= at('priya') - 0.35) { show.pri = 1; tr(pri, XS.pri - 60, lerp(700, Y0, pUp), 0.95); pri.set({ t, talk: scTalk(S, t, 'priya'), mood: 'happy', look: -0.3, lift: t > mid('priya', 0.55) ? 1 : 0 }); }
      ltOn(t, 'kavya', at('kavya') + 1.2);
      if (t >= at('priya')) ltOn(t, 'priya', at('priya') + 0.1);
      popAt(chKav, t, mid('kavya', 0.12), at('priya'), 415, 290);
      popAt(chSat, t, mid('kavya', 0.42), at('priya'), 760, 300);
      popAt(chBug, t, mid('kavya', 0.66), at('priya'), 760, 372);
      popAt(chRooms, t, mid('priya', 0.66), 1e9, 560, 300);
      popAt(chMins, t, mid('priya', 0.85), 1e9, 840, 300);
    }

    if (sC) {
      // the whole family stares at the screen they just heard: Kavya shocked
      show.boy = show.mum = show.kav = show.pri = show.dad = 1;
      const sl = mid('sir', 0.25);
      [[boy, XS.boy, 'shock'], [mum, XS.mum, 'shock'], [kav, XS.kav, 'shock'], [pri, XS.pri, 'shock'], [dad, XS.dad, 'neutral']].forEach(([c, x, m]) => {
        tr(c, x, Y0 + (c === boy ? 14 : 0), c === boy ? 0.9 : c === dad ? 0.98 : 0.95);
        c.set({ t, talk: c === kav ? scTalk(S, t, 'kavya') : 0, mood: t > sl ? m : 'neutral', look: c === kav ? 0.7 : 0.5 });
      });
      popAt(bubSir, t, at('sir') + 0.05, 1e9, XS.kav, 250);
    }

    if (sE) {
      // Dad types SEVEN into the door's keypad: WRONG
      show.dad = show.kav = show.boy = show.pri = show.mum = 1;
      tr(boy, XS.boy, Y0 + 14, 0.9); tr(mum, XS.mum, Y0, 0.95); tr(kav, XS.kav, Y0, 0.95); tr(pri, XS.pri, Y0, 0.95);
      tr(dad, XS.dad + 20, Y0, 0.98);
      const typed = t > mid('seven', 0.6), wrong = t > end('seven') + 0.05;
      dad.set({ t, talk: scTalk(S, t, 'dad'), mood: wrong ? 'shock' : 'smug', look: 0.9, lift: t > mid('seven', 0.45) ? 1 : 0 });
      [boy, mum, kav, pri].forEach(c => c.set({ t, mood: wrong ? 'deadpan' : 'neutral', look: 0.8 }));
      lob.keypad.set(typed ? '7' : '', wrong ? -1 : 0);
      if (typed) lob.keypad.press('7', t < mid('seven', 0.7) ? 1 : 0);
      ltOn(t, 'dad', at('seven') + 0.05);
      popAt(chSeven, t, mid('seven', 0.4), 1e9, 760, 290);
    }

    if (sH) {
      // Ah Boy, close: "So he's the bad guy?"
      show.boy = show.kav = show.mum = 1;
      tr(boy, XS.boy + 60, Y0 + 14, 0.9); tr(mum, XS.mum + 20, Y0, 0.95); tr(kav, XS.kav - 40, Y0, 0.95);
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: 'neutral', look: 0.4, lift: 1 });
      mum.set({ t, mood: 'neutral', look: -0.6 }); kav.set({ t, mood: 'deadpan', look: -0.8 });
    }

    if (sJ) {
      // Kavya explains the game
      show.kav = show.pri = show.dad = show.boy = show.mum = 1;
      [[boy, XS.boy], [mum, XS.mum], [kav, XS.kav], [pri, XS.pri], [dad, XS.dad]].forEach(([c, x]) => tr(c, x, Y0 + (c === boy ? 14 : 0), c === boy ? 0.9 : c === dad ? 0.98 : 0.95));
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: 'smug', look: 0 });
      [boy, mum, pri, dad].forEach((c, i) => c.set({ t, mood: 'neutral', look: i < 2 ? 0.7 : -0.7 }));
      op(chEq, P(t, at('plan') + 0.05, 0.3, linear)); tr(chEq, 600, 262);
      op(chFind, P(t, mid('plan', 0.55), 0.3, linear)); tr(chFind, 600, 612);
    }

    if (sK) {
      // Ex hops onto the desk: 60 minutes, 7 doors, 1 unknown; the clock starts
      show.kav = show.pri = show.dad = show.boy = show.mum = 1; show.exTop = 1;
      [[boy, XS.boy], [mum, XS.mum], [kav, XS.kav], [pri, XS.pri], [dad, XS.dad]].forEach(([c, x]) => tr(c, x, Y0 + (c === boy ? 14 : 0), c === boy ? 0.9 : c === dad ? 0.98 : 0.95));
      const started = t > startClock;
      [boy, mum, kav, pri, dad].forEach((c, i) => c.set({ t, mood: started ? 'shock' : 'neutral', look: i < 2 ? 0.6 : i > 2 ? -0.6 : 0.2 }));
      const jump = P(t, cK, 0.45, pop);
      tr(exTop, 540, lerp(680, 444, jump), 1);
      exTop.set({ t, talk: scTalk(S, t, 'ex'), mood: started ? 'happy' : 'smug', look: 0, cape: Math.sin(t * 3) * 0.6 * AMP });
      popAt(ch60, t, mid('games', 0.04), 1e9, 250, 262);
      popAt(ch7, t, mid('games', 0.2), 1e9, 250, 612);
      popAt(ch1, t, mid('games', 0.36), 1e9, 860, 262);
    }

    /* ---------- B / D: the CCTV close-up ---------- */
    op(monShot, sB);
    if (sB) {
      mon.upd(t);
      const second = t >= cD;
      const push = second ? P(t, cD, cE - cD, linear) : 0;
      view(monWrap, second ? 1.04 + 0.12 * push : 1, 600, second ? 340 : 380, 600, 375);
      mon.tan.set({ t, talk: scTalk(S, t, 'tan'), mood: second ? (t > end('weekend') ? 'smug' : 'deadpan') : 'neutral', look: 0 });
      if (!second) { ltOn(t, 'tan', at('gm') + 0.4); popAt(chGM, t, mid('gm', 0.62), 1e9, 860, 660); }
    }

    /* ---------- F: zoom into the keypad ---------- */
    op(padShot, sF); op(finder, sF);
    if (sF) {
      const z = P(t, cF + 0.3, cG - cF - 0.4, easeIn);
      const kz = Math.pow(7, z);
      const zp = P(t, cF + 0.3, (cG - cF - 0.4) * 0.6, ease);
      view(padWrap, kz, lerp(600, PADX, zp), lerp(420, PADY, zp), 600, 375);
      bigPad.set('', 0);
      op(xBlink, Math.sin(t * 7) > -0.2 ? 1 : 0.25);
      setText(zoomTxt, 'ZOOM ×' + (kz >= 10 ? String(Math.round(kz)) : kz.toFixed(1)));
    }

    /* ---------- G / I: Ex's confessional ---------- */
    conf.set(sG, t);
    op(plaque, 0); op(doors, 0); op(wNever, 0);
    if (sG) {
      show.ex = 1;
      const second = t >= cI;
      const push = second ? P(t, cI, cJ - cI, linear) : 0;
      tr(ex, 330, 420, 1.45 * (1 + 0.06 * push));
      let mood = 'smug', cape = Math.sin(t * 2.2) * 0.3;
      if (!second && t > mid('ex', 0.78)) { mood = 'happy'; cape = Math.sin((t - mid('ex', 0.78)) * 9) * AMP; }
      if (second) mood = t > end('mystery') ? 'smug' : 'neutral';
      ex.set({ t, talk: scTalk(S, t, 'ex'), mood, look: second ? 0.3 : 0, cape });
      if (!second) {
        ltOn(t, 'ex', at('ex') + 0.1);
        const pp = P(t, at('ex') + 0.15, 0.45, pop) * (1 - P(t, mid('ex', 0.4), 0.2, linear));
        op(plaque, clamp(pp * 2.5)); tr(plaque, 850, 330, Math.max(0.01, 0.7 + 0.3 * pp));
        const dp = P(t, mid('ex', 0.42), 0.4, pop) * (1 - P(t, mid('ex', 0.76), 0.2, linear));
        op(doors, clamp(dp * 2.5)); tr(doors, 850, 340, Math.max(0.01, 0.8 + 0.2 * dp));
        const np = P(t, mid('ex', 0.8), 0.3, pop);
        op(wNever, clamp(np * 3)); tr(wNever, 850, 380, Math.max(0.01, 0.5 + 0.5 * np), -4);
      } else popAt(chMyst, t, mid('mystery', 0.4), 1e9, 850, 300);
    }

    /* ---------- L: title card ---------- */
    op(titleShot, sL); op(logo, 0); op(epi, 0);
    if (sL) {
      tr(rayP, 600, 600, 1, (t * 6 * AMP) % 360);
      const lp = P(t, at('title') + 0.05, 0.6, pop);
      op(logo, clamp(lp * 2.5)); tr(logo, 600, 196, Math.max(0.01, 0.5 + 0.5 * lp));
      const wob = (1 - P(t, at('title') + 0.3, 2.2, easeOut)) * Math.sin((t - at('title')) * 7) * 6 * AMP;
      tr(tBeam, 0, 44, 1, wob);
      op(epi, P(t, mid('title', 0.42), 0.4, linear));
      const castT = i => mid('title', 0.5) + i * 0.13, xs = [170, 380, 600, 820, 1030];
      const row = [[boy, 'happy', 0.74, 'boy'], [pri, 'happy', 0.78, 'pri'], [ex, 'smug', 0.66, 'ex'], [kav, 'smug', 0.82, 'kav'], [dad, 'smug', 0.78, 'dad']];
      row.forEach(([c, mood, s, key], i) => {
        const p = P(t, castT(i), 0.45, pop);
        show[key] = 1; op(c, clamp(p * 3));
        tr(c, xs[i], 540 + 30 * (1 - clamp(p)), Math.max(0.01, s * p));
        c.set({ t, mood, look: 0, lift: 0, cape: 0 });
      });
    }

    /* characters not in this shot */
    if (!sL) { op(boy, show.boy); op(pri, show.pri); op(ex, show.ex); op(kav, show.kav); op(dad, show.dad); }
    op(mum, show.mum); op(exTop, show.exTop);
  };
});
