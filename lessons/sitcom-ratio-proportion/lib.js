/* KEEP IT IN PROPORTION (Claude Sitcom Ep 7, Ratio & Proportion): the cast, sets and props of this episode.
   Bundled after engine lib.js, kit.js, mathkit.js and sitcom.js (scMake, scTalk, scKavya, scCastHuman,
   scConfessional, scLowerThird, scVideoCall, mk* maths kit). Every top-level name starts with `rp`, except `cast`.

   Characters: cast(parent, kind, o) -> g, origin at the character's centre, about 200-240 px tall at s = 1
     o: { s (scale), mood (default mood), ... }   (humans: any scHuman option overrides, e.g. prop, lift)
     g.set({ t, talk, mood, look, sweat, still, ... })   call every frame
       talk 0..1 (use scTalk(S, t, who)); mood: neutral | happy | smug | annoyed | sad | shock | deadpan
       look -1..1 pupils left/right; still: true stops the idle bob
     HUMANS (busts, bottom of the shirt at y = 140, so put them behind a counter or the frame edge):
       'kavya'  (kavya)  Kavya, 12 (scKavya, PE shirt "8")
       'mum'    (mum)    Mum: magenta kurta, bun, bindi. Default prop: a ladle
       'dad'    (dad)    Dad: glasses, moustache, green polo. Default prop: a calculator (he never uses it)
       'boy'    (boy)    Ah Boy, 8: orange star tee. Default: an empty hand (lift: 1 raises it)
       'priya'  (priya)  Priya, 12: school uniform, bob, yellow clip. Default prop: a pencil
       'tan'    (tan)    Mr Tan, maths teacher: shirt and tie, glasses. Default prop: a cup of kopi
       'rose'   (rose)   Auntie Rose: curly perm, floral blouse, ROSE'S apron. Default prop: a phone
       Pass { prop: null } for no prop; { body: true } for a full body (scHumanBody, feet at 0,0; pose API).
     CARTOONS (scMake):
       'colonel' (colonel) The Colonel, the RATIO SIGN: two stacked navy dots (the colon), a khaki officer's cap
                         with a gold ":" badge, a white handlebar moustache, medals on the lower dot, white gloves,
                         a swagger stick. Default mood deadpan. Extra: g.set({ salute: 0..1 }) raises his right
                         glove to the cap; { point: 0..1 } swings the swagger stick out to point right.
       'chop'    (chop)  Chopper, the HCF cleaver: a steel vegetable cleaver (blade with the face, "÷ HCF" etched),
                         wooden handle to the right, little arms. Hyper. Default happy.
                         Extra: { arms: 0..1 } arm-pump size (default 0.5). Tilt him with tr(g, x, y, s, angle) to CHOP.
       'barry'   (barry) Barry, the BAR MODEL: a bar of 5 equal boxes with a face, little legs and arms, a flat cap.
                         Calm, proud. Extra: { lit: 0..5 } highlights the first k boxes (yellow); fractions fade the next.
       'uni'     (uni)   Uni, the UNITARY METHOD: a white unicorn bust with a rainbow mane; her horn is a golden
                         numeral "1"; a "1" badge. Bubbly. Extra: { sparkle: 0..1 } sparkles around the horn (default 1).
       'monty'   (monty) Monty (Montgomery), a folded MAP: paper panels with creases, green land, a blue river,
                         a red dotted route, scale strip "1 : 50 000", a gold monocle and a bow tie. Pompous.
       'ivy'     (ivy)   Ivy, INVERSE PROPORTION: a purple head on a thick curved tail (the curve y = k/x) inside a
                         pair of grey axes that she never touches (visible gaps), a lilac bow. Cool, contrary.
                         Default smug. Extra: { gap: 0..1 } pulses the two little "no touching" gap marks.

   Shots
     rpConf(parent, who)             confessional background tinted for that character (scConfessional); g.set(p, t)
     RP_TINT                         the confessional colours per character
     rpLowerThird(parent, who)       scLowerThird with this episode's name and role for `who` (RP_LT); g.set(p)

   Sets (full stage 1200 x 750; each returns g)
     rpHawker(parent)     wide shot of the hawker centre under Block 208 at 7 a.m.: the HDB block behind, the roof,
                          ceiling fans, a row of stall fronts (THOSAI, VEG BEE HOON, ROSE'S KITCHEN in the middle,
                          DRINKS), tables and stools. g.upd(t) spins the fans; g.rose = [x, y] the centre of Rose's
                          stall front (zoom target); g.sign = [x, y] her sign.
     rpStall(parent)      close-up of ROSE'S KITCHEN from the customer side: red sign band (y 104-176), back wall,
                          drinks menu board on the right (g.menu: mkHawkerMenu, g.menu.hl(i, p): 0 Bandung $1.80,
                          1 Lime juice $1.60, 2 Mango lassi 3 for $10.50, 3 Kopi / teh $1.40), two drink dispensers on
                          a shelf at the left (pink BANDUNG, green LIME), a hanging fan, the steel counter (top at
                          g.counterY = 530). LAYERS: put characters in g.mid (behind the counter: a bust at y about
                          440 hides its shirt hem), the counter is g.front, and props standing on the counter go in
                          g.top (drawn last). g.upd(t) turns the fan and bubbles the dispensers.
     rpMart(parent)       supermarket chiller aisle: "CHILLED: YOGHURT" sign (right), three shelves at g.shelves
                          [300, 470, 640] (the y of each shelf top), shelf-edge price strips, some filler packs at
                          the far left and right. Put rpYoghurt pots on a shelf.
     rpMelaka(parent, w, h)  backdrop for Auntie Rose's video calls, centred on (0,0): sky, the red Stadthuys and its
                          clock tower, a palm, a flower-covered trishaw.
     rpRoseCall(parent, w, h, label)  scVideoCall with the Melaka backdrop and Auntie Rose (bust) far too close to the
                          camera (the running gag). Centred on (0,0). g.rose (cast, use g.rose.set), g.bg, g.screen.
                          label default 'Auntie Rose · Melaka'.

   Props (around their own origin)
     RP_DRINK                        colours: milk, syrup, bandung (1 : 4), sludge (4 : 1), lime, lassi, kopi, teh
     rpMix(syrup, milk)              the pink of a syrup : milk mix (same ratio, same colour: that's the point)
     rpRecipeCard(parent, o)         Auntie Rose's recipe card (cream, ruled, red top line, a pink rose doodle),
                                     centred. o: { title ('BANDUNG'), lines (mkText markup rows), w (420), h (280),
                                     size (30) }. g.rows[i] (op() them); g.W, g.H.
     rpJug(parent, o)                plastic jug, base centre at (0,0), about 200 tall. o: { col (RP_DRINK.bandung), s }
                                     g.set(level 0..1, col) (col optional, a CHANGE of colour is cheap)
     rpCup(parent, o)                takeaway cup with lid and straw, base centre at (0,0), about 150 tall.
                                     o: { col, s, label }. g.set(level, col)
     rpTipsJar(parent, o)            glass jar with a TIPS label and folded notes, base centre at (0,0), about 170 tall.
                                     g.set(k) shows the first k of 8 notes (fractions fade the next).
     rpYoghurt(parent, size, o)      yoghurt pot, base centre at (0,0): size 'S' (150 g), 'M' (500 g), 'L' (1 kg).
                                     o: { price (text, adds a mkPriceTag hanging at the top right) }. g.tag (or null)
     rpMango(parent, s)              a mango, centred, about 70 wide
     rpStamp(parent, ok)             mkStamp 'IN PROPORTION' (green, ok true) or 'OUT OF PROPORTION' (red); g.set(p).
                                     It is about 760 px wide at scale 1: scale the returned g (tr(g, x, y, 0.6)).
*/

/* ---------- confessional tints, lower thirds ---------- */
const RP_TINT = {
  colonel: ['#141B3A', '#28346B'], chop: ['#1C2630', '#3A4A58'], barry: ['#10283A', '#1E4E6E'], uni: ['#3A1438', '#6B2A66'],
  monty: ['#1E2E14', '#3E5A28'], ivy: ['#24163D', '#47307A'], kavya: ['#14243A', '#25446B'], rose: ['#3A1424', '#6E2A44'],
  dad: ['#123026', '#245A48'], mum: ['#3A1030', '#6B1E58'], boy: ['#3A2410', '#6B4414'], priya: ['#1A2240', '#33407A'],
  tan: ['#1A2A3A', '#33506E'],
};
function rpConf(parent, who) { const c = RP_TINT[who] || RP_TINT.colonel; return scConfessional(parent, c[0], c[1]); }
const RP_LT = {
  colonel: ['THE COLONEL', 'The ratio sign. Quality control.'],
  chop: ['CHOPPER', 'Divides by the HCF. Loves it.'],
  barry: ['BARRY', 'Bar model. Equal boxes only.'],
  uni: ['UNI', 'The unitary method. Find ONE.'],
  monty: ['MONTY', 'A map. 1 : 50 000. Enormous.'],
  ivy: ['IVY', 'Inverse proportion. Never touches.'],
  kavya: ['KAVYA, 12', 'Minding the stall.'],
  mum: ['MUM', "Kavya's mum. Less sweet."],
  dad: ['DAD', '"How hard can it be?"'],
  boy: ['AH BOY, 8', "Kavya's brother. Inventor."],
  priya: ['PRIYA', 'Best friend. Competitive.'],
  tan: ['MR TAN', 'Maths teacher. Off duty. Allegedly.'],
  rose: ['AUNTIE ROSE', "Rose's Kitchen, Blk 208"],
};
function rpLowerThird(parent, who) { const l = RP_LT[who] || [String(who).toUpperCase(), '']; return scLowerThird(parent, l[0], l[1]); }

/* ---------- drink colours ---------- */
const RP_DRINK = { milk: '#FFF6EA', syrup: '#C2185B', bandung: '#F6A3C4', sludge: '#D2386F', lime: '#B8E35A', lassi: '#FFC94A', kopi: '#6B3E22', teh: '#C98A4B' };
function rpMix(syrup, milk) {
  const f = clamp(syrup / Math.max(1e-6, syrup + milk) * 1.6);   // 1 : 4 -> 0.32 of the way to syrup
  const a = [255, 246, 234], b = [194, 24, 91];
  return '#' + a.map((v, i) => Math.round(lerp(v, b[i], f)).toString(16).padStart(2, '0')).join('');
}

/* ---------- the cast ---------- */
const RP_PROP = { mum: 'ladle', dad: 'calculator', boy: null, priya: 'pencil', tan: 'kopi', rose: 'phone' };
function cast(parent, kind, o) {
  o = o || {};
  if (kind === 'kavya') return scKavya(parent, o);
  if (SC_HUMANS[kind]) {
    const p = Object.assign({}, kind === 'boy' ? { hand: true } : { prop: RP_PROP[kind] }, o);
    return scCastHuman(parent, kind, p);
  }
  const S = { s: o.s, mood: o.mood };
  let c;
  if (kind === 'colonel') {
    let armR = null, stick = null, sal = null;
    c = scMake(parent, Object.assign(S, { seed: 4, bob: 2, mood: o.mood || 'deadpan',
      draw: g => {
        // the lower dot: the body, with medals
        E('circle', { cx: 0, cy: 66, r: 48, fill: ball('#5566E0', '#1E2878'), stroke: SC_INK, 'stroke-width': 5 }, g);
        E('path', { d: 'M-34,34 L30,104', stroke: '#C62828', 'stroke-width': 12, opacity: 0.9 }, g);   // sash
        [[-22, 66, '#E2B33C'], [0, 70, '#C9D3DC'], [22, 66, '#E2B33C']].forEach(([x, y, col], i) => {
          E('path', { d: `M${x - 7},${y - 26} L${x + 7},${y - 26} L${x + 5},${y - 10} L${x - 5},${y - 10} Z`, fill: ['#2E7DD8', '#C62828', '#2FA36B'][i], stroke: SC_INK, 'stroke-width': 2 }, g);
          E('circle', { cx: x, cy: y - 2, r: 8, fill: col, stroke: SC_INK, 'stroke-width': 2.5 }, g);
        });
        // left glove resting on the belly
        E('path', { d: 'M-46,58 Q-70,74 -54,96', fill: 'none', stroke: '#1E2878', 'stroke-width': 9, 'stroke-linecap': 'round' }, g);
        E('circle', { cx: -52, cy: 98, r: 12, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
        // right arm (animated): from the body's right edge
        armR = G(g); tr(armR, 44, 52);
        stick = G(armR);
        E('path', { d: 'M0,0 L64,-4', stroke: '#6B4423', 'stroke-width': 7, 'stroke-linecap': 'round' }, stick);
        E('circle', { cx: 66, cy: -4, r: 6, fill: '#E2B33C', stroke: SC_INK, 'stroke-width': 2 }, stick);
        E('path', { d: 'M0,0 L22,0', stroke: '#1E2878', 'stroke-width': 9, 'stroke-linecap': 'round' }, armR);
        E('circle', { cx: 24, cy: 0, r: 12, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, armR);
        // the upper dot: the head
        E('circle', { cx: 0, cy: -46, r: 48, fill: ball('#5566E0', '#1E2878'), stroke: SC_INK, 'stroke-width': 5 }, g);
        E('ellipse', { cx: -18, cy: -66, rx: 12, ry: 7, fill: '#FFFFFF', opacity: 0.28 }, g);
        // officer's cap
        const cap = G(g); tr(cap, 0, -92);
        E('path', { d: 'M-44,4 Q-48,-34 0,-36 Q48,-34 44,4 Z', fill: '#7A7A3A', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, cap);
        E('rect', { x: -46, y: -6, width: 92, height: 14, rx: 4, fill: '#C62828', stroke: SC_INK, 'stroke-width': 3 }, cap);
        E('path', { d: 'M-48,8 Q0,24 48,8 L44,14 Q0,30 -44,14 Z', fill: '#2A2A1A', stroke: SC_INK, 'stroke-width': 3 }, cap);
        E('circle', { cx: 0, cy: -20, r: 11, fill: '#E2B33C', stroke: SC_INK, 'stroke-width': 2.5 }, cap);
        E('circle', { cx: 0, cy: -24, r: 2.6, fill: SC_INK }, cap); E('circle', { cx: 0, cy: -16, r: 2.6, fill: SC_INK }, cap);   // ":" badge
        // the saluting arm, in front of everything: from the right shoulder round the head to the cap brim
        sal = G(g);
        E('path', { d: 'M44,48 Q104,10 66,-78', fill: 'none', stroke: '#1E2878', 'stroke-width': 9, 'stroke-linecap': 'round' }, sal);
        E('path', { d: 'M52,-92 L80,-70 L72,-62 L46,-82 Z', fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, sal);
      },
      face: { x: 0, y: -52, eye: 13, gap: 40, mouthW: 26, mouthY: 36, lidCol: '#3A49B8' },
      upd: (t, g, st) => {
        const s = clamp(st.salute || 0), p = clamp(st.point || 0);
        // salute: the arm swings up to the cap brim; point: the stick swings out to the right
        tr(armR, 44, 52, 1, lerp(30, -20, p));
        op(armR, s > 0.5 ? 0 : 1); op(sal, s > 0.5 ? 1 : 0);
      } }));
    const inner = c.firstChild, mo = G(inner); tr(mo, 0, -42);   // handlebar moustache, over the mouth corners
    E('path', { d: 'M0,-4 C-12,-10 -30,-8 -38,2 C-44,8 -50,4 -50,-4 C-46,4 -40,10 -30,8 C-18,6 -8,4 0,2 C8,4 18,6 30,8 C40,10 46,4 50,-4 C50,4 44,8 38,2 C30,-8 12,-10 0,-4 Z', fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, mo);
  } else if (kind === 'chop') {
    let arms = [];
    c = scMake(parent, Object.assign(S, { seed: 9, bob: 6, mood: o.mood || 'happy',
      draw: g => {
        [-1, 1].forEach(sd => { const a = E('path', { d: '', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g); arms.push({ a, sd }); });
        // wooden handle, out to the right
        E('rect', { x: 84, y: -66, width: 92, height: 36, rx: 16, fill: linGrad('#B07A45', '#6B4423', true), stroke: SC_INK, 'stroke-width': 5 }, g);
        [112, 146].forEach(x => E('circle', { cx: x, cy: -48, r: 5, fill: '#E6EBEF', stroke: SC_INK, 'stroke-width': 2 }, g));
        // the blade
        E('path', { d: 'M-100,-92 L92,-92 L92,92 Q-10,102 -100,92 Z', fill: linGrad('#F2F6FA', '#A9B6C2', true), stroke: SC_INK, 'stroke-width': 6, 'stroke-linejoin': 'round' }, g);
        E('path', { d: 'M-96,82 Q-10,92 88,82', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 5, opacity: 0.9 }, g);   // sharp edge
        E('circle', { cx: -72, cy: -66, r: 12, fill: '#2A3B44', stroke: SC_INK, 'stroke-width': 3 }, g);   // hanging hole
        E('path', { d: 'M60,-82 L84,-82', stroke: '#FFFFFF', 'stroke-width': 4, opacity: 0.7 }, g);
        T(g, 0, 70, '÷ HCF', { size: 26, weight: 800, anchor: 'middle', fill: '#6E7D8A' });
        E('ellipse', { cx: -54, cy: 22, rx: 11, ry: 7, fill: '#FF8FB0', opacity: 0.5 }, g);
        E('ellipse', { cx: 52, cy: 22, rx: 11, ry: 7, fill: '#FF8FB0', opacity: 0.5 }, g);
      },
      face: { x: 0, y: -14, eye: 18, gap: 54, mouthW: 40, mouthY: 30, lidCol: '#C9D3DC' },
      upd: (t, g, st) => {
        const k = st.arms === undefined ? 0.5 : st.arms;
        arms.forEach(({ a, sd }, i) => {
          const w = Math.sin(t * TAU * 2.4 + i * 1.9) * 22 * k;
          a.setAttribute('d', `M${sd * 96},40 Q${sd * 128},${30 - 10 * k} ${sd * 132},${(10 - 36 * k + w).toFixed(1)}`);
        });
      } }));
  } else if (kind === 'barry') {
    let boxes = [];
    c = scMake(parent, Object.assign(S, { seed: 13, bob: 2, mood: o.mood || 'neutral',
      draw: g => {
        // legs and sneakers
        [-50, 50].forEach(x => {
          E('path', { d: `M${x},52 L${x},96`, stroke: SC_INK, 'stroke-width': 8, 'stroke-linecap': 'round' }, g);
          E('path', { d: `M${x - 12},104 Q${x - 12},92 ${x + 4},92 L${x + 20},94 Q${x + 26},104 ${x + 18},106 Z`, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
        });
        // arms
        E('path', { d: 'M-150,0 Q-176,24 -168,52', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
        E('path', { d: 'M150,0 Q176,24 168,52', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
        E('circle', { cx: -168, cy: 56, r: 10, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
        E('circle', { cx: 168, cy: 56, r: 10, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
        // five equal boxes
        for (let i = 0; i < 5; i++) {
          const b = E('rect', { x: -150 + i * 60, y: -52, width: 60, height: 104, fill: i % 2 ? '#7FC4F5' : '#A8D8FA', stroke: SC_INK, 'stroke-width': 4 }, g);
          boxes.push({ b, base: i % 2 ? '#7FC4F5' : '#A8D8FA' });
        }
        E('rect', { x: -150, y: -52, width: 300, height: 104, rx: 6, fill: 'none', stroke: SC_INK, 'stroke-width': 6 }, g);
        // flat cap
        const cap = G(g); tr(cap, -10, -52);
        E('path', { d: 'M-50,0 Q-46,-30 0,-32 Q46,-30 50,0 Z', fill: '#2E4A7D', stroke: SC_INK, 'stroke-width': 4 }, cap);
        E('path', { d: 'M30,-2 Q70,-6 78,4 Q60,8 30,4 Z', fill: '#1E3560', stroke: SC_INK, 'stroke-width': 3 }, cap);
      },
      face: { x: -10, y: -6, eye: 15, gap: 60, mouthW: 34, mouthY: 28, lidCol: '#7FC4F5' },
      upd: (t, g, st) => {
        const k = st.lit || 0;
        boxes.forEach(({ b, base }, i) => attr(b, 'fill', i < Math.floor(k) || (i < k && k - i > 0.5) ? '#FFE45C' : base));
      } }));
  } else if (kind === 'uni') {
    let sp = null;
    c = scMake(parent, Object.assign(S, { seed: 17, bob: 5, mood: o.mood || 'happy',
      draw: g => {
        // rainbow mane behind the head
        ['#FF6B8A', '#FFB347', '#FFE45C', '#7EE08A', '#6EC8FF', '#B48CFF'].forEach((col, i) => {
          E('path', { d: `M${-58 + i * 4},${-70 + i * 8} Q${-110 - i * 6},${-10 + i * 6} ${-84 - i * 2},${90 + i * 4}`, fill: 'none', stroke: col, 'stroke-width': 16, 'stroke-linecap': 'round' }, g);
        });
        // neck and chest
        E('path', { d: 'M-70,40 Q-80,110 -90,130 L90,130 Q80,110 66,40 Z', fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, g);
        const bd = G(g); tr(bd, 40, 100);
        E('circle', { r: 20, fill: '#FFE45C', stroke: SC_INK, 'stroke-width': 3 }, bd);
        T(bd, 0, 10, '1', { size: 28, weight: 800, anchor: 'middle', fill: '#8A6508' });
        // ears
        [-1, 1].forEach(sd => E('path', { d: `M${sd * 34},-78 L${sd * 52},-122 L${sd * 64},-70 Z`, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g));
        [-1, 1].forEach(sd => E('path', { d: `M${sd * 42},-80 L${sd * 52},-108 L${sd * 58},-76 Z`, fill: '#FFC2D6' }, g));
        // the horn: a golden numeral 1
        const horn = G(g); tr(horn, 0, -104, 1, 0);
        E('path', { d: 'M-6,-56 L8,-60 L8,4 L18,4 L18,14 L-16,14 L-16,4 L-4,4 L-4,-40 L-16,-34 L-18,-44 Z', fill: linGrad('#FFE45C', '#E2A21C', false), stroke: SC_INK, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, horn);
        // head
        E('path', { d: 'M-70,-40 Q-74,-96 0,-98 Q74,-96 70,-40 L62,30 Q56,74 0,76 Q-56,74 -62,30 Z', fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, g);
        E('ellipse', { cx: 0, cy: 46, rx: 48, ry: 30, fill: '#FFD9E6', stroke: SC_INK, 'stroke-width': 3 }, g);   // muzzle
        E('ellipse', { cx: -16, cy: 40, rx: 5, ry: 7, fill: '#C2577A' }, g); E('ellipse', { cx: 16, cy: 40, rx: 5, ry: 7, fill: '#C2577A' }, g);
        // forelock
        E('path', { d: 'M-30,-92 Q-6,-60 20,-90 Q6,-70 -30,-92 Z', fill: '#B48CFF', stroke: SC_INK, 'stroke-width': 2.5 }, g);
        E('ellipse', { cx: -48, cy: 14, rx: 12, ry: 7, fill: '#FF8FB0', opacity: 0.5 }, g);
        E('ellipse', { cx: 48, cy: 14, rx: 12, ry: 7, fill: '#FF8FB0', opacity: 0.5 }, g);
        sp = spark(g, 12); tr(sp, 34, -150);
      },
      face: { x: 0, y: -22, eye: 19, gap: 60, mouthW: 30, mouthY: 82, lidCol: '#F2E8F2', iris: '#5A2A7A' },
      upd: (t, g, st) => { sp.upd(t); op(sp, st.sparkle === undefined ? 1 : st.sparkle); } }));
  } else if (kind === 'monty') {
    c = scMake(parent, Object.assign(S, { seed: 21, bob: 2, mood: o.mood || 'smug',
      draw: g => {
        // four folded panels
        const cols = ['#F7F1DC', '#E9E1C6', '#F7F1DC', '#E9E1C6'];
        for (let i = 0; i < 4; i++) {
          const x0 = -116 + i * 58, sk = i % 2 ? -5 : 5;
          E('path', { d: `M${x0},${-96 + sk} L${x0 + 58},${-96 - sk} L${x0 + 58},${96 - sk} L${x0},${96 + sk} Z`, fill: cols[i], stroke: SC_INK, 'stroke-width': 3 }, g);
        }
        E('path', { d: 'M-104,-60 Q-70,-84 -30,-70 Q-10,-40 -50,-24 Q-90,-20 -104,-40 Z M40,-80 Q90,-90 104,-60 Q100,-20 70,-30 Q40,-40 40,-80 Z M-100,40 Q-60,30 -40,60 Q-60,86 -100,80 Z', fill: '#B9E3A0', opacity: 0.9 }, g);
        E('path', { d: 'M-116,10 Q-60,-6 -10,24 Q40,50 116,30', fill: 'none', stroke: '#6EC8FF', 'stroke-width': 10 }, g);   // river
        E('path', { d: 'M-90,70 Q-20,60 20,74 Q70,90 96,-50', fill: 'none', stroke: '#E8424F', 'stroke-width': 5, 'stroke-dasharray': '10 8' }, g);   // route
        E('path', { d: 'M88,-60 L104,-44 M104,-60 L88,-44', stroke: '#E8424F', 'stroke-width': 5, 'stroke-linecap': 'round' }, g);
        // scale strip
        E('rect', { x: -82, y: 104, width: 164, height: 34, rx: 6, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
        T(g, 0, 129, '1 : 50 000', { size: 24, weight: 800, anchor: 'middle', fill: SC_INK });
        // bow tie
        const bt = G(g); tr(bt, 0, 92);
        E('path', { d: 'M0,0 L-30,-16 L-30,16 Z M0,0 L30,-16 L30,16 Z', fill: '#C62828', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, bt);
        E('circle', { r: 7, fill: '#8E1B1B', stroke: SC_INK, 'stroke-width': 2.5 }, bt);
      },
      face: { x: 0, y: -12, eye: 17, gap: 56, mouthW: 38, mouthY: 40, lidCol: '#E2D9B8' } }));
    const inner = c.firstChild, mono = G(inner); tr(mono, 28, -12);   // monocle over his left eye (viewer's right)
    E('circle', { r: 26, fill: 'rgba(255,255,255,0.16)', stroke: '#E2B33C', 'stroke-width': 5 }, mono);
    E('path', { d: 'M18,20 Q30,60 14,92', fill: 'none', stroke: '#E2B33C', 'stroke-width': 2.5 }, mono);
  } else if (kind === 'ivy') {
    let gaps = [];
    c = scMake(parent, Object.assign(S, { seed: 25, bob: 3, mood: o.mood || 'smug',
      draw: g => {
        // the axes (she never touches them)
        E('path', { d: 'M-118,-120 L-118,104 L132,104', fill: 'none', stroke: '#9AA6B2', 'stroke-width': 7, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
        E('path', { d: 'M-128,-106 L-118,-124 L-108,-106 M118,94 L136,104 L118,114', fill: 'none', stroke: '#9AA6B2', 'stroke-width': 6, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
        // the curve body: y = k/x
        let d = '';
        for (let i = 0; i <= 24; i++) { const x = 0.75 + i * (4.45 / 24), y = 3.2 / x; d += (i ? ' L' : 'M') + (-118 + x * 46).toFixed(1) + ',' + (104 - y * 36).toFixed(1); }
        E('path', { d, fill: 'none', stroke: SC_INK, 'stroke-width': 34, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
        E('path', { d, fill: 'none', stroke: '#9C6BFF', 'stroke-width': 26, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
        // "no touching" gap marks
        [[-118, -88, 0], [121, 104, -90]].forEach(([x, y, r]) => { const m = G(g); tr(m, x, y, 1, r); E('path', { d: 'M5,-7 L12,-7 M5,7 L12,7', stroke: '#FFE45C', 'stroke-width': 4, 'stroke-linecap': 'round' }, m); gaps.push(m); });
        // head on the top end of the curve
        E('circle', { cx: -58, cy: -88, r: 42, fill: ball('#B48CFF', '#6A3CD8'), stroke: SC_INK, 'stroke-width': 5 }, g);
        const bow = G(g); tr(bow, -26, -124, 1, 20);
        E('path', { d: 'M0,0 L-22,-12 L-22,12 Z M0,0 L22,-12 L22,12 Z', fill: '#FFC2E8', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, bow);
        E('circle', { r: 6, fill: '#FF8FC8', stroke: SC_INK, 'stroke-width': 2 }, bow);
      },
      face: { x: -58, y: -92, eye: 12, gap: 34, mouthW: 22, mouthY: 22, lidCol: '#9C6BFF' },
      upd: (t, g, st) => { const k = st.gap === undefined ? 0.6 : st.gap; gaps.forEach((m, i) => op(m, k * (0.55 + 0.45 * Math.sin(t * 5 + i)))); } }));
  } else {
    c = scKavya(parent, o);
  }
  return c;
}

/* ---------- sets ---------- */
function rpFan(parent, s) {
  const g = G(parent); tr(g, 0, 0, s || 1);
  E('line', { x1: 0, y1: -60, x2: 0, y2: 0, stroke: '#5A6670', 'stroke-width': 6 }, g);
  const bl = G(g);
  for (let i = 0; i < 3; i++) { const b = G(bl); tr(b, 0, 0, 1, i * 120); E('path', { d: 'M0,-6 Q60,-16 92,-4 Q60,10 0,6 Z', fill: '#C9D3DC', stroke: '#5A6670', 'stroke-width': 2.5 }, b); }
  E('circle', { r: 12, fill: '#8F9CAB', stroke: '#5A6670', 'stroke-width': 3 }, g);
  g.upd = t => { const a = (t * 400) % 360; bl.setAttribute('transform', `scale(1 0.32) rotate(${a.toFixed(1)})`); };
  g.upd(0);
  return g;
}

function rpHawker(parent) {
  const g = G(parent);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#FFD9A8', '#FFF1D6', true) }, g);   // 7 a.m. sky
  E('circle', { cx: 1040, cy: 120, r: 70, fill: glow('#FFE45C'), opacity: 0.8 }, g);
  // Block 208 behind
  const blk = G(g);
  E('rect', { x: 140, y: 30, width: 520, height: 260, fill: '#E9DCC4', stroke: '#9C8A6A', 'stroke-width': 4 }, blk);
  let win = '';
  for (let r = 0; r < 5; r++) for (let k = 0; k < 8; k++) win += `M${162 + k * 62},${46 + r * 44} h40 v24 h-40 Z `;
  E('path', { d: win, fill: '#9CC2DC' }, blk);
  E('rect', { x: 560, y: 120, width: 84, height: 44, rx: 6, fill: '#2E7DD8' }, blk);
  T(blk, 602, 152, '208', { size: 30, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  E('rect', { x: 720, y: 90, width: 300, height: 200, fill: '#D9CDB4', stroke: '#9C8A6A', 'stroke-width': 4 }, blk);
  win = '';
  for (let r = 0; r < 4; r++) for (let k = 0; k < 5; k++) win += `M${740 + k * 56},${106 + r * 44} h36 v24 h-36 Z `;
  E('path', { d: win, fill: '#9CC2DC' }, blk);
  // roof of the hawker centre
  E('path', { d: 'M0,250 L600,200 L1200,250 L1200,290 L0,290 Z', fill: '#8E3B2E', stroke: '#5A2018', 'stroke-width': 5 }, g);
  E('rect', { x: 0, y: 290, width: 1200, height: 460, fill: '#F3EDE0' }, g);
  E('rect', { x: 0, y: 290, width: 1200, height: 40, fill: '#D9CFBC' }, g);
  // fans
  const fans = [200, 600, 1000].map(x => { const f = rpFan(g, 0.8); tr(f, x, 360); return f; });
  // a row of stall fronts
  const names = [['THOSAI', '#2E7DD8'], ['VEG BEE HOON', '#2FA36B'], ["ROSE'S KITCHEN", '#C62828'], ['DRINKS', '#8E44AD']];
  names.forEach(([n, col], i) => {
    const x = 30 + i * 290, w = 270, y = 400;
    E('rect', { x, y, width: w, height: 200, fill: '#FFFDF6', stroke: '#9C8A6A', 'stroke-width': 4 }, g);
    E('rect', { x, y, width: w, height: 48, fill: col }, g);
    T(g, x + w / 2, y + 34, n, { size: i === 2 ? 28 : 26, weight: 800, anchor: 'middle', fill: i === 2 ? '#FFE45C' : '#FFFFFF' });
    E('rect', { x: x + 10, y: y + 150, width: w - 20, height: 50, fill: '#B9C4CE', stroke: '#7D8A96', 'stroke-width': 3 }, g);   // counter
    E('rect', { x: x + 24, y: y + 64, width: w - 48, height: 70, rx: 6, fill: '#F7E9D0', stroke: '#C9B48A', 'stroke-width': 2 }, g);
  });
  g.rose = [30 + 2 * 290 + 135, 500]; g.sign = [30 + 2 * 290 + 135, 424];
  // tables and stools
  for (let i = 0; i < 4; i++) {
    const x = 150 + i * 300;
    E('ellipse', { cx: x, cy: 660, rx: 90, ry: 22, fill: '#E8E2D2', stroke: '#9C927C', 'stroke-width': 4 }, g);
    E('rect', { x: x - 8, y: 670, width: 16, height: 70, fill: '#9C927C' }, g);
    [-120, 120].forEach(dx => { E('ellipse', { cx: x + dx, cy: 700, rx: 30, ry: 10, fill: '#E06A4E', stroke: '#9C3A2A', 'stroke-width': 3 }, g); E('rect', { x: x + dx - 5, y: 706, width: 10, height: 44, fill: '#9C3A2A' }, g); });
  }
  g.upd = t => fans.forEach(f => f.upd(t));
  return g;
}

function rpStall(parent) {
  const g = G(parent), back = G(g);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#2A3640', '#3E4C58', true) }, back);   // hawker centre ceiling and beyond
  // tiled back wall inside the stall
  E('rect', { x: 120, y: 176, width: 960, height: 360, fill: '#EAF4EE' }, back);
  let tiles = '';
  for (let x = 120; x <= 1080; x += 48) tiles += `M${x},176 L${x},536 `;
  for (let y = 176; y <= 536; y += 48) tiles += `M120,${y} L1080,${y} `;
  E('path', { d: tiles, stroke: '#C9DCD2', 'stroke-width': 2 }, back);
  // posts and the sign band
  E('rect', { x: 100, y: 96, width: 24, height: 600, fill: '#8F9CAB', stroke: '#5A6670', 'stroke-width': 3 }, back);
  E('rect', { x: 1076, y: 96, width: 24, height: 600, fill: '#8F9CAB', stroke: '#5A6670', 'stroke-width': 3 }, back);
  E('rect', { x: 100, y: 104, width: 1000, height: 74, fill: linGrad('#D63A3A', '#A61E1E', true), stroke: '#5A1010', 'stroke-width': 4 }, back);
  const sg = T(back, 600, 152, "ROSE'S KITCHEN", { size: 50, weight: 800, anchor: 'middle', fill: '#FFE45C', ls: 3 });
  sg.setAttribute('stroke', '#5A1010'); sg.setAttribute('stroke-width', 6); sg.setAttribute('paint-order', 'stroke');
  T(back, 1060, 168, 'Blk 208', { size: 26, weight: 700, anchor: 'end', fill: '#FFFFFF', font: FB });
  // a rose doodle on the sign
  const rd = G(back); tr(rd, 240, 140);
  E('circle', { r: 20, fill: '#FF6B8A', stroke: '#8E1B3A', 'stroke-width': 3 }, rd);
  E('path', { d: 'M-8,-4 Q0,-14 8,-4 Q0,6 -8,-4 M-12,4 Q0,16 12,4', fill: 'none', stroke: '#8E1B3A', 'stroke-width': 2.5 }, rd);
  // menu board
  const menu = mkHawkerMenu(back, { title: 'DRINKS', sub: "Rose's Kitchen", w: 380, size: 26, col: '#2E7D4F',
    items: [['Bandung', '$1.80'], ['Lime juice', '$1.60'], ['Mango lassi', '3 for $10.50'], ['Kopi / teh', '$1.40']] });
  tr(menu, 860, 196);
  g.menu = menu;
  // shelf with two drink dispensers
  E('rect', { x: 150, y: 420, width: 400, height: 16, fill: '#9C6B3E', stroke: '#6B4423', 'stroke-width': 3 }, back);
  const jars = [[250, RP_DRINK.bandung, 'BANDUNG'], [440, RP_DRINK.lime, 'LIME']].map(([x, col, lab]) => {
    const j = G(back); tr(j, x, 420);
    E('rect', { x: -60, y: -190, width: 120, height: 170, rx: 18, fill: 'rgba(255,255,255,0.35)', stroke: '#5A6670', 'stroke-width': 4 }, j);
    E('rect', { x: -54, y: -150, width: 108, height: 124, rx: 12, fill: col }, j);
    E('rect', { x: -64, y: -204, width: 128, height: 20, rx: 8, fill: '#E6EBEF', stroke: '#5A6670', 'stroke-width': 3 }, j);
    E('rect', { x: -8, y: -20, width: 16, height: 18, fill: '#5A6670' }, j);
    const lb = G(j); tr(lb, 0, -90);
    E('rect', { x: -52, y: -18, width: 104, height: 34, rx: 6, fill: '#FFFFFF', stroke: '#5A6670', 'stroke-width': 2 }, lb);
    T(lb, 0, 8, lab, { size: 20, weight: 800, anchor: 'middle', fill: '#5A1010' });
    const bub = [0, 1, 2].map(i => E('circle', { cx: -30 + i * 30, cy: -40, r: 5, fill: '#FFFFFF', opacity: 0.6 }, j));
    return { j, bub };
  });
  const fan = rpFan(back, 0.7); tr(fan, 590, 236);
  // characters go here
  g.mid = G(g);
  // the counter
  const front = G(g);
  E('rect', { x: 90, y: 520, width: 1020, height: 26, rx: 6, fill: '#DCE3E8', stroke: '#7D8A96', 'stroke-width': 4 }, front);
  E('rect', { x: 110, y: 546, width: 980, height: 204, fill: linGrad('#B9C4CE', '#8F9CAB', true), stroke: '#5A6670', 'stroke-width': 4 }, front);
  E('rect', { x: 110, y: 596, width: 980, height: 18, fill: '#E8679A' }, front);
  g.front = front;
  g.top = G(g);
  g.counterY = 530;
  g.upd = t => {
    fan.upd(t);
    jars.forEach(({ bub }, k) => bub.forEach((b, i) => { const f = (t * 0.5 + i * 0.33 + k * 0.2) % 1; attr(b, 'cy', -40 - f * 100); op(b, 0.6 * (1 - f)); }));
  };
  return g;
}

function rpMart(parent) {
  const g = G(parent);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#E3F1FA', '#C9E2F2', true) }, g);
  E('rect', { x: 60, y: 120, width: 1080, height: 600, rx: 10, fill: '#F7FBFE', stroke: '#8FB3CC', 'stroke-width': 5 }, g);   // chiller
  E('rect', { x: 760, y: 34, width: 380, height: 70, rx: 12, fill: '#2E7DD8' }, g);
  T(g, 950, 80, 'CHILLED: YOGHURT', { size: 32, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  g.shelves = [300, 470, 640];
  g.shelves.forEach(y => {
    E('rect', { x: 70, y, width: 1060, height: 14, fill: '#B9C4CE', stroke: '#7D8A96', 'stroke-width': 3 }, g);
    E('rect', { x: 70, y: y + 14, width: 1060, height: 22, fill: '#FFFFFF', stroke: '#C9D3DC', 'stroke-width': 2 }, g);   // price strip
  });
  // filler packs at the edges
  const r = rng(5), cols = ['#FFB347', '#7EE08A', '#6EC8FF', '#FF8FB0', '#B48CFF'];
  g.shelves.forEach(y => [90, 160, 1000, 1070].forEach((x, i) => {
    const h = 70 + r() * 40;
    E('rect', { x, y: y - h, width: 56, height: h, rx: 8, fill: cols[(i + Math.round(y)) % 5], stroke: '#5A6670', 'stroke-width': 2, opacity: 0.85 }, g);
  }));
  E('path', { d: 'M60,120 L1140,120', stroke: '#FFFFFF', 'stroke-width': 8, opacity: 0.8 }, g);
  return g;
}

function rpMelaka(parent, w, h) {
  const g = G(parent);
  E('rect', { x: -w / 2, y: -h / 2, width: w, height: h, fill: linGrad('#7FD3FF', '#D6F0FF', true) }, g);
  const sx = w / 600, sy = h / 400, inner = G(g); inner.setAttribute('transform', `scale(${sx.toFixed(3)} ${sy.toFixed(3)})`);
  // the red Stadthuys and its clock tower
  E('rect', { x: -300, y: 40, width: 600, height: 160, fill: '#B5835A' }, inner);   // square
  E('rect', { x: -260, y: -60, width: 300, height: 160, fill: '#B7322C', stroke: '#6E1B16', 'stroke-width': 4 }, inner);
  E('path', { d: 'M-270,-60 L-110,-110 L50,-60 Z', fill: '#8E2420', stroke: '#6E1B16', 'stroke-width': 4 }, inner);
  for (let k = 0; k < 5; k++) E('rect', { x: -240 + k * 56, y: -30, width: 26, height: 40, rx: 12, fill: '#F4E9D8' }, inner);
  E('rect', { x: 120, y: -150, width: 80, height: 250, fill: '#B7322C', stroke: '#6E1B16', 'stroke-width': 4 }, inner);
  E('path', { d: 'M110,-150 L160,-200 L210,-150 Z', fill: '#8E2420', stroke: '#6E1B16', 'stroke-width': 4 }, inner);
  E('circle', { cx: 160, cy: -110, r: 24, fill: '#FFFFFF', stroke: '#6E1B16', 'stroke-width': 3 }, inner);
  E('path', { d: 'M160,-110 L160,-126 M160,-110 L172,-104', stroke: SC_INK, 'stroke-width': 3, 'stroke-linecap': 'round' }, inner);
  // palm
  E('path', { d: 'M250,200 Q240,60 262,-20', fill: 'none', stroke: '#8B5A2B', 'stroke-width': 12 }, inner);
  [[-70, 10], [-20, -30], [30, -20], [70, 20], [0, 40]].forEach(([dx, dy]) => E('path', { d: `M262,-20 Q${262 + dx / 2},${-50 + dy / 2} ${262 + dx},${-10 + dy}`, fill: 'none', stroke: '#2FA36B', 'stroke-width': 10, 'stroke-linecap': 'round' }, inner));
  // trishaw with flowers
  const tw = G(inner); tr(tw, -150, 150);
  E('circle', { cx: -50, cy: 30, r: 30, fill: 'none', stroke: SC_INK, 'stroke-width': 5 }, tw);
  E('circle', { cx: 60, cy: 30, r: 30, fill: 'none', stroke: SC_INK, 'stroke-width': 5 }, tw);
  E('path', { d: 'M-80,0 L10,0 L10,-50 Q-30,-70 -80,-50 Z', fill: '#FF6B8A', stroke: SC_INK, 'stroke-width': 4 }, tw);
  [[-70, -60, '#FFE45C'], [-40, -70, '#FF8FC8'], [-10, -64, '#7EE08A'], [0, -44, '#FFE45C']].forEach(([x, y, col]) => E('circle', { cx: x, cy: y, r: 10, fill: col, stroke: SC_INK, 'stroke-width': 2 }, tw));
  E('path', { d: 'M10,0 L60,30 M10,-30 L70,-20', stroke: SC_INK, 'stroke-width': 5 }, tw);
  return g;
}

function rpRoseCall(parent, w, h, label) {
  const g = scVideoCall(parent, w, h, label || 'Auntie Rose · Melaka');
  g.bg = rpMelaka(g.screen, w, h);
  const holder = G(g.screen); tr(holder, w * 0.06, h * 0.2);
  g.rose = cast(holder, 'rose', { s: h / 250, prop: null });   // far too close to the camera
  return g;
}

/* ---------- props ---------- */
function rpRecipeCard(parent, o) {
  o = o || {};
  const w = o.w || 420, h = o.h || 280, s = o.size || 30, g = G(parent);
  E('rect', { x: -w / 2 + 6, y: -h / 2 + 8, width: w, height: h, rx: 10, fill: 'rgba(0,0,0,0.25)' }, g);
  E('rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: 10, fill: '#FFF8E8', stroke: '#B8A27A', 'stroke-width': 3 }, g);
  for (let y = -h / 2 + 96; y < h / 2 - 10; y += 44) E('line', { x1: -w / 2 + 16, y1: y, x2: w / 2 - 16, y2: y, stroke: '#A8C8E8', 'stroke-width': 2 }, g);
  E('line', { x1: -w / 2 + 16, y1: -h / 2 + 62, x2: w / 2 - 16, y2: -h / 2 + 62, stroke: '#E8424F', 'stroke-width': 3 }, g);
  T(g, -w / 2 + 24, -h / 2 + 48, o.title || 'BANDUNG', { size: s * 1.15, weight: 800, fill: '#B8336A' });
  const rd = G(g); tr(rd, w / 2 - 40, -h / 2 + 36);
  E('circle', { r: 16, fill: '#FF6B8A', stroke: '#8E1B3A', 'stroke-width': 2.5 }, rd);
  E('path', { d: 'M-6,-3 Q0,-11 6,-3 Q0,5 -6,-3', fill: 'none', stroke: '#8E1B3A', 'stroke-width': 2 }, rd);
  g.rows = (o.lines || ['rose syrup : milk', '{{1 : 4}}']).map((ln, i) => mkText(g, -w / 2 + 28, -h / 2 + 88 + 44 * i, ln, { size: s, fill: MK.ink, weight: 700 }));
  g.W = w; g.H = h;
  return g;
}

function rpJug(parent, o) {
  o = o || {};
  const g = G(parent), inner = G(g); tr(inner, 0, 0, o.s || 1);
  const body = 'M-56,-170 L56,-170 L64,-12 Q64,0 50,0 L-50,0 Q-64,0 -64,-12 Z';
  const clip = _clipUrl(body);
  const liq = E('rect', { x: -70, y: -170, width: 140, height: 170, fill: o.col || RP_DRINK.bandung, 'clip-path': clip }, inner);
  E('path', { d: body, fill: 'rgba(255,255,255,0.22)', stroke: '#5A6670', 'stroke-width': 5, 'stroke-linejoin': 'round' }, inner);
  E('path', { d: 'M56,-150 Q104,-140 100,-90 Q96,-50 62,-48', fill: 'none', stroke: '#5A6670', 'stroke-width': 10, 'stroke-linecap': 'round' }, inner);   // handle
  E('path', { d: 'M-56,-170 L-74,-186 L-50,-178', fill: 'rgba(255,255,255,0.4)', stroke: '#5A6670', 'stroke-width': 4, 'stroke-linejoin': 'round' }, inner);   // spout
  E('path', { d: 'M-40,-150 L-36,-20', stroke: '#FFFFFF', 'stroke-width': 6, opacity: 0.6, 'stroke-linecap': 'round' }, inner);
  g.set = (level, col) => { const L = clamp(level === undefined ? 0.8 : level); attr(liq, 'y', -170 * L); attr(liq, 'height', 170 * L + 2); if (col) liq.setAttribute('fill', col); };
  g.set(0.8);
  return g;
}

function rpCup(parent, o) {
  o = o || {};
  const g = G(parent), inner = G(g); tr(inner, 0, 0, o.s || 1);
  const body = 'M-44,-130 L44,-130 L34,0 L-34,0 Z', clip = _clipUrl(body);
  const liq = E('rect', { x: -50, y: -130, width: 100, height: 130, fill: o.col || RP_DRINK.bandung, 'clip-path': clip }, inner);
  E('path', { d: body, fill: 'rgba(255,255,255,0.25)', stroke: '#5A6670', 'stroke-width': 4, 'stroke-linejoin': 'round' }, inner);
  E('path', { d: 'M8,-128 L22,-186', stroke: '#FF5FA2', 'stroke-width': 9, 'stroke-linecap': 'round' }, inner);   // straw
  E('rect', { x: -50, y: -138, width: 100, height: 12, rx: 5, fill: 'rgba(255,255,255,0.7)', stroke: '#5A6670', 'stroke-width': 3 }, inner);   // lid
  if (o.label) { const lb = G(inner); tr(lb, 0, -56); E('rect', { x: -34, y: -16, width: 68, height: 30, rx: 6, fill: '#FFFFFF', stroke: '#5A6670', 'stroke-width': 2 }, lb); T(lb, 0, 7, o.label, { size: 20, weight: 800, anchor: 'middle', fill: '#5A1010' }); }
  g.set = (level, col) => { const L = clamp(level === undefined ? 0.85 : level); attr(liq, 'y', -130 * L); attr(liq, 'height', 130 * L + 2); if (col) liq.setAttribute('fill', col); };
  g.set(0.85);
  return g;
}

function rpTipsJar(parent, o) {
  o = o || {};
  const g = G(parent), inner = G(g); tr(inner, 0, 0, o.s || 1);
  const notes = [], r = rng(11), cols = ['#B48CFF', '#7EE08A', '#FF8A8A', '#B48CFF', '#7EE08A', '#6EC8FF', '#FF8A8A', '#7EE08A'];
  for (let i = 0; i < 8; i++) {
    const n = G(inner); tr(n, -30 + r() * 60, -18 - i * 15, 1, -30 + r() * 60);
    E('rect', { x: -26, y: -9, width: 52, height: 18, rx: 3, fill: cols[i], stroke: SC_INK, 'stroke-width': 2 }, n);
    notes.push(n);
  }
  E('path', { d: 'M-60,-150 L60,-150 L66,-14 Q66,0 52,0 L-52,0 Q-66,0 -66,-14 Z', fill: 'rgba(220,240,255,0.35)', stroke: '#5A6670', 'stroke-width': 5, 'stroke-linejoin': 'round' }, inner);
  E('rect', { x: -66, y: -168, width: 132, height: 20, rx: 6, fill: '#C9D3DC', stroke: '#5A6670', 'stroke-width': 3 }, inner);
  E('rect', { x: -46, y: -112, width: 92, height: 38, rx: 6, fill: '#FFFFFF', stroke: '#5A6670', 'stroke-width': 3 }, inner);
  T(inner, 0, -84, 'TIPS', { size: 28, weight: 800, anchor: 'middle', fill: '#C62828' });
  E('path', { d: 'M-44,-136 L-40,-24', stroke: '#FFFFFF', 'stroke-width': 6, opacity: 0.5, 'stroke-linecap': 'round' }, inner);
  g.set = k => notes.forEach((n, i) => op(n, clamp(k - i)));
  g.set(8);
  return g;
}

function rpYoghurt(parent, size, o) {
  o = o || {};
  const D = { S: [60, 70, '150 g'], M: [96, 110, '500 g'], L: [130, 150, '1 kg'] }[size] || [96, 110, '500 g'];
  const [w, h, lab] = D, g = G(parent);
  E('path', { d: `M${-w / 2},${-h} L${w / 2},${-h} L${w / 2 - 8},0 L${-w / 2 + 8},0 Z`, fill: '#FFFFFF', stroke: '#5A6670', 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
  E('rect', { x: -w / 2 - 4, y: -h - 12, width: w + 8, height: 14, rx: 5, fill: '#2E7DD8', stroke: '#5A6670', 'stroke-width': 3 }, g);
  E('path', { d: `M${-w / 2 + 4},${-h * 0.62} L${w / 2 - 4},${-h * 0.62} L${w / 2 - 7},${-h * 0.22} L${-w / 2 + 7},${-h * 0.22} Z`, fill: '#FFC94A' }, g);
  T(g, 0, -h * 0.34, lab, { size: size === 'S' ? 20 : 26, weight: 800, anchor: 'middle', fill: SC_INK });
  T(g, 0, -h * 0.74, 'YOGHURT', { size: size === 'S' ? 12 : size === 'M' ? 16 : 20, weight: 800, anchor: 'middle', fill: '#2E7DD8' });
  g.tag = null;
  if (o.price) { g.tag = mkPriceTag(g, o.price, { size: 32 }); tr(g.tag, w / 2 - 6, -h + 6); }
  return g;
}

function rpMango(parent, s) {
  const g = G(parent); tr(g, 0, 0, s || 1);
  E('path', { d: 'M-34,-6 C-36,-34 -6,-40 16,-30 C40,-18 42,16 22,30 C2,42 -30,30 -34,-6 Z', fill: ball('#FFC94A', '#E8751A'), stroke: SC_INK, 'stroke-width': 3.5 }, g);
  E('path', { d: 'M10,-32 Q16,-46 26,-48 Q18,-36 10,-32', fill: '#2FA36B', stroke: SC_INK, 'stroke-width': 2 }, g);
  E('ellipse', { cx: -12, cy: -14, rx: 9, ry: 5, fill: '#FFFFFF', opacity: 0.35 }, g);
  return g;
}

function rpStamp(parent, ok) { return mkStamp(parent, ok ? 'IN PROPORTION' : 'OUT OF PROPORTION', ok ? '#1E9E5A' : '#D32F2F'); }
