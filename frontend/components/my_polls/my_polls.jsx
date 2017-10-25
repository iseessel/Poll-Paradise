import React from 'react'
import PollIndexContainer from './polls_index_container.jsx';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser
  };
};

export const MyPolls = (props) => {
  return (
    <div className="my-polls">
      <div className="my-polls-header">
        <div className="my-polls-header-left">
          <Link className="plus" to="/create"><FontAwesome name="plus" size="2x"/></Link>
          <Link className="polls" to="/mypolls">Polls</Link>
        </div>

        <div className="my-polls-header-right">
          <div className="dropdown-menu">
            {props.currentUser.email}
            <FontAwesome name="cog" size="2x"/>
          </div>
        </div>
      </div>
      <div className="main-polls">
        <div className="my-polls-sidebar">
          <button onClick={() => props.history.push('create')}>Create</button>
        </div>

        <div className="polls-index">
          <PollIndexContainer />
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, null)(MyPolls)
