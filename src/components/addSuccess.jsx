import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

import TopNavbar from './Navbar';
import '../img/App.css';

class addSuccess extends Component {

  backPage() {
    browserHistory.replace('/welcome');
  }

  render() {
    return (
      <div className="App">
        <TopNavbar />
        <div className="form-inline" style={{margin: '5px'}}>
          <div className="successTitle">You successfully added a new bike ! </div>
          <div style={{textAlign: 'center'}}>
            <button
            className="btn bck-btn"
            type="button"
            onClick={() => this.backPage()}
            ><Link to={'/app'}>Back to Home Page</Link>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default addSuccess;
