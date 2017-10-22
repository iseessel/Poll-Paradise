import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signupAction } from '../../actions/session_actions.js';

const mapStateToProps = (state, ownProps) => {
  return {
    loggedIn: Boolean(state.session.currentUser),
    errors: state.errors.session,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    signup: (user) => dispatch(signupAction(user))
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

  handleSubmit(e){
    e.preventDefault();
    const user = Object.assign({}, {user: this.state});
    this.props.signup(user);
  }

  errors(){
    const errors = this.props.errors.map((error) => <li>{error}</li>);
    return (
      <ul className="session-errors">
        {errors}
      </ul>
    );
  }

  render(){
    return (
      <div className="session-form">
        <h2>Create Your account</h2>
        {this.errors()}
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
            <input className="password" onChange={(e)=> this.setState({password: e.currentTarget.value})} />
          </label>
          <button>Create my Account</button>
        </form>
        <p className="session-redirect-text">Already have an account? <Link to="/login">Login Here</Link></p>
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
