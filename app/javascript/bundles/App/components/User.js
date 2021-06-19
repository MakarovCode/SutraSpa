import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';
import Form from "./Form"
import Details from "./Details"
import Interests from "./Interests"

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

    setTimeout(function(){
        const instance = M.Tabs.init(document.getElementById("tab"));
        // instance.select('profile');
    }, 100);
  }

  render () {
    return (
      <div className="row">
        {this.state.editing ? (
          <div className="col s12">
            <ul class="tabs" id="tab">
              <li class="tab col s3">
                <a className="active" href="#profile">Profile</a>
              </li>
              <li class="tab col s3">
                <a href="#interests">Interests</a>
              </li>
            </ul>
            <div id="profile" class="col s12">
              <Form
                fields={this.props.data.form_fields}
                apiMethod={this.apiMethod}
                setEditing={this.setEditing}
                />
            </div>
            <div id="interests" class="col s12">
              <Interests
                userId={this.props.data.id}
                setEditing={this.setEditing}
                />
            </div>
          </div>
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
