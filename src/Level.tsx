import "./Level.css";
import React from "react";
import Card from "Card";
import { useLevelData, releaseDays } from "useLevelData";
import { useParams } from "react-router-dom";
import { Stars } from "Stars";
import { Button } from "Button";
import { levelPath } from "levelPath";
import { makerPath } from "makerPath";
import Seo from "Seo";
import { DEFAULT_TITLE } from "./constants";
import { parseMarkdown } from "runtimeMarkdown";

const Level = () => {
  const { batchNumber: strBatchNumber, order: strOrder } =
    useParams<Record<"batchNumber" | "order", string>>();
  const order = Number(strOrder);
  const levelData = useLevelData();
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

  const tags = level.tags.split(",");
  const hasPreviousLevel = Number(order) > startOrder;
  const hasNextLevel = endOrder > Number(order);
  const navigationClasslist = ["navigation"];
  if (hasPreviousLevel) navigationClasslist.push("hasPreviousLevel");
  if (hasNextLevel) navigationClasslist.push("hasNextLevel");
  if (isNew) classList.push("isNew");
  if (isUnreleased) return <span>This level hasn't been released yet.</span>;

  return (
    <div className="Level">
      <Card>
        <div className="levelCard">
          <div className="info">
            <div className="makerInfo">
              <span className={"levelName"}>{level.levelName}</span>
            </div>
            <picture className="levelPicture">
              <source
                srcSet={`
                  /${levelPath(level.levelName, 960)} 2x,
                  /${levelPath(level.levelName, 1280)} 3x,
                  /${levelPath(level.levelName, 1920)} 4x`}
              />
              <img
                src={`/${levelPath(level.levelName)}`}
                alt={`Screenshot: ${level.levelName}`}
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
            <p className="description">{parseMarkdown(level.description)}</p>
          </div>
        </div>
      </Card>
      <Card>
        <div className="makerCard">
          <div className="info">
            <picture className="miiPicture">
              <source srcSet={`/${makerPath(level.makerName, 500)} 2x`} />
              <img
                src={makerPath(level.makerName)}
                alt={`${level.makerName} Mii`}
              />
            </picture>
            <div className={"makerName"}>
              <span
                className={`nationality flag-icon flag-icon-${level.nationality.toLowerCase()}`}
              />
              <span className="name">{level.makerName}</span>
              <span className="makerId">{level.makerId}</span>
            </div>
            <p className="makerDescription" style={{ whiteSpace: "pre-line" }}>
              {parseMarkdown(level.makerDescription)}
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
      <Seo
        description={`${DEFAULT_TITLE} level by ${level.makerName}: ${level.levelName} - ${level.levelCode}`}
        title={`${level.levelName} | ${level.levelCode} | ${DEFAULT_TITLE}`}
        image={`${levelPath(level.levelName)}`} // do not prepend '/'
        twitter="summary_large_image"
      />
    </div>
  );
};
export { Level };
export default Level;
