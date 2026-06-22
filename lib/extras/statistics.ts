import type { TopicExtras } from "../types";

export const statisticsExtras: TopicExtras = {
  topicId: "statistics",
  hook:
    "If Bill Gates walks into a café, the average (mean) wealth of everyone inside rockets into the billions — yet not one other customer is any richer. That single outlier is exactly why statisticians often trust the median over the mean.",
  didYouKnow: [
    "The word 'statistics' comes from the Latin for 'state' — governments first collected data to count people and plan taxes.",
    "Florence Nightingale invented a kind of pie chart (the 'rose diagram') to show that more soldiers were dying from disease than from battle wounds — and it changed hospital policy.",
    "Correlation does not prove causation: ice-cream sales and shark attacks both rise in summer, but ice cream does not attract sharks — hot weather drives both.",
    "A single extreme outlier can drag the mean a long way but barely move the median, which only cares about the middle position.",
  ],
  experiments: [
    {
      title: "The handful-of-data survey",
      materials: ["A bag of mixed sweets or counters", "Paper", "A pencil"],
      steps: [
        "Take ten random handfuls and count how many items are in each handful.",
        "Record the ten counts and put them in order.",
        "Work out the mean, median, mode and range of your ten numbers.",
        "Repeat with ten more handfuls and compare the two sets.",
      ],
      whatToNotice: "The mean and median are usually close, but a single unusually large handful (an outlier) pulls the mean up far more than the median.",
    },
    {
      title: "Build a pie chart from your day",
      materials: ["Paper", "A protractor", "Coloured pencils"],
      steps: [
        "List how many hours you spend on sleep, school, screens, food and 'other' in 24 hours.",
        "For each activity work out the angle = (hours ÷ 24) × 360°.",
        "Draw a circle and measure each slice with the protractor.",
        "Add the angles up to check they total 360°.",
      ],
      whatToNotice: "If your angles do not add to 360°, a calculation slipped — the total is a built-in error check.",
    },
  ],
  interactive: "probability-spinner",
};
