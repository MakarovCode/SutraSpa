import React from 'react'
import PropTypes from 'prop-types'
import Form from "./Form"
import Details from "./Details"

class User extends React.Component {

  state = {
		id: this.props.data.id,
    editing: false
	}

  apiMethod = this.props.data.api_method

  setEditing = (value) => {
		this.setState({
			id: this.props.data.id,
      editing: value
		})
	}

  render () {
    return (
      <div>
        {this.state.editing ? (
          <Form
            fields={this.props.data.form_fields}
            apiMethod={this.apiMethod}
            onCreateCallback={this.setEditing}
          />
        ) : (
          <Details
						fields={this.props.data.form_fields}
					/>
        )}
      </div>
    )
  }
}

RequisitionForm.propTypes = {
  data: PropTypes.object.isRequired, // Optional
};

export default User;
