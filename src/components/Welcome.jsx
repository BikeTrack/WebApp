import React, { Component } from 'react';
import { Link } from 'react-router';
import '../img/App.css';
import TopNavbar from './Navbar';
import gPlay from '../img/GooglePlay.png'
import aStore from '../img/AppStore.png'

class Welcome extends Component {
  render() {
    return (
      <div className="App">
        <div className="my-bg-img" style={{opacity: "0.9", backgroundAttachment: "fixed", position: "relative"}}>
          <div className="layer" style={{backgroundColor: "rgba(255, 0, 0, 0.8)", position: "absolute", top: "0", left: "0", width: "100%", height: "100%"}}>
            <TopNavbar />
            <div className="form-inline" style={{margin: '5px'}}>
              <h2 className="App-intro">Welcome on Biketrack's Web Platform</h2>
              <br/><br/><br/><br/>
              <p className="intro-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.</p>
                <br/><br/>
              <div className="stores">
                <div className="btn btn-primary log-btn" style={{backgroundColor: 'lightgrey'}}><Link to={'/signup'}>Sign Up</Link></div>
                <div className="btn btn-primary log-btn" style={{backgroundColor: 'lightgrey', marginLeft: '100px'}}><Link to={'/signin'}>Sign In</Link></div>
              </div>
            </div>
            <div className="stores">
              <img src={gPlay} alt="Google Play" style={{padding: '100px'}}/>
              <img src={aStore} alt="Apple Store"  style={{padding: '100px'}}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Welcome;
