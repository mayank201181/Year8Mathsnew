# "Totally Raotional" S01E13 "Parallel Universe" (Topic: Angles, Parallel Lines & Polygons)
# Format and helpers: see common.py; check with lint_episode.py.
import math

EP = dict(topic="angles-polygons", logline="Mum's pentagon tiles won't fit and Dad's 'parallel' shelves aren't. Angle facts, Z/F/C angles, triangles and polygon angle sums.")

# ---- diagram helpers (SVG for the Holo-Board) ----
def _svg(parts, h=240):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 {h}">' + "".join(parts) + '</svg>'
def _ln(a, b, col="#f8fafc", w=4):
    return f'<line x1="{a[0]:.1f}" y1="{a[1]:.1f}" x2="{b[0]:.1f}" y2="{b[1]:.1f}" stroke="{col}" stroke-width="{w}" stroke-linecap="round"/>'
def _tx(x, y, s, col="#fde047", size=22, anchor="middle"):
    return f'<text x="{x:.1f}" y="{y:.1f}" font-family="sans-serif" font-size="{size}" fill="{col}" text-anchor="{anchor}">{s}</text>'
def _poly(pts, col="#c4b5fd", fill="none", w=3):
    return f'<polygon points="{" ".join(f"{x:.1f},{y:.1f}" for x, y in pts)}" stroke="{col}" stroke-width="{w}" fill="{fill}" stroke-linejoin="round"/>'

# straight line: 130 + 50
D_LINE = _svg([_ln((40, 180), (480, 180)), _ln((260, 180), (260 + 160 * math.cos(math.radians(50)), 180 - 160 * math.sin(math.radians(50))), "#7dd3fc"),
               _tx(335, 165, "50°"), _tx(195, 160, "130°", "#fca5a5"), _tx(260, 225, "angles on a straight line: 180°", "#f8fafc", 20)], 240)

# vertically opposite: lines crossing at 70 / 110
D_VOPP = _svg([_ln((110, 15), (410, 225), "#7dd3fc"), _ln((110, 225), (410, 15), "#7dd3fc"),
               _tx(205, 128, "70°"), _tx(318, 128, "70°"), _tx(260, 80, "110°", "#fca5a5"), _tx(260, 190, "110°", "#fca5a5")], 240)

# parallel lines with a transversal at 70 degrees
_P, _Q = (300, 70), (260, 180)
_k = 1 / math.tan(math.radians(70))
D_PAR = _svg([_ln((40, 70), (480, 70)), _ln((40, 180), (480, 180)),
              '<polyline points="412,62 424,70 412,78" stroke="#f8fafc" stroke-width="3" fill="none"/>',
              '<polyline points="412,172 424,180 412,188" stroke="#f8fafc" stroke-width="3" fill="none"/>',
              _ln((_Q[0] - 55 * _k, 235), (_P[0] + 60 * _k, 10), "#7dd3fc"),
              _tx(_P[0] - 46, _P[1] + 28, "70°"), _tx(_Q[0] + 44, _Q[1] - 12, "70°"), _tx(_Q[0] - 52, _Q[1] - 12, "110°", "#fca5a5"),
              _tx(470, 128, "Z: equal", "#fde047", 19, "end"), _tx(470, 152, "C: add to 180°", "#fca5a5", 19, "end")], 240)

# triangle 50, 60, 70 with exterior angle 120 at B
_A, _B = (60, 215), (300, 215)
_t = 240 * math.tan(math.radians(60)) / (math.tan(math.radians(50)) + math.tan(math.radians(60)))
_C = (_A[0] + _t, 215 - _t * math.tan(math.radians(50)))
D_TRI = _svg([_poly([_A, _B, _C], "#f8fafc", "none", 4), _ln(_B, (470, 215), "#f8fafc", 3),
              _tx(102, 205, "50°"), _tx(262, 205, "60°"), _tx(_C[0], _C[1] + 42, "70°"), _tx(340, 200, "120°", "#86efac"),
              _tx(470, 60, "120 = 50 + 70", "#86efac", 20, "end")], 240)

# regular pentagon split into 3 triangles
_pc = [(150 + 105 * math.cos(math.radians(-90 + 72 * k)), 130 + 105 * math.sin(math.radians(-90 + 72 * k))) for k in range(5)]
D_PENT = _svg([_poly(_pc, "#c4b5fd", "none", 4), _ln(_pc[0], _pc[2], "#fde047", 3), _ln(_pc[0], _pc[3], "#fde047", 3),
               _tx(272, 80, "5 sides → 3 triangles", "#f8fafc", 20, "start"), _tx(272, 125, "3 × 180° = 540°", "#fde047", 22, "start"),
               _tx(272, 170, "540 ÷ 5 = 108° each", "#86efac", 20, "start")], 250)

# tessellation: hexagons fit, pentagons leave a gap
def _hexes(P, s):
    out = []
    for th in (90, 210, 330):
        cx, cy = P[0] + s * math.cos(math.radians(th)), P[1] - s * math.sin(math.radians(th))
        out.append(_poly([(cx + s * math.cos(math.radians(30 + 60 * k)), cy - s * math.sin(math.radians(30 + 60 * k))) for k in range(6)], "#86efac", "#86efac22", 3))
    return out
def _pents(P, s):
    out = []
    for a in (0, 108, 216):
        v = [P]; d = a
        for _ in range(4):
            v.append((v[-1][0] + s * math.cos(math.radians(d)), v[-1][1] - s * math.sin(math.radians(d)))); d += 72
        out.append(_poly(v, "#fca5a5", "#fca5a522", 3))
    return out
D_TESS = _svg(_hexes((130, 125), 52) + _pents((385, 125), 58) +
              [_tx(130, 244, "3 × 120° = 360° ✔", "#86efac", 19), _tx(390, 244, "3 × 108° = 324° ✘", "#fca5a5", 19),
               _tx(460, 112, "gap", "#fde047", 18)], 252)

# ---------------- COLD OPEN ----------------
scene("living", [("tara", 260), ("mum", 600), ("dad", 960)])
L("mum", "Family! I have bought new floor tiles for the kitchen! Pentagon tiles! Sixty percent off!", mood="excited", shot="close", prop="phone")
L("tara", "Why are they sixty percent off?", mood="deadpan", shot="close")
L("mum", "Because they're special. Nobody else has pentagons.", mood="smug", shot="close")
L("tara", "There might be a reason for that.", mood="deadpan", shot="two")
L("dad", "Meanwhile, I have built a bookshelf. All by myself. The shelves are perfectly parallel.", mood="smug", shot="close", prop="book")
sfx("buzzer")
L("mum", "The books just slid off.", mood="deadpan", shot="close")
L("dad", "That's a feature. Gravity assisted reading. Also, I know my angles. A triangle's angles add up to three hundred and sixty. Basic geometry.", mood="smug", shot="close")
freeze("\"TRIANGLE = 360°\"", 2.6, narrator="Narrator: That's a square's job.")
confess("tara", "TARA RAO · 12 · Lives Here, Unfortunately")
L("tara", "Today my mother bought tiles that cannot exist, and my father built a shelf that cannot hold books. Our family is now a geometry problem.", mood="deadpan")
L("tara", "Luckily, I know a monster.", mood="determined", gap=0.6)

title()

# ---------------- ACT 1: ANGLE FACTS & PARALLEL LINES ----------------
scene("living", [("tara", 300)])
L("tara", "Centi! Angles! Urgent!", mood="worried", shot="wide")
sfx("drawer")
poof("centi", 840)
L("centi", "Angles. Fine. I was in the middle of a nap at a very comfortable angle. Approximately horizontal. Let's begin.", mood="bored", shot="close")
L("centi", "Fact one. Angles on a straight line add up to one hundred and eighty degrees. If one part is fifty, the other is one hundred and thirty. It's a half turn. It doesn't negotiate.", mood="teach", shot="close",
  boardClear=True, board="Straight line: angles add to 180°", diagram=D_LINE)
L("tara", "And all the way round a point is a full turn. Three hundred and sixty.", mood="thinking", shot="close", board="Around a point: 360°")
L("centi", "Correct. Now cross two straight lines, like a giant X. The angles opposite each other are equal. Vertically opposite angles. Seventy and seventy. One hundred and ten and one hundred and ten.", mood="teach", shot="close",
  boardClear=True, board="Vertically opposite angles are EQUAL", diagram=D_VOPP)
L("tara", "Because seventy plus one hundred and ten is a straight line both ways.", mood="happy", shot="close", board="70° + 110° = 180° ✔")
L("centi", "Exactly. Now. Your father's shelves. Two parallel lines, and one diagonal brace cutting across them. That diagonal is called a transversal. It sounds fancy. It's a stick.", mood="teach", shot="close",
  boardClear=True, board="Transversal = line crossing parallels", diagram=D_PAR)
L("centi", "Alternate angles are equal. They make a Z shape. Corresponding angles are equal. They make an F shape. Co interior angles sit inside, on the same side, in a C shape. Those add up to one hundred and eighty.", mood="teach", shot="close",
  board="Z equal.  F equal.  C adds to 180°")
L("tara", "So if the top angle is seventy, the Z angle at the bottom is also seventy, and the C angle next to it is one hundred and ten.", mood="thinking", shot="close", board="70° → Z: 70°,  C: 180° − 70° = 110°")
L("centi", "And if your father measures seventy at the top and sixty five at the bottom, the shelves aren't parallel. Which is why the books are now on the floor. Doing their own reading.", mood="smug", shot="close")

confess("dad", "VIKRAM RAO · Dad · Furniture Engineer (Self-Certified)")
L("dad", "The shelf is parallel. The floor isn't. I've written to the H D B.", mood="smug")
L("dad", "They have not replied. Which I take as agreement.", mood="smug", gap=0.6)

# ---------------- ACT 2: TRIANGLES ----------------
scene("living", [("tara", 260), ("dad", 600), ("centi", 960)])
L("tara", "Dad, about the triangle. It's one hundred and eighty, not three hundred and sixty.", mood="deadpan", shot="close")
L("dad", "Prove it.", mood="smug", shot="close")
L("centi", "Gladly. Draw any triangle. Tear off the three corners. Line them up. They make a perfect straight line. Every time. One hundred and eighty degrees.", mood="teach", shot="close",
  boardClear=True, board="Triangle: angles add to 180°", diagram=D_TRI)
L("tara", "So in a triangle with fifty and sixty, the last angle is one hundred and eighty minus one hundred and ten. Seventy.", mood="thinking", shot="close", board="180 − 50 − 60 = 70°")
L("centi", "Bonus fact. Extend one side. The outside angle, the exterior angle, equals the two inside angles opposite it, added together. Fifty plus seventy. One hundred and twenty. No calculator needed.", mood="teach", shot="close",
  board="Exterior angle = sum of 2 opposite inside")
L("dad", "So three hundred and sixty was...", mood="worried", shot="close")
L("tara", "Double. You doubled a triangle, Dad. It's a quadrilateral's number.", mood="deadpan", shot="close")
L("centi", "Four sides. Two triangles. Three hundred and sixty. Your father was just one triangle too generous. The story of his life.", mood="smug", shot="close", boardClear=True, board="Quadrilateral: 2 triangles = 360°")

# ---------------- ACT 3: POLYGONS & TILES ----------------
card("MEANWHILE, IN THE KITCHEN", "Ninety pentagon tiles have arrived", 2.4)
scene("kitchen", [("mum", 300), ("tara", 620), ("centi", 960)])
L("mum", "Okay. First tile. Second tile. Third tile. Why is there a hole?! There's a triangle shaped hole in my floor!", mood="shock", shot="close")
L("centi", "Polygons. Let's find the angles. Pick one corner of the pentagon, and draw diagonals. You get three triangles. Any polygon with n sides splits into n minus two triangles.", mood="teach", shot="close",
  boardClear=True, board="Interior sum = (n − 2) × 180°", diagram=D_PENT)
L("tara", "Pentagon. Five sides. Three triangles. Three times one hundred and eighty is five hundred and forty. Shared between five equal angles, that's one hundred and eight each.", mood="thinking", shot="close",
  board="Pentagon: 540° ÷ 5 = 108°")
L("centi", "Shortcut. Walk round any polygon, and the outside turns, the exterior angles, always add up to three hundred and sixty. Regular pentagon: three hundred and sixty divided by five is seventy two. Inside angle is one hundred and eighty minus seventy two. One hundred and eight again.", mood="teach", shot="close",
  board="Exterior angles always total 360°")
L("tara", "Now for tiling. Tiles that meet at a corner have to add up to exactly three hundred and sixty. Three pentagons make three hundred and twenty four. There's a thirty six degree gap.", mood="determined", shot="close",
  boardClear=True, board="Tiles at a point must total 360°", diagram=D_TESS)
L("centi", "Hexagons, on the other hand. Each angle is one hundred and twenty. Three of them make exactly three hundred and sixty. Perfect fit. That's why bees use hexagons. Bees did the maths. Bees.", mood="smug", shot="close",
  board="Hexagon 120° × 3 = 360° ✔")
L("mum", "So the pentagons were on sale because they don't fit?", mood="sad", shot="close")
L("tara", "They were on sale because they create holes, Mum. You paid for holes.", mood="deadpan", shot="close")
L("centi", "Sixty percent off, one hundred percent gaps. Your family keeps adding percentages to my life. I didn't sign up for this.", mood="eyeroll", shot="close", gap=0.4)
sfx("trombone")

confess("centi", "CENTI · Angle Monster · Each Eye Has A Different Angle")
L("centi", "Recap. For anyone eating dinner. First. Straight line, one hundred and eighty. Around a point, three hundred and sixty. Vertically opposite angles are equal.", mood="teach", boardClear=True, board="1. Line 180°, point 360°, X: opposite equal")
L("centi", "Second. Parallel lines. Z angles equal, F angles equal, C angles add to one hundred and eighty.", mood="teach", board="2. Z equal, F equal, C adds to 180°")
L("centi", "Third. Triangles add to one hundred and eighty. Exterior angle equals the two opposite inside angles.", mood="teach", board="3. Triangle 180°; exterior = sum opposite")
L("centi", "Fourth. Any polygon, the inside angles add to n minus two, times one hundred and eighty. The outside angles always add to three hundred and sixty.", mood="teach", board="4. (n − 2) × 180°;  exterior total 360°")
L("centi", "And finally. Shapes tile only if the angles at a point make exactly three hundred and sixty. Ask the bees.", mood="smug", board="5. Tessellate: angles at a point = 360°", gap=0.5)

scene("living", [("tara", 260), ("mum", 560), ("dad", 860)])
L("mum", "I've returned the pentagons. I bought hexagons instead. They were on sale too.", mood="happy", shot="close")
L("tara", "Why were the hexagons on sale?", mood="deadpan", shot="close")
L("mum", "They're purple.", mood="smug", shot="close")
L("dad", "Purple hexagons. Like Centi. Very hardworking shape. Unlike some monsters.", mood="smug", shot="close")
sfx("ding")
L("centi", "I heard that. I have one hundred eyes, and some of them are ears. Back to the drawer. At least the drawer is a rectangle. Ninety degrees. Every corner. Peace.", mood="bored", shot="wide", offstage=True, gap=0.8)

# ---------------- PAUSE CHALLENGE ----------------
card("PAUSE CHALLENGE", "Centi gives you 5 seconds. Then he gets smug.", 3.0)
challenge(1, "Two angles sit on a straight line. One is 125°. Find the other.", "55°", "180° − 125° = 55°",
  "Question one. Two angles sit on a straight line. One of them is one hundred and twenty five degrees. Find the other.",
  "Fifty five degrees. Straight line, one hundred and eighty. One hundred and eighty minus one hundred and twenty five. Easy. Even the shelf could do this one.")
challenge(2, "What do the interior angles of an octagon add up to?", "1080°", "(8 − 2) × 180° = 6 × 180° = 1080°",
  "Question two. What do the interior angles of an octagon add up to?",
  "One thousand and eighty degrees. Eight sides, six triangles. Six times one hundred and eighty. If you said three hundred and sixty, please go and help Dad with his shelf.")
challenge(3, "Each exterior angle of a regular polygon is 40°. How many sides?", "9 sides", "exterior angles total 360°:  360 ÷ 40 = 9",
  "Question three. Each exterior angle of a regular polygon is forty degrees. How many sides does it have?",
  "Nine sides. The exterior angles always total three hundred and sixty. Three hundred and sixty divided by forty is nine. A nonagon. Nobody ever tiles with those, either.")
end_card()
