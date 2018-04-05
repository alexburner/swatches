import { ScaleLinear } from 'd3-scale'
import { times } from 'lodash'
import * as React from 'react'

import { getIndexScale } from 'src/scales'

interface Props {
  colorCount: number
  colorCountMin: number
  colorScale: ScaleLinear<number, string>
}

export default ({
  colorCount,
  colorCountMin,
  colorScale,
}: Props): JSX.Element => {
  const indexScale = getIndexScale(Math.max(colorCount, colorCountMin))
  const colors = times(colorCount, i => colorScale(indexScale(i)))
  return (
    <div className="swatch">
      {colors.map((color, i) => (
        <div key={i} className="color" style={{ backgroundColor: color }} />
      ))}
    </div>
  )
}
