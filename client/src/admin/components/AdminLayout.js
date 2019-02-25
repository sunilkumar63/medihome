import React from 'react';
import { Route,Redirect } from 'react-router-dom';
import Header from './Header.js'
import Sidebar from './SideBar'
// import Footer from './Footer.jsx'
import '../assets/css/AdminLTE.css';
import '../assets/css/admin.css';
import '../../css/customer.css';
import '../../css/lib.css';

const AdminLayout = ({component: Component, ...rest}) => {
    return (
          <Route {...rest} render={matchProps => (
            <div className="admin-wrapper">
                <Header {...matchProps} />
                <Sidebar />
                <Component {...matchProps} />          
            </div>
          )} />
    )
  };
  
  export default AdminLayout 