/* Scene 8: The scoreboard saves you some marks (exam traps), then the results.
   Shots (hard sitcom cuts):
   B    the giant scoreboard: "6 EXAM TRAPS".
   TH   six confessionals, one trap card each: Medi (ORDER first: 7 2 9 4 5 -> 2 4 5 7 9, whistle);
        Sigma (mean = Σfx ÷ Σf, the TOTAL frequency, not the rows); Mo (the mode is the VALUE: 2 people, not 6 flats);
        Ranger (one number: 10 − 2 = 8, not "2 to 10"); Kavya (Centre, Spread, Story: two sentences, in context);
        Ah Boy (read the KEY: 1 | 4 = 1.4 kg, not 14 kg), hugging a small durian, sad.
   L    logo: PERFECTLY AVERAGE will return.
   W    the results: drum roll, a spotlight sweeps and lands on Team Tan; Benny, APPLAUSE, the trophy.
   SCR  Mr Tan: a family of one: mean me, median me, range 0 -> Ah Boy: "What about Pythagoras?" -> "Cats are not
        data." (Pythagoras narrows his eyes)
   W    Dad: "still above average" -> Otto rolls in behind the family: "Group hug!" -> he rolls away, everyone leans
        after him, Mean tilts further and further and slides off the desk out of frame; his bow tie stays behind.
        Final frame: Mr Tan, the trophy and Pythagoras. */
scene('traps', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const popSet = (el, t, t0, t1, x, y, s) => { const p = t >= t0 && t < t1 ? P(t, t0, 0.35, linear) : 0; el.set(p); if (x !== undefined) tr(el, x, y, s === undefined ? 1 : s); };
  const fade = (el, t, t0, d) => { const p = P(t, t0, d || 0.3, easeOut); op(el, p); };
  const outline = (w, col, sw) => { w.setAttribute('stroke', col); w.setAttribute('stroke-width', sw || 10); w.setAttribute('paint-order', 'stroke'); w.setAttribute('stroke-linejoin', 'round'); return w; };
  const GOLD = AS.gold, GREEN = '#1E9E5A', RED = '#C62828', BLUE = '#2E6FD8', BERRY = '#C2187A', INK = MK.ink;
  const CX = 880;

  /* layers */
  const Lbg = G(root), Lcard = G(root), Lcast = G(root), Lfront = G(root), Lpet = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= B: the giant scoreboard ================= */
  const boardShot = G(Lbg);
  const board = asBoardShot(boardShot);
  const banner = G(Lfg);
  E('rect', { x: -450, y: -58, width: 900, height: 118, rx: 22, fill: '#1A0B36', stroke: GOLD, 'stroke-width': 6 }, banner);
  outline(T(banner, 0, 10, '6 EXAM TRAPS', { size: 64, weight: 800, anchor: 'middle', fill: GOLD, ls: 4 }), '#2A0B4A', 8);
  T(banner, 0, 46, 'the scoreboard saves you some marks', { size: 28, weight: 600, anchor: 'middle', fill: '#FFFFFF' });

  /* ================= TH: confessionals and trap cards ================= */
  const WHO = ['medi', 'sigma', 'mo', 'ranger', 'kavya', 'boy'];
  const confs = WHO.map(w => asConf(Lbg, w));
  function trCard(n) {
    const g = G(Lcard);
    E('rect', { x: 606, y: 136, width: 556, height: 470, rx: 18, fill: 'rgba(0,0,0,0.3)' }, g);
    E('rect', { x: 600, y: 130, width: 556, height: 470, rx: 18, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, g);
    const head = mkChip(g, 'TRAP ' + n, { size: 30, col: '#D32F2F', solid: true, ink: '#FFFFFF' }); tr(head, CX, 180); head.set(1);
    return g;
  }
  const txt = (parent, y, s, o) => mkText(parent, CX, y, s, Object.assign({ size: 34, anchor: 'middle', fill: INK }, o || {}));
  function trNo(parent, y, s, o) {
    const g = G(parent), m = txt(g, y, s, Object.assign({ fill: RED }, o || {}));
    const sl = strike(g, CX - m.w / 2 - 10, y - 11, CX + m.w / 2 + 10, RED);
    g.set = p => sl.set(p);
    return g;
  }
  const tileOf = (parent, v, col) => {
    const g = G(parent);
    g.box = E('rect', { x: -32, y: -32, width: 64, height: 64, rx: 12, fill: col || '#FFE7A3', stroke: INK, 'stroke-width': 4 }, g);
    T(g, 0, 14, String(v), { size: 38, weight: 800, anchor: 'middle', fill: INK });
    return g;
  };
  // 1 Medi: order first
  const c1 = trCard(1);
  const c1a = txt(c1, 256, 'Put the data **in ORDER** first', { size: 34, boldFill: GREEN });
  const RAW = [7, 2, 9, 4, 5], RANK = [3, 0, 4, 1, 2];
  const c1t = RAW.map(v => tileOf(c1, v));
  const c1b = txt(c1, 450, 'then find the **middle**', { size: 32 });
  const c1c = txt(c1, 530, 'median = **5**', { size: 40, fill: GREEN });
  // 2 Sigma: total frequency
  const c2 = trCard(2);
  const c2a = txt(c2, 256, 'In a **frequency table**:', { size: 34, boldFill: BLUE });
  const c2b = mkMath(c2, CX, 360, '"mean" = Σfx/Σf', { size: 50, fill: INK, anchor: 'middle' });
  const c2c = txt(c2, 460, '÷ the **total frequency** ✓', { size: 32, fill: GREEN });
  const c2d = trNo(c2, 532, '÷ the number of rows', { size: 32 });
  // 3 Mo: the value
  const c3 = trCard(3);
  const c3a = txt(c3, 256, 'mode = the **VALUE**', { size: 40, boldFill: BERRY });
  const c3t = mkTable(c3, [['People {{x}}', 'Flats {{f}}'], ['**2**', '6']], { colW: [170, 170], rowH: 54, size: 30, ink: INK, fill: '#FFFFFF', headFill: 'rgba(76,201,240,0.3)' });
  tr(c3t, CX - 170, 290);
  const c3r = E('rect', { x: CX - 170 + 50, y: 349, width: 70, height: 44, rx: 12, fill: 'none', stroke: GREEN, 'stroke-width': 5 }, c3);
  const c3b = txt(c3, 470, '**2 people** ✓', { size: 38, fill: GREEN });
  const c3c = trNo(c3, 540, '6 flats', { size: 34 });
  // 4 Ranger: one number
  const c4 = trCard(4);
  const c4a = txt(c4, 256, 'range = **ONE** number', { size: 40, boldFill: '#B07A00' });
  const c4b = txt(c4, 316, 'largest − smallest', { size: 30, fill: '#5A4A52' });
  const c4c = mkMath(c4, CX, 420, '10 − 2 = 8', { size: 60, fill: GREEN, anchor: 'middle' });
  const c4d = trNo(c4, 520, '"2 to 10"', { size: 38 });
  // 5 Kavya: Centre, Spread, Story
  const c5 = trCard(5);
  const c5chips = [['Centre', GOLD], ['Spread', '#56D69B'], ['Story', '#FF8FC8']].map(([w, col], i) => { const c = mkChip(c5, '**' + w + '**', { size: 30, col, solid: true }); tr(c, CX - 170 + i * 170, 262); return c; });
  const c5a = txt(c5, 350, '1. an **average** (e.g. the mean)', { size: 30, boldFill: BLUE });
  const c5b = txt(c5, 410, '2. the **range** (the spread)', { size: 30, boldFill: GREEN });
  const c5c = txt(c5, 470, '... both **in context**', { size: 30, boldFill: BERRY });
  const c5d = txt(c5, 545, '**Two sentences.**', { size: 38 });
  // 6 Ah Boy: read the key
  const c6 = trCard(6);
  const c6a = txt(c6, 256, 'Read the **KEY** first', { size: 40, boldFill: RED });
  const c6k = G(c6);
  E('rect', { x: CX - 200, y: 290, width: 400, height: 58, rx: 12, fill: 'rgba(86,214,155,0.22)', stroke: GREEN, 'stroke-width': 4 }, c6k);
  txt(c6k, 330, 'Key: **2 | 5** means **2.5 kg**', { size: 30, boldFill: BLUE });
  const c6b = txt(c6, 436, '1 | 4 = **1.4 kg** ✓', { size: 40, fill: GREEN });
  const c6c = trNo(c6, 524, '1 | 4 = 14 kg', { size: 36 });
  const cards = [c1, c2, c3, c4, c5, c6];
  const hugDurian = G(Lfg); asDurian(hugDurian, 0.9);

  /* ================= L: will return ================= */
  const logoBg = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#1A0B36', '#5B2A9E', true) }, logoBg);
  let rays = '';
  for (let i = 0; i < 16; i++) { const a0 = i / 16 * TAU, a1 = a0 + TAU / 40; rays += `M0,0 L${(Math.cos(a0) * 1100).toFixed(0)},${(Math.sin(a0) * 1100).toFixed(0)} L${(Math.cos(a1) * 1100).toFixed(0)},${(Math.sin(a1) * 1100).toFixed(0)} Z `; }
  const rayP = E('path', { d: rays, fill: GOLD, opacity: 0.07 }, logoBg);
  E('ellipse', { cx: 600, cy: 610, rx: 600, ry: 170, fill: glow('#FF5FC8'), opacity: 0.3 }, logoBg);
  const logo = G(Lhud);
  outline(T(logo, 0, -78, 'PERFECTLY', { size: 62, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 8 }), '#2A0B4A');
  outline(T(logo, 0, 30, 'AVERAGE', { size: 116, weight: 800, anchor: 'middle', fill: GOLD, ls: 4 }), '#2A0B4A');
  const lvl = G(logo); tr(lvl, 0, 84);
  E('rect', { x: -250, y: -20, width: 500, height: 40, rx: 12, fill: linGrad('#FFE07A', '#F2B21C', true), stroke: '#2A0B4A', 'stroke-width': 5 }, lvl);
  E('rect', { x: -60, y: -13, width: 120, height: 26, rx: 13, fill: '#C8F59A', stroke: '#2A0B4A', 'stroke-width': 3 }, lvl);
  E('path', { d: 'M-16,-13 L-16,13 M16,-13 L16,13', stroke: '#2A0B4A', 'stroke-width': 3 }, lvl);
  const lvlBub = E('ellipse', { cx: 0, cy: 0, rx: 13, ry: 8, fill: '#F4FFE8', stroke: '#6E9E3A', 'stroke-width': 2 }, lvl);
  const willRet = T(Lhud, 600, 470, 'will return', { size: 50, weight: 600, anchor: 'middle', fill: '#FFFFFF' });

  /* ================= W: Studio 5 ================= */
  const studioShot = G(Lbg);
  const studio = asStudio(studioShot);
  Lfront.appendChild(studio.front); Lfront.appendChild(studio.top);
  const carrier = asCarrier(Lpet);
  const spot = E('path', { d: 'M-30,-480 L30,-480 L150,40 L-150,40 Z', fill: '#FFF4C2', opacity: 0.28 }, Lfront);
  const spotPool = E('ellipse', { cx: 0, cy: 34, rx: 150, ry: 26, fill: '#FFF4C2', opacity: 0.35 }, Lfront);
  const cDrum = mkChip(Lfg, '*drum roll*', { size: 30, col: '#A4BCCB' });
  const cWin = mkChip(Lfg, 'WINNER: **TEAM TAN**', { size: 32, col: GOLD });
  const cAbove = mkChip(Lfg, 'still **ABOVE** average ↑', { size: 30, col: '#7FD3FF' });
  // the trophy
  const trophy = G(Lpet);
  E('path', { d: 'M-34,-92 L34,-92 Q34,-46 0,-38 Q-34,-46 -34,-92 Z', fill: linGrad('#FFE07A', '#E2A400', true), stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, trophy);
  E('path', { d: 'M-34,-82 Q-54,-80 -50,-64 Q-46,-52 -28,-54 M34,-82 Q54,-80 50,-64 Q46,-52 28,-54', fill: 'none', stroke: SC_INK, 'stroke-width': 5 }, trophy);
  E('rect', { x: -7, y: -40, width: 14, height: 22, fill: '#E2A400', stroke: SC_INK, 'stroke-width': 3 }, trophy);
  E('rect', { x: -30, y: -20, width: 60, height: 20, rx: 4, fill: '#5A3A1A', stroke: SC_INK, 'stroke-width': 3 }, trophy);
  T(trophy, 0, -58, '1', { size: 30, weight: 800, anchor: 'middle', fill: '#8A5A08' });
  // Mean's bow tie, left behind on the desk
  const bowTie = G(Lpet);
  E('path', { d: 'M0,0 L-18,-9 L-18,9 Z M0,0 L18,-9 L18,9 Z', fill: '#1E2A5A', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, bowTie);
  E('circle', { r: 5, fill: '#2E4C8C', stroke: SC_INK, 'stroke-width': 2 }, bowTie);

  /* ================= SCR: Team Tan ================= */
  const SCX = 818, SCY = 400;
  const scr = asScreen(Lcard, 680, 480, { title: 'TEAM TAN: A FAMILY OF ONE' });
  const C0 = scr.content;
  const sD = mkText(C0, 0, -130, 'data: **Mr Tan**  (just one value)', { size: 30, anchor: 'middle', fill: INK });
  const sM = mkText(C0, 0, -50, 'mean = **me**', { size: 40, anchor: 'middle', fill: INK, boldFill: BLUE });
  const sMd = mkText(C0, 0, 15, 'median = **me**', { size: 40, anchor: 'middle', fill: INK, boldFill: GREEN });
  const sR = mkText(C0, 0, 85, 'range = me − me = **0**', { size: 40, anchor: 'middle', fill: INK, boldFill: '#B07A00' });
  const cCons = mkChip(C0, 'perfectly **consistent**', { size: 30, col: GREEN, fill: '#E6F7EC' });
  const cCats = mkChip(C0, 'cats **≠** data', { size: 34, col: RED, fill: '#FFF0F0' });

  /* ================= the cast ================= */
  const otto = cast(Lcast, 'otto');
  const mum = cast(Lcast, 'mum'), kav = cast(Lcast, 'kavya'), dad = cast(Lcast, 'dad'), boy = cast(Lcast, 'boy');
  const priya = cast(Lcast, 'priya'), tan = cast(Lcast, 'tan');
  const benny = cast(Lfg, 'benny');
  Lfg.insertBefore(benny, Lfg.firstChild);
  const medi = cast(Lcast, 'medi'), mo = cast(Lcast, 'mo'), ranger = cast(Lcast, 'ranger'), sigma = cast(Lcast, 'sigma');
  const mean = cast(Lpet, 'mean');
  const meanTie = mean.querySelector('g[transform="translate(0.00 66.00)"]') || G(Lhud);
  const H = { mum, kav, dad, boy, priya, tan };
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cuts */
  const k = id => at(id) - 0.06;
  const TRAPS = ['t1', 't2', 't3', 't4', 't5', 't6'];
  const cRet = k('return'), cRes = k('results'), cOne = k('one'), cLost = k('lost');
  const POS = { mum: [120, 446, 0.9], kav: [258, 440, 0.92], dad: [396, 446, 0.9], boy: [528, 456, 0.9], priya: [826, 446, 0.88], tan: [990, 440, 0.88] };
  const SPK = [330, 594, 1.1], LIS = [112, 604, 1.04];
  const MEANX = 690, MEANY = 464;

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const sB = on(t, -1, k('t1'));
    const trap = TRAPS.findIndex((id, i) => t >= k(id) && t < (i < 5 ? k(TRAPS[i + 1]) : cRet));
    const sL = on(t, cRet, cRes), sS = on(t, cOne, cLost), sW = !sB && trap < 0 && !sL && !sS ? 1 : 0;
    [cDrum, cWin, cAbove].forEach(c => c.set(0));
    const show = { mum: 0, kav: 0, dad: 0, boy: 0, priya: 0, tan: 0, benny: 0, medi: 0, mo: 0, ranger: 0, sigma: 0, mean: 0, otto: 0 };
    const CM = { mum, kav, dad, boy, priya, tan, benny, medi, mo, ranger, sigma, mean, otto };
    const setH = (key, mood, look, extra) => H[key].set(Object.assign({ t, talk: scTalk(S, t, key === 'kav' ? 'kavya' : key), mood, look }, extra || {}));
    for (const kk in H) tr(H[kk], ...(POS[kk] || [0, 0]));

    /* ---------- B: 6 EXAM TRAPS ---------- */
    op(boardShot, sB); op(banner, 0);
    if (sB) {
      const sl = board.slots;
      show.mean = show.medi = show.mo = show.ranger = 1;
      Lcast.appendChild(mean);
      tr(mean, sl[0].x, sl[0].y + 90, 0.72); tr(medi, sl[1].x, sl[1].y + 74, 0.74); tr(mo, sl[2].x, sl[2].y + 60, 0.7); tr(ranger, sl[3].x - 24, sl[3].y + 80, 0.74);
      mean.set({ t, mood: 'deadpan', look: 0.3, tilt: 0 }); medi.set({ t, mood: 'smug', look: 0.3 }); mo.set({ t, mood: 'happy', look: -0.3 }); ranger.set({ t, mood: 'neutral', look: -0.5, reach: 40 });
      [0, 1, 2, 3].forEach(i => { board.lit(i, Math.floor(t * 3) % 4 === i ? 1 : 0.2); board.set(i, '!'); });
      const bp = P(t, mid('intro', 0.05), 0.45, pop);
      op(banner, clamp(bp * 3)); tr(banner, 600, 258, Math.max(0.01, 0.6 + 0.4 * bp));
    }

    /* ---------- TH: the trap confessionals ---------- */
    confs.forEach((c, i) => c.set(trap === i ? 1 : 0, t));
    cards.forEach((c, i) => op(c, trap === i ? 1 : 0));
    op(hugDurian, 0);
    if (trap >= 0) {
      const id = TRAPS[trap], who = WHO[trap];
      const fin = P(t, k(id), 0.25, linear);
      if (trap === 0) {
        show.medi = 1; Lcast.appendChild(medi); tr(medi, 320, 420, 1.3);
        const ws = t > mid('t1', 0.55);
        medi.set({ t, talk: ws ? 0 : scTalk(S, t, 'medi'), mood: ws ? 'annoyed' : 'neutral', look: 0.7, whistle: ws ? 1 : 0, point: ws ? 0 : 1 });
        const srt = P(t, mid('t1', 0.6), 0.8, ease);
        RAW.forEach((v, i) => {
          const x0 = -152 + i * 76, x1 = -152 + RANK[i] * 76, dir = x1 > x0 ? -1 : 1;
          tr(c1t[i], CX + lerp(x0, x1, srt), 358 + dir * Math.sin(srt * Math.PI) * 34 * (x0 === x1 ? 0 : 1));
          attr(c1t[i].box, 'fill', srt >= 1 ? '#BFF0CF' : '#FFE7A3');
        });
        fade(c1a, t, mid('t1', 0.1)); fade(c1b, t, end('t1') - 0.2); fade(c1c, t, end('t1') + 0.1);
        if (srt >= 1 && t > end('t1')) attr(c1t[4].box, 'stroke', GREEN);
        else attr(c1t[4].box, 'stroke', INK);
      } else if (trap === 1) {
        show.sigma = 1; Lcast.appendChild(sigma); tr(sigma, 310, 450, 1.08);
        sigma.set({ t, talk: scTalk(S, t, 'sigma'), mood: t > mid('t2', 0.7) ? 'annoyed' : 'smug', look: 0.7, arms: t > mid('t2', 0.72) ? 1 : 0 });
        fade(c2a, t, mid('t2', 0.1)); fade(c2b, t, mid('t2', 0.25)); fade(c2c, t, mid('t2', 0.45));
        op(c2d, P(t, mid('t2', 0.62), 0.25, linear)); c2d.set(P(t, mid('t2', 0.78), 0.3, linear));
      } else if (trap === 2) {
        show.mo = 1; Lcast.appendChild(mo); tr(mo, 320, 400, 1.3);
        mo.set({ t, talk: scTalk(S, t, 'mo'), mood: 'happy', look: 0.7, hearts: t > mid('t3', 0.4) ? 1 : 0, likes: '♥ 2' });
        fade(c3a, t, mid('t3', 0.1)); fade(c3t, t, mid('t3', 0.3)); fade(c3r, t, mid('t3', 0.5));
        fade(c3b, t, mid('t3', 0.55)); op(c3c, P(t, mid('t3', 0.72), 0.25, linear)); c3c.set(P(t, mid('t3', 0.82), 0.3, linear));
      } else if (trap === 3) {
        show.ranger = 1; Lcast.appendChild(ranger); tr(ranger, 300, 420, 1.2);
        const str = P(t, mid('t4', 0.2), 0.9, ease);
        ranger.set({ t, talk: scTalk(S, t, 'ranger'), mood: t > mid('t4', 0.75) ? 'smug' : 'neutral', look: 0.7, reach: 40 + 60 * str });
        fade(c4a, t, mid('t4', 0.05)); fade(c4b, t, mid('t4', 0.25)); fade(c4c, t, mid('t4', 0.4));
        op(c4d, P(t, mid('t4', 0.65), 0.25, linear)); c4d.set(P(t, mid('t4', 0.8), 0.3, linear));
      } else if (trap === 4) {
        show.kav = 1; Lcast.appendChild(kav); tr(kav, 320, 520, 1.36);
        setH('kav', t > mid('t5', 0.85) ? 'smug' : 'neutral', 0.6);
        c5chips.forEach((c, i) => c.set(P(t, mid('t5', 0.02 + i * 0.05), 0.35, linear)));
        fade(c5a, t, mid('t5', 0.2)); fade(c5b, t, mid('t5', 0.38)); fade(c5c, t, mid('t5', 0.52)); fade(c5d, t, mid('t5', 0.72));
      } else {
        show.boy = 1; Lcast.appendChild(boy); tr(boy, 320, 530, 1.36);
        setH('boy', 'sad', 0.4);
        op(hugDurian, 1); tr(hugDurian, 372 + Math.sin(t * 3) * 3 * AMP, 664);
        fade(c6a, t, mid('t6', 0.05)); fade(c6k, t, mid('t6', 0.15)); fade(c6b, t, mid('t6', 0.3));
        op(c6c, P(t, mid('t6', 0.3), 0.25, linear)); c6c.set(P(t, mid('t6', 0.55), 0.3, linear));
      }
    }

    /* ---------- L: will return ---------- */
    op(logoBg, sL); op(logo, 0); op(willRet, 0);
    if (sL) {
      tr(rayP, 600, 610, 1, (t * 6 * AMP) % 360);
      const lp = P(t, cRet + 0.05, 0.6, pop);
      op(logo, clamp(lp * 2.5)); tr(logo, 600, 230, Math.max(0.01, 0.5 + 0.5 * lp));
      const settle = P(t, cRet + 0.4, 2.0, linear);
      attr(lvlBub, 'cx', (Math.sin(settle * 14) * 70 * (1 - settle) * AMP).toFixed(1));
      op(willRet, P(t, mid('return', 0.45), 0.4, linear));
    }

    /* ---------- W: the results and the stinger ---------- */
    op(studioShot, sW || sS); op(Lfront, sW); op(Lpet, sW); op(spot, 0); op(spotPool, 0);
    if (sW || sS) studio.upd(t);
    op(studio.applause, sW && t < cLost ? 1 : 0);
    studio.applause.set(sW && t > mid('results', 0.82) && t < cOne ? 1 : 0);
    const mb = studio.board;
    [0, 1, 2, 3].forEach(i => { mb.set(i, ['me', 'me', 'me', '0'][i]); mb.lit(i, t > mid('results', 0.82) ? 1 : 0); });
    op(trophy, t > mid('results', 0.8) ? 1 : 0);
    if (t > mid('results', 0.8)) tr(trophy, 905, 532, Math.max(0.01, P(t, mid('results', 0.8), 0.4, pop)));
    op(scr, sS);
    if (sW) {
      tr(carrier, 1100, 530, 0.7);
      ['mum', 'kav', 'dad', 'boy', 'priya', 'tan'].forEach(kk => show[kk] = 1);
      // Mean stands on the desk from the results on
      show.mean = 1;
      if (mean.parentNode !== Lpet) Lpet.appendChild(mean);
      if (t < cLost) {
        // the results
        const sw = P(t, at('results') - 0.2, mid('results', 0.75) - at('results') + 0.2, ease);
        const sx = lerp(200, POS.tan[0], sw) + (sw < 1 ? Math.sin(t * 5) * 60 * (1 - sw) : 0);
        op(spot, 1); op(spotPool, 1); tr(spot, sx, 500); tr(spotPool, sx, 500);
        popSet(cDrum, t, at('results') - 0.2, mid('results', 0.7), 330, 262);
        popSet(cWin, t, mid('results', 0.78), 1e9, 900, 262);
        const won = t > mid('results', 0.75);
        ['kav', 'mum', 'dad', 'boy'].forEach(kk => setH(kk, won ? (kk === 'dad' ? 'shock' : 'deadpan') : 'neutral', won ? 0.9 : 0.6));
        setH('priya', won ? 'sad' : 'smug', won ? 0.6 : 0.6);
        setH('tan', won ? 'happy' : 'neutral', won ? 0 : -0.6);
        show.benny = 1;
        const up = P(t, at('results') - 0.3, 0.4, pop);
        tr(benny, 668, lerp(900, 606, up), 0.86);
        benny.set({ t, talk: scTalk(S, t, 'benny'), mood: 'happy', look: won ? 0.8 : 0, lift: 1, ting: win(t, mid('results', 0.75), end('results') + 0.6, 0.15) });
        tr(mean, MEANX, MEANY, 0.5); mean.set({ t, mood: won ? 'shock' : 'deadpan', look: won ? 0.8 : 0, tilt: 0 });
        carrier.set({ t, look: -0.4 });
        op(bowTie, 0); op(meanTie, 1);
      } else {
        // Dad; the group hug; the drag
        const inO = P(t, at('hug') - 0.5, 0.8, easeOut), outO = P(t, at('drag') + 0.2, 2.0, easeIn);
        const ox = lerp(1480, 420, inO) + 1300 * outO;
        if (inO > 0 && ox < 1450) {
          show.otto = 1;
          if (otto.parentNode !== Lcast || Lcast.firstChild !== otto) Lcast.insertBefore(otto, Lcast.firstChild);
          tr(otto, ox, 350, 0.95, (-(1 - inO) * 300 + outO * 300) * AMP);
          otto.set({ t, talk: scTalk(S, t, 'otto'), mood: 'happy', look: -0.6, wave: 1 });
        }
        // the family leans after Otto as he rolls away; they straighten up again afterwards
        const lean = P(t, at('drag') + 0.2, 1.2, ease) * (1 - P(t, end('drag') + 0.4, 0.8, ease));
        const hug = t >= at('hug') - 0.1;
        [['mum', 1], ['kav', 0.9], ['dad', 0.8], ['boy', 0.7], ['priya', 0.5]].forEach(([kk, f]) => tr(H[kk], POS[kk][0], POS[kk][1], POS[kk][2], 12 * lean * f * AMP));
        if (!hug) {
          setH('dad', 'smug', 0.3);
          setH('kav', 'deadpan', t > mid('lost', 0.6) ? 0 : -0.8);
          setH('mum', 'deadpan', t > mid('lost', 0.6) ? 0 : 0.8);
          setH('boy', 'neutral', -0.6); setH('priya', 'neutral', -0.6);
          popSet(cAbove, t, mid('lost', 0.55), at('hug') - 0.1, 396, 262);
        } else {
          const after = t > end('drag') + 0.6;
          setH('dad', after ? 'deadpan' : 'shock', after ? 0.6 : 0.9); setH('kav', after ? 'deadpan' : 'shock', after ? 0 : 0.9);
          setH('mum', after ? 'deadpan' : 'shock', 0.9); setH('boy', 'happy', 0.9); setH('priya', after ? 'deadpan' : 'shock', 0.9);
        }
        setH('tan', 'happy', t > at('drag') ? 0.6 : -0.3);
        carrier.set({ t, look: t > at('drag') ? 1 : -0.3 });
        // Mean tilts further and further and slides off the desk after Otto
        const drag = P(t, at('drag') + 0.3, 3.0, easeIn);
        const ang = (8 * P(t, at('hug'), 0.8, ease) + 34 * P(t, at('drag'), 2.4, ease)) * AMP;
        const mx = MEANX + 760 * drag;
        tr(mean, mx, MEANY + 20 * drag, 0.5, ang);
        mean.set({ t, talk: scTalk(S, t, 'mean'), mood: t >= at('hug') ? 'shock' : 'deadpan', look: 0.9, tilt: ang, sweat: t >= at('hug') ? 1 : 0, arms: t >= at('drag') ? 1 : 0 });
        show.mean = mx < 1400 ? 1 : 0;
        const gone = drag > 0.12;
        op(bowTie, gone ? 1 : 0); tr(bowTie, MEANX + 30, 518, 1.5); op(meanTie, gone ? 0 : 1);
      }
    } else { op(bowTie, 0); op(meanTie, 1); }

    if (sS) {
      // Mr Tan: a family of one; Pythagoras is not data
      tr(scr, SCX, SCY); scr.upd(t);
      op(Lpet, 1); op(trophy, 0); op(bowTie, 0); show.mean = 0;
      show.tan = 1; tr(tan, ...SPK); Lcast.appendChild(tan);
      const catT = t >= k('cat'), nd = t >= k('notdata');
      setH('tan', nd ? 'deadpan' : catT ? 'neutral' : 'happy', catT && !nd ? -0.8 : 0.7);
      show.boy = 1; tr(boy, ...LIS); Lcast.insertBefore(boy, tan);
      setH('boy', catT ? 'happy' : 'neutral', 0.8, { lift: catT && !nd ? 1 : 0 });
      tr(carrier, 470, 690, 0.8);
      carrier.set({ t, look: nd ? -1 : catT ? -0.6 : 0.4, blink: nd && t > mid('notdata', 0.4) ? 0.55 : undefined });
      fade(sD, t, mid('one', 0.02)); fade(sM, t, mid('one', 0.2)); fade(sMd, t, mid('one', 0.4)); fade(sR, t, mid('one', 0.62));
      popSet(cCons, t, mid('one', 0.85), k('notdata'), 0, 170);
      popSet(cCats, t, mid('notdata', 0.2), 1e9, 0, 170);
      op(carrier, 1);
    } else op(carrier, sW);

    /* ---------- visibility ---------- */
    for (const kk in CM) op(CM[kk], show[kk]);
  };
});
