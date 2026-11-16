/* SLIDE, FLIP, TURN (Claude Sitcom Ep 17, Transformations & Symmetry): the cast, sets and props of this episode.
   Bundled after engine lib.js, kit.js, mathkit.js and sitcom.js (scMake, scTalk, scKavya, scCastHuman,
   scConfessional, scLowerThird, scVideoCall, mk* maths kit). Every top-level name starts with `tf`/`TF_`, except `cast`.

   Characters: cast(parent, kind, o) -> g, origin at the character's centre, about 200-260 px tall at s = 1
     o: { s (scale), mood (default mood), ... }   (humans: any scHuman option overrides, e.g. prop, lift)
     g.set({ t, talk, mood, look, sweat, still, ... })   call every frame
       talk 0..1 (use scTalk(S, t, who)); mood: neutral | happy | smug | annoyed | sad | shock | deadpan
       look -1..1 pupils left/right; still: true stops the idle bob
     HUMANS (busts: the bottom of the shirt is at y = 140, so stand them behind the stage lip, the costume table
     or the frame edge; a bust at y about 440 behind a front at y 530 hides its hem):
       'kavya'  (kavya)  Kavya, 12 (scKavya, PE shirt "8"). No hand: for a raised hand use tfArm (below).
       'mum'    (mum)    Mum: magenta kurta, bun, bindi. Default prop: a paintbrush ('brush', teal paint)
       'dad'    (dad)    Dad: glasses, moustache, green polo. Default prop: a roll of gaffer tape ('tape')
       'boy'    (boy)    Ah Boy, 8: orange star tee. Default: an empty hand (lift: 1 raises it); { prop: 'dino' }
                         gives him his shadow-puppet dinosaur on a stick
       'priya'  (priya)  Priya, 12: school uniform, bob, yellow clip. Default prop: her choreography notes ('paper')
       'tan'    (tan)    Mr Tan: shirt and tie, glasses. Default prop: an emcee's microphone ('mic')
       'rose'   (rose)   Auntie Rose (cameo, guest judge): curly perm, floral blouse. Default prop: a plate of kueh ('kueh')
       Custom props (any human): 'brush', 'tape', 'mic', 'dino', 'kueh'; or any scHuman prop ('phone', 'marker', ...);
       { prop: null } for none; { body: true } for a full body (scHumanBody, feet at 0,0; pose API, no custom props).
     CARTOONS (scMake):
       'miroir' (miroir) Madame Miroir, the MIRROR: a tall gilded oval cheval mirror on a stand with castors (so she
                         rolls to wherever the dancing is); the face is on the glass; a grey ballet-mistress bun with
                         hairpins on top of the frame; white gloves; a black cane; her name plate reads MIROIR
                         backwards. About 330 tall at s = 1 (y -195..160). Strict, vain, French-ish. Default mood smug.
                         Extra: { tap: 0..1 } raises the cane (1 = up; bring it down for the stamp thump).
       'vic'    (vic)    Vic, the COLUMN VECTOR, stage manager: two tall round brackets with two big numbers stacked
                         between them (top = across, in TF_ACROSS blue; bottom = up/down, in TF_UP orange), a grey head
                         with a black beanie and a headset, a clipboard. About 280 tall (y -150..140). Brisk.
                         Extra: { top: '5', bot: '−2' } (strings; use '−' for minus) change the numbers (cheap);
                         { point: 0..1 } raises his right arm to point up-right.
       'twirla' (twirla) Twirla, ROTATION (and rotational symmetry): a pink ballerina en pointe on a red drawing pin
                         (the centre of rotation, at (0, 132)), tutu, arms in an arch, a dark bun. About 300 tall
                         (y -165..140). Bubbly, dramatic, "darling". Extra: { spin: degrees } turns her whole body
                         about the pin (positive = clockwise on screen); { arrow: 0..1 } shows an anticlockwise
                         curved-arrow halo; { dizzy: 0..1 } little stars circling her head.
       'zoom'   (zoom)   Mr Zoom, ENLARGEMENT: an old beige overhead projector (since 1987) with a face on the base, a
                         grey walrus moustache, a bow tie; the projector head and lens at the top right (lens centre at
                         TF_LENS = [128, -168] in his own coordinates: the centre of enlargement). About 300 wide.
                         Old showbiz. Extra: { beam: 0..1 } a cone of light from the lens out to the right (700 px).
       'hypo'   (hypo)   Hypo, the HYPOTENUSE: an aluminium ladder, 360 tall at s = 1 (y -180..180), face on a white
                         plate near the top, sunglasses pushed up, a gold "c" medal. Vain: always the longest side.
                         Extra: { lean: degrees } tips him about his feet (0, 180) (negative = top to the left).

   Shots
     tfConf(parent, who)             confessional background tinted for that character (scConfessional); g.set(p, t)
     TF_TINT                         the confessional colours per character
     tfLowerThird(parent, who)       scLowerThird with this episode's name and role for `who` (TF_LT); g.set(p)

   Sets (full stage 1200 x 750; each returns g)
     tfHall(parent)       wide shot of the Block 208 Community Club multi-purpose hall: high windows, a sign
                          "BLK 208 COMMUNITY CLUB", fans, the stage at the far end (red curtains, the SHINE ON
                          banner, Mum's tile backdrop), three rows of blue plastic chairs. g.upd(t) turns the fans;
                          g.stage = [x, y] the centre of the stage opening (zoom target); g.banner (tfBanner).
     tfStage(parent)      close-up of the stage from the front row: Mum's Peranakan-tile backdrop (x 150-1050,
                          y 182-520), red velvet curtains at both sides, a pelmet with the SHINE ON banner (g.banner),
                          a pull-down projector screen (g.screen, hidden: op(g.screen, 1); g.screenBox {x, y, w, h}),
                          and the stage lip with footlights (top at g.counterY = 530). LAYERS: characters in g.mid
                          (busts at y about 440), the lip is g.front, props on the lip go in g.top (drawn last).
                          g.upd(t) flickers the footlights.
     tfStudio(parent)     the rehearsal room: lilac wall, ballet barre, a SHINE ON poster, a wall clock with a seconds
                          hand (g.clock, a tfClock), wooden floor, and the costume table in front (top at
                          g.counterY = 530; sequinned fabric). LAYERS g.mid / g.front / g.top as in tfStage.
                          g.miroirAt = [x, y] where Madame Miroir stands (s about 1). g.upd(t) runs the clock.

   Props (around their own origin)
     TF_ACROSS, TF_UP                colours for the across (x) and up/down (y) parts of every vector and step
     TF_COL                          a colour per dancer (kavya, priya, boy, dad, mum, tan, rose) for tokens and paths
     tfVec(parent, top, bot, o)      a column vector: two numbers stacked in tall round brackets, centred at (0, 0).
                                     top/bot are mkMath sources ('5', '-2'). o: { size (44), col (bracket ink, C.ink),
                                     topCol (TF_ACROSS), botCol (TF_UP), halo }. g.w, g.h. Build the variants once.
     tfFloor(parent, o)              OVERHEAD CAM: a top-down view of the stage floor (wooden boards, white tape grid)
                                     as mkAxes with dark ink. o: xmin, xmax, ymin, ymax (default -2..10, -3..7), unit (48),
                                     size (24), cam (true: viewfinder corners and an "OVERHEAD CAM" tag). Origin = top-left
                                     of the plot box; g.px(x), g.py(y), g.ax (the mkAxes: g.ax.point, .seg, .poly ...).
     tfDot(parent, who, o)           a dancer token: a circle in TF_COL[who] with her/his initial (K P B D M T R), r 22;
                                     o: { r, label (override the letter) }. g.set(p) pops it in.
     tfTile(parent, o)               one Peranakan tile, centred: cream square, teal border, pink corner quarter-circles,
                                     green petals on the axes and the diagonals, a yellow centre. o: { size (160) }.
                                     4 lines of symmetry, order 4. g.lines(p) shows the 4 dashed lines of symmetry;
                                     g.dot(p) the centre of rotation.
     tfBanner(parent, o)             the concert banner "SHINE ON" (cloth strip with ropes), centred, about 520 wide.
                                     g.letters[i] (a <g> per letter, around the letter's centre: tr(g.letters[i], x, y, 1,
                                     180) turns it upside down; g.lx[i] = its x); o: { w (520), size (64) }.
     tfDino(parent, o)               Ah Boy's puppet dinosaur (a T. rex), centred, about 160 wide. o: { col ('#3FA463'),
                                     s, stick (true) }. With col '#111' it is the shadow.
     tfSpot(parent, o)               a stage spotlight on a yoke, centred; g.beam (a cone to the right, 600 px; op() it);
                                     o: { col (beam colour) }. Rotate the whole lamp with tr(g, x, y, s, angle).
     tfClock(parent, r)              a wall clock (12, 3, 6, 9), centred; g.set(t) runs the hands (a slow minute hand and a
                                     seconds hand); g.arrow(p) shows a curved CLOCKWISE arrow round it.
     tfArm(parent, o)                a raised arm and hand for Kavya (scKavya has none): from the shoulder at (0, 0) up to
                                     a hand at about (0, -150). o: { col (sleeve, PE blue), skin }. g.set(p) raises it
                                     (0 = down, hidden; 1 = up).
     tfDizzy(parent, r)              three little stars circling, centred; g.set(t, p).
     tfStamp(parent, ok)             mkStamp 'NAILED IT' (green, ok true) or 'WRONG MOVE' (red); g.set(p).
                                     About 520 px wide at scale 1: scale it (tr(g, x, y, 0.6)).
*/

/* ---------- colours ---------- */
const TF_ACROSS = '#2E7DD8', TF_UP = '#E8751A';
const TF_COL = { kavya: '#2E7DD8', priya: '#E2A21C', boy: '#F28C28', dad: '#3D8B6E', mum: '#B8336A', tan: '#2E4C8C', rose: '#E07A9B' };
const TF_LENS = [128, -168];

/* ---------- confessional tints, lower thirds ---------- */
const TF_TINT = {
  miroir: ['#2A1E10', '#5A4320'], vic: ['#141A22', '#2E3A48'], twirla: ['#3A1030', '#6B2058'], zoom: ['#2A2418', '#544A30'],
  hypo: ['#10283A', '#2A4E6E'], kavya: ['#14243A', '#25446B'], mum: ['#3A1030', '#6B1E58'], dad: ['#123026', '#245A48'],
  boy: ['#3A2410', '#6B4414'], priya: ['#2E2410', '#5E4A18'], tan: ['#1A2A3A', '#33506E'], rose: ['#3A1424', '#6E2A44'],
};
function tfConf(parent, who) { const c = TF_TINT[who] || TF_TINT.miroir; return scConfessional(parent, c[0], c[1]); }
const TF_LT = {
  miroir: ['MADAME MIROIR', 'The mirror. Thirty years in this room.'],
  vic: ['VIC', 'Stage manager. Column vector.'],
  twirla: ['TWIRLA', 'Rotation. Needs CAD.'],
  zoom: ['MR ZOOM', 'Overhead projector, 1987. Enlarges.'],
  hypo: ['HYPO', 'The hypotenuse. Always the longest.'],
  kavya: ['KAVYA, 12', 'Dancer. Since 9 a.m.'],
  priya: ['PRIYA', 'Choreographer. Item seven.'],
  tan: ['MR TAN', 'Teacher in charge. Emcee. Puns.'],
  dad: ['DAD', 'Lights, projector, ladder. "Nailed it."'],
  mum: ['MUM', 'Backdrop and costumes.'],
  boy: ['AH BOY, 8', 'Shadow puppets. Spins.'],
  rose: ['AUNTIE ROSE', 'Guest judge. Brought kueh.'],
};
function tfLowerThird(parent, who) { const l = TF_LT[who] || [String(who).toUpperCase(), '']; return scLowerThird(parent, l[0], l[1]); }

/* ---------- hand props for the humans ---------- */
function tfHandProp(parent, kind) {
  const g = G(parent), ink = SC_INK;
  if (kind === 'brush') {
    E('line', { x1: 0, y1: 12, x2: 0, y2: -66, stroke: '#9C6B3E', 'stroke-width': 9, 'stroke-linecap': 'round' }, g);
    E('rect', { x: -8, y: -86, width: 16, height: 22, rx: 3, fill: '#C9D3DC', stroke: ink, 'stroke-width': 2.5 }, g);
    E('path', { d: 'M-8,-86 Q-10,-104 0,-118 Q10,-104 8,-86 Z', fill: '#2F8F9D', stroke: ink, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, g);
  } else if (kind === 'tape') {
    E('circle', { cx: 0, cy: -40, r: 30, fill: '#6E7B86', stroke: ink, 'stroke-width': 4 }, g);
    E('circle', { cx: 0, cy: -40, r: 14, fill: '#E8E2D2', stroke: ink, 'stroke-width': 3 }, g);
    E('path', { d: 'M24,-22 L40,8 L30,12 L16,-16', fill: '#8F9CAB', stroke: ink, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, g);
  } else if (kind === 'mic') {
    E('path', { d: 'M-8,8 L-10,-58 L10,-58 L8,8 Z', fill: '#2A3440', stroke: ink, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
    E('rect', { x: -12, y: -64, width: 24, height: 10, rx: 3, fill: '#8F9CAB', stroke: ink, 'stroke-width': 2.5 }, g);
    E('circle', { cx: 0, cy: -80, r: 18, fill: '#B9C4CE', stroke: ink, 'stroke-width': 3.5 }, g);
    E('path', { d: 'M-12,-88 L12,-88 M-15,-80 L15,-80 M-12,-72 L12,-72', stroke: '#6E7B86', 'stroke-width': 2 }, g);
  } else if (kind === 'dino') {
    E('line', { x1: 0, y1: 14, x2: 0, y2: -70, stroke: '#9C6B3E', 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
    const d = tfDino(g, { col: '#3FA463', s: 0.62, stick: false }); tr(d, 4, -104);
  } else if (kind === 'kueh') {
    E('ellipse', { cx: 0, cy: -20, rx: 56, ry: 14, fill: '#FFFFFF', stroke: ink, 'stroke-width': 3 }, g);
    [[-30, '#3FA463'], [0, '#E86F8A'], [30, '#FFC247']].forEach(([x, col]) => {
      E('rect', { x: x - 13, y: -50, width: 26, height: 28, rx: 3, fill: col, stroke: ink, 'stroke-width': 2.5 }, g);
      E('path', { d: `M${x - 13},-42 h26 M${x - 13},-34 h26`, stroke: '#FFFFFF', 'stroke-width': 2.5, opacity: 0.8 }, g);
    });
  } else {
    scHandProp(g, kind);
  }
  return g;
}

/* ---------- the cast ---------- */
const TF_PROP = { mum: 'brush', dad: 'tape', boy: null, priya: 'paper', tan: 'mic', rose: 'kueh' };
const TF_CUSTOM = { brush: 1, tape: 1, mic: 1, dino: 1, kueh: 1 };
function cast(parent, kind, o) {
  o = o || {};
  if (kind === 'kavya') return scKavya(parent, o);
  if (SC_HUMANS[kind]) {
    const p = Object.assign({}, kind === 'boy' ? { hand: true } : { prop: TF_PROP[kind] }, o);
    if (p.body) return scCastHuman(parent, kind, p);
    const custom = p.prop && TF_CUSTOM[p.prop] ? p.prop : null;
    if (custom) { p.prop = undefined; p.hand = true; }
    const h = scCastHuman(parent, kind, p);
    if (custom && h.hand) tfHandProp(h.hand, custom);
    return h;
  }
  const S = { s: o.s, mood: o.mood };
  let c;
  if (kind === 'miroir') {
    let cane = null;
    c = scMake(parent, Object.assign(S, { seed: 4, bob: 1.5, mood: o.mood || 'smug',
      draw: g => {
        const gold = linGrad('#F6D77A', '#B8862A', true);
        // the stand: two curved posts, a base bar on castors
        E('path', { d: 'M-104,148 Q-112,40 -92,-24 M104,148 Q112,40 92,-24', fill: 'none', stroke: SC_INK, 'stroke-width': 14, 'stroke-linecap': 'round' }, g);
        E('path', { d: 'M-104,148 Q-112,40 -92,-24 M104,148 Q112,40 92,-24', fill: 'none', stroke: '#D9A93E', 'stroke-width': 8, 'stroke-linecap': 'round' }, g);
        E('rect', { x: -130, y: 136, width: 260, height: 16, rx: 8, fill: gold, stroke: SC_INK, 'stroke-width': 4 }, g);
        [-110, 110].forEach(x => E('circle', { cx: x, cy: 158, r: 9, fill: '#3A3440', stroke: SC_INK, 'stroke-width': 3 }, g));
        // name plate on the base bar: MIROIR, written backwards
        const np = G(g); tr(np, 0, 116);
        E('rect', { x: -58, y: -16, width: 116, height: 30, rx: 6, fill: '#2A1E10', stroke: '#E2B33C', 'stroke-width': 3 }, np);
        const nt = G(np); nt.setAttribute('transform', 'scale(-1 1)');
        T(nt, 0, 8, 'MIROIR', { size: 22, weight: 800, anchor: 'middle', fill: '#F6D77A', ls: 2 });
        // the left arm, glove resting on the post
        E('path', { d: 'M-80,10 Q-118,40 -108,78', fill: 'none', stroke: SC_INK, 'stroke-width': 6, 'stroke-linecap': 'round' }, g);
        E('circle', { cx: -108, cy: 82, r: 12, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
        // the cane (animated) in the right glove
        cane = G(g); tr(cane, 112, 40);
        E('path', { d: 'M0,0 L12,118', stroke: '#1E1A22', 'stroke-width': 7, 'stroke-linecap': 'round' }, cane);
        E('circle', { cx: 0, cy: -2, r: 7, fill: '#DADDE1', stroke: SC_INK, 'stroke-width': 2 }, cane);
        E('path', { d: 'M80,0 Q110,8 112,34', fill: 'none', stroke: SC_INK, 'stroke-width': 6, 'stroke-linecap': 'round' }, g);
        E('circle', { cx: 112, cy: 38, r: 12, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
        // the oval frame and the glass
        E('ellipse', { cx: 0, cy: -30, rx: 88, ry: 130, fill: gold, stroke: SC_INK, 'stroke-width': 5 }, g);
        E('ellipse', { cx: 0, cy: -30, rx: 74, ry: 115, fill: linGrad('#EEF8FF', '#A9D2EC', true), stroke: '#8A6A24', 'stroke-width': 3 }, g);
        E('path', { d: 'M-54,-62 L-22,-122 M-44,-20 L8,-108 M30,70 L50,32', stroke: '#FFFFFF', 'stroke-width': 7, opacity: 0.55, 'stroke-linecap': 'round' }, g);
        // the crest and the ballet-mistress bun with pins
        E('path', { d: 'M-40,-152 Q-30,-178 0,-170 Q30,-178 40,-152 Q20,-160 0,-150 Q-20,-160 -40,-152 Z', fill: gold, stroke: SC_INK, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, g);
        E('circle', { cx: 0, cy: -180, r: 24, fill: '#8C8790', stroke: SC_INK, 'stroke-width': 4 }, g);
        E('path', { d: 'M-14,-190 Q0,-198 14,-190 M-16,-178 Q0,-170 16,-178', fill: 'none', stroke: '#5E5A62', 'stroke-width': 3 }, g);
        E('path', { d: 'M8,-206 L26,-170 M-20,-204 L-2,-166', stroke: '#2A1A22', 'stroke-width': 3.5, 'stroke-linecap': 'round' }, g);
        E('circle', { cx: 8, cy: -206, r: 4, fill: '#E2B33C' }, g); E('circle', { cx: -20, cy: -204, r: 4, fill: '#E2B33C' }, g);
      },
      face: { x: 0, y: -44, eye: 16, gap: 56, mouthW: 30, mouthY: 50, lidCol: '#BFE0F4', iris: '#3A4A8C' },
      upd: (t, g, st) => { const k = clamp(st.tap || 0); tr(cane, 112, 40, 1, lerp(0, -48, k)); } }));
    // eyelashes (in front of the face kit)
    const inner = c.firstChild, la = G(inner); tr(la, 0, -44);
    E('path', { d: 'M-44,-14 L-54,-24 M-38,-18 L-44,-30 M44,-14 L54,-24 M38,-18 L44,-30', stroke: SC_INK, 'stroke-width': 3, 'stroke-linecap': 'round' }, la);
  } else if (kind === 'vic') {
    let topT = null, botT = null, armR = null, last = ['', ''];
    c = scMake(parent, Object.assign(S, { seed: 9, bob: 4, mood: o.mood || 'neutral',
      draw: g => {
        // legs and black sneakers
        [-28, 28].forEach(x => {
          E('path', { d: `M${x},104 L${x},136`, stroke: SC_INK, 'stroke-width': 8, 'stroke-linecap': 'round' }, g);
          E('path', { d: `M${x - 14},144 Q${x - 14},132 ${x + 2},132 L${x + 16},134 Q${x + 22},144 ${x + 14},146 Z`, fill: '#2A2A30', stroke: SC_INK, 'stroke-width': 3 }, g);
        });
        // left arm with a clipboard
        E('path', { d: 'M-70,6 Q-100,34 -96,70', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
        const cb = G(g); tr(cb, -104, 74, 1, -8);
        E('rect', { x: -26, y: -32, width: 52, height: 64, rx: 6, fill: '#B07A45', stroke: SC_INK, 'stroke-width': 3 }, cb);
        E('rect', { x: -20, y: -24, width: 40, height: 50, fill: '#FFFFFF' }, cb);
        E('path', { d: 'M-14,-12 h28 M-14,0 h28 M-14,12 h20', stroke: '#9FB2C2', 'stroke-width': 3 }, cb);
        E('circle', { cx: -96, cy: 72, r: 10, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
        // right arm (animated: point)
        armR = G(g); tr(armR, 70, 6);
        E('path', { d: 'M0,0 L40,0', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, armR);
        E('circle', { cx: 46, cy: 0, r: 10, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, armR);
        E('path', { d: 'M52,-4 L68,-8', stroke: SC_INK, 'stroke-width': 5, 'stroke-linecap': 'round' }, armR);
        // the column vector: a pale card, two tall brackets, two numbers
        E('rect', { x: -58, y: -52, width: 116, height: 156, rx: 18, fill: '#FFFDF6', stroke: '#C9D3DC', 'stroke-width': 3 }, g);
        E('path', { d: 'M-50,-58 Q-92,26 -50,110 M50,-58 Q92,26 50,110', fill: 'none', stroke: SC_INK, 'stroke-width': 11, 'stroke-linecap': 'round' }, g);
        topT = T(g, 0, 14, '5', { size: 60, weight: 800, anchor: 'middle', fill: TF_ACROSS });
        botT = T(g, 0, 90, '−2', { size: 60, weight: 800, anchor: 'middle', fill: TF_UP });
        // head, beanie, headset
        E('circle', { cx: 0, cy: -104, r: 44, fill: ball('#B9CCDA', '#6E8AA0'), stroke: SC_INK, 'stroke-width': 4 }, g);
        E('path', { d: 'M-44,-110 Q-46,-152 0,-154 Q46,-152 44,-110 Q22,-122 0,-122 Q-22,-122 -44,-110 Z', fill: '#26262C', stroke: SC_INK, 'stroke-width': 3 }, g);
        E('path', { d: 'M-46,-104 Q-50,-150 0,-150', fill: 'none', stroke: '#4A4A52', 'stroke-width': 5 }, g);
        E('circle', { cx: -46, cy: -100, r: 13, fill: '#3A3A42', stroke: SC_INK, 'stroke-width': 3 }, g);
        E('path', { d: 'M-46,-92 Q-44,-70 -20,-70', fill: 'none', stroke: '#3A3A42', 'stroke-width': 4 }, g);
        E('circle', { cx: -18, cy: -70, r: 5, fill: '#3A3A42' }, g);
      },
      face: { x: 6, y: -96, eye: 12, gap: 36, mouthW: 22, mouthY: 20, lidCol: '#9FB6C8' },
      upd: (t, g, st) => {
        const p = clamp(st.point || 0);
        tr(armR, 70, 6, 1, lerp(30, -50, p));
        const a = st.top !== undefined ? String(st.top) : null, b = st.bot !== undefined ? String(st.bot) : null;
        if (a !== null && a !== last[0]) { setText(topT, a); last[0] = a; }
        if (b !== null && b !== last[1]) { setText(botT, b); last[1] = b; }
      } }));
  } else if (kind === 'twirla') {
    let arrowG = null, diz = null, body = null, bobSeed = 17;
    c = scMake(parent, Object.assign(S, { seed: bobSeed, bob: 4, mood: o.mood || 'happy',
      draw: g => {
        body = g;
        arrowG = G(g);
        // an anticlockwise arc (screen angle 140 deg back round to 200 deg) with its arrowhead at the end
        E('path', { d: mkArcD(0, -10, 150, 500, 200), fill: 'none', stroke: '#FFE45C', 'stroke-width': 7, 'stroke-linecap': 'round', opacity: 0.9 }, arrowG);
        const ae = 200 * Math.PI / 180, ah = G(arrowG); tr(ah, 150 * Math.cos(ae), -10 + 150 * Math.sin(ae), 1, 20);
        E('path', { d: 'M-14,-6 L14,-6 L0,16 Z', fill: '#FFE45C', stroke: SC_INK, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, ah);
        // the drawing pin: the centre of rotation
        E('path', { d: 'M-3,140 L0,154 L3,140 Z', fill: '#8F9CAB' }, g);
        E('ellipse', { cx: 0, cy: 134, rx: 18, ry: 8, fill: '#D32F2F', stroke: SC_INK, 'stroke-width': 3 }, g);
        E('ellipse', { cx: -5, cy: 132, rx: 6, ry: 2.5, fill: '#FFFFFF', opacity: 0.6 }, g);
        // legs: standing leg en pointe, the other bent
        E('path', { d: 'M0,36 L0,124', stroke: '#F7C9D8', 'stroke-width': 11, 'stroke-linecap': 'round' }, g);
        E('path', { d: 'M-5,112 L5,112 L3,128 L-3,128 Z', fill: '#FF8FB0', stroke: SC_INK, 'stroke-width': 2.5 }, g);
        E('path', { d: 'M6,36 L40,74 L6,92', fill: 'none', stroke: '#F7C9D8', 'stroke-width': 11, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
        // tutu
        E('ellipse', { cx: 0, cy: 30, rx: 84, ry: 22, fill: '#FF9FC4', stroke: SC_INK, 'stroke-width': 4 }, g);
        E('path', { d: 'M-80,30 Q-66,46 -52,32 Q-38,48 -24,34 Q-10,50 4,34 Q18,50 32,34 Q46,48 60,32 Q72,44 80,30', fill: 'none', stroke: '#E8679A', 'stroke-width': 3 }, g);
        E('ellipse', { cx: 0, cy: 24, rx: 66, ry: 13, fill: '#FFC2DA', stroke: SC_INK, 'stroke-width': 3 }, g);
        // torso (leotard)
        E('path', { d: 'M-24,-28 Q-30,0 -20,26 L20,26 Q30,0 24,-28 Q0,-20 -24,-28 Z', fill: '#C2185B', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
        // arms in an arch above the head
        E('path', { d: 'M-22,-26 Q-84,-96 -12,-150 M22,-26 Q84,-96 12,-150', fill: 'none', stroke: '#F7C9D8', 'stroke-width': 10, 'stroke-linecap': 'round' }, g);
        E('path', { d: 'M-22,-26 Q-84,-96 -12,-150 M22,-26 Q84,-96 12,-150', fill: 'none', stroke: SC_INK, 'stroke-width': 2, opacity: 0.5 }, g);
        E('circle', { cx: -9, cy: -152, r: 9, fill: '#F7C9D8', stroke: SC_INK, 'stroke-width': 2.5 }, g);
        E('circle', { cx: 9, cy: -152, r: 9, fill: '#F7C9D8', stroke: SC_INK, 'stroke-width': 2.5 }, g);
        // head and bun
        E('circle', { cx: 0, cy: -118, r: 17, fill: '#3A2416', stroke: SC_INK, 'stroke-width': 3 }, g);
        E('circle', { cx: 0, cy: -72, r: 44, fill: ball('#FFD1E1', '#F48FB1'), stroke: SC_INK, 'stroke-width': 4 }, g);
        E('path', { d: 'M-44,-78 Q-40,-114 0,-114 Q40,-114 44,-78 Q24,-98 0,-96 Q-24,-98 -44,-78 Z', fill: '#3A2416', stroke: SC_INK, 'stroke-width': 3 }, g);
        E('ellipse', { cx: -28, cy: -54, rx: 9, ry: 5, fill: '#FF6B9A', opacity: 0.5 }, g);
        E('ellipse', { cx: 28, cy: -54, rx: 9, ry: 5, fill: '#FF6B9A', opacity: 0.5 }, g);
        diz = tfDizzy(g, 40); tr(diz, 0, -132);
      },
      face: { x: 0, y: -76, eye: 13, gap: 40, mouthW: 22, mouthY: 24, lidCol: '#F7B5CC' },
      upd: (t, g, st) => {
        op(arrowG, clamp(st.arrow || 0));
        diz.set(t, clamp(st.dizzy || 0));
        const sp = st.spin || 0;
        if (sp) {   // turn the whole body about the pin (keeps the idle bob)
          const b = Math.sin(t * TAU * 0.5 + bobSeed) * 4 * (st.still ? 0 : 1);
          g.setAttribute('transform', `translate(0 ${b.toFixed(2)}) rotate(${sp.toFixed(2)} 0 134)`);
        }
      } }));
  } else if (kind === 'zoom') {
    let beam = null;
    c = scMake(parent, Object.assign(S, { seed: 21, bob: 1.5, mood: o.mood || 'smug',
      draw: g => {
        beam = E('path', { d: `M${TF_LENS[0]},${TF_LENS[1] - 10} L${TF_LENS[0] + 700},${TF_LENS[1] - 190} L${TF_LENS[0] + 700},${TF_LENS[1] + 170} L${TF_LENS[0]},${TF_LENS[1] + 10} Z`, fill: '#FFF3B0', opacity: 0 }, g);
        // the arm and the projection head
        E('rect', { x: 66, y: -150, width: 18, height: 160, fill: '#8F9CAB', stroke: SC_INK, 'stroke-width': 3 }, g);
        const hd = G(g); tr(hd, 78, -168);
        E('rect', { x: -44, y: -28, width: 88, height: 56, rx: 10, fill: '#5A6670', stroke: SC_INK, 'stroke-width': 4 }, hd);
        E('rect', { x: -36, y: -20, width: 30, height: 10, rx: 4, fill: '#8F9CAB' }, hd);
        E('circle', { cx: 50, cy: 0, r: 20, fill: ball('#E8F6FF', '#5A8AB0'), stroke: SC_INK, 'stroke-width': 4 }, hd);
        E('circle', { cx: 50, cy: 0, r: 8, fill: '#FFF3B0' }, hd);
        // feet, the base box, the glass stage on top
        [-96, 96].forEach(x => E('rect', { x: x - 14, y: 128, width: 28, height: 12, rx: 4, fill: '#3A3440' }, g));
        E('rect', { x: -124, y: 8, width: 248, height: 124, rx: 14, fill: linGrad('#EFE8D6', '#BFB59C', true), stroke: SC_INK, 'stroke-width': 5 }, g);
        E('rect', { x: -108, y: -4, width: 216, height: 16, rx: 4, fill: '#BFE8FF', stroke: SC_INK, 'stroke-width': 3 }, g);
        E('path', { d: 'M-112,40 h14 M-112,52 h14 M-112,64 h14 M98,40 h14 M98,52 h14 M98,64 h14', stroke: '#9C927C', 'stroke-width': 3 }, g);
        T(g, 96, 124, '1987', { size: 16, weight: 800, anchor: 'end', fill: '#8A7F66' });
        // bow tie
        const bt = G(g); tr(bt, 0, 124);
        E('path', { d: 'M0,0 L-26,-13 L-26,13 Z M0,0 L26,-13 L26,13 Z', fill: '#C62828', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, bt);
        E('circle', { r: 6, fill: '#8E1B1B', stroke: SC_INK, 'stroke-width': 2.5 }, bt);
      },
      face: { x: 0, y: 52, eye: 17, gap: 74, mouthW: 34, mouthY: 40, lidCol: '#D9D0B8' },
      upd: (t, g, st) => { op(beam, 0.55 * clamp(st.beam || 0)); } }));
    const inner = c.firstChild, mo = G(inner); tr(mo, 0, 80);   // grey walrus moustache over the mouth
    E('path', { d: 'M0,-6 C-14,-14 -36,-12 -44,0 C-46,10 -38,14 -30,8 C-22,14 -12,10 0,4 C12,10 22,14 30,8 C38,14 46,10 44,0 C36,-12 14,-14 0,-6 Z', fill: '#B9BEC4', stroke: SC_INK, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, mo);
  } else if (kind === 'hypo') {
    c = scMake(parent, Object.assign(S, { seed: 25, bob: 2, mood: o.mood || 'smug',
      draw: g => {
        const rail = linGrad('#E6EBEF', '#9AA6B2', false);
        let rungs = '';
        for (let y = -140; y <= 160; y += 40) rungs += `M-42,${y} h84 v10 h-84 Z `;
        E('path', { d: rungs, fill: '#C9D3DC', stroke: SC_INK, 'stroke-width': 3 }, g);
        E('rect', { x: -56, y: -182, width: 16, height: 362, rx: 5, fill: rail, stroke: SC_INK, 'stroke-width': 3.5 }, g);
        E('rect', { x: 40, y: -182, width: 16, height: 362, rx: 5, fill: rail, stroke: SC_INK, 'stroke-width': 3.5 }, g);
        [-48, 48].forEach(x => E('rect', { x: x - 12, y: 176, width: 24, height: 12, rx: 4, fill: '#3A3440' }, g));
        // little arms, hands on hips
        E('path', { d: 'M-56,-10 Q-92,6 -72,34 M56,-10 Q92,6 72,34', fill: 'none', stroke: SC_INK, 'stroke-width': 6, 'stroke-linecap': 'round' }, g);
        E('circle', { cx: -72, cy: 36, r: 10, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
        E('circle', { cx: 72, cy: 36, r: 10, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
        // the face plate
        E('rect', { x: -64, y: -164, width: 128, height: 108, rx: 18, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 4 }, g);
        // sunglasses pushed up
        E('path', { d: 'M-46,-168 h36 v-4 q-2,-16 -18,-16 q-16,0 -18,16 Z M10,-168 h36 v-4 q-2,-16 -18,-16 q-16,0 -18,16 Z', fill: '#26262C', stroke: SC_INK, 'stroke-width': 2.5 }, g);
        E('path', { d: 'M-10,-174 Q0,-180 10,-174', fill: 'none', stroke: '#26262C', 'stroke-width': 4 }, g);
        // the "c" medal
        E('path', { d: 'M-12,-50 L-6,-28 M12,-50 L6,-28', stroke: '#2E7DD8', 'stroke-width': 6 }, g);
        E('circle', { cx: 0, cy: -14, r: 20, fill: ball('#FFE45C', '#C9A21C'), stroke: SC_INK, 'stroke-width': 3 }, g);
        T(g, 0, -6, 'c', { size: 28, weight: 800, anchor: 'middle', fill: '#6B4E08', font: "Georgia, 'Times New Roman', serif" }).setAttribute('font-style', 'italic');
      },
      face: { x: 0, y: -116, eye: 15, gap: 50, mouthW: 30, mouthY: 34, lidCol: '#E6EBEF' },
      upd: (t, g, st) => {
        const ln = st.lean || 0;
        if (ln) { const b = Math.sin(t * TAU * 0.5 + 25) * 2 * (st.still ? 0 : 1); g.setAttribute('transform', `translate(0 ${b.toFixed(2)}) rotate(${ln.toFixed(2)} 0 180)`); }
      } }));
  } else {
    c = scKavya(parent, o);
  }
  return c;
}

/* ---------- small props ---------- */
function tfDizzy(parent, r) {
  r = r || 40;
  const g = G(parent), stars = [];
  for (let i = 0; i < 3; i++) stars.push(E('path', { d: 'M0,-10 L3,-3 L10,-3 L4,2 L6,10 L0,5 L-6,10 L-4,2 L-10,-3 L-3,-3 Z', fill: '#FFE45C', stroke: SC_INK, 'stroke-width': 1.5 }, g));
  g.set = (t, p) => {
    op(g, clamp(p));
    if (p <= 0) return;
    stars.forEach((s, i) => { const a = t * 5 + i * TAU / 3; tr(s, Math.cos(a) * r, Math.sin(a) * r * 0.32, 1.1); });
  };
  g.set(0, 0);
  return g;
}

function tfDino(parent, o) {
  o = o || {};
  const g = G(parent), inner = G(g); tr(inner, 0, 0, o.s || 1);
  if (o.stick !== false) E('line', { x1: 6, y1: 40, x2: 6, y2: 130, stroke: '#9C6B3E', 'stroke-width': 8, 'stroke-linecap': 'round' }, inner);
  // a T. rex facing right: tail at the left, big head at the right, tiny arms, two legs
  E('path', { d: 'M-80,10 Q-40,-14 -10,-14 Q4,-44 30,-50 L62,-52 Q80,-50 80,-36 L80,-26 L60,-24 L68,-18 L60,-12 L40,-14 Q30,-10 30,6 L40,8 L38,14 L28,12 Q24,26 16,34 L22,58 L8,58 L4,38 L-16,38 L-14,58 L-28,58 L-26,34 Q-46,26 -80,10 Z',
    fill: o.col || '#3FA463', stroke: o.col === '#111' || o.col === '#111111' ? 'none' : SC_INK, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, inner);
  if (!(o.col === '#111' || o.col === '#111111')) {
    E('circle', { cx: 56, cy: -40, r: 4.5, fill: SC_INK }, inner);
    E('path', { d: 'M-30,-6 L-24,-18 L-18,-6 M-12,-14 L-6,-26 L0,-14', fill: '#FFE45C', stroke: SC_INK, 'stroke-width': 2 }, inner);
  }
  return g;
}

function tfSpot(parent, o) {
  o = o || {};
  const g = G(parent);
  g.beam = E('path', { d: 'M40,-18 L640,-130 L640,130 L40,18 Z', fill: o.col || '#FFF3B0', opacity: 0.35 }, g);
  E('path', { d: 'M-30,-44 Q-56,0 -30,44', fill: 'none', stroke: '#3A3440', 'stroke-width': 8 }, g);   // yoke
  E('rect', { x: -40, y: -26, width: 76, height: 52, rx: 10, fill: '#26262C', stroke: SC_INK, 'stroke-width': 3 }, g);
  E('rect', { x: 32, y: -30, width: 14, height: 60, rx: 4, fill: '#3A3440', stroke: SC_INK, 'stroke-width': 3 }, g);
  E('ellipse', { cx: 44, cy: 0, rx: 5, ry: 22, fill: '#FFF3B0' }, g);
  return g;
}

function tfClock(parent, r) {
  r = r || 64;
  const g = G(parent);
  E('circle', { r: r + 8, fill: '#3A3440', stroke: SC_INK, 'stroke-width': 3 }, g);
  E('circle', { r, fill: '#FFFDF6' }, g);
  let tk = '';
  for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; tk += `M${(Math.sin(a) * r * 0.86).toFixed(1)},${(-Math.cos(a) * r * 0.86).toFixed(1)} L${(Math.sin(a) * r * 0.96).toFixed(1)},${(-Math.cos(a) * r * 0.96).toFixed(1)} `; }
  E('path', { d: tk, stroke: SC_INK, 'stroke-width': 3 }, g);
  [['12', 0, -1], ['3', 1, 0], ['6', 0, 1], ['9', -1, 0]].forEach(([n, x, y]) => T(g, x * r * 0.66, y * r * 0.66 + r * 0.13, n, { size: Math.max(16, r * 0.3), weight: 800, anchor: 'middle', fill: SC_INK }));
  const hm = E('line', { x1: 0, y1: 0, x2: 0, y2: -r * 0.72, stroke: SC_INK, 'stroke-width': 5, 'stroke-linecap': 'round' }, g);
  const hh = E('line', { x1: 0, y1: 0, x2: 0, y2: -r * 0.48, stroke: SC_INK, 'stroke-width': 6, 'stroke-linecap': 'round' }, g);
  const hs = E('line', { x1: 0, y1: r * 0.14, x2: 0, y2: -r * 0.8, stroke: '#D32F2F', 'stroke-width': 2.5, 'stroke-linecap': 'round' }, g);
  E('circle', { r: 5, fill: '#D32F2F' }, g);
  const arr = G(g);
  E('path', { d: mkArcD(0, 0, r + 26, -70, 40), fill: 'none', stroke: '#56D69B', 'stroke-width': 7, 'stroke-linecap': 'round' }, arr);
  const ea = 40 * Math.PI / 180, ex = (r + 26) * Math.cos(ea), ey = (r + 26) * Math.sin(ea);
  const ah = G(arr); tr(ah, ex, ey, 1, 40);
  E('path', { d: 'M-12,-4 L12,-4 L0,14 Z', fill: '#56D69B' }, ah);
  g.set = t => { tr(hs, 0, 0, 1, (t * 6) % 360); tr(hm, 0, 0, 1, 60 + t * 0.1); tr(hh, 0, 0, 1, 270 + t * 0.008); };
  g.arrow = p => op(arr, clamp(p));
  g.set(0); g.arrow(0);
  return g;
}

function tfArm(parent, o) {
  o = o || {};
  const g = G(parent), skin = o.skin || '#B9784E';
  const arm = E('path', { d: '', fill: 'none', stroke: o.col || '#2E7DD8', 'stroke-width': 30, 'stroke-linecap': 'round' }, g);
  const fore = E('path', { d: '', fill: 'none', stroke: skin, 'stroke-width': 22, 'stroke-linecap': 'round' }, g);
  const hand = G(g);
  E('path', { d: 'M-16,8 L-16,-14 Q-16,-22 -10,-22 L-10,-34 Q-10,-40 -5,-40 Q0,-40 0,-34 L0,-38 Q0,-44 5,-44 Q10,-44 10,-38 L10,-32 Q10,-36 15,-36 Q20,-36 20,-30 L20,6 Q20,20 4,22 Q-16,22 -16,8 Z', fill: skin, stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, hand);
  g.set = p => {
    p = clamp(p); op(g, p > 0.02 ? 1 : 0);
    const ex = lerp(8, -4, p), ey = lerp(40, -70, p), hx = lerp(10, -22, p), hy = lerp(80, -140, p);
    attr(arm, 'd', `M0,0 L${ex.toFixed(1)},${ey.toFixed(1)}`);
    attr(fore, 'd', `M${ex.toFixed(1)},${ey.toFixed(1)} L${hx.toFixed(1)},${hy.toFixed(1)}`);
    tr(hand, hx, hy - 12);
  };
  g.set(1);
  return g;
}

function tfStamp(parent, ok) { return mkStamp(parent, ok ? 'NAILED IT' : 'WRONG MOVE', ok ? '#1E9E5A' : '#D32F2F'); }

/* ---------- maths props ---------- */
function tfVec(parent, top, bot, o) {
  o = o || {};
  const s = o.size || 44, g = G(parent), ink = o.col || C.ink;
  const a = mkMath(g, 0, -s * 0.18, String(top), { size: s, fill: o.topCol || TF_ACROSS, anchor: 'middle', halo: o.halo, weight: 700 });
  const b = mkMath(g, 0, s * 0.98, String(bot), { size: s, fill: o.botCol || TF_UP, anchor: 'middle', halo: o.halo, weight: 700 });
  const w = Math.max(a.w, b.w) + s * 0.5, h = s * 2.3, y0 = -s * 1.05, y1 = y0 + h;
  const bx = w / 2 + s * 0.1, bulge = s * 0.32;
  E('path', { d: `M${-bx + bulge * 0.2},${y0} Q${-bx - bulge},${(y0 + y1) / 2} ${-bx + bulge * 0.2},${y1} M${bx - bulge * 0.2},${y0} Q${bx + bulge},${(y0 + y1) / 2} ${bx - bulge * 0.2},${y1}`, fill: 'none', stroke: ink, 'stroke-width': Math.max(3, s * 0.09), 'stroke-linecap': 'round' }, g);
  g.w = 2 * bx + bulge; g.h = h; g.top = a; g.bot = b;
  return g;
}

function tfFloor(parent, o) {
  o = o || {};
  const xmin = o.xmin !== undefined ? o.xmin : -2, xmax = o.xmax !== undefined ? o.xmax : 10;
  const ymin = o.ymin !== undefined ? o.ymin : -3, ymax = o.ymax !== undefined ? o.ymax : 7, u = o.unit || 48, sz = o.size || 24;
  const g = G(parent), Wd = (xmax - xmin) * u, Hd = (ymax - ymin) * u;
  // wooden boards behind the plot box (with a margin for the labels)
  const m = sz * 2.2;
  E('rect', { x: -m, y: -m, width: Wd + 2 * m + 20, height: Hd + 2 * m, rx: 14, fill: '#D8A86A', stroke: '#8A5A2A', 'stroke-width': 5 }, g);
  let pl = '';
  for (let y = -m + 36; y < Hd + m; y += 36) pl += `M${-m},${y} L${Wd + m + 20},${y} `;
  E('path', { d: pl, stroke: '#C4924E', 'stroke-width': 2 }, g);
  const ax = mkAxes(g, { xmin, xmax, ymin, ymax, unit: u, size: sz, ink: MK.ink, gridCol: 'rgba(255,255,255,0.75)', halo: '#D8A86A' });
  g.ax = ax; g.px = ax.px; g.py = ax.py; g.W = ax.W; g.H = ax.H;
  if (o.cam !== false) {
    const cam = G(g);
    const L = -m - 14, R = Wd + m + 34, Tp = -m - 14, B = Hd + m + 14, k = 34;
    E('path', { d: `M${L},${Tp + k} L${L},${Tp} L${L + k},${Tp} M${R - k},${Tp} L${R},${Tp} L${R},${Tp + k} M${R},${B - k} L${R},${B} L${R - k},${B} M${L + k},${B} L${L},${B} L${L},${B - k}`, fill: 'none', stroke: '#FFFFFF', 'stroke-width': 4, opacity: 0.85 }, cam);
    const tg = G(cam); tr(tg, R - 6, B + 30);
    E('circle', { cx: -196, cy: -8, r: 7, fill: '#FF3B3B' }, tg);
    T(tg, 0, 0, 'OVERHEAD CAM', { size: 22, weight: 800, anchor: 'end', fill: '#FFFFFF', ls: 2 });
    g.cam = cam;
  }
  return g;
}

function tfDot(parent, who, o) {
  o = o || {};
  const g = G(parent), inner = G(g), r = o.r || 22, col = TF_COL[who] || '#8F9CAB';
  E('circle', { r, fill: col, stroke: '#FFFFFF', 'stroke-width': 4 }, inner);
  const L = o.label || ({ kavya: 'K', priya: 'P', boy: 'B', dad: 'D', mum: 'M', tan: 'T', rose: 'R' }[who] || '?');
  T(inner, 0, r * 0.42, L, { size: r * 1.15, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  g.set = p => { p = clamp(p); op(g, clamp(p * 3)); tr(inner, 0, 0, Math.max(0.01, 0.5 + 0.5 * pop(p))); };
  return g;
}

function tfTile(parent, o) {
  o = o || {};
  const S = o.size || 160, h = S / 2, g = G(parent);
  E('rect', { x: -h, y: -h, width: S, height: S, fill: '#FFF6E0', stroke: '#1F4E5A', 'stroke-width': 4 }, g);
  const r = S * 0.24;
  E('path', { d: `M${-h},${-h + r} A${r},${r} 0 0 0 ${-h + r},${-h} L${-h},${-h} Z M${h - r},${-h} A${r},${r} 0 0 0 ${h},${-h + r} L${h},${-h} Z M${h},${h - r} A${r},${r} 0 0 0 ${h - r},${h} L${h},${h} Z M${-h + r},${h} A${r},${r} 0 0 0 ${-h},${h - r} L${-h},${h} Z`, fill: '#E86F8A', stroke: '#1F4E5A', 'stroke-width': 2.5 }, g);
  E('rect', { x: -h + S * 0.1, y: -h + S * 0.1, width: S * 0.8, height: S * 0.8, fill: 'none', stroke: '#2F8F9D', 'stroke-width': S * 0.03 }, g);
  // diamond, petals on the axes and the diagonals, centre
  const dm = S * 0.36;
  E('path', { d: `M0,${-dm} L${dm},0 L0,${dm} L${-dm},0 Z`, fill: '#BFE6E0', stroke: '#2F8F9D', 'stroke-width': 2.5 }, g);
  let pet = '';
  const pr = S * 0.2, pw = S * 0.07;
  for (let i = 0; i < 4; i++) { const a = i * 90; pet += petal(a, pr, pw); }
  E('path', { d: pet, fill: '#3FA463', stroke: '#1F4E5A', 'stroke-width': 2 }, g);
  let pet2 = '';
  for (let i = 0; i < 4; i++) pet2 += petal(45 + i * 90, pr * 0.78, pw * 0.85);
  E('path', { d: pet2, fill: '#E86F8A', stroke: '#1F4E5A', 'stroke-width': 2 }, g);
  E('circle', { r: S * 0.07, fill: '#FFC247', stroke: '#1F4E5A', 'stroke-width': 2.5 }, g);
  function petal(deg, len, wd) {
    const a = deg * Math.PI / 180, c = Math.cos(a), s = Math.sin(a), px = -s, py = c;
    const tip = [c * len, s * len], m = [c * len * 0.5, s * len * 0.5];
    return `M0,0 Q${(m[0] + px * wd * 1.6).toFixed(1)},${(m[1] + py * wd * 1.6).toFixed(1)} ${tip[0].toFixed(1)},${tip[1].toFixed(1)} Q${(m[0] - px * wd * 1.6).toFixed(1)},${(m[1] - py * wd * 1.6).toFixed(1)} 0,0 Z `;
  }
  const ln = G(g), e = h + S * 0.12;
  E('path', { d: `M0,${-e} L0,${e} M${-e},0 L${e},0 M${-e},${-e} L${e},${e} M${e},${-e} L${-e},${e}`, stroke: '#1E5FC0', 'stroke-width': Math.max(3, S * 0.025), 'stroke-dasharray': `${S * 0.06} ${S * 0.04}` }, ln);
  const dot = E('circle', { r: S * 0.04, fill: '#1A1A22', stroke: '#FFFFFF', 'stroke-width': 2 }, g);
  g.lines = p => op(ln, clamp(p));
  g.dot = p => op(dot, clamp(p));
  g.lines(0); g.dot(0);
  return g;
}

function tfBanner(parent, o) {
  o = o || {};
  const w = o.w || 520, s = o.size || 64, g = G(parent), txt = 'SHINE ON';
  E('path', { d: `M${-w / 2 + 20},-36 L${-w / 2 - 10},-90 M${w / 2 - 20},-36 L${w / 2 + 10},-90`, stroke: '#8A6A3A', 'stroke-width': 4 }, g);
  E('path', { d: `M${-w / 2},-40 L${w / 2},-40 L${w / 2},40 L${w / 2 - 22},30 L${w / 2 - 44},40 L${-w / 2 + 44},40 L${-w / 2 + 22},30 L${-w / 2},40 Z`, fill: '#2B2D6E', stroke: '#FFE45C', 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
  const widths = txt.split('').map(ch => ch === ' ' ? s * 0.4 : textWidth(ch, s, FD, 800) + s * 0.08);
  const total = widths.reduce((a, b) => a + b, 0);
  let x = -total / 2;
  g.letters = []; g.lx = [];
  txt.split('').forEach((ch, i) => {
    const cx = x + widths[i] / 2; x += widths[i];
    if (ch === ' ') return;
    const lg = G(g); tr(lg, cx, 0);
    T(lg, 0, s * 0.36, ch, { size: s, weight: 800, anchor: 'middle', fill: '#FFE45C' });
    g.letters.push(lg); g.lx.push(cx);
  });
  g.W = w;
  return g;
}

/* ---------- sets ---------- */
function tfFan(parent, s) {
  const g = G(parent); tr(g, 0, 0, s || 1);
  E('line', { x1: 0, y1: -50, x2: 0, y2: 0, stroke: '#5A6670', 'stroke-width': 6 }, g);
  const bl = G(g);
  for (let i = 0; i < 3; i++) { const b = G(bl); tr(b, 0, 0, 1, i * 120); E('path', { d: 'M0,-6 Q60,-16 92,-4 Q60,10 0,6 Z', fill: '#C9D3DC', stroke: '#5A6670', 'stroke-width': 2.5 }, b); }
  E('circle', { r: 12, fill: '#8F9CAB', stroke: '#5A6670', 'stroke-width': 3 }, g);
  g.upd = t => bl.setAttribute('transform', `scale(1 0.32) rotate(${((t * 380) % 360).toFixed(1)})`);
  g.upd(0);
  return g;
}

/* a backdrop of Peranakan tiles drawn with a handful of paths (cheap) */
function tfTileWall(parent, x0, y0, cols, rows, T0) {
  const g = G(parent);
  E('rect', { x: x0, y: y0, width: cols * T0, height: rows * T0, fill: '#FFF6E0' }, g);
  let dia = '', circ = '', pet = '', cen = '', grid = '';
  const cr = T0 * 0.24, dm = T0 * 0.34;
  for (let i = 0; i <= cols; i++) for (let j = 0; j <= rows; j++) {
    const x = x0 + i * T0, y = y0 + j * T0;
    circ += `M${x - cr},${y} a${cr},${cr} 0 1,0 ${2 * cr},0 a${cr},${cr} 0 1,0 ${-2 * cr},0 `;
  }
  for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
    const cx = x0 + (i + 0.5) * T0, cy = y0 + (j + 0.5) * T0;
    dia += `M${cx},${cy - dm} L${cx + dm},${cy} L${cx},${cy + dm} L${cx - dm},${cy} Z `;
    const p = T0 * 0.2, q = T0 * 0.06;
    pet += `M${cx},${cy - p} Q${cx + q},${cy} ${cx},${cy + p} Q${cx - q},${cy} ${cx},${cy - p} Z M${cx - p},${cy} Q${cx},${cy + q} ${cx + p},${cy} Q${cx},${cy - q} ${cx - p},${cy} Z `;
    cen += `M${cx - T0 * 0.06},${cy} a${T0 * 0.06},${T0 * 0.06} 0 1,0 ${T0 * 0.12},0 a${T0 * 0.06},${T0 * 0.06} 0 1,0 ${-T0 * 0.12},0 `;
  }
  for (let i = 0; i <= cols; i++) grid += `M${x0 + i * T0},${y0} L${x0 + i * T0},${y0 + rows * T0} `;
  for (let j = 0; j <= rows; j++) grid += `M${x0},${y0 + j * T0} L${x0 + cols * T0},${y0 + j * T0} `;
  E('path', { d: dia, fill: '#BFE6E0', stroke: '#2F8F9D', 'stroke-width': 2.5 }, g);
  E('path', { d: circ, fill: '#E86F8A', stroke: '#1F4E5A', 'stroke-width': 2 }, g);
  E('path', { d: pet, fill: '#3FA463', stroke: '#1F4E5A', 'stroke-width': 1.5 }, g);
  E('path', { d: cen, fill: '#FFC247' }, g);
  E('path', { d: grid, stroke: '#1F4E5A', 'stroke-width': 3 }, g);
  return g;
}

function tfCurtain(parent, x, w, side) {
  const g = G(parent);
  E('rect', { x, y: 0, width: w, height: 750, fill: linGrad('#B71C1C', '#7A1010', false) }, g);
  let folds = '';
  for (let k = 1; k < 5; k++) { const fx = x + k * w / 5; folds += `M${fx},0 Q${fx + side * 10},375 ${fx - side * 6},750 `; }
  E('path', { d: folds, fill: 'none', stroke: '#5A0A0A', 'stroke-width': 6, opacity: 0.6 }, g);
  E('path', { d: `M${side < 0 ? x + w : x},380 q${-side * 26},10 ${-side * 8},40`, fill: 'none', stroke: '#E2B33C', 'stroke-width': 9, 'stroke-linecap': 'round' }, g);
  return g;
}

function tfHall(parent) {
  const g = G(parent);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#F4EDDC', '#E6DCC4', true) }, g);
  // high windows
  let wn = '';
  for (let k = 0; k < 8; k++) wn += `M${40 + k * 145},40 h110 v60 h-110 Z `;
  E('path', { d: wn, fill: '#A8D4F0', stroke: '#8FA3B8', 'stroke-width': 4 }, g);
  E('rect', { x: 0, y: 118, width: 1200, height: 10, fill: '#CFC3A8' }, g);
  // fans
  const fans = [180, 1020].map(x => { const f = tfFan(g, 0.7); tr(f, x, 200); return f; });
  // the sign over the stage
  E('rect', { x: 380, y: 136, width: 440, height: 44, rx: 8, fill: '#2E7DD8', stroke: '#1E4E8C', 'stroke-width': 3 }, g);
  T(g, 600, 167, 'BLK 208 COMMUNITY CLUB', { size: 26, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 1 });
  // the stage: opening with Mum's backdrop, curtains, pelmet, banner, platform
  E('rect', { x: 290, y: 190, width: 620, height: 270, fill: '#2A2236' }, g);
  tfTileWall(g, 340, 236, 9, 3, 58);
  E('rect', { x: 290, y: 190, width: 70, height: 270, fill: '#A51818' }, g);
  E('rect', { x: 840, y: 190, width: 70, height: 270, fill: '#A51818' }, g);
  E('path', { d: 'M300,190 L300,460 M318,190 L322,460 M336,190 L334,460 M864,190 L866,460 M882,190 L878,460 M900,190 L900,460', stroke: '#6E0E0E', 'stroke-width': 4 }, g);
  E('path', { d: 'M290,190 L910,190 L910,226 Q880,240 850,226 Q820,240 790,226 Q760,240 730,226 Q700,240 670,226 Q640,240 610,226 Q580,240 550,226 Q520,240 490,226 Q460,240 430,226 Q400,240 370,226 Q340,240 310,226 L290,226 Z', fill: '#8E1414', stroke: '#5A0A0A', 'stroke-width': 3 }, g);
  const bn = tfBanner(g, { w: 300, size: 36 }); tr(bn, 600, 268, 1);
  g.banner = bn;
  E('rect', { x: 270, y: 460, width: 660, height: 40, fill: linGrad('#A8743E', '#7A4E22', true), stroke: '#5A3412', 'stroke-width': 4 }, g);
  E('rect', { x: 0, y: 500, width: 1200, height: 250, fill: '#D9CFBC' }, g);
  // three rows of blue plastic chairs
  [[548, 0.8, 11], [628, 0.9, 10], [716, 1.0, 9]].forEach(([y, k, n]) => {
    const step = 1200 / n; let backs = '', seats = '', legs = '';
    for (let i = 0; i < n; i++) {
      const x = step * (i + 0.5);
      backs += `M${x - 30 * k},${y - 50 * k} h${60 * k} v${36 * k} h${-60 * k} Z `;
      seats += `M${x - 32 * k},${y - 12 * k} h${64 * k} v${12 * k} h${-64 * k} Z `;
      legs += `M${x - 26 * k},${y} v${30 * k} M${x + 26 * k},${y} v${30 * k} `;
    }
    E('path', { d: legs, stroke: '#5A6670', 'stroke-width': 4 }, g);
    E('path', { d: backs, fill: '#2E6FD8', stroke: '#1E3A78', 'stroke-width': 3 }, g);
    E('path', { d: seats, fill: '#3D7FE8', stroke: '#1E3A78', 'stroke-width': 3 }, g);
  });
  g.stage = [600, 330];
  g.upd = t => fans.forEach(f => f.upd(t));
  return g;
}

function tfStage(parent) {
  const g = G(parent), back = G(g);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#1E1A2A' }, back);
  tfTileWall(back, 150, 182.5, 8, 3, 112.5);
  E('rect', { x: 150, y: 520, width: 900, height: 30, fill: '#8A5A2A' }, back);
  // pull-down projector screen (hidden)
  const scr = G(back); g.screenBox = { x: 330, y: 160, w: 540, h: 330 };
  E('rect', { x: 316, y: 146, width: 568, height: 18, rx: 8, fill: '#5A6670', stroke: '#2A3440', 'stroke-width': 3 }, scr);
  E('rect', { x: 330, y: 160, width: 540, height: 330, fill: '#F7F7F2', stroke: '#9AA6B2', 'stroke-width': 3 }, scr);
  E('rect', { x: 330, y: 484, width: 540, height: 10, fill: '#5A6670' }, scr);
  op(scr, 0); g.screen = scr;
  // curtains and the pelmet with the banner
  tfCurtain(back, 0, 160, 1); tfCurtain(back, 1040, 160, -1);
  E('path', { d: 'M0,0 L1200,0 L1200,96 Q1150,120 1100,96 Q1050,120 1000,96 Q950,120 900,96 Q850,120 800,96 Q750,120 700,96 Q650,120 600,96 Q550,120 500,96 Q450,120 400,96 Q350,120 300,96 Q250,120 200,96 Q150,120 100,96 Q50,120 0,96 Z', fill: linGrad('#9E1A1A', '#6E0E0E', true), stroke: '#4A0808', 'stroke-width': 4 }, back);
  E('path', { d: 'M0,20 L1200,20', stroke: '#E2B33C', 'stroke-width': 5 }, back);
  const bn = tfBanner(back, { w: 520, size: 60 }); tr(bn, 600, 150);
  g.banner = bn;
  // characters
  g.mid = G(g);
  // the stage lip with footlights
  const front = G(g);
  E('rect', { x: 0, y: 522, width: 1200, height: 18, fill: '#C48A4E', stroke: '#6B4423', 'stroke-width': 3 }, front);
  E('rect', { x: 0, y: 540, width: 1200, height: 210, fill: linGrad('#4A2E18', '#2A1A0E', true) }, front);
  const lights = [];
  for (let i = 0; i < 10; i++) {
    const x = 60 + i * 120;
    E('path', { d: `M${x - 26},560 Q${x},532 ${x + 26},560 Z`, fill: '#3A3440', stroke: '#1A1A22', 'stroke-width': 3 }, front);
    lights.push(E('ellipse', { cx: x, cy: 552, rx: 14, ry: 6, fill: '#FFE9A0' }, front));
  }
  g.front = front;
  g.top = G(g);
  g.counterY = 530;
  g.upd = t => lights.forEach((l, i) => op(l, 0.75 + 0.25 * Math.sin(t * 3 + i * 1.7)));
  return g;
}

function tfStudio(parent) {
  const g = G(parent), back = G(g);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#ECE6F6', '#D9D0EC', true) }, back);
  E('rect', { x: 0, y: 470, width: 1200, height: 280, fill: linGrad('#C99A62', '#A8743E', true) }, back);
  let pl = ''; for (let x = -40; x < 1240; x += 90) pl += `M${x},470 L${x - 30},750 `;
  E('path', { d: pl, stroke: '#8A5A2A', 'stroke-width': 2, opacity: 0.6 }, back);
  E('rect', { x: 0, y: 456, width: 1200, height: 16, fill: '#FFFFFF', stroke: '#B9B0CC', 'stroke-width': 2 }, back);
  // the barre
  E('path', { d: 'M40,360 L1160,360', stroke: '#B07A45', 'stroke-width': 12, 'stroke-linecap': 'round' }, back);
  [120, 600, 1080].forEach(x => E('path', { d: `M${x},360 L${x},396 L${x + 20},396`, fill: 'none', stroke: '#8F9CAB', 'stroke-width': 6 }, back));
  // the SHINE ON poster
  const po = G(back); tr(po, 600, 190);
  E('rect', { x: -110, y: -86, width: 220, height: 150, rx: 8, fill: '#2B2D6E', stroke: '#FFE45C', 'stroke-width': 4 }, po);
  T(po, 0, -38, 'SHINE ON', { size: 34, weight: 800, anchor: 'middle', fill: '#FFE45C' });
  T(po, 0, 0, 'Year-End Concert', { size: 22, weight: 700, anchor: 'middle', fill: '#FFFFFF' });
  T(po, 0, 38, 'Tonight, 7 p.m.', { size: 22, weight: 700, anchor: 'middle', fill: '#FFFFFF' });
  // the clock
  const clk = tfClock(back, 56); tr(clk, 1060, 150);
  g.clock = clk;
  g.miroirAt = [900, 320];
  g.mid = G(g);
  // the costume table
  const front = G(g);
  E('rect', { x: 60, y: 520, width: 1080, height: 22, rx: 6, fill: '#E6D3B3', stroke: '#8A6A3A', 'stroke-width': 4 }, front);
  E('path', { d: 'M80,542 L1120,542 L1110,750 L90,750 Z', fill: linGrad('#C2185B', '#8E1046', true), stroke: '#5A0A2A', 'stroke-width': 4 }, front);
  const r = rng(31); let sq = '';
  for (let i = 0; i < 70; i++) { const x = 100 + r() * 1000, y = 560 + r() * 180; sq += `M${x.toFixed(0)},${y.toFixed(0)} h0.01 `; }
  E('path', { d: sq, stroke: '#FFE45C', 'stroke-width': 7, 'stroke-linecap': 'round', opacity: 0.8 }, front);
  g.front = front;
  g.top = G(g);
  g.counterY = 530;
  g.upd = t => clk.set(t);
  return g;
}
