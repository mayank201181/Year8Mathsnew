import type { TopicExtras } from "../types.ts";

export const extras: TopicExtras = {
  hook:
    "Is \"50% off, then a further 20% off\" the same as 70% off? Lots of shoppers think so — it is actually only 60% off, and one idea, the **multiplier**, shows why in a single line: {{0.5 * 0.8 = 0.4}}.",

  didYouKnow: [
    "The % sign grew out of handwritten abbreviations of the Italian *per cento*, \"for each hundred\", used by merchants from the 1400s. Over the next two centuries, writers squashed \"cento\" into a tiny symbol (a small circle, a bar and another circle) written after \"per\". Later the \"per\" was dropped, leaving the sign we use today.",
    "Singapore's GST went up from 8% to 9% on 1 January 2024. That is a rise of 1 **percentage point** — but the tax itself grew by {{1/8}} of its old size, which is a 12.5% increase. Percentage points and percent are not the same thing.",
    "On a Singapore menu, \"$20++\" means a 10% service charge *and then* 9% GST — and GST is charged on the service charge too. So the bill is multiplied by 1.1 × 1.09 = 1.199: you pay 19.9% extra, not 19%.",
    "If a share price falls by 50%, it then has to rise by **100%** just to get back to where it started. A × 0.5 can only be undone by × 2.",
    "The \"rule of 72\" says that money growing at r% compound interest roughly doubles in 72 ÷ r years. At 6% a year that is about 12 years — and indeed {{1.06^12 ~= 2.01}}. The rule was already printed in an Italian maths book in 1494.",
    "In finance, a **basis point** is one hundredth of a percentage point, so 25 basis points = 0.25 percentage points. When a central bank \"raises rates by 25 basis points\", an interest rate of 3% becomes 3.25%.",
  ],

  activities: [
    {
      title: "The \"++\" bill detective",
      emoji: "🧾",
      materials: ["A café or restaurant menu with \"++\" prices (or use the prices below)", "A calculator", "Paper and pencil"],
      steps: [
        "Choose an order — for example vegetable fried rice at $12++ and a lime juice at $4++, so $16++ in total.",
        "Predict the bill by adding the percentages: 10% + 9% = 19%, so $16 × 1.19 = $19.04.",
        "Now work it out the way restaurants do: service charge first ($16 × 1.10 = $17.60), then GST on that ($17.60 × 1.09 = $19.184, which rounds to $19.18).",
        "Find the single multiplier for both charges: 1.10 × 1.09 = 1.199. Check that $16 × 1.199 gives the same $19.184.",
        "Work backwards: a family's bill comes to $59.95. Divide by 1.199 to find the menu total before the charges. Check your answer by multiplying back.",
      ],
      maths:
        "Percentage changes in a row **multiply**, they don't add: × 1.10 × 1.09 = × 1.199, which is 19.9% extra, because the 9% GST is also charged on the service charge. Going backwards is a reverse percentage — divide by the multiplier: $59.95 ÷ 1.199 = $50.",
    },
    {
      title: "Bouncing-ball percentages",
      emoji: "🎾",
      materials: ["A tennis ball or ping-pong ball", "A tape measure or metre ruler", "A partner (and a phone that films in slow motion, if you have one)"],
      steps: [
        "Stand the tape measure upright against a wall, with 0 cm at the floor.",
        "Drop the ball (don't throw it) from 100 cm. Your partner reads the height of the first bounce. Do it three times and take the mean.",
        "Write the bounce height as a percentage of the drop height — for example, 62 cm from 100 cm is 62%.",
        "Predict the bounce from a 60 cm drop using your percentage (for 62%: 0.62 × 60 ≈ 37 cm). Test it.",
        "Predict the height of the *third* bounce from a 100 cm drop by using the multiplier three times. Film it to check.",
      ],
      maths:
        "Each bounce keeps roughly the same percentage of the height before it, so the heights follow **repeated multiplication**: 100 × 0.62 × 0.62 × 0.62 ≈ 24 cm. That is the same maths as compound interest, but with a multiplier less than 1 — a repeated percentage decrease.",
    },
  ],

  bonusDiagrams: [
    {
      title: "Why +10% then −10% doesn't get you back",
      svg: `<svg viewBox="0 0 440 205" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three bars drawn to scale. Start: 100 dollars. After a 10 percent increase: 100 plus 10 equals 110 dollars. After a 10 percent decrease of 110: 11 dollars is removed, leaving 99 dollars, which is short of the dashed 100 dollar line."><rect x="0" y="0" width="440" height="205" fill="#ffffff"/><text x="10" y="45" font-size="13" font-family="sans-serif" fill="#1f2937">Start</text><rect x="110" y="24" width="240" height="32" fill="#c7d2fe" stroke="#334155"/><text x="230" y="45" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">$100</text><text x="10" y="98" font-size="13" font-family="sans-serif" fill="#1f2937">+10%</text><text x="10" y="113" font-size="11" font-family="sans-serif" fill="#334155">× 1.1</text><rect x="110" y="84" width="240" height="32" fill="#c7d2fe" stroke="#334155"/><rect x="350" y="84" width="24" height="32" fill="#bbf7d0" stroke="#334155"/><text x="230" y="105" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">$100</text><text x="353" y="79" font-size="11" font-family="sans-serif" fill="#1f2937">+$10</text><text x="382" y="105" font-size="13" font-family="sans-serif" fill="#1f2937">= $110</text><text x="10" y="158" font-size="13" font-family="sans-serif" fill="#1f2937">−10%</text><text x="10" y="173" font-size="11" font-family="sans-serif" fill="#334155">× 0.9</text><rect x="110" y="144" width="237.6" height="32" fill="#c7d2fe" stroke="#334155"/><rect x="347.6" y="144" width="26.4" height="32" fill="#fecaca" stroke="#334155" stroke-dasharray="3 2"/><text x="228.8" y="165" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">$99</text><text x="353" y="139" font-size="11" font-family="sans-serif" fill="#1f2937">−$11</text><text x="382" y="165" font-size="13" font-family="sans-serif" fill="#1f2937">= $99</text><line x1="350" y1="18" x2="350" y2="182" stroke="#1f2937" stroke-width="1.5" stroke-dasharray="4 3"/><text x="220" y="198" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Short by $1: the 10% taken off is 10% of $110, not of $100.</text></svg>`,
      caption:
        "Drawn to scale. The increase is 10% of $100 = $10, but the decrease is 10% of $110 = $11. In one line: × 1.1 × 0.9 = × 0.99, a 1% loss overall.",
    },
    {
      title: "Reverse percentages: find the right 100%",
      svg: `<svg viewBox="0 0 440 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bar model. The original price is a bar of five equal blocks, each 20 percent. In the sale, four blocks remain, making 80 percent, which equals 60 dollars, so each block is 15 dollars and the original price is 75 dollars."><rect x="0" y="0" width="440" height="230" fill="#ffffff"/><text x="220" y="20" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Original price = 100% = ?</text><rect x="40" y="30" width="72" height="36" fill="#c7d2fe" stroke="#334155"/><rect x="112" y="30" width="72" height="36" fill="#c7d2fe" stroke="#334155"/><rect x="184" y="30" width="72" height="36" fill="#c7d2fe" stroke="#334155"/><rect x="256" y="30" width="72" height="36" fill="#c7d2fe" stroke="#334155"/><rect x="328" y="30" width="72" height="36" fill="#c7d2fe" stroke="#334155"/><text x="76" y="53" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">20%</text><text x="148" y="53" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">20%</text><text x="220" y="53" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">20%</text><text x="292" y="53" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">20%</text><text x="364" y="53" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">20%</text><rect x="40" y="90" width="72" height="36" fill="#bbf7d0" stroke="#334155"/><rect x="112" y="90" width="72" height="36" fill="#bbf7d0" stroke="#334155"/><rect x="184" y="90" width="72" height="36" fill="#bbf7d0" stroke="#334155"/><rect x="256" y="90" width="72" height="36" fill="#bbf7d0" stroke="#334155"/><rect x="328" y="90" width="72" height="36" fill="#ffffff" stroke="#334155" stroke-dasharray="5 4"/><text x="76" y="113" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">$15</text><text x="148" y="113" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">$15</text><text x="220" y="113" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">$15</text><text x="292" y="113" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">$15</text><text x="364" y="113" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#334155">20% off</text><line x1="40" y1="136" x2="328" y2="136" stroke="#334155" stroke-width="1.5"/><line x1="40" y1="130" x2="40" y2="136" stroke="#334155" stroke-width="1.5"/><line x1="328" y1="130" x2="328" y2="136" stroke="#334155" stroke-width="1.5"/><text x="184" y="154" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Sale price = 80% = $60</text><text x="220" y="184" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="#1f2937">80% = $60  →  20% = $15  →  100% = $75</text><text x="220" y="212" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#334155">Not $72 — that wrongly treats the sale price as 100%.</text></svg>`,
      caption:
        "Trainers cost $60 in a 20%-off sale. The $60 is 80% of the original, so divide by 0.8 (or find 20% first): $60 ÷ 0.8 = $75. Check: $75 × 0.8 = $60.",
    },
  ],

  history: {
    title: "A Roman tax, Italian bankers and the rule of 72",
    story:
      "Long before decimals, the Roman emperor Augustus taxed goods sold at auction at one hundredth of their price — the *centesima rerum venalium*, a 1% sales tax. Counting in hundredths stuck.\n\nIn the trading cities of medieval Italy, merchants and bankers quoted profits, losses and interest *per cento*, \"for each hundred\", because putting everything out of 100 made deals easy to compare and check. By around 1500, their arithmetic textbooks regularly included percentage problems on profit, loss and interest. In 1494 the friar Luca Pacioli published his *Summa de arithmetica* in Venice, which included a shortcut for compound interest: divide 72 by the yearly rate to estimate how many years it takes money to double.\n\nAll the while, writers kept abbreviating *per cento*, until the words shrank into the sign you write today: %.",
  },
};
