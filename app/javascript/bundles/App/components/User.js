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

  onSave = async () => {
    const params = {
      user: {
        username: this.props.data.form_fields.username.value,
        first_name: this.props.data.form_fields.first_name.value,
        last_name: this.props.data.form_fields.last_name.value,
        phone: this.props.data.form_fields.phone.value,
        email: this.props.data.form_fields.email.value,
        bio: this.props.data.form_fields.bio.value,
        bg_color: this.props.data.form_fields.bg_color.value,
      }
    }
    await axios.put(`${this.apiMethod}.json`, params)
    .then(res => {
      M.toast({html: res.data.message});
      this.setEditing();
    })
    .catch((error) => {
      M.toast({html: error.response.data.message});
    });

  }

  render () {
    return (
      <div>
        {this.state.editing ? (
          <Form
            fields={this.props.data.form_fields}
            onCreateCallback={this.setEditing}
            apiMethod={this.apiMethod}
            />
        ) : (
          <Details
            fields={this.props.data.form_fields}
            setEditing={this.setEditing}
            />
        )}
        {this.state.editing ? (
          <button
            style={{marginTop: "40px"}}
            className="btn waves-effect waves-light"
            type="button"
            onClick={event => this.onSave()}
            >
            Save
            <i className="material-icons right">save</i>
          </button>
        ) : (
          <div></div>
        )}
      </div>
    )
  }
}

User.propTypes = {
  data: PropTypes.object.isRequired, // Optional
};

export default User;
