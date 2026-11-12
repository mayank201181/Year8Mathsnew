# "Totally Raotional" S01E04 "A Fraction Of The Respect" (Topic: Fractions)
# Format and helpers: see common.py; check with lint_episode.py.

EP = dict(topic="fractions")

BARS = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 190">'
        '<rect x="70" y="10" width="200" height="34" fill="#fde047" fill-opacity="0.75" stroke="#f8fafc" stroke-width="2"/>'
        '<rect x="270" y="10" width="200" height="34" fill="none" stroke="#f8fafc" stroke-width="2"/>'
        '<text x="35" y="35" fill="#fde047" font-family="sans-serif" font-size="22" text-anchor="middle">1/2</text>'
        '<rect x="70" y="58" width="133" height="34" fill="#7dd3fc" fill-opacity="0.75" stroke="#f8fafc" stroke-width="2"/>'
        '<rect x="203" y="58" width="134" height="34" fill="none" stroke="#f8fafc" stroke-width="2"/>'
        '<rect x="337" y="58" width="133" height="34" fill="none" stroke="#f8fafc" stroke-width="2"/>'
        '<text x="35" y="83" fill="#7dd3fc" font-family="sans-serif" font-size="22" text-anchor="middle">1/3</text>'
        '<rect x="70" y="106" width="66.7" height="34" fill="#fde047" fill-opacity="0.75" stroke="#f8fafc" stroke-width="2"/>'
        '<rect x="136.7" y="106" width="66.7" height="34" fill="#fde047" fill-opacity="0.75" stroke="#f8fafc" stroke-width="2"/>'
        '<rect x="203.3" y="106" width="66.7" height="34" fill="#fde047" fill-opacity="0.75" stroke="#f8fafc" stroke-width="2"/>'
        '<rect x="270" y="106" width="66.7" height="34" fill="#7dd3fc" fill-opacity="0.75" stroke="#f8fafc" stroke-width="2"/>'
        '<rect x="336.7" y="106" width="66.7" height="34" fill="#7dd3fc" fill-opacity="0.75" stroke="#f8fafc" stroke-width="2"/>'
        '<rect x="403.3" y="106" width="66.7" height="34" fill="none" stroke="#f8fafc" stroke-width="2"/>'
        '<text x="35" y="131" fill="#86efac" font-family="sans-serif" font-size="22" text-anchor="middle">5/6</text>'
        '<text x="270" y="178" fill="#86efac" font-family="sans-serif" font-size="22" text-anchor="middle">3/6 + 2/6 = 5/6</text>'
        '</svg>')

# ---------------- COLD OPEN ----------------
scene("living", [("tara", 260), ("dad", 600), ("mum", 940)])
L("dad", "Pizza night report. I ate half the pizza. Tara ate a third. Half plus a third. One plus one on top, two plus three on the bottom. Two fifths!", mood="smug", shot="close", prop="plate")
L("dad", "We've eaten less than half. Which means there's plenty left for me.", mood="excited", shot="close", prop="plate")
L("tara", "Dad. You can't add the bottoms. That's not a thing.", mood="deadpan", shot="close")
L("mum", "Also, Vikram, you ate half on your own. Your half is bigger than your total.", mood="annoyed", shot="close")
L("dad", "That's what makes it impressive.", mood="smug", shot="close")
freeze("½ + ⅓ = ⅖ ?", 2.4, narrator="Narrator: They had eaten five sixths. One slice was left. Dad ate it.")
confess("tara", "TARA RAO · 12 · Receives A Fraction Of The Respect")
L("tara", "In this family, I do all the maths. And I get about one tenth of the respect. I tried simplifying it. You can't simplify disrespect.", mood="deadpan")
L("tara", "Also, I ate a third of the pizza. Two slices. Dad ate four. Out of six. Four sixths. For one man.", mood="deadpan", gap=0.5)

title()

# ---------------- ACT 1: ADDING & SIMPLIFYING ----------------
scene("kitchen", [("tara", 300), ("dad", 600)])
L("tara", "Okay. We need a referee.", mood="determined", shot="close")
sfx("drawer")
poof("centi", 940)
L("centi", "Who woke me? And why does the drawer smell of pizza? Wait. Did someone add the denominators again? I felt a disturbance.", mood="bored", shot="close")
L("centi", "You can only add fractions when the pieces are the same size. Halves and thirds are different sizes. So cut everything into sixths.", mood="teach", shot="close",
  boardClear=True, board="Same-size pieces first!", diagram=BARS)
L("tara", "One half is three sixths. One third is two sixths. Three sixths plus two sixths is five sixths.", mood="happy", shot="close", board="½ + ⅓ = 3/6 + 2/6 = 5/6  ✔")
L("centi", "Add the tops. Keep the bottom. The bottom tells you the size of the pieces. Adding the bottoms is like saying two pizzas plus two pizzas makes four restaurants.", mood="eyeroll", shot="close",
  board="Add the tops. KEEP the bottom.")
L("dad", "Fine. But I only ate four sixths, which sounds small.", mood="smug", shot="close")
L("centi", "Simplify it. Divide top and bottom by the highest common factor, which is two. Four sixths is two thirds. You ate two thirds of the pizza.", mood="teach", shot="close",
  boardClear=True, board="4/6 = (4 ÷ 2)/(6 ÷ 2) = 2/3")
L("dad", "Two thirds sounds even smaller. Smaller numbers!", mood="excited", shot="close")
L("centi", "Same amount. Equivalent fractions. Different outfit, same pizza thief. Multiply or divide the top and bottom by the same number and the value never changes.", mood="smug", shot="close",
  board="4/6 = 2/3 = 8/12   (equivalent)")
L("tara", "So whatever outfit it wears, you still ate most of the pizza.", mood="deadpan", shot="two", gap=0.4)

# ---------------- ACT 2: MULTIPLYING & DIVIDING AT THE HAWKER ----------------
card("SATURDAY BREAKFAST", "Uncle Hock's Prata & Thosai. Est. long ago.", 2.4)
scene("hawker", [("tara", 260), ("dad", 560), ("uncle", 1000)])
L("uncle", "Three prata, I cut each one into quarters, can? How many pieces you want?", mood="excited", shot="close")
L("dad", "Three divided by a quarter. Dividing makes things smaller. So, three quarters of a piece. Small appetite today.", mood="smug", shot="close")
poof("centi", 800)
L("centi", "Divide by a quarter means, how many quarters fit into three? Each prata has four quarters. Three prata, twelve quarters.", mood="teach", shot="close",
  boardClear=True, board="3 ÷ ¼ = how many quarters fit in 3?")
L("uncle", "Twelve pieces! Uncle very fast.", mood="happy", shot="close", board="= 3 × 4 = 12 pieces")
L("centi", "Dividing by a fraction is the same as multiplying by its reciprocal. Flip it upside down. One quarter flips to four over one. Three times four. Twelve.", mood="teach", shot="close",
  board="÷ ¼  is the same as  × 4")
L("tara", "So dividing by a number less than one makes the answer bigger.", mood="thinking", shot="close")
L("centi", "Exactly. Fractions are weird. Like my cousin Milli. She has a thousand eyes and still can't find her keys.", mood="bored", shot="close", gap=0.3)
L("dad", "Fine. There's three quarters of a thosai left. I'll just eat half of it.", mood="smug", shot="close", prop="plate")
L("centi", "Half of three quarters. Of means times. Multiply the tops, multiply the bottoms. One times three, two times four. Three eighths.", mood="teach", shot="close",
  boardClear=True, board="½ of ¾ = ½ × ¾ = 3/8")
L("tara", "Multiplying by a fraction less than one makes it smaller. Dividing makes it bigger. Everything is backwards.", mood="annoyed", shot="close", board="× fraction < 1 → smaller")
L("centi", "Now the boss level. Three quarters divided by three eighths. Keep the first, flip the second, multiply.", mood="teach", shot="close",
  board="¾ ÷ 3/8 = ¾ × 8/3")
L("tara", "Three quarters times eight thirds. Cancel the threes. Then eight quarters. That's two.", mood="happy", shot="close", board="= 24/12 = 2  ✔")
L("centi", "Two. Three eighths fits into three quarters exactly two times. Check with your eyes. I have a hundred, so I checked a hundred times.", mood="smug", shot="close")
L("uncle", "Wah. The calculator got eyes. Very fresh calculator.", mood="shock", shot="close", gap=0.4)

# ---------------- ACT 3: FINDING THE WHOLE ----------------
card("THAT EVENING", "Mum is reviewing the snack budget. Nervously.", 2.4)
scene("living", [("mum", 300), ("dad", 600), ("centi", 940)])
L("mum", "I've spent three fifths of my snack budget for the month. That's one hundred and twenty dollars. So what was the whole budget?", mood="worried", shot="close", prop="phone")
L("dad", "Easy. One hundred and twenty times three fifths. Seventy two dollars.", mood="smug", shot="close")
L("mum", "That's less than what I've already spent!", mood="shock", shot="close")
L("centi", "Draw a bar. Five equal parts. Three of them make one hundred and twenty. So one part is forty.", mood="teach", shot="close",
  boardClear=True, board="3/5 of budget = $120")
L("mum", "And five parts is two hundred dollars!", mood="happy", shot="close", board="1/5 = $40   →   5/5 = $200  ✔")
L("centi", "Find one part first. Then build the whole. And the leftover is two fifths. Eighty dollars. Which, at this house, lasts about two days.", mood="smug", shot="close",
  board="Find ONE part first, then the whole")
L("dad", "One day. If I'm honest.", mood="sad", shot="close", gap=0.4)

confess("dad", "VIKRAM RAO · Dad · Ate 8/12 Of A Pizza, Allegedly")
L("dad", "Some people say I ate two thirds of the pizza. I prefer to say I ate eight twelfths. Equivalent fractions. Same pizza. Much more dignified.", mood="smug")
L("dad", "Bigger numbers. Same crime. That's called presentation.", mood="smug", gap=0.6)

confess("centi", "CENTI · Recap Monster · Never Adds The Bottoms")
L("centi", "Recap. For anyone eating pizza. First. To add or subtract, make the bottoms the same. Add the tops. Keep the bottom.", mood="teach",
  boardClear=True, board="1. ½ + ⅓ = 3/6 + 2/6 = 5/6")
L("centi", "Second. Simplify by dividing top and bottom by the highest common factor.", mood="teach", board="2. 4/6 = 2/3")
L("centi", "Third. Of means times. Multiply the tops and multiply the bottoms.", mood="teach", board="3. ½ of ¾ = 3/8")
L("centi", "Fourth. To divide by a fraction, flip it and multiply. It can make the answer bigger.", mood="teach", board="4. 3 ÷ ¼ = 3 × 4 = 12")
L("centi", "And finally. To find the whole from a part, find one part first.", mood="smug", board="5. 3/5 = 120 → 1/5 = 40 → 200", gap=0.5)

scene("living", [("tara", 260), ("mum", 560), ("dad", 860)])
L("mum", "Pizza night again. I ordered two pizzas. Vikram, you may have one third.", mood="smug", shot="close")
L("dad", "One third of two pizzas? That's two thirds of a pizza! Same as last time!", mood="excited", shot="close")
L("tara", "That's... actually correct.", mood="shock", shot="close")
L("dad", "I'm learning!", mood="happy", shot="close")
L("mum", "Good. Next lesson. Sharing.", mood="deadpan", shot="wide")
sfx("ding")
L("centi", "Save me one eighth. I only have one mouth. The hundred eyes are just for judging.", mood="bored", shot="wide", offstage=True, gap=0.8)

# ---------------- PAUSE CHALLENGE ----------------
card("PAUSE CHALLENGE", "Centi gives you 5 seconds. Then he gets smug.", 3.0)
challenge(1, "Work out 2/3 + 1/4", "11/12", "8/12 + 3/12 = 11/12",
  "Question one. Two thirds plus one quarter.",
  "Eleven twelfths. Eight twelfths plus three twelfths. If you said three sevenths, you added the bottoms. Please never add the bottoms.")
challenge(2, "Work out 5 ÷ 1/3", "15", "thirds in 5 wholes: 5 × 3 = 15",
  "Question two. Five divided by one third.",
  "Fifteen. Each whole has three thirds, and there are five wholes. Dividing by a fraction can make the answer bigger. Fractions are weird.")
challenge(3, "2/5 of a number is 18. What is the number?", "45", "1/5 = 9,  so 5/5 = 45",
  "Question three. Two fifths of a number is eighteen. What is the number?",
  "Forty five. Two fifths is eighteen, so one fifth is nine, so the whole thing is five lots of nine.")
end_card()
