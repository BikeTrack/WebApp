import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';
import TopNavbar from './Navbar';

class App extends Component {
// signout function here
// signOut() {
//   firebaseApp.auth().signOut();
// }
  render() {
    return (
      <div className="App">
        <TopNavbar />
        <div style={{margin: '5px'}}>
          <h3> Add a Bike </h3>
          <hr />
          <h4> Bikes list </h4>
          <hr />
          <h4> Deleted Bikes </h4>
          <hr />
          <button
            className="btn btn-danger"
            onClick={() => this.signOut()}
            >
              Sign Out
          </button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  // console.log('state', state);
  return {};
}

export default connect(mapStateToProps, null)(App);
