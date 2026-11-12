# "Totally Raotional" S01E03 "Ten To The Power Of Nope" (Topic: Powers of 10 & Standard Form)
# Format and helpers: see common.py; check with lint_episode.py.

EP = dict(topic="standard-form")

PLACE = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 150">'
         '<line x1="10" y1="62" x2="510" y2="62" stroke="#c4b5fd" stroke-width="2"/>'
         '<text x="45" y="45" fill="#fde047" font-family="sans-serif" font-size="24" text-anchor="middle">10³</text>'
         '<text x="125" y="45" fill="#fde047" font-family="sans-serif" font-size="24" text-anchor="middle">10²</text>'
         '<text x="205" y="45" fill="#fde047" font-family="sans-serif" font-size="24" text-anchor="middle">10¹</text>'
         '<text x="285" y="45" fill="#fde047" font-family="sans-serif" font-size="24" text-anchor="middle">10⁰</text>'
         '<text x="385" y="45" fill="#7dd3fc" font-family="sans-serif" font-size="24" text-anchor="middle">10⁻¹</text>'
         '<text x="470" y="45" fill="#7dd3fc" font-family="sans-serif" font-size="24" text-anchor="middle">10⁻²</text>'
         '<text x="45" y="105" fill="#f8fafc" font-family="sans-serif" font-size="24" text-anchor="middle">1000</text>'
         '<text x="125" y="105" fill="#f8fafc" font-family="sans-serif" font-size="24" text-anchor="middle">100</text>'
         '<text x="205" y="105" fill="#f8fafc" font-family="sans-serif" font-size="24" text-anchor="middle">10</text>'
         '<text x="285" y="105" fill="#f8fafc" font-family="sans-serif" font-size="24" text-anchor="middle">1</text>'
         '<circle cx="333" cy="100" r="6" fill="#fca5a5"/>'
         '<text x="385" y="105" fill="#f8fafc" font-family="sans-serif" font-size="24" text-anchor="middle">0.1</text>'
         '<text x="470" y="105" fill="#f8fafc" font-family="sans-serif" font-size="24" text-anchor="middle">0.01</text>'
         '<text x="260" y="140" fill="#86efac" font-family="sans-serif" font-size="18" text-anchor="middle">each step left is ×10 · each step right is ÷10</text>'
         '</svg>')

# ---------------- COLD OPEN ----------------
scene("living", [("tara", 260), ("dad", 620), ("mum", 980)])
L("dad", "Big news. Banana Coin is now worth three point five cents. My investment guru says it'll be worth ten times more by Friday.", mood="excited", shot="close", prop="tablet")
L("dad", "Times ten. You just add a zero. Three point five zero cents. Look at that zero. Growth!", mood="smug", shot="close", prop="tablet")
L("tara", "Dad. Three point five zero is the same number as three point five.", mood="deadpan", shot="close")
L("dad", "No it isn't. It has more zero in it.", mood="smug", shot="close")
L("mum", "Adding a zero to the end of a decimal does nothing, Vikram. Like your guru.", mood="annoyed", shot="close")
freeze("3.5 × 10 = 3.50 ?", 2.4, narrator="Narrator: The zero did nothing. Neither did the coin.")
confess("tara", "TARA RAO · 12 · Thinks In Powers Of Ten")
L("tara", "My dad's dream is to be a billionaire. A billion is ten to the power of nine. One followed by nine zeros.", mood="deadpan")
L("tara", "Dad's savings are also ten to the power of something. A much smaller something. And it's going down.", mood="deadpan", gap=0.5)

title()

# ---------------- ACT 1: TIMES TEN, TIMES ZERO POINT ONE ----------------
scene("living", [("tara", 260), ("dad", 560)])
L("tara", "Right. Calculator monster. Now.", mood="determined", shot="close")
poof("centi", 900)
L("centi", "I was asleep. I was dreaming in binary. It was all zeros and ones. Mostly zeros. Like this family's savings.", mood="bored", shot="close")
L("centi", "Rule number one. When you multiply by ten, the digits slide one place to the left. Three point five becomes thirty five. You don't add a zero. The digits move.", mood="teach", shot="close",
  boardClear=True, board="3.5 × 10 = 35   (digits move left)")
L("centi", "Times a hundred, two places. Three hundred and fifty. Divide by ten, they slide right. Zero point three five.", mood="teach", shot="close",
  board="3.5 × 100 = 350      3.5 ÷ 10 = 0.35")
L("dad", "Okay, so multiplying always makes things bigger. Everyone knows that.", mood="smug", shot="close")
L("centi", "Wrong. Multiply by zero point one. That's the same as dividing by ten. Three point five times zero point one is zero point three five. Smaller.", mood="eyeroll", shot="close",
  board="× 0.1 is the same as ÷ 10")
L("tara", "And times zero point zero one is the same as dividing by a hundred.", mood="thinking", shot="close", board="× 0.01 is the same as ÷ 100")
L("centi", "Multiplying by something less than one makes things smaller. Like your bank balance, times zero point one. Which, Vikram, is basically what happened.", mood="smug", shot="close", gap=0.4)

L("centi", "Now the powers of ten. Ten cubed is a thousand. Ten squared, a hundred. Ten to the one, ten. Ten to the power of zero?", mood="teach", shot="close",
  boardClear=True, board="Place value as powers of 10", diagram=PLACE)
L("tara", "One. Anything to the power of zero is one.", mood="happy", shot="close")
L("centi", "Keep going right. Ten to the minus one is one tenth, zero point one. Ten to the minus two is one hundredth, zero point zero one.", mood="teach", shot="close",
  board="10⁻¹ = 0.1     10⁻² = 0.01")
L("dad", "So ten to the minus two is negative one hundred.", mood="smug", shot="close")
L("centi", "No! A negative power is not a negative number. It's a tiny positive number. It means divide. Ten to the minus two means one divided by a hundred.", mood="shock", shot="close",
  board="10⁻² = 1/100   NOT −100 ✘")
L("tara", "Negative powers. Small, but positive. Like my opinion of Banana Coin.", mood="deadpan", shot="two", gap=0.4)

# ---------------- ACT 2: STANDARD FORM ----------------
card("TARA'S SCIENCE PROJECT", "Topic: Space. Because Earth has Dad on it.", 2.4)
scene("living", [("tara", 260), ("dad", 560), ("centi", 900)])
L("tara", "The Sun is about one hundred and fifty million kilometres from Earth. That's a lot of zeros to write.", mood="thinking", shot="close", prop="book",
  boardClear=True, board="150 000 000 km")
L("centi", "Which is why we have standard form. A number, times ten to the power of something. The front number has to be at least one, and less than ten.", mood="teach", shot="close",
  board="A × 10ⁿ   with  1 ≤ A < 10")
L("tara", "So I move the decimal point until I get one point five. That's eight places. One point five times ten to the power of eight kilometres.", mood="happy", shot="close",
  board="= 1.5 × 10⁸ km  ✔")
L("dad", "Let me try. Fifteen times ten to the power of seven. Same thing!", mood="smug", shot="close", board="15 × 10⁷ ?")
L("centi", "Same value. Wrong form. Fifteen is not less than ten. That's like wearing your shoes on your head. Technically you're wearing shoes.", mood="eyeroll", shot="close",
  board="Right value, NOT standard form ✘")
L("centi", "My cousin Googol is one times ten to the power of one hundred. He's very proud of his form. He mentions it at every family dinner.", mood="bored", shot="close", gap=0.3)
L("tara", "What about tiny things? A human hair is about zero point zero zero zero zero eight metres wide.", mood="thinking", shot="close",
  boardClear=True, board="Hair ≈ 0.00008 m")
L("centi", "Small numbers get negative powers. Move the point right until you reach eight. Five places. Eight times ten to the power of negative five metres.", mood="teach", shot="close",
  board="= 8 × 10⁻⁵ m")
L("tara", "Big number, positive power. Small number, negative power.", mood="happy", shot="close", board="Big → positive power   Small → negative")
sfx("ding")

# ---------------- ACT 3: COMPARING & CALCULATOR DISPLAYS ----------------
card("THAT EVENING", "Dad has diversified. Into more fruit.", 2.4)
scene("living", [("dad", 280), ("mum", 560), ("tara", 840)])
L("dad", "I've diversified. Banana Coin is worth three times ten to the minus five dollars. Mango Coin is worth nine times ten to the minus six. Nine beats three. Mango Coin wins!", mood="excited", shot="close", prop="tablet",
  boardClear=True, board="Banana 3 × 10⁻⁵   Mango 9 × 10⁻⁶")
poof("centi", 1060)
L("centi", "Compare the powers first. Negative five is bigger than negative six. So Banana Coin is bigger. Zero point zero zero zero zero three, against zero point zero zero zero zero zero nine.", mood="teach", shot="close",
  board="−5 > −6  so  3 × 10⁻⁵ is BIGGER")
L("dad", "So Banana Coin wins!", mood="excited", shot="close")
L("tara", "It's worth three thousandths of a cent, Dad. Nobody wins.", mood="deadpan", shot="close")
L("mum", "My calculator says two point five E minus seven. Is that a password?", mood="thinking", shot="close", prop="calculator",
  board="Calculator: 2.5E-7")
L("dad", "It's my credit score.", mood="smug", shot="close")
L("centi", "E means times ten to the power of. Two point five times ten to the minus seven. Zero point zero zero zero zero zero zero two five. Very small. Like your credit score.", mood="smug", shot="close",
  board="2.5E-7 = 2.5 × 10⁻⁷ = 0.00000025")
L("dad", "I'll take that as a compliment.", mood="smug", shot="close", gap=0.4)

confess("dad", "VIKRAM RAO · Dad · Thinks Big, Exponentially")
L("dad", "From now on, I present all my finances in standard form. My savings are four point two times ten to the power of two dollars. Sounds like a space mission.", mood="smug")
L("dad", "It's four hundred and twenty dollars. But nobody needs to know that.", mood="sad", gap=0.6)

confess("centi", "CENTI · Recap Monster · Ten To The Power Of Tired")
L("centi", "Recap. For anyone eating dinner. First. Times ten moves digits one place left. Times zero point one is the same as dividing by ten.", mood="teach",
  boardClear=True, board="1. × 0.1 = ÷ 10     × 0.01 = ÷ 100")
L("centi", "Second. Ten to the power of zero is one. Negative powers are tiny, not negative. Ten to the minus two is one hundredth.", mood="teach", board="2. 10⁰ = 1     10⁻² = 0.01")
L("centi", "Third. Standard form is a number from one up to, but not including, ten, times a power of ten.", mood="teach", board="3. A × 10ⁿ,  1 ≤ A < 10")
L("centi", "Fourth. Big numbers, positive powers. Small numbers, negative powers.", mood="teach", board="4. 1.5 × 10⁸     8 × 10⁻⁵")
L("centi", "And finally. To compare, check the powers first. And E on a calculator means times ten to the power of.", mood="smug", board="5. Powers first.   E = × 10^", gap=0.5)

scene("hawker", [("tara", 260), ("dad", 560), ("uncle", 1000)])
L("uncle", "Two thosai, one plain prata, two teh. Total one point eight five times ten to the power of one dollars!", mood="excited", shot="close")
L("dad", "Uncle speaks standard form? Eighteen dollars fifty! Sounds like a rocket launch.", mood="excited", shot="close", prop="phone")
L("tara", "Then please pay it in standard form, Dad.", mood="deadpan", shot="close")
L("dad", "Uncle, can I pay one point eight five times ten to the power of zero?", mood="smug", shot="close")
L("uncle", "One dollar eighty five? Can. Then you wash plates for the rest.", mood="smug", shot="close", gap=0.4)
sfx("ding")
L("centi", "My cousin Googol says hi. He's still saying it. Ten to the power of one hundred takes a while.", mood="bored", shot="wide", offstage=True, gap=0.8)

# ---------------- PAUSE CHALLENGE ----------------
card("PAUSE CHALLENGE", "Centi gives you 5 seconds. Then he gets smug.", 3.0)
challenge(1, "Write 72 000 000 in standard form.", "7.2 × 10⁷", "point moves 7 places;  1 ≤ 7.2 < 10",
  "Question one. Write seventy two million in standard form.",
  "Seven point two times ten to the power of seven. If you wrote seventy two times ten to the six, the value is right but the form is wrong. The front number must be less than ten.")
challenge(2, "Write 0.00045 in standard form.", "4.5 × 10⁻⁴", "0.00045 → 4.5 : point moves 4 places",
  "Question two. Write zero point zero zero zero four five in standard form.",
  "Four point five times ten to the power of negative four. Small numbers get negative powers.")
challenge(3, "Which is bigger: 6 × 10⁻³ or 9 × 10⁻⁴?", "6 × 10⁻³", "−3 > −4:  0.006 > 0.0009",
  "Question three. Which is bigger. Six times ten to the minus three, or nine times ten to the minus four?",
  "Six times ten to the minus three. Compare the powers first. Negative three is bigger than negative four. Nine looked bigger. Nine lied.")
end_card()
