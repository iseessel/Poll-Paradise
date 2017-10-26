import React from 'react'
import PollIndexContainer from './polls_index_container.jsx';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import PollHeaderContainer from './poll_header_container.jsx'
import { Footer } from '../footer.jsx';

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser
  };
};

export const MyPolls = (props) => {
  return (
    <div className="my-polls">
      <PollHeaderContainer />
      <div className="main-polls">
        <div className="my-polls-sidebar">
          <button onClick={() => props.history.push('create')}>Create</button>
        </div>

        <div className="polls-index">
          <PollIndexContainer />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default connect(mapStateToProps, null)(MyPolls)
