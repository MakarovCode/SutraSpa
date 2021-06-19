import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';
import Interest from './Interest';

class Interests extends React.Component {

  state = {
    interests: []
  }

  componentDidMount() {
    this.onFetch()
  }

  onFetch = () => {
    axios.get(`/api/v1/interests.json?user_id=${this.props.userId}`)
    .then(res => {
      this.setState({
        interests: res.data
      })
    })
    .catch((error) => {
    });
  }

  onSave = (interest) => {
    
    const params = {
      user_id: this.props.userId,
      selected: interest.selected,
      objects:  interest.objects.filter(obj => obj.selected)
    }

    axios.put(`/api/v1/interests/${interest.id}.json`, params)
    .then(res => {
      M.toast({html: res.data.message})
    })
    .catch((error) => {
      M.toast({html: error.response.data.message});
    });
  }

  render () {
    return (
      <>
        <div className="row">
        {this.state.interests.map(interest => {
          return (
            <div className="input-field col s12" key={`div-interest-${interest.id}`}>
              <Interest key={interest.id}
                interest={interest}
                onInterestUpdated={this.onSave}
                />
            </div>
          )
        })}
        </div>
        <div className="row">
          <button
            style={{marginTop: "40px"}}
            className="btn waves-effect waves-light"
            type="button"
            onClick={event => this.props.setEditing()}
            >
            Back
            <i className="material-icons left">arrow_back</i>
          </button>
        </div>
      </>
    )
  }
}

export default Interests;
