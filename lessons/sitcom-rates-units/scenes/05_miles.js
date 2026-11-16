/* Scene 5: Give or take (miles and kilometres, average speed).
   Heathrow arrivals, 06:25: Uncle Raj waves a WELCOME! sign: six foot one, twelve stone, ninety miles -> Monsieur Mètre
   pops up on the luggage trolley, horrified: the imperial cousins (foot, pound, pint, mile) -> Sir Miles the milestone
   rises: about 1.6 km, give or take -> ≈, the double number line 5 miles ≈ 8 km -> Uncle Raj's car on the motorway
   (right-hand drive): 90 ÷ 5 = 18, 18 × 8 ≈ 144 km (or 90 × 1.6) -> Ah Boy: miles → km × 1.6, km → miles ÷ 1.6, the km
   number is bigger -> Dad: 70 mph is slower than 90 km/h? 70 × 1.6 ≈ 112 km/h: faster (Sir Miles's Fibonacci friends,
   Mètre wobbles) -> the drive: 60 miles at 60 mph, a 30-minute tea stop, 30 miles at 20 mph (the hedge races, stops,
   crawls) -> Dad's average (60 + 20) ÷ 2 = 40 mph (rosette) -> Trish on the dashboard: total distance ÷ total time ->
   1 h + 0.5 h + 1.5 h = 3 h, 90 ÷ 3 = 30 mph -> Trish: the distance–time graph, steep is fast, flat is stopped ->
   Ah Boy: are we there yet? -> the car stops at Uncle Raj's house: "Actually... yes." */
scene('miles', S => {
  const { at, end, mid } = S, root = S.root;
  const AMP = S.reduce ? 0.35 : 1;

  /* ---------- local helpers ---------- */
  const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
  const show = (el, t, t0, t1) => { const p = P(t, t0, 0.3, easeOut), q = t1 === undefined ? 1 : 1 - P(t, t1, 0.2, linear); op(el, Math.min(p, q)); tr(el, 0, 10 * (1 - p)); };
  const fade = (el, t, t0, d) => op(el, P(t, t0, d || 0.3, linear));
  const popIn = (el, t, t0, x, y, s) => { const p = P(t, t0, 0.45, pop); op(el, clamp(p * 2.5)); tr(el, x, y, Math.max(0.01, (s || 1) * (0.6 + 0.4 * p))); return p; };
  const GOLD = '#FFE45C', INK = MK.ink, GREEN = '#1E9E5A', RED = '#C62828', BLUE = '#2E7DD8', MUTED = '#5A4A52', AMBER = '#E8A21C', CORAL = '#E8475B';
  const paper = (parent, x, y, w, h) => {
    E('rect', { x: x + 6, y: y + 6, width: w, height: h, rx: 16, fill: 'rgba(0,0,0,0.25)' }, parent);
    return E('rect', { x, y, width: w, height: h, rx: 16, fill: MK.paper, stroke: '#8FA3B8', 'stroke-width': 5 }, parent);
  };
  const lookAt = (x, sx) => clamp((sx - x) / 260, -1, 1);
  const home = (el, parent) => { if (el.parentNode !== parent) parent.appendChild(el); };
  // a round speed-limit sign, centred: UK (red ring, "70", plate "mph") or Singapore (km/h)
  function limitSign(parent, n, unit, post) {
    const g = G(parent);
    if (post) E('path', { d: 'M0,40 V220', stroke: '#8F9CAB', 'stroke-width': 10 }, g);
    E('circle', { r: 58, fill: '#FFFFFF', stroke: '#D32F2F', 'stroke-width': 14 }, g);
    T(g, 0, 20, String(n), { size: 56, weight: 800, anchor: 'middle', fill: SC_INK });
    const pl = G(g); tr(pl, 0, 92);
    E('rect', { x: -54, y: -22, width: 108, height: 44, rx: 8, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, pl);
    mkMath(pl, 0, 11, unit, { size: 28, anchor: 'middle', fill: SC_INK, weight: 800 });
    return g;
  }
  function teacup(parent, s) {
    const g = G(parent); tr(g, 0, 0, s || 1);
    E('path', { d: 'M-26,-18 L26,-18 Q24,14 0,16 Q-24,14 -26,-18 Z', fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
    E('path', { d: 'M24,-10 Q40,-8 34,4 Q30,10 20,8', fill: 'none', stroke: SC_INK, 'stroke-width': 3 }, g);
    E('ellipse', { cx: 0, cy: 18, rx: 34, ry: 6, fill: '#E6EBEF', stroke: SC_INK, 'stroke-width': 2.5 }, g);
    E('path', { d: 'M-8,-26 Q-14,-36 -6,-44 M8,-26 Q2,-36 10,-44', fill: 'none', stroke: '#8F9CAB', 'stroke-width': 3, 'stroke-linecap': 'round' }, g);
    return g;
  }
  function cone(parent, x, y) {
    const g = G(parent); tr(g, x, y);
    E('path', { d: 'M-14,0 L-5,-34 L5,-34 L14,0 Z', fill: '#FF8A3D', stroke: SC_INK, 'stroke-width': 2.5 }, g);
    E('path', { d: 'M-10,-14 H10', stroke: '#FFFFFF', 'stroke-width': 5 }, g);
    E('rect', { x: -18, y: -2, width: 36, height: 6, rx: 2, fill: SC_INK }, g);
    return g;
  }

  /* layers */
  const Lbg = G(root), Lcast = G(root), Lfront = G(root), Ltop = G(root), Lfg = G(root), Lhud = G(root);

  /* ================= A: Heathrow arrivals ================= */
  const hShot = G(Lbg);
  const hall = lcAirport(hShot, { day: true, title: 'HEATHROW · ARRIVALS', sign: 'Exit  →', front: 'rail' });
  const hallF = G(Lfront); hallF.appendChild(hall.front); hallF.appendChild(hall.top);
  // the luggage trolley (Mètre stands behind the big suitcase)
  const trolleyBack = G(Ltop), trolley = G(Ltop);
  tr(trolleyBack, 620, 0); tr(trolley, 620, 0);
  E('path', { d: 'M96,646 L110,470 L136,470', fill: 'none', stroke: '#5A6670', 'stroke-width': 8, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, trolley);
  const bigBag = lcSuitcase(trolley, { col: '#C2453A', w: 210, h: 120 }); tr(bigBag, 0, 630);
  E('rect', { x: -116, y: 630, width: 220, height: 14, rx: 6, fill: '#8F9CAB', stroke: '#5A6670', 'stroke-width': 3 }, trolley);
  [-86, 70].forEach(x => E('circle', { cx: x, cy: 660, r: 14, fill: '#2A2E34', stroke: SC_INK, 'stroke-width': 3 }, trolley));
  // Uncle Raj's WELCOME! sign on a stick
  const wSign = G(Ltop);
  E('path', { d: 'M1096,500 L1082,330', stroke: '#8B5A2B', 'stroke-width': 9, 'stroke-linecap': 'round' }, wSign);
  E('rect', { x: 990, y: 262, width: 180, height: 70, rx: 10, fill: '#FFF6D6', stroke: '#8B5A2B', 'stroke-width': 5 }, wSign);
  T(wSign, 1080, 309, 'WELCOME!', { size: 32, weight: 800, anchor: 'middle', fill: '#C62828' });
  // chips
  const cTime = mkChip(Lfg, '**06:25** London time', { size: 32, col: GOLD });
  const cFt = mkChip(Lfg, '**6 ft 1**', { size: 32, col: '#7FD3FF' });
  const cSt = mkChip(Lfg, '**12 stone**', { size: 32, col: '#7FD3FF' });
  const cMi = mkChip(Lfg, '**90 miles**', { size: 32, col: '#7FD3FF' });
  // the card above (what, miles, approx)
  const hCard = G(Lfg), HX = 925;
  paper(hCard, 680, 100, 490, 245);
  const bCous = G(hCard);
  mkText(bCous, HX, 140, 'the **imperial** cousins', { size: 30, anchor: 'middle', fill: INK, boldFill: RED });
  const cous = [['1 "foot"', '30 cm'], ['1 "pound"', '0.45 kg'], ['1 "pint"', '0.57 "litres"'], ['1 "mile"', '1.6 km']].map(([a, b], i) => {
    const g = G(bCous), y = 190 + i * 44;
    mkMath(g, 880, y, a, { size: 32, anchor: 'end', fill: INK, weight: 700 });
    mkMath(g, 906, y, '≈', { size: 32, anchor: 'middle', fill: BLUE, weight: 700 });
    mkMath(g, 932, y, b, { size: 32, fill: INK, weight: 700 });
    return g;
  });
  const bMile = G(hCard);
  mkMath(bMile, HX, 172, '1 "mile" ≈ 1.6 km', { size: 52, anchor: 'middle', fill: INK, weight: 800 });
  const feet = G(bMile);
  for (let i = 0; i < 8; i++) {
    const f = G(feet); tr(f, 740 + i * 44, 238 + (i % 2) * 14, 1, 90);
    E('ellipse', { cx: 0, cy: 0, rx: 13, ry: 7, fill: '#8B6B3A' }, f);
    E('circle', { cx: 15, cy: -4, r: 3.5, fill: '#8B6B3A' }, f); E('circle', { cx: 15, cy: 4, r: 3.5, fill: '#8B6B3A' }, f);
  }
  T(bMile, 1100, 254, '× 1000', { size: 30, weight: 800, anchor: 'middle', fill: '#8B6B3A' });
  const cGive = mkChip(bMile, '1000 Roman paces · **give or take**', { size: 26, col: MUTED, fill: '#F2F4F6' }); tr(cGive, HX, 306);
  const bApx = G(hCard);
  mkText(bApx, HX, 136, '{{≈}} means **approximately equal**', { size: 28, anchor: 'middle', fill: INK, boldFill: BLUE });
  const DLX = 760, DLL = 384;
  const band = E('rect', { x: DLX + DLL * 5 / 20 - 22, y: 162, width: 44, height: 160, rx: 10, fill: 'rgba(255,228,92,0.55)', stroke: AMBER, 'stroke-width': 3 }, bApx);
  const nlMi = mkNumberLine(bApx, { from: 0, to: 20, step: 5, len: DLL, ink: INK, size: 28, arrows: false }); tr(nlMi, DLX, 186);
  const nlKm = mkNumberLine(bApx, { from: 0, to: 32, step: 8, len: DLL, ink: INK, size: 28, arrows: false }); tr(nlKm, DLX, 262);
  T(bApx, DLX - 26, 196, 'miles', { size: 28, weight: 800, anchor: 'end', fill: BLUE });
  T(bApx, DLX - 26, 272, 'km', { size: 28, weight: 800, anchor: 'end', fill: GREEN });

  /* ================= B: Uncle Raj's car ================= */
  const carShot = G(Lbg);
  const car = lcCar(carShot);
  const outL = G(car); car.insertBefore(outL, car.back);            // outside, behind the car's interior
  const carF = G(Lfront); carF.appendChild(car.front); carF.appendChild(car.top);
  const road = lcRoadSign(outL, [['Uncle Raj', 90]], { w: 300, title: 'M4' });
  const ukSign = limitSign(outL, 70, '"mph"', true);
  const house = G(outL);
  E('rect', { x: -120, y: -100, width: 240, height: 150, fill: '#C9A27A', stroke: '#8B6B4A', 'stroke-width': 4 }, house);
  E('path', { d: 'M-140,-96 L0,-170 L140,-96 Z', fill: '#6E5A4A', stroke: '#4A3A2E', 'stroke-width': 4 }, house);
  E('path', { d: 'M-90,-70 h50 v50 h-50 Z M40,-70 h50 v50 h-50 Z', fill: '#BFD8EC', stroke: '#FFFFFF', 'stroke-width': 5 }, house);
  E('rect', { x: -22, y: -20, width: 44, height: 70, rx: 4, fill: '#2E7DD8', stroke: '#14224A', 'stroke-width': 3 }, house);
  E('rect', { x: 70, y: -150, width: 26, height: 40, fill: '#8B5A2B', stroke: '#4A3A2E', 'stroke-width': 3 }, house);
  // the card in the sky
  const cCard = G(Lfg), KX0 = 765;
  paper(cCard, 450, 100, 630, 216);
  // (ninety)
  const bNin = G(cCard);
  const nin1 = mkText(bNin, KX0, 160, '{{90 ÷ 5 = 18}} lots of 5 miles', { size: 36, anchor: 'middle', fill: INK, mathScale: 1.1 });
  const nin2 = mkMath(bNin, KX0, 222, '18 × 8 ≈ 144 km', { size: 44, anchor: 'middle', fill: GREEN, weight: 800 });
  const nin3 = mkText(bNin, KX0, 284, '(or {{90 × 1.6 = 144}})', { size: 30, anchor: 'middle', fill: MUTED });
  // (rule)
  const bRule = G(cCard);
  const ru1 = mkText(bRule, KX0, 160, '**miles** → **km**: {{× 1.6}}', { size: 36, anchor: 'middle', fill: INK, boldFill: BLUE });
  const ru2 = mkText(bRule, KX0, 218, '**km** → **miles**: {{÷ 1.6}}', { size: 36, anchor: 'middle', fill: INK, boldFill: GREEN });
  const ru3 = mkChip(bRule, 'the **km** number is always **bigger**!', { size: 28, col: AMBER, fill: '#FFF6DC' }); tr(ru3, KX0, 278);
  // (limit, faster)
  const bLim = G(cCard);
  const sgSign = limitSign(bLim, 90, '"km/h"', false); tr(sgSign, 990, 178, 0.8);
  const limQ = mkMath(bLim, 700, 200, '70 "mph" < 90 "km/h" ?', { size: 34, anchor: 'middle', fill: RED, weight: 800 });
  const limS = strike(bLim, 700 - limQ.w / 2 - 8, 188, 700 + limQ.w / 2 + 8, INK);
  const fast1 = mkMath(bLim, 765, 160, '70 × 1.6 ≈ 112 "km/h"', { size: 38, anchor: 'middle', fill: GREEN, weight: 800 });
  const fast2 = mkMath(bLim, 765, 214, '112 "km/h" > 90 "km/h"', { size: 34, anchor: 'middle', fill: INK, weight: 700 });
  const fib = G(bLim);
  E('rect', { x: 490, y: 238, width: 550, height: 66, rx: 12, fill: '#EEF1F4', stroke: '#8F969E', 'stroke-width': 3 }, fib);
  mkText(fib, 765, 282, '**Fibonacci friends:** {{5 -> 8}}, {{8 -> 13}}, {{13 -> 21}}', { size: 28, anchor: 'middle', fill: INK, boldFill: '#4A535B' });
  // (trip) the strip of the journey
  const bTrip = G(cCard);
  T(bTrip, KX0, 138, 'the drive: 90 miles', { size: 28, weight: 700, anchor: 'middle', fill: MUTED });
  const legs = [['60 miles', 'at 60 mph', BLUE], ['tea stop', '30 min', AMBER], ['30 miles', 'at 20 mph', CORAL]].map(([a, b, col], i) => {
    const g = G(bTrip), x = 470 + i * 200;
    const box = E('rect', { x, y: 156, width: 190, height: 146, rx: 12, fill: '#FFFFFF', stroke: col, 'stroke-width': 4 }, g);
    const hl = E('rect', { x: x - 4, y: 152, width: 198, height: 154, rx: 14, fill: 'none', stroke: GOLD, 'stroke-width': 7, opacity: 0 }, g);
    T(g, x + 95, 252, a, { size: 28, weight: 800, anchor: 'middle', fill: col });
    T(g, x + 95, 288, b, { size: 28, weight: 700, anchor: 'middle', fill: INK });
    return { g, hl, x };
  });
  { const ic = G(legs[0].g); tr(ic, 565, 200); E('path', { d: 'M-40,-8 h50 M-46,4 h56 M-36,16 h40', stroke: BLUE, 'stroke-width': 5, 'stroke-linecap': 'round' }, ic); E('path', { d: 'M18,-14 L40,4 L18,22 Z', fill: BLUE }, ic); }
  teacup(G(legs[1].g), 1).setAttribute('transform', 'translate(765 206)');
  [-34, 0, 34].forEach(dx => cone(legs[2].g, 965 + dx, 224));
  // (mean)
  const bMean = G(cCard);
  T(bMean, KX0, 150, "Dad's average:", { size: 30, weight: 700, anchor: 'middle', fill: MUTED });
  const meanM = mkMath(bMean, KX0, 230, '(60 + 20) ÷ 2 = 40 "mph"', { size: 46, anchor: 'middle', fill: RED, weight: 800 });
  const meanS = strike(bMean, KX0 - meanM.w / 2 - 8, 214, KX0 + meanM.w / 2 + 8, INK);
  const meanNo = mkText(bMean, KX0, 290, 'the **mean of the speeds**: no!', { size: 28, anchor: 'middle', fill: MUTED, boldFill: RED });
  // (avg)
  const bAvg = G(cCard);
  const avgM = mkMath(bAvg, KX0, 196, '"average speed" = "total distance"/"total time"', { size: 38, anchor: 'middle', fill: INK, weight: 700 });
  const cStop = mkChip(bAvg, '**stops count!**', { size: 30, col: CORAL, fill: '#FFF0F2' }); tr(cStop, KX0, 278);
  // (total)
  const bTot = G(cCard);
  const tab = mkTable(bTot, [['', 'distance', 'speed', 'time'], ['fast', '60 miles', '60 mph', '1 h'], ['tea', '0', '—', '0.5 h'], ['slow', '30 miles', '20 mph', '1.5 h'], ['**total**', '**90 miles**', '', '**3 h**']],
    { size: 26, colW: [84, 128, 112, 82], rowH: 39, ink: INK, side: true, fill: '#FFFFFF', headFill: '#DCEBF8' });
  tr(tab, 466, 110);
  const tabHi = tab.mark(4, 3, 'rgba(255,228,92,0.55)');
  const totM1 = mkMath(bTot, 998, 168, '90 ÷ 3', { size: 36, anchor: 'middle', fill: INK, weight: 700 });
  const totM2 = mkMath(bTot, 998, 222, '= 30 "mph"', { size: 38, anchor: 'middle', fill: GREEN, weight: 800 });
  const totNo = mkMath(bTot, 998, 284, '"not" 40', { size: 30, anchor: 'middle', fill: RED, weight: 700 });
  const totS = strike(bTot, 998 - totNo.w / 2 - 6, 274, 998 + totNo.w / 2 + 6, RED);

  /* ================= C: Trish's distance-time graph ================= */
  const conf = lcConf(Lbg, 'trish');
  const gCard = G(Lfg);
  paper(gCard, 470, 100, 700, 584);
  const OX = 590, OY = 590, UX = 160, UY = 4;
  const px = h => OX + h * UX, py = m => OY - m * UY;
  { let gr = ''; for (let h = 0.5; h <= 3; h += 0.5) gr += `M${px(h)},${py(0)} V${py(90)} `; for (let m = 15; m <= 90; m += 15) gr += `M${px(0)},${py(m)} H${px(3)} `;
    E('path', { d: gr, stroke: '#D9E2EA', 'stroke-width': 2 }, gCard); }
  E('path', { d: `M${px(0)},${py(0) + 10} V${py(90) - 26} M${px(0) - 10},${py(0)} H${px(3) + 26}`, stroke: INK, 'stroke-width': 4, 'stroke-linecap': 'round' }, gCard);
  E('path', { d: `M${px(0)},${py(90) - 38} l-9,16 h18 Z M${px(3) + 38},${py(0)} l-16,-9 v18 Z`, fill: INK }, gCard);
  [0, 1, 2, 3].forEach(h => T(gCard, px(h), OY + 34, String(h), { size: 28, weight: 700, anchor: 'middle', fill: INK }));
  [30, 60, 90].forEach(m => T(gCard, px(0) - 14, py(m) + 10, String(m), { size: 28, weight: 700, anchor: 'end', fill: INK }));
  T(gCard, px(1.5), OY + 72, 'time (h)', { size: 28, weight: 700, anchor: 'middle', fill: MUTED });
  T(gCard, px(0) + 16, py(90) - 26, 'distance (miles)', { size: 28, weight: 700, fill: MUTED });
  const avgLine = E('path', { d: `M${px(0)},${py(0)} L${px(3)},${py(90)}`, stroke: '#8F9CAB', 'stroke-width': 4, 'stroke-dasharray': '12 10' }, gCard);
  const trip = mkDash(E('path', { d: `M${px(0)},${py(0)} L${px(1)},${py(60)} L${px(1.5)},${py(60)} L${px(3)},${py(90)}`, fill: 'none', stroke: CORAL, 'stroke-width': 7, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, gCard));
  const lFast = mkText(gCard, px(0.55) + 12, py(20), '**steep**: fast', { size: 28, anchor: 'start', fill: BLUE, halo: MK.paper });
  const lTea = G(gCard); mkText(lTea, px(1.25), py(60) - 24, '**flat**: stopped', { size: 28, anchor: 'middle', fill: AMBER, halo: MK.paper }); teacup(lTea, 0.6).setAttribute('transform', `translate(${px(1.25)} ${py(60) + 34}) scale(0.6)`);
  const lSlow = mkText(gCard, px(2.2), py(88), '**shallow**: slow', { size: 28, anchor: 'middle', fill: CORAL, halo: MK.paper });
  const lAvg = mkText(gCard, px(2.3), py(40), '- - average **30 mph**', { size: 28, anchor: 'middle', fill: '#5A6670', halo: MK.paper });

  /* ================= the cast ================= */
  const kav = cast(Lcast, 'kavya');
  const mum = cast(Lcast, 'mum', { prop: null });
  const dad = cast(Lcast, 'dad', { prop: null });
  const boy = cast(Lcast, 'boy');
  const raj = cast(Lcast, 'raj', { prop: null, hand: true, side: 'right' });
  const met = cast(trolleyBack, 'metre');
  trolleyBack.parentNode.appendChild(trolleyBack);   // Mètre stands on the suitcase, in front of the trolley
  const miles = cast(Ltop, 'miles');
  const trish = cast(Ltop, 'trish');
  const rosette = lcRosette(Lfg);
  const ltRaj = lcLowerThird(Lhud, 'raj'), ltMiles = lcLowerThird(Lhud, 'miles');

  /* cut points, positions */
  const cB = at('ninety') - 0.06, cC = at('graph') - 0.06, cB2 = at('there') - 0.06;
  const HY = 455, HS = 0.72, RX = 1040, RY = 468, RS = 0.78;
  const HXS = { kavya: 82, mum: 205, dad: 330, boy: 452 };
  const FRX = 330, FRY = 470, DDX = 860, BKY = 405, BKS = 0.6, BKX = { mum: 500, kavya: 600, boy: 700 };
  // the car's speed: [t, v] keypoints (linear between), integrated so the hedge never jumps
  const V = [[0, 1], [mid('trip', 0.36), 1.3], [mid('trip', 0.42), 0], [mid('trip', 0.6), 0], [mid('trip', 0.66), 0.35], [end('trip') + 0.2, 0.35], [at('mean'), 1], [at('yes'), 1], [at('yes') + 1.1, 0]];
  const dist = t => {
    let d = 0;
    for (let i = 0; i < V.length - 1; i++) {
      const [a, va] = V[i], [b, vb] = V[i + 1];
      if (t <= a) break;
      const e = Math.min(t, b), ve = va + (vb - va) * (e - a) / (b - a);
      d += (va + ve) / 2 * (e - a);
    }
    if (t > V[V.length - 1][0]) d += V[V.length - 1][1] * (t - V[V.length - 1][0]);
    return d;
  };

  return t => {
    const sA = on(t, -1, cB), sB = on(t, cB, cC) || on(t, cB2, 1e9), sC = on(t, cC, cB2);
    const who = scWho(S, t);
    op(hShot, sA); op(hallF, sA); op(trolley, sA); op(trolleyBack, sA); op(wSign, 0); op(hCard, sA);
    op(carShot, sB); op(carF, sB); op(cCard, sB && t < at('there') - 0.1 ? 1 : 0);
    conf.set(sC, t); op(gCard, sC);
    op(Lcast, sC ? 0 : 1);
    [cTime, cFt, cSt, cMi].forEach(c => c.set(0));
    op(met, 0); op(miles, 0); op(trish, 0);
    rosette.set(0, 0);
    ltRaj.set(win(t, at('raj') + 0.1, at('raj') + 3.2, 0.3));
    ltMiles.set(win(t, at('miles') + 0.1, at('miles') + 3.2, 0.3));

    /* ---------- A: Heathrow ---------- */
    if (sA) {
      const sx0 = { raj: RX, metre: 620, miles: 830, kavya: 82, mum: 205, dad: 330, boy: 452 }[who];
      const sx = sx0 !== undefined ? sx0 : 700;
      [mum, kav, boy].forEach(c => home(c, Lcast));
      home(met, trolleyBack);
      // chips
      if (t < at('what') - 0.1) {
        cTime.set(P(t, at('raj') + 0.1, 0.4, linear)); tr(cTime, 330, 250);
        cFt.set(P(t, mid('raj', 0.3), 0.4, linear)); tr(cFt, 810, 246);
        cSt.set(P(t, mid('raj', 0.5), 0.4, linear)); tr(cSt, 810, 306);
        cMi.set(P(t, mid('raj', 0.75), 0.4, linear)); tr(cMi, 810, 366);
      }
      op(wSign, t < at('miles') ? 1 : 0);
      // Raj
      tr(raj, RX, RY, RS);
      raj.set({ t, talk: scTalk(S, t, 'raj'), mood: 'happy', look: who === 'raj' ? -0.6 : lookAt(RX, sx), lift: t < at('miles') ? 1 : 0 });
      const wv = t < at('what') ? Math.sin(t * 7) * 4 * AMP : 0;
      tr(wSign, wv, 0);
      // the family
      const fm = { kavya: 'happy', mum: 'happy', dad: 'happy', boy: 'happy' };
      if (t >= at('what') && t < at('miles')) { fm.kavya = 'shock'; fm.boy = 'shock'; fm.mum = 'neutral'; fm.dad = 'neutral'; }
      else if (t >= at('miles')) { fm.kavya = t >= at('approx') ? 'neutral' : 'happy'; fm.boy = 'happy'; fm.mum = 'neutral'; fm.dad = 'neutral'; }
      [[kav, 'kavya'], [mum, 'mum'], [dad, 'dad'], [boy, 'boy']].forEach(([c, k]) => {
        tr(c, HXS[k], HY, HS);
        c.set({ t, talk: scTalk(S, t, k), mood: fm[k], look: lookAt(HXS[k], sx), lift: 0 });
      });
      // Mètre pops up behind the big suitcase
      if (t >= at('what') - 0.15) {
        op(met, 1);
        const up = P(t, at('what') - 0.15, 0.35, pop);
        tr(met, -10, lerp(560, 494 - 186 * 0.55, up), Math.max(0.01, 0.55 * clamp(up, 0.2, 1.2)));
        let mm = 'shock';
        if (t >= at('miles')) mm = t > mid('miles', 0.7) ? 'annoyed' : 'deadpan';
        if (t >= at('approx')) mm = 'annoyed';
        met.set({ t, talk: scTalk(S, t, 'metre'), mood: mm, look: who === 'metre' ? 0.6 : lookAt(620, sx), point: 0 });
      }
      // Sir Miles rises in front of the rail
      if (t >= at('miles') - 0.2) {
        op(miles, 1); home(miles, Ltop);
        const up = P(t, at('miles') - 0.2, 0.6, easeOut);
        tr(miles, 830, lerp(820, 520, up), 0.68);
        miles.set({ t, talk: scTalk(S, t, 'miles'), mood: 'happy', look: -0.4 });
      }
      // the card
      const beat = (el, a, b) => show(el, t, a, b);
      beat(bCous, at('what'), at('miles') - 0.1);
      cous.forEach((c, i) => op(c, P(t, at('what') + 0.15 + i * 0.22, 0.25, linear)));
      beat(bMile, at('miles'), at('approx') - 0.1);
      op(feet, P(t, mid('miles', 0.3), 0.4, linear));
      cGive.set(P(t, mid('miles', 0.7), 0.4, linear));
      beat(bApx, at('approx'), cB);
      op(nlKm, P(t, mid('approx', 0.3), 0.3, linear));
      op(band, P(t, mid('approx', 0.45), 0.3, linear));
      op(hCard, sA && t >= at('what') - 0.05 ? 1 : 0);
    }

    /* ---------- B: the car ---------- */
    if (sB) {
      car.upd(dist(t), 1);
      const sx0 = { raj: FRX, dad: DDX, kavya: BKX.kavya, mum: BKX.mum, boy: BKX.boy, metre: 140, trish: 1060, miles: 260 }[who];
      const sx = sx0 !== undefined ? sx0 : 765;
      [mum, kav, boy].forEach(c => home(c, car.backKids));
      // outside: the road sign, the speed limit, Sir Miles on the hard shoulder, the house
      const rp = P(t, cB, at('limit') - cB, linear);
      op(road, t < at('limit') ? 1 : 0); tr(road, 300 - 120 * rp, 112, 0.9);
      op(ukSign, t >= at('limit') - 0.1 && t < at('faster') ? 1 : 0); tr(ukSign, 270 - 60 * P(t, at('limit'), 10, linear), 190);
      op(house, t >= at('yes') - 0.4 ? 1 : 0);
      tr(house, lerp(1400, 640, P(t, at('yes') - 0.4, 1.4, easeOut)), 262);
      if (t >= at('faster') && t < at('trip')) {
        op(miles, 1); home(miles, outL);
        const up = P(t, at('faster'), 0.5, easeOut);
        tr(miles, 250, lerp(420, 222, up), 0.45);
        miles.set({ t, talk: 0, mood: 'happy', look: 0.6 });
      }
      // the card beats
      const beat = (el, a, b) => show(el, t, a, b);
      beat(bNin, cB + 0.1, at('rule') - 0.1);
      op(nin1, P(t, at('ninety') + 0.15, 0.3, linear)); op(nin2, P(t, mid('ninety', 0.4), 0.3, linear)); op(nin3, P(t, mid('ninety', 0.75), 0.3, linear));
      beat(bRule, at('rule'), at('limit') - 0.1);
      op(ru1, P(t, at('rule') + 0.1, 0.3, linear)); op(ru2, P(t, mid('rule', 0.35), 0.3, linear)); ru3.set(P(t, mid('rule', 0.68), 0.4, linear));
      beat(bLim, at('limit'), at('trip') - 0.1);
      const fz = t >= at('faster');
      op(sgSign, fz ? 0 : P(t, mid('limit', 0.45), 0.3, linear));
      op(limQ, fz ? 0 : P(t, mid('limit', 0.55), 0.3, linear)); limS.set(0);
      op(fast1, fz ? P(t, at('faster') + 0.15, 0.3, linear) : 0); op(fast2, fz ? P(t, mid('faster', 0.45), 0.3, linear) : 0);
      op(fib, fz ? P(t, mid('faster', 0.65), 0.3, linear) : 0);
      beat(bTrip, at('trip'), at('mean') - 0.1);
      legs.forEach((l, i) => {
        const a = mid('trip', [0.1, 0.4, 0.62][i]), b = i < 2 ? mid('trip', [0.4, 0.62][i]) : end('trip') + 0.3;
        op(l.g, P(t, a, 0.3, linear)); attr(l.hl, 'opacity', win(t, a, b, 0.15));
      });
      beat(bMean, at('mean'), at('avg') - 0.1);
      op(meanM, P(t, mid('mean', 0.2), 0.3, linear)); op(meanNo, 0); meanS.set(0);
      beat(bAvg, at('avg'), at('total') - 0.1);
      op(avgM, P(t, at('avg') + 0.2, 0.3, linear)); cStop.set(P(t, mid('avg', 0.72), 0.4, linear));
      beat(bTot, at('total'), cC);
      tab.cells.forEach((row, i) => row.forEach((c, j) => op(c, i === 0 || j === 0 ? 1 : i === 4 ? P(t, mid('total', 0.35), 0.3, linear) : (j === 3 ? P(t, mid('total', 0.05 + 0.1 * i), 0.3, linear) : 1))));
      tabHi.set(P(t, mid('total', 0.4), 0.3, linear));
      op(totM1, P(t, mid('total', 0.55), 0.3, linear)); op(totM2, P(t, mid('total', 0.7), 0.3, linear));
      op(totNo, P(t, mid('total', 0.82), 0.3, linear)); totS.set(P(t, mid('total', 0.88), 0.3, linear));

      // the people
      tr(raj, FRX, FRY, 1);
      raj.set({ t, talk: scTalk(S, t, 'raj'), mood: 'happy', look: who === 'raj' ? 0.5 : who === '' ? 0 : lookAt(FRX, sx) * 0.6, lift: 0 });
      let dm = 'neutral';
      if (who === 'dad') dm = 'smug';
      else if (t >= at('faster') && t < at('trip')) dm = 'sad';
      else if (t >= at('avg') && t < at('graph')) dm = t < at('total') ? 'shock' : 'sad';
      else if (t >= at('yes')) dm = 'happy';
      tr(dad, DDX, FRY, 1);
      dad.set({ t, talk: scTalk(S, t, 'dad'), mood: dm, look: who === 'dad' ? -0.5 : lookAt(DDX, sx) * 0.7 });
      if (t >= mid('mean', 0.55) && t < at('avg') + 1.2) rosette.set(P(t, mid('mean', 0.55), 0.4, linear), P(t, at('avg') + 0.15, 0.9, easeIn));
      tr(rosette, DDX + 70, FRY + 52, 0.6);
      const bk = { kavya: 'neutral', mum: 'neutral', boy: 'happy' };
      if (who === 'kavya') bk.kavya = 'smug';
      if (who === 'dad') { bk.kavya = t > mid(dadLine(t), 0.6) ? 'annoyed' : 'neutral'; bk.mum = 'deadpan'; }
      if (t >= at('yes')) { bk.boy = 'shock'; bk.kavya = 'happy'; bk.mum = 'happy'; }
      [[mum, 'mum'], [kav, 'kavya'], [boy, 'boy']].forEach(([c, k]) => {
        tr(c, BKX[k], BKY, BKS);
        c.set({ t, talk: scTalk(S, t, k), mood: bk[k], look: who === k ? (k === 'boy' ? -0.4 : 0.2) : lookAt(BKX[k], sx), lift: k === 'boy' && who === 'boy' ? 1 : 0 });
      });
      // Mètre on the dashboard; Trish pops up on the other side
      op(met, 1); home(met, Ltop);
      const ft = t >= mid('faster', 0.6) && t < at('trip') ? 0.3 * P(t, mid('faster', 0.6), 0.5, ease) : 0;
      tr(met, 140, 551 - 186 * 0.38, 0.38);
      met.set({ t, talk: 0, mood: who === 'dad' || who === 'raj' ? 'annoyed' : ft > 0 ? 'shock' : 'smug', look: lookAt(140, sx), faint: ft });
      if (t >= at('avg') - 0.15) {
        op(trish, 1);
        const tp = P(t, at('avg') - 0.15, 0.45, pop);
        tr(trish, 1060, 551 - 168 * 0.42 + 30 * (1 - clamp(tp)), Math.max(0.01, 0.42 * clamp(tp, 0.1, 1.2)));
        trish.set({ t, talk: scTalk(S, t, 'trish'), mood: who === 'trish' ? 'annoyed' : who === 'kavya' ? 'happy' : 'smug', look: lookAt(1060, sx) });
      }
    }

    /* ---------- C: Trish's graph ---------- */
    if (sC) {
      op(trish, 1); home(trish, Ltop);
      tr(trish, 250, 450, 0.95);
      trish.set({ t, talk: scTalk(S, t, 'trish'), mood: t > mid('graph', 0.5) ? 'smug' : 'happy', look: 0.8 });
      mkDraw(trip, P(t, cC, 1.6, linear));
      op(lFast, P(t, mid('graph', 0.2), 0.3, linear)); op(lTea, P(t, mid('graph', 0.4), 0.3, linear)); op(lSlow, P(t, mid('graph', 0.52), 0.3, linear));
      op(avgLine, P(t, mid('graph', 0.62), 0.3, linear)); op(lAvg, P(t, mid('graph', 0.66), 0.3, linear));
    }
  };

  function dadLine(t) { return t < at('limit') + 6 ? 'limit' : 'mean'; }
});
