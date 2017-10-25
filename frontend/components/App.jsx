import React from 'react';
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util.jsx';
import MainPage from './main/main_page';
import { Footer } from './footer.jsx';
import { Login, SignIn } from './auth/auth_master.jsx';
import MyPolls from './my_polls/my_polls.jsx'

const App = () => {

  return (
    <div className="main-app">
      <Route exact path="/" component={MainPage} />
      <AuthRoute path='/login' component={Login} />
      <AuthRoute path='/signup' component={SignIn} />
      <Route path='/mypolls' component={MyPolls} />
      <Footer />
    </div>
  )
};

// <AuthRoute path="/login" component={LoginContainer} />
// <AuthRoute path="/signup" component={SignupContainer} />

export default App;
