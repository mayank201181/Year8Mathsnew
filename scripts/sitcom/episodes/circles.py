# "Totally Raotional" S01E16 "Pi Hard" (Topic: Circles)
# Format and helpers: see common.py; check with lint_episode.py.
import math

EP = dict(topic="circles")

# ---- diagram helpers (SVG for the Holo-Board) ----
def _svg(parts, h=240):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 {h}">' + "".join(parts) + '</svg>'
def _ln(a, b, col="#f8fafc", w=4, dash=False):
    d = ' stroke-dasharray="8 6"' if dash else ''
    return f'<line x1="{a[0]:.1f}" y1="{a[1]:.1f}" x2="{b[0]:.1f}" y2="{b[1]:.1f}" stroke="{col}" stroke-width="{w}" stroke-linecap="round"{d}/>'
def _tx(x, y, s, col="#fde047", size=21, anchor="middle"):
    return f'<text x="{x:.1f}" y="{y:.1f}" font-family="sans-serif" font-size="{size}" fill="{col}" text-anchor="{anchor}">{s}</text>'
def _circ(c, r, col="#f8fafc", fill="none", w=4):
    return f'<circle cx="{c[0]}" cy="{c[1]}" r="{r}" stroke="{col}" stroke-width="{w}" fill="{fill}"/>'

# parts of a circle
D_PARTS = _svg([_circ((140, 125), 100), _ln((40, 125), (240, 125), "#fde047", 4), _ln((140, 125), (140 + 70.7, 125 - 70.7), "#86efac", 4),
                _ln((140 - 86.6, 175), (140 + 86.6, 175), "#fca5a5", 4), _ln((70, 25), (210, 25), "#7dd3fc", 4), '<circle cx="140" cy="125" r="5" fill="#f8fafc"/>',
                _tx(268, 50, "radius r", "#86efac", 20, "start"), _tx(268, 85, "diameter d = 2r", "#fde047", 20, "start"),
                _tx(268, 120, "chord: edge to edge", "#fca5a5", 20, "start"), _tx(268, 155, "tangent: touches once", "#7dd3fc", 20, "start"),
                _tx(268, 190, "circumference: the edge", "#f8fafc", 20, "start")], 240)

# discovering pi: unroll the circumference
_d = 90.0; _C = math.pi * _d
D_PI = _svg([_circ((75, 100), 45, "#c4b5fd"), _ln((30, 100), (120, 100), "#fde047", 3), _tx(75, 92, "d", "#fde047", 18),
             _ln((30, 205), (30 + _C, 205), "#c4b5fd", 5)] +
            [_ln((30 + k * _d, 192), (30 + k * _d, 218), "#fde047", 3) for k in range(4)] +
            [_tx(30 + (k + 0.5) * _d, 236, "d", "#fde047", 19) for k in range(3)] +
            [_tx(30 + 3 * _d + 7, 186, "0.14", "#fca5a5", 16, "start"),
             _tx(190, 60, "C ÷ d = π", "#86efac", 24, "start"), _tx(190, 98, "π = 3.14159265…", "#f8fafc", 21, "start"),
             _tx(190, 134, "never ends, never repeats", "#c4b5fd", 18, "start")], 245)

# area: sectors rearranged into a near-parallelogram
_x0, _W, _top, _bot, _n = 60, math.pi * 110, 90, 200, 6
_w = _W / _n
_parts = []
for i in range(_n):
    a, b = _x0 + i * _w, _x0 + (i + 1) * _w
    _parts.append(f'<polygon points="{a:.1f},{_bot} {b:.1f},{_bot} {(a + b) / 2:.1f},{_top}" fill="#c4b5fd55" stroke="#c4b5fd" stroke-width="2"/>')
    _parts.append(f'<polygon points="{(a + b) / 2:.1f},{_top} {(a + b) / 2 + _w:.1f},{_top} {b:.1f},{_bot}" fill="#fde04744" stroke="#fde047" stroke-width="2"/>')
D_AREA = _svg(_parts + [_ln((_x0 - 12, _top), (_x0 - 12, _bot), "#86efac", 3), _tx(_x0 - 20, 152, "r", "#86efac", 22, "end"),
                        _tx(_x0 + _W / 2, 232, "half the circumference = πr", "#f8fafc", 19),
                        _tx(_x0 + _W / 2, 60, "A ≈ πr × r = πr²", "#86efac", 24)], 245)

# pizzas: two 20 cm vs one 30 cm
D_PIZZA = _svg([_circ((80, 115), 60, "#fde047", "#fde04722"), _circ((210, 115), 60, "#fde047", "#fde04722"), _circ((400, 115), 90, "#86efac", "#86efac22"),
                _tx(80, 120, "r = 10", "#f8fafc", 18), _tx(210, 120, "r = 10", "#f8fafc", 18), _tx(400, 120, "r = 15", "#f8fafc", 20),
                _tx(145, 232, "2 × π × 10² = 200π", "#fde047", 20), _tx(400, 232, "π × 15² = 225π", "#86efac", 20)], 245)

# semicircle: arc + diameter
D_SEMI = _svg(['<path d="M110,190 A150,150 0 0 1 410,190" stroke="#c4b5fd" stroke-width="5" fill="#c4b5fd22"/>', _ln((110, 190), (410, 190), "#fca5a5", 5),
               _tx(260, 28, "curved: ½ × π × 2 = 3.14 m", "#c4b5fd", 20), _tx(260, 182, "straight edge: 2 m", "#fca5a5", 20),
               _tx(260, 228, "perimeter = 3.14 + 2 = 5.14 m", "#86efac", 21)], 245)

# ---------------- COLD OPEN ----------------
scene("living", [("tara", 260), ("mum", 600), ("dad", 960)])
L("dad", "Family. Behold. Our new round dining table. At a round table, everyone is equal.", mood="smug", shot="close")
L("tara", "Then why did you put a sticker on one chair that says Head of Table?", mood="deadpan", shot="close")
L("dad", "Every circle needs a centre, Tara.", mood="smug", shot="close")
L("mum", "I'm going to put fairy lights all around the edge! And a round tablecloth! How much do I need?", mood="excited", shot="close", prop="phone")
L("dad", "Easy. The table is one point two metres across. Pi is three. Three times one point two. Three point six metres of lights. Basic maths.", mood="smug", shot="close")
freeze("\"PI IS THREE\"", 2.6, narrator="Narrator: Pi has never been exactly anything.")
confess("tara", "TARA RAO · 12 · Knows At Least Ten Digits Of Pi")
L("tara", "Pi is the most famous number in the world. It has its own day. People recite it for fun.", mood="deadpan")
L("tara", "And my father just rounded it to three. Like rounding a cake down to a biscuit.", mood="deadpan", gap=0.6)

title()

# ---------------- ACT 1: PARTS OF A CIRCLE & PI ----------------
scene("kitchen", [("tara", 380)])
L("tara", "Centi. Circle emergency. Dad's rounding pi.", mood="worried", shot="wide")
sfx("drawer")
poof("centi", 860)
L("centi", "Rounding pi. To what. Three? Of course. Some people just want to watch the world burn. Let's start with the names.", mood="eyeroll", shot="close")
L("centi", "The radius goes from the centre to the edge. The diameter goes all the way across, through the centre. So the diameter is twice the radius. Two r.", mood="teach", shot="close",
  boardClear=True, board="Diameter = 2 × radius", diagram=D_PARTS)
L("centi", "The edge itself is the circumference. A chord joins two points on the edge, but it doesn't have to go through the centre. And a tangent just touches the circle once. Very polite. Doesn't commit.", mood="teach", shot="close",
  board="Chord: edge to edge.  Tangent: touches")
L("tara", "So a diameter is basically the biggest chord. The one that goes through the middle.", mood="thinking", shot="close", board="Diameter = the longest chord")
L("centi", "Correct. Now. Where does pi come from? Get a plate and a piece of string.", mood="teach", shot="close")
L("tara", "String around the edge is seventy eight and a half centimetres. The plate is twenty five centimetres across.", mood="thinking", shot="close", prop="plate",
  boardClear=True, board="C = 78.5 cm,  d = 25 cm", diagram=D_PI)
L("tara", "Seventy eight point five divided by twenty five. Three point one four.", mood="happy", shot="close", board="78.5 ÷ 25 = 3.14")
L("centi", "Try it with any circle. A coin. A wheel. A hawker table. The Singapore Flyer. Circumference divided by diameter is always the same number. Pi. About three point one four one five nine.", mood="teach", shot="close",
  board="Any circle: C ÷ d = π ≈ 3.14159")
L("centi", "And it never ends, and never repeats. It's irrational. You can't write it as a fraction. Three point one four and twenty two over seven are just approximations. Three is an insult.", mood="smug", shot="close")

confess("centi", "CENTI · Circle Monster · Has Exactly 100 Round Eyes")
L("centi", "Every one of my eyes is a circle. One hundred circles. One hundred circumferences. That's a lot of pi. And not one of them is three.", mood="bored")
L("centi", "My uncle Pie is a dessert. Different family. We don't talk about him.", mood="bored", gap=0.5)

# ---------------- ACT 2: CIRCUMFERENCE & AREA ----------------
scene("living", [("tara", 260), ("mum", 560), ("dad", 820), ("centi", 1060)])
L("mum", "The lights arrived! Three point six metres. Wrapping them round the table... they don't meet! There's a gap!", mood="shock", shot="close")
L("centi", "Circumference. C equals pi d. Or two pi r, same thing, because d is two r. Pi times one point two metres is three point seven seven metres.", mood="teach", shot="close",
  boardClear=True, board="C = πd = 2πr")
L("tara", "Three point seven seven minus three point six. Dad, you're seventeen centimetres short. Because you used three.", mood="deadpan", shot="close", board="π × 1.2 = 3.77 m  (not 3.6!)")
L("dad", "Seventeen centimetres is nothing!", mood="annoyed", shot="close")
L("tara", "It's a gap of darkness right where your Head of Table sticker is.", mood="smug", shot="close")
L("dad", "Fine. But I'll do the tablecloth. Area is pi r squared. Pi times one point two squared. Four point five two square metres.", mood="smug", shot="close")
L("centi", "You used the diameter. The formula says r. Radius. Half of one point two is zero point six. Zero point six squared is zero point three six. Times pi. One point one three square metres.", mood="eyeroll", shot="close",
  board="A = πr²,  r = 1.2 ÷ 2 = 0.6")
L("tara", "Using the diameter made it four times too big. Dad ordered a tablecloth for the entire flat.", mood="deadpan", shot="close", board="π × 0.6² = 1.13 m² ✔  (not 4.52)")
sfx("trombone")
L("dad", "We could use it as a curtain.", mood="sad", shot="close")
L("centi", "Why pi r squared? Cut a circle into thin slices, like a pizza. Line them up, pointing up, pointing down, up, down. You get a shape that's almost a parallelogram.", mood="teach", shot="close",
  boardClear=True, board="Slices → almost a parallelogram", diagram=D_AREA)
L("centi", "Its height is the radius. Its length is half the circumference, which is pi r. So the area is pi r, times r. Pi r squared. Thinner slices, more perfect. No calculator required. Just a knife.", mood="teach", shot="close",
  board="Area = πr × r = πr²")

# ---------------- ACT 3: PIZZA & SEMICIRCLES ----------------
card("SATURDAY, AT THE HAWKER CENTRE", "Uncle Hock has invented a new dish", 2.4)
scene("hawker", [("mum", 260), ("tara", 520), ("uncle", 1000)])
L("uncle", "New fusion stall! Roti pizza, all vegetarian! Two small ones, twenty centimetres across, twelve dollars. Or one large one, thirty centimetres, also twelve dollars.", mood="excited", shot="close")
L("mum", "Two pizzas! Obviously! Two is more than one!", mood="excited", shot="close")
poof("centi", 780)
L("centi", "Two is more than one. Wonderful. Somebody do the area.", mood="bored", shot="close", boardClear=True)
L("tara", "Small pizza, radius ten. Pi times ten squared is one hundred pi. Two of them is two hundred pi. Large pizza, radius fifteen. Pi times fifteen squared. Two hundred and twenty five pi.", mood="thinking", shot="close",
  board="2 small: 200π   1 large: 225π", diagram=D_PIZZA)
L("tara", "The large one is bigger! By twenty five pi. That's about seventy nine extra square centimetres of pizza.", mood="happy", shot="close", board="Large wins by 25π ≈ 79 cm²")
L("uncle", "Nobody ever does the area. I make a lot of money from that.", mood="smug", shot="close")
L("centi", "Doubling the radius doesn't double the area. It multiplies it by four. Area grows with the square. That's why a pizza that looks a little bigger is a lot more pizza.", mood="teach", shot="close")
L("uncle", "And I need lights around my new half moon sign. It's a semicircle. Two metres across.", mood="thinking", shot="close")
L("mum", "Half of pi times two. Three point one four metres!", mood="smug", shot="close")
L("centi", "Half the circumference, yes. But a semicircle also has a straight edge. The diameter. People forget it constantly. Three point one four plus two. Five point one four metres.", mood="teach", shot="close",
  boardClear=True, board="Semicircle: ½πd + d  (don't forget d!)", diagram=D_SEMI)
L("tara", "Otherwise the bottom of the sign would just be dark. Like the gap at our table.", mood="deadpan", shot="close")
L("uncle", "Smart girl. Free extra chilli for you.", mood="happy", shot="close")

confess("dad", "VIKRAM RAO · Dad · Head Of Table (Disputed)")
L("dad", "I have reconsidered my position on pi. Pi is not three.", mood="sad")
L("dad", "It's three and a bit. And the bit is very expensive. Especially in tablecloths.", mood="smug", gap=0.6)

confess("centi", "CENTI · Recap Monster · Speaking In Circles")
L("centi", "Recap. For anyone eating dinner. First. Diameter is twice the radius. Chords join two edge points. Tangents touch once.", mood="teach", boardClear=True, board="1. d = 2r.  chord, tangent, arc")
L("centi", "Second. Pi is circumference divided by diameter. About three point one four. It never ends.", mood="teach", board="2. π = C ÷ d ≈ 3.14 (irrational)")
L("centi", "Third. Circumference is pi d, or two pi r.", mood="teach", board="3. C = πd = 2πr")
L("centi", "Fourth. Area is pi r squared. Radius! Not diameter. Halve it first.", mood="teach", board="4. A = πr²  (halve d first!)")
L("centi", "And finally. Semicircles. Half the circle, plus the straight edge. Don't leave the diameter in the dark.", mood="smug", board="5. Semicircle: half + the diameter", gap=0.5)

scene("living", [("tara", 260), ("mum", 560), ("dad", 860)])
L("mum", "The new lights fit perfectly! Three point eight metres. And the tablecloth is just right.", mood="happy", shot="close")
L("dad", "And I have memorised pi. Three point one four one five nine. And then some other ones.", mood="smug", shot="close")
L("tara", "That's five digits, Dad.", mood="deadpan", shot="close")
L("dad", "Five more than yesterday.", mood="smug", shot="close")
sfx("ding")
L("centi", "Back to the drawer. It's a rectangle. Four corners. Zero pi. Just crumbs and peace.", mood="bored", shot="wide", offstage=True, gap=0.8)

# ---------------- PAUSE CHALLENGE ----------------
card("PAUSE CHALLENGE", "Centi gives you 5 seconds. Then he gets smug.", 3.0)
challenge(1, "A circle has radius 5 cm. Find its circumference in terms of π.", "10π cm", "C = 2πr = 2 × π × 5 = 10π",
  "Question one. A circle has a radius of five centimetres. Find its circumference, in terms of pi.",
  "Ten pi centimetres. Two pi r. Two times pi times five. Ten pi. Leave the pi in. It likes it there.")
challenge(2, "Find the area of a circle with diameter 8 cm, in terms of π.", "16π cm²", "r = 8 ÷ 2 = 4,   A = πr² = π × 4² = 16π",
  "Question two. Find the area of a circle with a diameter of eight centimetres. Give your answer in terms of pi.",
  "Sixteen pi square centimetres. Halve the diameter first. Radius four. Four squared is sixteen. If you said sixty four pi, you used the diameter. Dad says hi.")
challenge(3, "Find the perimeter of a semicircle with diameter 10 cm. (π = 3.14)", "25.7 cm", "½ × 3.14 × 10 = 15.7,   15.7 + 10 = 25.7",
  "Question three. Find the perimeter of a semicircle with a diameter of ten centimetres. Use three point one four for pi.",
  "Twenty five point seven centimetres. Half of pi times ten is fifteen point seven. Then add the straight edge, ten. Twenty five point seven.")
end_card()
