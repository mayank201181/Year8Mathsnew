/* EASY AS PI (Claude Sitcom Ep 16, Circles): the cast, sets and props of this episode.
   Bundled after engine lib.js, kit.js, mathkit.js and sitcom.js (scMake, scTalk, scKavya, scCastHuman,
   scConfessional, scLowerThird, scVideoCall, mk* maths kit). Every top-level name starts with `ci`, except `cast`.

   Characters: cast(parent, kind, o) -> g, origin at the character's centre
     o: { s (scale), mood (default mood), ... }   (humans: any scHuman option overrides, e.g. prop, lift)
     g.set({ t, talk, mood, look, sweat, still, ... })   call every frame
       talk 0..1 (use scTalk(S, t, who)); mood: neutral | happy | smug | annoyed | sad | shock | deadpan
       look -1..1 pupils left/right; still: true stops the idle bob
     HUMANS (busts, bottom of the shirt at y = 140: put them behind a stall table or the frame edge):
       'kavya'  (kavya)  Kavya, 12 (scKavya, PE shirt "8")
       'mum'    (mum)    Mum: magenta kurta, bun, bindi. Default prop: a cake server (spatula). Runs the cake stall.
       'dad'    (dad)    Dad: glasses, moustache, green tee under a cream "PI-ZZA" apron (the pizza volunteer all day).
                         Default prop: his calculator. Pass { style: 'collared', apronText: null } for the plain polo.
       'boy'    (boy)    Ah Boy, 8: orange star tee. Default: an empty hand (lift: 1 raises it)
       'priya'  (priya)  Priya, 12: school uniform, bob, yellow clip. Default prop: a pencil
       'tan'    (tan)    Mr Tan, maths teacher: shirt and tie, glasses, a "PI DAY" lanyard badge. Default prop: his
                         rubber stamp (lift: 1 raises it, ready to thump). Pass { prop: 'kopi' } etc. to swap it.
       Pass { prop: null } for no prop; { body: true } for a full body (scHumanBody, feet at 0,0; pose API).
     CARTOONS (scMake):
       'pi'     (pi)     Uncle Pi (returning from Ep 1): a brown "π" body (the top bar is his arms, two legs, the right
                         one curls), a round uncle head, grey side hair, round glasses, a moustache. Never stops talking.
                         About 330 px from hair to feet at s = 1 (feet at y about 112). Default happy.
                         Extra: { digits: n } scrolls his digits ticker (under his feet) so that the first n characters
                         of CI_PI ("3.14159…") have gone past (n may be fractional; it scrolls smoothly).
                         op(g.ticker, 0) hides the ticker.
       'rad'    (rad)    Rad, the RADIUS: an orange rod with a backwards cap and an "r" badge. Laid back. His bottom end
                         is the CENTRE dot (navy, at y = +80), his top end a small dot on the circle (y = -80): length
                         g.len = 160 at s = 1. Rotate him (tr(g, x, y, s, angle)) to lie along a real radius.
       'dee'    (dee)    Dee, the DIAMETER, Rad's big brother: a blue rod EXACTLY twice Rad's length (ends at y = -160 and
                         +160, g.len = 320) with the centre dot on his belly (0, 0), sunglasses pushed up, a "d" sweatband.
                         Show-off. Default smug. Stand him next to Rad at the same s and d = 2r is visible.
                         Extra (both): { arms: 0..1 } arm-wave size (default 0.4).
       'perry'  (perry)  Perry, the PERIMETER ANT: an upright red-brown ant (head, thorax, abdomen), six legs, antennae, a
                         hi-vis vest and a trundle wheel (a measuring wheel) in one hand. Walks every boundary. About
                         230 px tall at s = 1 (feet at y about 112). Extra: { walk: phase } swings the legs (pass t * 6
                         while walking, a constant when still); { wheel: degrees } spins the trundle wheel.
                         Use s 0.3-0.45 when he walks along a drawn shape (e.g. a cake edge).
       'gent'   (gent)   Tan Gent, the TANGENT: a very straight, very tall dark-green rod of a gentleman with a top hat, a
                         monocle, a grey moustache, a bow tie and a "90°" lapel badge. Posh. About 330 px tall (hat top
                         y -170, foot point y +160). He touches things at ONE point: his foot point (0, 160).
       'sal'    (sal)    Sal, the SECTOR: a pizza slice (tip down at (0, 110), the crust ARC on top, radius 220),
                         cheese, tomato, basil, olives, mushrooms; a little "θ" angle mark at her tip. Default happy.
                         Extra: { ang: degrees } opens the wedge (default 45; toppings stay inside).

   Shots
     ciConf(parent, who)             confessional background tinted for that character (scConfessional); g.set(p, t)
     CI_TINT                         the confessional colours per character
     ciLowerThird(parent, who)       scLowerThird with this episode's name and role for `who` (CI_LT); g.set(p)

   Sets (full stage 1200 x 750; each returns g)
     ciHall(parent)       wide shot of the school hall on Pi Day: a wooden stage at the back with red curtains, the
                          banner "PI DAY FAIR · 3.14" over the stage, bunting of π's digits, tall arched windows (a
                          rectangle with a semicircle on top), a round wall clock, a basketball hoop, the wooden floor
                          and four fair stalls (MEASURE A CIRCLE, DAD'S PI-ZZA, MUM'S CAKES, GUESS THE ROLL).
                          g.upd(t) sways the bunting and turns the clock. g.door = [x, y] the side door (where Uncle Pi
                          lingers in the cold open); g.stage = [x, y] centre front of the stage floor;
                          g.stalls = [[x, y] x 4] the stall fronts (zoom targets).
     ciStall(parent, o)   close-up of one fair stall from the visitor side: the hall wall with bunting, a stall sign
                          board (o.title, o.col, o.sub) at y 104-180, a pin board on the left wall (g.board: a <g>, put
                          posters in it at about (230, 300)), the stall table: LAYERS g.mid (characters behind the table:
                          a bust at y about 440 hides its shirt hem), g.front (the table and its cloth), g.top (props on
                          the table, drawn last). g.tableY = 530 (table top). g.title(str) changes the sign text.
                          g.upd(t) sways the bunting.
     ciField(parent)      the school field on a sunny morning: the school block behind with a PI DAY FAIR banner, trees,
                          the red running track crossing the frame (lanes at y 470-560), the grass below. g.ground = 560.
                          Put busts behind g.front (a low hedge-and-bench strip along the bottom, y 600+) when needed.
                          g.upd(t) drifts the clouds.

   Props (around their own origin)
     CI_PI                           '3.14159265358979323846…' (300 characters): the digits Uncle Pi says, in order
     CI_COL                          palette: pizza (crust, cheese, sauce, basil, olive), cake, ribbon, track, grass ...
     ciStamp(parent, ok)             mkStamp 'EASY AS PI' (green, ok true) or 'HALF-BAKED' (red). g.set(p) thumps it in.
                                     About 560 px wide at scale 1: scale it (tr(g, x, y, 0.5)).
     ciPassport(parent, o)           Kavya's PI PASSPORT, an open booklet, centred, 420 x 280. o: { name ('KAVYA') }.
                                     g.mark(i, ok, p) thumps a small stamp (EASY / HALF) into box i (0..5).
     ciPizza(parent, r, o)           a whole vegetarian pizza (top view), centred, radius r. o: { cuts (8), toppings (true) }.
                                     g.cut(p) draws the cut lines (0..1).
     ciSlice(parent, r, deg, o)      ONE pizza slice (a sector, top view): tip at (0,0), pointing DOWN, crust arc at radius r
                                     above it, symmetric about the vertical. o: { flip: true } points the tip UP (crust
                                     at the bottom), as in the "point up, point down" rearrangement.
     ciCake(parent, r, part, o)      a round iced cake (top view), centred on the circle's centre, radius r. part: 'full' |
                                     'half' (flat edge at the bottom, the curve on top) | 'quarter' (right angle at the
                                     centre, bottom-left corner). g.ribbon(pc, ps) draws the ribbon: pc the curved part,
                                     ps the straight edge(s) (0..1 each). g.curve, g.edge: the two ribbon paths.
     ciWheel(parent, r, o)           a bicycle wheel (side view), centred: tyre, spokes, hub, a red valve dot on the rim.
                                     g.set(deg) turns it (clockwise); g.dot() -> [x, y] of the valve dot now.
     ciBadge(parent, o)              the school badge: a red circle in a 10 cm-style square tile with "SCHOOL OF PI", centred,
                                     side o.side (200). g.corners: the four corner pieces (op() them / colour).
*/

/* ---------- palette, digits ---------- */
const CI_PI = '3.14159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328230664709384460955058223172535940812848111745028410270193852110555964462294895493038196442881097566593344612847564823378678316527120190914564856692346034861045432664821339360726024914127';
const CI_COL = {
  crust: '#E3A25A', crustDk: '#B87432', cheese: '#FFD86B', sauce: '#E2553A', basil: '#2FA36B', olive: '#2A2A2A',
  mush: '#E8DCC8', cake: '#F7C6D9', icing: '#FFF4F8', cherry: '#D32F4F', ribbon: '#2E7DD8', ribbonCut: '#E8424F',
  track: '#C8553D', trackLine: '#F7EDE6', grass: '#5DBB63', grassDk: '#3E9A4A', wood: '#C9935A', woodDk: '#8A5A2E',
  hall: '#EAF0E6', stage: '#9C6B3E', curtain: '#B7322C', banner: '#2E5AAC', gold: '#FFE45C',
};

/* ---------- confessional tints, lower thirds ---------- */
const CI_TINT = {
  pi: ['#2A1A10', '#5A3A22'], rad: ['#3A2010', '#7A4418'], dee: ['#102A3A', '#1E5070'], perry: ['#2A1414', '#5A2A24'],
  gent: ['#10261C', '#1E4A36'], sal: ['#3A2410', '#7A4A18'], kavya: ['#14243A', '#25446B'], mum: ['#3A1030', '#6B1E58'],
  dad: ['#123026', '#245A48'], boy: ['#3A2410', '#6B4414'], priya: ['#1A2240', '#33407A'], tan: ['#1A2A3A', '#33506E'],
};
function ciConf(parent, who) { const c = CI_TINT[who] || CI_TINT.pi; return scConfessional(parent, c[0], c[1]); }
const CI_LT = {
  pi: ['UNCLE PI', 'Irrational. Still talking.'],
  rad: ['RAD', 'The radius. Centre to edge.'],
  dee: ['DEE', 'The diameter. Twice the man.'],
  perry: ['PERRY', 'Perimeter ant. Walks the edge.'],
  gent: ['TAN GENT', 'A tangent. Touches once.'],
  sal: ['SAL', 'A sector. Pizza slice.'],
  kavya: ['KAVYA, 12', 'Volunteered. Not by herself.'],
  mum: ['MUM', "Kavya's mum. Cake stall."],
  dad: ['DAD', '"Close enough!"'],
  boy: ['AH BOY, 8', "Kavya's brother. Asks things."],
  priya: ['PRIYA', 'Best friend. Wants every prize.'],
  tan: ['MR TAN', 'Maths teacher. Pi Day is his Christmas.'],
};
function ciLowerThird(parent, who) { const l = CI_LT[who] || [String(who).toUpperCase(), '']; return scLowerThird(parent, l[0], l[1]); }

/* ---------- the cast ---------- */
const CI_PROP = { mum: 'spatula', dad: 'calculator', priya: 'pencil' };
function ciStampProp(parent) {   // Mr Tan's rubber stamp, grip at (0,0), pad down
  const g = G(parent);
  E('path', { d: 'M-10,6 L-10,-34 Q-10,-46 0,-46 Q10,-46 10,-34 L10,6 Z', fill: '#9C6B3E', stroke: SC_INK, 'stroke-width': 3 }, g);
  E('circle', { cx: 0, cy: -50, r: 13, fill: '#B07A45', stroke: SC_INK, 'stroke-width': 3 }, g);
  E('rect', { x: -28, y: 4, width: 56, height: 14, rx: 3, fill: '#5A6670', stroke: SC_INK, 'stroke-width': 3 }, g);
  E('rect', { x: -26, y: 18, width: 52, height: 8, rx: 2, fill: '#C62828', stroke: SC_INK, 'stroke-width': 2 }, g);
  return g;
}
function cast(parent, kind, o) {
  o = o || {};
  if (kind === 'kavya') return scKavya(parent, o);
  if (SC_HUMANS[kind]) {
    let base = {};
    if (kind === 'boy') base = { hand: true };
    else if (kind === 'tan') base = { hand: true };
    else if (kind === 'dad') base = { style: 'apron', under: 'tee', shirt: '#3D8B6E', apron: '#FFF4E0', apronText: 'PI-ZZA', prop: 'calculator' };
    else base = { prop: CI_PROP[kind] || null };
    const p = Object.assign({}, base, o);
    if (p.apronText === null) { delete p.apronText; delete p.apron; if (p.style === 'apron') p.style = 'collared'; }
    const g = scCastHuman(parent, kind, p);
    if (kind === 'tan' && !o.prop && g.hand && !p.body) ciStampProp(g.hand);
    if (kind === 'tan' && !p.body) {   // the PI DAY lanyard
      const inner = g.firstChild, ly = G(inner);
      E('path', { d: 'M-30,62 L-12,112 M30,62 L12,112', stroke: '#E8424F', 'stroke-width': 5 }, ly);
      E('rect', { x: -24, y: 106, width: 48, height: 30, rx: 5, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 2.5 }, ly);
      T(ly, 0, 128, 'π', { size: 24, weight: 800, anchor: 'middle', fill: '#2E5AAC' });
      if (g.hand) { const h = g.hand.parentNode; inner.appendChild(h); }   // keep the hand in front of the lanyard
    }
    return g;
  }
  const S = { s: o.s, mood: o.mood };
  let c;
  if (kind === 'pi') {
    let tk = null, tape = null, cw = 20;
    c = scMake(parent, Object.assign(S, { seed: 47, bob: 3, mood: o.mood || 'happy',
      draw: g => {
        const d = 'M-104,-30 Q-60,-44 0,-40 Q60,-36 104,-46 M-46,-38 Q-50,30 -66,104 M40,-38 Q34,40 44,92 Q52,108 74,98';
        E('path', { d, fill: 'none', stroke: SC_INK, 'stroke-width': 40, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
        E('path', { d, fill: 'none', stroke: '#D9843A', 'stroke-width': 30, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
        E('path', { d: 'M-90,-38 Q-50,-48 -10,-46', fill: 'none', stroke: '#FFC98E', 'stroke-width': 6, 'stroke-linecap': 'round' }, g);
        [[-112, -30], [112, -46]].forEach(([x, y]) => E('circle', { cx: x, cy: y, r: 15, fill: '#E8B98A', stroke: SC_INK, 'stroke-width': 3.5 }, g));
        [[-74, 112], [84, 104]].forEach(([x, y]) => E('ellipse', { cx: x, cy: y, rx: 20, ry: 9, fill: '#3A2A20', stroke: SC_INK, 'stroke-width': 3 }, g));
        E('rect', { x: -14, y: -66, width: 28, height: 30, fill: '#E8B98A' }, g);
        E('circle', { cx: 0, cy: -116, r: 62, fill: '#E8B98A', stroke: SC_INK, 'stroke-width': 5 }, g);
        E('path', { d: 'M-62,-112 Q-66,-150 -40,-166 Q-48,-140 -46,-118 Z M62,-112 Q66,-150 40,-166 Q48,-140 46,-118 Z', fill: '#B9BEC4', stroke: SC_INK, 'stroke-width': 3 }, g);
        E('path', { d: 'M-30,-176 Q0,-186 30,-176', fill: 'none', stroke: '#B9BEC4', 'stroke-width': 5, 'stroke-linecap': 'round' }, g);
        [-1, 1].forEach(sd => E('ellipse', { cx: sd * 62, cy: -110, rx: 10, ry: 15, fill: '#E8B98A', stroke: SC_INK, 'stroke-width': 3.5 }, g));
        // a guest-of-honour rosette
        const ro = G(g); tr(ro, -24, -4);
        E('circle', { r: 15, fill: '#FFE45C', stroke: SC_INK, 'stroke-width': 2.5 }, ro);
        E('path', { d: 'M-8,12 L-12,36 L-2,30 M8,12 L12,36 L2,30', fill: 'none', stroke: '#2E5AAC', 'stroke-width': 5, 'stroke-linejoin': 'round' }, ro);
        T(ro, 0, 6, 'π', { size: 18, weight: 800, anchor: 'middle', fill: '#8A6508' });
        // the digits ticker under his feet
        tk = G(g); tr(tk, 0, 160);
        E('rect', { x: -170, y: -24, width: 340, height: 48, rx: 24, fill: 'rgba(10,27,39,0.9)', stroke: '#FFC98E', 'stroke-width': 3 }, tk);
        const clip = _clipUrl('M-158,-22 L158,-22 L158,22 L-158,22 Z');
        const w = G(tk, { 'clip-path': clip });
        tape = T(w, 150, 11, CI_PI, { size: 30, weight: 700, fill: '#FFE45C', ls: 2 });
        cw = textWidth('0123456789', 30, FD, 700) / 10 + 2;
      },
      face: { x: 0, y: -112, eye: 13, gap: 48, mouthW: 32, mouthY: 34, lidCol: '#D9A574' },
      upd: (t, g, st) => { tr(tape, -Math.max(0, st.digits || 0) * cw, 0); } }));
    const inner = c.firstChild, F = G(inner); tr(F, 0, -112);
    [-1, 1].forEach(sd => E('circle', { cx: sd * 24, cy: 0, r: 20, fill: 'rgba(255,255,255,0.14)', stroke: '#3A2A20', 'stroke-width': 4 }, F));
    E('path', { d: 'M-4,-2 Q0,-6 4,-2', fill: 'none', stroke: '#3A2A20', 'stroke-width': 4 }, F);
    E('path', { d: 'M0,20 C-10,14 -26,16 -34,26 C-24,24 -12,26 0,24 C12,26 24,24 34,26 C26,16 10,14 0,20 Z', fill: '#B9BEC4', stroke: SC_INK, 'stroke-width': 2.5 }, F);
    c.ticker = tk;
  } else if (kind === 'rad' || kind === 'dee') {
    const big = kind === 'dee', half = big ? 160 : 80, wd = big ? 66 : 58, col = big ? ['#6EC8FF', '#2E7DD8'] : ['#FFB347', '#E8751A'];
    const arms = [];
    c = scMake(parent, Object.assign(S, { seed: big ? 33 : 31, bob: big ? 2 : 4, mood: o.mood || (big ? 'smug' : 'happy'),
      draw: g => {
        [-1, 1].forEach(sd => { const a = E('path', { d: '', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g); arms.push({ a, sd }); });
        arms.forEach(({ sd }, i) => { const h = E('circle', { r: 10, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g); arms[i].h = h; });
        E('rect', { x: -wd / 2, y: -half, width: wd, height: 2 * half, rx: wd / 2, fill: linGrad(col[0], col[1], false), stroke: SC_INK, 'stroke-width': 5 }, g);
        E('path', { d: `M${-wd / 2 + 12},${-half + 30} L${-wd / 2 + 12},${half - 30}`, stroke: '#FFFFFF', 'stroke-width': 6, opacity: 0.35, 'stroke-linecap': 'round' }, g);
        // the end dots: on the circle (small, white), the centre (navy)
        E('circle', { cx: 0, cy: -half, r: 11, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
        if (big) {
          E('circle', { cx: 0, cy: half, r: 11, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
          E('circle', { cx: 0, cy: 0, r: 15, fill: '#1E2A5A', stroke: '#FFFFFF', 'stroke-width': 3 }, g);   // centre on his belly
          // "d" sweatband and sunglasses pushed up
          E('rect', { x: -wd / 2 - 3, y: 44, width: wd + 6, height: 26, rx: 6, fill: '#FFE45C', stroke: SC_INK, 'stroke-width': 3 }, g);
          T(g, 0, 65, 'd', { size: 24, weight: 800, anchor: 'middle', fill: '#1E3560', font: FD });
          const sg = G(g); tr(sg, 0, -146);
          E('path', { d: 'M-30,0 L30,0', stroke: SC_INK, 'stroke-width': 4 }, sg);
          [-1, 1].forEach(sd => E('rect', { x: sd * 15 - 13, y: -8, width: 26, height: 16, rx: 6, fill: '#1E2A33', stroke: SC_INK, 'stroke-width': 2.5 }, sg));
        } else {
          E('circle', { cx: 0, cy: half, r: 14, fill: '#1E2A5A', stroke: '#FFFFFF', 'stroke-width': 3 }, g);   // the centre end
          // backwards cap
          const cap = G(g); tr(cap, 0, -half + 6);
          E('path', { d: 'M-34,6 Q-34,-26 0,-28 Q34,-26 34,6 Z', fill: '#E8424F', stroke: SC_INK, 'stroke-width': 4 }, cap);
          E('path', { d: 'M-34,4 Q-56,2 -62,12 Q-46,16 -32,12 Z', fill: '#B8232F', stroke: SC_INK, 'stroke-width': 3 }, cap);
          const bd = G(g); tr(bd, 0, 44);
          E('circle', { r: 15, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, bd);
          T(bd, 0, 7, 'r', { size: 22, weight: 800, anchor: 'middle', fill: '#C2410C' });
        }
      },
      face: big ? { x: 0, y: -108, eye: 13, gap: 34, mouthW: 26, mouthY: 26, lidCol: '#4CA8E8' }
        : { x: 0, y: -30, eye: 13, gap: 32, mouthW: 24, mouthY: 24, lidCol: '#F0963A' },
      upd: (t, g, st) => {
        const k = st.arms === undefined ? 0.4 : st.arms, y0 = big ? -40 : 4;
        arms.forEach(({ a, h, sd }, i) => {
          const w = Math.sin(t * TAU * 1.6 + i * 2.1) * 14 * k, x1 = sd * wd / 2, x2 = sd * (wd / 2 + 34), y2 = y0 + 34 - 50 * k + w;
          a.setAttribute('d', `M${x1},${y0} Q${(sd * (wd / 2 + 30))},${y0 + 4} ${x2},${y2.toFixed(1)}`);
          attr(h, 'cx', x2); attr(h, 'cy', y2);
        });
      } }));
    c.len = 2 * half;
  } else if (kind === 'perry') {
    const legs = [];
    let wheelG = null;
    c = scMake(parent, Object.assign(S, { seed: 37, bob: 3, mood: o.mood || 'neutral',
      draw: g => {
        const body = '#8E3B2E', dk = '#5A2018';
        // legs: two walking legs and two middle legs (paths updated per frame)
        for (let i = 0; i < 4; i++) legs.push(E('path', { d: '', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g));
        // abdomen, thorax
        E('ellipse', { cx: 0, cy: 60, rx: 50, ry: 42, fill: ball('#B5523F', dk), stroke: SC_INK, 'stroke-width': 4 }, g);
        E('path', { d: 'M-40,48 Q0,58 40,48 M-44,68 Q0,80 44,68', fill: 'none', stroke: dk, 'stroke-width': 3, opacity: 0.6 }, g);
        E('ellipse', { cx: 0, cy: 2, rx: 34, ry: 28, fill: body, stroke: SC_INK, 'stroke-width': 4 }, g);
        // hi-vis vest
        E('path', { d: 'M-30,-12 L30,-12 L32,24 L-32,24 Z', fill: '#FFC247', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
        E('path', { d: 'M-30,6 L30,6', stroke: '#E8EEF2', 'stroke-width': 5 }, g);
        // the trundle wheel: in his right hand (viewer's left)
        E('path', { d: 'M-34,-4 Q-56,8 -62,30', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
        E('line', { x1: -64, y1: 30, x2: -96, y2: 104, stroke: '#5A6670', 'stroke-width': 6, 'stroke-linecap': 'round' }, g);
        wheelG = G(g); tr(wheelG, -96, 104);
        E('circle', { r: 26, fill: '#FFE45C', stroke: SC_INK, 'stroke-width': 4 }, wheelG);
        E('path', { d: 'M-26,0 L26,0 M0,-26 L0,26', stroke: SC_INK, 'stroke-width': 3 }, wheelG);
        E('circle', { cx: 0, cy: -26, r: 5, fill: '#E8424F' }, wheelG);
        E('circle', { cx: -62, cy: 30, r: 9, fill: '#2A1A22' }, g);
        // the other arm on the hip
        E('path', { d: 'M34,-4 Q58,10 40,30', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
        // head and antennae
        E('path', { d: 'M-18,-88 Q-30,-130 -50,-138 M18,-88 Q30,-130 50,-138', fill: 'none', stroke: SC_INK, 'stroke-width': 5, 'stroke-linecap': 'round' }, g);
        E('circle', { cx: -50, cy: -138, r: 8, fill: body, stroke: SC_INK, 'stroke-width': 3 }, g);
        E('circle', { cx: 50, cy: -138, r: 8, fill: body, stroke: SC_INK, 'stroke-width': 3 }, g);
        E('ellipse', { cx: 0, cy: -60, rx: 50, ry: 46, fill: ball('#C2604A', body), stroke: SC_INK, 'stroke-width': 4.5 }, g);
        E('ellipse', { cx: -34, cy: -42, rx: 9, ry: 6, fill: '#FF8FB0', opacity: 0.45 }, g);
        E('ellipse', { cx: 34, cy: -42, rx: 9, ry: 6, fill: '#FF8FB0', opacity: 0.45 }, g);
      },
      face: { x: 0, y: -66, eye: 14, gap: 40, mouthW: 24, mouthY: 26, lidCol: '#A84A38' },
      upd: (t, g, st) => {
        const w = st.walk || 0;
        const sw = [Math.sin(w), Math.sin(w + Math.PI), Math.sin(w + 1.6), Math.sin(w + 1.6 + Math.PI)];
        // back pair: the standing legs (feet near y 112); middle pair sticks out sideways
        attr(legs[0], 'd', `M-20,90 L${(-26 + sw[0] * 12).toFixed(1)},112 L${(-40 + sw[0] * 14).toFixed(1)},114`);
        attr(legs[1], 'd', `M20,90 L${(26 + sw[1] * 12).toFixed(1)},112 L${(40 + sw[1] * 14).toFixed(1)},114`);
        attr(legs[2], 'd', `M-30,14 L-62,${(40 + sw[2] * 8).toFixed(1)} L-70,${(70 + sw[2] * 8).toFixed(1)}`);
        attr(legs[3], 'd', `M30,14 L62,${(40 + sw[3] * 8).toFixed(1)} L70,${(70 + sw[3] * 8).toFixed(1)}`);
        tr(wheelG, -96, 104, 1, st.wheel || 0);
      } }));
  } else if (kind === 'gent') {
    c = scMake(parent, Object.assign(S, { seed: 41, bob: 1, mood: o.mood || 'smug',
      draw: g => {
        // the rod body: dead straight, ends in a single point
        E('path', { d: 'M-22,-70 L22,-70 L22,140 L0,160 L-22,140 Z', fill: linGrad('#3E8E5A', '#1E5A36', false), stroke: SC_INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, g);
        E('path', { d: 'M-10,-56 L-10,130', stroke: '#FFFFFF', 'stroke-width': 4, opacity: 0.25 }, g);
        // bow tie and the 90° lapel badge
        const bt = G(g); tr(bt, 0, -64);
        E('path', { d: 'M0,0 L-26,-13 L-26,13 Z M0,0 L26,-13 L26,13 Z', fill: '#C62828', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, bt);
        E('circle', { r: 6, fill: '#8E1B1B' }, bt);
        const bd = G(g); tr(bd, 0, -10);
        E('rect', { x: -19, y: -15, width: 38, height: 30, rx: 4, fill: '#FFFDF6', stroke: SC_INK, 'stroke-width': 2.5 }, bd);
        E('path', { d: 'M-11,9 L-11,-9 M-11,9 L11,9 M-11,1 L-3,1 L-3,9', fill: 'none', stroke: '#C62828', 'stroke-width': 2.5 }, bd);
        // head
        E('circle', { cx: 0, cy: -112, r: 44, fill: '#F2D2B0', stroke: SC_INK, 'stroke-width': 4.5 }, g);
        // top hat
        const hat = G(g); tr(hat, 0, -148);
        E('rect', { x: -54, y: -8, width: 108, height: 14, rx: 6, fill: '#1E1E24', stroke: SC_INK, 'stroke-width': 3 }, hat);
        E('rect', { x: -34, y: -64, width: 68, height: 58, rx: 4, fill: '#26262E', stroke: SC_INK, 'stroke-width': 3 }, hat);
        E('rect', { x: -34, y: -22, width: 68, height: 12, fill: '#3E8E5A' }, hat);
        // walking cane
        E('path', { d: 'M40,-20 L58,150 M40,-20 Q38,-40 56,-38', fill: 'none', stroke: '#6B4423', 'stroke-width': 6, 'stroke-linecap': 'round' }, g);
        E('path', { d: 'M22,-30 Q34,-24 40,-20', fill: 'none', stroke: SC_INK, 'stroke-width': 6, 'stroke-linecap': 'round' }, g);
      },
      face: { x: 0, y: -116, eye: 11, gap: 32, mouthW: 22, mouthY: 24, lidCol: '#D9B48E' } }));
    const inner = c.firstChild, F = G(inner); tr(F, 0, -116);
    E('circle', { cx: 16, cy: 0, r: 16, fill: 'rgba(255,255,255,0.14)', stroke: '#E2B33C', 'stroke-width': 3.5 }, F);
    E('path', { d: 'M30,8 Q36,40 26,62', fill: 'none', stroke: '#E2B33C', 'stroke-width': 2 }, F);
    E('path', { d: 'M0,12 C-8,8 -22,10 -28,18 C-18,16 -8,18 0,16 C8,18 18,16 28,18 C22,10 8,8 0,12 Z', fill: '#9AA6B2', stroke: SC_INK, 'stroke-width': 2 }, F);
  } else if (kind === 'sal') {
    let wedge = null, crustP = null, mark = null, cur = -1;
    const R = 220, TIP = [0, 110];
    const wedgeD = a => { const h = a / 2 * Math.PI / 180, x = Math.sin(h) * R, y = TIP[1] - Math.cos(h) * R; return { d: `M0,${TIP[1]} L${(-x).toFixed(1)},${y.toFixed(1)} A${R},${R} 0 0 1 ${x.toFixed(1)},${y.toFixed(1)} Z`, arc: `M${(-x).toFixed(1)},${y.toFixed(1)} A${R},${R} 0 0 1 ${x.toFixed(1)},${y.toFixed(1)}` }; };
    c = scMake(parent, Object.assign(S, { seed: 43, bob: 4, mood: o.mood || 'happy',
      draw: g => {
        const w0 = wedgeD(45);
        wedge = E('path', { d: w0.d, fill: CI_COL.cheese, stroke: SC_INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, g);
        crustP = E('path', { d: w0.arc, fill: 'none', stroke: CI_COL.crust, 'stroke-width': 24, 'stroke-linecap': 'round' }, g);
        // toppings (inside the 45-degree wedge, so any wider wedge still holds them)
        [[-26, -40, 'sauce'], [30, -20, 'sauce'], [0, 30, 'sauce'], [-6, -84, 'sauce']].forEach(([x, y]) => E('circle', { cx: x, cy: y, r: 13, fill: CI_COL.sauce, stroke: '#9E2A1A', 'stroke-width': 2 }, g));
        [[26, -62], [-20, 6], [8, 62]].forEach(([x, y]) => E('path', { d: `M${x - 9},${y} Q${x},${y - 12} ${x + 9},${y} Q${x},${y + 8} ${x - 9},${y} Z`, fill: CI_COL.basil, stroke: '#1E6E44', 'stroke-width': 2 }, g));
        [[-34, -70], [36, -88], [14, 10]].forEach(([x, y]) => { E('circle', { cx: x, cy: y, r: 8, fill: CI_COL.olive }, g); E('circle', { cx: x, cy: y, r: 3, fill: CI_COL.cheese }, g); });
        E('path', { d: 'M-14,82 Q-10,100 -6,108 M10,78 Q14,96 6,112', fill: 'none', stroke: '#F2C04A', 'stroke-width': 6, 'stroke-linecap': 'round' }, g);   // cheese drips
        mark = G(g); tr(mark, 0, TIP[1]);
        E('path', { d: mkArcD(0, 0, 46, -112.5, -67.5), fill: 'none', stroke: '#2E5AAC', 'stroke-width': 4 }, mark);
        T(mark, 0, -54, 'θ', { size: 26, weight: 800, anchor: 'middle', fill: '#2E5AAC' });
        // little arms
        E('path', { d: 'M-48,0 Q-84,-6 -96,-32', fill: 'none', stroke: SC_INK, 'stroke-width': 6, 'stroke-linecap': 'round' }, g);
        E('path', { d: 'M48,0 Q84,-6 96,-32', fill: 'none', stroke: SC_INK, 'stroke-width': 6, 'stroke-linecap': 'round' }, g);
        E('circle', { cx: -96, cy: -34, r: 9, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
        E('circle', { cx: 96, cy: -34, r: 9, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
      },
      face: { x: 0, y: -36, eye: 13, gap: 36, mouthW: 24, mouthY: 24, lidCol: '#F2C04A' },
      upd: (t, g, st) => {
        const a = st.ang === undefined ? 45 : st.ang;
        if (a !== cur) { cur = a; const w = wedgeD(a); attr(wedge, 'd', w.d); attr(crustP, 'd', w.arc); attr(mark.firstChild, 'd', mkArcD(0, 0, 46, -90 - a / 2, -90 + a / 2)); }
      } }));
  } else {
    c = scKavya(parent, o);
  }
  return c;
}

/* ---------- sets ---------- */
function ciBunting(parent, x0, x1, y, sag, n, labels) {
  const g = G(parent), cols = ['#E8424F', '#FFC247', '#56D69B', '#4CC9F0', '#B48CFF', '#FF8FC8'];
  const line = E('path', { d: '', fill: 'none', stroke: '#5A6670', 'stroke-width': 3 }, g);
  const flags = [];
  for (let i = 0; i < n; i++) {
    const f = G(g);
    E('path', { d: 'M-18,0 L18,0 L0,34 Z', fill: cols[i % cols.length], stroke: SC_INK, 'stroke-width': 2 }, f);
    if (labels) T(f, 0, 20, labels[i % labels.length], { size: 18, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
    flags.push(f);
  }
  g.upd = t => {
    const s = sag + Math.sin(t * 1.3) * 3;
    attr(line, 'd', `M${x0},${y} Q${(x0 + x1) / 2},${(y + 2 * s).toFixed(1)} ${x1},${y}`);
    flags.forEach((f, i) => {
      const u = (i + 0.5) / n, x = lerp(x0, x1, u), yy = y + 4 * s * u * (1 - u);
      f.setAttribute('transform', `translate(${x.toFixed(1)} ${yy.toFixed(1)}) rotate(${(Math.sin(t * 2 + i) * 5).toFixed(1)})`);
    });
  };
  g.upd(0);
  return g;
}

function ciClock(parent, r) {
  const g = G(parent);
  E('circle', { r, fill: '#FFFFFF', stroke: '#3A4A58', 'stroke-width': 6 }, g);
  let ticks = '';
  for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; ticks += `M${(Math.sin(a) * r * 0.78).toFixed(1)},${(-Math.cos(a) * r * 0.78).toFixed(1)} L${(Math.sin(a) * r * 0.9).toFixed(1)},${(-Math.cos(a) * r * 0.9).toFixed(1)} `; }
  E('path', { d: ticks, stroke: '#3A4A58', 'stroke-width': 3 }, g);
  const hh = E('line', { x1: 0, y1: 0, x2: 0, y2: -r * 0.45, stroke: SC_INK, 'stroke-width': 5, 'stroke-linecap': 'round' }, g);
  const mh = E('line', { x1: 0, y1: 0, x2: 0, y2: -r * 0.7, stroke: SC_INK, 'stroke-width': 3.5, 'stroke-linecap': 'round' }, g);
  E('circle', { r: 4, fill: '#E8424F' }, g);
  g.set = (h, m) => { hh.setAttribute('transform', `rotate(${(h * 30 + m * 0.5).toFixed(1)})`); mh.setAttribute('transform', `rotate(${(m * 6).toFixed(1)})`); };
  g.set(8, 0);
  return g;
}

function ciArchWindow(parent, x, y, w, h) {   // a rectangle with a semicircle on top; (x, y) = top-left of the rectangle
  const g = G(parent), r = w / 2;
  E('path', { d: `M${x},${y + h} L${x},${y} A${r},${r} 0 0 1 ${x + w},${y} L${x + w},${y + h} Z`, fill: linGrad('#BFE6FF', '#E6F6FF', true), stroke: '#8FA3B8', 'stroke-width': 5 }, g);
  E('path', { d: `M${x + r},${y - r} L${x + r},${y + h} M${x},${y} L${x + w},${y} M${x},${y + h / 2} L${x + w},${y + h / 2}`, stroke: '#8FA3B8', 'stroke-width': 3 }, g);
  return g;
}

function ciHall(parent) {
  const g = G(parent);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#E6EEDF', '#D5E2CC', true) }, g);   // walls
  E('rect', { x: 0, y: 0, width: 1200, height: 40, fill: '#C7D3BE' }, g);
  // tall arched windows
  [[40, 140], [180, 140], [930, 140], [1070, 140]].forEach(([x, y]) => ciArchWindow(g, x, y, 90, 170));
  // the stage
  E('rect', { x: 300, y: 70, width: 600, height: 300, fill: '#3A1418' }, g);
  E('path', { d: 'M300,70 L420,70 Q400,220 430,370 L300,370 Z', fill: CI_COL.curtain, stroke: '#6E1B16', 'stroke-width': 3 }, g);
  E('path', { d: 'M900,70 L780,70 Q800,220 770,370 L900,370 Z', fill: CI_COL.curtain, stroke: '#6E1B16', 'stroke-width': 3 }, g);
  E('path', { d: 'M300,70 L900,70 L900,104 Q600,124 300,104 Z', fill: '#9E2A24', stroke: '#6E1B16', 'stroke-width': 3 }, g);
  E('rect', { x: 280, y: 370, width: 640, height: 50, fill: linGrad('#B07A45', '#7A5028', true), stroke: '#5A3A1A', 'stroke-width': 4 }, g);
  // the banner
  const ban = G(g); tr(ban, 600, 168);
  E('rect', { x: -230, y: -40, width: 460, height: 80, rx: 10, fill: CI_COL.banner, stroke: '#FFFFFF', 'stroke-width': 5 }, ban);
  const bt = T(ban, 0, 16, 'PI DAY FAIR · 3.14', { size: 42, weight: 800, anchor: 'middle', fill: CI_COL.gold, ls: 2 });
  bt.setAttribute('stroke', '#12285A'); bt.setAttribute('stroke-width', 5); bt.setAttribute('paint-order', 'stroke');
  // round wall clock and a basketball hoop
  const clock = ciClock(g, 34); tr(clock, 1000, 72 + 30);
  const hoop = G(g); tr(hoop, 160, 60);
  E('rect', { x: -50, y: -10, width: 100, height: 64, fill: '#FFFFFF', stroke: '#5A6670', 'stroke-width': 4 }, hoop);
  E('rect', { x: -18, y: 14, width: 36, height: 26, fill: 'none', stroke: '#E8424F', 'stroke-width': 4 }, hoop);
  E('ellipse', { cx: 0, cy: 58, rx: 24, ry: 6, fill: 'none', stroke: '#E8751A', 'stroke-width': 5 }, hoop);
  // bunting of pi's digits
  const bun = ciBunting(g, 20, 1180, 46, 18, 16, ['3', '.', '1', '4', '1', '5', '9', '2', '6', '5', '3', '5', '8', '9', '7', '9']);
  // floor
  E('rect', { x: 0, y: 420, width: 1200, height: 330, fill: linGrad('#D9A86A', '#B9843F', true) }, g);
  let boards = '';
  for (let k = 0; k < 14; k++) { const y = 430 + k * k * 1.9 + k * 6; boards += `M0,${y.toFixed(0)} L1200,${y.toFixed(0)} `; }
  E('path', { d: boards, stroke: '#A8763A', 'stroke-width': 2 }, g);
  E('path', { d: 'M600,420 L600,750 M400,420 L250,750 M800,420 L950,750 M200,420 L-100,750 M1000,420 L1300,750', stroke: '#A8763A', 'stroke-width': 2, opacity: 0.6 }, g);
  E('ellipse', { cx: 600, cy: 590, rx: 230, ry: 70, fill: 'none', stroke: '#F7EDE6', 'stroke-width': 5, opacity: 0.8 }, g);   // court circle
  // four fair stalls
  const names = [['MEASURE A CIRCLE', '#2E7DD8'], ["DAD'S PI-ZZA", '#C62828'], ["MUM'S CAKES", '#B8336A'], ['GUESS THE ROLL', '#2FA36B']];
  g.stalls = [];
  names.forEach(([n, col], i) => {
    const x = 20 + i * 295, w = 270, y = 470;
    E('rect', { x: x + 8, y: y - 64, width: 8, height: 64, fill: '#8F9CAB' }, g); E('rect', { x: x + w - 16, y: y - 64, width: 8, height: 64, fill: '#8F9CAB' }, g);
    E('rect', { x, y: y - 100, width: w, height: 40, rx: 6, fill: col, stroke: SC_INK, 'stroke-width': 3 }, g);
    T(g, x + w / 2, y - 71, n, { size: 26, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
    E('rect', { x, y, width: w, height: 110, rx: 4, fill: '#FFFDF6', stroke: SC_INK, 'stroke-width': 3 }, g);
    E('path', { d: `M${x},${y + 30} L${x + w},${y + 30}`, stroke: col, 'stroke-width': 8 }, g);
    E('circle', { cx: x + w / 2, cy: y + 72, r: 24, fill: 'none', stroke: col, 'stroke-width': 5 }, g);
    g.stalls.push([x + w / 2, y + 40]);
  });
  g.door = [1130, 380]; g.stage = [600, 395];
  E('rect', { x: 1090, y: 220, width: 100, height: 200, rx: 6, fill: '#8A5A2E', stroke: '#5A3A1A', 'stroke-width': 4 }, g);
  E('rect', { x: 1102, y: 236, width: 34, height: 60, fill: '#BFE6FF', stroke: '#5A3A1A', 'stroke-width': 3 }, g);
  E('circle', { cx: 1104, cy: 330, r: 6, fill: '#E2B33C' }, g);
  g.upd = t => { bun.upd(t); clock.set(8, (t * 2) % 60); };
  return g;
}

function ciStall(parent, o) {
  o = o || {};
  const g = G(parent), back = G(g), col = o.col || '#2E5AAC';
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#E6EEDF', '#D5E2CC', true) }, back);
  ciArchWindow(back, 990, 220, 120, 200);
  const bun = ciBunting(back, -20, 1220, 30, 14, 14, ['π', '3', '.', '1', '4']);
  // pin board on the left wall
  E('rect', { x: 60, y: 210, width: 290, height: 220, rx: 8, fill: '#C9935A', stroke: '#8A5A2E', 'stroke-width': 5 }, back);
  g.board = G(back);
  // stall posts and sign board
  E('rect', { x: 110, y: 120, width: 16, height: 420, fill: '#8F9CAB', stroke: '#5A6670', 'stroke-width': 3 }, back);
  E('rect', { x: 1074, y: 120, width: 16, height: 420, fill: '#8F9CAB', stroke: '#5A6670', 'stroke-width': 3 }, back);
  E('rect', { x: 100, y: 104, width: 1000, height: 76, rx: 10, fill: linGrad(scShade(col, 0.12), scShade(col, -0.18), true), stroke: SC_INK, 'stroke-width': 4 }, back);
  const sign = T(back, 600, 156, o.title || 'PI DAY FAIR', { size: 46, weight: 800, anchor: 'middle', fill: CI_COL.gold, ls: 2 });
  sign.setAttribute('stroke', scShade(col, -0.5)); sign.setAttribute('stroke-width', 5); sign.setAttribute('paint-order', 'stroke');
  if (o.sub) T(back, 1080, 172, o.sub, { size: 26, weight: 700, anchor: 'end', fill: '#FFFFFF', font: FB });
  // a π roundel on the sign
  const rd = G(back); tr(rd, 170, 142);
  E('circle', { r: 26, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, rd);
  T(rd, 0, 11, 'π', { size: 32, weight: 800, anchor: 'middle', fill: col });
  g.mid = G(g);
  const front = G(g);
  E('rect', { x: 80, y: 520, width: 1040, height: 24, rx: 6, fill: '#F4F7FA', stroke: '#7D8A96', 'stroke-width': 4 }, front);
  E('rect', { x: 96, y: 544, width: 1008, height: 206, fill: col, stroke: SC_INK, 'stroke-width': 4 }, front);
  let scal = '';
  for (let x = 96; x < 1104; x += 56) scal += `M${x},544 Q${x + 28},588 ${x + 56},544 `;
  E('path', { d: scal, fill: '#FFFFFF', opacity: 0.9, stroke: SC_INK, 'stroke-width': 2 }, front);
  g.front = front;
  g.top = G(g);
  g.tableY = 530;
  g.title = str => setText(sign, str);
  g.upd = t => bun.upd(t);
  return g;
}

function ciField(parent) {
  const g = G(parent);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#8FD3FF', '#DFF3FF', true) }, g);
  const clouds = [[200, 90, 1], [760, 60, 1.3], [1060, 120, 0.9]].map(([x, y, s]) => {
    const c = G(g); tr(c, x, y, s);
    E('path', { d: 'M-60,10 Q-60,-20 -30,-18 Q-20,-44 10,-36 Q36,-50 50,-20 Q76,-18 72,10 Z', fill: '#FFFFFF', opacity: 0.9 }, c);
    return { c, x, y, s };
  });
  // the school block behind
  E('rect', { x: 120, y: 150, width: 960, height: 230, fill: '#F1E6D2', stroke: '#B8A27A', 'stroke-width': 4 }, g);
  E('rect', { x: 120, y: 140, width: 960, height: 22, fill: '#B7322C' }, g);
  let wins = '';
  for (let r = 0; r < 3; r++) for (let k = 0; k < 12; k++) wins += `M${150 + k * 76},${182 + r * 62} h48 v34 h-48 Z `;
  E('path', { d: wins, fill: '#9CC2DC', stroke: '#7D8A96', 'stroke-width': 2 }, g);
  const ban = G(g); tr(ban, 600, 128);
  E('rect', { x: -170, y: -30, width: 340, height: 60, rx: 8, fill: CI_COL.banner, stroke: '#FFFFFF', 'stroke-width': 4 }, ban);
  T(ban, 0, 12, 'PI DAY FAIR · 3.14', { size: 32, weight: 800, anchor: 'middle', fill: CI_COL.gold });
  // trees
  [[60, 330], [1140, 320]].forEach(([x, y]) => {
    E('rect', { x: x - 10, y, width: 20, height: 80, fill: '#8B5A2B' }, g);
    E('circle', { cx: x, cy: y - 20, r: 60, fill: '#3E9A4A', stroke: '#2A6E34', 'stroke-width': 4 }, g);
  });
  // grass and the track
  E('rect', { x: 0, y: 380, width: 1200, height: 370, fill: linGrad(CI_COL.grass, CI_COL.grassDk, true) }, g);
  E('rect', { x: 0, y: 470, width: 1200, height: 90, fill: CI_COL.track }, g);
  E('path', { d: 'M0,492 L1200,492 M0,514 L1200,514 M0,537 L1200,537', stroke: CI_COL.trackLine, 'stroke-width': 3 }, g);
  E('path', { d: 'M0,470 L1200,470 M0,560 L1200,560', stroke: '#FFFFFF', 'stroke-width': 5 }, g);
  g.front = G(g);
  g.ground = 560;
  g.upd = t => clouds.forEach(({ c, x, y, s }, i) => tr(c, ((x + t * (6 + i * 3)) % 1400) - 100, y, s));
  return g;
}

/* ---------- props ---------- */
function ciStamp(parent, ok) { return mkStamp(parent, ok ? 'EASY AS PI' : 'HALF-BAKED', ok ? '#1E9E5A' : '#D32F2F'); }

function ciPassport(parent, o) {
  o = o || {};
  const g = G(parent);
  E('rect', { x: -206, y: -136, width: 420, height: 280, rx: 14, fill: 'rgba(0,0,0,0.25)' }, g);
  E('rect', { x: -210, y: -140, width: 420, height: 280, rx: 14, fill: '#1E3F7A', stroke: SC_INK, 'stroke-width': 4 }, g);
  E('rect', { x: -200, y: -130, width: 196, height: 260, rx: 8, fill: '#FFFDF6' }, g);
  E('rect', { x: 4, y: -130, width: 196, height: 260, rx: 8, fill: '#FFFDF6' }, g);
  E('line', { x1: 0, y1: -130, x2: 0, y2: 130, stroke: '#9AA6B2', 'stroke-width': 3 }, g);
  T(g, -102, -84, 'PI', { size: 40, weight: 800, anchor: 'middle', fill: '#1E3F7A' });
  T(g, -102, -46, 'PASSPORT', { size: 28, weight: 800, anchor: 'middle', fill: '#1E3F7A', ls: 2 });
  E('circle', { cx: -102, cy: 20, r: 40, fill: '#FFE45C', stroke: SC_INK, 'stroke-width': 3 }, g);
  T(g, -102, 36, 'π', { size: 50, weight: 800, anchor: 'middle', fill: '#1E3F7A' });
  T(g, -102, 104, o.name || 'KAVYA', { size: 26, weight: 800, anchor: 'middle', fill: SC_INK });
  const boxes = [];
  for (let i = 0; i < 6; i++) {
    const x = 54 + (i % 2) * 96, y = -86 + Math.floor(i / 2) * 82;
    E('circle', { cx: x, cy: y, r: 34, fill: 'none', stroke: '#C9D3DC', 'stroke-width': 3, 'stroke-dasharray': '6 5' }, g);
    const ok = G(g), bad = G(g);
    [[ok, '#1E9E5A', 'EASY'], [bad, '#D32F2F', 'HALF']].forEach(([s, col, txt]) => {
      tr(s, x, y, 1, -12);
      E('circle', { r: 32, fill: 'none', stroke: col, 'stroke-width': 5 }, s);
      T(s, 0, 9, txt, { size: 22, weight: 800, anchor: 'middle', fill: col });
      op(s, 0);
    });
    boxes.push({ ok, bad, x, y });
  }
  g.mark = (i, okk, p) => { const b = boxes[i]; if (!b) return; const s = okk ? b.ok : b.bad; p = clamp(p); op(okk ? b.bad : b.ok, 0); op(s, p > 0 ? 1 : 0); tr(s, b.x, b.y, lerp(1.8, 1, Math.min(1, p / 0.6)), -12); };
  return g;
}

function ciToppings(parent, r, seed) {
  const g = G(parent), rr = rng(seed || 3);
  for (let i = 0; i < 14; i++) {
    const a = rr() * TAU, d = Math.sqrt(rr()) * r * 0.78, x = Math.cos(a) * d, y = Math.sin(a) * d, k = i % 4;
    if (k === 0) E('circle', { cx: x, cy: y, r: r * 0.085, fill: CI_COL.sauce, stroke: '#9E2A1A', 'stroke-width': 1.5 }, g);
    else if (k === 1) E('circle', { cx: x, cy: y, r: r * 0.05, fill: CI_COL.olive }, g);
    else if (k === 2) E('ellipse', { cx: x, cy: y, rx: r * 0.07, ry: r * 0.045, fill: CI_COL.basil, transform: `rotate(${(rr() * 180).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})` }, g);
    else E('path', { d: `M${(x - r * 0.06).toFixed(1)},${y.toFixed(1)} a${(r * 0.06).toFixed(1)},${(r * 0.05).toFixed(1)} 0 0 1 ${(r * 0.12).toFixed(1)},0 Z`, fill: CI_COL.mush, stroke: '#A89C82', 'stroke-width': 1.5 }, g);
  }
  return g;
}

function ciPizza(parent, r, o) {
  o = o || {};
  const g = G(parent), n = o.cuts === undefined ? 8 : o.cuts;
  E('circle', { r: r + 4, fill: 'rgba(0,0,0,0.18)', cy: 6 }, g);
  E('circle', { r, fill: CI_COL.crust, stroke: CI_COL.crustDk, 'stroke-width': 4 }, g);
  E('circle', { r: r * 0.86, fill: CI_COL.cheese, stroke: '#E8B84A', 'stroke-width': 2 }, g);
  if (o.toppings !== false) ciToppings(g, r, o.seed);
  const cuts = [];
  for (let i = 0; i < n; i++) {
    const a = i / n * TAU - Math.PI / 2;
    const c = E('line', { x1: 0, y1: 0, x2: (Math.cos(a) * r).toFixed(1), y2: (Math.sin(a) * r).toFixed(1), stroke: '#8A5A2E', 'stroke-width': 3 }, g);
    mkDash(c); cuts.push(c);
  }
  g.cut = p => cuts.forEach(c => mkDraw(c, p));
  g.cut(o.cut === undefined ? 1 : o.cut);
  return g;
}

function ciSlice(parent, r, deg, o) {
  o = o || {};
  const g = G(parent), inner = G(g), h = deg / 2 * Math.PI / 180;
  if (o.flip) tr(inner, 0, 0, 1, 180);
  const x = Math.sin(h) * r, y = -Math.cos(h) * r, xi = Math.sin(h) * r * 0.86, yi = -Math.cos(h) * r * 0.86;
  E('path', { d: `M0,0 L${(-x).toFixed(1)},${y.toFixed(1)} A${r},${r} 0 0 1 ${x.toFixed(1)},${y.toFixed(1)} Z`, fill: CI_COL.crust, stroke: CI_COL.crustDk, 'stroke-width': 3, 'stroke-linejoin': 'round' }, inner);
  E('path', { d: `M0,0 L${(-xi).toFixed(1)},${yi.toFixed(1)} A${r * 0.86},${r * 0.86} 0 0 1 ${xi.toFixed(1)},${yi.toFixed(1)} Z`, fill: CI_COL.cheese }, inner);
  const rr = rng(o.seed || 5);
  for (let i = 0; i < 3; i++) {
    const d = r * (0.35 + 0.18 * i), a = (rr() - 0.5) * h;
    E('circle', { cx: (Math.sin(a) * d).toFixed(1), cy: (-Math.cos(a) * d).toFixed(1), r: Math.max(3, r * 0.07 * Math.min(1, deg / 40)), fill: i === 1 ? CI_COL.olive : CI_COL.sauce }, inner);
  }
  return g;
}

function ciCake(parent, r, part, o) {
  o = o || {};
  part = part || 'full';
  const g = G(parent);
  let shape, curve, edge;
  if (part === 'half') {
    shape = `M${-r},0 A${r},${r} 0 0 1 ${r},0 Z`;
    curve = `M${-r},0 A${r},${r} 0 0 1 ${r},0`; edge = `M${r},0 L${-r},0`;
  } else if (part === 'quarter') {
    shape = `M0,0 L0,${-r} A${r},${r} 0 0 1 ${r},0 Z`;
    curve = `M0,${-r} A${r},${r} 0 0 1 ${r},0`; edge = `M${r},0 L0,0 L0,${-r}`;
  } else {
    shape = `M${-r},0 A${r},${r} 0 1 1 ${r},0 A${r},${r} 0 1 1 ${-r},0 Z`;
    curve = `M${-r},0 A${r},${r} 0 1 1 ${r},0 A${r},${r} 0 1 1 ${-r},0`; edge = 'M0,0';
  }
  E('path', { d: shape, fill: 'rgba(0,0,0,0.2)', transform: 'translate(5 7)' }, g);
  E('path', { d: shape, fill: CI_COL.cake, stroke: '#B8336A', 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
  // icing swirl and cherries, clipped to the shape
  const clip = _clipUrl(shape), ic = G(g, { 'clip-path': clip });
  E('circle', { r: r * 0.78, fill: CI_COL.icing, opacity: 0.9 }, ic);
  E('path', { d: `M${-r * 0.5},0 Q${-r * 0.25},${-r * 0.3} 0,0 Q${r * 0.25},${r * 0.3} ${r * 0.5},0 M0,${-r * 0.5} Q${r * 0.3},${-r * 0.25} 0,0`, fill: 'none', stroke: '#F7A8C8', 'stroke-width': 6, 'stroke-linecap': 'round' }, ic);
  for (let i = 0; i < 8; i++) { const a = i / 8 * TAU + 0.2; E('circle', { cx: (Math.cos(a) * r * 0.62).toFixed(1), cy: (Math.sin(a) * r * 0.62).toFixed(1), r: Math.max(5, r * 0.07), fill: CI_COL.cherry, stroke: '#8E1B3A', 'stroke-width': 2 }, ic); }
  g.curve = mkDash(E('path', { d: curve, fill: 'none', stroke: CI_COL.ribbon, 'stroke-width': o.ribbonW || 10, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g));
  g.edge = mkDash(E('path', { d: edge, fill: 'none', stroke: CI_COL.ribbonCut, 'stroke-width': o.ribbonW || 10, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g));
  g.ribbon = (pc, ps) => { mkDraw(g.curve, pc); op(g.curve, pc > 0 ? 1 : 0); mkDraw(g.edge, ps); op(g.edge, ps > 0 ? 1 : 0); };
  g.ribbon(0, 0);
  return g;
}

function ciWheel(parent, r, o) {
  o = o || {};
  const g = G(parent), spin = G(g);
  E('circle', { r, fill: 'none', stroke: '#26262E', 'stroke-width': r * 0.14 }, g);
  E('circle', { r: r * 0.9, fill: 'none', stroke: '#9AA6B2', 'stroke-width': 4 }, g);
  let sp = '';
  for (let i = 0; i < 16; i++) { const a = i / 16 * TAU; sp += `M0,0 L${(Math.cos(a) * r * 0.88).toFixed(1)},${(Math.sin(a) * r * 0.88).toFixed(1)} `; }
  E('path', { d: sp, stroke: '#C9D3DC', 'stroke-width': 2 }, spin);
  E('circle', { cx: 0, cy: r, r: Math.max(6, r * 0.07), fill: '#E8424F', stroke: SC_INK, 'stroke-width': 2 }, spin);   // valve dot, starts at the bottom
  E('circle', { r: r * 0.1, fill: '#5A6670', stroke: SC_INK, 'stroke-width': 3 }, g);
  let ang = 0;
  g.set = deg => { ang = deg; tr(spin, 0, 0, 1, deg); };
  g.dot = () => { const a = (90 + ang) * Math.PI / 180; return [Math.cos(a) * r, Math.sin(a) * r]; };
  return g;
}

function ciBadge(parent, o) {
  o = o || {};
  const s = o.side || 200, h = s / 2, g = G(parent);
  E('rect', { x: -h, y: -h, width: s, height: s, rx: 4, fill: '#FFFDF6', stroke: SC_INK, 'stroke-width': 4 }, g);
  g.corners = G(g);
  E('path', { d: `M${-h},${-h} L${-h},${h} L${h},${h} L${h},${-h} Z M${-h},0 A${h},${h} 0 1 0 ${h},0 A${h},${h} 0 1 0 ${-h},0 Z`, fill: '#FFC247', 'fill-rule': 'evenodd' }, g.corners);
  E('circle', { r: h, fill: '#C62828', stroke: SC_INK, 'stroke-width': 4 }, g);
  T(g, 0, -h * 0.2, 'SCHOOL', { size: Math.max(16, s * 0.1), weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  T(g, 0, h * 0.42, 'π', { size: s * 0.3, weight: 800, anchor: 'middle', fill: '#FFE45C' });
  op(g.corners, 0);
  return g;
}
