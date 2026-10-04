import type { TopicExtras } from "../types.ts";

export const extras: TopicExtras = {
  hook:
    "Think of a number, double it, add 10, halve the result, then subtract the number you first thought of. Is your answer 5? It is for everyone who tries it — and one line of algebra proves the trick can never fail.",

  didYouKnow: [
    "The word *algebra* comes from *al-jabr* ('restoring') in the title of a book written in Baghdad around 820 CE by Muhammad ibn Musa al-Khwarizmi. The word travelled so far that in old Spanish an *algebrista* was a bone-setter — someone who restores broken bones.",
    "Al-Khwarizmi's algebra used no symbols at all: every problem and every method was written out in words. Centuries earlier, in the 3rd century CE, Diophantus of Alexandria had used a special symbol for the unknown and short abbreviations for its square and cube — an early step from words towards the symbols you use today.",
    "The + and − signs first appeared in print in 1489, in a German arithmetic book by Johannes Widmann, where they marked surpluses and shortages in merchants' goods.",
    "The equals sign was invented by the Welsh mathematician Robert Recorde in 1557. He chose two parallel lines because 'noe 2 thynges can be moare equalle' — and he drew them much longer than we do today.",
    "Using x, y and z for unknowns and a, b and c for known values comes from René Descartes's book *La Géométrie* (1637). A popular story says x comes from the Arabic word *shay* ('thing'), but historians have found no evidence for it.",
  ],

  activities: [
    {
      title: "Cups and coins: a mind-reading trick",
      emoji: "🥤",
      materials: ["2 paper cups or envelopes", "About 20 coins, buttons or dried beans", "A friend or family member", "Paper and a pencil"],
      steps: [
        "Ask your friend to think of a whole number from 1 to 10 and keep it secret. Then read out: double it, add 10, halve the result, subtract the number you first thought of.",
        "Announce: \"Your answer is 5.\" Try it on a few people with different numbers.",
        "Now model it. A cup stands for the secret number n — it hides some coins, and it doesn't matter how many. Put down one cup.",
        "**Double it:** put down a second cup, so you have {{2n}}. **Add 10:** put 10 coins next to the cups, so you have {{2n + 10}}.",
        "**Halve it:** split everything into two equal groups and keep one group: 1 cup and 5 coins, which is {{n + 5}}.",
        "**Subtract the number you first thought of:** take away the cup. Only the 5 coins are left — whatever was hiding in the cup.",
        "Invent your own trick, for example: treble it, add 12, divide by 3, take away the starting number. Use the cups and coins to predict the answer before you try it on someone.",
      ],
      maths:
        "The cup is a **variable**: it can hold any number, just like n. Doubling and then halving undo each other, and subtracting n removes the only part that depended on the secret number:\n\n    {{(2n + 10)/2 - n = n + 5 - n = 5}}\n\nBecause this is true for every starting number, it is an **identity**. Your own trick works the same way: {{(3n + 12)/3 - n = n + 4 - n = 4}}.",
    },
    {
      title: "Toothpick squares: three ways to count",
      emoji: "🟫",
      materials: ["About 40 toothpicks, matchsticks or pieces of uncooked spaghetti", "Paper and a pencil"],
      steps: [
        "Make one square from 4 toothpicks. Next to it, build a row of 2 squares that share a side, then 3 squares, then 4. Count the toothpicks each time and record them in a table: 4, 7, 10, 13.",
        "Why does each new square need only 3 more toothpicks? Write a formula for the number of toothpicks T in a row of n squares: {{T = 3n + 1}}. Check it by building 5 squares — you should need 16.",
        "Ask someone else to count in a different way. *The first square uses 4, then each of the other n − 1 squares adds 3* gives {{T = 4 + 3(n - 1)}}. *Every square has 4 sides, but the n − 1 shared sides were counted twice* gives {{T = 4n - (n - 1)}}.",
        "Expand and simplify both: {{4 + 3(n - 1) = 4 + 3n - 3 = 3n + 1}} and {{4n - (n - 1) = 4n - n + 1 = 3n + 1}}. Three ways of counting, one expression.",
        "Now work backwards: with 100 toothpicks, how long a row can you make? Rearrange {{T = 3n + 1}} to make n the subject, then substitute T = 100.",
      ],
      maths:
        "Different ways of seeing the same pattern give expressions that look different but are **identical** — expanding the brackets proves it. Making n the subject turns the formula round: {{n = (T - 1)/3}}, so {{n = (100 - 1)/3 = 33}}. A row of 33 squares uses exactly 3 × 33 + 1 = 100 toothpicks.",
    },
  ],

  bonusDiagrams: [
    {
      title: "Factorising is the area model backwards",
      svg: `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A rectangle of height 3x split into two pieces: a 3x by 2x piece of area 6x squared and a 3x by 3 piece of area 9x, showing 6x squared plus 9x equals 3x times 2x plus 3"><rect x="0" y="0" width="400" height="250" fill="#ffffff"/><g font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="200" y="24" font-size="14" font-weight="bold">Which rectangle has area 6x² + 9x?</text></g><g stroke="#334155" stroke-width="1.5"><rect x="136" y="60" width="80" height="120" fill="#c7d2fe"/><rect x="216" y="60" width="48" height="120" fill="#fde68a"/></g><g stroke="#334155" stroke-width="1"><line x1="136" y1="50" x2="216" y2="50"/><line x1="136" y1="46" x2="136" y2="54"/><line x1="216" y1="46" x2="216" y2="54"/><line x1="264" y1="46" x2="264" y2="54"/><line x1="216" y1="50" x2="264" y2="50"/><line x1="124" y1="60" x2="124" y2="180"/><line x1="120" y1="60" x2="128" y2="60"/><line x1="120" y1="180" x2="128" y2="180"/></g><g font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-size="13"><text x="176" y="42">2x</text><text x="240" y="42">3</text><text x="106" y="124">3x</text><text x="176" y="125" font-size="16" font-weight="bold">6x²</text><text x="240" y="125" font-size="16" font-weight="bold">9x</text><text x="200" y="208" font-size="14" font-weight="bold">6x² + 9x = 3x(2x + 3)</text><text x="200" y="232" font-size="12">Both pieces share the side 3x — the HCF of 6x² and 9x.</text></g></svg>`,
      caption:
        "Expanding finds the area from the sides; factorising finds the sides from the area. Both pieces must share one side, and the longest side they can share is the HCF, {{3x}}. Check: {{3x * 2x = 6x^2}} and {{3x * 3 = 9x}}. (Drawn with x = 2.5 units, so 3x : 2x : 3 = 7.5 : 5 : 3.)",
    },
    {
      title: "Doing and undoing: changing the subject",
      svg: `<svg viewBox="0 0 440 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two function machines. Top: x goes through times 3 then plus 5 to give y, so 4 becomes 12 then 17. Bottom, running right to left: y goes through minus 5 then divide by 3 to give x, so 17 becomes 12 then 4."><rect x="0" y="0" width="440" height="250" fill="#ffffff"/><g font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="220" y="24" font-size="14" font-weight="bold">Doing: y = 3x + 5</text><text x="220" y="140" font-size="13">Undoing: reverse the order, use the inverse operations</text><text x="220" y="238" font-size="14" font-weight="bold">x = (y − 5) ÷ 3</text></g><g stroke="#334155" stroke-width="1.5"><circle cx="40" cy="80" r="20" fill="#bbf7d0"/><rect x="110" y="60" width="80" height="40" rx="6" fill="#c7d2fe"/><rect x="240" y="60" width="80" height="40" rx="6" fill="#c7d2fe"/><circle cx="400" cy="80" r="20" fill="#bae6fd"/><circle cx="40" cy="190" r="20" fill="#bbf7d0"/><rect x="110" y="170" width="80" height="40" rx="6" fill="#fde68a"/><rect x="240" y="170" width="80" height="40" rx="6" fill="#fde68a"/><circle cx="400" cy="190" r="20" fill="#bae6fd"/><line x1="60" y1="80" x2="102" y2="80"/><line x1="190" y1="80" x2="232" y2="80"/><line x1="320" y1="80" x2="372" y2="80"/><line x1="380" y1="190" x2="328" y2="190"/><line x1="240" y1="190" x2="198" y2="190"/><line x1="110" y1="190" x2="68" y2="190"/></g><g fill="#334155"><polygon points="110,80 102,75 102,85"/><polygon points="240,80 232,75 232,85"/><polygon points="380,80 372,75 372,85"/><polygon points="320,190 328,185 328,195"/><polygon points="190,190 198,185 198,195"/><polygon points="60,190 68,185 68,195"/></g><g font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="40" y="85" font-size="14" font-weight="bold">x</text><text x="150" y="85" font-size="14" font-weight="bold">× 3</text><text x="280" y="85" font-size="14" font-weight="bold">+ 5</text><text x="400" y="85" font-size="14" font-weight="bold">y</text><text x="40" y="195" font-size="14" font-weight="bold">x</text><text x="150" y="195" font-size="14" font-weight="bold">÷ 3</text><text x="280" y="195" font-size="14" font-weight="bold">− 5</text><text x="400" y="195" font-size="14" font-weight="bold">y</text><g font-size="12" fill="#334155"><text x="81" y="72">4</text><text x="211" y="72">12</text><text x="346" y="72">17</text><text x="89" y="182">4</text><text x="219" y="182">12</text><text x="354" y="182">17</text></g></g></svg>`,
      caption:
        "The bottom machine runs right to left. The last step done to x (+ 5) is the first one undone (− 5), just as you take your shoes off before your socks. So {{y = 3x + 5}} rearranges to {{x = (y - 5)/3}}.",
    },
  ],

  history: {
    title: "The code-breaker who put letters into algebra",
    story:
      "François Viète (1540–1603) was a French lawyer and royal adviser who did mathematics in his spare time. During a war with Spain, King Henri IV handed him intercepted Spanish letters written in a secret code of more than 500 symbols — and Viète cracked it. King Philip II of Spain was so sure his code was unbreakable that he complained to the Pope that the French must be using sorcery.\n\nIn 1591 Viète published his *Introduction to the Analytic Art*, and did something new. Before him, algebra was mostly written in words and worked one problem at a time. Viète used letters for the *known* numbers as well as the unknowns — vowels for unknowns, consonants for knowns — so one calculation could solve a whole family of problems at once. Every formula you write, like {{P = 2(l + w)}}, owes something to him.",
  },
};
