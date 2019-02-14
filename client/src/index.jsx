import React from 'react';
import ReactDOM from 'react-dom';
import './css/global.css';
import './css/style.css';
import Routes from './Routes';
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

class Root extends React.Component  {
    render () {
        // optional cofiguration
        const options = {
            position: 'top center',
            timeout: 5000,
            offset: '80px',
            transition: 'fade',
            top : "100px",
            zIndex: 999
        }
      return (
        <AlertProvider template={AlertTemplate} {...options}>
          <Routes />
        </AlertProvider>
      )
    }
  }

ReactDOM.render(<Root />, document.getElementById('root'));
 