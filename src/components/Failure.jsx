import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

import TopNavbar from './Navbar';
import '../img/App.css';

class Failure extends Component {

  backHome() {
    browserHistory.replace('/welcome');
  }

  backSign() {
    browserHistory.replace('/signup');
  }

  render() {
    return (
      <div className="App">
        <TopNavbar />
        <div className="form-inline" style={{margin: '5px'}}>
          <div className="successTitle">Signup/signin failed, some of the informations you gave are not valid.</div>
          <div className="form-group">
          <div style={{textAlign: 'center'}}>
            <button
              className="btn log-btn"
              type="button"
              onClick={() => this.backHome()}
              ><Link to={'/welcome'}>Back to Home Page</Link>
            </button>
            <button
              className="btn log-btn"
              type="button"
              onClick={() => this.backSign()}
              ><Link to={'/signup'}>Back to SignUp</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default Failure;
