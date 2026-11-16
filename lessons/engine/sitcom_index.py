#!/usr/bin/env python3
"""Build public/lessons/claude-sitcom.html: the Claude Sitcom episode guide.

usage: python3 lessons/engine/sitcom_index.py

Lists every lessons/sitcom-<topic> folder whose page is built in public/lessons,
in episode order (the "Ep N" in META["kicker"]).
"""
import glob
import html
import json
import os
import re
import sys

ENGINE = os.path.dirname(os.path.abspath(__file__))
LESSONS = os.path.dirname(ENGINE)
REPO = os.path.dirname(LESSONS)
sys.path.insert(0, ENGINE)
from build import load_script  # noqa: E402

SUBJECT = {"integers-powers": "Number", "factors-multiples": "Number", "standard-form": "Number", "fractions": "Number", "decimals-rounding": "Number", "percentages": "Number", "ratio-proportion": "Ratio & Proportion", "rates-units": "Ratio & Proportion", "expressions": "Algebra", "equations": "Algebra", "sequences-graphs": "Algebra", "linear-graphs": "Algebra", "angles-polygons": "Geometry & Measure", "constructions-bearings": "Geometry & Measure", "perimeter-area-volume": "Geometry & Measure", "circles": "Geometry & Measure", "transformations-pythagoras": "Geometry & Measure", "statistics": "Statistics & Probability", "averages-spread": "Statistics & Probability", "probability": "Statistics & Probability"}


def main():
    eps = []
    for d in sorted(glob.glob(os.path.join(LESSONS, "sitcom-*"))):
        topic = os.path.basename(d)
        if not os.path.exists(os.path.join(REPO, "public", "lessons", f"{topic}.html")):
            continue
        meta = load_script(topic).META
        tl = json.load(open(os.path.join(d, "timeline.json")))
        m = re.search(r"Ep (\d+) · (.+)$", meta["kicker"])
        ep, subject_name = int(m.group(1)), m.group(2)
        lab = meta.get("lab", topic[7:])
        eps.append(dict(ep=ep, topic=topic, lab=lab, show=meta["name"], subject=subject_name,
                        dek=meta["dek"].replace("{chapters}", str(len(tl["chapters"]))),
                        minutes=round(tl["total"] / 60), area=SUBJECT.get(lab, "Number")))
    eps.sort(key=lambda e: e["ep"])
    esc = lambda s: html.escape(s, quote=True)
    cards = "\n".join(f'''<a class="ep {e['area'].split()[0].lower()}" href="/lessons/{e['topic']}.html">
  <span class="num">Ep {e['ep']}</span>
  <span class="show">{esc(e['show'])}</span>
  <span class="topic">{esc(e['subject'])} · {e['area']}</span>
  <span class="dek">{esc(e['dek'])}</span>
  <span class="len">▶ {e['minutes']} min</span>
</a>''' for e in eps)
    doc = f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Claude Sitcom · Year 8 Maths episode guide</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Atkinson+Hyperlegible+Next:wght@400;700&display=swap" rel="stylesheet">
<style>
:root {{ --bg:#0A1B27; --card:#12293A; --line:#24435A; --ink:#F2F7FA; --muted:#A9C0CF; --accent:#8B7CFF; }}
* {{ box-sizing:border-box; }}
body {{ margin:0; background:var(--bg); color:var(--ink); font-family:"Atkinson Hyperlegible Next",system-ui,sans-serif; }}
main {{ max-width:1100px; margin:0 auto; padding:32px 16px 64px; }}
.kicker {{ color:var(--accent); font-weight:700; letter-spacing:.08em; text-transform:uppercase; font-size:14px; }}
h1 {{ font-family:Fredoka,system-ui,sans-serif; font-size:clamp(34px,6vw,56px); margin:6px 0 8px; }}
p.lede {{ color:var(--muted); max-width:720px; font-size:18px; line-height:1.5; margin:0 0 28px; }}
.grid {{ display:grid; gap:14px; grid-template-columns:repeat(auto-fill,minmax(250px,1fr)); }}
.ep {{ display:flex; flex-direction:column; gap:6px; padding:18px; border-radius:18px; background:var(--card); border:1px solid var(--line); color:inherit; text-decoration:none; border-top:5px solid #56D69B; transition:transform .15s; }}
.ep.number {{ border-top-color:#8B85FF; }} .ep.ratio {{ border-top-color:#2DD4BF; }} .ep.algebra {{ border-top-color:#B18CFF; }} .ep.geometry {{ border-top-color:#FB923C; }} .ep.statistics {{ border-top-color:#F472B6; }}
.ep:hover, .ep:focus-visible {{ transform:translateY(-3px); outline:2px solid var(--accent); outline-offset:2px; }}
.num {{ font-size:13px; font-weight:700; color:var(--muted); text-transform:uppercase; letter-spacing:.06em; }}
.show {{ font-family:Fredoka,system-ui,sans-serif; font-size:24px; font-weight:700; line-height:1.15; }}
.topic {{ font-weight:700; color:#FFC247; font-size:15px; }}
.dek {{ color:var(--muted); font-size:15px; line-height:1.45; flex:1; }}
.len {{ font-weight:700; font-size:14px; }}
a.back {{ color:var(--muted); font-size:15px; }}
</style>
</head>
<body>
<main>
<a class="back" href="/">← Year 8 Maths</a>
<p class="kicker">Claude Sitcom · {len(eps)} episodes</p>
<h1>Claude Sitcom</h1>
<p class="lede">Mockumentary comedies written and animated by Claude, one for each Year 8 Maths topic. About ten minutes each,
with Kavya (12), a documentary crew, and a cast of very opinionated numbers, shapes and graphs. Every key idea and exam trap is in there.</p>
<div class="grid">
{cards}
</div>
</main>
</body>
</html>
'''
    out = os.path.join(REPO, "public", "lessons", "claude-sitcom.html")
    open(out, "w").write(doc)
    print(f"wrote {out}: {len(eps)} episodes")


if __name__ == "__main__":
    main()
