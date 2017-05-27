import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import TopNavbar from './Navbar';
import '../img/App.css';

class delBikeSuccess extends Component {

  backPage() {
    browserHistory.replace('/app');
  }

  render() {
    return (
      <div className="App">
        <TopNavbar />
        <div className="form-inline" style={{margin: '5px'}}>
          <div className="successTitle">You successfully removed your bike from your account ! </div>
          <div style={{textAlign: 'center'}}>
            <button
            className="btn bck-btn"
            type="button"
            onClick={() => this.backPage()}
            >Back to your bikes
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default delBikeSuccess;
