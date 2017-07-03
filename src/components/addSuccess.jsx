import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import TopNavbar from './Navbar';
import '../img/App.css';

class addSuccess extends Component {

  backPage() {
    browserHistory.replace('/app');
  }


  render() {
    return (
      <div className="App">
        <TopNavbar />
        <div className="form-inline" style={{margin: '5px'}}>
          <div className="successTitle">You successfully added a new bike ! </div>
          <div style={{textAlign: 'center'}}>
            <button
            className="SignButton"
            type="button"
            onClick={() => this.backPage()}
            >Back to your list
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default addSuccess;
