import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginAction } from '../../actions/session_actions.js';

const mapStateToProps = (state, ownProps) => {
  return {
    loggedIn: Boolean(state.session.currentUser),
    errors: state.session.errors,
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

  handleSubmit(e){
    e.preventDefault();
    const user = Object.assign({}, {user: this.state});
    this.props.login(user);
  }

  render(){
    return (
      <div className="login-form">
        <h2>Log in</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>Email
            <input className="email" onChange={(e)=> this.setState({email: e.currentTarget.value})} />
          </label>
          <label>Password
            <input className="password" onChange={(e)=> this.setState({password: e.currentTarget.value})} />
          </label>
          <button>Log in</button>
        </form>
        <p>Need an account? <Link to="/signup">Create One Now</Link></p>
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
