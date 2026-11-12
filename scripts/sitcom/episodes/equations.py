# "Totally Raotional" S01E10 "Balance Issues" (Topic: Equations & Inequalities)
# Format and helpers: see common.py; check with lint_episode.py.

EP = dict(topic="equations", logline="Mum's 'five-dollar' phone plan also charges five dollars per gigabyte. The balance method, unknowns on both sides and inequalities.")

SCALE = (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 200">'
    '<polygon points="260,110 240,190 280,190" fill="#c4b5fd"/>'
    '<line x1="60" y1="110" x2="460" y2="110" stroke="#f8fafc" stroke-width="6"/>'
    '<line x1="60" y1="110" x2="60" y2="150" stroke="#f8fafc" stroke-width="2"/>'
    '<line x1="460" y1="110" x2="460" y2="150" stroke="#f8fafc" stroke-width="2"/>'
    '<line x1="10" y1="150" x2="200" y2="150" stroke="#f8fafc" stroke-width="4"/>'
    '<line x1="370" y1="150" x2="510" y2="150" stroke="#f8fafc" stroke-width="4"/>'
    '<rect x="15" y="92" width="38" height="56" fill="none" stroke="#fde047" stroke-width="3"/>'
    '<rect x="58" y="92" width="38" height="56" fill="none" stroke="#fde047" stroke-width="3"/>'
    '<rect x="101" y="92" width="38" height="56" fill="none" stroke="#fde047" stroke-width="3"/>'
    '<text x="34" y="128" text-anchor="middle" font-family="sans-serif" font-size="22" fill="#fde047">b</text>'
    '<text x="77" y="128" text-anchor="middle" font-family="sans-serif" font-size="22" fill="#fde047">b</text>'
    '<text x="120" y="128" text-anchor="middle" font-family="sans-serif" font-size="22" fill="#fde047">b</text>'
    '<rect x="145" y="112" width="52" height="36" fill="none" stroke="#7dd3fc" stroke-width="3"/>'
    '<text x="171" y="137" text-anchor="middle" font-family="sans-serif" font-size="16" fill="#7dd3fc">500</text>'
    '<rect x="390" y="96" width="100" height="52" fill="none" stroke="#86efac" stroke-width="3"/>'
    '<text x="440" y="130" text-anchor="middle" font-family="sans-serif" font-size="20" fill="#86efac">2000 g</text>'
    '<text x="260" y="40" text-anchor="middle" font-family="sans-serif" font-size="26" fill="#f8fafc">3b + 500 = 2000</text>'
    '</svg>'
)

# ---------------- COLD OPEN ----------------
scene("living", [("tara", 260), ("mum", 560), ("dad", 860)])
L("mum", "I'm switching phone plans! Plan B. Only five dollars a month!", mood="excited", shot="close", prop="phone")
L("dad", "Plan A is twenty dollars. Plan B is five. Five is less than twenty. Basic maths. Approved.", mood="smug", shot="close")
L("tara", "Plan B is five dollars, PLUS five dollars for every gigabyte of data.", mood="deadpan", shot="close")
L("mum", "What's a gigabyte?", mood="thinking", shot="close")
L("tara", "It's what you use watching cooking videos at two in the morning. About eight of them a month.", mood="deadpan", shot="close")
L("mum", "Those are for research.", mood="annoyed", shot="close", gap=0.4)
confess("tara", "TARA RAO · 12 · Reads The Small Print")
L("tara", "My parents believe the biggest number on the poster is the price. The poster also says Unlimited Happiness. They believed that too.", mood="deadpan")
L("tara", "This is going to need an equation. Possibly several. Possibly a monster.", mood="deadpan", gap=0.6)

title()

# ---------------- ACT 1: THE BALANCE ----------------
scene("kitchen", [("mum", 260), ("tara", 520), ("dad", 780)])
L("mum", "First, baking. My eggless cake needs one bag of flour, but these bags have no labels. Three bags plus my five hundred gram weight balance exactly two kilograms.", mood="worried", shot="close")
L("tara", "So how heavy is one bag?", mood="thinking", shot="two")
sfx("drawer")
poof("centi", 1040)
L("centi", "A balance problem. Finally, something that isn't about money. Call one bag b. Three b plus five hundred, equals two thousand.", mood="teach", shot="close",
  boardClear=True, diagram=SCALE)
L("dad", "Easy. Two thousand divided by three is six hundred and sixty six. Take away five hundred. Each bag is one hundred and sixty six grams.", mood="smug", shot="close")
sfx("buzzer")
L("centi", "Wrong order. To undo an equation, you go backwards. Like taking off socks and shoes. Shoes come off first.", mood="eyeroll", shot="close")
L("centi", "The five hundred was added last, so it comes off first. Take five hundred from BOTH sides. Whatever you do to one side, you do to the other, or the scale falls over.", mood="teach", shot="close",
  board="3b + 500 = 2000   (− 500 both sides)")
L("tara", "Three b equals fifteen hundred. Then divide both sides by three. b equals five hundred grams.", mood="happy", shot="close",
  board="3b = 1500  →  b = 500 g")
L("centi", "And check it. Three bags of five hundred is fifteen hundred, plus the weight, two thousand. Balanced. Unlike this household.", mood="smug", shot="close",
  board="Check: 3 × 500 + 500 = 2000 ✔")
L("mum", "Five hundred grams. Perfect. The cake is saved.", mood="happy", shot="close")
L("dad", "One sixty six, five hundred. Same ballpark.", mood="smug", shot="close")
L("tara", "Dad, that's a cake with a third of the flour. That's not a cake. That's a pancake with ambition.", mood="deadpan", shot="close", gap=0.4)

confess("centi", "CENTI · 100 Eyes · Excellent Balance")
L("centi", "I have perfect balance. When you have a hundred eyes, you have to. If I tip over, fifty of them see the floor first.", mood="bored")
L("centi", "My cousin Scale weighs everything. Groceries. Feelings. Your homework. She's never wrong. She's also never invited anywhere.", mood="bored", gap=0.5)

# ---------------- ACT 2: BOTH SIDES ----------------
scene("living", [("tara", 260), ("mum", 540), ("centi", 820)])
L("centi", "Phone plans. Let g be the number of gigabytes. Plan A costs twenty dollars plus two dollars per gigabyte. Plan B costs five dollars plus five dollars per gigabyte.", mood="teach", shot="close",
  boardClear=True, board="A: 20 + 2g      B: 5 + 5g")
L("tara", "When do they cost the same? Twenty plus two g, equals five plus five g.", mood="thinking", shot="close", board="20 + 2g = 5 + 5g")
L("centi", "Unknowns on both sides. Collect the g's on the side with MORE g's, so they stay positive. Take two g from both sides.", mood="teach", shot="close",
  board="20 = 5 + 3g   (− 2g both sides)")
L("tara", "Then take five from both sides. Fifteen equals three g. So g equals five.", mood="happy", shot="close", board="15 = 3g  →  g = 5")
L("centi", "At five gigabytes, both plans cost thirty dollars. Above five gigabytes, Plan B gets expensive, fast.", mood="teach", shot="close")
L("tara", "Mum uses eight. Plan A is twenty plus sixteen, thirty six. Plan B is five plus forty, forty five dollars.", mood="deadpan", shot="close",
  board="g = 8:  A = $36    B = $45")
L("mum", "Nine dollars more! For the same cooking videos!", mood="shock", shot="close")
L("centi", "The five dollar plan. Cheap at the start, expensive at the end. Like most things your father invests in.", mood="smug", shot="close", gap=0.4)
scene("living", [("tara", 260), ("dad", 560), ("centi", 860)])
L("dad", "Riddle for you, genius. Take my age. Divide by four. Add three. You get fifteen. How old am I?", mood="smug", shot="close",
  boardClear=True, board="x/4 + 3 = 15")
L("dad", "I'll solve it myself. Multiply by four. x plus three equals sixty. So I'm fifty seven.", mood="smug", shot="close", board="x + 3 = 60 ???")
L("tara", "If you're fifty seven, then I'm adopted.", mood="deadpan", shot="close")
L("centi", "Classic trap. If you multiply by four, you multiply EVERY term. The three becomes twelve. Or, easier, undo the plus three first.", mood="teach", shot="close")
L("tara", "Fifteen minus three is twelve. So x over four equals twelve. Times four. Forty eight.", mood="happy", shot="close", board="x/4 = 12  →  x = 48 ✔")
L("dad", "I preferred fifty seven. It sounded wiser.", mood="sad", shot="close", gap=0.4)

confess("dad", "VIKRAM RAO · Dad · Forty Eight, Apparently")
L("dad", "I want to say, I solved the riddle. I just solved it for a different, older man.", mood="smug")
L("dad", "Also, I approved Plan B. Which means I approved spending nine extra dollars a month. On research.", mood="sad", gap=0.6)

# ---------------- ACT 3: INEQUALITIES ----------------
card("THAT EVENING", "Screen time negotiations. Both sides have lawyers.", 2.4)
scene("living", [("tara", 260), ("mum", 560), ("centi", 860)])
L("mum", "Screen time rule. At most one hundred and twenty minutes tonight. You already used thirty on homework videos.", mood="determined", shot="close")
L("tara", "Each episode of my show is twenty five minutes. So twenty five e, plus thirty, is less than or equal to one hundred and twenty.", mood="thinking", shot="close",
  boardClear=True, board="25e + 30 ≤ 120")
L("centi", "An inequality. Solve it exactly like an equation. Take thirty from both sides.", mood="teach", shot="close", board="25e ≤ 90")
L("tara", "Then divide both sides by twenty five. e is less than or equal to three point six.", mood="thinking", shot="close", board="e ≤ 3.6")
L("centi", "But you can't watch point six of an episode. Well, you can. But you'd scream. So the biggest whole number of episodes is three.", mood="smug", shot="close",
  board="Whole episodes: e = 0, 1, 2 or 3")
L("centi", "On a number line, less than or equal to gets a filled in circle. Strictly less than gets an empty circle. The circle tells you if the end number is invited.", mood="teach", shot="close",
  board="≤ filled circle     < open circle")
L("mum", "What if you watched something educational? Like that maths show with the purple monster?", mood="thinking", shot="close")
L("tara", "Those episodes are eight minutes. Ninety divided by eight is eleven point two five. So eleven episodes.", mood="happy", shot="close")
L("centi", "Eleven episodes of me? That's not screen time. That's a hostage situation.", mood="eyeroll", shot="close", gap=0.4)

# ---------------- RECAP ----------------
confess("centi", "CENTI · Recap Monster · Keeping It Balanced")
L("centi", "Recap. For anyone balancing a plate right now. First. Whatever you do to one side, do to the other.", mood="teach",
  boardClear=True, board="1. Same operation on BOTH sides")
L("centi", "Second. Undo in reverse order. Add and subtract first, then multiply or divide.", mood="teach", board="2. Undo backwards: ± first, then × or ÷")
L("centi", "Third. Unknowns on both sides? Collect them where there are more of them.", mood="teach", board="3. Collect x on the side with MORE x")
L("centi", "Fourth. Multiplying out a fraction? Multiply every single term.", mood="teach", board="4. x/4 + 3 = 15 → x + 12 = 60")
L("centi", "And finally. Inequalities solve like equations. Then check if the answer needs to be a whole number.", mood="smug", board="5. 25e + 30 ≤ 120 → e ≤ 3.6 → 3", gap=0.5)

scene("living", [("tara", 260), ("mum", 560), ("dad", 840)])
L("mum", "I've switched to Plan A.", mood="happy", shot="close")
L("dad", "Good. And I've balanced the family budget. Income equals spending.", mood="smug", shot="close")
L("tara", "How?", mood="worried", shot="close")
L("dad", "I subtracted Banana Coin from both sides.", mood="smug", shot="close")
L("tara", "That's... actually legal.", mood="shock", shot="close")
sfx("ding")
L("centi", "Let d be how desperately I want the drawer. d is greater than everything.", mood="bored", shot="wide", offstage=True, gap=0.8)

# ---------------- PAUSE CHALLENGE ----------------
card("PAUSE CHALLENGE", "Centi gives you 5 seconds. Then he gets smug.", 3.0)
challenge(1, "Solve  5x − 7 = 18", "x = 5",
  "5x = 25   →   x = 5",
  "Question one. Solve five x minus seven equals eighteen.",
  "x equals five. Add seven to both sides, twenty five. Divide by five. Five. Check it. Five fives, twenty five, minus seven, eighteen.")
challenge(2, "Solve  3x + 4 = x + 16", "x = 6",
  "2x + 4 = 16   →   2x = 12   →   x = 6",
  "Question two. Solve three x plus four equals x plus sixteen.",
  "x equals six. Take x from both sides. Two x plus four equals sixteen. Two x is twelve. x is six. If you got eight, you only subtracted from one side. The scale fell on your foot.")
challenge(3, "What is the largest integer x with 2x + 1 < 9?", "x = 3",
  "2x < 8   →   x < 4   →   largest integer is 3",
  "Question three. What is the largest whole number x, where two x plus one is less than nine?",
  "Three. Two x is less than eight, so x is less than four. Strictly less than. Four is not invited. Three is the biggest guest at the party.")
end_card()
