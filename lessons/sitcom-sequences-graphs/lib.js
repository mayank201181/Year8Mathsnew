/* WHAT COMES NEXT? (Claude Sitcom Ep 11, Sequences & Functions): the cast, sets and props of this episode.
   Bundled after engine lib.js, kit.js, mathkit.js and sitcom.js (scMake, scTalk, scKavya, scCastHuman,
   scConfessional, scLowerThird, scVideoCall, mk* maths kit). Every top-level name starts with `nx` or `NX_`,
   except `cast`.

   Characters: cast(parent, kind, o) -> g, origin at the character's centre, about 200-240 px tall at s = 1
     o: { s (scale), mood (default mood), ... }   (humans: any scHuman option overrides, e.g. prop, lift)
     g.set({ t, talk, mood, look, sweat, still, ... })   call every frame
       talk 0..1 (use scTalk(S, t, who)); mood: neutral | happy | smug | annoyed | sad | shock | deadpan
       look -1..1 pupils left/right; still: true stops the idle bob
     HUMANS (busts, bottom of the shirt at y = 140: put them behind the railing, the sweets table or a frame edge):
       'kavya'  (kavya)  Kavya, 12 (scKavya, PE shirt "8")
       'mum'    (mum)    Mum: magenta kurta, bun, bindi. Default prop: her phone (the Deepavali greeting)
       'dad'    (dad)    Dad: glasses, moustache, a festive BLUE KURTA for Deepavali. Default: an empty hand
                         (draw a prop into g.hand, e.g. nxHandProp(dad.hand, 'coil') for the fairy lights)
       'boy'    (boy)    Ah Boy, 8: an ORANGE KURTA today. Default: an empty hand (lift: 1 raises it)
       'priya'  (priya)  Priya, 12: school uniform, bob, yellow clip. Default prop: a pencil
       'tan'    (tan)    Mr Tan, maths teacher, lives one floor up: shirt and tie, glasses. Default: empty hand
       'paati'  (paati)  Paati, Kavya's grandmother: silver bun with jasmine, round gold glasses, green kurta, bindi.
                         Default: an empty hand
       'rose'   (rose)   Auntie Rose (hawker stall downstairs): curly perm, floral blouse. Default: empty hand
       Pass { prop: 'phone' } etc. for a kit prop; { body: true } for a full body (scHumanBody, pose API).
     nxHandProp(hand, kind)  draws an episode prop into a human's g.hand (grip at 0,0):
                         'coil' (a coil of fairy lights), 'sticks' (a fan of ice-cream sticks), 'tin' (murukku tin),
                         'laddoos' (a box of laddoos), 'sunflowers', 'remote' (the NEXTA-LITE controller)
     CARTOONS (scMake):
       'nexta'  (nexta)  Madame Nexta, the TERM-TO-TERM RULE: a fortune teller. Purple turban with a gold jewel and a
                         feather, lavender face, gold hoops, teal shawl with stars, hands over a crystal ball. She sees
                         the NEXT term, only the next term. Default mood smug. Extra: g.set({ ball: 'text' (the number
                         in the ball; '' for mist), glow: 0..1 (ball glow), hands: 0..1 (mystic hand wave) })
       'enn'    (enn)    Enn, little n, the POSITION: a royal-blue lowercase "n" (an arch on two legs) dressed as a
                         cinema usher: red pillbox cap, gold bow tie, a torch. Strict, quick. Default mood neutral.
                         Extra: { torch: 0..1 (beam on), point: 0..1 (torch arm swings out to point right) }
       'zed'    (zed)    Zed, the ZERO TERM: a pale, see-through grey "0" in a drooping paper party hat, holding an
                         unlit sparkler. One step before every sequence; nobody invites him. Default mood sad.
                         Extra: { invited: 0..1 (colour floods in: gold, hat perks up, sparkler lit) }
       'mac'    (mac)    Mac, the FUNCTION MACHINE: a teal steel cabinet with an INPUT hopper, two operation windows,
                         a screen face, an OUTPUT chute with a tray, little legs in striped SOCKS and red SHOES.
                         Default mood deadpan. Extra: { ops: ['× 4', '− 3'] (window texts; changing text is cheap),
                         hl: -1 | 0 | 1 (lights a window), rev: 0..1 (the arrows between windows point backwards),
                         shoes: 0..1 (1 on; 0 off and gone), socks: 0..1, out: 'text' (a ticket in the output tray, '' none) }

   Shots
     nxConf(parent, who)             confessional background tinted for that character (scConfessional); g.set(p, t)
     NX_TINT                         confessional colours per character
     nxLowerThird(parent, who)       scLowerThird with this episode's name and role for `who` (NX_LT); g.set(p)

   Sets (full stage 1200 x 750; each returns g)
     nxCorridor(parent)   the 8th-floor common corridor of Block 208 outside #08-14, from the corridor: cream wall,
                          the flat's door (left, x 130-330) with a mango-leaf toran and a brass "#08-14", a window with
                          grilles, a shoe rack, potted plants; a string of fairy lights along the wall (g.lights, an
                          nxLights, y about 150), the NEXTA-LITE controller box on the wall (g.box, at g.boxXY), and
                          the corridor RAILING in front (top at g.railY = 545). LAYERS: characters in g.mid (a bust at
                          y about 450 hides its hem), the railing is g.front, props on the railing in g.top.
                          g.upd(t, night) (night 0..1 darkens the sky beyond the railing and the corridor).
     nxLiving(parent)     the flat's living room: pastel wall, window (afternoon/night sky), framed family photo, a
                          brass lamp stand, marigold garland over the window, a sofa back; the SWEETS TABLE in front
                          (table top at g.tableY = 540, white cloth with a gold border). Layers g.mid / g.front / g.top
                          as above. g.upd(t, night).
     nxFloor(parent)      top-down view of the corridor floor for the kolam: grey-beige tiles, the door threshold
                          at the top (y 0-70) with two diyas. g.upd(t)
     nxBoxStage(parent)   the inside of the controller box as a tiny theatre (red curtains, a star-cloth table, top
                          of the table at y 560): full stage. g.curtain(p) opens the curtains (0 closed, 1 open);
                          g.curt is the curtain group (append it to a layer in front of the characters).

   Props (around their own origin)
     nxLights(parent, o)             fairy lights: a wire with n bulbs from x0 to x1 at y (gentle sag). o: { n (24), x0
                                     (40), x1 (1160), y (150), sag (26), r (11), gold (i => bool: gold bulbs, 0-based),
                                     cols }. g.set(t, mode, p): 'on' | 'off' | 'ripple' (a wave runs along) | 'bzzt'
                                     (p 0..1: flicker then dark) | 'gold' (only gold bulbs lit) | 'chase' (p = how many
                                     bulbs lit, in order). g.bulbs[i] = [x, y]. g.mark(i, text) adds a small number tag
                                     under bulb i (returns it; op() it).
     nxBox(parent)                   the NEXTA-LITE / PATTERN MODE controller: a grey box about 150 x 110 with a
                                     crystal-ball logo, a red button and an LED. g.set(led 0..1)
     nxSticks(parent, n, o)          a row of n ice-cream-stick squares, origin = bottom-left. o: { cell (64) }.
                                     g.set(k, hl) shows k squares (fractions grow the next stick by stick); hl 0..1
                                     colours the 3 NEW sticks of each square orange and the first upright stick gold.
                                     g.w (width for n squares)
     nxDiya(parent, s)               clay oil lamp with a flame, base centre (0,0). g.set(t, lit 0..1)
     nxKolam(parent, n, o)           pulli kolam: an n x n square of white dots with ONE lamp (a small diya) just
                                     below it (so n² + 1 things to count), the dots centred on (0,0). o: { gap (34), lamp (true), col (dot colour) }.
                                     g.set(p) reveals the dots row by row; g.L(p) rings the newest L (the last row and
                                     column) in gold; g.lamp(t, lit); g.w
     nxMurukku(parent, s)            a murukku spiral, centred, about 70 wide
     nxTin(parent, o)                a round murukku tin, base centre, about 150 wide. g.set(k 0..1 level)
     nxLaddoo(parent, s)             one laddoo (orange ball), centred, r about 16
     nxLaddooStack(parent, rows, o)  a triangular stack of laddoos (rows on the bottom, 1 on top), base centre at (0,0).
                                     o: { r (15) }. g.set(k) shows the first k rows from the bottom; g.h
     nxSunflower(parent, s)          a sunflower head with spiral seeds, centred, about 120 wide
     nxPhone(parent, o)              a big phone with a chat: header 'Family', a gold "Happy Deepavali!" bubble.
                                     Centred, 260 x 440. o: { title }. g.set(text) sets the forward counter line
     nxTaxiMeter(parent)             a taxi meter, centred, 300 x 130: 'FARE $' + digits. g.set(str)
     nxStamp(parent, ok)             mkStamp 'PATTERN FOUND' (green, ok true) or 'PATTERN BROKEN' (red); g.set(p).
                                     About 700 px wide at scale 1: scale the returned g (tr(g, x, y, 0.55)).
     nxSparkle(parent, r)            a gold sparkle star with .upd(t) (spark() in gold)
*/

/* ---------- colours, confessional tints, lower thirds ---------- */
const NX_COL = { gold: '#FFC93C', marigold: '#FF9F1C', magenta: '#B8336A', purple: '#6A3CD8', teal: '#1FA38A', cream: '#FFF6E0', night: '#141B3A' };
const NX_TINT = {
  nexta: ['#2A1240', '#55257A'], enn: ['#10203F', '#1F3F7A'], zed: ['#22262C', '#454C56'], mac: ['#0E2C2A', '#1E5A54'],
  kavya: ['#14243A', '#25446B'], mum: ['#3A1030', '#6B1E58'], dad: ['#12263A', '#244A6E'], boy: ['#3A2410', '#6B4414'],
  priya: ['#1A2240', '#33407A'], tan: ['#1A2A3A', '#33506E'], paati: ['#14301E', '#2E5A3A'], rose: ['#3A1424', '#6E2A44'],
};
function nxConf(parent, who) { const c = NX_TINT[who] || NX_TINT.nexta; return scConfessional(parent, c[0], c[1]); }
const NX_LT = {
  nexta: ['MADAME NEXTA', 'Term-to-term rule. Sees the next term.'],
  enn: ['ENN', 'Little n. The position. Usher.'],
  zed: ['ZED', 'The zero term. Not invited.'],
  mac: ['MAC', 'Function machine. One input, one output.'],
  kavya: ['KAVYA, 12', 'Five hours to the open house.'],
  mum: ['MUM', 'Host. Seven o\'clock sharp.'],
  dad: ['DAD', '"I have a system."'],
  boy: ['AH BOY, 8', "Kavya's brother. Asks the big ones."],
  priya: ['PRIYA', 'Best friend. Does not believe in fortune tellers.'],
  tan: ['MR TAN', 'Maths teacher. Lives upstairs.'],
  paati: ['PAATI', "Kavya's grandmother. Kolam expert."],
  rose: ['AUNTIE ROSE', "Rose's Kitchen, Blk 208"],
};
function nxLowerThird(parent, who) { const l = NX_LT[who] || [String(who).toUpperCase(), '']; return scLowerThird(parent, l[0], l[1]); }

/* ---------- humans ---------- */
const NX_PAATI = { name: 'PAATI', role: "Kavya's grandmother", age: 'senior', skin: SC_SKIN.brown, hair: 'bun', hairCol: SC_HAIR.silver,
  glasses: '#C9A227', frames: 'round', style: 'kurta', shirt: '#2E8B57', trim: '#F2C744', earrings: '#E2B33C', bindi: true, seed: 31 };
const NX_HUMAN = {
  mum: { prop: 'phone', propCol: '#FFE8A3' },
  dad: { style: 'kurta', shirt: '#2E6FB8', trim: '#F2C744', hand: true },
  boy: { style: 'kurta', shirt: '#F28C28', trim: '#FFE45C', hand: true },
  priya: { prop: 'pencil' },
  tan: { hand: true },
  rose: { hand: true },
};

function nxHandProp(hand, kind) {
  const g = G(hand), ink = SC_INK;
  if (kind === 'coil') {
    for (let i = 0; i < 4; i++) E('ellipse', { cx: 0, cy: -46 + i * 5, rx: 38 - i * 3, ry: 30, fill: 'none', stroke: '#2E7D4F', 'stroke-width': 3 }, g);
    ['#FF5A5A', '#FFC93C', '#56D69B', '#6EC8FF', '#FF8FC8', '#FFC93C'].forEach((c, i) => {
      const a = i / 6 * TAU; E('circle', { cx: Math.cos(a) * 36, cy: -46 + Math.sin(a) * 28, r: 6, fill: c, stroke: ink, 'stroke-width': 1.5 }, g);
    });
  } else if (kind === 'sticks') {
    for (let i = 0; i < 5; i++) { const s = G(g); tr(s, 0, 0, 1, -24 + i * 12); E('rect', { x: -6, y: -92, width: 12, height: 86, rx: 6, fill: '#F2D49B', stroke: '#9C7A3E', 'stroke-width': 2.5 }, s); }
  } else if (kind === 'tin') {
    const t = nxTin(g, { s: 0.55 }); tr(t, 0, 4, 0.55);
  } else if (kind === 'laddoos') {
    E('rect', { x: -56, y: -64, width: 112, height: 56, rx: 6, fill: '#FFF0C2', stroke: ink, 'stroke-width': 3 }, g);
    [-30, 0, 30].forEach(x => E('circle', { cx: x, cy: -70, r: 14, fill: ball('#FFB347', '#E8751A'), stroke: ink, 'stroke-width': 2 }, g));
    E('rect', { x: -56, y: -40, width: 112, height: 12, fill: '#B8336A' }, g);
  } else if (kind === 'sunflowers') {
    [[-26, -110, -12], [20, -124, 10], [0, -90, 0]].forEach(([x, y, r]) => {
      E('path', { d: `M0,0 L${x},${y + 30}`, stroke: '#2E8B57', 'stroke-width': 6 }, g);
      const f = nxSunflower(g, 0.42); tr(f, x, y, 0.42, r);
    });
  } else if (kind === 'remote') {
    const b = nxBox(g); tr(b, 0, -50, 0.5);
  }
  return g;
}

/* ---------- the cast ---------- */
function cast(parent, kind, o) {
  o = o || {};
  if (kind === 'kavya') return scKavya(parent, o);
  if (kind === 'paati') {
    const c = scHuman(parent, Object.assign({ hand: true }, NX_PAATI, o));
    // jasmine flowers round her bun
    const j = G(c.firstChild); tr(j, 0, -42 - 80);
    for (let k = 0; k < 7; k++) E('circle', { cx: -42 + k * 14, cy: Math.abs(k - 3) * 4, r: 6, fill: '#FFFFFF', stroke: '#C9D3DC', 'stroke-width': 1.5 }, j);
    c.who = 'paati'; c.name = 'PAATI';
    return c;
  }
  if (SC_HUMANS[kind]) return scCastHuman(parent, kind, Object.assign({}, NX_HUMAN[kind] || {}, o));
  const S = { s: o.s, mood: o.mood };
  let c;
  if (kind === 'nexta') {
    let ballT = null, ballG = null, mist = null, hands = [];
    c = scMake(parent, Object.assign(S, { seed: 6, bob: 4, mood: o.mood || 'smug',
      draw: g => {
        // shawl / body
        E('path', { d: 'M-120,150 Q-110,40 -40,22 L40,22 Q110,40 120,150 Z', fill: linGrad('#22B39A', '#0F6E60', true), stroke: SC_INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, g);
        [[-70, 90], [62, 70], [-20, 120], [86, 128], [-96, 132]].forEach(([x, y]) => E('path', { d: `M${x},${y - 9} L${x + 3},${y - 3} L${x + 9},${y} L${x + 3},${y + 3} L${x},${y + 9} L${x - 3},${y + 3} L${x - 9},${y} L${x - 3},${y - 3} Z`, fill: NX_COL.gold }, g));
        // neck and head
        E('rect', { x: -18, y: -6, width: 36, height: 34, fill: '#C7A6E8' }, g);
        E('ellipse', { cx: 0, cy: -48, rx: 66, ry: 70, fill: '#D5B8F2', stroke: SC_INK, 'stroke-width': 5 }, g);
        // gold hoops
        [-1, 1].forEach(s => E('circle', { cx: s * 66, cy: -16, r: 16, fill: 'none', stroke: NX_COL.gold, 'stroke-width': 6 }, g));
        // turban
        E('path', { d: 'M-74,-60 Q-86,-150 0,-152 Q86,-150 74,-60 Q40,-92 0,-90 Q-40,-92 -74,-60 Z', fill: linGrad('#8E44AD', '#5A1E7A', true), stroke: SC_INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, g);
        E('path', { d: 'M-70,-82 Q0,-130 70,-82 M-62,-108 Q0,-148 64,-104', fill: 'none', stroke: '#B07ADB', 'stroke-width': 5 }, g);
        E('path', { d: 'M8,-134 Q26,-196 64,-206 Q40,-170 20,-130 Z', fill: '#FF8FC8', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);   // feather
        E('path', { d: 'M0,-126 L14,-110 L0,-92 L-14,-110 Z', fill: '#2EC4B6', stroke: NX_COL.gold, 'stroke-width': 4 }, g);   // jewel
        // crystal ball on its gold stand, in front of the chest
        const bl = G(g); tr(bl, 0, 104);
        E('path', { d: 'M-40,36 L40,36 L30,18 L-30,18 Z', fill: NX_COL.gold, stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, bl);
        ballG = E('circle', { cx: 0, cy: -16, r: 46, fill: glow('#B9F3FF'), opacity: 0.5 }, bl);
        E('circle', { cx: 0, cy: -16, r: 38, fill: 'rgba(200,240,255,0.55)', stroke: '#5A6FB8', 'stroke-width': 4 }, bl);
        mist = E('path', { d: 'M-24,-10 Q-10,-30 6,-14 Q18,-2 26,-22', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 4, opacity: 0.8, 'stroke-linecap': 'round' }, bl);
        ballT = T(bl, 0, -3, '', { size: 36, weight: 800, anchor: 'middle', fill: '#3A1E7A' });
        E('ellipse', { cx: -14, cy: -36, rx: 9, ry: 5, fill: '#FFFFFF', opacity: 0.8 }, bl);
        // hands hovering at the sides of the ball
        [-1, 1].forEach(s => {
          const h = G(g); tr(h, s * 62, 86);
          E('ellipse', { cx: 0, cy: 0, rx: 15, ry: 19, fill: '#D5B8F2', stroke: SC_INK, 'stroke-width': 3.5 }, h);
          E('circle', { cx: s * -4, cy: -16, r: 4, fill: NX_COL.gold, stroke: SC_INK, 'stroke-width': 1.5 }, h);   // ring
          hands.push({ h, s });
        });
      },
      face: { x: 0, y: -40, eye: 15, gap: 50, mouthW: 34, mouthY: 34, lidCol: '#A070D8', iris: '#5A2A7A' },
      upd: (t, g, st) => {
        const txt = st.ball || '';
        if (ballT.textContent !== txt) setText(ballT, txt);
        op(mist, txt ? 0.25 : 0.8);
        op(ballG, 0.35 + 0.65 * clamp(st.glow === undefined ? 0.3 : st.glow) * (0.8 + 0.2 * Math.sin(t * 6)));
        const k = st.hands || 0;
        hands.forEach(({ h, s }, i) => tr(h, s * (62 + 10 * k * Math.sin(t * 5 + i)), 86 - 14 * k * Math.abs(Math.sin(t * 3 + i * 1.3))));
      } }));
    // eyeliner flicks
    const inner = c.firstChild, fl = G(inner); tr(fl, 0, -40);
    [-1, 1].forEach(s => E('path', { d: `M${s * 36},-6 L${s * 48},-14`, stroke: SC_INK, 'stroke-width': 3.5, 'stroke-linecap': 'round' }, fl));
  } else if (kind === 'enn') {
    let armR = null, beam = null;
    c = scMake(parent, Object.assign(S, { seed: 12, bob: 5, mood: o.mood || 'neutral',
      draw: g => {
        // shoes
        [-58, 58].forEach(x => E('path', { d: `M${x - 26},132 Q${x - 26},112 ${x},112 L${x + 18},114 Q${x + 34},124 ${x + 26},134 Z`, fill: '#2A2A30', stroke: SC_INK, 'stroke-width': 3 }, g));
        // the lowercase n: an arch on two legs
        const nD = 'M-84,118 L-84,-20 Q-84,-100 0,-100 Q84,-100 84,-20 L84,118 L36,118 L36,-12 Q36,-52 0,-52 Q-36,-52 -36,-12 L-36,118 Z';
        E('path', { d: nD, fill: linGrad('#4A7BE8', '#1E46A8', true), stroke: SC_INK, 'stroke-width': 6, 'stroke-linejoin': 'round' }, g);
        E('path', { d: 'M-70,40 L-70,-18 Q-70,-80 -10,-86', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 6, opacity: 0.35, 'stroke-linecap': 'round' }, g);
        // usher's gold buttons on the left leg
        [10, 46, 82].forEach(y => E('circle', { cx: -60, cy: y, r: 6, fill: NX_COL.gold, stroke: SC_INK, 'stroke-width': 2 }, g));
        // pillbox cap
        const cap = G(g); tr(cap, -6, -100, 1, -8);
        E('rect', { x: -40, y: -34, width: 80, height: 36, rx: 6, fill: '#D32F2F', stroke: SC_INK, 'stroke-width': 4 }, cap);
        E('rect', { x: -40, y: -10, width: 80, height: 10, fill: NX_COL.gold }, cap);
        E('path', { d: 'M-40,2 L40,2', stroke: SC_INK, 'stroke-width': 4 }, cap);
        // left arm resting (viewer's left)
        E('path', { d: 'M-84,10 Q-118,40 -110,74', fill: 'none', stroke: SC_INK, 'stroke-width': 8, 'stroke-linecap': 'round' }, g);
        E('circle', { cx: -110, cy: 78, r: 11, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
        // right arm with the torch (animated)
        armR = G(g); tr(armR, 84, 10);
        beam = E('path', { d: 'M78,-8 L300,-70 L300,60 L78,8 Z', fill: 'rgba(255,240,170,0.35)' }, armR);
        E('path', { d: 'M0,0 L40,0', stroke: SC_INK, 'stroke-width': 8, 'stroke-linecap': 'round' }, armR);
        E('rect', { x: 40, y: -10, width: 36, height: 20, rx: 4, fill: '#3A4A58', stroke: SC_INK, 'stroke-width': 3 }, armR);
        E('rect', { x: 72, y: -14, width: 10, height: 28, rx: 3, fill: '#FFE9A0', stroke: SC_INK, 'stroke-width': 2.5 }, armR);
        E('circle', { cx: 44, cy: 2, r: 11, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, armR);
        // bow tie
        const bt = G(g); tr(bt, 0, -40);
        E('path', { d: 'M0,0 L-20,-11 L-20,11 Z M0,0 L20,-11 L20,11 Z', fill: NX_COL.gold, stroke: SC_INK, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, bt);
      },
      face: { x: 0, y: -74, eye: 12, gap: 40, mouthW: 26, mouthY: 20, lidCol: '#2E5BC8' },
      upd: (t, g, st) => {
        const p = clamp(st.point || 0);
        tr(armR, 84, 10, 1, lerp(50, -6, p));
        op(beam, clamp(st.torch || 0) * (0.8 + 0.2 * Math.sin(t * 9)));
      } }));
  } else if (kind === 'zed') {
    let body = null, hat = null, hole = null, flame = null;
    c = scMake(parent, Object.assign(S, { seed: 15, bob: 3, mood: o.mood || 'sad',
      draw: g => {
        // the 0: a ring with a face in its hole
        body = E('ellipse', { cx: 0, cy: 6, rx: 86, ry: 112, fill: '#C9D3DC', 'fill-opacity': 0.55, stroke: '#7D8A96', 'stroke-width': 6 }, g);
        hole = E('ellipse', { cx: 0, cy: 6, rx: 46, ry: 70, fill: '#EEF2F6', 'fill-opacity': 0.7, stroke: '#7D8A96', 'stroke-width': 4 }, g);
        // feet
        [-34, 34].forEach(x => E('path', { d: `M${x},116 L${x},132 M${x - 12},134 L${x + 14},134`, stroke: '#7D8A96', 'stroke-width': 7, 'stroke-linecap': 'round' }, g));
        // arm holding a sparkler (viewer's right)
        E('path', { d: 'M84,20 Q118,40 112,70', fill: 'none', stroke: '#7D8A96', 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
        E('circle', { cx: 112, cy: 74, r: 10, fill: '#EEF2F6', stroke: '#7D8A96', 'stroke-width': 3 }, g);
        E('path', { d: 'M112,70 L134,-20', stroke: '#8F9CAB', 'stroke-width': 4, 'stroke-linecap': 'round' }, g);
        flame = G(g); tr(flame, 136, -26);
        for (let i = 0; i < 8; i++) { const a = i / 8 * TAU; E('path', { d: `M0,0 L${(Math.cos(a) * 20).toFixed(1)},${(Math.sin(a) * 20).toFixed(1)}`, stroke: NX_COL.gold, 'stroke-width': 3, 'stroke-linecap': 'round' }, flame); }
        E('circle', { r: 6, fill: '#FFFFFF' }, flame);
        // paper party hat, drooping
        hat = G(g); tr(hat, 10, -100, 1, 40);
        E('path', { d: 'M-30,0 L0,-70 L30,0 Z', fill: '#FF8FC8', stroke: SC_INK, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, hat);
        E('path', { d: 'M-18,-28 L18,-28 M-26,-12 L26,-12', stroke: '#FFE45C', 'stroke-width': 4 }, hat);
        E('circle', { cx: 0, cy: -72, r: 7, fill: '#FFE45C', stroke: SC_INK, 'stroke-width': 2 }, hat);
      },
      face: { x: 0, y: -4, eye: 12, gap: 38, mouthW: 24, mouthY: 26, lidCol: '#C9D3DC' },
      upd: (t, g, st) => {
        const k = clamp(st.invited || 0);
        attr(body, 'fill-opacity', 0.55 + 0.45 * k);
        body.setAttribute('fill', k > 0.5 ? NX_COL.gold : '#C9D3DC');
        body.setAttribute('stroke', k > 0.5 ? '#B8860B' : '#7D8A96');
        hole.setAttribute('fill', k > 0.5 ? '#FFF6E0' : '#EEF2F6');
        tr(hat, 10 - 10 * k, -100 - 6 * k, 1, lerp(40, 0, k));
        op(flame, k); tr(flame, 136, -26, 0.8 + 0.25 * Math.sin(t * 20), (t * 200) % 360);
      } }));
  } else if (kind === 'mac') {
    let opT = [], win = [], arr = null, arrR = null, shoes = [], socks = [], outG = null, outT = null;
    c = scMake(parent, Object.assign(S, { seed: 19, bob: 2, mood: o.mood || 'deadpan',
      draw: g => {
        // legs: socks and shoes
        [-46, 46].forEach(x => {
          E('rect', { x: x - 7, y: 104, width: 14, height: 14, fill: '#8F9CAB' }, g);
          const sk = G(g);
          E('rect', { x: x - 11, y: 112, width: 22, height: 20, rx: 4, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 2.5 }, sk);
          E('path', { d: `M${x - 11},118 L${x + 11},118 M${x - 11},125 L${x + 11},125`, stroke: '#E8424F', 'stroke-width': 3 }, sk);
          socks.push(sk);
          const sh = G(g);
          E('path', { d: `M${x - 16},140 Q${x - 18},124 ${x - 4},124 L${x + 8},126 Q${x + 28},130 ${x + 24},142 Z`, fill: '#D32F2F', stroke: SC_INK, 'stroke-width': 3 }, sh);
          shoes.push({ sh, x });
        });
        // cabinet
        E('rect', { x: -100, y: -110, width: 200, height: 218, rx: 16, fill: linGrad('#3CC0AA', '#1B7F70', true), stroke: SC_INK, 'stroke-width': 6 }, g);
        // input hopper on top
        E('path', { d: 'M-50,-110 L-70,-160 L70,-160 L50,-110 Z', fill: '#C9D3DC', stroke: SC_INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, g);
        T(g, 0, -126, 'INPUT', { size: 24, weight: 800, anchor: 'middle', fill: '#2A3B44', ls: 2 });
        // screen face
        E('rect', { x: -70, y: -96, width: 140, height: 84, rx: 12, fill: '#DFF7EE', stroke: SC_INK, 'stroke-width': 4 }, g);
        // two operation windows
        [-1, 1].forEach((s, i) => {
          const w = E('rect', { x: s * 46 - 40, y: 2, width: 80, height: 50, rx: 8, fill: '#FFFDF6', stroke: SC_INK, 'stroke-width': 4 }, g);
          win.push(w);
          opT.push(T(g, s * 46, 38, '', { size: 30, weight: 800, anchor: 'middle', fill: SC_INK }));
        });
        arr = E('path', { d: 'M-4,20 L6,27 L-4,34', fill: 'none', stroke: SC_INK, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
        arrR = E('path', { d: 'M4,20 L-6,27 L4,34', fill: 'none', stroke: '#E8424F', 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
        // output chute and tray
        E('rect', { x: -40, y: 64, width: 80, height: 30, rx: 6, fill: '#2A3B44', stroke: SC_INK, 'stroke-width': 3 }, g);
        T(g, 66, 86, 'OUT', { size: 18, weight: 800, anchor: 'middle', fill: '#DFF7EE' });
        outG = G(g); tr(outG, 0, 84);
        E('rect', { x: -30, y: -12, width: 60, height: 36, rx: 4, fill: '#FFE45C', stroke: SC_INK, 'stroke-width': 3 }, outG);
        outT = T(outG, 0, 14, '', { size: 24, weight: 800, anchor: 'middle', fill: SC_INK });
        // arms
        [-1, 1].forEach(s => {
          E('path', { d: `M${s * 100},-20 Q${s * 132},10 ${s * 124},46`, fill: 'none', stroke: '#5A6670', 'stroke-width': 8, 'stroke-linecap': 'round' }, g);
          E('circle', { cx: s * 124, cy: 50, r: 11, fill: '#C9D3DC', stroke: SC_INK, 'stroke-width': 3 }, g);
        });
        // rivets
        [[-88, -98], [88, -98], [-88, 96], [88, 96]].forEach(([x, y]) => E('circle', { cx: x, cy: y, r: 4, fill: '#C9D3DC' }, g));
      },
      face: { x: 0, y: -56, eye: 12, gap: 52, mouthW: 30, mouthY: 24, lidCol: '#BFE9DA', iris: '#1B4D44' },
      upd: (t, g, st) => {
        const ops = st.ops || ['× 4', '− 3'];
        opT.forEach((tx, i) => { if (tx.textContent !== (ops[i] || '')) setText(tx, ops[i] || ''); });
        const hl = st.hl === undefined ? -1 : st.hl;
        win.forEach((w, i) => w.setAttribute('fill', i === hl ? '#FFE45C' : '#FFFDF6'));
        const rv = clamp(st.rev || 0); op(arr, 1 - rv); op(arrR, rv);
        const sh = st.shoes === undefined ? 1 : clamp(st.shoes), so = st.socks === undefined ? 1 : clamp(st.socks);
        shoes.forEach(({ sh: e, x }, i) => { op(e, sh > 0.02 ? 1 : 0); tr(e, (i ? 1 : -1) * 70 * (1 - sh), -60 * (1 - sh) * (1 - sh) + 0, 1, (i ? 1 : -1) * 90 * (1 - sh)); });
        socks.forEach(e => op(e, so));
        const ot = st.out || '';
        if (outT.textContent !== ot) setText(outT, ot);
        op(outG, ot ? 1 : 0);
      } }));
  } else {
    c = scKavya(parent, o);
  }
  return c;
}

/* ---------- props ---------- */
function nxSparkle(parent, r) { return spark(parent, r || 18, { color: NX_COL.gold }); }

function nxLights(parent, o) {
  o = o || {};
  const n = o.n || 24, x0 = o.x0 === undefined ? 40 : o.x0, x1 = o.x1 === undefined ? 1160 : o.x1, y = o.y === undefined ? 150 : o.y,
    sag = o.sag === undefined ? 26 : o.sag, r = o.r || 11, isGold = o.gold || (() => false);
  const cols = o.cols || ['#FF5A5A', '#56D69B', '#6EC8FF', '#FF8FC8'];
  const g = G(parent), wire = G(g), bulbG = G(g), tags = G(g);
  const pts = [];
  for (let i = 0; i < n; i++) {
    const u = n > 1 ? i / (n - 1) : 0.5, seg = (u * 4) % 1;   // four gentle swags
    pts.push([lerp(x0, x1, u), y + sag * Math.sin(seg * Math.PI)]);
  }
  let d = '';
  for (let k = 0; k <= 120; k++) { const u = k / 120, seg = (u * 4) % 1; d += (k ? ' L' : 'M') + lerp(x0, x1, u).toFixed(1) + ',' + (y - 8 + sag * Math.sin(seg * Math.PI)).toFixed(1); }
  E('path', { d, fill: 'none', stroke: '#2E5A3A', 'stroke-width': 3 }, wire);
  const bulbs = pts.map(([x, yy], i) => {
    E('rect', { x: x - 4, y: yy - 14, width: 8, height: 8, rx: 2, fill: '#3A4A58' }, bulbG);
    const halo = E('circle', { cx: x, cy: yy + 4, r: r * 2.1, fill: glow(isGold(i) ? NX_COL.gold : cols[i % cols.length]) }, bulbG);
    const b = E('ellipse', { cx: x, cy: yy + 4, rx: r * 0.78, ry: r, fill: '#55606A', stroke: SC_INK, 'stroke-width': 2 }, bulbG);
    return { b, halo, col: isGold(i) ? NX_COL.gold : cols[i % cols.length], gold: isGold(i) };
  });
  g.bulbs = pts;
  g.mark = (i, text) => {
    const m = G(tags), [x, yy] = pts[i];
    E('rect', { x: x - 26, y: yy + 22, width: 52, height: 32, rx: 8, fill: '#FFFDF6', stroke: '#B8860B', 'stroke-width': 2.5 }, m);
    T(m, x, yy + 46, text, { size: 24, weight: 800, anchor: 'middle', fill: SC_INK });
    return m;
  };
  const lit = (q, v) => { q.b.setAttribute('fill', v > 0.5 ? q.col : '#55606A'); op(q.halo, v); };
  g.set = (t, mode, p) => {
    mode = mode || 'on'; p = p === undefined ? 1 : p;
    bulbs.forEach((q, i) => {
      let v = 1;
      if (mode === 'off') v = 0;
      else if (mode === 'gold') v = q.gold ? 1 : 0;
      else if (mode === 'ripple') v = 0.35 + 0.65 * Math.max(0, Math.sin(t * 6 - i * 0.55));
      else if (mode === 'chase') v = i < p ? 1 : 0;
      else if (mode === 'bzzt') v = p < 0.7 ? ((Math.sin(t * 60 + i * 7) > 0.2) ? 1 : 0.15) : (p < 1 ? (i === (Math.floor(t * 4) % n) ? 0.6 : 0) : 0);
      else v = 0.8 + 0.2 * Math.sin(t * 3 + i);
      lit(q, v);
    });
  };
  g.set(0, 'on');
  return g;
}

function nxBox(parent) {
  const g = G(parent);
  E('rect', { x: -75, y: -55, width: 150, height: 110, rx: 14, fill: linGrad('#E6EBEF', '#AFBAC4', true), stroke: SC_INK, 'stroke-width': 4 }, g);
  E('circle', { cx: -36, cy: -8, r: 24, fill: '#6A3CD8', stroke: SC_INK, 'stroke-width': 3 }, g);
  E('circle', { cx: -36, cy: -8, r: 15, fill: 'rgba(200,240,255,0.7)' }, g);
  E('path', { d: 'M-50,16 L-22,16 L-26,8 L-46,8 Z', fill: NX_COL.gold, stroke: SC_INK, 'stroke-width': 2 }, g);
  T(g, 22, -26, 'NEXTA', { size: 20, weight: 800, anchor: 'middle', fill: '#5A1E7A' });
  T(g, 22, -6, 'LITE', { size: 16, weight: 800, anchor: 'middle', fill: '#5A1E7A' });
  E('rect', { x: -4, y: 4, width: 54, height: 26, rx: 8, fill: '#D32F2F', stroke: SC_INK, 'stroke-width': 3 }, g);
  T(g, 23, 44, 'PATTERN', { size: 14, weight: 800, anchor: 'middle', fill: SC_INK });
  const led = E('circle', { cx: 60, cy: -40, r: 6, fill: '#56D69B', stroke: SC_INK, 'stroke-width': 1.5 }, g);
  g.set = v => op(led, 0.25 + 0.75 * clamp(v));
  return g;
}

function nxSticks(parent, n, o) {
  o = o || {};
  const c = o.cell || 64, g = G(parent), sticks = [];
  const mk = (x1, y1, x2, y2, isNew, first) => {
    const horiz = y1 === y2, L = horiz ? Math.abs(x2 - x1) : Math.abs(y2 - y1);
    const e = E('rect', horiz ? { x: Math.min(x1, x2) + 4, y: y1 - 6, width: L - 8, height: 12, rx: 6 } : { x: x1 - 6, y: Math.min(y1, y2) + 4, width: 12, height: L - 8, rx: 6 },
      g);
    e.setAttribute('fill', '#F2D49B'); e.setAttribute('stroke', '#9C7A3E'); e.setAttribute('stroke-width', 2.5);
    sticks.push({ e, isNew, first });
  };
  mk(0, 0, 0, -c, false, true);   // the first upright stick
  for (let i = 0; i < n; i++) {
    const x = i * c;
    mk(x, -c, x + c, -c, true); mk(x, 0, x + c, 0, true); mk(x + c, 0, x + c, -c, true);
  }
  g.w = n * c;
  g.set = (k, hl) => {
    const shown = 1 + 3 * clamp(k, 0, n);
    sticks.forEach((s, i) => {
      op(s.e, clamp(shown - i));
      const col = hl > 0.5 ? (s.first ? NX_COL.gold : '#FF9F1C') : '#F2D49B';
      s.e.setAttribute('fill', col);
    });
  };
  g.set(n, 0);
  return g;
}

function nxDiya(parent, s) {
  const g = G(parent), inner = G(g); tr(inner, 0, 0, s || 1);
  const halo = E('circle', { cx: 0, cy: -40, r: 38, fill: glow('#FFC93C') }, inner);
  E('path', { d: 'M-40,-22 Q-36,0 0,0 Q36,0 40,-22 Q20,-14 0,-14 Q-20,-14 -40,-22 Z', fill: '#C0632B', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, inner);
  E('path', { d: 'M-40,-22 Q0,-30 40,-22 Q34,-18 22,-14 L-22,-14 Q-34,-18 -40,-22 Z', fill: '#E38A4E', stroke: SC_INK, 'stroke-width': 2 }, inner);
  [-20, 0, 20].forEach(x => E('circle', { cx: x, cy: -8, r: 3, fill: '#FFE45C' }, inner));
  const fl = G(inner); tr(fl, 30, -26);
  const f1 = E('path', { d: 'M0,0 Q-10,-14 0,-32 Q10,-14 0,0 Z', fill: '#FF9F1C', stroke: '#E8424F', 'stroke-width': 2 }, fl);
  E('path', { d: 'M0,-2 Q-4,-10 0,-18 Q4,-10 0,-2 Z', fill: '#FFF3B0' }, fl);
  g.set = (t, lit) => { lit = lit === undefined ? 1 : lit; op(fl, lit); op(halo, 0.7 * lit); tr(fl, 30, -26, 0.9 + 0.12 * Math.sin(t * 13 + (s || 1) * 3), 4 * Math.sin(t * 7)); tr(halo, 30, 10, 0.95 + 0.08 * Math.sin(t * 9)); };
  g.set(0, 1);
  return g;
}

function nxKolam(parent, n, o) {
  o = o || {};
  const gap = o.gap || 34, g = G(parent), w = (n - 1) * gap, dots = [];
  const ring = E('path', { d: '', fill: 'none', stroke: NX_COL.gold, 'stroke-width': 6, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, g);
  op(ring, 0);
  for (let r = 0; r < n; r++) for (let c2 = 0; c2 < n; c2++) {
    const x = -w / 2 + c2 * gap, y = -w / 2 + r * gap;
    dots.push({ e: E('circle', { cx: x, cy: y, r: Math.max(5, gap * 0.2), fill: o.col || '#FFFFFF', stroke: '#6E7D8A', 'stroke-width': 2 }, g), r, c: c2 });
  }
  // the L: last row and last column (the newest layer when n grows)
  const R = gap * 0.4, L = [[-w / 2 - R, w / 2 + R], [w / 2 + R, w / 2 + R], [w / 2 + R, -w / 2 - R], [w / 2 - R, -w / 2 - R], [w / 2 - R, w / 2 - R], [-w / 2 - R, w / 2 - R]];
  ring.setAttribute('d', n > 1 ? mkPoly(L) : '');
  let lamp = null;
  if (o.lamp !== false) { lamp = nxDiya(g, Math.max(0.45, gap / 70)); tr(lamp, 0, w / 2 + gap * 1.1); }   // below the square, never on a dot
  g.w = w;
  g.set = p => { const k = clamp(p) * n; dots.forEach(d2 => op(d2.e, clamp(k - d2.r))); };
  g.L = p => op(ring, clamp(p));
  g.lamp = (t, lit) => { if (lamp) { op(lamp, lit === undefined ? 1 : (lit > 0 ? 1 : 0)); lamp.set(t, lit); } };
  g.set(1);
  return g;
}

function nxMurukku(parent, s) {
  const g = G(parent); tr(g, 0, 0, s || 1);
  let d = '';
  for (let i = 0; i <= 60; i++) { const a = i * 0.32, r = 4 + i * 0.5; d += (i ? ' L' : 'M') + (Math.cos(a) * r).toFixed(1) + ',' + (Math.sin(a) * r).toFixed(1); }
  E('path', { d, fill: 'none', stroke: '#9C5A1E', 'stroke-width': 11, 'stroke-linecap': 'round' }, g);
  E('path', { d, fill: 'none', stroke: '#E0A04E', 'stroke-width': 7, 'stroke-linecap': 'round', 'stroke-dasharray': '3 4' }, g);
  return g;
}

function nxTin(parent, o) {
  o = o || {};
  const g = G(parent);
  E('path', { d: 'M-74,-110 L74,-110 L74,-6 Q74,0 68,0 L-68,0 Q-74,0 -74,-6 Z', fill: linGrad('#E6EBEF', '#9AA6B2', false), stroke: SC_INK, 'stroke-width': 4 }, g);
  E('ellipse', { cx: 0, cy: -110, rx: 74, ry: 16, fill: '#C9D3DC', stroke: SC_INK, 'stroke-width': 4 }, g);
  const fill = G(g);
  const ms = [[-40, -112], [0, -116], [40, -112], [-20, -122], [22, -124]].map(([x, y]) => { const m = nxMurukku(fill, 0.36); tr(m, x, y, 0.36); return m; });
  E('rect', { x: -60, y: -82, width: 120, height: 46, rx: 8, fill: '#B8336A', stroke: SC_INK, 'stroke-width': 3 }, g);
  T(g, 0, -50, 'MURUKKU', { size: 22, weight: 800, anchor: 'middle', fill: '#FFE45C' });
  g.set = k => ms.forEach((m, i) => op(m, clamp(k * ms.length - i)));
  return g;
}

function nxLaddoo(parent, s) {
  const g = G(parent); tr(g, 0, 0, s || 1);
  E('circle', { r: 16, fill: ball('#FFB347', '#E8751A'), stroke: SC_INK, 'stroke-width': 2.5 }, g);
  E('circle', { cx: -5, cy: -6, r: 2, fill: '#FFF3B0' }, g); E('circle', { cx: 6, cy: 2, r: 2, fill: '#FFF3B0' }, g);
  return g;
}

function nxLaddooStack(parent, rows, o) {
  o = o || {};
  const r = o.r || 15, g = G(parent), rowG = [];
  for (let k = 0; k < rows; k++) {   // k = 0 is the bottom row, with `rows` laddoos
    const rg = G(g), cnt = rows - k, y = -r - k * r * 1.72;
    for (let i = 0; i < cnt; i++) { const x = (i - (cnt - 1) / 2) * r * 2; E('circle', { cx: x, cy: y, r, fill: ball('#FFB347', '#E8751A'), stroke: SC_INK, 'stroke-width': 2 }, rg); }
    rowG.push(rg);
  }
  g.h = r * 2 + (rows - 1) * r * 1.72;
  g.set = k => rowG.forEach((rg, i) => op(rg, clamp(k - i)));
  return g;
}

function nxSunflower(parent, s) {
  const g = G(parent); tr(g, 0, 0, s || 1);
  for (let i = 0; i < 18; i++) { const p = G(g); tr(p, 0, 0, 1, i * 20); E('path', { d: 'M0,-44 Q12,-66 0,-90 Q-12,-66 0,-44 Z', fill: '#FFC93C', stroke: '#C98A1E', 'stroke-width': 2 }, p); }
  E('circle', { r: 46, fill: '#6B3E22', stroke: SC_INK, 'stroke-width': 3 }, g);
  let d = '';
  for (let i = 1; i < 90; i++) { const a = i * 2.39996, rr = 4.4 * Math.sqrt(i); d += `M${(Math.cos(a) * rr).toFixed(1)},${(Math.sin(a) * rr).toFixed(1)} m-2,0 a2,2 0 1,0 4,0 a2,2 0 1,0 -4,0 `; }
  E('path', { d, fill: '#E0A04E' }, g);
  return g;
}

function nxPhone(parent, o) {
  o = o || {};
  const g = G(parent);
  E('rect', { x: -130, y: -220, width: 260, height: 440, rx: 34, fill: '#1E2A33', stroke: SC_INK, 'stroke-width': 5 }, g);
  E('rect', { x: -114, y: -196, width: 228, height: 392, rx: 16, fill: '#ECE5DD' }, g);
  E('rect', { x: -114, y: -196, width: 228, height: 58, rx: 16, fill: '#128C7E' }, g);
  E('rect', { x: -114, y: -160, width: 228, height: 22, fill: '#128C7E' }, g);
  T(g, -94, -158, o.title || 'Aunties (forwarded)', { size: 20, weight: 700, fill: '#FFFFFF', font: FB });
  const bub = G(g); tr(bub, 0, -60);
  E('rect', { x: -96, y: -60, width: 192, height: 120, rx: 14, fill: '#DCF8C6', stroke: '#9CCB8A', 'stroke-width': 2 }, bub);
  T(bub, 0, -26, 'Forwarded', { size: 16, weight: 700, anchor: 'middle', fill: '#6A7A70', font: FB });
  T(bub, 0, 8, 'Happy', { size: 30, weight: 800, anchor: 'middle', fill: NX_COL.magenta });
  T(bub, 0, 42, 'Deepavali!', { size: 30, weight: 800, anchor: 'middle', fill: NX_COL.magenta });
  const d = nxDiya(bub, 0.5); tr(d, 70, -26);
  const ctr = T(g, 0, 100, '', { size: 26, weight: 800, anchor: 'middle', fill: SC_INK });
  g.set = txt => { if (ctr.textContent !== txt) setText(ctr, txt); };
  return g;
}

function nxTaxiMeter(parent) {
  const g = G(parent);
  E('rect', { x: -150, y: -65, width: 300, height: 130, rx: 16, fill: '#1E2A33', stroke: SC_INK, 'stroke-width': 5 }, g);
  T(g, -120, -30, 'FARE', { size: 22, weight: 800, fill: '#FFC93C' });
  E('rect', { x: -124, y: -20, width: 248, height: 66, rx: 8, fill: '#0B1410' }, g);
  const t = T(g, 110, 34, '', { size: 52, weight: 800, anchor: 'end', fill: '#FF5A3A', font: "'Courier New', monospace" });
  g.set = s => { if (t.textContent !== s) setText(t, s); };
  return g;
}

function nxStamp(parent, ok) { return mkStamp(parent, ok ? 'PATTERN FOUND' : 'PATTERN BROKEN', ok ? '#1E9E5A' : '#D32F2F'); }

/* ---------- sets ---------- */
function nxCorridor(parent) {
  const g = G(parent), back = G(g);
  // sky beyond the corridor (seen above the railing at the far right)
  const sky = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#9ED8FF', '#FFE2B8', true) }, back);
  const skyN = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#0E1430', '#2A2050', true) }, back);
  // the wall
  E('rect', { x: 0, y: 60, width: 1020, height: 600, fill: '#F6EEDC' }, back);
  E('rect', { x: 0, y: 60, width: 1020, height: 16, fill: '#E2D6BC' }, back);
  E('rect', { x: 1020, y: 60, width: 22, height: 600, fill: '#D9CBAE', stroke: '#B8A684', 'stroke-width': 3 }, back);   // corridor column
  // the next block across, through the gap
  E('rect', { x: 1060, y: 160, width: 140, height: 400, fill: '#D9CDB4', stroke: '#9C8A6A', 'stroke-width': 3 }, back);
  let win = '';
  for (let r = 0; r < 6; r++) for (let k = 0; k < 2; k++) win += `M${1076 + k * 60},${180 + r * 60} h40 v28 h-40 Z `;
  const winP = E('path', { d: win, fill: '#9CC2DC' }, back);
  // the flat's door with a mango-leaf toran
  E('rect', { x: 120, y: 190, width: 220, height: 380, fill: '#7A4A2E', stroke: '#4A2A18', 'stroke-width': 5 }, back);
  E('rect', { x: 140, y: 214, width: 180, height: 150, rx: 6, fill: '#8E5A3A', stroke: '#4A2A18', 'stroke-width': 3 }, back);
  E('rect', { x: 140, y: 386, width: 180, height: 160, rx: 6, fill: '#8E5A3A', stroke: '#4A2A18', 'stroke-width': 3 }, back);
  E('circle', { cx: 312, cy: 400, r: 8, fill: NX_COL.gold, stroke: SC_INK, 'stroke-width': 2 }, back);
  E('path', { d: 'M110,196 Q230,226 350,196', fill: 'none', stroke: '#2E7D4F', 'stroke-width': 4 }, back);
  for (let i = 0; i < 9; i++) { const x = 126 + i * 26, y = 200 + 14 * Math.sin(i / 8 * Math.PI); E('path', { d: `M${x},${y} q-8,18 0,34 q8,-16 0,-34 Z`, fill: i % 2 ? '#2FA36B' : '#7BC74D', stroke: '#1E6A3A', 'stroke-width': 1.5 }, back); E('circle', { cx: x + 13, cy: y + 4, r: 6, fill: i % 2 ? NX_COL.marigold : NX_COL.gold }, back); }
  // unit number plate
  E('rect', { x: 360, y: 230, width: 112, height: 44, rx: 6, fill: '#E2B33C', stroke: '#8A6508', 'stroke-width': 3 }, back);
  T(back, 416, 262, '#08-14', { size: 26, weight: 800, anchor: 'middle', fill: '#3A2A08' });
  // window with grilles
  E('rect', { x: 520, y: 220, width: 300, height: 190, fill: '#BFE3F5', stroke: '#8F9CAB', 'stroke-width': 6 }, back);
  let gr = '';
  for (let x = 545; x < 820; x += 25) gr += `M${x},220 L${x},410 `;
  E('path', { d: gr + 'M520,315 L820,315', stroke: '#8F9CAB', 'stroke-width': 4 }, back);
  // shoe rack and pots
  E('rect', { x: 860, y: 420, width: 130, height: 120, rx: 6, fill: '#C9A27A', stroke: '#7A5A3A', 'stroke-width': 3 }, back);
  [[880, 450, '#E8424F'], [930, 450, '#2E7DD8'], [880, 500, '#F4F7FA'], [935, 500, '#2A2A30']].forEach(([x, y, c]) => E('ellipse', { cx: x + 14, cy: y, rx: 20, ry: 10, fill: c, stroke: SC_INK, 'stroke-width': 2 }, back));
  [[470, 470], [1000, 470]].forEach(([x, y]) => {
    E('path', { d: `M${x - 26},${y} L${x + 26},${y} L${x + 18},${y + 60} L${x - 18},${y + 60} Z`, fill: '#C0632B', stroke: SC_INK, 'stroke-width': 3 }, back);
    [[-20, -50], [0, -64], [20, -48], [-8, -30], [12, -30]].forEach(([dx, dy]) => E('ellipse', { cx: x + dx, cy: y + dy, rx: 12, ry: 22, fill: '#2FA36B', stroke: '#1E6A3A', 'stroke-width': 2 }, back));
  });
  // the fairy lights and the controller box
  g.lights = nxLights(back, { n: 30, x0: 20, x1: 1010, y: 116, sag: 22, gold: i => i % 3 === 0 });
  g.box = nxBox(back); g.boxXY = [430, 150]; tr(g.box, 430, 150, 0.6);
  // night tint over the wall
  const dim = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#0E1430', opacity: 0 }, back);
  // characters go here
  g.mid = G(g);
  // the railing in front
  const front = G(g);
  E('rect', { x: 0, y: 545, width: 1200, height: 205, fill: linGrad('#D9CBAE', '#B8A684', true) }, front);
  E('rect', { x: 0, y: 535, width: 1200, height: 22, rx: 6, fill: '#E9DFC8', stroke: '#9C8A6A', 'stroke-width': 4 }, front);
  let bars = '';
  for (let x = 30; x < 1200; x += 60) bars += `M${x},560 L${x},750 `;
  E('path', { d: bars, stroke: '#A8977A', 'stroke-width': 5 }, front);
  E('rect', { x: 0, y: 640, width: 1200, height: 10, fill: '#A8977A' }, front);
  g.front = front;
  g.top = G(g);
  g.railY = 545;
  g.upd = (t, night) => {
    night = clamp(night || 0);
    op(skyN, night); op(sky, 1 - night);
    op(dim, 0.35 * night);
    winP.setAttribute('fill', night > 0.5 ? '#FFD98A' : '#9CC2DC');
    g.box.set(0.5 + 0.5 * Math.sin(t * 4));
  };
  g.upd(0, 0);
  return g;
}

function nxLiving(parent) {
  const g = G(parent), back = G(g);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#F3E3F0' }, back);
  E('rect', { x: 0, y: 470, width: 1200, height: 280, fill: '#E8D2E4' }, back);
  // window
  const sky = E('rect', { x: 640, y: 120, width: 420, height: 260, fill: linGrad('#9ED8FF', '#FFE2B8', true) }, back);
  const skyN = E('rect', { x: 640, y: 120, width: 420, height: 260, fill: linGrad('#0E1430', '#2A2050', true), opacity: 0 }, back);
  const blk = G(back);
  E('rect', { x: 700, y: 210, width: 120, height: 170, fill: '#D9CDB4', opacity: 0.9 }, blk);
  E('rect', { x: 880, y: 170, width: 140, height: 210, fill: '#E3D8C0', opacity: 0.9 }, blk);
  E('rect', { x: 640, y: 120, width: 420, height: 260, fill: 'none', stroke: '#FFFFFF', 'stroke-width': 12 }, back);
  E('path', { d: 'M850,120 L850,380 M640,250 L1060,250', stroke: '#FFFFFF', 'stroke-width': 8 }, back);
  // marigold garland over the window
  for (let i = 0; i < 15; i++) { const x = 630 + i * 31, y = 108 + 22 * Math.sin(i / 14 * Math.PI); E('circle', { cx: x, cy: y, r: 11, fill: i % 2 ? NX_COL.marigold : NX_COL.gold, stroke: '#C0632B', 'stroke-width': 2 }, back); }
  // family photo and a wall clock
  E('rect', { x: 150, y: 150, width: 170, height: 130, rx: 6, fill: '#FFFDF6', stroke: '#B8860B', 'stroke-width': 8 }, back);
  [[200, 230, '#B8336A'], [240, 220, '#3D8B6E'], [275, 238, '#F28C28'], [222, 242, '#2E7DD8']].forEach(([x, y, c]) => { E('circle', { cx: x, cy: y - 22, r: 12, fill: '#8B5A3C' }, back); E('rect', { x: x - 14, y: y - 10, width: 28, height: 30, rx: 8, fill: c }, back); });
  const clock = G(back); tr(clock, 450, 190);
  E('circle', { r: 46, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 5 }, clock);
  for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; E('line', { x1: Math.cos(a) * 36, y1: Math.sin(a) * 36, x2: Math.cos(a) * 42, y2: Math.sin(a) * 42, stroke: SC_INK, 'stroke-width': 3 }, clock); }
  const hH = E('line', { x1: 0, y1: 0, x2: 0, y2: -22, stroke: SC_INK, 'stroke-width': 6, 'stroke-linecap': 'round' }, clock);
  const hM = E('line', { x1: 0, y1: 0, x2: 0, y2: -34, stroke: '#E8424F', 'stroke-width': 4, 'stroke-linecap': 'round' }, clock);
  g.clock = (h, m) => { hH.setAttribute('transform', `rotate(${((h % 12) * 30 + m * 0.5).toFixed(1)})`); hM.setAttribute('transform', `rotate(${(m * 6).toFixed(1)})`); };
  g.clock(3, 0);
  // brass lamp stand
  const lampG = G(back); tr(lampG, 560, 470);
  E('path', { d: 'M-8,0 L-4,-200 L4,-200 L8,0 Z', fill: '#C9A227', stroke: '#8A6508', 'stroke-width': 3 }, lampG);
  E('ellipse', { cx: 0, cy: 0, rx: 40, ry: 10, fill: '#C9A227', stroke: '#8A6508', 'stroke-width': 3 }, lampG);
  const lampD = nxDiya(lampG, 0.6); tr(lampD, 0, -200);
  // sofa back
  E('rect', { x: 60, y: 380, width: 520, height: 160, rx: 30, fill: '#6A3CD8', stroke: '#3A1E7A', 'stroke-width': 5 }, back);
  [80, 250, 420].forEach(x => E('rect', { x, y: 396, width: 150, height: 90, rx: 18, fill: '#7E52E6', stroke: '#3A1E7A', 'stroke-width': 3 }, back));
  // lights over the window
  g.lights = nxLights(back, { n: 16, x0: 610, x1: 1090, y: 70, sag: 16, gold: i => i % 3 === 0 });
  const dim = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#0E1430', opacity: 0 }, back);
  g.mid = G(g);
  // the sweets table
  const front = G(g);
  E('rect', { x: 40, y: 530, width: 1120, height: 26, rx: 6, fill: '#FFFDF6', stroke: '#C9B48A', 'stroke-width': 4 }, front);
  E('rect', { x: 60, y: 556, width: 1080, height: 194, fill: '#FFF6E0', stroke: '#C9B48A', 'stroke-width': 4 }, front);
  E('rect', { x: 60, y: 600, width: 1080, height: 16, fill: NX_COL.gold }, front);
  let sc = '';
  for (let x = 80; x < 1140; x += 40) sc += `M${x},616 q20,22 40,0 `;
  E('path', { d: sc, fill: 'none', stroke: NX_COL.magenta, 'stroke-width': 4 }, front);
  g.front = front;
  g.top = G(g);
  g.tableY = 540;
  g.upd = (t, night) => {
    night = clamp(night || 0);
    op(skyN, night); op(sky, 1 - night); op(dim, 0.25 * night);
    lampD.set(t, 1);
  };
  g.upd(0, 0);
  return g;
}

function nxFloor(parent) {
  const g = G(parent);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#D8CFC0' }, g);
  let tl = '';
  for (let x = 0; x <= 1200; x += 100) tl += `M${x},70 L${x},750 `;
  for (let y = 70; y <= 750; y += 100) tl += `M0,${y} L1200,${y} `;
  E('path', { d: tl, stroke: '#C2B8A6', 'stroke-width': 3 }, g);
  E('rect', { x: 0, y: 0, width: 1200, height: 70, fill: '#7A4A2E' }, g);   // the door threshold
  E('rect', { x: 0, y: 62, width: 1200, height: 10, fill: '#4A2A18' }, g);
  const ds = [80, 1120].map(x => { const d = nxDiya(g, 0.8); tr(d, x, 64); return d; });
  g.upd = t => ds.forEach(d => d.set(t, 1));
  g.upd(0);
  return g;
}

function nxBoxStage(parent) {
  const g = G(parent);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#1A0E2E', '#3A1E5A', true) }, g);
  // stars
  const r = rng(41);
  let st = '';
  for (let i = 0; i < 40; i++) { const x = r() * 1200, y = r() * 420; st += `M${x.toFixed(0)},${y.toFixed(0)} m-2,0 a2,2 0 1,0 4,0 a2,2 0 1,0 -4,0 `; }
  E('path', { d: st, fill: '#FFE9A0', opacity: 0.8 }, g);
  // table with a star cloth
  E('path', { d: 'M180,560 L1020,560 L1060,750 L140,750 Z', fill: '#4A1E6A', stroke: '#2A0E40', 'stroke-width': 5 }, g);
  E('path', { d: 'M180,560 L1020,560', stroke: NX_COL.gold, 'stroke-width': 8 }, g);
  // curtains
  const cg = G(g), cl = G(cg), cr = G(cg);
  E('path', { d: 'M0,0 L640,0 Q600,380 640,750 L0,750 Z', fill: linGrad('#C62828', '#7A1414', false), stroke: '#4A0A0A', 'stroke-width': 5 }, cl);
  E('path', { d: 'M1200,0 L560,0 Q600,380 560,750 L1200,750 Z', fill: linGrad('#7A1414', '#C62828', false), stroke: '#4A0A0A', 'stroke-width': 5 }, cr);
  for (let i = 1; i < 6; i++) { E('path', { d: `M${i * 100},0 Q${i * 100 - 10},380 ${i * 100},750`, stroke: '#8E1B1B', 'stroke-width': 4, fill: 'none' }, cl); E('path', { d: `M${1200 - i * 100},0 Q${1210 - i * 100},380 ${1200 - i * 100},750`, stroke: '#8E1B1B', 'stroke-width': 4, fill: 'none' }, cr); }
  E('rect', { x: 0, y: 0, width: 1200, height: 60, fill: '#8E1B1B', stroke: NX_COL.gold, 'stroke-width': 4 }, cg);
  g.curt = cg;   // the curtains and the valance: move this group in front of the characters
  g.curtain = p => { p = clamp(p); tr(cl, -560 * p, 0); tr(cr, 560 * p, 0); };
  g.curtain(0);
  return g;
}
