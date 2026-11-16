/* MIND THE ZEROS (Claude Sitcom Ep 3, Powers of 10 & Standard Form): the cast, sets and props of this episode.
   Bundled after engine lib.js, kit.js, mathkit.js and sitcom.js (scMake, scTalk, scKavya, scCastHuman,
   scConfessional, scLowerThird, scVideoCall, mk* maths kit). Every top-level name starts with `sf`, except `cast`.

   Characters: cast(parent, kind, o) -> g, origin at the character's centre, about 200-260 px tall at s = 1
     o: { s (scale), mood (default mood), ... }   (humans: any scHuman option overrides, e.g. prop, lift)
     g.set({ t, talk, mood, look, sweat, still, ... })   call every frame
       talk 0..1 (use scTalk(S, t, who)); mood: neutral | happy | smug | annoyed | sad | shock | deadpan
       look -1..1 pupils left/right; still: true stops the idle bob
     HUMANS (busts: the bottom of the shirt is at y = 140, so stand them behind the lift's handrail, g.front of
     sfLift, or let the frame edge cut them):
       'kavya'  (kavya)  Kavya, 12 (scKavya, PE shirt "8")
       'mum'    (mum)    Mum: magenta kurta, bun, bindi. Default: an empty hand (lift: 1 raises it). Carries sfRice.
       'dad'    (dad)    Dad: glasses, moustache, green polo. Default prop: his phone (storage full)
       'boy'    (boy)    Ah Boy, 8: orange star tee. Default: an empty hand (lift: 1 raises it, to press buttons)
       'priya'  (priya)  Priya, 12: school uniform, bob, yellow clip. Default prop: a calculator
       'tan'    (tan)    Mr Tan, maths teacher, lives one floor up: shirt and tie, glasses. Default prop: a blue
                         whiteboard marker (he writes on the lift's steel wall)
       'rose'   (rose)   Auntie Rose (only on video calls from her stall downstairs). Default prop: a phone
       Pass { prop: null } for no prop; { body: true } for a full body (scHumanBody, feet at 0,0; pose API).
     CARTOONS (scMake):
       'index'  (index)  THE INDEX: the tiny raised number. A gold numeral tile with a face, a little crown, a red
                         collar, tiny arms. Pompous, in charge, insists on all three names (index,
                         power, exponent). About 150 px tall at s = 1 (use s 0.6-1.4). Default mood smug.
                         Extra: g.set({ val: '3' }) the numeral on his tile ('n', '3', '6', '0', '−1', '−2', ...: cheap,
                         setText); { point: 0..1 } raises his right arm to point up and right (at the board).
                         He RIDES on Big Ten's right shoulder: put him at sfPerch(tenX, tenY, tenS) (see below).
       'ten'    (ten)    BIG TEN, the base: a huge amber lift-display "10" come to life. A dark glass display body
                         with glowing seven-segment "10" on the chest, broad shoulders, big arms, a small heavy-browed
                         head on top. Only ever says "Ten." (until the very end). About 270 px tall at s = 1.
                         Default mood deadpan. Extra: { glow: 0..1 } brightens the "10" (default 0.6);
                         { flex: 0..1 } raises both fists (lifting).
       'nought' (nought) NOUGHT, a little zero who desperately wants a job: a plump cream "0" (thick ring with a
                         hole), little arms and legs, hopeful. About 170 px tall. Default mood happy.
                         Extra: { badge: 0..1 } pins on his PLACE-HOLDER name badge (once employed, scene moves.job
                         onwards); { wave: 0..1 } waves an arm.
       'dot'    (dot)    DOT, the decimal point: a small, calm, dark-plum ball sitting cross-legged on a tiny yoga
                         mat. Zen. "I do not move. The digits move." About 130 px tall. Default mood neutral.
                         Extra: { hop: 0..1 } tucks her legs in (mid-hop pose; move her yourself with tr).
       'norm'   (norm)   NORM, the doorman of Club Standard Form (he normalises): a huge bouncer in a black suit,
                         sunglasses pushed up on his bald head, an earpiece, a clipboard "THE LIST: 1 ≤ A < 10".
                         About 280 px tall. Default mood deadpan. Extra: { list: 0..1 } raises the clipboard to
                         read it; { stop: 0..1 } holds up his left palm ("not on the list").
       'e'      (e)      E, the calculator display letter: a pale-green LCD tile with a big seven-segment "E" on
                         it, a face above it, little legs. Bubbly. About 170 px tall. Default mood happy.

   Shots
     sfConf(parent, who)             confessional background tinted for that character (scConfessional); g.set(p, t)
     SF_TINT                         the confessional colours per character
     sfLowerThird(parent, who)       scLowerThird with this episode's name and role for `who` (SF_LT); g.set(p)
     sfPerch(x, y, s)                [x, y, scale] for the Index riding on Big Ten's shoulder when Big Ten is at (x, y)
                                     with scale s: tr(index, ...sfPerch(x, y, s)) puts him top right (superscript!)

   Sets (full stage 1200 x 750; each returns g)
     sfLobby(parent)      the lift lobby on the ground floor of Block 208 (void deck): tiled floor, two steel lift
                          doors with floor displays, call buttons, letterboxes, a notice board ("LIFT UPGRADING
                          PROGRAMME: COMPLETED!"), "BLK 208". g.open(p) slides the LEFT lift's doors open (0..1);
                          g.disp[0], g.disp[1] are sfSeg displays (g.disp[0].set('1')); g.lift = [x, y] centre of the
                          left lift's doorway (characters inside it go in g.inside, drawn behind the doors).
     sfLift(parent)       MAIN SET: inside the lift, facing the back wall (brushed stainless steel, the board Mr Tan
                          writes on), ceiling lights, the side wall on the right with the floor display (an amber
                          sfSeg at the top, g.disp) and the button panel (floors 1-12, door open/close, the yellow
                          alarm bell). LAYERS: characters in g.mid (busts at y about 490-510 (s 0.8-0.9) stand with the handrail
                          across their chests; the rail (y 592) and kick panel (g.front) hide the shirt hem); props in front of the rail go in g.top (drawn last).
                          g.board = { x: 150, y: 100, w: 840, h: 330 } the clear wall area above the heads for maths
                          (write with SF.marker ink: blue marker on steel; MK.ink also reads well).
                          g.press(i, p) lights floor button i (1..12) (p 0..1); g.lights(k) lights buttons 1..k (Ah Boy
                          presses every button: g.lights(12)); g.alarm(p) the bell glows; g.dim(p) emergency lighting
                          (darkens the ceiling lights); g.upd(t) flickers the ceiling light a little.
     sfDisplay(parent)    CLOSE-UP of the floor display: a black glass panel in a steel frame, a big amber sfSeg "10"
                          (g.seg; g.seg.set('10')), up/down arrows (g.arrow(dir) dir 1 up, -1 down, 0 none). Big Ten
                          climbs out of it in the cold open. g.glass = { x, y, w, h }.
     sfClub(parent)       CLUB STANDARD FORM, Norm's door (a cutaway gag): night, a brick wall, a purple neon sign, a
                          black door, two brass posts with a red velvet rope, a poster "THE LIST: 1 ≤ A < 10". Norm
                          stands at about (880, 470); the "guest" (a number) queues on the left at about (330, 420).
                          g.rope(p) unhooks the rope and swings it open (0 closed, 1 open: "You're in").
     sfRoseCall(parent, w, h, label)  scVideoCall from Auntie Rose's stall downstairs, Auntie Rose (bust) far too close
                          to the camera (the series gag). Centred on (0,0). g.rose (cast, use g.rose.set), g.screen.
     sfSpace(parent)      deep space (for the big-number scene and the cold-open zoom): stars, the Sun (left), the
                          Earth and the Moon, far-away Neptune (right). g.sun, g.earth, g.moon, g.neptune = [x, y].
                          g.upd(t) twinkles a few stars.
     sfScope(parent, r)   a microscope view, centred, radius r (220): a lit circle in a black eyepiece ring with
                          three subjects: g.show('ladybird' | 'pollen' | 'cell', p) cross-fades them; a scale bar.

   Props (around their own origin)
     SF                              colours: marker (blue whiteboard ink), steel, amber (display), lcd, plum,
                                     gold, holder (Nought cream, for place-holder zeros), ok, bad, ...
     sfSeg(parent, str, o)           seven-segment text (lift displays, calculator screens). o: { h (char height, 80),
                                     col (lit), dim (unlit), max (slots, default str length), anchor 'start' | 'middle' |
                                     'end', italic (skew, 6) }. Characters: 0-9, E, '-', ' ' and '.' (a point after the
                                     character before it). g.set(str) (cheap: no new elements), g.w (width of the slots).
     sfPVGrid(parent, o)             PLACE-VALUE GRID with a fixed decimal point. o: { from (3), to (−4) (the column
                                     powers, left to right), cell (92), rows (2: row height cell * 1.1 each), head
                                     'value' | 'power' | 'both' (default 'value': 1000 100 10 1 · 0.1 0.01 0.001 ...),
                                     ink, size }. Origin top-left. The point is a red dashed line between the 10⁰ and
                                     10⁻¹ columns (it never moves). g.x(pow) -> centre x of that column; g.W, g.H;
                                     g.rowY(i) -> centre y of row i; g.pointX.
                                     g.num(str, row, o) -> a NUMBER ROW on the grid: digit tiles placed by their place
                                     value ("0.0347", "620", "3.47"); zeros that only hold a place (between the point
                                     and the digits) are drawn in Nought's cream with a "0" (o.holders false turns that
                                     off); o.col tile colour. Returns n with n.set(p) (fade in), n.shift(k) (slide all
                                     the digits k columns: k > 0 LEFT, i.e. × 10^k; fractions animate), n.tiles.
     sfFloors(parent, o)             THE FLOOR CHART (showpiece of `floors`): a tall lift-shaft panel of floors from
                                     10^top down to 10^bottom (o.top 3, o.bottom −3), each floor a row:
                                     [floor button 10ⁿ] [value] [place-value name], the ground floor 10⁰ = 1 marked
                                     G, basements below a "B" line. o: { rowH (60), w (620), size (34), ink }.
                                     Origin top-left. g.row(n, p) reveals floor n (its value too); g.hl(n, p) highlights
                                     it; g.car(pos) moves the little lift car to floor pos (fractional; outside the range
                                     hides it); g.y(n) row centre y; g.W, g.H. Arrows between rows on the left, labelled "÷ 10" (needs
                                     about 120 px clear to the left): g.steps(p). The value column starts at x 150.
     sfStamp(parent, kind)           mkStamp: 'wrong' WRONG FLOOR (red), 'ding' DING! (green), 'list' NOT ON THE LIST
                                     (red), 'in' YOU'RE IN (green). About 600-800 px wide at scale 1: tr(g, x, y, 0.5).
                                     g.set(p) thumps it in.
     sfRice(parent, s)               a 1 kg bag of rice ("RICE 1 kg"), base centre at (0,0), about 150 tall
     sfPiggy(parent, s)              a pink piggy bank with a coin slot, base centre (0,0), about 120 tall.
                                     g.coins(k): k of 6 ten-cent coins stacked beside it (fractions fade the next)
     sfJar(parent, s)                a jam jar with air holes in the lid and Spotty the ladybird inside, base centre (0,0),
                                     about 130 tall. g.spotty (the ladybird group, to wiggle)
     sfLadybird(parent, s)           Spotty, centred, about 70 wide (red, black spots, little face)
     sfPhone(parent, o)              a big phone, centred, 220 x 400; o.screen 'storage' (STORAGE FULL, 256 GB bar)
                                     | 'video' (Auntie Rose's stall video, views counter) | 'blank'. g.screen (a <g>, the
                                     screen's centre at 0,0, 180 x 330) for your own text; g.views (video: a <g> to put the
                                     views count in, at 0,0)
     sfCard(parent, o)               a SPACE TRUMPS card, centred, 250 x 340: header SPACE TRUMPS, o.title, a little picture
                                     (o.art 'planet' | 'star' | 'moon' | 'bug' | 'cell'), and the big number o.src (mkMath)
                                     at the bottom. o.col (card colour). g.hl(p) gold glow (the winner); g.bent(p) folds a
                                     corner (Priya's excuse).
     sfCalc(parent, o)               Priya's calculator, centred, 260 x 400 (mkCalculator) with a seven-segment display:
                                     g.set(str) e.g. '2.4E-08' (sfSeg); g.press(key, p).
*/

/* ---------- colours ---------- */
const SF = {
  marker: '#1F3A93', red: '#C62828', green: '#1E9E5A', steel: '#C9D1D8', steelDk: '#8C98A4', amber: '#FFB020',
  amberDim: 'rgba(255,176,32,0.10)', lcd: '#BFE3C8', lcdInk: '#1E2A1E', plum: '#5A2A5E', gold: '#FFC94A',
  holder: '#FFF1C9', holderInk: '#B8862E', tile: '#DCEBFF', gold2: '#E2B33C', neon: '#E86BFF', velvet: '#B3122E',
};

/* ---------- confessional tints, lower thirds ---------- */
const SF_TINT = {
  index: ['#2A2008', '#5C4614'], ten: ['#1A1A1E', '#3A3428'], nought: ['#2E2614', '#5A4A2A'], dot: ['#2A1430', '#55285E'],
  norm: ['#14141C', '#30304A'], e: ['#10261A', '#245238'], kavya: ['#14243A', '#25446B'], rose: ['#3A1424', '#6E2A44'],
  dad: ['#123026', '#245A48'], mum: ['#3A1030', '#6B1E58'], boy: ['#3A2410', '#6B4414'], priya: ['#1A2240', '#33407A'],
  tan: ['#1A2A3A', '#33506E'],
};
function sfConf(parent, who) { const c = SF_TINT[who] || SF_TINT.index; return scConfessional(parent, c[0], c[1]); }
const SF_LT = {
  index: ['THE INDEX', 'Also the power. Also the exponent.'],
  ten: ['BIG TEN', 'The base. Does the lifting.'],
  nought: ['NOUGHT', 'A zero. Looking for work.'],
  dot: ['DOT', 'Decimal point. Does not move.'],
  norm: ['NORM', 'Doorman, Club Standard Form'],
  e: ['E', "Priya's calculator. E for exponent."],
  kavya: ['KAVYA, 12', '#12-05. Stuck.'],
  mum: ['MUM', 'Brought the rice.'],
  dad: ['DAD', '"How long can it take?"'],
  boy: ['AH BOY, 8', 'Presses buttons.'],
  priya: ['PRIYA', 'Best friend. Competitive.'],
  tan: ['MR TAN', 'Maths teacher. Lives upstairs.'],
  rose: ['AUNTIE ROSE', "Rose's Kitchen, downstairs"],
};
function sfLowerThird(parent, who) { const l = SF_LT[who] || [String(who).toUpperCase(), '']; return scLowerThird(parent, l[0], l[1]); }

/* Big Ten's right shoulder, where the Index rides (superscript position), for Big Ten at (x, y) scale s */
function sfPerch(x, y, s) { s = s || 1; return [x + 92 * s, y - 128 * s, 0.62 * s]; }

/* ---------- seven-segment text ---------- */
const SF_SEG = { '0': 'abcdef', '1': 'bc', '2': 'abged', '3': 'abgcd', '4': 'fgbc', '5': 'afgcd', '6': 'afgedc', '7': 'abc',
  '8': 'abcdefg', '9': 'abcdfg', 'E': 'adefg', '-': 'g', ' ': '', 'n': 'ceg', 'r': 'eg', 'o': 'cdeg', 'P': 'abefg', 'L': 'def', 'U': 'bcdef', 'd': 'bcdeg' };
function _sfSegPath(x, h, segs) {
  const w = h * 0.52, t = h * 0.12, m = t * 0.5, hh = h / 2;
  const S = {
    a: [[m, 0], [w - m, 0], [w - m - t, t], [m + t, t]],
    d: [[m, h], [w - m, h], [w - m - t, h - t], [m + t, h - t]],
    g: [[m, hh], [m + t, hh - t / 2], [w - m - t, hh - t / 2], [w - m, hh], [w - m - t, hh + t / 2], [m + t, hh + t / 2]],
    f: [[0, m], [t, m + t], [t, hh - t / 2 - m * 0.4], [0, hh - m * 0.4]],
    e: [[0, hh + m * 0.4], [t, hh + t / 2 + m * 0.4], [t, h - m - t], [0, h - m]],
    b: [[w, m], [w - t, m + t], [w - t, hh - t / 2 - m * 0.4], [w, hh - m * 0.4]],
    c: [[w, hh + m * 0.4], [w - t, hh + t / 2 + m * 0.4], [w - t, h - m - t], [w, h - m]],
  };
  let d = '';
  for (const k of segs) if (S[k]) d += 'M' + S[k].map(p => (x + p[0]).toFixed(1) + ',' + p[1].toFixed(1)).join(' L') + ' Z ';
  return d;
}
function sfSeg(parent, str, o) {
  o = o || {};
  const h = o.h || 80, col = o.col || SF.amber, dim = o.dim || SF.amberDim, adv = h * 0.72;
  const parse = s => { const out = []; for (const ch of String(s)) { if (ch === '.' && out.length) out[out.length - 1].dot = true; else out.push({ ch: ch === '−' ? '-' : ch, dot: false }); } return out; };
  const n = Math.max(o.max || 0, parse(str).length), g = G(parent), inner = G(g);
  if (o.italic !== 0) inner.setAttribute('transform', `skewX(${-(o.italic || 6)})`);
  const dimP = E('path', { d: '', fill: dim }, inner), litP = E('path', { d: '', fill: col }, inner);
  const dots = []; for (let i = 0; i < n; i++) dots.push(E('circle', { cx: 0, cy: h - h * 0.08, r: h * 0.1, fill: col, opacity: 0 }, inner));
  g.w = n * adv - (adv - h * 0.52);
  const x0 = o.anchor === 'end' ? -g.w : o.anchor === 'middle' ? -g.w / 2 : 0;
  let all = '';
  for (let i = 0; i < n; i++) all += _sfSegPath(x0 + i * adv, h, 'abcdefg');
  attr(dimP, 'd', all);
  g.set = s => {
    const cs = parse(s).slice(-n), off = n - cs.length;   // right-aligned in the slots, like a real display
    let d = '';
    dots.forEach(c => op(c, 0));
    cs.forEach((c, i) => {
      const x = x0 + (off + i) * adv;
      d += _sfSegPath(x, h, SF_SEG[c.ch] !== undefined ? SF_SEG[c.ch] : '');
      if (c.dot) { attr(dots[off + i], 'cx', x + h * 0.52 + h * 0.1); op(dots[off + i], 1); }
    });
    attr(litP, 'd', d);
  };
  g.set(str);
  tr(inner, 0, -h / 2);   // origin: vertical centre of the characters
  if (o.italic !== 0) inner.setAttribute('transform', `translate(0 ${-h / 2}) skewX(${-(o.italic || 6)})`);
  return g;
}

/* ---------- the cast ---------- */
const SF_PROP = { mum: null, dad: 'phone', boy: null, priya: 'calculator', tan: 'marker', rose: 'phone' };
function cast(parent, kind, o) {
  o = o || {};
  if (kind === 'kavya') return scKavya(parent, o);
  if (SC_HUMANS[kind]) {
    const p = Object.assign({}, SF_PROP[kind] ? { prop: SF_PROP[kind] } : { hand: true }, kind === 'tan' ? { propCol: SF.marker } : {}, o);
    return scCastHuman(parent, kind, p);
  }
  const S = { s: o.s, mood: o.mood };
  let c;
  if (kind === 'index') {
    let valT = null, armR = null;
    c = scMake(parent, Object.assign(S, { seed: 5, bob: 3, mood: o.mood || 'smug',
      draw: g => {
        // little legs
        E('path', { d: 'M-16,58 L-18,84 M16,58 L18,84', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
        E('ellipse', { cx: -22, cy: 86, rx: 12, ry: 6, fill: '#7A1E48', stroke: SC_INK, 'stroke-width': 2.5 }, g);
        E('ellipse', { cx: 22, cy: 86, rx: 12, ry: 6, fill: '#7A1E48', stroke: SC_INK, 'stroke-width': 2.5 }, g);
        // left arm on the hip
        E('path', { d: 'M-44,10 Q-64,20 -48,40', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
        // the numeral tile (body)
        E('rect', { x: -46, y: -14, width: 92, height: 76, rx: 18, fill: ball('#FFE07A', '#D99A1E'), stroke: SC_INK, 'stroke-width': 5 }, g);
        E('path', { d: 'M-40,-12 L-30,10 L-20,-12 Z M40,-12 L30,10 L20,-12 Z', fill: '#C62828', stroke: SC_INK, 'stroke-width': 2.5 }, g);   // collar points
        valT = T(g, 0, 50, o.val || 'n', { size: 58, weight: 800, anchor: 'middle', fill: '#5A3A07' });
        // right arm (animated: points up and right)
        armR = G(g); tr(armR, 44, 6);
        E('path', { d: 'M0,0 L30,0', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, armR);
        E('circle', { cx: 32, cy: 0, r: 7, fill: '#FFE07A', stroke: SC_INK, 'stroke-width': 2.5 }, armR);
        // head
        E('circle', { cx: 0, cy: -52, r: 40, fill: ball('#FFE9A8', '#E2B33C'), stroke: SC_INK, 'stroke-width': 5 }, g);
        E('ellipse', { cx: -16, cy: -70, rx: 10, ry: 6, fill: '#FFFFFF', opacity: 0.4 }, g);
        // crown
        E('path', { d: 'M-28,-84 L-30,-112 L-14,-96 L0,-118 L14,-96 L30,-112 L28,-84 Z', fill: '#FFC94A', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
        E('circle', { cx: 0, cy: -100, r: 5, fill: '#C62828' }, g);
      },
      face: { x: 0, y: -50, eye: 10, gap: 30, mouthW: 22, mouthY: 20, lidCol: '#E2B33C' },
      upd: (t, g, st) => {
        if (st.val !== undefined && valT.textContent !== String(st.val)) setText(valT, String(st.val));
        const p = clamp(st.point || 0);
        tr(armR, 44, 6, 1, lerp(30, -40, p));
      } }));
  } else if (kind === 'ten') {
    let segs = null, fists = [];
    c = scMake(parent, Object.assign(S, { seed: 7, bob: 1.5, mood: o.mood || 'deadpan',
      draw: g => {
        // arms (behind the body), animated fists
        [-1, 1].forEach(sd => {
          const a = G(g);
          E('path', { d: `M${sd * 96},-70 Q${sd * 150},-20 ${sd * 128},50`, fill: 'none', stroke: '#2A2A30', 'stroke-width': 40, 'stroke-linecap': 'round' }, a);
          E('path', { d: `M${sd * 96},-70 Q${sd * 150},-20 ${sd * 128},50`, fill: 'none', stroke: '#45454E', 'stroke-width': 30, 'stroke-linecap': 'round' }, a);
          const f = G(a); tr(f, sd * 128, 56);
          E('circle', { r: 26, fill: '#FFC24A', stroke: SC_INK, 'stroke-width': 4 }, f);
          E('path', { d: 'M-12,-8 l24,0 M-12,2 l24,0', stroke: '#B57B12', 'stroke-width': 3, 'stroke-linecap': 'round' }, f);
          fists.push({ a, f, sd });
        });
        // the display body
        E('path', { d: 'M-104,-96 Q-112,-104 -96,-110 L96,-110 Q112,-104 104,-96 L92,96 Q90,110 76,110 L-76,110 Q-90,110 -92,96 Z', fill: linGrad('#3A3A42', '#18181C', true), stroke: SC_INK, 'stroke-width': 6, 'stroke-linejoin': 'round' }, g);
        E('path', { d: 'M-86,-92 L86,-92 L76,92 L-76,92 Z', fill: '#101014', stroke: '#5A5A66', 'stroke-width': 3 }, g);
        segs = sfSeg(g, '10', { h: 132, col: '#FFB020', dim: 'rgba(255,176,32,0.08)', anchor: 'middle' }); tr(segs, 0, 0);
        // little head on top, heavy brow
        E('rect', { x: -16, y: -126, width: 32, height: 20, fill: '#45454E' }, g);   // neck
        E('ellipse', { cx: 0, cy: -164, rx: 46, ry: 42, fill: ball('#FFD27A', '#E89A1E'), stroke: SC_INK, 'stroke-width': 5 }, g);
        E('path', { d: 'M-40,-186 Q0,-200 40,-186', fill: 'none', stroke: '#6B4423', 'stroke-width': 9, 'stroke-linecap': 'round' }, g);   // one brow
      },
      face: { x: 0, y: -160, eye: 9, gap: 30, mouthW: 22, mouthY: 22, lidCol: '#E89A1E', brow: false },
      upd: (t, g, st) => {
        const gl = st.glow === undefined ? 0.6 : st.glow, fx = clamp(st.flex || 0);
        segs.style.opacity = (0.45 + 0.55 * gl).toFixed(3);
        fists.forEach(({ f, sd }) => tr(f, sd * lerp(128, 118, fx), lerp(56, -120, fx)));
      } }));
  } else if (kind === 'nought') {
    let badge = null, arm = null;
    c = scMake(parent, Object.assign(S, { seed: 11, bob: 5, mood: o.mood || 'happy',
      draw: g => {
        E('path', { d: 'M-22,66 L-26,96 M22,66 L26,96', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
        E('ellipse', { cx: -30, cy: 98, rx: 14, ry: 7, fill: '#2E7DD8', stroke: SC_INK, 'stroke-width': 2.5 }, g);
        E('ellipse', { cx: 30, cy: 98, rx: 14, ry: 7, fill: '#2E7DD8', stroke: SC_INK, 'stroke-width': 2.5 }, g);
        E('path', { d: 'M-56,10 Q-80,24 -74,46', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
        arm = G(g); tr(arm, 56, 10);
        E('path', { d: 'M0,0 Q22,10 20,34', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, arm);
        // the "0": a thick ring (even-odd hole)
        E('path', { d: 'M0,-84 C52,-84 64,-36 64,-6 C64,40 40,74 0,74 C-40,74 -64,40 -64,-6 C-64,-36 -52,-84 0,-84 Z M0,12 C-16,12 -22,24 -22,38 C-22,50 -14,56 0,56 C14,56 22,50 22,38 C22,24 16,12 0,12 Z',
          fill: ball('#FFF6DC', '#E9C98A'), 'fill-rule': 'evenodd', stroke: SC_INK, 'stroke-width': 5 }, g);
        E('ellipse', { cx: -26, cy: -56, rx: 12, ry: 7, fill: '#FFFFFF', opacity: 0.6 }, g);
        badge = G(g); tr(badge, 30, 0, 1, -8);
        E('rect', { x: -40, y: -13, width: 80, height: 26, rx: 5, fill: '#FFFFFF', stroke: '#2E7DD8', 'stroke-width': 3 }, badge);
        T(badge, 0, 6, 'PLACE-HOLDER', { size: 11, weight: 800, anchor: 'middle', fill: '#2E7DD8' });
      },
      face: { x: 0, y: -40, eye: 13, gap: 38, mouthW: 26, mouthY: 24, lidCol: '#E9C98A' },
      upd: (t, g, st) => {
        op(badge, clamp(st.badge || 0));
        const w = clamp(st.wave || 0);
        tr(arm, 56, 10, 1, -w * (120 + 25 * Math.sin(t * TAU * 2.2)));
      } }));
  } else if (kind === 'dot') {
    let legs = null, tuck = null;
    c = scMake(parent, Object.assign(S, { seed: 2, bob: 1, mood: o.mood || 'neutral',
      draw: g => {
        E('ellipse', { cx: 0, cy: 64, rx: 80, ry: 12, fill: '#7FC8A9', stroke: SC_INK, 'stroke-width': 3 }, g);   // yoga mat
        legs = E('path', { d: 'M-50,50 Q-20,66 0,52 Q20,66 50,50', fill: 'none', stroke: '#3A1640', 'stroke-width': 14, 'stroke-linecap': 'round' }, g);
        tuck = E('path', { d: 'M-24,40 Q-30,62 -14,64 M24,40 Q30,62 14,64', fill: 'none', stroke: '#3A1640', 'stroke-width': 12, 'stroke-linecap': 'round' }, g);
        E('circle', { cx: 0, cy: -4, r: 54, fill: ball('#9A4FA0', '#4A1A50'), stroke: SC_INK, 'stroke-width': 5 }, g);
        E('ellipse', { cx: -22, cy: -30, rx: 14, ry: 8, fill: '#FFFFFF', opacity: 0.35 }, g);
        // hands resting on the knees, zen
        E('circle', { cx: -50, cy: 40, r: 9, fill: '#C98AD0', stroke: SC_INK, 'stroke-width': 2.5 }, g);
        E('circle', { cx: 50, cy: 40, r: 9, fill: '#C98AD0', stroke: SC_INK, 'stroke-width': 2.5 }, g);
      },
      face: { x: 0, y: -10, eye: 11, gap: 34, mouthW: 22, mouthY: 20, lidCol: '#6A2A70' },
      upd: (t, g, st) => { const h = clamp(st.hop || 0); op(legs, 1 - h); op(tuck, h); } }));
  } else if (kind === 'norm') {
    let clip = null, palm = null;
    c = scMake(parent, Object.assign(S, { seed: 19, bob: 1, mood: o.mood || 'deadpan',
      draw: g => {
        // suit
        E('path', { d: 'M-118,150 Q-124,10 -70,-6 L70,-6 Q124,10 118,150 Z', fill: linGrad('#2A2A34', '#121218', true), stroke: SC_INK, 'stroke-width': 5 }, g);
        E('path', { d: 'M-24,-6 L0,40 L24,-6 Z', fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
        E('path', { d: 'M-8,4 L0,16 L8,4 L4,60 L0,66 L-4,60 Z', fill: '#111111' }, g);   // tie
        E('path', { d: 'M-24,-6 L-40,60 L-10,40 Z M24,-6 L40,60 L10,40 Z', fill: '#34343F', stroke: SC_INK, 'stroke-width': 3 }, g);   // lapels
        // left palm (animated "stop")
        palm = G(g);
        E('path', { d: 'M-104,60 Q-150,10 -132,-40', fill: 'none', stroke: '#2A2A34', 'stroke-width': 32, 'stroke-linecap': 'round' }, palm);
        E('path', { d: 'M-150,-44 Q-152,-74 -138,-74 Q-130,-86 -118,-76 Q-108,-80 -104,-66 L-108,-36 Q-120,-26 -140,-32 Z', fill: '#C98A5E', stroke: SC_INK, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, palm);
        // clipboard in the right hand (animated)
        clip = G(g); tr(clip, 92, 70);
        E('path', { d: 'M20,-60 Q60,-10 20,40', fill: 'none', stroke: '#2A2A34', 'stroke-width': 30, 'stroke-linecap': 'round' }, clip);
        E('rect', { x: -44, y: -66, width: 92, height: 120, rx: 8, fill: '#9C6B3E', stroke: SC_INK, 'stroke-width': 4 }, clip);
        E('rect', { x: -36, y: -54, width: 76, height: 102, rx: 3, fill: '#FFFDF6' }, clip);
        E('rect', { x: -14, y: -72, width: 32, height: 14, rx: 4, fill: '#C9D3DC', stroke: SC_INK, 'stroke-width': 2.5 }, clip);
        T(clip, 2, -30, 'THE LIST', { size: 13, weight: 800, anchor: 'middle', fill: SC_INK });
        mkMath(clip, 2, 0, '1 <= A < 10', { size: 15, fill: SF.red, anchor: 'middle' });
        E('path', { d: 'M-24,18 l50,0 M-24,32 l40,0', stroke: '#9FB2C2', 'stroke-width': 3 }, clip);
        E('circle', { cx: 20, cy: 40, r: 13, fill: '#C98A5E', stroke: SC_INK, 'stroke-width': 3 }, clip);
        // bald head, earpiece, sunglasses pushed up
        E('rect', { x: -26, y: -40, width: 52, height: 40, fill: '#B07A50' }, g);
        E('ellipse', { cx: 0, cy: -90, rx: 62, ry: 64, fill: ball('#D49A6A', '#A86E44'), stroke: SC_INK, 'stroke-width': 5 }, g);
        E('ellipse', { cx: -22, cy: -132, rx: 16, ry: 8, fill: '#FFFFFF', opacity: 0.35 }, g);
        E('path', { d: 'M-52,-128 L-6,-128 Q-4,-112 -24,-110 Q-46,-110 -52,-128 Z M6,-128 L52,-128 Q46,-110 24,-110 Q4,-112 6,-128 Z', fill: '#111111', stroke: SC_INK, 'stroke-width': 3 }, g);
        E('path', { d: 'M-6,-126 L6,-126', stroke: '#111111', 'stroke-width': 4 }, g);
        E('path', { d: 'M62,-80 Q74,-60 66,-30 Q60,-10 40,6', fill: 'none', stroke: '#E6EBEF', 'stroke-width': 3 }, g);   // earpiece wire
        E('circle', { cx: 62, cy: -80, r: 7, fill: '#2A2A34' }, g);
      },
      face: { x: 0, y: -80, eye: 11, gap: 40, mouthW: 30, mouthY: 30, lidCol: '#A86E44' },
      upd: (t, g, st) => {
        const l = clamp(st.list || 0), s = clamp(st.stop || 0);
        tr(clip, lerp(92, 70, l), lerp(70, -10, l), 1, lerp(0, -8, l));
        op(palm, s); tr(palm, 0, 30 * (1 - s));
      } }));
  } else if (kind === 'e') {
    c = scMake(parent, Object.assign(S, { seed: 23, bob: 5, mood: o.mood || 'happy',
      draw: g => {
        E('path', { d: 'M-24,70 L-26,96 M24,70 L26,96', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
        E('ellipse', { cx: -30, cy: 98, rx: 14, ry: 7, fill: '#3A4A58', stroke: SC_INK, 'stroke-width': 2.5 }, g);
        E('ellipse', { cx: 30, cy: 98, rx: 14, ry: 7, fill: '#3A4A58', stroke: SC_INK, 'stroke-width': 2.5 }, g);
        E('path', { d: 'M-60,0 Q-84,-20 -80,-50 M60,0 Q84,-20 80,-50', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
        E('rect', { x: -64, y: -96, width: 128, height: 170, rx: 16, fill: '#3A4A58', stroke: SC_INK, 'stroke-width': 5 }, g);
        E('rect', { x: -52, y: -84, width: 104, height: 146, rx: 8, fill: SF.lcd, stroke: '#1E2A22', 'stroke-width': 3 }, g);
        const s = sfSeg(g, 'E', { h: 62, col: SF.lcdInk, dim: 'rgba(30,42,30,0.08)', anchor: 'middle', italic: 0 }); tr(s, 0, 24);
      },
      face: { x: 0, y: -44, eye: 11, gap: 36, mouthW: 22, mouthY: 18, lidCol: '#9CC8A8' } }));
  } else {
    c = G(parent);
    c.set = () => {};
  }
  return c;
}

/* ---------- stamps ---------- */
function sfStamp(parent, kind) {
  const K = { wrong: ['WRONG FLOOR', '#D32F2F'], ding: ['DING!', '#1E9E5A'], list: ['NOT ON THE LIST', '#D32F2F'], in: ["YOU'RE IN", '#1E9E5A'] }[kind] || ['WRONG FLOOR', '#D32F2F'];
  return mkStamp(parent, K[0], K[1]);
}

/* ---------- sets ---------- */
function _sfButton(parent, x, y, r, label, size) {
  const b = G(parent); tr(b, x, y);
  const ring = E('circle', { r: r + 4, fill: '#8C98A4', stroke: '#5A6670', 'stroke-width': 2 }, b);
  const face = E('circle', { r, fill: '#E6EBEF', stroke: '#5A6670', 'stroke-width': 2 }, b);
  const t = T(b, 0, size * 0.36, label, { size, weight: 800, anchor: 'middle', fill: '#3A4650' });
  b.lit = p => { attr(face, 'fill', p > 0.5 ? '#FFE9A8' : '#E6EBEF'); attr(ring, 'fill', p > 0.5 ? '#FFB020' : '#8C98A4'); };
  return b;
}

function sfLobby(parent) {
  const g = G(parent);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#E9E3D6' }, g);
  // ceiling and fluorescent tubes
  E('rect', { x: 0, y: 0, width: 1200, height: 70, fill: '#D6CFC0' }, g);
  [200, 600, 1000].forEach(x => E('rect', { x: x - 90, y: 24, width: 180, height: 14, rx: 7, fill: '#FFFFF0', stroke: '#B9B2A2', 'stroke-width': 2 }, g));
  // wall tiles (lower half) and floor
  E('rect', { x: 0, y: 380, width: 1200, height: 240, fill: '#CFE0D8' }, g);
  let tl = '';
  for (let x = 0; x <= 1200; x += 60) tl += `M${x},380 L${x},620 `;
  for (let y = 380; y <= 620; y += 60) tl += `M0,${y} L1200,${y} `;
  E('path', { d: tl, stroke: '#B4CCC2', 'stroke-width': 2 }, g);
  E('rect', { x: 0, y: 620, width: 1200, height: 130, fill: '#B8AE9C' }, g);
  let fl = '';
  for (let x = -400; x <= 1600; x += 120) fl += `M${x},620 L${(x - 600) * 1.6 + 600},750 `;
  E('path', { d: fl + 'M0,680 L1200,680', stroke: '#A39985', 'stroke-width': 2 }, g);
  // "BLK 208" sign
  const sg = G(g); tr(sg, 1060, 130);
  E('rect', { x: -90, y: -40, width: 180, height: 80, rx: 10, fill: '#2E7DD8', stroke: '#1A4E8C', 'stroke-width': 4 }, sg);
  T(sg, 0, 16, 'BLK 208', { size: 40, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  // two lifts
  g.disp = []; g.inside = null;
  const lifts = [[380, 'L1'], [760, 'L2']].map(([cx], k) => {
    const L = G(g);
    E('rect', { x: cx - 150, y: 150, width: 300, height: 470, fill: '#9AA6B2', stroke: '#5A6670', 'stroke-width': 5 }, L);   // frame
    const inside = G(L);
    E('rect', { x: cx - 130, y: 196, width: 260, height: 424, fill: linGrad('#D8DEE4', '#A9B4BE', true) }, inside);
    E('path', { d: `M${cx - 130},560 L${cx + 130},560`, stroke: '#7D8A96', 'stroke-width': 8 }, inside);   // handrail
    const holder = G(inside);
    const doorL = G(L), doorR = G(L);
    E('rect', { x: cx - 130, y: 196, width: 130, height: 424, fill: linGrad('#E3E8EC', '#B9C3CC', false), stroke: '#7D8A96', 'stroke-width': 3 }, doorL);
    E('rect', { x: cx, y: 196, width: 130, height: 424, fill: linGrad('#B9C3CC', '#E3E8EC', false), stroke: '#7D8A96', 'stroke-width': 3 }, doorR);
    E('path', { d: `M${cx - 110},230 L${cx - 110},590`, stroke: '#FFFFFF', 'stroke-width': 6, opacity: 0.4 }, doorL);
    // floor display above the door
    E('rect', { x: cx - 60, y: 160, width: 120, height: 34, rx: 6, fill: '#101014', stroke: '#5A6670', 'stroke-width': 2 }, L);
    const d = sfSeg(L, k ? '7' : '1', { h: 24, max: 2, anchor: 'middle' }); tr(d, cx, 177);
    g.disp.push(d);
    // call buttons
    const cb = G(g); tr(cb, cx + 182, 400);
    E('rect', { x: -22, y: -46, width: 44, height: 92, rx: 8, fill: '#C9D1D8', stroke: '#5A6670', 'stroke-width': 3 }, cb);
    E('circle', { cy: -18, r: 12, fill: '#E6EBEF', stroke: '#5A6670', 'stroke-width': 2 }, cb);
    E('circle', { cy: 18, r: 12, fill: '#E6EBEF', stroke: '#5A6670', 'stroke-width': 2 }, cb);
    E('path', { d: 'M-6,-14 L0,-24 L6,-14 Z M-6,14 L0,24 L6,14 Z', fill: '#5A6670' }, cb);
    return { cx, doorL, doorR, holder };
  });
  g.inside = lifts[0].holder; g.lift = [lifts[0].cx, 420];
  g.open = p => { p = clamp(p); tr(lifts[0].doorL, -126 * p, 0); tr(lifts[0].doorR, 126 * p, 0); };
  // letterboxes (left) and the notice board
  const lb = G(g);
  E('rect', { x: 20, y: 250, width: 170, height: 300, fill: '#6E8A9C', stroke: '#3E5260', 'stroke-width': 4 }, lb);
  let lbd = '';
  for (let r = 0; r < 6; r++) for (let c2 = 0; c2 < 3; c2++) lbd += `M${32 + c2 * 52},${264 + r * 46} h44 v36 h-44 Z `;
  E('path', { d: lbd, fill: '#8FA9BA', stroke: '#3E5260', 'stroke-width': 2 }, lb);
  const nb = G(g); tr(nb, 1030, 330);
  E('rect', { x: -120, y: -90, width: 240, height: 200, rx: 6, fill: '#B07A45', stroke: '#6B4423', 'stroke-width': 5 }, nb);
  E('rect', { x: -104, y: -74, width: 208, height: 120, fill: '#FFFDF6', transform: 'rotate(-2)' }, nb);
  T(nb, 0, -44, 'LIFT UPGRADING', { size: 20, weight: 800, anchor: 'middle', fill: '#C62828' });
  T(nb, 0, -18, 'PROGRAMME', { size: 20, weight: 800, anchor: 'middle', fill: '#C62828' });
  T(nb, 0, 18, 'COMPLETED!', { size: 26, weight: 800, anchor: 'middle', fill: '#1E9E5A' });
  E('rect', { x: -60, y: 60, width: 120, height: 36, fill: '#FFE45C', transform: 'rotate(3)' }, nb);
  T(nb, 0, 86, 'Town Council', { size: 16, weight: 700, anchor: 'middle', fill: SC_INK });
  return g;
}

function sfLift(parent) {
  const g = G(parent), back = G(g);
  // back wall: brushed stainless steel panels
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#D3DAE0', '#A7B2BC', true) }, back);
  let br = '';
  for (let i = 0; i < 28; i++) br += `M${40 + i * 37},70 L${40 + i * 37},750 `;
  E('path', { d: br, stroke: '#FFFFFF', 'stroke-width': 2, opacity: 0.18 }, back);   // brushed lines
  E('path', { d: 'M120,70 L120,750 M560,70 L560,750 M1000,70 L1000,750', stroke: '#8C98A4', 'stroke-width': 4 }, back);   // panel seams
  // ceiling with light panels
  E('rect', { x: 0, y: 0, width: 1200, height: 70, fill: '#E8ECEF' }, back);
  E('path', { d: 'M0,70 L1200,70', stroke: '#7D8A96', 'stroke-width': 5 }, back);
  const lights = [240, 600, 960].map(x => E('rect', { x: x - 120, y: 16, width: 240, height: 30, rx: 8, fill: '#FFFDE8', stroke: '#C9C4A8', 'stroke-width': 2 }, back));
  const dimR = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#0A1420', opacity: 0 }, back);
  // left side wall (perspective) with a notice
  E('path', { d: 'M0,70 L60,96 L60,690 L0,750 Z', fill: '#B9C3CC', stroke: '#7D8A96', 'stroke-width': 3 }, back);
  // right side wall (perspective): display and button panel
  const side = G(back);
  E('path', { d: 'M1200,70 L1050,110 L1050,700 L1200,750 Z', fill: linGrad('#C3CBD3', '#9AA6B2', true), stroke: '#7D8A96', 'stroke-width': 3 }, side);
  E('path', { d: 'M1070,150 L1180,132 L1180,600 L1070,590 Z', fill: '#D9DFE4', stroke: '#5A6670', 'stroke-width': 3 }, side);   // panel plate
  E('path', { d: 'M1074,154 L1176,138 L1176,206 L1074,214 Z', fill: '#101014', stroke: '#5A6670', 'stroke-width': 2 }, side);   // display glass
  g.disp = sfSeg(side, '10', { h: 46, max: 2, anchor: 'middle' }); tr(g.disp, 1124, 178);
  const btns = [];
  for (let i = 0; i < 12; i++) {
    const col = i % 2, row = 5 - Math.floor(i / 2);
    btns.push(_sfButton(side, 1100 + col * 52, 252 + row * 50, 17, String(i + 1), 18));
  }
  const oc = [_sfButton(side, 1100, 556, 15, '◀▶', 12), _sfButton(side, 1152, 556, 15, '▶◀', 12)];
  const bell = G(side); tr(bell, 1126, 228);
  const bellFace = E('rect', { x: -40, y: -14, width: 80, height: 28, rx: 14, fill: '#FFD23F', stroke: '#8C6A00', 'stroke-width': 2.5 }, bell);
  T(bell, 0, 8, 'ALARM', { size: 15, weight: 800, anchor: 'middle', fill: '#5A3A00' });
  // the board area marker
  g.board = { x: 150, y: 100, w: 840, h: 330 };
  // characters
  g.mid = G(g);
  // handrail and kick panel (in front of the busts)
  const front = G(g);
  E('rect', { x: 60, y: 604, width: 990, height: 146, fill: linGrad('#9AA6B2', '#6E7A86', true) }, front);
  E('path', { d: 'M60,606 L1050,606', stroke: '#5A6670', 'stroke-width': 4 }, front);
  E('path', { d: 'M40,700 L60,690 L1050,690 L1090,700', fill: 'none', stroke: '#5A6670', 'stroke-width': 3 }, front);
  E('rect', { x: 50, y: 592, width: 1010, height: 20, rx: 10, fill: linGrad('#F2F5F7', '#9AA6B2', true), stroke: '#5A6670', 'stroke-width': 3 }, front);
  [90, 560, 1020].forEach(x => E('rect', { x: x - 7, y: 610, width: 14, height: 14, fill: '#8C98A4' }, front));
  g.front = front;
  g.top = G(g);
  g.press = (i, p) => { if (btns[i - 1]) btns[i - 1].lit(p); };
  g.lights = k => btns.forEach((b, i) => b.lit(k - i > 0.5 ? 1 : 0));
  g.alarm = p => attr(bellFace, 'fill', p > 0.5 ? '#FF8A3D' : '#FFD23F');
  let dimP = 0;
  g.dim = p => { dimP = clamp(p); };
  g.upd = t => {
    const fl = Math.sin(t * 17) > 0.96 ? 0.12 : 0;
    op(dimR, clamp(dimP * 0.35 + fl * dimP));
    lights.forEach(l => attr(l, 'fill', dimP > 0.5 ? '#E8E2C0' : '#FFFDE8'));
  };
  return g;
}

function sfDisplay(parent) {
  const g = G(parent);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#C9D1D8', '#98A4B0', true) }, g);
  let br = '';
  for (let i = 0; i < 34; i++) br += `M${i * 36},0 L${i * 36},750 `;
  E('path', { d: br, stroke: '#FFFFFF', 'stroke-width': 2, opacity: 0.15 }, g);
  E('rect', { x: 250, y: 150, width: 700, height: 420, rx: 26, fill: '#7D8A96', stroke: '#4A5560', 'stroke-width': 6 }, g);
  E('rect', { x: 280, y: 180, width: 640, height: 360, rx: 14, fill: '#08080B', stroke: '#2A2A30', 'stroke-width': 4 }, g);
  E('path', { d: 'M300,200 L560,200 L420,320 Z', fill: '#FFFFFF', opacity: 0.05 }, g);   // glass glint
  g.glass = { x: 280, y: 180, w: 640, h: 360 };
  g.seg = sfSeg(g, '10', { h: 250, max: 2, anchor: 'middle' }); tr(g.seg, 560, 360);
  const up = E('path', { d: 'M840,300 L800,350 L880,350 Z', fill: SF.amber, opacity: 0.1 }, g);
  const dn = E('path', { d: 'M840,430 L800,380 L880,380 Z', fill: SF.amber, opacity: 0.1 }, g);
  g.arrow = dir => { op(up, dir > 0 ? 1 : 0.1); op(dn, dir < 0 ? 1 : 0.1); };
  return g;
}

function sfClub(parent) {
  const g = G(parent);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#1A0E2A', '#2E1846', true) }, g);
  let bricks = '';
  for (let r = 0; r < 14; r++) for (let k = 0; k < 14; k++) bricks += `M${(r % 2 ? -50 : 0) + k * 100},${100 + r * 40} h96 v36 h-96 Z `;
  E('path', { d: bricks, fill: '#3A2050', opacity: 0.55 }, g);
  E('rect', { x: 0, y: 640, width: 1200, height: 110, fill: '#141018' }, g);   // pavement
  // the door
  E('rect', { x: 520, y: 230, width: 240, height: 410, rx: 6, fill: '#0C0A10', stroke: '#C9A44A', 'stroke-width': 6 }, g);
  E('rect', { x: 600, y: 270, width: 80, height: 34, rx: 6, fill: '#C9A44A' }, g);
  T(g, 640, 296, 'VIP', { size: 26, weight: 800, anchor: 'middle', fill: '#0C0A10' });
  E('circle', { cx: 730, cy: 450, r: 9, fill: '#C9A44A' }, g);
  // neon sign
  const sg = G(g); tr(sg, 640, 165);
  E('rect', { x: -330, y: -58, width: 660, height: 116, rx: 22, fill: '#120A1C', stroke: SF.neon, 'stroke-width': 5 }, sg);
  const n1 = T(sg, 0, -6, 'CLUB', { size: 30, weight: 800, anchor: 'middle', fill: '#FFE45C', ls: 10 });
  const n2 = T(sg, 0, 40, 'STANDARD FORM', { size: 46, weight: 800, anchor: 'middle', fill: '#FFD6FF', ls: 4 });
  [n1, n2].forEach(w => { w.setAttribute('stroke', SF.neon); w.setAttribute('stroke-width', 3); w.setAttribute('paint-order', 'stroke'); });
  E('ellipse', { cx: 640, cy: 165, rx: 420, ry: 120, fill: glow(SF.neon), opacity: 0.25 }, g);
  // the list poster
  const ls = G(g); tr(ls, 1060, 360);
  E('rect', { x: -110, y: -120, width: 220, height: 240, rx: 10, fill: '#FFFDF6', stroke: '#C9A44A', 'stroke-width': 5 }, ls);
  T(ls, 0, -78, 'THE LIST', { size: 30, weight: 800, anchor: 'middle', fill: SC_INK });
  mkMath(ls, 0, -14, '1 <= A < 10', { size: 36, fill: SF.red, anchor: 'middle' });
  T(ls, 0, 40, 'one digit,', { size: 26, weight: 700, anchor: 'middle', fill: SC_INK });
  T(ls, 0, 74, 'then the point', { size: 26, weight: 700, anchor: 'middle', fill: SC_INK });
  // brass posts and velvet rope
  const post = x => { E('rect', { x: x - 8, y: 470, width: 16, height: 170, fill: '#C9A44A', stroke: '#6B5420', 'stroke-width': 3 }, g); E('circle', { cx: x, cy: 466, r: 16, fill: '#E2C46A', stroke: '#6B5420', 'stroke-width': 3 }, g); E('ellipse', { cx: x, cy: 640, rx: 34, ry: 10, fill: '#C9A44A', stroke: '#6B5420', 'stroke-width': 3 }, g); };
  post(430); post(830);
  const rope = E('path', { d: '', fill: 'none', stroke: SF.velvet, 'stroke-width': 14, 'stroke-linecap': 'round' }, g);
  g.rope = p => {
    p = clamp(p);
    // closed: a sagging rope 430 -> 830; open: it hangs straight down from the right post
    const ex = lerp(830, 430 + 30, p), ey = lerp(476, 600, p), sag = lerp(90, 20, p);
    attr(rope, 'd', `M430,476 Q${((430 + ex) / 2).toFixed(1)},${(476 + sag + (ey - 476) / 2).toFixed(1)} ${ex.toFixed(1)},${ey.toFixed(1)}`);
  };
  g.rope(0);
  return g;
}

function sfStallBg(parent, w, h) {
  const g = G(parent);
  E('rect', { x: -w / 2, y: -h / 2, width: w, height: h, fill: '#EAF4EE' }, g);
  let tiles = '';
  for (let x = -w / 2; x <= w / 2; x += 40) tiles += `M${x},${-h / 2} L${x},${h / 2} `;
  for (let y = -h / 2; y <= h / 2; y += 40) tiles += `M${-w / 2},${y} L${w / 2},${y} `;
  E('path', { d: tiles, stroke: '#C9DCD2', 'stroke-width': 2 }, g);
  E('rect', { x: -w / 2, y: -h / 2, width: w, height: h * 0.2, fill: '#C62828' }, g);
  T(g, 0, -h / 2 + h * 0.14, "ROSE'S KITCHEN", { size: Math.round(h * 0.11), weight: 800, anchor: 'middle', fill: '#FFE45C' });
  E('rect', { x: -w / 2, y: h * 0.3, width: w, height: h * 0.2, fill: '#9AA6B2' }, g);
  return g;
}
function sfRoseCall(parent, w, h, label) {
  const g = scVideoCall(parent, w, h, label || "Auntie Rose · Rose's Kitchen, downstairs");
  g.bg = sfStallBg(g.screen, w, h);
  const holder = G(g.screen); tr(holder, w * 0.06, h * 0.2);
  g.rose = cast(holder, 'rose', { s: h / 250, prop: null });   // far too close to the camera
  return g;
}

function sfSpace(parent) {
  const g = G(parent);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#05060F', '#0E1430', true) }, g);
  const r = rng(31);
  let st = '';
  for (let i = 0; i < 160; i++) { const x = r() * 1200, y = r() * 750, s = 0.8 + r() * 1.8; st += `M${x.toFixed(0)},${y.toFixed(0)} m-${s.toFixed(1)},0 a${s.toFixed(1)},${s.toFixed(1)} 0 1 0 ${(2 * s).toFixed(1)},0 a${s.toFixed(1)},${s.toFixed(1)} 0 1 0 -${(2 * s).toFixed(1)},0 `; }
  E('path', { d: st, fill: '#FFFFFF', opacity: 0.7 }, g);
  const tw = [];
  for (let i = 0; i < 8; i++) tw.push(E('circle', { cx: r() * 1200, cy: r() * 700, r: 3, fill: '#FFF7C2' }, g));
  // the Sun, off the left edge
  E('circle', { cx: -40, cy: 380, r: 300, fill: glow('#FFC247'), opacity: 0.7 }, g);
  E('circle', { cx: -60, cy: 380, r: 200, fill: ball('#FFE45C', '#FF8A3D'), stroke: '#FFB020', 'stroke-width': 6 }, g);
  g.sun = [80, 380];
  // the Earth and the Moon
  E('circle', { cx: 520, cy: 400, r: 34, fill: ball('#4CC9F0', '#1D5FA6'), stroke: '#0E2A4A', 'stroke-width': 3 }, g);
  E('path', { d: 'M500,388 q10,-14 24,-6 q8,10 -4,16 q-14,4 -20,-10 Z M522,414 q12,-4 18,6 q-8,10 -18,-6 Z', fill: '#56D69B' }, g);
  g.earth = [520, 400];
  E('circle', { cx: 600, cy: 360, r: 10, fill: ball('#E6EBEF', '#8F9CAB') }, g);
  g.moon = [600, 360];
  // Neptune, far right
  E('circle', { cx: 1110, cy: 400, r: 46, fill: ball('#7FA8FF', '#2A3FA0'), stroke: '#1A2660', 'stroke-width': 3 }, g);
  E('path', { d: 'M1070,392 Q1110,384 1150,392', fill: 'none', stroke: '#B9CCFF', 'stroke-width': 4, opacity: 0.6 }, g);
  g.neptune = [1110, 400];
  g.upd = t => tw.forEach((s, i) => op(s, 0.3 + 0.7 * wave(t, 1.6 + i * 0.3, i * 0.17)));
  return g;
}

function sfScope(parent, r) {
  r = r || 220;
  const g = G(parent);
  E('circle', { r: r + 40, fill: '#15181C', stroke: '#3A4048', 'stroke-width': 8 }, g);
  E('circle', { r, fill: '#F6F1DE' }, g);
  const id = 'sfscope' + Math.round(r);
  const cp = E('clipPath', { id }, defs()); E('circle', { r }, cp);
  const inner = G(g, { 'clip-path': `url(#${id})` });
  const sub = {};
  // ladybird
  sub.ladybird = G(inner); sfLadybird(sub.ladybird, r / 50);
  // pollen: a spiky ball
  sub.pollen = G(inner);
  let sp = '';
  for (let i = 0; i < 28; i++) { const a = i / 28 * TAU; sp += `M${(Math.cos(a) * r * 0.42).toFixed(1)},${(Math.sin(a) * r * 0.42).toFixed(1)} L${(Math.cos(a + 0.06) * r * 0.58).toFixed(1)},${(Math.sin(a + 0.06) * r * 0.58).toFixed(1)} L${(Math.cos(a + 0.12) * r * 0.42).toFixed(1)},${(Math.sin(a + 0.12) * r * 0.42).toFixed(1)} `; }
  E('path', { d: sp, fill: '#F2B33C', stroke: '#9C6B1E', 'stroke-width': 3 }, sub.pollen);
  E('circle', { r: r * 0.44, fill: ball('#FFD86B', '#D99A1E'), stroke: '#9C6B1E', 'stroke-width': 4 }, sub.pollen);
  // red blood cells
  sub.cell = G(inner);
  [[-0.35, -0.25, 0.3], [0.3, -0.1, 0.34], [-0.1, 0.38, 0.28], [0.42, 0.45, 0.22]].forEach(([x, y, k]) => {
    E('ellipse', { cx: x * r, cy: y * r, rx: k * r, ry: k * r * 0.86, fill: '#E8424F', stroke: '#8E1B2A', 'stroke-width': 4 }, sub.cell);
    E('ellipse', { cx: x * r, cy: y * r, rx: k * r * 0.45, ry: k * r * 0.38, fill: '#B8283A' }, sub.cell);
  });
  E('circle', { r, fill: 'none', stroke: '#000000', 'stroke-width': 18, opacity: 0.25 }, g);
  g.show = (kind, p) => { for (const k in sub) op(sub[k], k === kind ? clamp(p) : 0); };
  g.show('pollen', 1);
  return g;
}

/* ---------- props ---------- */
function sfLadybird(parent, s) {
  const g = G(parent); tr(g, 0, 0, s || 1);
  E('path', { d: 'M-6,-30 Q-14,-44 -22,-46 M6,-30 Q14,-44 22,-46', fill: 'none', stroke: SC_INK, 'stroke-width': 3, 'stroke-linecap': 'round' }, g);
  E('path', { d: 'M-30,-10 L-40,-14 M-32,6 L-42,8 M-28,20 L-36,28 M30,-10 L40,-14 M32,6 L42,8 M28,20 L36,28', stroke: SC_INK, 'stroke-width': 3, 'stroke-linecap': 'round' }, g);
  E('ellipse', { cx: 0, cy: 6, rx: 32, ry: 28, fill: '#E8424F', stroke: SC_INK, 'stroke-width': 3.5 }, g);
  E('path', { d: 'M0,-20 L0,34', stroke: SC_INK, 'stroke-width': 3 }, g);
  [[-14, 0], [14, 0], [-12, 18], [13, 18], [0, 30]].forEach(([x, y]) => E('circle', { cx: x, cy: y, r: 5, fill: SC_INK }, g));
  E('circle', { cx: 0, cy: -24, r: 14, fill: SC_INK }, g);
  E('circle', { cx: -5, cy: -27, r: 3.5, fill: '#FFFFFF' }, g);
  E('circle', { cx: 5, cy: -27, r: 3.5, fill: '#FFFFFF' }, g);
  return g;
}
function sfJar(parent, s) {
  const g = G(parent), inner = G(g); tr(inner, 0, 0, s || 1);
  E('path', { d: 'M-46,-110 L46,-110 L52,-90 L52,-12 Q52,0 40,0 L-40,0 Q-52,0 -52,-12 L-52,-90 Z', fill: 'rgba(220,240,255,0.35)', stroke: '#5A6670', 'stroke-width': 4, 'stroke-linejoin': 'round' }, inner);
  E('path', { d: 'M-20,-30 Q0,-60 20,-30 M-10,-20 L-14,-6 M10,-20 L14,-6', fill: 'none', stroke: '#2FA36B', 'stroke-width': 4 }, inner);   // a leaf
  g.spotty = G(inner); tr(g.spotty, 0, -50); sfLadybird(g.spotty, 0.6);
  E('rect', { x: -52, y: -130, width: 104, height: 24, rx: 6, fill: '#E8424F', stroke: '#8E1B2A', 'stroke-width': 3 }, inner);
  E('path', { d: 'M-24,-118 h4 M-4,-118 h4 M16,-118 h4', stroke: '#2A1A22', 'stroke-width': 5, 'stroke-linecap': 'round' }, inner);
  E('path', { d: 'M-38,-96 L-36,-20', stroke: '#FFFFFF', 'stroke-width': 5, opacity: 0.5, 'stroke-linecap': 'round' }, inner);
  return g;
}
function sfRice(parent, s) {
  const g = G(parent), inner = G(g); tr(inner, 0, 0, s || 1);
  E('path', { d: 'M-56,-140 Q-60,-150 -50,-150 L50,-150 Q60,-150 56,-140 L62,-10 Q62,0 50,0 L-50,0 Q-62,0 -62,-10 Z', fill: '#FFFDF6', stroke: '#5A6670', 'stroke-width': 4, 'stroke-linejoin': 'round' }, inner);
  E('path', { d: 'M-56,-140 L56,-140', stroke: '#C62828', 'stroke-width': 8 }, inner);
  T(inner, 0, -94, 'RICE', { size: 34, weight: 800, anchor: 'middle', fill: '#C62828' });
  E('ellipse', { cx: -16, cy: -66, rx: 8, ry: 4, fill: '#E9DFC4', stroke: '#9C8A6A', 'stroke-width': 1.5, transform: 'rotate(-20 -16 -66)' }, inner);
  E('ellipse', { cx: 0, cy: -60, rx: 8, ry: 4, fill: '#E9DFC4', stroke: '#9C8A6A', 'stroke-width': 1.5 }, inner);
  E('ellipse', { cx: 16, cy: -66, rx: 8, ry: 4, fill: '#E9DFC4', stroke: '#9C8A6A', 'stroke-width': 1.5, transform: 'rotate(20 16 -66)' }, inner);
  E('rect', { x: -38, y: -44, width: 76, height: 32, rx: 6, fill: '#FFE45C', stroke: '#9C8A6A', 'stroke-width': 2 }, inner);
  T(inner, 0, -20, '1 kg', { size: 24, weight: 800, anchor: 'middle', fill: SC_INK });
  return g;
}
function sfPiggy(parent, s) {
  const g = G(parent), inner = G(g); tr(inner, 0, 0, s || 1);
  [-34, 30].forEach(x => E('rect', { x: x - 9, y: -26, width: 18, height: 26, rx: 5, fill: '#F28CB0', stroke: SC_INK, 'stroke-width': 3 }, inner));
  E('ellipse', { cx: 0, cy: -60, rx: 66, ry: 48, fill: ball('#FFB6CF', '#E0628E'), stroke: SC_INK, 'stroke-width': 4 }, inner);
  E('path', { d: 'M-40,-100 L-30,-122 L-18,-104 Z', fill: '#F28CB0', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, inner);
  E('ellipse', { cx: -66, cy: -58, rx: 14, ry: 18, fill: '#F28CB0', stroke: SC_INK, 'stroke-width': 3 }, inner);
  E('circle', { cx: -70, cy: -62, r: 3, fill: SC_INK }, inner); E('circle', { cx: -64, cy: -52, r: 3, fill: SC_INK }, inner);
  E('circle', { cx: -40, cy: -76, r: 5, fill: SC_INK }, inner);
  E('path', { d: 'M66,-62 q16,-6 10,-18 q-8,-6 -6,6', fill: 'none', stroke: SC_INK, 'stroke-width': 3 }, inner);
  E('rect', { x: -6, y: -110, width: 36, height: 8, rx: 4, fill: SC_INK }, inner);   // coin slot
  const coins = [];
  for (let i = 0; i < 6; i++) { const c2 = G(inner); tr(c2, 100, -10 - i * 9); E('ellipse', { rx: 22, ry: 8, fill: '#C9D3DC', stroke: '#5A6670', 'stroke-width': 2.5 }, c2); coins.push(c2); }
  g.coins = k => coins.forEach((c2, i) => op(c2, clamp(k - i)));
  g.coins(0);
  return g;
}
function sfPhone(parent, o) {
  o = o || {};
  const g = G(parent);
  E('rect', { x: -110, y: -200, width: 220, height: 400, rx: 30, fill: '#1E2630', stroke: SC_INK, 'stroke-width': 5 }, g);
  E('rect', { x: -90, y: -165, width: 180, height: 330, rx: 10, fill: '#F4F7FA' }, g);
  E('rect', { x: -26, y: -188, width: 52, height: 10, rx: 5, fill: '#3A4650' }, g);
  g.screen = G(g);
  if (o.screen === 'storage') {
    T(g.screen, 0, -110, 'Storage', { size: 28, weight: 800, anchor: 'middle', fill: SC_INK });
    E('rect', { x: -70, y: -80, width: 140, height: 26, rx: 13, fill: '#E6EBEF', stroke: '#8C98A4', 'stroke-width': 2 }, g.screen);
    E('rect', { x: -70, y: -80, width: 136, height: 26, rx: 13, fill: '#E8424F' }, g.screen);
    T(g.screen, 0, -14, '256 GB', { size: 38, weight: 800, anchor: 'middle', fill: SC_INK });
    T(g.screen, 0, 40, 'FULL', { size: 44, weight: 800, anchor: 'middle', fill: '#E8424F' });
    T(g.screen, 0, 90, 'delete photos?', { size: 20, weight: 600, anchor: 'middle', fill: '#5A6670', font: FB });
  } else if (o.screen === 'video') {
    E('rect', { x: -90, y: -165, width: 180, height: 180, fill: '#C62828' }, g.screen);
    T(g.screen, 0, -100, "ROSE'S", { size: 30, weight: 800, anchor: 'middle', fill: '#FFE45C' });
    T(g.screen, 0, -64, 'KITCHEN', { size: 30, weight: 800, anchor: 'middle', fill: '#FFE45C' });
    E('path', { d: 'M-18,-40 L22,-18 L-18,4 Z', fill: '#FFFFFF', opacity: 0.9 }, g.screen);
    T(g.screen, 0, 56, 'views', { size: 24, weight: 700, anchor: 'middle', fill: '#5A6670', font: FB });
    g.views = G(g.screen); tr(g.views, 0, 110);
  }
  return g;
}
function sfCard(parent, o) {
  o = o || {};
  const g = G(parent), inner = G(g), col = o.col || '#2E4C8C';
  const glowR = E('rect', { x: -138, y: -182, width: 276, height: 364, rx: 24, fill: 'none', stroke: '#FFE45C', 'stroke-width': 12, opacity: 0 }, inner);
  E('rect', { x: -125, y: -170, width: 250, height: 340, rx: 18, fill: col, stroke: SC_INK, 'stroke-width': 5 }, inner);
  E('rect', { x: -110, y: -155, width: 220, height: 310, rx: 10, fill: '#FFFDF6' }, inner);
  E('rect', { x: -110, y: -155, width: 220, height: 40, rx: 10, fill: scShade(col, 0.15) }, inner);
  T(inner, 0, -126, 'SPACE TRUMPS', { size: 20, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 2 });
  if (o.title) T(inner, 0, -86, o.title, { size: 22, weight: 800, anchor: 'middle', fill: SC_INK });
  const art = G(inner); tr(art, 0, -10);
  E('rect', { x: -90, y: -60, width: 180, height: 120, rx: 8, fill: '#0E1430' }, art);
  const a = o.art || 'planet';
  if (a === 'planet') { E('circle', { r: 40, fill: ball('#7FA8FF', '#2A3FA0') }, art); E('ellipse', { rx: 62, ry: 12, fill: 'none', stroke: '#FFE29A', 'stroke-width': 4 }, art); }
  else if (a === 'star') E('circle', { r: 44, fill: ball('#FFE45C', '#FF8A3D') }, art);
  else if (a === 'moon') { E('circle', { r: 40, fill: ball('#E6EBEF', '#8F9CAB') }, art); E('circle', { cx: -12, cy: -8, r: 8, fill: '#B9C3CC' }, art); }
  else if (a === 'bug') { E('rect', { x: -90, y: -60, width: 180, height: 120, rx: 8, fill: '#CFEFD6' }, art); sfLadybird(art, 1.1); }
  else if (a === 'cell') { E('rect', { x: -90, y: -60, width: 180, height: 120, rx: 8, fill: '#FFE6E6' }, art); E('ellipse', { rx: 44, ry: 38, fill: '#E8424F', stroke: '#8E1B2A', 'stroke-width': 4 }, art); E('ellipse', { rx: 20, ry: 16, fill: '#B8283A' }, art); }
  if (o.src) mkMath(inner, 0, 118, o.src, { size: o.size || 42, fill: MK.ink, anchor: 'middle' });
  const corner = E('path', { d: 'M125,130 L125,170 L85,170 Z', fill: '#E6EBEF', stroke: SC_INK, 'stroke-width': 3, opacity: 0 }, inner);
  g.hl = p => op(glowR, clamp(p));
  g.bent = p => op(corner, clamp(p));
  return g;
}
function sfCalc(parent, o) {
  o = o || {};
  const g = mkCalculator(parent, { text: ' ' });
  E('rect', { x: -110, y: -178, width: 220, height: 72, rx: 8, fill: SF.lcd, stroke: '#1E2A22', 'stroke-width': 3 }, g);   // cover the text display
  const s = sfSeg(g, o.text || '0', { h: 42, col: SF.lcdInk, dim: 'rgba(30,42,30,0.06)', max: 9, anchor: 'end' }); tr(s, 98, -142);
  g.set = str => s.set(str);
  return g;
}

/* ---------- the place-value grid ---------- */
const SF_PVNAME = { 6: '1 000 000', 5: '100 000', 4: '10 000', 3: '1000', 2: '100', 1: '10', 0: '1', '-1': '0.1', '-2': '0.01', '-3': '0.001', '-4': '0.0001', '-5': '0.00001' };
function sfPVGrid(parent, o) {
  o = o || {};
  const from = o.from === undefined ? 3 : o.from, to = o.to === undefined ? -4 : o.to, cell = o.cell || 92;
  const nRows = o.rows || 2, rh = cell * 1.1, ink = o.ink || MK.ink, size = o.size || 26, headH = o.head === 'both' ? 92 : 56;
  const g = G(parent), n = from - to + 1, W = n * cell;
  const H = headH + nRows * rh + 12;
  E('rect', { x: -10, y: -10, width: W + 20, height: H + 10, rx: 14, fill: 'rgba(255,253,246,0.92)', stroke: '#8FA3B8', 'stroke-width': 3 }, g);
  g.x = pw => (from - pw) * cell + cell / 2;
  // header
  for (let pw = from; pw >= to; pw--) {
    const x = g.x(pw), whole = pw >= 0;
    E('rect', { x: x - cell / 2, y: 0, width: cell, height: headH - 6, fill: whole ? '#C7D2FE' : '#BBF7D0', stroke: ink, 'stroke-width': 2 }, g);
    if (o.head === 'power') mkMath(g, x, headH * 0.7, pw < 0 ? `10^(${pw})` : `10^${pw}`, { size, fill: ink, anchor: 'middle' });
    else if (o.head === 'both') { mkMath(g, x, 34, pw < 0 ? `10^(${pw})` : `10^${pw}`, { size: size - 2, fill: ink, anchor: 'middle' }); T(g, x, 72, SF_PVNAME[pw] || '', { size: Math.min(size - 4, 22), weight: 700, anchor: 'middle', fill: ink }); }
    else T(g, x, headH * 0.62, SF_PVNAME[pw] || '', { size: SF_PVNAME[pw] && SF_PVNAME[pw].length > 5 ? size - 6 : size, weight: 700, anchor: 'middle', fill: ink });
  }
  // column guides
  let gd = '';
  for (let k = 0; k <= n; k++) gd += `M${k * cell},${headH} L${k * cell},${H - 8} `;
  E('path', { d: gd, stroke: '#C9D3DC', 'stroke-width': 2 }, g);
  g.rowY = i => headH + rh * i + rh / 2;
  g.W = W; g.H = H; g.cell = cell;
  g.pointX = g.x(0) + cell / 2;
  // the decimal point: a red dashed line that never moves, with a dot on each row
  E('path', { d: `M${g.pointX},${headH - 4} L${g.pointX},${H - 8}`, stroke: '#E8424F', 'stroke-width': 4, 'stroke-dasharray': '10 8' }, g);
  for (let i = 0; i < nRows; i++) E('circle', { cx: g.pointX, cy: g.rowY(i) + cell * 0.3, r: 8, fill: '#E8424F' }, g);
  const layer = G(g);
  g.num = (str, row, no) => {
    no = no || {};
    const s = String(str), dp = s.indexOf('.') < 0 ? s.length : s.indexOf('.');
    const digits = s.replace('.', '');
    const r = G(layer), slide = G(r); r.tiles = [];
    const firstNZ = digits.search(/[1-9]/);
    for (let i = 0; i < digits.length; i++) {
      const pw = dp - 1 - i;     // the place value of this digit
      const ch = digits[i];
      const lead = ch === '0' && pw === 0 && i < firstNZ;   // the 0 in 0.347 (not a place-holder: it is just the ones digit)
      const holder = no.holders !== false && ch === '0' && !lead;   // every other zero holds a place
      const x = g.x(pw), y = g.rowY(row);
      const tg = G(slide);
      E('rect', { x: x - cell / 2 + 6, y: y - rh / 2 + 6, width: cell - 12, height: rh - 12, rx: 10, fill: holder ? SF.holder : lead ? '#EEF2F6' : (no.col || SF.tile), stroke: holder ? SF.holderInk : ink, 'stroke-width': holder ? 3.5 : 2.5 }, tg);
      T(tg, x, y + cell * 0.2, ch, { size: cell * 0.56, weight: 800, anchor: 'middle', fill: holder ? SF.holderInk : ink });
      r.tiles.push(tg);
    }
    r.set = p => op(r, clamp(p));
    r.shift = k => tr(slide, -k * cell, 0);
    r.set(1);
    return r;
  };
  return g;
}

/* ---------- the floor chart ---------- */
const SF_FLOORNAME = { 6: 'millions', 5: 'hundred thousands', 4: 'ten thousands', 3: 'thousands', 2: 'hundreds', 1: 'tens', 0: 'ones', '-1': 'tenths', '-2': 'hundredths', '-3': 'thousandths', '-4': 'ten-thousandths' };
const SF_FLOORVAL = { 6: '1 000 000', 5: '100 000', 4: '10 000', 3: '1000', 2: '100', 1: '10', 0: '1', '-1': '0.1', '-2': '0.01', '-3': '0.001', '-4': '0.0001' };
function sfFloors(parent, o) {
  o = o || {};
  const top = o.top === undefined ? 3 : o.top, bot = o.bottom === undefined ? -3 : o.bottom, rowH = o.rowH || 60, w = o.w || 620, size = o.size || 34;
  const ink = o.ink || MK.ink, g = G(parent), n = top - bot + 1, H = n * rowH;
  g.y = k => (top - k) * rowH + rowH / 2;
  // shaft background
  E('rect', { x: -14, y: -14, width: w + 28, height: H + 28, rx: 16, fill: '#E9EEF2', stroke: '#7D8A96', 'stroke-width': 4 }, g);
  E('rect', { x: 0, y: g.y(0) + rowH / 2, width: w, height: (0 - bot) * rowH, fill: '#D6DCE2' }, g);   // the basements
  const rows = {}, hls = {};
  for (let k = top; k >= bot; k--) {
    const y = g.y(k), rg = G(g);
    hls[k] = E('rect', { x: 4, y: y - rowH / 2 + 4, width: w - 8, height: rowH - 8, rx: 10, fill: '#FFE45C', opacity: 0 }, g);
    g.insertBefore(hls[k], rg);
    const btn = G(rg); tr(btn, 70, y);
    E('rect', { x: -56, y: -rowH / 2 + 8, width: 112, height: rowH - 16, rx: (rowH - 16) / 2, fill: k === 0 ? '#FFE9A8' : '#FFFFFF', stroke: '#5A6670', 'stroke-width': 3 }, btn);
    mkMath(btn, 0, size * 0.36, k < 0 ? `10^(${k})` : `10^${k}`, { size, fill: ink, anchor: 'middle' });
    const vg = G(rg);
    mkMath(vg, 150, y + size * 0.36, `"${SF_FLOORVAL[k] || ''}"`, { size, fill: k < 0 ? '#1E7A4A' : k === 0 ? '#B8862E' : '#2E4C8C', anchor: 'start' });
    T(vg, w - 16, y + 9, (k === 0 ? 'G · ' : k < 0 ? 'B' + (-k) + ' · ' : '') + (SF_FLOORNAME[k] || ''), { size: 24, weight: 700, anchor: 'end', fill: '#5A6670', font: FB });
    rows[k] = { rg, vg };
  }
  E('path', { d: `M0,${g.y(0) + rowH / 2} L${w},${g.y(0) + rowH / 2}`, stroke: '#5A6670', 'stroke-width': 4, 'stroke-dasharray': '12 8' }, g);
  // ÷ 10 steps on the left
  const steps = G(g);
  for (let k = top; k > bot; k--) {
    const a = arrow(steps, -24, g.y(k) + 6, -24, g.y(k - 1) - 6, { color: '#E8424F', width: 4, bend: -18 });
    a.set(1);
  }
  T(steps, -48, g.y(0) + 9, '÷ 10', { size: 26, weight: 800, anchor: 'end', fill: '#E8424F' });
  // the lift car
  const car = G(g);
  E('rect', { x: -22, y: -24, width: 44, height: 48, rx: 6, fill: '#FFB020', stroke: SC_INK, 'stroke-width': 3 }, car);
  E('path', { d: 'M0,-24 L0,-60', stroke: '#5A6670', 'stroke-width': 3 }, car);
  g.row = (k, p) => { if (rows[k]) { op(rows[k].rg, clamp(p)); } };
  g.val = (k, p) => { if (rows[k]) op(rows[k].vg, clamp(p)); };
  g.hl = (k, p) => { if (hls[k]) op(hls[k], 0.75 * clamp(p)); };
  g.steps = p => op(steps, clamp(p));
  g.car = pos => { if (pos > top + 0.01 || pos < bot - 0.01) op(car, 0); else { op(car, 1); tr(car, w + 50, g.y(pos)); } };
  g.W = w; g.H = H;
  g.car(-99);
  return g;
}
