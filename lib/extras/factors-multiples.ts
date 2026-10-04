import type { TopicExtras } from "../types.ts";

// Engagement extras for "Factors, Multiples & Primes" (not audited exam content).
export const extras: TopicExtras = {
  hook:
    "Some cicadas in North America spend 13 or 17 years underground, then millions climb out together in the same few weeks. Both numbers are prime. By the end of this topic you'll be able to use an LCM to explain why a prime life cycle might help them dodge predators.",
  didYouKnow: [
    "There is **no biggest prime**. Around 300 BC Euclid showed why: multiply every prime on any list together and add 1. The result leaves remainder 1 when divided by each prime on the list, so its prime factors must be new ones.",
    "In October 2024, {{2^136279841 - 1}} became the largest prime ever found: a number with more than 41 million digits. It was found by Luke Durant, a volunteer in the Great Internet Mersenne Prime Search, using powerful graphics processors rented in data centres around the world.",
    "RSA, one of the codes that helps keep websites and online payments secure, relies on a one-way trick: multiplying two huge primes is quick, but splitting the answer back into those two primes would take today's fastest computers far too long.",
    "A **perfect number** equals the sum of its other factors: 6 = 1 + 2 + 3 and 28 = 1 + 2 + 4 + 7 + 14. Every perfect number found so far is even, and nobody knows whether an odd one exists.",
    "In 1742, in letters between Christian Goldbach and Leonhard Euler, a famous guess appeared: every even number greater than 2 is the sum of two primes (28 = 5 + 23 = 11 + 17). Computers have checked it for every even number up to {{4 * 10^18}}, but no one has ever proved it.",
    "1 is **not** prime, and that's a deliberate choice. If it were, prime factorisation would stop being unique: 6 = 2 × 3 = 1 × 2 × 3 = 1 × 1 × 2 × 3 … Some mathematicians did list 1 as a prime until about a hundred years ago.",
  ],
  activities: [
    {
      title: "The Sieve of Eratosthenes",
      emoji: "🔍",
      materials: ["A 10 × 10 grid of the numbers 1 to 100 (print one or draw it)", "Four coloured pencils"],
      steps: [
        "Cross out 1. It is not prime.",
        "Circle 2. Then shade every multiple of 2 after it (4, 6, 8, …) in your first colour.",
        "Circle 3, the next number that isn't shaded. Shade its multiples in a second colour. Some are already shaded: give those a stripe of the new colour.",
        "Do the same for 5 and then 7, each in a new colour.",
        "Circle every number that is still unshaded (but not the crossed-out 1), then count your circles.",
        "Look at the striped squares from step 3. What do those numbers have in common?",
      ],
      maths:
        "The circled numbers are the **25 primes below 100**. You could stop after 7 because every composite number up to 100 has a prime factor of 10 or less. The first number that 11 could shade which isn't already shaded is {{11^2 = 121}}, and that is off the grid.\n\nThe squares striped with both of the first two colours are 6, 12, 18, … : the common multiples of 2 and 3. They are exactly the multiples of 6, the **LCM** of 2 and 3. On a 10-wide grid, multiples of 2 and 5 make straight columns, while multiples of 3 and 9 run along diagonals.",
    },
    {
      title: "Clap the LCM",
      emoji: "👏",
      materials: ["A partner", "A steady beat (a metronome app at about 60 beats per minute, or count aloud)", "Paper and pencil"],
      steps: [
        "Count steady beats out loud together: 1, 2, 3, 4, …",
        "You clap on every 4th beat. Your partner claps on every 6th beat.",
        "Before you start, predict: on which beat will you first clap together?",
        "Play up to beat 36 and write down every beat where you both clapped.",
        "Now try every 4th and every 5th beat, then every 6th and every 9th. Predict first each time.",
      ],
      maths:
        "With 4 and 6 you clap together on beats 12, 24 and 36: the common multiples of 4 and 6. The first one, **12, is the LCM**. It is *not* 4 × 6 = 24, because 4 and 6 share a factor of 2. With 4 and 5, which share no prime factor, the LCM is 4 × 5 = 20. With 6 and 9 it is 18.\n\nEvery common multiple is a multiple of the LCM, so once the claps line up they keep lining up in a steady rhythm. Two flashing lights or two bus routes behave in exactly the same way.",
    },
  ],
  bonusDiagrams: [
    {
      title: "Why only square numbers have an odd number of factors",
      svg: `<svg viewBox="0 0 480 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Dot rectangles. 12 dots make rectangles 1 by 12, 2 by 6 and 3 by 4, so its factors pair up into 6 factors. 16 dots make rectangles 1 by 16, 2 by 8 and 4 by 4; the 4 by 4 square pairs 4 with itself, so 16 has 5 factors, an odd number."><rect x="0" y="0" width="480" height="300" fill="#ffffff"/><line x1="240" y1="8" x2="240" y2="266" stroke="#334155" stroke-width="1" stroke-dasharray="4 4"/><rect x="246" y="106" width="45" height="45" rx="4" fill="#fde68a"/><g fill="#c7d2fe" stroke="#334155" stroke-width="1"><circle cx="24" cy="50" r="4"/><circle cx="35" cy="50" r="4"/><circle cx="46" cy="50" r="4"/><circle cx="57" cy="50" r="4"/><circle cx="68" cy="50" r="4"/><circle cx="79" cy="50" r="4"/><circle cx="90" cy="50" r="4"/><circle cx="101" cy="50" r="4"/><circle cx="112" cy="50" r="4"/><circle cx="123" cy="50" r="4"/><circle cx="134" cy="50" r="4"/><circle cx="145" cy="50" r="4"/><circle cx="24" cy="78" r="4"/><circle cx="35" cy="78" r="4"/><circle cx="46" cy="78" r="4"/><circle cx="57" cy="78" r="4"/><circle cx="68" cy="78" r="4"/><circle cx="79" cy="78" r="4"/><circle cx="24" cy="89" r="4"/><circle cx="35" cy="89" r="4"/><circle cx="46" cy="89" r="4"/><circle cx="57" cy="89" r="4"/><circle cx="68" cy="89" r="4"/><circle cx="79" cy="89" r="4"/><circle cx="24" cy="112" r="4"/><circle cx="35" cy="112" r="4"/><circle cx="46" cy="112" r="4"/><circle cx="57" cy="112" r="4"/><circle cx="24" cy="123" r="4"/><circle cx="35" cy="123" r="4"/><circle cx="46" cy="123" r="4"/><circle cx="57" cy="123" r="4"/><circle cx="24" cy="134" r="4"/><circle cx="35" cy="134" r="4"/><circle cx="46" cy="134" r="4"/><circle cx="57" cy="134" r="4"/><circle cx="252" cy="50" r="4"/><circle cx="263" cy="50" r="4"/><circle cx="274" cy="50" r="4"/><circle cx="285" cy="50" r="4"/><circle cx="296" cy="50" r="4"/><circle cx="307" cy="50" r="4"/><circle cx="318" cy="50" r="4"/><circle cx="329" cy="50" r="4"/><circle cx="340" cy="50" r="4"/><circle cx="351" cy="50" r="4"/><circle cx="362" cy="50" r="4"/><circle cx="373" cy="50" r="4"/><circle cx="384" cy="50" r="4"/><circle cx="395" cy="50" r="4"/><circle cx="406" cy="50" r="4"/><circle cx="417" cy="50" r="4"/><circle cx="252" cy="78" r="4"/><circle cx="263" cy="78" r="4"/><circle cx="274" cy="78" r="4"/><circle cx="285" cy="78" r="4"/><circle cx="296" cy="78" r="4"/><circle cx="307" cy="78" r="4"/><circle cx="318" cy="78" r="4"/><circle cx="329" cy="78" r="4"/><circle cx="252" cy="89" r="4"/><circle cx="263" cy="89" r="4"/><circle cx="274" cy="89" r="4"/><circle cx="285" cy="89" r="4"/><circle cx="296" cy="89" r="4"/><circle cx="307" cy="89" r="4"/><circle cx="318" cy="89" r="4"/><circle cx="329" cy="89" r="4"/><circle cx="252" cy="112" r="4"/><circle cx="263" cy="112" r="4"/><circle cx="274" cy="112" r="4"/><circle cx="285" cy="112" r="4"/><circle cx="252" cy="123" r="4"/><circle cx="263" cy="123" r="4"/><circle cx="274" cy="123" r="4"/><circle cx="285" cy="123" r="4"/><circle cx="252" cy="134" r="4"/><circle cx="263" cy="134" r="4"/><circle cx="274" cy="134" r="4"/><circle cx="285" cy="134" r="4"/><circle cx="252" cy="145" r="4"/><circle cx="263" cy="145" r="4"/><circle cx="274" cy="145" r="4"/><circle cx="285" cy="145" r="4"/></g><g font-family="sans-serif" fill="#1f2937"><text x="120" y="26" font-size="14" font-weight="bold" text-anchor="middle">12 (not a square)</text><text x="360" y="26" font-size="14" font-weight="bold" text-anchor="middle">16 (a square)</text><g font-size="12"><text x="160" y="54">1 × 12</text><text x="95" y="88">2 × 6</text><text x="80" y="127">3 × 4</text><text x="428" y="54">1 × 16</text><text x="340" y="88">2 × 8</text><text x="300" y="132">4 × 4</text><text x="24" y="182">Factor pairs:</text><text x="24" y="200">1 &amp; 12 · 2 &amp; 6 · 3 &amp; 4</text><text x="24" y="218">Every factor has a different</text><text x="24" y="234">partner.</text><text x="252" y="182">Factor pairs:</text><text x="252" y="200">1 &amp; 16 · 2 &amp; 8 · 4 &amp; 4</text><text x="252" y="218">4 pairs with itself, so it</text><text x="252" y="234">counts only once.</text></g><text x="24" y="258" font-size="13" font-weight="bold">6 factors (even)</text><text x="252" y="258" font-size="13" font-weight="bold">5 factors (odd)</text><text x="240" y="288" font-size="13" font-style="italic" text-anchor="middle">Only square numbers have a factor that pairs with itself.</text></g></svg>`,
      caption:
        "Every way of arranging the dots in a rectangle gives a factor pair. Factors normally come in twos, so the count is even. A square number has one arrangement where both sides are equal, and that factor only counts once.",
    },
    {
      title: "Why HCF × LCM = a × b",
      svg: `<svg viewBox="0 0 480 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Venn diagram of the prime factors of 12 and 18. Only in 12: a 2. In the overlap: a 2 and a 3. Only in 18: a 3. HCF = 2 × 3 = 6 and LCM = 2 × 2 × 3 × 3 = 36. 12 × 18 and 6 × 36 both multiply the same primes, 2, 2, 2, 3, 3, 3, so both equal 216."><rect x="0" y="0" width="480" height="300" fill="#ffffff"/><circle cx="195" cy="108" r="80" fill="#c7d2fe" fill-opacity="0.7"/><circle cx="285" cy="108" r="80" fill="#fde68a" fill-opacity="0.7"/><g fill="none" stroke="#1f2937" stroke-width="1.5"><circle cx="195" cy="108" r="80"/><circle cx="285" cy="108" r="80"/></g><g font-family="sans-serif" fill="#1f2937"><text x="12" y="20" font-size="13">12 = 2² × 3</text><text x="468" y="20" font-size="13" text-anchor="end">18 = 2 × 3²</text><text x="160" y="62" font-size="14" font-weight="bold" text-anchor="middle">12</text><text x="320" y="62" font-size="14" font-weight="bold" text-anchor="middle">18</text><circle cx="155" cy="112" r="14" fill="#ffffff" stroke="#1f2937" stroke-width="1.2"/><text x="155" y="117" font-size="14" font-weight="bold" text-anchor="middle">2</text><circle cx="240" cy="92" r="14" fill="#bbf7d0" stroke="#1f2937" stroke-width="1.2"/><text x="240" y="97" font-size="14" font-weight="bold" text-anchor="middle">2</text><circle cx="240" cy="128" r="14" fill="#bbf7d0" stroke="#1f2937" stroke-width="1.2"/><text x="240" y="133" font-size="14" font-weight="bold" text-anchor="middle">3</text><circle cx="325" cy="112" r="14" fill="#ffffff" stroke="#1f2937" stroke-width="1.2"/><text x="325" y="117" font-size="14" font-weight="bold" text-anchor="middle">3</text><g font-size="13" text-anchor="middle"><text x="240" y="210">HCF = the overlap = 2 × 3 = 6</text><text x="240" y="230">LCM = everything = 2 × 2 × 3 × 3 = 36</text></g><g font-size="13" text-anchor="middle" font-weight="bold"><text x="240" y="260">12 × 18 = (2 × 2 × 3) × (2 × 3 × 3) = 216</text><text x="240" y="284">6 × 36 = (2 × 3) × (2 × 2 × 3 × 3) = 216</text></g></g></svg>`,
      caption:
        "In a × b the overlap primes (2 and 3) appear twice: once inside 12 and once inside 18. In HCF × LCM they also appear twice: once as the HCF and once inside the LCM. Every other prime appears once in both. Same primes, same product.",
    },
  ],
  history: {
    title: "The granddaddy of all algorithms",
    story:
      "Around 300 BC, in Book VII of his *Elements*, Euclid described a way to find the HCF of two numbers without listing a single factor: keep replacing the bigger number with the difference of the two. For 252 and 105:\n\n    (252, 105) → (147, 105) → (42, 105) → (42, 63) → (42, 21) → (21, 21)\n\nWhen the two numbers are equal, that number is the HCF: 21. It works because any number that divides both numbers also divides their difference, and anything that divides the smaller number and the difference also divides the bigger one. So the common factors never change along the way.\n\nMore than 2000 years later, computers still use Euclid's method, in a faster form that divides instead of subtracting. It even runs inside the codes that keep online banking secure. The computer scientist Donald Knuth called it \"the granddaddy of all algorithms\".",
  },
};
