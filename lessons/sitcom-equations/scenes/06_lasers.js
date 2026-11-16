/* Scene 6: The Laser Corridor (inequalities and number lines).
   Shots (hard sitcom cuts):
   H   the corridor: the family behind the table; Ah Boy against a measuring stick, his head exactly at the 120 mark;
       the sign YOU MUST BE TALLER THAN 120 cm.
   P   the glass panel: Snappy snaps onto the table (lower third): h > 120, a number line 100-140 with an OPEN circle at
       120 and the arrow to the right; "120 not included".
   H   push in: Ah Boy on tiptoe, his hair now above the line.
   TH  Snappy: 2 at his pointy end, 5 in his open mouth; 2 < 5 and 5 > 2 with "small" / "big".
   P   Mum: MAX 4 PEOPLE: p ≤ 4, number line 0-8 with a CLOSED circle at 4 and the line to the left -> the two kinds of
       circle: < > open, not included; ≤ ≥ closed, included.
   TH  Snappy's belt: the bottom bar of = slides under < to make ≤, and the ring fills in.
   F   the floor tiles 1-5 under the sign x > 3: Priya walks onto tile 3 -> ZAP, she jumps back to tile 2; TIPPED!;
       3 is not included (open ring), tiles 4 and 5 glow.
   P   the lock: list the integers with −2 < x ≤ 3; Ah Boy: 1, 2, 3 -> Kavya: open circle at −2, closed at 3, then −1, 0,
       1, 2, 3 light up: 5 integers; the keypad OPEN.
   TH  five Exes, unmasked: −1, 0, 1, 2, 3. A whole range. */
scene('lasers', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;
  const talk = (t, who) => scTalk(S, t, who);

  /* ---------- local helpers ---------- */
  const view = (el, k, fx, fy) => el.setAttribute('transform', `translate(600 375) scale(${k.toFixed(4)}) translate(${(-fx).toFixed(1)} ${(-fy).toFixed(1)})`);
  const F = (t, t0, d) => P(t, t0, d || 0.3, linear);
  const GOLD = '#FFE45C', RED = '#FF4A4A', GREEN = '#56D69B', AMBER = '#FFC247', LILAC = '#B48CFF', PANEL = '#10142A', CYAN = '#6EC8FF';
  const W_ = (s, size) => mkMeasure(s, { size }).w;
  // a dark glass panel, centred
  const glass = (parent, cx, cy, w, h, title) => {
    const g = G(parent);
    E('rect', { x: cx - w / 2 + 6, y: cy - h / 2 + 8, width: w, height: h, rx: 16, fill: 'rgba(0,0,0,0.4)' }, g);
    E('rect', { x: cx - w / 2, y: cy - h / 2, width: w, height: h, rx: 16, fill: PANEL, stroke: RED, 'stroke-width': 4 }, g);
    E('rect', { x: cx - w / 2 + 8, y: cy - h / 2 + 8, width: w - 16, height: h - 16, rx: 12, fill: 'none', stroke: '#2A2E4A', 'stroke-width': 2 }, g);
    if (title) T(g, cx - w / 2 + 26, cy - h / 2 + 44, title, { size: 26, weight: 800, fill: RED, ls: 2 });
    return g;
  };
  // number-line extras: a ray or bar (drawn under) and open / closed circles (drawn over)
  const ray = (nl, v, dir, col) => {
    const g = G(nl), x0 = nl.x(v), x1 = dir > 0 ? nl.len + 30 : -30;
    E('path', { d: `M${x0},0 L${x1},0`, stroke: col || GREEN, 'stroke-width': 10, 'stroke-linecap': 'round' }, g);
    E('path', { d: dir > 0 ? `M${x1 + 22},0 L${x1 - 4},-16 L${x1 - 4},16 Z` : `M${x1 - 22},0 L${x1 + 4},-16 L${x1 + 4},16 Z`, fill: col || GREEN }, g);
    return g;
  };
  const bar = (nl, a, b, col) => { const g = G(nl); E('path', { d: `M${nl.x(a)},0 L${nl.x(b)},0`, stroke: col || GREEN, 'stroke-width': 10, 'stroke-linecap': 'round' }, g); return g; };
  const dot = (nl, v, closed, col) => { const g = G(nl); tr(g, nl.x(v), 0); E('circle', { r: 14, fill: closed ? (col || GREEN) : PANEL, stroke: closed ? '#FFFFFF' : (col || '#FFFFFF'), 'stroke-width': 4 }, g); return g; };

  /* ---------- layers ---------- */
  const Lworld = G(root), Lfloor = G(root), Lconf = G(root), Lfg = G(root), Lhud = G(root);
  const room = eqRoom(Lworld, 'laser');
  const boardL = G(room); room.insertBefore(boardL, room.mid);
  const lt = eqLowerThird(Lhud, 'croc');

  /* ================= the cast ================= */
  const pri = cast(room.mid, 'priya', { s: 0.74 });
  const dad = cast(room.mid, 'dad', { s: 0.74 });
  const kav = cast(room.mid, 'kavya', { s: 0.74 });
  const mum = cast(room.mid, 'mum', { s: 0.74 });
  const boy = cast(room.mid, 'boy', { s: 0.74 });
  const XS = { pri: 90, dad: 190, kav: 290, mum: 385, boy: 486 }, Y0 = 448, HS = 0.74;
  const HUM = [[pri, 'pri'], [dad, 'dad'], [kav, 'kav'], [mum, 'mum'], [boy, 'boy']];
  const croc = cast(room.top, 'croc', { s: 0.62 });

  /* ================= H: the measuring stick and the sign ================= */
  const hShot = G(boardL);
  const HT = Y0 + 6 + HS * boy.top;              // the top of Ah Boy's hair, on stage
  const CM = 6, cmY = v => HT - (v - 120) * CM;   // 6 px per cm, 120 cm at the top of his head
  const stick = G(hShot);
  E('rect', { x: 572, y: cmY(143), width: 36, height: cmY(97) - cmY(143), rx: 4, fill: '#FFF3C4', stroke: '#2A1A22', 'stroke-width': 3 }, stick);
  let sd = '';
  for (let v = 100; v <= 140; v += 5) sd += `M${v % 10 ? 592 : 584},${cmY(v)} L608,${cmY(v)} `;
  E('path', { d: sd, stroke: '#2A1A22', 'stroke-width': 3 }, stick);
  [100, 110, 120, 130, 140].forEach(v => T(stick, 618, cmY(v) + 9, String(v), { size: 26, weight: 800, fill: v === 120 ? RED : '#FFFFFF' }));
  const line120 = E('line', { x1: 440, y1: cmY(120), x2: 608, y2: cmY(120), stroke: RED, 'stroke-width': 4, 'stroke-dasharray': '10 7' }, hShot);
  const sign = G(hShot); tr(sign, 835, 245);
  E('rect', { x: -150, y: -100, width: 300, height: 200, rx: 16, fill: '#1A0A10', stroke: RED, 'stroke-width': 6 }, sign);
  T(sign, 0, -46, 'YOU MUST BE', { size: 30, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 2 });
  T(sign, 0, -6, 'TALLER THAN', { size: 30, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 2 });
  T(sign, 0, 64, '120 cm', { size: 58, weight: 800, anchor: 'middle', fill: GOLD });
  const chExact = mkChip(Lfg, 'exactly **120**', { size: 30, col: GOLD });

  /* ================= P: the glass panels ================= */
  const PX = 700, PY = 275, PW = 600, PH = 320;     // x 400-1000, y 115-435
  // gt: h > 120
  const pGt = glass(boardL, PX, PY, PW, PH, 'TALLER THAN 120 cm');
  const gtM = mkMath(pGt, PX, 222, 'h > 120', { size: 64, anchor: 'middle', fill: '#FFFFFF' });
  const nlA = mkNumberLine(pGt, { from: 100, to: 140, step: 10, minor: 2, len: 420, size: 28 }); tr(nlA, PX - 210, 318);
  const rayA = ray(nlA, 120, 1), dotA = dot(nlA, 120, false);
  const gtNote = mkText(pGt, PX, 410, '**120** is **not** included', { size: 30, anchor: 'middle', fill: '#FFFFFF', boldFill: RED });
  // max: p ≤ 4
  const pMax = glass(boardL, PX, PY, PW, PH);
  const maxSign = G(pMax); tr(maxSign, PX - 160, 170);
  E('rect', { x: -110, y: -32, width: 220, height: 64, rx: 10, fill: '#FFFFFF', stroke: RED, 'stroke-width': 5 }, maxSign);
  T(maxSign, 0, 11, 'MAX 4 PEOPLE', { size: 28, weight: 800, anchor: 'middle', fill: '#C62828' });
  const maxM = mkMath(pMax, PX + 150, 192, 'p <= 4', { size: 60, anchor: 'middle', fill: '#FFFFFF' });
  const nlB = mkNumberLine(pMax, { from: 0, to: 8, step: 1, len: 440, size: 28 }); tr(nlB, PX - 220, 300);
  const rayB = ray(nlB, 4, -1), dotB = dot(nlB, 4, true);
  const maxNote = mkText(pMax, PX, 400, '**4** is allowed', { size: 30, anchor: 'middle', fill: '#FFFFFF', boldFill: GREEN });
  // circles: open and closed
  const pCir = glass(boardL, PX, PY, PW, PH, 'THE CIRCLES');
  const cirRow = (y, a, b, closed, txt, col) => {
    const g = G(pCir);
    mkMath(g, 490, y + 20, a, { size: 64, anchor: 'middle', fill: '#FFFFFF' });
    mkMath(g, 570, y + 20, b, { size: 64, anchor: 'middle', fill: '#FFFFFF' });
    E('circle', { cx: 670, cy: y, r: 22, fill: closed ? GREEN : PANEL, stroke: '#FFFFFF', 'stroke-width': 5 }, g);
    mkText(g, 712, y + 11, txt, { size: 32, fill: col, boldFill: col });
    return g;
  };
  const cir1 = cirRow(210, '<', '>', false, '**not** included', '#FF8A8A');
  const cir2 = cirRow(340, '<=', '>=', true, '**included**', GREEN);
  // the lock: −2 < x ≤ 3
  const pLock = glass(boardL, PX, PY, PW, PH, 'THE LOCK');
  const lkTxt = mkText(pLock, PX + 270, 159, 'list the **integers**', { size: 28, anchor: 'end', fill: '#FFFFFF', boldFill: GOLD });
  const lkM = mkMath(pLock, PX, 232, '-2 < x <= 3', { size: 58, anchor: 'middle', fill: '#FFFFFF' });
  const nlC = mkNumberLine(pLock, { from: -4, to: 5, step: 1, len: 486, size: 28 }); tr(nlC, PX - 243, 320);
  const barC = bar(nlC, -2, 3), dotC1 = dot(nlC, -2, false), dotC2 = dot(nlC, 3, true);
  const intDots = [-1, 0, 1, 2, 3].map(v => { const g = G(nlC); tr(g, nlC.x(v), -34); E('circle', { r: 11, fill: GREEN, stroke: '#FFFFFF', 'stroke-width': 3 }, g); return g; });
  const boyDots = [1, 2, 3].map(v => { const g = G(nlC); tr(g, nlC.x(v), -34); E('circle', { r: 11, fill: AMBER, stroke: '#FFFFFF', 'stroke-width': 3 }, g); return g; });
  const lkAns = mkText(pLock, PX - 40, 414, '{{-1, 0, 1, 2, 3}}', { size: 34, anchor: 'middle', fill: GREEN, mathScale: 1 });
  const lkFive = mkChip(pLock, '**5** integers', { size: 26, col: GREEN }); tr(lkFive, PX + 200, 404);
  const lkBoy = mkText(pLock, PX, 414, '{{1, 2, 3}}?', { size: 34, anchor: 'middle', fill: AMBER, mathScale: 1 });
  const chZero = mkChip(Lfg, 'integers: … {{-2, -1, 0, 1, 2}} …', { size: 28, col: GOLD });

  /* ================= TH: Snappy (point, belt) ================= */
  const confC = eqConf(Lconf, 'croc');
  const crocTH = cast(Lconf, 'croc', { s: 1.2 });
  const thPoint = G(Lconf);
  const n2 = mkMath(thPoint, 104, 454, '2', { size: 96, anchor: 'middle', fill: CYAN });
  const n5 = mkMath(thPoint, 548, 454, '5', { size: 96, anchor: 'middle', fill: '#FF8A3D' });
  const ineqRow = (y, a, op_, b, small, big) => {
    const g = G(thPoint), s = 84, src = `${a} ${op_} ${b}`, w = W_(src, s), x0 = 900 - w / 2;
    mkMath(g, x0, y, src, { size: s, fill: '#FFFFFF' });
    const wa = W_(a, s), wb = W_(b, s);
    T(g, x0 + wa / 2, y + 46, small ? 'small' : 'big', { size: 28, weight: 800, anchor: 'middle', fill: small ? CYAN : '#FF8A3D' });
    T(g, x0 + w - wb / 2, y + 46, small ? 'big' : 'small', { size: 28, weight: 800, anchor: 'middle', fill: small ? '#FF8A3D' : CYAN });
    return g;
  };
  const rowLt = ineqRow(250, '2', '<', '5', true), rowGt = ineqRow(450, '5', '>', '2', false);
  const pointNote = mkText(thPoint, 900, 600, 'the **pointy end** → the **smaller** number', { size: 30, anchor: 'middle', fill: '#FFFFFF', boldFill: GOLD });
  const thBelt = G(Lconf);
  const ltM = mkMath(thBelt, 720, 330, '<', { size: 150, anchor: 'middle', fill: '#FFFFFF' });
  const barTop = E('rect', { x: -48, y: -8, width: 96, height: 16, rx: 6, fill: GOLD }, thBelt);
  const barBot = E('rect', { x: -48, y: -8, width: 96, height: 16, rx: 6, fill: GOLD }, thBelt);
  const barMove = E('rect', { x: -42, y: -8, width: 84, height: 16, rx: 6, fill: GOLD }, thBelt);
  const halfEq = mkText(thBelt, 900, 400, 'half an {{=}}', { size: 32, anchor: 'middle', fill: GOLD });
  const ringOpen = E('circle', { cx: 1040, cy: 286, r: 34, fill: '#1F5A2E', stroke: '#FFFFFF', 'stroke-width': 6 }, thBelt);
  const ringFill = E('circle', { cx: 1040, cy: 286, r: 0, fill: GREEN }, thBelt);
  const beltNote = mkText(thBelt, 860, 520, 'a line **underneath** → the circle is **filled in**', { size: 30, anchor: 'middle', fill: '#FFFFFF', boldFill: GREEN });

  /* ================= F: the floor tiles ================= */
  const fShot = G(Lfloor);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#07070E', '#16162A', true) }, fShot);
  E('path', { d: 'M0,120 L420,300 L780,300 L1200,120 M0,560 L420,420 L780,420 L1200,560', stroke: '#3A3A5A', 'stroke-width': 4, fill: 'none' }, fShot);
  E('path', { d: 'M0,560 L1200,560 L1200,750 L0,750 Z', fill: '#1E1E30' }, fShot);
  const beamsF = G(fShot);
  [[0, 210, 1200, 330], [0, 380, 1200, 250], [0, 300, 1200, 470]].forEach(([x1, y1, x2, y2]) => E('line', { x1, y1, x2, y2, stroke: '#FF2A2A', 'stroke-width': 3, opacity: 0.6 }, beamsF));
  const TX = v => 240 + (v - 1) * 180;               // tile centres: 240 ... 960
  const tiles = [1, 2, 3, 4, 5].map(v => {
    const g = G(fShot); tr(g, TX(v), 612);
    g.base = E('path', { d: 'M-76,-40 L76,-40 L86,40 L-86,40 Z', fill: '#3A3E5A', stroke: '#8A90B8', 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
    g.glow = E('path', { d: 'M-76,-40 L76,-40 L86,40 L-86,40 Z', fill: v === 3 ? RED : GREEN, opacity: 0.55 }, g); op(g.glow, 0);
    mkMath(g, 0, 18, String(v), { size: 50, anchor: 'middle', fill: '#FFFFFF' });
    return g;
  });
  const ring3 = E('circle', { cx: TX(3), cy: 600, r: 34, fill: 'none', stroke: RED, 'stroke-width': 6 }, fShot);
  const arrowF = arrow(fShot, TX(3) + 40, 690 - 140, TX(5) + 70, 690 - 140, { color: GREEN, width: 8 });
  const fSign = G(fShot); tr(fSign, 410, 168);
  E('rect', { x: -120, y: -56, width: 240, height: 112, rx: 16, fill: '#1A0A10', stroke: RED, 'stroke-width': 6 }, fSign);
  mkMath(fSign, 0, 26, 'x > 3', { size: 72, anchor: 'middle', fill: '#FFFFFF' });
  const priB = cast(fShot, 'priya', { body: true, hat: false });
  {
    const body = priB.firstChild.firstChild, hat = G(body);
    E('path', { d: 'M-13,-188 L4,-226 L15,-186 Z', fill: '#FF6FA8', stroke: SC_INK, 'stroke-width': 2, 'stroke-linejoin': 'round' }, hat);
    E('circle', { cx: 4, cy: -228, r: 4, fill: '#FFE45C' }, hat);
  }
  const zapBeam = G(fShot);
  E('rect', { x: TX(3) - 16, y: 0, width: 32, height: 600, fill: RED, opacity: 0.35 }, zapBeam);
  E('rect', { x: TX(3) - 5, y: 0, width: 10, height: 600, fill: '#FFFFFF' }, zapBeam);
  const crocF = cast(fShot, 'croc', { s: 0.5 });
  const flash = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#FFFFFF' }, fShot);
  const stamp = eqStamp(fShot, false);
  const chNot3 = mkChip(fShot, '**3** is **not** included', { size: 32, col: '#FF8A8A' });

  /* ================= TH: five Exes ================= */
  const confE = eqConf(Lconf, 'ex');
  const EXV = ['−1', '0', '1', '2', '3'], EXX = [160, 380, 600, 820, 1040];
  const exes = EXV.map(() => cast(Lconf, 'ex', { s: 0.6 }));
  const exLabs = EXV.map((v, i) => mkMath(Lconf, EXX[i], 520, 'x = ' + v.replace('−', '-'), { size: 40, anchor: 'middle', fill: GOLD }));
  const exRange = mkMath(Lconf, 600, 170, '-2 < x <= 3', { size: 56, anchor: 'middle', fill: '#FFFFFF' });
  const chRange = mkChip(Lconf, 'a whole **range** of me', { size: 32, col: LILAC });

  /* ---------- shots ---------- */
  const k = id => at(id) - 0.06;
  const SHOTS = [['H', -9], ['P', k('gt')], ['H2', k('toes')], ['TP', k('point')], ['P', k('max')], ['TB', k('belt')], ['F', k('tile')],
    ['P', k('lock')], ['TE', k('range')]];
  const shotAt = t => { let s = 'H'; for (const [n, t0] of SHOTS) if (t >= t0) s = n; return s; };
  const SPK = { priya: XS.pri, dad: XS.dad, kavya: XS.kav, mum: XS.mum, boy: XS.boy, croc: 760, narr: 700, ex: 700 };
  const lookTo = (x0, who) => (SPK[who] === undefined ? 0.6 : clamp((SPK[who] - x0) / 140, -1, 1) * 0.85);
  const placeAll = () => HUM.forEach(([c, key]) => { op(c, 1); tr(c, XS[key], Y0 + (key === 'boy' ? 6 : 0), HS); });

  return t => {
    const sh = shotAt(t), who = scWho(S, t);
    room.upd(t);
    room.clock.set(1170 - t);
    const opened = t >= end('zero') - 0.2;
    room.keypad.set('', opened ? 1 : 0);
    lt.set(win(t, at('gt') + 0.2, at('gt') + 3.3, 0.3));

    HUM.forEach(([c]) => op(c, 0)); op(croc, 0);
    [hShot, pGt, pMax, pCir, pLock].forEach(g => op(g, 0));
    chExact.set(0); chZero.set(0);
    op(Lworld, 1); op(Lfloor, 0); op(Lconf, 0);
    Lworld.removeAttribute('transform');
    op(room.decor, 1);

    /* ================= H / H2: the measuring stick ================= */
    if (sh === 'H' || sh === 'H2') {
      placeAll(); op(hShot, 1);
      const toes = sh === 'H2';
      const up = toes ? P(t, at('toes') + 0.1, 0.4, pop) : 0;
      tr(boy, XS.boy, Y0 + 6 - 30 * up, HS);
      op(sign, 1); op(line120, toes ? 1 : F(t, mid('sign', 0.62)));
      chExact.set(toes ? 0 : P(t, mid('sign', 0.66), 0.35, linear)); tr(chExact, 410, 196);
      if (toes) view(Lworld, 1.42, 600, 330);
      const inT = !toes && t > mid('sign', 0.85);
      pri.set({ t, mood: toes ? 'deadpan' : 'neutral', look: lookTo(XS.pri, 'boy') });
      dad.set({ t, mood: toes ? 'deadpan' : 'happy', look: lookTo(XS.dad, 'boy') });
      kav.set({ t, mood: inT || toes ? 'deadpan' : 'neutral', look: lookTo(XS.kav, 'boy') });
      mum.set({ t, mood: toes ? 'deadpan' : 'neutral', look: lookTo(XS.mum, 'boy') });
      boy.set({ t, talk: talk(t, 'boy'), mood: 'happy', look: toes ? -0.2 : 0.7, lift: inT ? 1 : 0 });
    }

    /* ================= P: the glass panels ================= */
    if (sh === 'P') {
      op(room.decor, 0);
      const L = t < k('max') ? 'gt' : t < k('circles') ? 'max' : t < k('belt') ? 'circles' : 'lock';
      // Snappy on the table (gt, max, circles)
      if (L !== 'lock') {
        op(croc, 1);
        const jp = L === 'gt' ? P(t, at('gt') - 0.05, 0.42, pop) : 1;
        tr(croc, 800, lerp(720, 508, jp), 0.62);
        const snapT = L === 'gt' ? 1 - P(t, at('gt') + 0.5, 0.4, linear) : 0;
        croc.set({ t, talk: talk(t, 'croc'), mood: who === 'croc' ? 'happy' : 'smug', look: -0.6, snap: snapT });
      }
      if (L === 'gt') {
        op(pGt, 1);
        op(gtM, F(t, mid('gt', 0.42))); op(nlA, F(t, mid('gt', 0.52)));
        op(rayA, F(t, mid('gt', 0.62))); op(dotA, F(t, mid('gt', 0.62)));
        op(gtNote, F(t, mid('gt', 0.68)));
      } else if (L === 'max') {
        op(pMax, 1);
        op(maxSign, F(t, at('max') + 0.1)); op(maxM, F(t, mid('max', 0.42)));
        op(nlB, F(t, mid('max', 0.5))); op(dotB, F(t, mid('max', 0.62))); op(rayB, F(t, mid('max', 0.68)));
        op(maxNote, F(t, mid('max', 0.72)));
      } else if (L === 'circles') {
        op(pCir, 1);
        op(cir1, F(t, at('circles') + 0.1)); op(cir2, F(t, mid('circles', 0.55)));
      } else {
        op(pLock, 1);
        const isZ = t >= k('zero'), isI = t >= k('ints') && !isZ;
        op(lkTxt, F(t, at('lock') + 0.1)); op(lkM, F(t, mid('lock', 0.5))); op(nlC, F(t, mid('lock', 0.3)));
        op(lkBoy, isI ? F(t, mid('ints', 0.55)) : 0);
        boyDots.forEach((d, i) => op(d, isI ? F(t, mid('ints', 0.55 + i * 0.1), 0.2) : 0));
        op(dotC1, isZ ? F(t, mid('zero', 0.42)) : 0); op(dotC2, isZ ? F(t, mid('zero', 0.5)) : 0); op(barC, isZ ? F(t, mid('zero', 0.55)) : 0);
        intDots.forEach((d, i) => { const p = isZ ? P(t, mid('zero', 0.66 + i * 0.05), 0.3, pop) : 0; op(d, clamp(p * 2.5)); tr(d, nlC.x(i - 1), -34 - 10 * (1 - clamp(p))); });
        op(lkAns, isZ ? F(t, mid('zero', 0.88)) : 0);
        lkFive.set(isZ ? P(t, mid('zero', 0.92), 0.35, linear) : 0);
        if (isZ) { chZero.set(P(t, at('zero') + 0.15, 0.3, linear) * (1 - P(t, mid('zero', 0.4), 0.25, linear))); tr(chZero, PX, 90 + 380); }
      }
      // two humans at the left
      const pair = L === 'gt' ? [[boy, 'boy'], [kav, 'kavya']] : L === 'lock' ? [[kav, 'kavya'], [boy, 'boy']] : [[mum, 'mum'], [dad, 'dad']];
      pair.forEach(([c, w], i) => {
        op(c, 1); tr(c, i ? 292 : 112, Y0 + (c === boy ? 8 : 2), 0.8);
        let mood = 'neutral', lift = 0;
        if (c === boy) { mood = L === 'gt' ? (t > mid('gt', 0.8) ? 'sad' : 'shock') : t >= k('zero') && t < mid('zero', 0.5) ? 'shock' : 'happy'; lift = who === 'boy' ? 1 : 0; }
        if (c === kav) mood = L === 'lock' && t >= k('ints') && t < k('zero') ? 'deadpan' : t > mid('zero', 0.9) ? 'smug' : 'neutral';
        if (c === mum) { mood = who === 'mum' ? 'happy' : 'neutral'; lift = L === 'max' ? 1 : 0; }
        if (c === dad) mood = L === 'circles' ? 'neutral' : 'happy';
        c.set({ t, talk: talk(t, w), mood, look: who === w ? 0.9 : who === 'croc' ? 0.9 : i ? -0.8 : 0.8, lift });
      });
    }

    /* ================= TH: Snappy ================= */
    const isTP = sh === 'TP', isTB = sh === 'TB', isTE = sh === 'TE';
    if (isTP || isTB || isTE) { op(Lworld, 0); op(Lconf, 1); }
    confC.set(isTP || isTB ? 1 : 0, t); op(crocTH, isTP || isTB ? 1 : 0);
    op(thPoint, isTP ? 1 : 0); op(thBelt, isTB ? 1 : 0);
    if (isTP || isTB) {
      const push = isTP ? P(t, k('point'), 5, linear) : P(t, k('belt'), 4.5, linear);
      tr(crocTH, 300, isTB ? 380 : 420, 1.2 * (1 + 0.04 * push));
      const belt = isTB ? P(t, at('belt') + 0.1, 0.5, ease) : 0;
      crocTH.set({ t, talk: talk(t, 'croc'), mood: 'happy', look: 0.6, belt, snap: isTP ? 0.4 : 0 });
    }
    if (isTP) {
      op(n2, F(t, at('point') + 0.2)); op(n5, F(t, at('point') + 0.4));
      op(rowLt, F(t, mid('point', 0.45))); op(rowGt, F(t, mid('point', 0.6)));
      op(pointNote, F(t, mid('point', 0.2)));
    }
    if (isTB) {
      op(ltM, F(t, at('belt') + 0.1));
      const sl = P(t, mid('belt', 0.25), 0.7, ease);
      tr(barTop, 900, 274); tr(barBot, 900, 306);
      op(barTop, F(t, at('belt') + 0.1)); op(barBot, sl > 0 ? 0.35 : F(t, at('belt') + 0.1));
      tr(barMove, lerp(900, 720, sl), lerp(306, 352, sl)); op(barMove, F(t, at('belt') + 0.1));
      op(halfEq, F(t, mid('belt', 0.12)));
      op(ringOpen, F(t, mid('belt', 0.5)));
      attr(ringFill, 'r', 30 * P(t, mid('belt', 0.62), 0.5, easeOut));
      op(beltNote, F(t, mid('belt', 0.6)));
    }

    /* ================= F: the floor tiles ================= */
    if (sh === 'F') {
      op(Lworld, 0); op(Lfloor, 1);
      const isZap = t >= k('zap'), zt = mid('zap', 0.08);
      const walk = P(t, at('tile') + 0.2, mid('tile', 0.72) - at('tile') - 0.2, linear);
      const jump = isZap ? P(t, zt, 0.6, ease) : 0;
      const px = isZap ? lerp(TX(3), TX(2), jump) : lerp(TX(1) - 40, TX(3), walk);
      const py = 616 - (isZap ? Math.sin(Math.PI * jump) * 90 : 0);
      tr(priB, px, py, 1.5);
      if (!isZap && walk > 0 && walk < 1) priB.pose(walkPose(t));
      else if (isZap && jump < 1) priB.pose({ armL: [160, 10], armR: [-160, -10], legL: [20, 30], legR: [-20, 30] });
      else if (isZap) priB.pose({ armL: [50, 110], armR: [-50, -110], lean: -4 });
      else priB.pose({ armL: [12, 10], armR: [-140, -20] });
      op(zapBeam, isZap ? 1 - P(t, zt + 0.15, 0.35, linear) : 0);
      op(flash, isZap ? 0.7 * (1 - P(t, zt, 0.3, linear)) * (t >= zt ? 1 : 0) : 0);
      tiles.forEach((g, i) => op(g.glow, isZap ? (i === 2 ? F(t, zt) : i > 2 ? F(t, mid('zap', 0.6)) : 0) : 0));
      op(ring3, isZap ? F(t, mid('zap', 0.5)) : 0);
      arrowF.set(isZap ? P(t, mid('zap', 0.6), 0.5, linear) : 0); op(arrowF, isZap && t > mid('zap', 0.6) ? 1 : 0);
      stamp.set(isZap ? P(t, mid('zap', 0.3), 0.35, linear) : 0); tr(stamp, 900, 300, 0.5);
      chNot3.set(isZap ? P(t, mid('zap', 0.45), 0.35, linear) : 0); tr(chNot3, 860, 170);
      const cz = isZap && t < mid('zap', 0.5);
      tr(crocF, 1062, 520, 0.45);
      crocF.set({ t, talk: talk(t, 'croc'), mood: isZap ? 'smug' : 'happy', look: -0.8, snap: cz ? 1 : 0 });
    }

    /* ================= TH: five Exes ================= */
    confE.set(isTE ? 1 : 0, t);
    exes.forEach(e => op(e, 0)); exLabs.forEach(l => op(l, 0)); op(exRange, 0); chRange.set(0);
    if (isTE) {
      exes.forEach((e, i) => {
        const p = P(t, at('range') - 0.05 + i * 0.12, 0.4, pop);
        op(e, clamp(p * 2.5)); tr(e, EXX[i], 360 + 40 * (1 - clamp(p)), 0.6);
        e.set({ t: t + i * 0.37, talk: talk(t, 'ex'), mood: t > mid('range', 0.5) ? 'smug' : 'shock', look: (i - 2) * -0.3,
          unmask: P(t, at('range') + 0.3 + i * 0.08, 0.5, ease), val: EXV[i], cape: Math.sin(t * 3 + i) * 0.3 * AMP });
        op(exLabs[i], F(t, at('range') + 0.6 + i * 0.1));
      });
      op(exRange, F(t, at('range') + 0.2));
      chRange.set(P(t, mid('range', 0.55), 0.35, linear)); tr(chRange, 600, 620);
    }
  };
});
