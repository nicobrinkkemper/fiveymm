import "./Batch.css";
import React from "react";
import Card from "Card";
import { useLevelData, releaseDays } from "useLevelData";
import { useParams } from "react-router-dom";
import { lowerCase } from "lodash";
import Stars from "Stars";
import { levelPath } from "levelPath";
import Seo from "Seo";
import { DEFAULT_TITLE } from "./constants";
import { humanReadableArray } from "humanReadableArray";
const Batch = () => {
  const { batchNumber } = useParams<Record<"batchNumber", string>>();
  const releaseDay = releaseDays[Number(batchNumber) - 1];
  const {newestBatch, releasedBatches, levels} = useLevelData();
  const classList = ["Batch"];
  const isNew = newestBatch === Number(batchNumber) - 1;
  const batchLevels = levels(Number(batchNumber));
  const isUnreleased = releasedBatches.indexOf(releaseDay) === -1;
  batchLevels.map(({levelName})=>levelName).join(', ')
  if (isNew) classList.push("isNew");
  if (isUnreleased) return <span>...</span>;
  const levelNames = batchLevels.map(({levelName})=>levelName);
  return (
    // keep this wrapper for react-snap weirdness
    <>
      <div className="Batch">
        <h1>
          {new Intl.DateTimeFormat("en-US", {
            month: "long",
            day: "numeric"
          }).format(releaseDay)}
        </h1>
        {batchLevels.map((level, i) => {
          const tags = level.tags.split(",");
          return (
            <Card key={String(i)} to={`/level/${batchNumber}/${level.order}`}>
              <div className={"LevelCard"}>
                <picture className="levelPictureSmall">
                  <source
                    srcSet={`
                  /${levelPath(level.levelName, 960)},
                  /${levelPath(level.levelName, 1280)} 2x,
                  /${levelPath(level.levelName, 1920)} 3x`}
                  />
                  <img
                    src={`/${levelPath(level.levelName)}`}
                    alt={`Screenshot: ${level.levelName}`}
                  />
                </picture>
                <div className="info">
                  <div className="makerInfo">
                    <span className={"levelName"}>{level.levelName}</span>
                    <div className={"makerName"}>
                      <span
                        className={`nationality flag-icon flag-icon-${lowerCase(
                          level.nationality
                        )}`}
                      />
                      <span className="name">{level.makerName}</span>
                    </div>
                  </div>
                  <div className="levelInfo">
                    <div className={"tags"}>
                      {tags.map((tag, i) => (
                        <span className="tag" key={i.toString()}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className={`difficulty`}>
                      <span>Difficulty: </span>
                      <span className={`stars stars-${level.difficulty}`}>
                        <Stars value={level.difficulty} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <Seo
                description={`Week ${batchNumber} of 5YMM has started! In this week's trailer we show off eight new levels: ${humanReadableArray(levelNames)}. Celebrating Five years of MarioMaker! Week ${batchNumber} released at ${releaseDay.toDateString()}.`}
                title={`${DEFAULT_TITLE} | Week ${batchNumber}`}
              />
            </Card>
          );
        })}
      </div>
    </>
  );
};
export { Batch };
export default Batch;
