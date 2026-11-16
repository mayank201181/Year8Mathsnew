/* Scene 0: Cold open (no chapter card).
   Shots (hard sitcom cuts):
   A  kavya    the stadium at 8 a.m., slow push towards the scoreboard; Kavya foreground left; chips; lower third.
   B  pa       the announcer's box: Mr Tan on the microphone (lower third), chip "GIRLS' 100 m · HEAT 1".
   C  priya    the track: Priya (lower third) at the start; in the pause BANG! and she sprints across (full body).
   D  record   the scoreboard close up: PRIYA 1.472 s; Priya celebrates with her phone; "WORLD RECORD?!"
      cheetah  Ah Boy in his blue tiger ears pops up (lower third).
   F  stop     the Blue House tent: Dad (lower third) raises his stopwatch: 14.72; "Trust the stopwatch."
      digits   Kavya joins: scoreboard 1.472 vs stopwatch 14.72, same digits, the point circled.
   H  tiny     documentary zoom into the scoreboard's point, which turns out to have a face.
   I  hi       Dot's confessional (lower third, plaque).
      slide    a board: 14.72 with an LED point; the point slides one place left: 1.472, "÷ 10".
   K  break    the scoreboard, four seconds earlier: no point; Dot runs in and hops into the wrong gap.
      photo    Priya photographs it; in the pause Dot hops to the right gap (14.72) and MISSING THE POINT thumps.
   L  title    "WHAT'S THE POINT?" title card, the cast pops in. */
scene('cold', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);          // hard sitcom cut
  const view = (el, k, fx, fy, sx, sy) => el.setAttribute('transform', `translate(${sx.toFixed(1)} ${sy.toFixed(1)}) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const popIn = (el, t, t0, x, y, s, r) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p)), r); };
  const pill = (parent, text, o) => { o = o || {}; return chip(parent, text, { size: o.size || 30, fill: o.fill || 'rgba(10,27,39,0.9)', stroke: o.stroke || C.line, sw: 2, color: o.color || C.ink, weight: 700 }); };
  const GOLD = '#FFE45C', AMBER = DR_LED, BLUE = DR_BLUE, RED = '#E8424F';
  const outline = (el, col, w) => { el.setAttribute('stroke', col); el.setAttribute('stroke-width', w); el.setAttribute('paint-order', 'stroke'); el.setAttribute('stroke-linejoin', 'round'); };

  /* layers: sets, characters behind tables, tables, foreground, HUD */
  const Lbg = G(root), Lcast = G(root), Lfront = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= A: the stadium, 8 a.m. ================= */
  const stadShot = G(Lbg), stadWrap = G(stadShot);
  const stad = drStadium(stadWrap);
  const aChips = G(Lfg);
  const cKav = pill(aChips, 'Kavya, age 12', { size: 32 });
  const cFri = pill(aChips, 'Friday, 8 a.m.', { size: 30, color: GOLD, stroke: GOLD });
  const cSD = pill(aChips, 'SPORTS DAY', { size: 30, color: '#9CC8FF', stroke: '#9CC8FF' });

  /* ================= B: the announcer's box ================= */
  const boothShot = G(Lbg);
  const booth = drBooth(boothShot);
  const boothFront = G(Lfront); boothFront.appendChild(booth.front); boothFront.appendChild(booth.top);
  const cHeat = pill(Lfg, "GIRLS' 100 m · HEAT 1", { size: 32, color: GOLD, stroke: GOLD });

  /* ================= C: the track ================= */
  const trackShot = G(Lbg);
  const track = scTrack(trackShot);
  const bang = G(Lfg);
  let bd = '';
  for (let i = 0; i < 14; i++) { const a = i / 14 * TAU, rr = i % 2 ? 54 : 92; bd += (i ? ' L' : 'M') + (Math.cos(a) * rr * 1.4).toFixed(1) + ',' + (Math.sin(a) * rr).toFixed(1); }
  E('path', { d: bd + ' Z', fill: GOLD, stroke: SC_INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, bang);
  T(bang, 0, 18, 'BANG!', { size: 52, weight: 800, anchor: 'middle', fill: RED });
  const speed = G(Lfg);
  for (let i = 0; i < 6; i++) E('line', { x1: 0, y1: -150 + i * 26, x2: 180 + (i % 3) * 50, y2: -150 + i * 26, stroke: '#FFFFFF', 'stroke-width': 6, 'stroke-linecap': 'round', opacity: 0.8 }, speed);

  /* ================= D, H, K: the scoreboard close up ================= */
  const boardShot = G(Lbg), boardWrap = G(boardShot);
  E('rect', { x: -400, y: -300, width: 2000, height: 1350, fill: linGrad('#7FD3FF', '#D6F0FF', true) }, boardWrap);
  E('rect', { x: -400, y: 560, width: 2000, height: 500, fill: '#5BBF6A' }, boardWrap);
  const BX = 600, BY = 320;
  const boardG = G(boardWrap); tr(boardG, BX, BY);
  const board = drScoreboard(boardG, { w: 820, h: 360, size: 120, title: "GIRLS' 100 m", rows: [['PRIYA', '1472', 1, 's']] });
  const ptStage = k => { const p = board.ptXY(0, k, 4); return [BX + p[0], BY + p[1]]; };
  const dotSmall = G(boardWrap);                       // Dot, living in the scoreboard (stage coords inside boardWrap)
  const cWR = pill(Lfg, 'WORLD RECORD?!', { size: 40, color: GOLD, stroke: GOLD });
  const cCheetah = mkThoughtBubble(Lfg, 'faster than a **cheetah**?', { size: 32, tail: 'left' });
  const finder = G(Lhud);
  E('path', { d: 'M40,140 L40,40 L140,40 M1060,40 L1160,40 L1160,140 M1160,610 L1160,710 L1060,710 M140,710 L40,710 L40,610', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 5, opacity: 0.8 }, finder);
  const zoomTxt = T(finder, 1130, 680, 'ZOOM ×1', { size: 30, weight: 700, anchor: 'end', fill: '#FFFFFF' });
  const earlier = pill(Lfg, 'FOUR SECONDS EARLIER', { size: 30, color: '#FF8A8A', stroke: '#FF8A8A' });
  const wrongGap = G(Lfg);
  const wgA = arrow(wrongGap, 0, 120, 0, 30, { color: RED, width: 7 });
  const wgC = pill(wrongGap, 'the wrong gap!', { size: 32, color: '#FF8A8A', stroke: '#FF8A8A' }); tr(wgC, 0, 158);
  const stamp = drStamp(Lfg, false);

  /* ================= F, G: the Blue House tent ================= */
  const tentShot = G(Lbg);
  const tent = drTent(tentShot);
  const tentFront = G(Lfront); tentFront.appendChild(tent.front); tentFront.appendChild(tent.top);
  const bigWatch = drStopwatch(tent.top, { text: '14.72', s: 1.35 });
  const cTrust = pill(Lfg, 'Trust the stopwatch.', { size: 32, color: GOLD, stroke: GOLD });
  // digits: the scoreboard's reading against the stopwatch's
  const cmp = G(Lfg);
  E('rect', { x: -300, y: -150, width: 600, height: 300, rx: 22, fill: 'rgba(10,15,20,0.92)', stroke: AMBER, 'stroke-width': 4 }, cmp);
  T(cmp, -270, -78, 'scoreboard', { size: 30, weight: 700, fill: '#C9D3DC', font: FB });
  T(cmp, -270, 62, 'stopwatch', { size: 30, weight: 700, fill: '#C9D3DC', font: FB });
  const cellX = k => 10 + k * 70;
  const rowDigits = (y, ptAfter) => {
    '1472'.split('').forEach((d, k) => T(cmp, cellX(k), y, d, { size: 76, weight: 700, anchor: 'middle', fill: AMBER }));
    E('circle', { cx: cellX(ptAfter) - 35, cy: y - 8, r: 8, fill: AMBER }, cmp);
    return cellX(ptAfter) - 35;
  };
  const px1 = rowDigits(-56, 1), px2 = rowDigits(84, 2);
  const ring1 = E('circle', { cx: px1, cy: -64, r: 17, fill: 'none', stroke: RED, 'stroke-width': 6 }, cmp);
  const ring2 = E('circle', { cx: px2, cy: 76, r: 17, fill: 'none', stroke: '#56D69B', 'stroke-width': 6 }, cmp);
  const sameT = T(cmp, 0, 136, 'same digits, different point', { size: 28, weight: 700, anchor: 'middle', fill: GOLD });

  /* ================= I, J: Dot's confessional ================= */
  const conf = drConf(Lbg, 'dot');
  const plaque = G(Lfg);
  E('rect', { x: -250, y: -150, width: 500, height: 300, rx: 18, fill: '#1E1404', stroke: AMBER, 'stroke-width': 5 }, plaque);
  T(plaque, 0, -88, 'THE DECIMAL POINT', { size: 38, weight: 800, anchor: 'middle', fill: AMBER, ls: 2 });
  E('circle', { cx: 0, cy: -6, r: 34, fill: ball('#FFE07A', '#E07A10'), stroke: '#FFFFFF', 'stroke-width': 3 }, plaque);
  T(plaque, 0, 76, 'small · round', { size: 30, weight: 700, anchor: 'middle', fill: '#FFE9B8', font: FB });
  T(plaque, 0, 118, '× 10 more important', { size: 32, weight: 800, anchor: 'middle', fill: GOLD });
  // the slide board
  const sb = G(Lfg);
  E('rect', { x: -310, y: -210, width: 620, height: 420, rx: 20, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, sb);
  const heads = ['tens', 'ones', 'tenths', 'hundredths', 'thousandths'];
  const sx = k => -200 + k * 100;           // digit column centres for 14.72 (k = 0..3) and the extra column
  const sbDig = '1472'.split('').map((d, k) => T(sb, sx(k), 10, d, { size: 110, weight: 700, anchor: 'middle', fill: MK.ink }));
  const sbPt = E('circle', { cx: sx(1) + 50, cy: -6, r: 14, fill: AMBER, stroke: '#B85F00', 'stroke-width': 3 }, sb);
  const sbVal = mkMath(sb, 0, -120, '14.72', { size: 64, fill: MK.ink, anchor: 'middle' });
  const sbVal2 = mkMath(sb, 0, -120, '1.472', { size: 64, fill: '#C62828', anchor: 'middle' });
  const sbArrow = G(sb);
  arrow(sbArrow, sx(1) + 50, 70, sx(0) + 50, 70, { color: '#C62828', width: 6, bend: -30 });
  const sbRule = mkText(sb, 0, 168, 'one place left: **÷ 10**', { size: 38, anchor: 'middle', fill: MK.ink, boldFill: '#C62828' });
  const sbLabels = G(sb);
  heads.slice(0, 4).forEach((h, k) => T(sbLabels, sx(k), -54, h, { size: 20, weight: 700, anchor: 'middle', fill: '#5A6670', font: FB }));

  /* ================= L: title card ================= */
  const titleShot = G(Lbg);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#0E2A5A', '#2E6FD8', true) }, titleShot);
  let rays = '';
  for (let i = 0; i < 16; i++) { const a0 = i / 16 * TAU, a1 = a0 + TAU / 40; rays += `M0,0 L${(Math.cos(a0) * 1100).toFixed(0)},${(Math.sin(a0) * 1100).toFixed(0)} L${(Math.cos(a1) * 1100).toFixed(0)},${(Math.sin(a1) * 1100).toFixed(0)} Z `; }
  const rayP = E('path', { d: rays, fill: GOLD, opacity: 0.08 }, titleShot);
  E('ellipse', { cx: 600, cy: 610, rx: 620, ry: 170, fill: glow(AMBER), opacity: 0.3 }, titleShot);
  const logo = G(Lfg);
  const logo1 = T(logo, 0, -70, "WHAT'S THE", { size: 60, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 6 });
  const logo2 = T(logo, -20, 26, 'POINT?', { size: 110, weight: 800, anchor: 'middle', fill: AMBER, ls: 2 });
  [logo1, logo2].forEach(w => outline(w, '#0A1A3A', 12));
  const logoDot = G(logo);
  E('circle', { r: 30, fill: glow(AMBER), opacity: 0.8 }, logoDot);
  E('circle', { r: 17, fill: ball('#FFE07A', '#E07A10'), stroke: '#0A1A3A', 'stroke-width': 4 }, logoDot);
  const epi = T(Lfg, 600, 300, 'Episode 5: Sports Day', { size: 42, weight: 700, anchor: 'middle', fill: '#FFFFFF' });

  /* ================= the cast ================= */
  const kav = cast(Lcast, 'kavya');
  const tan = cast(Lcast, 'tan');
  const priya = cast(Lcast, 'priya', { prop: 'phone' });
  const priyaRun = cast(Lcast, 'priya', { body: true, bottoms: 'shorts', bottomCol: '#1E2A44', shoes: '#F4F7FA' });
  const boy = cast(Lcast, 'boy');
  const dad = cast(Lcast, 'dad');
  const dot = cast(Lcast, 'dot');
  const lt = { kavya: drLowerThird(Lhud, 'kavya'), tan: drLowerThird(Lhud, 'tan'), priya: drLowerThird(Lhud, 'priya'), boy: drLowerThird(Lhud, 'boy'), dad: drLowerThird(Lhud, 'dad'), dot: drLowerThird(Lhud, 'dot') };
  const ltOn = (t, who, t0) => lt[who].set(win(t, t0, t0 + 3.1, 0.3));
  // Dot in the scoreboard is the same character, moved into boardWrap for those shots
  const dotHome = Lcast;

  const blackout = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#000000' }, Lhud);

  /* cut points */
  const k = id => at(id) - 0.06;
  const cB = k('pa'), cC = k('priya'), cD = k('record'), cF = k('stop'), cH = k('tiny'), cI = k('hi'), cK = k('break'), cL = k('title');
  const runT0 = end('priya') + 0.25;
  const P1 = ptStage(1), P2 = ptStage(2);
  const DOT_S = 0.155;                                  // Dot's size when he IS the scoreboard's point

  return t => {
    op(blackout, 1 - P(t, 0, 0.6, linear));
    const sA = on(t, -1, cB), sB = on(t, cB, cC), sC = on(t, cC, cD), sD = on(t, cD, cF), sF = on(t, cF, cH),
      sH = on(t, cH, cI), sI = on(t, cI, cK), sK = on(t, cK, cL), sL = on(t, cL, 1e9);
    for (const key in lt) lt[key].set(0);
    const show = { kav: 0, tan: 0, priya: 0, priyaRun: 0, boy: 0, dad: 0, dot: 0 };
    // Dot lives in Lcast except in the scoreboard shots
    const dotInBoard = sH || sK;
    if (dotInBoard && dot.parentNode !== dotSmall) dotSmall.appendChild(dot);
    if (!dotInBoard && dot.parentNode !== dotHome) dotHome.appendChild(dot);

    /* ---------- A: the stadium ---------- */
    op(stadShot, sA); op(aChips, sA);
    if (sA) {
      stad.upd(t);
      stad.board.row(0, '', -1, 'HEAT 1');
      const push = P(t, 0, cB, linear);
      view(stadWrap, 1 + 0.18 * push, 930, 300, lerp(930, 860, push), 300);
      show.kav = 1;
      tr(kav, 210, 560, 1.02);
      kav.set({ t, talk: 0, mood: t < mid('kavya', 0.6) ? 'neutral' : 'happy', look: t > mid('kavya', 0.5) ? 0.8 : 0 });
      popIn(cKav, t, mid('kavya', 0.05), 210, 372);
      popIn(cFri, t, mid('kavya', 0.4), 640, 470);
      popIn(cSD, t, mid('kavya', 0.66), 640, 540);
      ltOn(t, 'kavya', at('kavya') + 1.4);
    }

    /* ---------- B: Mr Tan on the microphone ---------- */
    op(boothShot, sB); op(boothFront, sB); op(cHeat, 0);
    if (sB) {
      booth.upd(t);
      show.tan = 1;
      tr(tan, 470, 448, 1.12);
      tan.set({ t, talk: scTalk(S, t, 'tan'), mood: 'happy', look: 0.3, lift: 1 });
      ltOn(t, 'tan', at('pa') + 0.1);
      popIn(cHeat, t, mid('pa', 0.5), 860, 250);
    }

    /* ---------- C: the track ---------- */
    op(trackShot, sC); op(bang, 0); op(speed, 0);
    if (sC) {
      const running = t >= runT0;
      track.upd(t, running ? 900 : 0);
      if (!running) {
        show.priya = 1;
        tr(priya, 820, 600, 1.12);
        priya.set({ t, talk: scTalk(S, t, 'priya'), mood: t < mid('priya', 0.6) ? 'smug' : 'deadpan', look: t > mid('priya', 0.7) ? -0.9 : -0.2 });
        ltOn(t, 'priya', at('priya') + 0.05);
      } else {
        const bp = P(t, runT0, 0.35, pop);
        op(bang, clamp(bp * 3) * (1 - P(t, runT0 + 0.55, 0.2, linear))); tr(bang, 300, 230, Math.max(0.01, 0.6 + 0.4 * bp), -6);
        show.priyaRun = 1;
        const x = lerp(-120, 1360, P(t, runT0 + 0.15, 1.1, linear));
        tr(priyaRun, x, 700, 1.5);
        priyaRun.pose(runPose(t, 3.2));
        op(speed, t > runT0 + 0.15 && x < 1300 ? 0.9 : 0); tr(speed, x - 290, 600);
      }
    }

    /* ---------- D, H, K: the scoreboard ---------- */
    const boardOn = sD || sH || sK;
    op(boardShot, boardOn); op(cWR, 0); cCheetah.set(0); op(finder, sH); op(earlier, 0); op(wrongGap, 0); stamp.set(0);
    if (boardOn) {
      let zoom = 1, fx = 600, fy = 375;
      // which gap is the point in?  record/cheetah: 1 (1.472); break: none, then 1; photo pause: 2 (14.72)
      let gap = 1;
      if (sK) {
        const hopIn = mid('break', 0.62), hopFix = end('photo') + 0.05;
        gap = t < hopIn ? -1 : t < hopFix ? 1 : 2;
      }
      board.row(0, '1472', gap, 'PRIYA');
      if (sH) {
        const z = P(t, cH + 0.3, cI - cH - 0.3, easeIn);
        zoom = Math.pow(9, z);
        fx = lerp(600, P1[0], z); fy = lerp(375, P1[1], z);
        setText(zoomTxt, 'ZOOM ×' + (zoom >= 10 ? String(Math.round(zoom)) : zoom.toFixed(1)));
        // the point is Dot: he blinks at the end of the zoom
        op(board.pt[0], 0);
        show.dot = 1;
        tr(dot, P1[0], P1[1], DOT_S);
        dot.set({ t, mood: z > 0.8 ? 'shock' : 'neutral', look: 0, still: true });
      }
      view(boardWrap, zoom, fx, fy, 600, 375);
      if (sD) {
        show.priya = 1;
        tr(priya, 960, 610, 1.1);
        const celebrate = t < at('cheetah');
        priya.set({ t, talk: scTalk(S, t, 'priya'), mood: celebrate ? 'happy' : 'smug', look: t >= at('cheetah') ? -0.9 : -0.6, lift: celebrate ? 1 : 0 });
        if (t < at('cheetah')) popIn(cWR, t, mid('record', 0.35), 340, 620, 1, -4);
        if (t >= at('cheetah') - 0.3) {
          show.boy = 1;
          const up = P(t, at('cheetah') - 0.3, 0.35, pop);
          tr(boy, 240, lerp(780, 610, up), 1.05);
          boy.set({ t, talk: scTalk(S, t, 'boy'), mood: 'happy', look: 0.6, lift: 1 });
          ltOn(t, 'boy', at('cheetah') + 0.05);
          op(cWR, 0);
          cCheetah.set(P(t, mid('cheetah', 0.3), 0.35, linear)); tr(cCheetah, 560, 500);
        }
      }
      if (sK) {
        // four seconds earlier: Dot runs in along the board and hops into the gap after the 1
        if (t < mid('break', 0.5)) popIn(earlier, t, at('break'), 600, 640);
        show.dot = 1;
        const hopIn = mid('break', 0.62), runIn = P(t, at('break') + 0.2, hopIn - at('break') - 0.2, linear);
        const hopFix = end('photo') + 0.05;
        let x, y, s;
        if (t < hopIn) { x = lerp(1180, P1[0] + 40, runIn); y = 600; s = 0.5; }
        else if (t < hopFix) { const h = P(t, hopIn, 0.45, ease); x = lerp(P1[0] + 40, P1[0], h); y = lerp(600, P1[1], h) - Math.sin(h * Math.PI) * 90; s = lerp(0.5, DOT_S, h); }
        else { const h = P(t, hopFix, 0.45, ease); x = lerp(P1[0], P2[0], h); y = P1[1] - Math.sin(h * Math.PI) * 50; s = DOT_S; }
        op(board.pt[0], 0);
        tr(dot, x, y, s);
        dot.set({ t, talk: scTalk(S, t, 'dot'), mood: t < hopIn ? 'shock' : t < hopFix ? 'happy' : 'annoyed', look: t < hopIn ? -0.8 : 0, arms: t < hopIn ? 1 : 0 });
        if (t > hopIn + 0.4 && t < at('photo')) { op(wrongGap, 1); tr(wrongGap, P1[0], P1[1]); wgA.set(P(t, hopIn + 0.4, 0.3, linear)); }
        if (t >= at('photo') - 0.2) {
          show.priya = 1;
          const up = P(t, at('photo') - 0.2, 0.35, pop);
          tr(priya, 960, lerp(800, 610, up), 1.1);
          const stamped = t > hopFix + 0.35;
          priya.set({ t, talk: scTalk(S, t, 'priya'), mood: stamped ? 'sad' : 'happy', look: -0.6, lift: 1 });
          stamp.set(P(t, hopFix + 0.35, 0.3, linear)); tr(stamp, 600, 545, 0.55);
        }
      }
    }

    /* ---------- F, G: the Blue House tent ---------- */
    op(tentShot, sF); op(tentFront, sF); op(cTrust, 0); op(cmp, 0);
    if (sF) {
      tent.upd(t);
      show.dad = 1;
      const g2 = t >= at('digits') - 0.1;
      tr(dad, g2 ? 1030 : 380, 440, 1.1);
      dad.set({ t, talk: scTalk(S, t, 'dad'), mood: t < at('digits') ? 'smug' : 'deadpan', look: g2 ? -0.8 : 0.3, lift: t < at('digits') ? 1 : 0 });
      if (dad.watch) dad.watch.set('14.72');
      ltOn(t, 'dad', at('stop') + 0.05);
      op(bigWatch, g2 ? 0 : P(t, mid('stop', 0.45), 0.25, linear)); tr(bigWatch, 820, 330);
      if (!g2 && t > mid('stop', 0.72)) popIn(cTrust, t, mid('stop', 0.72), 820, 560);
      if (g2) {
        show.kav = 1;
        tr(kav, 165, 440, 1.05);
        kav.set({ t, talk: scTalk(S, t, 'kavya'), mood: t < mid('digits', 0.5) ? 'deadpan' : 'smug', look: 0.8 });
        const cp = P(t, at('digits'), 0.35, pop);
        op(cmp, clamp(cp * 3)); tr(cmp, 600, 330, Math.max(0.01, 0.75 + 0.13 * cp));
        op(ring1, P(t, mid('digits', 0.5), 0.25, linear)); op(ring2, P(t, mid('digits', 0.62), 0.25, linear));
        op(sameT, P(t, mid('digits', 0.3), 0.3, linear));
      }
    }

    /* ---------- I, J: Dot's confessional ---------- */
    conf.set(sI, t);
    op(plaque, 0); op(sb, 0);
    if (sI) {
      show.dot = 1;
      tr(dot, 300, 420, 1.45);
      const sliding = t >= at('slide') - 0.1;
      dot.set({ t, talk: scTalk(S, t, 'dot'), mood: t < mid('hi', 0.6) ? 'smug' : sliding ? 'deadpan' : 'happy', look: sliding ? 0.7 : 0, point: sliding && t > mid('slide', 0.3) ? 1 : 0 });
      ltOn(t, 'dot', at('hi') + 0.15);
      const pp = P(t, mid('hi', 0.25), 0.45, pop) * (1 - P(t, at('slide') - 0.25, 0.2, linear));
      op(plaque, clamp(pp * 2.5)); tr(plaque, 840, 340, Math.max(0.01, 0.7 + 0.3 * pp));
      if (sliding) {
        const bp = P(t, at('slide') - 0.1, 0.35, pop);
        op(sb, clamp(bp * 3)); tr(sb, 840, 350, Math.max(0.01, 0.85 + 0.15 * bp));
        const mv = P(t, mid('slide', 0.45), 0.7, ease);
        attr(sbPt, 'cx', lerp(sx(1) + 50, sx(0) + 50, mv));
        attr(sbPt, 'cy', -6 - Math.sin(mv * Math.PI) * 40);
        op(sbVal, 1 - mv); op(sbVal2, mv);
        op(sbArrow, P(t, mid('slide', 0.45), 0.3, linear));
        op(sbRule, P(t, mid('slide', 0.7), 0.3, linear));
        op(sbLabels, 1 - mv);
      }
    }

    /* ---------- L: title card ---------- */
    op(titleShot, sL); op(logo, 0); op(epi, 0);
    if (sL) {
      tr(rayP, 600, 600, 1, (t * 6 * AMP) % 360);
      const lp = P(t, at('title') + 0.05, 0.6, pop);
      op(logo, clamp(lp * 2.5)); tr(logo, 600, 190, Math.max(0.01, 0.5 + 0.5 * lp));
      const db = Math.abs(Math.sin(t * 3.2)) * 26 * AMP;
      tr(logoDot, 196, 8 - db);
      op(epi, P(t, mid('title', 0.42), 0.4, linear));
      const castT = i => mid('title', 0.5) + i * 0.13, xs = [180, 390, 600, 810, 1020];
      const row = [[kav, 'happy', 0.8, 'kav'], [priya, 'smug', 0.78, 'priya'], [dot, 'smug', 0.9, 'dot'], [dad, 'smug', 0.7, 'dad'], [boy, 'happy', 0.8, 'boy']];
      row.forEach(([c, mood, s, key], i) => {
        const p = P(t, castT(i), 0.45, pop);
        show[key] = 1; op(c, clamp(p * 3));
        tr(c, xs[i], 530 + 30 * (1 - clamp(p)), Math.max(0.01, s * p));
        c.set({ t, mood, look: 0, lift: 0, arms: key === 'dot' ? 0.6 : 0 });
      });
    }

    /* characters not in this shot */
    if (!sL) { op(kav, show.kav); op(priya, show.priya); op(boy, show.boy); op(dad, show.dad); op(dot, show.dot); }
    op(tan, show.tan); op(priyaRun, show.priyaRun);
  };
});
