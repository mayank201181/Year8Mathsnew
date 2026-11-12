# "Totally Raotional" S01E12 "Gradient Expectations" (Topic: Straight-Line & Real-Life Graphs)
# Format and helpers: see common.py; check with lint_episode.py.

EP = dict(topic="linear-graphs")

# ---- diagram helpers (SVG for the Holo-Board) ----
def _plot(xr, yr, xt, yt, h=240, xl="x", yl="y", grid=True):
    L_, R_, T_, B_ = 56, 474, 14, h - 34
    sx = lambda x: L_ + (x - xr[0]) / (xr[1] - xr[0]) * (R_ - L_)
    sy = lambda y: B_ - (y - yr[0]) / (yr[1] - yr[0]) * (B_ - T_)
    p = []
    if grid:
        for x in xt: p.append(f'<line x1="{sx(x):.1f}" y1="{T_}" x2="{sx(x):.1f}" y2="{B_}" stroke="#f8fafc" stroke-opacity="0.15" stroke-width="1"/>')
        for y in yt: p.append(f'<line x1="{L_}" y1="{sy(y):.1f}" x2="{R_}" y2="{sy(y):.1f}" stroke="#f8fafc" stroke-opacity="0.15" stroke-width="1"/>')
    ax = sy(0) if yr[0] <= 0 <= yr[1] else B_
    ay = sx(0) if xr[0] <= 0 <= xr[1] else L_
    p.append(f'<line x1="{L_}" y1="{ax:.1f}" x2="{R_}" y2="{ax:.1f}" stroke="#f8fafc" stroke-width="3"/>')
    p.append(f'<line x1="{ay:.1f}" y1="{T_}" x2="{ay:.1f}" y2="{B_}" stroke="#f8fafc" stroke-width="3"/>')
    for x in xt:
        if x != 0: p.append(f'<text x="{sx(x):.1f}" y="{ax + 22:.1f}" font-family="sans-serif" font-size="18" fill="#f8fafc" text-anchor="middle">{x}</text>')
    for y in yt:
        if y != 0: p.append(f'<text x="{ay - 8:.1f}" y="{sy(y) + 6:.1f}" font-family="sans-serif" font-size="18" fill="#f8fafc" text-anchor="end">{y}</text>')
    p.append(f'<text x="{R_ + 10}" y="{ax + 6:.1f}" font-family="sans-serif" font-size="20" fill="#c4b5fd">{xl}</text>')
    p.append(f'<text x="{ay + 8:.1f}" y="{T_ + 14}" font-family="sans-serif" font-size="20" fill="#c4b5fd">{yl}</text>')
    return sx, sy, p

def _svg(parts, h=240):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 {h}">' + "".join(parts) + '</svg>'

def _line(sx, sy, a, b, col="#fde047", w=4, dash=False):
    d = ' stroke-dasharray="8 6"' if dash else ''
    return f'<line x1="{sx(a[0]):.1f}" y1="{sy(a[1]):.1f}" x2="{sx(b[0]):.1f}" y2="{sy(b[1]):.1f}" stroke="{col}" stroke-width="{w}"{d}/>'

def _dot(sx, sy, pt, col="#fde047"):
    return f'<circle cx="{sx(pt[0]):.1f}" cy="{sy(pt[1]):.1f}" r="7" fill="{col}"/>'

def _txt(x, y, s, col="#f8fafc", size=20, anchor="start"):
    return f'<text x="{x:.1f}" y="{y:.1f}" font-family="sans-serif" font-size="{size}" fill="{col}" text-anchor="{anchor}">{s}</text>'

# coordinates: (3, 2)
sx, sy, p = _plot((0, 5), (0, 4), [1, 2, 3, 4, 5], [1, 2, 3, 4])
p += [_line(sx, sy, (0, 0), (3, 0), "#86efac", 4, True), _line(sx, sy, (3, 0), (3, 2), "#86efac", 4, True), _dot(sx, sy, (3, 2)),
      _txt(sx(3) + 12, sy(2) - 10, "(3, 2)", "#fde047", 22), _txt(sx(0.6), sy(0) - 10, "along", "#86efac", 18), _txt(sx(3) + 10, sy(1) + 6, "up", "#86efac", 18)]
D_COORD = _svg(p)

# x = 3 and y = 2
sx, sy, p = _plot((-1, 5), (-1, 4), [-1, 1, 2, 3, 4, 5], [-1, 1, 2, 3, 4])
p += [_line(sx, sy, (3, -1), (3, 4), "#fde047", 4), _line(sx, sy, (-1, 2), (5, 2), "#c4b5fd", 4),
      _txt(sx(3) + 10, sy(3.6), "x = 3", "#fde047", 22), _txt(sx(4.1), sy(2) - 10, "y = 2", "#c4b5fd", 22)]
D_XY = _svg(p)

# two phone plans
sx, sy, p = _plot((0, 12), (0, 50), [2, 4, 6, 8, 10, 12], [10, 20, 30, 40, 50], xl="GB", yl="$")
p += [_line(sx, sy, (0, 10), (12, 34), "#fde047"), _line(sx, sy, (0, 0), (12, 48), "#7dd3fc"), _dot(sx, sy, (5, 20), "#fca5a5"),
      _txt(sx(12), sy(17), "A: y = 2x + 10", "#fde047", 19, "end"), _txt(sx(9.6), sy(46), "B: y = 4x", "#7dd3fc", 19, "end"),
      _txt(sx(5) + 10, sy(20) + 24, "(5, 20)", "#fca5a5", 19)]
D_PLANS = _svg(p)

# gradient triangle on plan A between (1, 12) and (5, 20)
sx, sy, p = _plot((0, 6), (0, 24), [1, 2, 3, 4, 5, 6], [4, 8, 12, 16, 20, 24], xl="GB", yl="$")
p += [_line(sx, sy, (0, 10), (6, 22), "#fde047"), _line(sx, sy, (1, 12), (5, 12), "#86efac", 3), _line(sx, sy, (5, 12), (5, 20), "#fca5a5", 3),
      _dot(sx, sy, (1, 12)), _dot(sx, sy, (5, 20)), _txt(sx(3), sy(12) + 24, "run = 4", "#86efac", 20, "middle"),
      _txt(sx(5) + 10, sy(16) + 6, "rise = 8", "#fca5a5", 20), _txt(sx(2.2), sy(23), "gradient = 8 ÷ 4 = 2", "#f8fafc", 20)]
D_GRAD = _svg(p)

# battery: y = 100 - 20x
sx, sy, p = _plot((0, 5), (0, 120), [1, 2, 3, 4, 5], [20, 40, 60, 80, 100], xl="h", yl="%")
p += [_line(sx, sy, (0, 100), (5, 0), "#fca5a5"), _txt(sx(2.6), sy(80), "y = 100 − 20x", "#fca5a5", 22),
      _txt(sx(2.6), sy(62), "gradient −20: downhill", "#f8fafc", 19)]
D_BATT = _svg(p)

# Dad's jog: distance-time
sx, sy, p = _plot((0, 50), (0, 4), [10, 20, 30, 40, 50], [1, 2, 3, 4], xl="min", yl="km")
p += [_line(sx, sy, (0, 0), (15, 3), "#86efac"), _line(sx, sy, (15, 3), (35, 3), "#fde047"), _line(sx, sy, (35, 3), (45, 0), "#fca5a5"),
      _txt(sx(4), sy(2.2), "jog", "#86efac", 20), _txt(sx(25), sy(3) - 12, "flat = stopped", "#fde047", 20, "middle"),
      _txt(sx(41), sy(2.0), "bus?", "#fca5a5", 20)]
D_JOG = _svg(p)

# ---------------- COLD OPEN ----------------
scene("living", [("tara", 280), ("mum", 600), ("dad", 960)])
L("dad", "Family. Gather round. As of this morning, your father is a runner.", mood="smug", shot="close", prop="tablet")
L("mum", "Since when?", mood="deadpan", shot="two")
L("dad", "Since six fifteen this morning. My fitness app made me a graph. Look at that line. Majestic.", mood="excited", shot="close", prop="tablet")
L("tara", "Why is it flat in the middle?", mood="deadpan", shot="close")
L("dad", "That's a strategic rest. Elite athletes do it.", mood="smug", shot="close")
L("tara", "For twenty minutes. Outside the bubble tea stall.", mood="deadpan", shot="close")
L("dad", "It's called hydration, Tara.", mood="annoyed", shot="close")
L("mum", "And why does the line go up again at the end so fast?", mood="thinking", shot="close")
L("dad", "That part is just the graph being dramatic. Graphs are like that. Anyway, graphs are easy. For example, the line x equals three. It goes sideways. Basic maths.", mood="smug", shot="close")
freeze("\"x = 3 GOES SIDEWAYS\"", 2.6, narrator="Narrator: It goes straight up. It always has.")
confess("tara", "TARA RAO · 12 · Reads Graphs, Reads People")
L("tara", "My father's fitness app tracks distance and time. Which means it basically tracks his excuses. Per kilometre.", mood="deadpan")
L("tara", "And tonight, I'm going to prove it. With a ruler.", mood="determined", gap=0.6)

title()

# ---------------- ACT 1: COORDINATES & SPECIAL LINES ----------------
scene("living", [("tara", 300)])
L("tara", "Centi. Graph emergency. Dad's being confident again.", mood="worried", shot="wide")
sfx("drawer")
poof("centi", 840)
L("centi", "Confident about graphs. My least favourite weather. Fine. Let's start at the very beginning, because apparently we have to.", mood="bored", shot="close")
L("centi", "Coordinates. Two numbers in a bracket. The first one is x. Go along the corridor. The second one is y. Then go up the stairs. Three, two means three along, then two up.", mood="teach", shot="close",
  boardClear=True, board="(x, y): along the corridor, then up", diagram=D_COORD)
L("tara", "So three, two and two, three are totally different places.", mood="thinking", shot="close", board="(3, 2) ≠ (2, 3)")
L("centi", "Completely different. One is your bedroom. The other is the neighbour's toilet. Order matters.", mood="smug", shot="close")
L("centi", "Now, your father's sideways line. The line x equals three is every point where x is three. Three, zero. Three, one. Three, minus five. They all stack up in a tall, vertical column.", mood="teach", shot="close",
  boardClear=True, board="x = 3 → vertical (x always 3)", diagram=D_XY)
L("tara", "And y equals two is every point where y is two. So that one is the flat, horizontal one.", mood="happy", shot="close", board="y = 2 → horizontal (y always 2)")
L("centi", "Correct. My trick. x equals a number? It's a wall. y equals a number? It's a floor. You cannot walk sideways through a wall. Unless you are your father, apparently.", mood="smug", shot="close",
  board="x = number: WALL.  y = number: FLOOR.")

confess("dad", "VIKRAM RAO · Dad · Running Enthusiast Since This Morning")
L("dad", "In my defence, the wall was very confusing. It was standing up. Who designs a line like that.", mood="annoyed")
L("dad", "I will be raising this with the Ministry of Graphs.", mood="smug", gap=0.6)

# ---------------- ACT 2: Y = MX + C, PHONE PLANS ----------------
card("MEANWHILE, MUM HAS FOUND A DEAL", "Two phone plans. One winner. Zero patience.", 2.4)
scene("kitchen", [("mum", 300), ("tara", 620), ("centi", 960)])
L("mum", "Right. Plan A is ten dollars a month, plus two dollars for every gigabyte. Plan B has no monthly fee! Just four dollars per gigabyte. No fee! Obviously B!", mood="excited", shot="close", prop="phone")
L("tara", "Mum, the word obviously has never once been true in this kitchen.", mood="deadpan", shot="close")
L("centi", "Let's write them as straight lines. Cost is y. Gigabytes is x. Plan A: y equals two x plus ten. Plan B: y equals four x.", mood="teach", shot="close",
  boardClear=True, board="A: y = 2x + 10     B: y = 4x", diagram=D_PLANS)
L("centi", "Every straight line wears the same outfit. y equals m x plus c. The m is the gradient. How steep. The c is the y intercept. Where the line crosses the y axis.", mood="teach", shot="close",
  board="y = mx + c:  m = gradient, c = start")
L("tara", "So for plan A, the gradient is two dollars per gigabyte, and ten is the fixed fee. It starts at ten before Mum even downloads anything.", mood="thinking", shot="close",
  board="A: m = 2 per GB, c = $10 fee")
L("tara", "And plan B starts at zero. It goes through the origin. So cost is directly proportional to gigabytes.", mood="happy", shot="close")
L("centi", "Through the origin means direct proportion. Zero gigabytes, zero dollars. Very honest line. Unlike some people's jogging graphs.", mood="smug", shot="close")
L("mum", "So which is cheaper?!", mood="worried", shot="close")
L("tara", "The lines cross at five gigabytes. Both cost twenty dollars there. Below five, B is cheaper. Above five, A wins. Mum, how much data do you use?", mood="thinking", shot="close",
  boardClear=True, board="Lines cross at (5, 20): same cost", diagram=D_PLANS)
L("mum", "About twelve gigabytes. Mostly videos of other people's renovations.", mood="neutral", shot="close")
L("tara", "Then plan A is two times twelve plus ten, thirty four dollars. Plan B is four times twelve, forty eight dollars. No fee was a trap.", mood="smug", shot="close",
  board="12 GB:  A = $34    B = $48")
L("mum", "Fourteen dollars a month! They hid fourteen dollars inside a gradient!", mood="shock", shot="close")
L("centi", "Steep lines are expensive lines. Write that on a fridge magnet. You clearly collect them.", mood="eyeroll", shot="close", gap=0.4)

L("centi", "Now, finding a gradient from a graph. Pick two points on the line. Gradient equals rise divided by run. How far up, divided by how far along.", mood="teach", shot="close",
  boardClear=True, board="gradient = rise ÷ run", diagram=D_GRAD)
L("tara", "From one, twelve to five, twenty. Run is four. Rise is eight. Eight divided by four is two. Same as the m in the equation!", mood="happy", shot="close", board="rise 8 ÷ run 4 = 2 ✔")
L("centi", "And if the line goes downhill, the gradient is negative. Like your father's phone battery when he jogs. One hundred percent, minus twenty every hour.", mood="teach", shot="close",
  boardClear=True, board="Downhill line → negative gradient", diagram=D_BATT)
L("tara", "y equals one hundred minus twenty x. Gradient minus twenty. Five hours later, it's dead.", mood="deadpan", shot="close", board="y = 100 − 20x: m = −20")
L("centi", "Read left to right, like a book. Uphill, positive. Downhill, negative. Flat, zero. Your father, flat.", mood="bored", shot="close")

# ---------------- ACT 3: THE JOGGING GRAPH ----------------
card("THAT EVENING", "The graph is put on trial", 2.2)
scene("living", [("tara", 260), ("dad", 600), ("centi", 960)])
L("tara", "Dad, let's look at your jogging graph properly. Distance from home, against time. On a distance time graph, the gradient is the speed.", mood="determined", shot="close",
  boardClear=True, diagram=D_JOG)
L("tara", "First fifteen minutes, you go three kilometres. That's three kilometres in a quarter of an hour. Twelve kilometres per hour. Respectable.", mood="thinking", shot="close",
  board="Out: 3 km in 15 min = 12 km/h")
L("dad", "Thank you. Elite.", mood="smug", shot="close")
L("tara", "Then, from fifteen minutes to thirty five minutes, the line is flat. Distance doesn't change. Speed zero. You were stationary for twenty minutes.", mood="deadpan", shot="close",
  board="Flat line: speed = 0 (stopped)")
L("dad", "I was stretching.", mood="worried", shot="close")
L("centi", "Next to a bubble tea stall. With a bubble tea. Stretching your wallet.", mood="smug", shot="close")
L("tara", "And then the line comes back down to zero, the distance from home is shrinking, in just ten minutes. Three kilometres in ten minutes. That's eighteen kilometres per hour.", mood="thinking", shot="close",
  board="Back: 3 km in 10 min = 18 km/h")
L("tara", "You came home FASTER than you left. After a bubble tea.", mood="shock", shot="close")
L("dad", "Second wind.", mood="smug", shot="close")
L("centi", "The bus stop is right outside that stall. The steepest part of your graph is bus number one six one.", mood="eyeroll", shot="close", gap=0.3)
sfx("trombone")
L("dad", "The app cannot prove anything.", mood="sad", shot="close")
L("tara", "The app literally drew a picture of it, Dad.", mood="deadpan", shot="close", gap=0.4)

confess("centi", "CENTI · Graph Detective · Has Seen Things")
L("centi", "Recap. For anyone eating dinner. First. Coordinates are x then y. Along the corridor, then up the stairs.", mood="teach", boardClear=True, board="1. (x, y): along, then up")
L("centi", "Second. x equals a number is a vertical wall. y equals a number is a flat floor.", mood="teach", board="2. x = a: vertical.  y = b: horizontal")
L("centi", "Third. y equals m x plus c. The m is the gradient, rise over run. The c is where it crosses the y axis.", mood="teach", board="3. y = mx + c,  m = rise ÷ run")
L("centi", "Fourth. Through the origin means direct proportion.", mood="teach", board="4. Through (0, 0) → direct proportion")
L("centi", "And finally. On a distance time graph, gradient is speed. Flat means stopped. Very steep means somebody took the bus.", mood="smug", board="5. Distance–time: gradient = speed", gap=0.5)

scene("living", [("tara", 260), ("mum", 560), ("dad", 860)])
L("mum", "I've switched to plan A. Saving fourteen dollars a month. That's one hundred and sixty eight dollars a year!", mood="happy", shot="close")
L("dad", "Excellent. I'll invest it in Banana Coin. That graph only goes up.", mood="smug", shot="close")
L("tara", "Dad, it's a straight line with a gradient of minus everything.", mood="deadpan", shot="close")
L("dad", "Then I'll jog it back up.", mood="determined", shot="close")
sfx("ding")
L("centi", "Tell him the bus is cheaper. I'm going back to the drawer. It's flat in there. Gradient zero. Bliss.", mood="bored", shot="wide", offstage=True, gap=0.8)

# ---------------- PAUSE CHALLENGE ----------------
card("PAUSE CHALLENGE", "Centi gives you 5 seconds. Then he gets smug.", 3.0)
challenge(1, "What are the gradient and y-intercept of y = 3x − 5?", "m=3, c=−5", "y = mx + c  →  m = 3,  c = −5",
  "Question one. What are the gradient and the y intercept of the line y equals three x minus five?",
  "Gradient three, y intercept minus five. The m is the number in front of x. The c is the number on its own, minus sign included. Don't leave the minus behind. It gets lonely.")
challenge(2, "Find the gradient of the line through (1, 4) and (3, 10).", "3", "rise 10 − 4 = 6,  run 3 − 1 = 2,  6 ÷ 2 = 3",
  "Question two. Find the gradient of the line through the points one, four and three, ten.",
  "Three. Rise is ten minus four, six. Run is three minus one, two. Six divided by two is three.")
challenge(3, "A distance–time graph is flat from 2 pm to 3 pm. What happened?", "Stopped", "flat line → distance not changing → speed 0",
  "Question three. A distance time graph is flat from two p m to three p m. What was happening?",
  "Nothing. They stopped. Flat line, speed zero. If you said, Dad was at the bubble tea stall, also correct. Full marks.")
end_card()
