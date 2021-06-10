import React, { useState } from 'react';
import PropTypes from 'prop-types'

class Details extends React.Component {

	state = {
		fields: this.props.fields,
		apiStores: {}
	}

	handleSubmit = async (event) => {
    event.preventDefault();

		const res = await axios.post(`${this.props.apiMethod}`, {requisition: this.state.fields});
		console.log(res);
		this.props.onCreateCallback(res.requisition.id);
  }

	onChange = (event, field) => {
		field.value = event.target.value;
		this.setState({
			fields: {...this.props.fields}
		})
	}

	getAsyncApiStore = async (api_store) => {
		if (this.state.apiStores[api_store] == null){
			const res = await axios.get(`${api_store}`);

			this.setState({
				fields: {...this.props.fields},
				apiStores: {...this.state.apiStores, [api_store]: res.data}
			})
		}
		return this.state.apiStores[api_store]
	}

	getApiStore = (api_store) => {
		return this.state.apiStores[api_store] != null ? this.state.apiStores[api_store] : [];
	}

	render() {
  	return (
			<div>
				<form onSubmit={this.handleSubmit}>
					{Object.values(this.props.fields).map(field =>
						field.type !== "select" ? (
							<Input
								key={field.name}
								onChange={this.onChange}
								field={field}
							/>
						) : (
							<Select
								key={field.name}
								getOptionsFromApi={this.getAsyncApiStore}
								getOptions={this.getApiStore}
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

export default Details;
