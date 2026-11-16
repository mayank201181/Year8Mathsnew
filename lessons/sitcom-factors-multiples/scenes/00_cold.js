/* Scene 0: Cold open (no chapter card).
   5 p.m., the void deck of Block 208: Kavya, 12 -> Mum (the plan: everything shared equally) -> Paati, 64 today (the
   biggest slice) -> Dad ("just multiply them") -> Kavya: "that's a hobby" -> documentary zoom into the third pillar,
   where a tiny door glows -> the Prime Club: Big Two, the bouncer (exactly two factors; the only even prime: 4, 6, 8, 10
   bounce off the rope) -> One wants in: NOT ON THE LIST -> "I'll try again later!" -> Big Two lifts THE LIST: tonight, every number gets checked
   -> title card. */
scene('cold', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);          // hard sitcom cut
  const view = (el, k, fx, fy, sx, sy) => el.setAttribute('transform', `translate(${sx.toFixed(1)} ${sy.toFixed(1)}) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const pill = (parent, text, o) => { o = o || {}; return mkChip(parent, text, { size: o.size || 30, col: o.col || C.ink }); };
  const popSet = (el, t, t0, t1, x, y) => { const p = t >= t0 && t < t1 ? P(t, t0, 0.35, linear) : 0; el.set(p); if (x !== undefined) tr(el, x, y); };
  const GOLD = '#FFE45C', PINK = '#FF8FC8', LIL = '#C9B6FF';
  const outline = (w, col, sw) => { w.setAttribute('stroke', col); w.setAttribute('stroke-width', sw); w.setAttribute('paint-order', 'stroke'); w.setAttribute('stroke-linejoin', 'round'); return w; };

  /* layers: sets, characters behind the table, the table, foreground, HUD */
  const Lbg = G(root), Lcast = G(root), Lfront = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= A, B, C: the void deck ================= */
  const voidShot = G(Lbg), voidWrap = G(voidShot);
  const vd = fmVoid(voidWrap);
  Lfront.appendChild(vd.front); Lfront.appendChild(vd.top);
  const cKav = pill(Lfg, 'Kavya, age 12', { size: 32 });
  const cSat = pill(Lfg, '**Saturday, 5 p.m.**', { col: GOLD });
  const cBlk = pill(Lfg, 'void deck, Blk 208', { size: 28 });
  const c64 = pill(Lfg, 'Paati: **64** today', { col: PINK, size: 32 });
  const cEq = pill(Lfg, 'everything shared **equally**', { col: GOLD });
  const cBig = pill(Lfg, 'the **biggest** slice', { col: PINK, size: 32 });
  const cMul = pill(Lfg, 'Rule: **just multiply them** ×', { col: '#9FE0B5', size: 30 });
  const cHob = pill(Lfg, 'a **hobby**', { col: '#FF8A8A', size: 32 });
  // a tray of laddoos and a cake box on the table: the party is coming
  const tray = G(vd.top); tr(tray, 330, 530);
  E('ellipse', { cx: 0, cy: -4, rx: 70, ry: 12, fill: '#C9D3DC', stroke: '#7D8A96', 'stroke-width': 3 }, tray);
  [[-40, -16], [-14, -16], [12, -16], [38, -16], [-27, -36], [0, -36], [26, -36], [-13, -54], [13, -54]].forEach(([x, y]) => tr(fmLaddoo(tray, 13), x, y));
  const box = G(vd.top); tr(box, 1110, 530, 0.8);
  E('rect', { x: -60, y: -70, width: 120, height: 70, rx: 6, fill: '#FFC2E0', stroke: SC_INK, 'stroke-width': 3 }, box);
  E('path', { d: 'M0,-70 L0,0 M-60,-36 L60,-36', stroke: '#E8424F', 'stroke-width': 6 }, box);
  T(box, 0, -44, '64', { size: 26, weight: 800, anchor: 'middle', fill: '#B8336A' });

  // the viewfinder for the zoom
  const finder = G(Lhud);
  E('path', { d: 'M40,140 L40,40 L140,40 M1060,40 L1160,40 L1160,140 M1160,610 L1160,710 L1060,710 M140,710 L40,710 L40,610', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 5, opacity: 0.8 }, finder);
  const zoomTxt = T(finder, 1130, 690, 'ZOOM ×1', { size: 30, weight: 700, anchor: 'end', fill: '#FFFFFF' });
  const recDot = E('circle', { cx: 1080, cy: 72, r: 10, fill: '#FF3B3B' }, finder);
  T(finder, 1100, 82, 'REC', { size: 28, weight: 700, fill: '#FFFFFF' });

  /* ================= D: the Prime Club ================= */
  const clubShot = G(Lbg), clubWrap = G(clubShot);
  const club = fmClub(clubWrap);
  const cTwo = pill(Lfg, 'exactly **2** factors', { col: GOLD, size: 32 });
  const cItself = pill(Lfg, '**1** and itself', { col: GOLD, size: 32 });
  const cEven = pill(Lfg, 'the only **even** prime', { col: LIL, size: 32 });
  const evens = ['4 = 2 * 2', '6 = 2 * 3', '8 = 2 * 4', '10 = 2 * 5'].map(src => {
    const g = G(Lfg), inner = G(g);
    const m = mkMath(inner, 0, 0, src, { size: 36, fill: '#FFFFFF', anchor: 'middle' });
    const w = m.w + 40;
    inner.insertBefore(E('rect', { x: -w / 2, y: -m.a - 12, width: w, height: m.a + m.d + 24, rx: 14, fill: 'rgba(10,27,39,0.9)', stroke: '#FF8A8A', 'stroke-width': 3 }), m);
    const x = cross(inner, 13); tr(x, w / 2 + 8, -m.a - 8);
    return g;
  });
  const cOne = pill(Lfg, 'factors of 1: **1**', { col: '#FFE9A8', size: 32 });
  const cParty = pill(Lfg, 'Tonight: **a party**', { col: PINK, size: 32 });
  const cCheck = pill(Lfg, '**every number** gets checked', { col: GOLD, size: 32 });
  const stampNo = fmStamp(Lfg, 'not');

  /* ================= E: title card ================= */
  const titleShot = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#24104A', '#5B2FA8', true) }, titleShot);
  let rays = '';
  for (let i = 0; i < 16; i++) { const a0 = i / 16 * TAU, a1 = a0 + TAU / 40; rays += `M0,0 L${(Math.cos(a0) * 1100).toFixed(0)},${(Math.sin(a0) * 1100).toFixed(0)} L${(Math.cos(a1) * 1100).toFixed(0)},${(Math.sin(a1) * 1100).toFixed(0)} Z `; }
  const rayP = E('path', { d: rays, fill: '#FFE45C', opacity: 0.08 }, titleShot);
  E('ellipse', { cx: 600, cy: 610, rx: 620, ry: 170, fill: glow('#FF5FD2'), opacity: 0.3 }, titleShot);
  const logo = G(Lfg);
  const logo1 = outline(T(logo, 0, -40, 'PRIME', { size: 120, weight: 800, anchor: 'middle', fill: GOLD, ls: 6 }), '#1A0A36', 14);
  const logo2 = outline(T(logo, 0, 46, 'TIME', { size: 78, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 14 }), '#1A0A36', 12);
  const nums = ['2', '3', '5', '7'].map((d, i) => {
    const g = G(logo); const x = [-330, 330, -420, 420][i], y = [-70, -70, 30, 30][i];
    tr(g, x, y);
    E('circle', { r: 40, fill: ['#6A3FD0', '#FF8A3D', '#2FA36B', '#E8424F'][i], stroke: '#FFFFFF', 'stroke-width': 4 }, g);
    T(g, 0, 18, d, { size: 52, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
    return { g, x, y };
  });
  const epi = T(Lfg, 600, 300, 'Episode 2: Paati Turns Sixty-Four', { size: 42, weight: 700, anchor: 'middle', fill: '#FFFFFF' });

  /* ================= the cast ================= */
  const kav = cast(Lcast, 'kavya');
  const mum = cast(Lcast, 'mum');
  const paati = cast(Lcast, 'paati');
  const dad = cast(Lcast, 'dad');
  const two = cast(Lcast, 'two');
  const one = cast(Lcast, 'one');
  const lt = {};
  ['kavya', 'mum', 'paati', 'dad', 'two', 'one'].forEach(k => { lt[k] = fmLowerThird(Lhud, k); });
  const ltOn = (t, who, t0) => lt[who].set(win(t, t0, t0 + 3.1, 0.3));

  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cut points */
  const cC = at('tiny') - 0.06, cD = at('hi') - 0.06, cE = at('title') - 0.06;
  const XS = { kav: 200, mum: 470, paati: 730, dad: 990 };

  return t => {
    op(blackout, 1 - P(t, 0, 0.6, linear));
    const sAB = on(t, -1, cC), sC = on(t, cC, cD), sD = on(t, cD, cE), sE = on(t, cE, 1e9);
    for (const k in lt) lt[k].set(0);
    [cKav, cSat, cBlk, c64, cEq, cBig, cMul, cHob, cTwo, cItself, cEven, cOne, cParty, cCheck].forEach(c => c.set(0));
    evens.forEach(e => op(e, 0)); stampNo.set(0);
    const show = { kav: 0, mum: 0, paati: 0, dad: 0, two: 0, one: 0 };

    /* ---------- A, B, C: the void deck ---------- */
    const voidOn = sAB || sC;
    op(voidShot, voidOn); op(vd.front, sAB); op(vd.top, sAB); op(finder, sC);
    if (voidOn) vd.upd(t);
    if (sAB) {
      // A: slow push towards the banner while the narrator introduces Kavya; cut back to the wide shot for B
      const inA = t < at('mum') - 0.06;
      const push = inA ? P(t, 0, at('mum'), linear) : 0;
      view(voidWrap, 1 + 0.1 * push, 760, 330, lerp(760, 720, push), 330);
      show.kav = 1;
      tr(kav, XS.kav, 440, 1.0);
      let km = 'neutral', kl = 0.6;
      if (inA) { km = t < mid('kavya', 0.5) ? 'neutral' : 'happy'; kl = t > mid('kavya', 0.4) ? 0.0 : 0.6; }
      else if (t < at('dad')) { km = 'neutral'; kl = 0.8; }
      else if (t < at('hobby')) { km = 'deadpan'; kl = 1; }
      else km = t < end('hobby') ? 'deadpan' : 'smug';
      kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: km, look: kl });
      if (inA) {
        popSet(cKav, t, mid('kavya', 0.12), 1e9, XS.kav, 256);
        popSet(cSat, t, mid('kavya', 0.42), 1e9, 760, 340);
        popSet(cBlk, t, mid('kavya', 0.62), 1e9, 760, 410);
        ltOn(t, 'kavya', at('kavya') + 1.5);
      } else {
        // Mum rises with her plan
        show.mum = 1;
        const up = P(t, at('mum') - 0.25, 0.4, pop);
        tr(mum, XS.mum, lerp(650, 440, up), 1.0);
        let mm = 'neutral', ml = -0.5;
        if (t >= at('paati') && t < at('dad')) { mm = 'annoyed'; ml = 0.8; }
        else if (t >= at('dad')) { mm = 'deadpan'; ml = 1; }
        mum.set({ t, talk: scTalk(S, t, 'mum'), mood: mm, look: ml, lift: t < end('mum') ? 1 : 0 });
        ltOn(t, 'mum', at('mum') + 0.1);
        popSet(c64, t, mid('mum', 0.25), mid('mum', 0.62), XS.mum, 256);
        popSet(cEq, t, mid('mum', 0.62), at('paati') + 0.2, XS.mum, 256);
        // Paati
        if (t >= at('paati') - 0.3) {
          show.paati = 1;
          const pu = P(t, at('paati') - 0.3, 0.4, pop);
          tr(paati, XS.paati, lerp(660, 448, pu), 1.0);
          let pm = 'smug', pl = -0.6;
          if (t >= at('dad')) { pm = 'deadpan'; pl = 0.9; }
          if (t >= at('hobby')) { pm = 'smug'; pl = -1; }
          paati.set({ t, talk: scTalk(S, t, 'paati'), mood: pm, look: pl });
          ltOn(t, 'paati', at('paati') + 0.05);
          popSet(cBig, t, mid('paati', 0.5), at('dad'), XS.paati, 636);
        }
        // Dad, calculator raised
        if (t >= at('dad') - 0.3) {
          show.dad = 1;
          const du = P(t, at('dad') - 0.3, 0.4, pop);
          tr(dad, XS.dad, lerp(660, 440, du), 1.0);
          let dm = 'smug', dl = -0.4, lift = t < end('dad') + 0.3 ? 1 : 0;
          if (t >= at('hobby')) { dm = t < mid('hobby', 0.6) ? 'smug' : 'sad'; dl = -1; lift = 0; }
          dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: dl, lift });
          ltOn(t, 'dad', at('dad') + 0.05);
          popSet(cMul, t, mid('dad', 0.6), at('hobby'), XS.dad - 40, 636);
        }
        if (t >= at('hobby')) popSet(cHob, t, mid('hobby', 0.75), 1e9, XS.dad - 40, 636);
      }
    }
    if (sC) {
      // C: the documentary zooms in on the foot of the third pillar
      const z = P(t, cC + 0.15, cD - cC - 0.5, ease);
      const k = Math.pow(11, z);
      const [cx, cy] = vd.club;
      view(voidWrap, k, lerp(760, cx, Math.min(1, z * 1.6)), lerp(330, cy, Math.min(1, z * 1.6)), 600, 400);
      setText(zoomTxt, 'ZOOM ×' + (k >= 10 ? String(Math.round(k)) : k.toFixed(1)));
      op(recDot, Math.sin(t * TAU * 0.8) > 0 ? 1 : 0.2);
    }

    /* ---------- D: the Prime Club ---------- */
    op(clubShot, sD);
    if (sD) {
      club.upd(t);
      // a slow push on Big Two once One has gone
      const pushT = t >= mid('later', 0.6) ? P(t, mid('later', 0.6), cE - mid('later', 0.6), linear) : 0;
      view(clubWrap, 1 + 0.06 * pushT, 300, 470, 300, 470);
      show.two = 1;
      const s2 = 1.0 + 0.06 * pushT;
      tr(two, 250, 640 - 164 * s2 + (s2 - 1) * 60, s2);
      let tm = 'deadpan', tl = 0.3, list = 0, stamp = 0;
      if (t < at('even')) { tm = t < mid('hi', 0.5) ? 'neutral' : 'deadpan'; }
      else if (t < at('one')) { list = P(t, at('even') + 0.1, 0.4, ease); tm = 'smug'; tl = 0.6; }
      else if (t < at('no')) { tm = 'deadpan'; tl = 1; }
      else if (t < at('later')) { stamp = P(t, at('no') + 0.1, 0.4, ease) * (1 - P(t, mid('no', 0.7), 0.3, ease)); tm = 'smug'; tl = 1; }
      else { list = P(t, end('later'), 0.4, ease); tm = 'deadpan'; tl = t > end('later') ? -0.2 : 1; }
      two.set({ t, talk: scTalk(S, t, 'two'), mood: tm, look: tl, list, stamp });
      ltOn(t, 'two', at('hi') + 0.1);
      // hi: the rules
      popSet(cTwo, t, mid('hi', 0.45), at('one'), 1010, 300);
      popSet(cItself, t, mid('hi', 0.75), at('even'), 1010, 380);
      // even: the only even prime; 4, 6, 8, 10 bounce off the rope
      if (t >= at('even') && t < at('one')) {
        popSet(cEven, t, at('even') + 0.1, 1e9, 1010, 380);
        evens.forEach((e, i) => {
          const t0 = mid('even', 0.3 + i * 0.1), p = P(t, t0, 0.4, easeOut), bump = Math.sin(Math.PI * P(t, t0 + 0.4, 0.35, linear));
          op(e, t >= t0 ? 1 : 0);
          tr(e, lerp(1300, 1015, p) + 30 * bump, 452 + i * 58, 1, 8 * bump);
        });
      }
      // One hops in, is refused, and bounces off
      if (t >= at('one') - 0.4) {
        show.one = 1;
        const hop = P(t, at('one') - 0.4, 0.7, easeOut), gone = P(t, mid('later', 0.55), 0.9, easeIn);
        const x = lerp(1300, 780, hop) + 600 * gone, jump = Math.abs(Math.sin((t - at('one')) * 7)) * 30 * (1 - hop) + Math.abs(Math.sin(t * 9)) * 26 * gone;
        tr(one, x, 680 - 150 - jump, 1.0);
        let om = 'happy', ol = -0.8, wave = 0;
        if (t < at('no')) { wave = t < end('one') ? 1 : 0; }
        else if (t < at('later')) om = t > mid('no', 0.62) ? 'shock' : 'neutral';
        else { om = 'happy'; wave = 1; ol = -0.5; }
        one.set({ t, talk: scTalk(S, t, 'one'), mood: om, look: ol, wave });
        ltOn(t, 'one', at('one') + 0.2);
        popSet(cOne, t, mid('one', 0.55), mid('no', 0.6), 1030, 300);
        stampNo.set(t >= mid('no', 0.6) && t < at('later') + 0.6 ? P(t, mid('no', 0.6), 0.35, linear) : 0);
        tr(stampNo, 790, 560, 0.55);
      }
      // after One has gone: tonight, every number gets checked
      popSet(cParty, t, end('later') + 0.05, 1e9, 1000, 300);
      popSet(cCheck, t, end('later') + 0.3, 1e9, 960, 380);
    }

    /* ---------- E: title card ---------- */
    op(titleShot, sE); op(logo, 0); op(epi, 0);
    if (sE) {
      tr(rayP, 600, 610, 1, (t * 6 * AMP) % 360);
      const lp = P(t, at('title') + 0.05, 0.6, pop);
      op(logo, clamp(lp * 2.5)); tr(logo, 600, 170, Math.max(0.01, 0.5 + 0.5 * lp));
      nums.forEach((n, i) => tr(n.g, n.x, n.y + Math.sin(t * 2 + i) * 6 * AMP, 1, Math.sin(t * 1.5 + i) * 10 * AMP));
      op(epi, P(t, mid('title', 0.42), 0.4, linear));
      const castT = i => mid('title', 0.5) + i * 0.13, xs = [170, 385, 600, 815, 1030];
      const row = [[paati, 'smug', 0.74, 'paati', 525], [kav, 'happy', 0.8, 'kav', 520], [two, 'deadpan', 0.55, 'two', 535],
        [one, 'happy', 0.6, 'one', 535], [dad, 'smug', 0.74, 'dad', 525]];
      row.forEach(([c, mood, s, key, y], i) => {
        const p = P(t, castT(i), 0.45, pop);
        show[key] = 1; op(c, clamp(p * 3));
        tr(c, xs[i], y + 30 * (1 - clamp(p)), Math.max(0.01, s * p));
        c.set({ t, mood, look: 0, lift: 0, list: 0, stamp: 0, wave: key === 'one' ? 1 : 0 });
      });
    }

    op(kav, show.kav); op(mum, show.mum); op(paati, show.paati); op(dad, show.dad); op(two, show.two); op(one, show.one);
  };
});
