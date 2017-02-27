import React, { Component } from 'react';
import { Link } from 'react-router';
import { firebaseApp } from '../firebase';
import './App.css';
import TopNavbar from './Navbar';

class SignIn extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      error: {
        message: ''
      }
    }
  }

  signIn() {
    console.log('this.state', this.state);
    const { email, password } = this.state;
    firebaseApp.auth().signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.setState({error});
      })
  }

  render() {
    return (
      <div className="App">
        <TopNavbar />
        <div className="form-inline" style={{margin: '5px'}}>
          <h2>Signin for the Biketrack's Web Platform</h2>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              style={{marginRight: '5px'}}
              placeholder="email"
              onChange={event => this.setState({email: event.target.value})}
            />
            <input
              className="form-control"
              type="password"
              style={{marginRight: '5px'}}
              placeholder="password"
              onChange={event => this.setState({password: event.target.value})}
            />
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => this.signIn()}
              >
                Sign In
            </button>
          </div>
          <div>{this.state.error.message}</div>
          <div><Link to={'/signup'}>Signup Instead</Link></div>
        </div>
      </div>
    )
  }
}

export default SignIn;
