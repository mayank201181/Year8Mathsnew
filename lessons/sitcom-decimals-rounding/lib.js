/* WHAT'S THE POINT? (Claude Sitcom Ep 5, Decimals, Rounding & Estimation): the cast, sets and props of this episode.
   Bundled after engine lib.js, kit.js, mathkit.js and sitcom.js (scMake, scTalk, scKavya, scCastHuman,
   scConfessional, scLowerThird, scVideoCall, scTrack, mk* maths kit). Every top-level name starts with `dr`, except `cast`.

   Characters: cast(parent, kind, o) -> g, origin at the character's centre, about 200-240 px tall at s = 1
     o: { s (scale), mood (default mood), ... }   (humans: any scHuman option overrides, e.g. prop, lift)
     g.set({ t, talk, mood, look, sweat, still, ... })   call every frame
       talk 0..1 (use scTalk(S, t, who)); mood: neutral | happy | smug | annoyed | sad | shock | deadpan
       look -1..1 pupils left/right; still: true stops the idle bob
     HUMANS (busts, bottom of the shirt at y = 140: put them behind a table, a desk or the frame edge):
       'kavya'  (kavya)  Kavya, 12 (scKavya, blue PE shirt "8")
       'mum'    (mum)    Mum: magenta kurta, bun, bindi. Default prop: a paintbrush with blue paint (lift: 1 raises it)
       'dad'    (dad)    Dad: glasses, moustache, green polo, an OFFICIAL lanyard. Default prop: his stopwatch
                         (g.watch.set(text) writes on its display, e.g. '14.72')
       'boy'    (boy)    Ah Boy, 8: orange star tee and a pair of blue tiger ears (the Blue House mascot). Empty hand
       'priya'  (priya)  Priya, 12: blue house PE tee with "8", white headband, bob, yellow clip. Empty hand
       'tan'    (tan)    Mr Tan, maths teacher: shirt and tie, glasses, a Sports Day cap. Default prop: a microphone
       Pass { prop: null } for no prop (dad: { watch: false }); { body: true } for a full body (scHumanBody, feet at 0,0).
     CARTOONS (scMake):
       'dot'   (dot)   Dot, the DECIMAL POINT: a small glowing amber LED ball (the scoreboard's point) with big eyes,
                       a red sweatband, stick arms and legs, white sneakers. Dramatic. Default mood smug.
                       Extra: g.set({ arms: 0..1 }) flaps the arms up (panic / ta-da); { point: -1..1 } points one arm
                       left (-1) or right (+1).
       'ref'   (ref)   The Decider, ROUNDING REFEREE: a round head with ONE big eye (he looks at one digit), a black
                       cap, a black-and-white striped referee shirt, a whistle on a cord. Default deadpan.
                       Extra: { flag: 0..1 } raises his right arm with a yellow flag marked "UP" (round up);
                       { whistle: 0..1 } puts the whistle to his mouth and puffs his cheeks.
       'sig'   (sig)   Sig, SIGNIFICANT FIGURES, the bouncer: a broad purple block of a head and shoulders in a
                       black suit, sunglasses, an earpiece with a curly wire, a clipboard "THE LIST". Default deadpan.
                       Extra: { glasses: 0..1 } slides the sunglasses down (1 = on, 0 = pushed up on his head).
       'wavy'  (wavy)  Wavy, the APPROXIMATELY-EQUAL SIGN (≈): two thick teal waves (the top one has the face) under a
                       yellow bucket hat. Laid-back surfer. Default smug. The waves ripple gently every frame.
                       Extra: { wob: 0..2 } how much they ripple (default 1).
       'rita'  (rita)  Rita, a RECURRING-DECIMAL PARROT: green body, red crest, yellow cheek, hooked orange beak, on a
                       perch. She repeats herself. Default happy. Extra: { flap: 0..1 } flaps the wing.

   Shots
     drConf(parent, who)             confessional background tinted for that character (scConfessional); g.set(p, t)
     DR_TINT                         the confessional colours per character
     drLowerThird(parent, who)       scLowerThird with this episode's name and role for `who` (DR_LT); g.set(p)

   Sets (full stage 1200 x 750; each returns g)
     drStadium(parent)    wide shot of the stadium at 8 a.m.: sky, two stands full of dotted spectators, bunting, the
                          red track with lanes, the green infield, the BLUE HOUSE tent at the left, and the big LED
                          scoreboard top right (g.board, a drScoreboard, centre g.boardAt = [x, y]). g.upd(t) waves the
                          bunting and the crowd.
     drTent(parent)       close-up inside the BLUE HOUSE tent: blue-and-white scalloped canopy (y 96-190), the field
                          and track behind, a folding table (top at g.tableY = 530). LAYERS like a stall: characters
                          in g.mid (a bust at y about 440 hides its shirt hem behind the table), the table is g.front,
                          props standing on the table go in g.top. g.upd(t) ripples the canopy flags.
     drBooth(parent)      the announcer's box: a wooden desk with a SPORTS DAY sign (top at g.deskY = 540), a PA horn
                          speaker, the stands through the window. Layers g.mid / g.front / g.top as drTent.
                          g.upd(t) pulses the PA "on air" light.

   Props (around their own origin)
     drScoreboard(parent, o)         big black LED scoreboard, centred. o: w (560), h (300), title ('RESULTS'), rows
                                     ([['PRIYA', '1472', 1, 's']]: label, digits, point position (digits before the
                                     point; -1 = none), unit), size (64 digits). g.row(i, digits, pt, label) changes a
                                     row (cheap: text and one circle); g.ptXY(i, k) -> [x, y] of the gap after k digits
                                     of row i, in the board's own coordinates (to put Dot there); g.pt[i] the LED point.
     drStopwatch(parent, o)          a big digital stopwatch, centred, about 150 x 190 at s = 1. o: s, text.
                                     g.set(text) writes the display.
     drStamp(parent, ok)             mkStamp 'POINT TAKEN' (green, ok true) or 'MISSING THE POINT' (red); g.set(p).
                                     About 700-860 px wide at scale 1: scale it (tr(g, x, y, 0.5)).
     drBannerCloth(parent, o)        the Blue House banner, a 2.3 by 1.4 cloth on two poles, centred; o: w (460), h (280),
                                     painted (true: the tiger and "BLUE HOUSE" lettering). g.W, g.H
     drMedal(parent, s)              a gold medal on a blue ribbon, the top of the ribbon at (0,0), about 150 tall
     drTweet(parent)                 the Decider's whistle blast: "TWEET!" in a jagged burst; g.set(p)
     drRope(parent, w)               a velvet rope between two brass posts (Sig's door), base centre at (0,0)
     drPerch(parent, w)              Rita's wooden perch on a stand, the perch top at (0,0)
     DR_LED                          the amber LED colour, DR_BLUE the house colour
*/

const DR_LED = '#FFB627', DR_BLUE = '#2E6FD8';

/* ---------- confessional tints, lower thirds ---------- */
const DR_TINT = {
  dot: ['#2A1E08', '#5A3E10'], ref: ['#1E1E24', '#3E3E48'], sig: ['#22143A', '#47307A'], wavy: ['#0E2E30', '#1E5C5E'],
  rita: ['#123018', '#2A5E34'], kavya: ['#14243A', '#25446B'], dad: ['#123026', '#245A48'], mum: ['#3A1030', '#6B1E58'],
  boy: ['#3A2410', '#6B4414'], priya: ['#1A2240', '#33407A'], tan: ['#1A2A3A', '#33506E'],
};
function drConf(parent, who) { const c = DR_TINT[who] || DR_TINT.dot; return scConfessional(parent, c[0], c[1]); }
const DR_LT = {
  dot: ['DOT', 'The decimal point. Small. Important.'],
  ref: ['THE DECIDER', 'Rounding referee. One digit only.'],
  sig: ['SIG', 'Significant figures. Works the door.'],
  wavy: ['WAVY', 'Approximately equal to. Approximately.'],
  rita: ['RITA', 'Recurring decimal. Recurring decimal.'],
  kavya: ['KAVYA, 12', 'Blue House. Half right.'],
  mum: ['MUM', 'Banner, drinks, budget.'],
  dad: ['DAD', 'Official timekeeper. Allegedly.'],
  boy: ['AH BOY, 8', 'Blue House tiger. Mascot.'],
  priya: ['PRIYA', 'Fastest girl in Year 8.'],
  tan: ['MR TAN', 'Maths teacher. On the microphone.'],
};
function drLowerThird(parent, who) { const l = DR_LT[who] || [String(who).toUpperCase(), '']; return scLowerThird(parent, l[0], l[1]); }

/* ---------- the stopwatch ---------- */
function drStopwatch(parent, o) {
  o = o || {};
  const g = G(parent), inner = G(g); tr(inner, 0, 0, o.s || 1);
  E('rect', { x: -14, y: -112, width: 28, height: 22, rx: 5, fill: '#C9D3DC', stroke: SC_INK, 'stroke-width': 4 }, inner);   // crown
  E('rect', { x: 46, y: -90, width: 22, height: 16, rx: 4, fill: '#E8424F', stroke: SC_INK, 'stroke-width': 3, transform: 'rotate(40 57 -82)' }, inner);
  E('circle', { r: 92, fill: linGrad('#4A5A6A', '#26323C', true), stroke: SC_INK, 'stroke-width': 5 }, inner);
  E('circle', { r: 76, fill: '#E9F2F7', stroke: SC_INK, 'stroke-width': 3 }, inner);
  E('rect', { x: -66, y: -26, width: 132, height: 56, rx: 8, fill: '#1A2420', stroke: SC_INK, 'stroke-width': 3 }, inner);
  const txt = T(inner, 58, 16, o.text || '0.00', { size: 40, weight: 700, anchor: 'end', fill: '#7CF0A8' });
  T(inner, 0, 58, 'OFFICIAL', { size: 16, weight: 800, anchor: 'middle', fill: '#5A6670', ls: 2 });
  g.set = s => { s = String(s); if (txt.textContent !== s) { setText(txt, s); txt.setAttribute('font-size', s.length > 5 ? Math.round(200 / s.length) : 40); } };
  g.set(o.text || '0.00');
  return g;
}

/* ---------- the cast ---------- */
const DR_HUMAN = {
  mum: { hand: true }, dad: { hand: true }, tan: { hand: true }, boy: { hand: true },
  priya: { hand: true, style: 'tee', shirt: DR_BLUE, logo: '8', logoCol: '#FFFFFF', band: '#FFFFFF' },
};
function cast(parent, kind, o) {
  o = o || {};
  if (kind === 'kavya') return scKavya(parent, o);
  if (SC_HUMANS[kind]) {
    const p = Object.assign({}, DR_HUMAN[kind] || {}, o);
    const c = scCastHuman(parent, kind, p);
    if (p.body) return c;
    const inner = c.firstChild, hp = c.hand;
    if (kind === 'dad') {   // OFFICIAL lanyard, and the stopwatch in his hand
      const ly = G(inner);
      E('path', { d: 'M-34,44 L-6,104 M34,44 L6,104', stroke: DR_BLUE, 'stroke-width': 6, fill: 'none' }, ly);
      E('rect', { x: -26, y: 100, width: 52, height: 34, rx: 4, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 2.5 }, ly);
      T(ly, 0, 122, 'OFFICIAL', { size: 11, weight: 800, anchor: 'middle', fill: DR_BLUE });
      if (hp && p.watch !== false && !p.prop) { c.watch = drStopwatch(hp, { s: 0.42, text: p.watchText || '14.72' }); tr(c.watch, 0, -46); }
    } else if (kind === 'mum' && hp && !p.prop) {   // a paintbrush, blue paint on the tip
      E('line', { x1: 0, y1: 8, x2: 0, y2: -70, stroke: '#9C6B3E', 'stroke-width': 9, 'stroke-linecap': 'round' }, hp);
      E('rect', { x: -9, y: -86, width: 18, height: 20, fill: '#C9D3DC', stroke: SC_INK, 'stroke-width': 3 }, hp);
      E('path', { d: 'M-10,-86 Q-12,-108 0,-124 Q12,-108 10,-86 Z', fill: DR_BLUE, stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, hp);
    } else if (kind === 'tan' && hp && !p.prop) {   // a handheld microphone
      E('rect', { x: -9, y: -64, width: 18, height: 66, rx: 6, fill: '#26323C', stroke: SC_INK, 'stroke-width': 3 }, hp);
      E('circle', { cx: 0, cy: -80, r: 20, fill: '#9AA6B2', stroke: SC_INK, 'stroke-width': 3.5 }, hp);
      E('path', { d: 'M-14,-86 L14,-86 M-16,-78 L16,-78 M-13,-70 L13,-70', stroke: '#5A6670', 'stroke-width': 2.5 }, hp);
    }
    if (kind === 'tan') {   // a Sports Day cap
      const cap = G(inner); tr(cap, 0, c.top + 34);
      E('path', { d: 'M-70,10 Q-66,-40 0,-44 Q66,-40 70,10 Z', fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 4 }, cap);
      E('path', { d: 'M40,6 Q100,2 112,18 Q80,24 40,16 Z', fill: DR_BLUE, stroke: SC_INK, 'stroke-width': 3 }, cap);
      E('rect', { x: -66, y: -6, width: 132, height: 12, fill: DR_BLUE }, cap);
    }
    if (kind === 'boy') {   // blue tiger ears (a hairband)
      const ears = G(inner); tr(ears, 0, c.top + 30);
      E('path', { d: 'M-60,6 Q0,-30 60,6', fill: 'none', stroke: '#1E4FA8', 'stroke-width': 8, 'stroke-linecap': 'round' }, ears);
      [-1, 1].forEach(sd => {
        E('path', { d: `M${sd * 36},0 Q${sd * 52},-58 ${sd * 78},-10 Z`, fill: '#4C8DF0', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, ears);
        E('path', { d: `M${sd * 46},-6 Q${sd * 54},-38 ${sd * 68},-12 Z`, fill: '#FFC2D6' }, ears);
        E('path', { d: `M${sd * 50},-26 l${sd * 10},4 M${sd * 58},-36 l${sd * 8},6`, stroke: '#14306B', 'stroke-width': 4, 'stroke-linecap': 'round' }, ears);
      });
    }
    return c;
  }
  const S = { s: o.s, mood: o.mood };
  let c;
  if (kind === 'dot') {
    let arms = [];
    c = scMake(parent, Object.assign(S, { seed: 6, bob: 5, mood: o.mood || 'smug',
      draw: g => {
        // legs and sneakers
        [-1, 1].forEach(sd => {
          E('path', { d: `M${sd * 22},60 L${sd * 30},104`, stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
          E('path', { d: `M${sd * 30 - 14},112 Q${sd * 30 - 14},98 ${sd * 30 + 2},98 L${sd * 30 + 18},100 Q${sd * 30 + 24},112 ${sd * 30 + 14},114 Z`, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
        });
        [-1, 1].forEach(sd => { const a = E('path', { d: '', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g); arms.push({ a, sd }); });
        // glow and the LED ball
        E('circle', { r: 104, fill: glow(DR_LED), opacity: 0.55 }, g);
        E('circle', { r: 70, fill: ball('#FFE07A', '#E07A10'), stroke: SC_INK, 'stroke-width': 5 }, g);
        E('ellipse', { cx: -26, cy: -38, rx: 16, ry: 9, fill: '#FFFFFF', opacity: 0.5, transform: 'rotate(-30 -26 -38)' }, g);
        // sweatband
        E('path', { d: 'M-66,-30 Q0,-52 66,-30 L64,-14 Q0,-36 -64,-14 Z', fill: '#E8424F', stroke: SC_INK, 'stroke-width': 3 }, g);
        E('ellipse', { cx: -40, cy: 18, rx: 10, ry: 6, fill: '#FF8F6B', opacity: 0.55 }, g);
        E('ellipse', { cx: 40, cy: 18, rx: 10, ry: 6, fill: '#FF8F6B', opacity: 0.55 }, g);
      },
      face: { x: 0, y: 4, eye: 15, gap: 46, mouthW: 26, mouthY: 30, lidCol: '#F2A93A' },
      upd: (t, g, st) => {
        const k = st.arms || 0, pt = st.point || 0;
        arms.forEach(({ a, sd }, i) => {
          if (pt && Math.sign(pt) === sd) { a.setAttribute('d', `M${sd * 62},16 L${sd * 118},${(-4 - 10 * Math.abs(pt)).toFixed(1)}`); return; }
          const w = Math.sin(t * TAU * 2.2 + i * 2) * 14 * k;
          a.setAttribute('d', `M${sd * 64},20 Q${sd * 96},${(30 - 40 * k).toFixed(1)} ${sd * 98},${(50 - 110 * k + w).toFixed(1)}`);
        });
      } }));
  } else if (kind === 'ref') {
    let flag = null, armDown = null, whis = null, cheeks = null, whRest = null;
    c = scMake(parent, Object.assign(S, { seed: 12, bob: 2, mood: o.mood || 'deadpan',
      draw: g => {
        // striped shirt
        const shirt = 'M-96,140 Q-92,40 -40,30 L40,30 Q92,40 96,140 Z';
        const clip = _clipUrl(shirt);
        const sg = G(g, { 'clip-path': clip });
        E('rect', { x: -100, y: 20, width: 200, height: 130, fill: '#FFFFFF' }, sg);
        let st = '';
        for (let x = -96; x < 100; x += 32) st += `M${x},20 h16 v130 h-16 Z `;
        E('path', { d: st, fill: '#1E1E24' }, sg);
        E('path', { d: shirt, fill: 'none', stroke: SC_INK, 'stroke-width': 4 }, g);
        E('path', { d: 'M-24,30 L0,54 L24,30', fill: '#1E1E24', stroke: SC_INK, 'stroke-width': 3 }, g);   // collar
        // whistle on a cord, resting on the chest
        whRest = G(g);
        E('path', { d: 'M-20,32 Q-10,70 4,84 M20,32 Q14,64 4,84', fill: 'none', stroke: '#E8424F', 'stroke-width': 3 }, whRest);
        E('rect', { x: -8, y: 82, width: 28, height: 16, rx: 6, fill: '#C9D3DC', stroke: SC_INK, 'stroke-width': 3 }, whRest);
        // the raised arm with the flag (hidden at rest)
        flag = G(g);
        E('path', { d: 'M78,60 Q120,10 112,-80', fill: 'none', stroke: '#1E1E24', 'stroke-width': 18, 'stroke-linecap': 'round' }, flag);
        E('circle', { cx: 112, cy: -84, r: 13, fill: '#E2B48A', stroke: SC_INK, 'stroke-width': 3 }, flag);
        E('line', { x1: 112, y1: -70, x2: 112, y2: -190, stroke: '#6B4423', 'stroke-width': 6 }, flag);
        E('path', { d: 'M112,-190 L190,-176 L112,-140 Z', fill: '#FFE45C', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, flag);
        T(flag, 140, -164, 'UP', { size: 22, weight: 800, anchor: 'middle', fill: SC_INK });
        // head (one big eye: both eyes of the face kit sit on top of each other)
        E('rect', { x: -16, y: 10, width: 32, height: 26, fill: '#E2B48A' }, g);
        E('ellipse', { cx: 0, cy: -40, rx: 66, ry: 70, fill: '#E2B48A', stroke: SC_INK, 'stroke-width': 4 }, g);
        [-1, 1].forEach(sd => E('ellipse', { cx: sd * 64, cy: -30, rx: 11, ry: 16, fill: '#E2B48A', stroke: SC_INK, 'stroke-width': 3.5 }, g));
        // black cap
        E('path', { d: 'M-64,-62 Q-62,-118 0,-120 Q62,-118 64,-62 Z', fill: '#1E1E24', stroke: SC_INK, 'stroke-width': 4 }, g);
        E('path', { d: 'M-66,-64 Q0,-50 90,-62 Q96,-50 60,-46 Q0,-40 -66,-52 Z', fill: '#2E2E36', stroke: SC_INK, 'stroke-width': 3 }, g);
        T(g, 0, -88, 'REF', { size: 22, weight: 800, anchor: 'middle', fill: '#FFE45C' });
        cheeks = G(g);
        [-1, 1].forEach(sd => E('circle', { cx: sd * 40, cy: 18, r: 15, fill: '#F08A8A', opacity: 0.7 }, cheeks));
        whis = G(g);
        E('rect', { x: -6, y: 0, width: 46, height: 22, rx: 8, fill: '#C9D3DC', stroke: SC_INK, 'stroke-width': 3 }, whis);
        E('circle', { cx: 30, cy: 11, r: 6, fill: '#5A6670' }, whis);
        // the resting arms
        armDown = G(g);
        E('path', { d: 'M80,60 Q104,96 96,132', fill: 'none', stroke: '#1E1E24', 'stroke-width': 18, 'stroke-linecap': 'round' }, armDown);
      },
      face: { x: 0, y: -18, eye: 24, gap: 0, mouthW: 30, mouthY: 40, lidCol: '#D9A273', iris: '#2E6FD8' },
      upd: (t, g, st) => {
        const f = clamp(st.flag || 0), w = clamp(st.whistle || 0);
        op(flag, f > 0.5 ? 1 : 0); op(armDown, f > 0.5 ? 0 : 1);
        op(whis, w > 0.5 ? 1 : 0); op(whRest, w > 0.5 ? 0 : 1); op(cheeks, w > 0.5 ? 1 : 0);
      } }));
    // whistle at the mouth sits in front of the face kit
    const inner = c.firstChild; inner.appendChild(whis); tr(whis, -6, 10);
  } else if (kind === 'sig') {
    let shades = null;
    c = scMake(parent, Object.assign(S, { seed: 15, bob: 1, mood: o.mood || 'deadpan',
      draw: g => {
        // suit
        E('path', { d: 'M-130,140 Q-128,40 -60,22 L60,22 Q128,40 130,140 Z', fill: '#1E1E28', stroke: SC_INK, 'stroke-width': 4 }, g);
        E('path', { d: 'M-24,22 L0,90 L24,22 Z', fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
        E('path', { d: 'M-10,40 L0,100 L10,40 Z', fill: '#7A1E48' }, g);
        E('path', { d: 'M-60,22 L-20,96 L-40,40 Z M60,22 L20,96 L40,40 Z', fill: '#2E2E3A', stroke: SC_INK, 'stroke-width': 2.5 }, g);
        // clipboard: THE LIST
        const cb = G(g); tr(cb, -88, 96, 0.6, -10);
        E('rect', { x: -70, y: -92, width: 140, height: 184, rx: 10, fill: '#B07A45', stroke: SC_INK, 'stroke-width': 4 }, cb);
        E('rect', { x: -58, y: -74, width: 116, height: 154, fill: '#FFFFFF' }, cb);
        T(cb, 0, -40, 'THE LIST', { size: 24, weight: 800, anchor: 'middle', fill: SC_INK });
        E('path', { d: 'M-44,-10 h88 M-44,18 h88 M-44,46 h70', stroke: '#9FB2C2', 'stroke-width': 5 }, cb);
        // head: a broad purple block
        E('rect', { x: -26, y: 0, width: 52, height: 30, fill: '#7E57C2' }, g);
        E('path', { d: 'M-80,-110 Q-84,-124 -66,-126 L66,-126 Q84,-124 80,-110 L84,8 Q84,24 66,24 L-66,24 Q-84,24 -84,8 Z', fill: ball('#A58AF0', '#5E3BB0'), stroke: SC_INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, g);
        // earpiece
        E('circle', { cx: 84, cy: -40, r: 8, fill: '#26323C', stroke: SC_INK, 'stroke-width': 2 }, g);
        E('path', { d: 'M86,-32 q10,10 0,18 q-10,8 0,18 q10,8 0,18 q-8,10 -4,26', fill: 'none', stroke: '#C9D3DC', 'stroke-width': 3 }, g);
      },
      face: { x: 0, y: -40, eye: 16, gap: 64, mouthW: 40, mouthY: 44, lidCol: '#8C6BE0' },
      upd: (t, g, st) => { if (!shades) return; const k = st.glasses === undefined ? 1 : clamp(st.glasses); tr(shades, 0, lerp(-62, 0, k)); } }));
    const inner = c.firstChild; shades = G(inner);
    const sh = G(shades); tr(sh, 0, -40);
    E('path', { d: 'M-66,-14 L-6,-14 Q-6,22 -36,22 Q-62,22 -66,-14 Z M66,-14 L6,-14 Q6,22 36,22 Q62,22 66,-14 Z', fill: '#14141C', stroke: SC_INK, 'stroke-width': 3 }, sh);
    E('path', { d: 'M-6,-12 L6,-12 M-66,-12 L-84,-18 M66,-12 L84,-18', stroke: SC_INK, 'stroke-width': 4 }, sh);
    E('path', { d: 'M-52,-6 L-36,-6 M20,-6 L36,-6', stroke: '#FFFFFF', 'stroke-width': 3, opacity: 0.5 }, sh);
  } else if (kind === 'wavy') {
    let waves = [];
    const wd = (y, ph, a) => { let d = ''; for (let i = 0; i <= 20; i++) { const x = -150 + i * 15; d += (i ? ' L' : 'M') + x + ',' + (y + Math.sin(i * 0.62 + ph) * a).toFixed(1); } return d; };
    c = scMake(parent, Object.assign(S, { seed: 19, bob: 4, mood: o.mood || 'smug',
      draw: g => {
        [[-26, 0], [60, 1]].forEach(([y, i]) => {
          const out = E('path', { d: wd(y, 0, 18), fill: 'none', stroke: SC_INK, 'stroke-width': 62, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
          const inn = E('path', { d: wd(y, 0, 18), fill: 'none', stroke: i ? '#2BB3A8' : '#46D3C6', 'stroke-width': 50, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
          waves.push({ out, inn, y, i });
        });
        // bucket hat on the top wave
        const hat = G(g); tr(hat, -6, -56);
        E('path', { d: 'M-56,10 L-40,-34 Q0,-48 40,-34 L56,10 Z', fill: '#FFD447', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, hat);
        E('path', { d: 'M-80,12 Q0,-4 80,12 Q0,28 -80,12 Z', fill: '#FFC21A', stroke: SC_INK, 'stroke-width': 4 }, hat);
        E('circle', { cx: 18, cy: -18, r: 8, fill: '#FF6B8A', stroke: SC_INK, 'stroke-width': 2 }, hat);
      },
      face: { x: -6, y: -24, eye: 13, gap: 44, mouthW: 26, mouthY: 20, lidCol: '#39C2B6' },
      upd: (t, g, st) => {
        const k = st.wob === undefined ? 1 : st.wob;
        waves.forEach(({ out, inn, y, i }) => { const d = wd(y, t * 2.2 * k + i * 1.4, 18 + 4 * Math.sin(t * 1.3 + i) * k); out.setAttribute('d', d); inn.setAttribute('d', d); });
      } }));
  } else if (kind === 'rita') {
    let wing = null;
    c = scMake(parent, Object.assign(S, { seed: 22, bob: 3, mood: o.mood || 'happy',
      draw: g => {
        // tail feathers
        E('path', { d: 'M-10,70 L-40,170 L-6,150 L10,176 L26,148 L40,166 L24,70 Z', fill: '#2E6FD8', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
        // body
        E('path', { d: 'M-62,-10 Q-74,90 6,104 Q74,96 60,-6 Q50,-70 0,-72 Q-54,-70 -62,-10 Z', fill: ball('#7EE08A', '#2FA36B'), stroke: SC_INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, g);
        E('path', { d: 'M-30,30 Q0,90 34,30 Q0,60 -30,30 Z', fill: '#C8F08C', opacity: 0.8 }, g);
        // wing (animated)
        wing = G(g); tr(wing, 44, 6);
        E('path', { d: 'M0,-20 Q40,10 26,80 Q6,60 -8,10 Z', fill: '#2FA36B', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, wing);
        E('path', { d: 'M8,30 L20,62 M2,14 L16,44', stroke: '#E8424F', 'stroke-width': 5, 'stroke-linecap': 'round' }, wing);
        // feet on the perch
        [-18, 18].forEach(x => E('path', { d: `M${x},100 l-8,16 M${x},100 l0,18 M${x},100 l8,16`, stroke: '#E8A23A', 'stroke-width': 5, 'stroke-linecap': 'round' }, g));
        // crest
        E('path', { d: 'M-10,-68 Q-30,-126 -2,-140 Q-6,-104 8,-84 Q14,-130 40,-128 Q22,-100 20,-66 Z', fill: '#E8424F', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
        // yellow cheek patch
        E('ellipse', { cx: -28, cy: -12, rx: 18, ry: 14, fill: '#FFE45C', opacity: 0.9 }, g);
        // hooked beak
        E('path', { d: 'M-4,-26 Q34,-34 40,-4 Q42,22 26,30 Q30,8 12,4 Q0,4 -4,-6 Z', fill: '#FFA53A', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
      },
      face: { x: -14, y: -38, eye: 13, gap: 40, mouthW: 22, mouthY: 40, lidCol: '#5CCB72' },
      upd: (t, g, st) => { const k = clamp(st.flap || 0); tr(wing, 44, 6, 1, -50 * k * (0.5 + 0.5 * Math.sin(t * TAU * 3))); } }));
  } else {
    c = scKavya(parent, o);
  }
  return c;
}

/* ---------- the scoreboard ---------- */
function drScoreboard(parent, o) {
  o = o || {};
  const w = o.w || 560, h = o.h || 300, size = o.size || 64, g = G(parent);
  E('rect', { x: -w / 2 - 14, y: -h / 2 - 14, width: w + 28, height: h + 28, rx: 16, fill: '#3A4652', stroke: '#1A2430', 'stroke-width': 5 }, g);
  E('rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: 8, fill: '#0B0F14' }, g);
  E('rect', { x: -w / 2, y: -h / 2, width: w, height: 54, rx: 8, fill: '#16202A' }, g);
  T(g, 0, -h / 2 + 39, o.title || 'RESULTS', { size: 32, weight: 800, anchor: 'middle', fill: '#FF5A5A', ls: 6 });
  E('rect', { x: -40, y: h / 2 + 14, width: 24, height: 200, fill: '#5A6670' }, g);   // legs
  E('rect', { x: 16, y: h / 2 + 14, width: 24, height: 200, fill: '#5A6670' }, g);
  const rows = o.rows || [['PRIYA', '1472', 1, 's']];
  const cw = size * 0.8, rh = (h - 70) / Math.max(1, rows.length);
  g.rowsEl = []; g.pt = [];
  rows.forEach((r, i) => {
    const y = -h / 2 + 64 + rh * (i + 0.5) + size * 0.36;
    const lab = T(g, -w / 2 + 26, y, r[0], { size: size * 0.62, weight: 800, fill: DR_LED });
    const cells = [];
    const x0 = w / 2 - 30 - (r[3] ? size * 0.9 : 0) - cw * 6;
    for (let k = 0; k < 6; k++) cells.push(T(g, x0 + cw * (k + 0.5), y, '', { size, weight: 700, anchor: 'middle', fill: DR_LED }));
    const unit = T(g, w / 2 - 22, y, r[3] || '', { size: size * 0.6, weight: 700, anchor: 'end', fill: DR_LED });
    const pt = E('circle', { cx: 0, cy: y - size * 0.09, r: size * 0.09, fill: DR_LED }, g);
    g.rowsEl.push({ lab, cells, x0, y, unit }); g.pt.push(pt);
  });
  g.cw = cw;
  // digits right-aligned in 6 cells; pt = number of digits before the point (-1: none)
  g.row = (i, digits, pt, label) => {
    const R = g.rowsEl[i], d = String(digits), off = 6 - d.length;
    R.cells.forEach((c, k) => setText(c, k >= off ? d[k - off] : ''));
    if (label !== undefined) setText(R.lab, label);
    if (pt === undefined || pt < 0) op(g.pt[i], 0);
    else { op(g.pt[i], 1); const [x] = g.ptXY(i, pt, d.length); attr(g.pt[i], 'cx', x); }
    R.n = d.length;
  };
  g.ptXY = (i, k, n) => { const R = g.rowsEl[i]; n = n || R.n || 4; const off = 6 - n; return [R.x0 + cw * (off + k), R.y - size * 0.09]; };
  rows.forEach((r, i) => g.row(i, r[1], r[2]));
  g.W = w; g.H = h;
  return g;
}

/* ---------- sets ---------- */
function drBunting(parent, x1, y1, x2, y2, n, sag) {
  const g = G(parent), cols = [DR_BLUE, '#FFE45C', '#E8424F', '#56D69B'];
  E('path', { d: `M${x1},${y1} Q${(x1 + x2) / 2},${(y1 + y2) / 2 + sag} ${x2},${y2}`, fill: 'none', stroke: '#5A6670', 'stroke-width': 3 }, g);
  const flags = [];
  for (let i = 1; i < n; i++) {
    const p = i / n, x = (1 - p) * (1 - p) * x1 + 2 * p * (1 - p) * (x1 + x2) / 2 + p * p * x2;
    const y = (1 - p) * (1 - p) * y1 + 2 * p * (1 - p) * ((y1 + y2) / 2 + sag) + p * p * y2;
    const f = G(g); tr(f, x, y);
    E('path', { d: 'M-14,0 L14,0 L0,30 Z', fill: cols[i % 4], stroke: '#2A3440', 'stroke-width': 1.5 }, f);
    flags.push({ f, x, y, i });
  }
  g.upd = t => flags.forEach(({ f, x, y, i }) => tr(f, x, y, 1, Math.sin(t * 3 + i) * 8));
  return g;
}

function drStadium(parent) {
  const g = G(parent);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#7FD3FF', '#D6F0FF', true) }, g);
  E('circle', { cx: 120, cy: 90, r: 60, fill: glow('#FFE45C'), opacity: 0.9 }, g);
  // two stands, full of dotted spectators
  const r = rng(31), cols = ['#E8424F', DR_BLUE, '#FFE45C', '#56D69B', '#FFFFFF', '#FF8A3D', '#B48CFF'];
  const crowd = [];
  [[0, 520, 150], [560, 1200, 170]].forEach(([x0, x1, top]) => {
    E('path', { d: `M${x0},${top + 40} L${x0 + 30},${top} L${x1 - 30},${top} L${x1},${top + 40} L${x1},360 L${x0},360 Z`, fill: '#8F9CAB', stroke: '#5A6670', 'stroke-width': 4 }, g);
    E('path', { d: `M${x0 + 20},${top - 30} L${x1 - 20},${top - 30} L${x1 - 4},${top} L${x0 + 4},${top} Z`, fill: '#C9D3DC', stroke: '#5A6670', 'stroke-width': 3 }, g);   // roof
    for (let row = 0; row < 4; row++) {
      E('rect', { x: x0 + 10, y: top + 60 + row * 44, width: x1 - x0 - 20, height: 8, fill: '#6E7B88' }, g);
      let d = '';
      for (let x = x0 + 26; x < x1 - 20; x += 26) d += `M${x + r() * 6},${top + 52 + row * 44} m-9,0 a9,9 0 1,0 18,0 a9,9 0 1,0 -18,0 `;
      E('path', { d, fill: cols[(row * 3 + (x0 > 0 ? 2 : 0)) % cols.length], opacity: 0.9 }, g);
    }
    const wave = E('path', { d: '', fill: '#FFFFFF', opacity: 0.85 }, g);
    crowd.push({ wave, x0, x1, top });
  });
  const bunt = [drBunting(g, 20, 120, 520, 118, 12, 40), drBunting(g, 580, 140, 1180, 140, 14, 40)];
  // the track and infield
  E('rect', { x: 0, y: 360, width: 1200, height: 390, fill: '#5BBF6A' }, g);
  E('path', { d: 'M0,430 L1200,430 L1200,610 L0,610 Z', fill: '#C9563F' }, g);
  for (let i = 1; i < 6; i++) E('line', { x1: 0, y1: 430 + i * 30, x2: 1200, y2: 430 + i * 30, stroke: '#FFFFFF', 'stroke-width': 3, opacity: 0.85 }, g);
  E('rect', { x: 0, y: 360, width: 1200, height: 8, fill: '#FFFFFF', opacity: 0.6 }, g);
  // the Blue House tent, at the left
  const tent = G(g); tr(tent, 170, 360);
  E('path', { d: 'M-110,0 L-110,-80 M110,0 L110,-80', stroke: '#9AA6B2', 'stroke-width': 6 }, tent);
  E('path', { d: 'M-130,-80 L0,-130 L130,-80 Z', fill: DR_BLUE, stroke: '#14306B', 'stroke-width': 4 }, tent);
  let sc = 'M-130,-80 ';
  for (let k = 0; k < 8; k++) sc += `q16.25,22 32.5,0 `;
  E('path', { d: sc, fill: '#FFFFFF', stroke: '#14306B', 'stroke-width': 3 }, tent);
  T(tent, 0, -92, 'BLUE HOUSE', { size: 22, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  // the scoreboard
  const sbG = G(g); tr(sbG, 930, 250, 0.5);
  g.board = drScoreboard(sbG, { rows: [['PRIYA', '1472', 1, 's']], size: 72 });
  g.boardAt = [930, 250];
  g.upd = t => {
    bunt.forEach(b => b.upd(t));
    crowd.forEach(({ wave, x0, x1, top }, j) => {   // a few arms up, travelling along the stand
      let d = '';
      for (let k = 0; k < 6; k++) { const x = x0 + 40 + ((t * 90 + k * (x1 - x0) / 6 + j * 50) % (x1 - x0 - 80)); d += `M${x.toFixed(0)},${top + 44} l-3,-16 l6,0 Z `; }
      wave.setAttribute('d', d);
    });
  };
  return g;
}

function drTent(parent) {
  const g = G(parent), back = G(g);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#7FD3FF', '#D6F0FF', true) }, back);
  // the stadium behind: stand, track, field
  E('rect', { x: 0, y: 190, width: 1200, height: 150, fill: '#8F9CAB' }, back);
  const r = rng(9);
  let d = '';
  for (let row = 0; row < 3; row++) for (let x = 14; x < 1200; x += 30) d += `M${x + r() * 8},${214 + row * 40} m-10,0 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0 `;
  E('path', { d, fill: '#C2CCD6' }, back);
  E('rect', { x: 0, y: 340, width: 1200, height: 80, fill: '#C9563F' }, back);
  for (let i = 1; i < 3; i++) E('line', { x1: 0, y1: 340 + i * 26, x2: 1200, y2: 340 + i * 26, stroke: '#FFFFFF', 'stroke-width': 3, opacity: 0.8 }, back);
  E('rect', { x: 0, y: 420, width: 1200, height: 330, fill: '#5BBF6A' }, back);
  // tent poles and canopy
  E('rect', { x: 40, y: 150, width: 18, height: 600, fill: '#9AA6B2', stroke: '#5A6670', 'stroke-width': 3 }, back);
  E('rect', { x: 1142, y: 150, width: 18, height: 600, fill: '#9AA6B2', stroke: '#5A6670', 'stroke-width': 3 }, back);
  E('rect', { x: 0, y: 92, width: 1200, height: 70, fill: DR_BLUE, stroke: '#14306B', 'stroke-width': 4 }, back);
  let sc = 'M0,162 ';
  for (let k = 0; k < 20; k++) sc += `q30,34 60,0 `;
  E('path', { d: sc + 'L1200,150 L0,150 Z', fill: '#FFFFFF', stroke: '#14306B', 'stroke-width': 3 }, back);
  const sg = T(back, 600, 142, 'BLUE HOUSE', { size: 44, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 6 });
  sg.setAttribute('stroke', '#14306B'); sg.setAttribute('stroke-width', 6); sg.setAttribute('paint-order', 'stroke');
  const flags = drBunting(back, 60, 190, 1140, 190, 18, 26);
  g.mid = G(g);
  // the folding table
  const front = G(g);
  E('rect', { x: 70, y: 520, width: 1060, height: 22, rx: 6, fill: '#F4F7FA', stroke: '#7D8A96', 'stroke-width': 4 }, front);
  E('rect', { x: 90, y: 542, width: 1020, height: 208, fill: linGrad(DR_BLUE, '#1E4FA8', true), stroke: '#14306B', 'stroke-width': 4 }, front);
  E('path', { d: 'M90,580 L1110,580', stroke: '#FFFFFF', 'stroke-width': 6, opacity: 0.5 }, front);
  g.front = front;
  g.top = G(g);
  g.tableY = 530;
  g.upd = t => flags.upd(t);
  return g;
}

function drBooth(parent) {
  const g = G(parent), back = G(g);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#E9DCC4' }, back);
  // window onto the stands
  E('rect', { x: 120, y: 90, width: 960, height: 330, rx: 10, fill: linGrad('#7FD3FF', '#D6F0FF', true), stroke: '#9C8A6A', 'stroke-width': 8 }, back);
  E('rect', { x: 128, y: 290, width: 944, height: 122, fill: '#8F9CAB' }, back);
  const r = rng(4);
  let d = '';
  for (let row = 0; row < 3; row++) for (let x = 140; x < 1070; x += 28) d += `M${x + r() * 6},${310 + row * 34} m-9,0 a9,9 0 1,0 18,0 a9,9 0 1,0 -18,0 `;
  E('path', { d, fill: '#C2CCD6' }, back);
  E('line', { x1: 600, y1: 90, x2: 600, y2: 420, stroke: '#9C8A6A', 'stroke-width': 8 }, back);
  // PA horn
  const pa = G(back); tr(pa, 1010, 470);
  E('path', { d: 'M0,-20 L70,-60 L70,60 L0,20 Z', fill: '#C9D3DC', stroke: '#5A6670', 'stroke-width': 4 }, pa);
  E('rect', { x: -26, y: -24, width: 30, height: 48, rx: 6, fill: '#8F9CAB', stroke: '#5A6670', 'stroke-width': 4 }, pa);
  // ON AIR light
  const air = G(back); tr(air, 230, 470);
  E('rect', { x: -80, y: -26, width: 160, height: 52, rx: 10, fill: '#3A1010', stroke: '#1A0808', 'stroke-width': 4 }, air);
  const airT = T(air, 0, 11, 'ON AIR', { size: 30, weight: 800, anchor: 'middle', fill: '#FF5A5A' });
  g.mid = G(g);
  const front = G(g);
  E('rect', { x: 60, y: 530, width: 1080, height: 24, rx: 6, fill: '#B07A45', stroke: '#6B4423', 'stroke-width': 4 }, front);
  E('rect', { x: 80, y: 554, width: 1040, height: 196, fill: linGrad('#9C6B3E', '#6B4423', true), stroke: '#4A2E16', 'stroke-width': 4 }, front);
  const sign = G(front); tr(sign, 820, 640);
  E('rect', { x: -220, y: -40, width: 440, height: 80, rx: 12, fill: DR_BLUE, stroke: '#14306B', 'stroke-width': 4 }, sign);
  T(sign, 0, 14, 'SPORTS DAY', { size: 44, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 4 });
  g.front = front;
  g.top = G(g);
  g.deskY = 540;
  g.upd = t => op(airT, 0.55 + 0.45 * Math.sin(t * 4));
  return g;
}

/* ---------- props ---------- */
function drStamp(parent, ok) { return mkStamp(parent, ok ? 'POINT TAKEN' : 'MISSING THE POINT', ok ? '#1E9E5A' : '#D32F2F'); }

function drBannerCloth(parent, o) {
  o = o || {};
  const w = o.w || 460, h = o.h || 280, g = G(parent);
  E('line', { x1: -w / 2 - 14, y1: -h / 2 - 30, x2: -w / 2 - 14, y2: h / 2 + 60, stroke: '#9C6B3E', 'stroke-width': 10, 'stroke-linecap': 'round' }, g);
  E('line', { x1: w / 2 + 14, y1: -h / 2 - 30, x2: w / 2 + 14, y2: h / 2 + 60, stroke: '#9C6B3E', 'stroke-width': 10, 'stroke-linecap': 'round' }, g);
  E('rect', { x: -w / 2, y: -h / 2, width: w, height: h, fill: '#FFFDF6', stroke: '#5A6670', 'stroke-width': 4 }, g);
  if (o.painted !== false) {
    const lt = T(g, 0, -h / 2 + 64, 'BLUE HOUSE', { size: Math.round(h * 0.2), weight: 800, anchor: 'middle', fill: DR_BLUE, ls: 4 });
    const tg = G(g); tr(tg, 0, h * 0.14, h / 300);
    E('circle', { r: 60, fill: '#4C8DF0', stroke: SC_INK, 'stroke-width': 5 }, tg);
    [-1, 1].forEach(sd => E('path', { d: `M${sd * 30},-46 L${sd * 52},-82 L${sd * 58},-36 Z`, fill: '#4C8DF0', stroke: SC_INK, 'stroke-width': 4 }, tg));
    E('path', { d: 'M-40,-20 l14,6 M40,-20 l-14,6 M-48,4 l16,0 M48,4 l-16,0 M-6,-56 l6,14 l6,-14', stroke: '#14306B', 'stroke-width': 5, 'stroke-linecap': 'round' }, tg);
    [-1, 1].forEach(sd => E('circle', { cx: sd * 22, cy: -10, r: 7, fill: SC_INK }, tg));
    E('path', { d: 'M-10,14 L10,14 L0,24 Z M-14,34 Q0,44 14,34', fill: SC_INK, stroke: SC_INK, 'stroke-width': 3 }, tg);
  }
  g.W = w; g.H = h;
  return g;
}

function drMedal(parent, s) {
  const g = G(parent); tr(g, 0, 0, s || 1);
  E('path', { d: 'M-34,0 L34,0 L16,90 L-16,90 Z', fill: DR_BLUE, stroke: SC_INK, 'stroke-width': 3 }, g);
  E('path', { d: 'M-8,0 L8,0 L4,90 L-4,90 Z', fill: '#FFFFFF' }, g);
  E('circle', { cx: 0, cy: 120, r: 34, fill: ball('#FFE07A', '#C9931A'), stroke: SC_INK, 'stroke-width': 4 }, g);
  E('path', { d: 'M0,104 l5,10 l11,1 l-8,7 l3,11 l-11,-6 l-11,6 l3,-11 l-8,-7 l11,-1 Z', fill: '#FFF2B0', stroke: '#9A6A08', 'stroke-width': 2 }, g);
  return g;
}

function drTweet(parent) {
  const g = G(parent), inner = G(g);
  let d = '';
  for (let i = 0; i < 16; i++) { const a = i / 16 * TAU, rr = i % 2 ? 58 : 84; d += (i ? ' L' : 'M') + (Math.cos(a) * rr * 1.5).toFixed(1) + ',' + (Math.sin(a) * rr * 0.8).toFixed(1); }
  E('path', { d: d + ' Z', fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, inner);
  T(inner, 0, 14, 'TWEET!', { size: 40, weight: 800, anchor: 'middle', fill: '#E8424F' });
  g.set = p => { p = clamp(p); op(g, p > 0 ? 1 : 0); tr(inner, 0, 0, Math.max(0.01, 0.5 + 0.5 * pop(p)), -6); };
  g.set(0);
  return g;
}

function drRope(parent, w) {
  w = w || 360;
  const g = G(parent);
  E('path', { d: `M${-w / 2},-80 Q0,-30 ${w / 2},-80`, fill: 'none', stroke: '#B0123E', 'stroke-width': 14, 'stroke-linecap': 'round' }, g);
  [-1, 1].forEach(sd => {
    E('rect', { x: sd * w / 2 - 8, y: -96, width: 16, height: 96, fill: ball('#FFE07A', '#C9931A'), stroke: SC_INK, 'stroke-width': 3 }, g);
    E('circle', { cx: sd * w / 2, cy: -102, r: 14, fill: ball('#FFE07A', '#C9931A'), stroke: SC_INK, 'stroke-width': 3 }, g);
    E('ellipse', { cx: sd * w / 2, cy: 0, rx: 30, ry: 8, fill: '#C9931A', stroke: SC_INK, 'stroke-width': 3 }, g);
  });
  return g;
}

function drPerch(parent, w) {
  w = w || 220;
  const g = G(parent);
  E('line', { x1: 0, y1: 10, x2: 0, y2: 260, stroke: '#6B4423', 'stroke-width': 12 }, g);
  E('ellipse', { cx: 0, cy: 262, rx: 70, ry: 14, fill: '#6B4423' }, g);
  E('rect', { x: -w / 2, y: -2, width: w, height: 18, rx: 9, fill: '#9C6B3E', stroke: '#4A2E16', 'stroke-width': 3 }, g);
  return g;
}
