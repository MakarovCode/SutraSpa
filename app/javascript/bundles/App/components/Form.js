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

	onSave = async () => {
    const params = {
      user: {
        username: this.props.fields.username.value,
        first_name: this.props.fields.first_name.value,
        last_name: this.props.fields.last_name.value,
        phone: this.props.fields.phone.value,
        email: this.props.fields.email.value,
        bio: this.props.fields.bio.value,
        bg_color: this.props.fields.bg_color.value,
      }
    }
    await axios.put(`${this.props.apiMethod}.json`, params)
    .then(res => {
      M.toast({html: res.data.message});
      this.props.setEditing();
    })
    .catch((error) => {
      M.toast({html: error.response.data.message});
    });

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
								key={`input-${field.name}`}
								onChange={this.onChange}
								field={field}
								/>
						) : (
							field.type === "textarea" ? (
								<TextArea
									key={`textarea-${field.name}`}
									onChange={this.onChange}
									field={field}
									/>
							) : (
								<div></div>
							)
						)
					)}
					<button
            style={{marginTop: "40px"}}
            className="btn waves-effect waves-light"
            type="button"
            onClick={event => this.onSave()}
            >
            Save Profile
            <i className="material-icons right">save</i>
          </button>
				</form>
			</div>
		);
	}

}

Form.propTypes = {
	fields: PropTypes.object.isRequired,
};

export default Form;
