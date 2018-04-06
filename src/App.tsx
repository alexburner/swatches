import { isEqual } from 'lodash'
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

const INIT_STATE: State = {
  backgroundColor: '#333333',
  paletteColors: ['#5b9bb0', '#f8c979', '#bc7cae'],
  paletteCountMin: 1,
  paletteInterpolator: Interpolators.Hcl,
}

export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = getUrlState() || INIT_STATE
  }

  public render() {
    document.location.hash = getStateUrl(this.state)
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

  public componentDidMount() {
    window.addEventListener('hashchange', this.onHashChange)
  }

  public componentWillUnmount() {
    window.removeEventListener('hashchange', this.onHashChange)
  }

  private onControlsChange = (newState: State) => this.setState(newState)

  private onHashChange = () => {
    const urlState = getUrlState()
    if (!isEqual(urlState, this.state)) {
      this.setState(urlState || INIT_STATE)
    }
  }
}

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

const getUrlState = (): State | null => {
  const urlState = qs.parse(document.location.hash.slice(2))
  return isState(urlState) ? urlState : null
}

const getStateUrl = (state: State): string => '#/' + qs.stringify(state)
