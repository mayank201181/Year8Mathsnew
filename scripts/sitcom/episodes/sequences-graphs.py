# "Totally Raotional" S01E11 "The Nth Time's The Charm" (Topic: Sequences & Functions)
# Format and helpers: see common.py; check with lint_episode.py.

EP = dict(topic="sequences-graphs")

STICKS = (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 170">'
    '<g fill="none" stroke="#fde047" stroke-width="5" stroke-linecap="round">'
    '<rect x="20" y="40" width="50" height="50"/>'
    '<rect x="120" y="40" width="50" height="50"/><rect x="170" y="40" width="50" height="50"/>'
    '<rect x="270" y="40" width="50" height="50"/><rect x="320" y="40" width="50" height="50"/><rect x="370" y="40" width="50" height="50"/>'
    '</g>'
    '<text x="45" y="125" text-anchor="middle" font-family="sans-serif" font-size="22" fill="#f8fafc">4</text>'
    '<text x="170" y="125" text-anchor="middle" font-family="sans-serif" font-size="22" fill="#f8fafc">7</text>'
    '<text x="320" y="125" text-anchor="middle" font-family="sans-serif" font-size="22" fill="#f8fafc">10</text>'
    '<text x="45" y="155" text-anchor="middle" font-family="sans-serif" font-size="16" fill="#c4b5fd">n = 1</text>'
    '<text x="170" y="155" text-anchor="middle" font-family="sans-serif" font-size="16" fill="#c4b5fd">n = 2</text>'
    '<text x="320" y="155" text-anchor="middle" font-family="sans-serif" font-size="16" fill="#c4b5fd">n = 3</text>'
    '<text x="440" y="75" font-family="sans-serif" font-size="24" fill="#86efac">+3</text>'
    '<text x="440" y="105" font-family="sans-serif" font-size="24" fill="#86efac">each</text>'
    '</svg>'
)

# ---------------- COLD OPEN ----------------
scene("living", [("tara", 260), ("mum", 560), ("dad", 860)])
L("tara", "Dad. New pocket money proposal. Week one, five dollars. Then every week after that, three dollars more than the week before.", mood="determined", shot="close", prop="tablet")
L("dad", "Five dollars? Three dollars? These are tiny numbers. Basic maths. Deal.", mood="smug", shot="close")
L("tara", "For the whole year.", mood="deadpan", shot="close")
L("dad", "Deal! Shake on it.", mood="excited", shot="close")
L("mum", "Vikram. Did you actually read it?", mood="worried", shot="close")
L("dad", "It's five dollars, Anjali!", mood="smug", shot="close")
freeze("DEAL.", 2.4, narrator="Narrator: He did not read it.")
confess("tara", "TARA RAO · 12 · Future Negotiator")
L("tara", "I said three dollars more EACH week. Dad heard three dollars. He did not hear each week. And each week is the whole point of a sequence.", mood="deadpan")
L("tara", "By December he'll be paying me more than his phone bill. I've already picked a font for the invoice.", mood="smug", gap=0.6)

title()

# ---------------- ACT 1: THE NTH TERM ----------------
scene("living", [("tara", 260), ("dad", 600)])
L("dad", "Fine. Let's see. The rule is plus three. So the nth term is n plus three. Week fifty two, fifty five dollars. Easily affordable.", mood="smug", shot="close",
  boardClear=True, board="Dad's rule: n + 3 ???")
sfx("drawer")
poof("centi", 960)
L("centi", "Who's calling me during my nap? Oh. A sequence. And a father about to lose a lot of money. Good. I'll stay.", mood="bored", shot="close")
L("centi", "Write out the terms. Five, eight, eleven, fourteen. Each term is three more than the one before. That's the term to term rule.", mood="teach", shot="close",
  board="5, 8, 11, 14, ...   (+3 each time)")
L("centi", "But the nth term is a position to term rule. It answers, what is week n, without listing every single week. Plus three each time means three n.", mood="teach", shot="close",
  board="Goes up by 3  →  3n")
L("tara", "Three n gives three, six, nine. But the real sequence is five, eight, eleven. Two more every time. So three n plus two.", mood="thinking", shot="close",
  board="3n: 3, 6, 9 ...   need +2  →  3n + 2")
L("centi", "Or the zero term trick. Go one step backwards from the first term. Five minus three is two. That's your plus two.", mood="teach", shot="close",
  board="Zero term: 5 − 3 = 2  →  3n + 2 ✔")
L("tara", "Week fifty two. Three times fifty two is one hundred and fifty six. Plus two. One hundred and fifty eight dollars.", mood="happy", shot="close",
  boardClear=True, board="Week 52:  3 × 52 + 2 = $158")
L("dad", "One hundred and fifty eight dollars. In ONE week?", mood="shock", shot="close")
sfx("trombone")
L("centi", "Per week. And it keeps going. Sequences don't care about your feelings. They just add three.", mood="smug", shot="close", gap=0.4)

confess("centi", "CENTI · 100 Eyes · Counts Them Every Morning")
L("centi", "Every morning I count my eyes. One, two, three, all the way to one hundred. It's a sequence. Term to term rule, plus one. Very relaxing. Very long.", mood="bored")
L("centi", "My brother Dozen counts to twelve and goes back to bed. He says I'm showing off.", mood="bored", gap=0.5)

# ---------------- ACT 2: IS IT IN THE SEQUENCE? ----------------
scene("living", [("tara", 260), ("dad", 560), ("centi", 860)])
L("dad", "Well. At least I'll never have to pay exactly one hundred dollars. I just have a feeling.", mood="smug", shot="close")
L("centi", "Don't have a feeling. Have an equation. Set the nth term equal to one hundred. Three n plus two equals one hundred.", mood="teach", shot="close",
  boardClear=True, board="Is 100 a term?  3n + 2 = 100")
L("tara", "Three n equals ninety eight. n equals ninety eight divided by three. Thirty two point six six six.", mood="thinking", shot="close", board="3n = 98  →  n = 32.67")
L("centi", "Not a whole number. There's no week thirty two point six six six. Calendars don't work like that. So one hundred is NOT in the sequence.", mood="teach", shot="close",
  board="n not a whole number → NOT a term")
L("tara", "But what about one hundred and one? Three n equals ninety nine. n equals thirty three. Week thirty three, I get one hundred and one dollars.", mood="smug", shot="close",
  board="3n + 2 = 101  →  n = 33 ✔")
L("dad", "My feeling was technically correct.", mood="smug", shot="close")
L("tara", "Your feeling missed it by one dollar.", mood="deadpan", shot="close", gap=0.3)
L("centi", "Now your Banana Coin. Fifty, forty six, forty two, thirty eight. A decreasing sequence. It goes DOWN by four each week.", mood="teach", shot="close",
  boardClear=True, board="50, 46, 42, 38, ...   (−4 each time)")
L("centi", "Down four means negative four n. Zero term? Go back one step. Fifty plus four, fifty four. So the nth term is fifty four minus four n.", mood="teach", shot="close",
  board="nth term = 54 − 4n")
L("tara", "When does it hit zero? Fifty four minus four n equals zero. Four n is fifty four. n is thirteen point five. So by week fourteen it's below zero.", mood="thinking", shot="close",
  board="54 − 4n = 0  →  n = 13.5  →  week 14")
L("dad", "So Banana Coin is a sequence?", mood="worried", shot="close")
L("tara", "Dad, Banana Coin is a countdown.", mood="deadpan", shot="close", gap=0.4)

confess("dad", "VIKRAM RAO · Dad · Owes His Daughter Money")
L("dad", "I've been outsmarted by my own daughter. I'm proud. I'm also broke. Mostly proud.", mood="sad")
L("dad", "I've started my own sequence. Week one, I hide. Week two, I hide better. Term to term rule. Hide more.", mood="smug", gap=0.6)

# ---------------- ACT 3: PATTERNS & GEOMETRIC ----------------
card("SUNDAY LUNCH", "Hawker centre. Tara has found the chopsticks.", 2.4)
scene("hawker", [("tara", 240), ("mum", 480), ("centi", 740), ("uncle", 1000)])
L("tara", "Look. One square uses four chopsticks. Two squares in a row use seven. Three squares use ten.", mood="happy", shot="close",
  boardClear=True, diagram=STICKS)
L("uncle", "Every new square, three more of my chopsticks. Please stop at a small number.", mood="deadpan", shot="close")
L("centi", "Four, seven, ten. Goes up by three, so three n. Zero term is four minus three, one. So three n plus one.", mood="teach", shot="close",
  board="4, 7, 10 ...  →  3n + 1")
L("tara", "So twenty squares would need three times twenty, plus one. Sixty one chopsticks.", mood="thinking", shot="close", board="n = 20:  3 × 20 + 1 = 61")
L("uncle", "I have fifty. You may build sixteen squares. Then you will buy noodles.", mood="deadpan", shot="close")
L("mum", "Speaking of growing things. I told two aunties about Dad's pocket money deal. Then each of them told two more aunties. Every hour.", mood="excited", shot="close", prop="phone")
L("centi", "Ah. That's a different kind of sequence. One, two, four, eight, sixteen. It doesn't ADD the same amount. It MULTIPLIES by the same amount. Times two.", mood="teach", shot="close",
  boardClear=True, board="Arithmetic: + same number   (5, 8, 11)")
L("centi", "Adding the same number each time is arithmetic. Multiplying by the same number is geometric. Geometric sequences get big. Fast.", mood="teach", shot="close",
  board="Geometric: × same number   (1, 2, 4, 8)")
L("tara", "After ten hours, that's two to the power ten. One thousand and twenty four aunties.", mood="shock", shot="close", board="2¹⁰ = 1024 aunties")
L("mum", "That's the whole block. And the next block.", mood="excited", shot="close")
L("centi", "Arithmetic sequences walk. Geometric sequences take the MRT. Aunty gossip takes a rocket.", mood="smug", shot="close", gap=0.4)

# ---------------- RECAP ----------------
confess("centi", "CENTI · Recap Monster · Now Owes Nobody Money")
L("centi", "Recap. For anyone eating noodles right now. First. Term to term rule tells you the step. Plus three each time.", mood="teach",
  boardClear=True, board="1. Term to term: +3 each time")
L("centi", "Second. The nth term jumps straight to any position. The step becomes the number in front of n. Plus three means three n.", mood="teach", board="2. Step of 3  →  3n ...")
L("centi", "Third. Use the zero term to find the number to add on. Go one step backwards from the first term.", mood="teach", board="3. Zero term: 5 − 3 = 2  →  3n + 2")
L("centi", "Fourth. Is a number in the sequence? Make an equation. If n comes out as a whole number, yes. If not, no.", mood="teach", board="4. Term? n must be a whole number")
L("centi", "And finally. Arithmetic sequences add. Geometric sequences multiply.", mood="smug", board="5. Arithmetic: add   Geometric: multiply", gap=0.5)

scene("living", [("tara", 260), ("mum", 560), ("dad", 840)])
L("dad", "New deal, Tara. Instead, I'll give you one cent in week one, and double it every week.", mood="smug", shot="close")
L("tara", "Geometric. Week twenty, that's over five thousand dollars.", mood="deadpan", shot="close")
L("dad", "Never mind. Original deal.", mood="shock", shot="close")
L("mum", "That's the first good financial decision you've made all year.", mood="deadpan", shot="close")
L("dad", "It's the nth time I've been told that.", mood="sad", shot="close")
sfx("ding")
L("centi", "My nap sequence. Nap, interrupted, nap, interrupted. The rule is: this family.", mood="bored", shot="wide", offstage=True, gap=0.8)

# ---------------- PAUSE CHALLENGE ----------------
card("PAUSE CHALLENGE", "Centi gives you 5 seconds. Then he gets smug.", 3.0)
challenge(1, "Find the nth term of  7, 11, 15, 19, ...", "4n + 3",
  "+4 each time → 4n    zero term 7 − 4 = 3",
  "Question one. Find the nth term of seven, eleven, fifteen, nineteen.",
  "Four n plus three. It goes up by four, so four n. Zero term, seven minus four, three. If you wrote n plus four, you're Dad. Go and pay your daughter.")
challenge(2, "What is the 50th term of  3n − 1 ?", "149",
  "3 × 50 − 1 = 150 − 1 = 149",
  "Question two. What is the fiftieth term of three n minus one?",
  "One hundred and forty nine. Swap n for fifty. Three times fifty is one hundred and fifty. Minus one. No listing required. Your fingers can rest.")
challenge(3, "Is 85 a term of the sequence  4n + 3 ?", "No",
  "4n + 3 = 85 → 4n = 82 → n = 20.5 (not whole)",
  "Question three. Is eighty five a term of the sequence four n plus three?",
  "No. Four n plus three equals eighty five gives n equals twenty point five. There is no term twenty point five. Close, but sequences don't do half birthdays.")
end_card()
