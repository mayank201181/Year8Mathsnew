/* Scene 1: Round one: phone checks (mean, median, mode and range).
   Shots (hard sitcom cuts):
   W    Studio 5 wide: Benny pops up: "Round 1" -> six number tiles pop above the heads (Kavya 7, Mum 3, Dad 9,
        Ah Boy 4, Priya 3, Mr Tan 10?) -> Mr Tan's CAT CAM; the tiles fly up to the scoreboard.
   B    the giant scoreboard: Mean levels six bars to 6 (7 + 3 + 9 + 4 + 3 + 10 = 36, 36 ÷ 6 = 6).
   SCR  the big screen with Dad: the middle of the UNORDERED board, (9 + 4) ÷ 2 = 6.5 -> WAY OFF!
   B    Medi's whistle: the tiles shuffle into ORDER; the 3.5th value, (4 + 7) ÷ 2 = 5.5 -> SPOT ON!
        Mo: 3 appears twice. Ranger: his tape from 3 to 10, 10 − 3 = 7.
   W    the jingle (Benny), with Mean and Medi waving in the little scoreboard.
   SCR  Ah Boy finishes the jingle (the mnemonic card) -> Mr Tan's Seoul lows, thermometer -> Priya: 4 − 5 = −1, WAY OFF!
   B    Ranger: a number line from −5 to 4, 4 − (−5) = 9 -> SPOT ON!
   SCR  Kavya: the aligned working for the mean, the ordered lows, median −2, mode −3.
   W    Mr Tan's pun. Silence. *cricket*. */
scene('measures', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const popSet = (el, t, t0, t1, x, y) => { const p = t >= t0 && t < t1 ? P(t, t0, 0.35, linear) : 0; el.set(p); if (x !== undefined) tr(el, x, y); };
  const GOLD = AS.gold, PINK = '#FFC2E8', MINT = '#9FE0B5', RED = '#D32F2F', GREEN = '#1E9E5A', BLUE = '#2E6FD8';
  const TILE = '#FFE7A3', TILE_PINK = '#FF9FD0', TILE_COLD = '#BFE6FF';
  /* a number tile: 64 x 64, centred */
  const mkTile = (parent, txt, o) => {
    o = o || {};
    const g = G(parent), sz = o.w || 64;
    g.ring = E('rect', { x: -sz / 2 - 9, y: -sz / 2 - 9, width: sz + 18, height: sz + 18, rx: 16, fill: 'none', stroke: o.ringCol || GREEN, 'stroke-width': 6 }, g);
    g.box = E('rect', { x: -sz / 2, y: -sz / 2, width: sz, height: sz, rx: 12, fill: o.col || TILE, stroke: MK.ink, 'stroke-width': 4 }, g);
    g.txt = T(g, 0, (o.size || 38) * 0.36, txt, { size: o.size || 38, weight: 800, anchor: 'middle', fill: MK.ink });
    g.base = o.col || TILE;
    g.hl = (p, col) => attr(g.box, 'fill', p > 0.5 ? (col || TILE_PINK) : g.base);
    g.rg = p => op(g.ring, p);
    g.rg(0);
    return g;
  };
  const strip = (parent, x, y, w, txt, col) => {   // a dark strip with one line of text, centred on (x, y)
    const g = G(parent);
    E('rect', { x: x - w / 2, y: y - 30, width: w, height: 60, rx: 30, fill: 'rgba(10,27,39,0.9)', stroke: col, 'stroke-width': 3 }, g);
    mkText(g, x, y + 11, txt, { size: 32, anchor: 'middle', fill: C.ink, boldFill: col });
    return g;
  };

  /* layers */
  const Lbg = G(root), Lcard = G(root), Lcast = G(root), Lfront = G(root), Lhost = G(root), Ltiles = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= W: Studio 5 ================= */
  const studioShot = G(Lbg);
  const studio = asStudio(studioShot);
  Lfront.appendChild(studio.front); Lfront.appendChild(studio.top);
  const carrier = asCarrier(studio.top); tr(carrier, 1100, 530, 0.7);
  const cRound = mkChip(Lfg, '**Round 1**: phone checks this morning', { size: 30, col: GOLD });
  const bubCat = mkSpeechBubble(Lfg, '**CAT CAM**: Pythagoras, napping', { size: 28, tail: 'down', tailX: 70 });
  const cLyr1 = mkChip(Lfg, "the **median's** the **middle**", { size: 30, col: MINT });
  const cLyr2 = mkChip(Lfg, '**add and divide** for the **mean**', { size: 30, col: GOLD });
  const cSing = mkChip(Lfg, '**SING!**', { size: 30, col: '#FF8A8A' });
  const cCricket = mkChip(Lfg, '*cricket*', { size: 30, col: '#A4BCCB' });
  const tenQ = G(Ltiles);   // the "?" badge on Mr Tan's 10
  E('circle', { r: 19, fill: '#FF6070', stroke: MK.ink, 'stroke-width': 3 }, tenQ);
  T(tenQ, 0, 10, '?', { size: 28, weight: 800, anchor: 'middle', fill: '#FFFFFF' });

  /* ================= B: the giant scoreboard ================= */
  const boardShot = G(Lbg);
  const board = asBoardShot(boardShot);
  // the wide card (over three panels) and the narrow one (over two)
  const wide = asScreen(Lcard, 780, 430, { title: 'ROUND 1: PHONE CHECKS' });
  const narrow = asScreen(Lcard, 500, 430, { title: 'LINE UP: IN ORDER' });
  // wide / Mean: six bars level out; the sum; the formula
  const gTot = G(wide.content);
  const BX = i => -345 + i * 60, BASE = 30, UNIT = 12, TV = [7, 3, 9, 4, 3, 10];
  E('line', { x1: -372, y1: BASE, x2: -12, y2: BASE, stroke: MK.ink, 'stroke-width': 4 }, gTot);
  const bars = TV.map((v, i) => E('rect', { x: BX(i) - 22, y: BASE - v * UNIT, width: 44, height: v * UNIT, rx: 4, fill: '#FFC247', stroke: MK.ink, 'stroke-width': 3 }, gTot));
  const mLine = E('line', { x1: -378, y1: BASE - 6 * UNIT, x2: -6, y2: BASE - 6 * UNIT, stroke: RED, 'stroke-width': 4, 'stroke-dasharray': '10 7' }, gTot);
  const mLab = mkText(gTot, -372, BASE - 6 * UNIT - 50, 'every bar: **6**', { size: 28, fill: RED });
  const wTot = mkWorking(gTot, 80, 104, ['7 + 3 + 9 + 4 + 3 + 10 = 36', '36 ÷ 6 = 6'], { size: 36, fill: MK.ink, ringCol: GREEN });
  const fTot = mkMath(gTot, 182, -30, '"mean" = "total"/"number of values"', { size: 32, fill: BLUE, anchor: 'middle' });
  // wide / Ranger: the tape from 3 to 10
  const gRng = G(wide.content);
  const RX = j => -200 + j * 80;
  const tape = G(gRng);
  const tapeR = E('rect', { x: RX(0), y: -62, width: 10, height: 26, fill: '#FFD23C', stroke: MK.ink, 'stroke-width': 3 }, tape);
  let tk = '';
  for (let x = RX(0) + 10; x < RX(5); x += 10) tk += `M${x},-62 l0,${(x - RX(0)) % 50 ? 8 : 14} `;
  const tapeTk = E('path', { d: tk, stroke: MK.ink, 'stroke-width': 2 }, tape);
  const tapeClip = E('rect', { x: RX(0), y: -70, width: 10, height: 40 }, E('clipPath', { id: 'ms_tapeclip' }, gRng));
  tapeTk.setAttribute('clip-path', 'url(#ms_tapeclip)');
  const wRng = mkMath(gRng, 0, 40, '10 − 3 = 7', { size: 54, fill: MK.ink, anchor: 'middle' });
  const cOne = mkChip(gRng, '**ONE** number (not "3 to 10")', { size: 30, col: GOLD });
  tr(cOne, 0, 122);
  // wide / never: the Seoul number line
  const gNev = G(wide.content);
  const nl = mkNumberLine(gNev, { from: -5, to: 4, len: 630, size: 30, ink: MK.ink, arrows: true }); tr(nl, -315, -10);
  const nTape = E('rect', { x: -315, y: -58, width: 10, height: 24, fill: '#FFD23C', stroke: MK.ink, 'stroke-width': 3 }, gNev);
  const nDots = [[-5, BLUE], [4, RED]].map(([v, col]) => E('circle', { cx: -315 + nl.x(v), cy: -10, r: 13, fill: col, stroke: MK.ink, 'stroke-width': 3 }, gNev));
  const nLab = mkText(gNev, 0 - 315 + nl.x(-0.5), -82, '**9** degrees', { size: 30, anchor: 'middle', fill: MK.ink });
  const wNev = mkMath(gNev, 0, 112, '4 − (−5) = 4 + 5 = 9', { size: 48, fill: MK.ink, anchor: 'middle' });
  // narrow / Medi: positions, brace, the 3.5th value, the median
  const NX = j => -190 + j * 76;
  const gHalf = G(narrow.content);
  const posL = ['1st', '2nd', '3rd', '4th', '5th', '6th'].map((s, j) => T(gHalf, NX(j), -56, s, { size: 26, weight: 700, anchor: 'middle', fill: '#5A6670' }));
  const brHalf = mkBrace(gHalf, NX(3), -34, NX(2), -34, { text: 'halfway', col: BLUE, size: 28 });
  const wPos = mkText(gHalf, 0, 82, '{{(6 + 1)/2 = 3.5}}th value', { size: 32, anchor: 'middle', fill: MK.ink });
  const wMed = mkText(gHalf, 0, 172, 'median = {{(4 + 7)/2 = 5.5}}', { size: 32, anchor: 'middle', fill: GREEN });
  // narrow / Mo
  const gMode = G(narrow.content);
  const wTw = mkText(gMode, 0, 52, '{{3}} appears **twice**', { size: 38, anchor: 'middle', fill: MK.ink });
  const wMo = mkText(gMode, 0, 132, 'mode = **3**', { size: 46, anchor: 'middle', fill: '#C2187A' });
  const cPop = mkChip(gMode, 'the **most** common value', { size: 28, col: '#FF5FC8' }); tr(cPop, 0, -24);

  /* ================= SCR: the big screen ================= */
  const scrShot = G(Lbg);   // (the studio back wall is reused behind it)
  const scr = asScreen(Lcard, 660, 470, { title: 'THE MIDDLE?' });
  const SCX = 820, SCY = 405;
  // middle (Dad)
  const gMid = G(scr.content);
  const midBox = E('rect', { x: -46 - 26, y: -90 - 50, width: 92 + 52 + 40, height: 100, rx: 14, fill: 'none', stroke: RED, 'stroke-width': 5, 'stroke-dasharray': '12 8' }, gMid);
  attr(midBox, 'x', -46 - 50); attr(midBox, 'width', 192); attr(midBox, 'y', -132); attr(midBox, 'height', 84);
  const midLab = mkText(gMid, 0, -144, 'the two in the **middle** of the board', { size: 28, anchor: 'middle', fill: RED });
  const wMid = mkMath(gMid, 0, 60, '(9 + 4) ÷ 2 = 6.5', { size: 52, fill: MK.ink, anchor: 'middle' });
  const midNote = mkText(gMid, 0, 196, 'not in order!', { size: 30, anchor: 'middle', fill: RED });
  // jingle card (Ah Boy)
  const gJin = G(scr.content);
  const jl = [["the **median**'s the **middle**", MINT], ['**add and divide** for the **mean**', GOLD],
    ['the **mode** appears the **most**', PINK], ['the **range** is the **difference** between', '#FFD23C']]
    .map(([s, col], i) => { const g = G(gJin); E('rect', { x: -300, y: -150 + i * 64, width: 14, height: 46, rx: 7, fill: col, stroke: MK.ink, 'stroke-width': 2 }, g); mkText(g, -272, -116 + i * 64, s, { size: 31, fill: MK.ink }); return g; });
  const jStrip = G(gJin);
  E('rect', { x: -290, y: 128, width: 580, height: 64, rx: 16, fill: '#2A1150' }, jStrip);
  mkText(jStrip, 0, 171, '**MED**ian = **MED**ium  ·  **MO**de = **MO**st', { size: 32, anchor: 'middle', fill: '#FFFFFF', boldFill: GOLD });
  // Seoul (Mr Tan, Priya)
  const gSeo = G(scr.content);
  const therm = mkThermometer(gSeo, { min: -10, max: 10, step: 5, minor: 1, h: 300, size: 26, ink: MK.ink, readCol: MK.ink, readSize: 32 });
  tr(therm, -262, 170);
  const seoHead = mkText(gSeo, 82, -112, 'overnight lows (°C)', { size: 30, anchor: 'middle', fill: '#5A6670' });
  const gMinus = G(scr.content);
  const minLab = mkText(gMinus, 82, 52, 'largest − smallest:', { size: 30, anchor: 'middle', fill: '#5A6670' });
  const wMinus = mkMath(gMinus, 82, 120, '4 − 5 = −1', { size: 54, fill: MK.ink, anchor: 'middle' });
  // mean2 (Kavya)
  const gM2 = G(scr.content);
  const wM2 = mkWorking(gM2, 40, -168, ['2 + 4 = 6', '-3 - 5 - 3 - 2 = -13', '6 + (-13) = -7', '-7 ÷ 7 = -1'], { size: 34, fill: MK.ink, gap: 14, ringCol: GREEN });
  const m2Notes = [['positives', 0], ['negatives', 1]].map(([s, i]) => mkText(gM2, 190, wM2.lineY[i], s, { size: 26, fill: '#5A6670' }));
  const m2Sum = mkText(gM2, 0, 196, 'mean **−1 °C** · median **−2 °C** · mode **−3 °C**', { size: 28, anchor: 'middle', fill: MK.ink, boldFill: BLUE });

  /* ================= tiles ================= */
  const OWN = ['kav', 'mum', 'dad', 'boy', 'priya', 'tan'], SORT = [3, 0, 4, 2, 1, 5];
  const tiles = TV.map(v => mkTile(Ltiles, String(v)));
  const TEMPS = [-3, 2, -5, 0, -3, 4, -2], SORTT = [1, 5, 0, 4, 2, 6, 3];
  const temps = TEMPS.map(v => mkTile(Ltiles, mkFmt(v), { w: 58, size: 32, col: v < 0 ? TILE_COLD : TILE, ringCol: GREEN }));

  /* stamps */
  const sOff = asStamp(Lfg, false), sOn = asStamp(Lfg, true);

  /* ================= the cast ================= */
  const listenL = G(Lcast);   // SCR listener layer (behind the speaker)
  const mum = cast(Lcast, 'mum'), kav = cast(Lcast, 'kavya'), dad = cast(Lcast, 'dad'), boy = cast(Lcast, 'boy');
  const priya = cast(Lcast, 'priya'), tan = cast(Lcast, 'tan');
  const mean = cast(Lcast, 'mean'), medi = cast(Lcast, 'medi'), mo = cast(Lcast, 'mo'), ranger = cast(Lcast, 'ranger');
  const benny = cast(Lhost, 'benny');
  const H = { mum, kav, dad, boy, priya, tan };
  const lt = {}; ['priya', 'tan', 'medi', 'mo', 'ranger'].forEach(k => { lt[k] = asLowerThird(Lhud, k); });
  const ltOn = (t, who, t0) => lt[who].set(win(t, t0, t0 + 3.1, 0.3));
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cuts */
  const k = id => at(id) - 0.06;
  const cTot = k('total'), cMid = k('middle'), cWh = k('whistle'), cJin = k('jingle'), cJin2 = k('jingle2'), cNev = k('never'), cM2 = k('mean2'), cPun = k('pun');
  const POS = { mum: [120, 446, 0.9], kav: [258, 440, 0.92], dad: [396, 446, 0.9], boy: [528, 456, 0.9], priya: [826, 446, 0.88], tan: [990, 440, 0.88] };
  const SPK = [352, 594, 1.1], LIS = [118, 600, 1.06];
  const WX = 745, RXC = 465, CY = 440, NMX = 880, MOX = 324;

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const sW = on(t, -1, cTot) || on(t, cJin, cJin2) || on(t, cPun, 1e9);
    const sB = on(t, cTot, cMid) || on(t, cWh, cJin) || on(t, cNev, cM2);
    const sS = sW || sB ? 0 : 1;
    for (const kk in lt) lt[kk].set(0);
    [cRound, bubCat, cLyr1, cLyr2, cSing, cCricket, sOff, sOn].forEach(c => c.set(0));
    op(tenQ, 0);
    tiles.forEach(g => { op(g, 0); g.hl(0); g.rg(0); });
    temps.forEach(g => { op(g, 0); g.hl(0); g.rg(0); });
    const show = { mum: 0, kav: 0, dad: 0, boy: 0, priya: 0, tan: 0, mean: 0, medi: 0, mo: 0, ranger: 0, benny: 0 };
    const tileAt = (g, x, y, s) => { op(g, 1); tr(g, x, y, s || 1); };
    const who = scWho(S, t);
    const setH = (key, mood, look, extra) => H[key].set(Object.assign({ t, talk: scTalk(S, t, key === 'kav' ? 'kavya' : key), mood, look }, extra || {}));

    /* ---------- backgrounds ---------- */
    op(studioShot, sW || sS); op(Lfront, sW); op(boardShot, sB); op(scrShot, sS);
    studio.upd(t);
    op(wide, 0); op(narrow, 0); op(scr, 0);
    op(studio.applause, sW && !(t > at('board') - 0.2 && t < cTot) && !(t >= cJin && t < cJin2) && t < cPun ? 1 : 0);
    studio.applause.set(sW && t > mid('round', 0.2) && t < at('board') ? 1 : 0);

    /* the little scoreboard (seen in W and behind the big screen) */
    const mb = studio.board;
    if (t < cTot) [0, 1, 2, 3].forEach(i => mb.set(i, '?'));
    else if (t >= cJin && t < cJin2) { mb.set(0, ''); mb.set(1, ''); mb.set(2, '3'); mb.set(3, '7'); }
    else if (t < cJin) { mb.set(0, '6'); mb.set(1, t > mid('half', 0.84) ? '5.5' : '?'); mb.set(2, t > mid('mo', 0.55) ? '3' : '?'); mb.set(3, t > mid('ranger', 0.55) ? '7' : '?'); }
    else if (t < cPun) { mb.set(0, '?'); mb.set(1, '?'); mb.set(2, '?'); mb.set(3, t > mid('never', 0.62) ? '9' : '?'); }
    else { mb.set(0, '−1'); mb.set(1, '−2'); mb.set(2, '−3'); mb.set(3, '9'); }
    [0, 1, 2, 3].forEach(i => mb.lit(i, t >= cPun ? 1 : 0));

    /* ---------- W: Studio 5 ---------- */
    if (sW) {
      ['mum', 'kav', 'dad', 'boy', 'priya', 'tan'].forEach(kk => { show[kk] = 1; tr(H[kk], ...POS[kk]); });
      carrier.set({ t, look: t < at('cat') ? -0.5 : t < cPun ? 0.2 : -0.6, blink: t > end('pun') && t < end('pun') + 0.35 ? 1 : undefined });
      // Benny: round + board, then the jingle
      const bIn1 = t >= at('round') - 0.3 && t < at('cat') + 0.6, bIn2 = t >= cJin && t < cJin2;
      if (bIn1 || bIn2) {
        show.benny = 1;
        const t0 = bIn1 ? at('round') - 0.3 : cJin - 0.05;
        const up = P(t, t0, 0.4, pop), out = bIn1 ? P(t, at('cat') - 0.1, 0.5, easeIn) : 0;
        tr(benny, 668, lerp(900, 606, up) + 320 * out, 0.86);
        const talk = scTalk(S, t, 'benny');
        benny.set({ t, talk, mood: 'happy', look: t < at('board') ? 0 : t < at('cat') ? Math.sin(t * 1.6) * 0.8 : 0.8, lift: 1, ting: bIn1 ? win(t, mid('round', 0.3), mid('round', 0.3) + 0.8, 0.15) : win(t, cJin + 0.3, cJin + 1.1, 0.15) });
      }
      // moods
      if (t < cTot) {
        const bt = mid('board', 0), dur = end('board') - at('board');
        const named = i => t >= at('board') + dur * [0.1, 0.25, 0.38, 0.52, 0.66, 0.8][i];
        const lookB = x => (x < 668 ? 0.6 : -0.6);
        const tanTalk = t >= at('cat');
        setH('kav', named(0) ? 'happy' : 'neutral', tanTalk ? 0.9 : lookB(POS.kav[0]));
        setH('mum', tanTalk ? 'deadpan' : named(1) ? 'smug' : 'neutral', tanTalk ? 0.9 : lookB(POS.mum[0]));
        setH('dad', named(2) ? 'smug' : 'happy', tanTalk ? 0.9 : named(2) && !named(3) ? 0 : lookB(POS.dad[0]));
        setH('boy', 'happy', tanTalk ? 0.9 : lookB(POS.boy[0]), { lift: named(3) && !named(4) ? 1 : 0 });
        setH('priya', tanTalk ? 'deadpan' : named(4) ? 'smug' : 'happy', tanTalk ? 0.9 : named(5) ? 0.9 : lookB(POS.priya[0]));
        setH('tan', tanTalk ? 'happy' : named(5) ? 'shock' : 'neutral', tanTalk ? (t < mid('cat', 0.6) ? 0.6 : 0) : -0.6);
        if (t < at('board')) ltOn(t, 'priya', at('round') + 0.1);
        ltOn(t, 'tan', at('cat') + 0.2);
        popSet(cRound, t, mid('round', 0.25), at('board') - 0.1, 600, 264);
        // the tiles pop above the heads, then fly up into the scoreboard
        TV.forEach((v, i) => {
          const t0 = at('board') + dur * [0.1, 0.25, 0.38, 0.52, 0.66, 0.8][i];
          if (t < t0) return;
          const p = P(t, t0, 0.35, pop), fly = P(t, at('cat') - 0.15 + i * 0.06, 0.6, easeIn);
          const [hx] = POS[OWN[i]];
          const x = lerp(hx, 887, fly), y = lerp(262, 96, fly) - Math.sin(fly * Math.PI) * 40;
          let wob = 0;
          if (i === 5) wob = Math.sin(t * 9) * 8 * AMP * (1 - fly);
          tileAt(tiles[i], x, y, Math.max(0.01, p * (1 - 0.6 * fly)));
          op(tiles[i], 1 - P(t, at('cat') + 0.35 + i * 0.06, 0.15, linear));
          if (i === 5) { tiles[i].setAttribute('transform', tiles[i].getAttribute('transform') + ` rotate(${wob.toFixed(1)})`); op(tenQ, (1 - fly) * clamp(p)); tr(tenQ, hx + 36, 228, Math.max(0.01, p)); }
        });
        popSet(bubCat, t, mid('cat', 0.12), cTot, 905, 252);
      } else if (t < cJin2) {
        // the jingle
        ['kav', 'mum', 'dad', 'boy', 'priya', 'tan'].forEach(kk => setH(kk, 'happy', POS[kk][0] < 668 ? 0.6 : -0.6, kk === 'boy' ? { lift: Math.sin(t * 6) > 0 ? 1 : 0 } : {}));
        popSet(cSing, t, cJin + 0.15, 1e9, 600, 262);
        popSet(cLyr1, t, mid('jingle', 0.28), 1e9, 300, 262);
        popSet(cLyr2, t, mid('jingle', 0.62), 1e9, 905, 262);
        // Mean and Medi wave in the little scoreboard
        show.mean = 1; show.medi = 1;
        tr(mean, 686, 120 + Math.sin(t * 5) * 3 * AMP, 0.2); tr(medi, 819, 116, 0.22);
        mean.set({ t, mood: 'smug', arms: t > mid('jingle', 0.55) ? 1 : 0.4 });
        medi.set({ t, mood: 'happy', point: t > mid('jingle', 0.25) ? 1 : 0, whistle: 0 });
      } else {
        // the pun
        const pun = t < end('pun') - 0.1;
        ['kav', 'mum', 'dad', 'boy', 'priya'].forEach(kk => setH(kk, pun && t < mid('pun', 0.5) ? 'neutral' : 'deadpan', t > end('pun') + 0.3 ? 0 : 0.9));
        setH('tan', 'happy', t > end('pun') ? 0 : -0.5);
        popSet(cCricket, t, end('pun') + 0.1, 1e9, 600, 262);
      }
    }

    /* ---------- B: the giant scoreboard ---------- */
    if (sB) {
      const sl = board.slots;
      const spk = t < cMid ? 0 : t < at('mo') - 0.06 ? 1 : t < at('ranger') - 0.06 ? 2 : 3;
      [0, 1, 2, 3].forEach(i => board.lit(i, i === spk ? 1 : 0));
      // readouts
      if (t < cMid) { board.set(0, t > mid('total', 0.6) ? '6' : '?'); board.set(1, '?'); board.set(2, '?'); board.set(3, '?'); }
      else if (t < cJin) { board.set(0, '6'); board.set(1, t > mid('half', 0.84) ? '5.5' : '?'); board.set(2, t > mid('mo', 0.55) ? '3' : '?'); board.set(3, t > mid('ranger', 0.55) ? '7' : '?'); }
      else { board.set(0, '?'); board.set(1, '?'); board.set(2, '?'); board.set(3, t > mid('never', 0.62) ? '9' : '?'); }
      const place = { mean: [sl[0].x, sl[0].y + 30, 0.72], medi: [sl[1].x, sl[1].y + 14, 0.74], mo: [sl[2].x, sl[2].y, 0.7], ranger: [sl[3].x - 24, sl[3].y + 20, 0.74] };
      for (const kk in place) tr({ mean, medi, mo, ranger }[kk], ...place[kk]);
      if (spk === 0) {
        // Mean: total ÷ number of values
        show.mean = 1;
        op(wide, 1); tr(wide, WX, CY); wide.upd(t); setText(wide.titleText, 'ROUND 1: PHONE CHECKS');
        op(gTot, 1); op(gRng, 0); op(gNev, 0);
        const lv = P(t, mid('total', 0.45), 1.3, ease);
        TV.forEach((v, i) => { const h = lerp(v, 6, lv) * UNIT; attr(bars[i], 'y', BASE - h); attr(bars[i], 'height', h); tileAt(tiles[i], WX + BX(i), CY + BASE + 38, 0.78); });
        op(mLine, P(t, mid('total', 0.45) + 1.2, 0.3, linear)); op(mLab, P(t, mid('total', 0.45) + 1.2, 0.3, linear));
        wTot.show(0, P(t, mid('total', 0.08), 0.5, linear)); wTot.show(1, P(t, mid('total', 0.4), 0.5, linear));
        wTot.ring(1, P(t, mid('total', 0.6), 0.3, linear)); wTot.ring(0, 0);
        op(fTot, P(t, mid('total', 0.72), 0.3, linear));
        mean.set({ t, talk: scTalk(S, t, 'mean'), mood: t < mid('total', 0.5) ? 'deadpan' : 'smug', look: 0.6, arms: t > mid('total', 0.42) ? 1 : 0, tilt: 0 });
      } else if (spk === 1) {
        // Medi: line up! in order
        show.mean = 1; show.medi = 1;
        op(narrow, 1); tr(narrow, NMX, CY); narrow.upd(t); setText(narrow.titleText, 'LINE UP: IN ORDER');
        op(gHalf, t >= at('half') - 0.06 ? 1 : 0); op(gMode, 0);
        const sh = P(t, mid('whistle', 0.3), 1.0, ease);
        TV.forEach((v, i) => {
          const x0 = NX(i), x1 = NX(SORT[i]), dir = x1 > x0 ? -1 : 1;
          const ord = mid('whistle', 0.62) + SORT[i] * 0.22, bump = t < at('half') ? Math.sin(P(t, ord, 0.3, linear) * Math.PI) * 14 : 0;
          tileAt(tiles[i], NMX + lerp(x0, x1, sh), CY - 115 + dir * Math.sin(sh * Math.PI) * 52 * (x0 === x1 ? 0 : 1) - bump, 0.92);
        });
        if (t >= at('half') - 0.06) {
          posL.forEach((p, j) => op(p, P(t, mid('half', 0.05 + j * 0.03), 0.2, linear)));
          brHalf.set(P(t, mid('half', 0.42), 0.3, linear));
          tiles[3].rg(P(t, mid('half', 0.38), 0.3, linear)); tiles[0].rg(P(t, mid('half', 0.38), 0.3, linear));
          op(wPos, P(t, mid('half', 0.12), 0.3, linear));
          op(wMed, P(t, mid('half', 0.68), 0.3, linear));
          popSet(sOn, t, mid('half', 0.86), cJin, 458, 540);
          if (t > mid('half', 0.86)) tr(sOn, 458, 540, 0.5);
        }
        mean.set({ t, mood: 'deadpan', look: 0.8, tilt: 0 });
        const ws = t < at('half') && (t < mid('whistle', 0.3) || (t > mid('whistle', 0.42) && t < mid('whistle', 0.62)));
        medi.set({ t, talk: ws ? 0 : scTalk(S, t, 'medi'), mood: t < at('half') ? 'annoyed' : t > mid('half', 0.86) ? 'happy' : 'neutral', look: 0.8, whistle: ws ? 1 : 0, point: t >= at('half') ? 1 : 0 });
        if (t < at('half')) ltOn(t, 'medi', at('whistle') + 0.1);
      } else if (spk === 2) {
        // Mo: the most common value
        show.mo = 1; show.ranger = 1;
        op(narrow, 1); tr(narrow, MOX, CY); narrow.upd(t); setText(narrow.titleText, 'MOST POPULAR');
        op(gHalf, 0); op(gMode, 1);
        const jump = t > mid('mo', 0.3) ? Math.abs(Math.sin((t - mid('mo', 0.3)) * 7)) * 22 * AMP : 0;
        TV.forEach((v, i) => { const three = v === 3; tileAt(tiles[i], MOX + NX(SORT[i]), CY - 100 - (three ? jump : 0), 0.92); if (three) tiles[i].hl(t > mid('mo', 0.3) ? 1 : 0); });
        op(wTw, P(t, mid('mo', 0.45), 0.3, linear)); op(wMo, P(t, mid('mo', 0.6), 0.3, linear)); cPop.set(P(t, mid('mo', 0.2), 0.35, linear));
        mo.set({ t, talk: scTalk(S, t, 'mo'), mood: 'happy', look: -0.8, hearts: t > mid('mo', 0.7) ? 1 : 0.3, likes: t > mid('mo', 0.7) ? '♥ 99+' : '♥ 3' });
        ranger.set({ t, mood: 'neutral', look: -0.7, reach: 40 });
        ltOn(t, 'mo', at('mo') + 0.1);
      } else {
        // Ranger: round 1, then Seoul
        show.ranger = 1; show.mo = 1;
        op(wide, 1); tr(wide, RXC, CY); wide.upd(t);
        const seo = t >= cNev;
        setText(wide.titleText, seo ? 'SEOUL: THE RANGE' : 'RANGE = LARGEST − SMALLEST');
        op(gTot, 0); op(gRng, seo ? 0 : 1); op(gNev, seo ? 1 : 0);
        const L0 = seo ? 'never' : 'ranger';
        const str = P(t, mid(L0, 0.18), 1.0, ease);
        if (!seo) {
          TV.forEach((v, i) => tileAt(tiles[i], RXC + RX(SORT[i]), CY - 110, 0.92));
          tiles[1].rg(P(t, mid('ranger', 0.2), 0.3, linear)); tiles[5].rg(P(t, mid('ranger', 0.2), 0.3, linear));
          const w = Math.max(10, (RX(5) - RX(0)) * str);
          attr(tapeR, 'width', w); attr(tapeClip, 'width', w);
          op(wRng, P(t, mid('ranger', 0.38), 0.3, linear));
          cOne.set(P(t, mid('ranger', 0.62), 0.35, linear));
          ltOn(t, 'ranger', at('ranger') + 0.1);
        } else {
          attr(nTape, 'width', Math.max(10, (nl.x(4) - nl.x(-5)) * str));
          op(nLab, P(t, mid('never', 0.4), 0.3, linear));
          op(wNev, P(t, mid('never', 0.3), 0.3, linear));
          popSet(sOn, t, mid('never', 0.7), cM2, RXC, CY + 178);
          if (t > mid('never', 0.7)) tr(sOn, RXC, CY + 178, 0.5);
        }
        ranger.set({ t, talk: scTalk(S, t, 'ranger'), mood: seo ? (t > mid('never', 0.7) ? 'smug' : 'annoyed') : 'neutral', look: -0.6, reach: 40 + 70 * str });
        mo.set({ t, mood: 'happy', look: 0.8, hearts: 0 });
        // Mo shares the panel row but sits under the card: hide her
        show.mo = 0;
      }
    }

    /* ---------- SCR: the big screen ---------- */
    if (sS) {
      op(scr, 1); tr(scr, SCX, SCY); scr.upd(t);
      op(gMid, 0); op(gJin, 0); op(gSeo, 0); op(gMinus, 0); op(gM2, 0);
      const pair = (spkK, lisK) => { show[spkK] = 1; show[lisK] = 1; tr(H[spkK], ...SPK); tr(H[lisK], ...LIS); listenL.appendChild(H[lisK]); };
      // put everyone back in the cast layer order first
      ['mum', 'kav', 'dad', 'boy', 'priya', 'tan'].forEach(kk => { if (H[kk].parentNode === listenL) Lcast.insertBefore(H[kk], mean); });
      if (t < cWh) {
        // Dad: the middle of the board
        setText(scr.titleText, 'THE MIDDLE?');
        op(gMid, 1);
        pair('dad', 'kav');
        TV.forEach((v, i) => tileAt(tiles[i], SCX - 230 + i * 92, SCY - 90, 1));
        op(midBox, P(t, mid('middle', 0.3), 0.3, linear)); op(midLab, P(t, mid('middle', 0.3), 0.3, linear));
        op(wMid, P(t, mid('middle', 0.62), 0.3, linear));
        popSet(sOff, t, mid('middle', 0.84), 1e9, SCX, SCY + 140);
        if (t > mid('middle', 0.84)) tr(sOff, SCX, SCY + 140, 0.55);
        op(midNote, P(t, end('middle') + 0.05, 0.25, linear));
        const off = t > mid('middle', 0.84);
        setH('dad', off ? 'shock' : 'smug', off ? 0.6 : 0.8);
        setH('kav', off ? 'deadpan' : 'annoyed', off && t > mid('middle', 0.9) ? 0 : 0.8);
      } else if (t < k('seoul')) {
        // Ah Boy: the second half of the jingle
        setText(scr.titleText, 'THE JINGLE');
        op(gJin, 1);
        pair('boy', 'mum');
        jl.forEach((g, i) => op(g, i < 2 ? 1 : P(t, mid('jingle2', i === 2 ? 0.08 : 0.5), 0.3, linear)));
        op(jStrip, P(t, end('jingle2') + 0.05, 0.3, linear));
        setH('boy', 'happy', 0.7, { lift: 1 });
        setH('mum', 'happy', 0.8);
      } else if (t < cNev) {
        // Mr Tan in Seoul, then Priya's −1
        setText(scr.titleText, t < at('minus') - 0.06 ? 'SEOUL, MARCH' : 'THE RANGE?');
        op(gSeo, 1);
        pair('tan', 'priya');
        const dur = end('seoul') - at('seoul');
        const said = [0.43, 0.5, 0.58, 0.65, 0.73, 0.8, 0.9].map(f => at('seoul') + dur * f);
        let cur = null;
        TEMPS.forEach((v, i) => {
          if (t < said[i]) return;
          cur = v;
          tileAt(temps[i], SCX - 130 + i * 68, SCY - 40, Math.max(0.01, P(t, said[i], 0.3, pop)));
        });
        therm.set(t >= at('minus') - 0.06 ? 4 : cur === null ? 6 : cur);
        if (t >= at('minus') - 0.06) {
          op(gMinus, 1);
          temps[5].rg(1); temps[2].hl(1, '#FF8A8A');
          op(minLab, P(t, mid('minus', 0.05), 0.25, linear));
          op(wMinus, P(t, mid('minus', 0.2), 0.3, linear));
          popSet(sOff, t, mid('minus', 0.72), 1e9, SCX + 82, SCY + 178);
          if (t > mid('minus', 0.72)) tr(sOff, SCX + 82, SCY + 178, 0.5);
          const off = t > mid('minus', 0.72);
          setH('priya', off ? 'annoyed' : 'smug', off ? 0 : 0.7);
          setH('tan', 'deadpan', -0.8);
        } else {
          setH('tan', 'happy', t < mid('seoul', 0.35) ? -0.6 : 0.8);
          setH('priya', 'neutral', 0.9);
        }
      } else {
        // Kavya: mean, median and mode of the lows
        setText(scr.titleText, 'SEOUL: MEAN, MEDIAN, MODE');
        op(gM2, 1);
        pair('kav', 'mum');
        wM2.show(0, P(t, mid('mean2', 0.02), 0.4, linear)); wM2.show(1, P(t, mid('mean2', 0.08), 0.4, linear));
        m2Notes.forEach((n, i) => op(n, P(t, mid('mean2', 0.02 + i * 0.06), 0.4, linear)));
        wM2.show(2, P(t, mid('mean2', 0.16), 0.4, linear)); wM2.show(3, P(t, mid('mean2', 0.36), 0.4, linear));
        wM2.ring(3, P(t, mid('mean2', 0.48), 0.3, linear)); [0, 1, 2].forEach(i => wM2.ring(i, 0));
        const srt = P(t, mid('mean2', 0.52), 0.8, ease);
        TEMPS.forEach((v, i) => {
          const x0 = -204 + i * 68, x1 = -204 + SORTT[i] * 68, dir = x1 > x0 ? -1 : 1;
          tileAt(temps[i], SCX + lerp(x0, x1, srt), SCY + 108 + dir * Math.sin(srt * Math.PI) * 30 * (x0 === x1 ? 0 : 1), 1);
        });
        temps[6].rg(P(t, mid('mean2', 0.64), 0.3, linear));
        if (t > mid('mean2', 0.82)) { temps[0].hl(1); temps[4].hl(1); }
        op(m2Sum, P(t, mid('mean2', 0.66), 0.3, linear));
        setH('kav', t < end('mean2') ? 'neutral' : 'happy', 0.7);
        setH('mum', 'happy', 0.8);
      }
    }

    /* ---------- visibility ---------- */
    for (const kk in H) op(H[kk], show[kk]);
    op(mean, show.mean); op(medi, show.medi); op(mo, show.mo); op(ranger, show.ranger); op(benny, show.benny);
    op(carrier, sW);
  };
});
