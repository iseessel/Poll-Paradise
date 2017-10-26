import React from 'react';
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util.jsx';
import MainPage from './main/main_page';
import { Login, SignIn } from './auth/auth_master.jsx';
import MyPolls from './my_polls/my_polls.jsx'
import PollCreateContainer from './poll_create/poll_create_container.jsx'

const App = () => {

  return (
    <div className="main-app">
      <Route exact path="/" component={MainPage} />
      <AuthRoute path='/login' component={Login} />
      <AuthRoute path='/signup' component={SignIn} />
      <ProtectedRoute path='/mypolls' component={MyPolls} />
      <ProtectedRoute path='/create' component={PollCreateContainer} />
    </div>
  )
};

// <AuthRoute path="/login" component={LoginContainer} />
// <AuthRoute path="/signup" component={SignupContainer} />

export default App;
