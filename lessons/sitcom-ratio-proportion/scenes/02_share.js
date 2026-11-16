/* Scene 2: The tips jar (sharing in a ratio; given the total, one share or the difference).
   Shots (hard sitcom cuts):
   A  2 p.m. at the stall: the tips jar fills to $84 -> Priya (lower third) and the hours over each head
      (Ah Boy 2 h, Priya 5 h, Kavya 7 h) -> Ah Boy : Priya : Kavya = 2 : 5 : 7 -> Ah Boy: 84 ÷ 2 = $42, the notes slide
      to him -> Priya calls her lawyer.
   B  Barry's board: 84 ÷ 2 crossed out, "never ÷ by one number in the ratio" -> the bar model, 2 + 5 + 7 = 14 boxes
      -> 84 ÷ 14 = $6 a box, $6 in every box -> 2 × 6 = $12, 5 × 6 = $30, 7 × 6 = $42.
   A  12 + 30 + 42 = 84, a pile of notes in front of each, IN PROPORTION -> Add, Divide, Multiply: Ah boy Deserves More.
   A  4 p.m., the cup contest: cups pile up 7 to 4 -> Kavya : Priya = 7 : 4, Kavya sold 45 more.
   B  the bar model: the 3 extra parts = 45 cups -> one part 15, 11 parts = 165 cups (105 − 60 = 45) -> given Priya's
      60 instead: 60 ÷ 4 = 15; the three cases.
   A  Priya: "Rematch. Best of seven." */
scene('share', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const PINK = '#FF8FC8', GOLD = '#FFE45C', RED = '#D32F2F', BLUE = '#2E6FD8', GREEN = '#1E9E5A';
  const popSet = (el, t, t0, t1, x, y) => { const p = t >= t0 && t < t1 ? P(t, t0, 0.35, linear) : 0; el.set(p); if (x !== undefined) tr(el, x, y); };
  const chipAt = (parent, text, o) => { o = o || {}; return mkChip(parent, text, { size: o.size || 30, col: o.col || C.ink }); };
  const NOTE = { '$10': '#C8414B', '$2': '#7D4BA8' };
  const note = (parent, v) => {   // a folded banknote, 84 x 42
    const g = G(parent);
    E('rect', { x: -42, y: -21, width: 84, height: 42, rx: 6, fill: NOTE[v], stroke: mkShade(NOTE[v], -0.4), 'stroke-width': 3 }, g);
    T(g, 0, 10, v, { size: 26, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
    return g;
  };
  const pile = (parent, vals) => { const g = G(parent); vals.forEach((v, i) => tr(note(g, v), (i % 2 ? 6 : -6), -i * 9, 1, i % 2 ? 4 : -3)); return g; };
  const bigNum = (parent, txt, col) => { const w = T(parent, 0, 0, txt, { size: 54, weight: 800, anchor: 'middle', fill: col || GOLD }); w.setAttribute('stroke', '#1A2430'); w.setAttribute('stroke-width', 9); w.setAttribute('paint-order', 'stroke'); w.setAttribute('stroke-linejoin', 'round'); return w; };
  /* hand-built bar rows: boxes with labels we can switch on and off */
  const bars = (parent, x0, rows, u, h, gap, size) => {
    const g = G(parent); g.rows = [];
    rows.forEach((r, i) => {
      const y = i * (h + gap), rg = G(g), cells = [];
      mkText(rg, x0 - 16, y + h / 2 + size * 0.36, r.name, { size, anchor: 'end', fill: r.nameCol || MK.ink, weight: 700 });
      for (let j = 0; j < r.n; j++) {
        const cg = G(rg);
        const rect = E('rect', { x: x0 + j * u, y, width: u, height: h, fill: r.col, stroke: MK.ink, 'stroke-width': 3 }, cg);
        const labs = (r.labels || []).map(L => { const lt = T(cg, x0 + j * u + u / 2, y + h / 2 + 10, L, { size: 28, weight: 700, anchor: 'middle', fill: MK.ink }); op(lt, 0); return lt; });
        cells.push({ cg, rect, labs, base: r.col });
      }
      g.rows.push({ rg, cells, y, x1: x0 + r.n * u });
    });
    g.u = u; g.h = h; g.gap = gap; g.x0 = x0;
    g.grow = (i, p) => { const c = g.rows[i].cells; c.forEach((cl, j) => op(cl.cg, clamp(p * c.length - j))); op(g.rows[i].rg, p > 0 ? 1 : 0); };
    g.lab = (k, p) => g.rows.forEach(r => r.cells.forEach(c => { if (c.labs[k]) op(c.labs[k], p); }));
    g.fill = (i, j, col) => attr(g.rows[i].cells[j].rect, 'fill', col || g.rows[i].cells[j].base);
    return g;
  };

  /* layers */
  const Lset = G(root), Lcast = G(root), Lfront = G(root), Ltop = G(root), Lboard = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= the stall ================= */
  const stall = rpStall(Lset);
  Lfront.appendChild(stall.front); Lfront.appendChild(stall.top);
  const jar = rpTipsJar(stall.top, { s: 0.8 }); tr(jar, 1075, 532);
  const c84 = chipAt(Lfg, '**$84**', { col: GOLD, size: 34 });
  const sludge = rpJug(stall.top, { col: rpMix(4, 1), s: 0.4 }); tr(sludge, 118, 532);

  // A: hours, then the ratio over the heads
  const XS = { boy: 230, priya: 470, kavya: 710 };
  const hrs = [['boy', '2 h'], ['priya', '5 h'], ['kavya', '7 h']].map(([k, s]) => { const c = chipAt(Lfg, `**${s}**`, { col: GOLD, size: 34 }); return c; });
  const nums = G(Lfg);
  const numEls = [['boy', '2'], ['priya', '5'], ['kavya', '7']].map(([k, s]) => { const w = bigNum(nums, s); tr(w, XS[k], 290); return w; });
  [350, 590].forEach(x => { const w = bigNum(nums, ':'); tr(w, x, 286); });
  const ratioLine = G(Lfg);
  E('rect', { x: 250, y: 180, width: 700, height: 64, rx: 32, fill: 'rgba(10,27,39,0.9)', stroke: GOLD, 'stroke-width': 3 }, ratioLine);
  mkMath(ratioLine, 600, 226, '"Ah Boy" : "Priya" : "Kavya" = 2 : 5 : 7', { size: 38, fill: C.ink, anchor: 'middle' });
  const bubBoy = mkSpeechBubble(Lfg, '{{84 ÷ 2 = $42}}!', { size: 40, tail: 'down', tailX: -60 });
  const cLaw = chipAt(Lfg, 'least work, **most money?**', { col: '#FF8A8A' });
  const boyPile = pile(stall.top, ['$10', '$10', '$10', '$10', '$2']);

  // A: check, piles, ADM
  const checkLine = G(Lfg);
  E('rect', { x: 330, y: 180, width: 540, height: 64, rx: 32, fill: 'rgba(10,27,39,0.9)', stroke: '#56D69B', 'stroke-width': 3 }, checkLine);
  mkMath(checkLine, 580, 226, '12 + 30 + 42 = 84', { size: 40, fill: C.ink, anchor: 'middle' });
  const ck = tick(checkLine, 16); tr(ck, 790, 210);
  const shareChips = [['boy', '$12'], ['priya', '$30'], ['kavya', '$42']].map(([k, s]) => chipAt(Lfg, `**${s}**`, { col: '#9FE0B5', size: 34 }));
  const piles = [['$10', '$2'], ['$10', '$10', '$10'], ['$10', '$10', '$10', '$10', '$2']].map(v => pile(stall.top, v));
  [0, 1, 2].forEach(i => tr(piles[i], [XS.boy, XS.priya, XS.kavya][i] + 70, 508));
  const stampIn = rpStamp(Lfg, true);
  const adm1 = G(Lfg);
  E('rect', { x: 270, y: 180, width: 660, height: 64, rx: 32, fill: 'rgba(10,27,39,0.9)', stroke: GOLD, 'stroke-width': 3 }, adm1);
  mkText(adm1, 600, 225, 'First **A**dd, then **D**ivide, then **M**ultiply', { size: 34, anchor: 'middle', fill: C.ink, boldFill: GOLD });
  const adm2 = mkChip(Lfg, '**A**h boy **D**eserves **M**ore', { size: 36, col: PINK });

  // A: the cup contest
  const contest = G(Lfg);
  E('rect', { x: 330, y: 180, width: 540, height: 64, rx: 32, fill: 'rgba(10,27,39,0.9)', stroke: PINK, 'stroke-width': 3 }, contest);
  T(contest, 600, 225, 'CUP CONTEST: KAVYA vs PRIYA', { size: 32, weight: 800, anchor: 'middle', fill: PINK });
  const scoreLine = G(Lfg);
  E('rect', { x: 340, y: 180, width: 520, height: 64, rx: 32, fill: 'rgba(10,27,39,0.9)', stroke: GOLD, 'stroke-width': 3 }, scoreLine);
  mkMath(scoreLine, 600, 226, '"Kavya" : "Priya" = 7 : 4', { size: 40, fill: C.ink, anchor: 'middle' });
  const c45 = chipAt(Lfg, 'Kavya sold **45 more**', { col: GOLD });
  const cupsK = [], cupsP = [];
  const miniCup = (col, x) => {   // a small takeaway cup: body and straw, two elements
    const g = G(stall.top); tr(g, x, 532);
    E('path', { d: 'M-14,-40 L14,-40 L11,0 L-11,0 Z', fill: col, stroke: '#5A6670', 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
    E('path', { d: 'M3,-40 L8,-58', stroke: '#FF5FA2', 'stroke-width': 4, 'stroke-linecap': 'round' }, g);
    return g;
  };
  for (let i = 0; i < 7; i++) cupsK.push(miniCup(RP_DRINK.bandung, XS.kavya - 102 + i * 34));
  for (let i = 0; i < 4; i++) cupsP.push(miniCup(RP_DRINK.lime, XS.priya - 51 + i * 34));
  const cBest = chipAt(Lfg, '**BEST OF 7**', { col: '#FF8A8A', size: 36 });

  const chips = {
    two: chipAt(Lfg, '**2 p.m.**', { col: GOLD }),
    four: chipAt(Lfg, '**4 p.m.**', { col: GOLD }),
  };

  /* ================= B: Barry's board ================= */
  const bd = G(Lboard);
  E('rect', { x: 330, y: 116, width: 836, height: 548, rx: 18, fill: MK.board, stroke: '#8FA3B8', 'stroke-width': 6 }, bd);
  E('rect', { x: 330, y: 116, width: 836, height: 16, rx: 8, fill: '#C9D3DC' }, bd);
  const BX = 748;     // centre of the writing area
  // barry: never divide by one number
  const bNever = G(bd);
  const nM = mkMath(bNever, BX - 30, 250, '84 ÷ 2 = $42', { size: 60, fill: MK.ink, anchor: 'middle' });
  const nX = cross(bNever, 30); tr(nX, BX - 30 + nM.w / 2 + 52, 230);
  mkText(bNever, BX, 360, 'Never ÷ by **one** number in the ratio', { size: 36, anchor: 'middle', fill: RED });
  // the three shares
  const bShare = G(bd);
  mkText(bShare, BX, 172, '{{$84}} shared {{2 : 5 : 7}}', { size: 34, anchor: 'middle', fill: '#5A6670' });
  const B3 = bars(bShare, 520, [
    { name: 'Ah Boy', n: 2, col: '#FFC27A', labels: ['$6'] },
    { name: 'Priya', n: 5, col: '#B9D7FF', labels: ['$6'] },
    { name: 'Kavya', n: 7, col: '#F7B3CF', labels: ['$6'] }], 56, 58, 22, 30);
  tr(B3, 0, 214);
  const totB = mkBrace(bShare, 520 + 7 * 56 + 18, 214, 520 + 7 * 56 + 18, 214 + 3 * 58 + 2 * 22, { text: '**14** boxes', col: MK.ink, size: 30 });
  const totB2 = mkBrace(bShare, 520 + 7 * 56 + 18, 214, 520 + 7 * 56 + 18, 214 + 3 * 58 + 2 * 22, { text: '14 boxes\n= {{$84}}', col: BLUE, size: 30 });
  const wAdd = mkText(bShare, BX, 520, 'Add: {{2 + 5 + 7 = 14}} boxes', { size: 38, anchor: 'middle', fill: MK.ink });
  const wDiv = mkText(bShare, BX, 590, 'Divide: {{84 ÷ 14 = $6}} a box', { size: 38, anchor: 'middle', fill: BLUE });
  const wMul = ['2 × 6 = $12', '5 × 6 = $30', '7 × 6 = $42'].map((src, i) => mkMath(bShare, 944, 214 + i * 80 + 41, src, { size: 34, fill: GREEN, anchor: 'start' }));
  // the contest
  const bCont = G(bd);
  mkMath(bCont, BX, 168, '"Kavya" : "Priya" = 7 : 4', { size: 36, fill: '#5A6670', anchor: 'middle' });
  const B2 = bars(bCont, 520, [
    { name: 'Kavya', n: 7, col: '#F7B3CF', labels: ['15'] },
    { name: 'Priya', n: 4, col: '#C8F08C', labels: ['15'] }], 60, 58, 24, 30);
  tr(B2, 0, 280);
  const diffB = mkBrace(bCont, 520 + 4 * 60, 272, 520 + 7 * 60, 272, { text: 'difference: {{7 − 4 = 3}} parts = 45 cups', col: RED, size: 30 });
  const tot11 = mkBrace(bCont, 520 + 7 * 60 + 18, 280, 520 + 7 * 60 + 18, 280 + 2 * 58 + 24, { text: '**11** parts', col: MK.ink, size: 30 });
  const wOne = mkText(bCont, BX, 486, 'one part = {{45 ÷ 3 = 15}} cups', { size: 36, anchor: 'middle', fill: BLUE });
  const wTot = mkText(bCont, BX, 546, 'total = {{11 × 15 = 165}} cups', { size: 36, anchor: 'middle', fill: MK.ink });
  const wChk = mkText(bCont, BX, 610, 'Kavya {{7 × 15 = 105}}, Priya {{4 × 15 = 60}}, {{105 − 60 = 45}} ✓', { size: 28, anchor: 'middle', fill: GREEN });
  const giveB = mkBrace(bCont, 520, 280 + 58 + 24 + 58 + 8, 520 + 4 * 60, 280 + 58 + 24 + 58 + 8, { text: "Priya's 4 parts = 60 cups", col: BLUE, size: 30, flip: true });
  const wSame = mkText(bCont, 790, 402, '{{60 ÷ 4 = 15}}: same one part', { size: 28, anchor: 'start', fill: BLUE });
    const tbl = mkTable(bCont, [
    ['given the **total**', '÷ by **all** the parts'],
    ['given **one share**', "÷ by **that share's** parts"],
    ['given the **difference**', '÷ by the **difference** in parts']], { colW: [300, 400], rowH: 42, size: 26, ink: MK.ink, head: false, fill: 'rgba(46,111,216,0.08)' });
  tr(tbl, BX - 350, 512);

  /* ================= the cast ================= */
  const boy = cast(Lcast, 'boy', { s: 0.92, prop: 'calculator' });
  const priya = cast(Lcast, 'priya', { s: 0.92, prop: 'phone' });
  const kav = cast(Lcast, 'kavya', { s: 0.92 });
  const barry = cast(Ltop, 'barry', { s: 0.5 });
  const kavB = cast(Lfg, 'kavya', { s: 0.72 });   // Kavya pops into the board shot for her own lines
  const lt = { priya: rpLowerThird(Lhud, 'priya'), barry: rpLowerThird(Lhud, 'barry') };
  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cuts */
  const k = id => at(id) - 0.06;
  const cB1 = k('barry'), cA2 = k('check'), cA3 = k('contest'), cB2 = k('diff'), cA4 = k('rematch');

  return t => {
    op(blackout, 1 - P(t, 0, 0.5, linear));
    const sB = on(t, cB1, cA2) || on(t, cB2, cA4), sA = 1 - sB;
    op(Lboard, sB);
    for (const kk in lt) lt[kk].set(0);
    for (const kk in chips) chips[kk].set(0);
    c84.set(0); hrs.forEach(h => h.set(0)); op(nums, 0); op(ratioLine, 0); bubBoy.set(0); cLaw.set(0); op(boyPile, 0);
    op(checkLine, 0); shareChips.forEach(c => c.set(0)); piles.forEach(p => op(p, 0)); stampIn.set(0); op(adm1, 0); adm2.set(0);
    op(contest, 0); op(scoreLine, 0); c45.set(0); cupsK.forEach(c => op(c, 0)); cupsP.forEach(c => op(c, 0)); cBest.set(0);
    stall.upd(t); op(kavB, 0);
    const show = { boy: 0, priya: 0, kav: 0, barry: 0 };

    /* ---------- A: the stall ---------- */
    if (sA) {
      show.boy = 1; show.kav = 1;
      tr(boy, XS.boy, 448, 0.92); tr(kav, XS.kavya, 440, 0.92);
      const early = t < cB1, mid2 = t >= cA2 && t < cA3, late = t >= cA3 && t < cB2, last = t >= cA4;
      op(jar, 1);
      if (early) jar.set(clamp(P(t, at('two') + 0.2, 2.6, linear) * 8 + 0.0001) * (1 - P(t, mid('boy', 0.5), 0.6, linear)));
      else jar.set(0);
      // Priya pops up on her line
      if (t >= at('priya') - 0.3) {
        show.priya = 1;
        const up = early ? P(t, at('priya') - 0.3, 0.35, pop) : 1;
        tr(priya, XS.priya, lerp(660, 440, up), 0.92);
      }
      if (early) lt.priya.set(win(t, at('priya') + 0.1, at('priya') + 3.2, 0.3));
      // moods and looks
      let bm = 'happy', bl = 0.6, pm = 'smug', pl = 0.6, km = 'neutral', kl = -0.5, blift = 0, plift = 0, bmood2 = null;
      if (early) {
        if (t < at('priya')) { bl = 0.9; kl = 0.9; km = 'happy'; }
        else if (t < at('ratio')) { bl = 0.7; kl = -0.6; }
        else if (t < at('boy')) { pl = 0.6; km = 'neutral'; kl = -0.6; bl = 0.7; }
        else if (t < at('lawyer')) { bm = 'happy'; blift = 1; pm = 'shock'; pl = -0.8; km = 'deadpan'; kl = -0.8; bl = 0.4; }
        else { pm = 'annoyed'; plift = 1; pl = 0.5; km = 'deadpan'; kl = -0.6; bl = 0.7; }
      } else if (mid2) {
        km = 'happy'; kl = -0.5; pm = 'happy'; pl = -0.5;
        if (t >= at('adm')) { bm = 'happy'; blift = 1; bl = 0.6; km = 'deadpan'; pm = 'deadpan'; kl = -0.7; pl = -0.7; }
      } else if (late) {
        km = t >= at('score') ? 'smug' : 'happy'; kl = -0.6; pm = t >= mid('score', 0.5) ? 'annoyed' : 'smug'; pl = 0.6; bl = 0.8;
      } else if (last) { pm = 'annoyed'; pl = 0.8; plift = 1; km = 'smug'; kl = -0.7; bl = 0.7; }
      boy.set({ t, talk: scTalk(S, t, 'boy'), mood: bm, look: bl, lift: blift });
      priya.set({ t, talk: scTalk(S, t, 'priya'), mood: pm, look: pl, lift: plift });
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
      // Barry on the counter after his board
      if (!early) {
        show.barry = 1; tr(barry, 905, 530 - 106 * 0.5, 0.5);
        barry.set({ t, talk: scTalk(S, t, 'barry'), mood: t >= at('adm') && t < cA3 ? 'deadpan' : (last ? 'deadpan' : 'neutral'), look: -0.6, lit: 0 });
      }

      if (early) {
        popSet(chips.two, t, at('two') + 0.05, at('priya'), 200, 250);
        popSet(c84, t, mid('two', 0.55), at('boy'), 1075, 350);
        // hours over each head: Priya 5, Kavya 7, Ah Boy 2 (in the order said)
        if (t >= at('priya') && t < at('boy')) {
          const ord = [0.85, 0.42, 0.62];
          hrs.forEach((h, i) => { popSet(h, t, mid('priya', ord[i]), mid('ratio', 0.15), [XS.boy, XS.priya, XS.kavya][i], 286); });
          op(nums, P(t, mid('ratio', 0.15), 0.3, linear));
          op(ratioLine, P(t, mid('ratio', 0.35), 0.3, linear));
        }
        if (t >= at('boy')) {
          popSet(bubBoy, t, mid('boy', 0.45), 1e9, 330, 236);
          // the notes slide from the jar to Ah Boy
          const sl = P(t, mid('boy', 0.55), 0.7, ease);
          op(boyPile, t >= mid('boy', 0.55) ? 1 : 0); tr(boyPile, lerp(1075, XS.boy + 80, sl), lerp(470, 508, sl));
        }
        if (t >= at('lawyer')) popSet(cLaw, t, mid('lawyer', 0.3), 1e9, 690, 250);
      } else if (mid2) {
        if (t < at('adm')) {
          op(checkLine, P(t, at('check') + 0.05, 0.3, linear));
          const xs = [XS.boy, XS.priya, XS.kavya];
          shareChips.forEach((c, i) => popSet(c, t, at('check') + 0.1 + i * 0.25, 1e9, xs[i], 286));
          piles.forEach((p, i) => { const d = P(t, mid('check', 0.15) + i * 0.2, 0.4, easeOut); op(p, clamp(d * 3)); tr(p, xs[i] + 70, lerp(380, 508, d)); });
          stampIn.set(P(t, mid('check', 0.8), 0.35, linear)); tr(stampIn, 960, 300, 0.42);
        } else {
          piles.forEach((p, i) => { op(p, 1); tr(p, [XS.boy, XS.priya, XS.kavya][i] + 70, 508); });
          op(adm1, P(t, at('adm') + 0.05, 0.3, linear));
          popSet(adm2, t, mid('adm', 0.6), 1e9, 600, 274);
        }
      } else if (late) {
        if (t < at('score')) {
          popSet(chips.four, t, at('contest') + 0.05, 1e9, 200, 286);
          op(contest, P(t, mid('contest', 0.3), 0.3, linear));
        } else {
          op(scoreLine, P(t, at('score') + 0.05, 0.3, linear));
          popSet(c45, t, mid('score', 0.55), 1e9, XS.kavya, 290);
        }
        // the cups pile up, 7 to 4
        const cp = P(t, mid('contest', 0.3), at('score') + 0.8 - mid('contest', 0.3), linear);
        cupsK.forEach((c, i) => op(c, clamp(cp * 7 - i)));
        cupsP.forEach((c, i) => op(c, clamp(cp * 7 * 4 / 7 - i)));
      } else if (last) {
        cupsK.forEach(c => op(c, 1)); cupsP.forEach(c => op(c, 1));
        popSet(cBest, t, mid('rematch', 0.45), 1e9, XS.priya + 30, 280);
      }
    }

    /* ---------- B: Barry's board ---------- */
    if (sB) {
      show.barry = 1;
      tr(barry, 175, 530 - 106 * 0.8, 0.8);
      const first = t < cA2;
      op(bNever, first && t < at('boxes') ? 1 : 0);
      op(bShare, first && t >= at('boxes') ? 1 : 0);
      op(bCont, first ? 0 : 1);
      let bmood = 'neutral', lit = 0;
      if (first) {
        if (t < at('boxes')) lt.barry.set(win(t, at('barry') + 0.1, at('barry') + 3.3, 0.3));
        else {
          [0, 1, 2].forEach(i => B3.grow(i, P(t, mid('boxes', 0.1 + i * 0.2), 0.45, linear)));
          op(wAdd, P(t, mid('boxes', 0.5), 0.3, linear));
          totB.set(P(t, mid('boxes', 0.75), 0.3, linear) * (1 - P(t, at('one'), 0.2, linear)));
          totB2.set(P(t, at('one') + 0.1, 0.3, linear) * (1 - P(t, at('shares'), 0.25, linear)));
          op(wDiv, P(t, mid('one', 0.3), 0.3, linear));
          B3.lab(0, P(t, mid('one', 0.62), 0.4, linear));
          wMul.forEach((w, i) => op(w, P(t, mid('shares', 0.05 + i * 0.32), 0.3, linear)));
          if (t > end('boxes') && t < at('one')) { bmood = 'smug'; lit = clamp((t - end('boxes')) * 14, 0, 5); }
        }
      } else {
        B2.grow(0, 1); B2.grow(1, 1);
        const dp = P(t, mid('diff', 0.3), 0.3, linear);
        for (let j = 4; j < 7; j++) B2.fill(0, j, dp > 0.5 ? GOLD : null);
        diffB.set(P(t, mid('diff', 0.4), 0.3, linear));
        B2.lab(0, P(t, mid('total', 0.18), 0.3, linear));
        op(wOne, P(t, at('total') + 0.05, 0.3, linear) * (1 - P(t, at('given'), 0.25, linear)));
        tot11.set(P(t, mid('total', 0.4), 0.3, linear) * (1 - P(t, at('given'), 0.25, linear)));
        op(wTot, P(t, mid('total', 0.45), 0.3, linear) * (1 - P(t, at('given'), 0.25, linear)));
        op(wChk, P(t, mid('total', 0.75), 0.3, linear) * (1 - P(t, at('given'), 0.25, linear)));
        giveB.set(P(t, mid('given', 0.1), 0.3, linear));
        op(wSame, P(t, mid('given', 0.35), 0.3, linear));
        op(tbl, P(t, mid('given', 0.55), 0.3, linear));
        if (t >= at('given')) bmood = 'smug';
      }
      barry.set({ t, talk: scTalk(S, t, 'barry'), mood: bmood, look: 0.6, lit });
      // Kavya leans in from the bottom left for "shares" and "given"
      const kT = first ? at('shares') : at('given'), who = scWho(S, t);
      if (t >= kT - 0.3) {
        op(kavB, 1);
        tr(kavB, 178, lerp(860, 652, P(t, kT - 0.3, 0.35, pop)), 0.72);
        kavB.set({ t, talk: scTalk(S, t, 'kavya'), mood: who === 'kavya' ? 'happy' : 'smug', look: who === 'kavya' ? 0.8 : -0.4 });
      }
    }

    op(boy, show.boy); op(priya, show.priya); op(kav, show.kav); op(barry, show.barry);
  };
});
