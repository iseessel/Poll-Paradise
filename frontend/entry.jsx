import React from 'react'
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import { signupAction, logoutAction, loginAction } from './actions/session_actions';
import Root from './components/root';
import { retrieveOneQuestion, deleteQuestion } from './actions/question_actions.js'
import * as answerChoiceApi from './util/api/answer_choice_api_util'
import * as groupApi from './util/api/group_api_util'
import * as questionApi from './util/api/question_api_util'

document.addEventListener('DOMContentLoaded', () => {

  let store;


  //boot strap current user by setting him equal to window.currentUser!
  if (window.currentUser) {
    const preloadedState = { session: { currentUser: window.currentUser } };
    store = configureStore(preloadedState);
  } else {
    store = configureStore();
  }

  // TESTING START
  window.getState = store.getState;
  window.answerChoiceApi = answerChoiceApi;
  window.retrieveOneQuestion = retrieveOneQuestion;
  window.deleteQuestion = deleteQuestion;
  window.dispatch = store.dispatch;
  window.signupAction = signupAction;
  window.logoutAction = logoutAction;
  window.loginAction = loginAction;
  // TESTING END

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store}/>, root);
});
