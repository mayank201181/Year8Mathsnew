/* Scene 0: Cold open (no chapter card).
   9 a.m., the Block 208 Community Club hall, concert tonight: Kavya, 12 -> the stage: Mr Tan (mic): a dancer has
   sprained her ankle, Kavya is in -> "I don't dance. I do maths." (her stat card) -> Priya: slide, flip, turn (three
   move cards) -> Dad in charge of lights, projector, ladder: "Nailed it." The banner falls -> Ah Boy's puppet
   dinosaur and its ENORMOUS shadow on the backdrop -> documentary zoom into the rehearsal room, onto the tall mirror
   -> Madame Miroir's confessional (the mirror; same distance, other side, at right angles; the WRONG MOVE stamp) ->
   Kavya raises her right hand; in the mirror pane it is her left (same distance either side) -> Ah Boy: the name
   plate reads backwards -> "YOU are backwards" -> title card. */
scene('cold', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);          // hard sitcom cut
  const view = (el, k, fx, fy, sx, sy) => el.setAttribute('transform', `translate(${sx.toFixed(1)} ${sy.toFixed(1)}) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); };
  const pill = (parent, text, o) => { o = o || {}; return mkChip(parent, text, { size: o.size || 30, col: o.col || C.ink }); };
  const GOLD = '#FFE45C', PINK = '#FF8FC8', TEAL = '#5FD3C8';
  const outline = (el, col, w) => { el.setAttribute('stroke', col); el.setAttribute('stroke-width', w); el.setAttribute('paint-order', 'stroke'); el.setAttribute('stroke-linejoin', 'round'); return el; };
  const tri = (parent, pts, fill) => E('path', { d: mkPoly(pts), fill, stroke: MK.ink, 'stroke-width': 3, 'stroke-linejoin': 'round' }, parent);
  /* a move card: SLIDE / FLIP / TURN, each with a tiny worked picture */
  const moveCard = (kind, label, col) => {
    const g = G(Lfg), inner = G(g);
    E('rect', { x: -112, y: -92, width: 224, height: 184, rx: 18, fill: MK.paper, stroke: col, 'stroke-width': 5 }, inner);
    T(inner, 0, 70, label, { size: 34, weight: 800, anchor: 'middle', fill: mkShade(col, -0.35), ls: 2 });
    const pic = G(inner); tr(pic, 0, -18);
    const A = [[-62, 26], [-26, 26], [-62, -24]];
    if (kind === 'slide') {
      tri(pic, A, '#9CC7F5');
      tri(pic, A.map(([x, y]) => [x + 80, y - 10]), '#2E7DD8');
      E('path', { d: 'M-40,4 L22,-6', stroke: MK.ink, 'stroke-width': 3, 'stroke-dasharray': '6 5' }, pic);
      E('path', { d: 'M22,-6 L10,-12 L12,0 Z', fill: MK.ink }, pic);
    } else if (kind === 'flip') {
      tri(pic, A.map(([x, y]) => [x + 6, y]), '#F7B3CF');
      E('path', { d: 'M0,-44 L0,44', stroke: '#1E5FC0', 'stroke-width': 4, 'stroke-dasharray': '8 6' }, pic);
      tri(pic, A.map(([x, y]) => [-(x + 6), y]), '#E8679A');
    } else {
      E('circle', { cx: 0, cy: 18, r: 6, fill: '#D32F2F' }, pic);
      const B = [[8, 18], [48, 18], [8, -18]];
      tri(pic, B, '#FFD08A');
      tri(pic, B.map(([x, y]) => [y - 18, 18 - x]), '#F28C28');            // the same triangle, a quarter-turn anticlockwise about the red dot
      E('path', { d: mkArcD(0, 18, 58, -10, -80), fill: 'none', stroke: MK.ink, 'stroke-width': 3 }, pic);
      const hd = G(pic); tr(hd, 58 * Math.cos(-80 * Math.PI / 180), 18 + 58 * Math.sin(-80 * Math.PI / 180), 1, 100);
      E('path', { d: 'M-8,-4 L8,-4 L0,10 Z', fill: MK.ink }, hd);
    }
    g.inner = inner;
    return g;
  };

  /* camera: everything but the HUD sits in `cam`, so a shot can push in */
  const cam = G(root);
  const Lbg = G(cam), Lcast = G(cam), Lfront = G(cam), Lfg = G(cam), Lui = G(root), Lhud = G(root);

  /* ================= A: the hall, 9 a.m. ================= */
  const hallShot = G(Lbg);
  const hall = tfHall(hallShot);
  const aChips = G(Lui);
  const cKav = pill(aChips, 'Kavya, age 12', { size: 32 });
  const cSat = pill(aChips, '**Saturday, 9 a.m.**', { size: 30, col: GOLD });
  const cBlk = pill(aChips, 'Blk 208 Community Club', { size: 28 });
  const cTon = pill(aChips, 'Year-End Concert: **tonight, 7 p.m.**', { size: 28, col: PINK });

  /* ================= B, C, D: the stage ================= */
  const stageShot = G(Lbg);
  const stage = tfStage(stageShot);
  const dinoShadow = tfDino(stageShot, { col: '#111', stick: false });   // the ENORMOUS shadow on the backdrop
  Lfront.appendChild(stage.front); Lfront.appendChild(stage.top);
  const cItem = pill(Lfg, 'Item 7: **one dancer short**', { size: 30, col: '#FF8A8A' });
  // Kavya's stat card
  const stat = G(Lfg);
  E('rect', { x: -170, y: -62, width: 340, height: 124, rx: 16, fill: 'rgba(10,27,39,0.92)', stroke: C.line, 'stroke-width': 3 }, stat);
  T(stat, -150, -14, 'DANCE', { size: 28, weight: 800, fill: C.ink });
  T(stat, -150, 40, 'MATHS', { size: 28, weight: 800, fill: C.ink });
  E('rect', { x: -40, y: -36, width: 190, height: 26, rx: 13, fill: '#2C3E4C' }, stat);
  E('rect', { x: -40, y: 18, width: 190, height: 26, rx: 13, fill: '#2C3E4C' }, stat);
  const barD = E('rect', { x: -40, y: -36, width: 0, height: 26, rx: 13, fill: '#FF6070' }, stat);
  const barM = E('rect', { x: -40, y: 18, width: 0, height: 26, rx: 13, fill: '#56D69B' }, stat);
  const cards = [moveCard('slide', 'SLIDE', '#2E7DD8'), moveCard('flip', 'FLIP', '#C2185B'), moveCard('turn', 'TURN', '#E8751A')];
  const jobs = [pill(Lfg, 'LIGHTS', { col: GOLD }), pill(Lfg, 'PROJECTOR', { col: GOLD }), pill(Lfg, 'BANNER LADDER', { col: GOLD })];
  const cPup = pill(Lfg, 'puppet: **5 cm**', { size: 28, col: '#9FE0B5' });

  /* ================= E, G, H: the rehearsal room ================= */
  const studioShot = G(Lbg);
  const studio = tfStudio(studioShot);
  // the long mirror pane on the wall (shots G, H): its left edge is the mirror line
  const pane = G(studioShot);
  E('rect', { x: 452, y: 112, width: 380, height: 420, rx: 6, fill: '#B07A45', stroke: SC_INK, 'stroke-width': 4 }, pane);
  E('rect', { x: 466, y: 126, width: 352, height: 392, fill: linGrad('#EAF6FF', '#B9DCF2', true) }, pane);
  E('path', { d: 'M520,150 L480,230 M600,140 L500,330 M790,300 L740,400', stroke: '#FFFFFF', 'stroke-width': 9, opacity: 0.5, 'stroke-linecap': 'round' }, pane);
  const studioFront = studio.front, studioTop = studio.top;
  Lfront.appendChild(studioFront); Lfront.appendChild(studioTop);
  const finder = G(Lhud);
  E('path', { d: 'M40,140 L40,40 L140,40 M1060,40 L1160,40 L1160,140 M1160,610 L1160,710 L1060,710 M140,710 L40,710 L40,610', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 5, opacity: 0.8 }, finder);
  const zoomTxt = T(finder, 1130, 690, 'ZOOM ×1', { size: 30, weight: 700, anchor: 'end', fill: '#FFFFFF' });
  // shot G: labels
  const gLab = G(Lfg);
  const cRight = pill(gLab, 'her **RIGHT** hand', { size: 28, col: GOLD });
  const cLeft = pill(gLab, 'in the mirror: her **LEFT**', { size: 28, col: TEAL });
  const cRev = pill(gLab, 'a reflection **reverses**', { size: 30, col: '#FF8A8A' });
  const dist = G(gLab);
  const arrowH = (x1, x2, y, col) => { E('path', { d: `M${x1 + 14},${y} L${x2 - 14},${y}`, stroke: col, 'stroke-width': 5 }, dist); E('path', { d: `M${x1},${y} l16,-10 l0,20 Z M${x2},${y} l-16,-10 l0,20 Z`, fill: col }, dist); };
  arrowH(262, 456, 300, GOLD); arrowH(462, 656, 300, GOLD);
  const dl = T(dist, 459, 286, 'same distance', { size: 26, weight: 800, anchor: 'middle', fill: GOLD });
  outline(dl, '#3A2A10', 7);
  // shot H: the name plate, magnified
  const plateBig = G(Lfg);
  E('rect', { x: -150, y: -46, width: 300, height: 92, rx: 14, fill: '#2A1E10', stroke: '#E2B33C', 'stroke-width': 6 }, plateBig);
  const pbT = G(plateBig); pbT.setAttribute('transform', 'scale(-1 1)');
  T(pbT, 0, 22, 'MIROIR', { size: 62, weight: 800, anchor: 'middle', fill: '#F6D77A', ls: 6 });
  const ring = E('ellipse', { cx: 0, cy: 0, rx: 92, ry: 34, fill: 'none', stroke: GOLD, 'stroke-width': 6 }, Lfg);
  const link = E('path', { d: '', stroke: GOLD, 'stroke-width': 4, 'stroke-dasharray': '10 8' }, Lfg);

  /* ================= F: Madame Miroir's confessional ================= */
  const conf = tfConf(Lbg, 'miroir');
  const plaque = G(Lfg);
  E('rect', { x: -260, y: -170, width: 520, height: 340, rx: 18, fill: '#1E160C', stroke: '#E2B33C', 'stroke-width': 5 }, plaque);
  T(plaque, 0, -116, 'THE MIRROR', { size: 42, weight: 800, anchor: 'middle', fill: '#F6D77A', ls: 3 });
  // a little reflection: triangle, mirror line, image, equal distances
  const pd = G(plaque); tr(pd, 0, -20);
  E('path', { d: 'M0,-58 L0,62', stroke: '#7FC4F5', 'stroke-width': 5, 'stroke-dasharray': '10 7' }, pd);
  tri(pd, [[-150, 40], [-70, 40], [-150, -30]], '#F7B3CF');
  tri(pd, [[150, 40], [70, 40], [150, -30]], '#E8679A');
  E('path', { d: 'M-70,40 L70,40', stroke: GOLD, 'stroke-width': 3, 'stroke-dasharray': '5 5' }, pd);
  E('path', { d: 'M-12,40 L-12,28 L0,28', fill: 'none', stroke: GOLD, 'stroke-width': 3 }, pd);
  T(pd, -36, 30, '|', { size: 26, weight: 800, anchor: 'middle', fill: GOLD }); T(pd, 36, 30, '|', { size: 26, weight: 800, anchor: 'middle', fill: GOLD });
  T(plaque, 0, 90, 'same distance · other side', { size: 30, weight: 700, anchor: 'middle', fill: '#FFF3D0', font: FB });
  T(plaque, 0, 132, 'at right angles', { size: 30, weight: 700, anchor: 'middle', fill: '#FFF3D0', font: FB });
  const stamp = tfStamp(Lfg, false);

  /* ================= I: title card ================= */
  const titleShot = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#3A0A1E', '#8E1446', true) }, titleShot);
  tfCurtain(titleShot, 0, 130, 1); tfCurtain(titleShot, 1070, 130, -1);
  const beams = [[300, -1], [900, 1]].map(([x, sd]) => E('path', { d: `M${x},-20 L${x + sd * 40 - 160},760 L${x + sd * 40 + 160},760 Z`, fill: '#FFF3B0', opacity: 0.12 }, titleShot));
  E('ellipse', { cx: 600, cy: 640, rx: 520, ry: 120, fill: glow('#FF8FC8'), opacity: 0.35 }, titleShot);
  const logo = G(Lfg);
  const lw = ['SLIDE,', 'FLIP,', 'TURN'].map((w, i) => {
    const wg = G(logo), el = T(wg, 0, 32, w, { size: 92, weight: 800, anchor: 'middle', fill: ['#7FC4F5', '#FF8FC8', '#FFC27A'][i] });
    outline(el, '#2A0614', 14);
    return wg;
  });
  const epi = T(Lfg, 560, 300, 'Episode 17: Three Right, Two Down', { size: 40, weight: 700, anchor: 'middle', fill: '#FFFFFF' });
  const epiVec = tfVec(Lfg, '3', '-2', { size: 34, col: '#FFFFFF' });

  /* ================= the cast ================= */
  const kav = cast(Lcast, 'kavya');
  const arm = tfArm(Lcast);
  const reflWrap = G(Lcast);
  const kavR = cast(reflWrap, 'kavya'); const armR = tfArm(reflWrap);
  const tan = cast(Lcast, 'tan');
  const priya = cast(Lcast, 'priya');
  const dad = cast(Lcast, 'dad');
  const boy = cast(Lcast, 'boy', { prop: 'dino' });
  const mir = cast(Lcast, 'miroir');
  const lt = { kavya: tfLowerThird(Lhud, 'kavya'), tan: tfLowerThird(Lhud, 'tan'), priya: tfLowerThird(Lhud, 'priya'), dad: tfLowerThird(Lhud, 'dad'), boy: tfLowerThird(Lhud, 'boy'), miroir: tfLowerThird(Lhud, 'miroir') };
  const ltOn = (t, who, t0) => lt[who].set(win(t, t0, t0 + 3.1, 0.3));

  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cut points */
  const cB = at('tan') - 0.06, cD = at('boy') - 0.06, cE = at('tiny') - 0.06, cF = at('hi') - 0.06,
    cG = at('hand') - 0.06, cH = at('tag') - 0.06, cI = at('title') - 0.06;
  const fall = end('dad') + 0.05;          // the banner's right rope gives way
  const bannerAngle = t => { const p = P(t, fall, 0.5, easeIn); const wob = t > fall + 0.5 ? Math.sin((t - fall - 0.5) * 7) * 5 * Math.exp(-(t - fall - 0.5) * 1.6) : 0; return 24 * p + wob; };

  return t => {
    op(blackout, 1 - P(t, 0, 0.6, linear));
    const sA = on(t, -1, cB), sB = on(t, cB, cE), sE = on(t, cE, cF), sF = on(t, cF, cG), sG = on(t, cG, cH),
      sH = on(t, cH, cI), sI = on(t, cI, 1e9);
    const studioOn = sE || sG || sH;
    for (const k in lt) lt[k].set(0);
    const show = { kav: 0, kavR: 0, tan: 0, priya: 0, dad: 0, boy: 0, mir: 0 };
    cam.removeAttribute('transform');

    /* ---------- A: wide shot of the hall ---------- */
    op(hallShot, sA); op(aChips, 0);
    if (sA) {
      hall.upd(t);
      const push = P(t, 0, cB, linear);
      view(cam, 1 + 0.16 * push, 600, 330, lerp(600, 560, push), lerp(375, 395, push));
      show.kav = 1;
      tr(kav, 990, 612, 1.0);
      kav.set({ t, talk: 0, mood: t < mid('kavya', 0.55) ? 'neutral' : 'happy', look: -0.7 });
      op(aChips, 1);
      popIn(cKav, t, mid('kavya', 0.06), 990, 420);
      popIn(cSat, t, mid('kavya', 0.3), 250, 560);
      popIn(cBlk, t, mid('kavya', 0.5), 250, 620);
      popIn(cTon, t, mid('kavya', 0.78), 290, 680);
      ltOn(t, 'kavya', at('kavya') + 0.4);
      if (t > at('kavya') + 0.4 && t < at('kavya') + 3.6) { op(cSat, 0); op(cBlk, 0); op(cTon, 0); }   // keep the lower third clear
    }

    /* ---------- B, C, D: the stage ---------- */
    const stageOn = sB;
    op(stageShot, stageOn); op(stage.front, stageOn); op(stage.top, stageOn);
    op(cItem, 0); op(stat, 0); cards.forEach(c => op(c, 0)); jobs.forEach(c => op(c, 0)); op(cPup, 0); op(dinoShadow, 0);
    if (stageOn) {
      stage.upd(t);
      stage.banner.setAttribute('transform', `translate(600 150) rotate(${bannerAngle(t).toFixed(2)} -260 0)`);
      const shotC = t >= at('dad') - 0.06 && t < cD, shotD = t >= cD;
      if (!shotC && !shotD) {
        // Mr Tan, Kavya, then Priya
        show.tan = 1; show.kav = 1;
        tr(tan, 900, 432, 1.06);
        let tm = 'happy';
        if (t >= at('dance')) tm = t < at('same') ? 'smug' : 'neutral';
        tan.set({ t, talk: scTalk(S, t, 'tan'), mood: tm, look: t < at('same') ? -0.8 : -0.5, lift: 1 });
        ltOn(t, 'tan', at('tan') + 0.1);
        popIn(cItem, t, mid('tan', 0.3), 640, 250); if (t > at('dance')) op(cItem, 0);
        tr(kav, 300, 440, 1.05);
        let km = 'happy';
        if (t >= mid('tan', 0.75)) km = 'shock';
        if (t >= at('dance')) km = 'deadpan';
        if (t >= at('same')) km = t < mid('same', 0.6) ? 'neutral' : 'annoyed';
        kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: t < at('same') ? 0.8 : 0.6 });
        // stat card
        if (t >= at('dance') && t < at('same')) {
          popIn(stat, t, at('dance') + 0.1, 620, 290);
          attr(barD, 'width', 190 * 0.08 * P(t, at('dance') + 0.4, 0.5));
          attr(barM, 'width', 190 * P(t, mid('dance', 0.5), 0.7));
        }
        // Priya and the three moves
        if (t >= at('same') - 0.3) {
          show.priya = 1;
          const up = P(t, at('same') - 0.3, 0.35, pop);
          tr(priya, 610, lerp(660, 440, up), 1.04);
          priya.set({ t, talk: scTalk(S, t, 'priya'), mood: t < mid('same', 0.8) ? 'happy' : 'smug', look: -0.6, lift: t < mid('same', 0.75) ? 1 : 0 });
          ltOn(t, 'priya', at('same') + 0.05);
          [0.18, 0.36, 0.55].forEach((f, i) => { const c = cards[i]; popIn(c, t, mid('same', f), [300, 600, 900][i], 230, 1); });
        }
      } else if (shotC) {
        // Dad: lights, projector, ladder. Nailed it. The banner falls.
        show.dad = 1; show.kav = 1; show.priya = 1;
        const up = P(t, at('dad') - 0.06, 0.4, easeOut);
        tr(dad, 600, lerp(660, 436, up), 1.08);
        const fallen = t > fall + 0.25;
        dad.set({ t, talk: scTalk(S, t, 'dad'), mood: fallen ? 'shock' : 'smug', look: fallen ? 0.5 : 0, lift: t > mid('dad', 0.7) && !fallen ? 1 : 0 });
        ltOn(t, 'dad', at('dad') + 0.05);
        tr(kav, 250, 440, 1.0); kav.set({ t, mood: fallen ? 'deadpan' : 'neutral', look: fallen ? 0.7 : 0.8 });
        tr(priya, 950, 440, 1.0); priya.set({ t, mood: fallen ? 'shock' : 'neutral', look: fallen ? -0.5 : -0.8 });
        [0.2, 0.36, 0.52].forEach((f, i) => popIn(jobs[i], t, mid('dad', f), [250, 600, 950][i], 270));
        if (fallen) jobs.forEach(c => op(c, 0));
      } else {
        // Ah Boy, his puppet, and its ENORMOUS shadow
        show.boy = 1; show.dad = 1; show.kav = 1;
        const up = P(t, cD, 0.35, pop);
        tr(boy, 560, lerp(660, 432, up), 1.08);
        boy.set({ t, talk: scTalk(S, t, 'boy'), mood: 'happy', look: 0.3, lift: 1 });
        ltOn(t, 'boy', at('boy') + 0.05);
        popIn(cPup, t, mid('boy', 0.12), 760, 300); if (t > mid('boy', 0.55)) op(cPup, 0);
        const g = P(t, mid('boy', 0.45), 1.2, easeOut);
        op(dinoShadow, 0.85 * clamp(g * 3)); tr(dinoShadow, 660, 360, 0.6 + 2.6 * g);
        tr(dad, 230, 436, 1.04); dad.set({ t, mood: t > mid('boy', 0.6) ? 'shock' : 'neutral', look: 0.9 });
        tr(kav, 930, 440, 1.0); kav.set({ t, mood: t > mid('boy', 0.6) ? 'shock' : 'deadpan', look: -0.9 });
      }
    }

    /* ---------- E, G, H: the rehearsal room ---------- */
    op(studioShot, studioOn); op(studioFront, studioOn); op(studioTop, studioOn); op(finder, sE);
    op(pane, sG || sH);
    op(gLab, 0); op(plateBig, 0); op(ring, 0); op(link, 0);
    op(reflWrap, 0); arm.set(0);
    if (studioOn) studio.upd(t);
    if (sE) {
      // documentary zoom onto the tall mirror in the corner
      show.mir = 1;
      tr(mir, 900, 312, 0.95);
      mir.set({ t, mood: t < mid('tiny', 0.7) ? 'neutral' : 'smug', look: t < mid('tiny', 0.7) ? 0.6 : 0, still: false });
      const z = P(t, cE + 0.6, cF - cE - 0.6, ease);
      const k = 1 + 1.25 * z;
      view(cam, k, lerp(600, 900, z), lerp(375, 290, z), 600, 375);
      setText(zoomTxt, 'ZOOM ×' + k.toFixed(1));
    }
    if (sG) {
      // Kavya raises her right hand; in the mirror pane it is her left
      show.kav = 1; show.mir = 1;
      tr(kav, 262, 440, 1.0);
      const raise = P(t, at('hand') + 0.3, 0.5, easeOut);
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: t < at('left') ? 'neutral' : 'shock', look: 0.8 });
      arm.set(raise); tr(arm, 262 - 80, 440 + 66, 1.0);
      op(reflWrap, 0.88);
      reflWrap.setAttribute('transform', 'translate(656 440) scale(-1 1)');
      kavR.set({ t, mood: t < at('left') ? 'neutral' : 'shock', look: 0.8 });
      armR.set(raise); tr(armR, -80, 66, 1.0);
      tr(mir, 1030, 330, 0.85);
      mir.set({ t, talk: scTalk(S, t, 'miroir'), mood: t < at('left') ? 'smug' : 'neutral', look: -0.8 });
      op(gLab, 1);
      popIn(cRight, t, at('hand') + 0.7, 190, 250);
      popIn(cLeft, t, mid('left', 0.15), 730, 210);
      op(dist, P(t, mid('left', 0.45), 0.3, linear));
      popIn(cRev, t, mid('left', 0.62), 820, 600);
      if (t < mid('left', 0.45)) op(dist, 0);
    }
    if (sH) {
      // Ah Boy and the name plate; "YOU are backwards"
      show.boy = 1; show.mir = 1;
      const punch = t >= at('you') ? P(t, at('you'), 0.3, ease) : 0;
      if (punch > 0) view(cam, 1 + 0.35 * punch, lerp(600, 420, punch), lerp(375, 400, punch), 600, 375);
      tr(boy, 380, 424, 1.08);
      let bm = 'happy';
      if (t >= at('you')) bm = t < mid('you', 0.7) ? 'shock' : 'sad';
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: bm, look: t < end('you') ? 0.8 : -0.2, lift: t < at('you') ? 1 : 0 });
      tr(mir, 820, 320, 1.0);
      mir.set({ t, talk: scTalk(S, t, 'miroir'), mood: t < at('you') ? 'neutral' : 'annoyed', look: -0.8, tap: t > mid('you', 0.4) && t < mid('you', 0.7) ? 1 : 0 });
      const pr = P(t, mid('tag', 0.35), 0.3, linear) * (1 - P(t, at('you') - 0.1, 0.2, linear));
      op(ring, pr); tr(ring, 820, 436);
      op(plateBig, pr); popIn(plateBig, t, mid('tag', 0.45), 860, 640, 0.9);
      if (pr <= 0) op(plateBig, 0);
      op(link, pr * 0.9); attr(link, 'd', 'M820,470 L850,596');
    }

    /* ---------- F: the confessional ---------- */
    conf.set(sF, t);
    op(plaque, 0); op(stamp, 0);
    if (sF) {
      show.mir = 1;
      const push = P(t, cF, cG - cF, linear);
      tr(mir, 320, 400, 1.22 * (1 + 0.04 * push));
      const tapT = mid('hi', 0.8);
      const tap = t < tapT - 0.4 ? 0 : t < tapT ? P(t, tapT - 0.4, 0.3, easeOut) : 1 - P(t, tapT, 0.12, easeIn);
      mir.set({ t, talk: scTalk(S, t, 'miroir'), mood: t < mid('hi', 0.5) ? 'smug' : 'annoyed', look: t > mid('hi', 0.3) ? 0.5 : 0, tap });
      ltOn(t, 'miroir', at('hi') + 0.1);
      const pp = P(t, mid('hi', 0.22), 0.45, pop);
      op(plaque, clamp(pp * 2.5)); tr(plaque, 860, 330, Math.max(0.01, 0.75 + 0.25 * pp));
      if (t >= tapT) { stamp.set(P(t, tapT, 0.35, linear)); tr(stamp, 860, 575, 0.62); }
    }

    /* ---------- I: title card ---------- */
    op(titleShot, sI); op(logo, 0); op(epi, 0); op(epiVec, 0);
    if (sI) {
      beams.forEach((b, i) => op(b, 0.1 + 0.05 * Math.sin(t * 2 * AMP + i * 2)));
      const lp = P(t, at('title') + 0.05, 0.6, pop);
      op(logo, clamp(lp * 2.5)); tr(logo, 600, 190, Math.max(0.01, 0.5 + 0.5 * lp));
      // each word does its own move: SLIDE slides in, FLIP flips, TURN turns
      const m1 = P(t, at('title') + 0.1, 0.6, easeOut), m2 = P(t, at('title') + 0.45, 0.6, ease), m3 = P(t, at('title') + 0.8, 0.7, easeOut);
      tr(lw[0], -330 - 260 * (1 - m1), 0); op(lw[0], clamp(m1 * 2));
      const fx = Math.cos(Math.PI * (1 - m2));
      lw[1].setAttribute('transform', `translate(-10 0) scale(${(Math.abs(fx) < 0.02 ? 0.02 : fx).toFixed(3)} 1)`);
      tr(lw[2], 300, 0, 1, -180 * (1 - m3));
      op(epi, P(t, mid('title', 0.42), 0.4, linear));
      op(epiVec, P(t, mid('title', 0.55), 0.4, linear)); tr(epiVec, 960, 286);
      const castT = i => mid('title', 0.5) + i * 0.13, xs = [180, 390, 600, 810, 1020];
      const row = [[priya, 'happy', 0.72, 'priya'], [kav, 'smug', 0.78, 'kav'], [mir, 'smug', 0.56, 'mir'], [dad, 'smug', 0.72, 'dad'], [boy, 'happy', 0.8, 'boy']];
      row.forEach(([c, mood, s, key], i) => {
        const p = P(t, castT(i), 0.45, pop);
        show[key] = 1; op(c, clamp(p * 3));
        tr(c, xs[i], (key === 'mir' ? 500 : 545) + 30 * (1 - clamp(p)), Math.max(0.01, s * p));
        c.set({ t, mood, look: 0, lift: 0, tap: 0 });
      });
    }

    /* characters not in this shot */
    if (!sI) { op(kav, show.kav); op(tan, show.tan); op(priya, show.priya); op(dad, show.dad); op(boy, show.boy); op(mir, show.mir); }
    else op(tan, 0);
  };
});
