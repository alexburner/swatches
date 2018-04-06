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

const isState = (val: any): val is State =>
  val &&
  val.backgroundColor &&
  val.backgroundColor.length &&
  val.paletteColors &&
  val.paletteColors.length &&
  val.paletteCountMin &&
  !isNaN(Number(val.paletteCountMin)) &&
  val.paletteInterpolator &&
  val.paletteInterpolator.length

export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    const urlState = qs.parse(document.location.hash.slice(2))
    this.state = isState(urlState)
      ? urlState
      : {
          backgroundColor: '#333333',
          paletteColors: ['#5b9bb0', '#f8c979', '#bc7cae'],
          paletteCountMin: 1,
          paletteInterpolator: Interpolators.Hcl,
        }
  }

  public render() {
    document.location.replace('#/' + qs.stringify(this.state))
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
