import memoizeOne from "memoize-one";
import data from "./data/5YMM Master Spreadsheet - Sheet1.json";

/**
 * BATCH 1 = "15 Aug 2021 15:00:00 GMT"
 * BATCH 2 = "22 Aug 2021 15:00:00 GMT"
 * BATCH 3 = "29 Aug 2021 15:00:00 GMT"
 * BATCH 4 = "5 Sep 2021 15:00:00 GMT"
 * BATCH 5 = "12 Sep 2021 15:00:00 GMT"
 * BATCH 6 = "19 Sep 2021 15:00:00 GMT"
 * BATCH 7 = "26 Sep 2021 15:00:00 GMT"
 */
const startDateString = "15 Aug 2021 15:00:00 GMT";
export const startDate = new Date(Date.parse(startDateString));
export const releaseDays = [
  startDate,
  new Date(Date.parse("22 Aug 2021 15:00:00 GMT")),
  new Date(Date.parse("29 Aug 2021 15:00:00 GMT")),
  new Date(Date.parse("5 Sep 2021 15:00:00 GMT")),
  new Date(Date.parse("12 Sep 2021 15:00:00 GMT")),
  new Date(Date.parse("19 Sep 2021 15:00:00 GMT")),
  new Date(Date.parse("26 Sep 2021 15:00:00 GMT")),
  new Date(Date.parse("3 Oct 2021 15:00:00 GMT")),
  new Date(Date.parse("10 Oct 2021 15:00:00 GMT"))
];

// add any field here from the csv headers to make it a valid level value
export type levelRows = string[][];
export type level = {
  order: number;
  batchNumber: number;
  levelName: string;
  description: string;
  makerDescription: string;
  makerName: string;
  makerId: string;
  nationality: string;
  difficulty: number;
  tags: string;
  levelCode: string;
  batchLength?: number;
  batchIndex?: number;
};
type levelData = {
  level: (order: number) => level;
  levels: (batchNumber: number) => level[];
  batch: (batchNumber: number) => string[][];
  releasedBatches: Date[];
  newestBatch: number;
};
/** this is just a copy of the first row of the CSV. If you see "CSV HAS CHANGED" error, you probably need to change this enum */
//order,batchNumber,levelName,makerName,discordName,makerId,briefDescription,progress,difficultyName,gameStyle,mainTheme,subTheme,clearCondition,averageClearTime,description,makerDescription,difficulty,tags,nationality,levelCode,5YMMor6YMM

enum csvHeaders {
  "order",
  "batchNumber",
  "levelName",
  "makerName",
  "discordName",
  "makerId",
  "briefDescription",
  "progress",
  "difficultyName",
  "gameStyle",
  "mainTheme",
  "subTheme",
  "clearCondition",
  "averageClearTime",
  "description",
  "makerDescription",
  "difficulty",
  "tags",
  "nationality",
  "levelCode",
  "5YMMor6YMM"
}
const createLevel = (levelRow: string[], index?: number, arr?: string[][]) => ({
  order: Number(levelRow[csvHeaders["order"]]),
  batchNumber: Number(levelRow[csvHeaders["batchNumber"]]),
  levelName: String(levelRow[csvHeaders["levelName"]]),
  description: String(levelRow[csvHeaders["description"]]),
  makerDescription: String(levelRow[csvHeaders["makerDescription"]]),
  makerName: String(levelRow[csvHeaders["makerName"]]),
  makerId: String(levelRow[csvHeaders["makerId"]]),
  nationality: String(levelRow[csvHeaders["nationality"]]),
  difficulty: Number(levelRow[csvHeaders["difficulty"]]),
  tags: String(levelRow[csvHeaders["tags"]]),
  levelCode: String(levelRow[csvHeaders["levelCode"]]),
  batchLength: Array.isArray(arr) ? levelRow.length : undefined,
  batchIndex: typeof index === "number" ? index : undefined
});
export const isReleased = (releaseDay: Date) =>
  releaseDay.getTime() <= Date.now(); //

// utility function for components to use
const createBatchFinder = (levelRows: string[][]) => (batchNumber: number) => {
  if (typeof batchNumber !== "number")
    throw new TypeError(
      `batchNumber should be typeof number, got ${typeof batchNumber}`
    );
  return levelRows.filter(
    level => Number(level[csvHeaders["batchNumber"]]) === batchNumber
  );
};
const createLevelFinder = (levelRows: string[][]) => (order: number) => {
  if (typeof order !== "number")
    throw new TypeError(`order should be typeof number, got ${typeof order}`);
  return createLevel(
    levelRows.find(level => Number(level[csvHeaders["order"]]) === order) || []
  );
};
const createBatchLevelFinder =
  (createBatch: ReturnType<typeof createBatchFinder>) =>
  (batchNumber: number) => {
    if (typeof batchNumber !== "number")
      throw new TypeError(
        `batchNumber should be typeof number, got ${typeof batchNumber}`
      );
    return createBatch(batchNumber).map(createLevel);
  };

export const useLevelData = memoizeOne(() => {
  const [header, ...levelRows] = data as [
    keyof typeof csvHeaders,
    ...string[][]
  ];
  // here we do a check if all headers are still correct
  let i = 0;
  for (const head of header) {
    const v = csvHeaders[head as keyof typeof csvHeaders];
    if (!(typeof v === "number" && i === v)) {
      console.log(data);
      throw new Error(`CSV HAS CHANGED: stopped at ${v}`);
    }
    i++;
  }
  const releasedBatches = releaseDays.filter(isReleased);
  const newestBatch = releaseDays.indexOf(
    releasedBatches.sort((a, b) => {
      return Date.now() - a.getTime() - (Date.now() - b.getTime());
    })[0]
  );
  const batch = createBatchFinder(levelRows);
  const level = createLevelFinder(levelRows);
  const levels = createBatchLevelFinder(batch);
  return {
    level,
    levels,
    batch,
    releasedBatches,
    newestBatch
  } as levelData;
});
