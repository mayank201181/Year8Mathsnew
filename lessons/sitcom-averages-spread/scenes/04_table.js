/* Scene 4: Twenty flats on Floor 8 (averages from frequency tables).
   Shots (hard sitcom cuts):
   W    Studio 5 wide: "Round 4: Floor 8, Block 208".
   SCR  the big screen, the speaker on the left: 20 flat doors with the number of people inside (Kavya's is a 4)
        -> Benny reads the table: x (people) | f (flats) -> Dad: (1 + 2 + 3 + 4 + 5) ÷ 5 = 3, WAY OFF!
        -> Ah Boy: (3 + 6 + 5 + 4 + 2) ÷ 5 = 4, WAY OFF!
   W    SIGMA swoops down onto the desk, arms up (lower third): "Σ = add them all up".
   SCR  Sigma: the table unrolls into a list of 20 numbers; the fx column appears (value × frequency)
        -> Kavya fills fx: 3, 12, 15, 16, 10; total 56 -> Mean: Σfx ÷ Σf = 56 ÷ 20 = 2.8, SPOT ON!
        -> Medi: (20 + 1)/2 = 10.5th value; running totals 3, 9, 14; values 10 to 14 are all 3s
        -> Kavya: the 10th and 11th are both 3: median 3 people -> Priya: "mode 6!" WAY OFF!
        -> Mo: 6 is the frequency; the mode is the value, 2 people -> Ranger: 5 − 1 = 4 (not 6 − 2).
   W    Mr Tan: one person (and Pythagoras) -> Sigma: "Cats are not data." -> Pythagoras disagrees. *cricket*. */
scene('table', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const popSet = (el, t, t0, t1, x, y, s) => { const p = t >= t0 && t < t1 ? P(t, t0, 0.35, linear) : 0; el.set(p); if (x !== undefined) tr(el, x, y, s === undefined ? 1 : s); };
  const fade = (el, t, t0, d) => op(el, P(t, t0, d || 0.3, linear));
  const GOLD = AS.gold, GREEN = '#1E9E5A', RED = '#D32F2F', BLUE = '#2E6FD8', PINK = '#FFC2E8', MINT = '#9FE0B5', BERRY = '#C2187A';

  /* layers */
  const Lbg = G(root), Lcard = G(root), Lcast = G(root), Lfront = G(root), Lpet = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= W: Studio 5 ================= */
  const studioShot = G(Lbg);
  const studio = asStudio(studioShot);
  Lfront.appendChild(studio.front); Lfront.appendChild(studio.top);
  const carrier = asCarrier(Lpet);
  const cRound = mkChip(Lfg, '**Round 4**: Floor 8, Block 208', { size: 32, col: GOLD });
  const cSigma = mkChip(Lfg, '{{Σ}} = **add them all up**', { size: 34, col: GOLD });
  const bubTan = mkSpeechBubble(Lfg, 'My flat: **1** person (+ 1 cat)', { size: 28, tail: 'down', tailX: 70 });
  const cCats = mkChip(Lfg, 'cats **≠** data', { size: 34, col: '#FF8A8A' });
  const cCricket = mkChip(Lfg, '*cricket*', { size: 30, col: '#A4BCCB' });
  const cBoth = mkChip(Lfg, '**both** wrong!', { size: 30, col: '#FF8A8A' });

  /* ================= SCR: the big screen ================= */
  const SCX = 818, SCY = 400;
  const scr = asScreen(Lcard, 680, 480, { title: 'FLOOR 8, BLOCK 208' });
  const C0 = scr.content;

  // the 20 doors (people living in each flat)
  const DOORS = [2, 3, 1, 4, 2, 3, 5, 2, 3, 4, 1, 2, 4, 3, 2, 5, 3, 4, 1, 2], KAV = 12;
  const gDoors = G(C0);
  const doorAt = i => [-270 + (i % 10) * 60, i < 10 ? -120 : -16];
  const doors = DOORS.map((v, i) => {
    const [x, y] = doorAt(i);
    return [E('rect', { x: x - 24, y: y - 40, width: 48, height: 80, rx: 5, fill: i === KAV ? '#BFE6FF' : '#E9D7C0', stroke: MK.ink, 'stroke-width': 3 }, gDoors),
      T(gDoors, x, y + 2, String(v), { size: 30, weight: 800, anchor: 'middle', fill: MK.ink })];
  });
  const knobs = E('path', { d: DOORS.map((v, i) => { const [x, y] = doorAt(i); return `M${x + 15},${y + 24} m-3.5,0 a3.5,3.5 0 1,0 7,0 a3.5,3.5 0 1,0 -7,0`; }).join(' '), fill: MK.ink }, gDoors);
  const kavLab = mkText(gDoors, doorAt(KAV)[0], 54, "Kavya's", { size: 26, anchor: 'middle', fill: BLUE });
  const doorNote = mkText(gDoors, 0, 100, '**20** flats: how many **people** in each?', { size: 30, anchor: 'middle', fill: MK.ink });

  // the frequency table, built as three column blocks so the fx and running-total columns can come and go
  const TX = -320, TY = -180, RH = 42, FS = 26;
  const X = [1, 2, 3, 4, 5], F = [3, 6, 5, 4, 2], FX = [3, 12, 15, 16, 10], CUM = [3, 9, 14, 18, 20];
  const gTab = G(C0);
  const tA = mkTable(gTab, [['People {{x}}', 'Flats {{f}}'], ...X.map((x, i) => [String(x), String(F[i])]), ['**Total**', '**20**']],
    { colW: [150, 130], rowH: RH, size: FS, ink: MK.ink, fill: '#FFFFFF', headFill: 'rgba(76,201,240,0.3)' });
  tr(tA, TX, TY);
  const tFx = mkTable(gTab, [['{{fx}}'], ...FX.map(String), ['**56**']].map(r => (Array.isArray(r) ? r : [r])),
    { colW: [110], rowH: RH, size: FS, ink: MK.ink, fill: '#FFFFFF', headFill: 'rgba(255,194,71,0.45)' });
  const tCum = mkTable(gTab, [['running total'], ...CUM.map(v => [String(v)])],
    { colW: [180], rowH: RH, size: FS, ink: MK.ink, fill: '#FFFFFF', headFill: 'rgba(86,214,155,0.4)' });
  const rowY = r => TY + r * RH + RH / 2;   // centre of table row r (0 = header)
  // marks (highlight bands) on cells
  const mkX = X.map((_, i) => tA.mark(i + 1, 0, 'rgba(255,228,92,0.45)'));
  const mkF = F.map((_, i) => tA.mark(i + 1, 1, 'rgba(255,228,92,0.45)'));
  const mkTot = [tA.mark(6, 1, 'rgba(86,214,155,0.35)'), tFx.mark(6, 0, 'rgba(86,214,155,0.35)')];
  // rings (red or green) around single cells, in table-local coordinates of gTab
  const ringAt = (col) => { const r = E('rect', { x: 0, y: 0, width: 10, height: 10, rx: 10, fill: 'none', stroke: col, 'stroke-width': 5 }, gTab); op(r, 0); return r; };
  const placeRing = (r, cx, cy, w, h) => { attr(r, 'x', cx - w / 2); attr(r, 'y', cy - h / 2); attr(r, 'width', w); attr(r, 'height', h); };
  const ringSix = ringAt(RED), ringTwo = ringAt(GREEN), ringOne = ringAt(GREEN), ringFive = ringAt(GREEN);
  placeRing(ringSix, TX + 150 + 65, rowY(2), 62, 38);
  placeRing(ringTwo, TX + 75, rowY(2), 62, 38);
  placeRing(ringOne, TX + 75, rowY(1), 62, 38);
  placeRing(ringFive, TX + 75, rowY(5), 62, 38);
  const arrSix = arrow(gTab, TX + 186, rowY(2), TX + 112, rowY(2), { color: BERRY, width: 5 });

  // bottom-of-screen working (Dad, Ah Boy)
  const BOT = 186;
  const wDad = mkMath(C0, 0, BOT, '(1 + 2 + 3 + 4 + 5) ÷ 5 = 15 ÷ 5 = 3', { size: 32, fill: MK.ink, anchor: 'middle' });
  const wBoy = mkMath(C0, 0, BOT, '(3 + 6 + 5 + 4 + 2) ÷ 5 = 20 ÷ 5 = 4', { size: 32, fill: MK.ink, anchor: 'middle' });
  const nDad = mkText(C0, 0, BOT - 46, 'the **values**, divided by the number of **rows**', { size: 26, anchor: 'middle', fill: RED });
  const nBoy = mkText(C0, 0, BOT - 46, 'the **flats**, divided by the number of **rows**', { size: 26, anchor: 'middle', fill: RED });

  // the list strip: 20 values in order
  const LIST = []; X.forEach((x, i) => { for (let j = 0; j < F[i]; j++) LIST.push(x); });
  const SP = 31, SY = 150, sx = j => -SP * 9.5 + j * SP;
  const gList = G(C0);
  const strip = LIST.map(v => {
    const g = G(gList);
    g.box = E('rect', { x: -14, y: -19, width: 28, height: 38, rx: 6, fill: '#FFF4D6', stroke: MK.ink, 'stroke-width': 2.5 }, g);
    T(g, 0, 9, String(v), { size: 26, weight: 800, anchor: 'middle', fill: MK.ink });
    return g;
  });
  const bandMed = E('rect', { x: sx(9) - 17, y: SY - 24, width: SP * 5 + 3, height: 48, rx: 9, fill: 'rgba(86,214,155,0.35)', stroke: GREEN, 'stroke-width': 3 }, gList);
  gList.insertBefore(bandMed, gList.firstChild);
  const brMed = mkBrace(gList, sx(13) + 14, SY + 24, sx(9) - 14, SY + 24, { col: GREEN, size: 26, depth: 16 });
  const tMed = mkText(gList, sx(11.5), SY + 70, 'values **10** to **14**: all **3**s', { size: 26, anchor: 'middle', fill: GREEN });
  const ring10 = E('rect', { x: sx(9) - 18, y: SY - 23, width: SP + 5, height: 46, rx: 8, fill: 'none', stroke: BERRY, 'stroke-width': 4 }, gList);
  const ring11 = E('rect', { x: sx(10) - 18, y: SY - 23, width: SP + 5, height: 46, rx: 8, fill: 'none', stroke: BERRY, 'stroke-width': 4 }, gList);
  const t1011 = mkText(gList, sx(10), SY + 70, '**10th** and **11th**: both **3**', { size: 26, anchor: 'middle', fill: BERRY });

  // right-hand panel texts (x from 70 to 320 while the fx column shows)
  const RXc = 195;
  const nList = mkText(C0, RXc, -60, '{{fx}} = value\n× frequency', { size: 30, anchor: 'middle', fill: MK.ink });
  const fxNotes = X.map((x, i) => mkMath(C0, 90, rowY(i + 1) + 10, `${x} × ${F[i]} = ${FX[i]}`, { size: 28, fill: '#5A6670' }));
  const fxTot = mkText(C0, 90, rowY(6) + 10, '**56** people', { size: 28, fill: GREEN });
  const wMean = mkWorking(C0, 175, -176, ['"mean" = Σfx/Σf', '= 56/20', '= 2.8'], { size: 32, fill: MK.ink, gap: 10, ringCol: GREEN });
  const nMean = mkText(C0, 196, wMean.lineY[2] + 44, 'people per flat', { size: 26, anchor: 'middle', fill: GREEN });
  const cFlats = mkChip(C0, '÷ the **flats** (20), not the **rows** (5)', { size: 26, col: BLUE, fill: '#EAF2FF' });
  tr(cFlats, -110, 190);
  // Medi: the 10.5th value (right of the slid-over running-total column, x 140 to 320)
  const RM = 232;
  const wPos = mkMath(C0, RM, -110, '(20 + 1)/2', { size: 32, fill: MK.ink, anchor: 'middle' });
  const wPos2 = mkText(C0, RM, -36, '= **10.5th**', { size: 30, anchor: 'middle', fill: MK.ink });
  const wPos3 = mkText(C0, RM, 2, 'value', { size: 28, anchor: 'middle', fill: MK.ink });
  const wMed3 = mkText(C0, RM, 62, 'median', { size: 28, anchor: 'middle', fill: GREEN });
  const wMed4 = mkText(C0, RM, 100, '= **3** people', { size: 28, anchor: 'middle', fill: GREEN });
  // Priya / Mo / Ranger (right panel x -40 to 320 with only x and f showing)
  const RP = 140;
  const wSix = mkText(C0, RP, -60, 'mode = **6**?', { size: 40, anchor: 'middle', fill: RED });
  const wFreq = mkText(C0, RP, -110, '**6** is the **frequency**', { size: 30, anchor: 'middle', fill: BERRY });
  const wVal = mkText(C0, RP, -50, 'the mode is the **value**:', { size: 30, anchor: 'middle', fill: MK.ink });
  const wMo = mkText(C0, RP, 20, 'mode = **2** people', { size: 38, anchor: 'middle', fill: BERRY });
  const wRng0 = mkText(C0, RP, -110, 'use the **values** ({{x}})', { size: 30, anchor: 'middle', fill: MK.ink });
  const wRng = mkMath(C0, RP, -30, '5 − 1 = 4', { size: 52, fill: MK.ink, anchor: 'middle' });
  const wRng2 = mkText(C0, RP, 20, 'people', { size: 30, anchor: 'middle', fill: MK.ink });
  const gNot = G(C0);
  const notR = mkText(gNot, RP, 100, '{{6 − 2}}  (frequencies)', { size: 30, anchor: 'middle', fill: RED });
  const notS = strike(gNot, RP - notR.w / 2 - 8, 90, RP + notR.w / 2 + 8, RED);
  // Ranger's tape down the x column, from 1 to 5
  const tapeV = E('rect', { x: TX + 112, y: rowY(1), width: 18, height: 10, rx: 3, fill: '#FFD23C', stroke: MK.ink, 'stroke-width': 3 }, gTab);

  /* stamps */
  const sOff = asStamp(Lfg, false), sOn = asStamp(Lfg, true);

  /* ================= the cast ================= */
  const mum = cast(Lcast, 'mum'), kav = cast(Lcast, 'kavya'), dad = cast(Lcast, 'dad'), boy = cast(Lcast, 'boy');
  const priya = cast(Lcast, 'priya'), tan = cast(Lcast, 'tan');
  const benny = cast(Lcast, 'benny');
  const sigma = cast(Lfg, 'sigma'), mean = cast(Lcast, 'mean'), medi = cast(Lcast, 'medi'), mo = cast(Lcast, 'mo'), ranger = cast(Lcast, 'ranger');
  Lfg.insertBefore(sigma, Lfg.firstChild);
  const H = { mum, kav, dad, boy, priya, tan, benny };
  const lt = { sigma: asLowerThird(Lhud, 'sigma') };
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cuts */
  const k = id => at(id) - 0.06;
  const cDoors = mid('round', 0.42), cTab = k('table'), cSig = k('sigma'), cList = k('list'), cMine = k('mine');
  const POS = { mum: [120, 446, 0.9], kav: [258, 440, 0.92], dad: [396, 446, 0.9], boy: [528, 456, 0.9], priya: [826, 446, 0.88], tan: [990, 440, 0.88] };
  const SPK = [330, 594, 1.1], LIS = [112, 604, 1.04], LIS2 = [104, 640, 0.98];
  const CART = { sigma: [262, 400, 0.88], mean: [262, 360, 0.66], medi: [252, 380, 0.84], mo: [262, 360, 0.92], ranger: [244, 380, 0.84] };
  const SIGW = [668, 404, 0.72];

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const sS = on(t, cDoors, cSig) || on(t, cList, cMine);
    const sW = sS ? 0 : 1;
    lt.sigma.set(0);
    [cRound, cSigma, bubTan, cCats, cCricket, cBoth, sOff, sOn].forEach(c => c.set(0));
    const show = { mum: 0, kav: 0, dad: 0, boy: 0, priya: 0, tan: 0, benny: 0, sigma: 0, mean: 0, medi: 0, mo: 0, ranger: 0 };
    const setH = (key, mood, look, extra) => H[key].set(Object.assign({ t, talk: scTalk(S, t, key === 'kav' ? 'kavya' : key), mood, look }, extra || {}));
    const toFront = c => Lcast.appendChild(c);

    /* ---------- backgrounds ---------- */
    op(studioShot, 1); op(Lfront, sW); studio.upd(t);
    op(studio.applause, 0);
    studio.applause.set(0);
    const mb = studio.board;
    mb.set(0, t > mid('mean', 0.75) ? '2.8' : '?'); mb.set(1, t > mid('threes', 0.8) ? '3' : '?');
    mb.set(2, t > mid('bestie', 0.8) ? '2' : '?'); mb.set(3, t > mid('range', 0.6) ? '4' : '?');
    [0, 1, 2, 3].forEach(i => mb.lit(i, t >= cMine ? 1 : 0));

    /* ---------- W: Studio 5 ---------- */
    if (sW) {
      if (sigma.parentNode !== Lfg) Lfg.insertBefore(sigma, Lfg.firstChild);
      ['mum', 'kav', 'dad', 'boy', 'priya', 'tan'].forEach(kk => { show[kk] = 1; tr(H[kk], ...POS[kk]); });
      tr(carrier, 1100, 530, 0.7);
      if (t < cSig) {
        // the round
        ['kav', 'mum', 'dad', 'boy', 'priya', 'tan'].forEach(kk => setH(kk, kk === 'kav' || kk === 'boy' ? 'happy' : 'neutral', POS[kk][0] < 600 ? 0.6 : -0.6));
        popSet(cRound, t, at('round') + 0.1, cDoors, 600, 264);
        carrier.set({ t, look: 0 });
      } else if (t < cMine) {
        // SIGMA swoops down onto the desk
        show.sigma = 1;
        const dn = P(t, cSig, 0.55, easeOut);
        tr(sigma, SIGW[0], lerp(-260, SIGW[1], dn), SIGW[2]);
        const arms = t < mid('sigma', 0.5) || t > mid('sigma', 0.62) ? 1 : 0.4;
        sigma.set({ t, talk: scTalk(S, t, 'sigma'), mood: t < mid('sigma', 0.6) ? 'smug' : 'annoyed', look: Math.sin(t * 2) * 0.6, arms });
        const shock = t > cSig + 0.25;
        ['kav', 'mum', 'dad', 'boy', 'priya', 'tan'].forEach(kk => setH(kk, shock ? (kk === 'dad' || kk === 'boy' ? 'shock' : 'neutral') : 'neutral', POS[kk][0] < SIGW[0] ? 0.8 : -0.8));
        popSet(cSigma, t, mid('sigma', 0.35), cList, 900, 262);
        popSet(cBoth, t, mid('sigma', 0.75), cList, 330, 262);
        lt.sigma.set(win(t, at('sigma') + 0.2, at('sigma') + 3.3, 0.3));
        carrier.set({ t, look: -0.8 });
      } else {
        // Mr Tan's flat; "Cats are not data."; Pythagoras disagrees
        show.sigma = 1;
        tr(sigma, SIGW[0], SIGW[1], SIGW[2]);
        const dataOn = t >= at('data') - 0.06, dis = t >= at('disagree') - 0.06;
        sigma.set({ t, talk: scTalk(S, t, 'sigma'), mood: 'deadpan', look: dataOn && !dis ? 0.9 : 0.6, arms: 0 });
        const pun = t > end('disagree') - 0.1;
        ['kav', 'mum', 'dad', 'boy', 'priya'].forEach(kk => setH(kk, pun ? 'deadpan' : 'neutral', pun ? 0 : 0.9));
        setH('tan', dataOn && !dis ? 'deadpan' : 'happy', dataOn ? -0.9 : -0.4);
        popSet(bubTan, t, mid('mine', 0.1), at('data') - 0.06, 930, 262);
        popSet(cCats, t, mid('data', 0.25), at('disagree') + 0.6, 920, 262);
        popSet(cCricket, t, end('disagree') + 0.15, 1e9, 380, 262);
        // Pythagoras narrows his eyes at Sigma
        const narrow = dis ? 0.55 : undefined;
        carrier.set({ t, look: dis ? -1 : dataOn ? -0.8 : 0.3, blink: narrow });
      }
    }

    /* ---------- SCR: the big screen ---------- */
    op(scr, sS);
    if (sS) {
      tr(scr, SCX, SCY); scr.upd(t);
      // listeners and speakers on the left
      const pair = (spk, lis, lisPos) => { show[spk] = 1; tr(H[spk], ...SPK); if (lis) { show[lis] = 1; tr(H[lis], ...(lisPos || LIS)); toFront(H[lis]); } toFront(H[spk]); };
      const cart = (c, key, lis) => { show[key] = 1; tr(c, ...CART[key]); if (lis) { show[lis] = 1; tr(H[lis], ...LIS2); toFront(H[lis]); } toFront(c); };
      tr(carrier, -400, 0); // not in this shot

      // which blocks show
      const fxOn = t >= cList && t < k('median');
      const slide = t >= k('median') && t < k('six') ? P(t, mid('median', 0.36), 0.5, ease) : 0;
      const cumOn = t >= k('median') && t < k('six');
      op(gDoors, t < cTab ? 1 : 0); op(gTab, t >= cTab ? 1 : 0);
      tr(tFx, TX + 280, TY); op(tFx, fxOn ? 1 : 0);
      tr(tCum, TX + 280 + 110 * (1 - slide), TY); op(tCum, cumOn ? clamp(slide * 3) : 0);
      [wDad, wBoy, nDad, nBoy, nList, fxTot, wMean, nMean, wPos, wPos2, wPos3, wMed3, wMed4, wSix, wFreq, wVal, wMo, wRng0, wRng, wRng2, gNot, gList, bandMed, ring10, ring11, t1011, tMed, tapeV]
        .forEach(e => op(e, 0));
      fxNotes.forEach(e => op(e, 0));
      cFlats.set(0); brMed.set(0);
      [...mkX, ...mkF, ...mkTot].forEach(m => m.set(0));
      [ringSix, ringTwo, ringOne, ringFive].forEach(r => op(r, 0));
      op(arrSix, 0);
      // table rows: header + rows as Benny reads them; the totals row from Ah Boy's "20"
      const rowT = [0, 0.3, 0.47, 0.64, 0.78, 0.9].map(f => mid('table', f));
      tA.cells.forEach((row, r) => row.forEach(c => op(c, r === 6 ? 0 : t >= rowT[r] ? 1 : 0.0)));
      if (t >= mid('boy', 0.45)) { op(tA.cells[6][0], 1); op(tA.cells[6][1], 1); }
      tFx.cells.forEach((row, r) => op(row[0], r === 0 ? 1 : 0));
      tCum.cells.forEach((row, r) => op(row[0], r === 0 ? 1 : 0));
      // the list strip (hidden until Sigma)
      const listOn = (t >= cList && t < k('mean')) || (t >= k('median') && t < k('six'));
      op(gList, listOn ? 1 : 0);
      strip.forEach((g, j) => { tr(g, sx(j), SY); attr(g.box, 'fill', '#FFF4D6'); });

      if (t < cTab) {
        // the doors
        setText(scr.titleText, 'FLOOR 8, BLOCK 208');
        pair('kav', 'boy');
        doors.forEach((d, i) => { const p = P(t, cDoors + 0.05 + i * 0.045, 0.25, linear); op(d[0], p); op(d[1], p); });
        fade(knobs, t, cDoors + 0.95); fade(kavLab, t, cDoors + 1.2); fade(doorNote, t, cDoors + 1.6);
        setH('kav', 'happy', 0.8); setH('boy', 'happy', 0.8);
      } else if (t < cSig) {
        setText(scr.titleText, 'PEOPLE PER FLAT');
        if (t < k('dad')) {
          pair('benny', 'kav');
          const talk = scTalk(S, t, 'benny');
          H.benny.set({ t, talk, mood: 'happy', look: 0.8, lift: 1, ting: win(t, at('table') + 0.1, at('table') + 0.9, 0.15) });
          setH('kav', 'neutral', 0.8);
        } else if (t < k('boy')) {
          pair('dad', 'kav');
          mkX.forEach((m, i) => m.set(P(t, mid('dad', 0.06 + i * 0.05), 0.2, linear)));
          fade(nDad, t, mid('dad', 0.1)); fade(wDad, t, mid('dad', 0.3));
          popSet(sOff, t, end('dad') - 0.15, 1e9, SCX + 170, SCY - 30, 0.55);
          const off = t > end('dad') - 0.15;
          setH('dad', off ? 'shock' : 'smug', 0.8);
          setH('kav', off ? 'deadpan' : 'annoyed', off ? 0 : 0.8);
        } else {
          pair('boy', 'dad');
          mkF.forEach((m, i) => m.set(P(t, mid('boy', 0.1 + i * 0.05), 0.2, linear)));
          fade(nBoy, t, mid('boy', 0.05)); fade(wBoy, t, mid('boy', 0.4));
          popSet(sOff, t, end('boy') - 0.1, 1e9, SCX + 170, SCY - 30, 0.55);
          setH('boy', 'happy', 0.8, { lift: 1 });
          setH('dad', t > end('boy') - 0.1 ? 'smug' : 'annoyed', 0.8);
        }
      } else {
        // the fx section
        const r6 = t >= cList;
        if (r6) { op(tA.cells[6][0], 1); op(tA.cells[6][1], 1); }
        if (t < k('fx')) {
          // Sigma: a list of 20 numbers; the fx column
          setText(scr.titleText, 'A LIST OF 20 NUMBERS');
          cart(sigma, 'sigma', 'dad');
          sigma.set({ t, talk: scTalk(S, t, 'sigma'), mood: 'smug', look: 0.8, arms: t < mid('list', 0.2) ? 1 : 0 });
          setH('dad', 'deadpan', 0.6);
          // tiles fly out of their table rows into the strip
          strip.forEach((g, j) => {
            const r = LIST[j];   // row index = value
            const p = P(t, at('list') + 0.15 + j * 0.06, 0.45, ease);
            op(g, clamp(p * 4));
            tr(g, lerp(TX + 75, sx(j), p), lerp(rowY(r), SY, p) - Math.sin(p * Math.PI) * 26, Math.max(0.01, lerp(0.6, 1, p)));
          });
          tFx.cells.forEach((row, r) => op(row[0], r === 0 ? P(t, mid('list', 0.55), 0.3, linear) : 0));
          op(tFx, P(t, mid('list', 0.5), 0.3, linear));
          fade(nList, t, mid('list', 0.58));
        } else if (t < k('mean')) {
          // Kavya fills the fx column
          setText(scr.titleText, 'ADD AN fx COLUMN');
          cart(sigma, 'sigma');
          tr(sigma, 112, 420, 0.66); toFront(sigma);
          sigma.set({ t, mood: t > mid('fx', 0.95) ? 'happy' : 'smug', look: 0.9, arms: 0 });
          pair('kav');
          const ft = [0.04, 0.22, 0.4, 0.57, 0.74].map(f => mid('fx', f));
          FX.forEach((v, i) => { op(tFx.cells[i + 1][0], P(t, ft[i] + 0.4, 0.2, linear)); op(fxNotes[i], P(t, ft[i], 0.25, linear)); });
          op(tFx.cells[6][0], P(t, mid('fx', 0.9), 0.2, linear));
          fade(fxTot, t, mid('fx', 0.92));
          strip.forEach(g => op(g, 0.55));
          setH('kav', 'neutral', 0.8);
        } else {
          FX.forEach((v, i) => op(tFx.cells[i + 1][0], 1)); op(tFx.cells[6][0], 1);
          if (t < k('median')) {
            // Mean: total of fx ÷ total of f
            setText(scr.titleText, 'THE MEAN');
            cart(mean, 'mean', 'dad');
            mean.set({ t, talk: scTalk(S, t, 'mean'), mood: t > mid('mean', 0.8) ? 'smug' : 'deadpan', look: 0.8, arms: t > mid('mean', 0.3) && t < mid('mean', 0.7) ? 1 : 0, tilt: 0 });
            setH('dad', t > mid('mean', 0.75) ? 'sad' : 'neutral', 0.7);
            mkTot.forEach(m => m.set(P(t, mid('mean', 0.18), 0.3, linear)));
            op(wMean, 1);
            wMean.show(0, P(t, mid('mean', 0.05), 0.4, linear)); wMean.show(1, P(t, mid('mean', 0.3), 0.4, linear)); wMean.show(2, P(t, mid('mean', 0.42), 0.4, linear));
            wMean.ring(2, P(t, mid('mean', 0.55), 0.3, linear)); wMean.ring(0, 0); wMean.ring(1, 0);
            fade(nMean, t, mid('mean', 0.58));
            popSet(cFlats, t, mid('mean', 0.72), 1e9);
            tr(cFlats, -110, 190);
            popSet(sOn, t, mid('mean', 0.93), 1e9, SCX + 228, SCY + 186, 0.5);
          } else if (t < k('threes')) {
            // Medi: the 10.5th value, running totals
            setText(scr.titleText, 'THE MEDIAN');
            cart(medi, 'medi', 'priya');
            const ws = t < mid('median', 0.1);
            medi.set({ t, talk: ws ? 0 : scTalk(S, t, 'medi'), mood: 'neutral', look: 0.8, whistle: ws ? 1 : 0, point: ws ? 0 : 1 });
            setH('priya', 'neutral', 0.6);
            fade(wPos, t, mid('median', 0.08)); fade(wPos2, t, mid('median', 0.2)); fade(wPos3, t, mid('median', 0.2));
            const ct = [0.48, 0.56, 0.64, 0.78, 0.82].map(f => mid('median', f));
            CUM.forEach((v, i) => op(tCum.cells[i + 1][0], P(t, ct[i], 0.2, linear)));
            const hl = P(t, mid('median', 0.72), 0.3, linear);
            op(bandMed, hl); brMed.set(P(t, mid('median', 0.78), 0.3, linear)); op(tMed, P(t, mid('median', 0.8), 0.3, linear));
          } else if (t < k('six')) {
            // Kavya: the 10th and 11th
            setText(scr.titleText, 'THE MEDIAN');
            pair('kav', 'mum');
            setH('kav', t > mid('threes', 0.75) ? 'happy' : 'neutral', 0.8); setH('mum', 'happy', 0.8);
            CUM.forEach((v, i) => op(tCum.cells[i + 1][0], 1));
            op(wPos, 1); op(wPos2, 1); op(wPos3, 1);
            op(bandMed, 0.5);
            fade(ring10, t, mid('threes', 0.15)); fade(ring11, t, mid('threes', 0.3));
            fade(t1011, t, mid('threes', 0.3));
            fade(wMed3, t, mid('threes', 0.7)); fade(wMed4, t, mid('threes', 0.7));
          } else {
            // the mode and the range: just x and f
            setText(scr.titleText, t < k('range') ? 'THE MODE' : 'THE RANGE');
            if (t < k('bestie')) {
              pair('priya', 'kav');
              fade(ringSix, t, mid('six', 0.2)); fade(wSix, t, mid('six', 0.25));
              popSet(sOff, t, mid('six', 0.82), 1e9, SCX + 140, SCY + 150, 0.55);
              const off = t > mid('six', 0.82);
              setH('priya', off ? 'annoyed' : 'smug', off ? 0 : 0.8);
              setH('kav', off ? 'deadpan' : 'annoyed', 0.8);
            } else if (t < k('range')) {
              cart(mo, 'mo', 'priya');
              mo.set({ t, talk: scTalk(S, t, 'mo'), mood: 'happy', look: 0.8, hearts: t > mid('bestie', 0.7) ? 1 : 0.2, likes: t > mid('bestie', 0.7) ? '♥ 2' : '♥ 3' });
              setH('priya', 'annoyed', 0.6);
              op(ringSix, 1);
              fade(wFreq, t, mid('bestie', 0.2));
              fade(arrSix, t, mid('bestie', 0.5)); arrSix.set(P(t, mid('bestie', 0.5), 0.35, linear));
              fade(ringTwo, t, mid('bestie', 0.7));
              fade(wVal, t, mid('bestie', 0.5)); fade(wMo, t, mid('bestie', 0.72));
            } else {
              cart(ranger, 'ranger', 'dad');
              const str = P(t, mid('range', 0.35), 0.9, ease);
              ranger.set({ t, talk: scTalk(S, t, 'ranger'), mood: t > mid('range', 0.8) ? 'smug' : 'neutral', look: 0.8, reach: 40 + 80 * str });
              setH('dad', 'neutral', 0.6);
              fade(wRng0, t, mid('range', 0.1));
              fade(ringOne, t, mid('range', 0.4)); fade(ringFive, t, mid('range', 0.4));
              op(tapeV, str > 0 ? 1 : 0); attr(tapeV, 'height', Math.max(10, (rowY(5) - rowY(1)) * str));
              fade(wRng, t, mid('range', 0.55)); fade(wRng2, t, mid('range', 0.6));
              op(gNot, P(t, mid('range', 0.3), 0.3, linear)); notS.set(P(t, mid('range', 0.42), 0.3, linear));
            }
          }
        }
      }
    }

    /* ---------- visibility ---------- */
    for (const kk in H) op(H[kk], show[kk]);
    op(sigma, show.sigma); op(mean, show.mean); op(medi, show.medi); op(mo, show.mo); op(ranger, show.ranger);
    op(carrier, sW);
  };
});
