import type { TopicGuide } from "../../types.ts";

export const guide: TopicGuide = {
  id: "factors-multiples",
  title: "Factors, Multiples & Primes",
  strand: "Number",
  icon: "🧩",
  summary: "Crack any number into primes, and the HCF, LCM, squares and roots follow straight from it.",
  intro:
    "Every whole number greater than 1 is built by multiplying primes together, and there is only one way to do it. In this chapter you'll find factors and multiples quickly, break numbers into their prime 'DNA', and use it to solve problems about buses meeting, tiles fitting and square roots without guesswork.",
  guide: [
    // ------------------------------------------------------------------
    {
      id: "factors-multiples-primes",
      heading: "Factors, multiples and primes",
      discovery: {
        problem:
          "You have 24 identical square tiles. How many *different* rectangles can you make using all of them? (A 3 × 8 rectangle and an 8 × 3 rectangle count as the same.)\n\nNow try it with 23 tiles. What is special about 23?",
        idea:
          "24 tiles make four rectangles: 1 × 24, 2 × 12, 3 × 8 and 4 × 6. Each side length is a **factor** of 24, and each rectangle is a **factor pair**. 23 tiles make only one rectangle, 1 × 23, which is just a single line. A number that can only be made as '1 × itself' is **prime**.",
      },
      body:
        "A **factor** of a whole number divides into it exactly, leaving no remainder. A **multiple** of a number is that number multiplied by a whole number. They are two ways of describing the same fact:\n\n    3 × 8 = 24, so 3 and 8 are factors of 24, and 24 is a multiple of 3 and of 8.\n\n- The factors of 24 are 1, 2, 3, 4, 6, 8, 12, 24: a short list that stops at 24 itself.\n- The multiples of 24 are 24, 48, 72, 96, … and they go on for ever.\n\n**Finding every factor: work in pairs.** Two factors that multiply to give the number form a **factor pair**. Start at 1 and work upwards, writing each factor next to its partner. Stop when the pairs meet, because after that they only repeat in reverse. For 36:\n\n| Small factor | Partner |\n|---|---|\n| 1 | 36 |\n| 2 | 18 |\n| 3 | 12 |\n| 4 | 9 |\n| 6 | 6 |\n\n5 is skipped because it doesn't divide 36, and after 6 the partners just swap round. So the factors of 36 are 1, 2, 3, 4, 6, 9, 12, 18, 36.\n\n**Primes and composites.** A **prime number** has *exactly two* factors: 1 and itself. The primes below 50 are 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47. A **composite number** has more than two factors, so its tiles make more than one rectangle.\n\n- **1 is not prime.** It has only one factor, so it is neither prime nor composite.\n- **2 is the only even prime.** Every other even number also has 2 as a factor.\n- **Is it prime?** Divide by the primes 2, 3, 5, 7, 11, … and stop once the next prime squared is bigger than the number. For 91: {{7^2 = 49}} is less than 91, and 91 = 7 × 13, so 91 is composite. (If a number had a factor bigger than its square root, that factor's partner would be smaller than the square root, so you would already have found it.)\n\n**Divisibility tests** let you spot factors without dividing:\n\n| Divisible by | Test | Example |\n|---|---|---|\n| 2 | last digit is even (0, 2, 4, 6 or 8) | 3586 |\n| 3 | digit sum is a multiple of 3 | 471: 4 + 7 + 1 = 12 |\n| 4 | last two digits make a multiple of 4 | 9316: 16 = 4 × 4 |\n| 5 | last digit is 0 or 5 | 2135 |\n| 6 | passes the tests for 2 **and** 3 | 522: even, and 5 + 2 + 2 = 9 |\n| 8 | last three digits make a multiple of 8 | 7104: 104 = 8 × 13 |\n| 9 | digit sum is a multiple of 9 | 6543: 6 + 5 + 4 + 3 = 18 |\n| 10 | last digit is 0 | 4870 |",
      diagram: `<svg viewBox="0 0 480 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Every rectangle made from 24 square tiles: 1 by 24, 2 by 12, 3 by 8 and 4 by 6. 23 tiles make only a 1 by 23 rectangle."><rect x="0" y="0" width="480" height="180" fill="#ffffff"/><text x="20" y="20" font-size="13" font-family="sans-serif" fill="#1f2937" font-weight="bold">24 tiles: four rectangles</text><rect x="20" y="30" width="240" height="10" fill="#c7d2fe" stroke="#1f2937" stroke-width="1.2"/><path d="M30 30v10M40 30v10M50 30v10M60 30v10M70 30v10M80 30v10M90 30v10M100 30v10M110 30v10M120 30v10M130 30v10M140 30v10M150 30v10M160 30v10M170 30v10M180 30v10M190 30v10M200 30v10M210 30v10M220 30v10M230 30v10M240 30v10M250 30v10" stroke="#334155" stroke-width="0.6" fill="none"/><text x="270" y="39" font-size="12" font-family="sans-serif" fill="#1f2937">1 × 24</text><rect x="20" y="56" width="120" height="20" fill="#c7d2fe" stroke="#1f2937" stroke-width="1.2"/><path d="M30 56v20M40 56v20M50 56v20M60 56v20M70 56v20M80 56v20M90 56v20M100 56v20M110 56v20M120 56v20M130 56v20M20 66h120" stroke="#334155" stroke-width="0.6" fill="none"/><text x="80" y="92" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle">2 × 12</text><rect x="170" y="56" width="80" height="30" fill="#c7d2fe" stroke="#1f2937" stroke-width="1.2"/><path d="M180 56v30M190 56v30M200 56v30M210 56v30M220 56v30M230 56v30M240 56v30M170 66h80M170 76h80" stroke="#334155" stroke-width="0.6" fill="none"/><text x="210" y="102" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle">3 × 8</text><rect x="290" y="56" width="60" height="40" fill="#c7d2fe" stroke="#1f2937" stroke-width="1.2"/><path d="M300 56v40M310 56v40M320 56v40M330 56v40M340 56v40M290 66h60M290 76h60M290 86h60" stroke="#334155" stroke-width="0.6" fill="none"/><text x="320" y="112" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle">4 × 6</text><text x="20" y="144" font-size="13" font-family="sans-serif" fill="#1f2937" font-weight="bold">23 tiles: only one rectangle</text><rect x="20" y="154" width="230" height="10" fill="#fde68a" stroke="#1f2937" stroke-width="1.2"/><path d="M30 154v10M40 154v10M50 154v10M60 154v10M70 154v10M80 154v10M90 154v10M100 154v10M110 154v10M120 154v10M130 154v10M140 154v10M150 154v10M160 154v10M170 154v10M180 154v10M190 154v10M200 154v10M210 154v10M220 154v10M230 154v10M240 154v10" stroke="#334155" stroke-width="0.6" fill="none"/><text x="260" y="163" font-size="12" font-family="sans-serif" fill="#1f2937">1 × 23, so 23 is prime</text></svg>`,
      diagramCaption:
        "The sides of each rectangle are a factor pair of 24. A prime number of tiles can only make the single 1-by-n line.",
      workedExamples: [
        {
          title: "Listing factors in pairs",
          problem: "Find all the factors of 60.",
          steps: [
            "Start at 1 and find each partner: 1 × 60, 2 × 30, 3 × 20, 4 × 15, 5 × 12, 6 × 10.",
            "Test 7, 8 and 9: none of them divides 60 exactly.",
            "The next candidate, 10, is already in the list (6 × 10), so the pairs have met. Stop.",
            "Read the factors in order from the pairs.",
          ],
          answer: "1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60 (12 factors)",
          yourTurn: {
            question: "Your turn: list all the factors of 48, separated by commas.",
            answer: { type: "list", values: [1, 2, 3, 4, 6, 8, 12, 16, 24, 48] },
            solution:
              "Pairs: 1 × 48, 2 × 24, 3 × 16, 4 × 12, 6 × 8 (5 and 7 don't divide 48, and 8 is already paired). Factors: 1, 2, 3, 4, 6, 8, 12, 16, 24, 48.",
          },
        },
        {
          title: "Using divisibility tests",
          problem: "Without dividing, decide whether 7452 is divisible by 4, by 6, by 8 and by 9.",
          steps: [
            "Last two digits: 52 = 4 × 13, so 7452 **is** divisible by 4.",
            "It is even, and its digit sum is 7 + 4 + 5 + 2 = 18, a multiple of 3. It passes the 2-test and the 3-test, so it **is** divisible by 6.",
            "Last three digits: 452. Since 8 × 56 = 448, 452 leaves remainder 4, so 7452 is **not** divisible by 8.",
            "The digit sum 18 is a multiple of 9, so 7452 **is** divisible by 9.",
          ],
          answer: "Divisible by 4, 6 and 9, but not by 8.",
        },
        {
          title: "Is it prime?",
          problem: "Is 221 a prime number?",
          steps: [
            "{{14^2 = 196}} and {{15^2 = 225}}, so you only need to test the primes up to 14: 2, 3, 5, 7, 11, 13.",
            "221 is odd (not 2), its digit sum is 5 (not 3), and it doesn't end in 0 or 5 (not 5).",
            "7 × 31 = 217, remainder 4. 11 × 20 = 220, remainder 1. So not 7 or 11.",
            "221 ÷ 13 = 17 exactly.",
          ],
          answer: "No. 221 = 13 × 17, so it is composite.",
        },
      ],
      keyPoints: [
        "A factor divides exactly; a multiple is the number times a whole number. A number has only a few factors but infinitely many multiples.",
        "Find factors in pairs, working up from 1, and stop when the pairs meet.",
        "A prime has exactly two factors. 1 is not prime, and 2 is the only even prime.",
        "To test whether n is prime, only try primes p with {{p^2 <= n}}.",
      ],
      whyItWorks:
        "Why does the digit sum test for 3 and 9? Split a number by place value: 471 = 4 × 100 + 7 × 10 + 1. Since 100 = 99 + 1 and 10 = 9 + 1,\n\n    471 = (4 × 99 + 7 × 9) + (4 + 7 + 1)\n\nThe first bracket is always a multiple of 9, so also a multiple of 3. That means 471 is a multiple of 3 (or 9) exactly when its digit sum 4 + 7 + 1 is. The tests for 4 and 8 work for a similar reason: 100 is a multiple of 4 and 1000 is a multiple of 8, so only the last two (or three) digits can spoil divisibility.",
      strategies: ["Work systematically in pairs", "Use divisibility tests", "Consider extremes: stop at the square root"],
      thinkDeeper:
        "A number divisible by both 2 and 3 is always divisible by 6. Is a number divisible by both 4 and 6 always divisible by 24? Find a counterexample, then work out what must be true about two tests before you can safely combine them like this.",
    },
    // ------------------------------------------------------------------
    {
      id: "prime-factorisation",
      heading: "Prime factorisation",
      discovery: {
        problem:
          "Arjun splits 120 as 12 × 10, Wei Ling splits it as 8 × 15, and Mei splits it as 2 × 60. Each of them keeps splitting every number that can still be split, until none can.\n\nBefore you try it, predict: will they finish with the same numbers? Now check.",
        idea:
          "All three finish with 2, 2, 2, 3 and 5. However you start, the final primes are the same. Every whole number greater than 1 can be written as a product of primes in **exactly one way** (apart from the order). This is called the **Fundamental Theorem of Arithmetic**: primes are the building blocks of every whole number.",
      },
      body:
        "Writing a number as a **product of prime factors** means writing it as primes multiplied together:\n\n    {{120 = 2 * 2 * 2 * 3 * 5}}\n\nRepeated primes are shortened using **index form**. The small raised number, called the **index** or power, says how many times the prime is multiplied: {{120 = 2^3 * 3 * 5}}.\n\n**Method 1: the factor tree.** Split the number into any factor pair. Keep splitting each branch until it ends in a prime, and circle each prime as you reach it. Different trees are fine, because the circled primes always match.\n\n**Method 2: the ladder (repeated division).** Divide by the smallest prime that goes in exactly, write the answer underneath, and repeat until you reach 1. The primes down the side are the prime factors. Working from the smallest prime upwards means you can't miss one.\n\n    180 ÷ 2 = 90\n    90 ÷ 2 = 45\n    45 ÷ 3 = 15\n    15 ÷ 3 = 5\n    5 ÷ 5 = 1\n\nSo {{180 = 2^2 * 3^2 * 5}}.\n\n- Write the primes in increasing order, like {{2^2 * 3^2 * 5}}. This makes comparing two numbers much easier.\n- Never leave a composite number in the answer: {{2^2 * 45}} is not finished.\n- Check by multiplying back: 4 × 9 × 5 = 180 ✓\n\nBecause it is unique, the prime factorisation works like a number's DNA. HCFs, LCMs, square roots, cube roots and even the number of factors can all be read straight from it. That is the rest of this chapter.",
      diagram: `<svg viewBox="0 0 480 270" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A factor tree for 180 splitting into 10 and 18, then 2, 5, 2 and 9, then 9 into 3 and 3; beside it a ladder dividing 180 by 2, 2, 3, 3 and 5 to reach 1. Both give 180 = 2 squared times 3 squared times 5."><rect x="0" y="0" width="480" height="270" fill="#ffffff"/><text x="140" y="18" font-size="13" font-family="sans-serif" font-weight="bold" fill="#1f2937" text-anchor="middle">Factor tree</text><text x="395" y="18" font-size="13" font-family="sans-serif" font-weight="bold" fill="#1f2937" text-anchor="middle">Ladder</text><g stroke="#334155" stroke-width="1.5"><line x1="140" y1="56" x2="80" y2="88"/><line x1="140" y1="56" x2="200" y2="88"/><line x1="80" y1="110" x2="50" y2="140"/><line x1="80" y1="110" x2="110" y2="140"/><line x1="200" y1="110" x2="170" y2="140"/><line x1="200" y1="110" x2="230" y2="140"/><line x1="230" y1="164" x2="200" y2="194"/><line x1="230" y1="164" x2="260" y2="194"/></g><g fill="#bbf7d0" stroke="#1f2937" stroke-width="1.2"><circle cx="50" cy="153" r="14"/><circle cx="110" cy="153" r="14"/><circle cx="170" cy="153" r="14"/><circle cx="200" cy="207" r="14"/><circle cx="260" cy="207" r="14"/></g><g font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="140" y="50">180</text><text x="80" y="104">10</text><text x="200" y="104">18</text><text x="50" y="158">2</text><text x="110" y="158">5</text><text x="170" y="158">2</text><text x="230" y="158">9</text><text x="200" y="212">3</text><text x="260" y="212">3</text></g><g fill="#bbf7d0" stroke="#1f2937" stroke-width="1.2"><circle cx="345" cy="45" r="12"/><circle cx="345" cy="75" r="12"/><circle cx="345" cy="105" r="12"/><circle cx="345" cy="135" r="12"/><circle cx="345" cy="165" r="12"/></g><g stroke="#1f2937" stroke-width="1.5"><line x1="366" y1="34" x2="366" y2="178"/><line x1="366" y1="58" x2="440" y2="58"/><line x1="366" y1="88" x2="440" y2="88"/><line x1="366" y1="118" x2="440" y2="118"/><line x1="366" y1="148" x2="440" y2="148"/><line x1="366" y1="178" x2="440" y2="178"/></g><g font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="345" y="50">2</text><text x="345" y="80">2</text><text x="345" y="110">3</text><text x="345" y="140">3</text><text x="345" y="170">5</text><text x="403" y="50">180</text><text x="403" y="80">90</text><text x="403" y="110">45</text><text x="403" y="140">15</text><text x="403" y="170">5</text><text x="403" y="200">1</text></g><text x="240" y="252" font-size="14" font-family="sans-serif" font-weight="bold" fill="#1f2937" text-anchor="middle">Both give 180 = 2² × 3² × 5</text></svg>`,
      diagramCaption:
        "Two routes, one answer. The factor tree can start with any split; the ladder always divides by the smallest prime. The circled primes give {{180 = 2^2 * 3^2 * 5}} either way.",
      workedExamples: [
        {
          title: "The ladder method",
          problem: "Write 252 as a product of prime factors in index form.",
          steps: [
            "252 is even: 252 ÷ 2 = 126.",
            "126 is even: 126 ÷ 2 = 63.",
            "63 is odd, but its digit sum is 9: 63 ÷ 3 = 21, then 21 ÷ 3 = 7.",
            "7 is prime: 7 ÷ 7 = 1. The primes used are 2, 2, 3, 3, 7.",
            "Check: {{2^2 * 3^2 * 7 = 4 * 9 * 7 = 252}} ✓",
          ],
          answer: "{{252 = 2^2 * 3^2 * 7}}",
          yourTurn: {
            question:
              "Your turn: write 126 as a product of prime factors. Type the primes separated by commas, including repeats (for 12 you would type 2, 2, 3).",
            answer: { type: "list", values: [2, 3, 3, 7], display: "2, 3, 3, 7, so {{126 = 2 * 3^2 * 7}}" },
            solution: "126 ÷ 2 = 63, 63 ÷ 3 = 21, 21 ÷ 3 = 7, and 7 is prime. So {{126 = 2 * 3^2 * 7}}.",
          },
        },
        {
          title: "Splitting into friendly pieces",
          problem: "Write 2400 as a product of prime factors in index form.",
          steps: [
            "Use a factor pair you know well: 2400 = 24 × 100.",
            "{{24 = 2^3 * 3}} and {{100 = 2^2 * 5^2}}.",
            "Combine the 2s by adding the indices: {{2^3 * 2^2 = 2^5}}.",
            "Check: 32 × 3 × 25 = 96 × 25 = 2400 ✓",
          ],
          answer: "{{2400 = 2^5 * 3 * 5^2}}",
        },
        {
          title: "Reusing a factorisation",
          problem: "Given that {{720 = 2^4 * 3^2 * 5}}, write 1440 and 360 as products of prime factors in index form.",
          steps: [
            "1440 = 2 × 720, so there is one more factor of 2: {{2^5 * 3^2 * 5}}.",
            "360 = 720 ÷ 2, so there is one fewer factor of 2: {{2^3 * 3^2 * 5}}.",
          ],
          answer: "{{1440 = 2^5 * 3^2 * 5}} and {{360 = 2^3 * 3^2 * 5}}",
        },
      ],
      keyPoints: [
        "Keep splitting until every branch ends in a prime, then collect the primes.",
        "Index form: repeated primes as powers, in increasing order, e.g. {{2^3 * 3 * 5}}.",
        "Every whole number greater than 1 has exactly one prime factorisation.",
        "Always multiply back to check.",
      ],
      whyItWorks:
        "**Why does splitting always stop?** Every split makes the numbers smaller, and they can never go below 2, so the splitting must end. It can only end at primes, because anything else could be split again.\n\n**Why is the answer always the same?** It rests on a special property of primes: if a prime divides a product, it must divide one of the numbers being multiplied. (7 divides 6 × 14 = 84, and indeed 7 divides 14.) Suppose two trees for the same number ended with different lists. Take any prime p from the first list. It divides the number, which is the product of the second list, so p must divide one of those primes. A prime is only divisible by 1 and itself, so p is in the second list too. Cross it off both lists and repeat: the lists must be identical.",
      strategies: ["Draw a diagram (factor tree)", "Work systematically (smallest prime first)", "Check by multiplying back"],
      thinkDeeper:
        "Siti says {{2^3 * 3^2}} and {{6^2 * 2}} are two different prime factorisations of 72, so prime factorisation isn't unique. What has she got wrong? Then decide: can {{2^a * 3^b}} ever equal {{5^c}}, where a, b and c are whole numbers bigger than 0? Use uniqueness to explain.",
    },
    // ------------------------------------------------------------------
    {
      id: "hcf-lcm",
      heading: "HCF and LCM",
      discovery: {
        problem:
          "List the factors of 24 and of 36. Which factors appear in both lists, and which of those is the biggest?\n\nNow list the multiples of 6 and of 8 up to 60. Which appear in both lists, and which is the smallest?\n\nFinally, look at {{24 = 2^3 * 3}} and {{36 = 2^2 * 3^2}}. Can you see your first answer hiding in there?",
        idea:
          "The common factors of 24 and 36 are 1, 2, 3, 4, 6, 12, and the **highest** is 12. The common multiples of 6 and 8 (up to 60) are 24 and 48, and the **lowest** is 24. And {{12 = 2^2 * 3}} is exactly the part of the prime factors that 24 and 36 *share*. Prime factors build the HCF and LCM directly.",
      },
      body:
        "The **highest common factor (HCF)** of two numbers is the biggest number that is a factor of both. The **lowest common multiple (LCM)** is the smallest positive number that is a multiple of both. (You may also see *greatest common divisor*, or GCD, for the HCF.)\n\n**Method 1: listing.** Quick for small numbers.\n\n- HCF(18, 30): the factors of 18 are 1, 2, 3, 6, 9, 18 and the factors of 30 are 1, 2, 3, 5, 6, 10, 15, 30. The common factors are 1, 2, 3, 6, so the **HCF is 6**.\n- LCM(6, 8): list multiples of the *bigger* number (8, 16, 24, …) and stop at the first one that 6 divides. The **LCM is 24**.\n\n**Method 2: a Venn diagram of prime factors.** Best for bigger numbers. For 60 and 72:\n\n    {{60 = 2^2 * 3 * 5}}  and  {{72 = 2^3 * 3^2}}\n\n1. List each number's primes: 60 → 2, 2, 3, 5 and 72 → 2, 2, 2, 3, 3.\n2. Put the primes they **share** in the overlap, matching them off one at a time: 2, 2, 3.\n3. Put what is left in each circle's own part: 5 for 60; 2 and 3 for 72.\n4. **HCF** = product of the overlap = 2 × 2 × 3 = **12**.\n5. **LCM** = product of *everything* in the diagram = 5 × 2 × 2 × 3 × 2 × 3 = **360**.\n\n**Straight from index form**, with no diagram:\n\n- HCF: take each **shared** prime to its **lower** power: {{2^2 * 3 = 12}}.\n- LCM: take **every** prime to its **higher** power: {{2^3 * 3^2 * 5 = 360}}.\n\n**A beautiful link.** Notice that 12 × 360 = 4320 = 60 × 72. For any two whole numbers a and b:\n\n    {{HCF(a, b) * LCM(a, b) = a * b}}\n\nSo if you know three of the four values, you can find the fourth.",
      diagram: `<svg viewBox="0 0 400 252" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Venn diagram of prime factors. Left circle 60, right circle 72. Overlap contains 2, 2 and 3. Only in 60: 5. Only in 72: 2 and 3. HCF = 12, LCM = 360."><rect x="0" y="0" width="400" height="252" fill="#ffffff"/><circle cx="150" cy="115" r="85" fill="#c7d2fe" fill-opacity="0.7"/><circle cx="250" cy="115" r="85" fill="#fde68a" fill-opacity="0.7"/><g fill="none" stroke="#1f2937" stroke-width="1.5"><circle cx="150" cy="115" r="85"/><circle cx="250" cy="115" r="85"/></g><g font-family="sans-serif" fill="#1f2937"><text x="8" y="18" font-size="13">60 = 2² × 3 × 5</text><text x="392" y="18" font-size="13" text-anchor="end">72 = 2³ × 3²</text><text x="95" y="75" font-size="14" font-weight="bold" text-anchor="middle">60</text><text x="305" y="75" font-size="14" font-weight="bold" text-anchor="middle">72</text><g font-size="17" text-anchor="middle"><text x="105" y="125">5</text><text x="200" y="92">2</text><text x="200" y="122">2</text><text x="200" y="152">3</text><text x="295" y="108">2</text><text x="295" y="143">3</text></g><g font-size="13" text-anchor="middle"><text x="200" y="224" font-weight="bold">HCF = 2 × 2 × 3 = 12</text><text x="200" y="244">LCM = 5 × 2 × 2 × 3 × 2 × 3 = 360</text></g></g></svg>`,
      diagramCaption:
        "Shared primes go in the overlap. Multiply the overlap for the HCF (12); multiply everything for the LCM (360).",
      workedExamples: [
        {
          title: "HCF and LCM from prime factors",
          problem: "Find the HCF and the LCM of 84 and 120.",
          steps: [
            "Prime factorise: {{84 = 2^2 * 3 * 7}} and {{120 = 2^3 * 3 * 5}}.",
            "Shared primes are 2 (powers 2 and 3) and 3 (powers 1 and 1). Lower powers: HCF = {{2^2 * 3 = 12}}.",
            "Every prime, higher powers: LCM = {{2^3 * 3 * 5 * 7 = 840}}.",
            "Check: 12 × 840 = 10080 and 84 × 120 = 10080 ✓",
          ],
          answer: "HCF = 12, LCM = 840",
          yourTurn: {
            question: "Your turn: find the LCM of 45 and 60.",
            answer: { type: "number", value: 180 },
            solution:
              "{{45 = 3^2 * 5}} and {{60 = 2^2 * 3 * 5}}. Every prime to its higher power: {{2^2 * 3^2 * 5 = 180}}. (Check: the HCF is 15, and 15 × 180 = 2700 = 45 × 60.)",
          },
        },
        {
          title: "Working backwards",
          problem: "Two numbers have HCF 6 and LCM 180. One of the numbers is 36. Find the other.",
          steps: [
            "Use HCF × LCM = product of the numbers: 6 × 180 = 36 × b.",
            "1080 = 36 × b, so b = 1080 ÷ 36 = 30.",
            "Check: {{36 = 2^2 * 3^2}} and {{30 = 2 * 3 * 5}} give HCF {{2 * 3 = 6}} and LCM {{2^2 * 3^2 * 5 = 180}} ✓",
          ],
          answer: "30",
        },
        {
          title: "Three numbers (stretch)",
          problem: "Find the HCF and the LCM of 12, 18 and 30.",
          steps: [
            "{{12 = 2^2 * 3}}, {{18 = 2 * 3^2}} and {{30 = 2 * 3 * 5}}.",
            "HCF: primes that are in **all three**, at the lowest power: {{2 * 3 = 6}}.",
            "LCM: every prime, at the highest power: {{2^2 * 3^2 * 5 = 180}}.",
            "Careful: 6 × 180 = 1080 but 12 × 18 × 30 = 6480. The rule HCF × LCM = product only works for **two** numbers.",
          ],
          answer: "HCF = 6, LCM = 180",
        },
      ],
      keyPoints: [
        "HCF: shared primes, lower powers (the overlap of the Venn diagram).",
        "LCM: every prime, higher powers (everything in the Venn diagram).",
        "For two numbers, HCF × LCM = the product of the numbers.",
        "Sense check: the HCF divides both numbers, and both numbers divide the LCM.",
      ],
      whyItWorks:
        "A common factor can't contain more 2s than the number with fewer 2s, so the HCF takes the **lower** power of each shared prime. A common multiple must contain all the 2s, 3s, 5s, … of *both* numbers, so the LCM takes the **higher** power of each prime.\n\nFor each prime, lower power + higher power = the two original powers added together. So HCF × LCM rebuilds a × b exactly. For 60 and 72 the 2s give {{2^2}} in the HCF and {{2^3}} in the LCM, which is {{2^5}} altogether, just as in 60 × 72.",
      strategies: ["Draw a diagram (Venn)", "Use the prime factorisation", "Check with HCF × LCM = a × b"],
      thinkDeeper:
        "The same rules work for algebraic terms. Explain why the HCF of {{12x^2 y}} and {{18x y^3}} is {{6xy}}, then find their LCM. Does HCF × LCM still equal the product of the two terms?",
    },
    // ------------------------------------------------------------------
    {
      id: "hcf-lcm-problems",
      heading: "HCF and LCM problems",
      discovery: {
        problem:
          "At a bus interchange, Bus A leaves every 12 minutes and Bus B leaves every 18 minutes. Both leave at 7:00 am. When do they next leave together?\n\nSeparately: Priya has two ribbons, 84 cm and 120 cm long. She wants to cut both into pieces that are all the same length, as long as possible, with nothing wasted. How long is each piece?\n\nOne of these is an HCF problem and the other is an LCM problem. Which is which?",
        idea:
          "Bus departures happen at *multiples* of 12 and 18 minutes. The first shared one is LCM(12, 18) = 36, so they next leave together at **7:36 am**. A ribbon piece must be a *factor* of both 84 and 120, as big as possible: HCF(84, 120) = **12 cm**, giving 7 + 10 = 17 pieces. Repeating events lining up → LCM. Splitting into the largest equal pieces → HCF.",
      },
      body:
        "Real problems rarely say 'HCF' or 'LCM', so you have to decide. Ask yourself: **am I building up, or breaking down?**\n\n| Clue in the question | Use | Why |\n|---|---|---|\n| 'next time together', 'at the same time again', 'fewest packs so the amounts match' | **LCM** | You build up in steps (multiples) until both line up |\n| 'largest possible', 'greatest number of identical groups', 'cut into equal lengths with none left over', 'biggest square tile' | **HCF** | You break both amounts into equal pieces (common factors) |\n\nTypical settings:\n\n- **Timetables, flashing lights, alarms, laps:** events repeating at different intervals → LCM.\n- **Packs:** paper cups in packs of 20 and plates in packs of 15. Equal numbers need LCM(20, 15) = 60 of each, so 3 packs of cups and 4 packs of plates.\n- **Cutting and grouping:** making identical gift bags from 36 mangoes and 48 lychees, using all the fruit. HCF(36, 48) = 12 bags, each with 3 mangoes and 4 lychees.\n- **Tiles:** the largest square tile that exactly covers a rectangle has side length HCF(length, width).\n\nTwo habits win marks:\n\n1. **Answer the question asked.** The LCM may be a number of minutes, but the question may want a clock time (7:36 am) or a number of packs (60 ÷ 20 = 3 packs).\n2. **Sense-check the size.** An LCM is at least as big as the larger number; an HCF is at most the smaller number.",
      diagram: `<svg viewBox="0 0 480 165" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Timeline from 0 to 72 minutes after 7:00 am. Bus A departs at 0, 12, 24, 36, 48, 60 and 72. Bus B departs at 0, 18, 36, 54 and 72. They coincide at 0, 36 and 72 minutes."><rect x="0" y="0" width="480" height="165" fill="#ffffff"/><g fill="#bbf7d0"><rect x="28" y="38" width="24" height="96" rx="4"/><rect x="226" y="38" width="24" height="96" rx="4"/><rect x="424" y="38" width="24" height="96" rx="4"/></g><g font-family="sans-serif" font-size="12" fill="#1f2937"><circle cx="36" cy="17" r="6" fill="#bae6fd" stroke="#1f2937"/><text x="48" y="21">Bus A: every 12 min (above)</text><circle cx="266" cy="17" r="6" fill="#fde68a" stroke="#1f2937"/><text x="278" y="21">Bus B: every 18 min (below)</text></g><line x1="28" y1="86" x2="452" y2="86" stroke="#1f2937" stroke-width="1.5"/><path d="M40 82v8M73 82v8M106 82v8M139 82v8M172 82v8M205 82v8M238 82v8M271 82v8M304 82v8M337 82v8M370 82v8M403 82v8M436 82v8" stroke="#334155" stroke-width="1"/><g fill="#bae6fd" stroke="#1f2937" stroke-width="1.2"><circle cx="40" cy="68" r="6"/><circle cx="106" cy="68" r="6"/><circle cx="172" cy="68" r="6"/><circle cx="238" cy="68" r="6"/><circle cx="304" cy="68" r="6"/><circle cx="370" cy="68" r="6"/><circle cx="436" cy="68" r="6"/></g><g fill="#fde68a" stroke="#1f2937" stroke-width="1.2"><circle cx="40" cy="104" r="6"/><circle cx="139" cy="104" r="6"/><circle cx="238" cy="104" r="6"/><circle cx="337" cy="104" r="6"/><circle cx="436" cy="104" r="6"/></g><g font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle"><text x="40" y="54">0</text><text x="106" y="54">12</text><text x="172" y="54">24</text><text x="238" y="54">36</text><text x="304" y="54">48</text><text x="370" y="54">60</text><text x="436" y="54">72</text><text x="40" y="126">0</text><text x="139" y="126">18</text><text x="238" y="126">36</text><text x="337" y="126">54</text><text x="436" y="126">72</text><text x="240" y="154">minutes after 7:00 am (together at 0, 36 and 72)</text></g></svg>`,
      diagramCaption:
        "Bus A is at the stop at multiples of 12 and Bus B at multiples of 18. They line up at the common multiples 0, 36 and 72. The first one after the start is the LCM, 36.",
      workedExamples: [
        {
          title: "Together again (LCM)",
          problem:
            "On a festival float, a red light flashes every 8 seconds and a green light flashes every 12 seconds. They flash together when the show starts. After how many seconds do they next flash together?",
          steps: [
            "Red flashes at multiples of 8: 8, 16, 24, 32, …",
            "Green flashes at multiples of 12: 12, 24, 36, …",
            "'Next together' means the lowest common multiple. {{8 = 2^3}} and {{12 = 2^2 * 3}}, so LCM = {{2^3 * 3 = 24}}.",
          ],
          answer: "After 24 seconds.",
          yourTurn: {
            question:
              "Your turn: Ethan runs a lap of the track every 40 seconds and Zara runs a lap every 50 seconds. They start together on the start line. After how many seconds are they next on the start line together?",
            answer: { type: "number", value: 200, display: "200 seconds" },
            solution:
              "Ethan is on the line at multiples of 40 and Zara at multiples of 50. {{40 = 2^3 * 5}} and {{50 = 2 * 5^2}}, so LCM = {{2^3 * 5^2 = 200}} seconds. (Not 2000: that is a common multiple, but not the lowest.)",
          },
        },
        {
          title: "Largest square tile (HCF)",
          problem:
            "A kitchen floor is a rectangle 270 cm by 210 cm. It is to be covered with identical square tiles, as large as possible, with no cutting. Find the side length of each tile and the number of tiles needed.",
          steps: [
            "The tile side must divide both 270 and 210 exactly, so it is a common factor. 'As large as possible' means the HCF.",
            "{{270 = 2 * 3^3 * 5}} and {{210 = 2 * 3 * 5 * 7}}, so HCF = {{2 * 3 * 5 = 30}}.",
            "Tiles along the length: 270 ÷ 30 = 9. Tiles along the width: 210 ÷ 30 = 7.",
            "Number of tiles: 9 × 7 = 63.",
          ],
          answer: "30 cm tiles, and 63 of them.",
        },
        {
          title: "Answer the question asked",
          problem:
            "Veggie burgers come in packs of 6 and burger buns come in packs of 8. Hana wants exactly the same number of burgers and buns, buying as few packs as possible. How many packs of each should she buy?",
          steps: [
            "Burgers come in multiples of 6 and buns in multiples of 8. Equal numbers means a common multiple; fewest packs means the lowest one.",
            "LCM(6, 8) = 24, so she needs 24 burgers and 24 buns.",
            "Packs: 24 ÷ 6 = 4 packs of burgers and 24 ÷ 8 = 3 packs of buns.",
          ],
          answer: "4 packs of burgers and 3 packs of buns (the answer is not '24').",
        },
      ],
      keyPoints: [
        "Repeating events meeting again, or matching packs → LCM.",
        "Largest equal pieces, groups or tiles with nothing left over → HCF.",
        "Answer the actual question: a clock time, a number of packs, a number of tiles.",
        "Sense-check: the LCM is at least the larger number; the HCF is at most the smaller number.",
      ],
      whyItWorks:
        "In a 'together again' problem, Bus A is at the stop at 12, 24, 36, … minutes (the multiples of 12) and Bus B at the multiples of 18. Being there together means the time is in both lists, so it is a common multiple, and 'next' means the smallest: the LCM.\n\nIn a 'cutting' problem, a piece length that fits exactly into 84 cm is a factor of 84. To fit both ribbons it must be a common factor, and 'longest' means the highest: the HCF.",
      strategies: ["Draw a diagram (timeline)", "Ask: building up or breaking down?", "Estimate first (sense-check the size)"],
      thinkDeeper:
        "Three lighthouses flash every 6, 10 and 15 seconds, and they flash together at midnight. A sailor says they will next flash together after 6 × 10 × 15 = 900 seconds. Do they flash together at 900 seconds? Is it the *first* time? Find the first time, and explain why multiplying the numbers overshoots.",
    },
    // ------------------------------------------------------------------
    {
      id: "squares-cubes-from-primes",
      heading: "Squares, cubes and roots from prime factors",
      discovery: {
        problem:
          "Here are five prime factorisations: {{36 = 2^2 * 3^2}}, {{100 = 2^2 * 5^2}}, {{144 = 2^4 * 3^2}}, {{48 = 2^4 * 3}} and {{72 = 2^3 * 3^2}}.\n\nWhich of these numbers are square numbers? What do the powers of the square numbers have in common?",
        idea:
          "36, 100 and 144 are squares ({{6^2}}, {{10^2}} and {{12^2}}); 48 and 72 are not. In every square, **all the powers are even**. That's because squaring doubles every power: {{12^2 = (2^2 * 3)^2 = 2^4 * 3^2}}.",
      },
      body:
        "A **square number** is a whole number multiplied by itself, like {{12^2 = 144}}. A **cube number** is a whole number used three times in a multiplication, like {{6^3 = 216}}. The **square root** {{sqrt(n)}} undoes squaring, and the **cube root** {{cbrt(n)}} undoes cubing.\n\nSquaring a number **doubles** every power in its prime factorisation; cubing **triples** every power. So:\n\n- A whole number is a **square** exactly when every power in its prime factorisation is **even**.\n- It is a **cube** exactly when every power is a **multiple of 3**.\n\n| Number | Prime factors | Square? | Cube? |\n|---|---|---|---|\n| 144 | {{2^4 * 3^2}} | yes: powers 4 and 2 are even | no |\n| 216 | {{2^3 * 3^3}} | no | yes: both powers are 3 |\n| 64 | {{2^6}} | yes: {{8^2}} | yes: {{4^3}} |\n| 180 | {{2^2 * 3^2 * 5}} | no: 5 has power 1 | no |\n\n**Finding roots.** For a square root, *halve* every power. For a cube root, *divide every power by 3*.\n\n    {{sqrt(1764) = sqrt(2^2 * 3^2 * 7^2) = 2 * 3 * 7 = 42}}\n    {{cbrt(2744) = cbrt(2^3 * 7^3) = 2 * 7 = 14}}\n\n**Making a square or a cube.** What is the smallest whole number you can multiply 180 by to get a square? {{180 = 2^2 * 3^2 * 5}}, and only the 5 has an odd power, so multiply by one more 5: {{180 * 5 = 900 = 30^2}}. (Or *divide* by 5 to get the square 36.) To make a cube, every power must reach a multiple of 3, so you need another {{2 * 3 * 5^2 = 150}}: {{180 * 150 = 27000 = 30^3}}.",
      diagram: `<svg viewBox="0 0 480 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Left: the prime factors of 1764, which are 2, 2, 3, 3, 7, 7, sorted into two identical groups of 2, 3, 7, each multiplying to 42. Right: the prime factors of 2744, which are 2, 2, 2, 7, 7, 7, sorted into three identical groups of 2, 7, each multiplying to 14."><rect x="0" y="0" width="480" height="200" fill="#ffffff"/><line x1="240" y1="10" x2="240" y2="190" stroke="#334155" stroke-width="1" stroke-dasharray="4 4"/><g font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="120" y="20" font-size="12" font-weight="bold">Square root: two equal groups</text><text x="120" y="42" font-size="13">1764 = 2² × 3² × 7²</text><text x="360" y="20" font-size="12" font-weight="bold">Cube root: three equal groups</text><text x="360" y="42" font-size="13">2744 = 2³ × 7³</text></g><g stroke="#1f2937" stroke-width="1.2"><circle cx="50" cy="76" r="15" fill="#c7d2fe"/><circle cx="95" cy="76" r="15" fill="#fde68a"/><circle cx="140" cy="76" r="15" fill="#bbf7d0"/><circle cx="50" cy="118" r="15" fill="#c7d2fe"/><circle cx="95" cy="118" r="15" fill="#fde68a"/><circle cx="140" cy="118" r="15" fill="#bbf7d0"/><circle cx="315" cy="72" r="14" fill="#c7d2fe"/><circle cx="355" cy="72" r="14" fill="#bbf7d0"/><circle cx="315" cy="106" r="14" fill="#c7d2fe"/><circle cx="355" cy="106" r="14" fill="#bbf7d0"/><circle cx="315" cy="140" r="14" fill="#c7d2fe"/><circle cx="355" cy="140" r="14" fill="#bbf7d0"/></g><g font-family="sans-serif" font-size="14" fill="#1f2937" text-anchor="middle"><text x="50" y="81">2</text><text x="95" y="81">3</text><text x="140" y="81">7</text><text x="50" y="123">2</text><text x="95" y="123">3</text><text x="140" y="123">7</text><text x="315" y="77">2</text><text x="355" y="77">7</text><text x="315" y="111">2</text><text x="355" y="111">7</text><text x="315" y="145">2</text><text x="355" y="145">7</text></g><g font-family="sans-serif" font-size="14" fill="#1f2937"><text x="165" y="81">= 42</text><text x="165" y="123">= 42</text><text x="378" y="77">= 14</text><text x="378" y="111">= 14</text><text x="378" y="145">= 14</text></g><g font-family="sans-serif" font-size="13" font-weight="bold" fill="#1f2937" text-anchor="middle"><text x="120" y="180">√1764 = 2 × 3 × 7 = 42</text><text x="360" y="180">∛2744 = 2 × 7 = 14</text></g></svg>`,
      diagramCaption:
        "Sort the prime factors into identical groups: two groups for a square root, three for a cube root. Each group multiplies to the root.",
      workedExamples: [
        {
          title: "Square root from prime factors",
          problem: "Use prime factors to find {{sqrt(576)}}.",
          steps: [
            "Ladder: 576 → 288 → 144 → 72 → 36 → 18 → 9 is six divisions by 2, and {{9 = 3^2}}.",
            "So {{576 = 2^6 * 3^2}}. Both powers are even, so 576 is a square.",
            "Halve each power: {{sqrt(576) = 2^3 * 3 = 8 * 3 = 24}}.",
            "Check: 24 × 24 = 576 ✓",
          ],
          answer: "{{sqrt(576) = 24}}",
          yourTurn: {
            question: "Your turn: use prime factors to find {{sqrt(784)}}.",
            answer: { type: "number", value: 28 },
            solution: "{{784 = 2^4 * 7^2}}, so halving the powers gives {{sqrt(784) = 2^2 * 7 = 28}}. Check: 28 × 28 = 784.",
          },
        },
        {
          title: "Cube root from prime factors",
          problem: "Use prime factors to find {{cbrt(5832)}}.",
          steps: [
            "5832 → 2916 → 1458 → 729 is three divisions by 2, and {{729 = 3^6}}.",
            "So {{5832 = 2^3 * 3^6}}. Both powers are multiples of 3, so 5832 is a cube.",
            "Divide each power by 3: {{cbrt(5832) = 2 * 3^2 = 18}}.",
            "Check: 18 × 18 × 18 = 324 × 18 = 5832 ✓",
          ],
          answer: "{{cbrt(5832) = 18}}",
        },
        {
          title: "Smallest multiplier",
          problem:
            "Find the smallest whole number n for which 252n is a square number, and the smallest whole number m for which 252m is a cube number.",
          steps: [
            "{{252 = 2^2 * 3^2 * 7}}.",
            "Square: every power must be even. Only 7 has an odd power, so n = 7, giving {{252 * 7 = 1764 = 42^2}}.",
            "Cube: every power must be a multiple of 3. Raise {{2^2}} to {{2^3}}, {{3^2}} to {{3^3}} and 7 to {{7^3}} by multiplying by {{2 * 3 * 7^2 = 294}}.",
            "Check: {{252 * 294 = 74088 = 42^3}} ✓",
          ],
          answer: "n = 7 and m = 294",
        },
      ],
      keyPoints: [
        "Square: every prime power is even. Cube: every prime power is a multiple of 3.",
        "Square root: halve every power. Cube root: divide every power by 3.",
        "To make a square, multiply by each prime that has an odd power.",
        "Check by squaring or cubing your root.",
      ],
      whyItWorks:
        "Squaring means multiplying a number by itself, so every prime appears twice as often. If {{n = 2^a * 3^b}} then {{n^2 = 2^(2a) * 3^(2b)}}: every power is doubled, so every power is even.\n\nGoing backwards, if every power is even you can deal the primes into two identical halves, like dealing cards to two players. Each half multiplies to the same number, and that number times itself gives the original, so it is the square root. Dealing into three identical groups works the same way for cubes.",
      strategies: ["Use the prime factorisation", "Split into equal groups", "Check by substituting (square or cube your answer)"],
      thinkDeeper:
        "Apart from 1, which is the smallest number that is both a square and a cube? What must be true of the powers in its prime factorisation? Use your answer to find the next such number.",
    },
    // ------------------------------------------------------------------
    {
      id: "counting-factors",
      heading: "Counting factors",
      discovery: {
        problem:
          "Count the factors of 12, 16, 18, 25 and 36. Which of them have an *odd* number of factors, and what do those numbers have in common?\n\nThen a harder one: {{72 = 2^3 * 3^2}}. Can you predict how many factors 72 has *without* listing them?",
        idea:
          "12 and 18 have 6 factors each, but 16, 25 and 36 have 5, 3 and 9 factors: odd counts. They are exactly the **square numbers**. As for 72, every factor uses 0, 1, 2 or 3 twos (4 choices) and 0, 1 or 2 threes (3 choices), so there are 4 × 3 = **12** factors.",
      },
      body:
        "**Stretch:** this looks ahead to Year 9, but it only uses what you already know.\n\nEvery factor of a number is built from *some* of its prime factors. Take {{72 = 2^3 * 3^2}}. A factor of 72 can contain:\n\n- 0, 1, 2 or 3 twos ({{2^0, 2^1, 2^2, 2^3}}), which is **4** choices, and\n- 0, 1 or 2 threes ({{3^0, 3^1, 3^2}}), which is **3** choices.\n\nEvery choice of twos can go with every choice of threes, so 72 has 4 × 3 = **12** factors. The '+ 1' in each count comes from the choice of *none*, because {{2^0 = 1}}.\n\n> **Rule.** If {{n = p^a * q^b * r^c * …}}, where p, q, r, … are different primes, then n has {{(a + 1)(b + 1)(c + 1) …}} factors.\n\nFor example, {{360 = 2^3 * 3^2 * 5}} has (3 + 1)(2 + 1)(1 + 1) = 4 × 3 × 2 = 24 factors.\n\n**Why squares have an odd number of factors.** Factors come in pairs that multiply to the number. For 36 the pairs are 1 × 36, 2 × 18, 3 × 12, 4 × 9 and 6 × 6. Pairs give an even count, except that 6 partners *itself*, so it is only counted once. Only a square has a factor that partners itself, so **only square numbers have an odd number of factors**. The rule agrees: a square has all powers even, so every bracket (a + 1) is odd, and odd × odd × … is odd.\n\n- A prime p has (1 + 1) = 2 factors.\n- The square of a prime, like 4, 9, 25 or 49, has exactly 3 factors: 1, p and {{p^2}}.",
      diagram: `<svg viewBox="0 0 370 248" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Grid of the factors of 72. Rows are powers of 2: 1, 2, 4, 8. Columns are powers of 3: 1, 3, 9. The cells are 1, 3, 9; 2, 6, 18; 4, 12, 36; 8, 24, 72. Four rows times three columns gives 12 factors."><rect x="0" y="0" width="370" height="248" fill="#ffffff"/><g font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle"><text x="245" y="22" font-style="italic">powers of 3</text><text x="40" y="140" font-style="italic" transform="rotate(-90 40 140)">powers of 2</text></g><g stroke="#1f2937" stroke-width="1.2"><rect x="60" y="32" width="80" height="36" fill="#ffffff"/><rect x="140" y="32" width="70" height="36" fill="#fde68a"/><rect x="210" y="32" width="70" height="36" fill="#fde68a"/><rect x="280" y="32" width="70" height="36" fill="#fde68a"/><rect x="60" y="68" width="80" height="36" fill="#fde68a"/><rect x="60" y="104" width="80" height="36" fill="#fde68a"/><rect x="60" y="140" width="80" height="36" fill="#fde68a"/><rect x="60" y="176" width="80" height="36" fill="#fde68a"/><rect x="140" y="68" width="210" height="144" fill="#c7d2fe"/></g><path d="M210 68v144M280 68v144M140 104h210M140 140h210M140 176h210" stroke="#1f2937" stroke-width="1.2"/><g font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle"><text x="100" y="55">×</text><text x="175" y="55">1 = 3⁰</text><text x="245" y="55">3 = 3¹</text><text x="315" y="55">9 = 3²</text><text x="100" y="91">1 = 2⁰</text><text x="100" y="127">2 = 2¹</text><text x="100" y="163">4 = 2²</text><text x="100" y="199">8 = 2³</text></g><g font-family="sans-serif" font-size="15" fill="#1f2937" text-anchor="middle"><text x="175" y="91">1</text><text x="245" y="91">3</text><text x="315" y="91">9</text><text x="175" y="127">2</text><text x="245" y="127">6</text><text x="315" y="127">18</text><text x="175" y="163">4</text><text x="245" y="163">12</text><text x="315" y="163">36</text><text x="175" y="199">8</text><text x="245" y="199">24</text><text x="315" y="199">72</text></g><text x="205" y="236" font-family="sans-serif" font-size="13" font-weight="bold" fill="#1f2937" text-anchor="middle">4 rows × 3 columns = 12 factors of 72</text></svg>`,
      diagramCaption:
        "Every factor of {{72 = 2^3 * 3^2}} is a power of 2 times a power of 3. Four choices for the 2s and three for the 3s give a 4 × 3 grid: 12 factors.",
      workedExamples: [
        {
          title: "Counting with the rule",
          problem: "How many factors does 200 have?",
          steps: [
            "{{200 = 2^3 * 5^2}}.",
            "A factor uses 0 to 3 twos (4 choices) and 0 to 2 fives (3 choices).",
            "Number of factors = (3 + 1)(2 + 1) = 4 × 3 = 12.",
            "Check by listing: 1, 2, 4, 5, 8, 10, 20, 25, 40, 50, 100, 200. That's twelve ✓",
          ],
          answer: "12 factors",
          yourTurn: {
            question: "Your turn: how many factors does 180 have?",
            answer: { type: "number", value: 18 },
            solution: "{{180 = 2^2 * 3^2 * 5}}, so the number of factors is (2 + 1)(2 + 1)(1 + 1) = 3 × 3 × 2 = 18.",
          },
        },
        {
          title: "Working backwards from a factor count",
          problem: "Find the smallest number that has exactly 6 factors.",
          steps: [
            "6 can be made as 6 or as 3 × 2, so the number is either {{p^5}} or {{p^2 * q}}, where p and q are different primes.",
            "Smallest of the form {{p^5}}: {{2^5 = 32}}.",
            "Smallest of the form {{p^2 * q}}: give the bigger power to the smallest prime, {{2^2 * 3 = 12}}.",
            "12 is smaller than 32, and 12 has factors 1, 2, 3, 4, 6, 12, which is six ✓",
          ],
          answer: "12",
        },
      ],
      keyPoints: [
        "If {{n = p^a * q^b * …}}, the number of factors is {{(a + 1)(b + 1) …}}.",
        "Add 1 to each power because 'none of this prime' (power 0) is also a choice.",
        "Square numbers, and only square numbers, have an odd number of factors.",
        "Primes have exactly 2 factors; squares of primes have exactly 3.",
      ],
      whyItWorks:
        "Make a grid: powers of 2 (1, 2, 4, 8) down the side and powers of 3 (1, 3, 9) along the top, and multiply to fill each cell. Every cell is a factor of 72. Every factor of 72 appears exactly once, because each factor has its own unique prime factorisation, so it sits in exactly one row and one column. The grid has 4 rows and 3 columns, so there are 4 × 3 = 12 cells: 12 factors. A third prime would simply add a third direction, like turning the grid into a box.",
      strategies: ["Count the choices", "Draw a diagram (factor grid)", "Try small cases"],
      thinkDeeper:
        "**The locker puzzle.** A corridor has 100 closed lockers numbered 1 to 100. Student 1 opens every locker. Student 2 changes every 2nd locker (opening it if closed, closing it if open), student 3 changes every 3rd locker, and so on up to student 100. Which lockers end up open? Hint: which students touch locker 12, and which touch locker 36?",
    },
  ],
  learn: {
    flashcards: [
      { front: "What is a factor?", back: "A whole number that divides another exactly. The factors of 12 are 1, 2, 3, 4, 6 and 12." },
      { front: "What is a multiple?", back: "A number times a whole number. The multiples of 7 are 7, 14, 21, 28, …" },
      { front: "What is a prime number?", back: "A whole number with exactly two factors, 1 and itself: 2, 3, 5, 7, 11, 13, …" },
      { front: "Is 1 a prime number?", back: "No. It has only one factor, so it is neither prime nor composite." },
      { front: "Which is the only even prime?", back: "2. Every other even number has 2 as an extra factor." },
      { front: "Divisibility tests for 3 and 9", back: "Add the digits. If the digit sum is a multiple of 3 (or 9), so is the number." },
      { front: "Divisibility tests for 4 and 8", back: "4: the last two digits make a multiple of 4. 8: the last three digits make a multiple of 8." },
      { front: "When is a number divisible by 6?", back: "When it passes the tests for both 2 and 3: it is even and its digit sum is a multiple of 3." },
      { front: "360 as a product of prime factors", back: "{{360 = 2^3 * 3^2 * 5}}" },
      { front: "HCF from prime factors", back: "Shared primes, lower powers: the overlap of the Venn diagram." },
      { front: "LCM from prime factors", back: "Every prime, higher powers: everything in the Venn diagram." },
      { front: "HCF × LCM for two numbers", back: "It equals the product of the two numbers: {{HCF(a, b) * LCM(a, b) = a * b}}." },
      { front: "'Next time together' or 'largest equal pieces': which is which?", back: "Together again → LCM. Largest equal pieces, groups or tiles → HCF." },
      { front: "How can you tell from prime factors that a number is a square?", back: "Every power is even, e.g. {{3600 = 2^4 * 3^2 * 5^2}}." },
      { front: "{{sqrt(2^4 * 3^2 * 5^2)}}", back: "Halve each power: {{2^2 * 3 * 5 = 60}}." },
      { front: "Stretch: how many factors does {{2^3 * 3^2}} have?", back: "(3 + 1)(2 + 1) = 12 factors." },
    ],
    mustKnow: [
      "I can list all the factors of a number using factor pairs, and list its multiples.",
      "I can explain why 1 is not prime and why 2 is the only even prime.",
      "I can decide whether a number is prime by testing primes up to its square root.",
      "I can use divisibility tests for 2, 3, 4, 5, 6, 8, 9 and 10.",
      "I can write a number as a product of prime factors in index form, using a factor tree or the ladder method.",
      "I can find the HCF and LCM of two numbers by listing and by using a Venn diagram of prime factors.",
      "I can use HCF × LCM = a × b to find a missing number.",
      "I can decide whether a word problem needs the HCF or the LCM, and answer the question that was actually asked.",
      "I can use prime factors to decide whether a number is a square or a cube, and to find its square root or cube root.",
      "I can find the smallest number to multiply by to make a square or a cube.",
      "Stretch: I can count the factors of a number from its prime factorisation.",
    ],
    misconceptions: [
      {
        wrong: "1 is a prime number.",
        right: "A prime has exactly two factors. 1 has only one factor, so it is not prime (and not composite either).",
      },
      {
        wrong: "All odd numbers are prime.",
        right: "9, 15, 21 and 91 are odd but composite (91 = 7 × 13). And 2 is prime but even.",
      },
      {
        wrong: "The LCM of two numbers is always their product.",
        right: "Only when they share no prime factors, like 4 and 9 (LCM 36). LCM(6, 8) is 24, not 48.",
      },
      {
        wrong: "'Highest' common factor means the HCF can be bigger than the numbers.",
        right: "The HCF is a factor, so it is at most the smaller number. The LCM is a multiple, so it is at least the larger number.",
      },
      {
        wrong: "{{2^2 * 3 * 15}} is the prime factorisation of 180.",
        right: "15 is not prime. Split it into 3 × 5 to get {{180 = 2^2 * 3^2 * 5}}.",
      },
      {
        wrong: "If the digits add up to a multiple of 4, the number is divisible by 4.",
        right: "The digit-sum test only works for 3 and 9. For 4, check the last two digits: 316 is divisible by 4 because 16 is.",
      },
    ],
    examMistakes: [
      "Leaving a composite number in a prime factorisation, such as {{2^2 * 9 * 5}}.",
      "Writing the answer as a list or with + signs when the question asks for a product of primes in index form.",
      "Giving the HCF when the question needs the LCM (or the reverse). Decide 'building up or breaking down?' first.",
      "Stopping at the LCM when the question asks for a clock time or a number of packs, e.g. writing 36 instead of 7:36 am.",
      "Missing a factor pair when listing factors. Work upwards from 1 and stop only when the pairs meet.",
      "Using HCF × LCM = product for three numbers. It only works for two.",
      "Halving the number instead of halving the powers when finding a square root from prime factors.",
      "Not checking by multiplying the primes back together.",
    ],
    mnemonics: [
      {
        topic: "Factors vs multiples",
        device: "Factors Fit in; Multiples Make more",
        explanation:
          "Factors fit into the number, so they are never bigger than it. Multiples are made by multiplying, so they are never smaller than it.",
      },
      {
        topic: "HCF and LCM in a Venn diagram",
        device: "HCF is the Heart; LCM is the Lot",
        explanation: "Multiply the primes in the heart (the overlap) for the HCF. Multiply the lot (everything in the diagram) for the LCM.",
      },
      {
        topic: "Which powers to take",
        device: "HCF takes the lows, LCM takes the highs",
        explanation:
          "It feels backwards, which is why it sticks: the *Highest* common factor uses the *lowest* power of each shared prime; the *Lowest* common multiple uses the *highest* power of every prime.",
      },
      {
        topic: "Tests for 2, 4 and 8",
        device: "2, 4, 8: check the last 1, 2, 3",
        explanation:
          "{{2 = 2^1}}, {{4 = 2^2}} and {{8 = 2^3}}, and the power tells you how many final digits to check: the last digit for 2, the last two for 4, the last three for 8.",
      },
    ],
    realWorld: [
      {
        title: "Bus and train timetables",
        detail:
          "Two bus services leaving an interchange every 12 and 18 minutes leave together every LCM(12, 18) = 36 minutes. Planners use this to time connections.",
        emoji: "🚌",
      },
      {
        title: "Internet security",
        detail:
          "Secure websites and online banking use RSA encryption, which relies on a simple fact: multiplying two huge primes is easy, but splitting the answer back into its primes is extraordinarily hard.",
        emoji: "🔐",
      },
      {
        title: "Gears",
        detail:
          "A 12-tooth gear meshing with an 18-tooth gear returns to its starting position after LCM(12, 18) = 36 teeth have passed. Engineers often choose tooth counts with HCF 1 so that every tooth meets every other tooth and wear spreads evenly.",
        emoji: "⚙️",
      },
      {
        title: "Periodical cicadas",
        detail:
          "Some North American cicadas emerge only every 13 or 17 years, both primes. Biologists think a prime cycle rarely lines up with predators' shorter cycles, because the LCM is so large.",
        emoji: "🦗",
      },
      {
        title: "Tiling a floor",
        detail: "The largest square tile that covers a rectangular floor with no cutting has side length equal to the HCF of the floor's length and width.",
        emoji: "🧱",
      },
      {
        title: "Rhythm and music",
        detail:
          "One drummer repeats a 3-beat pattern while another repeats a 4-beat pattern. They start together again every LCM(3, 4) = 12 beats, which is the idea behind polyrhythms.",
        emoji: "🥁",
      },
    ],
    videos: [
      {
        title: "Prime factor decomposition",
        channel: "Corbettmaths",
        url: "https://www.youtube.com/results?search_query=corbettmaths+prime+factor+decomposition",
      },
      {
        title: "HCF and LCM using Venn diagrams",
        channel: "Maths Genie",
        url: "https://www.youtube.com/results?search_query=maths+genie+hcf+and+lcm+venn+diagram",
      },
      {
        title: "Divisibility tests",
        channel: "Khan Academy",
        url: "https://www.youtube.com/results?search_query=khan+academy+divisibility+tests",
      },
      {
        title: "Why prime numbers matter",
        channel: "Numberphile",
        url: "https://www.youtube.com/results?search_query=numberphile+prime+numbers",
      },
    ],
    formulas: [
      { name: "HCF × LCM", formula: "{{HCF(a, b) * LCM(a, b) = a * b}}", note: "For two numbers only." },
      {
        name: "HCF from prime factors",
        formula: "{{HCF(2^3 * 3, 2^2 * 3^2) = 2^2 * 3 = 12}}",
        note: "Shared primes, lower powers (HCF of 24 and 36).",
      },
      {
        name: "LCM from prime factors",
        formula: "{{LCM(2^3 * 3, 2^2 * 3^2) = 2^3 * 3^2 = 72}}",
        note: "Every prime, higher powers (LCM of 24 and 36).",
      },
      { name: "Testing for a prime", formula: "Test primes p with {{p^2 <= n}}", note: "If none divides n, then n is prime." },
      { name: "Square root from prime factors", formula: "{{sqrt(2^(2a) * 3^(2b)) = 2^a * 3^b}}", note: "Halve every power." },
      { name: "Cube root from prime factors", formula: "{{cbrt(2^(3a) * 3^(3b)) = 2^a * 3^b}}", note: "Divide every power by 3." },
      {
        name: "Number of factors (stretch)",
        formula: "{{n = p^a * q^b}} has {{(a + 1)(b + 1)}} factors",
        note: "p and q are different primes; extend with one bracket per prime.",
      },
    ],
  },
};
