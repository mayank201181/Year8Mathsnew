/* LOST IN CONVERSION (Claude Sitcom Ep 8, Measures, Units & Rates): the cast, sets and props of this episode.
   Bundled after engine lib.js, kit.js, mathkit.js and sitcom.js (scMake, scTalk, scKavya, scCastHuman, scHuman,
   scConfessional, scLowerThird, scVideoCall, mk* maths kit). Every top-level name starts with `lc` (or `LC_`),
   except `cast`.

   Characters: cast(parent, kind, o) -> g, origin at the character's centre, about 200-300 px tall at s = 1
     o: { s (scale), mood (default mood), ... }   (humans: any scHuman option overrides, e.g. prop, lift, style)
     g.set({ t, talk, mood, look, sweat, still, ... })   call every frame
       talk 0..1 (use scTalk(S, t, who)); mood: neutral | happy | smug | annoyed | sad | shock | deadpan
       look -1..1 pupils left/right; still: true stops the idle bob
     HUMANS (busts: the bottom of the shirt is at y = 140, so put them behind a table, seat or the frame edge):
       'kavya' (kavya)  Kavya, 12 (scKavya, PE shirt "8")
       'mum'   (mum)    Mum: magenta kurta, bun, bindi. Default prop: a paper (the packing list / boarding passes)
       'dad'   (dad)    Dad: glasses, moustache, green polo. Default prop: his phone (the weather app)
       'boy'   (boy)    Ah Boy, 8: orange star tee. Default: an empty hand (lift: 1 raises it)
       'raj'   (raj)    UNCLE RAJ, Mum's cousin in London (new human): grey beard, round glasses, tweed-green
                        collared shirt; default prop a mug of tea. At the wedding pass { style: 'kurta',
                        shirt: '#F3E3C3', trim: '#E2B33C', prop: null }.
       'siti'  (siti)   OFFICER SITI, Changi security (new human, one scene): navy tudung, navy uniform shirt.
       Pass { prop: null } for no prop; { body: true } for a full body (scHumanBody, feet at 0,0; pose API).
     CARTOONS (scMake):
       'metre'   (metre)   MONSIEUR MÈTRE, the METRE: a yellow wooden metre rule (cm ticks, hinges, "1 m" at
                           the bottom) with a black beret and tricolour cockade, a thin curled moustache, little
                           arms and legs. Pompous, Parisian, born 1791. Default mood smug.
                           Extra: { point: 0..1 } raises his right arm and points (viewer's right);
                           { faint: 0..1 } tips him over backwards (rotate yourself with tr if you prefer).
       'miles'   (miles)   SIR MILES, an IMPERIAL MILESTONE: a grey roadside stone engraved "1 MILE" and
                           "≈ 1.6 km", a black bowler hat, a white walrus moustache, an umbrella on his arm.
                           Old, slow, vague ("give or take"). Default mood happy.
       'lita'    (lita)    LITA, the LITRE CUBE: a see-through blue 10 cm cube with a 10 × 10 grid on her front,
                           water inside, little arms and legs. Bubbly. Extra: { level: 0..1 } water level
                           (default 0.75); { grid: 0..1 } brightens the grid (for "100 little squares").
       'flip'    (flip)    FLIP, a SPLIT-FLAP DEPARTURES BOARD: a black board with eyes and a mouth and an 8-tile
                           yellow display. Fast, clacky. Extra: { text: 'string' } shows up to 8 characters
                           (centred); { flap: 0..1 } while < 1 the tiles shuffle (clack clack).
       'trish'   (trish)   TRISH, the DST TRIANGLE: a coral triangle split into three compartments with big
                           letters (top, bottom-left, bottom-right), a face in the top compartment, a bow.
                           Extra: { letters: ['D','S','T'] } (cheap to change: ['M','D','V'], ['F','P','A']);
                           { cover: 0|1|2, coverP: 0..1 } slides a yellow hand over that letter ("cover what you want").
       'martian' (martian) A small green MARTIAN with antennae (stinger only).

   Shots
     lcConf(parent, who)             confessional background tinted for that character (scConfessional); g.set(p, t)
     LC_TINT                         the confessional colours per character
     lcLowerThird(parent, who)       scLowerThird with this episode's name and role for `who` (LC_LT); g.set(p)

   Sets (full stage 1200 x 750; each returns g with layers g.mid (characters), g.front (drawn over them) and
   g.top (props standing on the front surface, drawn last); g.upd(t) animates, where noted)
     lcFlat(parent)        the family's HDB living room at 10 p.m.: window with the night blocks, curtains, a wall
                           clock at 10:00, a JUNE calendar, a shelf. Front: the dining table covered in packing
                           (top at g.counterY = 540).
     lcAirport(parent, o)  an airport hall: glass wall, planes outside, ceiling lights, a yellow-on-black gate sign
                           (g.sign, text o.sign, default 'Gate C  →'), indoor palms. o.day (Heathrow morning
                           instead of night), o.title (banner text on the glass, default 'CHANGI AIRPORT'),
                           o.front: 'belt' (security X-ray conveyor, tray), 'counter' (check-in counter with a
                           luggage-scale display g.scale: g.scale.set(text)), 'rail' (glass rail, default).
                           Front top at g.counterY = 530. g.upd(t) moves the belt.
     lcCabin(parent, o)    the plane cabin, facing the passengers: curved walls, oval windows (night sky, or day with
                           o.day), overhead bins, three tall seat backs at g.seats = [x...] (behind g.mid); front:
                           armrests and tray tables (top at g.counterY = 548). g.screen: a seat-back screen group at
                           top right is NOT drawn: use lcFlightMap.
     lcCar(parent)         Uncle Raj's car from the bonnet: windscreen frame, steering wheel on the viewer's LEFT
                           (UK, right-hand drive), front seats at g.frontX = [330, 860] (busts at y 470, s 1),
                           back seats at g.backX = [500, 700] (busts at y 430, s 0.72) in g.back (behind g.mid).
                           Outside: sky, fields and a hedge that scrolls: g.upd(t, speed 0..1).
     lcShop(parent, o)     a shop: o.kind 'grocer' (London supermarket: RICE and JUICE shelves, £ shelf-edge strips)
                           or 'souvenir' (snow globes, mugs, Big Ben models, a window with Big Ben). Shelves at
                           g.shelves = [y...] (top of each shelf). Front: the checkout / shop counter (g.counterY 560: busts at y ≈ 430).
     lcHouse(parent)       Uncle Raj's kitchen: floral wallpaper, rainy window onto the garden, teapot, shelf;
                           front: the pine kitchen table (top at g.counterY = 540).
     lcGarden(parent)      the wedding on Uncle Raj's hectare of lawn: English house, white marquee with bunting,
                           a marigold arch, fairy lights. Lawn from y 470 down (g.lawnY). Front: a low box hedge
                           across the bottom (top at y 610, g.counterY: busts at y ≈ 470). g.upd(t) twinkles the lights.
     lcMars(parent)        THE RUNNING GAG. A full-stage cutaway: red Mars, stars, banner "MEANWHILE, ON MARS",
                           a little spacecraft that falls and crashes (POUF), and the counter "SPACECRAFT LOST: n".
                           g.set(p, n): p 0..1 through the gag (0-0.62 falling, then the crash puff), n the count.
                           Earlier wrecks (n - 1 of them) lie on the ground. g.ground = y of the ground at x 700.

   Props (around their own origin)
     lcSuitcase(parent, o)   wheeled suitcase, base centre at (0,0), about 200 tall. o: { col, w (150), h (190),
                             tag (luggage-tag text; '' for none), s }. g.tag (the tag group, or null)
     lcTag(parent, text, o)  luggage tag on a loop, origin = the loop. o: { size (30), col }. g.label (setText it)
     lcBottle(parent, o)     shampoo bottle, base centre at (0,0), about 150 tall. o: { label ('0.25 l'), col, s }
     lcWaySign(parent, rows, o)  airport wayfinding sign (yellow on black), origin top-centre.
                             rows: [[text, arrow ('←' '→' '↑' or '')], ...]; o: { w (440), size (32) }.
                             g.hl(i, p) highlights row i (a gold frame)
     lcFlightMap(parent, o)  in-flight map screen, centred, 560 x 330: SIN to LHR arc, a plane, readouts.
                             g.set({ p (0..1 along the route), rows: [[label, value], ...] (up to 3) })
     lcRoadSign(parent, rows, o)  UK motorway sign (blue, white text), origin top-centre. rows [[place, miles]];
                             o: { w (420), title (e.g. 'M4') }
     lcPhone(parent, o)      a big phone showing a weather app, centred, 220 x 400. g.set({ temp ('50°'), unit
                             ('°F' | '°C' | ''), city ('London'), p (unit glow 0..1) })
     lcRosette(parent)       Dad's gold rosette with a big green tick (his "Trust me, I did the maths" award), centred,
                             about 130 tall (the running gag: it pops on as he says it and falls off when he's wrong).
                             g.set(p, fall): p pops it on; fall 0..1 drops and spins it away.
*/

/* ---------- confessional tints, lower thirds ---------- */
const LC_TINT = {
  metre: ['#14223A', '#2A4F7A'], miles: ['#262A2E', '#4A535B'], lita: ['#0E2A3A', '#1E5A7A'], flip: ['#141418', '#2E3440'],
  trish: ['#3A1420', '#6E2A3C'], martian: ['#3A140E', '#6E2A1A'], kavya: ['#14243A', '#25446B'], mum: ['#3A1030', '#6B1E58'],
  dad: ['#123026', '#245A48'], boy: ['#3A2410', '#6B4414'], raj: ['#1E2A1A', '#3E5A34'], siti: ['#141E3A', '#28346B'],
};
function lcConf(parent, who) { const c = LC_TINT[who] || LC_TINT.metre; return scConfessional(parent, c[0], c[1]); }
const LC_LT = {
  metre: ['MONSIEUR MÈTRE', 'The metre. Paris, 1791.'],
  miles: ['SIR MILES', 'One mile. About 1.6 km. Give or take.'],
  lita: ['LITA', 'One litre. 10 cm each way.'],
  flip: ['FLIP', 'Departures board. 24-hour clock.'],
  trish: ['TRISH', 'The DST triangle. Many letters.'],
  martian: ['A MARTIAN', 'Mars. Minus sixty.'],
  kavya: ['KAVYA, 12', 'Packed. Units checked.'],
  mum: ['MUM', "Kavya's mum. Has the list."],
  dad: ['DAD', '"Trust me, I did the maths."'],
  boy: ['AH BOY, 8', '"Are we there yet?"'],
  raj: ['UNCLE RAJ', "Mum's cousin. London. Imperial."],
  siti: ['OFFICER SITI', 'Changi Airport security'],
};
function lcLowerThird(parent, who) { const l = LC_LT[who] || [String(who).toUpperCase(), '']; return scLowerThird(parent, l[0], l[1]); }

/* ---------- the cast ---------- */
const LC_PROP = { mum: 'paper', dad: 'phone', boy: null, priya: 'pencil', tan: 'kopi', rose: 'phone' };
const LC_RAJ = { name: 'UNCLE RAJ', role: "Mum's cousin", age: 'adult', skin: SC_SKIN.brown, hair: 'short', hairCol: SC_HAIR.salt,
  beard: 'full', beardCol: '#8E8A88', glasses: '#5A3A22', frames: 'round', style: 'collared', shirt: '#6E8B5A', seed: 31,
  prop: 'mug', propCol: '#2E4C8C', bottoms: 'trousers', bottomCol: '#5A4A3A', frame: 'broad' };
const LC_SITI = { name: 'OFFICER SITI', role: 'Changi security', age: 'adult', skin: SC_SKIN.golden, hair: 'tudung', hairCol: '#22305A',
  style: 'collared', shirt: '#2E3E5C', seed: 37, bottoms: 'trousers', bottomCol: '#22283A' };
function cast(parent, kind, o) {
  o = o || {};
  if (kind === 'kavya') return scKavya(parent, o);
  if (kind === 'raj' || kind === 'siti') {
    const base = kind === 'raj' ? LC_RAJ : LC_SITI;
    const p = Object.assign({}, base, o);
    const g = p.body ? scHumanBody(parent, p) : scHuman(parent, p);
    g.who = kind; g.name = base.name; g.role = base.role;
    return g;
  }
  if (SC_HUMANS[kind]) {
    const p = Object.assign({}, kind === 'boy' ? { hand: true } : { prop: LC_PROP[kind] }, o);
    return scCastHuman(parent, kind, p);
  }
  const S = { s: o.s, mood: o.mood };
  let c;
  if (kind === 'metre') {
    let armR = null, inner = null;
    c = scMake(parent, Object.assign(S, { seed: 4, bob: 3, mood: o.mood || 'smug',
      draw: g => {
        // legs and black shoes
        [-22, 22].forEach(x => {
          E('path', { d: `M${x},140 L${x},176`, stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
          E('path', { d: `M${x - 6},184 Q${x - 6},172 ${x + 8},172 L${x + 22},176 Q${x + 26},186 ${x + 16},186 Z`, fill: '#1E1E24', stroke: SC_INK, 'stroke-width': 3 }, g);
        });
        // left arm: hand on hip
        E('path', { d: 'M-46,10 Q-86,28 -60,58', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
        E('circle', { cx: -58, cy: 58, r: 10, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
        // right arm (animated: hangs, or points up and out)
        armR = G(g); tr(armR, 46, 8);
        E('path', { d: 'M0,0 Q34,8 46,34', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, armR);
        E('circle', { cx: 48, cy: 38, r: 10, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, armR);
        // the folding rule body: three hinged segments
        E('rect', { x: -48, y: -148, width: 96, height: 292, rx: 12, fill: linGrad('#FFE27A', '#F2B632', false), stroke: SC_INK, 'stroke-width': 5 }, g);
        let tk = '';
        for (let i = 0; i <= 28; i++) { const y = -136 + i * 10, L = i % 5 === 0 ? 20 : 11; tk += `M-48,${y} h${L} M48,${y} h${-L} `; }
        E('path', { d: tk, stroke: '#5A3A10', 'stroke-width': 2.5 }, g);
        [-50, 50].forEach(y => { E('line', { x1: -48, y1: y, x2: 48, y2: y, stroke: '#8A5A12', 'stroke-width': 3 }, g); E('circle', { cx: 0, cy: y, r: 7, fill: '#C9D3DC', stroke: SC_INK, 'stroke-width': 2.5 }, g); });
        T(g, 0, 118, '1 m', { size: 30, weight: 800, anchor: 'middle', fill: '#8A1E1E' });
        // beret with a stalk and a tricolour cockade
        const ber = G(g); tr(ber, -6, -150, 1, -8);
        E('path', { d: 'M-60,6 Q-62,-30 4,-34 Q66,-30 62,4 Q0,18 -60,6 Z', fill: '#1E1E28', stroke: SC_INK, 'stroke-width': 3 }, ber);
        E('path', { d: 'M2,-34 L4,-46', stroke: '#1E1E28', 'stroke-width': 6, 'stroke-linecap': 'round' }, ber);
        const ck = G(ber); tr(ck, 40, -10);
        E('circle', { r: 13, fill: '#E8424F', stroke: SC_INK, 'stroke-width': 2 }, ck);
        E('circle', { r: 8.5, fill: '#FFFFFF' }, ck); E('circle', { r: 4.5, fill: '#2E4C9C' }, ck);
        // blush
        E('ellipse', { cx: -30, cy: -64, rx: 9, ry: 5, fill: '#FF8FB0', opacity: 0.5 }, g);
        E('ellipse', { cx: 30, cy: -64, rx: 9, ry: 5, fill: '#FF8FB0', opacity: 0.5 }, g);
      },
      face: { x: 0, y: -96, eye: 13, gap: 40, mouthW: 24, mouthY: 40, lidCol: '#F2C24A' },
      upd: (t, g, st) => {
        const p = clamp(st.point || 0);
        tr(armR, 46, 8, 1, lerp(0, -112, p));
        const f = clamp(st.faint || 0);
        if (f > 0) g.setAttribute('transform', `translate(0 ${(20 * f * f).toFixed(1)}) rotate(${(-80 * f).toFixed(1)} 0 180)`);
      } }));
    inner = c.firstChild;
    const mo = G(inner); tr(mo, 0, -66);   // thin curled moustache over the mouth corners
    E('path', { d: 'M0,-2 C-8,-8 -22,-8 -28,0 C-32,6 -38,6 -40,0 C-36,10 -26,8 -18,4 C-10,2 -4,2 0,2 C4,2 10,2 18,4 C26,8 36,10 40,0 C38,6 32,6 28,0 C22,-8 8,-8 0,-2 Z', fill: '#2A1A12', stroke: SC_INK, 'stroke-width': 1.5 }, mo);
  } else if (kind === 'miles') {
    c = scMake(parent, Object.assign(S, { seed: 9, bob: 1.5, mood: o.mood || 'happy',
      draw: g => {
        // grass tuft at the base
        E('path', { d: 'M-110,150 Q-96,124 -84,150 Q-70,120 -56,150 L60,150 Q72,122 84,150 Q98,126 110,150 Z', fill: '#5BBF6A', stroke: '#2F7A3A', 'stroke-width': 3 }, g);
        // arms
        E('path', { d: 'M-80,20 Q-112,40 -100,76', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
        E('circle', { cx: -100, cy: 80, r: 10, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
        // the umbrella, hooked on his right arm
        const um = G(g); tr(um, 106, 40, 1, 8);
        E('path', { d: 'M0,-60 L0,96', stroke: '#2A2A30', 'stroke-width': 6 }, um);
        E('path', { d: 'M0,-60 Q-16,-60 -16,-46', fill: 'none', stroke: '#6B4423', 'stroke-width': 6, 'stroke-linecap': 'round' }, um);
        E('path', { d: 'M-10,-40 Q0,-50 10,-40 L14,80 Q0,92 -14,80 Z', fill: '#2A2A30', stroke: SC_INK, 'stroke-width': 3 }, um);
        E('path', { d: 'M80,20 Q110,26 104,-6', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
        E('circle', { cx: 102, cy: -10, r: 10, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
        // the stone
        E('path', { d: 'M-82,148 L-82,-56 Q-82,-142 0,-142 Q82,-142 82,-56 L82,148 Z', fill: linGrad('#C9CCD0', '#8F969E', false), stroke: SC_INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, g);
        E('path', { d: 'M-60,-80 Q-50,-120 -6,-124', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 5, opacity: 0.35, 'stroke-linecap': 'round' }, g);
        // moss and an engraved panel
        E('path', { d: 'M-82,120 Q-60,106 -40,124 Q-20,112 -4,130 L-4,148 L-82,148 Z', fill: '#7FA65A', opacity: 0.7 }, g);
        E('rect', { x: -66, y: 22, width: 132, height: 88, rx: 8, fill: '#A9AEB4', stroke: '#6E757C', 'stroke-width': 3 }, g);
        T(g, 0, 58, '1 MILE', { size: 30, weight: 800, anchor: 'middle', fill: '#3A3F44', ls: 1 });
        T(g, 0, 96, '≈ 1.6 km', { size: 26, weight: 700, anchor: 'middle', fill: '#3A3F44' });
        // bowler hat
        const hat = G(g); tr(hat, 0, -134, 1, -4);
        E('path', { d: 'M-76,6 Q0,24 76,6 Q80,-4 70,-6 Q0,6 -70,-6 Q-80,-4 -76,6 Z', fill: '#1E1E24', stroke: SC_INK, 'stroke-width': 3 }, hat);
        E('path', { d: 'M-46,-2 Q-50,-56 0,-58 Q50,-56 46,-2 Z', fill: '#26262E', stroke: SC_INK, 'stroke-width': 3 }, hat);
        E('rect', { x: -47, y: -14, width: 94, height: 10, fill: '#6B2A2A' }, hat);
      },
      face: { x: 0, y: -66, eye: 14, gap: 48, mouthW: 28, mouthY: 44, lidCol: '#AEB3B8' } }));
    const inner = c.firstChild, mo = G(inner); tr(mo, 0, -30);   // white walrus moustache
    E('path', { d: 'M-40,-6 Q-20,-16 0,-8 Q20,-16 40,-6 Q46,10 30,14 Q14,4 0,10 Q-14,4 -30,14 Q-46,10 -40,-6 Z', fill: '#F4F4F0', stroke: SC_INK, 'stroke-width': 2.5 }, mo);
  } else if (kind === 'lita') {
    let water = null, grid = null;
    c = scMake(parent, Object.assign(S, { seed: 17, bob: 5, mood: o.mood || 'happy',
      draw: g => {
        // legs
        [-40, 40].forEach(x => {
          E('path', { d: `M${x},96 L${x},128`, stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
          E('ellipse', { cx: x + 6, cy: 132, rx: 16, ry: 8, fill: '#FF6B8A', stroke: SC_INK, 'stroke-width': 3 }, g);
        });
        // arms
        E('path', { d: 'M-96,10 Q-126,24 -122,56', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
        E('circle', { cx: -122, cy: 60, r: 10, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
        E('path', { d: 'M96,10 Q128,0 134,-28', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
        E('circle', { cx: 134, cy: -32, r: 10, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
        // the cube: top and side faces (oblique), then the front face
        E('path', { d: 'M-96,-96 L-60,-132 L132,-132 L96,-96 Z', fill: 'rgba(170,220,250,0.75)', stroke: '#1E5A7A', 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
        E('path', { d: 'M96,-96 L132,-132 L132,60 L96,96 Z', fill: 'rgba(110,190,240,0.75)', stroke: '#1E5A7A', 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
        E('rect', { x: -96, y: -96, width: 192, height: 192, fill: 'rgba(200,236,255,0.85)' }, g);
        water = E('rect', { x: -96, y: -48, width: 192, height: 144, fill: '#6EC8FF', opacity: 0.75 }, g);
        let d = '';
        for (let i = 1; i < 10; i++) { const v = -96 + i * 19.2; d += `M${v.toFixed(1)},-96 V96 M-96,${v.toFixed(1)} H96 `; }
        grid = E('path', { d, stroke: '#2E7DB8', 'stroke-width': 1.6, opacity: 0.35 }, g);
        E('rect', { x: -96, y: -96, width: 192, height: 192, fill: 'none', stroke: '#1E5A7A', 'stroke-width': 5 }, g);
        E('path', { d: 'M-84,-84 L-60,-84', stroke: '#FFFFFF', 'stroke-width': 5, opacity: 0.8, 'stroke-linecap': 'round' }, g);
        // a little bow on top
        const bw = G(g); tr(bw, 50, -126, 1, 10);
        E('path', { d: 'M0,0 L-20,-11 L-20,11 Z M0,0 L20,-11 L20,11 Z', fill: '#FF6B8A', stroke: SC_INK, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, bw);
        E('circle', { r: 5, fill: '#FF3B6B', stroke: SC_INK, 'stroke-width': 2 }, bw);
        E('ellipse', { cx: -54, cy: 8, rx: 12, ry: 7, fill: '#FF8FB0', opacity: 0.55 }, g);
        E('ellipse', { cx: 54, cy: 8, rx: 12, ry: 7, fill: '#FF8FB0', opacity: 0.55 }, g);
      },
      face: { x: 0, y: -18, eye: 18, gap: 60, mouthW: 32, mouthY: 40, lidCol: '#BFE6FF' },
      upd: (t, g, st) => {
        const L = clamp(st.level === undefined ? 0.75 : st.level), w = Math.sin(t * 3) * 3;
        attr(water, 'y', 96 - 192 * L + w); attr(water, 'height', Math.max(0, 192 * L - w));
        op(grid, 0.35 + 0.65 * clamp(st.grid || 0));
      } }));
  } else if (kind === 'flip') {
    let tiles = [], txt = [];
    c = scMake(parent, Object.assign(S, { seed: 21, bob: 2, mood: o.mood || 'happy',
      draw: g => {
        // two hanging cables
        E('path', { d: 'M-100,-118 L-100,-170 M100,-118 L100,-170', stroke: '#5A6670', 'stroke-width': 5 }, g);
        // little arms and legs
        E('path', { d: 'M-150,0 Q-178,20 -170,52', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
        E('circle', { cx: -170, cy: 56, r: 10, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
        E('path', { d: 'M150,0 Q178,20 170,52', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
        E('circle', { cx: 170, cy: 56, r: 10, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
        [-60, 60].forEach(x => {
          E('path', { d: `M${x},118 L${x},146`, stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
          E('ellipse', { cx: x + 6, cy: 150, rx: 16, ry: 8, fill: '#FFC247', stroke: SC_INK, 'stroke-width': 3 }, g);
        });
        // the board
        E('rect', { x: -150, y: -120, width: 300, height: 240, rx: 18, fill: linGrad('#2A313A', '#14181E', true), stroke: SC_INK, 'stroke-width': 6 }, g);
        E('rect', { x: -140, y: -110, width: 280, height: 26, rx: 6, fill: '#FFC247' }, g);
        T(g, 0, -90, 'DEPARTURES', { size: 22, weight: 800, anchor: 'middle', fill: '#1A1A1A', ls: 3 });
        // the 8-tile display
        for (let i = 0; i < 8; i++) {
          const x = -132 + i * 33;
          tiles.push(E('rect', { x, y: 34, width: 30, height: 64, rx: 4, fill: '#0A0C10', stroke: '#3A4250', 'stroke-width': 2 }, g));
          txt.push(T(g, x + 15, 80, '', { size: 40, weight: 700, anchor: 'middle', fill: '#FFD23F', font: "'Courier New', monospace" }));
        }
        E('path', { d: 'M-132,66 H132', stroke: '#000000', 'stroke-width': 2.5, opacity: 0.8 }, g);
      },
      face: { x: 0, y: -38, eye: 18, gap: 64, mouthW: 40, mouthY: 40, lidCol: '#3A4250' },
      upd: (t, g, st) => {
        const s = String(st.text === undefined ? 'LONDON' : st.text).slice(0, 8).toUpperCase(), pad = Math.floor((8 - s.length) / 2);
        const f = st.flap === undefined ? 1 : clamp(st.flap), A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789:';
        txt.forEach((el, i) => {
          let ch = s[i - pad] || '';
          if (f < 1 && i >= Math.floor(f * 8)) ch = A[(Math.floor(t * 22) * 7 + i * 13) % A.length];
          if (el.textContent !== ch) el.textContent = ch;
        });
      } }));
  } else if (kind === 'trish') {
    let L = [], covers = [];
    c = scMake(parent, Object.assign(S, { seed: 25, bob: 3, mood: o.mood || 'happy',
      draw: g => {
        // legs and arms
        [-56, 56].forEach(x => {
          E('path', { d: `M${x},126 L${x},156`, stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
          E('ellipse', { cx: x + 6, cy: 160, rx: 16, ry: 8, fill: '#7A1E48', stroke: SC_INK, 'stroke-width': 3 }, g);
        });
        E('path', { d: 'M-100,-20 Q-150,-6 -150,34', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
        E('circle', { cx: -150, cy: 38, r: 10, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
        E('path', { d: 'M100,-20 Q150,-6 150,34', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
        E('circle', { cx: 150, cy: 38, r: 10, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
        // the triangle: apex (0,-178), base y 126, half-width 176
        E('path', { d: 'M0,-178 L176,126 L-176,126 Z', fill: linGrad('#FF9A8A', '#F25C6B', true), stroke: SC_INK, 'stroke-width': 6, 'stroke-linejoin': 'round' }, g);
        E('path', { d: 'M-104,2 L104,2 M0,2 L0,126', stroke: SC_INK, 'stroke-width': 5 }, g);
        E('path', { d: 'M-30,-120 L-70,-50', stroke: '#FFFFFF', 'stroke-width': 6, opacity: 0.35, 'stroke-linecap': 'round' }, g);
        // the three letters
        [[0, -10, 58], [-62, 102, 66], [62, 102, 66]].forEach(([x, y, s]) => L.push(T(g, x, y, '', { size: s, weight: 800, anchor: 'middle', fill: '#FFFFFF' })));
        L.forEach(t => { t.setAttribute('stroke', '#7A1E30'); t.setAttribute('stroke-width', 5); t.setAttribute('paint-order', 'stroke'); });
        // cover hands (a yellow mitten that slides over a letter)
        [[0, -32], [-62, 78], [62, 78]].forEach(([x, y]) => {
          const h = G(g); tr(h, x, y);
          E('path', { d: 'M-34,-30 Q-38,30 -10,34 L22,34 Q40,30 38,0 L38,-26 Q30,-34 22,-26 L22,-6 L16,-30 Q8,-38 0,-30 L-6,-34 Q-16,-40 -22,-32 Q-30,-40 -34,-30 Z', fill: '#FFE45C', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, h);
          covers.push({ h, x, y });
        });
        // a bow on the apex
        const bw = G(g); tr(bw, 22, -168, 1, 16);
        E('path', { d: 'M0,0 L-20,-11 L-20,11 Z M0,0 L20,-11 L20,11 Z', fill: '#FFE45C', stroke: SC_INK, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, bw);
        E('circle', { r: 5, fill: '#FFC247', stroke: SC_INK, 'stroke-width': 2 }, bw);
      },
      face: { x: 0, y: -96, eye: 11, gap: 34, mouthW: 22, mouthY: 24, lidCol: '#FF9A8A' },
      upd: (t, g, st) => {
        const ls = st.letters || ['D', 'S', 'T'];
        L.forEach((el, i) => { const ch = ls[i] || ''; if (el.textContent !== ch) el.textContent = ch; });
        covers.forEach(({ h, x, y }, i) => {
          const p = st.cover === i ? clamp(st.coverP === undefined ? 1 : st.coverP) : 0;
          op(h, p > 0.01 ? 1 : 0); tr(h, x + 120 * (1 - p), y + 60 * (1 - p), 0.6 + 0.4 * p);
        });
      } }));
  } else if (kind === 'martian') {
    c = scMake(parent, Object.assign(S, { seed: 29, bob: 4, mood: o.mood || 'deadpan',
      draw: g => {
        [-1, 1].forEach(sd => {
          E('path', { d: `M${sd * 26},-70 Q${sd * 40},-120 ${sd * 56},-128`, fill: 'none', stroke: '#2F7A3A', 'stroke-width': 6, 'stroke-linecap': 'round' }, g);
          E('circle', { cx: sd * 58, cy: -130, r: 11, fill: '#FFE45C', stroke: SC_INK, 'stroke-width': 3 }, g);
          E('path', { d: `M${sd * 62},10 Q${sd * 92},20 ${sd * 90},52`, fill: 'none', stroke: '#2F7A3A', 'stroke-width': 9, 'stroke-linecap': 'round' }, g);
          E('path', { d: `M${sd * 26},96 L${sd * 30},128`, stroke: '#2F7A3A', 'stroke-width': 9, 'stroke-linecap': 'round' }, g);
        });
        E('ellipse', { cx: 0, cy: 10, rx: 74, ry: 96, fill: ball('#8EE07A', '#3FA34A'), stroke: SC_INK, 'stroke-width': 5 }, g);
        E('ellipse', { cx: -26, cy: -46, rx: 14, ry: 8, fill: '#FFFFFF', opacity: 0.3 }, g);
      },
      face: { x: 0, y: -22, eye: 20, gap: 56, mouthW: 30, mouthY: 44, lidCol: '#6FCB66' } }));
  } else {
    c = scKavya(parent, o);
  }
  return c;
}

/* ---------- small shared bits ---------- */
function lcPalm(parent, x, y, s) {
  const g = G(parent); tr(g, x, y, s || 1);
  E('path', { d: 'M-34,0 L34,0 L26,-60 L-26,-60 Z', fill: '#B5835A', stroke: '#6B4423', 'stroke-width': 3 }, g);
  E('path', { d: 'M0,-60 Q-6,-140 4,-200', fill: 'none', stroke: '#8B5A2B', 'stroke-width': 9 }, g);
  [[-90, -170], [-60, -240], [10, -260], [80, -230], [96, -170]].forEach(([dx, dy]) => E('path', { d: `M4,-200 Q${(4 + dx) / 2},${-230 + (dy + 200) * 0.2} ${dx},${dy}`, fill: 'none', stroke: '#2FA36B', 'stroke-width': 13, 'stroke-linecap': 'round' }, g));
  return g;
}
function lcLayers(g) { g.mid = G(g); g.front = G(g); g.top = G(g); }

/* ---------- sets ---------- */
function lcFlat(parent) {
  const g = G(parent), back = G(g);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#F4E6CC', '#E8D3B0', true) }, back);
  E('rect', { x: 0, y: 470, width: 1200, height: 280, fill: '#C9A27A' }, back);   // floor
  E('rect', { x: 0, y: 462, width: 1200, height: 12, fill: '#A8825A' }, back);
  // window with the night: other HDB blocks, lit windows
  const wn = G(back);
  E('rect', { x: 120, y: 110, width: 420, height: 300, rx: 6, fill: linGrad('#0E1838', '#27386A', true), stroke: '#8E7A5A', 'stroke-width': 10 }, wn);
  E('rect', { x: 160, y: 200, width: 130, height: 210, fill: '#1A2448' }, wn);
  E('rect', { x: 330, y: 160, width: 170, height: 250, fill: '#202C55' }, wn);
  let lit = '';
  const r = rng(12);
  for (let k = 0; k < 4; k++) for (let j = 0; j < 7; j++) if (r() < 0.55) lit += `M${172 + k * 30},${214 + j * 27} h18 v12 h-18 Z `;
  for (let k = 0; k < 5; k++) for (let j = 0; j < 8; j++) if (r() < 0.5) lit += `M${344 + k * 31},${174 + j * 28} h18 v12 h-18 Z `;
  E('path', { d: lit, fill: '#FFE29A', opacity: 0.85 }, wn);
  E('circle', { cx: 480, cy: 150, r: 18, fill: '#FFF7C2', opacity: 0.9 }, wn);   // moon
  E('path', { d: 'M330,110 V410 M120,260 H540', stroke: '#8E7A5A', 'stroke-width': 8 }, wn);
  // curtains
  E('path', { d: 'M96,96 L170,96 Q150,260 176,430 L96,430 Z', fill: '#2E8B8B', stroke: '#1E5A5A', 'stroke-width': 3 }, back);
  E('path', { d: 'M564,96 L490,96 Q510,260 484,430 L564,430 Z', fill: '#2E8B8B', stroke: '#1E5A5A', 'stroke-width': 3 }, back);
  E('rect', { x: 84, y: 86, width: 492, height: 12, rx: 6, fill: '#6B4423' }, back);
  // wall clock at 10:00
  const ck = G(back); tr(ck, 760, 170);
  E('circle', { r: 52, fill: '#FFFFFF', stroke: '#3A4A58', 'stroke-width': 7 }, ck);
  let tks = ''; for (let i = 0; i < 12; i++) { const a = i * TAU / 12; tks += `M${(Math.sin(a) * 40).toFixed(1)},${(-Math.cos(a) * 40).toFixed(1)} L${(Math.sin(a) * 46).toFixed(1)},${(-Math.cos(a) * 46).toFixed(1)} `; }
  E('path', { d: tks, stroke: '#3A4A58', 'stroke-width': 4 }, ck);
  E('path', { d: 'M0,0 L-24,-14 M0,0 L0,-38', stroke: SC_INK, 'stroke-width': 6, 'stroke-linecap': 'round' }, ck);
  // calendar
  const cal = G(back); tr(cal, 960, 120);
  E('rect', { x: -80, y: 0, width: 160, height: 190, rx: 6, fill: '#FFFFFF', stroke: '#8F9CAB', 'stroke-width': 3 }, cal);
  E('rect', { x: -80, y: 0, width: 160, height: 48, rx: 6, fill: '#E8424F' }, cal);
  T(cal, 0, 36, 'JUNE', { size: 30, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 2 });
  let cg = ''; for (let i = 0; i < 4; i++) for (let j = 0; j < 5; j++) cg += `M${-62 + j * 26},${66 + i * 30} h16 v16 h-16 Z `;
  E('path', { d: cg, fill: '#D9E2EA' }, cal);
  E('circle', { cx: 42, cy: 134, r: 15, fill: 'none', stroke: '#E8424F', 'stroke-width': 4 }, cal);   // the day circled
  // shelf with a plant and photos
  E('rect', { x: 680, y: 330, width: 420, height: 14, fill: '#8B5A2B' }, back);
  E('path', { d: 'M720,330 L760,330 L754,296 L726,296 Z', fill: '#C2453A' }, back);
  E('path', { d: 'M740,296 Q716,250 726,226 M740,296 Q748,240 770,224 M740,296 Q762,262 788,258', fill: 'none', stroke: '#2FA36B', 'stroke-width': 8, 'stroke-linecap': 'round' }, back);
  [[860, '#7FC4F5'], [960, '#FFC247'], [1050, '#B48CFF']].forEach(([x, col]) => { E('rect', { x: x - 34, y: 270, width: 68, height: 60, rx: 4, fill: '#FFFFFF', stroke: '#6B4423', 'stroke-width': 4 }, back); E('rect', { x: x - 26, y: 278, width: 52, height: 44, fill: col }, back); });
  lcLayers(g);
  // the dining table, covered in packing
  E('rect', { x: 40, y: 540, width: 1120, height: 30, rx: 8, fill: '#B07A45', stroke: '#6B4423', 'stroke-width': 4 }, g.front);
  E('rect', { x: 60, y: 570, width: 1080, height: 190, fill: linGrad('#9C6B3E', '#7A5230', true), stroke: '#6B4423', 'stroke-width': 4 }, g.front);
  E('path', { d: 'M60,600 H1140', stroke: '#6B4423', 'stroke-width': 3, opacity: 0.5 }, g.front);
  g.counterY = 540;
  g.upd = () => {};
  return g;
}

function lcAirport(parent, o) {
  o = o || {};
  const g = G(parent), back = G(g), day = !!o.day;
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad(day ? '#E8F1F8' : '#2A3440', day ? '#CFDCE8' : '#3E4C5A', true) }, back);
  // ceiling with lights
  E('path', { d: 'M0,0 H1200 V70 Q600,110 0,70 Z', fill: day ? '#F7FAFC' : '#1E2630' }, back);
  for (let i = 0; i < 7; i++) E('ellipse', { cx: 90 + i * 170, cy: 72 + 12 * Math.sin(i / 6 * Math.PI), rx: 36, ry: 9, fill: '#FFF4CF', opacity: 0.9 }, back);
  // the glass wall: sky, apron, a plane tail or two
  const gw = G(back);
  E('rect', { x: 60, y: 130, width: 1080, height: 330, fill: linGrad(day ? '#9CC8E8' : '#0C1530', day ? '#DDEBF5' : '#26345E', true) }, gw);
  E('rect', { x: 60, y: 400, width: 1080, height: 60, fill: day ? '#8F9CAB' : '#1A2230' }, gw);
  if (!day) { const r = rng(7); let st = ''; for (let i = 0; i < 26; i++) st += `M${(80 + r() * 1040).toFixed(0)},${(150 + r() * 160).toFixed(0)} h2 v2 h-2 Z `; E('path', { d: st, fill: '#FFFFFF', opacity: 0.8 }, gw); }
  [[300, 1], [820, 0.8]].forEach(([x, s]) => {
    const pl = G(gw); tr(pl, x, 400, s);
    E('path', { d: 'M-260,-30 Q-280,-60 -240,-62 L200,-62 Q250,-60 270,-40 L270,-26 Q240,-14 200,-14 L-230,-14 Q-262,-16 -260,-30 Z', fill: day ? '#F4F7FA' : '#C9D3DC', stroke: '#5A6670', 'stroke-width': 3 }, pl);
    E('path', { d: 'M170,-62 L230,-160 L264,-160 L240,-62 Z', fill: day ? '#2E4C8C' : '#3A5A9C', stroke: '#1E2A44', 'stroke-width': 3 }, pl);
    let w = ''; for (let k = 0; k < 14; k++) w += `M${-190 + k * 26},-46 h12 v8 h-12 Z `;
    E('path', { d: w, fill: day ? '#5A6670' : '#FFE29A' }, pl);
  });
  let mul = ''; for (let x = 60; x <= 1140; x += 135) mul += `M${x},130 V460 `;
  E('path', { d: mul + 'M60,130 H1140', stroke: day ? '#B9C4CE' : '#5A6670', 'stroke-width': 8 }, gw);
  E('rect', { x: 0, y: 460, width: 1200, height: 290, fill: linGrad(day ? '#D9DEE3' : '#6B7680', day ? '#B9C2CA' : '#4A545E', true) }, back);
  // banner on the glass
  const tt = o.title === undefined ? 'CHANGI AIRPORT' : o.title;
  if (tt) { const bn = G(back); tr(bn, 880, 168); E('rect', { x: -170, y: -24, width: 340, height: 48, rx: 10, fill: day ? '#7A1E48' : '#5A1E6E', opacity: 0.92 }, bn); T(bn, 0, 11, tt, { size: 28, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 2 }); }
  // gate sign (yellow on black, hanging)
  const sg = G(back); tr(sg, 420, 150);
  E('path', { d: 'M-80,-60 V-24 M80,-60 V-24', stroke: '#5A6670', 'stroke-width': 4 }, sg);
  E('rect', { x: -130, y: -26, width: 260, height: 56, rx: 6, fill: '#14161A' }, sg);
  g.sign = T(sg, 0, 14, o.sign === undefined ? 'Gate C  →' : o.sign, { size: 32, weight: 800, anchor: 'middle', fill: '#FFD23F' });
  // indoor palms (it's Changi; Heathrow gets a potted plant)
  lcPalm(back, 70, 560, 0.9); lcPalm(back, 1140, 560, 0.8);
  lcLayers(g);
  const kind = o.front || 'rail';
  let belt = null;
  if (kind === 'belt') {
    // X-ray machine at the right, conveyor across
    E('rect', { x: 760, y: 380, width: 360, height: 200, rx: 14, fill: '#C9D3DC', stroke: '#5A6670', 'stroke-width': 5 }, g.front);
    E('rect', { x: 800, y: 440, width: 280, height: 140, rx: 8, fill: '#1E2630' }, g.front);
    let fl = ''; for (let i = 0; i < 9; i++) fl += `M${808 + i * 30},440 v${60 + (i % 2) * 20} `;
    E('path', { d: fl, stroke: '#3A4250', 'stroke-width': 10 }, g.front);
    E('rect', { x: 40, y: 530, width: 1120, height: 40, rx: 8, fill: '#3A4250', stroke: '#1E2630', 'stroke-width': 4 }, g.front);
    belt = E('path', { d: '', stroke: '#5A6670', 'stroke-width': 4 }, g.front);
    E('rect', { x: 60, y: 570, width: 1080, height: 190, fill: linGrad('#9AA6B2', '#6E7A86', true), stroke: '#4A545E', 'stroke-width': 4 }, g.front);
  } else if (kind === 'counter') {
    E('rect', { x: 40, y: 520, width: 1120, height: 26, rx: 6, fill: '#E6EBEF', stroke: '#7D8A96', 'stroke-width': 4 }, g.front);
    E('rect', { x: 60, y: 546, width: 1080, height: 214, fill: linGrad('#5A1E6E', '#3A1248', true), stroke: '#2A0E36', 'stroke-width': 4 }, g.front);
    E('path', { d: 'M60,600 H1140', stroke: '#C9A2E0', 'stroke-width': 4, opacity: 0.5 }, g.front);
    const sc = G(g.front); tr(sc, 900, 640);
    E('rect', { x: -110, y: -40, width: 220, height: 80, rx: 10, fill: '#1E2630', stroke: '#C9D3DC', 'stroke-width': 4 }, sc);
    const disp = T(sc, 0, 18, '0 kg', { size: 44, weight: 700, anchor: 'middle', fill: '#56D69B', font: "'Courier New', monospace" });
    sc.set = s => { if (disp.textContent !== s) disp.textContent = s; };
    g.scale = sc;
  } else {
    E('rect', { x: 40, y: 530, width: 1120, height: 230, fill: 'rgba(190,220,240,0.35)', stroke: '#8FA3B8', 'stroke-width': 4 }, g.front);
    E('rect', { x: 30, y: 520, width: 1140, height: 16, rx: 8, fill: '#C9D3DC', stroke: '#7D8A96', 'stroke-width': 3 }, g.front);
    let ps = ''; for (let x = 60; x < 1160; x += 180) ps += `M${x},536 V760 `;
    E('path', { d: ps, stroke: '#9AA6B2', 'stroke-width': 8 }, g.front);
  }
  g.counterY = 530;
  g.upd = t => {
    if (belt) { let d = ''; const off = (t * 60) % 40; for (let x = 40 + off; x < 1160; x += 40) d += `M${x.toFixed(1)},534 v32 `; attr(belt, 'd', d); }
  };
  g.upd(0);
  return g;
}

function lcCabin(parent, o) {
  o = o || {};
  const g = G(parent), back = G(g), day = !!o.day;
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#E9E4DA', '#D2CBBE', true) }, back);
  // overhead bins and the ceiling curve
  E('path', { d: 'M0,0 H1200 V120 Q600,170 0,120 Z', fill: '#F4F1EA', stroke: '#B9B2A4', 'stroke-width': 4 }, back);
  E('path', { d: 'M0,120 Q600,170 1200,120', fill: 'none', stroke: '#8F887A', 'stroke-width': 4 }, back);
  for (let i = 0; i < 4; i++) E('path', { d: `M${150 + i * 300},${130 + 14 * Math.sin((i + 0.5) / 4 * Math.PI)} v-60`, stroke: '#C9C2B4', 'stroke-width': 4 }, back);
  E('rect', { x: 0, y: 140, width: 1200, height: 14, fill: '#7A1E48', opacity: 0.8 }, back);
  // oval windows along both walls
  [[70, 290], [200, 270], [1000, 270], [1130, 290]].forEach(([x, y]) => {
    E('ellipse', { cx: x, cy: y, rx: 40, ry: 56, fill: '#B9B2A4' }, back);
    E('ellipse', { cx: x, cy: y, rx: 30, ry: 44, fill: linGrad(day ? '#7FC4F5' : '#0C1530', day ? '#DDEBF5' : '#2A3A6E', true) }, back);
    if (!day) E('circle', { cx: x + 8, cy: y - 14, r: 3, fill: '#FFFFFF', opacity: 0.8 }, back);
    else E('ellipse', { cx: x - 4, cy: y + 18, rx: 18, ry: 7, fill: '#FFFFFF', opacity: 0.9 }, back);
  });
  // three tall seat backs (the family's row), headrest covers
  g.seats = [330, 600, 870];
  g.seats.forEach(x => {
    E('path', { d: `M${x - 120},620 L${x - 112},230 Q${x - 108},180 ${x - 60},176 L${x + 60},176 Q${x + 108},180 ${x + 112},230 L${x + 120},620 Z`, fill: linGrad('#3A4E8C', '#24346A', true), stroke: '#141E44', 'stroke-width': 5 }, back);
    E('rect', { x: x - 70, y: 190, width: 140, height: 66, rx: 12, fill: '#F4F1EA', stroke: '#B9B2A4', 'stroke-width': 3 }, back);
  });
  lcLayers(g);
  // armrests and tray tables
  E('rect', { x: 0, y: 548, width: 1200, height: 212, fill: linGrad('#B9B2A4', '#8F887A', true), stroke: '#6E675A', 'stroke-width': 4 }, g.front);
  g.seats.forEach(x => {
    E('rect', { x: x - 116, y: 556, width: 232, height: 22, rx: 8, fill: '#D9D3C6', stroke: '#6E675A', 'stroke-width': 3 }, g.front);
    E('rect', { x: x - 100, y: 596, width: 200, height: 120, rx: 10, fill: '#C9C2B4', stroke: '#6E675A', 'stroke-width': 3 }, g.front);
  });
  [195, 465, 735, 1005].forEach(x => E('rect', { x: x - 18, y: 520, width: 36, height: 50, rx: 10, fill: '#5A5448', stroke: '#2E2A22', 'stroke-width': 3 }, g.front));
  g.counterY = 548;
  g.upd = () => {};
  return g;
}

function lcCar(parent) {
  const g = G(parent), out = G(g);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#9CC8E8', '#E3F0F8', true) }, out);
  E('path', { d: 'M0,330 Q300,290 600,320 Q900,350 1200,300 L1200,750 L0,750 Z', fill: '#7FBF5A' }, out);
  E('path', { d: 'M0,380 Q400,350 800,380 Q1000,395 1200,370 L1200,750 L0,750 Z', fill: '#5FA344' }, out);
  const hedge = E('path', { d: '', fill: '#2F7A3A' }, out);
  const clouds = G(out);
  [[200, 110], [640, 80], [1000, 130]].forEach(([x, y]) => { E('ellipse', { cx: x, cy: y, rx: 80, ry: 26, fill: '#FFFFFF', opacity: 0.9 }, clouds); E('ellipse', { cx: x + 40, cy: y - 16, rx: 50, ry: 24, fill: '#FFFFFF', opacity: 0.9 }, clouds); });
  // car interior: roof and pillars (the windscreen frame), seats
  g.back = G(g);
  const inside = G(g); g.backSeats = inside;
  [500, 700].forEach(x => E('path', { d: `M${x - 96},620 L${x - 90},330 Q${x - 86},300 ${x - 50},298 L${x + 50},298 Q${x + 86},300 ${x + 90},330 L${x + 96},620 Z`, fill: '#6B5A4A', stroke: '#3A2E24', 'stroke-width': 4 }, inside));
  g.backX = [500, 700];
  g.backKids = G(g);   // back-seat passengers (behind the front seats)
  const fseats = G(g);
  [330, 860].forEach(x => E('path', { d: `M${x - 130},700 L${x - 120},300 Q${x - 114},250 ${x - 64},246 L${x + 64},246 Q${x + 114},250 ${x + 120},300 L${x + 130},700 Z`, fill: linGrad('#8A7460', '#5A4A3A', true), stroke: '#3A2E24', 'stroke-width': 5 }, fseats));
  g.frontX = [330, 860];
  g.mid = G(g);
  g.front = G(g);
  // windscreen frame: roof band and pillars (dark), dashboard
  E('path', { d: 'M0,0 H1200 V70 Q600,40 0,70 Z', fill: '#2A2E34' }, g.front);
  E('path', { d: 'M0,0 L90,0 L40,560 L0,560 Z M1200,0 L1110,0 L1160,560 L1200,560 Z', fill: '#2A2E34' }, g.front);
  E('path', { d: 'M598,64 V84', stroke: '#2A2E34', 'stroke-width': 8 }, g.front);
  E('rect', { x: 530, y: 82, width: 140, height: 40, rx: 14, fill: '#8F9CAB', stroke: '#1A1E24', 'stroke-width': 5 }, g.front);   // mirror
  E('path', { d: 'M0,560 Q600,520 1200,560 L1200,750 L0,750 Z', fill: linGrad('#3A3F46', '#22262C', true), stroke: '#14161A', 'stroke-width': 4 }, g.front);
  // steering wheel on the viewer's left (right-hand drive)
  const sw = G(g.front); tr(sw, 330, 600);
  E('circle', { r: 96, fill: 'none', stroke: '#14161A', 'stroke-width': 18 }, sw);
  E('path', { d: 'M-90,10 L90,10 M0,10 L0,90', stroke: '#14161A', 'stroke-width': 16 }, sw);
  E('circle', { cy: 10, r: 24, fill: '#2A2E34', stroke: '#14161A', 'stroke-width': 4 }, sw);
  g.top = G(g);
  g.counterY = 560;
  g.upd = (t, sp) => {
    const off = (t * 260 * (sp === undefined ? 1 : sp)) % 160; let d = 'M0,420 ';
    for (let x = -off; x < 1300; x += 160) d += `Q${(x + 40).toFixed(0)},385 ${(x + 80).toFixed(0)},415 Q${(x + 120).toFixed(0)},388 ${(x + 160).toFixed(0)},420 `;
    attr(hedge, 'd', d + 'L1300,470 L0,470 Z');
    tr(clouds, -((t * 12 * (sp === undefined ? 1 : sp)) % 60), 0);
  };
  g.upd(0);
  return g;
}

function lcShop(parent, o) {
  o = o || {};
  const g = G(parent), back = G(g), souv = o.kind === 'souvenir';
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad(souv ? '#F2E4D0' : '#EEF4F8', souv ? '#E0CDB2' : '#D6E2EA', true) }, back);
  // sign band
  E('rect', { x: 0, y: 100, width: 1200, height: 64, fill: souv ? '#C62828' : '#2E7DD8' }, back);
  T(back, 880, 144, souv ? 'LONDON GIFTS' : 'RICE · JUICE', { size: 34, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 3 });
  g.shelves = [300, 450];
  g.shelves.forEach(y => {
    E('rect', { x: 40, y, width: 1120, height: 14, fill: souv ? '#8B5A2B' : '#B9C4CE', stroke: souv ? '#5A3A1A' : '#7D8A96', 'stroke-width': 3 }, back);
    E('rect', { x: 40, y: y + 14, width: 1120, height: 24, fill: souv ? '#F7E9D0' : '#FFFFFF', stroke: '#C9D3DC', 'stroke-width': 2 }, back);
  });
  const r = rng(souv ? 19 : 23);
  if (souv) {
    // a window with Big Ben, and filler gifts (globes, mugs, red buses)
    const wn = G(back); tr(wn, 0, 0);
    E('rect', { x: 60, y: 186, width: 220, height: 100, rx: 6, fill: '#BFD8EC', stroke: '#8B5A2B', 'stroke-width': 6 }, wn);
    E('path', { d: 'M150,286 V214 L160,196 L170,214 V286 Z', fill: '#8E8270' }, wn);
    E('circle', { cx: 160, cy: 226, r: 7, fill: '#F4E9D8' }, wn);
    g.shelves.forEach((y, k) => [0, 1, 2, 3, 4, 5, 6].forEach(i => {
      const x = 340 + i * 120 + (k ? 40 : 0), typ = (i + k) % 3;
      if (typ === 0) { E('circle', { cx: x, cy: y - 30, r: 28, fill: 'rgba(220,240,255,0.8)', stroke: '#5A6670', 'stroke-width': 3 }, back); E('rect', { x: x - 26, y: y - 8, width: 52, height: 8, fill: '#8B5A2B' }, back); }
      else if (typ === 1) { E('rect', { x: x - 22, y: y - 50, width: 44, height: 50, rx: 6, fill: '#FFFFFF', stroke: '#5A6670', 'stroke-width': 3 }, back); E('path', { d: `M${x - 22},${y - 34} H${x + 22} M${x},${y - 50} V${y}`, stroke: '#C62828', 'stroke-width': 6 }, back); }
      else { E('rect', { x: x - 34, y: y - 44, width: 68, height: 44, rx: 6, fill: '#D32F2F', stroke: '#5A1010', 'stroke-width': 3 }, back); E('path', { d: `M${x - 28},${y - 34} h56 M${x - 28},${y - 18} h56`, stroke: '#FFE29A', 'stroke-width': 5 }, back); }
    }));
  } else {
    // rice bags on the top shelf, juice cartons on the lower
    [70, 150, 1050, 1120].forEach((x, i) => { const h = 60 + r() * 30; E('rect', { x: x - 30, y: 300 - h, width: 60, height: h, rx: 10, fill: ['#F3E3C3', '#E9D2A6'][i % 2], stroke: '#8B6B3A', 'stroke-width': 3 }, back); });
    [80, 150, 1060, 1120].forEach((x, i) => { E('path', { d: `M${x - 22},450 V${380} L${x},364 L${x + 22},380 V450 Z`, fill: ['#FFC247', '#7EE08A'][i % 2], stroke: '#5A6670', 'stroke-width': 3 }, back); });
  }
  lcLayers(g);
  E('rect', { x: 20, y: 560, width: 1160, height: 22, rx: 6, fill: souv ? '#8B5A2B' : '#C9D3DC', stroke: souv ? '#5A3A1A' : '#7D8A96', 'stroke-width': 4 }, g.front);
  E('rect', { x: 40, y: 582, width: 1120, height: 178, fill: souv ? linGrad('#A8743F', '#7A5230', true) : linGrad('#9AA6B2', '#6E7A86', true), stroke: souv ? '#5A3A1A' : '#4A545E', 'stroke-width': 4 }, g.front);
  g.counterY = 560;
  g.upd = () => {};
  return g;
}

function lcHouse(parent) {
  const g = G(parent), back = G(g);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#F6EEDC', '#EADCC0', true) }, back);
  // floral wallpaper: little sprigs
  let fl = ''; const r = rng(41);
  for (let i = 0; i < 40; i++) { const x = 30 + (i % 10) * 120 + (Math.floor(i / 10) % 2) * 60, y = 40 + Math.floor(i / 10) * 110; fl += `M${x},${y} m-6,0 a6,6 0 1,0 12,0 a6,6 0 1,0 -12,0 `; }
  E('path', { d: fl, fill: '#E8A2B0', opacity: 0.5 }, back);
  // rainy window onto the garden
  const wn = G(back);
  E('rect', { x: 140, y: 120, width: 360, height: 280, rx: 6, fill: linGrad('#9AAAB8', '#C9D8C0', true), stroke: '#FFFFFF', 'stroke-width': 12 }, wn);
  E('path', { d: 'M140,330 Q260,300 380,330 Q440,345 500,320 L500,400 L140,400 Z', fill: '#6FA34A' }, wn);
  let rn = ''; for (let i = 0; i < 18; i++) { const x = 160 + r() * 320, y = 140 + r() * 220; rn += `M${x.toFixed(0)},${y.toFixed(0)} l-6,18 `; }
  E('path', { d: rn, stroke: '#E6EEF5', 'stroke-width': 2.5, opacity: 0.8 }, wn);
  E('path', { d: 'M320,120 V400 M140,260 H500', stroke: '#FFFFFF', 'stroke-width': 10 }, wn);
  // shelf with a teapot and a clock
  E('rect', { x: 680, y: 260, width: 400, height: 14, fill: '#8B5A2B' }, back);
  const tp = G(back); tr(tp, 760, 260);
  E('path', { d: 'M-40,0 Q-50,-56 0,-58 Q50,-56 40,0 Z', fill: '#2E4C8C', stroke: SC_INK, 'stroke-width': 3 }, tp);
  E('path', { d: 'M38,-30 Q64,-36 70,-56', fill: 'none', stroke: '#2E4C8C', 'stroke-width': 9, 'stroke-linecap': 'round' }, tp);
  E('path', { d: 'M-40,-40 Q-66,-36 -58,-12', fill: 'none', stroke: '#2E4C8C', 'stroke-width': 7 }, tp);
  E('circle', { cy: -62, r: 7, fill: '#2E4C8C', stroke: SC_INK, 'stroke-width': 2 }, tp);
  [[900, '#E8424F'], [990, '#FFFFFF'], [1050, '#2E7DD8']].forEach(([x, col]) => E('rect', { x: x - 22, y: 210, width: 44, height: 50, rx: 6, fill: col, stroke: SC_INK, 'stroke-width': 3 }, back));
  // a cream stove
  E('rect', { x: 700, y: 330, width: 360, height: 210, rx: 10, fill: '#F2E6C8', stroke: '#B9A57A', 'stroke-width': 4 }, back);
  E('rect', { x: 730, y: 380, width: 140, height: 120, rx: 8, fill: '#E6D6B0', stroke: '#B9A57A', 'stroke-width': 3 }, back);
  E('rect', { x: 890, y: 380, width: 140, height: 120, rx: 8, fill: '#E6D6B0', stroke: '#B9A57A', 'stroke-width': 3 }, back);
  lcLayers(g);
  E('rect', { x: 40, y: 540, width: 1120, height: 28, rx: 8, fill: '#E2C08A', stroke: '#9C7A44', 'stroke-width': 4 }, g.front);
  E('rect', { x: 60, y: 568, width: 1080, height: 192, fill: linGrad('#D6B07A', '#B08A54', true), stroke: '#9C7A44', 'stroke-width': 4 }, g.front);
  g.counterY = 540;
  g.upd = () => {};
  return g;
}

function lcGarden(parent) {
  const g = G(parent), back = G(g);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#8FC8F0', '#E3F2FA', true) }, back);
  // the English house
  E('rect', { x: 720, y: 150, width: 420, height: 320, fill: '#C9A27A', stroke: '#8B6B4A', 'stroke-width': 4 }, back);
  E('path', { d: 'M700,160 L930,60 L1160,160 Z', fill: '#6E5A4A', stroke: '#4A3A2E', 'stroke-width': 4 }, back);
  let bw = ''; for (let k = 0; k < 3; k++) for (let j = 0; j < 2; j++) bw += `M${760 + k * 130},${200 + j * 120} h70 v80 h-70 Z `;
  E('path', { d: bw, fill: '#BFD8EC', stroke: '#FFFFFF', 'stroke-width': 6 }, back);
  // the lawn
  E('rect', { x: 0, y: 470, width: 1200, height: 280, fill: linGrad('#7FC45A', '#5FA344', true) }, back);
  let gr = ''; const r = rng(33); for (let i = 0; i < 40; i++) { const x = r() * 1200, y = 490 + r() * 250; gr += `M${x.toFixed(0)},${y.toFixed(0)} l-4,-12 M${(x + 5).toFixed(0)},${y.toFixed(0)} l4,-12 `; }
  E('path', { d: gr, stroke: '#3F8A34', 'stroke-width': 3 }, back);
  // white marquee with bunting
  E('path', { d: 'M60,480 L60,250 L300,170 L540,250 L540,480 Z', fill: '#FFFFFF', stroke: '#B9C4CE', 'stroke-width': 4 }, back);
  E('path', { d: 'M60,250 L540,250 M300,170 L300,480', stroke: '#D9E2EA', 'stroke-width': 4 }, back);
  let bt = ''; for (let i = 0; i < 12; i++) { const x = 70 + i * 40; bt += `M${x},262 l20,0 l-10,22 Z `; }
  E('path', { d: bt, fill: '#FFC247', stroke: '#E8751A', 'stroke-width': 2 }, back);
  // marigold arch
  const ar = G(back); tr(ar, 640, 480);
  E('path', { d: 'M-80,0 V-170 Q0,-260 80,-170 V0', fill: 'none', stroke: '#E8751A', 'stroke-width': 18 }, ar);
  E('path', { d: 'M-80,0 V-170 Q0,-260 80,-170 V0', fill: 'none', stroke: '#FFC247', 'stroke-width': 8, 'stroke-dasharray': '6 10' }, ar);
  // fairy lights
  const lights = [];
  for (let i = 0; i < 14; i++) { const x = 60 + i * 36, y = 250 + 18 * Math.sin(i / 13 * Math.PI); lights.push(E('circle', { cx: x, cy: y + 30, r: 5, fill: '#FFF4A8' }, back)); }
  g.lawnY = 470;
  lcLayers(g);
  // low box hedge across the front
  E('path', { d: 'M0,640 Q20,610 60,620 Q100,600 140,618 Q180,600 220,620 Q260,602 300,620 Q340,600 380,618 Q420,602 460,620 Q500,600 540,618 Q580,602 620,620 Q660,600 700,618 Q740,602 780,620 Q820,600 860,618 Q900,602 940,620 Q980,600 1020,618 Q1060,602 1100,620 Q1140,600 1200,630 L1200,760 L0,760 Z', fill: '#2F7A3A', stroke: '#1E5A28', 'stroke-width': 4 }, g.front);
  g.counterY = 610;
  g.upd = t => lights.forEach((l, i) => op(l, 0.55 + 0.45 * Math.sin(t * 4 + i * 1.3)));
  return g;
}

function lcMars(parent) {
  const g = G(parent);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#1A0A10', '#5A1E14', true) }, g);
  const r = rng(61); let st = '';
  for (let i = 0; i < 40; i++) st += `M${(r() * 1200).toFixed(0)},${(r() * 400).toFixed(0)} h2.5 v2.5 h-2.5 Z `;
  E('path', { d: st, fill: '#FFFFFF', opacity: 0.7 }, g);
  E('circle', { cx: 180, cy: 170, r: 22, fill: '#BFD8EC', opacity: 0.6 }, g);   // a moon (Phobos)
  E('path', { d: 'M0,520 Q200,470 420,500 Q700,540 900,490 Q1060,455 1200,500 L1200,750 L0,750 Z', fill: linGrad('#D2582E', '#8E2E14', true) }, g);
  E('path', { d: 'M0,600 Q300,570 600,600 Q900,630 1200,590 L1200,750 L0,750 Z', fill: '#B4441E', opacity: 0.7 }, g);
  [[260, 610, 60], [980, 640, 44], [560, 690, 34]].forEach(([x, y, w]) => { E('ellipse', { cx: x, cy: y, rx: w, ry: w * 0.28, fill: '#7A2410', opacity: 0.7 }, g); E('path', { d: `M${x - w},${y} Q${x},${y - w * 0.4} ${x + w},${y}`, fill: 'none', stroke: '#E87A4E', 'stroke-width': 3 }, g); });
  // earlier wrecks (n - 1 shown)
  const wrecks = [];
  [[430, 560, -20], [850, 535, 30], [330, 575, 60], [960, 560, -40], [520, 585, 10], [770, 590, -70]].forEach(([x, y, a]) => {
    const w = G(g); tr(w, x, y, 0.55, a);
    E('rect', { x: -26, y: -18, width: 52, height: 36, rx: 6, fill: '#C9A24A', stroke: SC_INK, 'stroke-width': 3 }, w);
    E('path', { d: 'M26,-6 L70,-14 L70,10 L26,6 Z', fill: '#2E4C8C', stroke: SC_INK, 'stroke-width': 3 }, w);
    wrecks.push(w);
  });
  // the falling spacecraft: gold body, two solar panels, a dish
  const sc = G(g), scI = G(sc);
  E('path', { d: 'M-130,-16 L-46,-22 L-46,22 L-130,16 Z M130,-16 L46,-22 L46,22 L130,16 Z', fill: '#2E4C8C', stroke: SC_INK, 'stroke-width': 3 }, scI);
  E('path', { d: 'M-110,-18 V18 M-88,-20 V20 M-66,-21 V21 M110,-18 V18 M88,-20 V20 M66,-21 V21', stroke: '#6E9CE0', 'stroke-width': 2 }, scI);
  E('rect', { x: -46, y: -36, width: 92, height: 72, rx: 8, fill: linGrad('#FFE27A', '#C9A24A', true), stroke: SC_INK, 'stroke-width': 4 }, scI);
  E('path', { d: 'M-22,-36 Q0,-70 22,-36 Z', fill: '#E6EBEF', stroke: SC_INK, 'stroke-width': 3 }, scI);
  const flame = E('path', { d: 'M-12,36 Q0,90 12,36 Z', fill: '#FF8A3D', stroke: '#FFE45C', 'stroke-width': 3 }, scI);
  // the crash puff and POUF
  const puff = G(g); tr(puff, 700, 520);
  const pc = [[-60, -10, 54], [0, -40, 70], [60, -8, 56], [-20, 20, 50], [40, 24, 46]].map(([x, y, rr]) => E('circle', { cx: x, cy: y, r: rr, fill: '#F2C7A0', stroke: '#8E2E14', 'stroke-width': 4 }, puff));
  const pouf = T(puff, 0, -10, 'POUF', { size: 64, weight: 800, anchor: 'middle', fill: '#8E2E14' });
  // banner and counter
  const bn = G(g); tr(bn, 860, 70);
  E('rect', { x: -250, y: -30, width: 500, height: 60, rx: 12, fill: '#0E0A10', stroke: '#FFC247', 'stroke-width': 4, opacity: 0.92 }, bn);
  T(bn, 0, 12, 'MEANWHILE, ON MARS', { size: 34, weight: 800, anchor: 'middle', fill: '#FFC247', ls: 3 });
  const ct = G(g); tr(ct, 900, 680);
  E('rect', { x: -230, y: -30, width: 460, height: 60, rx: 12, fill: '#0E0A10', opacity: 0.85 }, ct);
  const ctT = T(ct, 0, 12, 'SPACECRAFT LOST: 1', { size: 34, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  g.ground = 520;
  g.set = (p, n) => {
    n = Math.max(1, Math.round(n || 1));
    wrecks.forEach((w, i) => op(w, i < n - 1 ? 1 : 0));
    const f = clamp(p / 0.62), crashed = p >= 0.62;
    op(sc, crashed ? 0 : 1);
    if (!crashed) { tr(sc, lerp(260, 700, f), lerp(-60, 500, f * f), 0.9, lerp(-30, 20, f)); op(flame, Math.sin(p * 80) > 0 ? 1 : 0.4); }
    const q = clamp((p - 0.62) / 0.3);
    op(puff, crashed ? 1 : 0);
    pc.forEach((c, i) => attr(c, 'r', (0.3 + 0.7 * pop(q)) * [54, 70, 56, 50, 46][i]));
    op(pouf, q > 0.3 ? 1 : 0);
    const shown = crashed ? n : n - 1;
    setText(ctT, 'SPACECRAFT LOST: ' + Math.max(0, shown));
  };
  g.set(0, 1);
  return g;
}

/* ---------- props ---------- */
function lcTag(parent, text, o) {
  o = o || {};
  const s = o.size || 30, g = G(parent);
  const w = Math.max(110, textWidth(String(text), s, FD, 800) + 48), h = s * 2;
  E('path', { d: `M0,0 Q-10,-20 0,-34 Q10,-20 0,0`, fill: 'none', stroke: '#C62828', 'stroke-width': 4 }, g);
  E('path', { d: `M0,0 L${w * 0.5},${-h / 2} L${w},${-h / 2} L${w},${h / 2} L${w * 0.5},${h / 2} Z`, transform: 'translate(-6 0)', fill: o.col || '#FFF6D6', stroke: '#8B6B3A', 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
  E('circle', { cx: 8, cy: 0, r: 5, fill: '#FFFFFF', stroke: '#8B6B3A', 'stroke-width': 2 }, g);
  g.label = T(g, w * 0.5 + w * 0.22, s * 0.36, String(text), { size: s, weight: 800, anchor: 'middle', fill: SC_INK });
  return g;
}

function lcSuitcase(parent, o) {
  o = o || {};
  const g = G(parent), inner = G(g); tr(inner, 0, 0, o.s || 1);
  const w = o.w || 150, h = o.h || 190, col = o.col || '#2E7DD8';
  [-w / 2 + 22, w / 2 - 22].forEach(x => E('circle', { cx: x, cy: -8, r: 9, fill: '#2A2E34', stroke: SC_INK, 'stroke-width': 2 }, inner));
  E('path', { d: `M-24,${-h - 14} V${-h - 50} H24 V${-h - 14}`, fill: 'none', stroke: '#5A6670', 'stroke-width': 7 }, inner);
  E('rect', { x: -w / 2, y: -h - 16, width: w, height: h, rx: 18, fill: linGrad(scShade(col, 0.15), scShade(col, -0.2), false), stroke: SC_INK, 'stroke-width': 4 }, inner);
  let rib = ''; for (let i = 1; i < 4; i++) rib += `M${-w / 2 + i * w / 4},${-h - 6} V-26 `;
  E('path', { d: rib, stroke: scShade(col, -0.3), 'stroke-width': 4, opacity: 0.6 }, inner);
  g.tag = null;
  if (o.tag !== undefined && o.tag !== '') { g.tag = lcTag(inner, o.tag, { size: 28 }); tr(g.tag, w / 2 - 8, -h - 6, 1, 70); }
  return g;
}

function lcBottle(parent, o) {
  o = o || {};
  const g = G(parent), inner = G(g); tr(inner, 0, 0, o.s || 1);
  const col = o.col || '#FF8FC8';
  E('path', { d: 'M-40,0 L-40,-96 Q-40,-120 -16,-124 L-16,-140 L16,-140 L16,-124 Q40,-120 40,-96 L40,0 Q40,6 34,6 L-34,6 Q-40,6 -40,0 Z', fill: col, stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, inner);
  E('rect', { x: -20, y: -162, width: 40, height: 24, rx: 5, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, inner);
  E('rect', { x: -32, y: -84, width: 64, height: 54, rx: 6, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 2.5 }, inner);
  g.label = T(inner, 0, -48, o.label || '0.25 l', { size: 24, weight: 800, anchor: 'middle', fill: SC_INK });
  E('path', { d: 'M-28,-110 L-28,-10', stroke: '#FFFFFF', 'stroke-width': 5, opacity: 0.45, 'stroke-linecap': 'round' }, inner);
  return g;
}

function lcWaySign(parent, rows, o) {
  o = o || {};
  const s = o.size || 32, w = o.w || 440, rh = s * 1.7, g = G(parent);
  E('path', { d: `M${-w / 2 + 40},-40 V0 M${w / 2 - 40},-40 V0`, stroke: '#5A6670', 'stroke-width': 4 }, g);
  E('rect', { x: -w / 2, y: 0, width: w, height: rh * rows.length + 16, rx: 10, fill: '#14161A', stroke: '#3A4250', 'stroke-width': 3 }, g);
  const hls = [];
  rows.forEach(([text, ar], i) => {
    const y = 8 + i * rh;
    const hl = E('rect', { x: -w / 2 + 6, y, width: w - 12, height: rh, rx: 6, fill: 'none', stroke: '#FFC247', 'stroke-width': 4, opacity: 0 }, g); hls.push(hl);
    T(g, -w / 2 + 22, y + rh * 0.68, text, { size: s, weight: 700, fill: '#FFD23F' });
    if (ar) T(g, w / 2 - 22, y + rh * 0.68, ar, { size: s, weight: 800, anchor: 'end', fill: '#FFD23F' });
    if (i) E('line', { x1: -w / 2 + 12, y1: y, x2: w / 2 - 12, y2: y, stroke: '#3A4250', 'stroke-width': 2 }, g);
  });
  g.hl = (i, p) => { if (hls[i]) attr(hls[i], 'opacity', clamp(p)); };
  g.H = rh * rows.length + 16;
  return g;
}

function lcFlightMap(parent, o) {
  o = o || {};
  const g = G(parent), w = 560, h = 330;
  E('rect', { x: -w / 2 - 14, y: -h / 2 - 14, width: w + 28, height: h + 28, rx: 18, fill: '#14161A' }, g);
  E('rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: 8, fill: linGrad('#0E2A4A', '#1E4E7A', true) }, g);
  // blobby land: Asia, Europe
  E('path', { d: 'M-280,-60 Q-200,-120 -100,-110 Q-20,-130 60,-90 Q120,-40 80,10 Q40,60 -60,40 Q-160,90 -240,40 Q-290,0 -280,-60 Z', fill: '#3E6E4A', opacity: 0.85 }, g);
  E('path', { d: 'M140,-150 Q230,-160 270,-110 Q280,-40 220,-20 Q160,-30 130,-80 Q120,-130 140,-150 Z', fill: '#3E6E4A', opacity: 0.85 }, g);
  const route = 'M-180,110 Q20,-140 210,-90';
  E('path', { d: route, fill: 'none', stroke: '#FFFFFF', 'stroke-width': 3, 'stroke-dasharray': '8 8', opacity: 0.7 }, g);
  const done = E('path', { d: route, fill: 'none', stroke: '#FFC247', 'stroke-width': 5 }, g); mkDash(done);
  [[-180, 110, 'SIN'], [210, -90, 'LHR']].forEach(([x, y, l]) => { E('circle', { cx: x, cy: y, r: 9, fill: '#FFFFFF', stroke: '#FFC247', 'stroke-width': 3 }, g); T(g, x + (x < 0 ? 0 : -6), y + (y > 0 ? -18 : 40), l, { size: 26, weight: 800, anchor: 'middle', fill: '#FFFFFF' }); });
  const pl = G(g);
  E('path', { d: 'M18,0 L-14,-6 L-22,-22 L-28,-22 L-24,-4 L-30,-2 L-34,-10 L-38,-10 L-36,0 L-38,10 L-34,10 L-30,2 L-24,4 L-28,22 L-22,22 L-14,6 Z', fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 2 }, pl);
  // readouts panel
  const rd = G(g); tr(rd, -w / 2 + 14, h / 2 - 14);
  const rows = [0, 1, 2].map(i => {
    const b = G(rd); tr(b, 0, -i * 46);
    E('rect', { x: 0, y: -40, width: 350, height: 40, rx: 6, fill: 'rgba(0,0,0,0.55)' }, b);
    const l = T(b, 10, -11, '', { size: 24, weight: 600, fill: '#C9DCE8', font: FB }), v = T(b, 340, -11, '', { size: 26, weight: 800, anchor: 'end', fill: '#FFFFFF' });
    return { b, l, v };
  });
  const bez = q => { const a = [-180, 110], c = [20, -140], b = [210, -90], u = 1 - q; return [u * u * a[0] + 2 * u * q * c[0] + q * q * b[0], u * u * a[1] + 2 * u * q * c[1] + q * q * b[1]]; };
  g.set = st => {
    const p = clamp(st.p === undefined ? 0.8 : st.p), [x, y] = bez(p), [x2, y2] = bez(Math.min(1, p + 0.01));
    mkDraw(done, p); tr(pl, x, y, 1, Math.atan2(y2 - y, x2 - x) * 180 / Math.PI);
    const rr = st.rows || [];
    rows.forEach((r, i) => { const d = rr[rr.length - 1 - i]; op(r.b, d ? 1 : 0); if (d) { if (r.l.textContent !== d[0]) r.l.textContent = d[0]; if (r.v.textContent !== d[1]) r.v.textContent = d[1]; } });
  };
  g.set(o);
  return g;
}

function lcRoadSign(parent, rows, o) {
  o = o || {};
  const w = o.w || 420, rh = 54, g = G(parent), top = o.title ? 60 : 16;
  E('path', { d: `M${-w / 2 + 50},0 V${top + rh * rows.length + 160} M${w / 2 - 50},0 V${top + rh * rows.length + 160}`, stroke: '#8F9CAB', 'stroke-width': 10 }, g);
  E('rect', { x: -w / 2, y: 0, width: w, height: top + rh * rows.length + 18, rx: 14, fill: '#1E4FA8', stroke: '#FFFFFF', 'stroke-width': 6 }, g);
  if (o.title) { E('rect', { x: -40, y: 12, width: 80, height: 40, rx: 4, fill: '#1E4FA8', stroke: '#FFFFFF', 'stroke-width': 3 }, g); T(g, 0, 42, o.title, { size: 28, weight: 800, anchor: 'middle', fill: '#FFFFFF' }); }
  rows.forEach(([place, d], i) => {
    const y = top + 40 + i * rh;
    T(g, -w / 2 + 26, y, place, { size: 34, weight: 700, fill: '#FFFFFF', font: FB });
    T(g, w / 2 - 26, y, String(d), { size: 34, weight: 800, anchor: 'end', fill: '#FFFFFF', font: FB });
  });
  return g;
}

function lcPhone(parent, o) {
  o = o || {};
  const g = G(parent);
  E('rect', { x: -110, y: -200, width: 220, height: 400, rx: 30, fill: '#1A1E24', stroke: SC_INK, 'stroke-width': 4 }, g);
  E('rect', { x: -96, y: -176, width: 192, height: 352, rx: 14, fill: linGrad('#4AA0E8', '#9CD0F5', true) }, g);
  E('rect', { x: -30, y: -192, width: 60, height: 8, rx: 4, fill: '#3A4250' }, g);
  const city = T(g, 0, -126, o.city || 'London', { size: 30, weight: 700, anchor: 'middle', fill: '#FFFFFF' });
  const sunG = G(g); tr(sunG, -40, -66);
  E('circle', { r: 26, fill: '#FFE45C' }, sunG);
  E('ellipse', { cx: 30, cy: 12, rx: 36, ry: 18, fill: '#FFFFFF' }, sunG);
  const temp = T(g, -6, 40, o.temp || '50°', { size: 84, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  const ug = G(g); tr(ug, 0, 104);
  const uglow = E('rect', { x: -50, y: -28, width: 100, height: 46, rx: 12, fill: '#FFE45C', opacity: 0 }, ug);
  const unit = T(ug, 0, 6, o.unit || '°F', { size: 34, weight: 800, anchor: 'middle', fill: '#14324E' });
  g.set = st => { if (st.temp !== undefined) setText(temp, st.temp); if (st.unit !== undefined) setText(unit, st.unit); if (st.city !== undefined) setText(city, st.city); attr(uglow, 'opacity', clamp(st.p || 0)); };
  return g;
}

function lcRosette(parent) {
  const g = G(parent), inner = G(g);
  E('path', { d: 'M-18,20 L-34,74 L-18,64 L-8,80 L2,26 Z M18,20 L34,74 L18,64 L8,80 L-2,26 Z', fill: '#2E7DD8', stroke: SC_INK, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, inner);
  let pt = ''; for (let i = 0; i < 16; i++) { const a0 = i / 16 * TAU, a1 = (i + 0.5) / 16 * TAU; pt += `${i ? 'L' : 'M'}${(Math.cos(a0) * 44).toFixed(1)},${(Math.sin(a0) * 44).toFixed(1)} L${(Math.cos(a1) * 36).toFixed(1)},${(Math.sin(a1) * 36).toFixed(1)} `; }
  E('path', { d: pt + 'Z', fill: '#FFC247', stroke: SC_INK, 'stroke-width': 2.5 }, inner);
  E('circle', { r: 30, fill: '#FFF4CF', stroke: '#E2A21C', 'stroke-width': 3 }, inner);
  T(inner, 0, 15, '✓', { size: 44, weight: 800, anchor: 'middle', fill: '#1E9E5A' });
  g.set = (p, fall) => {
    const f = clamp(fall || 0), q = clamp(p);
    op(g, q > 0.01 ? 1 - clamp((f - 0.8) / 0.2) : 0);
    inner.setAttribute('transform', `translate(${(30 * f).toFixed(1)} ${(260 * f * f).toFixed(1)}) rotate(${(200 * f).toFixed(1)}) scale(${Math.max(0.01, 0.4 + 0.6 * pop(q)).toFixed(3)})`);
  };
  g.set(0, 0);
  return g;
}
