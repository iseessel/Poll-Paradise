import React from 'react'
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import { signupAction, logoutAction, loginAction } from './actions/session_actions';
// import Root from './components/root';

document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();

  // TESTING START
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  // window.signupAction = signupAction;
  // window.logoutAction = logoutAction;
  // window.loginAction = loginAction;
  // TESTING END
//
  const root = document.getElementById('root');
  ReactDOM.render(<h1>Hello World!</h1>, root);
});
