# "Totally Raotional" S01E18 "Lies, Damned Lies And Bar Charts" (Topic: Collecting & Representing Data)
# Format and helpers: see common.py; check with lint_episode.py.
import math

EP = dict(topic="statistics")

# ---- diagram helpers (dark-board friendly SVG) ----
SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 {h}">{body}</svg>'
def txt(x, y, s, col="#f8fafc", size=22, anchor="start"):
    return f'<text x="{x}" y="{y}" font-family="sans-serif" font-size="{size}" fill="{col}" text-anchor="{anchor}">{s}</text>'
def line(x1, y1, x2, y2, col="#f8fafc", w=3, dash=""):
    d = f' stroke-dasharray="{dash}"' if dash else ""
    return f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{col}" stroke-width="{w}"{d}/>'

# Truncated-axis bar chart: axis 97..100 mapped to 200px
def _ty(v): return 220 - (v - 97) / 3 * 190
D_TRUNC = SVG.format(h=250, body=
    line(80, 20, 80, 222) + line(78, 220, 470, 220)
    + "".join(line(72, _ty(v), 80, _ty(v)) + txt(66, _ty(v) + 7, str(v), "#f8fafc", 18, "end") for v in (97, 98, 99, 100))
    + f'<rect x="140" y="{_ty(98)}" width="100" height="{220 - _ty(98)}" fill="#7dd3fc" fill-opacity="0.7"/>'
    + f'<rect x="300" y="{_ty(100)}" width="100" height="{220 - _ty(100)}" fill="#fde047" fill-opacity="0.8"/>'
    + txt(190, 245, "Small TV: 98", "#7dd3fc", 18, "middle") + txt(350, 245, "Big TV: 100", "#fde047", 18, "middle")
    + txt(250, 45, "axis starts at 97!", "#fca5a5", 22, "middle"))

def pie(cx, cy, r, parts):
    out, a0 = "", -90.0
    for val, col, lab in parts:
        a1 = a0 + val
        x0, y0 = cx + r * math.cos(math.radians(a0)), cy + r * math.sin(math.radians(a0))
        x1, y1 = cx + r * math.cos(math.radians(a1)), cy + r * math.sin(math.radians(a1))
        big = 1 if val > 180 else 0
        out += f'<path d="M{cx},{cy} L{x0:.1f},{y0:.1f} A{r},{r} 0 {big} 1 {x1:.1f},{y1:.1f} Z" fill="{col}" fill-opacity="0.75" stroke="#14281f" stroke-width="3"/>'
        a0 = a1
    return out
PIE = [(144, "#fde047", "Prata 144°"), (108, "#7dd3fc", "Thosai 108°"), (72, "#86efac", "Popiah 72°"), (36, "#fca5a5", "Ice kachang 36°")]
D_PIE = SVG.format(h=240, body=pie(130, 120, 105, PIE)
    + "".join(f'<rect x="270" y="{40 + i * 46}" width="22" height="22" fill="{c}"/>' + txt(302, 59 + i * 46, lab, "#f8fafc", 22) for i, (_, c, lab) in enumerate(PIE)))

# Scatter: temperature 26..34 °C (x), bowls sold 20..70 (y); best fit y = 5.8t - 129.7
DATA = [(26, 22), (27, 28), (28, 30), (29, 38), (30, 42), (30, 47), (31, 50), (32, 58), (33, 60), (34, 68)]
def sx(t): return 70 + (t - 26) / 8 * 400
def sy(s): return 210 - (s - 20) / 50 * 180
SCATTER_BASE = (line(60, 20, 60, 212) + line(58, 210, 490, 210)
    + txt(275, 238, "temperature (°C)  26 → 34", "#f8fafc", 18, "middle") + txt(20, 20, "bowls", "#f8fafc", 18)
    + "".join(f'<circle cx="{sx(t):.1f}" cy="{sy(s):.1f}" r="6" fill="#fde047"/>' for t, s in DATA))
D_SCATTER = SVG.format(h=245, body=SCATTER_BASE)
D_SCATTER_FIT = SVG.format(h=245, body=SCATTER_BASE
    + line(sx(26), sy(5.8 * 26 - 129.7), sx(34), sy(5.8 * 34 - 129.7), "#86efac", 3)
    + line(sx(32), 210, sx(32), sy(56), "#fca5a5", 2, "6 5") + line(60, sy(56), sx(32), sy(56), "#fca5a5", 2, "6 5")
    + txt(sx(32) - 6, sy(56) - 12, "32°C → ≈ 56", "#fca5a5", 20, "end"))

# ---------------- COLD OPEN ----------------
scene("living", [("tara", 260), ("mum", 560), ("dad", 900)])
L("dad", "Family meeting. I have prepared a presentation. Slide one. We need an eighty five inch television.", mood="smug", shot="close", prop="tablet")
L("mum", "We already have a television.", mood="deadpan", shot="close")
L("dad", "We have a SMALL television. And I have DATA. Look at this bar chart. Family happiness with our current TV, ninety eight. With a big TV, one hundred. The big bar is three times taller!", mood="excited", shot="close", prop="tablet")
L("tara", "Dad. Your axis starts at ninety seven.", mood="deadpan", shot="close")
L("dad", "It starts where the drama is.", mood="smug", shot="close")
freeze("\"WHERE THE DRAMA IS\"", 2.4, narrator="Narrator: That is not where axes start.")
L("dad", "Also, I did a survey. One hundred percent of people agree. We need a bigger TV.", mood="smug", shot="close")
L("tara", "Who did you ask?", mood="deadpan", shot="close")
L("dad", "My group chat. The Banana Coin Believers. Very smart people.", mood="smug", shot="close")
L("mum", "Those are the people who told you to buy Banana Coin.", mood="annoyed", shot="two")
L("dad", "Mostly smart people.", mood="worried", shot="close", gap=0.5)
confess("tara", "TARA RAO · 12 · Statistically The Only Reliable Source Here")
L("tara", "My dad has a graph, a survey and a dream. Two of those are misleading. And the dream is eighty five inches wide.", mood="deadpan")
L("tara", "Mum says statistics can't lie. Mum has never seen my father make a bar chart.", mood="deadpan", gap=0.6)

title()

# ---------------- ACT 1: THE BAD GRAPH ----------------
scene("kitchen", [("tara", 300), ("dad", 640)])
L("tara", "Okay. Bringing in an expert.", mood="determined", shot="wide")
sfx("drawer")
poof("centi", 960)
L("centi", "Who woke me. Oh. A graph. I could smell a bad graph from inside the drawer. It smells like confidence.", mood="bored", shot="close")
L("dad", "This chart clearly shows the big TV makes us three times happier.", mood="smug", shot="close", prop="tablet")
L("centi", "Look at the vertical axis. It starts at ninety seven, not zero. So a difference of two looks gigantic. That's called a truncated axis. Advertisers love it.", mood="teach", shot="close",
  boardClear=True, board="Axis starts at 97, not 0!", diagram=D_TRUNC)
L("tara", "Ninety eight versus one hundred. The real difference is two points. About two percent.", mood="thinking", shot="close", board="98 vs 100: only about 2% more")
L("centi", "Redraw it from zero, and the two bars are basically twins. Boring, honest twins.", mood="smug", shot="close", board="Bar charts start at 0 → honest")
L("dad", "Fine. But my survey! One hundred percent agreement!", mood="annoyed", shot="close")
L("centi", "Your sample is biased. You only asked people who already agree with you. That's not a survey. That's an echo.", mood="teach", shot="close",
  boardClear=True, board="Biased sample → useless results")
L("tara", "A fair sample should be random, so everybody has an equal chance of being picked. And it should be big enough to mean something.", mood="teach", shot="close", board="Fair sample: RANDOM + BIG ENOUGH")
L("centi", "Asking five uncles in a group chat is not big enough. Asking only people who love TV is not random. You managed both. Impressive, honestly.", mood="eyeroll", shot="close")
L("centi", "And your question was, Don't you agree a bigger TV would obviously make life better? That's a leading question. It pushes people towards your answer.", mood="teach", shot="close",
  board="No LEADING questions")
L("dad", "It was a very gentle push.", mood="worried", shot="close", gap=0.4)

confess("dad", "VIKRAM RAO · Dad · Chief Data Officer (Of Nothing)")
L("dad", "Some people say statistics can be used to mislead. I say. What else would you use them for?", mood="smug")
L("dad", "I've now been banned from making presentations at home. Two out of three family members agree. The third one is me.", mood="sad", gap=0.6)

# ---------------- ACT 2: THE PIE CHART ----------------
card("MONDAY, MATHS CLASS", "Project title: Do Not Let Dad Help", 2.4)
scene("classroom", [("teacher", 300), ("tara", 700)])
L("teacher", "Tara, your project. You surveyed thirty classmates about their favourite hawker dish. Now, show it as a pie chart.", mood="teach", shot="close")
L("tara", "Twelve said prata. Nine said thosai. Six said popiah. And three said ice kachang.", mood="neutral", shot="close",
  boardClear=True, board="Prata 12, Thosai 9, Popiah 6, Kachang 3")
poof("centi", 1040)
L("teacher", "Is that... a monster? In my classroom?", mood="shock", shot="close")
L("centi", "Relax. I'm a calculator. I'm allowed in exams.", mood="bored", shot="close")
L("centi", "A whole pie chart is three hundred and sixty degrees. Thirty people. So each person gets three hundred and sixty divided by thirty. Twelve degrees each.", mood="teach", shot="close",
  board="360° ÷ 30 people = 12° per person")
L("tara", "So prata is twelve people times twelve degrees. One hundred and forty four degrees.", mood="thinking", shot="close", board="Prata 12 × 12° = 144°")
L("tara", "Thosai, one hundred and eight. Popiah, seventy two. Ice kachang, thirty six.", mood="happy", shot="close",
  boardClear=True, board="144 + 108 + 72 + 36 = 360 ✔", diagram=D_PIE)
L("teacher", "Excellent. And always check your angles add up to three hundred and sixty.", mood="happy", shot="close")
L("centi", "And never draw it in three D. A tilted three D pie chart makes the slice at the front look bigger. It's a pie chart wearing platform shoes.", mood="smug", shot="close",
  board="3D pie charts distort the slices ✘")
L("teacher", "Tara. Can I keep him?", mood="excited", shot="two")
L("tara", "He sleeps in a junk drawer and judges everyone.", mood="deadpan", shot="close")
L("teacher", "So. A maths teacher. Welcome to the staff room.", mood="happy", shot="close", gap=0.5)

# ---------------- ACT 3: THE HAWKER CENTRE ----------------
card("SATURDAY, HAWKER CENTRE", "Uncle Hock has data", 2.2)
scene("hawker", [("tara", 260), ("dad", 560), ("uncle", 1000)])
L("uncle", "Every day, I write down the temperature, and how many ice kachang I sell. Hot day, sell more. Very scientific.", mood="smug", shot="close", prop="book")
poof("centi", 780)
L("centi", "That's a scatter graph. Each dot is one day. Temperature across, bowls sold going up. As one goes up, the other goes up. That's positive correlation.", mood="teach", shot="close",
  boardClear=True, board="Hotter → more sold: POSITIVE", diagram=D_SCATTER)
L("tara", "And if one goes up while the other goes down, that's negative correlation. Like Dad's confidence, and his accuracy.", mood="smug", shot="close", board="One up, one down: NEGATIVE")
L("centi", "And if the dots are just a random cloud, there's no correlation at all.", mood="teach", shot="close", board="Random cloud: NO correlation")
L("centi", "Draw a line of best fit through the middle of the dots, and you can predict. Thirty two degrees? About fifty six bowls.", mood="teach", shot="close",
  boardClear=True, board="Line of best fit → predictions", diagram=D_SCATTER_FIT)
L("dad", "Aha! So I stand next to the stall with a heater. Make it hotter. Uncle sells more ice kachang!", mood="excited", shot="close")
L("uncle", "Please. Don't.", mood="annoyed", shot="close")
L("dad", "Also. People who eat more ice kachang get more sunburn. So ice kachang causes sunburn. I must warn the government.", mood="determined", shot="close")
L("centi", "Correlation is not causation. Ice kachang and sunburn both go up because of a third thing. The hot sun. The ice kachang is innocent.", mood="teach", shot="close",
  board="Correlation ≠ causation")
L("tara", "Same with Dad's other theory. Countries with bigger TVs live longer. Because they're richer. Not because of the TV.", mood="deadpan", shot="close", board="Hidden third factor: heat, money...")
L("centi", "And don't predict outside your data. Uncle's data stops at thirty four degrees. Predicting sales at fifty degrees isn't maths. That's science fiction.", mood="smug", shot="close")
L("uncle", "At fifty degrees, I also close the stall.", mood="deadpan", shot="close", gap=0.4)

confess("centi", "CENTI · Recap Monster · Sample Size: One Very Tired Monster")
L("centi", "Recap. For anyone eating dinner. First. Check the axis. If a bar chart doesn't start at zero, it's exaggerating.", mood="teach",
  boardClear=True, board="1. Check the axis starts at 0")
L("centi", "Second. A fair sample is random, big enough, and asks no leading questions.", mood="teach", board="2. Sample: random, big, no leading Qs")
L("centi", "Third. Pie charts. Three hundred and sixty, divided by the total, gives the degrees for each person.", mood="teach", board="3. Pie: 360° ÷ total = ° per item")
L("centi", "Fourth. Scatter graphs show positive, negative or no correlation. Use a line of best fit, but only inside your data.", mood="teach", board="4. Scatter: correlation + best fit")
L("centi", "Finally. Correlation is not causation. Example. Every time Dad makes a graph, I go back into the drawer. That one, actually, is causation.", mood="bored",
  board="5. Correlation ≠ causation", gap=0.5)

scene("living", [("tara", 260), ("mum", 560), ("dad", 860)])
L("mum", "So. Final decision on the TV?", mood="neutral", shot="close")
L("dad", "I redrew my graph. Axis from zero. Random sample. No leading questions.", mood="determined", shot="close")
L("tara", "And?", mood="deadpan", shot="close")
L("dad", "The data says we don't need a bigger TV.", mood="sad", shot="close")
L("dad", "So I bought a bigger SOFA instead. To watch the small TV more comfortably.", mood="smug", shot="close")
L("mum", "Does it come with cushions?", mood="excited", shot="close")
L("tara", "Fifteen. Mum returned fourteen cushions last month. Net gain, one cushion.", mood="deadpan", shot="two")
sfx("ding")
L("centi", "Plot that on a bar chart. Start the axis at fourteen.", mood="bored", shot="wide", offstage=True, gap=0.8)

# ---------------- PAUSE CHALLENGE ----------------
card("PAUSE CHALLENGE", "Centi gives you 5 seconds. Then he gets smug.", 3.0)
challenge(1, "A pie chart shows 40 people. How many degrees per person? For 10 people?", "9°, 90°",
  "360 ÷ 40 = 9° each,  10 × 9° = 90°",
  "Question one. A pie chart shows forty people. How many degrees does each person get? And how many degrees for ten people?",
  "Nine degrees each, because three hundred and sixty divided by forty is nine. So ten people get ninety degrees. A quarter of the pie. Like a good prata.")
challenge(2, "More hours of revision → higher test scores. What type of correlation?", "Positive",
  "Both go up together → positive",
  "Question two. More hours of revision go with higher test scores. What type of correlation is that?",
  "Positive correlation. Both go up together. Also, a gentle hint from the universe. Revise.")
challenge(3, "A bar chart's axis starts at 50. Bars show 52 and 54. Why is it misleading?", "Truncated axis",
  "Bar 2 looks twice as tall, but 54 is < 4% more",
  "Question three. A bar chart's axis starts at fifty. The bars show fifty two and fifty four. Why is that misleading?",
  "The axis is truncated. It starts at fifty, not zero, so the second bar looks twice as tall, but it's less than four percent bigger. If you spotted that, you are now officially too smart for adverts.")
end_card()
