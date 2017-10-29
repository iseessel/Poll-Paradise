import React from 'react';
import { connect } from 'react-redux';
import PollHeaderContainer from './poll_header_container.jsx';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { clearErrors } from '../../actions/errors.js';
import DropDownMenu from './dropdown_menu.jsx'

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutAction()),
    clearErrors: (user) => dispatch(clearErrors())
  };
};

class PollHeader extends React.Component{

  constructor(props){
    super(props)
    this.state = {dropdownSelected: false}
  }

  dropdownMenu(){
    if(this.state.dropdownSelected){
      return (
        <ul className="poll-view-dropdown">
          <li className="logout-item">
            <button
              onClick={this.props.logout.bind(this)}
              className="logout-button">
            Log out
            </button>
          </li>
        </ul>
      );
    }else{
      return(
        <div></div>
      )
    }
  }

  render(){
    return (
      <div className="my-polls-header">
        <div className="my-polls-header-left">
          <Link className="plus" to="/create"><FontAwesome name="plus" size="2x"/></Link>
          <Link className="polls" to="/mypolls">Polls</Link>
        </div>

        <a href="/" className="my-polls-header-middle">
          <img className="palm-tree" src={window.palmTreeUrl} />
        </a>

        <div className="my-polls-header-right">
          <DropDownMenu />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PollHeader)
