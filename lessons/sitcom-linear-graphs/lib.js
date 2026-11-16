/* RISE OVER RUN (Claude Sitcom Ep 12, Straight-Line & Real-Life Graphs): the cast, sets and props of this episode.
   Bundled after engine lib.js, kit.js, mathkit.js and sitcom.js (scMake, scTalk, scKavya, scCastHuman,
   scConfessional, scLowerThird, scVideoCall, mk* maths kit). Every top-level name starts with `lg`, except `cast`.

   Characters: cast(parent, kind, o) -> g, origin at the character's centre, about 200-260 px tall at s = 1
     o: { s (scale), mood (default mood), ... }   (humans: any scHuman option overrides, e.g. prop, lift)
     g.set({ t, talk, mood, look, sweat, still, ... })   call every frame
       talk 0..1 (use scTalk(S, t, who)); mood: neutral | happy | smug | annoyed | sad | shock | deadpan
       look -1..1 pupils left/right; still: true stops the idle bob
     HUMANS (busts, bottom of the shirt at y = 140: hide it behind g.front of a set, a bench, or the frame edge):
       'kavya'  (kavya)  Kavya, 12 (scKavya, blue PE shirt "8")
       'mum'    (mum)    Mum: magenta kurta, bun, bindi. Default: no prop (prop: 'phone' etc. works)
       'dad'    (dad)    Dad: glasses, moustache, green polo. Default prop: his OPERATION BEACH DAY clipboard
                         (lgPlanBoard, in g.hand); { watch: true } adds the London smartwatch on that wrist (g.watch,
                         an lgWatch: g.watch.set(text)). lift: 1 raises the hand and its prop.
       'boy'    (boy)    Ah Boy, 8: orange star tee. Default: an empty hand (lift: 1 raises it)
       'priya'  (priya)  Priya, 12: weekend purple tee, bob, yellow clip. Default prop: her drone remote (lgRemote)
       'tan'    (tan)    Mr Tan, maths teacher, OUT JOGGING: sky-blue running tee with "RUN", red sweatband,
                         glasses. Default prop: a water bottle. (Pass { style: 'office', band: null } for his usual look.)
       Pass { prop: null } for no prop (Dad / Priya / Tan), { body: true } for a full body (scHumanBody).
     CARTOONS (scMake):
       'lionel' (lionel) Lionel, A STRAIGHT LINE: a long amber rod with an arrowhead at each end (he goes on forever),
                         a round amber head bead in the middle with a swoopy quiff, a thin actor's moustache and a red
                         cravat. Vain, theatrical, "I never bend". Default mood smug.
                         Extra: g.set({ tilt }) rotates the rod (degrees; > 0 uphill left to right, < 0 downhill,
                         90 vertical). The head stays upright. { sleep: 0..1 } shows floating "z z z" (pair it with
                         mood deadpan). Rod length o.len (default 460).
       'ex'     (ex)     Ex, THE x-COORDINATE: a fat red arrow lying down, pointing right ("I go across"), little feet,
                         an "x" badge. Relaxed, proud to go first. Default neutral. About 270 wide, 110 tall.
       'why'    (why)    Why, THE y-COORDINATE: a small blue arrow standing up, pointing up, a question-mark curl on
                         top, a "y" badge, little arms (raised with { arms: 1 }). Asks "why?". Default happy.
                         About 110 wide, 230 tall.
       'mo'     (mo)     Mo, THE GRADIENT: a mountain goat bust (cream wool, curly grey horns, a beard, a green alpine
                         hat with a feather, a coil of climbing rope). Hearty. Default happy.
                         Extra: { flag: 0..1 } raises a flag on a pole with the gradient triangle "rise / run".
       'cece'   (cece)   Cece, THE y-INTERCEPT: a crossing guard's lollipop sign with a face (red ring, white disc,
                         a "c" on her cap), a hi-vis vest on the pole, a whistle on a lanyard. Brisk. Default neutral.
                         Extra: { tweet: 0..1 } puts the whistle in her mouth and pops a "TWEET!" burst.
       'ori'    (ori)    Ori, THE ORIGIN (0, 0): a round dark-plum dot, a nightclub bouncer: sunglasses pushed up on
                         his head, an earpiece, arms folded, a gold chain with a "(0, 0)" pendant. Deep, deadpan.
                         Default deadpan. Extra: { arms: 0..1 } unfolds his arms into a "this way" gesture (1).

   Shots
     lgConf(parent, who)             confessional background tinted for that character (scConfessional); g.set(p, t)
     LG_TINT                         the confessional colours per character
     lgLowerThird(parent, who)       scLowerThird with this episode's name and role for `who` (LG_LT); g.set(p)

   Sets (full stage 1200 x 750; each returns g)
     lgFlat(parent)       the family's HDB living room: warm wall, window with HDB blocks, a wall clock (g.clock(h, m)),
                          a shelf, the floor. LAYERS: g.mid (characters: a bust at y about 470 hides its hem behind the
                          sofa), g.front (the sofa back, y 600-750), g.top (props in front of the sofa). g.chart is
                          Dad's flipchart on its easel (an lgFlipchart, at x 860, top y 150), drawn in the back layer.
     lgPark(parent, o)    East Coast Park, side view: sky, the sea with ships at anchor, a sand strip, grass, two coconut
                          trees and the cycle path. o: { sky: 'day' | 'noon' | 'evening' }. g.upd(t) moves waves and fronds.
                          LAYERS: g.mid (characters), g.front (a low hedge along the bottom, y 640-750), g.top.
                          g.trees [[x, y] of each tree's crown]. g.horizon (y of the sea's horizon: 300).
     lgMapBoard(parent, o)  the park map on a wooden sign: "EAST COAST PARK" header and an mkAxes grid
                          x -4..8, y -7..6 (unit o.unit, default 36). Origin = the board's top-left corner; its size is
                          g.W x g.H. g.ax (the axes), g.at(x, y) -> [px, py] in board coordinates,
                          g.icon(kind, x, y, o) -> a map icon at (x, y) with .set(p): kinds 'kiosk' (bike kiosk),
                          'picnic', 'toilet', 'beach', 'jetty', 'cart' (ice cream), 'dad', 'mum', 'drone', 'pin'.
     lgPicnic(parent)     the picnic lawn by the sea: a big striped mat in perspective, the cooler box, a basket.
                          LAYERS: g.mid (characters behind the mat edge), g.front (the near edge of the mat and grass,
                          y 610-750), g.top. g.upd(t) moves the sea.
     lgSkate(parent)      the skate park: concrete, graffiti wall, and three ramps in side view drawn TO SCALE
                          (1 m = 60 px, ground at y 610): A rise 2 run 4, B rise 3 run 5, C rise 1 run 2, each with a lettered sign.
                          g.ramps[i] = { g, x0, y0, run, rise } (x0, y0 the bottom-left corner in stage px; rise and run
                          in metres). g.tri(i) -> a rise/run triangle overlay for ramp i with labels "run 4 m" and
                          "rise 2 m"; .set(p). LAYERS: g.mid, g.front (the near kerb, y 650-750).
     lgShops(parent)      two bike-hire shop fronts side by side: SHOP X "$8 + $3 an hour" (left) and SHOP Y "$5 an
                          hour" (right), bikes in racks. g.signs[0|1] (sign groups, op() or hl). LAYERS: g.mid, g.front.
     lgClub(parent)       the DIRECT PROPORTION CLUB: a night-time doorway with a neon sign, a red carpet, a velvet rope
                          (g.rope, lgVelvetRope at x 600), a guest-list board ("ON THE LIST"). g.upd(t) flickers the neon.
                          LAYERS: g.mid, g.front.

   Props (around their own origin)
     lgFlipchart(parent, o)          Dad's flipchart on an easel; origin = the top-centre of the paper (paper 380 x 300).
                                     Title "OPERATION BEACH DAY", axes "time" across (8 a.m. to 8 p.m.) and "fun" up,
                                     a straight uphill line (g.line, .set(p) draws it), an ice-cream icon at 3 p.m.
                                     (g.ice). g.px(h), g.py(f) map hours (8..20) and fun (0..10) to paper px.
     lgPlanBoard(parent, s)          Dad's clipboard "OPERATION BEACH DAY" with a tiny graph; grip at (0,0)
     lgDrone(parent, o)              Priya's quadcopter, centred, about 170 wide. g.set(t, on): rotors blur when on.
     lgRemote(parent)                the drone's remote control (a hand prop; grip at 0,0)
     lgPhone(parent, o)              Kavya's phone, centred, 120 x 220, battery bar and "80%" readout. g.set(pct)
     lgWatch(parent, o)              Dad's London smartwatch face, centred, about 120 wide. g.set(text) (e.g. '5.0 mi')
     lgIceCream(parent, s)           a vanilla cone with a chocolate dip, base (cone tip) at (0,0), about 130 tall
     lgBike(parent, s)               a hire bicycle, side view, wheels on y = 0, about 190 wide
     lgSandwich(parent, s)           a triangle sandwich (cheese and cucumber), centred
     lgTree(parent, s)               a coconut tree, base at (0,0), about 330 tall. g.upd(t) sways the fronds
     lgCooler(parent, s)             a blue cooler box, base centre at (0,0)
     lgVelvetRope(parent, o)         two brass posts 220 apart (origin = left post base) and a red rope; g.set(open 0..1)
                                     unhooks the right end so the rope swings down
     lgStamp(parent, ok)             mkStamp 'ON THE LINE' (green, ok true) or 'OFF THE LINE' (red); g.set(p).
                                     About 520 px wide at scale 1: scale it (tr(g, x, y, 0.6)).
     lgTweet(parent)                 a yellow "TWEET!" burst, centred; g.set(p)
*/

/* ---------- confessional tints, lower thirds ---------- */
const LG_TINT = {
  lionel: ['#2E1A08', '#6B3A12'], ex: ['#3A1218', '#6E2430'], why: ['#0F2240', '#1E4478'], mo: ['#1A2E14', '#3A5A28'],
  cece: ['#33300A', '#6B6014'], ori: ['#1E1030', '#3E2260'], kavya: ['#14243A', '#25446B'], dad: ['#123026', '#245A48'],
  mum: ['#3A1030', '#6B1E58'], boy: ['#3A2410', '#6B4414'], priya: ['#22163D', '#45307A'], tan: ['#10303A', '#1E5A6E'],
};
function lgConf(parent, who) { const c = LG_TINT[who] || LG_TINT.lionel; return scConfessional(parent, c[0], c[1]); }
const LG_LT = {
  lionel: ['LIONEL', 'A straight line. Never bends.'],
  ex: ['EX', 'The x-coordinate. Goes first.'],
  why: ['WHY', 'The y-coordinate. Goes second.'],
  mo: ['MO', 'The gradient. m for mountain.'],
  cece: ['CECE', 'The y-intercept. c for crossing.'],
  ori: ['ORI', 'The origin, (0, 0). Bouncer.'],
  kavya: ['KAVYA, 12', 'Has read the plan.'],
  mum: ['MUM', "Kavya's mum. Precise."],
  dad: ['DAD', 'Planned every minute.'],
  boy: ['AH BOY, 8', 'Waiting for ice cream.'],
  priya: ['PRIYA', 'Best friend. Has a drone.'],
  tan: ['MR TAN', 'Maths teacher. Jogging. Teaching.'],
};
function lgLowerThird(parent, who) { const l = LG_LT[who] || [String(who).toUpperCase(), '']; return scLowerThird(parent, l[0], l[1]); }

const LG = { amber: '#FFB020', amberDk: '#C77A0A', red: '#E8424F', blue: '#2E7DD8', sea: '#3FA9D9', sand: '#F2DFAE', grass: '#7CC45A',
  ink: SC_INK, good: '#1E9E5A', bad: '#D32F2F', gold: '#FFE45C' };

/* ---------- props used by the humans ---------- */
function lgPlanBoard(parent, s) {
  const g = G(parent); tr(g, 0, 0, s || 1);
  E('rect', { x: -48, y: -128, width: 96, height: 124, rx: 8, fill: '#B07A45', stroke: SC_INK, 'stroke-width': 3.5 }, g);
  E('rect', { x: -40, y: -116, width: 80, height: 104, fill: '#FFFDF6' }, g);
  E('rect', { x: -18, y: -136, width: 36, height: 16, rx: 4, fill: '#9AA6B2', stroke: SC_INK, 'stroke-width': 2.5 }, g);
  T(g, 0, -100, 'OPERATION', { size: 11, weight: 800, anchor: 'middle', fill: '#C62828' });
  T(g, 0, -88, 'BEACH DAY', { size: 11, weight: 800, anchor: 'middle', fill: '#C62828' });
  E('path', { d: 'M-30,-22 L-30,-76 M-30,-22 L32,-22', fill: 'none', stroke: SC_INK, 'stroke-width': 2.5 }, g);
  E('path', { d: 'M-30,-28 L28,-70', stroke: LG.amberDk, 'stroke-width': 4, 'stroke-linecap': 'round' }, g);
  return g;
}
function lgRemote(parent) {
  const g = G(parent);
  E('rect', { x: -40, y: -70, width: 80, height: 54, rx: 14, fill: '#3A4A58', stroke: SC_INK, 'stroke-width': 3 }, g);
  E('rect', { x: -22, y: -100, width: 44, height: 30, rx: 4, fill: '#26323C', stroke: SC_INK, 'stroke-width': 2.5 }, g);
  E('rect', { x: -17, y: -96, width: 34, height: 22, rx: 2, fill: '#7FD3FF' }, g);
  [-22, 22].forEach(x => { E('circle', { cx: x, cy: -44, r: 9, fill: '#1E2830', stroke: '#8F9CAB', 'stroke-width': 2 }, g); E('circle', { cx: x, cy: -46, r: 4, fill: '#C9D3DC' }, g); });
  E('line', { x1: 30, y1: -70, x2: 38, y2: -114, stroke: SC_INK, 'stroke-width': 3, 'stroke-linecap': 'round' }, g);
  return g;
}
function lgBottle(parent) {
  const g = G(parent);
  E('rect', { x: -15, y: -92, width: 30, height: 84, rx: 10, fill: '#7FD3FF', stroke: SC_INK, 'stroke-width': 3 }, g);
  E('rect', { x: -15, y: -64, width: 30, height: 22, fill: '#2E7DD8' }, g);
  E('rect', { x: -9, y: -106, width: 18, height: 16, rx: 4, fill: '#E8424F', stroke: SC_INK, 'stroke-width': 2.5 }, g);
  return g;
}
function lgWatch(parent, o) {
  o = o || {};
  const g = G(parent); tr(g, 0, 0, o.s || 1);
  E('rect', { x: -26, y: -86, width: 52, height: 172, rx: 14, fill: '#26323C', stroke: SC_INK, 'stroke-width': 3 }, g);   // strap
  E('rect', { x: -58, y: -52, width: 116, height: 104, rx: 22, fill: '#1B2228', stroke: '#8F9CAB', 'stroke-width': 5 }, g);
  E('rect', { x: -48, y: -42, width: 96, height: 84, rx: 14, fill: '#0E1A24' }, g);
  T(g, 0, -18, 'LONDON RUN', { size: 12, weight: 800, anchor: 'middle', fill: '#56D69B' });
  g.txt = T(g, 0, 24, o.text || '5.0 mi', { size: 32, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  g.set = text => { if (g.txt.textContent !== text) setText(g.txt, text); };
  return g;
}

/* ---------- the cast ---------- */
const LG_HUMAN = {
  dad: {}, mum: {}, boy: { hand: true },
  priya: { style: 'tee', shirt: '#7B5CD6', logo: '✦', logoCol: '#FFE45C' },
  tan: { style: 'tee', shirt: '#4FB6E8', logo: 'RUN', logoCol: '#FFFFFF', band: '#E8424F', tie: null },
};
function cast(parent, kind, o) {
  o = o || {};
  if (kind === 'kavya') return scKavya(parent, o);
  if (SC_HUMANS[kind]) {
    const base = Object.assign({}, LG_HUMAN[kind] || {});
    const custom = { dad: 'plan', priya: 'remote', tan: 'bottle' }[kind];
    const wantCustom = custom && o.prop === undefined;
    if (wantCustom) { base.hand = true; base.side = kind === 'priya' ? 'right' : base.side; }
    const p = Object.assign(base, o);
    if (wantCustom) delete p.prop;
    const c = scCastHuman(parent, kind, p);
    if (wantCustom && c.hand) {
      if (custom === 'plan') lgPlanBoard(c.hand, 0.95);
      else if (custom === 'remote') lgRemote(c.hand);
      else if (custom === 'bottle') lgBottle(c.hand);
    }
    if (kind === 'dad' && o.watch && c.hand) { c.watch = lgWatch(c.hand); tr(c.watch, 0, 34, 0.42); }
    return c;
  }
  const S = { s: o.s, mood: o.mood };
  let c;
  if (kind === 'lionel') {
    const len = o.len || 460;
    let rod = null, zz = [];
    c = scMake(parent, Object.assign(S, { seed: 4, bob: 3, mood: o.mood || 'smug',
      draw: g => {
        rod = G(g);
        const h = len / 2;
        E('path', { d: `M${-h + 30},-13 L${h - 30},-13 L${h - 30},13 L${-h + 30},13 Z`, fill: LG.amber, stroke: SC_INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, rod);
        E('path', { d: `M${-h + 34},-6 L${h - 34},-6`, stroke: '#FFE08A', 'stroke-width': 5, 'stroke-linecap': 'round' }, rod);
        [-1, 1].forEach(sd => E('path', { d: `M${sd * h},0 L${sd * (h - 42)},-26 L${sd * (h - 34)},0 L${sd * (h - 42)},26 Z`, fill: LG.amber, stroke: SC_INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, rod));
        // the head bead
        E('path', { d: 'M-18,-62 Q-6,-96 26,-90 Q4,-82 6,-62 Z', fill: LG.amberDk, stroke: SC_INK, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, g);   // quiff
        E('ellipse', { cx: 0, cy: 0, rx: 66, ry: 64, fill: ball('#FFC94A', '#E8930F'), stroke: SC_INK, 'stroke-width': 5 }, g);
        E('ellipse', { cx: -24, cy: -34, rx: 14, ry: 8, fill: '#FFFFFF', opacity: 0.35 }, g);
        // red cravat
        const cv = G(g); tr(cv, 0, 62);
        E('path', { d: 'M-26,-8 Q0,6 26,-8 L14,10 Q0,4 -14,10 Z', fill: '#C62828', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, cv);
        E('path', { d: 'M-10,6 Q0,34 -4,44 Q8,30 10,6 Z', fill: '#E8424F', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, cv);
        // z z z
        zz = [0, 1, 2].map(i => T(g, 50 + i * 26, -70 - i * 30, 'z', { size: 30 + i * 8, weight: 800, fill: '#CFE3FF' }));
      },
      face: { x: 0, y: -8, eye: 15, gap: 46, mouthW: 30, mouthY: 30, lidCol: '#F2B23A' },
      upd: (t, g, st) => {
        tr(rod, 0, 0, 1, -(st.tilt || 0));
        const k = st.sleep || 0;
        zz.forEach((z, i) => { const f = (t * 0.45 + i / 3) % 1; op(z, k * Math.sin(f * Math.PI)); z.setAttribute('transform', `translate(${(f * 18).toFixed(1)} ${(-f * 30).toFixed(1)})`); });
      } }));
    const inner = c.firstChild, mo = G(inner); tr(mo, 0, 12);   // thin actor's moustache, over the mouth corners
    E('path', { d: 'M0,-2 C-10,-8 -22,-6 -30,2 C-20,0 -10,2 0,3 C10,2 20,0 30,2 C22,-6 10,-8 0,-2 Z', fill: '#6B3A12', stroke: SC_INK, 'stroke-width': 2 }, mo);
  } else if (kind === 'ex') {
    c = scMake(parent, Object.assign(S, { seed: 9, bob: 2, mood: o.mood || 'neutral',
      draw: g => {
        [-70, 10].forEach(x => E('path', { d: `M${x - 14},54 Q${x - 14},42 ${x + 4},42 L${x + 20},44 Q${x + 26},54 ${x + 18},56 Z`, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g));
        E('path', { d: 'M-130,-40 L50,-40 L50,-62 L138,0 L50,62 L50,40 L-130,40 Q-142,40 -142,28 L-142,-28 Q-142,-40 -130,-40 Z', fill: ball('#FF7A84', '#C8283A'), stroke: SC_INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, g);
        E('path', { d: 'M-128,-28 L40,-28', stroke: '#FFB3BA', 'stroke-width': 6, 'stroke-linecap': 'round', opacity: 0.8 }, g);
        const bd = G(g); tr(bd, 82, 0);
        E('circle', { r: 22, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, bd);
        mkMath(bd, 0, 9, 'x', { size: 34, fill: '#C8283A', anchor: 'middle', weight: 700 });
      },
      face: { x: -50, y: -2, eye: 15, gap: 46, mouthW: 30, mouthY: 22, lidCol: '#E2525E' } }));
  } else if (kind === 'why') {
    let arms = [];
    c = scMake(parent, Object.assign(S, { seed: 13, bob: 5, mood: o.mood || 'happy',
      draw: g => {
        [-1, 1].forEach(sd => arms.push(E('path', { d: '', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g)));
        // question-mark curl on top
        E('path', { d: 'M-6,-112 Q-30,-150 0,-162 Q30,-170 32,-144 Q32,-126 10,-120', fill: 'none', stroke: '#1E5AAC', 'stroke-width': 9, 'stroke-linecap': 'round' }, g);
        E('path', { d: 'M-36,112 L-36,-30 L-58,-30 L0,-118 L58,-30 L36,-30 L36,112 Q36,124 24,124 L-24,124 Q-36,124 -36,112 Z', fill: ball('#6EB4FF', '#1E5AAC'), stroke: SC_INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, g);
        E('path', { d: 'M-24,110 L-24,-20', stroke: '#B8DCFF', 'stroke-width': 6, 'stroke-linecap': 'round', opacity: 0.7 }, g);
        const bd = G(g); tr(bd, 0, 86);
        E('circle', { r: 20, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, bd);
        mkMath(bd, 0, 9, 'y', { size: 32, fill: '#1E5AAC', anchor: 'middle', weight: 700 });
      },
      face: { x: 0, y: 6, eye: 13, gap: 36, mouthW: 24, mouthY: 24, lidCol: '#3E86E0' },
      upd: (t, g, st) => {
        const k = st.arms || 0;
        arms.forEach((a, i) => {
          const sd = i ? 1 : -1, w = Math.sin(t * TAU * 2 + i * 2) * 10 * k;
          attr(a, 'd', `M${sd * 36},40 Q${sd * (58 + 10 * k)},${36 - 30 * k} ${sd * (60 + 12 * k)},${(70 - 110 * k + w).toFixed(1)}`);
        });
      } }));
  } else if (kind === 'mo') {
    let flag = null;
    c = scMake(parent, Object.assign(S, { seed: 17, bob: 2, mood: o.mood || 'happy',
      draw: g => {
        // flag on a pole (raised with flag: 1)
        flag = G(g);
        E('line', { x1: 0, y1: 0, x2: 0, y2: -230, stroke: '#8B5A2B', 'stroke-width': 7, 'stroke-linecap': 'round' }, flag);
        E('path', { d: 'M4,-226 L130,-226 L130,-140 L4,-140 Z', fill: '#FFFDF6', stroke: SC_INK, 'stroke-width': 3.5 }, flag);
        E('path', { d: 'M20,-152 L114,-152 L114,-212 Z', fill: '#FFE45C', stroke: SC_INK, 'stroke-width': 3 }, flag);
        T(flag, 67, -144, 'run', { size: 18, weight: 800, anchor: 'middle', fill: SC_INK });
        T(flag, 120, -176, 'rise', { size: 18, weight: 800, anchor: 'start', fill: SC_INK });
        // body: woolly chest with a rope coil
        E('path', { d: 'M-100,140 Q-98,60 -50,40 L50,40 Q98,60 100,140 Z', fill: '#F4EBDA', stroke: SC_INK, 'stroke-width': 4 }, g);
        let wool = '';
        for (let i = 0; i < 7; i++) wool += `M${-78 + i * 26},${86 + (i % 2) * 18} q10,-12 20,0 `;
        E('path', { d: wool, fill: 'none', stroke: '#D8C9AE', 'stroke-width': 4, 'stroke-linecap': 'round' }, g);
        E('path', { d: 'M-70,58 Q10,150 80,70', fill: 'none', stroke: '#E8424F', 'stroke-width': 10, 'stroke-linecap': 'round' }, g);
        E('path', { d: 'M-70,58 Q10,150 80,70', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 3, 'stroke-dasharray': '6 10' }, g);
        // horns behind the head
        [-1, 1].forEach(sd => E('path', { d: `M${sd * 30},-80 C${sd * 70},-150 ${sd * 140},-120 ${sd * 118},-60 C${sd * 110},-40 ${sd * 90},-50 ${sd * 96},-70 C${sd * 104},-100 ${sd * 70},-118 ${sd * 48},-72 Z`, fill: '#9AA6B2', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g));
        // ears
        [-1, 1].forEach(sd => E('path', { d: `M${sd * 56},-40 Q${sd * 104},-44 ${sd * 112},-18 Q${sd * 86},-10 ${sd * 58},-20 Z`, fill: '#F4EBDA', stroke: SC_INK, 'stroke-width': 3.5 }, g));
        // head
        E('path', { d: 'M-60,-60 Q-64,-110 0,-112 Q64,-110 60,-60 L48,24 Q40,62 0,64 Q-40,62 -48,24 Z', fill: '#FFF8EC', stroke: SC_INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, g);
        E('ellipse', { cx: 0, cy: 34, rx: 34, ry: 22, fill: '#F2D2C4', stroke: SC_INK, 'stroke-width': 3 }, g);
        E('ellipse', { cx: -11, cy: 28, rx: 4, ry: 5, fill: '#7A4A3A' }, g); E('ellipse', { cx: 11, cy: 28, rx: 4, ry: 5, fill: '#7A4A3A' }, g);
        E('path', { d: 'M-16,62 Q0,118 16,62 Z', fill: '#E9DFC8', stroke: SC_INK, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, g);   // beard
        // alpine hat with a feather
        const hat = G(g); tr(hat, 0, -100);
        E('path', { d: 'M-58,8 Q-60,-6 -40,-8 L-30,-40 Q0,-56 30,-40 L40,-8 Q60,-6 58,8 Z', fill: '#2F7A4A', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, hat);
        E('rect', { x: -34, y: -16, width: 68, height: 10, fill: '#C62828' }, hat);
        E('path', { d: 'M28,-14 Q60,-70 76,-80 Q66,-50 34,-10 Z', fill: '#E2B33C', stroke: SC_INK, 'stroke-width': 2.5 }, hat);
      },
      face: { x: 0, y: -40, eye: 15, gap: 50, mouthW: 26, mouthY: 82, lidCol: '#EDE2CC', iris: '#5A3A12' },
      upd: (t, g, st) => { const k = clamp(st.flag || 0); op(flag, k > 0.02 ? 1 : 0); tr(flag, 120, 140 + (1 - k) * 170); } }));
  } else if (kind === 'cece') {
    let tw = null;
    c = scMake(parent, Object.assign(S, { seed: 21, bob: 3, mood: o.mood || 'neutral',
      draw: g => {
        E('rect', { x: -10, y: 60, width: 20, height: 170, fill: '#C9D3DC', stroke: SC_INK, 'stroke-width': 4 }, g);   // pole
        // hi-vis vest on the pole
        E('path', { d: 'M-46,96 L46,96 L52,190 L-52,190 Z', fill: '#C9F23A', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
        E('path', { d: 'M-50,130 L50,130 M-51,156 L51,156', stroke: '#E6EBEF', 'stroke-width': 8 }, g);
        const bd = G(g); tr(bd, 28, 112);
        E('circle', { r: 14, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 2.5 }, bd);
        mkMath(bd, 0, 7, 'c', { size: 24, fill: '#C62828', anchor: 'middle', weight: 700 });
        // arms
        E('path', { d: 'M-46,104 Q-80,120 -78,160', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
        E('path', { d: 'M46,104 Q80,120 78,160', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
        E('circle', { cx: -78, cy: 164, r: 9, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
        E('circle', { cx: 78, cy: 164, r: 9, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
        // the sign disc
        E('circle', { r: 92, fill: '#C62828', stroke: SC_INK, 'stroke-width': 5 }, g);
        E('circle', { r: 72, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
        // cap
        const cap = G(g); tr(cap, 0, -84);
        E('path', { d: 'M-50,6 Q-50,-36 0,-38 Q50,-36 50,6 Z', fill: '#1E3560', stroke: SC_INK, 'stroke-width': 4 }, cap);
        E('path', { d: 'M-56,6 Q0,18 70,4 L66,12 Q0,26 -54,14 Z', fill: '#16284A', stroke: SC_INK, 'stroke-width': 3 }, cap);
        E('circle', { cx: 0, cy: -14, r: 12, fill: '#FFE45C', stroke: SC_INK, 'stroke-width': 2.5 }, cap);
        mkMath(cap, 0, -8, 'c', { size: 20, fill: '#1E3560', anchor: 'middle', weight: 700 });
        // lanyard and whistle
        E('path', { d: 'M-40,62 Q0,100 40,62', fill: 'none', stroke: '#E8424F', 'stroke-width': 4 }, g);
        tw = lgTweet(g); tr(tw, 120, -40, 0.8);
      },
      face: { x: 0, y: -6, eye: 14, gap: 44, mouthW: 26, mouthY: 30, lidCol: '#F0F0F0' },
      upd: (t, g, st) => {
        tw.set(st.tweet || 0);
      } }));
    // whistle: in her mouth while tweeting, else hanging on the lanyard (two copies, op() between them)
    const inner = c.firstChild;
    const wHang = G(inner); tr(wHang, 0, 92);
    const wMouth = G(inner); tr(wMouth, 22, 26, 1, -12);
    [wHang, wMouth].forEach(w => { E('rect', { x: -14, y: -8, width: 28, height: 16, rx: 6, fill: '#C9D3DC', stroke: SC_INK, 'stroke-width': 3 }, w); E('circle', { cx: 12, cy: 0, r: 9, fill: '#C9D3DC', stroke: SC_INK, 'stroke-width': 3 }, w); });
    const set0 = c.set;
    c.set = st => { set0(st); const k = (st && st.tweet) || 0; op(wHang, k > 0.3 ? 0 : 1); op(wMouth, k > 0.3 ? 1 : 0); };
    c.set({});
  } else if (kind === 'ori') {
    let fold = null, open = null;
    c = scMake(parent, Object.assign(S, { seed: 25, bob: 1, mood: o.mood || 'deadpan',
      draw: g => {
        E('circle', { cx: 0, cy: 0, r: 96, fill: ball('#6A4A8C', '#24123A'), stroke: SC_INK, 'stroke-width': 5 }, g);
        E('ellipse', { cx: -34, cy: -50, rx: 22, ry: 12, fill: '#FFFFFF', opacity: 0.18 }, g);
        // sunglasses pushed up on his head
        const sg = G(g); tr(sg, 0, -74);
        E('path', { d: 'M-58,-6 L-8,-6 L-12,14 Q-34,22 -54,12 Z M8,-6 L58,-6 L54,12 Q34,22 12,14 Z', fill: '#11161C', stroke: '#8F9CAB', 'stroke-width': 3, 'stroke-linejoin': 'round' }, sg);
        E('path', { d: 'M-8,-2 L8,-2', stroke: '#8F9CAB', 'stroke-width': 3 }, sg);
        // earpiece
        E('path', { d: 'M86,-6 Q104,20 92,60', fill: 'none', stroke: '#1B2228', 'stroke-width': 3 }, g);
        E('circle', { cx: 88, cy: -8, r: 8, fill: '#1B2228', stroke: '#8F9CAB', 'stroke-width': 2 }, g);
        // gold chain and pendant
        E('path', { d: 'M-50,60 Q0,104 50,60', fill: 'none', stroke: '#E2B33C', 'stroke-width': 5, 'stroke-dasharray': '7 4' }, g);
        const pd = G(g); tr(pd, 0, 96);
        E('rect', { x: -44, y: -16, width: 88, height: 32, rx: 10, fill: '#E2B33C', stroke: SC_INK, 'stroke-width': 3 }, pd);
        T(pd, 0, 9, '(0, 0)', { size: 22, weight: 800, anchor: 'middle', fill: '#4A3008' });
        // folded arms (default) / "this way" (arms: 1)
        fold = G(g);
        E('path', { d: 'M-92,30 Q-40,74 60,48', fill: 'none', stroke: '#24123A', 'stroke-width': 26, 'stroke-linecap': 'round' }, fold);
        E('path', { d: 'M92,34 Q40,82 -60,52', fill: 'none', stroke: '#3A2256', 'stroke-width': 26, 'stroke-linecap': 'round' }, fold);
        E('circle', { cx: 60, cy: 48, r: 14, fill: '#1B1020', stroke: '#8F9CAB', 'stroke-width': 2 }, fold);
        E('circle', { cx: -60, cy: 52, r: 14, fill: '#1B1020', stroke: '#8F9CAB', 'stroke-width': 2 }, fold);
        open = G(g);
        E('path', { d: 'M-90,30 Q-110,70 -96,96', fill: 'none', stroke: '#24123A', 'stroke-width': 24, 'stroke-linecap': 'round' }, open);
        E('path', { d: 'M90,30 Q140,40 176,20', fill: 'none', stroke: '#3A2256', 'stroke-width': 24, 'stroke-linecap': 'round' }, open);
        E('circle', { cx: 180, cy: 18, r: 15, fill: '#1B1020', stroke: '#8F9CAB', 'stroke-width': 2 }, open);
        E('circle', { cx: -96, cy: 100, r: 14, fill: '#1B1020', stroke: '#8F9CAB', 'stroke-width': 2 }, open);
      },
      face: { x: 0, y: -18, eye: 15, gap: 50, mouthW: 30, mouthY: 34, lidCol: '#4A2E6A', iris: '#1B1020' },
      upd: (t, g, st) => { const k = st.arms || 0; op(fold, k > 0.5 ? 0 : 1); op(open, k > 0.5 ? 1 : 0); } }));
  } else {
    c = scKavya(parent, o);
  }
  return c;
}

/* ---------- small props ---------- */
function lgTweet(parent) {
  const g = G(parent), inner = G(g);
  let d = '';
  for (let i = 0; i < 14; i++) { const a = i / 14 * TAU, r = i % 2 ? 58 : 92; d += (i ? 'L' : 'M') + (Math.cos(a) * r * 1.4).toFixed(1) + ',' + (Math.sin(a) * r).toFixed(1) + ' '; }
  E('path', { d: d + 'Z', fill: '#FFE45C', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, inner);
  T(inner, 0, 12, 'TWEET!', { size: 34, weight: 800, anchor: 'middle', fill: '#C62828' });
  g.set = p => { op(g, clamp(p * 3)); tr(inner, 0, 0, Math.max(0.01, 0.5 + 0.5 * pop(clamp(p)))); };
  g.set(0);
  return g;
}
function lgStamp(parent, ok) { return mkStamp(parent, ok ? 'ON THE LINE' : 'OFF THE LINE', ok ? LG.good : LG.bad); }

function lgIceCream(parent, s) {
  const g = G(parent); tr(g, 0, 0, s || 1);
  E('path', { d: 'M-34,-74 L0,0 L34,-74 Z', fill: '#E8B46A', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
  E('path', { d: 'M-24,-62 L12,-30 M-6,-74 L22,-50 M-14,-52 L18,-70 M-22,-70 L6,-48', stroke: '#B07A45', 'stroke-width': 2.5 }, g);
  E('path', { d: 'M-40,-76 Q-46,-120 0,-130 Q46,-120 40,-76 Q20,-66 0,-76 Q-20,-66 -40,-76 Z', fill: '#FFF6E0', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
  E('path', { d: 'M-36,-100 Q-20,-132 0,-130 Q24,-128 36,-102 Q20,-92 8,-104 Q-6,-90 -18,-104 Q-28,-92 -36,-100 Z', fill: '#6B3E22', stroke: SC_INK, 'stroke-width': 3 }, g);
  E('circle', { cx: 0, cy: -134, r: 9, fill: '#E8424F', stroke: SC_INK, 'stroke-width': 3 }, g);
  return g;
}
function lgSandwich(parent, s) {
  const g = G(parent); tr(g, 0, 0, s || 1);
  E('path', { d: 'M-60,30 L60,30 L0,-50 Z', fill: '#F6E2B3', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
  E('path', { d: 'M-50,24 L50,24 L0,-40 Z', fill: '#FFF6E0' }, g);
  E('path', { d: 'M-48,28 L48,28', stroke: '#7CC45A', 'stroke-width': 6 }, g);
  E('path', { d: 'M-44,20 L44,20', stroke: '#FFC94A', 'stroke-width': 5 }, g);
  return g;
}
function lgCooler(parent, s) {
  const g = G(parent); tr(g, 0, 0, s || 1);
  E('rect', { x: -70, y: -80, width: 140, height: 80, rx: 10, fill: '#2E7DD8', stroke: SC_INK, 'stroke-width': 4 }, g);
  E('rect', { x: -76, y: -96, width: 152, height: 22, rx: 8, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 4 }, g);
  E('path', { d: 'M-30,-96 Q0,-120 30,-96', fill: 'none', stroke: SC_INK, 'stroke-width': 6 }, g);
  return g;
}
function lgTree(parent, s) {
  const g = G(parent); tr(g, 0, 0, s || 1);
  E('path', { d: 'M-14,0 Q-24,-160 20,-300 L34,-296 Q-4,-160 14,0 Z', fill: '#9C6B3E', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
  let rings = '';
  for (let i = 1; i < 9; i++) { const y = -i * 33, x = -12 + i * 3.2; rings += `M${(x - 6).toFixed(1)},${y} q14,4 26,0 `; }
  E('path', { d: rings, fill: 'none', stroke: '#6B4423', 'stroke-width': 2.5 }, g);
  const crown = G(g); tr(crown, 26, -298);
  const fr = [[-150, 30], [-110, -40], [-30, -80], [60, -70], [130, -20], [150, 50], [-70, 70], [80, 80]];
  const fronds = fr.map(([dx, dy]) => E('path', { d: '', fill: '#3FA463', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, crown));
  [[-12, 14], [10, 18], [0, 4]].forEach(([x, y]) => E('circle', { cx: x, cy: y, r: 13, fill: '#7A5A2A', stroke: SC_INK, 'stroke-width': 3 }, crown));
  g.crown = [26, -298];
  g.upd = t => fr.forEach(([dx, dy], i) => {
    const w = Math.sin(t * 1.3 + i) * 6, ex = dx + w, ey = dy + Math.abs(w) * 0.5;
    const mx = ex * 0.5, my = ey * 0.5 - 30;
    attr(fronds[i], 'd', `M0,0 Q${(mx - ey * 0.12).toFixed(1)},${(my - 8).toFixed(1)} ${ex.toFixed(1)},${ey.toFixed(1)} Q${(mx + ey * 0.12).toFixed(1)},${(my + 14).toFixed(1)} 0,6 Z`);
  });
  g.upd(0);
  return g;
}
function lgBike(parent, s) {
  const g = G(parent); tr(g, 0, 0, s || 1);
  [-62, 62].forEach(x => { E('circle', { cx: x, cy: -34, r: 34, fill: 'none', stroke: SC_INK, 'stroke-width': 6 }, g); E('circle', { cx: x, cy: -34, r: 5, fill: SC_INK }, g); });
  E('path', { d: 'M-62,-34 L-14,-34 L22,-84 L-30,-84 Z M-14,-34 L-30,-84 M22,-84 L62,-34 M-30,-84 L-36,-100 M22,-84 L18,-104 L36,-104', fill: 'none', stroke: '#1FA38A', 'stroke-width': 7, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, g);
  E('rect', { x: -50, y: -106, width: 30, height: 9, rx: 4, fill: SC_INK }, g);
  E('rect', { x: 36, y: -118, width: 44, height: 22, rx: 4, fill: 'none', stroke: SC_INK, 'stroke-width': 3 }, g);   // basket
  return g;
}
function lgDrone(parent, o) {
  o = o || {};
  const g = G(parent), inner = G(g); tr(inner, 0, 0, o.s || 1);
  E('path', { d: 'M-70,-16 L70,16 M-70,16 L70,-16', stroke: '#3A4A58', 'stroke-width': 10, 'stroke-linecap': 'round' }, inner);
  const rot = [[-70, -16], [70, -16], [-70, 16], [70, 16]].map(([x, y]) => {
    E('rect', { x: x - 6, y: y - 14, width: 12, height: 14, fill: '#26323C' }, inner);
    const r = E('ellipse', { cx: x, cy: y - 16, rx: 34, ry: 6, fill: 'rgba(200,215,230,0.55)', stroke: '#8F9CAB', 'stroke-width': 2 }, inner);
    const b = E('line', { x1: x - 30, y1: y - 16, x2: x + 30, y2: y - 16, stroke: '#26323C', 'stroke-width': 4, 'stroke-linecap': 'round' }, inner);
    return { r, b, x };
  });
  E('rect', { x: -36, y: -18, width: 72, height: 34, rx: 12, fill: '#F4F7FA', stroke: SC_INK, 'stroke-width': 4 }, inner);
  E('circle', { cx: 0, cy: 18, r: 11, fill: '#26323C', stroke: SC_INK, 'stroke-width': 3 }, inner);
  E('circle', { cx: 0, cy: 18, r: 4, fill: '#7FD3FF' }, inner);
  E('circle', { cx: 24, cy: -6, r: 4, fill: '#56D69B' }, inner);
  g.set = (t, on) => rot.forEach(({ r, b, x }, i) => {
    op(r, on ? 1 : 0.15);
    const k = on ? Math.cos(t * 60 + i) : 1;
    attr(b, 'x1', x - 30 * k); attr(b, 'x2', x + 30 * k); op(b, on ? 0.5 : 1);
  });
  g.set(0, false);
  return g;
}
function lgPhone(parent, o) {
  o = o || {};
  const g = G(parent), inner = G(g); tr(inner, 0, 0, o.s || 1);
  E('rect', { x: -60, y: -110, width: 120, height: 220, rx: 18, fill: '#26323C', stroke: SC_INK, 'stroke-width': 4 }, inner);
  E('rect', { x: -50, y: -96, width: 100, height: 186, rx: 8, fill: '#0E1A24' }, inner);
  E('rect', { x: -30, y: -40, width: 60, height: 100, rx: 8, fill: 'none', stroke: '#F2F7FA', 'stroke-width': 5 }, inner);
  E('rect', { x: -12, y: -50, width: 24, height: 10, rx: 3, fill: '#F2F7FA' }, inner);
  const bar = E('rect', { x: -23, y: -33, width: 46, height: 86, rx: 4, fill: '#56D69B' }, inner);
  const pc = T(inner, 0, -62, '80%', { size: 28, weight: 800, anchor: 'middle', fill: '#F2F7FA' });
  g.set = pct => {
    const k = clamp(pct / 100);
    attr(bar, 'y', -33 + 86 * (1 - k)); attr(bar, 'height', Math.max(0, 86 * k));
    bar.setAttribute('fill', pct > 50 ? '#56D69B' : pct > 20 ? '#FFC247' : '#FF6070');
    const s = Math.round(pct) + '%'; if (pc.textContent !== s) setText(pc, s);
  };
  g.set(o.pct === undefined ? 80 : o.pct);
  return g;
}
function lgVelvetRope(parent, o) {
  o = o || {};
  const g = G(parent), w = o.w || 220;
  const rope = E('path', { d: '', fill: 'none', stroke: '#B0123E', 'stroke-width': 12, 'stroke-linecap': 'round' }, g);
  [0, w].forEach(x => {
    E('rect', { x: x - 7, y: -130, width: 14, height: 130, fill: linGrad('#FFE08A', '#B8860B', false), stroke: SC_INK, 'stroke-width': 3 }, g);
    E('circle', { cx: x, cy: -136, r: 14, fill: '#E2B33C', stroke: SC_INK, 'stroke-width': 3 }, g);
    E('ellipse', { cx: x, cy: 0, rx: 34, ry: 9, fill: '#B8860B', stroke: SC_INK, 'stroke-width': 3 }, g);
  });
  g.set = p => {
    p = clamp(p);
    const ex = lerp(w, 14, p), ey = lerp(-118, -10, p), mx = lerp(w / 2, 0, p), my = lerp(-60, -40, p);
    attr(rope, 'd', `M0,-118 Q${mx.toFixed(1)},${my.toFixed(1)} ${ex.toFixed(1)},${ey.toFixed(1)}`);
  };
  g.set(0);
  return g;
}

/* ---------- the flipchart (cold open) ---------- */
function lgFlipchart(parent, o) {
  o = o || {};
  const g = G(parent), W0 = 380, H0 = 300;
  // easel legs
  E('path', { d: `M${-W0 / 2 + 30},${H0 - 10} L${-W0 / 2 - 10},${H0 + 260} M${W0 / 2 - 30},${H0 - 10} L${W0 / 2 + 10},${H0 + 260} M0,${H0} L0,${H0 + 250}`, stroke: '#8B5A2B', 'stroke-width': 12, 'stroke-linecap': 'round' }, g);
  E('rect', { x: -W0 / 2 - 14, y: H0 - 6, width: W0 + 28, height: 18, rx: 4, fill: '#9C6B3E', stroke: '#5A3A1A', 'stroke-width': 3 }, g);
  E('rect', { x: -W0 / 2 - 10, y: -16, width: W0 + 20, height: 22, rx: 6, fill: '#5A6670', stroke: SC_INK, 'stroke-width': 3 }, g);
  E('rect', { x: -W0 / 2, y: 0, width: W0, height: H0, fill: '#FFFDF6', stroke: '#B8A27A', 'stroke-width': 3 }, g);
  T(g, 0, 40, 'OPERATION BEACH DAY', { size: 30, weight: 800, anchor: 'middle', fill: '#C62828' });
  // axes: time 8 a.m. -> 8 p.m. across, "fun" up
  const ox = -W0 / 2 + 58, oy = H0 - 46, aw = W0 - 96, ah = H0 - 110;
  g.px = h => ox + (h - 8) / 12 * aw; g.py = f => oy - f / 10 * ah;
  E('path', { d: `M${ox},${oy} L${ox + aw + 12},${oy} M${ox},${oy} L${ox},${oy - ah - 12}`, fill: 'none', stroke: SC_INK, 'stroke-width': 4, 'stroke-linecap': 'round' }, g);
  E('path', { d: `M${ox + aw + 22},${oy} l-12,-7 l0,14 Z M${ox},${oy - ah - 22} l-7,12 l14,0 Z`, fill: SC_INK }, g);
  let tk = '';
  for (let h = 8; h <= 20; h += 2) tk += `M${g.px(h).toFixed(1)},${oy - 5} L${g.px(h).toFixed(1)},${oy + 5} `;
  E('path', { d: tk, stroke: SC_INK, 'stroke-width': 3 }, g);
  T(g, g.px(8), oy + 30, '8am', { size: 20, weight: 700, anchor: 'middle', fill: '#5A4A52' });
  T(g, g.px(20), oy + 30, '8pm', { size: 20, weight: 700, anchor: 'middle', fill: '#5A4A52' });
  T(g, ox + aw / 2, oy + 30, 'time', { size: 22, weight: 800, anchor: 'middle', fill: SC_INK });
  const fl = T(g, ox - 14, oy - ah / 2, 'fun', { size: 22, weight: 800, anchor: 'middle', fill: SC_INK }); fl.setAttribute('transform', `rotate(-90 ${ox - 14} ${oy - ah / 2})`);
  // the plan: a straight uphill line
  g.line = E('path', { d: `M${g.px(8)},${g.py(1)} L${g.px(20)},${g.py(9.4)}`, fill: 'none', stroke: LG.amberDk, 'stroke-width': 7, 'stroke-linecap': 'round', pathLength: 1, 'stroke-dasharray': '1 1' }, g);
  g.line.set = p => g.line.setAttribute('stroke-dashoffset', (1 - clamp(p)).toFixed(4));
  g.line.set(1);
  g.ice = G(g); tr(g.ice, g.px(15), g.py(1 + 8.4 * 7 / 12) - 8);
  lgIceCream(g.ice, 0.36);
  T(g.ice, 0, 34, '3pm', { size: 18, weight: 800, anchor: 'middle', fill: '#C62828' });
  g.W = W0; g.H = H0;
  return g;
}

/* ---------- sets ---------- */
function lgFlat(parent) {
  const g = G(parent), back = G(g);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#F6E3C8', '#EBCFA8', true) }, back);
  E('rect', { x: 0, y: 560, width: 1200, height: 190, fill: '#C9A27A' }, back);   // floor
  E('rect', { x: 0, y: 552, width: 1200, height: 14, fill: '#A8825A' }, back);
  // window with HDB blocks
  E('rect', { x: 70, y: 110, width: 380, height: 260, rx: 8, fill: linGrad('#9FD8FF', '#E3F4FF', true), stroke: '#FFFFFF', 'stroke-width': 12 }, back);
  [[96, 190, 110, 180], [222, 160, 120, 210], [356, 200, 84, 170]].forEach(([x, y, w, h]) => {
    E('rect', { x, y, width: w, height: h, fill: '#E9DCC4', stroke: '#9C8A6A', 'stroke-width': 3 }, back);
    let win = ''; for (let r = 0; y + 14 + r * 26 < y + h - 10; r++) for (let k = 0; 10 + k * 26 < w - 10; k++) win += `M${x + 10 + k * 26},${y + 14 + r * 26} h14 v12 h-14 Z `;
    E('path', { d: win, fill: '#9CC2DC' }, back);
  });
  E('path', { d: 'M260,110 L260,370 M70,240 L450,240', stroke: '#FFFFFF', 'stroke-width': 8 }, back);
  E('rect', { x: 50, y: 360, width: 420, height: 18, rx: 4, fill: '#FFFFFF' }, back);
  // wall clock
  const ck = G(back); tr(ck, 600, 150);
  E('circle', { r: 46, fill: '#FFFFFF', stroke: '#5A3A1A', 'stroke-width': 7 }, ck);
  let tk = ''; for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; tk += `M${(Math.sin(a) * 36).toFixed(1)},${(-Math.cos(a) * 36).toFixed(1)} L${(Math.sin(a) * 42).toFixed(1)},${(-Math.cos(a) * 42).toFixed(1)} `; }
  E('path', { d: tk, stroke: SC_INK, 'stroke-width': 3 }, ck);
  const hH = E('line', { x1: 0, y1: 0, x2: 0, y2: -22, stroke: SC_INK, 'stroke-width': 6, 'stroke-linecap': 'round' }, ck);
  const hM = E('line', { x1: 0, y1: 0, x2: 0, y2: -34, stroke: SC_INK, 'stroke-width': 4, 'stroke-linecap': 'round' }, ck);
  g.clock = (h, m) => { hH.setAttribute('transform', `rotate(${((h % 12) + m / 60) * 30})`); hM.setAttribute('transform', `rotate(${m * 6})`); };
  g.clock(8, 0);
  // shelf with a plant and photos
  E('rect', { x: 520, y: 300, width: 200, height: 12, fill: '#9C6B3E' }, back);
  E('rect', { x: 540, y: 250, width: 40, height: 50, fill: '#FFFFFF', stroke: '#5A3A1A', 'stroke-width': 3 }, back);
  E('rect', { x: 600, y: 262, width: 50, height: 38, fill: '#FFFFFF', stroke: '#5A3A1A', 'stroke-width': 3 }, back);
  E('path', { d: 'M690,300 L684,276 L708,276 L702,300 Z', fill: '#C0603A' }, back);
  E('path', { d: 'M696,276 Q680,240 690,226 M696,276 Q710,236 724,240 M696,276 Q696,246 700,232', fill: 'none', stroke: '#3FA463', 'stroke-width': 5 }, back);
  // Dad's flipchart
  g.chart = lgFlipchart(back); tr(g.chart, 860, 150);
  g.mid = G(g);
  // the sofa back, in front of the busts
  const front = G(g);
  E('path', { d: 'M40,640 Q40,600 80,600 L1120,600 Q1160,600 1160,640 L1160,760 L40,760 Z', fill: '#4E7FB8', stroke: '#2E4E78', 'stroke-width': 5 }, front);
  E('path', { d: 'M60,618 L1140,618', stroke: '#6E9CD2', 'stroke-width': 8, 'stroke-linecap': 'round' }, front);
  [400, 800].forEach(x => E('line', { x1: x, y1: 606, x2: x, y2: 750, stroke: '#2E4E78', 'stroke-width': 4 }, front));
  E('rect', { x: 120, y: 584, width: 110, height: 60, rx: 18, fill: '#FFC94A', stroke: '#B57B12', 'stroke-width': 4 }, front);   // cushion
  g.front = front;
  g.top = G(g);
  return g;
}

function lgPark(parent, o) {
  o = o || {};
  const sky = { day: ['#7FD3FF', '#D6F0FF'], noon: ['#5EC4FF', '#CFEFFF'], evening: ['#FF9E6B', '#FFE0B0'] }[o.sky || 'day'];
  const g = G(parent), back = G(g);
  E('rect', { x: 0, y: 0, width: 1200, height: 320, fill: linGrad(sky[0], sky[1], true) }, back);
  E('circle', { cx: 1060, cy: 96, r: 54, fill: glow('#FFF3A0'), opacity: 0.9 }, back);
  [[180, 90, 1], [520, 60, 0.8], [820, 120, 0.9]].forEach(([x, y, s]) => { const cl = G(back); tr(cl, x, y, s); E('path', { d: 'M-60,10 Q-60,-20 -30,-20 Q-20,-44 10,-38 Q36,-50 52,-24 Q76,-20 72,10 Z', fill: '#FFFFFF', opacity: 0.85 }, cl); });
  // the sea, ships at anchor
  E('rect', { x: 0, y: 300, width: 1200, height: 130, fill: linGrad('#3FA9D9', '#2786B8', true) }, back);
  [[150, 296, 1], [700, 292, 0.7], [1000, 298, 0.85]].forEach(([x, y, s]) => { const sh = G(back); tr(sh, x, y, s); E('path', { d: 'M-70,0 L70,0 L56,16 L-60,16 Z', fill: '#5A6670' }, sh); E('rect', { x: -40, y: -18, width: 50, height: 18, fill: '#C9D3DC' }, sh); E('rect', { x: 20, y: -30, width: 10, height: 30, fill: '#E8424F' }, sh); });
  const waves = [0, 1, 2].map(i => E('path', { d: '', fill: 'none', stroke: '#BFEAFF', 'stroke-width': 3, opacity: 0.7 }, back));
  g.horizon = 300;
  // sand, grass, the cycle path
  E('path', { d: 'M0,420 Q300,404 600,420 T1200,416 L1200,500 L0,500 Z', fill: LG.sand }, back);
  E('rect', { x: 0, y: 490, width: 1200, height: 260, fill: linGrad('#8BD06A', '#5FA544', true) }, back);
  E('path', { d: 'M0,560 Q600,530 1200,566 L1200,620 Q600,584 0,614 Z', fill: '#B9A58A' }, back);
  E('path', { d: 'M0,587 Q600,557 1200,593', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 4, 'stroke-dasharray': '30 22' }, back);
  const trees = [[120, 520, 0.9], [1090, 512, 0.95]].map(([x, y, s]) => { const t = lgTree(back, s); tr(t, x, y); return t; });
  g.trees = [[120 + 26 * 0.9, 520 - 298 * 0.9], [1090 + 26 * 0.95, 512 - 298 * 0.95]];
  g.mid = G(g);
  const front = G(g);
  E('path', { d: 'M0,660 Q60,640 120,660 Q180,636 240,660 Q300,640 360,660 Q420,636 480,660 Q540,640 600,660 Q660,636 720,660 Q780,640 840,660 Q900,636 960,660 Q1020,640 1080,660 Q1140,636 1200,660 L1200,750 L0,750 Z', fill: '#3F8A3A', stroke: '#2C6A2A', 'stroke-width': 4 }, front);
  g.front = front;
  g.top = G(g);
  g.upd = t => {
    waves.forEach((w, i) => { const y = 330 + i * 30, ph = (t * 40 + i * 50) % 80; attr(w, 'd', `M${(-80 + ph).toFixed(1)},${y} ` + 'q20,-6 40,0 q20,6 40,0 '.repeat(17)); });
    trees.forEach(tr0 => tr0.upd(t));
  };
  g.upd(0);
  return g;
}

function lgMapBoard(parent, o) {
  o = o || {};
  const u = o.unit || 36, g = G(parent);
  const pad = 30, head = 64;
  const W0 = 12 * u + pad * 2 + 30, H0 = 13 * u + pad * 2 + head + 20;
  E('rect', { x: 8, y: 10, width: W0, height: H0, rx: 16, fill: 'rgba(0,0,0,0.25)' }, g);
  E('rect', { x: 0, y: 0, width: W0, height: H0, rx: 16, fill: '#8B5A2B', stroke: '#5A3A1A', 'stroke-width': 5 }, g);
  E('rect', { x: 14, y: 14, width: W0 - 28, height: H0 - 28, rx: 10, fill: '#F7F1DC' }, g);
  E('rect', { x: 14, y: 14, width: W0 - 28, height: head - 6, rx: 10, fill: '#2F7A4A' }, g);
  T(g, W0 / 2, 56, 'EAST COAST PARK', { size: 32, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 2 });
  const axL = G(g); tr(axL, pad + 30, head + pad + 10);
  const ax = mkAxes(axL, { xmin: -4, xmax: 8, ymin: -7, ymax: 6, unit: u, ink: MK.ink, size: 20, labelStep: 2, halo: '#F7F1DC' });
  g.ax = ax;
  g.at = (x, y) => [pad + 30 + ax.px(x), head + pad + 10 + ax.py(y)];
  g.W = W0; g.H = H0;
  const iconL = G(g);
  g.icon = (kind, x, y, io) => {
    io = io || {};
    const ic = G(iconL), [px, py] = g.at(x, y); tr(ic, px, py);
    const inner = G(ic);
    const disc = (col) => E('circle', { r: 17, fill: col, stroke: SC_INK, 'stroke-width': 3 }, inner);
    if (kind === 'kiosk') { disc('#1FA38A'); const b = lgBike(inner, 0.17); tr(b, 0, 9, 0.17); }
    else if (kind === 'picnic') { disc('#FFE45C'); E('path', { d: 'M-10,-6 L10,-6 L12,8 L-12,8 Z', fill: '#E8424F', stroke: SC_INK, 'stroke-width': 2 }, inner); E('path', { d: 'M-4,-6 L-4,8 M4,-6 L4,8 M-11,1 L11,1', stroke: '#FFFFFF', 'stroke-width': 2 }, inner); }
    else if (kind === 'toilet') { disc('#2E7DD8'); T(inner, 0, 7, 'WC', { size: 16, weight: 800, anchor: 'middle', fill: '#FFFFFF' }); }
    else if (kind === 'beach') { disc('#F2DFAE'); E('path', { d: 'M-12,0 Q0,-16 12,0 Z', fill: '#E8424F', stroke: SC_INK, 'stroke-width': 2 }, inner); E('line', { x1: 0, y1: -2, x2: 0, y2: 12, stroke: SC_INK, 'stroke-width': 2.5 }, inner); }
    else if (kind === 'jetty') { disc('#3FA9D9'); E('path', { d: 'M-12,2 L12,2 M-8,2 L-8,10 M0,2 L0,10 M8,2 L8,10 M-6,-8 L6,-8 L4,-2 L-4,-2 Z', stroke: '#5A3A1A', 'stroke-width': 3, fill: '#9C6B3E' }, inner); }
    else if (kind === 'cart') { disc('#FFC2D6'); tr(lgIceCream(inner, 0.17), 0, 12, 0.17); }
    else if (kind === 'dad') { disc('#3D8B6E'); T(inner, 0, 7, 'D', { size: 20, weight: 800, anchor: 'middle', fill: '#FFFFFF' }); }
    else if (kind === 'mum') { disc('#B8336A'); T(inner, 0, 7, 'M', { size: 20, weight: 800, anchor: 'middle', fill: '#FFFFFF' }); }
    else if (kind === 'drone') { tr(lgDrone(inner, { s: 0.24 }), 0, 0); }
    else { E('path', { d: 'M0,0 C-16,-18 -14,-34 0,-34 C14,-34 16,-18 0,0 Z', fill: io.col || LG.red, stroke: SC_INK, 'stroke-width': 3 }, inner); E('circle', { cx: 0, cy: -22, r: 5, fill: '#FFFFFF' }, inner); }
    if (io.label) mkText(ic, 22, -14, io.label, { size: io.size || 24, fill: io.labelCol || MK.ink, halo: '#F7F1DC' });
    ic.set = p => mkPopIn(ic, p);
    ic.set(0);
    return ic;
  };
  return g;
}

function lgPicnic(parent) {
  const g = G(parent), back = G(g);
  E('rect', { x: 0, y: 0, width: 1200, height: 260, fill: linGrad('#7FD3FF', '#D6F0FF', true) }, back);
  E('rect', { x: 0, y: 240, width: 1200, height: 90, fill: linGrad('#3FA9D9', '#2786B8', true) }, back);
  const waves = [0, 1].map(() => E('path', { d: '', fill: 'none', stroke: '#BFEAFF', 'stroke-width': 3, opacity: 0.7 }, back));
  E('path', { d: 'M0,320 Q600,300 1200,322 L1200,360 L0,360 Z', fill: LG.sand }, back);
  E('rect', { x: 0, y: 350, width: 1200, height: 400, fill: linGrad('#8BD06A', '#5FA544', true) }, back);
  const t1 = lgTree(back, 0.8); tr(t1, 1110, 380);
  // the mat in perspective: red and white stripes
  const mat = G(back);
  E('path', { d: 'M260,470 L940,470 L1060,660 L140,660 Z', fill: '#FFFFFF', stroke: '#B0123E', 'stroke-width': 5, 'stroke-linejoin': 'round' }, mat);
  let st = '';
  for (let i = 1; i < 8; i += 2) { const a = 260 + i * 85, b = 260 + (i + 1) * 85, c2 = 140 + (i + 1) * 115, d2 = 140 + i * 115; st += `M${a},470 L${b},470 L${c2},660 L${d2},660 Z `; }
  E('path', { d: st, fill: '#E8424F', opacity: 0.85 }, mat);
  g.cooler = lgCooler(back, 0.8); tr(g.cooler, 600, 560, 0.8);
  // basket
  const bk = G(back); tr(bk, 820, 600);
  E('path', { d: 'M-60,-50 L60,-50 L50,0 L-50,0 Z', fill: '#C9935A', stroke: SC_INK, 'stroke-width': 4 }, bk);
  E('path', { d: 'M-46,-50 Q0,-100 46,-50', fill: 'none', stroke: '#8B5A2B', 'stroke-width': 7 }, bk);
  g.mid = G(g);
  const front = G(g);
  E('path', { d: 'M0,690 Q120,670 240,690 Q360,668 480,690 Q600,670 720,690 Q840,668 960,690 Q1080,670 1200,690 L1200,750 L0,750 Z', fill: '#3F8A3A' }, front);
  g.front = front;
  g.top = G(g);
  g.upd = t => { waves.forEach((w, i) => { const y = 270 + i * 26, ph = (t * 30 + i * 40) % 80; attr(w, 'd', `M${(-80 + ph).toFixed(1)},${y} ` + Array.from({ length: 17 }, () => 'q20,-5 40,0 q20,5 40,0').join(' ')); }); t1.upd(t); };
  g.upd(0);
  return g;
}

function lgSkate(parent) {
  const g = G(parent), back = G(g);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#7FD3FF', '#E3F4FF', true) }, back);
  // graffiti wall
  E('rect', { x: 0, y: 150, width: 1200, height: 280, fill: '#B9C4CE' }, back);
  let br = ''; for (let y = 150; y < 430; y += 40) br += `M0,${y} L1200,${y} `;
  E('path', { d: br, stroke: '#9AA6B2', 'stroke-width': 2 }, back);
  [['#FF6B8A', 120, 260, 'RAD'], ['#7EE08A', 760, 240, 'SKATE'], ['#B48CFF', 1040, 300, '★']].forEach(([col, x, y, txt]) => {
    const tt = T(back, x, y, txt, { size: 70, weight: 800, fill: col, anchor: 'middle' }); tt.setAttribute('transform', `rotate(-8 ${x} ${y})`); tt.setAttribute('opacity', 0.75);
  });
  E('rect', { x: 0, y: 430, width: 1200, height: 320, fill: linGrad('#D3D8DD', '#AEB6BE', true) }, back);
  // ramps to scale: 1 m = 60 px
  const U = 60, base = 610;
  const R = [['A', 2, 4, 90], ['B', 3, 5, 450], ['C', 1, 2, 880]];
  g.ramps = R.map(([lab, rise, run, x0]) => {
    const rg = G(back), x1 = x0 + run * U, y1 = base - rise * U;
    E('path', { d: `M${x0},${base} L${x1},${y1} L${x1},${base} Z`, fill: linGrad('#E9C48A', '#C9935A', true), stroke: SC_INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, rg);
    E('path', { d: `M${x0 + 8},${base - 4} L${x1 - 4},${y1 + 6}`, stroke: '#FFE7BF', 'stroke-width': 5, 'stroke-linecap': 'round' }, rg);
    E('rect', { x: x1 - 4, y: y1 - 6, width: 14, height: base - y1 + 6, fill: '#8F9CAB', stroke: SC_INK, 'stroke-width': 3 }, rg);
    const sg = G(rg); tr(sg, x1 + 50, y1 - 30);
    E('line', { x1: 0, y1: 0, x2: 0, y2: base - y1 + 30, stroke: '#5A6670', 'stroke-width': 6 }, sg);
    E('circle', { r: 30, fill: '#FFE45C', stroke: SC_INK, 'stroke-width': 4 }, sg);
    T(sg, 0, 12, lab, { size: 36, weight: 800, anchor: 'middle', fill: SC_INK });
    return { g: rg, x0, y0: base, run, rise, lab };
  });
  g.tri = i => {
    const r = g.ramps[i], x1 = r.x0 + r.run * U, y1 = r.y0 - r.rise * U, tg = G(back);
    E('path', { d: `M${r.x0},${r.y0 + 26} L${x1},${r.y0 + 26}`, stroke: LG.blue, 'stroke-width': 6, 'stroke-linecap': 'round' }, tg);
    E('path', { d: `M${x1 + 14},${r.y0} L${x1 + 14},${y1}`, stroke: LG.red, 'stroke-width': 6, 'stroke-linecap': 'round' }, tg);
    mkText(tg, (r.x0 + x1) / 2, r.y0 + 62, `run **${r.run} m**`, { size: 28, anchor: 'middle', fill: '#1E4E8C', halo: '#D3D8DD' });
    mkText(tg, x1 + 26, (r.y0 + y1) / 2 + 10, `rise **${r.rise} m**`, { size: 28, anchor: 'start', fill: '#B0123E', halo: '#D3D8DD' });
    tg.set = p => op(tg, p);
    tg.set(0);
    return tg;
  };
  g.mid = G(g);
  const front = G(g);
  E('rect', { x: 0, y: 680, width: 1200, height: 70, fill: '#8F9CAB', stroke: '#5A6670', 'stroke-width': 4 }, front);
  E('path', { d: 'M0,690 L1200,690', stroke: '#C9D3DC', 'stroke-width': 6 }, front);
  g.front = front;
  g.top = G(g);
  return g;
}

function lgShops(parent) {
  const g = G(parent), back = G(g);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#7FD3FF', '#E3F4FF', true) }, back);
  E('rect', { x: 0, y: 520, width: 1200, height: 230, fill: '#B9A58A' }, back);
  g.signs = [['SHOP X', '$8 + $3 an hour', '#2E7DD8', 40], ['SHOP Y', '$5 an hour', '#E8751A', 620]].map(([name, price, col, x]) => {
    const w = 540;
    E('rect', { x, y: 160, width: w, height: 370, fill: '#FFFDF6', stroke: '#9C8A6A', 'stroke-width': 4 }, back);
    E('path', { d: `M${x - 10},160 L${x + w + 10},160 L${x + w - 10},210 L${x + 10},210 Z`, fill: col, stroke: SC_INK, 'stroke-width': 3 }, back);
    let stripe = ''; for (let k = 0; k < 9; k++) stripe += `M${x + 10 + k * 60},210 l30,0 l-6,22 l-24,0 Z `;
    E('path', { d: stripe, fill: '#FFFFFF', opacity: 0.8 }, back);
    const sg = G(back);
    E('rect', { x: x + 60, y: 70, width: w - 120, height: 84, rx: 12, fill: col, stroke: SC_INK, 'stroke-width': 4 }, sg);
    T(sg, x + w / 2, 108, name, { size: 34, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
    T(sg, x + w / 2, 142, price, { size: 28, weight: 800, anchor: 'middle', fill: '#FFE45C' });
    [x + 120, x + 300].forEach(bx => tr(lgBike(back, 0.9), bx, 520, 0.9));
    E('rect', { x: x + 20, y: 470, width: w - 40, height: 12, fill: '#8F9CAB' }, back);
    return sg;
  });
  g.mid = G(g);
  const front = G(g);
  E('rect', { x: 0, y: 660, width: 1200, height: 90, fill: '#9C8A6A' }, front);
  E('path', { d: 'M0,664 L1200,664', stroke: '#C9B48A', 'stroke-width': 6 }, front);
  g.front = front;
  g.top = G(g);
  return g;
}

function lgClub(parent) {
  const g = G(parent), back = G(g);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#120A20', '#2A1640', true) }, back);
  let br = ''; for (let y = 40; y < 560; y += 36) for (let x = (y / 36) % 2 ? 0 : 40; x < 1200; x += 80) br += `M${x},${y} h76 v32 h-76 Z `;
  E('path', { d: br, fill: 'none', stroke: '#3A2456', 'stroke-width': 2 }, back);
  // neon sign
  const neon = G(back);
  E('rect', { x: 330, y: 50, width: 540, height: 116, rx: 20, fill: '#1A0E2C', stroke: '#FF5FD2', 'stroke-width': 6 }, neon);
  const n1 = T(neon, 600, 100, 'DIRECT PROPORTION', { size: 40, weight: 800, anchor: 'middle', fill: '#FF9BE6', ls: 3 });
  const n2 = T(neon, 600, 146, 'CLUB', { size: 38, weight: 800, anchor: 'middle', fill: '#7FF0FF', ls: 10 });
  [n1, n2].forEach(n => { n.setAttribute('stroke', '#FFFFFF'); n.setAttribute('stroke-width', 1.5); });
  // doorway
  E('rect', { x: 470, y: 210, width: 260, height: 350, rx: 10, fill: '#0A0612', stroke: '#E2B33C', 'stroke-width': 6 }, back);
  E('path', { d: 'M500,240 L700,240 L700,560 L500,560 Z', fill: linGrad('#5A2A8C', '#120A20', true), opacity: 0.6 }, back);
  // red carpet and floor
  E('rect', { x: 0, y: 560, width: 1200, height: 190, fill: '#2A2230' }, back);
  E('path', { d: 'M500,560 L700,560 L800,750 L400,750 Z', fill: '#B0123E' }, back);
  // guest list board
  const gl = G(back); tr(gl, 1010, 300);
  E('rect', { x: -110, y: -90, width: 220, height: 200, rx: 10, fill: '#1A0E2C', stroke: '#E2B33C', 'stroke-width': 4 }, gl);
  T(gl, 0, -52, 'ON THE LIST', { size: 26, weight: 800, anchor: 'middle', fill: '#FFE45C' });
  g.list = gl;
  g.mid = G(g);
  g.rope = lgVelvetRope(g.mid, { w: 220 }); tr(g.rope, 490, 610);
  const front = G(g);
  E('rect', { x: 0, y: 690, width: 1200, height: 60, fill: '#1A1420' }, front);
  g.front = front;
  g.top = G(g);
  g.upd = t => { const f = Math.sin(t * 7) > 0.92 ? 0.55 : 1; op(n1, f); op(n2, Math.sin(t * 5 + 1) > 0.95 ? 0.6 : 1); };
  return g;
}
