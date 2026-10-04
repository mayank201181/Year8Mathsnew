import type { TopicExtras } from "../types.ts";

export const extras: TopicExtras = {
  hook:
    "In 1999 NASA lost its US$125 million Mars Climate Orbiter because one team's software gave its numbers in imperial units (pound-force) while the navigators assumed metric (newtons), so the spacecraft flew far too close to Mars and was lost. A number with the wrong unit isn't just untidy — here it was out by a factor of about 4.45.",

  didYouKnow: [
    "In 1983 an Air Canada Boeing 767 ran out of fuel in mid-flight. Its fuel had been worked out in **pounds**, but the new plane measured fuel in **kilograms**, so it took off with less than half the fuel it needed. The pilots glided it down to a former air-force base at Gimli, Canada, and everyone on board survived. It is still called the *Gimli Glider*.",
    "In 1795 France defined the gram as the mass of 1 cm³ of water (at the temperature of melting ice). That is why, even today, 1 litre of water has a mass of almost exactly 1 kg, and 1 ml of water is about 1 g.",
    "A mile is exactly 1609.344 metres. The word comes from the Latin *mille passus*, \"a thousand paces\". A Roman pace was two steps, about 1.5 m, so a Roman mile was roughly 1.5 km.",
    "Fibonacci numbers convert miles to kilometres: 5 miles ≈ 8 km, 8 miles ≈ 13 km, 13 miles ≈ 21 km, 21 miles ≈ 34 km. It works because the ratio of neighbouring Fibonacci numbers gets closer and closer to 1.618…, which is very near 1.609, the number of kilometres in a mile.",
    "Singapore's land area has grown from about 580 km² in the 1960s to over 730 km² today, mostly through land reclamation. Careful with the units: 730 km² is **730 000 000 m²**, because 1 km² = 1000 m × 1000 m = 1 000 000 m².",
    "A person balancing on one stiletto heel can put more **pressure** on a floor than an elephant's foot does. Pressure = force ÷ area: the person's weight is squeezed onto a heel tip of about 1 cm², while the elephant's much bigger weight is spread over four huge, flat feet.",
  ],

  activities: [
    {
      title: "How fast do you walk — in m/s and km/h?",
      emoji: "🚶",
      materials: [
        "A tape measure, or a 20 m stretch you can measure (a corridor, a void deck or a running track)",
        "A stopwatch (a phone works)",
        "A partner",
        "Pencil and paper",
      ],
      steps: [
        "Mark a start line and a finish line exactly 20 m apart.",
        "Start walking at your normal pace a few steps *before* the start line, so you are already moving. Your partner times you from the start line to the finish line. Do it three times and find the mean time.",
        "Work out your speed in m/s: 20 m ÷ your time. For example, 20 m in 15 s is 20 ÷ 15 ≈ 1.33 m/s.",
        "Convert to km/h by multiplying by 3.6. For example, 1.33 m/s × 3.6 ≈ 4.8 km/h.",
        "Predict how long it would take you to walk 1 km (at 1.33 m/s it is 1000 ÷ 1.33 ≈ 750 s, about 12.5 minutes). Test your prediction on a walk to the MRT station or the shops, using a map app for the distance.",
        "Now jog the 20 m. How many times faster than your walk is your jog?",
      ],
      maths:
        "Speed = distance ÷ time. To change m/s into km/h, multiply by 3600 (seconds in an hour) and divide by 1000 (metres in a kilometre): × 3600 ÷ 1000 is the same as × 3.6. Most people walk at about 1.3 to 1.4 m/s, which is roughly 5 km/h.",
    },
    {
      title: "Build a litre",
      emoji: "📦",
      materials: [
        "Thin card (an old cereal box is perfect)",
        "Ruler, pencil, scissors and sticky tape",
        "A measuring jug",
        "A food bag to line the box, or some dry rice",
        "Kitchen scales (optional)",
      ],
      steps: [
        "Draw five squares, each 10 cm by 10 cm, in a cross shape on the card: a base with a side on each edge. Cut it out, fold up the sides and tape the edges to make an open box.",
        "Predict: how many cm³ does your box hold? How many millilitres is that?",
        "Line the box with a food bag and pour in exactly 1000 ml of water from the jug — or fill the box to the brim with dry rice, then tip the rice into the jug and read the scale.",
        "If you have kitchen scales, weigh 1 litre of water (remember to subtract the mass of the jug). It should be very close to 1 kg.",
        "Challenge: a cube with 1 m edges is 100 cm along each edge. How many of your litre boxes would fit inside it? Predict before you work it out.",
      ],
      maths:
        "Your box measures 10 cm × 10 cm × 10 cm = 1000 cm³, and 1 cm³ = 1 ml, so it holds 1000 ml = 1 litre. A 1 m cube is 100 cm × 100 cm × 100 cm = 1 000 000 cm³: that is 10 × 10 × 10 = 1000 of your boxes. So 1 m³ = 1000 litres, and a cubic metre of water has a mass of about 1000 kg, which is 1 tonne.",
    },
  ],

  bonusDiagrams: [
    {
      title: "Why × 3.6 turns m/s into km/h",
      svg: `<svg viewBox="0 0 460 205" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A chain of four boxes. 1 metre per second, times 60, gives 60 metres per minute. Times 60 again gives 3600 metres per hour. Divide by 1000 to get 3.6 kilometres per hour. So 1 metre per second equals 3.6 kilometres per hour. To go from metres per second to kilometres per hour multiply by 3.6; to go back divide by 3.6. For example 90 kilometres per hour divided by 3.6 is 25 metres per second."><rect x="0" y="0" width="460" height="205" fill="#ffffff"/><rect x="10" y="40" width="90" height="56" rx="8" fill="#c7d2fe" stroke="#334155" stroke-width="1.5"/><text x="55" y="64" font-size="14" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="#1f2937">1 m</text><text x="55" y="83" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">per second</text><rect x="126" y="40" width="90" height="56" rx="8" fill="#c7d2fe" stroke="#334155" stroke-width="1.5"/><text x="171" y="64" font-size="14" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="#1f2937">60 m</text><text x="171" y="83" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">per minute</text><rect x="242" y="40" width="90" height="56" rx="8" fill="#c7d2fe" stroke="#334155" stroke-width="1.5"/><text x="287" y="64" font-size="14" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="#1f2937">3600 m</text><text x="287" y="83" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">per hour</text><rect x="358" y="40" width="90" height="56" rx="8" fill="#bbf7d0" stroke="#334155" stroke-width="1.5"/><text x="403" y="64" font-size="14" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="#1f2937">3.6 km</text><text x="403" y="83" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">per hour</text><line x1="101" y1="68" x2="118" y2="68" stroke="#334155" stroke-width="2"/><polygon points="125,68 117,64 117,72" fill="#334155"/><line x1="217" y1="68" x2="234" y2="68" stroke="#334155" stroke-width="2"/><polygon points="241,68 233,64 233,72" fill="#334155"/><line x1="333" y1="68" x2="350" y2="68" stroke="#334155" stroke-width="2"/><polygon points="357,68 349,64 349,72" fill="#334155"/><text x="113" y="30" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">× 60</text><text x="229" y="30" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">× 60</text><text x="345" y="30" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">÷ 1000</text><text x="230" y="132" font-size="14" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="#1f2937">So 1 m/s = 3.6 km/h</text><text x="125" y="158" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">m/s → km/h: × 3.6</text><text x="335" y="158" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">km/h → m/s: ÷ 3.6</text><text x="230" y="186" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#334155">e.g. 90 km/h ÷ 3.6 = 25 m/s: 25 metres every second</text></svg>`,
      caption:
        "There are 60 seconds in a minute, 60 minutes in an hour and 1000 metres in a kilometre. Follow the chain and 1 m/s becomes 3.6 km/h. Sense check: for the same speed, the number in km/h is always the bigger one (3.6 times bigger), so if your km/h answer comes out smaller than the m/s value, you have used the wrong operation.",
    },
    {
      title: "Average speed: why 48 km/h, not 50",
      svg: `<svg viewBox="0 0 460 215" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A time line drawn to scale from 0 to 75 minutes. Leg 1, 30 km at 60 km per hour, takes 30 minutes. Leg 2, 30 km at 40 km per hour, takes 45 minutes. Total 60 km in 75 minutes, which is 1.25 hours, so the average speed is 60 divided by 1.25, which is 48 km per hour."><rect x="0" y="0" width="460" height="215" fill="#ffffff"/><text x="230" y="20" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">30 km at 60 km/h, then 30 km back at 40 km/h</text><text x="115" y="44" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#334155">30 km</text><text x="302.5" y="44" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#334155">30 km</text><rect x="40" y="50" width="150" height="44" fill="#c7d2fe" stroke="#334155" stroke-width="1.5"/><rect x="190" y="50" width="225" height="44" fill="#fde68a" stroke="#334155" stroke-width="1.5"/><text x="115" y="69" font-size="12" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="#1f2937">Leg 1: 30 min</text><text x="115" y="85" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">at 60 km/h</text><text x="302.5" y="69" font-size="12" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="#1f2937">Leg 2: 45 min</text><text x="302.5" y="85" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">at 40 km/h</text><line x1="40" y1="106" x2="415" y2="106" stroke="#1f2937" stroke-width="1.5"/><line x1="40" y1="102" x2="40" y2="110" stroke="#1f2937" stroke-width="1.5"/><line x1="115" y1="102" x2="115" y2="110" stroke="#1f2937" stroke-width="1.5"/><line x1="190" y1="102" x2="190" y2="110" stroke="#1f2937" stroke-width="1.5"/><line x1="265" y1="102" x2="265" y2="110" stroke="#1f2937" stroke-width="1.5"/><line x1="340" y1="102" x2="340" y2="110" stroke="#1f2937" stroke-width="1.5"/><line x1="415" y1="102" x2="415" y2="110" stroke="#1f2937" stroke-width="1.5"/><text x="40" y="124" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#334155">0</text><text x="115" y="124" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#334155">15</text><text x="190" y="124" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#334155">30</text><text x="265" y="124" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#334155">45</text><text x="340" y="124" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#334155">60</text><text x="415" y="124" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#334155">75 min</text><text x="230" y="152" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Total: 60 km in 75 min = 1.25 h</text><text x="230" y="175" font-size="14" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="#1f2937">Average speed = 60 ÷ 1.25 = 48 km/h</text><text x="230" y="200" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#334155">More of the time is spent at 40 km/h, so the average sits below 50.</text></svg>`,
      caption:
        "Drawn to scale in time. Both legs are 30 km, but the slow leg lasts 45 minutes and the fast leg only 30, so 40 km/h counts for more of the journey. Average speed is always total distance ÷ total time — never just the mean of the speeds (unless the legs take equal times).",
    },
  ],

  history: {
    title: "Measuring the Earth to make the metre",
    story:
      "In 1791, during the French Revolution, scientists in Paris set out to create measures \"for all people, for all time\". They defined the metre as one ten-millionth of the distance from the North Pole to the equator.\n\nTwo astronomers, Jean-Baptiste Delambre and Pierre Méchain, spent seven years measuring part of that distance, from Dunkirk to Barcelona, using chains of giant triangles. They hauled instruments up church towers while war broke out around them. Méchain found a tiny mismatch in his own readings and kept it secret for the rest of his life.\n\nTheir metre came out about 0.2 mm too short, but that hardly mattered: at last, a metre in Paris and a metre anywhere else were the same. Today the metre is defined by light — the distance it travels in {{1/299792458}} of a second.",
  },
};
