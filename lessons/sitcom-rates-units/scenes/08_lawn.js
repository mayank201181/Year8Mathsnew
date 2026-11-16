/* Scene 8: Heels versus elephant (pressure, stretch).
   The wedding on Uncle Raj's hectare (100 m by 100 m = 10 000 m²) -> Mum's stilettos sink, Dad's big feet don't ->
   Trish's new letters F / P / A: pressure = force / area -> force in newtons, 1 kg weighs about 10 N -> the showpiece:
   Mum's heel, 600 N on 1 cm², 600 N/cm², beside an elephant, 50 000 N on 5000 cm², 10 N/cm² -> 600 / 10 = 60 times
   harder than an elephant -> Mum takes it as a compliment -> same force, smaller area, bigger pressure: a sharp knife,
   a snowshoe -> N/m² are pascals, 1 N/cm² = 10 000 Pa -> Dad's sandals: big area; the rosette stays on ->
   "For once, he did": slow push-in on Dad. */
scene('lawn', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);          // hard sitcom cut
  const view = (el, k, fx, fy, sx, sy) => el.setAttribute('transform', `translate(${sx.toFixed(1)} ${sy.toFixed(1)}) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const fade = (t, a, b) => win(t, a, b, 0.2);
  const show = (el, t, t0, t1) => { const p = P(t, t0, 0.3, easeOut), q = t1 === undefined ? 1 : 1 - P(t, t1, 0.2, linear); op(el, Math.min(p, q)); tr(el, 0, 10 * (1 - p)); };
  const GOLD = '#FFE45C', INK = MK.ink, GREEN = '#1E9E5A', RED = '#C62828', BLUE = '#2E7DD8', BERRY = '#B8336A', MUTED = '#5A4A52', SKIN = SC_SKIN.deep;
  const paper = (parent, x, y, w, h) => {
    E('rect', { x: x + 6, y: y + 6, width: w, height: h, rx: 16, fill: 'rgba(0,0,0,0.25)' }, parent);
    return E('rect', { x, y, width: w, height: h, rx: 16, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, parent);
  };
  const grass = (parent, x, y, w, h) => {
    E('rect', { x, y, width: w, height: h, fill: linGrad('#7FC45A', '#4F9A3A', true) }, parent);
    let d = ''; for (let i = 0; i < w / 14; i++) d += `M${x + 7 + i * 14},${y} l-4,-12 M${x + 11 + i * 14},${y} l4,-11 `;
    E('path', { d, stroke: '#3F8A34', 'stroke-width': 3, 'stroke-linecap': 'round' }, parent);
  };
  // a stiletto in profile, origin = the heel tip
  function lwHeel(parent, s) {
    const g = G(parent); tr(g, 0, 0, s);
    E('path', { d: 'M-8,-104 L8,-80 L5,0 L-3,0 Z', fill: '#3A1030', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
    E('path', { d: 'M-10,-108 Q40,-112 92,-56 Q130,-16 204,-12 Q222,-8 214,6 L124,6 Q74,6 42,-40 Q24,-70 8,-78 Z', fill: '#D6337A', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
    E('path', { d: 'M40,-86 Q80,-60 110,-34', fill: 'none', stroke: '#FF8FC8', 'stroke-width': 5, 'stroke-linecap': 'round' }, g);
    E('circle', { cx: 150, cy: -20, r: 6, fill: GOLD, stroke: SC_INK, 'stroke-width': 2 }, g);
    return g;
  }
  // a big flat sandal with a foot, origin = centre of the sole's bottom
  function lwSandal(parent, s) {
    const g = G(parent); tr(g, 0, 0, s);
    E('path', { d: 'M-110,-18 Q-118,-56 -70,-64 L60,-60 Q112,-58 118,-30 L118,-18 Z', fill: SKIN, stroke: SC_INK, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, g);
    [[78, -50], [96, -44], [108, -36]].forEach(([x, y]) => E('circle', { cx: x, cy: y, r: 8, fill: SKIN, stroke: SC_INK, 'stroke-width': 2.5 }, g));
    E('rect', { x: -124, y: -18, width: 252, height: 18, rx: 8, fill: '#8B5A2B', stroke: SC_INK, 'stroke-width': 3.5 }, g);
    E('path', { d: 'M-50,-64 L-40,-18 M30,-60 L40,-18', stroke: '#6B4423', 'stroke-width': 12, 'stroke-linecap': 'round' }, g);
    return g;
  }

  /* layers: the world (under a camera), the cutaway, boards, HUD */
  const World = G(root), Lset = G(World), Lcut = G(World), Lcast = G(World), Lfront = G(World), Lros = G(World);
  const Lfg = G(root), Lhud = G(root);

  /* ================= the garden ================= */
  const garden = lcGarden(Lset);
  Lfront.appendChild(garden.front); Lfront.appendChild(garden.top);
  const HY = garden.counterY;   // 610

  // the hectare plan
  const plan = G(Lfg);
  paper(plan, 700, 112, 460, 256);
  const pl = G(plan); tr(pl, 760, 150);
  E('rect', { x: 0, y: 0, width: 150, height: 150, fill: '#7FC45A', stroke: GREEN, 'stroke-width': 4 }, pl);
  E('rect', { x: 0, y: 27, width: 150, height: 96, fill: 'none', stroke: '#FFFFFF', 'stroke-width': 2.5, opacity: 0.85 }, pl);
  E('path', { d: 'M75,27 V123 M0,55 h22 v40 h-22 M150,55 h-22 v40 h22', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 2.5, opacity: 0.85 }, pl);
  E('circle', { cx: 75, cy: 75, r: 14, fill: 'none', stroke: '#FFFFFF', 'stroke-width': 2.5, opacity: 0.85 }, pl);
  mkMath(pl, 75, 186, '100 "m"', { size: 28, anchor: 'middle', fill: INK, weight: 700 });
  const sideL = G(pl); tr(sideL, -14, 75, 1, -90); mkMath(sideL, 0, 0, '100 "m"', { size: 28, anchor: 'middle', fill: INK, weight: 700 });
  mkText(plan, 1040, 196, '**1 hectare**', { size: 34, anchor: 'middle', fill: INK, boldFill: GREEN });
  const planM1 = mkMath(plan, 1040, 252, '100 "m" × 100 "m"', { size: 30, anchor: 'middle', fill: INK });
  const planM2 = mkMath(plan, 1040, 306, '= 10 000 "m"²', { size: 34, anchor: 'middle', fill: GREEN, weight: 700 });
  const planM3 = mkText(plan, 1040, 348, '(square it!)', { size: 26, anchor: 'middle', fill: MUTED });
  // the heel and the sandal, close up
  const heelCard = G(Lfg);
  paper(heelCard, 60, 112, 360, 256);
  const hcClip = 'lwhc' + 1;
  { const cp = E('clipPath', { id: hcClip }, defs()); E('rect', { x: 62, y: 114, width: 356, height: 252, rx: 14 }, cp); }
  const hcIn = G(heelCard, { 'clip-path': `url(#${hcClip})` });
  E('rect', { x: 62, y: 114, width: 356, height: 252, fill: '#DFF0FA' }, hcIn);
  const heelBig = lwHeel(hcIn, 1.05);
  grass(hcIn, 62, 300, 356, 70);
  const heelLab = mkChip(heelCard, 'heels **sink!**', { size: 30, col: RED, solid: false, fill: 'rgba(255,255,255,0.92)', textCol: INK });
  tr(heelLab, 240, 150);
  const sanCard = G(Lfg);
  paper(sanCard, 440, 112, 360, 256);
  E('rect', { x: 442, y: 114, width: 356, height: 252, rx: 14, fill: '#DFF0FA' }, sanCard);
  const sanBig = lwSandal(sanCard, 1.0); tr(sanBig, 620, 300);
  grass(sanCard, 442, 300, 356, 66);
  const sanLab = mkChip(sanCard, "Dad's sandals: **don't**", { size: 30, col: GREEN, fill: 'rgba(255,255,255,0.92)', textCol: INK });
  tr(sanLab, 620, 150);

  // the pressure board (Trish)
  const pBoard = G(Lfg), PX = 500;
  paper(pBoard, 60, 112, 880, 256);
  const presG = G(pBoard);
  mkText(presG, PX, 186, '**pressure** = force ÷ area', { size: 44, anchor: 'middle', fill: INK, boldFill: BERRY });
  const pFor = mkMath(presG, PX, 318, 'P = F/A', { size: 76, anchor: 'middle', fill: BERRY, weight: 700 });
  const newtG = G(pBoard);
  mkText(newtG, PX, 180, 'force is in **newtons** ({{"N"}})', { size: 40, anchor: 'middle', fill: INK, boldFill: BLUE });
  const wt = G(newtG); tr(wt, 250, 290);
  E('path', { d: 'M-50,40 L50,40 L36,-30 L-36,-30 Z', fill: '#5A6670', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, wt);
  E('path', { d: 'M-16,-30 Q-16,-52 0,-52 Q16,-52 16,-30', fill: 'none', stroke: SC_INK, 'stroke-width': 6 }, wt);
  T(wt, 0, 22, '1 kg', { size: 30, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  const wtArrow = arrow(newtG, 330, 260, 330, 340, { color: RED, width: 6 });
  const newtM = mkText(newtG, 640, 310, '**1 kg** weighs about **10 N**', { size: 40, anchor: 'middle', fill: INK, boldFill: RED });
  const areaG = G(pBoard);
  mkText(areaG, PX, 160, 'same force, **smaller area**: **bigger pressure**', { size: 34, anchor: 'middle', fill: INK, boldFill: BERRY });
  // the knife
  const knife = G(areaG); tr(knife, 270, 270);
  E('rect', { x: -110, y: 20, width: 220, height: 40, rx: 6, fill: '#F28C28', stroke: SC_INK, 'stroke-width': 3 }, knife);   // a carrot
  E('path', { d: 'M-6,20 L-4,-50 L60,-50 L60,-40 Z', fill: '#C9D3DC', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, knife);
  E('rect', { x: 50, y: -60, width: 90, height: 24, rx: 8, fill: '#6B4423', stroke: SC_INK, 'stroke-width': 3 }, knife);
  const kArr = arrow(knife, 100, -100, 100, -66, { color: RED, width: 5 });
  const knifeLab = mkText(areaG, 270, 352, 'tiny area: **big** pressure', { size: 28, anchor: 'middle', fill: INK, boldFill: RED });
  // the snowshoe
  const shoe = G(areaG); tr(shoe, 730, 280);
  E('rect', { x: -170, y: 22, width: 340, height: 26, rx: 10, fill: '#FFFFFF', stroke: '#B9C4CE', 'stroke-width': 3 }, shoe);
  E('ellipse', { cx: 0, cy: 14, rx: 130, ry: 18, fill: 'none', stroke: '#6B4423', 'stroke-width': 7 }, shoe);
  E('path', { d: 'M-110,14 H110 M-60,0 L-60,28 M0,-2 L0,30 M60,0 L60,28', stroke: '#8B5A2B', 'stroke-width': 3 }, shoe);
  E('path', { d: 'M-40,4 Q-46,-34 -10,-40 L30,-40 Q50,-30 46,4 Z', fill: '#2E4C8C', stroke: SC_INK, 'stroke-width': 3 }, shoe);
  const sArr = arrow(shoe, 4, -100, 4, -50, { color: BLUE, width: 5 });
  const shoeLab = mkText(areaG, 730, 352, 'big area: **small** pressure', { size: 28, anchor: 'middle', fill: INK, boldFill: BLUE });
  const paG = G(pBoard);
  mkText(paG, PX, 168, '{{"N"\\/"m"²}} are **pascals** ({{"Pa"}})', { size: 38, anchor: 'middle', fill: INK, boldFill: BERRY });
  const paW = mkWorking(paG, PX - 30, 200, ['1 "N"\\/cm² = 10 000 "N"\\/"m"²', '= 10 000 "Pa"'], { size: 40, fill: INK, gap: 16 });
  const paNote = mkText(paG, PX, 350, 'because {{1 "m"² = 10 000 cm²}}', { size: 28, anchor: 'middle', fill: MUTED });
  // Dad's sandal, lifted
  const dadFoot = G(Lfg);
  paper(dadFoot, 470, 112, 420, 256);
  E('rect', { x: 472, y: 114, width: 416, height: 252, rx: 14, fill: '#DFF0FA' }, dadFoot);
  grass(dadFoot, 472, 330, 416, 36);
  const leg = G(dadFoot); tr(leg, 610, 140);
  E('path', { d: 'M-50,-26 L50,-26 L54,60 L-46,60 Z', fill: '#FF8A3D', stroke: SC_INK, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, leg);
  [[-28, -8], [20, 0], [-6, 32], [32, 40]].forEach(([x, y]) => E('circle', { cx: x, cy: y, r: 8, fill: GOLD, stroke: '#C2453A', 'stroke-width': 2 }, leg));
  E('rect', { x: -26, y: 60, width: 44, height: 82, fill: SKIN, stroke: SC_INK, 'stroke-width': 3 }, leg);
  tr(lwSandal(leg, 0.9), -4, 222);
  const footLab = mkText(dadFoot, 790, 214, 'big area:\n**small**\n**pressure**', { size: 32, anchor: 'middle', fill: INK, boldFill: GREEN });

  /* ================= the showpiece: heel vs elephant ================= */
  const cut = G(Lcut);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#8FC8F0', '#E3F2FA', true) }, cut);
  E('rect', { x: 0, y: 560, width: 1200, height: 190, fill: linGrad('#7FC45A', '#5FA344', true) }, cut);
  const panel = (x, title, col) => {
    const g = G(cut);
    paper(g, x, 112, 540, 440);
    T(g, x + 270, 160, title, { size: 34, weight: 800, anchor: 'middle', fill: col });
    return g;
  };
  const pL = panel(40, "MUM'S HEEL", BERRY), pR = panel(620, 'THE ELEPHANT', '#5A6670');
  // heel
  grass(pL, 46, 400, 528, 50);
  const hz = lwHeel(pL, 1.25); tr(hz, 190, 402);
  const tipSq = E('rect', { x: 176, y: 394, width: 28, height: 14, fill: 'none', stroke: RED, 'stroke-width': 4 }, pL);
  const hArr = arrow(pL, 192, 176, 192, 256, { color: RED, width: 7 });
  const hF = mkMath(pL, 174, 228, '600 "N"', { size: 36, anchor: 'end', fill: RED, weight: 700 });
  const hA = mkText(pL, 430, 232, 'heel tip: {{1 cm²}}', { size: 30, anchor: 'middle', fill: INK });
  const hW = mkMath(pL, 310, 512, '600 ÷ 1 = 600 "N"\\/cm²', { size: 40, anchor: 'middle', fill: INK, weight: 700 });
  const hRW = mkMeasure('600 "N"\\/cm²', { size: 40, weight: 700 }).w;
  const hRing = E('rect', { x: 310 + hW.w / 2 - hRW - 6, y: 472, width: hRW + 14, height: 56, rx: 10, fill: 'none', stroke: RED, 'stroke-width': 5 }, pL);
  // elephant
  grass(pR, 626, 400, 528, 50);
  const ele = G(pR); tr(ele, 880, 400, 0.8);
  [-80, -40, 50, 90].forEach(x => E('rect', { x: x - 20, y: -100, width: 40, height: 100, rx: 10, fill: '#9AA6B2', stroke: SC_INK, 'stroke-width': 4 }, ele));
  E('ellipse', { cx: 0, cy: -130, rx: 130, ry: 72, fill: '#A8B3BE', stroke: SC_INK, 'stroke-width': 5 }, ele);
  E('path', { d: 'M-130,-150 Q-150,-110 -140,-80', fill: 'none', stroke: SC_INK, 'stroke-width': 5 }, ele);
  E('circle', { cx: 130, cy: -170, r: 56, fill: '#A8B3BE', stroke: SC_INK, 'stroke-width': 5 }, ele);
  E('path', { d: 'M96,-200 Q60,-196 64,-150 Q70,-110 106,-126', fill: '#9AA6B2', stroke: SC_INK, 'stroke-width': 4 }, ele);
  E('path', { d: 'M176,-160 Q196,-110 182,-62 Q178,-50 168,-56', fill: 'none', stroke: SC_INK, 'stroke-width': 18, 'stroke-linecap': 'round' }, ele);
  E('path', { d: 'M176,-160 Q196,-110 182,-62 Q178,-50 168,-56', fill: 'none', stroke: '#A8B3BE', 'stroke-width': 11, 'stroke-linecap': 'round' }, ele);
  E('circle', { cx: 148, cy: -184, r: 6, fill: SC_INK }, ele);
  let mg = ''; for (let i = 0; i < 9; i++) { const a = -0.3 + i * 0.22, x = 120 + Math.cos(a + 1.6) * 58, y = -150 + Math.sin(a + 1.6) * 40; mg += `M${x.toFixed(1)},${y.toFixed(1)} m-9,0 a9,9 0 1,0 18,0 a9,9 0 1,0 -18,0 `; }
  E('path', { d: mg, fill: '#FF9A1F', stroke: '#C2621A', 'stroke-width': 2 }, ele);
  const feet = G(ele);
  [-80, -40, 50, 90].forEach(x => E('ellipse', { cx: x, cy: 0, rx: 26, ry: 8, fill: GOLD, stroke: '#C2621A', 'stroke-width': 3 }, feet));
  const eArr = arrow(pR, 860, 174, 860, 236, { color: RED, width: 9 });
  const eF = mkMath(pR, 842, 222, '50 000 "N"', { size: 36, anchor: 'end', fill: RED, weight: 700 });
  const eA = mkText(pR, 890, 438, 'feet: {{5000 cm²}}', { size: 30, anchor: 'middle', fill: INK });
  const eW = mkMath(pR, 890, 512, '50 000 ÷ 5000 = 10 "N"\\/cm²', { size: 40, anchor: 'middle', fill: INK, weight: 700 });
  const eRW = mkMeasure('10 "N"\\/cm²', { size: 40, weight: 700 }).w;
  const eRing = E('rect', { x: 890 + eW.w / 2 - eRW - 6, y: 472, width: eRW + 14, height: 56, rx: 10, fill: 'none', stroke: GREEN, 'stroke-width': 5 }, pR);
  // sixty
  const sixty = G(Lfg);
  E('rect', { x: 306, y: 206, width: 600, height: 250, rx: 22, fill: 'rgba(0,0,0,0.25)' }, sixty);
  E('rect', { x: 300, y: 200, width: 600, height: 250, rx: 22, fill: '#FFF6D6', stroke: GOLD, 'stroke-width': 6 }, sixty);
  mkMath(sixty, 600, 300, '600 ÷ 10 = 60', { size: 64, anchor: 'middle', fill: INK, weight: 700 });
  const sixCh = mkChip(sixty, '**60 ×** harder than the elephant!', { size: 34, col: BERRY, solid: true, ink: '#FFFFFF' });
  tr(sixCh, 600, 390);

  /* ================= the cast ================= */
  const mum = cast(Lcast, 'mum', { prop: null, hand: true });
  const dad = cast(Lcast, 'dad', { prop: null });
  const raj = cast(Lcast, 'raj', { style: 'kurta', shirt: '#F3E3C3', trim: '#E2B33C', prop: null });
  const kav = cast(Lcast, 'kavya');
  const boy = cast(Lcast, 'boy');
  const trish = cast(Lcast, 'trish');
  const rosette = lcRosette(Lros);
  const spark = G(Lros);
  E('circle', { r: 70, fill: glow(GOLD) }, spark);
  E('path', { d: 'M0,-60 L8,-8 L60,0 L8,8 L0,60 L-8,8 L-60,0 L-8,-8 Z', fill: '#FFF7C2', opacity: 0.9 }, spark);
  Lros.insertBefore(spark, rosette);

  /* cut points */
  const cX = at('heel') - 0.06, cX1 = at('comp') - 0.06;
  const BY = 506, BS = 0.85, XS = { mum: 120, dad: 300, raj: 480, kav: 660, boy: 840 };
  const SLOT = 'ABDFGHKLMNPRSTVW';

  return t => {
    const sX = on(t, cX, cX1), sG = !sX;
    const who = scWho(S, t);
    garden.upd(t);
    op(Lset, sG); op(Lfront, sG); op(cut, sX);
    op(plan, 0); op(heelCard, 0); op(sanCard, 0); op(pBoard, 0); op(dadFoot, 0); op(sixty, 0);
    rosette.set(0, 0); op(spark, 0);
    const vis = { mum: 0, dad: 0, raj: 0, kav: 0, boy: 0, trish: 0 };

    if (sG) {
      // camera: still; the slow push-in on Dad at the end
      const push = P(t, at('once') - 0.2, end('once') + 0.6 - at('once'), ease);
      view(World, 1 + 0.45 * push, lerp(600, XS.dad, push), lerp(375, 520, push), lerp(600, XS.dad + 120 * push, push), lerp(375, 470, push));
      vis.mum = vis.dad = vis.raj = vis.kav = vis.boy = 1;
      tr(mum, XS.mum, BY, BS); tr(dad, XS.dad, BY, BS); tr(raj, XS.raj, BY, BS); tr(kav, XS.kav, BY, BS); tr(boy, XS.boy, BY, BS);
      const tri = t >= at('pres') - 0.1;
      const lookAt = x0 => {   // look towards the speaker
        const sx = who === 'trish' ? 1060 : who === 'narr' || !who ? null : XS[who === 'kavya' ? 'kav' : who];
        return sx === null || sx === undefined ? 0 : clamp((sx - x0) / 200, -1, 1);
      };
      // Mum
      let mm = 'happy', ml = lookAt(XS.mum);
      if (t >= mid('wed', 0.8) && t < at('pres')) { mm = t < at('sink') ? 'shock' : 'annoyed'; ml = 0.9; }
      else if (t >= at('comp') - 0.1 && t < at('area')) { mm = 'smug'; ml = t > end('comp') ? 0 : 0.6; }
      else if (t >= at('once')) { mm = 'happy'; ml = 0.9; }
      mum.set({ t, talk: scTalk(S, t, 'mum'), mood: mm, look: ml, lift: t > at('comp') && t < end('comp') + 0.5 ? 1 : 0 });
      // Dad
      let dm = 'neutral', dl = lookAt(XS.dad);
      if (t < at('sink')) dm = 'happy';
      else if (t < at('pres')) { dm = 'smug'; dl = -0.8; }
      else if (t >= at('comp') - 0.1 && t < at('area')) { dm = 'deadpan'; dl = -0.8; }
      else if (t >= at('sandals') && t < at('once')) { dm = 'smug'; dl = 0.2; }
      else if (t >= at('once')) { dm = 'happy'; dl = 0; }
      dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: dl });
      // Uncle Raj, Kavya, Ah Boy
      raj.set({ t, talk: scTalk(S, t, 'raj'), mood: t >= at('once') ? 'happy' : t >= at('comp') - 0.1 && t < at('area') ? 'happy' : 'happy', look: t >= at('sandals') ? -0.8 : lookAt(XS.raj) });
      let km = 'neutral', kl = lookAt(XS.kav);
      if (t < at('sink')) km = 'happy';
      else if (t >= at('comp') - 0.1 && t < at('area')) { km = 'deadpan'; kl = -0.9; }
      else if (t >= at('sandals') && t < at('once')) { km = 'deadpan'; kl = -0.9; }
      else if (t >= at('once')) { km = 'shock'; kl = -0.9; }
      if (who === 'kavya') kl = 0.7;
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: t >= at('once') ? 'shock' : 'happy', look: t >= at('sandals') ? -0.9 : lookAt(XS.boy), lift: 0 });
      // Trish on the hedge
      if (tri) {
        vis.trish = 1;
        const up = P(t, at('pres') - 0.1, 0.4, pop);
        tr(trish, 1062, HY - 160 * 0.6 + (1 - up) * 60, Math.max(0.01, 0.6 * (0.7 + 0.3 * up)));
        const spin = t < mid('pres', 0.3);
        const letters = spin ? [0, 1, 2].map(i => SLOT[(Math.floor(t * 14) * 5 + i * 7) % SLOT.length]) : ['F', 'P', 'A'];
        trish.set({ t, talk: scTalk(S, t, 'trish'), mood: t >= at('once') ? 'shock' : 'smug', look: who === 'trish' ? -0.6 : -0.9, letters,
          cover: t > mid('pres', 0.6) && t < at('newton') ? 1 : undefined, coverP: P(t, mid('pres', 0.6), 0.35, ease) });
      }
      // the wedding: the hectare, then the stiletto
      op(plan, fade(t, mid('wed', 0.12), at('sink')));
      op(planM1, P(t, mid('wed', 0.42), 0.3, linear)); op(planM2, P(t, mid('wed', 0.58), 0.3, linear)); op(planM3, P(t, mid('wed', 0.68), 0.3, linear));
      op(heelCard, fade(t, mid('wed', 0.8), at('pres')));
      const sinkP = P(t, mid('wed', 0.84), 2.4, easeOut);
      tr(heelBig, 200, 300 + 30 * sinkP, 1.05, -2 * sinkP);
      op(heelLab, P(t, mid('wed', 0.95), 0.3, linear));
      op(sanCard, fade(t, mid('sink', 0.35), at('pres')));
      // pressure, newtons
      op(pBoard, (t >= at('pres') - 0.05 && t < at('comp') - 0.1) || (t >= at('area') - 0.05 && t < at('sandals')) ? 1 : 0);
      op(presG, fade(t, at('pres') - 0.05, at('newton')));
      op(pFor, P(t, mid('pres', 0.62), 0.3, linear));
      op(newtG, fade(t, at('newton') - 0.05, at('comp')));
      op(wt, P(t, mid('newton', 0.45), 0.3, linear)); wtArrow.set(P(t, mid('newton', 0.55), 0.4, linear)); op(newtM, P(t, mid('newton', 0.45), 0.3, linear));
      // area: knife and snowshoe
      op(areaG, fade(t, at('area') - 0.05, at('pa')));
      op(knife, P(t, mid('area', 0.45), 0.3, linear)); kArr.set(P(t, mid('area', 0.5), 0.3, linear)); op(knifeLab, P(t, mid('area', 0.5), 0.3, linear));
      op(shoe, P(t, mid('area', 0.75), 0.3, linear)); sArr.set(P(t, mid('area', 0.8), 0.3, linear)); op(shoeLab, P(t, mid('area', 0.8), 0.3, linear));
      // pascals
      op(paG, fade(t, at('pa') - 0.05, at('sandals')));
      paW.show(0, P(t, mid('pa', 0.4), 0.3, linear)); paW.show(1, P(t, mid('pa', 0.75), 0.3, linear));
      paW.ring(1, P(t, mid('pa', 0.85), 0.3, linear));
      op(paNote, P(t, mid('pa', 0.55), 0.3, linear));
      // Dad's sandal, the rosette that stays
      op(dadFoot, fade(t, mid('sandals', 0.05), at('once') - 0.1));
      tr(leg, 610, 140 - 12 * Math.sin(P(t, mid('sandals', 0.05), 0.5, ease) * Math.PI));
      if (t >= mid('sandals', 0.62)) {
        rosette.set(P(t, mid('sandals', 0.62), 0.4, linear), 0);
        tr(rosette, XS.dad + 36, BY + 66, 0.5);
        const sp = t >= at('once') ? 0.4 + 0.4 * Math.sin(t * 5) : 0;
        op(spark, sp); tr(spark, XS.dad + 36, BY + 66, 0.5 + 0.08 * Math.sin(t * 3), (t * 40 * AMP) % 360);
      }
    } else {
      World.removeAttribute('transform');
    }

    /* ---------- the showpiece ---------- */
    if (sX) {
      const hp = P(t, at('heel'), 0.4, ease), ep = P(t, at('elephant') - 0.1, 0.4, ease);
      op(pL, 1); op(pR, 0.25 + 0.75 * ep);
      op(hz, 1); op(hF, P(t, mid('heel', 0.2), 0.3, linear)); hArr.set(P(t, mid('heel', 0.15), 0.4, linear));
      op(hA, P(t, mid('heel', 0.4), 0.3, linear)); op(tipSq, t > mid('heel', 0.4) ? 0.6 + 0.4 * Math.sin(t * 7) : 0);
      op(hW, P(t, mid('heel', 0.62), 0.3, linear)); op(hRing, P(t, mid('heel', 0.85), 0.3, linear));
      op(ele, ep); op(feet, t > mid('elephant', 0.4) ? 0.6 + 0.4 * Math.sin(t * 6) : 0);
      eArr.set(P(t, mid('elephant', 0.2), 0.4, linear)); op(eF, P(t, mid('elephant', 0.25), 0.3, linear));
      op(eA, P(t, mid('elephant', 0.4), 0.3, linear));
      op(eW, P(t, mid('elephant', 0.6), 0.3, linear)); op(eRing, P(t, mid('elephant', 0.85), 0.3, linear));
      // sixty, and Ah Boy delighted
      if (t >= at('sixty') - 0.1) {
        const p = P(t, at('sixty') - 0.1, 0.45, pop);
        op(sixty, clamp(p * 3)); tr(sixty, 600 * (1 - (0.6 + 0.4 * p)), 325 * (1 - (0.6 + 0.4 * p)), Math.max(0.01, 0.6 + 0.4 * p));
        op(sixCh, P(t, mid('sixty', 0.4), 0.3, linear));
        vis.boy = 1;
        const up = P(t, at('sixty') - 0.1, 0.4, easeOut);
        tr(boy, 600, lerp(820, 650, up), 0.9);
        boy.set({ t, talk: scTalk(S, t, 'boy'), mood: 'happy', look: 0, lift: 1 });
      }
    }

    op(mum, vis.mum); op(dad, vis.dad); op(raj, vis.raj); op(kav, vis.kav); op(boy, vis.boy); op(trish, vis.trish);
  };
});
