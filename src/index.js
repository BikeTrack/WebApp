import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { logUser } from './actions';
import { firebaseApp } from './firebase'
import reducer from './reducers';
import App from './components/App';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Welcome from './components/Welcome';


const store = createStore(reducer);
browserHistory.replace('/welcome');

// firebaseApp.auth().onAuthStateChanged(user => {
//   if (user) {
//     const { email } = user;
//     store.dispatch(logUser(email));
//     browserHistory.push('/app');
//   } else {
//     browserHistory.replace('/welcome');
//   }
// })

ReactDOM.render(
  <Provider store={store}>
    <Router path="/" history={browserHistory}>
      <Route path="/app" component={App} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/welcome" component={Welcome} />
    </Router>
  </Provider>,
  document.getElementById('root')
)
