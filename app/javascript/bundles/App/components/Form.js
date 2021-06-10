import React, { useState } from 'react';
import PropTypes from 'prop-types'
import axios from 'axios';
import Input from "./Input"
import TextArea from "./TextArea"

class Form extends React.Component {

	state = {
		fields: this.props.fields
	}

	handleSubmit = async (event) => {
    event.preventDefault();

		const res = await axios.post(`${this.props.apiMethod}`, {user: this.state.fields});
		console.log(res);
		this.props.onCreateCallback(res.requisition.id);
  }

	onChange = (event, field) => {
		field.value = event.target.value;
		this.setState({
			fields: {...this.props.fields}
		})
	}

	render() {
  	return (
			<div>
				<form onSubmit={this.handleSubmit}>
					{Object.values(this.props.fields).map(field =>
						field.type !== "textarea" ? (
							<Input
								key={field.name}
								onChange={this.onChange}
								field={field}
							/>
						) : (
							<TextArea
								key={field.name}
								onChange={this.onChange}
								field={field}
							/>
						)
					)}
					<button>Empezar</button>
				</form>
			</div>
    );
  }

}

Form.propTypes = {
  fields: PropTypes.object.isRequired,
};

export default Form;
