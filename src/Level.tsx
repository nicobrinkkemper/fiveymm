import React from "react";

import Card from "Card";
import "./Level.css";
import { getLevelData, releaseDays } from "levelData";
import { useParams } from "react-router-dom";
import { snakeCase, lowerCase } from "lodash";
import Stars from "Stars";
import {Button} from "Button";

const Level = () => {
  const { batchNumber: strBatchNumber, order: strOrder } = useParams<Record<'batchNumber'|'order',string>>();
  const order = Number(strOrder);
  const levelData = getLevelData();
  const batchLevels = levelData.levels(Number(strBatchNumber));
  const level = batchLevels.find(({ order: _order }) => _order === order);
  if (typeof level !== "object") return <span>There is nothing here.</span>;
  const startOrder = batchLevels[0].order;
  const endOrder = batchLevels[batchLevels.length - 1].order;
  const batchNumber = Number(level.batchNumber);
  if (Number(strBatchNumber) !== level.batchNumber)
    return <span>A problem occured. Please come back later.</span>;
  const releaseDay = releaseDays[batchNumber - 1];
  const classList = ["Level"];
  const isNew = levelData.newestBatch === batchNumber - 1;
  const isUnreleased = levelData.releasedBatches.indexOf(releaseDay) === -1;
  const transformName = (name: string) => snakeCase(name.toLowerCase());
  const levelPath = (levelName: string, width = 480) =>
    `./levelImages/${transformName(levelName)}-${width}.png`;
  const makerPath = (makerName: string, width = 500) =>
    `./makerImages/${transformName(makerName)}-${width}.png`;
  const tags = level.tags.split(",");
  const hasPreviousLevel = Number(order) > startOrder;
  const hasNextLevel = endOrder > Number(order);
  const navigationClasslist = ["navigation"];
  if (hasPreviousLevel) navigationClasslist.push("hasPreviousLevel");
  if (hasNextLevel) navigationClasslist.push("hasNextLevel");
  if (isNew) classList.push("isNew");
  if (isUnreleased) return <span>This level hasn't been released yet</span>;
  return (
    <div className="Level">
      <Card>
        <div className="levelCard">
          <div className="info">
            <div className="makerInfo">
              <span className={"levelName"}>{level.levelName}</span>
            </div>
            <picture>
              <source
                srcSet={`
                  ${levelPath(level.levelName, 480)} 480w,
                  ${levelPath(level.levelName, 960)} 960w,
                  ${levelPath(level.levelName, 1280)} 1280w,
                  ${levelPath(level.levelName, 1920)} 1920w`}
              />
              <img
                src={`./levelImages/${transformName(level.levelName)}-480.png`}
                style={{ width: "100%", objectFit: "cover" }}
                alt="level screenshot"
              />
            </picture>
            <div className="levelCode">
              {level.levelCode || "Code coming soon"}
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
            <p className="description">{level.description}</p>
          </div>
        </div>
      </Card>
      <Card>
        <div className="makerCard">
          <div className="info">
            <picture className="mii">
              <source
                srcSet={`
              ${makerPath(level.makerName, 250)} 250w,
              ${makerPath(level.makerName, 500)} 500w,
          `}
              />
              <img
                src={`./makerImages/${transformName(level.makerName)}-500.png`}
                style={{
                  height: "6.125rem",
                  width: "6.125rem",
                  objectFit: "cover",
                }}
                alt="maker's mii screenshot"
              />
            </picture>
            <div className={"makerName"}>
              <span
                className={`nationality flag-icon flag-icon-${lowerCase(
                  level.nationality
                )}`}
              />
              <span className="name">{level.makerName}</span>
            </div>
            <p className="makerDescription" style={{ whiteSpace: "pre-line" }}>
              {level.makerDescription}
            </p>
          </div>
        </div>
      </Card>
      <div className={navigationClasslist.join(" ")}>
        {hasPreviousLevel ? (
          <Button
            icon="arrow-left"
            iconPosition="left"
            to={`/level/${Number(batchNumber)}/${Number(order) - 1}`}
          ></Button>
        ) : null}
        {hasNextLevel ? (
          <Button
            icon="arrow-right"
            to={`/level/${Number(batchNumber)}/${Number(order) + 1}`}
          >
            Next level
          </Button>
        ) : null}
      </div>
    </div>
  );
}
export {Level}
export default Level;
