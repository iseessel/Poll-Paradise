import React from 'react'
import { connect } from 'react-redux'
import logoutAction from '../../actions/session_actions';

const LeftSidebar = () => {
  return (
    <div className="left-sidebar">
      <p>img here!</p>
    </div>
  )
}

const Header = ({loggedIn, logout}) => {
  if(loggedIn){
    return(
      <header>
        <LeftSidebar />
        <div className="right-sidebar">
          <a href=""><p>My Polls</p></a>
          <a href="" className="signup" onClick={logout}><p>Sign Out</p></a>
        </div>
    </header>
  );

  }else{
    return(
    <header>
      <LeftSidebar />
        <div className="right-sidebar">
          <a href=""><p>Sign In</p></a>
          <a href="" className="signup"><p>Sign Up</p></a>
        </div>
    </header>
    )
  }
}

const mapStateToProps = state => (
  {loggedIn: Boolean(state.session.currentUser),}
);

const mapDispatchToProps = dispatch => (
  {logout: () => dispatch(logoutAction())}
)

export default connect(mapStateToProps, null)(Header)
