/* Scene 8: The last piece of kueh (negative indices, STRETCH).
   One shot: Kavya's flat, 6 p.m. Mum, Kavya (left) and Ah Boy (right) behind the dining table; the plate of kueh lapis
   on the table between them; Dash and Tiny on the table. On the right, the powers-of-2 ladder (2⁴ down to 2⁻³), one
   rung per beat, "÷ 2" between rungs; above the family, a card for the working of each beat.
   six    6 p.m., 16 pieces of kueh lapis; the empty ladder, STRETCH: Year 9 look-ahead
   halve  pieces vanish in halves 16, 8, 4, 2, 1; rungs 2⁴ = 16 … 2⁰ = 1
   more   the last piece is halved: ½, ¼, ⅛
   down   rungs 2⁻¹ = ½, 2⁻² = ¼, 2⁻³ = ⅛ (the negative-index rungs, tinted)
   us     Dash, hopeful: 2⁻³ = −8? BZZT!
   flip   Tiny: a⁻ⁿ = 1/aⁿ, 2⁻³ = 1/2³ = ⅛, not −8: flip, not minus (the showpiece: the rung flips under the bar)
   never  Dash slumps. Hold.
   ten    10⁻¹ = 0.1, 10⁻² = 0.01, 10⁻³ = 0.001; 2³ × 2⁻⁵ = 2³⁺⁽⁻⁵⁾ = 2⁻² = ¼
   crumb  Ah Boy holds up a crumb: 2⁻¹⁰ = 1/1024; 2¹⁰ = 1024 (computer memory); Mum deadpan. Hold. */
scene('kueh', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const popAt = (c, t, t0, x, y, t1) => { c.set(t >= t0 && (t1 === undefined || t < t1) ? P(t, t0, 0.35, linear) : 0); if (x !== undefined) tr(c, x, y); };
  const fadeIn = (el, t, t0, d) => op(el, P(t, t0, d || 0.3, linear));
  const GOLD = '#FFE45C', RED = '#D32F2F', GREEN = '#1E9E5A', INK = MK.ink, MUTE = '#5A6670', PINK = '#C2185B', DASHC = '#3E4A78';

  /* layers */
  const Lset = G(root), Lcast = G(root), Lfront = G(root), Ltop = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= the flat ================= */
  const flat = ipFlat(Lset, { night: true });
  Lfront.appendChild(flat.front); Lfront.appendChild(flat.top);
  /* the plate of kueh lapis (a variant of ipKueh: the pieces left are the middle ones, and the last piece is shown
     big in the middle so its halves, quarters and eighths read) */
  const kueh = G(Ltop); tr(kueh, 470, 594);
  const KC = 32, KCOL = ['#E8424F', '#FFFDF6', '#56D69B', '#FFFDF6', '#FF8FC8', '#FFC247'];
  E('ellipse', { cx: 0, cy: 14, rx: KC * 2.9, ry: KC * 2.5, fill: '#FFFFFF', stroke: '#9AA6B2', 'stroke-width': 5 }, kueh);
  E('ellipse', { cx: 0, cy: 14, rx: KC * 2.6, ry: KC * 2.2, fill: 'none', stroke: '#C9D3DC', 'stroke-width': 3 }, kueh);
  const KORD = [5, 6, 9, 10, 1, 2, 13, 14, 4, 7, 8, 11, 0, 3, 12, 15];   // pieces kept longest first
  const kp = [];
  for (let i = 0; i < 16; i++) {
    const r = Math.floor(i / 4), c = i % 4, p = G(kueh), inner = G(p);
    KCOL.forEach((col, j) => E('rect', { x: -KC / 2, y: -KC / 2 + j * KC / 6, width: KC, height: KC / 6, fill: col }, inner));
    E('rect', { x: -KC / 2, y: -KC / 2, width: KC, height: KC, rx: 4, fill: 'none', stroke: SC_INK, 'stroke-width': 3 }, inner);
    kp.push({ p, inner, x: (c - 1.5) * (KC + 6), y: (r - 1.5) * (KC + 6) + 8 });
  }
  kueh.set = v => {
    kp.forEach((k, i) => {
      const rank = KORD.indexOf(i);
      if (v > 1) { op(k.p, rank < v ? 1 : 0); tr(k.p, k.x, k.y); k.inner.removeAttribute('transform'); }
      else { op(k.p, rank === 0 && v > 0 ? 1 : 0); tr(k.p, 0, 14, 2.2); k.inner.setAttribute('transform', `scale(${Math.max(0.01, v).toFixed(3)} 1)`); }
    });
  };

  /* ---------- the ladder ---------- */
  const lad = G(Lfg);
  const LX0 = 806, LX1 = 1170, LY0 = 168, LY1 = 676, EQX = 968;
  E('rect', { x: LX0, y: LY0, width: LX1 - LX0, height: LY1 - LY0, rx: 16, fill: MK.board, stroke: '#8FA3B8', 'stroke-width': 5 }, lad);
  const negBand = E('rect', { x: LX0 + 10, y: 0, width: LX1 - LX0 - 20, height: 0, rx: 10, fill: 'rgba(255,107,92,0.16)' }, lad);
  const stretch = mkChip(Lfg, '**STRETCH**: Year 9 look-ahead', { size: 26, col: GOLD });
  const RUNGS = [['2^4', '16'], ['2^3', '8'], ['2^2', '4'], ['2^1', '2'], ['2^0', '1'], ['2^(-1)', '1/2'], ['2^(-2)', '1/4'], ['2^(-3)', '1/8']];
  const RY = i => (i < 5 ? 206 + i * 50 : 412 + (i - 4) * 66);
  const rungs = RUNGS.map(([l, r], i) => {
    const g = G(lad), neg = i >= 5;
    mkMath(g, EQX - 16, RY(i), l, { size: 34, fill: neg ? PINK : INK, anchor: 'end' });
    mkMath(g, EQX, RY(i), '=', { size: 34, fill: INK, anchor: 'middle' });
    mkMath(g, EQX + 18, RY(i), r, { size: 34, fill: neg ? PINK : INK, anchor: 'start' });
    return g;
  });
  const halfs = RUNGS.slice(1).map((_, i) => { const g = G(lad); T(g, LX1 - 18, (RY(i) + RY(i + 1)) / 2 + 2, '÷ 2', { size: 26, weight: 700, anchor: 'end', fill: '#8A9AA8' }); return g; });
  attr(negBand, 'y', RY(5) - 40); attr(negBand, 'height', 2 * 66 + 72);

  /* ---------- the card above the family ---------- */
  const card = G(Lfg);
  const CX = 430, CY0 = 120, CW = 700, CH = 196;
  E('rect', { x: CX - CW / 2, y: CY0, width: CW, height: CH, rx: 18, fill: 'rgba(10,27,39,0.97)', stroke: GOLD, 'stroke-width': 4 }, card);
  const CM = CY0 + CH / 2;
  const grp = () => G(card);
  // six
  const kSix = grp();
  T(kSix, CX, CM - 22, '6 p.m.', { size: 40, weight: 800, anchor: 'middle', fill: GOLD });
  mkText(kSix, CX, CM + 44, '**16** pieces of kueh lapis', { size: 38, anchor: 'middle', fill: C.ink, boldFill: GOLD });
  // halve: 16 = 2⁴ ... 1 = 2⁰
  const kHalve = [['16', '2^4'], ['8', '2^3'], ['4', '2^2'], ['2', '2^1'], ['1', '2^0']].map(([n, p], i) => {
    const g = grp();
    if (i > 0) T(g, CX, CM - 36, 'Ah Boy eats half:', { size: 30, weight: 700, anchor: 'middle', fill: C.muted });
    mkText(g, CX, CM + 34, `{{${n}}} ${n === '1' ? 'piece' : 'pieces'} = {{${p}}}`, { size: 50, anchor: 'middle', fill: C.ink });
    return g;
  });
  // more: half the last piece
  const kMore = ['1/2', '1/4', '1/8'].map((f, i) => {
    const g = grp();
    T(g, CX, CM - 34, i === 0 ? 'half the last piece:' : 'then half again:', { size: 30, weight: 700, anchor: 'middle', fill: C.muted });
    mkText(g, CX, CM + 44, `{{${f}}} of a piece`, { size: 46, anchor: 'middle', fill: C.ink });
    return g;
  });
  // down
  const kDown = grp();
  mkText(kDown, CX, CM - 20, 'the index keeps going **down**:', { size: 34, anchor: 'middle', fill: C.ink, boldFill: GOLD });
  mkMath(kDown, CX, CM + 50, '4, 3, 2, 1, 0, -1, -2, -3', { size: 40, fill: GOLD, anchor: 'middle' });
  // us: Dash's guess
  const kUs = grp();
  T(kUs, CX, CM - 32, 'A negative index! One of us?', { size: 32, weight: 700, anchor: 'middle', fill: '#9FB0E0' });
  mkMath(kUs, CX, CM + 46, '2^(-3) = -8 ?', { size: 54, fill: '#FF8A8A', anchor: 'middle' });
  // flip
  const kFlip = grp();
  const fl1 = mkMath(kFlip, CX - 200, CM + 2, 'a^(-n) = 1/a^n', { size: 46, fill: GOLD, anchor: 'middle' });
  const fl2 = mkMath(kFlip, CX + 150, CM + 2, '2^(-3) = 1/2^3 = 1/8', { size: 44, fill: C.ink, anchor: 'middle' });
  const fl3 = mkText(kFlip, CX, CM + 78, '**flip**, not minus: not {{-8}}', { size: 32, anchor: 'middle', fill: C.ink, boldFill: GOLD });
  // ten
  const kTen = grp();
  const tens = ['10^(-1) = 0.1', '10^(-2) = 0.01', '10^(-3) = 0.001'].map((m, i) => mkMath(kTen, CX - 230 + i * 230, CM - 20, m, { size: 34, fill: C.ink, anchor: 'middle' }));
  const tLaw = mkMath(kTen, CX, CM + 56, '2^3 * 2^(-5) = 2^(3 + (-5)) = 2^(-2) = 1/4', { size: 36, fill: GOLD, anchor: 'middle' });
  // crumb
  const kCrumb = grp();
  mkMath(kCrumb, CX, CM - 2, '2^(-10) = 1/1024', { size: 50, fill: C.ink, anchor: 'middle' });
  const cMem = mkText(kCrumb, CX, CM + 76, '{{2^10 = 1024}}: computer memory', { size: 30, anchor: 'middle', fill: '#7FD3FF' });
  const KG = [kSix, ...kHalve, ...kMore, kDown, kUs, kFlip, kTen, kCrumb];
  const stBz = ipStamp(Lfg, false);

  /* ================= the cast ================= */
  const XM = 120, XK = 285, XB = 650, YB = 430;
  const mum = cast(Lcast, 'mum', { s: 0.8 });
  const kav = cast(Lcast, 'kavya', { s: 0.8 });
  const boy = cast(Lcast, 'boy', { s: 0.8 });
  const dash = cast(Ltop, 'dash', { s: 0.4 });
  const tiny = cast(Ltop, 'tiny', { s: 0.42 });
  const DASHP = [380, 530 - 82 * 0.4], TINYP = [574, 530 - 86 * 0.42];
  // the crumb in Ah Boy's hand
  const crumb = G(boy.hand);
  E('rect', { x: -12, y: -46, width: 24, height: 18, rx: 3, fill: '#FF8FC8', stroke: SC_INK, 'stroke-width': 2.5 }, crumb);
  E('rect', { x: -11, y: -38, width: 22, height: 4, fill: '#FFC247' }, crumb);
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  const SPX = { mum: XM, kavya: XK, boy: XB, dash: DASHP[0], tiny: TINYP[0] };
  const lookTo = (x, t, d) => { const w = scWho(S, t); if (!w || SPX[w] === undefined || Math.abs(SPX[w] - x) < 5) return d; return clamp((SPX[w] - x) / 200, -1, 1); };

  const HALVE = [0.04, 0.24, 0.44, 0.62, 0.8].map(f => mid('halve', f));
  const MORE = [0.3, 0.52, 0.74].map(f => mid('more', f));
  const DOWN = [0.3, 0.5, 0.7].map(f => mid('down', f));

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const who = scWho(S, t);
    tr(mum, XM, YB, 0.8); tr(kav, XK, YB, 0.8); tr(boy, XB, 440, 0.8);

    /* the plate */
    let v = 16;
    HALVE.forEach((h, i) => { if (t >= h) v = 16 / Math.pow(2, i); });
    MORE.forEach((h, i) => { if (t >= h) v = 1 / Math.pow(2, i + 1); });
    if (t >= at('ten')) v = 0;
    kueh.set(v);

    /* the ladder */
    stretch.set(P(t, mid('six', 0.5), 0.35, linear)); tr(stretch, (LX0 + LX1) / 2, 132);
    op(lad, P(t, mid('six', 0.4), 0.35, linear));
    rungs.forEach((r, i) => { const t0 = i < 5 ? HALVE[i] : DOWN[i - 5]; op(r, P(t, t0, 0.3, linear)); });
    halfs.forEach((h, i) => { const t0 = i + 1 < 5 ? HALVE[i + 1] : DOWN[i - 4]; op(h, P(t, t0, 0.3, linear)); });
    op(negBand, P(t, DOWN[0], 0.3, linear));

    /* the card */
    let k = -1;
    if (t >= at('six') && t < at('halve')) k = 0;
    else if (t < at('more')) { k = 1; HALVE.forEach((h, i) => { if (t >= h) k = 1 + i; }); }
    else if (t < at('down')) { k = 5; MORE.forEach((h, i) => { if (t >= h) k = 6 + i; }); }
    else if (t < at('us')) k = 9;
    else if (t < at('flip')) k = 10;
    else if (t < at('ten')) k = 11;
    else if (t < at('crumb')) k = 12;
    else k = 13;
    KG.forEach((g, i) => op(g, i === k ? 1 : 0));
    op(card, t >= at('six') ? P(t, at('six'), 0.3, linear) : 0);
    if (k === 10) { stBz.set(t >= mid('us', 0.62) ? P(t, mid('us', 0.62), 0.3, linear) : 0); tr(stBz, CX + 250, CY0 + 150, 0.5); } else stBz.set(0);
    if (k === 11) { fadeIn(fl1, t, mid('flip', 0.06)); fadeIn(fl2, t, mid('flip', 0.4)); fadeIn(fl3, t, mid('flip', 0.58)); }
    if (k === 12) { tens.forEach((m, i) => fadeIn(m, t, mid('ten', 0.03 + i * 0.12))); fadeIn(tLaw, t, mid('ten', 0.6)); }
    if (k === 13) fadeIn(cMem, t, mid('crumb', 0.55));

    /* the humans */
    let mm = 'neutral', km = 'neutral', bm = 'happy', blift = 0, ml = null;
    if (t < at('halve')) { km = 'happy'; }
    else if (t < at('down')) { km = 'happy'; mm = t >= at('more') ? 'annoyed' : 'neutral'; }
    else if (t < at('ten')) { km = 'neutral'; }
    else if (t < at('crumb')) { mm = 'smug'; }
    else { mm = 'deadpan'; km = 'deadpan'; blift = t >= mid('crumb', 0.1) ? 1 : 0; ml = 1; }
    op(crumb, t >= at('crumb') ? 1 : 0);
    mum.set({ t, talk: scTalk(S, t, 'mum'), mood: mm, look: ml !== null ? ml : lookTo(XM, t, 0.8) });
    kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: lookTo(XK, t, 0.8) });
    boy.set({ t, talk: scTalk(S, t, 'boy'), mood: bm, look: lookTo(XB, t, -0.8), lift: blift });

    /* Dash and Tiny */
    let dm = 'sad', darms = 0, dy = DASHP[1], drot = 0, ds = 0.4;
    if (t >= at('us') && t < mid('us', 0.62)) { dm = 'happy'; darms = 1; dy -= Math.abs(Math.sin(t * 7)) * 12 * AMP; }
    else if (t >= mid('us', 0.62) && t < at('flip')) dm = 'shock';
    else if (t >= at('flip') && t < at('never')) dm = 'deadpan';
    else if (t >= at('never') && t < at('ten')) { dm = 'sad'; const sl = P(t, at('never'), 0.5, ease); dy += 8 * sl; drot = 10 * sl; }
    else if (t >= at('ten')) { dm = 'sad'; dy += 8; drot = 10; }
    tr(dash, DASHP[0], dy, ds, drot);
    dash.set({ t, talk: scTalk(S, t, 'dash'), mood: dm, look: who === 'dash' ? 0.4 : lookTo(DASHP[0], t, 0.4), arms: darms });
    const tb = who === 'tiny' ? Math.abs(Math.sin(t * 5)) * 12 * AMP : 0;
    tr(tiny, TINYP[0], TINYP[1] - tb, 0.42);
    tiny.set({ t, talk: scTalk(S, t, 'tiny'), mood: t >= mid('us', 0.62) && t < at('flip') ? 'shock' : 'happy', look: lookTo(TINYP[0], t, -0.6), idx: t < at('flip') ? '3' : t < at('ten') ? '−3' : t < at('crumb') ? '−2' : '−10', arms: who === 'tiny' ? 1 : 0.4 });
  };
});
