import React from 'react'
import { connect } from 'react-redux'

const LeftSidebar = () => {
  return (
    <div className="left-sidebar">
      <p>img here!</p>
    </div>
  )
}

const Header = ({loggedIn}) => {
  debugger;
  if(loggedIn){
    return(
      <header>
        <LeftSidebar />
        <div className="right-sidebar">
          <a href=""><p>My Polls</p></a>
          <a href="" className="signup"><p>Sign Out</p></a>
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

const mapStateToProps = state => ( {loggedIn: Boolean(state.session.currentUser)} );

export default connect(mapStateToProps, null)(Header)
