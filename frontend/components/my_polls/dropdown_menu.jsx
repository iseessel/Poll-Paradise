import React from 'react'
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import onClickOutside from 'react-onclickoutside'
import { logoutAction } from '../../actions/session_actions.js';

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutAction()),
  };
};

class DropDownMenu extends React.Component{

    constructor(props){
      super(props)
      this.state = {dropdownSelected: false}
    }

    handleClickOutside(){
      this.setState({dropdownSelected: false})
    }

    toggleSelected(){
      const dropdownSelected = !this.state.dropdownSelected
      this.setState({dropdownSelected: dropdownSelected})
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

    render() {
      ;
      return (
        <div className="dropdown-menu" onClick={this.toggleSelected.bind(this)}>
          <div className="dropdown-text">
            <span>{this.props.currentUser.email}</span>
            <FontAwesome name="cog" size="2x"/>
          </div>
          <div className="dropdown-items">
            {this.dropdownMenu()}
          </div>
        </div>
      )
    }

  }
export default connect(mapStateToProps, mapDispatchToProps)
  (onClickOutside(DropDownMenu))
