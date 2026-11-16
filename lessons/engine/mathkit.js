/* ==========================================================================
   mathkit.js: maths notation and maths props for every Year 8 Maths lesson and
   Claude Sitcom episode. Bundled after kit.js (before sitcom.js and an episode's
   lib.js); all of these share one global scope, so every top-level name here
   starts with `mk` or `MK_`.

   Rules as in lib.js: everything is built once; animated helpers expose cheap
   per-frame setters (g.set(p), g.show(i, p) ...); no filters; no per-frame element
   creation. Default ink is C.ink (light, for the dark stage). On paper, a
   whiteboard or a light card pass { ink: MK.ink } (dark). Labels default to
   26-32 px. Unless noted, a prop is drawn around its own origin; place it with
   tr(g, x, y, scale).

   MATHS NOTATION (same markup as the app's {{ }} spans, lib/mathml.ts)
     3/4  stacked fraction        (x+1)/2  brackets around a numerator/denominator are dropped
     2 1/3  mixed number          x^2  10^(-3)  10^-3  x^{2n}  powers      x_1  subscript
     sqrt(144)  √144  cbrt(27)    pi -> π, theta -> θ    "any text" -> upright text
     * -> ×   - -> −   <= ≤   >= ≥   != ≠   +- ±   ~= ≈   -> →   => ⇒   ÷ ° % : as typed
     2x, 3ab: a number and letters make one term (2x/3 = two-x over three)
     \/ is a literal slash (km\/h); write thousands as 2,500 and lists with a space: (2, 3)
     single letters (and runs of up to 3 letters that are not units such as cm, kg) are italic

   mkMath(parent, x, y, src, o)       typeset src with its baseline at y. o: { size (40), fill (C.ink),
                                      anchor 'start'|'middle'|'end', weight (600), font (FD), italic (true),
                                      halo (background colour: an outline that keeps it readable over lines) }.
                                      Returns a <g> (no transform of its own, so tr(g, ...) is free) with
                                      g.w, g.h, g.a (ascent above the baseline), g.d (descent), g.x0 (left edge).
   mkMathSet(g, src)                  retypeset g with new markup; a no-op when src is unchanged, so it is cheap
                                      to call every frame, but a CHANGE rebuilds the elements. For many changes,
                                      build the alternatives once and op() between them.
   mkMeasure(src, o)                  { w, a, d } of src without drawing
   mkText(parent, x, y, str, o)       a text line (or '\n' lines) mixing plain words, **bold** and {{maths}}:
                                      "So {{3/4 = 6/8}}". o: size (30), fill, boldFill, weight, anchor, font, halo,
                                      lh (extra line gap, px), mathScale (1.06). Returns g with g.w, g.h, g.top,
                                      g.bottom (y is the first baseline; to centre a block, tr(g, 0, -g.top - g.h / 2)).
   mkWorking(parent, x, y, lines, o)  aligned multi-line working: every line is split at its first top-level
                                      '=' and the '=' signs line up on the column x; y is the top of the first
                                      line. A line may start with '=' ("= 19/12"); a line without '=' starts at
                                      the left edge of the block. lines: strings or { m: src, note: 'text',
                                      col: colour }. o: size (40), fill, gap (line gap, 0.5 size), noteX (px right
                                      of the '=' column; default after the widest line), noteSize, slide (px, 24).
                                      g.show(i, p) reveals line i; g.set(k) shows k lines (2.5 = two and a half);
                                      g.hl(i, p) highlight band behind line i; g.ring(i, p) answer box around the
                                      right-hand side of line i; g.lineY[i] baselines; g.w, g.h, g.left, g.right.

   BOARDS
     mkWhiteboard(parent, w, h, o)    whiteboard centred on (0,0) with frame and marker tray. o: title, stand (legs).
                                      g.ink (dark ink for writing on it), g.area { x, y, w, h }, g.content (a <g>)
     mkChalkboard(parent, w, h, o)    classroom chalkboard, same API (g.ink is chalk white)

   NUMBER LINES, GRAPHS, GRIDS
     mkNumberLine(parent, o)          o: from (-5), to (5), step (1), len (900 px), minor (sub-ticks per step),
                                      labels (true | n: every n-th tick | [[v, 'markup'], ...] | v => markup),
                                      marks [{ v, label, col }], hops [{ a, b, label, col, below, height }],
                                      pointer (false), arrows (true), size (30), ink.
                                      Origin = the value `from` on the line. g.x(v) -> px.
                                      g.mark(i, p), g.hop(i, p) (draws the arc), g.point(v, p) (moves the pointer)
     mkAxes(parent, o)                coordinate plane. o: xmin, xmax, ymin, ymax (-5..5), unit (px per 1, 50) or
                                      w / h, unitY, step (grid, 1), labelStep, grid (true), size (26), ink, gridCol,
                                      xName ('x'), yName ('y'), bg (card colour), halo (label outline colour).
                                      Origin = top-left of the plot box. Labels need about 50 px per unit at size 26;
                                      for tighter grids pass labelStep 2.
                                      g.px(x), g.py(y), g.W, g.H. Build-time helpers, each returning an element
                                      with .set(p): g.line(m, c, o) draws y = mx + c exactly, clipped to the box
                                      (o: col, width, label markup, labelAt (x value), dx, dy, anchor, halo);
                                      g.line returns null when the line misses the box; .label, .ends [[x, y] x2].
                                      g.seg(x1, y1, x2, y2, o) (o.dash); g.plot(fn, o); g.poly(pts, o) (o.fill);
                                      g.point(x, y, o) (o: col, label, pos 'ne'|'nw'|'se'|'sw'|'n'|'s'|'e'|'w', r)
     mkGrid(parent, o)                squared paper. o: cols (12), rows (8), cell (44), ink, dots (dotty paper).
                                      Origin top-left. g.at(c, r) -> [x, y] of a grid point;
                                      g.shade(cells [[c, r], ...], col) -> group with .set(p)

   FRACTIONS, RATIO, PERCENT
     mkFractionBar(parent, n, k, o)   bar of n equal parts, k shaded, centred (a pale strip on any background).
                                      o: w (560), h (70), col, line (outline, dark), empty (pale fill),
                                      label (true: shows k/n), cellLabels (1/n in each part), size.
                                      g.set(v) shades v parts (fractions allowed)
     mkFractionWall(parent, dens, o)  fraction wall, rows for dens e.g. [1, 2, 3, 4, 6, 12]. o: w (840), rh (58),
                                      size (26), cols. Origin top-left. g.row(r, p) fades a row in;
                                      g.hl(r, k, p) highlights the first k cells of row r
     mkBarModel(parent, o)            Singapore bar model. o: rows [{ name, units, col, label | labels [] }],
                                      unit (px per unit, 90), h (64), gap (28), size (28), ink,
                                      braces [{ row, from, to, text, below }] (unit indices), total (text: a
                                      brace down the right of all rows). Origin top-left of the first bar (names
                                      sit to the left). g.row(i, p) grows row i; g.brace(i, p); g.total(p)
     mkBrace(parent, x1, y1, x2, y2, o)  curly brace from (x1,y1) to (x2,y2), bulging left of the direction of
                                      travel (above a left-to-right brace, right of a top-to-bottom one;
                                      o.flip for the other side). o: text (mkText markup), col, size (28),
                                      depth (22). g.set(p)
     mkHundredSquare(parent, o)       10 x 10 grid, centred. o: cell (40), col, ink, empty, byCols.
                                      g.set(n) shades n squares (fractions allowed)
     mkPie(parent, values, o)         pie chart, centred, starting at 12 o'clock, clockwise. o: r (170), cols,
                                      labels (markup per sector), size (28), ink, stroke. g.set(p) sweeps it in

   STATISTICS
     mkBarChart(parent, o)            o: cats, vals, max, step, w (560), h (320), col | cols, size (26), ink,
                                      yName, xName, values (show values). Origin = bottom-left corner of the axes.
                                      g.set(p) grows the bars; g.bars[i] (rects, to highlight)
     mkTally(parent, n, o)            tally marks in gates of five. o: max (n), h (64), col. Origin top-left.
                                      g.set(k) shows k marks; g.w
     mkStemLeaf(parent, rows, o)      stem-and-leaf. rows [[stem, [leaves]]]. o: key ('Key: 3 | 2 means 32'),
                                      size (32), ink. Origin top-left. g.set(k) shows the first k leaves
     mkTable(parent, rows, o)         table of markup cells. o: colW (number or [..]), rowH, size (28), ink,
                                      head (true: first row is a header), side (true: first column is a header),
                                      fill, headFill. Origin top-left. g.cells[r][c] (<g>s, op() them),
                                      g.cell(r, c) -> { x, y, w, h }, g.mark(r, c, col) -> rect with .set(p)
     mkTwoWayTable(parent, o)         o: rows ['Boys', 'Girls'], cols ['Cycle', 'Walk'], data [[..], [..]],
                                      totals (true), corner (''), + mkTable options. Same API as mkTable
     mkVenn(parent, o)                two sets in a universal set, centred. o: w (600), h (380), labels ['A','B'],
                                      counts { a, b, ab, none } (only-A, only-B, both, neither), cols, ink.
                                      g.hl(region, p): 'A' 'B' 'AB' 'Aonly' 'Bonly' 'AorB' 'none';
                                      g.counts[region] (text groups, op() them)

   PROBABILITY
     mkTreeDiagram(parent, o)         two-stage tree. o: first [{ l, p }], second [{ l, p }] (same for every
                                      branch) or [[...], [...]], w (620), h (420), size (30), outcomes (true),
                                      products ([markup per leaf]). Origin = the root.
                                      g.branch(stage, i, p); g.set(p) (whole tree in order); g.hl(leaf, p)
     mkDice(parent, face, o)          die, centred. o: size (90), col, pip. g.set(face 1..6, tilt degrees)
     mkSpinner(parent, sectors, o)    spinner, centred. sectors: n (equal, labelled 1..n) or
                                      [{ label, col, w (weight) }]. o: r (150), size. g.set(deg) arrow angle
                                      (0 = up, clockwise); g.land(p, k, turns) spins and lands in sector k

   GEOMETRY AND MEASURES
     mkProtractor(parent, r, o)       180° protractor (r 300), centre of its straight edge at (0,0); outer scale from the
                                      left, inner (red) from the right. o: col (body), ink, inner (false hides it).
                                      g.set(deg, p) measuring arm at deg (anticlockwise from the right
                                      baseline), highlight arc and a readout "deg°"
     mkRuler(parent, cm, o)           ruler, the 0 mark at (0,0) on its top edge. o: unit (px per cm, 56).
                                      g.set(v, p) a marker at v cm with a readout
     mkCompass(parent, o)             pair of compasses, needle point at (0,0). o: leg (170), col, arcCol.
                                      g.set({ r, rot, from }) opens it to radius r (px) with the pencil at rot
                                      (degrees, screen: 0 right, 90 down) and draws the arc from `from` to rot
     mkAngleMark(parent, x, y, a1, a2, o)  angle mark at vertex (x,y) from direction a1 to a2 (degrees, maths
                                      convention: anticlockwise from the right). o: r (46), label (markup),
                                      col, size (28), right (draw the square; automatic when the angle is 90),
                                      fill (shaded wedge), lr (label distance). g.set(p)
     mkPolygon(parent, n, r, o)       regular n-gon, centred, flat side at the bottom. o: col, fill, rot,
                                      interior (true or [vertex indices]), exterior (true or [...]),
                                      intLabel, extLabel (markup; default the angle in degrees), size (26).
                                      g.set(p) draws the outline; g.int(p), g.ext(p); g.verts
     mkTriangle(parent, pts, o)       triangle through pts [[x,y] x3]. o: sides [3 labels: AB, BC, CA],
                                      angles [3 labels], verts ['A','B','C'], right (vertex index), col, fill,
                                      size (28). g.set(p) outline; g.labels(p)
     mkCircleParts(parent, r, o)      circle with its parts, centred. o: col, hi (highlight colour), size (28).
                                      g.show(part, p): 'centre' 'radius' 'diameter' 'chord' 'arc' 'sector'
                                      'segment' 'tangent' 'circumference'
     mkCuboid(parent, l, w, h, o)     cuboid in oblique view, front-bottom-left corner at (0,0). o: unit (40 px),
                                      labels [l, w, h] (markup), col, hidden (true: dashed hidden edges).
                                      g.set(p); g.labels(p)
     mkPrism(parent, face, dv, o)     prism from a front face (pts) pushed back by the vector dv [dx, dy].
                                      o: col, labels [{ edge: i, text }], depthLabel, hidden (true). g.set(p)
     mkCylinder(parent, r, h, o)      cylinder, centre of the base at (0,0). o: col, rLabel, hLabel, tilt (0.3).
                                      g.set(p); g.fill(p) liquid level
     mkAlgebraTile(parent, kind, o)   algebra tile 'x2' | 'x' | '1'; o: neg, unit (44), xlen, vertical. Top-left origin.

   MONEY, SHOPS, SINGAPORE
     mkCoin(parent, value, o)         '5c' '10c' '20c' '50c' '$1' coin, centred. o: s (scale)
     mkNote(parent, value, o)         '$2' '$5' '$10' '$50' '$100' note, centred, 250 x 124
     mkPriceTag(parent, text, o)      hanging price tag, origin = the hole. o: col, old (crossed-out price),
                                      size (40), string (true). g.set(swing degrees)
     mkReceipt(parent, o)             till receipt, origin top-centre. o: title, items [[name, price]],
                                      total [label, price], w (380), size (26), footer. g.set(k) prints k rows
     mkHawkerMenu(parent, o)          hawker-stall signboard, origin top-centre. o: title, sub, items [[name,
                                      price]], w (520), col, size (30). g.hl(i, p) highlights item i
     mkCalculator(parent, o)          calculator, centred, 260 x 400. g.set(text) display; g.press(key, p)
     mkMRTMap(parent, o)              MRT line strip. o: stations [names], dists [km between], col
                                      ('#009645'), len (900) or scale (px per km), equal (even spacing), size (26),
                                      unit ('km'), names ('above' | 'below' | 'alt'; default above, alt when crowded).
                                      Origin = the first station. g.x[i]; g.train(pos) (pos = station index,
                                      fractions between; < 0 hides); g.hl(i, p) highlights segment i
     mkThermometer(parent, o)         thermometer with a scale. o: min (-10), max (40), step (10), minor (2),
                                      h (360), unit ('°C'), size (26), readout (true). Bulb centre at (0,0).
                                      g.set(v) (degrees)

   PATTERNS, ALGEBRA
     mkSequenceTiles(parent, o)       growing pattern. o: terms [1, 2, 3, 4], shape 'L' | 'row' | 'square' |
                                      'rect' | 'stairs' | 'cross' | (n => [[c, r], ...]), cell (26), gap (60),
                                      col, labels (true), counts (true), labelFn (n, i), countFn (n, count). Origin = bottom-left of the first slot.
                                      g.set(k) reveals k patterns (fractions grow the next one); g.w
     mkBalance(parent, o)             balance scales, base at (0,0). o: arm (210), col. g.left, g.right: <g>s
                                      on each pan's surface (put tiles or weights there); g.set(tilt -1..1)

   SITCOM PROPS
     mkSpeechBubble(parent, text, o)  speech bubble, centred, text = mkText markup. o: size (30), tail 'left' |
                                      'right' | 'down' | 'up' | 'none', tailX (offset), w (min width), fill, ink.
                                      g.w, g.h; g.set(p) pops it in
     mkThoughtBubble(parent, text, o) thought cloud with a trail of circles (o.tail as above). g.set(p)
     mkStamp(parent, text, col)       rubber stamp ("DENIED", "CORRECT", "CASE CLOSED"); g.set(p) thumps it in
     mkChip(parent, text, o)          key-word chip, centred, text = mkText markup. o: size (30), col (outline
                                      and text), fill, solid (filled with col, dark text). g.w; g.set(p) pops

   SMALL HELPERS
     MK                               palette: ink, paper, board, chalk, wood, red, blue, green, amber ...
     MK_COLS                          series colours for sectors, bars and rows
     mkFmt(v, dp)                     number -> string, '−' for negatives, trailing zeros trimmed
     mkShade(hex, k)                  lighten (k > 0) or darken (k < 0) a #rrggbb colour
     mkArcD(cx, cy, r, a0, a1)        SVG arc path (screen degrees, clockwise when a1 > a0)
     mkPoly(pts)                      closed path through [[x, y], ...]
     mkDash(el), mkDraw(el, p)        make a path drawable, then draw it to fraction p
   ========================================================================== */

const MK = {
  ink: '#2A1A22', paper: '#FFFDF6', board: '#F7FAFC', chalkBoard: '#22513F', chalk: '#F4F1E8',
  wood: '#9C6B3E', woodDk: '#6B4423', red: '#E8424F', blue: '#3B82F6', green: '#2FA36B', amber: '#FFC247',
  grid: 'rgba(159,216,255,0.22)', gridInk: 'rgba(42,26,34,0.18)', muted: '#A4BCCB', hi: '#FFE45C',
};
const MK_COLS = ['#FFC247', '#4CC9F0', '#FF6B5C', '#56D69B', '#B48CFF', '#FF8A3D', '#F7A8C8', '#8F9CAB'];
let MK_ID = 0;

function mkFmt(v, dp) {
  const n = +(+v).toFixed(dp === undefined ? 6 : dp);
  return (n < 0 ? '−' : '') + String(Math.abs(n));
}
function mkPoly(pts) { return 'M' + pts.map(p => (+p[0]).toFixed(1) + ',' + (+p[1]).toFixed(1)).join(' L') + ' Z'; }
function mkDash(el) { el.setAttribute('pathLength', 1); el.setAttribute('stroke-dasharray', '1 1'); el.setAttribute('stroke-dashoffset', 0); return el; }
function mkDraw(el, p) { el.setAttribute('stroke-dashoffset', (1 - clamp(p)).toFixed(4)); }
/* arc path around (cx, cy), radius r, from screen angle a0 to a1 (degrees, clockwise when a1 > a0) */
function mkArcD(cx, cy, r, a0, a1) {
  const s = a0 * Math.PI / 180, e = a1 * Math.PI / 180, big = Math.abs(a1 - a0) > 180 ? 1 : 0, sw = a1 > a0 ? 1 : 0;
  return `M${(cx + r * Math.cos(s)).toFixed(2)},${(cy + r * Math.sin(s)).toFixed(2)} A${r},${r} 0 ${big} ${sw} ${(cx + r * Math.cos(e)).toFixed(2)},${(cy + r * Math.sin(e)).toFixed(2)}`;
}
function mkPopIn(g, p, s) { p = clamp(p); op(g, clamp(p * 3)); const k = (s || 1) * (0.55 + 0.45 * pop(p)); g.firstChild && g.firstChild.setAttribute('transform', `scale(${Math.max(0.01, k).toFixed(4)})`); }

/* ---------------------------------------------------------------- maths typesetting */
const MK_FUNCS = new Set(['sin', 'cos', 'tan', 'log', 'ln', 'max', 'min', 'mod', 'HCF', 'LCM', 'hcf', 'lcm', 'mean', 'median', 'mode', 'range']);
const MK_UNITS = new Set(['cm', 'mm', 'km', 'kg', 'mg', 'ml', 'mL', 'mph', 'kmh', 'min', 'hr', 'hrs', 'sec', 'cm2', 'cm3', 'm2', 'm3',
  'litres', 'litre', 'days', 'day', 'hours', 'hour', 'mins', 'secs', 'kWh', 'kW', 'cm²', 'cm³', 'm²', 'm³']);
const MK_OPS2 = { '<=': '≤', '>=': '≥', '!=': '≠', '+-': '±', '->': '→', '~=': '≈', '=>': '⇒' };
const MK_OPS1 = { '-': '−', '*': '×' };
const MK_BIN = new Set(['+', '−', '×', '÷', '=', '<', '>', '≤', '≥', '≠', '±', '≈', '→', '⇒', ':', '·', '∴', '∶']);
const MK_PATHOP = new Set(['≤', '≥', '≠', '≈', '→', '⇒']);

function mkLex(src) {
  const out = []; let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (/\s/.test(c)) { const j = i; while (i < src.length && /\s/.test(src[i])) i++; out.push({ k: 'sp', n: i - j }); continue; }
    if (c === '"') {
      const j = src.indexOf('"', i + 1);
      out.push({ k: 'text', v: src.slice(i + 1, j < 0 ? src.length : j) }); i = j < 0 ? src.length : j + 1; continue;
    }
    if (c === '\\' && src[i + 1] === '/') { out.push({ k: 'op', v: '/', lit: true }); i += 2; continue; }
    if (/[0-9]/.test(c) || (c === '.' && /[0-9]/.test(src[i + 1] || ''))) {
      const m = src.slice(i).match(/^(?:\d{1,3}(?:,\d{3})+(?!\d)(?:\.\d+)?|\d+(?:\.\d+)?|\.\d+)/);
      out.push({ k: 'num', v: m[0] }); i += m[0].length; continue;
    }
    if (/[A-Za-zα-ωΑ-Ωθπ]/.test(c)) { const m = src.slice(i).match(/^[A-Za-zα-ωΑ-Ωθπ]+/); out.push({ k: 'word', v: m[0] }); i += m[0].length; continue; }
    if ('([{'.includes(c)) { out.push({ k: 'lp', v: c }); i++; continue; }
    if (')]}'.includes(c)) { out.push({ k: 'rp', v: c }); i++; continue; }
    const two = src.slice(i, i + 2);
    if (MK_OPS2[two]) { out.push({ k: 'op', v: MK_OPS2[two] }); i += 2; continue; }
    if (c === '√') { out.push({ k: 'word', v: 'sqrt' }); i++; continue; }
    if (c === '²' || c === '³') { out.push({ k: 'op', v: '^' }); out.push({ k: 'num', v: c === '²' ? '2' : '3' }); i++; continue; }
    out.push({ k: 'op', v: MK_OPS1[c] || c }); i++;
  }
  return out;
}
function mkParse(toks) {
  let i = 0;
  const peek = () => toks[i];
  const skipSp = () => { while (peek() && peek().k === 'sp') i++; };
  const strip = n => (n && n.t === 'grp' ? { t: 'row', kids: n.kids } : n);
  const isSlash = t => t && t.k === 'op' && t.v === '/' && !t.lit;
  function seq(stop) {
    const kids = [];
    for (;;) {
      const t = peek(); if (!t) break;
      if (t.k === 'rp') { if (stop) break; i++; if (t.v !== '}') kids.push({ t: 'op', v: t.v }); continue; }
      if (t.k === 'sp') { i++; kids.push({ t: 'sp', n: t.n }); continue; }
      kids.push(frac());
    }
    return { t: 'row', kids };
  }
  function frac() {
    let left = powered();
    for (;;) {
      const save = i;
      if (peek() && peek().k === 'sp' && isSlash(toks[i + 1])) i++;
      if (isSlash(peek())) { i++; skipSp(); const right = powered(); left = { t: 'frac', n: strip(left), d: strip(right) }; }
      else { i = save; return left; }
    }
  }
  function script() {
    const t = peek();
    if (t && t.k === 'op' && (t.v === '−' || t.v === '+')) { i++; const n = base(); return { t: 'row', kids: [{ t: 'op', v: t.v, unary: true }, strip(n)] }; }
    return strip(base(true));
  }
  function powered() {
    let b = base();
    for (;;) {
      const t = peek();
      if (t && t.k === 'op' && (t.v === '^' || t.v === '_')) { i++; b = { t: t.v === '^' ? 'sup' : 'sub', b, s: script() }; }
      else return b;
    }
  }
  function base(single) {
    const t = peek();
    if (!t) return { t: 'row', kids: [] };
    i++;
    if (t.k === 'lp') {
      const inner = seq(true), c = peek(); let close = '';
      if (c && c.k === 'rp') { i++; close = c.v === '}' ? '' : c.v; }
      return { t: 'grp', open: t.v === '{' ? '' : t.v, close, kids: inner.kids };
    }
    if (t.k === 'text') return { t: 'text', v: t.v };
    if (t.k === 'num') {
      const n = { t: 'num', v: t.v }, w = peek();
      if (!single && w && w.k === 'word' && !MK_FUNCS.has(w.v) && w.v !== 'sqrt' && w.v !== 'cbrt' && !MK_UNITS.has(w.v)) { i++; return { t: 'row', kids: [n, { t: 'word', v: w.v }] }; }
      return n;
    }
    if (t.k === 'word') {
      if (t.v === 'sqrt' || t.v === 'cbrt') { skipSp(); return { t: 'sqrt', x: strip(base()), idx: t.v === 'cbrt' ? '3' : '' }; }
      return { t: 'word', v: t.v };
    }
    if (t.k === 'op') return { t: 'op', v: t.v };
    return { t: 'row', kids: [] };
  }
  return seq(false);
}
function mkBoxOf(w, a, d, items) { return { w, a, d, items: items || [] }; }
function mkPut(dst, box, dx, dy) { for (const it of box.items) dst.push(Object.assign({}, it, { x: it.x + dx, y: it.y + dy })); }
function mkTextBox(str, s, ctx, italic) {
  const w = textWidth(str, s, ctx.font, ctx.weight) + (italic ? s * 0.07 : 0);
  const a = /[0-9A-Zbdfhklt(\[|√πθ$%°'!?{}]/.test(str) ? 0.74 * s : 0.54 * s;
  const d = /[gjpqy(),;\[\]|{}]/.test(str) ? 0.2 * s : 0.03 * s;
  return mkBoxOf(w, a, d, [{ k: 't', x: italic ? s * 0.02 : 0, y: 0, str, s, it: italic }]);
}
function mkOpBox(g, s) {
  const m = -0.31 * s, sw = Math.max(2, 0.075 * s), f = v => (v * s).toFixed(2), Y = v => (m + v * s).toFixed(2);
  let d = '', w = 0.62 * s;
  if (g === '≤') d = `M${f(0.54)},${Y(-0.3)} L${f(0.08)},${Y(-0.08)} L${f(0.54)},${Y(0.14)} M${f(0.08)},${Y(0.3)} L${f(0.54)},${Y(0.3)}`;
  else if (g === '≥') d = `M${f(0.08)},${Y(-0.3)} L${f(0.54)},${Y(-0.08)} L${f(0.08)},${Y(0.14)} M${f(0.08)},${Y(0.3)} L${f(0.54)},${Y(0.3)}`;
  else if (g === '≠') d = `M${f(0.06)},${Y(-0.11)} L${f(0.56)},${Y(-0.11)} M${f(0.06)},${Y(0.11)} L${f(0.56)},${Y(0.11)} M${f(0.42)},${Y(-0.34)} L${f(0.2)},${Y(0.34)}`;
  else if (g === '≈') d = `M${f(0.06)},${Y(-0.1)} q${f(0.125)},${f(-0.12)} ${f(0.25)},0 t${f(0.25)},0 M${f(0.06)},${Y(0.12)} q${f(0.125)},${f(-0.12)} ${f(0.25)},0 t${f(0.25)},0`;
  else if (g === '→') { w = 0.9 * s; d = `M${f(0.06)},${Y(0)} L${f(0.82)},${Y(0)} M${f(0.62)},${Y(-0.17)} L${f(0.84)},${Y(0)} L${f(0.62)},${Y(0.17)}`; }
  else if (g === '⇒') { w = 0.9 * s; d = `M${f(0.06)},${Y(-0.09)} L${f(0.7)},${Y(-0.09)} M${f(0.06)},${Y(0.09)} L${f(0.7)},${Y(0.09)} M${f(0.58)},${Y(-0.24)} L${f(0.84)},${Y(0)} L${f(0.58)},${Y(0.24)}`; }
  return mkBoxOf(w, 0.7 * s, 0.05 * s, [{ k: 'p', x: 0, y: 0, d, sw }]);
}
function mkPiBox(s) {   // π drawn as strokes, so it matches the maths font's weight in every browser
  const f = v => (v * s).toFixed(2);
  const d = `M${f(0.06)},${f(-0.44)} Q${f(0.1)},${f(-0.54)} ${f(0.22)},${f(-0.54)} L${f(0.62)},${f(-0.54)} M${f(0.25)},${f(-0.54)} Q${f(0.25)},${f(-0.2)} ${f(0.17)},${f(-0.02)} M${f(0.47)},${f(-0.54)} Q${f(0.44)},${f(-0.12)} ${f(0.52)},${f(-0.04)} Q${f(0.58)},${f(0)} ${f(0.64)},${f(-0.07)}`;
  return mkBoxOf(0.72 * s, 0.6 * s, 0.03 * s, [{ k: 'p', x: 0.02 * s, y: 0, d, sw: Math.max(2, 0.085 * s) }]);
}
function mkBracket(ch, top, bot, s) {
  const mid = (top + bot) / 2, w = 0.36 * s, f = v => (v * s).toFixed(2);
  let d;
  if (ch === '(') d = `M${f(0.27)},${top.toFixed(2)} Q${f(0.0)},${mid.toFixed(2)} ${f(0.27)},${bot.toFixed(2)}`;
  else if (ch === ')') d = `M${f(0.09)},${top.toFixed(2)} Q${f(0.36)},${mid.toFixed(2)} ${f(0.09)},${bot.toFixed(2)}`;
  else if (ch === '[') d = `M${f(0.28)},${top.toFixed(2)} L${f(0.1)},${top.toFixed(2)} L${f(0.1)},${bot.toFixed(2)} L${f(0.28)},${bot.toFixed(2)}`;
  else if (ch === ']') d = `M${f(0.08)},${top.toFixed(2)} L${f(0.26)},${top.toFixed(2)} L${f(0.26)},${bot.toFixed(2)} L${f(0.08)},${bot.toFixed(2)}`;
  else d = `M${f(0.18)},${top.toFixed(2)} L${f(0.18)},${bot.toFixed(2)}`;
  return mkBoxOf(w, -top, bot, [{ k: 'p', x: 0, y: 0, d, sw: Math.max(2, 0.07 * s) }]);
}
function mkRow(kids, s, ctx) {
  const items = []; let x = 0, A = 0.54 * s, D = 0.03 * s, prev = null, pend = 0, spaced = false, prevWord = false, wide = 0;
  for (const k of kids) {
    if (k.t === 'sp') { spaced = true; if (k.n >= 2) { wide = Math.min(1.2, 0.36 * k.n) * s; prev = null; } continue; }
    let kind = 'atom', gl = 0, gr = 0;
    if (k.t === 'op') {
      const v = k.v;
      if (v === ',' || v === ';') { kind = 'comma'; gr = 0.26 * s; }
      else if (v === '(' || v === '[') kind = 'open';
      else if (MK_BIN.has(v)) {
        if (k.unary || ((v === '−' || v === '+' || v === '±') && (prev === null || prev === 'bin' || prev === 'open' || prev === 'comma' || prev === 'unary'))) { kind = 'unary'; gr = 0.02 * s; }
        else { kind = 'bin'; gl = gr = (v === ':' ? 0.18 : v === '·' ? 0.1 : 0.24) * s; }
      }
    }
    const isWord = k.t === 'text' || (k.t === 'word' && k.v.length > 3);
    let gap = items.length ? Math.max(pend, gl) : 0;
    if (spaced && kind === 'atom' && prev === 'atom') gap = Math.max(gap, isWord && prevWord ? 0.3 * s : 0.14 * s);
    if (wide && x > 0) gap = Math.max(gap, wide);
    wide = 0;
    const b = mkLay(k, s, ctx);
    x += gap; mkPut(items, b, x, 0); x += b.w;
    A = Math.max(A, b.a); D = Math.max(D, b.d);
    pend = gr; prev = kind; spaced = false; prevWord = isWord;
  }
  return mkBoxOf(x, A, D, items);
}
function mkLay(n, s, ctx) {
  switch (n.t) {
    case 'row': return mkRow(n.kids, s, ctx);
    case 'num': return mkTextBox(n.v, s, ctx, false);
    case 'text': return mkTextBox(n.v, s, ctx, false);
    case 'word': {
      const v = n.v === 'pi' ? 'π' : n.v === 'theta' ? 'θ' : n.v;
      if (v === 'π') return mkPiBox(s);
      const up = !ctx.italic || MK_FUNCS.has(v) || MK_UNITS.has(v) || v.length > 3;
      return mkTextBox(v, s, ctx, !up);
    }
    case 'op': {
      if (!n.v) return mkBoxOf(0, 0, 0);
      if (MK_PATHOP.has(n.v)) return mkOpBox(n.v, s);
      return mkTextBox(n.v === '∶' ? ':' : n.v, s, ctx, false);
    }
    case 'grp': {
      const inner = mkRow(n.kids, s, ctx);
      if (!n.open && !n.close) return inner;
      const tall = inner.a > 0.9 * s || inner.d > 0.32 * s, items = [];
      let x = 0, A = inner.a, D = inner.d;
      const br = ch => {
        const b = tall ? mkBracket(ch, -(inner.a + 0.06 * s), inner.d + 0.06 * s, s) : mkTextBox(ch, s, ctx, false);
        mkPut(items, b, x, 0); x += b.w; A = Math.max(A, b.a); D = Math.max(D, b.d);
      };
      if (n.open) br(n.open);
      mkPut(items, inner, x, 0); x += inner.w;
      if (n.close) br(n.close);
      return mkBoxOf(x, A, D, items);
    }
    case 'frac': {
      const fs = Math.max(s * 0.88, ctx.s0 * 0.5);
      const nb = mkLay(n.n, fs, ctx), db = mkLay(n.d, fs, ctx);
      const axis = 0.31 * s, th = Math.max(2.5, 0.07 * s), gap = 0.12 * s, pad = 0.08 * s, side = 0.06 * s;
      const w = Math.max(nb.w, db.w) + 2 * pad, items = [];
      mkPut(items, nb, side + (w - nb.w) / 2, -axis - th / 2 - gap - nb.d);
      mkPut(items, db, side + (w - db.w) / 2, -axis + th / 2 + gap + db.a);
      items.push({ k: 'l', x: side, y: -axis, dx: w, dy: 0, sw: th });
      return mkBoxOf(w + 2 * side, axis + th / 2 + gap + nb.d + nb.a, gap + th / 2 + db.a + db.d - axis, items);
    }
    case 'sup': case 'sub': {
      const b = mkLay(n.b, s, ctx), ss = Math.max(s * 0.62, ctx.s0 * 0.42), sc = mkLay(n.s, ss, ctx), items = [];
      mkPut(items, b, 0, 0);
      const gx = b.w + 0.04 * s;
      if (n.t === 'sup') {
        const sh = Math.max(0.42 * s, b.a - 0.45 * ss);
        mkPut(items, sc, gx, -sh);
        return mkBoxOf(gx + sc.w, Math.max(b.a, sh + sc.a), Math.max(b.d, sc.d - sh), items);
      }
      const dr = Math.max(0.22 * s, b.d + sc.a * 0.4 - 0.1 * s);
      mkPut(items, sc, gx, dr);
      return mkBoxOf(gx + sc.w, Math.max(b.a, sc.a - dr), Math.max(b.d, dr + sc.d), items);
    }
    case 'sqrt': {
      const inner = mkLay(n.x, s, ctx), pad = 0.12 * s, sw = Math.max(2, 0.07 * s);
      const top = -(Math.max(inner.a, 0.7 * s) + pad), bot = Math.max(inner.d, 0.04 * s) + 0.02 * s, x0 = 0.6 * s, items = [];
      const f = v => v.toFixed(2);
      items.push({ k: 'p', x: 0, y: 0, sw, d: `M${f(0.02 * s)},${f(-0.3 * s)} L${f(0.13 * s)},${f(-0.37 * s)} L${f(0.3 * s)},${f(bot)} L${f(0.52 * s)},${f(top)} L${f(x0 + inner.w + 0.1 * s)},${f(top)}` });
      if (n.idx) items.push({ k: 't', x: 0.06 * s, y: -0.5 * s, str: n.idx, s: 0.42 * s, it: false });
      mkPut(items, inner, x0, 0);
      return mkBoxOf(x0 + inner.w + 0.14 * s, -top + sw, bot + sw / 2, items);
    }
  }
  return mkBoxOf(0, 0, 0);
}
function mkCtx(o) { o = o || {}; const s = o.size || 40; return { s, font: o.font || FD, weight: o.weight || 600, italic: o.italic !== false, s0: s }; }
function mkLayout(src, o) {
  const ctx = mkCtx(o);
  try { return mkLay(mkParse(mkLex(String(src).trim())), ctx.s, ctx); }
  catch (e) { console.warn('[mathkit] could not typeset', src, e); return mkTextBox(String(src), ctx.s, ctx, false); }
}
function mkMeasure(src, o) { const b = mkLayout(src, o); return { w: b.w, a: b.a, d: b.d }; }
function mkEmit(parent, box, x0, y0, o) {
  if (o.halo) {   // a halo in the background colour first, so a label stays readable over lines and grids
    const hw = Math.max(5, (o.size || 40) * 0.2);
    for (const it of box.items) {
      if (it.k === 't') E('text', { x: (x0 + it.x).toFixed(1), y: (y0 + it.y).toFixed(1), 'font-size': it.s.toFixed(1), 'font-family': o.font || FD, 'font-weight': o.weight || 600, fill: o.halo, stroke: o.halo, 'stroke-width': hw, 'stroke-linejoin': 'round', 'font-style': it.it ? 'italic' : null }, parent).textContent = it.str;
      else if (it.k === 'l') E('line', { x1: (x0 + it.x).toFixed(1), y1: (y0 + it.y).toFixed(1), x2: (x0 + it.x + it.dx).toFixed(1), y2: (y0 + it.y + it.dy).toFixed(1), stroke: o.halo, 'stroke-width': (it.sw + hw).toFixed(1), 'stroke-linecap': 'round' }, parent);
      else E('path', { d: it.d, transform: `translate(${(x0 + it.x).toFixed(1)} ${(y0 + it.y).toFixed(1)})`, fill: 'none', stroke: o.halo, 'stroke-width': (it.sw + hw).toFixed(1), 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, parent);
    }
  }
  const fill = o.fill || C.ink, font = o.font || FD, wt = o.weight || 600;
  for (const it of box.items) {
    if (it.k === 't') {
      E('text', { x: (x0 + it.x).toFixed(1), y: (y0 + it.y).toFixed(1), 'font-size': it.s.toFixed(1), 'font-family': font, 'font-weight': wt, fill, 'font-style': it.it ? 'italic' : null }, parent).textContent = it.str;
    } else if (it.k === 'l') {
      E('line', { x1: (x0 + it.x).toFixed(1), y1: (y0 + it.y).toFixed(1), x2: (x0 + it.x + it.dx).toFixed(1), y2: (y0 + it.y + it.dy).toFixed(1), stroke: fill, 'stroke-width': it.sw.toFixed(1), 'stroke-linecap': 'round' }, parent);
    } else if (it.k === 'p') {
      E('path', { d: it.d, transform: `translate(${(x0 + it.x).toFixed(1)} ${(y0 + it.y).toFixed(1)})`, fill: 'none', stroke: fill, 'stroke-width': it.sw.toFixed(1), 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, parent);
    }
  }
}
function mkMath(parent, x, y, src, o) {
  const g = G(parent);
  g._o = Object.assign({}, o || {}); g._x = x; g._y = y;
  mkMathSet(g, src);
  return g;
}
function mkMathSet(g, src) {
  src = String(src);
  if (g._src === src) return g;
  g._src = src;
  while (g.firstChild) g.removeChild(g.firstChild);
  const o = g._o, box = mkLayout(src, o), an = o.anchor || 'start';
  const x0 = g._x - (an === 'middle' ? box.w / 2 : an === 'end' ? box.w : 0);
  mkEmit(g, box, x0, g._y, o);
  g.w = box.w; g.a = box.a; g.d = box.d; g.h = box.a + box.d; g.x0 = x0;
  return g;
}

/* mixed text and {{maths}} */
let MK_SPACE = {};
function mkSpaceW(s, font, wt) { const k = s + font + wt; if (!(k in MK_SPACE)) MK_SPACE[k] = Math.max(s * 0.2, textWidth('a a', s, font, wt) - textWidth('aa', s, font, wt)); return MK_SPACE[k]; }
function mkText(parent, x, y, str, o) {
  o = o || {};
  const s = o.size || 30, font = o.font || FD, wt = o.weight || 600, fill = o.fill || C.ink, an = o.anchor || 'start';
  const g = G(parent), rows = [];
  String(str).split('\n').forEach(line => {
    const segs = []; let a = 0.74 * s, d = 0.22 * s, w = 0;
    line.split(/(\{\{.+?\}\})/).forEach(part => {
      if (!part) return;
      if (part.startsWith('{{') && part.endsWith('}}')) {
        const b = mkLayout(part.slice(2, -2), { size: s * (o.mathScale || 1.06), font, weight: wt, italic: o.italic });
        segs.push({ b, x: w }); w += b.w; a = Math.max(a, b.a); d = Math.max(d, b.d);
        return;
      }
      part.split(/(\*\*[^*]+\*\*)/).forEach(t => {
        if (!t) return;
        const bold = t.startsWith('**') && t.length > 4, raw = bold ? t.slice(2, -2) : t, ww = bold ? 800 : wt;
        const lead = (raw.match(/^\s+/) || [''])[0].length, trail = (raw.match(/\s+$/) || [''])[0].length, core = raw.trim();
        const sp = mkSpaceW(s, font, ww);
        w += lead * sp;
        if (core) { const tw = textWidth(core, s, font, ww); segs.push({ str: core, bold, x: w, ww }); w += tw; }
        w += trail * sp;
      });
    });
    rows.push({ segs, a, d, w });
  });
  let yy = y, W = 0;
  rows.forEach((r, i) => {
    if (i > 0) yy += rows[i - 1].d + r.a + (o.lh !== undefined ? o.lh : s * 0.22);
    const x0 = x - (an === 'middle' ? r.w / 2 : an === 'end' ? r.w : 0);
    r.segs.forEach(sg => {
      if (sg.b) mkEmit(g, sg.b, x0 + sg.x, yy, { fill: sg.fill || fill, font, weight: wt, halo: o.halo, size: s });
      else {
        if (o.halo) E('text', { x: (x0 + sg.x).toFixed(1), y: yy.toFixed(1), 'font-size': s, 'font-family': font, 'font-weight': sg.ww, fill: o.halo, stroke: o.halo, 'stroke-width': Math.max(5, s * 0.2), 'stroke-linejoin': 'round' }, g).textContent = sg.str;
        E('text', { x: (x0 + sg.x).toFixed(1), y: yy.toFixed(1), 'font-size': s, 'font-family': font, 'font-weight': sg.ww, fill: sg.bold && o.boldFill ? o.boldFill : fill }, g).textContent = sg.str;
      }
    });
    r.y = yy; W = Math.max(W, r.w);
  });
  g.w = W; g.top = y - rows[0].a; g.bottom = yy + rows[rows.length - 1].d; g.h = g.bottom - g.top; g.rows = rows;
  return g;
}

/* aligned working */
function mkSplitEq(src) {
  let depth = 0;
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if ('([{'.includes(c)) depth++;
    else if (')]}'.includes(c)) depth--;
    else if (c === '=' && depth === 0 && !'<>!='.includes(src[i - 1] || ' ') && src[i + 1] !== '>' && src[i + 1] !== '=') return [src.slice(0, i).trim(), src.slice(i + 1).trim()];
  }
  return null;
}
function mkWorking(parent, x, y, lines, o) {
  o = o || {};
  const s = o.size || 40, fill = o.fill || C.ink, mo = { size: s, font: o.font, weight: o.weight, italic: o.italic };
  const g = G(parent), eq = mkLayout('=', mo), eqGap = 0.26 * s;
  const L = lines.map(l => (typeof l === 'string' ? { m: l } : l)).map(l => {
    const sp = mkSplitEq(l.m);
    if (!sp) { const b = mkLayout(l.m, mo); return Object.assign({}, l, { whole: b, a: b.a, d: b.d }); }
    const lb = sp[0] ? mkLayout(sp[0], mo) : null, rb = sp[1] ? mkLayout(sp[1], mo) : null;
    return Object.assign({}, l, { lb, rb, a: Math.max(eq.a, lb ? lb.a : 0, rb ? rb.a : 0), d: Math.max(eq.d, lb ? lb.d : 0, rb ? rb.d : 0) });
  });
  const leftMost = Math.min(x - eq.w / 2 - eqGap, ...L.filter(l => l.lb).map(l => x - eq.w / 2 - eqGap - l.lb.w));
  let yy = y, right = x;
  g.lineY = []; g.lines = []; const hls = [], rings = [];
  const hlLayer = G(g);
  L.forEach((l, i) => {
    yy += (i ? L[i - 1].d + (o.gap !== undefined ? o.gap : 0.5 * s) : 0) + l.a;
    g.lineY.push(yy);
    const lg = G(g), inner = G(lg), col = l.col || fill;
    let x1, x2;
    if (l.whole) { mkEmit(inner, l.whole, leftMost, yy, Object.assign({}, mo, { fill: col })); x1 = leftMost; x2 = leftMost + l.whole.w; }
    else {
      if (l.lb) mkEmit(inner, l.lb, x - eq.w / 2 - eqGap - l.lb.w, yy, Object.assign({}, mo, { fill: col }));
      mkEmit(inner, eq, x - eq.w / 2, yy, Object.assign({}, mo, { fill: col }));
      if (l.rb) mkEmit(inner, l.rb, x + eq.w / 2 + eqGap, yy, Object.assign({}, mo, { fill: col }));
      x1 = l.lb ? x - eq.w / 2 - eqGap - l.lb.w : x - eq.w / 2; x2 = x + eq.w / 2 + eqGap + (l.rb ? l.rb.w : 0);
    }
    right = Math.max(right, x2);
    g.lines.push({ g: lg, inner, x1, x2, a: l.a, d: l.d, y: yy, l });
  });
  const noteX = o.noteX !== undefined ? x + o.noteX : right + 0.9 * s;
  g.lines.forEach((ln, i) => {
    if (ln.l.note) mkText(ln.inner, noteX, ln.y, ln.l.note, { size: o.noteSize || Math.round(s * 0.7), fill: ln.l.noteCol || o.noteCol || MK.muted });
    const h = E('rect', { x: leftMost - 0.3 * s, y: ln.y - ln.a - 0.16 * s, width: right - leftMost + 0.6 * s, height: ln.a + ln.d + 0.32 * s, rx: 0.2 * s, fill: o.hlCol || 'rgba(255,228,92,0.22)' }, hlLayer);
    op(h, 0); hls.push(h);
    const rx1 = ln.l.whole ? ln.x1 : x + eq.w / 2 + eqGap;
    const rg = E('rect', { x: rx1 - 0.2 * s, y: ln.y - ln.a - 0.14 * s, width: ln.x2 - rx1 + 0.4 * s, height: ln.a + ln.d + 0.28 * s, rx: 0.14 * s, fill: 'none', stroke: o.ringCol || C.good, 'stroke-width': Math.max(3, s * 0.08) }, ln.g);
    op(rg, 0); rings.push(rg);
  });
  const slide = o.slide !== undefined ? o.slide : 24;
  g.show = (i, p) => { const ln = g.lines[i]; if (!ln) return; p = clamp(p); op(ln.g, p); tr(ln.inner, -slide * (1 - easeOut(p)), 0); };
  g.set = k => g.lines.forEach((ln, i) => g.show(i, clamp(k - i)));
  g.hl = (i, p) => { if (hls[i]) op(hls[i], p); };
  g.ring = (i, p) => { if (rings[i]) op(rings[i], p); };
  g.w = right - leftMost; g.h = yy + L[L.length - 1].d - y; g.left = leftMost; g.right = right;
  g.set(lines.length);
  return g;
}

/* ---------------------------------------------------------------- boards */
function mkWhiteboard(parent, w, h, o) {
  o = o || {}; w = w || 760; h = h || 460;
  const g = G(parent);
  if (o.stand) {
    E('path', { d: `M${-w * 0.36},${h / 2} L${-w * 0.42},${h / 2 + 170} M${w * 0.36},${h / 2} L${w * 0.42},${h / 2 + 170} M${-w * 0.39},${h / 2 + 120} L${w * 0.39},${h / 2 + 120}`, stroke: '#8F9CAB', 'stroke-width': 10, 'stroke-linecap': 'round' }, g);
  }
  E('rect', { x: -w / 2 - 14, y: -h / 2 - 14, width: w + 28, height: h + 28, rx: 14, fill: '#C9D3DC', stroke: '#7D8C99', 'stroke-width': 3 }, g);
  E('rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: 6, fill: MK.board }, g);
  E('path', { d: `M${w * 0.1},${-h / 2} L${w * 0.26},${-h / 2} L${-w * 0.02},${h / 2} L${-w * 0.18},${h / 2} Z`, fill: '#FFFFFF', opacity: 0.55 }, g);
  E('path', { d: `M${w * 0.3},${-h / 2} L${w * 0.35},${-h / 2} L${w * 0.07},${h / 2} L${w * 0.02},${h / 2} Z`, fill: '#FFFFFF', opacity: 0.5 }, g);
  E('rect', { x: -w * 0.3, y: h / 2 + 12, width: w * 0.6, height: 16, rx: 6, fill: '#AEB9C3', stroke: '#7D8C99', 'stroke-width': 2 }, g);
  ['#E8424F', '#2E7DD8', '#2A1A22'].forEach((c, i) => {
    E('rect', { x: -w * 0.22 + i * 64, y: h / 2 + 2, width: 50, height: 12, rx: 4, fill: '#F4F7FA', stroke: '#7D8C99', 'stroke-width': 1.5 }, g);
    E('rect', { x: -w * 0.22 + i * 64 + 34, y: h / 2 + 2, width: 16, height: 12, rx: 3, fill: c }, g);
  });
  if (o.title) T(g, -w / 2 + 30, -h / 2 + 52, o.title, { size: o.titleSize || 32, weight: 700, fill: MK.ink });
  g.ink = MK.ink; g.area = { x: -w / 2 + 24, y: -h / 2 + 24, w: w - 48, h: h - 48 }; g.content = G(g);
  return g;
}
function mkChalkboard(parent, w, h, o) {
  o = o || {}; w = w || 760; h = h || 460;
  const g = G(parent);
  E('rect', { x: -w / 2 - 22, y: -h / 2 - 22, width: w + 44, height: h + 44, rx: 10, fill: linGrad('#B07A45', '#7A4E2A', true), stroke: MK.woodDk, 'stroke-width': 4 }, g);
  E('rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: 4, fill: linGrad('#2A6150', '#1B4537', true), stroke: '#143528', 'stroke-width': 3 }, g);
  const r = rng(Math.round(w + h));
  for (let i = 0; i < 6; i++) E('ellipse', { cx: (r() - 0.5) * w * 0.8, cy: (r() - 0.5) * h * 0.7, rx: 60 + r() * 120, ry: 20 + r() * 40, fill: '#FFFFFF', opacity: 0.035 + r() * 0.03, transform: `rotate(${(r() * 30 - 15).toFixed(0)})` }, g);
  E('rect', { x: -w / 2 - 10, y: h / 2 + 8, width: w + 20, height: 14, rx: 4, fill: '#8A5A2B', stroke: MK.woodDk, 'stroke-width': 2 }, g);
  E('rect', { x: w * 0.2, y: h / 2 - 8, width: 70, height: 18, rx: 4, fill: '#3A4A58', stroke: '#22303A', 'stroke-width': 2 }, g);
  E('rect', { x: w * 0.2, y: h / 2 - 2, width: 70, height: 12, rx: 3, fill: '#D9D3C4' }, g);
  ['#F4F1E8', '#FFE45C', '#F7A8C8'].forEach((c, i) => E('rect', { x: -w * 0.3 + i * 40, y: h / 2 + 1, width: 30, height: 8, rx: 4, fill: c }, g));
  if (o.title) T(g, -w / 2 + 30, -h / 2 + 52, o.title, { size: o.titleSize || 32, weight: 700, fill: MK.chalk });
  g.ink = MK.chalk; g.area = { x: -w / 2 + 24, y: -h / 2 + 24, w: w - 48, h: h - 48 }; g.content = G(g);
  return g;
}

/* ---------------------------------------------------------------- number line */
function mkNumberLine(parent, o) {
  o = o || {};
  const from = o.from !== undefined ? o.from : -5, to = o.to !== undefined ? o.to : 5, step = o.step || 1, len = o.len || 900;
  const ink = o.ink || C.ink, s = o.size || 30, g = G(parent);
  const X = v => (v - from) / (to - from) * len; g.x = X;
  const ext = o.arrows === false ? 6 : 34;
  E('line', { x1: -ext, y1: 0, x2: len + ext, y2: 0, stroke: ink, 'stroke-width': 5, 'stroke-linecap': 'round' }, g);
  if (o.arrows !== false) {
    E('path', { d: `M${len + ext + 12},0 L${len + ext - 6},-11 L${len + ext - 6},11 Z`, fill: ink }, g);
    E('path', { d: `M${-ext - 12},0 L${-ext + 6},-11 L${-ext + 6},11 Z`, fill: ink }, g);
  }
  const n = Math.round((to - from) / step);
  let ticks = '';
  for (let k = 0; k <= n; k++) { const x = X(from + k * step); ticks += `M${x.toFixed(1)},-14 L${x.toFixed(1)},14 `; }
  if (o.minor) for (let k = 0; k < n * o.minor; k++) { if (k % o.minor === 0) continue; const x = X(from + k * step / o.minor); ticks += `M${x.toFixed(1)},-8 L${x.toFixed(1)},8 `; }
  E('path', { d: ticks, stroke: ink, 'stroke-width': 4, 'stroke-linecap': 'round' }, g);
  const lab = (v, str) => { const m = mkMath(g, X(v), 0, str, { size: s, anchor: 'middle', fill: ink }); tr(m, 0, 26 + m.a); return m; };
  const L = o.labels === undefined ? true : o.labels;
  if (Array.isArray(L)) L.forEach(it => lab(it[0], it[1]));
  else if (typeof L === 'function') { for (let k = 0; k <= n; k++) { const v = from + k * step, sv = L(v); if (sv !== null && sv !== undefined && sv !== '') lab(v, String(sv)); } }
  else if (L) { const every = L === true ? 1 : L; for (let k = 0; k <= n; k += every) { const v = +(from + k * step).toFixed(6); lab(v, v < 0 ? '-' + Math.abs(v) : String(v)); } }
  const markL = G(g), hopL = G(g);
  g.marks = (o.marks || []).map(m => {
    const mg = G(markL); tr(mg, X(m.v), 0); const inner = G(mg);
    E('circle', { r: 11, fill: m.col || MK.amber, stroke: MK.ink, 'stroke-width': 3 }, inner);
    if (m.label) mkText(inner, 0, -26, m.label, { size: m.size || s * 0.95, anchor: 'middle', fill: m.col || MK.amber });
    return mg;
  });
  g.mark = (i, p) => { const m = g.marks[i]; if (m) mkPopIn(m, p); };
  g.hops = (o.hops || []).map(h => {
    const x1 = X(h.a), x2 = X(h.b), dir = h.below ? 1 : -1, hh = h.height || Math.min(120, 30 + Math.abs(x2 - x1) * 0.32), col = h.col || MK.amber;
    const hg = G(hopL), c = dir * hh * 4 / 3;
    const path = mkDash(E('path', { d: `M${x1.toFixed(1)},${dir * 8} C${x1.toFixed(1)},${c.toFixed(1)} ${x2.toFixed(1)},${c.toFixed(1)} ${x2.toFixed(1)},${dir * 10}`, fill: 'none', stroke: col, 'stroke-width': 5, 'stroke-linecap': 'round' }, hg));
    const head = E('path', { d: `M${x2.toFixed(1)},${dir * 6} l-11,${dir * 18} l22,0 Z`, fill: col }, hg);
    const lb = h.label ? mkText(hg, (x1 + x2) / 2, dir < 0 ? -hh - 16 : hh + 16 + s * 0.8, h.label, { size: h.size || s * 0.9, anchor: 'middle', fill: col }) : null;
    hg.set = p => { p = clamp(p); op(hg, p > 0 ? 1 : 0); mkDraw(path, p); op(head, (p - 0.85) / 0.15); if (lb) op(lb, (p - 0.4) / 0.4); };
    hg.set(1);
    return hg;
  });
  g.hop = (i, p) => { if (g.hops[i]) g.hops[i].set(p); };
  if (o.pointer) {
    const pt = G(g); g.ptr = pt;
    E('path', { d: 'M0,-20 L-14,-44 L14,-44 Z', fill: o.pointerCol || MK.red, stroke: MK.ink, 'stroke-width': 2.5 }, pt);
    g.point = (v, p) => { tr(pt, X(v), 0); op(pt, p === undefined ? 1 : p); };
    g.point(from, 0);
  }
  g.len = len;
  return g;
}

/* ---------------------------------------------------------------- coordinate plane */
function mkAxes(parent, o) {
  o = o || {};
  const xmin = o.xmin !== undefined ? o.xmin : -5, xmax = o.xmax !== undefined ? o.xmax : 5, ymin = o.ymin !== undefined ? o.ymin : -5, ymax = o.ymax !== undefined ? o.ymax : 5;
  const ux = o.unit || (o.w ? o.w / (xmax - xmin) : 50), uy = o.unitY || (o.h ? o.h / (ymax - ymin) : ux);
  const W = (xmax - xmin) * ux, H = (ymax - ymin) * uy, ink = o.ink || C.ink, s = o.size || 26, step = o.step || 1;
  const px = x => (x - xmin) * ux, py = y => (ymax - y) * uy;
  const g = G(parent); g.px = px; g.py = py; g.W = W; g.H = H;
  const haloCol = o.halo || o.bg || (o.ink ? MK.paper : '#10293A');
  if (o.bg) E('rect', { x: -s * 2.4, y: -s * 1.6, width: W + s * 4, height: H + s * 3.4, rx: 16, fill: o.bg }, g);
  if (o.grid !== false) {
    let d = '';
    for (let x = Math.ceil(xmin / step) * step; x <= xmax + 1e-9; x += step) d += `M${px(x).toFixed(1)},0 L${px(x).toFixed(1)},${H.toFixed(1)} `;
    for (let y = Math.ceil(ymin / step) * step; y <= ymax + 1e-9; y += step) d += `M0,${py(y).toFixed(1)} L${W.toFixed(1)},${py(y).toFixed(1)} `;
    E('path', { d, stroke: o.gridCol || (o.ink ? MK.gridInk : MK.grid), 'stroke-width': 2 }, g);
  }
  const ay = ymin <= 0 && ymax >= 0 ? py(0) : py(ymin), ax = xmin <= 0 && xmax >= 0 ? px(0) : px(xmin);
  E('path', { d: `M-10,${ay} L${W + 18},${ay} M${ax},${H + 10} L${ax},-18`, stroke: ink, 'stroke-width': 4, 'stroke-linecap': 'round' }, g);
  E('path', { d: `M${W + 30},${ay} L${W + 14},${ay - 9} L${W + 14},${ay + 9} Z M${ax},-30 L${ax - 9},-14 L${ax + 9},-14 Z`, fill: ink }, g);
  mkMath(g, W + 40, ay + s * 0.35, o.xName || 'x', { size: s * 1.15, fill: ink });
  mkMath(g, ax + 16, -22, o.yName || 'y', { size: s * 1.15, fill: ink });
  const ls = o.labelStep || (ux < 34 ? step * 2 : step);
  let tk = '';
  for (let x = Math.ceil(xmin / ls) * ls; x <= xmax + 1e-9; x += ls) {
    if (Math.abs(x) < 1e-9 && xmin <= 0) continue;
    tk += `M${px(x).toFixed(1)},${ay - 7} L${px(x).toFixed(1)},${ay + 7} `;
    T(g, px(x), ay + 10 + s * 0.85, mkFmt(x), { size: s, anchor: 'middle', fill: ink, weight: 600 });
  }
  for (let y = Math.ceil(ymin / ls) * ls; y <= ymax + 1e-9; y += ls) {
    if (Math.abs(y) < 1e-9 && ymin <= 0) continue;
    tk += `M${ax - 7},${py(y).toFixed(1)} L${ax + 7},${py(y).toFixed(1)} `;
    T(g, ax - 12, py(y) + s * 0.35, mkFmt(y), { size: s, anchor: 'end', fill: ink, weight: 600 });
  }
  if (xmin <= 0 && ymin <= 0 && xmax >= 0 && ymax >= 0) T(g, ax - 10, ay + 8 + s * 0.85, '0', { size: s, anchor: 'end', fill: ink, weight: 600 });
  E('path', { d: tk, stroke: ink, 'stroke-width': 3 }, g);
  const plotL = G(g);
  const drawable = (el, extra) => { mkDash(el); el.set = p => { mkDraw(el, p); op(el, p > 0 ? 1 : 0); if (extra) op(extra, (p - 0.6) / 0.4); }; return el; };
  g.seg = (x1, y1, x2, y2, so) => {
    so = so || {};
    const el = E('path', { d: `M${px(x1).toFixed(1)},${py(y1).toFixed(1)} L${px(x2).toFixed(1)},${py(y2).toFixed(1)}`, fill: 'none', stroke: so.col || MK.amber, 'stroke-width': so.width || 5, 'stroke-linecap': 'round', 'stroke-dasharray': so.dash }, plotL);
    return so.dash ? Object.assign(el, { set: p => op(el, p) }) : drawable(el);
  };
  g.line = (m, c, lo) => {
    lo = lo || {};
    let xa = xmin, xb = xmax;
    if (m === 0) { if (c < ymin || c > ymax) return null; }
    else { const u = (ymin - c) / m, v = (ymax - c) / m; xa = Math.max(xmin, Math.min(u, v)); xb = Math.min(xmax, Math.max(u, v)); if (xa >= xb) return null; }
    const el = E('path', { d: `M${px(xa).toFixed(2)},${py(m * xa + c).toFixed(2)} L${px(xb).toFixed(2)},${py(m * xb + c).toFixed(2)}`, fill: 'none', stroke: lo.col || MK.amber, 'stroke-width': lo.width || 6, 'stroke-linecap': 'round' }, plotL);
    let lb = null;
    if (lo.label) {
      const lx = lo.labelAt !== undefined ? lo.labelAt : xa + (xb - xa) * 0.82, ly = m * lx + c;
      lb = mkMath(plotL, px(lx) + (lo.dx !== undefined ? lo.dx : 16), py(ly) + (lo.dy !== undefined ? lo.dy : -16), lo.label, { size: lo.size || s * 1.1, fill: lo.col || MK.amber, anchor: lo.anchor || (m > 0 ? 'end' : 'start'), halo: lo.halo === false ? null : (lo.halo || haloCol) });
    }
    el.label = lb; el.ends = [[xa, m * xa + c], [xb, m * xb + c]];
    return drawable(el, lb);
  };
  g.plot = (fn, po) => {
    po = po || {};
    const n = po.n || 120; let d = '', pen = false;
    for (let i = 0; i <= n; i++) {
      const x = xmin + (xmax - xmin) * i / n, y = fn(x);
      if (!isFinite(y) || y < ymin - 0.001 || y > ymax + 0.001) { pen = false; continue; }
      d += (pen ? 'L' : 'M') + px(x).toFixed(1) + ',' + py(y).toFixed(1) + ' '; pen = true;
    }
    return drawable(E('path', { d, fill: 'none', stroke: po.col || MK.amber, 'stroke-width': po.width || 5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, plotL));
  };
  g.poly = (pts, po) => {
    po = po || {};
    const el = E('path', { d: mkPoly(pts.map(p => [px(p[0]), py(p[1])])), fill: po.fill || 'rgba(76,201,240,0.3)', stroke: po.col || C.water, 'stroke-width': po.width || 4, 'stroke-linejoin': 'round' }, plotL);
    el.set = p => op(el, p);
    return el;
  };
  g.point = (x, y, po) => {
    po = po || {};
    const pg = G(plotL); tr(pg, px(x), py(y)); const inner = G(pg);
    E('circle', { r: po.r || 9, fill: po.col || MK.red, stroke: po.ring || '#FFFFFF', 'stroke-width': 3 }, inner);
    if (po.label) {
      const pos = po.pos || 'ne', ls = po.size || s;
      const dx = pos.includes('e') ? 16 : pos.includes('w') ? -16 : 0, dy = pos.includes('n') ? (pos.length > 1 ? -14 : -18) : pos.includes('s') ? (pos.length > 1 ? 14 + ls * 0.8 : 18 + ls * 0.8) : ls * 0.36;
      mkText(inner, dx, dy, po.label, { size: ls, anchor: pos.includes('e') ? 'start' : pos.includes('w') ? 'end' : 'middle', fill: po.labelCol || po.col || MK.red, halo: po.halo === false ? null : (po.halo || haloCol) });
    }
    pg.set = p => mkPopIn(pg, p);
    return pg;
  };
  return g;
}
function mkGrid(parent, o) {
  o = o || {};
  const cols = o.cols || 12, rows = o.rows || 8, c = o.cell || 44, ink = o.ink || C.ink, g = G(parent);
  if (o.bg) E('rect', { x: -12, y: -12, width: cols * c + 24, height: rows * c + 24, rx: 10, fill: o.bg }, g);
  const shadeL = G(g);
  if (o.dots) { let d = ''; for (let i = 0; i <= cols; i++) for (let j = 0; j <= rows; j++) d += `M${i * c},${j * c} h0.01 `; E('path', { d, stroke: ink, 'stroke-width': 7, 'stroke-linecap': 'round', opacity: 0.6 }, g); }
  else {
    let d = '';
    for (let i = 0; i <= cols; i++) d += `M${i * c},0 L${i * c},${rows * c} `;
    for (let j = 0; j <= rows; j++) d += `M0,${j * c} L${cols * c},${j * c} `;
    E('path', { d, stroke: o.gridCol || (o.ink ? MK.gridInk : 'rgba(159,216,255,0.35)'), 'stroke-width': 2 }, g);
    E('rect', { x: 0, y: 0, width: cols * c, height: rows * c, fill: 'none', stroke: o.gridCol || (o.ink ? MK.gridInk : 'rgba(159,216,255,0.5)'), 'stroke-width': 3 }, g);
  }
  g.at = (i, j) => [i * c, j * c];
  g.shade = (cells, col) => {
    const sg = G(shadeL);
    E('path', { d: cells.map(([i, j]) => `M${i * c + 2},${j * c + 2} h${c - 4} v${c - 4} h${-(c - 4)} Z`).join(' '), fill: col || MK.amber, opacity: 0.85 }, sg);
    sg.set = p => op(sg, p);
    return sg;
  };
  g.W = cols * c; g.H = rows * c; g.cell = c;
  return g;
}

/* ---------------------------------------------------------------- fractions, ratio, percent */
function mkFractionBar(parent, n, k, o) {
  o = o || {};
  const w = o.w || 560, h = o.h || 70, cw = w / n, col = o.col || MK.amber, ink = o.line || MK.ink, s = o.size || 30, g = G(parent);
  E('rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: 6, fill: o.empty || '#EAF2F7' }, g);
  const fills = [];
  for (let i = 0; i < n; i++) fills.push(E('rect', { x: -w / 2 + i * cw, y: -h / 2, width: 0, height: h, fill: col }, g));
  let d = ''; for (let i = 1; i < n; i++) d += `M${(-w / 2 + i * cw).toFixed(1)},${-h / 2} L${(-w / 2 + i * cw).toFixed(1)},${h / 2} `;
  E('path', { d, stroke: ink, 'stroke-width': 3 }, g);
  E('rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: 6, fill: 'none', stroke: ink, 'stroke-width': 4 }, g);
  if (o.cellLabels && cw >= s * 1.3) for (let i = 0; i < n; i++) { const m = mkMath(g, -w / 2 + (i + 0.5) * cw, 0, '1/' + n, { size: s * 0.9, anchor: 'middle', fill: o.cellInk || MK.ink }); tr(m, 0, (m.a - m.d) / 2); }
  if (o.label) { const m = mkMath(g, w / 2 + 28, 0, (o.label === true ? k + '/' + n : o.label), { size: s * 1.2, fill: o.labelCol || col }); tr(m, 0, (m.a - m.d) / 2); g.label = m; }   // (o.ink colours nothing here: o.line is the outline colour)
  g.set = v => fills.forEach((f, i) => attr(f, 'width', cw * clamp(v - i)));
  g.set(k);
  return g;
}
function mkFractionWall(parent, dens, o) {
  o = o || {};
  const w = o.w || 840, rh = o.rh || 58, gap = o.gap || 6, s = o.size || 26, g = G(parent);
  g.rows = []; const hls = [];
  dens.forEach((d, r) => {
    const rg = G(g), y = r * (rh + gap), col = (o.cols || MK_COLS)[r % 8], cw = w / d;
    E('rect', { x: 0, y, width: w, height: rh, fill: col, opacity: 0.32 }, rg);
    const hl = E('rect', { x: 0, y, width: 0, height: rh, fill: col, opacity: 0.9 }, rg); hls.push({ hl, cw });
    let p = ''; for (let i = 0; i <= d; i++) p += `M${(i * cw).toFixed(1)},${y} L${(i * cw).toFixed(1)},${y + rh} `;
    E('path', { d: p + `M0,${y} L${w},${y} M0,${y + rh} L${w},${y + rh}`, stroke: col, 'stroke-width': 3 }, rg);
    if (cw >= s * 1.6) for (let i = 0; i < d; i++) { const m = mkMath(rg, (i + 0.5) * cw, y + rh / 2, d === 1 ? '1' : '1/' + d, { size: s, anchor: 'middle', fill: o.ink || C.ink }); tr(m, 0, (m.a - m.d) / 2); }
    g.rows.push(rg);
  });
  g.row = (r, p) => { const rg = g.rows[r]; if (rg) { op(rg, p); tr(rg, -30 * (1 - easeOut(clamp(p))), 0); } };
  g.hl = (r, k, p) => { const h = hls[r]; if (h) { attr(h.hl, 'width', h.cw * k); op(h.hl, p); } };
  hls.forEach(h => op(h.hl, 0));
  g.W = w; g.H = dens.length * (rh + gap) - gap;
  return g;
}
function mkBrace(parent, x1, y1, x2, y2, o) {
  o = o || {};
  const g = G(parent), dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L;
  let nx = uy, ny = -ux; if (o.flip) { nx = -nx; ny = -ny; }
  const dep = o.depth || 22, h = dep / 2, r = Math.min(h, L / 8), mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  const P = (x, y) => `${x.toFixed(1)},${y.toFixed(1)}`;
  const d = `M${P(x1, y1)} Q${P(x1 + nx * h, y1 + ny * h)} ${P(x1 + nx * h + ux * r, y1 + ny * h + uy * r)} L${P(mx - ux * r + nx * h, my - uy * r + ny * h)} Q${P(mx + nx * h, my + ny * h)} ${P(mx + nx * dep, my + ny * dep)} Q${P(mx + nx * h, my + ny * h)} ${P(mx + ux * r + nx * h, my + uy * r + ny * h)} L${P(x2 - ux * r + nx * h, y2 - uy * r + ny * h)} Q${P(x2 + nx * h, y2 + ny * h)} ${P(x2, y2)}`;
  const col = o.col || C.ink, s = o.size || 28;
  E('path', { d, fill: 'none', stroke: col, 'stroke-width': o.width || 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
  if (o.text) {
    const tx = mx + nx * (dep + 12), ty = my + ny * (dep + 12);
    if (Math.abs(nx) > Math.abs(ny)) mkText(g, tx, ty + s * 0.35, o.text, { size: s, anchor: nx > 0 ? 'start' : 'end', fill: o.textCol || col });
    else mkText(g, tx, ny < 0 ? ty - 4 : ty + s * 0.8, o.text, { size: s, anchor: 'middle', fill: o.textCol || col });
  }
  g.set = p => op(g, p);
  return g;
}
function mkBarModel(parent, o) {
  o = o || {};
  const u = o.unit || 90, h = o.h || 64, gap = o.gap || 28, s = o.size || 28, ink = o.ink || C.ink, g = G(parent);
  g.rowsG = []; g.braces = [];
  let maxW = 0;
  (o.rows || []).forEach((r, i) => {
    const y = i * (h + gap), rg = G(g), col = r.col || MK_COLS[i % 8], cells = [];
    if (r.name) mkText(rg, -20, y + h / 2 + s * 0.35, r.name, { size: s, anchor: 'end', fill: r.nameCol || ink });
    const n = Math.ceil(r.units - 1e-9);
    for (let j = 0; j < n; j++) {
      const cw = u * Math.min(1, r.units - j), cg = G(rg);
      E('rect', { x: j * u, y, width: cw, height: h, fill: col, stroke: ink, 'stroke-width': 3 }, cg);
      const lab = r.labels ? r.labels[j] : r.label;
      if (lab) mkText(cg, j * u + cw / 2, y + h / 2 + s * 0.35, lab, { size: s, anchor: 'middle', fill: r.labelCol || MK.ink });
      cells.push(cg);
    }
    maxW = Math.max(maxW, r.units * u);
    rg.cells = cells; g.rowsG.push(rg);
  });
  const rowsH = (o.rows || []).length * (h + gap) - gap;
  (o.braces || []).forEach(b => {
    const y = b.row * (h + gap) + (b.below ? h + 8 : -8);
    g.braces.push(mkBrace(g, b.from * u, y, (b.to + 1) * u, y, { text: b.text, flip: !!b.below, col: b.col || ink, size: s }));
  });
  if (o.total) g.totalB = mkBrace(g, maxW + 16, 0, maxW + 16, rowsH, { text: o.total, col: o.totalCol || ink, size: s });
  g.row = (i, p) => { const rg = g.rowsG[i]; if (!rg) return; const n = rg.cells.length; rg.cells.forEach((c, j) => op(c, clamp(p * n - j))); };
  g.brace = (i, p) => { if (g.braces[i]) g.braces[i].set(p); };
  g.total = p => { if (g.totalB) g.totalB.set(p); };
  g.W = maxW; g.H = rowsH;
  return g;
}
function mkHundredSquare(parent, o) {
  o = o || {};
  const c = o.cell || 40, W = c * 10, col = o.col || MK.amber, ink = o.ink || C.ink, g = G(parent);
  const x0 = -W / 2, y0 = -W / 2;
  E('rect', { x: x0, y: y0, width: W, height: W, fill: o.empty || 'rgba(255,255,255,0.08)' }, g);
  const full = E('rect', { x: x0, y: y0, width: 0, height: 0, fill: col }, g), part = E('rect', { x: x0, y: y0, width: 0, height: 0, fill: col }, g);
  let d = '';
  for (let i = 0; i <= 10; i++) d += `M${x0 + i * c},${y0} L${x0 + i * c},${y0 + W} M${x0},${y0 + i * c} L${x0 + W},${y0 + i * c} `;
  E('path', { d, stroke: ink, 'stroke-width': 2.5 }, g);
  E('rect', { x: x0, y: y0, width: W, height: W, fill: 'none', stroke: ink, 'stroke-width': 4 }, g);
  g.set = n => {
    n = clamp(n, 0, 100); const k = Math.floor(n / 10), r = n - k * 10;
    if (o.byCols) { attr(full, 'width', k * c); attr(full, 'height', W); attr(part, 'x', x0 + k * c); attr(part, 'width', k < 10 ? c : 0); attr(part, 'height', r * c); }
    else { attr(full, 'width', W); attr(full, 'height', k * c); attr(part, 'y', y0 + k * c); attr(part, 'height', k < 10 ? c : 0); attr(part, 'width', r * c); }
  };
  g.set(o.n || 0); g.W = W;
  return g;
}
function mkPie(parent, vals, o) {
  o = o || {};
  const r = o.r || 170, tot = vals.reduce((a, b) => a + b, 0), s = o.size || 28, g = G(parent);
  const secs = []; let cum = 0;
  vals.forEach((v, i) => {
    const a0 = cum / tot * 360, a1 = (cum + v) / tot * 360; cum += v;
    const el = E('path', { d: '', fill: (o.cols || MK_COLS)[i % 8], stroke: o.stroke || '#0A1B27', 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
    secs.push({ el, a0, a1 });
  });
  const labs = secs.map((sc, i) => {
    const lab = o.labels && o.labels[i]; if (!lab) return null;
    const mid = ((sc.a0 + sc.a1) / 2 - 90) * Math.PI / 180, inside = sc.a1 - sc.a0 >= (o.minInside || 34);
    const rr = inside ? r * 0.6 : r + 26, x = Math.cos(mid) * rr, y = Math.sin(mid) * rr;
    const lg = G(g);
    if (!inside) E('line', { x1: Math.cos(mid) * r * 0.92, y1: Math.sin(mid) * r * 0.92, x2: Math.cos(mid) * (r + 14), y2: Math.sin(mid) * (r + 14), stroke: o.ink || C.ink, 'stroke-width': 2.5 }, lg);
    const t = mkText(lg, x + (inside ? 0 : Math.cos(mid) * 6), y + s * 0.35, lab, { size: s, anchor: inside ? 'middle' : (Math.cos(mid) >= 0 ? 'start' : 'end'), fill: inside ? (o.labelInk || MK.ink) : (o.ink || C.ink) });
    if (t.rows.length > 1) tr(t, 0, -(t.h - s) / 2);
    return lg;
  });
  g.set = p => {
    const sw = clamp(p) * 360;
    secs.forEach((sc, i) => {
      const e = Math.min(sc.a1, sw);
      if (e <= sc.a0 + 0.01) { attr(sc.el, 'd', ''); if (labs[i]) op(labs[i], 0); return; }
      if (e - sc.a0 >= 359.99) attr(sc.el, 'd', `M0,${-r} A${r},${r} 0 1 1 0,${r} A${r},${r} 0 1 1 0,${-r} Z`);
      else attr(sc.el, 'd', 'M0,0 L' + mkArcD(0, 0, r, sc.a0 - 90, e - 90).slice(1) + ' Z');
      if (labs[i]) op(labs[i], clamp((sw - (sc.a0 + sc.a1) / 2) / 25));
    });
  };
  g.set(1); g.secs = secs;
  return g;
}

/* ---------------------------------------------------------------- statistics */
function mkBarChart(parent, o) {
  o = o || {};
  const cats = o.cats || [], vals = o.vals || [], n = cats.length, w = o.w || 560, h = o.h || 320, s = o.size || 26, ink = o.ink || C.ink;
  const max = o.max || Math.max(...vals) * 1.1, step = o.step || Math.max(1, Math.round(max / 5)), g = G(parent);
  const bw = w / n, Y = v => -v / max * h;
  let gl = '';
  for (let v = 0; v <= max + 1e-9; v += step) { gl += `M0,${Y(v).toFixed(1)} L${w},${Y(v).toFixed(1)} `; T(g, -12, Y(v) + s * 0.35, mkFmt(v), { size: s, anchor: 'end', fill: ink, weight: 600 }); }
  E('path', { d: gl, stroke: o.ink ? MK.gridInk : MK.grid, 'stroke-width': 2, 'stroke-dasharray': '6 6' }, g);
  g.bars = []; const vl = [];
  vals.forEach((v, i) => {
    const b = E('rect', { x: i * bw + bw * 0.18, y: 0, width: bw * 0.64, height: 0, rx: 4, fill: o.cols ? o.cols[i % o.cols.length] : (o.col || MK.amber), stroke: o.stroke || 'none', 'stroke-width': 2 }, g);
    g.bars.push(b);
    mkText(g, (i + 0.5) * bw, s * 1.25, String(cats[i]), { size: s, anchor: 'middle', fill: ink });
    if (o.values) vl.push(T(g, (i + 0.5) * bw, Y(v) - 10, mkFmt(v), { size: s, anchor: 'middle', fill: ink, weight: 700 }));
  });
  E('path', { d: `M0,${-h - 14} L0,0 L${w + 10},0`, fill: 'none', stroke: ink, 'stroke-width': 4, 'stroke-linecap': 'round' }, g);
  if (o.xName) mkText(g, w / 2, s * 2.7, o.xName, { size: s, anchor: 'middle', fill: o.nameCol || MK.muted });
  if (o.yName) { const yn = mkText(g, 0, 0, o.yName, { size: s, anchor: 'middle', fill: o.nameCol || MK.muted }); yn.setAttribute('transform', `translate(${-s * 2.4} ${-h / 2}) rotate(-90)`); }
  g.set = p => vals.forEach((v, i) => { const k = p >= 1 ? 1 : ease(clamp((p - 0.5 * i / n) * 2)), hh = -Y(v) * k; attr(g.bars[i], 'y', -hh); attr(g.bars[i], 'height', hh); if (vl[i]) op(vl[i], k > 0.95 ? 1 : 0); });
  g.set(1); g.W = w; g.H = h;
  return g;
}
function mkTally(parent, n, o) {
  o = o || {};
  const max = o.max || n, h = o.h || 64, sp = o.spacing || 16, col = o.col || C.ink, g = G(parent), marks = [];
  let x = 0;
  for (let i = 0; i < max; i++) {
    const k = i % 5;
    if (k === 4) { const x0 = x - 4 * sp - 6; marks.push(E('line', { x1: x0, y1: h * 0.82, x2: x - sp + 6 + 6, y2: h * 0.12, stroke: col, 'stroke-width': 6, 'stroke-linecap': 'round' }, g)); x += 18; }
    else { marks.push(E('line', { x1: x, y1: 0, x2: x, y2: h, stroke: col, 'stroke-width': 6, 'stroke-linecap': 'round' }, g)); x += sp; }
  }
  g.w = x;
  g.set = k => marks.forEach((m, i) => op(m, clamp(k - i)));
  g.set(n);
  return g;
}
function mkStemLeaf(parent, rows, o) {
  o = o || {};
  const s = o.size || 32, ink = o.ink || C.ink, rh = s * 1.45, sw = s * 2.2, lw = s * 0.85, g = G(parent), leaves = [];
  T(g, sw - 18, s, 'Stem', { size: s * 0.8, anchor: 'end', fill: o.headCol || MK.muted, weight: 700 });
  T(g, sw + 18, s, 'Leaf', { size: s * 0.8, fill: o.headCol || MK.muted, weight: 700 });
  let maxL = 0;
  rows.forEach(([stem, lv], i) => {
    const y = s * 1.2 + (i + 1) * rh;
    T(g, sw - 18, y, String(stem), { size: s, anchor: 'end', fill: ink, weight: 700 });
    lv.forEach((l, j) => leaves.push(T(g, sw + 22 + j * lw, y, String(l), { size: s, fill: o.leafCol || ink, weight: 600 })));
    maxL = Math.max(maxL, lv.length);
  });
  const bottom = s * 1.2 + rows.length * rh + s * 0.45;
  E('path', { d: `M${sw},${s * 0.2} L${sw},${bottom} M${sw - 80},${s * 1.35} L${sw + 30 + Math.max(4, maxL) * lw},${s * 1.35}`, stroke: ink, 'stroke-width': 3.5 }, g);
  if (o.key) mkText(g, 0, bottom + s * 1.2, o.key, { size: s * 0.82, fill: o.keyCol || MK.muted });
  g.set = k => leaves.forEach((l, i) => op(l, clamp(k - i)));
  g.W = sw + 30 + Math.max(4, maxL) * lw; g.H = bottom + (o.key ? s * 1.4 : 0); g.leaves = leaves;
  return g;
}
function mkTable(parent, rows, o) {
  o = o || {};
  const s = o.size || 28, ink = o.ink || C.ink, nr = rows.length, nc = Math.max(...rows.map(r => r.length)), g = G(parent);
  const pad = s * 0.8, rh = o.rowH || s * 2;
  let colW = o.colW;
  if (!Array.isArray(colW)) {
    if (typeof colW === 'number') colW = Array(nc).fill(colW);
    else { colW = Array(nc).fill(0); rows.forEach(r => r.forEach((c, j) => { const t = String(c).replace(/\{\{|\}\}|\*\*/g, ''); colW[j] = Math.max(colW[j], textWidth(t, s, FD, 700) + 2 * pad); })); }
  }
  const xs = [0]; colW.forEach(w => xs.push(xs[xs.length - 1] + w));
  const W = xs[nc], H = nr * rh, head = o.head !== false, side = !!o.side;
  E('rect', { x: 0, y: 0, width: W, height: H, rx: 10, fill: o.fill || 'rgba(255,255,255,0.06)' }, g);
  if (head) E('rect', { x: 0, y: 0, width: W, height: rh, rx: 10, fill: o.headFill || 'rgba(76,201,240,0.28)' }, g);
  if (side) E('rect', { x: 0, y: head ? rh : 0, width: colW[0], height: H - (head ? rh : 0), fill: o.headFill || 'rgba(76,201,240,0.16)' }, g);
  const markL = G(g);
  let d = '';
  for (let i = 1; i < nr; i++) d += `M0,${i * rh} L${W},${i * rh} `;
  for (let j = 1; j < nc; j++) d += `M${xs[j]},0 L${xs[j]},${H} `;
  E('path', { d, stroke: ink, 'stroke-width': 2, opacity: 0.6 }, g);
  E('rect', { x: 0, y: 0, width: W, height: H, rx: 10, fill: 'none', stroke: ink, 'stroke-width': 3 }, g);
  g.cells = rows.map((r, i) => r.map((c, j) => {
    const cg = G(g);
    if (c !== '' && c !== null && c !== undefined) {
      const t = mkText(cg, xs[j] + colW[j] / 2, i * rh + rh / 2, String(c), { size: s, anchor: 'middle', fill: (head && i === 0) || (side && j === 0) ? (o.headInk || ink) : ink, weight: (head && i === 0) || (side && j === 0) ? 700 : 600 });
      tr(t, 0, (t.rows[0].a - t.rows[0].d) / 2);
    }
    return cg;
  }));
  g.cell = (i, j) => ({ x: xs[j], y: i * rh, w: colW[j], h: rh });
  g.mark = (i, j, col) => { const c = g.cell(i, j); const m = E('rect', { x: c.x + 3, y: c.y + 3, width: c.w - 6, height: c.h - 6, rx: 8, fill: col || 'rgba(255,228,92,0.35)', stroke: o.markStroke || MK.hi, 'stroke-width': 3 }, markL); m.set = p => op(m, p); m.set(0); return m; };
  g.W = W; g.H = H; g.xs = xs; g.rh = rh;
  return g;
}
function mkTwoWayTable(parent, o) {
  o = o || {};
  const R = o.rows || [], Cc = o.cols || [], D = o.data || [], tot = o.totals !== false;
  const rows = [[o.corner || ''].concat(Cc, tot ? ['Total'] : [])];
  R.forEach((r, i) => rows.push([r].concat(D[i].map(String), tot ? [String(D[i].reduce((a, b) => a + b, 0))] : [])));
  if (tot) {
    const ct = Cc.map((_, j) => D.reduce((a, r) => a + r[j], 0));
    rows.push(['Total'].concat(ct.map(String), [String(ct.reduce((a, b) => a + b, 0))]));
  }
  return mkTable(parent, rows, Object.assign({ side: true }, o));
}
function mkVenn(parent, o) {
  o = o || {};
  const w = o.w || 600, h = o.h || 380, r = h * 0.36, cx = r * 0.62, ink = o.ink || C.ink, s = o.size || 30, g = G(parent);
  const cols = o.cols || [C.water, C.lactic], id = 'mkv' + (++MK_ID);
  E('rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: 14, fill: 'rgba(255,255,255,0.04)', stroke: ink, 'stroke-width': 3 }, g);
  T(g, -w / 2 + 18, -h / 2 + s * 1.1, 'ξ', { size: s, fill: ink, weight: 700 });
  const cpB = E('clipPath', { id: id + 'b' }, defs()); E('circle', { cx, cy: 0, r }, cpB);
  const cpNB = E('clipPath', { id: id + 'nb' }, defs()); E('path', { d: `M${-w},${-h} H${w} V${h} H${-w} Z M${cx + r},0 A${r},${r} 0 1 0 ${cx - r},0 A${r},${r} 0 1 0 ${cx + r},0 Z`, 'clip-rule': 'evenodd' }, cpNB);
  const cpNA = E('clipPath', { id: id + 'na' }, defs()); E('path', { d: `M${-w},${-h} H${w} V${h} H${-w} Z M${-cx + r},0 A${r},${r} 0 1 0 ${-cx - r},0 A${r},${r} 0 1 0 ${-cx + r},0 Z`, 'clip-rule': 'evenodd' }, cpNA);
  const hl = {}, HL = G(g), hc = o.hlCol || MK.hi;
  const mk = (name, build) => { const hg = G(HL); build(hg); op(hg, 0); hl[name] = hg; };
  mk('A', hg => E('circle', { cx: -cx, cy: 0, r, fill: hc }, hg));
  mk('B', hg => E('circle', { cx, cy: 0, r, fill: hc }, hg));
  mk('AorB', hg => { E('circle', { cx: -cx, cy: 0, r, fill: hc }, hg); E('circle', { cx, cy: 0, r, fill: hc }, hg); });
  mk('AB', hg => E('circle', { cx: -cx, cy: 0, r, fill: hc, 'clip-path': `url(#${id}b)` }, hg));
  mk('Aonly', hg => E('circle', { cx: -cx, cy: 0, r, fill: hc, 'clip-path': `url(#${id}nb)` }, hg));
  mk('Bonly', hg => E('circle', { cx, cy: 0, r, fill: hc, 'clip-path': `url(#${id}na)` }, hg));
  mk('none', hg => { const in1 = G(hg, { 'clip-path': `url(#${id}na)` }); E('rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: 14, fill: hc, 'clip-path': `url(#${id}nb)` }, in1); });
  E('circle', { cx: -cx, cy: 0, r, fill: cols[0], 'fill-opacity': 0.18, stroke: cols[0], 'stroke-width': 5 }, g);
  E('circle', { cx, cy: 0, r, fill: cols[1], 'fill-opacity': 0.18, stroke: cols[1], 'stroke-width': 5 }, g);
  const lb = o.labels || ['A', 'B'];
  mkText(g, -cx - r * 0.72, -r * 0.82, lb[0], { size: s, anchor: 'end', fill: cols[0], weight: 700 });
  mkText(g, cx + r * 0.72, -r * 0.82, lb[1], { size: s, anchor: 'start', fill: cols[1], weight: 700 });
  const cnt = o.counts || {}; g.counts = {};
  const put = (k, x, y) => { if (cnt[k] === undefined) return; g.counts[k] = mkText(g, x, y + s * 0.4, String(cnt[k]), { size: s * 1.15, anchor: 'middle', fill: ink, weight: 700 }); };
  put('a', -cx - r * 0.42, 0); put('ab', 0, 0); put('b', cx + r * 0.42, 0); put('none', w / 2 - 40, h / 2 - 34);
  g.hl = (name, p) => { if (hl[name]) op(hl[name], clamp(p) * (o.hlOpacity || 0.55)); };
  return g;
}

/* ---------------------------------------------------------------- probability */
function mkTreeDiagram(parent, o) {
  o = o || {};
  const w = o.w || 620, h = o.h || 420, s = o.size || 30, ink = o.ink || C.ink, g = G(parent);
  const F = o.first || [], S2 = o.second || [], n1 = F.length;
  const second = i => (Array.isArray(S2[0]) ? S2[i] : S2) || [];
  const x1 = w * 0.42, x2 = w * 0.86, br = [[], []], hl = [], leaves = [];
  const node = (x, y, l, col) => { const ng = G(g); tr(ng, x, y); E('circle', { r: s * 0.78, fill: col || '#143646', stroke: ink, 'stroke-width': 3 }, ng); mkMath(ng, 0, s * 0.36, l, { size: s, anchor: 'middle', fill: o.nodeInk || ink, italic: false }); return ng; };
  const branch = (xa, ya, xb, yb, p, above) => {
    const bg = G(g);
    const ln = mkDash(E('path', { d: `M${xa.toFixed(1)},${ya.toFixed(1)} L${xb.toFixed(1)},${yb.toFixed(1)}`, stroke: ink, 'stroke-width': 4, 'stroke-linecap': 'round' }, bg));
    let lb = null;
    if (p) { const mx = (xa + xb) / 2, my = (ya + yb) / 2; lb = mkMath(bg, mx, my, p, { size: s, anchor: 'middle', fill: o.pCol || MK.amber }); tr(lb, 0, above ? -14 - lb.d : 14 + lb.a); }
    bg.set = q => { mkDraw(ln, q); op(bg, q > 0 ? 1 : 0); if (lb) op(lb, (q - 0.5) / 0.5); };
    return bg;
  };
  const lay = [];
  F.forEach((b, i) => {
    const y = (i + 0.5) / n1 * h - h / 2;
    const ss = second(i), n2 = ss.length;
    const leafY = ss.map((_, j) => y + ((j + 0.5) / n2 - 0.5) * h / n1 * 0.92);
    br[0].push(branch(0, 0, x1 - s * 0.8, y, b.p, y < 0));
    const n1g = node(x1, y, b.l, b.col);
    const kids = ss.map((c, j) => {
      const bb = branch(x1 + s * 0.8, y, x2 - s * 0.8, leafY[j], c.p, leafY[j] < y);
      br[1].push(bb);
      const lf = node(x2, leafY[j], c.l, c.col);
      if (o.outcomes !== false) {
        const k = leaves.length, prod = o.products && o.products[k];
        const oc = mkMath(lf, s * 1.3, s * 0.36, '"' + b.l + c.l + '"' + (prod ? '   ' + prod : ''), { size: s, fill: o.outCol || ink });
        void oc;
      }
      const hp = E('path', { d: `M0,0 L${(x1 - s * 0.8).toFixed(1)},${y.toFixed(1)} M${(x1 + s * 0.8).toFixed(1)},${y.toFixed(1)} L${(x2 - s * 0.8).toFixed(1)},${leafY[j].toFixed(1)}`, stroke: o.hlCol || MK.hi, 'stroke-width': 10, 'stroke-linecap': 'round', opacity: 0.85 }, g);
      g.insertBefore(hp, g.firstChild); op(hp, 0); hl.push(hp);
      leaves.push(lf);
      return { bb, lf };
    });
    lay.push({ b: br[0][i], n: n1g, kids });
  });
  E('circle', { r: 7, fill: ink }, g);
  g.branch = (st, i, p) => { const b = br[st] && br[st][i]; if (!b) return; b.set(p); };
  g.set = p => {
    const steps = []; lay.forEach(L => steps.push([L.b, L.n])); lay.forEach(L => L.kids.forEach(k => steps.push([k.bb, k.lf])));
    const N = steps.length;
    steps.forEach(([b, nd], i) => { const q = clamp(p * N - i); b.set(q); op(nd, (q - 0.7) / 0.3); });
  };
  g.hl = (k, p) => { if (hl[k]) op(hl[k], p); };
  g.leaves = leaves;
  g.set(1);
  return g;
}
function mkDice(parent, face, o) {
  o = o || {};
  const s = o.size || 90, g = G(parent), inner = G(g), q = s * 0.27, pr = s * 0.09;
  E('rect', { x: -s / 2, y: -s / 2, width: s, height: s, rx: s * 0.18, fill: o.col || '#F7FAFC', stroke: MK.ink, 'stroke-width': Math.max(3, s * 0.045) }, inner);
  E('rect', { x: -s / 2 + s * 0.08, y: -s / 2 + s * 0.06, width: s * 0.84, height: s * 0.1, rx: s * 0.05, fill: '#FFFFFF', opacity: 0.6 }, inner);
  const P = { tl: [-q, -q], tr: [q, -q], ml: [-q, 0], c: [0, 0], mr: [q, 0], bl: [-q, q], br: [q, q] }, pips = {};
  for (const k in P) pips[k] = E('circle', { cx: P[k][0], cy: P[k][1], r: pr, fill: o.pip || MK.ink }, inner);
  const F = { 1: ['c'], 2: ['tl', 'br'], 3: ['tl', 'c', 'br'], 4: ['tl', 'tr', 'bl', 'br'], 5: ['tl', 'tr', 'c', 'bl', 'br'], 6: ['tl', 'tr', 'ml', 'mr', 'bl', 'br'] };
  g.set = (f, tilt) => { const on = F[Math.max(1, Math.min(6, Math.round(f)))]; for (const k in pips) op(pips[k], on.includes(k) ? 1 : 0); tr(inner, 0, 0, 1, tilt || 0); };
  g.set(face || 1);
  return g;
}
function mkSpinner(parent, secs, o) {
  o = o || {};
  const r = o.r || 150, s = o.size || Math.max(26, r * 0.2), g = G(parent);
  const S = typeof secs === 'number' ? Array.from({ length: secs }, (_, i) => ({ label: String(i + 1) })) : secs;
  const tot = S.reduce((a, b) => a + (b.w || 1), 0); let cum = 0;
  E('circle', { r: r + 10, fill: '#22303A', stroke: MK.ink, 'stroke-width': 4 }, g);
  g.mids = [];
  S.forEach((sc, i) => {
    const a0 = cum / tot * 360 - 90, a1 = (cum + (sc.w || 1)) / tot * 360 - 90; cum += sc.w || 1;
    E('path', { d: 'M0,0 L' + mkArcD(0, 0, r, a0, a1).slice(1) + ' Z', fill: sc.col || MK_COLS[i % 8], stroke: '#FFFFFF', 'stroke-width': 3 }, g);
    const m = (a0 + a1) / 2 * Math.PI / 180;
    if (sc.label) mkText(g, Math.cos(m) * r * 0.64, Math.sin(m) * r * 0.64 + s * 0.35, sc.label, { size: s, anchor: 'middle', fill: MK.ink, weight: 700 });
    g.mids.push((a0 + a1) / 2 + 90);
  });
  const arm = G(g);
  E('path', { d: `M-13,14 L-7,${-r * 0.72} L0,${-r * 0.9} L7,${-r * 0.72} L13,14 Z`, fill: o.armCol || '#2A1A22', stroke: '#FFFFFF', 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, arm);
  E('circle', { r: 16, fill: '#C9D3DC', stroke: MK.ink, 'stroke-width': 3 }, g);
  g.set = deg => tr(arm, 0, 0, 1, deg);
  g.land = (p, k, turns) => g.set(easeOut(clamp(p)) * ((turns === undefined ? 3 : turns) * 360 + g.mids[k]));
  g.set(o.angle || 20);
  return g;
}

/* ---------------------------------------------------------------- geometry and measures */
function mkProtractor(parent, r, o) {
  o = o || {}; r = r || 300;
  const g = G(parent), ink = o.ink || '#1E3A5F', fs = Math.max(16, r * 0.072), body = o.col || 'rgba(226,241,252,0.88)';
  E('path', { d: `M${-r},0 A${r},${r} 0 0 1 ${r},0 L${r},14 L${-r},14 Z`, fill: body, stroke: '#7FB2D6', 'stroke-width': 3 }, g);
  E('path', { d: `M${-r * 0.42},0 A${r * 0.42},${r * 0.42} 0 0 1 ${r * 0.42},0`, fill: 'none', stroke: '#9FD8FF', 'stroke-width': 2, opacity: 0.7 }, g);
  let d = '';
  for (let k = 0; k <= 180; k++) {
    const a = k * Math.PI / 180, L = k % 10 === 0 ? 0.12 : k % 5 === 0 ? 0.075 : 0.04, c = Math.cos(a), sn = -Math.sin(a);
    d += `M${(c * r).toFixed(1)},${(sn * r).toFixed(1)} L${(c * r * (1 - L)).toFixed(1)},${(sn * r * (1 - L)).toFixed(1)} `;
  }
  E('path', { d, stroke: ink, 'stroke-width': 1.6 }, g);
  for (let k = 0; k <= 180; k += 10) {
    const a = k * Math.PI / 180;
    T(g, Math.cos(Math.PI - a) * r * 0.8, -Math.sin(Math.PI - a) * r * 0.8 + fs * 0.35, String(k), { size: fs, anchor: 'middle', fill: ink, weight: 700 });
    if (o.inner !== false) T(g, Math.cos(a) * r * 0.62, -Math.sin(a) * r * 0.62 + fs * 0.3, String(k), { size: fs * 0.8, anchor: 'middle', fill: '#C62828', weight: 600 });
  }
  E('path', { d: `M${-r},0 L${r},0 M0,-12 L0,12`, stroke: ink, 'stroke-width': 2.5 }, g);
  E('circle', { r: 5, fill: 'none', stroke: ink, 'stroke-width': 2 }, g);
  const arcEl = E('path', { d: '', fill: o.arcFill || 'rgba(255,196,40,0.45)', stroke: '#E0A100', 'stroke-width': 4 }, g);
  const base = E('line', { x1: 0, y1: 0, x2: r * 1.12, y2: 0, stroke: o.armCol || MK.red, 'stroke-width': 5, 'stroke-linecap': 'round' }, g);
  const arm = E('line', { x1: 0, y1: 0, x2: r * 1.12, y2: 0, stroke: o.armCol || MK.red, 'stroke-width': 5, 'stroke-linecap': 'round' }, g);
  const rd = T(g, 0, 0, '', { size: o.readSize || 40, anchor: 'middle', fill: o.readCol || '#C62828', weight: 800 });
  rd.setAttribute('stroke', o.readHalo || '#EEF6FC'); rd.setAttribute('stroke-width', 9); rd.setAttribute('paint-order', 'stroke'); rd.setAttribute('stroke-linejoin', 'round');
  g.set = (deg, p) => {
    p = p === undefined ? 1 : clamp(p); const a = deg * Math.PI / 180, ra = r * 0.24;
    attr(arm, 'x2', Math.cos(a) * r * 1.12); attr(arm, 'y2', -Math.sin(a) * r * 1.12);
    op(arm, p); op(base, p); op(arcEl, p); op(rd, p);
    attr(arcEl, 'd', deg > 0.2 ? `M0,0 L${ra},0 A${ra},${ra} 0 ${deg > 180 ? 1 : 0} 0 ${(Math.cos(a) * ra).toFixed(1)},${(-Math.sin(a) * ra).toFixed(1)} Z` : '');
    const m = a / 2; attr(rd, 'x', Math.cos(m) * r * 0.45); attr(rd, 'y', -Math.sin(m) * r * 0.45 + 14 - (deg < 40 ? 26 : 0));
    setText(rd, Math.round(deg) + '°');
  };
  g.set(o.deg || 0, o.deg ? 1 : 0);
  return g;
}
function mkRuler(parent, cm, o) {
  o = o || {}; cm = cm || 15;
  const u = o.unit || 56, g = G(parent), L = cm * u, ink = MK.ink;
  E('rect', { x: -22, y: 0, width: L + 44, height: 76, rx: 6, fill: o.col || '#F6D365', stroke: '#B08A2A', 'stroke-width': 3 }, g);
  let d = '';
  for (let k = 0; k <= cm * 10; k++) { const x = k * u / 10, h = k % 10 === 0 ? 28 : k % 5 === 0 ? 19 : 11; d += `M${x.toFixed(1)},0 L${x.toFixed(1)},${h} `; }
  E('path', { d, stroke: ink, 'stroke-width': 1.8 }, g);
  for (let k = 0; k <= cm; k++) T(g, k * u, 54, String(k), { size: 22, anchor: 'middle', fill: ink, weight: 700 });
  T(g, L + 6, 72, 'cm', { size: 16, anchor: 'end', fill: ink, weight: 700 });
  const mk = G(g);
  E('path', { d: 'M0,0 L-11,-20 L11,-20 Z', fill: MK.red, stroke: ink, 'stroke-width': 2 }, mk);
  const rd = T(mk, 0, -30, '', { size: 30, anchor: 'middle', fill: o.readCol || MK.hi, weight: 800 });
  g.set = (v, p) => { tr(mk, v * u, 0); op(mk, p === undefined ? 1 : p); setText(rd, mkFmt(v, 1) + ' cm'); };
  g.set(0, 0); g.L = L;
  return g;
}
function mkCompass(parent, o) {
  o = o || {};
  const L = o.leg || 170, g = G(parent);
  const arc = E('path', { d: '', fill: 'none', stroke: o.arcCol || MK.hi, 'stroke-width': 4, 'stroke-linecap': 'round' }, g);
  const legN = E('line', { stroke: '#8F9CAB', 'stroke-width': 9, 'stroke-linecap': 'round' }, g);
  const legP = E('line', { stroke: '#8F9CAB', 'stroke-width': 9, 'stroke-linecap': 'round' }, g);
  const needle = E('line', { stroke: '#C9D3DC', 'stroke-width': 3 }, g);
  const pencil = E('path', { d: '', fill: '#FFC247', stroke: MK.ink, 'stroke-width': 2 }, g);
  const hinge = G(g);
  E('rect', { x: -7, y: -40, width: 14, height: 30, rx: 5, fill: o.col || '#3B82F6', stroke: MK.ink, 'stroke-width': 2.5 }, hinge);
  E('circle', { r: 12, fill: '#C9D3DC', stroke: MK.ink, 'stroke-width': 3 }, hinge);
  g.set = st => {
    st = st || {};
    const r = Math.min(st.r || 120, L * 1.9), rot = (st.rot || 0) * Math.PI / 180;
    const P = [Math.cos(rot) * r, Math.sin(rot) * r], hh = Math.sqrt(Math.max(0, L * L - r * r / 4));
    const nx = 0, ny = -1, A = [P[0] / 2, P[1] / 2 - hh];   // the hinge stays up: an upright compass seen from the front
    const NL = Math.hypot(A[0], A[1]) || 1, Nt = [A[0] * 16 / NL, A[1] * 16 / NL];
    attr(legN, 'x1', A[0]); attr(legN, 'y1', A[1]); attr(legN, 'x2', Nt[0]); attr(legN, 'y2', Nt[1]);
    attr(needle, 'x1', Nt[0]); attr(needle, 'y1', Nt[1]); attr(needle, 'x2', 0); attr(needle, 'y2', 0);
    const PL = Math.hypot(A[0] - P[0], A[1] - P[1]) || 1, ux = (A[0] - P[0]) / PL, uy = (A[1] - P[1]) / PL;
    const Pt = [P[0] + (A[0] - P[0]) * 24 / PL, P[1] + (A[1] - P[1]) * 24 / PL];
    attr(legP, 'x1', A[0]); attr(legP, 'y1', A[1]); attr(legP, 'x2', Pt[0]); attr(legP, 'y2', Pt[1]);
    attr(pencil, 'd', `M${P[0].toFixed(1)},${P[1].toFixed(1)} L${(Pt[0] - uy * 7).toFixed(1)},${(Pt[1] + ux * 7).toFixed(1)} L${(Pt[0] + uy * 7).toFixed(1)},${(Pt[1] - ux * 7).toFixed(1)} Z`);
    tr(hinge, A[0], A[1]);
    if (st.from !== undefined && Math.abs((st.rot || 0) - st.from) > 0.3) attr(arc, 'd', mkArcD(0, 0, r, st.from, st.rot || 0)); else attr(arc, 'd', '');
  };
  g.set({ r: o.r || 120, rot: o.rot || 0 });
  return g;
}
/* arc + label for the angle from direction a1 to a2 (maths degrees, anticlockwise), vertex (x, y) */
function mkAngleMark(parent, x, y, a1, a2, o) {
  o = o || {};
  const r = o.r || 46, s = o.size || 28, col = o.col || MK.hi, g = G(parent);
  let sw = ((a2 - a1) % 360 + 360) % 360;
  const right = o.right !== undefined ? o.right : Math.abs(sw - 90) < 0.01;
  const pt = (a, rr) => [x + Math.cos(a * Math.PI / 180) * rr, y - Math.sin(a * Math.PI / 180) * rr];
  let el;
  if (right) {
    const k = r * 0.55, p1 = pt(a1, k), p3 = pt(a2, k), c = [p1[0] + p3[0] - x, p1[1] + p3[1] - y];
    el = E('path', { d: `M${p1[0].toFixed(1)},${p1[1].toFixed(1)} L${c[0].toFixed(1)},${c[1].toFixed(1)} L${p3[0].toFixed(1)},${p3[1].toFixed(1)}`, fill: o.fill || 'none', stroke: col, 'stroke-width': o.width || 4, 'stroke-linejoin': 'round' }, g);
  } else {
    const p1 = pt(a1, r), p2 = pt(a1 + sw, r);
    if (o.fill) E('path', { d: `M${x},${y} L${p1[0].toFixed(1)},${p1[1].toFixed(1)} A${r},${r} 0 ${sw > 180 ? 1 : 0} 0 ${p2[0].toFixed(1)},${p2[1].toFixed(1)} Z`, fill: o.fill, stroke: 'none' }, g);
    el = mkDash(E('path', { d: `M${p1[0].toFixed(1)},${p1[1].toFixed(1)} A${r},${r} 0 ${sw > 180 ? 1 : 0} 0 ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`, fill: 'none', stroke: col, 'stroke-width': o.width || 4, 'stroke-linecap': 'round' }, g));
  }
  let lb = null;
  if (o.label) {
    const mid = a1 + sw / 2, lr = o.lr || r + s * 0.9, p = pt(mid, lr);
    lb = mkText(g, p[0], p[1] + s * 0.36, o.label, { size: s, anchor: 'middle', fill: o.labelCol || col });
  }
  g.set = p => { p = clamp(p); op(g, p > 0 ? 1 : 0); if (!right) mkDraw(el, p); else op(el, p); if (lb) op(lb, (p - 0.5) / 0.5); };
  return g;
}
function mkAngDeg(dx, dy) { return Math.atan2(-dy, dx) * 180 / Math.PI; }
/* interior-style mark at vertex v between the directions to points a and b (the smaller angle) */
function mkCorner(parent, v, a, b, o) {
  let a1 = mkAngDeg(a[0] - v[0], a[1] - v[1]), a2 = mkAngDeg(b[0] - v[0], b[1] - v[1]);
  if (((a2 - a1) % 360 + 360) % 360 > 180) { const t = a1; a1 = a2; a2 = t; }
  return mkAngleMark(parent, v[0], v[1], a1, a2, o);
}
function mkPolygon(parent, n, r, o) {
  o = o || {};
  const g = G(parent), rot = o.rot !== undefined ? o.rot : 90 + 180 / n, col = o.col || C.water, s = o.size || 26;
  const V = []; for (let k = 0; k < n; k++) { const a = (rot + k * 360 / n) * Math.PI / 180; V.push([Math.cos(a) * r, Math.sin(a) * r]); }
  g.verts = V;
  const extL = G(g), body = mkDash(E('path', { d: mkPoly(V), fill: 'none', stroke: col, 'stroke-width': o.width || 5, 'stroke-linejoin': 'round' }, g));
  const fillEl = E('path', { d: mkPoly(V), fill: o.fill || col, opacity: o.fill ? 1 : 0.15 }, g); g.insertBefore(fillEl, extL);
  const side = Math.hypot(V[1][0] - V[0][0], V[1][1] - V[0][1]), ar = o.ar || Math.min(44, side * 0.28);
  const pick = (spec, k) => spec === true || (Array.isArray(spec) && spec.includes(k));
  const intG = G(g), extG = G(extL);
  for (let k = 0; k < n; k++) {
    const v = V[k], pv = V[(k + n - 1) % n], nx = V[(k + 1) % n];
    if (pick(o.interior, k)) mkCorner(intG, v, pv, nx, { r: ar, label: o.intLabel !== undefined ? o.intLabel : mkFmt((n - 2) * 180 / n, 1) + '°', size: s, col: o.intCol || MK.hi, lr: ar + s * 1.1 }).set(1);
    if (pick(o.exterior, k)) {
      const ex = o.ext || r * 0.6, ux = (v[0] - pv[0]) / side, uy = (v[1] - pv[1]) / side, e = [v[0] + ux * ex, v[1] + uy * ex];
      E('line', { x1: v[0], y1: v[1], x2: e[0], y2: e[1], stroke: col, 'stroke-width': 3.5, 'stroke-dasharray': '10 8', 'stroke-linecap': 'round' }, extG);
      mkCorner(extG, v, e, nx, { r: ar, label: o.extLabel !== undefined ? o.extLabel : mkFmt(360 / n, 1) + '°', size: s, col: o.extCol || MK.red, lr: ar + s * 1.1 }).set(1);
    }
  }
  g.set = p => { mkDraw(body, p); op(fillEl, clamp((p - 0.7) / 0.3)); };
  g.int = p => op(intG, p); g.ext = p => op(extG, p);
  g.set(1);
  return g;
}
function mkTriangle(parent, pts, o) {
  o = o || {};
  const g = G(parent), col = o.col || C.water, s = o.size || 28, ink = o.ink || C.ink;
  const cx = (pts[0][0] + pts[1][0] + pts[2][0]) / 3, cy = (pts[0][1] + pts[1][1] + pts[2][1]) / 3;
  const fillEl = E('path', { d: mkPoly(pts), fill: o.fill || col, opacity: o.fill ? 1 : 0.15 }, g);
  const body = mkDash(E('path', { d: mkPoly(pts), fill: 'none', stroke: col, 'stroke-width': o.width || 5, 'stroke-linejoin': 'round' }, g));
  const labs = G(g);
  for (let i = 0; i < 3; i++) {
    const a = pts[i], b = pts[(i + 1) % 3], c = pts[(i + 2) % 3];
    if (o.sides && o.sides[i]) {
      const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, L = Math.hypot(b[0] - a[0], b[1] - a[1]);
      let nx = -(b[1] - a[1]) / L, ny = (b[0] - a[0]) / L; if (nx * (mx - cx) + ny * (my - cy) < 0) { nx = -nx; ny = -ny; }
      const d = s * 0.75, tx = mx + nx * d, ty = my + ny * d;
      mkText(labs, tx + nx * s * 0.6 * Math.abs(nx), ty + s * 0.35 + ny * s * 0.2, o.sides[i], { size: s, anchor: Math.abs(nx) < 0.35 ? 'middle' : nx > 0 ? 'start' : 'end', fill: o.sideCol || ink });
    }
    if (o.right === i) mkCorner(labs, a, b, c, { r: 40, right: true, col: o.angCol || MK.hi }).set(1);
    else if (o.angles && o.angles[i]) mkCorner(labs, a, b, c, { r: o.ar || 40, label: o.angles[i], size: s * 0.9, col: o.angCol || MK.hi, lr: (o.ar || 40) + s * 1.05 }).set(1);
    if (o.verts && o.verts[i]) {
      const dx = a[0] - cx, dy = a[1] - cy, L = Math.hypot(dx, dy);
      mkText(labs, a[0] + dx / L * s * 1.0, a[1] + dy / L * s * 1.0 + s * 0.36, o.verts[i], { size: s, anchor: 'middle', fill: o.vertCol || ink, weight: 700 });
    }
  }
  g.set = p => { mkDraw(body, p); op(fillEl, clamp((p - 0.7) / 0.3)); };
  g.labels = p => op(labs, p);
  g.set(1);
  return g;
}
function mkCircleParts(parent, r, o) {
  o = o || {};
  const g = G(parent), col = o.col || C.water, hi = o.hi || MK.hi, s = o.size || 28, ink = o.ink || C.ink, parts = {};
  const P = a => [Math.cos(a * Math.PI / 180) * r, Math.sin(a * Math.PI / 180) * r];
  const under = G(g);
  E('circle', { r, fill: 'rgba(76,201,240,0.10)', stroke: col, 'stroke-width': 5 }, g);
  const over = G(g);
  const part = (name, build) => { const pg = G(name === 'sector' || name === 'segment' ? under : over); build(pg); op(pg, 0); parts[name] = pg; };
  const lab = (pg, x, y, str, an) => mkText(pg, x, y, str, { size: s, anchor: an || 'middle', fill: hi });
  part('circumference', pg => { E('circle', { r, fill: 'none', stroke: hi, 'stroke-width': 9 }, pg); lab(pg, 0, -r - 22, 'circumference'); });
  part('centre', pg => { E('circle', { r: 8, fill: hi }, pg); lab(pg, 0, 46, 'centre'); });
  part('radius', pg => { const p = P(-40); E('line', { x1: 0, y1: 0, x2: p[0], y2: p[1], stroke: hi, 'stroke-width': 6, 'stroke-linecap': 'round' }, pg); E('circle', { r: 7, fill: hi }, pg); lab(pg, p[0] * 0.5 - 14, p[1] * 0.5 - 18, 'radius', 'end'); });
  part('diameter', pg => { E('line', { x1: -r, y1: 0, x2: r, y2: 0, stroke: hi, 'stroke-width': 6, 'stroke-linecap': 'round' }, pg); E('circle', { r: 7, fill: hi }, pg); lab(pg, -r * 0.45, -14, 'diameter'); });
  part('chord', pg => { const a = P(115), b = P(165); E('line', { x1: a[0], y1: a[1], x2: b[0], y2: b[1], stroke: hi, 'stroke-width': 6, 'stroke-linecap': 'round' }, pg); lab(pg, (a[0] + b[0]) / 2 + 22, (a[1] + b[1]) / 2 - 12, 'chord', 'start'); });
  part('segment', pg => { const a = P(115), b = P(165); E('path', { d: `M${a[0]},${a[1]} A${r},${r} 0 0 1 ${b[0]},${b[1]} Z`, fill: hi, opacity: 0.55 }, pg); lab(pg, P(140)[0] * 1.18 - 10, P(140)[1] * 1.18 + 20, 'segment', 'end'); });
  part('arc', pg => { E('path', { d: mkArcD(0, 0, r, 20, 75), fill: 'none', stroke: hi, 'stroke-width': 10, 'stroke-linecap': 'round' }, pg); const m = P(48); lab(pg, m[0] * 1.14 + 6, m[1] * 1.14 + 22, 'arc', 'start'); });
  part('sector', pg => { E('path', { d: 'M0,0 L' + mkArcD(0, 0, r, -150, -95).slice(1) + ' Z', fill: hi, opacity: 0.55 }, pg); const m = P(-122); lab(pg, m[0] * 1.2 - 8, m[1] * 1.2, 'sector', 'end'); });
  part('tangent', pg => { const t = P(-8), dx = Math.sin(-8 * Math.PI / 180), dy = -Math.cos(-8 * Math.PI / 180), L = r * 0.62; E('line', { x1: t[0] - dx * L, y1: t[1] - dy * L, x2: t[0] + dx * L, y2: t[1] + dy * L, stroke: hi, 'stroke-width': 6, 'stroke-linecap': 'round' }, pg); E('circle', { cx: t[0], cy: t[1], r: 7, fill: hi }, pg); lab(pg, t[0] + 22, t[1] + dy * L * 0.95 + 26, 'tangent', 'start'); });
  E('circle', { r: 6, fill: ink }, g);
  g.show = (name, p) => { if (parts[name]) op(parts[name], p); };
  g.parts = parts;
  return g;
}
function mkCuboid(parent, l, w, h, o) {
  o = o || {};
  const u = o.unit || 40, L = l * u, Hh = h * u, D = w * u * 0.5, dx = D * Math.cos(Math.PI / 6), dy = -D * Math.sin(Math.PI / 6);
  const col = o.col || C.water, ink = o.ink || C.ink, s = o.size || 28, g = G(parent), body = G(g);
  E('path', { d: mkPoly([[0, -Hh], [L, -Hh], [L + dx, -Hh + dy], [dx, -Hh + dy]]), fill: mkShade(col, 0.25), stroke: ink, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, body);
  E('path', { d: mkPoly([[L, 0], [L + dx, dy], [L + dx, -Hh + dy], [L, -Hh]]), fill: mkShade(col, -0.25), stroke: ink, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, body);
  E('path', { d: mkPoly([[0, 0], [L, 0], [L, -Hh], [0, -Hh]]), fill: col, stroke: ink, 'stroke-width': 3.5, 'stroke-linejoin': 'round', opacity: 1 }, body);
  if (o.hidden !== false) E('path', { d: `M${dx},${dy} L${L + dx},${dy} M${dx},${dy} L${dx},${-Hh + dy} M${dx},${dy} L0,0`, stroke: ink, 'stroke-width': 2.5, 'stroke-dasharray': '8 7', opacity: 0.7 }, body);
  const labs = G(g), lb = o.labels || [];
  if (lb[0]) mkText(labs, L / 2, s * 1.25, lb[0], { size: s, anchor: 'middle', fill: o.labelCol || ink });
  if (lb[2]) mkText(labs, -14, -Hh / 2 + s * 0.35, lb[2], { size: s, anchor: 'end', fill: o.labelCol || ink });
  if (lb[1]) mkText(labs, L + dx / 2 + 16, dy / 2 + s * 0.7, lb[1], { size: s, anchor: 'start', fill: o.labelCol || ink });
  g.set = p => op(body, p); g.labels = p => op(labs, p);
  g.W = L + dx; g.H = Hh - dy;
  return g;
}
function mkShade(hex, k) {   // lighten (k > 0) / darken (k < 0) a #rrggbb colour
  if (!/^#[0-9a-f]{6}$/i.test(hex)) return hex;
  const n = parseInt(hex.slice(1), 16), f = v => Math.round(k < 0 ? v * (1 + k) : v + (255 - v) * k);
  return '#' + ((1 << 24) + (f((n >> 16) & 255) << 16) + (f((n >> 8) & 255) << 8) + f(n & 255)).toString(16).slice(1);
}
function mkPrism(parent, face, dv, o) {
  o = o || {};
  const col = o.col || C.glucose, ink = o.ink || C.ink, s = o.size || 28, g = G(parent), body = G(g), n = face.length;
  const B = face.map(p => [p[0] + dv[0], p[1] + dv[1]]);
  let area = 0; for (let i = 0; i < n; i++) { const a = face[i], b = face[(i + 1) % n]; area += a[0] * b[1] - b[0] * a[1]; }
  const sgn = area > 0 ? 1 : -1, vis = [];
  for (let i = 0; i < n; i++) { const a = face[i], b = face[(i + 1) % n]; const nx = (b[1] - a[1]) * sgn, ny = -(b[0] - a[0]) * sgn; vis.push(nx * dv[0] + ny * dv[1] > 0); }
  const hid = G(body);
  for (let i = 0; i < n; i++) {
    const a = face[i], b = face[(i + 1) % n];
    if (vis[i]) E('path', { d: mkPoly([a, b, B[(i + 1) % n], B[i]]), fill: mkShade(col, i % 2 ? -0.22 : 0.18), stroke: ink, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, body);
    else if (o.hidden !== false) E('path', { d: `M${B[i][0]},${B[i][1]} L${B[(i + 1) % n][0]},${B[(i + 1) % n][1]}`, stroke: ink, 'stroke-width': 2.5, 'stroke-dasharray': '8 7', opacity: 0.7 }, hid);
    if (o.hidden !== false && !vis[i] && !vis[(i + n - 1) % n]) E('path', { d: `M${face[i][0]},${face[i][1]} L${B[i][0]},${B[i][1]}`, stroke: ink, 'stroke-width': 2.5, 'stroke-dasharray': '8 7', opacity: 0.7 }, hid);
  }
  E('path', { d: mkPoly(face), fill: col, stroke: ink, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, body);
  const labs = G(g);
  let cx = 0, cy = 0; face.forEach(p => { cx += p[0] / n; cy += p[1] / n; });
  (o.labels || []).forEach(lb => {
    const a = face[lb.edge], b = face[(lb.edge + 1) % n], mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, L = Math.hypot(b[0] - a[0], b[1] - a[1]);
    let nx = -(b[1] - a[1]) / L, ny = (b[0] - a[0]) / L; if (nx * (mx - cx) + ny * (my - cy) < 0) { nx = -nx; ny = -ny; }
    mkText(labs, mx + nx * s * 0.9, my + ny * s * 0.9 + s * 0.35, lb.text, { size: s, anchor: Math.abs(nx) < 0.35 ? 'middle' : nx > 0 ? 'start' : 'end', fill: o.labelCol || ink });
  });
  if (o.depthLabel) {
    let k = 0; for (let i = 0; i < n; i++) if (vis[i] || vis[(i + n - 1) % n]) { if (face[i][1] >= face[k][1] || !(vis[k] || vis[(k + n - 1) % n])) k = i; }
    const a = face[k], b = B[k];
    mkText(labs, (a[0] + b[0]) / 2 + 16, (a[1] + b[1]) / 2 + s * 0.9, o.depthLabel, { size: s, anchor: 'start', fill: o.labelCol || ink });
  }
  g.set = p => op(body, p); g.labels = p => op(labs, p);
  return g;
}
function mkCylinder(parent, r, h, o) {
  o = o || {};
  const t = o.tilt || 0.3, ry = r * t, col = o.col || C.water, ink = o.ink || C.ink, s = o.size || 28, g = G(parent), body = G(g);
  E('path', { d: `M${-r},0 A${r},${ry} 0 0 0 ${r},0 L${r},${-h} A${r},${ry} 0 0 0 ${-r},${-h} Z`, fill: linGrad(mkShade(col, -0.15), mkShade(col, 0.2)), stroke: ink, 'stroke-width': 3.5 }, body);
  const liq = E('path', { d: '', fill: o.liquid || 'rgba(76,201,240,0.55)' }, body);
  E('path', { d: `M${-r},0 A${r},${ry} 0 0 1 ${r},0`, fill: 'none', stroke: ink, 'stroke-width': 2.5, 'stroke-dasharray': '8 7', opacity: 0.7 }, body);
  E('ellipse', { cx: 0, cy: -h, rx: r, ry, fill: mkShade(col, 0.35), stroke: ink, 'stroke-width': 3.5 }, body);
  const labs = G(g);
  E('line', { x1: 0, y1: -h, x2: r, y2: -h, stroke: o.labelCol || MK.hi, 'stroke-width': 4 }, labs);
  E('circle', { cx: 0, cy: -h, r: 5, fill: o.labelCol || MK.hi }, labs);
  if (o.rLabel) mkText(labs, r / 2, -h - ry - 12, o.rLabel, { size: s, anchor: 'middle', fill: o.labelCol || MK.hi });
  if (o.hLabel) {
    E('path', { d: `M${r + 24},0 L${r + 24},${-h} M${r + 16},0 L${r + 32},0 M${r + 16},${-h} L${r + 32},${-h}`, stroke: o.labelCol || MK.hi, 'stroke-width': 3 }, labs);
    mkText(labs, r + 40, -h / 2 + s * 0.35, o.hLabel, { size: s, anchor: 'start', fill: o.labelCol || MK.hi });
  }
  g.set = p => op(body, p); g.labels = p => op(labs, p);
  g.fill = p => { const y = -h * clamp(p); attr(liq, 'd', p > 0.01 ? `M${-r + 5},${-4} A${r - 5},${ry - 3} 0 0 0 ${r - 5},${-4} L${r - 5},${y.toFixed(1)} A${r - 5},${ry - 3} 0 0 1 ${-r + 5},${y.toFixed(1)} Z` : ''); };
  g.fill(0);
  return g;
}
function mkAlgebraTile(parent, kind, o) {
  o = o || {};
  const u = o.unit || 44, xl = o.xlen || u * 2.6, neg = !!o.neg, g = G(parent);
  let w = kind === 'x2' ? xl : kind === 'x' ? xl : u, h = kind === 'x2' ? xl : u;
  if (kind === 'x' && o.vertical) { w = u; h = xl; }
  const col = neg ? '#FF6070' : kind === 'x2' ? '#4CC9F0' : kind === 'x' ? '#56D69B' : '#FFC247';
  E('rect', { x: 0, y: 0, width: w, height: h, rx: 6, fill: col, stroke: MK.ink, 'stroke-width': 3 }, g);
  const lab = (neg ? '-' : '') + (kind === 'x2' ? 'x^2' : kind === 'x' ? 'x' : '1');
  const m = mkMath(g, w / 2, h / 2, lab, { size: Math.min(30, u * 0.62), anchor: 'middle', fill: MK.ink }); tr(m, 0, (m.a - m.d) / 2);
  g.w = w; g.h = h;
  return g;
}

/* ---------------------------------------------------------------- money and shops */
function mkCoin(parent, value, o) {
  o = o || {};
  const R = { '5c': 34, '10c': 38, '20c': 42, '50c': 46, '$1': 46 }[value] || 40, g = G(parent), inner = G(g);
  tr(inner, 0, 0, o.s || 1);
  const gold = ['#F4D35E', '#B8860B'], silver = ['#E6EBEF', '#8A97A3'];
  const c = value === '5c' ? gold : silver;
  E('circle', { r: R, fill: ball(value === '$1' ? gold[0] : c[0], value === '$1' ? gold[1] : c[1]), stroke: MK.ink, 'stroke-width': 3 }, inner);
  E('circle', { r: R - 4, fill: 'none', stroke: value === '$1' ? '#8A6508' : c[1], 'stroke-width': 3, 'stroke-dasharray': '2 3' }, inner);
  if (value === '$1') E('circle', { r: R * 0.68, fill: ball(silver[0], silver[1]), stroke: '#8A6508', 'stroke-width': 2 }, inner);
  E('circle', { r: R * 0.82, fill: 'none', stroke: '#FFFFFF', 'stroke-width': 1.5, opacity: 0.5 }, inner);
  T(inner, 0, R * 0.26, value, { size: Math.max(22, R * 0.62), anchor: 'middle', fill: '#3A2A10', weight: 800 });
  return g;
}
function mkNote(parent, value, o) {
  o = o || {};
  const col = { '$2': '#7D4BA8', '$5': '#3E9B5A', '$10': '#C8414B', '$50': '#2E6BB5', '$100': '#D9772E' }[value] || '#3E9B5A';
  const w = 250, h = 124, g = G(parent), inner = G(g); tr(inner, 0, 0, o.s || 1);
  E('rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: 10, fill: linGrad(mkShade(col, 0.35), col), stroke: mkShade(col, -0.35), 'stroke-width': 3 }, inner);
  E('rect', { x: -w / 2 + 10, y: -h / 2 + 10, width: w - 20, height: h - 20, rx: 6, fill: 'none', stroke: '#FFFFFF', 'stroke-width': 2, opacity: 0.5 }, inner);
  const fl = G(inner); tr(fl, -w * 0.24, 4);
  for (let k = 0; k < 5; k++) { const a = k * TAU / 5 - Math.PI / 2; E('ellipse', { cx: Math.cos(a) * 18, cy: Math.sin(a) * 18, rx: 14, ry: 9, transform: `rotate(${(a * 180 / Math.PI).toFixed(0)} ${(Math.cos(a) * 18).toFixed(1)} ${(Math.sin(a) * 18).toFixed(1)})`, fill: '#FFFFFF', opacity: 0.45 }, fl); }
  E('circle', { r: 9, fill: '#FFE45C', opacity: 0.8 }, fl);
  T(inner, w * 0.2, 22, value, { size: 52, anchor: 'middle', fill: '#FFFFFF', weight: 800 });
  T(inner, -w / 2 + 18, -h / 2 + 34, value, { size: 22, fill: '#FFFFFF', weight: 700, opacity: 0.85 });
  return g;
}
function mkPriceTag(parent, text, o) {
  o = o || {};
  const s = o.size || 40, g = G(parent), sw = G(g), col = o.col || '#FFE45C';
  const probe = mkText(sw, 0, 0, text, { size: s, fill: MK.ink, weight: 800 }), tw = probe.w, pa = -probe.top, pd = probe.bottom;
  sw.removeChild(probe);
  const H = Math.max(s * 1.9, pa + pd + s * 0.7) + (o.old ? s * 0.9 : 0), W = tw + 70;
  if (o.string !== false) g.insertBefore(E('path', { d: 'M0,0 C-20,-40 -10,-80 -30,-110', fill: 'none', stroke: '#C9D3DC', 'stroke-width': 3 }, g), sw);
  E('path', { d: `M-14,0 L14,${-H / 2} L${W},${-H / 2} Q${W + 8},${-H / 2} ${W + 8},${-H / 2 + 8} L${W + 8},${H / 2 - 8} Q${W + 8},${H / 2} ${W},${H / 2} L14,${H / 2} Z`, fill: col, stroke: MK.ink, 'stroke-width': 4, 'stroke-linejoin': 'round' }, sw);
  E('circle', { r: 7, fill: '#0F2C3A', stroke: MK.ink, 'stroke-width': 3 }, sw);
  const cx = 14 + (W - 14) / 2 + 4;
  if (o.old) {
    const ot = mkText(sw, cx, -H / 2 + s * 0.95, o.old, { size: s * 0.62, anchor: 'middle', fill: '#5A4A3A' });
    E('line', { x1: cx - ot.w / 2 - 6, y1: -H / 2 + s * 0.75, x2: cx + ot.w / 2 + 6, y2: -H / 2 + s * 0.75, stroke: MK.red, 'stroke-width': 4 }, sw);
  }
  mkText(sw, cx, (o.old ? s * 0.45 : 0) + (pa - pd) / 2, text, { size: s, anchor: 'middle', fill: MK.ink, weight: 800 });
  g.set = deg => tr(sw, 0, 0, 1, deg || 0);
  g.w = W + 8; g.h = H;
  return g;
}
function mkReceipt(parent, o) {
  o = o || {};
  const w = o.w || 380, s = o.size || 26, items = o.items || [], g = G(parent), ink = MK.ink, rh = s * 1.45;
  const n = items.length, top = 24, yHead = top + s * 1.2, y0 = yHead + s * 1.0;
  const H = y0 + n * rh + (o.total ? rh * 1.6 : 0) + (o.footer ? rh * 1.2 : 0) + 30;
  let zig = `M${-w / 2},0 L${w / 2},0 L${w / 2},${H}`;
  for (let x = w / 2, k = 0; x > -w / 2; x -= 16, k++) zig += ` L${(x - 8).toFixed(1)},${H + (k % 2 ? 0 : 10)} L${(x - 16).toFixed(1)},${H}`;
  E('path', { d: zig + ' Z', fill: MK.paper, stroke: '#C9C2B0', 'stroke-width': 2 }, g);
  if (o.title) T(g, 0, yHead, o.title, { size: s * 1.05, anchor: 'middle', fill: ink, weight: 800, font: FB });
  E('line', { x1: -w / 2 + 18, y1: y0 - s * 0.6, x2: w / 2 - 18, y2: y0 - s * 0.6, stroke: ink, 'stroke-width': 2, 'stroke-dasharray': '6 5' }, g);
  g.rows = items.map((it, i) => {
    const rg = G(g), y = y0 + (i + 0.75) * rh;
    mkText(rg, -w / 2 + 22, y, it[0], { size: s, fill: ink, font: FB, weight: 600 });
    mkText(rg, w / 2 - 22, y, it[1], { size: s, anchor: 'end', fill: ink, font: FB, weight: 700 });
    return rg;
  });
  if (o.total) {
    const rg = G(g), y = y0 + n * rh + rh * 1.15;
    E('line', { x1: -w / 2 + 18, y1: y - rh * 0.85, x2: w / 2 - 18, y2: y - rh * 0.85, stroke: ink, 'stroke-width': 2.5 }, rg);
    mkText(rg, -w / 2 + 22, y, o.total[0], { size: s * 1.1, fill: ink, font: FB, weight: 800 });
    mkText(rg, w / 2 - 22, y, o.total[1], { size: s * 1.1, anchor: 'end', fill: ink, font: FB, weight: 800 });
    g.rows.push(rg);
  }
  if (o.footer) { const rg = G(g); mkText(rg, 0, H - 22, o.footer, { size: s * 0.85, anchor: 'middle', fill: '#6B5E50', font: FB }); g.rows.push(rg); }
  g.set = k => g.rows.forEach((r, i) => op(r, clamp(k - i)));
  g.H = H + 10; g.W = w;
  return g;
}
function mkHawkerMenu(parent, o) {
  o = o || {};
  const w = o.w || 520, s = o.size || 30, items = o.items || [], col = o.col || '#C62828', g = G(parent), rh = s * 1.6;
  const headH = o.sub ? s * 3.2 : s * 2.3, H = headH + items.length * rh + 30;
  E('rect', { x: -w / 2 - 8, y: -8, width: w + 16, height: H + 16, rx: 16, fill: '#5A3A1A' }, g);
  E('rect', { x: -w / 2, y: 0, width: w, height: H, rx: 12, fill: '#FFF6E0' }, g);
  E('path', { d: `M${-w / 2},12 Q${-w / 2},0 ${-w / 2 + 12},0 L${w / 2 - 12},0 Q${w / 2},0 ${w / 2},12 L${w / 2},${headH} L${-w / 2},${headH} Z`, fill: col }, g);
  if (o.title) T(g, 0, s * 1.55, o.title, { size: s * 1.3, anchor: 'middle', fill: '#FFE45C', weight: 800 });
  if (o.sub) T(g, 0, s * 2.65, o.sub, { size: s * 0.8, anchor: 'middle', fill: '#FFFFFF', weight: 600, font: FB });
  const hlL = G(g); g.hls = [];
  items.forEach((it, i) => {
    const y = headH + 15 + (i + 0.5) * rh;
    const h = E('rect', { x: -w / 2 + 10, y: y - rh / 2 + 3, width: w - 20, height: rh - 6, rx: 8, fill: '#FFE45C' }, hlL); op(h, 0); g.hls.push(h);
    if (i) E('line', { x1: -w / 2 + 24, y1: y - rh / 2, x2: w / 2 - 24, y2: y - rh / 2, stroke: '#E6D3A8', 'stroke-width': 2 }, g);
    mkText(g, -w / 2 + 28, y + s * 0.35, it[0], { size: s, fill: MK.ink, weight: 700 });
    mkText(g, w / 2 - 28, y + s * 0.35, it[1], { size: s, anchor: 'end', fill: col, weight: 800 });
  });
  g.hl = (i, p) => { if (g.hls[i]) op(g.hls[i], p); };
  g.H = H; g.W = w;
  return g;
}
function mkCalculator(parent, o) {
  o = o || {};
  const w = 260, h = 400, g = G(parent);
  E('rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: 24, fill: linGrad('#3A4A58', '#26323C', true), stroke: MK.ink, 'stroke-width': 4 }, g);
  E('rect', { x: -w / 2 + 20, y: -h / 2 + 22, width: w - 40, height: 72, rx: 8, fill: '#BFE3C8', stroke: '#1E2A22', 'stroke-width': 3 }, g);
  const disp = T(g, w / 2 - 32, -h / 2 + 76, o.text || '0', { size: o.dispSize || 38, anchor: 'end', fill: '#1E2A1E', weight: 700 });
  const K = o.keys || [['C', '(', ')', '÷'], ['7', '8', '9', '×'], ['4', '5', '6', '−'], ['1', '2', '3', '+'], ['0', '.', 'x²', '=']];
  const bw = 48, bh = 44, gx = (w - 40 - 4 * bw) / 3, keys = [];
  K.forEach((row, i) => row.forEach((k, j) => {
    const x = -w / 2 + 20 + j * (bw + gx), y = -h / 2 + 118 + i * (bh + 12);
    const base = /[÷×−+=]/.test(k) ? '#FF8A3D' : k === 'C' ? '#E8424F' : '#E6EBEF';
    const r = E('rect', { x, y, width: bw, height: bh, rx: 10, fill: base, stroke: MK.ink, 'stroke-width': 2.5 }, g);
    T(g, x + bw / 2, y + bh / 2 + 9, k, { size: 26, anchor: 'middle', fill: MK.ink, weight: 700 });
    keys.push({ k, r, base });
  }));
  g.set = s => setText(disp, String(s));
  g.press = (k, p) => keys.forEach(b => attr(b.r, 'fill', b.k === k && p > 0.05 ? '#FFE45C' : b.base));
  return g;
}
function mkMRTMap(parent, o) {
  o = o || {};
  const st = o.stations || [], ds = o.dists || [], col = o.col || '#009645', s = o.size || 26, ink = o.ink || C.ink, g = G(parent);
  const tot = ds.reduce((a, b) => a + b, 0) || 1, len = o.len || 900, sc = o.scale || len / tot;
  const X = [0]; ds.forEach(d => X.push(X[X.length - 1] + (o.equal ? len / ds.length : d * sc)));
  g.x = X;
  E('line', { x1: X[0], y1: 0, x2: X[X.length - 1], y2: 0, stroke: col, 'stroke-width': 16, 'stroke-linecap': 'round' }, g);
  const hlL = G(g); g.hls = [];
  ds.forEach((d, i) => {
    const h = E('line', { x1: X[i], y1: 0, x2: X[i + 1], y2: 0, stroke: MK.hi, 'stroke-width': 24, 'stroke-linecap': 'round', opacity: 0.8 }, hlL); op(h, 0); g.hls.push(h);
    const c = mkChip(g, d + ' ' + (o.unit || 'km'), { size: s * 0.9, col: o.distCol || MK.hi });
    tr(c, (X[i] + X[i + 1]) / 2, 48);
  });
  const nw = st.map(n => textWidth(n, s, FD, 700));
  const crowded = st.some((n, i) => i > 0 && X[i] - X[i - 1] < (nw[i] + nw[i - 1]) / 2 + 18);
  st.forEach((name, i) => {
    E('circle', { cx: X[i], cy: 0, r: 15, fill: '#FFFFFF', stroke: MK.ink, 'stroke-width': 5 }, g);
    const below = o.names === 'below' || ((o.names === 'alt' || (o.names === undefined && crowded)) && i % 2 === 1);
    mkText(g, X[i], below ? 100 + s * 0.4 : -32, name, { size: s, anchor: 'middle', fill: ink, weight: 700 });
  });
  const train = G(g);
  E('rect', { x: -30, y: -15, width: 60, height: 30, rx: 12, fill: '#F4F7FA', stroke: MK.ink, 'stroke-width': 3 }, train);
  E('rect', { x: -22, y: -9, width: 44, height: 11, rx: 3, fill: '#7FD3FF' }, train);
  E('rect', { x: -30, y: 6, width: 60, height: 5, fill: col }, train);
  g.train = pos => {
    if (pos < 0) { op(train, 0); return; }
    op(train, 1); const i = Math.min(Math.floor(pos), X.length - 2), f = pos - i;
    tr(train, X[i] + (X[i + 1] - X[i]) * f, 0);
  };
  g.hl = (i, p) => { if (g.hls[i]) op(g.hls[i], p); };
  g.train(-1);
  return g;
}
function mkThermometer(parent, o) {
  o = o || {};
  const min = o.min !== undefined ? o.min : -10, max = o.max !== undefined ? o.max : 40, step = o.step || 10, minor = o.minor || 2;
  const h = o.h || 360, s = o.size || 26, ink = o.ink || C.ink, g = G(parent);
  const Y = v => -44 - (v - min) / (max - min) * (h - 70);
  E('rect', { x: -16, y: -h, width: 32, height: h, rx: 16, fill: '#E9F2F7', stroke: '#8FB0C2', 'stroke-width': 3 }, g);
  E('circle', { r: 30, fill: o.col || MK.red, stroke: '#8FB0C2', 'stroke-width': 3 }, g);
  const colm = E('rect', { x: -8, y: 0, width: 16, height: 0, rx: 8, fill: o.col || MK.red }, g);
  let d = '';
  for (let v = min; v <= max + 1e-9; v += minor) { const y = Y(v), maj = Math.abs(v / step - Math.round(v / step)) < 1e-9; d += `M18,${y.toFixed(1)} L${maj ? 38 : 28},${y.toFixed(1)} `; }
  E('path', { d, stroke: ink, 'stroke-width': 3 }, g);
  for (let v = Math.ceil(min / step) * step; v <= max + 1e-9; v += step) T(g, 46, Y(v) + s * 0.35, mkFmt(v), { size: s, fill: v < 0 ? C.water : v === 0 ? ink : ink, weight: 700 });
  if (min < 0 && max > 0) E('line', { x1: -26, y1: Y(0), x2: 18, y2: Y(0), stroke: C.water, 'stroke-width': 2.5, 'stroke-dasharray': '5 4' }, g);
  const rd = o.readout === false ? null : T(g, 0, -h - 22, '', { size: o.readSize || 32, anchor: 'middle', fill: o.readCol || MK.hi, weight: 800 });
  g.set = v => { const y = Y(clamp(v, min, max)); attr(colm, 'y', y); attr(colm, 'height', -y + 4); if (rd) setText(rd, mkFmt(v, 1) + ' ' + (o.unit || '°C')); };
  g.set(o.v !== undefined ? o.v : 20); g.Y = Y;
  return g;
}

/* ---------------------------------------------------------------- patterns, algebra */
function mkSequenceTiles(parent, o) {
  o = o || {};
  const terms = o.terms || [1, 2, 3, 4], c = o.cell || 26, gap = o.gap || 60, s = o.size || 26, ink = o.ink || C.ink, g = G(parent);
  const SH = {
    row: n => Array.from({ length: n }, (_, i) => [i, 0]),
    square: n => { const a = []; for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) a.push([i, j]); return a; },
    rect: n => { const a = []; for (let i = 0; i < n + 1; i++) for (let j = 0; j < n; j++) a.push([i, j]); return a; },
    stairs: n => { const a = []; for (let i = 0; i < n; i++) for (let j = 0; j <= i; j++) a.push([i, j]); return a; },
    L: n => { const a = [[0, 0]]; for (let k = 1; k <= n; k++) { a.push([k, 0]); a.push([0, k]); } return a; },
    cross: n => { const a = [[n, n]]; for (let k = 1; k <= n; k++) a.push([n - k, n], [n + k, n], [n, n - k], [n, n + k]); return a; },
  };
  const fn = typeof o.shape === 'function' ? o.shape : SH[o.shape || 'L'];
  let x = 0; g.pats = [];
  terms.forEach((n, i) => {
    const cells = fn(n), pg = G(g), mx = Math.max(...cells.map(q => q[0])) + 1;
    const lab1 = o.labelFn ? o.labelFn(n, i) : 'Pattern ' + n, lab2 = o.countFn ? o.countFn(n, cells.length) : cells.length + (cells.length === 1 ? ' tile' : ' tiles');
    const slot = Math.max(mx * c, o.labels === false ? 0 : textWidth(String(lab1).replace(/\{\{|\}\}|\*\*/g, ''), s, FD, 600), o.counts === false ? 0 : textWidth(String(lab2).replace(/\{\{|\}\}|\*\*/g, ''), s, FD, 600));
    x += (slot - mx * c) / 2;
    const els = cells.map(([cc, rr]) => E('rect', { x: x + cc * c + 1.5, y: -(rr + 1) * c + 1.5, width: c - 3, height: c - 3, rx: 4, fill: o.col || MK_COLS[1], stroke: MK.ink, 'stroke-width': 2 }, pg));
    const lab = G(pg);
    if (o.labels !== false) mkText(lab, x + mx * c / 2, s * 1.3, lab1, { size: s, anchor: 'middle', fill: o.labelCol || MK.muted });
    if (o.counts !== false) mkText(lab, x + mx * c / 2, s * 2.6, lab2, { size: s, anchor: 'middle', fill: o.countCol || MK.hi });
    g.pats.push({ pg, els, lab, x: x + mx * c / 2 });
    x += mx * c + (slot - mx * c) / 2 + gap;
  });
  g.w = x - gap;   // slots are as wide as their labels, so the first pattern can start a little right of 0
  g.set = k => g.pats.forEach((P, i) => {
    const q = clamp(k - i); op(P.pg, q > 0 ? 1 : 0);
    const n = P.els.length; P.els.forEach((e, j) => op(e, clamp(q * (n + 2) - j)));
    op(P.lab, clamp(q * 3 - 2));
  });
  g.set(terms.length);
  return g;
}
function mkBalance(parent, o) {
  o = o || {};
  const arm = o.arm || 210, post = 250, g = G(parent), col = o.col || '#C9A15A';
  E('path', { d: 'M-90,0 L90,0 L60,-26 L-60,-26 Z', fill: mkShade(col, -0.3), stroke: MK.ink, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, g);
  E('rect', { x: -10, y: -post, width: 20, height: post - 24, fill: col, stroke: MK.ink, 'stroke-width': 3.5 }, g);
  const beam = G(g); tr(beam, 0, -post);
  E('rect', { x: -arm - 10, y: -9, width: 2 * arm + 20, height: 18, rx: 9, fill: col, stroke: MK.ink, 'stroke-width': 3.5 }, beam);
  E('circle', { cx: 0, cy: -post, r: 16, fill: mkShade(col, 0.3), stroke: MK.ink, 'stroke-width': 3.5 }, g);
  const pan = () => {
    const pg = G(g);
    E('path', { d: 'M0,0 L-95,120 M0,0 L95,120', stroke: '#8F9CAB', 'stroke-width': 3 }, pg);
    E('path', { d: 'M-115,120 L115,120 Q100,150 0,150 Q-100,150 -115,120 Z', fill: mkShade(col, 0.15), stroke: MK.ink, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, pg);
    const top = G(pg); tr(top, 0, 120); pg.top = top;
    return pg;
  };
  const L = pan(), R = pan(); g.left = L.top; g.right = R.top;
  g.set = tilt => {
    const a = clamp(tilt, -1, 1) * 12 * Math.PI / 180, dx = Math.cos(a) * arm, dy = Math.sin(a) * arm;
    tr(beam, 0, -post, 1, a * 180 / Math.PI);
    tr(L, -dx, -post - dy); tr(R, dx, -post + dy);
  };
  g.set(0);
  return g;
}

/* ---------------------------------------------------------------- sitcom props */
function mkSpeechBubble(parent, text, o) {
  o = o || {};
  const s = o.size || 30, g = G(parent), inner = G(g), path = E('path', { d: '', fill: o.fill || '#FFFFFF', stroke: o.stroke || MK.ink, 'stroke-width': 5, 'stroke-linejoin': 'round' }, inner);
  const t = mkText(inner, 0, 0, text, { size: s, anchor: 'middle', fill: o.ink || MK.ink, weight: o.weight || 700, boldFill: o.boldFill });
  const w = Math.max(o.w || 0, t.w + 56), h = t.h + 36;
  tr(t, 0, -t.top - t.h / 2);
  const x0 = -w / 2, y0 = -h / 2, rr = Math.min(22, h / 2), tail = o.tail || 'down', tx = o.tailX || 0;
  let d = `M${x0 + rr},${y0} `;
  if (tail === 'up') d += `L${tx - 14},${y0} L${tx - 24},${y0 - 34} L${tx + 14},${y0} `;
  d += `L${-x0 - rr},${y0} Q${-x0},${y0} ${-x0},${y0 + rr} `;
  if (tail === 'right') d += `L${-x0},${-8} L${-x0 + 36},${18} L${-x0},${14} `;
  d += `L${-x0},${-y0 - rr} Q${-x0},${-y0} ${-x0 - rr},${-y0} `;
  if (tail === 'down') d += `L${tx + 14},${-y0} L${tx - 22},${-y0 + 34} L${tx - 14},${-y0} `;
  d += `L${x0 + rr},${-y0} Q${x0},${-y0} ${x0},${-y0 - rr} `;
  if (tail === 'left') d += `L${x0},${14} L${x0 - 36},${18} L${x0},${-8} `;
  d += `L${x0},${y0 + rr} Q${x0},${y0} ${x0 + rr},${y0} Z`;
  attr(path, 'd', d);
  g.w = w; g.h = h;
  g.set = p => { p = clamp(p); op(g, clamp(p * 3)); tr(inner, 0, 0, Math.max(0.01, 0.6 + 0.4 * pop(p))); };
  return g;
}
function mkThoughtBubble(parent, text, o) {
  o = o || {};
  const s = o.size || 30, g = G(parent), inner = G(g), cloud = G(inner), fill = o.fill || '#FFFFFF';
  const t = mkText(inner, 0, 0, text, { size: s, anchor: 'middle', fill: o.ink || MK.ink, weight: o.weight || 700 });
  const w = Math.max(o.w || 0, t.w + 70), h = t.h + 56;
  tr(t, 0, -t.top - t.h / 2);
  const bumps = [], nx = Math.max(3, Math.round(w / 70)), ny = Math.max(1, Math.round(h / 70));
  for (let i = 0; i <= nx; i++) { const x = -w / 2 + i * w / nx; bumps.push([x, -h / 2], [x, h / 2]); }
  for (let j = 1; j < ny + 1; j++) { const y = -h / 2 + j * h / (ny + 1); bumps.push([-w / 2, y], [w / 2, y]); }
  const br = Math.max(26, Math.min(44, h * 0.32));
  bumps.forEach(([x, y]) => E('circle', { cx: x, cy: y, r: br, fill, stroke: o.stroke || MK.ink, 'stroke-width': 5 }, cloud));
  E('rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: 10, fill }, cloud);
  const tail = o.tail || 'down', dir = { down: [0, 1], up: [0, -1], left: [-1, 0.6], right: [1, 0.6] }[tail];
  if (dir) [[1, 16], [1.55, 11], [2.0, 7]].forEach(([k, r]) => E('circle', { cx: (o.tailX || 0) + dir[0] * (w / 2 + 10) * (dir[0] ? k * 0.9 : 0) + (dir[0] ? 0 : -k * 14), cy: dir[1] * (h / 2 + br * 0.6) * (dir[0] ? 0.5 : 1) + dir[1] * (k - 1) * 38 + (dir[0] ? 0 : dir[1] * 14), r, fill, stroke: o.stroke || MK.ink, 'stroke-width': 4 }, cloud));
  g.w = w + 2 * br; g.h = h + 2 * br;
  g.set = p => { p = clamp(p); op(g, clamp(p * 3)); tr(inner, 0, 0, Math.max(0.01, 0.6 + 0.4 * pop(p))); };
  return g;
}
function mkStamp(parent, text, col) {
  col = col || '#D32F2F';
  const g = G(parent), inner = G(g), w = textWidth(text, 64, FD, 800) + 64;
  E('rect', { x: -w / 2, y: -50, width: w, height: 100, rx: 12, fill: 'none', stroke: col, 'stroke-width': 9 }, inner);
  E('rect', { x: -w / 2 + 10, y: -40, width: w - 20, height: 80, rx: 8, fill: 'none', stroke: col, 'stroke-width': 3 }, inner);
  T(inner, 0, 23, text, { size: 64, weight: 800, anchor: 'middle', fill: col, ls: 4 });
  g.set = p => { p = clamp(p); op(g, p > 0 ? 1 : 0); const k = p < 0.6 ? lerp(2.2, 0.92, p / 0.6) : lerp(0.92, 1, (p - 0.6) / 0.4); tr(inner, 0, 0, k, -8); inner.style.opacity = clamp(p * 3).toFixed(3); };
  g.set(1); g.w = w;
  return g;
}
function mkChip(parent, text, o) {
  o = o || {};
  const s = o.size || 30, col = o.col || C.ink, g = G(parent), inner = G(g);
  const box = E('rect', {}, inner);
  const t = mkText(inner, 0, 0, text, { size: s, anchor: 'middle', fill: o.solid ? (o.ink || MK.ink) : (o.textCol || col), weight: o.weight || 700 });
  const h = Math.max(s * 1.75, t.h + s * 0.6), w = t.w + s * 1.3;
  tr(t, 0, -t.top - t.h / 2);
  for (const [k, v] of Object.entries({ x: -w / 2, y: -h / 2, width: w, height: h, rx: Math.min(h / 2, s), fill: o.solid ? col : (o.fill || 'rgba(10,27,39,0.88)'), stroke: o.solid ? (o.stroke || MK.ink) : (o.stroke || col), 'stroke-width': o.sw || 3 })) box.setAttribute(k, v);
  g.w = w; g.h = h;
  g.set = p => { p = clamp(p); op(g, clamp(p * 3)); tr(inner, 0, 0, Math.max(0.01, 0.6 + 0.4 * pop(p))); };
  return g;
}
