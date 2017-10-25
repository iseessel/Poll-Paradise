import React from 'react';
import { connect } from 'react-redux';
import PollHeaderContainer from './poll_header_container.jsx';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';


const mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser
  };
};


class PollHeader extends React.Component{

  constructor(props){
    super(props)
  }

  render(){
    return (
      <div className="my-polls-header">
        <div className="my-polls-header-left">
          <Link className="plus" to="/create"><FontAwesome name="plus" size="2x"/></Link>
          <Link className="polls" to="/mypolls">Polls</Link>
        </div>

        <div className="my-polls-header-right">
          <div className="dropdown-menu">
            <p>{this.props.currentUser.email}</p>
            <FontAwesome name="cog" size="2x"/>
          </div>
          </div>
        </div>
    );
  }
}

export default connect(mapStateToProps, null)(PollHeader)
