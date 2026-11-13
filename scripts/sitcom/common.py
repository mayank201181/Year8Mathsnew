# Shared cast, season list and beat helpers for "Totally Raotional".
# build.py / lint_episode.py exec this file, then the episode file, in one namespace.
# Episode files set EP = dict(topic=..., title=...) and call the helpers below.

VOICES = {
    "tara":    dict(voice="af_heart", speed=1.06, lang="en-us"),
    "mum":     dict(voice="bf_emma", speed=1.08, lang="en-gb"),
    "dad":     dict(voice="bm_george", speed=1.0, lang="en-gb"),
    "centi":   dict(voice="am_fenrir", speed=0.95, lang="en-us", pitch=-2.5),
    "cashier": dict(voice="am_puck", speed=1.12, lang="en-us"),
    "teacher": dict(voice="af_sarah", speed=1.02, lang="en-us"),
    "uncle":   dict(voice="am_michael", speed=1.0, lang="en-us", pitch=-1.0),
}

# Season 1 running order = the app's topic order.  (num, topic id, short topic name, episode title)
SEASON = [
    (1, "integers-powers", "Integers & Powers", "Minus Times Minus Equals Drama"),
    (2, "factors-multiples", "Factors & Primes", "The Prime Suspect"),
    (3, "standard-form", "Standard Form", "Ten To The Power Of Nope"),
    (4, "fractions", "Fractions", "A Fraction Of The Respect"),
    (5, "decimals-rounding", "Decimals & Rounding", "Rounding Error, Party Of Four"),
    (6, "percentages", "Percentages", "Seventy Percent Off My Patience"),
    (7, "ratio-proportion", "Ratio", "The Great Biryani Split"),
    (8, "rates-units", "Measures & Rates", "Are We There Yet, Per Hour"),
    (9, "expressions", "Expressions", "Let X Be Dad"),
    (10, "equations", "Equations", "Balance Issues"),
    (11, "sequences-graphs", "Sequences", "The Nth Time's The Charm"),
    (12, "linear-graphs", "Straight-Line Graphs", "Gradient Expectations"),
    (13, "angles-polygons", "Angles & Polygons", "Parallel Universe"),
    (14, "constructions-bearings", "Bearings & Constructions", "Lost Bearings"),
    (15, "perimeter-area-volume", "Area & Volume", "Room For Improvement"),
    (16, "circles", "Circles", "Pi Hard"),
    (17, "transformations-pythagoras", "Transformations", "Mirror, Mirror, On The Axis"),
    (18, "statistics", "Statistics", "Lies, Damned Lies And Bar Charts"),
    (19, "averages-spread", "Averages", "The Mean, The Median And The Ugly"),
    (20, "probability", "Probability", "Odds Are, Dad Is Wrong"),
]

CHARACTERS = set(VOICES)
SETS = {"living", "kitchen", "mall", "checkout", "classroom", "hawker", "park"}  # + confess_<character>
MOODS = {"neutral", "happy", "excited", "deadpan", "annoyed", "shock", "smug", "thinking", "worried", "sad",
         "determined", "teach", "bored", "eyeroll"}
SHOTS = {"close", "two", "wide"}
PROPS = {"phone", "tablet", "cushion", "book", "plate", "map", "dice", "calculator", "compass", "paintroller"}
SFX_NAMES = {"ding", "buzzer", "scratch", "trombone", "poof", "whoosh", "tick", "door", "drawer"}

B = []
def scene(id, cast, caption=None): B.append(dict(type="scene", id=id, cast=cast, caption=caption))
def L(who, text, **kw): B.append(dict(type="line", who=who, text=text, **kw))
def sfx(name, gap=0.0): B.append(dict(type="sfx", name=name, gap=gap))
def freeze(text, dur=2.6, s="scratch", narrator=""): B.append(dict(type="freeze", text=text, dur=dur, sfx=s, narrator=narrator))
def poof(who, x): B.append(dict(type="poof", who=who, x=x))
def card(text, sub="", dur=2.5): B.append(dict(type="card", text=text, sub=sub, dur=dur))
def challenge(n, q, a, work, qs, as_): B.append(dict(type="challenge", n=n, q=q, a=a, work=work, qs=qs, as_=as_))
def confess(who, caption): scene("confess_" + who, [(who, 640)], caption)

def _ep():
    ep = globals().get("EP") or {}
    row = next(r for r in SEASON if r[1] == ep["topic"])
    return row
def title(dur=5.0):
    num, _, _, t = _ep()
    B.append(dict(type="title", title="TOTALLY RAOTIONAL", sub=f"Episode {num} · “{t}”", dur=dur))
def end_card(dur=4.0):
    num = _ep()[0]
    nxt = next((r for r in SEASON if r[0] == num + 1), None)
    sub = f"Next time: {nxt[2]} — “{nxt[3]}”" if nxt else "That's a wrap on Season 1!"
    B.append(dict(type="card", text="TOTALLY RAOTIONAL", sub=sub, dur=dur))
