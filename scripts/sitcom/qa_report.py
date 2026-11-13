"""Summarise asr.py reports, ignoring number formatting (ASR writes '47.85', the script says
'forty seven eighty five'). Numbers and units are dropped from both sides; what's left are
real word mismatches worth listening to.   Usage: python3 qa_report.py qa/*.asr.txt
"""
import ast, re, sys, difflib

NUM = set("""zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen
seventeen eighteen nineteen twenty thirty forty fifty sixty seventy eighty ninety hundred thousand million billion
point and a half halves quarter quarters third thirds fifth fifths sixth sixths eighth eighths first second fourth
dollar dollars cent cents percent per cent degrees degree kilometres kilometre kilometers metres metre meters
centimetres centimetre millilitres grams gram kilograms kilogram km kg cm m g ml litres litre squared cubed
times x oh""".split())
UK_US = {"mum": "mom", "metres": "meters", "colour": "color", "favourite": "favorite", "centre": "center",
         "litres": "liters", "travelling": "traveling", "practise": "practice", "realise": "realize"}

def words(s, hyp):
    s = s.lower().replace("-", " ")
    toks = re.findall(r"[a-z0-9.,$%'/²³]+", s)
    out = []
    for t in toks:
        t = t.strip(".,'")
        if not t or re.search(r"\d", t) or t in NUM: continue
        out.append(UK_US.get(t, t))
    return out

for path in sys.argv[1:]:
    rows = []
    for line in open(path):
        line = line.strip()
        if not line.startswith("("): continue
        try: _, who, ref, hyp = ast.literal_eval(line)
        except Exception: continue
        a, b = words(ref, False), words(hyp, True)
        sm = difflib.SequenceMatcher(None, a, b)
        diffs = [(" ".join(a[i1:i2]), " ".join(b[j1:j2])) for op, i1, i2, j1, j2 in sm.get_opcodes() if op != "equal"]
        diffs = [d for d in diffs if d[0] or len(d[1].split()) > 1]
        if diffs: rows.append((who, diffs, ref))
    print(f"== {path}: {len(rows)} lines with word differences")
    for who, diffs, ref in rows:
        print(f"  {who:8s} " + "; ".join(f"{x!r}→{y!r}" for x, y in diffs[:3]))
