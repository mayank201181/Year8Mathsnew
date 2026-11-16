/* WHAT ARE THE CHANCES? (Claude Sitcom Ep 20, Probability): the cast, sets and props of this episode.
   Bundled after engine lib.js, kit.js, mathkit.js and sitcom.js (scMake, scTalk, scKavya, scCastHuman,
   scConfessional, scLowerThird, scVideoCall, mk* maths kit). Every top-level name starts with `pb`, except `cast`.

   Characters: cast(parent, kind, o) -> g, origin at the character's centre, about 200-240 px tall at s = 1
     o: { s (scale), mood (default mood), ... }   (humans: any scHuman option overrides, e.g. prop, lift)
     g.set({ t, talk, mood, look, sweat, still, ... })   call every frame
       talk 0..1 (use scTalk(S, t, who)); mood: neutral | happy | smug | annoyed | sad | shock | deadpan
       look -1..1 pupils left/right; still: true stops the idle bob
     HUMANS (busts, bottom of the shirt at y = 140, so put them behind the coffee table or the frame edge):
       'kavya'  (kavya)  Kavya, 12 (scKavya, PE shirt "8")
       'mum'    (mum)    Mum: magenta kurta, bun, bindi. Default prop: a score sheet ('paper'), Game Night commissioner
       'dad'    (dad)    Dad: glasses, moustache, green polo. Default prop: his phone (the forecast, the TOTO app)
       'boy'    (boy)    Ah Boy, 8: orange star tee. Default: an empty hand (lift: 1 raises it)
       'priya'  (priya)  Priya, 12: school uniform, bob, yellow clip. Default prop: a pencil
       'tan'    (tan)    Mr Tan, maths teacher, lives one floor up: shirt and tie, glasses. Default prop: a mug
       'rose'   (rose)   Auntie Rose: curly perm, floral blouse, ROSE'S apron. Default prop: a phone
       Pass { prop: null } for no prop; { body: true } for a full body (scHumanBody, feet at 0,0; pose API).
     CARTOONS (scMake):
       'cube'   (cube)   Cubert, a perfectly FAIR dice (never "die"): a white cube in three-quarter view, his face on
                         the front face, 3 pips on the top face and 2 on the side, white gloves, thin legs, a gold
                         "FAIR" rosette. Dramatic, theatrical. Default mood smug.
                         Extra: { arms: 0..1 } 0 hands on hips, 1 arms flung up in drama.
                         To faint: rotate the whole cast with tr(g, x, y, s, angle) about his feet (origin is centre).
       'penny'  (penny)  Penny, a gold coin with no memory: a gold disc with a rim and an edge, a curl on top with a pink
                         bow, little legs. Bubbly, forgetful. Default happy.
                         Extra: { flip: 0..1 } squashes her sideways like a spinning coin (0 and 1 face-on, 0.5 edge-on).
       'spin'   (spin)   Spinella, a diva spinner with UNEQUAL sectors: red 150°, blue 90°, green 120° (clockwise from
                         the top, red first), a white hub with her face, a black pointer, pearls, on a little stand.
                         Default smug. Extra: { arrow: degrees } the pointer angle (0 = up, clockwise; default 20).
                         PB_SPIN gives the sector angles.
       'venna'  (venna)  Venna, a VENN DIAGRAM wedding usher: a white universal-set card with two overlapping circles
                         (blue left, pink right), her face in the overlap, an earpiece mic, a clipboard.
                         Default neutral. Extra: { lit: 0..1 } lights the overlap (yellow).
       'freq'   (freq)   Dr Freq, RELATIVE FREQUENCY: a clipboard scientist (tally marks above his face on the paper),
                         goggles on top, a lab-coat collar, a tally counter in his hand. Default neutral.
                         Extra: { count: n } the number on his tally counter (0-9999).
       'banyan' (banyan) Uncle Banyan, a TREE DIAGRAM: an old banyan tree whose branches split 2 then 2 (four leafy
                         ends), a face on the trunk, aerial roots hanging like a beard. Slow, wise. Default neutral.
                         Extra: { lit: [k...] } nothing; { glow: 0..3 } lights the path 0..3 (0 = rain-rain ... 3 =
                         dry-dry; -1 none).

   Shots
     pbConf(parent, who)             confessional background tinted for that character (scConfessional); g.set(p, t)
     PB_TINT                         the confessional colours per character
     pbLowerThird(parent, who)       scLowerThird with this episode's name and role for `who` (PB_LT); g.set(p)

   Sets (full stage 1200 x 750; each returns g)
     pbFlat(parent)       Kavya's living room in Block 208, a rainy Saturday: cream wall, a big window on the left
                          (x 90-470, y 110-430) with rain and storm clouds, a wall clock (g.clock(h, m)), a shelf of
                          board games, a ceiling fan, a sofa behind, and a leak in the ceiling dripping into a red pail
                          on the floor at the right (x 1130). LAYERS like a counter: characters in g.mid (a bust at y
                          about 440 hides its shirt hem behind the coffee table), the coffee table is g.front (top at
                          g.tableY = 556, x 150-1050), props standing on the table go in g.top.
                          g.upd(t, rain 0..1) moves the rain, the drip and the fan; g.flash(p) lightning (0..1) over the
                          window and the room; g.win = [x, y, w, h] of the window glass.
     pbTableTop(parent)   top-down close-up of the coffee table: wooden planks and a green felt games mat
                          (g.mat = [x, y, w, h] = [110, 120, 980, 540]).
     pbBox(parent)        Mr Tan's battered game box ("MR TAN'S GAMES", "est. 1987"), base centre at (0,0), about
                          300 wide; g.open(p) lifts the lid and lets the light out.
     pbRoseCall(parent, w, h, label)  scVideoCall with Rose's stall in the rain behind and Auntie Rose (bust) far too
                          close to the camera (the series gag). Centred on (0,0). g.rose (use g.rose.set), g.screen.
     pbTrack(parent, o)   the TWO-DICE HORSE RACE board: 12 lanes numbered 1-12 (top to bottom), o.len squares each
                          (default 8), a horse counter per lane. Origin top-left. g.set(i, pos) puts horse i+1 at
                          square pos (0 = start, fractions slide); g.hl(i, p) highlights lane i; g.W, g.H, g.rowH;
                          g.y(i) is the centre y of lane i.

   Props (around their own origin)
     PB                       palette: red, blue, gold, rain, felt, wood, sweet colours
     pbBag(parent, o)         clear sweet bag with a paper label, base centre at (0,0), about 190 x 230.
                              o: { red, blue, label ('A') }. g.hl(p) rings the red sweets (gold)
     pbSweet(parent, col, s)  a wrapped sweet, centred, about 60 wide
     pbStamp(parent, ok)      mkStamp 'NO CHANCE' (red) or 'SURE THING' (green, ok true); g.set(p). About 520 px wide at
                              scale 1: scale it (tr(g, x, y, 0.7)).
     pbForecast(parent, o)    a phone showing the weather app, centred, 260 x 440. o: { day ('SATURDAY'), pct ('70%'),
                              text ('Thunderstorms') }. g.flash(p) lights the storm cloud's bolt.
     pbToto(parent)           Dad's TOTO ticket, centred, 300 x 150: six numbers picked from 1-49
     pbCap(parent)            a bottle cap, centred, about 90 wide; g.set(up) 1 = top up (flat lid showing), 0 = top
                              down (the open rim showing)
     pbCup(parent)            a paper cup, base centre at (0,0), about 110 tall; g.set(side) 0 upright, 1 lying on its side
     pbBolt(parent, s)        a lightning bolt (thunder punctuation), centred
*/

/* ---------- palette ---------- */
const PB = {
  red: '#E8424F', blue: '#3B82F6', green: '#2FA36B', gold: '#FFC93C', goldDk: '#B8860B', pink: '#FF8FC8',
  rain: '#9FC4E0', storm: '#3A4A5C', felt: '#1F6B4A', feltDk: '#17533A', wood: '#A0703F', woodDk: '#6B4423',
  lemon: '#FFE45C', straw: '#FF6B8A',
};
const PB_SPIN = [{ label: 'red', deg: 150, col: '#E8424F' }, { label: 'blue', deg: 90, col: '#3B82F6' }, { label: 'green', deg: 120, col: '#2FA36B' }];

/* ---------- confessional tints, lower thirds ---------- */
const PB_TINT = {
  cube: ['#1A2240', '#33407A'], penny: ['#3A2A0C', '#6E5414'], spin: ['#3A1030', '#6B1E58'], venna: ['#14243A', '#25446B'],
  freq: ['#10283A', '#1E4E6E'], banyan: ['#1E2E14', '#3E5A28'], kavya: ['#14243A', '#25446B'], rose: ['#3A1424', '#6E2A44'],
  dad: ['#123026', '#245A48'], mum: ['#3A1030', '#6B1E58'], boy: ['#3A2410', '#6B4414'], priya: ['#1A2240', '#33407A'],
  tan: ['#1A2A3A', '#33506E'],
};
function pbConf(parent, who) { const c = PB_TINT[who] || PB_TINT.cube; return scConfessional(parent, c[0], c[1]); }
const PB_LT = {
  cube: ['CUBERT', 'A dice. Perfectly fair. Never "die".'],
  penny: ['PENNY', 'A coin. No memory.'],
  spin: ['SPINELLA', 'A spinner. Biased, darling.'],
  venna: ['VENNA', 'Venn diagram. Seats everyone once.'],
  freq: ['DR FREQ', 'Relative frequency. Needs more trials.'],
  banyan: ['UNCLE BANYAN', 'Tree diagram. Branches out. Slowly.'],
  kavya: ['KAVYA, 12', 'Stuck indoors. Half right.'],
  mum: ['MUM', 'Game Night commissioner.'],
  dad: ['DAD', '"I have a feeling."'],
  boy: ['AH BOY, 8', "Kavya's brother. Optimist."],
  priya: ['PRIYA', "Best friend. Doesn't play. Wins."],
  tan: ['MR TAN', 'Maths teacher. Lives upstairs.'],
  rose: ['AUNTIE ROSE', "Rose's Kitchen, Blk 208"],
};
function pbLowerThird(parent, who) { const l = PB_LT[who] || [String(who).toUpperCase(), '']; return scLowerThird(parent, l[0], l[1]); }

/* ---------- the cast ---------- */
const PB_PROP = { mum: 'paper', dad: 'phone', boy: null, priya: 'pencil', tan: 'mug', rose: 'phone' };
function cast(parent, kind, o) {
  o = o || {};
  if (kind === 'kavya') return scKavya(parent, o);
  if (SC_HUMANS[kind]) {
    const p = Object.assign({}, kind === 'boy' ? { hand: true } : { prop: PB_PROP[kind] }, o);
    return scCastHuman(parent, kind, p);
  }
  const S = { s: o.s, mood: o.mood };
  let c;
  if (kind === 'cube') {
    let arms = [];
    c = scMake(parent, Object.assign(S, { seed: 6, bob: 3, mood: o.mood || 'smug',
      draw: g => {
        // legs and shoes
        [-34, 34].forEach(x => {
          E('path', { d: `M${x},94 L${x},128`, stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
          E('path', { d: `M${x - 14},136 Q${x - 14},124 ${x + 2},124 L${x + 16},126 Q${x + 22},136 ${x + 14},138 Z`, fill: '#2A1A22', stroke: SC_INK, 'stroke-width': 2 }, g);
        });
        // arms (animated), behind the body
        [-1, 1].forEach(sd => {
          const a = E('path', { d: '', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
          const h = E('circle', { r: 12, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
          arms.push({ a, h, sd });
        });
        // the cube: top face, side face, front face
        E('path', { d: 'M-78,-56 L-38,-96 L118,-96 L78,-56 Z', fill: '#E9EEF3', stroke: SC_INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, g);
        E('path', { d: 'M78,-56 L118,-96 L118,56 L78,96 Z', fill: '#C9D3DC', stroke: SC_INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, g);
        E('rect', { x: -78, y: -56, width: 156, height: 152, rx: 14, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 5 }, g);
        E('rect', { x: -66, y: -46, width: 132, height: 14, rx: 7, fill: '#F2F6FA' }, g);
        // pips: 3 on the top face (diagonal), 2 on the side
        [[-28, -62], [20, -76], [68, -90]].forEach(([x, y]) => E('ellipse', { cx: x, cy: y + 6, rx: 9, ry: 5, fill: SC_INK }, g));
        [[90, -50], [106, 30]].forEach(([x, y]) => E('ellipse', { cx: x, cy: y, rx: 5, ry: 9, fill: SC_INK }, g));
        // blush and the FAIR rosette
        E('ellipse', { cx: -48, cy: 44, rx: 12, ry: 7, fill: '#FF8FB0', opacity: 0.5 }, g);
        E('ellipse', { cx: 48, cy: 44, rx: 12, ry: 7, fill: '#FF8FB0', opacity: 0.5 }, g);
        const ro = G(g); tr(ro, 48, 74);
        E('path', { d: 'M-8,6 L-14,30 L-4,24 L0,34 L4,24 L14,30 L8,6 Z', fill: '#C62828', stroke: SC_INK, 'stroke-width': 2 }, ro);
        E('circle', { r: 15, fill: PB.gold, stroke: SC_INK, 'stroke-width': 2.5 }, ro);
        T(ro, 0, 4.5, 'FAIR', { size: 11, weight: 800, anchor: 'middle', fill: '#6B4A00' });
      },
      face: { x: 0, y: 6, eye: 17, gap: 58, mouthW: 38, mouthY: 40, lidCol: '#E6EBEF' },
      upd: (t, g, st) => {
        const k = clamp(st.arms === undefined ? 0 : st.arms);
        arms.forEach(({ a, h, sd }) => {
          const sx = sd < 0 ? -76 : 92, sy = 30;
          // hands on hips (k 0) -> flung up and out (k 1)
          const hx = sx + sd * lerp(4, 70, k), hy = lerp(62, -100, k) + Math.sin(t * 3 + sd) * 4 * k;
          const ex = sx + sd * lerp(30, 56, k), ey = lerp(40, -20, k);
          a.setAttribute('d', `M${sx},${sy} Q${ex.toFixed(1)},${ey.toFixed(1)} ${hx.toFixed(1)},${hy.toFixed(1)}`);
          attr(h, 'cx', hx); attr(h, 'cy', hy);
        });
      } }));
  } else if (kind === 'penny') {
    let disc = null;
    c = scMake(parent, Object.assign(S, { seed: 10, bob: 6, mood: o.mood || 'happy',
      draw: g => {
        // little legs
        [-26, 26].forEach(x => {
          E('path', { d: `M${x},84 L${x},118`, stroke: SC_INK, 'stroke-width': 6, 'stroke-linecap': 'round' }, g);
          E('ellipse', { cx: x + 6, cy: 122, rx: 14, ry: 7, fill: '#FF8FC8', stroke: SC_INK, 'stroke-width': 2.5 }, g);
        });
        disc = G(g);
        E('ellipse', { cx: 8, cy: 4, rx: 92, ry: 92, fill: '#B8860B', stroke: SC_INK, 'stroke-width': 5 }, disc);   // edge
        E('circle', { r: 92, fill: ball('#FFE27A', '#D9A21B'), stroke: SC_INK, 'stroke-width': 5 }, disc);
        E('circle', { r: 76, fill: 'none', stroke: '#B8860B', 'stroke-width': 4 }, disc);
        let d = '';
        for (let i = 0; i < 36; i++) { const a = i / 36 * TAU; d += `M${(Math.cos(a) * 84).toFixed(1)},${(Math.sin(a) * 84).toFixed(1)} L${(Math.cos(a) * 90).toFixed(1)},${(Math.sin(a) * 90).toFixed(1)} `; }
        E('path', { d, stroke: '#B8860B', 'stroke-width': 2.5 }, disc);   // milled rim
        E('path', { d: 'M-52,50 Q-30,70 -6,70 M52,50 Q30,70 6,70', fill: 'none', stroke: '#B8860B', 'stroke-width': 4, 'stroke-linecap': 'round' }, disc);   // laurels
        E('ellipse', { cx: -36, cy: -48, rx: 18, ry: 9, fill: '#FFFFFF', opacity: 0.45, transform: 'rotate(-30 -36 -48)' }, disc);
        E('ellipse', { cx: -44, cy: 26, rx: 11, ry: 7, fill: '#FF8FB0', opacity: 0.55 }, disc);
        E('ellipse', { cx: 44, cy: 26, rx: 11, ry: 7, fill: '#FF8FB0', opacity: 0.55 }, disc);
        // the curl and bow on top
        E('path', { d: 'M0,-92 Q-6,-118 12,-122 Q26,-122 22,-108', fill: 'none', stroke: '#D9A21B', 'stroke-width': 7, 'stroke-linecap': 'round' }, disc);
        const bw = G(disc); tr(bw, -18, -96, 1, -15);
        E('path', { d: 'M0,0 L-18,-10 L-18,10 Z M0,0 L18,-10 L18,10 Z', fill: '#FF8FC8', stroke: SC_INK, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, bw);
      },
      face: { x: 0, y: -6, eye: 17, gap: 54, mouthW: 34, mouthY: 34, lidCol: '#F2C94C' },
      upd: (t, g, st) => {
        const f = st.flip || 0, sx = Math.max(0.06, Math.abs(Math.cos(Math.PI * f)));
        g.setAttribute('transform', (g.getAttribute('transform') || '') + ` scale(${sx.toFixed(3)} 1)`);
      } }));
    void disc;
  } else if (kind === 'spin') {
    let ptr = null;
    c = scMake(parent, Object.assign(S, { seed: 14, bob: 3, mood: o.mood || 'smug',
      draw: g => {
        // stand
        E('path', { d: 'M-8,96 L-14,126 L14,126 L8,96 Z', fill: '#8F9CAB', stroke: SC_INK, 'stroke-width': 3 }, g);
        E('rect', { x: -56, y: 124, width: 112, height: 16, rx: 8, fill: '#5A6670', stroke: SC_INK, 'stroke-width': 3 }, g);
        // the disc, sectors clockwise from the top: red 150, blue 90, green 120
        E('circle', { r: 104, fill: '#22303A', stroke: SC_INK, 'stroke-width': 5 }, g);
        let a = -90;
        PB_SPIN.forEach(sc => { E('path', { d: 'M0,0 L' + mkArcD(0, 0, 96, a, a + sc.deg).slice(1) + ' Z', fill: sc.col, stroke: '#FFFFFF', 'stroke-width': 3 }, g); a += sc.deg; });
        // the pointer, under the hub
        ptr = G(g);
        E('path', { d: 'M-9,0 L-5,-74 L0,-94 L5,-74 L9,0 Z', fill: '#2A1A22', stroke: '#FFFFFF', 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, ptr);
        // the hub (her face) and pearls
        E('circle', { r: 50, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 4 }, g);
        for (let i = 0; i < 9; i++) { const an = (200 + i * 17.5) * Math.PI / 180; E('circle', { cx: Math.cos(an) * 58, cy: 40 + Math.sin(an) * 18 + 22, r: 6, fill: '#FFF8EE', stroke: '#B9A99A', 'stroke-width': 1.5 }, g); }
        E('ellipse', { cx: -30, cy: 16, rx: 9, ry: 5, fill: '#FF8FB0', opacity: 0.6 }, g);
        E('ellipse', { cx: 30, cy: 16, rx: 9, ry: 5, fill: '#FF8FB0', opacity: 0.6 }, g);
        // lashes
        [-1, 1].forEach(sd => E('path', { d: `M${sd * 30},-24 l${sd * 6},-9 M${sd * 22},-27 l${sd * 2},-10 M${sd * 38},-19 l${sd * 9},-6`, stroke: SC_INK, 'stroke-width': 3, 'stroke-linecap': 'round' }, g));
        // a flower on the rim
        const fl = G(g); tr(fl, 70, -76);
        for (let i = 0; i < 5; i++) { const an = i / 5 * TAU; E('circle', { cx: Math.cos(an) * 10, cy: Math.sin(an) * 10, r: 8, fill: '#FF8FC8', stroke: SC_INK, 'stroke-width': 2 }, fl); }
        E('circle', { r: 6, fill: PB.gold, stroke: SC_INK, 'stroke-width': 2 }, fl);
      },
      face: { x: 0, y: -8, eye: 12, gap: 40, mouthW: 26, mouthY: 24, lidCol: '#E8D8F0' },
      upd: (t, g, st) => tr(ptr, 0, 0, 1, st.arrow === undefined ? 20 : st.arrow) }));
  } else if (kind === 'venna') {
    let lit = null;
    c = scMake(parent, Object.assign(S, { seed: 18, bob: 2, mood: o.mood || 'neutral',
      draw: g => {
        // legs
        [-40, 40].forEach(x => {
          E('path', { d: `M${x},90 L${x},124`, stroke: SC_INK, 'stroke-width': 6, 'stroke-linecap': 'round' }, g);
          E('path', { d: `M${x - 10},132 L${x - 6},122 L${x + 12},124 L${x + 18},132 Z`, fill: '#2A1A22', stroke: SC_INK, 'stroke-width': 2 }, g);
        });
        // the universal set card
        E('rect', { x: -132, y: -96, width: 264, height: 188, rx: 14, fill: '#FFFDF6', stroke: SC_INK, 'stroke-width': 5 }, g);
        T(g, -114, -64, 'ξ', { size: 28, weight: 700, fill: '#5A6670' });
        E('circle', { cx: -40, cy: 0, r: 72, fill: '#7FB6FF', 'fill-opacity': 0.45, stroke: '#2E6FD8', 'stroke-width': 5 }, g);
        E('circle', { cx: 40, cy: 0, r: 72, fill: '#FF9CC8', 'fill-opacity': 0.45, stroke: '#D63A7A', 'stroke-width': 5 }, g);
        lit = E('path', { d: 'M0,-59.6 A72,72 0 0 1 0,59.6 A72,72 0 0 1 0,-59.6 Z', fill: PB.lemon, opacity: 0 }, g);
        E('path', { d: 'M0,-59.6 A72,72 0 0 1 0,59.6 A72,72 0 0 1 0,-59.6 Z', fill: 'none', stroke: '#8A4AA8', 'stroke-width': 3 }, g);
        // earpiece mic
        E('path', { d: 'M-118,-30 Q-140,-10 -122,14 L-96,20', fill: 'none', stroke: SC_INK, 'stroke-width': 4, 'stroke-linecap': 'round' }, g);
        E('circle', { cx: -92, cy: 20, r: 6, fill: SC_INK }, g);
        // clipboard in her right hand
        E('path', { d: 'M132,10 Q160,30 158,58', fill: 'none', stroke: SC_INK, 'stroke-width': 6, 'stroke-linecap': 'round' }, g);
        const cb = G(g); tr(cb, 166, 70, 1, 8);
        E('rect', { x: -26, y: -34, width: 52, height: 68, rx: 5, fill: '#9C6B3E', stroke: SC_INK, 'stroke-width': 3 }, cb);
        E('rect', { x: -20, y: -26, width: 40, height: 54, fill: '#FFFFFF' }, cb);
        E('path', { d: 'M-14,-14 h28 M-14,-2 h28 M-14,10 h20', stroke: '#9FB2C2', 'stroke-width': 3 }, cb);
        E('circle', { cx: -158, cy: 58, r: 10, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
        E('path', { d: 'M-132,10 Q-160,30 -158,48', fill: 'none', stroke: SC_INK, 'stroke-width': 6, 'stroke-linecap': 'round' }, g);
      },
      face: { x: 0, y: -4, eye: 11, gap: 30, mouthW: 20, mouthY: 26, lidCol: '#E8C8F0' },
      upd: (t, g, st) => op(lit, (st.lit || 0) * 0.8) }));
  } else if (kind === 'freq') {
    let num = null, last = null, btn = null;
    c = scMake(parent, Object.assign(S, { seed: 22, bob: 2, mood: o.mood || 'neutral',
      draw: g => {
        // legs
        [-36, 36].forEach(x => {
          E('path', { d: `M${x},104 L${x},128`, stroke: SC_INK, 'stroke-width': 6, 'stroke-linecap': 'round' }, g);
          E('path', { d: `M${x - 10},136 L${x - 6},126 L${x + 12},128 L${x + 18},136 Z`, fill: '#2A1A22', stroke: SC_INK, 'stroke-width': 2 }, g);
        });
        // lab-coat collar behind the board
        E('path', { d: 'M-104,60 L-60,112 L0,90 L60,112 L104,60 L104,112 L-104,112 Z', fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
        // the clipboard
        E('rect', { x: -92, y: -112, width: 184, height: 214, rx: 12, fill: '#9C6B3E', stroke: SC_INK, 'stroke-width': 5 }, g);
        E('rect', { x: -78, y: -96, width: 156, height: 186, rx: 4, fill: '#FFFDF6', stroke: '#C9B48A', 'stroke-width': 2 }, g);
        E('rect', { x: -34, y: -124, width: 68, height: 26, rx: 6, fill: '#C9D3DC', stroke: SC_INK, 'stroke-width': 4 }, g);   // clip
        // tally marks (two gates of five)
        let d = '';
        [-60, 0].forEach(x0 => { for (let i = 0; i < 4; i++) d += `M${x0 + i * 10},-84 L${x0 + i * 10},-54 `; d += `M${x0 - 6},-58 L${x0 + 38},-80 `; });
        E('path', { d, stroke: '#2E6FD8', 'stroke-width': 4, 'stroke-linecap': 'round' }, g);
        E('path', { d: 'M52,-84 L52,-54 M62,-84 L62,-54', stroke: '#2E6FD8', 'stroke-width': 4, 'stroke-linecap': 'round' }, g);
        // goggles pushed up on top of the clip
        E('path', { d: 'M-70,-118 L70,-118', stroke: '#2A1A22', 'stroke-width': 6 }, g);
        [-30, 30].forEach(x => E('circle', { cx: x, cy: -126, r: 18, fill: '#BFE6FF', stroke: SC_INK, 'stroke-width': 4 }, g));
        // the tally counter, held out to the right
        E('path', { d: 'M92,40 Q120,48 128,22', fill: 'none', stroke: SC_INK, 'stroke-width': 6, 'stroke-linecap': 'round' }, g);
        const tc = G(g); tr(tc, 140, 0);
        E('rect', { x: -30, y: -30, width: 60, height: 52, rx: 16, fill: '#C9D3DC', stroke: SC_INK, 'stroke-width': 3.5 }, tc);
        btn = E('rect', { x: -9, y: -44, width: 18, height: 16, rx: 4, fill: '#8F9CAB', stroke: SC_INK, 'stroke-width': 3 }, tc);
        E('rect', { x: -22, y: -18, width: 44, height: 24, rx: 4, fill: '#1B2733' }, tc);
        num = T(tc, 0, 1, '0000', { size: 17, weight: 800, anchor: 'middle', fill: '#7CFFB0', font: FD });
        E('circle', { cx: 132, cy: 26, r: 11, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
        E('ellipse', { cx: -48, cy: 52, rx: 11, ry: 7, fill: '#FF8FB0', opacity: 0.45 }, g);
        E('ellipse', { cx: 48, cy: 52, rx: 11, ry: 7, fill: '#FF8FB0', opacity: 0.45 }, g);
      },
      face: { x: 0, y: 6, eye: 15, gap: 52, mouthW: 32, mouthY: 40, lidCol: '#F2ECDA' },
      upd: (t, g, st) => {
        const n = Math.max(0, Math.min(9999, Math.round(st.count || 0)));
        if (n !== last) { setText(num, String(n).padStart(4, '0')); last = n; }
        tr(btn, 0, (st.click || 0) * 6);
      } }));
  } else if (kind === 'banyan') {
    let paths = [];
    c = scMake(parent, Object.assign(S, { seed: 26, bob: 1, mood: o.mood || 'neutral',
      draw: g => {
        // branches: a tree diagram (root at the trunk top, 2 then 2)
        const br = (x1, y1, x2, y2, w) => E('path', { d: `M${x1},${y1} Q${(x1 + x2) / 2},${Math.min(y1, y2) - 10} ${x2},${y2}`, fill: 'none', stroke: '#6B4423', 'stroke-width': w, 'stroke-linecap': 'round' }, g);
        const ends = [[-150, -150], [-60, -170], [60, -170], [150, -150]];
        // highlight paths (under the branches)
        ends.forEach(([x, y], i) => { const mid = i < 2 ? [-100, -110] : [100, -110]; paths.push(E('path', { d: `M0,-40 L${mid[0]},${mid[1]} L${x},${y}`, fill: 'none', stroke: PB.lemon, 'stroke-width': 22, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', opacity: 0 }, g)); });
        br(0, -40, -100, -110, 18); br(0, -40, 100, -110, 18);
        br(-100, -110, -150, -150, 11); br(-100, -110, -60, -170, 11); br(100, -110, 60, -170, 11); br(100, -110, 150, -150, 11);
        // leaf clusters at the four ends and the two forks
        ends.forEach(([x, y]) => { E('circle', { cx: x, cy: y - 10, r: 34, fill: ball('#7EE08A', '#2F8A4A'), stroke: SC_INK, 'stroke-width': 3.5 }, g); });
        [[-100, -110], [100, -110]].forEach(([x, y]) => E('circle', { cx: x, cy: y, r: 16, fill: ball('#7EE08A', '#2F8A4A'), stroke: SC_INK, 'stroke-width': 3 }, g));
        // the trunk with the face
        E('path', { d: 'M-70,130 Q-56,40 -58,-30 Q-30,-56 0,-52 Q30,-56 58,-30 Q56,40 70,130 Z', fill: linGrad('#9C6B3E', '#6B4423', false), stroke: SC_INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, g);
        E('path', { d: 'M-40,100 Q-34,70 -40,40 M36,110 Q30,80 38,50 M-10,118 Q-4,96 -12,80', fill: 'none', stroke: '#5A3A1E', 'stroke-width': 3, 'stroke-linecap': 'round' }, g);
        // aerial roots: a beard
        let d = '';
        for (let i = 0; i < 7; i++) { const x = -36 + i * 12; d += `M${x},40 Q${x + (i % 2 ? 4 : -4)},${70 + (i % 3) * 8} ${x + (i % 2 ? -2 : 2)},${96 + (i % 3) * 10} `; }
        E('path', { d, fill: 'none', stroke: '#C9B48A', 'stroke-width': 4, 'stroke-linecap': 'round' }, g);
        E('path', { d: 'M-50,128 Q-80,132 -96,140 M50,128 Q80,132 96,140', fill: 'none', stroke: '#6B4423', 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
      },
      face: { x: 0, y: -4, eye: 14, gap: 46, mouthW: 26, mouthY: 30, lidCol: '#8A5A30' },
      upd: (t, g, st) => { const k = st.glow === undefined ? -1 : st.glow; paths.forEach((p, i) => op(p, i === Math.round(k) ? 0.85 : 0)); } }));
  } else {
    c = scKavya(parent, o);
  }
  return c;
}

/* ---------- sets ---------- */
function pbFan(parent, s) {
  const g = G(parent); tr(g, 0, 0, s || 1);
  E('line', { x1: 0, y1: -40, x2: 0, y2: 0, stroke: '#8F9CAB', 'stroke-width': 6 }, g);
  const bl = G(g);
  for (let i = 0; i < 3; i++) { const b = G(bl); tr(b, 0, 0, 1, i * 120); E('path', { d: 'M0,-6 Q60,-16 92,-4 Q60,10 0,6 Z', fill: '#F4F7FA', stroke: '#8F9CAB', 'stroke-width': 2.5 }, b); }
  E('circle', { r: 12, fill: '#C9D3DC', stroke: '#8F9CAB', 'stroke-width': 3 }, g);
  g.upd = t => bl.setAttribute('transform', `scale(1 0.3) rotate(${((t * 300) % 360).toFixed(1)})`);
  g.upd(0);
  return g;
}

function pbFlat(parent) {
  const g = G(parent), back = G(g);
  // wall and floor
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#F3E6D0', '#E8D6BA', true) }, back);
  E('rect', { x: 0, y: 0, width: 1200, height: 26, fill: '#FFFFFF', opacity: 0.6 }, back);
  E('rect', { x: 0, y: 610, width: 1200, height: 140, fill: '#C9A27A' }, back);
  E('rect', { x: 0, y: 600, width: 1200, height: 12, fill: '#B08A62' }, back);
  // the window: storm sky, rain
  const W = [90, 110, 380, 320];
  g.win = W;
  E('rect', { x: W[0] - 14, y: W[1] - 14, width: W[2] + 28, height: W[3] + 28, rx: 6, fill: '#FFFFFF', stroke: '#B9A88E', 'stroke-width': 4 }, back);
  const sky = G(back);
  E('rect', { x: W[0], y: W[1], width: W[2], height: W[3], fill: linGrad('#4A5868', '#7C8C9C', true) }, sky);
  // HDB block opposite, through the rain
  E('rect', { x: W[0] + 30, y: W[1] + 120, width: 150, height: 200, fill: '#8C98A4' }, sky);
  E('rect', { x: W[0] + 220, y: W[1] + 160, width: 140, height: 160, fill: '#95A1AC' }, sky);
  let wd = '';
  for (let r = 0; r < 5; r++) for (let k = 0; k < 4; k++) wd += `M${W[0] + 42 + k * 34},${W[1] + 134 + r * 36} h20 v14 h-20 Z `;
  for (let r = 0; r < 4; r++) for (let k = 0; k < 4; k++) wd += `M${W[0] + 232 + k * 32},${W[1] + 174 + r * 34} h18 v13 h-18 Z `;
  E('path', { d: wd, fill: '#B9C8D6' }, sky);
  // clouds
  [[W[0] + 80, W[1] + 50, 70], [W[0] + 200, W[1] + 34, 90], [W[0] + 320, W[1] + 56, 70]].forEach(([x, y, r]) => E('ellipse', { cx: x, cy: y, rx: r, ry: r * 0.45, fill: '#3A4552' }, sky));
  const clipW = _clipUrl(`M${W[0]},${W[1]} h${W[2]} v${W[3]} h${-W[2]} Z`);
  const rainG = G(back, { 'clip-path': clipW });
  const rainP = E('path', { d: '', stroke: '#DCEBF7', 'stroke-width': 2.5, 'stroke-linecap': 'round', opacity: 0.75 }, rainG);
  const r = rng(208), drops = [];
  for (let i = 0; i < 46; i++) drops.push([W[0] + r() * (W[2] + 60), r(), 0.8 + r() * 0.5]);
  const flashW = E('rect', { x: W[0], y: W[1], width: W[2], height: W[3], fill: '#FFFFFF', opacity: 0 }, back);
  const boltW = G(back); tr(boltW, W[0] + 250, W[1] + 110, 1.2); E('path', { d: 'M8,-70 L-22,-6 L-2,-6 L-16,60 L26,-14 L6,-14 L20,-70 Z', fill: '#FFF6A8', stroke: '#FFFFFF', 'stroke-width': 3 }, boltW); op(boltW, 0);
  // window frame bars and sill
  E('path', { d: `M${W[0] + W[2] / 2},${W[1]} V${W[1] + W[3]} M${W[0]},${W[1] + 150} H${W[0] + W[2]}`, stroke: '#FFFFFF', 'stroke-width': 9 }, back);
  E('rect', { x: W[0] - 24, y: W[1] + W[3] + 12, width: W[2] + 48, height: 18, rx: 4, fill: '#FFFFFF', stroke: '#B9A88E', 'stroke-width': 3 }, back);
  // curtains
  E('path', { d: `M${W[0] - 40},${W[1] - 30} Q${W[0] - 10},${W[1] + 140} ${W[0] - 30},${W[1] + W[3] + 40} L${W[0] - 70},${W[1] + W[3] + 40} L${W[0] - 70},${W[1] - 30} Z`, fill: '#5BA89A', stroke: '#3E7A6F', 'stroke-width': 3 }, back);
  E('path', { d: `M${W[0] + W[2] + 40},${W[1] - 30} Q${W[0] + W[2] + 10},${W[1] + 140} ${W[0] + W[2] + 30},${W[1] + W[3] + 40} L${W[0] + W[2] + 70},${W[1] + W[3] + 40} L${W[0] + W[2] + 70},${W[1] - 30} Z`, fill: '#5BA89A', stroke: '#3E7A6F', 'stroke-width': 3 }, back);
  E('rect', { x: W[0] - 80, y: W[1] - 40, width: W[2] + 160, height: 12, rx: 6, fill: '#8C6A48' }, back);
  // shelf of board games (right wall)
  E('rect', { x: 890, y: 150, width: 260, height: 14, fill: '#9C6B3E', stroke: '#6B4423', 'stroke-width': 3 }, back);
  [['#E8424F', 60, 40], ['#3B82F6', 46, 52], ['#FFC93C', 70, 34], ['#2FA36B', 50, 46]].forEach(([col, w, h], i) => {
    const x = 900 + [0, 66, 118, 194][i];
    E('rect', { x, y: 150 - h, width: w, height: h, rx: 3, fill: col, stroke: '#2A1A22', 'stroke-width': 2.5 }, back);
  });
  // wall clock
  const ck = G(back); tr(ck, 760, 110);
  E('circle', { r: 46, fill: '#FFFFFF', stroke: '#5A4A3A', 'stroke-width': 6 }, ck);
  for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; E('line', { x1: Math.sin(a) * 36, y1: -Math.cos(a) * 36, x2: Math.sin(a) * 41, y2: -Math.cos(a) * 41, stroke: '#5A4A3A', 'stroke-width': i % 3 ? 2 : 4 }, ck); }
  const hh = E('line', { x1: 0, y1: 0, x2: 0, y2: -22, stroke: '#2A1A22', 'stroke-width': 5, 'stroke-linecap': 'round' }, ck);
  const mh = E('line', { x1: 0, y1: 0, x2: 0, y2: -34, stroke: '#2A1A22', 'stroke-width': 3, 'stroke-linecap': 'round' }, ck);
  E('circle', { r: 4, fill: '#2A1A22' }, ck);
  g.clock = (h, m) => { tr(hh, 0, 0, 1, ((h % 12) + m / 60) * 30); tr(mh, 0, 0, 1, m * 6); };
  g.clock(8, 0);
  // the sofa behind the characters
  E('rect', { x: 520, y: 350, width: 600, height: 120, rx: 30, fill: '#7A5BA8', stroke: '#4E3A70', 'stroke-width': 4 }, back);
  E('rect', { x: 500, y: 420, width: 640, height: 140, rx: 24, fill: '#8A6BB8', stroke: '#4E3A70', 'stroke-width': 4 }, back);
  [560, 760, 960].forEach(x => E('rect', { x, y: 372, width: 170, height: 80, rx: 22, fill: '#9A7CC8', stroke: '#4E3A70', 'stroke-width': 3 }, back));
  // ceiling fan
  const fan = pbFan(back, 0.8); tr(fan, 600, 40);
  // the leak and the pail (the drip gag)
  E('path', { d: 'M1120,0 Q1132,14 1144,0 Z', fill: '#B9A88E' }, back);
  const drop = E('path', { d: 'M0,-12 Q7,0 0,6 Q-7,0 0,-12 Z', fill: '#7FC4F5', stroke: '#3E7AA8', 'stroke-width': 1.5 }, back);
  const pail = G(back); tr(pail, 1132, 700);
  E('path', { d: 'M-40,-60 L40,-60 L32,0 L-32,0 Z', fill: '#E8424F', stroke: '#8E1B26', 'stroke-width': 4, 'stroke-linejoin': 'round' }, pail);
  E('ellipse', { cx: 0, cy: -60, rx: 40, ry: 9, fill: '#5A9AD0', stroke: '#8E1B26', 'stroke-width': 3 }, pail);
  E('path', { d: 'M-38,-60 Q0,-112 38,-60', fill: 'none', stroke: '#5A6670', 'stroke-width': 3 }, pail);
  const ring = E('ellipse', { cx: 0, cy: -60, rx: 10, ry: 3, fill: 'none', stroke: '#FFFFFF', 'stroke-width': 2 }, pail);
  // room flash (lightning)
  const flashR = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#DDEBFF', opacity: 0 }, g);
  // characters
  g.mid = G(g);
  // the coffee table
  const front = G(g);
  E('rect', { x: 150, y: 548, width: 900, height: 22, rx: 8, fill: '#B98352', stroke: '#6B4423', 'stroke-width': 4 }, front);
  E('rect', { x: 166, y: 570, width: 868, height: 120, fill: linGrad('#A0703F', '#7A5230', true), stroke: '#6B4423', 'stroke-width': 4 }, front);
  E('rect', { x: 186, y: 590, width: 400, height: 80, rx: 6, fill: 'none', stroke: '#C99A68', 'stroke-width': 3 }, front);
  E('rect', { x: 614, y: 590, width: 400, height: 80, rx: 6, fill: 'none', stroke: '#C99A68', 'stroke-width': 3 }, front);
  E('circle', { cx: 386, cy: 630, r: 7, fill: '#E2B33C', stroke: '#6B4423', 'stroke-width': 2 }, front);
  E('circle', { cx: 814, cy: 630, r: 7, fill: '#E2B33C', stroke: '#6B4423', 'stroke-width': 2 }, front);
  g.front = front;
  g.top = G(g);
  g.tableY = 556;
  g.upd = (t, rain) => {
    rain = rain === undefined ? 1 : rain;
    fan.upd(t);
    let d = '';
    if (rain > 0) drops.forEach(([x, ph, sp]) => { const f = (ph + t * sp * 1.6) % 1, y = W[1] - 30 + f * (W[3] + 60), xx = x - f * 40; d += `M${xx.toFixed(1)},${y.toFixed(1)} l-8,${(26 * rain).toFixed(1)} `; });
    rainP.setAttribute('d', d);
    // the drip: a drop every 1.4 s
    const f = (t % 1.4) / 1.4;
    tr(drop, 1132, lerp(10, 634, f * f)); op(drop, f < 0.98 ? 1 : 0);
    const rf = ((t + 0.03) % 1.4) / 1.4;
    attr(ring, 'rx', 6 + rf * 26); op(ring, 1 - rf);
  };
  g.flash = p => { op(flashW, p * 0.9); op(boltW, p > 0.3 ? p : 0); op(flashR, p * 0.35); };
  g.flash(0);
  g.upd(0);
  return g;
}

function pbTableTop(parent) {
  const g = G(parent);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: PB.wood }, g);
  let pl = '';
  for (let y = 0; y < 750; y += 94) pl += `M0,${y} H1200 `;
  E('path', { d: pl, stroke: PB.woodDk, 'stroke-width': 4, opacity: 0.6 }, g);
  const r = rng(31);
  let grain = '';
  for (let i = 0; i < 26; i++) { const y = r() * 750, x = r() * 1100; grain += `M${x.toFixed(0)},${y.toFixed(0)} q60,-8 120,0 `; }
  E('path', { d: grain, fill: 'none', stroke: '#8A5E34', 'stroke-width': 3, opacity: 0.5 }, g);
  g.mat = [110, 120, 980, 540];
  E('rect', { x: 110, y: 120, width: 980, height: 540, rx: 24, fill: PB.felt, stroke: PB.feltDk, 'stroke-width': 8 }, g);
  E('rect', { x: 126, y: 136, width: 948, height: 508, rx: 18, fill: 'none', stroke: '#2E8A5E', 'stroke-width': 3, 'stroke-dasharray': '10 8' }, g);
  return g;
}

function pbBox(parent) {
  const g = G(parent);
  const glowE = E('ellipse', { cx: 0, cy: -150, rx: 200, ry: 110, fill: glow('#FFE45C'), opacity: 0 }, g);
  E('path', { d: 'M-150,-120 L150,-120 L140,0 L-140,0 Z', fill: '#C9A26A', stroke: '#6B4A28', 'stroke-width': 5, 'stroke-linejoin': 'round' }, g);
  E('path', { d: 'M-120,-90 L-60,-30 M90,-110 L120,-70 M-30,-20 L20,-60', stroke: '#A8844E', 'stroke-width': 3 }, g);   // scuffs
  E('rect', { x: -108, y: -96, width: 216, height: 60, rx: 6, fill: '#FFF8E8', stroke: '#6B4A28', 'stroke-width': 3 }, g);
  T(g, 0, -64, "MR TAN'S GAMES", { size: 23, weight: 800, anchor: 'middle', fill: '#C62828' });
  T(g, 0, -42, 'est. 1987', { size: 18, weight: 700, anchor: 'middle', fill: '#6B4A28', font: FB });
  E('rect', { x: -40, y: -24, width: 80, height: 14, fill: '#E9DFC8', opacity: 0.8 }, g);   // tape
  const lid = G(g);
  E('path', { d: 'M-160,-136 L160,-136 L156,-112 L-156,-112 Z', fill: '#B58E58', stroke: '#6B4A28', 'stroke-width': 5, 'stroke-linejoin': 'round' }, lid);
  g.open = p => { p = clamp(p); tr(lid, -150 * p * 0.2, -60 * p, 1, -28 * p); op(glowE, p * 0.9); };
  g.open(0);
  return g;
}

function pbRoseCall(parent, w, h, label) {
  const g = scVideoCall(parent, w, h, label || 'Auntie Rose · Blk 208');
  const bg = G(g.screen), sx = w / 600, sy = h / 400, inner = G(bg);
  inner.setAttribute('transform', `scale(${sx.toFixed(3)} ${sy.toFixed(3)})`);
  E('rect', { x: -300, y: -200, width: 600, height: 400, fill: '#2A3640' }, inner);
  E('rect', { x: -300, y: -200, width: 600, height: 56, fill: '#B5281E' }, inner);
  T(inner, 0, -160, "ROSE'S KITCHEN", { size: 34, weight: 800, anchor: 'middle', fill: '#FFE45C' });
  E('rect', { x: -300, y: -144, width: 600, height: 230, fill: '#EAF4EE' }, inner);
  // stacked takeaway boxes
  for (let i = 0; i < 6; i++) { const x = 150 + (i % 2) * 70, y = 40 - Math.floor(i / 2) * 44; E('rect', { x, y, width: 64, height: 40, rx: 4, fill: '#FFFFFF', stroke: '#9AA6B2', 'stroke-width': 3 }, inner); }
  // rain beyond the stall
  let d = ''; const r = rng(77);
  for (let i = 0; i < 40; i++) { const x = -300 + r() * 600, y = 90 + r() * 110; d += `M${x.toFixed(0)},${y.toFixed(0)} l-6,18 `; }
  E('rect', { x: -300, y: 86, width: 600, height: 114, fill: '#55606C' }, inner);
  E('path', { d, stroke: '#CFE0EE', 'stroke-width': 2.5 }, inner);
  const holder = G(g.screen); tr(holder, -w * 0.12, h * 0.2);
  g.rose = cast(holder, 'rose', { s: h / 250, prop: null });
  return g;
}

function pbTrack(parent, o) {
  o = o || {};
  const len = o.len || 8, cell = o.cell || 56, rowH = o.rowH || 40, g = G(parent), labW = 56;
  const W = labW + len * cell + 70, H = 12 * rowH;
  E('rect', { x: -14, y: -14, width: W + 28, height: H + 28, rx: 16, fill: '#FFFDF6', stroke: '#8FA3B8', 'stroke-width': 5 }, g);
  const hls = [], horses = [];
  for (let i = 0; i < 12; i++) {
    const y = i * rowH;
    const hl = E('rect', { x: -6, y: y + 2, width: W + 12, height: rowH - 4, rx: 8, fill: PB.lemon, opacity: 0 }, g);
    hls.push(hl);
    T(g, labW / 2, y + rowH / 2 + 10, String(i + 1), { size: 28, weight: 800, anchor: 'middle', fill: MK.ink });
    let d = '';
    for (let k = 0; k <= len; k++) d += `M${labW + k * cell},${y + 4} V${y + rowH - 4} `;
    E('path', { d: d + `M${labW},${y + rowH / 2} H${labW + len * cell}`, stroke: '#C9D3DC', 'stroke-width': 2 }, g);
    const h = G(g);
    E('circle', { r: rowH * 0.36, fill: MK_COLS[i % 8], stroke: MK.ink, 'stroke-width': 3 }, h);
    E('path', { d: 'M-6,-4 L0,-12 L6,-4', fill: 'none', stroke: MK.ink, 'stroke-width': 2.5, 'stroke-linecap': 'round' }, h);   // ears: a horse counter
    horses.push(h);
  }
  E('rect', { x: labW + len * cell + 4, y: 0, width: 14, height: H, fill: '#2A1A22' }, g);   // finish line
  for (let k = 0; k < 12; k++) E('rect', { x: labW + len * cell + 4 + (k % 2) * 7, y: k * rowH, width: 7, height: rowH / 2, fill: '#FFFFFF' }, g);
  T(g, labW + len * cell + 48, -24, 'FINISH', { size: 22, weight: 800, anchor: 'middle', fill: MK.ink });
  g.rowH = rowH; g.W = W; g.H = H; g.cell = cell;
  g.y = i => i * rowH + rowH / 2;
  g.set = (i, pos) => tr(horses[i], labW + cell / 2 + Math.max(0, pos) * cell - (pos <= 0 ? cell * 0.0 : 0), i * rowH + rowH / 2);
  g.hl = (i, p) => op(hls[i], p * 0.7);
  for (let i = 0; i < 12; i++) g.set(i, 0);
  return g;
}

/* ---------- props ---------- */
function pbSweet(parent, col, s) {
  const g = G(parent); tr(g, 0, 0, s || 1);
  E('path', { d: 'M-18,0 L-30,-12 L-30,12 Z M18,0 L30,-12 L30,12 Z', fill: col, stroke: SC_INK, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, g);
  E('ellipse', { rx: 20, ry: 15, fill: col, stroke: SC_INK, 'stroke-width': 3 }, g);
  E('ellipse', { cx: -6, cy: -6, rx: 6, ry: 3.5, fill: '#FFFFFF', opacity: 0.55 }, g);
  return g;
}

function pbBag(parent, o) {
  o = o || {};
  const nr = o.red || 0, nb = o.blue || 0, g = G(parent);
  E('path', { d: 'M-90,-210 L90,-210 L96,-10 Q96,0 86,0 L-86,0 Q-96,0 -96,-10 Z', fill: 'rgba(230,245,255,0.35)', stroke: '#7D8A96', 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
  const all = [], r = rng(40 + nr * 7 + nb);
  const cols = []; for (let i = 0; i < nr; i++) cols.push(PB.red); for (let i = 0; i < nb; i++) cols.push(PB.blue);
  // shuffle deterministically
  for (let i = cols.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [cols[i], cols[j]] = [cols[j], cols[i]]; }
  const perRow = 4;
  const rings = G(g);
  cols.forEach((col, i) => {
    const row = Math.floor(i / perRow), k = i % perRow, x = -56 + k * 34 + (row % 2) * 12, y = -24 - row * 28;
    const sw = pbSweet(g, col, 0.7); tr(sw, x, y, 0.7, (r() - 0.5) * 50);
    if (col === PB.red) E('circle', { cx: x, cy: y, r: 19, fill: 'none', stroke: PB.gold, 'stroke-width': 4 }, rings);
    all.push(sw);
  });
  g.appendChild(rings);
  op(rings, 0);
  E('path', { d: 'M-90,-210 Q0,-230 90,-210 L84,-240 Q0,-256 -84,-240 Z', fill: '#FFFFFF', stroke: '#7D8A96', 'stroke-width': 3 }, g);   // twist
  const lb = G(g); tr(lb, 0, -246);
  E('rect', { x: -40, y: -34, width: 80, height: 50, rx: 8, fill: '#FFFDF6', stroke: SC_INK, 'stroke-width': 3 }, lb);
  T(lb, 0, 6, o.label || 'A', { size: 36, weight: 800, anchor: 'middle', fill: MK.ink });
  g.hl = p => op(rings, p);
  g.sweets = all;
  return g;
}

function pbStamp(parent, ok) { return mkStamp(parent, ok ? 'SURE THING' : 'NO CHANCE', ok ? '#1E9E5A' : '#D32F2F'); }

function pbForecast(parent, o) {
  o = o || {};
  const g = G(parent);
  E('rect', { x: -130, y: -220, width: 260, height: 440, rx: 30, fill: '#1B2733', stroke: SC_INK, 'stroke-width': 5 }, g);
  E('rect', { x: -114, y: -196, width: 228, height: 392, rx: 14, fill: linGrad('#3A5878', '#5E7E9E', true) }, g);
  T(g, 0, -158, o.day || 'SATURDAY', { size: 26, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  // storm cloud
  const cl = G(g); tr(cl, 0, -70);
  [[-36, 0, 34], [0, -16, 40], [36, 0, 32], [0, 10, 40]].forEach(([x, y, r]) => E('circle', { cx: x, cy: y, r, fill: '#C9D3DC', stroke: '#5A6670', 'stroke-width': 3 }, cl));
  const bt = G(cl); tr(bt, 4, 52, 0.7);
  E('path', { d: 'M8,-50 L-26,6 L-4,6 L-12,50 L26,-8 L4,-8 Z', fill: PB.lemon, stroke: '#B8860B', 'stroke-width': 3, 'stroke-linejoin': 'round' }, bt);
  T(g, 0, 96, o.pct || '70%', { size: 78, weight: 800, anchor: 'middle', fill: PB.lemon });
  T(g, 0, 142, o.text || 'Thunderstorms', { size: 28, weight: 700, anchor: 'middle', fill: '#FFFFFF', font: FB });
  g.flash = p => op(bt, 0.35 + 0.65 * clamp(p));
  return g;
}

function pbToto(parent) {
  const g = G(parent);
  E('rect', { x: -150, y: -75, width: 300, height: 150, rx: 8, fill: '#FFFDF6', stroke: '#7D8A96', 'stroke-width': 3 }, g);
  E('rect', { x: -150, y: -75, width: 300, height: 38, rx: 8, fill: '#1E7A46' }, g);
  T(g, 0, -47, 'TOTO', { size: 28, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 4 });
  [7, 12, 21, 28, 36, 44].forEach((n, i) => {
    const x = -112 + i * 45;
    E('circle', { cx: x, cy: 10, r: 19, fill: 'none', stroke: '#C62828', 'stroke-width': 3 }, g);
    T(g, x, 18, String(n), { size: 22, weight: 800, anchor: 'middle', fill: MK.ink });
  });
  T(g, 0, 60, '6 numbers from 1 to 49', { size: 18, weight: 700, anchor: 'middle', fill: '#5A6670', font: FB });
  return g;
}

function pbCap(parent) {
  const g = G(parent), up = G(g), dn = G(g);
  // top up: the flat lid with ridges
  E('ellipse', { cx: 0, cy: 10, rx: 46, ry: 16, fill: '#C62828', stroke: SC_INK, 'stroke-width': 3 }, up);
  E('rect', { x: -46, y: -10, width: 92, height: 20, fill: '#D93636' }, up);
  E('path', { d: 'M-46,-10 V10 M46,-10 V10', stroke: SC_INK, 'stroke-width': 3 }, up);
  E('ellipse', { cx: 0, cy: -10, rx: 46, ry: 16, fill: '#F04A4A', stroke: SC_INK, 'stroke-width': 3 }, up);
  E('ellipse', { cx: -14, cy: -14, rx: 12, ry: 4, fill: '#FFFFFF', opacity: 0.5 }, up);
  // top down: the open rim showing the inside
  E('ellipse', { cx: 0, cy: 10, rx: 46, ry: 16, fill: '#C62828', stroke: SC_INK, 'stroke-width': 3 }, dn);
  E('rect', { x: -46, y: -10, width: 92, height: 20, fill: '#D93636' }, dn);
  E('path', { d: 'M-46,-10 V10 M46,-10 V10', stroke: SC_INK, 'stroke-width': 3 }, dn);
  E('ellipse', { cx: 0, cy: -10, rx: 46, ry: 16, fill: '#7A1414', stroke: SC_INK, 'stroke-width': 3 }, dn);
  E('ellipse', { cx: 0, cy: -8, rx: 36, ry: 11, fill: '#E9EEF3' }, dn);
  g.set = u => { op(up, u >= 0.5 ? 1 : 0); op(dn, u >= 0.5 ? 0 : 1); };
  g.set(1);
  return g;
}

function pbCup(parent) {
  const g = G(parent), inner = G(g);
  E('path', { d: 'M-34,-110 L34,-110 L26,0 L-26,0 Z', fill: '#FFFFFF', stroke: '#7D8A96', 'stroke-width': 4, 'stroke-linejoin': 'round' }, inner);
  E('path', { d: 'M-31,-80 L31,-80 L29,-56 L-29,-56 Z', fill: '#FF8FC8' }, inner);
  E('ellipse', { cx: 0, cy: -110, rx: 34, ry: 8, fill: '#E9EEF3', stroke: '#7D8A96', 'stroke-width': 3 }, inner);
  g.set = side => tr(inner, 0, 0, 1, -90 * clamp(side));
  return g;
}

function pbBolt(parent, s) {
  const g = G(parent); tr(g, 0, 0, s || 1);
  E('path', { d: 'M8,-50 L-26,6 L-4,6 L-12,50 L26,-8 L4,-8 Z', fill: PB.lemon, stroke: '#B8860B', 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
  return g;
}
