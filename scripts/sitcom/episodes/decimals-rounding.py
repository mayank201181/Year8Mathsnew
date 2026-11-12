# "Totally Raotional" S01E05 "Rounding Error, Party Of Four" (Topic: Decimals, Rounding & Estimation)
# Format and helpers: see common.py; check with lint_episode.py.

EP = dict(topic="decimals-rounding")

# ---------------- COLD OPEN ----------------
scene("hawker", [("tara", 240), ("mum", 470), ("dad", 700), ("uncle", 1000)])
L("uncle", "Four masala thosai, two prata, four lime juice. Total, forty seven dollars eighty five cents.", mood="excited", shot="close")
L("dad", "Split four ways. Let me round to one significant figure. Ten dollars each. Forty dollars total. I just saved us almost eight dollars!", mood="smug", shot="close", prop="phone")
L("mum", "And who pays the other seven dollars eighty five, Vikram?", mood="annoyed", shot="close")
L("uncle", "Uncle needs exact! Uncle cannot round the rent!", mood="shock", shot="close")
L("dad", "Uncle, think of it as rounding. Mathematically, I'm correct.", mood="smug", shot="close")
L("uncle", "Mathematically, you wash plates.", mood="deadpan", shot="close")
freeze("$47.85 ≈ $40 ?", 2.4, narrator="Narrator: Uncle Hock did not accept rounding.")
confess("tara", "TARA RAO · 12 · Correct To Several Decimal Places")
L("tara", "My dad rounds everything. His age, down. His bills, down. His confidence, up. Always up.", mood="deadpan")
L("tara", "The problem isn't that he rounds. The problem is he rounds at the wrong place, at the wrong time, to the wrong man.", mood="deadpan", gap=0.5)

title()

# ---------------- ACT 1: DECIMAL PLACES ----------------
scene("hawker", [("tara", 260), ("dad", 560), ("uncle", 1000)])
L("tara", "Okay. Emergency calculator.", mood="determined", shot="close")
poof("centi", 800)
L("centi", "I was napping in your mum's handbag. Between a receipt and a single loose cardamom. It was peaceful.", mood="bored", shot="close")
L("centi", "Forty seven eighty five, divided by four, is eleven point nine six two five. Nobody pays in fractions of a cent. Round to two decimal places.", mood="teach", shot="close",
  boardClear=True, board="47.85 ÷ 4 = 11.9625")
L("tara", "Look at the digit after the second decimal place. It's a two. Less than five, so we round down. Eleven dollars ninety six.", mood="thinking", shot="close",
  board="11.96|25 → next digit 2 < 5 → 11.96")
L("centi", "Five or more, round up. Four or less, leave it. But four times eleven ninety six is forty seven eighty four. We're one cent short.", mood="teach", shot="close",
  board="11.96 × 4 = 47.84  (1 cent short!)")
L("tara", "So one person pays one cent more. I nominate Dad.", mood="smug", shot="close")
L("dad", "I accept. I'm a generous man. By one cent.", mood="smug", shot="close")
L("uncle", "Also, these oranges for juice. Two point nine nine six kilograms. Round to two decimal places, please.", mood="neutral", shot="close",
  boardClear=True, board="2.996 kg to 2 d.p.")
L("tara", "The next digit is six, so round up. Two point nine nine becomes... two point nine nine plus zero point zero one. Three!", mood="thinking", shot="close")
L("centi", "Three point zero zero. Keep both zeros. They prove you rounded to two decimal places. Those zeros are working. Unlike some people at this table.", mood="smug", shot="close",
  board="2.99|6 → 3.00   (keep the zeros!)")
L("dad", "I'm on holiday.", mood="smug", shot="two", gap=0.4)

# ---------------- ACT 2: MULTIPLYING & DIVIDING DECIMALS ----------------
card("SUNDAY. DAD ATTEMPTS DIY.", "What could possibly go wrong.", 2.4)
scene("kitchen", [("dad", 300), ("tara", 600), ("centi", 920)])
L("dad", "Each kitchen tile is zero point three metres by zero point two metres. Three times two is six. So the area is zero point six square metres.", mood="smug", shot="close", prop="calculator")
L("centi", "Zero point three times zero point two. Both are less than one, so the answer must be smaller than both. Is zero point six smaller than zero point three?", mood="teach", shot="close",
  boardClear=True, board="0.3 × 0.2 = ?")
L("dad", "It is not.", mood="worried", shot="close")
L("centi", "Do three times two, which is six. Then count the decimal places in the question. One, plus one. Two decimal places. Zero point zero six.", mood="teach", shot="close",
  board="3 × 2 = 6  →  2 d.p.  →  0.06 m²")
L("tara", "So you were going to order ten times too many tiles.", mood="deadpan", shot="close", board="✘ 0.6  is 10 times too big")
L("dad", "I would've had spare tiles. That's called planning.", mood="smug", shot="close")
L("tara", "Okay. Dividing. I have one point two litres of sugarcane juice, and cups that hold zero point three litres. How many cups?", mood="thinking", shot="close", prop="plate",
  boardClear=True, board="1.2 ÷ 0.3 = ?")
L("centi", "Dividing by a decimal is awkward. So make the divisor a whole number. Multiply both numbers by ten. Twelve divided by three.", mood="teach", shot="close",
  board="× 10 both:  12 ÷ 3 = 4 cups  ✔")
L("tara", "Four cups. And seven point two divided by zero point zero four? Multiply both by a hundred. Seven hundred and twenty divided by four. One hundred and eighty.", mood="happy", shot="close",
  board="7.2 ÷ 0.04 = 720 ÷ 4 = 180")
L("centi", "Scaling both numbers by the same amount doesn't change the answer. It's like both of you standing on a chair. The gap between you stays the same.", mood="teach", shot="close")
L("dad", "My gap with the truth also stays the same.", mood="sad", shot="close", gap=0.4)

# ---------------- ACT 3: SIGNIFICANT FIGURES & ESTIMATING ----------------
card("THAT EVENING", "Dad's fitness tracker has news.", 2.4)
scene("living", [("dad", 280), ("mum", 560), ("tara", 840)])
L("dad", "My fitness watch says I walked forty eight thousand seven hundred and sixty five steps this week. Rounded to two significant figures, that's forty nine. I walked forty nine steps.", mood="sad", shot="close", prop="phone",
  boardClear=True, board="48 765 to 2 s.f.")
poof("centi", 1060)
L("centi", "Wrong. Big numbers keep their size. First two significant figures are four and eight. Next digit is seven, so round up. Forty nine thousand. Fill the rest with zeros.", mood="teach", shot="close",
  board="48|765 → 49 000  (NOT 49 ✘)")
L("mum", "What about small numbers? My recipe needs zero point zero zero four five six kilograms of saffron.", mood="thinking", shot="close",
  board="0.004 56 kg to 2 s.f.")
L("centi", "Zeros at the front don't count. They're just holding the place. The first significant figure is the four. Two significant figures, four and five. Next digit six, round up.", mood="teach", shot="close")
L("tara", "Zero point zero zero four six.", mood="happy", shot="close", board="0.004 56 → 0.0046  ✔")
L("centi", "And now, estimation. Your best defence against calculators, cashiers and fathers.", mood="smug", shot="close",
  boardClear=True, board="Estimate: round to 1 s.f.")
L("mum", "Four point eight seven metres of saree fabric at nineteen dollars sixty a metre... my calculator says nine hundred and fifty four dollars?", mood="shock", shot="close", prop="calculator",
  board="4.87 × 19.6 = 954.52 ???")
L("tara", "Estimate. Four point eight seven is about five. Nineteen sixty is about twenty. Five times twenty is a hundred. So nine hundred is way off.", mood="thinking", shot="close",
  board="≈ 5 × 20 = 100")
L("centi", "The real answer is ninety five dollars forty five, roughly. Someone typed forty eight point seven. I wonder who. Someone with fingers, near a fitness watch.", mood="eyeroll", shot="close",
  board="Real answer ≈ 95.45  ✔")
L("dad", "My fingers are very confident.", mood="smug", shot="close", gap=0.4)

confess("dad", "VIKRAM RAO · Dad · Rounds Down, Mostly")
L("dad", "I round everything. My age, to one significant figure, is forty. Very young.", mood="smug")
L("dad", "My debt? I round that to the nearest million. Which makes it zero. You're welcome.", mood="smug", gap=0.6)

confess("centi", "CENTI · Recap Monster · Exact To The Last Eye")
L("centi", "Recap. For the dinner table. First. To round, look at the next digit. Five or more, round up. Four or less, leave it.", mood="teach",
  boardClear=True, board="1. 11.9625 → 11.96 (2 d.p.)")
L("centi", "Second. When nines roll over, keep the zeros. Two point nine nine six is three point zero zero.", mood="teach", board="2. 2.996 → 3.00")
L("centi", "Third. Significant figures start at the first non zero digit. Big numbers keep their size with zeros.", mood="teach", board="3. 48 765 → 49 000    0.004 56 → 0.0046")
L("centi", "Fourth. To multiply decimals, multiply whole numbers, then count the decimal places. To divide, make the divisor whole.", mood="teach", board="4. 0.3 × 0.2 = 0.06    1.2 ÷ 0.3 = 4")
L("centi", "And finally. Estimate with one significant figure, to catch silly answers before they catch you.", mood="smug", board="5. 4.87 × 19.6 ≈ 5 × 20 = 100", gap=0.5)

scene("hawker", [("tara", 260), ("dad", 560), ("uncle", 1000)])
L("uncle", "Two kopi, two plain prata, one thosai. Total, twelve dollars.", mood="neutral", shot="close")
L("dad", "To one significant figure, that's ten!", mood="smug", shot="close", prop="phone")
L("uncle", "To one significant figure, you wash ten plates.", mood="smug", shot="close")
L("tara", "Twelve rounded down to ten. You're getting a discount on the plates, Dad.", mood="deadpan", shot="close")
L("dad", "See? Rounding works for me!", mood="excited", shot="close")
sfx("ding")
L("centi", "Somebody round me down. Down into the drawer. To zero decimal places of consciousness.", mood="bored", shot="wide", offstage=True, gap=0.8)

# ---------------- PAUSE CHALLENGE ----------------
card("PAUSE CHALLENGE", "Centi gives you 5 seconds. Then he gets smug.", 3.0)
challenge(1, "Round 0.007 382 to 2 significant figures.", "0.0074", "first s.f. is 7; next digit 8 → round 3 up",
  "Question one. Round zero point zero zero seven three eight two to two significant figures.",
  "Zero point zero zero seven four. The zeros at the front don't count. Seven and three are the significant figures, and the next digit is eight, so round up.")
challenge(2, "Work out 0.4 × 0.07", "0.028", "4 × 7 = 28;  3 decimal places → 0.028",
  "Question two. Zero point four, times zero point zero seven.",
  "Zero point zero two eight. Four times seven is twenty eight, and there are three decimal places in the question. If you said two point eight, the tiles are coming for you.")
challenge(3, "Estimate 39.2 × 5.13 ÷ 0.198", "≈ 1000", "40 × 5 ÷ 0.2 = 200 ÷ 0.2 = 1000",
  "Question three. Estimate thirty nine point two, times five point one three, divided by zero point one nine eight.",
  "About one thousand. Forty times five is two hundred. Divide by zero point two, which is the same as times five. One thousand. Dividing by a small number makes it bigger. Surprise.")
end_card()
