/* Scene 4: Everyone gets a handshake (expanding single brackets).
   Shots (hard sitcom cuts):
   A  4 p.m. at the door of #08-208: Mum, Kavya and Ah Boy greet the guests; families arrive along the corridor as a
      big pair of brackets around their members (x and 4). Handy, the term outside the bracket, stands at the door.
      A white card (top right) carries the maths.
      four: "4 p.m.", the (x + 4) family walks in -> rule: "greet EVERYONE in the family" -> handy: Handy pops up (lower
      third), 3(x + 4) with "outside" and "inside" -> boy: Ah Boy shakes only x: 3x + 4 (red), the 4 sulks -> missed:
      Handy shakes the 4 too: 3 × 4 = 12, 3(x + 4) = 3x + 12 -> area: the 4 by (x + 3) rectangle, 4x and 12,
      4(x + 3) ≡ 4x + 12 -> neg: Handy turns purple (−2); the (3x − 5) family; −2 × 3x = −6x, −2 × (−5) = +10,
      −2(3x − 5) = −6x + 10 -> dad: Dad, "−2(x − 4) = −2x − 8 ?", "Same thing." -> blown: Agent X drops in on a rope,
      x = 0: left 8, right −8, COVER BLOWN; −2 × (−4) = +8, −2x + 8 -> tan: Mr Tan pops up with sweets (lower third),
      Handy's tag x: the x by (x + 3) rectangle, x(x + 3) = x² + 3x.
   B  the living room, a whiteboard on the left: Mr Tan's party game 3(2x + 1) − 2(x − 4) = 6x + 3 − 2x + 8 = 4x + 11
      (the +8 circled: −2 × (−4) = +8) -> the pun lands to silence; Handy shakes Mr Tan's hand anyway. */
scene('hands', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const GOLD = '#FFE45C', RED = '#D32F2F', BLUE = '#2E6FD8', GREEN = '#1E9E5A', GREY = '#5A6670', INK = MK.ink, AMBER = '#E07A12';
  const chipC = (parent, text, o) => { o = o || {}; return mkChip(parent, text, { size: o.size || 30, col: o.col || GOLD }); };
  const pc = (c, t, t0, t1) => c.set(t >= t0 && (t1 === undefined || t < t1) ? P(t, t0, 0.35, linear) : 0);
  const fin = (t, t0, d) => P(t, t0, d || 0.3, linear);
  const M = (parent, x, y, src, o) => mkMath(parent, x, y, src, Object.assign({ size: 50, fill: INK }, o || {}));
  const mw = (src, size) => mkMeasure(src, { size }).w;
  const after = (g, s) => g.x0 + g.w + 0.24 * s;                    // where the next binary term starts
  const centreOf = (x0, upto, part, s) => x0 + mw(upto, s) - mw(part, s) / 2;   // centre of `part`, which ends `upto`
  const strikeL = (parent, x1, x2, y, col) => { const l = E('path', { d: `M${x1},${y} L${x2},${y - 6}`, stroke: col || RED, 'stroke-width': 6, 'stroke-linecap': 'round' }, parent); mkDash(l); return l; };
  const ding = (parent, x, y) => T(parent, x, y, 'ding!', { size: 26, weight: 800, anchor: 'middle', fill: AMBER });
  const outline = (el, col, w) => { el.setAttribute('stroke', col); el.setAttribute('stroke-width', w); el.setAttribute('paint-order', 'stroke'); el.setAttribute('stroke-linejoin', 'round'); };
  /* a guest "term": a rounded body with the term written on it, a face and little legs; feet at y +66 (s = 1) */
  const guest = (parent, labels, col, seed) => {
    const labs = [];
    const c = scMake(parent, { s: 0.9, seed, bob: 3, mood: 'happy',
      draw: g => {
        [-16, 16].forEach(x => {
          E('path', { d: `M${x},40 L${x},58`, stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
          E('ellipse', { cx: x + Math.sign(x) * 6, cy: 62, rx: 13, ry: 6, fill: '#3A3440', stroke: SC_INK, 'stroke-width': 2.5 }, g);
        });
        E('rect', { x: -42, y: -70, width: 84, height: 112, rx: 30, fill: col, stroke: SC_INK, 'stroke-width': 5 }, g);
        labels.forEach(src => { const m = mkMath(g, 0, 30, src, { size: 40, anchor: 'middle', fill: MK.ink }); labs.push(m); });
      },
      face: { x: 0, y: -36, eye: 10, gap: 30, mouthW: 20, mouthY: 17, lidCol: mkShade(col, -0.18) } });
    c.labs = labs;
    return c;
  };

  /* layers: set backs, the humans, the band / table, the cartoons, overlays, HUD */
  const Lbg = G(root), Lcast = G(root), Lfront = G(root), Ltoon = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= A: the door ================= */
  const doorShot = G(Lbg);
  const door = xpDoor(doorShot);
  Lfront.appendChild(door.front); Lfront.appendChild(door.top);
  // a Deepavali banner along the parapet band
  { const bn = G(door.front);
    E('rect', { x: 640, y: 596, width: 500, height: 70, rx: 12, fill: '#B8233A', stroke: '#6E1424', 'stroke-width': 4 }, bn);
    E('path', { d: 'M652,608 L1128,608 M652,654 L1128,654', stroke: '#FFC247', 'stroke-width': 3 }, bn);
    T(bn, 890, 643, 'HAPPY DEEPAVALI', { size: 32, weight: 800, anchor: 'middle', fill: '#FFE45C', ls: 3 });
    [[610, 640], [1170, 640]].forEach(([x, y]) => { const d = xpDiya(bn, 0.8); tr(d, x, y); }); }
  const c4pm = chipC(Lfg, '**4 p.m.**', { size: 32 });
  const cFam = chipC(Lfg, 'a **family** of terms', { col: '#9FD8FF' });
  const cRule1 = chipC(Lfg, 'Greet **everyone** in the family', { size: 32 });
  const cRule2 = chipC(Lfg, 'not just the **first** one!', { col: '#FF8A8A' });

  // the guest family: a big pair of brackets round two terms, feet on the parapet band
  const fam = G(Ltoon);
  const famBr = G(fam);
  [-1, 1].forEach(sd => {
    const d = `M${sd * 108},-150 Q${sd * 140},-78 ${sd * 108},-6`;
    E('path', { d, fill: 'none', stroke: SC_INK, 'stroke-width': 16, 'stroke-linecap': 'round' }, famBr);
    E('path', { d, fill: 'none', stroke: GOLD, 'stroke-width': 8, 'stroke-linecap': 'round' }, famBr);
  });
  const g1 = guest(fam, ['x', '3x'], '#9FD8FF', 5), g2 = guest(fam, ['4', '5'], '#FFC27A', 9);
  const sPlus = T(fam, 0, -44, '+', { size: 60, weight: 800, anchor: 'middle', fill: '#FFFFFF' }); outline(sPlus, SC_INK, 9);
  const sMinus = T(fam, 0, -44, '−', { size: 60, weight: 800, anchor: 'middle', fill: '#FFFFFF' }); outline(sMinus, SC_INK, 9);

  // the card (top right)
  const card = G(Lfg);
  E('rect', { x: 585, y: 108, width: 585, height: 296, rx: 18, fill: MK.paper, stroke: '#B8A27A', 'stroke-width': 5 }, card);

  // card 1: 3(x + 4)
  const S1 = 62, X1 = 640, Y1 = 300;
  const c1 = G(card);
  const lhs1 = M(c1, X1, Y1, '3(x + 4) =', { size: S1 });
  const p3 = X1 + mw('3', S1) / 2, pX = centreOf(X1, '3(x', 'x', S1), p4 = centreOf(X1, '3(x + 4', '4', S1);
  const R1 = after(lhs1, S1);
  const rBoy = M(c1, R1, Y1, '3x + 4', { size: S1, fill: RED });
  const sBoy = strikeL(c1, R1 - 8, R1 + mw('3x + 4', S1) + 8, Y1 - 18);
  const qBoy = T(c1, R1 + mw('3x + 4', S1) + 18, Y1, '?', { size: 60, weight: 800, fill: RED });
  const rOk = M(c1, R1, Y1, '3x + 12', { size: S1, fill: GREEN });
  const tOk = tick(c1, 16); tr(tOk, R1 + mw('3x + 12', S1) + 30, Y1 - 22);
  const aY = Y1 - 0.8 * S1;
  const arX = arrow(c1, p3, aY, pX, aY, { color: BLUE, width: 4, bend: -30 });
  const ar4 = arrow(c1, p3, aY, p4, aY, { color: GREEN, width: 4, bend: -62 });
  const dX = ding(c1, pX + 10, aY - 34), d4 = ding(c1, p4 + 16, aY - 52);
  const n12 = M(c1, 1150, 160, '3 * 4 = 12', { size: 34, fill: GREEN, anchor: 'end' });
  // outside / inside labels
  const lab1 = G(c1);
  const inA = X1 + mw('3(', S1), inB = X1 + mw('3(x + 4', S1);
  mkBrace(lab1, inA, Y1 + 18, inB, Y1 + 18, { flip: true, text: 'inside', col: BLUE, size: 30 });
  E('path', { d: `M${p3},${Y1 + 52} L${p3},${Y1 + 20}`, stroke: AMBER, 'stroke-width': 5, 'stroke-linecap': 'round' }, lab1);
  E('path', { d: `M${p3 - 9},${Y1 + 30} L${p3},${Y1 + 18} L${p3 + 9},${Y1 + 30}`, fill: 'none', stroke: AMBER, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, lab1);
  T(lab1, p3 - 14, Y1 + 84, 'outside', { size: 28, weight: 800, fill: AMBER, anchor: 'middle' });

  // card 2: the area model 4 by (x + 3)
  const c2 = G(card);
  const AX = 742, AYt = 150, AXW = 200, A3W = 75, AH = 100;
  E('rect', { x: AX, y: AYt, width: AXW, height: AH, fill: '#CFE9FF', stroke: INK, 'stroke-width': 4 }, c2);
  E('rect', { x: AX + AXW, y: AYt, width: A3W, height: AH, fill: '#FFE2B8', stroke: INK, 'stroke-width': 4 }, c2);
  M(c2, AX + AXW / 2, AYt - 12, 'x', { size: 38, anchor: 'middle', fill: BLUE });
  M(c2, AX + AXW + A3W / 2, AYt - 12, '3', { size: 38, anchor: 'middle', fill: BLUE });
  M(c2, AX - 18, AYt + AH / 2 + 13, '4', { size: 38, anchor: 'end', fill: AMBER });
  const a4x = M(c2, AX + AXW / 2, AYt + AH / 2 + 14, '4x', { size: 42, anchor: 'middle' });
  const a12 = M(c2, AX + AXW + A3W / 2, AYt + AH / 2 + 13, '12', { size: 38, anchor: 'middle' });
  const aEq = G(c2);
  { const s = 52, parts = ['4(x + 3)', '≡', '4x + 12'], ws = parts.map(p => mw(p, s)), gap = 0.26 * s, tot = ws.reduce((a, b) => a + b, 0) + 2 * gap;
    let x = 877 - tot / 2; parts.forEach((p, i) => { M(aEq, x, 330, p, { size: s, fill: i === 2 ? GREEN : INK }); x += ws[i] + gap; }); }
  const cIdent = chipC(c2, 'our **identity**!', { col: '#C9A3FF' }); tr(cIdent, 877, 376);

  // card 3: a negative outside, −2(3x − 5)
  const SN = 54, XN = 625, YN = 230;
  const c3 = G(card);
  const lhsN = M(c3, XN, YN, '-2(3x - 5) =', { size: SN });
  const pm2 = XN + mw('-2', SN) / 2, p3x = centreOf(XN, '-2(3x', '3x', SN), pm5 = XN + mw('-2(3x - 5', SN) - mw('5', SN) * 0.9;
  const rN = M(c3, after(lhsN, SN), YN, '-6x + 10', { size: SN, fill: GREEN });
  const aNY = YN - 0.8 * SN;
  const arN1 = arrow(c3, pm2, aNY, p3x, aNY, { color: '#7B4FD0', width: 4, bend: -28 });
  const arN2 = arrow(c3, pm2, aNY, pm5, aNY, { color: '#7B4FD0', width: 4, bend: -50 });
  const dN1 = ding(c3, p3x + 12, aNY - 30), dN2 = ding(c3, pm5 + 16, aNY - 44);
  const pN1 = M(c3, 735, 305, '-2 * 3x = -6x', { size: 36, anchor: 'middle', fill: '#7B4FD0' });
  const pN2 = M(c3, 1020, 305, '-2 * (-5) = +10', { size: 36, anchor: 'middle', fill: '#7B4FD0' });
  const nFlip = mkText(c3, 877, 375, 'a negative outside **flips every sign**', { size: 30, anchor: 'middle', fill: GREY, boldFill: RED, weight: 700 });

  // card 4: Dad's claim, Agent X undercover as 0
  const SD = 44, XD = 625, YD = 172;
  const c4 = G(card);
  const lhsD = M(c4, XD, YD, '-2(x - 4) =', { size: SD });
  const RD = after(lhsD, SD);
  const rDad = M(c4, RD, YD, '-2x - 8', { size: SD, fill: BLUE });
  const qDad = T(c4, RD + mw('-2x - 8', SD) + 16, YD, '?', { size: 50, weight: 800, fill: RED });
  const rFix = M(c4, RD, YD, '-2x + 8', { size: SD, fill: GREEN });
  const tFix = tick(c4, 14); tr(tFix, RD + mw('-2x + 8', SD) + 30, YD - 16);
  const cSame = chipC(c4, '"Same thing."', { size: 34 }); tr(cSame, 877, 280);
  const bL = mkText(c4, XD, 242, 'left:  {{-2(0 - 4) = 8}}', { size: 36, fill: INK, weight: 700 });
  const bR = mkText(c4, XD, 302, 'right:  {{-2 * 0 - 8 = -8}}', { size: 36, fill: INK, weight: 700 });
  const bNe = M(c4, XD + 40, 372, '8 != -8', { size: 48, fill: RED });
  const bFix = M(c4, 877, 290, '-2 * (-4) = +8', { size: 50, fill: GREEN, anchor: 'middle' });
  const stampNo = xpStamp(c4, false);
  const bTag = G(c4); tr(bTag, 1090, 236);
  E('rect', { x: -64, y: -30, width: 128, height: 56, rx: 10, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 4 }, bTag);
  E('rect', { x: -64, y: -30, width: 128, height: 12, rx: 6, fill: '#C62828' }, bTag);
  M(bTag, 0, 16, 'x = 0', { size: 34, anchor: 'middle' });

  // card 5: letters work too, x(x + 3)
  const c5 = G(card);
  const TX = 700, TYt = 152, TXW = 128, T3W = 64, TH = 128;
  E('rect', { x: TX, y: TYt, width: TXW, height: TH, fill: '#CFE9FF', stroke: INK, 'stroke-width': 4 }, c5);
  E('rect', { x: TX + TXW, y: TYt, width: T3W, height: TH, fill: '#FFE2B8', stroke: INK, 'stroke-width': 4 }, c5);
  M(c5, TX + TXW / 2, TYt - 10, 'x', { size: 36, anchor: 'middle', fill: BLUE });
  M(c5, TX + TXW + T3W / 2, TYt - 10, '3', { size: 36, anchor: 'middle', fill: BLUE });
  M(c5, TX - 16, TYt + TH / 2 + 12, 'x', { size: 36, anchor: 'end', fill: AMBER });
  M(c5, TX + TXW / 2, TYt + TH / 2 + 14, 'x^2', { size: 44, anchor: 'middle' });
  M(c5, TX + TXW + T3W / 2, TYt + TH / 2 + 12, '3x', { size: 34, anchor: 'middle' });
  const tEq = M(c5, 877, 362, 'x(x + 3) = x^2 + 3x', { size: 50, anchor: 'middle' });
  const cLet = chipC(c5, '**letters** work too', { col: '#9FD8FF', size: 28 }); tr(cLet, 1045, 215);

  // Agent X's rope
  const rope = E('path', { d: 'M0,0 L0,1', stroke: '#2A2A32', 'stroke-width': 4 }, Ltoon);

  /* ================= B: the living room, Mr Tan's party game ================= */
  const flatShot = G(Lbg);
  const flat = xpFlat(flatShot);
  op(flat.shelf, 1);
  Lfront.appendChild(flat.front); Lfront.appendChild(flat.top);
  const wb = mkWhiteboard(flatShot, 540, 300, { title: 'Party game: expand and simplify', titleSize: 30, stand: true });
  tr(wb, 330, 300);
  const SW = 44, WX = -192;   // the '=' column, in board coordinates
  const wk = mkWorking(wb, WX, -64, ['3(2x + 1) - 2(x - 4)', '= 6x + 3 - 2x + 8', '= 4x + 11'], { size: SW, fill: INK, gap: 18 });
  const rhs0 = WX + mw('=', SW) / 2 + 0.26 * SW;
  const r8a = rhs0 + mw('6x + 3 - 2x', SW) + 0.2 * SW, r8b = rhs0 + mw('6x + 3 - 2x + 8', SW) + 0.12 * SW;
  const ring8 = E('ellipse', { cx: (r8a + r8b) / 2, cy: wk.lineY[1] - 0.3 * SW, rx: (r8b - r8a) / 2 + 12, ry: 0.55 * SW, fill: 'none', stroke: RED, 'stroke-width': 5 }, wb);
  mkDash(ring8);
  const n8x = WX + mw('= 4x + 11', SW) + 60;
  const note8 = M(wb, n8x, wk.lineY[2], '-2 * (-4) = +8', { size: 32, fill: RED });
  const ar8 = arrow(wb, (r8a + r8b) / 2, wk.lineY[1] + 0.35 * SW, n8x + 40, wk.lineY[2] - 0.75 * 32, { color: RED, width: 4 });
  const bub1 = mkSpeechBubble(Lfg, 'Why did the bracket come\nto the **open house**?', { size: 30, tail: 'down', tailX: -110 });
  const bub2 = mkSpeechBubble(Lfg, 'To **expand** its\nsocial circle!', { size: 34, tail: 'down', tailX: -110 });
  const cCrick = mkChip(Lfg, 'cricket… cricket…', { size: 28, col: '#A4BCCB' });

  /* ================= the cast ================= */
  const mum = cast(Lcast, 'mum');
  const kav = cast(Lcast, 'kavya');
  const boy = cast(Lcast, 'boy');
  const dad = cast(Lcast, 'dad');
  const tan = cast(Lcast, 'tan', { prop: null, hand: true });
  // Mr Tan's box of Deepavali sweets
  { const b = G(tan.hand); tr(b, 0, -26);
    E('rect', { x: -34, y: -24, width: 68, height: 48, rx: 6, fill: '#C62828', stroke: SC_INK, 'stroke-width': 3 }, b);
    E('path', { d: 'M0,-24 L0,24 M-34,0 L34,0', stroke: GOLD, 'stroke-width': 6 }, b);
    E('path', { d: 'M0,-24 Q-16,-40 -10,-26 M0,-24 Q16,-40 10,-26', fill: 'none', stroke: GOLD, 'stroke-width': 4 }, b); }
  const handy = cast(Ltoon, 'handy', { s: 0.7 });
  const ax = cast(Ltoon, 'x', { s: 0.5 });
  const badge0 = M(ax.badge, 0, 0, 'x = 0', { size: 34, anchor: 'middle' }); tr(badge0, 0, 2 + (badge0.a - badge0.d) / 2 - 6);
  const lt = { handy: xpLowerThird(Lhud, 'handy'), tan: xpLowerThird(Lhud, 'tan') };
  const ltOn = (t, who, t0) => lt[who].set(win(t, t0, t0 + 3.1, 0.3));
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cuts */
  const cB = at('game') - 0.06;
  const FAMX = 1025, FAMY = 556, HX = 752, HY = 556 - 124 * 0.7;

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const sA = on(t, -1, cB), sB = 1 - sA;
    op(doorShot, sA); op(door.front, sA); op(door.top, sA);
    op(flatShot, sB); op(flat.front, sB); op(flat.top, sB);
    for (const k in lt) lt[k].set(0);
    [c4pm, cFam, cRule1, cRule2].forEach(c => c.set(0));
    op(card, 0); [c1, c2, c3, c4, c5].forEach(g => op(g, 0));
    op(fam, 0); op(handy, 0); op(ax, 0); op(rope, 0);
    bub1.set(0); bub2.set(0); cCrick.set(0);
    const show = { mum: 0, kav: 0, boy: 0, dad: 0, tan: 0 };

    /* ---------------- A: the door ---------------- */
    if (sA) {
      door.upd(t);
      show.mum = show.kav = show.boy = 1;
      tr(mum, 125, 462, 0.92); tr(kav, 300, 462, 0.94); tr(boy, 470, 474, 0.96);
      let mm = 'happy', ml = 1, km = 'neutral', kl = 1, bm = 'happy', bl = 1, blift = 0;
      pc(c4pm, t, mid('four', 0.05), at('handy'));
      // the family: walks in along the corridor on "four"; a new family (3x − 5) arrives on "neg"; they go in on "dad"
      const negFam = t >= at('neg') - 0.05;
      let fx = FAMX;
      if (!negFam) fx = lerp(FAMX + 420, FAMX, P(t, mid('four', 0.15), 1.1, easeOut));
      else if (t < at('dad')) fx = lerp(FAMX + 420, FAMX, P(t, at('neg') - 0.05, 0.55, easeOut));
      else fx = lerp(FAMX, FAMX + 460, P(t, at('dad') - 0.05, 0.5, easeIn));
      if (!negFam && t >= at('neg') - 0.4) fx = lerp(FAMX, FAMX + 460, P(t, at('neg') - 0.4, 0.35, easeIn));
      const famOn = t < at('dad') + 0.5;
      op(fam, famOn ? 1 : 0);
      const walk = Math.abs(fx - FAMX) > 2 ? Math.abs(Math.sin(t * 9)) * 10 : 0;
      tr(fam, fx, FAMY - walk);
      op(g1.labs[0], negFam ? 0 : 1); op(g1.labs[1], negFam ? 1 : 0);
      op(g2.labs[0], negFam ? 0 : 1); op(g2.labs[1], negFam ? 1 : 0);
      op(sPlus, negFam ? 0 : 1); op(sMinus, negFam ? 1 : 0);
      // guest moods and handshake hops
      let m1 = 'happy', m2 = 'happy', h1 = 0, h2 = 0;
      if (!negFam) {
        if (t >= at('boy')) { h1 = Math.sin(clamp((t - mid('boy', 0.45)) / 0.4) * Math.PI) * 18; m2 = t > mid('boy', 0.5) ? 'sad' : 'neutral'; }
        if (t >= at('missed')) { m2 = t > mid('missed', 0.45) ? 'happy' : 'sad'; h2 = Math.sin(clamp((t - mid('missed', 0.45)) / 0.4) * Math.PI) * 22; }
      } else {
        m1 = t > mid('neg', 0.3) ? 'shock' : 'neutral'; m2 = t > mid('neg', 0.55) ? 'shock' : 'neutral';
        h1 = Math.sin(clamp((t - mid('neg', 0.3)) / 0.4) * Math.PI) * 18; h2 = Math.sin(clamp((t - mid('neg', 0.55)) / 0.4) * Math.PI) * 18;
      }
      tr(g1, -60, -59 - h1); tr(g2, 60, -59 - h2);
      const famLook = t < at('handy') ? -0.8 : -1;
      g1.set({ t, mood: m1, look: famLook }); g2.set({ t, mood: m2, look: famLook });
      if (!negFam && t < at('handy')) pc(cFam, t, mid('four', 0.5), at('rule')), tr(cFam, FAMX, 380);

      // rule
      if (t >= at('rule') && t < at('handy')) {
        ml = 0.7; kl = -0.6; bl = -0.6;
        pc(cRule1, t, mid('rule', 0.05)); tr(cRule1, 877, 200);
        pc(cRule2, t, mid('rule', 0.5)); tr(cRule2, 877, 280);
      }

      // Handy at his post from "handy"
      const hOn = t >= at('handy') - 0.2;
      if (hOn) {
        op(handy, 1);
        const up = P(t, at('handy') - 0.2, 0.4, pop);
        let hm = 'happy', hl = 0.6, shake = 0.5, val = '3', neg = 0;
        if (t >= at('boy') && t < at('missed')) { hm = t > mid('boy', 0.6) ? 'annoyed' : 'neutral'; hl = -1; shake = 0; }
        if (t >= at('missed') && t < at('area')) { hm = t < mid('missed', 0.25) ? 'shock' : 'happy'; hl = 1; shake = t > mid('missed', 0.3) ? 1 : 0; }
        if (t >= at('area') && t < at('neg')) { hm = 'happy'; hl = -1; shake = 0; }
        if (t >= at('neg') - 0.3 && t < at('tan')) { val = '−2'; neg = 1; hm = t < at('dad') ? 'annoyed' : 'neutral'; hl = t < at('dad') ? 1 : -0.8; shake = t >= at('neg') && t < at('dad') ? 0.7 : 0; }
        if (t >= at('blown')) { hm = t > mid('blown', 0.56) ? 'shock' : 'neutral'; hl = 1; }
        if (t >= at('tan') - 0.3) { val = 'x'; neg = 0; hm = 'happy'; hl = -1; shake = t < mid('tan', 0.35) ? 1 : 0.2; }
        tr(handy, HX, lerp(HY + 220, HY, up), 0.7);
        handy.set({ t, talk: scTalk(S, t, 'handy'), mood: hm, look: hl, shake: shake * AMP, val, neg });
        if (t < at('boy')) ltOn(t, 'handy', at('handy') + 0.1);
      }

      // the card
      const cardOn = t >= at('handy') + 0.1;
      if (cardOn) {
        op(card, P(t, at('handy') + 0.1, 0.25, linear));
        if (t < at('area')) {
          op(c1, 1);
          const inBoy = t >= at('boy'), inMiss = t >= at('missed');
          op(lab1, inBoy ? 1 - fin(t, at('boy') - 0.05, 0.2) : fin(t, mid('handy', 0.45)));
          arX.set(inBoy ? P(t, mid('boy', 0.4), 0.45, easeOut) : 0);
          op(dX, inBoy ? fin(t, mid('boy', 0.4) + 0.45, 0.15) : 0);
          op(rBoy, inBoy ? (inMiss ? 1 - fin(t, mid('missed', 0.5), 0.25) : fin(t, mid('boy', 0.62))) : 0);
          op(qBoy, inBoy && !inMiss ? fin(t, mid('boy', 0.75)) : 0);
          op(sBoy, inMiss ? 1 - fin(t, mid('missed', 0.5), 0.25) : 0); mkDraw(sBoy, P(t, mid('missed', 0.05), 0.3, linear));
          ar4.set(inMiss ? P(t, mid('missed', 0.25), 0.5, easeOut) : 0);
          op(d4, inMiss ? fin(t, mid('missed', 0.25) + 0.5, 0.15) : 0);
          op(n12, inMiss ? fin(t, mid('missed', 0.3)) : 0);
          op(rOk, inMiss ? fin(t, mid('missed', 0.55)) : 0);
          op(tOk, inMiss ? fin(t, mid('missed', 0.85)) : 0);
        } else if (t < at('neg')) {
          op(c2, 1);
          op(a4x, fin(t, mid('area', 0.3))); op(a12, fin(t, mid('area', 0.45)));
          op(aEq, fin(t, mid('area', 0.55)));
          pc(cIdent, t, mid('area', 0.82));
        } else if (t < at('dad')) {
          op(c3, 1);
          op(lhsN, 1);
          arN1.set(P(t, mid('neg', 0.3), 0.45, easeOut)); op(dN1, fin(t, mid('neg', 0.3) + 0.45, 0.15));
          op(pN1, fin(t, mid('neg', 0.35)));
          arN2.set(P(t, mid('neg', 0.52), 0.5, easeOut)); op(dN2, fin(t, mid('neg', 0.52) + 0.5, 0.15));
          op(pN2, fin(t, mid('neg', 0.57)));
          op(rN, fin(t, mid('neg', 0.74)));
          op(nFlip, fin(t, mid('neg', 0.12)));
        } else if (t < at('tan')) {
          op(c4, 1);
          const inBlown = t >= at('blown'), fixAt = mid('blown', 0.72), blownAt = mid('blown', 0.56);
          op(rDad, t < fixAt ? fin(t, mid('dad', 0.45)) : 1 - fin(t, fixAt, 0.25));
          op(qDad, t < fixAt ? fin(t, mid('dad', 0.6)) : 0);
          op(rFix, t >= fixAt ? fin(t, fixAt + 0.1) : 0); op(tFix, t >= fixAt ? fin(t, fixAt + 0.5) : 0);
          pc(cSame, t, mid('dad', 0.72), at('blown'));
          const rowsOff = t >= fixAt ? 1 - fin(t, fixAt - 0.05, 0.2) : 1;
          op(bTag, inBlown ? fin(t, mid('blown', 0.05)) * rowsOff : 0);
          op(bL, inBlown ? fin(t, mid('blown', 0.18)) * rowsOff : 0);
          op(bR, inBlown ? fin(t, mid('blown', 0.32)) * rowsOff : 0);
          op(bNe, inBlown ? fin(t, mid('blown', 0.46)) * rowsOff : 0);
          op(bFix, t >= fixAt ? fin(t, fixAt + 0.05) : 0);
          stampNo.set(inBlown ? P(t, blownAt, 0.35, linear) : 0); tr(stampNo, 1010, 362, 0.42);
        } else {
          op(c5, 1);
          op(tEq, fin(t, mid('tan', 0.62)));
          pc(cLet, t, mid('tan', 0.45));
        }
      }

      // humans' reactions, line by line
      if (t >= at('handy') && t < at('boy')) { ml = 1; kl = 1; bl = 1; km = 'happy'; }
      if (t >= at('boy') && t < at('missed')) { bm = 'happy'; bl = 1; blift = t > mid('boy', 0.25) ? 1 : 0; ml = 0.6; kl = 0.6; km = t > mid('boy', 0.65) ? 'annoyed' : 'neutral'; mm = 'neutral'; }
      if (t >= at('missed') && t < at('area')) { bm = t < mid('missed', 0.4) ? 'shock' : 'happy'; mm = 'happy'; km = 'happy'; }
      if (t >= at('area') && t < at('neg')) { km = 'happy'; kl = 1; ml = 0.4; bl = -0.6; mm = 'happy'; }
      if (t >= at('neg') && t < at('dad')) { km = 'neutral'; mm = 'neutral'; bm = t > mid('neg', 0.4) ? 'shock' : 'happy'; }
      if (t >= at('dad') && t < at('tan')) {
        kl = 1; ml = 1; bl = 1;
        km = t < at('blown') ? (t > mid('dad', 0.6) ? 'annoyed' : 'neutral') : (t > mid('blown', 0.56) ? 'smug' : 'annoyed');
        mm = t < at('blown') ? 'deadpan' : 'neutral'; bm = 'happy';
      }
      if (t >= at('tan')) { ml = 1; kl = 1; bl = 1; mm = 'happy'; km = 'happy'; bm = 'happy'; }
      mum.set({ t, talk: scTalk(S, t, 'mum'), mood: mm, look: ml });
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: bm, look: bl, lift: blift });

      // Dad pops into the doorway for his claim, ducks out when Mr Tan arrives
      if (t >= at('dad') - 0.3 && t < at('tan') + 0.1) {
        show.dad = 1;
        const up = P(t, at('dad') - 0.3, 0.35, pop), down = P(t, at('tan') - 0.35, 0.35, easeIn);
        tr(dad, 590, lerp(720, 462, up) + 280 * down, 0.9);
        const dm = t < at('blown') ? 'smug' : t > mid('blown', 0.56) ? (t > mid('blown', 0.75) ? 'sad' : 'shock') : 'neutral';
        dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: t < at('blown') ? -0.6 : 1 });
      }
      // Agent X drops in on a rope for "blown", and zips back up before "tan"
      if (t >= at('blown') - 0.15 && t < at('tan') + 0.1) {
        op(ax, 1); op(rope, 1);
        const dn = P(t, at('blown') - 0.15, 0.45, pop), upP = P(t, at('tan') - 0.45, 0.4, easeIn);
        const XY = 556 - 135 * 0.5, y = lerp(-140, XY, dn) - (XY + 160) * upP;
        tr(ax, FAMX, y, 0.5);
        attr(rope, 'd', `M${FAMX},60 L${FAMX},${(y - 150 * 0.5).toFixed(1)}`);
        const blownAt = mid('blown', 0.56);
        ax.set({ t, talk: scTalk(S, t, 'x'), mood: t > blownAt ? 'smug' : 'deadpan', look: -0.7, arms: 1, badge: 1,
          shades: 1 - P(t, blownAt - 0.4, 0.5, easeOut), still: dn < 1 });
      }
      // Mr Tan pops up at the door with sweets
      if (t >= at('tan') - 0.2) {
        show.tan = 1;
        const up = P(t, at('tan') - 0.2, 0.4, pop);
        tr(tan, 600, lerp(720, 462, up), 0.9);
        tan.set({ t, talk: scTalk(S, t, 'tan'), mood: 'happy', look: 0.5, lift: t < mid('tan', 0.42) ? 1 : 0 });
        ltOn(t, 'tan', at('tan') + 0.2);
      }
    }

    /* ---------------- B: the living room ---------------- */
    if (sB) {
      flat.upd(t, 1); flat.clock.set(4, 5);
      show.tan = show.kav = show.dad = show.boy = 1;
      tr(tan, 690, 440, 0.8); tr(kav, 835, 440, 0.8); tr(dad, 975, 440, 0.8); tr(boy, 1105, 452, 0.82);
      wk.set(0);
      wk.show(0, fin(t, mid('game', 0.3), 0.4));
      const inAns = t >= at('answer');
      wk.show(1, inAns ? fin(t, mid('answer', 0.08), 0.4) : 0);
      wk.show(2, inAns ? fin(t, mid('answer', 0.5), 0.4) : 0);
      mkDraw(ring8, inAns ? P(t, mid('answer', 0.7), 0.4, linear) : 0);
      ar8.set(inAns ? P(t, mid('answer', 0.78), 0.3, linear) : 0);
      op(note8, inAns ? fin(t, mid('answer', 0.85)) : 0);
      const inPun = t >= at('pun'), quiet = t > mid('pun', 0.62);
      if (inPun) {
        pc(bub1, t, at('pun'), mid('pun', 0.55)); tr(bub1, 790, 190);
        pc(bub2, t, mid('pun', 0.55)); tr(bub2, 790, 190);
        pc(cCrick, t, end('pun') + 0.2); tr(cCrick, 1060, 330);
      }
      const ded = inPun && quiet;
      tan.set({ t, talk: scTalk(S, t, 'tan'), mood: 'happy', look: inAns && !inPun ? 0.8 : 0.4 });
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: ded ? 'deadpan' : inAns ? 'happy' : 'neutral', look: -1 });
      dad.set({ t, mood: ded ? 'deadpan' : 'neutral', look: -1 });
      boy.set({ t, mood: ded ? 'deadpan' : 'happy', look: -1 });
      // Handy hops onto the table in the silence and shakes Mr Tan's hand anyway
      if (t >= end('pun') - 0.1) {
        op(handy, 1);
        const hp = P(t, end('pun') - 0.1, 0.45, pop);
        tr(handy, lerp(1260, 640, P(t, end('pun') - 0.1, 0.45, easeOut)), 530 - 124 * 0.5 - 30 * Math.sin(clamp(hp) * Math.PI), 0.5);
        handy.set({ t, mood: 'happy', look: -1, shake: AMP, val: 'x', neg: 0 });
        tan.set({ t, mood: 'happy', look: 0.6, lift: 1 });
      }
    }

    op(mum, show.mum); op(kav, show.kav); op(boy, show.boy); op(dad, show.dad); op(tan, show.tan);
  };
});
