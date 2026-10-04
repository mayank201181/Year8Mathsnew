import type { TopicExtras } from "../types.ts";

// ---------------------------------------------------------------------------
// Powers of 10 & Standard Form — engagement extras.
// ---------------------------------------------------------------------------

export const extras: TopicExtras = {
  hook:
    "A red blood cell is about 0.000 007 5 m across, and the Sun is about 150 000 000 000 m away. Standard form squeezes both into a few characters — {{7.5 * 10^(-6)}} and {{1.5 * 10^11}} — and lets you compare them at a glance.",

  didYouKnow: [
    "The word **googol** means {{10^100}}: a 1 followed by a hundred zeros. It was named by Milton Sirotta, the 9-year-old nephew of the American mathematician Edward Kasner — and the name Google is a play on it.",
    "Light travels at exactly 299 792 458 metres per second, about {{3 * 10^8}} m/s. Even at that speed, sunlight takes about 8 minutes 20 seconds to cover the {{1.5 * 10^11}} m to Earth.",
    "Metric prefixes are powers of 10 in disguise: kilo = {{10^3}}, mega = {{10^6}}, giga = {{10^9}}, milli = {{10^(-3)}}, micro = {{10^(-6)}} and nano = {{10^(-9)}}. In 2022 four new ones were added: ronna ({{10^27}}), quetta ({{10^30}}), ronto ({{10^(-27)}}) and quecto ({{10^(-30)}}).",
    "Scientists estimate that your body is made of roughly 30 to 40 trillion cells — between {{3 * 10^13}} and {{4 * 10^13}} — and that most of them are red blood cells.",
    "On a scientific calculator, `6.02E23` means {{6.02 * 10^23}}: roughly the number of atoms in 12 grams of carbon. The E stands for *exponent*, the power of 10.",
    "The Earth's mass is about {{5.97 * 10^24}} kg. Written out in full, that is 5 970 000 000 000 000 000 000 000 kg — which is exactly why scientists use standard form.",
  ],

  activities: [
    {
      title: "How thick is one sheet of paper?",
      emoji: "📄",
      materials: [
        "A thick book or a new pack of printer paper (the pack says how many sheets it holds)",
        "A ruler marked in millimetres",
        "A calculator (optional)",
      ],
      steps: [
        "Squeeze a stack of sheets tightly together and measure its thickness in millimetres. In a book, each sheet has two page numbers, so 300 pages = 150 sheets.",
        "Divide the thickness by the number of sheets to find the thickness of one sheet. A typical answer is about 0.1 mm.",
        "Convert to metres (÷ 1000) and write it in standard form. For example, 0.1 mm = 0.0001 m = {{1 * 10^(-4)}} m.",
        "How many sheets would make a stack 1 m tall? How many would reach the top of Mount Everest (about {{8.85 * 10^3}} m)?",
        "Challenge: folding a sheet in half doubles its thickness. After 42 folds it would be {{2^42}} sheets thick, and {{2^42}} is about {{4.4 * 10^12}}. How tall is that stack? Is it further than the Moon ({{3.84 * 10^8}} m)?",
      ],
      maths:
        "Measuring many sheets and dividing makes a tiny length measurable, and dividing by 100 or 1000 just slides the digits along the place-value columns. With 0.1 mm sheets, 1 m needs {{1 ÷ 10^(-4)}} = {{10^4}} = 10 000 sheets, and Everest needs about {{8.85 * 10^7}} sheets. Forty-two folds would give about {{4.4 * 10^12 * 10^(-4)}} = {{4.4 * 10^8}} m — further than the Moon. (In real life you can't fold paper anywhere near 42 times!)",
    },
    {
      title: "Count a bag of rice without counting it",
      emoji: "🍚",
      materials: ["A bag of uncooked rice (1 kg is ideal)", "Kitchen scales", "A small plate", "A calculator"],
      steps: [
        "Count out exactly 100 grains of rice onto the plate. Grouping them in tens makes it easier.",
        "Weigh the 100 grains. If your scales can't show such a small mass, count 500 grains instead.",
        "Work out the mass of one grain and write it in standard form. For example, if 100 grains weigh 2 g, one grain weighs 0.02 g = {{2 * 10^(-2)}} g.",
        "Estimate the number of grains in the whole bag: divide the mass of the bag by the mass of one grain.",
        "Write your estimate in standard form and compare it with someone who weighed a different sample. How close are you?",
      ],
      maths:
        "Mass of one grain = mass of sample ÷ number of grains, a small number that is neat in standard form. Then number of grains = mass of bag ÷ mass of one grain. At 0.02 g a grain, a 1 kg bag holds about {{1000 ÷ 0.02}} = 50 000 grains. In standard form that is {{(1 * 10^3) ÷ (2 * 10^(-2))}} = {{0.5 * 10^5}} = {{5 * 10^4}}. Dividing by a small number gives a big answer.",
    },
  ],

  bonusDiagrams: [
    {
      title: "Place-value columns are powers of 10",
      svg: `<svg viewBox="0 0 480 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Seven place-value columns headed 10 cubed, 10 squared, 10 to the 1, 10 to the 0, 10 to the minus 1, 10 to the minus 2 and 10 to the minus 3, with values 1000, 100, 10, 1, 0.1, 0.01 and 0.001. A red dot marks the decimal point between the ones and tenths columns. Curved arrows labelled divide by 10 join each column to the next one on its right."><defs><marker id="sfx-pow-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#334155"/></marker></defs><rect x="0" y="0" width="480" height="220" fill="#ffffff"/><text x="240" y="22" font-size="13" font-family="sans-serif" font-weight="bold" fill="#1f2937" text-anchor="middle">Place-value columns are powers of 10</text><g stroke="#334155" stroke-width="1"><rect x="30" y="36" width="60" height="36" fill="#c7d2fe"/><rect x="90" y="36" width="60" height="36" fill="#c7d2fe"/><rect x="150" y="36" width="60" height="36" fill="#c7d2fe"/><rect x="210" y="36" width="60" height="36" fill="#fde68a"/><rect x="270" y="36" width="60" height="36" fill="#bbf7d0"/><rect x="330" y="36" width="60" height="36" fill="#bbf7d0"/><rect x="390" y="36" width="60" height="36" fill="#bbf7d0"/><rect x="30" y="72" width="60" height="36" fill="#ffffff"/><rect x="90" y="72" width="60" height="36" fill="#ffffff"/><rect x="150" y="72" width="60" height="36" fill="#ffffff"/><rect x="210" y="72" width="60" height="36" fill="#ffffff"/><rect x="270" y="72" width="60" height="36" fill="#ffffff"/><rect x="330" y="72" width="60" height="36" fill="#ffffff"/><rect x="390" y="72" width="60" height="36" fill="#ffffff"/></g><g font-size="14" font-family="sans-serif" font-weight="bold" fill="#1f2937" text-anchor="middle"><text x="60" y="59">10³</text><text x="120" y="59">10²</text><text x="180" y="59">10¹</text><text x="240" y="59">10⁰</text><text x="300" y="59">10⁻¹</text><text x="360" y="59">10⁻²</text><text x="420" y="59">10⁻³</text></g><g font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="60" y="95">1000</text><text x="120" y="95">100</text><text x="180" y="95">10</text><text x="240" y="95">1</text><text x="300" y="95">0.1</text><text x="360" y="95">0.01</text><text x="420" y="95">0.001</text></g><circle cx="270" cy="102" r="4" fill="#dc2626"/><g stroke="#334155" stroke-width="1.5" fill="none" marker-end="url(#sfx-pow-arrow)"><path d="M68,114 Q90,138 112,116"/><path d="M128,114 Q150,138 172,116"/><path d="M188,114 Q210,138 232,116"/><path d="M248,114 Q270,138 292,116"/><path d="M308,114 Q330,138 352,116"/><path d="M368,114 Q390,138 412,116"/></g><g font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle"><text x="90" y="150">÷ 10</text><text x="150" y="150">÷ 10</text><text x="210" y="150">÷ 10</text><text x="270" y="150">÷ 10</text><text x="330" y="150">÷ 10</text><text x="390" y="150">÷ 10</text></g><g font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="240" y="180">Each step to the right divides by 10 and the power drops by 1.</text><text x="240" y="200">So the pattern forces 10⁰ = 1, 10⁻¹ = 0.1 and 10⁻² = 0.01.</text></g></svg>`,
      caption:
        "Moving one column right always divides by 10, and the power goes down by 1. Keep the pattern going past the ones column and you get {{10^0}} = 1, {{10^(-1)}} = {{1/10}} and {{10^(-2)}} = {{1/100}}. A negative power means a small number, not a negative one.",
    },
    {
      title: "Count the places moved, not the zeros",
      svg: `<svg viewBox="0 0 480 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Place-value grid with columns 10 to the 0 down to 10 to the minus 5. The top row shows 0.00052, with the 5 in the 10 to the minus 4 column and the 2 in the 10 to the minus 5 column. The bottom row shows 5.2, with the 5 in the ones column and the 2 in the tenths column. Arrows show each digit moving 4 places left, labelled times 10 to the 4. A red dashed line marks the decimal point, which stays in the same place."><rect x="0" y="0" width="480" height="250" fill="#ffffff"/><g stroke="#334155" stroke-width="1"><rect x="120" y="22" width="56" height="30" fill="#fde68a"/><rect x="176" y="22" width="56" height="30" fill="#bbf7d0"/><rect x="232" y="22" width="56" height="30" fill="#bbf7d0"/><rect x="288" y="22" width="56" height="30" fill="#bbf7d0"/><rect x="344" y="22" width="56" height="30" fill="#bbf7d0"/><rect x="400" y="22" width="56" height="30" fill="#bbf7d0"/></g><g font-size="13" font-family="sans-serif" font-weight="bold" fill="#1f2937" text-anchor="middle"><text x="148" y="42">10⁰</text><text x="204" y="42">10⁻¹</text><text x="260" y="42">10⁻²</text><text x="316" y="42">10⁻³</text><text x="372" y="42">10⁻⁴</text><text x="428" y="42">10⁻⁵</text></g><g fill="#ffffff" stroke="#94a3b8" stroke-width="1"><rect x="120" y="62" width="56" height="38"/><rect x="176" y="62" width="56" height="38"/><rect x="232" y="62" width="56" height="38"/><rect x="288" y="62" width="56" height="38"/><rect x="344" y="62" width="56" height="38"/><rect x="400" y="62" width="56" height="38"/><rect x="120" y="160" width="56" height="38"/><rect x="176" y="160" width="56" height="38"/><rect x="232" y="160" width="56" height="38"/><rect x="288" y="160" width="56" height="38"/><rect x="344" y="160" width="56" height="38"/><rect x="400" y="160" width="56" height="38"/></g><g font-size="13" font-family="sans-serif" font-weight="bold" fill="#1f2937"><text x="12" y="86">0.000 52</text><text x="12" y="184">5.2</text></g><g font-size="20" font-family="sans-serif" text-anchor="middle"><text x="148" y="88" fill="#64748b">0</text><text x="204" y="88" fill="#64748b">0</text><text x="260" y="88" fill="#64748b">0</text><text x="316" y="88" fill="#64748b">0</text><text x="372" y="88" fill="#1f2937" font-weight="bold">5</text><text x="428" y="88" fill="#1f2937" font-weight="bold">2</text><text x="148" y="186" fill="#1f2937" font-weight="bold">5</text><text x="204" y="186" fill="#1f2937" font-weight="bold">2</text></g><line x1="176" y1="56" x2="176" y2="204" stroke="#dc2626" stroke-width="2" stroke-dasharray="5 4"/><circle cx="176" cy="94" r="3.5" fill="#dc2626"/><circle cx="176" cy="192" r="3.5" fill="#dc2626"/><g stroke="#334155" stroke-width="1.6"><line x1="366" y1="104" x2="158" y2="154"/><line x1="422" y1="104" x2="214" y2="154"/></g><g fill="#334155"><path d="M154,155 L163,148 L165,156 z"/><path d="M210,155 L219,148 L221,156 z"/></g><g font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="end"><text x="470" y="126" font-weight="bold">× 10⁴</text><text x="470" y="142">4 places left</text></g><g font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="240" y="224">0.000 52 × 10⁴ = 5.2, so 0.000 52 = 5.2 × 10⁻⁴.</text><text x="240" y="242">Three zeros after the point, but the 5 moved four places.</text></g></svg>`,
      caption:
        "To write 0.000 52 in standard form, ask how far the first significant digit must move to reach the ones column. The 5 moves 4 places, so 0.000 52 = {{5.2 * 10^(-4)}}. Counting the three zeros after the point would give the wrong power, {{10^(-3)}}.",
    },
  ],

  history: {
    title: "Archimedes counts the sand",
    story:
      "About 2200 years ago, Archimedes of Syracuse set himself a challenge: how many grains of sand would it take to fill the whole universe? Greek numerals had no easy way to write huge numbers — the largest number with its own name was the *myriad*, 10 000. So in a short book called *The Sand Reckoner*, written for King Gelon of Syracuse, Archimedes invented a system of \"orders\" of numbers built on a myriad myriads, {{10^8}}. Along the way he proved a rule we now write as {{10^a * 10^b = 10^(a+b)}}. His answer: the universe, as the Greeks pictured it, would hold fewer than about {{10^63}} grains of sand. The real point was bigger than the answer — any number, however huge, can be named and written down. Standard form is the modern version of his idea.",
  },
};
