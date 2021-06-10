import React, { useState } from 'react';
import PropTypes from 'prop-types'
import axios from 'axios';
import Input from "./Input"
import TextArea from "./TextArea"
import Uploady, { useItemProgressListener, useItemFinishListener } from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";

const LogProgress = (props) => {

	const [progress, setProgress] = useState(0);

	useItemProgressListener((item) => {
		console.log(`>>>>> (hook) File ${item.file.name} completed: ${item.completed} progress: ${item}`);
		setProgress(item.completed);
	});
	useItemFinishListener((item) => {
		console.log(`item ${item.id} finished uploading, response was: `, item.uploadResponse, item.uploadStatus);
		props.onUploadCallback({target: {value: item.uploadResponse.data.url}}, props.field);
		M.toast({html: item.uploadResponse.data.message})
	});

	return (
		<div className="progress">
      <div className="determinate" style={{width: `${progress}%`}}></div>
  	</div>
	);
}

class Form extends React.Component {

	state = {
		fields: this.props.fields
	}

	handleSubmit = async (event) => {
		event.preventDefault();
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
					<ul className="collection">
					  <li className="collection-item avatar">
							<img
								src={this.props.fields.photo.value}
								className="circle"
								/>
							<br />
							<Uploady
								destination={{ url: `${this.props.apiMethod}/upload_photo.json` }}>
								<LogProgress
									onUploadCallback={this.onChange}
									field={this.props.fields.photo}
									/>
								<UploadButton/>
							</Uploady>
					  </li>
					</ul>
					{Object.values(this.props.fields).map(field =>
						field.type !== "textarea" && field.type !== "file" ? (
							<Input
								key={field.name}
								onChange={this.onChange}
								field={field}
								/>
						) : (
							field.type === "textarea" ? (
								<TextArea
									key={field.name}
									onChange={this.onChange}
									field={field}
									/>
							) : (
								<div></div>
							)
						)
					)}
				</form>
			</div>
		);
	}

}

Form.propTypes = {
	fields: PropTypes.object.isRequired,
};

export default Form;
