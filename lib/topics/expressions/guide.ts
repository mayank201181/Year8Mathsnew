import type { TopicGuide } from "../../types.ts";

export const guide: TopicGuide = {
  id: "expressions",
  title: "Expressions & Formulae",
  strand: "Algebra",
  icon: "🔤",
  summary: "The grammar of algebra: simplify, substitute, expand, factorise and rearrange with confidence.",
  intro:
    "Algebra is arithmetic with some of the numbers left blank. In this chapter you'll learn the vocabulary of algebra, then the moves you'll use for the rest of your maths life: simplifying, substituting, expanding, factorising and rearranging. Every rule here is a rule of ordinary arithmetic in disguise — so whenever you're unsure, test it with numbers.",
  guide: [
    // ------------------------------------------------------------------
    {
      id: "language-of-algebra",
      heading: "Expressions, equations, formulae & identities",
      discovery: {
        problem:
          "Here are four lines that all use letters:\n\n1. {{4x + 3}}\n2. {{4x + 3 = 23}}\n3. {{4(x + 3) = 4x + 12}}\n4. {{P = 4s}}\n\nTry x = 1, x = 2 and x = 5 in lines 2 and 3. What do you notice? In which line can the letter be *any* number, in which must it be *one particular* number, and in which do the letters stand for real quantities linked by a rule?",
        idea:
          "Line 2 is only true when x = 5 (4 × 5 + 3 = 23) — it's an **equation**. Line 3 works for every value you try (16 = 16, 20 = 20, 32 = 32) — it's an **identity**. Line 1 has no equals sign at all — it's an **expression**, a value waiting to be worked out. Line 4 links two different quantities, the perimeter P and side s of a square — it's a **formula**. Same letters, four different jobs.",
      },
      body:
        "A letter in algebra always stands for a number. *What kind* of number depends on where the letter lives.\n\n| Type | Example | What the letters mean | What you do with it |\n|---|---|---|---|\n| Expression | {{3a^2 + 2a - 7}} | any value — no equals sign | simplify, expand, factorise, substitute |\n| Equation | {{3x + 2 = 11}} | an unknown with particular value(s) | solve it (here x = 3) |\n| Formula | {{A = l w}} | real quantities linked by a rule | substitute, rearrange |\n| Identity | {{2(x + 3) ≡ 2x + 6}} | any value — always true | show both sides are the same |\n\nThe sign **≡** means *is identically equal to*: the two sides are equal for **every** value of the letters, not just one.\n\nThe parts of an expression have names:\n\n- A **term** is a number, a letter, or numbers and letters multiplied together. Terms are separated by + and − signs, and **the sign in front belongs to the term**. {{5x^2 - 3x + 7}} has three terms: {{5x^2}}, {{-3x}} and 7.\n- A **variable** is a letter whose value can change, such as x.\n- The **coefficient** is the number multiplying the letters: in {{5x^2}} it is 5, in {{-3x}} it is −3, and in x it is 1 (the 1 is invisible).\n- A **constant** is a term with no letter, such as 7.\n- In {{x^2}}, the small 2 is the **power** or **index**: {{x^2}} means {{x * x}}.\n\nAlgebra has its own shorthand. We write {{3 * a}} as 3a, {{a * b}} as ab, {{a * a}} as {{a^2}} and {{a ÷ 4}} as {{a/4}}. Numbers go first, then letters in alphabetical order: {{b * 5 * a = 5ab}}.",
      diagram: `<svg viewBox="0 0 460 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The expression 5x squared minus 3x plus 7 with its coefficient, power, variable, terms and constant labelled"><rect x="0" y="0" width="460" height="210" fill="#ffffff"/><g font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="110" y="120" font-size="44">5</text><text x="140" y="120" font-size="44" font-style="italic">x</text><text x="161" y="98" font-size="24">2</text><text x="200" y="120" font-size="44">−</text><text x="232" y="120" font-size="44">3</text><text x="260" y="120" font-size="44" font-style="italic">x</text><text x="305" y="120" font-size="44">+</text><text x="345" y="120" font-size="44">7</text></g><g fill="none" stroke="#334155" stroke-width="1.5"><path d="M96 132 V140 H170 V132"/><path d="M186 132 V140 H274 V132"/><path d="M331 132 V140 H359 V132"/><line x1="110" y1="46" x2="110" y2="82"/><line x1="190" y1="56" x2="164" y2="80"/><line x1="262" y1="56" x2="261" y2="84"/></g><g font-family="sans-serif" font-size="13" fill="#334155" text-anchor="middle"><text x="110" y="40">coefficient 5</text><text x="200" y="50">power (index)</text><text x="290" y="50">variable</text><text x="133" y="160">term</text><text x="230" y="160">term: coefficient −3</text><text x="345" y="160">constant term</text></g><text x="230" y="196" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">The sign in front of a term belongs to that term.</text></svg>`,
      diagramCaption: "The anatomy of {{5x^2 - 3x + 7}}: three terms, two coefficients and a constant.",
      workedExamples: [
        {
          title: "Terms and coefficients",
          problem: "For the expression {{6a^2 - a + 4b - 9}}: (a) how many terms are there? (b) What is the coefficient of a? (c) What is the constant term?",
          steps: [
            "Split at each + or − sign, keeping the sign with the term: {{6a^2}}, {{-a}}, {{+4b}}, {{-9}}.",
            "(a) That is 4 terms.",
            "(b) {{-a}} means {{-1 * a}}, so the coefficient of a is −1. (The {{6a^2}} term is a different term — a and {{a^2}} are not the same.)",
            "(c) The only term with no letter is −9.",
          ],
          answer: "(a) 4 terms (b) −1 (c) −9",
          yourTurn: {
            question: "Your turn: in {{2x^3 - 7x + x^2 - 5}}, what is the coefficient of x?",
            answer: { type: "number", value: -7 },
            solution: "The x-term is {{-7x}}. The sign belongs to the term, so the coefficient is −7. (The {{x^2}} term is a different term; its coefficient is 1.)",
          },
        },
        {
          title: "Name the type",
          problem: "Classify each as an expression, equation, formula or identity: (a) {{7y - 2}} (b) {{7y - 2 = 19}} (c) {{v = u + at}} (d) {{5(y - 1) ≡ 5y - 5}}",
          steps: [
            "(a) No equals sign, so it is an **expression**.",
            "(b) True only when y = 3, because 7 × 3 − 2 = 19. Try y = 1: 5 ≠ 19. So it is an **equation**.",
            "(c) It links four different quantities — final speed v, starting speed u, acceleration a and time t — so it is a **formula**.",
            "(d) Five lots of (y − 1) is 5y − 5 for any y, and the ≡ sign says so: it is an **identity**.",
          ],
          answer: "(a) expression (b) equation (c) formula (d) identity",
        },
        {
          title: "Identity or not?",
          problem: "Is {{4(x + 2) = 4x + 2}} an identity?",
          steps: [
            "Test a value: x = 0 gives 4(2) = 8 on the left but 2 on the right.",
            "One value that fails — a **counter-example** — is enough to show it is *not* an identity.",
            "In fact {{4(x + 2) = 4x + 8}}, so the left side is always 6 more than the right: it is never true.",
          ],
          answer: "No — it fails for x = 0 (in fact for every x). The identity is {{4(x + 2) ≡ 4x + 8}}.",
        },
      ],
      keyPoints: [
        "Expression: no equals sign. Equation: true for particular values. Formula: a rule linking different quantities. Identity (≡): true for every value.",
        "A term includes the sign in front of it: {{5x^2 - 3x + 7}} has terms {{5x^2}}, {{-3x}} and 7.",
        "The coefficient is the number multiplying the letters; x has coefficient 1 and −x has coefficient −1.",
        "Write numbers first, then letters in alphabetical order: 5ab, not b5a.",
      ],
      whyItWorks:
        "To show something is an equation, one value that works is enough. To show it is an *identity*, you'd need it to work for every number — and you can't test infinitely many. So instead you rewrite one side using rules that are always true (like {{a(b + c) = ab + ac}}) until it looks exactly like the other side. Going the other way is easy: a single counter-example proves a statement is *not* an identity.",
      strategies: ["Check by substituting", "Look for a counter-example", "Try small cases"],
      thinkDeeper:
        "An equation is true for some values, an identity for all values. Can a statement with an equals sign be true for *no* values at all? Find one. Then explain how simplifying both sides tells you which of the three you have.",
    },
    // ------------------------------------------------------------------
    {
      id: "simplifying",
      heading: "Simplifying expressions",
      discovery: {
        problem:
          "Priya says {{3x^2 + 2x - x^2}} simplifies to 4x. Marcus says it is {{2x^2 + 2x}}. Siti says it is {{4x^3}}.\n\nTest the original and all three answers with x = 10. Who is right — and what went wrong for the others?",
        idea:
          "With x = 10 the original is 300 + 20 − 100 = 220. Marcus gets 200 + 20 = 220 — correct. Priya gets 40 and Siti gets 4000. When x = 10, {{x^2}} is 100 but x is only 10, so they are different kinds of quantity and can't be merged. **Like terms** have exactly the same letters raised to the same powers — only like terms can be added or subtracted.",
      },
      body:
        "**Like terms** have identical letter parts: the same letters with the same powers.\n\n- 5ab and −2ba are like terms (ab and ba are the same product).\n- 4x and {{4x^2}} are **not** like terms; nor are {{3a^2 b}} and {{3ab^2}}.\n\nTo **collect like terms**, add or subtract their coefficients and keep the letter part the same. The sign in front of each term travels with it:\n\n    {{7a + 4b - 2a + b = (7a - 2a) + (4b + b) = 5a + 5b}}\n    {{3x^3 + x^2 - x^3 + 4x^2 = 2x^3 + 5x^2}}\n\n**Multiplying terms** works differently: multiply the numbers, then multiply the letters. Order doesn't matter in multiplication, so you can regroup:\n\n    {{3x * 2x = 3 * 2 * x * x = 6x^2}}\n    {{4a * 5ab = 20a^2 b}}\n\nNotice the difference: {{x + x = 2x}} but {{x * x = x^2}}.\n\n**Dividing terms**: write the division as a fraction and cancel common factors: {{(12x^5)/(3x^2) = 4x^3}}.\n\nThe **index laws** do the counting of letters for you:\n\n| Law | Rule | Example |\n|---|---|---|\n| Multiplying | {{a^m * a^n = a^(m+n)}} | {{x^4 * x^3 = x^7}} |\n| Dividing | {{a^m ÷ a^n = a^(m-n)}} | {{y^6 ÷ y^2 = y^4}} |\n| Power of a power | {{(a^m)^n = a^(mn)}} | {{(p^2)^3 = p^6}} |\n| Zero index | {{a^0 = 1}} | {{7x^0 = 7}} |\n\nWhen a whole term is raised to a power, every part of it is: {{(2x^3)^2 = 2x^3 * 2x^3 = 4x^6}} — the 2 gets squared too.",
      diagram: `<svg viewBox="0 0 480 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two lengths x joined make 2x; a square x by x has area x squared; a 3x by 2x rectangle splits into six squares of area x squared"><rect x="0" y="0" width="480" height="250" fill="#ffffff"/><g font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="80" y="30" font-size="14" font-weight="bold">x + x = 2x</text><text x="50" y="58" font-size="13">x</text><text x="110" y="58" font-size="13">x</text><text x="80" y="102" font-size="13">2x</text><text x="80" y="135" font-size="14" font-weight="bold">x × x = x²</text><text x="80" y="149" font-size="13">x</text><text x="40" y="184" font-size="13">x</text><text x="80" y="186" font-size="15">x²</text></g><g stroke="#334155" stroke-width="2" fill="none"><line x1="20" y1="68" x2="140" y2="68"/><line x1="20" y1="62" x2="20" y2="74"/><line x1="80" y1="62" x2="80" y2="74"/><line x1="140" y1="62" x2="140" y2="74"/><path d="M20 80 V86 H140 V80" stroke-width="1.5"/></g><rect x="50" y="155" width="60" height="60" fill="#bae6fd" stroke="#334155" stroke-width="1.5"/><rect x="250" y="60" width="180" height="120" fill="#c7d2fe" stroke="#334155" stroke-width="2"/><g stroke="#334155" stroke-width="1"><line x1="310" y1="60" x2="310" y2="180"/><line x1="370" y1="60" x2="370" y2="180"/><line x1="250" y1="120" x2="430" y2="120"/></g><g font-family="sans-serif" font-size="14" fill="#1f2937" text-anchor="middle"><text x="280" y="95">x²</text><text x="340" y="95">x²</text><text x="400" y="95">x²</text><text x="280" y="155">x²</text><text x="340" y="155">x²</text><text x="400" y="155">x²</text><text x="280" y="53">x</text><text x="340" y="53">x</text><text x="400" y="53">x</text><text x="340" y="30" font-weight="bold">3x</text><text x="238" y="95">x</text><text x="238" y="155">x</text><text x="212" y="125" font-weight="bold">2x</text><text x="340" y="210" font-weight="bold">3x × 2x = 6x²</text></g></svg>`,
      diagramCaption: "Adding lengths gives 2x; multiplying lengths gives an area. A 3x by 2x rectangle holds six {{x^2}} squares, so {{3x * 2x = 6x^2}}.",
      workedExamples: [
        {
          title: "Collecting like terms with squares",
          problem: "Simplify {{3a^2 + 5a - a^2 + 2a - 4}}.",
          steps: [
            "Group the like terms, keeping each sign: {{a^2}} terms are {{3a^2}} and {{-a^2}}; a terms are 5a and 2a; the constant is −4.",
            "{{3a^2 - a^2 = 2a^2}}.",
            "5a + 2a = 7a.",
            "Nothing else combines, so the answer is {{2a^2 + 7a - 4}}.",
          ],
          answer: "{{2a^2 + 7a - 4}}",
          yourTurn: {
            question: "Your turn: simplify {{4x^2 - 3x + 2x^2 + 8x + 1}}.",
            answer: { type: "expression", expr: "6x^2+5x+1", form: "simplified" },
            solution: "{{x^2}} terms: 4 + 2 = 6. x terms: −3 + 8 = 5. Constant: 1. So {{6x^2 + 5x + 1}}.",
          },
        },
        {
          title: "Multiplying and dividing terms",
          problem: "Simplify (a) {{2xy * 5x}} (b) {{18a^3 b ÷ 6ab}}.",
          steps: [
            "(a) Numbers: 2 × 5 = 10. Letters: {{x * x = x^2}}, and y stays. So {{10x^2 y}}.",
            "(b) Write it as {{(18a^3 b)/(6ab)}}. Numbers: 18 ÷ 6 = 3.",
            "{{a^3 ÷ a = a^2}} (subtract the powers: 3 − 1 = 2), and b ÷ b = 1.",
            "So the answer is {{3a^2}}.",
          ],
          answer: "(a) {{10x^2 y}} (b) {{3a^2}}",
        },
        {
          title: "Power of a power",
          problem: "Simplify {{(3p^2)^2 ÷ p^3}}.",
          steps: [
            "Square everything in the bracket: {{(3p^2)^2 = 3^2 * (p^2)^2 = 9p^4}}.",
            "Divide: {{9p^4 ÷ p^3 = 9p^(4-3) = 9p}}.",
          ],
          answer: "9p",
        },
      ],
      keyPoints: [
        "Like terms have the same letters with the same powers; only like terms can be added or subtracted.",
        "Multiplying: multiply the numbers and add the powers of each letter. {{x * x = x^2}}, but {{x + x = 2x}}.",
        "Dividing: divide the numbers and subtract the powers.",
        "Power of a power: multiply the powers — and raise the coefficient too: {{(2x^3)^2 = 4x^6}}.",
      ],
      whyItWorks:
        "Write the powers out in full. {{x^4 * x^3 = (x * x * x * x) * (x * x * x)}} — that's seven x's multiplied, so {{x^7}}: the indices add. {{y^6 ÷ y^2 = (y * y * y * y * y * y)/(y * y)}} — two y's cancel top and bottom, leaving {{y^4}}: the indices subtract. And {{x^3 ÷ x^3}} must be 1 (anything divided by itself), but the law gives {{x^(3-3) = x^0}}. That's why {{x^0 = 1}}.",
      strategies: ["Check by substituting", "Numbers first, then letters", "Write the powers out in full"],
      thinkDeeper:
        "When x = 2, {{x^2}} and 2x are both equal to 4. Does that make them like terms? Find the other value of x where they're equal, then explain why matching at one or two values isn't enough.",
    },
    // ------------------------------------------------------------------
    {
      id: "substitution",
      heading: "Substitution",
      discovery: {
        problem:
          "Let x = −3. Hana wants {{x^2}}, so she types {{-3^2}} into her calculator and gets −9. Ravi types {{(-3)^2}} and gets 9.\n\nWho has found {{x^2}} — and what is Hana's calculator actually working out?",
        idea:
          "{{x^2}} means {{x * x}}, so with x = −3 it is {{(-3) * (-3) = 9}}. Ravi is right. Hana's calculator follows the order of operations: the power is done before the minus sign, so it works out −(3 × 3) = −9. The fix is simple: **when you substitute, put every value in brackets.**",
      },
      body:
        "To **substitute** means to replace each letter by its value and then work out the result, following the order of operations **BIDMAS**: Brackets, Indices, Division and Multiplication, Addition and Subtraction.\n\nThree rules prevent almost every mistake:\n\n1. **Bracket the value.** 3x means {{3 * x}}, so if x = −4 then 3x = 3(−4) = −12. And if x = 5, 3x is 15 — not 35.\n2. **Indices before multiplying.** {{2x^2}} means {{2 * x^2}}. With x = 3: {{2 * 3^2 = 2 * 9 = 18}}, not {{6^2 = 36}}.\n3. **Watch where the power sits.** It only acts on what it is attached to.\n\n| Expression | x = 3 | x = −3 |\n|---|---|---|\n| {{x^2}} | 9 | {{(-3)^2 = 9}} |\n| {{-x^2}} | −9 | {{-(-3)^2 = -9}} |\n| {{x^3}} | 27 | {{(-3)^3 = -27}} |\n| {{2x^2}} | 18 | 18 |\n| {{(2x)^2}} | 36 | 36 |\n\nA negative number squared is positive; a negative number cubed is negative.\n\n**Fractions** substitute the same way. If x = {{2/3}}, then {{6x - 1 = 6 * 2/3 - 1 = 4 - 1 = 3}}. If x = {{1/2}}, then {{8x^2 = 8 * (1/2)^2 = 8 * 1/4 = 2}}.\n\nSubstituting into a **formula** works just like an expression: put each value in its place, in brackets, then calculate. With {{v = u + at}}, u = 4, a = −2 and t = 3: {{v = 4 + (-2)(3) = 4 - 6 = -2}}.",
      diagram: `<svg viewBox="0 0 480 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Flow comparison: brackets around minus 3 squared gives 9, but minus 3 squared without brackets gives minus 9"><rect x="0" y="0" width="480" height="200" fill="#ffffff"/><text x="240" y="24" font-family="sans-serif" font-size="14" font-weight="bold" fill="#1f2937" text-anchor="middle">Substituting x = −3 into x²</text><g stroke="#334155" stroke-width="1.5"><rect x="20" y="45" width="100" height="40" rx="6" fill="#e0e7ff"/><rect x="160" y="45" width="160" height="40" rx="6" fill="#e0e7ff"/><rect x="360" y="45" width="100" height="40" rx="6" fill="#bbf7d0"/><rect x="20" y="125" width="100" height="40" rx="6" fill="#e0e7ff"/><rect x="160" y="125" width="160" height="40" rx="6" fill="#e0e7ff"/><rect x="360" y="125" width="100" height="40" rx="6" fill="#fecaca"/></g><g stroke="#334155" stroke-width="2" fill="none"><line x1="122" y1="65" x2="152" y2="65"/><path d="M146 59 L154 65 L146 71"/><line x1="322" y1="65" x2="352" y2="65"/><path d="M346 59 L354 65 L346 71"/><line x1="122" y1="145" x2="152" y2="145"/><path d="M146 139 L154 145 L146 151"/><line x1="322" y1="145" x2="352" y2="145"/><path d="M346 139 L354 145 L346 151"/></g><g font-family="sans-serif" font-size="16" fill="#1f2937" text-anchor="middle"><text x="70" y="71">(−3)²</text><text x="240" y="71">(−3) × (−3)</text><text x="410" y="71">9</text><text x="70" y="151">−3²</text><text x="240" y="151">−(3 × 3)</text><text x="410" y="151">−9</text></g><g font-family="sans-serif" font-size="12" fill="#334155" text-anchor="middle"><text x="240" y="104">with brackets, the whole of −3 is squared</text><text x="240" y="184">without brackets, only the 3 is squared</text></g></svg>`,
      diagramCaption: "Brackets keep the minus sign attached to the number: {{(-3)^2 = 9}} but {{-3^2 = -9}}.",
      workedExamples: [
        {
          title: "A negative value and a square",
          problem: "Find the value of {{5 - 2x^2}} when x = −3.",
          steps: [
            "Substitute with brackets: {{5 - 2(-3)^2}}.",
            "Indices first: {{(-3)^2 = 9}}.",
            "Multiply: 2 × 9 = 18.",
            "Subtract: 5 − 18 = −13.",
          ],
          answer: "−13",
          yourTurn: {
            question: "Your turn: find the value of {{10 - 3x^2}} when x = −2.",
            answer: { type: "number", value: -2 },
            solution: "{{10 - 3(-2)^2 = 10 - 3 * 4 = 10 - 12 = -2}}.",
          },
        },
        {
          title: "Substituting into a formula",
          problem: "A freezer is set to −15 °C. Use {{F = 9/5 C + 32}} to convert this to degrees Fahrenheit.",
          steps: [
            "Substitute C = −15 in brackets: {{F = 9/5 * (-15) + 32}}.",
            "Multiply first: {{9/5 * (-15) = -27}} (because 15 ÷ 5 = 3 and 9 × 3 = 27, and the sign is negative).",
            "Add: −27 + 32 = 5.",
          ],
          answer: "5 °F",
        },
        {
          title: "Several letters, including a fraction",
          problem: "Given a = 4, b = −5 and c = {{1/2}}, find {{b^2 - 4ac}}.",
          steps: [
            "Substitute with brackets: {{(-5)^2 - 4(4)(1/2)}}.",
            "Index first: {{(-5)^2 = 25}}.",
            "Multiply: {{4 * 4 * 1/2 = 8}}.",
            "Subtract: 25 − 8 = 17.",
          ],
          answer: "17",
        },
      ],
      keyPoints: [
        "Replace each letter by its value **in brackets**, then use BIDMAS.",
        "{{(-3)^2 = 9}} but {{-3^2 = -9}}: a power only acts on what it is attached to.",
        "3x means {{3 * x}}: if x = 5, 3x = 15 (not 35).",
        "{{2x^2}} means {{2 * x^2}} — square first, then multiply.",
      ],
      whyItWorks:
        "A letter stands for a whole number, sign included. In {{x^2}} the *whole* of x is squared, so if x is −3 you must square all of −3: {{(-3)^2}}. Writing {{-3^2}} instead squares only the 3, because by convention powers are worked out before the minus sign is applied — {{-3^2}} is read as {{-(3^2)}}. Brackets make your substitution say exactly what the algebra meant.",
      strategies: ["Bracket every value", "Estimate first: predict the sign", "Check by substituting again"],
      thinkDeeper:
        "Without calculating, decide whether {{x^2 - x^3}} is positive or negative when x = −5. Then investigate: for which values of x is {{x^2}} bigger than {{x^3}}? Try x = 2, 1, {{1/2}}, 0 and −1 before you decide.",
    },
    // ------------------------------------------------------------------
    {
      id: "expanding",
      heading: "Expanding single brackets",
      discovery: {
        problem:
          "Work out 7 × 23 in your head by splitting 23 into 20 + 3.\n\nNow a rectangle is 4 m wide and (x + 3) m long. You don't know x — but can you still write its area *without brackets*, as two pieces added together?",
        idea:
          "7 × 23 = 7 × 20 + 7 × 3 = 140 + 21 = 161. The rectangle splits the same way into a 4 by x piece and a 4 by 3 piece, so {{4(x + 3) = 4x + 12}}. Multiplying a bracket means multiplying **every** term inside it. This is the **distributive law**.",
      },
      body:
        "To **expand** (or *multiply out*) a bracket, multiply the term outside by **each** term inside:\n\n    {{a(b + c) = ab + ac}}\n\nA grid keeps track of the products. For {{5(2x - 3)}}:\n\n| × | 2x | −3 |\n|---|---|---|\n| 5 | 10x | −15 |\n\nso {{5(2x - 3) = 10x - 15}}.\n\n**A negative outside the bracket** multiplies every term inside, so it changes every sign. Remember a negative times a negative is positive:\n\n    {{-2(3x - 5) = -6x + 10}}\n    {{-(x - 4) = -x + 4}}\n\n**Letters outside the bracket** follow the same rule, using the index laws:\n\n    {{x(x + 3) = x^2 + 3x}}\n    {{2a(3a - 4b) = 6a^2 - 8ab}}\n    {{x^2(x + 5) = x^3 + 5x^2}}\n\n**Expand and simplify** means expand each bracket, then collect like terms:\n\n    {{3(2x + 1) - 2(x - 4)}}\n    {{= 6x + 3 - 2x + 8}}\n    {{= 4x + 11}}\n\nThe trap here is the last term: −2 × −4 = +8, not −8.",
      diagram: `<svg viewBox="0 0 480 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Area models: a 4 by x plus 3 rectangle splits into 4x and 12; an x by x plus 3 rectangle splits into x squared and 3x"><rect x="0" y="0" width="480" height="210" fill="#ffffff"/><g stroke="#334155" stroke-width="1.5"><rect x="30" y="70" width="100" height="80" fill="#c7d2fe"/><rect x="130" y="70" width="60" height="80" fill="#fde68a"/><rect x="270" y="70" width="100" height="100" fill="#bae6fd"/><rect x="370" y="70" width="60" height="100" fill="#fde68a"/></g><g font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="110" y="30" font-size="14" font-weight="bold">4(x + 3) = 4x + 12</text><text x="350" y="30" font-size="14" font-weight="bold">x(x + 3) = x² + 3x</text><g font-size="13"><text x="80" y="62">x</text><text x="160" y="62">3</text><text x="18" y="114">4</text><text x="110" y="172">x + 3</text><text x="320" y="62">x</text><text x="400" y="62">3</text><text x="258" y="124">x</text><text x="350" y="192">x + 3</text></g><g font-size="16"><text x="80" y="116">4x</text><text x="160" y="116">12</text><text x="320" y="126">x²</text><text x="400" y="126">3x</text></g></g></svg>`,
      diagramCaption: "Each rectangle's area can be found whole or in two pieces — that's why {{4(x + 3) = 4x + 12}} and {{x(x + 3) = x^2 + 3x}}.",
      workedExamples: [
        {
          title: "A negative outside",
          problem: "Expand {{-3(2x - 5)}}.",
          steps: [
            "Multiply −3 by the first term: {{-3 * 2x = -6x}}.",
            "Multiply −3 by the second term: {{-3 * (-5) = +15}} (negative × negative = positive).",
            "Combine: {{-6x + 15}}.",
          ],
          answer: "{{-6x + 15}}",
          yourTurn: {
            question: "Your turn: expand {{-4(3x - 2)}}.",
            answer: { type: "expression", expr: "-12x+8", form: "expanded" },
            solution: "{{-4 * 3x = -12x}} and {{-4 * (-2) = +8}}, so {{-4(3x - 2) = -12x + 8}}.",
          },
        },
        {
          title: "A letter outside, three terms inside",
          problem: "Expand {{2x(x^2 - 3x + 4)}}.",
          steps: [
            "{{2x * x^2 = 2x^3}} (add the powers: 1 + 2 = 3).",
            "{{2x * (-3x) = -6x^2}}.",
            "{{2x * 4 = 8x}}.",
            "So {{2x(x^2 - 3x + 4) = 2x^3 - 6x^2 + 8x}}.",
          ],
          answer: "{{2x^3 - 6x^2 + 8x}}",
        },
        {
          title: "Expand and simplify",
          problem: "Expand and simplify {{5(x + 2) - 3(2x - 1)}}.",
          steps: [
            "First bracket: {{5(x + 2) = 5x + 10}}.",
            "Second bracket, with the −3: {{-3 * 2x = -6x}} and {{-3 * (-1) = +3}}.",
            "Together: {{5x + 10 - 6x + 3}}.",
            "Collect: 5x − 6x = −x and 10 + 3 = 13.",
          ],
          answer: "{{13 - x}} (or {{-x + 13}})",
        },
      ],
      keyPoints: [
        "Multiply the outside term by **every** term inside: {{a(b + c) = ab + ac}}.",
        "A negative outside changes the sign of every term inside: {{-(x - 4) = -x + 4}}.",
        "Letters multiply too: {{x(x + 3) = x^2 + 3x}}.",
        "To expand and simplify, expand each bracket first, then collect like terms.",
      ],
      whyItWorks:
        "Look at the area model. A rectangle x by (x + 3) can be cut into an x-by-x square and an x-by-3 strip, and the total area is the same either way: {{x(x + 3) = x^2 + 3x}}. For negatives, read {{-2(3x - 5)}} as 'take away two lots of (3x − 5)'. Taking away 3x twice removes 6x; but taking away −5 twice is like adding 5 twice, so you gain 10.",
      strategies: ["Draw a diagram (grid method)", "Check by substituting x = 1"],
      thinkDeeper:
        "Marcus claims that {{3(x + 4) - 3(x - 4)}} has the same value whatever x is. Is he right? Find the value — and explain why the x's must disappear, without fully expanding.",
    },
    // ------------------------------------------------------------------
    {
      id: "factorising",
      heading: "Factorising",
      discovery: {
        problem:
          "Expanding turns {{6(2x + 3)}} into {{12x + 18}}. Can you go backwards?\n\nThree students write {{12x + 18}} as a number times a bracket. Wei Ling writes {{2(6x + 9)}}, Jun writes {{3(4x + 6)}} and Mei writes {{6(2x + 3)}}. Expand all three: are they all correct? Why would a teacher prefer Mei's?",
        idea:
          "All three expand to {{12x + 18}}, so all three are equal to it. But only Mei took out the **highest** common factor, 6. Wei Ling's bracket {{6x + 9}} still has a common factor of 3, and Jun's {{4x + 6}} still has a 2. Theirs are factorised, but not **fully** factorised.",
      },
      body:
        "**Factorising** means writing an expression as a product — putting it back into brackets. It is the exact reverse of expanding.\n\nTo factorise by taking out the highest common factor (HCF):\n\n1. Find the HCF of the numbers.\n2. Find the highest power of each letter that appears in **every** term.\n3. Write that HCF outside a bracket, and divide each term by it to find what goes inside.\n4. Check by expanding.\n\nFor {{6x^2 + 9x}}: the HCF of 6 and 9 is 3, and every term contains at least one x, so the HCF is 3x.\n\n    {{6x^2 ÷ 3x = 2x}}  and  {{9x ÷ 3x = 3}}\n    {{6x^2 + 9x = 3x(2x + 3)}}\n\n| Expression | HCF | Fully factorised |\n|---|---|---|\n| {{10a - 15}} | 5 | {{5(2a - 3)}} |\n| {{x^2 - 7x}} | x | {{x(x - 7)}} |\n| {{8ab + 12a^2}} | 4a | {{4a(2b + 3a)}} |\n| {{4y^3 + 2y^2}} | {{2y^2}} | {{2y^2(2y + 1)}} |\n| {{5x + 5}} | 5 | {{5(x + 1)}} |\n\nLook at the last two rows: when a term *is* the HCF, dividing it by itself leaves **1** — never leave a gap in the bracket.\n\nAn expression is **fully factorised** when the terms left inside the bracket have no common factor except 1.",
      diagram: `<svg viewBox="0 0 460 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A rectangle made of pieces with areas 6x squared and 9x has common height 3x and widths 2x and 3"><rect x="0" y="0" width="460" height="230" fill="#ffffff"/><g stroke="#334155" stroke-width="1.5"><rect x="70" y="50" width="100" height="150" fill="#c7d2fe"/><rect x="170" y="50" width="36" height="150" fill="#fde68a"/></g><g font-family="sans-serif" text-anchor="middle"><text x="120" y="131" font-size="17" fill="#1f2937">6x²</text><text x="188" y="131" font-size="15" fill="#1f2937">9x</text><text x="120" y="40" font-size="14" font-weight="bold" fill="#1e40af">2x</text><text x="188" y="40" font-size="14" font-weight="bold" fill="#1e40af">3</text><text x="48" y="130" font-size="14" font-weight="bold" fill="#1e40af">3x</text></g><g font-family="sans-serif" font-size="13" fill="#1f2937"><text x="235" y="72">Areas known: 6x² and 9x</text><text x="235" y="98">Shared height = HCF = 3x</text><text x="235" y="124">Widths: 6x² ÷ 3x = 2x</text><text x="235" y="150">and 9x ÷ 3x = 3</text><text x="235" y="182" font-weight="bold">6x² + 9x = 3x(2x + 3)</text></g></svg>`,
      diagramCaption: "Factorising in pictures: you know the areas, and you find the side lengths. The shared height is the HCF, 3x.",
      workedExamples: [
        {
          title: "Numbers and letters in the HCF",
          problem: "Factorise fully {{8x^2 + 20x}}.",
          steps: [
            "HCF of 8 and 20 is 4.",
            "Both terms contain x (the lowest power is {{x^1}}), so the HCF is 4x.",
            "Divide each term: {{8x^2 ÷ 4x = 2x}} and {{20x ÷ 4x = 5}}.",
            "Write {{4x(2x + 5)}}. Check: {{4x * 2x = 8x^2}} and {{4x * 5 = 20x}}.",
          ],
          answer: "{{4x(2x + 5)}}",
          yourTurn: {
            question: "Your turn: factorise fully {{6x^2 + 15x}}.",
            answer: { type: "expression", expr: "3x(2x+5)", form: "factorised" },
            solution: "The HCF of 6 and 15 is 3, and both terms contain x, so take out 3x: {{6x^2 + 15x = 3x(2x + 5)}}. Check: {{3x * 2x = 6x^2}} and {{3x * 5 = 15x}}.",
          },
        },
        {
          title: "Two letters",
          problem: "Factorise fully {{14a^2 b - 21ab^2}}.",
          steps: [
            "HCF of 14 and 21 is 7.",
            "Both terms contain a (lowest power a) and b (lowest power b), so the HCF is 7ab.",
            "{{14a^2 b ÷ 7ab = 2a}} and {{21ab^2 ÷ 7ab = 3b}}.",
            "So {{14a^2 b - 21ab^2 = 7ab(2a - 3b)}}. The sign stays with its term.",
          ],
          answer: "{{7ab(2a - 3b)}}",
        },
        {
          title: "Spot the error",
          problem: "Zara factorises {{12y^2 - 4y}} as {{4y(3y)}}. What has she done wrong?",
          steps: [
            "Expand her answer to check: {{4y(3y) = 12y^2}}. The −4y has vanished.",
            "{{-4y ÷ 4y = -1}}, so a −1 belongs in the bracket.",
            "Correct answer: {{4y(3y - 1)}}. Check: {{12y^2 - 4y}}. ✓",
          ],
          answer: "She lost the second term; it should be {{4y(3y - 1)}}.",
        },
      ],
      keyPoints: [
        "Factorising is the reverse of expanding: {{ab + ac = a(b + c)}}.",
        "Take out the **highest** common factor — numbers and letters — so nothing more can come out of the bracket.",
        "If a term equals the HCF, a 1 is left behind: {{5x + 5 = 5(x + 1)}}.",
        "Always check by expanding your answer.",
      ],
      whyItWorks:
        "Expanding uses the distributive law forwards: {{3x(2x + 3) = 6x^2 + 9x}}. Factorising reads the same law backwards. In the area picture you are given the areas of the pieces ({{6x^2}} and 9x) and asked for the side lengths. The shared height must divide *both* areas exactly — and the biggest height that does is the HCF, 3x.",
      strategies: ["Use the inverse (expand to check)", "Work backwards", "Draw a diagram"],
      thinkDeeper:
        "{{x^2 + 9x}} factorises to {{x(x + 9)}}, but {{x^2 + 9}} cannot be factorised by taking out a common factor. Explain the difference in one sentence. Then: for how many whole numbers k from 1 to 50 is the HCF of the terms 12x and k exactly 4?",
    },
    // ------------------------------------------------------------------
    {
      id: "writing-expressions",
      heading: "Writing expressions & formulae",
      discovery: {
        problem:
          "Aisha thinks of a number, halves it, then adds 5. Ethan thinks of the same number, adds 5, then halves it.\n\nTry both with 12. Are their rules the same? Write each rule as an expression in n — and decide whether there is any starting number that gives them the same answer.",
        idea:
          "With 12, Aisha gets 6 + 5 = 11 but Ethan gets 17 ÷ 2 = 8.5. Aisha's rule is {{n/2 + 5}}; Ethan's is {{(n + 5)/2}}. The brackets record the **order** of the operations. They never agree: Ethan halves the 5 as well, so Aisha's answer is always 2.5 bigger.",
      },
      body:
        "To write an expression from words, choose a letter for the unknown number and translate **in order**, using brackets whenever an operation applies to a whole expression.\n\n| Words | Expression |\n|---|---|\n| 5 more than n | {{n + 5}} |\n| 5 less than n | {{n - 5}} |\n| n less than 5, or 5 subtract n | {{5 - n}} |\n| double n, then add 3 | {{2n + 3}} |\n| add 3 to n, then double | {{2(n + 3)}} |\n| a third of n | {{n/3}} or {{1/3 n}} |\n| three-quarters of n | {{3/4 n}} or {{3n/4}} |\n| n squared | {{n^2}} |\n| the product of a and b | ab |\n| the mean of a and b | {{(a + b)/2}} |\n\n**Fractional coefficients.** {{1/3 n}} and {{n/3}} mean the same thing: a third of n. Likewise {{3/4 n = 3n/4}}, because three-quarters of n is 3 lots of n, shared into 4.\n\nA **formula** is a rule linking two or more quantities. It has a **subject** — the single letter on its own on one side, like C in {{C = 4 + 0.7d}}. To write one from a situation:\n\n1. Choose a letter for each quantity and note its unit.\n2. Work out one or two cases with actual numbers.\n3. Repeat the same calculation with letters in place of the numbers.\n\nFor example, a taxi charges $4 flag-down plus $0.70 per kilometre. For 5 km: 4 + 0.7 × 5 = $7.50. For 12 km: 4 + 0.7 × 12 = $12.40. For d km: {{C = 4 + 0.7d}}, where C is the cost in dollars.\n\nKeep units consistent: if one price is in cents and another in dollars, convert before you write the formula.",
      diagram: `<svg viewBox="0 0 460 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bar model: Siti has one bar n; Jun has two bars n and a small bar 3, so Jun has 2n plus 3"><rect x="0" y="0" width="460" height="200" fill="#ffffff"/><text x="230" y="20" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">Siti has n stickers. Jun has 3 more than twice as many as Siti.</text><g stroke="#334155" stroke-width="1.5"><rect x="70" y="38" width="100" height="32" fill="#c7d2fe"/><rect x="70" y="95" width="100" height="32" fill="#c7d2fe"/><rect x="170" y="95" width="100" height="32" fill="#c7d2fe"/><rect x="270" y="95" width="30" height="32" fill="#fde68a"/></g><path d="M70 136 V144 H300 V136" fill="none" stroke="#334155" stroke-width="1.5"/><g font-family="sans-serif" fill="#1f2937"><text x="20" y="59" font-size="14">Siti</text><text x="20" y="116" font-size="14">Jun</text><g text-anchor="middle" font-size="15"><text x="120" y="59">n</text><text x="120" y="116">n</text><text x="220" y="116">n</text><text x="285" y="116">3</text><text x="185" y="164">2n + 3</text></g><text x="230" y="190" font-size="14" font-weight="bold" text-anchor="middle">Together: n + 2n + 3 = 3n + 3</text></g></svg>`,
      diagramCaption: "A bar model turns words into an expression: Jun has {{2n + 3}}, and together they have {{3n + 3}}.",
      workedExamples: [
        {
          title: "Order matters",
          problem: "Write an expression for: think of a number n, subtract 4, then divide by 3.",
          steps: [
            "First step: n − 4.",
            "The division applies to the *whole* of n − 4, so it goes in a bracket (or over a fraction bar).",
            "Result: {{(n - 4)/3}}.",
          ],
          answer: "{{(n - 4)/3}}",
          yourTurn: {
            question: "Your turn: write an expression for: think of a number n, add 7, then multiply by 5.",
            answer: { type: "expression", expr: "5(n+7)" },
            solution: "Add 7 first: n + 7. Then multiply the whole thing by 5: {{5(n + 7)}}, which expands to {{5n + 35}}.",
          },
        },
        {
          title: "A fractional coefficient",
          problem: "Priya has p dollars. She spends a quarter of it on a book, then $3 on bubble tea. Write a simplified expression for the amount she has left.",
          steps: [
            "A quarter of p is {{1/4 p}}.",
            "Amount left: {{p - 1/4 p - 3}}.",
            "p is {{4/4 p}}, so {{p - 1/4 p = 3/4 p}}.",
            "Simplified: {{3/4 p - 3}} dollars.",
          ],
          answer: "{{3/4 p - 3}} (or {{(3p)/4 - 3}})",
        },
        {
          title: "A formula from a context",
          problem: "For a CCA trip, coach hire costs $240, shared equally among the n students who go. Each student also pays $15 entry. Write a formula for C, the cost in dollars for each student.",
          steps: [
            "Try a number first: with 30 students, each pays 240 ÷ 30 = $8 for the coach, plus $15: $23.",
            "Do the same with n: coach share is {{240/n}}, plus 15.",
            "Formula: {{C = 240/n + 15}}.",
            "Check with n = 30: {{240/30 + 15 = 8 + 15 = 23}}. ✓",
          ],
          answer: "{{C = 240/n + 15}}",
        },
      ],
      keyPoints: [
        "Translate in order, and use brackets when an operation applies to a whole expression: 'add 3, then double' is {{2(n + 3)}}.",
        "'5 less than n' is {{n - 5}}; 'n less than 5' is {{5 - n}}.",
        "{{n/3}} and {{1/3 n}} are the same; so are {{3n/4}} and {{3/4 n}}.",
        "A formula has a subject and links quantities. Write one by doing a numerical case first, then replacing numbers with letters.",
      ],
      whyItWorks:
        "Why do a numerical case first? Because the *structure* of your calculation is the formula. For a 5 km taxi ride you did 4 + 0.7 × 5; for 12 km you did 4 + 0.7 × 12. Only the distance changed — so replace that number with a letter, keep everything else exactly as it was, and you have {{C = 4 + 0.7d}}.",
      strategies: ["Try small cases, then generalise", "Use a bar model", "Introduce a variable"],
      thinkDeeper:
        "The sum of three consecutive whole numbers always seems to be a multiple of 3. Let the smallest be n, write the sum as an expression and simplify it. What does your expression *prove* that examples alone couldn't? What can you say about the sum of four consecutive whole numbers?",
    },
    // ------------------------------------------------------------------
    {
      id: "changing-the-subject",
      heading: "Changing the subject",
      discovery: {
        problem:
          "The formula {{F = 9/5 C + 32}} converts a temperature in °C to °F. Ravi's pen-pal in Florida says it is 86 °F there today.\n\nWork out the temperature in °C. Then do it again for 50 °F. What did you do each time — and can you write a formula that goes straight from F to C?",
        idea:
          "For 86 °F: subtract 32 to get 54, then multiply by {{5/9}} to get 30 °C. For 50 °F: 50 − 32 = 18, and {{18 * 5/9 = 10}} °C. Each time you **undid the steps in reverse order**. Doing the same with the letter F gives a formula with C as its subject: {{C = 5/9 (F - 32)}}.",
      },
      body:
        "The **subject** of a formula is the letter on its own on one side: in {{A = l w}}, A is the subject. **Changing the subject** (or *rearranging*) means getting a different letter on its own.\n\n**Function-machine view.** Follow what happens to the new subject, then run the machine backwards using **inverse operations**: + undoes −, × undoes ÷, and squaring undoes a square root (and vice versa).\n\n    {{C -> * 9/5 -> + 32 -> F}}\n    {{F -> - 32 -> * 5/9 -> C}}\n\n**Balance view.** A formula is an equation, so whatever you do to one side, do to the other:\n\n    {{F = 9/5 C + 32}}\n    {{F - 32 = 9/5 C}}   (subtract 32 from both sides)\n    {{5/9 (F - 32) = C}}   (multiply both sides by {{5/9}})\n\nBoth views give the same answer — use whichever you find clearer. A two-step example: make w the subject of {{P = 2(l + w)}}.\n\n    {{P/2 = l + w}}   (divide both sides by 2)\n    {{w = P/2 - l}}   (subtract l from both sides)\n\n**Stretch:** if the new subject is squared, undo the square last, with a square root. From {{A = pi r^2}}: divide by π to get {{r^2 = A/pi}}, then {{r = sqrt(A/pi)}}. (A radius is a length, so take the positive root.)",
      diagram: `<svg viewBox="0 0 480 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Function machines: C times nine fifths then add 32 gives F; backwards, F subtract 32 then times five ninths gives C"><rect x="0" y="0" width="480" height="220" fill="#ffffff"/><g font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="240" y="22" font-size="13" font-weight="bold">Forwards: °C to °F</text><text x="240" y="114" font-size="13" font-weight="bold">Backwards: undo each step, in reverse order</text></g><g stroke="#334155" stroke-width="1.5"><rect x="100" y="38" width="100" height="44" rx="6" fill="#c7d2fe"/><rect x="260" y="38" width="100" height="44" rx="6" fill="#c7d2fe"/><rect x="100" y="130" width="100" height="44" rx="6" fill="#bbf7d0"/><rect x="260" y="130" width="100" height="44" rx="6" fill="#bbf7d0"/></g><g stroke="#334155" stroke-width="2" fill="none"><line x1="58" y1="60" x2="94" y2="60"/><path d="M88 54 L96 60 L88 66"/><line x1="202" y1="60" x2="254" y2="60"/><path d="M248 54 L256 60 L248 66"/><line x1="362" y1="60" x2="414" y2="60"/><path d="M408 54 L416 60 L408 66"/><line x1="414" y1="152" x2="366" y2="152"/><path d="M372 146 L364 152 L372 158"/><line x1="254" y1="152" x2="206" y2="152"/><path d="M212 146 L204 152 L212 158"/><line x1="94" y1="152" x2="62" y2="152"/><path d="M68 146 L60 152 L68 158"/></g><g font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="40" y="66" font-size="18" font-weight="bold">C</text><text x="436" y="66" font-size="18" font-weight="bold">F</text><text x="40" y="158" font-size="18" font-weight="bold">C</text><text x="436" y="158" font-size="18" font-weight="bold">F</text><text x="135" y="66" font-size="18">×</text><text x="160" y="55" font-size="13">9</text><text x="160" y="74" font-size="13">5</text><text x="310" y="66" font-size="18">+ 32</text><text x="135" y="158" font-size="18">×</text><text x="160" y="147" font-size="13">5</text><text x="160" y="166" font-size="13">9</text><text x="310" y="158" font-size="18">− 32</text></g><g stroke="#1f2937" stroke-width="1.2"><line x1="152" y1="60" x2="168" y2="60"/><line x1="152" y1="152" x2="168" y2="152"/></g><g font-family="sans-serif" fill="#1f2937" font-size="16"><text x="168" y="208">C =</text><text x="203" y="198" font-size="13" text-anchor="middle">5</text><text x="203" y="215" font-size="13" text-anchor="middle">9</text><text x="214" y="208">(F − 32)</text></g><line x1="196" y1="203" x2="210" y2="203" stroke="#1f2937" stroke-width="1.2"/></svg>`,
      diagramCaption: "Run the machine backwards: undo + 32 first, then undo × {{9/5}}. So {{C = 5/9 (F - 32)}}.",
      workedExamples: [
        {
          title: "Two steps",
          problem: "Make x the subject of {{y = 4x - 7}}.",
          steps: [
            "What happens to x? It is multiplied by 4, then 7 is subtracted.",
            "Undo the last step first: add 7 to both sides: {{y + 7 = 4x}}.",
            "Then undo × 4: divide both sides by 4: {{(y + 7)/4 = x}}.",
            "Check with x = 3: y = 12 − 7 = 5, and {{(5 + 7)/4 = 3}}. ✓",
          ],
          answer: "{{x = (y + 7)/4}}",
          yourTurn: {
            question: "Your turn: make x the subject of {{y = 5x + 2}}.",
            answer: { type: "expression", expr: "(y-2)/5" },
            solution: "Subtract 2 from both sides: {{y - 2 = 5x}}. Divide both sides by 5: {{x = (y - 2)/5}}.",
          },
        },
        {
          title: "A formula from science",
          problem: "Make t the subject of {{v = u + at}}.",
          steps: [
            "t is multiplied by a, then u is added.",
            "Subtract u from both sides: {{v - u = at}}.",
            "Divide both sides by a: {{t = (v - u)/a}}.",
          ],
          answer: "{{t = (v - u)/a}}",
        },
        {
          title: "Stretch: when the subject is squared",
          problem: "Make r the subject of {{A = pi r^2}}. Then find the radius of a circle with area 50 cm², to 2 decimal places.",
          steps: [
            "r is squared, then multiplied by π. Undo × π first: {{A/pi = r^2}}.",
            "Undo the square with a square root: {{r = sqrt(A/pi)}}.",
            "Substitute A = 50: {{r = sqrt(50/pi) = sqrt(15.915...) = 3.989...}}",
            "To 2 decimal places, r = 3.99 cm. Check: {{pi * 3.99^2}} ≈ 50.0. ✓",
          ],
          answer: "{{r = sqrt(A/pi)}}; r ≈ 3.99 cm",
        },
      ],
      keyPoints: [
        "The subject is the letter on its own. To change it, undo the operations on the new subject in **reverse order**.",
        "Do the same thing to both sides — exactly like solving an equation, but with letters.",
        "Inverse pairs: + and −, × and ÷, squaring and square-rooting.",
        "Check by putting numbers into the old and new formulae.",
      ],
      whyItWorks:
        "A formula is true for every matching set of values. Doing the same thing to both sides keeps it true, so the rearranged formula holds for exactly the same values as the original. And why reverse order? Think of socks and shoes: socks go on first, so they come off last. The operation applied to the letter *last* is the first one you undo.",
      strategies: ["Use the inverse", "Work backwards", "Check by substituting"],
      thinkDeeper:
        "Siti rearranges {{y = 3x + 6}} to get {{x = y/3 - 6}}. Test her formula with x = 2. What went wrong? Find two different-looking but correct ways to write the answer, and explain why they are equal.",
    },
    // ------------------------------------------------------------------
    {
      id: "double-brackets",
      heading: "Expanding double brackets",
      discovery: {
        problem:
          "Work out 23 × 12 by splitting both numbers: (20 + 3) × (10 + 2). How many separate multiplications do you need?\n\nNow try {{(x + 3)(x + 2)}} in exactly the same way.",
        idea:
          "20 × 10 + 20 × 2 + 3 × 10 + 3 × 2 = 200 + 40 + 30 + 6 = 276 — four multiplications, because each part of the first bracket meets each part of the second. In the same way, {{(x + 3)(x + 2) = x^2 + 2x + 3x + 6 = x^2 + 5x + 6}}.",
      },
      body:
        "**Stretch:** this is Year 9 work, but it uses only what you already know.\n\nTo expand two brackets, multiply **each term in the first bracket by each term in the second**, then collect like terms. With two terms in each bracket there are 2 × 2 = 4 products. A grid makes sure you don't miss one:\n\n| × | x | +2 |\n|---|---|---|\n| x | {{x^2}} | 2x |\n| +3 | 3x | +6 |\n\n    {{(x + 3)(x + 2) = x^2 + 2x + 3x + 6 = x^2 + 5x + 6}}\n\n**With negatives**, keep each sign with its term. For {{(x + 5)(x - 3)}} the four products are {{x^2}}, −3x, 5x and −15, so the answer is {{x^2 + 2x - 15}}.\n\nSpot the pattern: {{(x + a)(x + b) = x^2 + (a + b)x + ab}}. The middle coefficient is the **sum** of the numbers; the constant is their **product**.\n\n**Squaring a bracket** means multiplying it by itself:\n\n    {{(x + 4)^2 = (x + 4)(x + 4) = x^2 + 8x + 16}}\n\nIt is **not** {{x^2 + 16}} — that misses the two 4x pieces.",
      diagram: `<svg viewBox="0 0 460 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Area model: a rectangle x plus 3 wide and x plus 2 tall splits into x squared, 3x, 2x and 6"><rect x="0" y="0" width="460" height="220" fill="#ffffff"/><g stroke="#334155" stroke-width="1.5"><rect x="80" y="40" width="110" height="110" fill="#bae6fd"/><rect x="190" y="40" width="72" height="110" fill="#fde68a"/><rect x="80" y="150" width="110" height="48" fill="#bbf7d0"/><rect x="190" y="150" width="72" height="48" fill="#fecaca"/></g><g font-family="sans-serif" fill="#1f2937" text-anchor="middle"><g font-size="17"><text x="135" y="101">x²</text><text x="226" y="101">3x</text><text x="135" y="180">2x</text><text x="226" y="180">6</text></g><g font-size="14" font-weight="bold"><text x="135" y="32">x</text><text x="226" y="32">+3</text><text x="66" y="100">x</text><text x="60" y="179">+2</text></g></g><g font-family="sans-serif" font-size="15" fill="#1f2937"><text x="290" y="80">(x + 3)(x + 2)</text><text x="290" y="112">= x² + 3x + 2x + 6</text><text x="290" y="144" font-weight="bold">= x² + 5x + 6</text></g></svg>`,
      diagramCaption: "The big rectangle has sides {{x + 3}} and {{x + 2}}. Its four pieces are the four products: {{x^2}}, 3x, 2x and 6.",
      workedExamples: [
        {
          title: "Two positive brackets",
          problem: "Expand and simplify {{(x + 4)(x + 5)}}.",
          steps: [
            "Grid products: {{x * x = x^2}}, {{x * 5 = 5x}}, {{4 * x = 4x}}, {{4 * 5 = 20}}.",
            "Add them: {{x^2 + 5x + 4x + 20}}.",
            "Collect the x terms: {{x^2 + 9x + 20}}.",
            "Pattern check: 4 + 5 = 9 and 4 × 5 = 20. ✓",
          ],
          answer: "{{x^2 + 9x + 20}}",
          yourTurn: {
            question: "Your turn: expand and simplify {{(x + 6)(x + 2)}}.",
            answer: { type: "expression", expr: "x^2+8x+12", form: "simplified" },
            solution: "Products: {{x^2}}, 2x, 6x, 12. Collect: {{x^2 + 8x + 12}}. (Check: 6 + 2 = 8, 6 × 2 = 12.)",
          },
        },
        {
          title: "With a negative",
          problem: "Expand and simplify {{(x - 7)(x + 3)}}.",
          steps: [
            "Products: {{x * x = x^2}}, {{x * 3 = 3x}}, {{-7 * x = -7x}}, {{-7 * 3 = -21}}.",
            "Collect: 3x − 7x = −4x.",
            "Result: {{x^2 - 4x - 21}}.",
          ],
          answer: "{{x^2 - 4x - 21}}",
        },
        {
          title: "Squaring a bracket",
          problem: "Expand {{(x - 5)^2}}.",
          steps: [
            "Write it as {{(x - 5)(x - 5)}}.",
            "Products: {{x^2}}, −5x, −5x and {{(-5) * (-5) = +25}}.",
            "Collect: {{x^2 - 10x + 25}}.",
          ],
          answer: "{{x^2 - 10x + 25}}",
        },
      ],
      keyPoints: [
        "Multiply every term in the first bracket by every term in the second — 4 products for two 2-term brackets.",
        "A grid (or area model) makes sure you don't miss a product.",
        "{{(x + a)(x + b) = x^2 + (a + b)x + ab}}.",
        "{{(x + 4)^2}} means {{(x + 4)(x + 4)}}; it is not {{x^2 + 16}}.",
      ],
      whyItWorks:
        "It's the distributive law used twice. Treat (x + 3) as a single block and expand over the second bracket: {{(x + 3)(x + 2) = x(x + 3) + 2(x + 3)}}. Expanding each single bracket gives {{x^2 + 3x + 2x + 6}}. The area model shows the same four pieces as four rectangles inside one big one. Check with x = 10: 13 × 12 = 156 and 100 + 50 + 6 = 156.",
      strategies: ["Draw a diagram (grid method)", "Find a pattern", "Check by substituting x = 10"],
      thinkDeeper:
        "Work out 21 × 19, 31 × 29 and 41 × 39. Spot the pattern, then explain it by expanding {{(n + 1)(n - 1)}}. Use your result to find 99 × 101 in your head.",
    },
  ],
  learn: {
    flashcards: [
      { front: "Expression vs equation?", back: "An expression has no equals sign ({{3x + 2}}). An equation does, and is true only for particular values ({{3x + 2 = 11}}, so x = 3)." },
      { front: "What does ≡ mean?", back: "'Is identically equal to': true for every value of the letters, e.g. {{2(x + 3) ≡ 2x + 6}}." },
      { front: "What is a formula?", back: "A rule linking two or more quantities, with a subject, e.g. {{A = pi r^2}}. You substitute into it or rearrange it." },
      { front: "Coefficient of x in {{7 - x}}?", back: "−1, because −x means {{-1 * x}}." },
      { front: "Simplify {{5a^2 + 3a - 2a^2}}", back: "{{3a^2 + 3a}} — {{a^2}} and a are not like terms." },
      { front: "{{x + x}} and {{x * x}}?", back: "{{x + x = 2x}} but {{x * x = x^2}}." },
      { front: "{{a^m * a^n}} = ?", back: "{{a^(m+n)}} — add the indices. E.g. {{x^4 * x^3 = x^7}}." },
      { front: "{{a^m ÷ a^n}} = ?", back: "{{a^(m-n)}} — subtract the indices. E.g. {{y^6 ÷ y^2 = y^4}}." },
      { front: "{{(a^m)^n}} = ?", back: "{{a^(mn)}} — multiply the indices. E.g. {{(p^2)^3 = p^6}}." },
      { front: "If x = −4, find {{x^2}} and {{-x^2}}", back: "{{x^2 = (-4)^2 = 16}} and {{-x^2 = -16}}." },
      { front: "Expand {{-2(3x - 5)}}", back: "{{-6x + 10}} — the −2 multiplies both terms, and −2 × −5 = +10." },
      { front: "Expand {{x(x + 3)}}", back: "{{x^2 + 3x}}" },
      { front: "Factorise fully {{6x^2 + 9x}}", back: "{{3x(2x + 3)}} — the HCF is 3x." },
      { front: "'Add 3 to n, then halve' as an expression", back: "{{(n + 3)/2}} — the halving applies to the whole of n + 3." },
      { front: "Make x the subject of {{y = 3x + 5}}", back: "{{x = (y - 5)/3}} — subtract 5, then divide by 3." },
      { front: "Expand {{(x + 3)(x + 2)}}", back: "{{x^2 + 5x + 6}} — four products: {{x^2}}, 2x, 3x, 6." },
    ],
    mustKnow: [
      "I can tell an expression, an equation, a formula and an identity apart, and use the ≡ sign correctly.",
      "I can name the terms, coefficients and constant in an expression like {{5x^2 - 3x + 7}}.",
      "I can collect like terms, including terms in {{x^2}} and {{x^3}}.",
      "I can multiply and divide terms using the index laws, e.g. {{4a * 5ab = 20a^2 b}}.",
      "I can substitute positive, negative and fractional values, knowing that {{(-3)^2 = 9}} but {{-3^2 = -9}}.",
      "I can expand a single bracket, including {{x(x + 3)}} and {{-2(3x - 5)}}, and simplify sums of brackets.",
      "I can factorise fully by taking out the HCF, including letters, as in {{6x^2 + 9x = 3x(2x + 3)}}, and check by expanding.",
      "I can turn words into expressions, including fractional coefficients like {{3/4 n}}.",
      "I can write a formula from a real-life situation.",
      "I can change the subject of a two-step formula using inverse operations.",
      "Stretch: I can expand double brackets such as {{(x + 4)(x - 3)}}.",
    ],
    misconceptions: [
      { wrong: "{{3x + 2y = 5xy}}", right: "3x and 2y are not like terms, so {{3x + 2y}} cannot be simplified at all." },
      { wrong: "{{x * x = 2x}}", right: "{{x * x = x^2}}. It is {{x + x}} that equals 2x." },
      { wrong: "{{x^3 * x^4 = x^12}}", right: "When multiplying, add the indices: {{x^3 * x^4 = x^7}}. Multiply indices only for a power of a power: {{(x^3)^4 = x^12}}." },
      { wrong: "If x = −3, then {{x^2 = -9}}.", right: "{{x^2 = (-3)^2 = (-3) * (-3) = 9}}. Always bracket a negative value when you substitute." },
      { wrong: "{{-2(x - 4) = -2x - 8}}", right: "−2 × −4 = +8, so {{-2(x - 4) = -2x + 8}}." },
      { wrong: "{{12x + 8 = 2(6x + 4)}} is fully factorised.", right: "6x + 4 still has a common factor of 2. Take out the HCF, 4: {{12x + 8 = 4(3x + 2)}}." },
    ],
    examMistakes: [
      "Combining unlike terms: writing {{2a + 3b}} as 5ab, or {{x^2 + x}} as {{x^3}}.",
      "Multiplying only the first term inside a bracket: {{3(x + 4)}} is {{3x + 12}}, not {{3x + 4}}.",
      "Sign slips with a negative outside a bracket, especially on the second term: {{-3(x - 2) = -3x + 6}}.",
      "Substituting a negative without brackets, so {{x^2}} at x = −5 comes out as −25 instead of 25.",
      "Multiplying before squaring: {{2x^2}} at x = 3 is 18, not 36.",
      "Not factorising fully, or losing a term: {{5x + 5 = 5(x + 1)}}, not 5(x).",
      "Writing 'n less than 10' as {{n - 10}} instead of {{10 - n}}.",
      "Undoing in the wrong order when changing the subject: for {{y = 3x + 6}}, subtract 6 *before* dividing by 3.",
    ],
    mnemonics: [
      {
        topic: "Order of operations",
        device: "BIDMAS",
        explanation: "Brackets, Indices, Division and Multiplication (left to right), Addition and Subtraction (left to right). Indices come before the minus sign — which is why {{-3^2 = -9}}.",
      },
      {
        topic: "Changing the subject",
        device: "Socks and shoes",
        explanation: "Socks go on before shoes, so shoes come off first. Undo the operation that was done to the letter *last* first.",
      },
      {
        topic: "Expanding a single bracket",
        device: "Everyone inside gets a handshake",
        explanation: "Draw an arrow from the term outside to every term inside, and multiply along each arrow. A term without an arrow is a term you forgot.",
      },
      {
        topic: "Expanding double brackets (stretch)",
        device: "FOIL: First, Outer, Inner, Last",
        explanation: "The four products in {{(x + 3)(x + 2)}}: First {{x * x}}, Outer {{x * 2}}, Inner {{3 * x}}, Last {{3 * 2}}. The grid method does the same job.",
      },
    ],
    realWorld: [
      { emoji: "📊", title: "Spreadsheets", detail: "A spreadsheet formula such as `=B2*1.09` (adding 9% GST) is algebra: the cell is the variable, and the formula is substituted into for every row." },
      { emoji: "🚕", title: "Taxi and ride fares", detail: "A fare like {{C = 4 + 0.7d}} — a fixed flag-down charge plus a rate per kilometre — is a formula. The app substitutes your distance d." },
      { emoji: "🌡️", title: "Weather around the world", detail: "{{F = 9/5 C + 32}} converts Celsius to Fahrenheit; rearranged, {{C = 5/9 (F - 32)}} goes the other way." },
      { emoji: "❤️", title: "Fitness trackers", detail: "A common estimate of maximum heart rate is {{H = 220 - a}}, where a is your age in years. Trackers use formulas like this to set training zones." },
      { emoji: "🏠", title: "Renovating an HDB flat", detail: "Flooring needs the area {{A = l w}}; skirting board needs the perimeter {{P = 2(l + w)}}. The same formulas work for every room." },
      { emoji: "💻", title: "Coding", detail: "Programs are full of variables and expressions: `score = 10*hits - 5*misses` is an expression evaluated by substitution, thousands of times a second." },
    ],
    videos: [
      { title: "Simplifying expressions (collecting like terms)", channel: "Corbettmaths", url: "https://www.youtube.com/results?search_query=corbettmaths+simplifying+expressions" },
      { title: "Expanding brackets", channel: "Corbettmaths", url: "https://www.youtube.com/results?search_query=corbettmaths+expanding+brackets" },
      { title: "Factorising into a single bracket", channel: "Maths Genie", url: "https://www.youtube.com/results?search_query=maths+genie+factorising+single+brackets" },
      { title: "Rearranging formulae (changing the subject)", channel: "Khan Academy", url: "https://www.youtube.com/results?search_query=khan+academy+rearrange+formulas" },
    ],
    formulas: [
      { name: "Distributive law", formula: "{{a(b + c) = ab + ac}}", note: "Expanding reads it left to right; factorising reads it right to left." },
      { name: "Multiplying powers", formula: "{{a^m * a^n = a^(m+n)}}" },
      { name: "Dividing powers", formula: "{{a^m ÷ a^n = a^(m-n)}}" },
      { name: "Power of a power", formula: "{{(a^m)^n = a^(mn)}}" },
      { name: "Zero index", formula: "{{a^0 = 1}}", note: "For any a ≠ 0." },
      { name: "Squaring a negative", formula: "{{(-a)^2 = a^2}}, but {{-a^2 = -(a^2)}}" },
      { name: "Temperature conversion", formula: "{{F = 9/5 C + 32}}  ⇔  {{C = 5/9 (F - 32)}}" },
      { name: "Double brackets (stretch)", formula: "{{(x + a)(x + b) = x^2 + (a + b)x + ab}}" },
    ],
  },
};
