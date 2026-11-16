/* Scene 3: Victoria gets iced (multiplying fractions).
   Shots (hard sitcom cuts):
   A  2 p.m., the party table at the void deck: Priya, Kavya, Dad (cake knife), Mum, Ah Boy behind the table, Victoria
      the sponge on her plate in the middle -> Victoria (lower third): "equal pieces", eyes on Dad's knife.
   B  TOP VIEW of the cake on the tablecloth (Victoria watches from the corner): chocolate sweeps over 3/4 of the width,
      sprinkles over 2/3 of the length -> the overlap -> 4 x 3 = 12 pieces, 6 with both -> 3/4 x 2/3 = 6/12 = 1/2.
   A  Victoria swoons: half of her has both toppings.
   C  Ah Boy and Mum with 20 sweets in four groups of 5: "times makes bigger?" -> 'of' means x: 20 x 3/4 = 15, three
      groups lift -> Ah Boy holds up a REFUND: MATHS slip.
   D  Speed round: 5/6 x 9/10 -> Vinny cancels 5 with 10 and 9 with 6 -> 3/4, SIMPLEST FORM.
   E  The picnic mat 2 1/2 m by 3 1/3 m (grid method): Dad's 6 + 1/6 (famous last words #3) -> NOT ON MY BAR!, the two
      missing strips 2/3 and 3/2 -> Kavya: improper first, 5/2 x 10/3 = 50/6 = 8 1/3 m^2, check by the four parts.
   F  Mum: three tables of 2 3/4 m: 3 x 2 + 3 x 3/4 = 6 + 2 1/4 = 8 1/4 m. Hold. */
scene('icing', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;
  const talk = (t, who) => scTalk(S, t, who);

  /* ---------- local helpers ---------- */
  const GOLD = '#FFE45C', PINK = '#FF8FC8', RED = '#C62828', GREEN = '#1E9E5A', BLUE = '#2E6FD8', BROWN = '#5A2E14', INK = MK.ink;
  const chipAt = (parent, text, o) => { o = o || {}; return mkChip(parent, text, Object.assign({ size: 30, col: C.ink }, o)); };
  const fade = (el, t, t0, dur) => { const p = P(t, t0, dur || 0.3, linear); op(el, p); return p; };
  const popSet = (el, t, t0, x, y) => { el.set(P(t, t0, 0.35, linear)); if (x !== undefined) tr(el, x, y); };
  const lookAt = (x, sx) => clamp((sx - x) / 260, -1, 1);
  const outline = (el, col, w) => { el.setAttribute('stroke', col); el.setAttribute('stroke-width', w); el.setAttribute('paint-order', 'stroke'); el.setAttribute('stroke-linejoin', 'round'); return el; };
  // a dark rounded pill (a strip across the top of a wide shot) with mkText content
  const pill = (parent, text, o) => {
    o = o || {};
    const g = G(parent), m = mkText(g, 0, 0, text, { size: o.size || 34, anchor: 'middle', fill: C.ink, boldFill: o.bold || GOLD });
    const w = m.w + 60, h = Math.max(64, m.h + 26);
    const r = E('rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: Math.min(32, h / 2), fill: 'rgba(10,27,39,0.9)', stroke: o.col || GOLD, 'stroke-width': 3 }, g);
    g.insertBefore(r, m); tr(m, 0, -m.top - m.h / 2);
    return g;
  };
  // a white paper card on the overhead shots
  const paper = (parent, x, y, w, h) => { const g = G(parent); E('rect', { x: x + 6, y: y + 8, width: w, height: h, rx: 18, fill: 'rgba(90,20,50,0.18)' }, g); E('rect', { x, y, width: w, height: h, rx: 18, fill: MK.paper, stroke: '#B8336A', 'stroke-width': 4 }, g); return g; };
  /* big hand-set "a/b × c/d" whose numbers can be struck through and replaced (cancelling) */
  function cancelProd(parent, x, y, f1, f2, o) {
    const s = o.size || 84, g = G(parent), col = o.fill || INK, parts = {};
    let cx = x;
    const frac = (n, d, k) => {
      const w = Math.max(textWidth(String(n), s, FD, 700), textWidth(String(d), s, FD, 700)) + s * 0.34, c = cx + w / 2;
      const ny = y - s * 0.2, dy = y + s * 0.92;
      T(g, c, ny, String(n), { size: s, weight: 700, anchor: 'middle', fill: col });
      E('rect', { x: cx, y: y - s * 0.05, width: w, height: s * 0.1, rx: s * 0.05, fill: col }, g);
      T(g, c, dy, String(d), { size: s, weight: 700, anchor: 'middle', fill: col });
      parts['n' + k] = { c, y: ny, w: textWidth(String(n), s, FD, 700), top: true };
      parts['d' + k] = { c, y: dy, w: textWidth(String(d), s, FD, 700), top: false };
      cx += w;
    };
    frac(f1[0], f1[1], 1);
    cx += s * 0.22; T(g, cx + s * 0.3, y + s * 0.26, '×', { size: s * 0.9, weight: 700, anchor: 'middle', fill: col }); cx += s * 0.6 + s * 0.22;
    frac(f2[0], f2[1], 2);
    g.right = cx;
    // links (dashed diagonals between a cancelling pair), strikes and replacement numbers
    const links = (o.links || []).map(([a, b, lc]) => {
      const A = parts[a], B = parts[b];
      const l = mkDash(E('path', { d: `M${A.c.toFixed(1)},${(A.y - s * 0.3).toFixed(1)} L${B.c.toFixed(1)},${(B.y - s * 0.3).toFixed(1)}`, stroke: lc, 'stroke-width': 4, opacity: 0.45, fill: 'none', 'stroke-linecap': 'round' }, g));
      return l;
    });
    const strikes = {}, reps = {};
    for (const k in o.reps) {
      const A = parts[k], lc = o.cols[k], hw = A.w / 2 + 8;
      strikes[k] = mkDash(E('path', { d: `M${(A.c - hw).toFixed(1)},${(A.y + 4).toFixed(1)} L${(A.c + hw).toFixed(1)},${(A.y - s * 0.66).toFixed(1)}`, stroke: lc, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' }, g));
      reps[k] = T(g, A.c + A.w / 2 + 6, A.top ? A.y - s * 0.62 : A.y + s * 0.5, o.reps[k], { size: Math.round(s * 0.52), weight: 800, anchor: 'start', fill: lc });
    }
    g.link = (i, p) => { op(links[i], p > 0 ? 1 : 0); mkDraw(links[i], p); };
    g.cancel = (k, p) => { op(strikes[k], p > 0 ? 1 : 0); mkDraw(strikes[k], p); op(reps[k], clamp((p - 0.6) / 0.4)); };
    return g;
  }

  /* ---------- layers ---------- */
  const Lbg = G(root), Lins = G(root), Lcast = G(root), Lfront = G(root), Ltop = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= A / C: the void deck, party table ================= */
  const voidShot = G(Lbg);
  const vd = fcVoid(voidShot);
  Lfront.appendChild(vd.front);
  const c2pm = chipAt(Lfg, '**2 p.m.**', { col: GOLD, size: 32 });
  const cEqual = chipAt(Lfg, 'cut me into **equal pieces**', { col: PINK, size: 30 });
  const pSeen = pill(Lfg, '{{1/2}} of me: chocolate **and** sprinkles', { size: 32, col: PINK, bold: PINK });

  // C: 20 sweets in four groups of 5 on the table
  const SW = ['#FF5FA2', '#FFC247', '#4CC9F0', '#56D69B', '#B48CFF'];
  const sweets = [];
  const sweetsG = G(Ltop);
  for (let i = 0; i < 20; i++) {
    const g = G(sweetsG), col = SW[i % 5];
    E('path', { d: 'M-25,-10 L-14,0 L-25,10 Z M25,-10 L14,0 L25,10 Z', fill: col, stroke: SC_INK, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, g);
    E('ellipse', { rx: 16, ry: 12, fill: col, stroke: SC_INK, 'stroke-width': 3 }, g);
    sweets.push({ g, x: 125 + Math.floor(i / 5) * 262 + (i % 5) * 46 });
  }
  const glowG = G(sweetsG);   // a gold ring round each of the three groups that make 3/4
  [0, 1, 2].forEach(k => E('rect', { x: 125 + k * 262 - 34, y: 548 - 26, width: 4 * 46 + 68, height: 52, rx: 26, fill: 'none', stroke: GOLD, 'stroke-width': 6 }, glowG));
  const bubBig = mkSpeechBubble(Lfg, '{{3/4}} of **20** > **20**!', { size: 36, tail: 'left' });
  const cBigger = chipAt(Lfg, '**×** makes things **bigger**?', { col: '#FF8A8A', size: 32 });
  const pOf = pill(Lfg, "'**of**' means **×**", { size: 34 });
  const pFifteen = pill(Lfg, '{{20 × 3/4 = 15}}', { size: 46, col: '#9FE0B5' });
  const cSmaller = chipAt(Lfg, '× a **proper fraction** ⇒ **smaller**', { col: '#9FE0B5', size: 30 });
  const c15 = chipAt(Lfg, '**15** of the **20**', { col: GOLD, size: 30 });

  /* ================= overhead (top-view) shots: B, D, E, F ================= */
  const overShot = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#F59CC4' }, overShot);
  { let d = ''; for (let y = 24, r = 0; y < 760; y += 52, r++) for (let x = r % 2 ? 26 : 0; x < 1230; x += 52) d += `M${x - 5},${y} a5,5 0 1 0 10,0 a5,5 0 1 0 -10,0 `;
    E('path', { d, fill: '#FFFFFF', opacity: 0.32 }, overShot); }
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: glow('#FFFFFF'), opacity: 0.25 }, overShot);

  /* --- B: the area model on the cake --- */
  const shotB = G(Lins);
  const slab = fcSlab(shotB, { cols: 4, rows: 3, w: 480, h: 300 }); tr(slab, 470, 370);
  const SX = 230, SY = 220, CW = 120, RH = 100;
  const wBrace = mkBrace(shotB, SX, SY - 26, SX + 3 * CW, SY - 26, { text: '{{3/4}} of the width', col: BROWN, size: 30 });
  const lBrace = mkBrace(shotB, SX - 26, SY + 2 * RH, SX - 26, SY, { text: '{{2/3}} of\nthe length', col: BROWN, size: 28 });
  const pieceNums = [];
  for (let r = 0; r < 2; r++) for (let c = 0; c < 3; c++) {
    const w = T(shotB, SX + c * CW + CW / 2, SY + r * RH + RH / 2 + 16, String(r * 3 + c + 1), { size: 46, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
    outline(w, '#2A1A22', 8); pieceNums.push(w);
  }
  const cardB = paper(shotB, 760, 150, 410, 390);
  const iceT = G(cardB);
  const iceL1 = mkText(iceT, 965, 236, 'chocolate:\n{{3/4}} of the width', { size: 32, anchor: 'middle', fill: BROWN });
  const iceL2 = mkText(iceT, 965, 372, 'sprinkles:\n{{2/3}} of the length', { size: 32, anchor: 'middle', fill: '#B8336A' });
  const bothQ = mkText(iceT, 965, 500, 'both = **?**', { size: 34, anchor: 'middle', fill: INK, boldFill: RED });
  const gridT = G(cardB);
  mkText(gridT, 965, 226, '**4** columns × **3** rows', { size: 34, anchor: 'middle', fill: INK });
  mkText(gridT, 965, 290, '= **12** equal pieces', { size: 34, anchor: 'middle', fill: INK });
  const gridBoth = mkText(gridT, 965, 400, 'both toppings: **6**', { size: 36, anchor: 'middle', fill: '#B8336A' });
  const gridBox = E('rect', { x: 805, y: 352, width: 320, height: 70, rx: 14, fill: 'rgba(255,228,92,0.45)' }, gridT);
  gridT.insertBefore(gridBox, gridT.firstChild);
  const timesT = G(cardB);
  const wTimes = mkWorking(timesT, 900, 190, ['3/4 × 2/3 = (3 × 2)/(4 × 3)', '= 6/12', '= 1/2'], { size: 46, fill: INK, gap: 18 });
  const timesNote = mkText(timesT, 965, 482, 'multiply the **tops**,\nmultiply the **bottoms**', { size: 28, anchor: 'middle', fill: '#5A4A52', boldFill: '#B8336A' });

  /* --- D: speed round, cancel first --- */
  const shotD = G(Lins);
  paper(shotD, 240, 140, 920, 410);
  const dHead1 = T(shotD, 700, 196, 'SPEED ROUND!', { size: 42, weight: 800, anchor: 'middle', fill: '#B8336A', ls: 2 });
  const dHead2 = mkText(shotD, 700, 196, '**Cancel first**: any top with any bottom', { size: 34, anchor: 'middle', fill: INK, boldFill: '#B8336A' });
  const prodD = cancelProd(shotD, 300, 352, [5, 6], [9, 10], { size: 84, reps: { n1: '1', d2: '2', n2: '3', d1: '2' },
    cols: { n1: RED, d2: RED, n2: BLUE, d1: BLUE }, links: [['n1', 'd2', RED], ['n2', 'd1', BLUE]] });
  const dRes = mkMath(shotD, prodD.right + 28, 372, '= (1 × 3)/(2 × 2) = 3/4', { size: 64, fill: INK });
  const dNote = mkText(shotD, 520, 528, 'without cancelling: {{45/60 = 3/4}}', { size: 28, anchor: 'middle', fill: '#5A4A52' });
  const stampSF = fcStamp(shotD, true);

  /* --- E: the picnic mat (grid method) --- */
  const shotE = G(Lins);
  const MX0 = 150, MX1 = 450, MX2 = 600, MY0 = 210, MY1 = 410, MY2 = 530;
  const mat = G(shotE);
  E('rect', { x: MX0 + 6, y: MY0 + 8, width: MX2 - MX0, height: MY2 - MY0, rx: 6, fill: 'rgba(90,20,50,0.2)' }, mat);
  E('rect', { x: MX0, y: MY0, width: MX2 - MX0, height: MY2 - MY0, fill: '#FFFFFF' }, mat);
  { let dv = '', dh = ''; for (let x = MX0; x < MX2; x += 50) dv += `M${x},${MY0} h25 V${MY2} h-25 Z `; for (let y = MY0; y < MY2; y += 40) dh += `M${MX0},${y} v20 H${MX2} v-20 Z `;
    E('path', { d: dv, fill: '#E8424F', opacity: 0.28 }, mat); E('path', { d: dh, fill: '#E8424F', opacity: 0.28 }, mat); }
  const cellA = E('rect', { x: MX0, y: MY0, width: MX1 - MX0, height: MY1 - MY0, fill: '#56D69B', opacity: 0.75 }, mat);
  const cellB = E('rect', { x: MX1, y: MY0, width: MX2 - MX1, height: MY1 - MY0, fill: '#6EA8FF', opacity: 0.8 }, mat);
  const cellC = E('rect', { x: MX0, y: MY1, width: MX1 - MX0, height: MY2 - MY1, fill: '#FFB347', opacity: 0.85 }, mat);
  const cellD = E('rect', { x: MX1, y: MY1, width: MX2 - MX1, height: MY2 - MY1, fill: '#FF5FA2', opacity: 0.8 }, mat);
  E('path', { d: `M${MX0 + 100},${MY0} V${MY1} M${MX0 + 200},${MY0} V${MY1} M${MX0},${MY0 + 100} H${MX1}`, stroke: INK, 'stroke-width': 3, 'stroke-dasharray': '10 7', opacity: 0.7 }, mat);
  E('path', { d: `M${MX1},${MY0} V${MY2} M${MX0},${MY1} H${MX2}`, stroke: INK, 'stroke-width': 4 }, mat);
  E('rect', { x: MX0, y: MY0, width: MX2 - MX0, height: MY2 - MY0, fill: 'none', stroke: INK, 'stroke-width': 5 }, mat);
  const labA = mkMath(shotE, (MX0 + MX1) / 2, MY0 + 112, '2 × 3 = 6', { size: 40, anchor: 'middle', fill: INK, halo: '#FFFFFF' });
  const labB = G(shotE);
  mkMath(labB, (MX1 + MX2) / 2, MY0 + 86, '2 × 1/3', { size: 32, anchor: 'middle', fill: INK, halo: '#FFFFFF' });
  mkMath(labB, (MX1 + MX2) / 2, MY0 + 158, '= 2/3', { size: 32, anchor: 'middle', fill: INK, halo: '#FFFFFF' });
  const labC = mkMath(shotE, (MX0 + MX1) / 2, MY1 + 72, '3 × 1/2 = 3/2', { size: 32, anchor: 'middle', fill: INK, halo: '#FFFFFF' });
  const labD = mkMath(shotE, (MX1 + MX2) / 2, MY1 + 74, '1/6', { size: 36, anchor: 'middle', fill: INK, halo: '#FFFFFF' });
  const qB = T(shotE, (MX1 + MX2) / 2, MY0 + 124, '?', { size: 70, weight: 800, anchor: 'middle', fill: RED });
  const qC = T(shotE, (MX0 + MX1) / 2, MY1 + 84, '?', { size: 70, weight: 800, anchor: 'middle', fill: RED });
  const dimW = mkBrace(shotE, MX0, MY0 - 20, MX2, MY0 - 20, { text: '{{3 1/3}} m', col: INK, size: 32 });
  const dimH = mkBrace(shotE, MX2 + 20, MY0, MX2 + 20, MY2, { text: '{{2 1/2}} m', col: INK, size: 32 });
  const splitL = G(shotE);
  mkMath(splitL, (MX0 + MX1) / 2, MY2 + 46, '3', { size: 34, anchor: 'middle', fill: INK });
  mkMath(splitL, (MX1 + MX2) / 2, MY2 + 50, '1/3', { size: 30, anchor: 'middle', fill: INK });
  mkMath(splitL, MX0 - 22, (MY0 + MY1) / 2 + 12, '2', { size: 34, anchor: 'end', fill: INK });
  mkMath(splitL, MX0 - 22, (MY1 + MY2) / 2 + 10, '1/2', { size: 30, anchor: 'end', fill: INK });
  const cardE = paper(shotE, 770, 150, 400, 390);
  const dadW = G(cardE);
  T(dadW, 970, 200, "Dad's working", { size: 30, weight: 700, anchor: 'middle', fill: RED });
  const wDad = mkWorking(dadW, 960, 226, ['2 × 3 = 6', '1/2 × 1/3 = 1/6', '6 + 1/6 = 6 1/6 "m²"'], { size: 38, fill: RED, gap: 22 });
  const dadX = cross(dadW, 26); tr(dadX, 1120, 470);
  const kavW = G(cardE);
  T(kavW, 970, 200, '**Improper first**', { size: 32, weight: 700, anchor: 'middle', fill: GREEN });
  const wKav = mkWorking(kavW, 1000, 226, ['2 1/2 × 3 1/3 = 5/2 × 10/3', '= 50/6', '= 8 1/3 "m²"'], { size: 34, fill: INK, gap: 20 });
  const kavChk = mkText(kavW, 970, 468, 'check:\n{{6 + 2/3 + 3/2 + 1/6 = 8 1/3}} ✓', { size: 27, anchor: 'middle', fill: GREEN, lh: 2 });
  const cFlw = chipAt(Lfg, 'famous last words **#3**', { col: '#FF8A8A', size: 28 });
  const stampNo = fcStamp(Lfg, false);

  /* --- F: three tables of 2 3/4 m --- */
  const shotF = G(Lins);
  const bmF = mkBarModel(shotF, { unit: 110, h: 60, gap: 26, size: 28, ink: INK,
    rows: [0, 1, 2].map(i => ({ name: 'table ' + (i + 1), units: 2.75, col: '#9FE0B5', labels: ['1 m', '1 m', '{{3/4}}'] })),
    braces: [{ row: 0, from: 0, to: 2, text: '{{2 3/4}} m' }], total: '{{8 1/4}} m' });
  tr(bmF, 290, 236);
  bmF.rowsG.forEach(rg => attr(rg.cells[2].firstChild, 'fill', '#FF9FCB'));
  const hlWhole = G(shotF), hlFrac = G(shotF);
  [0, 1, 2].forEach(i => { const y = 236 + i * 86; E('rect', { x: 290, y, width: 220, height: 60, fill: 'none', stroke: GOLD, 'stroke-width': 7 }, hlWhole); E('rect', { x: 510, y, width: 82.5, height: 60, fill: 'none', stroke: '#B8336A', 'stroke-width': 7 }, hlFrac); });
  const fQuarter = mkMath(shotF, 440, 560, '3 × 3/4 = 9/4 = 2 1/4', { size: 32, anchor: 'middle', fill: '#B8336A' });
  const cardF = paper(shotF, 760, 150, 410, 390);
  T(cardF, 965, 200, 'Integer × mixed', { size: 32, weight: 800, anchor: 'middle', fill: '#B8336A' });
  const wTab = mkWorking(cardF, 892, 232, ['3 × 2 3/4 = 3 × 2 + 3 × 3/4', '= 6 + 2 1/4', '= 8 1/4 "m"'], { size: 32, fill: INK, gap: 22 });

  /* ================= the cast ================= */
  const priya = cast(Lcast, 'priya');
  const kav = cast(Lcast, 'kavya');
  const dad = cast(Lcast, 'dad', { prop: null, hand: true });
  const mum = cast(Lcast, 'mum');
  const boy = cast(Lcast, 'boy', { hat: '#4CC9F0' });
  const vinny = cast(Lcast, 'vinny');
  const vic = cast(Ltop, 'vic');
  // Dad's cake knife
  const knife = G(dad.hand); tr(knife, -6, 4, 1.35, 22);
  E('rect', { x: -7, y: -30, width: 14, height: 44, rx: 5, fill: '#3A2A20', stroke: SC_INK, 'stroke-width': 3 }, knife);
  E('path', { d: 'M-9,-30 L-9,-150 Q8,-140 10,-30 Z', fill: '#DDE5EC', stroke: SC_INK, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, knife);
  // Ah Boy's refund slip
  const slip = G(boy.hand); tr(slip, -40, 10, 1, 16);
  E('path', { d: 'M-78,-210 L78,-210 L78,-20 L65,-8 L52,-20 L39,-8 L26,-20 L13,-8 L0,-20 L-13,-8 L-26,-20 L-39,-8 L-52,-20 L-65,-8 L-78,-20 Z', fill: '#FFFDF6', stroke: SC_INK, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, slip);
  T(slip, 0, -166, 'REFUND', { size: 36, weight: 800, anchor: 'middle', fill: RED });
  E('line', { x1: -60, y1: -146, x2: 60, y2: -146, stroke: '#9FB2C2', 'stroke-width': 3, 'stroke-dasharray': '6 5' }, slip);
  T(slip, -58, -104, 'MATHS', { size: 32, weight: 700, anchor: 'start', fill: INK });
  T(slip, 60, -60, '× 1', { size: 32, weight: 700, anchor: 'end', fill: INK });
  const lt = fcLowerThird(Lhud, 'vic');
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* ---------- shots ---------- */
  const cut = id => at(id) - 0.06;
  const SHOTS = [['A', -9], ['B', cut('icing')], ['A2', cut('seen')], ['C', cut('bigger')], ['D', cut('speed')], ['E', cut('mat')], ['F', cut('tables')]];
  const shotAt = t => { let s = 'A'; for (const [k, t0] of SHOTS) if (t >= t0) s = k; return s; };
  // wide-shot places (bust y behind the party table)
  const WX = { priya: 100, kav: 262, dad: 425, vic: 640, mum: 860, boy: 1050 }, WY = 452, WS = 0.9;
  const SLOT_L = [125, 640], SLOT_R = [1078, 646], SLOT_S = 0.72;

  return t => {
    const sh = shotAt(t), who = scWho(S, t);
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const wide = sh === 'A' || sh === 'A2' || sh === 'C';
    op(voidShot, wide ? 1 : 0); op(vd.front, wide ? 1 : 0); op(overShot, wide ? 0 : 1);
    op(shotB, sh === 'B' ? 1 : 0); op(shotD, sh === 'D' ? 1 : 0); op(shotE, sh === 'E' ? 1 : 0); op(shotF, sh === 'F' ? 1 : 0);
    op(sweetsG, sh === 'C' ? 1 : 0);
    vd.upd(t * AMP);
    [c2pm, cEqual, bubBig, cBigger, cSmaller, c15, cFlw].forEach(c => c.set(0));
    [pSeen, pOf, pFifteen].forEach(p => op(p, 0));
    stampNo.set(0); lt.set(0);
    const shown = { priya: 0, kav: 0, dad: 0, mum: 0, boy: 0, vinny: 0, vic: 0 };
    op(knife, 0); op(slip, 0);
    const show = (key, c, x, y, s, st) => { shown[key] = 1; tr(c, x, y, s); c.set(Object.assign({ t }, st)); };
    const vicY = 560 - 110 * 0.85;

    /* ---------- A: the party table ---------- */
    if (sh === 'A' || sh === 'A2') {
      const first = sh === 'A';
      const spk = who === 'vic' ? WX.vic : who === 'mum' ? WX.mum : WX.vic;
      const knifeUp = first && t > mid('vic', 0.15);
      show('priya', priya, WX.priya, WY, WS, { talk: talk(t, 'priya'), mood: first ? 'smug' : 'deadpan', look: lookAt(WX.priya, spk) });
      show('kav', kav, WX.kav, WY, WS, { talk: talk(t, 'kavya'), mood: first ? 'neutral' : 'deadpan', look: lookAt(WX.kav, spk) });
      show('dad', dad, WX.dad, WY - 6, WS, { talk: talk(t, 'dad'), mood: knifeUp ? 'smug' : first ? 'happy' : 'smug', look: lookAt(WX.dad, spk), lift: knifeUp ? 1 : 0 });
      op(knife, knifeUp ? 1 : 0);
      show('mum', mum, WX.mum, WY - 6, WS, { talk: talk(t, 'mum'), mood: first ? 'happy' : 'happy', look: lookAt(WX.mum, spk) });
      show('boy', boy, WX.boy, WY + 10, WS, { talk: talk(t, 'boy'), mood: 'happy', look: lookAt(WX.boy, spk) });
      let vm = 'smug', sw = 0, vl = 0;
      if (first) {
        if (t >= at('vic')) { vm = t > mid('vic', 0.3) ? 'shock' : 'smug'; vl = t > mid('vic', 0.3) ? -0.9 : 0; }
      } else {
        const k = P(t, at('seen') + 0.2, 0.6, ease);
        sw = k; vm = 'happy'; vl = 0;
      }
      show('vic', vic, WX.vic, vicY, 0.85, { talk: talk(t, 'vic'), mood: vm, look: vl, swoon: sw, sweat: first && t > mid('vic', 0.3) ? 1 : 0 });
      if (first) {
        if (t < at('vic')) popSet(c2pm, t, at('two') + 0.1, 600, 250);
        else {
          lt.set(win(t, at('vic') + 0.1, at('vic') + 4.0, 0.3));
          popSet(cEqual, t, mid('vic', 0.62), 640, 250);
        }
      } else {
        op(pSeen, P(t, mid('seen', 0.25), 0.3, linear)); tr(pSeen, 600, 250);
      }
    }

    /* ---------- B: the area model ---------- */
    if (sh === 'B') {
      slab.choc(3 * P(t, mid('icing', 0.05), 1.0, ease));
      slab.spr(2 * P(t, mid('icing', 0.55), 1.0, ease));
      wBrace.set(P(t, mid('icing', 0.2), 0.3, linear));
      lBrace.set(P(t, mid('icing', 0.7), 0.3, linear));
      slab.hl(t < at('both') ? 0 : t < at('grid') ? P(t, mid('both', 0.25), 0.3, linear) * (0.75 + 0.25 * Math.sin(t * 7)) : 1);
      slab.grid(P(t, at('grid') + 0.1, 0.4, linear));
      pieceNums.forEach((n, i) => op(n, t >= at('grid') ? P(t, mid('grid', 0.6) + i * 0.12, 0.2, linear) : 0));
      op(iceT, t < at('grid') ? 1 : 0);
      op(iceL1, P(t, mid('icing', 0.15), 0.3, linear)); op(iceL2, P(t, mid('icing', 0.62), 0.3, linear)); op(bothQ, P(t, mid('both', 0.5), 0.3, linear));
      op(gridT, t >= at('grid') && t < at('times') ? 1 : 0);
      if (t >= at('grid') && t < at('times')) {
        op(gridT.childNodes[1], P(t, mid('grid', 0.05), 0.3, linear));
        op(gridT.childNodes[2], P(t, mid('grid', 0.3), 0.3, linear));
        op(gridBoth, P(t, mid('grid', 0.62), 0.3, linear)); op(gridBox, P(t, mid('grid', 0.66), 0.3, linear));
      }
      op(timesT, t >= at('times') ? 1 : 0);
      if (t >= at('times')) {
        wTimes.show(0, P(t, at('times') + 0.1, 0.4, linear));
        wTimes.show(1, P(t, mid('times', 0.3), 0.4, linear));
        wTimes.show(2, P(t, mid('times', 0.45), 0.4, linear));
        wTimes.ring(2, P(t, mid('times', 0.55), 0.3, linear));
        wTimes.hl(0, P(t, mid('times', 0.7), 0.3, linear));
        op(timesNote, P(t, mid('times', 0.7), 0.3, linear));
      }
      // speaker in the bottom-left corner, Victoria watching from the bottom right
      const L = who === 'boy' ? 'boy' : who === 'vinny' ? 'vinny' : who === 'kavya' ? 'kav' : t >= at('times') ? 'kav' : t >= at('grid') ? 'vinny' : t >= at('both') ? 'boy' : 'mum';
      if (L === 'mum') show('mum', mum, SLOT_L[0], SLOT_L[1], SLOT_S, { talk: talk(t, 'mum'), mood: 'happy', look: 0.8 });
      if (L === 'boy') show('boy', boy, SLOT_L[0], SLOT_L[1] + 8, SLOT_S, { talk: talk(t, 'boy'), mood: 'happy', look: 0.8, lift: t > mid('both', 0.1) ? 1 : 0 });
      if (L === 'vinny') show('vinny', vinny, SLOT_L[0] + 10, 650, 0.55, { talk: talk(t, 'vinny'), mood: 'deadpan', look: 0.7 });
      if (L === 'kav') show('kav', kav, SLOT_L[0], SLOT_L[1], SLOT_S, { talk: talk(t, 'kavya'), mood: t > mid('times', 0.6) ? 'smug' : 'neutral', look: 0.8 });
      let vm = 'happy';
      if (t >= at('both')) vm = 'shock';
      if (t >= at('grid')) vm = t > mid('grid', 0.3) && t < mid('grid', 0.7) ? 'shock' : 'annoyed';
      if (t >= at('times')) vm = 'smug';
      show('vic', vic, SLOT_R[0], SLOT_R[1], 0.6, { talk: talk(t, 'vic'), mood: vm, look: -0.8, sweat: t >= at('grid') && t < at('times') ? 1 : 0 });
    }

    /* ---------- C: sweets ---------- */
    if (sh === 'C') {
      const BX = 235, MXp = 965;
      const inSm = t >= at('smaller'), inRef = t >= at('refund');
      const lift = inSm ? P(t, mid('smaller', 0.55), 0.4, linear) : 0;
      sweets.forEach((s, i) => { tr(s.g, s.x, 548 - (i < 15 ? 6 * Math.sin(clamp(lift) * Math.PI) : 0), 1, (i % 2 ? 8 : -8)); op(s.g, P(t, at('bigger') + 0.05 + i * 0.04, 0.2, linear) * (i >= 15 ? 1 - 0.65 * lift : 1)); });
      op(glowG, lift);
      show('boy', boy, BX, 455, 1.0, { talk: talk(t, 'boy'), mood: inRef ? 'sad' : inSm ? (t > mid('smaller', 0.6) ? 'shock' : 'neutral') : 'happy', look: inRef ? 0 : 0.8, lift: inRef && t > at('refund') + 0.1 ? 1 : (!inSm && t > mid('bigger', 0.3) ? 1 : 0) });
      op(slip, inRef && t > at('refund') + 0.1 ? 1 : 0);
      show('mum', mum, MXp, 447, 1.0, { talk: talk(t, 'mum'), mood: inRef ? 'deadpan' : inSm ? 'smug' : 'neutral', look: inRef ? 0 : -0.8, lift: inSm && !inRef && t > mid('smaller', 0.1) ? 1 : 0 });
      if (!inSm) {
        popSet(bubBig, t, mid('bigger', 0.4), 560, 290);
        popSet(cBigger, t, mid('bigger', 0.08), 600, 420);
      } else if (!inRef) {
        op(pOf, P(t, at('smaller') + 0.05, 0.3, linear)); tr(pOf, 600, 240);
        op(pFifteen, P(t, mid('smaller', 0.25), 0.3, linear)); tr(pFifteen, 600, 330);
        popSet(cSmaller, t, mid('smaller', 0.72), 600, 422);
        popSet(c15, t, mid('smaller', 0.6), 520, 492);
      } else { op(pFifteen, 1); tr(pFifteen, 600, 330); }
    }

    /* ---------- D: speed round ---------- */
    if (sh === 'D') {
      const inF = t >= at('first');
      op(dHead1, inF ? 0 : 1); op(dHead2, inF ? P(t, at('first') + 0.05, 0.3, linear) : 0);
      prodD.link(0, inF ? P(t, mid('first', 0.28), 0.35, linear) : 0);
      prodD.cancel('n1', inF ? P(t, mid('first', 0.33), 0.4, linear) : 0);
      prodD.cancel('d2', inF ? P(t, mid('first', 0.38), 0.4, linear) : 0);
      prodD.link(1, inF ? P(t, mid('first', 0.45), 0.35, linear) : 0);
      prodD.cancel('n2', inF ? P(t, mid('first', 0.5), 0.4, linear) : 0);
      prodD.cancel('d1', inF ? P(t, mid('first', 0.55), 0.4, linear) : 0);
      op(dRes, inF ? P(t, mid('first', 0.68), 0.3, linear) : 0);
      stampSF.set(inF ? P(t, mid('first', 0.82), 0.35, linear) : 0); tr(stampSF, 965, 512, 0.42);
      op(dNote, inF ? P(t, mid('first', 0.88), 0.3, linear) : 0);
      show('priya', priya, SLOT_L[0], SLOT_L[1], SLOT_S, { talk: talk(t, 'priya'), mood: inF ? (t > mid('first', 0.8) ? 'annoyed' : 'neutral') : 'smug', look: inF ? 0.9 : 0.6, lift: 0 });
      show('vinny', vinny, 1040, 652, 0.55, { talk: talk(t, 'vinny'), mood: inF && t > mid('first', 0.8) ? 'smug' : 'deadpan', look: -0.7 });
    }

    /* ---------- E: the picnic mat ---------- */
    if (sh === 'E') {
      const inNo = t >= at('nobar'), inImp = t >= at('improper');
      const mp = P(t, at('mat') + 0.05, 0.3, linear);
      op(mat, mp); dimW.set(P(t, mid('mat', 0.08), 0.3, linear)); dimH.set(P(t, mid('mat', 0.14), 0.3, linear));
      op(splitL, P(t, mid('mat', 0.22), 0.3, linear));
      op(cellA, P(t, mid('mat', 0.3), 0.3, linear)); op(labA, P(t, mid('mat', 0.32), 0.3, linear));
      op(cellD, P(t, mid('mat', 0.5), 0.3, linear)); op(labD, P(t, mid('mat', 0.52), 0.3, linear));
      const strips = inNo ? P(t, at('nobar') + 0.35, 0.4, linear) : 0;
      op(cellB, strips); op(cellC, strips); op(labB, inNo ? P(t, mid('nobar', 0.7), 0.3, linear) : 0); op(labC, inNo ? P(t, mid('nobar', 0.7), 0.3, linear) : 0);
      const q = inNo && !inImp ? P(t, at('nobar') + 0.1, 0.2, linear) * (1 - P(t, mid('nobar', 0.65), 0.2, linear)) : 0;
      op(qB, q); op(qC, q);
      op(dadW, inImp ? 0 : 1); op(kavW, inImp ? 1 : 0);
      if (!inImp) {
        wDad.show(0, P(t, mid('mat', 0.3), 0.3, linear)); wDad.show(1, P(t, mid('mat', 0.5), 0.3, linear)); wDad.show(2, P(t, mid('mat', 0.66), 0.3, linear));
        wDad.ring(2, P(t, mid('mat', 0.72), 0.3, linear) * (inNo ? 0 : 1));
        op(dadX, inNo ? P(t, mid('nobar', 0.5), 0.2, linear) : 0);
        popSet(cFlw, t, mid('mat', 0.82), 970, 108);
        if (inNo) { stampNo.set(P(t, at('nobar') + 0.05, 0.35, linear)); tr(stampNo, 970, 352, 0.5); }
      } else {
        wKav.show(0, P(t, at('improper') + 0.1, 0.35, linear)); wKav.show(1, P(t, mid('improper', 0.45), 0.3, linear)); wKav.show(2, P(t, mid('improper', 0.6), 0.3, linear));
        wKav.ring(2, P(t, mid('improper', 0.7), 0.3, linear));
        op(kavChk, P(t, mid('improper', 0.76), 0.3, linear));
      }
      // Dad bottom left; Vinny bottom right, then Kavya
      const famous = t > mid('mat', 0.82) && !inNo;
      show('dad', dad, SLOT_L[0], SLOT_L[1] - 4, SLOT_S, { talk: talk(t, 'dad'), mood: inNo ? 'sad' : 'smug', look: famous ? 0 : 0.8, lift: !inNo && t < mid('mat', 0.8) ? 1 : 0 });
      if (!inImp) show('vinny', vinny, 1040, 652, 0.55, { talk: talk(t, 'vinny'), mood: inNo ? 'annoyed' : t > mid('mat', 0.6) ? 'annoyed' : 'deadpan', look: famous ? 0 : -0.8, stop: inNo ? 1 : 0 });
      else show('kav', kav, SLOT_R[0], SLOT_R[1], SLOT_S, { talk: talk(t, 'kavya'), mood: t > mid('improper', 0.75) ? 'smug' : 'neutral', look: -0.8 });
    }

    /* ---------- F: three tables ---------- */
    if (sh === 'F') {
      const f = at('tables');
      [0, 1, 2].forEach(i => bmF.row(i, P(t, f + 0.1 + i * 0.25, 0.5, linear)));
      bmF.brace(0, P(t, mid('tables', 0.18), 0.3, linear));
      wTab.show(0, P(t, mid('tables', 0.3), 0.35, linear));
      op(hlWhole, P(t, mid('tables', 0.36), 0.25, linear) * (1 - P(t, mid('tables', 0.46), 0.25, linear)));
      op(hlFrac, P(t, mid('tables', 0.46), 0.25, linear) * (1 - P(t, mid('tables', 0.66), 0.25, linear)));
      op(fQuarter, P(t, mid('tables', 0.5), 0.3, linear));
      wTab.show(1, P(t, mid('tables', 0.58), 0.35, linear));
      wTab.show(2, P(t, mid('tables', 0.75), 0.35, linear));
      wTab.ring(2, P(t, mid('tables', 0.82), 0.3, linear));
      bmF.total(P(t, mid('tables', 0.82), 0.3, linear));
      const done = t > end('tables');
      show('mum', mum, SLOT_L[0], SLOT_L[1] - 4, SLOT_S, { talk: talk(t, 'mum'), mood: done ? 'smug' : 'neutral', look: done ? 0 : 0.8 });
      show('boy', boy, SLOT_R[0], SLOT_R[1] + 6, SLOT_S, { talk: talk(t, 'boy'), mood: t > mid('tables', 0.6) ? 'happy' : 'neutral', look: -0.8 });
    }

    op(priya, shown.priya); op(kav, shown.kav); op(dad, shown.dad); op(mum, shown.mum); op(boy, shown.boy); op(vinny, shown.vinny); op(vic, shown.vic);
  };
});
