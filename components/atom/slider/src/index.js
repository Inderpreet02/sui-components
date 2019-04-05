import React, {Component} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

const BASE_CLASS = `sui-AtomSlider`
const CLASS_DISABLED = `${BASE_CLASS}--disabled`

class AtomSlider extends Component {
  state = {
    Slider: null,
    Range: null
  }

  refAtomSlider = React.createRef()

  componentDidMount() {
    require.ensure(
      [],
      require => {
        const Slider = require('rc-slider').default
        const Tooltip = require('rc-tooltip').default
        const {Range, Handle} = Slider
        const {refAtomSlider} = this

        this.handle = props => {
          const {value, index, ...restProps} = props // eslint-disable-line
          return (
            <Tooltip
              prefixCls="rc-slider-tooltip"
              overlay={value}
              placement="top"
              key={index}
              getTooltipContainer={() => refAtomSlider.current}
              visible
            >
              <Handle value={value} {...restProps} />
            </Tooltip>
          )
        }

        this.setState({
          Slider: Slider,
          Range: Range
        })
      },
      'rc-slider'
    )
  }

  handleChange = value => {
    const {onChange} = this.props
    const e = {}
    onChange(e, {value})
  }

  render() {
    const {Slider, Range} = this.state
    const {value, min, max, step, range, disabled} = this.props
    const {handle, refAtomSlider, handleChange} = this
    const numTicks = Math.round((max - min) / step) + 1
    const steps = Array.from(Array(numTicks), (x, index) => index * step)

    const customProps = {}
    if (value) customProps.defaultValue = value
    if (disabled) customProps.disabled = true
    if (handle) customProps.handle = handle

    const marks =
      step === 1
        ? {[min]: min, [max]: max}
        : steps.reduce((marksConfig, step) => {
            marksConfig[step] = step
            return marksConfig
          }, {})

    return (
      <div
        ref={refAtomSlider}
        className={cx(BASE_CLASS, {[CLASS_DISABLED]: disabled})}
      >
        {!range &&
          Slider && (
            <Slider
              min={min}
              max={max}
              step={step}
              marks={marks}
              onChange={handleChange}
              {...customProps}
            />
          )}
        {range &&
          Range && (
            <Range
              min={min}
              max={max}
              step={step}
              marks={marks}
              onChange={handleChange}
              {...customProps}
              defaultValue={[min, max]}
            />
          )}
      </div>
    )
  }
}

AtomSlider.displayName = 'AtomSlider'

AtomSlider.propTypes = {
  /** minimal value in range */
  min: PropTypes.number,

  /** minimal value in range */
  max: PropTypes.number,

  /** steps for range */
  step: PropTypes.number,

  /** range mode */
  range: PropTypes.bool,

  /** slider disabled */
  disabled: PropTypes.bool,

  /** value  */
  value: PropTypes.number,

  /* callback to be called with every update of the input value */
  onChange: PropTypes.func
}

AtomSlider.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
  onChange: () => {}
}

export default AtomSlider
