/* Scene 5: A dollar on the kaya toast (percentage change vs absolute change).
   Shots (hard sitcom cuts):
   A  2 p.m., the food court (pcFoodCourt): Mum, Ah Boy, Kavya and Dad behind the table, the kaya toast set on it.
      Mum reads the menu and gasps: $4.00 last year, $5.00 now, +$1 -> Dad: his bike, $250 -> $251, also +$1,
      "same same" -> Olive (the original price) rises on the table (lower third): the original is the whole.
   B  the whiteboard (board right, a speaker in the left slot, a human leaning in bottom-left): absolute change =
      new − original, $1 each -> the showpiece: two 100% bars drawn to scale, toast +25% (a fat extension) and bike
      +0.4% (a sliver): 1/4 × 100 = 25%, 1/250 × 100 = 0.4% -> percentage change = change/original × 100, "New minus Old,
      over Old" -> Ah Boy: 1/5 × 100 = 20% -> WRONG WHOLE!: ÷ the original, 1/4 × 100 = 25% -> or new ÷ original:
      5 ÷ 4 = 1.25, up 25%, 100% CORRECT.
   C  the whiteboard with Dad's phone: "Otter sightings up 300%!", last year 5, Dad says 15 -> Olive: up 300% = 400% of
      the original = × 4, 5 × 4 = 20 sightings (rows of otters), 15 more -> Kavya: GST 8% -> 9% is +1 percentage point
      but 1/8 × 100 = 12.5% more tax.
   A2 the food court: Mum, deadpan, eats the $5 toast. Hold. */
scene('toast', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const view = (el, k, fx, fy, sx, sy) => el.setAttribute('transform', `translate(${sx.toFixed(1)} ${sy.toFixed(1)}) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const popAt = (el, t, t0, x, y, t1) => { el.set(t >= t0 && t < (t1 === undefined ? 1e9 : t1) ? P(t, t0, 0.4, linear) : 0); tr(el, x, y); };
  const chipM = (parent, text, col, size) => mkChip(parent, text, { size: size || 30, col: col || C.ink });
  const fadeIn = (el, t, t0, d) => op(el, P(t, t0, d || 0.3, linear));
  const GOLD = '#FFE45C', RED = '#D32F2F', INK = MK.ink, GREEN = '#1E9E5A', BLUE = '#2E5AAC', MUTED = '#6B5E50', BROWN = '#7A5236';
  const BXC = 840;   // whiteboard centre x

  /* a bicycle, centred, about 180 x 110 */
  const bike = (parent, col) => {
    const g = G(parent);
    [-56, 56].forEach(x => { E('circle', { cx: x, cy: 20, r: 36, fill: 'none', stroke: SC_INK, 'stroke-width': 7 }, g); E('circle', { cx: x, cy: 20, r: 5, fill: SC_INK }, g); });
    E('path', { d: 'M-56,20 L-18,-30 L40,-30 L56,20 M-18,-30 L4,20 L40,-30 M4,20 L-56,20 M40,-30 L34,-52 L54,-56', fill: 'none', stroke: col || '#2E7DD8', 'stroke-width': 7, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
    E('path', { d: 'M-30,-40 L-4,-40', stroke: SC_INK, 'stroke-width': 8, 'stroke-linecap': 'round' }, g);
    return g;
  };
  /* a small otter head, centred, about 36 px */
  const otter = (parent, x, y) => {
    const g = G(parent); tr(g, x, y);
    E('circle', { cx: -16, cy: -6, r: 4, fill: BROWN, stroke: SC_INK, 'stroke-width': 2 }, g);
    E('circle', { cx: 16, cy: -6, r: 4, fill: BROWN, stroke: SC_INK, 'stroke-width': 2 }, g);
    E('ellipse', { rx: 18, ry: 14, fill: '#9C6B47', stroke: SC_INK, 'stroke-width': 2.5 }, g);
    E('ellipse', { cy: 6, rx: 12, ry: 7, fill: '#E9D2B4' }, g);
    E('path', { d: 'M-7,-4 l0,0.1 M7,-4 l0,0.1', stroke: SC_INK, 'stroke-width': 5, 'stroke-linecap': 'round' }, g);
    E('path', { d: 'M-4,7 L-22,4 M-4,9 L-22,12 M4,7 L22,4 M4,9 L22,12', stroke: SC_INK, 'stroke-width': 1.5 }, g);
    E('ellipse', { cy: 3, rx: 4, ry: 3, fill: SC_INK }, g);
    return g;
  };

  /* ================= the food court ================= */
  const fc = pcFoodCourt(root);
  const back = fc.firstChild;
  const Lwash = G(fc.mid), Lboard = G(fc.mid), Lmid = G(fc.mid);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#FBF3E6', opacity: 0.88 }, Lwash);
  const Lfg = G(root), Lstar = G(root), Lhud = G(root);

  // the kaya toast set on the table
  const toastG = G(fc.top); pcToast(toastG, { s: 0.95 }); tr(toastG, 560, 560);
  // A: the toast's price tag and Dad's bike card
  const tagToast = mkPriceTag(Lfg, '$5.00', { size: 44, old: '$4.00' });
  const bikeCard = G(Lfg);
  E('rect', { x: -170, y: -125, width: 340, height: 250, rx: 18, fill: '#FFFDF6', stroke: '#9C8A6A', 'stroke-width': 5 }, bikeCard);
  const bk = bike(bikeCard); tr(bk, 0, -60, 0.85);
  mkMath(bikeCard, 0, 38, '$250 → $251', { size: 40, anchor: 'middle', fill: INK });
  const bikeUp = mkText(bikeCard, 0, 96, '**+$1**', { size: 40, anchor: 'middle', fill: GREEN, boldFill: GREEN });

  /* ================= the whiteboard ================= */
  const wb = mkWhiteboard(Lboard, 620, 470); tr(wb, BXC, 370);
  const txt = (parent, y, s, o) => mkText(parent, BXC, y, s, Object.assign({ size: 34, anchor: 'middle', fill: INK }, o || {}));
  const mth = (parent, y, s, o) => mkMath(parent, BXC, y, s, Object.assign({ size: 46, anchor: 'middle', fill: INK }, o || {}));
  // abs: absolute change
  const bAbs = G(Lboard);
  const absHead = txt(bAbs, 206, '**absolute change** = new − original', { size: 34, boldFill: BLUE });
  const absT = G(bAbs), absB = G(bAbs);
  mkText(absT, 600, 300, 'Toast:', { size: 34, fill: MUTED });
  mkMath(absT, 720, 300, '$5 − $4 = $1', { size: 44, fill: INK });
  mkText(absB, 600, 390, 'Bike:', { size: 34, fill: MUTED });
  mkMath(absB, 720, 390, '$251 − $250 = $1', { size: 44, fill: INK });
  const absNote = txt(bAbs, 500, 'Now compare it with the **original**', { size: 32, boldFill: GREEN });
  // pct: the two 100% bars, drawn to scale (4 px per 1%)
  const bPct = G(Lboard), X0 = 580, PW = 400;
  const pTH = mkText(bPct, X0, 196, 'Toast: **$4** → **$5**', { size: 30, fill: INK, boldFill: INK });
  const tBar = G(bPct), tExt = G(bPct);
  E('rect', { x: X0, y: 212, width: PW, height: 50, fill: '#F2C77A', stroke: INK, 'stroke-width': 3 }, tBar);
  T(tBar, X0 + PW / 2, 246, '100% = $4', { size: 26, weight: 800, anchor: 'middle', fill: INK });
  E('rect', { x: X0 + PW, y: 212, width: 100, height: 50, fill: '#7FD49A', stroke: INK, 'stroke-width': 3 }, tExt);
  T(tExt, X0 + PW + 50, 246, '+25%', { size: 26, weight: 800, anchor: 'middle', fill: '#14532D' });
  const pTM = mth(bPct, 334, '1/4 × 100 = 25%', { size: 42, fill: GREEN });
  const pBH = mkText(bPct, X0, 410, 'Bike: **$250** → **$251**', { size: 30, fill: INK, boldFill: INK });
  const bBar = G(bPct), bExt = G(bPct);
  E('rect', { x: X0, y: 426, width: PW, height: 50, fill: '#9FC3EE', stroke: INK, 'stroke-width': 3 }, bBar);
  T(bBar, X0 + PW / 2, 460, '100% = $250', { size: 26, weight: 800, anchor: 'middle', fill: INK });
  E('rect', { x: X0 + PW, y: 426, width: 3, height: 50, fill: RED }, bExt);
  const slArr = arrow(bExt, X0 + PW + 60, 446, X0 + PW + 12, 450, { color: RED, width: 4, head: 14 });
  T(bExt, X0 + PW + 68, 460, '+0.4%', { size: 26, weight: 800, fill: RED });
  const pBM = mth(bPct, 560, '1/250 × 100 = 0.4%', { size: 42, fill: BLUE });
  // rule
  const bRule = G(Lboard);
  const rA = txt(bRule, 206, '**percentage change**', { size: 38, boldFill: BLUE });
  const rB = mth(bRule, 302, '= "change"/"original" × 100', { size: 46 });
  const rC = mkChip(bRule, '**New minus Old, over Old**', { size: 30, col: '#2E7D4F', solid: true, fill: '#DFF5E6' });
  tr(rC, BXC, 420);
  const rD = mth(bRule, 530, '("new" − "old")/"old" × 100', { size: 40, fill: MUTED });
  // boy and wrong
  const bBoy = G(Lboard);
  const yA = txt(bBoy, 200, 'Toast: **$4** → **$5**', { size: 34, boldFill: INK });
  const yB = txt(bBoy, 256, '$1 out of the **new** price, $5:', { size: 30, boldFill: '#C2185B' });
  const yC = mth(bBoy, 344, '1/5 × 100 = 20%', { size: 48 });
  const yX = cross(bBoy, 22, RED); tr(yX, BXC + 210, 328);
  const yD = txt(bBoy, 446, '÷ the **original**, $4:', { size: 32, boldFill: GREEN });
  const yE = mkWorking(bBoy, BXC + 30, 476, ['1/4 × 100 = 25%'], { size: 48, fill: GREEN, ringCol: GREEN });
  // mult
  const bMult = G(Lboard);
  const mA = txt(bMult, 214, 'Or: **new ÷ original**', { size: 36, boldFill: BLUE });
  const mB = mth(bMult, 310, '5 ÷ 4 = 1.25', { size: 58 });
  const mC = txt(bMult, 400, '{{1.25 = 125%}}: up **25%**', { size: 38, boldFill: GREEN });
  // C: otters
  const bOt = G(Lboard);
  const oA = txt(bOt, 196, '**Last year**: 5 sightings', { size: 32, boldFill: BLUE });
  const ot5 = G(bOt);
  for (let i = 0; i < 5; i++) otter(ot5, BXC - 120 + i * 60, 244);
  const oDad = G(bOt);
  mkText(oDad, BXC, 330, 'Dad: **now 15**?', { size: 36, anchor: 'middle', fill: INK, boldFill: '#C2185B' });
  const oDadX = G(oDad);
  E('line', { x1: BXC - 130, y1: 330, x2: BXC + 130, y2: 314, stroke: RED, 'stroke-width': 6, 'stroke-linecap': 'round' }, oDadX);
  const oW = mkWorking(bOt, BXC + 30, 290, ['100% + 300% = 400%', '5 × 4 = 20'], { size: 40, fill: INK, gap: 18 });
  const oX4 = mkChip(bOt, '{{= × 4}}', { size: 32, col: BLUE, fill: '#DCE8FA' });
  const ot20 = G(bOt), ot20s = [];
  for (let i = 0; i < 20; i++) ot20s.push(otter(ot20, BXC - 243 + (i % 10) * 54, 466 + Math.floor(i / 10) * 44));
  const oMore = txt(bOt, 586, '{{20 − 5 = 15}} **more**', { size: 32, boldFill: GREEN });
  // points: GST
  const bPts = G(Lboard);
  const gA = txt(bPts, 210, '**GST**: 8% → 9%', { size: 42, boldFill: RED });
  const gB = txt(bPts, 290, '{{9 − 8 = 1}} **percentage point**', { size: 36, boldFill: BLUE });
  const gL = E('line', { x1: BXC - 240, y1: 330, x2: BXC + 240, y2: 330, stroke: '#C9D3DC', 'stroke-width': 3 }, bPts);
  const gC = txt(bPts, 384, 'but the tax went up by', { size: 30, fill: MUTED });
  const gD = mkWorking(bPts, BXC + 20, 414, ['1/8 × 100 = 12.5%'], { size: 46, fill: GREEN, ringCol: GREEN });
  const gE = txt(bPts, 570, '**12.5%** more tax', { size: 34, boldFill: GREEN });

  /* ================= phone, chips, stamps, sparkles ================= */
  const phone = pcPhone(Lfg, 'Otter sightings\n**up 300%**!');
  const ch = {
    two: chipM(Lfg, '**2 p.m.**', GOLD, 34),
    up1: chipM(Lfg, '**+$1**', '#FF8FB0', 34),
    whole: chipM(Lfg, 'original = **the whole**', GOLD, 32),
    five: chipM(Lfg, 'still **$5.00**', GOLD, 32),
  };
  const same = mkSpeechBubble(Lfg, 'Same same.', { size: 30, tail: 'down', tailX: 50 });
  const stampNo = pcStamp(Lfg, false), stampOK = pcStamp(Lfg, true);
  const stars = [];
  for (let i = 0; i < 10; i++) stars.push(spark(Lstar, 12 + (i % 3) * 5, { color: i % 2 ? GOLD : '#FFFFFF' }));

  /* ================= the cast ================= */
  const mum = cast(Lmid, 'mum', { s: 0.82, prop: null, hand: true });
  const boy = cast(Lmid, 'boy', { s: 0.82 });
  const kav = cast(Lmid, 'kavya', { s: 0.82 });
  const dad = cast(Lmid, 'dad', { s: 0.82 });
  // the toast triangle in Mum's hand (A2)
  const bite = G(mum.hand); tr(bite, 0, -24, 1.5);
  E('path', { d: 'M-26,0 L0,-50 L26,0 Z', fill: '#E8B96A', stroke: '#8A5A20', 'stroke-width': 4, 'stroke-linejoin': 'round' }, bite);
  E('path', { d: 'M-18,-5 L0,-38 L18,-5 Z', fill: '#B8D86A', opacity: 0.85 }, bite);
  E('circle', { cx: 2, cy: -50, r: 12, fill: '#FFFDF6' }, bite);   // a bite out of the top
  const olive = cast(Lfg, 'olive', { s: 0.7 });
  const ltOlive = pcLowerThird(Lhud, 'olive');
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cuts */
  const cB = at('abs') - 0.06, cC = at('otter') - 0.06, cA2 = at('five') - 0.06;
  const XS = { mum: 190, boy: 370, kav: 870, dad: 1040 };
  const YS = 490;
  const LEAN = [140, 668, 0.95, 6];
  const SLOT = [300, 380];
  const ON_TABLE = [740, 560 - 126 * 0.56, 0.56];
  const puff = (t, t0, x, y, r) => {
    if (t < t0 || t > t0 + 0.9) return;
    const pf = P(t, t0, 0.9, easeOut);
    stars.forEach((s, i) => { const a = i / stars.length * TAU; op(s, 1 - pf); tr(s, x + Math.cos(a) * r * pf, y + Math.sin(a) * r * 0.85 * pf, 1); s.upd(t); });
  };

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const sB = on(t, cB, cC), sC = on(t, cC, cA2), board = sB || sC, setOn = 1 - board;
    for (const k in ch) ch[k].set(0);
    same.set(0); stampNo.set(0); stampOK.set(0); ltOlive.set(0);
    stars.forEach(s => op(s, 0));
    op(tagToast, 0); op(bikeCard, 0); op(phone, 0); op(bite, 0);
    const show = { mum: 0, boy: 0, kav: 0, dad: 0, olive: 0 };
    const who = scWho(S, t);

    /* ---------- the set ---------- */
    op(Lwash, board); op(Lboard, board); op(fc.front, setOn); op(fc.top, setOn);
    if (board) view(back, 1.35, 600, 330, 600, 375); else back.removeAttribute('transform');
    fc.upd(t);
    fc.menu.hl(0, t >= mid('two', 0.3) && t < at('olive') ? P(t, mid('two', 0.3), 0.3, linear) : 0);

    /* ---------- the food-court shots ---------- */
    if (setOn) {
      show.mum = show.boy = show.kav = show.dad = 1;
      tr(mum, XS.mum, YS, 0.82); tr(boy, XS.boy, YS + 12, 0.82); tr(kav, XS.kav, YS, 0.82); tr(dad, XS.dad, YS, 0.82);
      if (t < cB) {
        popAt(ch.two, t, at('two') + 0.1, 700, 60);
        // the toast's tag, then +$1
        if (t >= mid('toast', 0.12) && t < at('olive')) {
          const p = P(t, mid('toast', 0.12), 0.4, pop);
          op(tagToast, clamp(p * 3)); tr(tagToast, 110, 236, Math.max(0.01, 0.6 + 0.4 * p));
          tagToast.set(Math.sin(t * 2.8) * 5 * AMP);
        }
        popAt(ch.up1, t, mid('toast', 0.62), 360, 236, at('olive'));
        // Dad's bike card, +$1, "same same"
        if (t >= mid('bike', 0.15) && t < at('olive')) {
          const p = P(t, mid('bike', 0.15), 0.4, pop);
          op(bikeCard, clamp(p * 3)); tr(bikeCard, 970, 262, Math.max(0.01, 0.6 + 0.4 * p));
        }
        op(bikeUp, P(t, mid('bike', 0.45), 0.3, linear));
        popAt(same, t, mid('bike', 0.55), 1000, 76, at('olive'));
        // Olive rises on the table
        if (t >= at('olive') - 0.05) {
          show.olive = 1;
          const p = P(t, at('olive') - 0.05, 0.5, pop);
          tr(olive, ON_TABLE[0], lerp(ON_TABLE[1] + 140, ON_TABLE[1], clamp(p)), ON_TABLE[2]);
          olive.set({ t, talk: scTalk(S, t, 'olive'), mood: 'annoyed', look: -0.3, huff: t > mid('olive', 0.35) && t < mid('olive', 0.75) ? 0.6 : 0 });
          puff(t, at('olive') - 0.05, ON_TABLE[0], ON_TABLE[1], 140);
          ltOlive.set(win(t, at('olive') + 0.2, at('olive') + 3.3, 0.3));
          popAt(ch.whole, t, mid('olive', 0.5), 975, 250);
        }
        // moods
        const gasp = t > mid('two', 0.82);
        let mm = 'neutral', ml = 0.6, bm = 'happy', bl = 0.5, km = 'neutral', kl = -0.6, dm = 'happy', dl = -0.6, dlift = 0, mlift = 0;
        if (t < at('toast')) { mm = gasp ? 'shock' : 'neutral'; ml = 0.4; bl = -0.3; kl = -0.8; dl = -0.9; }
        else if (t < at('bike')) { mm = 'shock'; ml = 0.6; mlift = 1; bm = 'shock'; bl = -0.5; km = 'neutral'; kl = -0.8; dm = 'neutral'; dl = -0.9; }
        else if (t < at('olive')) { mm = 'annoyed'; ml = 0.9; bl = 0.8; km = 'deadpan'; kl = 0.7; dm = 'smug'; dl = -0.6; dlift = t > mid('bike', 0.1) ? 1 : 0; }
        else { mm = 'neutral'; ml = 0.9; bm = 'shock'; bl = 0.8; km = 'neutral'; kl = -0.6; dm = 'shock'; dl = -0.8; }
        mum.set({ t, talk: scTalk(S, t, 'mum'), mood: mm, look: ml, lift: mlift });
        boy.set({ t, talk: 0, mood: bm, look: bl });
        kav.set({ t, talk: 0, mood: km, look: kl });
        dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: dl, lift: dlift });
      } else {
        // A2: Mum eats the toast, deadpan. Hold.
        show.olive = 1;
        tr(olive, ...ON_TABLE);
        olive.set({ t, talk: 0, mood: 'smug', look: -0.9 });
        const eat = P(t, at('five') + 0.2, 0.4, ease);
        op(bite, eat);
        mum.set({ t, talk: scTalk(S, t, 'mum'), mood: 'deadpan', look: 0.2, lift: eat });
        boy.set({ t, talk: 0, mood: 'happy', look: -0.8 });
        kav.set({ t, talk: 0, mood: 'deadpan', look: -0.9 });
        dad.set({ t, talk: 0, mood: 'deadpan', look: -0.9 });
        popAt(ch.five, t, mid('five', 0.55), 200, 250);
      }
    }

    /* ---------- the board shots ---------- */
    if (board) {
      // the human leaning in from the bottom-left
      let hum = null, key = '', hw = '', enter = 0, hm = 'neutral', hl = 0.7, hlift = 0;
      if (sB) {
        if (t < at('pct') - 0.1) { hum = dad; key = 'dad'; hw = 'dad'; enter = cB; hm = t > mid('abs', 0.5) ? 'smug' : 'happy'; }
        else if (t < at('boy') - 0.1) { hum = kav; key = 'kav'; hw = 'kavya'; enter = at('pct') - 0.1; hm = t < at('rule') ? (t > mid('pct', 0.75) ? 'smug' : 'neutral') : 'happy'; }
        else { hum = boy; key = 'boy'; hw = 'boy'; enter = at('boy') - 0.1; hlift = t < at('wrong') ? 1 : 0;
          hm = t < at('wrong') ? 'happy' : t < mid('wrong', 0.5) ? 'shock' : t < at('mult') ? 'sad' : 'happy'; }
      } else {
        if (t < at('points') - 0.1) { hum = dad; key = 'dad'; hw = 'dad'; enter = cC; hm = t < at('four') ? 'smug' : t < mid('four', 0.5) ? 'shock' : 'sad'; hlift = t < at('four') ? 1 : 0; }
        else { hum = kav; key = 'kav'; hw = 'kavya'; enter = at('points') - 0.1; hm = t > mid('points', 0.7) ? 'smug' : 'neutral'; }
      }
      if (hum) {
        show[key] = 1;
        tr(hum, LEAN[0], lerp(LEAN[1] + 220, LEAN[1], P(t, enter, 0.35, pop)), LEAN[2], LEAN[3]);
        hum.set({ t, talk: scTalk(S, t, hw), mood: hm, look: hl, lift: hlift });
      }
      // Olive in the slot left of the board (in C she arrives on 'four'; Dad's phone is there first)
      const oIn = sB ? cB : at('four') - 0.05;
      if (sC && t < at('four') + 0.4) {
        const out = P(t, at('four') - 0.1, 0.35, ease);
        op(phone, 1 - out);
        const p = P(t, cC, 0.4, pop);
        tr(phone, SLOT[0] + 10, 330 - 40 * out, Math.max(0.01, 0.74 * (0.85 + 0.15 * p) * (1 - 0.4 * out)), -4);
      }
      if (t >= oIn) {
        show.olive = 1;
        const p = P(t, oIn, 0.4, pop);
        tr(olive, SLOT[0], SLOT[1], Math.max(0.01, 1.05 * p));
        const spk = who === 'olive';
        let om = spk ? 'annoyed' : 'neutral';
        if (sB && t >= at('mult')) om = t > mid('mult', 0.4) ? 'smug' : 'annoyed';
        if (sB && t >= at('pct') && t < at('rule')) om = 'smug';
        if (sC && t >= at('points')) om = 'smug';
        const huff = (sB && t >= at('wrong') && t < mid('wrong', 0.6)) || (sC && t >= at('four') && t < mid('four', 0.35));
        olive.set({ t, talk: scTalk(S, t, 'olive'), mood: om, look: spk ? 0.6 : 0.8, huff: huff ? 1 : 0 });
      }

      /* B: board content */
      op(bAbs, 0); op(bPct, 0); op(bRule, 0); op(bBoy, 0); op(bMult, 0); op(bOt, 0); op(bPts, 0);
      if (sB) {
        if (t < at('pct')) {
          op(bAbs, 1);
          fadeIn(absHead, t, at('abs') + 0.05);
          fadeIn(absT, t, mid('abs', 0.3)); fadeIn(absB, t, mid('abs', 0.45));
          fadeIn(absNote, t, mid('abs', 0.72));
        } else if (t < at('rule')) {
          op(bPct, 1);
          fadeIn(pTH, t, at('pct') + 0.05); fadeIn(tBar, t, at('pct') + 0.15);
          op(tExt, P(t, mid('pct', 0.12), 0.35, linear));
          fadeIn(pTM, t, mid('pct', 0.18));
          fadeIn(pBH, t, mid('pct', 0.38)); fadeIn(bBar, t, mid('pct', 0.42));
          op(bExt, P(t, mid('pct', 0.5), 0.3, linear)); slArr.set(P(t, mid('pct', 0.5), 0.35, linear));
          fadeIn(pBM, t, mid('pct', 0.55));
        } else if (t < at('boy')) {
          op(bRule, 1);
          fadeIn(rA, t, at('rule') + 0.05); fadeIn(rB, t, mid('rule', 0.15));
          rC.set(P(t, mid('rule', 0.62), 0.4, linear));
          fadeIn(rD, t, mid('rule', 0.75));
        } else if (t < at('mult')) {
          op(bBoy, 1);
          const dim = t >= at('wrong') ? 0.3 : 1;
          op(yA, P(t, at('boy') + 0.05, 0.3, linear) * dim);
          op(yB, P(t, mid('boy', 0.2), 0.3, linear) * dim);
          op(yC, P(t, mid('boy', 0.55), 0.3, linear) * dim);
          op(yX, t >= at('wrong') ? P(t, mid('wrong', 0.25), 0.2, linear) : 0);
          op(yD, t >= at('wrong') ? P(t, mid('wrong', 0.4), 0.3, linear) : 0);
          op(yE, t >= at('wrong') ? P(t, mid('wrong', 0.6), 0.3, linear) : 0);
          yE.ring(0, t >= at('wrong') ? P(t, mid('wrong', 0.85), 0.2, linear) : 0);
          if (t >= at('wrong')) { stampNo.set(P(t, mid('wrong', 0.05), 0.35, linear)); tr(stampNo, BXC, 300, 0.55); }
        } else {
          op(bMult, 1);
          fadeIn(mA, t, at('mult') + 0.05); fadeIn(mB, t, mid('mult', 0.3));
          fadeIn(mC, t, mid('mult', 0.62));
          stampOK.set(t >= mid('mult', 0.75) ? P(t, mid('mult', 0.75), 0.35, linear) : 0); tr(stampOK, BXC, 510, 0.5);
        }
      }

      /* C: board content */
      if (sC) {
        if (t < at('points')) {
          op(bOt, 1);
          fadeIn(oA, t, mid('otter', 0.4)); op(ot5, P(t, mid('otter', 0.48), 0.3, linear));
          const four = t >= at('four');
          op(oDad, t >= mid('otter', 0.78) ? P(t, mid('otter', 0.78), 0.25, linear) : 0);
          op(oDadX, four ? P(t, at('four') + 0.1, 0.2, linear) : 0);
          if (four) { const fade = P(t, mid('four', 0.1), 0.3, linear); op(oDad, 1 - fade); }
          oW.show(0, four ? P(t, mid('four', 0.12), 0.3, linear) : 0);
          oX4.set(four ? P(t, mid('four', 0.38), 0.4, linear) : 0); tr(oX4, BXC + 230, 380 - 32);
          oW.show(1, four ? P(t, mid('four', 0.5), 0.3, linear) : 0);
          ot20s.forEach((o, i) => op(o, four ? P(t, mid('four', 0.55) + i * 0.04, 0.15, linear) : 0));
          fadeIn(oMore, t, four ? mid('four', 0.82) : 1e9);
        } else {
          op(bPts, 1);
          fadeIn(gA, t, at('points') + 0.05);
          fadeIn(gB, t, mid('points', 0.3)); fadeIn(gL, t, mid('points', 0.45));
          fadeIn(gC, t, mid('points', 0.5)); fadeIn(gD, t, mid('points', 0.62));
          gD.ring(0, P(t, mid('points', 0.82), 0.2, linear));
          fadeIn(gE, t, mid('points', 0.85));
        }
      }
    }

    op(mum, show.mum); op(boy, show.boy); op(kav, show.kav); op(dad, show.dad); op(olive, show.olive);
  };
});
