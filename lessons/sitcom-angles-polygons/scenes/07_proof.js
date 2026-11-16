/* Scene 7: Priya measures twenty triangles (geometric reasoning and proof, stretch).
   Sunday, grouting day: Priya has measured 20 triangles (exterior angle = the two interior opposite angles): "Proved!"
   -> Mr Tan: infinitely many triangles; what about number 21? -> she picks up number 21 (Rex twitches at the
   protractor) -> letters cover every triangle: a, b, c and the exterior angle d -> the two-column proof: c + d = 180
   (angles on a straight line), a + b + c = 180 (angles in a triangle), so d = 180 - c = a + b -> APPROVED -> to
   disprove, one counterexample -> Dad: four equal sides means a square -> Ah Boy's rhombus -> Mr Tan's pun; Para and
   Lel, in the corner of the board, are not amused. */
scene('proof', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const fade = (el, t, t0, d) => op(el, P(t, t0, d || 0.3, linear));
  const line = (el, t, t0) => { const p = P(t, t0, 0.3, easeOut); op(el, p); tr(el, -18 * (1 - p), 0); };
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 3, color: o.color || C.ink, weight: 700 }); };
  const GOLD = '#FFE45C', INK = MK.ink, RED = '#C62828', GREEN = '#1E9E5A', BLUE = '#1864AB', BERRY = '#B8336A', OR = '#D9480F';
  const ticks = (parent, a, b, n, col) => {
    const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, L = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const ux = (b[0] - a[0]) / L, uy = (b[1] - a[1]) / L, nx = -uy, ny = ux, h = 12;
    let d = '';
    for (let k = 0; k < n; k++) { const o = (k - (n - 1) / 2) * 10; const cx = mx + ux * o, cy = my + uy * o; d += `M${(cx - nx * h).toFixed(1)},${(cy - ny * h).toFixed(1)} L${(cx + nx * h).toFixed(1)},${(cy + ny * h).toFixed(1)} `; }
    return E('path', { d, stroke: col || INK, 'stroke-width': 5, 'stroke-linecap': 'round' }, parent);
  };
  const infinity = (parent, s, col) => E('path', { d: `M0,0 C${20 * s},${-30 * s} ${60 * s},${-30 * s} ${60 * s},0 C${60 * s},${30 * s} ${20 * s},${30 * s} 0,0 C${-20 * s},${-30 * s} ${-60 * s},${-30 * s} ${-60 * s},0 C${-60 * s},${30 * s} ${-20 * s},${30 * s} 0,0 Z`, fill: 'none', stroke: col, 'stroke-width': 9, 'stroke-linejoin': 'round' }, parent);

  /* layers: kitchen, whiteboard, busts, island, characters on the island, HUD */
  const Lset = G(root), Lbrd = G(root), Lcast = G(root), Lfront = G(root), Lchar = G(root), Lhud = G(root);

  /* ================= the kitchen, Sunday ================= */
  const kit = agKitchen(Lset);
  Lfront.appendChild(kit.front); Lfront.appendChild(kit.top);
  kit.clock(9);
  // grout buckets on the island
  [[1150, 0.75]].forEach(([x, s]) => {
    const b = G(kit.top); tr(b, x, kit.counterY - 6, s);
    E('path', { d: 'M-34,0 L-40,-62 L40,-62 L34,0 Z', fill: '#F2F6FA', stroke: '#5A6670', 'stroke-width': 4, 'stroke-linejoin': 'round' }, b);
    E('path', { d: 'M-38,-62 Q0,-100 38,-62', fill: 'none', stroke: '#5A6670', 'stroke-width': 4 }, b);
    E('rect', { x: -36, y: -46, width: 72, height: 18, fill: '#8F9CAB' }, b);
    T(b, 0, -32, 'GROUT', { size: 14, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  });

  /* ================= the whiteboard ================= */
  const BX = 815, BY = 300;
  const wb = mkWhiteboard(Lbrd, 700, 420); tr(wb, BX, BY);
  const B = G(Lbrd);   // board content in stage coordinates (board area x 465..1165, y 90..510)

  // A: Priya's twenty triangles
  const bTw = G(B), sketches = [], skTicks = [];
  const rr = rng(21);
  for (let i = 0; i < 20; i++) {
    const c = i % 5, r = Math.floor(i / 5), cx = 530 + c * 128, cy = 132 + r * 74;
    const g = G(bTw);
    const bx0 = cx - 44 + rr() * 10, bx1 = cx + 18 + rr() * 14, by = cy + 44, ax = cx - 34 + rr() * 60, ay = cy + 2 + rr() * 10;
    E('path', { d: `M${bx0.toFixed(1)},${by} L${bx1.toFixed(1)},${by} L${ax.toFixed(1)},${ay.toFixed(1)} Z M${bx1.toFixed(1)},${by} L${(bx1 + 30).toFixed(1)},${by}`, fill: 'none', stroke: INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
    const th = Math.atan2(by - ay, ax - bx1) * 180 / Math.PI;
    mkAngleMark(g, bx1, by, 0, th, { r: 14, col: OR, width: 3 }).set(1);
    sketches.push(g);
    const tk = tick(bTw, 9, GREEN); tr(tk, cx + 46, cy + 10); skTicks.push(tk);
  }
  const twRule = mkText(bTw, BX, 448, '**exterior angle** = the two **interior opposite** angles', { size: 26, anchor: 'middle', fill: INK, boldFill: BERRY });
  const twCount = mkText(bTw, BX, 488, 'measured: **20 triangles**', { size: 28, anchor: 'middle', fill: INK, boldFill: GREEN });

  // A: infinitely many
  const bInf = G(B), stream = [];
  for (let k = 0; k < 8; k++) {
    const s = Math.pow(0.72, k), x = 640 + 380 * (1 - Math.pow(0.72, k)), y = 270;
    const g = G(bInf); tr(g, x, y, s);
    E('path', { d: 'M-60,40 L60,40 L-10,-50 Z', fill: 'rgba(255,194,71,0.35)', stroke: INK, 'stroke-width': 4 / Math.max(0.3, s), 'stroke-linejoin': 'round' }, g);
    stream.push(g);
  }
  const inf = G(bInf); tr(inf, 1085, 270); infinity(inf, 0.8, BERRY);
  const infTxt = mkText(bInf, 880, 420, '**infinitely many** triangles', { size: 32, anchor: 'middle', fill: INK, boldFill: BERRY });
  const inf21 = mkText(bInf, 880, 470, 'number 21?', { size: 30, anchor: 'middle', fill: '#5A6670' });

  // B: the proof
  const bPr = G(B);
  const tA = [505, 250], tB = [715, 250], tT = [612, 118], tE = [830, 250];
  const triG = G(bPr);
  E('path', { d: mkPoly([tA, tB, tT]), fill: 'rgba(76,201,240,0.18)', stroke: INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, triG);
  E('path', { d: `M${tB[0]},${tB[1]} L${tE[0]},${tE[1]}`, stroke: INK, 'stroke-width': 5, 'stroke-dasharray': '12 8', 'stroke-linecap': 'round' }, triG);
  const mA = mkCorner(triG, tT, tA, tB, { r: 28, label: 'a', col: BLUE, size: 32, lr: 52 }); mA.set(1);
  const mB = mkCorner(triG, tA, tB, tT, { r: 28, label: 'b', col: BLUE, size: 32, lr: 50 }); mB.set(1);
  const mC = mkCorner(triG, tB, tT, tA, { r: 28, label: 'c', col: GREEN, size: 32, lr: 48 }); mC.set(1);
  const mD = mkCorner(triG, tB, tE, tT, { r: 34, label: 'd', col: OR, size: 32, lr: 58 }); mD.set(1);
  const head1 = mkText(bPr, 990, 160, 'Prove: {{d = a + b}}', { size: 32, anchor: 'middle', fill: INK });
  const head2 = mkText(bPr, 990, 212, 'for **every** triangle', { size: 30, anchor: 'middle', fill: INK, boldFill: BERRY });
  const tab = G(bPr);
  E('path', { d: 'M490,302 L1140,302 M770,272 L770,500', stroke: '#8FA3B8', 'stroke-width': 3 }, tab);
  T(tab, 505, 292, 'Statement', { size: 26, weight: 800, fill: BLUE });
  T(tab, 790, 292, 'Reason', { size: 26, weight: 800, fill: BLUE });
  const RY = [340, 385, 430, 476];
  const rows = [
    ['c + d = 180°', 'angles on a straight line', INK],
    ['a + b + c = 180°', 'angles in a triangle', INK],
    ['d = 180° − c = a + b', 'both equal {{180° − c}}', INK],
    ['d = a + b', 'for **every** triangle', GREEN],
  ].map(([m, r, col], i) => {
    const g = G(bPr);
    const st = mkMath(g, 505, RY[i], m, { size: 29, fill: col, weight: 700 });
    const rs = mkText(g, 790, RY[i], r, { size: 26, fill: i === 3 ? GREEN : '#2B6A4A', boldFill: BERRY });
    return { g, st, rs };
  });
  const qedBox = E('rect', { x: 497, y: RY[3] - 30, width: rows[3].st.w + 16, height: 40, rx: 8, fill: 'none', stroke: GREEN, 'stroke-width': 4 }, bPr);
  // the row highlight band
  const band = E('rect', { x: 490, y: 0, width: 650, height: 42, rx: 8, fill: 'rgba(255,212,59,0.35)' }, bPr);
  bPr.insertBefore(band, bPr.firstChild);

  // D: one counterexample
  const bCx = G(B);
  const cxChip = mkChip(bCx, 'disprove: **ONE counterexample**', { size: 30, col: GREEN, fill: '#E3F6EA', textCol: INK }); tr(cxChip, BX, 150);
  const claim = G(bCx);
  const claimT = mkText(claim, BX, 232, 'Claim: 4 equal sides {{⇒}} **square**', { size: 32, anchor: 'middle', fill: INK, boldFill: BERRY });
  const strikeL = E('path', { d: `M${BX - claimT.w / 2 - 8},${222} L${BX + claimT.w / 2 + 8},${222}`, stroke: RED, 'stroke-width': 5, 'stroke-linecap': 'round' }, claim);
  const claimX = cross(claim, 20, RED); tr(claimX, BX + claimT.w / 2 + 36, 222);
  const rh = G(bCx);
  const RC = [700, 388], RP = 112, RQ = 66;
  const rv = [[RC[0] - RP, RC[1]], [RC[0], RC[1] - RQ], [RC[0] + RP, RC[1]], [RC[0], RC[1] + RQ]];
  const rhOut = mkDash(E('path', { d: mkPoly(rv), fill: 'none', stroke: BERRY, 'stroke-width': 6, 'stroke-linejoin': 'round' }, rh));
  const rhTicks = G(rh); rv.forEach((v, i) => ticks(rhTicks, v, rv[(i + 1) % 4], 1, INK));
  const rhLab = G(rh);
  mkText(rhLab, 830, 290, '**rhombus**', { size: 32, fill: INK, boldFill: BERRY });
  mkText(rhLab, 830, 326, 'no right angles', { size: 26, fill: RED });
  const boards = [bTw, bInf, bPr, bCx];

  /* ================= HUD ================= */
  const cSun = pill(Lhud, 'Sunday: grouting day', { size: 30, color: GOLD, stroke: GOLD });
  const cProved = mkChip(Lhud, '**Proved!**', { size: 34, col: GOLD, solid: true });
  const card21 = G(Lhud);
  E('path', { d: 'M-62,40 L62,40 L-14,-56 Z', fill: '#FFFDF6', stroke: INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, card21);
  T(card21, -14, -66, '#21', { size: 26, weight: 800, anchor: 'middle', fill: BERRY });
  const pr21 = agProtractorProp(card21, 1); tr(pr21, 0, 44, 1.15, 0);
  const stOk = agStamp(Lhud, true);
  const phone = agPhone(Lhud, { speed: '2×' });

  /* ================= the cast ================= */
  const kav = cast(Lcast, 'kavya'), pri = cast(Lcast, 'priya'), tan = cast(Lcast, 'tan'), dad = cast(Lcast, 'dad'), boy = cast(Lcast, 'boy');
  const rex = cast(Lchar, 'rex');
  const parlel = cast(Lbrd, 'parlel');
  op(boy.tools.scissors, 0); op(boy.tools.broom, 1);
  const people = [kav, pri, tan, dad, boy];

  /* shots */
  const sB = at('letters') - 0.06, sD = at('counter') - 0.06;

  return t => {
    kit.upd(t);
    kit.clock(9 + Math.min(t, 70) / 3600);
    const shot = t < sB ? 'A' : t < sD ? 'B' : 'D';
    people.forEach(p => op(p, 0));
    const who = c => (c === kav ? 'kavya' : c.who);
    const put = (c, x, s, mood, look, extra) => { op(c, 1); tr(c, x, 440, s); c.set(Object.assign({ t, talk: scTalk(S, t, who(c)), mood, look }, extra || {})); };
    boards.forEach(b => op(b, 0));
    [cSun, cProved, card21, stOk, phone].forEach(e => op(e, 0));
    op(rex, 0); op(parlel, 0);

    /* ---------- A: sunday, twenty, inf, measure ---------- */
    if (shot === 'A') {
      const tanIn = t >= at('inf') - 0.2;
      let pm = 'happy', pl = 0.6;
      if (t >= at('twenty')) pm = 'smug';
      if (t >= at('inf')) { pm = t < mid('inf', 0.5) ? 'smug' : 'shock'; pl = 0.8; }
      if (t >= at('measure')) { pm = 'deadpan'; pl = 0.5; }
      put(pri, 140, 0.9, pm, pl);
      if (tanIn) {
        const up = P(t, at('inf') - 0.2, 0.35, easeOut);
        put(tan, 360, 0.88, t < at('measure') ? 'smug' : 'deadpan', -0.8);
        tr(tan, 360, lerp(640, 440, up), 0.88);
      }
      popIn(cSun, t, mid('sunday', 0.05), 260, 160);
      op(cSun, t < at('inf') ? 1 : 0);
      if (t < at('inf')) {
        op(bTw, 1);
        sketches.forEach((g, i) => op(g, P(t, at('sunday') + 0.2 + i * 0.1, 0.2, linear)));
        skTicks.forEach((g, i) => { const p = P(t, mid('twenty', 0.05) + i * 0.09, 0.25, pop); op(g, clamp(p * 2)); });
        fade(twRule, t, mid('twenty', 0.3)); fade(twCount, t, mid('twenty', 0.1));
        if (t >= at('twenty')) { cProved.set(P(t, mid('twenty', 0.84), 0.45, linear)); tr(cProved, 290, 250, 1, -6); }
      } else {
        op(bInf, 1);
        stream.forEach((g, i) => op(g, P(t, at('inf') + 0.1 + i * 0.18, 0.25, linear)));
        op(inf, P(t, mid('inf', 0.45), 0.3, linear)); tr(inf, 1085, 270, 1 + 0.06 * Math.sin(t * 4) * AMP);
        fade(infTxt, t, mid('inf', 0.3)); fade(inf21, t, mid('inf', 0.7));
        if (t >= at('measure')) {
          popIn(card21, t, at('measure') + 0.05, 265, 250, 1, -8 + 4 * Math.sin(t * 3));
          // Rex hops up, twitching at the protractor
          op(rex, 1);
          const up = P(t, at('measure') + 0.2, 0.35, pop);
          tr(rex, 532, lerp(560, 452, up), 0.55);
          rex.set({ t, mood: 'annoyed', look: -0.9, open: 90, twitch: 1 });
        }
      }
    }

    /* ---------- B: letters, s1, s2, qed, approved ---------- */
    if (shot === 'B') {
      let km = 'neutral', pm = 'neutral', tm = 'neutral';
      if (t >= at('s1')) tm = 'smug';
      if (t >= at('s2')) pm = 'happy';
      if (t >= at('qed')) { km = 'smug'; pm = 'happy'; }
      if (t >= at('approved')) { km = 'happy'; tm = 'happy'; }
      const sp = scWho(S, t), lookAt = x => (sp === 'kavya' ? 95 : sp === 'priya' ? 235 : sp === 'tan' ? 375 : 820) > x ? 0.8 : -0.8;
      put(kav, 95, 0.78, km, sp === 'kavya' || !sp ? 0.8 : lookAt(95));
      put(pri, 235, 0.78, pm, sp === 'priya' || !sp ? 0.8 : lookAt(235));
      put(tan, 375, 0.78, tm, sp === 'tan' || !sp ? 0.8 : lookAt(375));
      op(bPr, 1);
      op(triG, P(t, at('letters') + 0.1, 0.3, linear));
      [mA, mB, mC, mD].forEach((m, i) => m.set(P(t, mid('letters', 0.5 + i * 0.1), 0.35, linear)));
      const headOff = 1 - P(t, mid('approved', 0.25), 0.2, linear);
      op(head1, P(t, mid('letters', 0.1), 0.3, linear) * headOff); op(head2, P(t, mid('letters', 0.3), 0.3, linear) * headOff);
      op(tab, P(t, at('s1'), 0.3, linear));
      line(rows[0].st, t, mid('s1', 0.3)); line(rows[0].rs, t, mid('s1', 0.65));
      line(rows[1].st, t, mid('s2', 0.1)); line(rows[1].rs, t, mid('s2', 0.6));
      line(rows[2].st, t, mid('qed', 0.1)); line(rows[2].rs, t, mid('qed', 0.35));
      line(rows[3].st, t, mid('qed', 0.6)); line(rows[3].rs, t, mid('qed', 0.75));
      op(qedBox, P(t, mid('qed', 0.68), 0.3, linear));
      rows.forEach(r => op(r.g, 1));
      // highlight band on the row being said
      let bi = -1;
      if (t >= mid('s1', 0.2) && t < at('s2')) bi = 0; else if (t >= mid('s2', 0.05) && t < at('qed')) bi = 1;
      else if (t >= at('qed') && t < mid('qed', 0.58)) bi = 2; else if (t >= mid('qed', 0.58) && t < at('approved')) bi = 3;
      op(band, bi >= 0 ? 1 : 0); if (bi >= 0) attr(band, 'y', RY[bi] - 31);
      // the letters on the triangle light up with the row
      if (t >= at('approved')) {
        op(rex, 1);
        const up = P(t, at('approved') - 0.25, 0.35, pop);
        tr(rex, 375, lerp(600, 452, up), 0.6);
        rex.set({ t, talk: scTalk(S, t, 'rex'), mood: t < mid('approved', 0.6) ? 'deadpan' : 'smug', look: 0.9, open: 90 });
        stOk.set(P(t, mid('approved', 0.62), 0.35, linear)); tr(stOk, 990, 186, 0.55);
      }
    }

    /* ---------- D: counter, claim, rhombus, pun, rude ---------- */
    if (shot === 'D') {
      const pun = t >= at('pun');
      let bm = 'neutral', dm = 'neutral', tm = 'neutral';
      if (t >= at('claim')) { dm = t < at('rhombus') ? 'smug' : 'sad'; }
      if (t >= at('rhombus')) { bm = 'happy'; tm = 'smug'; }
      if (pun) { tm = 'smug'; bm = 'happy'; dm = 'deadpan'; }
      if (t >= at('rude')) tm = 'sad';
      put(boy, 95, 0.85, bm, t >= at('claim') && t < at('rhombus') ? 0.8 : 0.8, { lift: t >= at('rhombus') && t < end('rhombus') ? 1 : 0.3 });
      tr(boy, 92, 418, 0.85);
      put(dad, 235, 0.78, dm, t >= at('rhombus') && t < at('pun') ? -0.8 : 0.8, { lift: t >= at('claim') && t < at('rhombus') ? 1 : 0 });
      put(tan, 375, 0.78, tm, t >= at('claim') && t < at('pun') ? -0.8 : 0.8);
      // only Ah Boy laughs at the pun
      if (pun && t > end('pun') - 0.1) boy.set({ t, talk: 0.6 + 0.4 * Math.abs(Math.sin(t * 14)), mood: 'happy', look: 0.6, lift: 0.3 });
      op(bCx, 1);
      cxChip.set(P(t, mid('counter', 0.3), 0.45, linear));
      fade(claim, t, mid('claim', 0.2));
      const no = P(t, mid('rhombus', 0.62), 0.3, linear);
      mkDraw(strikeL, no); strikeL.setAttribute('pathLength', 1); strikeL.setAttribute('stroke-dasharray', '1 1');
      op(strikeL, no > 0 ? 1 : 0); op(claimX, P(t, mid('rhombus', 0.75), 0.2, linear));
      op(rh, t >= at('rhombus') ? 1 : 0);
      mkDraw(rhOut, P(t, at('rhombus') + 0.05, 0.7, ease));
      op(rhTicks, P(t, mid('rhombus', 0.35), 0.3, linear)); op(rhLab, P(t, mid('rhombus', 0.45), 0.3, linear));
      if (t >= at('claim') && t < at('rhombus')) {
        const p = popIn(phone, t, mid('claim', 0.62), 330, 250, 0.36, 6);
        tr(phone.speed, 0, 122, 1 + 0.12 * Math.max(0, Math.sin(t * 9)));
        op(phone, clamp(p * 2.5) * (1 - P(t, end('claim') - 0.1, 0.2, linear)));
      }
      // Para and Lel, in the corner of the board
      if (pun) {
        op(parlel, P(t, at('pun') + 0.1, 0.3, linear));
        const lean = 1 + 0.18 * P(t, mid('pun', 0.6), 0.3, pop);
        parlel.setAttribute('transform', `translate(970 410) scale(0.5 ${(0.5 * lean).toFixed(4)})`);
        const rude = t >= at('rude');
        parlel.set({ t, talk: scTalk(S, t, 'para'), talkB: scTalk(S, t, 'lel'), mood: t < mid('pun', 0.6) ? 'neutral' : rude ? 'deadpan' : 'shock', moodB: t < mid('pun', 0.6) ? 'neutral' : rude ? 'annoyed' : 'shock', look: -0.6, lookB: -0.6 });
      }
    }
  };
});
