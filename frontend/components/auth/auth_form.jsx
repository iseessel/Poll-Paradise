import React from 'react';
import snakeCase from 'lodash/snakeCase'
import { signupAction, clearSessionActions, loginAction } from '../../actions/session_actions.js';
import { connect } from 'react-redux';
import ErrorsContainer from '../errors/errors_container.jsx';
import { withRouter, Link } from 'react-router-dom';
import HeaderContainer from '../header_container.jsx';
import { Footer } from '../footer.jsx';

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
    this.state = {submitText: props.inputText}
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
          <input className="auth-input"
            onChange={this.handleChange(inputString).bind(this)}/>
        </label>
      )
    });
  }

  generateBottomText(){
    if (this.props.match.url === "/login") {
      return (
        <p className="session-redirect-text">
          Need an account?
          <Link to="/signup">  Create One Now</Link>
        </p>
      )
    }else {
      return (
        <p className="session-redirect-text">
          Already have an account?
          <Link to="/login">  Login Here</Link>
        </p>
      )
    }
  }

  generateHeader(){
    return this.props.match.url === "/login"
      ? "Log in" : "Create Your account"
  }

  handleSubmit(e){
    e.preventDefault();
    this.setState({submitText: "Creating wormhole to Poll Paradise"})
    setTimeout(this.submitForm(e).bind(this), 1250)
  }

  resetLoginText(){
    this.setState({submitText: this.props.inputText})
  }

  submitForm(e){
    return (e) => {
      const data = (this.state ? this.state : {empty: true})
      const user = Object.assign({}, { user: data });

      this.props.match.url === "/login" ?
        this.props.login(user).then(null, this.resetLoginText.bind(this)) :
        this.props.signup(user).then(null, this.resetLoginText.bind(this))
    }
  }

  render(){

    return (
      <div className="main-session">
        <HeaderContainer />
        <div className="session-form">
          <div className="session-form-container">
            <h2>{this.generateHeader()}</h2>
            <ErrorsContainer correctClass="session-errors" />
            <form onSubmit={this.handleSubmit.bind(this)}>
              {this.generateInputs()}
              <label className="session-form-element">
                Password
                <input className="auth-input" type="password"
                  onChange={(e) => this.setState(
                    { password: e.currentTarget.value})}/>
              </label>
            <button className="auth-form-button">
              {this.state.submitText}
            </button>
            </form>
            {this.generateBottomText()}
          </div>
        </div>
        <Footer />
      </div>

    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthForm))
