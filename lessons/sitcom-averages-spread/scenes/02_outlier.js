/* Scene 2: A word from our sponsor (outliers and choosing an average).
   Shots (hard sitcom cuts):
   AD   the Boba Boss advert: NOW HIRING, "Mean monthly pay: $4000!", Benny reading it.
   W    Studio 5: Mum is applying, today (a form in her hand); Dad in shock.
   CH   the pay chart on the big screen: six workers' bars ($2400 to $3000) -> Otto rises with the owner's $12 200 bar
        -> the dashed mean line, with Mean clinging to it, is dragged up to $4000 (the sum, 28 000 ÷ 7 = 4000), above
        every worker -> the median line stays at $2600, Medi on it; the two $2500 bars (mode) glow -> Ranger's tape
        from $2400 to $12 200: 9800 -> Ah Boy's eraser -> Kavya's checklist -> Mean straightens, then tilts again.
   SCR  the screen with two humans: ROUND 2, WHICH AVERAGE? shoe shop (mode), flat prices (median), test marks
        (mean) -> Dad's 100 m times, "average 12.8!" -> Mo on top of the screen: the mode -> Mean: 13.3 s, median
        13.2 s, range 1.3 s, the table -> Dad picks the mode.
   TH   Mean's confessional: "That is not fair." Slow push-in. */
scene('outlier', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const popSet = (el, t, t0, t1, x, y) => { const p = t >= t0 && t < t1 ? P(t, t0, 0.35, linear) : 0; el.set(p); if (x !== undefined) tr(el, x, y); };
  const fade = (el, t, t0, t1) => op(el, t < t0 || t >= t1 ? 0 : P(t, t0, 0.3, linear));
  const GOLD = AS.gold, PINK = '#FF5FC8', RED = '#D32F2F', GREEN = '#1E9E5A', BLUE = '#2E6FD8', AMBER = '#B57B12';
  const TILE = '#FFE7A3', TILE_PINK = '#FF9FD0';
  const outline = (w, col, sw) => { w.setAttribute('stroke', col); w.setAttribute('stroke-width', sw || 10); w.setAttribute('paint-order', 'stroke'); w.setAttribute('stroke-linejoin', 'round'); };
  const mkTile = (parent, txt) => {
    const g = G(parent), w = 92, h = 60;
    g.ring = E('rect', { x: -w / 2 - 8, y: -h / 2 - 8, width: w + 16, height: h + 16, rx: 16, fill: 'none', stroke: GREEN, 'stroke-width': 6 }, g);
    g.box = E('rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: 12, fill: TILE, stroke: MK.ink, 'stroke-width': 4 }, g);
    T(g, 0, 12, txt, { size: 34, weight: 800, anchor: 'middle', fill: MK.ink });
    g.hl = p => attr(g.box, 'fill', p > 0.5 ? TILE_PINK : TILE);
    g.rg = p => op(g.ring, p);
    g.rg(0);
    return g;
  };

  /* layers */
  const Lbg = G(root), Lcard = G(root), Lcast = G(root), Lfront = G(root), Lmid = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= AD: the Boba Boss advert ================= */
  const adShot = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#FF7CC8', '#B8287A', true) }, adShot);
  let rays = '';
  for (let i = 0; i < 18; i++) { const a0 = i / 18 * TAU, a1 = a0 + TAU / 44; rays += `M0,0 L${(Math.cos(a0) * 1100).toFixed(0)},${(Math.sin(a0) * 1100).toFixed(0)} L${(Math.cos(a1) * 1100).toFixed(0)},${(Math.sin(a1) * 1100).toFixed(0)} Z `; }
  const adRays = E('path', { d: rays, fill: '#FFFFFF', opacity: 0.1 }, adShot);
  const adLogo = G(adShot);
  const lg1 = T(adLogo, 0, 0, 'BOBA BOSS', { size: 92, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 4 });
  outline(lg1, '#5A0E3A', 12);
  T(adLogo, 0, 46, 'bubble tea', { size: 32, weight: 700, anchor: 'middle', fill: '#FFE3F3', ls: 6 });
  tr(adLogo, 640, 200);
  const adHire = G(adShot);
  E('rect', { x: -200, y: -42, width: 400, height: 84, rx: 18, fill: '#FFE45C', stroke: '#5A0E3A', 'stroke-width': 6 }, adHire);
  T(adHire, 0, 18, 'NOW HIRING!', { size: 50, weight: 800, anchor: 'middle', fill: '#5A0E3A', ls: 2 });
  tr(adHire, 610, 330, 1, -3);
  const adPay = G(adShot);
  E('rect', { x: -300, y: -50, width: 600, height: 100, rx: 22, fill: '#2A0B24', stroke: GOLD, 'stroke-width': 5 }, adPay);
  mkText(adPay, 0, 16, 'Mean monthly pay: **$4000!**', { size: 44, anchor: 'middle', fill: '#FFFFFF', boldFill: GOLD });
  tr(adPay, 640, 460);
  const adFine = mkText(adShot, 640, 560, '*the mean of all 7 staff, boss included', { size: 26, anchor: 'middle', fill: '#FFE3F3' });
  // the cup
  const cup = G(adShot); tr(cup, 1040, 470);
  E('path', { d: 'M-70,-110 L70,-110 L54,110 L-54,110 Z', fill: '#F4D9B8', stroke: '#5A0E3A', 'stroke-width': 6, 'stroke-linejoin': 'round' }, cup);
  E('path', { d: 'M-62,-40 L62,-40 L54,110 L-54,110 Z', fill: '#C98A5A', stroke: '#5A0E3A', 'stroke-width': 5, 'stroke-linejoin': 'round' }, cup);
  let pearls = '';
  for (let i = 0; i < 9; i++) { const x = -38 + (i % 5) * 19 + (i > 4 ? 9 : 0), y = 88 - (i > 4 ? 18 : 0); pearls += `M${x},${y} m-8,0 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0 `; }
  E('path', { d: pearls, fill: '#2A1A22' }, cup);
  E('ellipse', { cx: 0, cy: -110, rx: 76, ry: 16, fill: '#FFFFFF', stroke: '#5A0E3A', 'stroke-width': 5 }, cup);
  E('path', { d: 'M14,-110 L40,-190', stroke: '#FF5FA2', 'stroke-width': 14, 'stroke-linecap': 'round' }, cup);
  const adSparks = [[860, 130], [1130, 300], [380, 420]].map(([x, y], i) => { const s = spark(adShot, 18, { seed: i + 1, color: '#FFF7C2' }); tr(s, x, y); return s; });

  /* ================= W: Studio 5 ================= */
  const studioShot = G(Lbg);
  const studio = asStudio(studioShot);
  Lfront.appendChild(studio.front); Lfront.appendChild(studio.top);
  const carrier = asCarrier(studio.top); tr(carrier, 1100, 530, 0.7);
  ['?', '?', '?', '?'].forEach((s, i) => studio.board.set(i, s));
  const cApply = mkChip(Lfg, '**$4000**?! Applying. **Today.**', { size: 30, col: GOLD });

  /* ================= CH: the pay chart ================= */
  const chShot = G(Lbg);   // the studio back wall shows behind the screen
  const chScr = asScreen(Lcard, 1080, 520, { title: 'BOBA BOSS: MONTHLY PAY' });
  const CX = 600, CYS = 405;
  const ch = G(Lcard);   // chart in stage coordinates
  const AX = 190, BASE = 600, KP = 350 / 12200, YV = v => BASE - v * KP, BXc = i => 240 + i * 72;
  const PAY = [2400, 2500, 2500, 2600, 2800, 3000, 12200];
  let grid = '';
  [4000, 8000, 12000].forEach(v => { grid += `M${AX},${YV(v).toFixed(1)} L700,${YV(v).toFixed(1)} `; });
  E('path', { d: grid, stroke: MK.gridInk, 'stroke-width': 2, 'stroke-dasharray': '6 6' }, ch);
  [[4000, '$4000'], [8000, '$8000'], [12000, '$12 000']].forEach(([v, s]) => T(ch, AX - 10, YV(v) + 9, s, { size: 26, weight: 700, anchor: 'end', fill: '#5A6670' }));
  const pBars = PAY.map((v, i) => E('rect', { x: BXc(i) - 24, y: BASE, width: 48, height: 0, rx: 4, fill: i === 6 ? '#9C6BFF' : '#FFC247', stroke: MK.ink, 'stroke-width': 3 }, ch));
  const pVals = PAY.map((v, i) => T(ch, BXc(i), BASE + 32, i === 6 ? '12 200' : String(v), { size: 26, weight: 700, anchor: 'middle', fill: i === 6 ? '#7A4AD8' : MK.ink }));
  E('path', { d: `M${AX},${YV(13000)} L${AX},${BASE} L705,${BASE}`, fill: 'none', stroke: MK.ink, 'stroke-width': 4, 'stroke-linecap': 'round' }, ch);
    const meanL = E('line', { x1: AX - 6, y1: 0, x2: 700, y2: 0, stroke: RED, 'stroke-width': 5, 'stroke-dasharray': '14 9' }, ch);
  const medL = E('line', { x1: AX - 6, y1: YV(2600), x2: 700, y2: YV(2600), stroke: GREEN, 'stroke-width': 5 }, ch);
  mkDash(medL);
  // Ranger's tape (vertical, beside the owner's bar)
  const tapeG = G(ch);
  const tapeR = E('rect', { x: 716, y: YV(2400), width: 24, height: 0, fill: '#FFD23C', stroke: MK.ink, 'stroke-width': 3 }, tapeG);
  const tapeEnds = [2400, 12200].map(v => E('line', { x1: 702, y1: YV(v), x2: 752, y2: YV(v), stroke: MK.ink, 'stroke-width': 4 }, tapeG));
  // the stats panel
  const panel = G(ch);
  E('rect', { x: 925, y: 214, width: 200, height: 340, rx: 16, fill: '#1A0B36', stroke: GOLD, 'stroke-width': 4 }, panel);
  const ROWS = [['mean', '$4000', '#FF8A8A'], ['median', '$2600', '#7EE0A6'], ['mode', '$2500', '#FF9FD0'], ['range', '$9800', '#FFD23C']];
  const pVal = [];
  const pRows = ROWS.map(([n, v, col], i) => { const g = G(panel); T(g, 940, 268 + i * 66, n, { size: 28, weight: 700, fill: col }); pVal.push(T(g, 1112, 268 + i * 66, v, { size: 28, weight: 800, anchor: 'end', fill: '#FFFFFF' })); return g; });
  E('line', { x1: 940, y1: 278, x2: 1010, y2: 278, stroke: RED, 'stroke-width': 4, 'stroke-dasharray': '10 6' }, pRows[0]);
  E('line', { x1: 940, y1: 344, x2: 1036, y2: 344, stroke: '#7EE0A6', 'stroke-width': 4 }, pRows[1]);
  const cNoOtto = G(panel); E('line', { x1: 940, y1: 490, x2: 1110, y2: 490, stroke: '#5B2A9E', 'stroke-width': 2 }, cNoOtto); mkText(cNoOtto, 1025, 530, 'no Otto: **$600**', { size: 26, anchor: 'middle', fill: '#FFD23C' });
  // the work area (above the workers' bars)
  const cWork = mkChip(ch, 'workers: **$2400** to **$3000**', { size: 30, col: AMBER, fill: '#FFF4D6' }); tr(cWork, 420, 300);
  const cOut = mkChip(ch, '**outlier**: far from the rest', { size: 30, col: '#7A4AD8', fill: '#F1E8FF' }); tr(cOut, 420, 300);
  const wDrag = mkWorking(ch, 436, 222, ['2400 + 2500 + 2500 + 2600 + 2800', '+ 3000 + 12 200 = 28 000', '28 000 ÷ 7 = 4000'], { size: 28, fill: MK.ink, gap: 12, ringCol: RED });
  const cAbove = mkChip(ch, 'above **every** worker!', { size: 28, col: RED, fill: '#FFE8E8' }); tr(cAbove, 470, 398);
  const wRng = mkMath(ch, 420, 300, '12 200 − 2400 = 9800', { size: 40, fill: MK.ink, anchor: 'middle' });
  // Kavya's checklist
  const why = G(ch);
  E('rect', { x: 204, y: 214, width: 424, height: 214, rx: 16, fill: '#FFFFFF', stroke: BLUE, 'stroke-width': 4 }, why);
  const whyL = ['Outlier? Ask **why**.', 'mistake? → **fix it**', 'real? → **keep it**, use the **median**'].map((s, i) => mkText(why, 222, 262 + i * 62, s, { size: 28, fill: MK.ink, boldFill: i === 2 ? GREEN : BLUE }));
  const cEvery = mkChip(ch, 'I use **every** value!', { size: 30, col: AMBER, fill: '#FFF4D6' }); tr(cEvery, 420, 300);
  const cDragM = mkChip(ch, 'outliers **drag** the mean', { size: 30, col: RED, fill: '#FFE8E8' }); tr(cDragM, 420, 300);

  /* ================= SCR: round two ================= */
  const scr = asScreen(Lcard, 660, 470, { title: 'ROUND 2: WHICH AVERAGE?' });
  const SCX = 820, SCY = 405;
  const gWhich = G(scr.content);
  const cardX = [-212, 0, 212];
  const cards = ['shoe shop', 'flat prices', 'test marks'].map((name, i) => {
    const g = G(gWhich); tr(g, cardX[i], -60);
    g.ring = E('rect', { x: -104, y: -104, width: 208, height: 208, rx: 18, fill: 'none', stroke: GOLD, 'stroke-width': 7 }, g);
    E('rect', { x: -96, y: -96, width: 192, height: 192, rx: 14, fill: '#EEF4FA', stroke: MK.ink, 'stroke-width': 3 }, g);
    T(g, 0, -62, name, { size: 26, weight: 800, anchor: 'middle', fill: MK.ink });
    return g;
  });
  // shoe shelf
  { const g = cards[0];
    E('path', { d: 'M-80,0 L80,0 M-80,70 L80,70', stroke: '#8A5A2A', 'stroke-width': 6 }, g);
    [[-50, -6, '#E8424F'], [10, -6, '#2E6FD8'], [62, -6, '#E8424F'], [-30, 64, '#1E9E5A'], [36, 64, '#E8424F']].forEach(([x, y, col]) =>
      E('path', { d: `M${x - 22},${y} L${x - 22},${y - 18} Q${x - 10},${y - 26} ${x},${y - 16} L${x + 20},${y - 10} Q${x + 26},${y - 4} ${x + 24},${y} Z`, fill: col, stroke: MK.ink, 'stroke-width': 2.5 }, g)); }
  // HDB blocks (one gold outlier)
  { const g = cards[1];
    [[-62, 50, '#C9D3DC'], [-20, 64, '#E8D5B0'], [22, 44, '#C9D3DC'], [64, 118, '#FFC93C']].forEach(([x, h, col]) => {
      E('rect', { x: x - 18, y: 82 - h, width: 36, height: h, fill: col, stroke: MK.ink, 'stroke-width': 2.5 }, g);
      let wd = ''; for (let y = 82 - h + 8; y < 74; y += 14) wd += `M${x - 10},${y} l6,0 M${x + 4},${y} l6,0 `;
      E('path', { d: wd, stroke: MK.ink, 'stroke-width': 3, opacity: 0.5 }, g);
    }); }
  // test paper
  { const g = cards[2];
    E('rect', { x: -52, y: -36, width: 104, height: 120, rx: 6, fill: '#FFFFFF', stroke: MK.ink, 'stroke-width': 3 }, g);
    E('path', { d: 'M-38,-12 L30,-12 M-38,10 L38,10 M-38,32 L22,32 M-38,54 L34,54', stroke: '#8FA3B8', 'stroke-width': 4 }, g);
    E('circle', { cx: 40, cy: -30, r: 22, fill: 'none', stroke: RED, 'stroke-width': 4 }, g);
    T(g, 40, -20, '18', { size: 26, weight: 800, anchor: 'middle', fill: RED }); }
  const ans = [['**MODE**', PINK], ['**MEDIAN**', GREEN], ['**MEAN**', '#E0A100']].map(([s, col], i) => { const c = mkChip(gWhich, s, { size: 30, col, solid: true }); tr(c, cardX[i], 76); return c; });
  const note537 = G(gWhich);
  mkText(note537, cardX[0], 142, 'size {{5.37}}?', { size: 28, anchor: 'middle', fill: MK.ink });
  tr(cross(note537, 14), cardX[0] + 82, 132);
  const noteNo = mkText(gWhich, cardX[2], 142, '(no outliers)', { size: 26, anchor: 'middle', fill: '#8A6A00' });
  const sgStrip = G(gWhich);
  E('rect', { x: -310, y: 160, width: 620, height: 52, rx: 14, fill: '#1A2A3A' }, sgStrip);
  mkText(sgStrip, 0, 195, 'Singapore reports the **median** household income', { size: 26, anchor: 'middle', fill: '#FFFFFF', boldFill: '#7EE0A6' });
  // Dad's 100 m times
  const gTimes = G(scr.content);
  const TIMES = ['13.2', '12.8', '14.1', '12.8', '13.6'], SORTT = [2, 0, 4, 1, 3];
  const tiles = TIMES.map(s => mkTile(Lmid, s));
  const TXo = j => -224 + j * 112;
  const cAvg = mkChip(gTimes, 'my average: **12.8**!', { size: 40, col: '#2E7DD8', fill: '#E8F2FF' }); tr(cAvg, 0, 10);
  const wModeT = mkText(gTimes, 0, -6, 'mode = {{12.8}} s', { size: 40, anchor: 'middle', fill: '#C2187A' });
  const wModeN = mkText(gTimes, 0, 52, '= his **fastest** time', { size: 32, anchor: 'middle', fill: '#C2187A' });
  const wReal = mkWorking(gTimes, 150, -78, ['13.2 + 12.8 + 14.1 + 12.8 + 13.6 = 66.5', '66.5 ÷ 5 = 13.3'], { size: 30, fill: MK.ink, gap: 12, ringCol: GREEN });
  const tbl = mkTable(gTimes, [['mean', 'median', 'mode', 'range'], ['13.3 s', '13.2 s', '12.8 s', '1.3 s']], { colW: 140, rowH: 50, size: 28, ink: MK.ink, fill: 'rgba(46,111,216,0.06)', headFill: 'rgba(46,111,216,0.16)' });
  tr(tbl, -280, 42);
  const tblCells = [0, 1, 2, 3].map(j => tbl.cells[1][j]);
  const modeMark = tbl.mark(1, 2, 'rgba(255,95,200,0.25)');
  const wRange = mkText(gTimes, 0, 192, 'range: {{14.1 − 12.8 = 1.3}} s', { size: 30, anchor: 'middle', fill: MK.ink });
  const cPick = mkChip(Lfg, "Dad's pick", { size: 28, col: PINK });

  /* ================= TH: Mean's confessional ================= */
  const conf = asConf(Lbg, 'mean');

  /* ================= the cast ================= */
  const listenL = G(Lcast);
  const mum = cast(Lcast, 'mum', { prop: 'paper' }), kav = cast(Lcast, 'kavya'), dad = cast(Lcast, 'dad'), boy = cast(Lcast, 'boy');
  const priya = cast(Lcast, 'priya'), tan = cast(Lcast, 'tan');
  const benny = cast(Lcast, 'benny');
  const mean = cast(Lmid, 'mean'), medi = cast(Lmid, 'medi'), mo = cast(Lmid, 'mo'), ranger = cast(Lmid, 'ranger'), otto = cast(Lmid, 'otto');
  tiles.forEach(g => Lmid.appendChild(g));
  // Ah Boy's giant eraser
  const eraser = G(boy.hand || boy);
  tr(eraser, 0, -40, 1, -14);
  E('rect', { x: -34, y: -60, width: 68, height: 96, rx: 12, fill: '#FF8FB0', stroke: MK.ink, 'stroke-width': 4 }, eraser);
  E('rect', { x: -34, y: -4, width: 68, height: 40, rx: 8, fill: '#3A6FD8', stroke: MK.ink, 'stroke-width': 4 }, eraser);
  T(eraser, 0, 24, 'DEL', { size: 26, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  const H = { mum, kav, dad, boy, priya, tan, benny };
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cuts */
  const k = id => at(id) - 0.06;
  const cW = k('apply'), cCH = k('pay'), cS = k('which'), cTH = k('fair');
  const POS = { mum: [120, 446, 0.9], kav: [258, 440, 0.92], dad: [396, 446, 0.9], boy: [528, 456, 0.9], priya: [826, 446, 0.88], tan: [990, 440, 0.88] };
  const SPK = [352, 594, 1.1], LIS = [118, 600, 1.06], KIN = [1075, 670, 0.92];

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const sAD = on(t, -1, cW), sW = on(t, cW, cCH), sCH = on(t, cCH, cS), sS = on(t, cS, cTH), sTH = on(t, cTH, 1e9);
    const show = { mum: 0, kav: 0, dad: 0, boy: 0, priya: 0, tan: 0, benny: 0, mean: 0, medi: 0, mo: 0, ranger: 0, otto: 0 };
    const setH = (key, mood, look, extra) => H[key].set(Object.assign({ t, talk: scTalk(S, t, key === 'kav' ? 'kavya' : key), mood, look }, extra || {}));
    const place = (key, p) => { show[key] = 1; tr(H[key], ...p); };
    cApply.set(0); cPick.set(0);
    tiles.forEach(g => { op(g, 0); g.hl(0); g.rg(0); });
    op(eraser, 0);
    ['mum', 'kav', 'dad', 'boy', 'priya', 'tan', 'benny'].forEach(kk => { if (H[kk].parentNode === listenL) Lcast.appendChild(H[kk]); });

    op(adShot, sAD); op(studioShot, sW || sCH || sS); op(Lfront, sW); op(chScr, sCH); op(ch, sCH); op(scr, sS);
    conf.set(sTH, t);
    studio.upd(t);
    studio.applause.set(0); op(studio.applause, sW ? 0 : 1);
    ['?', '?', '?', '?'].forEach((v, i) => studio.board.set(i, sCH ? '' : v));

    /* ---------- AD ---------- */
    if (sAD) {
      tr(adRays, 600, 420, 1, (t * 8 * AMP) % 360);
      adSparks.forEach(s => s.upd(t));
      const lp = P(t, mid('ad', 0.12), 0.45, pop);
      op(adLogo, clamp(lp * 3)); tr(adLogo, 640, 200, Math.max(0.01, 0.6 + 0.4 * lp));
      op(adHire, P(t, mid('ad', 0.42), 0.25, linear)); tr(adHire, 610, 330, 1 + 0.05 * Math.sin(t * 8) * AMP, -3);
      op(adPay, P(t, mid('ad', 0.62), 0.3, linear));
      op(adFine, P(t, end('ad') + 0.05, 0.3, linear));
      place('benny', [190, 612, 1.0]);
      benny.set({ t, talk: scTalk(S, t, 'benny'), mood: 'happy', look: 0.8, lift: 1, ting: win(t, mid('ad', 0.62), mid('ad', 0.62) + 0.9, 0.15) });
    }

    /* ---------- W: Mum applies ---------- */
    if (sW) {
      ['mum', 'kav', 'dad', 'boy', 'priya', 'tan'].forEach(kk => place(kk, POS[kk]));
      carrier.set({ t, look: -0.6 });
      setH('mum', t < mid('apply', 0.4) ? 'shock' : 'smug', 0, { lift: 1 });
      setH('dad', 'shock', -0.8);
      setH('kav', 'deadpan', -0.8);
      setH('boy', 'happy', -0.9);
      setH('priya', 'shock', -0.9);
      setH('tan', 'neutral', -0.9);
      popSet(cApply, t, mid('apply', 0.2), 1e9, 300, 262);
    }

    /* ---------- CH: the pay chart ---------- */
    op(why, 0);
    if (sCH) {
      tr(chScr, CX, CYS); chScr.upd(t);
      // bars
      PAY.forEach((v, i) => {
        const g = i < 6 ? P(t, mid('pay', 0.1 + i * 0.07), 0.35, easeOut) : P(t, mid('otto', 0.06), 1.0, easeOut);
        const h = v * KP * g;
        attr(pBars[i], 'y', BASE - h); attr(pBars[i], 'height', h);
        op(pVals[i], g > 0.97 ? 1 : 0);
        const mode = i === 1 || i === 2;
        attr(pBars[i], 'fill', mode && t > mid('medi', 0.62) ? '#FF8FC8' : i === 6 ? '#9C6BFF' : '#FFC247');
      });
      
      // the mean line: 2633 (six workers), dragged to 4000
      const drag = P(t, mid('drag', 0.06), 1.6, ease);
      const back = P(t, mid('best', 0.2), 0.7, ease) * (1 - P(t, mid('notalways', 0.25), 0.6, ease));
      const mv = lerp(15800 / 6, 4000, drag), my = YV(mv);
      const mOn = P(t, mid('pay', 0.62), 0.3, linear);
      attr(meanL, 'y1', my); attr(meanL, 'y2', my); op(meanL, mOn);
      // the median line
      mkDraw(medL, P(t, mid('medi', 0.08), 0.6, linear));
      // Ranger's tape
      const tp = P(t, mid('ranger', 0.12), 1.2, ease);
      attr(tapeR, 'y', YV(2400 + 9800 * tp)); attr(tapeR, 'height', 9800 * KP * tp);
      op(tapeG, t > mid('ranger', 0.1) ? 1 : 0); op(tapeEnds[1], tp > 0.98 ? 1 : 0);
      // stats panel
      op(panel, mOn);
      setText(pVal[0], t > mid('drag', 0.52) ? '$4000' : '?');
      pRows.forEach((r, i) => op(r, P(t, [mid('pay', 0.62), mid('medi', 0.38), mid('medi', 0.66), mid('ranger', 0.55)][i], 0.3, linear)));
      op(cNoOtto, P(t, mid('ranger', 0.78), 0.3, linear));
      // work area: one thing at a time
      popSet(cWork, t, mid('pay', 0.55), at('otto') + 0.3, 420, 300);
      popSet(cOut, t, mid('otto', 0.55), at('drag') - 0.06, 420, 300);
      const dIn = t >= at('drag') - 0.06 && t < at('medi') - 0.06;
      op(wDrag, dIn ? 1 : 0);
      if (dIn) { wDrag.show(0, P(t, mid('drag', 0.04), 0.4, linear)); wDrag.show(1, P(t, mid('drag', 0.18), 0.4, linear)); wDrag.show(2, P(t, mid('drag', 0.36), 0.4, linear)); wDrag.ring(2, P(t, mid('drag', 0.5), 0.3, linear)); wDrag.ring(0, 0); wDrag.ring(1, 0); }
      popSet(cAbove, t, mid('drag', 0.66), at('medi') - 0.06, 470, 398);
      op(wRng, t >= at('ranger') - 0.06 && t < at('delete') - 0.06 ? P(t, mid('ranger', 0.4), 0.3, linear) : 0);
      if (t >= at('why') - 0.06 && t < at('best') - 0.06) { op(why, 1); whyL.forEach((w, i) => op(w, P(t, mid('why', [0.02, 0.3, 0.6][i]), 0.3, linear))); }
      popSet(cEvery, t, mid('best', 0.35), at('notalways') - 0.06, 420, 300);
      popSet(cDragM, t, mid('notalways', 0.35), cS, 420, 300);

      // Mean clings to the mean line, tilted towards Otto
      show.mean = mOn;
      const pull = clamp(P(t, mid('otto', 0.3), 0.8, ease) * 0.4 + drag * 0.6) * (1 - back);
      const ang = -14 * pull * AMP;
      tr(mean, 330, my - 30, 0.32, ang);
      let mm = 'deadpan', ml = 0.6;
      if (t < at('otto')) mm = 'deadpan';
      else if (t < at('medi')) mm = t < at('drag') ? 'annoyed' : 'shock';
      else if (t < at('best')) mm = 'annoyed';
      else if (t < at('notalways')) mm = 'smug';
      else mm = 'shock';
      mean.set({ t, talk: scTalk(S, t, 'mean'), mood: mm, look: ml, tilt: ang, sweat: pull, arms: t >= at('drag') && t < at('best') ? 1 : 0 });
      // Otto rises beside his bar
      const oy = lerp(720, 330, P(t, mid('otto', 0.06), 1.0, easeOut));
      if (t >= mid('otto', 0.02)) {
        show.otto = 1;
        const hug = P(t, at('thanks'), 0.5, ease) * (1 - P(t, at('best'), 0.4, ease));
        tr(otto, lerp(822, 790, hug), oy + Math.sin(t * 3) * 5 * AMP, 0.46);
        let om = 'happy';
        if (t >= at('delete') && t < mid('why', 0.62)) om = t < at('why') ? 'sad' : 'neutral';
        otto.set({ t, talk: scTalk(S, t, 'otto'), mood: om, look: t < at('drag') ? 0 : -0.8, wave: om === 'sad' ? 0 : t >= at('thanks') && t < at('best') ? 0.2 : 1 });
      }
      // Medi on the median line
      if (t >= at('medi') - 0.06) {
        show.medi = 1;
        const pp = P(t, at('medi') - 0.06, 0.35, pop);
        tr(medi, 474, YV(2600) - 38, Math.max(0.01, 0.3 * pp));
        medi.set({ t, talk: scTalk(S, t, 'medi'), mood: t >= at('notalways') ? 'smug' : 'neutral', look: t >= at('notalways') ? 0.9 : 0, point: t >= at('notalways') ? 1 : 0 });
      }
      // Ranger in the corner
      if (t >= at('ranger') - 0.06 && t < at('delete') - 0.4) {
        show.ranger = 1;
        const pp = P(t, at('ranger') - 0.06, 0.35, pop);
        tr(ranger, 1028, 618, Math.max(0.01, 0.34 * pp * (1 - P(t, at('delete') - 0.7, 0.3, linear))));
        ranger.set({ t, talk: scTalk(S, t, 'ranger'), mood: 'neutral', look: -0.8, reach: 40 });
      }
      // the humans pop up bottom-left: Kavya (pay, why), Ah Boy (delete)
      const kavOn = (t >= at('pay') - 0.3 && t < at('otto') + 0.2) || (t >= at('why') - 0.2 && t < at('best'));
      const boyOn = t >= at('delete') - 0.25 && t < at('why') - 0.2;
      if (kavOn) {
        const t0 = t < at('otto') + 0.2 ? at('pay') - 0.3 : at('why') - 0.2, t1 = t < at('otto') + 0.2 ? at('otto') - 0.1 : at('best') - 0.3;
        const up = P(t, t0, 0.35, easeOut) * (1 - P(t, t1, 0.3, easeIn));
        place('kav', [KIN[0], lerp(900, KIN[1], up), KIN[2]]);
        setH('kav', t < at('otto') ? 'neutral' : 'happy', -0.9);
      }
      if (boyOn) {
        const up = P(t, at('delete') - 0.25, 0.3, easeOut) * (1 - P(t, at('why') - 0.5, 0.3, easeIn));
        place('boy', [KIN[0], lerp(900, KIN[1] - 4, up), 0.98]);
        setH('boy', 'happy', -0.9, { lift: 1 });
        op(eraser, 1);
      }
    }

    /* ---------- SCR: round two ---------- */
    if (sS) {
      tr(scr, SCX, SCY); scr.upd(t);
      const pair = (spkK, lisK) => { place(spkK, SPK); place(lisK, LIS); listenL.appendChild(H[lisK]); };
      const r2 = t < at('times') - 0.06;
      op(gWhich, r2 ? 1 : 0); op(gTimes, r2 ? 0 : 1);
      setText(scr.titleText, r2 ? 'ROUND 2: WHICH AVERAGE?' : "DAD'S 100 m TIMES (s)");
      if (r2) {
        cards.forEach((c, i) => {
          const t0 = mid('which', 0.45 + i * 0.12);
          op(c, t < at('shoe') - 0.06 ? P(t, t0, 0.25, linear) : 1);
          op(c.ring, (i === 0 && t >= at('shoe') - 0.06 && t < at('flats') - 0.06) || (i === 1 && t > mid('flats', 0.1) && t < mid('flats', 0.62)) || (i === 2 && t > mid('flats', 0.66)) ? 1 : 0);
        });
        ans[0].set(P(t, mid('shoe', 0.12), 0.35, linear));
        ans[1].set(P(t, mid('flats', 0.22), 0.35, linear));
        ans[2].set(P(t, mid('flats', 0.74), 0.35, linear));
        op(note537, t < at('flats') - 0.06 ? P(t, mid('shoe', 0.55), 0.3, linear) : 0);
        op(sgStrip, P(t, mid('flats', 0.4), 0.3, linear));
        op(noteNo, P(t, mid('flats', 0.86), 0.3, linear));
        if (t < at('flats') - 0.06) {
          pair('benny', 'priya');
          const pr = t >= at('shoe') - 0.06;
          benny.set({ t, talk: scTalk(S, t, 'benny'), mood: 'happy', look: pr ? -0.9 : 0.8, lift: pr ? 0 : 1, ting: win(t, mid('which', 0.1), mid('which', 0.1) + 0.8, 0.15) });
          setH('priya', pr ? 'smug' : 'neutral', pr ? 0.5 : 0.9);
        } else {
          pair('mum', 'kav');
          setH('mum', 'neutral', 0.8, { lift: 0 });
          setH('kav', 'happy', 0.9);
        }
      } else {
        pair('dad', 'kav');
        const dur = end('times') - at('times');
        const said = [0.2, 0.31, 0.43, 0.55, 0.66].map(f => at('times') + dur * f);
        const inReal = t >= at('real') - 0.06;
        const srt = P(t, mid('real', 0.45), 0.8, ease);
        TIMES.forEach((s, i) => {
          if (t < said[i]) return;
          op(tiles[i], 1);
          const p = P(t, said[i], 0.3, pop);
          const x0 = TXo(i), x1 = TXo(SORTT[i]), dir = x1 > x0 ? -1 : 1;
          tr(tiles[i], SCX + lerp(x0, x1, srt), SCY - 124 + dir * Math.sin(srt * Math.PI) * 26 * (x0 === x1 ? 0 : 1), Math.max(0.01, inReal ? 1 : p));
          if ((i === 1 || i === 3) && t >= at('mode') - 0.06 && !inReal) tiles[i].hl(1);
          if ((i === 1 || i === 3) && t >= at('choose') - 0.06) tiles[i].hl(1);
        });
        tiles[0].rg(P(t, mid('real', 0.58), 0.3, linear));
        cAvg.set(t < at('mode') - 0.06 ? P(t, mid('times', 0.84), 0.35, linear) : 0);
        const moOn = t >= at('mode') - 0.06 && !inReal;
        op(wModeT, moOn ? P(t, mid('mode', 0.15), 0.3, linear) : 0);
        op(wModeN, moOn ? P(t, mid('mode', 0.4), 0.3, linear) : 0);
        op(wReal, inReal ? 1 : 0); op(tbl, inReal ? P(t, mid('real', 0.3), 0.3, linear) : 0); op(wRange, inReal ? P(t, mid('real', 0.72), 0.3, linear) : 0);
        if (inReal) {
          wReal.show(0, P(t, mid('real', 0.02), 0.4, linear)); wReal.show(1, P(t, mid('real', 0.18), 0.4, linear));
          wReal.ring(1, P(t, mid('real', 0.3), 0.3, linear)); wReal.ring(0, 0);
          [0.3, 0.6, 0.66, 0.84].forEach((f, j) => op(tblCells[j], P(t, mid('real', f), 0.3, linear)));
          modeMark.set(t >= at('choose') - 0.06 ? 1 : 0);
          popSet(cPick, t, mid('choose', 0.3), 1e9, 384, 432);
        }
        // Mo, then Mean, on top of the screen
        if (moOn) {
          show.mo = 1;
          const pp = P(t, at('mode') - 0.06, 0.35, pop);
          tr(mo, 1046, 548 + 40 * (1 - pp), Math.max(0.01, 0.5 * pp));
          mo.set({ t, talk: scTalk(S, t, 'mo'), mood: 'happy', look: -0.9, hearts: 1, likes: '♥ 99+' });
        }
        if (inReal) {
          show.mean = 1;
          const pp = P(t, at('real') - 0.06, 0.35, pop);
          tr(mean, 226, 300 + 30 * (1 - pp), Math.max(0.01, 0.5 * pp));
          mean.set({ t, talk: scTalk(S, t, 'mean'), mood: t >= at('choose') ? 'annoyed' : 'deadpan', look: t >= at('choose') ? -0.2 : 0.8, tilt: 0, arms: 0 });
        }
        const ch2 = t >= at('choose') - 0.06;
        setH('dad', t < at('mode') - 0.06 ? 'smug' : ch2 ? 'smug' : !inReal ? 'happy' : 'neutral', ch2 ? 0.9 : 0.8, { lift: ch2 ? 1 : 0 });
        setH('kav', ch2 ? 'deadpan' : t > mid('times', 0.85) && t < at('mode') ? 'annoyed' : 'neutral', ch2 ? (t > mid('choose', 0.4) ? 0 : 0.9) : 0.9);
      }
    }

    /* ---------- TH: Mean's confessional ---------- */
    if (sTH) {
      show.mean = 1;
      const push = P(t, cTH, end('fair') + 0.9 - cTH, linear);
      tr(mean, 600, 420, 1.3 + 0.12 * push, 0);
      mean.set({ t, talk: scTalk(S, t, 'mean'), mood: 'deadpan', look: 0, tilt: 0, arms: 0 });
    }

    /* ---------- visibility ---------- */
    for (const kk in H) op(H[kk], show[kk]);
    op(mean, show.mean);
    op(medi, show.medi); op(mo, show.mo); op(ranger, show.ranger); op(otto, show.otto);
    op(carrier, sW);
  };
});
