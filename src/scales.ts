import * as d3interpolate from 'd3-interpolate'
import { scaleLinear, ScaleLinear } from 'd3-scale'
import { times } from 'lodash'

export enum Interpolators {
  Rgb = 'interpolateRgb',
  Hsl = 'interpolateHsl',
  Lab = 'interpolateLab',
  Hcl = 'interpolateHcl',
  Cubehelix = 'interpolateCubehelix',
}

// Scaling fn for mapping 0-1 to a color sequence
export const getColorScale = (
  colors: string[],
  interpolatorName: Interpolators,
  interpolatorGamma: number,
): ScaleLinear<number, string> => {
  if (colors.length < 2) throw new Error('needs more colors')
  const lastIndex = colors.length - 1
  const domain = times(colors.length, i => i / lastIndex)
  const interpolator: any = d3interpolate[interpolatorName]
  if (typeof interpolator.gamma === 'function') {
    console.log(interpolatorGamma)
    interpolator.gamma(interpolatorGamma)
  }
  return scaleLinear<number, string>()
    .domain(domain)
    .range(colors as any[])
    .interpolate(interpolator)
}

// Scaling fn for mapping indices 0-n to 0-1
export const getIndexScale = (length: number): ScaleLinear<number, number> =>
  scaleLinear()
    .domain([0, length - 1])
    .range([0, 1])
