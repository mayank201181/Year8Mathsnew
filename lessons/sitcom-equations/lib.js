/* BALANCING ACT (Claude Sitcom Ep 10, Equations & Inequalities): the cast, sets and props of this episode.
   Bundled after engine lib.js, kit.js, mathkit.js and sitcom.js (scMake, scTalk, scKavya, scCastHuman,
   scConfessional, scLowerThird, scVideoCall, mk* maths kit). Every top-level name starts with `eq`, except `cast`.

   Characters: cast(parent, kind, o) -> g, origin at the character's centre, about 200-260 px tall at s = 1
     o: { s (scale), mood (default mood), ... }   (humans: any scHuman option overrides, e.g. prop, lift)
     g.set({ t, talk, mood, look, sweat, still, ... })   call every frame
       talk 0..1 (use scTalk(S, t, who)); mood: neutral | happy | smug | annoyed | sad | shock | deadpan
       look -1..1 pupils left/right; still: true stops the idle bob
     HUMANS (busts, bottom of the shirt at y = 140: put them behind the room's table, g.mid of eqRoom, or the frame edge)
       'kavya'  (kavya)  Kavya, 12 (scKavya, PE shirt "8")
       'mum'    (mum)    Mum: magenta kurta, bun, bindi. Default prop: a clue card ('paper')
       'dad'    (dad)    Dad: glasses, moustache, green polo. Default: an empty hand (lift: 1 raises it, for typing SEVEN)
       'boy'    (boy)    Ah Boy, 8: orange star tee. Default: an empty hand
       'priya'  (priya)  Priya, 12, the birthday girl: purple tee, bob, yellow clip, a striped PARTY HAT. Default prop: a pencil
       'tan'    (tan)    Mr Tan, maths teacher and weekend GAME MASTER: shirt and tie, glasses, a headset microphone.
                         Default prop: none (pass { prop: 'marker' } etc.). On the CCTV screen use eqMonitor (below).
       Pass { prop: null } for no prop; { body: true } for a full body (scHumanBody, feet at 0,0; pose API).
     CARTOONS (scMake):
       'ex'     (ex)     Ex, THE UNKNOWN: a round navy figure in a black fedora, a high-collared purple cape and a black
                         domino mask; a gold badge on his chest shows an italic x. Theatrical. Default mood smug.
                         Extra: g.set({ unmask: 0..1, val: '5' }) lifts the mask off (it flies up and fades) and the badge
                         turns from x to val (any short text: '5', '−1.5', '4'); { cape: -1..1 } swishes the cape.
       'ymad'   (ymad)   Madame Y, Ex's partner: the same build in teal and pink, a beret instead of the fedora, a pink
                         feather boa, a beauty spot, badge y. Same extras (unmask, val, cape).
       'judge'  (judge)  Judge Even, THE BALANCE METHOD: a brass balance scale in a white judge's wig and a black robe;
                         her round brass head sits on the pillar, the beam is her shoulders, two pans hang from it.
                         Default mood deadpan. Extra: { tilt: -1..1 } tips the beam (+1: the right pan goes DOWN;
                         use it on every unfair move), { bang: 0..1 } her gavel arm (0 raised, 1 struck: drive it with
                         P() so it lands on the beat). Pans are g.panL / g.panR (put small props on them, origin = pan top).
       'dee'    (dee)    Dee, the DISTRIBUTIVE LAW: a cardboard parcel with a face, an orange rider's helmet, tape, a
                         "× EVERY TERM" label, little arms and sneakers. Fast. Default happy.
                         Extra: { wave: 0..1 } waves the right arm (holding a letter).
       'wiper'  (wiper)  Wiper, CLEARS FRACTIONS: a blue squeegee head with a face, black rubber blade on top, a yellow
                         handle below, little arms, a cloth; a "× LCM" sticker. Cheerful. Default happy.
                         Extra: { wipe: 0..1 } swings the cloth arm.
       'croc'   (croc)   Snappy, THE INEQUALITY SIGN: a green crocodile head seen side-on whose open jaws make a "<"
                         (the hinge, the POINTY END, at the left; the open mouth, facing the BIGGER number, at the right).
                         Default happy. Extra: { snap: 0..1 } opens the jaws wider (talk opens them a little anyway);
                         { belt: 0..1 } shows the brown belt line under him: the line under "≤" ("a line underneath fills
                         the circle in"). To show ">" FLIP him: tr(g, x, y, s, 180) (a backflip; animate the angle
                         0 -> 180 on "I flip!"). Upside down is the joke.

   Shots
     eqConf(parent, who)             confessional background tinted for that character (scConfessional); g.set(p, t)
     EQ_TINT                         the confessional colours per character
     eqLowerThird(parent, who)       scLowerThird with this episode's name and role for `who` (EQ_LT); g.set(p)

   Sets (full stage 1200 x 750; each returns g)
     eqLobby(parent)      the escape-room lobby in Bugis: dark purple walls, neon sign THE VAULT OF X with a padlock
                          (g.neon, centre 740, 168), the LEADERBOARD on the left (x 40-310, y 210-470; record 51:12),
                          the wall clock above the door (g.clock, an eqClock, at 1085, 254), the door into ROOM 1
                          (x 990-1180; g.keypad at 1085, 470), and the front desk "ESCAPE IN 60 MINUTES" (g.deskText; layers
                          g.mid / g.front / g.top; g.counterY 530). g.upd(t) flickers the neon. No CCTV screen in
                          the lobby: cut to a full-stage eqMonitor for Mr Tan.
     eqRoom(parent, kind)  one escape room, the same layout for all eight: brick walls in the room's colour, a plaque
                          with the room's name at the top centre-right (x 600-990, y 26-92), the countdown clock
                          (g.clock) above the exit door, the exit door on the right (x 1010-1170) with its keypad
                          (g.keypad, centre about 1090, 420), a pendant lamp, room decor on the back wall, and a long
                          wooden table across the front (top at g.counterY = 530; x 30-990).
                          LAYERS: characters in g.mid (busts at y about 440 hide their shirt hem behind the table),
                          the table is g.front, props standing on the table go in g.top (drawn last).
                          kind: 'scales' | 'post' | 'bike' | 'glass' | 'library' | 'laser' | 'vending' | 'vault'
                          (EQ_ROOMS has each room's name, colours and decor). g.decor (the decor group: op() it to clear
                          the wall for a board). g.upd(t) swings the lamp a little and runs any animated decor
                          (laser beams pulse in 'laser').
     Write maths on a board in front of the wall: mkWhiteboard, or eqCard (below), typically x 560-990, y 110-500.

   Props (around their own origin)
     eqKeypad(parent, o)             the door's keypad lock, centred, 150 x 240: a display, 12 keys, a status light.
                                     g.set(text, state): state 0 idle (amber), 1 OPEN (green, "OPEN"), -1 WRONG (red
                                     flash, "WRONG"). text changes are cheap (setText on change only). g.press(k, p)
                                     lights key k ('0'..'9') for p > 0.
     eqClock(parent, o)              red LED countdown in a black case, centred, 230 x 90. g.set(seconds) shows MM:SS.
                                     o: { s }.
     eqMonitor(parent, w, h, o)      the GAME MASTER CCTV screen (scVideoCall, label 'GAME MASTER · LIVE'), centred, with
                                     Mr Tan's bust (headset) inside: g.tan (use g.tan.set). o: { label }. A blinking LIVE
                                     dot: g.upd(t).
     eqCard(parent, w, h, o)         a clue card / whiteboard panel for maths, centred: cream paper, a red top rule, a
                                     padlock doodle, title o.title. g.ink is the writing colour (MK.ink). g.area {x,y,w,h}.
     eqStamp(parent, ok)             mkStamp 'BALANCED' (green, ok true) or 'TIPPED!' (red); g.set(p). It is about
                                     500 px wide at scale 1: scale the returned g (tr(g, x, y, 0.6)).
     eqBag(parent, o)                a mystery sack with a big italic x on it, base centre at (0,0), about 90 tall. o: { s, label }
     eqWeight(parent, label, o)      an iron weight, base centre at (0,0), about 80 tall, label e.g. '4 kg'. o: { s, w }
     eqPadlock(parent, o)            a padlock, centred, about 90 tall; g.set(open 0..1) lifts the shackle. o: { s, col }
     eqGavel(parent, o)              a judge's gavel, the head at (0,0), handle pointing down-right; o: { s }
*/

/* ---------- confessional tints, lower thirds ---------- */
const EQ_TINT = {
  ex: ['#140F2A', '#2E2160'], ymad: ['#0F2A2A', '#1E5A58'], judge: ['#2A1F0E', '#5A4420'], dee: ['#2A1A0C', '#6B3E14'],
  wiper: ['#0E2236', '#1E4E7A'], croc: ['#0F2A16', '#1F5A2E'], kavya: ['#14243A', '#25446B'], mum: ['#3A1030', '#6B1E58'],
  dad: ['#123026', '#245A48'], boy: ['#3A2410', '#6B4414'], priya: ['#24163D', '#4B2C7A'], tan: ['#1A2A3A', '#33506E'],
};
function eqConf(parent, who) { const c = EQ_TINT[who] || EQ_TINT.ex; return scConfessional(parent, c[0], c[1]); }
const EQ_LT = {
  ex: ['EX', 'The unknown. You\'ll never find him.'],
  ymad: ['MADAME Y', 'The second unknown. Ex\'s partner.'],
  judge: ['JUDGE EVEN', 'The balance method. Strictly fair.'],
  dee: ['DEE', 'Delivers to every term in the bracket.'],
  wiper: ['WIPER', 'Clears fractions. Every term.'],
  croc: ['SNAPPY', 'The inequality sign. Bites the bigger one.'],
  kavya: ['KAVYA, 12', 'Escaping. Probably.'],
  mum: ['MUM', "Kavya's mum. Checks everything."],
  dad: ['DAD', '"The code is seven."'],
  boy: ['AH BOY, 8', "Kavya's brother. Exactly 120 cm."],
  priya: ['PRIYA', 'Best friend. Birthday girl.'],
  tan: ['MR TAN', 'Maths teacher. Weekend Game Master.'],
};
function eqLowerThird(parent, who) { const l = EQ_LT[who] || [String(who).toUpperCase(), '']; return scLowerThird(parent, l[0], l[1]); }

/* ---------- the cast ---------- */
const EQ_PROP = { mum: 'paper', dad: null, boy: null, priya: 'pencil', tan: null };
function eqPartyHat(c) {
  // a striped birthday cone on Priya's head, in the bobbing group so it moves with her
  const inner = c.firstChild, hat = G(inner); tr(hat, 18, c.top + 22, 1, 14);
  E('path', { d: 'M-30,0 L0,-78 L30,0 Z', fill: '#FF6FA8', stroke: SC_INK, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, hat);
  E('path', { d: 'M-21,-24 L15,-40 M-12,-48 L8,-58 M-26,-8 L24,-14', stroke: '#FFE45C', 'stroke-width': 6, 'stroke-linecap': 'round' }, hat);
  E('circle', { cx: 0, cy: -80, r: 9, fill: '#FFE45C', stroke: SC_INK, 'stroke-width': 2.5 }, hat);
  return hat;
}
function eqHeadset(c) {
  // Mr Tan's game-master headset: a band over the head and a boom mic
  const inner = c.firstChild, hs = G(inner), hy = c.head[1];
  E('path', { d: `M-66,${hy - 6} Q-66,${hy - 92} 0,${hy - 94} Q66,${hy - 92} 66,${hy - 6}`, fill: 'none', stroke: '#2A3440', 'stroke-width': 8 }, hs);
  E('rect', { x: -80, y: hy - 22, width: 22, height: 40, rx: 8, fill: '#2A3440', stroke: SC_INK, 'stroke-width': 2.5 }, hs);
  E('path', { d: `M-70,${hy + 14} Q-60,${hy + 56} -18,${hy + 58}`, fill: 'none', stroke: '#2A3440', 'stroke-width': 5, 'stroke-linecap': 'round' }, hs);
  E('circle', { cx: -16, cy: hy + 58, r: 7, fill: '#E8424F', stroke: SC_INK, 'stroke-width': 2 }, hs);
  return hs;
}

/* Ex and Madame Y share one build */
function eqUnknown(parent, o, isY) {
  const P0 = isY
    ? { body: '#2FA39A', dark: '#14635C', cape: '#E85FA0', capeIn: '#8E1E58', hat: '#C2185B', badge: 'y', iris: '#14635C' }
    : { body: '#3B4A9E', dark: '#1E2660', cape: '#6A3CD8', capeIn: '#2E1A6B', hat: '#1A1A24', badge: 'x', iris: '#1E2660' };
  let cape = null, mask = null, bx = null, bv = null, lastV = null;
  const c = scMake(parent, { s: o.s, seed: isY ? 33 : 29, bob: 4, mood: o.mood || 'smug',
    draw: g => {
      // the cape, behind the body (pivot at the collar)
      cape = G(g); tr(cape, 0, -20);
      E('path', { d: 'M-70,0 Q-128,90 -116,142 L116,142 Q128,90 70,0 Z', fill: P0.capeIn, stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, cape);
      E('path', { d: 'M-70,0 Q-124,88 -112,142 L-70,142 Q-80,80 -50,6 Z M70,0 Q124,88 112,142 L70,142 Q80,80 50,6 Z', fill: P0.cape, stroke: SC_INK, 'stroke-width': 3 }, cape);
      // the body: a round bean
      E('ellipse', { cx: 0, cy: 22, rx: 82, ry: 100, fill: ball(mkShade(P0.body, 0.25), P0.dark), stroke: SC_INK, 'stroke-width': 5 }, g);
      E('ellipse', { cx: -30, cy: -44, rx: 16, ry: 9, fill: '#FFFFFF', opacity: 0.22 }, g);
      // high collar
      E('path', { d: 'M-74,-6 L-96,-58 L-40,-24 Z M74,-6 L96,-58 L40,-24 Z', fill: P0.cape, stroke: SC_INK, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, g);
      // badge on the chest: x (or y), swapped for the value when unmasked
      const bd = G(g); tr(bd, 0, 76);
      E('circle', { r: 30, fill: ball('#FFE45C', '#C98A10'), stroke: SC_INK, 'stroke-width': 3.5 }, bd);
      bx = T(bd, 0, 13, P0.badge, { size: 46, weight: 700, anchor: 'middle', fill: '#5A3A00', font: "'Times New Roman', Georgia, serif" });
      bx.setAttribute('font-style', 'italic');
      bv = T(bd, 0, 11, '5', { size: 32, weight: 800, anchor: 'middle', fill: '#5A3A00' });
      op(bv, 0);
      // hat
      const hat = G(g); tr(hat, 0, -78);
      if (isY) {
        E('ellipse', { cx: 10, cy: -2, rx: 70, ry: 22, fill: P0.hat, stroke: SC_INK, 'stroke-width': 4 }, hat);   // beret
        E('path', { d: 'M8,-22 L14,-38', stroke: SC_INK, 'stroke-width': 5, 'stroke-linecap': 'round' }, hat);
        // feather boa around the neck
        const boa = G(g);
        for (let i = 0; i < 9; i++) E('circle', { cx: -72 + i * 18, cy: 4 + Math.sin(i * 1.3) * 6, r: 14, fill: i % 2 ? '#FF8FC8' : '#FFB3DA', stroke: '#C2185B', 'stroke-width': 2 }, boa);
      } else {
        E('path', { d: 'M-80,8 Q0,-6 80,8 Q60,22 0,20 Q-60,22 -80,8 Z', fill: P0.hat, stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, hat);   // brim
        E('path', { d: 'M-46,8 L-40,-46 Q0,-30 40,-46 L46,8 Z', fill: P0.hat, stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, hat);
        E('rect', { x: -45, y: -8, width: 90, height: 12, fill: '#6A3CD8' }, hat);   // band
      }
    },
    face: { x: 0, y: -22, eye: 15, gap: 50, mouthW: 30, mouthY: 40, lidCol: P0.dark, iris: P0.iris },
    upd: (t, g, st) => {
      const u = clamp(st.unmask || 0), cs = st.cape || 0;
      tr(cape, 0, -20, 1, cs * 6);
      if (mask) { tr(mask, 0, -24 - 120 * easeIn(u), 1, -40 * u); op(mask, 1 - clamp((u - 0.55) / 0.4)); }
      const v = st.val === undefined ? '' : String(st.val);
      if (v !== lastV) { setText(bv, v); lastV = v; attr(bv, 'font-size', v.length > 3 ? 22 : v.length > 2 ? 26 : 32); }
      const sw = u > 0.5 && v !== '' ? 1 : 0;
      op(bx, 1 - sw); op(bv, sw);
    } });
  // the domino mask, over the eyes, with eye holes (drawn after the face kit, so in front of it)
  const inner = c.firstChild; mask = G(inner); tr(mask, 0, -24);
  E('path', { d: 'M-66,-6 Q-62,-24 -30,-22 Q0,-14 30,-22 Q62,-24 66,-6 Q64,18 34,18 Q12,18 0,6 Q-12,18 -34,18 Q-64,18 -66,-6 Z M-40,2 A15,16 0 1 0 -10,2 A15,16 0 1 0 -40,2 Z M10,2 A15,16 0 1 0 40,2 A15,16 0 1 0 10,2 Z',
    fill: isY ? '#2A0E1E' : '#101018', 'fill-rule': 'evenodd', stroke: SC_INK, 'stroke-width': 3 }, mask);
  E('path', { d: 'M-66,-6 Q-90,-14 -100,6 M66,-6 Q90,-14 100,6', fill: 'none', stroke: isY ? '#2A0E1E' : '#101018', 'stroke-width': 4 }, mask);   // ties
  if (isY) E('circle', { cx: 26, cy: 32, r: 3.5, fill: SC_INK }, inner);   // beauty spot
  c.set({});
  return c;
}

function cast(parent, kind, o) {
  o = o || {};
  if (kind === 'kavya') return scKavya(parent, o);
  if (SC_HUMANS[kind]) {
    const base = kind === 'boy' || kind === 'dad' ? { hand: true } : { prop: EQ_PROP[kind] };
    if (kind === 'priya') Object.assign(base, { style: 'tee', shirt: '#8E5BD8', logo: '★', logoCol: '#FFE45C' });
    const p = Object.assign(base, o);
    const c = scCastHuman(parent, kind, p);
    if (kind === 'priya' && o.hat !== false) c.hat = eqPartyHat(c);
    if (kind === 'tan' && o.headset !== false) c.headset = eqHeadset(c);
    return c;
  }
  const S = { s: o.s, mood: o.mood };
  let c;
  if (kind === 'ex') c = eqUnknown(parent, o, false);
  else if (kind === 'ymad') c = eqUnknown(parent, o, true);
  else if (kind === 'judge') {
    let beam = null, panL = null, panR = null, arm = null;
    const BRASS = '#D9A93A';
    c = scMake(parent, Object.assign(S, { seed: 41, bob: 2, mood: o.mood || 'deadpan',
      draw: g => {
        // wooden base and the robe draped on the pillar
        E('path', { d: 'M-96,128 L96,128 L80,104 L-80,104 Z', fill: linGrad('#8A5A30', '#5A3618', true), stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
        E('path', { d: 'M-40,-8 Q-74,50 -70,106 L70,106 Q74,50 40,-8 Z', fill: '#1E1E28', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
        E('path', { d: 'M-12,-6 L12,-6 L8,40 L-8,40 Z', fill: BRASS, stroke: SC_INK, 'stroke-width': 2.5 }, g);   // the pillar between the robe flaps
        E('path', { d: 'M-18,-6 L0,30 L18,-6 Z', fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 2.5 }, g);   // white jabot (bands)
        // the beam (her shoulders) with the two pans
        beam = G(g); tr(beam, 0, -14);
        E('rect', { x: -132, y: -8, width: 264, height: 16, rx: 8, fill: BRASS, stroke: SC_INK, 'stroke-width': 3.5 }, beam);
        const pan = sd => {
          const p = G(g);
          E('path', { d: 'M0,0 L-40,70 M0,0 L40,70', stroke: '#8F7A44', 'stroke-width': 3 }, p);
          E('path', { d: 'M-54,70 L54,70 Q46,92 0,92 Q-46,92 -54,70 Z', fill: mkShade(BRASS, 0.12), stroke: SC_INK, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, p);
          E('circle', { r: 7, fill: BRASS, stroke: SC_INK, 'stroke-width': 2.5 }, p);
          p.top = G(p); tr(p.top, 0, 70);
          return p;
        };
        panL = pan(-1); panR = pan(1);
        // the gavel arm, from the robe at the right
        arm = G(g); tr(arm, 46, 40);
        E('path', { d: 'M0,0 L40,-30', stroke: '#1E1E28', 'stroke-width': 14, 'stroke-linecap': 'round' }, arm);
        const gv = G(arm); tr(gv, 44, -34, 1, -20);
        E('rect', { x: -4, y: -46, width: 9, height: 50, rx: 4, fill: '#8A5A30', stroke: SC_INK, 'stroke-width': 2.5 }, gv);
        E('rect', { x: -24, y: -66, width: 48, height: 24, rx: 8, fill: '#6B3E1E', stroke: SC_INK, 'stroke-width': 3 }, gv);
        E('circle', { cx: 0, cy: 0, r: 8, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 2.5 }, arm);
        // the head: a round brass disc on the pillar, in a judge's wig
        E('rect', { x: -10, y: -52, width: 20, height: 40, fill: BRASS, stroke: SC_INK, 'stroke-width': 3 }, g);
        const wig = G(g);
        [-1, 1].forEach(sd => { for (let i = 0; i < 4; i++) E('ellipse', { cx: sd * 66, cy: -98 + i * 22, rx: 22, ry: 14, fill: '#F4F1E8', stroke: SC_INK, 'stroke-width': 3 }, wig); });
        E('circle', { cx: 0, cy: -104, r: 62, fill: ball('#F2CF6B', '#A8781E'), stroke: SC_INK, 'stroke-width': 5 }, g);
        E('path', { d: 'M-60,-120 Q-58,-178 0,-178 Q58,-178 60,-120 Q40,-150 0,-150 Q-40,-150 -60,-120 Z', fill: '#F4F1E8', stroke: SC_INK, 'stroke-width': 3.5 }, g);
        [-36, -12, 12, 36].forEach(x => E('path', { d: `M${x - 10},-160 Q${x},-170 ${x + 10},-160`, fill: 'none', stroke: '#C9C3B4', 'stroke-width': 3 }, g));
        E('ellipse', { cx: -26, cy: -132, rx: 14, ry: 8, fill: '#FFFFFF', opacity: 0.35 }, g);
      },
      face: { x: 0, y: -100, eye: 14, gap: 46, mouthW: 30, mouthY: 34, lidCol: '#C9962E' },
      upd: (t, g, st) => {
        const a = clamp(st.tilt || 0, -1, 1) * 14, r = a * Math.PI / 180, dx = Math.cos(r) * 120, dy = Math.sin(r) * 120;
        tr(beam, 0, -14, 1, a);
        tr(panL, -dx, -14 - dy); tr(panR, dx, -14 + dy);
        const b = clamp(st.bang || 0);
        tr(arm, 46, 40, 1, lerp(-55, 35, b));
      } }));
    c.panL = panL.top; c.panR = panR.top;
  } else if (kind === 'dee') {
    let armR = null;
    c = scMake(parent, Object.assign(S, { seed: 45, bob: 6, mood: o.mood || 'happy',
      draw: g => {
        // sneakers and legs
        [-40, 40].forEach(x => {
          E('path', { d: `M${x},70 L${x},104`, stroke: SC_INK, 'stroke-width': 8, 'stroke-linecap': 'round' }, g);
          E('path', { d: `M${x - 12},112 Q${x - 12},100 ${x + 4},100 L${x + 22},102 Q${x + 28},112 ${x + 20},114 Z`, fill: '#2FA36B', stroke: SC_INK, 'stroke-width': 3 }, g);
        });
        // left arm
        E('path', { d: 'M-92,6 Q-122,30 -114,64', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
        E('circle', { cx: -114, cy: 68, r: 10, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
        // the parcel
        E('rect', { x: -92, y: -70, width: 184, height: 144, rx: 8, fill: linGrad('#E2B07A', '#C48A50', true), stroke: SC_INK, 'stroke-width': 5 }, g);
        E('path', { d: 'M-92,-70 L-70,-92 L114,-92 L92,-70 Z', fill: '#EDC495', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
        E('path', { d: 'M92,-70 L114,-92 L114,52 L92,74 Z', fill: '#A8743E', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
        E('rect', { x: -12, y: -70, width: 24, height: 144, fill: '#D9C08A', opacity: 0.9 }, g);   // tape
        const lb = G(g); tr(lb, -48, 48);
        E('rect', { x: -38, y: -16, width: 76, height: 32, rx: 4, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 2.5 }, lb);
        T(lb, 0, 9, '× ALL', { size: 20, weight: 800, anchor: 'middle', fill: '#C62828' });
        // rider's helmet
        const hm = G(g); tr(hm, 10, -92);
        E('path', { d: 'M-70,6 Q-70,-62 0,-64 Q70,-62 70,6 Z', fill: ball('#FFB347', '#E8751A'), stroke: SC_INK, 'stroke-width': 4 }, hm);
        E('path', { d: 'M-70,6 L74,6', stroke: SC_INK, 'stroke-width': 5, 'stroke-linecap': 'round' }, hm);
        E('path', { d: 'M-30,-56 Q0,-40 30,-56', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 5, opacity: 0.7 }, hm);
        // right arm (animated) holding a letter
        armR = G(g); tr(armR, 92, 0);
        E('path', { d: 'M0,0 Q28,-10 34,-40', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, armR);
        const env = G(armR); tr(env, 38, -58, 1, 12);
        E('rect', { x: -22, y: -15, width: 44, height: 30, rx: 3, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 2.5 }, env);
        E('path', { d: 'M-22,-15 L0,2 L22,-15', fill: 'none', stroke: SC_INK, 'stroke-width': 2 }, env);
        E('circle', { cx: 34, cy: -42, r: 10, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, armR);
      },
      face: { x: -6, y: -20, eye: 16, gap: 54, mouthW: 34, mouthY: 30, lidCol: '#C48A50' },
      upd: (t, g, st) => { const w = st.wave || 0; tr(armR, 92, 0, 1, -w * (20 + 14 * Math.sin(t * TAU * 2.2))); } }));
  } else if (kind === 'wiper') {
    let armR = null;
    c = scMake(parent, Object.assign(S, { seed: 49, bob: 5, mood: o.mood || 'happy',
      draw: g => {
        // the handle
        E('rect', { x: -12, y: 40, width: 24, height: 100, rx: 10, fill: linGrad('#FFE45C', '#E2A21C', false), stroke: SC_INK, 'stroke-width': 4 }, g);
        // left arm on the handle
        E('path', { d: 'M-80,10 Q-60,60 -14,74', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
        E('circle', { cx: -14, cy: 76, r: 10, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
        // the head: blue plastic holder with the black rubber blade on top
        E('rect', { x: -120, y: -66, width: 240, height: 112, rx: 30, fill: ball('#6EC8FF', '#1E6FB8'), stroke: SC_INK, 'stroke-width': 5 }, g);
        E('rect', { x: -132, y: -84, width: 264, height: 24, rx: 8, fill: '#2A2A30', stroke: SC_INK, 'stroke-width': 4 }, g);
        E('path', { d: 'M-120,-78 L120,-78', stroke: '#6A6A74', 'stroke-width': 3 }, g);
        const st = G(g); tr(st, 76, 22, 1, -8);
        E('rect', { x: -32, y: -14, width: 64, height: 28, rx: 6, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 2.5 }, st);
        T(st, 0, 8, '× LCM', { size: 18, weight: 800, anchor: 'middle', fill: '#1E6FB8' });
        // right arm (animated) with a cloth
        armR = G(g); tr(armR, 110, 0);
        E('path', { d: 'M0,0 Q30,-6 40,-34', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, armR);
        E('path', { d: 'M28,-52 Q44,-64 60,-52 L64,-30 Q48,-22 32,-30 Z', fill: '#FFC94A', stroke: SC_INK, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, armR);
        E('circle', { cx: 40, cy: -36, r: 10, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, armR);
        // a few soap bubbles
        [[-136, -100, 9], [-150, -70, 6], [138, -110, 7]].forEach(([x, y, r]) => E('circle', { cx: x, cy: y, r, fill: 'rgba(255,255,255,0.5)', stroke: '#9FD8FF', 'stroke-width': 2 }, g));
      },
      face: { x: -18, y: -14, eye: 16, gap: 56, mouthW: 36, mouthY: 30, lidCol: '#3E8ED0' },
      upd: (t, g, st) => { const w = st.wipe || 0; tr(armR, 110, 0, 1, w * 30 * Math.sin(t * TAU * 1.6)); } }));
  } else if (kind === 'croc') {
    let up = null, lo = null, belt = null;
    const GR = '#3FA34D', GRD = '#21662B';
    c = scMake(parent, Object.assign(S, { seed: 53, bob: 3, mood: o.mood || 'happy',
      draw: g => {
        // the belt line under him (the line under "≤")
        belt = G(g); tr(belt, 0, 112);
        E('rect', { x: -130, y: -10, width: 270, height: 20, rx: 8, fill: '#8A5A30', stroke: SC_INK, 'stroke-width': 3.5 }, belt);
        E('rect', { x: -14, y: -14, width: 28, height: 28, rx: 4, fill: 'none', stroke: '#FFC247', 'stroke-width': 5 }, belt);
        // throat (behind the jaws)
        E('path', { d: 'M-112,-10 Q-90,-40 -60,-20 L-60,20 Q-90,40 -112,10 Z', fill: '#8E1E2A', stroke: SC_INK, 'stroke-width': 3 }, g);
        // the jaws, both hinged at (-100, 0)
        const jaw = (top) => {
          const j = G(g);
          const sgn = top ? -1 : 1;
          E('path', { d: `M0,${sgn * 2} L210,${sgn * 2} Q236,${sgn * 6} 232,${sgn * 30} Q190,${sgn * 50} 0,${sgn * 52} Q-26,${sgn * 30} 0,${sgn * 2} Z`, fill: top ? ball('#5CC468', GRD) : linGrad('#9BD67E', GR, true), stroke: SC_INK, 'stroke-width': 4.5, 'stroke-linejoin': 'round' }, j);
          // teeth along the inner edge
          let d = '';
          for (let i = 0; i < 8; i++) { const x = 28 + i * 24; d += `M${x},${sgn * 2} L${x + 8},${-sgn * 14} L${x + 16},${sgn * 2} Z `; }
          E('path', { d, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 2, 'stroke-linejoin': 'round' }, j);
          if (top) {
            // scutes and nostrils on the upper jaw, and the eye bump
            [40, 80, 120, 160].forEach(x => E('ellipse', { cx: x, cy: -34, rx: 10, ry: 6, fill: GRD, opacity: 0.5 }, j));
            E('ellipse', { cx: 214, cy: -26, rx: 5, ry: 3, fill: SC_INK }, j);
            E('ellipse', { cx: 40, cy: -56, rx: 44, ry: 30, fill: ball('#5CC468', GRD), stroke: SC_INK, 'stroke-width': 4 }, j);
          }
          return j;
        };
        lo = jaw(false); up = jaw(true);
      },
      face: { x: -74, y: -68, eye: 13, gap: 36, mouthW: 14, mouthY: 70, lidCol: '#3FA34D' },
      upd: (t, g, st) => {
        const open = 13 + 9 * clamp(st.snap || 0) + 4 * (st.talk || 0);
        tr(up, -100, 0, 1, -open); tr(lo, -100, 0, 1, open);
        op(belt, clamp(st.belt || 0));
      } }));
  } else {
    c = scKavya(parent, o);
  }
  return c;
}

/* ---------- small props ---------- */
function eqKeypad(parent, o) {
  o = o || {};
  const g = G(parent), inner = G(g); tr(inner, 0, 0, o.s || 1);
  E('rect', { x: -75, y: -120, width: 150, height: 240, rx: 14, fill: linGrad('#4A5560', '#2A3038', true), stroke: SC_INK, 'stroke-width': 4 }, inner);
  E('rect', { x: -62, y: -106, width: 124, height: 46, rx: 6, fill: '#0E1A14', stroke: '#6A7884', 'stroke-width': 2 }, inner);
  const disp = T(inner, 0, -72, '', { size: 28, weight: 800, anchor: 'middle', fill: '#FFC247', font: "'Courier New', monospace" });
  const keys = {};
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '−', '0', '#'].forEach((k, i) => {
    const x = -44 + (i % 3) * 44, y = -34 + Math.floor(i / 3) * 36;
    const r = E('rect', { x: x - 17, y: y - 14, width: 34, height: 28, rx: 6, fill: '#C9D3DC', stroke: SC_INK, 'stroke-width': 2 }, inner);
    T(inner, x, y + 8, k, { size: 20, weight: 800, anchor: 'middle', fill: SC_INK });
    keys[k] = r;
  });
  const ledR = E('rect', { x: -30, y: 108, width: 60, height: 8, rx: 4, fill: '#FFC247' }, inner);
  let last = null, lastS = null, lastK = null;
  g.set = (text, state) => {
    state = state || 0;
    const t = state === 1 ? 'OPEN' : state === -1 ? 'WRONG' : String(text === undefined ? '' : text);
    if (t !== last) { setText(disp, t); last = t; attr(disp, 'font-size', t.length > 6 ? 20 : 28); }
    if (state !== lastS) {
      const col = state === 1 ? '#56D69B' : state === -1 ? '#FF4A4A' : '#FFC247';
      attr(disp, 'fill', col); attr(ledR, 'fill', col); lastS = state;
    }
  };
  g.press = (k, p) => {
    if (lastK && lastK !== k) attr(keys[lastK], 'fill', '#C9D3DC');
    if (keys[k]) { attr(keys[k], 'fill', p > 0 ? '#FFE45C' : '#C9D3DC'); lastK = k; }
  };
  g.set('');
  return g;
}

function eqClock(parent, o) {
  o = o || {};
  const g = G(parent), inner = G(g); tr(inner, 0, 0, o.s || 1);
  E('rect', { x: -115, y: -45, width: 230, height: 90, rx: 12, fill: '#101418', stroke: '#5A6670', 'stroke-width': 4 }, inner);
  E('rect', { x: -100, y: -32, width: 200, height: 64, rx: 6, fill: '#1A0A0A' }, inner);
  const ghost = T(inner, 0, 22, '88:88', { size: 58, weight: 800, anchor: 'middle', fill: '#3A1010', font: "'Courier New', monospace" });
  const txt = T(inner, 0, 22, '60:00', { size: 58, weight: 800, anchor: 'middle', fill: '#FF3B3B', font: "'Courier New', monospace" });
  void ghost;
  let last = null;
  g.set = sec => {
    sec = Math.max(0, Math.floor(sec));
    const s = String(Math.floor(sec / 60)).padStart(2, '0') + ':' + String(sec % 60).padStart(2, '0');
    if (s !== last) { setText(txt, s); last = s; }
  };
  g.set(3600);
  return g;
}

function eqMonitor(parent, w, h, o) {
  o = o || {};
  const g = scVideoCall(parent, w, h, o.label || 'GAME MASTER · LIVE');
  const sc = g.screen;
  E('rect', { x: -w / 2, y: -h / 2, width: w, height: h, fill: linGrad('#1E2A3A', '#2E4058', true) }, sc);
  // the control room behind him: screens with tiny room views
  for (let i = 0; i < 3; i++) E('rect', { x: -w / 2 + 14 + i * (w / 3), y: -h / 2 + 12, width: w / 3 - 24, height: h * 0.28, rx: 4, fill: '#33506E', stroke: '#5A7894', 'stroke-width': 2 }, sc);
  const holder = G(sc); tr(holder, 0, h * 0.2);
  g.tan = cast(holder, 'tan', { s: h / 290 });
  const live = G(g); tr(live, w / 2 - 54, -h / 2 + 22);
  E('rect', { x: -40, y: -14, width: 80, height: 28, rx: 6, fill: 'rgba(0,0,0,0.55)' }, live);
  const dot = E('circle', { cx: -24, cy: 0, r: 7, fill: '#FF3B3B' }, live);
  T(live, 6, 8, 'LIVE', { size: 18, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  g.upd = t => op(dot, Math.sin(t * TAU * 0.9) > 0 ? 1 : 0.2);
  return g;
}

function eqCard(parent, w, h, o) {
  o = o || {};
  const g = G(parent);
  E('rect', { x: -w / 2 + 7, y: -h / 2 + 9, width: w, height: h, rx: 14, fill: 'rgba(0,0,0,0.3)' }, g);
  E('rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: 14, fill: MK.paper, stroke: '#B8A27A', 'stroke-width': 4 }, g);
  let top = -h / 2 + 20;
  if (o.title) {
    T(g, -w / 2 + 28, -h / 2 + 50, o.title, { size: 30, weight: 800, fill: '#6A3CD8' });
    E('line', { x1: -w / 2 + 18, y1: -h / 2 + 66, x2: w / 2 - 18, y2: -h / 2 + 66, stroke: '#E8424F', 'stroke-width': 3 }, g);
    const pl = eqPadlock(g, { s: 0.36, col: '#6A3CD8' }); tr(pl, w / 2 - 34, -h / 2 + 36);
    top = -h / 2 + 80;
  }
  g.ink = MK.ink;
  g.area = { x: -w / 2 + 24, y: top, w: w - 48, h: h / 2 - top - 16 };
  return g;
}

function eqStamp(parent, ok) { return mkStamp(parent, ok ? 'BALANCED' : 'TIPPED!', ok ? '#1E9E5A' : '#D32F2F'); }

function eqBag(parent, o) {
  o = o || {};
  const g = G(parent), inner = G(g); tr(inner, 0, 0, o.s || 1);
  E('path', { d: 'M-40,0 Q-50,-50 -26,-74 L-16,-80 L16,-80 L26,-74 Q50,-50 40,0 Z', fill: linGrad('#E8C98A', '#C49A50', true), stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, inner);
  E('path', { d: 'M-20,-80 Q0,-96 20,-80 M-22,-74 Q0,-66 22,-74', fill: 'none', stroke: '#8A5A30', 'stroke-width': 4, 'stroke-linecap': 'round' }, inner);
  const x = T(inner, 0, -18, o.label || 'x', { size: 46, weight: 700, anchor: 'middle', fill: '#5A2A7A', font: "'Times New Roman', Georgia, serif" });
  x.setAttribute('font-style', 'italic');
  return g;
}

function eqWeight(parent, label, o) {
  o = o || {};
  const g = G(parent), inner = G(g), w = o.w || 96; tr(inner, 0, 0, o.s || 1);
  E('path', { d: 'M-16,-80 Q0,-100 16,-80', fill: 'none', stroke: '#3A4048', 'stroke-width': 8, 'stroke-linecap': 'round' }, inner);
  E('path', { d: `M${-w / 2},0 L${w / 2},0 L${w / 2 - 14},-74 L${-w / 2 + 14},-74 Z`, fill: linGrad('#8F9CAB', '#4A5560', true), stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, inner);
  T(inner, 0, -26, label || '1 kg', { size: w > 110 ? 32 : 26, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  return g;
}

function eqPadlock(parent, o) {
  o = o || {};
  const g = G(parent), inner = G(g), col = o.col || '#E2B33C'; tr(inner, 0, 0, o.s || 1);
  const sh = G(inner);
  E('path', { d: 'M-28,-10 L-28,-38 Q-28,-66 0,-66 Q28,-66 28,-38 L28,-10', fill: 'none', stroke: '#9AA6B2', 'stroke-width': 12, 'stroke-linecap': 'round' }, sh);
  E('rect', { x: -44, y: -16, width: 88, height: 70, rx: 12, fill: ball(mkShade(col, 0.25), mkShade(col, -0.35)), stroke: SC_INK, 'stroke-width': 4 }, inner);
  E('circle', { cx: 0, cy: 12, r: 9, fill: SC_INK }, inner); E('rect', { x: -3.5, y: 14, width: 7, height: 20, rx: 3, fill: SC_INK }, inner);
  g.set = p => tr(sh, 0, -22 * clamp(p));
  return g;
}

function eqGavel(parent, o) {
  o = o || {};
  const g = G(parent), inner = G(g); tr(inner, 0, 0, o.s || 1, -30);
  E('rect', { x: -5, y: 0, width: 10, height: 90, rx: 5, fill: '#8A5A30', stroke: SC_INK, 'stroke-width': 2.5 }, inner);
  E('rect', { x: -32, y: -18, width: 64, height: 30, rx: 9, fill: '#6B3E1E', stroke: SC_INK, 'stroke-width': 3 }, inner);
  return g;
}

/* ---------- sets ---------- */
const EQ_ROOMS = {
  scales:  { name: 'ROOM 1 · THE SCALES',    wall: ['#2A2440', '#3A3258'], brick: '#4A4070', acc: '#FFC247' },
  post:    { name: 'ROOM 2 · THE POST ROOM', wall: ['#3A2418', '#54362A'], brick: '#6B4A38', acc: '#FF8A3D' },
  bike:    { name: 'ROOM 3 · THE BIKE SHED', wall: ['#1E3226', '#2C4A38'], brick: '#3E6450', acc: '#56D69B' },
  glass:   { name: 'ROOM 4 · THE GLASS ROOM', wall: ['#16304A', '#24486A'], brick: '#36608A', acc: '#6EC8FF' },
  library: { name: 'ROOM 5 · THE LIBRARY',   wall: ['#3A1E1E', '#56302A'], brick: '#6E4036', acc: '#FFB86B' },
  laser:   { name: 'ROOM 6 · LASER CORRIDOR', wall: ['#0E0E18', '#1A1A2A'], brick: '#262640', acc: '#FF3B3B' },
  vending: { name: 'ROOM 7 · VENDING ROOM',  wall: ['#2A1A36', '#40284E'], brick: '#563A66', acc: '#FF6FA8' },
  vault:   { name: 'THE VAULT',              wall: ['#22262C', '#363C44'], brick: '#4A525C', acc: '#FFE45C' },
};

function eqWall(g, R) {
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad(R.wall[0], R.wall[1], true) }, g);
  let d = '';
  for (let r = 0; r < 14; r++) {
    const y = 20 + r * 40; d += `M0,${y} L1200,${y} `;
    for (let x = (r % 2) * 60; x < 1200; x += 120) d += `M${x},${y} L${x},${y + 40} `;
  }
  E('path', { d, stroke: R.brick, 'stroke-width': 3, opacity: 0.55 }, g);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: glow('#FFE9B0'), opacity: 0.12 }, g);
}

function eqDecor(g, kind, R) {
  const r = rng(kind.length * 7 + 3);
  g.anim = null;
  if (kind === 'post') {
    // a wall of pigeonhole lockers
    for (let i = 0; i < 5; i++) for (let j = 0; j < 4; j++) {
      const x = 130 + i * 92, y = 150 + j * 80;
      E('rect', { x, y, width: 84, height: 72, rx: 4, fill: '#8A6A50', stroke: '#3A2418', 'stroke-width': 3 }, g);
      E('circle', { cx: x + 70, cy: y + 36, r: 5, fill: '#E2B33C' }, g);
      T(g, x + 30, y + 44, String(i + 1 + j * 5), { size: 22, weight: 800, anchor: 'middle', fill: '#F7E9D0' });
    }
  } else if (kind === 'bike') {
    // a pegboard with tools and a hanging bike wheel
    E('rect', { x: 110, y: 140, width: 420, height: 300, rx: 8, fill: '#B98E5A', stroke: '#6B4423', 'stroke-width': 4 }, g);
    let dots = '';
    for (let x = 130; x < 520; x += 30) for (let y = 160; y < 430; y += 30) dots += `M${x},${y} h0.1 `;
    E('path', { d: dots, stroke: '#7A5A30', 'stroke-width': 6, 'stroke-linecap': 'round' }, g);
    E('circle', { cx: 270, cy: 290, r: 90, fill: 'none', stroke: '#1A1A20', 'stroke-width': 14 }, g);
    E('path', { d: 'M270,200 L270,380 M180,290 L360,290 M206,226 L334,354 M334,226 L206,354', stroke: '#9AA6B2', 'stroke-width': 3 }, g);
    E('path', { d: 'M440,170 L440,260 M420,170 L460,170 M470,300 l30,40 l-12,8 l-30,-40 Z', stroke: '#C9D3DC', 'stroke-width': 8, 'stroke-linecap': 'round', fill: '#C9D3DC' }, g);
  } else if (kind === 'glass') {
    // big windows of sky
    [[110, 130], [330, 130]].forEach(([x, y]) => {
      E('rect', { x, y, width: 200, height: 300, fill: linGrad('#8FD6FF', '#D8F2FF', true), stroke: '#E6EBEF', 'stroke-width': 10 }, g);
      E('path', { d: `M${x + 100},${y} L${x + 100},${y + 300} M${x},${y + 150} L${x + 200},${y + 150}`, stroke: '#E6EBEF', 'stroke-width': 7 }, g);
      E('path', { d: `M${x + 24},${y + 40} L${x + 60},${y + 10} M${x + 30},${y + 70} L${x + 84},${y + 26}`, stroke: '#FFFFFF', 'stroke-width': 6, opacity: 0.7, 'stroke-linecap': 'round' }, g);
    });
  } else if (kind === 'library') {
    // bookshelves
    for (let s = 0; s < 3; s++) {
      const y = 200 + s * 110;
      E('rect', { x: 100, y: y + 74, width: 460, height: 14, fill: '#6B4423', stroke: '#3A2418', 'stroke-width': 3 }, g);
      let x = 112;
      while (x < 540) {
        const w = 18 + r() * 18, h = 52 + r() * 22;
        E('rect', { x, y: y + 74 - h, width: w, height: h, rx: 2, fill: MK_COLS[Math.floor(r() * 8)], stroke: '#2A1A22', 'stroke-width': 2 }, g);
        x += w + 3;
      }
    }
  } else if (kind === 'laser') {
    // a dark corridor with red beams
    E('path', { d: 'M0,120 L420,260 L780,260 L1200,120 M0,700 L420,460 L780,460 L1200,700', stroke: '#3A3A5A', 'stroke-width': 4, fill: 'none' }, g);
    E('rect', { x: 420, y: 260, width: 360, height: 200, fill: '#05050A', stroke: '#3A3A5A', 'stroke-width': 4 }, g);
    const beams = G(g);
    [[60, 200, 990, 330], [60, 420, 990, 300], [120, 520, 990, 470], [60, 300, 990, 520]].forEach(([x1, y1, x2, y2]) =>
      E('line', { x1, y1, x2, y2, stroke: '#FF2A2A', 'stroke-width': 4, opacity: 0.85 }, beams));
    g.anim = t => op(beams, 0.6 + 0.4 * Math.sin(t * TAU * 1.3));
  } else if (kind === 'vending') {
    // a vending machine at the left
    E('rect', { x: 110, y: 120, width: 300, height: 420, rx: 12, fill: '#C62828', stroke: '#5A1010', 'stroke-width': 5 }, g);
    E('rect', { x: 130, y: 150, width: 190, height: 300, rx: 6, fill: '#E3F1FA', stroke: '#5A1010', 'stroke-width': 3 }, g);
    for (let row = 0; row < 4; row++) for (let k = 0; k < 4; k++) E('rect', { x: 140 + k * 44, y: 162 + row * 72, width: 34, height: 52, rx: 5, fill: MK_COLS[(row * 4 + k) % 8], stroke: '#2A1A22', 'stroke-width': 2 }, g);
    E('rect', { x: 334, y: 160, width: 60, height: 120, rx: 6, fill: '#2A1A22' }, g);
    T(g, 260, 510, 'SNACKS', { size: 30, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  } else if (kind === 'vault') {
    // the round vault door with a wheel
    E('circle', { cx: 330, cy: 300, r: 210, fill: ball('#B9C4CE', '#5A6670'), stroke: '#2A3038', 'stroke-width': 8 }, g);
    E('circle', { cx: 330, cy: 300, r: 160, fill: 'none', stroke: '#7D8A96', 'stroke-width': 6 }, g);
    const wh = G(g); tr(wh, 330, 300);
    E('path', { d: 'M-90,0 L90,0 M0,-90 L0,90 M-64,-64 L64,64 M64,-64 L-64,64', stroke: '#E2B33C', 'stroke-width': 12, 'stroke-linecap': 'round' }, wh);
    E('circle', { r: 26, fill: '#E2B33C', stroke: '#2A3038', 'stroke-width': 4 }, wh);
    for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; E('circle', { cx: 330 + Math.cos(a) * 188, cy: 300 + Math.sin(a) * 188, r: 9, fill: '#7D8A96', stroke: '#2A3038', 'stroke-width': 2 }, g); }
    g.wheel = wh;
  } else if (kind === 'scales') {
    // two framed portraits of famous balances and a rope barrier
    [[150, 160, 'EQUAL'], [380, 160, 'FAIR']].forEach(([x, y, s]) => {
      E('rect', { x, y, width: 170, height: 130, rx: 6, fill: '#F4E3C0', stroke: '#C9962E', 'stroke-width': 8 }, g);
      E('path', { d: `M${x + 40},${y + 70} L${x + 130},${y + 70} M${x + 85},${y + 70} L${x + 85},${y + 108}`, stroke: '#8A6A30', 'stroke-width': 5 }, g);
      T(g, x + 85, y + 50, s, { size: 26, weight: 800, anchor: 'middle', fill: '#8A6A30' });
    });
  }
}

function eqRoom(parent, kind) {
  const R = EQ_ROOMS[kind] || EQ_ROOMS.scales, g = G(parent), back = G(g);
  eqWall(back, R);
  g.decor = G(back);
  eqDecor(g.decor, kind, R);
  // the room's plaque
  const pl = G(back); tr(pl, 795, 58);
  E('rect', { x: -195, y: -32, width: 390, height: 64, rx: 12, fill: '#14101E', stroke: R.acc, 'stroke-width': 4 }, pl);
  T(pl, 0, 11, R.name, { size: 28, weight: 800, anchor: 'middle', fill: R.acc, ls: 1 });
  // pendant lamp
  const lamp = G(back); tr(lamp, 600, 0);
  E('line', { x1: 0, y1: 0, x2: 0, y2: 70, stroke: '#1A1A20', 'stroke-width': 3 }, lamp);
  E('path', { d: 'M-34,96 L34,96 L18,66 L-18,66 Z', fill: '#2A2A30', stroke: '#101014', 'stroke-width': 3 }, lamp);
  E('ellipse', { cx: 0, cy: 98, rx: 16, ry: 7, fill: '#FFE9A8' }, lamp);
  // exit door with keypad, and the countdown clock above it
  E('rect', { x: 1004, y: 190, width: 176, height: 520, rx: 6, fill: '#1A1410', stroke: '#0A0806', 'stroke-width': 4 }, back);
  E('rect', { x: 1016, y: 202, width: 152, height: 500, rx: 4, fill: linGrad('#6B4A30', '#4A3020', true), stroke: '#2A1A10', 'stroke-width': 3 }, back);
  E('rect', { x: 1030, y: 220, width: 124, height: 120, rx: 4, fill: 'none', stroke: '#2A1A10', 'stroke-width': 3 }, back);
  T(back, 1092, 290, 'EXIT', { size: 30, weight: 800, anchor: 'middle', fill: R.acc });
  g.keypad = eqKeypad(back, { s: 0.62 }); tr(g.keypad, 1092, 440);
  g.clock = eqClock(back, { s: 0.68 }); tr(g.clock, 1092, 140);
  // characters go here
  g.mid = G(g);
  // the table
  const front = G(g);
  E('rect', { x: 20, y: 518, width: 980, height: 26, rx: 6, fill: '#B07A45', stroke: '#5A3618', 'stroke-width': 4 }, front);
  E('rect', { x: 40, y: 544, width: 940, height: 206, fill: linGrad('#8A5A30', '#5A3618', true), stroke: '#3A2410', 'stroke-width': 4 }, front);
  E('path', { d: 'M40,600 L980,600', stroke: '#3A2410', 'stroke-width': 3, opacity: 0.6 }, front);
  g.front = front;
  g.top = G(g);
  g.counterY = 530;
  g.R = R;
  g.upd = t => { tr(lamp, 600, 0, 1, Math.sin(t * 0.9) * 1.5); if (g.decor.anim) g.decor.anim(t); };
  return g;
}

function eqLobby(parent) {
  const g = G(parent), back = G(g);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#1A1030', '#2E1E4A', true) }, back);
  let d = '';
  for (let x = 0; x <= 1200; x += 80) d += `M${x},0 L${x},560 `;
  E('path', { d, stroke: '#3A2A5A', 'stroke-width': 3 }, back);
  // neon sign
  const neon = G(back); tr(neon, 740, 168);
  E('rect', { x: -310, y: -58, width: 620, height: 116, rx: 22, fill: '#120A20', stroke: '#B48CFF', 'stroke-width': 5 }, neon);
  const n1 = T(neon, 36, 22, 'THE VAULT OF X', { size: 58, weight: 800, anchor: 'middle', fill: '#FFE45C', ls: 3 });
  n1.setAttribute('stroke', '#FF6FA8'); n1.setAttribute('stroke-width', 3); n1.setAttribute('paint-order', 'stroke');
  const pl = eqPadlock(neon, { s: 0.66, col: '#FF6FA8' }); tr(pl, -250, 6);
  g.neon = neon;
  // leaderboard
  const lb = G(back); tr(lb, 175, 340);
  E('rect', { x: -135, y: -130, width: 270, height: 260, rx: 12, fill: '#0E0A18', stroke: '#B48CFF', 'stroke-width': 4 }, lb);
  T(lb, 0, -88, 'LEADERBOARD', { size: 28, weight: 800, anchor: 'middle', fill: '#B48CFF' });
  [['1. THE X-PERTS', '51:12'], ['2. TEAM PI', '54:40'], ['3. AUNTIES', '58:03']].forEach(([n, tm], i) => {
    T(lb, -116, -38 + i * 52, n, { size: 21, weight: 700, fill: '#FFFFFF' });
    T(lb, 116, -38 + i * 52, tm, { size: 21, weight: 800, anchor: 'end', fill: '#FFE45C' });
  });
  // the wall clock, above the door
  g.clock = eqClock(back, { s: 0.8 }); tr(g.clock, 1085, 254);
  // the door into room 1
  E('rect', { x: 990, y: 300, width: 190, height: 420, rx: 6, fill: '#0A0610', stroke: '#B48CFF', 'stroke-width': 4 }, back);
  E('rect', { x: 1004, y: 314, width: 162, height: 400, rx: 4, fill: linGrad('#4A3A6A', '#2E2248', true) }, back);
  T(back, 1085, 360, 'ROOM 1', { size: 28, weight: 800, anchor: 'middle', fill: '#FFE45C' });
  g.keypad = eqKeypad(back, { s: 0.62 }); tr(g.keypad, 1085, 470);
  g.mid = G(g);
  const front = G(g);
  E('rect', { x: 30, y: 518, width: 940, height: 26, rx: 6, fill: '#B48CFF', stroke: '#4A2A8A', 'stroke-width': 4 }, front);
  E('rect', { x: 50, y: 544, width: 900, height: 206, fill: linGrad('#3A2A5A', '#22183A', true), stroke: '#4A2A8A', 'stroke-width': 4 }, front);
  g.deskText = T(front, 740, 612, 'ESCAPE IN 60 MINUTES', { size: 30, weight: 800, anchor: 'middle', fill: '#FFE45C', ls: 2 });
  g.front = front;
  g.top = G(g);
  g.counterY = 530;
  g.upd = t => { const f = Math.sin(t * 13) > 0.97 ? 0.55 : 1; op(n1, f); };
  return g;
}
