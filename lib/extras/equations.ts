import type { TopicExtras } from "../types.ts";

export const extras: TopicExtras = {
  hook:
    "Think of a number, treble it and add 7. The answer is 31. What was the number? Two moves unlock it — and a scribe in ancient Egypt was solving puzzles like this about 3,500 years ago, without ever writing an x.",

  didYouKnow: [
    "The equals sign was invented by the Welsh mathematician Robert Recorde in his 1557 book *The Whetstone of Witte*. He was tired of writing \"is equal to\" again and again, so he drew a pair of parallel lines, because no two things can be more equal.",
    "The word *algebra* comes from the Arabic *al-jabr*, meaning \"restoring\". It named one move: add the same amount to both sides to get rid of a subtraction — exactly what you do to turn {{3x - 5 = 10}} into {{3x = 15}}.",
    "The Rhind papyrus, copied by the Egyptian scribe Ahmes around 1550 BCE, asks: *a quantity and its seventh, added together, make 19 — what is the quantity?* Today we would write {{x + x/7 = 19}}. The answer is {{16 5/8}}.",
    "Using x, y and z for unknowns goes back to René Descartes' book *La Géométrie* (1637). He used letters near the end of the alphabet for unknowns and letters near the start (a, b, c) for known values — a habit mathematicians still follow almost 400 years later.",
    "The symbols < and > first appeared in print in 1631, in a book by the English mathematician Thomas Harriot — published ten years after he died. Harriot also drew the Moon through a telescope in 1609, a few months before Galileo did.",
    "A riddle in the *Greek Anthology* tells the life of the mathematician Diophantus in fractions: a sixth as a boy, a twelfth more as a youth, a seventh more before he married, a son 5 years later who lived half as long as his father, then 4 more years. Solving {{x/6 + x/12 + x/7 + 5 + x/2 + 4 = x}} gives {{x = 84}}.",
  ],

  activities: [
    {
      title: "Cups-and-counters equations",
      emoji: "🥤",
      materials: [
        "6 identical paper cups (or small opaque mugs)",
        "About 40 counters — coins, buttons or dried beans",
        "A pencil to lay on the table as the = sign",
        "A partner",
      ],
      steps: [
        "Player 1 secretly picks a number (1 to 5 works well) and hides exactly that many counters under **every** cup.",
        "Player 1 builds a true equation: some cups and loose counters on the left of the pencil, some cups and loose counters on the right, with the same total on each side. For example, with 4 counters per cup: 3 cups + 2 counters on the left, 1 cup + 10 counters on the right.",
        "Player 2 writes the equation down ({{3x + 2 = x + 10}}) and may only make **fair moves**: take the same thing away from both sides (a cup, or some loose counters), or split both sides into the same number of equal groups.",
        "Keep going until one cup sits alone opposite a pile of counters. Say the answer, then lift a cup to check.",
        "Swap roles. Make it harder: put more cups on the right than the left, or build one that is quickest if you split into groups first.",
      ],
      maths:
        "Every fair move keeps the two sides equal — that is the balance method. Taking away a cup, then 2 counters, then halving turns {{3x + 2 = x + 10}} into {{2x + 2 = 10}}, then {{2x = 8}}, then {{x = 4}}. Lifting the cup is *checking by substitution*. Notice that you can only take away as many cups as the side with fewer cups has, so the cups that are left end up on the side that had more: that is why we collect the unknown on the side with the larger coefficient.",
    },
    {
      title: "Guess my inequality",
      emoji: "📏",
      materials: [
        "A long strip of paper (or masking tape on the floor)",
        "A marker pen",
        "About 10 coins and 10 buttons (two kinds of marker)",
        "Scrap paper",
      ],
      steps: [
        "Draw a number line from −10 to 10 on the strip, with the whole numbers evenly spaced.",
        "Player 1 secretly writes an inequality such as {{-2 < x <= 3}} or {{x >= 4}} and folds the paper over.",
        "Player 2 points to any number — whole numbers, halves, anything — and asks \"Is this in?\". Player 1 answers yes or no. Mark *yes* numbers with a coin and *no* numbers with a button.",
        "When ready, Player 2 writes the inequality, taking care over open and closed circles. Score 1 point per question asked: the lowest score wins.",
        "Bonus round: Player 1 secretly chooses either {{x > 2}} or {{x >= 3}}. Which questions can tell them apart?",
      ],
      maths:
        "An inequality is a whole region of the number line, not a single answer, and the ends matter: an open circle means the end number is not included, a closed circle means it is. {{x > 2}} and {{x >= 3}} have the same whole-number solutions, but only {{x > 2}} includes 2.5 — so only a question about an in-between number can tell them apart. Asking about the middle of the stretch where an end could be halves that stretch each time, which is the quickest way to pin the end down.",
    },
  ],

  bonusDiagrams: [
    {
      title: "A bar model for unknowns on both sides",
      svg: `<svg viewBox="0 0 420 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bar model: a bar made of 3 x-boxes and 4 sits above a bar made of one x-box and 10, both the same length. One x from each bar is greyed out, and the 4 at the end of the top bar lines up with the last 4 of the 10, so 2x matches 6 and x is 3." font-family="sans-serif"><rect x="0" y="0" width="420" height="230" fill="#ffffff"/><text x="56" y="30" font-size="11" text-anchor="middle" fill="#334155">same on both</text><rect x="20" y="40" width="72" height="36" fill="#e5e7eb" stroke="#334155" stroke-width="1.5"/><text x="56" y="63" font-size="14" font-style="italic" text-anchor="middle" fill="#6b7280">x</text><rect x="92" y="40" width="72" height="36" fill="#c7d2fe" stroke="#334155" stroke-width="1.5"/><text x="128" y="63" font-size="14" font-style="italic" text-anchor="middle" fill="#1f2937">x</text><rect x="164" y="40" width="72" height="36" fill="#c7d2fe" stroke="#334155" stroke-width="1.5"/><text x="200" y="63" font-size="14" font-style="italic" text-anchor="middle" fill="#1f2937">x</text><rect x="236" y="40" width="96" height="36" fill="#fde68a" stroke="#334155" stroke-width="1.5"/><text x="284" y="63" font-size="14" text-anchor="middle" fill="#1f2937">4</text><text x="342" y="63" font-size="13" fill="#1f2937">3x + 4</text><rect x="20" y="88" width="72" height="36" fill="#e5e7eb" stroke="#334155" stroke-width="1.5"/><text x="56" y="111" font-size="14" font-style="italic" text-anchor="middle" fill="#6b7280">x</text><rect x="92" y="88" width="240" height="36" fill="#bbf7d0" stroke="#334155" stroke-width="1.5"/><text x="164" y="111" font-size="14" text-anchor="middle" fill="#1f2937">6</text><text x="284" y="111" font-size="14" text-anchor="middle" fill="#1f2937">4</text><text x="342" y="111" font-size="13" fill="#1f2937">x + 10</text><line x1="236" y1="32" x2="236" y2="132" stroke="#334155" stroke-width="1.5" stroke-dasharray="5 4"/><line x1="92" y1="32" x2="92" y2="132" stroke="#334155" stroke-width="1.5" stroke-dasharray="5 4"/><path d="M92 132 v6 h240 v-6" fill="none" stroke="#334155" stroke-width="1.5"/><text x="212" y="154" font-size="12" text-anchor="middle" fill="#334155">the 10</text><text x="20" y="182" font-size="12" fill="#1f2937">Take x from both bars: 2x + 4 = 10</text><text x="20" y="201" font-size="12" fill="#1f2937">Take 4 from both bars: 2x = 6, so x = 3</text><text x="20" y="220" font-size="12" fill="#1f2937">Check: 3 × 3 + 4 = 13 and 3 + 10 = 13</text></svg>`,
      caption:
        "Both bars stand for equal amounts, so they are the same length (drawn to scale with x = 3). Remove one x from each bar and the 4s line up, leaving {{2x = 6}}. This is exactly the move \"subtract x from both sides\" in {{3x + 4 = x + 10}}.",
    },
    {
      title: "Why multiplying by a negative flips an inequality",
      svg: `<svg viewBox="0 0 440 172" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Number line from minus 6 to 6. The points 2 and 5 are reflected in 0 to minus 2 and minus 5 by curved arrows. Before, 2 is less than 5; after multiplying by minus 1, minus 2 is greater than minus 5." font-family="sans-serif"><rect x="0" y="0" width="440" height="172" fill="#ffffff"/><text x="220" y="22" font-size="13" text-anchor="middle" fill="#1f2937">multiply every number by −1: reflect in 0</text><line x1="220" y1="34" x2="220" y2="118" stroke="#334155" stroke-width="1" stroke-dasharray="4 4"/><path d="M280 101 Q220 52 160 101" fill="none" stroke="#334155" stroke-width="1.5"/><polygon points="160,101 163.8,91.4 170.1,99.2" fill="#334155"/><path d="M370 101 Q220 2 70 101" fill="none" stroke="#334155" stroke-width="1.5"/><polygon points="70,101 74.8,91.9 80.3,100.2" fill="#334155"/><line x1="25" y1="110" x2="415" y2="110" stroke="#1f2937" stroke-width="1.5"/><line x1="40" y1="105" x2="40" y2="115" stroke="#1f2937"/><line x1="70" y1="105" x2="70" y2="115" stroke="#1f2937"/><line x1="100" y1="105" x2="100" y2="115" stroke="#1f2937"/><line x1="130" y1="105" x2="130" y2="115" stroke="#1f2937"/><line x1="160" y1="105" x2="160" y2="115" stroke="#1f2937"/><line x1="190" y1="105" x2="190" y2="115" stroke="#1f2937"/><line x1="220" y1="104" x2="220" y2="116" stroke="#1f2937" stroke-width="2"/><line x1="250" y1="105" x2="250" y2="115" stroke="#1f2937"/><line x1="280" y1="105" x2="280" y2="115" stroke="#1f2937"/><line x1="310" y1="105" x2="310" y2="115" stroke="#1f2937"/><line x1="340" y1="105" x2="340" y2="115" stroke="#1f2937"/><line x1="370" y1="105" x2="370" y2="115" stroke="#1f2937"/><line x1="400" y1="105" x2="400" y2="115" stroke="#1f2937"/><text x="40" y="132" font-size="12" text-anchor="middle" fill="#334155">−6</text><text x="70" y="132" font-size="12" text-anchor="middle" fill="#1f2937" font-weight="bold">−5</text><text x="100" y="132" font-size="12" text-anchor="middle" fill="#334155">−4</text><text x="130" y="132" font-size="12" text-anchor="middle" fill="#334155">−3</text><text x="160" y="132" font-size="12" text-anchor="middle" fill="#1f2937" font-weight="bold">−2</text><text x="190" y="132" font-size="12" text-anchor="middle" fill="#334155">−1</text><text x="220" y="132" font-size="12" text-anchor="middle" fill="#334155">0</text><text x="250" y="132" font-size="12" text-anchor="middle" fill="#334155">1</text><text x="280" y="132" font-size="12" text-anchor="middle" fill="#1f2937" font-weight="bold">2</text><text x="310" y="132" font-size="12" text-anchor="middle" fill="#334155">3</text><text x="340" y="132" font-size="12" text-anchor="middle" fill="#334155">4</text><text x="370" y="132" font-size="12" text-anchor="middle" fill="#1f2937" font-weight="bold">5</text><text x="400" y="132" font-size="12" text-anchor="middle" fill="#334155">6</text><circle cx="280" cy="110" r="6" fill="#bae6fd" stroke="#1f2937" stroke-width="1.5"/><circle cx="370" cy="110" r="6" fill="#bae6fd" stroke="#1f2937" stroke-width="1.5"/><circle cx="160" cy="110" r="6" fill="#fecaca" stroke="#1f2937" stroke-width="1.5"/><circle cx="70" cy="110" r="6" fill="#fecaca" stroke="#1f2937" stroke-width="1.5"/><text x="115" y="160" font-size="13" text-anchor="middle" fill="#1f2937">after: −2 &gt; −5</text><text x="325" y="160" font-size="13" text-anchor="middle" fill="#1f2937">before: 2 &lt; 5</text></svg>`,
      caption:
        "Multiplying by −1 reflects every number in 0, so their order reverses: 5 was further right than 2, but −5 is further left than −2. That is why {{2 < 5}} becomes {{-2 > -5}}, and why the inequality sign must flip when you multiply or divide both sides by a negative number.",
    },
  ],

  history: {
    title: "Restoring and balancing in Baghdad",
    story:
      "Around 820 CE, in Baghdad's House of Wisdom, the scholar Muhammad ibn Musa al-Khwarizmi wrote a book whose title contains two Arabic words: *al-jabr* and *al-muqabala*. *Al-jabr*, \"restoring\", meant adding the same amount to both sides to remove a subtraction. *Al-muqabala*, \"balancing\", meant cancelling equal amounts from both sides. They are the two moves of the balance method you use today.\n\nAl-Khwarizmi wrote everything in words: no x, no equals sign, and even the numbers were spelled out. He aimed the book at practical problems such as sharing out inheritances, trade and measuring land. When it was translated into Latin in the 1100s, *al-jabr* became *algebra*. His name had a Latin life too: written as *Algoritmi* in a translation of his book on Hindu–Arabic numerals, it gave us the word *algorithm*.",
  },
};
