/* Scene 0: Cold open (no chapter card).
   10 a.m., the lift lobby of Block 208: Kavya, 12; the lift arrives -> inside the lift, the crowd is named one by one
   (Mum with the rice, Dad, Ah Boy, Priya, Mr Tan) while the display counts up the floors -> Kavya: "Lives downstairs"
   -> Mr Tan: "Lovely day for place value" -> CLUNK: the display is stuck on 10 -> Dad presses the alarm: "How long
   can it take?" (everyone turns to camera) -> Mr Tan's pun lands to lift music -> documentary push-in on the display
   -> the Index pops up at the superscript position of the "10": index, power, exponent -> "I have NOT lost my power"
   -> Big Ten steps out of the display (base / index labels) -> "Ten." -> back in the lift, Big Ten squeezed in behind
   the humans: 6 humans, stuck on 10 -> title card. */
scene('cold', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);          // hard sitcom cut
  const view = (el, k, fx, fy, sx, sy) => el.setAttribute('transform', `translate(${sx.toFixed(1)} ${sy.toFixed(1)}) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 2, color: o.color || C.ink, weight: 700 }); };
  const outline = (el, col, w) => { el.setAttribute('stroke', col); el.setAttribute('stroke-width', w); el.setAttribute('paint-order', 'stroke'); el.setAttribute('stroke-linejoin', 'round'); return el; };
  const GOLD = '#FFE45C', AMBER = SF.amber;

  /* layers: sets, characters, the lift's handrail, foreground, HUD */
  const Lbg = G(root), Lcast = G(root), Lfront = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= A: the lift lobby ================= */
  const lobShot = G(Lbg), lobWrap = G(lobShot);
  const lobby = sfLobby(lobWrap);
  const aChips = G(Lfg);
  const cKav = pill(aChips, 'Kavya, age 12', { size: 32 });
  const cSat = pill(aChips, 'Saturday, 10 a.m.', { size: 30, color: GOLD, stroke: GOLD });
  const cBlk = pill(aChips, 'Blk 208, lift lobby', { size: 28 });
  const kavA = cast(Lfg, 'kavya');                                  // Kavya in the lobby (her own shot)
  aChips.parentNode.insertBefore(kavA, aChips);

  /* ================= B, C, H: inside the lift ================= */
  const liftShot = G(Lbg), liftWrap = G(liftShot);
  const lift = sfLift(liftWrap);
  const frontWrap = G(Lfront);
  frontWrap.appendChild(lift.front); frontWrap.appendChild(lift.top);   // the handrail sits in front of Lcast
  const names = G(Lfg);
  const nameChip = (txt) => mkChip(names, txt, { size: 26, col: '#9FD8FF' });
  const nMum = nameChip('Mum'), nDad = nameChip('Dad'), nBoy = nameChip('Ah Boy'), nPri = nameChip('Priya'), nTan = nameChip('Mr Tan');
  const cUp = pill(Lfg, 'lives on floor 11', { size: 28, color: GOLD, stroke: GOLD });
  const clunk = outline(T(Lfg, 0, 0, 'CLUNK!', { size: 120, weight: 800, anchor: 'middle', fill: '#FF8A3D' }), '#3A1A00', 12);
  const cStuck = pill(Lfg, 'STUCK: 0 min', { size: 30, color: '#FF8A8A', stroke: '#FF8A8A' });
  const cMusic = pill(Lfg, '♪ lift music ♪', { size: 30, color: '#B9F0C8', stroke: '#B9F0C8' });
  const c6 = pill(Lfg, '6 humans', { size: 34, color: GOLD, stroke: GOLD });
  const c10 = pill(Lfg, 'stuck on 10', { size: 34, color: AMBER, stroke: AMBER });
  const cMind = pill(Lfg, 'mind the zeros', { size: 36, color: '#FFFFFF', stroke: AMBER });

  /* ================= D, E: the display close-up ================= */
  const dispShot = G(Lbg), dispWrap = G(dispShot);
  const disp = sfDisplay(dispWrap);
  disp.arrow(0);
  const finder = G(Lhud);
  E('path', { d: 'M40,140 L40,40 L140,40 M1060,40 L1160,40 L1160,140 M1160,610 L1160,710 L1060,710 M140,710 L40,710 L40,610', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 5, opacity: 0.8 }, finder);
  const zoomTxt = T(finder, 1130, 690, 'ZOOM ×1', { size: 30, weight: 700, anchor: 'end', fill: '#FFFFFF' });
  const recDot = E('circle', { cx: 1066, cy: 630, r: 10, fill: '#FF3B3B' }, finder);
  T(finder, 1130, 640, 'REC', { size: 28, weight: 700, anchor: 'end', fill: '#FFFFFF' });
  const nameW = ['index', 'power', 'exponent'].map((w, i) => mkChip(Lfg, `**${w}**`, { size: 34, col: [GOLD, '#FF8A8A', '#9FD8FF'][i] }));
  const tagBase = mkChip(Lfg, 'the **base**', { size: 32, col: AMBER });
  const tagIdx = mkChip(Lfg, 'the **index**', { size: 32, col: GOLD });
  const arBase = arrow(Lfg, 300, 470, 400, 450, { color: AMBER, width: 5 });
  const arIdx = arrow(Lfg, 960, 170, 790, 230, { color: GOLD, width: 5, bend: 30 });
  const eqn = G(Lfg);
  E('rect', { x: -170, y: -60, width: 340, height: 120, rx: 22, fill: 'rgba(10,27,39,0.92)', stroke: GOLD, 'stroke-width': 3 }, eqn);
  mkMath(eqn, 0, 26, '10^n', { size: 80, fill: GOLD, anchor: 'middle' });

  /* ================= I: title card ================= */
  const titleShot = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#14161C', '#2E2A20', true) }, titleShot);
  let rays = '';
  for (let i = 0; i < 16; i++) { const a0 = i / 16 * TAU, a1 = a0 + TAU / 40; rays += `M0,0 L${(Math.cos(a0) * 1100).toFixed(0)},${(Math.sin(a0) * 1100).toFixed(0)} L${(Math.cos(a1) * 1100).toFixed(0)},${(Math.sin(a1) * 1100).toFixed(0)} Z `; }
  const rayP = E('path', { d: rays, fill: AMBER, opacity: 0.07 }, titleShot);
  const bigSeg = sfSeg(titleShot, '10', { h: 420, dim: 'rgba(255,176,32,0.04)', col: 'rgba(255,176,32,0.10)', anchor: 'middle' }); tr(bigSeg, 600, 300);
  E('ellipse', { cx: 600, cy: 610, rx: 620, ry: 170, fill: glow('#FFB020'), opacity: 0.3 }, titleShot);
  const logo = G(Lfg);
  const logo1 = outline(T(logo, 0, -78, 'MIND THE', { size: 60, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 8 }), '#1A1206', 12);
  const logo2 = outline(T(logo, 0, 26, 'ZEROS', { size: 132, weight: 800, anchor: 'middle', fill: AMBER, ls: 6 }), '#1A1206', 14);
  const epi = T(Lfg, 600, 296, 'Episode 3: Stuck on Ten', { size: 42, weight: 700, anchor: 'middle', fill: '#FFFFFF' });

  /* ================= the cast ================= */
  const ten = cast(Lcast, 'ten');                   // drawn first: in the lift he stands behind the humans
  const idx = cast(Lcast, 'index', { val: 'n' });
  const LS = 0.84, LY = 500;                         // humans in the lift: scale, centre y
  const XS = { kavya: 165, mum: 325, dad: 485, boy: 640, priya: 790, tan: 945 };
  const kav = cast(Lcast, 'kavya', { s: LS });
  const mum = cast(Lcast, 'mum', { s: LS });
  sfRice(mum.hand, 0.62);                            // Mum holds up the rice
  const dad = cast(Lcast, 'dad', { s: LS });
  const boy = cast(Lcast, 'boy', { s: LS });
  const priya = cast(Lcast, 'priya', { s: LS });
  const tan = cast(Lcast, 'tan', { s: LS });
  const H = { kavya: kav, mum, dad, boy, priya, tan };
  const lt = { kavya: sfLowerThird(Lhud, 'kavya'), tan: sfLowerThird(Lhud, 'tan'), boy: sfLowerThird(Lhud, 'boy'), dad: sfLowerThird(Lhud, 'dad'),
    index: sfLowerThird(Lhud, 'index'), ten: sfLowerThird(Lhud, 'ten') };
  const ltOn = (t, who, t0) => lt[who].set(win(t, t0, t0 + 3.1, 0.3));
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cut points */
  const cB = at('crowd') - 0.06, cD = at('tiny') - 0.06, cH = at('stuck') - 0.06, cI = at('title') - 0.06;
  const tClunk = at('clunk') - 0.35;                // the lift jolts in the gap before Ah Boy's line
  const humanT = { mum: mid('crowd', 0.12), dad: mid('crowd', 0.22), boy: mid('crowd', 0.32), priya: mid('crowd', 0.5), tan: mid('crowd', 0.8) };
  const DX = 560, DY = 360;                          // centre of the "10" on the display close-up
  const tenOut = mid('ten', 0.22);                   // Big Ten steps out of the display

  return t => {
    op(blackout, 1 - P(t, 0, 0.6, linear));
    const sA = on(t, -1, cB), sB = on(t, cB, cD), sD = on(t, cD, cH), sH = on(t, cH, cI), sI = on(t, cI, 1e9);
    for (const k in lt) lt[k].set(0);
    const show = { ten: 0, idx: 0, kav: 0, mum: 0, dad: 0, boy: 0, priya: 0, tan: 0 };

    /* ---------- A: the lobby ---------- */
    op(lobShot, sA); op(aChips, sA); op(kavA, sA);
    if (sA) {
      const push = P(t, 0, cB, linear);
      view(lobWrap, 1 + 0.08 * push, 420, 420, 420, 420);
      const floor = Math.max(1, 3 - Math.floor(P(t, 0.8, mid('kavya', 0.75) - 0.8, linear) * 2.999));
      lobby.disp[0].set(String(floor));
      lobby.open(P(t, mid('kavya', 0.8), 0.7, ease));
      tr(kavA, 250, 560, 1.0);
      kavA.set({ t, talk: 0, mood: t < mid('kavya', 0.6) ? 'neutral' : 'happy', look: 0.8 });
      popIn(cKav, t, mid('kavya', 0.05), 250, 350);
      popIn(cSat, t, mid('kavya', 0.4), 770, 330);
      popIn(cBlk, t, mid('kavya', 0.62), 770, 400);
      ltOn(t, 'kavya', at('kavya') + 1.4);
    }

    /* ---------- B, C, H: inside the lift ---------- */
    const liftOn = sB || sH;
    op(liftShot, liftOn); op(frontWrap, liftOn);
    [nMum, nDad, nBoy, nPri, nTan].forEach(c => c.set(0));
    op(cUp, 0); op(clunk, 0); op(cStuck, 0); op(cMusic, 0); op(c6, 0); op(c10, 0); op(cMind, 0);
    if (liftOn) {
      lift.upd(t);
      // the floors count up while the lift rises, then it is stuck on 10
      const fl = sB ? Math.min(10, 1 + Math.floor(P(t, at('crowd'), tClunk - at('crowd'), linear) * 9.999)) : 10;
      lift.disp.set(String(fl));
      lift.press(12, 1); lift.press(11, sB && t < tClunk ? 1 : 0);
      lift.dim(P(t, tClunk, 0.2, linear));
      lift.alarm(t > mid('hard', 0.45) && (t < end('hard') + 1.2 || sH) && Math.sin(t * 9) > -0.2 ? 1 : 0);
      // the jolt
      const j = t > tClunk ? Math.exp(-(t - tClunk) * 7) : 0, shake = Math.sin(t * 70) * 10 * j * AMP;
      tr(liftWrap, 0, shake); tr(frontWrap, 0, shake);
    }
    if (sB) {
      // who is in the lift
      ['kavya', 'mum', 'dad', 'boy', 'priya', 'tan'].forEach(k => {
        const key = k === 'kavya' ? 'kav' : k;
        const t0 = k === 'kavya' ? -1 : humanT[k];
        if (t < t0) return;
        show[key] = 1;
        const p = k === 'kavya' ? 1 : P(t, t0, 0.35, pop);
        tr(H[k], XS[k], LY + (k === 'boy' ? 22 : 0) + 120 * (1 - clamp(p)), LS);
      });
      const nm = [[nMum, 'mum'], [nDad, 'dad'], [nBoy, 'boy'], [nPri, 'priya'], [nTan, 'tan']];
      nm.forEach(([c, k]) => { c.set(win(t, humanT[k] + 0.1, end('crowd') + 0.3, 0.25)); tr(c, XS[k], 330 + (k === 'boy' ? 30 : 0)); });
      // moods
      const stuck = t > tClunk, sp = scWho(S, t);
      const lookAt = who => who && XS[who] !== undefined ? who : null;
      const spk = lookAt(sp);
      ['kavya', 'mum', 'dad', 'boy', 'priya', 'tan'].forEach(k => {
        let mood = 'neutral', look = 0, lift_ = 0;
        if (spk && spk !== k) look = clamp((XS[spk] - XS[k]) / 300, -1, 1);
        if (spk === k) look = 0;
        if (t < at('upstairs')) { mood = k === 'boy' ? 'happy' : k === 'tan' ? 'happy' : 'neutral'; look = k === 'kavya' ? 0.6 : look; }
        if (k === 'kavya' && t >= at('upstairs') && t < at('clunk')) mood = 'deadpan';
        if (k === 'tan' && t >= at('upstairs') && t < tClunk) { mood = 'happy'; if (t >= at('morning')) lift_ = 1; }
        if (stuck) mood = 'shock';
        if (stuck && t > end('clunk')) mood = k === 'boy' ? 'shock' : 'neutral';
        if (t >= at('hard')) {
          if (k === 'dad') { mood = 'smug'; look = 0.6; }
          if (t > end('hard') && t < at('pun')) { look = 0; mood = k === 'dad' ? 'smug' : 'deadpan'; }   // everyone turns to camera
        }
        if (t >= at('pun')) { mood = k === 'tan' ? 'happy' : 'deadpan'; look = k === 'tan' ? 0 : clamp((XS.tan - XS[k]) / 300, -1, 1); if (t > end('pun')) look = 0; }
        if (k === 'boy' && t >= at('clunk') && t < end('clunk')) lift_ = 1;
        if (k === 'mum' && t >= humanT.mum && t < end('crowd')) lift_ = 1;
        H[k].set({ t, talk: scTalk(S, t, k), mood, look, lift: lift_ });
      });
      // chips
      if (t > mid('upstairs', 0.55) && t < end('morning')) popIn(cUp, t, mid('upstairs', 0.55), XS.tan, 300);
      ltOn(t, 'tan', mid('upstairs', 0.3));
      if (t > tClunk && t < tClunk + 1.0) { op(clunk, 1 - P(t, tClunk + 0.6, 0.4, linear)); tr(clunk, 600, 250, 0.7 + 0.3 * P(t, tClunk, 0.25, pop), -4); }
      ltOn(t, 'boy', at('clunk') + 0.1);
      ltOn(t, 'dad', at('hard') + 0.05);
      if (t > end('hard') - 0.2) popIn(cStuck, t, end('hard') - 0.2, 900, 160);
      if (t > end('pun') + 0.05) popIn(cMusic, t, end('pun') + 0.05, 600, 170);
    }

    /* ---------- D, E: the display close-up ---------- */
    op(dispShot, sD); op(finder, sD);
    nameW.forEach(c => c.set(0)); tagBase.set(0); tagIdx.set(0); arBase.set(0); arIdx.set(0); op(arBase, 0); op(arIdx, 0); op(eqn, 0);
    if (sD) {
      const z = P(t, cD + 0.2, at('hi') - cD, ease);
      const k = lerp(1, 1.18, z);
      view(dispWrap, k, DX + 40, DY, 600, 380);
      setText(zoomTxt, 'ZOOM ×' + k.toFixed(1));
      op(recDot, Math.sin(t * TAU * 0.8) > 0 ? 1 : 0.2);
      const out = P(t, tenOut, 0.5, pop);
      disp.seg.set(t < tenOut ? '10' : '  ');
      // the Index pops up at the superscript position of the 10
      if (t >= at('hi') - 0.1) {
        show.idx = 1;
        const ip = P(t, at('hi') - 0.1, 0.45, pop);
        const sx = 820, sy = 190, per = sfPerch(DX, DY + 70, 1.25);
        const m = P(t, tenOut, 0.6, ease);
        tr(idx, lerp(sx, per[0], m), lerp(sy, per[1], m), Math.max(0.01, lerp(0.95 * ip, per[2], m)));
        let im = 'smug';
        if (t >= at('lost') && t < at('ten')) im = 'annoyed';
        idx.set({ t, talk: scTalk(S, t, 'index'), mood: im, look: t >= at('bigten') ? -0.7 : 0, val: 'n', point: t > mid('ten', 0.75) && t < at('bigten') ? 1 : 0 });
        ltOn(t, 'index', at('hi') + 0.2);
        // index, power, exponent
        if (t < at('lost')) nameW.forEach((c, i) => { c.set(P(t, mid('hi', [0.42, 0.64, 0.86][i]), 0.35, linear)); tr(c, 1000, 330 + i * 90); });
      }
      // Big Ten steps out of the display
      if (t >= tenOut) {
        show.ten = 1;
        tr(ten, DX, DY + 70 + 30 * (1 - clamp(out)), Math.max(0.01, 1.25 * (0.7 + 0.3 * out)));
        ten.set({ t, talk: scTalk(S, t, 'ten'), mood: 'deadpan', look: t >= at('stuck') ? 0 : 0.3, glow: 1, flex: t > mid('ten', 0.45) && t < at('bigten') ? 1 : 0 });
        ltOn(t, 'ten', tenOut + 0.2);
        if (t > mid('ten', 0.3)) {
          tagBase.set(P(t, mid('ten', 0.3), 0.35, linear)); tr(tagBase, 200, 470);
          op(arBase, 1); arBase.set(P(t, mid('ten', 0.35), 0.4, linear));
          tagIdx.set(P(t, mid('ten', 0.6), 0.35, linear)); tr(tagIdx, 1040, 160);
          op(arIdx, 1); arIdx.set(P(t, mid('ten', 0.65), 0.4, linear));
        }
        if (t > at('bigten')) { op(eqn, P(t, at('bigten') + 0.2, 0.3, linear)); tr(eqn, 1040, 470, 0.8); }
      }
    }

    /* ---------- H: back in the lift: six humans, stuck on Ten ---------- */
    if (sH) {
      show.ten = 1; show.idx = 1;
      const tp = P(t, cH, 0.4, pop);
      tr(ten, 560, 270, 0.92 * (0.85 + 0.15 * tp));
      ten.set({ t, mood: 'deadpan', look: 0, glow: 0.8 });
      tr(idx, ...sfPerch(560, 270, 0.92));
      idx.set({ t, talk: scTalk(S, t, 'index'), mood: 'smug', look: 0, val: 'n', point: t > mid('stuck', 0.6) ? 1 : 0 });
      ['kavya', 'mum', 'dad', 'boy', 'priya', 'tan'].forEach(k => {
        const key = k === 'kavya' ? 'kav' : k; show[key] = 1;
        tr(H[k], XS[k], LY + (k === 'boy' ? 22 : 0), LS);
        H[k].set({ t, mood: t < mid('stuck', 0.5) ? 'shock' : k === 'boy' ? 'happy' : 'deadpan', look: clamp((560 - XS[k]) / 400, -1, 1) });
      });
      popIn(c6, t, mid('stuck', 0.05), 230, 170);
      popIn(c10, t, mid('stuck', 0.25), 230, 250);
      if (t > mid('stuck', 0.6)) popIn(cMind, t, mid('stuck', 0.6), 860, 200);
    }

    /* ---------- I: title card ---------- */
    op(titleShot, sI); op(logo, 0); op(epi, 0);
    if (sI) {
      tr(rayP, 600, 600, 1, (t * 6 * AMP) % 360);
      const lp = P(t, at('title') + 0.05, 0.6, pop);
      op(logo, clamp(lp * 2.5)); tr(logo, 600, 190, Math.max(0.01, 0.5 + 0.5 * lp));
      op(epi, P(t, mid('title', 0.42), 0.4, linear));
      const castT = i => mid('title', 0.5) + i * 0.13, xs = [170, 380, 600, 820, 1030];
      const row = [[kav, 'smug', 0.82, 'kav'], [boy, 'happy', 0.84, 'boy'], [ten, 'deadpan', 0.62, 'ten'], [dad, 'smug', 0.72, 'dad'], [tan, 'happy', 0.72, 'tan']];
      row.forEach(([c, mood, s, key], i) => {
        const p = P(t, castT(i), 0.45, pop);
        show[key] = 1; op(c, clamp(p * 3));
        tr(c, xs[i], 560 + 30 * (1 - clamp(p)), Math.max(0.01, s * p));
        c.set({ t, mood, look: 0, lift: 0, glow: 1 });
      });
      const ip = P(t, castT(2) + 0.25, 0.45, pop);
      show.idx = 1; op(idx, clamp(ip * 3));
      const per = sfPerch(600, 560, 0.62);
      tr(idx, per[0], per[1], Math.max(0.01, per[2] * ip));
      idx.set({ t, mood: 'smug', val: 'n', point: 1 });
    }

    /* characters not in this shot */
    op(ten, show.ten); op(idx, show.idx);
    op(kav, show.kav); op(mum, show.mum); op(dad, show.dad); op(boy, show.boy); op(priya, show.priya); op(tan, show.tan);
  };
});
