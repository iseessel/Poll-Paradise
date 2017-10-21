import React from 'react';

const Header = () => (
  <header>
    <div className="left-sidebar">
      <p>img here!</p>
    </div>

    <div className="right-sidebar">
      <a href=""><p>Log In</p></a>
      <a href="" className="signup"><p>Sign Up</p></a>
    </div>
  </header>
);

const App = () => {

  return (
    <div className="main-app">
      <Header />
      <h1>Poll Everywhere</h1>
    </div>
  );

};

export default App;
