# "Totally Raotional" — S01E01 "Seventy Percent Off My Patience"  (Topic: Percentages)
# Each beat is a dict. Types:
#  scene: {id, cast: [(who, x)], caption?}   -> sets location + who's on stage (x in 0..1280)
#  line:  {who, text, mood?, shot?, moods?, board?, boardClear?, speed?, gap?, look?}
#  sfx:   {name, gap?}
#  freeze:{text, dur, sfx}
#  title: {title, sub, dur}
#  poof:  {who, x}         -> character appears in a puff
#  card:  {text, sub, dur} -> full-screen text card
#  challenge: {n, q, a, work}

VOICES = {
    "tara":    dict(voice="af_heart", speed=1.06, lang="en-us"),
    "mum":     dict(voice="bf_emma", speed=1.08, lang="en-gb"),
    "dad":     dict(voice="bm_george", speed=1.0, lang="en-gb"),
    "centi":   dict(voice="am_fenrir", speed=0.95, lang="en-us", pitch=-2.5),
    "cashier": dict(voice="am_puck", speed=1.12, lang="en-us"),
}

B = []
def scene(id, cast, caption=None): B.append(dict(type="scene", id=id, cast=cast, caption=caption))
def L(who, text, **kw): B.append(dict(type="line", who=who, text=text, **kw))
def sfx(name, gap=0.0): B.append(dict(type="sfx", name=name, gap=gap))
def freeze(text, dur=2.6, s="scratch"): B.append(dict(type="freeze", text=text, dur=dur, sfx=s))
def title(t, sub, dur=5.0): B.append(dict(type="title", title=t, sub=sub, dur=dur))
def poof(who, x): B.append(dict(type="poof", who=who, x=x))
def card(text, sub="", dur=2.5): B.append(dict(type="card", text=text, sub=sub, dur=dur))
def challenge(n, q, a, work, qs, as_): B.append(dict(type="challenge", n=n, q=q, a=a, work=work, qs=qs, as_=as_))
def confess(who, caption): scene("confess_" + who, [(who, 640)], caption)

# ---------------- COLD OPEN ----------------
scene("living", [("tara", 300), ("mum", 760)])
L("mum", "Everyone! Great Singapore Sale! Seventy percent off at Cushion Kingdom!", mood="excited", shot="close", prop="phone")
L("tara", "Mum. We have fourteen cushions. The sofa is ninety percent cushion. We sit on the floor now.", mood="deadpan", shot="close")
L("mum", "Ninety percent? Don't exaggerate.", mood="annoyed", shot="two")
L("tara", "You're right. It's ninety three. I counted.", mood="deadpan", shot="close", gap=0.5)
scene("living", [("tara", 260), ("mum", 600), ("dad", 980)])
sfx("door")
L("dad", "Family. Big news. My stock, Banana Coin, went UP fifty percent on Monday.", mood="smug", shot="close", prop="tablet")
L("mum", "Ooh!", mood="excited", shot="wide")
L("dad", "And then DOWN fifty percent on Tuesday. So, net net, I'm exactly where I started. Plus fifty, minus fifty. Zero. Basic maths.", mood="smug", shot="close")
freeze("\"BASIC MATHS.\"", 2.4)
confess("tara", "TARA RAO · 12 · Only Sane Person In This House")
L("tara", "Basic maths. He said basic maths. My father manages money. Other people's money.", mood="deadpan")
L("tara", "Sleep well, Singapore.", mood="deadpan", gap=0.6)

title("TOTALLY RAOTIONAL", "Episode 1 · “Seventy Percent Off My Patience”")

# ---------------- ACT 1: CENTI ----------------
scene("kitchen", [("tara", 380)])
L("tara", "Okay. Emergency. Time to wake up the calculator.", mood="determined", shot="wide")
sfx("drawer")
poof("centi", 820)
L("centi", "Who disturbs my nap. Oh. It's you. What's the emergency? Did somebody divide by zero again?", mood="bored", shot="close")
L("tara", "Worse. Dad thinks plus fifty percent and minus fifty percent cancel out.", mood="worried", shot="two")
L("centi", "Wonderful. I have one hundred eyes. And I would like to roll all of them.", mood="eyeroll", shot="close", gap=0.4)

confess("centi", "CENTI · Calculator Monster · Has 100 Eyes · Hates Rounding Errors")
L("centi", "Hi. I'm Centi. I have a hundred eyes. Per cent means per hundred. Centi. Hundred. Yes, my parents were very lazy with names.", mood="bored")
L("centi", "My brother is called Dozen. My cousin Milli has a thousand eyes. She can't watch TV. Too much.", mood="bored", gap=0.5)

scene("kitchen", [("tara", 380), ("centi", 860)])
L("centi", "Rule number one. Percent means, out of a hundred. Fifty percent is fifty out of every hundred. A half. Now, quick. Ten percent of eighty dollars.", mood="teach", shot="close",
  boardClear=True, board="Percent = out of 100")
L("tara", "Divide by ten. Eight dollars.", mood="neutral", shot="close", board="10% of $80 = $80 ÷ 10 = $8")
L("centi", "Correct. Five percent is half of that. So, thirty five percent of eighty?", mood="teach", shot="close", board="5% = half of 10% = $4")
L("tara", "Three lots of ten percent is twenty four. Plus five percent, which is four. Twenty eight dollars.", mood="happy", shot="close", board="35% = 3 × $8 + $4 = $28 ✔")
L("centi", "Look at you. Building percentages out of Lego blocks. Your father would just guess.", mood="smug", shot="two", gap=0.4)

L("centi", "Now the grown up tool. Multipliers. Going UP fifty percent means you keep the whole thing, a hundred percent, and add fifty. A hundred and fifty percent. Times one point five.", mood="teach", shot="close",
  boardClear=True, board="UP 50%  →  150%  →  × 1.5")
L("centi", "Going DOWN fifty percent means you keep fifty percent. Times zero point five.", mood="teach", shot="close", board="DOWN 50%  →  50%  →  × 0.5")
L("tara", "So Dad's stock is times one point five, then times zero point five. That's times zero point seven five.", mood="thinking", shot="close", board="× 1.5 × 0.5 = × 0.75")
L("tara", "He's lost a QUARTER of his money!", mood="shock", shot="close", board="$100 → $150 → $75   (− 25%!)")
sfx("trombone")
L("centi", "Twenty five percent. Gone. Poof. Like my will to live.", mood="bored", shot="close", gap=0.3)
L("centi", "Here's the trap. Up fifty was fifty percent of one hundred. Down fifty was fifty percent of one hundred and fifty. Different hundreds! Every percentage secretly asks one question. Percent... of WHAT?", mood="teach", shot="close",
  board="ALWAYS ASK: percent OF WHAT?")

confess("dad", "VIKRAM RAO · Dad · Self-Described Financial Genius")
L("dad", "I would like to clarify. I did not lose twenty five percent. I invested in a learning experience.", mood="smug")
L("dad", "And that learning experience is now worth... seventy five percent of what it was.", mood="sad", gap=0.6)

# ---------------- ACT 2: THE MALL ----------------
card("MEANWHILE, AT CUSHION KINGDOM", "Population: too many cushions", 2.4)
scene("mall", [("mum", 330), ("tara", 640)])
L("mum", "Look! Thirty percent off, PLUS an extra twenty percent off! That's fifty percent off! Half price! It's basically free!", mood="excited", shot="close")
L("tara", "Half price is not free, Mum. That's not how... anything works.", mood="deadpan", shot="close")
poof("centi", 980)
L("centi", "Multipliers, please.", mood="bored", shot="close", boardClear=True)
L("tara", "Thirty percent off means you keep seventy. Times zero point seven. Extra twenty off means keep eighty. Times zero point eight.", mood="thinking", shot="close",
  board="30% off → × 0.7     20% off → × 0.8")
L("tara", "Zero point seven times zero point eight is zero point five six.", mood="thinking", shot="close", board="× 0.7 × 0.8 = × 0.56")
L("centi", "So you pay fifty six percent. Which means the discount is...", mood="teach", shot="close")
L("tara", "Forty four percent. Not fifty.", mood="happy", shot="close", board="Discount = 44%  (NOT 50%)")
L("mum", "Six percent! They stole six percent from me!", mood="shock", shot="close")
L("centi", "Nobody stole anything. You ADDED percentages. Percentages don't add. They multiply. Write that on a cushion. You clearly have room.", mood="eyeroll", shot="close",
  board="Percentages don't ADD.  They MULTIPLY.")

scene("checkout", [("mum", 300), ("tara", 560), ("cashier", 1000)])
L("cashier", "Great choice! This cushion is now only sixty three dollars, after thirty percent off!", mood="excited", shot="close", boardClear=True)
L("mum", "So what was it originally? Sixty three, plus thirty percent of sixty three... eighty one dollars ninety.", mood="thinking", shot="close", board="63 + 30% of 63 = 81.90 ???")
sfx("buzzer")
poof("centi", 790)
L("centi", "Nope. Classic trap. The thirty percent came off the ORIGINAL price. Not off sixty three. Sixty three is what's LEFT. It's seventy percent of the original.", mood="teach", shot="close",
  board="Original × 0.7 = $63")
L("tara", "So seventy percent is sixty three. One percent is sixty three divided by seventy, zero point nine. A hundred percent is ninety. It was ninety dollars!", mood="happy", shot="close",
  board="1% = 63 ÷ 70 = 0.9   →  100% = $90")
L("centi", "Or the fast way. Divide by the multiplier. Sixty three, divided by zero point seven... is ninety. Going backwards? Divide. Never just add the percent back on.", mood="teach", shot="close",
  board="Backwards: 63 ÷ 0.7 = $90 ✔")
L("mum", "Ninety dollars? For a cushion? With a picture of another cushion on it?", mood="shock", shot="close", prop="cushion")
L("tara", "It's very meta, Mum.", mood="deadpan", shot="close", gap=0.4)
L("cashier", "Plus nine percent G S T!", mood="excited", shot="close", boardClear=True)
L("mum", "Of course.", mood="deadpan", shot="close")
L("tara", "Up nine percent. Keep a hundred, add nine. A hundred and nine percent. Times one point oh nine. Sixty three times one point oh nine... sixty eight dollars sixty seven.", mood="thinking", shot="close",
  board="UP 9% → 109% → × 1.09     63 × 1.09 = $68.67")
L("centi", "Notice the OH. One point OH nine. People who forget the oh, multiply by one point nine. That's a ninety percent tax. Don't be those people.", mood="smug", shot="close",
  board="× 1.09  ✔      × 1.9  ✘ (that's +90%!)")

# ---------------- ACT 3: HOME, THE TEST ----------------
card("THAT EVENING", "Cushion count: still fourteen", 2.2)
scene("living", [("tara", 260), ("dad", 620), ("centi", 1000)])
L("tara", "Okay, speaking of percentages. My maths test. I went from twelve out of twenty, to eighteen out of twenty.", mood="happy", shot="close", boardClear=True, board="12/20  →  18/20")
L("dad", "Six marks! That's a six percent improvement!", mood="smug", shot="close")
L("tara", "No.", mood="deadpan", shot="close")
L("centi", "No.", mood="bored", shot="close", gap=0.3)
L("centi", "Percentage change equals the change, divided by the ORIGINAL, times one hundred. Change is six. Original is twelve. Six over twelve is a half.", mood="teach", shot="close",
  board="% change = change ÷ ORIGINAL × 100")
L("tara", "So it's a fifty percent improvement.", mood="happy", shot="close", board="6 ÷ 12 × 100 = 50% increase")
L("centi", "Bonus round. Her score went from sixty percent to ninety percent. That's thirty percentage POINTS. But a fifty percent increase. Newspapers mix those up every day. Some of them on purpose.", mood="smug", shot="close",
  board="60% → 90%:  +30 percentage POINTS = +50%")
L("dad", "Fifty percent! That's exactly how much my stock went up!", mood="excited", shot="close")
L("dad", "Before it went down fifty percent.", mood="sad", shot="close")
L("tara", "Please don't invest me.", mood="deadpan", shot="close", gap=0.5)

confess("centi", "CENTI · Recap Monster · Speaking Slowly For Dad")
L("centi", "Recap. For anyone eating dinner. First. Per cent means, per hundred. Ten percent? Divide by ten.", mood="teach", boardClear=True, board="1. Per cent = per 100.   10% → ÷ 10")
L("centi", "Second. Multipliers. Up nine percent, times one point oh nine. Down thirty percent, times zero point seven.", mood="teach", board="2. Up 9% → × 1.09    Down 30% → × 0.7")
L("centi", "Third. Percentages don't add. They multiply.", mood="teach", board="3. Don't add percentages — multiply")
L("centi", "Fourth. Going backwards? Divide by the multiplier.", mood="teach", board="4. Backwards → ÷ multiplier")
L("centi", "And finally. Always ask. Percent of WHAT?", mood="smug", board="5. Percent OF WHAT?", gap=0.5)

scene("living", [("tara", 260), ("mum", 560), ("dad", 840)])
L("mum", "Fine. I'm returning all fourteen cushions.", mood="annoyed", shot="close")
L("dad", "Brilliant. That's a one hundred percent decrease in cushions!", mood="smug", shot="close")
L("tara", "That's... actually correct.", mood="shock", shot="close")
L("dad", "I'll take it.", mood="smug", shot="close")
sfx("ding")
L("centi", "Somebody please put me back in the calculator.", mood="bored", shot="wide", offstage=True, gap=0.8)

# ---------------- PAUSE CHALLENGE ----------------
card("PAUSE CHALLENGE", "Centi gives you 5 seconds. Then he gets smug.", 3.0)
challenge(1, "A $40 game is 25% off. What do you pay?", "$30", "25% off → × 0.75    40 × 0.75 = 30",
  "Question one. A forty dollar game is twenty five percent off. What do you pay?",
  "Thirty dollars. Twenty five percent off means keep seventy five percent. Forty times zero point seven five. Thirty.")
challenge(2, "A jacket costs $54 AFTER 10% off. What was the original price?", "$60", "Backwards: 54 ÷ 0.9 = 60",
  "Question two. A jacket costs fifty four dollars AFTER ten percent off. What was the original price?",
  "Sixty dollars. Going backwards, so divide. Fifty four divided by zero point nine. If you said fifty nine forty, I saw that. With all one hundred eyes.")
challenge(3, "A price goes UP 20%, then DOWN 20%. Overall?", "DOWN 4%", "× 1.2 × 0.8 = × 0.96  →  4% less",
  "Question three. A price goes up twenty percent, then down twenty percent. What happens overall?",
  "Down four percent. One point two times zero point eight is zero point nine six. If you said it stays the same, go and sit with Dad.")
card("TOTALLY RAOTIONAL", "Next time: Ratio — “The Great Biryani Split”", 4.0)
