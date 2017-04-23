import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

//import { logUser } from './actions';
import reducer from './reducers';
import App from './components/App';
import Profile from './components/Profile';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Welcome from './components/Welcome';
import Success from './components/Success';
import delSuccess from './components/delSuccess';
import Failure from './components/Failure';

const store = createStore(reducer);
browserHistory.replace('/welcome');

ReactDOM.render(
  <Provider store={store}>
    <Router path="/" history={browserHistory}>
      <Route path="/app" component={App} />
      <Route path="/profile" component={Profile} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/welcome" component={Welcome} />
      <Route path="/success" component={Success} />
      <Route path="/failure" component={Failure} />
      <Route path="/delsuccess" component={delSuccess} />
    </Router>
  </Provider>,
  document.getElementById('root')
)
