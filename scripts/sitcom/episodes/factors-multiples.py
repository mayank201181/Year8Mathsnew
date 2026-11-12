# "Totally Raotional" S01E02 "The Prime Suspect" (Topic: Factors, Multiples & Primes)
# Format and helpers: see common.py; check with lint_episode.py.

EP = dict(topic="factors-multiples", logline='Mum needs identical Deepavali goody bags and the buses never arrive together. Prime factor trees, HCF and LCM to the rescue.')

VENN = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 220">'
        '<circle cx="200" cy="115" r="95" fill="none" stroke="#7dd3fc" stroke-width="3"/>'
        '<circle cx="320" cy="115" r="95" fill="none" stroke="#fca5a5" stroke-width="3"/>'
        '<text x="120" y="22" fill="#7dd3fc" font-family="sans-serif" font-size="22" text-anchor="middle">24</text>'
        '<text x="400" y="22" fill="#fca5a5" font-family="sans-serif" font-size="22" text-anchor="middle">36</text>'
        '<text x="150" y="125" fill="#f8fafc" font-family="sans-serif" font-size="26" text-anchor="middle">2</text>'
        '<text x="260" y="95" fill="#fde047" font-family="sans-serif" font-size="26" text-anchor="middle">2</text>'
        '<text x="260" y="125" fill="#fde047" font-family="sans-serif" font-size="26" text-anchor="middle">2</text>'
        '<text x="260" y="155" fill="#fde047" font-family="sans-serif" font-size="26" text-anchor="middle">3</text>'
        '<text x="370" y="125" fill="#f8fafc" font-family="sans-serif" font-size="26" text-anchor="middle">3</text>'
        '<text x="260" y="212" fill="#fde047" font-family="sans-serif" font-size="18" text-anchor="middle">overlap = HCF</text>'
        '</svg>')

# ---------------- COLD OPEN ----------------
scene("kitchen", [("mum", 300), ("dad", 640)])
L("mum", "Deepavali goody bags! I have twenty four ladoos and thirty six packets of murukku. Every bag must be identical, nothing left over, and as many bags as possible.", mood="excited", shot="close")
L("dad", "Easy. Twenty four plus thirty six. Sixty bags, one snack each!", mood="smug", shot="close")
L("mum", "Identical, Vikram. A bag with one ladoo is not identical to a bag with one murukku.", mood="annoyed", shot="close")
L("dad", "Then one bag. With everything in it. For Mrs Tan next door. She's very nice.", mood="smug", shot="close")
scene("kitchen", [("mum", 260), ("dad", 560), ("tara", 860)])
L("tara", "That is the least festive maths I have ever heard.", mood="deadpan", shot="close")
L("dad", "It's efficient. One neighbour, maximum happiness. Basic economics.", mood="smug", shot="close", gap=0.4)
confess("mum", "ANJALI RAO · Mum · Festival Logistics Commander")
L("mum", "Every Deepavali I make goody bags for the whole block. Every Deepavali my husband helps.", mood="neutral")
L("mum", "Every Deepavali, I regret it.", mood="deadpan", gap=0.6)

title()

# ---------------- ACT 1: PRIMES ----------------
scene("kitchen", [("mum", 260), ("tara", 560)])
L("tara", "We need factors. And a calculator with attitude.", mood="determined", shot="close")
sfx("drawer")
poof("centi", 900)
L("centi", "Detective Centi. Prime Crimes Division. Imagine I'm wearing a hat. I have a hundred eyes, so sunglasses are out.", mood="smug", shot="close")
L("centi", "First, the suspects. A prime number has exactly two factors. One, and itself. No more, no less.", mood="teach", shot="close",
  boardClear=True, board="PRIME = exactly 2 factors: 1 and itself")
L("mum", "So one is prime! It's only divisible by one and itself.", mood="excited", shot="close")
L("centi", "One and itself are the same person. That's one factor. One is not prime. One is not even in the club. One waits outside the club. Alone.", mood="bored", shot="close",
  board="1 is NOT prime (only 1 factor)")
L("centi", "Next suspect. Two. The only even prime. Every other even number has a factor of two. Busted.", mood="teach", shot="close",
  board="2 = the only even prime")
L("tara", "Fifty one looks prime. It's odd, it doesn't end in five.", mood="thinking", shot="close")
L("centi", "Classic disguise. Add its digits. Five plus one is six, and six is in the three times table. So three is a factor. Fifty one is three times seventeen. Not prime. Arrest it.", mood="teach", shot="close",
  board="51: 5 + 1 = 6 → ÷3 ✔  51 = 3 × 17")
L("tara", "Ninety one?", mood="thinking", shot="close")
L("centi", "Seven times thirteen. Master of disguise. Ninety seven, though? Genuinely prime. The only honest number in this kitchen.", mood="smug", shot="close",
  board="91 = 7 × 13      97 is prime ✔")
sfx("ding")

# ---------------- ACT 2: PRIME FACTORS & HCF ----------------
L("centi", "Now the goody bags. Break each number into primes. A factor tree. Twenty four is two times twelve, twelve is two times six, six is two times three.", mood="teach", shot="close",
  boardClear=True, board="24 = 2 × 2 × 2 × 3 = 2³ × 3")
L("tara", "And thirty six is two times eighteen, eighteen is two times nine, nine is three times three. Two squared times three squared.", mood="thinking", shot="close",
  board="36 = 2 × 2 × 3 × 3 = 2² × 3²")
L("centi", "Put them in a Venn diagram. The primes they share go in the middle. Two, two and three.", mood="teach", shot="close",
  boardClear=True, board="Shared primes go in the middle", diagram=VENN)
L("tara", "Two times two times three is twelve. So the highest common factor is twelve!", mood="excited", shot="close", board="HCF = 2 × 2 × 3 = 12")
L("mum", "Twelve bags! Each with two ladoos and three murukku. Twelve neighbours made happy!", mood="happy", shot="close", board="24 ÷ 12 = 2 ladoos   36 ÷ 12 = 3 murukku")
L("centi", "And if you multiply everything in the whole Venn diagram, you get the lowest common multiple. Two, two, two, three, three. Seventy two. Hold that thought.", mood="teach", shot="close",
  gap=0.4)

confess("centi", "CENTI · Calculator Monster · Prime Suspect Expert")
L("centi", "My family are all numbers. My brother Dozen is twelve. Very factorable. Everyone can split him. Ones, twos, threes, fours, sixes.", mood="bored")
L("centi", "My uncle Seventeen is prime. Nobody can split him. He doesn't get invited to group projects.", mood="bored", gap=0.5)

# ---------------- ACT 3: LCM AT THE BUS STOP ----------------
card("SATURDAY, AT THE BUS STOP", "Population: one impatient dad", 2.4)
scene("park", [("dad", 300), ("tara", 620), ("centi", 940)])
L("dad", "The number twelve bus comes every twelve minutes. The number eighteen bus comes every eighteen minutes. They both just left together. When do they next leave together?", mood="thinking", shot="close", prop="phone")
L("dad", "Easy. Twelve times eighteen. Two hundred and sixteen minutes. I'll get a kopi. Three kopis.", mood="smug", shot="close")
L("tara", "That's a common multiple. It's just not the first one. You'd be waiting over three hours for no reason.", mood="deadpan", shot="close")
L("centi", "We want the lowest common multiple. List the multiples. Twelve, twenty four, thirty six. Eighteen, thirty six. First match?", mood="teach", shot="close",
  boardClear=True, board="12: 12, 24, 36, 48 …")
L("tara", "Thirty six. They leave together again in thirty six minutes!", mood="excited", shot="close", board="18: 18, 36 …     LCM = 36 ✔")
L("centi", "Or the Venn way. Twelve is two squared times three. Eighteen is two times three squared. Multiply everything in the diagram. Two, two, three, three. Thirty six.", mood="teach", shot="close",
  board="12 = 2² × 3    18 = 2 × 3²  → LCM 36")
L("centi", "Bonus fact. The highest common factor, times the lowest common multiple, equals the two numbers multiplied together. Six times thirty six is twelve times eighteen. Both two hundred and sixteen.", mood="smug", shot="close",
  board="HCF × LCM = 6 × 36 = 12 × 18 = 216")
L("dad", "So my answer was in there somewhere!", mood="excited", shot="close")
L("tara", "Your answer is always in there somewhere, Dad. Buried under a lot of other stuff.", mood="deadpan", shot="two")
L("centi", "How to tell which one you need. Splitting things into equal groups, the biggest possible? Highest common factor. Things meeting up again? Lowest common multiple.", mood="teach", shot="close",
  boardClear=True, board="SPLIT into groups → HCF (smaller)")
L("tara", "Goody bags, split. Buses, meet again. Got it.", mood="happy", shot="close", board="MEET again → LCM (bigger)")
sfx("ding")

confess("dad", "VIKRAM RAO · Dad · Waited 216 Minutes Once, On Principle")
L("dad", "I would like to state, for the record, that two hundred and sixteen minutes is a common multiple. It is correct.", mood="smug")
L("dad", "It's just not the least one. I don't believe in least. I'm a most kind of guy.", mood="smug", gap=0.6)

confess("centi", "CENTI · Recap Monster · Speaking Slowly For Dad")
L("centi", "Recap. For anyone eating murukku. First. A prime has exactly two factors. One is not prime. Two is the only even prime.", mood="teach",
  boardClear=True, board="1. Prime = exactly 2 factors")
L("centi", "Second. Divisibility tests are your detectives. If the digits add to a multiple of three, three is a factor.", mood="teach", board="2. Digit sum in 3 times table → ÷3")
L("centi", "Third. Factor trees break any number into primes. Write the answer with powers.", mood="teach", board="3. 24 = 2³ × 3")
L("centi", "Fourth. Splitting into the biggest equal groups? Highest common factor. Meeting again? Lowest common multiple.", mood="teach", board="4. Split → HCF     Meet → LCM")
L("centi", "And finally. The middle of the Venn diagram gives the highest common factor. The whole diagram gives the lowest common multiple.", mood="smug", board="5. Middle = HCF   Everything = LCM", gap=0.5)

scene("living", [("tara", 260), ("mum", 560), ("dad", 860)])
L("mum", "Twelve beautiful goody bags. But there are thirteen flats on our floor!", mood="worried", shot="close", prop="plate")
L("tara", "Thirteen is prime. Nobody is splitting anything into thirteen identical bags.", mood="deadpan", shot="close")
L("dad", "Then we skip one flat. I suggest Mrs Tan.", mood="smug", shot="close")
L("mum", "An hour ago you wanted to give everything to Mrs Tan!", mood="annoyed", shot="close")
L("dad", "That was a different Vikram. That Vikram didn't know about primes.", mood="smug", shot="close")
sfx("ding")
L("centi", "Thirteen. Prime. Indivisible. Just like my desire to go back in the drawer.", mood="bored", shot="wide", offstage=True, gap=0.8)

# ---------------- PAUSE CHALLENGE ----------------
card("PAUSE CHALLENGE", "Centi gives you 5 seconds. Then he gets smug.", 3.0)
challenge(1, "Is 87 a prime number?", "NO", "8 + 7 = 15 → ÷3 ✔   87 = 3 × 29",
  "Question one. Is eighty seven a prime number?",
  "No. Its digits add up to fifteen, which is in the three times table. So eighty seven is three times twenty nine. Sneaky.")
challenge(2, "Write 60 as a product of primes.", "2² × 3 × 5", "60 = 2 × 2 × 3 × 5",
  "Question two. Write sixty as a product of prime factors.",
  "Two squared, times three, times five. Two times two times three times five is sixty.")
challenge(3, "Lights flash every 8 s and every 12 s. They flash together now. Next time together?", "24 s", "LCM(8, 12) = 24",
  "Question three. One light flashes every eight seconds. Another flashes every twelve seconds. They flash together now. When do they next flash together?",
  "Twenty four seconds. Meeting again means lowest common multiple. If you said ninety six, that's eight times twelve. Common, yes. Least, no. You've been hanging around Dad.")
end_card()
