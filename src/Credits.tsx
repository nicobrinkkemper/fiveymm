import React from 'react'

import './Credits.css';
import { importMDX } from 'mdx.macro';

const CreditsContent = importMDX.sync('./data/Credits.mdx')
const Credits = () => {
  return (
    <div className="Credits">
        <CreditsContent />
    </div>
  )
}
export {Credits}
export default Credits;