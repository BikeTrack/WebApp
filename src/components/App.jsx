import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseApp } from '../firebase';
import AddGoal from './AddGoal'
import GoalList from './GoalList'
import CompleteGoalList from './CompleteGoalList'
import './App.css';
import TopNavbar from './Navbar';

class App extends Component {
signOut() {
  firebaseApp.auth().signOut();
}
  render() {
    return (
      <div className="App">
        <TopNavbar />
        <div style={{margin: '5px'}}>
          <h3> Add a Bike </h3>
          <AddGoal />
          <hr />
          <h4> Bikes list </h4>
          <GoalList />
          <hr />
          <h4> Deleted Bikes </h4>
          <CompleteGoalList />
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
