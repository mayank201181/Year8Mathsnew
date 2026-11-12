# "Totally Raotional" S01E19 "The Mean, The Median And The Ugly" (Topic: Averages, Range & Comparing Data)
# Format and helpers: see common.py; check with lint_episode.py.

EP = dict(topic="averages-spread")

# ---- diagram helpers (dark-board friendly SVG) ----
SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 {h}">{body}</svg>'
def txt(x, y, s, col="#f8fafc", size=20, anchor="middle"):
    return f'<text x="{x}" y="{y}" font-family="sans-serif" font-size="{size}" fill="{col}" text-anchor="{anchor}">{s}</text>'
def line(x1, y1, x2, y2, col="#f8fafc", w=3, dash=""):
    d = f' stroke-dasharray="{dash}"' if dash else ""
    return f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{col}" stroke-width="{w}"{d}/>'
def dots(vals, xf, y0, col):
    seen, out = {}, ""
    for v in vals:
        k = seen.get(v, 0); seen[v] = k + 1
        out += f'<circle cx="{xf(v):.1f}" cy="{y0 - k * 18}" r="8" fill="{col}"/>'
    return out

# Pocket money number line $0..$160
def px(v): return 30 + v * 2.875
D_POCKET = SVG.format(h=200, body=
    line(30, 150, 490, 150)
    + "".join(line(px(v), 145, px(v), 155) + txt(px(v), 178, f"${v}", "#f8fafc", 16) for v in (0, 40, 80, 120, 160))
    + dots([10, 12, 12, 14, 152], px, 136, "#7dd3fc")
    + line(px(12), 100, px(12), 128, "#86efac", 3) + txt(px(12) + 4, 92, "median $12", "#86efac", 18, "start")
    + line(px(40), 40, px(40), 140, "#fde047", 3, "6 5") + txt(px(40) + 6, 36, "mean $40", "#fde047", 20, "start")
    + txt(px(152) - 10, 110, "outlier!", "#fca5a5", 20, "end"))

# Free-throw dot plots 0..10
def fx(v): return 60 + v * 42
D_THROWS = SVG.format(h=240, body=
    line(40, 100, 500, 100) + line(40, 210, 500, 210)
    + "".join(txt(fx(v), 232, str(v), "#f8fafc", 16) for v in range(0, 11))
    + dots([6, 6, 7, 6, 5], fx, 88, "#86efac") + dots([2, 9, 10, 1, 8], fx, 198, "#fde047")
    + txt(20, 60, "Mum: range 2", "#86efac", 20, "start") + txt(20, 150, "Dad: range 9", "#fde047", 20, "start"))

# ---------------- COLD OPEN ----------------
scene("living", [("tara", 300), ("dad", 760)])
L("tara", "Dad. Pocket money negotiation. I have data. The average weekly pocket money of my five closest friends is forty dollars.", mood="determined", shot="close", prop="book")
L("dad", "Forty dollars? A week? What do they spend it on?", mood="shock", shot="close")
L("tara", "Bubble tea. Stationery. Emotional support stationery.", mood="deadpan", shot="close")
L("dad", "And you currently get...", mood="thinking", shot="close")
L("tara", "Twelve dollars. Which is, statistically, a crisis.", mood="deadpan", shot="close")
scene("living", [("tara", 260), ("dad", 600), ("mum", 960)])
sfx("door")
L("mum", "Forty dollars? When I was twelve, I got fifty cents and a lecture.", mood="annoyed", shot="close")
L("dad", "Tara. I am a numbers man. Show me the five numbers.", mood="smug", shot="close")
L("tara", "Ten. Twelve. Twelve. Fourteen. And, one hundred and fifty two.", mood="worried", shot="close")
L("mum", "WHO gets one hundred and fifty two dollars a week?", mood="shock", shot="close")
L("tara", "Jun Wei. His grandmother doesn't believe in budgets.", mood="deadpan", shot="two", gap=0.5)
confess("tara", "TARA RAO · 12 · Negotiator · Currently Under Investigation")
L("tara", "Okay. Technically the mean is forty dollars. I didn't lie. I just picked the average that likes me.", mood="smug")
L("tara", "In my defence, my father once made a bar chart that started at ninety seven.", mood="deadpan", gap=0.6)

title()

# ---------------- ACT 1: THE FOUR MEASURES ----------------
scene("kitchen", [("tara", 260), ("dad", 520)])
L("dad", "Two can play this game. I'm calling the calculator.", mood="determined", shot="two")
sfx("drawer")
poof("centi", 900)
L("centi", "Wait. The FATHER summoned me? Is the drawer on fire? Is this the end of the world?", mood="shock", shot="close")
L("dad", "My daughter claims her friends' average pocket money is forty dollars.", mood="smug", shot="close")
L("centi", "Let's do all four averages. Well, three averages and a range. First, the mean. Add them all up, divide by how many. Ten, twelve, twelve, fourteen, one hundred and fifty two. Total, two hundred. Divided by five. Forty.", mood="teach", shot="close",
  boardClear=True, board="Mean = total ÷ count = 200 ÷ 5 = $40")
L("centi", "The median. Put them in ORDER and take the middle one. Ten, twelve, twelve, fourteen, one fifty two. The middle one is twelve.", mood="teach", shot="close",
  board="Median = middle value (in order) = $12")
L("centi", "The mode is the most common value. Twelve again. And the range is the biggest minus the smallest. One hundred and fifty two minus ten. One hundred and forty two.", mood="teach", shot="close",
  board="Mode = $12 · Range = 152 − 10 = $142")
L("tara", "Okay, fine. Twelve wins three times out of four.", mood="sad", shot="close")
L("centi", "Jun Wei's grandma is an outlier. One extreme value drags the mean way up. The median doesn't care. The median has boundaries.", mood="smug", shot="close",
  boardClear=True, board="Outlier drags the MEAN · MEDIAN resists", diagram=D_POCKET)
L("dad", "Aha. So the TRUE average is twelve dollars. Exactly what you get already. Case closed.", mood="smug", shot="close")
L("tara", "Fine. But by the median, I'm perfectly average. And surely the most perfectly average girl in Singapore deserves a small raise.", mood="determined", shot="close")
L("dad", "That's a terrible argument. And I respect it.", mood="thinking", shot="close")
L("centi", "Rule of thumb. When there's an outlier, use the median. When the data is balanced, the mean is fine. And for the most popular choice, like shoe sizes, use the mode.", mood="teach", shot="close",
  board="Outlier → median · Most popular → mode", gap=0.4)

# ---------------- ACT 2: GAMES DAY ----------------
card("SUNDAY, VOID DECK COURT", "Neighbourhood Games Day · team selection", 2.4)
scene("park", [("tara", 230), ("mum", 470), ("dad", 710)])
L("mum", "The estate team needs ONE more player for the free throw contest. Ten shots a round. Me, or your father.", mood="determined", shot="close")
L("dad", "Obviously me. My five rounds. Two, nine, ten, one, eight. The median is the middle one. Ten! I'm a legend!", mood="excited", shot="close")
freeze("\"MY MEDIAN IS TEN\"", 2.4, narrator="Narrator: He did not put them in order.")
L("tara", "Dad. You have to put them in ORDER first. One, two, eight, nine, ten. Your median is eight.", mood="deadpan", shot="close",
  boardClear=True, board="Dad in order: 1, 2, 8, 9, 10 → median 8")
poof("centi", 950)
L("centi", "Still decent. But let's compare properly. Dad's total is thirty. Divided by five rounds. Mean of six. Range, ten minus one. Nine.", mood="teach", shot="close",
  board="Dad: mean 30 ÷ 5 = 6 · range 9")
L("tara", "Mum's rounds. Six, six, seven, six, five. Total, thirty. Mean, also six. Range, seven minus five. Two.", mood="thinking", shot="close",
  board="Mum: 6, 6, 7, 6, 5 → mean 6 · range 2")
L("mum", "So we're exactly the same. It's a tie!", mood="excited", shot="close")
L("centi", "Same average. Very different spread. Dad's range is nine. He's either amazing or a disaster. Mum's range is two. Mum is consistent.", mood="teach", shot="close", diagram=D_THROWS)
L("centi", "When you compare two sets of data, always say two things. An average, AND the spread. In a full sentence. In context.", mood="teach", shot="close",
  boardClear=True, board="Compare: an AVERAGE + the SPREAD")
L("tara", "Mum and Dad have the same mean score of six. But Mum's range is smaller, so her scores are more consistent.", mood="happy", shot="close",
  board="Same mean 6; Mum's range smaller → steadier")
L("mum", "Consistent. Like my cushion purchases.", mood="smug", shot="close")
L("dad", "But in the final, they need someone who can score TEN!", mood="annoyed", shot="close")
L("centi", "Or one. Your father is a coin toss wearing sports shoes.", mood="eyeroll", shot="close", gap=0.3)
L("dad", "Fine. One more round, and I'll raise my mean to SEVEN. Over six rounds.", mood="determined", shot="close")
L("centi", "Working backwards. Total equals mean times how many. Seven times six rounds is forty two. You have thirty. So you need...", mood="teach", shot="close",
  boardClear=True, board="Total needed = 7 × 6 = 42")
L("tara", "Twelve. Out of ten.", mood="deadpan", shot="close", board="Have 30 → need 12 out of 10 ✘")
L("dad", "I'll bring my own ball.", mood="determined", shot="close", gap=0.5)

confess("dad", "VIKRAM RAO · Dad · Most Exciting Player In The Estate")
L("dad", "I was not selected. They picked my wife. Consistency, apparently.", mood="sad")
L("dad", "But statistically, I have the biggest range in the whole estate. My wife says range is not a compliment. I say, look it up.", mood="smug", gap=0.6)

confess("centi", "CENTI · Recap Monster · Mean By Nature")
L("centi", "Recap. For anyone eating dinner. First. Mean, add up and divide by how many. Median, the middle one, in order. Mode, the most common. Range, biggest minus smallest.", mood="teach",
  boardClear=True, board="1. Mean · Median · Mode · Range")
L("centi", "Second. An outlier drags the mean. The median resists.", mood="teach", board="2. Outlier? Use the median")
L("centi", "Third. Working backwards. Total equals mean times how many.", mood="teach", board="3. Total = mean × how many")
L("centi", "Fourth. To compare, give an average AND the range, in a sentence, in context.", mood="teach", board="4. Compare: average + range, in context")
L("centi", "And finally. Always put the data in order before you find the median. Somebody in this family didn't. We don't talk about it.", mood="bored",
  board="5. ORDER the data before the median!", gap=0.5)

scene("living", [("tara", 260), ("mum", 560), ("dad", 860)])
L("dad", "Good news, Tara! I've lowered our family's mean pocket money. So your twelve dollars is now ABOVE average!", mood="excited", shot="close")
L("tara", "How?", mood="deadpan", shot="close")
L("dad", "I added Centi to the list. He gets zero dollars.", mood="smug", shot="close")
L("mum", "Twelve plus zero, divided by two. Six. Congratulations, darling. You're rich.", mood="happy", shot="close")
L("tara", "That's the opposite of good news.", mood="deadpan", shot="two")
sfx("ding")
L("centi", "I get zero? I have one hundred eyes. Do you know how much eye drops cost?", mood="annoyed", shot="wide", offstage=True, gap=0.8)

# ---------------- PAUSE CHALLENGE ----------------
card("PAUSE CHALLENGE", "Centi gives you 5 seconds. Then he gets smug.", 3.0)
challenge(1, "Find the mean, median, mode and range of 3, 7, 7, 8, 10.", "All 7!",
  "Mean 35 ÷ 5 = 7 · median 7 · mode 7 · range 7",
  "Question one. Find the mean, median, mode and range of three, seven, seven, eight and ten.",
  "Trick question. They're all seven. The mean is thirty five divided by five, seven. The median is seven. The mode is seven. The range is ten minus three, seven. Seven is having a great day.")
challenge(2, "The mean of 4 numbers is 9. A 5th number makes the mean 10. What is it?", "14",
  "New total 5 × 10 = 50, old total 4 × 9 = 36 → 14",
  "Question two. The mean of four numbers is nine. A fifth number is added, and the mean becomes ten. What is the fifth number?",
  "Fourteen. The old total is four times nine, thirty six. The new total is five times ten, fifty. Fifty minus thirty six, fourteen. If you said ten or eleven, that's Dad maths.")
challenge(3, "Salaries: $2k, $2k, $3k, $3k, $40k. Which average best shows a typical worker?", "Median ($3k)",
  "$40k outlier drags the mean up to $10k",
  "Question three. Five salaries. Two thousand, two thousand, three thousand, three thousand, and forty thousand dollars. Which average best describes a typical worker?",
  "The median. Three thousand dollars. The forty thousand is an outlier, and it drags the mean up to ten thousand, which nobody actually earns. Except the boss. It's always the boss.")
end_card()
