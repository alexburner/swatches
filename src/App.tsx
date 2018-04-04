import * as React from 'react'
import Grid from 'src/Grid'

interface State {
  backgroundColor: string
  paletteColors: string[]
  paletteCountMin: number
}

interface Props {}

export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      backgroundColor: '#333',
      paletteColors: [
        '#7cafc2',
        '#86c1b9',
        '#a1b56c',
        '#f7ca88',
        '#dc9656',
        '#ba8baf',
      ],
      paletteCountMin: 5,
    }
  }

  public render() {
    return (
      <div
        className="app"
        style={{ backgroundColor: this.state.backgroundColor }}
      >
        <Grid
          paletteColors={this.state.paletteColors}
          paletteCountMin={this.state.paletteCountMin}
        />
      </div>
    )
  }
}
