import * as React from 'react'

import { last } from 'lodash'
import { State as AppState } from 'src/App'
import Picker from 'src/Picker'
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
        <Picker
          originalColor={this.state.popoverColors.background}
          currentColor={this.props.appState.backgroundColor}
          onShow={this.getOnShow('background')}
          onHide={this.getOnHide('background')}
          onChange={(newColor: string) =>
            this.props.onChange({
              ...this.props.appState,
              backgroundColor: newColor,
            })
          }
        />

        <h5>Seed Colors</h5>
        {this.props.appState.paletteColors.map((color, i) => (
          <Picker
            key={i}
            originalColor={this.state.popoverColors[i]}
            currentColor={this.props.appState.paletteColors[i]}
            onShow={this.getOnShow(i)}
            onHide={this.getOnHide(i)}
            onChange={(newColor: string) =>
              this.props.onChange({
                ...this.props.appState,
                paletteColors: this.props.appState.paletteColors.map(
                  (oldColor, oldI) => (i === oldI ? newColor : oldColor),
                ),
              })
            }
            onRemove={
              this.props.appState.paletteColors.length > 2
                ? this.getOnRemove(i)
                : undefined
            }
          />
        ))}
        <div className="add-button" onClick={this.addPaletteColor}>
          {'\u002B'}
        </div>

        <h5>Min Palette Size</h5>
        <input
          type="number"
          value={Math.max(1, Math.round(this.props.appState.paletteCountMin))}
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
            href="https://github.com/d3/d3-scale#continuous_interpolate"
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

  private getOnShow = (name: string | number) => (color: string) =>
    this.setState({
      popoverColors: {
        ...this.state.popoverColors,
        [name]: color,
      },
    })

  private getOnHide = (name: string | number) => () =>
    this.setState({
      popoverColors: {
        ...this.state.popoverColors,
        [name]: undefined,
      },
    })

  private getOnRemove = (name: number) => () => this.removePaletteColor(name)

  private addPaletteColor = (): void => {
    const lastColor = last(this.props.appState.paletteColors) || '#000000'
    const paletteColors = [...this.props.appState.paletteColors, lastColor]
    this.props.onChange({ ...this.props.appState, paletteColors })
  }

  private removePaletteColor = (index: number): void => {
    const paletteColors = [...this.props.appState.paletteColors]
    paletteColors.splice(index, 1)
    this.props.onChange({ ...this.props.appState, paletteColors })
  }
}
