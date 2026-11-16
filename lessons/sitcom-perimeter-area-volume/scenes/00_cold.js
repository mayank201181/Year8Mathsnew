/* Scene 0: Cold open (no chapter card).
   A  Blk 417, the renovating unit on the fifth floor puffing dust: Kavya, 12 (lower third).
   B  the living room mid-renovation: Mum with the party invitation (3 weeks, 40 guests) -> Kavya: "no floor" ->
      Uncle Bala rises behind the workbench ("can, can!"), his tape measure bites him: "Ow." -> Dad with his own tape:
      "biggest number" (star chip).
   C  documentary zoom into Uncle Bala's toolbox: the lid opens, a set square peeks out.
   D  Madam Perpendicular's confessional: plaque (set square, one right angle, 90°) -> the height board: a triangle,
      the dashed perpendicular height (height ✓), the sloping side in red (not a height ✗).
   E  Dad stretches his tape corner to corner across the wall: "longer!"; Madam P annoyed on the bench.
   F  Madam P on the workbench, Kavya, Uncle Bala and Dad behind: 3 weeks, 1 flat, 1 man who measures diagonally.
   G  title card: the cardboard-box logo, Episode 15: The Great Renovation, the cast pops in. */
scene('cold', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);          // hard sitcom cut
  const view = (el, k, fx, fy, sx, sy) => el.setAttribute('transform', `translate(${sx.toFixed(1)} ${sy.toFixed(1)}) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); };
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 2, color: o.color || C.ink, weight: 700 }); };
  const outline = (el, col, w) => { el.setAttribute('stroke', col); el.setAttribute('stroke-width', w); el.setAttribute('paint-order', 'stroke'); el.setAttribute('stroke-linejoin', 'round'); return el; };
  const GOLD = '#FFE45C', CYAN = AV_COL.area, RED = AV_COL.height, GREEN = '#56D69B';

  /* layers: sets, characters behind the bench, the bench, foreground, HUD */
  const Lbg = G(root), Lcast = G(root), Lfront = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= A: Blk 417 ================= */
  const blockShot = G(Lbg), blockWrap = G(blockShot);
  const block = avBlock(blockWrap);
  const aChips = G(Lfg);
  const cKav = pill(aChips, 'Kavya, age 12', { size: 32 });
  const cBlk = pill(aChips, 'Blk 417, #05-17', { size: 30, color: GOLD, stroke: GOLD });
  const cDay = pill(aChips, 'renovation: day 0', { size: 28 });

  /* ================= B, E, F: the living room ================= */
  const flatShot = G(Lbg);
  const flat = avFlat(flatShot);
  Lfront.appendChild(flat.front); Lfront.appendChild(flat.top);       // the bench sits in front of Lcast
  const c3w = pill(Lfg, '3 weeks', { size: 32, color: GOLD, stroke: GOLD });
  const cNoFloor = pill(Lfg, 'floor: none', { size: 30, color: '#FF8A8A', stroke: '#FF8A8A' });
  const star = G(Lfg);
  const starChip = pill(star, 'BIGGEST NUMBER', { size: 28, color: GOLD, stroke: GOLD });
  const starIcon = G(star);
  E('path', { d: 'M0,-22 L6,-7 L22,-7 L9,3 L14,19 L0,9 L-14,19 L-9,3 L-22,-7 L-6,-7 Z', fill: GOLD, stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, starIcon);
  tr(starChip, 0, 0); tr(starIcon, 150, -30);
  // E: Dad's diagonal tape across the wall, and the height for comparison
  const diagG = G(flatShot);
  const D0 = [330, 100], D1 = [860, 500];
  const diagTape = E('line', { x1: D0[0], y1: D0[1], x2: D0[0], y2: D0[1], stroke: '#FFE45C', 'stroke-width': 16, 'stroke-linecap': 'round' }, diagG);
  const diagTicks = E('line', { x1: D0[0], y1: D0[1], x2: D0[0], y2: D0[1], stroke: SC_INK, 'stroke-width': 8, 'stroke-dasharray': '2 14' }, diagG);
  const vertG = G(flatShot);
  E('line', { x1: 860, y1: 100, x2: 860, y2: 500, stroke: GREEN, 'stroke-width': 6, 'stroke-dasharray': '14 10' }, vertG);
  E('line', { x1: 330, y1: 500, x2: 860, y2: 500, stroke: GREEN, 'stroke-width': 4, 'stroke-dasharray': '6 8', opacity: 0.7 }, vertG);
  const vm = mkAngleMark(vertG, 860, 500, 90, 180, { r: 50, col: GREEN, width: 5 }); vm.set(1);
  const vLab = T(vertG, 846, 310, 'height', { size: 30, weight: 800, anchor: 'end', fill: GREEN });
  outline(vLab, '#1A2430', 7);
  const cLonger = pill(Lfg, 'corner to corner: longer!', { size: 30, color: GOLD, stroke: GOLD });
  // F: the charge
  const cWeeks = pill(Lfg, '3 weeks', { size: 34, color: GOLD, stroke: GOLD });
  const cFlat = pill(Lfg, '1 flat', { size: 34, color: GOLD, stroke: GOLD });
  const cMan = pill(Lfg, '1 man who measures diagonally', { size: 30, color: '#FF8A8A', stroke: '#FF8A8A' });

  /* ================= C: zoom into the toolbox ================= */
  const boxShot = G(Lbg), boxWrap = G(boxShot);
  E('rect', { x: -400, y: -300, width: 2000, height: 760, fill: linGrad('#E9E4DA', '#CFC6B4', true) }, boxWrap);   // the wall close up
  E('rect', { x: -400, y: 460, width: 2000, height: 700, fill: linGrad('#E2C08A', '#B88A50', true) }, boxWrap);    // the bench top
  E('path', { d: 'M-400,470 L1600,470', stroke: AV_COL.woodDk, 'stroke-width': 4 }, boxWrap);
  const tbox = avToolbox(boxWrap, { s: 1.6 }); tr(tbox, 600, 640);
  const perpBox = cast(tbox.inside, 'perp', { s: 0.6, mood: 'deadpan' });
  tr(perpBox, -10, -170);
  const finder = G(Lhud);
  E('path', { d: 'M40,140 L40,40 L140,40 M1060,40 L1160,40 L1160,140 M1160,610 L1160,710 L1060,710 M140,710 L40,710 L40,610', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 5, opacity: 0.8 }, finder);
  const zoomTxt = T(finder, 1130, 690, 'ZOOM ×1', { size: 30, weight: 700, anchor: 'end', fill: '#FFFFFF' });

  /* ================= D: Madam Perpendicular's confessional ================= */
  const conf = avConf(Lbg, 'perp');
  const plaque = G(Lfg);
  E('rect', { x: -250, y: -160, width: 500, height: 320, rx: 18, fill: '#0E2A24', stroke: '#9FE8D0', 'stroke-width': 5 }, plaque);
  outline(T(plaque, 0, -96, 'SET SQUARE', { size: 44, weight: 800, anchor: 'middle', fill: '#9FE8D0', ls: 2 }), '#0E2A24', 2);
  E('path', { d: 'M-60,90 L-60,-40 L80,90 Z', fill: 'rgba(150,232,208,0.35)', stroke: '#9FE8D0', 'stroke-width': 5, 'stroke-linejoin': 'round' }, plaque);
  const pm = mkAngleMark(plaque, -60, 90, 0, 90, { r: 52, col: RED, width: 5 }); pm.set(1);
  T(plaque, -20, 66, '90°', { size: 34, weight: 800, fill: '#FFFFFF' });
  T(plaque, 130, 10, 'one', { size: 30, weight: 700, anchor: 'middle', fill: '#CFE8DF', font: FB });
  T(plaque, 130, 46, 'right angle', { size: 30, weight: 700, anchor: 'middle', fill: '#CFE8DF', font: FB });
  // the height board
  const board = G(Lfg);
  E('rect', { x: -310, y: -230, width: 620, height: 460, rx: 20, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, board);
  const TA = [-230, 120], TB = [210, 120], TC = [-60, -150], TH = [-60, 120];
  E('path', { d: mkPoly([TA, TB, TC]), fill: 'rgba(76,201,240,0.18)', stroke: MK.ink, 'stroke-width': 5, 'stroke-linejoin': 'round' }, board);
  T(board, -10, 170, 'base', { size: 30, weight: 700, anchor: 'middle', fill: MK.ink });
  const hLine = mkDash(E('line', { x1: TC[0], y1: TC[1], x2: TH[0], y2: TH[1], stroke: '#1E9E5A', 'stroke-width': 6 }, board));
  hLine.setAttribute('stroke-dasharray', '1 1');
  const hDash = E('line', { x1: TC[0], y1: TC[1], x2: TH[0], y2: TH[1], stroke: MK.paper, 'stroke-width': 7, 'stroke-dasharray': '12 10' }, board);
  const hMark = mkAngleMark(board, TH[0], TH[1], 0, 90, { r: 44, col: '#1E9E5A', width: 4 });
  const hLab = mkText(board, -42, 50, '**height** ✓', { size: 32, anchor: 'start', fill: '#1E9E5A' });
  const slope = E('line', { x1: TC[0], y1: TC[1], x2: TB[0], y2: TB[1], stroke: RED, 'stroke-width': 9, 'stroke-linecap': 'round' }, board);
  const sLab = mkText(board, 96, -52, '**not** a height', { size: 30, anchor: 'start', fill: '#C62828' });
  const sX = cross(board, 18, '#C62828'); tr(sX, 276, -62);

  /* ================= G: title card ================= */
  const titleShot = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#0E3A5A', '#1E6E8C', true) }, titleShot);
  let rays = '';
  for (let i = 0; i < 16; i++) { const a0 = i / 16 * TAU, a1 = a0 + TAU / 40; rays += `M0,0 L${(Math.cos(a0) * 1100).toFixed(0)},${(Math.sin(a0) * 1100).toFixed(0)} L${(Math.cos(a1) * 1100).toFixed(0)},${(Math.sin(a1) * 1100).toFixed(0)} Z `; }
  const rayP = E('path', { d: rays, fill: '#FFE45C', opacity: 0.07 }, titleShot);
  E('ellipse', { cx: 600, cy: 620, rx: 620, ry: 170, fill: glow('#4CC9F0'), opacity: 0.3 }, titleShot);
  const logo = G(Lfg);
  // the cardboard box: back flaps, front face, front flaps
  E('path', { d: 'M-300,-120 L-250,-190 L250,-190 L300,-120 Z', fill: '#B9864A', stroke: SC_INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, logo);
  const flapL = E('path', { d: '', fill: '#EBC48A', stroke: SC_INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, logo);
  const flapR = E('path', { d: '', fill: '#EBC48A', stroke: SC_INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, logo);
  E('rect', { x: -300, y: -120, width: 600, height: 230, rx: 6, fill: '#D9A766', stroke: SC_INK, 'stroke-width': 6 }, logo);
  E('rect', { x: -40, y: -120, width: 80, height: 40, fill: '#C9B48A', opacity: 0.85 }, logo);
  const lg1 = outline(T(logo, 0, -24, 'THINK INSIDE', { size: 56, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 4 }), '#5A3A1A', 10);
  const lg2 = outline(T(logo, 0, 76, 'THE BOX', { size: 96, weight: 800, anchor: 'middle', fill: GOLD, ls: 6 }), '#5A3A1A', 12);
  const epi = T(Lfg, 600, 400, 'Episode 15: The Great Renovation', { size: 42, weight: 700, anchor: 'middle', fill: '#FFFFFF' });

  /* ================= the cast ================= */
  const mum = cast(Lcast, 'mum', { hand: true });
  const invite = G(mum.hand); tr(invite, -40, -30, 1, -8);
  E('rect', { x: -80, y: -56, width: 160, height: 112, rx: 8, fill: '#FFFDF6', stroke: SC_INK, 'stroke-width': 3 }, invite);
  T(invite, 0, -14, 'HOUSEWARMING!', { size: 19, weight: 800, anchor: 'middle', fill: '#B8336A' });
  T(invite, 0, 22, '40 guests', { size: 24, weight: 800, anchor: 'middle', fill: SC_INK });
  const bala = cast(Lcast, 'bala');
  const dad = cast(Lcast, 'dad');
  const kavB = cast(Lcast, 'kavya');                 // behind the bench (and on the title card)
  const perp = cast(Lcast, 'perp');
  const kavF = cast(Lfg, 'kavya');                   // foreground, in front of the bench
  const lt = { kavya: avLowerThird(Lhud, 'kavya'), mum: avLowerThird(Lhud, 'mum'), bala: avLowerThird(Lhud, 'bala'), dad: avLowerThird(Lhud, 'dad'), perp: avLowerThird(Lhud, 'perp') };
  const ltOn = (t, who, t0) => lt[who].set(win(t, t0, t0 + 3.1, 0.3));

  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cut points */
  const cB = at('mum') - 0.06, cC = at('tiny') - 0.06, cD = at('hi') - 0.06, cE = at('diag') - 0.06,
    cF = at('charge') - 0.06, cG = at('title') - 0.06;
  const BALA_X = 800, DAD_X = 1030, MUM_X = 560;

  return t => {
    op(blackout, 1 - P(t, 0, 0.6, linear));
    const sA = on(t, -1, cB), sB = on(t, cB, cC), sC = on(t, cC, cD), sD = on(t, cD, cE), sE = on(t, cE, cF),
      sF = on(t, cF, cG), sG = on(t, cG, 1e9);
    const flatOn = sB || sE || sF;
    for (const k in lt) lt[k].set(0);
    const show = { mum: 0, bala: 0, dad: 0, kavB: 0, perp: 0, kavF: 0 };

    /* ---------- A: Blk 417 ---------- */
    op(blockShot, sA); op(aChips, 0);
    if (sA) {
      block.upd(t);
      const push = P(t, 0, cB, linear);
      view(blockWrap, 1 + 0.5 * push, block.unit[0], block.unit[1], lerp(block.unit[0], 760, push), lerp(block.unit[1], 300, push));
      show.kavF = 1;
      tr(kavF, 230, 580, 1.1);
      kavF.set({ t, talk: 0, mood: t < mid('kavya', 0.55) ? 'neutral' : 'deadpan', look: 0.7 });
      op(aChips, 1);
      popIn(cKav, t, mid('kavya', 0.08), 230, 330);
      popIn(cBlk, t, mid('kavya', 0.35), 960, 190);
      popIn(cDay, t, mid('kavya', 0.62), 960, 250);
      tr(lt.kavya, 430, 600);
      ltOn(t, 'kavya', at('kavya') + 1.6);
    }

    /* ---------- B, E, F: the living room ---------- */
    op(flatShot, flatOn); op(flat.front, flatOn); op(flat.top, flatOn);
    op(c3w, 0); op(cNoFloor, 0); op(star, 0); op(cLonger, 0); op(cWeeks, 0); op(cFlat, 0); op(cMan, 0);
    op(diagG, 0); op(vertG, 0);
    if (flatOn) { flat.upd(t); flat.open(0); }
    if (sB) {
      // Mum with the invitation
      show.mum = 1;
      tr(mum, MUM_X, 440, 1.0);
      const mm = t < at('floor') ? 'happy' : t < at('bala') ? 'neutral' : 'shock';
      mum.set({ t, talk: scTalk(S, t, 'mum'), mood: t >= at('dad') ? 'deadpan' : mm, look: t < at('floor') ? -0.6 : t < at('bala') ? -0.8 : 0.8, lift: t < at('bala') ? 1 : 0 });
      tr(lt.mum, 420, 600); ltOn(t, 'mum', at('mum') + 0.15);
      popIn(c3w, t, mid('mum', 0.12), 760, 230); if (t > end('mum') + 0.3) op(c3w, 0);
      // Uncle Bala rises; the tape bites him on "Ow"
      if (t >= at('bala') - 0.35) {
        show.bala = 1;
        const up = P(t, at('bala') - 0.35, 0.4, easeOut);
        tr(bala, BALA_X, lerp(660, 432, up), 1.0);
        const owT = mid('bala', 0.84), bit = t > owT;
        bala.set({ t, talk: scTalk(S, t, 'bala'), mood: bit ? 'shock' : 'happy', look: t >= at('dad') ? 0.8 : -0.4, lift: t < owT + 0.8 ? 1 : 0, sweat: bit && t < at('dad') ? 1 : 0 });
        bala.tape.set(0.45 * P(t, mid('bala', 0.1), 0.6, easeOut) * (1 - P(t, owT, 0.12, easeIn)), bit ? P(t, owT, 0.6, linear) : 0);
        tr(lt.bala, 420, 600); ltOn(t, 'bala', at('bala') + 0.1);
      }
      // Dad pops up with his own tape
      if (t >= at('dad') - 0.35) {
        show.dad = 1;
        const up = P(t, at('dad') - 0.35, 0.4, pop);
        tr(dad, DAD_X, lerp(660, 440, up), 1.0);
        dad.set({ t, talk: scTalk(S, t, 'dad'), mood: 'smug', look: -0.6, lift: 1 });
        dad.tape.set(0.4 * P(t, mid('dad', 0.3), 0.5, easeOut));
        tr(lt.dad, 420, 600); ltOn(t, 'dad', at('dad') + 0.1);
        if (t > mid('dad', 0.3)) { const sp = P(t, mid('dad', 0.3), 0.45, pop); op(star, clamp(sp * 2.5)); tr(star, 930, 230, Math.max(0.01, 0.6 + 0.4 * sp)); tr(starIcon, 150, -30, 1, t * 40 * AMP); }
      }
      // Kavya, foreground left
      show.kavF = 1;
      tr(kavF, 180, 612, 1.05);
      let km = 'happy', kl = 0.8;
      if (t >= at('floor') && t < at('bala')) { km = 'deadpan'; kl = 0; }
      else if (t >= at('bala') && t < at('dad')) km = t > mid('bala', 0.84) ? 'smug' : 'neutral';
      else if (t >= at('dad')) { km = 'deadpan'; kl = 0.9; }
      kavF.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
      if (t >= at('floor') && t < at('bala')) popIn(cNoFloor, t, mid('floor', 0.55), 470, 640);
    }

    /* ---------- C: zoom into the toolbox ---------- */
    op(boxShot, sC); op(finder, sC);
    if (sC) {
      tbox.set(P(t, cC + 0.2, 0.7, easeOut));
      const rise = P(t, cC + 0.6, 0.8, easeOut);
      tr(perpBox, -10, lerp(-40, -170, rise), 0.6);
      perpBox.set({ t, mood: rise < 0.9 ? 'deadpan' : 'smug', look: 0, still: true });
      const z = P(t, cC + 0.8, cD - cC - 1.0, ease);
      const k = 0.8 * Math.pow(3.2 / 0.8, z);
      // her face: toolbox at (600, 640), s 1.6; she is at (-10, -170) in it, face about 40 px above her centre
      view(boxWrap, k, lerp(600, 600 - 16 - 30, z), lerp(470, 640 + (-170 + 20) * 1.6, z), 600, 375);
      setText(zoomTxt, 'ZOOM ×' + (k / 0.8).toFixed(1));
    }

    /* ---------- D: the confessional ---------- */
    conf.set(sD, t);
    op(plaque, 0); op(board, 0);
    if (sD) {
      show.perp = 1;
      tr(perp, 330, 420, 1.3);
      const chk = (t > mid('hi', 0.75) && t < mid('hi', 0.98)) || (t > mid('height', 0.12) && t < mid('height', 0.35)) ? 1 : 0;
      perp.set({ t, talk: scTalk(S, t, 'perp'), mood: t < at('height') ? (t < mid('hi', 0.3) ? 'neutral' : 'smug') : (t > mid('height', 0.62) ? 'annoyed' : 'deadpan'), look: t >= at('height') ? 0.6 : 0, check: chk, point: t > mid('height', 0.1) ? 1 : 0 });
      tr(lt.perp, 50, 600); ltOn(t, 'perp', at('hi') + 0.1);
      // hi: the plaque
      const pp = P(t, mid('hi', 0.2), 0.45, pop) * (1 - P(t, at('height') - 0.15, 0.2, linear));
      op(plaque, clamp(pp * 2.5)); tr(plaque, 850, 330, Math.max(0.01, 0.7 + 0.3 * pp));
      // height: the board
      if (t >= at('height') - 0.1) {
        const bp = P(t, at('height') - 0.1, 0.4, pop);
        op(board, clamp(bp * 3)); tr(board, 850, 360, Math.max(0.01, 0.85 + 0.15 * bp));
        const hp = P(t, mid('height', 0.08), 0.5, easeOut);
        mkDraw(hLine, hp); op(hDash, hp > 0.98 ? 1 : 0);
        hMark.set(P(t, mid('height', 0.2), 0.3, linear));
        op(hLab, P(t, mid('height', 0.3), 0.3, linear));
        const sp = P(t, mid('height', 0.6), 0.3, linear);
        op(slope, sp); op(sLab, sp); op(sX, P(t, mid('height', 0.72), 0.25, linear));
      }
    }

    /* ---------- E: corner to corner ---------- */
    if (sE) {
      op(diagG, 1);
      const d = P(t, cE + 0.25, mid('diag', 0.55) - cE - 0.25, easeOut);
      const x2 = lerp(D0[0], D1[0], d), y2 = lerp(D0[1], D1[1], d);
      attr(diagTape, 'x2', x2); attr(diagTape, 'y2', y2); attr(diagTicks, 'x2', x2); attr(diagTicks, 'y2', y2);
      op(vertG, P(t, end('diag') + 0.05, 0.3, linear));
      show.dad = 1;
      tr(dad, 560, 440, 1.0);
      dad.set({ t, talk: scTalk(S, t, 'dad'), mood: 'smug', look: -0.4, lift: 1 });
      dad.tape.set(0.25);
      popIn(cLonger, t, mid('diag', 0.6), 610, 620);
      show.perp = 1;
      tr(perp, 1010, 530 - 140 * 0.62, 0.62);
      perp.set({ t, mood: t > mid('diag', 0.5) ? 'annoyed' : 'deadpan', look: -0.9, check: t > end('diag') + 0.05 ? 1 : 0 });
    }

    /* ---------- F: Madam P takes charge ---------- */
    if (sF) {
      show.perp = 1; show.kavB = 1; show.bala = 1; show.dad = 1;
      const jump = P(t, cF, 0.4, pop);
      tr(perp, 600, lerp(560, 530 - 140 * 0.95, jump), 0.95);
      perp.set({ t, talk: scTalk(S, t, 'perp'), mood: t > mid('charge', 0.6) ? 'annoyed' : 'deadpan', look: t < mid('charge', 0.55) ? Math.sin(t * 2) * 0.6 : 0.8, point: t > mid('charge', 0.62) ? 1 : 0, check: t > mid('charge', 0.4) && t < mid('charge', 0.6) ? 1 : 0 });
      tr(kavB, 330, 440, 1.0); kavB.set({ t, mood: t > mid('charge', 0.5) ? 'smug' : 'neutral', look: 0.8 });
      tr(bala, 860, 432, 1.0); bala.set({ t, mood: 'happy', look: -0.8, lift: 0 }); bala.tape.set(0);
      tr(dad, 1070, 440, 1.0); dad.set({ t, mood: t > mid('charge', 0.62) ? 'smug' : 'neutral', look: -0.8, lift: 0 }); dad.tape.set(0);
      popIn(cWeeks, t, mid('charge', 0.03), 300, 170);
      popIn(cFlat, t, mid('charge', 0.2), 600, 170);
      popIn(cMan, t, mid('charge', 0.38), 920, 250);
    }

    /* ---------- G: title card ---------- */
    op(titleShot, sG); op(logo, 0); op(epi, 0);
    if (sG) {
      tr(rayP, 600, 620, 1, (t * 6 * AMP) % 360);
      const lp = P(t, at('title') + 0.05, 0.6, pop);
      op(logo, clamp(lp * 2.5)); tr(logo, 600, 220, Math.max(0.01, 0.5 + 0.5 * lp));
      const fa = Math.sin(t * 2.2) * 6 * AMP;
      attr(flapL, 'd', `M-300,-120 L-40,-120 L${-70 + fa},${-188 - fa} L${-330 + fa},${-170 - fa} Z`);
      attr(flapR, 'd', `M300,-120 L40,-120 L${70 - fa},${-188 - fa} L${330 - fa},${-170 - fa} Z`);
      op(epi, P(t, mid('title', 0.4), 0.4, linear));
      const castT = i => mid('title', 0.5) + i * 0.13, xs = [180, 390, 600, 810, 1020];
      const row = [[bala, 'happy', 0.7, 'bala'], [kavB, 'smug', 0.78, 'kavB'], [perp, 'smug', 0.62, 'perp'], [dad, 'smug', 0.7, 'dad'], [mum, 'happy', 0.7, 'mum']];
      row.forEach(([c, mood, s, key], i) => {
        const p = P(t, castT(i), 0.45, pop);
        show[key] = 1; op(c, clamp(p * 3));
        const y = key === 'perp' ? 570 : 572;
        tr(c, xs[i], y + 30 * (1 - clamp(p)), Math.max(0.01, s * p));
        c.set({ t, mood, look: 0, lift: 0, check: key === 'perp' ? 1 : 0 });
        if (c.tape) c.tape.set(0);
      });
    }

    /* characters not in this shot */
    if (!sG) { op(mum, show.mum); op(bala, show.bala); op(dad, show.dad); op(kavB, show.kavB); op(perp, show.perp); }
    op(kavF, show.kavF);
  };
});
