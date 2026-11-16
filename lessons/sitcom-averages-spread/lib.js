/* PERFECTLY AVERAGE (Claude Sitcom Ep 19, Averages, Range & Comparing Data): the cast, sets and props of this
   episode. Bundled after engine lib.js, kit.js, mathkit.js and sitcom.js (scMake, scTalk, scKavya, scCastHuman,
   scConfessional, scLowerThird, scVideoCall, mk* maths kit). Every top-level name starts with `as`, except `cast`.

   Characters: cast(parent, kind, o) -> g, origin at the character's centre, about 200-260 px tall at s = 1
     o: { s (scale), mood (default mood), ... }   (humans: any scHuman option overrides, e.g. prop, lift)
     g.set({ t, talk, mood, look, sweat, still, ... })   call every frame
       talk 0..1 (use scTalk(S, t, who)); mood: neutral | happy | smug | annoyed | sad | shock | deadpan
       look -1..1 pupils left/right; still: true stops the idle bob
     HUMANS (busts, bottom of the shirt at y = 140, so put them behind the contestants' desk or the frame edge):
       'kavya'  (kavya)  Kavya, 12 (scKavya, PE shirt "8")
       'mum'    (mum)    Mum: magenta kurta, bun, bindi. No prop by default (pass prop: 'paper' etc.)
       'dad'    (dad)    Dad: glasses, moustache, green polo. No prop by default ('phone' for the phone round)
       'boy'    (boy)    Ah Boy, 8: orange star tee. Default: an empty hand (lift: 1 raises it)
       'priya'  (priya)  Priya, 12: school uniform, bob, yellow clip; a gold CAPTAIN armband ribbon. Default prop: a pencil
       'tan'    (tan)    Mr Tan, maths teacher, Team Tan (a family of one): shirt and tie, glasses. No prop by default
                         (his cat Pythagoras is a separate prop: asCarrier)
       'rose'   (rose)   Auntie Rose: curly perm, floral blouse, ROSE'S apron. Default prop: a phone
       'benny'  (benny)  BENNY LIM, the game-show host: slicked side parting, a sequinned purple jacket over a white
                         shirt and a gold tie, a silver microphone in his raised hand (lift: 1 brings it to his mouth).
                         Extra: { ting: 0..1 } the sparkle on his teeth (a gold star by his mouth; use it on his big
                         announcements). g.mic is the microphone group.
       Pass { prop: null } for no prop; { body: true } for a full body (scHumanBody, feet at 0,0; pose API).
     CARTOONS (scMake):
       'mean'   (mean)   MEAN, a yellow SPIRIT LEVEL (a builder's level), 320 x 120: the green bubble vial on top, his face
                         in the middle, ruler ticks along the bottom edge, a navy bow tie, little legs and arms.
                         Fair-minded, grumpy, NOT mean. Default deadpan.
                         Extra: { tilt: degrees } slides the bubble to the higher end. To tilt him, ALSO rotate the
                         whole cast with tr(g, x, y, s, angle) (positive = clockwise = right end down): the outlier
                         gag is Otto dragging him over. { arms: 0..1 } 0 arms down, 1 arms out (sharing out).
       'medi'   (medi)   MEDI, the MEDIAN: a Singapore road median strip (a kerb block with black-and-white kerb stripes,
                         grass and a bougainvillea bush on top for hair), a hi-vis orange sash, white traffic gloves.
                         Bossy marshal. Default neutral. Extra: { whistle: 0..1 } brings her whistle to her mouth
                         (with motion lines); { point: 0..1 } her right glove points out to the right.
       'mo'     (mo)     MO, the MODE: a pink smartphone influencer (face on the screen, a heart counter bubble, round
                         sunglasses pushed up on top, a gold "#1" sticker). Default happy.
                         Extra: { hearts: 0..1 } little hearts float up beside her; { likes: 'text' } the counter text
                         (default '♥ 3').
       'ranger' (ranger) RANGER, the RANGE: a yellow-and-black tape measure (round case, his face on it) in a park
                         ranger's hat; the tape comes out of his right side as an arm with ticks and a metal hook.
                         Laconic. Default neutral. Extra: { reach: px } tape length out of the case (default 60,
                         try 40-420). The tape's hook is at (114 + reach, 40) in his own coordinates.
       'otto'   (otto)   OTTO the OUTLIER: a huge, cheerful purple data point (r 120, so twice everyone's size at the same
                         s), a tiny party hat, a crosshair ring around him like a plotted point, small waving arms.
                         Default happy. Extra: { wave: 0..1 } waves both arms.
       'sigma'  (sigma)  SIGMA, the Greek capital letter Σ ("add them all up"): a round head with a gold laurel wreath on a
                         thick navy-and-gold Σ body. Dramatic, theatrical. Default smug. Origin = the middle of the
                         whole figure (head centre at y -150). Extra: { arms: 0..1 } flings his arms up.

   Shots
     asConf(parent, who)             confessional background tinted for that character (scConfessional); g.set(p, t)
     AS_TINT                         the confessional colours per character
     asLowerThird(parent, who)       scLowerThird with this episode's name and role for `who` (AS_LT); g.set(p)

   Sets (full stage 1200 x 750; each returns g)
     asStudio(parent)     Studio 5, the game-show set: deep purple back wall with light strips and two spotlight cones,
                          the neon show logo "SINGAPORE'S MOST AVERAGE FAMILY" on the back wall (x 110-560, y 112-212),
                          a small copy of the scoreboard top right (g.board: asMiniBoard, x 610-1170, y 22-178), an
                          APPLAUSE sign (g.applause.set(p) lights it) at (600, 250), and the contestants' desk.
                          LAYERS: characters in g.mid (a bust at y about 440 hides its shirt hem behind the desk), the
                          desk is g.front (top at g.deskY = 530, x 60-1140), props on the desk go in g.top.
                          Team name plates on the desk front: g.plates.kavya (TEAM KAVYA, centre x 330),
                          g.plates.priya (TEAM PRIYA, x 790), g.plates.tan (TEAM TAN, x 1020); op() them to taste.
                          g.upd(t) runs the chase lights round the desk and sways the spotlights.
     asBoardShot(parent)  close-up of the giant scoreboard where the four measures live: four tall panels side by side
                          (x 40-1160, y 112-690), labels MEAN / MEDIAN / MODE / RANGE at the top of each, a dark window for
                          the character and an amber LED readout at the bottom. g.slots[i] = { x, y } a character's spot
                          in panel i (put the cast at s about 0.7-0.75); g.set(i, text) sets panel i's readout (cheap,
                          call every frame); g.lit(i, p) glows panel i. Panels: 0 MEAN, 1 MEDIAN, 2 MODE, 3 RANGE.
     asScreen(parent, w, h, o)  the studio's big question screen, centred on (0,0): purple frame with bulbs, a cream
                          paper area (write on it in MK.ink), o.title in a gold strip at the top. g.area { x, y, w, h }
                          (the writing area, relative to the screen centre), g.content (a <g>), g.upd(t) twinkles bulbs.
     asMiniBoard(parent)  the small scoreboard (550 x 156, origin top-left): four panels with labels and readouts;
                          g.set(i, text), g.lit(i, p).

   Props (around their own origin)
     AS                       palette: purple, violet, gold, neon pink, LED amber, paper
     asStamp(parent, ok)      the show's verdict stamp: mkStamp 'SPOT ON!' (green, ok true) or 'WAY OFF!' (red);
                              g.set(p). About 420 px wide at scale 1.
     asCarrier(parent, o)     Pythagoras, Mr Tan's grey cat, peering out of a blue pet carrier, base centre at (0,0), about
                              170 x 130. g.set({ t, look, blink }) moves his eyes (look -1..1). Not data.
     asDurian(parent, s)      a durian, centred, about 90 wide at s = 1 (spiky green-brown, a stalk)
     asBeanbag(parent, col)   a small square beanbag, centred, about 44 wide
     asBucket(parent)         the beanbag target bucket, base centre at (0,0), about 120 x 110, a gold star
     asHearts(parent)         three floating hearts (used by Mo); g.upd(t, p)
*/

/* ---------- palette, confessional tints, lower thirds ---------- */
const AS = { purple: '#2A1150', violet: '#5B2A9E', gold: '#FFC93C', neon: '#FF5FC8', led: '#FFB020', paper: '#FFFDF6',
  green: '#1E9E5A', red: '#D32F2F', sky: '#7FD3FF' };
const AS_TINT = {
  mean: ['#2E2408', '#6B5212'], medi: ['#14261A', '#2C5A36'], mo: ['#3A1030', '#7A2266'], ranger: ['#2A2410', '#5E5020'],
  otto: ['#24123E', '#4E2A88'], sigma: ['#101A3A', '#24366E'], kavya: ['#14243A', '#25446B'], dad: ['#123026', '#245A48'],
  mum: ['#3A1030', '#6B1E58'], boy: ['#3A2410', '#6B4414'], priya: ['#1A2240', '#33407A'], tan: ['#1A2A3A', '#33506E'],
  rose: ['#3A1424', '#6E2A44'], benny: ['#2A1150', '#5B2A9E'],
};
function asConf(parent, who) { const c = AS_TINT[who] || AS_TINT.mean; return scConfessional(parent, c[0], c[1]); }
const AS_LT = {
  mean: ['MEAN', 'Total ÷ how many. Not mean. Fair.'],
  medi: ['MEDI', 'The median. In order, please.'],
  mo: ['MO', 'The mode. Most popular. Obviously.'],
  ranger: ['RANGER', 'The range. One number. Never negative.'],
  otto: ['OTTO', 'An outlier. Just wants to join in.'],
  sigma: ['SIGMA', 'Σ: add them all up. Greek. Dramatic.'],
  kavya: ['KAVYA, 12', 'Team Kavya. Half right.'],
  mum: ['MUM', 'Team Kavya. Wants the $1000.'],
  dad: ['DAD', '"We are ABOVE average."'],
  boy: ['AH BOY, 8', 'Team Kavya. Knows the jingle.'],
  priya: ['PRIYA', 'Team Priya, captain. Parents parking.'],
  tan: ['MR TAN', 'Team Tan. A family of one.'],
  rose: ['AUNTIE ROSE', "Rose's Kitchen, Blk 208. Age: secret."],
  benny: ['BENNY LIM', 'Game-show host. Very shiny teeth.'],
};
function asLowerThird(parent, who) { const l = AS_LT[who] || [String(who).toUpperCase(), '']; return scLowerThird(parent, l[0], l[1]); }

/* ---------- the cast ---------- */
const AS_PROP = { mum: null, dad: null, boy: null, priya: 'pencil', tan: null, rose: 'phone' };
const AS_BENNY = { name: 'BENNY LIM', role: 'Game-show host', age: 'adult', skin: SC_SKIN.light, hair: 'side-part', hairCol: '#1E1A2E',
  style: 'office', shirt: '#FFFFFF', tie: '#E2B33C', seed: 31, frame: 'broad', hand: true };

function asBennyExtras(c) {
  // a sequinned purple jacket over the shirt: inserted before the neck so the head stays on top
  const inner = c.firstChild;
  const neck = Array.from(inner.children).find(el => el.tagName === 'rect' && el.getAttribute('width') === '40');
  const jk = G(inner);
  if (neck) inner.insertBefore(jk, neck);
  const sw = 114 * 1.08;
  [-1, 1].forEach(s => {
    E('path', { d: `M${s * sw},140 Q${s * (sw - 4)},54 ${s * sw * 0.4},44 L${s * 26},48 L${s * 30},92 L${s * 18},140 Z`, fill: '#6A2BB8', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, jk);
    E('path', { d: `M${s * 26},48 L${s * 52},62 L${s * 38},74 L${s * 30},92`, fill: '#4A1A88', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, jk);   // lapel
  });
  const r = rng(77);
  let d = '';
  for (let i = 0; i < 22; i++) { const s = i % 2 ? 1 : -1, x = s * (40 + r() * 70), y = 70 + r() * 66; d += `M${x.toFixed(1)},${y.toFixed(1)} m-2.5,0 a2.5,2.5 0 1,0 5,0 a2.5,2.5 0 1,0 -5,0 `; }
  E('path', { d, fill: '#E9D7FF', opacity: 0.85 }, jk);   // sequins
  // the microphone in his hand (grip at 0,0)
  if (c.hand) {
    const m = G(c.hand);
    E('rect', { x: -7, y: -44, width: 14, height: 54, rx: 6, fill: '#2A2A34', stroke: SC_INK, 'stroke-width': 3 }, m);
    E('circle', { cx: 0, cy: -58, r: 18, fill: '#C9D3DC', stroke: SC_INK, 'stroke-width': 3.5 }, m);
    E('path', { d: 'M-12,-64 L12,-64 M-14,-56 L14,-56 M-12,-48 L12,-48', stroke: '#8F9CAB', 'stroke-width': 2 }, m);
    c.mic = m;
  }
  // the tooth sparkle, by the mouth (face centre y = -46 + 12 * 82/80 ~ -34; the mouth is about 31 below it)
  const ting = G(inner); tr(ting, 30, 0);
  E('path', { d: 'M0,-16 L4,-4 L16,0 L4,4 L0,16 L-4,4 L-16,0 L-4,-4 Z', fill: '#FFF7C2', stroke: AS.gold, 'stroke-width': 2 }, ting);
  c.ting = ting; op(ting, 0);
}

function cast(parent, kind, o) {
  o = o || {};
  if (kind === 'kavya') return scKavya(parent, o);
  if (kind === 'benny') {
    const c = scHuman(parent, Object.assign({}, AS_BENNY, o));
    asBennyExtras(c);
    const base = c.set;
    c.set = st => { base(st); op(c.ting, clamp(st.ting || 0)); if (st.ting) tr(c.ting, 30, 0, 0.6 + 0.6 * clamp(st.ting), (st.t || 0) * 90 % 360); };
    c.who = 'benny'; c.name = 'BENNY LIM'; c.role = 'Game-show host';
    return c;
  }
  if (SC_HUMANS[kind]) {
    const p = Object.assign({}, kind === 'boy' ? { hand: true } : { prop: AS_PROP[kind] }, o);
    const c = scCastHuman(parent, kind, p);
    if (kind === 'priya') {   // captain's armband ribbon on her left sleeve (viewer's right)
      const rb = G(c.firstChild); tr(rb, 78, 96, 1, 12);
      E('rect', { x: -22, y: -12, width: 44, height: 24, rx: 4, fill: AS.gold, stroke: SC_INK, 'stroke-width': 3 }, rb);
      T(rb, 0, 7, 'C', { size: 20, weight: 800, anchor: 'middle', fill: SC_INK });
    }
    return c;
  }
  const S = { s: o.s, mood: o.mood };
  let c;
  if (kind === 'mean') {
    let bub = null, armL = null, armR = null;
    c = scMake(parent, Object.assign(S, { seed: 4, bob: 2, mood: o.mood || 'deadpan',
      draw: g => {
        // legs and shoes
        [-70, 70].forEach(x => {
          E('path', { d: `M${x},58 L${x},98`, stroke: SC_INK, 'stroke-width': 8, 'stroke-linecap': 'round' }, g);
          E('path', { d: `M${x - 14},108 Q${x - 14},94 ${x + 2},94 L${x + 20},96 Q${x + 26},108 ${x + 16},110 Z`, fill: '#2A2A34', stroke: SC_INK, 'stroke-width': 3 }, g);
        });
        // arms (animated)
        armL = E('path', { d: '', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
        armR = E('path', { d: '', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
        // the level's body
        E('rect', { x: -160, y: -60, width: 320, height: 120, rx: 14, fill: linGrad('#FFE07A', '#F2B21C', true), stroke: SC_INK, 'stroke-width': 5 }, g);
        [-1, 1].forEach(s => E('rect', { x: s > 0 ? 124 : -160, y: -60, width: 36, height: 120, rx: 12, fill: linGrad('#C9D3DC', '#7D8A96', true), stroke: SC_INK, 'stroke-width': 5 }, g));
        let ticks = '';
        for (let i = 0; i <= 20; i++) { const x = -116 + i * 11.6; ticks += `M${x.toFixed(1)},60 L${x.toFixed(1)},${i % 5 ? 50 : 42} `; }
        E('path', { d: ticks, stroke: '#8A5A08', 'stroke-width': 2.5 }, g);
        // the vial window
        E('rect', { x: -56, y: -54, width: 112, height: 34, rx: 16, fill: '#3A2A08', stroke: SC_INK, 'stroke-width': 4 }, g);
        E('rect', { x: -50, y: -49, width: 100, height: 24, rx: 12, fill: '#C8F59A' }, g);
        E('path', { d: 'M-14,-50 L-14,-24 M14,-50 L14,-24', stroke: SC_INK, 'stroke-width': 3 }, g);
        bub = E('ellipse', { cx: 0, cy: -37, rx: 12, ry: 8, fill: '#F4FFE8', stroke: '#6E9E3A', 'stroke-width': 2 }, g);
        // cheeks
        E('ellipse', { cx: -70, cy: 26, rx: 12, ry: 7, fill: '#FF8FB0', opacity: 0.45 }, g);
        E('ellipse', { cx: 70, cy: 26, rx: 12, ry: 7, fill: '#FF8FB0', opacity: 0.45 }, g);
        // bow tie below the body
        const bt = G(g); tr(bt, 0, 66);
        E('path', { d: 'M0,0 L-24,-12 L-24,12 Z M0,0 L24,-12 L24,12 Z', fill: '#1E2A5A', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, bt);
        E('circle', { r: 6, fill: '#2E4C8C', stroke: SC_INK, 'stroke-width': 2.5 }, bt);
      },
      face: { x: 0, y: 4, eye: 16, gap: 76, mouthW: 36, mouthY: 30, lidCol: '#F2B21C' },
      sweat: [[-110, -40], [112, -36], [-130, 10]],
      upd: (t, g, st) => {
        const tl = st.tilt || 0;
        attr(bub, 'cx', clamp(-tl * 1.6, -36, 36));
        const k = clamp(st.arms || 0), w = Math.sin(t * TAU * 1.2) * 6 * k;
        attr(armL, 'd', `M-160,10 Q${-186 - 20 * k},${24 - 40 * k} ${-176 - 50 * k},${(54 - 70 * k + w).toFixed(1)}`);
        attr(armR, 'd', `M160,10 Q${186 + 20 * k},${24 - 40 * k} ${176 + 50 * k},${(54 - 70 * k - w).toFixed(1)}`);
      } }));
  } else if (kind === 'medi') {
    let whis = null, armR = null, gloveR = null, lines = null;
    c = scMake(parent, Object.assign(S, { seed: 9, bob: 3, mood: o.mood || 'neutral',
      draw: g => {
        // legs
        [-50, 50].forEach(x => {
          E('path', { d: `M${x},76 L${x},112`, stroke: SC_INK, 'stroke-width': 8, 'stroke-linecap': 'round' }, g);
          E('path', { d: `M${x - 14},120 Q${x - 14},106 ${x + 2},106 L${x + 20},108 Q${x + 26},120 ${x + 16},122 Z`, fill: '#2A2A34', stroke: SC_INK, 'stroke-width': 3 }, g);
        });
        // grass and bougainvillea on top (her hair)
        E('path', { d: 'M-118,-58 Q-120,-96 -84,-104 Q-70,-140 -30,-128 Q-6,-156 30,-132 Q70,-146 86,-110 Q122,-100 118,-58 Z', fill: '#3FA463', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
        const r = rng(19);
        let fl = '';
        for (let i = 0; i < 14; i++) { const x = -96 + r() * 192, y = -126 + r() * 54; fl += `M${x.toFixed(1)},${y.toFixed(1)} m-6,0 a6,6 0 1,0 12,0 a6,6 0 1,0 -12,0 `; }
        E('path', { d: fl, fill: '#FF5FA2', stroke: '#B0236E', 'stroke-width': 1.5 }, g);
        // the kerb block
        E('rect', { x: -116, y: -64, width: 232, height: 144, rx: 10, fill: linGrad('#D9DEE3', '#B4BCC4', true), stroke: SC_INK, 'stroke-width': 5 }, g);
        const kb = G(g);
        for (let i = 0; i < 8; i++) E('rect', { x: -116 + i * 29, y: 46, width: 29, height: 34, fill: i % 2 ? '#FFFFFF' : '#2A2A34' }, kb);
        E('rect', { x: -116, y: 46, width: 232, height: 34, fill: 'none', stroke: SC_INK, 'stroke-width': 4 }, kb);
        // hi-vis sash
        E('path', { d: 'M-116,-30 L-86,-60 L116,30 L116,44 L104,46 Z', fill: '#FF8A1E', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
        E('path', { d: 'M-100,-44 L110,38', stroke: '#F4F7FA', 'stroke-width': 5, opacity: 0.9 }, g);
        // left arm resting (viewer's left), white glove
        E('path', { d: 'M-116,0 Q-146,24 -138,58', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
        E('circle', { cx: -138, cy: 62, r: 13, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
        // right arm (animated): points out, or holds the whistle
        armR = E('path', { d: '', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
        gloveR = E('circle', { r: 13, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
        whis = G(g);
        E('path', { d: 'M-16,-8 L14,-8 Q22,-8 22,2 Q22,12 12,12 L-16,12 Z', fill: '#C9D3DC', stroke: SC_INK, 'stroke-width': 3 }, whis);
        E('circle', { cx: 10, cy: 2, r: 5, fill: '#6E7D8A' }, whis);
        lines = E('path', { d: 'M36,-10 l18,-10 M38,4 l22,0 M36,16 l18,10', stroke: '#FFE45C', 'stroke-width': 4, 'stroke-linecap': 'round' }, whis);
      },
      face: { x: 0, y: -14, eye: 16, gap: 62, mouthW: 34, mouthY: 32, lidCol: '#C9D0D6' },
      upd: (t, g, st) => {
        const w = clamp(st.whistle || 0), p = clamp(st.point || 0);
        let hx, hy;
        if (w > 0.5) { hx = 26; hy = 22; }
        else { hx = lerp(136, 196, p); hy = lerp(60, -6, p); }
        attr(armR, 'd', `M116,0 Q${lerp(146, 170, p).toFixed(1)},${lerp(24, -10, p).toFixed(1)} ${hx},${hy}`);
        attr(gloveR, 'cx', hx); attr(gloveR, 'cy', hy);
        op(whis, w > 0.5 ? 1 : 0); tr(whis, 0, 26);
        op(lines, w > 0.5 && Math.sin(t * TAU * 3) > -0.3 ? 1 : 0);
      } }));
  } else if (kind === 'mo') {
    let hearts = null, lk = null;
    c = scMake(parent, Object.assign(S, { seed: 13, bob: 6, mood: o.mood || 'happy',
      draw: g => {
        [-40, 40].forEach(x => {
          E('path', { d: `M${x},120 L${x},150`, stroke: SC_INK, 'stroke-width': 8, 'stroke-linecap': 'round' }, g);
          E('path', { d: `M${x - 14},158 Q${x - 14},144 ${x + 2},144 L${x + 20},146 Q${x + 26},158 ${x + 16},160 Z`, fill: '#FF5FA2', stroke: SC_INK, 'stroke-width': 3 }, g);
        });
        E('path', { d: 'M-86,-10 Q-120,10 -114,48', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
        E('path', { d: 'M86,-10 Q124,-30 126,-70', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
        E('circle', { cx: -114, cy: 52, r: 12, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
        E('circle', { cx: 126, cy: -74, r: 12, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
        // the phone
        E('rect', { x: -88, y: -128, width: 176, height: 256, rx: 30, fill: linGrad('#FF8FC8', '#E0408F', true), stroke: SC_INK, 'stroke-width': 5 }, g);
        E('rect', { x: -74, y: -108, width: 148, height: 210, rx: 18, fill: '#FFF0F8', stroke: SC_INK, 'stroke-width': 3 }, g);
        E('rect', { x: -22, y: -122, width: 44, height: 8, rx: 4, fill: SC_INK }, g);   // speaker slot
        E('rect', { x: -26, y: 110, width: 52, height: 7, rx: 3.5, fill: '#FFD3EA' }, g);   // home bar
        // round sunglasses pushed up on top
        const sg = G(g); tr(sg, 0, -136);
        E('circle', { cx: -30, cy: 0, r: 20, fill: '#2A1A22', stroke: SC_INK, 'stroke-width': 3 }, sg);
        E('circle', { cx: 30, cy: 0, r: 20, fill: '#2A1A22', stroke: SC_INK, 'stroke-width': 3 }, sg);
        E('path', { d: 'M-10,-2 Q0,-10 10,-2', fill: 'none', stroke: SC_INK, 'stroke-width': 4 }, sg);
        E('ellipse', { cx: -36, cy: -6, rx: 6, ry: 4, fill: '#FFFFFF', opacity: 0.5 }, sg);
        // "#1" sticker
        const st = G(g); tr(st, -52, 74, 1, -12);
        E('circle', { r: 22, fill: AS.gold, stroke: SC_INK, 'stroke-width': 3 }, st);
        T(st, 0, 9, '#1', { size: 24, weight: 800, anchor: 'middle', fill: SC_INK });
        // the like counter bubble
        const lb = G(g); tr(lb, 40, 70);
        E('rect', { x: -34, y: -18, width: 76, height: 36, rx: 18, fill: '#E8424F', stroke: SC_INK, 'stroke-width': 3 }, lb);
        lk = T(lb, 4, 9, '♥ 3', { size: 22, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
        E('ellipse', { cx: -44, cy: -6, rx: 11, ry: 7, fill: '#FF8FB0', opacity: 0.5 }, g);
        E('ellipse', { cx: 44, cy: -6, rx: 11, ry: 7, fill: '#FF8FB0', opacity: 0.5 }, g);
        hearts = asHearts(g); tr(hearts, 110, -40);
      },
      face: { x: 0, y: -36, eye: 17, gap: 56, mouthW: 34, mouthY: 34, lidCol: '#FFD3EA' },
      upd: (t, g, st) => {
        hearts.upd(t, st.hearts === undefined ? 0 : st.hearts);
        setText(lk, st.likes || '♥ 3');
      } }));
  } else if (kind === 'ranger') {
    let tape = null, ticks = null, hook = null;
    c = scMake(parent, Object.assign(S, { seed: 21, bob: 2, mood: o.mood || 'neutral',
      draw: g => {
        [-44, 44].forEach(x => {
          E('path', { d: `M${x},90 L${x},118`, stroke: SC_INK, 'stroke-width': 8, 'stroke-linecap': 'round' }, g);
          E('path', { d: `M${x - 14},126 Q${x - 14},112 ${x + 2},112 L${x + 20},114 Q${x + 26},126 ${x + 16},128 Z`, fill: '#5A4020', stroke: SC_INK, 'stroke-width': 3 }, g);
        });
        // left arm, hand on hip
        E('path', { d: 'M-112,10 Q-150,30 -128,60', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
        E('circle', { cx: -126, cy: 62, r: 12, fill: '#F4F7FA', stroke: SC_INK, 'stroke-width': 3 }, g);
        // the tape (animated length), from the slot at the right
        tape = E('rect', { x: 110, y: 28, width: 60, height: 24, fill: '#FFD23C', stroke: SC_INK, 'stroke-width': 3 }, g);
        ticks = E('path', { d: '', stroke: SC_INK, 'stroke-width': 2 }, g);
        hook = G(g);
        E('path', { d: 'M0,-4 L10,-4 L10,34 L2,34 L2,22', fill: '#C9D3DC', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, hook);
        // the case
        E('rect', { x: -116, y: -92, width: 232, height: 184, rx: 50, fill: linGrad('#FFD23C', '#E8A800', true), stroke: SC_INK, 'stroke-width': 5 }, g);
        E('rect', { x: -116, y: 50, width: 232, height: 42, rx: 20, fill: '#2A2A34', stroke: SC_INK, 'stroke-width': 4 }, g);
        T(g, 0, 80, 'RANGE', { size: 24, weight: 800, anchor: 'middle', fill: '#FFD23C', ls: 3 });
        E('rect', { x: 108, y: 24, width: 14, height: 32, rx: 4, fill: '#2A2A34', stroke: SC_INK, 'stroke-width': 3 }, g);   // slot
        E('ellipse', { cx: -60, cy: 20, rx: 12, ry: 7, fill: '#FF8FB0', opacity: 0.45 }, g);
        E('ellipse', { cx: 60, cy: 20, rx: 12, ry: 7, fill: '#FF8FB0', opacity: 0.45 }, g);
        // park ranger's hat
        const hat = G(g); tr(hat, 0, -92);
        E('ellipse', { cx: 0, cy: 0, rx: 120, ry: 18, fill: '#B98A4E', stroke: SC_INK, 'stroke-width': 4 }, hat);
        E('path', { d: 'M-58,2 L-50,-52 Q-30,-66 0,-56 Q30,-66 50,-52 L58,2 Z', fill: '#C99A5E', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, hat);
        E('path', { d: 'M-30,-60 L0,-44 L30,-60', fill: 'none', stroke: SC_INK, 'stroke-width': 3 }, hat);
        E('rect', { x: -57, y: -16, width: 114, height: 14, fill: '#3E5A28', stroke: SC_INK, 'stroke-width': 3 }, hat);
      },
      face: { x: 0, y: -18, eye: 16, gap: 64, mouthW: 34, mouthY: 34, lidCol: '#E8B000' },
      upd: (t, g, st) => {
        const R = Math.max(10, st.reach === undefined ? 60 : st.reach);
        attr(tape, 'width', R);
        let d = '';
        for (let x = 10; x < R; x += 10) d += `M${(114 + x).toFixed(1)},28 l0,${x % 50 ? 8 : 14} `;
        attr(ticks, 'd', d);
        tr(hook, 112 + R, 30);
      } }));
  } else if (kind === 'otto') {
    let arms = [];
    c = scMake(parent, Object.assign(S, { seed: 25, bob: 6, mood: o.mood || 'happy',
      draw: g => {
        // crosshair ring, like a plotted point
        E('circle', { r: 150, fill: 'none', stroke: '#FFC2E8', 'stroke-width': 4, 'stroke-dasharray': '18 14', opacity: 0.7 }, g);
        E('path', { d: 'M-176,0 L-152,0 M152,0 L176,0 M0,-176 L0,-152', stroke: '#FFC2E8', 'stroke-width': 4, opacity: 0.7 }, g);
        [-1, 1].forEach(sd => { const a = E('path', { d: '', fill: 'none', stroke: SC_INK, 'stroke-width': 9, 'stroke-linecap': 'round' }, g); const h = E('circle', { r: 15, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g); arms.push({ a, h, sd }); });
        [-46, 46].forEach(x => {
          E('path', { d: `M${x},112 L${x},140`, stroke: SC_INK, 'stroke-width': 9, 'stroke-linecap': 'round' }, g);
          E('path', { d: `M${x - 16},150 Q${x - 16},134 ${x + 2},134 L${x + 22},136 Q${x + 28},150 ${x + 18},152 Z`, fill: '#FFC93C', stroke: SC_INK, 'stroke-width': 3 }, g);
        });
        E('circle', { r: 120, fill: ball('#B48CFF', '#5B2A9E'), stroke: SC_INK, 'stroke-width': 6 }, g);
        E('ellipse', { cx: -48, cy: -62, rx: 30, ry: 16, fill: '#FFFFFF', opacity: 0.25 }, g);
        E('ellipse', { cx: -70, cy: 30, rx: 18, ry: 10, fill: '#FF8FB0', opacity: 0.5 }, g);
        E('ellipse', { cx: 70, cy: 30, rx: 18, ry: 10, fill: '#FF8FB0', opacity: 0.5 }, g);
        // party hat
        const hat = G(g); tr(hat, 30, -112, 1, 14);
        E('path', { d: 'M-30,8 L0,-60 L30,8 Z', fill: '#56D69B', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, hat);
        E('path', { d: 'M-18,-16 L14,-12 M-10,-36 L8,-32', stroke: '#FFE45C', 'stroke-width': 5 }, hat);
        E('circle', { cx: 0, cy: -62, r: 9, fill: '#FF5FA2', stroke: SC_INK, 'stroke-width': 3 }, hat);
      },
      face: { x: 0, y: -10, eye: 24, gap: 84, mouthW: 56, mouthY: 50, lidCol: '#9C6BFF' },
      sweat: [[-90, -70], [96, -60]],
      upd: (t, g, st) => {
        const k = st.wave === undefined ? 0.4 : clamp(st.wave);
        arms.forEach(({ a, h, sd }, i) => {
          const w = Math.sin(t * TAU * 1.6 + i * 1.3) * 26 * k;
          const hx = sd * (150 + 10 * k), hy = lerp(70, -96, k) + w;
          attr(a, 'd', `M${sd * 112},20 Q${sd * 150},${lerp(40, -10, k).toFixed(1)} ${hx.toFixed(1)},${hy.toFixed(1)}`);
          attr(h, 'cx', hx); attr(h, 'cy', hy);
        });
      } }));
  } else if (kind === 'sigma') {
    let armL = null, armR = null;
    c = scMake(parent, Object.assign(S, { seed: 29, bob: 3, mood: o.mood || 'smug',
      draw: g => {
        armL = E('path', { d: '', fill: 'none', stroke: SC_INK, 'stroke-width': 8, 'stroke-linecap': 'round' }, g);
        armR = E('path', { d: '', fill: 'none', stroke: SC_INK, 'stroke-width': 8, 'stroke-linecap': 'round' }, g);
        // the Σ body
        const body = 'M-100,-90 L100,-90 L100,-42 L-8,-42 L48,30 L-8,102 L100,102 L100,150 L-100,150 L-100,118 L-6,30 L-100,-58 Z';
        E('path', { d: body, fill: linGrad('#3A4C9E', '#1A2460', true), stroke: AS.gold, 'stroke-width': 7, 'stroke-linejoin': 'round' }, g);
        E('path', { d: body, fill: 'none', stroke: SC_INK, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, g);
        // neck and head
        E('rect', { x: -14, y: -112, width: 28, height: 26, fill: '#E9C49A', stroke: SC_INK, 'stroke-width': 3 }, g);
        E('circle', { cx: 0, cy: -150, r: 56, fill: '#F2D2AA', stroke: SC_INK, 'stroke-width': 5 }, g);
        // laurel wreath
        const lw = G(g); tr(lw, 0, -150);
        let d = '';
        for (let i = 0; i < 7; i++) [-1, 1].forEach(s => { const a = (-160 + i * 18) * Math.PI / 180, x = s * Math.cos(a) * -60, y = Math.sin(a) * 58; d += `M${x.toFixed(1)},${y.toFixed(1)} q${(s * 10).toFixed(1)},-12 ${(s * 22).toFixed(1)},-4 q${(-s * 10).toFixed(1)},10 ${(-s * 22).toFixed(1)},4 Z `; });
        E('path', { d, fill: '#E2B33C', stroke: '#8A6508', 'stroke-width': 2 }, lw);
        E('ellipse', { cx: -30, cy: -134, rx: 10, ry: 6, fill: '#FF8FB0', opacity: 0.5 }, g);
        E('ellipse', { cx: 30, cy: -134, rx: 10, ry: 6, fill: '#FF8FB0', opacity: 0.5 }, g);
      },
      face: { x: 0, y: -158, eye: 13, gap: 44, mouthW: 28, mouthY: 30, lidCol: '#E9C49A' },
      upd: (t, g, st) => {
        const k = clamp(st.arms || 0), w = Math.sin(t * TAU * 1.4) * 8 * k;
        attr(armL, 'd', `M-90,-70 Q${-140 - 10 * k},${-40 - 60 * k} ${-130 - 20 * k},${(10 - 150 * k + w).toFixed(1)}`);
        attr(armR, 'd', `M90,-70 Q${140 + 10 * k},${-40 - 60 * k} ${130 + 20 * k},${(10 - 150 * k - w).toFixed(1)}`);
      } }));
    const inner = c.firstChild;   // white gloves at the ends of the arms
    const gl = [E('circle', { r: 13, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, inner), E('circle', { r: 13, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, inner)];
    const base = c.set;
    c.set = st => { base(st); const k = clamp((st && st.arms) || 0), w = Math.sin(((st && st.t) || 0) * TAU * 1.4) * 8 * k; tr(gl[0], -130 - 20 * k, 10 - 150 * k + w); tr(gl[1], 130 + 20 * k, 10 - 150 * k - w); };
    c.set({});
  } else {
    c = scKavya(parent, o);
  }
  return c;
}

/* ---------- small props ---------- */
function asHearts(parent) {
  const g = G(parent), hs = [];
  for (let i = 0; i < 3; i++) { const h = G(g); E('path', { d: 'M0,8 C-14,-2 -12,-14 -4,-14 C0,-14 0,-10 0,-8 C0,-10 0,-14 4,-14 C12,-14 14,-2 0,8 Z', fill: '#FF3B6B', stroke: SC_INK, 'stroke-width': 2 }, h); hs.push(h); }
  g.upd = (t, p) => hs.forEach((h, i) => { const f = (t * 0.6 + i / 3) % 1; tr(h, Math.sin(f * 6 + i) * 10 + i * 14 - 14, -f * 90, 1.1 + 0.4 * (1 - f)); op(h, clamp(p) * (1 - f)); });
  g.upd(0, 0);
  return g;
}

function asStamp(parent, ok) { return mkStamp(parent, ok ? 'SPOT ON!' : 'WAY OFF!', ok ? '#1E9E5A' : '#D32F2F'); }

function asCarrier(parent, o) {
  o = o || {};
  const g = G(parent);
  E('rect', { x: -86, y: -124, width: 172, height: 124, rx: 22, fill: linGrad('#4C8FD8', '#2E5FA8', true), stroke: SC_INK, 'stroke-width': 4 }, g);
  E('path', { d: 'M-40,-124 Q0,-160 40,-124', fill: 'none', stroke: SC_INK, 'stroke-width': 8, 'stroke-linecap': 'round' }, g);   // handle
  E('rect', { x: -62, y: -106, width: 124, height: 88, rx: 14, fill: '#1A2430', stroke: SC_INK, 'stroke-width': 3 }, g);
  // the cat
  const cat = G(g); tr(cat, 0, -54);
  E('path', { d: 'M-40,-14 L-34,-46 L-14,-30 Z M40,-14 L34,-46 L14,-30 Z', fill: '#9AA6B2', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, cat);
  E('ellipse', { cx: 0, cy: 0, rx: 42, ry: 34, fill: '#9AA6B2', stroke: SC_INK, 'stroke-width': 3 }, cat);
  const eyes = [-1, 1].map(s => { const e = G(cat); tr(e, s * 16, -4); E('ellipse', { rx: 9, ry: 10, fill: '#C8F05A', stroke: SC_INK, 'stroke-width': 2 }, e); const p = E('ellipse', { rx: 2.5, ry: 8, fill: SC_INK }, e); const lid = E('rect', { x: -10, y: -11, width: 20, height: 0, fill: '#9AA6B2' }, e); return { p, lid }; });
  E('path', { d: 'M-4,10 L4,10 L0,15 Z', fill: '#FF8FB0' }, cat);
  E('path', { d: 'M0,15 Q-6,22 -12,18 M0,15 Q6,22 12,18 M-20,10 L-44,6 M-20,14 L-44,16 M20,10 L44,6 M20,14 L44,16', fill: 'none', stroke: SC_INK, 'stroke-width': 2 }, cat);
  // bars over the window
  let bars = '';
  for (let i = 1; i < 6; i++) bars += `M${-62 + i * 20.7},-106 L${-62 + i * 20.7},-18 `;
  E('path', { d: bars, stroke: '#C9D3DC', 'stroke-width': 4 }, g);
  const tag = G(g); tr(tag, 56, -10, 1, 8);
  E('rect', { x: -40, y: -14, width: 80, height: 28, rx: 6, fill: '#FFFDF6', stroke: SC_INK, 'stroke-width': 2.5 }, tag);
  T(tag, 0, 7, 'PYTHAGORAS', { size: 12, weight: 800, anchor: 'middle', fill: SC_INK });
  g.set = st => {
    st = st || {};
    const lk = (st.look || 0) * 4, bl = st.blink !== undefined ? st.blink : scBlink(st.t || 0, 41);
    eyes.forEach(({ p, lid }) => { attr(p, 'cx', lk); attr(lid, 'height', 21 * clamp(bl)); });
  };
  g.set({});
  return g;
}

function asDurian(parent, s) {
  const g = G(parent); tr(g, 0, 0, s || 1);
  let sp = '';
  for (let i = 0; i < 18; i++) { const a = i / 18 * TAU, x = Math.cos(a) * 44, y = Math.sin(a) * 38; sp += `M${(x * 0.86).toFixed(1)},${(y * 0.86).toFixed(1)} L${(x * 1.18).toFixed(1)},${(y * 1.18).toFixed(1)} L${(x * 0.86 + Math.cos(a + 1.6) * 7).toFixed(1)},${(y * 0.86 + Math.sin(a + 1.6) * 7).toFixed(1)} Z `; }
  E('path', { d: sp, fill: '#6E8A2A', stroke: SC_INK, 'stroke-width': 2, 'stroke-linejoin': 'round' }, g);
  E('ellipse', { rx: 44, ry: 38, fill: ball('#A8C24A', '#5E7A1E'), stroke: SC_INK, 'stroke-width': 3 }, g);
  let dots = '';
  for (let i = 0; i < 12; i++) { const a = i * 2.4, r = 10 + (i % 4) * 7; dots += `M${(Math.cos(a) * r).toFixed(1)},${(Math.sin(a) * r * 0.85).toFixed(1)} l3,-6 l3,6 Z `; }
  E('path', { d: dots, fill: '#5E7A1E' }, g);
  E('path', { d: 'M0,-38 Q4,-54 14,-58', fill: 'none', stroke: '#6B4423', 'stroke-width': 6, 'stroke-linecap': 'round' }, g);
  return g;
}

function asBeanbag(parent, col) {
  const g = G(parent);
  E('path', { d: 'M-22,-18 Q0,-26 22,-18 Q28,0 22,18 Q0,26 -22,18 Q-28,0 -22,-18 Z', fill: col || '#E8424F', stroke: SC_INK, 'stroke-width': 3 }, g);
  E('path', { d: 'M-18,-12 Q0,-18 18,-12', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 2, 'stroke-dasharray': '4 4', opacity: 0.7 }, g);
  return g;
}

function asBucket(parent) {
  const g = G(parent);
  E('path', { d: 'M-60,-110 L60,-110 L48,0 L-48,0 Z', fill: linGrad('#FFC93C', '#E89A00', true), stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
  E('ellipse', { cx: 0, cy: -110, rx: 60, ry: 14, fill: '#3A2A08', stroke: SC_INK, 'stroke-width': 4 }, g);
  E('path', { d: 'M0,-80 L7,-62 L26,-62 L11,-50 L17,-32 L0,-43 L-17,-32 L-11,-50 L-26,-62 L-7,-62 Z', fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, g);
  return g;
}

/* ---------- sets ---------- */
function asMiniBoard(parent) {
  const g = G(parent), labs = ['MEAN', 'MEDIAN', 'MODE', 'RANGE'], vals = [], glows = [];
  E('rect', { x: 0, y: 0, width: 550, height: 156, rx: 16, fill: '#120A26', stroke: AS.gold, 'stroke-width': 5 }, g);
  for (let i = 0; i < 4; i++) {
    const x = 12 + i * 133;
    glows.push(E('rect', { x: x - 2, y: 10, width: 128, height: 136, rx: 12, fill: AS.gold, opacity: 0 }, g));
    E('rect', { x, y: 12, width: 124, height: 132, rx: 10, fill: '#24124A', stroke: '#6A3CC8', 'stroke-width': 3 }, g);
    T(g, x + 62, 44, labs[i], { size: 24, weight: 800, anchor: 'middle', fill: '#E9D7FF', ls: 1 });
    E('rect', { x: x + 10, y: 60, width: 104, height: 70, rx: 8, fill: '#0A0614' }, g);
    vals.push(T(g, x + 62, 112, '', { size: 40, weight: 800, anchor: 'middle', fill: AS.led }));
  }
  g.set = (i, s) => setText(vals[i], s);
  g.lit = (i, p) => op(glows[i], clamp(p) * 0.9);
  return g;
}

function asStudio(parent) {
  const g = G(parent), back = G(g);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#160A30', '#3A1670', true) }, back);
  // light strips on the back wall
  for (let i = 0; i < 9; i++) E('rect', { x: 40 + i * 134, y: 230, width: 14, height: 330, rx: 7, fill: i % 2 ? '#7A3CE0' : '#FF5FC8', opacity: 0.35 }, back);
  E('path', { d: 'M0,560 L1200,560', stroke: '#7A3CE0', 'stroke-width': 4, opacity: 0.6 }, back);
  // spotlight cones
  const spots = [[260, '#FFF4C2'], [940, '#C2E8FF']].map(([x, col]) => {
    const s = G(back); tr(s, x, -20);
    E('path', { d: 'M-24,0 L24,0 L180,620 L-180,620 Z', fill: col, opacity: 0.09 }, s);
    return s;
  });
  // the neon show logo
  const logo = G(back); tr(logo, 335, 162);
  E('rect', { x: -224, y: -50, width: 448, height: 100, rx: 18, fill: '#1A0B36', stroke: AS.neon, 'stroke-width': 4 }, logo);
  const l1 = T(logo, 0, -10, "SINGAPORE'S MOST", { size: 28, weight: 800, anchor: 'middle', fill: '#FFC2E8', ls: 2 });
  const l2 = T(logo, 0, 32, 'AVERAGE FAMILY', { size: 40, weight: 800, anchor: 'middle', fill: AS.gold, ls: 3 });
  [l1, l2].forEach(w => { w.setAttribute('stroke', '#5A1050'); w.setAttribute('stroke-width', 5); w.setAttribute('paint-order', 'stroke'); });
  g.logo = logo;
  // the small scoreboard
  const board = asMiniBoard(back); tr(board, 612, 22);
  g.board = board;
  // APPLAUSE sign
  const ap = G(back); tr(ap, 600, 252);
  const apBox = E('rect', { x: -120, y: -26, width: 240, height: 52, rx: 10, fill: '#3A0E14', stroke: '#8A2A34', 'stroke-width': 4 }, ap);
  const apT = T(ap, 0, 11, 'APPLAUSE', { size: 30, weight: 800, anchor: 'middle', fill: '#8A3A44', ls: 4 });
  g.applause = ap;
  ap.set = p => { p = clamp(p); attr(apBox, 'fill', p > 0.5 ? '#E8303E' : '#3A0E14'); attr(apT, 'fill', p > 0.5 ? '#FFFFFF' : '#8A3A44'); };
  // characters go here
  g.mid = G(g);
  // the contestants' desk
  const front = G(g);
  E('rect', { x: 50, y: 516, width: 1100, height: 28, rx: 8, fill: '#E9D7FF', stroke: '#2A1150', 'stroke-width': 4 }, front);
  E('rect', { x: 60, y: 544, width: 1080, height: 206, fill: linGrad('#5B2A9E', '#2A1150', true), stroke: '#1A0B36', 'stroke-width': 4 }, front);
  [655, 905].forEach(x => E('rect', { x, y: 544, width: 10, height: 206, fill: '#1A0B36' }, front));
  const bulbs = [];
  for (let i = 0; i < 27; i++) bulbs.push(E('circle', { cx: 80 + i * 40, cy: 560, r: 6, fill: AS.gold }, front));
  const plate = (x, w, txt, col) => {
    const p = G(front); tr(p, x, 612);
    E('rect', { x: -w / 2, y: -30, width: w, height: 60, rx: 12, fill: '#120A26', stroke: col, 'stroke-width': 4 }, p);
    T(p, 0, 11, txt, { size: 30, weight: 800, anchor: 'middle', fill: col, ls: 2 });
    return p;
  };
  g.plates = { kavya: plate(330, 300, 'TEAM KAVYA', '#7FD3FF'), priya: plate(780, 210, 'TEAM PRIYA', '#FFC2E8'), tan: plate(1022, 200, 'TEAM TAN', '#C8F59A') };
  g.front = front;
  g.top = G(g);
  g.deskY = 530;
  g.upd = t => {
    bulbs.forEach((b, i) => op(b, (Math.floor(t * 6) + i) % 3 === 0 ? 1 : 0.35));
    spots.forEach((s, i) => tr(s, i ? 940 : 260, -20, 1, Math.sin(t * 0.7 + i * 2) * 8));
  };
  g.upd(0);
  return g;
}

function asBoardShot(parent) {
  const g = G(parent), labs = ['MEAN', 'MEDIAN', 'MODE', 'RANGE'], cols = ['#FFC93C', '#3FA463', '#FF5FC8', '#FFD23C'];
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#0C061C', '#24104A', true) }, g);
  E('rect', { x: 26, y: 100, width: 1148, height: 604, rx: 22, fill: '#120A26', stroke: AS.gold, 'stroke-width': 7 }, g);
  const vals = [], glows = [];
  g.slots = [];
  for (let i = 0; i < 4; i++) {
    const x = 44 + i * 280, w = 268;
    glows.push(E('rect', { x: x - 6, y: 112, width: w + 12, height: 580, rx: 18, fill: cols[i], opacity: 0 }, g));
    E('rect', { x, y: 118, width: w, height: 568, rx: 14, fill: '#24124A', stroke: '#6A3CC8', 'stroke-width': 4 }, g);
    E('rect', { x: x + 14, y: 132, width: w - 28, height: 54, rx: 10, fill: cols[i] }, g);
    T(g, x + w / 2, 172, labs[i], { size: 36, weight: 800, anchor: 'middle', fill: '#1A0B36', ls: 3 });
    E('rect', { x: x + 14, y: 200, width: w - 28, height: 370, rx: 12, fill: '#170A30' }, g);
    E('rect', { x: x + 30, y: 590, width: w - 60, height: 80, rx: 10, fill: '#0A0614', stroke: '#3A2A5A', 'stroke-width': 3 }, g);
    vals.push(T(g, x + w / 2, 648, '', { size: 52, weight: 800, anchor: 'middle', fill: AS.led }));
    g.slots.push({ x: x + w / 2, y: 390 });
  }
  g.set = (i, s) => setText(vals[i], s);
  g.lit = (i, p) => op(glows[i], clamp(p) * 0.85);
  return g;
}

function asScreen(parent, w, h, o) {
  o = o || {};
  const g = G(parent);
  E('rect', { x: -w / 2 - 22, y: -h / 2 - 22, width: w + 44, height: h + 44, rx: 26, fill: '#3A1670', stroke: AS.gold, 'stroke-width': 5 }, g);
  const bulbs = [];
  const n = Math.max(4, Math.round(w / 70));
  for (let i = 0; i <= n; i++) [-1, 1].forEach(s => bulbs.push(E('circle', { cx: -w / 2 + i * w / n, cy: s * (h / 2 + 11), r: 5, fill: AS.gold }, g)));
  E('rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: 12, fill: AS.paper }, g);
  let top = -h / 2;
  if (o.title) {
    E('rect', { x: -w / 2, y: -h / 2, width: w, height: 52, rx: 12, fill: AS.gold }, g);
    E('rect', { x: -w / 2, y: -h / 2 + 40, width: w, height: 12, fill: AS.gold }, g);
    g.titleText = T(g, 0, -h / 2 + 37, o.title, { size: 30, weight: 800, anchor: 'middle', fill: '#2A1150', ls: 1 });
    top += 52;
  }
  g.area = { x: -w / 2 + 20, y: top + 14, w: w - 40, h: h / 2 - top - 28 };
  g.content = G(g);
  g.upd = t => bulbs.forEach((b, i) => op(b, (Math.floor(t * 4) + i) % 4 === 0 ? 1 : 0.4));
  return g;
}
