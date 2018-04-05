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
}

interface Props {}

export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    const urlState = qs.parse(document.location.hash.slice(2))
    this.state = Object.keys(urlState).length
      ? urlState
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
        }
  }

  public render() {
    document.location.hash = '/' + qs.stringify(this.state)
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
        />
      </div>
    )
  }

  private onControlsChange = (newState: State) => this.setState(newState)
}
