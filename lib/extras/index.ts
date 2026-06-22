import type { TopicExtras } from "../types";
import { integersPowersExtras } from "./integers-powers";
import { factorsMultiplesExtras } from "./factors-multiples";
import { fractionsExtras } from "./fractions";
import { decimalsRoundingExtras } from "./decimals-rounding";
import { percentagesExtras } from "./percentages";
import { ratioProportionExtras } from "./ratio-proportion";
import { expressionsExtras } from "./expressions";
import { equationsExtras } from "./equations";
import { sequencesGraphsExtras } from "./sequences-graphs";
import { anglesPolygonsExtras } from "./angles-polygons";
import { perimeterAreaVolumeExtras } from "./perimeter-area-volume";
import { transformationsPythagorasExtras } from "./transformations-pythagoras";
import { statisticsExtras } from "./statistics";
import { probabilityExtras } from "./probability";

const ALL: TopicExtras[] = [
  integersPowersExtras,
  factorsMultiplesExtras,
  fractionsExtras,
  decimalsRoundingExtras,
  percentagesExtras,
  ratioProportionExtras,
  expressionsExtras,
  equationsExtras,
  sequencesGraphsExtras,
  anglesPolygonsExtras,
  perimeterAreaVolumeExtras,
  transformationsPythagorasExtras,
  statisticsExtras,
  probabilityExtras,
];

export const EXTRAS: Record<string, TopicExtras> = Object.fromEntries(
  ALL.map((e) => [e.topicId, e])
);

export function getExtras(topicId: string): TopicExtras | undefined {
  return EXTRAS[topicId];
}
