import { transformName } from "./transformName";

export const makerPath = (makerName: string, width = 250) =>
  `makerImages/${transformName(makerName)}-${width}.png`;
