/* Sitcom kit: shared by every Claude Sitcom episode (bundled when a script's META has "kit": "sitcom").
   An episode's own lib.js builds its cast with scMake and adds its own sets and props.

   Speech
     scWho(S, t)               the `who` of the line being spoken at chapter-local t ('' between lines)
     scTalk(S, t, who)         mouth openness 0..1 while `who` speaks (syllable flaps), else 0
   Characters
     scMake(parent, o)         a character: o.draw(g) draws the body (origin = centre, about 200 px tall);
                               o.face = { x, y, eye, gap, mouthW, mouthY, lidCol, iris, brow }; o.faceB for a second face;
                               o.sweat = [[x, y], ...]; o.bob (px); o.seed; o.s (scale); o.mood (default mood); o.upd(t, g)
                               returns g with g.set({ t, talk, mood, look, talkB, moodB, lookB, sweat, still })
                               moods: neutral | happy | smug | annoyed | sad | shock | deadpan
     scKavya(parent, o)        Kavya, 12, the recurring human (head and shoulders, PE shirt "8"); same g.set
     scKavyaBody(parent)       Kavya full body (kit person + ponytail), feet at (0,0); g.pose(runPose(t)) etc.
   Humans (same art style and face kit as Kavya)
     scHuman(parent, o)        a human bust (head and shoulders), centred like scKavya: the bottom of the shirt is at
                               y = 140 for every age, so busts of different ages share a baseline. Same
                               g.set({ t, talk, mood, look, sweat, still }) plus lift (0..1 raises the hand and its prop).
                               o: age 'child' | 'teen' | 'adult' (default) | 'senior' (proportions; seniors get silver
                                    hair and laugh lines unless hairCol is given)
                                  skin (a colour; SC_SKIN.porcelain fair light golden tan medium brown deep rich)
                                  hair 'short' | 'side-part' | 'buzz' | 'bald' | 'bob' | 'long' | 'ponytail' | 'bun' |
                                    'curly' | 'tudung' (headscarf: draped, frames the face); hairCol (SC_HAIR.* or any)
                                  style 'tee' | 'collared' | 'blouse' | 'kurta' | 'apron' | 'uniform' (white school shirt,
                                    badge) | 'office' (shirt and tie); shirt (colour), tie, trim (blouse/kurta), badge,
                                    logo / logoCol (tee), apron / apronText / under (apron over 'blouse' or 'tee')
                                  frame 'narrow' | 'broad'; glasses (true or colour), frames 'round' | 'rect';
                                  beard 'stubble' | 'full' | 'goatee', moustache, beardCol; earrings (true or colour),
                                    hoops; bindi (true or colour); band (headband colour); clip (hair-clip colour); blush
                                  prop 'marker' | 'pointer' | 'pencil' | 'mug' | 'kopi' | 'phone' | 'book' | 'calculator' |
                                    'ladle' | 'spatula' | 'paper' | 'tablet' (in a raised hand), propCol; hand (a hand with
                                    no prop); side 'left' (default, the character's right hand) | 'right'
                                  s, mood, seed, bob, iris
                               returns g; g.hand = the hand's prop group (draw your own prop in it, grip at 0,0);
                               g.head = [x, y] head centre; g.top = y just above the hair
     scHumanBody(parent, o)    full body, feet at (0,0), about 190 px tall for a teen (child 0.74, adult 1.1); the same
                               pose API as kit person(): g.pose({ lean, armL, armR, legL, legR }), so runPose(t) and
                               walkPose(t) work. o: the scHuman looks (age, skin, hair, hairCol, shirt, style, tie,
                               glasses, moustache) plus bottoms 'shorts' | 'trousers' | 'skirt' | 'dress', bottomCol, shoes,
                               apron, sleeves 'long'. g.height
     SC_HUMANS                 the recurring humans (each has name and role for scLowerThird):
                                 mum   MUM, Kavya's mum: Indian, adult, bun, magenta kurta, gold earrings, bindi
                                 dad   DAD, Kavya's dad: Indian, adult, side parting, rectangular glasses, moustache, polo
                                 boy   AH BOY, Kavya's brother, 8: child, short hair, orange star tee
                                 priya PRIYA, best friend, 12: Chinese-Indian, bob with a hair clip, school uniform
                                 tan   MR TAN, maths teacher: Chinese, 40s, glasses, shirt and tie
                                 rose  AUNTIE ROSE, hawker stall: Peranakan auntie, 60s, permed curls, floral blouse, apron
     scCastHuman(parent, key, o)  builds SC_HUMANS[key] (o overrides any option; o.body = true for the full body);
                               g.who, g.name, g.role
     SC_SKIN, SC_HAIR, SC_AGE  palettes and proportions; scShade(hex, k) lightens (k > 0) / darkens (k < 0) a colour
   Shots and sets
     scConfessional(parent, a, b)  full-stage talking-head background in colours a (top) and b (bottom), REC mark; g.set(p, t)
     scLowerThird(parent, name, role)  name strap bottom left; g.set(p)
     scVideoCall(parent, w, h, label)  call window; put a character in g.screen
     scTrack(parent), scBlood(parent)  Sports Day track (g.upd(t, speed)), a blood vessel (g.upd(t))
     scClipboard(parent, s)
*/
function scWho(S, t) {
  const c = S.ch;
  for (const l of c.lines) {
    const a = l.start - c.start, b = l.end - c.start;
    if (t >= a - 0.02 && t < b + 0.05) return l.who || '';
  }
  return '';
}

function scSeed(who) { let h = 7; for (const c of String(who)) h = (h * 31 + c.charCodeAt(0)) % 997; return 1 + (h % 23); }
function scTalk(S, t, who) {
  if (scWho(S, t) !== who) return 0;
  const k = scSeed(who);
  const a = Math.sin(t * TAU * (4.1 + k * 0.13) + k), b = Math.sin(t * TAU * (1.3 + k * 0.07) + k * 2);
  return clamp(0.18 + 0.82 * Math.abs(a) * (0.55 + 0.45 * b));
}

const SC_INK = '#2A1A22';
function scFace(parent, o) {
  // o: w (face width), eye (eye radius), gap (eye spacing), mouthW, mouthY, brow (bool), lidCol, iris
  const g = G(parent);
  const er = o.eye, gap = o.gap, eyes = [];
  [-1, 1].forEach(side => {
    const e = G(g); tr(e, side * gap / 2, 0);
    E('ellipse', { rx: er, ry: er * 1.12, fill: '#FFFFFF', stroke: SC_INK, 'stroke-width': Math.max(2, er * 0.12) }, e);
    const pupil = E('circle', { r: er * 0.48, fill: o.iris || SC_INK }, e);
    const shine = E('circle', { r: er * 0.16, fill: '#FFFFFF' }, e);
    const lid = E('path', { d: '', fill: o.lidCol || '#999', stroke: SC_INK, 'stroke-width': Math.max(2, er * 0.12) }, e);
    const brow = o.brow === false ? null : E('path', { d: '', fill: 'none', stroke: SC_INK, 'stroke-width': Math.max(3, er * 0.22), 'stroke-linecap': 'round' }, g);
    eyes.push({ side, e, pupil, shine, lid, brow });
  });
  const mouth = E('path', { d: '', fill: '#5A1E2A', stroke: SC_INK, 'stroke-width': Math.max(2.5, o.mouthW * 0.06), 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, g);
  const LID = { neutral: 0.08, happy: 0.12, smug: 0.42, annoyed: 0.45, sad: 0.3, shock: 0, deadpan: 0.55 };
  const SMILE = { neutral: 0.25, happy: 0.9, smug: 0.45, annoyed: -0.3, sad: -0.7, shock: 0, deadpan: 0 };
  const BROW = { neutral: [0, 0], happy: [-0.25, -0.25], smug: [0.15, -0.55], annoyed: [0.55, 0.55], sad: [-0.6, -0.6], shock: [-1, -1], deadpan: [0.15, 0.15] };
  g.set = (st) => {
    const mood = st.mood || 'neutral', talk = st.talk || 0, look = st.look || 0, blink = st.blink || 0;
    let lidF = Math.max(LID[mood] ?? 0.1, blink);
    eyes.forEach(({ side, pupil, shine, lid, brow }) => {
      const px = look * er * 0.42, py = mood === 'sad' ? er * 0.18 : 0;
      attr(pupil, 'cx', px); attr(pupil, 'cy', py); attr(shine, 'cx', px + er * 0.18); attr(shine, 'cy', py - er * 0.2);
      // lid covers the top lidF of the eye; sad lids slope down to the outside, annoyed to the inside
      // the lid is the part of the eye above a line, so it follows the eye's outline
      const ry = er * 1.12, yb = -ry + 2 * ry * Math.min(lidF, 0.98);
      const xw = er * Math.sqrt(Math.max(0, 1 - (yb / ry) * (yb / ry)));
      const tilt = mood === 'sad' ? -side * 14 : mood === 'annoyed' ? side * 12 : 0;
      if (lidF < 0.02) attr(lid, 'd', '');
      else {
        attr(lid, 'd', `M${(-xw).toFixed(1)},${yb.toFixed(1)} A${er.toFixed(1)},${ry.toFixed(1)} 0 ${yb > 0 ? 1 : 0} 1 ${xw.toFixed(1)},${yb.toFixed(1)} Z`);
        attr(lid, 'transform', tilt ? `rotate(${tilt})` : '');
      }
      if (brow) {
        const b = BROW[mood] || [0, 0], inner = side < 0 ? b[1] : b[0];
        const raise = mood === 'smug' && side > 0 ? -er * 0.5 : 0;
        const y0 = -er * 1.55 + raise, xIn = -side * er * 0.15, xOut = side * er * 1.05;
        attr(brow, 'd', `M${(side * gap / 2 + xIn).toFixed(1)},${(y0 + inner * er * 0.45).toFixed(1)} L${(side * gap / 2 + xOut).toFixed(1)},${(y0 - inner * er * 0.25).toFixed(1)}`);
      }
    });
    // mouth: a lip curve; opens into a filled shape while talking (or in shock)
    const w = o.mouthW, my = o.mouthY, k = SMILE[mood] ?? 0.2;
    const open = Math.max(talk, mood === 'shock' ? 0.85 : 0);
    const cy = my - k * w * 0.16, mid = my + k * w * 0.14;
    const sk = mood === 'smug' ? w * 0.12 : 0;   // smug: lopsided
    if (open < 0.04) {
      attr(mouth, 'd', `M${-w / 2},${cy.toFixed(1)} Q0,${mid.toFixed(1)} ${w / 2},${(cy - sk).toFixed(1)}`);
      attr(mouth, 'fill', 'none'); attr(mouth, 'stroke-width', Math.max(4, w * 0.11));
    } else {
      const ow = mood === 'shock' ? w * 0.7 : w;
      const lo = mid + open * w * 0.55;
      attr(mouth, 'd', `M${-ow / 2},${cy.toFixed(1)} Q0,${(mid - open * w * 0.08).toFixed(1)} ${ow / 2},${(cy - sk).toFixed(1)} Q0,${lo.toFixed(1)} ${-ow / 2},${cy.toFixed(1)} Z`);
      attr(mouth, 'fill', '#5A1E2A'); attr(mouth, 'stroke-width', Math.max(3, w * 0.07));
    }
  };
  return g;
}

function scBlink(t, seed) {
  const period = 3.1 + (seed % 5) * 0.37, ph = (t + seed * 0.71) % period;
  return ph < 0.13 ? 1 - Math.abs(ph - 0.065) / 0.065 : 0;
}

function scSweat(parent, pts) {
  const g = G(parent), drops = pts.map(([x, y]) => {
    const d = E('path', { d: 'M0,-12 Q9,2 0,8 Q-9,2 0,-12 Z', fill: '#BFEAFF', stroke: '#5AB4E0', 'stroke-width': 2 }, g); tr(d, x, y); return { d, x, y };
  });
  g.set = (v, t) => drops.forEach(({ d, x, y }, i) => { const f = ((t || 0) * 0.8 + i * 0.37) % 1; op(d, v * (1 - f)); tr(d, x, y + f * 26); });
  return g;
}

function scMake(parent, o) {
  const outer = G(parent), g = G(outer);
  if (o.draw) o.draw(g);
  let face = null, faceB = null, sweat = null;
  if (o.face) { face = scFace(g, o.face); tr(face, o.face.x || 0, o.face.y || 0); }
  if (o.faceB) { faceB = scFace(g, o.faceB); tr(faceB, o.faceB.x || 0, o.faceB.y || 0); }
  if (o.sweat) sweat = scSweat(g, o.sweat);
  const seed = o.seed || 3, bob = o.bob === undefined ? 4 : o.bob;
  tr(outer, 0, 0, o.s || 1);
  outer.set = (st) => {
    st = st || {};
    const t = st.t || 0, b = Math.sin(t * TAU * 0.5 + seed) * bob * (st.still ? 0 : 1);
    tr(g, 0, b);
    if (face) face.set({ mood: st.mood || o.mood || 'neutral', talk: st.talk || 0, look: st.look || 0, blink: scBlink(t, seed) });
    if (faceB) faceB.set({ mood: st.moodB || st.mood || o.mood || 'neutral', talk: st.talkB || 0, look: st.lookB ?? st.look ?? 0, blink: scBlink(t, seed + 3) });
    if (sweat) sweat.set(st.sweat || 0, t);
    if (o.upd) o.upd(t, g, st);
  };
  outer.set({});
  return outer;
}
function scKavya(parent, o) {
  o = o || {};
  return scMake(parent, { s: o.s, mood: o.mood, seed: 8, bob: 2,
    draw: g => {
    const skin = '#B9784E', hair = '#1E1410';
    E('path', { d: 'M-100,140 Q-96,62 -40,52 L40,52 Q96,62 100,140 Z', fill: '#2E7DD8', stroke: SC_INK, 'stroke-width': 4 }, g);  // PE shirt
    E('path', { d: 'M-22,52 L0,74 L22,52', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 5 }, g);
    T(g, 52, 118, '8', { size: 30, weight: 800, anchor: 'middle', fill: '#FFFFFF' });
    E('rect', { x: -18, y: 30, width: 36, height: 28, fill: skin }, g);   // neck
    E('path', { d: 'M74,-40 Q132,-10 104,60 Q96,20 70,-6 Z', fill: hair, stroke: SC_INK, 'stroke-width': 3 }, g);   // ponytail
    E('ellipse', { cx: 0, cy: -34, rx: 74, ry: 80, fill: skin, stroke: SC_INK, 'stroke-width': 4 }, g);
    E('path', { d: 'M-76,-34 Q-80,-120 0,-118 Q80,-120 76,-34 Q60,-84 8,-80 Q-30,-96 -76,-34 Z', fill: hair, stroke: SC_INK, 'stroke-width': 3 }, g);
    E('circle', { cx: 74, cy: -46, r: 8, fill: '#FF5FA2', stroke: SC_INK, 'stroke-width': 2 }, g);   // hair tie
    },
    face: { x: 0, y: -22, eye: 15, gap: 50, mouthW: 36, mouthY: 30, lidCol: '#B9784E' },
    sweat: [[-62, -78], [66, -70], [-80, -20]] });
}
function scConfessional(parent, a, b) {
  const g = G(parent);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad(a || '#14243A', b || '#25446B', true) }, g);
  const r = rng(String(a).length * 31 + 7);
  for (let i = 0; i < 9; i++) E('circle', { cx: 620 + r() * 560, cy: 60 + r() * 420, r: 30 + r() * 70, fill: '#FFFFFF', opacity: 0.04 + r() * 0.05 }, g);
  E('rect', { x: 700, y: 110, width: 330, height: 250, rx: 18, fill: '#FFFFFF', opacity: 0.06 }, g);
  E('line', { x1: 865, y1: 110, x2: 865, y2: 360, stroke: '#FFFFFF', 'stroke-width': 8, opacity: 0.06 }, g);
  const rec = G(g); tr(rec, 1080, 64);
  E('circle', { cx: -42, cy: -8, r: 9, fill: '#FF3B3B' }, rec);
  T(rec, -26, 2, 'REC', { size: 26, weight: 700, fill: '#FFFFFF', opacity: 0.8 });
  g.rec = rec;
  g.set = (p, t) => { op(g, p); if (t !== undefined) op(rec.firstChild, Math.sin(t * TAU * 0.8) > 0 ? 1 : 0.15); };
  return g;
}
function scLowerThird(parent, name, role) {
  const g = G(parent), inner = G(g);
  const w = Math.max(textWidth(name, 40, FD, 800), textWidth(role, 26, FB, 600)) + 70;
  E('rect', { x: 0, y: 0, width: w, height: 98, rx: 14, fill: '#0E1A24', opacity: 0.88 }, inner);
  E('rect', { x: 0, y: 0, width: 10, height: 98, rx: 5, fill: C.energy }, inner);
  T(inner, 32, 44, name, { size: 40, weight: 800 });
  T(inner, 32, 80, role, { size: 26, weight: 600, font: FB, fill: C.muted });
  tr(g, 50, 600);
  g.set = (p) => { op(g, clamp(p * 2)); tr(inner, -40 * (1 - clamp(p)), 0); };
  return g;
}

function scVideoCall(parent, w, h, label) {
  const g = G(parent);
  E('rect', { x: -w / 2 - 14, y: -h / 2 - 44, width: w + 28, height: h + 58, rx: 18, fill: '#1B2733', stroke: '#3A4B5C', 'stroke-width': 4 }, g);
  E('circle', { cx: -w / 2 + 12, cy: -h / 2 - 22, r: 7, fill: '#FF6060' }, g);
  E('circle', { cx: -w / 2 + 34, cy: -h / 2 - 22, r: 7, fill: '#FFC247' }, g);
  E('circle', { cx: -w / 2 + 56, cy: -h / 2 - 22, r: 7, fill: '#56D69B' }, g);
  T(g, 0, -h / 2 - 12, label || 'Video call', { size: 24, weight: 700, anchor: 'middle', fill: C.muted, font: FB });
  E('rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: 8, fill: linGrad('#1F4A33', '#2E6E4A', true) }, g);
  const clipId = 'scvc' + Math.round(w * 13 + h * 7);
  const cp = E('clipPath', { id: clipId }, defs()); E('rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: 8 }, cp);
  g.screen = G(g, { 'clip-path': `url(#${clipId})` });
  return g;
}

function scKavyaBody(parent) {
  const p = person(parent, { skin: '#B9784E', shirt: '#2E7DD8', shorts: '#1E2A44', hair: '#1E1410', shoes: '#F2F7FA' });
  const body = p.firstChild;
  E('path', { d: 'M-14,-186 Q-38,-182 -40,-158 Q-30,-168 -16,-172 Z', fill: '#1E1410' }, body);   // ponytail, behind the head
  E('circle', { cx: -15, cy: -180, r: 4, fill: '#FF5FA2' }, body);
  return p;
}

function scClipboard(parent, s) {
  const g = G(parent); tr(g, 0, 0, s || 1);
  E('rect', { x: -70, y: -92, width: 140, height: 184, rx: 10, fill: '#B07A45', stroke: SC_INK, 'stroke-width': 4 }, g);
  E('rect', { x: -58, y: -74, width: 116, height: 154, fill: '#FFFFFF' }, g);
  E('rect', { x: -28, y: -102, width: 56, height: 22, rx: 6, fill: '#9AA6B2', stroke: SC_INK, 'stroke-width': 3 }, g);
  for (let i = 0; i < 6; i++) E('line', { x1: -44, y1: -48 + i * 22, x2: 44, y2: -48 + i * 22, stroke: '#C9D3DC', 'stroke-width': 4 }, g);
  return g;
}

function scTrack(parent) {
  const g = G(parent);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#5EC4FF', '#BDE9FF', true) }, g);
  const sunG = G(g); tr(sunG, 1060, 110);
  E('circle', { r: 120, fill: glow('#FFE45C') }, sunG); E('circle', { r: 52, fill: '#FFE45C' }, sunG);
  E('rect', { x: 120, y: 250, width: 420, height: 140, fill: '#E9E2D0', stroke: '#9C927C', 'stroke-width': 4 }, g);   // school block
  for (let i = 0; i < 6; i++) E('rect', { x: 145 + i * 66, y: 280, width: 40, height: 34, fill: '#7FB6D9' }, g);
  T(g, 330, 372, 'SPORTS DAY', { size: 30, weight: 800, anchor: 'middle', fill: '#C2453A' });
  E('rect', { x: 0, y: 390, width: 1200, height: 70, fill: '#5BBF6A' }, g);
  E('rect', { x: 0, y: 460, width: 1200, height: 290, fill: '#C9563F' }, g);
  for (let i = 1; i < 5; i++) E('line', { x1: 0, y1: 460 + i * 58, x2: 1200, y2: 460 + i * 58, stroke: '#FFFFFF', 'stroke-width': 4, opacity: 0.8 }, g);
  const dash = E('path', { d: '', stroke: '#FFFFFF', 'stroke-width': 3, opacity: 0.35 }, g);
  g.upd = (t, speed) => { const off = -((t * (speed || 0)) % 200); let d = ''; for (let x = off; x < 1260; x += 200) d += `M${x.toFixed(0)},748 L${(x + 60).toFixed(0)},748 `; attr(dash, 'd', d); };
  return g;
}

function scBlood(parent) {
  const g = G(parent);
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: linGrad('#3C0D14', '#6A1620', true) }, g);
  E('rect', { x: 0, y: 150, width: 1200, height: 450, fill: '#8E1F2A', opacity: 0.55 }, g);
  E('path', { d: 'M0,150 L1200,150 M0,600 L1200,600', stroke: '#C2454F', 'stroke-width': 14, opacity: 0.7 }, g);
  const r = rng(77), cells = [];
  for (let i = 0; i < 12; i++) {
    const c = E('ellipse', { rx: 34, ry: 15, fill: ball('#FF6B6B', '#B32635'), opacity: 0.55 }, g);
    cells.push({ c, x: r() * 1300, y: 180 + r() * 390, v: 40 + r() * 50, a: r() * 360 });
  }
  g.upd = t => cells.forEach(({ c, x, y, v, a }) => tr(c, ((x + t * v) % 1350) - 75, y + 10 * Math.sin(t + a), 1, a + t * 20));
  return g;
}


/* ==========================================================================
   Humans: scHuman (bust), scHumanBody (full body), SC_HUMANS presets, scCastHuman.
   Same art style and face kit as scKavya. See the header of this file for the options.
   ========================================================================== */
const SC_SKIN = {   // a range of warm tones; pick by look, never by stereotype
  porcelain: '#F3D3B5', fair: '#EBC39B', light: '#E2B48A', golden: '#D9A273', tan: '#C98E62',
  medium: '#B9784E', brown: '#A0623E', deep: '#8A5234', rich: '#6E3F27',
};
const SC_HAIR = { black: '#1E1410', darkBrown: '#3A2416', brown: '#5C3A22', auburn: '#7A3B22', grey: '#B9BEC4', silver: '#DADDE1', salt: '#6E6A68' };

/* lighten (k > 0) or darken (k < 0) a #rrggbb colour by k (-1..1) */
function scShade(hex, k) {
  const n = parseInt(String(hex).slice(1), 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  const f = v => Math.round(k < 0 ? v * (1 + k) : v + (255 - v) * k);
  r = f(r); g = f(g); b = f(b);
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/* hair, in head coordinates: a head of rx 74, ry 80 centred on (0,0) (scaled to the real head).
   back: drawn behind the head (and the shirt); drape: drawn over the shoulders (long hair);
   front: over the head (cap, fringe); extra: decorations with their own fill */
function scHairShapes(style) {
  const S = { back: [], drape: [], front: [], line: [], dots: [] };
  switch (style) {
    case 'bald':
      S.front.push('M-76,14 C-82,-14 -76,-34 -64,-44 C-66,-22 -64,-4 -62,16 Z', 'M76,14 C82,-14 76,-34 64,-44 C66,-22 64,-4 62,16 Z');
      break;
    case 'buzz':
      S.front.push('M-74,-8 C-78,-62 -44,-88 0,-88 C44,-88 78,-62 74,-8 C70,-30 62,-44 50,-52 C20,-60 -20,-60 -50,-52 C-62,-44 -70,-30 -74,-8 Z');
      break;
    case 'side-part':
      S.front.push('M-77,-2 C-86,-64 -48,-96 4,-94 C58,-94 86,-62 77,-2 L69,-8 C66,-34 56,-50 40,-58 C14,-52 -14,-64 -36,-60 C-56,-54 -66,-34 -69,-8 Z');
      S.line.push('M-36,-92 C-34,-80 -36,-70 -36,-60', 'M-30,-62 C0,-80 40,-70 60,-44');
      break;
    case 'bob':
      S.back.push('M-90,40 C-102,-44 -70,-102 0,-102 C70,-102 102,-44 90,40 Q78,50 64,40 L-64,40 Q-78,50 -90,40 Z');
      S.front.push('M-84,34 C-92,-50 -60,-96 0,-96 C60,-96 92,-50 84,34 L68,34 C70,4 68,-24 60,-40 L-60,-40 C-68,-24 -70,4 -68,34 Z');
      break;
    case 'long':
      S.drape.push('M-80,-10 C-92,-80 -60,-102 0,-100 C60,-102 92,-80 80,-10 C84,40 92,96 86,150 Q66,160 52,132 C46,96 48,60 44,30 L-44,30 C-48,60 -46,96 -52,132 Q-66,160 -86,150 C-92,96 -84,40 -80,-10 Z');
      S.front.push('M-80,16 C-88,-56 -54,-98 0,-96 C54,-98 88,-56 80,16 L68,12 C66,-28 44,-60 2,-70 C-42,-60 -66,-28 -68,12 Z');
      S.line.push('M0,-96 C2,-86 2,-78 2,-70');
      break;
    case 'ponytail':
      S.back.push('M74,28 Q132,58 104,128 Q96,88 70,62 Z');
      S.front.push('M-76,0 Q-80,-86 0,-84 Q80,-86 76,0 Q60,-50 8,-46 Q-30,-62 -76,0 Z');
      S.dots.push([74, -12, 8]);
      break;
    case 'bun':
      S.back.push('M-2,-122 a32,30 0 1,0 0.1,0 Z');
      S.front.push('M-77,6 C-84,-60 -50,-94 0,-94 C50,-94 84,-60 77,6 L68,2 C64,-36 40,-60 0,-62 C-40,-60 -64,-36 -68,2 Z');
      S.line.push('M-40,-80 C-20,-70 -10,-66 0,-62', 'M40,-80 C20,-70 10,-66 0,-62', 'M-20,-118 C-6,-110 6,-110 20,-118');
      break;
    case 'curly': {
      const back = [], front = [];
      for (let i = 0; i <= 12; i++) {   // a halo of curls from ear to ear
        const a = Math.PI * (0.92 + i * 1.16 / 12), x = Math.cos(a) * 82, y = Math.sin(a) * 86;
        back.push(`M${(x + 26).toFixed(1)},${y.toFixed(1)} a26,26 0 1,0 -52,0 a26,26 0 1,0 52,0 Z`);
      }
      for (let i = 0; i < 7; i++) {      // fringe curls
        const x = -54 + i * 18, y = -56 + Math.abs(i - 3) * 4;
        front.push(`M${(x + 16).toFixed(1)},${y} a16,16 0 1,0 -32,0 a16,16 0 1,0 32,0 Z`);
      }
      S.back.push(back.join(' '));
      S.front.push('M-80,20 C-90,-56 -54,-100 0,-100 C54,-100 90,-56 80,20 L70,16 C68,-20 60,-40 50,-52 L-50,-52 C-60,-40 -68,-20 -70,16 Z', front.join(' '));
      S.line.push('M-50,-82 q8,-8 16,0', 'M-10,-90 q8,-8 16,0', 'M30,-84 q8,-8 16,0', 'M-70,-30 q8,-8 12,2', 'M58,-30 q8,-8 12,2');
      break;
    }
    case 'tudung':   // a headscarf: drapes over the shoulders and frames the face (no ears or neck shown)
      S.noEars = true; S.noNeck = true;
      S.drape.push('M-86,0 C-92,-84 -58,-106 0,-106 C58,-106 92,-84 86,0 C88,52 104,104 118,170 L-118,170 C-104,104 -88,52 -86,0 Z');
      S.front.push('M-82,18 C-86,-72 -50,-98 0,-98 C50,-98 86,-72 82,18 C80,64 48,96 0,98 C-48,96 -80,64 -82,18 Z M-64,10 C-64,-52 -36,-70 0,-70 C36,-70 64,-52 64,10 C62,54 36,78 0,78 C-36,78 -62,54 -64,10 Z');
      S.line.push('M-70,40 C-50,84 50,84 70,40');
      break;
    case 'short': default:
      S.front.push('M-76,-2 C-82,-62 -50,-94 0,-94 C50,-94 82,-62 76,-2 L68,-6 C66,-34 56,-50 40,-58 C20,-50 -20,-48 -44,-58 C-58,-50 -66,-32 -68,-6 Z');
      S.line.push('M-20,-90 C-14,-76 -6,-66 4,-58', 'M14,-90 C20,-78 28,-68 36,-60');
  }
  return S;
}
function scDrawHair(parent, S, layer, col, sw) {
  const out = [];
  (S[layer] || []).forEach(d => out.push(E('path', { d, fill: col, stroke: SC_INK, 'stroke-width': sw, 'stroke-linejoin': 'round', 'fill-rule': 'evenodd' }, parent)));
  if (layer === 'front') {
    (S.line || []).forEach(d => E('path', { d, fill: 'none', stroke: scShade(col, col === SC_HAIR.black ? 0.28 : -0.28), 'stroke-width': sw * 0.9, 'stroke-linecap': 'round' }, parent));
    (S.dots || []).forEach(([x, y, r]) => E('circle', { cx: x, cy: y, r, fill: '#FF5FA2', stroke: SC_INK, 'stroke-width': sw * 0.6 }, parent));
  }
  return out;
}

/* proportions per age: head centre y (hy), head radii, shoulder half-width (sw), shoulder top (ty), neck width, face */
const SC_AGE = {
  child:  { hy: -4,  rx: 70, ry: 72, sw: 80,  ty: 72, nw: 30, eye: 17,   gap: 50, mw: 32, body: 0.74 },
  teen:   { hy: -34, rx: 74, ry: 80, sw: 100, ty: 52, nw: 36, eye: 15,   gap: 50, mw: 36, body: 1 },
  adult:  { hy: -46, rx: 72, ry: 82, sw: 114, ty: 44, nw: 40, eye: 13.5, gap: 52, mw: 38, body: 1.1 },
  senior: { hy: -42, rx: 74, ry: 82, sw: 110, ty: 48, nw: 40, eye: 12.5, gap: 52, mw: 38, body: 1.05 },
};

/* a small prop for a hand, drawn around (0,0) = the grip point, about 60-90 px */
function scHandProp(parent, kind, col) {
  const g = G(parent), ink = SC_INK;
  if (kind === 'marker') {
    E('rect', { x: -9, y: -78, width: 18, height: 70, rx: 6, fill: '#F4F7FA', stroke: ink, 'stroke-width': 3 }, g);
    E('rect', { x: -10, y: -96, width: 20, height: 24, rx: 5, fill: col || '#2E7DD8', stroke: ink, 'stroke-width': 3 }, g);
    E('rect', { x: -10, y: -40, width: 20, height: 8, fill: col || '#2E7DD8' }, g);
  } else if (kind === 'pointer') {
    E('line', { x1: 0, y1: 0, x2: 70, y2: -120, stroke: '#9C6B3E', 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
    E('circle', { cx: 70, cy: -120, r: 6, fill: '#E8424F' }, g);
  } else if (kind === 'pencil') {
    E('path', { d: 'M-7,-10 L-7,-80 L0,-98 L7,-80 L7,-10 Z', fill: '#FFC247', stroke: ink, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
    E('path', { d: 'M-7,-80 L0,-98 L7,-80 Z', fill: '#F3D9B1', stroke: ink, 'stroke-width': 2.5 }, g);
    E('path', { d: 'M-2.5,-91 L0,-98 L2.5,-91 Z', fill: ink }, g);
  } else if (kind === 'mug' || kind === 'kopi') {
    E('path', { d: 'M22,-60 q26,0 26,20 q0,20 -26,20', fill: 'none', stroke: ink, 'stroke-width': 6 }, g);
    E('path', { d: 'M-26,-74 L26,-74 L22,-6 Q22,0 16,0 L-16,0 Q-22,0 -22,-6 Z', fill: col || (kind === 'kopi' ? '#F4F7FA' : '#E8424F'), stroke: ink, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
    E('ellipse', { cx: 0, cy: -74, rx: 26, ry: 6, fill: '#7A4A2E', stroke: ink, 'stroke-width': 3 }, g);
    if (kind === 'kopi') E('path', { d: 'M-24,-50 L24,-50', stroke: '#2E8B57', 'stroke-width': 4 }, g);
  } else if (kind === 'phone') {
    E('rect', { x: -22, y: -82, width: 44, height: 80, rx: 8, fill: '#26323C', stroke: ink, 'stroke-width': 3 }, g);
    E('rect', { x: -17, y: -74, width: 34, height: 60, rx: 3, fill: col || '#7FD3FF' }, g);
  } else if (kind === 'book') {
    E('rect', { x: -40, y: -96, width: 80, height: 96, rx: 6, fill: col || '#2E8B57', stroke: ink, 'stroke-width': 4 }, g);
    E('rect', { x: -40, y: -96, width: 14, height: 96, rx: 4, fill: scShade(col || '#2E8B57', -0.3), stroke: ink, 'stroke-width': 3 }, g);
    E('rect', { x: -16, y: -76, width: 44, height: 18, rx: 3, fill: '#FFFDF6' }, g);
  } else if (kind === 'calculator') {
    E('rect', { x: -30, y: -96, width: 60, height: 92, rx: 8, fill: '#3A4A58', stroke: ink, 'stroke-width': 3 }, g);
    E('rect', { x: -22, y: -88, width: 44, height: 18, rx: 3, fill: '#BFE3C8' }, g);
    for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) E('rect', { x: -21 + c * 15, y: -64 + r * 14, width: 11, height: 9, rx: 2, fill: '#C9D3DC' }, g);
  } else if (kind === 'ladle') {
    E('line', { x1: 0, y1: 10, x2: -10, y2: -90, stroke: '#8F9CAB', 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
    E('path', { d: 'M-40,-96 Q-10,-60 22,-96 Z', fill: '#C9D3DC', stroke: ink, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
  } else if (kind === 'spatula') {
    E('line', { x1: 0, y1: 10, x2: 0, y2: -70, stroke: '#9C6B3E', 'stroke-width': 8, 'stroke-linecap': 'round' }, g);
    E('rect', { x: -22, y: -112, width: 44, height: 44, rx: 6, fill: '#C9D3DC', stroke: ink, 'stroke-width': 4 }, g);
  } else if (kind === 'paper') {
    E('path', { d: 'M-36,-100 L28,-100 L40,-88 L40,0 L-36,0 Z', fill: '#FFFDF6', stroke: ink, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
    for (let i = 0; i < 5; i++) E('line', { x1: -26, y1: -82 + i * 16, x2: 28, y2: -82 + i * 16, stroke: '#9FB2C2', 'stroke-width': 3 }, g);
  } else if (kind === 'tablet') {
    E('rect', { x: -50, y: -100, width: 100, height: 76, rx: 8, fill: '#26323C', stroke: ink, 'stroke-width': 3 }, g);
    E('rect', { x: -42, y: -92, width: 84, height: 60, rx: 3, fill: col || '#7FD3FF' }, g);
  }
  return g;
}

/* clothes for the bust: torso from the shoulders (y = ty) to y = 140 */
function scHumanTorso(g, o, A) {
  const sw = A.sw * (o.frame === 'narrow' ? 0.9 : o.frame === 'broad' ? 1.08 : 1), ty = A.ty, nw = A.nw, ink = SC_INK;
  const style = o.style || 'tee', shirt = o.shirt || '#2E7DD8', dk = scShade(shirt, -0.25), skin = o.skin;
  const torso = `M${-sw},140 Q${-sw + 4},${ty + 10} ${-sw * 0.4},${ty} L${sw * 0.4},${ty} Q${sw - 4},${ty + 10} ${sw},140 Z`;
  if (style === 'apron') {   // the shirt underneath, then the apron over it
    scHumanTorso(g, Object.assign({}, o, { style: o.under || 'blouse' }), A);
    const ac = o.apron || '#F4F7FA', aw = sw * 0.62;
    E('path', { d: `M${-nw * 0.9},${ty + 4} L${-aw * 0.6},${ty + 40} M${nw * 0.9},${ty + 4} L${aw * 0.6},${ty + 40}`, stroke: ac, 'stroke-width': 8, 'stroke-linecap': 'round' }, g);
    E('path', { d: `M${-aw * 0.62},${ty + 36} L${aw * 0.62},${ty + 36} L${aw},140 L${-aw},140 Z`, fill: ac, stroke: ink, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
    if (o.apronText) T(g, 0, ty + 74, o.apronText, { size: 26, weight: 800, anchor: 'middle', fill: o.apronTextCol || '#C62828', ls: 1 });
    E('path', { d: `M${-aw * 0.5},118 l${aw},0`, stroke: scShade(ac, -0.2), 'stroke-width': 3 }, g);
    return;
  }
  E('path', { d: torso, fill: style === 'uniform' ? '#F4F7FA' : shirt, stroke: ink, 'stroke-width': 4 }, g);
  const collar = (col) => {
    E('path', { d: `M${-nw * 0.62},${ty - 2} L0,${ty + 30} L${nw * 0.62},${ty - 2} Z`, fill: skin, stroke: ink, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
    [-1, 1].forEach(s => E('path', { d: `M${s * nw * 0.62},${ty - 6} L${s * nw * 1.55},${ty + 10} L${s * 5},${ty + 31} Z`, fill: col, stroke: ink, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g));
  };
  const buttons = (y0, n, col) => { for (let i = 0; i < n; i++) E('circle', { cx: 0, cy: y0 + i * 24, r: 3.5, fill: col || dk }, g); };
  if (style === 'tee') {
    E('path', { d: `M${-nw * 0.8},${ty} Q0,${ty + 26} ${nw * 0.8},${ty} Z`, fill: skin }, g);
    E('path', { d: `M${-nw * 0.8},${ty} Q0,${ty + 26} ${nw * 0.8},${ty}`, fill: 'none', stroke: dk, 'stroke-width': 6, 'stroke-linecap': 'round' }, g);
    if (o.logo) T(g, sw * 0.5, 120, o.logo, { size: 30, weight: 800, anchor: 'middle', fill: o.logoCol || '#FFFFFF' });
  } else if (style === 'collared' || style === 'office' || style === 'uniform') {
    const cc = style === 'collared' ? scShade(shirt, 0.25) : style === 'uniform' ? '#FFFFFF' : scShade(shirt, 0.15);
    collar(cc);
    if (style === 'office') {
      const tie = o.tie || '#C62828';
      E('path', { d: `M-8,${ty + 24} L8,${ty + 24} L12,${ty + 34} L16,140 L-16,140 L-12,${ty + 34} Z`, fill: tie, stroke: ink, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
      E('path', { d: `M-10,${ty + 20} L10,${ty + 20} L8,${ty + 34} L-8,${ty + 34} Z`, fill: scShade(tie, -0.2), stroke: ink, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
      for (let i = 0; i < 3; i++) E('line', { x1: -12, y1: ty + 54 + i * 22, x2: 12, y2: ty + 48 + i * 22, stroke: scShade(tie, 0.35), 'stroke-width': 3 }, g);
      E('path', { d: `M${sw * 0.32},${ty + 46} l34,0 l0,30 l-34,0 Z`, fill: 'none', stroke: dk, 'stroke-width': 3 }, g);
    } else if (style === 'uniform') {
      buttons(ty + 44, 4, '#B9C4CC');
      const b = G(g); tr(b, sw * 0.46, ty + 50);
      E('path', { d: 'M-17,-16 L17,-16 L17,4 Q17,18 0,24 Q-17,18 -17,4 Z', fill: o.badge || '#1E3A8A', stroke: ink, 'stroke-width': 3 }, b);
      E('path', { d: 'M-8,-4 L0,-12 L8,-4 L0,10 Z', fill: '#FFC247' }, b);
      E('path', { d: `M${-sw * 0.62},${ty + 40} l34,0 l0,36 l-34,0 Z`, fill: 'none', stroke: '#C9D3DC', 'stroke-width': 3 }, g);
    } else buttons(ty + 42, 2);
  } else if (style === 'blouse') {
    E('path', { d: `M${-nw * 1.15},${ty} Q0,${ty + 44} ${nw * 1.15},${ty} Z`, fill: skin }, g);
    E('path', { d: `M${-nw * 1.15},${ty} Q0,${ty + 44} ${nw * 1.15},${ty}`, fill: 'none', stroke: o.trim || scShade(shirt, 0.45), 'stroke-width': 6, 'stroke-linecap': 'round' }, g);
    const r = rng(41);
    for (let i = 0; i < 14; i++) {
      const x = (r() * 2 - 1) * sw * 0.8, y = ty + 34 + r() * (100 - ty);
      if (Math.abs(x) < nw * 0.9 && y < ty + 30) continue;
      const fl = G(g); tr(fl, x, y);
      for (let k = 0; k < 5; k++) { const a = k * TAU / 5; E('circle', { cx: Math.cos(a) * 5, cy: Math.sin(a) * 5, r: 4, fill: o.trim || scShade(shirt, 0.45) }, fl); }
      E('circle', { r: 2.6, fill: '#FFE45C' }, fl);
    }
  } else if (style === 'kurta') {
    const trim = o.trim || '#E2B33C';
    E('path', { d: `M${-nw * 0.7},${ty - 4} Q0,${ty + 10} ${nw * 0.7},${ty - 4} L${nw * 0.7},${ty + 6} Q0,${ty + 20} ${-nw * 0.7},${ty + 6} Z`, fill: trim, stroke: ink, 'stroke-width': 2.5 }, g);
    E('path', { d: `M-9,${ty + 14} L9,${ty + 14} L9,${ty + 74} L-9,${ty + 74} Z`, fill: scShade(shirt, 0.12), stroke: trim, 'stroke-width': 3 }, g);
    for (let i = 0; i < 3; i++) E('circle', { cx: 0, cy: ty + 28 + i * 18, r: 3.5, fill: trim }, g);
    for (let i = 0; i < 9; i++) E('circle', { cx: -sw * 0.75 + i * sw * 0.19, cy: 128, r: 3.5, fill: trim }, g);
  }
}

/* scHuman(parent, o): a cartoon human bust (head and shoulders), bottom of the shirt at y = 140 for every age,
   so busts of different ages stand on one baseline. Built on scMake: same g.set({ t, talk, mood, look, sweat, still, lift }). */
function scHuman(parent, o) {
  o = o || {};
  const A = SC_AGE[o.age || 'adult'] || SC_AGE.adult, ink = SC_INK;
  const skin = o.skin || SC_SKIN.medium;
  const hairCol = o.hairCol || (o.age === 'senior' ? SC_HAIR.silver : SC_HAIR.black);
  const hs = { rx: A.rx / 74, ry: A.ry / 80 };
  const hair = scHairShapes(o.hair || 'short');
  const fy = A.hy + 12 * hs.ry, side = o.side === 'right' ? 1 : -1;   // default: the character's right hand (viewer's left)
  const opts = Object.assign({}, o, { skin });
  let hand = null;
  const c = scMake(parent, {
    s: o.s, mood: o.mood, seed: o.seed || 5, bob: o.bob === undefined ? 2 : o.bob,
    draw: g => {
      const head = (p) => { const h = G(p); h.setAttribute('transform', `translate(0 ${A.hy}) scale(${hs.rx.toFixed(3)} ${hs.ry.toFixed(3)})`); return h; };
      scDrawHair(head(g), hair, 'back', hairCol, 3);
      scHumanTorso(g, opts, A);
      scDrawHair(head(g), hair, 'drape', hairCol, 3);
      if (!hair.noNeck) {
        E('rect', { x: -A.nw / 2, y: A.hy + A.ry * 0.6, width: A.nw, height: A.ty - A.hy - A.ry * 0.6 + 8, fill: skin }, g);   // neck
        E('path', { d: `M${-A.nw / 2},${A.hy + A.ry * 0.86} Q0,${A.hy + A.ry * 1.02} ${A.nw / 2},${A.hy + A.ry * 0.86}`, fill: 'none', stroke: scShade(skin, -0.18), 'stroke-width': 4 }, g);
      }
      const hd = head(g);
      if (!hair.noEars) [-1, 1].forEach(s => E('ellipse', { cx: s * 72, cy: 8, rx: 13, ry: 19, fill: skin, stroke: ink, 'stroke-width': 4 }, hd));   // ears
      E('ellipse', { cx: 0, cy: 0, rx: 74, ry: 80, fill: skin, stroke: ink, 'stroke-width': 4 / Math.min(hs.rx, hs.ry) }, hd);
      if (o.beard) {
        const bd = { full: 'M-72,8 C-72,70 -34,98 0,98 C34,98 72,70 72,8 C62,36 46,46 32,42 C20,56 -20,56 -32,42 C-46,46 -62,36 -72,8 Z',
          stubble: 'M-70,14 C-68,70 -32,96 0,96 C32,96 68,70 70,14 C60,40 44,50 30,46 C18,60 -18,60 -30,46 C-44,50 -60,40 -70,14 Z',
          goatee: 'M-20,60 C-18,84 -8,94 0,94 C8,94 18,84 20,60 C10,66 -10,66 -20,60 Z' }[o.beard] || '';
        if (bd) E('path', { d: bd, fill: o.beardCol || hairCol, opacity: o.beard === 'stubble' ? 0.32 : 1, stroke: o.beard === 'stubble' ? 'none' : ink, 'stroke-width': 3 }, hd);
      }
      if (o.age === 'senior') {   // laugh lines and a forehead crease
        E('path', { d: 'M-46,48 Q-40,60 -30,62 M46,48 Q40,60 30,62', fill: 'none', stroke: scShade(skin, -0.25), 'stroke-width': 3, 'stroke-linecap': 'round' }, hd);
        E('path', { d: 'M-66,8 l-8,4 M-66,16 l-8,0 M66,8 l8,4 M66,16 l8,0', fill: 'none', stroke: scShade(skin, -0.25), 'stroke-width': 2.5, 'stroke-linecap': 'round' }, hd);
      }
      if (o.age === 'child' || o.blush) [-1, 1].forEach(s => E('ellipse', { cx: s * 44, cy: 36, rx: 12, ry: 7, fill: '#FF8FB0', opacity: 0.45 }, hd));
      scDrawHair(hd, hair, 'front', hairCol, 3);
      if (o.band) E('path', { d: 'M-74,-24 C-66,-80 66,-80 74,-24', fill: 'none', stroke: o.band, 'stroke-width': 9, 'stroke-linecap': 'round' }, hd);
      if (o.clip) { const cl = G(hd); tr(cl, 42, -54, 1, -20); E('rect', { x: -14, y: -5, width: 28, height: 10, rx: 4, fill: o.clip, stroke: ink, 'stroke-width': 2.5 }, cl); }
      if (o.prop || o.hand) {
        hand = G(g);
        const hx = side * A.sw * 0.56, hy = A.ty + 50;
        hand.base = [hx, hy];
        E('path', { d: `M${hx + side * 14},126 L${hx},${hy + 10}`, stroke: o.style === 'uniform' ? '#F4F7FA' : o.shirt || '#2E7DD8', 'stroke-width': 30, 'stroke-linecap': 'round' }, hand);
        hand.prop = G(hand); tr(hand.prop, hx, hy, 0.85, side * 16);   // tilted outwards, away from the face
        if (o.prop) scHandProp(hand.prop, o.prop, o.propCol);
        E('circle', { cx: hx, cy: hy, r: 16, fill: skin, stroke: ink, 'stroke-width': 3.5 }, hand);
        E('path', { d: `M${hx - 9},${hy - 4} l18,0 M${hx - 9},${hy + 4} l18,0`, stroke: scShade(skin, -0.3), 'stroke-width': 2.5, 'stroke-linecap': 'round' }, hand);
      }
    },
    face: { x: 0, y: fy, eye: A.eye, gap: A.gap, mouthW: A.mw, mouthY: 30 * hs.ry, lidCol: skin, iris: o.iris },
    sweat: [[-62, A.hy - 44], [66, A.hy - 36], [-80, A.hy + 14]],
    upd: (t, g, st) => { if (hand) { const k = st.lift || 0; tr(hand, side * 6 * k, -46 * k); } },
  });
  const inner = c.firstChild, F = G(inner);
  tr(F, 0, fy);
  const er = A.eye, gp = A.gap / 2;
  if (o.bindi) E('circle', { cx: 0, cy: -er * 2.05, r: 4.5, fill: o.bindi === true ? '#B0123E' : o.bindi }, F);
  if (o.glasses) {
    const gc = o.glasses === true ? SC_INK : o.glasses, gw = Math.max(3.5, er * 0.26);
    [-1, 1].forEach(s => {
      if (o.frames === 'rect') E('rect', { x: s * gp - er * 1.45, y: -er * 1.15, width: er * 2.9, height: er * 2.3, rx: er * 0.55, fill: 'rgba(255,255,255,0.14)', stroke: gc, 'stroke-width': gw }, F);
      else E('circle', { cx: s * gp, cy: er * 0.05, r: er * 1.38, fill: 'rgba(255,255,255,0.14)', stroke: gc, 'stroke-width': gw }, F);
      E('line', { x1: s * (gp + er * 1.4), y1: -er * 0.2, x2: s * (gp + er * 2.6), y2: -er * 0.5, stroke: gc, 'stroke-width': gw * 0.8, 'stroke-linecap': 'round' }, F);
    });
    E('path', { d: `M${-gp + er * 1.38},${-er * 0.1} Q0,${-er * 0.6} ${gp - er * 1.38},${-er * 0.1}`, fill: 'none', stroke: gc, 'stroke-width': gw * 0.8 }, F);
  }
  if (o.moustache) {
    const my = 30 * hs.ry - A.mw * 0.42, mw = A.mw * 0.62;
    E('path', { d: `M0,${my - 2} C${-mw * 0.5},${my - 10} ${-mw * 1.1},${my - 4} ${-mw * 1.2},${my + 8} C${-mw * 0.8},${my + 4} ${-mw * 0.4},${my + 6} 0,${my + 3} C${mw * 0.4},${my + 6} ${mw * 0.8},${my + 4} ${mw * 1.2},${my + 8} C${mw * 1.1},${my - 4} ${mw * 0.5},${my - 10} 0,${my - 2} Z`, fill: o.beardCol || hairCol, stroke: ink, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, F);
  }
  if (o.earrings) {
    const ec = o.earrings === true ? '#E2B33C' : o.earrings;
    [-1, 1].forEach(s => {
      const x = s * 72 * hs.rx, y = A.hy + 26 * hs.ry;
      if (o.hoops) E('circle', { cx: x, cy: y + 10, r: 10, fill: 'none', stroke: ec, 'stroke-width': 4 }, inner);
      else { E('circle', { cx: x, cy: y + 4, r: 6, fill: ec, stroke: SC_INK, 'stroke-width': 2 }, inner); }
    });
  }
  if (hand) inner.appendChild(hand);   // the hand and its prop sit in front of the face kit
  c.hand = hand ? hand.prop : null;
  c.head = [0, A.hy];   // head centre, for placing bubbles
  c.top = A.hy - A.ry - 20;
  return c;
}

/* scHumanBody(parent, o): full body, feet at (0,0), about 190 px tall for a teen (child 0.74, adult 1.1).
   Same pose API as kit person(): g.pose({ lean, armL, armR, legL, legR }), so runPose(t)/walkPose(t) work.
   o: the scHuman options (skin, hair, hairCol, shirt, glasses, age) plus bottoms ('shorts' | 'trousers' | 'skirt' |
   'dress'), bottomCol, shoes, apron (colour), tie (colour) */
function scHumanBody(parent, o) {
  o = o || {};
  const A = SC_AGE[o.age || 'adult'] || SC_AGE.adult;
  const g = G(parent), sc = G(g), body = G(sc);
  tr(sc, 0, 0, A.body);
  const skin = o.skin || SC_SKIN.medium, shirt = o.style === 'uniform' ? '#F4F7FA' : (o.shirt || '#5B8DEF');
  const bottoms = o.bottoms || (o.age === 'child' || o.age === 'teen' ? 'shorts' : 'trousers');
  const bcol = o.bottomCol || '#3A4A66', shoes = o.shoes || '#2A2A30';
  const hairCol = o.hairCol || (o.age === 'senior' ? SC_HAIR.silver : SC_HAIR.black);
  const AU = 33, AL = 31, LU = 45, LL = 45;
  const legLow = bottoms === 'trousers' ? bcol : skin, legUp = (bottoms === 'trousers' || bottoms === 'shorts') ? bcol : skin;
  const limb = (upCol, lowCol, w, lu, ll, foot) => {
    const a = G(body);
    E('line', { x1: 0, y1: 0, x2: 0, y2: lu, stroke: upCol, 'stroke-width': w, 'stroke-linecap': 'round' }, a);
    const lo = G(a);
    E('line', { x1: 0, y1: 0, x2: 0, y2: ll, stroke: lowCol, 'stroke-width': w * 0.85, 'stroke-linecap': 'round' }, lo);
    if (foot) E('path', { d: `M-5,${ll - 2} Q-6,${ll + 7} 4,${ll + 7} L15,${ll + 7} Q19,${ll + 2} 12,${ll - 3} Z`, fill: shoes }, lo);
    else E('circle', { cx: 0, cy: ll + 2, r: w * 0.55, fill: skin }, lo);
    return { a, lo };
  };
  const hairBack = G(body);
  const legB = limb(legUp, legLow, 15, LU, LL, true), armB = limb(shirt, o.sleeves === 'long' ? shirt : skin, 11, AU, AL, false);
  if (bottoms === 'dress') E('path', { d: 'M-18,-152 Q0,-160 18,-152 L30,-58 Q0,-52 -30,-58 Z', fill: shirt }, body);
  else E('path', { d: 'M-18,-152 Q0,-160 18,-152 L15,-92 Q0,-86 -15,-92 Z', fill: shirt }, body);
  if (bottoms === 'skirt') E('path', { d: 'M-16,-96 L16,-96 L28,-58 Q0,-52 -28,-58 Z', fill: bcol }, body);
  if (o.style === 'uniform') E('path', { d: 'M-8,-154 L0,-142 L8,-154', fill: 'none', stroke: '#C9D3DC', 'stroke-width': 3 }, body);
  if (o.tie || o.style === 'office') E('path', { d: 'M-3,-150 L3,-150 L5,-112 L0,-106 L-5,-112 Z', fill: o.tie || '#C62828' }, body);
  if (o.apron || o.style === 'apron') E('path', { d: 'M-12,-140 L12,-140 L18,-66 L-18,-66 Z', fill: o.apron || '#F4F7FA', stroke: '#C9D3DC', 'stroke-width': 2 }, body);
  const legF = limb(legUp, legLow, 15, LU, LL, true), armF = limb(shirt, o.sleeves === 'long' ? shirt : skin, 11, AU, AL, false);
  const head = G(body);
  E('rect', { x: -6, y: -160, width: 12, height: 10, fill: skin }, head);
  const hairS = scHairShapes(o.hair || 'short');
  const hb = G(hairBack); hb.setAttribute('transform', 'translate(0 -174) scale(0.25)');
  scDrawHair(hb, hairS, 'back', hairCol, 0); scDrawHair(hb, hairS, 'drape', hairCol, 0);
  E('circle', { cx: 0, cy: -174, r: 19, fill: skin }, head);
  const hk = G(head); hk.setAttribute('transform', 'translate(0 -174) scale(0.25)');
  scDrawHair(hk, { front: hairS.front, dots: hairS.dots }, 'front', hairCol, 0);
  E('circle', { cx: -6.5, cy: -172, r: 2.4, fill: SC_INK }, head); E('circle', { cx: 6.5, cy: -172, r: 2.4, fill: SC_INK }, head);
  E('path', { d: 'M-5,-164 Q0,-160 5,-164', fill: 'none', stroke: SC_INK, 'stroke-width': 1.8, 'stroke-linecap': 'round' }, head);
  if (o.glasses) { const gc = o.glasses === true ? SC_INK : o.glasses; [-6.5, 6.5].forEach(x => E('circle', { cx: x, cy: -172, r: 5, fill: 'none', stroke: gc, 'stroke-width': 1.6 }, head)); }
  if (o.moustache) E('path', { d: 'M-6,-166 Q0,-170 6,-166', fill: 'none', stroke: o.beardCol || hairCol, 'stroke-width': 3, 'stroke-linecap': 'round' }, head);
  const setLimb = (L, x, y, a, b, seg) => { L.a.setAttribute('transform', `translate(${x} ${y}) rotate(${(-a).toFixed(1)})`); L.lo.setAttribute('transform', `translate(0 ${seg}) rotate(${(-b).toFixed(1)})`); };
  g.pose = p => {
    p = p || {};
    body.setAttribute('transform', `rotate(${((p.lean || 0) + (o.age === 'senior' ? 4 : 0)).toFixed(1)} 0 -92)`);
    const aL = p.armL || [8, 10], aR = p.armR || [-8, 10], lL = p.legL || [3, -3], lR = p.legR || [-3, -3];
    setLimb(armB, 0, -146, aL[0], aL[1], AU); setLimb(armF, 0, -146, aR[0], aR[1], AU);
    setLimb(legB, 0, -92, lL[0], lL[1], LU); setLimb(legF, 0, -92, lR[0], lR[1], LU);
  };
  g.pose();
  g.height = 196 * A.body;
  return g;
}

/* the recurring humans of the Year 8 Maths sitcoms (Kavya is scKavya). name / role are for scLowerThird. */
const SC_HUMANS = {
  mum: { name: 'MUM', role: "Kavya's mum", age: 'adult', skin: SC_SKIN.brown, hair: 'bun', hairCol: SC_HAIR.black, frame: 'narrow',
    style: 'kurta', shirt: '#B8336A', trim: '#E2B33C', earrings: '#E2B33C', bindi: true, seed: 11, bottoms: 'trousers', bottomCol: '#F3D9B1', sleeves: 'long' },
  dad: { name: 'DAD', role: "Kavya's dad", age: 'adult', skin: SC_SKIN.deep, hair: 'side-part', hairCol: '#2A1E18', glasses: '#2A1A22', frames: 'rect',
    moustache: true, style: 'collared', shirt: '#3D8B6E', seed: 13, bottoms: 'trousers', bottomCol: '#4A5568' },
  boy: { name: 'AH BOY', role: "Kavya's brother, 8", age: 'child', skin: SC_SKIN.medium, hair: 'short', hairCol: SC_HAIR.black,
    style: 'tee', shirt: '#F28C28', logo: '★', logoCol: '#FFE45C', seed: 17, bottoms: 'shorts', bottomCol: '#2E5AAC', shoes: '#E8424F' },
  priya: { name: 'PRIYA', role: 'Best friend. Competitive.', age: 'teen', skin: SC_SKIN.golden, hair: 'bob', hairCol: '#1A1412', clip: '#FFC247',
    style: 'uniform', badge: '#7A1E48', earrings: '#E8F0F5', seed: 19, bottoms: 'skirt', bottomCol: '#2B3A67', shoes: '#F4F7FA' },
  tan: { name: 'MR TAN', role: 'Maths teacher', age: 'adult', skin: SC_SKIN.fair, hair: 'side-part', hairCol: '#26201C', glasses: '#3A4A58',
    style: 'office', shirt: '#CFE3F5', tie: '#2E4C8C', seed: 23, frame: 'broad', bottoms: 'trousers', bottomCol: '#2F3640', sleeves: 'long' },
  rose: { name: 'AUNTIE ROSE', role: 'Hawker stall, Blk 208', age: 'senior', skin: SC_SKIN.light, hair: 'curly', hairCol: '#4A4044', frame: 'narrow',
    style: 'apron', under: 'blouse', shirt: '#E07A9B', trim: '#FFF0F5', apron: '#F4F7FA', apronText: "ROSE'S", earrings: '#3FA463', seed: 29,
    bottoms: 'trousers', bottomCol: '#3A3440', shoes: '#C9935A' },
};
/* scCastHuman(parent, key, o): one of SC_HUMANS (o overrides; o.body = true builds the full body instead) */
function scCastHuman(parent, key, o) {
  const p = Object.assign({}, SC_HUMANS[key] || {}, o || {});
  const g = p.body ? scHumanBody(parent, p) : scHuman(parent, p);
  g.who = key; g.name = p.name; g.role = p.role;
  return g;
}
