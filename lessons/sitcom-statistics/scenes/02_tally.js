/* Scene 2: Recess with Tally (frequency tables, grouped data, two-way tables).
   Shots (hard sitcom cuts):
   A  Tuesday recess, the canteen: Priya at the VOTE table: "Don't you agree bubble tea is the best?" -> Inspector Axis
      on Kavya's phone: a LEADING QUESTION, stamp BIASED on her bubble.
   B  the vote table close: Tally bursts in, counts 1, 2, 3, 4 and slams the red fifth stroke: GATE! -> the frequency
      table of the 60 votes, the tallies draw themselves, 26 + 22 + 12 = 60.
   C  the trial stalls: Auntie Rose waves her notebook: 16 queue times, classes of ten -> Tally panics with a "40" card.
   D  Mr Tan's board: 40 ≤ t < 50 on a number line (filled dot at 40, open circle at 50); 40 drops in, 50 goes next door.
   E  the class table fills 2, 4, 6, 3, 1 (each class's times crossed off), total 16, the modal class.
   F  the two-way table: one gap per line, subtract: 9, then 9 and 13, then 7 and 29; check 9 + 13 + 7 = 29; FACT-CHECKED.
   G  Priya: "The big kids have no taste." Tally asleep on the counter. */
scene('tally', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const k = id => at(id) - 0.06;
  const GOLD = '#FFE45C', GREEN = '#1E9E5A', LGREEN = '#56D69B', RED = '#E8424F', BLUE = '#2E6FD8', PURPLE = '#8E5BD8';
  const pset = (el, t, t0, x, y, t1) => { el.set(t >= t0 && t < (t1 === undefined ? 1e9 : t1) ? P(t, t0, 0.35, linear) : 0); if (x !== undefined) tr(el, x, y); };
  const fade = (el, t, t0, d) => op(el, P(t, t0, d || 0.3, linear));
  const card = (parent, x, y, w, h) => E('rect', { x, y, width: w, height: h, rx: 16, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, parent);
  const outline = (el, col, w) => { el.setAttribute('stroke', col || '#0A1420'); el.setAttribute('stroke-width', w || 8); el.setAttribute('paint-order', 'stroke'); el.setAttribute('stroke-linejoin', 'round'); return el; };

  /* layers: sets, characters, counter fronts, props on the counter, graphics, HUD */
  const Lbg = G(root), Lcast = G(root), Lfront = G(root), Ltop = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= A/B: the canteen ================= */
  const canteen = sdCanteen(Lbg);
  // a queue of pupils waiting to vote (three paths: bodies, heads, hair)
  const queue = G(Lbg);
  let qb = '', qh = '', qr = '';
  [[70, 0], [116, 6], [160, -4], [204, 8], [248, 2]].forEach(([x, dy]) => {
    const y = 470 + dy;
    qb += `M${x - 18},${y + 22} Q${x - 20},${y + 14} ${x - 10},${y + 12} L${x + 10},${y + 12} Q${x + 20},${y + 14} ${x + 18},${y + 22} L${x + 18},${y + 100} L${x - 18},${y + 100} Z `;
    qh += `M${x + 16},${y} a16,16 0 1 1 -32,0 a16,16 0 1 1 32,0 Z `;
    qr += `M${x - 16},${y - 2} Q${x - 16},${y - 20} ${x},${y - 19} Q${x + 16},${y - 20} ${x + 16},${y - 2} Q${x + 4},${y - 12} ${x - 16},${y - 2} Z `;
  });
  E('path', { d: qb, fill: '#F4F7FA', stroke: SC_INK, 'stroke-width': 3 }, queue);
  E('path', { d: qh, fill: '#C68A5E', stroke: SC_INK, 'stroke-width': 3 }, queue);
  E('path', { d: qr, fill: '#1E1410' }, queue);
  // two table fronts: the VOTE table (shot A) and a long one (shot B)
  const tableFront = (x0, x1) => {
    const g = G(Lfront);
    E('rect', { x: x0, y: 530, width: x1 - x0, height: 22, rx: 6, fill: '#3FA463', stroke: '#1E5A38', 'stroke-width': 4 }, g);
    E('rect', { x: x0 + 14, y: 552, width: x1 - x0 - 28, height: 198, fill: linGrad('#2E6FA8', '#1E4A78', true), stroke: '#173A5C', 'stroke-width': 4 }, g);
    return g;
  };
  const tabA = tableFront(300, 990), tabB = tableFront(40, 1160);
  const ballot = G(Ltop); tr(ballot, 660, 530);
  E('rect', { x: -78, y: -112, width: 156, height: 112, rx: 8, fill: '#FFE45C', stroke: SC_INK, 'stroke-width': 4 }, ballot);
  E('rect', { x: -40, y: -116, width: 80, height: 10, rx: 4, fill: SC_INK }, ballot);
  T(ballot, 0, -42, 'VOTE', { size: 40, weight: 800, anchor: 'middle', fill: '#8E1B1B' });
  const cRecess = mkChip(Lfg, '**Tuesday**, recess', { size: 30, col: GOLD });
  const bubLead = mkSpeechBubble(Lfg, "Don't you agree **bubble tea** is the best?", { size: 30, tail: 'down', tailX: -150, boldFill: PURPLE });
  const stampB = sdStamp(Lfg, 'biased');
  const cLeading = mkChip(Lfg, 'a **leading question**: it pushes one answer', { size: 30, col: '#FF8A8A' });
  const phone = sdDevice(Lfg, 'phone');
  const tallyBig = mkTally(Lfg, 5, { h: 150, spacing: 32, col: '#FFFFFF' });
  const eq5 = outline(T(Lfg, 0, 0, '= 5', { size: 80, weight: 800, fill: GOLD }));
  const cGate = mkChip(Lfg, '**GATE!**', { size: 40, col: RED });
  const cFives = mkChip(Lfg, 'count in **fives**', { size: 34, col: GOLD });
  const numCnt = [1, 2, 3, 4].map(n => outline(T(Lfg, 0, 0, String(n), { size: 54, weight: 800, anchor: 'middle', fill: '#FFFFFF' })));

  // the votes card
  const vCard = G(Lfg);
  card(vCard, 570, 122, 600, 456);
  T(vCard, 870, 166, 'Votes: a sample of 60', { size: 32, weight: 800, anchor: 'middle', fill: MK.ink });
  const vTab = mkTable(vCard, [['Choice', 'Tally', 'Frequency'], ['Bubble tea', '', '26'], ['Ice kachang', '', '22'], ["Don't mind", '', '12'], ['Total', '', '60']],
    { colW: [170, 280, 130], rowH: 58, size: 26, ink: MK.ink, side: true, headFill: 'rgba(76,201,240,0.35)', fill: 'rgba(42,26,34,0.03)' });
  tr(vTab, 580, 190);
  const vTallies = [26, 22, 12].map((n, i) => { const tl = mkTally(vTab, n, { h: 38, spacing: 8, col: MK.ink }); tr(tl, 182, 58 * (i + 1) + 10); return tl; });
  const vSum = mkText(vCard, 870, 540, '{{26 + 22 + 12 = 60}} = the sample size', { size: 30, anchor: 'middle', fill: GREEN });
  const vTick = tick(vCard, 16); tr(vTick, 1142, 528);

  /* ================= C/E/F/G: the trial stalls ================= */
  const trial = sdTrial(Lbg);
  Lfront.appendChild(trial.front); Ltop.appendChild(trial.top);

  // the class card: Auntie's 16 waiting times and the grouped frequency table
  const WAITS = [34, 47, 52, 28, 41, 39, 60, 45, 33, 50, 38, 44, 29, 55, 40, 48];
  const cls = v => Math.floor(v / 10) - 2;   // 20s -> 0 ... 60s -> 4
  const qCard = G(Lfg);
  card(qCard, 630, 118, 530, 474);
  T(qCard, 895, 160, "Auntie's queue: 16 waits (s)", { size: 30, weight: 800, anchor: 'middle', fill: '#B8336A' });
  const wNums = [], wStrikes = [];
  WAITS.forEach((v, i) => {
    const x = 895 + ((i % 8) - 3.5) * 60, y = 204 + Math.floor(i / 8) * 42;
    wNums.push(T(qCard, x, y, String(v), { size: 30, weight: 700, anchor: 'middle', fill: MK.ink }));
    wStrikes.push(E('line', { x1: x - 22, y1: y - 10, x2: x + 22, y2: y - 10, stroke: RED, 'stroke-width': 5, 'stroke-linecap': 'round' }, qCard));
  });
  const FREQ = [2, 4, 6, 3, 1];
  const qTab = mkTable(qCard, [['Time, {{t}} (s)', 'Frequency'],
    ['{{20 <= t < 30}}', ''], ['{{30 <= t < 40}}', ''], ['{{40 <= t < 50}}', ''], ['{{50 <= t < 60}}', ''], ['{{60 <= t < 70}}', ''], ['Total', '']],
    { colW: [300, 170], rowH: 44, size: 26, ink: MK.ink, headFill: 'rgba(76,201,240,0.35)', fill: 'rgba(42,26,34,0.03)' });
  tr(qTab, 660, 274);
  const fCells = FREQ.concat([16]).map((f, i) => { const tt = T(qTab, 385, 44 * (i + 1) + 31, String(f), { size: 30, weight: 800, anchor: 'middle', fill: i === 5 ? MK.ink : BLUE }); return tt; });
  const fTick = tick(qTab, 13); tr(fTick, 430, 44 * 6 + 22);
  const modalMark = [qTab.mark(3, 0, 'rgba(255,228,92,0.55)'), qTab.mark(3, 1, 'rgba(255,228,92,0.55)')];
  const cGroups = mkChip(Lfg, 'groups of **ten**', { size: 32, col: GOLD });
  const cModal = mkChip(Lfg, '**modal class**: the most common', { size: 28, col: GOLD });
  const arModal = arrow(Lfg, 560, 252, 652, 418, { color: GOLD, width: 5 });
  const card40 = G(Lfg);
  E('rect', { x: -38, y: -26, width: 76, height: 52, rx: 10, fill: '#FFFFFF', stroke: RED, 'stroke-width': 5 }, card40);
  T(card40, 0, 12, '40', { size: 34, weight: 800, anchor: 'middle', fill: RED });
  const qMarks = [qTab.mark(2, 0, 'rgba(232,66,79,0.18)'), qTab.mark(3, 0, 'rgba(232,66,79,0.18)')];
  const bigQ = outline(T(Lfg, 0, 0, '?', { size: 80, weight: 800, anchor: 'middle', fill: GOLD }));

  /* ================= D: Mr Tan's board ================= */
  const board = mkWhiteboard(Lfg, 540, 420);
  tr(board, 880, 318);
  const bIn = G(board);
  mkMath(bIn, 0, -128, '40 <= t < 50', { size: 60, anchor: 'middle', fill: MK.ink });
  const bLeast = mkText(bIn, -80, -66, 'at least **40**', { size: 28, anchor: 'middle', fill: GREEN });
  const bLess = mkText(bIn, 110, -66, 'less than **50**', { size: 28, anchor: 'middle', fill: RED });
  const NL = mkNumberLine(bIn, { from: 20, to: 70, step: 10, len: 440, size: 26, ink: MK.ink, arrows: false });
  tr(NL, -220, 110);
  const segs = [];
  [[20, 30], [30, 40], [40, 50], [50, 60], [60, 70]].forEach(([a, b], i) => {
    const y = i % 2 ? 50 : 76, col = i === 2 ? '#D9437A' : ['#2E7DD8', '#2FA36B', '#D9437A', '#E08A1E', '#7550C4'][i];
    const sg = G(bIn);
    E('line', { x1: NL.x(a) - 220, y1: y, x2: NL.x(b) - 220, y2: y, stroke: col, 'stroke-width': i === 2 ? 8 : 6, 'stroke-linecap': 'round' }, sg);
    E('circle', { cx: NL.x(a) - 220, cy: y, r: 9, fill: col, stroke: MK.ink, 'stroke-width': 2.5 }, sg);
    E('circle', { cx: NL.x(b) - 220, cy: y, r: 9, fill: '#FFFFFF', stroke: col, 'stroke-width': 4 }, sg);
    segs.push(sg);
  });
  const legend = G(bIn);
  E('circle', { cx: -200, cy: 176, r: 9, fill: MK.ink }, legend);
  T(legend, -184, 185, 'in', { size: 26, weight: 700, fill: MK.ink });
  E('circle', { cx: -110, cy: 176, r: 9, fill: '#FFFFFF', stroke: MK.ink, 'stroke-width': 4 }, legend);
  T(legend, -94, 185, 'not in', { size: 26, weight: 700, fill: MK.ink });
  const c40b = G(bIn);
  E('rect', { x: -32, y: -22, width: 64, height: 44, rx: 9, fill: '#FFFFFF', stroke: RED, 'stroke-width': 4 }, c40b);
  T(c40b, 0, 11, '40', { size: 30, weight: 800, anchor: 'middle', fill: RED });
  const c50b = G(bIn);
  E('rect', { x: -32, y: -22, width: 64, height: 44, rx: 9, fill: '#FFFFFF', stroke: '#E08A1E', 'stroke-width': 4 }, c50b);
  T(c50b, 0, 11, '50', { size: 30, weight: 800, anchor: 'middle', fill: '#E08A1E' });
  const X40 = NL.x(40) - 220, X50 = NL.x(50) - 220;
  const cNext = mkText(bIn, 120, 176, '50 goes **next door**', { size: 26, anchor: 'start', fill: '#E08A1E' });

  /* ================= F: the two-way table ================= */
  const wCard = G(Lfg);
  card(wCard, 445, 116, 715, 452);
  T(wCard, 802, 156, 'Who wants what? (sample of 60)', { size: 30, weight: 800, anchor: 'middle', fill: MK.ink });
  const TW = mkTable(wCard, [['', 'Bubble tea', 'Ice kachang', "Don't mind", 'Total'],
    ['Lower sec', '17', '', '5', '31'], ['Upper sec', '', '', '', ''], ['Total', '26', '22', '12', '60']],
    { colW: [140, 150, 165, 150, 80], rowH: 56, size: 26, ink: MK.ink, side: true, headFill: 'rgba(76,201,240,0.35)', fill: 'rgba(42,26,34,0.03)' });
  tr(TW, 460, 176);
  const cc = (r, c) => { const q = TW.cell(r, c); return [q.x + q.w / 2, q.y + q.h / 2 + 10]; };
  const GAPS = [[1, 2, '9'], [2, 1, '9'], [2, 2, '13'], [2, 3, '7'], [2, 4, '29']];
  const qs = GAPS.map(([r, c]) => { const [x, y] = cc(r, c); return T(TW, x, y, '?', { size: 30, weight: 800, anchor: 'middle', fill: '#9AA6B2' }); });
  const fills = GAPS.map(([r, c, v]) => { const [x, y] = cc(r, c); return T(TW, x, y, v, { size: 30, weight: 800, anchor: 'middle', fill: GREEN }); });
  const mk = (cells) => cells.map(([r, c]) => TW.mark(r, c, 'rgba(255,228,92,0.5)'));
  const hlLower = mk([[1, 1], [1, 2], [1, 3], [1, 4]]);
  const hlTotCol = mk([[1, 4], [2, 4], [3, 4]]);
  const hlTotRow = mk([[3, 1], [3, 2], [3, 3], [3, 4]]);
  const hlBT = mk([[1, 1], [2, 1], [3, 1]]);
  const hlIK = mk([[1, 2], [2, 2], [3, 2]]);
  const hlDM = mk([[1, 3], [2, 3], [3, 3]]);
  const hlUpper = mk([[2, 1], [2, 2], [2, 3], [2, 4]]);
  const W1 = 802;
  const wTwo1 = mkText(wCard, W1, 452, 'Each row and column adds up to its **total**.', { size: 30, anchor: 'middle', fill: MK.ink });
  const wTwo2 = mkText(wCard, W1, 504, 'Find a line with **one gap**, and **subtract**.', { size: 30, anchor: 'middle', fill: BLUE });
  const wF1 = mkText(wCard, W1, 470, 'Lower sec, ice kachang: {{31 − 17 − 5 = 9}}', { size: 32, anchor: 'middle', fill: MK.ink });
  const wF2a = mkText(wCard, W1, 452, 'Upper sec, bubble tea: {{26 − 17 = 9}}', { size: 32, anchor: 'middle', fill: MK.ink });
  const wF2b = mkText(wCard, W1, 506, 'Upper sec, ice kachang: {{22 − 9 = 13}}', { size: 32, anchor: 'middle', fill: MK.ink });
  const wF3a = mkText(wCard, W1, 444, "Upper sec, don't mind: {{12 − 5 = 7}}", { size: 30, anchor: 'middle', fill: MK.ink });
  const wF3b = mkText(wCard, W1, 494, 'Upper total: {{60 − 31 = 29}}', { size: 30, anchor: 'middle', fill: MK.ink });
  const wF3c = mkText(wCard, W1, 544, 'Check: {{9 + 13 + 7 = 29}} ✓', { size: 30, anchor: 'middle', fill: GREEN });
  const stampC = sdStamp(Lfg, 'checked');
  const cTaste = mkChip(Lfg, 'Upper sec: ice kachang **13**, bubble tea **9**', { size: 30, col: GOLD });
  const zzz = G(Lfg);
  [['z', 0, 0, 30], ['z', 26, -30, 36], ['Z', 56, -66, 44]].forEach(([s, x, y, sz]) => outline(T(zzz, x, y, s, { size: sz, weight: 800, fill: '#FFFFFF' }), '#2A3B44', 6));

  /* ================= the cast ================= */
  const rose = cast(Lcast, 'rose', { prop: 'book', propCol: '#B8336A' });
  const tan = cast(Lcast, 'tan');
  const priya = cast(Lcast, 'priya');
  const kav = cast(Lcast, 'kavya');
  const tally = cast(Ltop, 'tally');
  const lt = { priya: sdLowerThird(Lhud, 'priya'), tally: sdLowerThird(Lhud, 'tally'), rose: sdLowerThird(Lhud, 'rose'), tan: sdLowerThird(Lhud, 'tan') };
  const ltOn = (t, who, t0) => lt[who].set(win(t, t0, t0 + 3.1, 0.3));
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cuts */
  const cB = k('tally'), cC = k('rose'), cD = k('ineq'), cE = k('freq'), cF = k('two'), cG = k('taste');

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const sA = on(t, -1e9, cB), sB = on(t, cB, cC), sC = on(t, cC, cD), sD = on(t, cD, cE), sE = on(t, cE, cF), sF = on(t, cF, cG), sG = on(t, cG, 1e9);
    const who = scWho(S, t);
    for (const kk in lt) lt[kk].set(0);
    const show = { rose: 0, tan: 0, priya: 0, kav: 0, tally: 0 };
    // everything off; each shot turns on its own pieces
    op(canteen, sA || sB); op(queue, sA); op(tabA, sA); op(tabB, sB); op(ballot, sA);
    op(trial, sC || sD || sE || sF || sG); op(trial.front, sC || sD || sE || sF || sG); op(trial.top, sC || sD || sE || sF || sG);
    [cRecess, bubLead, stampB, cLeading, cGate, cFives, cGroups, cModal, stampC, cTaste].forEach(c => c.set(0));
    [phone, tallyBig, eq5, vCard, qCard, card40, bigQ, board, wCard, zzz, arModal].forEach(e => op(e, 0));
    numCnt.forEach(e => op(e, 0));
    if (sA || sB) canteen.upd(t);
    if (!sA && !sB) trial.upd(t);

    /* ---------- A: the canteen, the VOTE table ---------- */
    if (sA) {
      show.priya = 1; show.kav = 1;
      tr(priya, 470, 450, 0.92); tr(kav, 820, 446, 0.92);
      pset(cRecess, t, at('lead') + 0.05, 170, 142);
      pset(bubLead, t, mid('lead', 0.12), 540, 218);
      ltOn(t, 'priya', at('lead') + 0.2);
      const lead = t < at('leading');
      priya.set({ t, talk: scTalk(S, t, 'priya'), mood: lead ? 'smug' : (t > mid('leading', 0.6) ? 'annoyed' : 'shock'), look: lead ? 0.3 : 1, lift: lead ? 0.5 : 0 });
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: lead ? 'deadpan' : 'smug', look: lead ? -1 : 1 });
      if (!lead) {
        const pp = P(t, at('leading') - 0.06, 0.4, pop);
        op(phone, clamp(pp * 3)); tr(phone, 1045, lerp(760, 345, pp), 1.25, 4);
        phone.axis.set({ t, talk: scTalk(S, t, 'axis'), mood: 'deadpan', look: -0.6, glass: t > mid('leading', 0.1) && t < mid('leading', 0.6) ? 1 : 0 });
        pset(cLeading, t, mid('leading', 0.35), 645, 618);
        stampB.set(P(t, mid('leading', 0.6), 0.35, linear)); tr(stampB, 540, 218, 0.5);
      }
    }

    /* ---------- B: Tally at the vote table ---------- */
    if (sB) {
      show.kav = 1;
      tr(kav, 175, 446, 0.95);
      const ent = P(t, at('tally') - 0.06, 0.45, pop);
      const votes = t >= at('votes');
      // Tally's strokes: 1, 2, 3, 4 ... GATE!
      const f = (t - at('tally')) / (end('tally') - at('tally'));
      let n = 5, arms = 0.6, tm = 'happy', sc = 0.85;
      if (!votes) {
        n = f < 0.2 ? 0 : f < 0.27 ? 1 : f < 0.34 ? 2 : f < 0.41 ? 3 : f < 0.5 ? 4 : 5;
        if (f < 0.2) n = clamp(ent) * 5;   // he arrives as a whole gate, then counts
        const slam = P(t, mid('tally', 0.5), 0.3, linear);
        sc = 0.85 * (1 + 0.18 * Math.sin(Math.PI * slam));
        arms = f >= 0.5 ? 1 : 0.7;
      } else {
        const vf = (t - at('votes')) / (end('votes') - at('votes'));
        if (vf < 0.6) { n = 1 + Math.floor((t * 7) % 5); arms = 0.9; } else { n = 5; arms = 0.5; }
      }
      show.tally = clamp(ent * 3);
      tr(tally, 410, lerp(240, 416, clamp(ent)), Math.max(0.01, sc * (0.4 + 0.6 * ent)));
      tally.set({ t, talk: scTalk(S, t, 'tally'), mood: tm, look: votes ? 0.6 : (f > 0.6 ? -0.3 : 0.3), n, arms: arms * AMP + (1 - AMP) * 0.3 });
      ltOn(t, 'tally', at('tally') + 0.2);
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: votes ? 'happy' : (f > 0.5 ? 'shock' : 'neutral'), look: votes ? 1 : 0.8 });
      if (!votes) {
        // the big gate on the right: strokes appear as he counts
        op(tallyBig, 1); tr(tallyBig, 790, 210);
        tallyBig.set(n);
        numCnt.forEach((e, i) => { op(e, n >= i + 1 && n < 5 ? 1 : (n >= 5 ? 0.35 : 0)); tr(e, 790 + i * 32, 200); });
        if (n >= 5) { op(eq5, P(t, mid('tally', 0.52), 0.25, linear)); tr(eq5, 960, 320); }
        pset(cGate, t, mid('tally', 0.5), 410, 236);
        pset(cFives, t, mid('tally', 0.72), 860, 470);
      } else {
        op(vCard, P(t, at('votes') - 0.06, 0.25, linear));
        const vf0 = at('votes'), D = end('votes') - vf0;
        const rows = [[0.0, 0.22], [0.22, 0.4], [0.4, 0.52]];
        vTallies.forEach((tl, i) => { const p = P(t, vf0 + rows[i][0] * D, (rows[i][1] - rows[i][0]) * D, linear); tl.set(p * [26, 22, 12][i]); });
        [1, 2, 3].forEach(i => op(vTab.cells[i][2], P(t, vf0 + rows[i - 1][1] * D - 0.15, 0.25, linear)));
        op(vTab.cells[4][2], P(t, vf0 + 0.58 * D, 0.25, linear));
        op(vSum, P(t, vf0 + 0.68 * D, 0.3, linear));
        op(vTick, P(t, vf0 + 0.85 * D, 0.2, linear));
      }
    }

    /* ---------- C: the trial stalls, Auntie's queue ---------- */
    if (sC || sE) {
      show.rose = 1;
      tr(rose, 170, 446, 0.95);
      op(qCard, 1);
      wNums.forEach((e, i) => op(e, sC ? P(t, mid('rose', 0.3) + i * 0.06, 0.2, linear) : 1));
      [0, 1, 2, 3, 4, 5].forEach(i => op(fCells[i], 0));
      wStrikes.forEach(s => op(s, 0));
      op(fTick, 0); modalMark.forEach(m => m.set(0)); qMarks.forEach(m => m.set(0));
    }
    if (sC) {
      const forty = t >= at('forty');
      ltOn(t, 'rose', at('rose') + 0.2);
      pset(cGroups, t, mid('rose', 0.75), 450, 232);
      rose.set({ t, talk: scTalk(S, t, 'rose'), mood: forty ? 'shock' : 'happy', look: forty ? 0.8 : 0.4, lift: forty ? 0.2 : 0.65 + 0.35 * Math.sin(t * 7) * AMP });
      if (forty) {
        show.tally = 1;
        const jit = Math.sin(t * 40) * 3 * AMP;
        tr(tally, 470 + jit, 530 - 134 * 0.9, 0.9);
        tally.set({ t, talk: scTalk(S, t, 'tally'), mood: 'shock', look: 0.9, n: 5, arms: 1 * AMP });
        // the 40 card wavers between two rows
        op(card40, 1);
        const wob = Math.sin((t - at('forty')) * 5);
        tr(card40, 618, 274 + 44 * 3 + wob * 22, 1, wob * 6);
        qMarks.forEach(m => m.set(0.8));
        op(bigQ, P(t, mid('forty', 0.4), 0.2, linear)); tr(bigQ, 470, 236);
        // the 40 in the list is ringed in red
        attr(wNums[14], 'fill', RED);
      } else attr(wNums[14], 'fill', MK.ink);
    }

    /* ---------- D: Mr Tan's board ---------- */
    if (sD) {
      show.tan = 1; show.tally = 1;
      tr(tan, 300, 446, 1.0);
      op(board, P(t, cD, 0.2, linear));
      ltOn(t, 'tan', at('ineq') + 0.2);
      op(bLeast, P(t, mid('ineq', 0.12), 0.3, linear));
      op(bLess, P(t, mid('ineq', 0.32), 0.3, linear));
      segs.forEach((s, i) => op(s, i === 2 ? P(t, mid('ineq', 0.1), 0.3, linear) : P(t, mid('ineq', 0.6), 0.3, linear)));
      op(legend, P(t, mid('ineq', 0.3), 0.3, linear));
      // 40 drops onto its filled dot; 50 slides next door
      const d40 = P(t, mid('ineq', 0.5), 0.45, easeOut);
      op(c40b, 1); tr(c40b, lerp(X40 - 140, X40, d40), lerp(-30, 76 - 46, d40));
      const d50 = P(t, mid('ineq', 0.78), 0.5, ease);
      op(c50b, P(t, mid('ineq', 0.7), 0.2, linear)); tr(c50b, lerp(X50, X50 + 2, d50), lerp(76 - 46, 50 - 46, d50));
      op(cNext, P(t, mid('ineq', 0.82), 0.3, linear));
      tan.set({ t, talk: scTalk(S, t, 'tan'), mood: t > mid('ineq', 0.85) ? 'happy' : 'neutral', look: 0.8, lift: t < mid('ineq', 0.5) ? 0.4 : 0 });
      tr(tally, 500, 530 - 134 * 0.6, 0.6);
      tally.set({ t, mood: t > mid('ineq', 0.55) ? 'happy' : 'shock', look: 0.9, n: 5, arms: t > mid('ineq', 0.55) ? 0.6 : 0.2 });
    }

    /* ---------- E: the frequencies ---------- */
    if (sE) {
      show.kav = 1;
      tr(kav, 445, 446, 0.95);
      const F0 = at('freq'), D = end('freq') - F0;
      const ft = [0.12, 0.2, 0.28, 0.36, 0.44];
      ft.forEach((f, c) => {
        const p = P(t, F0 + f * D, 0.25, linear);
        op(fCells[c], p);
        WAITS.forEach((v, i) => { if (cls(v) === c) op(wStrikes[i], p); });
      });
      op(fCells[5], P(t, F0 + 0.52 * D, 0.25, linear));
      op(fTick, P(t, F0 + 0.6 * D, 0.2, linear));
      const mp = P(t, F0 + 0.68 * D, 0.3, linear);
      modalMark.forEach(m => m.set(mp));
      pset(cModal, t, F0 + 0.7 * D, 410, 232);
      op(arModal, mp); arModal.set(P(t, F0 + 0.72 * D, 0.4, linear));
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: 'happy', look: 1 });
      rose.set({ t, mood: 'happy', look: 0.9, lift: 0.3 });
    }

    /* ---------- F: the two-way table ---------- */
    if (sF) {
      const two = t < at('fill1');
      op(wCard, 1);
      show.kav = 1;
      tr(kav, 330, 466, 0.82);
      if (two) { show.tan = 1; tr(tan, 125, 468, 0.82); } else { show.priya = 1; tr(priya, 125, 468, 0.82); }
      const all = [hlLower, hlTotCol, hlTotRow, hlBT, hlIK, hlDM, hlUpper];
      all.forEach(g => g.forEach(m => m.set(0)));
      const setHL = (g, p) => g.forEach(m => m.set(p));
      // the gaps and their answers
      const fillT = [mid('fill1', 0.85), mid('fill2', 0.42), mid('fill2', 0.9), mid('fill3', 0.22), mid('fill3', 0.5)];
      GAPS.forEach((_, i) => { const p = P(t, fillT[i], 0.3, linear); op(fills[i], p); op(qs[i], 1 - p); });
      [wTwo1, wTwo2, wF1, wF2a, wF2b, wF3a, wF3b, wF3c].forEach(w => op(w, 0));
      stampC.set(0);
      if (two) {
        op(wTwo1, P(t, mid('two', 0.08), 0.3, linear));
        op(wTwo2, P(t, mid('two', 0.55), 0.3, linear));
        setHL(hlTotCol, win(t, mid('two', 0.18), mid('two', 0.36), 0.15));
        setHL(hlTotRow, win(t, mid('two', 0.34), mid('two', 0.52), 0.15));
        setHL(hlLower, P(t, mid('two', 0.62), 0.3, linear));
        tan.set({ t, talk: scTalk(S, t, 'tan'), mood: 'neutral', look: 0.8, lift: 0.3 });
        kav.set({ t, mood: 'neutral', look: 0.6 });
      } else if (t < at('fill2')) {
        setHL(hlLower, 1);
        op(wF1, P(t, mid('fill1', 0.25), 0.3, linear));
      } else if (t < at('fill3')) {
        setHL(hlBT, 1 - P(t, mid('fill2', 0.55), 0.25, linear));
        setHL(hlIK, P(t, mid('fill2', 0.55), 0.25, linear));
        op(wF2a, P(t, mid('fill2', 0.12), 0.3, linear));
        op(wF2b, P(t, mid('fill2', 0.6), 0.3, linear));
      } else {
        setHL(hlDM, win(t, at('fill3'), mid('fill3', 0.4), 0.2));
        setHL(hlUpper, P(t, mid('fill3', 0.62), 0.3, linear));
        op(wF3a, P(t, mid('fill3', 0.05), 0.3, linear));
        op(wF3b, P(t, mid('fill3', 0.35), 0.3, linear));
        op(wF3c, P(t, mid('fill3', 0.62), 0.3, linear));
        stampC.set(P(t, mid('fill3', 0.85), 0.35, linear)); tr(stampC, 225, 220, 0.42);
      }
      if (!two) {
        const pm = who === 'priya' ? 'smug' : 'neutral';
        priya.set({ t, talk: scTalk(S, t, 'priya'), mood: pm, look: who === 'priya' ? 1 : 0.6, lift: 0 });
        kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: who === 'kavya' ? 'happy' : 'neutral', look: who === 'priya' ? -0.8 : 0.8 });
      }
    }

    /* ---------- G: no taste ---------- */
    if (sG) {
      show.rose = 1; show.kav = 1; show.priya = 1; show.tally = 1;
      tr(rose, 210, 446, 0.95); tr(kav, 480, 446, 0.95); tr(priya, 770, 450, 0.95);
      pset(cTaste, t, at('taste') + 0.05, 600, 214);
      const punch = t > mid('taste', 0.6);
      priya.set({ t, talk: scTalk(S, t, 'priya'), mood: punch ? 'annoyed' : 'sad', look: -0.5, lift: 0 });
      kav.set({ t, mood: 'deadpan', look: 0.9 });
      rose.set({ t, mood: punch ? 'happy' : 'smug', look: 0.9, lift: punch ? 0.6 : 0 });
      tr(tally, 1010, 530 - 134 * 0.6, 0.6, -6);
      tally.set({ t, mood: 'deadpan', look: 0, n: 5, arms: 0, still: true });
      op(zzz, 0.4 + 0.6 * wave(t, 1.6)); tr(zzz, 1050, 400 - 6 * wave(t, 1.6));
    }

    op(rose, show.rose); op(tan, show.tan); op(priya, show.priya); op(kav, show.kav); op(tally, show.tally);
  };
});
