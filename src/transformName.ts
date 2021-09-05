import { snakeCase } from "lodash";

const transformName = (name: string) => {
  return snakeCase(
    name.toLowerCase().split("[5ymm] ").join("").split("♪").join("").split("ツ").join("")
  );
};

export { transformName };
