/* PRIME TIME (Claude Sitcom Ep 2, Factors, Multiples & Primes): the cast, sets and props of this episode.
   Bundled after engine lib.js, kit.js, mathkit.js and sitcom.js (scMake, scTalk, scKavya, scHuman, scCastHuman,
   scConfessional, scLowerThird, scVideoCall, mk* maths kit). Every top-level name starts with `fm`, except `cast`.

   Characters: cast(parent, kind, o) -> g, origin at the character's centre
     o: { s (scale), mood (default mood), ... }   (humans: any scHuman option overrides, e.g. prop, lift)
     g.set({ t, talk, mood, look, sweat, still, ... })   call every frame
       talk 0..1 (use scTalk(S, t, who)); mood: neutral | happy | smug | annoyed | sad | shock | deadpan
       look -1..1 pupils left/right; still: true stops the idle bob
     HUMANS (busts, bottom of the shirt at y = 140, so put them behind the party table or the frame edge):
       'kavya'  (kavya)  Kavya, 12 (scKavya, PE shirt "8")
       'mum'    (mum)    Mum: magenta kurta, bun, bindi. Default prop: her party plan (a sheet of paper)
       'dad'    (dad)    Dad: glasses, moustache, green polo. Default prop: a calculator (he only ever multiplies)
       'boy'    (boy)    Ah Boy, 8: orange star tee. Default: an empty hand (lift: 1 raises it)
       'priya'  (priya)  Priya, 12: school uniform, bob, yellow clip. Default prop: a pencil
       'tan'    (tan)    Mr Tan, maths teacher (7th floor): shirt and tie, glasses. Default prop: a book (his quiz)
       'paati'  (paati)  PAATI, Kavya's grandmother, 64 today: silver bun, round gold glasses, green sari blouse
                         with gold trim, bindi, gold earrings, a gold "64" birthday rosette. No prop.
       Pass { prop: null } for no prop; { body: true } for a full body (scHumanBody, feet at 0,0; pose API).
     CARTOONS (scMake):
       'two'    (two)    BIG TWO, the bouncer of the Prime Club and the only even prime: a huge purple numeral 2
                         (his face is in the top curve), sunglasses pushed up on his head, a coiled earpiece, a black
                         bow tie, SECURITY on his base, little legs. About 300 px tall at s = 1 (use s ~ 0.75).
                         Extra: { stamp: 0..1 } raises his right arm with a rubber stamp; { list: 0..1 } brings
                         up THE LIST (a clipboard) in his left hand. Arms are folded when both are 0.
       'one'    (one)    ONE, small and keen: a cream numeral 1 with a striped party hat, stick arms and legs.
                         About 250 px tall at s = 1. Default happy. Extra: { wave: 0..1 } waves his right arm.
       'banyan' (banyan) BANYAN, the old tree at the void deck: a wide brown trunk with the face, a green canopy,
                         hanging aerial roots (a beard), a string of fairy lights in the canopy. About 460 wide and
                         420 tall at s = 1 (canopy top at y -250, roots end at y 170). Slow, wise.
                         Extra: { lights: 0..1 } switches the fairy lights on (twinkling).
       'venn'   (hattie + lottie)  THE VENN TWINS: two overlapping circles, Hattie (left, blue, a red bow) and Lottie
                         (right, yellow, cat-eye glasses). Hattie's face is the main face, Lottie's is faceB:
                         g.set({ talk: scTalk(S,t,'hattie'), mood, look, talkB: scTalk(S,t,'lottie'), moodB, lookB }).
                         Circles r 150 centred on (-90, 0) and (90, 0); faces at the top of each circle.
                         g.slot = { left: [x, y], mid: [x, y], right: [x, y] } centres of the three regions (put prime
                         chips there); g.hl(region, p) tints 'mid' (the heart) or 'all' (the lot).
       'cubert' (cubert) CUBERT, a cube: an orange box drawn in 3-D (front, top, side), face on the front, a "³"
                         sticker, little arms and legs. About 230 px tall at s = 1. Jolly. Extra: { arms: 0..1 }.

   Shots
     fmConf(parent, who)             confessional background tinted for that character (scConfessional); g.set(p, t)
     fmLowerThird(parent, who)       scLowerThird with this episode's name and role for `who` (FM_LT); g.set(p)

   Sets (full stage 1200 x 750; each returns g)
     fmVoid(parent)       the void deck of Block 208 at the party: ceiling slab, three square pillars (the third,
                          at x 1010, has the Prime Club's tiny door and neon at its foot: g.club = [x, y]), letterboxes
                          and the lift on the back wall, bunting, a HAPPY 64th BIRTHDAY, PAATI! banner, "6" and "4"
                          balloons, fairy lights along the ceiling, and the long party table across the front.
                          LAYERS like a counter: characters in g.mid (a bust at y about 440 hides its shirt hem),
                          the table is g.front (top edge g.tableY = 530), props on the table go in g.top.
                          g.upd(t) twinkles the fairy lights and bobs the balloons. g.banner (the banner group).
     fmClub(parent)       close-up of the PRIME CLUB door at the foot of the pillar: tiled pillar face, purple door
                          with a brass handle and a door plate "2 3 5 7 11 13 ...", neon sign THE PRIME CLUB /
                          est. 300 BC, red carpet, velvet rope on two brass posts, a spotlight. Big Two stands at
                          about (330, 470); queueing numbers stand on the carpet (feet at g.floorY = 640).
                          g.upd(t) flickers the neon. g.rope (op() it to unhook the rope).

   Props (around their own origin)
     fmStamp(parent, kind)           mkStamp: 'prime' PRIME (green), 'not' NOT ON THE LIST (red), 'plus' PLUS ONE
                                     (purple), 'comp' COMPOSITE (red). g.set(p). About 500-800 px wide at scale 1:
                                     scale it (tr(g, x, y, 0.5)).
     fmNum(parent, text, o)          a number guest: a round body with `text` written big on the belly, eyes above,
                                     little legs; feet at (0, 0), about 150 tall. o: { col, s }. g.set({ t, mood, look,
                                     talk }) like a character (scMake).
     fmChair(parent, col)            a plastic party chair seen from the front, centred, about 44 x 50 (3 elements)
     fmCupcake(parent)               a cupcake, centred on its wrapper, about 40 x 44 (3 elements)
     fmLaddoo(parent, r)             a laddoo (orange sweet ball), centred, radius r (default 14) (1 element)
     fmLights(parent, pts, o)        a string of fairy lights along the polyline pts [[x, y], ...]. o: { n (bulbs),
                                     sag (px), cols }. g.set(t, mode): mode 'twinkle' (default), 'off', or a colour
                                     string to light every bulb in that colour. g.bulbs (the circles)
     fmBalloon(parent, text, col)    a number balloon (string down to (0, 0)), about 150 tall
     FM_COL                          colours: purple (Big Two), cream (One), leaf, trunk, venn L / R / mid, cube, gold
*/

/* ---------- colours, confessional tints, lower thirds ---------- */
const FM_COL = {
  purple: '#6A3FD0', purpleDk: '#3E1F8A', cream: '#FFE9A8', creamDk: '#D9B54A', leaf: '#3FA463', leafDk: '#22703F',
  trunk: '#8B5A34', trunkDk: '#5E3A1E', vennL: '#4CC9F0', vennR: '#FFC247', vennMid: '#7EE08A', cube: '#FF8A3D',
  cubeTop: '#FFB27A', cubeSide: '#D9621E', gold: '#FFD34D', neon: '#FF5FD2', carpet: '#C62844',
};
const FM_TINT = {
  two: ['#1E1240', '#3E2A7A'], one: ['#3A3010', '#6B5A20'], banyan: ['#10281A', '#24503A'], hattie: ['#10283A', '#1E4E6E'],
  lottie: ['#3A2C10', '#6B5420'], venn: ['#122A30', '#2A5058'], cubert: ['#3A1E10', '#6B3A1E'], kavya: ['#14243A', '#25446B'],
  dad: ['#123026', '#245A48'], mum: ['#3A1030', '#6B1E58'], boy: ['#3A2410', '#6B4414'], priya: ['#1A2240', '#33407A'],
  tan: ['#1A2A3A', '#33506E'], paati: ['#14301E', '#2E5A3A'],
};
function fmConf(parent, who) { const c = FM_TINT[who] || FM_TINT.two; return scConfessional(parent, c[0], c[1]); }
const FM_LT = {
  two: ['BIG TWO', 'Security, the Prime Club. The only even prime.'],
  one: ['ONE', 'Not prime. Not composite. Very keen.'],
  banyan: ['BANYAN', 'Factor tree. Here since 1975.'],
  hattie: ['HATTIE', 'Left half of a Venn diagram.'],
  lottie: ['LOTTIE', 'Right half of a Venn diagram.'],
  venn: ['HATTIE & LOTTIE', 'A Venn diagram. They share a middle.'],
  cubert: ['CUBERT', 'A cube. 4 × 4 × 4 of fun.'],
  kavya: ['KAVYA, 12', 'Party planner (unpaid).'],
  mum: ['MUM', 'Has a plan. Shares equally.'],
  dad: ['DAD', '"Just multiply them."'],
  boy: ['AH BOY, 8', "Kavya's brother. A cube (2³)."],
  priya: ['PRIYA', 'Best friend. Fast. Not always right.'],
  tan: ['MR TAN', 'Maths teacher. Lives on floor 7. Prime.'],
  paati: ['PAATI', "Kavya's grandmother. 64 today."],
};
function fmLowerThird(parent, who) { const l = FM_LT[who] || [String(who).toUpperCase(), '']; return scLowerThird(parent, l[0], l[1]); }

/* ---------- the cast ---------- */
const FM_PROP = { mum: 'paper', dad: 'calculator', boy: null, priya: 'pencil', tan: 'book' };
const FM_PAATI = { name: 'PAATI', role: "Kavya's grandmother", age: 'senior', skin: SC_SKIN.brown, hair: 'bun', hairCol: SC_HAIR.silver,
  glasses: '#C9A227', frames: 'round', style: 'kurta', shirt: '#2E8B57', trim: '#F2C744', earrings: '#E2B33C', bindi: true, seed: 31 };

function fmPaati(parent, o) {
  const c = scHuman(parent, Object.assign({}, FM_PAATI, o || {}));
  const ros = G(c.firstChild); tr(ros, -54, 98);   // the birthday rosette, on her right shoulder (viewer's left)
  for (let k = 0; k < 10; k++) { const a = k * TAU / 10; E('circle', { cx: Math.cos(a) * 18, cy: Math.sin(a) * 18, r: 9, fill: k % 2 ? '#E8424F' : FM_COL.gold, stroke: SC_INK, 'stroke-width': 1.5 }, ros); }
  E('circle', { r: 17, fill: '#FFFDF6', stroke: SC_INK, 'stroke-width': 2.5 }, ros);
  T(ros, 0, 8, '64', { size: 22, weight: 800, anchor: 'middle', fill: '#B8336A' });
  c.who = 'paati'; c.name = 'PAATI';
  return c;
}

function cast(parent, kind, o) {
  o = o || {};
  if (kind === 'kavya') return scKavya(parent, o);
  if (kind === 'paati') return fmPaati(parent, o);
  if (SC_HUMANS[kind]) {
    const p = Object.assign({}, kind === 'boy' ? { hand: true } : { prop: FM_PROP[kind] }, o);
    return scCastHuman(parent, kind, p);
  }
  const S = { s: o.s, mood: o.mood };
  let c;
  if (kind === 'two') {
    let armL = null, armR = null, list = null, stamp = null, hL = null, hR = null;
    const D2 = 'M-66,-88 C-66,-150 66,-150 66,-88 C66,-40 30,-10 -74,104 L80,104';
    c = scMake(parent, Object.assign(S, { seed: 4, bob: 2, mood: o.mood || 'deadpan',
      draw: g => {
        // little legs and black shoes under the base
        [-40, 40].forEach(x => {
          E('path', { d: `M${x},128 L${x},150`, stroke: SC_INK, 'stroke-width': 12, 'stroke-linecap': 'round' }, g);
          E('path', { d: `M${x - 18},162 Q${x - 18},146 ${x},146 L${x + 18},148 Q${x + 26},162 ${x + 16},164 Z`, fill: '#1A1A22', stroke: SC_INK, 'stroke-width': 3 }, g);
        });
        // the numeral 2 itself: an ink outline, then the purple body
        E('path', { d: D2, fill: 'none', stroke: SC_INK, 'stroke-width': 76, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
        E('path', { d: D2, fill: 'none', stroke: FM_COL.purple, 'stroke-width': 64, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
        E('path', { d: 'M-50,-110 C-40,-140 20,-150 46,-126', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 8, opacity: 0.22, 'stroke-linecap': 'round' }, g);
        T(g, 6, 114, 'SECURITY', { size: 24, weight: 800, anchor: 'middle', fill: FM_COL.gold, ls: 2 });
        // bow tie where the curve turns into the diagonal
        const bt = G(g); tr(bt, 40, -40, 1, -30);
        E('path', { d: 'M0,0 L-24,-13 L-24,13 Z M0,0 L24,-13 L24,13 Z', fill: '#16161E', stroke: '#FFFFFF', 'stroke-width': 2 }, bt);
        E('circle', { r: 6, fill: '#16161E', stroke: '#FFFFFF', 'stroke-width': 2 }, bt);
        // sunglasses pushed up on his head
        const sg = G(g); tr(sg, 0, -158);
        E('path', { d: 'M-46,-8 L-6,-8 Q-6,14 -26,14 Q-46,14 -46,-8 Z M6,-8 L46,-8 Q46,14 26,14 Q6,14 6,-8 Z', fill: '#16161E', stroke: '#9AA6B2', 'stroke-width': 2.5 }, sg);
        E('path', { d: 'M-6,-4 L6,-4', stroke: '#9AA6B2', 'stroke-width': 3 }, sg);
        // coiled earpiece
        E('path', { d: 'M84,-104 q10,6 0,12 q-10,6 0,12 q10,6 0,12 q-10,6 0,12 q10,6 2,14', fill: 'none', stroke: '#C9D3DC', 'stroke-width': 3 }, g);
        E('circle', { cx: 88, cy: -108, r: 7, fill: '#C9D3DC', stroke: SC_INK, 'stroke-width': 2 }, g);
        // arms (paths, animated) and their props
        armL = E('path', { d: '', fill: 'none', stroke: SC_INK, 'stroke-width': 13, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
        armR = E('path', { d: '', fill: 'none', stroke: SC_INK, 'stroke-width': 13, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
        list = G(g);
        E('rect', { x: -44, y: -56, width: 88, height: 112, rx: 8, fill: '#B07A45', stroke: SC_INK, 'stroke-width': 3 }, list);
        E('rect', { x: -36, y: -44, width: 72, height: 92, fill: '#FFFDF6' }, list);
        T(list, 0, -22, 'THE LIST', { size: 15, weight: 800, anchor: 'middle', fill: SC_INK });
        T(list, 0, 2, '2 3 5 7', { size: 16, weight: 700, anchor: 'middle', fill: '#5A6670' });
        T(list, 0, 24, '11 13 ...', { size: 16, weight: 700, anchor: 'middle', fill: '#5A6670' });
        E('rect', { x: -14, y: -62, width: 28, height: 12, rx: 3, fill: '#9AA6B2', stroke: SC_INK, 'stroke-width': 2 }, list);
        stamp = G(g);
        E('rect', { x: -9, y: -54, width: 18, height: 36, rx: 6, fill: '#8B5A34', stroke: SC_INK, 'stroke-width': 3 }, stamp);
        E('rect', { x: -22, y: -20, width: 44, height: 18, rx: 4, fill: '#C62828', stroke: SC_INK, 'stroke-width': 3 }, stamp);
        hL = E('circle', { r: 13, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);   // white gloves at the arm tips
        hR = E('circle', { r: 13, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
      },
      face: { x: 0, y: -118, eye: 13, gap: 44, mouthW: 30, mouthY: 28, lidCol: '#8A6AE0' },
      upd: (t, g, st) => {
        const s = clamp(st.stamp || 0), l = clamp(st.list || 0);
        // left arm (viewer's left): folded across the body, or holding the list out
        const lx = lerp(30, -120, l), ly = lerp(10, -30, l);
        armL.setAttribute('d', `M-74,-10 Q${lerp(-60, -110, l).toFixed(1)},${lerp(30, 10, l).toFixed(1)} ${lx.toFixed(1)},${ly.toFixed(1)}`);
        tr(list, lx - 10, ly - 20, 0.9, lerp(0, -10, l)); op(list, l > 0.05 ? 1 : 0);
        // right arm: folded, or raised with the stamp
        const rx = lerp(-30, 126, s), ry = lerp(24, -150, s);
        armR.setAttribute('d', `M74,-6 Q${lerp(70, 128, s).toFixed(1)},${lerp(40, -40, s).toFixed(1)} ${rx.toFixed(1)},${ry.toFixed(1)}`);
        tr(stamp, rx, ry + 4, 1, lerp(0, 20, s)); op(stamp, s > 0.05 ? 1 : 0);
        attr(hL, 'cx', lx); attr(hL, 'cy', ly); attr(hR, 'cx', rx); attr(hR, 'cy', ry);
      } }));
  } else if (kind === 'one') {
    let arm = null;
    const D1 = 'M-34,-64 L8,-96 L8,96 M-34,96 L50,96';
    c = scMake(parent, Object.assign(S, { seed: 6, bob: 6, mood: o.mood || 'happy',
      draw: g => {
        [-14, 30].forEach(x => {
          E('path', { d: `M${x},116 L${x},140`, stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
          E('ellipse', { cx: x + 6, cy: 144, rx: 16, ry: 8, fill: '#FF6B8A', stroke: SC_INK, 'stroke-width': 3 }, g);
        });
        E('path', { d: 'M-12,10 Q-48,20 -54,48', fill: 'none', stroke: SC_INK, 'stroke-width': 6, 'stroke-linecap': 'round' }, g);   // left arm
        E('path', { d: D1, fill: 'none', stroke: SC_INK, 'stroke-width': 62, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
        E('path', { d: D1, fill: 'none', stroke: FM_COL.cream, 'stroke-width': 50, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
        E('path', { d: 'M-4,-70 L-4,70', stroke: '#FFFFFF', 'stroke-width': 7, opacity: 0.5, 'stroke-linecap': 'round' }, g);
        arm = E('path', { d: '', fill: 'none', stroke: SC_INK, 'stroke-width': 6, 'stroke-linecap': 'round' }, g);
        // striped party hat
        const hat = G(g); tr(hat, 10, -124, 1, 12);
        E('path', { d: 'M-24,8 L0,-56 L24,8 Z', fill: '#4CC9F0', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, hat);
        E('path', { d: 'M-15,-16 L15,-16 M-9,-34 L9,-34', stroke: '#FF5FA2', 'stroke-width': 6 }, hat);
        E('circle', { cx: 0, cy: -58, r: 7, fill: FM_COL.gold, stroke: SC_INK, 'stroke-width': 2 }, hat);
        E('ellipse', { cx: -12, cy: -34, rx: 8, ry: 5, fill: '#FF8FB0', opacity: 0.55 }, g);
        E('ellipse', { cx: 28, cy: -34, rx: 8, ry: 5, fill: '#FF8FB0', opacity: 0.55 }, g);
      },
      face: { x: 8, y: -56, eye: 11, gap: 28, mouthW: 22, mouthY: 24, lidCol: FM_COL.creamDk },
      upd: (t, g, st) => {
        const w = clamp(st.wave || 0), sw = Math.sin(t * TAU * 2.2) * 18 * w;
        arm.setAttribute('d', `M28,10 Q${lerp(62, 70, w)},${lerp(24, -10, w)} ${(lerp(66, 82, w) + sw).toFixed(1)},${lerp(48, -50, w).toFixed(1)}`);
      } }));
  } else if (kind === 'banyan') {
    let lights = [];
    c = scMake(parent, Object.assign(S, { seed: 12, bob: 1, mood: o.mood || 'neutral',
      draw: g => {
        // canopy
        [[-150, -150, 120, 80], [0, -190, 150, 90], [150, -150, 120, 80], [-80, -110, 130, 70], [90, -110, 130, 70]].forEach(([x, y, rx, ry], i) =>
          E('ellipse', { cx: x, cy: y, rx, ry, fill: i % 2 ? FM_COL.leafDk : FM_COL.leaf, stroke: SC_INK, 'stroke-width': 4 }, g));
        E('path', { d: 'M-200,-170 q20,-20 40,0 M-60,-230 q20,-20 40,0 M90,-215 q20,-20 40,0 M160,-120 q20,-20 40,0', fill: 'none', stroke: '#7EE08A', 'stroke-width': 5, opacity: 0.7 }, g);
        // fairy lights strung across the canopy
        for (let i = 0; i < 14; i++) {
          const x = -230 + i * 36, y = -120 + Math.sin(i * 0.9) * 18 + (i % 3) * 6;
          lights.push(E('circle', { cx: x, cy: y, r: 8, fill: '#FFF3B0', stroke: SC_INK, 'stroke-width': 1.5 }, g));
        }
        // trunk (the body, with the face)
        E('path', { d: 'M-90,150 Q-70,40 -84,-70 Q0,-96 84,-70 Q70,40 90,150 Z', fill: linGrad(FM_COL.trunk, FM_COL.trunkDk, false), stroke: SC_INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, g);
        E('path', { d: 'M-60,120 Q-50,60 -62,0 M50,130 Q56,70 46,10 M-20,140 Q-14,110 -22,80', fill: 'none', stroke: FM_COL.trunkDk, 'stroke-width': 4, opacity: 0.8 }, g);
        // aerial roots hanging like a beard
        E('path', { d: 'M-120,-90 Q-128,10 -118,120 M-150,-100 Q-160,-20 -152,60 M120,-90 Q128,10 118,120 M150,-100 Q160,-20 152,70 M-40,40 Q-44,90 -36,150 M40,40 Q44,90 36,150 M0,48 Q-4,100 2,160', fill: 'none', stroke: '#6B4423', 'stroke-width': 6, 'stroke-linecap': 'round' }, g);
        // eyebrows of moss
        E('ellipse', { cx: -60, cy: 40, rx: 12, ry: 7, fill: '#FF8FB0', opacity: 0.35 }, g);
      },
      face: { x: 0, y: -14, eye: 16, gap: 58, mouthW: 40, mouthY: 44, lidCol: '#A87448' },
      upd: (t, g, st) => {
        const k = st.lights || 0;
        lights.forEach((b, i) => {
          const on = k > 0 ? clamp(k * (0.55 + 0.45 * Math.sin(t * 3.1 + i * 1.7))) : 0;
          b.setAttribute('fill', on > 0.02 ? ['#FFE45C', '#FF8FC8', '#7EE08A', '#6EC8FF'][i % 4] : '#E8E2C8');
          b.setAttribute('opacity', (0.55 + 0.45 * on).toFixed(2));
        });
      } }));
    const inner = c.firstChild, mo = G(inner); tr(mo, 0, 32);   // a moss moustache
    E('path', { d: 'M0,-6 C-14,-14 -34,-10 -40,2 C-30,-2 -14,2 0,0 C14,2 30,-2 40,2 C34,-10 14,-14 0,-6 Z', fill: '#6FBF5A', stroke: SC_INK, 'stroke-width': 2.5 }, mo);
  } else if (kind === 'venn' || kind === 'hattie' || kind === 'lottie') {
    let midT = null, allT = null;
    c = scMake(parent, Object.assign(S, { seed: 15, bob: 3, mood: o.mood || 'happy',
      draw: g => {
        E('rect', { x: -260, y: -170, width: 520, height: 340, rx: 18, fill: 'rgba(255,255,255,0.10)', stroke: '#CFE7F5', 'stroke-width': 3, opacity: 0.8 }, g);
        allT = E('rect', { x: -260, y: -170, width: 520, height: 340, rx: 18, fill: FM_COL.gold, opacity: 0 }, g);
        E('circle', { cx: -90, cy: 0, r: 150, fill: FM_COL.vennL, opacity: 0.55 }, g);
        E('circle', { cx: 90, cy: 0, r: 150, fill: FM_COL.vennR, opacity: 0.55 }, g);
        midT = E('path', { d: 'M0,-120 A150,150 0 0 1 0,120 A150,150 0 0 1 0,-120 Z', fill: '#FF5FA2', opacity: 0 }, g);
        E('circle', { cx: -90, cy: 0, r: 150, fill: 'none', stroke: SC_INK, 'stroke-width': 5 }, g);
        E('circle', { cx: 90, cy: 0, r: 150, fill: 'none', stroke: SC_INK, 'stroke-width': 5 }, g);
        // a faint heart in the middle (HCF is the Heart)
        E('path', { d: 'M0,-60 C-16,-84 -50,-70 -40,-40 C-34,-22 -10,-6 0,4 C10,-6 34,-22 40,-40 C50,-70 16,-84 0,-60 Z', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 3, opacity: 0.45, transform: 'translate(0 -40) scale(0.7)' }, g);
        // Hattie's bow, Lottie's glasses come after the faces (below)
      },
      face: { x: -140, y: -70, eye: 14, gap: 40, mouthW: 30, mouthY: 30, lidCol: '#3AA6CC' },
      faceB: { x: 140, y: -70, eye: 14, gap: 40, mouthW: 30, mouthY: 30, lidCol: '#E2A21C' } }));
    const inner = c.firstChild;
    const bow = G(inner); tr(bow, -176, -132, 1, -18);
    E('path', { d: 'M0,0 L-26,-15 L-26,15 Z M0,0 L26,-15 L26,15 Z', fill: '#E8424F', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, bow);
    E('circle', { r: 7, fill: '#B0123E', stroke: SC_INK, 'stroke-width': 2 }, bow);
    const gl = G(inner); tr(gl, 140, -70);
    E('path', { d: 'M-40,-14 Q-20,-24 -4,-12 Q-6,14 -22,14 Q-40,12 -40,-14 Z M40,-14 Q20,-24 4,-12 Q6,14 22,14 Q40,12 40,-14 Z', fill: 'rgba(255,255,255,0.15)', stroke: '#7A1E48', 'stroke-width': 4, 'stroke-linejoin': 'round' }, gl);
    c.slot = { left: [-150, 40], mid: [0, 40], right: [150, 40] };
    c.hl = (region, p) => { if (region === 'mid') op(midT, 0.45 * clamp(p)); else op(allT, 0.22 * clamp(p)); };
  } else if (kind === 'cubert') {
    let arms = [];
    c = scMake(parent, Object.assign(S, { seed: 19, bob: 5, mood: o.mood || 'happy',
      draw: g => {
        [-36, 36].forEach(x => {
          E('path', { d: `M${x},84 L${x},112`, stroke: SC_INK, 'stroke-width': 8, 'stroke-linecap': 'round' }, g);
          E('path', { d: `M${x - 16},120 Q${x - 16},106 ${x},106 L${x + 14},108 Q${x + 22},120 ${x + 12},122 Z`, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
        });
        [-1, 1].forEach(sd => arms.push(E('path', { d: '', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g)));
        E('path', { d: 'M-84,-76 L-44,-116 L116,-116 L76,-76 Z', fill: FM_COL.cubeTop, stroke: SC_INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, g);   // top
        E('path', { d: 'M76,-76 L116,-116 L116,44 L76,84 Z', fill: FM_COL.cubeSide, stroke: SC_INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, g);    // side
        E('rect', { x: -84, y: -76, width: 160, height: 160, rx: 6, fill: FM_COL.cube, stroke: SC_INK, 'stroke-width': 5 }, g);                              // front
        E('path', { d: 'M-70,-62 L-30,-62', stroke: '#FFFFFF', 'stroke-width': 6, opacity: 0.4, 'stroke-linecap': 'round' }, g);
        const st = G(g); tr(st, 50, -50);
        E('circle', { r: 17, fill: '#FFFDF6', stroke: SC_INK, 'stroke-width': 2.5 }, st);
        T(st, 0, 11, '³', { size: 32, weight: 800, anchor: 'middle', fill: '#C2453A' });
        E('ellipse', { cx: -52, cy: 30, rx: 11, ry: 7, fill: '#FF6B5C', opacity: 0.45 }, g);
        E('ellipse', { cx: 40, cy: 30, rx: 11, ry: 7, fill: '#FF6B5C', opacity: 0.45 }, g);
      },
      face: { x: -6, y: -4, eye: 16, gap: 52, mouthW: 38, mouthY: 40, lidCol: '#E07A3A' },
      upd: (t, g, st) => {
        const k = st.arms === undefined ? 0.5 : st.arms;
        arms.forEach((a, i) => {
          const sd = i ? 1 : -1, w = Math.sin(t * TAU * 1.8 + i * 2) * 16 * k, x0 = sd > 0 ? 96 : -84;
          a.setAttribute('d', `M${x0},20 Q${x0 + sd * 34},${10 - 10 * k} ${x0 + sd * 40},${(-6 - 40 * k + w).toFixed(1)}`);
        });
      } }));
  } else {
    c = scKavya(parent, o);
  }
  return c;
}

/* ---------- sets ---------- */
function fmLights(parent, pts, o) {
  o = o || {};
  const g = G(parent), n = o.n || 12, sag = o.sag === undefined ? 18 : o.sag, cols = o.cols || ['#FFE45C', '#FF8FC8', '#7EE08A', '#6EC8FF'];
  // a sagging wire through the points, bulbs spaced evenly along it
  const segs = [];
  let len = 0;
  for (let i = 0; i < pts.length - 1; i++) { const [a, b] = [pts[i], pts[i + 1]], l = Math.hypot(b[0] - a[0], b[1] - a[1]); segs.push([a, b, l]); len += l; }
  const at = u => { let d = u * len; for (const [a, b, l] of segs) { if (d <= l) { const p = d / l; return [lerp(a[0], b[0], p), lerp(a[1], b[1], p) + Math.sin(p * Math.PI) * sag]; } d -= l; } return pts[pts.length - 1]; };
  let d = '';
  for (let i = 0; i <= 40; i++) { const [x, y] = at(i / 40); d += (i ? ' L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1); }
  E('path', { d, fill: 'none', stroke: '#2A3540', 'stroke-width': 2.5 }, g);
  g.bulbs = [];
  for (let i = 0; i < n; i++) { const [x, y] = at((i + 0.5) / n); g.bulbs.push(E('circle', { cx: x, cy: y + 7, r: o.r || 7, fill: cols[i % cols.length], stroke: '#2A3540', 'stroke-width': 1.5 }, g)); }
  g.set = (t, mode) => {
    g.bulbs.forEach((b, i) => {
      if (mode === 'off') { b.setAttribute('fill', '#5A6670'); b.setAttribute('opacity', 0.7); return; }
      if (mode && mode !== 'twinkle') { b.setAttribute('fill', mode); b.setAttribute('opacity', 1); return; }
      b.setAttribute('fill', cols[i % cols.length]);
      b.setAttribute('opacity', (0.55 + 0.45 * Math.sin((t || 0) * 3 + i * 1.9)).toFixed(2));
    });
  };
  g.set(0);
  return g;
}

function fmBalloon(parent, text, col) {
  const g = G(parent);
  E('path', { d: 'M0,0 Q-10,-30 0,-60 Q10,-80 0,-96', fill: 'none', stroke: '#E6EBEF', 'stroke-width': 2 }, g);
  const b = G(g); tr(b, 0, -150);
  E('ellipse', { cx: 0, cy: 0, rx: 44, ry: 54, fill: col || '#E8424F', stroke: SC_INK, 'stroke-width': 3 }, b);
  E('path', { d: 'M-6,52 L6,52 L0,60 Z', fill: col || '#E8424F', stroke: SC_INK, 'stroke-width': 2 }, b);
  E('ellipse', { cx: -16, cy: -22, rx: 9, ry: 14, fill: '#FFFFFF', opacity: 0.35 }, b);
  T(b, 0, 22, text, { size: 64, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  g.b = b;
  return g;
}

function fmVoid(parent) {
  const g = G(parent), back = G(g);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#3A2C4A', '#5A4A5E', true) }, back);   // evening outside
  // back wall of the void deck
  E('rect', { x: 0, y: 96, width: 1200, height: 460, fill: '#E9E2D2' }, back);
  E('rect', { x: 0, y: 400, width: 1200, height: 160, fill: '#D8CDB6' }, back);   // lower wall tiles
  E('rect', { x: 0, y: 560, width: 1200, height: 190, fill: linGrad('#A89C88', '#8A7E6C', true) }, back);   // floor
  let fl0 = '';
  for (let i = -8; i <= 8; i++) fl0 += `M${600 + i * 80},560 L${600 + i * 200},750 `;
  E('path', { d: fl0 + 'M0,600 L1200,600 M0,660 L1200,660', stroke: '#7D725F', 'stroke-width': 2, opacity: 0.6 }, back);
  let tl = '';
  for (let x = 0; x <= 1200; x += 40) tl += `M${x},400 L${x},560 `;
  for (let y = 400; y <= 560; y += 40) tl += `M0,${y} L1200,${y} `;
  E('path', { d: tl, stroke: '#C2B596', 'stroke-width': 2 }, back);
  // letterboxes (left) and the lift (right of centre)
  E('rect', { x: 150, y: 190, width: 300, height: 190, fill: '#B9C4CE', stroke: '#7D8A96', 'stroke-width': 4 }, back);
  let lb = '';
  for (let r = 0; r < 5; r++) for (let k = 0; k < 6; k++) lb += `M${162 + k * 48},${202 + r * 35} h40 v28 h-40 Z `;
  E('path', { d: lb, fill: '#DCE3E8', stroke: '#7D8A96', 'stroke-width': 2 }, back);
  T(back, 300, 180, 'LETTERBOXES', { size: 20, weight: 800, anchor: 'middle', fill: '#7D8A96', ls: 2 });
  E('rect', { x: 640, y: 300, width: 170, height: 260, fill: '#8F9CAB', stroke: '#5A6670', 'stroke-width': 4 }, back);
  E('path', { d: 'M725,304 L725,560', stroke: '#5A6670', 'stroke-width': 4 }, back);
  // the ceiling slab
  E('rect', { x: 0, y: 70, width: 1200, height: 40, fill: '#C9C1B0', stroke: '#9C927C', 'stroke-width': 4 }, back);
  // three square pillars; the third hides the Prime Club
  [[60, 'BLK 208'], [520, ''], [1010, '']].forEach(([x, lab]) => {
    E('rect', { x: x - 44, y: 108, width: 88, height: 470, fill: '#EFE8DA', stroke: '#9C927C', 'stroke-width': 4 }, back);
    E('rect', { x: x - 44, y: 440, width: 88, height: 138, fill: '#B07A5A', stroke: '#7A4A33', 'stroke-width': 4 }, back);
    if (lab) { E('rect', { x: x - 40, y: 250, width: 80, height: 40, rx: 4, fill: '#2E7DD8' }, back); T(back, x, 278, lab, { size: 20, weight: 800, anchor: 'middle', fill: '#FFFFFF' }); }
  });
  // the Prime Club's tiny door at the foot of the third pillar
  const club = G(back); tr(club, 1010, 578);
  E('rect', { x: -14, y: -40, width: 28, height: 40, rx: 4, fill: FM_COL.purpleDk, stroke: '#1A1030', 'stroke-width': 2 }, club);
  E('circle', { cx: 8, cy: -20, r: 2.5, fill: FM_COL.gold }, club);
  const clubNeon = E('rect', { x: -24, y: -56, width: 48, height: 12, rx: 3, fill: '#1A1030', stroke: FM_COL.neon, 'stroke-width': 2 }, club);
  T(club, 0, -47, 'PRIME CLUB', { size: 7.5, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  E('path', { d: 'M-20,2 L20,2', stroke: FM_COL.carpet, 'stroke-width': 4 }, club);
  g.club = [1010, 552];
  // bunting and the banner
  const bunt = ['#E8424F', '#FFC247', '#4CC9F0', '#7EE08A'];
  bunt.forEach((col, k) => {
    let d = '';
    for (let i = k; i < 30; i += 4) { const x = 20 + i * 40, y = 118 + Math.sin(i / 29 * Math.PI) * 26; d += `M${x},${y} L${x + 36},${y + 2} L${x + 18},${y + 34} Z `; }
    E('path', { d, fill: col, stroke: SC_INK, 'stroke-width': 1.5 }, back);
  });
  const banner = G(back); tr(banner, 850, 228);
  E('rect', { x: -200, y: -44, width: 400, height: 88, rx: 10, fill: '#B8336A', stroke: '#6B1E3A', 'stroke-width': 4 }, banner);
  T(banner, 0, -6, 'HAPPY 64th BIRTHDAY,', { size: 28, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  T(banner, 0, 30, 'PAATI!', { size: 32, weight: 800, anchor: 'middle', fill: FM_COL.gold, ls: 3 });
  g.banner = banner;
  // balloons "6" and "4"
  const balloons = [[1098, '6', '#E8424F'], [1152, '4', '#2E7DD8']].map(([x, txt, col]) => { const b = fmBalloon(back, txt, col); tr(b, x, 330, 0.62); return b; });
  // fairy lights along the ceiling
  const fl = fmLights(back, [[0, 108], [400, 112], [800, 110], [1200, 108]], { n: 26, sag: 22 });
  // characters stand here
  g.mid = G(g);
  // the party table across the front
  const front = G(g);
  E('rect', { x: 60, y: 518, width: 1080, height: 26, rx: 6, fill: '#FFFDF6', stroke: '#9C927C', 'stroke-width': 4 }, front);
  E('path', { d: 'M70,544 L1130,544 L1150,750 L50,750 Z', fill: '#FFFDF6', stroke: '#9C927C', 'stroke-width': 4 }, front);
  let sc = 'M70,560';
  for (let x = 70; x < 1130; x += 53) sc += ` Q${x + 26},592 ${x + 53},560`;
  E('path', { d: sc, fill: 'none', stroke: '#E2B33C', 'stroke-width': 6 }, front);
  E('rect', { x: 60, y: 600, width: 1080, height: 16, fill: '#B8336A', opacity: 0.85 }, front);
  g.front = front;
  g.top = G(g);
  g.tableY = 530;
  g.upd = t => {
    fl.set(t);
    balloons.forEach((b, i) => tr(b.b, Math.sin(t * 1.1 + i) * 4, -150 + Math.sin(t * 1.4 + i * 2) * 5, 1, Math.sin(t * 0.9 + i) * 5));
    op(clubNeon, 0.6 + 0.4 * (Math.sin(t * 9) > -0.7 ? 1 : 0));
  };
  return g;
}

function fmClub(parent) {
  const g = G(parent);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#1A1030', '#2E1A4A', true) }, g);
  // the pillar face, huge in close-up
  E('rect', { x: 0, y: 0, width: 1200, height: 640, fill: '#3A2A52' }, g);
  let tl = '';
  for (let x = 0; x <= 1200; x += 120) tl += `M${x},0 L${x},640 `;
  for (let y = 0; y <= 640; y += 120) tl += `M0,${y} L1200,${y} `;
  E('path', { d: tl, stroke: '#4A3866', 'stroke-width': 4 }, g);
  // the spotlight
  E('path', { d: 'M560,0 L380,640 L980,640 L760,0 Z', fill: '#FFF3C2', opacity: 0.07 }, g);
  // the door
  const door = G(g); tr(door, 680, 640);
  E('rect', { x: -130, y: -400, width: 260, height: 400, rx: 18, fill: '#1A1030', stroke: FM_COL.gold, 'stroke-width': 6 }, door);
  E('rect', { x: -112, y: -384, width: 224, height: 384, rx: 12, fill: linGrad(FM_COL.purple, FM_COL.purpleDk, true), stroke: '#1A1030', 'stroke-width': 4 }, door);
  E('rect', { x: -86, y: -350, width: 172, height: 120, rx: 10, fill: 'none', stroke: '#8A6AE0', 'stroke-width': 4 }, door);
  E('rect', { x: -86, y: -200, width: 172, height: 160, rx: 10, fill: 'none', stroke: '#8A6AE0', 'stroke-width': 4 }, door);
  E('circle', { cx: 82, cy: -200, r: 13, fill: FM_COL.gold, stroke: SC_INK, 'stroke-width': 3 }, door);
  const plate = G(door); tr(plate, 0, -290);
  E('rect', { x: -78, y: -34, width: 156, height: 68, rx: 8, fill: '#E2B33C', stroke: SC_INK, 'stroke-width': 3 }, plate);
  T(plate, 0, -6, 'MEMBERS', { size: 20, weight: 800, anchor: 'middle', fill: SC_INK, ls: 2 });
  T(plate, 0, 22, '2 3 5 7 11 13 …', { size: 18, weight: 700, anchor: 'middle', fill: SC_INK });
  // the neon sign
  const neon = G(g); tr(neon, 680, 150);
  E('rect', { x: -250, y: -60, width: 500, height: 120, rx: 22, fill: '#120A22', stroke: '#2A1A44', 'stroke-width': 4 }, neon);
  const n1 = T(neon, 0, 2, 'THE PRIME CLUB', { size: 54, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 3 });
  n1.setAttribute('stroke', FM_COL.neon); n1.setAttribute('stroke-width', 5); n1.setAttribute('paint-order', 'stroke');
  T(neon, 0, 44, 'est. 300 BC', { size: 26, weight: 700, anchor: 'middle', fill: '#7FE3FF', font: FB });
  const glowR = E('rect', { x: -260, y: -70, width: 520, height: 140, rx: 26, fill: 'none', stroke: FM_COL.neon, 'stroke-width': 3 }, neon);
  // floor and red carpet
  E('rect', { x: 0, y: 640, width: 1200, height: 110, fill: '#2A2236' }, g);
  E('path', { d: 'M520,640 L840,640 L1000,750 L360,750 Z', fill: FM_COL.carpet, stroke: '#7A1426', 'stroke-width': 3 }, g);
  // velvet rope on brass posts, in front of the door
  const rope = G(g);
  [380, 980].forEach(x => {
    E('rect', { x: x - 7, y: 520, width: 14, height: 120, fill: FM_COL.gold, stroke: SC_INK, 'stroke-width': 3 }, rope);
    E('circle', { cx: x, cy: 516, r: 14, fill: FM_COL.gold, stroke: SC_INK, 'stroke-width': 3 }, rope);
    E('ellipse', { cx: x, cy: 642, rx: 34, ry: 9, fill: '#B8912A', stroke: SC_INK, 'stroke-width': 3 }, rope);
  });
  E('path', { d: 'M380,528 Q680,600 980,528', fill: 'none', stroke: '#8E1B3A', 'stroke-width': 14, 'stroke-linecap': 'round' }, rope);
  g.rope = rope;
  g.floorY = 640;
  g.upd = t => { const f = Math.sin(t * 13) > -0.85 ? 1 : 0.35; op(glowR, 0.5 + 0.5 * f); n1.setAttribute('stroke-opacity', (0.5 + 0.5 * f).toFixed(2)); };
  return g;
}

/* ---------- props ---------- */
function fmStamp(parent, kind) {
  const D = { prime: ['PRIME', '#1E9E5A'], not: ['NOT ON THE LIST', '#D32F2F'], plus: ['PLUS ONE', '#8E44AD'], comp: ['COMPOSITE', '#D32F2F'] }[kind] || ['PRIME', '#1E9E5A'];
  return mkStamp(parent, D[0], D[1]);
}

function fmNum(parent, text, o) {
  o = o || {};
  const col = o.col || '#FF8A3D';
  const w = Math.max(96, textWidth(String(text), 62, FD, 800) + 44);
  const c = scMake(parent, { s: o.s, mood: o.mood || 'neutral', seed: String(text).length * 7 + 3, bob: 3,
    draw: g => {
      [-22, 22].forEach(x => E('path', { d: `M${x},-24 L${x},-4 M${x - 10},-2 L${x + 12},-2`, stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g));
      E('rect', { x: -w / 2, y: -150, width: w, height: 128, rx: 54, fill: col, stroke: SC_INK, 'stroke-width': 5 }, g);
      E('rect', { x: -w / 2 + 14, y: -96, width: w - 28, height: 64, rx: 24, fill: '#FFFDF6', stroke: SC_INK, 'stroke-width': 3 }, g);
      T(g, 0, -45, String(text), { size: 52, weight: 800, anchor: 'middle', fill: SC_INK });
    },
    face: { x: 0, y: -124, eye: 11, gap: 34, mouthW: 18, mouthY: 15, lidCol: mkShade(col, -0.2), brow: false } });
  return c;
}

function fmChair(parent, col) {
  const g = G(parent), c = col || '#E8424F', dk = mkShade(c, -0.3);
  E('rect', { x: -18, y: -26, width: 36, height: 26, rx: 6, fill: c, stroke: dk, 'stroke-width': 2.5 }, g);           // back rest
  E('path', { d: 'M-22,0 L22,0 L22,8 L-22,8 Z M-20,8 L-22,26 M20,8 L22,26', fill: mkShade(c, 0.15), stroke: dk, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
  E('path', { d: 'M-10,-18 L10,-18 M-10,-10 L10,-10', stroke: dk, 'stroke-width': 2 }, g);
  return g;
}

function fmCupcake(parent) {
  const g = G(parent);
  E('path', { d: 'M-17,2 L17,2 L13,24 L-13,24 Z', fill: '#4CC9F0', stroke: SC_INK, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, g);
  E('path', { d: 'M-20,4 Q-22,-12 -8,-14 Q0,-26 8,-14 Q22,-12 20,4 Z', fill: '#FFC2E0', stroke: SC_INK, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, g);
  E('circle', { cx: 2, cy: -20, r: 5, fill: '#E8424F', stroke: SC_INK, 'stroke-width': 1.5 }, g);
  return g;
}

function fmLaddoo(parent, r) {
  r = r || 14;
  return E('circle', { r, fill: ball('#FFB347', '#D9771A'), stroke: '#8A4A10', 'stroke-width': Math.max(1.5, r * 0.12) }, parent);
}
