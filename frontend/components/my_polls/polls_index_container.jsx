import React from 'react'
import * as pollIndexSelector from '../../util/selectors.poll_index_selector.js';

const mapStateToProps = (state) => {
  return {
    polls: pollIndexSelector.allPolls(state.entities.groups,
      state.entities.questions)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: (user) => dispatch(loginAction(user)),
    signup: (user) => dispatch(signupAction(user)),
  };
};
