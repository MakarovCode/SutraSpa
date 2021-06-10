import React from 'react'
import PropTypes from 'prop-types'

class Input extends React.Component {

  render () {
    return (
      <div className="input-field col s12">
        <i className="material-icons prefix">keyboard_arrow_right</i>
        <input
          id={this.props.field.name}
          key={this.props.field.name}
          type={this.props.field.type}
          value={this.props.field.value}
          onChange={event => this.props.onChange(event, this.props.field)}
          required={this.props.field.required}
        />
        <label
          for={this.props.field.name}
          className={`${this.props.field.value ? 'active' : ''}`}
          >
          {this.props.field.placeholder}
        </label>
      </div>
    )
  }
}

export default Input;
