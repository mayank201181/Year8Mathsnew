# "Totally Raotional" S01E07 "The Great Biryani Split" (Topic: Ratio & Proportion)
# Format and helpers: see common.py; check with lint_episode.py.

EP = dict(topic="ratio-proportion")

BAR_MODEL = (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 170">'
    '<text x="10" y="58" font-family="sans-serif" font-size="22" fill="#f8fafc">Us</text>'
    '<rect x="80" y="30" width="80" height="44" fill="none" stroke="#fde047" stroke-width="3"/>'
    '<rect x="160" y="30" width="80" height="44" fill="none" stroke="#fde047" stroke-width="3"/>'
    '<rect x="240" y="30" width="80" height="44" fill="none" stroke="#fde047" stroke-width="3"/>'
    '<text x="120" y="60" text-anchor="middle" font-family="sans-serif" font-size="20" fill="#fde047">$12</text>'
    '<text x="200" y="60" text-anchor="middle" font-family="sans-serif" font-size="20" fill="#fde047">$12</text>'
    '<text x="280" y="60" text-anchor="middle" font-family="sans-serif" font-size="20" fill="#fde047">$12</text>'
    '<text x="10" y="128" font-family="sans-serif" font-size="22" fill="#f8fafc">Them</text>'
    '<rect x="80" y="100" width="80" height="44" fill="none" stroke="#7dd3fc" stroke-width="3"/>'
    '<rect x="160" y="100" width="80" height="44" fill="none" stroke="#7dd3fc" stroke-width="3"/>'
    '<text x="120" y="130" text-anchor="middle" font-family="sans-serif" font-size="20" fill="#7dd3fc">$12</text>'
    '<text x="200" y="130" text-anchor="middle" font-family="sans-serif" font-size="20" fill="#7dd3fc">$12</text>'
    '<text x="350" y="75" font-family="sans-serif" font-size="22" fill="#86efac">5 parts</text>'
    '<text x="350" y="108" font-family="sans-serif" font-size="22" fill="#86efac">= $60</text>'
    '</svg>'
)

# ---------------- COLD OPEN ----------------
scene("kitchen", [("mum", 330), ("tara", 640)])
L("mum", "Emergency! The aunties are coming for dinner on Saturday. All of them.", mood="worried", shot="close", prop="phone")
L("tara", "How many is all of them?", mood="deadpan", shot="close")
L("mum", "Ten people. And my famous biryani recipe only serves four.", mood="worried", shot="close", prop="book")
L("tara", "So we scale it up. Easy.", mood="neutral", shot="two")
scene("kitchen", [("mum", 260), ("tara", 520), ("dad", 800)])
sfx("door")
L("dad", "Leave it to me. Four people to ten people. That's six more people. So we just add six to everything.", mood="smug", shot="close")
L("dad", "Three hundred grams of rice becomes three hundred and six. Two onions becomes eight onions. Basic maths.", mood="smug", shot="close")
freeze("+6 TO EVERYTHING", 2.6, narrator="Narrator: Six extra grams of rice. For six extra aunties.")
confess("tara", "TARA RAO · 12 · Has Eaten Dad's Cooking Before")
L("tara", "Six extra grams of rice. That's about forty grains. Each auntie gets seven grains and a strong opinion.", mood="deadpan")
L("tara", "And eight onions. The biryani would be mostly tears.", mood="deadpan", gap=0.6)

title()

# ---------------- ACT 1: SCALING THE RECIPE ----------------
scene("kitchen", [("tara", 330), ("mum", 600)])
L("tara", "Okay. This needs a professional. Or at least a monster.", mood="determined", shot="wide")
sfx("drawer")
poof("centi", 900)
L("centi", "You woke me up for cooking? I live in a calculator, not a cookbook. Fine. What's the damage?", mood="bored", shot="close")
L("tara", "Recipe serves four. We need ten. Dad wants to add six to everything.", mood="worried", shot="two")
L("centi", "Of course he does. Listen. When you scale a recipe, you MULTIPLY. You never add. Six extra grams of rice does not feed six humans. It barely feeds a pigeon.", mood="teach", shot="close",
  boardClear=True, board="Scaling a recipe: MULTIPLY, never add")
L("centi", "Easiest way. Find the amount for ONE person first. Three hundred grams of rice, for four people. Divide by four.", mood="teach", shot="close",
  board="300 g ÷ 4 = 75 g per person")
L("tara", "Seventy five grams each. Times ten people is seven hundred and fifty grams.", mood="thinking", shot="close", board="75 g × 10 = 750 g for 10 people")
L("centi", "That's the unitary method. Find one, then multiply. Or use a scale factor. Ten divided by four is two point five. Multiply every ingredient by two point five.", mood="teach", shot="close",
  board="Scale factor: 10 ÷ 4 = × 2.5")
L("mum", "So my two onions become... five onions!", mood="thinking", shot="close")
L("tara", "Six hundred millilitres of water becomes fifteen hundred. And two hundred grams of paneer becomes five hundred.", mood="happy", shot="close",
  board="Water 600 → 1500 ml   Paneer 200 → 500 g")
L("mum", "Five hundred grams of paneer. Now THAT is a party.", mood="excited", shot="close")
L("centi", "Notice something. The rice to water ratio never changes. Three hundred to six hundred. Seven fifty to fifteen hundred. Both simplify to one to two.", mood="teach", shot="close",
  boardClear=True, board="Rice : water = 300 : 600 = 1 : 2")
L("centi", "Simplifying a ratio is like simplifying a fraction. Divide both sides by the same number. The biggest one you can find.", mood="teach", shot="close",
  board="750 : 1500  (÷ 750)  →  1 : 2")
L("tara", "So if you add more water but not more rice, it's not biryani anymore.", mood="thinking", shot="close")
L("centi", "It's soup. Sad, beige soup. And the aunties will talk about it until the next century.", mood="eyeroll", shot="close", gap=0.4)

confess("centi", "CENTI · 100 Eyes · Not A Chef")
L("centi", "People ask if I cook. I have one hundred eyes. If I chop an onion, I cry for a week. Out of every eye. In shifts.", mood="bored")
L("centi", "My uncle Gross has one hundred and forty four eyes. He doesn't cook either. He just reads the whole menu. All at once.", mood="bored", gap=0.5)

# ---------------- ACT 2: SPLITTING THE BILL ----------------
scene("living", [("tara", 260), ("dad", 620), ("mum", 900)])
L("dad", "Next problem. The groceries cost sixty dollars. Auntie Priya says her family will share the cost fairly.", mood="neutral", shot="close", prop="phone")
L("mum", "We have six people eating. Her family has four.", mood="neutral", shot="close")
L("dad", "So the ratio is six to four. We pay six dollars, they pay four dollars. Done. Very fair. Very generous of me.", mood="smug", shot="close")
L("tara", "Dad. That adds up to ten dollars. The groceries cost sixty.", mood="deadpan", shot="close")
L("dad", "Minor detail.", mood="smug", shot="close", gap=0.3)
poof("centi", 1040)
L("centi", "Sharing in a ratio. Step one. Simplify. Six to four is three to two.", mood="teach", shot="close",
  boardClear=True, board="Us : them = 6 : 4 = 3 : 2")
L("centi", "Step two. Add up the parts. Three plus two. Five parts altogether.", mood="teach", shot="close", board="3 + 2 = 5 parts")
L("tara", "Step three. Sixty dollars divided by five parts. That's twelve dollars per part.", mood="thinking", shot="close",
  boardClear=True, board="$60 ÷ 5 parts = $12 per part", diagram=BAR_MODEL)
L("tara", "So we pay three parts. Thirty six dollars. Auntie Priya pays two parts. Twenty four dollars.", mood="happy", shot="close",
  board="Us $36 + them $24 = $60 ✔")
L("centi", "And always check the shares add back to the total. Thirty six plus twenty four is sixty. Unlike your father's plan, which added up to a coffee.", mood="smug", shot="close")
L("dad", "So Auntie's family pays two thirds of the bill?", mood="thinking", shot="close")
L("centi", "No. Classic trap. They pay two parts out of FIVE parts. As a fraction of the whole bill, that's two fifths. Not two thirds.", mood="teach", shot="close",
  board="Them: 2 out of 5 parts = 2/5 (not 2/3!)")
L("tara", "Ratios compare part to part. Fractions compare part to whole.", mood="neutral", shot="close")
L("centi", "Exactly. Write that down. Or don't. I'm not your teacher. I'm a calculator with feelings.", mood="bored", shot="close", gap=0.4)

confess("dad", "VIKRAM RAO · Dad · Chief Financial Officer Of Nothing")
L("dad", "In my defence, six dollars and four dollars is a very clean split. It's just missing fifty dollars.", mood="smug")
L("dad", "Which, coincidentally, is also what happened to my Banana Coin.", mood="sad", gap=0.6)

# ---------------- ACT 3: BEST BUYS ----------------
card("MEANWHILE, AT THE SUPERMARKET", "Aisle seven: rice. Aisle eight: regret.", 2.4)
scene("checkout", [("mum", 300), ("tara", 560), ("cashier", 1000)])
L("mum", "Rice! Look, this one kilogram bag is on SUPER SALE. Only four dollars fifty!", mood="excited", shot="close")
L("cashier", "We also have two kilograms for eight dollars forty, and five kilograms for nineteen dollars fifty!", mood="excited", shot="close", boardClear=True)
L("mum", "Sale sticker wins. It's red. Red means cheap.", mood="smug", shot="close")
poof("centi", 790)
L("centi", "Red means someone in marketing got a bonus. Best buy. Find the price of ONE kilogram for each bag.", mood="teach", shot="close",
  board="Best buy: compare the price of 1 kg")
L("tara", "The sale bag. Four dollars fifty for one kilogram. So four fifty per kilogram.", mood="thinking", shot="close", board="1 kg bag: $4.50 per kg")
L("tara", "Two kilograms for eight forty. Divide by two. Four dollars twenty per kilogram.", mood="thinking", shot="close", board="2 kg bag: $8.40 ÷ 2 = $4.20 per kg")
L("tara", "Five kilograms for nineteen fifty. Divide by five. Three dollars ninety per kilogram!", mood="happy", shot="close", board="5 kg bag: $19.50 ÷ 5 = $3.90 per kg ✔")
L("centi", "So the sale bag is the WORST deal in the aisle. Cheapest sticker. Most expensive rice. Welcome to supermarkets.", mood="smug", shot="close")
L("mum", "But five kilograms? We only need seven hundred and fifty grams!", mood="shock", shot="close")
L("tara", "Then we eat biryani every night until Deepavali.", mood="deadpan", shot="close")
L("centi", "Best buy only counts if you actually use it. Otherwise the best buy is the one that doesn't grow weevils in your cupboard.", mood="bored", shot="close")
L("cashier", "Would you like a plastic bag? It's five cents.", mood="happy", shot="close")
L("mum", "Is that per kilogram?", mood="deadpan", shot="close")
L("cashier", "It's... per bag.", mood="worried", shot="close", gap=0.4)

# ---------------- RECAP ----------------
confess("centi", "CENTI · Recap Monster · Speaking Slowly For Dad")
L("centi", "Recap. For anyone eating biryani right now. First. Scaling a recipe? Multiply. Never add.", mood="teach",
  boardClear=True, board="1. Scale recipes by MULTIPLYING")
L("centi", "Second. The unitary method. Find the amount for one, then multiply up.", mood="teach", board="2. Unitary: find ONE, then multiply")
L("centi", "Third. Sharing in a ratio. Add the parts, find one part, then multiply.", mood="teach", board="3. Share: add parts → 1 part → multiply")
L("centi", "Fourth. A ratio of two to three means two fifths and three fifths of the whole. Not two thirds.", mood="teach", board="4. 2 : 3 → 2/5 and 3/5 of the whole")
L("centi", "And finally. Best buys. Compare the price of one kilogram. Not the colour of the sticker.", mood="smug", board="5. Best buy: compare price per kg", gap=0.5)

scene("living", [("tara", 260), ("mum", 560), ("dad", 840)])
L("mum", "The aunties said it was the best biryani ever!", mood="happy", shot="close")
L("dad", "That's because of my contribution.", mood="smug", shot="close")
L("tara", "Your contribution was eight onions in a plan we didn't use.", mood="deadpan", shot="close")
L("dad", "Ten aunties. Ten compliments. That's a one to one compliment ratio. Simplified.", mood="smug", shot="close")
L("tara", "That's... the first ratio you've got right all week.", mood="shock", shot="close")
L("dad", "I'll take it.", mood="smug", shot="close")
sfx("ding")
L("centi", "Somebody put me back in the drawer. The ratio of me to this family is one to too many.", mood="bored", shot="wide", offstage=True, gap=0.8)

# ---------------- PAUSE CHALLENGE ----------------
card("PAUSE CHALLENGE", "Centi gives you 5 seconds. Then he gets smug.", 3.0)
challenge(1, "A recipe for 4 people uses 200 g of paneer. How much for 6 people?", "300 g",
  "200 ÷ 4 = 50 g each    50 × 6 = 300 g",
  "Question one. A recipe for four people uses two hundred grams of paneer. How much paneer for six people?",
  "Three hundred grams. Two hundred divided by four is fifty grams each. Fifty times six. Three hundred. Not two hundred and two. I see you, Dad.")
challenge(2, "Share $45 in the ratio 4 : 5. How big is the larger share?", "$25",
  "4 + 5 = 9 parts    45 ÷ 9 = 5    5 × 5 = 25",
  "Question two. Share forty five dollars in the ratio four to five. How big is the larger share?",
  "Twenty five dollars. Nine parts. Forty five divided by nine is five dollars per part. Five parts times five dollars. Twenty five.")
challenge(3, "Rice: 3 kg for $11.40 or 5 kg for $18.50. Which is the better buy?", "5 kg bag",
  "11.40 ÷ 3 = $3.80/kg    18.50 ÷ 5 = $3.70/kg",
  "Question three. Rice costs eleven dollars forty for three kilograms, or eighteen dollars fifty for five kilograms. Which is the better buy?",
  "The five kilogram bag. Three dollars seventy per kilogram, against three dollars eighty. Ten cents a kilogram. Small, but your mum would fight a stranger for it.")
end_card()
