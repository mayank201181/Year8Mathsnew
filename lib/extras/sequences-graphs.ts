import type { TopicExtras } from "../types.ts";

export const extras: TopicExtras = {
  hook:
    "A row of 100 matchstick squares needs exactly 301 matches — and you can know that without building a single one. Every pattern has a rule hiding inside it: find the rule and you can leap straight to the 100th term, or the millionth.",

  didYouKnow: [
    "Count the spirals in a sunflower head and you will very often find two neighbouring Fibonacci numbers, such as 34 and 55, or 55 and 89. Pinecones and pineapples show the same pattern with smaller numbers, like 8 and 13.",
    "Divide a Fibonacci number by the one before it and the answers creep closer and closer to the **golden ratio**, 1.618…: {{89/55}} = 1.6181…, and {{233/144}} = 1.61805… .",
    "Add up the odd numbers, starting from 1, and you always get a square number: 1 + 3 + 5 + 7 + 9 = 25 = {{5^2}}. The bonus diagram shows why.",
    "An old legend tells of a reward paid in rice on a chessboard: 1 grain on the first square, 2 on the next, then 4, 8, … doubling each time. The 64th square alone would need {{2^63}} grains — about {{9.2 * 10^18}}, which is hundreds of years' worth of the whole world's rice harvest.",
    "The On-Line Encyclopedia of Integer Sequences, which Neil Sloane began collecting in 1964 as a graduate student, now lists more than 370,000 sequences. Mathematicians type in the first few terms of a mystery pattern to find out whether anyone has met it before.",
    "The notation {{f(x)}} — read \"f of x\" — was introduced by the Swiss mathematician Leonhard Euler in 1734, and it is still the standard way to write functions today.",
  ],

  activities: [
    {
      title: "Toothpick pattern detective",
      emoji: "🧩",
      materials: ["About 40 toothpicks, cotton buds or pieces of uncooked spaghetti", "Paper and a pencil"],
      steps: [
        "Make 1 square from 4 toothpicks. Then make a row of 2 joined squares, then 3, then 4. Record how many toothpicks each row uses in a table.",
        "Find the differences between the counts. Why does each new square need only 3 toothpicks, not 4?",
        "Use the zero-term method to write the nth term. Predict the number of toothpicks for 10 squares, then build it and count to check.",
        "Work backwards: with exactly 100 toothpicks, how many squares can you make in a row? Are any toothpicks left over?",
        "Now build a double-decker row: 2 rows of squares stacked on top of each other, n squares long. Count the toothpicks for n = 1, 2 and 3 and find the nth term of this new pattern.",
      ],
      maths:
        "A row of n squares uses 4, 7, 10, 13, … toothpicks: 1 starting toothpick plus 3 for every square, so the nth term is 3n + 1 and 10 squares need 31. Working backwards, 3n + 1 = 100 gives n = 33, which uses all 100 exactly. The double-decker pattern goes 7, 12, 17, …: each new column adds 5 toothpicks (3 across and 2 upright), so its nth term is 5n + 2.",
    },
    {
      title: "Fold your way to the Moon?",
      emoji: "📄",
      materials: ["A large sheet of thin paper (newspaper or baking paper works well)", "A ruler", "A calculator"],
      steps: [
        "Fold the paper in half and count the layers. Fold it in half again and count again. Keep going, recording the number of layers after 1 fold, 2 folds, 3 folds, …",
        "Keep folding until you can't. Most people get stuck at about 7 folds with ordinary paper.",
        "Write the numbers of layers as a sequence. Is it linear or geometric? What is the term-to-term rule?",
        "Compare it with stacking sheets one at a time (1, 2, 3, 4, …). After 7 steps, which pile has more layers, and how many times more?",
        "A sheet of paper is about 0.1 mm thick. Use a calculator to find how thick the folded paper would be after 10, 20 and 42 folds. The Moon is about 384,400 km away.",
      ],
      maths:
        "The layers double each time — 2, 4, 8, 16, … — a **geometric** sequence with term-to-term rule × 2, so after n folds there are {{2^n}} layers. Stacking one sheet at a time is **linear**: after 7 steps the stack has 7 layers, but the folded paper has 128 — more than 18 times as many. Doubling is so explosive that after 42 folds a 0.1 mm sheet would be {{0.1 * 2^42}} mm thick — about 440,000 km, further than the Moon. (In real life you can't get anywhere near that: each fold needs far more paper than the one before.)",
    },
  ],

  bonusDiagrams: [
    {
      title: "Why a row of squares uses 3n + 1 matches",
      svg: `<svg viewBox="0 0 380 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three matchstick patterns of 1, 2 and 3 squares in a row, using 4, 7 and 10 matches. The first upright match in each pattern is yellow. Every square then adds 3 matches, its top, bottom and right side, coloured blue or green. Pattern 1 is 1 plus 3, pattern 2 is 1 plus 3 plus 3, pattern 3 is 1 plus 3 plus 3 plus 3."><rect x="0" y="0" width="380" height="190" fill="#ffffff"/><rect x="27" y="44" width="6" height="32" rx="2" fill="#fde68a" stroke="#334155"/><rect x="34" y="37" width="32" height="6" rx="2" fill="#c7d2fe" stroke="#334155"/><rect x="34" y="77" width="32" height="6" rx="2" fill="#c7d2fe" stroke="#334155"/><rect x="67" y="44" width="6" height="32" rx="2" fill="#c7d2fe" stroke="#334155"/><rect x="107" y="44" width="6" height="32" rx="2" fill="#fde68a" stroke="#334155"/><rect x="114" y="37" width="32" height="6" rx="2" fill="#c7d2fe" stroke="#334155"/><rect x="114" y="77" width="32" height="6" rx="2" fill="#c7d2fe" stroke="#334155"/><rect x="147" y="44" width="6" height="32" rx="2" fill="#c7d2fe" stroke="#334155"/><rect x="154" y="37" width="32" height="6" rx="2" fill="#bbf7d0" stroke="#334155"/><rect x="154" y="77" width="32" height="6" rx="2" fill="#bbf7d0" stroke="#334155"/><rect x="187" y="44" width="6" height="32" rx="2" fill="#bbf7d0" stroke="#334155"/><rect x="227" y="44" width="6" height="32" rx="2" fill="#fde68a" stroke="#334155"/><rect x="234" y="37" width="32" height="6" rx="2" fill="#c7d2fe" stroke="#334155"/><rect x="234" y="77" width="32" height="6" rx="2" fill="#c7d2fe" stroke="#334155"/><rect x="267" y="44" width="6" height="32" rx="2" fill="#c7d2fe" stroke="#334155"/><rect x="274" y="37" width="32" height="6" rx="2" fill="#bbf7d0" stroke="#334155"/><rect x="274" y="77" width="32" height="6" rx="2" fill="#bbf7d0" stroke="#334155"/><rect x="307" y="44" width="6" height="32" rx="2" fill="#bbf7d0" stroke="#334155"/><rect x="314" y="37" width="32" height="6" rx="2" fill="#c7d2fe" stroke="#334155"/><rect x="314" y="77" width="32" height="6" rx="2" fill="#c7d2fe" stroke="#334155"/><rect x="347" y="44" width="6" height="32" rx="2" fill="#c7d2fe" stroke="#334155"/><text x="50" y="106" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#334155">Pattern 1</text><text x="150" y="106" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#334155">Pattern 2</text><text x="290" y="106" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#334155">Pattern 3</text><text x="50" y="124" font-size="12" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="#1f2937">1 + 3 = 4</text><text x="150" y="124" font-size="12" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="#1f2937">1 + 3 + 3 = 7</text><text x="290" y="124" font-size="12" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="#1f2937">1 + 3 + 3 + 3 = 10</text><text x="190" y="154" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Yellow: the first upright match (the zero term, 1).</text><text x="190" y="174" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Each square adds 3 more, so pattern n uses 3n + 1.</text></svg>`,
      caption:
        "Don't count each square as 4 matches — neighbouring squares share a side. Start with one upright match, then every square adds a top, a bottom and a right side: 3 more each time. That is why the difference is 3 and the zero term is 1, so pattern n uses 3n + 1 matches (and pattern 100 uses 301).",
    },
    {
      title: "The odd numbers build the square numbers",
      svg: `<svg viewBox="0 0 420 225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A 4 by 4 square of tiles split into nested L-shapes. The top-left tile is the first layer, 1 tile. Each larger L-shape wraps around it: 3 tiles, then 5, then 7. Beside it: 1 equals 1 squared, 1 plus 3 equals 4 equals 2 squared, 1 plus 3 plus 5 equals 9 equals 3 squared, and 1 plus 3 plus 5 plus 7 equals 16 equals 4 squared."><rect x="0" y="0" width="420" height="225" fill="#ffffff"/><rect x="30" y="30" width="40" height="40" fill="#fecaca" stroke="#334155"/><rect x="70" y="30" width="40" height="40" fill="#fde68a" stroke="#334155"/><rect x="30" y="70" width="40" height="40" fill="#fde68a" stroke="#334155"/><rect x="70" y="70" width="40" height="40" fill="#fde68a" stroke="#334155"/><rect x="110" y="30" width="40" height="40" fill="#bbf7d0" stroke="#334155"/><rect x="110" y="70" width="40" height="40" fill="#bbf7d0" stroke="#334155"/><rect x="30" y="110" width="40" height="40" fill="#bbf7d0" stroke="#334155"/><rect x="70" y="110" width="40" height="40" fill="#bbf7d0" stroke="#334155"/><rect x="110" y="110" width="40" height="40" fill="#bbf7d0" stroke="#334155"/><rect x="150" y="30" width="40" height="40" fill="#c7d2fe" stroke="#334155"/><rect x="150" y="70" width="40" height="40" fill="#c7d2fe" stroke="#334155"/><rect x="150" y="110" width="40" height="40" fill="#c7d2fe" stroke="#334155"/><rect x="30" y="150" width="40" height="40" fill="#c7d2fe" stroke="#334155"/><rect x="70" y="150" width="40" height="40" fill="#c7d2fe" stroke="#334155"/><rect x="110" y="150" width="40" height="40" fill="#c7d2fe" stroke="#334155"/><rect x="150" y="150" width="40" height="40" fill="#c7d2fe" stroke="#334155"/><text x="50" y="55" font-size="14" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="#1f2937">1</text><text x="90" y="95" font-size="14" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="#1f2937">3</text><text x="130" y="135" font-size="14" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="#1f2937">5</text><text x="170" y="175" font-size="14" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="#1f2937">7</text><rect x="215" y="40" width="16" height="16" fill="#fecaca" stroke="#334155"/><text x="240" y="53" font-size="12" font-family="sans-serif" fill="#1f2937">1 = 1²</text><rect x="215" y="80" width="16" height="16" fill="#fde68a" stroke="#334155"/><text x="240" y="93" font-size="12" font-family="sans-serif" fill="#1f2937">1 + 3 = 4 = 2²</text><rect x="215" y="120" width="16" height="16" fill="#bbf7d0" stroke="#334155"/><text x="240" y="133" font-size="12" font-family="sans-serif" fill="#1f2937">1 + 3 + 5 = 9 = 3²</text><rect x="215" y="160" width="16" height="16" fill="#c7d2fe" stroke="#334155"/><text x="240" y="173" font-size="12" font-family="sans-serif" fill="#1f2937">1 + 3 + 5 + 7 = 16 = 4²</text><text x="210" y="214" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Each new L-shape is the next odd number.</text></svg>`,
      caption:
        "Wrapping one more L-shape around a square makes the next square, and the L-shapes have 1, 3, 5, 7, … tiles. Read it the other way and it explains the square numbers 1, 4, 9, 16, …: their differences are the odd numbers 3, 5, 7, …, which go up by 2 each time. A constant **second** difference is the fingerprint of a quadratic sequence like {{n^2}}.",
    },
  ],

  history: {
    title: "Rabbits, poetry and Fibonacci",
    story:
      "In 1202 Leonardo of Pisa — later nicknamed Fibonacci — finished *Liber Abaci*, the book that helped bring the digits 0 to 9 into everyday use in Europe. Among its puzzles was one about rabbits. Start with one newborn pair. A pair takes a month to grow up, and from then on every grown-up pair produces a new pair each month. Month by month the number of pairs goes 1, 1, 2, 3, 5, 8, 13, … — each the sum of the two before.\n\nLeonardo was not the first to meet these numbers. Long before him, Indian scholars — Virahanka, more than 1,200 years ago, and Hemachandra around 1150 — found them while counting the rhythms that long and short syllables can make in poetry. The sequence only got Fibonacci's name in the 1870s, from the French mathematician Édouard Lucas.",
  },
};
