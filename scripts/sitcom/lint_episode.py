"""Static checks for an episode script.  Usage: python3 lint_episode.py episodes/<topic>.py [...]
Exit code 1 if any ERROR.  WARNs are worth fixing but don't block.
"""
import sys, os, re
import xml.etree.ElementTree as ET

HERE = os.path.dirname(os.path.abspath(__file__))

def load(path):
    ns = {}
    exec(open(os.path.join(HERE, "common.py")).read(), ns)
    exec(open(path).read(), ns)
    return ns

BAD_SPOKEN = [
    (r"[0-9]", "digits in spoken text — write numbers as words"),
    (r"[%/×÷=^√π<>≤≥+]", "maths symbol in spoken text — say it in words"),
    (r"\bnought\b", "say 'zero', not 'nought' (TTS says 'not')"),
    (r"\b(Sigh|Ugh|Hmm+|Pfft|Tsk|Argh|Ahem)\b", "interjection TTS mangles — use a real word"),
    (r"(^|[.!?]\s+)(One|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten)\.\s+(Per ?cent|Percent)", "'One. Percent' is heard as 'one percent'"),
]

def lint(path):
    errs, warns = [], []
    try:
        ns = load(path)
    except Exception as e:
        return [f"script does not run: {e!r}"], []
    B, EP = ns["B"], ns.get("EP")
    if not EP or "topic" not in EP: errs.append("EP = dict(topic=...) missing")
    elif not any(r[1] == EP["topic"] for r in ns["SEASON"]): errs.append(f"unknown topic {EP['topic']}")
    elif os.path.basename(path) != EP["topic"] + ".py": errs.append("file name must be <topic>.py")
    kinds = [b["type"] for b in B]
    if kinds.count("title") != 1: errs.append("call title() exactly once")
    if kinds.count("challenge") != 3: errs.append("need exactly 3 challenge() beats")
    if not B or B[-1]["type"] != "card": errs.append("finish with end_card()")
    cast = set(); spoken = 0; n_lines = 0; board_n = 0; has_diag = False; cur_scene = None
    for i, b in enumerate(B):
        k = b["type"]; where = f"beat {i}"
        if k == "scene":
            sid = b["id"]; cur_scene = sid
            if not (sid in ns["SETS"] or (sid.startswith("confess_") and sid[8:] in ns["CHARACTERS"])):
                errs.append(f"{where}: unknown scene {sid}")
            cast = {w for w, x in b["cast"]}
            for w, x in b["cast"]:
                if w not in ns["CHARACTERS"]: errs.append(f"{where}: unknown character {w}")
                if not (180 <= x <= 1100): warns.append(f"{where}: x={x} for {w} near edge (use 200..1080)")
            xs = sorted(x for w, x in b["cast"])
            if any(b2 - a2 < 200 for a2, b2 in zip(xs, xs[1:])): warns.append(f"{where}: characters closer than 200px")
            if sid in ("checkout", "hawker"):
                for w, x in b["cast"]:
                    if w in ("cashier", "uncle") and not (950 <= x <= 1060): warns.append(f"{where}: {w} should stand at x≈1000 behind the counter")
            board_n = 0; has_diag = False
        elif k == "poof":
            if b["who"] not in ns["CHARACTERS"]: errs.append(f"{where}: unknown poof {b['who']}")
            cast.add(b["who"])
        elif k == "sfx":
            if b["name"] not in ns["SFX_NAMES"]: errs.append(f"{where}: unknown sfx {b['name']}")
        elif k == "line":
            n_lines += 1
            w, t = b["who"], b["text"]; spoken += len(t)
            if w not in ns["CHARACTERS"]: errs.append(f"{where}: unknown speaker {w}")
            elif w not in cast and not b.get("offstage"): errs.append(f"{where}: {w} speaks but is not on stage (add to scene, poof, or offstage=True)")
            for kk in b:
                if kk not in ("type", "who", "text", "mood", "shot", "prop", "board", "boardClear", "diagram", "gap", "offstage"):
                    errs.append(f"{where}: unknown line option {kk}")
            if b.get("mood", "neutral") not in ns["MOODS"]: errs.append(f"{where}: unknown mood {b.get('mood')}")
            if b.get("shot", "close") not in ns["SHOTS"]: errs.append(f"{where}: unknown shot {b.get('shot')}")
            if b.get("prop") and b["prop"] not in ns["PROPS"]: errs.append(f"{where}: unknown prop {b['prop']}")
            for pat, msg in BAD_SPOKEN:
                if re.search(pat, t): errs.append(f"{where} ({w}): {msg}: {t[:70]!r}")
            if len(t) > 330: warns.append(f"{where}: very long line ({len(t)} chars) — split it")
            if b.get("boardClear"): board_n = 0; has_diag = False
            if b.get("board"):
                board_n += 1
                if len(b["board"]) > 44: errs.append(f"{where}: board line > 44 chars: {b['board']!r}")
            if b.get("diagram"):
                has_diag = True
                try:
                    root = ET.fromstring(b["diagram"])
                    vb = root.get("viewBox", "")
                    if not root.tag.endswith("svg") or not vb.startswith("0 0 520 "): errs.append(f"{where}: diagram must be <svg viewBox=\"0 0 520 H\">")
                    elif not (120 <= float(vb.split()[3]) <= 280): errs.append(f"{where}: diagram height must be 120..280")
                    if "xmlns" not in b["diagram"]: errs.append(f"{where}: diagram needs xmlns=\"http://www.w3.org/2000/svg\"")
                    if re.search(r"(href=|<image|<script|url\()", b["diagram"]): errs.append(f"{where}: no external refs/images/scripts in diagram")
                except ET.ParseError as e:
                    errs.append(f"{where}: diagram SVG does not parse: {e}")
            limit = 3 if has_diag else 5
            if board_n > limit: errs.append(f"{where}: board has {board_n} text lines (max {limit}{' with a diagram' if has_diag else ''}) — use boardClear=True")
        elif k == "challenge":
            for f in ("qs", "as_"):
                for pat, msg in BAD_SPOKEN:
                    if re.search(pat, b[f]): errs.append(f"{where} challenge {f}: {msg}: {b[f][:70]!r}")
            if len(b["work"]) > 60: warns.append(f"{where}: challenge work text long ({len(b['work'])})")
            if len(b["a"]) > 14: warns.append(f"{where}: challenge answer should be short (<=14 chars)")
            spoken += len(b["qs"]) + len(b["as_"])
        elif k == "freeze":
            if len(b["text"]) > 22: warns.append(f"{where}: freeze text long")
    if not (4300 <= spoken <= 7200): warns.append(f"spoken length {spoken} chars (aim 4500-6500 ≈ 6-8 min)")
    if n_lines < 45: warns.append(f"only {n_lines} dialogue lines")
    return errs, warns

if __name__ == "__main__":
    bad = 0
    for p in sys.argv[1:]:
        e, w = lint(p)
        print(f"== {os.path.basename(p)}: {len(e)} errors, {len(w)} warnings")
        for x in e: print("  ERROR", x)
        for x in w: print("  WARN ", x)
        bad += bool(e)
    sys.exit(1 if bad else 0)
