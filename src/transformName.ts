import { snakeCase } from "lodash";

const transformName = (name: string) => {
  return snakeCase(
    name
      .toLowerCase()
      .split("[5ymm] ")
      .join("")
      .split("[6ymm] ")
      .join("")
      .split("♪")
      .join("")
      .split("ツ")
      .join("")
      .split("*")
      .join("")
  );
};

export { transformName };
