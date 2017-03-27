import React, { Component } from 'react';
import { Link } from 'react-router';
import '../img/App.css';
import TopNavbar from './Navbar';

class Welcome extends Component {
  render() {
    return (
      <div className="App">
        <TopNavbar />
        <div className="form-inline" style={{margin: '5px'}}>
          <h2 className="App-intro">Welcome on Biketrack's Web Platform</h2>
          <p className="intro-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
            in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.</p>
          <div className="form-group">
            <div className="btn btn-primary log-btn" style={{backgroundColor: 'lightgrey'}}><Link to={'/signup'}>Join Bike Track</Link></div>
            <div className="btn btn-primary log-btn" style={{backgroundColor: 'lightgrey'}}><Link to={'/signin'}>Connection</Link></div>
          </div>
        </div>
      </div>
    )
  }
}

export default Welcome;
