import { transformName } from "./transformName";

export const levelPath = (levelName: string, width = 480) =>
  `levelImages/${transformName(levelName)}-${width}.png`;
