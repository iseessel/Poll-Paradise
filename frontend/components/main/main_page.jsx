import React from 'react';
import HeaderContainer from '../header_container.jsx';


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
                <button onClick={() => props.history.push('signup')}>Get started</button>
              </div>
            </div>
            </div>
        </section>
        <section className="about">
        </section>
      </div>
    </div>
  </div>

);

export default MainPage;
