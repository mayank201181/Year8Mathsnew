import type { TopicExtras } from "../types";

export const sequencesGraphsExtras: TopicExtras = {
  topicId: "sequences-graphs",
  hook:
    "Patterns are everywhere — petals, pinecones, paving slabs and pixels. Once you can capture a pattern with an nth-term rule or a straight-line graph, you can predict the 1000th step without drawing it, and read a story straight off a line.",
  didYouKnow: [
    "Triangular numbers got their name from bowling: ten pins arranged in a triangle is the 4th triangular number, 1 + 2 + 3 + 4 = 10.",
    "Legend says the mathematician Gauss, aged about 8, added 1 + 2 + … + 100 in seconds by pairing the numbers — a trick that gives the 100th triangular number, 5050.",
    "Add any two neighbouring triangular numbers and you always get a perfect square, e.g. 6 + 10 = 16 — a pattern hiding inside the dot diagrams.",
    "The word 'gradient' comes from the Latin for 'step'. The gradient of a road sign like '10%' means it rises 10 m for every 100 m travelled along.",
  ],
  experiments: [
    {
      title: "Matchstick patterns",
      materials: ["A box of matchsticks or cocktail sticks", "Paper", "A pencil"],
      steps: [
        "Make 1 square (4 matches), then a row of 2 joined squares, then 3, then 4, recording the matches each time.",
        "Write the counts 4, 7, 10, 13, … and find the constant difference.",
        "Predict the matches for 10 squares using your rule before building it.",
        "Build the 10-square row and count to check your prediction.",
      ],
      whatToNotice:
        "Each new square adds 3 matches, not 4, because it shares a side — that 3 is the coefficient of n in the rule 3n + 1.",
    },
    {
      title: "Walk a straight-line graph",
      materials: ["Floor tiles or chalk on the ground", "A friend", "A stopwatch (optional)"],
      steps: [
        "Mark an origin, then an x-axis (across) and y-axis (up the grid of tiles).",
        "Choose a rule like y = 2x + 1 and step to (0,1), (1,3), (2,5), (3,7) one tile at a time.",
        "Notice you move the SAME way each time: 1 across and 2 up.",
        "Try y = −x + 4 and feel how a negative gradient makes you step downward.",
      ],
      whatToNotice:
        "A constant 'across-and-up' step is exactly what makes the points form a straight line — and the up-step is the gradient m.",
    },
  ],
  interactive: "function-grapher",
};
