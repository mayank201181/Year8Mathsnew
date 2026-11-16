/* Scene 7: Headwind (ordering decimals and clever calculation; error intervals, stretch).
   Shots (hard sitcom cuts):
   P  three     the long-jump officials' table, 3 p.m.: Dad with his clipboard, Priya, Kavya, Ah Boy; the wind gauge flicks
                through five readings; five cards; "smallest first".
      priya     Priya: −0.4 > −0.35 ? "because 0.4 > 0.35".
      left      the number line −0.5 … 0.5 arrives; Dot walks to −0.4: further left = smaller; −0.4 < −0.35.
      order     SHOWPIECE: the cards fly into order above their points: −0.4 < −0.355 < −0.35 < 0.3 < 0.305; sizes 0.400,
                0.355, 0.350.
      frog      Ah Boy's frog jump 0.609 m against Dad's 0.7 m: "more digits!"
      pad       place-value columns: 0.700 over 0.609, the tenths column lit: 7 tenths > 6 tenths.
   Q  quiz      the announcer's box: Mr Tan's quiz card 4.7 × 9.9 = ? and a 15-second timer.
   P  dist      Kavya: 9.9 = 10 − 0.1; 4.7 × 10 − 4.7 × 0.1 = 47 − 0.47 = 46.53; "distributive law".
   Q  law       a(b − c) = ab − ac; next: 0.25 × 7.3 × 4.
   P  pair      Priya swaps the 7.3 and the 4: 0.25 × 4 = 1, so 7.3.
   H  bar       4 p.m., the high jump: the Decider by the bar, 1.2 m (1 d.p.); real height h?
      bounds    number line 1.1 … 1.3: 1.15 (filled) to 1.25 (open): 1.15 ≤ h < 1.25.
      interval  lower bound in, upper bound out; 1.25 rounds UP to 1.3 (flag).
      chops     Dad's stopwatch 12.3: truncation; 12.3 ≤ t < 12.4, a whole unit wide; the Decider deadpan at Dad. Hold. */
scene('wind', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const fin = (el, t, t0, d) => { const p = P(t, t0, d || 0.3, easeOut); op(el, p); return p; };
  const GOLD = '#FFE45C', INK = MK.ink, RED = '#D32F2F', GREEN = '#1E9E5A', BLUE = '#1E5FC0', AMBER = DR_LED, GREY = '#5A6670';
  const LRED = '#FF8A8A', LGREEN = '#8FE3A8', SKY = '#9CC8FF';
  const math = (parent, x, y, src, o) => mkMath(parent, x, y, src, Object.assign({ size: 40, fill: INK, weight: 700 }, o || {}));
  const wtxt = (parent, x, y, s, o) => mkText(parent, x, y, s, Object.assign({ size: 32, fill: '#FFFFFF', anchor: 'middle', boldFill: GOLD }, o || {}));
  const outline = (el, col, w) => { el.setAttribute('stroke', col); el.setAttribute('stroke-width', w); el.setAttribute('paint-order', 'stroke'); el.setAttribute('stroke-linejoin', 'round'); return el; };
  // a wind-reading card, centred
  function card(parent, src) {
    const g = G(parent), inner = G(g);
    E('rect', { x: -72, y: -40, width: 144, height: 80, rx: 14, fill: MK.paper, stroke: '#2E6FD8', 'stroke-width': 4 }, inner);
    math(inner, 0, 15, src, { size: 40, anchor: 'middle' });
    g.inner = inner;
    return g;
  }
  // a stand of spectators
  function stand(parent, y0, y1, seed) {
    E('rect', { x: 0, y: y0, width: 1200, height: y1 - y0, fill: '#8F9CAB' }, parent);
    const r = rng(seed); let d = '';
    for (let row = 0; row < Math.floor((y1 - y0 - 20) / 40); row++) for (let x = 14; x < 1200; x += 30) d += `M${(x + r() * 8).toFixed(1)},${y0 + 26 + row * 40} m-10,0 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0 `;
    E('path', { d, fill: '#C2CCD6' }, parent);
  }

  /* ---------- layers ---------- */
  const Lset = G(root), Lpanel = G(root), Lcast = G(root), Lfront = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= P: the long-jump officials' table ================= */
  const pSet = G(Lset);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#7FD3FF', '#D6F0FF', true) }, pSet);
  stand(pSet, 120, 330, 7);
  E('rect', { x: 0, y: 330, width: 1200, height: 60, fill: '#C9563F' }, pSet);
  E('rect', { x: 0, y: 390, width: 1200, height: 360, fill: '#5BBF6A' }, pSet);
  E('path', { d: 'M0,470 L1200,450 L1200,520 L0,560 Z', fill: '#E9D7A6', stroke: '#C9B07A', 'stroke-width': 3 }, pSet);   // the sandpit
  // the wind gauge on a pole at the right
  const gauge = G(pSet);
  E('rect', { x: 1103, y: 250, width: 14, height: 340, fill: '#9AA6B2', stroke: '#5A6670', 'stroke-width': 3 }, gauge);
  E('rect', { x: 1030, y: 150, width: 160, height: 116, rx: 12, fill: '#26323C', stroke: '#14202A', 'stroke-width': 4 }, gauge);
  T(gauge, 1110, 184, 'WIND', { size: 26, weight: 800, anchor: 'middle', fill: '#9AA6B2' });
  const gaugeT = T(gauge, 1110, 240, '+0.3', { size: 42, weight: 700, anchor: 'middle', fill: '#7CF0A8' });
  const vane = G(gauge); tr(vane, 1110, 140);
  E('line', { x1: -40, y1: 0, x2: 40, y2: 0, stroke: '#5A6670', 'stroke-width': 4 }, vane);
  E('path', { d: 'M40,0 l-16,-9 l0,18 Z', fill: '#E8424F' }, vane);
  // the table
  const pFront = G(Lfront);
  E('rect', { x: 30, y: 545, width: 1140, height: 24, rx: 6, fill: '#F4F7FA', stroke: '#7D8A96', 'stroke-width': 4 }, pFront);
  E('rect', { x: 46, y: 569, width: 1108, height: 181, fill: linGrad('#1E4FA8', '#14306B', true), stroke: '#0E2A5A', 'stroke-width': 4 }, pFront);
  const cards = ['−0.35', '0.305', '−0.4', '−0.355', '0.3'].map(s => card(Lfg, s));
  const CARD0 = [180, 360, 540, 720, 900];                 // in the order Dad reads them
  const ORDER = [2, 3, 0, 4, 1];                          // card index in sorted order: −0.4, −0.355, −0.35, 0.3, 0.305
  const VAL = [-0.35, 0.305, -0.4, -0.355, 0.3];
  const c3pm = mkChip(Lfg, '**3 p.m.** · LONG JUMP', { size: 32, col: GOLD });
  const cSmall = mkChip(Lfg, 'wind readings: **smallest first**', { size: 32, col: SKY });
  const pr1 = wtxt(Lfg, 600, 650, '{{−0.4 > −0.35}} ?   because {{0.4 > 0.35}}', { size: 36, fill: LRED });
  // number line −0.5 … 0.5
  const NLX = 110, NLY = 262;
  const nl = mkNumberLine(Lfg, { from: -0.5, to: 0.5, step: 0.1, len: 880, size: 26, ink: '#14306B', labels: v => (Math.abs(v) < 1e-9 ? '0' : (v < 0 ? '-' : '') + String(+Math.abs(v).toFixed(1))) });
  tr(nl, NLX, NLY);
  const nlBg = E('rect', { x: NLX - 60, y: NLY - 34, width: 1000, height: 96, rx: 16, fill: 'rgba(255,255,255,0.78)' }, Lfg);
  Lfg.insertBefore(nlBg, nl);
  const nx = v => NLX + nl.x(v);
  const ptG = G(Lfg);
  const pts = VAL.map(v => E('circle', { cx: nx(v), cy: NLY, r: 9, fill: AMBER, stroke: INK, 'stroke-width': 3 }, ptG));
  const leaders = VAL.map(v => E('line', { x1: 0, y1: 0, x2: nx(v), y2: NLY - 10, stroke: '#14306B', 'stroke-width': 3, 'stroke-dasharray': '6 5' }, ptG));
  const smallA = G(Lfg);
  arrow(smallA, nx(0.42), NLY - 66, nx(-0.08), NLY - 66, { color: RED, width: 6 });
  const smallT = outline(T(smallA, nx(0.17), NLY - 90, 'further left = smaller', { size: 30, weight: 800, anchor: 'middle', fill: RED }), '#FFFFFF', 7);
  const lf1 = wtxt(Lfg, 600, 650, '{{−0.4 < −0.35}}', { size: 46, fill: LGREEN });
  const or1 = wtxt(Lfg, 600, 630, '{{−0.4 < −0.355 < −0.35 < 0.3 < 0.305}}', { size: 38, fill: LGREEN });
  const or2 = wtxt(Lfg, 600, 680, 'sizes {{0.400 > 0.355 > 0.350}}: bigger size, **smaller** number', { size: 28, fill: '#FFFFFF' });
  // frog jump
  const frogG = G(Lfg);
  const sign = (x, name, val, col) => {
    const g = G(frogG); tr(g, x, 210);
    E('rect', { x: -170, y: -70, width: 340, height: 140, rx: 18, fill: MK.paper, stroke: col, 'stroke-width': 6 }, g);
    T(g, 0, -24, name, { size: 30, weight: 800, anchor: 'middle', fill: col });
    math(g, 0, 46, val, { size: 56, anchor: 'middle' });
    return g;
  };
  const sBoy = sign(330, 'AH BOY', '0.609 "m"', '#E8742A'), sDad = sign(770, 'DAD', '0.7 "m"', GREEN);
  const bubMore = mkSpeechBubble(Lfg, 'I win! **More digits!**', { size: 30, tail: 'down', tailX: 40 });
  // place-value columns
  const pvG = G(Lfg);
  E('rect', { x: 120, y: 112, width: 900, height: 206, rx: 18, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, pvG);
  const PVX = [420, 560, 710, 860], PVP = 490;          // ones, tenths, hundredths, thousandths; the point between
  const tenthHi = E('rect', { x: 524, y: 160, width: 72, height: 150, rx: 10, fill: 'rgba(255,228,92,0.75)' }, pvG);
  ['ones', 'tenths', 'hundredths', 'thousandths'].forEach((h, k) => T(pvG, PVX[k], 150, h, { size: 26, weight: 700, anchor: 'middle', fill: GREY }));
  const pvRow = (y, name, digs, grey) => {
    T(pvG, 150, y, name, { size: 32, weight: 800, anchor: 'start', fill: INK });
    E('circle', { cx: PVP, cy: y - 6, r: 7, fill: INK }, pvG);
    return digs.split('').map((d, k) => T(pvG, PVX[k], y, d, { size: 60, weight: 700, anchor: 'middle', fill: grey && k >= grey ? '#9AA6B2' : INK }));
  };
  const rowDad = pvRow(220, 'DAD', '0700', 2), rowBoy = pvRow(292, 'AH BOY', '0609');
  const pd1 = wtxt(Lfg, 600, 650, 'line up the points:  **7** tenths > **6** tenths, so {{0.7 > 0.609}}', { size: 34 });
  // Kavya's working
  const wk = mkWorking(Lfg, 520, 124, ['9.9 = 10 − 0.1', '4.7 × 9.9 = 4.7 × 10 − 4.7 × 0.1', '= 47 − 0.47', '= 46.53'], { size: 36, fill: INK, gap: 16 });
  const wkBg = E('rect', { x: wk.left - 40, y: 106, width: wk.w + 80, height: wk.h + 46, rx: 18, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, Lfg);
  Lfg.insertBefore(wkBg, wk);
  const cDist = mkChip(Lfg, 'the **distributive law**', { size: 34, col: GOLD });
  // Priya's swap
  const swG = G(Lfg);
  E('rect', { x: 230, y: 108, width: 740, height: 214, rx: 18, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, swG);
  const SW = { size: 56 };
  const pc = ['0.25', '×', '7.3', '×', '4'].map(s => math(swG, 0, 0, s, SW));
  const pw = pc.map(m => m.w), GAP = 18;
  const layout = order => { const ws = order.map(i => pw[i]); const tot = ws.reduce((a, b) => a + b, 0) + GAP * 4; let x = 600 - tot / 2; const xs = {}; order.forEach((i, k) => { xs[i] = x; x += ws[k] + GAP; }); return xs; };
  const LA = layout([0, 1, 2, 3, 4]), LB = layout([0, 1, 4, 3, 2]);
  const swBr = mkBrace(swG, LB[0], 192, LB[4] + pw[4], 192, { col: GREEN, depth: 14, flip: true, text: '{{= 1}}', size: 30 });
  const swR = math(swG, 600, 300, '= 1 × 7.3 = 7.3', { size: 48, anchor: 'middle', fill: GREEN });
  const cPair = mkChip(Lfg, 'look for pairs: {{0.25 × 4 = 1}},  {{0.5 × 2 = 1}}', { size: 32, col: GOLD });

  /* ================= Q: the announcer's box ================= */
  const qSet = G(Lset);
  const booth = drBooth(qSet);
  const qFront = G(Lfront); qFront.appendChild(booth.front); qFront.appendChild(booth.top);
  const qb = G(Lfg);
  const qwb = mkWhiteboard(qb, 520, 300); tr(qwb, 850, 262);
  T(qb, 620, 158, 'QUIZ!', { size: 40, weight: 800, anchor: 'start', fill: '#E8424F' });
  const q1 = math(qb, 850, 270, '4.7 × 9.9 = ?', { size: 54, anchor: 'middle' });
  const q2 = math(qb, 850, 236, 'a(b − c) = ab − ac', { size: 46, anchor: 'middle', fill: BLUE });
  const q3l = mkText(qb, 850, 304, 'Next:', { size: 30, fill: GREY, anchor: 'middle' });
  const q3 = math(qb, 850, 364, '0.25 × 7.3 × 4', { size: 50, anchor: 'middle' });
  const timer = G(qb); tr(timer, 1040, 158);
  E('circle', { r: 34, fill: '#FFFFFF', stroke: '#C9D3DC', 'stroke-width': 8 }, timer);
  const tArc = E('path', { d: '', fill: 'none', stroke: RED, 'stroke-width': 8, 'stroke-linecap': 'round' }, timer);
  const tNum = T(timer, 0, 11, '15', { size: 30, weight: 800, anchor: 'middle', fill: INK });

  /* ================= H: the high jump ================= */
  const hSet = G(Lset);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#7FD3FF', '#D6F0FF', true) }, hSet);
  stand(hSet, 150, 330, 21);
  E('rect', { x: 0, y: 330, width: 1200, height: 420, fill: '#5BBF6A' }, hSet);
  const BARY = 330;
  [140, 480].forEach(x => {
    E('rect', { x: x - 9, y: 220, width: 18, height: 360, fill: '#C9D3DC', stroke: '#5A6670', 'stroke-width': 3 }, hSet);
    E('rect', { x: x - 30, y: 572, width: 60, height: 14, rx: 4, fill: '#5A6670' }, hSet);
  });
  let tk = '';
  for (let y = 240; y < 570; y += 20) tk += `M131,${y} l-12,0 `;
  E('path', { d: tk, stroke: '#5A6670', 'stroke-width': 3 }, hSet);
  const barG = G(hSet);
  E('rect', { x: 140, y: BARY - 7, width: 340, height: 14, rx: 7, fill: '#FFE45C', stroke: SC_INK, 'stroke-width': 3 }, barG);
  for (let x = 160; x < 470; x += 48) E('rect', { x, y: BARY - 5, width: 22, height: 10, fill: '#E8424F' }, barG);
  const hFront = G(Lfront);
  E('rect', { x: 0, y: 560, width: 1200, height: 190, rx: 0, fill: linGrad('#2E6FD8', '#1E4FA8', true), stroke: '#14306B', 'stroke-width': 4 }, hFront);
  E('path', { d: 'M0,590 L1200,590', stroke: '#FFFFFF', 'stroke-width': 4, opacity: 0.4 }, hFront);
  const cBar = mkChip(Lfg, '**4 p.m.** · HIGH JUMP · **STRETCH**', { size: 32, col: GOLD });
  const cH = mkChip(Lfg, '{{1.2 "m"}} (to **1 d.p.**)', { size: 32, col: '#FFFFFF' });
  const bubH = mkThoughtBubble(Lfg, 'real height {{h}} ?', { size: 32, tail: 'down' });
  // the error-interval panel
  const panel = G(Lpanel);
  E('rect', { x: 40, y: 104, width: 1120, height: 252, rx: 20, fill: '#0A1B27', stroke: '#9CC8FF', 'stroke-width': 3 }, panel);
  const pA = G(panel), pB = G(panel);
  // A: 1.1 … 1.3
  const nlA = mkNumberLine(pA, { from: 1.1, to: 1.3, step: 0.05, minor: 5, len: 820, size: 28, labels: [[1.1, '1.1'], [1.15, '1.15'], [1.2, '1.2'], [1.25, '1.25'], [1.3, '1.3']] });
  tr(nlA, 190, 236);
  const ax = v => 190 + nlA.x(v);
  const bandA = E('rect', { x: ax(1.15), y: 222, width: ax(1.25) - ax(1.15), height: 28, rx: 6, fill: 'rgba(86,214,155,0.55)' }, pA);
  pA.insertBefore(bandA, nlA);
  const dotA1 = E('circle', { cx: ax(1.15), cy: 236, r: 13, fill: '#56D69B', stroke: '#FFFFFF', 'stroke-width': 4 }, pA);
  const dotA2 = E('circle', { cx: ax(1.25), cy: 236, r: 13, fill: '#0A1B27', stroke: '#56D69B', 'stroke-width': 5 }, pA);
  const hDot = E('circle', { cx: ax(1.2), cy: 236, r: 9, fill: GOLD, stroke: '#FFFFFF', 'stroke-width': 3 }, pA);
  const ineqA = math(pA, 600, 176, '1.15 <= h < 1.25', { size: 50, anchor: 'middle', fill: '#FFFFFF' });
  const inLab = mkText(pA, ax(1.15), 340, '**≤** lower bound: **in**', { size: 28, fill: '#FFFFFF', boldFill: '#56D69B', anchor: 'middle' });
  const outLab = mkText(pA, ax(1.25) + 30, 340, '**<** upper bound: **out**', { size: 28, fill: '#FFFFFF', boldFill: LRED, anchor: 'middle' });
  const halfA = G(pA);
  arrow(halfA, ax(1.2), 196, ax(1.15) + 6, 196, { color: GOLD, width: 4 });
  arrow(halfA, ax(1.2), 196, ax(1.25) - 6, 196, { color: GOLD, width: 4 });
  // B: truncation, 12.2 … 12.5
  const swB = drStopwatch(pB, { text: '12.3', s: 0.82 }); tr(swB, 160, 236);
  const nlB = mkNumberLine(pB, { from: 12.2, to: 12.5, step: 0.1, minor: 10, len: 660, size: 28, labels: [[12.2, '12.2'], [12.3, '12.3'], [12.4, '12.4'], [12.5, '12.5']] });
  tr(nlB, 380, 250);
  const bx = v => 380 + nlB.x(v);
  const bandB = E('rect', { x: bx(12.3), y: 236, width: bx(12.4) - bx(12.3), height: 28, rx: 6, fill: 'rgba(255,182,39,0.55)' }, pB);
  pB.insertBefore(bandB, nlB);
  E('circle', { cx: bx(12.3), cy: 250, r: 13, fill: AMBER, stroke: '#FFFFFF', 'stroke-width': 4 }, pB);
  E('circle', { cx: bx(12.4), cy: 250, r: 13, fill: '#0A1B27', stroke: AMBER, 'stroke-width': 5 }, pB);
  const ineqB = math(pB, 710, 170, '12.3 <= t < 12.4', { size: 50, anchor: 'middle', fill: '#FFFFFF' });
  const wideB = mkText(pB, bx(12.35), 214, 'a whole unit', { size: 26, fill: AMBER, anchor: 'middle' });
  // mat texts
  const bd1 = wtxt(Lfg, 600, 650, 'half of {{0.1}} is {{0.05}}:  {{1.2 − 0.05 = 1.15}},  {{1.2 + 0.05 = 1.25}}', { size: 32 });
  const iv1 = wtxt(Lfg, 600, 650, 'the **error interval**:  {{1.25}} rounds **up** to {{1.3}}, so it is **out**', { size: 32 });
  const cTrunc = mkChip(Lfg, '**truncation** chops, it doesn\'t round', { size: 32, col: AMBER });

  /* ================= the cast ================= */
  const dad = cast(Lcast, 'dad', { watch: false });
  const clip = G(dad.hand); scClipboard(clip, 0.42); tr(clip, 0, -40);
  const dWatch = drStopwatch(dad.hand, { s: 0.42, text: '12.3' }); tr(dWatch, 0, -46);
  const priya = cast(Lcast, 'priya');
  const kav = cast(Lcast, 'kavya');
  const boy = cast(Lcast, 'boy');
  const coin = G(boy.hand); tr(coin, 0, -34);
  E('circle', { r: 30, fill: ball('#F0A868', '#9A5A28'), stroke: SC_INK, 'stroke-width': 3 }, coin);
  T(coin, 0, 11, '1¢', { size: 30, weight: 800, anchor: 'middle', fill: '#4A2408' });
  const tan = cast(Lcast, 'tan');
  const ref = cast(Lcast, 'ref');
  const dot = cast(Lfg, 'dot');

  /* ---------- shots ---------- */
  const cut = id => at(id) - 0.06;
  const SHOTS = [['P', -9], ['Q', cut('quiz')], ['P', cut('dist')], ['Q', cut('law')], ['P', cut('pair')], ['H', cut('bar')]];
  const shotAt = t => { let s = 'P'; for (const [k, t0] of SHOTS) if (t >= t0) s = k; return s; };
  const PX = { dad: 170, priya: 400, kavya: 640, boy: 870 };
  const HX = { kavya: 650, ref: 880, dad: 1080 };
  const look = (map, t, me) => { const w = scWho(S, t); if (!w || w === me || map[w] === undefined) return w === 'dot' ? 0 : 0; return clamp((map[w] - map[me]) / 240, -0.9, 0.9); };
  // card positions: in a row at Dad's order, then sorted (order line)
  const cardAt = (i, t) => {
    const sorted = ORDER.indexOf(i);
    const p = P(t, mid('order', 0.08) + sorted * 0.12, 0.6, ease);
    const x0 = CARD0[i], x1 = 150 + sorted * 200;
    return [lerp(x0, x1, p), 158 - Math.sin(p * Math.PI) * 26, p];
  };

  return t => {
    const sh = shotAt(t);
    const Ps = sh === 'P', Qs = sh === 'Q', Hs = sh === 'H';
    op(pSet, Ps ? 1 : 0); op(pFront, Ps ? 1 : 0); op(qSet, Qs ? 1 : 0); op(qFront, Qs ? 1 : 0); op(hSet, Hs ? 1 : 0); op(hFront, Hs ? 1 : 0);
    // hide every foreground item, then show what this moment needs
    [...cards, nl, nlBg, ptG, smallA, pr1, lf1, or1, or2, frogG, pvG, pd1, wk, wkBg, swG, qb, panel, bd1, iv1].forEach(e => op(e, 0));
    [c3pm, cSmall, bubMore, cDist, cPair, cBar, cH, bubH, cTrunc].forEach(c => c.set(0));
    [dad, priya, kav, boy, tan, ref, dot].forEach(c => op(c, 0));
    op(coin, 1);
    const who = scWho(S, t);
    const show = (c, x, y, s, st) => { op(c, 1); tr(c, x, y, s); c.set(Object.assign({ t, talk: scTalk(S, t, c === kav ? 'kavya' : c === dad ? 'dad' : c === priya ? 'priya' : c === boy ? 'boy' : c === tan ? 'tan' : c === ref ? 'ref' : 'dot') }, st)); };

    if (Ps) {
      const sTwo = t < cut('quiz'), sDist = t >= cut('dist') && t < cut('law'), sPair = t >= cut('pair');
      // the gauge flicks through the readings while Dad reads them
      const gi = Math.floor(clamp((t - at('three')) / (end('three') - at('three')), 0, 0.999) * 5);
      setText(gaugeT, t < end('three') ? ['−0.35', '+0.305', '−0.4', '−0.355', '+0.3'][gi] : '+0.3');
      tr(vane, 1110, 140, 1, Math.sin(t * 1.3) * 14 * AMP);
      // cast
      let md = 'neutral', mp = 'neutral', mk = 'neutral', mb = 'happy';
      if (t < at('priya')) { md = 'smug'; }
      else if (t < at('left')) { mp = 'smug'; md = 'deadpan'; mk = 'deadpan'; }
      else if (t < at('frog')) { mp = t < at('order') ? 'annoyed' : 'sad'; mk = 'smug'; md = 'neutral'; }
      else if (t < at('pad')) { mb = 'happy'; md = 'deadpan'; mk = 'deadpan'; mp = 'smug'; }
      else if (t < cut('quiz')) { mb = t > mid('pad', 0.6) ? 'sad' : 'happy'; md = 'smug'; mk = 'neutral'; }
      if (sDist) { mk = 'smug'; md = 'shock'; mp = 'annoyed'; mb = 'happy'; }
      if (sPair) { mp = 'smug'; mk = 'happy'; md = 'deadpan'; mb = 'shock'; }
      show(dad, PX.dad, 470, 0.85, { mood: md, look: look(PX, t, 'dad'), lift: t < at('priya') ? 1 : 0 });
      op(clip, 1); op(dWatch, 0);
      show(priya, PX.priya, 476, 0.85, { mood: mp, look: look(PX, t, 'priya') });
      show(kav, PX.kavya, 474, 0.85, { mood: mk, look: look(PX, t, 'kavya') });
      show(boy, PX.boy, 482, 0.85, { mood: mb, look: who === 'dot' ? -0.6 : look(PX, t, 'boy'), lift: t >= at('frog') && t < at('pad') ? 1 : 0 });
      op(coin, 1);

      if (sTwo) {
        // the five cards
        const cardsOn = t < at('frog');
        cards.forEach((c, i) => {
          if (!cardsOn || (t >= at('left') && t < at('order') - 0.1)) return;
          const p = P(t, mid('three', 0.35) + i * 0.16, 0.4, pop);
          const [x, y] = cardAt(i, t);
          op(c, clamp(p * 3)); tr(c, x, y); tr(c.inner, 0, 0, Math.max(0.01, 0.6 + 0.4 * p));
        });
        if (t < at('priya')) {
          c3pm.set(P(t, at('three') + 0.05, 0.35, linear)); tr(c3pm, 420, 640);
          cSmall.set(P(t, mid('three', 0.7), 0.35, linear)); tr(cSmall, 830, 640);
        } else if (t < at('left')) op(pr1, fin(pr1, t, mid('priya', 0.15)));
        // number line from 'left'
        if (t >= at('left') && cardsOn) {
          op(nl, fin(nl, t, at('left'))); op(nlBg, P(t, at('left'), 0.3, linear));
          op(ptG, 1);
          pts.forEach((p, i) => op(p, t < at('order') ? (i === 0 || i === 2 ? P(t, mid('left', 0.3), 0.25, linear) : 0) : P(t, mid('order', 0.08) + ORDER.indexOf(i) * 0.12 + 0.5, 0.25, linear)));
          leaders.forEach((l, i) => {
            const [x, y, p] = cardAt(i, t);
            attr(l, 'x1', x); attr(l, 'y1', y + 40);
            op(l, t >= at('order') && p >= 1 ? 1 : 0);
          });
          if (t < at('order')) {
            op(smallA, P(t, mid('left', 0.45), 0.3, linear));
            op(lf1, fin(lf1, t, mid('left', 0.6)));
            // Dot walks along the line to −0.4
            const w = P(t, at('left') + 0.2, 1.4, ease);
            show(dot, lerp(nx(-0.1), nx(-0.4), w), NLY - 52 - Math.abs(Math.sin(w * Math.PI * 4)) * 8 * (w < 1 ? 1 : 0), 0.42, { mood: 'smug', look: -0.6, point: w >= 1 ? -1 : 0 });
          } else {
            op(or1, fin(or1, t, mid('order', 0.55))); op(or2, fin(or2, t, mid('order', 0.75)));
          }
        }
        // frog jump
        if (t >= at('frog') && t < at('pad')) {
          op(frogG, 1);
          tr(sBoy, 330, 210); op(sBoy, fin(sBoy, t, at('frog') + 0.05)); op(sDad, fin(sDad, t, mid('frog', 0.3)));
          bubMore.set(P(t, mid('frog', 0.6), 0.35, linear)); tr(bubMore, 830, 360);
        }
        if (t >= at('pad')) {
          op(pvG, fin(pvG, t, at('pad')));
          rowDad.forEach((d, k) => op(d, k < 2 ? 1 : P(t, mid('pad', 0.2) + (k - 2) * 0.25, 0.3, linear)));
          op(tenthHi, P(t, mid('pad', 0.45), 0.3, linear)); 
          op(pd1, fin(pd1, t, mid('pad', 0.7)));
        }
      } else if (sDist) {
        op(wkBg, 1); op(wk, 1);
        [0.05, 0.3, 0.55, 0.78].forEach((f, i) => wk.show(i, P(t, mid('dist', f), 0.35, linear)));
        wk.ring(3, P(t, mid('dist', 0.88), 0.2, linear));
        cDist.set(P(t, mid('dist', 0.4), 0.35, linear)); tr(cDist, 600, 650);
      } else if (sPair) {
        op(swG, 1);
        const sw = P(t, mid('pair', 0.1), 0.6, ease);
        pc.forEach((m, i) => {
          const x = lerp(LA[i], LB[i], sw), arc = (i === 2 ? -1 : i === 4 ? 1 : 0) * Math.sin(sw * Math.PI) * 60;
          tr(m, x, 172 + arc);
        });
        swBr.set(P(t, mid('pair', 0.4), 0.35, linear));
        op(swR, fin(swR, t, mid('pair', 0.62)));
        cPair.set(P(t, mid('pair', 0.5), 0.35, linear)); tr(cPair, 600, 650);
      }
    } else if (Qs) {
      booth.upd(t);
      show(tan, 410, 448, 1.12, { mood: 'happy', look: 0.6, lift: 1 });
      op(qb, 1);
      const isQuiz = t < cut('dist');
      const t0 = isQuiz ? mid('quiz', 0.55) : mid('law', 0.75);
      op(q1, isQuiz ? fin(q1, t, at('quiz') + 0.1) : 0);
      op(q2, isQuiz ? 0 : fin(q2, t, at('law') + 0.1)); op(q3l, isQuiz ? 0 : fin(q3l, t, mid('law', 0.5))); op(q3, isQuiz ? 0 : fin(q3, t, mid('law', 0.55)));
      const left = 15 - clamp(t - t0, 0, 15), frac = left / 15;
      setText(tNum, String(Math.ceil(left)));
      attr(tArc, 'd', frac > 0.999 ? 'M0,-34 A34,34 0 1 1 -0.01,-34' : mkArcD(0, 0, 34, -90, -90 + 360 * frac));
      op(timer, t > t0 - 0.4 ? 1 : 0);
    } else {
      /* ---------- H: the high jump ---------- */
      const sBar = t < at('bounds'), sB = t >= at('bounds') && t < at('interval'), sI = t >= at('interval') && t < at('chops'), sC = t >= at('chops');
      const flagUp = sI && t > mid('interval', 0.55);
      show(kav, HX.kavya, 492, 0.9, { mood: sBar ? 'neutral' : sB ? 'smug' : sI ? 'neutral' : 'deadpan', look: look(HX, t, 'kavya') });
      show(ref, HX.ref, 470, 0.9, { mood: 'deadpan', look: sC ? 0.9 : look(HX, t, 'ref'), flag: flagUp ? 1 : 0, whistle: 0 });
      show(dad, HX.dad, 492, 0.9, { mood: sC ? (t < mid('chops', 0.8) ? 'smug' : 'deadpan') : 'neutral', look: look(HX, t, 'dad'), lift: sC ? 1 : 0 });
      op(clip, 0); op(dWatch, 1); dWatch.set('12.3');
      if (sBar) {
        cBar.set(P(t, at('bar') + 0.05, 0.35, linear)); tr(cBar, 840, 130);
        cH.set(P(t, mid('bar', 0.35), 0.35, linear)); tr(cH, 310, 270);
        bubH.set(P(t, mid('bar', 0.65), 0.35, linear)); tr(bubH, 700, 250);
      } else {
        const pp = P(t, at('bounds') - 0.06, 0.3, easeOut);
        op(panel, pp); tr(panel, 0, -24 * (1 - pp));
        op(pA, sC ? 0 : 1); op(pB, sC ? 1 : 0);
        if (!sC) {
          op(halfA, P(t, mid('bounds', 0.15), 0.3, linear) * (sI ? 0 : 1));
          op(dotA1, P(t, mid('bounds', 0.35), 0.25, linear)); op(dotA2, P(t, mid('bounds', 0.45), 0.25, linear));
          op(bandA, P(t, mid('bounds', 0.5), 0.3, linear)); op(ineqA, fin(ineqA, t, mid('bounds', 0.62)));
          op(inLab, sI ? fin(inLab, t, mid('interval', 0.15)) : 0); op(outLab, sI ? fin(outLab, t, mid('interval', 0.35)) : 0);
          if (sB) op(bd1, fin(bd1, t, mid('bounds', 0.2)));
          if (sI) op(iv1, fin(iv1, t, mid('interval', 0.5)));
        } else {
          op(swB, fin(swB, t, at('chops') + 0.05));
          op(ineqB, fin(ineqB, t, mid('chops', 0.4))); op(wideB, P(t, mid('chops', 0.55), 0.3, linear));
          cTrunc.set(P(t, mid('chops', 0.2), 0.35, linear)); tr(cTrunc, 600, 650);
        }
      }
    }
  };
});
