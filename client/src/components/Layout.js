import React from 'react';
import { Router, Route } from 'react-router-dom';
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import axios from 'axios';

const DefaultLayout = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={matchProps => (
          <div className="front-wrapper">
              <Header />
              <Component {...matchProps} />          
              <Footer />
          </div>
        )} />
    )
  };
  
  export default DefaultLayout 