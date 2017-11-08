import React from 'react';
import HeaderContainer from '../header_container.jsx';
import FooterContainer from '../footer.jsx';
import { connect } from 'react-redux';
import { loginAction } from '../../actions/session_actions.js'

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(loginAction(user)),
  }
}

const user = {user: { email: "demo@gmail.com",
  password: "password" }}

const MainPage = (props) => (
  <div className="main">
    <HeaderContainer />
    <div className="MainPage">
      <div className="content">
        <section className="banner">
          <div className="background-image">
          </div>
          <div className="banner-text">
            <div className="row">
              <div className="text">
                <h2>Live interactive audience participation</h2>
                <h4 className="subheader-main">Engage your audience or class in real time</h4>
                <button className="get-started demo-login"
                  onClick={() => props.login(user).then(() => props.history.push('signup'))}>
                  Demo Login
                </button>
              </div>
            </div>
            </div>
        </section>
        <section className="about">
        </section>
      </div>
    </div>
    <FooterContainer />
  </div>
);

export default connect(null, mapDispatchToProps)(MainPage)
