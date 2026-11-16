/* THINK INSIDE THE BOX (Claude Sitcom Ep 15, Area, Surface Area & Volume): the cast, sets and props of this episode.
   Bundled after engine lib.js, kit.js, mathkit.js and sitcom.js (scMake, scTalk, scKavya, scCastHuman, scHuman,
   scConfessional, scLowerThird, scVideoCall, mk* maths kit). Every top-level name starts with `av`, except `cast`.

   Characters: cast(parent, kind, o) -> g, origin at the character's centre, about 200-260 px tall at s = 1
     o: { s (scale), mood (default mood), ... }   (humans: any scHuman option overrides, e.g. prop, lift)
     g.set({ t, talk, mood, look, sweat, still, ... })   call every frame
       talk 0..1 (use scTalk(S, t, who)); mood: neutral | happy | smug | annoyed | sad | shock | deadpan
       look -1..1 pupils left/right; still: true stops the idle bob
     HUMANS (busts, bottom of the shirt at y = 140: put them behind the workbench, the balcony wall or the gate):
       'kavya'  Kavya, 12 (scKavya, PE shirt "8")
       'mum'    Mum: magenta kurta, bun, bindi. Default: no prop
       'dad'    Dad: glasses, moustache, green polo. Default prop: his own tape measure (avTape; g.tape.set(len))
       'boy'    Ah Boy, 8: orange star tee. Default: an empty hand (lift: 1 raises it)
       'priya'  Priya, 12: school uniform, bob, yellow clip. Default prop: a pencil
       'tan'    Mr Tan, maths teacher, NEXT-DOOR NEIGHBOUR: shirt and tie, glasses. Default prop: a mug
       'bala'   Uncle Bala, contractor: brown skin, salt-and-pepper buzz cut, stubble, moustache, yellow hard hat,
                orange BALA RENO tee. Default prop: a tape measure (g.tape.set(len 0..1, snap 0..1))
       Pass { prop: null } for no prop. g.tape exists only when the default tape prop is used.
     CARTOONS (scMake):
       'perp'   (perp)   Madam Perpendicular, a SET SQUARE: a mint acrylic right-angled triangle (right angle at the
                         bottom left), cm ticks on both legs, a silver bun on the top corner, cat-eye glasses, pearls,
                         two thin legs in ballet flats. Strict ballet mistress. Default mood deadpan.
                         Extra: { check: 0..1 } flashes a red right-angle square and "90°" at her corner;
                         { point: 0..1 } raises her right arm with a pointer stick (points up and right).
                         Feet at y = 140.
       'sq'     (sq)     Squared: a tiny cyan superscript "2" with a face and little arms. Hyper.
       'cu'     (cu)     Cubed: her twin, a tiny orange superscript "3". Hyper. (Both about 170 tall at s = 1;
                         use s 0.35-0.6 when they ride on units.) Extra: { wave: 0..1 } waves both arms.
       'carton' (carton) Carton, a moving box (a 6 x 4 x 3 cuboid, 30 px per unit, oblique view) with flaps,
                         "FRAGILE" and "THIS WAY UP", a face on the front, sneakers. Anxious. Default mood neutral.
                         Extra: { flat: 0..1 } unfolds him into his net (crossfade): a cross-shaped net, 30 px per
                         unit, front face (with the face) in the same place. g.net = { top, front, bottom, back, left,
                         right } each { x, y, w, h } (centre x, y in his own coordinates) for labels.
                         { flap: 0..1 } flaps the lid.
       'polly'  (polly)  Polly, a TWENTY-SIDED DICE (icosahedron): purple faces, "20" on the top face, a face on the
                         central triangle, little arms. Bouncy, counts everything. Extra: { spin: degrees } wobble.
       'cubert' (cubert) Cubert, ONE CUBIC CENTIMETRE: a small gold cube (isometric) with huge eyebrows, a bow tie
                         and "1 cm³" on top. Very deep voice. About 180 tall at s = 1, feet at y = 73.
       'cyl'    (cyl)    Cylinda, a DRINKS CAN: silver can, lime label "FIZZ", ring pull like a hair bow, lashes.
                         Diva. Radius 60 px, 200 px tall. Extra: { peel: 0..1 } peels the label off and lays it
                         flat to the right as a rectangle 2πr = 377 px wide and 140 px tall (g.labelX0 = 60, its
                         left edge; g.labelY = -70, its top).

   Shots
     avConf(parent, who)             confessional background tinted for that character (scConfessional); g.set(p, t)
     AV_TINT                         the confessional colours per character
     avLowerThird(parent, who)       scLowerThird with this episode's name and role for `who` (AV_LT); g.set(p)

   Sets (full stage 1200 x 750; each returns g)
     avBlock(parent)      the HDB block at day: sky, the slab block with rows of windows, one unit (Kavya's) with a
                          RENOVATION banner and a skip of rubble below, void deck pillars, trees. g.unit = [x, y] the
                          renovating window (zoom target); g.upd(t) drifts the clouds and puffs dust from the window.
     avFlat(parent)       the living room mid-renovation: bare plaster wall, a DOORWAY with the metal gate on the left
                          (Mr Tan knocks there), a window on the right with the next block outside, a hanging bulb,
                          a stepladder, paint tins, Dad's colour swatches taped on the wall, a plywood WORKBENCH across
                          the front (top at g.counterY = 530). LAYERS: g.hall (a bust standing in the doorway at about
                          (150, 430) is hidden by the gate's solid lower panel), g.gate (the grille, drawn over g.hall),
                          g.mid (characters behind the bench: a bust at y about 440), g.front (the bench), g.top (props
                          on the bench). g.door = [150, 430]. g.open(p) swings the gate open (0 shut .. 1 open).
                          g.upd(t) swings the bulb.
     avBalcony(parent)    the balcony: sky, the blocks opposite, a laundry pole with clothes, potted plants, a low
                          parapet wall across the front (top at g.wallY = 520) and the dividing wall to Mr Tan's
                          balcony on the right (g.tanSpot = [1060, 440] for his bust). LAYERS: g.mid, g.front, g.top.
                          g.upd(t) flaps the laundry.

   Props (around their own origin)
     avBlueprint(parent, w, h, o)    a blueprint sheet, centred: deep blue paper, faint white grid, white border and a
                                     title block "BALA RENO · DWG" (o.title). Write on it in light ink (C.ink, the
                                     mathkit default). g.area = { x, y, w, h } (the writing area, in its own coordinates).
     avToolbox(parent, o)            Uncle Bala's red toolbox, base centre at (0,0), about 300 x 150. g.set(open 0..1)
                                     opens the lid; g.inside (a <g> drawn inside the box, over the tools) for the set square.
     avTape(parent, o)               a yellow tape measure, the case centred on (0,0). o: { len (max blade px, 300),
                                     s }. g.set(ext 0..1, snap 0..1): blade length; snap shakes it (the "Ow").
     avUnitDrop(parent, base, sup, o)  the twins' gag: mkText `base` (e.g. '9 m') and a superscript `sup` ('²' or '³')
                                     that drops from above, lands on the unit with a squash and impact lines. o: size (64),
                                     fill, anchor ('middle'), col (the superscript's colour; default cyan for ², orange
                                     for ³). g.set(p): 0 = not there, 0..0.55 falling, then the squash; 1 = sitting.
                                     g.w = width with the superscript.
     avIso(parent, heights, o)       isometric stacks of unit cubes from a plan of stack heights. heights[r][c]: r = 0
                                     is the BACK row, rows come towards the viewer (down-left); c goes left to right
                                     (down-right). o: u (edge px, 40), col (top colour; sides are shaded), cols
                                     (per cube [r][c] colour), stroke. Origin = the top back corner of the floor at
                                     (r 0, c 0). g.cubes (in draw order, each a <g>, with .r .c .z); g.set(k) shows the
                                     first k cubes (fractions fade the next); g.px(c, r, z) -> [x, y].
     avNet(parent, cells, o)         a net of unit squares. cells [[c, r], ...] (grid positions). o: u (px, 60), col,
                                     cols (per cell), labels (per cell, mkText markup), size, ink. Origin = top-left of
                                     the grid. g.cells[i] (<g>s); g.set(k) shows the first k cells.
     avFishTank(parent, o)           a glass fish tank in front view, base centre at (0,0). o: w (300), h (240), depth
                                     (oblique top, 50). g.set(level 0..1) water level (fraction of h); g.fish (Mr Bubbles,
                                     a goldfish <g>); g.upd(t) swims him. g.W, g.H.
     avTiles(parent, o)              a stack of floor tiles on a pallet, base centre (0,0). o: n (layers, 6), w (160).
     AV_COL                          episode palette: area (cyan), volume (orange), height (red), mint, wood, blueprint
*/

const AV_COL = { area: '#4CC9F0', volume: '#FF8A3D', height: '#FF5A5F', mint: '#9FE8D0', wood: '#C99A62', woodDk: '#8A5E30', blue: '#1E4E8C', blueDk: '#163A6B', hat: '#FFC93C' };

/* ---------- confessional tints, lower thirds ---------- */
const AV_TINT = {
  perp: ['#10302A', '#1F5A4E'], sq: ['#0E2A3A', '#1E5872'], cu: ['#3A1E0E', '#6E3A18'], carton: ['#30241A', '#5A4430'],
  polly: ['#24163D', '#47307A'], cubert: ['#3A2E0E', '#6B5418'], cyl: ['#16302A', '#2E5E48'], kavya: ['#14243A', '#25446B'],
  mum: ['#3A1030', '#6B1E58'], dad: ['#123026', '#245A48'], boy: ['#3A2410', '#6B4414'], priya: ['#1A2240', '#33407A'],
  tan: ['#1A2A3A', '#33506E'], bala: ['#3A2010', '#6E3E18'],
};
function avConf(parent, who) { const c = AV_TINT[who] || AV_TINT.perp; return scConfessional(parent, c[0], c[1]); }
const AV_LT = {
  perp: ['MADAM PERPENDICULAR', 'Set square. One right angle.'],
  sq: ['SQUARED', 'Rides on every area.'],
  cu: ['CUBED', 'Rides on every volume.'],
  carton: ['CARTON', 'Moving box. Nervous.'],
  polly: ['POLLY', 'Twenty-sided dice. Counts.'],
  cubert: ['CUBERT', 'One cubic centimetre. Deep.'],
  cyl: ['CYLINDA', 'Drinks can. Diva.'],
  kavya: ['KAVYA, 12', 'Living in a building site.'],
  mum: ['MUM', 'Party planner. Forty guests.'],
  dad: ['DAD', '"Biggest number wins."'],
  boy: ['AH BOY, 8', "Kavya's brother. Wants the corridor."],
  priya: ['PRIYA', 'Best friend. Competitive.'],
  tan: ['MR TAN', 'Maths teacher. Next door. The drilling.'],
  bala: ['UNCLE BALA', 'Contractor. "Can, can!"'],
};
function avLowerThird(parent, who) { const l = AV_LT[who] || [String(who).toUpperCase(), '']; return scLowerThird(parent, l[0], l[1]); }

/* ---------- props used by the cast ---------- */
function avTape(parent, o) {
  o = o || {};
  const g = G(parent), inner = G(g), len = o.len || 300;
  tr(inner, 0, 0, o.s || 1);
  const blade = G(inner);
  const bl = E('rect', { x: 30, y: 6, width: 0, height: 14, fill: '#FFE45C', stroke: '#8A6508', 'stroke-width': 2 }, blade);
  const ticks = E('line', { x1: 32, y1: 9, x2: 32, y2: 9, stroke: '#2A1A22', 'stroke-width': 6, 'stroke-dasharray': '2 10' }, blade);
  const hook = E('rect', { x: 30, y: 2, width: 6, height: 22, rx: 2, fill: '#9AA6B2', stroke: SC_INK, 'stroke-width': 2 }, blade);
  E('rect', { x: -34, y: -30, width: 68, height: 60, rx: 18, fill: '#FFC93C', stroke: SC_INK, 'stroke-width': 4 }, inner);
  E('circle', { r: 15, fill: '#E2A21C', stroke: SC_INK, 'stroke-width': 3 }, inner);
  E('rect', { x: -10, y: -40, width: 20, height: 12, rx: 3, fill: '#5A6670', stroke: SC_INK, 'stroke-width': 2.5 }, inner);
  g.set = (ext, snap) => {
    const L = len * clamp(ext || 0);
    attr(bl, 'width', L); attr(ticks, 'x2', 32 + Math.max(0, L - 6)); attr(hook, 'x', 28 + L);
    const s = snap || 0;
    tr(inner, s ? Math.sin(s * 40) * 6 * (1 - s) : 0, 0, o.s || 1, s ? Math.sin(s * 31) * 14 * (1 - s) : 0);
  };
  g.set(0);
  return g;
}

/* ---------- the cast ---------- */
const AV_PROP = { mum: null, priya: 'pencil', tan: 'mug' };
const AV_BALA = { name: 'UNCLE BALA', role: 'Contractor', age: 'adult', skin: SC_SKIN.rich, hair: 'buzz', hairCol: SC_HAIR.salt, frame: 'broad',
  style: 'tee', shirt: '#E8742C', logo: 'B', logoCol: '#FFE45C', moustache: true, beard: 'stubble', beardCol: '#3A3432', seed: 31 };

function avHardHat(c) {
  // a yellow hard hat on an adult bust's head (in the bobbing group, so it moves with the head)
  const A = SC_AGE.adult, hat = G(c.firstChild);
  hat.setAttribute('transform', `translate(0 ${A.hy}) scale(${(A.rx / 74).toFixed(3)} ${(A.ry / 80).toFixed(3)})`);
  E('path', { d: 'M-74,-38 Q-74,-112 0,-114 Q74,-112 74,-38 Z', fill: AV_COL.hat, stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, hat);
  E('path', { d: 'M-12,-112 Q0,-118 12,-112 L10,-40 L-10,-40 Z', fill: '#FFE07A', stroke: SC_INK, 'stroke-width': 3 }, hat);
  E('path', { d: 'M-92,-40 Q0,-50 92,-40 L92,-28 Q0,-38 -92,-28 Z', fill: '#E8AE1E', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, hat);
  E('ellipse', { cx: -40, cy: -84, rx: 14, ry: 8, fill: '#FFFFFF', opacity: 0.35 }, hat);
  return hat;
}

function cast(parent, kind, o) {
  o = o || {};
  if (kind === 'kavya') return scKavya(parent, o);
  if (kind === 'bala' || kind === 'dad') {
    const useTape = o.prop === undefined;
    const base = kind === 'bala' ? Object.assign({}, AV_BALA) : Object.assign({}, SC_HUMANS.dad);
    const p = Object.assign(base, useTape ? { hand: true } : {}, o);
    if (useTape) delete p.prop;
    const c = scHuman(parent, p);
    c.who = kind; c.name = base.name; c.role = base.role;
    if (kind === 'bala') avHardHat(c);
    if (useTape && c.hand) { c.tape = avTape(c.hand, { len: 220, s: 0.8 }); tr(c.tape, 0, -28, '-1 1'); }   // blade runs away from the face
    return c;
  }
  if (SC_HUMANS[kind]) {
    const p = Object.assign({}, kind === 'boy' ? { hand: true } : (AV_PROP[kind] ? { prop: AV_PROP[kind] } : {}), o);
    return scCastHuman(parent, kind, p);
  }
  const S = { s: o.s, mood: o.mood };
  let c;
  if (kind === 'perp') {
    let chk = null, armUp = null, armDown = null;
    c = scMake(parent, Object.assign(S, { seed: 4, bob: 2, mood: o.mood || 'deadpan',
      draw: g => {
        // legs and ballet flats
        [-56, 0].forEach(x => {
          E('path', { d: `M${x},96 L${x},132`, stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
          E('path', { d: `M${x - 14},140 Q${x - 14},128 ${x},128 Q${x + 18},128 ${x + 18},138 Q${x + 4},144 ${x - 14},140 Z`, fill: '#FF8FB0', stroke: SC_INK, 'stroke-width': 3 }, g);
        });
        // the resting left arm (on the hypotenuse side)
        armDown = G(g);
        E('path', { d: 'M40,10 Q80,30 70,74', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, armDown);
        E('circle', { cx: 70, cy: 78, r: 9, fill: '#F3D3B5', stroke: SC_INK, 'stroke-width': 3 }, armDown);
        // the set square: right angle at the bottom left
        E('path', { d: 'M-84,96 L-84,-126 L112,96 Z', fill: 'rgba(150,232,208,0.82)', stroke: '#1E6E5A', 'stroke-width': 6, 'stroke-linejoin': 'round' }, g);
        E('path', { d: 'M-84,96 L-84,-126 L112,96 Z', fill: 'none', stroke: SC_INK, 'stroke-width': 2, 'stroke-linejoin': 'round', opacity: 0.6 }, g);
        E('path', { d: 'M-62,74 L-62,-62 L60,74 Z', fill: 'rgba(255,255,255,0.22)', stroke: '#3FA88C', 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);   // engraved inner edge
        let tk = '';
        for (let i = 1; i < 20; i++) { const x = -84 + i * 10, L = i % 5 ? 7 : 13; if (x < 106) tk += `M${x},96 L${x},${96 - L} `; }
        for (let i = 1; i < 21; i++) { const y = 96 - i * 10, L = i % 5 ? 7 : 13; if (y > -118) tk += `M-84,${y} L${-84 + L},${y} `; }
        E('path', { d: tk, stroke: '#1E6E5A', 'stroke-width': 2 }, g);
        E('path', { d: 'M-60,-40 L-60,40', stroke: '#FFFFFF', 'stroke-width': 5, opacity: 0.4, 'stroke-linecap': 'round' }, g);
        // pearls
        let pd = '';
        for (let i = 0; i < 9; i++) { const a = Math.PI * (0.15 + 0.7 * i / 8); pd += `M${(-30 + Math.cos(a) * 34).toFixed(1)},${(52 + Math.sin(a) * 12).toFixed(1)} m-5,0 a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 `; }
        E('path', { d: pd, fill: '#FFFFFF', stroke: '#9AA6B2', 'stroke-width': 1.5 }, g);
        // silver bun on the top corner
        E('circle', { cx: -84, cy: -134, r: 22, fill: ball('#F2F4F6', '#B9BEC4'), stroke: SC_INK, 'stroke-width': 3.5 }, g);
        E('path', { d: 'M-100,-140 Q-84,-126 -66,-140', fill: 'none', stroke: '#9AA6B2', 'stroke-width': 3 }, g);
        E('path', { d: 'M-70,-156 L-56,-170', stroke: '#B8336A', 'stroke-width': 4, 'stroke-linecap': 'round' }, g);   // hairpin
        // the right-angle check
        chk = G(g);
        E('path', { d: 'M-84,62 L-50,62 L-50,96', fill: 'rgba(255,90,95,0.25)', stroke: AV_COL.height, 'stroke-width': 5 }, chk);
        const ct = T(chk, -40, 50, '90°', { size: 28, weight: 800, fill: '#FFFFFF' });
        ct.setAttribute('stroke', AV_COL.height); ct.setAttribute('stroke-width', 6); ct.setAttribute('paint-order', 'stroke');
        // the pointing arm (right arm, from the left leg of the square)
        armUp = G(g);
        E('path', { d: 'M-84,10 Q-130,-10 -136,-70', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, armUp);
        E('path', { d: 'M-136,-70 L-150,-150', stroke: '#6B4423', 'stroke-width': 6, 'stroke-linecap': 'round' }, armUp);
        E('circle', { cx: -151, cy: -153, r: 5, fill: '#FFE45C', stroke: SC_INK, 'stroke-width': 2 }, armUp);
        E('circle', { cx: -136, cy: -70, r: 9, fill: '#F3D3B5', stroke: SC_INK, 'stroke-width': 3 }, armUp);
      },
      face: { x: -30, y: 20, eye: 14, gap: 40, mouthW: 26, mouthY: 24, lidCol: '#7FD6BC' },
      upd: (t, g, st) => {
        op(chk, clamp(st.check || 0));
        op(armUp, (st.point || 0) > 0.5 ? 1 : 0);
      } }));
    // cat-eye glasses over the eyes
    const inner = c.firstChild, gl = G(inner); tr(gl, -30, 20);
    E('path', { d: 'M-40,-12 Q-22,-22 -4,-12 Q-6,10 -22,12 Q-38,10 -40,-12 Z M4,-12 Q22,-22 40,-12 Q38,10 22,12 Q6,10 4,-12 Z', fill: 'rgba(255,255,255,0.12)', stroke: '#B8336A', 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, gl);
    E('path', { d: 'M-40,-12 L-48,-20 M40,-12 L48,-20 M-4,-10 L4,-10', stroke: '#B8336A', 'stroke-width': 3.5, 'stroke-linecap': 'round' }, gl);
  } else if (kind === 'sq' || kind === 'cu') {
    const col = kind === 'sq' ? AV_COL.area : AV_COL.volume, glyph = kind === 'sq' ? '2' : '3';
    let arms = [];
    c = scMake(parent, Object.assign(S, { seed: kind === 'sq' ? 7 : 8, bob: 6, mood: o.mood || 'happy',
      draw: g => {
        [-1, 1].forEach(sd => { const a = E('path', { d: '', fill: 'none', stroke: SC_INK, 'stroke-width': 6, 'stroke-linecap': 'round' }, g); arms.push({ a, sd }); });
        const gl = T(g, 0, 70, glyph, { size: 210, weight: 800, anchor: 'middle', fill: col });
        gl.setAttribute('stroke', SC_INK); gl.setAttribute('stroke-width', 7); gl.setAttribute('paint-order', 'stroke'); gl.setAttribute('stroke-linejoin', 'round');
        // little sneakers
        [-30, 30].forEach(x => E('path', { d: `M${x - 14},${86} Q${x - 14},74 ${x},74 Q${x + 18},74 ${x + 18},84 Q${x + 4},90 ${x - 14},86 Z`, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g));
      },
      face: { x: 0, y: -40, eye: 13, gap: 34, mouthW: 20, mouthY: 22, lidCol: mkShade(col, -0.2) },
      upd: (t, g, st) => {
        const k = st.wave === undefined ? 0.4 : st.wave;
        arms.forEach(({ a, sd }, i) => {
          const w = Math.sin(t * TAU * 2.6 + i * 1.7) * 18 * k;
          a.setAttribute('d', `M${sd * 46},0 Q${sd * 72},${-10 - 20 * k} ${sd * 80},${(-30 - 40 * k + w).toFixed(1)}`);
        });
      } }));
  } else if (kind === 'carton') {
    const u = 30, bw = 6 * u, bh = 3 * u, dv = [2 * u * 0.9, -2 * u * 0.9];   // 6 x 4 x 3, oblique depth = 4 units at half scale
    let boxG = null, netG = null, flaps = [], net = {};
    c = scMake(parent, Object.assign(S, { seed: 12, bob: 3, mood: o.mood || 'neutral',
      draw: g => {
        const x0 = -bw / 2, y0 = -bh / 2 + 20;   // front face top-left; front centre (0, 20)
        boxG = G(g);
        // sneakers
        [-50, 50].forEach(x => {
          E('path', { d: `M${x},${y0 + bh} L${x},${y0 + bh + 24}`, stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, boxG);
          E('path', { d: `M${x - 16},${y0 + bh + 34} Q${x - 16},${y0 + bh + 20} ${x},${y0 + bh + 20} Q${x + 22},${y0 + bh + 20} ${x + 22},${y0 + bh + 32} Q${x + 4},${y0 + bh + 38} ${x - 16},${y0 + bh + 34} Z`, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, boxG);
        });
        const card = '#D9A766', cardDk = '#B9864A', cardLt = '#EBC48A';
        // back flap (behind the top)
        const fb = E('path', { d: '', fill: cardDk, stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, boxG);
        // top and side
        E('path', { d: mkPoly([[x0, y0], [x0 + bw, y0], [x0 + bw + dv[0], y0 + dv[1]], [x0 + dv[0], y0 + dv[1]]]), fill: cardLt, stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, boxG);
        E('path', { d: `M${x0 + dv[0] / 2},${y0 + dv[1] / 2} L${x0 + bw + dv[0] / 2},${y0 + dv[1] / 2}`, stroke: '#8A6230', 'stroke-width': 3 }, boxG);   // the gap between the top flaps
        E('path', { d: mkPoly([[x0 + bw, y0], [x0 + bw + dv[0], y0 + dv[1]], [x0 + bw + dv[0], y0 + bh + dv[1]], [x0 + bw, y0 + bh]]), fill: cardDk, stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, boxG);
        const up = G(boxG); tr(up, x0 + bw + dv[0] / 2, y0 + bh / 2 + dv[1] / 2);
        E('path', { d: 'M-8,14 L-8,-6 L-16,-6 L-4,-22 L8,-6 L0,-6 L0,14 Z M8,14 L8,-6 L0,-6', fill: '#5A3A1A', opacity: 0.7 }, up);
        // front
        E('rect', { x: x0, y: y0, width: bw, height: bh, fill: card, stroke: SC_INK, 'stroke-width': 4 }, boxG);
        E('rect', { x: x0 + bw / 2 - 16, y: y0, width: 32, height: 26, fill: '#C9B48A', opacity: 0.8 }, boxG);   // tape
        const fr = T(boxG, x0 + 12, y0 + bh - 10, 'FRAGILE', { size: 18, weight: 800, fill: '#C62828', opacity: 0.85 });
        fr.setAttribute('transform', `rotate(-6 ${x0 + 12} ${y0 + bh - 10})`);
        // front flap (in front of the top)
        const ff = E('path', { d: '', fill: card, stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, boxG);
        flaps = [{ el: fb, back: true }, { el: ff, back: false }];
        flaps.x0 = x0; flaps.y0 = y0;
        // arms
        E('path', { d: `M${x0},${y0 + 30} Q${x0 - 30},${y0 + 50} ${x0 - 26},${y0 + 80}`, fill: 'none', stroke: SC_INK, 'stroke-width': 6, 'stroke-linecap': 'round' }, boxG);
        E('path', { d: `M${x0 + bw},${y0 + 60} Q${x0 + bw + 30},${y0 + 76} ${x0 + bw + 26},${y0 + 100}`, fill: 'none', stroke: SC_INK, 'stroke-width': 6, 'stroke-linecap': 'round' }, boxG);
        // the net: top above the front, bottom and back below, the two ends at the sides
        netG = G(g);
        const W6 = 6 * u, D4 = 4 * u, H3 = 3 * u;
        const R = (k, x, y, w, h, fill) => { E('rect', { x, y, width: w, height: h, fill, stroke: SC_INK, 'stroke-width': 3.5 }, netG); net[k] = { x: x + w / 2, y: y + h / 2, w, h }; };
        R('top', x0, y0 - D4, W6, D4, cardLt);
        R('front', x0, y0, W6, H3, card);
        R('bottom', x0, y0 + H3, W6, D4, cardLt);
        R('back', x0, y0 + H3 + D4, W6, H3, card);
        R('left', x0 - D4, y0, D4, H3, cardDk);
        R('right', x0 + W6, y0, D4, H3, cardDk);
        E('path', { d: `M${x0},${y0} L${x0 + W6},${y0} M${x0},${y0 + H3} L${x0 + W6},${y0 + H3} M${x0},${y0 + H3 + D4} L${x0 + W6},${y0 + H3 + D4} M${x0},${y0} L${x0},${y0 + H3} M${x0 + W6},${y0} L${x0 + W6},${y0 + H3}`, stroke: '#FFFFFF', 'stroke-width': 2, 'stroke-dasharray': '7 6', opacity: 0.8 }, netG);
      },
      face: { x: 0, y: 12, eye: 15, gap: 56, mouthW: 30, mouthY: 26, lidCol: '#D9A766' },
      sweat: [[-80, -10], [86, 0]],
      upd: (t, g, st) => {
        const f = clamp(st.flat || 0), fl = st.flap === undefined ? 0.25 : st.flap;
        op(boxG, f < 0.5 ? 1 - f * 2 * 0.2 : 0); op(netG, f > 0.5 ? clamp((f - 0.5) * 2) : 0);
        const x0 = flaps.x0, y0 = flaps.y0, a = 0.25 + 0.35 * Math.abs(Math.sin(t * TAU * 1.5)) * fl;
        // back flap hinged on the back top edge, front flap on the front top edge; they open upwards
        const bx = x0 + dv[0], by = y0 + dv[1], h = 40;
        attr(flaps[0].el, 'd', mkPoly([[bx, by], [bx + bw, by], [bx + bw - 6, by - h * (0.6 + a)], [bx - 6, by - h * (0.6 + a)]]));
        attr(flaps[1].el, 'd', mkPoly([[x0, y0], [x0 + bw, y0], [x0 + bw - 14, y0 - h * (0.4 + a)], [x0 - 14, y0 - h * (0.4 + a)]]));
      } }));
    c.net = net;
  } else if (kind === 'polly') {
    let arms = [];
    const R = 120, r0 = 66, P = a => [Math.cos(a * Math.PI / 180), Math.sin(a * Math.PI / 180)];
    const hex = [-90, -30, 30, 90, 150, 210].map(a => P(a).map(v => v * R));
    const inn = { 90: P(90).map(v => v * r0), 210: P(210).map(v => v * r0), 330: P(330).map(v => v * r0) };
    c = scMake(parent, Object.assign(S, { seed: 19, bob: 7, mood: o.mood || 'happy',
      draw: g => {
        [-1, 1].forEach(sd => { const a = E('path', { d: '', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g); arms.push({ a, sd }); });
        const H = i => hex[i], I = k => inn[k];
        // faces: central (pointing down), three neighbours, six outer
        const faces = [
          [[I(210), I(330), I(90)], '#B48CFF'],
          [[I(210), I(330), H(0)], '#9C6BFF'], [[I(330), I(90), H(2)], '#7E4FE0'], [[I(90), I(210), H(4)], '#8A5CF0'],
          [[I(330), H(0), H(1)], '#6A3CD8'], [[I(330), H(1), H(2)], '#5A30C0'], [[I(90), H(2), H(3)], '#5A30C0'],
          [[I(90), H(3), H(4)], '#6A3CD8'], [[I(210), H(4), H(5)], '#7E4FE0'], [[I(210), H(5), H(0)], '#8A5CF0'],
        ];
        faces.forEach(([pts, col]) => E('path', { d: mkPoly(pts), fill: col, stroke: SC_INK, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, g));
        E('path', { d: mkPoly(hex), fill: 'none', stroke: SC_INK, 'stroke-width': 6, 'stroke-linejoin': 'round' }, g);
        const n = T(g, 0, -62, '20', { size: 34, weight: 800, anchor: 'middle', fill: '#FFE45C' });
        n.setAttribute('stroke', SC_INK); n.setAttribute('stroke-width', 5); n.setAttribute('paint-order', 'stroke');
        // little feet
        [-34, 34].forEach(x => E('path', { d: `M${x - 16},${R + 14} Q${x - 16},${R} ${x},${R} Q${x + 20},${R} ${x + 20},${R + 12} Q${x + 4},${R + 18} ${x - 16},${R + 14} Z`, fill: '#FFE45C', stroke: SC_INK, 'stroke-width': 3 }, g));
      },
      face: { x: 0, y: -4, eye: 14, gap: 40, mouthW: 22, mouthY: 24, lidCol: '#B48CFF' },
      upd: (t, g, st) => {
        arms.forEach(({ a, sd }, i) => {
          const w = Math.sin(t * TAU * 2.2 + i * 1.9) * 16;
          a.setAttribute('d', `M${sd * 100},20 Q${sd * 140},${10} ${sd * 146},${(-24 + w).toFixed(1)}`);
        });
        if (st.spin) tr(g, 0, 0, 1, st.spin);
      } }));
  } else if (kind === 'cubert') {
    const u = 70, cx = Math.cos(Math.PI / 6) * u, sy = 0.5 * u;
    c = scMake(parent, Object.assign(S, { seed: 23, bob: 2, mood: o.mood || 'deadpan',
      draw: g => {
        // little legs
        [-26, 26].forEach(x => {
          const y0 = sy - 6 - Math.abs(x) * 0.25;   // the cube's bottom edges slope up to the sides
          E('path', { d: `M${x},${y0} L${x},${sy + 26}`, stroke: SC_INK, 'stroke-width': 6, 'stroke-linecap': 'round' }, g);
          E('path', { d: `M${x - 12},${sy + 34} Q${x - 12},${sy + 22} ${x},${sy + 22} Q${x + 16},${sy + 22} ${x + 16},${sy + 32} Q${x + 4},${sy + 38} ${x - 12},${sy + 34} Z`, fill: '#2A1A22' }, g);
        });
        // the cube: top, left (front) and right faces
        const top = [[0, -u - sy], [cx, -u], [0, -u + sy], [-cx, -u]];
        E('path', { d: mkPoly(top), fill: '#FFE07A', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
        E('path', { d: mkPoly([[-cx, -u], [0, -u + sy], [0, sy + 2], [-cx, 2]].map(([x, y]) => [x, y + u * 0.0])), fill: '#FFC247', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
        E('path', { d: mkPoly([[0, -u + sy], [cx, -u], [cx, 2], [0, sy + 2]]), fill: '#E2A21C', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
        // "1 cm³" painted on the top face
        const lab = G(g);
        lab.setAttribute('transform', `translate(0 ${-u}) matrix(${(cx / u).toFixed(4)} ${(sy / u).toFixed(4)} ${(-cx / u).toFixed(4)} ${(sy / u).toFixed(4)} 0 0)`);
        T(lab, 0, 9, '1 cm³', { size: 22, weight: 800, anchor: 'middle', fill: '#8A6508' });
        // bow tie
        const bt = G(g); tr(bt, -cx / 2, sy + 2 - 6);
        E('path', { d: 'M0,0 L-16,-9 L-16,9 Z M0,0 L16,-9 L16,9 Z', fill: '#C62828', stroke: SC_INK, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, bt);
      },
      face: { x: -cx / 2, y: -u / 2 + 6, eye: 12, gap: 30, mouthW: 20, mouthY: 22, lidCol: '#FFC247' } }));
    // huge eyebrows (over the face kit's own brows)
    const inner = c.firstChild, eb = G(inner); tr(eb, -cx / 2, -u / 2 + 6);
    E('path', { d: 'M-30,-24 Q-18,-34 -4,-26 L-6,-20 Q-18,-26 -28,-18 Z M30,-24 Q18,-34 4,-26 L6,-20 Q18,-26 28,-18 Z', fill: '#3A2416', stroke: SC_INK, 'stroke-width': 2 }, eb);
  } else if (kind === 'cyl') {
    const r = 60, h = 200, ry = 18;
    let label = null, flat = null, flatR = null;
    c = scMake(parent, Object.assign(S, { seed: 27, bob: 3, mood: o.mood || 'smug',
      draw: g => {
        // the can body (silver), base ellipse, top ellipse
        E('path', { d: `M${-r},${-h / 2} L${-r},${h / 2} A${r},${ry} 0 0 0 ${r},${h / 2} L${r},${-h / 2} Z`, fill: linGrad('#C9D3DC', '#8F9CAB', false), stroke: SC_INK, 'stroke-width': 4 }, g);
        label = G(g);
        E('path', { d: `M${-r},${-70} L${-r},70 A${r},${ry} 0 0 0 ${r},70 L${r},-70 A${r},${ry} 0 0 1 ${-r},-70 Z`, fill: '#9BE15D', stroke: SC_INK, 'stroke-width': 3 }, label);
        E('path', { d: `M${-r},-30 A${r},${ry} 0 0 0 ${r},-30 M${-r},34 A${r},${ry} 0 0 0 ${r},34`, fill: 'none', stroke: '#2FA36B', 'stroke-width': 8 }, label);
        T(label, 0, 64, 'FIZZ', { size: 26, weight: 800, anchor: 'middle', fill: '#1E6E3A' });
        E('ellipse', { cx: 0, cy: -h / 2, rx: r, ry, fill: linGrad('#F2F6FA', '#B9C4CE', true), stroke: SC_INK, 'stroke-width': 4 }, g);
        E('ellipse', { cx: 0, cy: -h / 2, rx: r - 10, ry: ry - 5, fill: 'none', stroke: '#8F9CAB', 'stroke-width': 2.5 }, g);
        // ring pull, worn like a hair bow
        const rp = G(g); tr(rp, 22, -h / 2 - 6, 1, -20);
        E('ellipse', { cx: 0, cy: 0, rx: 20, ry: 11, fill: 'none', stroke: '#9AA6B2', 'stroke-width': 6 }, rp);
        E('ellipse', { cx: 0, cy: 0, rx: 20, ry: 11, fill: 'none', stroke: SC_INK, 'stroke-width': 1.5 }, rp);
        E('path', { d: `M${-r + 12},${-h / 2 + 30} L${-r + 12},${h / 2 - 20}`, stroke: '#FFFFFF', 'stroke-width': 6, opacity: 0.45, 'stroke-linecap': 'round' }, g);
        // the peeled label, laid flat to the right: 2πr wide, 140 tall
        flat = G(g);
        flatR = E('rect', { x: r, y: -70, width: 0, height: 140, fill: '#9BE15D', stroke: SC_INK, 'stroke-width': 3 }, flat);
        flat.stripes = E('path', { d: '', stroke: '#2FA36B', 'stroke-width': 8 }, flat);
      },
      face: { x: 0, y: -12, eye: 14, gap: 44, mouthW: 26, mouthY: 28, lidCol: '#C9D3DC' },
      upd: (t, g, st) => {
        const p = clamp(st.peel || 0), W = 2 * Math.PI * r * p;
        op(label, p > 0.02 ? 0 : 1); op(flat, p > 0.02 ? 1 : 0);
        attr(flatR, 'width', W.toFixed(1));
        attr(flat.stripes, 'd', W > 2 ? `M${r},-30 L${r + W},-30 M${r},34 L${r + W},34` : '');
      } }));
    // lashes
    const inner = c.firstChild, la = G(inner); tr(la, 0, -12);
    E('path', { d: 'M-36,-12 L-44,-20 M-30,-15 L-34,-25 M36,-12 L44,-20 M30,-15 L34,-25', stroke: SC_INK, 'stroke-width': 3, 'stroke-linecap': 'round' }, la);
    c.labelX0 = r; c.labelY = -70; c.labelW = 2 * Math.PI * r;
  } else {
    c = scKavya(parent, o);
  }
  return c;
}

/* ---------- sets ---------- */
function avBlock(parent) {
  const g = G(parent);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#7FC8F5', '#D6F0FF', true) }, g);
  const clouds = [[180, 90, 1], [760, 60, 0.8], [1080, 130, 0.7]].map(([x, y, s]) => {
    const c = G(g); tr(c, x, y, s);
    E('path', { d: 'M-80,20 Q-80,-10 -50,-10 Q-40,-40 0,-36 Q30,-56 60,-28 Q96,-28 96,8 Q96,24 76,24 L-64,24 Q-80,24 -80,20 Z', fill: '#FFFFFF', opacity: 0.9 }, c);
    return { c, x, y, s };
  });
  // the far block
  E('rect', { x: 40, y: 150, width: 260, height: 520, fill: '#D8DEE6', stroke: '#9AA6B2', 'stroke-width': 3 }, g);
  let fw = '';
  for (let r = 0; r < 11; r++) for (let k = 0; k < 4; k++) fw += `M${60 + k * 60},${170 + r * 44} h36 v22 h-36 Z `;
  E('path', { d: fw, fill: '#A9C4DA' }, g);
  // Kavya's block: cream with a red stripe, 12 storeys
  const bx = 330, bw = 760, by = 40;
  E('rect', { x: bx, y: by, width: bw, height: 600, fill: '#F4EBD8', stroke: '#B8A27A', 'stroke-width': 4 }, g);
  E('rect', { x: bx, y: by, width: bw, height: 26, fill: '#C9483E' }, g);
  let wins = '', ledges = '';
  for (let r = 0; r < 11; r++) {
    const y = by + 46 + r * 46;
    ledges += `M${bx},${y + 34} L${bx + bw},${y + 34} `;
    for (let k = 0; k < 9; k++) if (!(r === 5 && k === 5)) wins += `M${bx + 26 + k * 82},${y} h58 v26 h-58 Z `;
  }
  E('path', { d: ledges, stroke: '#D9CBAE', 'stroke-width': 4 }, g);
  E('path', { d: wins, fill: '#8FB8D6', stroke: '#6E8FA8', 'stroke-width': 1.5 }, g);
  // the renovating unit: row 5, window 5
  const ux = bx + 26 + 5 * 82, uy = by + 46 + 5 * 46;
  E('rect', { x: ux, y: uy, width: 58, height: 26, fill: '#6E5A48', stroke: '#3A2E24', 'stroke-width': 2 }, g);
  const ban = G(g); tr(ban, ux + 29, uy + 52);
  E('rect', { x: -96, y: -12, width: 192, height: 30, rx: 4, fill: '#FFC93C', stroke: SC_INK, 'stroke-width': 2.5 }, ban);
  T(ban, 0, 10, 'RENOVATION IN PROGRESS', { size: 15, weight: 800, anchor: 'middle', fill: SC_INK });
  const dust = [0, 1, 2, 3].map(i => E('circle', { cx: ux + 29, cy: uy + 10, r: 10, fill: '#E9E1D2', opacity: 0 }, g));
  // void deck
  E('rect', { x: bx, y: 640, width: bw, height: 110, fill: '#5A6670' }, g);
  for (let k = 0; k < 7; k++) E('rect', { x: bx + 20 + k * 122, y: 640, width: 34, height: 110, fill: '#D9DEE3', stroke: '#9AA6B2', 'stroke-width': 2 }, g);
  E('rect', { x: bx + bw - 150, y: 600, width: 120, height: 40, rx: 6, fill: '#2E7DD8', stroke: '#1E4E8C', 'stroke-width': 3 }, g);
  T(g, bx + bw - 90, 630, 'BLK 417', { size: 26, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  // ground, a skip of rubble, trees
  E('rect', { x: 0, y: 700, width: 1200, height: 50, fill: '#7DBE6A' }, g);
  const skip = G(g); tr(skip, 820, 712);
  E('path', { d: 'M-90,0 L90,0 L110,-60 L-110,-60 Z', fill: '#FFC93C', stroke: SC_INK, 'stroke-width': 4 }, skip);
  E('path', { d: 'M-96,-60 Q-60,-96 -20,-70 Q10,-100 50,-72 Q86,-90 100,-60 Z', fill: '#B9AA94', stroke: SC_INK, 'stroke-width': 3 }, skip);
  [[90, 1.1], [1150, 0.9], [260, 0.8]].forEach(([x, s]) => {
    const tr0 = G(g); tr(tr0, x, 700, s);
    E('rect', { x: -10, y: -90, width: 20, height: 90, fill: '#8B5A2B' }, tr0);
    E('circle', { cx: 0, cy: -120, r: 56, fill: ball('#7EE08A', '#2FA36B') }, tr0);
  });
  g.unit = [ux + 29, uy + 13];
  g.upd = t => {
    clouds.forEach(({ c, x, y, s }) => tr(c, x + ((t * 6) % 300) - 40, y, s));
    dust.forEach((d, i) => { const f = (t * 0.6 + i * 0.25) % 1; attr(d, 'cx', ux + 29 + 40 * f); attr(d, 'cy', uy + 10 - 50 * f); attr(d, 'r', 8 + 22 * f); op(d, 0.7 * (1 - f)); });
  };
  return g;
}

function avFlat(parent) {
  const g = G(parent), back = G(g);
  // ceiling, wall, cement floor
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#2A2F36' }, back);
  E('rect', { x: 0, y: 70, width: 1200, height: 520, fill: linGrad('#E9E4DA', '#D8D1C4', true) }, back);
  E('rect', { x: 0, y: 70, width: 1200, height: 14, fill: '#C9C0B0' }, back);
  E('rect', { x: 0, y: 586, width: 1200, height: 164, fill: '#9AA0A6' }, back);
  // plaster patches
  [[420, 160, 120, 60], [720, 300, 90, 120], [980, 520, 140, 50]].forEach(([x, y, w, h]) => E('rect', { x, y, width: w, height: h, rx: 18, fill: '#F2EEE6', opacity: 0.7 }, back));
  // the doorway (left) and its gate
  E('rect', { x: 46, y: 190, width: 210, height: 400, fill: '#5A6670', stroke: '#3A4048', 'stroke-width': 6 }, back);
  E('rect', { x: 60, y: 204, width: 182, height: 386, fill: linGrad('#C9D3DC', '#9AA6B2', true) }, back);   // the common corridor beyond
  T(back, 151, 250, '#05-17', { size: 22, weight: 700, anchor: 'middle', fill: '#5A6670', font: FB });
  g.hall = G(g);
  const gate = G(g), gateIn = G(gate);
  tr(gate, 60, 0);
  let bars = '';
  for (let x = 14; x < 182; x += 21) bars += `M${x},204 L${x},470 `;
  E('path', { d: bars, stroke: '#3A4048', 'stroke-width': 5 }, gateIn);
  E('rect', { x: 0, y: 204, width: 182, height: 12, fill: '#3A4048' }, gateIn);
  E('rect', { x: 0, y: 330, width: 182, height: 8, fill: '#3A4048' }, gateIn);
  E('rect', { x: 0, y: 470, width: 182, height: 120, fill: '#4A525C', stroke: '#2A2F36', 'stroke-width': 4 }, gateIn);   // solid lower panel
  E('circle', { cx: 166, cy: 400, r: 8, fill: '#E2B33C', stroke: SC_INK, 'stroke-width': 2 }, gateIn);
  g.gate = gate;
  g.open = p => { const k = 1 - 0.85 * clamp(p); gateIn.setAttribute('transform', `scale(${k.toFixed(3)} 1)`); };
  g.door = [150, 430];
  // window (right) with the next block outside
  E('rect', { x: 880, y: 150, width: 260, height: 220, fill: '#7FC8F5', stroke: '#E9E4DA', 'stroke-width': 10 }, back);
  E('rect', { x: 920, y: 200, width: 150, height: 170, fill: '#F4EBD8' }, back);
  let ow = '';
  for (let r = 0; r < 4; r++) for (let k = 0; k < 3; k++) ow += `M${934 + k * 46},${214 + r * 40} h28 v18 h-28 Z `;
  E('path', { d: ow, fill: '#8FB8D6' }, back);
  E('path', { d: 'M1010,150 L1010,370 M880,260 L1140,260', stroke: '#E9E4DA', 'stroke-width': 8 }, back);
  // Dad's colour swatches
  ['#FF8A3D', '#FFC247', '#56D69B', '#B48CFF'].forEach((col, i) => E('rect', { x: 600 + i * 46, y: 140, width: 40, height: 56, fill: col, stroke: '#FFFFFF', 'stroke-width': 3 }, back));
  T(back, 692, 224, 'FEATURE WALL?', { size: 20, weight: 800, anchor: 'middle', fill: '#8A7E6A', font: FB });
  // stepladder and paint tins (behind the bench)
  const lad = G(back); tr(lad, 330, 590);
  E('path', { d: 'M-60,0 L-20,-300 L20,-300 L60,0 M-20,-300 L-48,0', fill: 'none', stroke: '#C9D3DC', 'stroke-width': 10, 'stroke-linejoin': 'round' }, lad);
  [-240, -180, -120, -60].forEach(y => E('line', { x1: -20 - (y + 300) * 0.133, y1: y, x2: 20 + (y + 300) * 0.133, y2: y, stroke: '#9AA6B2', 'stroke-width': 8 }, lad));
  // hanging bulb
  const bulb = G(back); tr(bulb, 600, 84);
  E('line', { x1: 0, y1: 0, x2: 0, y2: 70, stroke: '#2A2F36', 'stroke-width': 3 }, bulb);
  E('circle', { cx: 0, cy: 86, r: 50, fill: glow('#FFE45C'), opacity: 0.5 }, bulb);
  E('circle', { cx: 0, cy: 86, r: 16, fill: '#FFF7C2', stroke: '#C9B48A', 'stroke-width': 3 }, bulb);
  // characters behind the bench
  g.mid = G(g);
  // the plywood workbench
  const front = G(g);
  E('rect', { x: 290, y: 518, width: 900, height: 28, rx: 4, fill: '#E2C08A', stroke: AV_COL.woodDk, 'stroke-width': 4 }, front);
  E('rect', { x: 306, y: 546, width: 868, height: 204, fill: linGrad('#D2A86E', '#B88A50', true), stroke: AV_COL.woodDk, 'stroke-width': 4 }, front);
  let grain = '';
  for (let i = 0; i < 6; i++) grain += `M${320 + i * 150},${570 + (i % 3) * 30} q60,-12 120,0 `;
  E('path', { d: grain, fill: 'none', stroke: '#9C6B3E', 'stroke-width': 2.5, opacity: 0.6 }, front);
  // a clamp and a pencil on the bench edge
  E('path', { d: 'M1080,506 L1080,560 L1100,560 L1100,506 Z', fill: '#E8424F', stroke: SC_INK, 'stroke-width': 3 }, front);
  E('rect', { x: 330, y: 505, width: 90, height: 12, rx: 3, fill: '#FFC93C', stroke: SC_INK, 'stroke-width': 2.5 }, front);
  // paint tins on the floor at the far left (in front)
  [[60, '#56D69B'], [130, '#FF8A3D']].forEach(([x, col]) => {
    E('path', { d: `M${x - 30},640 L${x - 30},700 A30,8 0 0 0 ${x + 30},700 L${x + 30},640 Z`, fill: '#C9D3DC', stroke: SC_INK, 'stroke-width': 3 }, front);
    E('ellipse', { cx: x, cy: 640, rx: 30, ry: 8, fill: col, stroke: SC_INK, 'stroke-width': 3 }, front);
  });
  g.front = front;
  g.top = G(g);
  g.counterY = 530;
  g.upd = t => { tr(bulb, 600, 84, 1, Math.sin(t * 1.3) * 4); };
  return g;
}

function avBalcony(parent) {
  const g = G(parent), back = G(g);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#86CDF7', '#E3F4FF', true) }, back);
  // blocks opposite
  [[60, 120, 300], [420, 60, 260], [760, 140, 220]].forEach(([x, y, w]) => {
    E('rect', { x, y, width: w, height: 600, fill: '#E6DCC6', stroke: '#B8A27A', 'stroke-width': 3 }, back);
    let wd = '';
    for (let r = 0; r < 10; r++) for (let k = 0; k < Math.floor(w / 60); k++) wd += `M${x + 18 + k * 60},${y + 20 + r * 46} h34 v20 h-34 Z `;
    E('path', { d: wd, fill: '#9CC2DC' }, back);
  });
  // the ceiling and the balcony floor tiles
  E('rect', { x: 0, y: 0, width: 1200, height: 60, fill: '#D8D1C4' }, back);
  // laundry pole
  E('line', { x1: 80, y1: 96, x2: 900, y2: 96, stroke: '#9AA6B2', 'stroke-width': 8, 'stroke-linecap': 'round' }, back);
  const clothes = [[180, '#FF8A3D', 'shirt'], [330, '#4CC9F0', 'towel'], [470, '#B48CFF', 'shirt'], [640, '#FFE45C', 'towel']].map(([x, col, k]) => {
    const c = G(back); tr(c, x, 96);
    E('path', { d: k === 'shirt' ? 'M-40,0 L40,0 L56,26 L36,34 L34,96 L-34,96 L-36,34 L-56,26 Z' : 'M-34,0 L34,0 L34,110 L-34,110 Z', fill: col, stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, c);
    return c;
  });
  // the divider to next door (Mr Tan's balcony)
  E('rect', { x: 980, y: 60, width: 40, height: 690, fill: '#CFC6B4', stroke: '#9C927C', 'stroke-width': 3 }, back);
  E('rect', { x: 1020, y: 60, width: 180, height: 690, fill: '#B9D0E0', opacity: 0.55 }, back);
  g.mid = G(g);
  // parapet wall, plants
  const front = G(g);
  E('rect', { x: 0, y: 508, width: 1200, height: 24, fill: '#F2EEE6', stroke: '#B8A27A', 'stroke-width': 3 }, front);
  E('rect', { x: 0, y: 532, width: 1200, height: 218, fill: linGrad('#E6DCC6', '#CFC2A6', true) }, front);
  [[120, 1], [860, 0.9]].forEach(([x, s]) => {
    const pt = G(front); tr(pt, x, 508, s);
    E('path', { d: 'M-40,0 L40,0 L32,-56 L-32,-56 Z', fill: '#C9483E', stroke: SC_INK, 'stroke-width': 3 }, pt);
    [[-30, -110], [0, -130], [30, -104], [-14, -90], [16, -92]].forEach(([dx, dy]) => E('path', { d: `M0,-56 Q${dx / 2},${(dy - 56) / 2} ${dx},${dy}`, fill: 'none', stroke: '#2FA36B', 'stroke-width': 8, 'stroke-linecap': 'round' }, pt));
  });
  g.front = front;
  g.top = G(g);
  g.wallY = 520;
  g.tanSpot = [1100, 440];
  g.upd = t => clothes.forEach((c, i) => c.setAttribute('transform', `translate(${[180, 330, 470, 640][i]} 96) rotate(${(Math.sin(t * 2 + i) * 3).toFixed(2)})`));
  return g;
}

/* ---------- props ---------- */
function avBlueprint(parent, w, h, o) {
  o = o || {};
  const g = G(parent);
  E('rect', { x: -w / 2 + 8, y: -h / 2 + 10, width: w, height: h, rx: 8, fill: 'rgba(0,0,0,0.3)' }, g);
  E('rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: 8, fill: linGrad('#1F5596', '#163E73', true), stroke: '#0E2A50', 'stroke-width': 4 }, g);
  let grid = '';
  for (let x = -w / 2 + 30; x < w / 2; x += 30) grid += `M${x},${-h / 2 + 6} L${x},${h / 2 - 6} `;
  for (let y = -h / 2 + 30; y < h / 2; y += 30) grid += `M${-w / 2 + 6},${y} L${w / 2 - 6},${y} `;
  E('path', { d: grid, stroke: '#FFFFFF', 'stroke-width': 1, opacity: 0.1 }, g);
  E('rect', { x: -w / 2 + 14, y: -h / 2 + 14, width: w - 28, height: h - 28, fill: 'none', stroke: '#FFFFFF', 'stroke-width': 2, opacity: 0.55 }, g);
  const tb = G(g); tr(tb, w / 2 - 14, h / 2 - 14);
  E('rect', { x: -170, y: -34, width: 170, height: 34, fill: '#163E73', stroke: '#FFFFFF', 'stroke-width': 1.5, opacity: 0.9 }, tb);
  T(tb, -85, -11, o.title || 'BALA RENO · DWG', { size: 15, weight: 700, anchor: 'middle', fill: '#CFE3F5', font: FB });
  g.content = G(g);
  g.area = { x: -w / 2 + 24, y: -h / 2 + 24, w: w - 48, h: h - 70 };
  return g;
}

function avToolbox(parent, o) {
  o = o || {};
  const g = G(parent), inner = G(g); tr(inner, 0, 0, o.s || 1);
  // tools sticking up inside
  E('rect', { x: -110, y: -190, width: 16, height: 110, rx: 4, fill: '#8B5A2B', stroke: SC_INK, 'stroke-width': 3 }, inner);
  E('rect', { x: -130, y: -210, width: 56, height: 30, rx: 6, fill: '#9AA6B2', stroke: SC_INK, 'stroke-width': 3 }, inner);   // hammer head
  E('rect', { x: 80, y: -200, width: 14, height: 120, rx: 6, fill: '#E8424F', stroke: SC_INK, 'stroke-width': 3 }, inner);    // screwdriver
  g.inside = G(inner);
  E('path', { d: 'M-150,-110 L150,-110 L140,0 L-140,0 Z', fill: linGrad('#E8424F', '#B52A35', true), stroke: SC_INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, inner);
  E('rect', { x: -40, y: -80, width: 80, height: 30, rx: 6, fill: '#C9D3DC', stroke: SC_INK, 'stroke-width': 3 }, inner);
  T(inner, 0, -30, 'BALA RENO', { size: 22, weight: 800, anchor: 'middle', fill: '#FFE45C' });
  const lid = G(inner);
  E('path', { d: 'M-154,-110 L154,-110 L154,-128 Q154,-136 146,-136 L-146,-136 Q-154,-136 -154,-128 Z', fill: '#D63A44', stroke: SC_INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, lid);
  E('path', { d: 'M-50,-136 L-50,-160 L50,-160 L50,-136', fill: 'none', stroke: SC_INK, 'stroke-width': 8, 'stroke-linejoin': 'round' }, lid);
  g.set = p => { const a = 100 * clamp(p); lid.setAttribute('transform', `rotate(${a.toFixed(1)} 154 -110)`); };
  g.set(0);
  return g;
}

function avUnitDrop(parent, base, sup, o) {
  o = o || {};
  const s = o.size || 64, g = G(parent), anchor = o.anchor || 'middle';
  const col = o.col || (sup === '³' ? AV_COL.volume : AV_COL.area);
  const bw = mkMeasure(base.replace(/[{}]/g, ''), { size: s }).w;
  const supW = s * 0.42, w = bw + supW;
  const x0 = anchor === 'middle' ? -w / 2 : anchor === 'end' ? -w : 0;
  const txt = mkText(g, x0, 0, '{{' + base + '}}', { size: s, fill: o.fill || C.ink });
  const sg = G(g), sIn = G(sg);
  const gl = T(sIn, 0, 0, sup === '³' ? '3' : '2', { size: s * 0.62, weight: 800, anchor: 'middle', fill: col });
  gl.setAttribute('stroke', SC_INK); gl.setAttribute('stroke-width', 4); gl.setAttribute('paint-order', 'stroke');
  E('circle', { cx: -s * 0.07, cy: -s * 0.36, r: s * 0.035, fill: SC_INK }, sIn);
  E('circle', { cx: s * 0.07, cy: -s * 0.36, r: s * 0.035, fill: SC_INK }, sIn);
  const hit = E('path', { d: `M${-s * 0.4},${-s * 0.2} l${-s * 0.18},${-s * 0.06} M${s * 0.4},${-s * 0.2} l${s * 0.18},${-s * 0.06} M${-s * 0.3},${-s * 0.58} l${-s * 0.12},${-s * 0.14} M${s * 0.3},${-s * 0.58} l${s * 0.12},${-s * 0.14}`, stroke: col, 'stroke-width': 4, 'stroke-linecap': 'round' }, sg);
  const sx = x0 + bw + supW / 2 + 2, sy = -s * 0.36;
  g.set = p => {
    p = clamp(p);
    op(sg, p > 0 ? 1 : 0);
    const fall = clamp(p / 0.55), y = lerp(-s * 4, sy, fall * fall);
    let kx = 1, ky = 1;
    if (p > 0.55) { const q = (p - 0.55) / 0.45; const b = Math.sin(q * Math.PI) * (1 - q); kx = 1 + 0.45 * b; ky = 1 - 0.4 * b; }
    tr(sg, sx, y);
    sIn.setAttribute('transform', `scale(${kx.toFixed(3)} ${ky.toFixed(3)})`);
    op(hit, p > 0.55 && p < 0.95 ? 1 - (p - 0.55) / 0.4 : 0);
  };
  g.set(0);
  g.w = w; g.txt = txt;
  return g;
}

function avIso(parent, heights, o) {
  o = o || {};
  const u = o.u || 40, ca = Math.cos(Math.PI / 6) * u, sa = 0.5 * u, g = G(parent);
  const px = (c, r, z) => [(c - r) * ca, (c + r) * sa - z * u];
  const list = [];
  heights.forEach((row, r) => row.forEach((hgt, c) => { for (let z = 0; z < hgt; z++) list.push({ r, c, z }); }));
  list.sort((a, b) => (a.r + a.c) - (b.r + b.c) || a.z - b.z || a.c - b.c);
  const stroke = o.stroke || SC_INK;
  g.cubes = list.map(({ r, c, z }) => {
    const col = (o.cols && o.cols[r] && o.cols[r][c]) || o.col || '#FFC247';
    const cg = G(g);
    const P = (dc, dr, dz) => px(c + dc, r + dr, z + dz);
    E('path', { d: mkPoly([P(0, 0, 1), P(1, 0, 1), P(1, 1, 1), P(0, 1, 1)]), fill: mkShade(col, 0.25), stroke, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, cg);
    E('path', { d: mkPoly([P(0, 1, 1), P(1, 1, 1), P(1, 1, 0), P(0, 1, 0)]), fill: col, stroke, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, cg);
    E('path', { d: mkPoly([P(1, 0, 1), P(1, 1, 1), P(1, 1, 0), P(1, 0, 0)]), fill: mkShade(col, -0.25), stroke, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, cg);
    cg.r = r; cg.c = c; cg.z = z;
    return cg;
  });
  g.set = k => g.cubes.forEach((cg, i) => op(cg, clamp(k - i)));
  g.px = px;
  return g;
}

function avNet(parent, cells, o) {
  o = o || {};
  const u = o.u || 60, g = G(parent), ink = o.ink || MK.ink;
  g.cells = cells.map(([c, r], i) => {
    const cg = G(g);
    E('rect', { x: c * u, y: r * u, width: u, height: u, fill: (o.cols && o.cols[i]) || o.col || '#EBC48A', stroke: ink, 'stroke-width': 3 }, cg);
    if (o.labels && o.labels[i]) mkText(cg, c * u + u / 2, r * u + u / 2 + (o.size || 28) * 0.36, o.labels[i], { size: o.size || 28, anchor: 'middle', fill: ink });
    return cg;
  });
  g.set = k => g.cells.forEach((cg, i) => op(cg, clamp(k - i)));
  return g;
}

function avFishTank(parent, o) {
  o = o || {};
  const w = o.w || 300, h = o.h || 240, d = o.depth || 50, g = G(parent);
  const x0 = -w / 2, y0 = -h;
  // back and side glass (oblique)
  E('path', { d: mkPoly([[x0, y0], [x0 + d, y0 - d * 0.6], [x0 + w + d, y0 - d * 0.6], [x0 + w + d, -d * 0.6], [x0 + w, 0], [x0 + w, y0]]), fill: 'rgba(200,235,255,0.18)', stroke: '#9AD4F0', 'stroke-width': 3 }, g);
  // water (front view rectangle that rises)
  const water = E('rect', { x: x0, y: -h * 0.8, width: w, height: h * 0.8, fill: 'rgba(76,201,240,0.45)' }, g);
  const surf = E('path', { d: '', fill: 'rgba(160,225,250,0.6)', stroke: '#4CC9F0', 'stroke-width': 2 }, g);
  // gravel and a plant
  E('rect', { x: x0, y: -16, width: w, height: 16, fill: '#C9A27A' }, g);
  E('path', { d: `M${x0 + 40},-16 Q${x0 + 30},-80 ${x0 + 46},-120 M${x0 + 54},-16 Q${x0 + 70},-70 ${x0 + 60},-100`, fill: 'none', stroke: '#2FA36B', 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
  // Mr Bubbles
  const fish = G(g);
  E('path', { d: 'M-30,0 Q-10,-22 18,-10 Q30,0 18,10 Q-10,22 -30,0 Z', fill: '#FF8A3D', stroke: SC_INK, 'stroke-width': 3 }, fish);
  E('path', { d: 'M-28,0 L-48,-16 L-44,0 L-48,16 Z', fill: '#FFB347', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, fish);
  E('circle', { cx: 12, cy: -3, r: 4, fill: SC_INK }, fish);
  const bubs = [0, 1, 2].map(i => E('circle', { r: 4 + i, fill: 'none', stroke: '#E3F4FF', 'stroke-width': 2 }, g));
  // front glass and rim
  E('rect', { x: x0, y: y0, width: w, height: h, fill: 'rgba(255,255,255,0.08)', stroke: '#BFE6F8', 'stroke-width': 5 }, g);
  E('path', { d: `M${x0},${y0} L${x0 + d},${y0 - d * 0.6} L${x0 + w + d},${y0 - d * 0.6} L${x0 + w},${y0} M${x0 + w},0 L${x0 + w + d},${-d * 0.6} L${x0 + w + d},${y0 - d * 0.6}`, fill: 'none', stroke: '#BFE6F8', 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
  E('path', { d: `M${x0 + 16},${y0 + 14} L${x0 + 16},${-30}`, stroke: '#FFFFFF', 'stroke-width': 5, opacity: 0.4, 'stroke-linecap': 'round' }, g);
  let lvl = 0.8;
  g.set = level => {
    lvl = clamp(level === undefined ? 0.8 : level);
    attr(water, 'y', (-h * lvl).toFixed(1)); attr(water, 'height', (h * lvl).toFixed(1));
    const yt = -h * lvl;
    attr(surf, 'd', lvl > 0.01 ? mkPoly([[x0, yt], [x0 + d, yt - d * 0.6], [x0 + w + d, yt - d * 0.6], [x0 + w, yt]]) : '');
    op(fish, lvl > 0.15 ? 1 : 0);
  };
  g.upd = t => {
    const top = -h * lvl, fx = Math.sin(t * 0.7) * (w * 0.32), fy = lerp(-30, top + 30, 0.5 + 0.3 * Math.sin(t * 1.1));
    const dir = Math.cos(t * 0.7) >= 0 ? 1 : -1;
    fish.setAttribute('transform', `translate(${fx.toFixed(1)} ${fy.toFixed(1)}) scale(${dir} 1)`);
    bubs.forEach((b, i) => { const f = (t * 0.5 + i * 0.33) % 1; attr(b, 'cx', (fx + dir * 24).toFixed(1)); attr(b, 'cy', (fy - 10 - f * (fy - top)).toFixed(1)); op(b, lvl > 0.15 ? 1 - f : 0); });
  };
  g.set(0.8); g.upd(0);
  g.fish = fish; g.W = w; g.H = h;
  return g;
}

function avTiles(parent, o) {
  o = o || {};
  const n = o.n || 6, w = o.w || 160, g = G(parent);
  E('rect', { x: -w / 2 - 10, y: -16, width: w + 20, height: 16, fill: '#B88A50', stroke: SC_INK, 'stroke-width': 3 }, g);
  for (let i = 0; i < n; i++) {
    const y = -16 - (i + 1) * 14;
    E('rect', { x: -w / 2 + (i % 2 ? 4 : -4), y, width: w, height: 14, fill: i % 2 ? '#E9E4DA' : '#D8D1C4', stroke: '#8A7E6A', 'stroke-width': 2 }, g);
  }
  return g;
}
