import React from 'react'
import { connect } from 'react-redux';
import { loginAction } from '../actions/session_actions.js'

const user = {user: { email: "demo@gmail.com",
  password: "password" }}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(loginAction(user)),
  }
}

class Footer extends React.Component{

  constructor(props){
    super(props)
  }

  render(){
    return (
      <div className="footer">
        <div className="top-footer">
          <div className="links">
            <a href="https://www.linkedin.com/in/isaac-seessel-469042138">
              Linkedin
            </a>
            <a href="https://github.com/iseessel/Poll-Everywhere">
              Github
            </a>
            <a onClick={() => this.props.login(user)}>
              Demo Login
            </a>
          </div>
        </div>
        <div className="lower-footer">
        </div>
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(Footer)
