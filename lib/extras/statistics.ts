import type { TopicExtras } from "../types.ts";

export const extras: TopicExtras = {
  hook:
    "On sunny days, ice-cream sales and sunburn cases rise and fall together, almost in step. So does ice cream cause sunburn? Collecting data carefully, drawing it honestly and reading it critically is how you tell a real link from a fake one.",

  didYouKnow: [
    "The line graph and the bar chart are usually credited to one person: the Scottish engineer William Playfair, who used both in his 1786 book *The Commercial and Political Atlas*. In 1801 he published one of the first pie charts too.",
    "In 1936 the American magazine *The Literary Digest* collected about 2.4 million replies and predicted that Alf Landon would beat Franklin D. Roosevelt to become president. Roosevelt won 46 of the 48 states. Many of the names came from lists such as telephone directories and car registrations, which in the 1930s leaned towards richer people, and the people who chose to reply weren't typical either. A huge sample is useless if it is biased.",
    "In 1973 the statistician Francis Anscombe made four small data sets that share the same means, the same correlation and the same line of best fit. Plotted, they look nothing alike: one is a curve, and another is a perfect straight line except for a single outlier. The moral: always draw the graph.",
    "In 2012 a doctor, Franz Messerli, published a tongue-in-cheek article in the *New England Journal of Medicine* showing that countries that eat more chocolate per person also have more Nobel Prize winners per person, a strong positive correlation. Nobody thinks chocolate wins Nobel Prizes; a likely explanation is that richer countries can afford more of both.",
    "Venn diagrams are named after John Venn, who published them in 1880. Carroll diagrams are named after Lewis Carroll, author of *Alice's Adventures in Wonderland*. His real name was Charles Dodgson, he taught mathematics at Oxford, and he used the grid diagrams in his 1886 book *The Game of Logic*.",
    "Singapore has counted its whole population in a census roughly every ten years since 1871. The most recent, Census 2020, didn't knock on every door: it combined existing government records with a large sample survey of households.",
  ],

  activities: [
    {
      title: "Are you a square? Arm span against height",
      emoji: "📏",
      materials: [
        "A tape measure or a long metre rule",
        "At least 8 people of different heights: family, friends or CCA mates",
        "Graph paper and a pencil",
        "A ruler for the line of best fit",
      ],
      steps: [
        "Measure each person's height without shoes, standing straight against a wall, to the nearest centimetre.",
        "Measure their arm span: arms stretched out sideways at shoulder height, from fingertip to fingertip, to the nearest centimetre.",
        "Record the results in a table with two columns: height (cm) and arm span (cm).",
        "Draw a scatter graph with height on the horizontal axis and arm span on the vertical axis. Choose scales that fit your data. The axes don't have to start at 0, but draw a zig-zag break if they don't.",
        "Describe the correlation. Then draw one straight line of best fit by eye, with about as many points above it as below. Check that it passes close to the mean point (mean height, mean arm span).",
        "Use your line to predict the arm span of someone 150 cm tall, and of a baby 60 cm long. Which prediction do you trust more, and why?",
      ],
      maths:
        "You should find **strong positive correlation**: taller people tend to have longer arm spans, and for many people the two measurements are within a few centimetres of each other. The Roman architect Vitruvius claimed over 2000 years ago that a person's arm span equals their height, so a person fits neatly in a square. Predicting for someone 150 cm tall is **interpolation** if 150 cm lies inside your data, so it's fairly reliable. Predicting for a baby is **extrapolation**: far outside your data, where you have no evidence that the same pattern holds.",
    },
    {
      title: "36 cars: an honest pie chart and a sneaky bar chart",
      emoji: "🚗",
      materials: [
        "Paper and a pencil",
        "A protractor, and a pair of compasses (or a small plate to draw round)",
        "A ruler",
        "A safe spot to watch a car park or a road, for example an HDB corridor or a void deck",
      ],
      steps: [
        "Make a tally chart with rows for white, black, grey or silver, red, blue and other colours.",
        "Tally the colours of the next 36 cars you see, and stop at exactly 36.",
        "Turn the tallies into a frequency table and check that the frequencies add up to 36.",
        "The 36 cars share 360°, so each car gets 360° ÷ 36 = 10°. Multiply each frequency by 10° to get its angle, and check that the angles add up to 360°.",
        "Draw a circle and one radius. Measure each angle round from the last line with your protractor, and label each slice.",
        "Now draw two bar charts of the same data: one with the frequency axis starting at 0, and one starting just below your smallest frequency. Show both to someone at home and ask: which colour is most popular, and by how much?",
      ],
      maths:
        "A pie chart shows each colour's **share** of the whole: angle = {{\"frequency\"/36}} × 360°, which works out as 10° per car, and the angles must total 360°. Choosing 36 cars, a factor of 360, keeps every angle a whole number. The two bar charts show exactly the same numbers, but the cut-off axis makes small differences look huge, because we judge bars by their length. That's why a bar chart's frequency axis should start at 0.",
    },
  ],

  bonusDiagrams: [
    {
      title: "Picture scaling: twice as tall is four times the picture",
      svg: `<svg viewBox="0 0 480 290" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Left, labelled misleading: Shop B's 50 sales are drawn as a small square and Shop A's 100 sales as a square twice as tall and twice as wide. Dashed lines split the big square into 4 small squares, so it looks 4 times as big. Right, labelled fair: a pictogram where each same-size square stands for 50 sales, so Shop A has 2 squares and Shop B has 1."><rect x="0" y="0" width="480" height="290" fill="#ffffff"/><line x1="262" y1="10" x2="262" y2="280" stroke="#e5e7eb" stroke-width="1.5"/><g font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="130" y="24" font-size="14" font-weight="bold" fill="#b91c1c">Misleading</text><text x="370" y="24" font-size="14" font-weight="bold" fill="#15803d">Fair</text></g><line x1="20" y1="230" x2="250" y2="230" stroke="#334155" stroke-width="1.5"/><rect x="36" y="170" width="60" height="60" fill="#fde68a" stroke="#334155" stroke-width="1.5"/><rect x="116" y="110" width="120" height="120" fill="#c7d2fe" stroke="#334155" stroke-width="1.5"/><g stroke="#334155" stroke-width="1.2" stroke-dasharray="5 4"><line x1="176" y1="110" x2="176" y2="230"/><line x1="116" y1="170" x2="236" y2="170"/></g><g font-family="sans-serif" fill="#334155" font-size="12" text-anchor="middle"><text x="146" y="145">1</text><text x="206" y="145">2</text><text x="146" y="205">3</text><text x="206" y="205">4</text></g><g font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="176" y="72" font-size="12">2× as tall and</text><text x="176" y="88" font-size="12">2× as wide</text><text x="66" y="248" font-size="12" font-weight="bold">Shop B</text><text x="66" y="263" font-size="12">50 sold</text><text x="176" y="248" font-size="12" font-weight="bold">Shop A</text><text x="176" y="263" font-size="12">100 sold</text><text x="132" y="283" font-size="12" font-weight="bold" fill="#b91c1c">but 4× the area: looks 4× as many</text></g><g font-family="sans-serif" fill="#1f2937" font-size="13"><text x="282" y="80" font-weight="bold">Shop A</text><text x="282" y="140" font-weight="bold">Shop B</text></g><rect x="340" y="60" width="40" height="40" fill="#c7d2fe" stroke="#334155" stroke-width="1.5"/><rect x="390" y="60" width="40" height="40" fill="#c7d2fe" stroke="#334155" stroke-width="1.5"/><rect x="340" y="120" width="40" height="40" fill="#fde68a" stroke="#334155" stroke-width="1.5"/><rect x="290" y="186" width="40" height="40" fill="#e5e7eb" stroke="#334155" stroke-width="1.5"/><g font-family="sans-serif" fill="#1f2937" font-size="12"><text x="340" y="211">= 50 sold</text><text x="282" y="256">Same-size pictures:</text><text x="282" y="273">A has 2, B has 1, so 2 : 1</text></g></svg>`,
      caption:
        "Shop A sold twice as many as Shop B, so its picture was drawn twice as tall. But it's also twice as wide, so it covers 4 times the area and looks like 4 times as much. A fair pictogram uses same-size pictures with a key, so the number of pictures shows the amount.",
    },
    {
      title: "Correlation is not causation: the hidden third variable",
      svg: `<svg viewBox="0 0 480 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A hot, sunny day, the hidden third variable, has arrows labelled causes pointing to more ice creams sold and to more sunburn cases. Between those two boxes a dashed line says they rise together, but ice cream does not cause sunburn."><rect x="0" y="0" width="480" height="250" fill="#ffffff"/><rect x="150" y="14" width="180" height="52" rx="10" fill="#fde68a" stroke="#334155" stroke-width="1.5"/><rect x="20" y="150" width="170" height="48" rx="10" fill="#c7d2fe" stroke="#334155" stroke-width="1.5"/><rect x="290" y="150" width="170" height="48" rx="10" fill="#fecaca" stroke="#334155" stroke-width="1.5"/><g stroke="#334155" stroke-width="2"><line x1="205" y1="66" x2="134.8" y2="140.7"/><line x1="275" y1="66" x2="345.2" y2="140.7"/></g><g fill="#334155"><polygon points="128,148 131.2,137.3 138.5,144.1"/><polygon points="352,148 341.5,144.1 348.8,137.3"/></g><line x1="192" y1="172" x2="288" y2="172" stroke="#334155" stroke-width="1.5" stroke-dasharray="5 4"/><g font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="240" y="37" font-size="14" font-weight="bold">Hot, sunny day</text><text x="240" y="55" font-size="11">(the hidden third variable)</text><text x="105" y="179" font-size="13" font-weight="bold">More ice creams sold</text><text x="375" y="179" font-size="13" font-weight="bold">More sunburn cases</text><text x="240" y="164" font-size="11">rise together</text><text x="240" y="190" font-size="11" fill="#b91c1c">✗ no direct cause</text><text x="240" y="225" font-size="12">Correlation: the two rise and fall together.</text><text x="240" y="242" font-size="12">Causation: one actually makes the other happen.</text></g><g font-family="sans-serif" fill="#1f2937" font-size="12" font-style="italic"><text x="158" y="104" text-anchor="end">causes</text><text x="322" y="104" text-anchor="start">causes</text></g></svg>`,
      caption:
        "Ice-cream sales and sunburn cases are positively correlated because the weather drives both. Whenever you see a correlation, ask: could a third variable be causing both? Only a fair experiment can show that one thing really causes another.",
    },
  ],

  history: {
    title: "Florence Nightingale's rose diagram",
    story:
      "Florence Nightingale is remembered as \"the Lady with the Lamp\", the nurse who cared for British soldiers in the Crimean War (1853–1856). She was also a brilliant statistician. At the army hospital in Scutari, across the water from Constantinople (today's Istanbul), she kept careful records. They showed that far more soldiers were dying of diseases such as cholera and typhus, spread in dirty, overcrowded wards, than of their battle wounds.\n\nLong tables of numbers are easy to ignore, so she drew a picture instead: a \"rose diagram\", a circle split into twelve wedges, one for each month, with the size of each wedge showing the deaths from each cause. The huge blue wedges for preventable disease were impossible to miss. Her charts helped persuade the government to clean up army hospitals, and in 1858 she became the first woman elected to the Statistical Society of London.",
  },
};
