import qs from 'qs'
import * as React from 'react'

import Controls from 'src/Controls'
import Grid from 'src/Grid'
import { Interpolators } from 'src/scales'

export interface State {
  backgroundColor: string
  paletteColors: string[]
  paletteCountMin: number
  paletteInterpolator: Interpolators
  paletteInterpolatorGamma: number
}

interface Props {}

export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    const urlParams = qs.parse(document.location.hash.slice(1))
    this.state =
      urlParams && urlParams.state
        ? urlParams.state
        : {
            backgroundColor: '#333333',
            paletteColors: [
              '#7cafc2',
              '#a1b56c',
              '#f7ca88',
              '#dc9656',
              '#ba8baf',
            ],
            paletteCountMin: 5,
            paletteInterpolator: Interpolators.Cubehelix,
            paletteInterpolatorGamma: 1,
          }
  }

  public render() {
    document.location.hash = qs.stringify({ state: this.state })
    return (
      <div
        className="app"
        style={{ backgroundColor: this.state.backgroundColor }}
      >
        <Controls appState={this.state} onChange={this.onControlsChange} />
        <Grid
          paletteColors={this.state.paletteColors}
          paletteCountMin={this.state.paletteCountMin}
          paletteInterpolator={this.state.paletteInterpolator}
          paletteInterpolatorGamma={this.state.paletteInterpolatorGamma}
        />
      </div>
    )
  }

  private onControlsChange = (newState: State) => this.setState(newState)
}
