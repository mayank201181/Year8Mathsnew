import type { TopicExtras } from "../types";

export const fractionsExtras: TopicExtras = {
  topicId: "fractions",
  hook:
    "Cut a pizza two different ways and you still have the same lunch — that single idea, 'equivalent fractions', is the secret behind every fraction calculation you will ever do.",
  didYouKnow: [
    "The ancient Egyptians wrote almost every fraction as a sum of distinct unit fractions (like ½ + ¼), called 'Egyptian fractions' — ¾ became ½ + ¼.",
    "The word 'fraction' comes from the Latin 'fractus', meaning 'broken' — a fraction is literally a broken-up whole.",
    "The horizontal fraction bar (the 'vinculum') was introduced by Arab mathematicians around the 12th century and spread to Europe soon after.",
    "Dividing by a fraction smaller than 1 makes a number BIGGER — 10 ÷ ½ = 20 — which is why 'how many halves in 10?' feels surprising the first time.",
  ],
  experiments: [
    {
      title: "Paper-fold fraction wall",
      materials: ["Several equal strips of paper", "A pen"],
      steps: [
        "Leave one strip whole and label it 1.",
        "Fold a second strip in half and label each part ½; fold the next into quarters, then eighths.",
        "Fold other strips into thirds and sixths.",
        "Stack the strips and line them up to compare lengths.",
      ],
      whatToNotice:
        "Two ¼ pieces line up exactly with one ½, and three ⅙ pieces match one ½ — you can SEE that ²⁄₄ = ½ and that a common denominator is just choosing strips cut into the same number of pieces.",
    },
    {
      title: "The recipe scaler",
      materials: ["A simple recipe (e.g. for 4 people)", "Pencil and paper"],
      steps: [
        "Pick a recipe and write out each quantity (e.g. ¾ cup flour, ⅔ cup milk).",
        "Halve the recipe by multiplying every quantity by ½.",
        "Now make it serve 6 from a 4-person recipe by multiplying every quantity by 6⁄4 = 3⁄2.",
        "Simplify each scaled amount and write it as a mixed number where helpful.",
      ],
      whatToNotice:
        "Multiplying by ½ shrinks every amount; multiplying by 3⁄2 grows it. Scaling a whole recipe is just multiplying lots of fractions — the same Keep-Change-Flip and cancelling skills from the lesson.",
    },
  ],
  interactive: "fraction-bar",
};
