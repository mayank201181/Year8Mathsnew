/* ON GOOD TERMS (Claude Sitcom Ep 9, Expressions & Formulae): the cast, sets and props of this episode.
   Bundled after engine lib.js, kit.js, mathkit.js and sitcom.js (scMake, scTalk, scKavya, scHuman, scCastHuman,
   scConfessional, scLowerThird, scVideoCall, mk* maths kit). Every top-level name starts with `xp`, except `cast`.

   Characters: cast(parent, kind, o) -> g, origin at the character's centre, about 200-240 px tall at s = 1
     o: { s (scale), mood (default mood), ... }   (humans: any scHuman option overrides, e.g. prop, lift)
     g.set({ t, talk, mood, look, sweat, still, ... })   call every frame
       talk 0..1 (use scTalk(S, t, who)); mood: neutral | happy | smug | annoyed | sad | shock | deadpan
       look -1..1 pupils left/right; still: true stops the idle bob
     HUMANS (busts, bottom of the shirt at y = 140, so put them behind the dining table, a parapet or the frame edge):
       'kavya'  (kavya)  Kavya, 12 (scKavya, PE shirt "8")
       'mum'    (mum)    Mum: magenta kurta, bun, bindi. Default prop: none (o.prop: 'ladle' etc.)
       'dad'    (dad)    Dad: glasses, moustache, green polo. Default prop: none
       'boy'    (boy)    Ah Boy, 8: orange star tee. Default: an empty hand (lift: 1 raises it)
       'priya'  (priya)  Priya, 12: school uniform, bob, yellow clip. Default prop: a pencil
       'tan'    (tan)    Mr Tan, maths teacher: shirt and tie, glasses. Default prop: a marker
       'ravi'   (ravi)   Uncle Ravi, Mum's brother in Miami: bald, salt-and-pepper beard, round glasses, orange
                         holiday shirt. Only ever seen on a video call (xpRaviCall).
       Pass { prop: null } for no prop; { body: true } for a full body (scHumanBody, feet at 0,0; pose API).
     CARTOONS (scMake):
       'x'      (x)      AGENT X, the unknown: a secret agent whose whole silhouette is a letter x (two navy legs
                         and two beige trench-coat sleeves crossing at a belted trench coat), cream head, black
                         fedora with a red band, turned-up collar, dark sunglasses. Deadpan. Default mood deadpan.
                         Extra: { shades: 0..1 } (default 1) sunglasses on / off (lowered on "Cover blown");
                         { arms: 0..1 } (default 0.55) 0 = hands down in his pockets, 1 = the full X pose;
                         { brackets: 0..1 } his undercover disguise, a giant ( ) round him (substitution);
                         { badge: 0..1 } shows his undercover value tag (g.badge: put an mkMath inside it, e.g.
                         'x = −3'; the tag hangs at his chest, about 150 x 56).
       'square' (square) SQUARE, the x² algebra tile: a blue tile (x by x) with a tiara and pearls, "x²" in the
                         corner, thin arms and legs. Posh ("darling"). Default mood smug.
       'stick'  (stick)  STICK, the x algebra tile: a long green tile (x by 1) with a backwards cap, "x" at the
                         bottom, thin arms and legs. Relaxed. Default mood neutral.
       'handy'  (handy)  HANDY, the term outside the bracket: a round yellow badge with a face and two huge white
                         gloves held out to shake hands. Over-friendly. Default mood happy.
                         Extra: { val: '3' } the term on his name tag (plain text, e.g. '3', '−2', 'x');
                         { neg: 0..1 } grumpy negative mode (purple body); { shake: 0..1 } gloves pump.
       'phil'   (phil)   PHIL, the FUNCTION MACHINE: a steel-blue machine with an input funnel (top left), an
                         output chute (bottom right), a spinning gear, two operation windows and a FORWARD /
                         REVERSE lever. Monotone. Default mood neutral.
                         Extra: { rev: 0..1 } throws the lever to REVERSE (the arrow between the windows flips);
                         { run: 0..1 } spins the gear. g.slotA, g.slotB: groups centred in the two operation
                         windows (each about 150 x 70): put an mkMath in each (e.g. '* 9/5', '+ 32').
                         g.inAt, g.outAt: [x, y] of the funnel mouth and the chute end (in Phil's own coords).

   Shots
     xpConf(parent, who)             confessional background tinted for that character (scConfessional); g.set(p, t)
     XP_TINT                         the confessional colours per character
     xpLowerThird(parent, who)       scLowerThird with this episode's name and role for `who` (XP_LT); g.set(p)

   Sets (full stage 1200 x 750; each returns g)
     xpFlat(parent)       the living room of Kavya's HDB flat on Deepavali: cream wall, a mango-leaf and marigold
                          garland (torana) along the top, the square window on the left (x 150-450, y 150-420)
                          with grilles and Block 210 outside, its fairy lights (g.lights: xpLights, g.lights.set(p, t)),
                          a wall clock (g.clock(h, m) sets the hands; g.clockAt = [x, y]), a shelf of diyas on the
                          right (y 360), and the dining table with a red-and-gold tablecloth in front.
                          LAYERS: characters go in g.mid (a bust at y about 430 hides its shirt hem behind the table),
                          the table is g.front, props standing on the table go in g.top (drawn last). g.tableY = 530.
                          Free board space: x 560-1150, y 110-500 (above the diyas' shelf if you hide it: g.shelf).
                          g.upd(t, lightsP) flickers the diyas and twinkles the lights (lightsP: fraction hung, default 1).
     xpDoor(parent)       the HDB common corridor outside the flat: the open wooden door (#08-208) and the folded
                          metal gate, a torana over the door, a diya each side, a shoe rack (left) and the corridor
                          parapet with blocks beyond (right). LAYERS like xpFlat: g.mid (busts at y about 440),
                          g.front (a low shoe-cabinet / parapet band across the bottom, top at y 560), g.top.
                          g.doorAt = [x, y] the centre of the doorway. g.upd(t).
     xpMiami(parent, w, h, night)  backdrop for Uncle Ravi's calls, centred on (0,0): sky (morning, or dark with
                          stars when night is true), sea, sand, a palm tree, a beach umbrella.
     xpRaviCall(parent, w, h, label)  scVideoCall with the Miami backdrop and Uncle Ravi (bust) in the window.
                          Centred on (0,0). g.ravi (cast, use g.ravi.set), g.bg, g.screen. Label 'Uncle Ravi · Miami'.

   Props (around their own origin)
     xpStamp(parent, ok)             mkStamp 'IDENTITY CONFIRMED' (green, ok true) or 'COVER BLOWN' (red); g.set(p).
                                     About 700 px wide at scale 1: scale the returned g (tr(g, x, y, 0.55)).
     xpTest(parent, o)               Kavya's class test (white paper, red marks), centred, 440 x 560 at s = 1.
                                     Rows: 'CLASS TEST: ALGEBRA', 'Name: Kavya', 'Q1  Factorise 12x + 18',
                                     her answer '12(x + 18)' with a red cross, a red 'REVISE!' scrawl underlined
                                     twice, 'Retest: Monday'. g.ans, g.cross, g.revise, g.retest (op() them);
                                     g.xAt = [x, y] of the x in the question (zoom target).
     xpLadoo(parent, s)              a ladoo (orange sweet ball), centred, about 50 wide
     xpTray(parent, o)               a round steel tray of ladoos, centred, about 260 wide. o: { n (18) }.
                                     g.set(k) shows the first k ladoos (fractions fade the next).
     xpMurukku(parent, s)            a packet of murukku (clear bag, golden spirals, MURUKKU label), base centre (0,0),
                                     about 90 x 110
     xpGoodieBag(parent, o)          a paper goodie bag with a diya print and rope handles, base centre (0,0),
                                     about 120 x 150. o: { col ('#E8457A') }. g.set(p) fills it (contents peek out)
     xpSweetBag(parent, o)           a small zip bag of sweets with a big "?" sticker (the unknown x), base centre,
                                     about 80 x 90. o: { label ('x') } text on the sticker
     xpDiya(parent, s)               a clay oil lamp with a flame, base centre (0,0), about 70 wide. g.upd(t) flickers.
     xpLights(parent, pts, o)        fairy lights along the polyline pts [[x, y], ...]. o: { n (bulbs, 26) }.
                                     g.set(p, t): the first fraction p of the string is hung and lit; t twinkles.
     xpClock(parent, r)              wall clock, centred. g.set(h, m).
     xpKolam(parent, w, h, o)        a rice-flour kolam on the red floor tiles (top-down), centred, w x h: a dot grid
                                     with white loops and a border. o: { dots (true) }. g.W, g.H.
     xpFactor(parent, src, o)        a line-up tile: a rounded card with one factor in mkMath (src '2', 'x', 'y'),
                                     centred, about 74 x 84. o: { col (card colour), size (44) }. g.hl(p) gold ring.
     xpLineup(parent, w, h)          police line-up wall: dark backdrop with height lines and numbers, a title strip
                                     'THE LINE-UP'. Origin top-left. g.W, g.H.
     xpTaxi(parent, s)               a blue Singapore taxi, side view, base centre (0,0), about 300 wide; TAXI sign
     xpSocks(parent, o)              a sock (o.col) on a trainer, for the socks-and-shoes gag, base centre (0,0).
                                     g.set(shoe 0..1, sock 0..1): what is still on the foot.
*/

/* ---------- confessional tints, lower thirds ---------- */
const XP_TINT = {
  x: ['#14161E', '#2C3242'], square: ['#0E2A3A', '#1E5E7E'], stick: ['#0E2E22', '#1E6046'], handy: ['#3A2A0E', '#6E5214'],
  phil: ['#16222E', '#2E4A62'], kavya: ['#14243A', '#25446B'], mum: ['#3A1030', '#6B1E58'], dad: ['#123026', '#245A48'],
  boy: ['#3A2410', '#6B4414'], priya: ['#1A2240', '#33407A'], tan: ['#1A2A3A', '#33506E'], ravi: ['#3A2010', '#7A4418'],
};
function xpConf(parent, who) { const c = XP_TINT[who] || XP_TINT.x; return scConfessional(parent, c[0], c[1]); }
const XP_LT = {
  x: ['AGENT X', 'The unknown. Value: classified.'],
  square: ['SQUARE', 'x squared. An area. Posh.'],
  stick: ['STICK', 'x. A length. Chill.'],
  handy: ['HANDY', 'The term outside the bracket.'],
  phil: ['PHIL', 'Function machine. Has a reverse gear.'],
  kavya: ['KAVYA, 12', 'Retest on Monday.'],
  mum: ['MUM', 'Fifty guests at four.'],
  dad: ['DAD', '"Same thing."'],
  boy: ['AH BOY, 8', 'Has not touched the ladoos.'],
  priya: ['PRIYA', 'Best friend. Competitive.'],
  tan: ['MR TAN', 'Maths teacher. Guest. Brought a pun.'],
  ravi: ['UNCLE RAVI', "Mum's brother. Miami."],
};
function xpLowerThird(parent, who) { const l = XP_LT[who] || [String(who).toUpperCase(), '']; return scLowerThird(parent, l[0], l[1]); }

/* ---------- the cast ---------- */
const XP_PROP = { mum: null, dad: null, boy: null, priya: 'pencil', tan: 'marker' };
const XP_RAVI = { name: 'UNCLE RAVI', role: "Mum's brother. Miami.", age: 'adult', skin: SC_SKIN.brown, hair: 'bald', hairCol: SC_HAIR.salt,
  glasses: '#2A1A22', frames: 'round', beard: 'full', beardCol: '#5A5250', style: 'collared', shirt: '#F28C3A', seed: 31, frame: 'broad' };
function cast(parent, kind, o) {
  o = o || {};
  if (kind === 'kavya') return scKavya(parent, o);
  if (kind === 'ravi') { const g = scHuman(parent, Object.assign({}, XP_RAVI, o)); g.who = 'ravi'; return g; }
  if (SC_HUMANS[kind]) {
    const def = kind === 'boy' ? { hand: true } : XP_PROP[kind] ? { prop: XP_PROP[kind] } : {};
    return scCastHuman(parent, kind, Object.assign(def, o));
  }
  const S = { s: o.s, mood: o.mood };
  let c;
  if (kind === 'x') {
    let armL = null, armR = null, shades = null, brk = null, badge = null;
    c = scMake(parent, Object.assign(S, { seed: 4, bob: 2, mood: o.mood || 'deadpan',
      draw: g => {
        // the undercover disguise: giant round brackets
        brk = G(g);
        [-1, 1].forEach(sd => {
          const d = `M${sd * 118},-150 Q${sd * 168},0 ${sd * 118},150`;
          E('path', { d, fill: 'none', stroke: SC_INK, 'stroke-width': 20, 'stroke-linecap': 'round' }, brk);
          E('path', { d, fill: 'none', stroke: '#FFE45C', 'stroke-width': 11, 'stroke-linecap': 'round' }, brk);
        });
        // legs: the bottom half of the x
        [-1, 1].forEach(sd => {
          const d = `M${sd * 14},50 L${sd * 58},118`;
          E('path', { d, stroke: SC_INK, 'stroke-width': 30, 'stroke-linecap': 'round' }, g);
          E('path', { d, stroke: '#2B3A67', 'stroke-width': 20, 'stroke-linecap': 'round' }, g);
          E('ellipse', { cx: sd * 66, cy: 124, rx: 22, ry: 11, fill: '#141418', stroke: SC_INK, 'stroke-width': 3 }, g);
        });
        // arms: the top half of the x (trench-coat sleeves); paths set in upd
        const mkArm = () => { const a = G(g); a.p0 = E('path', { d: '', fill: 'none', stroke: SC_INK, 'stroke-width': 30, 'stroke-linecap': 'round' }, a); a.p1 = E('path', { d: '', fill: 'none', stroke: '#D8B67A', 'stroke-width': 21, 'stroke-linecap': 'round' }, a); a.glove = E('circle', { r: 14, fill: '#1E1E24', stroke: SC_INK, 'stroke-width': 3 }, a); return a; };
        armL = mkArm(); armR = mkArm();
        // the trench coat
        E('path', { d: 'M-44,-22 L44,-22 L60,66 Q0,76 -60,66 Z', fill: '#D8B67A', stroke: SC_INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, g);
        E('path', { d: 'M-44,-22 L-6,30 L-20,-22 Z M44,-22 L6,30 L20,-22 Z', fill: '#C29A5A', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);   // lapels
        E('path', { d: 'M0,30 L0,70', stroke: SC_INK, 'stroke-width': 3 }, g);
        E('rect', { x: -54, y: 22, width: 108, height: 14, rx: 3, fill: '#A87E44', stroke: SC_INK, 'stroke-width': 3 }, g);   // belt
        E('rect', { x: -9, y: 20, width: 18, height: 18, rx: 2, fill: 'none', stroke: '#FFE45C', 'stroke-width': 3 }, g);
        // head and turned-up collar
        E('path', { d: 'M-46,-16 L-40,-56 L-14,-34 Z M46,-16 L40,-56 L14,-34 Z', fill: '#C29A5A', stroke: SC_INK, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, g);
        E('circle', { cx: 0, cy: -72, r: 46, fill: '#F4E4CC', stroke: SC_INK, 'stroke-width': 5 }, g);
        // fedora
        const hat = G(g); tr(hat, 0, -112, 1, -4);
        E('ellipse', { cx: 0, cy: 6, rx: 70, ry: 13, fill: '#2A2A32', stroke: SC_INK, 'stroke-width': 4 }, hat);
        E('path', { d: 'M-40,6 Q-44,-42 0,-40 Q44,-42 40,6 Z', fill: '#34343E', stroke: SC_INK, 'stroke-width': 4 }, hat);
        E('path', { d: 'M-16,-38 Q0,-26 16,-38', fill: 'none', stroke: SC_INK, 'stroke-width': 3 }, hat);
        E('rect', { x: -41, y: -10, width: 82, height: 13, fill: '#C62828', stroke: SC_INK, 'stroke-width': 2.5 }, hat);
        T(hat, 26, 1, 'x', { size: 22, weight: 800, anchor: 'middle', fill: '#FFE45C', font: "Georgia, 'Times New Roman', serif" }).setAttribute('font-style', 'italic');
        // the undercover value tag (scenes put an mkMath in g.badge)
        badge = G(g); tr(badge, 0, 2);
        E('rect', { x: -78, y: -30, width: 156, height: 58, rx: 10, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 4 }, badge);
        E('rect', { x: -78, y: -30, width: 156, height: 12, rx: 6, fill: '#C62828' }, badge);
      },
      face: { x: 0, y: -70, eye: 11, gap: 36, mouthW: 26, mouthY: 24, lidCol: '#E8D2B2' },
      upd: (t, g, st) => {
        const k = st.arms === undefined ? 0.55 : clamp(st.arms);
        [[armL, -1], [armR, 1]].forEach(([a, sd]) => {
          // from the shoulder; k = 0 hands in pockets (down at the hips), k = 1 the full X pose (up and out)
          const x0 = sd * 38, y0 = -12, ang = lerp(100, -48, k) * Math.PI / 180;
          const ex = x0 + sd * Math.cos(ang) * 84, ey = y0 + Math.sin(ang) * 84;
          const d = `M${x0},${y0} L${ex.toFixed(1)},${ey.toFixed(1)}`;
          a.p0.setAttribute('d', d); a.p1.setAttribute('d', d); attr(a.glove, 'cx', ex); attr(a.glove, 'cy', ey);
          op(a.glove, k < 0.12 ? 0 : 1);
        });
        if (shades) op(shades, st.shades === undefined ? 1 : st.shades);
        op(brk, st.brackets || 0);
        op(badge, st.badge || 0);
      } }));
    // sunglasses over the face kit
    const inner = c.firstChild;
    shades = G(inner); tr(shades, 0, -72);
    [-1, 1].forEach(sd => E('rect', { x: sd * 18 - 17, y: -12, width: 34, height: 24, rx: 9, fill: '#101014', stroke: SC_INK, 'stroke-width': 3 }, shades));
    E('path', { d: 'M-2,-4 Q0,-8 2,-4 M-36,-6 L-46,-10 M36,-6 L46,-10', stroke: SC_INK, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' }, shades);
    E('path', { d: 'M-30,-6 L-22,-6 M6,-6 L14,-6', stroke: '#FFFFFF', 'stroke-width': 3, opacity: 0.55, 'stroke-linecap': 'round' }, shades);
    inner.appendChild(badge);
    c.badge = G(badge); tr(c.badge, 0, 12);
    c.set({});
  } else if (kind === 'square') {
    c = scMake(parent, Object.assign(S, { seed: 13, bob: 2, mood: o.mood || 'smug',
      draw: g => {
        // legs with little heels, arms
        [-40, 40].forEach(x => {
          E('path', { d: `M${x},84 L${x},122`, stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
          E('path', { d: `M${x - 10},126 L${x + 12},126 L${x + 12},118`, fill: 'none', stroke: '#C2185B', 'stroke-width': 7, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
        });
        E('path', { d: 'M-86,0 Q-118,30 -104,66', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
        E('path', { d: 'M86,0 Q118,-10 124,-44', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
        E('circle', { cx: -104, cy: 70, r: 9, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
        E('circle', { cx: 124, cy: -48, r: 9, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
        // the tile itself: x by x
        E('rect', { x: -86, y: -86, width: 172, height: 172, rx: 10, fill: '#4CC9F0', stroke: SC_INK, 'stroke-width': 6 }, g);
        E('rect', { x: -76, y: -76, width: 152, height: 152, rx: 6, fill: 'none', stroke: '#FFFFFF', 'stroke-width': 2.5, opacity: 0.5 }, g);
        mkMath(g, 46, 70, 'x^2', { size: 32, anchor: 'middle', fill: MK.ink });
        // tiara and pearls
        E('path', { d: 'M-40,-86 L-30,-112 L-14,-94 L0,-124 L14,-94 L30,-112 L40,-86 Z', fill: '#FFE45C', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
        E('circle', { cx: 0, cy: -104, r: 5, fill: '#FF5FA2', stroke: SC_INK, 'stroke-width': 1.5 }, g);
        let pd = '';
        for (let i = 0; i < 9; i++) { const a = Math.PI * (0.15 + 0.7 * i / 8), x = -Math.cos(a) * 52, y = 50 + Math.sin(a) * 16; pd += `M${(x + 6).toFixed(1)},${y.toFixed(1)} A6,6 0 1 1 ${(x - 6).toFixed(1)},${y.toFixed(1)} A6,6 0 1 1 ${(x + 6).toFixed(1)},${y.toFixed(1)} `; }
        E('path', { d: pd, fill: '#FFFDF6', stroke: SC_INK, 'stroke-width': 1.5 }, g);
      },
      face: { x: 0, y: -26, eye: 15, gap: 56, mouthW: 32, mouthY: 32, lidCol: '#3BB3DA' } }));
  } else if (kind === 'stick') {
    c = scMake(parent, Object.assign(S, { seed: 17, bob: 4, mood: o.mood || 'neutral',
      draw: g => {
        [-14, 14].forEach(x => {
          E('path', { d: `M${x},110 L${x + Math.sign(x) * 6},138`, stroke: SC_INK, 'stroke-width': 6, 'stroke-linecap': 'round' }, g);
          E('ellipse', { cx: x + Math.sign(x) * 12, cy: 140, rx: 13, ry: 6, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 2.5 }, g);
        });
        E('path', { d: 'M-34,-10 Q-70,10 -58,48', fill: 'none', stroke: SC_INK, 'stroke-width': 6, 'stroke-linecap': 'round' }, g);
        E('path', { d: 'M34,-10 Q70,10 58,48', fill: 'none', stroke: SC_INK, 'stroke-width': 6, 'stroke-linecap': 'round' }, g);
        E('circle', { cx: -58, cy: 52, r: 8, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 2.5 }, g);
        E('circle', { cx: 58, cy: 52, r: 8, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 2.5 }, g);
        // the tile: x by 1 (long and thin)
        E('rect', { x: -36, y: -112, width: 72, height: 224, rx: 8, fill: '#56D69B', stroke: SC_INK, 'stroke-width': 5 }, g);
        E('path', { d: 'M-26,-100 L-26,100', stroke: '#FFFFFF', 'stroke-width': 3, opacity: 0.45 }, g);
        mkMath(g, 0, 96, 'x', { size: 34, anchor: 'middle', fill: MK.ink });
        // backwards cap
        const cap = G(g); tr(cap, 0, -112);
        E('path', { d: 'M-36,2 Q-34,-30 0,-32 Q34,-30 36,2 Z', fill: '#E8424F', stroke: SC_INK, 'stroke-width': 3.5 }, cap);
        E('path', { d: 'M-34,-2 Q-60,-2 -64,6 Q-50,10 -30,6 Z', fill: '#B8232F', stroke: SC_INK, 'stroke-width': 3 }, cap);
      },
      face: { x: 0, y: -66, eye: 11, gap: 30, mouthW: 22, mouthY: 24, lidCol: '#3FB57E' } }));
  } else if (kind === 'handy') {
    let body = null, tag = null, gl = [];
    c = scMake(parent, Object.assign(S, { seed: 21, bob: 5, mood: o.mood || 'happy',
      draw: g => {
        // little legs
        [-28, 28].forEach(x => { E('path', { d: `M${x},76 L${x},112`, stroke: SC_INK, 'stroke-width': 8, 'stroke-linecap': 'round' }, g); E('ellipse', { cx: x + Math.sign(x) * 8, cy: 116, rx: 16, ry: 8, fill: '#2E6FD8', stroke: SC_INK, 'stroke-width': 3 }, g); });
        // arms out to the gloves (gloves animate in upd)
        [-1, 1].forEach(sd => {
          const a = G(g);
          E('path', { d: `M${sd * 72},10 Q${sd * 100},22 ${sd * 126},2`, fill: 'none', stroke: SC_INK, 'stroke-width': 11, 'stroke-linecap': 'round' }, a);
          const gv = G(a); tr(gv, sd * 132, 0);
          E('path', { d: `M${-sd * 6},-30 Q${sd * 30},-40 ${sd * 38},-12 Q${sd * 46},14 ${sd * 22},28 Q${-sd * 4},36 ${-sd * 18},20 Q${-sd * 26},0 ${-sd * 6},-30 Z`, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, gv);
          E('path', { d: `M${sd * 4},-22 L${sd * 26},-18 M${sd * 6},-6 L${sd * 30},-2 M${sd * 4},10 L${sd * 26},14`, stroke: SC_INK, 'stroke-width': 2.5, 'stroke-linecap': 'round' }, gv);
          E('path', { d: `M${-sd * 26},-2 Q${-sd * 40},-26 ${-sd * 22},-34`, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 4, 'stroke-linecap': 'round' }, gv);   // thumb
          gl.push({ gv, sd });
        });
        body = E('circle', { cx: 0, cy: 0, r: 80, fill: ball('#FFE45C', '#E2A21C'), stroke: SC_INK, 'stroke-width': 6 }, g);
        E('ellipse', { cx: -30, cy: -44, rx: 20, ry: 11, fill: '#FFFFFF', opacity: 0.35 }, g);
        // name tag with his value
        E('rect', { x: -50, y: 30, width: 100, height: 48, rx: 10, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3.5 }, g);
        tag = T(g, 0, 68, '3', { size: 40, weight: 800, anchor: 'middle', fill: SC_INK });
        E('ellipse', { cx: -52, cy: 4, rx: 11, ry: 7, fill: '#FF8FB0', opacity: 0.5 }, g);
        E('ellipse', { cx: 52, cy: 4, rx: 11, ry: 7, fill: '#FF8FB0', opacity: 0.5 }, g);
      },
      face: { x: 0, y: -26, eye: 15, gap: 50, mouthW: 34, mouthY: 28, lidCol: '#F2C440' },
      upd: (t, g, st) => {
        const k = st.shake || 0;
        gl.forEach(({ gv, sd }, i) => tr(gv, sd * 132, Math.sin(t * TAU * 3 + i * 1.3) * 12 * k));
        const v = st.val === undefined ? '3' : String(st.val);
        if (tag.textContent !== v) setText(tag, v);
        attr(body, 'fill', st.neg ? ball('#C49BFF', '#7B4FD0') : ball('#FFE45C', '#E2A21C'));
      } }));
  } else if (kind === 'phil') {
    let gear = null, lever = null, arF = null, arB = null, slotA = null, slotB = null;
    c = scMake(parent, Object.assign(S, { seed: 25, bob: 1, mood: o.mood || 'neutral',
      draw: g => {
        // input funnel (top left) and output chute (bottom right)
        E('path', { d: 'M-104,-150 L-24,-150 L-48,-102 L-80,-102 Z', fill: '#B9C4CE', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
        E('path', { d: 'M110,74 L176,104 L176,124 L110,104 Z', fill: '#B9C4CE', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
        // gear on the roof
        gear = G(g); tr(gear, 60, -110);
        let gd = '';
        for (let i = 0; i < 16; i++) { const a = i / 16 * TAU, r = i % 2 ? 22 : 30; gd += (i ? 'L' : 'M') + (Math.cos(a) * r).toFixed(1) + ',' + (Math.sin(a) * r).toFixed(1); }
        E('path', { d: gd + 'Z', fill: '#E2B33C', stroke: SC_INK, 'stroke-width': 3 }, gear);
        E('circle', { r: 8, fill: '#6B4423', stroke: SC_INK, 'stroke-width': 2 }, gear);
        // the body
        E('rect', { x: -120, y: -104, width: 240, height: 214, rx: 18, fill: linGrad('#6E93BA', '#45688E', true), stroke: SC_INK, 'stroke-width': 6 }, g);
        E('rect', { x: -108, y: -94, width: 216, height: 84, rx: 12, fill: '#33506E', stroke: SC_INK, 'stroke-width': 3 }, g);   // face panel
        // two operation windows
        [[-58, 52], [58, 52]].forEach(([x, y], i) => {
          E('rect', { x: x - 54, y: y - 32, width: 108, height: 64, rx: 8, fill: '#E9F6FF', stroke: SC_INK, 'stroke-width': 3.5 }, g);
          const s = G(g); tr(s, x, y); if (i) slotB = s; else slotA = s;
        });
        arF = E('path', { d: 'M-4,44 L8,52 L-4,60 Z', fill: '#FFE45C', stroke: SC_INK, 'stroke-width': 2 }, g);
        arB = E('path', { d: 'M4,44 L-8,52 L4,60 Z', fill: '#FF8A3D', stroke: SC_INK, 'stroke-width': 2 }, g);
        // lever (right side)
        lever = G(g); tr(lever, 122, -20);
        E('path', { d: 'M0,0 L0,-60', stroke: SC_INK, 'stroke-width': 8, 'stroke-linecap': 'round' }, lever);
        E('circle', { cx: 0, cy: -64, r: 13, fill: '#E8424F', stroke: SC_INK, 'stroke-width': 3 }, lever);
        E('circle', { cx: 122, cy: -20, r: 10, fill: '#8F9CAB', stroke: SC_INK, 'stroke-width': 3 }, g);
        // rivets
        [[-108, 98], [108, 98], [-108, -2], [108, -2]].forEach(([x, y]) => E('circle', { cx: x, cy: y, r: 4, fill: '#C9D3DC', stroke: SC_INK, 'stroke-width': 1.5 }, g));
      },
      face: { x: 0, y: -54, eye: 17, gap: 74, mouthW: 40, mouthY: 26, lidCol: '#45688E', iris: '#0E2A3A' },
      upd: (t, g, st) => {
        const r = clamp(st.rev || 0), run = st.run === undefined ? 0.3 : st.run;
        tr(gear, 60, -110, 1, (t * 140 * run * (r > 0.5 ? -1 : 1)) % 360);
        tr(lever, 122, -20, 1, lerp(-30, 210, r));
        op(arF, r > 0.5 ? 0 : 1); op(arB, r > 0.5 ? 1 : 0);
      } }));
    c.slotA = slotA; c.slotB = slotB; c.inAt = [-64, -150]; c.outAt = [176, 116];
  } else {
    c = scKavya(parent, o);
  }
  return c;
}

/* ---------- small set pieces ---------- */
function xpClock(parent, r) {
  r = r || 46;
  const g = G(parent);
  E('circle', { r: r + 6, fill: '#8E3B2E', stroke: SC_INK, 'stroke-width': 4 }, g);
  E('circle', { r, fill: '#FFFDF6', stroke: SC_INK, 'stroke-width': 2 }, g);
  let tk = '';
  for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; tk += `M${(Math.sin(a) * r * 0.8).toFixed(1)},${(-Math.cos(a) * r * 0.8).toFixed(1)} L${(Math.sin(a) * r * 0.94).toFixed(1)},${(-Math.cos(a) * r * 0.94).toFixed(1)} `; }
  E('path', { d: tk, stroke: SC_INK, 'stroke-width': 3, 'stroke-linecap': 'round' }, g);
  const hh = E('line', { x1: 0, y1: 0, x2: 0, y2: -r * 0.5, stroke: SC_INK, 'stroke-width': 6, 'stroke-linecap': 'round' }, g);
  const mh = E('line', { x1: 0, y1: 0, x2: 0, y2: -r * 0.78, stroke: SC_INK, 'stroke-width': 4, 'stroke-linecap': 'round' }, g);
  E('circle', { r: 5, fill: '#C62828' }, g);
  g.set = (h, m) => { m = m || 0; hh.setAttribute('transform', `rotate(${((h % 12) * 30 + m * 0.5).toFixed(1)})`); mh.setAttribute('transform', `rotate(${(m * 6).toFixed(1)})`); };
  g.set(1, 0);
  return g;
}

function xpDiya(parent, s) {
  const g = G(parent), inner = G(g); tr(inner, 0, 0, s || 1);
  const fl = G(inner); tr(fl, 10, -30);
  const glowC = E('circle', { r: 30, fill: glow('#FFC247'), opacity: 0.8 }, fl);
  const flame = E('path', { d: 'M0,-34 Q14,-10 8,0 Q0,6 -8,0 Q-14,-10 0,-34 Z', fill: '#FFB020', stroke: '#E8641A', 'stroke-width': 2 }, fl);
  E('path', { d: 'M0,-18 Q6,-6 3,0 Q0,2 -3,0 Q-6,-6 0,-18 Z', fill: '#FFF3B0' }, fl);
  E('path', { d: 'M-36,-22 Q-34,0 0,0 Q30,0 40,-24 L22,-30 Q0,-22 -36,-22 Z', fill: '#C8642E', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, inner);
  E('path', { d: 'M-26,-14 Q0,-6 28,-16', fill: 'none', stroke: '#FFE45C', 'stroke-width': 3, 'stroke-dasharray': '4 5' }, inner);
  g.upd = t => { const k = 0.9 + 0.1 * Math.sin(t * 13 + (s || 1) * 7) + 0.06 * Math.sin(t * 29); tr(flame, 0, 0, k, Math.sin(t * 9) * 4); op(glowC, 0.6 + 0.2 * k); };
  return g;
}

function xpLights(parent, pts, o) {
  o = o || {};
  const g = G(parent), n = o.n || 26, cols = ['#FF5F5F', '#FFE45C', '#56D69B', '#6EC8FF', '#FF8FC8'];
  // cumulative lengths along the polyline
  const L = [0];
  for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const tot = L[L.length - 1];
  const at = d => { let i = 1; while (i < L.length - 1 && L[i] < d) i++; const f = (d - L[i - 1]) / Math.max(1e-6, L[i] - L[i - 1]); return [lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)]; };
  const wire = E('path', { d: 'M' + pts.map(q => q[0].toFixed(1) + ',' + q[1].toFixed(1)).join(' L'), fill: 'none', stroke: '#2E4A3A', 'stroke-width': 3 }, g);
  mkDash(wire);
  const bulbs = [];
  for (let i = 0; i < n; i++) {
    const d = (i + 0.5) / n * tot, [x, y] = at(d), b = G(g); tr(b, x, y);
    const halo = E('circle', { r: 13, fill: glow(cols[i % 5]), opacity: 0.7 }, b);
    const core = E('ellipse', { rx: 6, ry: 8, fill: cols[i % 5], stroke: SC_INK, 'stroke-width': 1.5 }, b);
    bulbs.push({ b, halo, core, f: (i + 0.5) / n });
  }
  g.set = (p, t) => {
    mkDraw(wire, p);
    bulbs.forEach(({ b, halo, f }, i) => { op(b, f <= p ? 1 : 0); op(halo, 0.35 + 0.5 * (0.5 + 0.5 * Math.sin((t || 0) * 4 + i * 1.7))); });
  };
  g.set(1, 0);
  return g;
}

function xpGarland(parent, x0, x1, y, sag) {
  const g = G(parent), n = Math.round((x1 - x0) / 34);
  const yy = x => y + sag * (1 - Math.pow((2 * (x - x0) / (x1 - x0)) - 1, 2));
  let d = '';
  for (let i = 0; i <= 20; i++) { const x = lerp(x0, x1, i / 20); d += (i ? 'L' : 'M') + x.toFixed(1) + ',' + yy(x).toFixed(1); }
  E('path', { d, fill: 'none', stroke: '#6B4423', 'stroke-width': 3 }, g);
  let leaves = '', flowers = '';
  for (let i = 0; i <= n; i++) {
    const x = lerp(x0, x1, i / n), yv = yy(x);
    if (i % 2) leaves += `M${x - 9},${yv} Q${x},${yv + 46} ${x + 9},${yv} Z `;
    else flowers += `M${x + 12},${yv + 4} A12,12 0 1 1 ${x - 12},${yv + 4} A12,12 0 1 1 ${x + 12},${yv + 4} Z `;
  }
  E('path', { d: leaves, fill: '#2FA36B', stroke: '#1E6B44', 'stroke-width': 2 }, g);
  E('path', { d: flowers, fill: '#FF9A1F', stroke: '#C8640E', 'stroke-width': 2 }, g);
  return g;
}

/* ---------- sets ---------- */
function xpFlat(parent) {
  const g = G(parent), back = G(g);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#FFF3DE', '#F6E2C0', true) }, back);
  E('rect', { x: 0, y: 470, width: 1200, height: 280, fill: '#E8C9A0' }, back);   // lower wall / floor beyond the table
  E('rect', { x: 0, y: 462, width: 1200, height: 12, fill: '#C9A57A' }, back);   // skirting
  // the square window, Block 210 outside
  E('rect', { x: 150, y: 150, width: 300, height: 270, fill: linGrad('#9FD8FF', '#DFF2FF', true), stroke: '#FFFFFF', 'stroke-width': 14 }, back);
  E('rect', { x: 186, y: 210, width: 150, height: 210, fill: '#E9DCC4', stroke: '#B8A27A', 'stroke-width': 3 }, back);
  let win = '';
  for (let r = 0; r < 4; r++) for (let k = 0; k < 3; k++) win += `M${198 + k * 46},${224 + r * 48} h30 v22 h-30 Z `;
  E('path', { d: win, fill: '#9CC2DC' }, back);
  T(back, 380, 260, '210', { size: 26, weight: 800, anchor: 'middle', fill: '#2E7DD8' });
  let gr = '';
  for (let x = 200; x < 450; x += 50) gr += `M${x},157 L${x},413 `;
  gr += 'M157,285 L443,285';
  E('path', { d: gr, stroke: '#7D8A96', 'stroke-width': 5 }, back);
  E('rect', { x: 150, y: 150, width: 300, height: 270, fill: 'none', stroke: '#C9D3DC', 'stroke-width': 4 }, back);
  g.lights = xpLights(back, [[140, 140], [460, 140], [460, 430], [140, 430], [140, 140]], { n: 28 });
  // torana garland along the top
  xpGarland(back, 0, 1200, 52, 26);
  // wall clock
  g.clockAt = [1050, 170];
  g.clock = xpClock(back, 46); tr(g.clock, 1050, 170);
  g.clock.set(1, 0);
  // shelf of diyas
  g.shelf = G(back);
  E('rect', { x: 840, y: 360, width: 300, height: 14, fill: '#9C6B3E', stroke: '#6B4423', 'stroke-width': 3 }, g.shelf);
  const diyas = [880, 990, 1100].map(x => { const d = xpDiya(g.shelf, 0.8); tr(d, x, 360); return d; });
  // characters go here
  g.mid = G(g);
  // the dining table
  const front = G(g);
  E('rect', { x: 60, y: 518, width: 1080, height: 24, rx: 6, fill: '#8E5A34', stroke: '#5A3418', 'stroke-width': 4 }, front);
  E('path', { d: 'M70,538 L1130,538 L1150,750 L50,750 Z', fill: '#B8233A', stroke: '#6E1424', 'stroke-width': 4 }, front);   // tablecloth
  E('path', { d: 'M66,560 L1134,560 M68,580 L1136,580', stroke: '#FFC247', 'stroke-width': 5 }, front);
  let mot = '';
  for (let x = 110; x < 1110; x += 80) mot += `M${x},640 l14,-18 l14,18 l-14,18 Z `;
  E('path', { d: mot, fill: '#FFC247', opacity: 0.7 }, front);
  g.front = front;
  g.top = G(g);
  g.tableY = 530;
  g.upd = (t, lp) => { diyas.forEach(d => d.upd(t)); g.lights.set(lp === undefined ? 1 : lp, t); };
  return g;
}

function xpDoor(parent) {
  const g = G(parent), back = G(g);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#DDE8E2', '#C8D6CE', true) }, back);   // corridor wall
  E('rect', { x: 0, y: 0, width: 1200, height: 60, fill: '#F2F5F3' }, back);   // ceiling
  E('rect', { x: 560, y: 22, width: 160, height: 16, rx: 6, fill: '#FFFDE8', stroke: '#B9C4CE', 'stroke-width': 2 }, back);   // tube light
  // parapet and the view, right
  E('rect', { x: 880, y: 60, width: 320, height: 690, fill: linGrad('#9FD8FF', '#E3F3FF', true) }, back);
  E('rect', { x: 930, y: 160, width: 220, height: 360, fill: '#E9DCC4', stroke: '#B8A27A', 'stroke-width': 3 }, back);
  let w = '';
  for (let r = 0; r < 6; r++) for (let k = 0; k < 4; k++) w += `M${946 + k * 52},${176 + r * 56} h34 v26 h-34 Z `;
  E('path', { d: w, fill: '#9CC2DC' }, back);
  E('rect', { x: 870, y: 60, width: 20, height: 690, fill: '#B9C4CE' }, back);
  // the door frame, open door and folded gate
  E('rect', { x: 330, y: 110, width: 320, height: 640, fill: '#8E5A34', stroke: '#5A3418', 'stroke-width': 6 }, back);
  E('rect', { x: 350, y: 130, width: 280, height: 620, fill: linGrad('#FFE9C6', '#F4D3A0', true) }, back);   // the bright flat inside
  E('rect', { x: 380, y: 200, width: 110, height: 90, fill: '#FFC247', opacity: 0.35 }, back);
  E('path', { d: 'M630,130 L700,150 L700,750 L630,750 Z', fill: '#A86A3A', stroke: '#5A3418', 'stroke-width': 4 }, back);   // the open door
  let gt = '';
  for (let x = 250; x <= 320; x += 14) gt += `M${x},140 L${x},750 `;
  E('path', { d: gt + 'M244,180 L326,180 M244,420 L326,420', stroke: '#5A6670', 'stroke-width': 5 }, back);   // folded gate
  // unit number and doorbell
  E('rect', { x: 680, y: 160, width: 130, height: 46, rx: 6, fill: '#FFFFFF', stroke: '#5A6670', 'stroke-width': 3 }, back);
  T(back, 745, 193, '#08-208', { size: 26, weight: 800, anchor: 'middle', fill: SC_INK });
  E('circle', { cx: 745, cy: 250, r: 12, fill: '#FFFFFF', stroke: '#5A6670', 'stroke-width': 3 }, back);
  // torana over the door, diyas each side
  xpGarland(back, 320, 660, 118, 30);
  const diyas = [280, 700].map(x => { const d = xpDiya(back, 0.9); tr(d, x, 540); return d; });
  // shoe rack, left
  E('rect', { x: 30, y: 400, width: 190, height: 170, rx: 6, fill: '#9C6B3E', stroke: '#6B4423', 'stroke-width': 4 }, back);
  [440, 500].forEach(y => E('rect', { x: 30, y, width: 190, height: 6, fill: '#6B4423' }, back));
  [[60, 432, '#2E6FD8'], [118, 432, '#E8424F'], [176, 432, '#FFFFFF'], [70, 492, '#3A3440'], [140, 492, '#FFC247']].forEach(([x, y, c]) => E('path', { d: `M${x - 24},${y} Q${x - 24},${y - 20} ${x},${y - 22} L${x + 26},${y - 6} L${x + 26},${y} Z`, fill: c, stroke: SC_INK, 'stroke-width': 2.5 }, back));
  g.doorAt = [490, 420];
  g.mid = G(g);
  const front = G(g);
  E('rect', { x: 0, y: 560, width: 1200, height: 190, fill: linGrad('#B9C9C0', '#97AAA0', true), stroke: '#6E8278', 'stroke-width': 4 }, front);   // the low parapet band
  E('rect', { x: 0, y: 552, width: 1200, height: 14, fill: '#E2EAE6', stroke: '#6E8278', 'stroke-width': 3 }, front);
  g.front = front;
  g.top = G(g);
  g.tableY = 556;
  g.upd = t => diyas.forEach(d => d.upd(t));
  return g;
}

function xpMiami(parent, w, h, night) {
  const g = G(parent);
  E('rect', { x: -w / 2, y: -h / 2, width: w, height: h, fill: night ? linGrad('#0E1838', '#2A3C70', true) : linGrad('#7FD3FF', '#FFE2B8', true) }, g);
  const sx = w / 600, sy = h / 400, inner = G(g); inner.setAttribute('transform', `scale(${sx.toFixed(3)} ${sy.toFixed(3)})`);
  if (night) { let st = ''; const r = rng(3); for (let i = 0; i < 24; i++) { const x = -290 + r() * 580, y = -190 + r() * 160; st += `M${x.toFixed(0)},${y.toFixed(0)} h3 v3 h-3 Z `; } E('path', { d: st, fill: '#FFFFFF', opacity: 0.8 }, inner); E('circle', { cx: 210, cy: -130, r: 30, fill: '#FFF6D0' }, inner); }
  else E('circle', { cx: 210, cy: -120, r: 40, fill: '#FFE45C', opacity: 0.9 }, inner);
  E('rect', { x: -300, y: 0, width: 600, height: 80, fill: night ? '#1E3A6E' : '#2EA8E0' }, inner);   // sea
  E('path', { d: 'M-300,20 Q-250,10 -200,20 T-100,20 T0,20 T100,20 T200,20 T300,20', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 3, opacity: 0.5 }, inner);
  E('rect', { x: -300, y: 80, width: 600, height: 120, fill: night ? '#6E6A58' : '#F4DCA0' }, inner);   // sand
  // palm
  E('path', { d: 'M-230,200 Q-240,60 -212,-60', fill: 'none', stroke: '#8B5A2B', 'stroke-width': 14 }, inner);
  [[-80, 20], [-30, -30], [30, -24], [76, 22], [0, 46]].forEach(([dx, dy]) => E('path', { d: `M-212,-60 Q${-212 + dx / 2},${-94 + dy / 2} ${-212 + dx},${-50 + dy}`, fill: 'none', stroke: '#2FA36B', 'stroke-width': 12, 'stroke-linecap': 'round' }, inner));
  // beach umbrella
  E('path', { d: 'M220,180 L232,40', stroke: '#5A6670', 'stroke-width': 6 }, inner);
  E('path', { d: 'M150,56 Q232,-20 314,32 Z', fill: '#FF6B8A', stroke: SC_INK, 'stroke-width': 4 }, inner);
  E('path', { d: 'M190,40 Q232,-10 262,40', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 8 }, inner);
  return g;
}

function xpRaviCall(parent, w, h, label, night) {
  const g = scVideoCall(parent, w, h, label || 'Uncle Ravi · Miami');
  g.bg = xpMiami(g.screen, w, h, night);
  const holder = G(g.screen); tr(holder, 0, h * 0.22);
  g.ravi = cast(holder, 'ravi', { s: h / 330 });
  return g;
}

/* ---------- props ---------- */
function xpStamp(parent, ok) { return mkStamp(parent, ok ? 'IDENTITY CONFIRMED' : 'COVER BLOWN', ok ? '#1E9E5A' : '#D32F2F'); }

function xpTest(parent, o) {
  o = o || {};
  const g = G(parent), inner = G(g); tr(inner, 0, 0, o.s || 1);
  E('rect', { x: -214, y: -272, width: 440, height: 560, rx: 6, fill: 'rgba(0,0,0,0.22)' }, inner);
  E('rect', { x: -220, y: -280, width: 440, height: 560, rx: 6, fill: '#FFFFFF', stroke: '#B9C4CE', 'stroke-width': 3 }, inner);
  let ln = '';
  for (let y = -170; y < 270; y += 44) ln += `M-196,${y} L196,${y} `;
  E('path', { d: ln, stroke: '#CFE3F5', 'stroke-width': 2 }, inner);
  E('path', { d: 'M-160,-280 L-160,280', stroke: '#F4A0A8', 'stroke-width': 2.5 }, inner);
  T(inner, 0, -236, 'CLASS TEST: ALGEBRA', { size: 30, weight: 800, anchor: 'middle', fill: SC_INK });
  T(inner, -146, -186, 'Name: Kavya', { size: 26, weight: 700, fill: '#2E4C8C', font: FB });
  mkText(inner, -146, -112, 'Q1  Factorise {{12x + 18}}', { size: 30, fill: SC_INK, weight: 700 });
  const m = mkMeasure('12', { size: 30 * 1.06 }), q = textWidth('Q1  Factorise ', 30, FD, 700);
  g.xAt = [(-146 + q + m.w + 8) * (o.s || 1), -122 * (o.s || 1)];
  g.ans = G(inner);
  mkMath(g.ans, -100, -36, '12(x + 18)', { size: 40, fill: '#2E4C8C' });
  g.cross = cross(inner, 26, '#D32F2F'); tr(g.cross, 150, -50);
  g.revise = G(inner); tr(g.revise, 0, 70, 1, -6);
  T(g.revise, 0, 0, 'REVISE!', { size: 64, weight: 800, anchor: 'middle', fill: '#D32F2F' });
  E('path', { d: 'M-130,16 Q0,26 130,12 M-120,30 Q0,40 120,26', fill: 'none', stroke: '#D32F2F', 'stroke-width': 5, 'stroke-linecap': 'round' }, g.revise);
  g.retest = G(inner);
  T(g.retest, 0, 200, 'Retest: Monday', { size: 34, weight: 800, anchor: 'middle', fill: '#D32F2F' });
  E('circle', { cx: 160, cy: -186, r: 34, fill: 'none', stroke: '#D32F2F', 'stroke-width': 4 }, inner);
  T(inner, 160, -177, '12/20', { size: 24, weight: 800, anchor: 'middle', fill: '#D32F2F' });
  return g;
}

function xpLadoo(parent, s) {
  const g = G(parent); tr(g, 0, 0, s || 1);
  E('circle', { r: 24, fill: ball('#FFB347', '#E07A12'), stroke: SC_INK, 'stroke-width': 3 }, g);
  E('path', { d: 'M-10,-8 h3 M6,-12 h3 M-4,6 h3 M10,4 h3 M-14,10 h3 M2,-2 h3', stroke: '#C8640E', 'stroke-width': 3, 'stroke-linecap': 'round' }, g);
  return g;
}

function xpTray(parent, o) {
  o = o || {};
  const n = o.n || 18, g = G(parent);
  E('ellipse', { cx: 0, cy: 10, rx: 132, ry: 46, fill: '#C9D3DC', stroke: '#5A6670', 'stroke-width': 4 }, g);
  E('ellipse', { cx: 0, cy: 4, rx: 118, ry: 38, fill: '#E6EBEF' }, g);
  const balls = [];
  for (let i = 0; i < n; i++) {
    const row = Math.floor(i / 6), col = i % 6, x = -80 + col * 32 + (row % 2) * 14, y = 18 - row * 16;
    const b = xpLadoo(g, 0.62); tr(b, x, y); balls.push(b);
  }
  g.set = k => balls.forEach((b, i) => op(b, clamp(k - i)));
  g.set(n);
  return g;
}

function xpMurukku(parent, s) {
  const g = G(parent), inner = G(g); tr(inner, 0, 0, s || 1);
  E('path', { d: 'M-44,0 L-40,-100 Q0,-110 40,-100 L44,0 Z', fill: 'rgba(255,255,255,0.55)', stroke: '#5A6670', 'stroke-width': 3, 'stroke-linejoin': 'round' }, inner);
  [[-18, -62], [16, -70], [0, -36]].forEach(([x, y]) => {
    E('circle', { cx: x, cy: y, r: 17, fill: '#E2A21C', stroke: '#8A5A10', 'stroke-width': 2.5 }, inner);
    E('path', { d: `M${x},${y} m-8,0 a8,8 0 1 1 8,8 a4,4 0 1 1 -4,-4`, fill: 'none', stroke: '#8A5A10', 'stroke-width': 2.5 }, inner);
  });
  E('rect', { x: -40, y: -22, width: 80, height: 20, rx: 4, fill: '#C62828' }, inner);
  T(inner, 0, -7, 'MURUKKU', { size: 14, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  E('rect', { x: -42, y: -110, width: 84, height: 10, rx: 3, fill: '#E2B33C', stroke: '#5A6670', 'stroke-width': 2 }, inner);
  return g;
}

function xpGoodieBag(parent, o) {
  o = o || {};
  const col = o.col || '#E8457A', g = G(parent);
  const peek = G(g);
  [[-26, -132, '#E2A21C'], [0, -140, '#FFB347'], [24, -130, '#E2A21C']].forEach(([x, y, c]) => E('circle', { cx: x, cy: y, r: 16, fill: c, stroke: SC_INK, 'stroke-width': 2.5 }, peek));
  E('path', { d: 'M-30,-120 Q-30,-170 0,-170 Q30,-170 30,-120', fill: 'none', stroke: '#E2B33C', 'stroke-width': 6 }, g);
  E('path', { d: 'M-58,-120 L58,-120 L64,0 L-64,0 Z', fill: col, stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
  E('path', { d: 'M-58,-120 L58,-120 L56,-104 L-56,-104 Z', fill: mkShade(col, -0.25) }, g);
  const d = xpDiya(g, 0.62); tr(d, -4, -36); d.upd(0);
  g.set = p => { op(peek, clamp(p)); tr(peek, 0, 30 * (1 - clamp(p))); };
  g.set(1);
  return g;
}

function xpSweetBag(parent, o) {
  o = o || {};
  const g = G(parent);
  E('path', { d: 'M-38,0 L-34,-86 L34,-86 L38,0 Z', fill: 'rgba(255,255,255,0.5)', stroke: '#5A6670', 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
  E('rect', { x: -36, y: -92, width: 72, height: 10, rx: 3, fill: '#2E7DD8', stroke: '#5A6670', 'stroke-width': 2 }, g);
  [[-18, -16, '#FF5F5F'], [6, -22, '#56D69B'], [20, -10, '#FFE45C'], [-6, -8, '#6EC8FF']].forEach(([x, y, c]) => E('rect', { x: x - 9, y: y - 6, width: 18, height: 12, rx: 5, fill: c, stroke: SC_INK, 'stroke-width': 2 }, g));
  E('circle', { cx: 0, cy: -54, r: 22, fill: '#FFE45C', stroke: SC_INK, 'stroke-width': 3 }, g);
  const lab = o.label || 'x';
  const t = T(g, 0, -44, lab, { size: 30, weight: 800, anchor: 'middle', fill: SC_INK, font: "Georgia, 'Times New Roman', serif" });
  if (lab === 'x') t.setAttribute('font-style', 'italic');
  return g;
}

function xpKolam(parent, w, h, o) {
  o = o || {};
  const g = G(parent);
  E('rect', { x: -w / 2, y: -h / 2, width: w, height: h, fill: '#A8402E', stroke: '#6E2418', 'stroke-width': 4 }, g);
  let tl = '';
  for (let x = -w / 2 + 60; x < w / 2; x += 60) tl += `M${x},${-h / 2} L${x},${h / 2} `;
  for (let y = -h / 2 + 60; y < h / 2; y += 60) tl += `M${-w / 2},${y} L${w / 2},${y} `;
  E('path', { d: tl, stroke: '#8E3424', 'stroke-width': 2 }, g);
  E('rect', { x: -w / 2 + 14, y: -h / 2 + 14, width: w - 28, height: h - 28, rx: 18, fill: 'none', stroke: '#FFFFFF', 'stroke-width': 4 }, g);
  if (o.dots !== false) {
    let dd = '', lp = '';
    const nx = Math.max(2, Math.floor((w - 60) / 46)), ny = Math.max(2, Math.floor((h - 60) / 46));
    for (let i = 0; i < nx; i++) for (let j = 0; j < ny; j++) {
      const x = -w / 2 + 30 + (i + 0.5) * (w - 60) / nx, y = -h / 2 + 30 + (j + 0.5) * (h - 60) / ny;
      dd += `M${(x + 3).toFixed(1)},${y.toFixed(1)} A3,3 0 1 1 ${(x - 3).toFixed(1)},${y.toFixed(1)} A3,3 0 1 1 ${(x + 3).toFixed(1)},${y.toFixed(1)} `;
      if ((i + j) % 2 === 0) lp += `M${(x - 16).toFixed(1)},${y.toFixed(1)} Q${x.toFixed(1)},${(y - 20).toFixed(1)} ${(x + 16).toFixed(1)},${y.toFixed(1)} Q${x.toFixed(1)},${(y + 20).toFixed(1)} ${(x - 16).toFixed(1)},${y.toFixed(1)} `;
    }
    E('path', { d: lp, fill: 'none', stroke: '#FFFFFF', 'stroke-width': 3, opacity: 0.85 }, g);
    E('path', { d: dd, fill: '#FFFFFF' }, g);
  }
  g.W = w; g.H = h;
  return g;
}

function xpFactor(parent, src, o) {
  o = o || {};
  const g = G(parent);
  const ring = E('rect', { x: -44, y: -50, width: 88, height: 100, rx: 16, fill: 'none', stroke: '#FFE45C', 'stroke-width': 7 }, g);
  E('rect', { x: -37, y: -43, width: 74, height: 86, rx: 12, fill: o.col || '#FFFDF6', stroke: SC_INK, 'stroke-width': 4 }, g);
  const m = mkMath(g, 0, 0, src, { size: o.size || 44, anchor: 'middle', fill: MK.ink }); tr(m, 0, (m.a - m.d) / 2);
  g.hl = p => op(ring, clamp(p));
  g.hl(0);
  return g;
}

function xpLineup(parent, w, h) {
  const g = G(parent);
  E('rect', { x: 0, y: 0, width: w, height: h, rx: 10, fill: '#2A3340', stroke: '#8F9CAB', 'stroke-width': 5 }, g);
  let ln = '';
  for (let y = 70; y < h - 10; y += 40) ln += `M12,${y} L${w - 12},${y} `;
  E('path', { d: ln, stroke: '#4A5868', 'stroke-width': 2 }, g);
  for (let k = 0, y = h - 30; y > 70; y -= 80, k++) T(g, w - 20, y + 9, String(150 + k * 20), { size: 22, weight: 700, anchor: 'end', fill: '#8F9CAB' });
  E('rect', { x: 0, y: 0, width: w, height: 54, rx: 10, fill: '#141A22' }, g);
  T(g, w / 2, 38, 'THE LINE-UP', { size: 32, weight: 800, anchor: 'middle', fill: '#FFE45C', ls: 4 });
  g.W = w; g.H = h;
  return g;
}

function xpTaxi(parent, s) {
  const g = G(parent), inner = G(g); tr(inner, 0, 0, s || 1);
  E('path', { d: 'M-150,-30 L-140,-70 Q-130,-80 -110,-80 L-70,-80 L-40,-122 L60,-122 L100,-80 L136,-76 Q152,-72 152,-52 L152,-24 Q150,-14 138,-14 L-140,-14 Q-150,-16 -150,-30 Z', fill: '#2E7DD8', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, inner);
  E('path', { d: 'M-60,-82 L-36,-114 L6,-114 L6,-82 Z M16,-82 L16,-114 L54,-114 L84,-82 Z', fill: '#BFE6FF', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, inner);
  E('rect', { x: -26, y: -144, width: 60, height: 22, rx: 5, fill: '#FFE45C', stroke: SC_INK, 'stroke-width': 3 }, inner);
  T(inner, 4, -127, 'TAXI', { size: 16, weight: 800, anchor: 'middle', fill: SC_INK });
  [-92, 92].forEach(x => { E('circle', { cx: x, cy: -14, r: 26, fill: '#2A2A32', stroke: SC_INK, 'stroke-width': 3 }, inner); E('circle', { cx: x, cy: -14, r: 10, fill: '#C9D3DC' }, inner); });
  return g;
}

function xpSocks(parent, o) {
  o = o || {};
  const g = G(parent);
  const sock = E('path', { d: 'M-18,-120 L18,-120 L18,-40 Q20,-10 50,-6 Q66,0 60,10 L-20,10 Q-24,-10 -18,-40 Z', fill: o.col || '#FF8FC8', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
  const shoe = G(g);
  E('path', { d: 'M-30,-34 L24,-34 Q44,-22 74,-16 Q92,-10 88,8 L-30,8 Z', fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, shoe);
  E('path', { d: 'M-30,0 L88,0', stroke: '#E8424F', 'stroke-width': 6 }, shoe);
  E('path', { d: 'M4,-28 L14,-18 M14,-30 L24,-20', stroke: SC_INK, 'stroke-width': 3, 'stroke-linecap': 'round' }, shoe);
  g.set = (sh, so) => { op(shoe, sh === undefined ? 1 : sh); op(sock, so === undefined ? 1 : so); };
  return g;
}
