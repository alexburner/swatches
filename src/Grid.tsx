import { times } from 'lodash'
import * as React from 'react'

import { getColorScale, Interpolators } from 'src/scales'
import Swatch from 'src/Swatch'

interface Props {
  paletteColors: string[]
  paletteCountMin: number
  paletteInterpolator: Interpolators
}

const SWATCH_COUNT = 20

export default ({
  paletteColors,
  paletteCountMin,
  paletteInterpolator,
}: Props): JSX.Element => {
  const colorScale = getColorScale(paletteColors, paletteInterpolator)
  return (
    <div className="grid">
      {times(SWATCH_COUNT, i => (
        <Swatch
          key={i}
          colorCount={i + 1}
          colorCountMin={paletteCountMin}
          colorScale={colorScale}
        />
      ))}
    </div>
  )
}
