import React from 'react';
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util.jsx';
import LoginContainer from './auth/login_container.jsx';
import SignupContainer from './auth/signup_container.jsx';
import MainPage from './main/main_page';

const App = () => {

  return (
    <div className="main-app">
      <Route path="/" component={MainPage} />
      <AuthRoute path="/login" component={LoginContainer} />
      <AuthRoute path="/signup" component={SignupContainer} />
      <footer></footer>
    </div>
  );

};

export default App;
