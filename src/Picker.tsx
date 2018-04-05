import React from 'react'
import { ColorResult, PhotoshopPicker } from 'react-color'

interface Props {
  showPopover: boolean
  originalColor?: string
  currentColor: string
  onChange: (color: string) => void
  onShow: (color: string) => void
  onHide: () => void
  onRemove?: () => void
}

interface State {}

export default class Picker extends React.Component<Props, State> {
  public render(): JSX.Element {
    return (
      <div className="picker">
        <div className="preview">
          <div
            className="color"
            style={{ backgroundColor: this.props.currentColor }}
            onClick={() => this.props.onShow(this.props.currentColor)}
          />
          <div className="text">{this.props.currentColor}</div>
          {this.props.onRemove && (
            <div
              className="remove-button"
              onClick={() => this.props.onRemove!()}
            >
              {'\u00D7'}
            </div>
          )}
        </div>
        {this.props.showPopover && (
          <div className="popover" onKeyDown={e => console.log(e)}>
            <div className="cover" onClick={() => this.props.onHide()} />
            <PhotoshopPicker
              color={this.props.currentColor}
              onChange={(result: ColorResult) =>
                this.props.onChange(result.hex)
              }
              onAccept={() => this.props.onHide()}
              onCancel={() => this.onCancel()}
            />
          </div>
        )}
      </div>
    )
  }

  public componentDidMount(): void {
    window.addEventListener('keydown', this.onKeydown)
  }

  public componentWillUnmount(): void {
    window.removeEventListener('keydown', this.onKeydown)
  }

  private onCancel = (): void => {
    this.props.onChange(this.props.originalColor!)
    this.props.onHide()
  }

  private onKeydown = (e: KeyboardEvent) => {
    if (!this.props.showPopover) return
    switch (e.key) {
      case 'Enter':
        e.preventDefault()
        this.props.onHide()
        break
      case 'Escape':
        e.preventDefault()
        this.onCancel()
        break
    }
  }
}
