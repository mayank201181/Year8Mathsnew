import type { TopicExtras } from "../types";

export const decimalsRoundingExtras: TopicExtras = {
  topicId: "decimals-rounding",
  hook:
    "Every price tag, lap time and bank balance is a decimal that has been rounded. Master rounding and you can spot when a number is sensible — or when a calculator slip has shifted the point by a factor of ten.",
  didYouKnow: [
    "Petrol is priced to a tenth of a penny — '149.9p per litre' — because that extra rounded-down digit lets stations advertise a fraction lower than a round number.",
    "Pi is irrational: its decimals never end and never repeat. Computers have now calculated it to over 100 trillion places, yet 3.14159 is plenty for almost any real task.",
    "Significant figures matter in science: writing 30.0 g instead of 30 g claims you measured to the nearest 0.1 g, a stronger claim about how precise your scales are.",
    "Rounding errors can be expensive. In 1982 the Vancouver Stock Exchange index drifted badly wrong because each calculation rounded down, losing a little value thousands of times a day.",
  ],
  experiments: [
    {
      title: "Supermarket estimation race",
      materials: ["A shopping receipt or a list of 8–10 prices", "Paper and pen", "A calculator to check"],
      steps: [
        "Before adding exactly, round every price to the nearest pound (1 significant figure for the pence).",
        "Add your rounded prices in your head to get a quick estimate of the total.",
        "Now add the exact prices with a calculator.",
        "Compare: how close was your estimate? Was it above or below the true total?",
      ],
      whatToNotice:
        "Count how many prices you rounded up versus down — that tells you which way your estimate leans. Rounding to 1 s.f. usually lands within a few percent of the real total.",
    },
    {
      title: "How long is the table really?",
      materials: ["A ruler or tape measure marked in mm", "A table or shelf to measure"],
      steps: [
        "Measure a length to the nearest centimetre and write it down.",
        "Now measure the same length again to the nearest millimetre.",
        "From the centimetre value alone, write the lower and upper bounds (± 0.5 cm).",
        "Check that your millimetre measurement falls inside those bounds.",
      ],
      whatToNotice:
        "A single rounded measurement hides a whole range of possible true values. The finer your measuring scale, the narrower the bounds.",
    },
  ],
  interactive: "number-line",
};
