/* Scene 8: Sports Day saves you some marks.
   Shots: "6 EXAM TRAPS" over the dimmed stadium, the trap-setters lined up with their numbers -> six snappy confessionals,
   one trap card each (the Decider: 2 d.p. means 3.00, flag UP; Sig: 48 650 to 2 s.f. is 49 000, not 49, glasses down;
   Priya: shift both, 6 ÷ 0.4 = 60 ÷ 4 = 15, sheepish; the Decider: TWEET!, no double rounding, 1.2349 -> 1.23; Rita:
   simplify first, 9/12 = 3/4 = 0.75, "Terminates" x3 trailing off her; Dad: estimate first, the stopwatch with a "?") ->
   logo "WHAT'S THE POINT? will return" -> stinger: 4.30 p.m., the parents' race, Mum crosses the line -> the scoreboard
   reads MUM 172.5 s; Mum glares -> Dot salutes and hops one place left: 17.25 s -> Kavya: "He never does that for me",
   Priya nods -> Dot: "...Point taken." POINT TAKEN; slow push in on Dot, tiny and terrified in his gap; Mum smug. */
scene('traps', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;
  const talk = (t, who) => scTalk(S, t, who);

  /* ---------- helpers ---------- */
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); return p; };
  const outline = (el, col, w) => { el.setAttribute('stroke', col); el.setAttribute('stroke-width', w); el.setAttribute('paint-order', 'stroke'); el.setAttribute('stroke-linejoin', 'round'); return el; };
  const view = (el, k, fx, fy, sx, sy) => el.setAttribute('transform', `translate(${sx.toFixed(1)} ${sy.toFixed(1)}) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const GOLD = '#FFE45C', INK = MK.ink, GREEN = '#1E9E5A', RED = '#C62828', BLUE = '#1E5FC0', AMBER = DR_LED, GREY = '#5A4A52';
  const CX = 880;
  function trCard(parent, n) {
    const g = G(parent);
    E('rect', { x: 606, y: 136, width: 560, height: 470, rx: 18, fill: 'rgba(0,0,0,0.3)' }, g);
    E('rect', { x: 600, y: 130, width: 560, height: 470, rx: 18, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, g);
    const head = chip(g, 'TRAP ' + n, { size: 30, fill: '#D32F2F', color: '#FFFFFF', weight: 800 }); tr(head, CX, 182);
    return g;
  }
  const txt = (parent, y, s, o) => mkText(parent, CX, y, s, Object.assign({ size: 34, anchor: 'middle', fill: INK }, o || {}));
  const fadeIn = (el, t, t0) => { const p = P(t, t0, 0.3, easeOut); op(el, p); tr(el, 0, 10 * (1 - p)); };
  function trNo(parent, y, s, o) {
    const g = G(parent), m = txt(g, y, s, Object.assign({ fill: RED }, o || {}));
    const sl = strike(g, CX - m.w / 2 - 10, y - 12, CX + m.w / 2 + 10, RED);
    g.set = p => sl.set(p);
    return g;
  }

  /* ---------- layers ---------- */
  const Lbg = G(root), Lboard = G(root), Lcast = G(root), Lfront = G(root), Lfg = G(root), Lhud = G(root);

  /* ---------- sets ---------- */
  const stadShot = G(Lbg);
  const stad = drStadium(stadShot);
  const dim = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#06111F', opacity: 0.55 }, stadShot);
  const podium = G(Lfront);
  E('rect', { x: 0, y: 548, width: 1200, height: 202, fill: linGrad('#1E4FA8', '#0E2A5A', true), stroke: '#0A1A3A', 'stroke-width': 4 }, podium);
  const conf = drConf(Lbg, 'ref');
  const TINT = {}; for (const k in DR_TINT) TINT[k] = linGrad(DR_TINT[k][0], DR_TINT[k][1], true);
  const logoBg = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#0E2A5A', '#2E6FD8', true) }, logoBg);
  let rays = '';
  for (let i = 0; i < 16; i++) { const a0 = i / 16 * TAU, a1 = a0 + TAU / 40; rays += `M0,0 L${(Math.cos(a0) * 1100).toFixed(0)},${(Math.sin(a0) * 1100).toFixed(0)} L${(Math.cos(a1) * 1100).toFixed(0)},${(Math.sin(a1) * 1100).toFixed(0)} Z `; }
  const rayP = E('path', { d: rays, fill: GOLD, opacity: 0.08 }, logoBg);
  E('ellipse', { cx: 600, cy: 610, rx: 620, ry: 170, fill: glow(AMBER), opacity: 0.3 }, logoBg);
  const trackShot = G(Lbg);
  const track = scTrack(trackShot);
  const finish = G(trackShot);
  E('rect', { x: 846, y: 420, width: 12, height: 330, fill: '#FFFFFF', stroke: '#5A6670', 'stroke-width': 2 }, finish);
  const tapeL = E('path', { d: '', fill: 'none', stroke: '#E8424F', 'stroke-width': 6 }, finish);
  const tapeR = E('path', { d: '', fill: 'none', stroke: '#E8424F', 'stroke-width': 6 }, finish);
  let fl = '';
  for (let r = 0; r < 11; r++) fl += `M852,${460 + r * 26} l0,13 `;
  E('path', { d: fl, stroke: '#2A1A22', 'stroke-width': 12 }, finish);
  const boardShot = G(Lbg), boardWrap = G(boardShot);
  E('rect', { x: -400, y: -300, width: 2000, height: 1350, fill: linGrad('#7FD3FF', '#D6F0FF', true) }, boardWrap);
  E('rect', { x: -400, y: 600, width: 2000, height: 500, fill: '#5BBF6A' }, boardWrap);
  const BX = 520, BY = 300;
  const boardG = G(boardWrap); tr(boardG, BX, BY);
  const board = drScoreboard(boardG, { w: 760, h: 330, size: 110, title: "PARENTS' RACE", rows: [['MUM', '1725', 3, 's']] });
  const ptStage = k => { const p = board.ptXY(0, k, 4); return [BX + p[0], BY + p[1]]; };
  const P3 = ptStage(3), P2 = ptStage(2);
  const DOT_S = 0.14;

  /* ===== intro ===== */
  const sI = G(Lhud);
  const iHead = outline(T(sI, 600, 236, '6 EXAM TRAPS', { size: 80, weight: 800, anchor: 'middle', fill: GOLD, ls: 3 }), '#3A2A07', 10);
  const iSub = outline(T(sI, 600, 292, 'Sports Day saves you some marks', { size: 36, weight: 700, anchor: 'middle', fill: '#FFFFFF' }), '#06111F', 7);
  const ROWX = [180, 390, 600, 810, 1020];
  const badges = ['1 & 4', '2', '3', '5', '6'].map(s => chip(sI, s, { size: 32, fill: GOLD, color: SC_INK, stroke: SC_INK, sw: 3, weight: 800 }));

  /* ===== trap cards ===== */
  // 1 the Decider
  const c1 = trCard(Lfg, 1);
  const c1a = txt(c1, 262, 'Asked for **2 decimal places**?', { size: 36, boldFill: BLUE });
  const c1b = txt(c1, 352, '{{2.996 → 3.00}}', { size: 56, fill: GREEN, weight: 800 });
  const c1c = trNo(c1, 438, 'not {{3}}', { size: 44 });
  const c1d = txt(c1, 530, 'the zeros **show** 2 d.p.', { size: 32, fill: GREY, boldFill: GREEN });
  // 2 Sig
  const c2 = trCard(Lfg, 2);
  const c2a = txt(c2, 262, '**Keep the size!**', { size: 40, boldFill: '#6A3FB8' });
  const c2b = txt(c2, 334, '{{"48 650"}} to **2 s.f.**', { size: 36, boldFill: '#6A3FB8' });
  const c2c = txt(c2, 422, '{{= "49 000"}}', { size: 56, fill: GREEN, weight: 800 });
  const c2d = trNo(c2, 508, 'not {{49}}', { size: 44 });
  const c2e = txt(c2, 570, 'zeros hold the place', { size: 30, fill: GREY });
  // 3 Priya
  const c3 = trCard(Lfg, 3);
  const c3a = txt(c3, 262, 'Shift **both** points', { size: 40, boldFill: RED });
  const c3b = txt(c3, 350, '{{6 ÷ 0.4 = 60 ÷ 4 = 15}}', { size: 44, fill: GREEN, weight: 800 });
  const c3c = txt(c3, 418, '(× 10 for **both** numbers)', { size: 30, fill: GREY, boldFill: GREEN });
  const c3d = trNo(c3, 500, '{{6 ÷ 4 = 1.5}}', { size: 40 });
  const c3e = txt(c3, 566, 'Ask me how I know.', { size: 28, fill: GREY });
  // 4 the Decider again
  const c4 = trCard(Lfg, 4);
  const c4a = txt(c4, 262, 'No **double rounding**', { size: 40, boldFill: RED });
  const c4b = txt(c4, 344, '{{1.2349}} to **2 d.p.**', { size: 36, boldFill: BLUE });
  const c4c = txt(c4, 428, '{{1.23|49 → 1.23}}', { size: 50, fill: GREEN, weight: 800 });
  const c4d = trNo(c4, 500, '{{1.2349 → 1.235 → 1.24}}', { size: 34 });
  const c4e = txt(c4, 566, 'round the **original**, **once**', { size: 30, fill: GREY, boldFill: GREEN });
  // 5 Rita
  const c5 = trCard(Lfg, 5);
  const c5a = txt(c5, 262, '**Simplify first**', { size: 42, boldFill: GREEN });
  const c5b = txt(c5, 370, '{{9/12 = 3/4 = 0.75}}', { size: 48, fill: GREEN, weight: 800 });
  const c5c = txt(c5, 470, '{{4 = 2 × 2}}: only 2s', { size: 34 });
  const c5d = txt(c5, 548, '**terminates**', { size: 36, boldFill: GREEN });
  const termW = [0, 1, 2].map(() => outline(T(Lfg, 0, 0, 'Terminates.', { size: 34, weight: 800, anchor: 'middle', fill: '#8FE3A8' }), '#123018', 7));
  // 6 Dad
  const c6 = trCard(Lfg, 6);
  const c6a = txt(c6, 262, '**Estimate** before you', { size: 38, boldFill: BLUE });
  const c6b = txt(c6, 312, 'trust any answer', { size: 38 });
  const c6w = drStopwatch(c6, { text: '1.472', s: 0.85 }); tr(c6w, 800, 452);
  const c6q = outline(T(c6, 980, 486, '?', { size: 140, weight: 800, anchor: 'middle', fill: RED }), '#FFFFFF', 8);

  /* ===== logo ===== */
  const sR = G(Lhud);
  const logo = G(sR);
  const logo1 = outline(T(logo, 0, -70, "WHAT'S THE", { size: 60, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 6 }), '#0A1A3A', 12);
  const logo2 = outline(T(logo, -20, 26, 'POINT?', { size: 110, weight: 800, anchor: 'middle', fill: AMBER, ls: 2 }), '#0A1A3A', 12);
  const logoDot = G(logo);
  E('circle', { r: 30, fill: glow(AMBER), opacity: 0.8 }, logoDot);
  E('circle', { r: 17, fill: ball('#FFE07A', '#E07A10'), stroke: '#0A1A3A', 'stroke-width': 4 }, logoDot);
  const rSub = T(sR, 600, 440, 'will return', { size: 46, weight: 600, anchor: 'middle', fill: '#FFFFFF' });

  /* ===== stinger ===== */
  const cRace = mkChip(Lfg, "**4.30 p.m.** · PARENTS' RACE", { size: 34, col: GOLD });
  const stampOk = drStamp(Lfg, true);
  const cAuntie = mkChip(Lfg, '{{172.5 → 17.25}}', { size: 34, col: '#8FE3A8' });

  /* ---------- the cast ---------- */
  const ref = cast(Lcast, 'ref'), sig = cast(Lcast, 'sig'), priya = cast(Lcast, 'priya'), dad = cast(Lcast, 'dad');
  const ritaW = G(Lcast), ritaF = G(ritaW); ritaF.setAttribute('transform', 'scale(-1 1)');
  const rita = cast(ritaF, 'rita');
  const perch = drPerch(ritaW, 200); tr(perch, 0, 118);
  const mum = cast(Lcast, 'mum', { prop: null });
  const mumRun = cast(Lcast, 'mum', { body: true });
  const kav = cast(Lcast, 'kavya');
  const dot = cast(boardWrap, 'dot');
  const tweet = drTweet(Lfg);

  /* ---------- shots ---------- */
  const cut = id => at(id) - 0.06;
  const SHOTS = [['I', -9], ['1', cut('t1')], ['2', cut('t2')], ['3', cut('t3')], ['4', cut('t4')], ['5', cut('t5')], ['6', cut('t6')],
    ['R', cut('return')], ['W', cut('relay')], ['B', cut('mum')]];
  const shotAt = t => { let s = 'I'; for (const [k, t0] of SHOTS) if (t >= t0) s = k; return s; };
  const CARDS = { 1: c1, 2: c2, 3: c3, 4: c4, 5: c5, 6: c6 };
  const CONF = { 1: 'ref', 2: 'sig', 3: 'priya', 4: 'ref', 5: 'rita', 6: 'dad' };
  const tHop = mid('yes', 0.55);

  return t => {
    const sh = shotAt(t);
    op(stadShot, sh === 'I' ? 1 : 0); op(podium, sh === 'I' ? 1 : 0); if (sh === 'I') stad.upd(t);
    op(logoBg, sh === 'R' ? 1 : 0); op(sI, sh === 'I' ? 1 : 0); op(sR, sh === 'R' ? 1 : 0);
    op(trackShot, sh === 'W' ? 1 : 0); op(boardShot, sh === 'B' ? 1 : 0);
    for (const k in CARDS) op(CARDS[k], sh === k ? 1 : 0);
    const cw = CONF[sh];
    conf.set(cw ? 1 : 0, t); if (cw) conf.firstChild.setAttribute('fill', TINT[cw]);
    [ref, sig, priya, dad, ritaW, mum, mumRun, kav, dot].forEach(e => op(e, 0));
    termW.forEach(e => op(e, 0)); tweet.set(0); cRace.set(0); stampOk.set(0); cAuntie.set(0);
    const show = (c, x, y, s, st) => { op(c, 1); tr(c, x, y, s); if (c.set) c.set(Object.assign({ t }, st)); };

    if (sh === 'I') {
      const hp = P(t, at('intro') + 0.05, 0.45, pop);
      op(iHead, clamp(hp * 2.5)); iHead.setAttribute('transform', `translate(600 210) scale(${Math.max(0.01, 0.6 + 0.4 * hp).toFixed(3)}) translate(-600 -210)`);
      op(iSub, P(t, mid('intro', 0.3), 0.4, linear));
      const ROW = [[ref, 0.62, 462, 'deadpan'], [sig, 0.5, 482, 'deadpan'], [priya, 0.72, 470, 'smug'], [ritaW, 0.5, 430, 'happy'], [dad, 0.66, 462, 'smug']];
      ROW.forEach(([c, s, y, mood], i) => {
        const p = P(t, mid('intro', 0.35) + i * 0.13, 0.45, pop);
        op(c, clamp(p * 3)); tr(c, ROWX[i], y + 40 * (1 - clamp(p)), Math.max(0.01, s * (0.7 + 0.3 * p)));
        if (c === ritaW) { rita.set({ t, mood, look: 0 }); op(perch, 0); }
        else c.set({ t, mood, look: 0 });
        popIn(badges[i], t, mid('intro', 0.4) + i * 0.13, ROWX[i], 630);
      });
      op(dad.watch, 1);
    } else if (cw) {
      const L = 't' + sh;
      if (sh === '1') {
        const up = t > mid('t1', 0.4);
        show(ref, 320, 590, 1.3, { talk: talk(t, 'ref'), mood: 'deadpan', look: 0.4, flag: up ? 1 : 0 });
        fadeIn(c1a, t, at('t1') + 0.1); fadeIn(c1b, t, mid('t1', 0.35)); fadeIn(c1c, t, mid('t1', 0.62)); c1c.set(P(t, mid('t1', 0.72), 0.3, linear)); fadeIn(c1d, t, mid('t1', 0.82));
      } else if (sh === '2') {
        show(sig, 330, 560, 1.15, { talk: talk(t, 'sig'), mood: t > mid('t2', 0.72) ? 'annoyed' : 'deadpan', look: 0.4, glasses: t > mid('t2', 0.72) && t < mid('t2', 0.95) ? 0 : 1 });
        fadeIn(c2a, t, at('t2') + 0.1); fadeIn(c2b, t, mid('t2', 0.2)); fadeIn(c2c, t, mid('t2', 0.5)); fadeIn(c2d, t, mid('t2', 0.72)); c2d.set(P(t, mid('t2', 0.8), 0.3, linear)); fadeIn(c2e, t, mid('t2', 0.86));
      } else if (sh === '3') {
        const how = mid('t3', 0.7);
        show(priya, 320, 590, 1.4, { talk: talk(t, 'priya'), mood: t > how ? 'sad' : 'neutral', look: t > how ? -0.5 : 0.4 });
        fadeIn(c3a, t, at('t3') + 0.1); fadeIn(c3b, t, mid('t3', 0.2)); fadeIn(c3c, t, mid('t3', 0.35)); fadeIn(c3d, t, mid('t3', 0.5)); c3d.set(P(t, mid('t3', 0.6), 0.3, linear)); fadeIn(c3e, t, how);
      } else if (sh === '4') {
        const wh = t < at('t4') + 0.55;
        show(ref, 320, 590, 1.3, { talk: wh ? 0 : talk(t, 'ref'), mood: 'deadpan', look: 0.4, whistle: wh ? 1 : 0 });
        tweet.set(wh ? P(t, cut('t4'), 0.25, linear) : 0); tr(tweet, 520, 230);
        fadeIn(c4a, t, at('t4') + 0.1); fadeIn(c4b, t, mid('t4', 0.25)); fadeIn(c4c, t, mid('t4', 0.4)); fadeIn(c4d, t, mid('t4', 0.55)); c4d.set(P(t, mid('t4', 0.65), 0.3, linear)); fadeIn(c4e, t, mid('t4', 0.75));
      } else if (sh === '5') {
        op(ritaW, 1); tr(ritaW, 390, 400, 1.2); op(perch, 1);
        rita.set({ t, talk: talk(t, 'rita'), mood: 'happy', look: -0.3, flap: talk(t, 'rita') > 0 ? 1 : 0 });
        fadeIn(c5a, t, at('t5') + 0.1); fadeIn(c5b, t, mid('t5', 0.25)); fadeIn(c5c, t, mid('t5', 0.45)); fadeIn(c5d, t, mid('t5', 0.55));
        termW.forEach((w, i) => {
          const t0 = mid('t5', 0.55 + i * 0.13), u = clamp((t - t0) / 2.2);
          if (t < t0) return;
          op(w, clamp(u * 6) * (1 - u));
          w.setAttribute('x', (225 - 70 * u).toFixed(1)); w.setAttribute('y', (330 - 160 * u).toFixed(1));
          w.setAttribute('font-size', (34 + 8 * u).toFixed(1));
        });
      } else if (sh === '6') {
        const esp = mid('t6', 0.55);
        show(dad, 320, 590, 1.4, { talk: talk(t, 'dad'), mood: t > esp ? 'deadpan' : 'smug', look: t > esp ? 0.2 : 0.4, lift: t > esp ? 1 : 0 });
        if (dad.watch) dad.watch.set('1.472');
        fadeIn(c6a, t, at('t6') + 0.1); fadeIn(c6b, t, mid('t6', 0.2));
        op(c6w, P(t, esp - 0.1, 0.25, linear)); const qp = P(t, esp + 0.2, 0.4, pop); op(c6q, clamp(qp * 3)); c6q.setAttribute('transform', `translate(980 440) scale(${Math.max(0.01, 0.5 + 0.5 * qp).toFixed(3)}) translate(-980 -440)`);
      }
    } else if (sh === 'R') {
      tr(rayP, 600, 600, 1, (t * 6 * AMP) % 360);
      popIn(logo, t, at('return') + 0.05, 600, 280);
      tr(logoDot, 196, 8 - Math.abs(Math.sin(t * 3.2)) * 26 * AMP);
      op(rSub, P(t, mid('return', 0.45), 0.4, linear));
    } else if (sh === 'W') {
      // the parents' race: Mum sprints through the tape
      const r0 = at('relay') + 0.1, x = lerp(-120, 1340, P(t, r0, 2.4, linear));
      track.upd(t, 700);
      show(mumRun, x, 712, 1.55);
      mumRun.pose(runPose(t, 3));
      const snapped = x > 850;
      attr(tapeL, 'd', snapped ? `M852,560 Q${830 - 20},${600} 800,640` : `M852,560 L${Math.min(x, 852)},560`);
      attr(tapeR, 'd', snapped ? 'M852,560 Q880,600 900,640' : '');
      op(tapeR, snapped ? 1 : 0);
      if (!snapped) attr(tapeL, 'd', 'M852,560 L1200,560');
      cRace.set(P(t, at('relay'), 0.35, linear)); tr(cRace, 620, 200);
    } else {
      /* ---------- B: the scoreboard ---------- */
      const hopped = t >= tHop;
      board.row(0, '1725', hopped ? 2 : 3, 'MUM');
      op(board.pt[0], 0);
      // push in on Dot in the last line
      const z = P(t, at('taken') - 0.2, 2.2, ease), zoom = lerp(1, 2.6, z);
      view(boardWrap, zoom, lerp(600, P2[0], z), lerp(375, P2[1], z), lerp(600, 560, z), lerp(375, 290, z));
      op(dot, 1);
      let dx = P3[0], dy = P3[1];
      if (hopped) { const h = P(t, tHop, 0.45, ease); dx = lerp(P3[0], P2[0], h); dy = P3[1] - Math.sin(h * Math.PI) * 60; }
      tr(dot, dx, dy, DOT_S);
      const salute = t >= at('yes') && t < tHop;
      dot.set({ t, talk: talk(t, 'dot'), mood: t < at('yes') ? 'smug' : salute ? 'shock' : t >= at('taken') ? (t > mid('taken', 0.75) ? 'shock' : 'deadpan') : 'happy', look: t >= at('taken') ? 0 : 0.6, arms: salute ? 1 : 0, still: t >= end('taken') });
      // Mum glares (smug once it's fixed)
      const fixed = t > tHop + 0.5;
      show(mum, 1040, 620, 1.12, { talk: talk(t, 'mum'), mood: fixed ? 'smug' : 'annoyed', look: -0.9 });
      cAuntie.set(t >= tHop + 0.4 && t < at('never') ? P(t, tHop + 0.4, 0.35, linear) : 0); tr(cAuntie, 520, 560);
      // Kavya and Priya pop up for "never"
      if (t >= at('never') - 0.25 && t < at('taken') - 0.2) {
        const up = P(t, at('never') - 0.25, 0.35, pop);
        show(kav, 200, lerp(820, 640, up), 1.0, { talk: talk(t, 'kavya'), mood: 'annoyed', look: 0.7 });
        show(priya, 410, lerp(830, 650, up) + Math.abs(Math.sin(t * 6)) * 10 * AMP, 1.0, { mood: 'deadpan', look: -0.6 });
      }
      if (t >= at('taken')) { stampOk.set(P(t, mid('taken', 0.75), 0.3, linear)); tr(stampOk, 520, 560, 0.72); }
    }
  };
});
