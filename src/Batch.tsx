import React from 'react'

import Card from 'Card';
import './Batch.css';
import { getLevelData, releaseDays } from 'levelData';
import { useParams } from 'react-router-dom';
import { snakeCase, lowerCase } from 'lodash'
import Stars from 'Stars';
const Batch = () => {
  const { batchNumber } = useParams<Record<'batchNumber',string>>();
  const releaseDay = releaseDays[Number(batchNumber) - 1]
  const levelData = getLevelData()
  const classList = ["Batch"];
  const isNew = levelData.newestBatch === Number(batchNumber) - 1
  const batchLevels = levelData.levels(Number(batchNumber))
  const isUnreleased = levelData.releasedBatches.indexOf(releaseDay) === -1
  const transformName = (name: string) => snakeCase(name.toLowerCase())
  const levelPath = (levelName: string, width = 480) => `./levelImages/${transformName(levelName)}-${width}.png`
  if (isNew) classList.push('isNew')
  if (isUnreleased) return <span>...</span>
  return (
    <div className="Batch">
      <h1>{new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' }).format(releaseDay)}</h1>
      {batchLevels.map((level, i) => {
        const tags = level.tags.split(',');
        return <Card key={String(i)} to={`/level/${batchNumber}/${level.order}`} >
          <div className={"LevelCard"}>
            <picture>
              <source media="(min-width:2500px)"  srcSet={`
                  ${levelPath(level.levelName, 960)} 4000w`
              } />
              <img src={`./levelImages/${transformName(level.levelName)}-480.png`} style={{ height: '6.125rem', width: '6.125rem', objectFit: 'cover' }} alt="level screenshot" />
            </picture>
            <div className="info">
              <div className="makerInfo">
                <span className={"levelName"}>
                  {level.levelName}
                </span>
                <div className={"makerName"}>
                  <span className={`nationality flag-icon flag-icon-${lowerCase(level.nationality)}`} />
                  <span className="name">{level.makerName}</span>
                </div>

              </div>
              <div className="levelInfo">
                <div className={"tags"}>
                  {tags.map((tag, i) => <span className="tag" key={i.toString()}>{tag}</span>)}
                </div>
                
                <div className={`difficulty`}>
                  <span>Difficulty: </span><span className={`stars stars-${level.difficulty}`}><Stars value={level.difficulty} /></span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      })}
    </div>
  )
}
export {Batch}
export default Batch;