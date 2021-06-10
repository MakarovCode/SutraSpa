import React from 'react'
import PropTypes from 'prop-types'

class TextArea extends React.Component {

  render () {
    return (
      <textarea key={this.props.field.name}
        placeholder={this.props.field.placeholder}
        onChange={event => this.props.onChange(event, this.props.field)}
        required={this.props.field.required}
      >
        {this.props.field.value}
      </textarea>
    )
  }
}

export default TextArea;
