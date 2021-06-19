import React from 'react'
import PropTypes from 'prop-types'
import Select from './Select';

class Interest extends React.Component {

  state = {
    interest: this.props.interest
  }

  timout_id = -1

  updateState = () =>{
    this.setState({
      interest: {...this.state.interest}
    });
  }

  markAsChecked = (event) => {
    this.state.interest.selected = event.target.checked
    this.updateState();
    this.props.onInterestUpdated(this.state.interest);
  }

  maskObjectsAsFavorited = (favorites_ids) => {
    if (this.timout_id){
      clearTimeout(this.timout_id);
    }
    this.timout_id = setTimeout(() => {
      for (let i = 0; i < this.state.interest.objects.length; i++) {
        let obj = this.state.interest.objects[i];

        obj.selected = favorites_ids.indexOf(`${obj.id}`) >= 0;
      }

      this.updateState();
      this.props.onInterestUpdated(this.state.interest);
    }, 2000);
  }

  render () {
    return (
      <div className="row">
        <div className="input-field col s12">
          <label>
            {this.state.interest.selected ? (
              <>
              <input
                type="checkbox"
                checked="checked"
                onChange={event => this.markAsChecked(event)}
                />
              </>
          ) : (
            <input
              type="checkbox"
              onClick={event => this.markAsChecked(event)}
              />
          )}
          <span>{this.state.interest.name}</span>
        </label>
      </div>
      <div className="row">
        {this.state.interest.selected ? (
          <Select
            matId={`#interest-select-${this.state.interest.id}`}
            collection={this.state.interest.objects}
            collectionName={this.state.interest.name}
            onChange={this.maskObjectsAsFavorited}
            />
        ) : (
          <div></div>
        )}
      </div>

    </div>
  )
}
}

export default Interest;
