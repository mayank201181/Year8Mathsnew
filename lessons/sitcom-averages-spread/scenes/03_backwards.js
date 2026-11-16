/* Scene 3: Priya needs a twenty (working backwards with the mean).
   Shots (hard sitcom cuts; one studio world with a camera, plus the big question screen and the audience):
   A  studio wide: ROUND 3, the quiz; Priya alone at her desk, a "P" car-park sign: her parents are still parking
      -> Priya: mean 15 so far, wants 16, "17?".
   B  the screen, Mean in the corner: "Means can't be added. Totals can.", total = mean × number of values
      -> Kavya: the bar model, 4 × 15 = 60, 5 × 16 = 80, 80 − 60 = 20 drops into the "?" box, SPOT ON!
      -> Priya: 20/20, full marks (20 = 16 + 4: one more mark for each of the four rounds).
   B  QUICK-FIRE (Benny): mean of 5 numbers is 8: 3, 7, 9, 12, ? -> Dad: 5 × 8 = 40, 31, 40 − 31 = 9, check, SPOT ON!
   A  "Above average." Dad smug, Kavya to camera.
   A  Auntie Rose rises behind the desk (lower third) -> Benny: four age tiles, mean 26; a fifth "?" over Rose, mean 33
   B  Kavya: 4 × 26 = 104, 5 × 33 = 165, 165 − 104 = 61 -> A: the "?" over Rose flips to 61, Rose shock -> "Aiyo."
   C  the audience: 20 people (mean 62), 30 people (mean 72) -> A: Ah Boy "67!", WAY OFF!
   B  Mean: 20 × 62 = 1240, 30 × 72 = 2160, 3400 ÷ 50 = 68; a see-saw balances at 68, nearer the bigger group
   B  Ranger: five scores slide up 2; mean, median and mode +2; the range tape keeps its length. Hold. */
scene('backwards', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const GOLD = AS.gold, GREEN = '#1E9E5A', RED = '#D32F2F', BLUE = '#2E6FD8', PINK = '#FFC2E8', SKY = '#7FD3FF', LIME = '#C8F59A';
  const popSet = (el, t, t0, t1, x, y, s) => { const p = t >= t0 && t < t1 ? P(t, t0, 0.35, linear) : 0; el.set(p); if (x !== undefined) tr(el, x, y, s === undefined ? 1 : s); };
  const chipA = (parent, text, col, size) => mkChip(parent, text, { size: size || 30, col: col || C.ink });
  // the studio camera: k = zoom, (x0, y0) = the world point at the top-left of the frame
  const cam = (k, x0, y0) => [k, clamp(x0, 0, 1200 - 1200 / k), clamp(y0, 0, 750 - 750 / k)];
  const WIDE = cam(1, 0, 0);
  const view = (el, c) => el.setAttribute('transform', c[0] === 1 ? '' : `scale(${c[0].toFixed(4)}) translate(${(-c[1]).toFixed(1)} ${(-c[2]).toFixed(1)})`);
  const tile = (parent, x, y, txt, o) => {
    o = o || {};
    const g = G(parent); tr(g, x, y);
    const w = o.w || 76, h = o.h || 76;
    g.box = E('rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: 12, fill: o.fill || '#FFF4D6', stroke: MK.ink, 'stroke-width': 3 }, g);
    g.txt = T(g, 0, (o.size || 40) * 0.36, txt, { size: o.size || 40, weight: 800, anchor: 'middle', fill: o.col || MK.ink });
    return g;
  };
  const pSign = parent => {   // a little blue car-park sign on a pole, base at (0,0)
    const g = G(parent);
    E('rect', { x: -4, y: -64, width: 8, height: 64, fill: '#8F9CAB', stroke: SC_INK, 'stroke-width': 2 }, g);
    E('rect', { x: -24, y: -112, width: 48, height: 48, rx: 9, fill: '#1F5FBF', stroke: '#FFFFFF', 'stroke-width': 4 }, g);
    T(g, 0, -76, 'P', { size: 36, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
    return g;
  };

  /* layers: sets, characters behind the desk, the desk, the foreground (Benny), chips, HUD */
  const Lbg = G(root), Lcast = G(root), Lfront = G(root), Lfore = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= A: Studio 5 ================= */
  const studioShot = G(Lbg);
  const studio = asStudio(studioShot);
  Lfront.appendChild(studio.front); Lfront.appendChild(studio.top);
  const carrier = asCarrier(studio.top); tr(carrier, 1100, 530, 0.7);
  const sign = pSign(studio.top); tr(sign, 708, 532);
  const cRound = chipA(Lfg, '**ROUND 3**: the quiz', GOLD, 34);
  const cRounds = chipA(Lfg, '**5** rounds, each out of **20**', C.ink, 30);
  const cPark = chipA(Lfg, "Priya's parents: **still parking**", SKY, 28);
  const cNow = chipA(Lfg, '4 rounds: mean **15**', SKY, 30);
  const cWant = chipA(Lfg, 'wants: mean **16**', LIME, 30);
  const tGuess = chipA(Lfg, 'so... **17**?', '#FF8A8A', 32);
  const cAbove = chipA(Lfg, '**ABOVE** average ↑', SKY, 32);
  const cSecret = chipA(Lfg, 'my age: **SECRET**', PINK, 30);
  // the age tiles over Team Kavya (and the "?" over Rose)
  const POS = { rose: [95, 446, 0.84], boy: [215, 452, 0.86], mum: [335, 440, 0.86], kav: [455, 440, 0.88], dad: [575, 440, 0.86], priya: [820, 446, 0.88], tan: [990, 440, 0.86] };
  const ageT = [['boy', 'Ah Boy', '8'], ['mum', 'Mum', '41'], ['kav', 'Kavya', '12'], ['dad', 'Dad', '43']].map(([k, nm, a]) => {
    const g = G(Lfg); tr(g, POS[k][0], 222);
    E('rect', { x: -54, y: -42, width: 108, height: 84, rx: 12, fill: '#FFF4D6', stroke: MK.ink, 'stroke-width': 3 }, g);
    T(g, 0, -10, nm, { size: 26, weight: 700, anchor: 'middle', fill: '#5A4A52' });
    T(g, 0, 30, a, { size: 36, weight: 800, anchor: 'middle', fill: MK.ink });
    return g;
  });
  const roseT = G(Lfg); tr(roseT, POS.rose[0], 222);
  const roseBox = E('rect', { x: -54, y: -42, width: 108, height: 84, rx: 12, fill: '#FFF4D6', stroke: MK.ink, 'stroke-width': 3 }, roseT);
  T(roseT, 0, -10, 'Rose', { size: 26, weight: 700, anchor: 'middle', fill: '#5A4A52' });
  const roseQ = T(roseT, 0, 30, '?', { size: 36, weight: 800, anchor: 'middle', fill: RED });
  const roseA = T(roseT, 0, 30, '61', { size: 36, weight: 800, anchor: 'middle', fill: GREEN });
  const c26 = chipA(Lfg, '4 members: mean age **26**', GOLD, 30);
  const c33 = chipA(Lfg, '5 members: mean age **33**', GOLD, 30);
  const cSense = mkChip(Lfg, 'sense check: the mean went **up**,\nso she is older than **26** ✓', { size: 28, col: '#9FE0B5' });
  const c67 = mkChip(Lfg, 'halfway: {{(62 + 72) ÷ 2 = 67}}', { size: 32, col: '#FF8A8A' });

  /* ================= C: the studio audience ================= */
  const audShot = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#0E0620', '#2A1150', true) }, audShot);
  E('ellipse', { cx: 600, cy: 120, rx: 620, ry: 140, fill: glow('#7A3CE0'), opacity: 0.35 }, audShot);
  const SKINS = ['#E8B48A', '#C98E62', '#8D5A3B', '#F2D2AA'], SHIRTS = ['#FF5FC8', '#4CC9F0', '#FFC247', '#56D69B', '#B48CFF'];
  const block = (cx, cols, rows, seed) => {
    const g = G(audShot), r = rng(seed), heads = SKINS.map(() => ''), bodies = SHIRTS.map(() => '');
    let eyes = '';
    for (let j = 0; j < rows; j++) {
      const y = 300 + j * 66;
      E('rect', { x: cx - cols * 35 - 16, y: y + 22, width: cols * 70 + 32, height: 30, rx: 8, fill: '#3A1670', stroke: '#1A0B36', 'stroke-width': 3 }, g);
      for (let i = 0; i < cols; i++) {
        const x = cx - cols * 35 + 35 + i * 70 + (r() - 0.5) * 6, yy = y + (r() - 0.5) * 4;
        bodies[(i + j * 2) % SHIRTS.length] += `M${(x - 24).toFixed(1)},${(yy + 40).toFixed(1)} Q${x.toFixed(1)},${(yy + 4).toFixed(1)} ${(x + 24).toFixed(1)},${(yy + 40).toFixed(1)} Z `;
        heads[(i * 3 + j) % SKINS.length] += `M${(x - 17).toFixed(1)},${(yy - 8).toFixed(1)} a17,17 0 1,0 34,0 a17,17 0 1,0 -34,0 `;
        eyes += `M${(x - 6).toFixed(1)},${(yy - 10).toFixed(1)} l0,5 M${(x + 6).toFixed(1)},${(yy - 10).toFixed(1)} l0,5 `;
      }
    }
    bodies.forEach((d, i) => { if (d) E('path', { d, fill: SHIRTS[i], stroke: SC_INK, 'stroke-width': 3 }, g); });
    heads.forEach((d, i) => { if (d) E('path', { d, fill: SKINS[i], stroke: SC_INK, 'stroke-width': 3 }, g); });
    E('path', { d: eyes, stroke: SC_INK, 'stroke-width': 4, 'stroke-linecap': 'round' }, g);
    return g;
  };
  const blkL = block(285, 5, 4, 11), blkR = block(860, 6, 5, 23);
  const cLeft = chipA(Lfg, 'left: **20** people, mean **62**', SKY, 30);
  const cRight = chipA(Lfg, 'right: **30** people, mean **72**', PINK, 30);

  /* ================= B: the big question screen ================= */
  const scrShot = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#120826', '#2E1460', true) }, scrShot);
  E('ellipse', { cx: 165, cy: 560, rx: 250, ry: 260, fill: glow('#9C6BFF'), opacity: 0.45 }, scrShot);
  E('rect', { x: 0, y: 688, width: 1200, height: 62, fill: '#1A0B36' }, scrShot);
  E('path', { d: 'M0,688 L1200,688', stroke: '#7A3CE0', 'stroke-width': 4, opacity: 0.7 }, scrShot);
  const SCX = 735, SCY = 397;
  const scr = asScreen(scrShot, 826, 540, { title: "PRIYA'S QUIZ" }); tr(scr, SCX, SCY);
  const SC = scr.content;
  const toW = (x, y) => [SCX + x, SCY + y];   // screen-local -> stage

  // rule
  const gRule = G(SC);
  mkText(gRule, 0, -100, 'Means **can’t** be added.', { size: 44, anchor: 'middle', fill: MK.ink, boldFill: RED });
  mkText(gRule, 0, -30, '**Totals** can.', { size: 44, anchor: 'middle', fill: MK.ink, boldFill: GREEN });
  const ruleM = mkMath(gRule, 0, 110, '"total" = "mean" × "number of values"', { size: 44, fill: BLUE, anchor: 'middle' });
  const ruleBox = E('rect', { x: -ruleM.w / 2 - 24, y: 110 - ruleM.a - 20, width: ruleM.w + 48, height: ruleM.a + ruleM.d + 40, rx: 14, fill: 'none', stroke: BLUE, 'stroke-width': 4 }, gRule);

  // need: the bar model (one box per round)
  const gNeed = G(SC);
  const U = 100, BX0 = -380, BH = 64;
  const want = G(gNeed), sofar = G(gNeed);
  mkText(want, BX0, -168, '**Needed:** 5 rounds, mean **16**', { size: 28, fill: MK.ink });
  for (let i = 0; i < 5; i++) { E('rect', { x: BX0 + i * U, y: -150, width: U, height: BH, fill: LIME, stroke: MK.ink, 'stroke-width': 3 }, want); T(want, BX0 + i * U + U / 2, -150 + BH / 2 + 13, '16', { size: 36, weight: 800, anchor: 'middle', fill: MK.ink }); }
  mkMath(want, BX0 + 5 * U + 24, -106, '5 × 16 = 80', { size: 36, fill: GREEN });
  mkText(sofar, BX0, -30, '**So far:** 4 rounds, mean **15**', { size: 28, fill: MK.ink });
  for (let i = 0; i < 4; i++) { E('rect', { x: BX0 + i * U, y: -12, width: U, height: BH, fill: '#B9D7FF', stroke: MK.ink, 'stroke-width': 3 }, sofar); T(sofar, BX0 + i * U + U / 2, -12 + BH / 2 + 13, '15', { size: 36, weight: 800, anchor: 'middle', fill: MK.ink }); }
  mkMath(sofar, BX0 + 5 * U + 24, 32, '4 × 15 = 60', { size: 36, fill: BLUE });
  const qBox = E('rect', { x: BX0 + 4 * U, y: -12, width: U, height: BH, fill: '#FFF4D6', stroke: AS.led, 'stroke-width': 4, 'stroke-dasharray': '10 6' }, gNeed);
  const qTxt = T(gNeed, BX0 + 4.5 * U, -12 + BH / 2 + 14, '?', { size: 40, weight: 800, anchor: 'middle', fill: AS.led });
  const qAns = T(gNeed, BX0 + 4.5 * U, -12 + BH / 2 + 14, '20', { size: 40, weight: 800, anchor: 'middle', fill: GREEN });
  const lastL = mkText(gNeed, BX0, 160, 'Last round: {{80 − 60 = 20}}', { size: 42, fill: MK.ink });
  const fly20 = T(gNeed, 0, 0, '20', { size: 42, weight: 800, anchor: 'middle', fill: GREEN });
  // full: 20 = 16 + 4, one extra mark for each of the first four rounds
  const gPlus = G(gNeed);
  const plusArr = [0, 1, 2, 3].map(i => arrow(gPlus, BX0 + 4.5 * U - 10, 56, BX0 + i * U + U / 2, 58, { color: GREEN, width: 4, bend: -22 - (3 - i) * 8, head: 13 }));
  const plusL = [0, 1, 2, 3].map(i => mkText(gPlus, BX0 + i * U + U / 2, 98 + (3 - i) * 0, '{{+1}}', { size: 26, anchor: 'middle', fill: GREEN }));
  const split = mkText(gNeed, BX0 + 4.5 * U, -30, '{{16 + 4}}', { size: 28, anchor: 'middle', fill: GREEN });
  const c2020 = chipA(Lfg, '**20/20**: full marks!', '#FF8A8A', 32);

  // missing: QUICK-FIRE
  const gMiss = G(SC);
  mkText(gMiss, BX0, -168, 'The mean of **5** numbers is **8**. The fifth?', { size: 32, fill: MK.ink });
  const mT = ['3', '7', '9', '12', '?'].map((v, i) => tile(gMiss, BX0 + 38 + i * 92, -102, v, { col: v === '?' ? AS.led : MK.ink }));
  attr(mT[4].box, 'stroke-dasharray', '10 6'); attr(mT[4].box, 'stroke', AS.led); attr(mT[4].box, 'stroke-width', 4);
  const mAns = T(mT[4], 0, 14, '9', { size: 40, weight: 800, anchor: 'middle', fill: GREEN });
  const mW = mkWorking(gMiss, -92, -26, [
    { m: '5 × 8 = 40', note: 'required total' },
    { m: '3 + 7 + 9 + 12 = 31', note: 'known total' },
    { m: '40 − 31 = 9', note: 'the missing value', col: GREEN }], { size: 38, noteSize: 26, gap: 16, noteCol: '#7A6A72', fill: MK.ink });
  const mChk = mkText(gMiss, BX0, 222, 'check: {{(3 + 7 + 9 + 12 + 9) ÷ 5 = 40 ÷ 5 = 8}} ✓', { size: 28, fill: GREEN });

  // work: Auntie Rose's age
  const gAge = G(SC);
  mkText(gAge, 0, -160, 'Means can’t be added. **Totals** can.', { size: 30, anchor: 'middle', fill: '#7A6A72', boldFill: GREEN });
  const aW = mkWorking(gAge, -70, -110, [
    { m: '4 × 26 = 104', note: 'old total: 4 people' },
    { m: '5 × 33 = 165', note: 'new total: 5 people' },
    { m: '165 − 104 = 61', note: "Auntie Rose's age", col: GREEN }], { size: 46, noteSize: 28, gap: 26, noteCol: '#7A6A72', fill: MK.ink });

  // sizes: the weighted mean and the see-saw
  const gSize = G(SC);
  const sTop = mkText(gSize, BX0, -170, '{{67}} works only if the groups are the **same size**', { size: 30, fill: MK.ink, boldFill: RED });
  const sW = mkWorking(gSize, -110, -138, [
    { m: '20 × 62 = 1240', note: 'left total' },
    { m: '30 × 72 = 2160', note: 'right total' },
    { m: '1240 + 2160 = 3400', note: 'all 50 people' },
    { m: '3400 ÷ 50 = 68', note: 'the mean', col: GREEN }], { size: 34, noteSize: 26, gap: 12, noteCol: '#7A6A72', fill: MK.ink });
  const saw = G(gSize); tr(saw, 0, 196);
  const SX = v => -380 + (v - 60) * 30;
  const plank = G(saw);
  E('rect', { x: SX(60) - 10, y: -6, width: 15 * 30 + 20, height: 12, rx: 6, fill: '#9C6B3E', stroke: MK.ink, 'stroke-width': 3 }, plank);
  let tk = ''; for (let v = 60; v <= 75; v++) tk += `M${SX(v)},6 L${SX(v)},${v % 5 ? 14 : 20} `;
  E('path', { d: tk, stroke: MK.ink, 'stroke-width': 2.5 }, plank);
  const wBlk = (v, n, lab, col) => { const g = G(plank); for (let i = 0; i < n; i++) E('rect', { x: SX(v) - 26, y: -8 - (i + 1) * 22, width: 52, height: 22, rx: 4, fill: col, stroke: MK.ink, 'stroke-width': 2.5 }, g); T(g, SX(v), -8 - n * 22 - 8, lab, { size: 26, weight: 800, anchor: 'middle', fill: MK.ink }); return g; };
  wBlk(62, 2, '20', SKY); wBlk(72, 3, '30', PINK);
  const pivot = G(saw);
  E('path', { d: `M${SX(68)},8 L${SX(68) - 20},40 L${SX(68) + 20},40 Z`, fill: GREEN, stroke: MK.ink, 'stroke-width': 3 }, pivot);
  [[62, '62'], [68, '68'], [72, '72']].forEach(([v, s]) => mkMath(saw, SX(v) + (v === 68 ? 34 : 0), 44, s, { size: 26, anchor: 'middle', fill: v === 68 ? GREEN : MK.ink }));
  const sawNote = mkText(gSize, 110, 170, 'balances nearer\nthe **bigger** group', { size: 26, fill: '#7A6A72', boldFill: GREEN });

  // slide: +2 bonus marks
  const gSlide = G(SC);
  const DATA = [4, 6, 6, 9, 10];
  const slTop0 = mkText(gSlide, BX0, -170, 'scores: {{4, 6, 6, 9, 10}}', { size: 30, fill: MK.ink });
  const slTop1 = mkText(gSlide, BX0, -170, 'scores {{+ 2}}: {{6, 8, 8, 11, 12}}', { size: 30, fill: GREEN });
  const NL = G(gSlide); tr(NL, -350, 30);
  E('path', { d: 'M-30,0 L730,0 M742,0 L726,-10 L726,10 Z M-42,0 L-26,-10 L-26,10 Z', stroke: MK.ink, 'stroke-width': 5, fill: MK.ink, 'stroke-linejoin': 'round' }, NL);
  let nlt = ''; for (let v = 2; v <= 14; v++) { const x = (v - 2) * 700 / 12; nlt += `M${x.toFixed(1)},-12 L${x.toFixed(1)},12 `; T(NL, x, 46, String(v), { size: 26, weight: 600, anchor: 'middle', fill: MK.ink }); }
  E('path', { d: nlt, stroke: MK.ink, 'stroke-width': 4 }, NL);
  const dotG = G(gSlide), dots = [], plus2 = [];
  DATA.forEach((v, i) => {
    const lvl = DATA.slice(0, i).filter(u => u === v).length;
    const d = E('circle', { cx: 0, cy: 0, r: 15, fill: AS.neon, stroke: MK.ink, 'stroke-width': 3 }, dotG);
    dots.push({ d, v, lvl });
    const pl = T(dotG, 0, 0, '+2', { size: 26, weight: 800, anchor: 'middle', fill: GREEN }); plus2.push(pl);
  });
  const tapeG = G(gSlide);
  const tape = E('rect', { x: 0, y: -12, width: 6 * 58.33, height: 24, rx: 4, fill: '#FFD23C', stroke: MK.ink, 'stroke-width': 3 }, tapeG);
  let tt = ''; for (let i = 1; i < 12; i++) tt += `M${(i * 58.33 / 2).toFixed(1)},-12 l0,${i % 2 ? 8 : 14} `;
  E('path', { d: tt, stroke: MK.ink, 'stroke-width': 2 }, tapeG);
  mkText(tapeG, 6 * 58.33 / 2, -24, 'range {{6}}', { size: 28, anchor: 'middle', fill: '#8A5A08' });
  const rd = [
    mkText(gSlide, BX0, 128, 'mean: {{7 → 9}}', { size: 30, fill: MK.ink }),
    mkText(gSlide, BX0, 190, 'median: {{6 → 8}}', { size: 30, fill: MK.ink }),
    mkText(gSlide, 30, 128, 'mode: {{6 → 8}}', { size: 30, fill: MK.ink }),
    mkText(gSlide, 30, 190, 'range: {{6 → 6}}, the **same**', { size: 30, fill: MK.ink, boldFill: '#8A5A08' })];
  const rdUp = [0, 1, 2].map(i => mkText(gSlide, i === 2 ? 290 : -110, i === 0 ? 128 : i === 1 ? 190 : 128, '**up 2**', { size: 28, fill: GREEN }));

  /* ================= stamps, flash, the cast ================= */
  const stOK = asStamp(Lfg, true), stOK2 = asStamp(Lfg, true), stOK3 = asStamp(Lfg, true), stOK4 = asStamp(Lfg, true), stNo = asStamp(Lfg, false);
  const flash = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#FF2030' }, Lhud);
  const rose = cast(Lcast, 'rose', { s: POS.rose[2] });
  const boy = cast(Lcast, 'boy', { s: POS.boy[2] });
  const mum = cast(Lcast, 'mum', { s: POS.mum[2] });
  const kav = cast(Lcast, 'kavya', { s: POS.kav[2] });
  const dad = cast(Lcast, 'dad', { s: POS.dad[2] });
  const priya = cast(Lcast, 'priya', { s: POS.priya[2] });
  const tan = cast(Lcast, 'tan', { s: POS.tan[2] });
  const mean = cast(Lcast, 'mean'), ranger = cast(Lcast, 'ranger');
  const benny = cast(Lfore, 'benny');
  const ltRose = asLowerThird(Lhud, 'rose');
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cut points */
  const k = id => at(id) - 0.06;
  const cDadUp = mid('dad', 0.87), cWorkBack = mid('work', 0.9);
  const SCREEN = [[k('rule'), k('missing')], [k('missing'), cDadUp], [k('work'), cWorkBack], [k('sizes'), 1e9]];
  const CORNER = [165, 612];

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const sScr = SCREEN.some(([a, b]) => t >= a && t < b) ? 1 : 0;
    const sAud = on(t, k('halves'), k('halfway'));
    const sStu = !sScr && !sAud ? 1 : 0;
    op(studioShot, sStu); op(Lfront, sStu); op(scrShot, sScr); op(audShot, sAud);
    [cRound, cRounds, cPark, cNow, cWant, tGuess, cAbove, cSecret, c26, c33, cSense, c67, cLeft, cRight, c2020].forEach(c => c.set(0));
    [stOK, stOK2, stOK3, stOK4, stNo].forEach(s => s.set(0));
    ageT.forEach(a => op(a, 0)); op(roseT, 0); ltRose.set(0); op(flash, 0);
    const show = { rose: 0, boy: 0, mum: 0, kav: 0, dad: 0, priya: 0, tan: 0, mean: 0, ranger: 0, benny: 0 };
    const who = scWho(S, t);
    const talk = w => scTalk(S, t, w);

    /* ---------- A: the studio ---------- */
    if (sStu) {
      studio.upd(t);
      op(studio.applause, 0); op(studio.logo, 0);   // the wall is free for this round's graphics
      let c = WIDE;
      if (t >= cDadUp && t < at('rose') - 0.06) c = cam(1.5, 120, 120);                      // Dad and Kavya
      else if (t >= k('rose') && t < k('new')) c = cam(1.28, 0, 100);                         // Team Kavya and Rose
      else if (t >= k('rude') && t < k('halves')) c = cam(1.6, 0, 120);                        // Rose
      else if (t >= k('halfway') && t < k('sizes')) c = cam(1.6, 0, 120);                      // Ah Boy
      [studioShot, Lcast, Lfront, Lfore].forEach(el => view(el, c));
      op(studio.board, c[0] === 1 ? 1 : 0);   // close-ups: the scoreboard is out of shot
      op(studio.plates.kavya, (t >= k('rose') && t < k('new')) || c[0] >= 1.5 ? 0 : 1);
      ['priya', 'tan'].forEach(n => op(studio.plates[n], c[0] >= 1.5 ? 0 : 1));
      // the mini scoreboard follows the round
      const bm = t < k('missing') ? '15' : t < k('rose') ? '8' : t < k('halves') ? (t < mid('new', 0.62) ? '26' : '33') : '68';
      studio.board.set(0, bm); ['–', '–', '–'].forEach((s, i) => studio.board.set(i + 1, s));
      [0, 1, 2, 3].forEach(i => studio.board.lit(i, i === 0 ? 0.6 : 0));
      carrier.set({ t, look: who === 'priya' ? -0.8 : who === 'benny' ? 0.6 : -0.4 });
      op(sign, 1);

      ['boy', 'mum', 'kav', 'dad', 'priya', 'tan'].forEach(kk => { show[kk] = 1; });
      Object.entries({ boy, mum, kav, dad, priya, tan }).forEach(([kk, ch]) => tr(ch, ...POS[kk]));
      const roseIn = t >= at('rose') - 0.4;
      if (roseIn) { show.rose = 1; const up = P(t, at('rose') - 0.4, 0.45, pop); tr(rose, POS.rose[0], lerp(700, POS.rose[1], up), POS.rose[2]); }

      // looks and moods: everyone watches whoever is talking
      const lookAt = (x0, wx) => clamp((wx - x0) / 260, -1, 1);
      const spk = { priya: POS.priya[0], dad: POS.dad[0], rose: POS.rose[0], kavya: POS.kav[0], boy: POS.boy[0], benny: 1100 }[who];
      const L = x0 => (spk === undefined ? 0 : lookAt(x0, spk));
      let pm = 'smug', dm = 'neutral', km = 'neutral', mm = 'neutral', bym = 'happy', rm = 'happy', tm = 'neutral';
      let kl = L(POS.kav[0]), dl = L(POS.dad[0]), ml = L(POS.mum[0]), bl = L(POS.boy[0]), pl = L(POS.priya[0]), tl = L(POS.tan[0]), rl = L(POS.rose[0]);
      let blift = 0, rlift = 0;
      if (t < at('priya')) { pl = 0; pm = 'smug'; }
      else if (t < k('rule')) { pm = 'smug'; if (t > mid('priya', 0.7)) { km = 'deadpan'; } }
      if (t >= cDadUp && t < k('rose')) { dm = 'smug'; dl = -0.7; km = 'deadpan'; kl = 0; ml = 0.8; mm = 'deadpan'; }
      if (t >= k('rose') && t < k('new')) { rm = 'happy'; rlift = t < mid('rose', 0.75) ? 1 : 0; bym = 'happy'; km = 'happy'; if (t > mid('rose', 0.6)) { rm = 'smug'; rl = 0.6; } }
      if (t >= k('new') && t < k('work')) { rm = t > mid('new', 0.66) ? 'shock' : 'neutral'; rl = 0.9; km = 'neutral'; }
      if (t >= cWorkBack && t < k('rude')) { rm = 'shock'; rl = 0; km = 'happy'; kl = -0.9; ml = -0.9; bl = -0.9; dl = -0.9; mm = 'shock'; dm = 'shock'; }
      if (t >= k('rude') && t < k('halves')) { rm = 'annoyed'; rl = 0.2; km = 'sad'; kl = -0.9; mm = 'deadpan'; ml = -0.9; bl = -0.9; bym = 'happy'; }
      if (t >= k('halfway') && t < k('sizes')) { bym = 'happy'; blift = 1; bl = 0; kl = -0.9; ml = -0.9; if (t > mid('halfway', 0.55)) { km = 'deadpan'; mm = 'deadpan'; } }
      boy.set({ t, talk: talk('boy'), mood: bym, look: bl, lift: blift });
      mum.set({ t, talk: talk('mum'), mood: mm, look: ml });
      kav.set({ t, talk: talk('kavya'), mood: km, look: kl });
      dad.set({ t, talk: talk('dad'), mood: dm, look: dl });
      priya.set({ t, talk: talk('priya'), mood: pm, look: pl });
      tan.set({ t, mood: tm, look: tl });
      if (roseIn) rose.set({ t, talk: talk('rose'), mood: rm, look: rl, lift: rlift });

      // Benny pops up in the foreground for his round
      if (t >= at('new') - 0.3 && t < k('work')) {
        show.benny = 1;
        const up = P(t, at('new') - 0.3, 0.4, pop);
        tr(benny, 1040, lerp(960, 572, up), 0.96);
        benny.set({ t, talk: talk('benny'), mood: 'happy', look: -0.8, lift: 1, ting: win(t, mid('new', 0.8), end('new') + 0.2, 0.15) });
      }

      // chips
      popSet(cRound, t, at('round') + 0.1, k('priya'), 335, 150);
      popSet(cRounds, t, mid('round', 0.32), k('priya'), 335, 226);
      popSet(cPark, t, mid('round', 0.66), k('priya'), 820, 236);
      popSet(cNow, t, mid('priya', 0.2), k('rule'), 335, 150);
      popSet(cWant, t, mid('priya', 0.48), k('rule'), 335, 226);
      popSet(tGuess, t, mid('priya', 0.74), k('rule'), 640, 236);
      popSet(cAbove, t, cDadUp + 0.1, k('rose'), 600, 168);
      popSet(cSecret, t, mid('rose', 0.6), k('new'), 205, 168);
      if (t >= k('rose') && t < k('new')) ltRose.set(win(t, at('rose') + 0.15, at('rose') + 3.2, 0.3));
      if (t >= at('new') && t < k('halves')) {
        const inT = mid('new', 0.12);
        ageT.forEach((a, i) => { const p = P(t, inT + i * 0.18, 0.3, pop); op(a, clamp(p * 3)); tr(a, POS[['boy', 'mum', 'kav', 'dad'][i]][0], 222, Math.max(0.01, 0.6 + 0.4 * p)); });
        if (t >= mid('new', 0.62)) { const p = P(t, mid('new', 0.62), 0.3, pop); op(roseT, clamp(p * 3)); tr(roseT, POS.rose[0], 222, Math.max(0.01, 0.6 + 0.4 * p)); }
        const flip = t >= cWorkBack + 0.15;
        op(roseQ, flip ? 0 : 1); op(roseA, flip ? 1 : 0);
        attr(roseBox, 'stroke', flip ? GREEN : MK.ink); attr(roseBox, 'stroke-width', flip ? 5 : 3);
        if (t < k('work')) {
          popSet(c26, t, mid('new', 0.36), mid('new', 0.62), 335, 150);
          popSet(c33, t, mid('new', 0.66), k('work'), 335, 150);
        } else if (t < k('rude')) c33.set(1), tr(c33, 335, 150);
      }
      if (t >= k('rude') && t < k('halves')) {
        // close-up: the tiles are out of shot; the sense check instead
        ageT.forEach(a => op(a, 0)); op(roseT, 0);
        popSet(cSense, t, mid('rude', 0.25), k('halves'), 640, 186);
      }
      if (t >= k('halfway') && t < k('sizes')) {
        ageT.forEach(a => op(a, 0)); op(roseT, 0);
        popSet(c67, t, mid('halfway', 0.12), k('sizes'), 760, 140);
        const sp = P(t, mid('halfway', 0.72), 0.35, linear);
        if (sp > 0) { stNo.set(sp); tr(stNo, 800, 214, 0.52); }
        op(flash, 0.28 * win(t, mid('halfway', 0.72), mid('halfway', 0.72) + 0.35, 0.12));
      }
    }

    /* ---------- C: the audience ---------- */
    if (sAud) {
      show.benny = 1;
      [Lcast, Lfore].forEach(el => view(el, WIDE));
      tr(benny, 572, 600, 0.98);
      benny.set({ t, talk: talk('benny'), mood: 'happy', look: 0, lift: 1, ting: win(t, at('halves') + 0.1, at('halves') + 0.8, 0.15) });
      const pl = P(t, mid('halves', 0.25), 0.4, ease), pr = P(t, mid('halves', 0.62), 0.4, ease);
      tr(blkL, 0, 0); tr(blkR, 0, 0);
      op(blkL, 0.45 + 0.55 * pl); op(blkR, 0.45 + 0.55 * pr);
      popSet(cLeft, t, mid('halves', 0.25), k('halfway'), 285, 226);
      popSet(cRight, t, mid('halves', 0.62), k('halfway'), 860, 226);
    }

    /* ---------- B: the screen ---------- */
    if (sScr) {
      scr.upd(t);
      [Lcast, Lfore].forEach(el => view(el, WIDE));
      const seg = t < k('need') ? 'rule' : t < k('missing') ? 'need' : t < k('work') ? 'miss' : t < k('sizes') ? 'age' : t < k('slide') ? 'size' : 'slide';
      setText(scr.titleText, { rule: "PRIYA'S QUIZ", need: "PRIYA'S QUIZ", miss: 'QUICK-FIRE!', age: 'THE SECRET AGE', size: 'THE AUDIENCE', slide: '+2 BONUS MARKS' }[seg]);
      op(gRule, seg === 'rule'); op(gNeed, seg === 'need'); op(gMiss, seg === 'miss'); op(gAge, seg === 'age'); op(gSize, seg === 'size'); op(gSlide, seg === 'slide');
      const [cx, cy] = CORNER;
      if (seg === 'rule') {
        show.mean = 1;
        tr(mean, cx, 610, 0.72);
        mean.set({ t, talk: talk('mean'), mood: t < mid('rule', 0.45) ? 'annoyed' : 'deadpan', look: 0.6, arms: t > mid('rule', 0.55) ? 1 : 0 });
        op(gRule, 1);
        const p1 = P(t, at('rule') + 0.1, 0.3, linear), p2 = P(t, mid('rule', 0.3), 0.3, linear), p3 = P(t, mid('rule', 0.55), 0.4, linear);
        gRule.children[0].style.opacity = p1; gRule.children[1].style.opacity = p2;
        op(ruleM, p3); op(ruleBox, P(t, mid('rule', 0.85), 0.3, linear));
      }
      if (seg === 'need') {
        const full = t >= k('full');
        if (!full) { show.kav = 1; tr(kav, cx, cy, 1.0); kav.set({ t, talk: talk('kavya'), mood: t > mid('need', 0.85) ? 'happy' : 'neutral', look: 0.7 }); }
        else { show.priya = 1; tr(priya, cx, cy, 1.0); priya.set({ t, talk: talk('priya'), mood: 'shock', look: 0.5, lift: 0 }); }
        op(sofar, full ? 1 : P(t, at('need') + 0.05, 0.35, linear));
        op(want, full ? 1 : P(t, mid('need', 0.36), 0.35, linear));
        const pL = full ? 1 : P(t, mid('need', 0.64), 0.35, linear);
        op(lastL, pL);
        const fl = full ? 1 : P(t, mid('need', 0.86), 0.5, ease);
        const x1 = BX0 + lastL.w - 26, y1 = 146, x2 = BX0 + 4.5 * U, y2 = -12 + BH / 2 + 14;
        op(fly20, fl > 0 && fl < 1 ? 1 : 0);
        attr(fly20, 'x', lerp(x1, x2, fl)); attr(fly20, 'y', lerp(y1, y2, fl) - Math.sin(fl * Math.PI) * 60);
        op(qTxt, fl < 1 ? 1 : 0); op(qAns, fl >= 1 ? 1 : 0);
        attr(qBox, 'fill', fl >= 1 ? '#C8F5D8' : '#FFF4D6'); attr(qBox, 'stroke', fl >= 1 ? GREEN : AS.led);
        const so = P(t, mid('need', 0.9), 0.35, linear) * (full ? 0 : 1);
        if (so > 0) { stOK.set(so); tr(stOK, ...toW(272, 152), 0.55); }
        // full: 16 + 4
        const pp = full ? P(t, at('full') + 0.2, 0.6, linear) : 0;
        op(gPlus, pp > 0 ? 1 : 0); plusArr.forEach((a, i) => a.set(clamp(pp * 4 - i))); plusL.forEach((l, i) => op(l, clamp(pp * 4 - i - 0.5)));
        op(split, pp);
        if (full) popSet(c2020, t, at('full') + 0.05, 1e9, cx, 300);
      }
      if (seg === 'miss') {
        const dadOn = t >= k('dad');
        if (!dadOn) { show.benny = 1; tr(benny, cx, cy, 1.0); benny.set({ t, talk: talk('benny'), mood: 'happy', look: 0.7, lift: 1, ting: win(t, at('missing') + 0.05, at('missing') + 0.7, 0.15) }); }
        else { show.dad = 1; tr(dad, cx, cy, 1.0); dad.set({ t, talk: talk('dad'), mood: t < mid('dad', 0.12) ? 'smug' : t > mid('dad', 0.78) ? 'smug' : 'neutral', look: 0.7, lift: t > mid('dad', 0.7) ? 1 : 0 }); }
        mT.forEach((ti, i) => op(ti, dadOn ? 1 : P(t, mid('missing', 0.42 + i * 0.09), 0.25, linear)));
        gMiss.children[0].style.opacity = dadOn ? 1 : P(t, at('missing') + 0.2, 0.3, linear);
        if (dadOn) {
          const a = P(t, at('dad') + 0.1, 0.4, linear), b = P(t, mid('dad', 0.3), 0.4, linear), c3 = P(t, mid('dad', 0.56), 0.4, linear);
          mW.show(0, a); mW.show(1, b); mW.show(2, c3);
          mW.ring(2, t > mid('dad', 0.66) ? 1 : 0);
        } else { mW.show(0, 0); mW.show(1, 0); mW.show(2, 0); mW.ring(2, 0); }
        const solved = dadOn && t > mid('dad', 0.68);
        op(mT[4].txt, solved ? 0 : 1); op(mAns, solved ? 1 : 0);
        attr(mT[4].box, 'stroke', solved ? GREEN : AS.led); attr(mT[4].box, 'fill', solved ? '#C8F5D8' : '#FFF4D6');
        op(mChk, dadOn ? P(t, mid('dad', 0.72), 0.35, linear) : 0);
        const so = dadOn ? P(t, mid('dad', 0.7), 0.35, linear) : 0;
        if (so > 0) { stOK2.set(so); tr(stOK2, ...toW(268, -104), 0.55); }
      }
      if (seg === 'age') {
        show.kav = 1; tr(kav, cx, cy, 1.0);
        kav.set({ t, talk: talk('kavya'), mood: t > mid('work', 0.75) ? 'happy' : 'neutral', look: 0.7 });
        gAge.children[0].style.opacity = P(t, at('work') + 0.05, 0.3, linear);
        aW.show(0, P(t, at('work') + 0.2, 0.4, linear)); aW.show(1, P(t, mid('work', 0.33), 0.4, linear)); aW.show(2, P(t, mid('work', 0.64), 0.4, linear));
        aW.ring(2, t > mid('work', 0.78) ? 1 : 0);
      }
      if (seg === 'size') {
        show.mean = 1; tr(mean, cx, 610, 0.72);
        mean.set({ t, talk: talk('mean'), mood: t < mid('sizes', 0.2) ? 'annoyed' : t > mid('sizes', 0.88) ? 'smug' : 'deadpan', look: 0.6, arms: t > mid('sizes', 0.86) ? 1 : 0 });
        op(sTop, P(t, at('sizes') + 0.05, 0.3, linear));
        [0.22, 0.4, 0.6, 0.78].forEach((f, i) => sW.show(i, P(t, mid('sizes', f), 0.4, linear)));
        sW.ring(3, t > mid('sizes', 0.86) ? 1 : 0);
        const ps = P(t, mid('sizes', 0.82), 0.4, linear);
        op(saw, ps); op(sawNote, P(t, mid('sizes', 0.9), 0.3, linear));
        tr(plank, 0, 0, 1, 6 * (1 - P(t, mid('sizes', 0.84), 0.9, easeOut)) * AMP);
        const so = P(t, mid('sizes', 0.88), 0.35, linear);
        if (so > 0) { stOK3.set(so); tr(stOK3, ...toW(285, 30), 0.5); }
      }
      if (seg === 'slide') {
        show.ranger = 1; tr(ranger, cx - 10, 590, 0.78);
        const sl = P(t, mid('slide', 0.22), 1.3, ease);
        ranger.set({ t, talk: talk('ranger'), mood: t > mid('slide', 0.72) ? 'smug' : 'neutral', look: 0.7, reach: 40 + 60 * P(t, mid('slide', 0.7), 0.8, ease) });
        op(slTop0, sl < 0.5 ? 1 : 0); op(slTop1, sl >= 0.5 ? 1 : 0);
        dots.forEach(({ d, v, lvl }, i) => {
          const x = -350 + (v + 2 * sl - 2) * 700 / 12, y = 30 - 30 - lvl * 34;
          attr(d, 'cx', x); attr(d, 'cy', y);
          tr(plus2[i], x, y - 30); op(plus2[i], sl > 0 && sl < 1 ? 1 : (sl >= 1 && t < mid('slide', 0.7) ? 1 : 0));
        });
        tr(tapeG, -350 + (4 + 2 * sl - 2) * 700 / 12, -88);
        const lit = t > mid('slide', 0.72);
        attr(tape, 'fill', lit ? '#FFE45C' : '#FFD23C'); attr(tape, 'stroke-width', lit ? 5 : 3);
        [0.38, 0.48, 0.58, 0.74].forEach((f, i) => op(rd[i], P(t, mid('slide', f), 0.3, linear)));
        rdUp.forEach((u, i) => op(u, P(t, mid('slide', 0.4 + i * 0.1), 0.3, linear)));
      }
    }

    op(rose, show.rose); op(boy, show.boy); op(mum, show.mum); op(kav, show.kav); op(dad, show.dad);
    op(priya, show.priya); op(tan, show.tan); op(mean, show.mean); op(ranger, show.ranger); op(benny, show.benny);
  };
});
