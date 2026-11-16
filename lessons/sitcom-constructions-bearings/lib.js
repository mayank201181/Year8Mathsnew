/* TRUE NORTH (Claude Sitcom Ep 14, Constructions, Scale Drawings & Bearings): the cast, sets and props of this
   episode. Bundled after engine lib.js, kit.js, mathkit.js and sitcom.js (scMake, scTalk, scKavya, scCastHuman,
   scConfessional, scLowerThird, scVideoCall, mk* maths kit). Every top-level name starts with `cb` (or CB_),
   except `cast`.

   Characters: cast(parent, kind, o) -> g, origin at the character's centre, about 200-240 px tall at s = 1
     o: { s (scale), mood (default mood), ... }   (humans: any scHuman option overrides, e.g. prop, lift)
     g.set({ t, talk, mood, look, sweat, still, ... })   call every frame
       talk 0..1 (use scTalk(S, t, who)); mood: neutral | happy | smug | annoyed | sad | shock | deadpan
       look -1..1 pupils left/right; still: true stops the idle bob
     HUMANS (busts, bottom of the shirt at y = 140: put them behind a boat hull, bushes, a table or the frame edge):
       'kavya'  (kavya)  Kavya, 12 (scKavya, PE shirt "8"): Team Kavya's navigator
       'mum'    (mum)    Mum: magenta kurta, bun, bindi. Default prop: a walkie-talkie (she is on Priya's team)
       'dad'    (dad)    Dad: glasses, moustache, green polo. Default: an empty hand; lift: 1 raises it to POINT
                         (always the wrong way)
       'boy'    (boy)    Ah Boy, 8: orange star tee. Default: an empty hand (lift: 1 raises it)
       'priya'  (priya)  Priya, 12: school uniform, bob, yellow clip. Default prop: a pencil
       'tan'    (tan)    Mr Tan, race marshal: shirt and tie, glasses, a RACE MARSHAL lanyard. Default prop: a megaphone
       Pass { prop: null } for no prop (or another scHuman prop name); { body: true } for a full body (scHumanBody).
       g.hand: the hand's prop group (draw your own prop there, grip at 0,0).
     CARTOONS (scMake):
       'needle'   (needle)   CAPTAIN NEEDLE, the magnetic compass: a brass pocket compass (the body: a cream dial
                             with N E S W and a red-and-white needle) with a round brass lid for a head, a white
                             captain's cap with a gold anchor, a bushy white beard, navy sleeves with gold cuffs.
                             Seventy years at sea; only ever faces North. Default mood smug.
                             Extra: { needle: deg } turns the NEEDLE (screen degrees, clockwise, 0 = up; default 0).
                             When you rotate the whole character by r degrees, pass needle: -r and it keeps pointing
                             up (North). { point: 0..1 } raises his right arm to point straight up ("North!").
       'compassa' (compassa) MADAME COMPASSA, a pair of compasses and a prima ballerina: a silver hinge-knob head
                             with a ballet bun (the compass handle) and a tiara, a pink tutu at the hinge, two steel
                             legs: the NEEDLE leg (viewer's left) and the PENCIL leg (viewer's right).
                             Extra: { open: deg } half-angle between the legs (default 16); { arms: 0..1 } arms
                             down -> up over the head (en haut); { twirl: 0..1 } squashes her sideways like a
                             pirouette (a full turn per 1). The pencil tip is at g.tip(open) -> [x, y] (local).
       'proto'    (inner / outer) INNER & OUTER, a protractor with two faces, married: Outer on the viewer's left
                             (red scale, bow tie, moustache), Inner on the right (blue scale, flower clip, lashes).
                             g.set({ t, talk: scTalk(S, t, 'outer'), mood, look, talkB: scTalk(S, t, 'inner'),
                             moodB, lookB }). They "always add up to 180".
       'shrink'   (shrink)   DR SHRINK, the scale drawing: a mad-scientist ray gun (teal body, white hair tufts,
                             goggles up, a dial "÷ 25 000", a dish emitter pointing RIGHT). Manic.
                             Extra: { zap: 0..1 } fires a zig-zag beam to the right (about 240 px).
       'gertie'   (gertie)   GERTIE, a goat (bust): white head, curved horns, floppy ears, a beard tuft, a daisy in
                             her mouth, a red collar with a bell; her rope leaves the collar to the viewer's left
                             (end at g.rope = [x, y], local). Bored. Default mood deadpan.

   Shots
     cbConf(parent, who)             confessional background tinted for that character (scConfessional); g.set(p, t)
     CB_TINT                         confessional colours per character
     cbLowerThird(parent, who)       scLowerThird with this episode's name and role (CB_LT); g.set(p).
                                     who: kavya mum dad boy priya tan needle compassa proto shrink gertie

   Sets (full stage 1200 x 750; each returns g with layers g.mid (characters) and g.front (in front of them))
     cbBoat(parent, o)    the bumboat from Changi Point to Pulau Ubin, side view, on the sea. Sky and sea with
                          Pulau Ubin (a green hump and its jetty, right) and the Changi coast (control tower, left);
                          a plane in the sky (g.plane: move it with tr; cbPlane). o.tower: the control tower's x (default 110; its top
                          reaches y 100, so in a scene with a chapter tag pass o.tower 700 or more, or frame it out). The boat (blue-and-red wooden hull,
                          tyre fenders, a blue canopy on poles) gently rocks: g.rock is the rocking group that holds
                          g.mid (busts at y about 440 hide their shirt hems behind the gunwale at y = 540) and
                          g.front (the hull). o.dusk: an orange evening sky. g.upd(t) waves, rocking and the plane.
                          g.gunwale = 540.
     cbIsland(parent, place)  an outdoor spot on Pulau Ubin. place:
                            'shop'      UBIN BICYCLE RENTAL: a zinc-roofed shopfront (left), a row of bikes on a rack,
                                        jungle behind; front: a low hedge (top y 545).
                            'quarry'    granite cliffs round a green quarry lake, a wooden lookout rail (front, top
                                        y 540).
                            'boardwalk' Chek Jawa: mangroves, the sea (right), the lookout tower (far right); the front
                                        is the boardwalk rail (top y 545).
                            'kampong'   a wooden kampong house on stilts with a zinc roof, coconut palms, a fence; front:
                                        bushes (top y 550).
                            'hq'        RACE HQ: a white canopy tent with a banner, a FINISH arch; front: a trestle table
                                        with a cloth (top y 540).
                          g.mid (characters behind the front), g.front, g.upd(t) (swaying palms, birds).
     cbPaper(parent, x, y, w, h, o)  a sheet of paper / map card with a drop shadow, top-left at (x, y); o.fill,
                          o.grid (true: faint 1 cm squares; o.cell px). Returns the paper <g>; g.area {x,y,w,h}.

   Maths props
     cbFmt(deg)                      a bearing as three figures: 60 -> '060°'
     cbNorth(parent, len, o)         North line: an arrow of length len up from (0,0) with an 'N' at the top.
                                     o: { col, size, dash (true: dashed), down (px of dashed line below 0,0) }. g.set(p)
     cbBearing(parent, o)            bearing diagram at (0,0): North line, the line to the bearing, the clockwise arc
                                     from North and a three-figure label. o: { len (170), r (56), col (arm), arcCol,
                                     ink, size (30), north (true), label (markup; default cbFmt(b)), anti (true: the
                                     arc goes anticlockwise from North instead, labelled with the anticlockwise angle, e.g. '72°') }.
                                     g.set(b, p, q): arm at bearing b (degrees, clockwise from North); p 0..1 draws
                                     the arm, q 0..1 sweeps the arc and shows the label (q defaults to p).
                                     g.end(b, len) -> [x, y] of the point at bearing b, distance len.
     cbArc(parent, cx, cy, r, a0, a1, o)  a construction arc (screen degrees, clockwise when a1 > a0), dashed-drawable:
                                     .set(p) draws it. o: { col (#7A5CFF), width (3.5) }
     cbSeg(parent, x1, y1, x2, y2, o)  a drawable straight segment: .set(p). o: { col (MK.ink), width (4), dash }
     cbDot(parent, x, y, label, o)   a labelled point (dot + letter). o: { col, size (30), dx, dy }. g.set(p)
     cbStamp(parent, ok)             mkStamp 'ON COURSE' (green, ok true) or 'OFF COURSE' (red). About 520 px wide at
                                     scale 1. g.set(p) thumps it in.

   Props (around their own origin)
     cbSignpost(parent, deg, o)      wooden signpost: a post with two finger arms meeting at the vertex (g.vertex =
                                     [x, y], local) with deg between them (first arm horizontal to the right; the
                                     second arm deg anticlockwise from it). o: { len (230), names ['JETTY', 'CHEK
                                     JAWA'] }. Post foot at (0, 0); vertex at (0, -260).
     cbLock(parent)                  3-digit combination bike lock, centred, about 220 x 120. g.set(code '050', open
                                     0..1): shows the digits; open lifts the shackle and turns the body green.
     cbBike(parent, o)               a bicycle side view, wheels on y = 0, about 230 wide. o.col frame colour.
     cbFlag(parent, s)               orienteering control flag (orange and white) on a stake, foot at (0,0).
     cbWaffles(parent)               the treasure box (wooden, rope handles, "TREASURE") with a stack of waffles.
                                     g.set(open 0..1, k): lid open; k waffles left (0..4).
     cbMagnet(parent, s)             a red horseshoe fridge magnet with silver tips and a tiny "UBIN" label, centred.
     cbPlane(parent, s)              a white airliner, side view, nose to the right, centred.
     cbMegaphone(parent)             a megaphone, grip at (0,0), bell to the upper right.
     cbWalkie(parent)                a walkie-talkie, grip at (0,0).
     cbWell(parent, s)               an old stone well with a little roof, base centre at (0,0).
*/

/* ---------- confessional tints, lower thirds ---------- */
const CB_TINT = {
  needle: ['#0E2236', '#1C4A6E'], compassa: ['#3A1430', '#7A2A62'], proto: ['#10263A', '#1E4E7A'], inner: ['#10263A', '#1E4E7A'],
  outer: ['#10263A', '#1E4E7A'], shrink: ['#0E2E2A', '#1E5C52'], gertie: ['#22301A', '#46602E'], kavya: ['#14243A', '#25446B'],
  dad: ['#123026', '#245A48'], mum: ['#3A1030', '#6B1E58'], boy: ['#3A2410', '#6B4414'], priya: ['#1A2240', '#33407A'],
  tan: ['#1A2A3A', '#33506E'],
};
function cbConf(parent, who) { const c = CB_TINT[who] || CB_TINT.needle; return scConfessional(parent, c[0], c[1]); }
const CB_LT = {
  needle: ['CAPTAIN NEEDLE', 'Magnetic compass. Only faces North.'],
  compassa: ['MADAME COMPASSA', 'A pair of compasses. Prima ballerina.'],
  proto: ['INNER & OUTER', 'A protractor. Married. Add up to 180°.'],
  shrink: ['DR SHRINK', 'Scale drawings. Never touches angles.'],
  gertie: ['GERTIE', 'A goat. On a rope. Bored.'],
  kavya: ['KAVYA, 12', 'Team Kavya. Navigator.'],
  mum: ['MUM', "On Priya's team. For the waffles."],
  dad: ['DAD', 'Excellent sense of direction. Allegedly.'],
  boy: ['AH BOY, 8', "Kavya's brother. Team Kavya."],
  priya: ['PRIYA', 'Best friend. Rival captain.'],
  tan: ['MR TAN', 'Maths teacher. Race marshal. Baker.'],
};
CB_LT.inner = CB_LT.proto; CB_LT.outer = CB_LT.proto;
function cbLowerThird(parent, who) { const l = CB_LT[who] || [String(who).toUpperCase(), '']; return scLowerThird(parent, l[0], l[1]); }

/* three-figure bearing text */
function cbFmt(deg) { const d = ((Math.round(deg) % 360) + 360) % 360; return String(d).padStart(3, '0') + '°'; }

/* ---------- small hand props ---------- */
function cbMegaphone(parent) {
  const g = G(parent), ink = SC_INK;
  E('rect', { x: -7, y: -40, width: 14, height: 40, rx: 5, fill: '#3A4A58', stroke: ink, 'stroke-width': 3 }, g);   // grip
  const b = G(g); tr(b, 0, -40, 1, -35);
  E('path', { d: 'M-12,-6 L-12,6 L50,34 L50,-34 Z', fill: '#F2F7FA', stroke: ink, 'stroke-width': 4, 'stroke-linejoin': 'round' }, b);
  E('path', { d: 'M-12,-6 L-12,6 L50,34 L50,-34 Z', fill: 'none', stroke: '#E8424F', 'stroke-width': 0 }, b);
  E('rect', { x: 46, y: -36, width: 10, height: 72, rx: 4, fill: '#E8424F', stroke: ink, 'stroke-width': 3 }, b);
  E('rect', { x: -22, y: -10, width: 12, height: 20, rx: 3, fill: '#E8424F', stroke: ink, 'stroke-width': 3 }, b);
  return g;
}
function cbWalkie(parent) {
  const g = G(parent), ink = SC_INK;
  E('line', { x1: 12, y1: -70, x2: 12, y2: -108, stroke: ink, 'stroke-width': 6, 'stroke-linecap': 'round' }, g);
  E('rect', { x: -20, y: -78, width: 40, height: 78, rx: 8, fill: '#FFC247', stroke: ink, 'stroke-width': 3.5 }, g);
  E('rect', { x: -13, y: -68, width: 26, height: 20, rx: 3, fill: '#2A3B44' }, g);
  for (let i = 0; i < 3; i++) E('line', { x1: -12, y1: -38 + i * 9, x2: 12, y2: -38 + i * 9, stroke: '#8A6508', 'stroke-width': 3 }, g);
  return g;
}

/* ---------- the cast ---------- */
const CB_PROP = { mum: null, dad: null, boy: null, priya: 'pencil', tan: null };
function cast(parent, kind, o) {
  o = o || {};
  if (kind === 'kavya') return scKavya(parent, o);
  if (SC_HUMANS[kind]) {
    const ownProp = o.prop === undefined && (kind === 'tan' || kind === 'mum');
    const p = Object.assign({}, (kind === 'boy' || kind === 'dad') ? { hand: true } : { prop: CB_PROP[kind] }, ownProp ? { hand: true } : {}, o);
    const c = scCastHuman(parent, kind, p);
    if (ownProp && c.hand && !o.body) { if (kind === 'tan') cbMegaphone(c.hand); else cbWalkie(c.hand); }
    if (kind === 'tan' && !o.body) {   // RACE MARSHAL lanyard
      const inner = c.firstChild, ly = G(inner); inner.insertBefore(ly, inner.lastChild);
      E('path', { d: 'M-30,62 L-6,112 M30,62 L6,112', stroke: '#E8424F', 'stroke-width': 5, fill: 'none' }, ly);
      E('rect', { x: -30, y: 106, width: 60, height: 32, rx: 4, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 2.5 }, ly);
      T(ly, 0, 128, 'MARSHAL', { size: 13, weight: 800, anchor: 'middle', fill: '#C62828' });
    }
    return c;
  }
  const S = { s: o.s, mood: o.mood };
  let c;
  if (kind === 'needle') {
    let ndl = null, armR = null;
    c = scMake(parent, Object.assign(S, { seed: 4, bob: 2, mood: o.mood || 'smug',
      draw: g => {
        // left arm (resting on the case)
        E('path', { d: 'M-72,40 Q-104,70 -86,104', fill: 'none', stroke: '#1E3560', 'stroke-width': 16, 'stroke-linecap': 'round' }, g);
        E('path', { d: 'M-96,94 L-76,100', stroke: '#E2B33C', 'stroke-width': 5 }, g);
        E('circle', { cx: -84, cy: 110, r: 13, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
        // right arm (animated: down -> pointing straight up)
        armR = G(g); tr(armR, 74, 34);
        E('path', { d: 'M0,0 L0,64', stroke: '#1E3560', 'stroke-width': 16, 'stroke-linecap': 'round' }, armR);
        E('path', { d: 'M-9,52 L9,52', stroke: '#E2B33C', 'stroke-width': 5 }, armR);
        E('circle', { cx: 0, cy: 72, r: 13, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, armR);
        // the body: a brass compass case and its dial
        E('circle', { cx: 0, cy: 54, r: 84, fill: ball('#F6D27A', '#A8761A'), stroke: SC_INK, 'stroke-width': 5 }, g);
        E('circle', { cx: 0, cy: 54, r: 66, fill: '#FFF8E6', stroke: '#8A6508', 'stroke-width': 4 }, g);
        let tk = '';
        for (let i = 0; i < 16; i++) { const a = i * TAU / 16, r1 = i % 4 ? 58 : 52; tk += `M${(Math.sin(a) * r1).toFixed(1)},${(54 - Math.cos(a) * r1).toFixed(1)} L${(Math.sin(a) * 64).toFixed(1)},${(54 - Math.cos(a) * 64).toFixed(1)} `; }
        E('path', { d: tk, stroke: '#8A6508', 'stroke-width': 3 }, g);
        T(g, 0, 22, 'N', { size: 22, weight: 800, anchor: 'middle', fill: '#C62828' });
        T(g, 0, 106, 'S', { size: 18, weight: 800, anchor: 'middle', fill: SC_INK });
        T(g, 44, 61, 'E', { size: 18, weight: 800, anchor: 'middle', fill: SC_INK });
        T(g, -44, 61, 'W', { size: 18, weight: 800, anchor: 'middle', fill: SC_INK });
        ndl = G(g); tr(ndl, 0, 54);
        E('path', { d: 'M0,-46 L11,0 L-11,0 Z', fill: '#E8424F', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, ndl);
        E('path', { d: 'M0,46 L11,0 L-11,0 Z', fill: '#E6EBEF', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, ndl);
        E('circle', { cx: 0, cy: 54, r: 6, fill: '#E2B33C', stroke: SC_INK, 'stroke-width': 2.5 }, g);
        // the lid: his head
        E('circle', { cx: 0, cy: -58, r: 62, fill: ball('#F6D27A', '#B88420'), stroke: SC_INK, 'stroke-width': 5 }, g);
        E('ellipse', { cx: -22, cy: -86, rx: 16, ry: 9, fill: '#FFFFFF', opacity: 0.35 }, g);
        // bushy white beard round the bottom of the lid
        E('path', { d: 'M-58,-46 Q-66,8 -34,10 Q-20,22 0,14 Q20,22 34,10 Q66,8 58,-46 Q46,-12 26,-14 Q0,-4 -26,-14 Q-46,-12 -58,-46 Z', fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, g);
        // captain's cap
        const cap = G(g); tr(cap, 0, -112);
        E('path', { d: 'M-58,6 Q-66,-30 0,-34 Q66,-30 58,6 Z', fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, cap);
        E('rect', { x: -56, y: -2, width: 112, height: 16, rx: 5, fill: '#1E3560', stroke: SC_INK, 'stroke-width': 3 }, cap);
        E('path', { d: 'M-50,14 Q0,30 50,14 L46,22 Q0,38 -46,22 Z', fill: '#14243A', stroke: SC_INK, 'stroke-width': 3 }, cap);
        const an = G(cap); tr(an, 0, -14);
        E('path', { d: 'M0,-9 L0,9 M-8,2 Q0,12 8,2 M-5,-6 L5,-6', fill: 'none', stroke: '#E2B33C', 'stroke-width': 3.5, 'stroke-linecap': 'round' }, an);
      },
      face: { x: 0, y: -66, eye: 13, gap: 44, mouthW: 26, mouthY: 40, lidCol: '#D9A640' },
      upd: (t, g, st) => {
        tr(ndl, 0, 54, 1, (st.needle || 0) + Math.sin(t * 3.1) * 2.5 * (st.still ? 0 : 1));
        const p = clamp(st.point || 0);
        tr(armR, 74, 34, 1, lerp(0, -170, p));
      } }));
    const inner = c.firstChild, mo = G(inner); tr(mo, 0, -38);   // white moustache over the mouth corners
    E('path', { d: 'M0,-2 C-10,-10 -26,-10 -34,0 C-28,-2 -16,4 0,4 C16,4 28,-2 34,0 C26,-10 10,-10 0,-2 Z', fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, mo);
  } else if (kind === 'compassa') {
    let legN = null, legP = null, arms = [], body = null;
    const HY = -54, LEN = 168;
    c = scMake(parent, Object.assign(S, { seed: 7, bob: 4, mood: o.mood || 'smug',
      draw: g => {
        body = G(g);
        // legs from the hinge (0, HY)
        legN = G(body); tr(legN, 0, HY);
        E('path', { d: `M-7,0 L7,0 L5,${LEN - 26} L-5,${LEN - 26} Z`, fill: linGrad('#E6EBEF', '#8F9CAB', false), stroke: SC_INK, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, legN);
        E('path', { d: `M-4,${LEN - 28} L4,${LEN - 28} L0,${LEN} Z`, fill: '#5A6670', stroke: SC_INK, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, legN);   // the needle point
        legP = G(body); tr(legP, 0, HY);
        E('path', { d: `M-7,0 L7,0 L5,${LEN - 52} L-5,${LEN - 52} Z`, fill: linGrad('#E6EBEF', '#8F9CAB', false), stroke: SC_INK, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, legP);
        E('rect', { x: -8, y: LEN - 64, width: 16, height: 16, rx: 3, fill: '#8F9CAB', stroke: SC_INK, 'stroke-width': 2.5 }, legP);   // clamp
        E('path', { d: `M-7,${LEN - 50} L7,${LEN - 50} L7,${LEN - 18} L0,${LEN} L-7,${LEN - 18} Z`, fill: '#FFC247', stroke: SC_INK, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, legP);   // pencil
        E('path', { d: `M-7,${LEN - 18} L0,${LEN} L7,${LEN - 18} Z`, fill: '#F3D9B1', stroke: SC_INK, 'stroke-width': 2 }, legP);
        E('path', { d: `M-2.5,${LEN - 7} L0,${LEN} L2.5,${LEN - 7} Z`, fill: SC_INK }, legP);
        // tutu at the hinge
        E('path', { d: `M-70,${HY + 6} Q-40,${HY - 22} 0,${HY - 20} Q40,${HY - 22} 70,${HY + 6} Q52,${HY + 22} 30,${HY + 14} Q14,${HY + 28} 0,${HY + 16} Q-14,${HY + 28} -30,${HY + 14} Q-52,${HY + 22} -70,${HY + 6} Z`, fill: '#FF9CC8', stroke: SC_INK, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, body);
        E('path', { d: `M-54,${HY + 2} Q0,${HY - 14} 54,${HY + 2}`, fill: 'none', stroke: '#FFFFFF', 'stroke-width': 4, opacity: 0.7 }, body);
        // arms (animated)
        [-1, 1].forEach(sd => arms.push({ sd, a: E('path', { d: '', fill: 'none', stroke: '#C9D3DC', 'stroke-width': 7, 'stroke-linecap': 'round' }, body), h: E('circle', { r: 7, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 2.5 }, body) }));
        // bun (the handle) and tiara
        E('rect', { x: -9, y: -158, width: 18, height: 26, rx: 5, fill: '#8F9CAB', stroke: SC_INK, 'stroke-width': 3 }, body);
        E('circle', { cx: 0, cy: -164, r: 16, fill: '#5A4A6E', stroke: SC_INK, 'stroke-width': 3.5 }, body);
        // the head: a silver hinge knob
        E('circle', { cx: 0, cy: -100, r: 46, fill: ball('#F2F6FA', '#9AA6B2'), stroke: SC_INK, 'stroke-width': 4.5 }, body);
        E('path', { d: 'M-30,-136 L-20,-150 L-10,-138 L0,-154 L10,-138 L20,-150 L30,-136 Z', fill: '#FFE45C', stroke: SC_INK, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, body);
        E('circle', { cx: 0, cy: -146, r: 4, fill: '#FF6B8A' }, body);
        E('ellipse', { cx: -26, cy: -86, rx: 9, ry: 5, fill: '#FF8FB0', opacity: 0.55 }, body);
        E('ellipse', { cx: 26, cy: -86, rx: 9, ry: 5, fill: '#FF8FB0', opacity: 0.55 }, body);
      },
      face: { x: 0, y: -104, eye: 12, gap: 34, mouthW: 22, mouthY: 26, lidCol: '#C9D3DC' },
      upd: (t, g, st) => {
        const a = st.open === undefined ? 16 : st.open;
        tr(legN, 0, HY, 1, a); tr(legP, 0, HY, 1, -a);
        const k = clamp(st.arms === undefined ? 0.3 : st.arms);
        arms.forEach(({ sd, a: path, h }) => {
          const sx = sd * 26, sy = -70;   // shoulder
          const hx = sd * lerp(62, 22, k), hy = lerp(-20, -176, k);
          const cx = sd * lerp(70, 70, k), cy = lerp(-60, -150, k);
          path.setAttribute('d', `M${sx},${sy} Q${cx},${cy} ${hx.toFixed(1)},${hy.toFixed(1)}`);
          attr(h, 'cx', hx); attr(h, 'cy', hy);
        });
        if (st.twirl) {
          const sx = Math.cos((st.twirl || 0) * TAU);
          g.setAttribute('transform', g.getAttribute('transform') + ` scale(${(Math.abs(sx) < 0.08 ? 0.08 * Math.sign(sx || 1) : sx).toFixed(3)} 1)`);
        }
      } }));
    c.tip = (open) => { const a = (open === undefined ? 16 : open) * Math.PI / 180; return [Math.sin(a) * LEN, HY + Math.cos(a) * LEN]; };
  } else if (kind === 'proto' || kind === 'inner' || kind === 'outer') {
    c = scMake(parent, Object.assign(S, { seed: 11, bob: 2, mood: o.mood || 'neutral',
      draw: g => {
        // little legs
        [-70, 70].forEach(x => {
          E('path', { d: `M${x},56 L${x},92`, stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
          E('path', { d: `M${x - 12},100 Q${x - 12},88 ${x + 4},88 L${x + 18},90 Q${x + 24},100 ${x + 16},102 Z`, fill: x < 0 ? '#E8424F' : '#3B82F6', stroke: SC_INK, 'stroke-width': 3 }, g);
        });
        // the half disc
        E('path', { d: 'M-150,60 A150,150 0 0 1 150,60 Z', fill: 'rgba(170,215,255,0.92)', stroke: SC_INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, g);
        E('path', { d: 'M-118,60 A118,118 0 0 1 118,60', fill: 'none', stroke: '#6E9CC8', 'stroke-width': 2.5 }, g);
        let tk = '';
        for (let i = 0; i <= 36; i++) { const a = Math.PI - i * Math.PI / 36, r1 = i % 9 === 0 ? 124 : i % 3 === 0 ? 132 : 138; tk += `M${(Math.cos(a) * r1).toFixed(1)},${(60 - Math.sin(a) * r1).toFixed(1)} L${(Math.cos(a) * 148).toFixed(1)},${(60 - Math.sin(a) * 148).toFixed(1)} `; }
        E('path', { d: tk, stroke: SC_INK, 'stroke-width': 2.2 }, g);
        // scale numbers: outer (red) from the left, inner (blue) from the right
        T(g, -110, 50, '0', { size: 20, weight: 800, anchor: 'middle', fill: '#C62828' });
        T(g, 110, 50, '180', { size: 18, weight: 800, anchor: 'middle', fill: '#C62828' });
        T(g, 100, 30, '0', { size: 20, weight: 800, anchor: 'middle', fill: '#1E5BB8' });
        T(g, -98, 30, '180', { size: 18, weight: 800, anchor: 'middle', fill: '#1E5BB8' });
        E('path', { d: 'M-150,60 L150,60', stroke: SC_INK, 'stroke-width': 5 }, g);
        E('path', { d: 'M-12,60 L12,60 M0,48 L0,60', stroke: '#C62828', 'stroke-width': 4 }, g);   // centre cross
        // Outer's bow tie (left) and Inner's flower clip (right)
        const bt = G(g); tr(bt, -56, 44);
        E('path', { d: 'M0,0 L-16,-9 L-16,9 Z M0,0 L16,-9 L16,9 Z', fill: '#E8424F', stroke: SC_INK, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, bt);
        E('circle', { r: 4.5, fill: '#B71C1C' }, bt);
        const fl = G(g); tr(fl, 92, -62);
        for (let i = 0; i < 5; i++) { const a = i * TAU / 5; E('circle', { cx: Math.cos(a) * 8, cy: Math.sin(a) * 8, r: 7, fill: '#6EC8FF', stroke: SC_INK, 'stroke-width': 2 }, fl); }
        E('circle', { r: 5, fill: '#FFE45C', stroke: SC_INK, 'stroke-width': 2 }, fl);
      },
      face: { x: -56, y: -10, eye: 13, gap: 34, mouthW: 22, mouthY: 28, lidCol: '#8FBDE8' },
      faceB: { x: 56, y: -10, eye: 13, gap: 34, mouthW: 22, mouthY: 28, lidCol: '#8FBDE8', iris: '#1E3A8A' } }));
    const inner = c.firstChild, mo = G(inner); tr(mo, -56, 6);   // Outer's moustache
    E('path', { d: 'M0,-2 C-8,-8 -20,-8 -26,0 C-20,-1 -12,3 0,3 C12,3 20,-1 26,0 C20,-8 8,-8 0,-2 Z', fill: '#5A3A2A', stroke: SC_INK, 'stroke-width': 2 }, mo);
    const la = G(inner); tr(la, 56, -10);   // Inner's lashes
    E('path', { d: 'M-30,-14 l-7,-6 M-24,-16 l-4,-8 M30,-14 l7,-6 M24,-16 l4,-8', stroke: SC_INK, 'stroke-width': 2.5, 'stroke-linecap': 'round' }, la);
  } else if (kind === 'shrink') {
    let beam = null;
    c = scMake(parent, Object.assign(S, { seed: 15, bob: 5, mood: o.mood || 'happy',
      draw: g => {
        // legs
        [-40, 20].forEach(x => {
          E('path', { d: `M${x},60 L${x - 4},104`, stroke: SC_INK, 'stroke-width': 8, 'stroke-linecap': 'round' }, g);
          E('path', { d: `M${x - 18},112 Q${x - 18},100 ${x - 2},100 L${x + 12},102 Q${x + 18},112 ${x + 10},114 Z`, fill: '#3A4A58', stroke: SC_INK, 'stroke-width': 3 }, g);
        });
        // fins at the back
        E('path', { d: 'M-80,-40 L-130,-84 L-100,-20 Z M-80,40 L-130,84 L-100,20 Z', fill: '#FF6B5C', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
        // barrel and rings
        E('rect', { x: 60, y: -20, width: 80, height: 40, rx: 8, fill: linGrad('#C9D3DC', '#7D8A96', true), stroke: SC_INK, 'stroke-width': 4 }, g);
        [80, 104].forEach(x => E('rect', { x, y: -26, width: 12, height: 52, rx: 4, fill: '#FFC247', stroke: SC_INK, 'stroke-width': 3 }, g));
        E('path', { d: 'M136,-8 L176,-40 L176,40 L136,8 Z', fill: '#B48CFF', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);   // dish
        E('circle', { cx: 176, cy: 0, r: 8, fill: '#7EE08A', stroke: SC_INK, 'stroke-width': 3 }, g);
        // body
        E('ellipse', { cx: -10, cy: 0, rx: 92, ry: 74, fill: ball('#4FD1C5', '#1E7A70'), stroke: SC_INK, 'stroke-width': 5 }, g);
        // wild white hair
        E('path', { d: 'M-80,-40 Q-104,-80 -70,-74 Q-74,-110 -36,-88 Q-30,-120 0,-92 Q20,-118 34,-84 Q62,-100 50,-62 Q20,-80 -10,-74 Q-50,-72 -80,-40 Z', fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, g);
        // goggles pushed up
        E('path', { d: 'M-66,-52 Q-10,-70 46,-52', fill: 'none', stroke: '#3A2A1A', 'stroke-width': 7 }, g);
        [-34, 14].forEach(x => { E('circle', { cx: x, cy: -60, r: 15, fill: '#9FD8FF', stroke: SC_INK, 'stroke-width': 4 }, g); E('circle', { cx: x - 4, cy: -64, r: 4, fill: '#FFFFFF' }, g); });
        // dial
        E('rect', { x: -60, y: 40, width: 96, height: 30, rx: 8, fill: '#0E2E2A', stroke: SC_INK, 'stroke-width': 3 }, g);
        T(g, -12, 62, '÷ 25 000', { size: 18, weight: 800, anchor: 'middle', fill: '#7EE08A' });
        beam = G(g); tr(beam, 184, 0);
        E('path', { d: 'M0,0 L30,-16 L60,12 L90,-14 L120,14 L150,-12 L180,10 L210,-8 L240,0', fill: 'none', stroke: '#7EE08A', 'stroke-width': 9, 'stroke-linejoin': 'round', 'stroke-linecap': 'round', opacity: 0.6 }, beam);
        E('path', { d: 'M0,0 L30,-16 L60,12 L90,-14 L120,14 L150,-12 L180,10 L210,-8 L240,0', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, beam);
      },
      face: { x: -10, y: -10, eye: 16, gap: 50, mouthW: 30, mouthY: 30, lidCol: '#3BB0A4' },
      upd: (t, g, st) => { const z = clamp(st.zap || 0); op(beam, z > 0.02 ? z * (0.75 + 0.25 * Math.sin(t * 40)) : 0); } }));
  } else if (kind === 'gertie') {
    c = scMake(parent, Object.assign(S, { seed: 19, bob: 2, mood: o.mood || 'deadpan',
      draw: g => {
        // neck and chest
        E('path', { d: 'M-60,40 Q-74,110 -96,140 L96,140 Q74,110 58,40 Z', fill: '#F4F1E8', stroke: SC_INK, 'stroke-width': 4.5, 'stroke-linejoin': 'round' }, g);
        // rope from the collar, out to the left
        E('path', { d: 'M-56,82 Q-120,100 -200,92', fill: 'none', stroke: '#B08A4A', 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
        // collar and bell
        E('path', { d: 'M-62,66 Q0,96 62,66 L60,84 Q0,114 -60,84 Z', fill: '#E8424F', stroke: SC_INK, 'stroke-width': 3.5 }, g);
        E('circle', { cx: 0, cy: 106, r: 13, fill: '#FFC247', stroke: SC_INK, 'stroke-width': 3 }, g);
        E('path', { d: 'M-5,110 L5,110', stroke: SC_INK, 'stroke-width': 3 }, g);
        // horns (behind the head)
        E('path', { d: 'M-30,-86 Q-56,-150 -100,-130 Q-64,-128 -48,-80 Z', fill: '#C9B48A', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
        E('path', { d: 'M30,-86 Q56,-150 100,-130 Q64,-128 48,-80 Z', fill: '#C9B48A', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
        // floppy ears
        E('path', { d: 'M-54,-60 Q-110,-60 -118,-30 Q-90,-26 -52,-36 Z', fill: '#F4F1E8', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
        E('path', { d: 'M54,-60 Q110,-60 118,-30 Q90,-26 52,-36 Z', fill: '#F4F1E8', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
        E('path', { d: 'M-60,-50 Q-96,-48 -104,-36 Q-84,-36 -60,-42 Z M60,-50 Q96,-48 104,-36 Q84,-36 60,-42 Z', fill: '#FFC2D6' }, g);
        // the long head
        E('path', { d: 'M-56,-80 Q-60,-110 0,-112 Q60,-110 56,-80 L46,30 Q40,70 0,72 Q-40,70 -46,30 Z', fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, g);
        E('path', { d: 'M-20,-110 Q0,-90 20,-110 Q8,-96 -20,-110 Z', fill: '#E6DCC6', stroke: SC_INK, 'stroke-width': 2 }, g);   // tuft
        E('ellipse', { cx: -14, cy: 42, rx: 5, ry: 7, fill: '#8A6A5A' }, g); E('ellipse', { cx: 14, cy: 42, rx: 5, ry: 7, fill: '#8A6A5A' }, g);   // nostrils
        // beard tuft
        E('path', { d: 'M-16,68 Q-10,104 0,112 Q10,104 16,68 Z', fill: '#E6DCC6', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
        // a daisy in her mouth
        E('path', { d: 'M18,62 L62,48', stroke: '#2FA36B', 'stroke-width': 4, 'stroke-linecap': 'round' }, g);
        const d = G(g); tr(d, 66, 46);
        for (let i = 0; i < 6; i++) { const a = i * TAU / 6; E('ellipse', { cx: Math.cos(a) * 9, cy: Math.sin(a) * 9, rx: 7, ry: 4, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 1.5, transform: `rotate(${(a * 180 / Math.PI).toFixed(0)} ${(Math.cos(a) * 9).toFixed(1)} ${(Math.sin(a) * 9).toFixed(1)})` }, d); }
        E('circle', { r: 5, fill: '#FFC247', stroke: SC_INK, 'stroke-width': 1.5 }, d);
      },
      face: { x: 0, y: -40, eye: 15, gap: 52, mouthW: 26, mouthY: 92, lidCol: '#E6DCC6', iris: '#5A3A1A' } }));
    c.rope = [-200, 92];
  } else {
    c = scKavya(parent, o);
  }
  return c;
}

/* ---------- sets ---------- */
function cbPlane(parent, s) {
  const g = G(parent), in_ = G(g); tr(in_, 0, 0, s || 1);
  E('path', { d: 'M-120,0 Q-118,-16 -96,-18 L90,-18 Q130,-16 140,0 Q130,14 90,16 L-96,16 Q-118,14 -120,0 Z', fill: '#F4F7FA', stroke: '#5A6670', 'stroke-width': 3 }, in_);
  E('path', { d: 'M-104,-16 L-128,-58 L-104,-58 L-70,-16 Z', fill: '#2E7DD8', stroke: '#5A6670', 'stroke-width': 3, 'stroke-linejoin': 'round' }, in_);
  E('path', { d: 'M-10,4 L-56,52 L-30,52 L34,6 Z', fill: '#C9D3DC', stroke: '#5A6670', 'stroke-width': 3, 'stroke-linejoin': 'round' }, in_);
  let w = ''; for (let i = 0; i < 8; i++) w += `M${-70 + i * 18},-7 h9 v7 h-9 Z `;
  E('path', { d: w, fill: '#6E9CC8' }, in_);
  E('path', { d: 'M112,-12 Q126,-10 132,-2 L112,-2 Z', fill: '#2A3B44' }, in_);
  return g;
}
function cbPalm(parent, x, y, h, lean) {
  const g = G(parent); tr(g, x, y);
  const tx = lean || 20;
  E('path', { d: `M0,0 Q${tx * 0.3},${-h * 0.5} ${tx},${-h}`, fill: 'none', stroke: '#8B5A2B', 'stroke-width': 12, 'stroke-linecap': 'round' }, g);
  const crown = G(g); tr(crown, tx, -h);
  [[-90, 30], [-50, -20], [0, -40], [50, -18], [90, 34], [-20, 40], [30, 46]].forEach(([dx, dy]) => E('path', { d: `M0,0 Q${dx * 0.5},${dy * 0.4 - 30} ${dx},${dy}`, fill: 'none', stroke: '#2FA36B', 'stroke-width': 12, 'stroke-linecap': 'round' }, crown));
  [[-8, 10], [8, 12], [0, 18]].forEach(([dx, dy]) => E('circle', { cx: dx, cy: dy, r: 7, fill: '#8B6A2B' }, crown));
  g.crown = crown; g.tx = tx; g.h = h;
  return g;
}

function cbBoat(parent, o) {
  o = o || {};
  const g = G(parent), dusk = !!o.dusk;
  // sky, sea, horizon
  E('rect', { x: -700, y: -300, width: 2600, height: 1100, fill: dusk ? linGrad('#FF9A62', '#FFD7A0', true) : linGrad('#8FD3FF', '#E3F5FF', true) }, g);
  E('circle', { cx: dusk ? 980 : 1060, cy: dusk ? 330 : 110, r: dusk ? 70 : 56, fill: glow(dusk ? '#FFB347' : '#FFE45C'), opacity: 0.9 }, g);
  // Changi coast and the control tower (left)
  E('path', { d: 'M-700,372 L-700,330 Q120,318 260,334 Q320,338 420,352 L420,372 Z', fill: dusk ? '#8A6A7A' : '#9CB89A' }, g);
  const TX = o.tower === undefined ? 110 : o.tower, tw = G(g); tr(tw, TX, 340);   // Changi Airport's control tower: tall enough to rise over the canopy
  E('path', { d: 'M-14,0 L-8,-170 L8,-170 L14,0 Z', fill: dusk ? '#C9B4BC' : '#E6EBEF', stroke: '#7D8A96', 'stroke-width': 3 }, tw);
  E('path', { d: 'M-36,-170 L36,-170 L26,-208 L-26,-208 Z', fill: '#4A6A8A', stroke: '#2A3B44', 'stroke-width': 3 }, tw);
  E('rect', { x: -22, y: -220, width: 44, height: 14, rx: 3, fill: dusk ? '#C9B4BC' : '#E6EBEF', stroke: '#7D8A96', 'stroke-width': 2 }, tw);
  E('path', { d: 'M0,-220 L0,-240', stroke: '#7D8A96', 'stroke-width': 3 }, tw);
  g.tower = [TX, 130];
  // Pulau Ubin (right): green hump and the jetty
  E('path', { d: 'M640,374 Q700,300 820,290 Q920,270 1010,300 Q1120,316 1300,330 Q1600,340 1900,350 L1900,374 Z', fill: dusk ? '#4E6B4A' : '#3E8E4E' }, g);
  E('path', { d: 'M700,370 Q760,320 840,318 Q900,308 960,330', fill: 'none', stroke: dusk ? '#3E5A3A' : '#2E7A3E', 'stroke-width': 18, 'stroke-linecap': 'round' }, g);
  E('rect', { x: 820, y: 352, width: 150, height: 10, fill: '#8A6A4A' }, g);
  for (let i = 0; i < 6; i++) E('rect', { x: 826 + i * 28, y: 360, width: 5, height: 16, fill: '#6B4A2A' }, g);
  E('rect', { x: -700, y: 372, width: 2600, height: 500, fill: dusk ? linGrad('#E08A6A', '#6A5A8A', true) : linGrad('#4AA8D8', '#1E6E9E', true) }, g);
  const waves = G(g); let wd = '';
  for (let r = 0; r < 5; r++) for (let k = -5; k < 14; k++) { const x = k * 150 + (r % 2) * 70, y = 400 + r * 34; wd += `M${x},${y} q20,-8 40,0 `; }
  E('path', { d: wd, fill: 'none', stroke: '#FFFFFF', 'stroke-width': 3, opacity: 0.35, 'stroke-linecap': 'round' }, waves);
  // the plane
  g.plane = cbPlane(g, 0.55); tr(g.plane, 300, 160);
  // the boat (rocking)
  g.rock = G(g);
  const canopy = G(g.rock);
  [130, 600, 1070].forEach(x => E('rect', { x: x - 6, y: 190, width: 12, height: 360, fill: '#C9D3DC', stroke: '#5A6670', 'stroke-width': 3 }, canopy));
  E('path', { d: 'M90,198 Q600,160 1110,198 L1110,226 Q600,190 90,226 Z', fill: '#2E7DD8', stroke: '#1E3560', 'stroke-width': 4 }, canopy);
  E('path', { d: 'M90,226 Q600,190 1110,226', fill: 'none', stroke: '#FFE45C', 'stroke-width': 5 }, canopy);
  g.mid = G(g.rock);
  const hull = G(g.rock);
  E('path', { d: 'M40,532 L1160,532 Q1150,640 1040,690 L170,690 Q60,640 40,532 Z', fill: linGrad('#3E8ED8', '#1E5A9E', true), stroke: '#14243A', 'stroke-width': 5, 'stroke-linejoin': 'round' }, hull);
  E('path', { d: 'M40,532 L1160,532 L1158,556 L42,556 Z', fill: '#C9A06A', stroke: '#6B4423', 'stroke-width': 4 }, hull);   // gunwale
  E('path', { d: 'M56,600 L1144,600', stroke: '#E8424F', 'stroke-width': 12 }, hull);
  E('path', { d: 'M70,624 L1130,624', stroke: '#FFFFFF', 'stroke-width': 5 }, hull);
  [230, 470, 730, 970].forEach(x => { E('circle', { cx: x, cy: 590, r: 26, fill: 'none', stroke: '#1E1E1E', 'stroke-width': 12 }, hull); E('path', { d: `M${x},556 L${x},564`, stroke: '#5A4A3A', 'stroke-width': 4 }, hull); });
  g.front = hull;
  // foreground water over the hull's bottom
  const fgw = G(g);
  const fgPath = E('path', { d: '', fill: dusk ? '#7A5A8A' : '#1E6E9E', opacity: 0.95 }, fgw);
  g.gunwale = 540;
  g.upd = t => {
    const a = Math.sin(t * 1.3) * 0.8, dy = Math.sin(t * 1.3 + 0.6) * 4;
    g.rock.setAttribute('transform', `translate(0 ${dy.toFixed(1)}) rotate(${a.toFixed(2)} 600 600)`);
    tr(waves, -((t * 18) % 150), 0);
    let d = 'M-700,900 L-700,684';
    for (let x = -680; x <= 1880; x += 40) d += ` L${x},${(682 + Math.sin(x * 0.03 + t * 2.4) * 6).toFixed(1)}`;
    attr(fgPath, 'd', d + ' L1880,900 Z');
  };
  g.upd(0);
  return g;
}

function cbBushes(parent, y, seed, cols) {
  const g = G(parent), r = rng(seed || 3);
  let d = `M0,750 L0,${y}`;
  for (let x = 0; x <= 1200; x += 60) d += ` Q${x + 30},${(y - 30 - r() * 28).toFixed(0)} ${x + 60},${y}`;
  E('path', { d: d + ' L1200,750 Z', fill: (cols && cols[0]) || '#2E8B4E', stroke: '#1E5A32', 'stroke-width': 4 }, g);
  let d2 = `M0,750 L0,${y + 40}`;
  for (let x = -30; x <= 1200; x += 70) d2 += ` Q${x + 35},${(y + 10 - r() * 24).toFixed(0)} ${x + 70},${y + 40}`;
  E('path', { d: d2 + ' L1200,750 Z', fill: (cols && cols[1]) || '#3FA35E' }, g);
  for (let i = 0; i < 14; i++) E('circle', { cx: 40 + r() * 1120, cy: y + 30 + r() * 120, r: 5, fill: ['#FF8FB0', '#FFE45C', '#FFFFFF'][i % 3] }, g);
  return g;
}

function cbIsland(parent, place) {
  const g = G(parent), back = G(g);
  const sea = place === 'boardwalk';
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#9AD8FF', '#E6F6FF', true) }, back);
  // distant jungle
  const r = rng(place.length * 7 + 3);
  let d = 'M0,420 L0,250';
  for (let x = 0; x <= 1200; x += 50) d += ` Q${x + 25},${(200 - r() * 60).toFixed(0)} ${x + 50},${(240 + r() * 20).toFixed(0)}`;
  E('path', { d: d + ' L1200,420 Z', fill: '#4E9E62' }, back);
  d = 'M0,460 L0,320';
  for (let x = 0; x <= 1200; x += 70) d += ` Q${x + 35},${(270 - r() * 50).toFixed(0)} ${x + 70},${(310 + r() * 20).toFixed(0)}`;
  E('path', { d: d + ' L1200,460 Z', fill: '#3A8A50' }, back);
  E('rect', { x: 0, y: 440, width: 1200, height: 310, fill: '#C9A46A' }, back);   // ground / dirt
  const palms = [];
  if (place === 'shop') {
    palms.push(cbPalm(back, 1110, 470, 260, -30));
    // the shopfront
    E('rect', { x: 30, y: 230, width: 520, height: 240, fill: '#F2E6C8', stroke: '#8A6A4A', 'stroke-width': 4 }, back);
    E('path', { d: 'M10,240 L300,170 L570,240 Z', fill: '#9AA6B2', stroke: '#5A6670', 'stroke-width': 4 }, back);
    let z = ''; for (let x = 40; x < 560; x += 26) z += `M${x},${240 - 0.26 * Math.min(x - 10, 570 - x)} L${x},240 `;
    E('path', { d: z, stroke: '#7D8A96', 'stroke-width': 2 }, back);
    E('rect', { x: 70, y: 252, width: 440, height: 54, rx: 8, fill: '#E8424F', stroke: '#8E1B1B', 'stroke-width': 4 }, back);
    T(back, 290, 290, 'UBIN BICYCLE RENTAL', { size: 30, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 1 });
    E('rect', { x: 90, y: 330, width: 170, height: 140, fill: '#5A4A3A' }, back);
    E('rect', { x: 310, y: 330, width: 200, height: 90, fill: '#9CC2DC', stroke: '#5A6670', 'stroke-width': 3 }, back);
    // a rack of bikes
    const bikes = G(back); tr(bikes, 0, 0);
    ['#E8424F', '#2E7DD8', '#FFC247', '#2FA36B'].forEach((col, i) => { const b = cbBike(bikes, { col }); tr(b, 640 + i * 120, 520, 0.62); });
  } else if (place === 'quarry') {
    // granite cliffs and the lake
    E('path', { d: 'M0,300 L160,250 L300,290 L420,240 L560,300 L560,520 L0,520 Z', fill: '#A8A39A', stroke: '#6E6A62', 'stroke-width': 4 }, back);
    E('path', { d: 'M640,300 L780,240 L900,280 L1040,236 L1200,280 L1200,520 L640,520 Z', fill: '#B4AFA6', stroke: '#6E6A62', 'stroke-width': 4 }, back);
    E('path', { d: 'M60,330 L120,420 M220,300 L260,400 M760,290 L820,400 M980,280 L1010,380', stroke: '#8A857C', 'stroke-width': 4 }, back);
    E('path', { d: 'M0,430 Q600,380 1200,430 L1200,560 L0,560 Z', fill: linGrad('#3FB8A0', '#1E7A6A', true) }, back);
    E('path', { d: 'M200,450 q30,-6 60,0 M560,430 q30,-6 60,0 M880,452 q30,-6 60,0', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 3, opacity: 0.5 }, back);
    palms.push(cbPalm(back, 70, 330, 180, 20));
  } else if (place === 'boardwalk') {
    // the sea on the right, mangroves on the left, the lookout tower
    E('path', { d: 'M520,440 L1200,440 L1200,750 L520,750 Z', fill: linGrad('#5AB8E0', '#2E7DA8', true) }, back);
    E('path', { d: 'M0,440 L560,440 Q600,560 520,750 L0,750 Z', fill: '#7A6A4A' }, back);   // mud
    const tw = G(back); tr(tw, 1080, 440);
    E('path', { d: 'M-40,0 L-26,-300 M40,0 L26,-300 M-36,-80 L36,-80 M-32,-160 L32,-160 M-28,-240 L28,-240 M-36,-80 L32,-160 M36,-80 L-32,-160 M-32,-160 L28,-240 M32,-160 L-28,-240', stroke: '#6B4423', 'stroke-width': 6 }, tw);
    E('path', { d: 'M-48,-300 L48,-300 L0,-340 Z', fill: '#8A5A2A', stroke: '#4A2A10', 'stroke-width': 4 }, tw);
    E('rect', { x: -40, y: -300, width: 80, height: 22, fill: '#B07A45', stroke: '#4A2A10', 'stroke-width': 3 }, tw);
    for (let i = 0; i < 7; i++) {   // mangroves with stilt roots
      const x = 40 + i * 70 + r() * 20, y = 440, m = G(back); tr(m, x, y);
      E('path', { d: 'M-24,40 Q-10,0 0,-30 Q10,0 24,40 M-12,40 Q-4,10 0,-10 M12,40 Q4,10 0,-10', fill: 'none', stroke: '#5A3A1A', 'stroke-width': 4 }, m);
      E('ellipse', { cx: 0, cy: -60, rx: 46, ry: 40, fill: i % 2 ? '#2E7A3E' : '#3A8A4A' }, m);
    }
    // boardwalk planks receding
    E('path', { d: 'M180,750 L470,450 L560,450 L520,750 Z', fill: '#B88A56', stroke: '#6B4423', 'stroke-width': 4 }, back);
    let pl = ''; for (let k = 0; k < 12; k++) { const y = 460 + k * k * 2.2, x0 = lerp(470, 180, (y - 450) / 300), x1 = lerp(560, 520, (y - 450) / 300); pl += `M${x0.toFixed(0)},${y.toFixed(0)} L${x1.toFixed(0)},${y.toFixed(0)} `; }
    E('path', { d: pl, stroke: '#8A6232', 'stroke-width': 2.5 }, back);
  } else if (place === 'kampong') {
    palms.push(cbPalm(back, 880, 470, 300, 30), cbPalm(back, 1130, 470, 240, -20));
    // the kampong house on stilts
    const h = G(back); tr(h, 300, 470);
    for (let i = 0; i < 5; i++) E('rect', { x: -230 + i * 110, y: -60, width: 14, height: 60, fill: '#6B4423' }, h);
    E('rect', { x: -250, y: -230, width: 500, height: 170, fill: '#B07A45', stroke: '#5A3A1A', 'stroke-width': 4 }, h);
    let pl = ''; for (let y = -214; y < -60; y += 16) pl += `M-250,${y} L250,${y} `;
    E('path', { d: pl, stroke: '#8A5A2A', 'stroke-width': 2 }, h);
    E('path', { d: 'M-290,-226 L0,-330 L290,-226 Z', fill: '#9AA6B2', stroke: '#5A6670', 'stroke-width': 4, 'stroke-linejoin': 'round' }, h);
    E('rect', { x: -170, y: -190, width: 90, height: 70, fill: '#5A3A1A' }, h); E('rect', { x: 60, y: -190, width: 110, height: 70, fill: '#9CC2DC', stroke: '#5A3A1A', 'stroke-width': 4 }, h);
    E('path', { d: 'M60,-155 L170,-155 M115,-190 L115,-120', stroke: '#5A3A1A', 'stroke-width': 4 }, h);
    // fence
    let fz = ''; for (let x = 600; x < 1200; x += 30) fz += `M${x},470 L${x},420 `;
    E('path', { d: fz + 'M590,436 L1200,436 M590,458 L1200,458', stroke: '#8A6232', 'stroke-width': 6 }, back);
  } else if (place === 'hq') {
    palms.push(cbPalm(back, 80, 470, 280, 24));
    // the white canopy tent
    E('path', { d: 'M260,200 L940,200 L980,260 L220,260 Z', fill: '#FFFFFF', stroke: '#7D8A96', 'stroke-width': 4, 'stroke-linejoin': 'round' }, back);
    let sc = ''; for (let x = 240; x < 980; x += 40) sc += `M${x},260 q20,18 40,0 `;
    E('path', { d: sc, fill: '#E8424F', stroke: '#8E1B1B', 'stroke-width': 2 }, back);
    [240, 960].forEach(x => E('rect', { x: x - 6, y: 260, width: 12, height: 260, fill: '#C9D3DC', stroke: '#5A6670', 'stroke-width': 3 }, back));
    E('rect', { x: 420, y: 150, width: 360, height: 56, rx: 10, fill: '#FF8A3D', stroke: '#8A3A10', 'stroke-width': 4 }, back);
    T(back, 600, 189, 'RACE HQ', { size: 36, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 3 });
    // FINISH arch, far right
    E('path', { d: 'M1020,470 L1020,250 Q1110,200 1190,250 L1190,470', fill: 'none', stroke: '#2E7DD8', 'stroke-width': 18 }, back);
    E('rect', { x: 1030, y: 236, width: 150, height: 40, rx: 6, fill: '#FFE45C', stroke: '#8A6508', 'stroke-width': 3 }, back);
    T(back, 1105, 266, 'FINISH', { size: 26, weight: 800, anchor: 'middle', fill: '#1E3560' });
  }
  // characters go here
  g.mid = G(g);
  // the front layer
  const front = G(g);
  if (place === 'quarry') {
    E('rect', { x: 0, y: 532, width: 1200, height: 218, fill: '#9C8A6A' }, front);
    E('rect', { x: 0, y: 530, width: 1200, height: 16, rx: 4, fill: '#B07A45', stroke: '#5A3A1A', 'stroke-width': 3 }, front);
    for (let x = 40; x < 1200; x += 160) E('rect', { x, y: 540, width: 16, height: 210, fill: '#8A5A2A', stroke: '#5A3A1A', 'stroke-width': 3 }, front);
    E('rect', { x: 0, y: 600, width: 1200, height: 12, fill: '#B07A45', stroke: '#5A3A1A', 'stroke-width': 3 }, front);
  } else if (place === 'boardwalk') {
    E('rect', { x: 0, y: 545, width: 1200, height: 205, fill: '#B88A56' }, front);
    let pl = ''; for (let x = 0; x < 1200; x += 56) pl += `M${x},560 L${x},750 `;
    E('path', { d: pl, stroke: '#8A6232', 'stroke-width': 3 }, front);
    E('rect', { x: 0, y: 538, width: 1200, height: 18, rx: 4, fill: '#9C6B3E', stroke: '#5A3A1A', 'stroke-width': 3 }, front);
  } else if (place === 'hq') {
    E('rect', { x: 0, y: 532, width: 1200, height: 22, fill: '#E6EBEF', stroke: '#7D8A96', 'stroke-width': 4 }, front);
    E('path', { d: 'M0,554 L1200,554 L1200,750 L0,750 Z', fill: '#2E7DD8' }, front);
    let sc = ''; for (let x = 0; x < 1200; x += 60) sc += `M${x},554 L${x + 30},750 `;
    E('path', { d: sc, stroke: '#2A6CC0', 'stroke-width': 10 }, front);
  } else {
    cbBushes(front, place === 'kampong' ? 550 : 545, place.length, place === 'kampong' ? ['#3A8A3E', '#56A85A'] : null);
  }
  g.front = front;
  g.upd = t => palms.forEach((p, i) => tr(p.crown, p.tx, -p.h, 1, Math.sin(t * 0.9 + i) * 3));
  g.upd(0);
  return g;
}

function cbPaper(parent, x, y, w, h, o) {
  o = o || {};
  const g = G(parent);
  E('rect', { x: x + 6, y: y + 7, width: w, height: h, rx: 14, fill: 'rgba(0,0,0,0.25)' }, g);
  E('rect', { x, y, width: w, height: h, rx: 14, fill: o.fill || MK.paper, stroke: '#8FA3B8', 'stroke-width': 4 }, g);
  if (o.grid) {
    const c = o.cell || 30; let d = '';
    for (let gx = x + c; gx < x + w - 2; gx += c) d += `M${gx},${y + 4} L${gx},${y + h - 4} `;
    for (let gy = y + c; gy < y + h - 2; gy += c) d += `M${x + 4},${gy} L${x + w - 4},${gy} `;
    E('path', { d, stroke: 'rgba(80,140,200,0.18)', 'stroke-width': 1.5 }, g);
  }
  g.area = { x, y, w, h };
  return g;
}

/* ---------- maths props ---------- */
function cbNorth(parent, len, o) {
  o = o || {};
  const g = G(parent), col = o.col || MK.ink, s = o.size || 30;
  if (o.down) E('path', { d: `M0,0 L0,${o.down}`, stroke: col, 'stroke-width': 3, 'stroke-dasharray': '10 8', opacity: 0.8 }, g);
  const ln = mkDash(E('path', { d: `M0,0 L0,${-len}`, stroke: col, 'stroke-width': 4, 'stroke-linecap': 'round' }, g));
  if (o.dash) { ln.removeAttribute('pathLength'); ln.setAttribute('stroke-dasharray', '12 8'); }
  const head = G(g); tr(head, 0, -len);
  E('path', { d: 'M0,-14 L-10,6 L10,6 Z', fill: col }, head);
  T(head, 0, -20, 'N', { size: s, weight: 800, anchor: 'middle', fill: col });
  g.set = p => { p = clamp(p); op(g, p > 0.001 ? 1 : 0); if (!o.dash) mkDraw(ln, p); op(head, clamp(p * 3 - 2)); };
  g.set(1);
  return g;
}
function cbBearing(parent, o) {
  o = o || {};
  const g = G(parent), len = o.len || 170, r = o.r || 56, ink = o.ink || MK.ink, col = o.col || '#C62828', arcCol = o.arcCol || '#2E7DD8', size = o.size || 30;
  const north = o.north === false ? null : cbNorth(g, Math.max(len * 0.75, r + 50), { col: ink, size: Math.min(size, 30) });
  const wedge = E('path', { d: '', fill: arcCol, opacity: 0.16 }, g);
  const arc = E('path', { d: '', fill: 'none', stroke: arcCol, 'stroke-width': 4.5, 'stroke-linecap': 'round' }, g);
  const tip = E('path', { d: '', fill: arcCol }, g);
  const arm = E('path', { d: '', stroke: col, 'stroke-width': 5, 'stroke-linecap': 'round' }, g);
  E('circle', { r: 6, fill: ink }, g);
  const labG = G(g);
  let labEl = null, labTxt = null;
  g.north = north;
  const pt = (b, d) => [Math.sin(b * Math.PI / 180) * d, -Math.cos(b * Math.PI / 180) * d];
  g.end = (b, d) => pt(b, d === undefined ? len : d);
  g.set = (b, p, q) => {
    p = clamp(p === undefined ? 1 : p); q = clamp(q === undefined ? p : q);
    const e = pt(b, len * p);
    attr(arm, 'd', p > 0.001 ? `M0,0 L${e[0].toFixed(1)},${e[1].toFixed(1)}` : '');
    const sweep = o.anti ? -(360 - b) * q : b * q;     // degrees from North (negative = anticlockwise)
    if (Math.abs(sweep) > 0.5) {
      const a0 = -90, a1 = -90 + sweep;
      const lo = Math.min(a0, a1), hi = Math.max(a0, a1);
      attr(arc, 'd', mkArcD(0, 0, r, lo, hi));
      attr(wedge, 'd', `M0,0 L${(r * Math.cos(lo * Math.PI / 180)).toFixed(1)},${(r * Math.sin(lo * Math.PI / 180)).toFixed(1)} ` + mkArcD(0, 0, r, lo, hi).replace(/^M[^A]*/, '') + ' Z');
      const ae = a1 * Math.PI / 180, dir = sweep > 0 ? 1 : -1;
      const tx = r * Math.cos(ae), ty = r * Math.sin(ae), ux = -Math.sin(ae) * dir, uy = Math.cos(ae) * dir;
      attr(tip, 'd', `M${(tx + ux * 10).toFixed(1)},${(ty + uy * 10).toFixed(1)} L${(tx - ux * 4 + Math.cos(ae) * 8).toFixed(1)},${(ty - uy * 4 + Math.sin(ae) * 8).toFixed(1)} L${(tx - ux * 4 - Math.cos(ae) * 8).toFixed(1)},${(ty - uy * 4 - Math.sin(ae) * 8).toFixed(1)} Z`);
      op(arc, 1); op(wedge, 1); op(tip, 1);
    } else { op(arc, 0); op(wedge, 0); op(tip, 0); }
    // label: outside the arc, at the middle of the sweep
    const txt = o.label || (o.anti ? Math.round(360 - b) + '°' : cbFmt(b));
    if (txt !== labTxt) { while (labG.firstChild) labG.removeChild(labG.firstChild); labEl = mkText(labG, 0, 0, txt, { size, anchor: 'middle', fill: arcCol, weight: 800, halo: o.halo || MK.paper }); labTxt = txt; }
    const mid = -90 + (o.anti ? -(360 - b) : b) / 2, lr = r + size * 1.15;
    tr(labG, lr * Math.cos(mid * Math.PI / 180), lr * Math.sin(mid * Math.PI / 180) + size * 0.35);
    op(labG, clamp(q * 3 - 2));
  };
  g.set(o.b || 60, 0, 0);
  return g;
}
function cbArc(parent, cx, cy, r, a0, a1, o) {
  o = o || {};
  const el = mkDash(E('path', { d: mkArcD(cx, cy, r, a0, a1), fill: 'none', stroke: o.col || '#7A5CFF', 'stroke-width': o.width || 3.5, 'stroke-linecap': 'round' }, parent));
  el.set = p => { op(el, p > 0.001 ? 1 : 0); mkDraw(el, p); };
  el.set(0);
  return el;
}
function cbSeg(parent, x1, y1, x2, y2, o) {
  o = o || {};
  const el = E('path', { d: `M${x1},${y1} L${x2},${y2}`, fill: 'none', stroke: o.col || MK.ink, 'stroke-width': o.width || 4, 'stroke-linecap': 'round' }, parent);
  if (o.dash) {
    el.setAttribute('stroke-dasharray', o.dash === true ? '12 9' : o.dash);
    el.set = p => { op(el, p > 0.001 ? 1 : 0); attr(el, 'd', `M${x1},${y1} L${lerp(x1, x2, clamp(p)).toFixed(1)},${lerp(y1, y2, clamp(p)).toFixed(1)}`); };
  } else {
    mkDash(el);
    el.set = p => { op(el, p > 0.001 ? 1 : 0); mkDraw(el, p); };
  }
  el.set(0);
  return el;
}
function cbDot(parent, x, y, label, o) {
  o = o || {};
  const g = G(parent), col = o.col || MK.ink, s = o.size || 30;
  E('circle', { cx: x, cy: y, r: 6.5, fill: col }, g);
  if (label) T(g, x + (o.dx === undefined ? -16 : o.dx), y + (o.dy === undefined ? 32 : o.dy), label, { size: s, weight: 800, anchor: 'middle', fill: col });
  g.set = p => op(g, p);
  g.set(1);
  return g;
}
function cbStamp(parent, ok) { return mkStamp(parent, ok ? 'ON COURSE' : 'OFF COURSE', ok ? '#1E9E5A' : '#D32F2F'); }

/* ---------- props ---------- */
function cbSignpost(parent, deg, o) {
  o = o || {};
  const g = G(parent), len = o.len || 230, names = o.names || ['JETTY', 'CHEK JAWA'];
  E('rect', { x: -12, y: -290, width: 24, height: 290, rx: 4, fill: '#8A5A2A', stroke: '#4A2A10', 'stroke-width': 4 }, g);
  g.vertex = [0, -260];
  const armAt = (a, name, col) => {
    const ag = G(g); tr(ag, 0, -260, 1, -a);
    E('path', { d: `M0,-24 L${len - 30},-24 L${len},0 L${len - 30},24 L0,24 Z`, fill: col, stroke: '#4A2A10', 'stroke-width': 4, 'stroke-linejoin': 'round' }, ag);
    T(ag, (len - 20) / 2 + 6, 10, name, { size: 26, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
    return ag;
  };
  g.arm1 = armAt(0, names[0], '#B07A45');
  g.arm2 = armAt(deg, names[1], '#9C6B3E');
  E('circle', { cx: 0, cy: -260, r: 9, fill: '#E2B33C', stroke: '#4A2A10', 'stroke-width': 3 }, g);
  return g;
}
function cbLock(parent) {
  const g = G(parent), ink = SC_INK;
  const shackle = E('path', { d: 'M-60,-40 L-60,-90 Q-60,-130 0,-130 Q60,-130 60,-90 L60,-40', fill: 'none', stroke: '#9AA6B2', 'stroke-width': 18, 'stroke-linecap': 'round' }, g);
  const body = E('rect', { x: -110, y: -50, width: 220, height: 110, rx: 18, fill: '#2A3B44', stroke: ink, 'stroke-width': 5 }, g);
  const digits = [];
  for (let i = 0; i < 3; i++) {
    E('rect', { x: -84 + i * 58, y: -32, width: 52, height: 74, rx: 8, fill: '#F2F6FA', stroke: ink, 'stroke-width': 3 }, g);
    digits.push(T(g, -58 + i * 58, 20, '0', { size: 48, weight: 800, anchor: 'middle', fill: ink }));
  }
  g.set = (code, open) => {
    const c = String(code || '000');
    digits.forEach((d, i) => setText(d, c[i] || '0'));
    const k = clamp(open || 0);
    tr(shackle, 0, -36 * k);
    attr(body, 'fill', k > 0.5 ? '#1E9E5A' : '#2A3B44');
  };
  g.set('000', 0);
  return g;
}
function cbBike(parent, o) {
  o = o || {};
  const g = G(parent), col = o.col || '#E8424F', ink = SC_INK;
  [[-80, -46], [80, -46]].forEach(([x, y]) => { E('circle', { cx: x, cy: y, r: 46, fill: 'none', stroke: ink, 'stroke-width': 8 }, g); E('circle', { cx: x, cy: y, r: 6, fill: '#9AA6B2' }, g); });
  E('path', { d: 'M-80,-46 L-20,-46 L30,-110 L-40,-110 Z M-20,-46 L-50,-120 M30,-110 L80,-46 M30,-110 L40,-140', fill: 'none', stroke: col, 'stroke-width': 9, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, g);
  E('path', { d: 'M-68,-126 L-34,-126', stroke: ink, 'stroke-width': 10, 'stroke-linecap': 'round' }, g);
  E('path', { d: 'M24,-142 L58,-150', stroke: ink, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
  E('rect', { x: 32, y: -168, width: 44, height: 26, rx: 4, fill: 'none', stroke: '#C9D3DC', 'stroke-width': 4 }, g);   // basket
  return g;
}
function cbFlag(parent, s) {
  const g = G(parent), in_ = G(g); tr(in_, 0, 0, s || 1);
  E('rect', { x: -4, y: -170, width: 8, height: 170, fill: '#8A5A2A' }, in_);
  E('path', { d: 'M4,-168 L84,-168 L84,-88 L4,-88 Z', fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, in_);
  E('path', { d: 'M4,-168 L84,-88 L84,-168 Z', fill: '#FF7A1A' }, in_);
  E('path', { d: 'M4,-168 L84,-168 L84,-88 L4,-88 Z', fill: 'none', stroke: SC_INK, 'stroke-width': 3 }, in_);
  return g;
}
function cbWaffles(parent) {
  const g = G(parent), ink = SC_INK;
  const waf = [];
  for (let i = 0; i < 4; i++) {
    const w = G(g); tr(w, (i % 2 ? 8 : -8), -90 - i * 22);
    E('rect', { x: -60, y: -12, width: 120, height: 24, rx: 6, fill: '#E8A64A', stroke: '#8A5A1A', 'stroke-width': 3 }, w);
    E('path', { d: 'M-40,-12 L-40,12 M-20,-12 L-20,12 M0,-12 L0,12 M20,-12 L20,12 M40,-12 L40,12', stroke: '#B8782A', 'stroke-width': 2.5 }, w);
    waf.push(w);
  }
  E('rect', { x: -110, y: -100, width: 220, height: 100, rx: 10, fill: '#B07A45', stroke: ink, 'stroke-width': 5 }, g);
  E('path', { d: 'M-110,-60 L110,-60', stroke: '#8A5A2A', 'stroke-width': 4 }, g);
  E('rect', { x: -70, y: -48, width: 140, height: 34, rx: 6, fill: '#FFE45C', stroke: '#8A6508', 'stroke-width': 3 }, g);
  T(g, 0, -22, 'TREASURE', { size: 22, weight: 800, anchor: 'middle', fill: '#8A3A10' });
  [-1, 1].forEach(sd => E('path', { d: `M${sd * 110},-70 q${sd * 20},10 0,26`, fill: 'none', stroke: '#C9A06A', 'stroke-width': 6 }, g));
  const lid = G(g);
  E('path', { d: 'M-116,-100 L116,-100 L110,-130 Q0,-150 -110,-130 Z', fill: '#C98A4A', stroke: ink, 'stroke-width': 5, 'stroke-linejoin': 'round' }, lid);
  g.set = (open, k) => {
    const p = clamp(open || 0);
    lid.setAttribute('transform', `translate(${(-30 * p).toFixed(1)} ${(-70 * p).toFixed(1)}) rotate(${(-22 * p).toFixed(1)} -116 -100)`);
    const n = k === undefined ? 4 : k;
    waf.forEach((w, i) => op(w, p > 0.3 ? clamp(n - i) : 0));
  };
  g.set(0, 4);
  return g;
}
function cbMagnet(parent, s) {
  const g = G(parent), in_ = G(g); tr(in_, 0, 0, s || 1);
  E('path', { d: 'M-46,40 L-46,-6 A46,46 0 0 1 46,-6 L46,40 L18,40 L18,-6 A18,18 0 0 0 -18,-6 L-18,40 Z', fill: '#E8424F', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, in_);
  E('rect', { x: -46, y: 40, width: 28, height: 22, fill: '#C9D3DC', stroke: SC_INK, 'stroke-width': 3.5 }, in_);
  E('rect', { x: 18, y: 40, width: 28, height: 22, fill: '#C9D3DC', stroke: SC_INK, 'stroke-width': 3.5 }, in_);
  E('rect', { x: -26, y: -58, width: 52, height: 22, rx: 5, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 2.5 }, in_);
  T(in_, 0, -41, 'UBIN', { size: 16, weight: 800, anchor: 'middle', fill: '#2E7D4F' });
  return g;
}
function cbWell(parent, s) {
  const g = G(parent), in_ = G(g); tr(in_, 0, 0, s || 1);
  E('rect', { x: -70, y: -80, width: 140, height: 80, rx: 6, fill: '#A8A39A', stroke: '#5A5650', 'stroke-width': 4 }, in_);
  let st = ''; for (let y = -60; y < 0; y += 20) st += `M-70,${y} L70,${y} `;
  E('path', { d: st, stroke: '#7D786E', 'stroke-width': 2.5 }, in_);
  E('path', { d: 'M-60,-80 L-60,-170 M60,-80 L60,-170', stroke: '#6B4423', 'stroke-width': 8 }, in_);
  E('path', { d: 'M-86,-160 L0,-206 L86,-160 Z', fill: '#9C4A2A', stroke: '#5A2A10', 'stroke-width': 4, 'stroke-linejoin': 'round' }, in_);
  E('path', { d: 'M0,-150 L0,-110', stroke: '#B08A4A', 'stroke-width': 4 }, in_);
  E('rect', { x: -14, y: -112, width: 28, height: 24, rx: 4, fill: '#8A6232', stroke: '#4A2A10', 'stroke-width': 3 }, in_);
  return g;
}
