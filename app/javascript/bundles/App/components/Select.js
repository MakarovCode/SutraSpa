import React from 'react'
import PropTypes from 'prop-types'

class Select extends React.Component {

  state = {
    matInstance: null
  }

  componentDidMount() {
    const elems = document.getElementById(this.props.matId);
    this.setState({
      matInstance: M.FormSelect.init(elems)
    })
  }

  onChange = (event) => {
    const ids = this.state.matInstance.getSelectedValues();
    this.props.onChange(ids);
  }

  render () {
    return (
      <div className="input-field col s12" style={{marginTop: "40px"}}>
        <select
          id={this.props.matId}
          multiple
          onChange={event => this.onChange(event)}>
          {this.props.collection.map(option => {
            return(
              option.selected ? (
                <option
                  selected
                  key={option.id}
                  value={option.id}
                  >
                  {option.name}
                </option>
              ) : (
                <option
                  key={option.id}
                  value={option.id}
                  >
                  {option.name}
                </option>
              )
            )
          })}
        </select>
        <label>Your {this.props.collectionName}</label>
      </div>
    )
  }
}

export default Select;
