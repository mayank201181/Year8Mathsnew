/* OUT OF A HUNDRED (Claude Sitcom Ep 6, Percentages): the cast, sets and props of this episode.
   Bundled after engine lib.js, kit.js, mathkit.js and sitcom.js (scMake, scTalk, scKavya, scCastHuman,
   scConfessional, scLowerThird, scVideoCall, mk* maths kit). Every top-level name starts with `pc`, except `cast`.

   Characters: cast(parent, kind, o) -> g, origin at the character's centre, about 220-260 px tall at s = 1
     o: { s (scale), mood (default mood), ... }   (humans: any scHuman option overrides, e.g. prop, lift)
     g.set({ t, talk, mood, look, sweat, still, ... })   call every frame
       talk 0..1 (use scTalk(S, t, who)); mood: neutral | happy | smug | annoyed | sad | shock | deadpan
       look -1..1 pupils left/right; still: true stops the idle bob
     HUMANS (busts: the bottom of the shirt is at y = 140, so stand them behind a counter or a table, or put them
     low enough that the hem is below the bottom of the frame, y 750):
       'kavya'  (kavya)  Kavya, 12 (scKavya, blue PE shirt "8")
       'mum'    (mum)    Mum: magenta kurta, bun, bindi. Default prop: her shopping list ('paper')
       'dad'    (dad)    Dad: glasses, moustache, green polo. Default prop: a calculator
       'boy'    (boy)    Ah Boy, 8: orange star tee. Default: an empty hand (lift: 1 raises it)
       'priya'  (priya)  Priya, 12: school uniform, bob, yellow clip. Default prop: her phone
       'tan'    (tan)    Mr Tan, maths teacher: shirt and tie, glasses. Default prop: a red pen ('marker', red)
       'rose'   (rose)   Auntie Rose (spare: not in the script). Default prop: kopi
       Pass { prop: null } for no prop; { body: true } for a full body (scHumanBody, feet at 0,0; pose API).
     CARTOONS (scMake):
       'percy'  (percy)  Percy, the PER CENT SIGN: a red slash with two red rings, the top-left ring is his head
                         (face inside it), the bottom-right ring is what he bounces on; gold bow tie on the slash,
                         a gold microphone in his left hand, a judge's SCORECARD in his right. A game-show host who
                         rates everything out of a hundred. Default mood happy.
                         Extra: g.set({ card: 0..1 (raises the scorecard), score: '12' (its text, any short
                         string), mic: 0..1 (lifts the microphone to his mouth) }).
       'tenner' (tenner) Tenner, the 10% BLOCK: an orange cube with "10%" on the front, blue sweatband, flexing
                         arms, sneakers. A gym bro: "divide by ten!". Default happy.
                         Extra: { arms: 0..1 } flex size (default 0.5); { fiver: 0..1 } pops in his little brother
                         FIVER (a half-height "5%" block) at his right; { uno: 0..1 } pops in tiny cousin UNO ("1%")
                         beyond Fiver. Fiver and Uno have simple painted faces (no talking).
       'multi'  (multi)  The Great Multiplini, the MULTIPLIER: a purple "×" whose four arms are his arms and legs
                         (white gloves at the top ends, black shoes at the bottom), a white head at the crossing,
                         top hat, curly moustache, red cape. A stage magician who does everything in ONE step.
                         Default smug. Extra: { wand: 0..1 } raises the wand and lights sparkles at its tip.
       'olive'  (olive)  Olive, the ORIGINAL PRICE: a cream price tag (hole and string at the top), red cat-eye
                         glasses, pearls; on her front "WAS" (crossed out in red) and "100%". Everyone crosses her
                         out; she is the whole. Prim and offended. Default annoyed.
                         Extra: { huff: 0..1 } tilts her in a huff (about 12 degrees).
       'snowy'  (snowy)  Snowy, COMPOUND INTEREST: a jolly snowball with gold coins rolled into him, red scarf,
                         woolly hat with a "%" bobble, carrot nose. He grows: scale him yourself with
                         tr(g, x, y, s) (e.g. s 0.7 -> 1.3 over the scene). Default happy.

   Shots
     pcConf(parent, who)             confessional background tinted for that character (scConfessional); g.set(p, t)
     PC_TINT                         the confessional colours per character
     pcLowerThird(parent, who)       scLowerThird with this episode's name and role for `who` (PC_LT); g.set(p)

   Sets (full stage 1200 x 750; each returns g)
     pcMall(parent)       wide shot of the mall atrium, Plaza Seratus: glass roof, the upper floor with its railing and
                          shops, the big GREAT SINGAPORE SALE banner across the balcony (y 186-262), two hanging
                          red "SALE %" banners, ground-floor shop fronts (SHOES, BOOKS, TECH, FASHION) with sale
                          posters, an escalator at the right, tiled floor. g.upd(t) sways the banners.
                          g.fronts[i] = [x, y] centre of shop front i (zoom targets); g.banner = [x, y] the big
                          banner's centre; g.pct = [x, y] the "%" on the left hanging banner (zoom target).
     pcShopfronts(parent, posters)  three rival shop fronts side by side, close up (windows x 40-380, 430-770,
                          820-1160). posters: three mkText markup strings shown huge in the windows (default
                          ['{{5/8}} OFF', '0.6 OFF', '62% OFF']). Names above: o.names. g.hl(i, p) glows window i;
                          g.posters[i] the poster groups; g.cx[i] the window centres; customers stand in front
                          (busts low, y about 640, so the hem is below the frame).
     pcShop(parent, o)    a shop interior seen from the customer side, with a counter (like a hawker stall).
                          o: { name ('SHOES'), col (sign colour), kind: 'shoes' | 'books' | 'tech' | 'clothes' |
                          'bank', poster (mkText markup for the red sale poster on the right wall, or null) }.
                          Red/coloured sign band y 104-176 with the name; back-wall shelves of shoes, books,
                          appliances, a clothes rail, or (bank) a rate board. LAYERS: characters go in g.mid (behind
                          the counter: a bust at y about 440 hides its hem), the counter is g.front, props standing on
                          the counter go in g.top (drawn last). g.counterY = 530. g.poster (the poster group, or null),
                          g.board (bank only: the rates board group). g.upd(t).
     pcFoodCourt(parent)  the mall food court: three stall fronts at the back (KAYA TOAST in the middle, VEG RICE,
                          DRINKS), the toast stall's menu board g.menu (mkHawkerMenu: 0 Kaya toast set $5.00,
                          1 Kopi / teh $1.60, 2 Soft-boiled eggs $1.80) with g.menu.hl(i, p), a ceiling fan, and a
                          table in front. LAYERS as pcShop: g.mid (busts sit behind the table, y about 470),
                          g.front (the table, top at g.tableY = 560), g.top. g.upd(t) turns the fan.
     pcCarPark(parent)    the mall car park at 6 p.m.: concrete pillars, a striped level sign "B2", the family car with
                          its boot open and full of shopping bags (g.boot = [x, y]). Busts stand in front, low.

   Props (around their own origin)
     pcStamp(parent, ok)             Olive's stamp: mkStamp 'WRONG WHOLE!' (red, ok false) or Percy's '100% CORRECT'
                                     (green, ok true); g.set(p). About 640 px wide at scale 1: tr(g, x, y, 0.5).
     pcBanner(parent, text, o)       hanging sale banner: a red cloth on a pole, mkText markup in white, centred on
                                     (0,0). o: { w (380), h (150), size (54), col ('#E8424F'), ink ('#FFFFFF') }.
                                     g.set(swing degrees)
     pcBag(parent, o)                shopping bag, base centre at (0,0), about 130 tall. o: { col, label ('SALE'), s }
     pcShoes(parent, o)              a pair of school shoes on a box, base centre at (0,0). o: { s, price (adds a
                                     mkPriceTag at the top right) }. g.tag
     pcRiceCooker(parent, o)         rice cooker, base centre at (0,0), about 150 tall. o: { s, price }. g.tag
     pcKettle(parent, o)             electric kettle, base centre at (0,0), about 140 tall. o: { s, price }. g.tag
     pcJacket(parent, o)             a jacket on a hanger, hook at (0,0), about 250 tall. o: { s, col, price, old }
                                     (old: the crossed-out price on its tag). g.tag
     pcToast(parent, o)              kaya toast set on a tray: toast triangles, two soft-boiled eggs, a cup of kopi,
                                     centred, about 260 wide. o: { s }
     pcAngBao(parent, o)             red packet with a gold "福"-style coin motif (drawn, not text), centred, 90 x 140.
     pcCoins(parent, n, o)           a stack of n gold coins (up to 12), base centre at (0,0); g.set(k) shows k coins
                                     (fractions fade the next). o: { s, label (text under the stack) }
     pcPhone(parent, headline, o)    a big phone showing a news headline (mkText markup), centred, 300 x 520.
                                     o: { s, title ('NEWS') }
*/

/* ---------- confessional tints, lower thirds ---------- */
const PC_TINT = {
  percy: ['#3A0E18', '#7A1E2E'], tenner: ['#3A220C', '#6E4214'], multi: ['#1E1240', '#45288A'], olive: ['#2A2414', '#5A4E28'],
  snowy: ['#0E2438', '#1F4A70'], kavya: ['#14243A', '#25446B'], mum: ['#3A1030', '#6B1E58'], dad: ['#123026', '#245A48'],
  boy: ['#3A2410', '#6B4414'], priya: ['#1A2240', '#33407A'], tan: ['#1A2A3A', '#33506E'], rose: ['#3A1424', '#6E2A44'],
};
function pcConf(parent, who) { const c = PC_TINT[who] || PC_TINT.percy; return scConfessional(parent, c[0], c[1]); }
const PC_LT = {
  percy: ['PERCY', 'The per cent sign. Out of a hundred.'],
  tenner: ['TENNER', '10%. Divide by ten. Every morning.'],
  multi: ['THE GREAT MULTIPLINI', 'The multiplier. One step. Ta-da.'],
  olive: ['OLIVE', 'The original price. The whole.'],
  snowy: ['SNOWY', 'Compound interest. Still growing.'],
  kavya: ['KAVYA, 12', 'Half right. Wholly annoyed.'],
  mum: ['MUM', 'Never pays full price.'],
  dad: ['DAD', 'Gives it 110%.'],
  boy: ['AH BOY, 8', "Kavya's brother. Has ang bao money."],
  priya: ['PRIYA', 'Best friend. Bargain expert.'],
  tan: ['MR TAN', 'Maths teacher. Buys red pens in bulk.'],
  rose: ['AUNTIE ROSE', "Rose's Kitchen, Blk 208"],
};
function pcLowerThird(parent, who) { const l = PC_LT[who] || [String(who).toUpperCase(), '']; return scLowerThird(parent, l[0], l[1]); }

/* ---------- colours ---------- */
const PC = { red: '#E8424F', redDk: '#A61E2E', gold: '#FFC93C', goldDk: '#B8860B', cream: '#FFF3D6', purple: '#7A4BE0', purpleDk: '#3E2290',
  orange: '#FF8A3D', orangeDk: '#C2571A', ice: '#EAF6FF', iceDk: '#A9CDEB', green: '#1E9E5A', blue: '#2E7DD8' };

/* ---------- the cast ---------- */
const PC_PROP = { mum: 'paper', dad: 'calculator', boy: null, priya: 'phone', tan: 'marker', rose: 'kopi' };
function cast(parent, kind, o) {
  o = o || {};
  if (kind === 'kavya') return scKavya(parent, o);
  if (SC_HUMANS[kind]) {
    const base = kind === 'boy' ? { hand: true } : { prop: PC_PROP[kind] };
    if (kind === 'tan') base.propCol = '#E8424F';
    return scCastHuman(parent, kind, Object.assign(base, o));
  }
  const S = { s: o.s, mood: o.mood };
  let c;
  if (kind === 'percy') {
    let card = null, cardT = null, armR = null, mic = null, lastScore = null;
    c = scMake(parent, Object.assign(S, { seed: 31, bob: 5, mood: o.mood || 'happy',
      draw: g => {
        // left arm and microphone (behind the slash)
        mic = G(g); tr(mic, -14, 30);
        E('path', { d: 'M0,0 Q-50,10 -70,-10', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, mic);
        const mh = G(mic); tr(mh, -72, -14, 1, -20);
        E('rect', { x: -6, y: -4, width: 12, height: 40, rx: 5, fill: '#3A3A3A', stroke: SC_INK, 'stroke-width': 3 }, mh);
        E('circle', { cx: 0, cy: -12, r: 14, fill: ball(PC.gold, PC.goldDk), stroke: SC_INK, 'stroke-width': 3 }, mh);
        E('circle', { cx: 0, cy: 6, r: 9, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 2.5 }, mic);   // glove
        tr(mic.lastChild, -70, -10);
        // the slash
        E('path', { d: 'M-58,118 L58,-118', stroke: SC_INK, 'stroke-width': 40, 'stroke-linecap': 'round' }, g);
        E('path', { d: 'M-58,118 L58,-118', stroke: PC.red, 'stroke-width': 30, 'stroke-linecap': 'round' }, g);
        E('path', { d: 'M-44,82 L36,-84', stroke: '#FF9AA4', 'stroke-width': 6, 'stroke-linecap': 'round', opacity: 0.7 }, g);
        // the bottom zero: what he bounces on
        E('circle', { cx: 58, cy: 70, r: 42, fill: '#FFE9EC', stroke: SC_INK, 'stroke-width': 26 }, g);
        E('circle', { cx: 58, cy: 70, r: 42, fill: 'none', stroke: PC.red, 'stroke-width': 17 }, g);
        // gold bow tie on the slash
        const bt = G(g); tr(bt, 2, 2, 1, -25);
        E('path', { d: 'M0,0 L-28,-16 L-28,16 Z M0,0 L28,-16 L28,16 Z', fill: PC.gold, stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, bt);
        E('circle', { r: 7, fill: PC.goldDk, stroke: SC_INK, 'stroke-width': 2.5 }, bt);
        // the top zero: his head
        E('circle', { cx: -52, cy: -62, r: 56, fill: '#FFF1F3', stroke: SC_INK, 'stroke-width': 26 }, g);
        E('circle', { cx: -52, cy: -62, r: 56, fill: 'none', stroke: PC.red, 'stroke-width': 17 }, g);
        // right arm and the scorecard (in front)
        armR = G(g); tr(armR, 26, -40);
        E('path', { d: 'M0,0 Q60,-6 86,-40', fill: 'none', stroke: SC_INK, 'stroke-width': 7, 'stroke-linecap': 'round' }, armR);
        card = G(armR); tr(card, 86, -40);
        E('rect', { x: -4, y: -6, width: 8, height: 30, fill: '#9C6B3E', stroke: SC_INK, 'stroke-width': 2 }, card);   // handle
        E('rect', { x: -52, y: -100, width: 104, height: 90, rx: 10, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 4 }, card);
        E('rect', { x: -46, y: -94, width: 92, height: 14, rx: 4, fill: PC.red }, card);
        cardT = T(card, 0, -28, '12', { size: 50, weight: 800, anchor: 'middle', fill: SC_INK });
        E('circle', { cx: 0, cy: 0, r: 10, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 2.5 }, armR);   // glove
        tr(armR.lastChild, 86, -40);
      },
      face: { x: -52, y: -60, eye: 12, gap: 36, mouthW: 28, mouthY: 26, lidCol: '#FFD9DE' },
      upd: (t, g, st) => {
        const k = clamp(st.card || 0), m = clamp(st.mic || 0);
        op(card, k > 0.02 ? 1 : 0);
        tr(card, 86, lerp(10, -40, k), Math.max(0.01, lerp(0.4, 1, k)), lerp(20, 0, k));
        tr(armR, 26, -40, 1, lerp(95, 0, k));   // arm hangs down when the card is away
        tr(mic, -14, 30, 1, lerp(0, 34, m));
        const sc = st.score === undefined ? '12' : String(st.score);
        if (sc !== lastScore) { setText(cardT, sc); attr(cardT, 'font-size', sc.length > 3 ? 34 : sc.length > 2 ? 42 : 50); lastScore = sc; }
      } }));
  } else if (kind === 'tenner') {
    let arms = [], fiv = null, uno = null;
    c = scMake(parent, Object.assign(S, { seed: 37, bob: 6, mood: o.mood || 'happy',
      draw: g => {
        [-1, 1].forEach(sd => { const a = E('path', { d: '', fill: 'none', stroke: SC_INK, 'stroke-width': 9, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g); const f = E('circle', { r: 13, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, g); arms.push({ a, f, sd }); });
        // legs and sneakers
        [-34, 34].forEach(x => {
          E('path', { d: `M${x},70 L${x},104`, stroke: SC_INK, 'stroke-width': 9, 'stroke-linecap': 'round' }, g);
          E('path', { d: `M${x - 16},116 Q${x - 16},102 ${x + 2},102 L${x + 20},104 Q${x + 28},116 ${x + 18},118 Z`, fill: PC.blue, stroke: SC_INK, 'stroke-width': 3 }, g);
        });
        // the block: front, top, side
        E('path', { d: 'M-70,-84 L-48,-104 L92,-104 L70,-84 Z', fill: '#FFB37A', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
        E('path', { d: 'M70,-84 L92,-104 L92,52 L70,72 Z', fill: PC.orangeDk, stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
        E('rect', { x: -70, y: -84, width: 140, height: 156, rx: 8, fill: linGrad('#FFA05C', PC.orange, true), stroke: SC_INK, 'stroke-width': 5 }, g);
        E('rect', { x: -70, y: -72, width: 140, height: 16, fill: PC.blue, stroke: SC_INK, 'stroke-width': 3 }, g);   // sweatband
        T(g, 0, 58, '10%', { size: 40, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
        // Fiver: half the height, "5%"
        fiv = G(g); tr(fiv, 150, 72);
        const fi = G(fiv);
        E('rect', { x: -58, y: -78, width: 116, height: 78, rx: 7, fill: linGrad('#FFD07A', '#FFA94A', true), stroke: SC_INK, 'stroke-width': 4 }, fi);
        T(fi, 0, -12, '5%', { size: 30, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
        E('circle', { cx: -16, cy: -54, r: 5, fill: SC_INK }, fi); E('circle', { cx: 16, cy: -54, r: 5, fill: SC_INK }, fi);
        E('path', { d: 'M-10,-44 Q0,-36 10,-44', fill: 'none', stroke: SC_INK, 'stroke-width': 3, 'stroke-linecap': 'round' }, fi);
        // Uno: tiny, "1%"
        uno = G(g); tr(uno, 248, 72);
        const un = G(uno);
        E('rect', { x: -26, y: -46, width: 52, height: 46, rx: 6, fill: linGrad('#FFE9A8', '#FFD05C', true), stroke: SC_INK, 'stroke-width': 3 }, un);
        T(un, 0, -10, '1%', { size: 26, weight: 800, anchor: 'middle', fill: '#8A5A08' });
        E('circle', { cx: -8, cy: -34, r: 3, fill: SC_INK }, un); E('circle', { cx: 8, cy: -34, r: 3, fill: SC_INK }, un);
      },
      face: { x: 2, y: -24, eye: 15, gap: 52, mouthW: 34, mouthY: 30, lidCol: '#FFA05C' },
      upd: (t, g, st) => {
        const k = st.arms === undefined ? 0.5 : st.arms;
        arms.forEach(({ a, f, sd }, i) => {
          const w = Math.sin(t * TAU * 1.6 + i * 1.7) * 10 * k, hx = sd * (112 + 6 * k), hy = -58 - 30 * k + w;
          a.setAttribute('d', `M${sd * 70},-6 Q${sd * 116},${(-2 + 10 * k).toFixed(1)} ${hx.toFixed(1)},${hy.toFixed(1)}`);
          tr(f, hx, hy);
        });
        const pf = clamp(st.fiver || 0), pu = clamp(st.uno || 0);
        op(fiv, pf > 0.02 ? 1 : 0); tr(fiv.firstChild, 0, 0, Math.max(0.01, pop(pf)));
        op(uno, pu > 0.02 ? 1 : 0); tr(uno.firstChild, 0, 0, Math.max(0.01, pop(pu)));
      } }));
  } else if (kind === 'multi') {
    let wand = null, sp = null;
    c = scMake(parent, Object.assign(S, { seed: 41, bob: 3, mood: o.mood || 'smug',
      draw: g => {
        // cape
        E('path', { d: 'M-46,-36 Q-120,40 -118,124 L118,124 Q120,40 46,-36 Z', fill: '#8E1B3A', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
        E('path', { d: 'M-34,-24 Q-96,40 -96,116 L96,116 Q96,40 34,-24 Z', fill: '#D93A5E', opacity: 0.55 }, g);
        // the times sign: two crossed bars
        ['M-92,-92 L92,92', 'M92,-92 L-92,92'].forEach(d => {
          E('path', { d, stroke: SC_INK, 'stroke-width': 50, 'stroke-linecap': 'round' }, g);
          E('path', { d, stroke: PC.purple, 'stroke-width': 40, 'stroke-linecap': 'round' }, g);
        });
        E('path', { d: 'M-78,-84 L-20,-26 M78,-84 L20,-26', stroke: '#B79BFF', 'stroke-width': 7, 'stroke-linecap': 'round', opacity: 0.8 }, g);
        // shoes at the bottom ends
        [-1, 1].forEach(sd => E('ellipse', { cx: sd * 104, cy: 110, rx: 26, ry: 13, fill: '#1A1A22', stroke: SC_INK, 'stroke-width': 3 }, g));
        // gloves at the top ends
        E('circle', { cx: -96, cy: -96, r: 18, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3.5 }, g);
        // the wand (in the right glove), then that glove
        wand = G(g); tr(wand, 96, -96);
        E('path', { d: 'M0,0 L0,-96', stroke: '#14141A', 'stroke-width': 9, 'stroke-linecap': 'round' }, wand);
        E('path', { d: 'M0,-80 L0,-98', stroke: '#FFFFFF', 'stroke-width': 9, 'stroke-linecap': 'round' }, wand);
        sp = spark(wand, 11, { color: PC.gold }); tr(sp, 0, -110);
        E('circle', { cx: 96, cy: -96, r: 18, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3.5 }, g);
        // the head at the crossing
        E('circle', { cx: 0, cy: 0, r: 52, fill: ball('#FFFFFF', '#D9CCF5'), stroke: SC_INK, 'stroke-width': 5 }, g);
        // top hat
        const hat = G(g); tr(hat, 0, -50);
        E('rect', { x: -32, y: -66, width: 64, height: 62, rx: 4, fill: '#1A1A22', stroke: SC_INK, 'stroke-width': 3 }, hat);
        E('rect', { x: -32, y: -22, width: 64, height: 12, fill: '#C62828' }, hat);
        E('ellipse', { cx: 0, cy: -4, rx: 52, ry: 10, fill: '#1A1A22', stroke: SC_INK, 'stroke-width': 3 }, hat);
      },
      face: { x: 0, y: 4, eye: 12, gap: 36, mouthW: 26, mouthY: 28, lidCol: '#E6DDF7' },
      upd: (t, g, st) => {
        const k = clamp(st.wand || 0);
        tr(wand, 96, -96, 1, lerp(40, -10, k) + Math.sin(t * 9) * 6 * k);
        op(sp, k); if (k > 0.01) sp.upd(t);
      } }));
    const inner = c.firstChild, mo = G(inner); tr(mo, 0, 22);   // curly magician's moustache
    E('path', { d: 'M0,-2 C-10,-8 -24,-8 -30,0 C-36,8 -46,6 -44,-4 C-40,4 -34,4 -28,-2 C-20,-8 -8,-4 0,2 C8,-4 20,-8 28,-2 C34,4 40,4 44,-4 C46,6 36,8 30,0 C24,-8 10,-8 0,-2 Z', fill: '#1A1A22', stroke: SC_INK, 'stroke-width': 1.5 }, mo);
  } else if (kind === 'olive') {
    c = scMake(parent, Object.assign(S, { seed: 43, bob: 2, mood: o.mood || 'annoyed',
      draw: g => {
        // string loop with a little bow
        E('path', { d: 'M0,-96 C-20,-130 -50,-140 -40,-170 C-30,-196 10,-188 4,-160', fill: 'none', stroke: '#C9935A', 'stroke-width': 4 }, g);
        // the tag
        E('path', { d: 'M-84,-44 L-30,-118 L30,-118 L84,-44 L84,112 Q84,126 70,126 L-70,126 Q-84,126 -84,112 Z', fill: linGrad('#FFF8E6', '#F2E2BC', true), stroke: SC_INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, g);
        E('circle', { cx: 0, cy: -96, r: 10, fill: '#5A4A3A', stroke: SC_INK, 'stroke-width': 3 }, g);
        // pearls
        let d = '';
        for (let i = 0; i < 9; i++) { const a = Math.PI * (0.18 + 0.64 * i / 8), x = -Math.cos(a) * 54, y = 22 + Math.sin(a) * 14; d += `M${(x + 6).toFixed(1)},${y.toFixed(1)} a6,6 0 1,0 -12,0 a6,6 0 1,0 12,0 `; }
        E('path', { d, fill: '#FFFFFF', stroke: '#B9A88A', 'stroke-width': 2 }, g);
        // WAS (crossed out) and 100%
        T(g, 0, 66, 'WAS', { size: 26, weight: 800, anchor: 'middle', fill: '#8A7A64' });
        E('path', { d: 'M-40,58 L40,50', stroke: PC.red, 'stroke-width': 5, 'stroke-linecap': 'round' }, g);
        T(g, 0, 110, '100%', { size: 40, weight: 800, anchor: 'middle', fill: '#2E7D4F' });
      },
      face: { x: 0, y: -40, eye: 14, gap: 44, mouthW: 28, mouthY: 30, lidCol: '#F2E2BC' },
      upd: (t, g, st) => { const k = clamp(st.huff || 0); if (k > 0) g.setAttribute('transform', (g.getAttribute('transform') || '') + ` rotate(${(-12 * k).toFixed(1)} 0 120)`); } }));
    const inner = c.firstChild, gl = G(inner); tr(gl, 0, -40);   // red cat-eye glasses
    [-1, 1].forEach(sd => E('path', { d: `M${sd * 4},-4 Q${sd * 10},-20 ${sd * 30},-18 Q${sd * 44},-20 ${sd * 46},-30 Q${sd * 44},-4 ${sd * 38},6 Q${sd * 22},18 ${sd * 8},6 Z`, fill: 'rgba(255,255,255,0.15)', stroke: '#C62828', 'stroke-width': 4, 'stroke-linejoin': 'round' }, gl));
    E('path', { d: 'M-6,-6 Q0,-10 6,-6', fill: 'none', stroke: '#C62828', 'stroke-width': 4 }, gl);
  } else if (kind === 'snowy') {
    c = scMake(parent, Object.assign(S, { seed: 47, bob: 4, mood: o.mood || 'happy',
      draw: g => {
        E('circle', { cx: 0, cy: 14, r: 100, fill: ball('#FFFFFF', PC.iceDk), stroke: SC_INK, 'stroke-width': 5 }, g);
        // coins rolled into him
        [[-64, 54, -20], [56, 72, 15], [-20, 96, 5], [74, -10, 30]].forEach(([x, y, r]) => {
          const cn = G(g); tr(cn, x, y, 1, r);
          E('ellipse', { rx: 17, ry: 15, fill: ball(PC.gold, PC.goldDk), stroke: SC_INK, 'stroke-width': 2.5 }, cn);
          T(cn, 0, 8, '$', { size: 20, weight: 800, anchor: 'middle', fill: '#8A5A08' });
        });
        // scarf
        E('path', { d: 'M-84,-30 Q0,0 84,-30 L88,-12 Q0,22 -88,-12 Z', fill: '#D32F2F', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
        E('path', { d: 'M40,-8 L62,60 L84,54 L66,-14 Z', fill: '#D32F2F', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
        E('path', { d: 'M50,22 L72,16 M56,40 L78,34', stroke: '#FFFFFF', 'stroke-width': 4 }, g);
        // woolly hat with a % bobble
        const hat = G(g); tr(hat, 0, -78);
        E('path', { d: 'M-62,6 Q-60,-50 0,-56 Q60,-50 62,6 Z', fill: '#2E7DD8', stroke: SC_INK, 'stroke-width': 4 }, hat);
        E('rect', { x: -66, y: -6, width: 132, height: 20, rx: 8, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, hat);
        E('circle', { cx: 0, cy: -64, r: 20, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, hat);
        T(hat, 0, -55, '%', { size: 26, weight: 800, anchor: 'middle', fill: PC.red });
      },
      face: { x: 0, y: -24, eye: 15, gap: 50, mouthW: 34, mouthY: 44, lidCol: '#DCEBF7' } }));
    const inner = c.firstChild, nose = G(inner); tr(nose, 0, -4);   // carrot nose, in front of the face
    E('path', { d: 'M-4,-8 L40,2 L-4,10 Z', fill: '#FF8A3D', stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, nose);
  } else {
    c = scKavya(parent, o);
  }
  return c;
}

/* ---------- sets ---------- */
function pcBanner(parent, text, o) {
  o = o || {};
  const w = o.w || 380, h = o.h || 150, g = G(parent), sw = G(g), col = o.col || PC.red;
  E('line', { x1: -w / 2 - 20, y1: -h / 2, x2: w / 2 + 20, y2: -h / 2, stroke: '#8F9CAB', 'stroke-width': 8, 'stroke-linecap': 'round' }, g);
  E('path', { d: `M${-w / 2},${-h / 2} L${w / 2},${-h / 2} L${w / 2},${h / 2 - 14} L${w / 4},${h / 2} L0,${h / 2 - 14} L${-w / 4},${h / 2} L${-w / 2},${h / 2 - 14} Z`, fill: col, stroke: scShade(col, -0.4), 'stroke-width': 4, 'stroke-linejoin': 'round' }, sw);
  E('rect', { x: -w / 2 + 10, y: -h / 2 + 10, width: w - 20, height: h - 34, rx: 6, fill: 'none', stroke: '#FFE45C', 'stroke-width': 3, opacity: 0.8 }, sw);
  const tx = mkText(sw, 0, 0, text, { size: o.size || 54, anchor: 'middle', fill: o.ink || '#FFFFFF', boldFill: '#FFE45C', weight: 800 });
  tr(tx, 0, -tx.top - tx.h / 2 - 8);
  g.set = deg => sw.setAttribute('transform', `rotate(${(deg || 0).toFixed(2)} 0 ${-h / 2})`);
  g.text = tx;
  return g;
}

function pcMall(parent) {
  const g = G(parent);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#FFF3DF', '#F4E3C6', true) }, g);
  // glass roof
  E('rect', { x: 0, y: 0, width: 1200, height: 120, fill: linGrad('#9FD8FF', '#D8F0FF', true) }, g);
  let beams = '';
  for (let x = 0; x <= 1200; x += 100) beams += `M${x},0 L${600 + (x - 600) * 0.8},120 `;
  E('path', { d: beams + 'M0,60 L1200,60 M0,120 L1200,120', stroke: '#8FA3B8', 'stroke-width': 5 }, g);
  // upper floor: shop fronts
  const up = [['TOYS', '#2FA36B'], ['BUBBLE TEA', '#8E44AD'], ['PHONES', '#2E7DD8'], ['SPORTS', '#E67E22']];
  up.forEach(([n, col], i) => {
    const x = 20 + i * 295;
    E('rect', { x, y: 128, width: 275, height: 92, fill: '#FFFDF6', stroke: '#C9B48A', 'stroke-width': 3 }, g);
    E('rect', { x, y: 128, width: 275, height: 30, fill: col }, g);
    T(g, x + 137, 152, n, { size: 22, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  });
  // balcony slab and glass railing
  E('rect', { x: 0, y: 262, width: 1200, height: 26, fill: '#D9CDB4', stroke: '#9C8A6A', 'stroke-width': 3 }, g);
  E('rect', { x: 0, y: 220, width: 1200, height: 42, fill: 'rgba(170,220,255,0.35)', stroke: '#8FA3B8', 'stroke-width': 3 }, g);
  // the big banner across the balcony
  const bn = G(g); tr(bn, 600, 224);
  E('rect', { x: -360, y: -38, width: 720, height: 76, rx: 8, fill: PC.red, stroke: PC.redDk, 'stroke-width': 4 }, bn);
  T(bn, 0, 14, 'GREAT SINGAPORE SALE', { size: 42, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 3 });
  g.banner = [600, 224];
  // mall name
  T(g, 1180, 108, 'PLAZA SERATUS', { size: 30, weight: 800, anchor: 'end', fill: '#1E3A5A', ls: 2 });
  // ground floor shop fronts with posters
  const low = [['SHOES', '#C0392B', '15% OFF'], ['BOOKS', '#2E7D4F', 'SALE'], ['TECH', '#2E5AAC', '20% OFF'], ['FASHION', '#8E44AD', '20% OFF']];
  g.fronts = [];
  low.forEach(([n, col, p], i) => {
    const x = 30 + i * 230, y = 330, w = 210;
    E('rect', { x, y, width: w, height: 250, fill: '#FFFFFF', stroke: '#9C8A6A', 'stroke-width': 4 }, g);
    E('rect', { x, y, width: w, height: 48, fill: col }, g);
    T(g, x + w / 2, y + 34, n, { size: 28, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
    E('rect', { x: x + 14, y: y + 62, width: w - 28, height: 176, fill: 'rgba(160,210,240,0.35)', stroke: '#8FA3B8', 'stroke-width': 3 }, g);
    E('rect', { x: x + 40, y: y + 100, width: w - 80, height: 70, rx: 8, fill: '#FFE45C', stroke: PC.red, 'stroke-width': 4 }, g);
    T(g, x + w / 2, y + 146, p, { size: 28, weight: 800, anchor: 'middle', fill: PC.red });
    g.fronts.push([x + w / 2, y + 125]);
  });
  // escalator
  E('path', { d: 'M960,600 L1150,300 L1200,300 L1200,330 L1010,630 Z', fill: '#B9C4CE', stroke: '#5A6670', 'stroke-width': 4 }, g);
  E('path', { d: 'M950,560 L1150,262', stroke: '#2A3A4A', 'stroke-width': 8, 'stroke-linecap': 'round' }, g);
  // floor
  E('rect', { x: 0, y: 580, width: 1200, height: 170, fill: linGrad('#E8DCC8', '#D4C4A8', true) }, g);
  let tiles = '';
  for (let x = -600; x <= 1800; x += 120) tiles += `M${x},750 L${600 + (x - 600) * 0.35},580 `;
  E('path', { d: tiles + 'M0,630 L1200,630 M0,690 L1200,690', stroke: '#C2B092', 'stroke-width': 2 }, g);
  // two hanging sale banners
  const hangs = [[150, 'SALE', '%'], [1050, 'UP TO', '70%']].map(([x, a, b], i) => {
    const h = G(g); tr(h, x, 300);
    E('line', { x1: 0, y1: -180, x2: 0, y2: -60, stroke: '#8F9CAB', 'stroke-width': 3 }, h);
    const cl = G(h);
    E('path', { d: 'M-70,-60 L70,-60 L70,60 L0,84 L-70,60 Z', fill: i ? PC.gold : PC.red, stroke: i ? PC.goldDk : PC.redDk, 'stroke-width': 4, 'stroke-linejoin': 'round' }, cl);
    T(cl, 0, -18, a, { size: 28, weight: 800, anchor: 'middle', fill: i ? PC.red : '#FFFFFF' });
    T(cl, 0, 42, b, { size: i ? 44 : 64, weight: 800, anchor: 'middle', fill: i ? PC.red : '#FFE45C' });
    return cl;
  });
  g.pct = [150, 300 + 22];
  g.upd = t => hangs.forEach((h, i) => tr(h, 0, 0, 1, Math.sin(t * 1.3 + i * 2) * 2.5));
  return g;
}

function pcShopfronts(parent, posters, o) {
  o = o || {};
  posters = posters || ['{{5/8}} OFF', '0.6 OFF', '62% OFF'];
  const names = o.names || ['KICKS & CO.', 'SHOE WORLD', 'SOLE MATES'], cols = o.cols || ['#2E7D4F', '#2E5AAC', '#C0392B'];
  const g = G(parent);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#F4E6CC', '#E9D6B4', true) }, g);
  E('rect', { x: 0, y: 0, width: 1200, height: 104, fill: '#D9CDB4' }, g);
  E('rect', { x: 0, y: 600, width: 1200, height: 150, fill: linGrad('#E8DCC8', '#D4C4A8', true) }, g);
  g.posters = []; g.cx = []; g.hls = [];
  [[40, 380], [430, 770], [820, 1160]].forEach(([x0, x1], i) => {
    const w = x1 - x0, cx = (x0 + x1) / 2;
    E('rect', { x: x0, y: 112, width: w, height: 70, rx: 6, fill: cols[i], stroke: scShade(cols[i], -0.4), 'stroke-width': 4 }, g);
    T(g, cx, 160, names[i], { size: 32, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
    E('rect', { x: x0, y: 182, width: w, height: 418, fill: '#FFFFFF', stroke: '#9C8A6A', 'stroke-width': 4 }, g);
    E('rect', { x: x0 + 16, y: 196, width: w - 32, height: 390, fill: 'rgba(170,215,245,0.35)', stroke: '#8FA3B8', 'stroke-width': 3 }, g);
    const hl = E('rect', { x: x0 + 6, y: 186, width: w - 12, height: 410, rx: 8, fill: 'none', stroke: '#FFE45C', 'stroke-width': 12 }, g); op(hl, 0); g.hls.push(hl);
    // shoes on a shelf in the window
    E('rect', { x: x0 + 30, y: 520, width: w - 60, height: 12, fill: '#B9C4CE' }, g);
    [-80, 0, 80].forEach(dx => E('path', { d: `M${cx + dx - 30},518 Q${cx + dx - 30},492 ${cx + dx - 6},494 Q${cx + dx + 4},506 ${cx + dx + 30},508 Q${cx + dx + 36},518 ${cx + dx + 30},518 Z`, fill: ['#2A2A2A', '#F4F7FA', '#E8424F'][(i + dx / 80 + 3) % 3], stroke: SC_INK, 'stroke-width': 3 }, g));
    // the poster
    const p = G(g);
    E('rect', { x: cx - 140, y: 240, width: 280, height: 200, rx: 14, fill: '#FFE45C', stroke: PC.red, 'stroke-width': 7 }, p);
    const tx = mkText(p, cx, 0, posters[i], { size: 62, anchor: 'middle', fill: PC.red, weight: 800 });
    tr(tx, 0, 340 - tx.top - tx.h / 2);
    g.posters.push(p); g.cx.push(cx);
  });
  g.hl = (i, p) => { if (g.hls[i]) op(g.hls[i], p); };
  return g;
}

function pcShelfItems(g, kind, x0, x1, y) {
  // one shelf's worth of merchandise standing on y, between x0 and x1
  const r = rng(Math.round(x0 + y));
  if (kind === 'shoes') {
    for (let x = x0 + 30; x < x1 - 40; x += 92) {
      const col = ['#2A2A2A', '#F4F7FA', '#E8424F', '#2E7DD8'][Math.floor(r() * 4)];
      E('path', { d: `M${x},${y} Q${x},${y - 30} ${x + 26},${y - 28} Q${x + 36},${y - 14} ${x + 66},${y - 10} Q${x + 72},${y} ${x + 66},${y} Z`, fill: col, stroke: SC_INK, 'stroke-width': 3 }, g);
    }
  } else if (kind === 'books') {
    for (let x = x0 + 10; x < x1 - 24;) {
      const w = 18 + r() * 16, h = 60 + r() * 34, col = ['#C0392B', '#2E7D4F', '#2E5AAC', '#E67E22', '#8E44AD', '#16A085'][Math.floor(r() * 6)];
      E('rect', { x, y: y - h, width: w, height: h, fill: col, stroke: SC_INK, 'stroke-width': 2 }, g);
      x += w + 2;
    }
  } else if (kind === 'tech') {
    for (let x = x0 + 40; x < x1 - 90; x += 150) {
      if (r() < 0.5) {   // a small TV
        E('rect', { x, y: y - 74, width: 110, height: 66, rx: 6, fill: '#26323C', stroke: SC_INK, 'stroke-width': 3 }, g);
        E('rect', { x: x + 8, y: y - 66, width: 94, height: 50, fill: '#4CC9F0', opacity: 0.6 }, g);
        E('rect', { x: x + 45, y: y - 8, width: 20, height: 8, fill: '#26323C' }, g);
      } else {             // a microwave
        E('rect', { x, y: y - 60, width: 110, height: 60, rx: 6, fill: '#E6EBEF', stroke: SC_INK, 'stroke-width': 3 }, g);
        E('rect', { x: x + 10, y: y - 50, width: 66, height: 40, rx: 4, fill: '#3A4A58' }, g);
      }
    }
  }
}

function pcShop(parent, o) {
  o = o || {};
  const kind = o.kind || 'shoes', name = o.name || 'SHOES', col = o.col || '#C0392B';
  const wall = { shoes: '#FDEDEC', books: '#EEF6EE', tech: '#EAF1FA', clothes: '#F5EEF9', bank: '#EEF2F6' }[kind] || '#F4F4F4';
  const g = G(parent), back = G(g);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#3A3530', '#57504A', true) }, back);   // the mall beyond
  E('rect', { x: 120, y: 176, width: 960, height: 360, fill: wall }, back);
  // posts and the sign band
  E('rect', { x: 100, y: 96, width: 24, height: 600, fill: '#8F9CAB', stroke: '#5A6670', 'stroke-width': 3 }, back);
  E('rect', { x: 1076, y: 96, width: 24, height: 600, fill: '#8F9CAB', stroke: '#5A6670', 'stroke-width': 3 }, back);
  E('rect', { x: 100, y: 104, width: 1000, height: 74, fill: linGrad(scShade(col, 0.1), scShade(col, -0.15), true), stroke: scShade(col, -0.5), 'stroke-width': 4 }, back);
  const sg = T(back, 600, 156, name, { size: 50, weight: 800, anchor: 'middle', fill: '#FFFFFF', ls: 3 });
  sg.setAttribute('stroke', scShade(col, -0.5)); sg.setAttribute('stroke-width', 6); sg.setAttribute('paint-order', 'stroke');
  T(back, 1060, 168, 'Plaza Seratus', { size: 22, weight: 700, anchor: 'end', fill: '#FFFFFF', font: FB });
  // merchandise
  if (kind === 'clothes') {
    E('line', { x1: 160, y1: 230, x2: 760, y2: 230, stroke: '#8F9CAB', 'stroke-width': 8, 'stroke-linecap': 'round' }, back);
    const cc = ['#2E5AAC', '#E67E22', '#16A085', '#C0392B', '#8E44AD', '#F1C40F', '#34495E'];
    for (let i = 0; i < 7; i++) {
      const x = 200 + i * 84;
      E('path', { d: `M${x},230 L${x},240 M${x - 34},262 L${x},244 L${x + 34},262 L${x + 30},360 L${x - 30},360 Z`, fill: cc[i], stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, back);
    }
  } else if (kind === 'bank') {
    const bd = G(back); tr(bd, 400, 200); g.board = bd;
    E('rect', { x: -230, y: 0, width: 460, height: 250, rx: 12, fill: '#1E3A5A', stroke: '#0E1E30', 'stroke-width': 5 }, bd);
    T(bd, 0, 46, 'SAVINGS RATES', { size: 32, weight: 800, anchor: 'middle', fill: '#FFE45C' });
    [['Simple', '3% p.a.'], ['Compound', '10% p.a.'], ['Junior saver', '2% p.a.']].forEach(([a, b], i) => {
      T(bd, -200, 104 + i * 50, a, { size: 28, weight: 700, fill: '#FFFFFF' });
      T(bd, 200, 104 + i * 50, b, { size: 28, weight: 800, anchor: 'end', fill: '#7EE08A' });
    });
    // a queue-number sign and a plant
    E('rect', { x: 760, y: 210, width: 150, height: 80, rx: 10, fill: '#26323C', stroke: SC_INK, 'stroke-width': 3 }, back);
    T(back, 835, 266, '0100', { size: 40, weight: 800, anchor: 'middle', fill: '#FF5F5F' });
  } else {
    [300, 420].forEach(y => {
      E('rect', { x: 150, y, width: 640, height: 14, fill: '#9C6B3E', stroke: '#6B4423', 'stroke-width': 3 }, back);
      pcShelfItems(back, kind, 150, 790, y);
    });
  }
  g.poster = null;
  if (o.poster !== null) {
    const p = G(back); tr(p, 935, 300);
    E('rect', { x: -125, y: -95, width: 250, height: 190, rx: 14, fill: '#FFE45C', stroke: PC.red, 'stroke-width': 7 }, p);
    const tx = mkText(p, 0, 0, o.poster || '**SALE**', { size: 46, anchor: 'middle', fill: PC.red, weight: 800, boldFill: PC.red });
    tr(tx, 0, -tx.top - tx.h / 2);
    g.poster = p;
  }
  g.mid = G(g);
  const front = G(g);
  E('rect', { x: 90, y: 520, width: 1020, height: 26, rx: 6, fill: '#F4F7FA', stroke: '#7D8A96', 'stroke-width': 4 }, front);
  E('rect', { x: 110, y: 546, width: 980, height: 204, fill: linGrad(scShade(col, 0.55), scShade(col, 0.25), true), stroke: '#5A6670', 'stroke-width': 4 }, front);
  E('rect', { x: 110, y: 600, width: 980, height: 16, fill: col, opacity: 0.8 }, front);
  g.front = front;
  g.top = G(g);
  g.counterY = 530;
  g.upd = () => {};
  return g;
}

function pcFoodCourt(parent) {
  const g = G(parent), back = G(g);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#F7E9D2', '#EBD8B8', true) }, back);
  E('rect', { x: 0, y: 0, width: 1200, height: 96, fill: '#D9CDB4' }, back);
  // three stall fronts
  [['VEG RICE', '#2E7D4F', 30], ['KAYA TOAST', '#C0392B', 400], ['DRINKS', '#2E5AAC', 870]].forEach(([n, col, x], i) => {
    const w = i === 1 ? 400 : 300;
    E('rect', { x, y: 110, width: w, height: 330, fill: '#FFFDF6', stroke: '#9C8A6A', 'stroke-width': 4 }, back);
    E('rect', { x, y: 110, width: w, height: 56, fill: col }, back);
    T(back, x + w / 2, 150, n, { size: 34, weight: 800, anchor: 'middle', fill: '#FFE45C' });
    E('rect', { x: x + 10, y: 400, width: w - 20, height: 40, fill: '#B9C4CE', stroke: '#7D8A96', 'stroke-width': 3 }, back);
  });
  // the kaya toast stall's menu
  const menu = mkHawkerMenu(back, { title: 'KAYA TOAST', w: 360, size: 26, col: '#C0392B',
    items: [['Kaya toast set', '$5.00'], ['Kopi / teh', '$1.60'], ['Soft-boiled eggs', '$1.80']] });
  tr(menu, 600, 180);
  g.menu = menu;
  // veg rice trays and drinks taps
  for (let i = 0; i < 4; i++) E('rect', { x: 50 + i * 66, y: 300, width: 56, height: 40, rx: 6, fill: ['#7EE08A', '#FFC94A', '#FF8A3D', '#B9E3A0'][i], stroke: '#5A6670', 'stroke-width': 3 }, back);
  for (let i = 0; i < 3; i++) E('rect', { x: 900 + i * 86, y: 240, width: 66, height: 110, rx: 12, fill: ['#F6A3C4', '#B8E35A', '#FFC94A'][i], stroke: '#5A6670', 'stroke-width': 3, opacity: 0.9 }, back);
  const fan = G(back); tr(fan, 1100, 66);
  const bl = G(fan);
  for (let i = 0; i < 3; i++) { const b = G(bl); tr(b, 0, 0, 1, i * 120); E('path', { d: 'M0,-5 Q50,-14 78,-4 Q50,8 0,5 Z', fill: '#C9D3DC', stroke: '#5A6670', 'stroke-width': 2.5 }, b); }
  E('circle', { r: 10, fill: '#8F9CAB', stroke: '#5A6670', 'stroke-width': 3 }, fan);
  g.mid = G(g);
  const front = G(g);
  E('rect', { x: 60, y: 548, width: 1080, height: 24, rx: 10, fill: '#F4F7FA', stroke: '#7D8A96', 'stroke-width': 4 }, front);
  E('rect', { x: 80, y: 572, width: 1040, height: 178, fill: linGrad('#C9935A', '#9C6B3E', true), stroke: '#6B4423', 'stroke-width': 4 }, front);
  g.front = front;
  g.top = G(g);
  g.tableY = 560;
  g.upd = t => bl.setAttribute('transform', `scale(1 0.3) rotate(${((t * 300) % 360).toFixed(1)})`);
  g.upd(0);
  return g;
}

function pcCarPark(parent) {
  const g = G(parent);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#5A6070', '#7A808E', true) }, g);
  E('rect', { x: 0, y: 0, width: 1200, height: 80, fill: '#3E4350' }, g);
  [[60, 120], [1000, 120]].forEach(([x, w]) => {
    E('rect', { x, y: 80, width: w, height: 560, fill: '#B9BEC6', stroke: '#6E7480', 'stroke-width': 4 }, g);
    E('rect', { x, y: 560, width: w, height: 80, fill: '#FFC93C' }, g);
  });
  const lv = G(g); tr(lv, 1060, 220);
  E('rect', { x: -50, y: -40, width: 100, height: 80, rx: 10, fill: '#2E7DD8', stroke: '#FFFFFF', 'stroke-width': 4 }, lv);
  T(lv, 0, 16, 'B2', { size: 46, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  E('rect', { x: 0, y: 600, width: 1200, height: 150, fill: '#4A4F5A' }, g);
  E('path', { d: 'M300,640 L300,750 M900,640 L900,750', stroke: '#FFFFFF', 'stroke-width': 8 }, g);
  // the family car, side on, boot open
  const car = G(g); tr(car, 600, 560);
  E('path', { d: 'M-300,40 L-300,-40 Q-290,-70 -230,-80 L-140,-150 L120,-150 L190,-80 L300,-70 Q320,-60 320,-20 L320,40 Z', fill: '#C0392B', stroke: SC_INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, car);
  E('path', { d: 'M-126,-136 L-10,-136 L-10,-84 L-200,-84 Z M10,-136 L110,-136 L160,-84 L10,-84 Z', fill: '#AEE3FF', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, car);
  E('path', { d: 'M300,-70 L380,-190 L400,-176 L330,-60 Z', fill: '#A93226', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, car);   // the open boot lid
  [-190, 200].forEach(x => { E('circle', { cx: x, cy: 40, r: 52, fill: '#26262E', stroke: SC_INK, 'stroke-width': 4 }, car); E('circle', { cx: x, cy: 40, r: 22, fill: '#B9BEC6' }, car); });
  const bags = [['#E8424F', -20], ['#2E7DD8', 6], ['#FFC93C', 28], ['#8E44AD', -10], ['#2FA36B', 14]];
  bags.forEach(([col, r], i) => { const b = pcBag(car, { col, s: 0.55, label: '' }); tr(b, 220 + i * 26, -66 - (i % 2) * 18, 0.55, r); });
  g.boot = [860, 480];
  return g;
}

/* ---------- props ---------- */
function pcStamp(parent, ok) { return mkStamp(parent, ok ? '100% CORRECT' : 'WRONG WHOLE!', ok ? '#1E9E5A' : '#D32F2F'); }

function pcBag(parent, o) {
  o = o || {};
  const g = G(parent), col = o.col || PC.red;
  E('path', { d: 'M-30,-110 Q-30,-150 0,-150 Q30,-150 30,-110', fill: 'none', stroke: SC_INK, 'stroke-width': 6 }, g);
  E('path', { d: 'M-56,-112 L56,-112 L50,0 L-50,0 Z', fill: col, stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
  E('path', { d: 'M-56,-112 L56,-112 L54,-96 L-54,-96 Z', fill: scShade(col, -0.25) }, g);
  if (o.label !== '') T(g, 0, -40, o.label || 'SALE', { size: 28, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  if (o.s && o.s !== 1) tr(g, 0, 0, o.s);
  return g;
}

function pcTagOn(g, o, x, y) { g.tag = null; if (o.price) { g.tag = mkPriceTag(g, o.price, { size: 32, old: o.old }); tr(g.tag, x, y); } }

function pcShoes(parent, o) {
  o = o || {};
  const g = G(parent), in_ = G(g); tr(in_, 0, 0, o.s || 1);
  E('rect', { x: -110, y: -60, width: 220, height: 60, rx: 4, fill: '#E67E22', stroke: SC_INK, 'stroke-width': 4 }, in_);
  E('rect', { x: -110, y: -60, width: 220, height: 14, fill: '#C0392B' }, in_);
  [-50, 50].forEach(x => {
    E('path', { d: `M${x - 52},-60 Q${x - 52},-112 ${x - 10},-110 Q${x + 4},-86 ${x + 48},-80 Q${x + 58},-60 ${x + 48},-60 Z`, fill: '#1E1E24', stroke: SC_INK, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, in_);
    E('path', { d: `M${x - 26},-100 L${x - 6},-90 M${x - 20},-108 L${x},-98`, stroke: '#FFFFFF', 'stroke-width': 3 }, in_);
  });
  pcTagOn(g, o, 90 * (o.s || 1), -100 * (o.s || 1));
  return g;
}

function pcRiceCooker(parent, o) {
  o = o || {};
  const g = G(parent), in_ = G(g); tr(in_, 0, 0, o.s || 1);
  E('path', { d: 'M-80,-110 Q-86,0 -66,0 L66,0 Q86,0 80,-110 Z', fill: '#F4F7FA', stroke: SC_INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, in_);
  E('path', { d: 'M-86,-110 Q0,-170 86,-110 Z', fill: '#E6EBEF', stroke: SC_INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, in_);
  E('rect', { x: -18, y: -150, width: 36, height: 14, rx: 6, fill: '#5A6670', stroke: SC_INK, 'stroke-width': 3 }, in_);
  E('path', { d: 'M-80,-70 L80,-70', stroke: '#E8679A', 'stroke-width': 10 }, in_);
  E('rect', { x: -30, y: -50, width: 60, height: 30, rx: 6, fill: '#26323C' }, in_);
  E('circle', { cx: 14, cy: -35, r: 5, fill: '#7EE08A' }, in_);
  pcTagOn(g, o, 70 * (o.s || 1), -130 * (o.s || 1));
  return g;
}

function pcKettle(parent, o) {
  o = o || {};
  const g = G(parent), in_ = G(g); tr(in_, 0, 0, o.s || 1);
  E('rect', { x: -66, y: -12, width: 132, height: 12, rx: 5, fill: '#26323C' }, in_);
  E('path', { d: 'M-50,-12 L-40,-130 L40,-130 L50,-12 Z', fill: linGrad('#E6EBEF', '#AEB8C2', false), stroke: SC_INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, in_);
  E('path', { d: 'M44,-110 Q90,-100 84,-50 Q80,-26 48,-30', fill: 'none', stroke: SC_INK, 'stroke-width': 10, 'stroke-linecap': 'round' }, in_);
  E('path', { d: 'M-44,-110 L-74,-128 L-70,-118 L-42,-96', fill: '#C9D3DC', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, in_);
  E('rect', { x: -34, y: -142, width: 68, height: 14, rx: 6, fill: '#26323C' }, in_);
  pcTagOn(g, o, 60 * (o.s || 1), -120 * (o.s || 1));
  return g;
}

function pcJacket(parent, o) {
  o = o || {};
  const g = G(parent), in_ = G(g), col = o.col || '#2E5AAC';
  tr(in_, 0, 0, o.s || 1);
  E('path', { d: 'M0,0 Q14,0 14,14 Q14,26 0,30 L-70,60 L70,60 L0,30', fill: 'none', stroke: '#8F9CAB', 'stroke-width': 5, 'stroke-linejoin': 'round' }, in_);
  E('path', { d: 'M-70,60 L-120,90 L-140,240 L-104,246 L-90,130 L-86,250 L86,250 L90,130 L104,246 L140,240 L120,90 L70,60 L22,60 L0,120 L-22,60 Z', fill: col, stroke: SC_INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, in_);
  E('path', { d: 'M0,120 L0,250', stroke: SC_INK, 'stroke-width': 3 }, in_);
  [150, 190, 230].forEach(y => E('circle', { cx: 10, cy: y, r: 5, fill: PC.gold, stroke: SC_INK, 'stroke-width': 2 }, in_));
  E('path', { d: 'M-22,60 L0,120 L-30,96 Z M22,60 L0,120 L30,96 Z', fill: scShade(col, -0.25), stroke: SC_INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, in_);
  pcTagOn(g, o, 96 * (o.s || 1), 110 * (o.s || 1));
  return g;
}

function pcToast(parent, o) {
  o = o || {};
  const g = G(parent), in_ = G(g); tr(in_, 0, 0, o.s || 1);
  E('rect', { x: -130, y: -10, width: 260, height: 26, rx: 10, fill: '#C0392B', stroke: SC_INK, 'stroke-width': 4 }, in_);
  [[-100, -10], [-56, -14]].forEach(([x, r]) => {
    const t = G(in_); tr(t, x, -10, 1, r);
    E('path', { d: 'M-34,0 L0,-62 L34,0 Z', fill: '#E8B96A', stroke: '#8A5A20', 'stroke-width': 5, 'stroke-linejoin': 'round' }, t);
    E('path', { d: 'M-24,-6 L0,-48 L24,-6 Z', fill: '#B8D86A', opacity: 0.85 }, t);   // kaya
  });
  E('ellipse', { cx: 30, cy: -16, rx: 30, ry: 10, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 3 }, in_);
  E('circle', { cx: 30, cy: -18, r: 9, fill: '#FFB020' }, in_);
  E('path', { d: 'M76,-10 L72,-70 L118,-70 L114,-10 Z', fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, in_);
  E('ellipse', { cx: 95, cy: -70, rx: 23, ry: 6, fill: '#7A4A2E', stroke: SC_INK, 'stroke-width': 3 }, in_);
  return g;
}

function pcAngBao(parent, o) {
  o = o || {};
  const g = G(parent), in_ = G(g); tr(in_, 0, 0, o.s || 1);
  E('rect', { x: -45, y: -70, width: 90, height: 140, rx: 8, fill: '#D32F2F', stroke: SC_INK, 'stroke-width': 4 }, in_);
  E('path', { d: 'M-45,-40 Q0,-10 45,-40', fill: 'none', stroke: PC.gold, 'stroke-width': 4 }, in_);
  E('circle', { cx: 0, cy: 18, r: 24, fill: 'none', stroke: PC.gold, 'stroke-width': 5 }, in_);
  E('rect', { x: -8, y: 10, width: 16, height: 16, fill: 'none', stroke: PC.gold, 'stroke-width': 4 }, in_);
  return g;
}

function pcCoins(parent, n, o) {
  o = o || {};
  const g = G(parent), in_ = G(g); tr(in_, 0, 0, o.s || 1);
  const coins = [];
  for (let i = 0; i < Math.min(n, 12); i++) {
    const cg = G(in_); tr(cg, (i % 2 ? 3 : -3), -12 - i * 16);
    E('ellipse', { rx: 40, ry: 12, fill: PC.goldDk, stroke: SC_INK, 'stroke-width': 3 }, cg);
    E('ellipse', { cy: -6, rx: 40, ry: 12, fill: ball(PC.gold, PC.goldDk), stroke: SC_INK, 'stroke-width': 3 }, cg);
    coins.push(cg);
  }
  if (o.label) T(in_, 0, 40, o.label, { size: 28, weight: 800, anchor: 'middle', fill: o.labelCol || '#FFFFFF' });
  g.set = k => coins.forEach((c, i) => op(c, clamp(k - i)));
  g.set(n);
  return g;
}

function pcPhone(parent, headline, o) {
  o = o || {};
  const g = G(parent), in_ = G(g); tr(in_, 0, 0, o.s || 1);
  E('rect', { x: -150, y: -260, width: 300, height: 520, rx: 36, fill: '#1A1E24', stroke: SC_INK, 'stroke-width': 5 }, in_);
  E('rect', { x: -132, y: -226, width: 264, height: 452, rx: 12, fill: '#FFFFFF' }, in_);
  E('rect', { x: -132, y: -226, width: 264, height: 56, rx: 12, fill: PC.red }, in_);
  T(in_, 0, -188, o.title || 'NEWS', { size: 30, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
  const tx = mkText(in_, 0, 0, headline, { size: 36, anchor: 'middle', fill: MK.ink, weight: 800, lh: 6 });
  tr(tx, 0, -70 - tx.top);
  E('rect', { x: -110, y: 70, width: 220, height: 120, rx: 10, fill: '#BFE3C8' }, in_);
  // a little otter-ish silhouette on the photo
  E('ellipse', { cx: 0, cy: 150, rx: 60, ry: 22, fill: '#7A5236' }, in_);
  E('circle', { cx: 52, cy: 128, r: 18, fill: '#7A5236' }, in_);
  g.text = tx;
  return g;
}
