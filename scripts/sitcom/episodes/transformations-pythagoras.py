# "Totally Raotional" S01E17 "Mirror, Mirror, On The Axis" (Topic: Transformations & Symmetry)
# Format and helpers: see common.py; check with lint_episode.py.

EP = dict(topic="transformations-pythagoras", logline="Tara's dance routine meets the self-titled Dancing Accountant. Translations, reflections, rotations, enlargements and a Pythagoras shortcut.")

# ---- diagram helpers (dark-board friendly SVG) ----
SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 {h}">{body}</svg>'
def grid(w, h, step):
    v = "".join(f'<line x1="{x}" y1="0" x2="{x}" y2="{h}" stroke="#f8fafc" stroke-opacity="0.18" stroke-width="1"/>' for x in range(0, w + 1, step))
    s = "".join(f'<line x1="0" y1="{y}" x2="{w}" y2="{y}" stroke="#f8fafc" stroke-opacity="0.18" stroke-width="1"/>' for y in range(0, h + 1, step))
    return v + s
def poly(pts, col, fill_op=0.25):
    p = " ".join(f"{x},{y}" for x, y in pts)
    return f'<polygon points="{p}" fill="{col}" fill-opacity="{fill_op}" stroke="{col}" stroke-width="3"/>'
def txt(x, y, s, col="#f8fafc", size=22):
    return f'<text x="{x}" y="{y}" font-family="sans-serif" font-size="{size}" fill="{col}">{s}</text>'

D_TRANSLATE = SVG.format(h=240, body=grid(520, 240, 30)
    + poly([(60, 120), (120, 120), (60, 60)], "#7dd3fc")
    + poly([(150, 180), (210, 180), (150, 120)], "#fde047")
    + '<line x1="60" y1="120" x2="146" y2="177" stroke="#fca5a5" stroke-width="3" stroke-dasharray="6 5"/>'
    + txt(70, 105, "A", "#7dd3fc") + txt(158, 170, "A′", "#fde047")
    + txt(290, 90, "3 right", "#fca5a5", 24) + txt(290, 125, "2 down", "#fca5a5", 24)
    + txt(290, 170, "vector (3, −2)", "#f8fafc", 22))

D_MIRROR = SVG.format(h=240, body=grid(520, 240, 30)
    + '<line x1="260" y1="0" x2="260" y2="240" stroke="#fde047" stroke-width="4" stroke-dasharray="10 6"/>'
    + poly([(150, 60), (180, 60), (180, 150), (220, 150), (220, 180), (150, 180)], "#7dd3fc")
    + poly([(370, 60), (340, 60), (340, 150), (300, 150), (300, 180), (370, 180)], "#86efac")
    + '<line x1="220" y1="200" x2="300" y2="200" stroke="#fca5a5" stroke-width="3"/>'
    + txt(268, 228, "mirror", "#fde047", 18) + txt(196, 222, "40", "#fca5a5", 18) + txt(306, 222, "40", "#fca5a5", 18))

D_ENLARGE = SVG.format(h=240, body=grid(520, 240, 20)
    + poly([(40, 180), (80, 180), (80, 120), (40, 120)], "#7dd3fc")
    + poly([(220, 220), (340, 220), (340, 40), (220, 40)], "#fde047", 0.15)
    + txt(36, 112, "10×15", "#7dd3fc", 18) + txt(226, 32, "30×45  (SF 3)", "#fde047", 20)
    + txt(360, 120, "lengths × 3", "#f8fafc", 22) + txt(360, 160, "area × 9", "#fca5a5", 24))

D_PYTH = SVG.format(h=240, body=
    poly([(80, 200), (400, 200), (80, 40)], "#86efac", 0.12)
    + '<polyline points="80,180 100,180 100,200" fill="none" stroke="#f8fafc" stroke-width="3"/>'
    + txt(210, 230, "40 m", "#7dd3fc", 24) + txt(20, 130, "30 m", "#7dd3fc", 24)
    + txt(250, 110, "? (hypotenuse)", "#fde047", 24))

# ---------------- COLD OPEN ----------------
scene("living", [("tara", 300), ("dad", 760)])
L("tara", "Okay. Showcase is on Friday. Slide right three, back two, flip, spin, zoom. I've got this.", mood="determined", shot="close")
L("dad", "Darling. Let a professional help. In my university days, I was known as the Dancing Accountant.", mood="smug", shot="close")
L("tara", "Known by who?", mood="deadpan", shot="close")
L("dad", "Mostly by myself. Watch closely. This is my signature move. The Banana Slide. Three steps right!", mood="excited", shot="wide")
L("tara", "You went left.", mood="deadpan", shot="close")
L("dad", "Left is just right, from the other side. Basic geometry.", mood="smug", shot="close")
freeze("\"LEFT IS JUST RIGHT\"", 2.4, narrator="Narrator: It is not just right.")
scene("living", [("tara", 260), ("dad", 600), ("mum", 960)])
sfx("door")
L("mum", "Surprise! I enlarged our family photo for the wall. Scale factor three!", mood="excited", shot="close", prop="book")
L("dad", "Three times bigger. Lovely. So three times the price?", mood="happy", shot="close")
L("mum", "Strangely, no. Nine times the price. The shop is clearly cheating us.", mood="annoyed", shot="close")
L("tara", "Or the shop is doing maths.", mood="deadpan", shot="two", gap=0.5)
confess("tara", "TARA RAO · 12 · Choreographer · Supervising Adults Against Her Will")
L("tara", "My dance has four moves. A slide, a flip, a spin and a zoom. My family has zero moves. And one very large photo of themselves.", mood="deadpan")
L("tara", "The poster covers the whole window now. We don't know if it's day or night anymore. We just know our own faces.", mood="deadpan", gap=0.6)

title()

# ---------------- ACT 1: THE FOUR MOVES ----------------
scene("kitchen", [("tara", 380)])
L("tara", "Okay. Time to wake up the calculator.", mood="determined", shot="wide")
sfx("drawer")
poof("centi", 820)
L("centi", "You again. What is it this time? Did somebody put a decimal point in the wrong place?", mood="bored", shot="close")
L("tara", "Worse. I need to describe my dance moves exactly. And Dad thinks left is right from the other side.", mood="worried", shot="two")
L("centi", "That's not a dance move. That's a warning sign.", mood="eyeroll", shot="close", gap=0.3)
L("centi", "Good news. Your routine is four transformations. A slide is a translation. A flip is a reflection. A spin is a rotation. And a zoom is an enlargement.", mood="teach", shot="close",
  boardClear=True, board="Slide = TRANSLATION")
L("tara", "So my whole dance is basically a maths lesson with music.", mood="thinking", shot="close", board="Flip = REFLECTION")
L("centi", "Most things are. That's why I never go to parties.", mood="bored", shot="close", board="Spin = ROTATION   Zoom = ENLARGEMENT", gap=0.3)

L("centi", "First, the slide. In a translation every point moves the same distance in the same direction. Nothing turns. Nothing flips. We describe it with a column vector.", mood="teach", shot="close",
  boardClear=True, board="Translation: every point moves the same", diagram=D_TRANSLATE)
L("centi", "The top number is across. Positive goes right, negative goes left. The bottom number is up or down. Positive goes up, negative goes down.", mood="teach", shot="close",
  board="Vector: top = across, bottom = up/down")
L("tara", "So three, over minus two, means three right and two down.", mood="happy", shot="close", board="(3, −2) → 3 right, 2 down ✔")
L("centi", "Correct. Negative bottom number, the shape goes down. Like your father's dance career.", mood="smug", shot="two")
L("centi", "And the shape that arrives is identical. Same size. Same shape. Mathematicians call that congruent. I call it the only stable relationship in this house.", mood="bored", shot="close", gap=0.4)

L("centi", "Second, the flip. A reflection needs a mirror line. Every point lands the same distance from the mirror, on the other side, measured straight across at right angles.", mood="teach", shot="close",
  boardClear=True, board="Reflection: same distance, other side", diagram=D_MIRROR)
L("tara", "So in the mirror, my left hand ends up on the right side.", mood="thinking", shot="close", board="Measure at RIGHT ANGLES to the mirror")
L("centi", "Exactly. That's why your T shirt says your name backwards in the bathroom mirror. A, R, A, T. Arat. Sounds like one of my cousins. Arat has six eyes and anxiety.", mood="smug", shot="close")
L("centi", "To describe a reflection, you just name the mirror line. The line x equals two. Or the line y equals x. Done.", mood="teach", shot="close", board="Describe it: name the mirror line", gap=0.4)

L("centi", "Third, the spin. A rotation needs THREE things. The centre you turn around. The angle. And the direction, clockwise or anticlockwise.", mood="teach", shot="close",
  boardClear=True, board="Rotation: CENTRE + ANGLE + DIRECTION")
L("tara", "So my spin is a ninety degree turn, clockwise, about my left foot.", mood="happy", shot="close", board="e.g. 90° clockwise about (0, 0)")
L("centi", "Perfect. Your father's spin is some degrees, in some direction, about the coffee table. Which is now in two pieces.", mood="eyeroll", shot="close")

confess("dad", "VIKRAM RAO · Dad · The Dancing Accountant (Self-Titled)")
L("dad", "People ask me, Vikram, how do you stay so calm under pressure? I tell them. I rotate. Ninety degrees. Away from the problem.", mood="smug")
L("dad", "Clockwise. Always clockwise. I'm not a monster.", mood="smug", gap=0.6)

# ---------------- ACT 2: THE POSTER ----------------
card("MEANWHILE, IN THE LIVING ROOM", "Natural light: discontinued", 2.4)
scene("living", [("tara", 260), ("mum", 560), ("centi", 900)])
L("mum", "Centi. Explain this receipt. Original photo, ten by fifteen centimetres. I asked for scale factor three. They charged me for NINE photos!", mood="annoyed", shot="close")
L("centi", "Scale factor three means every LENGTH is multiplied by three. Ten becomes thirty. Fifteen becomes forty five.", mood="teach", shot="close",
  boardClear=True, board="SF 3: 10 × 15 cm → 30 × 45 cm", diagram=D_ENLARGE)
L("tara", "But area is length times width. So it's three times three. Nine times the area.", mood="thinking", shot="close", board="Area: 150 cm² → 1350 cm²  (× 9!)")
L("mum", "Nine! I'm paying for nine times the area of my own face?", mood="shock", shot="close")
L("centi", "Scale factor three, area factor nine. Lengths times the scale factor. Areas times the scale factor squared. Somebody write that on the poster. There's room.", mood="smug", shot="close",
  board="Lengths × k,  areas × k²")
L("mum", "Fine. Then I'll ask for scale factor one point five instead. Half the size!", mood="determined", shot="close")
L("tara", "Mum. Scale factor one point five is still BIGGER than the original photo.", mood="deadpan", shot="close")
L("centi", "Bigger than one, it grows. Between zero and one, it shrinks. Scale factor one half would halve every length. And quarter the area.", mood="teach", shot="close",
  boardClear=True, board="SF > 1 grows,  0 < SF < 1 shrinks")
L("centi", "And to describe an enlargement properly, give the scale factor AND the centre. The point everything zooms away from.", mood="teach", shot="close", board="Describe it: SF + centre of enlargement")
L("centi", "One more thing. Slides, flips and spins keep the size, so the shapes are congruent. An enlargement keeps the shape but changes the size. That's called similar.", mood="teach", shot="close",
  board="Slide, flip, spin → CONGRUENT")
L("tara", "So the poster is similar to Mum. Just. Enormous.", mood="deadpan", shot="close", board="Enlargement → SIMILAR (same shape)")
L("mum", "I'm choosing to hear that as a compliment.", mood="smug", shot="two", gap=0.4)

# ---------------- ACT 3: THE PARK ----------------
card("SATURDAY, AT THE PARK", "Showcase rehearsal: outdoor edition", 2.2)
scene("park", [("tara", 260), ("dad", 620), ("centi", 980)])
L("dad", "Rehearsal is at the far corner of the field. I'll walk along the edges. Thirty metres this way, forty metres that way. Seventy metres. Basic geometry.", mood="smug", shot="close")
L("tara", "Or we just walk straight across, on the diagonal.", mood="deadpan", shot="close")
L("dad", "The diagonal is obviously also seventy. It joins the same corners.", mood="smug", shot="close")
L("centi", "Stretch bonus. Pythagoras. In a right angled triangle, the longest side is the hypotenuse. The hypotenuse squared equals the other two sides squared, added together.", mood="teach", shot="close",
  boardClear=True, board="a² + b² = c²", diagram=D_PYTH)
L("tara", "Thirty squared is nine hundred. Forty squared is one thousand six hundred. Add them. Two thousand five hundred.", mood="thinking", shot="close", board="30² + 40² = 900 + 1600 = 2500")
L("tara", "The square root of two thousand five hundred is fifty. Fifty metres! The diagonal saves us twenty metres.", mood="happy", shot="close", board="c = √2500 = 50 m  (saves 20 m!)")
L("dad", "Twenty metres! That's almost a whole Banana Slide.", mood="excited", shot="close")
L("centi", "And notice. You square first, THEN add. If you add thirty and forty first and then square it, you get a number the size of my disappointment.", mood="eyeroll", shot="close", gap=0.4)

confess("centi", "CENTI · Recap Monster · Currently Facing North")
L("centi", "Recap. For anyone eating dinner. First. A translation is a slide. Use a column vector. Top number across, bottom number up or down.", mood="teach",
  boardClear=True, board="1. Translation → column vector")
L("centi", "Second. A reflection is a flip. Name the mirror line. Same distance, other side.", mood="teach", board="2. Reflection → name the mirror line")
L("centi", "Third. A rotation is a spin. Always give the centre, the angle and the direction.", mood="teach", board="3. Rotation → centre, angle, direction")
L("centi", "Fourth. An enlargement is a zoom. Give the scale factor and the centre. The area grows by the scale factor squared.", mood="teach", board="4. Enlargement → SF + centre (area × SF²)")
L("centi", "And finally. The first three make congruent shapes. Enlargements make similar ones. Now, please, rotate me one hundred and eighty degrees. Back into the drawer.", mood="bored",
  board="Congruent = same size · Similar = scaled", gap=0.5)

scene("living", [("tara", 260), ("mum", 560), ("dad", 860)])
L("tara", "Showcase went great. Translation, reflection, rotation, enlargement. Standing ovation.", mood="happy", shot="close")
L("mum", "And your father joined in at the end!", mood="excited", shot="close")
L("dad", "My finale. A full rotation. Three hundred and sixty degrees. Clockwise.", mood="smug", shot="close")
L("tara", "Dad. Three hundred and sixty degrees puts you exactly where you started.", mood="deadpan", shot="close")
L("dad", "Exactly. Perfectly executed. Zero mistakes.", mood="smug", shot="close")
L("tara", "He technically did nothing. Flawlessly.", mood="deadpan", shot="two")
sfx("ding")
L("centi", "Still his best performance.", mood="bored", shot="wide", offstage=True, gap=0.8)

# ---------------- PAUSE CHALLENGE ----------------
card("PAUSE CHALLENGE", "Centi gives you 5 seconds. Then he gets smug.", 3.0)
challenge(1, "A photo 8 cm × 12 cm is enlarged by scale factor 2. New size? How many times the area?", "16×24, ×4",
  "Lengths × 2 → 16 × 24.  Area × 2² = × 4",
  "Question one. A photo eight by twelve centimetres is enlarged by scale factor two. What's the new size, and how many times bigger is the area?",
  "Sixteen by twenty four. And the area is four times bigger, because two squared is four. If you said twice, your poster is now blocking a window.")
challenge(2, "The point (1, 2) is translated 3 right and 4 up. Where does it land?", "(4, 6)",
  "(1 + 3, 2 + 4) = (4, 6)",
  "Question two. The point one comma two is translated three right and four up. Where does it land?",
  "Four comma six. Add three to the x. Add four to the y. Easy. Unlike the Banana Slide.")
challenge(3, "A right-angled triangle has shorter sides 6 cm and 8 cm. How long is the hypotenuse?", "10 cm",
  "6² + 8² = 36 + 64 = 100,  √100 = 10",
  "Question three. A right angled triangle has shorter sides of six and eight centimetres. How long is the hypotenuse?",
  "Ten centimetres. Six squared plus eight squared is one hundred. Square root, ten. If you said fourteen, you added before squaring. Go and walk the long way round with Dad.")
end_card()
