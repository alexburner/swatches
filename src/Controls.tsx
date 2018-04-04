import * as React from 'react'
import { ChromePicker, ColorChangeHandler, ColorResult } from 'react-color'

import { State as AppState } from 'src/App'

interface State {
  showPopover: {
    background?: boolean
    [i: number]: boolean
  }
}

interface Props {
  appState: AppState
  onChange: (newState: AppState) => void
}

export default class Controls extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { showPopover: {} }
  }

  public render(): JSX.Element {
    return (
      <div className="controls">
        <h5>Background Color</h5>
        {this.getPicker(
          'background',
          this.props.appState.backgroundColor,
          (result: ColorResult) =>
            this.props.onChange({
              ...this.props.appState,
              backgroundColor: result.hex,
            }),
        )}
        <h5>Palette Seed Colors</h5>
        {this.props.appState.paletteColors.map((color, i) =>
          this.getPicker(i, color, (result: ColorResult) =>
            this.props.onChange({
              ...this.props.appState,
              paletteColors: this.props.appState.paletteColors.map(
                (oldColor, oldI) => (i === oldI ? result.hex : oldColor),
              ),
            }),
          ),
        )}
        <div className="simple-button" onClick={this.addPaletteColor}>
          {'\u002B'}
        </div>
        <h5>Palette Interpolator</h5>
        <h5>Min Palette Size</h5>
      </div>
    )
  }

  public componentDidUpdate(prevProps: Props): void {
    const prevLength = prevProps.appState.paletteColors.length
    const currLength = this.props.appState.paletteColors.length
    if (currLength > prevLength) {
      // A color has been added
      // open popover for it
      this.setState({
        showPopover: {
          ...this.state.showPopover,
          [currLength - 1]: true,
        },
      })
    }
  }

  private getPicker(
    name: 'background' | number,
    color: string,
    onChange: ColorChangeHandler,
  ): JSX.Element {
    const hidePopover = () =>
      this.setState({
        showPopover: {
          ...this.state.showPopover,
          [name]: false,
        },
      })
    const showPopover = () =>
      this.setState({
        showPopover: {
          ...this.state.showPopover,
          [name]: true,
        },
      })
    return (
      <div className="picker" key={name}>
        <div className="preview">
          <div
            className="color"
            style={{ backgroundColor: color }}
            onClick={showPopover}
          />
          <div className="text">{color}</div>
          {typeof name === 'number' &&
            this.props.appState.paletteColors.length > 2 && (
              <div
                className="simple-button"
                onClick={() => this.removePaletteColor(name)}
              >
                {'\u00D7'}
              </div>
            )}
        </div>
        {this.state.showPopover[name] && (
          <div className="popover">
            <div className="cover" onClick={hidePopover} />
            <ChromePicker color={color} onChange={onChange} />
          </div>
        )}
      </div>
    )
  }

  private onHidePicker = (): void =>
    this.setState({
      showPopover: {
        background: false,
        palette: {},
      },
    })

  private addPaletteColor = (): void => {
    const paletteColors = [...this.props.appState.paletteColors, '#ffffff']
    this.props.onChange({
      ...this.props.appState,
      paletteColors,
    })
  }

  private removePaletteColor = (index: number): void => {
    const paletteColors = [...this.props.appState.paletteColors]
    paletteColors.splice(index, 1)
    this.props.onChange({
      ...this.props.appState,
      paletteColors,
    })
  }
}
