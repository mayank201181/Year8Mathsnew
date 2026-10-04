import type { TopicExtras } from "../types.ts";

export const extras: TopicExtras = {
  hook:
    "{{1/8}} = 0.125 stops after three digits, but {{1/7}} = 0.142857142857… repeats the same six digits for ever. Can you tell which fractions will stop just by looking at the denominator?",

  didYouKnow: [
    "Computers count in binary (base 2), and in binary {{1/10}} is a *recurring* fraction: 0.000110011001100… So a computer can only store a rounded version of 0.1 — which is why many programming languages say that 0.1 + 0.2 = 0.30000000000000004.",
    "In January 1982 the Vancouver Stock Exchange launched a new share index at 1000. It was recalculated thousands of times a day, and each time the result was *truncated* (chopped) to 3 decimal places instead of rounded. The tiny losses piled up: by November 1983 the index read about 525 when it should have been about 1099.",
    "Canada stopped making 1-cent coins in 2012. Since 2013, cash totals there are rounded to the nearest 5 cents — $1.02 becomes $1.00 and $1.03 becomes $1.05 — while card payments are still charged to the exact cent.",
    "{{1/7}} = 0.142857142857…, and the other sevenths use the same six digits in the same cyclic order: {{2/7}} = 0.285714…, {{3/7}} = 0.428571… Stranger still, 142857 × 7 = 999 999.",
    "0.999… with the 9s going on for ever is *exactly* 1 — not just very close to it. One way to see it: {{1/3}} = 0.333…, and three lots of 0.333… make 0.999…, while three lots of {{1/3}} make 1.",
    "Singapore, the UK and the USA write a decimal *point* (3.14), but much of Europe, and Indonesia, write a decimal *comma* (3,14). So \"1,500\" means fifteen hundred in Singapore but one and a half in Germany.",
  ],

  activities: [
    {
      title: "Receipt estimation race",
      emoji: "🧾",
      materials: [
        "A shop or food-court receipt with 6–10 items (or a list of prices)",
        "Paper and pencil",
        "A calculator",
        "A partner to race",
      ],
      steps: [
        "Cover the total at the bottom of the receipt with a sticky note or your thumb.",
        "Round every price to 1 significant figure: $3.85 → $4, $12.40 → $10, $0.85 → $0.9 (90 cents).",
        "Race: you add the rounded prices in your head while your partner adds the exact prices on the calculator. Who finishes first?",
        "Uncover the real total (use the subtotal before any GST or service charge). How far off was your estimate?",
        "Count how many prices you rounded up and how many you rounded down. Could you have predicted whether your estimate would be too high or too low?",
      ],
      maths:
        "Rounding to 1 s.f. turns a messy sum into easy mental arithmetic. Each rounded price is a little too big or a little too small, so the estimate leans the way the *biggest* roundings went — rounding $12.40 down to $10 matters far more than rounding $3.85 up to $4. That is how you judge whether an estimate is an overestimate or an underestimate.\n\nEstimating first is also how you catch calculator slips, such as a misplaced decimal point that makes a total ten times too big.",
    },
    {
      title: "The 142857 lightning trick",
      emoji: "⚡",
      materials: ["A calculator", "Paper and pen", "A volunteer to amaze"],
      steps: [
        "Practise first: work out 1 ÷ 7 on the calculator and find the block of six digits that repeats: 142857. Draw these digits round a circle in order: 1 → 4 → 2 → 8 → 5 → 7 → back to 1.",
        "Ask your volunteer to call out a whole number from 1 to 6. Then race: they multiply 142857 by it on the calculator while you write the answer from your head.",
        "Your secret: work out 7 × their number and look only at its last digit. For 3, 7 × 3 = 21, so the last digit is 1.",
        "Write the six digits from your circle so that they **end** with that digit. For 1 you get 428571 — and indeed 142857 × 3 = 428571.",
        "Finale: ask them to try 142857 × 7. You already know the answer: 999 999.",
      ],
      maths:
        "142857 is the repeating block of {{1/7}}. Dividing by 7 can only leave the remainders 1 to 6, and {{1/7}} visits all six of them in one loop. So {{2/7}}, {{3/7}}, … {{6/7}} just join the same loop at a different place: their decimals are rotations of 142857, and 142857 × n is exactly the repeating block of {{n/7}}.\n\nThe last-digit shortcut works because 142857 ends in 7. And × 7 gives 999 999 because seven lots of 0.142857142857… make 0.999999…, which is exactly {{7/7}} = 1.",
    },
  ],

  bonusDiagrams: [
    {
      title: "Why 0.3 × 0.4 = 0.12",
      svg: `<svg viewBox="0 0 460 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A unit square split into 100 small squares. A strip 3 columns wide (0.3) and a strip 4 rows tall (0.4) overlap in 12 small squares, showing 0.3 times 0.4 equals 0.12."><rect x="0" y="0" width="460" height="300" fill="#ffffff"/><rect x="40" y="30" width="72" height="240" fill="#bae6fd"/><rect x="40" y="30" width="240" height="96" fill="#fde68a"/><rect x="40" y="30" width="72" height="96" fill="#bbf7d0"/><g stroke="#94a3b8" stroke-width="1"><line x1="64" y1="30" x2="64" y2="270"/><line x1="88" y1="30" x2="88" y2="270"/><line x1="112" y1="30" x2="112" y2="270"/><line x1="136" y1="30" x2="136" y2="270"/><line x1="160" y1="30" x2="160" y2="270"/><line x1="184" y1="30" x2="184" y2="270"/><line x1="208" y1="30" x2="208" y2="270"/><line x1="232" y1="30" x2="232" y2="270"/><line x1="256" y1="30" x2="256" y2="270"/><line x1="40" y1="54" x2="280" y2="54"/><line x1="40" y1="78" x2="280" y2="78"/><line x1="40" y1="102" x2="280" y2="102"/><line x1="40" y1="126" x2="280" y2="126"/><line x1="40" y1="150" x2="280" y2="150"/><line x1="40" y1="174" x2="280" y2="174"/><line x1="40" y1="198" x2="280" y2="198"/><line x1="40" y1="222" x2="280" y2="222"/><line x1="40" y1="246" x2="280" y2="246"/></g><rect x="40" y="30" width="240" height="240" fill="none" stroke="#1f2937" stroke-width="2"/><rect x="40" y="30" width="72" height="96" fill="none" stroke="#334155" stroke-width="3"/><line x1="40" y1="20" x2="112" y2="20" stroke="#334155" stroke-width="1.5"/><line x1="40" y1="16" x2="40" y2="24" stroke="#334155" stroke-width="1.5"/><line x1="112" y1="16" x2="112" y2="24" stroke="#334155" stroke-width="1.5"/><text x="76" y="13" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="#1f2937">0.3</text><line x1="30" y1="30" x2="30" y2="126" stroke="#334155" stroke-width="1.5"/><line x1="26" y1="30" x2="34" y2="30" stroke="#334155" stroke-width="1.5"/><line x1="26" y1="126" x2="34" y2="126" stroke="#334155" stroke-width="1.5"/><text x="24" y="82" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="end" fill="#1f2937">0.4</text><text x="160" y="290" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#334155">side = 1 whole</text><text x="300" y="56" font-size="13" font-family="sans-serif" font-weight="bold" fill="#1f2937">Whole square = 1</text><text x="300" y="78" font-size="12" font-family="sans-serif" fill="#334155">Small square = 0.01</text><rect x="300" y="108" width="14" height="14" fill="#bae6fd" stroke="#334155"/><text x="320" y="120" font-size="12" font-family="sans-serif" fill="#334155">0.3 (3 columns)</text><rect x="300" y="132" width="14" height="14" fill="#fde68a" stroke="#334155"/><text x="320" y="144" font-size="12" font-family="sans-serif" fill="#334155">0.4 (4 rows)</text><rect x="300" y="156" width="14" height="14" fill="#bbf7d0" stroke="#334155"/><text x="320" y="168" font-size="12" font-family="sans-serif" fill="#334155">overlap: 3 × 4 = 12</text><text x="300" y="206" font-size="12" font-family="sans-serif" fill="#334155">12 hundredths, so</text><text x="300" y="230" font-size="14" font-family="sans-serif" font-weight="bold" fill="#1f2937">0.3 × 0.4 = 0.12</text></svg>`,
      caption:
        "The whole square is 1. Three tenths of the width and four tenths of the height overlap in 3 × 4 = 12 of the 100 small squares, so the product is 12 hundredths. Tenths × tenths make hundredths — that is why the answer has two decimal places, and why it is *smaller* than both numbers.",
    },
    {
      title: "Why one-seventh repeats for ever",
      svg: `<svg viewBox="0 0 470 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Remainder wheel for 1 divided by 7. Remainders 0 to 6 sit round a circle. Arrows go 1 to 3 to 2 to 6 to 4 to 5 and back to 1, labelled with the digits 1, 4, 2, 8, 5, 7. Remainder 0 is never reached."><defs><marker id="dr7-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#334155"/></marker></defs><rect x="0" y="0" width="470" height="300" fill="#ffffff"/><circle cx="150" cy="150" r="110" fill="none" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="4 4"/><g stroke="#334155" stroke-width="1.6" marker-end="url(#dr7-arrow)"><line x1="233.1" y1="94.1" x2="201.0" y2="234.5"/><line x1="205.8" y1="238.9" x2="247.9" y2="186.2"/><line x1="245.5" y1="168.9" x2="77.5" y2="87.9"/><line x1="66.9" y1="94.1" x2="99.0" y2="234.5"/><line x1="94.2" y1="238.9" x2="52.2" y2="186.2"/><line x1="54.5" y1="168.9" x2="222.5" y2="87.9"/></g><g font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle" fill="#1f2937"><circle cx="224.5" cy="131.7" r="9" fill="#fde68a" stroke="#334155"/><text x="224.5" y="136">1</text><circle cx="227.5" cy="211.8" r="9" fill="#fde68a" stroke="#334155"/><text x="227.5" y="216">4</text><circle cx="199.2" cy="146.6" r="9" fill="#fde68a" stroke="#334155"/><text x="199.2" y="151">2</text><circle cx="75.5" cy="131.7" r="9" fill="#fde68a" stroke="#334155"/><text x="75.5" y="136">8</text><circle cx="72.6" cy="211.8" r="9" fill="#fde68a" stroke="#334155"/><text x="72.6" y="216">5</text><circle cx="100.8" cy="146.6" r="9" fill="#fde68a" stroke="#334155"/><text x="100.8" y="151">7</text></g><g font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#1f2937"><circle cx="150" cy="40" r="13" fill="#fecaca" stroke="#334155" stroke-width="1.5"/><text x="150" y="45">0</text><circle cx="236.0" cy="81.4" r="13" fill="#c7d2fe" stroke="#334155" stroke-width="1.5"/><text x="236.0" y="86">1</text><circle cx="257.2" cy="174.5" r="13" fill="#c7d2fe" stroke="#334155" stroke-width="1.5"/><text x="257.2" y="179">2</text><circle cx="197.7" cy="249.1" r="13" fill="#c7d2fe" stroke="#334155" stroke-width="1.5"/><text x="197.7" y="254">3</text><circle cx="102.3" cy="249.1" r="13" fill="#c7d2fe" stroke="#334155" stroke-width="1.5"/><text x="102.3" y="254">4</text><circle cx="42.8" cy="174.5" r="13" fill="#c7d2fe" stroke="#334155" stroke-width="1.5"/><text x="42.8" y="179">5</text><circle cx="64.0" cy="81.4" r="13" fill="#c7d2fe" stroke="#334155" stroke-width="1.5"/><text x="64.0" y="86">6</text></g><text x="150" y="20" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#b91c1c">0 is never reached</text><text x="254" y="68" font-size="11" font-family="sans-serif" fill="#334155">start</text><g font-family="sans-serif" font-size="12" fill="#334155"><text x="290" y="40" font-size="13" font-weight="bold" fill="#1f2937">Long division of 1 ÷ 7</text><text x="290" y="62">Circles = remainders.</text><text x="290" y="78">Each arrow is one step;</text><text x="290" y="94">its label is the digit made.</text><text x="290" y="120">1 → 10 ÷ 7 = 1 r 3</text><text x="290" y="138">3 → 30 ÷ 7 = 4 r 2</text><text x="290" y="156">2 → 20 ÷ 7 = 2 r 6</text><text x="290" y="174">6 → 60 ÷ 7 = 8 r 4</text><text x="290" y="192">4 → 40 ÷ 7 = 5 r 5</text><text x="290" y="210">5 → 50 ÷ 7 = 7 r 1</text><text x="290" y="236">Remainder 1 again, so</text><text x="290" y="252">the digits repeat:</text><text x="290" y="276" font-size="13" font-weight="bold" fill="#1f2937">0.142857 142857…</text></g></svg>`,
      caption:
        "Long division of 1 ÷ 7 can only ever leave the remainders 1 to 6. After six steps remainder 1 comes back, so the same six steps — and the same six digits — happen again and again: {{1/7}} = 0.142857142857… Remainder 0, which would make the division stop, is never reached.",
    },
  ],

  history: {
    title: "Simon Stevin and \"The Tenth\"",
    story:
      "In 1585 the Flemish engineer Simon Stevin published a short booklet called *De Thiende* — \"The Tenth\". He promised merchants, surveyors and astronomers that tenths, hundredths and thousandths would make working with fractions as easy as working with whole numbers. His notation looked strange to modern eyes: he would write 27.847 as 27⓪8①4②7③, with a circled number after each digit to show its place.\n\nStevin also urged governments to make coins, weights and measures decimal. France's metric system finally did that about 200 years later. Decimal fractions were not brand new — the Persian astronomer al-Kāshī had used them in Samarkand in 1427 — but Stevin's booklet spread the idea across Europe, and within a few decades John Napier helped make the simple decimal point popular.",
  },
};
