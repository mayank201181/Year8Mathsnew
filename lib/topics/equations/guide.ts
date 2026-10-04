import type { TopicGuide } from "../../types.ts";

export const guide: TopicGuide = {
  id: "equations",
  title: "Equations & Inequalities",
  strand: "Algebra",
  icon: "🔐",
  summary: "Unlock any unknown with the balance method — then pin down whole ranges of answers with inequalities.",
  intro:
    "An equation is a balanced scale with a secret on it: one hidden number makes both sides equal, and your job is to find it without ever tipping the balance. In this chapter you'll solve equations with brackets, fractions and unknowns on both sides, turn word problems into algebra, and then move from single answers to whole ranges of answers with inequalities. Every answer can be checked by substituting it back — so you will always know when you're right.",
  guide: [
    // ------------------------------------------------------------------ 1
    {
      id: "solving-equations",
      heading: "Solving one- and two-step equations",
      discovery: {
        problem:
          "A balanced scale holds 3 identical mystery bags and a 4 kg weight on the left pan, and 19 kg of weights on the right. How heavy is one bag? Write down every move you make.\n\nNow a twist: 'I multiply my number by 3, add 4, and get 6.' Can my number be a whole number?",
        idea:
          "Take 4 kg off **both** pans: 3 bags balance 15 kg. Share both pans into 3 equal parts: one bag is 5 kg. Each move did the same thing to both sides, so the scale stayed level. In symbols: {{3x + 4 = 19}}, so {{3x = 15}}, so {{x = 5}}.\n\nThe twist gives {{3x + 4 = 6}}, so {{3x = 2}} and {{x = 2/3}}. Solutions don't have to be whole numbers — or even positive.",
      },
      body:
        "An **equation** is a statement that two expressions are equal, such as {{3x + 4 = 19}}. The letter stands for an **unknown** — one particular number we haven't found yet. **Solving** the equation means finding the value of the unknown (the **solution**) that makes the statement true.\n\n**The balance method.** Think of the = sign as the pivot of a level scale. You may add, subtract, multiply or divide (by anything except 0) — as long as you do exactly the same to **both sides**. Your aim is to strip everything away from the letter until it stands alone: {{x = ...}}.\n\n**Inverse operations.** Every operation has an undo button, called its **inverse**: + and − undo each other, and so do × and ÷. To build {{3x + 4}} from x you multiply by 3 *then* add 4. To unpick it, undo in **reverse order**: subtract 4 first, then divide by 3.\n\n| Equation | Do to both sides | Solution |\n|---|---|---|\n| {{x + 7 = 3}} | − 7 | {{x = -4}} |\n| {{x - 2.5 = 6}} | + 2.5 | {{x = 8.5}} |\n| {{4x = 10}} | ÷ 4 | {{x = 10/4 = 5/2}} |\n| {{-3x = 12}} | ÷ (−3) | {{x = -4}} |\n\n**Answers come in all shapes.** Negative and fractional solutions are completely normal. Give a fraction in its simplest form (or as an exact decimal) and don't round unless the question asks you to.\n\n**Check by substitution.** Put your answer back into the *original* equation. For {{x = 5}}: {{3 * 5 + 4 = 19}} ✓. It takes ten seconds and catches almost every slip.",
      diagram: `<svg viewBox="0 0 420 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A level balance scale. The left pan holds three identical bags labelled x and a 4 kilogram weight. The right pan holds a 19 kilogram weight."><rect width="420" height="240" fill="#ffffff"/><rect x="150" y="206" width="120" height="12" rx="3" fill="#cbd5e1" stroke="#334155" stroke-width="1.5"/><rect x="204" y="150" width="12" height="56" fill="#e2e8f0" stroke="#334155" stroke-width="1.5"/><polygon points="210,134 196,152 224,152" fill="#334155"/><rect x="85" y="126" width="250" height="8" rx="3" fill="#475569"/><rect x="91" y="104" width="8" height="22" fill="#94a3b8" stroke="#334155"/><rect x="321" y="104" width="8" height="22" fill="#94a3b8" stroke="#334155"/><rect x="20" y="98" width="150" height="6" rx="3" fill="#94a3b8" stroke="#334155"/><rect x="250" y="98" width="150" height="6" rx="3" fill="#94a3b8" stroke="#334155"/><rect x="26" y="58" width="30" height="40" rx="7" fill="#fde68a" stroke="#334155" stroke-width="1.5"/><rect x="60" y="58" width="30" height="40" rx="7" fill="#fde68a" stroke="#334155" stroke-width="1.5"/><rect x="94" y="58" width="30" height="40" rx="7" fill="#fde68a" stroke="#334155" stroke-width="1.5"/><text x="41" y="84" font-size="16" font-style="italic" font-family="sans-serif" text-anchor="middle" fill="#1f2937">x</text><text x="75" y="84" font-size="16" font-style="italic" font-family="sans-serif" text-anchor="middle" fill="#1f2937">x</text><text x="109" y="84" font-size="16" font-style="italic" font-family="sans-serif" text-anchor="middle" fill="#1f2937">x</text><polygon points="130,98 166,98 160,66 136,66" fill="#c7d2fe" stroke="#334155" stroke-width="1.5"/><text x="148" y="87" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">4 kg</text><polygon points="282,98 368,98 356,48 294,48" fill="#c7d2fe" stroke="#334155" stroke-width="1.5"/><text x="325" y="79" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">19 kg</text><text x="95" y="174" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">3x + 4</text><text x="325" y="174" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">19</text><text x="210" y="236" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Level beam: 3x + 4 = 19</text></svg>`,
      diagramCaption:
        "The scale is level, so both pans have equal mass: {{3x + 4 = 19}}. Remove 4 kg from each pan, then share each pan into 3.",
      workedExamples: [
        {
          title: "A two-step equation",
          problem: "Solve {{5x - 3 = 27}}.",
          steps: [
            "The last thing done to x was − 3, so undo it first: add 3 to both sides. {{5x = 30}}.",
            "Now undo × 5: divide both sides by 5. {{x = 6}}.",
            "Check: {{5 * 6 - 3 = 30 - 3 = 27}} ✓.",
          ],
          answer: "{{x = 6}}",
          yourTurn: {
            question: "Your turn: solve {{4x - 7 = 21}}.",
            answer: { type: "number", value: 7 },
            solution: "Add 7 to both sides: {{4x = 28}}. Divide both sides by 4: {{x = 7}}. Check: 4 × 7 − 7 = 21 ✓.",
          },
        },
        {
          title: "A negative, fractional solution",
          problem: "Solve {{6x + 11 = 2}}.",
          steps: [
            "Subtract 11 from both sides: {{6x = -9}}.",
            "Divide both sides by 6: {{x = -9/6 = -3/2}}.",
            "As a decimal, {{x = -1.5}}. Check: 6 × (−1.5) + 11 = −9 + 11 = 2 ✓.",
          ],
          answer: "{{x = -3/2}} (or −1.5)",
        },
        {
          title: "When x is being subtracted",
          problem: "Solve {{20 - 3x = 8}}.",
          steps: [
            "The x-term is negative. Add 3x to both sides to make it positive: {{20 = 8 + 3x}}.",
            "Subtract 8 from both sides: {{12 = 3x}}.",
            "Divide both sides by 3: {{x = 4}}. Check: 20 − 3 × 4 = 20 − 12 = 8 ✓.",
          ],
          answer: "{{x = 4}}",
        },
      ],
      keyPoints: [
        "Whatever you do to one side, do to the other — that keeps the equation true.",
        "Undo in reverse order: usually deal with + and − first, then × and ÷.",
        "Solutions can be negative or fractions; give fractions in simplest form.",
        "Check by substituting into the *original* equation.",
      ],
      whyItWorks:
        "If two quantities are equal, say {{a = b}}, then {{a - 4}} and {{b - 4}} are still equal, and so are {{a/3}} and {{b/3}} — you have changed both by exactly the same amount. So every move gives a new, simpler equation with **exactly the same solution** as the one before. When you finally reach {{x = 5}}, that answer was hiding inside {{3x + 4 = 19}} all along.\n\nThe one forbidden move is dividing by 0: {{0 * 3 = 0 * 7}} is true, but dividing both sides by 0 would 'prove' that 3 = 7.",
      strategies: ["Use the inverse", "Work backwards", "Check by substituting"],
      thinkDeeper:
        "Arjun divides {{3x + 4 = 19}} by 3 first and writes {{x + 4 = 19/3}}. What went wrong? Is there a correct way to divide by 3 first — and does it lead to the same answer?",
    },

    // ------------------------------------------------------------------ 2
    {
      id: "equations-with-brackets",
      heading: "Equations with brackets",
      discovery: {
        problem:
          "Solve {{4(x + 3) = 20}} in two different ways: once by multiplying out the bracket first, and once *without* multiplying it out. Which felt quicker?\n\nNow try {{4(x + 3) = 18}} both ways. Does your favourite method change?",
        idea:
          "**Divide first:** if 4 lots of {{(x + 3)}} make 20, one lot makes 5, so {{x + 3 = 5}} and {{x = 2}}. **Expand first:** {{4x + 12 = 20}}, {{4x = 8}}, {{x = 2}}. Same answer, as it must be.\n\nWith 18, dividing first gives {{x + 3 = 9/2}} — fractions straight away — while expanding gives {{4x + 12 = 18}}, {{4x = 6}}, {{x = 3/2}}, which is tidier. Divide first when it divides exactly; otherwise expand.",
      },
      body:
        "A **bracket** groups an expression, and the number outside multiplies *everything* inside: {{4(x + 3)}} means 4 lots of {{(x + 3)}}, which is {{4x + 12}}. To **expand** (multiply out) a bracket, multiply each term inside by the term outside.\n\nThere are two good routes to the solution:\n\n| | Expand first | Divide first |\n|---|---|---|\n| {{5(x - 2) = 35}} | {{5x - 10 = 35}}, {{5x = 45}}, {{x = 9}} | {{x - 2 = 7}}, {{x = 9}} |\n| Best when… | always works — the safe default | the other side is a multiple of the number outside |\n\n**Watch the signs.** A negative number outside multiplies every term: {{-3(x - 4) = -3x + 12}}, because {{-3 * -4 = +12}}. Forgetting to multiply the second term — writing {{4(x + 3) = 4x + 3}} — is the most common bracket error of all.\n\n**More than one bracket?** Expand each one, collect **like terms** (terms with the same letter part, such as 3x and 2x), then solve. For example, {{3(x + 2) + 2(x - 1) = 24}} becomes {{3x + 6 + 2x - 2 = 24}}, which is {{5x + 4 = 24}}, so {{x = 4}}.",
      diagram: `<svg viewBox="0 0 360 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Area model: a rectangle 4 units tall is split into two parts, x wide and 3 wide. The parts have areas 4x and 12, and the whole rectangle has area 20."><rect width="360" height="230" fill="#ffffff"/><rect x="90" y="40" width="72" height="144" fill="#c7d2fe" stroke="#334155" stroke-width="2"/><rect x="162" y="40" width="108" height="144" fill="#fde68a" stroke="#334155" stroke-width="2"/><path d="M198,40 V184 M234,40 V184 M162,76 H270 M162,112 H270 M162,148 H270" stroke="#334155" stroke-width="0.7" stroke-dasharray="3 3" fill="none"/><text x="126" y="30" font-size="15" font-style="italic" font-family="sans-serif" text-anchor="middle" fill="#1f2937">x</text><text x="216" y="30" font-size="15" font-family="sans-serif" text-anchor="middle" fill="#1f2937">3</text><text x="74" y="117" font-size="15" font-family="sans-serif" text-anchor="middle" fill="#1f2937">4</text><text x="126" y="118" font-size="16" font-family="sans-serif" text-anchor="middle" fill="#1f2937">4x</text><text x="216" y="100" font-size="16" font-family="sans-serif" text-anchor="middle" fill="#1f2937">12</text><text x="180" y="214" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">4(x + 3) = 4x + 12 = 20</text></svg>`,
      diagramCaption:
        "A rectangle 4 tall and {{(x + 3)}} wide. Its area is {{4(x + 3)}}, but it is also {{4x + 12}}. If the total area is 20, then {{4x = 8}} and {{x = 2}} (drawn to scale).",
      workedExamples: [
        {
          title: "Divide first (it divides exactly)",
          problem: "Solve {{3(x - 4) = 21}}.",
          steps: [
            "21 is a multiple of 3, so divide both sides by 3: {{x - 4 = 7}}.",
            "Add 4 to both sides: {{x = 11}}.",
            "Expanding first works too: {{3x - 12 = 21}}, {{3x = 33}}, {{x = 11}}.",
            "Check: 3 × (11 − 4) = 3 × 7 = 21 ✓.",
          ],
          answer: "{{x = 11}}",
          yourTurn: {
            question: "Your turn: solve {{6(x - 5) = 42}}.",
            answer: { type: "number", value: 12 },
            solution: "Divide both sides by 6: {{x - 5 = 7}}. Add 5: {{x = 12}}. Check: 6 × 7 = 42 ✓.",
          },
        },
        {
          title: "Expand first (it doesn't divide exactly)",
          problem: "Solve {{2(3x + 5) = 17}}.",
          steps: [
            "17 is odd, so dividing by 2 would give a fraction straight away. Expand instead: {{6x + 10 = 17}}.",
            "Subtract 10 from both sides: {{6x = 7}}.",
            "Divide both sides by 6: {{x = 7/6}}.",
            "Check: {{3x + 5 = 7/2 + 5 = 17/2}}, and {{2 * 17/2 = 17}} ✓.",
          ],
          answer: "{{x = 7/6}}",
        },
        {
          title: "Two brackets and a negative",
          problem: "Solve {{5(x + 1) - 2(x - 3) = 26}}.",
          steps: [
            "Expand each bracket. Careful: {{-2(x - 3) = -2x + 6}}.",
            "So {{5x + 5 - 2x + 6 = 26}}.",
            "Collect like terms: {{3x + 11 = 26}}.",
            "Subtract 11: {{3x = 15}}. Divide by 3: {{x = 5}}.",
            "Check: 5 × 6 − 2 × 2 = 30 − 4 = 26 ✓.",
          ],
          answer: "{{x = 5}}",
        },
      ],
      keyPoints: [
        "The number outside multiplies every term inside the bracket.",
        "Divide first if it divides exactly; otherwise expand first.",
        "A negative outside changes the sign of every term inside: {{-2(x - 3) = -2x + 6}}.",
        "With several brackets: expand, collect like terms, then solve.",
      ],
      whyItWorks:
        "The area model shows why expanding is allowed. A rectangle 4 tall and {{(x + 3)}} wide has area {{4(x + 3)}} — but the same rectangle is made of two smaller ones with areas {{4x}} and 12. Same rectangle, same area, so {{4(x + 3) = 4x + 12}} for every value of x. This is the **distributive law**.\n\nDividing first is just the balance method: share both sides into 4 equal groups, and one group of {{(x + 3)}} balances one quarter of 20.",
      strategies: ["Divide first when it's exact", "Draw a diagram (area model)", "Check by substituting"],
      thinkDeeper:
        "Try to solve {{3(x + 2) = 3x + 6}} and then {{3(x + 2) = 3x + 5}}. What happens to the x's each time? Explain what each result tells you about how many solutions there are.",
    },

    // ------------------------------------------------------------------ 3
    {
      id: "unknowns-both-sides",
      heading: "Unknowns on both sides",
      discovery: {
        problem:
          "Two bike-hire stalls at East Coast Park. Stall A charges a $3 fee plus $5 per hour. Stall B charges a $15 fee plus $2 per hour. After how many hours do the two stalls cost exactly the same?",
        idea:
          "Write each cost for h hours and set them equal: {{5h + 3 = 2h + 15}}. Both sides contain 2h, so take 2h from both sides: {{3h + 3 = 15}}. Now it's an ordinary two-step equation: {{3h = 12}}, so {{h = 4}} hours.\n\nCheck: A costs 5 × 4 + 3 = $23 and B costs 2 × 4 + 15 = $23 ✓.",
      },
      body:
        "When the unknown appears on **both** sides, a single inverse can't free it — the x's are in two places. So first **collect** them: add or subtract an x-term on both sides so that x appears on one side only. Then finish as a two-step equation.\n\n**Which side?** Collect the x's on the side with the **larger coefficient** (the number multiplying x). In {{2x + 9 = 5x - 6}}, 5x is bigger, so subtract 2x from both sides:\n\n    {{2x + 9 = 5x - 6}}\n    {{9 = 3x - 6}}    (subtract 2x)\n    {{15 = 3x}}    (add 6)\n    {{x = 5}}    (divide by 3)\n\nThis keeps the x-coefficient positive, so you never have to divide by a negative. Ending with {{15 = 3x}} 'the wrong way round' is fine — equality works both ways, so it means exactly the same as {{3x = 15}}.\n\n**Negatives.** To remove a term like −4x from a side, *add* 4x to both sides. In {{7 - 4x = x + 2}}, adding 4x gives {{7 = 5x + 2}}, so {{5x = 5}} and {{x = 1}}.\n\n**Surprise endings.** If all the x's cancel, you are left with either something always true (like {{6 = 6}}) — the two sides were an **identity**, true for every x — or something impossible (like {{6 = 2}}), meaning there is **no solution**.",
      diagram: `<svg viewBox="0 0 440 215" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bar model. Top bar: five boxes labelled x then a box labelled 3. Bottom bar: two boxes labelled x then a box labelled 15. Both bars are the same length. The first two x boxes are shaded grey in both bars to show they can be removed."><rect width="440" height="215" fill="#ffffff"/><text x="40" y="36" font-size="13" font-family="sans-serif" fill="#1f2937">5x + 3</text><rect x="40" y="44" width="64" height="34" fill="#e2e8f0" stroke="#334155" stroke-width="1.5"/><rect x="104" y="44" width="64" height="34" fill="#e2e8f0" stroke="#334155" stroke-width="1.5"/><rect x="168" y="44" width="64" height="34" fill="#c7d2fe" stroke="#334155" stroke-width="1.5"/><rect x="232" y="44" width="64" height="34" fill="#c7d2fe" stroke="#334155" stroke-width="1.5"/><rect x="296" y="44" width="64" height="34" fill="#c7d2fe" stroke="#334155" stroke-width="1.5"/><rect x="360" y="44" width="48" height="34" fill="#fde68a" stroke="#334155" stroke-width="1.5"/><text x="72" y="66" font-size="14" font-style="italic" font-family="sans-serif" text-anchor="middle" fill="#1f2937">x</text><text x="136" y="66" font-size="14" font-style="italic" font-family="sans-serif" text-anchor="middle" fill="#1f2937">x</text><text x="200" y="66" font-size="14" font-style="italic" font-family="sans-serif" text-anchor="middle" fill="#1f2937">x</text><text x="264" y="66" font-size="14" font-style="italic" font-family="sans-serif" text-anchor="middle" fill="#1f2937">x</text><text x="328" y="66" font-size="14" font-style="italic" font-family="sans-serif" text-anchor="middle" fill="#1f2937">x</text><text x="384" y="66" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">3</text><text x="40" y="110" font-size="13" font-family="sans-serif" fill="#1f2937">2x + 15</text><rect x="40" y="118" width="64" height="34" fill="#e2e8f0" stroke="#334155" stroke-width="1.5"/><rect x="104" y="118" width="64" height="34" fill="#e2e8f0" stroke="#334155" stroke-width="1.5"/><rect x="168" y="118" width="240" height="34" fill="#fde68a" stroke="#334155" stroke-width="1.5"/><text x="72" y="140" font-size="14" font-style="italic" font-family="sans-serif" text-anchor="middle" fill="#1f2937">x</text><text x="136" y="140" font-size="14" font-style="italic" font-family="sans-serif" text-anchor="middle" fill="#1f2937">x</text><text x="288" y="140" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">15</text><line x1="168" y1="30" x2="168" y2="160" stroke="#334155" stroke-width="1.5" stroke-dasharray="5 4"/><text x="104" y="174" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#334155">remove 2x from both</text><text x="224" y="202" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Left over: 3x + 3 = 15, so 3x = 12 and x = 4</text></svg>`,
      diagramCaption:
        "The two bars are equal, so {{5x + 3 = 2x + 15}}. Cross off 2x from each and what's left still matches: {{3x + 3 = 15}}. (Drawn to scale with {{x = 4}}.)",
      workedExamples: [
        {
          title: "Collect, then two steps",
          problem: "Solve {{7x - 5 = 3x + 19}}.",
          steps: [
            "7x is the larger x-term, so subtract 3x from both sides: {{4x - 5 = 19}}.",
            "Add 5 to both sides: {{4x = 24}}.",
            "Divide both sides by 4: {{x = 6}}.",
            "Check: left 7 × 6 − 5 = 37; right 3 × 6 + 19 = 37 ✓.",
          ],
          answer: "{{x = 6}}",
          yourTurn: {
            question: "Your turn: solve {{9x - 4 = 5x + 28}}.",
            answer: { type: "number", value: 8 },
            solution: "Subtract 5x: {{4x - 4 = 28}}. Add 4: {{4x = 32}}. Divide by 4: {{x = 8}}. Check: 72 − 4 = 68 and 40 + 28 = 68 ✓.",
          },
        },
        {
          title: "The bigger coefficient is on the right",
          problem: "Solve {{3x + 20 = 8x + 45}}.",
          steps: [
            "8x is larger, so subtract 3x from both sides: {{20 = 5x + 45}}.",
            "Subtract 45 from both sides: {{-25 = 5x}}.",
            "Divide both sides by 5: {{x = -5}}.",
            "Check: left 3 × (−5) + 20 = 5; right 8 × (−5) + 45 = 5 ✓.",
          ],
          answer: "{{x = -5}}",
        },
        {
          title: "Brackets and a negative x-term",
          problem: "Solve {{4(2x - 1) = 11 - 2x}}.",
          steps: [
            "Expand the bracket: {{8x - 4 = 11 - 2x}}.",
            "Add 2x to both sides to remove the −2x: {{10x - 4 = 11}}.",
            "Add 4: {{10x = 15}}. Divide by 10: {{x = 15/10 = 3/2}}.",
            "Check with x = 1.5: left 4 × (3 − 1) = 8; right 11 − 3 = 8 ✓.",
          ],
          answer: "{{x = 3/2}} (or 1.5)",
        },
      ],
      keyPoints: [
        "Collect x-terms on one side and numbers on the other.",
        "Remove the smaller x-term, so x ends up on the side with the larger coefficient and stays positive.",
        "To remove −4x from a side, add 4x to both sides.",
        "{{15 = 3x}} is fine — it means the same as {{3x = 15}}.",
      ],
      whyItWorks:
        "At the solution, each side is just a number in disguise — both sides have the same value. Subtracting 2x from both sides takes the same amount from each, so they stay equal. In the bar model the two bars are the same length; chop an identical 2x off each one and the leftover pieces must still match.",
      strategies: ["Collect like terms", "Use a bar model", "Check by substituting"],
      thinkDeeper:
        "Find the value of k that makes {{4x + 6 = 2(2x + k)}} true for **every** value of x. What happens for any other value of k? Could any choice of k give exactly one solution? Explain.",
    },

    // ------------------------------------------------------------------ 4
    {
      id: "fractional-equations",
      heading: "Equations with fractions",
      discovery: {
        problem:
          "'I think of a number, divide it by 3, then add 2. The answer is 7.' What was my number?\n\n'I think of a new number, double it, subtract 1, then divide by 5. The answer is 3.' What was it this time? Try to work each one backwards.",
        idea:
          "Undo each step in reverse. First: 7 − 2 = 5, then 5 × 3 = 15. In symbols {{x/3 + 2 = 7}}, so {{x/3 = 5}}, so {{x = 15}}.\n\nSecond: 3 × 5 = 15, 15 + 1 = 16, 16 ÷ 2 = 8, so {{(2x - 1)/5 = 3}} gives {{x = 8}}. The key move: **multiply** to undo a division.",
      },
      body:
        "A fraction bar is a division sign in disguise: {{x/3}} means x ÷ 3. So its inverse is to **multiply both sides by the denominator** — this is called **clearing the fraction**.\n\n- **A fraction term:** {{x/3 + 2 = 7}}. Undo the + 2 first ({{x/3 = 5}}), then multiply by 3: {{x = 15}}.\n- **A whole side over a denominator:** {{(2x - 1)/5 = 3}}. The fraction bar acts like a bracket around {{2x - 1}}, so multiply by 5 straight away: {{2x - 1 = 15}}, then {{2x = 16}}, so {{x = 8}}.\n- **A fractional coefficient:** {{2/3 x = 8}} means two-thirds of x is 8. Multiply by 3 ({{2x = 24}}), then divide by 2: {{x = 12}}. Or multiply both sides by the reciprocal {{3/2}} in one step.\n\n**Several fractions at once.** If there are different denominators, multiply *every term* on both sides by their **lowest common multiple** (LCM). For {{x/2 + x/3 = 10}}, the LCM of 2 and 3 is 6:\n\n    {{6 * x/2 + 6 * x/3 = 6 * 10}}\n    {{3x + 2x = 60}}\n    {{5x = 60}}, so {{x = 12}}\n\n**The classic trap** is multiplying only *some* terms. In {{x/4 + 3 = 5}}, multiplying by 4 gives {{x + 12 = 20}}, not {{x + 3 = 20}} — the 3 must be multiplied too. (Or subtract 3 first: {{x/4 = 2}}, so {{x = 8}}.)",
      diagram: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bar model. A bar for x is split into three equal parts, each x divided by 3. Below, one of those parts plus a piece of length 2 makes a total of 7."><rect width="400" height="220" fill="#ffffff"/><path d="M50,40 V33 H350 V40" fill="none" stroke="#334155" stroke-width="1.5"/><text x="200" y="27" font-size="15" font-style="italic" font-family="sans-serif" text-anchor="middle" fill="#1f2937">x</text><rect x="50" y="44" width="100" height="36" fill="#c7d2fe" stroke="#334155" stroke-width="1.5"/><rect x="150" y="44" width="100" height="36" fill="#c7d2fe" stroke="#334155" stroke-width="1.5"/><rect x="250" y="44" width="100" height="36" fill="#c7d2fe" stroke="#334155" stroke-width="1.5"/><text x="100" y="67" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">x ÷ 3</text><text x="200" y="67" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">x ÷ 3</text><text x="300" y="67" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">x ÷ 3</text><line x1="50" y1="80" x2="50" y2="110" stroke="#334155" stroke-dasharray="4 3"/><line x1="150" y1="80" x2="150" y2="110" stroke="#334155" stroke-dasharray="4 3"/><rect x="50" y="110" width="100" height="36" fill="#c7d2fe" stroke="#334155" stroke-width="1.5"/><rect x="150" y="110" width="40" height="36" fill="#fde68a" stroke="#334155" stroke-width="1.5"/><text x="100" y="133" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">x ÷ 3</text><text x="170" y="133" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">2</text><path d="M50,152 V159 H190 V152" fill="none" stroke="#334155" stroke-width="1.5"/><text x="120" y="176" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">7</text><text x="200" y="206" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">x ÷ 3 = 7 − 2 = 5, so x = 3 × 5 = 15</text></svg>`,
      diagramCaption:
        "{{x/3 + 2 = 7}} as a bar model: one third of x plus 2 makes 7, so one third is 5 and the whole of x is 15 (drawn to scale).",
      workedExamples: [
        {
          title: "Undo the add, then clear the fraction",
          problem: "Solve {{x/4 - 3 = 5}}.",
          steps: [
            "Add 3 to both sides: {{x/4 = 8}}.",
            "Multiply both sides by 4: {{x = 32}}.",
            "Check: {{32/4 - 3 = 8 - 3 = 5}} ✓.",
          ],
          answer: "{{x = 32}}",
          yourTurn: {
            question: "Your turn: solve {{x/6 + 4 = 9}}.",
            answer: { type: "number", value: 30 },
            solution: "Subtract 4: {{x/6 = 5}}. Multiply by 6: {{x = 30}}. Check: {{30/6 + 4 = 5 + 4 = 9}} ✓.",
          },
        },
        {
          title: "The whole side is a fraction",
          problem: "Solve {{(3x + 2)/4 = 5}}.",
          steps: [
            "The fraction bar groups {{3x + 2}}, so multiply both sides by 4 first: {{3x + 2 = 20}}.",
            "Subtract 2: {{3x = 18}}.",
            "Divide by 3: {{x = 6}}.",
            "Check: {{(18 + 2)/4 = 20/4 = 5}} ✓.",
          ],
          answer: "{{x = 6}}",
        },
        {
          title: "Fractions on both sides",
          problem: "Solve {{(x + 1)/2 = (x + 5)/3}}.",
          steps: [
            "The LCM of 2 and 3 is 6. Multiply both sides by 6: {{3(x + 1) = 2(x + 5)}}.",
            "Expand: {{3x + 3 = 2x + 10}}.",
            "Subtract 2x: {{x + 3 = 10}}, so {{x = 7}}.",
            "Check: {{8/2 = 4}} and {{12/3 = 4}} ✓.",
          ],
          answer: "{{x = 7}}",
        },
      ],
      keyPoints: [
        "A fraction bar means divide — undo it by multiplying.",
        "If a whole side is over a denominator, multiply by the denominator first; treat the top as if it were in brackets.",
        "With several denominators, multiply **every** term by the LCM.",
        "{{2/3 x = 8}}: multiply by 3, then divide by 2 (or multiply by {{3/2}}).",
      ],
      whyItWorks:
        "Multiplying both sides by 5 keeps the balance, and {{5 * (2x - 1)/5}} is simply {{2x - 1}}, because × 5 and ÷ 5 cancel — five lots of a fifth is the whole thing. The fraction bar groups the *entire* numerator, which is why you can't split it: {{(2x - 1)/5}} is not the same as {{2x - 1/5}}.",
      strategies: ["Work backwards", "Clear the fractions (multiply by the LCM)", "Use a bar model"],
      thinkDeeper:
        "Siti tries to clear the fractions in {{x/2 + x/3 = 10}} by multiplying everything by 5, 'because 2 + 3 = 5'. Does it work? Explain why 6 and 12 both clear the fractions but 5 can't, and describe every number that would work.",
    },

    // ------------------------------------------------------------------ 5
    {
      id: "forming-equations",
      heading: "Forming and solving equations",
      discovery: {
        problem:
          "Three consecutive whole numbers add up to 96. What are they? Try to answer without guessing.\n\nThen: can three consecutive whole numbers ever add up to 100?",
        idea:
          "Call the smallest number n. The next two are {{n + 1}} and {{n + 2}}, so {{n + (n + 1) + (n + 2) = 96}}, which is {{3n + 3 = 96}}. So {{3n = 93}} and {{n = 31}}: the numbers are 31, 32 and 33.\n\nFor 100 you'd need {{3n + 3 = 100}}, so {{n = 97/3}} — not a whole number. In fact {{3n + 3 = 3(n + 1)}}: the total is always 3 times the middle number, so it must be a multiple of 3. Naming the unknown turned a puzzle into an equation.",
      },
      body:
        "Lots of problems become straightforward once you **introduce a variable** — a letter for the quantity you don't know — and translate the words into an equation.\n\n**A four-step routine**\n1. **Define** the unknown in words: 'Let x be the width in cm.'\n2. **Express** every other quantity in terms of x.\n3. **Form** an equation by writing the same quantity in two ways.\n4. **Solve, then answer the question** — in words, with units — and check it fits the story.\n\n**Translating words into algebra**\n\n| Words | Algebra |\n|---|---|\n| a number increased by 7 | {{n + 7}} |\n| 5 less than a number | {{n - 5}} |\n| twice the sum of a number and 3 | {{2(n + 3)}} |\n| a third of a number | {{n/3}} |\n| three consecutive integers | {{n, n + 1, n + 2}} |\n| three consecutive even (or odd) numbers | {{n, n + 2, n + 4}} |\n| Ravi is 4 years older than Hana, who is h | Ravi is {{h + 4}} |\n\n**Where equations come from**\n- **Perimeter:** add up all the side lengths.\n- **Angles:** angles on a straight line add to 180°, around a point to 360°, in a triangle to 180°, in a quadrilateral to 360°.\n- **Ages:** in t years' time, everyone is t years older.\n- **Two ways to describe one amount:** two prices, two costs, two routes to the same total.",
      diagram: `<svg viewBox="0 0 420 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two angles on a straight line meeting at a point. The left angle is (3x + 10) degrees and the right angle is (2x + 20) degrees."><rect width="420" height="230" fill="#ffffff"/><path d="M210,180 L250,180 A40,40 0 0,0 216.95,140.61 Z" fill="#bbf7d0" stroke="none"/><path d="M210,180 L215.21,150.46 A30,30 0 0,0 180,180 Z" fill="#fde68a" stroke="none"/><path d="M250,180 A40,40 0 0,0 216.95,140.61" fill="none" stroke="#334155" stroke-width="1.8"/><path d="M215.21,150.46 A30,30 0 0,0 180,180" fill="none" stroke="#334155" stroke-width="1.8"/><line x1="40" y1="180" x2="380" y2="180" stroke="#1f2937" stroke-width="2.5"/><line x1="210" y1="180" x2="236.05" y2="32.28" stroke="#1f2937" stroke-width="2.5"/><circle cx="210" cy="180" r="3.5" fill="#1f2937"/><text x="258" y="150" font-size="14" font-family="sans-serif" fill="#1f2937">(2x + 20)°</text><text x="190" y="140" font-size="14" font-family="sans-serif" text-anchor="end" fill="#1f2937">(3x + 10)°</text><text x="210" y="214" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">(3x + 10) + (2x + 20) = 180</text></svg>`,
      diagramCaption:
        "Angles on a straight line add up to 180°. Drawn accurately for {{x = 30}}: the angles are 100° and 80°.",
      workedExamples: [
        {
          title: "Perimeter",
          problem: "A rectangle has length {{(2x + 3)}} cm and width x cm. Its perimeter is 36 cm. Find x and the length of the rectangle.",
          steps: [
            "Perimeter = 2 × length + 2 × width, so {{2(2x + 3) + 2x = 36}}.",
            "Expand and collect: {{4x + 6 + 2x = 36}}, so {{6x + 6 = 36}}.",
            "Subtract 6: {{6x = 30}}. Divide by 6: {{x = 5}}.",
            "Length = 2 × 5 + 3 = 13 cm. Check: 2 × 13 + 2 × 5 = 26 + 10 = 36 ✓.",
          ],
          answer: "{{x = 5}}; the length is 13 cm.",
          yourTurn: {
            question: "Your turn: a rectangle has length {{(3x - 2)}} cm and width {{(x + 1)}} cm. Its perimeter is 46 cm. Find x.",
            answer: { type: "number", value: 6 },
            solution: "{{2(3x - 2) + 2(x + 1) = 46}}, so {{6x - 4 + 2x + 2 = 46}}, so {{8x - 2 = 46}}. Then {{8x = 48}} and {{x = 6}}. Check: the sides are 16 cm and 7 cm, and 2 × 16 + 2 × 7 = 46 ✓.",
          },
        },
        {
          title: "Angles on a straight line",
          problem: "Two angles on a straight line are {{(3x + 10)}}° and {{(2x + 20)}}°, as in the diagram. Find x and the size of each angle.",
          steps: [
            "Angles on a straight line add to 180°: {{(3x + 10) + (2x + 20) = 180}}.",
            "Collect like terms: {{5x + 30 = 180}}.",
            "Subtract 30: {{5x = 150}}. Divide by 5: {{x = 30}}.",
            "The angles are 3 × 30 + 10 = 100° and 2 × 30 + 20 = 80°. Check: 100 + 80 = 180 ✓.",
          ],
          answer: "{{x = 30}}; the angles are 100° and 80°.",
        },
        {
          title: "Ages",
          problem: "Aisha is three times as old as her brother Jun. In 6 years' time she will be twice as old as him. How old are they now?",
          steps: [
            "Let j be Jun's age now in years. Then Aisha is 3j.",
            "In 6 years: Jun is {{j + 6}} and Aisha is {{3j + 6}}.",
            "She will be twice his age: {{3j + 6 = 2(j + 6)}}, so {{3j + 6 = 2j + 12}}.",
            "Subtract 2j: {{j + 6 = 12}}, so {{j = 6}}. Jun is 6 and Aisha is 18.",
            "Check: in 6 years they'll be 12 and 24, and 24 = 2 × 12 ✓.",
          ],
          answer: "Jun is 6 and Aisha is 18.",
        },
      ],
      keyPoints: [
        "Start with 'Let x be …' — say exactly what the letter stands for, with units.",
        "Find two expressions for the same quantity and set them equal.",
        "Know your angle facts: straight line 180°, around a point 360°, triangle 180°.",
        "Finish by answering the question actually asked — x is often only a stepping stone.",
      ],
      whyItWorks:
        "An equation is just two descriptions of one quantity. The perimeter *is* 36 cm, and it is *also* {{2(2x + 3) + 2x}} cm — both describe the same length, so they must be equal. Once the story is captured as an equation, all your solving tools take over and the words no longer matter. Checking against the story at the end makes sure your translation was right.",
      strategies: ["Introduce a variable", "Draw a diagram", "Check the answer fits the story"],
      thinkDeeper:
        "Four consecutive odd numbers add up to 120. Find them. Then explain why four consecutive odd numbers can never add up to 122 — and find the smallest multiple of 10 above 120 that they *can* add up to.",
    },

    // ------------------------------------------------------------------ 6
    {
      id: "inequalities",
      heading: "Inequalities & number lines",
      discovery: {
        problem:
          "A lift has a sign: 'Maximum 8 people.' A ride at Sentosa says: 'Riders must be taller than 120 cm.' Write each rule using a letter and a symbol. Can 8 people ride the lift? Can a child who is exactly 120 cm tall go on the ride?\n\nThen list every integer (whole number, positive, negative or zero) that is bigger than −2 but no more than 3.",
        idea:
          "Lift: {{p <= 8}}, so 8 people is allowed — ≤ includes the end value. Ride: {{h > 120}}, so exactly 120 cm is *not* allowed — > leaves the end value out.\n\nIntegers bigger than −2 but at most 3: −1, 0, 1, 2, 3, written {{-2 < x <= 3}}. An **inequality** describes a whole range of values, and the little line under the symbol decides whether the endpoint is in.",
      },
      body:
        "An **inequality** compares two quantities that need not be equal. Its solution is usually a whole **range** of numbers rather than a single value.\n\n| Symbol | Meaning | Example | Endpoint |\n|---|---|---|---|\n| < | is less than | {{x < 4}} | 4 not included |\n| > | is greater than | {{x > -1}} | −1 not included |\n| ≤ | is less than or equal to | {{x <= 4}} | 4 included |\n| ≥ | is greater than or equal to | {{x >= -1}} | −1 included |\n\nThe pointed end of the symbol always faces the smaller number, so {{x < 4}} and {{4 > x}} say exactly the same thing.\n\n**Number lines.** To show a solution set:\n- draw an **open circle** ○ at the endpoint for < or > (the number is *not* included);\n- draw a **closed (filled) circle** ● for ≤ or ≥ (the number *is* included);\n- draw a line or arrow over all the values that work.\n\n**Two-sided inequalities.** {{-2 < x <= 3}} means x is greater than −2 **and** at most 3, both at once: every number between them, with −2 left out and 3 kept in. On a number line, put an open circle at −2, a closed circle at 3, and join them.\n\n**Integer solutions.** An **integer** is a whole number — positive, negative or zero. To list the integers in {{-2 < x <= 3}}, start just inside each end and check each endpoint: −1, 0, 1, 2, 3, which is five integers. The endpoints are where most marks are lost.",
      diagram: `<svg viewBox="0 0 440 135" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Number line from negative 4 to 5. An open circle at negative 2 and a filled circle at 3 are joined by a thick line. The integers negative 1, 0, 1, 2 and 3 are highlighted."><rect width="440" height="135" fill="#ffffff"/><text x="220" y="22" font-size="15" font-family="sans-serif" text-anchor="middle" fill="#1f2937">−2 &lt; x ≤ 3</text><line x1="22" y1="70" x2="418" y2="70" stroke="#1f2937" stroke-width="2"/><polygon points="424,70 412,64 412,76" fill="#1f2937"/><polygon points="16,70 28,64 28,76" fill="#1f2937"/><rect x="148" y="81" width="24" height="21" rx="4" fill="#bbf7d0"/><rect x="188" y="81" width="24" height="21" rx="4" fill="#bbf7d0"/><rect x="228" y="81" width="24" height="21" rx="4" fill="#bbf7d0"/><rect x="268" y="81" width="24" height="21" rx="4" fill="#bbf7d0"/><rect x="308" y="81" width="24" height="21" rx="4" fill="#bbf7d0"/><path d="M40,64 V76 M80,64 V76 M120,64 V76 M160,64 V76 M200,64 V76 M240,64 V76 M280,64 V76 M320,64 V76 M360,64 V76 M400,64 V76" stroke="#1f2937" stroke-width="1.5"/><text x="40" y="97" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">−4</text><text x="80" y="97" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">−3</text><text x="120" y="97" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">−2</text><text x="160" y="97" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">−1</text><text x="200" y="97" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">0</text><text x="240" y="97" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">1</text><text x="280" y="97" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">2</text><text x="320" y="97" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">3</text><text x="360" y="97" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">4</text><text x="400" y="97" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">5</text><line x1="120" y1="70" x2="320" y2="70" stroke="#334155" stroke-width="5"/><circle cx="120" cy="70" r="7" fill="#ffffff" stroke="#334155" stroke-width="2.5"/><circle cx="320" cy="70" r="7" fill="#334155"/><text x="120" y="50" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#334155">open: −2 not included</text><text x="320" y="50" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#334155">closed: 3 included</text><text x="220" y="126" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Integer solutions: −1, 0, 1, 2, 3</text></svg>`,
      diagramCaption:
        "{{-2 < x <= 3}}: an open circle at −2 (not included), a closed circle at 3 (included). The highlighted integers are the five integer solutions.",
      workedExamples: [
        {
          title: "Listing integers",
          problem: "List the integers n that satisfy {{-3 <= n < 2}}.",
          steps: [
            "Left end: ≤ means −3 **is** included.",
            "Right end: < means 2 is **not** included.",
            "So the integers are −3, −2, −1, 0, 1.",
          ],
          answer: "−3, −2, −1, 0, 1",
          yourTurn: {
            question: "Your turn: list all the integers n that satisfy {{-1 < n <= 4}}. Separate them with commas.",
            answer: { type: "list", values: [0, 1, 2, 3, 4], display: "0, 1, 2, 3, 4" },
            solution: "−1 is not included (strict <) but 4 is (≤), so the integers are 0, 1, 2, 3, 4.",
          },
        },
        {
          title: "Reading a number line",
          problem: "A number line shows an open circle at 1 and a filled circle at 6, with the line between them shaded. Write the inequality it shows.",
          steps: [
            "Open circle at 1: 1 is not included, so x is strictly greater than 1: {{1 < x}}.",
            "Filled circle at 6: 6 is included, so {{x <= 6}}.",
            "Combine into one two-sided inequality.",
          ],
          answer: "{{1 < x <= 6}}",
        },
        {
          title: "From words",
          problem: "The temperature t inside a fridge must be at least 1 °C and below 5 °C. Write this as an inequality and list the whole-number temperatures allowed.",
          steps: [
            "'At least 1' means 1 or more: {{t >= 1}}, which is {{1 <= t}}.",
            "'Below 5' means less than 5: {{t < 5}}.",
            "Together: {{1 <= t < 5}}. The whole numbers are 1, 2, 3, 4.",
          ],
          answer: "{{1 <= t < 5}}; the whole-number temperatures are 1, 2, 3 and 4 °C.",
        },
      ],
      keyPoints: [
        "< and > exclude the endpoint (open circle); ≤ and ≥ include it (closed circle).",
        "{{-2 < x <= 3}} means x is above −2 **and** at most 3, both at once.",
        "Integers include negative numbers and zero.",
        "{{x < 4}} and {{4 > x}} mean the same — the point faces the smaller number.",
      ],
      whyItWorks:
        "There is no 'next number' after −2 on the number line: −1.9, −1.99, −1.999 … all satisfy {{x > -2}}, getting ever closer without reaching it. So there is no smallest solution to mark. Instead we draw an open circle: the boundary is a fence, not a member. A closed circle says the fence post itself belongs to the set.",
      strategies: ["Draw a diagram (number line)", "Test the endpoints", "Consider extremes"],
      thinkDeeper:
        "How many integers satisfy {{-7 < x < 7}}? How many satisfy {{-7 <= x <= 7}}? Find a quick rule for the number of integers in {{a < x < b}} when a and b are integers, and explain why it works.",
    },

    // ------------------------------------------------------------------ 7
    {
      id: "solving-inequalities",
      heading: "Solving inequalities",
      discovery: {
        problem:
          "Zara has $20 at a hawker centre. She buys a $2 drink and wants as many $4 plates of vegetable fried rice as she can afford. Write an inequality for the number of plates p, and find the most she can buy.\n\nNow a puzzle: which numbers satisfy {{-2x < 6}}? Test x = 0 and x = −5. Does dividing both sides by −2 to get {{x < -3}} give the right answer?",
        idea:
          "{{4p + 2 <= 20}} solves just like an equation: {{4p <= 18}}, so {{p <= 4.5}}. Plates come whole, so Zara can buy at most 4.\n\nFor {{-2x < 6}}: x = 0 works (0 < 6), but 0 is not less than −3; and x = −5 fails (−2 × (−5) = 10, which is not less than 6), even though −5 < −3. So {{x < -3}} must be wrong. The correct answer is {{x > -3}}. Multiplying or dividing by a negative number **reverses** an inequality.",
      },
      body:
        "To solve a **linear inequality**, use the balance method exactly as for an equation. Adding or subtracting the same number on both sides, or multiplying or dividing both sides by a **positive** number, keeps an inequality true:\n\n    {{3x - 5 > 10}}\n    {{3x > 15}}    (add 5 to both sides)\n    {{x > 5}}    (divide both sides by 3)\n\nThe answer is a range: every number greater than 5 works — 5.1, 6, 100. Test a value inside the range (x = 6 gives 18 − 5 = 13, and 13 > 10 ✓) and look at the boundary (x = 5 gives exactly 10, which is not > 10, so 5 is rightly excluded).\n\n**Unknowns on both sides** work the same way: {{7x + 2 <= 4x + 14}} gives {{3x + 2 <= 14}}, then {{3x <= 12}}, so {{x <= 4}}.\n\n**Forming inequalities from context.** Look for these phrases:\n\n| Phrase | Symbol |\n|---|---|\n| at least, no less than, minimum | ≥ |\n| at most, no more than, maximum, up to | ≤ |\n| more than, over, exceeds | > |\n| less than, under, below | < |\n\nThen think about what the answer *means*. You can't buy 4.5 plates, so round **down** for 'how many can you afford?' — but round **up** for 'how many buses are needed?'.\n\n**Stretch — multiplying or dividing by a negative.** This reverses the order of numbers, so you must **flip** the inequality sign: {{-2x < 6}} becomes {{x > -3}}. Or avoid it altogether by collecting x where its coefficient is positive: add 2x to both sides to get {{0 < 6 + 2x}}, then {{-6 < 2x}}, so {{-3 < x}}.",
      diagram: `<svg viewBox="0 0 440 155" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Number line from negative 6 to 6. Curved arrows labelled times negative 1 take 2 to negative 2 and 5 to negative 5, showing the order of the numbers is reversed."><rect width="440" height="155" fill="#ffffff"/><text x="220" y="28" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">× (−1)</text><path d="M370,72 Q220,2 70,72" fill="none" stroke="#334155" stroke-width="1.8"/><polygon points="70,72 78.9,72.2 75.6,65" fill="#334155"/><path d="M280,72 Q220,42 160,72" fill="none" stroke="#334155" stroke-width="1.8"/><polygon points="160,72 168.9,72 165.4,64.8" fill="#334155"/><line x1="25" y1="80" x2="415" y2="80" stroke="#1f2937" stroke-width="2"/><polygon points="421,80 409,74 409,86" fill="#1f2937"/><polygon points="19,80 31,74 31,86" fill="#1f2937"/><path d="M40,75 V85 M70,75 V85 M100,75 V85 M130,75 V85 M160,75 V85 M190,75 V85 M220,75 V85 M250,75 V85 M280,75 V85 M310,75 V85 M340,75 V85 M370,75 V85 M400,75 V85" stroke="#1f2937" stroke-width="1.5"/><text x="40" y="101" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">−6</text><text x="70" y="101" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">−5</text><text x="100" y="101" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">−4</text><text x="130" y="101" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">−3</text><text x="160" y="101" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">−2</text><text x="190" y="101" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">−1</text><text x="220" y="101" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">0</text><text x="250" y="101" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">1</text><text x="280" y="101" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">2</text><text x="310" y="101" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">3</text><text x="340" y="101" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">4</text><text x="370" y="101" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">5</text><text x="400" y="101" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">6</text><circle cx="280" cy="80" r="5" fill="#c7d2fe" stroke="#334155" stroke-width="1.5"/><circle cx="370" cy="80" r="5" fill="#c7d2fe" stroke="#334155" stroke-width="1.5"/><circle cx="160" cy="80" r="5" fill="#fecaca" stroke="#334155" stroke-width="1.5"/><circle cx="70" cy="80" r="5" fill="#fecaca" stroke="#334155" stroke-width="1.5"/><text x="220" y="126" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">2 &lt; 5, but −2 &gt; −5</text><text x="220" y="146" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#334155">Multiplying by −1 reflects the line in 0, so the order flips</text></svg>`,
      diagramCaption:
        "Why the sign flips (stretch): multiplying by −1 reflects every number in 0. 2 is to the left of 5, but −2 is to the right of −5.",
      workedExamples: [
        {
          title: "Two steps",
          problem: "Solve {{5x + 3 <= 28}}.",
          steps: [
            "Subtract 3 from both sides: {{5x <= 25}}.",
            "Divide both sides by 5 (positive, so no flip): {{x <= 5}}.",
            "Test x = 5: 25 + 3 = 28 ≤ 28 ✓. Test x = 6: 33 ≤ 28 ✗, so the direction is right.",
          ],
          answer: "{{x <= 5}}",
          yourTurn: {
            question: "Your turn: solve {{4x - 7 > 13}}. Type your answer as an inequality, such as x < 2.",
            answer: { type: "text", accept: ["x>5", "5<x"], display: "{{x > 5}}" },
            solution: "Add 7: {{4x > 20}}. Divide by 4: {{x > 5}}. Test x = 6: 24 − 7 = 17 > 13 ✓.",
          },
        },
        {
          title: "Forming from a context",
          problem: "A CCA trip: hiring the coach costs $250, plus $12 per student for entry tickets. The budget is at most $730. Write and solve an inequality to find the greatest number of students who can go.",
          steps: [
            "Let s be the number of students. Total cost: {{250 + 12s}}.",
            "'At most $730' means ≤: {{250 + 12s <= 730}}.",
            "Subtract 250: {{12s <= 480}}. Divide by 12: {{s <= 40}}.",
            "Check: 250 + 12 × 40 = 250 + 480 = 730, exactly on budget ✓.",
          ],
          answer: "{{s <= 40}}, so at most 40 students.",
        },
        {
          title: "Stretch: a negative coefficient (two ways)",
          problem: "Solve {{11 - 3x >= 2}}.",
          steps: [
            "Way 1 — flip: subtract 11 to get {{-3x >= -9}}. Divide by −3 and **reverse** the sign: {{x <= 3}}.",
            "Way 2 — avoid the flip: add 3x to both sides: {{11 >= 2 + 3x}}. Subtract 2: {{9 >= 3x}}. Divide by 3: {{3 >= x}}.",
            "Both say x is 3 or less. Test x = 0: 11 ≥ 2 ✓. Test x = 4: −1 ≥ 2 ✗.",
          ],
          answer: "{{x <= 3}}",
        },
      ],
      keyPoints: [
        "Solve like an equation — the same operation on both sides.",
        "The answer is a range, so write it as an inequality such as {{x > 5}}, not {{x = 5}}.",
        "In context, decide whether to round up or down, and whether the end value is allowed.",
        "Stretch: × or ÷ by a negative flips the sign — or collect x on the side where its coefficient is positive.",
      ],
      whyItWorks:
        "Adding the same number to both sides slides both values along the number line together, so their order stays the same. Multiplying by a positive number stretches the line, which also keeps the order. But multiplying by −1 *reflects* the number line in 0: 2 < 5, yet −2 > −5. The order reverses, so the inequality sign has to reverse too.",
      strategies: ["Solve like an equation", "Test a value", "Collect x on the positive side"],
      thinkDeeper:
        "Always, sometimes or never true: 'If {{a < b}} then {{a^2 < b^2}}'? Test pairs that are both positive, both negative, and one of each. What does your answer tell you about squaring both sides of an inequality?",
    },

    // ------------------------------------------------------------------ 8
    {
      id: "simultaneous-equations",
      heading: "Simultaneous equations",
      discovery: {
        problem:
          "At a bubble-tea stall, 2 teas and 1 waffle cost $11. 1 tea and 1 waffle cost $7. Without any algebra — just by comparing the two orders — find the price of a tea and of a waffle.",
        idea:
          "The first order is the second order plus one extra tea. So that extra tea costs $11 − $7 = $4, and a waffle costs $7 − $4 = $3.\n\nYou have just **eliminated** the waffle by subtracting one equation from the other: {{2t + w = 11}} minus {{t + w = 7}} leaves {{t = 4}}.",
      },
      body:
        "**Stretch:** an equation like {{x + y = 7}} has infinitely many solutions on its own (3 and 4, 2.5 and 4.5, −1 and 8, …). A second equation pins it down. Two equations that must be true **at the same time** are called **simultaneous equations**, and their solution is a **pair** of values that makes both true.\n\n**Elimination** means adding or subtracting the equations to make one letter disappear:\n- If a letter has the **same** coefficient with the **same sign** in both, **subtract** the equations.\n- If it has the same coefficient with **opposite signs** (like +3y and −3y), **add** them.\n- Then substitute the value you found back into either equation to find the other letter, and check in **both**.\n\n| Equations | Move | Result |\n|---|---|---|\n| {{3x + y = 14}} and {{x + y = 6}} | subtract (same signs) | {{2x = 8}} |\n| {{x + y = 7}} and {{x - y = 1}} | add (opposite signs) | {{2x = 8}} |\n\n**What the solution means.** On a graph, every point on the line {{x + y = 7}} satisfies that equation. The solution of a pair is the single point that lies on **both** lines — where they cross. For {{x + y = 7}} and {{x - y = 1}}, that point is (4, 3).",
      diagram: `<svg viewBox="0 0 320 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Graph with x and y from 0 to 8. The line x plus y equals 7 and the line x minus y equals 1 cross at the point (4, 3)."><rect width="320" height="300" fill="#ffffff"/><path d="M70,20 V260 M100,20 V260 M130,20 V260 M160,20 V260 M190,20 V260 M220,20 V260 M250,20 V260 M280,20 V260 M40,230 H280 M40,200 H280 M40,170 H280 M40,140 H280 M40,110 H280 M40,80 H280 M40,50 H280 M40,20 H280" stroke="#e2e8f0" stroke-width="1"/><line x1="40" y1="260" x2="296" y2="260" stroke="#1f2937" stroke-width="1.8"/><polygon points="302,260 292,255 292,265" fill="#1f2937"/><line x1="40" y1="260" x2="40" y2="12" stroke="#1f2937" stroke-width="1.8"/><polygon points="40,6 35,16 45,16" fill="#1f2937"/><text x="306" y="276" font-size="13" font-style="italic" font-family="sans-serif" fill="#1f2937">x</text><text x="48" y="12" font-size="13" font-style="italic" font-family="sans-serif" fill="#1f2937">y</text><text x="32" y="275" font-size="11" font-family="sans-serif" text-anchor="end" fill="#1f2937">0</text><text x="70" y="276" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">1</text><text x="100" y="276" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">2</text><text x="130" y="276" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">3</text><text x="160" y="276" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">4</text><text x="190" y="276" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">5</text><text x="220" y="276" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">6</text><text x="250" y="276" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">7</text><text x="280" y="276" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">8</text><text x="32" y="234" font-size="11" font-family="sans-serif" text-anchor="end" fill="#1f2937">1</text><text x="32" y="204" font-size="11" font-family="sans-serif" text-anchor="end" fill="#1f2937">2</text><text x="32" y="174" font-size="11" font-family="sans-serif" text-anchor="end" fill="#1f2937">3</text><text x="32" y="144" font-size="11" font-family="sans-serif" text-anchor="end" fill="#1f2937">4</text><text x="32" y="114" font-size="11" font-family="sans-serif" text-anchor="end" fill="#1f2937">5</text><text x="32" y="84" font-size="11" font-family="sans-serif" text-anchor="end" fill="#1f2937">6</text><text x="32" y="54" font-size="11" font-family="sans-serif" text-anchor="end" fill="#1f2937">7</text><text x="32" y="24" font-size="11" font-family="sans-serif" text-anchor="end" fill="#1f2937">8</text><line x1="160" y1="170" x2="160" y2="260" stroke="#334155" stroke-width="1.2" stroke-dasharray="4 3"/><line x1="40" y1="170" x2="160" y2="170" stroke="#334155" stroke-width="1.2" stroke-dasharray="4 3"/><line x1="40" y1="50" x2="250" y2="260" stroke="#3730a3" stroke-width="2.5"/><line x1="70" y1="260" x2="280" y2="50" stroke="#b45309" stroke-width="2.5"/><circle cx="160" cy="170" r="5.5" fill="#fecaca" stroke="#1f2937" stroke-width="1.8"/><text x="58" y="56" font-size="13" font-family="sans-serif" fill="#3730a3">x + y = 7</text><text x="276" y="42" font-size="13" font-family="sans-serif" text-anchor="end" fill="#b45309">x − y = 1</text><text x="174" y="176" font-size="12" font-family="sans-serif" fill="#1f2937">(4, 3)</text></svg>`,
      diagramCaption:
        "Each line shows every solution of one equation. The only point on both lines is (4, 3), so {{x = 4}}, {{y = 3}} is the solution of the pair.",
      workedExamples: [
        {
          title: "Same signs: subtract",
          problem: "Solve the simultaneous equations {{3x + y = 14}} and {{x + y = 6}}.",
          steps: [
            "Both have +y, so subtract the second equation from the first: {{(3x + y) - (x + y) = 14 - 6}}.",
            "The y's cancel: {{2x = 8}}, so {{x = 4}}.",
            "Substitute into {{x + y = 6}}: {{4 + y = 6}}, so {{y = 2}}.",
            "Check in the first equation: 3 × 4 + 2 = 14 ✓.",
          ],
          answer: "{{x = 4}}, {{y = 2}}",
          yourTurn: {
            question: "Your turn: solve {{4x + y = 19}} and {{x + y = 7}}. Give x first, then y.",
            answer: { type: "list", values: [4, 3], ordered: true, display: "x = 4, y = 3" },
            solution: "Subtract: {{3x = 12}}, so {{x = 4}}. Then {{4 + y = 7}}, so {{y = 3}}. Check: 16 + 3 = 19 ✓.",
          },
        },
        {
          title: "Opposite signs: add",
          problem: "Solve {{2x + 3y = 13}} and {{5x - 3y = 1}}.",
          steps: [
            "The y-terms are +3y and −3y, so add the equations: {{7x = 14}}, so {{x = 2}}.",
            "Substitute into the first: {{4 + 3y = 13}}, so {{3y = 9}} and {{y = 3}}.",
            "Check in the second: 5 × 2 − 3 × 3 = 10 − 9 = 1 ✓.",
          ],
          answer: "{{x = 2}}, {{y = 3}}",
        },
        {
          title: "Make the coefficients match first",
          problem: "Solve {{x + 2y = 8}} and {{3x + y = 9}}.",
          steps: [
            "No letter matches yet. Multiply the first equation by 3: {{3x + 6y = 24}}.",
            "Now both have 3x with the same sign, so subtract {{3x + y = 9}}: {{5y = 15}}, so {{y = 3}}.",
            "Substitute into {{x + 2y = 8}}: {{x + 6 = 8}}, so {{x = 2}}.",
            "Check in the second: 3 × 2 + 3 = 9 ✓.",
          ],
          answer: "{{x = 2}}, {{y = 3}}",
        },
      ],
      keyPoints: [
        "The solution is a **pair** of values that makes both equations true.",
        "Same coefficient, same sign: subtract. Same coefficient, opposite signs: add.",
        "Substitute back to find the second letter, then check in both equations.",
        "On a graph, the solution is the point where the two lines cross.",
      ],
      whyItWorks:
        "If {{3x + y = 14}} and {{x + y = 6}} are both true, then taking equal amounts from equal amounts leaves equal amounts: {{(3x + y) - (x + y) = 14 - 6}}. The y's cancel, leaving {{2x = 8}}. It's the balance method again — the only difference is that what you take from both sides is a whole equation.",
      strategies: ["Eliminate a variable", "Check by substituting", "Draw a diagram (graph)"],
      thinkDeeper:
        "Try to solve {{x + y = 5}} and {{x + y = 9}}. What goes wrong, and what would the two lines look like on a graph? Can a pair of simultaneous equations ever have infinitely many solutions? Give an example.",
    },
  ],

  learn: {
    flashcards: [
      { front: "What does it mean to *solve* an equation?", back: "Find the value of the unknown that makes both sides equal." },
      { front: "The golden rule of the balance method", back: "Whatever you do to one side, do exactly the same to the other." },
      { front: "Solve {{3x + 4 = 19}}", back: "Subtract 4: {{3x = 15}}. Divide by 3: {{x = 5}}." },
      { front: "Solve {{4x = 10}}", back: "{{x = 10/4 = 5/2}} (or 2.5). Fraction answers are fine." },
      { front: "Solve {{4(x + 3) = 20}} by dividing first", back: "Divide by 4: {{x + 3 = 5}}, so {{x = 2}}." },
      { front: "Expand {{-3(x - 4)}}", back: "{{-3x + 12}} — the −3 multiplies both terms." },
      { front: "Unknowns on both sides: which x-term do you remove?", back: "The smaller one, so x ends up on the side with the larger coefficient." },
      { front: "Solve {{x/4 - 3 = 5}}", back: "Add 3: {{x/4 = 8}}. Multiply by 4: {{x = 32}}." },
      { front: "How do you clear the fractions in {{x/2 + x/3 = 10}}?", back: "Multiply every term by the LCM, 6: {{3x + 2x = 60}}, so {{x = 12}}." },
      { front: "Three consecutive integers", back: "{{n}}, {{n + 1}}, {{n + 2}} — they add up to {{3n + 3}}." },
      { front: "Angle facts for forming equations", back: "Straight line 180°, around a point 360°, triangle 180°, quadrilateral 360°." },
      { front: "Open circle or closed circle?", back: "Open ○ for < or > (not included); closed ● for ≤ or ≥ (included)." },
      { front: "Integers satisfying {{-2 < x <= 3}}", back: "−1, 0, 1, 2, 3" },
      { front: "'You must be at least 12' as an inequality", back: "{{a >= 12}}, where a is the age in years — 12 itself is allowed." },
      { front: "Stretch: solve {{-2x < 6}}", back: "Divide by −2 and flip the sign: {{x > -3}}." },
      { front: "Stretch: simultaneous equations — add or subtract?", back: "Same signs subtract; opposite signs add." },
    ],
    mustKnow: [
      "I can solve one- and two-step equations using the balance method and inverse operations.",
      "I can solve equations whose solutions are negative numbers or fractions.",
      "I can check a solution by substituting it into the original equation.",
      "I can solve equations with brackets, choosing whether to expand first or divide first.",
      "I can solve equations with the unknown on both sides.",
      "I can solve equations with fractions, such as {{x/3 + 2 = 7}} and {{(2x - 1)/5 = 3}}.",
      "I can form and solve equations from words, perimeters, angles, ages and consecutive numbers.",
      "I can use the symbols <, >, ≤ and ≥, including two-sided inequalities such as {{-2 < x <= 3}}.",
      "I can show an inequality on a number line using open and closed circles.",
      "I can list the integers that satisfy an inequality.",
      "I can solve linear inequalities and form them from real-life situations.",
      "I can (stretch) solve a pair of simultaneous equations by elimination.",
    ],
    misconceptions: [
      {
        wrong: "{{4(x + 3) = 4x + 3}}",
        right: "The 4 multiplies every term inside the bracket: {{4(x + 3) = 4x + 12}}.",
      },
      {
        wrong: "In {{x/4 + 3 = 5}}, multiplying by 4 gives {{x + 3 = 20}}.",
        right: "Every term must be multiplied: {{x + 12 = 20}}, so {{x = 8}}. (Or subtract 3 first: {{x/4 = 2}}, so {{x = 8}}.)",
      },
      {
        wrong: "From {{3x = 12}}, 'move the 3 across' to get {{x = 12 - 3 = 9}}.",
        right: "3x means 3 × x, so the inverse is ÷ 3 on both sides: {{x = 4}}. Think 'do the same to both sides', not 'move it across'.",
      },
      {
        wrong: "{{x > 3}} includes 3.",
        right: "> is strict, so 3 is not included (open circle). Use {{x >= 3}} if 3 should be included.",
      },
      {
        wrong: "An equation like {{2x = -7}} has no answer because −7 isn't a multiple of 2.",
        right: "Solutions can be negative fractions: {{x = -7/2 = -3.5}}. Check: 2 × (−3.5) = −7 ✓.",
      },
      {
        wrong: "{{-2x < 6}} gives {{x < -3}}.",
        right: "Dividing by a negative reverses the sign: {{x > -3}}. Test x = 0: −2 × 0 = 0 < 6 ✓, and 0 > −3 ✓.",
      },
    ],
    examMistakes: [
      "Dividing {{3x + 4 = 19}} by 3 but forgetting to divide the 4 as well — undo the + 4 first and this slip can't happen.",
      "Expanding a bracket but forgetting to multiply the second term, or getting the sign wrong when the number outside is negative.",
      "Sign slips when collecting terms, e.g. turning {{5x - 2 = 2x + 13}} into {{3x = 11}} instead of {{3x = 15}}.",
      "Clearing a fraction by multiplying only the fraction term instead of every term.",
      "Stopping at x when the question asked for a length, an angle or someone's age.",
      "Using the wrong circle on a number line, or listing an endpoint that a strict sign excludes.",
      "Writing the answer to an inequality as {{x = 5}} instead of a range like {{x > 5}}.",
      "Not checking — substituting back takes seconds and catches most errors.",
    ],
    mnemonics: [
      {
        topic: "Order of undoing",
        device: "Socks and shoes",
        explanation:
          "You put socks on before shoes, so you take shoes off first. To make {{3x + 4}}, x was multiplied by 3 first and had 4 added last — so undo the + 4 first, then the × 3.",
      },
      {
        topic: "Reading < and >",
        device: "Small end, small number",
        explanation: "The pointed end of the symbol always points at the smaller number: 2 < 5 and 5 > 2. The open side faces the bigger number.",
      },
      {
        topic: "Number-line circles",
        device: "A line underneath fills the circle in",
        explanation: "≤ and ≥ have an extra line (half an = sign), meaning 'or equal to', so the endpoint is included and the circle is filled. No line, no fill.",
      },
      {
        topic: "Simultaneous equations (stretch)",
        device: "SSS — Same Signs Subtract",
        explanation: "If the matching terms have the same sign (+y and +y), subtract the equations. If the signs differ (+3y and −3y), add them.",
      },
    ],
    realWorld: [
      {
        title: "Comparing price plans",
        detail: "Phone plans, gym memberships and bike hire often have a fixed fee plus a rate. Setting two costs equal — unknowns on both sides — finds the break-even point where one plan becomes the better deal.",
        emoji: "📱",
      },
      {
        title: "Budgeting",
        detail: "How many $4 plates can you buy with $20 after a $2 drink? {{4p + 2 <= 20}} gives {{p <= 4.5}}, so 4 plates. Budgets are inequalities.",
        emoji: "🍜",
      },
      {
        title: "Safety limits",
        detail: "Lift load limits, ride height rules and speed limits are all inequalities. A lift rated for 1000 kg needs the total mass m to satisfy {{m <= 1000}}.",
        emoji: "🛗",
      },
      {
        title: "Taxi fares",
        detail: "A fare of $4 plus $0.70 per km: how far can you go for $18? Solve {{4 + 0.7d = 18}} to get {{d = 20}} km.",
        emoji: "🚕",
      },
      {
        title: "Science formulas",
        detail: "Scientists and engineers solve equations every day — for example, finding the time t in {{v = u + at}} once the speeds and acceleration are known.",
        emoji: "🔬",
      },
    ],
    videos: [
      { title: "Solving equations", channel: "Corbettmaths", url: "https://www.youtube.com/results?search_query=corbettmaths+solving+equations" },
      { title: "Equations with unknowns on both sides", channel: "Maths Genie", url: "https://www.youtube.com/results?search_query=maths+genie+equations+unknowns+on+both+sides" },
      { title: "Solving linear inequalities", channel: "Khan Academy", url: "https://www.youtube.com/results?search_query=khan+academy+solving+linear+inequalities" },
      { title: "Simultaneous equations by elimination", channel: "Corbettmaths", url: "https://www.youtube.com/results?search_query=corbettmaths+simultaneous+equations+elimination" },
    ],
    formulas: [
      {
        name: "The balance rule",
        formula: "If {{a = b}} then {{a + c = b + c}}, {{a - c = b - c}}, {{ac = bc}} and {{a/c = b/c}} (for {{c != 0}})",
        note: "Do the same to both sides and the equation stays true.",
      },
      { name: "Expanding a bracket", formula: "{{a(b + c) = ab + ac}}", note: "The term outside multiplies every term inside." },
      { name: "Clearing a fraction", formula: "{{x/a = b}} gives {{x = ab}}", note: "With several denominators, multiply every term by their LCM." },
      { name: "Consecutive numbers", formula: "Integers: {{n, n + 1, n + 2}}. Even or odd numbers: {{n, n + 2, n + 4}}" },
      { name: "Angle facts", formula: "Straight line 180°, around a point 360°, triangle 180°, quadrilateral 360°" },
      { name: "Inequality endpoints", formula: "< or >: open circle ○ (excluded). ≤ or ≥: closed circle ● (included)" },
      { name: "Flipping rule (stretch)", formula: "If {{a < b}} then {{-a > -b}}", note: "Multiplying or dividing by a negative reverses the inequality." },
      { name: "Elimination (stretch)", formula: "Same signs subtract; opposite signs add", note: "Then substitute back and check in both equations." },
    ],
  },
};
