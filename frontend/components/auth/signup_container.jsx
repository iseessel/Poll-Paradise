import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signupAction, clearSessionActions } from '../../actions/session_actions.js';
import SessionErrorsContainer from '../errors/session_errors_container.jsx';

const mapStateToProps = (state, ownProps) => {
  return {
    loggedIn: Boolean(state.session.currentUser),
    errors: state.errors.session,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    signup: (user) => dispatch(signupAction(user)),
  };
};


class SignupForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
      fname: "",
      lname: ""
    };
  }

  componentWillUnmount(){

  }

  handleSubmit(e){
    e.preventDefault();
    const user = Object.assign({}, {user: this.state});
    this.props.signup(user);
  }

  render(){
    return (
      <div className="session-form">
        <div className="form-container">
          <h2>Create Your account</h2>
          <SessionErrorsContainer errors={this.props.errors} />
          <form onSubmit={this.handleSubmit.bind(this)}>
            <label className="session-form-element">First name
              <input className="password" onChange={(e)=> this.setState({fname: e.currentTarget.value})} />
            </label>
            <label className="session-form-element">Last name
              <input className="password" onChange={(e)=> this.setState({lname: e.currentTarget.value})} />
            </label>
            <label className="session-form-element">Email
              <input className="email" onChange={(e)=> this.setState({email: e.currentTarget.value})} />
            </label>
            <label className="session-form-element">Password
              <input type="password" className="password" onChange={(e)=> this.setState({password: e.currentTarget.value})} />
            </label>
            <button>Create my Account</button>
          </form>
          <p className="session-redirect-text">Already have an account? <Link to="/login">Login Here</Link></p>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
