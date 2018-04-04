import { interpolateHcl } from 'd3-interpolate'
import { scaleLinear, ScaleLinear } from 'd3-scale'
import { times } from 'lodash'
import * as React from 'react'

import { getColorScale, Interpolators } from 'src/scales'
import Swatch from 'src/Swatch'

interface Props {
  paletteColors: string[]
  paletteCountMin: number
  paletteInterpolator: Interpolators
  paletteInterpolatorGamma: number
}

const SWATCH_COUNT = 20

export default ({
  paletteColors,
  paletteCountMin,
  paletteInterpolator,
  paletteInterpolatorGamma,
}: Props): JSX.Element => {
  const colorScale = getColorScale(
    paletteColors,
    paletteInterpolator,
    paletteInterpolatorGamma,
  )
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
