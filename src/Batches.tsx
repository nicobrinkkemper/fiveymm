import React from 'react'

import Card from 'Card';
import './Batches.css';
import { getLevelData, releaseDays } from 'levelData';


function Batches() {
  const levelData = getLevelData()
  return (
    <div className="Batches">
      {releaseDays.map((releaseDay, i) => {
        const classList = ["Batch"];
        const isNew = levelData.newestBatch === i
        const isUnreleased = levelData.releasedBatches.indexOf(releaseDay) === -1
        if (isNew) classList.push('isNew')
        else if (isUnreleased) classList.push('isUnreleased')
        return (<Card key={String(i)} disabled={isUnreleased} to={`/levels/${i+1}`}>
            <div className={classList.join(' ')}>
              <span className="batchNumber">{i + 1}</span>
              <div className="releaseInfo">
                <span className="releaseDay">{new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' }).format(releaseDay)}</span>
                <span className="batchLevelAmount">{levelData.batch(i+1).length} levels</span>
              </div>
              {isNew ? <span className="new">New</span> : null}
              {isUnreleased ? <span className="unreleased">Unreleased</span> : null}
            </div>
        </Card>
        )
      })}
    </div>
  )
}
export {Batches}
export default Batches;