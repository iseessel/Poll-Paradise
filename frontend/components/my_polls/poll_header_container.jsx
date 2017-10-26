import React from 'react';
import { connect } from 'react-redux';
import PollHeaderContainer from './poll_header_container.jsx';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { logoutAction } from '../../actions/session_actions.js';
import { clearErrors } from '../../actions/errors.js';


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

  toggleSelected(){
    const dropdownSelected = !this.state.dropdownSelected
    this.setState({dropdownSelected: dropdownSelected})
  }

  render(){
    return (
      <div className="my-polls-header">
        <div className="my-polls-header-left">
          <Link className="plus" to="/create"><FontAwesome name="plus" size="2x"/></Link>
          <Link className="polls" to="/mypolls">Polls</Link>
        </div>

        <div className="my-polls-header-right">
          <div className="dropdown-menu" onClick={this.toggleSelected.bind(this)}>
            <div className="dropdown-text">
              <span>{this.props.currentUser.email}</span>
              <FontAwesome name="cog" size="2x"/>
            </div>
            <div className="dropdown-items">
              {this.dropdownMenu()}
            </div>

          </div>
          </div>
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PollHeader)
