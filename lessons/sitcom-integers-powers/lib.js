/* NEGATIVE VIBES (Claude Sitcom Ep 1, Integers, Powers & Roots): the cast, sets and props of this episode.
   Bundled after engine lib.js, kit.js, mathkit.js and sitcom.js (scMake, scTalk, scKavya, scCastHuman,
   scConfessional, scLowerThird, scVideoCall, mk* maths kit). Every top-level name starts with `ip`, except `cast`.

   Characters: cast(parent, kind, o) -> g, origin at the character's centre, about 200-260 px tall at s = 1
     o: { s (scale), mood (default mood), ... }   (humans: any scHuman option overrides, e.g. prop, lift)
     g.set({ t, talk, mood, look, sweat, still, ... })   call every frame
       talk 0..1 (use scTalk(S, t, who)); mood: neutral | happy | smug | annoyed | sad | shock | deadpan
       look -1..1 pupils left/right; still: true stops the idle bob
     HUMANS (busts, bottom of the shirt at y = 140: put them behind a table or the frame edge):
       'kavya'  (kavya)  Kavya, 12 (scKavya, PE shirt "8")
       'mum'    (mum)    Mum: magenta kurta, bun, bindi. No default prop
       'dad'    (dad)    Dad: glasses, moustache, green polo. Default prop: a calculator (his pride and joy)
       'boy'    (boy)    Ah Boy, 8: orange star tee. Default: an empty hand (lift: 1 raises it)
       'priya'  (priya)  Priya, 12: on Saturday a purple robotics-club tee ("R"), bob, yellow clip. Default prop: a tablet
       'tan'    (tan)    Mr Tan: shirt and tie (even on Saturday), glasses. Default prop: a quiz card (paper)
       'rose'   (rose)   Auntie Rose: curly perm, floral blouse, ROSE'S apron. No default prop
       Pass { prop: null } for no prop; { body: true } for a full body (scHumanBody, feet at 0,0; pose API).
     CARTOONS (scMake):
       'dash'    (dash)   Dash, the MINUS SIGN: a slate-blue horizontal capsule, black emo fringe over his right
                          eye (viewer's left), thin arms, black sneakers. Gloomy poet. Default mood sad.
                          Extra: { plus: 0..1 } a golden vertical bar grows through him: he becomes a "+" (he hates
                          it); { arms: 0..1 } raises both arms (a shrug at 0.5, hands up at 1).
       'dasha'   (dasha)  Dasha, Dash's twin sister, also a MINUS SIGN: a pink capsule, a big yellow bow, freckles.
                          Sunny. Default mood happy. Same extras { plus, arms }.
       'queenie' (queenie) Queenie, the QUEUE-NUMBER MACHINE (order of operations): a teal ticket dispenser on a
                          chrome pole, an amber LED display above her face, a ticket slot below.
                          Default mood smug. Extra: { disp: 'B' } LED text (cheap setText); { ticket: 0..1 } a ticket
                          slides out of the slot; { tkt: 'B' } the ticket's text; { ding: 0..1 } sound arcs (ding-dong).
       'pip'     (pip)    Pip, the POWER-INATOR (Priya's robot): a purple machine on wheels, a screen face, an IN
                          hopper (left), an OUT chute (right), four buttons x², x³, √x, ∛x and an LED readout.
                          Default mood happy. Extra: { btn: -1..3 } lights button i (0 x², 1 x³, 2 √x, 3 ∛x);
                          { read: '0.25' } the readout (setText); { err: 0..1 } red ERROR screen; { smoke: 0..1 } puffs
                          from the top; { shake: 0..1 } jitter; { light: 0..1 } antenna bulb.
       'basil'   (basil)  Basil, the BASE: a big stone-coloured block in a bowler hat, the base printed on his belly.
                          Calm, slow, deadpan (default). Extra: { base: '2' } the belly text (setText).
       'tiny'    (tiny)   Tiny, the INDEX: a small gold pill with a crown, waving arms, the index on his belly.
                          Hyper. Default mood happy. Extra: { idx: '3' } (setText); { arms: 0..1 } arm-wave size.
       'pi'      (pi)     Uncle Pi: a brown "π" body (the top bar is his arms, two legs, the right one curls), a round
                          uncle head with grey side hair, round glasses, a moustache. Talks forever. Default happy.
                          Extra: { digits: 0..1 } scrolls the digits ticker under him (op(g.ticker) to hide it).

   Shots
     ipConf(parent, who)             confessional background tinted for that character (scConfessional); g.set(p, t)
     IP_TINT                         the confessional colours per character
     ipLowerThird(parent, who)       scLowerThird with this episode's name and role for `who` (IP_LT); g.set(p)

   Sets (full stage 1200 x 750; each returns g)
     ipFlat(parent, o)    Kavya's HDB flat, dining area: pale wall, a window (o.night true: evening sky with lit
                          windows in the next block), a wall clock, a calendar, a shelf with a plant, the dining table
                          (top at g.tableY = 530). LAYERS: characters in g.mid (busts at y about 440 hide their shirt
                          hems), the table is g.front, props standing on the table go in g.top.
     ipVoidDeck(parent)   wide shot of the void deck of Block 210 on Family Day: the block above, square pillars, the
                          letterbox wall, a "RC FAMILY DAY" banner, bunting, five booths (g.booths[i] = [x, y] centres:
                          0 ICE CREAM, 1 CARD GAMES, 2 MATHS QUIZ, 3 ROBOTICS, 4 FOLD TO THE MOON), grass beyond.
                          g.upd(t) sways the bunting.
     ipBooth(parent, o)   close-up of one Family Day booth from the visitors' side: void deck pillars and letterbox
                          wall behind, a canopy banner (y 110-176) with o.title on o.col, bunting, a folding table with
                          a cloth in o.cloth (top at g.tableY = 530). Same LAYERS as ipFlat: g.mid, g.front, g.top.
                          g.upd(t) sways the bunting. o.title, o.col ('#2E7DD8'), o.cloth ('#E8424F'), o.text (banner ink)

   Props (around their own origin)
     ipTest(parent, o)               Kavya's test paper (about 360 x 470, centred): MATHS TEST, Name: Kavya, a red score
                                     circle, three answers with red crosses ("5 − (−3) = 2", "x² = 49, x = 7",
                                     "−4 + (−6) = 10"), a red note "Watch your signs! Mr T".
                                     o.scores (['12/20', '20/20']) builds each score once; g.show(i) shows score i
                                     (-1 none); g.rows[i] the answer rows; g.marks[i] their crosses; g.ticks[i] green
                                     ticks (hidden; for the corrected test); g.note.
     ipFreezer(parent)               Auntie Rose's chest freezer (300 wide, base centre at 0,0, about 190 tall): white
                                     body, a blue ICE CREAM band, a lid that opens, frosty vapour, a digital display.
                                     g.set({ t, lid: 0..1, temp: '−18 °C', frost: 0..1 })
     ipCard(parent, rank, red, o)    a playing card 120 x 170, centred. rank '3'; red: hearts (true) or spades (false).
                                     o.s scale. g.set(p) flips it face up (0 = back, 1 = face); g.hl(p) gold outline.
     ipRiceCooker(parent, o)         the 1st-prize rice cooker with a rosette, base centre at (0,0), about 150 tall.
     ipPaper(parent, o)              a folded paper stack, base centre at (0,0). g.set(layers) draws the stack (1 to
                                     128 layers; a line per layer up to 64, then a solid block) and its height.
     ipKueh(parent, o)               a plate of rainbow kueh lapis, 16 pieces in a 4 x 4 grid, centred.
                                     g.set(v) shows v pieces (v < 1: one piece shrunk to that fraction of its width).
     ipZones(parent, o)              THE ZONES board (about 1110 x 490, centred: y -260 to +260): a schematic number line split into
                                     three equal zones, "below 0" (FLIP, red), "0 to 1" (SHRINK, amber) and "above 1"
                                     (GROW, green), pins at 0 and 1 ("never move"), and a rule card above each zone.
                                     g.zone(i, p) lights zone i; g.card(i, p) reveals card i; g.row(i, r, p) reveals row r
                                     of card i; g.pins(p); g.title(p).
     ipStamp(parent, ok)             mkStamp 'CORRECT!' (green, ok true) or 'BZZT!' (red): the quiz-buzzer stamp.
                                     About 420 px wide at scale 1; g.set(p).
     ipFlash(parent)                 a white camera flash over the whole stage; g.set(p).
*/

/* ---------- confessional tints, lower thirds ---------- */
const IP_TINT = {
  dash: ['#14182A', '#2C3352'], dasha: ['#3A1430', '#6E2A58'], queenie: ['#0E2A2A', '#1E5856'], pip: ['#1E1640', '#3E2E7A'],
  basil: ['#26221A', '#4E4632'], tiny: ['#3A2A08', '#6E5410'], pi: ['#2E1A0E', '#5E3A1E'], kavya: ['#14243A', '#25446B'],
  mum: ['#3A1030', '#6B1E58'], dad: ['#123026', '#245A48'], boy: ['#3A2410', '#6B4414'], priya: ['#1E1640', '#3E2E7A'],
  tan: ['#1A2A3A', '#33506E'], rose: ['#3A1424', '#6E2A44'],
};
function ipConf(parent, who) { const c = IP_TINT[who] || IP_TINT.dash; return scConfessional(parent, c[0], c[1]); }
const IP_LT = {
  dash: ['DASH', 'The minus sign. Less than zero.'],
  dasha: ['DASHA', "Dash's twin. Also a minus sign."],
  queenie: ['QUEENIE', 'Queue machine. Order of operations.'],
  pip: ['PIP', 'The Power-inator. Built by Priya.'],
  tiny: ['TINY', 'The index. Counts the factors.'],
  basil: ['BASIL', 'The base. Does not change.'],
  pi: ['UNCLE PI', 'Irrational. Never stops talking.'],
  kavya: ['KAVYA, 12', 'Lost 8 marks to minus signs.'],
  mum: ['MUM', 'Corrections first.'],
  dad: ['DAD', 'Wants that rice cooker.'],
  boy: ['AH BOY, 8', "Kavya's brother. Very confident."],
  priya: ['PRIYA', 'Best friend. Undefeated.'],
  tan: ['MR TAN', 'Maths teacher. Quizmaster.'],
  rose: ['AUNTIE ROSE', "Rose's Kitchen. Brought a freezer."],
};
function ipLowerThird(parent, who) { const l = IP_LT[who] || [String(who).toUpperCase(), '']; return scLowerThird(parent, l[0], l[1]); }

/* ---------- the cast ---------- */
const IP_PROP = { mum: null, dad: 'calculator', boy: null, priya: 'tablet', tan: 'paper', rose: null };
const IP_LOOK = { priya: { style: 'tee', shirt: '#6A4BC4', logo: 'R', logoCol: '#FFE45C' } };

/* the capsule body shared by Dash and Dasha: a minus sign with a face. Returns { plus, armL, armR } */
function ipDashBody(g, a, b, plusCol) {
  // the plus bar (behind the capsule): grows when two negatives multiply
  const plus = G(g);
  E('rect', { x: -34, y: -112, width: 68, height: 224, rx: 34, fill: linGrad('#FFF2A8', plusCol || '#F2B81C', true), stroke: SC_INK, 'stroke-width': 5 }, plus);
  E('rect', { x: -22, y: -100, width: 14, height: 70, rx: 7, fill: '#FFFFFF', opacity: 0.45 }, plus);
  // legs and sneakers
  [-40, 40].forEach(x => {
    E('path', { d: `M${x},30 L${x},70`, stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
    E('path', { d: `M${x - 14},80 Q${x - 14},68 ${x + 2},68 L${x + 16},70 Q${x + 22},80 ${x + 14},82 Z`, fill: '#1E1E26', stroke: SC_INK, 'stroke-width': 3 }, g);
    E('path', { d: `M${x - 12},79 L${x + 16},79`, stroke: '#FFFFFF', 'stroke-width': 2.5 }, g);
  });
  // arms (animated)
  const armL = E('path', { d: '', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
  const armR = E('path', { d: '', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
  // the capsule
  E('rect', { x: -118, y: -38, width: 236, height: 76, rx: 38, fill: linGrad(a, b, true), stroke: SC_INK, 'stroke-width': 6 }, g);
  E('rect', { x: -96, y: -28, width: 120, height: 12, rx: 6, fill: '#FFFFFF', opacity: 0.22 }, g);
  return { plus, armL, armR };
}
function ipDashUpd(parts, st, t, k) {
  const p = clamp(st.plus || 0), a = clamp(st.arms === undefined ? 0 : st.arms);
  op(parts.plus, p > 0.01 ? 1 : 0);
  parts.plus.setAttribute('transform', `scale(1 ${Math.max(0.01, p).toFixed(3)})`);
  const w = Math.sin(t * TAU * 1.4 + k) * 6 * a;
  [[parts.armL, -1], [parts.armR, 1]].forEach(([el, sd]) => {
    const hx = sd * (132 + 10 * a), hy = 34 - 96 * a + w * sd;
    el.setAttribute('d', `M${sd * 112},12 Q${sd * 136},${(30 - 30 * a).toFixed(1)} ${hx.toFixed(1)},${hy.toFixed(1)}`);
  });
}

function cast(parent, kind, o) {
  o = o || {};
  if (kind === 'kavya') return scKavya(parent, o);
  if (SC_HUMANS[kind]) {
    const p = Object.assign({}, kind === 'boy' ? { hand: true } : { prop: IP_PROP[kind] }, IP_LOOK[kind] || {}, o);
    return scCastHuman(parent, kind, p);
  }
  const S = { s: o.s, mood: o.mood };
  let c;
  if (kind === 'dash' || kind === 'dasha') {
    let parts = null;
    const isA = kind === 'dasha';
    c = scMake(parent, Object.assign(S, { seed: isA ? 6 : 2, bob: isA ? 6 : 2, mood: o.mood || (isA ? 'happy' : 'sad'),
      draw: g => {
        parts = isA ? ipDashBody(g, '#FFA6CF', '#E0458C', '#F2B81C') : ipDashBody(g, '#6E7AA6', '#2E3552');
        if (isA) {
          // freckles and blush
          [-62, -54, 54, 62].forEach((x, i) => E('circle', { cx: x, cy: i % 2 ? 14 : 8, r: 2.6, fill: '#A8305E' }, g));
          E('ellipse', { cx: -60, cy: 18, rx: 11, ry: 6, fill: '#FF5F9A', opacity: 0.45 }, g);
          E('ellipse', { cx: 60, cy: 18, rx: 11, ry: 6, fill: '#FF5F9A', opacity: 0.45 }, g);
        }
      },
      face: { x: 0, y: -4, eye: 14, gap: 58, mouthW: 30, mouthY: 20, lidCol: isA ? '#F27BB0' : '#4A557E' },
      upd: (t, g, st) => ipDashUpd(parts, st, t, isA ? 2 : 0) }));
    const inner = c.firstChild;
    if (isA) {   // a big yellow bow on top
      const bow = G(inner); tr(bow, 46, -44, 1, 12);
      E('path', { d: 'M0,0 L-34,-20 L-30,22 Z M0,0 L34,-20 L30,22 Z', fill: '#FFD23C', stroke: SC_INK, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, bow);
      E('circle', { r: 9, fill: '#F2A71C', stroke: SC_INK, 'stroke-width': 3 }, bow);
    } else {     // the emo fringe, over his right eye (the viewer's left), in front of the face
      const fr = G(inner);
      E('path', { d: 'M-104,-30 Q-70,-56 -6,-46 Q30,-42 40,-34 Q6,-34 -14,-18 Q-30,-2 -50,6 Q-58,-8 -66,-10 Q-80,-4 -92,4 Q-108,-10 -104,-30 Z', fill: '#121218', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, fr);
      E('path', { d: 'M-80,-36 Q-50,-44 -20,-38', fill: 'none', stroke: '#3A3A48', 'stroke-width': 3, 'stroke-linecap': 'round' }, fr);
    }
  } else if (kind === 'queenie') {
    let led = null, tk = null, tkT = null, ding = null;
    c = scMake(parent, Object.assign(S, { seed: 31, bob: 1, mood: o.mood || 'smug',
      draw: g => {
        // pole and base
        E('rect', { x: -10, y: 96, width: 20, height: 104, fill: linGrad('#E6EBEF', '#8F9CAB', false), stroke: SC_INK, 'stroke-width': 3 }, g);
        E('ellipse', { cx: 0, cy: 204, rx: 70, ry: 14, fill: '#8F9CAB', stroke: SC_INK, 'stroke-width': 4 }, g);
        // the ticket (behind the box: it slides out of the slot)
        tk = G(g);
        E('rect', { x: -40, y: 0, width: 80, height: 86, rx: 4, fill: '#FFFDF6', stroke: SC_INK, 'stroke-width': 3 }, tk);
        E('line', { x1: -30, y1: 14, x2: 30, y2: 14, stroke: '#C9D3DC', 'stroke-width': 3 }, tk);
        tkT = T(tk, 0, 62, 'B', { size: 40, weight: 800, anchor: 'middle', fill: '#C62828' });
        // the box
        E('rect', { x: -96, y: -160, width: 192, height: 260, rx: 26, fill: linGrad('#3FBDB8', '#1C7470', true), stroke: SC_INK, 'stroke-width': 6 }, g);
        E('rect', { x: -84, y: -150, width: 30, height: 230, rx: 14, fill: '#FFFFFF', opacity: 0.14 }, g);
        // speaker grilles (ears)
        [-1, 1].forEach(sd => { E('rect', { x: sd * 96 - (sd < 0 ? 14 : 0), y: -70, width: 14, height: 56, rx: 6, fill: '#E6EBEF', stroke: SC_INK, 'stroke-width': 3 }, g); });
        // LED display
        E('rect', { x: -80, y: -146, width: 160, height: 66, rx: 10, fill: '#14100C', stroke: SC_INK, 'stroke-width': 4 }, g);
        led = T(g, 0, -98, 'B', { size: 44, weight: 800, anchor: 'middle', fill: '#FFB020' });
        // ticket slot and a "press" button
        E('rect', { x: -48, y: 56, width: 96, height: 12, rx: 5, fill: '#0E1A1A', stroke: SC_INK, 'stroke-width': 3 }, g);
        E('circle', { cx: 64, cy: 34, r: 13, fill: '#E8424F', stroke: SC_INK, 'stroke-width': 3 }, g);
        // ding-dong arcs
        ding = G(g); tr(ding, 0, -170);
        [-1, 1].forEach(sd => [0, 1].forEach(k => E('path', { d: `M${sd * (104 + k * 18)},-10 Q${sd * (118 + k * 22)},14 ${sd * (104 + k * 18)},38`, fill: 'none', stroke: '#FFE45C', 'stroke-width': 5, 'stroke-linecap': 'round' }, ding)));
      },
      face: { x: 0, y: -22, eye: 15, gap: 60, mouthW: 36, mouthY: 30, lidCol: '#2FA39E' },
      upd: (t, g, st) => {
        if (st.disp !== undefined && led.textContent !== String(st.disp)) setText(led, String(st.disp));
        if (st.tkt !== undefined && tkT.textContent !== String(st.tkt)) setText(tkT, String(st.tkt));
        tr(tk, 0, 10 + 92 * clamp(st.ticket || 0));
        const d = clamp(st.ding || 0); op(ding, d * (0.6 + 0.4 * Math.sin(t * 18)));
      } }));
  } else if (kind === 'pip') {
    let btns = [], read = null, errG = null, smoke = [], bulb = null;
    c = scMake(parent, Object.assign(S, { seed: 37, bob: 2, mood: o.mood || 'happy',
      draw: g => {
        // wheels
        [-86, 86].forEach(x => { E('circle', { cx: x, cy: 140, r: 26, fill: '#2A2A36', stroke: SC_INK, 'stroke-width': 4 }, g); E('circle', { cx: x, cy: 140, r: 9, fill: '#9AA6B2' }, g); });
        // IN hopper (left) and OUT chute (right)
        E('path', { d: 'M-150,-104 L-96,-104 L-104,-50 L-128,-50 Z', fill: '#FFC247', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
        T(g, -123, -112, 'IN', { size: 26, weight: 800, anchor: 'middle', fill: '#FFE45C' });
        E('path', { d: 'M132,40 L196,64 L196,96 L132,80 Z', fill: '#FFC247', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
        T(g, 168, 126, 'OUT', { size: 26, weight: 800, anchor: 'middle', fill: '#FFE45C' });
        // body
        E('rect', { x: -134, y: -60, width: 268, height: 190, rx: 20, fill: linGrad('#8C7BFF', '#4B3CB8', true), stroke: SC_INK, 'stroke-width': 6 }, g);
        [[-120, -46], [120, -46], [-120, 116], [120, 116]].forEach(([x, y]) => E('circle', { cx: x, cy: y, r: 4.5, fill: '#D8D2FF' }, g));
        // four buttons: x², x³, √x, ∛x
        ['x^2', 'x^3', 'sqrt(x)', 'cbrt(x)'].forEach((src, i) => {
          const x = -96 + i * 64;
          const r = E('rect', { x: x - 28, y: -42, width: 56, height: 52, rx: 12, fill: '#F2F0FF', stroke: SC_INK, 'stroke-width': 3 }, g);
          mkMath(g, x, -6, src, { size: 26, fill: MK.ink, anchor: 'middle', weight: 700 });
          btns.push(r);
        });
        // LED readout
        E('rect', { x: -110, y: 28, width: 220, height: 70, rx: 10, fill: '#0E1A12', stroke: SC_INK, 'stroke-width': 4 }, g);
        read = T(g, 96, 78, '', { size: 40, weight: 700, anchor: 'end', fill: '#7CFFB2' });
        // antenna
        E('path', { d: 'M0,-176 L0,-212', stroke: SC_INK, 'stroke-width': 5 }, g);
        bulb = E('circle', { cx: 0, cy: -218, r: 11, fill: '#FF5FA2', stroke: SC_INK, 'stroke-width': 3 }, g);
        // the head: a screen
        E('rect', { x: -104, y: -178, width: 208, height: 122, rx: 18, fill: '#C9C2FF', stroke: SC_INK, 'stroke-width': 6 }, g);
        E('rect', { x: -92, y: -166, width: 184, height: 98, rx: 12, fill: '#13202C', stroke: SC_INK, 'stroke-width': 3 }, g);
        // smoke puffs (above the head)
        for (let i = 0; i < 4; i++) smoke.push(E('circle', { cx: 0, cy: 0, r: 20, fill: '#9AA6B2', stroke: '#6E7884', 'stroke-width': 3 }, g));
      },
      face: { x: 0, y: -126, eye: 17, gap: 72, mouthW: 44, mouthY: 30, lidCol: '#13202C', iris: '#2A9D6A', brow: false },
      upd: (t, g, st) => {
        const b = st.btn === undefined ? -1 : st.btn;
        btns.forEach((r, i) => attr(r, 'fill', i === b ? '#FFE45C' : '#F2F0FF'));
        if (st.read !== undefined && read.textContent !== String(st.read)) setText(read, String(st.read));
        if (errG) op(errG, clamp(st.err || 0) * (0.75 + 0.25 * Math.sin(t * 14)));
        const sm = clamp(st.smoke || 0);
        smoke.forEach((s, i) => { const f = (t * 0.6 + i / 4) % 1; attr(s, 'cx', -30 + i * 20 + Math.sin(t * 2 + i) * 10); attr(s, 'cy', -190 - f * 120); attr(s, 'r', 14 + f * 22); op(s, sm * (1 - f) * 0.9); });
        attr(bulb, 'fill', (st.light || 0) > 0.5 && Math.sin(t * 12) > 0 ? '#FFE45C' : '#FF5FA2');
        const sh = clamp(st.shake || 0);
        if (sh > 0) g.setAttribute('transform', `translate(${(Math.sin(t * 61) * 6 * sh).toFixed(1)} ${(Math.cos(t * 47) * 4 * sh).toFixed(1)})`);
      } }));
    // the ERROR screen sits in front of the face
    const inner = c.firstChild;
    errG = G(inner);
    E('rect', { x: -92, y: -166, width: 184, height: 98, rx: 12, fill: '#B3122A' }, errG);
    T(errG, 0, -104, 'ERROR', { size: 42, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 3 });
    op(errG, 0);
  } else if (kind === 'basil') {
    let belly = null;
    c = scMake(parent, Object.assign(S, { seed: 41, bob: 1, mood: o.mood || 'deadpan',
      draw: g => {
        [-50, 50].forEach(x => E('rect', { x: x - 26, y: 104, width: 52, height: 26, rx: 10, fill: '#5A5042', stroke: SC_INK, 'stroke-width': 4 }, g));
        E('path', { d: 'M-108,10 Q-132,40 -124,76 M108,10 Q132,40 124,76', fill: 'none', stroke: SC_INK, 'stroke-width': 8, 'stroke-linecap': 'round' }, g);
        E('circle', { cx: -124, cy: 80, r: 12, fill: '#E9DFC9', stroke: SC_INK, 'stroke-width': 3 }, g);
        E('circle', { cx: 124, cy: 80, r: 12, fill: '#E9DFC9', stroke: SC_INK, 'stroke-width': 3 }, g);
        E('rect', { x: -110, y: -110, width: 220, height: 220, rx: 30, fill: linGrad('#F2EAD6', '#C9BC9C', true), stroke: SC_INK, 'stroke-width': 6 }, g);
        E('path', { d: 'M-90,-20 L-70,-14 M70,-60 L86,-50 M-60,80 L-40,86', stroke: '#B0A27E', 'stroke-width': 3, 'stroke-linecap': 'round' }, g);   // stone flecks
        E('rect', { x: -70, y: 22, width: 140, height: 80, rx: 14, fill: '#FFFDF6', stroke: '#8C7E5C', 'stroke-width': 3 }, g);
        belly = T(g, 0, 88, '2', { size: 72, weight: 800, anchor: 'middle', fill: SC_INK });
        // bowler hat
        const h = G(g); tr(h, 0, -110);
        E('ellipse', { cx: 0, cy: 0, rx: 88, ry: 14, fill: '#26222A', stroke: SC_INK, 'stroke-width': 4 }, h);
        E('path', { d: 'M-56,0 Q-58,-62 0,-64 Q58,-62 56,0 Z', fill: '#2E2A34', stroke: SC_INK, 'stroke-width': 4 }, h);
        E('path', { d: 'M-56,-6 Q0,4 56,-6', fill: 'none', stroke: '#8E2430', 'stroke-width': 8 }, h);
      },
      face: { x: 0, y: -46, eye: 15, gap: 64, mouthW: 38, mouthY: 34, lidCol: '#DCCFB0' },
      upd: (t, g, st) => { if (st.base !== undefined && belly.textContent !== String(st.base)) setText(belly, String(st.base)); } }));
  } else if (kind === 'tiny') {
    let idx = null, arms = [];
    c = scMake(parent, Object.assign(S, { seed: 43, bob: 8, mood: o.mood || 'happy',
      draw: g => {
        [-1, 1].forEach(sd => arms.push({ a: E('path', { d: '', fill: 'none', stroke: SC_INK, 'stroke-width': 6, 'stroke-linecap': 'round' }, g), sd }));
        [-20, 20].forEach(x => E('path', { d: `M${x},64 L${x},86`, stroke: SC_INK, 'stroke-width': 6, 'stroke-linecap': 'round' }, g));
        E('rect', { x: -58, y: -72, width: 116, height: 140, rx: 50, fill: linGrad('#FFE27A', '#E2A21C', true), stroke: SC_INK, 'stroke-width': 5 }, g);
        E('rect', { x: -44, y: -60, width: 22, height: 70, rx: 11, fill: '#FFFFFF', opacity: 0.35 }, g);
        idx = T(g, 0, 56, '3', { size: 44, weight: 800, anchor: 'middle', fill: '#7A4A06' });
        const cr = G(g); tr(cr, 0, -78);
        E('path', { d: 'M-30,0 L-34,-30 L-16,-14 L0,-36 L16,-14 L34,-30 L30,0 Z', fill: '#FFD23C', stroke: SC_INK, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, cr);
        E('circle', { cx: 0, cy: -12, r: 5, fill: '#E8424F' }, cr);
      },
      face: { x: 0, y: -24, eye: 11, gap: 40, mouthW: 26, mouthY: 20, lidCol: '#F2C24A' },
      upd: (t, g, st) => {
        const k = st.arms === undefined ? 0.7 : st.arms;
        arms.forEach(({ a, sd }, i) => { const w = Math.sin(t * TAU * 2.2 + i * 2) * 18 * k; a.setAttribute('d', `M${sd * 56},6 Q${sd * 84},${(-4 - 10 * k).toFixed(1)} ${sd * 86},${(-20 - 30 * k + w).toFixed(1)}`); });
        if (st.idx !== undefined && idx.textContent !== String(st.idx)) setText(idx, String(st.idx));
      } }));
  } else if (kind === 'pi') {
    let tk = null, tape = null;
    const DIG = '3.14159265358979323846264338327950288419716939937510582097494459230781640628620899';
    c = scMake(parent, Object.assign(S, { seed: 47, bob: 3, mood: o.mood || 'happy',
      draw: g => {
        // the π body: an ink outline under a brown stroke
        const d = 'M-104,-30 Q-60,-44 0,-40 Q60,-36 104,-46 M-46,-38 Q-50,30 -66,104 M40,-38 Q34,40 44,92 Q52,108 74,98';
        E('path', { d, fill: 'none', stroke: SC_INK, 'stroke-width': 40, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
        E('path', { d, fill: 'none', stroke: '#D9843A', 'stroke-width': 30, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
        E('path', { d: 'M-90,-38 Q-50,-48 -10,-46', fill: 'none', stroke: '#FFC98E', 'stroke-width': 6, 'stroke-linecap': 'round' }, g);
        [[-112, -30], [112, -46]].forEach(([x, y]) => E('circle', { cx: x, cy: y, r: 15, fill: '#E8B98A', stroke: SC_INK, 'stroke-width': 3.5 }, g));
        [[-74, 112], [84, 104]].forEach(([x, y]) => E('ellipse', { cx: x, cy: y, rx: 20, ry: 9, fill: '#3A2A20', stroke: SC_INK, 'stroke-width': 3 }, g));
        // the head
        E('rect', { x: -14, y: -66, width: 28, height: 30, fill: '#E8B98A' }, g);
        E('circle', { cx: 0, cy: -116, r: 62, fill: '#E8B98A', stroke: SC_INK, 'stroke-width': 5 }, g);
        E('path', { d: 'M-62,-112 Q-66,-150 -40,-166 Q-48,-140 -46,-118 Z M62,-112 Q66,-150 40,-166 Q48,-140 46,-118 Z', fill: '#B9BEC4', stroke: SC_INK, 'stroke-width': 3 }, g);
        E('path', { d: 'M-30,-176 Q0,-186 30,-176', fill: 'none', stroke: '#B9BEC4', 'stroke-width': 5, 'stroke-linecap': 'round' }, g);   // the comb-over
        [-1, 1].forEach(sd => E('ellipse', { cx: sd * 62, cy: -110, rx: 10, ry: 15, fill: '#E8B98A', stroke: SC_INK, 'stroke-width': 3.5 }, g));
        // the digits ticker under his feet
        tk = G(g); tr(tk, 0, 150);
        E('rect', { x: -170, y: -24, width: 340, height: 48, rx: 24, fill: 'rgba(10,27,39,0.9)', stroke: '#FFC98E', 'stroke-width': 3 }, tk);
        const clip = _clipUrl('M-158,-22 L158,-22 L158,22 L-158,22 Z');
        const win = G(tk, { 'clip-path': clip });
        tape = T(win, -150, 11, DIG, { size: 30, weight: 700, fill: '#FFE45C', ls: 2 });
      },
      face: { x: 0, y: -112, eye: 13, gap: 48, mouthW: 32, mouthY: 34, lidCol: '#D9A574' },
      upd: (t, g, st) => { tr(tape, -clamp(st.digits || 0) * 1500, 0); } }));
    const inner = c.firstChild, F = G(inner); tr(F, 0, -112);
    [-1, 1].forEach(sd => E('circle', { cx: sd * 24, cy: 0, r: 20, fill: 'rgba(255,255,255,0.14)', stroke: '#3A2A20', 'stroke-width': 4 }, F));
    E('path', { d: 'M-4,-2 Q0,-6 4,-2', fill: 'none', stroke: '#3A2A20', 'stroke-width': 4 }, F);
    E('path', { d: 'M0,20 C-10,14 -26,16 -34,26 C-24,24 -12,26 0,24 C12,26 24,24 34,26 C26,16 10,14 0,20 Z', fill: '#B9BEC4', stroke: SC_INK, 'stroke-width': 2.5 }, F);
    c.ticker = tk;
  } else {
    c = scKavya(parent, o);
  }
  return c;
}

/* ---------- sets ---------- */
function ipBunting(parent, x0, x1, y, sag, n) {
  const g = G(parent), cols = ['#E8424F', '#FFC247', '#56D69B', '#4CC9F0', '#B48CFF', '#FF8FC8'];
  const line = E('path', { d: '', fill: 'none', stroke: '#5A6670', 'stroke-width': 3 }, g);
  const flags = [];
  for (let i = 0; i < n; i++) flags.push(E('path', { d: 'M-16,0 L16,0 L0,30 Z', fill: cols[i % cols.length], stroke: SC_INK, 'stroke-width': 2 }, g));
  g.upd = t => {
    const s = sag + Math.sin(t * 1.3) * 4;
    attr(line, 'd', `M${x0},${y} Q${(x0 + x1) / 2},${(y + 2 * s).toFixed(1)} ${x1},${y}`);
    flags.forEach((f, i) => {
      const u = (i + 0.5) / n, x = lerp(x0, x1, u), yy = y + 4 * s * u * (1 - u);
      f.setAttribute('transform', `translate(${x.toFixed(1)} ${yy.toFixed(1)}) rotate(${(Math.sin(t * 2 + i) * 6).toFixed(1)})`);
    });
  };
  g.upd(0);
  return g;
}

function ipFlat(parent, o) {
  o = o || {};
  const g = G(parent), back = G(g);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#FBEFD2', '#F1DDB4', true) }, back);
  E('rect', { x: 0, y: 470, width: 1200, height: 280, fill: '#E7CFA0' }, back);   // lower wall
  E('rect', { x: 0, y: 466, width: 1200, height: 10, fill: '#C9A774' }, back);
  // window
  const wx = 640, wy = 130, ww = 400, wh = 280;
  E('rect', { x: wx - 12, y: wy - 12, width: ww + 24, height: wh + 24, rx: 8, fill: '#FFFFFF', stroke: '#9C8A6A', 'stroke-width': 4 }, back);
  E('rect', { x: wx, y: wy, width: ww, height: wh, fill: o.night ? linGrad('#1E2A5A', '#E07A5F', true) : linGrad('#8FD3FF', '#DDF3FF', true) }, back);
  // the next HDB block through the window
  E('rect', { x: wx + 40, y: wy + 70, width: 300, height: wh - 70, fill: o.night ? '#3A3550' : '#E9DCC4', stroke: o.night ? '#22203A' : '#9C8A6A', 'stroke-width': 3 }, back);
  let win = '';
  for (let r = 0; r < 4; r++) for (let k = 0; k < 6; k++) win += `M${wx + 58 + k * 46},${wy + 88 + r * 46} h28 v20 h-28 Z `;
  E('path', { d: win, fill: o.night ? '#FFD86B' : '#9CC2DC', opacity: o.night ? 0.85 : 1 }, back);
  E('path', { d: `M${wx + ww / 2},${wy} L${wx + ww / 2},${wy + wh} M${wx},${wy + wh / 2} L${wx + ww},${wy + wh / 2}`, stroke: '#FFFFFF', 'stroke-width': 8 }, back);
  // wall clock
  const ck = G(back); tr(ck, 300, 200);
  E('circle', { r: 58, fill: '#FFFFFF', stroke: '#5A6670', 'stroke-width': 6 }, ck);
  for (let i = 0; i < 12; i++) { const a = i * TAU / 12; E('line', { x1: Math.cos(a) * 46, y1: Math.sin(a) * 46, x2: Math.cos(a) * 52, y2: Math.sin(a) * 52, stroke: '#5A6670', 'stroke-width': 3 }, ck); }
  E('path', { d: o.night ? 'M0,0 L0,30 M0,0 L-26,-10' : 'M0,0 L0,-40 M0,0 L22,10', stroke: SC_INK, 'stroke-width': 5, 'stroke-linecap': 'round' }, ck);
  // calendar
  const cal = G(back); tr(cal, 470, 170);
  E('rect', { x: -60, y: -60, width: 120, height: 140, rx: 6, fill: '#FFFFFF', stroke: '#9C8A6A', 'stroke-width': 3 }, cal);
  E('rect', { x: -60, y: -60, width: 120, height: 34, rx: 6, fill: '#E8424F' }, cal);
  let grid = '';
  for (let r = 0; r < 4; r++) for (let k = 0; k < 5; k++) grid += `M${-48 + k * 20},${-12 + r * 22} h12 v12 h-12 Z `;
  E('path', { d: grid, fill: '#C9D3DC' }, cal);
  // shelf with a plant
  E('rect', { x: 100, y: 330, width: 260, height: 14, fill: '#9C6B3E', stroke: '#6B4423', 'stroke-width': 3 }, back);
  const pl = G(back); tr(pl, 160, 330);
  E('path', { d: 'M-22,0 L22,0 L16,-40 L-16,-40 Z', fill: '#E06A4E', stroke: SC_INK, 'stroke-width': 3 }, pl);
  [[-30, -90], [0, -104], [30, -86], [-14, -70], [18, -66]].forEach(([x, y]) => E('path', { d: `M0,-40 Q${x / 2},${(y - 40) / 2} ${x},${y}`, fill: 'none', stroke: '#3FA463', 'stroke-width': 9, 'stroke-linecap': 'round' }, pl));
  E('rect', { x: 230, y: 290, width: 90, height: 40, rx: 4, fill: '#4CC9F0', stroke: SC_INK, 'stroke-width': 3 }, back);   // books
  E('rect', { x: 236, y: 266, width: 76, height: 24, rx: 4, fill: '#FFC247', stroke: SC_INK, 'stroke-width': 3 }, back);
  g.mid = G(g);
  const front = G(g);
  E('rect', { x: 60, y: 520, width: 1080, height: 24, rx: 8, fill: '#B07A45', stroke: '#6B4423', 'stroke-width': 4 }, front);
  E('rect', { x: 80, y: 544, width: 1040, height: 206, fill: linGrad('#9C6B3E', '#7A5230', true), stroke: '#6B4423', 'stroke-width': 4 }, front);
  E('path', { d: 'M80,600 L1120,600', stroke: '#6B4423', 'stroke-width': 3, opacity: 0.6 }, front);
  g.front = front;
  g.top = G(g);
  g.tableY = 530;
  return g;
}

function ipVoidDeck(parent) {
  const g = G(parent);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#9FD8FF', '#E3F4FF', true) }, g);
  // the block above
  E('rect', { x: 0, y: 0, width: 1200, height: 200, fill: '#EDE3CF' }, g);
  let win = '';
  for (let r = 0; r < 3; r++) for (let k = 0; k < 12; k++) win += `M${30 + k * 98},${18 + r * 58} h56 v32 h-56 Z `;
  E('path', { d: win, fill: '#9CC2DC', stroke: '#9C8A6A', 'stroke-width': 2 }, g);
  E('rect', { x: 0, y: 196, width: 1200, height: 18, fill: '#C9B48A' }, g);
  E('rect', { x: 1030, y: 132, width: 130, height: 50, rx: 6, fill: '#2E7DD8' }, g);
  T(g, 1095, 168, 'BLK 210', { size: 28, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  // under the block: ceiling, letterbox wall, floor, grass beyond the open side
  E('rect', { x: 0, y: 214, width: 1200, height: 536, fill: '#F4EEE2' }, g);
  E('rect', { x: 0, y: 214, width: 1200, height: 26, fill: '#E2D9C6' }, g);
  [180, 520, 860].forEach(x => E('rect', { x: x, y: 228, width: 140, height: 8, rx: 4, fill: '#FFFFFF', stroke: '#C9D3DC', 'stroke-width': 2 }, g));   // tube lights
  const lb = G(g); tr(lb, 430, 260);
  E('rect', { x: 0, y: 0, width: 340, height: 150, fill: '#B9C4CE', stroke: '#7D8A96', 'stroke-width': 3 }, lb);
  let boxes = '';
  for (let r = 0; r < 4; r++) for (let k = 0; k < 8; k++) boxes += `M${8 + k * 41},${8 + r * 35} h35 v29 h-35 Z `;
  E('path', { d: boxes, fill: '#D9E0E6', stroke: '#7D8A96', 'stroke-width': 1.5 }, lb);
  E('rect', { x: 0, y: 560, width: 1200, height: 190, fill: '#D9CFBC' }, g);   // floor
  let tl = '';
  for (let x = 0; x <= 1200; x += 80) tl += `M${x},560 L${x + (x - 600) * 0.3},750 `;
  E('path', { d: tl, stroke: '#C9BCA4', 'stroke-width': 2 }, g);
  // pillars
  [60, 360, 840, 1140].forEach(x => { E('rect', { x: x - 34, y: 214, width: 68, height: 400, fill: linGrad('#FFFFFF', '#DCD3C2', false), stroke: '#9C8A6A', 'stroke-width': 3 }, g); });
  // banner
  E('rect', { x: 330, y: 250, width: 540, height: 0, fill: 'none' }, g);
  const bn = G(g); tr(bn, 600, 300);
  E('rect', { x: -250, y: -34, width: 500, height: 68, rx: 10, fill: '#E8424F', stroke: '#8E1B1B', 'stroke-width': 4 }, bn);
  T(bn, 0, 14, 'RC FAMILY DAY', { size: 40, weight: 800, anchor: 'middle', fill: '#FFE45C', ls: 3 });
  const bunt = ipBunting(g, 0, 1200, 226, 6, 22);
  // booths: a canopy, a table with a cloth
  const B = [['ICE CREAM', '#4CC9F0', '#2E7DD8'], ['CARD GAMES', '#56D69B', '#1E9E5A'], ['MATHS QUIZ', '#FFC247', '#C27C0E'], ['ROBOTICS', '#B48CFF', '#6A4BC4'], ['FOLD TO THE MOON', '#FF8FC8', '#C2185B']];
  g.booths = [];
  B.forEach(([name, cloth, col], i) => {
    const x = 120 + i * 240, y = 520;
    const bg = G(g); tr(bg, x, y);
    E('rect', { x: -104, y: -150, width: 208, height: 40, rx: 6, fill: col, stroke: SC_INK, 'stroke-width': 3 }, bg);
    T(bg, 0, -122, name, { size: name.length > 12 ? 18 : 22, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
    E('path', { d: 'M-96,-110 L-96,60 M96,-110 L96,60', stroke: '#7D8A96', 'stroke-width': 5 }, bg);
    E('rect', { x: -96, y: 0, width: 192, height: 70, rx: 4, fill: cloth, stroke: SC_INK, 'stroke-width': 3 }, bg);
    E('path', { d: 'M-96,40 L96,40', stroke: '#FFFFFF', 'stroke-width': 4, opacity: 0.5 }, bg);
    g.booths.push([x, y]);
  });
  // grass beyond the open side, bottom strip
  E('rect', { x: 0, y: 700, width: 1200, height: 50, fill: '#7CC46A' }, g);
  g.upd = t => bunt.upd(t);
  return g;
}

function ipBooth(parent, o) {
  o = o || {};
  const g = G(parent), back = G(g), col = o.col || '#2E7DD8';
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#F4EEE2' }, back);
  E('rect', { x: 0, y: 0, width: 1200, height: 96, fill: '#E2D9C6' }, back);   // ceiling
  E('rect', { x: 260, y: 60, width: 200, height: 10, rx: 5, fill: '#FFFFFF', stroke: '#C9D3DC', 'stroke-width': 2 }, back);
  E('rect', { x: 760, y: 60, width: 200, height: 10, rx: 5, fill: '#FFFFFF', stroke: '#C9D3DC', 'stroke-width': 2 }, back);
  // the open side: grass and the next block, framed by pillars
  E('rect', { x: 140, y: 96, width: 920, height: 440, fill: linGrad('#9FD8FF', '#E3F4FF', true) }, back);
  E('rect', { x: 140, y: 420, width: 920, height: 116, fill: '#7CC46A' }, back);
  E('rect', { x: 600, y: 200, width: 360, height: 220, fill: '#E9DCC4', stroke: '#9C8A6A', 'stroke-width': 3 }, back);
  let win = '';
  for (let r = 0; r < 4; r++) for (let k = 0; k < 6; k++) win += `M${616 + k * 58},${214 + r * 50} h34 v24 h-34 Z `;
  E('path', { d: win, fill: '#9CC2DC' }, back);
  E('circle', { cx: 300, cy: 380, r: 70, fill: '#3FA463' }, back);   // a tree
  E('circle', { cx: 370, cy: 400, r: 54, fill: '#56B870' }, back);
  E('rect', { x: 316, y: 410, width: 18, height: 80, fill: '#8B5A2B' }, back);
  // pillars
  [[70, 140], [1130, 140]].forEach(([x, w]) => E('rect', { x: x - w / 2, y: 96, width: w, height: 654, fill: linGrad('#FFFFFF', '#DCD3C2', false), stroke: '#9C8A6A', 'stroke-width': 3 }, back));
  // floor
  E('rect', { x: 140, y: 536, width: 920, height: 214, fill: '#D9CFBC' }, back);
  // canopy banner
  E('rect', { x: 150, y: 110, width: 900, height: 66, rx: 10, fill: col, stroke: SC_INK, 'stroke-width': 4 }, back);
  const sg = T(back, 600, 157, o.title || 'RC FAMILY DAY', { size: 42, weight: 800, anchor: 'middle', fill: o.text || '#FFFFFF', ls: 2 });
  sg.setAttribute('stroke', SC_INK); sg.setAttribute('stroke-width', 5); sg.setAttribute('paint-order', 'stroke');
  [180, 1020].forEach(x => E('path', { d: `M${x},176 L${x},540`, stroke: '#7D8A96', 'stroke-width': 7 }, back));   // canopy poles
  const bunt = ipBunting(back, 150, 1050, 182, 10, 18);
  g.mid = G(g);
  const front = G(g);
  E('rect', { x: 120, y: 520, width: 960, height: 22, rx: 6, fill: '#E6EBEF', stroke: '#7D8A96', 'stroke-width': 4 }, front);
  E('path', { d: 'M130,542 L1070,542 L1084,750 L116,750 Z', fill: o.cloth || '#E8424F', stroke: SC_INK, 'stroke-width': 4 }, front);
  let fold = '';
  for (let x = 200; x < 1080; x += 110) fold += `M${x},546 L${x + 6},750 `;
  E('path', { d: fold, stroke: '#FFFFFF', 'stroke-width': 3, opacity: 0.25 }, front);
  g.front = front;
  g.top = G(g);
  g.tableY = 530;
  g.upd = t => bunt.upd(t);
  return g;
}

/* ---------- props ---------- */
function ipTest(parent, o) {
  o = o || {};
  const g = G(parent), w = 360, h = 470, RED = '#D32F2F';
  E('rect', { x: -w / 2 + 8, y: -h / 2 + 10, width: w, height: h, rx: 6, fill: 'rgba(0,0,0,0.25)' }, g);
  E('rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: 6, fill: '#FFFFFF', stroke: '#B8C4CE', 'stroke-width': 3 }, g);
  T(g, -w / 2 + 24, -h / 2 + 46, 'MATHS TEST', { size: 30, weight: 800, fill: MK.ink });
  T(g, -w / 2 + 24, -h / 2 + 84, 'Name: Kavya', { size: 26, weight: 600, fill: '#5A6670', font: FB });
  g.scores = (o.scores || ['12/20', '20/20']).map((src, i) => {
    const s = G(g); tr(s, w / 2 - 66, -h / 2 + 66);
    E('circle', { r: 50, fill: 'none', stroke: i ? '#1E9E5A' : RED, 'stroke-width': 5 }, s);
    mkMath(s, 0, 10, src, { size: 32, fill: i ? '#1E9E5A' : RED, anchor: 'middle', italic: false });
    op(s, 0);
    return s;
  });
  g.show = k => g.scores.forEach((s, i) => op(s, i === k ? 1 : 0));
  E('line', { x1: -w / 2 + 20, y1: -h / 2 + 116, x2: w / 2 - 20, y2: -h / 2 + 116, stroke: '#C9D3DC', 'stroke-width': 2 }, g);
  const rows = o.rows || ['1. {{5 - (-3) = 2}}', '6. {{x^2 = 49, x = 7}}', '9. {{-4 + (-6) = 10}}'];
  g.rows = []; g.marks = []; g.ticks = [];
  rows.forEach((src, i) => {
    const y = -h / 2 + 176 + i * 78;
    g.rows.push(mkText(g, -w / 2 + 24, y, src, { size: 28, fill: MK.ink, weight: 600 }));
    const m = cross(g, 14, RED); tr(m, w / 2 - 40, y - 10); g.marks.push(m);
    const k = tick(g, 16, '#1E9E5A'); tr(k, w / 2 - 40, y - 10); op(k, 0); g.ticks.push(k);
  });
  g.note = T(g, -w / 2 + 24, h / 2 - 36, 'Watch your signs! Mr T', { size: 26, weight: 700, fill: RED, font: FB });
  g.W = w; g.H = h;
  return g;
}

function ipFreezer(parent) {
  const g = G(parent);
  const vap = [];
  for (let i = 0; i < 4; i++) vap.push(E('ellipse', { cx: 0, cy: 0, rx: 34, ry: 16, fill: '#FFFFFF', opacity: 0 }, g));
  // body
  E('rect', { x: -150, y: -150, width: 300, height: 150, rx: 14, fill: linGrad('#FFFFFF', '#D9E3EA', true), stroke: '#5A6670', 'stroke-width': 5 }, g);
  E('rect', { x: -150, y: -112, width: 300, height: 34, fill: '#2E7DD8' }, g);
  T(g, -40, -86, 'ICE CREAM', { size: 26, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 2 });
  // digital display
  E('rect', { x: 52, y: -64, width: 86, height: 44, rx: 6, fill: '#0E1A24', stroke: '#5A6670', 'stroke-width': 3 }, g);
  const temp = T(g, 95, -32, '−18 °C', { size: 22, weight: 700, anchor: 'middle', fill: '#7CD8FF' });
  // the tubs inside, seen when the lid is open
  const tubs = G(g);
  [['#FF8FC8', -90], ['#FFE29A', -20], ['#8B5A2B', 50]].forEach(([c, x]) => { E('rect', { x, y: -172, width: 54, height: 26, rx: 6, fill: c, stroke: SC_INK, 'stroke-width': 3 }, tubs); });
  // the lid (hinged at the back edge, y = -150)
  const lid = G(g);
  E('rect', { x: -156, y: -24, width: 312, height: 24, rx: 10, fill: '#F4F7FA', stroke: '#5A6670', 'stroke-width': 5 }, lid);
  E('rect', { x: -40, y: -10, width: 80, height: 10, rx: 5, fill: '#9AA6B2' }, lid);
  g.set = st => {
    st = st || {};
    const L = clamp(st.lid || 0), t = st.t || 0;
    lid.setAttribute('transform', `translate(0 ${(-150).toFixed(1)}) scale(1 ${(1 - 2.2 * L).toFixed(3)})`);
    op(tubs, L > 0.15 ? 1 : 0);
    if (st.temp !== undefined && temp.textContent !== st.temp) setText(temp, st.temp);
    const fr = clamp(st.frost === undefined ? L : st.frost);
    vap.forEach((v, i) => { const f = (t * 0.4 + i / 4) % 1; attr(v, 'cx', -90 + i * 60 + Math.sin(t + i) * 12); attr(v, 'cy', -160 - f * 90); op(v, fr * (1 - f) * 0.7); });
  };
  g.set({});
  return g;
}

function ipCard(parent, rank, red, o) {
  o = o || {};
  const g = G(parent), inner = G(g); tr(g, 0, 0, o.s || 1);
  const col = red ? '#D32F2F' : '#1E1E26';
  const face = G(inner), back = G(inner);
  E('rect', { x: -60, y: -85, width: 120, height: 170, rx: 12, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 4 }, face);
  const suit = (p, x, y, s) => {
    const sg = G(p); tr(sg, x, y, s);
    if (red) E('path', { d: 'M0,14 C-22,0 -22,-18 -10,-18 C-4,-18 0,-12 0,-8 C0,-12 4,-18 10,-18 C22,-18 22,0 0,14 Z', fill: col }, sg);
    else { E('path', { d: 'M0,-18 C-20,-2 -22,10 -10,12 C-4,12 -1,8 0,4 C1,8 4,12 10,12 C22,10 20,-2 0,-18 Z', fill: col }, sg); E('path', { d: 'M0,4 L-6,18 L6,18 Z', fill: col }, sg); }
    return sg;
  };
  T(face, -42, -50, rank, { size: 30, weight: 800, anchor: 'middle', fill: col });
  suit(face, -42, -28, 0.7);
  suit(face, 0, 10, 2.1);
  T(face, 42, 76, rank, { size: 30, weight: 800, anchor: 'middle', fill: col });
  E('rect', { x: -60, y: -85, width: 120, height: 170, rx: 12, fill: '#2E4C8C', stroke: SC_INK, 'stroke-width': 4 }, back);
  E('rect', { x: -48, y: -73, width: 96, height: 146, rx: 8, fill: 'none', stroke: '#FFC247', 'stroke-width': 3 }, back);
  E('path', { d: 'M-48,-73 L48,73 M48,-73 L-48,73', stroke: '#FFC247', 'stroke-width': 2, opacity: 0.6 }, back);
  const hl = E('rect', { x: -68, y: -93, width: 136, height: 186, rx: 16, fill: 'none', stroke: '#FFE45C', 'stroke-width': 6 }, inner);
  op(hl, 0);
  g.set = p => { p = clamp(p); const k = Math.abs(Math.cos(p * Math.PI)); inner.setAttribute('transform', `scale(${Math.max(0.02, k).toFixed(3)} 1)`); op(face, p >= 0.5 ? 1 : 0); op(back, p < 0.5 ? 1 : 0); };
  g.hl = p => op(hl, p);
  g.set(1);
  return g;
}

function ipRiceCooker(parent, o) {
  o = o || {};
  const g = G(parent); tr(g, 0, 0, o.s || 1);
  E('ellipse', { cx: 0, cy: -2, rx: 96, ry: 14, fill: 'rgba(0,0,0,0.2)' }, g);
  E('path', { d: 'M-86,-110 Q-92,-10 -78,0 L78,0 Q92,-10 86,-110 Z', fill: linGrad('#FFFFFF', '#DCE3E8', true), stroke: SC_INK, 'stroke-width': 5 }, g);
  E('path', { d: 'M-90,-112 Q0,-160 90,-112 Z', fill: '#E6EBEF', stroke: SC_INK, 'stroke-width': 5 }, g);
  E('rect', { x: -16, y: -150, width: 32, height: 12, rx: 5, fill: '#5A6670' }, g);
  E('rect', { x: -40, y: -70, width: 80, height: 34, rx: 8, fill: '#2E3552', stroke: SC_INK, 'stroke-width': 3 }, g);
  E('circle', { cx: -18, cy: -53, r: 5, fill: '#E8424F' }, g); E('circle', { cx: 2, cy: -53, r: 5, fill: '#56D69B' }, g);
  // rosette
  const r = G(g); tr(r, 70, -100);
  E('path', { d: 'M-10,10 L-18,50 L0,40 L18,50 L10,10 Z', fill: '#2E7DD8', stroke: SC_INK, 'stroke-width': 2.5 }, r);
  E('circle', { r: 26, fill: '#FFC247', stroke: SC_INK, 'stroke-width': 3 }, r);
  T(r, 0, 8, '1st', { size: 22, weight: 800, anchor: 'middle', fill: '#7A4A06' });
  return g;
}

function ipPaper(parent, o) {
  o = o || {};
  const g = G(parent), w = o.w || 220;
  const block = E('rect', { x: -w / 2, y: 0, width: w, height: 0, rx: 3, fill: '#FFFDF6', stroke: '#8C7E5C', 'stroke-width': 3 }, g);
  const lines = E('path', { d: '', stroke: '#C9BC9C', 'stroke-width': 1.5 }, g);
  g.set = n => {
    n = Math.max(1, n);
    const h = Math.min(220, 6 + 3.2 * Math.min(n, 64) + Math.max(0, n - 64) * 0.4);
    attr(block, 'y', -h); attr(block, 'height', h);
    let d = '';
    if (n > 1 && n <= 64) for (let i = 1; i < n; i++) { const y = -h + i * h / n; d += `M${-w / 2 + 4},${y.toFixed(1)} L${w / 2 - 4},${y.toFixed(1)} `; }
    attr(lines, 'd', d);
    g.h = h;
  };
  g.set(1);
  return g;
}

function ipKueh(parent, o) {
  o = o || {};
  const g = G(parent), cell = o.cell || 62, cols = ['#E8424F', '#FFFDF6', '#56D69B', '#FFFDF6', '#FF8FC8', '#FFC247'];
  E('ellipse', { cx: 0, cy: 14, rx: cell * 2.9, ry: cell * 2.5, fill: '#FFFFFF', stroke: '#9AA6B2', 'stroke-width': 5 }, g);
  E('ellipse', { cx: 0, cy: 14, rx: cell * 2.6, ry: cell * 2.2, fill: 'none', stroke: '#C9D3DC', 'stroke-width': 3 }, g);
  const pieces = [];
  for (let i = 0; i < 16; i++) {
    const r = Math.floor(i / 4), k = i % 4, x = (k - 1.5) * (cell + 6), y = (r - 1.5) * (cell + 6);
    const p = G(g); tr(p, x, y);
    const inner = G(p);
    cols.forEach((c, j) => E('rect', { x: -cell / 2, y: -cell / 2 + j * cell / 6, width: cell, height: cell / 6, fill: c }, inner));
    E('rect', { x: -cell / 2, y: -cell / 2, width: cell, height: cell, rx: 4, fill: 'none', stroke: SC_INK, 'stroke-width': 3 }, inner);
    pieces.push({ p, inner });
  }
  g.set = v => {
    pieces.forEach(({ p, inner }, i) => {
      if (v >= 1) { op(p, i < Math.floor(v) || (i < v) ? 1 : 0); inner.removeAttribute('transform'); }
      else { op(p, i === 0 && v > 0 ? 1 : 0); inner.setAttribute('transform', `scale(${Math.max(0.01, v).toFixed(3)} 1)`); }
    });
  };
  g.set(16);
  return g;
}

function ipZones(parent, o) {
  o = o || {};
  const g = G(parent), W0 = 1110, zw = W0 / 3, x0 = -W0 / 2, lineY = 150;
  const Z = [
    { name: 'below 0', word: 'FLIP', col: '#FF6B5C', rows: ['{{x^2}}: positive  {{(-3)^2 = 9}}', '{{x^3}}: negative  {{(-2)^3 = -8}}', '{{cbrt(x)}}: works  {{cbrt(-8) = -2}}', '{{sqrt(x)}}: no real answer  {{sqrt(-9)}}'] },
    { name: '0 to 1', word: 'SHRINK', col: '#FFC247', rows: ['{{x^2}}: smaller  {{0.5^2 = 0.25}}', '{{x^3}}: smaller  {{0.1^3 = 0.001}}', '{{sqrt(x)}}: bigger  {{sqrt(0.25) = 0.5}}'] },
    { name: 'above 1', word: 'GROW', col: '#56D69B', rows: ['{{x^2}}: bigger  {{3^2 = 9}}', '{{x^3}}: bigger  {{2^3 = 8}}', '{{sqrt(x)}}: smaller  {{sqrt(9) = 3}}'] },
  ];
  const titleG = G(g);
  T(titleG, 0, -228, 'GROW, SHRINK or FLIP', { size: 44, weight: 800, anchor: 'middle', fill: '#FFE45C', ls: 2 });
  g.zones = []; g.cards = [];
  Z.forEach((z, i) => {
    const zx = x0 + i * zw;
    // the zone band on the line
    const band = E('rect', { x: zx + 4, y: lineY - 18, width: zw - 8, height: 36, rx: 10, fill: z.col, opacity: 0.25 }, g);
    const lab = T(g, zx + zw / 2, lineY + 62, z.name, { size: 30, weight: 800, anchor: 'middle', fill: z.col });
    g.zones.push({ band, lab });
    // the rule card above
    const cg = G(g);
    E('rect', { x: zx + 8, y: -200, width: zw - 16, height: 270, rx: 16, fill: 'rgba(10,27,39,0.92)', stroke: z.col, 'stroke-width': 4 }, cg);
    T(cg, zx + zw / 2, -158, z.word, { size: 36, weight: 800, anchor: 'middle', fill: z.col, ls: 3 });
    const rows = z.rows.map((src, r) => mkText(cg, zx + 24, -106 + r * 52, src, { size: 26, fill: C.ink, weight: 600 }));
    g.cards.push({ cg, rows });
  });
  // the line, ticks at 0 and 1, arrows
  E('path', { d: `M${x0},${lineY} L${-x0},${lineY}`, stroke: C.ink, 'stroke-width': 5 }, g);
  E('path', { d: `M${-x0 - 6},${lineY} l-22,-14 l0,28 Z`, fill: C.ink }, g);
  const pinsG = G(g);
  [[x0 + zw, '0'], [x0 + 2 * zw, '1']].forEach(([x, s]) => {
    E('line', { x1: x, y1: lineY - 26, x2: x, y2: lineY + 26, stroke: C.ink, 'stroke-width': 5 }, g);
    T(g, x, lineY - 36, s, { size: 34, weight: 800, anchor: 'middle', fill: C.ink });
    const pin = G(pinsG); tr(pin, x, lineY + 6);
    E('circle', { r: 11, fill: '#FFE45C', stroke: SC_INK, 'stroke-width': 3 }, pin);
  });
  mkText(pinsG, 0, lineY + 104, '**0** and **1** never move: {{0^2 = 0}}, {{1^2 = 1}}', { size: 28, anchor: 'middle', fill: '#FFE45C', boldFill: '#FFE45C' });
  g.zone = (i, p) => { const z = g.zones[i]; attr(z.band, 'opacity', (0.25 + 0.75 * clamp(p)).toFixed(3)); };
  g.card = (i, p) => op(g.cards[i].cg, clamp(p));
  g.row = (i, r, p) => { if (g.cards[i].rows[r]) op(g.cards[i].rows[r], clamp(p)); };
  g.pins = p => op(pinsG, clamp(p));
  g.title = p => op(titleG, clamp(p));
  return g;
}

function ipStamp(parent, ok) { return mkStamp(parent, ok ? 'CORRECT!' : 'BZZT!', ok ? '#1E9E5A' : '#D32F2F'); }

function ipFlash(parent) {
  const r = E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#FFFFFF' }, parent);
  op(r, 0);
  r.set = p => op(r, clamp(p));
  return r;
}
