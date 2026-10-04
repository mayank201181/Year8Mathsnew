// Factors, Multiples & Primes — Practice Papers 3 and 4.
// Paper 3: problem solving in context and multi-step questions.
// Paper 4: exam style — linked parts, diagrams/tables and reasoning.
import type { Paper } from "../../types.ts";

export const morePapers: Paper[] = [
  // =========================================================================
  // PRACTICE PAPER 3 — problem solving in context
  // =========================================================================
  {
    id: "factors-multiples-p3",
    title: "Practice Paper 3",
    questions: [
      {
        kind: "short",
        id: "factors-multiples-p3-q01",
        question:
          "Marcus's locker code is a two-digit **prime** number. Its two digits add up to 10, and its first digit is bigger than its second digit. What is the code?",
        answer: { type: "number", value: 73 },
        solution: [
          "List the two-digit numbers whose digits add up to 10: 19, 28, 37, 46, 55, 64, 73, 82, 91.",
          "Keep only those whose first digit is bigger than the second: 64, 73, 82, 91.",
          "64 and 82 are even, so they are not prime. 91 = 7 × 13, so it is not prime either.",
          "73 is not divisible by 2, 3, 5 or 7, and {{9^2 = 81}} is bigger than 73, so there are no more primes to test. 73 is prime — the code is 73.",
        ],
        commonError: "Choosing 91. It looks prime, but 91 = 7 × 13.",
        traps: [
          { spec: { type: "number", value: 91 }, feedback: "91 looks prime, but 91 = 7 × 13. Try another number on your list." },
          { spec: { type: "number", value: 37 }, feedback: "37 is prime and its digits add up to 10 — but its first digit is smaller than its second." },
        ],
        difficulty: "warmup",
        guideRef: "factors-multiples-primes",
        hints: [
          "Start by listing every two-digit number whose digits add up to 10.",
          "Cross out any where the first digit isn't bigger, then any that are even. Test what's left for 3 and 7.",
        ],
        strategy: "Eliminate options",
      },
      {
        kind: "short",
        id: "factors-multiples-p3-q02",
        question:
          "A Sentosa treasure-hunt card says: \"Walk {{2^4 * 3^2 * 5}} steps from the fountain.\" How many steps is that?",
        answer: { type: "number", value: 720, display: "720 steps" },
        solution: [
          "{{2^4 = 2 * 2 * 2 * 2 = 16}} and {{3^2 = 3 * 3 = 9}}.",
          "16 × 9 = 144.",
          "144 × 5 = 720 steps.",
        ],
        commonError: "Reading {{2^4}} as 2 × 4 = 8 and {{3^2}} as 3 × 2 = 6, which gives 8 × 6 × 5 = 240.",
        traps: [
          {
            spec: { type: "number", value: 240 },
            feedback: "It looks like you worked out 2 × 4 and 3 × 2. The index says how many 2s to multiply together: {{2^4 = 2 * 2 * 2 * 2 = 16}}.",
          },
        ],
        difficulty: "warmup",
        guideRef: "prime-factorisation",
        hints: ["Work out each power on its own first. What is {{2^4}}? What is {{3^2}}?"],
      },
      {
        kind: "short",
        id: "factors-multiples-p3-q03",
        question:
          "Hana waters her basil every 4 days and her orchid every 6 days. She waters both plants on 1 March. On what date in March will she next water both on the same day? Give just the day number (for example, 20 for 20 March).",
        answer: { type: "number", value: 13, display: "13 March" },
        solution: [
          "Basil days: 1, 5, 9, 13, … March. Orchid days: 1, 7, 13, … March.",
          "The gap until the lists match is the LCM of 4 and 6, which is 12 days.",
          "1 March + 12 days = 13 March.",
        ],
        commonError: "Answering 12. That is how many days later, not the date.",
        traps: [
          { spec: { type: "number", value: 12 }, feedback: "12 is how many days later. Count on 12 days from 1 March." },
          { spec: { type: "number", value: 25 }, feedback: "24 days is a common multiple of 4 and 6, but not the lowest one. There is an earlier date." },
        ],
        difficulty: "warmup",
        guideRef: "hcf-lcm",
        hints: [
          "List the watering dates for each plant, starting at 1 March.",
          "Look for the first date after 1 March that is in both lists.",
        ],
        strategy: "Find a pattern",
      },
      {
        kind: "short",
        id: "factors-multiples-p3-q04",
        question:
          "A florist has 42 roses and 70 sunflowers. She makes identical bouquets — every bouquet has the same number of roses and the same number of sunflowers — and she uses every flower. She makes the greatest possible number of bouquets. How many flowers are in each bouquet?",
        answer: { type: "number", value: 8, display: "8 flowers (3 roses and 5 sunflowers)" },
        solution: [
          "The number of bouquets must divide 42 **and** 70 exactly, so it is a common factor — the greatest one.",
          "{{42 = 2 * 3 * 7}} and {{70 = 2 * 5 * 7}}, so HCF = 2 × 7 = 14 bouquets.",
          "Each bouquet has 42 ÷ 14 = 3 roses and 70 ÷ 14 = 5 sunflowers.",
          "That is 3 + 5 = 8 flowers in each bouquet.",
        ],
        commonError: "Stopping at 14. That is the number of bouquets, not the number of flowers in each one.",
        traps: [
          { spec: { type: "number", value: 14 }, feedback: "14 is the number of bouquets. How many roses and sunflowers go into each one?" },
          {
            spec: { type: "number", value: 210 },
            feedback: "210 is the LCM. You are sharing the flowers out, so you need a number that divides both 42 and 70.",
          },
        ],
        difficulty: "warmup",
        guideRef: "hcf-lcm-problems",
        hints: [
          "First find the greatest number of bouquets: it must divide into both 42 and 70.",
          "Then share the roses and the sunflowers equally between those bouquets.",
        ],
        strategy: "Use prime factors",
      },
      {
        kind: "short",
        id: "factors-multiples-p3-q05",
        question:
          "Arjun is thinking of a number between 50 and 100.\n\n- It is a multiple of 7.\n- It is one more than a multiple of 5.\n- It is odd.\n\nWhat is Arjun's number?",
        answer: { type: "number", value: 91 },
        solution: [
          "Multiples of 7 between 50 and 100: 56, 63, 70, 77, 84, 91, 98.",
          "One more than a multiple of 5 means the last digit is 1 or 6. That leaves 56 and 91.",
          "The number is odd, so it is 91. (Notice that 91 is a multiple of 7 — which is exactly why it isn't prime.)",
        ],
        traps: [{ spec: { type: "number", value: 56 }, feedback: "56 is a multiple of 7 and one more than 55 — but it is even." }],
        difficulty: "warmup",
        guideRef: "factors-multiples-primes",
        hints: [
          "List the multiples of 7 between 50 and 100.",
          "Numbers that are one more than a multiple of 5 end in which digits?",
        ],
        strategy: "Eliminate options",
      },
      {
        kind: "short",
        id: "factors-multiples-p3-q06",
        question:
          "Siti has baked 4572 pineapple tarts for a school fair. She will pack all of them in boxes of one size: 4, 6, 8 or 9 tarts per box. Which box sizes leave **no** tarts left over? Use divisibility tests, and list every box size that works.",
        answer: { type: "list", values: [4, 6, 9], display: "4, 6 and 9" },
        solution: [
          "**4:** look at the last two digits. 72 ÷ 4 = 18, so 4 works.",
          "**6:** it must pass the tests for 2 **and** 3. 4572 is even, and its digit sum is 4 + 5 + 7 + 2 = 18, a multiple of 3. So 6 works.",
          "**8:** look at the last three digits. 572 ÷ 8 = 71.5, so 8 does **not** work.",
          "**9:** the digit sum, 18, is a multiple of 9, so 9 works.",
          "Boxes of 4, 6 or 9 leave nothing over.",
        ],
        commonError: "Testing 8 with only the last two digits (72 ÷ 8 = 9). The test for 8 uses the last **three** digits.",
        traps: [
          {
            spec: { type: "list", values: [4, 6, 8, 9] },
            feedback: "Check 8 again: its test uses the last three digits, and 572 ÷ 8 = 71.5.",
          },
        ],
        difficulty: "core",
        guideRef: "factors-multiples-primes",
        hints: [
          "Each box size has its own quick test — you don't need to do the full division.",
          "4 and 8 use the last two and last three digits; 9 uses the digit sum; 6 needs two tests at once.",
          "The digit sum is 18. Which tests does that settle straight away?",
        ],
        strategy: "Split into cases",
      },
      {
        kind: "short",
        id: "factors-multiples-p3-q07",
        question:
          "The ages of three sisters multiply to give 2431. Each age is a whole number of years, greater than 1. What is the sum of their ages?",
        answer: { type: "number", value: 41 },
        solution: [
          "Test primes in order. 2431 is odd (not 2), its digit sum is 10 (not 3), it doesn't end in 0 or 5 (not 5), and 7 × 347 = 2429 (not 7).",
          "2431 ÷ 11 = 221, so 11 is a factor.",
          "221 ÷ 13 = 17, so {{2431 = 11 * 13 * 17}}.",
          "There are exactly three prime factors and every age is more than 1, so the ages must be 11, 13 and 17.",
          "Sum = 11 + 13 + 17 = 41.",
        ],
        commonError: "Stopping at 2431 = 11 × 221. 221 is not prime: 221 = 13 × 17.",
        traps: [
          { spec: { type: "number", value: 232 }, feedback: "221 isn't prime: 221 = 13 × 17. And there are three sisters, so you need three ages." },
        ],
        difficulty: "core",
        guideRef: "prime-factorisation",
        hints: [
          "Find the prime factorisation of 2431. Try dividing by 2, 3, 5, 7, 11, … in turn.",
          "2431 ÷ 11 is a whole number. Is the answer prime?",
          "Once you have three primes, explain to yourself why the ages can't be anything else.",
        ],
        strategy: "Use prime factors",
      },
      {
        kind: "short",
        id: "factors-multiples-p3-q08",
        question:
          "Jun builds a tower from 15 cm blocks. Wei Ling builds a tower next to it from 18 cm blocks. They want their towers to be exactly the same height, and as short as possible. How many blocks do they use **altogether**?",
        answer: { type: "number", value: 11, display: "11 blocks" },
        solution: [
          "Each height must be a multiple of the block size, so the shared height is the LCM of 15 and 18.",
          "{{15 = 3 * 5}} and {{18 = 2 * 3^2}}, so LCM = {{2 * 3^2 * 5 = 90}} cm.",
          "Jun: 90 ÷ 15 = 6 blocks. Wei Ling: 90 ÷ 18 = 5 blocks.",
          "Altogether 6 + 5 = 11 blocks.",
        ],
        solutions: [
          {
            label: "List multiples of the bigger number",
            steps: [
              "Multiples of 18: 18, 36, 54, 72, 90, …",
              "The first one that is also a multiple of 15 is 90.",
              "6 + 5 = 11 blocks. Listing the bigger number's multiples is quicker, because there are fewer of them to check.",
            ],
          },
        ],
        commonError: "Using 15 × 18 = 270 cm. That is a common height, but not the lowest one.",
        traps: [
          { spec: { type: "number", value: 90 }, feedback: "90 cm is the height of each tower. How many blocks is that for each of them?" },
          { spec: { type: "number", value: 33 }, feedback: "That uses a height of 15 × 18 = 270 cm. It works, but a shorter shared height exists." },
        ],
        difficulty: "core",
        guideRef: "hcf-lcm",
        hints: [
          "The height of each tower must be a multiple of its block size.",
          "Find the smallest height that is a multiple of both 15 and 18.",
          "The LCM is 90 cm. How many blocks does each person need?",
        ],
        strategy: "Use prime factors",
      },
      {
        kind: "short",
        id: "factors-multiples-p3-q09",
        question:
          "For a school assembly, 84 Year 7 pupils and 108 Year 8 pupils sit in rows. Every row has the same number of pupils, and each row holds pupils from only one year group. What is the fewest number of rows they can use?",
        answer: { type: "number", value: 16, display: "16 rows" },
        solution: [
          "Fewest rows means as many pupils as possible in each row.",
          "The row size must divide 84 and 108 exactly, so the largest possible row size is the HCF of 84 and 108.",
          "{{84 = 2^2 * 3 * 7}} and {{108 = 2^2 * 3^3}}, so HCF = {{2^2 * 3 = 12}} pupils per row.",
          "Year 7: 84 ÷ 12 = 7 rows. Year 8: 108 ÷ 12 = 9 rows.",
          "Fewest rows = 7 + 9 = 16.",
        ],
        commonError: "Giving the row size (12) instead of the number of rows.",
        traps: [
          { spec: { type: "number", value: 12 }, feedback: "12 is the number of pupils in each row. How many rows is that altogether?" },
          { spec: { type: "number", value: 32 }, feedback: "Rows of 6 work, but longer rows are possible. Use the **highest** common factor of 84 and 108." },
        ],
        difficulty: "core",
        guideRef: "hcf-lcm-problems",
        hints: [
          "To use as few rows as possible, should each row be long or short?",
          "The number in each row must divide both 84 and 108. Which common factor do you want?",
          "The HCF of 84 and 108 is 12. How many rows does each year group need?",
        ],
        strategy: "Use prime factors",
      },
      {
        kind: "written",
        id: "factors-multiples-p3-q10",
        question:
          "Aisha has two ribbons, 90 cm and 150 cm long. She wants to cut **both** ribbons into pieces that are all the same length, as long as possible, with nothing left over.\n\nShe says:\n\n> \"This is an LCM problem. The LCM of 90 and 150 is 450, so each piece should be 450 cm.\"\n\n(a) Explain why Aisha is wrong.\n\n(b) Find the length of each piece and the total number of pieces.",
        marks: 3,
        modelAnswer:
          "(a) Each piece has to fit exactly into 90 cm **and** into 150 cm, so its length must be a **factor** of both numbers — a common factor, not a common multiple. A 450 cm piece is longer than either ribbon, so it can't even be cut from them. This is an HCF problem.\n\n(b) {{90 = 2 * 3^2 * 5}} and {{150 = 2 * 3 * 5^2}}, so HCF = 2 × 3 × 5 = 30. Each piece is 30 cm long. 90 ÷ 30 = 3 and 150 ÷ 30 = 5, so there are 3 + 5 = 8 pieces.",
        markScheme: [
          {
            point: "Explains the piece length must divide both ribbon lengths (a common factor / HCF), e.g. 450 cm is longer than the ribbons",
            keywords: ["factor", "hcf", "divide", "longer", "too long", "highest common factor"],
          },
          { point: "Each piece is 30 cm (the HCF of 90 and 150)", keywords: ["30"] },
          { point: "Total of 8 pieces (3 + 5)", keywords: ["8 pieces", "eight", "3 + 5", "8"] },
        ],
        commonError: "Giving the number of pieces as 30 — that is the length of each piece.",
        difficulty: "core",
        guideRef: "hcf-lcm-problems",
        hints: [
          "Could a piece that is longer than the ribbon ever be cut from it?",
          "The piece length must go into 90 **and** 150 exactly. Is that a factor or a multiple?",
          "Find the HCF of 90 and 150 using prime factors, then count the pieces from each ribbon.",
        ],
        strategy: "Spot the error",
      },
      {
        kind: "short",
        id: "factors-multiples-p3-q11",
        question:
          "A festive light display on Orchard Road has three strings of lights. The red lights flash every 6 seconds, the gold lights every 8 seconds and the white lights every 10 seconds. All three flash together at exactly 7:00 pm. Counting that flash, how many times do all three flash together from 7:00 pm up to and including 7:10 pm?",
        answer: { type: "number", value: 6 },
        solution: [
          "All three flash together every LCM(6, 8, 10) seconds.",
          "{{6 = 2 * 3}}, {{8 = 2^3}} and {{10 = 2 * 5}}, so LCM = {{2^3 * 3 * 5 = 120}} seconds = 2 minutes.",
          "They flash together at 7:00, 7:02, 7:04, 7:06, 7:08 and 7:10 pm.",
          "So 6 times.",
        ],
        commonError: "Multiplying 6 × 8 × 10 = 480 seconds. The three numbers share a factor of 2, so their product is much bigger than their LCM.",
        traps: [
          { spec: { type: "number", value: 5 }, feedback: "Count both 7:00 pm and 7:10 pm — the question says 'up to and including'." },
          {
            spec: { type: "number", value: 2 },
            feedback: "480 seconds (6 × 8 × 10) is a common multiple, but not the lowest. Find the LCM with prime factors.",
          },
        ],
        difficulty: "core",
        guideRef: "hcf-lcm-problems",
        hints: [
          "After how many seconds do all three next flash together?",
          "Find the LCM of 6, 8 and 10 — use prime factors, or list multiples of 10 and test them.",
          "The LCM is 120 seconds, which is 2 minutes. List the times from 7:00 pm.",
        ],
        strategy: "Find a pattern",
      },
      {
        kind: "short",
        id: "factors-multiples-p3-q12",
        question:
          "A square community garden beside an HDB block has an area of 1764 m². Use prime factors to find the side length, then work out the length of fencing needed to go all the way round the garden. Give your answer in metres.",
        answer: { type: "number", value: 168, display: "168 m" },
        solution: [
          "Ladder: 1764 ÷ 2 = 882, ÷ 2 = 441, ÷ 3 = 147, ÷ 3 = 49, ÷ 7 = 7, ÷ 7 = 1.",
          "So {{1764 = 2^2 * 3^2 * 7^2}}.",
          "Halve each index: {{sqrt(1764) = 2 * 3 * 7 = 42}}, so each side is 42 m.",
          "Fencing = perimeter = 4 × 42 = 168 m.",
        ],
        commonError: "Dividing the area by 4 to get 441. You need the side length first, which is the square root of the area.",
        traps: [
          { spec: { type: "number", value: 42 }, feedback: "42 m is one side. The fence goes all the way round — four sides." },
          { spec: { type: "number", value: 441 }, feedback: "You divided the area by 4. First find the side length: the square root of 1764." },
        ],
        difficulty: "core",
        guideRef: "squares-cubes-from-primes",
        hints: [
          "What do you need to know about a square to find its perimeter?",
          "The side length is {{sqrt(1764)}}. Write 1764 as a product of primes.",
          "{{1764 = 2^2 * 3^2 * 7^2}}. Halve each index to find the square root.",
        ],
        strategy: "Use prime factors",
      },
      {
        kind: "short",
        id: "factors-multiples-p3-q13",
        question:
          "A mosaic artist buys packs of 360 small square tiles. She wants to use some whole packs to make one solid square of tiles, with none left over. What is the smallest number of packs she can use, and how many tiles long is each side of the square? Give the number of packs first.",
        answer: { type: "list", values: [10, 60], ordered: true, display: "10 packs; 60 tiles along each side" },
        solution: [
          "The total number of tiles, 360 × (number of packs), must be a square number.",
          "{{360 = 2^3 * 3^2 * 5}}. In a square number, every index is even.",
          "{{3^2}} is fine. {{2^3}} needs one more 2, and 5 needs one more 5. So she needs 2 × 5 = 10 packs.",
          "{{360 * 10 = 3600 = 2^4 * 3^2 * 5^2}}, and {{sqrt(3600) = 2^2 * 3 * 5 = 60}}.",
          "10 packs make a square 60 tiles by 60 tiles.",
        ],
        commonError: "Multiplying by 2 only. 720 is not a square, because the 5 still has an odd index.",
        traps: [
          { spec: { type: "list", values: [60, 10], ordered: true }, feedback: "Right numbers, wrong order — give the number of packs first, then the side length." },
          {
            spec: { type: "list", values: [10, 3600], ordered: true },
            feedback: "3600 is the total number of tiles. The number along each side is {{sqrt(3600)}}.",
          },
        ],
        difficulty: "core",
        guideRef: "squares-cubes-from-primes",
        hints: [
          "The total number of tiles must be a square number. What is true about the indices of a square number?",
          "Write 360 as a product of primes in index form.",
          "Which primes have an odd index? Multiply by one more of each.",
        ],
        strategy: "Use prime factors",
      },
      {
        kind: "short",
        id: "factors-multiples-p3-q14",
        question:
          "A PE teacher has 72 pupils. She wants to split them into equal groups, with at least 2 pupils in each group and at least 2 groups. How many different group sizes are possible?",
        answer: { type: "number", value: 10 },
        solution: [
          "Each possible group size is a factor of 72.",
          "{{72 = 2^3 * 3^2}}, so 72 has (3 + 1) × (2 + 1) = 12 factors.",
          "Remove 1 (one pupil per group) and 72 (only one group): 12 − 2 = 10.",
          "Check by listing: 2, 3, 4, 6, 8, 9, 12, 18, 24, 36.",
        ],
        commonError: "Forgetting to remove the factors 1 and 72, which break the rules in the question.",
        traps: [
          { spec: { type: "number", value: 12 }, feedback: "72 does have 12 factors — but group sizes of 1 and 72 aren't allowed." },
          { spec: { type: "number", value: 11 }, feedback: "Remove **both** 1 and 72: one breaks the 'at least 2 pupils' rule, the other the 'at least 2 groups' rule." },
        ],
        difficulty: "core",
        guideRef: "counting-factors",
        hints: [
          "Which numbers can the group size be? How are they related to 72?",
          "Count the factors of 72 — by listing factor pairs, or by using {{72 = 2^3 * 3^2}}.",
          "Which of those factors break the rules in the question?",
        ],
        strategy: "Use prime factors",
      },
      {
        kind: "written",
        id: "factors-multiples-p3-q15",
        question:
          "Siti has a box of 1000 sugar cubes. She says:\n\n> \"I can stack all 1000 cubes into one big solid cube. I could also lay all 1000 cubes flat in a single layer to make a square.\"\n\nUse the prime factorisation of 1000 to decide whether each claim is true. Explain your answers.",
        marks: 3,
        modelAnswer:
          "{{1000 = 2^3 * 5^3}}.\n\n**Solid cube: true.** Both indices are 3, a multiple of 3, so 1000 is a cube number: {{cbrt(1000) = 2 * 5 = 10}}. She can build a 10 × 10 × 10 cube.\n\n**Square layer: false.** In a square number every index must be even, but both indices here are 3, which is odd. So 1000 is not a square number (31² = 961 and 32² = 1024), and she can't make a square layer using all 1000 cubes.",
        markScheme: [
          { point: "Writes 1000 = 2³ × 5³", keywords: ["2^3", "5^3", "2³", "5³", "2 × 2 × 2 × 5 × 5 × 5"] },
          { point: "Cube claim true: the indices are multiples of 3, giving a 10 × 10 × 10 cube", keywords: ["10", "multiple of 3", "true", "10 × 10 × 10"] },
          { point: "Square claim false: the indices (3) are odd, so 1000 is not a square number", keywords: ["odd", "not even", "not a square", "false", "961", "1024"] },
        ],
        commonError: "Thinking 1000 must be square because 100 is. But 1000 = 10 × 100, and the extra 2 × 5 makes both indices odd.",
        difficulty: "core",
        guideRef: "squares-cubes-from-primes",
        hints: [
          "Write 1000 as a product of primes in index form.",
          "What must be true about the indices of a cube number? Of a square number?",
          "Check each index: is it a multiple of 3? Is it even?",
        ],
        strategy: "Use prime factors",
      },
      {
        kind: "short",
        id: "factors-multiples-p3-q16",
        question:
          "Zara says: \"The 323 pupils in Year 8 can't be split into equal teams, because 323 is prime.\" Zara is wrong. Find the **smallest** team size (more than 1 pupil) that splits 323 pupils into equal teams.",
        answer: { type: "number", value: 17, display: "17 pupils per team" },
        solution: [
          "You only need to test primes up to {{sqrt(323)}}, which is just under 18 (17² = 289 and 18² = 324).",
          "2: 323 is odd. 3: digit sum 8. 5: doesn't end in 0 or 5. 7: 7 × 46 = 322. 11: 11 × 29 = 319. 13: 13 × 25 = 325. None of these divide 323.",
          "17: 323 ÷ 17 = 19. So 323 = 17 × 19, and it is not prime.",
          "The smallest team size is 17 pupils (making 19 teams).",
        ],
        commonError: "Giving up after testing 2, 3, 5 and 7. You must test every prime up to the square root — here, up to 17.",
        traps: [{ spec: { type: "number", value: 19 }, feedback: "Teams of 19 do work (17 teams), but there is a smaller team size." }],
        difficulty: "core",
        guideRef: "factors-multiples-primes",
        hints: [
          "A team size must be a factor of 323. Start testing from the smallest primes.",
          "You only need to test primes up to {{sqrt(323)}}. Which two square numbers is 323 between?",
          "Keep going past 7, 11 and 13 …",
        ],
        strategy: "Eliminate options",
      },
      {
        kind: "short",
        id: "factors-multiples-p3-q17",
        question: "The LCM of 12, 18 and a whole number n is 180. How many different values could n have?",
        answer: { type: "number", value: 9 },
        solution: [
          "{{12 = 2^2 * 3}} and {{18 = 2 * 3^2}}, so on their own their LCM is {{2^2 * 3^2 = 36}}.",
          "{{180 = 2^2 * 3^2 * 5}}. The 5 must come from n, so n contains exactly one factor of 5.",
          "n can't contain more than {{2^2}}, more than {{3^2}}, or any other prime — otherwise the LCM would be bigger than 180.",
          "So {{n = 2^a * 3^b * 5}} with a = 0, 1 or 2 and b = 0, 1 or 2. That gives 3 × 3 = 9 values.",
          "They are 5, 10, 15, 20, 30, 45, 60, 90 and 180.",
        ],
        commonError: "Counting every factor of 180 (there are 18). A factor of 180 with no 5 in it gives an LCM of only 36.",
        traps: [
          { spec: { type: "number", value: 18 }, feedback: "Not every factor of 180 works. If n has no factor of 5, the LCM of 12, 18 and n is only 36." },
          { spec: { type: "number", value: 1 }, feedback: "n = 180 works, but so do smaller numbers such as 5 and 30. Which primes **must** n contain, and which **may** it contain?" },
        ],
        difficulty: "challenge",
        guideRef: "hcf-lcm",
        hints: [
          "Find the LCM of 12 and 18 first. What is missing to make 180?",
          "n has to supply the 5. What else is n allowed to contain without making the LCM too big?",
          "Write {{n = 2^a * 3^b * 5}}. Which values can a and b take?",
        ],
        strategy: "Split into cases",
      },
      {
        kind: "short",
        id: "factors-multiples-p3-q18",
        question:
          "Mrs Tan has three children. Their ages are whole numbers of years, and the ages multiply to 72.\n\nRavi is told the **sum** of their ages, but he still can't work out the ages. Then Mrs Tan adds: \"My oldest child is learning the piano\" — so there is only one oldest child. Now Ravi knows the ages.\n\nWhat are the three ages?",
        answer: { type: "list", values: [3, 3, 8], display: "3, 3 and 8" },
        solution: [
          "{{72 = 2^3 * 3^2}}. Share these primes out among three children in every possible way (an age can be 1):",
          "| Ages | Sum |\n|---|---|\n| 1, 1, 72 | 74 |\n| 1, 2, 36 | 39 |\n| 1, 3, 24 | 28 |\n| 1, 4, 18 | 23 |\n| 1, 6, 12 | 19 |\n| 1, 8, 9 | 18 |\n| 2, 2, 18 | 22 |\n| 2, 3, 12 | 17 |\n| 2, 4, 9 | 15 |\n| 2, 6, 6 | 14 |\n| 3, 3, 8 | 14 |\n| 3, 4, 6 | 13 |",
          "Ravi knows the sum but is still stuck, so the sum must belong to more than one set of ages. Only 14 does: 2, 6, 6 and 3, 3, 8.",
          "2, 6, 6 has two oldest children (twins aged 6). There is only one oldest child, so the ages are 3, 3 and 8.",
        ],
        commonError: "Not listing the sets of ages systematically, so the clash at a sum of 14 is missed.",
        traps: [
          { spec: { type: "list", values: [2, 6, 6] }, feedback: "2, 6, 6 also has sum 14 — but then there would be two oldest children (the twins aged 6)." },
        ],
        difficulty: "challenge",
        guideRef: "prime-factorisation",
        hints: [
          "Why can't Ravi work out the ages from the sum? What must be special about that sum?",
          "List every set of three whole numbers that multiply to 72, starting with 1, 1, 72, and find each sum.",
          "Exactly one sum appears twice. Which of those two sets has a single oldest child?",
        ],
        strategy: "Split into cases",
      },
      {
        kind: "written",
        id: "factors-multiples-p3-q19",
        question:
          "Marcus investigates the expression {{n^2 + n + 41}}. He works it out for n = 0, 1, 2, 3, 4 and 5 and gets 41, 43, 47, 53, 61 and 71 — all prime numbers.\n\nHe says:\n\n> \"So {{n^2 + n + 41}} is prime for every whole number n.\"\n\nShow that Marcus is wrong, and explain what his mistake was.",
        marks: 3,
        modelAnswer:
          "Try n = 41. Then every term is a multiple of 41:\n\n    {{41^2 + 41 + 41 = 41 * (41 + 1 + 1) = 41 * 43 = 1763}}\n\nSo the value is 1763 = 41 × 43, which is not prime. (n = 40 also works: {{40^2 + 40 + 41 = 1681 = 41^2}}.)\n\nMarcus's mistake: checking a few cases — even forty of them — can never prove that something is true for **every** n. One counterexample is enough to show the statement is false.",
        markScheme: [
          { point: "Chooses a value of n that gives a non-prime, e.g. n = 40 or n = 41", keywords: ["41", "40", "n = 41", "n = 40"] },
          { point: "Shows the value is not prime, e.g. 1763 = 41 × 43 or 1681 = 41²", keywords: ["1763", "1681", "41 × 43", "41 x 43", "41^2", "41²", "not prime"] },
          { point: "Explains that examples can't prove 'always' — one counterexample disproves it", keywords: ["counterexample", "examples", "every", "always", "not enough", "prove"] },
        ],
        commonError: "Testing more small values of n. The first failure is at n = 40, so you need an idea, not more trials.",
        difficulty: "challenge",
        guideRef: "factors-multiples-primes",
        hints: [
          "Trying n = 6, 7, 8, … one at a time could take a long time. Can you choose n so that every term shares a factor?",
          "What happens to {{n^2 + n + 41}} if n is itself 41?",
          "In {{41^2 + 41 + 41}}, take out the common factor of 41.",
        ],
        strategy: "Look for a counterexample",
      },
      {
        kind: "written",
        id: "factors-multiples-p3-q20",
        question:
          "A school corridor has 100 lockers, numbered 1 to 100, all closed. 100 pupils walk past in turn.\n\n- Pupil 1 opens every locker.\n- Pupil 2 changes every 2nd locker (2, 4, 6, …): closing it if it is open, opening it if it is closed.\n- Pupil 3 changes every 3rd locker, and so on, until pupil 100 changes only locker 100.\n\nWhich lockers are open at the end? Explain why, using factors.",
        marks: 4,
        modelAnswer:
          "Pupil k changes locker n exactly when k is a **factor** of n. So locker n is changed once for each factor of n.\n\nA locker that starts closed ends **open** only if it is changed an **odd** number of times — so we need the numbers with an odd number of factors.\n\nFactors come in pairs that multiply to n (for 12: 1 × 12, 2 × 6, 3 × 4), which gives an even count. The only exception is a square number, where one 'pair' is a number times itself (for 36: 6 × 6), so that factor is only counted once. So square numbers are the only numbers with an odd number of factors.\n\nThe open lockers are the square numbers: 1, 4, 9, 16, 25, 36, 49, 64, 81 and 100 — 10 lockers.",
        markScheme: [
          { point: "Locker n is changed once for each factor of n", keywords: ["factor", "factors", "divides", "divisor"] },
          { point: "A locker ends open when it is changed an odd number of times", keywords: ["odd", "odd number"] },
          {
            point: "Factors pair up, except in square numbers (one factor pairs with itself), so only squares have an odd number of factors",
            keywords: ["pairs", "pair", "itself", "6 × 6", "repeated"],
          },
          { point: "Open lockers: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100 (10 lockers)", keywords: ["square numbers", "squares", "1, 4, 9", "100", "10 lockers"] },
        ],
        commonError: "Guessing 'the prime-numbered lockers'. A prime has exactly 2 factors, so it is changed twice and ends closed.",
        difficulty: "challenge",
        guideRef: "counting-factors",
        hints: [
          "Try a smaller version: 10 lockers and 10 pupils. Which lockers end up open?",
          "Which pupils change locker 12? How are their numbers related to 12?",
          "A locker ends open if it is changed an odd number of times. Which numbers have an odd number of factors?",
        ],
        strategy: "Try small cases",
      },
    ],
  },

  // =========================================================================
  // PRACTICE PAPER 4 — exam style
  // =========================================================================
  {
    id: "factors-multiples-p4",
    title: "Practice Paper 4 — Exam style",
    questions: [
      {
        kind: "short",
        id: "factors-multiples-p4-q01",
        question: "Write down **all** the prime numbers in this list.\n\n27, 31, 39, 47, 51, 57, 91",
        answer: { type: "list", values: [31, 47], display: "31 and 47" },
        solution: [
          "27 = 3 × 9 and 39 = 3 × 13 (digit sums 9 and 12).",
          "51 = 3 × 17 and 57 = 3 × 19 (digit sums 6 and 12, both multiples of 3).",
          "91 = 7 × 13.",
          "31 and 47 are not divisible by 2, 3 or 5, and {{7^2 = 49}} is bigger than both, so they are prime.",
        ],
        commonError: "Choosing 51, 57 or 91 because they are odd and 'look' prime. Always test 3 (with the digit sum) and 7.",
        traps: [
          { spec: { type: "list", values: [31, 47, 51] }, feedback: "51 = 3 × 17 — its digit sum is 6, a multiple of 3." },
          { spec: { type: "list", values: [31, 47, 57] }, feedback: "57 = 3 × 19 — its digit sum is 12, a multiple of 3." },
          { spec: { type: "list", values: [31, 47, 91] }, feedback: "91 = 7 × 13." },
        ],
        difficulty: "warmup",
        guideRef: "factors-multiples-primes",
        hints: ["A prime has exactly two factors. Test each number for 3 (use the digit sum) and for 7."],
        strategy: "Eliminate options",
      },
      {
        kind: "short",
        id: "factors-multiples-p4-q02",
        question: "Ethan's factor tree for 420 has three missing numbers, A, B and C. Find A, B and C. Give them in that order.",
        diagram: `<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Factor tree for 420. 420 splits into 6 and A. 6 splits into 2 and 3, both circled. A splits into 7, circled, and B. B splits into 2, circled, and C, circled."><rect x="0" y="0" width="360" height="240" fill="#ffffff"/><g stroke="#334155" stroke-width="1.5"><line x1="180" y1="42" x2="110" y2="76"/><line x1="180" y1="42" x2="250" y2="76"/><line x1="110" y1="102" x2="70" y2="136"/><line x1="110" y1="102" x2="150" y2="136"/><line x1="250" y1="102" x2="210" y2="136"/><line x1="250" y1="102" x2="290" y2="136"/><line x1="290" y1="162" x2="250" y2="196"/><line x1="290" y1="162" x2="330" y2="196"/></g><g stroke="#334155" stroke-width="1.5"><circle cx="70" cy="150" r="14" fill="#bbf7d0"/><circle cx="150" cy="150" r="14" fill="#bbf7d0"/><circle cx="210" cy="150" r="14" fill="#bbf7d0"/><circle cx="250" cy="210" r="14" fill="#bbf7d0"/><circle cx="330" cy="210" r="14" fill="#fde68a"/><rect x="236" y="78" width="28" height="24" rx="4" fill="#fde68a"/><rect x="276" y="138" width="28" height="24" rx="4" fill="#fde68a"/></g><g font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937"><text x="180" y="35" font-weight="bold">420</text><text x="110" y="95">6</text><text x="250" y="95" font-weight="bold">A</text><text x="70" y="155">2</text><text x="150" y="155">3</text><text x="210" y="155">7</text><text x="290" y="155" font-weight="bold">B</text><text x="250" y="215">2</text><text x="330" y="215" font-weight="bold">C</text></g></svg>`,
        answer: { type: "list", values: [70, 10, 5], ordered: true, display: "A = 70, B = 10, C = 5" },
        solution: [
          "The two branches multiply to give the number above them. 420 = 6 × A, so A = 420 ÷ 6 = 70.",
          "70 = 7 × B, so B = 70 ÷ 7 = 10.",
          "10 = 2 × C, so C = 5.",
          "The circled primes give {{420 = 2^2 * 3 * 5 * 7}}.",
        ],
        traps: [
          {
            spec: { type: "list", values: [2, 2, 3, 5, 7] },
            feedback: "Those are the prime factors of 420. The question asks only for the three missing numbers A, B and C.",
          },
        ],
        difficulty: "warmup",
        guideRef: "prime-factorisation",
        hints: ["Each pair of branches multiplies to give the number above it.", "420 = 6 × A. What is 420 ÷ 6?"],
        strategy: "Work backwards",
      },
      {
        kind: "short",
        id: "factors-multiples-p4-q03",
        question:
          "Jun checks 7380 using the divisibility tests for 2, 3, 4, 5, 6, 8, 9 and 10. Exactly **one** of these numbers does not divide 7380. Which one?",
        answer: { type: "number", value: 8 },
        solution: [
          "It ends in 0, so it is divisible by 2, 5 and 10.",
          "Digit sum: 7 + 3 + 8 + 0 = 18, so it is divisible by 3 and 9. Even and divisible by 3 means divisible by 6.",
          "Last two digits: 80 ÷ 4 = 20, so it is divisible by 4.",
          "Last three digits: 380 ÷ 8 = 47.5, so it is **not** divisible by 8.",
        ],
        commonError: "Testing 8 with only the last two digits (80 ÷ 8 = 10). For 8 you need the last three digits.",
        traps: [
          { spec: { type: "number", value: 4 }, feedback: "Check 4 using the last two digits: 80 ÷ 4 = 20, so 4 does divide 7380." },
          { spec: { type: "number", value: 9 }, feedback: "The digit sum is 18, a multiple of 9 — so 9 does divide 7380." },
        ],
        difficulty: "warmup",
        guideRef: "factors-multiples-primes",
        hints: ["Which tests use the last digit, which use the last two or three digits, and which use the digit sum?"],
      },
      {
        kind: "short",
        id: "factors-multiples-p4-q04",
        question: "Given that {{2025 = 3^4 * 5^2}}, use the prime factors to find {{sqrt(2025)}}.",
        answer: { type: "number", value: 45 },
        solution: [
          "A square root splits the prime factors into two identical halves: {{2025 = (3^2 * 5) * (3^2 * 5)}}.",
          "So {{sqrt(2025) = 3^2 * 5 = 9 * 5 = 45}}.",
          "Check: 45 × 45 = 2025 ✓",
        ],
        commonError: "Halving 2025 instead of halving the indices.",
        traps: [
          { spec: { type: "number", value: 1012.5 }, feedback: "That's half of 2025. A square root halves each **index**, not the number." },
          { spec: { type: "number", value: 225 }, feedback: "{{225 = 3^2 * 5^2}} — you halved only one index. Halve both: {{3^2 * 5^1}}." },
        ],
        difficulty: "warmup",
        guideRef: "squares-cubes-from-primes",
        hints: ["A square root splits the number into two equal factors. What happens to each index?"],
        strategy: "Use prime factors",
      },
      {
        kind: "short",
        id: "factors-multiples-p4-q05",
        question: "Write down the HCF and the LCM of 14 and 21. Give the HCF first.",
        answer: { type: "list", values: [7, 42], ordered: true, display: "HCF = 7, LCM = 42" },
        solution: [
          "Factors of 14: 1, 2, 7, 14. Factors of 21: 1, 3, 7, 21. HCF = 7.",
          "Multiples of 21: 21, 42, … and 42 = 3 × 14. LCM = 42.",
          "Check: HCF × LCM = 7 × 42 = 294 = 14 × 21 ✓",
        ],
        traps: [
          { spec: { type: "list", values: [42, 7], ordered: true }, feedback: "Right numbers, wrong order — give the HCF (the smaller one) first." },
          { spec: { type: "list", values: [7, 294], ordered: true }, feedback: "294 = 14 × 21 is a common multiple, but not the lowest. Is there a smaller number in both times tables?" },
        ],
        difficulty: "warmup",
        guideRef: "hcf-lcm",
        hints: ["The HCF can't be bigger than 14, and the LCM can't be smaller than 21."],
      },
      {
        kind: "short",
        id: "factors-multiples-p4-q06",
        question:
          "Zara uses the ladder method (repeated division by primes) to factorise 2940. Some numbers are missing.\n\n| Prime | Number |\n|---|---|\n| 2 | 2940 |\n| 2 | 1470 |\n| **?** | 735 |\n| 5 | **?** |\n| 7 | 49 |\n| **?** | 7 |\n|   | 1 |\n\nComplete the ladder, then write {{2940 = 2^a * 3^b * 5^c * 7^d}}. Give a, b, c and d in that order.",
        answer: { type: "list", values: [2, 1, 1, 2], ordered: true, display: "a = 2, b = 1, c = 1, d = 2" },
        solution: [
          "735 has digit sum 15, so divide by 3: 735 ÷ 3 = 245.",
          "245 ÷ 5 = 49, then 49 ÷ 7 = 7, and 7 ÷ 7 = 1 — so the last missing prime is 7.",
          "The primes down the side are 2, 2, 3, 5, 7, 7.",
          "{{2940 = 2^2 * 3 * 5 * 7^2}}, so a = 2, b = 1, c = 1, d = 2. Check: 4 × 3 × 5 × 49 = 2940 ✓",
        ],
        commonError: "Forgetting that the last step (7 ÷ 7 = 1) is a second factor of 7.",
        traps: [
          { spec: { type: "list", values: [2, 1, 1, 1], ordered: true }, feedback: "Count the 7s down the side: 49 ÷ 7 and then 7 ÷ 7 — there are two." },
          {
            spec: { type: "list", values: [2, 3, 5, 7], ordered: true },
            feedback: "Those are the primes themselves. a, b, c and d are the **indices**: how many times each prime appears.",
          },
        ],
        difficulty: "core",
        guideRef: "prime-factorisation",
        hints: [
          "Which prime divides 735? Check its digit sum.",
          "Keep dividing until you reach 1. Then count how many times each prime appears down the side.",
          "d is the number of 7s. Did you count the final 7?",
        ],
        strategy: "Work systematically",
      },
      {
        kind: "short",
        id: "factors-multiples-p4-q07",
        question:
          "The four-digit number 3□58 is divisible by 6 but **not** divisible by 9. Find every digit that could go in the box.",
        answer: { type: "list", values: [5, 8], display: "5 or 8" },
        solution: [
          "It ends in 8, so it is even. To be divisible by 6, it must also pass the test for 3.",
          "Digit sum = 3 + □ + 5 + 8 = 16 + □. For 3, this must be 18, 21 or 24, so □ = 2, 5 or 8.",
          "It would be divisible by 9 if the digit sum were 18, which happens when □ = 2. That digit is not allowed.",
          "So □ = 5 or 8, giving 3558 and 3858.",
        ],
        commonError: "Forgetting the 'not divisible by 9' condition and including 2.",
        traps: [
          { spec: { type: "list", values: [2, 5, 8] }, feedback: "With 2 the number is 3258. Its digit sum is 18, so it **is** divisible by 9 — not allowed." },
        ],
        difficulty: "core",
        guideRef: "factors-multiples-primes",
        hints: [
          "Divisible by 6 means divisible by 2 and by 3. Which of those is already guaranteed?",
          "Write the digit sum as 16 + □. Which digits make it a multiple of 3?",
          "Now remove any digit that makes the digit sum a multiple of 9.",
        ],
        strategy: "Split into cases",
      },
      {
        kind: "short",
        id: "factors-multiples-p4-q08",
        question:
          "The Venn diagram shows the prime factors of 126 and another number, Q. One prime in Q's circle is hidden by a question mark. The LCM of 126 and Q is 1260.\n\nFind the hidden prime, the value of Q and the HCF of 126 and Q. Give your three answers in that order.",
        diagram: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Venn diagram of prime factors. The circle for 126 only contains 3 and 7. The overlap contains 2 and 3. The circle for Q only contains 2 and a hidden prime shown as a question mark."><rect x="0" y="0" width="320" height="200" fill="#ffffff"/><circle cx="125" cy="105" r="80" fill="#c7d2fe" fill-opacity="0.6" stroke="#334155" stroke-width="1.5"/><circle cx="195" cy="105" r="80" fill="#fde68a" fill-opacity="0.6" stroke="#334155" stroke-width="1.5"/><g font-family="sans-serif" text-anchor="middle" fill="#1f2937"><text x="52" y="34" font-size="16" font-weight="bold">126</text><text x="268" y="34" font-size="16" font-weight="bold">Q</text><text x="80" y="98" font-size="16">3</text><text x="80" y="128" font-size="16">7</text><text x="160" y="98" font-size="16">2</text><text x="160" y="128" font-size="16">3</text><text x="240" y="98" font-size="16">2</text><text x="240" y="128" font-size="16" font-weight="bold">?</text></g></svg>`,
        answer: { type: "list", values: [5, 60, 6], ordered: true, display: "hidden prime = 5, Q = 60, HCF = 6" },
        solution: [
          "The LCM is the product of every number in the diagram: 3 × 7 × 2 × 3 × 2 × ? = 252 × ?.",
          "252 × ? = 1260, so ? = 1260 ÷ 252 = 5.",
          "Q is the product of everything in its circle, including the overlap: 2 × 3 × 2 × 5 = 60.",
          "The HCF is the product of the overlap: 2 × 3 = 6.",
          "Check: HCF × LCM = 6 × 1260 = 7560, and 126 × 60 = 7560 ✓",
        ],
        commonError: "Leaving the overlap out of Q. The overlap belongs to **both** circles.",
        traps: [
          {
            spec: { type: "list", values: [5, 10, 6], ordered: true },
            feedback: "10 is only the part of Q outside the overlap. The overlap (2 × 3) is part of Q too.",
          },
          {
            spec: { type: "list", values: [10, 120, 6], ordered: true },
            feedback: "1260 ÷ 126 = 10, but Q's own region also holds a 2: the LCM is 126 × 2 × ?. So 2 × ? = 10. (And 10 isn't prime.)",
          },
        ],
        difficulty: "core",
        guideRef: "hcf-lcm",
        hints: [
          "The LCM is the product of every number in the diagram. Write that using the ?.",
          "3 × 7 × 2 × 3 × 2 = 252, so 252 × ? = 1260.",
          "Q uses its own region **and** the overlap. The HCF uses only the overlap.",
        ],
        strategy: "Work backwards",
      },
      {
        kind: "written",
        id: "factors-multiples-p4-q09",
        question:
          "Siti says:\n\n> \"A number that is divisible by 3 and by 4 is always divisible by 12. In the same way, a number that is divisible by 4 and by 6 is always divisible by 24.\"\n\nExplain why her first statement is true but her second statement is false.",
        marks: 3,
        modelAnswer:
          "**The second statement is false:** 12 is divisible by 4 and by 6, but 12 is not divisible by 24. (36 and 60 are other counterexamples.)\n\n**Why the first one works:** 3 and 4 have no common factor (their HCF is 1). A number divisible by both must contain {{2^2}} and 3, so it is divisible by their LCM, {{2^2 * 3 = 12}}, which here is the same as 3 × 4.\n\n**Why the second one fails:** {{4 = 2^2}} and {{6 = 2 * 3}} share a factor of 2. A number divisible by both only has to contain {{2^2}} and 3, so it only has to be divisible by their LCM, which is 12. Multiplying 4 × 6 = 24 counts the shared 2 twice.\n\nThe correct rule: divisible by a and by b means divisible by the **LCM** of a and b. That equals a × b only when a and b have no common factor.",
        markScheme: [
          { point: "A counterexample showing the second statement is false, e.g. 12 (or 36, 60)", keywords: ["12", "36", "60", "84", "counterexample", "not divisible by 24"] },
          {
            point: "The first works because 3 and 4 share no common factor, so their LCM is 3 × 4 = 12",
            keywords: ["no common factor", "hcf is 1", "hcf of 1", "coprime", "share no", "lcm"],
          },
          { point: "The second fails because 4 and 6 share a factor of 2, so their LCM is 12, not 24", keywords: ["share", "common factor", "twice", "double", "not 24", "lcm"] },
        ],
        commonError: "Testing only multiples of 24, such as 24, 48 and 72, which happen to work.",
        difficulty: "core",
        guideRef: "factors-multiples-primes",
        hints: [
          "Look for a number smaller than 24 that is divisible by both 4 and 6.",
          "What is the LCM of 3 and 4? What is the LCM of 4 and 6?",
          "Compare the prime factors. Do 3 and 4 share anything? Do 4 and 6?",
        ],
        strategy: "Look for a counterexample",
      },
      {
        kind: "short",
        id: "factors-multiples-p4-q10",
        question:
          "The table shows the first few departure times of two ferry services from Marina South Pier. Each ferry keeps to the same pattern all morning.\n\n| Ferry A | Ferry B |\n|---|---|\n| 6:00 am | 6:00 am |\n| 6:12 am | 6:20 am |\n| 6:24 am | 6:40 am |\n| 6:36 am | 7:00 am |\n| … | … |\n\nCounting 6:00 am, how many times from 6:00 am to 10:00 am (inclusive) do both ferries leave at the same time?",
        answer: { type: "number", value: 5 },
        solution: [
          "From the table, Ferry A leaves every 12 minutes and Ferry B every 20 minutes.",
          "They leave together every LCM(12, 20) minutes. {{12 = 2^2 * 3}} and {{20 = 2^2 * 5}}, so LCM = {{2^2 * 3 * 5 = 60}} minutes.",
          "Together at 6:00, 7:00, 8:00, 9:00 and 10:00 am.",
          "That is 5 times.",
        ],
        commonError: "Forgetting to count 6:00 am or 10:00 am — the question says inclusive.",
        traps: [
          { spec: { type: "number", value: 4 }, feedback: "Did you count both 6:00 am and 10:00 am? The question says inclusive." },
          { spec: { type: "number", value: 2 }, feedback: "240 minutes (12 × 20) is a common multiple, but not the lowest. Find the LCM of 12 and 20." },
        ],
        difficulty: "core",
        guideRef: "hcf-lcm-problems",
        hints: [
          "Read the gap between departures for each ferry from the table.",
          "Find the LCM of the two gaps.",
          "The LCM is 60 minutes. List the shared times from 6:00 am to 10:00 am.",
        ],
        strategy: "Find a pattern",
      },
      {
        kind: "short",
        id: "factors-multiples-p4-q11",
        question:
          "The diagram shows a brick measuring 6 cm by 4 cm by 3 cm. Jun stacks identical bricks, all facing the same way, to build a solid cube with no gaps. What is the side length of the smallest cube he can build, and how many bricks does it need? Give the side length (in cm) first.",
        diagram: `<svg viewBox="0 0 340 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A cuboid brick drawn in 3D. The front face is 6 cm wide and 3 cm tall, and the brick is 4 cm deep."><rect x="0" y="0" width="340" height="200" fill="#ffffff"/><g stroke="#334155" stroke-width="1.5" stroke-linejoin="round"><polygon points="60,70 102,28 282,28 240,70" fill="#fde68a"/><polygon points="240,70 282,28 282,118 240,160" fill="#fecaca" fill-opacity="0.75"/><polygon points="60,70 240,70 240,160 60,160" fill="#fecaca"/></g><g font-family="sans-serif" font-size="14" fill="#1f2937"><text x="150" y="182" text-anchor="middle">6 cm</text><text x="52" y="120" text-anchor="end">3 cm</text><text x="270" y="154" text-anchor="start">4 cm</text></g></svg>`,
        answer: { type: "list", values: [12, 24], ordered: true, display: "12 cm; 24 bricks" },
        solution: [
          "Along each edge of the cube the bricks line up end to end, so the side length must be a multiple of 6, of 4 and of 3.",
          "The smallest such length is LCM(6, 4, 3) = 12 cm.",
          "Bricks needed: (12 ÷ 6) × (12 ÷ 4) × (12 ÷ 3) = 2 × 3 × 4 = 24.",
          "Check by volume: {{12^3}} = 1728 cm³, and each brick is 6 × 4 × 3 = 72 cm³. 1728 ÷ 72 = 24 ✓",
        ],
        commonError: "Using 6 × 4 × 3 = 72 cm as the side length. That is a common multiple, but not the lowest.",
        traps: [
          { spec: { type: "list", values: [24, 12], ordered: true }, feedback: "Right numbers, wrong order — give the side length (12 cm) first, then the number of bricks." },
          {
            spec: { type: "list", values: [72, 5184], ordered: true },
            feedback: "A 72 cm cube works, but it isn't the smallest. Use the LCM of 6, 4 and 3.",
          },
          {
            spec: { type: "list", values: [12, 1728], ordered: true },
            feedback: "1728 cm³ is the volume of the cube. Divide it by the volume of one brick, or count bricks along each edge.",
          },
        ],
        difficulty: "core",
        guideRef: "hcf-lcm-problems",
        hints: [
          "Along the cube's edges, the bricks' 6 cm, 4 cm and 3 cm sides line up end to end. What must be true about the cube's side length?",
          "It must be a common multiple of 6, 4 and 3 — the lowest one.",
          "With a 12 cm cube, how many bricks fit along each direction?",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "short",
        id: "factors-multiples-p4-q12",
        question:
          "For a class party, Mei buys paper cups in packs of 12, paper plates in packs of 18 and napkins in packs of 30. She wants exactly the same number of cups, plates and napkins, and as few of each as possible. How many packs does she buy altogether?",
        answer: { type: "number", value: 31, display: "31 packs" },
        solution: [
          "The number of each item must be a common multiple of 12, 18 and 30 — the lowest one.",
          "{{12 = 2^2 * 3}}, {{18 = 2 * 3^2}} and {{30 = 2 * 3 * 5}}, so LCM = {{2^2 * 3^2 * 5 = 180}}.",
          "Packs: 180 ÷ 12 = 15 packs of cups, 180 ÷ 18 = 10 packs of plates, 180 ÷ 30 = 6 packs of napkins.",
          "Altogether 15 + 10 + 6 = 31 packs.",
        ],
        commonError: "Stopping at 180. That is the number of each item, not the number of packs.",
        traps: [
          { spec: { type: "number", value: 180 }, feedback: "180 is how many of each item. How many packs of each is that?" },
          { spec: { type: "number", value: 62 }, feedback: "360 of each item works, but it isn't the fewest. The LCM of 12, 18 and 30 is smaller." },
        ],
        difficulty: "core",
        guideRef: "hcf-lcm-problems",
        hints: [
          "Is this an HCF or an LCM problem? The number of cups must be a multiple of what?",
          "Find the LCM of 12, 18 and 30 using prime factors — take the highest power of each prime.",
          "Divide the LCM by each pack size, then add.",
        ],
        strategy: "Use prime factors",
      },
      {
        kind: "written",
        id: "factors-multiples-p4-q13",
        question:
          "{{N = 2^3 * 3^5 * 5}}. Without working out N, Arjun says:\n\n> \"N is a multiple of 72, and N is also a multiple of 100.\"\n\nUse prime factors to decide whether each part of Arjun's statement is true. Explain your answers.",
        marks: 3,
        modelAnswer:
          "Write each divisor as a product of primes: {{72 = 2^3 * 3^2}} and {{100 = 2^2 * 5^2}}.\n\n**Multiple of 72: true.** N contains {{2^3}} and at least {{3^2}} (it has {{3^5}}), so {{N = 72 * 3^3 * 5}}.\n\n**Multiple of 100: false.** 100 needs two 5s, but N has only one factor of 5. A prime factorisation is unique, so there is no other way to find a second 5 — 100 cannot divide N. (In fact N = 9720.)",
        markScheme: [
          { point: "Writes 72 = 2³ × 3² and 100 = 2² × 5²", keywords: ["2^3", "3^2", "5^2", "2³", "3²", "5²"] },
          { point: "True for 72: N contains 2³ and at least 3²", keywords: ["true", "contains", "3^5", "3⁵", "135", "yes"] },
          { point: "False for 100: N has only one 5, but 100 needs 5²", keywords: ["one 5", "only one", "two 5s", "false", "not a multiple"] },
        ],
        commonError: "Saying N is a multiple of 100 because it contains a 2 and a 5. That only shows N is a multiple of 10.",
        difficulty: "core",
        guideRef: "prime-factorisation",
        hints: [
          "Write 72 and 100 as products of primes.",
          "For 72 to divide N, every prime in 72 must appear in N at least as many times.",
          "How many 5s does 100 need? How many does N have?",
        ],
        strategy: "Use prime factors",
      },
      {
        kind: "short",
        id: "factors-multiples-p4-q14",
        question:
          "{{n = 2^4 * 3^3 * 5}}.\n\n(a) Find the smallest whole number k so that nk is a square number.\n\n(b) Find the smallest whole number m so that nm is a cube number.\n\nGive k first, then m.",
        answer: { type: "list", values: [15, 100], ordered: true, display: "k = 15, m = 100" },
        solution: [
          "**Square:** every index must be even. {{2^4}} is fine; {{3^3}} needs one more 3; {{5^1}} needs one more 5. So k = 3 × 5 = 15, giving {{2^4 * 3^4 * 5^2}} = 32 400 = 180².",
          "**Cube:** every index must be a multiple of 3. {{2^4}} needs two more 2s (to make {{2^6}}); {{3^3}} is fine; {{5^1}} needs two more 5s. So m = {{2^2 * 5^2 = 100}}, giving {{2^6 * 3^3 * 5^3}} = 216 000 = 60³.",
        ],
        commonError: "For the cube, multiplying by just one more of each prime. Each index must reach a multiple of 3: {{2^4}} needs {{2^2}} more, and {{5^1}} needs {{5^2}} more.",
        traps: [
          { spec: { type: "list", values: [100, 15], ordered: true }, feedback: "Right numbers, wrong order — give k (for the square) first, then m (for the cube)." },
          {
            spec: { type: "list", values: [15, 10], ordered: true },
            feedback: "m = 10 gives {{2^5 * 3^3 * 5^2}} — the indices 5 and 2 aren't multiples of 3. Top each index up to the next multiple of 3.",
          },
        ],
        difficulty: "core",
        guideRef: "squares-cubes-from-primes",
        hints: [
          "What must be true about the indices of a square number? Of a cube number?",
          "For the square, which indices are odd? For the cube, which indices aren't multiples of 3?",
          "For a cube, {{2^4}} must become {{2^6}}. How many more 2s is that?",
        ],
        strategy: "Use prime factors",
      },
      {
        kind: "short",
        id: "factors-multiples-p4-q15",
        question:
          "{{600 = 2^3 * 3 * 5^2}}.\n\n(a) How many factors does 600 have?\n\n(b) How many of those factors are **odd**?\n\nGive your answer to (a) first.",
        answer: { type: "list", values: [24, 6], ordered: true, display: "24 factors, 6 of them odd" },
        solution: [
          "Every factor of 600 is {{2^a * 3^b * 5^c}}, with a = 0 to 3 (4 choices), b = 0 to 1 (2 choices) and c = 0 to 2 (3 choices).",
          "Number of factors = 4 × 2 × 3 = 24.",
          "An odd factor contains no 2s, so a must be 0: 1 × 2 × 3 = 6 odd factors.",
          "They are 1, 3, 5, 15, 25 and 75.",
        ],
        commonError: "Multiplying the indices (3 × 1 × 2 = 6) instead of multiplying (index + 1) for each prime.",
        traps: [
          {
            spec: { type: "list", values: [6, 2], ordered: true },
            feedback: "You multiplied the indices. Each prime can appear anything from 0 times up to its index, so use (3 + 1)(1 + 1)(2 + 1).",
          },
          { spec: { type: "list", values: [24, 18], ordered: true }, feedback: "18 is the number of **even** factors. How many have no factor of 2 at all?" },
        ],
        difficulty: "core",
        guideRef: "counting-factors",
        hints: [
          "A factor of 600 is built from some of its prime factors. How many 2s could it use — including none?",
          "Count the choices for each prime and multiply.",
          "An odd factor can't contain any 2s. How many choices are left?",
        ],
        strategy: "Split into cases",
      },
      {
        kind: "written",
        id: "factors-multiples-p4-q16",
        question:
          "Ravi says:\n\n> \"{{2^6 * 3^3}} is a square number, because 6 is even.\"\n\n(a) Is Ravi right? Explain.\n\n(b) Show that {{2^6 * 3^3}} is a cube number, and find its cube root.",
        marks: 3,
        modelAnswer:
          "(a) Ravi is wrong. For a square number, **every** index must be even. The index of 3 is 3, which is odd. (In fact {{2^6 * 3^3 = 1728}}, which lies between 41² = 1681 and 42² = 1764.)\n\n(b) For a cube number, every index must be a multiple of 3. Here 6 and 3 are both multiples of 3, so it is a cube:\n\n    {{2^6 * 3^3 = (2^2 * 3) * (2^2 * 3) * (2^2 * 3)}}\n\nso the cube root is {{2^2 * 3 = 12}}. Check: 12 × 12 × 12 = 1728 ✓",
        markScheme: [
          { point: "Ravi is wrong: every index must be even, and the index of 3 is odd", keywords: ["every", "all", "odd", "wrong", "not a square"] },
          { point: "The indices 6 and 3 are both multiples of 3, so it is a cube", keywords: ["multiple of 3", "multiples of 3", "divisible by 3", "cube"] },
          { point: "Cube root = 2² × 3 = 12", keywords: ["12", "2^2 × 3", "2² × 3"] },
        ],
        commonError: "Checking only the first index. A square needs **all** of its indices to be even.",
        difficulty: "core",
        guideRef: "squares-cubes-from-primes",
        hints: [
          "Look at **both** indices, not just the first one.",
          "For a cube, check whether each index is a multiple of 3.",
          "To find a cube root, divide every index by 3.",
        ],
        strategy: "Use prime factors",
      },
      {
        kind: "short",
        id: "factors-multiples-p4-q17",
        question:
          "A bakery packs mooncakes. When the mooncakes are counted in 2s, 3s, 4s, 5s or 6s, there is always exactly 1 left over. When they are counted in 7s, there are none left over. What is the smallest possible number of mooncakes?",
        answer: { type: "number", value: 301 },
        solution: [
          "One less than the number is divisible by 2, 3, 4, 5 and 6, so it is a multiple of LCM(2, 3, 4, 5, 6) = {{2^2 * 3 * 5 = 60}}.",
          "So the number is one of 61, 121, 181, 241, 301, …",
          "Test each for 7: 61 = 56 + 5, 121 = 119 + 2, 181 = 175 + 6, 241 = 238 + 3, 301 = 7 × 43 ✓",
          "The smallest possible number is 301.",
        ],
        commonError: "Using 2 × 3 × 4 × 5 × 6 = 720. That is a common multiple, but the LCM is only 60, so smaller answers get missed.",
        traps: [
          {
            spec: { type: "number", value: 721 },
            feedback: "721 does work (721 = 7 × 103), but it comes from 720 = 2 × 3 × 4 × 5 × 6. The LCM of 2 to 6 is only 60 — there is a smaller answer.",
          },
          { spec: { type: "number", value: 61 }, feedback: "61 leaves 1 over for 2, 3, 4, 5 and 6, but 61 ÷ 7 leaves 5. Keep going in steps of 60." },
        ],
        difficulty: "challenge",
        guideRef: "hcf-lcm-problems",
        hints: [
          "What can you say about the number that is one **less** than the number of mooncakes?",
          "It is a common multiple of 2, 3, 4, 5 and 6. What is the lowest one?",
          "Check 61, 121, 181, … (each 60 more) until one divides exactly by 7.",
        ],
        strategy: "Work backwards",
      },
      {
        kind: "short",
        id: "factors-multiples-p4-q18",
        question:
          "N = 1 × 2 × 3 × 4 × 5 × 6 × 7 × 8 × 9 × 10.\n\n(a) Write N as a product of prime factors in index form.\n\n(b) Find the largest square number that is a factor of N.\n\nGive the **square root** of that square number as your final answer.",
        answer: { type: "number", value: 720 },
        solution: [
          "Don't multiply out first. Write each number as primes: 2, 3, {{2^2}}, 5, 2 × 3, 7, {{2^3}}, {{3^2}}, 2 × 5.",
          "Count the 2s: 1 + 2 + 1 + 3 + 1 = 8. The 3s: 1 + 1 + 2 = 4. The 5s: 2. The 7s: 1.",
          "So {{N = 2^8 * 3^4 * 5^2 * 7}}.",
          "The largest square factor keeps the biggest even power of each prime: {{2^8 * 3^4 * 5^2}}. The single 7 has to go.",
          "Its square root is {{2^4 * 3^2 * 5 = 16 * 9 * 5 = 720}}. (Curiously, 720 = 1 × 2 × 3 × 4 × 5 × 6.)",
        ],
        commonError: "Including the 7. {{7^1}} has an odd index, so it can't be part of a square factor.",
        traps: [
          { spec: { type: "number", value: 518400 }, feedback: "That's the square number itself. The question asks for its square root." },
          { spec: { type: "number", value: 360 }, feedback: "Recount the 2s: 4 = {{2^2}} and 8 = {{2^3}} give extra 2s. There are 8 of them altogether." },
        ],
        difficulty: "challenge",
        guideRef: "squares-cubes-from-primes",
        hints: [
          "Instead of multiplying everything out, write each of 2, 3, …, 10 as a product of primes.",
          "Count how many 2s, 3s, 5s and 7s there are altogether.",
          "A square factor needs even indices. Which prime can't be used at all?",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "short",
        id: "factors-multiples-p4-q19",
        question:
          "Raffle tickets at a school fun fair are numbered 1 to 200. A ticket wins a prize if its number is a multiple of 6 or a multiple of 15 (or both). How many tickets win a prize?",
        answer: { type: "number", value: 40, display: "40 tickets" },
        solution: [
          "Multiples of 6 up to 200: 200 ÷ 6 = 33.3…, so there are 33.",
          "Multiples of 15 up to 200: 200 ÷ 15 = 13.3…, so there are 13.",
          "Tickets that are multiples of both have been counted twice. A multiple of both 6 and 15 is a multiple of their LCM, 30: 200 ÷ 30 = 6.6…, so there are 6.",
          "Winning tickets: 33 + 13 − 6 = 40.",
        ],
        solutions: [
          {
            label: "Venn diagram",
            steps: [
              "Draw two overlapping circles: multiples of 6 and multiples of 15. The overlap holds the multiples of 30: 6 tickets.",
              "Multiples of 6 only: 33 − 6 = 27. Multiples of 15 only: 13 − 6 = 7.",
              "Total: 27 + 6 + 7 = 40.",
            ],
          },
        ],
        commonError: "Taking 'multiples of both' to be multiples of 6 × 15 = 90. The common multiples are the multiples of the LCM, 30.",
        traps: [
          { spec: { type: "number", value: 46 }, feedback: "Some tickets (30, 60, 90, …) are multiples of both and have been counted twice." },
          { spec: { type: "number", value: 44 }, feedback: "Numbers that are multiples of both 6 and 15 are multiples of their LCM, 30 — not of 6 × 15 = 90." },
        ],
        difficulty: "challenge",
        guideRef: "hcf-lcm",
        hints: [
          "Count the multiples of 6 and the multiples of 15 separately. Has any ticket been counted twice?",
          "Which numbers are multiples of both 6 and 15? Think LCM.",
          "Total = (multiples of 6) + (multiples of 15) − (multiples of both).",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "written",
        id: "factors-multiples-p4-q20",
        question:
          "Priya knows that for any two whole numbers a and b,\n\n    HCF × LCM = a × b\n\nShe says: \"So for any three whole numbers, HCF × LCM = the product of all three.\"\n\n(a) Use a prime-factor Venn diagram to explain why HCF × LCM = a × b for two numbers.\n\n(b) Show, with an example, that Priya's claim about three numbers is false, and explain why it fails.",
        marks: 4,
        modelAnswer:
          "(a) Put the prime factors of a and b in a Venn diagram. The overlap holds the shared primes, so the HCF is the product of the overlap. The LCM is the product of **everything** in the diagram. So HCF × LCM uses the overlap twice and each outer part once. The product a × b also uses the overlap twice (it is part of a **and** part of b) and each outer part once. So the two products are equal. For example, with {{12 = 2^2 * 3}} and {{18 = 2 * 3^2}}: HCF = 6 and LCM = 36, and 6 × 36 = 216 = 12 × 18.\n\n(b) Try 2, 4 and 8. The HCF is 2 and the LCM is 8, so HCF × LCM = 16. But 2 × 4 × 8 = 64. So the claim is false.\n\nIt fails because, with three numbers, a prime factor shared by two or more of them is counted more times in the product than in HCF × LCM. For 2, 4 and 8, the 2 that all three share appears **three** times in 2 × 4 × 8 but only **twice** in HCF × LCM (once in the HCF, once in the LCM) — and the extra 2 shared by 4 and 8 is counted twice in the product but only once, in the LCM. (The rule only works in special cases: when no two of the numbers share a factor, like 2, 3 and 5.)",
        markScheme: [
          { point: "HCF is the product of the overlap; LCM is the product of everything in the diagram", keywords: ["overlap", "middle", "shared", "everything", "intersection"] },
          { point: "So HCF × LCM counts the overlap twice and the rest once — exactly like a × b", keywords: ["twice", "two times", "once", "same", "both"] },
          { point: "A counterexample for three numbers, e.g. 2, 4, 8: HCF × LCM = 16 but the product is 64", keywords: ["2, 4, 8", "16", "64", "counterexample", "false"] },
          {
            point: "Explains why: a shared prime factor is counted more times in the product than in HCF × LCM (e.g. the 2 common to 2, 4 and 8 appears three times in the product but only twice in HCF × LCM)",
            keywords: ["three times", "3 times", "only twice", "counted", "all three", "more times", "shared"],
          },
        ],
        commonError: "Testing three numbers where no two share a factor, like 2, 3 and 5, which happen to work, and deciding Priya is right.",
        difficulty: "challenge",
        guideRef: "hcf-lcm",
        hints: [
          "Draw the prime-factor Venn diagram for 12 and 18. Which regions make the HCF? Which make the LCM?",
          "How many times does the overlap appear in HCF × LCM? How many times in a × b?",
          "For three numbers, try numbers with lots of shared factors, such as 2, 4 and 8.",
        ],
        strategy: "Draw a diagram",
      },
    ],
  },
];
