/* PIECE OF CAKE (Claude Sitcom Ep 4, Fractions): the cast, sets and props of this episode.
   Bundled after engine lib.js, kit.js, mathkit.js and sitcom.js (scMake, scTalk, scKavya, scCastHuman,
   scConfessional, scLowerThird, scVideoCall, mk* maths kit). Every top-level name starts with `fc`, except `cast`.

   Characters: cast(parent, kind, o) -> g, origin at the character's centre, about 200-260 px tall at s = 1
     o: { s (scale), mood (default mood), hat (party-hat colour, humans only), ... }  (humans: any scHuman option
        overrides, e.g. prop, lift, style)
     g.set({ t, talk, mood, look, sweat, still, ... })   call every frame
       talk 0..1 (use scTalk(S, t, who)); mood: neutral | happy | smug | annoyed | sad | shock | deadpan
       look -1..1 pupils left/right; still: true stops the idle bob
     HUMANS (busts, bottom of the shirt at y = 140: stand them behind a table or counter, or crop at the frame edge):
       'kavya'  (kavya)  Kavya, 12 (scKavya, PE shirt "8")
       'mum'    (mum)    Mum: magenta kurta, bun, bindi. Default prop: none (pass prop: 'ladle' etc.)
       'dad'    (dad)    Dad: glasses, moustache, green polo. Default prop: a spatula (he is baking)
       'boy'    (boy)    Ah Boy, 8, the birthday boy: orange star tee. Default: an empty hand (lift: 1 raises it)
       'priya'  (priya)  Priya, 12: Saturday purple tee (not her uniform), bob, yellow clip. Default prop: none
       'tan'    (tan)    Mr Tan, maths teacher, neighbour from the 8th floor: shirt and tie, glasses. Default prop: none
       { hat: '#FF5FA2' } adds a striped party hat with a pompom (it bobs with the head). { body: true } builds the
       full body (scHumanBody, feet at 0,0; pose API) and ignores hat.
     CARTOONS (scMake):
       'vinny' (vinny)  Vinny, the FRACTION BAR: a long charcoal bar (the vinculum) in a bouncer's black suit: white
                        collar and black tie under the bar, a flat-top crew cut, a curly earpiece wire, a gold
                        "SECURITY" pin, stubby legs. About 330 wide. Default mood deadpan.
                        Extra: { stop: 0..1 } swaps the crossed arms for a raised STOP palm (for "Not on my bar!");
                        { tear: 0..1 } a tear rolls down (the stinger).
       'vic'   (vic)    Victoria, a rectangular VICTORIA SPONGE: two golden sponge layers with cream and jam between,
                        white icing drips, one strawberry on top, a pearl necklace. Posh, dramatic. About 260 x 200.
                        Default mood smug. Extra: { swoon: 0..1 } tilts her back with the back of a hand to her brow.
       'topsy' (topsy)  Topsy, an IMPROPER FRACTION: a big wobbly numerator head on a thin bar over a tiny denominator
                        and two tiny feet: top-heavy. o: { top: '19', bot: '15' } (text). Default happy.
                        Extra: { whole: 0..1 } a golden whole-number block "1" appears to his left and he sits on
                        its edge (a mixed number); g.nums(top, bot) changes the numbers (cheap setText).
                        Tip him over yourself with tr(g, x, y, s, angle) (pivot at his feet: origin is mid-body,
                        his feet are at y = 120).
       'mira'  (mira)   Mira, the MIRROR AT ZERO: an orange-rimmed convex traffic mirror on a striped pole (the kind
                        on every HDB car-park corner), a silver glass face with a sheen, long lashes, a "0" plate on
                        the pole. Vain. Default smug. Extra: { shine: 0..1 } sweeps a glint across the glass.
       'flip'  (flip)   Flip, the RECIPROCAL: a gymnast in a red-and-yellow leotard with a big "⇅" badge, headband,
                        wristbands, little legs. Hyper. Default happy. Extra: { arms: 0..1 } raises both arms in a V
                        (ta-da). Spin him with tr(g, x, y, s, angle) for a flip.
       'ex'    (ex)     Mister X, THE UNKNOWN: a fat purple italic letter x (four limbs), a black fedora, a black
                        domino mask across the eyes, a little grey cape. Smooth, mysterious. Default smug.
                        Extra: { guard: 0..1 } a "+ 5" tile clings to his right arm (his bodyguard).
   Shots
     fcConf(parent, who)             confessional background tinted for that character (scConfessional); g.set(p, t)
     FC_TINT                         the confessional colours per character
     fcLowerThird(parent, who)       scLowerThird with this episode's name and role for `who` (FC_LT); g.set(p)

   Sets (full stage 1200 x 750; each returns g)
     fcVoid(parent, o)    the VOID DECK under Block 208, set for the party: grey floor, square pillars with a teal band,
                          strip lights, a wall of letterboxes (left), a stone chess table and stools (right, behind),
                          bunting, a "HAPPY 8TH BIRTHDAY AH BOY" banner (y 120-190) and a bunch of balloons with an "8".
                          LAYERS like a stall: put busts in g.mid (behind the party table), the table is g.front (pink
                          tablecloth, top edge at g.tableY = 560), props standing on the table go in g.top.
                          o: { table: false } hides the table (g.front empty: full-height floor for hopscotch).
                          g.upd(t) sways the balloons and bunting.
     fcKitchen(parent)    the family's HDB kitchen: blue tiled wall, a window with the next block outside, a wall clock
                          (g.clock(h, m)), upper cabinets, an oven at the right (g.oven(p): its window glows 0..1).
                          LAYERS: g.mid (busts behind the counter), g.front (the counter, top edge at g.counterY = 548),
                          g.top (props on the counter).

   Props (around their own origin)
     fcMeasuringJug(parent, o)       clear measuring jug, base centre at (0,0), about 260 tall, marks for 1/4 1/2 3/4 and
                                     1 cup (stacked fractions, dark ink) on the right side. o: { level 0..1 (0.75), col }.
                                     g.markY(v) = y of the v-cup mark (v = 0.25 ... 1); g.labelX = x of the labels.
                                     g.set(level)
     fcSlab(parent, o)               TOP VIEW of the tray cake for area models, centred: sponge rectangle w x h (o.w 480,
                                     o.h 300) with a cream border. o: { cols (4), rows (3) }.
                                     g.choc(k)   chocolate over the first k columns (fractions grow the next one)
                                     g.spr(k)    sprinkles over the first k rows (top first)
                                     g.grid(p)   column and row cut lines fade in
                                     g.hl(p)     yellow outline round the overlap (k columns x k rows as last set)
                                     g.W, g.H, g.x(c) left edge of column c, g.y(r) top edge of row r (local px)
     fcPizza(parent, o)              vegetarian margherita (tomato, cheese, basil) seen from above, centred, r (o.r 110),
                                     cut into o.n (4) slices. g.set(k) shows k slices (the rest are an empty plate);
                                     g.lift(i, p) slides slice i outwards
     fcBalloon(parent, col, o)       a balloon on a curly string, the knot at (0,0), about 150 tall. o: { s, label }
     fcGoodieBag(parent, col, o)     paper party bag with a star, base centre at (0,0), about 110 tall. o: { s, full (true) }
     fcJug(parent, o)                lime-juice jug, base centre at (0,0), about 190 tall. g.set(level 0..1)
     fcCup(parent, o)                party paper cup, base centre at (0,0), about 90 tall. o: { col (lime), s }. g.set(level)
     fcHorn(parent, o)               party blower: a mouthpiece at (0,0) and a striped paper roll that unrolls to the
                                     right. g.set(p) 0 curled ... 1 fully out (the deflating-joke gag: animate 1 -> 0.2)
     fcParcel(parent, o)             pass-the-parcel: a box in o.layers (5) wrapping papers, centred, about 200 wide.
                                     g.set(k) shows the outer k layers (k = 0: the bare gift box); g.size(k) the
                                     half-width at k layers (to place labels)
     fcStamp(parent, ok)             mkStamp 'NOT ON MY BAR!' (red, ok false) or 'SIMPLEST FORM' (green, ok true); g.set(p).
                                     About 690 / 640 px wide at scale 1: scale it (tr(g, x, y, 0.5)).
*/

/* ---------- confessional tints, lower thirds ---------- */
const FC_TINT = {
  vinny: ['#15161C', '#2E3340'], vic: ['#3A2414', '#7A4A24'], topsy: ['#14303A', '#24586B'], mira: ['#2A2A3A', '#4A4E6E'],
  flip: ['#3A1414', '#7A2424'], ex: ['#1E1030', '#40246B'], kavya: ['#14243A', '#25446B'], dad: ['#123026', '#245A48'],
  mum: ['#3A1030', '#6B1E58'], boy: ['#3A2410', '#6B4414'], priya: ['#22163D', '#47307A'], tan: ['#1A2A3A', '#33506E'],
};
function fcConf(parent, who) { const c = FC_TINT[who] || FC_TINT.vinny; return scConfessional(parent, c[0], c[1]); }
const FC_LT = {
  vinny: ['VINNY', 'The fraction bar. Works the door.'],
  vic: ['VICTORIA', 'Sponge cake. Equal pieces only.'],
  topsy: ['TOPSY', 'Improper fraction. Top-heavy.'],
  mira: ['MIRA', 'The mirror at zero. Vain.'],
  flip: ['FLIP', 'The reciprocal. Gymnast.'],
  ex: ['MISTER X', 'The unknown. Any number but 0.'],
  kavya: ['KAVYA, 12', 'Big sister. Half right.'],
  mum: ['MUM', 'Party manager.'],
  dad: ['DAD', '"Piece of cake."'],
  boy: ['AH BOY, 8', 'Birthday boy. Wants the biggest piece.'],
  priya: ['PRIYA', 'Best friend. Competitive.'],
  tan: ['MR TAN', 'Maths teacher. 8th floor. Party games.'],
};
function fcLowerThird(parent, who) { const l = FC_LT[who] || [String(who).toUpperCase(), '']; return scLowerThird(parent, l[0], l[1]); }

/* ---------- the cast ---------- */
const FC_PROP = { mum: null, dad: 'spatula', boy: null, priya: null, tan: null };
function fcHat(parent, col) {
  const g = G(parent);
  E('path', { d: 'M-38,0 L6,-104 L40,0 Q0,12 -38,0 Z', fill: col, stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
  E('path', { d: 'M-26,-28 L28,-28 M-14,-58 L20,-58', stroke: '#FFFFFF', 'stroke-width': 7, opacity: 0.85 }, g);
  E('circle', { cx: 6, cy: -108, r: 13, fill: '#FFE45C', stroke: SC_INK, 'stroke-width': 3 }, g);
  return g;
}
function cast(parent, kind, o) {
  o = o || {};
  if (kind === 'kavya' || SC_HUMANS[kind]) {
    let c, topY;
    if (kind === 'kavya') { c = scKavya(parent, o); topY = -108; }
    else {
      const base = kind === 'boy' ? { hand: true } : { prop: FC_PROP[kind] };
      if (kind === 'priya') Object.assign(base, { style: 'tee', shirt: '#8E5BD8', logo: '♪', logoCol: '#FFE45C' });
      const p = Object.assign(base, o);
      c = scCastHuman(parent, kind, p);
      if (p.body) return c;
      topY = c.top + 34;
    }
    if (o.hat) { const h = fcHat(c.firstChild, o.hat); tr(h, 14, topY, 0.9, 12); c.hatG = h; }
    return c;
  }
  const S = { s: o.s, mood: o.mood };
  let c;
  if (kind === 'vinny') {
    let crossed = null, stopA = null, tear = null;
    c = scMake(parent, Object.assign(S, { seed: 4, bob: 2, mood: o.mood || 'deadpan',
      draw: g => {
        // legs and shoes
        [-46, 46].forEach(x => {
          E('rect', { x: x - 13, y: 40, width: 26, height: 62, fill: '#1C2028', stroke: SC_INK, 'stroke-width': 4 }, g);
          E('path', { d: `M${x - 18},112 Q${x - 18},98 ${x},98 L${x + 22},100 Q${x + 30},112 ${x + 20},114 Z`, fill: '#0E0F12', stroke: SC_INK, 'stroke-width': 3 }, g);
        });
        // collar and tie peeking out under the bar
        E('path', { d: 'M-34,30 L0,58 L34,30 Z', fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
        E('path', { d: 'M-7,36 L7,36 L10,72 L0,82 L-10,72 Z', fill: '#0E0F12', stroke: SC_INK, 'stroke-width': 2.5 }, g);
        // the bar itself
        E('rect', { x: -168, y: -44, width: 336, height: 88, rx: 26, fill: linGrad('#4A505E', '#1E222B', true), stroke: SC_INK, 'stroke-width': 6 }, g);
        E('path', { d: 'M-146,-30 L146,-30', stroke: '#FFFFFF', 'stroke-width': 5, opacity: 0.16, 'stroke-linecap': 'round' }, g);
        // a flat-top crew cut along the top edge
        E('path', { d: 'M-150,-44 L-146,-58 L150,-58 L154,-44 Z', fill: '#101216', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
        // earpiece and its curly wire on the right end
        E('circle', { cx: 166, cy: -10, r: 9, fill: '#2A2F38', stroke: '#8F9CAB', 'stroke-width': 3 }, g);
        E('path', { d: 'M168,0 q12,6 0,12 q-12,6 0,12 q12,6 0,12 q-12,6 0,12', fill: 'none', stroke: '#C9D3DC', 'stroke-width': 2.5 }, g);
        // security pin
        E('rect', { x: -150, y: 12, width: 62, height: 20, rx: 5, fill: '#E2B33C', stroke: SC_INK, 'stroke-width': 2 }, g);
        T(g, -119, 28, 'SECURITY', { size: 13, weight: 800, anchor: 'middle', fill: '#3A2A08' });
        // crossed arms (default)
        crossed = G(g);
        E('path', { d: 'M-120,40 Q-40,92 60,58', fill: 'none', stroke: SC_INK, 'stroke-width': 34, 'stroke-linecap': 'round' }, crossed);
        E('path', { d: 'M-120,40 Q-40,92 60,58', fill: 'none', stroke: '#2A2F38', 'stroke-width': 26, 'stroke-linecap': 'round' }, crossed);
        E('path', { d: 'M120,40 Q40,92 -60,58', fill: 'none', stroke: SC_INK, 'stroke-width': 34, 'stroke-linecap': 'round' }, crossed);
        E('path', { d: 'M120,40 Q40,92 -60,58', fill: 'none', stroke: '#2A2F38', 'stroke-width': 26, 'stroke-linecap': 'round' }, crossed);
        E('circle', { cx: 66, cy: 56, r: 14, fill: '#C68A5E', stroke: SC_INK, 'stroke-width': 3 }, crossed);
        E('circle', { cx: -66, cy: 56, r: 14, fill: '#C68A5E', stroke: SC_INK, 'stroke-width': 3 }, crossed);
        // the STOP palm (right arm up), left arm down
        stopA = G(g);
        E('path', { d: 'M-130,36 Q-150,70 -136,100', fill: 'none', stroke: '#2A2F38', 'stroke-width': 24, 'stroke-linecap': 'round' }, stopA);
        E('path', { d: 'M140,30 Q196,10 196,-70', fill: 'none', stroke: SC_INK, 'stroke-width': 32, 'stroke-linecap': 'round' }, stopA);
        E('path', { d: 'M140,30 Q196,10 196,-70', fill: 'none', stroke: '#2A2F38', 'stroke-width': 24, 'stroke-linecap': 'round' }, stopA);
        E('path', { d: 'M174,-74 L174,-120 Q174,-128 181,-128 Q188,-128 188,-120 L188,-128 Q188,-136 195,-136 Q202,-136 202,-128 L202,-124 Q202,-132 209,-132 Q216,-132 216,-124 L216,-80 Q216,-60 196,-58 Q176,-60 174,-74 Z', fill: '#C68A5E', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, stopA);
        E('path', { d: 'M174,-96 Q164,-104 158,-96 Q160,-84 174,-80', fill: '#C68A5E', stroke: SC_INK, 'stroke-width': 3 }, stopA);
        tear = E('path', { d: 'M0,-10 Q7,0 0,6 Q-7,0 0,-10 Z', fill: '#8FD3FF', stroke: '#2E7DD8', 'stroke-width': 2 }, g);
      },
      face: { x: 0, y: -8, eye: 15, gap: 70, mouthW: 44, mouthY: 24, lidCol: '#3A404C' },
      upd: (t, g, st) => {
        const s = clamp(st.stop || 0), k = clamp(st.tear || 0);
        op(crossed, s > 0.5 ? 0 : 1); op(stopA, s > 0.5 ? 1 : 0);
        op(tear, k > 0 ? 1 : 0); tr(tear, -28, -2 + 26 * k);
      } }));
  } else if (kind === 'vic') {
    let hand = null, body = null;
    c = scMake(parent, Object.assign(S, { seed: 9, bob: 2, mood: o.mood || 'smug',
      draw: g => {
        body = G(g);
        // plate
        E('ellipse', { cx: 0, cy: 92, rx: 160, ry: 18, fill: '#F4F7FA', stroke: '#8F9CAB', 'stroke-width': 4 }, body);
        // sponge layers, cream and jam
        E('rect', { x: -130, y: 26, width: 260, height: 60, rx: 10, fill: linGrad('#F6C878', '#D99A44', true), stroke: SC_INK, 'stroke-width': 5 }, body);
        E('rect', { x: -132, y: 10, width: 264, height: 18, rx: 6, fill: '#FFFDF6', stroke: SC_INK, 'stroke-width': 4 }, body);
        E('rect', { x: -130, y: 2, width: 260, height: 10, fill: '#D6304A' }, body);
        E('rect', { x: -130, y: -62, width: 260, height: 66, rx: 10, fill: linGrad('#F6C878', '#D99A44', true), stroke: SC_INK, 'stroke-width': 5 }, body);
        // icing with drips
        E('path', { d: 'M-134,-70 Q-134,-84 -120,-84 L120,-84 Q134,-84 134,-70 L134,-52 Q126,-40 118,-52 Q110,-30 100,-50 Q80,-46 70,-56 Q56,-28 44,-54 Q20,-48 6,-56 Q-8,-34 -20,-54 Q-44,-46 -58,-56 Q-72,-30 -84,-54 Q-104,-44 -116,-56 Q-126,-40 -134,-54 Z', fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, body);
        // strawberry
        const sb = G(body); tr(sb, 20, -92);
        E('path', { d: 'M-20,-10 Q-22,16 0,26 Q22,16 20,-10 Q0,-18 -20,-10 Z', fill: '#E8424F', stroke: SC_INK, 'stroke-width': 3 }, sb);
        E('path', { d: 'M-14,-12 L-4,-20 L0,-12 L6,-22 L14,-12', fill: '#2FA36B', stroke: SC_INK, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, sb);
        [[-8, 2], [6, 0], [-2, 12], [10, 12]].forEach(([x, y]) => E('circle', { cx: x, cy: y, r: 1.8, fill: '#FFE45C' }, sb));
        // pearls
        let pd = '';
        for (let i = 0; i < 11; i++) { const a = Math.PI * (0.15 + 0.7 * i / 10), x = -Math.cos(a) * 74, y = 40 + Math.sin(a) * 26; E('circle', { cx: x, cy: y, r: 6, fill: ball('#FFFFFF', '#C9D3DC'), stroke: '#8F9CAB', 'stroke-width': 1.5 }, body); pd += i; }
        // a hand for swooning
        hand = G(g);
        E('path', { d: 'M126,30 Q170,0 150,-60', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, hand);
        E('circle', { cx: 148, cy: -66, r: 13, fill: '#FFFDF6', stroke: SC_INK, 'stroke-width': 3 }, hand);
      },
      face: { x: 0, y: -16, eye: 15, gap: 62, mouthW: 34, mouthY: 28, lidCol: '#E2A456' },
      upd: (t, g, st) => {
        const k = clamp(st.swoon || 0);
        op(hand, k > 0.05 ? 1 : 0);
        tr(hand, -40 * k, -30 * k, 1, -20 * k);
        g.setAttribute('transform', `${g.getAttribute('transform') || ''} rotate(${(-10 * k).toFixed(1)})`);
      } }));
  } else if (kind === 'topsy') {
    let whole = null, nTop = null, nBot = null;
    c = scMake(parent, Object.assign(S, { seed: 13, bob: 6, mood: o.mood || 'happy',
      draw: g => {
        // the whole-number block he can sit on
        whole = G(g); tr(whole, -150, 30);
        E('rect', { x: -56, y: -80, width: 112, height: 170, rx: 14, fill: linGrad('#FFE45C', '#E2A21C', true), stroke: SC_INK, 'stroke-width': 5 }, whole);
        T(whole, 0, 54, '1', { size: 150, weight: 800, anchor: 'middle', fill: '#8A6508' });
        // tiny feet
        [-14, 14].forEach(x => E('path', { d: `M${x - 10},120 Q${x - 10},108 ${x + 2},108 L${x + 12},110 Q${x + 16},120 ${x + 10},122 Z`, fill: '#E8424F', stroke: SC_INK, 'stroke-width': 3 }, g));
        E('path', { d: 'M-8,96 L-12,110 M8,96 L12,110', stroke: SC_INK, 'stroke-width': 5, 'stroke-linecap': 'round' }, g);
        // tiny denominator
        E('circle', { cx: 0, cy: 78, r: 26, fill: ball('#7FD3FF', '#2E7DD8'), stroke: SC_INK, 'stroke-width': 4 }, g);
        nBot = T(g, 0, 88, o.bot || '15', { size: 26, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
        // the bar (a waist)
        E('rect', { x: -52, y: 42, width: 104, height: 12, rx: 6, fill: '#2A2F38', stroke: SC_INK, 'stroke-width': 3 }, g);
        // huge numerator head
        E('circle', { cx: 0, cy: -46, r: 86, fill: ball('#FFB36B', '#E8751A'), stroke: SC_INK, 'stroke-width': 5 }, g);
        E('ellipse', { cx: -36, cy: -100, rx: 22, ry: 12, fill: '#FFFFFF', opacity: 0.3 }, g);
        nTop = T(g, 0, 10, o.top || '19', { size: 52, weight: 800, anchor: 'middle', fill: '#7A3A08' });
        // little arms flailing
        E('path', { d: 'M-84,-30 Q-120,-50 -128,-86 M84,-30 Q120,-50 128,-86', fill: 'none', stroke: SC_INK, 'stroke-width': 6, 'stroke-linecap': 'round' }, g);
      },
      face: { x: 0, y: -60, eye: 17, gap: 60, mouthW: 36, mouthY: 34, lidCol: '#F09A4A' },
      upd: (t, g, st) => { op(whole, clamp(st.whole || 0)); } }));
    c.nums = (a, b) => { if (nTop.textContent !== String(a)) setText(nTop, String(a)); if (nBot.textContent !== String(b)) setText(nBot, String(b)); };
  } else if (kind === 'mira') {
    let glint = null;
    c = scMake(parent, Object.assign(S, { seed: 17, bob: 1.5, mood: o.mood || 'smug',
      draw: g => {
        // striped pole with a 0 plate
        E('rect', { x: -10, y: 70, width: 20, height: 130, fill: '#C9D3DC', stroke: SC_INK, 'stroke-width': 4 }, g);
        [96, 136, 176].forEach(y => E('rect', { x: -10, y, width: 20, height: 18, fill: '#2A2F38' }, g));
        const pl = G(g); tr(pl, 0, 150);
        E('rect', { x: -26, y: -24, width: 52, height: 48, rx: 8, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 4 }, pl);
        T(pl, 0, 15, '0', { size: 40, weight: 800, anchor: 'middle', fill: SC_INK });
        // rim and glass
        E('circle', { cx: 0, cy: -20, r: 104, fill: '#FF7A1A', stroke: SC_INK, 'stroke-width': 5 }, g);
        E('circle', { cx: 0, cy: -20, r: 88, fill: linGrad('#E8F1FA', '#9FB4C8', true), stroke: '#B85A10', 'stroke-width': 4 }, g);
        E('path', { d: 'M-60,-70 Q-20,-104 30,-96', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 9, opacity: 0.7, 'stroke-linecap': 'round' }, g);
        glint = E('path', { d: 'M-12,-100 L6,-100 L-30,60 L-48,60 Z', fill: '#FFFFFF', opacity: 0.35 }, g);
        // lashes
        [-1, 1].forEach(sd => E('path', { d: `M${sd * 18},-56 l${sd * 4},-12 M${sd * 30},-54 l${sd * 8},-10 M${sd * 42},-48 l${sd * 12},-6`, stroke: SC_INK, 'stroke-width': 3, 'stroke-linecap': 'round' }, g));
        E('ellipse', { cx: -52, cy: -4, rx: 12, ry: 7, fill: '#FF8FB0', opacity: 0.5 }, g);
        E('ellipse', { cx: 52, cy: -4, rx: 12, ry: 7, fill: '#FF8FB0', opacity: 0.5 }, g);
      },
      face: { x: 0, y: -34, eye: 16, gap: 60, mouthW: 30, mouthY: 40, lidCol: '#C9D7E6', iris: '#3A2A6A' },
      upd: (t, g, st) => { const k = st.shine === undefined ? 0 : st.shine; op(glint, 0.35 * Math.sin(Math.PI * clamp(k))); tr(glint, lerp(-30, 90, clamp(k)), 0); } }));
  } else if (kind === 'flip') {
    let armsV = null, armsD = null;
    c = scMake(parent, Object.assign(S, { seed: 21, bob: 6, mood: o.mood || 'happy',
      draw: g => {
        // legs
        [-26, 26].forEach(x => {
          E('path', { d: `M${x},60 L${x},108`, stroke: '#F3C9A0', 'stroke-width': 14, 'stroke-linecap': 'round' }, g);
          E('path', { d: `M${x - 12},116 Q${x - 12},106 ${x},106 L${x + 14},108 Q${x + 18},116 ${x + 12},118 Z`, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
        });
        // arms: down/out, or up in a V
        armsD = G(g);
        E('path', { d: 'M-60,-6 Q-96,24 -98,62 M60,-6 Q96,24 98,62', fill: 'none', stroke: '#F3C9A0', 'stroke-width': 13, 'stroke-linecap': 'round' }, armsD);
        armsV = G(g);
        E('path', { d: 'M-58,-20 Q-92,-60 -110,-120 M58,-20 Q92,-60 110,-120', fill: 'none', stroke: '#F3C9A0', 'stroke-width': 13, 'stroke-linecap': 'round' }, armsV);
        [[-110, -120], [110, -120]].forEach(([x, y]) => E('rect', { x: x - 10, y: y + 10, width: 20, height: 12, rx: 3, fill: '#FFE45C', stroke: SC_INK, 'stroke-width': 2 }, armsV));
        // leotard body (egg)
        E('path', { d: 'M0,-110 C62,-110 76,-30 70,20 C64,64 36,80 0,80 C-36,80 -64,64 -70,20 C-76,-30 -62,-110 0,-110 Z', fill: '#E8424F', stroke: SC_INK, 'stroke-width': 5 }, g);
        E('path', { d: 'M-66,30 Q0,0 68,-20 L70,10 Q0,30 -64,58 Z', fill: '#FFE45C' }, g);
        // badge ⇅
        const bd = G(g); tr(bd, 0, 50);
        E('circle', { r: 20, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, bd);
        E('path', { d: 'M-7,10 L-7,-10 M-12,-4 L-7,-11 L-2,-4 M7,-10 L7,10 M2,4 L7,11 L12,4', fill: 'none', stroke: '#E8424F', 'stroke-width': 3.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, bd);
        // headband
        E('path', { d: 'M-62,-76 Q0,-104 62,-76', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 12, 'stroke-linecap': 'round' }, g);
        E('path', { d: 'M-62,-76 Q0,-104 62,-76', fill: 'none', stroke: '#2E7DD8', 'stroke-width': 5, 'stroke-linecap': 'round' }, g);
      },
      face: { x: 0, y: -38, eye: 15, gap: 50, mouthW: 30, mouthY: 30, lidCol: '#C62828' },
      upd: (t, g, st) => { const k = st.arms === undefined ? 0 : st.arms; op(armsV, k > 0.5 ? 1 : 0); op(armsD, k > 0.5 ? 0 : 1); } }));
  } else if (kind === 'ex') {
    let guard = null;
    c = scMake(parent, Object.assign(S, { seed: 25, bob: 3, mood: o.mood || 'smug',
      draw: g => {
        // cape behind
        E('path', { d: 'M-70,-60 Q-120,40 -96,110 L96,110 Q120,40 70,-60 Z', fill: '#5A6670', stroke: SC_INK, 'stroke-width': 4, opacity: 0.95 }, g);
        // the italic x: two fat strokes
        const xs = G(g);
        E('path', { d: 'M-96,-96 Q-20,-10 70,110', fill: 'none', stroke: SC_INK, 'stroke-width': 54, 'stroke-linecap': 'round' }, xs);
        E('path', { d: 'M-96,-96 Q-20,-10 70,110', fill: 'none', stroke: '#8E4FE0', 'stroke-width': 42, 'stroke-linecap': 'round' }, xs);
        E('path', { d: 'M100,-96 Q20,-10 -76,110', fill: 'none', stroke: SC_INK, 'stroke-width': 54, 'stroke-linecap': 'round' }, xs);
        E('path', { d: 'M100,-96 Q20,-10 -76,110', fill: 'none', stroke: '#A56CF2', 'stroke-width': 42, 'stroke-linecap': 'round' }, xs);
        // a round face plate where the strokes cross
        E('circle', { cx: 0, cy: -2, r: 58, fill: ball('#B88CFF', '#7240C8'), stroke: SC_INK, 'stroke-width': 5 }, g);
        // domino mask (drawn under the eyes: the eye whites sit on top)
        E('path', { d: 'M-56,-22 Q-30,-40 0,-24 Q30,-40 56,-22 Q60,4 30,6 Q12,4 0,-6 Q-12,4 -30,6 Q-60,4 -56,-22 Z', fill: '#111216', stroke: SC_INK, 'stroke-width': 3 }, g);
        // fedora
        const hat = G(g); tr(hat, 4, -54, 1, -6);
        E('path', { d: 'M-78,6 Q0,-10 78,6 Q60,18 0,16 Q-60,18 -78,6 Z', fill: '#16171C', stroke: SC_INK, 'stroke-width': 4 }, hat);
        E('path', { d: 'M-46,6 Q-50,-44 -10,-46 Q0,-36 10,-46 Q50,-44 46,6 Z', fill: '#1E2026', stroke: SC_INK, 'stroke-width': 4 }, hat);
        E('rect', { x: -46, y: -12, width: 92, height: 12, fill: '#C62828' }, hat);
        // the + 5 bodyguard tile
        guard = G(g); tr(guard, 128, 40, 1, 8);
        E('rect', { x: -44, y: -32, width: 88, height: 64, rx: 12, fill: '#FFE45C', stroke: SC_INK, 'stroke-width': 4 }, guard);
        T(guard, 0, 16, '+ 5', { size: 42, weight: 800, anchor: 'middle', fill: SC_INK });
      },
      face: { x: 0, y: -12, eye: 13, gap: 46, mouthW: 30, mouthY: 34, lidCol: '#111216' },
      upd: (t, g, st) => { op(guard, clamp(st.guard || 0)); } }));
  } else {
    c = scKavya(parent, o);
  }
  return c;
}

/* ---------- sets ---------- */
function fcVoid(parent, o) {
  o = o || {};
  const g = G(parent), back = G(g);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#DCDCD2' }, back);
  // ceiling and strip lights
  E('rect', { x: 0, y: 0, width: 1200, height: 92, fill: '#C9C9BE' }, back);
  [180, 600, 1020].forEach(x => { E('rect', { x: x - 110, y: 40, width: 220, height: 16, rx: 6, fill: '#FFFFF0', stroke: '#A4A496', 'stroke-width': 3 }, back); E('rect', { x: x - 140, y: 56, width: 280, height: 30, fill: '#FFFFEA', opacity: 0.25 }, back); });
  // back wall: letterboxes (left), open view to the playground (right)
  E('rect', { x: 0, y: 92, width: 1200, height: 380, fill: '#E9E6DA' }, back);
  const lb = G(back);
  E('rect', { x: 40, y: 230, width: 300, height: 230, fill: '#7D8A96', stroke: '#4A5560', 'stroke-width': 4 }, lb);
  let boxes = '';
  for (let r = 0; r < 5; r++) for (let k = 0; k < 6; k++) boxes += `M${48 + k * 48},${238 + r * 44} h42 v38 h-42 Z `;
  E('path', { d: boxes, fill: '#A9B5C0', stroke: '#4A5560', 'stroke-width': 2 }, lb);
  E('rect', { x: 760, y: 200, width: 400, height: 272, fill: linGrad('#BFE6FF', '#E8F6FF', true) }, back);
  E('path', { d: 'M760,420 Q860,380 960,410 Q1060,436 1160,400 L1160,472 L760,472 Z', fill: '#8FD18A' }, back);
  E('rect', { x: 940, y: 300, width: 120, height: 120, fill: '#FFC247', stroke: '#B57B12', 'stroke-width': 4 }, back);   // playground frame
  E('path', { d: 'M1060,320 L1130,420', stroke: '#E8424F', 'stroke-width': 12, 'stroke-linecap': 'round' }, back);   // slide
  // pillars with the teal band
  [[400, 90], [690, 70]].forEach(([x, w]) => {
    E('rect', { x, y: 92, width: w, height: 600, fill: '#F2F0E6', stroke: '#B5B2A4', 'stroke-width': 4 }, back);
    E('rect', { x, y: 400, width: w, height: 70, fill: '#2E9C8C' }, back);
  });
  // floor
  E('rect', { x: 0, y: 472, width: 1200, height: 278, fill: '#B8B8AE' }, back);
  let fl = '';
  for (let x = -200; x <= 1400; x += 120) fl += `M${x},472 L${600 + (x - 600) * 1.8},750 `;
  for (const y of [520, 590, 680]) fl += `M0,${y} L1200,${y} `;
  E('path', { d: fl, stroke: '#A2A298', 'stroke-width': 2 }, back);
  // stone chess table and stools, behind on the right
  const st = G(back); tr(st, 1010, 520);
  E('ellipse', { cx: 0, cy: 0, rx: 80, ry: 20, fill: '#9AA0A6', stroke: '#5A6670', 'stroke-width': 4 }, st);
  E('rect', { x: -16, y: 10, width: 32, height: 60, fill: '#8A9096' }, st);
  [-120, 120].forEach(dx => { E('ellipse', { cx: dx, cy: 42, rx: 28, ry: 10, fill: '#9AA0A6', stroke: '#5A6670', 'stroke-width': 3 }, st); E('rect', { x: dx - 10, y: 48, width: 20, height: 36, fill: '#8A9096' }, st); });
  // bunting
  const bunt = G(back);
  let bp = '';
  const BC = ['#FF5FA2', '#FFC247', '#4CC9F0', '#56D69B', '#B48CFF'];
  const flags = [];
  for (let i = 0; i < 16; i++) {
    const x = 20 + i * 74, y = 100 + 22 * Math.sin((i / 15) * Math.PI);
    const f = E('path', { d: `M${x},${y} L${x + 60},${y + 2} L${x + 30},${y + 44} Z`, fill: BC[i % 5], stroke: '#5A6670', 'stroke-width': 1.5 }, bunt);
    flags.push(f);
  }
  E('path', { d: 'M0,100 Q600,150 1200,100', fill: 'none', stroke: '#5A6670', 'stroke-width': 2 }, bunt);
  // banner
  const ban = G(back); tr(ban, 600, 160);
  E('path', { d: 'M-330,-34 L330,-34 L310,0 L330,34 L-330,34 L-310,0 Z', fill: '#FFFFFF', stroke: '#C62828', 'stroke-width': 5 }, ban);
  T(ban, 0, 14, 'HAPPY 8TH BIRTHDAY, AH BOY!', { size: 36, weight: 800, anchor: 'middle', fill: '#C62828', ls: 1 });
  // balloon bunch (left pillar)
  const bb = G(back); tr(bb, 470, 330);
  const balloons = [['#FF5FA2', -40, -60], ['#FFC247', 10, -96], ['#4CC9F0', 50, -50], ['#56D69B', -10, -20]].map(([col, x, y], i) => {
    const b = G(bb);
    E('path', { d: `M0,90 Q${x * 0.4},40 ${x},${y + 40}`, fill: 'none', stroke: '#5A6670', 'stroke-width': 2 }, b);
    const ball_ = G(b); tr(ball_, x, y);
    E('ellipse', { cx: 0, cy: 0, rx: 34, ry: 40, fill: ball(mkShade(col, 0.3), col), stroke: SC_INK, 'stroke-width': 3 }, ball_);
    if (i === 1) T(ball_, 0, 16, '8', { size: 46, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
    return ball_;
  });
  g.mid = G(g);
  const front = G(g);
  if (o.table !== false) {
    E('rect', { x: 60, y: 552, width: 1080, height: 22, rx: 6, fill: '#FF8FC8', stroke: '#B8336A', 'stroke-width': 4 }, front);
    E('path', { d: 'M70,574 L1130,574 L1130,750 L70,750 Z', fill: linGrad('#FFB3D6', '#F07AB0', true), stroke: '#B8336A', 'stroke-width': 4 }, front);
    let sc = '';
    for (let x = 70; x < 1130; x += 53) sc += `M${x},574 Q${x + 26},604 ${x + 53},574 `;
    E('path', { d: sc, fill: 'none', stroke: '#FFFFFF', 'stroke-width': 4, opacity: 0.8 }, front);
  }
  g.front = front;
  g.top = G(g);
  g.tableY = 560;
  g.upd = t => {
    balloons.forEach((b, i) => { const [x, y] = [[-40, -60], [10, -96], [50, -50], [-10, -20]][i]; tr(b, x + 4 * Math.sin(t * 1.3 + i), y + 3 * Math.sin(t * 1.7 + i * 2), 1, 5 * Math.sin(t * 1.1 + i)); });
    flags.forEach((f, i) => f.setAttribute('transform', `rotate(${(4 * Math.sin(t * 2 + i * 0.7)).toFixed(1)} ${20 + i * 74 + 30} ${100 + 22 * Math.sin((i / 15) * Math.PI)})`));
  };
  return g;
}

function fcKitchen(parent) {
  const g = G(parent), back = G(g);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#E2F0F4' }, back);
  // blue tiled splashback
  E('rect', { x: 0, y: 300, width: 1200, height: 260, fill: '#BFE0EA' }, back);
  let tl = '';
  for (let x = 0; x <= 1200; x += 40) tl += `M${x},300 L${x},560 `;
  for (let y = 300; y <= 560; y += 40) tl += `M0,${y} L1200,${y} `;
  E('path', { d: tl, stroke: '#9CC8D6', 'stroke-width': 2 }, back);
  // window with the next HDB block
  const win = G(back); tr(win, 180, 100);
  E('rect', { x: -130, y: -10, width: 260, height: 200, rx: 6, fill: linGrad('#9FD8FF', '#E3F4FF', true), stroke: '#7D8A96', 'stroke-width': 6 }, win);
  E('rect', { x: -100, y: 40, width: 200, height: 150, fill: '#E9DCC4', stroke: '#9C8A6A', 'stroke-width': 3 }, win);
  let w2 = '';
  for (let r = 0; r < 4; r++) for (let k = 0; k < 5; k++) w2 += `M${-90 + k * 38},${52 + r * 34} h24 v18 h-24 Z `;
  E('path', { d: w2, fill: '#9CC2DC' }, win);
  E('path', { d: 'M0,-10 L0,190 M-130,90 L130,90', stroke: '#7D8A96', 'stroke-width': 6 }, win);
  // upper cabinets
  E('rect', { x: 360, y: 30, width: 560, height: 190, rx: 8, fill: '#F7F3EA', stroke: '#B5AE9C', 'stroke-width': 4 }, back);
  [500, 640, 780].forEach(x => E('line', { x1: x, y1: 30, x2: x, y2: 220, stroke: '#B5AE9C', 'stroke-width': 3 }, back));
  [470, 530, 750, 810].forEach(x => E('rect', { x: x - 4, y: 180, width: 8, height: 26, rx: 3, fill: '#8F9CAB' }, back));
  // wall clock
  const ck = G(back); tr(ck, 1040, 110);
  E('circle', { r: 56, fill: '#FFFFFF', stroke: '#2A3B44', 'stroke-width': 7 }, ck);
  for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; E('line', { x1: Math.sin(a) * 44, y1: -Math.cos(a) * 44, x2: Math.sin(a) * 50, y2: -Math.cos(a) * 50, stroke: '#2A3B44', 'stroke-width': 3 }, ck); }
  const hh = E('line', { x1: 0, y1: 0, x2: 0, y2: -28, stroke: '#2A3B44', 'stroke-width': 6, 'stroke-linecap': 'round' }, ck);
  const mm = E('line', { x1: 0, y1: 0, x2: 0, y2: -42, stroke: '#2A3B44', 'stroke-width': 4, 'stroke-linecap': 'round' }, ck);
  g.clock = (h, m) => { hh.setAttribute('transform', `rotate(${((h % 12) * 30 + m * 0.5).toFixed(1)})`); mm.setAttribute('transform', `rotate(${(m * 6).toFixed(1)})`); };
  g.clock(12, 0);
  // oven on the right
  const ov = G(back); tr(ov, 1040, 380);
  E('rect', { x: -120, y: -100, width: 240, height: 200, rx: 10, fill: '#D9DEE3', stroke: '#5A6670', 'stroke-width': 5 }, ov);
  E('rect', { x: -100, y: -60, width: 200, height: 130, rx: 8, fill: '#2A3036', stroke: '#5A6670', 'stroke-width': 4 }, ov);
  const glow_ = E('rect', { x: -92, y: -52, width: 184, height: 114, rx: 6, fill: '#FF8A3D', opacity: 0 }, ov);
  E('rect', { x: -90, y: -86, width: 180, height: 12, rx: 6, fill: '#8F9CAB' }, ov);
  [-60, 0, 60].forEach(x => E('circle', { cx: x, cy: -80, r: 7, fill: '#5A6670' }, ov));
  g.oven = p => op(glow_, 0.85 * clamp(p));
  g.mid = G(g);
  const front = G(g);
  E('rect', { x: 0, y: 540, width: 1200, height: 22, fill: '#F2E6CF', stroke: '#9C8A6A', 'stroke-width': 4 }, front);
  E('rect', { x: 0, y: 562, width: 1200, height: 188, fill: linGrad('#C9935A', '#9C6B3E', true), stroke: '#6B4423', 'stroke-width': 4 }, front);
  [300, 600, 900].forEach(x => { E('line', { x1: x, y1: 562, x2: x, y2: 750, stroke: '#6B4423', 'stroke-width': 4 }, front); E('rect', { x: x - 60, y: 600, width: 40, height: 10, rx: 4, fill: '#E6EBEF' }, front); });
  g.front = front;
  g.top = G(g);
  g.counterY = 548;
  return g;
}

/* ---------- props ---------- */
function fcMeasuringJug(parent, o) {
  o = o || {};
  const g = G(parent);
  const H = 240, body = 'M-80,-240 L80,-240 L90,-14 Q90,0 76,0 L-76,0 Q-90,0 -90,-14 Z';
  const clip = _clipUrl(body);
  const liq = E('rect', { x: -100, y: -240, width: 200, height: 240, fill: o.col || '#FFF6EA', 'clip-path': clip }, g);
  E('path', { d: body, fill: 'rgba(230,245,255,0.35)', stroke: '#5A6670', 'stroke-width': 5, 'stroke-linejoin': 'round' }, g);
  E('path', { d: 'M80,-210 Q140,-200 136,-130 Q132,-70 86,-64', fill: 'none', stroke: '#5A6670', 'stroke-width': 12, 'stroke-linecap': 'round' }, g);
  E('path', { d: 'M-80,-240 L-100,-256 L-70,-248', fill: 'rgba(255,255,255,0.4)', stroke: '#5A6670', 'stroke-width': 4 }, g);
  const markY = v => -24 - v * (H - 54);
  [0.25, 0.5, 0.75, 1].forEach(v => {
    const y = markY(v);
    E('line', { x1: -40, y1: y, x2: 16, y2: y, stroke: '#C62828', 'stroke-width': 4 }, g);
    mkMath(g, 22, y + 14, v === 1 ? '1' : v === 0.5 ? '1/2' : v === 0.25 ? '1/4' : '3/4', { size: 26, fill: '#C62828', anchor: 'start' });
  });
  E('path', { d: 'M-62,-220 L-56,-30', stroke: '#FFFFFF', 'stroke-width': 7, opacity: 0.6, 'stroke-linecap': 'round' }, g);
  g.markY = markY; g.labelX = 22;
  g.set = level => { const L = clamp(level); const y = markY(L); attr(liq, 'y', y); attr(liq, 'height', -y + 2); };
  g.set(o.level === undefined ? 0.75 : o.level);
  return g;
}

function fcSlab(parent, o) {
  o = o || {};
  const w = o.w || 480, h = o.h || 300, cols = o.cols || 4, rows = o.rows || 3, g = G(parent);
  const x0 = -w / 2, y0 = -h / 2, cw = w / cols, rh = h / rows;
  E('rect', { x: x0 - 14, y: y0 - 14, width: w + 28, height: h + 28, rx: 18, fill: '#FFFDF6', stroke: SC_INK, 'stroke-width': 5 }, g);
  E('rect', { x: x0, y: y0, width: w, height: h, fill: '#F2C273' }, g);
  const choc = E('rect', { x: x0, y: y0, width: 0, height: h, fill: '#6B3E22', opacity: 0.92 }, g);
  // sprinkles: a band of dots per row, clipped by a rect that grows downwards
  const sprG = G(g), sprRect = E('rect', { x: x0, y: y0, width: w, height: 0, fill: 'rgba(255,255,255,0.18)' }, sprG);
  const r = rng(21), SP = ['#FF5FA2', '#FFE45C', '#4CC9F0', '#56D69B', '#FFFFFF'];
  const rowsG = [];
  for (let k = 0; k < rows; k++) {
    const rg = G(sprG); let d = ['', '', '', '', ''];
    for (let i = 0; i < 46; i++) { const x = x0 + 8 + r() * (w - 16), y = y0 + k * rh + 8 + r() * (rh - 16), a = r() * Math.PI; d[i % 5] += `M${(x - 6 * Math.cos(a)).toFixed(1)},${(y - 6 * Math.sin(a)).toFixed(1)} L${(x + 6 * Math.cos(a)).toFixed(1)},${(y + 6 * Math.sin(a)).toFixed(1)} `; }
    d.forEach((dd, i) => E('path', { d: dd, stroke: SP[i], 'stroke-width': 5, 'stroke-linecap': 'round' }, rg));
    rowsG.push(rg);
  }
  let gl = '';
  for (let c = 1; c < cols; c++) gl += `M${x0 + c * cw},${y0} L${x0 + c * cw},${y0 + h} `;
  for (let k = 1; k < rows; k++) gl += `M${x0},${y0 + k * rh} L${x0 + w},${y0 + k * rh} `;
  const grid = E('path', { d: gl, stroke: SC_INK, 'stroke-width': 4, 'stroke-dasharray': '14 8' }, g);
  E('rect', { x: x0, y: y0, width: w, height: h, fill: 'none', stroke: SC_INK, 'stroke-width': 5 }, g);
  const hl = E('rect', { x: x0, y: y0, width: 0, height: 0, fill: 'none', stroke: '#FFE45C', 'stroke-width': 9, rx: 4 }, g);
  let kc = 0, kr = 0;
  g.choc = k => { kc = clamp(k, 0, cols); attr(choc, 'width', kc * cw); };
  g.spr = k => { kr = clamp(k, 0, rows); attr(sprRect, 'height', kr * rh); rowsG.forEach((rg, i) => op(rg, clamp(kr - i))); };
  g.grid = p => op(grid, clamp(p));
  g.hl = p => { op(hl, clamp(p)); attr(hl, 'width', Math.floor(kc) * cw); attr(hl, 'height', Math.floor(kr) * rh); };
  g.W = w; g.H = h; g.x = c => x0 + c * cw; g.y = k => y0 + k * rh;
  g.choc(0); g.spr(0); g.grid(0); g.hl(0);
  return g;
}

function fcPizza(parent, o) {
  o = o || {};
  const R = o.r || 110, n = o.n || 4, g = G(parent);
  E('circle', { r: R + 18, fill: '#F4F7FA', stroke: '#8F9CAB', 'stroke-width': 4 }, g);   // plate
  const slices = [], r = rng(7 + n);
  for (let i = 0; i < n; i++) {
    const s = G(g), a0 = -Math.PI / 2 + i / n * TAU, a1 = a0 + TAU / n, mid = (a0 + a1) / 2;
    const arc = `M0,0 L${(Math.cos(a0) * R).toFixed(1)},${(Math.sin(a0) * R).toFixed(1)} A${R},${R} 0 ${n <= 2 ? 1 : 0} 1 ${(Math.cos(a1) * R).toFixed(1)},${(Math.sin(a1) * R).toFixed(1)} Z`;
    E('path', { d: arc, fill: '#E9A951', stroke: '#8A5A20', 'stroke-width': 3, 'stroke-linejoin': 'round' }, s);
    const Ri = R * 0.86, arcI = `M0,0 L${(Math.cos(a0) * Ri).toFixed(1)},${(Math.sin(a0) * Ri).toFixed(1)} A${Ri},${Ri} 0 ${n <= 2 ? 1 : 0} 1 ${(Math.cos(a1) * Ri).toFixed(1)},${(Math.sin(a1) * Ri).toFixed(1)} Z`;
    E('path', { d: arcI, fill: '#E8424F' }, s);
    E('path', { d: arcI, fill: '#FFE7A8', opacity: 0.8, transform: 'scale(0.9)' }, s);
    for (let k = 0; k < 3; k++) { const a = a0 + (0.2 + 0.3 * k) * (a1 - a0), d = R * (0.3 + 0.45 * r()); E('circle', { cx: Math.cos(a) * d, cy: Math.sin(a) * d, r: 9, fill: '#D6304A', stroke: '#9C1E30', 'stroke-width': 2 }, s); }
    const ba = mid, bd = R * 0.55; E('ellipse', { cx: Math.cos(ba) * bd, cy: Math.sin(ba) * bd, rx: 11, ry: 6, fill: '#2FA36B', transform: `rotate(${(ba * 57.3).toFixed(0)} ${(Math.cos(ba) * bd).toFixed(1)} ${(Math.sin(ba) * bd).toFixed(1)})` }, s);
    s.mid = mid; slices.push(s);
  }
  g.set = k => slices.forEach((s, i) => op(s, clamp(k - i)));
  g.lift = (i, p) => { const s = slices[i]; tr(s, Math.cos(s.mid) * 30 * p, Math.sin(s.mid) * 30 * p); };
  g.set(n);
  return g;
}

function fcBalloon(parent, col, o) {
  o = o || {};
  const g = G(parent), inner = G(g); tr(inner, 0, 0, o.s || 1);
  E('path', { d: 'M0,0 q8,14 0,28 q-8,14 0,28 q8,14 0,28', fill: 'none', stroke: '#5A6670', 'stroke-width': 2 }, inner);
  E('path', { d: 'M-6,4 L6,4 L0,-6 Z', fill: col, stroke: SC_INK, 'stroke-width': 2 }, inner);
  E('ellipse', { cx: 0, cy: -46, rx: 34, ry: 42, fill: ball(mkShade(col, 0.35), col), stroke: SC_INK, 'stroke-width': 3 }, inner);
  if (o.label) T(inner, 0, -34, o.label, { size: 34, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  return g;
}

function fcGoodieBag(parent, col, o) {
  o = o || {};
  const g = G(parent), inner = G(g); tr(inner, 0, 0, o.s || 1);
  if (o.full !== false) {
    E('circle', { cx: -16, cy: -96, r: 12, fill: '#FF5FA2', stroke: SC_INK, 'stroke-width': 2 }, inner);
    E('rect', { x: 2, y: -112, width: 14, height: 30, rx: 4, fill: '#4CC9F0', stroke: SC_INK, 'stroke-width': 2, transform: 'rotate(14 9 -97)' }, inner);
  }
  E('path', { d: 'M-40,-90 L40,-90 L46,0 L-46,0 Z', fill: col || '#FFC247', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, inner);
  E('path', { d: 'M-22,-90 Q-22,-118 0,-118 Q22,-118 22,-90', fill: 'none', stroke: SC_INK, 'stroke-width': 4 }, inner);
  E('path', { d: 'M0,-62 L6,-48 L21,-47 L9,-38 L13,-23 L0,-31 L-13,-23 L-9,-38 L-21,-47 L-6,-48 Z', fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 2 }, inner);
  return g;
}

function fcJug(parent, o) {
  o = o || {};
  const g = G(parent), inner = G(g); tr(inner, 0, 0, o.s || 1);
  const body = 'M-56,-170 L56,-170 L64,-12 Q64,0 50,0 L-50,0 Q-64,0 -64,-12 Z';
  const clip = _clipUrl(body);
  const liq = E('rect', { x: -70, y: -170, width: 140, height: 170, fill: o.col || '#B8E35A', 'clip-path': clip }, inner);
  E('path', { d: body, fill: 'rgba(255,255,255,0.22)', stroke: '#5A6670', 'stroke-width': 5, 'stroke-linejoin': 'round' }, inner);
  E('path', { d: 'M56,-150 Q104,-140 100,-90 Q96,-50 62,-48', fill: 'none', stroke: '#5A6670', 'stroke-width': 10, 'stroke-linecap': 'round' }, inner);
  E('circle', { cx: -20, cy: -60, r: 14, fill: '#E8FFC2', stroke: '#6FA02A', 'stroke-width': 3, 'clip-path': clip }, inner);   // lime slice
  E('path', { d: 'M-40,-150 L-36,-20', stroke: '#FFFFFF', 'stroke-width': 6, opacity: 0.6, 'stroke-linecap': 'round' }, inner);
  g.set = level => { const L = clamp(level === undefined ? 0.85 : level); attr(liq, 'y', -170 * L); attr(liq, 'height', 170 * L + 2); };
  g.set(0.85);
  return g;
}

function fcCup(parent, o) {
  o = o || {};
  const g = G(parent), inner = G(g); tr(inner, 0, 0, o.s || 1);
  const body = 'M-34,-90 L34,-90 L26,0 L-26,0 Z', clip = _clipUrl(body);
  const liq = E('rect', { x: -40, y: -90, width: 80, height: 90, fill: o.col || '#B8E35A', 'clip-path': clip }, inner);
  E('path', { d: body, fill: 'rgba(255,255,255,0.3)', stroke: '#5A6670', 'stroke-width': 4, 'stroke-linejoin': 'round' }, inner);
  E('path', { d: 'M-31,-60 L31,-60 M-29,-36 L29,-36', stroke: '#FF5FA2', 'stroke-width': 5, opacity: 0.8 }, inner);
  g.set = level => { const L = clamp(level === undefined ? 0.8 : level); attr(liq, 'y', -90 * L); attr(liq, 'height', 90 * L + 2); };
  g.set(0.8);
  return g;
}

function fcHorn(parent, o) {
  o = o || {};
  const g = G(parent);
  E('rect', { x: -40, y: -9, width: 44, height: 18, rx: 6, fill: '#FFC247', stroke: SC_INK, 'stroke-width': 3 }, g);
  const roll = E('path', { d: '', fill: 'none', stroke: SC_INK, 'stroke-width': 22, 'stroke-linecap': 'round' }, g);
  const rollC = E('path', { d: '', fill: 'none', stroke: '#FF5FA2', 'stroke-width': 15, 'stroke-linecap': 'round', 'stroke-dasharray': '14 10' }, g);
  g.set = p => {
    p = clamp(p);
    const L = 30 + 190 * p, cr = 22 * (1 - p) + 4;
    // straight part then a curl whose radius shrinks as it unrolls
    const xs = 4 + L * p, d = `M4,0 L${xs.toFixed(1)},0 A${cr.toFixed(1)},${cr.toFixed(1)} 0 1 1 ${(xs - cr * 0.3).toFixed(1)},${(-cr * 1.6).toFixed(1)}`;
    attr(roll, 'd', d); attr(rollC, 'd', d);
  };
  g.set(0);
  return g;
}

function fcParcel(parent, o) {
  o = o || {};
  const n = o.layers || 5, g = G(parent), cols = ['#FF5FA2', '#4CC9F0', '#FFC247', '#56D69B', '#B48CFF', '#FF8A3D', '#6EC8FF'];
  const layers = [];
  const size = k => 60 + k * 14;   // half-width with k layers on
  // bare gift box
  E('rect', { x: -60, y: -60, width: 120, height: 120, rx: 10, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 4 }, g);
  E('path', { d: 'M0,-60 L0,60 M-60,0 L60,0', stroke: '#C62828', 'stroke-width': 10 }, g);
  for (let k = 1; k <= n; k++) {
    const L = G(g), s = size(k), col = cols[(k - 1) % cols.length];
    E('rect', { x: -s, y: -s, width: 2 * s, height: 2 * s, rx: 14, fill: col, stroke: SC_INK, 'stroke-width': 4 }, L);
    E('path', { d: `M${-s + 10},${-s + 18} L${s - 18},${s - 10} M${-s + 30},${-s + 6} L${s - 6},${s - 30}`, stroke: '#FFFFFF', 'stroke-width': 5, opacity: 0.45 }, L);
    E('path', { d: `M${-s * 0.4},${-s} L${-s * 0.25},${-s + 14} M${s * 0.5},${s} L${s * 0.35},${s - 14}`, stroke: SC_INK, 'stroke-width': 3, opacity: 0.6 }, L);   // tape
    layers.push(L);
  }
  // draw order: the outermost layer must be on top
  layers.forEach(L => g.appendChild(L));
  g.set = k => layers.forEach((L, i) => op(L, clamp(k - i)));
  g.size = size;
  g.set(n);
  return g;
}

function fcStamp(parent, ok) { return mkStamp(parent, ok ? 'SIMPLEST FORM' : 'NOT ON MY BAR!', ok ? '#1E9E5A' : '#D32F2F'); }
