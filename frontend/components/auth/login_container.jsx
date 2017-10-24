import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginAction } from '../../actions/session_actions.js';
import SessionErrorsContainer from '../errors/session_errors_container.jsx';

const mapStateToProps = (state, ownProps) => {
  return {
    loggedIn: Boolean(state.session.currentUser),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: (user) => dispatch(loginAction(user))
  };
};

class LoginForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  toggleForm(){

  }

  handleSubmit(e){
    e.preventDefault();
    const user = Object.assign({}, {user: this.state});
    this.props.login(user);
  }

  render(){
    return (
      <div className="session-form">
        <div className="session-form-container">
          <h2>Log in</h2>
          <SessionErrorsContainer />
          <form onSubmit={this.handleSubmit.bind(this)}>
            <label className="session-form-element">
              Email
              <input onChange={(e)=> this.setState({email: e.currentTarget.value})} />
            </label>
            <label className="session-form-element">
              Password
              <input type="password" onChange={(e)=> this.setState({password: e.currentTarget.value})} />
            </label>
            <button>Log in</button>
          </form>
          <p className="session-redirect-text">Need an account?  <Link to="/signup">Create One Now</Link></p>
        </div>
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
