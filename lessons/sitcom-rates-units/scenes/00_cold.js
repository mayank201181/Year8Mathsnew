/* Scene 0: Cold open (no chapter card).
   Friday 10 p.m., the HDB flat in Block 512, packing for London: Kavya -> Mum's 20 kg rule (tag on the suitcase) ->
   Dad's weather app "50°" (the °F he ignores): shorts, gold "I did the maths" rosette -> Kavya: that's Fahrenheit ->
   "Fifty is fifty." -> Ah Boy pops out of the open suitcase: "Are we there yet?" -> Mum: we haven't left the flat ->
   documentary zoom into the luggage tag, into the "kg" -> Monsieur Mètre's confessional (the metre, Paris 1791) ->
   "Twenty what? ... gossip" board -> MEANWHILE, ON MARS: the 1999 spacecraft falls, POUF, SPACECRAFT LOST: 1 ->
   US$125 million, Mètre peeks in -> back at the table: 11 000 km, Mètre hops into the suitcase -> title card. */
scene('cold', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);          // hard sitcom cut
  const view = (el, k, fx, fy, sx, sy) => el.setAttribute('transform', `translate(${sx.toFixed(1)} ${sy.toFixed(1)}) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 3, color: o.color || C.ink, weight: 700 }); };
  const GOLD = '#FFE45C', PINK = '#FF8FC8', SKY = '#7FD3FF', INK = MK.ink;

  /* layers: sets, characters behind the table, the table, foreground, HUD */
  const Lbg = G(root), Lcast = G(root), Lfront = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= A-G, M: the flat ================= */
  const flatShot = G(Lbg), cam = G(flatShot);
  const flat = lcFlat(cam);
  const camF = G(Lfront); camF.appendChild(flat.front); camF.appendChild(flat.top);
  const camC = Lcast;                                              // the cast layer gets the same camera transform
  // the big blue suitcase with Mum's tag, standing on the table
  const bigCase = lcSuitcase(flat.top, { col: '#2E7DD8', w: 170, h: 200, tag: '20 kg' });
  // Ah Boy's open suitcase: lid behind him, base box in front, Dad's shorts spilling out
  const lid = G(Lcast);
  E('rect', { x: -150, y: -190, width: 300, height: 200, rx: 18, fill: '#C2453A', stroke: SC_INK, 'stroke-width': 5 }, lid);
  E('rect', { x: -134, y: -174, width: 268, height: 170, rx: 12, fill: '#F2C9A0', stroke: '#9C3A2A', 'stroke-width': 3 }, lid);
  E('path', { d: 'M-134,-120 H134 M-134,-66 H134', stroke: '#E0B080', 'stroke-width': 3 }, lid);
  const base = G(flat.top);
  E('rect', { x: -156, y: -96, width: 312, height: 96, rx: 14, fill: '#D2584A', stroke: SC_INK, 'stroke-width': 5 }, base);
  E('path', { d: 'M-120,-96 V-6 M120,-96 V-6', stroke: '#9C3A2A', 'stroke-width': 4, opacity: 0.6 }, base);
  const shorts = G(flat.top);
  E('path', { d: 'M-50,-40 L50,-40 L58,28 L10,28 L0,-2 L-10,28 L-58,28 Z', fill: '#FF8A3D', stroke: SC_INK, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, shorts);
  [[-32, -20], [20, -24], [-14, 6], [36, 10], [-40, 14]].forEach(([x, y]) => E('circle', { cx: x, cy: y, r: 7, fill: '#FFE45C', stroke: '#C2453A', 'stroke-width': 2 }, shorts));
  // the weather phone and the rosette
  const phone = lcPhone(Lfg, { temp: '50°', unit: '°F', city: 'London' });
  const rosette = lcRosette(Lfg);
  // chips
  const aChips = G(Lfg);
  const cKav = pill(aChips, 'Kavya, age 12', { size: 32 });
  const cFri = pill(aChips, 'Friday, 10 p.m.', { size: 30, color: GOLD, stroke: GOLD });
  const cBlk = pill(aChips, 'Block 512', { size: 30 });
  const cKg = mkChip(Lfg, 'every bag under **20 kg**', { size: 34, col: GOLD });
  const cF = mkChip(Lfg, '**°F** = degrees **Fahrenheit**', { size: 36, col: SKY });
  const cKm = mkChip(Lfg, 'Singapore → London: **11 000 km**', { size: 36, col: GOLD });

  /* ================= H: zoom into the luggage tag ================= */
  const tagShot = G(Lbg), tagWrap = G(tagShot);
  E('rect', { x: -400, y: -300, width: 2000, height: 1400, fill: '#2E7DD8' }, tagWrap);       // the suitcase, close up
  let ribs = ''; for (let i = 0; i < 9; i++) ribs += `M${-300 + i * 220},-300 V1100 `;
  E('path', { d: ribs, stroke: '#1E5AA8', 'stroke-width': 26, opacity: 0.6 }, tagWrap);
  const bigTag = G(tagWrap); tr(bigTag, 600, 380);
  E('path', { d: 'M-330,-20 Q-380,-120 -300,-160', fill: 'none', stroke: '#C62828', 'stroke-width': 10 }, bigTag);
  E('path', { d: 'M-330,0 L-200,-150 L330,-150 L330,150 L-200,150 Z', fill: '#FFF6D6', stroke: '#8B6B3A', 'stroke-width': 8, 'stroke-linejoin': 'round' }, bigTag);
  E('circle', { cx: -270, cy: 0, r: 22, fill: '#FFFFFF', stroke: '#8B6B3A', 'stroke-width': 6 }, bigTag);
  T(bigTag, 10, 72, '20', { size: 200, weight: 800, anchor: 'end', fill: INK });
  T(bigTag, 40, 72, 'kg', { size: 200, weight: 800, anchor: 'start', fill: '#C62828' });
  const KX = 600 + 40 + 115, KY = 380 + 10;                       // where the "kg" sits (stage coords)
  const finder = G(Lhud);
  E('path', { d: 'M40,140 L40,40 L140,40 M1060,40 L1160,40 L1160,140 M1160,610 L1160,710 L1060,710 M140,710 L40,710 L40,610', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 5, opacity: 0.8 }, finder);
  const zoomTxt = T(finder, 1130, 690, 'ZOOM ×1', { size: 30, weight: 700, anchor: 'end', fill: '#FFFFFF' });

  /* ================= I, J: Monsieur Mètre's confessional ================= */
  const conf = lcConf(Lbg, 'metre');
  const plaque = G(Lfg);
  E('rect', { x: -260, y: -170, width: 520, height: 340, rx: 18, fill: '#0E1A30', stroke: GOLD, 'stroke-width': 5 }, plaque);
  T(plaque, 0, -104, 'THE METRE', { size: 48, weight: 800, anchor: 'middle', fill: GOLD, ls: 3 });
  T(plaque, 0, -50, 'Paris, 1791', { size: 34, weight: 700, anchor: 'middle', fill: '#FFFFFF' });
  const rule = G(plaque); tr(rule, 0, 10);
  E('rect', { x: -200, y: -20, width: 400, height: 40, rx: 6, fill: '#F2C24A', stroke: SC_INK, 'stroke-width': 3 }, rule);
  let rt = ''; for (let i = 0; i <= 40; i++) rt += `M${-196 + i * 9.8},-20 v${i % 10 === 0 ? 22 : i % 5 === 0 ? 15 : 9} `;
  E('path', { d: rt, stroke: '#5A3A10', 'stroke-width': 2 }, rule);
  mkText(plaque, 0, 92, 'every number gets', { size: 32, anchor: 'middle', fill: '#CFE0FF' });
  mkText(plaque, 0, 134, 'a **unit**', { size: 32, anchor: 'middle', fill: '#CFE0FF', boldFill: GOLD });
  // the "twenty what?" board
  const board = G(Lfg);
  E('rect', { x: -290, y: -230, width: 580, height: 460, rx: 20, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, board);
  const bQ = mkText(board, 0, -150, '**20** what?', { size: 60, anchor: 'middle', fill: INK, boldFill: '#2E4C8C' });
  const opts = [['20 g', '?'], ['20 kg', '?'], ['20 elephants', '?']].map(([a, b], i) => {
    const gg = G(board); tr(gg, 0, -60 + i * 76);
    mkText(gg, -40, 0, a, { size: 46, anchor: 'middle', fill: INK });
    T(gg, 190, 2, b, { size: 46, weight: 800, anchor: 'middle', fill: '#C62828' });
    return gg;
  });
  const ele = G(board); tr(ele, 210, 92, 0.42);                    // a tiny elephant next to "20 elephants"
  E('ellipse', { cx: 0, cy: 0, rx: 70, ry: 48, fill: '#9AA6B2', stroke: SC_INK, 'stroke-width': 6 }, ele);
  E('circle', { cx: 64, cy: -26, r: 36, fill: '#9AA6B2', stroke: SC_INK, 'stroke-width': 6 }, ele);
  E('path', { d: 'M92,-14 Q110,30 96,60', fill: 'none', stroke: SC_INK, 'stroke-width': 14, 'stroke-linecap': 'round' }, ele);
  E('path', { d: 'M92,-14 Q110,30 96,60', fill: 'none', stroke: '#9AA6B2', 'stroke-width': 8, 'stroke-linecap': 'round' }, ele);
  [-40, -10, 20, 46].forEach(x => E('rect', { x: x - 10, y: 36, width: 20, height: 34, rx: 6, fill: '#9AA6B2', stroke: SC_INK, 'stroke-width': 5 }, ele));
  E('circle', { cx: 74, cy: -34, r: 5, fill: SC_INK }, ele);
  const gossip = G(board);
  E('rect', { x: -250, y: 140, width: 500, height: 66, rx: 14, fill: '#FFE6EE', stroke: '#C62828', 'stroke-width': 3 }, gossip);
  mkText(gossip, 0, 186, 'no unit = just **gossip**', { size: 38, anchor: 'middle', fill: INK, boldFill: '#C62828' });

  /* ================= K, L: MEANWHILE, ON MARS ================= */
  const marsShot = G(Lbg);
  const mars = lcMars(marsShot);
  const cOrb = pill(Lfg, '1999: Mars Climate Orbiter', { size: 30, color: GOLD, stroke: GOLD });
  const cMix = mkChip(Lfg, '**imperial** units vs **metric** units', { size: 32, col: '#FF8A8A' });
  const cCost = mkChip(Lfg, '**US$125 million**', { size: 40, col: GOLD });

  /* ================= N: title card ================= */
  const titleShot = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#0E2A5A', '#1E5AA8', true) }, titleShot);
  let rays = '';
  for (let i = 0; i < 16; i++) { const a0 = i / 16 * TAU, a1 = a0 + TAU / 40; rays += `M0,0 L${(Math.cos(a0) * 1100).toFixed(0)},${(Math.sin(a0) * 1100).toFixed(0)} L${(Math.cos(a1) * 1100).toFixed(0)},${(Math.sin(a1) * 1100).toFixed(0)} Z `; }
  const rayP = E('path', { d: rays, fill: '#FFE45C', opacity: 0.07 }, titleShot);
  E('ellipse', { cx: 600, cy: 610, rx: 620, ry: 170, fill: glow('#7FD3FF'), opacity: 0.35 }, titleShot);
  const tPlane = G(titleShot);
  E('path', { d: 'M-260,0 L-40,0', stroke: '#FFFFFF', 'stroke-width': 4, 'stroke-dasharray': '14 12', opacity: 0.6 }, tPlane);
  E('path', { d: 'M36,0 L-28,-12 L-44,-44 L-56,-44 L-48,-8 L-60,-4 L-68,-20 L-76,-20 L-72,0 L-76,20 L-68,20 L-60,4 L-48,8 L-56,44 L-44,44 L-28,12 Z', fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, tPlane);
  const logo = G(Lfg);
  const logo1 = T(logo, 0, -78, 'LOST IN', { size: 60, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 8 });
  const logo2 = T(logo, 0, 18, 'CONVERSION', { size: 100, weight: 800, anchor: 'middle', fill: GOLD, ls: 2 });
  [logo1, logo2].forEach(w => { w.setAttribute('stroke', '#0A1A3A'); w.setAttribute('stroke-width', 12); w.setAttribute('paint-order', 'stroke'); w.setAttribute('stroke-linejoin', 'round'); });
  const lRule = G(logo); tr(lRule, 0, 56);
  E('rect', { x: -330, y: 0, width: 660, height: 34, rx: 6, fill: '#F2C24A', stroke: '#0A1A3A', 'stroke-width': 4 }, lRule);
  let lt2 = ''; for (let i = 0; i <= 60; i++) lt2 += `M${-324 + i * 10.8},0 v${i % 10 === 0 ? 20 : i % 5 === 0 ? 14 : 8} `;
  E('path', { d: lt2, stroke: '#5A3A10', 'stroke-width': 2.5 }, lRule);
  const epi = T(Lfg, 600, 318, 'Episode 8: Are We There Yet?', { size: 42, weight: 700, anchor: 'middle', fill: '#FFFFFF' });

  /* ================= the cast ================= */
  const mum = cast(Lcast, 'mum');
  const dad = cast(Lcast, 'dad', { prop: 'phone' });
  const kav = cast(Lcast, 'kavya');
  const boy = cast(Lcast, 'boy');
  const met = cast(Lcast, 'metre');
  Lcast.insertBefore(lid, boy);                                    // the lid stands behind Ah Boy
  const lt = { kavya: lcLowerThird(Lhud, 'kavya'), mum: lcLowerThird(Lhud, 'mum'), dad: lcLowerThird(Lhud, 'dad'), boy: lcLowerThird(Lhud, 'boy'), metre: lcLowerThird(Lhud, 'metre') };
  const ltOn = (t, who, t0) => lt[who].set(win(t, t0, t0 + 3.1, 0.3));

  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cut points */
  const cH = at('tiny') - 0.06, cI = at('hi') - 0.06, cK = at('nasa') - 0.06, cM = at('coming') - 0.06, cN = at('title') - 0.06;
  const BOYX = 1010;

  /* the camera on the flat (also moves the cast and the table) */
  const flatCam = (k, fx, fy) => { [cam, camC, camF].forEach(el => view(el, k, fx, fy, fx, fy)); };

  return t => {
    op(blackout, 1 - P(t, 0, 0.6, linear));
    const sA = on(t, -1, cH), sH = on(t, cH, cI), sI = on(t, cI, cK), sK = on(t, cK, cM), sM = on(t, cM, cN), sN = on(t, cN, 1e9);
    const who = scWho(S, t);
    for (const k in lt) lt[k].set(0);
    const show = { mum: 0, dad: 0, kav: 0, boy: 0, met: 0, lid: 0 };

    /* ---------- A-G and M: the flat ---------- */
    const flatOn = sA || sM;
    op(flatShot, flatOn); op(camF, flatOn);
    op(aChips, 0); op(cKg, 0); op(cF, 0); op(cKm, 0); op(phone, 0); rosette.set(0, 0); op(shorts, 0); op(base, 0);
    op(bigCase, 0);
    if (!flatOn) { camC.removeAttribute('transform'); }
    if (sA) {
      // the camera: a slow push in on Kavya during the narration, then wide on the family
      const push = P(t, 0, at('mum') - 0.1, linear), wide = P(t, at('mum') - 0.1, 0.5, ease);
      flatCam(lerp(1 + 0.12 * push, 1, wide), lerp(470, 600, wide), lerp(400, 375, wide));
      show.kav = 1;
      tr(kav, 470, 412, 1.05);
      // moods: Kavya
      let km = 'neutral', kl = 0;
      if (t < at('mum')) { km = t > mid('kavya', 0.6) ? 'happy' : 'neutral'; kl = 0; }
      else if (who === 'mum') { km = 'happy'; kl = -0.8; }
      else if (t < at('f')) { km = t > mid('dad', 0.5) ? 'annoyed' : 'neutral'; kl = 0.8; }
      else if (t < at('fifty')) { km = 'annoyed'; kl = 0.7; }
      else if (t < at('boy')) { km = 'deadpan'; kl = t > end('fifty') ? 0 : 0.7; }
      else if (t < at('left')) { km = 'shock'; kl = 0.8; }
      else { km = 'deadpan'; kl = -0.6; }
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
      if (t < at('mum') - 0.1) {
        op(aChips, 1);
        popIn(cKav, t, mid('kavya', 0.05), 470, 220);
        popIn(cFri, t, mid('kavya', 0.3), 740, 262);
        popIn(cBlk, t, mid('kavya', 0.45), 740, 330);
        ltOn(t, 'kavya', at('kavya') + 1.2);
      }
      // the suitcase with Mum's 20 kg tag
      op(bigCase, 1); tr(bigCase, 930, 545);
      // Mum
      if (t >= at('mum') - 0.3) {
        show.mum = 1;
        const up = P(t, at('mum') - 0.3, 0.4, easeOut);
        tr(mum, 200, lerp(740, 412, up), 1.05);
        let mm = 'happy', ml = 0.6;
        if (t >= at('dad') && t < at('boy')) { mm = t > mid('dad', 0.6) ? 'annoyed' : 'neutral'; ml = 0.9; }
        else if (t >= at('boy') && t < at('left')) { mm = 'shock'; ml = 0.9; }
        else if (t >= at('left')) { mm = 'deadpan'; ml = t > end('left') ? 0 : 0.9; }
        mum.set({ t, talk: scTalk(S, t, 'mum'), mood: mm, look: ml, lift: t > mid('mum', 0.2) && t < at('dad') ? 1 : 0 });
        ltOn(t, 'mum', at('mum') + 0.1);
        if (t < at('dad') + 0.2) { cKg.set(P(t, mid('mum', 0.45), 0.4, linear)); tr(cKg, 840, 210); }
      }
      // Dad and his weather app
      if (t >= at('dad') - 0.3) {
        show.dad = 1;
        const up = P(t, at('dad') - 0.3, 0.4, easeOut);
        tr(dad, 690, lerp(740, 412, up), 1.05);
        let dm = 'smug', dl = -0.3;
        if (who === 'kavya') { dm = 'neutral'; dl = -0.7; }
        else if (t >= at('boy') && t < at('left')) { dm = 'shock'; dl = 0.9; }
        else if (t >= at('left')) { dm = 'deadpan'; dl = -0.8; }
        dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: dl, lift: t > mid('dad', 0.1) && t < at('boy') ? 1 : 0 });
        ltOn(t, 'dad', at('dad') + 0.1);
        // the phone, big, while Dad and Kavya argue about it
        if (t < at('boy')) {
          const pp = popIn(phone, t, mid('dad', 0.2), 1010, 330, 0.95);
          phone.set({ p: who === 'kavya' ? 0.5 + 0.5 * Math.sin(t * 8) : 0 });
        }
        // "Trust me, I did the maths": the rosette pops on his chest
        if (t >= mid('dad', 0.62)) rosette.set(P(t, mid('dad', 0.62), 0.4, linear), 0);
        tr(rosette, 648, 500 + (1 - up) * 220, 0.85);
        // "shorts": Dad's orange shorts land on the table
        if (t >= mid('dad', 0.84)) { const sp = P(t, mid('dad', 0.84), 0.45, pop); op(shorts, clamp(sp * 3)); tr(shorts, lerp(760, BOYX - 100, clamp(sp)), 478 - 120 * Math.sin(clamp(sp) * Math.PI), Math.max(0.01, sp), -12 + 30 * (1 - clamp(sp))); }
      }
      // Kavya: Fahrenheit
      if (t >= at('f') - 0.05 && t < at('boy')) { cF.set(P(t, mid('f', 0.3), 0.4, linear)); tr(cF, 640, 160); }
      // Ah Boy pops out of the open suitcase
      if (t >= at('boy') - 0.3) {
        op(bigCase, 0); show.boy = 1; show.lid = 1; op(base, 1); op(shorts, 1); tr(shorts, BOYX - 100, 478, 0.9, -12);
        const up = P(t, at('boy') - 0.3, 0.35, pop);
        tr(lid, BOYX, 455); tr(base, BOYX, 545);
        tr(boy, BOYX, lerp(600, 384, up), 1.0);
        boy.set({ t, talk: scTalk(S, t, 'boy'), mood: 'happy', look: t >= at('left') ? -0.7 : -0.3, lift: t < end('boy') ? 1 : 0 });
        ltOn(t, 'boy', at('boy') + 0.05);
      }
    }
    if (sM) {
      flatCam(1, 600, 375);
      show.mum = show.dad = show.kav = show.boy = show.lid = show.met = 1;
      op(base, 1); op(shorts, 1); tr(shorts, BOYX - 100, 478, 0.9, -12);
      tr(mum, 170, 412, 1.0); mum.set({ t, mood: 'neutral', look: 0.8 });
      tr(kav, 380, 412, 1.0); kav.set({ t, mood: t > mid('coming', 0.6) ? 'deadpan' : 'neutral', look: 0.6 });
      tr(dad, 760, 412, 1.0); dad.set({ t, mood: 'smug', look: -0.6, prop: 0 });
      tr(lid, BOYX, 455); tr(base, BOYX, 545);
      tr(boy, BOYX, 384, 1.0); boy.set({ t, mood: 'happy', look: -0.8 });
      rosette.set(1, 0); tr(rosette, 720, 500, 0.8);
      // Mètre hops onto the table, then into Ah Boy's suitcase
      const jump = P(t, cM, 0.4, pop), hop = P(t, mid('coming', 0.72), 0.6, ease);
      const mx = lerp(570, BOYX + 90, hop), my = lerp(lerp(560, 392, jump), 470, hop) - Math.sin(hop * Math.PI) * 140;
      tr(met, mx, my, 0.82 * (1 - 0.45 * hop));
      met.set({ t, talk: scTalk(S, t, 'metre'), mood: t > mid('coming', 0.6) ? 'happy' : 'smug', look: 0.2, point: t > mid('coming', 0.1) && t < mid('coming', 0.6) ? 1 : 0 });
      op(met, hop > 0.97 ? 0 : 1);
      cKm.set(P(t, mid('coming', 0.12), 0.4, linear)); tr(cKm, 600, 200);
    }

    /* ---------- H: zoom into the tag, into the "kg" ---------- */
    op(tagShot, sH); op(finder, sH);
    if (sH) {
      const z = P(t, cH + 0.3, cI - cH - 0.3, easeIn);
      const k = 0.62 * Math.pow(7 / 0.62, z);
      view(tagWrap, k, lerp(600, KX, z), lerp(380, KY - 60, z), 600, 375);
      setText(zoomTxt, 'ZOOM ×' + (k / 0.62 >= 10 ? String(Math.round(k / 0.62)) : (k / 0.62).toFixed(1)));
    }

    /* ---------- I, J: the confessional ---------- */
    conf.set(sI, t);
    op(plaque, 0); op(board, 0);
    if (sI) {
      show.met = 1;
      tr(met, 300, 400, 1.22);
      let mood = 'smug', look = 0.5;
      if (t >= at('gossip')) { mood = t > mid('gossip', 0.55) ? 'annoyed' : 'deadpan'; look = 0.6; }
      met.set({ t, talk: scTalk(S, t, 'metre'), mood, look, point: t > at('gossip') && t < mid('gossip', 0.8) ? 1 : 0 });
      ltOn(t, 'metre', at('hi') + 0.1);
      const pp = P(t, mid('hi', 0.12), 0.45, pop) * (1 - P(t, at('gossip') - 0.15, 0.2, linear));
      op(plaque, clamp(pp * 2.5)); tr(plaque, 840, 360, Math.max(0.01, 0.7 + 0.3 * pp));
      if (t >= at('gossip') - 0.1) {
        const bp = P(t, at('gossip') - 0.1, 0.4, pop);
        op(board, clamp(bp * 3)); tr(board, 840, 370, Math.max(0.01, 0.85 + 0.15 * bp));
        op(bQ, P(t, at('gossip'), 0.3, linear));
        opts.forEach((o, i) => op(o, P(t, mid('gossip', 0.2 + 0.11 * i), 0.25, linear)));
        op(ele, P(t, mid('gossip', 0.42), 0.25, linear));
        op(gossip, P(t, mid('gossip', 0.74), 0.3, linear));
      }
    }

    /* ---------- K, L: MEANWHILE, ON MARS ---------- */
    op(marsShot, sK); op(cOrb, 0); op(cMix, 0); op(cCost, 0);
    if (sK) {
      // the fall takes the "nasa" line; the crash lands in its pause
      const p = P(t, at('nasa') + 0.2, end('nasa') + 0.35 - at('nasa') - 0.2, linear);
      mars.set(t < at('pouf') ? p : 1, 1);
      if (t < at('pouf')) {
        popIn(cOrb, t, mid('nasa', 0.05), 860, 160);
        cMix.set(P(t, mid('nasa', 0.5), 0.4, linear)); tr(cMix, 680, 260);
      } else {
        cCost.set(P(t, at('pouf') + 0.05, 0.4, linear)); tr(cCost, 900, 600);
        // Mètre peeks in at the bottom left
        show.met = 1;
        const up = P(t, at('pouf') - 0.05, 0.4, easeOut);
        tr(met, 200, lerp(900, 560, up), 0.85);
        met.set({ t, talk: scTalk(S, t, 'metre'), mood: t > mid('pouf', 0.4) ? 'annoyed' : 'deadpan', look: 0.7 });
      }
    }

    /* ---------- N: title card ---------- */
    op(titleShot, sN); op(logo, 0); op(epi, 0);
    if (sN) {
      tr(rayP, 600, 600, 1, (t * 6 * AMP) % 360);
      const fly = P(t, at('title'), dur('title'), linear);
      tr(tPlane, lerp(-120, 1380, fly), 112 - 30 * Math.sin(fly * Math.PI), 0.9, -6 + 12 * fly);
      const lp = P(t, at('title') + 0.05, 0.6, pop);
      op(logo, clamp(lp * 2.5)); tr(logo, 600, 190, Math.max(0.01, 0.5 + 0.5 * lp));
      op(epi, P(t, mid('title', 0.42), 0.4, linear));
      const castT = i => mid('title', 0.48) + i * 0.13, xs = [170, 380, 600, 820, 1030];
      const row = [[mum, 'happy', 0.66, 'mum', 560], [kav, 'smug', 0.74, 'kav', 560], [met, 'smug', 0.5, 'met', 560], [dad, 'smug', 0.66, 'dad', 560], [boy, 'happy', 0.74, 'boy', 566]];
      row.forEach(([c, mood, s, key, y], i) => {
        const p = P(t, castT(i), 0.45, pop);
        show[key] = 1; op(c, clamp(p * 3));
        tr(c, xs[i], y + 30 * (1 - clamp(p)), Math.max(0.01, s * p));
        c.set({ t, mood, look: 0, lift: 0, point: 0 });
      });
    }

    /* characters not in this shot */
    if (!sN) { op(mum, show.mum); op(dad, show.dad); op(kav, show.kav); op(boy, show.boy); if (!sM) op(met, show.met); }
    op(lid, show.lid);
  };

  function dur(id) { return end(id) - at(id); }
});
