import * as React from 'react'
import { ColorResult, PhotoshopPicker } from 'react-color'

import { State as AppState } from 'src/App'
import { Interpolators } from 'src/scales'

interface State {
  popoverColors: {
    background?: string | undefined
    [i: number]: string | undefined
  }
}

interface Props {
  appState: AppState
  onChange: (newState: AppState) => void
}

export default class Controls extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { popoverColors: {} }
  }

  public render(): JSX.Element {
    return (
      <div className="controls">
        <h5>Background Color</h5>
        {this.getPicker(
          'background',
          this.props.appState.backgroundColor,
          (newColor: string) =>
            this.props.onChange({
              ...this.props.appState,
              backgroundColor: newColor,
            }),
        )}

        <h5>Seed Colors</h5>
        {this.props.appState.paletteColors.map((color, i) =>
          this.getPicker(i, color, (newColor: string) =>
            this.props.onChange({
              ...this.props.appState,
              paletteColors: this.props.appState.paletteColors.map(
                (oldColor, oldI) => (i === oldI ? newColor : oldColor),
              ),
            }),
          ),
        )}
        <div className="add-button" onClick={this.addPaletteColor}>
          {'\u002B'}
        </div>

        <h5>Minimum Colors</h5>
        <input
          type="number"
          value={Number(this.props.appState.paletteCountMin)}
          onChange={e =>
            this.props.onChange({
              ...this.props.appState,
              paletteCountMin: Number(e.target.value),
            })
          }
        />

        <h5>Color Space</h5>
        <select
          value={this.props.appState.paletteInterpolator}
          onChange={e =>
            this.props.onChange({
              ...this.props.appState,
              paletteInterpolator: e.target.value as Interpolators,
            })
          }
        >
          {Object.keys(Interpolators).map(interpolatorKey => (
            <option
              key={interpolatorKey}
              value={Interpolators[interpolatorKey as any]}
            >
              {interpolatorKey}
            </option>
          ))}
        </select>

        <h5>More info</h5>
        <div className="references">
          <a
            href="https://github.com/d3/d3-scale#continuous-scales"
            target="_blank"
          >
            d3-scale
          </a>
          <a
            href="https://github.com/d3/d3-interpolate#color-spaces"
            target="_blank"
          >
            d3-interpolate
          </a>
        </div>
      </div>
    )
  }

  public componentDidUpdate(prevProps: Props): void {
    const prevLength = prevProps.appState.paletteColors.length
    const currLength = this.props.appState.paletteColors.length
    if (currLength > prevLength) {
      const lastIndex = currLength - 1
      this.setState({
        popoverColors: {
          ...this.state.popoverColors,
          [lastIndex]: this.props.appState.paletteColors[lastIndex],
        },
      })
    }
  }

  private getPicker(
    name: 'background' | number,
    color: string,
    onChange: (newColor: string) => void,
  ): JSX.Element {
    const hidePopover = () => {
      this.setState({
        popoverColors: {
          ...this.state.popoverColors,
          [name]: undefined,
        },
      })
    }

    const showPopover = () =>
      this.setState({
        popoverColors: {
          ...this.state.popoverColors,
          [name]: color,
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
                className="remove-button"
                onClick={() => this.removePaletteColor(name)}
              >
                {'\u00D7'}
              </div>
            )}
        </div>
        {this.state.popoverColors[name] && (
          <div className="popover">
            <div className="cover" onClick={hidePopover} />
            <PhotoshopPicker
              color={color}
              onChange={(result: ColorResult) => onChange(result.hex)}
              onAccept={hidePopover}
              onCancel={() => {
                onChange(this.state.popoverColors[name] as string)
                hidePopover()
              }}
            />
          </div>
        )}
      </div>
    )
  }

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
