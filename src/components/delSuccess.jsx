import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import TopNavbar from './Navbar';
import '../img/App.css';

class delSuccess extends Component {

  backPage() {
    browserHistory.replace('/welcome');
  }

  render() {
    return (
      <div className="App">
        <TopNavbar />
        <div className="form-inline" style={{margin: '5px'}}>
          <div className="successTitle">You successfully removed your account from our Application. Hope to see you again! :) </div>
          <div style={{textAlign: 'center'}}>
            <button
            className="SignButton"
            type="button"
            onClick={() => this.backPage()}
            >Back to Home Page
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default delSuccess;
