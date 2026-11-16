/* SHOW ME THE DATA (Claude Sitcom Ep 18, Collecting & Representing Data): the cast, sets and props of this episode.
   Bundled after engine lib.js, kit.js, mathkit.js and sitcom.js (scMake, scTalk, scKavya, scCastHuman,
   scConfessional, scLowerThird, scVideoCall, mk* maths kit). Every top-level name starts with `sd`, except `cast`.

   Characters: cast(parent, kind, o) -> g, origin at the character's centre, about 200-260 px tall at s = 1
     o: { s (scale), mood (default mood), ... }   (humans: any scHuman option overrides, e.g. prop, lift)
     g.set({ t, talk, mood, look, sweat, still, ... })   call every frame
       talk 0..1 (use scTalk(S, t, who)); mood: neutral | happy | smug | annoyed | sad | shock | deadpan
       look -1..1 pupils left/right; still: true stops the idle bob
     HUMANS (busts, bottom of the shirt at y = 140: put them behind a desk / counter / table, or at the frame edge):
       'kavya'  (kavya)  Kavya, 12 (scKavya, PE shirt "8"). The 8B News reporter.
       'mum'    (mum)    Mum: magenta kurta, bun, bindi. Default prop: a pencil (she writes survey questions)
       'dad'    (dad)    Dad: glasses, moustache, green polo. Default prop: none (pass prop: 'calculator' etc.)
       'boy'    (boy)    Ah Boy, 8: orange star tee. Default: an empty hand (lift: 1 raises it)
       'priya'  (priya)  Priya, 12: school uniform, bob, yellow clip. Default prop: her phone (the group chat)
       'tan'    (tan)    Mr Tan, maths teacher and Media Club producer: shirt and tie, glasses. Default prop: kopi
       'rose'   (rose)   Auntie Rose: curly perm, floral blouse, ROSE'S apron. Default prop: none
       Pass { prop: null } for no prop; { body: true } for a full body (scHumanBody, feet at 0,0; pose API).
     CARTOONS (scMake):
       'axis'   (axis)   Inspector Axis, the Fact-Check Desk's detective: a PAIR OF AXES in a trench coat. The y-axis
                         runs up his back (arrowhead above the fedora, tick marks), the x-axis is his long right foot
                         (arrowhead, ticks), and a gold "0" badge sits at the origin, his corner. Tan trench coat, grey
                         fedora, pale face, collar up, a magnifying glass. Hard-boiled, deadpan. Default mood deadpan.
                         Extra: g.set({ glass: 0..1 }) raises the magnifying glass to his eye (1 = up);
                         { tip: 0..1 } tips the hat.
       'pie'    (pie)    Dame Pie, a PIE CHART diva: a circle of four slices (gold, sky, coral, mint), long lashes, a
                         tiara, pearls, white opera gloves. Default mood smug. Extra: { slice: 0..1 } pulls the gold
                         slice out of the pie (her horror when someone asks for a slice); { arms: 0..1 } arms up.
       'stemmy' (stemmy) Stemmy, a STEM-AND-LEAF diagram as a potted plant: a terracotta pot (with the face), a plant
                         marker "3 |" (his stem) and leaves numbered 1 4 4 8 (his leaves), a brass KEY hanging from the
                         top leaf on a string. Gentle, forgetful. Default happy. Extra: { key: 0..1 } shows the key
                         (0 = lost); { droop: 0..1 } wilts the leaves.
       'venn'   (vera / nina) The VENN TWINS: two overlapping circles, Vera (left, sky blue, pink bow: bubble tea) and
                         Nina (right, amber, green star clip: ice kachang). Two faces: Vera uses talk/mood/look, Nina
                         uses talkB/moodB/lookB, e.g. c.set({ t, talk: scTalk(S, t, 'vera'), talkB: scTalk(S, t, 'nina'),
                         mood, moodB }). Extra: { mid: 0..1 } makes the shared middle (the overlap) glow.
       'lofty'  (lofty)  Lofty, the LINE OF BEST FIT: a long straight orange line rising left to right with a chill
                         face in the middle (sunglasses on his forehead), with scatter dots balanced above and below
                         him. Laid-back. Default happy. Extra: { dots: 0..1 } fades the dots; { tilt: degrees } extra tilt.
       'tally'  (tally)  Tally, a TALLY GATE: four wooden sticks and a red fifth stroke across them, a round face,
                         sneakers. Hyper. Default happy. Extra: { n: 0..5 } how many strokes show (5 = the gate);
                         { arms: 0..1 } arm-pump size.

   Shots
     sdConf(parent, who)             confessional background tinted for that character (scConfessional); g.set(p, t)
     SD_TINT                         the confessional colours per character
     sdLowerThird(parent, who)       scLowerThird with this episode's name and role for `who` (SD_LT); g.set(p)

   Sets (full stage 1200 x 750; each returns g). Sets with a desk, counter or table have LAYERS: put characters in
   g.mid (behind it: a bust at y about 440 hides its shirt hem), the desk/counter is g.front, and props standing on
   it go in g.top (drawn last). To put cast in your own layer between, move g.front/g.top: Lfront.appendChild(g.front).
     sdStudio(parent)     THE MEDIA CLUB STUDIO, Room 2-14: navy back wall with a big wall screen (g.screen, a clipped
                          group at stage rect g.scr = { x: 620, y: 128, w: 520, h: 292 }; g.logo the idle "8B NEWS" logo
                          on it: op() it off when you draw on the screen); storeroom shelves at the far left with boxes,
                          a mop and bucket (g.mop: a group pivoting at its base, rotate it to make it fall), the OLD
                          COMPUTER on the middle shelf (g.pc = [x, y] the centre of its screen, g.pcScreen a clipped group
                          150 x 104 centred there), two studio lamps, a news desk (top at g.counterY = 530) with an
                          "8B NEWS" logo on its front (x 700-1040, clear of the lower thirds). g.upd(t) blinks the ON AIR light; g.onAir(p) lights it (0..1).
     sdDesk(parent)       THE FACT-CHECK DESK, inside the computer: a noir office in circuit-board blue, venetian-blind
                          light stripes, a door-glass sign "FACT-CHECK DESK", a cork evidence board on the right
                          (g.board, a group; g.boardRect = { x: 660, y: 150, w: 470, h: 300 }), a desk (g.counterY 540)
                          with a lamp and case files. g.upd(t) flickers the lamp.
     sdFlat(parent)       Kavya's HDB dining room at night: window with lit HDB blocks, a wall clock, a calendar,
                          the kitchen doorway, and the dining table (top at g.counterY = 540).
     sdCanteen(parent)    wide shot of the school canteen at recess: roof, fans, four stall fronts (DRINKS, VEG RICE,
                          ICE KACHANG and BUBBLE TEA, the last two with yellow TRIAL tags; g.stalls[i] = [x, y] centre of
                          each front), a banner "THE GREAT CANTEEN VOTE", tables and benches. g.upd(t) turns the fans.
     sdTrial(parent)      close-up of the two TRIAL stalls side by side behind one counter: ROSE'S ICE KACHANG (left,
                          red sign, x 120-590) and BUBBLE TEA (right, purple sign, x 610-1080), each with a small menu
                          (g.menuL, g.menuR: mkHawkerMenu), a potted-plant corner at x 1140 (put Stemmy there).
                          Counter top at g.counterY = 530. g.upd(t) wobbles the shaved-ice machine.
     sdStaff(parent)      the staff room: pigeonholes, a notice board "STAFF ROOM", a KOPI machine with steam, a long
                          table (top at g.counterY = 540). g.upd(t) steams the machine.
     sdHawker(parent)     Auntie Rose's own stall, ROSE'S KITCHEN, at the hawker centre at night: sign, tiled wall, a
                          menu board (g.menu: 0 Ice kachang $3.00, 1 Chendol $2.50, 2 Bandung $1.80), a shaved-ice
                          machine, the counter (top at g.counterY = 530). g.upd(t) turns the fan.
     sdRoseCall(parent, w, h, label)  scVideoCall with a mini hawker backdrop and Auntie Rose (bust) centred in the frame.
                          Centred on (0,0). g.rose (cast: use g.rose.set), g.screen. label default 'Auntie Rose · Blk 208'.
     sdDevice(parent, kind, o)  a laptop ('laptop', screen 340 x 214) or phone ('phone', screen 150 x 270) or tablet
                          ('tablet', screen 300 x 200) showing the Fact-Check Desk with Inspector Axis inside.
                          Origin = centre of the screen. g.screen (clipped group), g.axis (cast: use g.axis.set),
                          g.W, g.H (screen size). o: { axis: false } for an empty screen.

   Props (around their own origin)
     SD_COL                          colours: tea (milk tea), pearl, ice, red, green, corn, boba (purple), kachang (red)
     sdStamp(parent, kind)           mkStamp 'BIASED' (red, kind 'biased'), 'MISLEADING' (orange-red, 'misleading') or
                                     'FACT-CHECKED' (green, 'checked'); g.set(p). It is about 500-700 px wide at scale 1:
                                     scale the returned g (tr(g, x, y, 0.55)).
     sdCup(parent, o)                bubble tea: clear cup with milk tea and black pearls, dome lid, fat straw. Base centre
                                     at (0,0), about 170 tall. o: { s, col, label }. g.set(level 0..1)
     sdBowl(parent, o)               ice kachang: a bowl with a shaved-ice dome (red and green syrup, corn on top), base centre
                                     (0,0), about 130 tall. o: { s }
     sdStopwatch(parent, o)          stopwatch, centred, about 150 tall. g.set(seconds) shows "34 s" style readout
     sdPoster(parent, o)             a campaign poster on the wall, centred. o: { w (360), h (460), title, col }. g.area
                                     = { x, y, w, h } (local coords) for its chart; g.content (a <g>)
     sdNotebook(parent, o)           Auntie Rose's notebook, centred. o: { w (420), h (460), title }. g.area, g.content
     sdPC(parent)                    the old beige computer and CRT monitor, centred on the screen; g.screen (clipped group,
                                     150 x 104 centred at 0,0)
*/

/* ---------- confessional tints, lower thirds ---------- */
const SD_TINT = {
  axis: ['#0C1626', '#1E3350'], pie: ['#3A1430', '#6E2A5C'], stemmy: ['#14301E', '#2C5A36'], venn: ['#142A3A', '#2A5068'],
  vera: ['#142A3A', '#2A5068'], nina: ['#3A2A10', '#6B4E18'], lofty: ['#3A2010', '#6E3E1A'], tally: ['#2A1E10', '#5A4022'],
  kavya: ['#14243A', '#25446B'], rose: ['#3A1424', '#6E2A44'], dad: ['#123026', '#245A48'], mum: ['#3A1030', '#6B1E58'],
  boy: ['#3A2410', '#6B4414'], priya: ['#1A2240', '#33407A'], tan: ['#1A2A3A', '#33506E'],
};
function sdConf(parent, who) { const c = SD_TINT[who] || SD_TINT.axis; return scConfessional(parent, c[0], c[1]); }
const SD_LT = {
  axis: ['INSPECTOR AXIS', 'Fact-Check Desk. Checks the axes.'],
  pie: ['DAME PIE', 'Pie chart. 360° of talent.'],
  stemmy: ['STEMMY', 'Stem-and-leaf. Keeps losing his key.'],
  venn: ['THE VENN TWINS', 'Vera and Nina. Share the middle.'],
  vera: ['VERA', 'Venn twin. The bubble tea circle.'],
  nina: ['NINA', 'Venn twin. The ice kachang circle.'],
  lofty: ['LOFTY', 'Line of best fit. No dot-to-dot.'],
  tally: ['TALLY', 'Counts in fives. Panics in tens.'],
  kavya: ['KAVYA, 12', '8B News reporter. Fair.'],
  mum: ['MUM', 'Writes the survey questions.'],
  dad: ['DAD', 'Votes ice kachang.'],
  boy: ['AH BOY, 8', "Kavya's brother. Pollster."],
  priya: ['PRIYA', 'Campaign manager. Bubble tea.'],
  tan: ['MR TAN', 'Maths teacher. Producer.'],
  rose: ['AUNTIE ROSE', 'Trial stall: ice kachang.'],
};
function sdLowerThird(parent, who) { const l = SD_LT[who] || [String(who).toUpperCase(), '']; return scLowerThird(parent, l[0], l[1]); }

/* ---------- colours ---------- */
const SD_COL = { tea: '#D8B48A', pearl: '#3A2416', ice: '#F4F9FF', red: '#E8424F', green: '#5BD27A', corn: '#FFD34A',
  boba: '#8E5BD8', kachang: '#C62828', navy: '#1E2F52', axis: '#22325A', coat: '#C9A46A', news: '#D63A3A' };

/* ---------- the cast ---------- */
const SD_PROP = { mum: 'pencil', dad: null, boy: null, priya: 'phone', tan: 'kopi', rose: null };
function cast(parent, kind, o) {
  o = o || {};
  if (kind === 'kavya') return scKavya(parent, o);
  if (SC_HUMANS[kind]) {
    const p = Object.assign({}, kind === 'boy' ? { hand: true } : (SD_PROP[kind] ? { prop: SD_PROP[kind] } : {}), o);
    return scCastHuman(parent, kind, p);
  }
  const S = { s: o.s, mood: o.mood };
  let c;
  if (kind === 'axis') {
    let glass = null, hat = null;
    c = scMake(parent, Object.assign(S, { seed: 31, bob: 1.5, mood: o.mood || 'deadpan',
      draw: g => {
        const AX = SD_COL.axis;
        // the y-axis, up his back, and its arrowhead above the hat
        E('path', { d: 'M-78,112 L-78,-176', stroke: AX, 'stroke-width': 10, 'stroke-linecap': 'round' }, g);
        E('path', { d: 'M-94,-162 L-78,-190 L-62,-162 Z', fill: AX, stroke: AX, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
        let tk = '';
        for (let y = 72; y >= -120; y -= 32) tk += `M-92,${y} L-78,${y} `;
        E('path', { d: tk, stroke: AX, 'stroke-width': 5, 'stroke-linecap': 'round' }, g);
        // trench coat
        E('path', { d: 'M-70,-24 Q-2,-44 66,-24 L84,108 L-74,108 Z', fill: SD_COL.coat, stroke: SC_INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, g);
        E('path', { d: 'M-2,-34 L-2,108', stroke: '#9C7A44', 'stroke-width': 4 }, g);
        E('rect', { x: -72, y: 40, width: 152, height: 16, fill: '#9C7A44', stroke: SC_INK, 'stroke-width': 3 }, g);   // belt
        E('rect', { x: -14, y: 38, width: 24, height: 20, rx: 3, fill: 'none', stroke: '#E2B33C', 'stroke-width': 4 }, g);
        [[-24, 0], [22, 0], [-24, 80], [22, 80]].forEach(([x, y]) => E('circle', { cx: x, cy: y, r: 5, fill: '#6B4423' }, g));
        // the x-axis: his long right foot, out to the right, with ticks and an arrowhead
        E('path', { d: 'M-78,112 L196,112', stroke: AX, 'stroke-width': 10, 'stroke-linecap': 'round' }, g);
        E('path', { d: 'M184,96 L212,112 L184,128 Z', fill: AX, stroke: AX, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
        let tx = '';
        for (let x = -46; x <= 170; x += 32) tx += `M${x},112 L${x},126 `;
        E('path', { d: tx, stroke: AX, 'stroke-width': 5, 'stroke-linecap': 'round' }, g);
        // the origin badge
        E('circle', { cx: -78, cy: 112, r: 17, fill: '#FFE45C', stroke: SC_INK, 'stroke-width': 3.5 }, g);
        T(g, -78, 121, '0', { size: 26, weight: 800, anchor: 'middle', fill: SC_INK });
        // up-turned collar and the head
        E('path', { d: 'M-56,-30 L-40,-74 L-14,-30 Z M54,-30 L38,-74 L12,-30 Z', fill: '#B38E55', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
        E('ellipse', { cx: 0, cy: -84, rx: 50, ry: 54, fill: '#E9EEF2', stroke: SC_INK, 'stroke-width': 5 }, g);
        E('path', { d: 'M-34,-58 Q0,-40 34,-58', fill: 'none', stroke: '#B9C4CE', 'stroke-width': 3, opacity: 0.8 }, g);   // stubble line
        // fedora (tips with { tip })
        hat = G(g); tr(hat, 0, -126);
        E('path', { d: 'M-72,8 Q0,-6 72,8 Q76,20 60,20 Q0,8 -60,20 Q-76,20 -72,8 Z', fill: '#4A4E58', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, hat);
        E('path', { d: 'M-42,6 Q-46,-44 0,-48 Q46,-44 42,6 Z', fill: '#5A5F6B', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, hat);
        E('path', { d: 'M-16,-46 Q0,-34 16,-46', fill: 'none', stroke: SC_INK, 'stroke-width': 3 }, hat);
        E('rect', { x: -43, y: -12, width: 86, height: 14, fill: '#22252C' }, hat);
        // arms: left hand in the pocket, right hand with the magnifying glass (raises with { glass })
        E('path', { d: 'M-60,-6 Q-92,30 -50,62', fill: 'none', stroke: '#B38E55', 'stroke-width': 18, 'stroke-linecap': 'round' }, g);
        glass = G(g);
        E('path', { d: 'M54,-8 Q90,22 74,58', fill: 'none', stroke: '#B38E55', 'stroke-width': 18, 'stroke-linecap': 'round' }, glass);
        const gl = G(glass); tr(gl, 74, 58);
        E('path', { d: 'M0,0 L22,-40', stroke: '#6B4423', 'stroke-width': 10, 'stroke-linecap': 'round' }, gl);
        E('circle', { cx: 34, cy: -62, r: 26, fill: 'rgba(200,235,255,0.35)', stroke: '#E2B33C', 'stroke-width': 7 }, gl);
        E('path', { d: 'M22,-72 Q28,-80 38,-80', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 4, 'stroke-linecap': 'round' }, gl);
        E('circle', { cx: 0, cy: 0, r: 13, fill: '#E9EEF2', stroke: SC_INK, 'stroke-width': 3 }, gl);
      },
      face: { x: 0, y: -90, eye: 13, gap: 40, mouthW: 30, mouthY: 34, lidCol: '#C9D3DC' },
      upd: (t, g, st) => {
        const k = clamp(st.glass || 0), h = clamp(st.tip || 0);
        // glass up: rotate the arm group about the shoulder so the lens rises to his eye
        glass.setAttribute('transform', `rotate(${(-88 * k).toFixed(1)} 54 -8)`);
        tr(hat, 0, -126 - 10 * h, 1, -14 * h);
      } }));
  } else if (kind === 'pie') {
    let gold = null, armL = null, armR = null;
    c = scMake(parent, Object.assign(S, { seed: 37, bob: 3, mood: o.mood || 'smug',
      draw: g => {
        // opera-glove arms (behind the pie)
        armL = E('path', { d: '', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 13, 'stroke-linecap': 'round' }, g);
        armR = E('path', { d: '', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 13, 'stroke-linecap': 'round' }, g);
        const R = 100, secs = [[0, 130, '#FFC247'], [130, 220, '#4CC9F0'], [220, 300, '#FF6B5C'], [300, 360, '#56D69B']];
        secs.forEach(([a0, a1, col], i) => {
          const sg = G(g);
          E('path', { d: 'M0,0 L' + mkArcD(0, 0, R, a0 - 90, a1 - 90).slice(1) + ' Z', fill: col, stroke: '#FFFFFF', 'stroke-width': 5, 'stroke-linejoin': 'round' }, sg);
          if (i === 0) gold = sg;
        });
        E('circle', { r: R, fill: 'none', stroke: SC_INK, 'stroke-width': 6 }, g);
        // lashes
        [-1, 1].forEach(sd => E('path', { d: `M${sd * 18},-46 l${sd * -4},-12 M${sd * 28},-44 l${sd * 2},-13 M${sd * 38},-40 l${sd * 8},-10`, stroke: SC_INK, 'stroke-width': 3.5, 'stroke-linecap': 'round' }, g));
        // tiara
        const ti = G(g); tr(ti, 0, -98);
        E('path', { d: 'M-46,6 L-40,-18 L-22,-4 L0,-30 L22,-4 L40,-18 L46,6 Z', fill: '#FFE45C', stroke: SC_INK, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, ti);
        E('circle', { cx: 0, cy: -10, r: 6, fill: '#FF5FA2', stroke: SC_INK, 'stroke-width': 2 }, ti);
        // pearls
        let pd = '';
        for (let i = 0; i < 9; i++) { const a = (200 + i * 17.5) * Math.PI / 180; pd += `M${(Math.cos(a) * 82).toFixed(1)},${(-Math.sin(a) * 82 + 4).toFixed(1)} m-6,0 a6,6 0 1 0 12,0 a6,6 0 1 0 -12,0 `; }
        E('path', { d: pd, fill: '#FFFDF6', stroke: SC_INK, 'stroke-width': 2 }, g);
        E('ellipse', { cx: -52, cy: 24, rx: 12, ry: 7, fill: '#FF8FB0', opacity: 0.55 }, g);
        E('ellipse', { cx: 52, cy: 24, rx: 12, ry: 7, fill: '#FF8FB0', opacity: 0.55 }, g);
      },
      face: { x: 0, y: -18, eye: 17, gap: 56, mouthW: 34, mouthY: 40, lidCol: '#E9A23B', iris: '#3A1E4A' },
      upd: (t, g, st) => {
        const k = clamp(st.slice || 0), a = clamp(st.arms || 0), w = Math.sin(t * 3) * 6;
        tr(gold, 34 * k, -22 * k);
        attr(armL, 'd', `M-92,20 Q-136,${30 - 40 * a} -128,${(66 - 120 * a + w).toFixed(1)}`);
        attr(armR, 'd', `M92,20 Q136,${30 - 40 * a} 128,${(66 - 120 * a - w).toFixed(1)}`);
      } }));
  } else if (kind === 'stemmy') {
    let keyG = null, leaves = [];
    c = scMake(parent, Object.assign(S, { seed: 41, bob: 2, mood: o.mood || 'happy',
      draw: g => {
        // stem
        E('path', { d: 'M0,10 Q-6,-60 2,-150', fill: 'none', stroke: '#2C8C4C', 'stroke-width': 12, 'stroke-linecap': 'round' }, g);
        // leaves with digits (his leaves), on the right of the stem
        [[-30, '1'], [-72, '4'], [-112, '4'], [-148, '8']].forEach(([y, d], i) => {
          const lg = G(g); tr(lg, 2, y, 1, -18);
          E('path', { d: 'M0,0 Q30,-30 78,-8 Q34,22 0,0 Z', fill: '#5BD27A', stroke: SC_INK, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, lg);
          T(lg, 42, 1, d, { size: 26, weight: 800, anchor: 'middle', fill: '#14401E' });
          leaves.push(lg);
        });
        // the plant marker: his stem digit, "3 |"
        const mk = G(g); tr(mk, -54, -46, 1, -8);
        E('path', { d: 'M0,40 L0,-6', stroke: '#C9A46A', 'stroke-width': 6 }, mk);
        E('rect', { x: -30, y: -36, width: 60, height: 36, rx: 5, fill: '#FFFDF6', stroke: SC_INK, 'stroke-width': 3 }, mk);
        T(mk, 0, -8, '3 |', { size: 26, weight: 800, anchor: 'middle', fill: SC_INK });
        // the key, hanging from the top leaf
        keyG = G(g); tr(keyG, 56, -150);
        E('path', { d: 'M0,0 L-4,46', stroke: '#8A6B3A', 'stroke-width': 2.5 }, keyG);
        const kk = G(keyG); tr(kk, -4, 46, 1, 12);
        E('circle', { cx: 0, cy: 10, r: 10, fill: 'none', stroke: '#C9A227', 'stroke-width': 5 }, kk);
        E('path', { d: 'M0,20 L0,46 M0,34 L8,34 M0,42 L10,42', stroke: '#C9A227', 'stroke-width': 5, 'stroke-linecap': 'round' }, kk);
        // the pot
        E('path', { d: 'M-80,30 L80,30 L64,132 Q62,140 52,140 L-52,140 Q-62,140 -64,132 Z', fill: linGrad('#E07A4E', '#B5522E', true), stroke: SC_INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, g);
        E('rect', { x: -90, y: 8, width: 180, height: 30, rx: 8, fill: '#E8895E', stroke: SC_INK, 'stroke-width': 5 }, g);
        E('ellipse', { cx: -44, cy: 104, rx: 11, ry: 7, fill: '#FF8FB0', opacity: 0.5 }, g);
        E('ellipse', { cx: 44, cy: 104, rx: 11, ry: 7, fill: '#FF8FB0', opacity: 0.5 }, g);
      },
      face: { x: 0, y: 70, eye: 15, gap: 50, mouthW: 30, mouthY: 30, lidCol: '#D06A40' },
      upd: (t, g, st) => {
        op(keyG, st.key === undefined ? 1 : clamp(st.key));
        const d = clamp(st.droop || 0);
        leaves.forEach((lg, i) => tr(lg, 2, [-30, -72, -112, -148][i], 1, -18 + 46 * d + Math.sin(t * 2 + i) * 3));
      } }));
  } else if (kind === 'venn') {
    let mid = null;
    c = scMake(parent, Object.assign(S, { seed: 43, bob: 3, mood: o.mood || 'happy',
      draw: g => {
        // little legs
        [-110, -70, 70, 110].forEach(x => {
          E('path', { d: `M${x},84 L${x},116`, stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
          E('ellipse', { cx: x + (x < 0 ? -6 : 6), cy: 120, rx: 15, ry: 8, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
        });
        // arms on the outer sides
        E('path', { d: 'M-150,0 Q-186,20 -176,56', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
        E('path', { d: 'M150,0 Q186,20 176,56', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
        E('circle', { cx: -176, cy: 60, r: 10, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
        E('circle', { cx: 176, cy: 60, r: 10, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g);
        // the two circles: their overlap mixes to green
        E('circle', { cx: -60, cy: 0, r: 95, fill: '#4CC9F0', opacity: 0.75 }, g);
        E('circle', { cx: 60, cy: 0, r: 95, fill: '#FFC247', opacity: 0.62 }, g);
        mid = E('path', { d: 'M0,-73.6 A95,95 0 0 1 0,73.6 A95,95 0 0 1 0,-73.6 Z', fill: '#FFF7C2' }, g);
        E('circle', { cx: -60, cy: 0, r: 95, fill: 'none', stroke: SC_INK, 'stroke-width': 5 }, g);
        E('circle', { cx: 60, cy: 0, r: 95, fill: 'none', stroke: SC_INK, 'stroke-width': 5 }, g);
        // Vera's pink bow, Nina's green star clip
        const bow = G(g); tr(bow, -112, -78, 1, -20);
        E('path', { d: 'M0,0 L-22,-12 L-22,12 Z M0,0 L22,-12 L22,12 Z', fill: '#FF8FC8', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, bow);
        E('circle', { r: 6, fill: '#FF5FA2', stroke: SC_INK, 'stroke-width': 2 }, bow);
        const st = G(g); tr(st, 112, -80, 1, 15);
        E('path', { d: 'M0,-16 L5,-5 L16,-5 L7,2 L10,14 L0,7 L-10,14 L-7,2 L-16,-5 L-5,-5 Z', fill: '#56D69B', stroke: SC_INK, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, st);
        [[-130, 30], [-62, 30], [62, 30], [130, 30]].forEach(([x, y]) => E('ellipse', { cx: x, cy: y, rx: 10, ry: 6, fill: '#FF8FB0', opacity: 0.55 }, g));
      },
      face: { x: -96, y: -6, eye: 14, gap: 40, mouthW: 26, mouthY: 28, lidCol: '#3AA9D0' },
      faceB: { x: 96, y: -6, eye: 14, gap: 40, mouthW: 26, mouthY: 28, lidCol: '#E0A63A' },
      upd: (t, g, st) => { attr(mid, 'opacity', (0.0 + 0.85 * clamp(st.mid || 0) * (0.75 + 0.25 * Math.sin(t * 5))).toFixed(3)); } }));
  } else if (kind === 'lofty') {
    let dots = null, body = null;
    c = scMake(parent, Object.assign(S, { seed: 47, bob: 3, mood: o.mood || 'happy',
      draw: g => {
        dots = G(g);
        // balanced scatter: four above, four below
        [[-150, 30], [-96, 54], [-60, -10], [-10, 50], [40, -50], [84, 2], [120, -80], [160, -44]].forEach(([x, y]) =>
          E('circle', { cx: x, cy: y, r: 11, fill: '#4CC9F0', stroke: SC_INK, 'stroke-width': 3 }, dots));
        body = G(g);
        E('path', { d: 'M-186,86 L186,-86', stroke: SC_INK, 'stroke-width': 30, 'stroke-linecap': 'round' }, body);
        E('path', { d: 'M-186,86 L186,-86', stroke: '#FF8A3D', 'stroke-width': 20, 'stroke-linecap': 'round' }, body);
        // the face, a round bulge in the middle
        E('circle', { r: 56, fill: ball('#FFB067', '#E8751A'), stroke: SC_INK, 'stroke-width': 5 }, g);
        E('path', { d: 'M-30,-50 Q-20,-74 2,-64 Q14,-80 30,-58', fill: '#C2531A', stroke: SC_INK, 'stroke-width': 3 }, g);   // tuft
        // sunglasses pushed up on his forehead
        E('path', { d: 'M-40,-38 L40,-38', stroke: SC_INK, 'stroke-width': 4 }, g);
        E('rect', { x: -38, y: -46, width: 30, height: 16, rx: 6, fill: '#2A3B44', stroke: SC_INK, 'stroke-width': 3 }, g);
        E('rect', { x: 8, y: -46, width: 30, height: 16, rx: 6, fill: '#2A3B44', stroke: SC_INK, 'stroke-width': 3 }, g);
        E('ellipse', { cx: -38, cy: 22, rx: 10, ry: 6, fill: '#FF8FB0', opacity: 0.5 }, g);
        E('ellipse', { cx: 38, cy: 22, rx: 10, ry: 6, fill: '#FF8FB0', opacity: 0.5 }, g);
        // a shaka hand
        E('path', { d: 'M50,30 Q78,48 90,30', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
        E('circle', { cx: 92, cy: 26, r: 10, fill: '#FFB067', stroke: SC_INK, 'stroke-width': 3 }, g);
      },
      face: { x: 0, y: -4, eye: 14, gap: 40, mouthW: 30, mouthY: 28, lidCol: '#E8751A' },
      upd: (t, g, st) => { op(dots, st.dots === undefined ? 1 : clamp(st.dots)); tr(body, 0, 0, 1, st.tilt || 0); } }));
  } else if (kind === 'tally') {
    let sticks = [], armL = null, armR = null;
    c = scMake(parent, Object.assign(S, { seed: 53, bob: 7, mood: o.mood || 'happy',
      draw: g => {
        armL = E('path', { d: '', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
        armR = E('path', { d: '', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
        [-30, 30].forEach(x => {
          E('path', { d: `M${x},96 L${x},124`, stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
          E('path', { d: `M${x - 14},132 Q${x - 14},120 ${x + 2},120 L${x + 18},122 Q${x + 24},132 ${x + 16},134 Z`, fill: '#FF5C5C', stroke: SC_INK, 'stroke-width': 3 }, g);
        });
        [-66, -22, 22, 66].forEach(x => sticks.push(E('rect', { x: x - 11, y: -110, width: 22, height: 210, rx: 11, fill: linGrad('#D9A86A', '#A8743C', false), stroke: SC_INK, 'stroke-width': 4 }, g)));
        sticks.push(E('path', { d: 'M-104,70 L104,-74', stroke: SC_INK, 'stroke-width': 26, 'stroke-linecap': 'round' }, g));
        const red = E('path', { d: 'M-104,70 L104,-74', stroke: '#E8424F', 'stroke-width': 17, 'stroke-linecap': 'round' }, g);
        sticks[4] = [sticks[4], red];
        E('circle', { cx: 0, cy: -6, r: 48, fill: '#FFF4DE', stroke: SC_INK, 'stroke-width': 5 }, g);
        E('ellipse', { cx: -30, cy: 18, rx: 9, ry: 6, fill: '#FF8FB0', opacity: 0.55 }, g);
        E('ellipse', { cx: 30, cy: 18, rx: 9, ry: 6, fill: '#FF8FB0', opacity: 0.55 }, g);
      },
      face: { x: 0, y: -14, eye: 14, gap: 38, mouthW: 26, mouthY: 26, lidCol: '#E8D2A8' },
      upd: (t, g, st) => {
        const n = st.n === undefined ? 5 : st.n, k = st.arms === undefined ? 0.6 : st.arms;
        sticks.forEach((s, i) => { const v = clamp(n - i); if (Array.isArray(s)) s.forEach(e => op(e, v)); else op(s, v); });
        const w = Math.sin(t * TAU * 2.2) * 20 * k;
        attr(armL, 'd', `M-70,20 Q-110,${10 - 20 * k} -118,${(-10 - 40 * k + w).toFixed(1)}`);
        attr(armR, 'd', `M70,20 Q110,${10 - 20 * k} 118,${(-10 - 40 * k - w).toFixed(1)}`);
      } }));
  } else {
    c = scKavya(parent, o);
  }
  return c;
}

/* ---------- small set pieces ---------- */
function sdFan(parent, s) {
  const g = G(parent); tr(g, 0, 0, s || 1);
  E('line', { x1: 0, y1: -60, x2: 0, y2: 0, stroke: '#5A6670', 'stroke-width': 6 }, g);
  const bl = G(g);
  for (let i = 0; i < 3; i++) { const b = G(bl); tr(b, 0, 0, 1, i * 120); E('path', { d: 'M0,-6 Q60,-16 92,-4 Q60,10 0,6 Z', fill: '#C9D3DC', stroke: '#5A6670', 'stroke-width': 2.5 }, b); }
  E('circle', { r: 12, fill: '#8F9CAB', stroke: '#5A6670', 'stroke-width': 3 }, g);
  g.upd = t => { const a = (t * 400) % 360; bl.setAttribute('transform', `scale(1 0.32) rotate(${a.toFixed(1)})`); };
  g.upd(0);
  return g;
}
/* a counter / desk / table front with the layer pattern; returns { front, top } and adds g.mid */
function _sdLayers(g, y, col, trim, label) {
  g.mid = G(g);
  const front = G(g);
  E('rect', { x: 70, y: y - 10, width: 1060, height: 26, rx: 6, fill: scShade(col, 0.25), stroke: SC_INK, 'stroke-width': 4 }, front);
  E('rect', { x: 90, y: y + 16, width: 1020, height: 750 - y - 16, fill: linGrad(col, scShade(col, -0.25), true), stroke: SC_INK, 'stroke-width': 4 }, front);
  if (trim) E('rect', { x: 90, y: y + 60, width: 1020, height: 16, fill: trim }, front);
  if (label) label(front);
  g.front = front; g.top = G(g); g.counterY = y;
}

function sdPC(parent) {
  const g = G(parent);
  E('rect', { x: -100, y: 74, width: 200, height: 30, rx: 6, fill: '#D9CFB4', stroke: SC_INK, 'stroke-width': 4 }, g);   // base unit
  E('rect', { x: 50, y: 82, width: 34, height: 6, rx: 2, fill: '#5A5040' }, g);
  E('path', { d: 'M-30,60 L30,60 L40,76 L-40,76 Z', fill: '#C9BFA4', stroke: SC_INK, 'stroke-width': 3 }, g);
  E('rect', { x: -96, y: -76, width: 192, height: 140, rx: 16, fill: '#E6DCC0', stroke: SC_INK, 'stroke-width': 5 }, g);  // CRT
  E('rect', { x: -79, y: -56, width: 158, height: 112, rx: 10, fill: '#0F2236', stroke: '#8A8068', 'stroke-width': 4 }, g);
  const id = 'sdpc' + (++MK_ID);
  const cp = E('clipPath', { id }, defs()); E('rect', { x: -75, y: -52, width: 150, height: 104, rx: 8 }, cp);
  g.screen = G(g, { 'clip-path': `url(#${id})` });
  E('circle', { cx: 80, cy: 52, r: 4, fill: '#56D69B' }, g);
  E('path', { d: 'M-70,-48 L-50,-48', stroke: '#FFFFFF', 'stroke-width': 4, opacity: 0.35, 'stroke-linecap': 'round' }, g);
  return g;
}

/* ---------- sets ---------- */
function sdStudio(parent) {
  const g = G(parent), back = G(g);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#1C3450', '#2C5478', true) }, back);
  // acoustic panels
  let pan = '';
  for (let i = 0; i < 6; i++) pan += `M${330 + i * 50},150 h36 v300 h-36 Z `;
  E('path', { d: pan, fill: '#24405E', opacity: 0.8 }, back);
  // storeroom shelves at the far left
  E('rect', { x: 20, y: 200, width: 270, height: 330, fill: '#3B4A5A', stroke: '#1A2430', 'stroke-width': 4 }, back);
  [300, 410, 520].forEach(y => E('rect', { x: 20, y: y - 8, width: 270, height: 14, fill: '#8F9CAB', stroke: '#1A2430', 'stroke-width': 3 }, back));
  E('rect', { x: 20, y: 192, width: 270, height: 14, fill: '#8F9CAB', stroke: '#1A2430', 'stroke-width': 3 }, back);
  [[40, 184, 90, 60, '#C9A46A'], [150, 184, 60, 44, '#B9874E'], [220, 184, 56, 70, '#D9B87A'], [44, 394, 110, 64, '#B9874E'], [170, 394, 100, 80, '#C9A46A']].forEach(([x, y, w, h, col]) => {
    E('rect', { x, y: y - h, width: w, height: h, fill: col, stroke: '#6B4423', 'stroke-width': 3 }, back);
    E('path', { d: `M${x},${y - h + h * 0.35} h${w}`, stroke: '#6B4423', 'stroke-width': 3, opacity: 0.5 }, back);
  });
  // the old computer on the middle shelf
  const pc = sdPC(back); tr(pc, 155, 193, 0.95);
  g.pc = [155, 193]; g.pcScreen = pc.screen;
  // studio lamps on the ceiling bar
  E('rect', { x: 600, y: 8, width: 560, height: 12, rx: 6, fill: '#5A6670' }, back);
  [720, 1040].forEach(x => {
    E('path', { d: `M${x},20 L${x},40`, stroke: '#5A6670', 'stroke-width': 6 }, back);
    E('path', { d: `M${x - 34},40 L${x + 34},40 L${x + 24},86 L${x - 24},86 Z`, fill: '#2A3B44', stroke: '#0E1A24', 'stroke-width': 4 }, back);
    E('ellipse', { cx: x, cy: 86, rx: 24, ry: 7, fill: '#FFF2B0' }, back);
  });
  // the wall screen
  const SX = 620, SY = 128, SW = 520, SH = 292;
  E('rect', { x: SX - 14, y: SY - 14, width: SW + 28, height: SH + 28, rx: 14, fill: '#0E1A24', stroke: '#5A6670', 'stroke-width': 4 }, back);
  E('rect', { x: SX, y: SY, width: SW, height: SH, fill: linGrad('#103A5C', '#0A2238', true) }, back);
  const id = 'sdscr' + (++MK_ID);
  const cp = E('clipPath', { id }, defs()); E('rect', { x: SX, y: SY, width: SW, height: SH }, cp);
  g.screen = G(back, { 'clip-path': `url(#${id})` });
  g.scr = { x: SX, y: SY, w: SW, h: SH };
  const logo = G(g.screen);
  E('rect', { x: SX + 110, y: SY + 86, width: 300, height: 120, rx: 18, fill: SD_COL.news, stroke: '#FFFFFF', 'stroke-width': 5 }, logo);
  T(logo, SX + 260, SY + 168, '8B NEWS', { size: 64, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 3 });
  g.logo = logo;
  // ON AIR light
  const air = G(back); tr(air, 880, 470);
  E('rect', { x: -70, y: -22, width: 140, height: 44, rx: 10, fill: '#3A1010', stroke: '#0E1A24', 'stroke-width': 4 }, air);
  const airOn = E('rect', { x: -64, y: -16, width: 128, height: 32, rx: 7, fill: '#FF3B3B' }, air);
  T(air, 0, 10, 'ON AIR', { size: 26, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  // mop and bucket at the bottom of the shelves (g.mop pivots at its base)
  const mop = G(back); g.mop = mop; tr(mop, 300, 560, 1, 0);
  E('path', { d: 'M0,0 L-6,-240', stroke: '#C9A46A', 'stroke-width': 9, 'stroke-linecap': 'round' }, mop);
  E('path', { d: 'M-30,0 Q-20,-20 0,-14 Q20,-20 30,0 Q20,14 0,10 Q-20,14 -30,0 Z', fill: '#E9E2D0', stroke: SC_INK, 'stroke-width': 3 }, mop);
  E('path', { d: 'M260,520 L340,520 L330,570 L270,570 Z', fill: '#FFC247', stroke: SC_INK, 'stroke-width': 4 }, back);
  // the news desk
  _sdLayers(g, 530, '#2A3B4C', '#D63A3A', front => {
    E('rect', { x: 700, y: 580, width: 340, height: 92, rx: 14, fill: SD_COL.news, stroke: '#FFFFFF', 'stroke-width': 4 }, front);
    T(front, 870, 644, '8B NEWS', { size: 56, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 3 });
  });
  let air01 = 1;
  g.onAir = p => { air01 = clamp(p); };
  g.upd = t => op(airOn, air01 * (Math.sin(t * TAU * 0.7) > -0.2 ? 1 : 0.35));
  g.upd(0);
  return g;
}

function sdDesk(parent) {
  const g = G(parent), back = G(g);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#0C1A2A', '#14304A', true) }, back);
  // circuit traces (we are inside the computer)
  let ct = '';
  const r = rng(19);
  for (let i = 0; i < 14; i++) { const x = 40 + r() * 1120, y = 120 + r() * 380; ct += `M${x.toFixed(0)},${y.toFixed(0)} h${(40 + r() * 120).toFixed(0)} v${(30 + r() * 60).toFixed(0)} h${(30 + r() * 80).toFixed(0)} `; }
  E('path', { d: ct, fill: 'none', stroke: '#2D6A8A', 'stroke-width': 3, opacity: 0.45 }, back);
  // venetian-blind light stripes across the wall
  let bl = '';
  for (let i = 0; i < 7; i++) bl += `M${-100 + i * 70},${120 + i * 6} L${400 + i * 70},${60 + i * 6} L${400 + i * 70},${84 + i * 6} L${-100 + i * 70},${144 + i * 6} Z `;
  E('path', { d: bl, fill: '#FFE7A8', opacity: 0.08 }, back);
  // door-glass sign
  const sg = G(back); tr(sg, 360, 170);
  E('rect', { x: -170, y: -46, width: 340, height: 92, rx: 10, fill: 'rgba(200,230,255,0.12)', stroke: '#8FB3CC', 'stroke-width': 4 }, sg);
  T(sg, 0, -6, 'FACT-CHECK', { size: 36, weight: 800, anchor: 'middle', fill: '#FFE45C', ls: 3 });
  T(sg, 0, 30, 'DESK', { size: 30, weight: 800, anchor: 'middle', fill: '#FFE45C', ls: 6 });
  // the evidence board
  E('rect', { x: 650, y: 140, width: 490, height: 320, rx: 8, fill: '#B98A55', stroke: '#5A3A1A', 'stroke-width': 6 }, back);
  E('rect', { x: 660, y: 150, width: 470, height: 300, fill: '#C99A62' }, back);
  g.board = G(back); g.boardRect = { x: 660, y: 150, w: 470, h: 300 };
  // the lamp light cone
  const cone = E('path', { d: 'M300,430 L180,560 L460,560 Z', fill: '#FFE7A8', opacity: 0.12 }, back);
  // desk
  _sdLayers(g, 540, '#5A3A22', null, front => {
    T(front, 1060, 640, 'CASE FILES', { size: 26, weight: 800, anchor: 'end', fill: '#E9D2B0', opacity: 0.6 });
  });
  const lamp = G(g.top); tr(lamp, 300, 530);
  E('path', { d: 'M-40,0 L40,0 L30,-12 L-30,-12 Z', fill: '#2A3B44', stroke: SC_INK, 'stroke-width': 3 }, lamp);
  E('path', { d: 'M0,-12 L-10,-70 L20,-96', fill: 'none', stroke: '#2A3B44', 'stroke-width': 7, 'stroke-linecap': 'round' }, lamp);
  E('path', { d: 'M4,-112 L52,-92 L34,-70 Z', fill: '#2E8B57', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, lamp);
  const files = G(g.top); tr(files, 900, 530);
  [['#E9D2B0', 0], ['#D9BE90', -14], ['#E9D2B0', -28]].forEach(([col, y], i) => E('rect', { x: -70 + i * 6, y: y - 14, width: 140, height: 14, rx: 3, fill: col, stroke: SC_INK, 'stroke-width': 2.5 }, files));
  g.upd = t => op(cone, 0.12 + 0.03 * Math.sin(t * 9) * Math.sin(t * 2.3));
  return g;
}

function sdFlat(parent) {
  const g = G(parent), back = G(g);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#F3E3C8', '#E8D2AE', true) }, back);
  // night window with HDB blocks
  E('rect', { x: 640, y: 110, width: 460, height: 300, rx: 8, fill: linGrad('#14204A', '#2A3A78', true), stroke: '#FFFFFF', 'stroke-width': 10 }, back);
  const r = rng(23);
  [[670, 200, 120, 210], [810, 160, 110, 250], [950, 220, 130, 190]].forEach(([x, y, w, h]) => {
    E('rect', { x, y, width: w, height: h, fill: '#2E3A5C' }, back);
    let wn = '';
    for (let yy = y + 14; yy < 400; yy += 30) for (let xx = x + 12; xx < x + w - 14; xx += 26) if (r() > 0.45) wn += `M${xx},${yy} h14 v14 h-14 Z `;
    E('path', { d: wn, fill: '#FFE7A8' }, back);
  });
  E('path', { d: 'M870,110 L870,410 M640,260 L1100,260', stroke: '#FFFFFF', 'stroke-width': 8 }, back);
  // kitchen doorway, clock, calendar
  E('rect', { x: 80, y: 120, width: 220, height: 420, fill: '#C9A87A', stroke: '#8A6A40', 'stroke-width': 6 }, back);
  E('rect', { x: 96, y: 136, width: 188, height: 404, fill: '#FFF4DE' }, back);
  E('rect', { x: 120, y: 300, width: 140, height: 80, rx: 6, fill: '#B9C4CE', stroke: '#7D8A96', 'stroke-width': 3 }, back);   // fridge peeking
  const clk = G(back); tr(clk, 470, 190);
  E('circle', { r: 48, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 5 }, clk);
  E('path', { d: 'M0,0 L0,-30 M0,0 L22,8', stroke: SC_INK, 'stroke-width': 5, 'stroke-linecap': 'round' }, clk);
  const cal = G(back); tr(cal, 470, 330);
  E('rect', { x: -50, y: -40, width: 100, height: 92, rx: 6, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, cal);
  E('rect', { x: -50, y: -40, width: 100, height: 22, rx: 6, fill: '#E8424F' }, cal);
  let gd = '';
  for (let i = 0; i < 3; i++) for (let j = 0; j < 4; j++) gd += `M${-38 + j * 22},${-6 + i * 18} h12 v10 h-12 Z `;
  E('path', { d: gd, fill: '#C9D3DC' }, cal);
  _sdLayers(g, 540, '#9C6B3E', null, null);
  return g;
}

function sdCanteen(parent) {
  const g = G(parent);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#BFE6FF', '#F2FAFF', true) }, g);
  E('path', { d: 'M0,170 L600,120 L1200,170 L1200,210 L0,210 Z', fill: '#2E6FA8', stroke: '#1A4470', 'stroke-width': 5 }, g);
  E('rect', { x: 0, y: 210, width: 1200, height: 540, fill: '#F3EDE0' }, g);
  E('rect', { x: 0, y: 210, width: 1200, height: 30, fill: '#D9CFBC' }, g);
  const fans = [240, 600, 960].map(x => { const f = sdFan(g, 0.75); tr(f, x, 278); return f; });
  // the banner
  E('rect', { x: 330, y: 132, width: 540, height: 54, rx: 10, fill: '#FFE45C', stroke: SC_INK, 'stroke-width': 4 }, g);
  T(g, 600, 170, 'THE GREAT CANTEEN VOTE', { size: 32, weight: 800, anchor: 'middle', fill: '#8E1B1B' });
  const names = [['DRINKS', '#2E7DD8'], ['VEG RICE', '#2FA36B'], ['ICE KACHANG', SD_COL.kachang], ['BUBBLE TEA', SD_COL.boba]];
  g.stalls = [];
  names.forEach(([n, col], i) => {
    const x = 30 + i * 290, w = 270, y = 330;
    E('rect', { x, y, width: w, height: 190, fill: '#FFFDF6', stroke: '#9C8A6A', 'stroke-width': 4 }, g);
    E('rect', { x, y, width: w, height: 48, fill: col }, g);
    T(g, x + w / 2, y + 34, n, { size: 28, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
    E('rect', { x: x + 10, y: y + 140, width: w - 20, height: 50, fill: '#B9C4CE', stroke: '#7D8A96', 'stroke-width': 3 }, g);
    E('rect', { x: x + 24, y: y + 62, width: w - 48, height: 64, rx: 6, fill: '#F7E9D0', stroke: '#C9B48A', 'stroke-width': 2 }, g);
    if (i >= 2) {
      const tg = G(g); tr(tg, x + w - 30, y - 8, 1, 10);
      E('rect', { x: -44, y: -18, width: 88, height: 34, rx: 6, fill: '#FFE45C', stroke: SC_INK, 'stroke-width': 3 }, tg);
      T(tg, 0, 8, 'TRIAL', { size: 22, weight: 800, anchor: 'middle', fill: SC_INK });
    }
    g.stalls.push([x + w / 2, y + 95]);
  });
  // tables and benches
  for (let i = 0; i < 3; i++) {
    const x = 200 + i * 400;
    E('rect', { x: x - 130, y: 600, width: 260, height: 26, rx: 6, fill: '#2E8B57', stroke: '#1E5A38', 'stroke-width': 4 }, g);
    E('rect', { x: x - 12, y: 626, width: 24, height: 124, fill: '#7D8A96' }, g);
    [-1, 1].forEach(s => E('rect', { x: x - 120, y: 650 + (s > 0 ? 40 : 0), width: 240, height: 16, rx: 5, fill: '#3FA463', stroke: '#1E5A38', 'stroke-width': 3 }, g));
  }
  g.upd = t => fans.forEach(f => f.upd(t));
  return g;
}

function sdTrial(parent) {
  const g = G(parent), back = G(g);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#E8F2F8', '#CFE0EA', true) }, back);
  const half = (x0, x1, col, name, items, side) => {
    E('rect', { x: x0, y: 170, width: x1 - x0, height: 380, fill: '#FFFDF6', stroke: '#9C8A6A', 'stroke-width': 4 }, back);
    E('rect', { x: x0, y: 100, width: x1 - x0, height: 72, fill: col, stroke: SC_INK, 'stroke-width': 4 }, back);
    const t = T(back, (x0 + x1) / 2, 150, name, { size: 40, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 2 });
    t.setAttribute('stroke', scShade(col, -0.45)); t.setAttribute('stroke-width', 6); t.setAttribute('paint-order', 'stroke');
    const tg = G(back); tr(tg, x1 - 56, 96, 1, 8);
    E('rect', { x: -46, y: -18, width: 92, height: 34, rx: 6, fill: '#FFE45C', stroke: SC_INK, 'stroke-width': 3 }, tg);
    T(tg, 0, 8, 'TRIAL', { size: 22, weight: 800, anchor: 'middle', fill: SC_INK });
    const m = mkHawkerMenu(back, { title: side ? 'BUBBLE TEA' : 'ICE KACHANG', sub: side ? 'shaken fresh' : 'since 1985', w: 250, size: 26, col, items });
    tr(m, side ? x1 - 150 : x0 + 150, 196);
    return m;
  };
  g.menuL = half(120, 590, SD_COL.kachang, "ROSE'S ICE KACHANG", [['Ice kachang', '$3.00'], ['Chendol', '$2.50']], 0);
  g.menuR = half(610, 1080, SD_COL.boba, 'BUBBLE TEA', [['Milk tea', '$3.20'], ['Taro', '$3.50']], 1);
  // the shaved-ice machine behind Rose's side
  const mac = G(back); tr(mac, 470, 470);
  E('rect', { x: -40, y: -120, width: 80, height: 120, rx: 10, fill: '#E6EBEF', stroke: SC_INK, 'stroke-width': 4 }, mac);
  E('path', { d: 'M-50,-130 L50,-130 L40,-110 L-40,-110 Z', fill: '#2E7DD8', stroke: SC_INK, 'stroke-width': 4 }, mac);
  const wheel = G(mac); tr(wheel, 0, -64);
  E('circle', { r: 22, fill: '#C9D3DC', stroke: SC_INK, 'stroke-width': 3 }, wheel);
  E('path', { d: 'M-18,0 L18,0 M0,-18 L0,18', stroke: SC_INK, 'stroke-width': 4 }, wheel);
  // a plant corner on the right (Stemmy stands here in his scene)
  E('rect', { x: 1092, y: 170, width: 108, height: 380, fill: '#DDEBE2' }, back);
  _sdLayers(g, 530, '#B9C4CE', '#FFE45C', null);
  g.upd = t => tr(wheel, 0, -64, 1, (t * 90) % 360);
  return g;
}

function sdStaff(parent) {
  const g = G(parent), back = G(g);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#E4ECE4', '#CBD9CC', true) }, back);
  // pigeonholes
  E('rect', { x: 60, y: 130, width: 380, height: 300, fill: '#C9A87A', stroke: '#6B4423', 'stroke-width': 5 }, back);
  let ph = '';
  for (let i = 0; i < 5; i++) for (let j = 0; j < 4; j++) ph += `M${76 + i * 72},${146 + j * 70} h58 v56 h-58 Z `;
  E('path', { d: ph, fill: '#7A5A36' }, back);
  const r = rng(29);
  let pp = '';
  for (let i = 0; i < 5; i++) for (let j = 0; j < 4; j++) if (r() > 0.4) pp += `M${82 + i * 72},${168 + j * 70} h46 v30 h-46 Z `;
  E('path', { d: pp, fill: '#FFFDF6' }, back);
  // notice board
  E('rect', { x: 520, y: 120, width: 330, height: 220, rx: 6, fill: '#B98A55', stroke: '#5A3A1A', 'stroke-width': 5 }, back);
  T(back, 685, 168, 'STAFF ROOM', { size: 32, weight: 800, anchor: 'middle', fill: '#FFFDF6' });
  [[560, 200, '#FFF4A8'], [680, 210, '#C8F0FF'], [770, 196, '#FFD6E0']].forEach(([x, y, col]) => E('rect', { x, y, width: 64, height: 70, fill: col, stroke: '#8A6B3A', 'stroke-width': 2 }, back));
  // kopi machine
  const km = G(back); tr(km, 1010, 520);
  E('rect', { x: -80, y: -250, width: 160, height: 250, rx: 12, fill: '#5A6670', stroke: SC_INK, 'stroke-width': 5 }, km);
  E('rect', { x: -60, y: -228, width: 120, height: 50, rx: 6, fill: '#2A3B44' }, km);
  T(km, 0, -194, 'KOPI', { size: 32, weight: 800, anchor: 'middle', fill: '#FFE45C' });
  E('rect', { x: -40, y: -120, width: 80, height: 70, fill: '#2A3B44' }, km);
  const steam = G(km);
  [-14, 0, 14].forEach((x, i) => E('path', { d: `M${x},-60 q8,-14 0,-28 q-8,-14 0,-28`, fill: 'none', stroke: '#FFFFFF', 'stroke-width': 4, opacity: 0.6, 'stroke-linecap': 'round' }, steam));
  _sdLayers(g, 540, '#7A8B5A', null, null);
  g.upd = t => { tr(steam, 0, -((t * 20) % 16)); op(steam, 0.5 + 0.3 * Math.sin(t * 3)); };
  return g;
}

function sdHawker(parent) {
  const g = G(parent), back = G(g);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#1C2430', '#2E3A48', true) }, back);
  E('rect', { x: 120, y: 176, width: 960, height: 360, fill: '#EAF4EE' }, back);
  let tl = '';
  for (let x = 120; x <= 1080; x += 48) tl += `M${x},176 L${x},536 `;
  for (let y = 176; y <= 536; y += 48) tl += `M120,${y} L1080,${y} `;
  E('path', { d: tl, stroke: '#C9DCD2', 'stroke-width': 2 }, back);
  E('rect', { x: 100, y: 104, width: 1000, height: 74, fill: linGrad('#D63A3A', '#A61E1E', true), stroke: '#5A1010', 'stroke-width': 4 }, back);
  const sg = T(back, 600, 152, "ROSE'S KITCHEN", { size: 50, weight: 800, anchor: 'middle', fill: '#FFE45C', ls: 3 });
  sg.setAttribute('stroke', '#5A1010'); sg.setAttribute('stroke-width', 6); sg.setAttribute('paint-order', 'stroke');
  T(back, 1060, 168, 'Blk 208', { size: 26, weight: 700, anchor: 'end', fill: '#FFFFFF', font: FB });
  const menu = mkHawkerMenu(back, { title: 'DESSERTS', sub: "Rose's Kitchen", w: 360, size: 26, col: '#2E7D4F',
    items: [['Ice kachang', '$3.00'], ['Chendol', '$2.50'], ['Bandung', '$1.80']] });
  tr(menu, 880, 196); g.menu = menu;
  const fan = sdFan(back, 0.7); tr(fan, 560, 236);
  // the shaved-ice machine on the left
  const mac = G(back); tr(mac, 230, 520);
  E('rect', { x: -50, y: -150, width: 100, height: 150, rx: 12, fill: '#E6EBEF', stroke: SC_INK, 'stroke-width': 4 }, mac);
  E('path', { d: 'M-62,-162 L62,-162 L50,-140 L-50,-140 Z', fill: '#2E7DD8', stroke: SC_INK, 'stroke-width': 4 }, mac);
  E('circle', { cy: -80, r: 26, fill: '#C9D3DC', stroke: SC_INK, 'stroke-width': 3 }, mac);
  _sdLayers(g, 530, '#B9C4CE', '#E8679A', null);
  g.upd = t => fan.upd(t);
  return g;
}

function sdRoseCall(parent, w, h, label) {
  const g = scVideoCall(parent, w, h, label || 'Auntie Rose · Blk 208');
  const bg = G(g.screen);
  E('rect', { x: -w / 2, y: -h / 2, width: w, height: h, fill: '#EAF4EE' }, bg);
  E('rect', { x: -w / 2, y: -h / 2, width: w, height: h * 0.2, fill: '#C62828' }, bg);
  T(bg, 0, -h / 2 + h * 0.14, "ROSE'S KITCHEN", { size: Math.max(26, h * 0.09), weight: 800, anchor: 'middle', fill: '#FFE45C' });
  const holder = G(g.screen); tr(holder, 0, h * 0.2);
  g.rose = cast(holder, 'rose', { s: h / 330, prop: null });
  return g;
}

function sdDevice(parent, kind, o) {
  o = o || {};
  const D = { laptop: [340, 214], phone: [150, 270], tablet: [300, 200] }[kind] || [340, 214];
  const [w, h] = D, g = G(parent);
  if (kind === 'laptop') {
    E('rect', { x: -w / 2 - 18, y: -h / 2 - 18, width: w + 36, height: h + 36, rx: 14, fill: '#3A4A58', stroke: SC_INK, 'stroke-width': 4 }, g);
    E('path', { d: `M${-w / 2 - 40},${h / 2 + 18} L${w / 2 + 40},${h / 2 + 18} L${w / 2 + 64},${h / 2 + 44} L${-w / 2 - 64},${h / 2 + 44} Z`, fill: '#8F9CAB', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
  } else {
    E('rect', { x: -w / 2 - 12, y: -h / 2 - 22, width: w + 24, height: h + 44, rx: 18, fill: '#26323C', stroke: SC_INK, 'stroke-width': 4 }, g);
  }
  E('rect', { x: -w / 2, y: -h / 2, width: w, height: h, fill: '#0C1A2A' }, g);
  const id = 'sddev' + (++MK_ID);
  const cp = E('clipPath', { id }, defs()); E('rect', { x: -w / 2, y: -h / 2, width: w, height: h }, cp);
  g.screen = G(g, { 'clip-path': `url(#${id})` });
  const bg = G(g.screen);
  E('rect', { x: -w / 2, y: -h / 2, width: w, height: h, fill: linGrad('#0C1A2A', '#14304A', true) }, bg);
  E('path', { d: `M${-w / 2},${-h * 0.1} L${w / 2},${-h * 0.32} L${w / 2},${-h * 0.22} L${-w / 2},0 Z`, fill: '#FFE7A8', opacity: 0.1 }, bg);
  T(bg, 0, -h / 2 + 30, 'FACT-CHECK DESK', { size: 26, weight: 800, anchor: 'middle', fill: '#FFE45C', opacity: 0.85 });
  g.axis = null;
  if (o.axis !== false) { const hold = G(g.screen); tr(hold, 0, h * 0.2); g.axis = cast(hold, 'axis', { s: h / 360 }); }
  g.W = w; g.H = h;
  return g;
}

/* ---------- props ---------- */
function sdStamp(parent, kind) {
  const k = { biased: ['BIASED', '#D32F2F'], misleading: ['MISLEADING', '#E8590C'], checked: ['FACT-CHECKED', '#1E9E5A'] }[kind] || ['BIASED', '#D32F2F'];
  return mkStamp(parent, k[0], k[1]);
}

function sdCup(parent, o) {
  o = o || {};
  const g = G(parent), inner = G(g); tr(inner, 0, 0, o.s || 1);
  const body = 'M-46,-140 L46,-140 L36,0 L-36,0 Z', clip = _clipUrl(body);
  const liq = E('rect', { x: -50, y: -140, width: 100, height: 140, fill: o.col || SD_COL.tea, 'clip-path': clip }, inner);
  const pearls = G(inner, { 'clip-path': clip });
  [[-22, -12], [-6, -10], [10, -12], [24, -10], [-16, -26], [2, -24], [18, -26]].forEach(([x, y]) => E('circle', { cx: x, cy: y, r: 8, fill: SD_COL.pearl }, pearls));
  E('path', { d: body, fill: 'rgba(255,255,255,0.22)', stroke: '#5A6670', 'stroke-width': 4, 'stroke-linejoin': 'round' }, inner);
  E('path', { d: 'M-50,-140 Q0,-178 50,-140 Z', fill: 'rgba(255,255,255,0.6)', stroke: '#5A6670', 'stroke-width': 4 }, inner);   // dome lid
  E('path', { d: 'M6,-150 L20,-210', stroke: '#8E5BD8', 'stroke-width': 14, 'stroke-linecap': 'round' }, inner);   // fat straw
  if (o.label) { const lb = G(inner); tr(lb, 0, -78); E('rect', { x: -36, y: -16, width: 72, height: 30, rx: 6, fill: '#FFFFFF', stroke: '#5A6670', 'stroke-width': 2 }, lb); T(lb, 0, 7, o.label, { size: 20, weight: 800, anchor: 'middle', fill: '#4A2A6A' }); }
  g.set = level => { const L = clamp(level === undefined ? 0.85 : level); attr(liq, 'y', -140 * L); attr(liq, 'height', 140 * L + 2); };
  g.set(0.85);
  return g;
}

function sdBowl(parent, o) {
  o = o || {};
  const g = G(parent), inner = G(g); tr(inner, 0, 0, o.s || 1);
  // the shaved-ice dome
  E('path', { d: 'M-70,-40 Q-70,-130 0,-132 Q70,-130 70,-40 Z', fill: SD_COL.ice, stroke: '#9FB2C2', 'stroke-width': 4 }, inner);
  E('path', { d: 'M-60,-60 Q-40,-120 -6,-128 L-14,-50 Z', fill: '#E8424F', opacity: 0.8 }, inner);
  E('path', { d: 'M6,-128 Q44,-118 60,-62 L18,-50 Z', fill: '#5BD27A', opacity: 0.8 }, inner);
  E('path', { d: 'M-30,-100 Q0,-80 34,-104', fill: 'none', stroke: '#8E1B1B', 'stroke-width': 6, opacity: 0.6, 'stroke-linecap': 'round' }, inner);
  [[-20, -128], [-4, -134], [12, -128], [26, -120]].forEach(([x, y]) => E('circle', { cx: x, cy: y, r: 6, fill: SD_COL.corn, stroke: '#B58A12', 'stroke-width': 2 }, inner));
  // the bowl
  E('path', { d: 'M-80,-44 L80,-44 Q76,-6 40,-2 L-40,-2 Q-76,-6 -80,-44 Z', fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, inner);
  E('path', { d: 'M-70,-30 L70,-30', stroke: '#2E7DD8', 'stroke-width': 5 }, inner);
  E('rect', { x: -26, y: -4, width: 52, height: 6, rx: 3, fill: '#C9D3DC', stroke: SC_INK, 'stroke-width': 2 }, inner);
  E('path', { d: 'M40,-100 L72,-150', stroke: '#C9D3DC', 'stroke-width': 7, 'stroke-linecap': 'round' }, inner);   // spoon
  return g;
}

function sdStopwatch(parent, o) {
  o = o || {};
  const g = G(parent);
  E('rect', { x: -12, y: -82, width: 24, height: 16, rx: 4, fill: '#8F9CAB', stroke: SC_INK, 'stroke-width': 3 }, g);
  E('circle', { cy: -62, r: 8, fill: '#E8424F', stroke: SC_INK, 'stroke-width': 3 }, g);
  E('circle', { r: 62, fill: '#E6EBEF', stroke: SC_INK, 'stroke-width': 6 }, g);
  E('circle', { r: 50, fill: '#FFFFFF', stroke: '#9FB2C2', 'stroke-width': 3 }, g);
  const hand = E('line', { x1: 0, y1: 0, x2: 0, y2: -44, stroke: '#E8424F', 'stroke-width': 4, 'stroke-linecap': 'round' }, g);
  E('rect', { x: -40, y: 12, width: 80, height: 32, rx: 6, fill: '#1E2A33' }, g);
  const rd = T(g, 0, 37, '0 s', { size: 26, weight: 800, anchor: 'middle', fill: '#7CFFB2' });
  g.set = s => { setText(rd, Math.floor(s) + ' s'); hand.setAttribute('transform', `rotate(${((s % 60) * 6).toFixed(1)})`); };
  return g;
}

function sdPoster(parent, o) {
  o = o || {};
  const w = o.w || 360, h = o.h || 460, g = G(parent), col = o.col || SD_COL.boba;
  E('rect', { x: -w / 2 + 8, y: -h / 2 + 10, width: w, height: h, rx: 6, fill: 'rgba(0,0,0,0.25)' }, g);
  E('rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: 6, fill: '#FFFDF6', stroke: col, 'stroke-width': 8 }, g);
  E('rect', { x: -w / 2, y: -h / 2, width: w, height: 70, rx: 6, fill: col }, g);
  T(g, 0, -h / 2 + 48, o.title || 'VOTE BUBBLE TEA!', { size: 32, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  [[-w / 2 + 6, -h / 2 - 6, -20], [w / 2 - 6, -h / 2 - 6, 20]].forEach(([x, y, r]) => { const tp = G(g); tr(tp, x, y, 1, r); E('rect', { x: -24, y: -9, width: 48, height: 18, fill: 'rgba(255,240,180,0.85)' }, tp); });
  g.area = { x: -w / 2 + 24, y: -h / 2 + 90, w: w - 48, h: h - 110 };
  g.content = G(g);
  return g;
}

function sdNotebook(parent, o) {
  o = o || {};
  const w = o.w || 420, h = o.h || 460, g = G(parent);
  E('rect', { x: -w / 2 + 8, y: -h / 2 + 10, width: w, height: h, rx: 10, fill: 'rgba(0,0,0,0.25)' }, g);
  E('rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: 10, fill: '#FFF8E8', stroke: '#B8A27A', 'stroke-width': 3 }, g);
  let ln = '';
  for (let y = -h / 2 + 96; y < h / 2 - 10; y += 44) ln += `M${-w / 2 + 16},${y} L${w / 2 - 16},${y} `;
  E('path', { d: ln, stroke: '#A8C8E8', 'stroke-width': 2 }, g);
  let sp = '';
  for (let x = -w / 2 + 30; x < w / 2 - 10; x += 34) sp += `M${x},${-h / 2 - 10} a8,10 0 1 1 0,20 `;
  E('path', { d: sp, fill: 'none', stroke: '#5A6670', 'stroke-width': 4 }, g);
  T(g, -w / 2 + 24, -h / 2 + 54, o.title || "AUNTIE'S DATA", { size: 32, weight: 800, fill: '#B8336A' });
  g.area = { x: -w / 2 + 20, y: -h / 2 + 76, w: w - 40, h: h - 96 };
  g.content = G(g);
  return g;
}
