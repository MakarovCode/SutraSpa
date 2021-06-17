import React, { useState } from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import User from "./User"

class App extends React.Component {
  
  render () {
    return (
      <User data={this.props.data} />
    );
  }
}

App.propTypes = {
  data: PropTypes.object, // Optional
};

export default App;
