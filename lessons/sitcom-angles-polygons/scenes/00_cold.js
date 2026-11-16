/* Scene 0: Cold open (no chapter card).
   Saturday 8 a.m., the kitchen of a flat in Block 208: Kavya, 12 -> Mum's new octagon-and-square tiles; the
   contractor wants $2000 -> Dad: "I watched a video" (half of one, at 2x) -> Ah Boy and the scissors (now a broom)
   -> documentary zoom down onto the floor plan, into the corner where the two walls meet -> Rex's confessional:
   a right angle, exactly 90 degrees since 1987 (89 no, 91 no) -> back in the kitchen, Dad's protractor:
   "About?! ABOUT?!" -> "No reason, no approval": REJECTED -> title card. */
scene('cold', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);          // hard sitcom cut
  const view = (el, k, fx, fy, sx, sy) => el.setAttribute('transform', `translate(${sx.toFixed(1)} ${sy.toFixed(1)}) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); };
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 2, color: o.color || C.ink, weight: 700 }); };
  const GOLD = '#FFE45C', PINK = '#FF8FC8', RED = '#FF8A8A';

  /* layers: sets, characters behind the island, the island (and Rex standing on it), foreground, HUD */
  const Lbg = G(root), Lcast = G(root), Lfront = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= A, B, E, F: the kitchen ================= */
  const kitShot = G(Lbg), kitWrap = G(kitShot);
  const kit = agKitchen(kitWrap);
  const islandWrap = G(Lfront);
  islandWrap.appendChild(kit.front); islandWrap.appendChild(kit.top);    // the island sits in front of Lcast
  const boxes = G(kit.top);
  const bx1 = agTileBox(boxes); tr(bx1, 0, 0);
  const bx2 = agTileBox(boxes); tr(bx2, -150, 0, 0.8);
  const sample = agTileSample(Lfg, 1);
  const aChips = G(Lfg);
  const cKav = pill(aChips, 'Kavya, age 12', { size: 32 });
  const cSat = pill(aChips, 'Saturday, 8 a.m.', { size: 30, color: GOLD, stroke: GOLD });
  const cBlk = pill(aChips, 'the kitchen, Blk 208', { size: 28 });
  const cCost = pill(Lfg, 'contractor: $2000', { size: 32, color: RED, stroke: RED });
  const cVid = pill(Lfg, '"I watched a video."', { size: 32, color: GOLD, stroke: GOLD });
  const phone = agPhone(Lfg, { speed: '2×' });
  const cHalf = pill(Lfg, 'half a video, at 2×', { size: 28, color: PINK, stroke: PINK });
  const cAbout = pill(Lfg, 'about 90°?', { size: 34, color: GOLD, stroke: GOLD });
  const bigAbout = T(Lfg, 0, 0, 'ABOUT?!', { size: 120, weight: 800, anchor: 'middle', fill: '#FF6070' });
  bigAbout.setAttribute('stroke', '#3A0A10'); bigAbout.setAttribute('stroke-width', 12); bigAbout.setAttribute('paint-order', 'stroke'); bigAbout.setAttribute('stroke-linejoin', 'round');
  const cInsp = pill(Lfg, 'INSPECTION: all weekend', { size: 30, color: GOLD, stroke: GOLD });
  const cReason = pill(Lfg, 'no reason = no approval', { size: 30, color: RED, stroke: RED });
  const stamp = agStamp(Lfg, false);

  /* ================= C: down onto the floor plan, into the corner ================= */
  const floorShot = G(Lbg), floorWrap = G(floorShot);
  E('rect', { x: -400, y: -400, width: 2000, height: 1600, fill: '#4A5568' }, floorWrap);
  const floor = agFloor(floorWrap, { pattern: 'old' });
  const [FX, FY] = floor.corner;
  const fLabel = G(floorWrap);
  T(fLabel, FX + 460, FY - 250, 'KITCHEN FLOOR', { size: 40, weight: 800, anchor: 'middle', fill: '#8A7650', opacity: 0.6 });
  const teaser = E('rect', { x: FX + 2, y: FY - 26, width: 24, height: 24, rx: 3, fill: GOLD, stroke: SC_INK, 'stroke-width': 3 }, floorWrap);
  const finder = G(Lhud);
  E('path', { d: 'M40,140 L40,40 L140,40 M1060,40 L1160,40 L1160,140 M1160,610 L1160,710 L1060,710 M140,710 L40,710 L40,610', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 5, opacity: 0.8 }, finder);
  const zoomTxt = T(finder, 1130, 690, 'ZOOM ×1', { size: 30, weight: 700, anchor: 'end', fill: '#FFFFFF' });
  const topTxt = T(finder, 1130, 84, 'VIEW: FROM ABOVE', { size: 26, weight: 700, anchor: 'end', fill: '#FFFFFF', font: FB });

  /* ================= D: Rex's confessional ================= */
  const conf = agConf(Lbg, 'rex');
  const plaque = G(Lfg);
  E('rect', { x: -250, y: -150, width: 500, height: 300, rx: 18, fill: '#0E1A24', stroke: GOLD, 'stroke-width': 5 }, plaque);
  T(plaque, 0, -82, 'RIGHT ANGLE', { size: 44, weight: 800, anchor: 'middle', fill: GOLD, ls: 2 });
  const pm = mkMath(plaque, 0, 22, '90°', { size: 92, fill: '#FFFFFF', anchor: 'middle' });
  T(plaque, 0, 112, 'in this corner since 1987', { size: 28, weight: 700, anchor: 'middle', fill: '#CFE3F5', font: FB });
  // ninety: 89 no, 91 no, 90 yes (with the little square)
  const nine = G(Lfg), nineRows = [];
  [['89°', false], ['91°', false], ['90°', true]].forEach(([s, ok], i) => {
    const r = G(nine); tr(r, 0, i * 120);
    E('rect', { x: -190, y: -50, width: 380, height: 100, rx: 18, fill: ok ? 'rgba(30,158,90,0.25)' : 'rgba(211,47,47,0.18)', stroke: ok ? '#56D69B' : '#FF6070', 'stroke-width': 4 }, r);
    // a little angle drawn at the left of each row
    const a = G(r); tr(a, -130, 26);
    const deg = ok ? 90 : i === 0 ? 89 : 91, rad = deg * Math.PI / 180;
    E('path', { d: `M64,0 L0,0 L${(Math.cos(rad) * 64).toFixed(1)},${(-Math.sin(rad) * 64).toFixed(1)}`, fill: 'none', stroke: '#FFFFFF', 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, a);
    if (ok) E('path', { d: 'M18,0 L18,-18 L0,-18', fill: 'none', stroke: GOLD, 'stroke-width': 4 }, a);
    mkMath(r, 10, 18, s, { size: 56, fill: '#FFFFFF', anchor: 'middle' });
    const mk = ok ? tick(r, 22) : cross(r, 20); tr(mk, 130, 0);
    nineRows.push(r);
  });

  /* ================= G: title card ================= */
  const titleShot = G(Lbg);
  const tbg = agTitleBg(titleShot);
  const logo = G(Lfg);
  const logo1 = T(logo, 0, -78, 'ALL THE', { size: 56, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 8 });
  const logo2 = T(logo, 0, 26, 'RIGHT ANGLES', { size: 100, weight: 800, anchor: 'middle', fill: GOLD, ls: 2 });
  [logo1, logo2].forEach(w => { w.setAttribute('stroke', '#082A30'); w.setAttribute('stroke-width', 12); w.setAttribute('paint-order', 'stroke'); w.setAttribute('stroke-linejoin', 'round'); });
  // right-angle brackets framing the logo (each with its little square)
  const brk = [[-400, 66, 0], [400, -128, 180]].map(([x, y, r]) => {
    const b = G(logo); tr(b, x, y, 1, r);
    E('path', { d: 'M0,-96 L0,0 L96,0', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 10, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, b);
    E('path', { d: 'M24,0 L24,-24 L0,-24', fill: 'none', stroke: GOLD, 'stroke-width': 6 }, b);
    return b;
  });
  const epi = T(Lfg, 600, 300, 'Episode 13: The Great Kitchen Reno', { size: 40, weight: 700, anchor: 'middle', fill: '#FFFFFF' });

  /* ================= the cast ================= */
  const kav = cast(Lcast, 'kavya');
  const mum = cast(Lcast, 'mum');
  const dad = cast(Lcast, 'dad');
  const boy = cast(Lcast, 'boy');
  const rex = cast(Lfront, 'rex');
  const lt = { kavya: agLowerThird(Lhud, 'kavya'), mum: agLowerThird(Lhud, 'mum'), dad: agLowerThird(Lhud, 'dad'), boy: agLowerThird(Lhud, 'boy'), rex: agLowerThird(Lhud, 'rex') };
  const ltOn = (t, who, t0) => lt[who].set(win(t, t0, t0 + 3.1, 0.3));

  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cut points */
  const cC = at('corner') - 0.06, cD = at('hi') - 0.06, cE = at('about') - 0.06, cF = at('inspect') - 0.06, cG = at('title') - 0.06;

  return t => {
    op(blackout, 1 - P(t, 0, 0.6, linear));
    const sAB = on(t, -1, cC), sC = on(t, cC, cD), sD = on(t, cD, cE), sE = on(t, cE, cF), sF = on(t, cF, cG), sG = on(t, cG, 1e9);
    const kitOn = sAB || sE || sF;
    for (const k in lt) lt[k].set(0);
    const show = { kav: 0, mum: 0, dad: 0, boy: 0, rex: 0 };

    /* ---------- the kitchen ---------- */
    op(kitShot, kitOn); op(islandWrap, kitOn);
    op(aChips, 0); op(sample, 0); op(cCost, 0); op(cVid, 0); op(phone, 0); op(cHalf, 0); op(cAbout, 0); op(bigAbout, 0);
    op(cInsp, 0); op(cReason, 0); op(stamp, 0); op(boxes, 0);
    if (kitOn) {
      kit.upd(t);
      kit.clock(8 + Math.min(t, 60) / 3600 * 60);   // the clock creeps from 8:00
    }
    if (sAB) {
      // A: a slow push in on Kavya, alone at the island; B: the family arrives
      const push = t < at('tiles') ? P(t, 0, at('tiles'), linear) : 0;
      if (t < at('tiles')) view(kitWrap, 1 + 0.06 * push, 420, 420, 420, 420); else kitWrap.removeAttribute('transform');
      show.kav = 1;
      let km = 'neutral', kl = 0.5;
      if (t < at('tiles')) { km = t < mid('kavya', 0.5) ? 'neutral' : 'smug'; kl = 0; }
      else if (t < at('half')) { km = t < at('video') ? 'happy' : 'deadpan'; kl = 0.7; }
      else if (t < at('important')) km = 'smug';
      else if (t < at('boy')) km = 'deadpan';
      else km = t < at('sweep') ? 'shock' : 'happy';
      tr(kav, 230, 442, 1.05);
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
      if (t < at('tiles')) {
        op(aChips, 1);
        popIn(cKav, t, mid('kavya', 0.05), 230, 250);
        popIn(cSat, t, mid('kavya', 0.4), 860, 300);
        popIn(cBlk, t, mid('kavya', 0.62), 860, 370);
        ltOn(t, 'kavya', at('kavya') + 1.2);
      }
      if (t >= at('tiles') - 0.3) {
        // Mum and the tile boxes
        show.mum = 1;
        const up = P(t, at('tiles') - 0.3, 0.35, easeOut);
        tr(mum, 640, lerp(650, 440, up), 1.05);
        let mm = 'happy', ml = -0.5;
        if (t >= at('video') && t < at('boy')) { mm = t < at('half') ? 'shock' : 'deadpan'; ml = 0.8; }
        else if (t >= at('boy')) { mm = t < at('sweep') ? 'shock' : 'smug'; ml = 0.8; }
        mum.set({ t, talk: scTalk(S, t, 'mum'), mood: mm, look: ml, lift: t < at('video') ? 1 : 0 });
        op(boxes, 1); tr(boxes, 470, kit.counterY + 4, 0.8);
        ltOn(t, 'mum', at('tiles') + 0.1);
        if (t < at('video')) {
          popIn(sample, t, mid('tiles', 0.22), 640, 220, 1.0, 8 * Math.sin(t * 2));
          popIn(cCost, t, mid('tiles', 0.68), 900, 290);
        }
      }
      if (t >= at('video') - 0.35) {
        show.dad = 1;
        const up = P(t, at('video') - 0.35, 0.4, easeOut);
        tr(dad, 880, lerp(660, 432, up), 1.08);
        let dm = 'smug', dl = -0.6;
        if (t >= at('half') && t < at('important')) { dm = 'neutral'; dl = -0.9; }
        if (t >= at('boy')) { dm = t < at('sweep') ? 'shock' : 'happy'; dl = 0.8; }
        dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: dl, lift: t < at('boy') ? 1 : 0 });
        ltOn(t, 'dad', at('video') + 0.1);
        if (t < at('half')) popIn(cVid, t, mid('video', 0.62), 880, 230);
      }
      if (t >= at('half') && t < at('boy')) {
        popIn(phone, t, at('half') + 0.1, 445, 300, 0.74, -4);
        phone.set(0.5);
        tr(phone.speed, 0, 122, 1 + 0.12 * Math.max(0, Math.sin(t * 9)) * (t < end('half') ? 1 : 0));
        if (t > mid('half', 0.55)) popIn(cHalf, t, mid('half', 0.55), 445, 520 - 40);
      }
      // the important half: a slow push on Dad, everyone else deadpan
      if (t >= at('important') && t < at('boy')) {
        const p = P(t, at('important'), at('boy') - at('important'), linear);
        view(kitWrap, 1 + 0.05 * p, 880, 430, 880, 430);
      }
      if (t >= at('boy') - 0.3) {
        show.boy = 1;
        const up = P(t, at('boy') - 0.3, 0.35, pop);
        tr(boy, 1050, lerp(660, 462, up), 1.0);
        const swept = t >= at('sweep') + 0.4;
        boy.set({ t, talk: scTalk(S, t, 'boy'), mood: swept ? 'sad' : 'happy', look: swept ? -0.8 : -0.3, lift: swept ? 0.4 : 1 });
        op(boy.tools.scissors, swept ? 0 : 1); op(boy.tools.broom, swept ? 1 : 0);
        boy.tools.scissorsX.set(26 + 18 * Math.abs(Math.sin(t * 7)) * (t < end('boy') ? 1 : 0));
        ltOn(t, 'boy', at('boy') + 0.1);
      }
    }

    /* ---------- C: down onto the floor plan, into the corner ---------- */
    op(floorShot, sC); op(finder, sC); op(teaser, 0);
    if (sC) {
      // the corner glides from where it is to (430, 540) while the camera dives in on it
      const z = P(t, cC + 0.3, cD - cC - 0.5, ease);
      const k = lerp(1, 4.2, z);
      view(floorWrap, k, FX, FY, lerp(FX, 430, z), lerp(FY, 540, z));
      setText(zoomTxt, 'ZOOM ×' + k.toFixed(1));
      op(teaser, P(t, mid('corner', 0.75), 0.4, linear) * (0.6 + 0.4 * Math.sin(t * 8)));
    }

    /* ---------- D: Rex's confessional ---------- */
    conf.set(sD, t);
    op(plaque, 0); op(nine, 0);
    if (sD) {
      show.rex = 1;
      const push = P(t, at('ninety'), cE - at('ninety'), linear);
      tr(rex, 330, 400, 1.32 * (1 + 0.04 * push));
      let mood = 'deadpan', look = 0;
      if (t < at('ninety')) mood = t < mid('hi', 0.5) ? 'neutral' : 'smug';
      else { mood = t < mid('ninety', 0.6) ? 'annoyed' : 'smug'; look = 0.6; }
      rex.set({ t, talk: scTalk(S, t, 'rex'), mood, look, open: 90, twitch: t > at('ninety') && t < mid('ninety', 0.35) ? 0.6 : 0 });
      ltOn(t, 'rex', at('hi') + 0.1);
      if (t < at('ninety')) {
        const pp = P(t, mid('hi', 0.2), 0.45, pop);
        op(plaque, clamp(pp * 2.5)); tr(plaque, 860, 340, Math.max(0.01, 0.7 + 0.3 * pp));
      } else {
        op(nine, 1); tr(nine, 860, 230);
        nineRows.forEach((r, i) => { const p = P(t, mid('ninety', [0.02, 0.22, 0.5][i]), 0.35, pop); op(r, clamp(p * 2.5)); tr(r, 0, i * 130, Math.max(0.01, (0.7 + 0.3 * p) * (i === 2 ? 1 + 0.05 * Math.sin(t * 5) * (t > mid('ninety', 0.6) ? 1 : 0) : 1))); });
      }
    }

    /* ---------- E: Dad's protractor; "About? ABOUT?!" ---------- */
    if (sE) {
      kitWrap.removeAttribute('transform');
      show.rex = 1; show.dad = 1; show.kav = 1;
      tr(rex, 560, 418, 0.9);
      const shout = t >= at('down');
      rex.set({ t, talk: scTalk(S, t, 'rex'), mood: shout ? (t < mid('down', 0.5) ? 'shock' : 'annoyed') : 'deadpan', look: 0.7, open: 90, twitch: shout && t < mid('down', 0.55) ? 1 : 0 });
      tr(dad, 860, 432, 1.08);
      dad.set({ t, talk: scTalk(S, t, 'dad'), mood: shout ? 'shock' : 'smug', look: -0.8, lift: shout ? 1 - P(t, mid('down', 0.85), 0.3, linear) : 1 });
      tr(kav, 210, 442, 1.0); kav.set({ t, mood: shout ? 'shock' : 'deadpan', look: 0.8 });
      if (!shout) popIn(cAbout, t, mid('about', 0.3), 860, 230);
      else {
        const p = P(t, at('down') + 0.02, 0.3, pop);
        op(bigAbout, clamp(p * 3) * (1 - P(t, mid('down', 0.82), 0.25, linear)));
        tr(bigAbout, 600 + Math.sin(t * 50) * 4 * AMP, 210, Math.max(0.01, 0.5 + 0.5 * p), -4);
      }
    }

    /* ---------- F: "No reason, no approval." ---------- */
    if (sF) {
      kitWrap.removeAttribute('transform');
      show.rex = 1; show.kav = 1; show.mum = 1; show.dad = 1; show.boy = 1;
      const jump = P(t, cF, 0.4, pop);
      tr(rex, 600, lerp(520, 418, jump), 0.9);
      const late = t > mid('inspect', 0.55);
      rex.set({ t, talk: scTalk(S, t, 'rex'), mood: late ? 'annoyed' : 'smug', look: t < mid('inspect', 0.5) ? Math.sin(t * 2) * 0.7 : 0, open: 90 });
      tr(kav, 210, 442, 1.0); kav.set({ t, mood: late ? 'shock' : 'neutral', look: 0.8 });
      tr(mum, 390, 446, 0.98); mum.set({ t, mood: 'deadpan', look: 0.8, lift: 0 });
      tr(dad, 860, 432, 1.05); dad.set({ t, mood: late ? 'sad' : 'smug', look: -0.8, lift: 0 });
      tr(boy, 1040, 470, 0.95); boy.set({ t, mood: late ? 'shock' : 'happy', look: -0.8, lift: 0.4 });
      op(boy.tools.scissors, 0); op(boy.tools.broom, 1);
      popIn(cInsp, t, mid('inspect', 0.08), 870, 240);
      if (t > mid('inspect', 0.55)) popIn(cReason, t, mid('inspect', 0.55), 870, 310);
      if (t > mid('inspect', 0.6)) { stamp.set(P(t, mid('inspect', 0.6), 0.35, linear)); tr(stamp, 560, 170, 0.5); }
    }

    /* ---------- G: title card ---------- */
    op(titleShot, sG); op(logo, 0); op(epi, 0);
    if (sG) {
      tbg.upd(t, AMP);
      const lp = P(t, at('title') + 0.05, 0.6, pop);
      op(logo, clamp(lp * 2.5)); tr(logo, 600, 180, Math.max(0.01, 0.5 + 0.5 * lp));
      brk.forEach((b, i) => { const [x, y, r] = i ? [400, -128, 180] : [-400, 66, 0]; tr(b, x, y, 1, r + Math.sin(t * 2 + i) * 4 * AMP); });
      op(epi, P(t, mid('title', 0.42), 0.4, linear));
      const castT = i => mid('title', 0.5) + i * 0.13, xs = [180, 390, 600, 810, 1020];
      const row = [[mum, 'happy', 0.72, 'mum'], [kav, 'smug', 0.8, 'kav'], [rex, 'deadpan', 0.62, 'rex'], [dad, 'smug', 0.72, 'dad'], [boy, 'happy', 0.8, 'boy']];
      row.forEach(([c, mood, s, key], i) => {
        const p = P(t, castT(i), 0.45, pop);
        show[key] = 1; op(c, clamp(p * 3));
        tr(c, xs[i], (key === 'rex' ? 500 : 520) + 30 * (1 - clamp(p)), Math.max(0.01, s * p));
        c.set({ t, mood, look: 0, lift: key === 'boy' ? 0.4 : 0, open: 90 });
      });
      op(boy.tools.scissors, 1); op(boy.tools.broom, 0);
    }

    /* characters not in this shot */
    if (!sG) { op(kav, show.kav); op(mum, show.mum); op(dad, show.dad); op(boy, show.boy); op(rex, show.rex); }
  };
});
