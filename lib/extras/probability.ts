import type { TopicExtras } from "../types";

export const probabilityExtras: TopicExtras = {
  topicId: "probability",
  hook: "Roll two dice a thousand times and the totals always pile up into the same mountain shape — chance has hidden rules you can predict.",
  didYouKnow: [
    "With two dice, 7 is the most likely total because it has six combinations, while 2 and 12 each have only one — that is why 7 matters so much in board games.",
    "The 'law of large numbers' says the more times you repeat an experiment, the closer your relative frequency creeps to the true probability — one flip proves nothing, but a million flips reveal it.",
    "Casinos rely on probability, not luck: every game is designed so the expected frequency of wins gives the house a small but certain long-run edge.",
    "Modern probability began in 1654 when gamblers asked mathematicians Blaise Pascal and Pierre de Fermat how to fairly split the stakes of an unfinished dice game.",
  ],
  experiments: [
    {
      title: "Two-dice total mountain",
      materials: ["Two dice", "Paper and pencil", "Optional: a friend to share rolls"],
      steps: [
        "Draw a tally chart with rows for every total from 2 to 12.",
        "Roll both dice, add the numbers, and add a tally mark to that total.",
        "Repeat for at least 60 rolls (more is better).",
        "Turn your tallies into a bar chart of how often each total appeared.",
      ],
      whatToNotice:
        "The bars form a mountain peaking at 7 and tailing off to 2 and 12. Compare your relative frequencies (count ÷ total rolls) with the theoretical values: P(7) = 6/36 = 1/6, P(2) = 1/36.",
    },
    {
      title: "Is your coin really fair?",
      materials: ["A coin", "Paper for tallying"],
      steps: [
        "Predict the probability of heads for a fair coin (it should be 1/2).",
        "Flip the coin 20 times and record the relative frequency of heads.",
        "Now flip it another 80 times (100 total) and recalculate the relative frequency.",
        "Compare the two estimates with 0.5.",
      ],
      whatToNotice:
        "The estimate from 100 flips usually sits closer to 0.5 than the one from 20 flips — evidence that more trials give a better estimate of the true probability.",
    },
  ],
  interactive: "probability-spinner",
};
