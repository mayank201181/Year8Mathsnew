/* ALL THE RIGHT ANGLES (Claude Sitcom Ep 13, Angles, Parallel Lines & Polygons): the cast, sets and props of
   this episode. Bundled after engine lib.js, kit.js, mathkit.js and sitcom.js (scMake, scTalk, scKavya,
   scCastHuman, scConfessional, scLowerThird, scVideoCall, mk* maths kit). Every top-level name starts with `ag`,
   except `cast`.

   Characters: cast(parent, kind, o) -> g, origin at the character's centre, about 200-260 px tall at s = 1
     o: { s (scale), mood (default mood), ... }   (humans: any scHuman option overrides, e.g. prop, lift)
     g.set({ t, talk, mood, look, sweat, still, ... })   call every frame
       talk 0..1 (use scTalk(S, t, who)); mood: neutral | happy | smug | annoyed | sad | shock | deadpan
       look -1..1 pupils left/right; still: true stops the idle bob
     HUMANS (busts, bottom of the shirt at y = 140, so put them behind the kitchen island or the frame edge):
       'kavya'  (kavya)  Kavya, 12 (scKavya, PE shirt "8")
       'mum'    (mum)    Mum: magenta kurta, bun, bindi. Default prop: a tablet showing the tile catalogue
       'dad'    (dad)    Dad: glasses, moustache, green polo. Default prop: a protractor (his running gag)
       'boy'    (boy)    Ah Boy, 8: orange star tee. Default prop: kitchen scissors. g.tools.scissors / g.tools.broom
                         (op() them; the broom replaces the scissors in cold.sweep). lift: 1 raises the hand
       'priya'  (priya)  Priya, 12: school uniform, bob, yellow clip. Default prop: a pencil
       'tan'    (tan)    Mr Tan, maths teacher and upstairs neighbour: shirt and tie, glasses. Default prop: a marker
       Pass { prop: null } for no prop; { body: true } for a full body (scHumanBody, feet at 0,0; pose API).
     CARTOONS (scMake):
       'rex'    (rex)    Rex, the RIGHT ANGLE: a chunky grey-blue "L" (two beams meeting at a vertex), his head is the
                         little yellow right-angle SQUARE sitting in the corner, a yellow inspector's hard hat. Stiff,
                         exacting. Default deadpan. Vertex at (-70, 74) (g.vertex). Extra: g.set({ open: deg }) swings the
                         upright arm so the angle between his arms is `open` (default 90; 180 = lying flat);
                         { twitch: 0..1 } jitters him (open +-3 degrees) and shakes the head.
       'parlel' (para, lel) Para and Lel, PARALLEL LINES, an old married couple: two long horizontal chalk-white lines
                         (about 420 long, 120 apart) with matching ">" arrow marks, heads at their left ends. Para (top,
                         face A: grey flat cap, moustache), Lel (bottom, face B: grey bun, pearls).
                         Use talk (Para) and talkB (Lel), mood / moodB, look / lookB. g.gap = 120, g.len = 420.
       'trev'   (trev)   Trevor, the TRANSVERSAL: a long orange line with a cheeky head (spiky hair) at its upper end.
                         o.ang: the line's angle above the horizontal (default 65), o.len (default 420). The line runs
                         through the origin (its midpoint). g.ends = [[x, y] lower, [x, y] upper] (head at upper).
       'kitty'  (kitty)  Kitty, a KITE (Ah Boy's cardboard kite): red and yellow panels, cross spars (diagonals at 90 deg),
                         long eyelashes, a tail with three bows that sways. Glamorous: "darling". Default smug.
       'roomby' (roomby) Roomby, a ROBOT VACUUM (front three-quarter view): grey disc, blue LED face panel, a spinning
                         side brush. Deadpan voice. Extra: { spin: 0..1 } brush speed; { beep: 0..1 } flashes the LED ring.
       'bea'    (bea)    Bea, a BEE from the honey jar: round yellow body with black stripes, flapping wings, antennae,
                         a hexagon badge. Bubbly. Default happy. Extra: { buzz: 0..1 } wing speed (default 1).

   Shots
     agConf(parent, who)             confessional background tinted for that character (scConfessional); g.set(p, t)
     AG_TINT                         the confessional colours per character
     agLowerThird(parent, who)       scLowerThird with this episode's name and role for `who` (AG_LT); g.set(p)

   Sets (full stage 1200 x 750; each returns g)
     agKitchen(parent)    the HDB kitchen (front view): pastel wall tiles, a window with a grille (parallel bars), upper
                          cabinets, a hob and a kettle on the back counter, the fridge (right), a wall clock, a little shelf
                          with the HONEY jar (g.honey = [x, y], Bea's home), a calendar. A kitchen ISLAND in front: LAYERS:
                          put characters in g.mid (behind the island: a bust at y about 440 hides its shirt hem), the
                          island is g.front, props standing on the island go in g.top (drawn last). g.counterY = 530.
                          g.clock(t) sets the clock hands from a time in hours (8.25 = 8:15). g.upd(t) idles the kettle steam.
     agFloor(parent, o)   the kitchen floor seen from ABOVE (a floor plan), for laying tiles. The floor fills
                          g.box = { x, y, w, h } (default x 140, y 110, w 920, h 540); thick walls run along its LEFT and
                          BOTTOM edges and meet at Rex's corner g.corner = [x, y] (bottom-left). o.pattern: 'old' (worn
                          square tiles), 'bare' (grey screed, after the old tiles are up) or 'new' (octagons and squares).
                          For 'new': g.lay(p) lays the tiles row by row from Rex's corner (0..1); g.oct(i) / g.sq(i) are
                          the tile elements, g.octW the octagon width. o.clip: false to let tiles overhang.
     agTitleBg(parent)    the title-card background (teal, with angle rays and a faint tile pattern); g.upd(t)

   Props (around their own origin)
     agStamp(parent, ok)             mkStamp 'APPROVED' (green, ok true) or 'REJECTED' (red); g.set(p). About 520 px
                                     wide at scale 1: scale the returned g (tr(g, x, y, 0.6)).
     agScissors(parent, o)           kitchen scissors seen flat, pivot at (0,0), blades pointing right, handles left.
                                     g.set(deg) opens them: the blades make an X with `deg` between them (the right-hand
                                     and left-hand angles are deg, top and bottom are 180 - deg). o: len (blade, 190),
                                     col (handles). g.dir(i) returns the screen angle (maths degrees) of arm i:
                                     0 upper blade, 1 lower blade, 2 upper handle side, 3 lower handle side.
     agProtractorProp(parent, s)     Dad's small plastic protractor (semicircle with ticks), straight edge at y = 0
     agBroom(parent, s)              a broom (for Ah Boy), the grip at (0,0), bristles up
     agTileBox(parent, o)            a cardboard box of tiles with an octagon-and-square sample on the side; base centre
                                     at (0,0), about 200 x 130. o: label ('OCTAGON TILES')
     agTileSample(parent, s)         one octagon with a square, as a sample tile, centred
     agHoney(parent, s)              a honey jar with a hexagon label, base centre at (0,0), about 90 tall
     agFootball(parent, r)           Ah Boy's football (pentagon in the middle, hexagons around), centred, radius r (60)
     agRoombyTop(parent, r)          the robot vacuum from above (for driving round polygons): disc, bumper, a heading
                                     arrow pointing to +x. Rotate it with tr(g, x, y, 1, heading) (screen degrees).
     agPhone(parent, o)              a phone playing "DIY TILING" with a progress bar; centred, 220 x 380.
                                     g.set(progress 0..1); o: title, speed ('2×')
*/

/* ---------- confessional tints, lower thirds ---------- */
const AG_TINT = {
  rex: ['#1A2430', '#33485C'], parlel: ['#2A2234', '#4A3C5E'], para: ['#2A2234', '#4A3C5E'], lel: ['#2A2234', '#4A3C5E'],
  trev: ['#3A2010', '#6B3A14'], kitty: ['#3A1020', '#6B1E3A'], roomby: ['#102A30', '#1E4E58'], bea: ['#3A3010', '#6B5414'],
  kavya: ['#14243A', '#25446B'], dad: ['#123026', '#245A48'], mum: ['#3A1030', '#6B1E58'], boy: ['#3A2410', '#6B4414'],
  priya: ['#1A2240', '#33407A'], tan: ['#1A2A3A', '#33506E'],
};
function agConf(parent, who) { const c = AG_TINT[who] || AG_TINT.rex; return scConfessional(parent, c[0], c[1]); }
const AG_LT = {
  rex: ['REX', 'Right angle. Exactly 90°. Inspector.'],
  para: ['PARA & LEL', 'Parallel lines. Married 40 years.'],
  parlel: ['PARA & LEL', 'Parallel lines. Married 40 years.'],
  lel: ['PARA & LEL', 'Parallel lines. Married 40 years.'],
  trev: ['TREVOR', 'Transversal. Crosses lines.'],
  kitty: ['KITTY', 'A kite. A quadrilateral, darling.'],
  roomby: ['ROOMBY', 'Robot vacuum. Turns at corners.'],
  bea: ['BEA', 'A bee. Lives on the honey jar.'],
  kavya: ['KAVYA, 12', 'Reluctant tiler.'],
  mum: ['MUM', 'Chose the tiles.'],
  dad: ['DAD', '"I watched a video."'],
  boy: ['AH BOY, 8', "Kavya's brother. Has scissors."],
  priya: ['PRIYA', 'Best friend. Watched two videos.'],
  tan: ['MR TAN', 'Maths teacher. Lives upstairs.'],
};
function agLowerThird(parent, who) { const l = AG_LT[who] || [String(who).toUpperCase(), '']; return scLowerThird(parent, l[0], l[1]); }

/* ---------- small props used by the cast ---------- */
function agProtractorProp(parent, s) {
  const g = G(parent); tr(g, 0, 0, s || 1);
  E('path', { d: 'M-46,0 A46,46 0 0 1 46,0 Z', fill: 'rgba(200,232,255,0.85)', stroke: '#4A7FA8', 'stroke-width': 3 }, g);
  let d = '';
  for (let k = 0; k <= 18; k++) { const a = Math.PI * k / 18, L = k % 9 === 0 ? 12 : 7; d += `M${(-Math.cos(a) * 46).toFixed(1)},${(-Math.sin(a) * 46).toFixed(1)} L${(-Math.cos(a) * (46 - L)).toFixed(1)},${(-Math.sin(a) * (46 - L)).toFixed(1)} `; }
  E('path', { d, stroke: '#1E3A5F', 'stroke-width': 2 }, g);
  E('path', { d: 'M-18,0 A18,18 0 0 1 18,0', fill: 'none', stroke: '#9FD8FF', 'stroke-width': 2 }, g);
  E('circle', { cx: 0, cy: 0, r: 3, fill: '#1E3A5F' }, g);
  return g;
}
function agBroom(parent, s) {
  const g = G(parent); tr(g, 0, 0, s || 1);
  E('line', { x1: 0, y1: 30, x2: 0, y2: -120, stroke: '#9C6B3E', 'stroke-width': 8, 'stroke-linecap': 'round' }, g);
  E('path', { d: 'M-34,-118 L34,-118 L26,-170 L-26,-170 Z', fill: '#E8C35A', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
  E('path', { d: 'M-18,-122 L-14,-166 M-6,-122 L-5,-166 M6,-122 L5,-166 M18,-122 L14,-166', stroke: '#B08A2A', 'stroke-width': 2.5 }, g);
  E('rect', { x: -30, y: -126, width: 60, height: 12, rx: 4, fill: '#E8424F', stroke: SC_INK, 'stroke-width': 2.5 }, g);
  return g;
}

/* ---------- scissors: the X of two crossing lines ---------- */
function agScissors(parent, o) {
  o = o || {};
  const L = o.len || 190, Lh = L * 0.5, col = o.col || '#E8424F', g = G(parent);
  const mk = (i) => {
    const a = G(g);
    // blade (towards +x)
    E('path', { d: `M0,${i ? 7 : -7} L${L},0 L${L * 0.15},${i ? -9 : 9} Z`, fill: linGrad('#F2F6FA', '#A9B6C2', true), stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, a);
    // handle (towards -x) with a loop
    E('path', { d: `M0,0 L${-Lh},0`, stroke: col, 'stroke-width': 13, 'stroke-linecap': 'round' }, a);
    E('ellipse', { cx: -Lh - 26, cy: 0, rx: 30, ry: 20, fill: 'none', stroke: col, 'stroke-width': 11 }, a);
    E('ellipse', { cx: -Lh - 26, cy: 0, rx: 30, ry: 20, fill: 'none', stroke: SC_INK, 'stroke-width': 2, opacity: 0.6 }, a);
    return a;
  };
  const b0 = mk(0), b1 = mk(1);
  E('circle', { r: 9, fill: '#C9D3DC', stroke: SC_INK, 'stroke-width': 3 }, g);
  let cur = 30;
  g.set = deg => { cur = deg; tr(b0, 0, 0, 1, -deg / 2); tr(b1, 0, 0, 1, deg / 2); };
  g.dir = i => [cur / 2, -cur / 2, 180 - cur / 2, 180 + cur / 2][i];
  g.set(o.deg || 30);
  return g;
}

/* ---------- the cast ---------- */
const AG_PROP = { mum: 'tablet', dad: null, boy: null, priya: 'pencil', tan: 'marker' };
function cast(parent, kind, o) {
  o = o || {};
  if (kind === 'kavya') return scKavya(parent, o);
  if (SC_HUMANS[kind]) {
    const p = Object.assign({}, (kind === 'dad' || kind === 'boy') ? { hand: true } : { prop: AG_PROP[kind] }, o);
    const c = scCastHuman(parent, kind, p);
    if (c.hand && !('prop' in o) && o.hand === undefined) {
      if (kind === 'dad') { const pr = agProtractorProp(c.hand, 1); tr(pr, 0, -40, 1, -10); c.tools = { protractor: pr }; }
      if (kind === 'boy') {
        const sc = G(c.hand); const s = agScissors(sc, { len: 130, deg: 26 }); tr(sc, 0, -10, 0.95, -80); s.set(26);
        const br = agBroom(c.hand, 1.15); op(br, 0);
        c.tools = { scissors: sc, scissorsX: s, broom: br };
      }
    }
    return c;
  }
  const S = { s: o.s, mood: o.mood };
  let c;
  if (kind === 'rex') {
    let armV = null, head = null, VX = -70, VY = 74;
    c = scMake(parent, Object.assign(S, { seed: 4, bob: 1.5, mood: o.mood || 'deadpan',
      draw: g => {
        // the floor arm (to the right of the vertex)
        E('rect', { x: VX - 34, y: VY, width: 250, height: 34, rx: 8, fill: linGrad('#9FB4C8', '#6F86A0', true), stroke: SC_INK, 'stroke-width': 5 }, g);
        E('path', { d: `M${VX + 196},${VY + 8} L${VX + 210},${VY + 17} L${VX + 196},${VY + 26}`, fill: 'none', stroke: '#E9F1F8', 'stroke-width': 3, opacity: 0.6 }, g);
        // little feet under the floor arm
        [VX + 10, VX + 170].forEach(x => E('path', { d: `M${x - 16},${VY + 50} Q${x - 16},${VY + 34} ${x + 2},${VY + 34} L${x + 18},${VY + 36} Q${x + 24},${VY + 50} ${x + 16},${VY + 52} Z`, fill: '#2A3B44', stroke: SC_INK, 'stroke-width': 3 }, g));
        // the upright arm (animated about the vertex)
        armV = G(g);
        E('rect', { x: -34, y: -236, width: 34, height: 250, rx: 8, fill: linGrad('#9FB4C8', '#6F86A0', false), stroke: SC_INK, 'stroke-width': 5 }, armV);
        E('path', { d: 'M-25,-206 L-17,-222 L-9,-206', fill: 'none', stroke: '#E9F1F8', 'stroke-width': 3, opacity: 0.6 }, armV);
        // the head: the right-angle square in the corner
        head = G(g);
        E('rect', { x: 0, y: -120, width: 120, height: 120, rx: 10, fill: linGrad('#FFE45C', '#F2B705', true), stroke: SC_INK, 'stroke-width': 5 }, head);
        E('rect', { x: 8, y: -112, width: 104, height: 104, rx: 6, fill: 'none', stroke: '#FFF6B8', 'stroke-width': 3, opacity: 0.7 }, head);
        // inspector's hard hat
        const hat = G(head); tr(hat, 60, -122);
        E('path', { d: 'M-46,2 Q-46,-40 0,-42 Q46,-40 46,2 Z', fill: '#FFC247', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, hat);
        E('rect', { x: -60, y: -2, width: 120, height: 12, rx: 5, fill: '#F2A20C', stroke: SC_INK, 'stroke-width': 3 }, hat);
        E('path', { d: 'M-8,-40 L-8,-4 M8,-40 L8,-4', stroke: '#F2A20C', 'stroke-width': 4 }, hat);
      },
      face: { x: VX + 130, y: VY - 70, eye: 15, gap: 50, mouthW: 34, mouthY: 32, lidCol: '#F2C40C' },
      upd: (t, g, st) => {
        const tw = clamp(st.twitch || 0), jit = tw * (Math.sin(t * 61) * 2.4 + Math.sin(t * 37) * 1.2);
        const open = (st.open === undefined ? 90 : st.open) + jit;
        tr(armV, VX, VY, 1, 90 - open);
        tr(head, VX, VY, 1, tw * Math.sin(t * 47) * 2.5 + (open > 120 ? -(open - 90) * 0.25 : 0));
      } }));
    // the face sits on the head square, so move it into the head group (it rotates with the head)
    const inner = c.firstChild, faceEl = inner.lastChild;
    if (head && faceEl) { head.appendChild(faceEl); tr(faceEl, 60, -70); }
    c.vertex = [VX, VY];
  } else if (kind === 'parlel') {
    const LEN = 420, GAP = 120;
    c = scMake(parent, Object.assign(S, { seed: 7, bob: 1.5, mood: o.mood || 'neutral',
      draw: g => {
        [-GAP / 2, GAP / 2].forEach((y, i) => {
          E('path', { d: `M-120,${y} L${LEN - 120},${y}`, stroke: SC_INK, 'stroke-width': 22, 'stroke-linecap': 'round' }, g);
          E('path', { d: `M-120,${y} L${LEN - 120},${y}`, stroke: i ? '#FFE3EE' : '#E6F4FF', 'stroke-width': 14, 'stroke-linecap': 'round' }, g);
          E('path', { d: `M${150},${y - 12} L${166},${y} L${150},${y + 12}`, fill: 'none', stroke: '#E8424F', 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
          // heads at the left ends
          E('circle', { cx: -150, cy: y, r: 44, fill: i ? '#F7C9D8' : '#CFE3F5', stroke: SC_INK, 'stroke-width': 4 }, g);
        });
        // Para: flat cap and moustache (top). Lel: grey bun and pearls (bottom)
        const cap = G(g); tr(cap, -150, -GAP / 2 - 30);
        E('path', { d: 'M-40,8 Q-36,-20 0,-22 Q36,-20 40,8 Z', fill: '#6B7A88', stroke: SC_INK, 'stroke-width': 3.5 }, cap);
        E('path', { d: 'M24,4 Q56,0 60,10 Q44,14 24,10 Z', fill: '#55626E', stroke: SC_INK, 'stroke-width': 3 }, cap);
        const bun = G(g); tr(bun, -150, GAP / 2 - 46);
        E('circle', { cx: 0, cy: -6, r: 18, fill: '#C9CFD6', stroke: SC_INK, 'stroke-width': 3 }, bun);
        E('path', { d: 'M-40,14 Q-30,-14 0,-14 Q30,-14 40,14 Q20,2 0,2 Q-20,2 -40,14 Z', fill: '#C9CFD6', stroke: SC_INK, 'stroke-width': 3 }, bun);
        for (let k = 0; k < 7; k++) { const a = Math.PI * (0.2 + 0.6 * k / 6); E('circle', { cx: -150 + Math.cos(a) * 40, cy: GAP / 2 + 40 + Math.sin(a) * 14, r: 5, fill: '#FFFFFF', stroke: '#8F9CAB', 'stroke-width': 1.5 }, g); }
      },
      face: { x: -150, y: -GAP / 2 - 2, eye: 11, gap: 34, mouthW: 22, mouthY: 22, lidCol: '#CFE3F5' },
      faceB: { x: -150, y: GAP / 2 - 2, eye: 11, gap: 34, mouthW: 22, mouthY: 22, lidCol: '#F7C9D8' } }));
    const inner = c.firstChild, mo = G(inner); tr(mo, -150, -GAP / 2 + 13);
    E('path', { d: 'M0,-3 C-8,-8 -20,-6 -24,2 C-16,0 -8,2 0,1 C8,2 16,0 24,2 C20,-6 8,-8 0,-3 Z', fill: '#E6EBEF', stroke: SC_INK, 'stroke-width': 2 }, mo);
    c.gap = GAP; c.len = LEN;
  } else if (kind === 'trev') {
    const ang = o.ang === undefined ? 65 : o.ang, len = o.len || 420, ra = ang * Math.PI / 180;
    const ux = Math.cos(ra), uy = -Math.sin(ra), lo = [-ux * len / 2, -uy * len / 2], hi = [ux * len / 2, uy * len / 2];
    const hx = hi[0] + ux * 40, hy = hi[1] + uy * 40;
    c = scMake(parent, Object.assign(S, { seed: 11, bob: 3, mood: o.mood || 'happy',
      draw: g => {
        E('path', { d: `M${lo[0].toFixed(1)},${lo[1].toFixed(1)} L${hi[0].toFixed(1)},${hi[1].toFixed(1)}`, stroke: SC_INK, 'stroke-width': 24, 'stroke-linecap': 'round' }, g);
        E('path', { d: `M${lo[0].toFixed(1)},${lo[1].toFixed(1)} L${hi[0].toFixed(1)},${hi[1].toFixed(1)}`, stroke: '#FF8A3D', 'stroke-width': 16, 'stroke-linecap': 'round' }, g);
        // spiky hair, head
        let d = '';
        for (let k = 0; k < 7; k++) { const a = Math.PI * (1.05 + k * 0.9 / 6), r1 = 44, r2 = 70; d += `M${(hx + Math.cos(a - 0.12) * r1).toFixed(1)},${(hy + Math.sin(a - 0.12) * r1).toFixed(1)} L${(hx + Math.cos(a) * r2).toFixed(1)},${(hy + Math.sin(a) * r2).toFixed(1)} L${(hx + Math.cos(a + 0.12) * r1).toFixed(1)},${(hy + Math.sin(a + 0.12) * r1).toFixed(1)} Z `; }
        E('path', { d, fill: '#C25516', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
        E('circle', { cx: hx, cy: hy, r: 48, fill: ball('#FFB070', '#E06A1E'), stroke: SC_INK, 'stroke-width': 4.5 }, g);
        E('ellipse', { cx: hx - 30, cy: hy + 14, rx: 9, ry: 6, fill: '#FF5F5F', opacity: 0.45 }, g);
        E('ellipse', { cx: hx + 30, cy: hy + 14, rx: 9, ry: 6, fill: '#FF5F5F', opacity: 0.45 }, g);
      },
      face: { x: hx, y: hy - 4, eye: 13, gap: 38, mouthW: 26, mouthY: 24, lidCol: '#FFB070' } }));
    c.ends = [lo, hi]; c.ang = ang;
  } else if (kind === 'kitty') {
    const bows = [];
    c = scMake(parent, Object.assign(S, { seed: 15, bob: 5, mood: o.mood || 'smug',
      draw: g => {
        const T0 = [0, -130], R = [92, -40], B = [0, 150], Lf = [-92, -40];
        // tail (behind)
        const tail = E('path', { d: '', fill: 'none', stroke: SC_INK, 'stroke-width': 4, 'stroke-linecap': 'round' }, g);
        for (let k = 0; k < 3; k++) {
          const b = G(g);
          E('path', { d: 'M0,0 L-18,-11 L-18,11 Z M0,0 L18,-11 L18,11 Z', fill: ['#FF5FA2', '#FFE45C', '#4CC9F0'][k], stroke: SC_INK, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, b);
          bows.push(b);
        }
        g._tail = tail;
        // four panels
        E('path', { d: mkPoly([T0, R, [0, -40]]), fill: '#E8424F', stroke: SC_INK, 'stroke-width': 3 }, g);
        E('path', { d: mkPoly([T0, Lf, [0, -40]]), fill: '#FFC247', stroke: SC_INK, 'stroke-width': 3 }, g);
        E('path', { d: mkPoly([B, R, [0, -40]]), fill: '#FFC247', stroke: SC_INK, 'stroke-width': 3 }, g);
        E('path', { d: mkPoly([B, Lf, [0, -40]]), fill: '#E8424F', stroke: SC_INK, 'stroke-width': 3 }, g);
        E('path', { d: mkPoly([T0, R, B, Lf]), fill: 'none', stroke: SC_INK, 'stroke-width': 6, 'stroke-linejoin': 'round' }, g);
        // spars: the diagonals
        E('path', { d: 'M0,-126 L0,146 M-88,-40 L88,-40', stroke: '#9C6B3E', 'stroke-width': 6, 'stroke-linecap': 'round' }, g);
        // the right-angle mark where they cross
        E('path', { d: 'M0,-56 L16,-56 L16,-40', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 3 }, g);
        // face plate
        E('ellipse', { cx: 0, cy: 22, rx: 56, ry: 46, fill: '#FFF1D6', stroke: SC_INK, 'stroke-width': 3.5 }, g);
        // eyelashes
        [-1, 1].forEach(sd => E('path', { d: `M${sd * 18},4 l${sd * -4},-12 M${sd * 26},6 l${sd * 2},-12 M${sd * 33},10 l${sd * 8},-9`, stroke: SC_INK, 'stroke-width': 2.5, 'stroke-linecap': 'round' }, g));
      },
      face: { x: 0, y: 22, eye: 12, gap: 40, mouthW: 22, mouthY: 24, lidCol: '#FFF1D6', iris: '#7A1E48' },
      upd: (t, g, st) => {
        const pts = []; for (let k = 0; k <= 10; k++) { const y = 150 + k * 18; pts.push([Math.sin(t * 2.4 + k * 0.7) * (6 + k * 2.4), y]); }
        g._tail.setAttribute('d', 'M' + pts.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' L'));
        bows.forEach((b, i) => { const p = pts[3 + i * 3]; tr(b, p[0], p[1], 1, Math.sin(t * 2.4 + i) * 12); });
      } }));
  } else if (kind === 'roomby') {
    let brush = null, ring = null;
    c = scMake(parent, Object.assign(S, { seed: 19, bob: 0, mood: o.mood || 'deadpan',
      draw: g => {
        E('ellipse', { cx: 0, cy: 70, rx: 150, ry: 30, fill: 'rgba(0,0,0,0.25)' }, g);
        // body: side band and top
        E('path', { d: 'M-140,0 L-140,40 A140,40 0 0 0 140,40 L140,0 Z', fill: '#4A5568', stroke: SC_INK, 'stroke-width': 4 }, g);
        E('path', { d: 'M-140,22 A140,40 0 0 0 140,22', fill: 'none', stroke: '#2A3340', 'stroke-width': 8 }, g);   // bumper
        E('ellipse', { cx: 0, cy: 0, rx: 140, ry: 52, fill: linGrad('#E6EBEF', '#B9C4CE', true), stroke: SC_INK, 'stroke-width': 4 }, g);
        ring = E('ellipse', { cx: 0, cy: 0, rx: 104, ry: 36, fill: 'none', stroke: '#4CC9F0', 'stroke-width': 4, opacity: 0.4 }, g);
        // the face panel (a dark screen on the top)
        E('rect', { x: -64, y: -30, width: 128, height: 52, rx: 20, fill: '#1B2733', stroke: SC_INK, 'stroke-width': 3 }, g);
        E('circle', { cx: 92, cy: -10, r: 6, fill: '#56D69B' }, g);
        // side brush
        brush = G(g); tr(brush, -112, 50);
        for (let k = 0; k < 3; k++) E('line', { x1: 0, y1: 0, x2: 34 * Math.cos(k * 2.094), y2: 10 * Math.sin(k * 2.094), stroke: '#FFC247', 'stroke-width': 3, 'stroke-linecap': 'round' }, brush);
        E('circle', { r: 6, fill: '#2A3340' }, brush);
      },
      face: { x: 0, y: -6, eye: 11, gap: 44, mouthW: 22, mouthY: 16, lidCol: '#1B2733', iris: '#4CC9F0', brow: false },
      upd: (t, g, st) => {
        const sp = st.spin === undefined ? 0.6 : st.spin;
        brush.setAttribute('transform', `translate(-112 50) scale(1 0.32) rotate(${((t * 720 * sp) % 360).toFixed(1)})`);
        op(ring, 0.25 + 0.75 * clamp(st.beep || 0));
      } }));
  } else if (kind === 'bea') {
    let wings = [];
    c = scMake(parent, Object.assign(S, { seed: 23, bob: 8, mood: o.mood || 'happy',
      draw: g => {
        [-1, 1].forEach(sd => { const w = G(g); tr(w, sd * 40, -66); E('ellipse', { cx: sd * 34, cy: -28, rx: 44, ry: 28, fill: 'rgba(220,240,255,0.75)', stroke: SC_INK, 'stroke-width': 3 }, w); wings.push({ w, sd }); });
        // antennae
        [-1, 1].forEach(sd => { E('path', { d: `M${sd * 22},-74 Q${sd * 34},-116 ${sd * 50},-120`, fill: 'none', stroke: SC_INK, 'stroke-width': 4, 'stroke-linecap': 'round' }, g); E('circle', { cx: sd * 52, cy: -120, r: 8, fill: SC_INK }, g); });
        // stinger and body
        E('path', { d: 'M-10,92 L0,118 L10,92 Z', fill: SC_INK }, g);
        const body = 'M0,-84 C64,-84 86,-30 86,10 C86,60 50,96 0,96 C-50,96 -86,60 -86,10 C-86,-30 -64,-84 0,-84 Z';
        E('path', { d: body, fill: '#FFD23F', stroke: SC_INK, 'stroke-width': 5 }, g);
        const cl = _clipUrl(body);
        E('path', { d: 'M-100,30 L100,30 L100,52 L-100,52 Z M-100,72 L100,72 L100,92 L-100,92 Z', fill: '#2A1A22', 'clip-path': cl }, g);
        E('ellipse', { cx: -30, cy: -50, rx: 16, ry: 9, fill: '#FFFFFF', opacity: 0.4 }, g);
        // hexagon badge
        const hb = G(g); tr(hb, 50, 4);
        E('path', { d: mkPoly([0, 1, 2, 3, 4, 5].map(k => [Math.cos(k * Math.PI / 3) * 15, Math.sin(k * Math.PI / 3) * 15])), fill: '#F2A20C', stroke: SC_INK, 'stroke-width': 2.5 }, hb);
        E('ellipse', { cx: -46, cy: 6, rx: 10, ry: 6, fill: '#FF8FB0', opacity: 0.6 }, g);
      },
      face: { x: -4, y: -26, eye: 16, gap: 50, mouthW: 26, mouthY: 30, lidCol: '#FFD23F' },
      upd: (t, g, st) => {
        const k = st.buzz === undefined ? 1 : st.buzz;
        wings.forEach(({ w, sd }) => tr(w, sd * 40, -66, 1, sd * (-10 + Math.sin(t * 40 * k) * 18 * k)));
      } }));
  } else {
    c = scKavya(parent, o);
  }
  return c;
}

/* ---------- sets ---------- */
function agKitchen(parent) {
  const g = G(parent), back = G(g);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#F4EBDD' }, back);
  // wall tiles (the splashback band)
  E('rect', { x: 0, y: 250, width: 1200, height: 230, fill: '#DCEFF0' }, back);
  let d = '';
  for (let x = 0; x <= 1200; x += 40) d += `M${x},250 L${x},480 `;
  for (let y = 250; y <= 480; y += 40) d += `M0,${y} L1200,${y} `;
  E('path', { d, stroke: '#BBD9DB', 'stroke-width': 2 }, back);
  // window with grille (parallel bars) at the top left
  E('rect', { x: 600, y: 60, width: 300, height: 180, rx: 6, fill: linGrad('#9FD8FF', '#E6F6FF', true), stroke: '#8F9CAB', 'stroke-width': 8 }, back);
  E('path', { d: 'M640,80 L700,62 M760,80 L840,62', stroke: '#FFFFFF', 'stroke-width': 6, opacity: 0.5 }, back);   // glints
  let gr = '';
  for (let x = 630; x < 900; x += 30) gr += `M${x},64 L${x},236 `;
  E('path', { d: gr, stroke: '#5A6670', 'stroke-width': 4 }, back);
  E('path', { d: 'M604,150 L896,150', stroke: '#5A6670', 'stroke-width': 4 }, back);
  // upper cabinets (left), with handles
  for (let i = 0; i < 4; i++) {
    const x = 30 + i * 135;
    E('rect', { x, y: 40, width: 125, height: 180, rx: 6, fill: '#FFFFFF', stroke: '#B9A88C', 'stroke-width': 4 }, back);
    E('rect', { x: x + (i % 2 ? 14 : 99), y: 170, width: 12, height: 36, rx: 5, fill: '#8F9CAB' }, back);
  }
  // back counter, hob and kettle
  E('rect', { x: 0, y: 472, width: 1200, height: 22, fill: '#8F9CAB', stroke: '#5A6670', 'stroke-width': 3 }, back);
  E('rect', { x: 0, y: 494, width: 1200, height: 256, fill: '#C9B48A' }, back);
  E('rect', { x: 120, y: 456, width: 180, height: 18, rx: 4, fill: '#2A3340' }, back);
  const kettle = G(back); tr(kettle, 470, 472);
  E('path', { d: 'M-40,0 L-34,-60 Q0,-76 34,-60 L40,0 Z', fill: '#E8424F', stroke: SC_INK, 'stroke-width': 4 }, kettle);
  E('path', { d: 'M34,-50 Q64,-40 52,-8', fill: 'none', stroke: SC_INK, 'stroke-width': 6 }, kettle);
  E('path', { d: 'M-34,-56 L-62,-80', stroke: SC_INK, 'stroke-width': 8, 'stroke-linecap': 'round' }, kettle);
  const steam = [0, 1, 2].map(i => E('circle', { cx: -66, cy: -90, r: 8 + i * 3, fill: '#FFFFFF', opacity: 0.6 }, kettle));
  // honey jar on a little shelf (Bea's home)
  E('rect', { x: 950, y: 220, width: 200, height: 12, fill: '#9C6B3E', stroke: '#6B4423', 'stroke-width': 3 }, back);
  const hj = agHoney(back, 0.8); tr(hj, 1000, 220, 0.8);
  E('rect', { x: 1050, y: 180, width: 30, height: 40, rx: 4, fill: '#FF8A3D', stroke: SC_INK, 'stroke-width': 2.5 }, back);
  E('rect', { x: 1090, y: 170, width: 34, height: 50, rx: 4, fill: '#56D69B', stroke: SC_INK, 'stroke-width': 2.5 }, back);
  // wall clock
  const clk = G(back); tr(clk, 1060, 100);
  E('circle', { r: 50, fill: '#FFFFFF', stroke: '#2E7DD8', 'stroke-width': 6 }, clk);
  for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; E('line', { x1: Math.cos(a) * 38, y1: Math.sin(a) * 38, x2: Math.cos(a) * 44, y2: Math.sin(a) * 44, stroke: SC_INK, 'stroke-width': k % 3 ? 2 : 4 }, clk); }
  const hH = E('line', { x1: 0, y1: 0, x2: 0, y2: -24, stroke: SC_INK, 'stroke-width': 6, 'stroke-linecap': 'round' }, clk);
  const mH = E('line', { x1: 0, y1: 0, x2: 0, y2: -36, stroke: SC_INK, 'stroke-width': 4, 'stroke-linecap': 'round' }, clk);
  E('circle', { r: 5, fill: '#E8424F' }, clk);
  g.clock = h => { tr(hH, 0, 0, 1, (h % 12) * 30); tr(mH, 0, 0, 1, (h % 1) * 360); };
  g.clock(8);
  // fridge (right) with magnets
  E('rect', { x: 1110, y: 250, width: 120, height: 500, rx: 14, fill: '#F2F6FA', stroke: '#8F9CAB', 'stroke-width': 5 }, back);
  // calendar
  const cal = G(back); tr(cal, 950, 300);
  E('rect', { x: -50, y: -10, width: 100, height: 110, rx: 4, fill: '#FFFFFF', stroke: '#8F9CAB', 'stroke-width': 3 }, cal);
  E('rect', { x: -50, y: -10, width: 100, height: 26, fill: '#E8424F' }, cal);
  let cd = ''; for (let r = 0; r < 4; r++) for (let k = 0; k < 5; k++) cd += `M${-40 + k * 18},${30 + r * 18} h10 v8 h-10 Z `;
  E('path', { d: cd, fill: '#C9D3DC' }, cal);
  E('circle', { cx: 32, cy: 70, r: 10, fill: 'none', stroke: '#E8424F', 'stroke-width': 3 }, cal);
  g.honey = [1000, 180];
  g.mid = G(g);
  // the island
  const front = G(g);
  E('rect', { x: 80, y: 520, width: 1040, height: 26, rx: 6, fill: '#F2F6FA', stroke: '#8F9CAB', 'stroke-width': 4 }, front);
  E('rect', { x: 100, y: 546, width: 1000, height: 204, fill: linGrad('#5E8C7A', '#3E6B5A', true), stroke: '#2E4F43', 'stroke-width': 4 }, front);
  for (let i = 0; i < 4; i++) { E('rect', { x: 130 + i * 245, y: 580, width: 220, height: 150, rx: 8, fill: 'none', stroke: '#7FB09C', 'stroke-width': 3 }, front); E('rect', { x: 215 + i * 245, y: 596, width: 50, height: 10, rx: 5, fill: '#C9D3DC' }, front); }
  g.front = front;
  g.top = G(g);
  g.counterY = 530;
  g.upd = t => steam.forEach((s, i) => { const f = (t * 0.6 + i * 0.33) % 1; attr(s, 'cy', -90 - f * 60); attr(s, 'cx', -66 - f * 20); op(s, 0.55 * (1 - f)); });
  return g;
}

/* the floor from above, walls on the left and bottom; Rex's corner at the bottom-left */
function agFloor(parent, o) {
  o = o || {};
  const b = o.box || { x: 140, y: 110, w: 920, h: 540 }, g = G(parent), pat = o.pattern || 'old';
  g.box = b; g.corner = [b.x, b.y + b.h];
  E('rect', { x: b.x, y: b.y, width: b.w, height: b.h, fill: pat === 'bare' ? '#B9B3A8' : pat === 'new' ? '#C9C2B4' : '#E9DCC4' }, g);
  const tiles = G(g);
  if (o.clip !== false) tiles.setAttribute('clip-path', _clipUrl(`M${b.x},${b.y} h${b.w} v${b.h} h${-b.w} Z`));
  if (pat === 'old') {
    let d = '';
    for (let x = b.x; x <= b.x + b.w; x += 60) d += `M${x},${b.y} L${x},${b.y + b.h} `;
    for (let y = b.y + b.h; y >= b.y; y -= 60) d += `M${b.x},${y} L${b.x + b.w},${y} `;
    E('path', { d, stroke: '#C9B48A', 'stroke-width': 3 }, tiles);
    const r = rng(9); let st = '';
    for (let i = 0; i < 16; i++) { const x = b.x + r() * b.w, y = b.y + r() * b.h; st += `M${x.toFixed(0)},${y.toFixed(0)} q${(8 + r() * 20).toFixed(0)},${(-6 + r() * 12).toFixed(0)} ${(20 + r() * 30).toFixed(0)},${(-4 + r() * 8).toFixed(0)} `; }
    E('path', { d: st, fill: 'none', stroke: '#B59E74', 'stroke-width': 3, opacity: 0.6 }, tiles);
  } else if (pat === 'bare') {
    const r = rng(13); let d = '';
    for (let i = 0; i < 40; i++) { const x = b.x + r() * b.w, y = b.y + r() * b.h; d += `M${x.toFixed(0)},${y.toFixed(0)} h${(3 + r() * 6).toFixed(0)} `; }
    E('path', { d, stroke: '#9A9488', 'stroke-width': 4, 'stroke-linecap': 'round' }, tiles);
  } else {
    // octagons and squares: octagon side s, width W = s(1 + sqrt 2); octagons on a W grid from the corner
    const W = o.octW || 108, s = W / (1 + Math.SQRT2), k = s / Math.SQRT2;
    const octD = (cx, cy) => { const h = W / 2; return mkPoly([[cx - s / 2, cy - h], [cx + s / 2, cy - h], [cx + h, cy - s / 2], [cx + h, cy + s / 2], [cx + s / 2, cy + h], [cx - s / 2, cy + h], [cx - h, cy + s / 2], [cx - h, cy - s / 2]]); };
    const sqD = (cx, cy) => mkPoly([[cx, cy - k], [cx + k, cy], [cx, cy + k], [cx - k, cy]]);
    const octs = [], sqs = [], X0 = b.x, Y0 = b.y + b.h;
    const cols = Math.ceil(b.w / W) + 1, rows = Math.ceil(b.h / W) + 1;
    for (let r = 0; r < rows; r++) for (let c2 = 0; c2 < cols; c2++) {
      const cx = X0 + W / 2 + c2 * W, cy = Y0 - W / 2 - r * W;
      const e = E('path', { d: octD(cx, cy), fill: (r + c2) % 2 ? '#F4F1E8' : '#ECE6D8', stroke: '#8F887A', 'stroke-width': 2.5 }, tiles);
      e.rc = r + c2; octs.push(e);
      const q = E('path', { d: sqD(cx + W / 2, cy - W / 2), fill: '#2E6E8E', stroke: '#8F887A', 'stroke-width': 2.5 }, tiles);
      q.rc = r + c2 + 1; sqs.push(q);
    }
    const maxRc = rows + cols;
    g.lay = p => { const n = p * maxRc; octs.forEach(e => op(e, clamp(n - e.rc))); sqs.forEach(e => op(e, clamp(n - e.rc))); };
    g.oct = i => octs[i]; g.sq = i => sqs[i]; g.octW = W; g.sqK = k;
    g.lay(1);
  }
  g.tiles = tiles;
  // walls: thick bands on the left and bottom
  E('path', { d: `M${b.x - 40},${b.y - 20} L${b.x - 40},${b.y + b.h + 40} L${b.x + b.w + 20},${b.y + b.h + 40} L${b.x + b.w + 20},${b.y + b.h} L${b.x},${b.y + b.h} L${b.x},${b.y - 20} Z`, fill: '#7D8A96', stroke: '#4A5568', 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
  E('path', { d: `M${b.x - 40},${b.y - 20} L${b.x - 40},${b.y + b.h + 40} L${b.x + b.w + 20},${b.y + b.h + 40}`, fill: 'none', stroke: '#A9B5C0', 'stroke-width': 6, opacity: 0.6 }, g);
  return g;
}

function agTitleBg(parent) {
  const g = G(parent);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#0E3B43', '#1B6A6E', true) }, g);
  // faint octagon-and-square tiles
  const W = 120, s = W / (1 + Math.SQRT2), h = W / 2; let d = '';
  for (let r = -1; r < 8; r++) for (let c = -1; c < 11; c++) {
    const cx = c * W + 60, cy = r * W + 40;
    d += mkPoly([[cx - s / 2, cy - h], [cx + s / 2, cy - h], [cx + h, cy - s / 2], [cx + h, cy + s / 2], [cx + s / 2, cy + h], [cx - s / 2, cy + h], [cx - h, cy + s / 2], [cx - h, cy - s / 2]]) + ' ';
  }
  E('path', { d, fill: 'none', stroke: '#FFFFFF', 'stroke-width': 2, opacity: 0.07 }, g);
  let rays = '';
  for (let i = 0; i < 16; i++) { const a0 = i / 16 * TAU, a1 = a0 + TAU / 40; rays += `M0,0 L${(Math.cos(a0) * 1100).toFixed(0)},${(Math.sin(a0) * 1100).toFixed(0)} L${(Math.cos(a1) * 1100).toFixed(0)},${(Math.sin(a1) * 1100).toFixed(0)} Z `; }
  const rayP = E('path', { d: rays, fill: '#FFE45C', opacity: 0.07 }, g);
  E('ellipse', { cx: 600, cy: 610, rx: 620, ry: 170, fill: glow('#4CC9F0'), opacity: 0.3 }, g);
  g.upd = (t, amp) => tr(rayP, 600, 600, 1, (t * 6 * (amp === undefined ? 1 : amp)) % 360);
  g.upd(0);
  return g;
}

/* ---------- props ---------- */
function agStamp(parent, ok) { return mkStamp(parent, ok ? 'APPROVED' : 'REJECTED', ok ? '#1E9E5A' : '#D32F2F'); }

function agTileSample(parent, s) {
  const g = G(parent); tr(g, 0, 0, s || 1);
  const W = 100, a = W / (1 + Math.SQRT2), h = W / 2, k = a / Math.SQRT2;
  E('path', { d: mkPoly([[-a / 2, -h], [a / 2, -h], [h, -a / 2], [h, a / 2], [a / 2, h], [-a / 2, h], [-h, a / 2], [-h, -a / 2]]), fill: '#F4F1E8', stroke: '#5A5448', 'stroke-width': 3 }, g);
  E('path', { d: mkPoly([[h, -h - k], [h + k, -h], [h, -h + k], [h - k, -h]]), fill: '#2E6E8E', stroke: '#5A5448', 'stroke-width': 3 }, g);
  return g;
}
function agTileBox(parent, o) {
  o = o || {};
  const g = G(parent);
  E('path', { d: 'M-100,0 L-100,-120 L100,-120 L100,0 Z', fill: '#C99A62', stroke: '#6B4423', 'stroke-width': 4 }, g);
  E('path', { d: 'M-100,-120 L-80,-140 L120,-140 L100,-120 Z', fill: '#D9AE78', stroke: '#6B4423', 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
  E('path', { d: 'M100,0 L120,-20 L120,-140 L100,-120 Z', fill: '#A87C48', stroke: '#6B4423', 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
  E('path', { d: 'M-12,-140 L8,-140 L-12,-120 L-32,-120 Z', fill: '#E8D9B8', opacity: 0.8 }, g);   // tape
  const sm = agTileSample(g, 0.42); tr(sm, -52, -66, 0.42);
  T(g, 20, -74, o.label || 'OCTAGON', { size: 20, weight: 800, anchor: 'middle', fill: '#4A2E14' });
  T(g, 20, -50, 'TILES', { size: 20, weight: 800, anchor: 'middle', fill: '#4A2E14' });
  E('path', { d: 'M-90,-20 L90,-20', stroke: '#6B4423', 'stroke-width': 2, opacity: 0.5 }, g);
  return g;
}
function agHoney(parent, s) {
  const g = G(parent);
  E('path', { d: 'M-34,0 Q-44,0 -44,-12 L-44,-62 Q-44,-74 -32,-76 L32,-76 Q44,-74 44,-62 L44,-12 Q44,0 34,0 Z', fill: '#F2A20C', stroke: SC_INK, 'stroke-width': 4 }, g);
  E('rect', { x: -38, y: -96, width: 76, height: 22, rx: 6, fill: '#FFE9A8', stroke: SC_INK, 'stroke-width': 3.5 }, g);
  E('path', { d: mkPoly([0, 1, 2, 3, 4, 5].map(k => [Math.cos(k * Math.PI / 3) * 22, -38 + Math.sin(k * Math.PI / 3) * 22])), fill: '#FFFDF6', stroke: SC_INK, 'stroke-width': 3 }, g);
  T(g, 0, -31, 'HONEY', { size: 11, weight: 800, anchor: 'middle', fill: '#8A5A08' });
  E('path', { d: 'M-30,-60 L-28,-14', stroke: '#FFFFFF', 'stroke-width': 5, opacity: 0.5, 'stroke-linecap': 'round' }, g);
  return g;
}
function agFootball(parent, r) {
  r = r || 60;
  const g = G(parent);
  E('circle', { r, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 4 }, g);
  const p = r * 0.34, pent = [0, 1, 2, 3, 4].map(k => [Math.cos(-Math.PI / 2 + k * TAU / 5) * p, Math.sin(-Math.PI / 2 + k * TAU / 5) * p]);
  E('path', { d: mkPoly(pent), fill: SC_INK }, g);
  let d = '';
  pent.forEach(([x, y]) => { const L = Math.hypot(x, y); d += `M${x.toFixed(1)},${y.toFixed(1)} L${(x / L * r * 0.72).toFixed(1)},${(y / L * r * 0.72).toFixed(1)} `; });
  E('path', { d, stroke: SC_INK, 'stroke-width': 3 }, g);
  [0, 1, 2, 3, 4].forEach(k => { const a = -Math.PI / 2 + (k + 0.5) * TAU / 5; const cx = Math.cos(a) * r * 0.86, cy = Math.sin(a) * r * 0.86; E('circle', { cx, cy, r: r * 0.17, fill: SC_INK }, g); });
  E('ellipse', { cx: -r * 0.35, cy: -r * 0.45, rx: r * 0.2, ry: r * 0.1, fill: '#FFFFFF', opacity: 0.5 }, g);
  return g;
}
function agRoombyTop(parent, r) {
  r = r || 40;
  const g = G(parent);
  E('circle', { r: r + 4, fill: 'rgba(0,0,0,0.2)', cx: 4, cy: 5 }, g);
  E('circle', { r, fill: linGrad('#E6EBEF', '#B9C4CE', true), stroke: SC_INK, 'stroke-width': 4 }, g);
  E('path', { d: `M${r * 0.62},${-r * 0.78} A${r},${r} 0 0 1 ${r * 0.62},${r * 0.78}`, fill: 'none', stroke: '#2A3340', 'stroke-width': 8 }, g);   // front bumper
  E('circle', { r: r * 0.42, fill: '#1B2733' }, g);
  E('path', { d: `M${-r * 0.2},${-r * 0.22} L${r * 0.3},0 L${-r * 0.2},${r * 0.22} Z`, fill: '#4CC9F0' }, g);
  return g;
}
function agPhone(parent, o) {
  o = o || {};
  const g = G(parent);
  E('rect', { x: -110, y: -190, width: 220, height: 380, rx: 28, fill: '#1B2733', stroke: SC_INK, 'stroke-width': 5 }, g);
  E('rect', { x: -96, y: -166, width: 192, height: 332, rx: 10, fill: '#0E1A24' }, g);
  // the video: a cartoon floor being tiled
  E('rect', { x: -86, y: -150, width: 172, height: 120, rx: 6, fill: '#E9DCC4' }, g);
  E('path', { d: 'M-86,-110 L86,-110 M-86,-70 L86,-70 M-44,-150 L-44,-30 M0,-150 L0,-30 M44,-150 L44,-30', stroke: '#B59E74', 'stroke-width': 3 }, g);
  E('path', { d: 'M-14,-108 L18,-90 L-14,-72 Z', fill: '#FFFFFF', opacity: 0.85 }, g);
  T(g, 0, 10, o.title || 'DIY TILING', { size: 26, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  T(g, 0, 40, 'Part 1 of 2', { size: 20, weight: 700, anchor: 'middle', fill: C.muted, font: FB });
  E('rect', { x: -86, y: 70, width: 172, height: 10, rx: 5, fill: '#3A4B5C' }, g);
  const bar = E('rect', { x: -86, y: 70, width: 0, height: 10, rx: 5, fill: '#E8424F' }, g);
  const knob = E('circle', { cx: -86, cy: 75, r: 9, fill: '#FFFFFF' }, g);
  const spd = G(g); tr(spd, 0, 122);
  E('rect', { x: -40, y: -22, width: 80, height: 40, rx: 12, fill: '#FFE45C' }, spd);
  T(spd, 0, 9, o.speed || '2×', { size: 26, weight: 800, anchor: 'middle', fill: SC_INK });
  g.set = p => { attr(bar, 'width', 172 * clamp(p)); attr(knob, 'cx', -86 + 172 * clamp(p)); };
  g.speed = spd;
  g.set(0.5);
  return g;
}
