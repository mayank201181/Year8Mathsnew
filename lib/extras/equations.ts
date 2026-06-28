import type { TopicExtras } from "../types";

export const equationsExtras: TopicExtras = {
  topicId: "equations",
  hook:
    "An equation is a balanced see-saw and a puzzle in disguise. Once you can turn 'I think of a number…' into 3n + 7 = 25, you can make the unknown reveal itself — and the same skill solves real problems about money, angles and motion.",
  didYouKnow: [
    "The word 'algebra' comes from the Arabic 'al-jabr' in a 9th-century book by al-Khwarizmi — it means 'reunion of broken parts', the act of rebalancing an equation.",
    "The equals sign = was invented by Welsh mathematician Robert Recorde in 1557. He chose two parallel lines because 'no two things can be more equal'.",
    "The 'flip the sign' rule for inequalities is the single most common slip in exams — even though it follows from one simple idea: reflecting numbers across zero reverses their order.",
    "Forming and solving equations is exactly how spreadsheets, sat-navs and game engines work out unknown quantities billions of times a second.",
  ],
  experiments: [
    {
      title: "Build a paper balance",
      materials: ["A ruler or coat-hanger", "String", "Two identical cups", "Coins or counters", "A few sweets as 'unknowns'"],
      steps: [
        "Hang the ruler from its centre so it balances level — that is your = sign.",
        "Put an unknown number of hidden counters in one cup plus 4 known counters; balance it with 19 counters in the other cup.",
        "Remove 4 counters from BOTH cups and watch it stay level. This is 'subtract 4 from both sides'.",
        "Share the remaining counters equally to find how many are in one unknown — that is dividing both sides.",
      ],
      whatToNotice:
        "The balance only stays level when you do exactly the same thing to both sides. That is the whole rule for solving equations.",
    },
    {
      title: "Number-line inequality hunt",
      materials: ["A long strip of paper", "A marker", "A coin"],
      steps: [
        "Draw a number line from −6 to 6 on the strip.",
        "Pick an inequality such as −2x < 6 and solve it to get x > −3.",
        "Flip the coin onto random points and read off the number it lands on.",
        "Decide whether each landing point makes the ORIGINAL inequality true, and check it matches your solved region.",
      ],
      whatToNotice:
        "Every point to the right of −3 works, and none to the left do — proving the sign really did need to flip.",
    },
  ],
  interactive: "equation-balance",
};
