import React from 'react';
import snakeCase from 'lodash/snakeCase'
import { signupAction, clearSessionActions, loginAction } from '../../actions/session_actions.js';
import { connect } from 'react-redux';
import ErrorsContainer from '../errors/session_errors_container';
import { withRouter, Link } from 'react-router-dom';
import HeaderContainer from '../header_container.jsx';

const mapStateToProps = (state) => {
  return {
    loggedIn: Boolean(state.session.currentUser),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: (user) => dispatch(loginAction(user)),
    signup: (user) => dispatch(signupAction(user)),
  };
};


class AuthForm extends React.Component{

  constructor(props){
    super(props)
  }

  componentWillUnmount(){
    this.state = {}
  }

  handleChange(string){
    return (e) => this.setState({[snakeCase(string)]: e.currentTarget.value})
  }

  generateInputs(){
    return this.props.inputs.map((inputString, idx) => {
      return (
        <label key={idx} className="session-form-element">
          {inputString}
          <input onChange={this.handleChange(inputString).bind(this)}/>
        </label>
      )
    });
  }

  generateBottomText(){
    if (this.props.match.url === "/login") {
      return (
        <p className="session-redirect-text">Need an account?
          <Link to="/signup">  Create One Now</Link></p>
      )
    }else {
      return (
        <p className="session-redirect-text">Already have an account?
          <Link to="/login">  Login Here</Link></p>
      )
    }
  }

  generateHeader(){
    return this.props.match.url === "/login" ? "Log in" : "Create Your account"
  }

  handleSubmit(e){
    e.preventDefault();
    const data = (this.state ? this.state : {empty: true})
    const user = Object.assign({}, { user: data });
    debugger;
    this.props.match.url === "/login" ? this.props.login(user) :
      this.props.signup(user)
  }

  render(){
    debugger;
    return (
      <div className="main">
        <HeaderContainer />
        <div className="session-form">
          <div className="session-form-container">
            <h2>{this.generateHeader()}</h2>
            <ErrorsContainer />
            <form onSubmit={this.handleSubmit.bind(this)}>
              {this.generateInputs()}
              <label className="session-form-element">
                Password
                <input type="password"
                  onChange={(e) => this.setState(
                    { password: e.currentTarget.value})}/>
              </label>
            <button>{this.props.inputText}</button>
            </form>
            {this.generateBottomText()}
          </div>
        </div>
      </div>

    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthForm))
