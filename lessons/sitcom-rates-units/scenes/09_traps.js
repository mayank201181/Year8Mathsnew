/* Scene 9: The family saves you some marks (exam traps), then the stinger.
   "6 EXAM TRAPS" with the six of them lined up -> six snappy confessionals, one trap card each (Dad: 30 km in 20 min is
   90 km/h, not 1.5; Ah Boy: 1.3 h is 1 h 18 min, not 1 h 30; Lita: 5 m² = 50 000 cm², not 500; Flip: 13:45 to 14:10 is
   25 minutes, not 65; Uncle Raj: average speed = total distance ÷ total time, tea stops count; Mum: same units first)
   -> "LOST IN CONVERSION will return" -> Changi baggage reclaim: every suitcase arrives, almost -> Dad: "I wrote 20 on
   the tag" (flashback: just "20") -> Mètre on the carousel: "Twenty... what?" -> MEANWHILE, ON MARS: Dad's suitcase
   lies open in a crater -> a Martian stands up holding Dad's orange dotted shorts: "It's minus sixty degrees here." */
scene('traps', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;
  const talk = (t, who) => scTalk(S, t, who);

  /* ---------- helpers ---------- */
  const popIn = (el, t, t0, x, y, s) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p))); return p; };
  const outline = (el, col, w) => { el.setAttribute('stroke', col); el.setAttribute('stroke-width', w); el.setAttribute('paint-order', 'stroke'); el.setAttribute('stroke-linejoin', 'round'); return el; };
  const GOLD = '#FFE45C', INK = MK.ink, GREEN = '#1E9E5A', RED = '#C62828', BLUE = '#2E7DD8', MUTED = '#5A4A52', AMBER = '#E8A21C', BERRY = '#B8336A';
  const CX = 880;
  function trCard(parent, n) {
    const g = G(parent);
    E('rect', { x: 606, y: 136, width: 560, height: 470, rx: 18, fill: 'rgba(0,0,0,0.3)' }, g);
    E('rect', { x: 600, y: 130, width: 560, height: 470, rx: 18, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, g);
    const head = chip(g, 'TRAP ' + n, { size: 30, fill: '#D32F2F', color: '#FFFFFF', weight: 800 }); tr(head, CX, 182);
    return g;
  }
  const txt = (parent, y, s, o) => mkText(parent, CX, y, s, Object.assign({ size: 34, anchor: 'middle', fill: INK }, o || {}));
  const mth = (parent, y, s, o) => mkMath(parent, CX, y, s, Object.assign({ size: 40, anchor: 'middle', fill: INK, weight: 800 }, o || {}));
  const fadeIn = (el, t, t0) => { const p = P(t, t0, 0.3, easeOut); op(el, p); tr(el, 0, 10 * (1 - p)); };
  function trNo(parent, y, s, o) {
    const g = G(parent), m = mth(g, y, s, Object.assign({ fill: RED }, o || {}));
    const sl = strike(g, CX - m.w / 2 - 10, y - m.a * 0.4, CX + m.w / 2 + 10, INK);
    g.set = p => sl.set(p);
    return g;
  }
  function shortsArt(parent) {
    const g = G(parent);
    E('path', { d: 'M-50,-40 L50,-40 L58,28 L10,28 L0,-2 L-10,28 L-58,28 Z', fill: '#FF8A3D', stroke: SC_INK, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, g);
    [[-32, -20], [20, -24], [-14, 6], [36, 10], [-40, 14]].forEach(([x, y]) => E('circle', { cx: x, cy: y, r: 7, fill: '#FFE45C', stroke: '#C2453A', 'stroke-width': 2 }, g));
    return g;
  }
  function rays(parent, c0, c1, glowCol) {
    E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad(c0, c1, true) }, parent);
    let d = '';
    for (let i = 0; i < 16; i++) { const a0 = i / 16 * TAU, a1 = a0 + TAU / 40; d += `M0,0 L${(Math.cos(a0) * 1100).toFixed(0)},${(Math.sin(a0) * 1100).toFixed(0)} L${(Math.cos(a1) * 1100).toFixed(0)},${(Math.sin(a1) * 1100).toFixed(0)} Z `; }
    const r = E('path', { d, fill: '#FFE45C', opacity: 0.07 }, parent);
    E('ellipse', { cx: 600, cy: 610, rx: 620, ry: 170, fill: glow(glowCol), opacity: 0.35 }, parent);
    return r;
  }

  /* ---------- layers ---------- */
  const Lbg = G(root), Lcast = G(root), Lfront = G(root), Ltop = G(root), Lfg = G(root), Lhud = G(root);

  /* ===== intro: 6 EXAM TRAPS ===== */
  const introBg = G(Lbg);
  const rayI = rays(introBg, '#0E2A5A', '#1E5AA8', '#7FD3FF');
  const introF = G(Lfront);
  E('rect', { x: 0, y: 552, width: 1200, height: 200, fill: '#0A1A3A' }, introF);
  E('rect', { x: 0, y: 548, width: 1200, height: 8, fill: GOLD, opacity: 0.8 }, introF);
  const sI = G(Lhud);
  const iHead = outline(T(sI, 600, 196, '6 EXAM TRAPS', { size: 80, weight: 800, anchor: 'middle', fill: GOLD, ls: 3 }), '#0A1A3A', 10);
  const iSub = T(sI, 600, 254, 'The family saves you some marks', { size: 36, weight: 700, anchor: 'middle', fill: '#FFFFFF' });
  const ROWX = [140, 324, 508, 692, 876, 1060];
  const badges = ROWX.map((x, k) => { const g = G(sI); E('circle', { r: 26, fill: GOLD, stroke: SC_INK, 'stroke-width': 4 }, g); T(g, 0, 11, String(k + 1), { size: 30, weight: 800, anchor: 'middle', fill: SC_INK }); return g; });

  /* ===== confessional + trap cards ===== */
  const conf = lcConf(Lbg, 'dad');
  const TINT = {}; for (const k of ['dad', 'boy', 'lita', 'flip', 'raj', 'mum']) TINT[k] = linGrad(LC_TINT[k][0], LC_TINT[k][1], true);
  // 1 Dad
  const c1 = trCard(Lfg, 1);
  const c1a = txt(c1, 258, '**30 km** in **20 min**', { size: 40, boldFill: BLUE });
  const c1b = trNo(c1, 330, '30 ÷ 20 = 1.5 "km/h"', { size: 38 });
  const c1c = txt(c1, 412, '**hours** first: {{20 "min" = 1/3 "h"}}', { size: 32, boldFill: BERRY });
  const c1d = mth(c1, 512, '30 ÷ 1/3 = 90 "km/h"', { size: 46, fill: GREEN });
  const c1e = G(c1); tr(c1e, 1098, 560, 0.42);
  { const sc = G(c1e); E('path', { d: 'M-130,-16 L-46,-22 L-46,22 L-130,16 Z M130,-16 L46,-22 L46,22 L130,16 Z', fill: '#2E4C8C', stroke: SC_INK, 'stroke-width': 4 }, sc);
    E('rect', { x: -46, y: -36, width: 92, height: 72, rx: 8, fill: '#E2B33C', stroke: SC_INK, 'stroke-width': 5 }, sc); tr(sc, 0, 0, 1, 24); }
  const c1f = mkText(c1, 1016, 572, 'ask me how', { size: 26, anchor: 'end', fill: MUTED });
  // 2 Ah Boy
  const c2 = trCard(Lfg, 2);
  const c2a = mth(c2, 266, '1.3 "h" = ?', { size: 48, fill: BLUE });
  const c2b = trNo(c2, 340, '1 "h" 30 "min"', { size: 38 });
  const c2c = txt(c2, 420, '{{0.3 × 60 = 18}} min', { size: 40, fill: INK });
  const c2d = mth(c2, 500, '1.3 "h" = 1 "h" 18 "min"', { size: 44, fill: GREEN });
  const c2e = txt(c2, 564, 'decimal part **× 60**', { size: 30, fill: MUTED, boldFill: BLUE });
  // 3 Lita
  const c3 = trCard(Lfg, 3);
  const c3a = txt(c3, 262, '**Square it!**', { size: 44, boldFill: '#1E5A7A' });
  const c3b = mth(c3, 338, '1 "m"^2 = 100 × 100 = "10 000" cm²', { size: 32, fill: MUTED, weight: 700 });
  const c3c = mth(c3, 426, '5 "m"^2 = "50 000" cm²', { size: 50, fill: GREEN });
  const c3d = trNo(c3, 520, '"500" cm²', { size: 40 });
  // 4 Flip
  const c4 = trCard(Lfg, 4);
  const c4a = txt(c4, 258, '**13:45** to **14:10**', { size: 40, boldFill: BLUE });
  const nl4 = mkNumberLine(c4, { from: 0, to: 25, step: 5, len: 400, ink: INK, size: 28, arrows: false,
    labels: [[0, '"13:45"'], [15, '"14:00"'], [25, '"14:10"']],
    hops: [{ a: 0, b: 15, label: '**+15**', col: AMBER, height: 56 }, { a: 15, b: 25, label: '**+10**', col: BLUE, height: 50 }] });
  tr(nl4, CX - 200, 400);
  const c4c = mkChip(c4, 'count on: **25 minutes**', { size: 32, col: GREEN, fill: '#E6F6EC' }); tr(c4c, CX, 492);
  const c4d = trNo(c4, 560, '1410 − 1345 = 65', { size: 34 });
  // 5 Uncle Raj
  const c5 = trCard(Lfg, 5);
  const c5a = mth(c5, 296, '"average speed" = "total distance"/"total time"', { size: 34, weight: 700 });
  const c5b = trNo(c5, 412, '(60 + 20) ÷ 2', { size: 38 });
  const c5c = txt(c5, 470, 'not the **mean of the speeds**', { size: 28, fill: MUTED, boldFill: RED });
  const c5d = G(c5);
  { const cup = G(c5d); tr(cup, 720, 540); E('path', { d: 'M-26,-18 L26,-18 Q24,14 0,16 Q-24,14 -26,-18 Z', fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, cup);
    E('path', { d: 'M24,-10 Q40,-8 34,4 Q30,10 20,8', fill: 'none', stroke: SC_INK, 'stroke-width': 3 }, cup); E('ellipse', { cx: 0, cy: 18, rx: 34, ry: 6, fill: '#E6EBEF', stroke: SC_INK, 'stroke-width': 2.5 }, cup);
    mkText(c5d, 912, 552, 'tea stops **count**', { size: 34, anchor: 'middle', fill: INK, boldFill: GREEN }); }
  // 6 Mum
  const c6 = trCard(Lfg, 6);
  const c6a = txt(c6, 262, '**Same units** first', { size: 42, boldFill: BERRY });
  const c6b = txt(c6, 336, '**g** with **g**, **ml** with **ml**', { size: 36, boldFill: BLUE });
  const c6c = mth(c6, 430, '0.75 "l" = 750 ml', { size: 46, fill: GREEN });
  const c6d = mth(c6, 494, '1 "l" = 1000 ml', { size: 32, fill: MUTED, weight: 700 });
  const c6e = mkChip(c6, '**then** compare', { size: 30, col: BERRY, fill: '#FCE8F0' }); tr(c6e, CX, 556);

  /* ===== logo: will return ===== */
  const logoBg = G(Lbg);
  const rayR = rays(logoBg, '#0E2A5A', '#1E5AA8', '#7FD3FF');
  const sR = G(Lhud);
  const logo = G(sR);
  outline(T(logo, 0, -78, 'LOST IN', { size: 60, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 8 }), '#0A1A3A', 12);
  outline(T(logo, 0, 18, 'CONVERSION', { size: 100, weight: 800, anchor: 'middle', fill: GOLD, ls: 2 }), '#0A1A3A', 12);
  const lRule = G(logo); tr(lRule, 0, 56);
  E('rect', { x: -330, y: 0, width: 660, height: 34, rx: 6, fill: '#F2C24A', stroke: '#0A1A3A', 'stroke-width': 4 }, lRule);
  let lt2 = ''; for (let i = 0; i <= 60; i++) lt2 += `M${-324 + i * 10.8},0 v${i % 10 === 0 ? 20 : i % 5 === 0 ? 14 : 8} `;
  E('path', { d: lt2, stroke: '#5A3A10', 'stroke-width': 2.5 }, lRule);
  const rSub = T(sR, 600, 470, 'will return', { size: 50, weight: 700, anchor: 'middle', fill: '#FFFFFF' });

  /* ===== stinger 1: Changi baggage reclaim ===== */
  const recShot = G(Lbg);
  const rec = lcAirport(recShot, { front: 'rail', title: 'BAGGAGE RECLAIM', sign: 'Belt 5' });
  const recF = G(Lfront); recF.appendChild(rec.front); recF.appendChild(rec.top);
  const belt = G(Ltop);
  E('rect', { x: -20, y: 596, width: 1240, height: 64, rx: 10, fill: '#3A4250', stroke: '#1E2630', 'stroke-width': 4 }, belt);
  const slats = E('path', { d: '', stroke: '#5A6670', 'stroke-width': 5 }, belt);
  E('rect', { x: -20, y: 656, width: 1240, height: 40, fill: '#8F9CAB', stroke: '#5A6670', 'stroke-width': 3 }, belt);
  const bags = G(Ltop);
  const BAGS = [['#2E7DD8', 560], ['#C2453A', 800], ['#FF8FC8', 1040], [null, 1280], ['#7A3AB8', 1520], ['#2FA36B', 1760], ['#FFC247', 2000]];
  const bagEls = BAGS.map(([col]) => col ? lcSuitcase(bags, { col, w: 150, h: 120, s: 0.85 }) : null);
  const metBag = 4;                                                  // Mètre rides the purple one
  const cHome = mkChip(Lfg, 'Changi · **baggage reclaim**', { size: 30, col: GOLD });
  const flash = G(Lfg);
  E('rect', { x: 720, y: 104, width: 440, height: 236, rx: 16, fill: '#F2E4C6', stroke: '#8B6B3A', 'stroke-width': 6 }, flash);
  T(flash, 940, 146, 'FLASHBACK: Friday', { size: 28, weight: 800, anchor: 'middle', fill: '#8B6B3A', ls: 2 });
  const bigTag = lcTag(flash, '20', { size: 80 }); tr(bigTag, 830, 250);
  const tagQ = T(flash, 1105, 290, '?', { size: 80, weight: 800, anchor: 'middle', fill: RED });

  /* ===== stinger 2: Mars ===== */
  const marsShot = G(Lbg);
  const mars = lcMars(marsShot);
  const crater = G(marsShot);
  // Dad's suitcase, open in the crater (lid behind, base in front)
  const lid = G(crater); tr(lid, 560, 600, 1, -14);
  E('rect', { x: -110, y: -150, width: 220, height: 150, rx: 16, fill: '#2E7DD8', stroke: SC_INK, 'stroke-width': 5 }, lid);
  E('rect', { x: -96, y: -136, width: 192, height: 122, rx: 10, fill: '#BFD8EC', stroke: '#1E5AA8', 'stroke-width': 3 }, lid);
  const marsCast = G(marsShot);
  const caseBase = G(marsShot); tr(caseBase, 560, 610);
  E('ellipse', { cx: 0, cy: 18, rx: 190, ry: 30, fill: '#7A2410', opacity: 0.7 }, caseBase);
  E('rect', { x: -116, y: -60, width: 232, height: 70, rx: 14, fill: '#2E7DD8', stroke: SC_INK, 'stroke-width': 5 }, caseBase);
  const mTag = lcTag(caseBase, '20', { size: 36 }); tr(mTag, 112, -40, 1, 30);
  const heldShorts = shortsArt(Lfg);
  const cMinus = mkChip(Lfg, 'Mars: about **−60 °C**', { size: 36, col: '#7FD3FF' });

  /* ---------- the cast ---------- */
  const dad = cast(Lcast, 'dad', { prop: null }), boy = cast(Lcast, 'boy'), mum = cast(Lcast, 'mum'), raj = cast(Lcast, 'raj'),
    kav = cast(Lcast, 'kavya');
  const lita = cast(Lcast, 'lita'), flip = cast(Lcast, 'flip');
  const met = cast(bags, 'metre');
  const martian = cast(marsCast, 'martian');

  /* ---------- shots ---------- */
  const cut = id => at(id) - 0.06;
  const SHOTS = [['I', -9], ['1', cut('t1')], ['2', cut('t2')], ['3', cut('t3')], ['4', cut('t4')], ['5', cut('t5')], ['6', cut('t6')],
    ['R', cut('return')], ['W', cut('home')], ['M', cut('mars')]];
  const shotAt = t => { let s = 'I'; for (const [k, t0] of SHOTS) if (t >= t0) s = k; return s; };
  const CARDS = { 1: c1, 2: c2, 3: c3, 4: c4, 5: c5, 6: c6 };
  const CONF = { 1: 'dad', 2: 'boy', 3: 'lita', 4: 'flip', 5: 'raj', 6: 'mum' };
  const ROW = [[dad, 'smug', 0.62, 470], [boy, 'happy', 0.66, 470], [lita, 'happy', 0.5, 470], [flip, 'happy', 0.42, 456], [raj, 'happy', 0.62, 470], [mum, 'smug', 0.62, 470]];
  const cW = cut('home'), BV = 90;                                   // belt speed px/s
  const FX = { kavya: 82, mum: 205, dad: 330, boy: 452 };

  return t => {
    const sh = shotAt(t);
    op(introBg, sh === 'I' ? 1 : 0); op(introF, sh === 'I' ? 1 : 0); op(sI, sh === 'I' ? 1 : 0);
    op(logoBg, sh === 'R' ? 1 : 0); op(sR, sh === 'R' ? 1 : 0);
    op(recShot, sh === 'W' ? 1 : 0); op(recF, sh === 'W' ? 1 : 0); op(belt, sh === 'W' ? 1 : 0); op(bags, sh === 'W' ? 1 : 0);
    op(marsShot, sh === 'M' ? 1 : 0);
    for (const k in CARDS) op(CARDS[k], sh === k ? 1 : 0);
    const cw = CONF[sh];
    conf.set(cw ? 1 : 0, t); if (cw) conf.firstChild.setAttribute('fill', TINT[cw]);
    [dad, boy, mum, raj, kav, lita, flip].forEach(e => op(e, 0));
    op(flash, 0); op(heldShorts, 0); cHome.set(0); cMinus.set(0);
    op(mum.hand, cw === 'mum' || sh === 'I' ? 1 : 0);
    const show = (c, x, y, s, st) => { op(c, 1); tr(c, x, y, s); c.set(Object.assign({ t }, st)); };

    if (sh === 'I') {
      tr(rayI, 600, 600, 1, (t * 6 * AMP) % 360);
      const hp = P(t, at('intro') + 0.05, 0.45, pop);
      op(iHead, clamp(hp * 2.5)); iHead.setAttribute('transform', `translate(600 170) scale(${Math.max(0.01, 0.6 + 0.4 * hp).toFixed(3)}) translate(-600 -170)`);
      op(iSub, P(t, mid('intro', 0.25), 0.4, linear));
      ROW.forEach(([c, mood, s, y], i) => {
        const p = P(t, mid('intro', 0.35) + i * 0.13, 0.45, pop);
        show(c, ROWX[i], y + 40 * (1 - clamp(p)), Math.max(0.01, s * (0.7 + 0.3 * p)), { mood, look: 0, text: '6 TRAPS', flap: 1 });
        op(c, clamp(p * 3));
        popIn(badges[i], t, mid('intro', 0.4) + i * 0.13, ROWX[i], 640);
      });
    } else if (cw) {
      if (cw === 'dad') {
        show(dad, 320, 575, 1.4, { talk: talk(t, 'dad'), mood: t > mid('t1', 0.78) ? 'sad' : 'neutral', look: 0.4 });
        fadeIn(c1a, t, at('t1') + 0.1); fadeIn(c1b, t, mid('t1', 0.12)); c1b.set(P(t, mid('t1', 0.24), 0.3, linear));
        fadeIn(c1c, t, mid('t1', 0.38)); fadeIn(c1d, t, mid('t1', 0.58));
        fadeIn(c1e, t, mid('t1', 0.8)); fadeIn(c1f, t, mid('t1', 0.8));
        tr(c1e, 1098, 560 + 8 * Math.sin(t * 3), 0.42);
      } else if (cw === 'boy') {
        show(boy, 320, 560, 1.5, { talk: talk(t, 'boy'), mood: 'happy', look: 0.4, lift: t > mid('t2', 0.7) ? 1 : 0 });
        fadeIn(c2a, t, at('t2') + 0.1); fadeIn(c2b, t, mid('t2', 0.15)); c2b.set(P(t, mid('t2', 0.3), 0.3, linear));
        fadeIn(c2c, t, mid('t2', 0.45)); fadeIn(c2d, t, mid('t2', 0.72)); fadeIn(c2e, t, mid('t2', 0.85));
      } else if (cw === 'lita') {
        show(lita, 320, 420, 1.25, { talk: talk(t, 'lita'), mood: 'happy', look: 0.5, grid: P(t, mid('t3', 0.2), 0.5, linear), level: 0.75 });
        fadeIn(c3a, t, mid('t3', 0.7)); fadeIn(c3b, t, mid('t3', 0.05)); fadeIn(c3c, t, mid('t3', 0.15));
        fadeIn(c3d, t, mid('t3', 0.4)); c3d.set(P(t, mid('t3', 0.55), 0.3, linear));
      } else if (cw === 'flip') {
        const tx = t < mid('t4', 0.55) ? '13:45' : '25 MIN', t0 = t < mid('t4', 0.55) ? at('t4') : mid('t4', 0.55);
        show(flip, 320, 400, 1.2, { talk: talk(t, 'flip'), mood: t > mid('t4', 0.6) && t < mid('t4', 0.8) ? 'annoyed' : 'happy', look: 0.5, text: tx, flap: P(t, t0, 0.6, linear) });
        fadeIn(c4a, t, at('t4') + 0.1);
        nl4.hop(0, P(t, mid('t4', 0.2), 0.5, ease)); nl4.hop(1, P(t, mid('t4', 0.35), 0.5, ease));
        c4c.set(P(t, mid('t4', 0.5), 0.4, linear));
        fadeIn(c4d, t, mid('t4', 0.62)); c4d.set(P(t, mid('t4', 0.72), 0.3, linear));
      } else if (cw === 'raj') {
        show(raj, 320, 575, 1.4, { talk: talk(t, 'raj'), mood: 'happy', look: 0.4, lift: t > mid('t5', 0.8) ? 1 : 0 });
        fadeIn(c5a, t, at('t5') + 0.15); fadeIn(c5b, t, mid('t5', 0.5)); c5b.set(P(t, mid('t5', 0.6), 0.3, linear));
        fadeIn(c5c, t, mid('t5', 0.6)); fadeIn(c5d, t, mid('t5', 0.82));
      } else {
        show(mum, 320, 575, 1.4, { talk: talk(t, 'mum'), mood: t > mid('t6', 0.7) ? 'smug' : 'neutral', look: 0.4, lift: t > mid('t6', 0.3) && t < mid('t6', 0.8) ? 1 : 0 });
        fadeIn(c6a, t, at('t6') + 0.1); fadeIn(c6b, t, mid('t6', 0.4)); fadeIn(c6c, t, mid('t6', 0.62)); fadeIn(c6d, t, mid('t6', 0.72));
        c6e.set(P(t, mid('t6', 0.85), 0.4, linear));
      }
    } else if (sh === 'R') {
      tr(rayR, 600, 600, 1, (t * 6 * AMP) % 360);
      const lp = P(t, at('return') - 0.05, 0.6, pop);
      op(logo, clamp(lp * 2.5)); tr(logo, 600, 300, Math.max(0.01, 0.5 + 0.5 * lp));
      op(rSub, P(t, mid('return', 0.45), 0.4, linear));
    } else if (sh === 'W') {
      const u = t - cW, off = (u * BV) % 40;
      let d = ''; for (let x = -20 + 40 - off; x < 1220; x += 40) d += `M${x.toFixed(1)},600 v56 `;
      attr(slats, 'd', d);
      bagEls.forEach((b, i) => { if (b) tr(b, BAGS[i][1] - u * BV, 620); });
      // Mètre riding the purple suitcase
      const mbx = BAGS[metBag][1] - u * BV;
      tr(met, mbx, 620 - 136 * 0.85 - 186 * 0.42, 0.42);
      const who = scWho(S, t);
      met.set({ t, talk: talk(t, 'metre'), mood: t > mid('what', 0.6) ? 'annoyed' : 'deadpan', look: t >= at('what') ? -0.8 : -0.3, point: 0 });
      cHome.set(P(t, at('home') + 0.2, 0.4, linear) * (1 - P(t, at('tag') - 0.2, 0.2, linear))); tr(cHome, 860, 252);
      // the family waits behind the rail
      const look = x => (who === 'metre' ? clamp((mbx - x) / 260, -1, 1) : who === 'dad' ? clamp((FX.dad - x) / 200, -1, 1) : 0.8);
      [[kav, 'kavya'], [mum, 'mum'], [dad, 'dad'], [boy, 'boy']].forEach(([c, k]) => {
        let mood = 'neutral';
        if (k === 'dad') mood = t >= at('tag') ? 'sad' : 'neutral';
        else if (t >= at('tag') && t < at('what')) mood = k === 'kavya' ? 'deadpan' : k === 'mum' ? 'annoyed' : 'neutral';
        else if (t >= at('what')) mood = k === 'boy' ? 'happy' : 'deadpan';
        show(c, FX[k], 455, 0.72, { talk: talk(t, k), mood, look: k === 'dad' && who === 'dad' ? 0.6 : look(FX[k]) });
      });
      if (t >= at('tag') + 0.3) {
        const fp = P(t, at('tag') + 0.3, 0.35, pop);
        op(flash, clamp(fp * 3) * (1 - P(t, at('what') - 0.1, 0.2, linear)));
        op(tagQ, P(t, mid('tag', 0.7), 0.3, linear));
      }
    } else if (sh === 'M') {
      mars.set(0, 6);                                                // no new spacecraft: the counter still says 5
      const up = P(t, at('martian') - 0.1, 0.5, easeOut);
      const mx = 820, my = lerp(720, 470, up);
      tr(martian, mx, my, 0.95);
      martian.set({ t, talk: talk(t, 'martian'), mood: 'deadpan', look: t > end('martian') ? 0 : -0.4 });
      op(martian, t >= at('martian') - 0.1 ? 1 : 0);
      op(heldShorts, 1);
      if (t >= at('martian') - 0.1) tr(heldShorts, lerp(560, mx + 112, up), lerp(572, my + 24, up) - 20 * P(t, mid('martian', 0.2), 0.4, easeOut), 0.95, 10 + 4 * Math.sin(t * 3) * AMP);
      else tr(heldShorts, 560, 572, 0.9, -8);
      cMinus.set(P(t, mid('martian', 0.5), 0.4, linear)); tr(cMinus, 360, 300);
    }
  };
});
