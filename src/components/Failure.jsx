import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import TopNavbar from './Navbar';
import '../img/App.css';

class Failure extends Component {

  changePage(page) {
    browserHistory.replace(page);
  }

  render() {
    return (
      <div className="App">
        <TopNavbar />
        <div className="form-inline">
          <div className="successTitle">Signup/signin failed, some of the informations you gave are not valid.</div>
          <div className="form-group">
          <div style={{textAlign: 'center'}}>
            <button
              className="SignButton"
              type="button"
              onClick={() => this.changePage("welcome")}
              >Back to Home Page
            </button>
            <button
              className="SignButton"
              type="button"
              onClick={() => this.changePage("signup")}
              >Back to SignUp
            </button>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default Failure;
