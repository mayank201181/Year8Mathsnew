/* Scene 1: Three signs, one winner (fractions, decimals and percentages).
   Shots (hard sitcom cuts):
   A  10:15 a.m., three rival shoe shops (pcShopfronts: 5/8 OFF, 0.6 OFF, 62% OFF); Kavya and Dad look up, the posters
      wobble; Priya pops up (lower third), smug: "62% OFF" glows, "biggest number!".
   B  the board shot: a whiteboard on the right, Percy at the left, a human leaning in from the bottom-left corner.
      same form first (three cards) -> 5/8 = 5 ÷ 8 = 0.625 = 62.5%, 0.6 = 60% -> the cards fly onto a 55%-65% number
      line and sort themselves: 0.6 < 62% < 5/8, 100% CORRECT -> the conversion rules (× 100, ÷ 100, over 100) with
      Priya's silent RECOUNT? -> 7/25 = 28/100 = 28% (× 4) -> Ah Boy's 0.5% cashback -> 0.5% = 0.005 = 1/200,
      $10 note -> 5c coin.
   C  the family in front of the shops: Dad's 110% chip, Kavya: impossible?
   B2 the board: double number line 0-1.5 / 0%-150%: 100% = 1 whole, 110% = 1.1, 125% = 5/4 = 1.25 (more than one whole).
   C2 the family: "1.1 dads"; Kavya deadpan, the 110% chip deflates. */
scene('signs', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const view = (el, k, fx, fy, sx, sy) => el.setAttribute('transform', `translate(${sx.toFixed(1)} ${sy.toFixed(1)}) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const popAt = (el, t, t0, x, y, t1) => { el.set(t >= t0 && t < (t1 === undefined ? 1e9 : t1) ? P(t, t0, 0.4, linear) : 0); tr(el, x, y); };
  const chipM = (parent, text, col, size) => mkChip(parent, text, { size: size || 30, col: col || C.ink });
  const fade = (el, t, t0, t1) => op(el, t >= t0 && t < t1 ? P(t, t0, 0.25, linear) : 0);
  const GOLD = '#FFE45C', RED = PC.red, INK = MK.ink, BLUE = '#2E5AAC', GREEN = '#1E9E5A';

  /* layers */
  const Lset = G(root), Lboard = G(root), Lcast = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= the shop fronts (also the blurred backdrop of the board shots) ================= */
  const setWrap = G(Lset);
  const fronts = pcShopfronts(setWrap);
  const wash = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#FFF4E2', opacity: 0.84 }, Lset);

  /* ================= the whiteboard ================= */
  const BX = 890, BY = 380;
  const wb = mkWhiteboard(Lboard, 540, 470); tr(wb, BX, BY);
  const B = G(wb);   // board content, local coordinates (area x -246..246, y -211..211)

  // same: three cards (also the posters that fly onto the number line)
  const bSame = G(B);
  mkText(bSame, 0, -150, 'Put them in the **same form** first', { size: 32, anchor: 'middle', fill: INK, boldFill: RED });
  const cardSrc = ['5/8', '0.6', '62%'], cardLab = ['fraction', 'decimal', 'percentage'];
  const cards = cardSrc.map(src => {
    const g = G(B), inner = G(g);
    E('rect', { x: -70, y: -55, width: 140, height: 110, rx: 12, fill: GOLD, stroke: RED, 'stroke-width': 5 }, inner);
    const m = mkMath(inner, 0, 0, src, { size: 52, anchor: 'middle', fill: RED, weight: 700 });
    tr(m, 0, (m.a - m.d) / 2);
    g.inner = inner;
    return g;
  });
  const cardLabs = cardLab.map((s, i) => T(bSame, (i - 1) * 170, 100, s, { size: 28, weight: 700, anchor: 'middle', fill: '#5A6670' }));
  const CARD_BIG = [[-170, 0], [0, 0], [170, 0]];

  // frac: the working
  const bFrac = G(B);
  const wk = mkWorking(bFrac, -60, -190, ['5/8 = 5 ÷ 8', '= 0.625', '= 62.5%', { m: '0.6 = 60%', col: BLUE }], { size: 44, fill: INK, gap: 20 });

  // order: the number line, 55% to 65%
  const bOrder = G(B);
  const NLY = 40;
  const nl = mkNumberLine(bOrder, { from: 55, to: 65, step: 1, len: 440, labels: [[55, '55%'], [60, '60%'], [65, '65%']], size: 28, ink: INK });
  tr(nl, -220, NLY);
  const nx = v => -220 + nl.x(v);
  const VALS = [62.5, 60, 62];                                    // the cards' values: 5/8, 0.6, 62%
  const SLOT = [[190, -50], [0, -50], [88, -50]];
  const leads = VALS.map((v, i) => { const l = E('path', { d: `M${SLOT[i][0]},${SLOT[i][1] + 34} L${nx(v).toFixed(1)},${NLY - 12}`, stroke: RED, 'stroke-width': 4, 'stroke-dasharray': '6 5' }, bOrder); return l; });
  const dots = VALS.map(v => E('circle', { cx: nx(v), cy: NLY, r: 10, fill: RED, stroke: INK, 'stroke-width': 3 }, bOrder));
  const ineq = mkMath(bOrder, 0, 178, '0.6 < 62% < 5/8', { size: 50, anchor: 'middle', fill: INK });

  // rules
  const bRules = G(B);
  const r1 = G(bRules), r2 = G(bRules), r3 = G(bRules);
  mkText(r1, -230, -150, '**decimal → %**:  × 100', { size: 30, fill: INK, boldFill: BLUE });
  mkMath(r1, 230, -150, '0.6 = 60%', { size: 36, anchor: 'end', fill: INK });
  mkText(r2, -230, -60, '**% → decimal**:  ÷ 100', { size: 30, fill: INK, boldFill: BLUE });
  mkMath(r2, 230, -60, '35% = 0.35', { size: 36, anchor: 'end', fill: INK });
  mkText(r3, -230, 30, '**% → fraction**:  over 100, simplify', { size: 30, fill: INK, boldFill: BLUE });
  const r3m = mkMath(bRules, 0, 140, '35% = 35/100 = 7/20', { size: 46, anchor: 'middle', fill: GREEN });
  E('path', { d: 'M-240,-110 L240,-110 M-240,-20 L240,-20', stroke: '#C9D3DC', 'stroke-width': 3 }, bRules);

  // quick: 7/25 = 28/100 = 28%
  const bQuick = G(B);
  mkText(bQuick, 0, -150, 'Scale the bottom up to **100**', { size: 32, anchor: 'middle', fill: INK, boldFill: RED });
  const QS = 60, qx1 = -170, qx2 = -10, qy = 30;
  mkMath(bQuick, qx1, qy, '7/25', { size: QS, anchor: 'middle', fill: INK });
  mkMath(bQuick, (qx1 + qx2) / 2, qy, '=', { size: QS, anchor: 'middle', fill: INK });
  mkMath(bQuick, qx2, qy, '28/100', { size: QS, anchor: 'middle', fill: INK });
  const q3 = mkMath(bQuick, 60, qy, '= 28%', { size: QS, fill: GREEN });
  const qaTop = arrow(bQuick, qx1 + 10, qy - 66, qx2 - 12, qy - 66, { color: RED, width: 4, bend: -34 });
  const qaBot = arrow(bQuick, qx1 + 10, qy + 64, qx2 - 12, qy + 64, { color: RED, width: 4, bend: 34 });
  const qlTop = T(bQuick, (qx1 + qx2) / 2, qy - 104, '× 4', { size: 30, weight: 800, anchor: 'middle', fill: RED });
  const qlBot = T(bQuick, (qx1 + qx2) / 2, qy + 128, '× 4', { size: 30, weight: 800, anchor: 'middle', fill: RED });

  // cash: the 0.5% cashback sign
  const bCash = G(B);
  E('rect', { x: -190, y: -130, width: 380, height: 230, rx: 18, fill: GOLD, stroke: RED, 'stroke-width': 7 }, bCash);
  mkText(bCash, 0, -10, '**0.5%**', { size: 96, anchor: 'middle', fill: RED });
  T(bCash, 0, 66, 'CASHBACK', { size: 44, weight: 800, anchor: 'middle', fill: RED, ls: 3 });

  // half: 0.5% = 0.005 = 1/200, $10 -> 5c
  const bHalf = G(B);
  const h1 = mkText(bHalf, 0, -170, 'half of **one** per cent', { size: 32, anchor: 'middle', fill: INK, boldFill: RED });
  const h2 = mkMath(bHalf, 0, -90, '0.5% = 0.005 = 1/200', { size: 44, anchor: 'middle', fill: INK });
  const note = mkNote(bHalf, '$10', { s: 0.62 }); tr(note, -120, 30);
  const hArr = arrow(bHalf, -30, 30, 60, 30, { color: '#5A6670', width: 5 });
  const coin = mkCoin(bHalf, '5c', { s: 1.15 }); tr(coin, 120, 30);
  const h3 = mkMath(bHalf, 0, 160, '0.005 × $10 = $0.05', { size: 42, anchor: 'middle', fill: GREEN });
  const noteL = T(bHalf, -120, 100, 'spend', { size: 26, weight: 700, anchor: 'middle', fill: '#5A6670' });
  const coinL = T(bHalf, 120, 100, 'get back', { size: 26, weight: 700, anchor: 'middle', fill: '#5A6670' });

  // whole / over: the double number line 0 to 1.5 (0% to 150%)
  const bWhole = G(B);
  const DY = -10;
  const dl = mkNumberLine(bWhole, { from: 0, to: 1.5, step: 0.1, len: 440, labels: [[0, '0'], [0.5, '0.5'], [1, '1'], [1.5, '1.5']], size: 28, ink: INK });
  tr(dl, -220, DY);
  const dx = v => -220 + dl.x(v);
  [[0, '0%'], [0.5, '50%'], [1, '100%'], [1.5, '150%']].forEach(([v, s]) => mkMath(bWhole, dx(v), DY - 24, s, { size: 28, anchor: 'middle', fill: RED }));
  const band110 = E('rect', { x: dx(1), y: DY - 9, width: dx(1.1) - dx(1), height: 18, fill: '#FFC93C', stroke: INK, 'stroke-width': 2 }, bWhole);
  const band125 = E('rect', { x: dx(1), y: DY - 9, width: dx(1.25) - dx(1), height: 18, fill: '#FFC93C', stroke: INK, 'stroke-width': 2 }, bWhole);
  const brW = mkBrace(bWhole, dx(0), DY - 62, dx(1), DY - 62, { text: '{{100%}} = **1 whole**', col: BLUE, size: 30 });
  const c110 = G(bWhole);
  E('path', { d: `M${dx(1.1)},${DY + 12} L${dx(1.1)},${DY + 80}`, stroke: RED, 'stroke-width': 4 }, c110);
  E('circle', { cx: dx(1.1), cy: DY, r: 10, fill: RED, stroke: INK, 'stroke-width': 3 }, c110);
  mkMath(c110, dx(1.1), DY + 114, '110% = 1.1', { size: 34, anchor: 'middle', fill: RED });
  mkText(c110, dx(1.1) - 20, DY + 160, 'a whole + a **tenth**', { size: 30, anchor: 'middle', fill: INK, boldFill: RED });
  const c125 = G(bWhole);
  E('circle', { cx: dx(1.25), cy: DY, r: 10, fill: RED, stroke: INK, 'stroke-width': 3 }, c125);
  mkMath(c125, dx(1.25), DY + 56, '1.25', { size: 28, anchor: 'middle', fill: RED });
  mkText(c125, dx(1.1), DY + 100, 'more than **one whole**', { size: 28, anchor: 'middle', fill: INK, boldFill: '#C27A00' });
  const eq125 = mkMath(bWhole, 0, 178, '125% = 125/100 = 5/4 = 1.25', { size: 38, anchor: 'middle', fill: GREEN });

  /* chips and bubbles */
  const ch = {
    time: chipM(Lfg, '**10:15 a.m.**', GOLD, 32),
    win: chipM(Lfg, 'the **fraction** shop wins!', '#9FE0B5', 30),
    recount: chipM(Lfg, 'RECOUNT?', '#FF9AA4', 30),
    c100: chipM(Lfg, '{{25 × 4 = 100}}', GOLD, 30),
    p110: mkChip(Lfg, '**110%**', { size: 46, col: GOLD, solid: true }),
    imp: chipM(Lfg, 'impossible?', '#FF9AA4', 32),
    dads: chipM(Lfg, '= **1.1** dads', GOLD, 34),
  };
  const bubP = mkSpeechBubble(Lfg, 'biggest number!', { size: 30, tail: 'down', tailX: -40 });
  const bubB = mkSpeechBubble(Lfg, '**half** my money back!', { size: 30, tail: 'left' });
  const stampOK = pcStamp(Lfg, true);

  /* ================= the cast ================= */
  const percy = cast(Lcast, 'percy');
  const priya = cast(Lcast, 'priya');
  const dad = cast(Lcast, 'dad');
  const kav = cast(Lcast, 'kavya');
  const boy = cast(Lcast, 'boy');
  const coinHand = mkCoin(boy.hand, '5c', { s: 1.0 }); tr(coinHand, 0, -40);
  const lt = { priya: pcLowerThird(Lhud, 'priya') };
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cuts */
  const cB = at('same') - 0.06, cC = at('still') - 0.06, cB2 = at('whole') - 0.06, cC2 = at('dad') - 0.06;
  const LEAN = [140, 668, 0.95, 6];   // the human leaning in from the bottom-left of the board shot

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const sA = on(t, -1, cB), sB = on(t, cB, cC) || on(t, cB2, cC2), sC = on(t, cC, cB2) || on(t, cC2, 1e9);
    for (const k in ch) ch[k].set(0);
    bubP.set(0); bubB.set(0); stampOK.set(0); lt.priya.set(0);
    const show = { percy: 0, priya: 0, dad: 0, kav: 0, boy: 0 };
    let coinOn = 0;

    /* ---------- the set ---------- */
    op(wash, sB); op(Lboard, sB);
    if (sB) view(setWrap, 1.5, 600, 360, 600, 375); else setWrap.removeAttribute('transform');
    [0, 1, 2].forEach(i => fronts.hl(i, 0));
    fronts.posters.forEach((p, i) => {
      const t0 = mid('rival', 0.3 + 0.2 * i), w = t >= t0 ? Math.sin((t - t0) * 14) * 7 * Math.exp(-(t - t0) * 2.2) * AMP : 0;
      p.setAttribute('transform', `rotate(${w.toFixed(2)} ${fronts.cx[i]} 240)`);
    });

    /* ---------- A: the three shops ---------- */
    if (sA) {
      show.kav = show.dad = 1;
      tr(kav, 560, 646, 0.95); tr(dad, 1030, 640, 0.95);
      const lk = t < mid('rival', 0.3) ? 0 : t < mid('rival', 0.5) ? -0.8 : t < mid('rival', 0.7) ? 0 : 0.8;
      kav.set({ t, talk: 0, mood: t >= at('priya') ? 'neutral' : 'happy', look: t >= at('priya') ? 0.7 : lk });
      dad.set({ t, talk: 0, mood: t >= at('priya') ? 'neutral' : 'happy', look: t >= at('priya') ? -0.8 : lk });
      popAt(ch.time, t, at('rival') + 0.05, 860, 56);
      if (t >= at('priya') - 0.2) {
        show.priya = 1;
        const up = P(t, at('priya') - 0.2, 0.35, pop);
        tr(priya, 800, lerp(820, 646, up), 0.95);
        priya.set({ t, talk: scTalk(S, t, 'priya'), mood: 'smug', look: 0.3, lift: 1 });
        lt.priya.set(win(t, at('priya') + 0.1, at('priya') + 3.3, 0.3));
        fronts.hl(2, P(t, mid('priya', 0.3), 0.3, linear));
        popAt(bubP, t, mid('priya', 0.55), 800, 470);
      }
    }

    /* ---------- B: the board shot ---------- */
    if (sB) {
      show.percy = 1;
      tr(percy, 330, 400, 1.0);
      const who = scWho(S, t);
      // which human leans in
      let hum = kav, key = 'kav';
      if (t >= at('rules') - 0.1 && t < at('quick') - 0.1) { hum = priya; key = 'priya'; }
      else if (t >= at('cash') - 0.1 && t < cC) { hum = boy; key = 'boy'; }
      show[key] = 1;
      const enter = t >= cB2 ? cB2 : key === 'priya' ? at('rules') - 0.1 : key === 'boy' ? at('cash') - 0.1 : key === 'kav' && t >= at('quick') - 0.1 && t < at('cash') ? at('quick') - 0.1 : cB;
      const up = P(t, enter, 0.35, pop);
      const ly = key === 'boy' ? 600 : LEAN[1];
      tr(hum, LEAN[0], lerp(ly + 200, ly, up), LEAN[2], LEAN[3]);
      // moods
      let pm = 'happy', pl = 0.6, hm = 'neutral', hl = 0.6, lift = 0;
      if (who && who !== 'percy') pl = -0.7;
      if (t < at('frac')) { hm = 'neutral'; }
      else if (t < at('rules')) { hm = t >= at('order') ? 'smug' : 'neutral'; pm = t >= at('order') ? 'happy' : 'neutral'; }
      else if (t < at('quick')) { hm = 'annoyed'; hl = 0.8; }
      else if (t < at('cash')) { hm = 'smug'; }
      else if (t < at('half')) { hm = 'happy'; lift = 1; pm = 'deadpan'; }
      else if (t < cC) { hm = t > mid('half', 0.8) ? 'happy' : 'shock'; lift = t > mid('half', 0.8) ? 1 : 0; coinOn = lift; pm = t > mid('half', 0.85) ? 'deadpan' : 'happy'; pl = t > mid('half', 0.8) ? -0.7 : 0.6; }
      else if (t < at('over')) { hm = t < mid('whole', 0.4) ? 'annoyed' : 'neutral'; pm = 'smug'; }
      else { hm = 'deadpan'; pm = 'smug'; }
      percy.set({ t, talk: scTalk(S, t, 'percy'), mood: pm, look: pl });
      hum.set({ t, talk: scTalk(S, t, key === 'kav' ? 'kavya' : key), mood: hm, look: hl, lift });

      // board content
      const same = t < at('frac'), frac = t >= at('frac') && t < at('order'), order = t >= at('order') && t < at('rules');
      op(bSame, same ? 1 : 0);
      cardLabs.forEach((l, i) => op(l, P(t, mid('same', 0.45 + 0.12 * i), 0.25, linear)));
      cards.forEach((c, i) => {
        if (same) {
          const p = P(t, mid('same', 0.4 + 0.12 * i), 0.35, pop);
          op(c, clamp(p * 3)); tr(c, CARD_BIG[i][0], CARD_BIG[i][1]); tr(c.inner, 0, 0, Math.max(0.01, 0.6 + 0.4 * p));
        } else if (order) {
          // the showpiece: the cards fly onto the number line and sort themselves
          const k = P(t, at('order') + 0.1 + 0.25 * i, 0.8, ease);
          op(c, 1);
          const x = lerp(CARD_BIG[i][0], SLOT[i][0], k), y = lerp(CARD_BIG[i][1], SLOT[i][1], k) - Math.sin(k * Math.PI) * 60;
          tr(c, x, y); tr(c.inner, 0, 0, lerp(1, 0.6, k));
        } else op(c, 0);
      });
      op(bFrac, frac ? 1 : 0);
      if (frac) { wk.show(0, P(t, mid('frac', 0.03), 0.35, linear)); wk.show(1, P(t, mid('frac', 0.25), 0.35, linear)); wk.show(2, P(t, mid('frac', 0.45), 0.35, linear)); wk.show(3, P(t, mid('frac', 0.72), 0.35, linear)); wk.ring(2, P(t, mid('frac', 0.55), 0.2, linear)); }
      op(bOrder, order ? 1 : 0);
      if (order) {
        leads.forEach((l, i) => op(l, P(t, at('order') + 0.9 + 0.25 * i, 0.2, linear)));
        dots.forEach((d, i) => op(d, P(t, at('order') + 0.9 + 0.25 * i, 0.2, linear)));
        op(ineq, P(t, mid('order', 0.45), 0.3, linear));
        popAt(ch.win, t, mid('order', 0.7), 330, 190);
        stampOK.set(t >= mid('order', 0.82) ? P(t, mid('order', 0.82), 0.35, linear) : 0); tr(stampOK, BX, 168, 0.45);
      }
      const rules = t >= at('rules') && t < at('quick');
      op(bRules, rules ? 1 : 0);
      if (rules) {
        op(r1, P(t, mid('rules', 0.03), 0.3, linear)); op(r2, P(t, mid('rules', 0.3), 0.3, linear));
        op(r3, P(t, mid('rules', 0.62), 0.3, linear)); op(r3m, P(t, mid('rules', 0.72), 0.3, linear));
        popAt(ch.recount, t, mid('rules', 0.35), 160, 470);
      }
      const quick = t >= at('quick') && t < at('cash');
      op(bQuick, quick ? 1 : 0);
      if (quick) {
        qaTop.set(P(t, mid('quick', 0.4), 0.5, linear)); qaBot.set(P(t, mid('quick', 0.4), 0.5, linear));
        op(qlTop, P(t, mid('quick', 0.6), 0.25, linear)); op(qlBot, P(t, mid('quick', 0.6), 0.25, linear));
        op(q3, P(t, mid('quick', 0.82), 0.3, linear));
        popAt(ch.c100, t, mid('quick', 0.62), 330, 190);
      }
      const cash = t >= at('cash') && t < at('half');
      op(bCash, cash ? 1 : 0);
      if (cash) { const p = P(t, at('cash'), 0.35, pop); tr(bCash, 0, 0, Math.max(0.01, 0.7 + 0.3 * p)); popAt(bubB, t, mid('cash', 0.55), 410, 560); }
      const half = t >= at('half') && t < cC;
      op(bHalf, half ? 1 : 0);
      if (half) {
        op(h1, P(t, mid('half', 0.02), 0.3, linear)); op(h2, P(t, mid('half', 0.18), 0.3, linear));
        op(note, P(t, mid('half', 0.55), 0.25, linear)); op(noteL, P(t, mid('half', 0.55), 0.25, linear));
        hArr.set(P(t, mid('half', 0.62), 0.4, linear));
        op(coin, P(t, mid('half', 0.75), 0.25, linear)); op(coinL, P(t, mid('half', 0.75), 0.25, linear));
        op(h3, P(t, mid('half', 0.8), 0.3, linear));
      }
      const whole = t >= cB2;
      op(bWhole, whole ? 1 : 0);
      if (whole) {
        brW.set(P(t, mid('whole', 0.3), 0.3, linear));
        op(band110, t < at('over') ? P(t, mid('whole', 0.55), 0.3, linear) : 0);
        op(c110, t < at('over') ? P(t, mid('whole', 0.55), 0.3, linear) : 0);
        op(band125, t >= at('over') ? P(t, mid('over', 0.7), 0.3, linear) : 0);
        op(c125, t >= at('over') ? P(t, mid('over', 0.62), 0.3, linear) : 0);
        op(eq125, t >= at('over') ? P(t, mid('over', 0.08), 0.4, linear) : 0);
      }
    }

    /* ---------- C: the family in front of the shops ---------- */
    if (sC) {
      show.priya = show.dad = show.kav = show.boy = 1;
      tr(priya, 230, 646, 0.95); tr(dad, 470, 640, 0.95); tr(kav, 720, 646, 0.95); tr(boy, 960, 668, 1.0);
      let dm = 'happy', km = 'neutral', pm = 'neutral', bm = 'happy', dl = 0.5, kl = -0.8, pl = 0.7, bl = -0.7, dlift = 0;
      if (t < at('cant')) { dlift = 1; km = 'deadpan'; }
      else if (t < cB2) { dm = 'happy'; km = 'annoyed'; dl = 0.8; pm = 'smug'; }
      else if (t < at('plenty')) { dm = 'smug'; dlift = 1; km = 'deadpan'; kl = -0.8; pl = 0.7; pm = 'neutral'; }
      else { dm = t > mid('plenty', 0.7) ? 'sad' : 'smug'; km = 'deadpan'; kl = -0.6; pm = 'happy'; bm = 'happy'; }
      priya.set({ t, mood: pm, look: pl });
      dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: dl, lift: dlift });
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
      boy.set({ t, mood: bm, look: bl });
      // the 110% chip: pops on "still", again on "dad", deflates on "plenty"
      if (t < cB2) popAt(ch.p110, t, mid('still', 0.62), 470, 430);
      else {
        const p = P(t, at('dad') - 0.02, 0.35, linear), d = P(t, mid('plenty', 0.55), 0.6, easeIn);
        ch.p110.set(p); tr(ch.p110, 470, 430 + 60 * d, Math.max(0.01, 1 - 0.55 * d), -20 * d); op(ch.p110, clamp(p * 3) * (1 - 0.7 * d));
        popAt(ch.dads, t, mid('dad', 0.45), 655, 430);
        if (t >= at('plenty')) op(ch.dads, 1 - P(t, mid('plenty', 0.55), 0.4, linear));
      }
      if (t < cB2) popAt(ch.imp, t, mid('cant', 0.3), 720, 440);
    }

    op(coinHand, coinOn);
    op(percy, show.percy); op(priya, show.priya); op(dad, show.dad); op(kav, show.kav); op(boy, show.boy);
  };
});
