import React from 'react'
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import { signupAction, logoutAction, loginAction } from './actions/session_actions';
import Root from './components/root';
import { retrieveOneQuestion, deleteQuestion, createQuestion, usersActiveQuestion  } from './actions/question_actions.js'
import * as answerChoiceApi from './util/api/answer_choice_api_util'
import * as groupApi from './util/api/group_api_util'
import * as questionApi from './util/api/question_api_util'
import * as groupActions from './actions/group_actions.js'
import * as selector from './util/selectors/poll_index_selector.js'

document.addEventListener('DOMContentLoaded', () => {

  let store;


//boot strap the current user by setting current user to the window.
  if (window.currentUser) {
    const preloadedState = { session: { currentUser: window.currentUser } };
    store = configureStore(preloadedState);
  } else {
    store = configureStore();
  }

  // TESTING START
  window.questionApi = questionApi
  window.groupApi = groupApi
  window.getState = store.getState;
  window.allPolls = selector.allPolls
  window.dispatch = store.dispatch;
  window.retrieveGroups = groupActions.retrieveGroups
  window.retrieveOneGroup = groupActions.retrieveOneGroup
  window.createGroup = groupActions.createGroup
  // TESTING END

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store}/>, root);
});
