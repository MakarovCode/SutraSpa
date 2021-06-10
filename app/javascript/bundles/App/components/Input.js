import React from 'react'
import PropTypes from 'prop-types'

class Input extends React.Component {

  render () {
    return (
      <input key={this.props.field.name} type={this.props.field.type}
        placeholder={this.props.field.placeholder}
        value={this.props.field.value}
        onChange={event => this.props.onChange(event, this.props.field)}
        required={this.props.field.required}
      />
    )
  }
}

export default Input;
