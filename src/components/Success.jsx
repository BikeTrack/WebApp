import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

import TopNavbar from './Navbar';
import '../img/App.css';

class Success extends Component {

  backPage() {
    browserHistory.replace('/welcome');
  }

  render() {
    return (
      <div className="App">
        <TopNavbar />
        <div className="form-inline" style={{margin: '5px'}}>
          <div className="successTitle">You successfully signed up on BikeTrack! Have fun cycling and be safe!</div>
          <div style={{textAlign: 'center'}}>
            <button
            className="SignButton center"
            type="button"
            onClick={() => this.backPage()}
            ><Link to={'/welcome'}>Back to Home Page</Link>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Success;
