# "Totally Raotional" S01E08 "Are We There Yet, Per Hour" (Topic: Measures, Units & Rates)
# Format and helpers: see common.py; check with lint_episode.py.

EP = dict(topic="rates-units")

TRIANGLE = (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 200">'
    '<polygon points="260,15 400,185 120,185" fill="none" stroke="#fde047" stroke-width="4"/>'
    '<line x1="190" y1="100" x2="330" y2="100" stroke="#fde047" stroke-width="3"/>'
    '<line x1="260" y1="100" x2="260" y2="185" stroke="#fde047" stroke-width="3"/>'
    '<text x="260" y="85" text-anchor="middle" font-family="sans-serif" font-size="34" fill="#f8fafc">D</text>'
    '<text x="215" y="160" text-anchor="middle" font-family="sans-serif" font-size="30" fill="#86efac">S</text>'
    '<text x="305" y="160" text-anchor="middle" font-family="sans-serif" font-size="30" fill="#7dd3fc">T</text>'
    '<text x="10" y="70" font-family="sans-serif" font-size="20" fill="#86efac">S = D ÷ T</text>'
    '<text x="10" y="110" font-family="sans-serif" font-size="20" fill="#7dd3fc">T = D ÷ S</text>'
    '<text x="10" y="150" font-family="sans-serif" font-size="20" fill="#f8fafc">D = S × T</text>'
    '<text x="415" y="110" font-family="sans-serif" font-size="18" fill="#c4b5fd">cover the</text>'
    '<text x="415" y="134" font-family="sans-serif" font-size="18" fill="#c4b5fd">one you want</text>'
    '</svg>'
)

AREA = (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 210">'
    '<rect x="40" y="20" width="160" height="160" fill="none" stroke="#fde047" stroke-width="4"/>'
    '<line x1="40" y1="60" x2="200" y2="60" stroke="#c4b5fd" stroke-width="1"/>'
    '<line x1="40" y1="100" x2="200" y2="100" stroke="#c4b5fd" stroke-width="1"/>'
    '<line x1="40" y1="140" x2="200" y2="140" stroke="#c4b5fd" stroke-width="1"/>'
    '<line x1="80" y1="20" x2="80" y2="180" stroke="#c4b5fd" stroke-width="1"/>'
    '<line x1="120" y1="20" x2="120" y2="180" stroke="#c4b5fd" stroke-width="1"/>'
    '<line x1="160" y1="20" x2="160" y2="180" stroke="#c4b5fd" stroke-width="1"/>'
    '<text x="120" y="203" text-anchor="middle" font-family="sans-serif" font-size="20" fill="#f8fafc">1 m = 100 cm</text>'
    '<text x="215" y="105" font-family="sans-serif" font-size="20" fill="#f8fafc">100 cm</text>'
    '<text x="300" y="80" font-family="sans-serif" font-size="22" fill="#86efac">1 m² = 100 × 100</text>'
    '<text x="300" y="115" font-family="sans-serif" font-size="22" fill="#86efac">= 10 000 cm²</text>'
    '<text x="300" y="155" font-family="sans-serif" font-size="20" fill="#fca5a5">not 100 cm²!</text>'
    '</svg>'
)

# ---------------- COLD OPEN ----------------
scene("living", [("tara", 260), ("mum", 560), ("dad", 860)])
L("dad", "Family. Road trip. Malacca. Two hundred and forty kilometres. I've done the maths. Two hours. Tops.", mood="smug", shot="close", prop="map")
L("mum", "Two hours? Last time it took five.", mood="annoyed", shot="close")
L("dad", "Last time there was a jam at the Causeway. This time I have a strategy.", mood="smug", shot="close")
L("tara", "What's the strategy?", mood="deadpan", shot="close")
L("dad", "Leaving at seven. Before the jam wakes up.", mood="smug", shot="close")
L("tara", "The jam doesn't sleep, Dad. The jam is eternal.", mood="deadpan", shot="close", gap=0.4)
confess("tara", "TARA RAO · 12 · Professional Back Seat Passenger")
L("tara", "Last time Dad said two hours, it took five. He blamed the traffic, the car, the weather, and at one point, the moon.", mood="deadpan")
L("tara", "I've packed snacks, a charger, and a calculator. One of those is for emergencies. It's the calculator.", mood="deadpan", gap=0.6)

title()

# ---------------- ACT 1: SPEED, DISTANCE, TIME ----------------
card("TWO HOURS LATER", "A rest stop. Still very much in Malaysia.", 2.4)
scene("park", [("tara", 300), ("dad", 620)])
L("dad", "Status report. We've done one hundred and fifty kilometres in two hours. Now, speed is time divided by distance.", mood="thinking", shot="close", prop="phone")
L("dad", "Two divided by one hundred and fifty. We are travelling at about zero point zero one three kilometres per hour.", mood="shock", shot="close")
L("tara", "So a snail just overtook us.", mood="deadpan", shot="close")
sfx("drawer")
poof("centi", 940)
L("centi", "You brought me on holiday? I didn't even pack my other ninety eyes. Fine. Speed is distance divided by time. Not the other way round.", mood="bored", shot="close",
  boardClear=True, board="Speed = distance ÷ time")
L("centi", "Use the triangle. Distance on top. Speed and time on the bottom. Cover up the one you want, and the triangle tells you what to do.", mood="teach", shot="close",
  diagram=TRIANGLE)
L("tara", "One hundred and fifty kilometres, divided by two hours. Seventy five kilometres per hour.", mood="thinking", shot="close", board="150 km ÷ 2 h = 75 km/h")
L("centi", "Per hour means divided by hours. The units literally tell you the method. They are begging you.", mood="smug", shot="close", gap=0.3)
L("dad", "Okay. The app says ninety kilometres left, at sixty kilometres per hour. That's one point five hours.", mood="neutral", shot="close", prop="phone",
  boardClear=True, board="T = D ÷ S = 90 ÷ 60 = 1.5 h")
L("dad", "So one hour fifty minutes. Plus our half hour roti break. We'll arrive at eleven twenty.", mood="smug", shot="close")
sfx("buzzer")
L("centi", "No. Point five of an hour is half an hour. Thirty minutes. Hours have sixty minutes, not one hundred. Time is not a decimal number system.", mood="eyeroll", shot="close",
  board="1.5 h = 1 h 30 min (not 1 h 50!)")
L("tara", "To change the decimal part to minutes, multiply by sixty. Zero point five times sixty is thirty. Zero point two five hours would be fifteen minutes.", mood="teach", shot="close",
  board="0.25 h × 60 = 15 min")
L("centi", "So you'll arrive at eleven. Which matters, because your mother booked lunch for eleven fifteen. And she will not be late for food.", mood="bored", shot="close", gap=0.4)

confess("centi", "CENTI · 100 Eyes · Gets Carsick In 100 Ways")
L("centi", "I don't do road trips. When I get carsick, it's every eye at once. It's like a light show, but sad.", mood="bored")
L("centi", "My aunt Kilo is a thousand times bigger than me. She doesn't travel either. She just IS the destination.", mood="bored", gap=0.5)

# ---------------- ACT 2: AVERAGE SPEED + UNITS ----------------
card("ELEVEN O'CLOCK", "Malacca. Lunch is in fifteen minutes. Mum is calm-ish.", 2.4)
scene("park", [("tara", 260), ("mum", 540), ("dad", 820)])
L("mum", "We made it! So what was our average speed for the whole trip?", mood="happy", shot="close")
L("dad", "Easy. Seventy five for the first part, sixty for the second part. Average of the two. Sixty seven point five kilometres per hour.", mood="smug", shot="close")
L("tara", "That sounds right, but it feels wrong.", mood="thinking", shot="close")
poof("centi", 1060)
L("centi", "Because it IS wrong. You can't average the speeds. Average speed is total distance divided by total time. The whole journey. Including that roti stop.", mood="teach", shot="close",
  boardClear=True, board="Average speed = TOTAL distance ÷ TOTAL time")
L("tara", "Total distance, two hundred and forty kilometres. Total time, two hours, plus half an hour stopped, plus one and a half hours. Four hours.", mood="thinking", shot="close",
  board="2 h + 0.5 h + 1.5 h = 4 h")
L("tara", "Two hundred and forty divided by four. Sixty kilometres per hour.", mood="happy", shot="close", board="240 km ÷ 4 h = 60 km/h ✔")
L("centi", "Sixty. Not sixty seven point five. The roti cost you seven and a half kilometres per hour. Worth it, honestly.", mood="smug", shot="close")
L("dad", "Fine. But my top speed was ninety kilometres per hour. That's ninety metres per second. Basically a racing car.", mood="smug", shot="close")
L("centi", "Wonderful. Kilometres per hour into metres per second. A kilometre is a thousand metres. An hour is three thousand six hundred seconds.", mood="teach", shot="close",
  boardClear=True, board="1 km = 1000 m     1 h = 3600 s")
L("tara", "So ninety kilometres per hour is ninety thousand metres in three thousand six hundred seconds. That's twenty five metres per second.", mood="thinking", shot="close",
  board="90 × 1000 ÷ 3600 = 25 m/s")
L("centi", "Shortcut. Divide by three point six. Ninety metres per second would be over three hundred kilometres per hour. That's not driving, that's take off.", mood="smug", shot="close",
  board="Shortcut: km/h ÷ 3.6 = m/s")
L("mum", "Your father once got a speeding ticket. On a bicycle.", mood="deadpan", shot="two")
L("dad", "It was a very fast bicycle.", mood="smug", shot="close", gap=0.4)

confess("dad", "VIKRAM RAO · Dad · Self-Appointed Navigator")
L("dad", "People say I'm bad with time. I'm not bad with time. Time is bad with me.", mood="smug")
L("dad", "Also, I would like it noted, we arrived at eleven. Exactly as the snail predicted.", mood="sad", gap=0.6)

# ---------------- ACT 3: AREA UNITS ----------------
card("AFTER LUNCH", "Mum has found a shop. Of course she has.", 2.2)
scene("mall", [("mum", 330), ("tara", 640)])
L("mum", "A Cushion Kingdom! In Malacca! It's like a sign!", mood="excited", shot="close")
L("tara", "It's literally a sign. It's on the building.", mood="deadpan", shot="close")
L("mum", "This tablecloth is two square metres. That's only two hundred square centimetres. It'll fit our table easily!", mood="happy", shot="close", prop="book")
poof("centi", 960)
L("centi", "Trap. One metre is one hundred centimetres. But a square metre is a square. One hundred centimetres ACROSS, and one hundred centimetres DOWN.", mood="teach", shot="close",
  boardClear=True, diagram=AREA)
L("tara", "So one square metre is one hundred times one hundred. Ten thousand square centimetres!", mood="shock", shot="close", board="1 m² = 10 000 cm²")
L("mum", "Then two square metres is...", mood="thinking", shot="close")
L("tara", "Twenty thousand square centimetres. Not two hundred. That's not a tablecloth. That's a small tent.", mood="deadpan", shot="close", board="2 m² = 20 000 cm²")
L("centi", "Lengths convert once. Areas convert twice, because there are two directions. Volumes convert three times. Be suspicious of any area that changes by a hundred.", mood="smug", shot="close")
L("mum", "Fine. I'll buy it anyway. It's a tent now. For family camping.", mood="smug", shot="close")
L("tara", "We've never been camping.", mood="deadpan", shot="close")
L("mum", "We've never had a tent.", mood="smug", shot="close", gap=0.4)

# ---------------- RECAP ----------------
confess("centi", "CENTI · Recap Monster · Wants To Go Home")
L("centi", "Recap. For anyone eating in a car right now. First. Speed equals distance divided by time. Use the triangle.", mood="teach",
  boardClear=True, board="1. Speed = distance ÷ time")
L("centi", "Second. Decimal hours are not minutes. Multiply the decimal part by sixty. Zero point five hours is thirty minutes.", mood="teach",
  board="2. 0.5 h = 30 min (× 60)")
L("centi", "Third. Average speed is total distance over total time. Never just average the speeds.", mood="teach", board="3. Average speed = total D ÷ total T")
L("centi", "Fourth. Kilometres per hour to metres per second. Divide by three point six.", mood="teach", board="4. km/h ÷ 3.6 = m/s")
L("centi", "And finally. One square metre is ten thousand square centimetres. Not one hundred.", mood="smug", board="5. 1 m² = 10 000 cm²", gap=0.5)

scene("living", [("tara", 260), ("mum", 560), ("dad", 840)])
L("dad", "Great trip. Next weekend, let's drive to Kuala Lumpur. Three hundred and fifty kilometres. I've done the maths. Two hours.", mood="smug", shot="close")
L("tara", "That's one hundred and seventy five kilometres per hour, Dad.", mood="deadpan", shot="close")
L("mum", "On the bicycle?", mood="deadpan", shot="close")
L("dad", "...Three hours.", mood="sad", shot="close")
sfx("ding")
L("centi", "Wake me when we're there. Which, at your father's speed, is never.", mood="bored", shot="wide", offstage=True, gap=0.8)

# ---------------- PAUSE CHALLENGE ----------------
card("PAUSE CHALLENGE", "Centi gives you 5 seconds. Then he gets smug.", 3.0)
challenge(1, "A train travels 150 km in 2.5 hours. What is its average speed?", "60 km/h",
  "S = D ÷ T = 150 ÷ 2.5 = 60 km/h",
  "Question one. A train travels one hundred and fifty kilometres in two and a half hours. What is its average speed?",
  "Sixty kilometres per hour. One hundred and fifty divided by two point five. Distance on top, time underneath. The triangle never lies. Unlike your father's estimates.")
challenge(2, "Write 2.4 hours in hours and minutes.", "2 h 24 min",
  "0.4 × 60 = 24 minutes",
  "Question two. Write two point four hours in hours and minutes.",
  "Two hours and twenty four minutes. Zero point four times sixty is twenty four. If you said two hours forty, go and sit in the car with Dad.")
challenge(3, "Convert 54 km/h into metres per second.", "15 m/s",
  "54 ÷ 3.6 = 15 m/s",
  "Question three. Convert fifty four kilometres per hour into metres per second.",
  "Fifteen metres per second. Fifty four divided by three point six. Or fifty four thousand metres, divided by three thousand six hundred seconds. Same answer, more typing.")
end_card()
