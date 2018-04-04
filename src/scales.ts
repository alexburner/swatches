import * as d3interpolat from 'd3-interpolate'
import { scaleLinear, ScaleLinear } from 'd3-scale'
import { times } from 'lodash'

// Scaling fn for mapping 0-1 to a color sequence
export const getColorScale = (
  colors: string[],
): ScaleLinear<number, string> => {
  if (colors.length < 2) throw new Error('needs more colors')
  const lastIndex = colors.length - 1
  const domain = times(colors.length, i => i / lastIndex)
  return scaleLinear<number, string>()
    .domain(domain)
    .range(colors as any[])
    .interpolate(d3interpolat.interpolateHcl as any)
}

// Scaling fn for mapping indices 0-n to 0-1
export const getIndexScale = (length: number): ScaleLinear<number, number> =>
  scaleLinear()
    .domain([0, length - 1])
    .range([0, 1])
