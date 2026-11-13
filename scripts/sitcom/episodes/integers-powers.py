# "Totally Raotional" S01E01 "Minus Times Minus Equals Drama" (Topic: Integers, Powers & Roots)
# Format and helpers: see common.py; check with lint_episode.py.

EP = dict(topic="integers-powers", logline="Dad's bank balance goes negative and he insists two negatives make a bigger negative. Centi untangles minus signs, powers and order of operations.")

NUMLINE = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 150">'
           '<line x1="20" y1="100" x2="500" y2="100" stroke="#f8fafc" stroke-width="3"/>'
           '<line x1="30" y1="92" x2="30" y2="108" stroke="#f8fafc" stroke-width="2"/>'
           '<line x1="122" y1="92" x2="122" y2="108" stroke="#f8fafc" stroke-width="2"/>'
           '<line x1="214" y1="92" x2="214" y2="108" stroke="#f8fafc" stroke-width="2"/>'
           '<line x1="306" y1="92" x2="306" y2="108" stroke="#f8fafc" stroke-width="2"/>'
           '<line x1="398" y1="88" x2="398" y2="112" stroke="#f8fafc" stroke-width="3"/>'
           '<line x1="490" y1="92" x2="490" y2="108" stroke="#f8fafc" stroke-width="2"/>'
           '<text x="214" y="135" fill="#f8fafc" font-family="sans-serif" font-size="20" text-anchor="middle">−10</text>'
           '<text x="398" y="135" fill="#f8fafc" font-family="sans-serif" font-size="20" text-anchor="middle">0</text>'
           '<circle cx="67" cy="100" r="8" fill="#7dd3fc"/>'
           '<text x="67" y="135" fill="#7dd3fc" font-family="sans-serif" font-size="20" text-anchor="middle">−18</text>'
           '<circle cx="472" cy="100" r="8" fill="#fca5a5"/>'
           '<text x="472" y="135" fill="#fca5a5" font-family="sans-serif" font-size="20" text-anchor="middle">4</text>'
           '<path d="M67 90 Q232 10 398 90" fill="none" stroke="#fde047" stroke-width="3"/>'
           '<text x="232" y="42" fill="#fde047" font-family="sans-serif" font-size="24" text-anchor="middle">+18</text>'
           '<path d="M398 90 Q435 50 472 90" fill="none" stroke="#86efac" stroke-width="3"/>'
           '<text x="435" y="55" fill="#86efac" font-family="sans-serif" font-size="24" text-anchor="middle">+4</text>'
           '</svg>')

# ---------------- COLD OPEN ----------------
scene("living", [("tara", 260), ("dad", 620), ("mum", 980)])
L("dad", "Family. Small update. The bank app says my balance is negative two hundred dollars.", mood="worried", shot="close", prop="phone")
L("mum", "Negative? Vikram. Is this the Banana Coin again?", mood="annoyed", shot="close")
L("dad", "Relax. The bank charged me a fifty dollar fee by mistake, and tomorrow they're taking it away.", mood="smug", shot="close", prop="phone")
L("dad", "So. Negative two hundred, minus negative fifty. Two negatives. That's negative two hundred and fifty. Basic maths.", mood="smug", shot="close", prop="phone")
L("tara", "Dad. If they take away a charge, you get money back. You'll be at negative one hundred and fifty.", mood="deadpan", shot="close")
L("dad", "Why would taking something away give me more? That's not how taking works.", mood="thinking", shot="close")
L("tara", "It is when the thing you're taking away is a debt.", mood="deadpan", shot="two")
L("dad", "Then I'll ask them to take away all my debts. Every day. Problem solved.", mood="excited", shot="close")
freeze("MINUS A MINUS?", 2.4, narrator="Narrator: The bank did not take requests.")
confess("tara", "TARA RAO · 12 · Professional Eye-Roller")
L("tara", "Every month, my dad discovers a new way to be negative. Financially, I mean. Emotionally he's extremely positive. That's actually the problem.", mood="deadpan")
L("tara", "He thinks two negatives always make a bigger negative. Like two bad decisions add up to a great decision. Which is also how he picks stocks.", mood="deadpan", gap=0.5)

title()

# ---------------- ACT 1: SUBTRACTING NEGATIVES ----------------
scene("kitchen", [("mum", 300), ("tara", 620)])
L("mum", "The freezer says negative eighteen degrees. The fridge says four degrees. So the difference is fourteen degrees, right? Eighteen take away four.", mood="thinking", shot="close")
L("tara", "Not quite. Hang on. I'm calling the expert.", mood="determined", shot="close")
sfx("drawer")
poof("centi", 960)
L("centi", "You opened the drawer during my nap. Again. This had better be a negative number emergency, because I am feeling very negative.", mood="bored", shot="close")
L("centi", "Picture a thermometer lying on its side. A number line. From negative eighteen up to zero is eighteen degrees. From zero up to four is four more. So the total is?", mood="teach", shot="close",
  boardClear=True, board="Freezer −18°C   Fridge 4°C", diagram=NUMLINE)
L("mum", "Twenty two degrees!", mood="happy", shot="close", board="4 − (−18) = 4 + 18 = 22")
L("centi", "Correct. Four minus negative eighteen is four plus eighteen. Subtracting a negative is the same as adding. Take away a debt and you get richer. Take away cold and you get warmer.", mood="teach", shot="close",
  board="Subtract a negative → ADD")
L("tara", "So Dad's bank balance is negative two hundred, minus negative fifty, which is negative two hundred plus fifty. Negative one hundred and fifty.", mood="thinking", shot="close",
  boardClear=True, board="−200 − (−50) = −200 + 50 = −150")
L("centi", "Still broke. Just less broke. Like me after my cousin Googol borrowed my batteries. Googol is ten to the power of one hundred, by the way. He never lets anyone forget it.", mood="bored", shot="close", gap=0.4)

# ---------------- ACT 2: MULTIPLYING NEGATIVES ----------------
scene("kitchen", [("dad", 240), ("mum", 470), ("tara", 700), ("centi", 960)])
L("dad", "I heard negative numbers. Here's what I know. Negative times negative is negative. Two wrongs don't make a right.", mood="smug", shot="close")
L("centi", "Two wrongs don't make a right. But two negatives, multiplied, make a positive. Let me prove it, since you won't believe a monster.", mood="eyeroll", shot="close",
  boardClear=True, board="3 × (−2) = −6")
L("centi", "Watch the pattern. Three times negative two is negative six. Two times negative two, negative four. One times negative two, negative two. Zero times negative two, zero.", mood="teach", shot="close",
  board="2 × (−2) = −4")
L("tara", "Every line, the answer goes up by two.", mood="thinking", shot="close", board="1 × (−2) = −2      0 × (−2) = 0")
L("centi", "So what comes next? Negative one, times negative two?", mood="teach", shot="close")
L("tara", "It keeps going up by two. So it's positive two!", mood="excited", shot="close", board="(−1) × (−2) = +2  ✔")
L("centi", "Positive two. Same signs, positive. Different signs, negative. Dividing works the same way. The pattern does not care about your feelings, Vikram.", mood="smug", shot="close")
L("dad", "Fine. What about three negatives? Negative one, times negative one, times negative one?", mood="thinking", shot="close")
L("tara", "Count the minus signs. An even number of negatives gives a positive. An odd number gives a negative. Three is odd. So negative one.", mood="happy", shot="close",
  boardClear=True, board="Count the negatives:", )
L("centi", "Even, positive. Odd, negative. She is twelve. You are forty something. I'm just saying.", mood="bored", shot="close", board="even → +      odd → −")
L("dad", "I'm forty one. Which is odd. Which makes me... negative?", mood="worried", shot="close")
L("mum", "That explains a lot, actually.", mood="deadpan", shot="wide", gap=0.4)

# ---------------- ACT 3: SCHOOL ----------------
card("NEXT DAY, AT SCHOOL", "Centi has stowed away in a pencil case. Again.", 2.6)
scene("classroom", [("teacher", 300), ("tara", 700)])
L("teacher", "Quick warm up, class. What is negative three squared? I've written it on the board with no brackets.", mood="teach", shot="close")
L("tara", "Easy. Negative three times negative three. Positive nine.", mood="happy", shot="close")
L("teacher", "Are you sure about that?", mood="smug", shot="close")
poof("centi", 1000)
L("centi", "Psst. Brackets matter. Negative three in brackets, squared, means negative three times negative three. That's positive nine.", mood="teach", shot="close",
  boardClear=True, board="(−3)² = (−3) × (−3) = 9")
L("centi", "But with no brackets, the square happens first and the minus sign waits outside. Three squared is nine. Then the minus. Negative nine.", mood="teach", shot="close",
  board="−3² = −(3 × 3) = −9")
L("teacher", "Exactly right. Wait. Who said that? Is that a monster in your pencil case?", mood="shock", shot="close")
L("centi", "I'm a calculator. Please ignore the eyes.", mood="bored", shot="close")
L("teacher", "Fine. Next. Every positive number has two square roots. The square roots of forty nine?", mood="teach", shot="close")
L("tara", "Seven. And negative seven. Because negative seven squared is also forty nine.", mood="happy", shot="close", board="√49 → 7 or −7")
L("teacher", "Good. Order of operations. Ten, minus two times three, plus two squared.", mood="teach", shot="close",
  boardClear=True, board="10 − 2 × 3 + 2² = ?")
L("tara", "Brackets first, then powers, then multiply and divide, then add and subtract. Two squared is four. Two times three is six. Ten minus six plus four. Eight.", mood="thinking", shot="close",
  board="= 10 − 6 + 4 = 8  ✔")
L("centi", "My uncle did that one left to right and got six hundred and seventy six. He now works as a fax machine.", mood="smug", shot="close",
  board="✘ left to right gives 676")
L("teacher", "I'm going to pretend this lesson was my idea.", mood="deadpan", shot="close", gap=0.4)

# ---------------- ACT 4: INDEX LAWS ----------------
card("THAT EVENING", "Dad has a new investment plan. Obviously.", 2.4)
scene("living", [("dad", 280), ("tara", 620), ("centi", 960)])
L("dad", "Centi. Powers. My new Banana Coin plan. My money doubles three times, then doubles four more times. Two cubed, times two to the power of four.", mood="excited", shot="close", prop="tablet")
L("dad", "Multiply the powers. Three times four is twelve. Two to the power of twelve. I'm rich!", mood="excited", shot="close", prop="tablet")
L("centi", "Two cubed means two times two times two. Two to the power of four is four more twos. How many twos altogether?", mood="teach", shot="close",
  boardClear=True, board="2³ × 2⁴ = (2×2×2) × (2×2×2×2)")
L("tara", "Seven twos. Two to the power of seven. When you multiply, you add the powers.", mood="happy", shot="close", board="= 2⁷     multiply → ADD powers")
L("centi", "And when you divide, you subtract them. Two to the nine, divided by two to the four, is two to the five.", mood="teach", shot="close",
  board="2⁹ ÷ 2⁴ = 2⁵     divide → SUBTRACT")
L("tara", "So what's two to the five, divided by two to the five? Subtract the powers. Two to the power of zero. But anything divided by itself is one.", mood="thinking", shot="close",
  board="2⁵ ÷ 2⁵ = 2⁰ = 1")
L("centi", "Anything to the power of zero is one. Except zero itself, which is a long story. Even your Banana Coin, to the power of zero, is one.", mood="teach", shot="close")
L("dad", "So Banana Coin to the power of zero is worth one whole dollar? That's an upgrade!", mood="smug", shot="close")
L("tara", "Please do not tell the bank.", mood="deadpan", shot="two", gap=0.4)

confess("dad", "VIKRAM RAO · Dad · Negative Balance, Positive Attitude")
L("dad", "People say I'm negative two hundred dollars. I prefer to say I'm two hundred dollars below sea level. Like a submarine. Submarines are very expensive.", mood="smug")
L("dad", "And now I know minus a minus is a plus. So if someone takes away all my debts, I'm a genius. I'm calling the bank.", mood="excited", gap=0.6)

confess("centi", "CENTI · Calculator Monster · Has Never Been Overdrawn")
L("centi", "Recap. For the dinner table. First. Subtracting a negative is adding. Four, minus negative eighteen, is twenty two.", mood="teach",
  boardClear=True, board="1. a − (−b) = a + b")
L("centi", "Second. Multiplying or dividing negatives? Count them. Even means positive. Odd means negative.", mood="teach", board="2. even negatives +, odd negatives −")
L("centi", "Third. Brackets matter. Negative three, in brackets, squared, is nine. Without brackets, it's negative nine.", mood="teach", board="3. (−3)² = 9   but  −3² = −9")
L("centi", "Fourth. Order of operations. Brackets, powers, multiply and divide, then add and subtract.", mood="teach", board="4. Brackets, powers, × ÷, + −")
L("centi", "And finally. Multiply, add the powers. Divide, subtract them. And anything to the power of zero is one.", mood="smug", board="5. aᵐ × aⁿ = aᵐ⁺ⁿ    a⁰ = 1", gap=0.5)

scene("living", [("tara", 260), ("mum", 560), ("dad", 860)])
L("mum", "The bank called. They took away the fifty dollar fee.", mood="neutral", shot="close")
L("dad", "So I'm at negative two hundred and fifty!", mood="worried", shot="close")
L("tara", "Negative one hundred and fifty.", mood="deadpan", shot="close")
L("dad", "I gained money by losing a negative? Somebody take away my other negatives!", mood="excited", shot="close")
L("mum", "Okay. I'm taking away your banking app.", mood="smug", shot="close")
L("dad", "That's... a positive?", mood="thinking", shot="close")
L("tara", "For the rest of us? Hugely.", mood="happy", shot="wide")
sfx("ding")
L("centi", "Put me back in the freezer drawer. Negative eighteen degrees. My happy place.", mood="bored", shot="wide", offstage=True, gap=0.8)

# ---------------- PAUSE CHALLENGE ----------------
card("PAUSE CHALLENGE", "Centi gives you 5 seconds. Then he gets smug.", 3.0)
challenge(1, "Work out −7 − (−12)", "5", "−7 + 12 = 5",
  "Question one. Negative seven, minus negative twelve. What do you get?",
  "Five. Subtracting a negative means adding. Negative seven plus twelve is five.")
challenge(2, "Work out (−2) × (−3) × (−5)", "−30", "3 negatives (odd) → negative;  2×3×5 = 30",
  "Question two. Negative two, times negative three, times negative five.",
  "Negative thirty. Three negative signs is an odd number, so the answer is negative. If you said positive thirty, you are thinking like Dad. Please stop.")
challenge(3, "Simplify 5⁴ × 5³ ÷ 5⁷", "1", "5⁴⁺³⁻⁷ = 5⁰ = 1",
  "Question three. Five to the power of four, times five to the power of three, divided by five to the power of seven.",
  "One. Add the powers to get seven. Subtract seven to get zero. And anything to the power of zero is one.")
end_card()
