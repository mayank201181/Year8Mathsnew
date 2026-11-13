# "Totally Raotional" S01E14 "Lost Bearings" (Topic: Constructions, Scale Drawings & Bearings)
# Format and helpers: see common.py; check with lint_episode.py.
import math

EP = dict(topic="constructions-bearings", logline="Lost in a nature reserve on Dad's bearing of 'minus ninety degrees'. Protractors, three-figure bearings, back bearings and map scales.")

# ---- diagram helpers (SVG for the Holo-Board) ----
def _svg(parts, h=240):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 {h}">' + "".join(parts) + '</svg>'
def _ln(a, b, col="#f8fafc", w=4, dash=False):
    d = ' stroke-dasharray="8 6"' if dash else ''
    return f'<line x1="{a[0]:.1f}" y1="{a[1]:.1f}" x2="{b[0]:.1f}" y2="{b[1]:.1f}" stroke="{col}" stroke-width="{w}" stroke-linecap="round"{d}/>'
def _tx(x, y, s, col="#fde047", size=22, anchor="middle"):
    return f'<text x="{x:.1f}" y="{y:.1f}" font-family="sans-serif" font-size="{size}" fill="{col}" text-anchor="{anchor}">{s}</text>'
def _dot(p, col="#fde047"):
    return f'<circle cx="{p[0]:.1f}" cy="{p[1]:.1f}" r="6" fill="{col}"/>'
def _brg(c, deg, r):  # point at bearing deg (clockwise from north), distance r
    return (c[0] + r * math.sin(math.radians(deg)), c[1] - r * math.cos(math.radians(deg)))
def _arc(c, deg, r, col="#fde047"):  # arc from north clockwise to bearing deg
    s, e = _brg(c, 0, r), _brg(c, deg, r)
    big = 1 if deg > 180 else 0
    return f'<path d="M{s[0]:.1f},{s[1]:.1f} A{r},{r} 0 {big} 1 {e[0]:.1f},{e[1]:.1f}" stroke="{col}" stroke-width="3" fill="none"/>'

# protractor: 50 on the inner scale, 130 on the outer
_O = (250, 205)
_arm = (_O[0] + 175 * math.cos(math.radians(50)), _O[1] - 175 * math.sin(math.radians(50)))
D_PROT = _svg([f'<path d="M100,205 A150,150 0 0 1 400,205" stroke="#c4b5fd" stroke-width="3" fill="none"/>',
               _ln((95, 205), (430, 205), "#f8fafc", 4), _ln(_O, _arm, "#7dd3fc", 4),
               _tx(_O[0] + 118 * math.cos(math.radians(46)), _O[1] - 118 * math.sin(math.radians(46)) + 8, "50", "#fde047", 22),
               _tx(_O[0] + 192 * math.cos(math.radians(55)), _O[1] - 192 * math.sin(math.radians(55)), "130", "#fca5a5", 22),
               _tx(372, 198, "0", "#fde047", 18), _tx(418, 186, "180", "#fca5a5", 18),
               _tx(20, 36, "acute:", "#f8fafc", 20, "start"), _tx(20, 64, "50°, not 130°", "#86efac", 20, "start")], 230)

# compass rose with a bearing of 060
_C0 = (150, 125)
D_COMPASS = _svg([_ln(_C0, (150, 20), "#f8fafc", 4), _ln(_C0, (245, 125), "#f8fafc", 2), _ln(_C0, (150, 225), "#f8fafc", 2), _ln(_C0, (55, 125), "#f8fafc", 2),
                  _tx(150, 16, "N 000°", "#f8fafc", 18), _tx(250, 131, "090°", "#f8fafc", 18, "start"), _tx(150, 246, "180°", "#f8fafc", 18), _tx(48, 131, "270°", "#f8fafc", 18, "end"),
                  _ln(_C0, _brg(_C0, 60, 100), "#fde047", 4), _arc(_C0, 60, 45), _tx(200, 70, "060°", "#fde047", 22, "start"),
                  _tx(300, 90, "1. from NORTH", "#86efac", 21, "start"), _tx(300, 130, "2. CLOCKWISE", "#86efac", 21, "start"), _tx(300, 170, "3. THREE figures", "#86efac", 21, "start")], 250)

# back bearing: R -> C on 060, C -> R on 240
_R = (120, 195); _Cp = _brg(_R, 60, 210)
D_BACK = _svg([_ln(_R, (_R[0], 110), "#f8fafc", 3), _ln(_Cp, (_Cp[0], 22), "#f8fafc", 3), _tx(_R[0], 104, "N", "#f8fafc", 18), _tx(_Cp[0], 18, "N", "#f8fafc", 18),
               _ln(_R, _Cp, "#7dd3fc", 4), _dot(_R), _dot(_Cp), _tx(_R[0] - 14, _R[1] + 8, "R", "#f8fafc", 22, "end"), _tx(_Cp[0] - 16, _Cp[1] - 8, "C", "#f8fafc", 22, "end"),
               _arc(_R, 60, 42), _tx(_R[0] + 24, _R[1] - 52, "060°", "#fde047", 21, "start"),
               _arc(_Cp, 240, 30, "#fca5a5"), _tx(_Cp[0] + 40, _Cp[1] + 2, "240°", "#fca5a5", 21, "start"),
               _tx(505, 225, "060° + 180° = 240°", "#86efac", 20, "end")], 240)

# perpendicular bisector of AB
_A, _B = (110, 150), (410, 150)
def _parc(c, a0, a1, r=175):
    s = (c[0] + r * math.cos(math.radians(a0)), c[1] + r * math.sin(math.radians(a0)))
    e = (c[0] + r * math.cos(math.radians(a1)), c[1] + r * math.sin(math.radians(a1)))
    return f'<path d="M{s[0]:.1f},{s[1]:.1f} A{r},{r} 0 0 1 {e[0]:.1f},{e[1]:.1f}" stroke="#c4b5fd" stroke-width="3" fill="none" stroke-dasharray="6 5"/>'
D_PBIS = _svg([_ln(_A, _B, "#f8fafc", 4), _parc(_A, -34, 34), _parc(_B, 146, 214), _ln((260, 40), (260, 252), "#fde047", 4),
               '<polyline points="260,136 274,136 274,150" stroke="#fde047" stroke-width="3" fill="none"/>',
               _dot(_A, "#f8fafc"), _dot(_B, "#f8fafc"), _dot((260, 150), "#86efac"),
               _tx(96, 156, "A", "#f8fafc", 22, "end"), _tx(424, 156, "B", "#f8fafc", 22, "start"), _tx(248, 176, "M", "#86efac", 22, "end"),
               _tx(296, 52, "every point: same", "#fde047", 19, "start"), _tx(296, 76, "distance from A and B", "#fde047", 19, "start")], 260)

# ---------------- COLD OPEN ----------------
scene("park", [("tara", 260), ("mum", 560), ("dad", 900)])
L("dad", "Family. Trust me. I have a compass, a map, and the instincts of an explorer. The car park is this way.", mood="smug", shot="close", prop="compass")
L("mum", "We have walked past the same monkey three times.", mood="deadpan", shot="two")
L("dad", "Different monkey. Similar face.", mood="smug", shot="close")
L("tara", "It's the same monkey, Dad. It's wearing the same expression. Disappointment.", mood="deadpan", shot="close")
L("dad", "Nonsense. According to my calculations, the car park is on a bearing of minus ninety degrees.", mood="smug", shot="close", prop="map")
freeze("\"BEARING: −90°\"", 2.6, narrator="Narrator: Bearings never go negative. Dad's confidence never goes down.")
confess("tara", "TARA RAO · 12 · Has Not Seen The Car For Two Hours")
L("tara", "We came to a nature reserve for some fresh air. We have now had about four hours of fresh air. Our water ran out at hour two.", mood="deadpan")
L("tara", "Luckily, I packed the calculator. And the calculator comes with a monster.", mood="determined", gap=0.6)

title()

# ---------------- ACT 1: PROTRACTORS & THREE-FIGURE BEARINGS ----------------
scene("park", [("tara", 300), ("dad", 620)])
sfx("drawer")
poof("centi", 950)
L("centi", "Where am I. Why is there a monkey. Why is it looking at me like that.", mood="worried", shot="close")
L("tara", "Dad's navigating. We're lost. He just said minus ninety degrees.", mood="deadpan", shot="two")
L("centi", "Of course he did. Let's start with the protractor, because I can see from here he's reading it wrong.", mood="eyeroll", shot="close")
L("dad", "I measured this angle on the map. One hundred and thirty degrees.", mood="smug", shot="close")
L("centi", "That angle is sharp and pointy. Smaller than a right angle. It's acute. It cannot be one hundred and thirty. You read the outside scale. A protractor has two scales. Start from the zero on the line you are measuring from.", mood="teach", shot="close",
  boardClear=True, board="Start at the 0 on your starting arm", diagram=D_PROT)
L("tara", "Estimate first. Acute, so less than ninety. Fifty, not one hundred and thirty.", mood="thinking", shot="close", board="Estimate first: acute < 90°")
L("centi", "Now. Bearings. Three rules. First, measure from north. Second, turn clockwise. Third, always write three figures.", mood="teach", shot="close",
  boardClear=True, board="Bearings: North, clockwise, 3 figures", diagram=D_COMPASS)
L("tara", "So east is zero nine zero. South is one eight zero. West is two seven zero. And north east is zero four five.", mood="happy", shot="close", board="E 090°  S 180°  W 270°  NE 045°")
L("centi", "That zero at the front matters. Sixty degrees is written zero six zero. A bearing without its leading zero is like your father without a map. Technically possible. Deeply worrying.", mood="smug", shot="close",
  board="60° → 060°  (three figures!)")
L("dad", "So what is minus ninety?", mood="thinking", shot="close")
L("centi", "If you turn ninety degrees anticlockwise from north, you're facing west. Which is two seven zero. Bearings only go from zero to three hundred and sixty, clockwise. No negatives. No exceptions. No exploring.", mood="teach", shot="close",
  boardClear=True, board="−90° ✘   → 270° (west) ✔")

confess("dad", "VIKRAM RAO · Dad · Explorer · Location Unknown")
L("dad", "I wasn't lost. I was exploring at a bearing of my own choosing.", mood="smug")
L("dad", "The monkey was also exploring. We bonded. I've named him Bearing.", mood="happy", gap=0.6)

# ---------------- ACT 2: "FROM" AND BACK BEARINGS ----------------
scene("park", [("tara", 240), ("mum", 480), ("dad", 720), ("centi", 980)])
L("mum", "The map says the car park is on a bearing of zero six zero from the rest shelter. And we're at the rest shelter!", mood="excited", shot="close", prop="map")
L("centi", "Good. The word from tells you where to stand. The bearing of C from R means: stand at R, face north, turn clockwise until you face C.", mood="teach", shot="close",
  boardClear=True, board="Bearing of C FROM R: stand at R", diagram=D_BACK)
L("tara", "And this morning we walked from the car park to the shelter. So that journey was the back bearing. The exact opposite direction.", mood="thinking", shot="close")
L("centi", "Opposite direction means turn round. Half a turn. Add one hundred and eighty. Zero six zero plus one hundred and eighty is two four zero.", mood="teach", shot="close")
L("tara", "And if the bearing is already more than one hundred and eighty, you subtract one hundred and eighty instead. So you stay between zero and three sixty.", mood="happy", shot="close",
  board="Back: 060° → 240°    300° → 120°")
L("dad", "I thought the back bearing was the same bearing. But walking backwards.", mood="worried", shot="close")
L("tara", "Dad, that explains the last three hours.", mood="deadpan", shot="close")
L("centi", "It works because the two north lines are parallel. Remember last week? The angles are co interior, so they add up to one hundred and eighty. Everything in maths is connected. Unfortunately, so is your father.", mood="smug", shot="close",
  board="Parallel north lines → C angles: 180°")

# ---------------- ACT 3: SCALE & PERPENDICULAR BISECTOR ----------------
card("MEANWHILE, MUM HAS A PLAN", "A picnic. Fairly placed.", 2.4)
scene("park", [("mum", 300), ("tara", 620), ("centi", 950)])
L("mum", "My walking group is at shelter A. Your Dad's friends are at shelter B. I want to put the snacks at a spot that's exactly the same distance from both. Otherwise, there will be complaints. Loud ones.", mood="worried", shot="close")
L("centi", "First, how far apart are they? On the map, the shelters are four centimetres apart. The scale is one to twenty five thousand. So one centimetre on the map is twenty five thousand centimetres in real life.", mood="teach", shot="close",
  boardClear=True, board="Scale 1 : 25 000")
L("tara", "Four times twenty five thousand is one hundred thousand centimetres. That's one thousand metres. One kilometre.", mood="thinking", shot="close", board="4 cm × 25 000 = 100 000 cm = 1 km")
L("centi", "Now the fair spot. You need the perpendicular bisector. Open your compasses to more than half of A B. Draw an arc from A. Keep the same width. Draw an arc from B. Join the two crossing points with a ruler.", mood="teach", shot="close",
  boardClear=True, board="Arcs from A and B, same radius", diagram=D_PBIS)
L("tara", "It cuts A B in half, at ninety degrees. And every point on that line is the same distance from A and from B.", mood="happy", shot="close", board="Every point: equal distance A and B")
L("centi", "Because the crossing points were made with the same radius from both ends. Equal distances, built right in. Put the snacks anywhere on that line. Nobody walks further. Nobody complains. In theory.", mood="smug", shot="close")
L("mum", "And the midpoint is five hundred metres from each shelter! Perfect. I'll put the curry puffs there. Vegetable ones.", mood="happy", shot="close", board="Midpoint M: 500 m from each")
L("tara", "Mum, the only person who'll still walk the wrong way is Dad.", mood="deadpan", shot="close")
sfx("trombone")

confess("centi", "CENTI · Navigation Monster · One Hundred Eyes, Zero Sense Of Direction In Dad")
L("centi", "Recap. For anyone eating dinner. First. Protractors have two scales. Estimate first, then start from the zero on your line.", mood="teach", boardClear=True, board="1. Estimate, then start at 0")
L("centi", "Second. Bearings. From north. Clockwise. Three figures. East is zero nine zero.", mood="teach", board="2. North, clockwise, 3 figures")
L("centi", "Third. From tells you where to stand.", mood="teach", board="3. Bearing of B FROM A: stand at A")
L("centi", "Fourth. Back bearings. Add or subtract one hundred and eighty.", mood="teach", board="4. Back bearing: ± 180°")
L("centi", "And finally. The perpendicular bisector. Same radius arcs from both ends. Every point on it is equally far from both. Like me, from this family. Equally far.", mood="smug", board="5. Perp. bisector: equidistant", gap=0.5)

scene("park", [("tara", 260), ("mum", 560), ("dad", 860)])
L("dad", "Bearing two four zero, from the shelter. Follow me.", mood="determined", shot="close", prop="compass")
L("mum", "There's the car! He actually found it!", mood="shock", shot="close")
L("dad", "As planned. Explorer instincts.", mood="smug", shot="close")
L("tara", "Dad. You walked straight past it. It's behind you. On a bearing of zero six zero.", mood="deadpan", shot="close")
sfx("ding")
L("centi", "Take me back to the drawer. It has no north, no monkeys, and nobody walking backwards.", mood="bored", shot="wide", offstage=True, gap=0.8)

# ---------------- PAUSE CHALLENGE ----------------
card("PAUSE CHALLENGE", "Centi gives you 5 seconds. Then he gets smug.", 3.0)
challenge(1, "What is the three-figure bearing of due west?", "270°", "N 000°   E 090°   S 180°   W 270°",
  "Question one. What is the three figure bearing of due west?",
  "Two seven zero. From north, clockwise, three quarters of a turn. If you said minus ninety, there is a monkey you should meet.")
challenge(2, "The bearing of B from A is 070°. Find the bearing of A from B.", "250°", "back bearing: 070° + 180° = 250°",
  "Question two. The bearing of B from A is zero seven zero. Find the bearing of A from B.",
  "Two five zero. It's a back bearing. Turn round. Zero seven zero plus one hundred and eighty is two five zero.")
challenge(3, "P is on the perpendicular bisector of AB. P is 7 cm from A. How far is P from B?", "7 cm", "every point on it is equidistant from A and B",
  "Question three. Point P is on the perpendicular bisector of A B. P is seven centimetres from A. How far is P from B?",
  "Seven centimetres. Every point on the perpendicular bisector is the same distance from both ends. No calculation needed. Just trust the line. Unlike Dad's map.")
end_card()
