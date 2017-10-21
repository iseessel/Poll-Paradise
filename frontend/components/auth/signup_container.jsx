import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signupAction } from '../../actions/session_actions.js';

const mapStateToProps = (state, ownProps) => {
  return {
    loggedIn: Boolean(state.session.currentUser),
    errors: state.session.errors,
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

  render(){
    return (
      <div className="signup-form">
        <h2>Create Your account</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>First name
            <input className="password" onChange={(e)=> this.setState({fname: e.currentTarget.value})} />
          </label>
          <label>Last name
            <input className="password" onChange={(e)=> this.setState({lname: e.currentTarget.value})} />
          </label>
          <label>Email
            <input className="email" onChange={(e)=> this.setState({email: e.currentTarget.value})} />
          </label>
          <label>Password
            <input className="password" onChange={(e)=> this.setState({password: e.currentTarget.value})} />
          </label>
          <button>Create my Account</button>
        </form>
        <p>Already have an account? <Link to="/signup">Create One Now</Link></p>
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
