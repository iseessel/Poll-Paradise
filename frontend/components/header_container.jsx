import React from 'react'
import { connect } from 'react-redux'
import { logoutAction } from '../actions/session_actions';
import { Link } from 'react-router-dom'

const LeftSidebar = () => {
  return (
    <div className="left-sidebar">
      <p>img here!</p>
    </div>
  )
}
//Also could pass down props if I want to make it a bit more dry? However I prefer this explicitness.
const Header = ({loggedIn, logout}) => {
  if(loggedIn){
    return(
      <header>
        <LeftSidebar />
        <div className="right-sidebar">
          <Link to="/mypolls" className="mypolls" ><p>My Polls</p></Link>
          <Link to="/" onClick={logout}><p>Sign Out</p></Link>
        </div>
    </header>
  );

  }else{
    return(
    <header>
      <LeftSidebar />
        <div className="right-sidebar">
          <Link to="/login"><p>Log In</p></Link>
          <Link className="signup" to="/signup"><p>Sign Up</p></Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header)
