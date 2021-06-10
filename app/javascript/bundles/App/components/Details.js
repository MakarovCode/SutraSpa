import React, { useState } from 'react';
import PropTypes from 'prop-types'

class Details extends React.Component {

	state = {
		fields: this.props.fields
	}

	render() {
		return (
			<div className="row">
				<div className="col s12">
					<div className="card" style={{border: `5px solid ${this.props.fields.bg_color.value}`}}>
						<div className="card-image">
							<img src={this.props.fields.photo.value} />
							<span className="card-title" style={{color: `${this.props.fields.bg_color.value}`}}>
								{this.props.fields.username.value}
							</span>
							<a className="btn-floating halfway-fab waves-effect waves-light" onClick={event => this.props.setEditing()}>
								<i className="material-icons">edit</i>
							</a>
						</div>
						<div className="card-content">
							<p>
								<strong>First Name:</strong>	{this.props.fields.first_name.value}
							</p>
							<p>
								<strong>Last Name:</strong>	{this.props.fields.last_name.value}
							</p>
							<p>
								<strong>Email:</strong>	{this.props.fields.email.value}
							</p>
							<p>
								<strong>Phone:</strong>	{this.props.fields.phone.value}
							</p>
							<p>
								<strong>Bio:</strong>	{this.props.fields.bio.value}
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Details.propTypes = {
	fields: PropTypes.object.isRequired,
};

export default Details;
