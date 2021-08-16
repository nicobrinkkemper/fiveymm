import "./Batch.css";
import React from "react";
import Card from "Card";
import { getLevelData, releaseDays } from "levelData";
import { useParams } from "react-router-dom";
import { lowerCase } from "lodash";
import Stars from "Stars";
import { levelPath } from "levelPath";
import Seo from "Seo";
import { DEFAULT_TITLE } from "./constants";
const Batch = () => {
  const { batchNumber } = useParams<Record<"batchNumber", string>>();
  const releaseDay = releaseDays[Number(batchNumber) - 1];
  const levelData = getLevelData();
  const classList = ["Batch"];
  const isNew = levelData.newestBatch === Number(batchNumber) - 1;
  const batchLevels = levelData.levels(Number(batchNumber));
  const isUnreleased = levelData.releasedBatches.indexOf(releaseDay) === -1;
  if (isNew) classList.push("isNew");
  if (isUnreleased) return <span>...</span>;
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
                description={`This week released at ${releaseDay.toDateString()}. 8 awesome levels for you to play!`}
                title={`${DEFAULT_TITLE} Week ${batchNumber}`}
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
