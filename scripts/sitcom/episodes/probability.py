# "Totally Raotional" S01E20 "Odds Are, Dad Is Wrong" (Topic: Probability) — Season 1 finale
# Format and helpers: see common.py; check with lint_episode.py.

EP = dict(topic="probability", logline="Season finale. Dad hasn't rolled a six in twelve goes, so one is 'basically guaranteed'. Probability, sample spaces and the gambler's fallacy.")

# ---- diagram helpers (dark-board friendly SVG) ----
SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 {h}">{body}</svg>'
def txt(x, y, s, col="#f8fafc", size=20, anchor="middle"):
    return f'<text x="{x}" y="{y}" font-family="sans-serif" font-size="{size}" fill="{col}" text-anchor="{anchor}">{s}</text>'
def line(x1, y1, x2, y2, col="#f8fafc", w=3):
    return f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{col}" stroke-width="{w}"/>'

def sp(p): return 50 + p * 420
D_SCALE = SVG.format(h=200, body=
    line(50, 110, 470, 110)
    + "".join(line(sp(p), 100, sp(p), 120) + txt(sp(p), 145, lab, "#f8fafc", 20) for p, lab in ((0, "0"), (0.5, "½"), (1, "1")))
    + txt(sp(0), 180, "impossible", "#fca5a5", 18) + txt(sp(1), 180, "certain", "#86efac", 18) + txt(sp(0.5), 180, "even chance", "#c4b5fd", 18)
    + f'<circle cx="{sp(1/6):.1f}" cy="110" r="9" fill="#fde047"/>' + txt(sp(1/6), 80, "roll a 6: 1/6", "#fde047", 20)
    + f'<circle cx="{sp(0.5):.1f}" cy="110" r="9" fill="#7dd3fc"/>' + txt(sp(0.5), 50, "coin lands heads", "#7dd3fc", 20)
    + f'<circle cx="{sp(0):.1f}" cy="110" r="9" fill="#fca5a5"/>' + f'<circle cx="{sp(1):.1f}" cy="110" r="9" fill="#86efac"/>'
    + txt(sp(0) + 8, 80, "roll a 7 on one dice", "#fca5a5", 16, "start") + txt(sp(1), 22, "Tuesday after Monday", "#86efac", 16, "end"))

def grid_body():
    ox, oy, c = 60, 40, 32
    out = txt(ox + 3.5 * c, 22, "1st dice →", "#c4b5fd", 18) + txt(30, oy + 3.5 * c, "2nd", "#c4b5fd", 18)
    for i in range(1, 7):
        out += txt(ox + i * c + c / 2, oy + c / 2 + 7, str(i), "#c4b5fd", 18) + txt(ox + c / 2, oy + i * c + c / 2 + 7, str(i), "#c4b5fd", 18)
        for j in range(1, 7):
            s = i + j
            fill = "#fde047" if s == 7 else "#fca5a5" if s == 12 else "none"
            op = "0.45" if fill != "none" else "0"
            out += f'<rect x="{ox + i * c}" y="{oy + j * c}" width="{c}" height="{c}" fill="{fill}" fill-opacity="{op}" stroke="#f8fafc" stroke-opacity="0.5" stroke-width="1"/>'
            out += txt(ox + i * c + c / 2, oy + j * c + c / 2 + 6, str(s), "#f8fafc", 16)
    out += txt(300, 110, "total 7: 6 cells", "#fde047", 22, "start") + txt(300, 145, "→ 6/36 = 1/6", "#fde047", 22, "start")
    out += txt(300, 195, "6 + 6: 1 cell", "#fca5a5", 22, "start") + txt(300, 230, "→ 1/36", "#fca5a5", 22, "start")
    return out
D_GRID = SVG.format(h=270, body=grid_body())

# ---------------- COLD OPEN ----------------
scene("living", [("tara", 260), ("dad", 560), ("mum", 860)])
L("dad", "Family game night! Ladders and Lizards. I need a six to win. And I haven't rolled a six all night. Twelve rolls! So I am DUE a six.", mood="excited", shot="close", prop="dice")
L("tara", "Dad. The dice doesn't know that.", mood="deadpan", shot="close")
L("dad", "The dice can feel it. Twelve rolls without a six. The six is coming. It's basically guaranteed. Basic probability.", mood="smug", shot="close", prop="dice")
sfx("tick")
L("mum", "Two.", mood="deadpan", shot="close")
L("dad", "The six is just... building up suspense.", mood="worried", shot="close", gap=0.3)
L("mum", "Speaking of luck. I entered the mall lucky draw. Grand prize, a robot vacuum. Either I win, or I don't. So it's fifty fifty!", mood="excited", shot="close", prop="phone")
L("tara", "Mum. How many tickets are in the draw?", mood="deadpan", shot="close")
L("mum", "One thousand. I have five.", mood="happy", shot="close")
L("tara", "Then it is not fifty fifty.", mood="deadpan", shot="close")
L("mum", "It's fifty fifty in my HEART.", mood="determined", shot="two", gap=0.5)
confess("tara", "TARA RAO · 12 · Season Finale · Still The Only Sane Person")
L("tara", "Twenty episodes. Twenty topics. And my parents are still my most reliable source of wrong answers.", mood="deadpan")
L("tara", "Tonight, Dad thinks dice have feelings. And Mum thinks five out of a thousand is a coin toss. I'm calling the monster.", mood="deadpan", gap=0.6)

title()

# ---------------- ACT 1: THE SCALE ----------------
scene("kitchen", [("tara", 380)])
sfx("drawer")
poof("centi", 820)
L("centi", "It's the season finale and you STILL wake me up. Couldn't you have one problem that isn't your father?", mood="bored", shot="close")
L("tara", "Dad says he's due a six.", mood="worried", shot="two")
L("centi", "Of course he does.", mood="eyeroll", shot="close", gap=0.3)
L("centi", "Probability goes from zero to one. Zero means impossible. One means certain. A half means even chance. Everything else lives in between.", mood="teach", shot="close",
  boardClear=True, board="Probability: 0 (impossible) → 1 (certain)", diagram=D_SCALE)
L("centi", "When all the outcomes are equally likely, probability is the outcomes you want, divided by the total outcomes. A dice has six faces. One of them is a six. So, one in six.", mood="teach", shot="close",
  board="P = favourable ÷ total → P(6) = 1/6")
L("tara", "So the chance of NOT rolling a six is five sixths.", mood="thinking", shot="close", board="P(not 6) = 1 − 1/6 = 5/6")
L("centi", "Yes. That's the complement. The probability something doesn't happen is one, minus the probability it does. It's how I calculate my chances of a quiet evening. Close to zero.", mood="smug", shot="close", gap=0.3)
L("centi", "And now the big one. A dice has no memory. Every roll is a fresh one in six. Twelve rolls without a six does NOT make the next six more likely. It just makes your father louder.", mood="teach", shot="close",
  boardClear=True, board="Dice have NO memory: every roll is 1/6")
L("tara", "So being due a six is...", mood="thinking", shot="close")
L("centi", "A myth. It even has a name. The gambler's fallacy. People believe it, they lose, and then they believe it even harder.", mood="teach", shot="close",
  board="\"Due a six\" = gambler's fallacy ✘", gap=0.4)

# ---------------- ACT 2: THE LUCKY DRAW ----------------
card("SATURDAY, AT THE MALL", "Lucky draw · Mum is feeling lucky", 2.4)
scene("checkout", [("mum", 300), ("tara", 560), ("cashier", 1000)])
L("cashier", "Lucky draw results at five o'clock! One thousand tickets in the box! Good luck, everyone!", mood="excited", shot="close")
L("mum", "Five tickets. Fifty fifty. I can already feel the robot vacuum.", mood="excited", shot="close")
poof("centi", 780)
L("centi", "Two outcomes doesn't mean fifty fifty. Winning and losing are NOT equally likely. You have five tickets out of a thousand. Five over a thousand. That's one in two hundred.", mood="teach", shot="close",
  boardClear=True, board="P(win) = 5/1000 = 1/200")
L("tara", "And the probability of not winning is nine hundred and ninety five out of a thousand. Zero point nine nine five.", mood="deadpan", shot="close", board="P(not win) = 995/1000 = 0.995")
L("mum", "So I should get more tickets?", mood="worried", shot="close")
L("centi", "Spend enough for two hundred tickets and you'd still only have a one in five chance. And a very long receipt. Lucky draws are designed for the shop. Not for you.", mood="eyeroll", shot="close",
  board="Even 200 tickets: 200/1000 = 1/5")
L("cashier", "Also, the robot vacuum is the display model.", mood="neutral", shot="close")
L("mum", "I don't want it anymore.", mood="sad", shot="close", gap=0.5)

# ---------------- ACT 3: TWO DICE ----------------
card("BACK AT GAME NIGHT", "Dad has a new strategy", 2.2)
scene("living", [("tara", 230), ("dad", 470), ("mum", 710), ("centi", 950)])
L("dad", "New rule! We roll TWO dice. I need a total of seven. There are eleven possible totals, two to twelve. So seven is one in eleven.", mood="smug", shot="close", prop="dice")
L("centi", "The totals are not equally likely. List every outcome. The first dice has six options. The second has six options. Six times six. Thirty six outcomes. Those ARE equally likely.", mood="teach", shot="close",
  boardClear=True, board="2 dice: 6 × 6 = 36 outcomes", diagram=D_GRID)
L("tara", "Sevens. One and six. Two and five. Three and four. Four and three. Five and two. Six and one. Six ways.", mood="thinking", shot="close", board="Total 7: 6 ways → 6/36 = 1/6")
L("centi", "Six out of thirty six. One in six. Seven is actually the most likely total. But double six? Only one way. One in thirty six.", mood="teach", shot="close", board="Double 6: 1 way → 1/36")
L("dad", "So seven is the most common total. Like the mode!", mood="excited", shot="close")
L("mum", "Your father just used a word from last week. Correctly. Who are you?", mood="shock", shot="two", gap=0.3)
L("dad", "Still. This dice is cursed. I rolled it sixty times. Only eight sixes.", mood="annoyed", shot="close", prop="dice")
L("centi", "Expected number equals probability times the number of trials. One sixth of sixty is ten. You got eight. That's close. Small experiments wobble.", mood="teach", shot="close",
  boardClear=True, board="Expected = P × trials = 1/6 × 60 = 10")
L("tara", "So the relative frequency is eight out of sixty. To test if it's really fair, you'd roll it a lot more times. Like six hundred.", mood="teach", shot="close",
  board="Rel. freq = 8/60 · more trials → better")
L("dad", "Six hundred rolls! That's my whole weekend.", mood="shock", shot="close")
L("mum", "You were only going to watch the small TV anyway.", mood="deadpan", shot="close", gap=0.4)

confess("dad", "VIKRAM RAO · Dad · Probably Right (Sometimes)")
L("dad", "People say I don't understand probability. Honestly, I'd say there's a fifty fifty chance they're right.", mood="smug")
L("dad", "Because either they're right, or they're not.", mood="smug", gap=0.6)

confess("centi", "CENTI · Recap Monster · Season Finale Edition")
L("centi", "Final recap of the season. For anyone eating dinner. First. Probability goes from zero, impossible, to one, certain.", mood="teach",
  boardClear=True, board="1. Scale: 0 impossible → 1 certain")
L("centi", "Second. With equally likely outcomes, it's favourable divided by total.", mood="teach", board="2. P = favourable ÷ total")
L("centi", "Third. Not happening equals one minus happening.", mood="teach", board="3. P(not A) = 1 − P(A)")
L("centi", "Fourth. Two dice? Draw the sample space. Thirty six outcomes. And expected number equals probability times trials.", mood="teach", board="4. Sample space · Expected = P × trials")
L("centi", "And finally. Dice have no memory. Nobody is ever due a six. Not even on a season finale.", mood="smug", board="5. Dice have no memory!", gap=0.5)

scene("living", [("tara", 260), ("mum", 560), ("dad", 860)])
L("tara", "Okay. Last roll of the season. Dad needs a six to win.", mood="neutral", shot="wide")
L("dad", "And I'm NOT due one. A dice has no memory. It's still exactly one in six.", mood="determined", shot="close", prop="dice")
freeze("\"DAD IS RIGHT\"", 2.6, narrator="Narrator: After twenty episodes, it finally happened.")
L("mum", "Did your father just... get one right?", mood="shock", shot="close")
L("tara", "Somebody write down the date.", mood="shock", shot="close")
sfx("ding")
L("dad", "Rolling. SIX! I win!", mood="excited", shot="close", prop="dice")
L("tara", "One in six. It happens.", mood="deadpan", shot="close")
L("mum", "And the probability your father is unbearable for the rest of the year?", mood="deadpan", shot="close")
L("tara", "One. Certain.", mood="deadpan", shot="two")
L("centi", "Season one, done. Probability I'm back for season two? Very high. Somebody has to supervise this family.", mood="bored", shot="wide", offstage=True, gap=0.8)

# ---------------- PAUSE CHALLENGE ----------------
card("PAUSE CHALLENGE", "Centi gives you 5 seconds. Then he gets smug.", 3.0)
challenge(1, "A bag has 3 red and 7 blue counters. P(red)? P(not red)?", "3/10, 7/10",
  "3 out of 10 → 3/10,  1 − 3/10 = 7/10",
  "Question one. A bag has three red counters and seven blue counters. What's the probability of picking red? And of not picking red?",
  "Three tenths for red. And one minus three tenths, seven tenths, for not red. If you said fifty fifty because it's red or not red, please return to Mum's lucky draw.")
challenge(2, "Two dice are rolled. What is the probability the total is 12?", "1/36",
  "Only 6 + 6 → 1 way out of 36",
  "Question two. Two dice are rolled. What is the probability that the total is twelve?",
  "One in thirty six. Only six and six makes twelve. One way out of thirty six. About as rare as Dad being right. Which, as we saw, does happen.")
challenge(3, "A spinner lands on blue with probability 0.3. It's spun 200 times. Expected blues?", "60",
  "0.3 × 200 = 60",
  "Question three. A spinner lands on blue with probability zero point three. It's spun two hundred times. How many blues would you expect?",
  "Sixty. Probability times trials. Zero point three times two hundred. And no, the spinner is not due a blue. It has no feelings. Unlike me. I have one hundred eyes, and all of them are tired.")
end_card()
