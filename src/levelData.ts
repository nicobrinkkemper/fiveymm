import memoizeOne from 'memoize-one';
import data from "./data/5YMM Master Spreadsheet - Sheet1.csv"
const startDateString = '15 Aug 2021 15:00:00 GMT'
export const startDate = new Date(Date.parse(startDateString))
export const releaseDays = [
    startDate,
    new Date(Date.parse('15 Aug 2021 15:00:00 GMT')),
    new Date(Date.parse('22 Aug 2021 15:00:00 GMT')),
    new Date(Date.parse('29 Aug 2021 15:00:00 GMT')),
    new Date(Date.parse('5 Sep 2021 15:00:00 GMT')),
    new Date(Date.parse('12 Sep 2021 15:00:00 GMT')),
    new Date(Date.parse('19 Sep 2021 15:00:00 GMT')),
    new Date(Date.parse('26 Sep 2021 15:00:00 GMT')),
]

// add any field here from the csv headers to make it a valid level value
export type level = {
    order: number;
    batchNumber: number;
    levelName: string;
    description: string;
    makerDescription: string;
    makerName: string;
    nationality: string;
    difficulty: number;
    tags: string;
    levelCode: string;
    batchLength?: number;
    batchIndex?: number;
}
type levelData = {
    level: (order: number) => level;
    levels: (batchNumber: number) => level[];
    batch: (batchNumber: number) => string[][];
    releasedBatches: Date[];
    newestBatch: number;
}
enum csvHeaders {
    "order",
    "batchNumber",
    "levelName",
    "makerName",
    "discordName",
    "progress",
    "difficultyName",
    "gameStyle",
    "mainTheme",
    "subTheme",
    "briefDescription",
    "region",
    "clearCondition",
    "averageClearTime",
    "description",
    "makerDescription",
    "makerId",
    "difficulty",
    "tags",
    "nationality",
    "levelCode",
}
const createLevel = (levelRow: string[], index?: number, arr?: string[][])=>(
    {
        order:  Number(levelRow[csvHeaders['order']]),
        batchNumber: Number(levelRow[csvHeaders['batchNumber']]),
        levelName: String(levelRow[csvHeaders['levelName']]),
        description: String(levelRow[csvHeaders['description']]),
        makerDescription: String(levelRow[csvHeaders['makerDescription']]),
        makerName: String(levelRow[csvHeaders['makerName']]),
        nationality: String(levelRow[csvHeaders['nationality']]),
        difficulty: Number(levelRow[csvHeaders['difficulty']]),
        tags: String(levelRow[csvHeaders['tags']]),
        levelCode: String(levelRow[csvHeaders['levelCode']]),
        batchLength: Array.isArray(arr) ? levelRow.length : undefined,
        batchIndex: (typeof index === 'number') ? index : undefined,
    }
)
export const isReleased = (releaseDay: Date)=>releaseDay.getTime() <= Date.now() //
export const getLevelData = memoizeOne(() => {
    const [header,...levelRows] = (data as [keyof typeof csvHeaders, ...string[][]])
    // here we do a check if all headers are still correct
    let  i = 0;
    for(const head of header){
        const v = csvHeaders[head as keyof typeof csvHeaders];
        if(!(typeof v === 'number' && i === v)) throw(new Error('CSV HAS CHANGED'))
        i++
    }
    const releasedBatches = releaseDays.filter(isReleased)
    const newestBatch = releaseDays.indexOf(releasedBatches.sort((a, b) => {
        return (Date.now() - a.getTime()) - (Date.now() - b.getTime())
    })[0])
    // utility function for components to use
    const batch = (batchNumber: number)=>{
        if(typeof batchNumber !== 'number') throw(new TypeError('batchNumber should be number'))
        return levelRows.filter(level=>Number(level[csvHeaders['batchNumber']]) === batchNumber)
    }
    const level = (order: number)=>{
        if(typeof order !== 'number') throw(new TypeError('order should be number'))
        return createLevel(levelRows.find(level=>Number(level[csvHeaders['order']]) === order) || [])
    }
    const levels = (batchNumber: number)=>{
        if(typeof batchNumber !== 'number') throw(new TypeError('batchNumber should be number'))
        return batch(batchNumber).map(createLevel)
    }
    return {    
        level,
        levels,
        batch,
        releasedBatches,
        newestBatch,
    } as levelData
});