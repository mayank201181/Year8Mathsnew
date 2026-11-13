# "Totally Raotional" S01E09 "Let X Be Dad" (Topic: Expressions & Formulae)
# Format and helpers: see common.py; check with lint_episode.py.

EP = dict(topic="expressions", logline="Dad's chai-stall business plan says 3c + 2t = 5ct. Like terms, substitution, negative squares, expanding brackets and factorising.")

AREA_MODEL = (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 200">'
    '<text x="200" y="28" text-anchor="middle" font-family="sans-serif" font-size="24" fill="#f8fafc">x</text>'
    '<text x="390" y="28" text-anchor="middle" font-family="sans-serif" font-size="24" fill="#f8fafc">+ 4</text>'
    '<text x="45" y="105" text-anchor="middle" font-family="sans-serif" font-size="26" fill="#f8fafc">3</text>'
    '<rect x="80" y="40" width="240" height="110" fill="none" stroke="#fde047" stroke-width="4"/>'
    '<rect x="320" y="40" width="140" height="110" fill="none" stroke="#7dd3fc" stroke-width="4"/>'
    '<text x="200" y="105" text-anchor="middle" font-family="sans-serif" font-size="30" fill="#fde047">3x</text>'
    '<text x="390" y="105" text-anchor="middle" font-family="sans-serif" font-size="30" fill="#7dd3fc">12</text>'
    '<text x="260" y="188" text-anchor="middle" font-family="sans-serif" font-size="24" fill="#86efac">3(x + 4) = 3x + 12</text>'
    '</svg>'
)

# ---------------- COLD OPEN ----------------
scene("living", [("tara", 260), ("mum", 560), ("dad", 860)])
L("dad", "Family. Announcement. Uncle Hock is letting me run his drinks stall on Saturday. I have written a business plan.", mood="excited", shot="close", prop="tablet")
L("mum", "You have a business plan?", mood="worried", shot="close")
L("tara", "Let me see. Three c plus two t, equals five c t. What is c?", mood="deadpan", shot="close", prop="tablet")
L("dad", "C is chai.", mood="smug", shot="close")
L("tara", "And t?", mood="deadpan", shot="close")
L("dad", "T is tea. And c t is chai tea. Our new signature drink. Five of them.", mood="smug", shot="close")
L("tara", "Dad. Chai MEANS tea. You're selling tea tea.", mood="deadpan", shot="close")
L("dad", "Premium tea tea.", mood="smug", shot="close", gap=0.3)
freeze("TEA TEA", 2.4, narrator="Narrator: Day one of the business. Already in trouble.")
confess("tara", "TARA RAO · 12 · Unpaid Business Consultant")
L("tara", "My dad has invented a drink by adding letters together. In algebra, that's illegal. In business, it's apparently a start up.", mood="deadpan")
L("tara", "I'm going with him on Saturday. Someone has to protect the customers.", mood="deadpan", gap=0.6)

title()

# ---------------- ACT 1: LIKE TERMS & FORMULAE ----------------
card("SATURDAY, SIX A.M.", "Uncle Hock's drinks stall. Uncle Hock is not a morning person.", 2.6)
scene("hawker", [("tara", 240), ("dad", 480), ("uncle", 1000)])
L("uncle", "Forty years I sell drinks here. Never needed algebra. Also never made profit. Maybe these two things are related.", mood="bored", shot="close")
L("dad", "Don't worry, Uncle. My plan says three c plus two t is five c t.", mood="smug", shot="close")
L("uncle", "My customers order kopi and teh. Nobody has ever ordered a c t.", mood="deadpan", shot="close")
sfx("drawer")
poof("centi", 740)
L("centi", "Who called me to a hawker centre at six in the morning? Oh. Algebra crimes. I can smell them from the drawer.", mood="bored", shot="close")
L("centi", "Rule one of algebra. You can only add LIKE terms. Three cups of chai plus two cups of tea is three cups of chai and two cups of tea. They do not merge.", mood="teach", shot="close",
  boardClear=True, board="3c + 2t  stays  3c + 2t  (not 5ct!)")
L("tara", "So if we sell three chai, two tea, then four more chai and one less tea, it's three c plus four c, and two t take away t.", mood="thinking", shot="close",
  board="3c + 2t + 4c − t")
L("tara", "Seven c plus t.", mood="happy", shot="close", board="= 7c + t ✔")
L("centi", "Correct. Like terms are the same letter with the same power. And another favourite. Your father will tell you x squared plus x squared is x to the power four.", mood="smug", shot="close")
L("dad", "It isn't?", mood="shock", shot="close")
L("centi", "Two lots of x squared. That's two x squared. Adding never changes the power. One cat plus one cat is two cats. Not one giant cat, squared. That would be terrifying.", mood="teach", shot="close",
  board="x² + x² = 2x²  (not x⁴)")
L("uncle", "I have two cats. They are already terrifying.", mood="deadpan", shot="close", gap=0.3)
L("centi", "Now a formula. Uncle, how much rent are you charging him?", mood="neutral", shot="close")
L("uncle", "Fifteen dollars. Because I like the girl. Not the father.", mood="deadpan", shot="close")
L("centi", "Each chai sells for two dollars. So profit P equals two c minus fifteen. Two dollars for every cup, minus the rent.", mood="teach", shot="close",
  boardClear=True, board="Profit:  P = 2c − 15")
L("tara", "If we sell twenty cups, swap c for twenty. Two times twenty is forty, minus fifteen. Twenty five dollars profit.", mood="happy", shot="close",
  board="c = 20:  P = 2 × 20 − 15 = $25")
L("dad", "And so far I've sold five cups.", mood="neutral", shot="close")
L("tara", "Two times five is ten. Ten minus fifteen. Negative five dollars.", mood="deadpan", shot="close", board="c = 5:  P = 10 − 15 = −$5")
L("uncle", "Negative five. That is my usual Tuesday.", mood="deadpan", shot="close", gap=0.4)

confess("centi", "CENTI · 100 Eyes · Drinks Nothing, Judges Everything")
L("centi", "I don't drink tea. With a hundred eyes, caffeine is dangerous. One sip and I can see next week.", mood="bored")
L("centi", "My cousin Googol has more eyes than there are atoms in the universe. Nobody has ever finished counting her. She's very hard to buy glasses for.", mood="bored", gap=0.5)

# ---------------- ACT 2: SUBSTITUTION TRAP ----------------
scene("classroom", [("teacher", 300), ("tara", 720)])
L("teacher", "Good morning class. Quick question. If x equals negative three, what is x squared?", mood="teach", shot="close",
  boardClear=True)
L("tara", "Nine. Negative three times negative three. Minus times minus is plus.", mood="neutral", shot="close", board="x = −3:  x² = (−3)² = 9")
L("teacher", "Correct. Now type minus three squared into a calculator without brackets. What do you get?", mood="teach", shot="close")
L("tara", "Negative nine. Wait. Why?", mood="shock", shot="close", prop="calculator")
poof("centi", 1040)
L("centi", "Because the calculator squares FIRST, then puts the minus on. Powers come before the minus sign. When you substitute a negative number, always put it in brackets.", mood="teach", shot="close",
  board="−3² = −9    but  (−3)² = 9")
L("teacher", "Exactly. And if x is negative four, three x is three times negative four. Negative twelve. Not thirty four. I have seen thirty four.", mood="annoyed", shot="close",
  board="x = −4:  3x = 3 × (−4) = −12")
L("centi", "Thirty four. Someone just wrote the three next to the four. That's not algebra. That's arts and crafts.", mood="eyeroll", shot="close")
L("teacher", "By the way, Tara, your father emailed me. He asked if algebra is still necessary now that we have phones.", mood="deadpan", shot="close")
L("tara", "What did you say?", mood="worried", shot="close")
L("teacher", "I said his phone would also say his tea business made negative five dollars.", mood="smug", shot="close", gap=0.4)

# ---------------- ACT 3: BRACKETS & FACTORISING ----------------
scene("hawker", [("tara", 240), ("dad", 480), ("centi", 740), ("uncle", 1000)])
L("dad", "Supplies. I'm ordering three boxes. Each box has x tea bags and four sugar sachets. Three bracket x plus four. That's three x plus four.", mood="smug", shot="close",
  boardClear=True, board="3(x + 4) = 3x + 4 ???")
sfx("buzzer")
L("centi", "So three boxes, and only four sugars in total? Uncle's customers would riot. The three multiplies EVERYTHING inside the bracket.", mood="eyeroll", shot="close")
L("centi", "Draw it as a rectangle. Three rows. One part is x wide, the other part is four wide. Three x, plus three times four, twelve.", mood="teach", shot="close",
  boardClear=True, diagram=AREA_MODEL)
L("tara", "So three bracket x plus four, is three x plus twelve. Twelve sugar sachets.", mood="happy", shot="close", board="3(x + 4) = 3x + 12 ✔")
L("centi", "And careful with negatives outside. Minus two, bracket x minus three, is minus two x, PLUS six. Minus times minus.", mood="teach", shot="close",
  board="−2(x − 3) = −2x + 6")
L("uncle", "Now do my price board. Six x plus nine. Make it shorter. The board is small.", mood="bored", shot="close")
L("centi", "That's factorising. Expanding backwards. Find the highest common factor of six x and nine. Three goes into both.", mood="teach", shot="close",
  boardClear=True, board="6x + 9:  HCF of 6x and 9 is 3")
L("tara", "Six x divided by three is two x. Nine divided by three is three. So three, bracket, two x plus three.", mood="thinking", shot="close", board="6x + 9 = 3(2x + 3)")
L("centi", "Always check by expanding. Three times two x is six x. Three times three is nine. It matches. Factorising is just expanding with the lights off.", mood="smug", shot="close",
  board="Check: 3 × 2x + 3 × 3 = 6x + 9 ✔")
L("uncle", "Shorter board. Good. Still no profit. But shorter.", mood="deadpan", shot="close", gap=0.4)

confess("dad", "VIKRAM RAO · Dad · Founder And CEO, Tea Tea")
L("dad", "I would like to clarify. The business did not lose money. The business invested in tea.", mood="smug")
L("dad", "Technically, I paid Uncle Hock five dollars to let me work. Which is called networking.", mood="sad", gap=0.6)

# ---------------- RECAP ----------------
confess("centi", "CENTI · Recap Monster · Has Seen Too Much Tea")
L("centi", "Recap. For anyone drinking tea tea right now. First. Only add like terms. Same letter, same power.", mood="teach",
  boardClear=True, board="1. Collect LIKE terms only:  3c + 2t ≠ 5ct")
L("centi", "Second. Adding never changes the power. x squared plus x squared is two x squared.", mood="teach", board="2. x² + x² = 2x²")
L("centi", "Third. Substituting a negative? Use brackets. Negative three, squared, is nine.", mood="teach", board="3. Negatives in brackets: (−3)² = 9")
L("centi", "Fourth. When you expand, multiply EVERY term inside the bracket.", mood="teach", board="4. 3(x + 4) = 3x + 12")
L("centi", "And finally. Factorising is expanding in reverse. Take out the highest common factor, then check.", mood="smug", board="5. 6x + 9 = 3(2x + 3)", gap=0.5)

scene("living", [("tara", 260), ("mum", 560), ("dad", 840)])
L("mum", "So, how was the stall?", mood="happy", shot="close")
L("dad", "Fantastic. We sold seven c plus t.", mood="smug", shot="close")
L("mum", "What does that mean in money?", mood="worried", shot="close")
L("tara", "Two times seven, plus two for the tea, minus fifteen rent. One dollar profit.", mood="deadpan", shot="close")
L("dad", "One dollar! Up from negative five! That's... a six dollar improvement!", mood="excited", shot="close")
L("tara", "That's actually correct.", mood="shock", shot="close")
L("dad", "Basic maths.", mood="smug", shot="close")
sfx("ding")
L("centi", "Let x be the number of minutes until somebody puts me back in the drawer. Please let x be zero.", mood="bored", shot="wide", offstage=True, gap=0.8)

# ---------------- PAUSE CHALLENGE ----------------
card("PAUSE CHALLENGE", "Centi gives you 5 seconds. Then he gets smug.", 3.0)
challenge(1, "Simplify  5a + 3b − 2a + b", "3a + 4b",
  "5a − 2a = 3a     3b + b = 4b",
  "Question one. Simplify five a, plus three b, minus two a, plus b.",
  "Three a plus four b. Collect the a's, collect the b's. If you wrote seven a b, you have been drinking tea tea.")
challenge(2, "Expand  4(2x − 3)", "8x − 12",
  "4 × 2x = 8x     4 × (−3) = −12",
  "Question two. Expand four, bracket, two x minus three.",
  "Eight x minus twelve. Four times two x is eight x. Four times negative three is negative twelve. Multiply everything. Leave nobody behind.")
challenge(3, "Factorise  10y + 15", "5(2y + 3)",
  "HCF = 5:   10y ÷ 5 = 2y,   15 ÷ 5 = 3",
  "Question three. Factorise ten y plus fifteen.",
  "Five, bracket, two y plus three. The highest common factor is five. Check it. Five times two y is ten y. Five times three is fifteen. Done.")
end_card()
