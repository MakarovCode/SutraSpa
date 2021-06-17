import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';
import Form from "./Form"
import Details from "./Details"

class User extends React.Component {

  state = {
    id: this.props.data.id,
    editing: false
  }

  apiMethod = this.props.data.api_method

  setEditing = () => {
    this.setState({
      id: this.props.data.id,
      editing: !this.state.editing
    });
  }

  onChange = (event) => {
    console.log(event.target.value);
    this.setState({
      id: this.props.data.id,
      editing: event.target.value == "on" ? true : false
    })
  }

  render () {
    return (
      <div>
        {this.state.editing ? (
          <Form
            fields={this.props.data.form_fields}
            apiMethod={this.apiMethod}
            setEditing={this.setEditing}
            />
        ) : (
          <Details
            fields={this.props.data.form_fields}
            setEditing={this.setEditing}
            />
        )}
      </div>
    )
  }
}

User.propTypes = {
  data: PropTypes.object.isRequired, // Optional
};

export default User;
