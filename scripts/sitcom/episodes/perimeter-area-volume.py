# "Totally Raotional" S01E15 "Room For Improvement" (Topic: Area, Surface Area & Volume)
# Format and helpers: see common.py; check with lint_episode.py.

EP = dict(topic="perimeter-area-volume", logline="Mum measures Tara's room with her arm; Dad fills a fish tank with one-litre bottles. Perimeter vs area, compound shapes and volume.")

# ---- diagram helpers (SVG for the Holo-Board) ----
def _svg(parts, h=240):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 {h}">' + "".join(parts) + '</svg>'
def _ln(a, b, col="#f8fafc", w=4, dash=False):
    d = ' stroke-dasharray="8 6"' if dash else ''
    return f'<line x1="{a[0]}" y1="{a[1]}" x2="{b[0]}" y2="{b[1]}" stroke="{col}" stroke-width="{w}" stroke-linecap="round"{d}/>'
def _tx(x, y, s, col="#fde047", size=21, anchor="middle"):
    return f'<text x="{x}" y="{y}" font-family="sans-serif" font-size="{size}" fill="{col}" text-anchor="{anchor}">{s}</text>'
def _poly(pts, col="#c4b5fd", fill="none", w=4):
    return f'<polygon points="{" ".join(f"{x},{y}" for x, y in pts)}" stroke="{col}" stroke-width="{w}" fill="{fill}" stroke-linejoin="round"/>'

# L-shaped room: 5 m x 4 m with a 2 m x 1.5 m corner cut out
D_ROOM = _svg([_poly([(60, 25), (210, 25), (210, 100), (310, 100), (310, 225), (60, 225)], "#f8fafc", "#86efac22"),
               _poly([(210, 25), (310, 25), (310, 100), (210, 100)], "#fca5a5", "none", 2),
               _tx(185, 250, "5 m"), _tx(48, 132, "4 m", anchor="end"), _tx(135, 18, "3 m"), _tx(204, 70, "1.5 m", size=18, anchor="end"),
               _tx(260, 92, "2 m", size=18), _tx(318, 170, "2.5 m", anchor="start"), _tx(260, 60, "wardrobe", "#fca5a5", 16),
               _tx(390, 80, "P = 18 m", "#7dd3fc", 22, "start"), _tx(390, 125, "A = 20 − 3", "#86efac", 22, "start"), _tx(390, 160, "= 17 m²", "#86efac", 22, "start")], 260)

# triangle rug: base 2 m, slant 1.5 m, perpendicular height 1.2 m
D_TRI = _svg([_poly([(60, 200), (360, 200), (195, 20)], "#f8fafc", "#c4b5fd22"), _ln((195, 20), (195, 200), "#fde047", 3, True),
              '<polyline points="195,186 209,186 209,200" stroke="#fde047" stroke-width="3" fill="none"/>',
              _tx(210, 228, "2 m"), _tx(108, 100, "1.5 m", "#fca5a5", 20, "end"), _tx(202, 120, "1.2 m", "#fde047", 20, "start"),
              _tx(510, 80, "½ × b × h", "#f8fafc", 21, "end"), _tx(510, 118, "½ × 2 × 1.2", "#f8fafc", 21, "end"), _tx(510, 156, "= 1.2 m²", "#86efac", 23, "end")], 240)

# trapezium cushion: parallel sides 0.8 m and 1.2 m, height 0.5 m
D_TRAP = _svg([_poly([(60, 200), (360, 200), (310, 75), (110, 75)], "#f8fafc", "#f472b633"), _ln((110, 75), (110, 200), "#fde047", 3, True),
               _tx(210, 66, "0.8 m"), _tx(210, 228, "1.2 m"), _tx(118, 145, "0.5 m", "#fde047", 19, "start"),
               _tx(510, 80, "½(a + b) × h", "#f8fafc", 21, "end"), _tx(510, 118, "½ × 2.0 × 0.5", "#f8fafc", 21, "end"), _tx(510, 156, "= 0.5 m²", "#86efac", 23, "end")], 240)

# fish tank: 100 x 50 x 50 cm
D_TANK = _svg([_poly([(60, 120), (320, 120), (320, 235), (60, 235)], "#7dd3fc", "#7dd3fc33", 3),
               _poly([(60, 100), (130, 45), (390, 45), (320, 100)], "#f8fafc", "none", 3), _poly([(320, 100), (390, 45), (390, 175), (320, 230)], "#f8fafc", "none", 3),
               _poly([(60, 100), (320, 100), (320, 230), (60, 230)], "#f8fafc", "none", 4),
               _tx(190, 254, "100 cm"), _tx(70, 180, "50 cm", "#f8fafc", 20, "start"), _tx(398, 72, "50 cm", anchor="start"),
               _tx(512, 140, "V = l × w × h", "#86efac", 20, "end")], 260)

# ---------------- COLD OPEN ----------------
scene("living", [("tara", 260), ("mum", 600), ("dad", 960)])
L("mum", "Big news! We are renovating Tara's room! I've already ordered everything. Seventeen metres of skirting board, and eighteen square metres of floor tiles!", mood="excited", shot="close", prop="phone")
L("tara", "Did you measure my room, or did you have a feeling?", mood="deadpan", shot="close")
L("mum", "I measured! Mostly. With my arm.", mood="smug", shot="close")
L("dad", "And I've bought you a fish tank! One metre long, fifty centimetres wide, fifty centimetres tall. To fill it, I've ordered water. In one litre bottles.", mood="smug", shot="close", prop="tablet")
L("tara", "How many bottles?", mood="worried", shot="close")
L("dad", "Volume is easy. You add the sides. One hundred, plus fifty, plus fifty. Two hundred litres. Two hundred bottles. Basic maths.", mood="smug", shot="close")
freeze("\"ADD THE SIDES\"", 2.6, narrator="Narrator: Two hundred bottles are on their way.")
confess("tara", "TARA RAO · 12 · Room Currently Being Renovated By Amateurs")
L("tara", "My room is being renovated. By my parents. Using maths they found on the floor.", mood="deadpan")
L("tara", "If I don't survive this episode, I'd like my calculator to go to the monster inside it.", mood="deadpan", gap=0.6)

title()

# ---------------- ACT 1: PERIMETER VS AREA, COMPOUND SHAPES ----------------
scene("living", [("tara", 300), ("mum", 620)])
L("tara", "Centi. Renovation emergency. My parents have numbers. Wrong ones.", mood="worried", shot="wide")
sfx("drawer")
poof("centi", 960)
L("centi", "A renovation. My favourite. Loud noises, dust everywhere, and adults measuring things with their arms. Show me the room.", mood="bored", shot="close")
L("centi", "First. Perimeter and area are different things. Perimeter is the distance around the edge. It's a length, in metres. Skirting board goes round the edge. Perimeter.", mood="teach", shot="close",
  boardClear=True, board="Perimeter: around the edge (m)", diagram=D_ROOM)
L("centi", "Area is the space inside. Square metres. Floor tiles cover the inside. Area. Different units. Different jobs. They are not interchangeable. Like your parents.", mood="teach", shot="close",
  board="Area: space inside (m²)")
L("tara", "My room is an L shape. Five metres by four metres, but with a two metre by one and a half metre corner taken out for the wardrobe.", mood="thinking", shot="close")
L("centi", "Compound shape. Easiest trick: big rectangle, minus the missing bit. Five times four is twenty. Two times one and a half is three. Twenty minus three.", mood="teach", shot="close",
  board="Area = big − missing = 20 − 3 = 17 m²")
L("tara", "Seventeen square metres of floor. And the perimeter, I add all six sides. Five, four, three, one and a half, two, two and a half. Eighteen metres.", mood="happy", shot="close")
L("centi", "Fun fact. Cutting a corner out doesn't change the perimeter. The two new edges just replace the two bits you removed. Same eighteen metres as the full rectangle. Corners are sneaky like that.", mood="smug", shot="close")
L("mum", "So I need eighteen metres of skirting, and seventeen square metres of tiles.", mood="thinking", shot="close")
L("tara", "And you ordered seventeen metres of skirting and eighteen square metres of tiles. Mum. You swapped them.", mood="deadpan", shot="close")
L("mum", "That's... very close though!", mood="worried", shot="close")
L("centi", "One metre of skirting short, one square metre of tile left over. And units in the wrong place. Like wearing your shoes on your hands. You still have four shoes. You are still wrong.", mood="eyeroll", shot="close", gap=0.4)

confess("mum", "ANJALI RAO · Mum · Renovation Manager · Measures With Arm")
L("mum", "In my defence, the numbers were right. They were just in each other's boxes.", mood="smug")
L("mum", "The extra tile is now a coaster. A very large coaster. Fully renovated.", mood="happy", gap=0.6)

# ---------------- ACT 2: TRIANGLES, PARALLELOGRAMS, TRAPEZIA ----------------
card("MEANWHILE, THE SHOPPING CONTINUES", "Mum has found more shapes", 2.4)
scene("mall", [("mum", 300), ("dad", 620), ("centi", 950)])
L("mum", "A triangle rug! The base is two metres. The sloping side is one and a half metres. Price is per square metre. How much rug is it?", mood="excited", shot="close")
L("dad", "Half times base times side. Half of two times one point five. One point five square metres. I'm on a roll.", mood="smug", shot="close")
L("centi", "You're on a slope. Triangle area is half times base times perpendicular height. Perpendicular means straight up, at ninety degrees to the base. Not the sloping side. The slope is a liar.", mood="teach", shot="close",
  boardClear=True, board="Triangle: ½ × base × PERPENDICULAR height", diagram=D_TRI)
L("dad", "The label says the height is one point two metres.", mood="worried", shot="close")
L("centi", "Then half of two is one. Times one point two. One point two square metres. Not one point five. You were about to pay for invisible rug.", mood="smug", shot="close", board="½ × 2 × 1.2 = 1.2 m² ✔ (not 1.5)")
L("centi", "Why half? Because two identical triangles make a rectangle. Or a parallelogram. And a parallelogram is just a rectangle that's leaning. Cut the triangle off one end, slide it to the other. Rectangle. Base times perpendicular height.", mood="teach", shot="close",
  board="Parallelogram: base × perp. height")
L("mum", "Ooh, and a trapezium shaped window seat cushion! Top edge zero point eight metres, bottom edge one point two metres, and it's zero point five metres deep.", mood="excited", shot="close", prop="cushion")
L("dad", "Not another cushion.", mood="sad", shot="close")
L("centi", "Trapezium. Two parallel sides, a and b. Add them, halve them, times the height. It's basically the average width, times the height.", mood="teach", shot="close",
  boardClear=True, board="Trapezium: ½(a + b) × h", diagram=D_TRAP)
L("dad", "So, zero point eight plus one point two is two. Half of two is one. Times zero point five. Zero point five square metres.", mood="thinking", shot="close", board="½ × (0.8 + 1.2) × 0.5 = 0.5 m²")
L("centi", "Correct! See? Your father can do maths. He just needs a monster standing next to him. Permanently. Which I refuse.", mood="smug", shot="close")

# ---------------- ACT 3: VOLUME & LITRES ----------------
card("THE NEXT MORNING", "Two hundred bottles of water have arrived", 2.4)
scene("living", [("tara", 260), ("dad", 600), ("centi", 960)])
L("dad", "The water's here. Two hundred bottles. Let's fill the tank.", mood="excited", shot="close")
L("centi", "Let's do the volume first. Volume of a cuboid is length times width times height. Not plus. Times. Length one hundred centimetres. Width fifty. Height fifty.", mood="teach", shot="close",
  boardClear=True, board="Volume = length × width × height", diagram=D_TANK)
L("tara", "One hundred times fifty is five thousand. Times fifty is two hundred and fifty thousand cubic centimetres.", mood="thinking", shot="close", board="100 × 50 × 50 = 250 000 cm³")
L("centi", "And here's the bridge. One cubic centimetre is one millilitre. So one thousand cubic centimetres is one litre. A little cube of water, ten by ten by ten.", mood="teach", shot="close",
  boardClear=True, board="1 cm³ = 1 ml     1000 cm³ = 1 litre")
L("tara", "Two hundred and fifty thousand divided by one thousand. Two hundred and fifty litres. Dad, you're fifty bottles short.", mood="smug", shot="close", board="250 000 ÷ 1000 = 250 litres")
L("dad", "But I added the sides!", mood="shock", shot="close")
L("centi", "Adding the sides gives you a number of centimetres. A length. You can't fill a tank with a length. Volume needs three dimensions multiplied. Space has depth. Unlike this conversation.", mood="eyeroll", shot="close")
L("tara", "Also, Dad. It's a fish tank. We have a tap.", mood="deadpan", shot="close")
sfx("trombone")
L("centi", "One more. Any prism, same cross section all the way through, has volume equals area of cross section, times length. A cuboid is just the easy one. A triangular prism, find the triangle's area, then times the length.", mood="teach", shot="close",
  boardClear=True, board="Prism: V = cross-section area × length")

confess("centi", "CENTI · Volume Monster · Lives In A Drawer Of Exactly 2 Litres")
L("centi", "Recap. For anyone eating dinner. First. Perimeter is the distance round the edge, in metres. Area is the space inside, in square metres.", mood="teach", boardClear=True, board="1. Perimeter: edge (m).  Area: inside (m²)")
L("centi", "Second. Compound shapes. Split them, or take the big rectangle minus the missing bit.", mood="teach", board="2. Compound: big − missing (or split)")
L("centi", "Third. Triangles are half base times perpendicular height. Never the slope. Parallelograms, base times height. Trapezium, half a plus b, times h.", mood="teach", board="3. ½bh,  bh,  ½(a + b)h  — no slopes!")
L("centi", "Fourth. Volume is length times width times height. Prisms are cross section times length.", mood="teach", board="4. V = l × w × h;  prism: area × length")
L("centi", "And finally. One thousand cubic centimetres is one litre. And never, ever add the sides.", mood="smug", board="5. 1000 cm³ = 1 litre", gap=0.5)

scene("living", [("tara", 260), ("mum", 560), ("dad", 860)])
L("mum", "The room is finished! The skirting fits! Mostly. And the coaster is lovely.", mood="happy", shot="close")
L("dad", "And I poured in all two hundred bottles. The tank is two hundred out of two hundred and fifty. Four fifths full. Exactly eighty percent.", mood="smug", shot="close")
L("tara", "That's... actually correct.", mood="shock", shot="close")
L("dad", "I've been practising. Also we have no fish.", mood="happy", shot="close")
sfx("ding")
L("centi", "A tank with no fish. A room with a giant coaster. I'm going back in the drawer. It's small, it's dry, and its volume is none of your business.", mood="bored", shot="wide", offstage=True, gap=0.8)

# ---------------- PAUSE CHALLENGE ----------------
card("PAUSE CHALLENGE", "Centi gives you 5 seconds. Then he gets smug.", 3.0)
challenge(1, "A triangle has base 10 cm and perpendicular height 6 cm. Find its area.", "30 cm²", "½ × 10 × 6 = 30 cm²",
  "Question one. A triangle has a base of ten centimetres and a perpendicular height of six centimetres. Find its area.",
  "Thirty square centimetres. Half of ten is five. Five times six is thirty. If you said sixty, you forgot the half. The half is important. Ask any triangle.")
challenge(2, "A tank measures 40 cm × 30 cm × 25 cm. How many litres does it hold?", "30 litres", "40 × 30 × 25 = 30 000 cm³ = 30 litres",
  "Question two. A tank measures forty centimetres by thirty centimetres by twenty five centimetres. How many litres does it hold?",
  "Thirty litres. Forty times thirty times twenty five is thirty thousand cubic centimetres. Divide by one thousand. Thirty litres. If you added the sides, Dad has some bottles for you.")
challenge(3, "Find the surface area of a cube with edges of 3 cm.", "54 cm²", "6 faces × (3 × 3) = 6 × 9 = 54 cm²",
  "Question three. Find the surface area of a cube with edges of three centimetres.",
  "Fifty four square centimetres. A cube has six square faces. Each one is three times three, nine. Six times nine is fifty four.")
end_card()
