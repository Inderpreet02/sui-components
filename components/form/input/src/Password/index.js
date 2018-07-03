import React from 'react'
import PropTypes from 'prop-types'
import Input from '../Input'

import './index.scss'

const TEXT = 'text'
const PASSWORD = 'password'
const DEFAULT_HIDE = 'hide'
const DEFAULT_SHOW = 'show'

const PasswordHoC = WrappedInput =>
  class Password extends React.Component {
    static propTypes = {
      /* Text to be shown in order to show the password on click */
      showText: PropTypes.string,
      /* Text to be shown in order to hide the password on click */
      hideText: PropTypes.string,
      /* Event launched on every input change */
      onChange: PropTypes.func,
      /* The name of the control */
      name: PropTypes.string,
      /* The id of the control */
      id: PropTypes.string
    }

    static defaultProps = {
      showText: DEFAULT_SHOW,
      hideText: DEFAULT_HIDE
    }

    state = {
      type: PASSWORD,
      value: ''
    }

    toggle = () => {
      const {type} = this.state
      const inputType = type === PASSWORD ? TEXT : PASSWORD

      this.setState({type: inputType})
    }

    onChange = ev => {
      const value = ev.target.value
      this.setState({value}, () => {
        const {onChange} = this.props
        onChange && onChange({value})
      })
    }

    render() {
      const {showText, hideText, ...props} = this.props
      const {type, value} = this.state

      return (
        <div className="sui-FormInput-password">
          <WrappedInput
            className="sui-FormInput-password--input"
            {...props}
            onChange={this.onChange}
            value={value}
            type={type}
          />
          <div
            onClick={this.toggle}
            className="sui-FormInput-password--toggleButton"
          >
            {type === PASSWORD ? showText : hideText}
          </div>
        </div>
      )
    }
  }

export default PasswordHoC(Input)
