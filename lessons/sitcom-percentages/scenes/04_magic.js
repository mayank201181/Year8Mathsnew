/* Scene 4: The Great Multiplini (percentage increase and decrease with multipliers).
   Shots (hard sitcom cuts):
   A  1 p.m., the electronics shop (pcShop tech, poster "Tomorrow: +15%"): Mum, Dad, Kavya and Ah Boy behind the counter,
      the $40 rice cooker on it.
   B  the board shot (whiteboard right, a human leaning in bottom-left): Dad's two steps (15% of 40 = 6, 40 + 6 = 46) ->
      the Great Multiplini appears in a puff of sparkles (lower third), Dad ducks, the two steps crumple -> 100% + 15%
      = 115% = 1.15, $40 --× 1.15--> $46, 40 × 1.15 = 46, Ta-da!, 100% CORRECT -> Kavya: 40 + 0.15 × 40 =
      40 × (1 + 0.15) = 40 × 1.15 -> Mum: the three bars (100% = $40, 115% = $46, 80% = $32, the 20% piece falls off),
      40 × 0.8 = 32 -> the rule × (1 + r/100), × (1 − r/100) and a table of multipliers.
   A2 the shop: Ah Boy: +5% -> × 1.5? The $50 kettle balloons (+50%!), Multiplini shocked; 5% = 0.05, so × 1.05; the
      kettle shrinks back.
   B2 the board: the multiplier dial: above 1 increase, below 1 decrease; × 0.93 -> 7% off.
   A3 the shop: 9% GST -> × 1.09, $50 × 1.09 = $54.50 on the kettle's tag -> Percy pops out of the poster: scorecard 90,
      then 100 (the cape). */
scene('magic', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const view = (el, k, fx, fy, sx, sy) => el.setAttribute('transform', `translate(${sx.toFixed(1)} ${sy.toFixed(1)}) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const popAt = (el, t, t0, x, y, t1) => { el.set(t >= t0 && t < (t1 === undefined ? 1e9 : t1) ? P(t, t0, 0.4, linear) : 0); tr(el, x, y); };
  const chipM = (parent, text, col, size) => mkChip(parent, text, { size: size || 30, col: col || C.ink });
  const GOLD = '#FFE45C', RED = '#D32F2F', INK = MK.ink, PURPLE = '#6A3FCF', GREEN = '#1E9E5A', BLUE = '#2E5AAC';

  /* ================= the shop ================= */
  const shop = pcShop(root, { name: 'TECH', kind: 'tech', col: '#2E5AAC', poster: 'Tomorrow:\n**+15%**' });
  const back = shop.firstChild;
  const glowP = E('rect', { x: 935 - 136, y: 300 - 106, width: 272, height: 212, rx: 18, fill: 'none', stroke: GOLD, 'stroke-width': 10 }, back);
  const Lwash = G(shop.mid), Lboard = G(shop.mid), Lmid = G(shop.mid);
  const wash = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#EEF3FA', opacity: 0.86 }, Lwash);
  const Lcard = G(root), Lstar = G(root), Lfg = G(root), Lhud = G(root);

  /* the rice cooker, then the kettle (with its own tags) */
  const cooker = pcRiceCooker(shop.top, { s: 0.8, price: '$40' }); tr(cooker, 990, 530);
  const kG = G(shop.top), kIn = G(kG);
  pcKettle(kIn, { s: 0.9 });
  const tag50 = mkPriceTag(kIn, '$50', { size: 30 }); tr(tag50, -40, -70);
  const tag54 = mkPriceTag(kIn, '$54.50', { size: 30 }); tr(tag54, -40, -70);
  const k50 = T(kG, 0, 0, '+50%!', { size: 46, weight: 800, anchor: 'middle', fill: RED });
  k50.setAttribute('stroke', '#FFFFFF'); k50.setAttribute('stroke-width', 8); k50.setAttribute('paint-order', 'stroke');

  /* ================= the whiteboard ================= */
  const BX = 890, BY = 380;
  const wb = mkWhiteboard(Lboard, 540, 470); tr(wb, BX, BY);
  const B = G(wb);
  // dad: two steps
  const bDad = G(B), dadIn = G(bDad);
  mkText(dadIn, 0, -160, 'Dad: **two steps**', { size: 34, anchor: 'middle', fill: INK, boldFill: BLUE });
  const wDad = mkWorking(dadIn, 30, -80, [{ m: '15% "of" 40 = 6', note: '**step 1**', noteCol: BLUE }, { m: '40 + 6 = 46', note: '**step 2**', noteCol: BLUE }], { size: 42, fill: INK, gap: 40, noteSize: 30, noteX: 90 });
  const dadArr = [arrow(dadIn, -190, -60, -190, 20, { color: BLUE, width: 5, bend: 30 })];
  const dad46 = mkText(dadIn, 0, 150, 'pay **$46**', { size: 40, anchor: 'middle', fill: INK, boldFill: GREEN });
  // trick
  const bTrick = G(B);
  const wTr = mkWorking(bTrick, 10, -190, ['100% + 15% = 115%', '= 1.15'], { size: 42, fill: INK, gap: 16 });
  const tr40 = mkMath(bTrick, -180, 66, '$40', { size: 52, anchor: 'middle', fill: INK });
  const trArr = G(bTrick);
  E('path', { d: 'M-120,48 L70,48 L70,30 L112,56 L70,82 L70,64 L-120,64 Z', fill: PURPLE, stroke: '#3E2290', 'stroke-width': 3, 'stroke-linejoin': 'round' }, trArr);
  const trLab = mkMath(bTrick, -4, 20, '× 1.15', { size: 40, anchor: 'middle', fill: PURPLE });
  const tr46 = mkMath(bTrick, 178, 66, '$46', { size: 52, anchor: 'middle', fill: GREEN });
  const trEq = mkMath(bTrick, 0, 176, '40 × 1.15 = 46', { size: 44, anchor: 'middle', fill: GREEN });
  // why
  const bWhy = G(B);
  const wWhy = mkWorking(bWhy, -190, -150, ['40 + 0.15 × 40', '= 40 × (1 + 0.15)', '= 40 × 1.15'], { size: 44, fill: INK, gap: 26 });
  const whyNote = mkText(bWhy, 0, 160, 'one number, **both** steps', { size: 34, anchor: 'middle', fill: INK, boldFill: PURPLE });
  // off: the three bars (3 px per 1%)
  const bOff = G(B);
  mkText(bOff, 0, -168, 'Today: **20% off** → pay **80%**', { size: 32, anchor: 'middle', fill: INK, boldFill: RED });
  const barRows = [[100, '$40', '#6C8EBF'], [115, '$46', '#3FB37A'], [80, '$32', '#E8833A']].map(([pc, v, col], i) => {
    const g = G(bOff), y = -122 + i * 76;
    mkMath(g, -226, y + 40, pc + '%', { size: 32, fill: INK });
    const fill = E('rect', { x: -126, y, width: pc * 3, height: 54, rx: 4, fill: col, stroke: INK, 'stroke-width': 3 }, g);
    mkMath(g, -126 + pc * 1.5, y + 39, v, { size: 32, anchor: 'middle', fill: '#FFFFFF' });
    return { g, fill, y };
  });
  const extra15 = E('rect', { x: -126 + 300, y: -122 + 76, width: 45, height: 54, fill: '#FFE45C', stroke: INK, 'stroke-width': 3, opacity: 0.85 }, bOff);
  const cut = G(bOff), cutIn = G(cut);
  E('rect', { x: 0, y: 0, width: 60, height: 54, fill: 'rgba(232,131,58,0.25)', stroke: RED, 'stroke-width': 3, 'stroke-dasharray': '8 6' }, cutIn);
  T(cutIn, 30, 36, '20%', { size: 26, weight: 800, anchor: 'middle', fill: RED });
  const offEq = mkMath(bOff, 0, 170, '40 × 0.8 = 32', { size: 46, anchor: 'middle', fill: GREEN });
  // rule
  const bRule = G(B);
  const ru1 = G(bRule), ru2 = G(bRule);
  mkText(ru1, -236, -152, '**Increase** by r%:', { size: 30, fill: INK, boldFill: GREEN });
  mkMath(ru1, 236, -152, '× (1 + r/100)', { size: 40, anchor: 'end', fill: GREEN });
  mkText(ru2, -236, -54, '**Decrease** by r%:', { size: 30, fill: INK, boldFill: RED });
  mkMath(ru2, 236, -54, '× (1 − r/100)', { size: 40, anchor: 'end', fill: RED });
  const tab = mkTable(bRule, [['change', 'multiplier'], ['+15%', '× 1.15'], ['+5%', '× 1.05'], ['−20%', '× 0.8'], ['−3%', '× 0.97']], { size: 28, rowH: 40, colW: [180, 180], ink: INK, fill: '#FFFFFF', headFill: 'rgba(122,75,224,0.18)' });
  tr(tab, -180, 8);
  // read: the dial
  const bRead = G(B);
  mkText(bRead, 0, -166, 'Read the **multiplier**', { size: 32, anchor: 'middle', fill: INK, boldFill: PURPLE });
  const DC = [0, 70], DR = 160;
  E('path', { d: mkArcD(DC[0], DC[1], DR, 180, 270), fill: 'none', stroke: '#F28B8B', 'stroke-width': 34 }, bRead);
  E('path', { d: mkArcD(DC[0], DC[1], DR, 270, 360), fill: 'none', stroke: '#7FD49A', 'stroke-width': 34 }, bRead);
  E('path', { d: `M0,${DC[1] - DR - 26} L0,${DC[1] - DR + 26}`, stroke: INK, 'stroke-width': 5 }, bRead);
  mkMath(bRead, 0, DC[1] - DR - 34, '1', { size: 34, anchor: 'middle', fill: INK });
  mkText(bRead, -180, 112, 'below 1\n**decrease**', { size: 28, anchor: 'middle', fill: INK, boldFill: RED });
  mkText(bRead, 180, 112, 'above 1\n**increase**', { size: 28, anchor: 'middle', fill: INK, boldFill: GREEN });
  const upA = arrow(bRead, 236, 40, 236, -30, { color: GREEN, width: 6 }), dnA = arrow(bRead, -236, -30, -236, 40, { color: RED, width: 6 });
  const needle = G(bRead); tr(needle, DC[0], DC[1]);
  E('path', { d: `M-8,0 L0,${-DR + 14} L8,0 Z`, fill: INK }, needle);
  E('circle', { r: 14, fill: PURPLE, stroke: INK, 'stroke-width': 3 }, bRead).setAttribute('transform', `translate(${DC[0]} ${DC[1]})`);
  const rdEq = mkText(bRead, 0, 186, '{{× 0.93}} → **7% off**', { size: 40, anchor: 'middle', fill: INK, boldFill: RED });
  const rdVal = mkMath(bRead, 0, 122, '0.93', { size: 30, anchor: 'middle', fill: PURPLE });

  /* the back-wall card (A2, A3) */
  const card = G(Lcard);
  E('rect', { x: -250, y: -72, width: 500, height: 144, rx: 16, fill: '#FFFDF6', stroke: PURPLE, 'stroke-width': 5 }, card);
  const cd1 = mkText(card, 0, -18, '{{× 1.5}} = **50%** up!', { size: 36, anchor: 'middle', fill: RED });
  const cd2a = mkText(card, -40, 46, '{{5% = 0.05}}, so', { size: 36, anchor: 'middle', fill: INK });
  const cd2b = mkMath(card, cd2a.w / 2 - 40 + 22, 46, '× 1.05', { size: 38, fill: GREEN });
  const cdRing = E('rect', { x: cd2b.x0 - 10, y: 46 - cd2b.a - 8, width: cd2b.w + 20, height: cd2b.h + 16, rx: 10, fill: 'none', stroke: GREEN, 'stroke-width': 4 }, card);
  const cd3 = mkText(card, 0, -18, '**9% GST** → {{× 1.09}}', { size: 36, anchor: 'middle', fill: INK, boldFill: BLUE });
  const cd4 = mkMath(card, 0, 46, '$50 × 1.09 = $54.50', { size: 38, anchor: 'middle', fill: GREEN });

  /* chips, stamp, sparkles */
  const ch = {
    one: chipM(Lfg, '**1 p.m.**', GOLD, 34),
    tada: chipM(Lfg, '**Ta-da!**', GOLD, 40),
    boyq: chipM(Lfg, '+5%: {{× 1.5}}?', '#FFB37A', 32),
    s90: chipM(Lfg, 'magic: **90**', GOLD, 30),
    s100: chipM(Lfg, 'the cape: **100**', GOLD, 30),
  };
  const stampOK = pcStamp(Lfg, true);
  const stars = [];
  for (let i = 0; i < 10; i++) { const s = spark(Lstar, 12 + (i % 3) * 5, { color: i % 2 ? GOLD : '#FFFFFF' }); stars.push(s); }

  /* ================= the cast ================= */
  const mum = cast(Lmid, 'mum', { s: 0.82 });
  const dad = cast(Lmid, 'dad', { s: 0.82 });
  const kav = cast(Lmid, 'kavya', { s: 0.82 });
  const boy = cast(Lmid, 'boy', { s: 0.82 });
  const multi = cast(Lfg, 'multi', { s: 0.55 });
  const percy = cast(Lfg, 'percy', { s: 0.6 });
  Lfg.insertBefore(multi, Lfg.firstChild); Lfg.insertBefore(percy, Lfg.firstChild);
  const lt = { multi: pcLowerThird(Lhud, 'multi') };
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cuts */
  const cB = at('dad') - 0.06, cA2 = at('boy') - 0.06, cB2 = at('read') - 0.06, cA3 = at('till') - 0.06;
  const XS = { mum: 190, dad: 360, kav: 530, boy: 700 };
  const LEAN = [140, 668, 0.95, 6];
  const MA = [862, 530 - 124 * 0.7];   // the Great Multiplini on the counter

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const sB = on(t, cB, cA2) || on(t, cB2, cA3), sA = 1 - sB;
    for (const k in ch) ch[k].set(0);
    stampOK.set(0); lt.multi.set(0); op(card, 0);
    stars.forEach(s => op(s, 0));
    const show = { mum: 0, dad: 0, kav: 0, boy: 0, multi: 0, percy: 0 };
    const MOODS = {};

    /* ---------- the set ---------- */
    op(Lwash, sB); op(Lboard, sB); op(shop.front, sA); op(shop.top, sA);
    if (sB) view(back, 1.35, 600, 330, 600, 375); else back.removeAttribute('transform');
    if (shop.poster) op(shop.poster, t >= cA2 ? 0 : 1);
    op(glowP, t < at('dad') ? P(t, mid('sign', 0.5), 0.3, linear) * (0.6 + 0.4 * Math.sin(t * 8)) : 0);

    /* ---------- A: the shop ---------- */
    if (sA) {
      show.mum = show.dad = show.kav = show.boy = 1;
      tr(mum, XS.mum, 446, 0.82); tr(dad, XS.dad, 446, 0.82); tr(kav, XS.kav, 448, 0.82); tr(boy, XS.boy, 460, 0.82);
      // props on the counter
      op(cooker, t < cA2 ? 1 : 0);
      op(kG, t >= cA2 ? 1 : 0);
      if (t < cB) {
        popAt(ch.one, t, at('sign') + 0.1, 700, 60);
        const lk = t < mid('sign', 0.4) ? 0 : 0.9;
        MOODS.mum = ['neutral', lk]; MOODS.dad = ['happy', lk]; MOODS.kav = ['neutral', lk]; MOODS.boy = ['happy', lk];
      } else {
        // the Great Multiplini on the counter
        show.multi = 1;
        tr(multi, MA[0], MA[1], 0.7);
        let mm = 'smug', ml = -0.8, wand = 0, tm = 0;
        // the kettle: swells on "boy", balloons on "fifty", shrinks back
        let ks = 1;
        if (t < cB2) {
          const bal = P(t, at('fifty'), 0.5, pop) * (1 - P(t, mid('fifty', 0.72), 0.6, ease));
          if (t < at('fifty')) ks = 1 + 0.08 * P(t, mid('boy', 0.5), 0.8, ease) + 0.03 * Math.sin(t * 9) * P(t, mid('boy', 0.5), 0.3, linear) * AMP;
          else ks = lerp(1, 1.75, bal);
          op(k50, t >= at('fifty') ? clamp(bal * 2) : 0);
          tr(k50, 0, -140 * 0.9 * ks - 24);
          mm = t >= at('fifty') && t < mid('fifty', 0.55) ? 'shock' : t >= at('fifty') ? 'smug' : 'neutral';
          wand = t >= mid('fifty', 0.6) ? P(t, mid('fifty', 0.6), 0.3, linear) : 0;
          // Ah Boy's question
          popAt(ch.boyq, t, mid('boy', 0.45), 700, 280, at('fifty'));
          // the back-wall card
          if (t >= mid('fifty', 0.3)) {
            op(card, P(t, mid('fifty', 0.3), 0.25, linear)); tr(card, 420, 252);
            op(cd1, 1); op(cd2a, P(t, mid('fifty', 0.55), 0.3, linear)); op(cd2b, P(t, mid('fifty', 0.55), 0.3, linear));
            op(cdRing, P(t, mid('fifty', 0.8), 0.25, linear)); op(cd3, 0); op(cd4, 0);
          }
          const kl = t >= at('fifty') ? 0.9 : t >= at('boy') ? 0.6 : 0.9;
          MOODS.boy = [t < at('fifty') ? 'happy' : t < mid('fifty', 0.6) ? 'shock' : 'sad', t < at('fifty') ? 0.6 : 0.9, t < at('fifty') ? 1 : 0];
          MOODS.mum = [t >= at('fifty') && t < mid('fifty', 0.6) ? 'shock' : 'neutral', kl];
          MOODS.dad = [t >= at('fifty') && t < mid('fifty', 0.6) ? 'shock' : 'happy', kl];
          MOODS.kav = [t >= at('fifty') ? 'deadpan' : 'neutral', t >= at('fifty') ? 0.9 : 0.6];
        } else {
          // A3: GST, then Percy's scores
          ks = 1;
          op(k50, 0);
          op(card, t < at('score') ? P(t, mid('till', 0.15), 0.25, linear) : 1); tr(card, 420, 252);
          op(cd1, 0); op(cd2a, 0); op(cd2b, 0); op(cdRing, 0);
          op(cd3, P(t, mid('till', 0.15), 0.3, linear)); op(cd4, P(t, mid('till', 0.62), 0.3, linear));
          mm = t >= at('score') ? (t > mid('score', 0.6) ? 'happy' : 'smug') : 'smug';
          wand = t >= mid('till', 0.4) && t < at('score') ? 1 : 0.15;
          MOODS.dad = [t < at('score') ? 'smug' : 'neutral', t < at('score') ? 0.8 : 0.9, t < at('score') ? 1 : 0];
          MOODS.mum = [t < at('score') ? 'annoyed' : 'deadpan', 0.8];
          MOODS.kav = ['neutral', 0.9];
          MOODS.boy = ['happy', 0.9];
          // Percy pops out of the poster
          if (t >= at('score') - 0.15) {
            show.percy = 1;
            const up = P(t, at('score') - 0.15, 0.4, pop);
            tr(percy, 990, 300, Math.max(0.01, 0.8 * up));
            if (t < at('score') + 0.9) { const pf = P(t, at('score') - 0.15, 0.9, easeOut); stars.forEach((s, i) => { const a = i / stars.length * TAU; op(s, 1 - pf); tr(s, 990 + Math.cos(a) * 150 * pf, 300 + Math.sin(a) * 130 * pf, 1); s.upd(t); }); }
            percy.set({ t, talk: scTalk(S, t, 'percy'), mood: 'happy', look: -0.7, card: P(t, mid('score', 0.12), 0.3, pop), score: t < mid('score', 0.55) ? '90' : '100' });
            popAt(ch.s90, t, mid('score', 0.15), 640, 640, mid('score', 0.55));
            popAt(ch.s100, t, mid('score', 0.55), 640, 640);
          }
        }
        tr(kIn, 0, 0, ks);
        tr(kG, 1004, 530);
        op(tag50, t < mid('till', 0.7) ? 1 : 0); op(tag54, t >= mid('till', 0.7) ? 1 : 0);
        multi.set({ t, talk: scTalk(S, t, 'multi'), mood: mm, look: ml, wand });
      }
      const set = (c, key, who) => { const m = MOODS[key] || ['neutral', 0.8]; c.set({ t, talk: scTalk(S, t, who), mood: m[0], look: m[1], lift: m[2] || 0 }); };
      set(mum, 'mum', 'mum'); set(dad, 'dad', 'dad'); set(kav, 'kav', 'kavya'); set(boy, 'boy', 'boy');
    }

    /* ---------- B: the board shot ---------- */
    if (sB) {
      // the leaning human
      let hum = dad, key = 'dad', who = 'dad', enter = cB, hm = 'neutral', hl = 0.6, lift = 0, ly = LEAN[1];
      if (t >= at('why') - 0.1 && t < at('off') - 0.1) { hum = kav; key = 'kav'; who = 'kavya'; enter = at('why') - 0.1; }
      else if (t >= at('off') - 0.1 && t < cA2) { hum = mum; key = 'mum'; who = 'mum'; enter = at('off') - 0.1; }
      else if (t >= cB2) { hum = boy; key = 'boy'; who = 'boy'; enter = cB2; ly = 600; }
      show[key] = 1;
      let up = P(t, enter, 0.35, pop);
      if (key === 'dad') {
        lift = t < at('ordinary') ? 1 : 0;
        hm = t < at('ordinary') ? 'smug' : t < at('trick') ? 'shock' : t < mid('trick', 0.7) ? 'neutral' : 'happy';
        const duck = P(t, mid('ordinary', 0.12), 0.3, easeIn) * (1 - P(t, at('trick') - 0.1, 0.35, pop));
        up = up * (1 - duck);
      }
      if (key === 'kav') { hm = t > mid('why', 0.7) ? 'smug' : 'neutral'; }
      if (key === 'mum') { hm = t < at('rule') ? 'smug' : 'neutral'; lift = t < at('rule') ? 1 : 0; }
      if (key === 'boy') { hm = t < mid('read', 0.5) ? 'sad' : 'happy'; hl = 0.7; }
      tr(hum, LEAN[0], lerp(ly + 220, ly, up), LEAN[2], LEAN[3]);
      hum.set({ t, talk: scTalk(S, t, who), mood: hm, look: hl, lift });

      // the Great Multiplini: appears in a puff on "ordinary"
      if (t >= at('ordinary')) {
        show.multi = 1;
        const p = P(t, at('ordinary') + 0.05, 0.45, pop);
        tr(multi, 340, 380, Math.max(0.01, 0.95 * p));
        let mm = 'smug', wand = 0.4;
        const spk = scWho(S, t);
        const look = spk && spk !== 'multi' ? -0.8 : 0.6;
        if (t >= at('trick') && t < at('why')) { wand = t > mid('trick', 0.55) ? 1 : 0.5; mm = t > mid('trick', 0.85) ? 'happy' : 'smug'; }
        if (t >= cB2) { wand = 0.6; mm = 'smug'; }
        multi.set({ t, talk: scTalk(S, t, 'multi'), mood: mm, look, wand });
        lt.multi.set(win(t, at('ordinary') + 0.15, at('ordinary') + 3.3, 0.3));
        // the puff
        const pf = P(t, at('ordinary'), 0.9, easeOut);
        if (t < at('ordinary') + 0.9) stars.forEach((s, i) => { const a = i / stars.length * TAU; op(s, 1 - pf); tr(s, 340 + Math.cos(a) * 170 * pf, 380 + Math.sin(a) * 150 * pf, 1); s.upd(t); });
      }

      // board content
      const dadOn = t < at('trick'), trickOn = t >= at('trick') && t < at('why'), whyOn = t >= at('why') && t < at('off');
      const offOn = t >= at('off') && t < at('rule'), ruleOn = t >= at('rule') && t < cA2, readOn = t >= cB2;
      op(bDad, dadOn ? 1 : 0);
      if (dadOn) {
        wDad.show(0, P(t, mid('dad', 0.25), 0.35, linear)); wDad.show(1, P(t, mid('dad', 0.6), 0.35, linear));
        dadArr[0].set(P(t, mid('dad', 0.5), 0.4, linear));
        op(dad46, P(t, mid('dad', 0.75), 0.3, linear));
        const cr = P(t, mid('ordinary', 0.5), 0.6, easeIn);   // the two steps crumple
        dadIn.setAttribute('transform', `translate(0 ${(cr * 120).toFixed(1)}) rotate(${(cr * 25).toFixed(1)}) scale(${(1 - 0.6 * cr).toFixed(3)} ${(1 - 0.85 * cr).toFixed(3)})`);
        op(dadIn, 1 - cr);
      }
      op(bTrick, trickOn ? 1 : 0);
      if (trickOn) {
        wTr.show(0, P(t, mid('trick', 0.05), 0.35, linear)); wTr.show(1, P(t, mid('trick', 0.28), 0.35, linear));
        wTr.ring(1, P(t, mid('trick', 0.35), 0.2, linear));
        op(tr40, P(t, mid('trick', 0.45), 0.25, linear));
        const ap = P(t, mid('trick', 0.55), 0.35, easeOut);
        op(trArr, ap); trArr.setAttribute('transform', `translate(-120 0) scale(${Math.max(0.01, ap).toFixed(3)} 1) translate(120 0)`);
        op(trLab, ap); op(tr46, P(t, mid('trick', 0.66), 0.25, linear));
        op(trEq, P(t, mid('trick', 0.72), 0.3, linear));
        popAt(ch.tada, t, mid('trick', 0.86), 330, 180);
        const sp = P(t, mid('trick', 0.86), 0.9, easeOut);
        if (t >= mid('trick', 0.86)) stars.forEach((s, i) => { if (i > 5) return; const a = -Math.PI / 2 + (i - 2.5) * 0.5; op(s, 1 - sp * 0.6); tr(s, 330 + Math.cos(a) * 140 * sp, 180 + Math.sin(a) * 60 * sp + 40, 1); s.upd(t); });
        stampOK.set(t >= mid('trick', 0.92) ? P(t, mid('trick', 0.92), 0.35, linear) : 0); tr(stampOK, BX + 10, 660, 0.45);
      }
      op(bWhy, whyOn ? 1 : 0);
      if (whyOn) {
        wWhy.show(0, P(t, mid('why', 0.05), 0.35, linear)); wWhy.show(1, P(t, mid('why', 0.3), 0.35, linear)); wWhy.show(2, P(t, mid('why', 0.5), 0.35, linear));
        wWhy.ring(2, P(t, mid('why', 0.62), 0.2, linear));
        op(whyNote, P(t, mid('why', 0.7), 0.3, linear));
      }
      op(bOff, offOn ? 1 : 0);
      if (offOn) {
        op(barRows[0].g, P(t, at('off') + 0.05, 0.3, linear)); op(barRows[1].g, P(t, at('off') + 0.25, 0.3, linear));
        op(extra15, P(t, at('off') + 0.35, 0.3, linear));
        op(barRows[2].g, P(t, mid('off', 0.45), 0.3, linear));
        // the 20% piece: drawn next to the 80% bar, then it falls off
        const fp = P(t, mid('off', 0.62), 0.7, easeIn);
        op(cut, t >= mid('off', 0.45) ? P(t, mid('off', 0.45), 0.3, linear) * (1 - P(t, mid('off', 0.62) + 0.5, 0.2, linear)) : 0);
        tr(cut, -126 + 240 + 40 * fp, barRows[2].y + 50 * fp, 1, 35 * fp); if (t >= mid('off', 0.62)) op(cut, 1 - fp);
        op(offEq, P(t, mid('off', 0.68), 0.3, linear));
      }
      op(bRule, ruleOn ? 1 : 0);
      if (ruleOn) {
        op(ru1, P(t, mid('rule', 0.02), 0.3, linear)); op(ru2, P(t, mid('rule', 0.5), 0.3, linear));
        tab.cells.forEach((row, r) => row.forEach(c => op(c, r === 0 ? P(t, mid('rule', 0.15), 0.3, linear) : P(t, mid('rule', 0.15 + 0.17 * r), 0.3, linear))));
      }
      op(bRead, readOn ? 1 : 0);
      if (readOn) {
        // the needle swings: to 1.2 on "above 1", to 0.8 on "below 1", settles on 0.93
        const ang = v => clamp((v - 1) / 0.5, -1, 1) * 90;
        const a1 = ang(1.2), a2 = ang(0.8), a3 = ang(0.93);
        let a = lerp(0, a1, P(t, mid('read', 0.05), 0.4, ease));
        a = lerp(a, a2, P(t, mid('read', 0.32), 0.5, ease));
        a = lerp(a, a3, P(t, mid('read', 0.6), 0.4, ease));
        tr(needle, DC[0], DC[1], 1, a + (S.reduce ? 0 : Math.sin(t * 12) * 0.6));
        upA.set(P(t, mid('read', 0.08), 0.3, linear)); dnA.set(P(t, mid('read', 0.35), 0.3, linear));
        op(rdVal, P(t, mid('read', 0.65), 0.3, linear));
        op(rdEq, P(t, mid('read', 0.72), 0.3, linear));
      }
    }

    op(mum, show.mum); op(dad, show.dad); op(kav, show.kav); op(boy, show.boy); op(multi, show.multi); op(percy, show.percy);
  };
});
