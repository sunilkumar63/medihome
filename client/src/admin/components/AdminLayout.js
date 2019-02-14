import React from 'react';
import { Route } from 'react-router-dom';
import Header from './Header.js'
import Sidebar from './SideBar'
// import Footer from './Footer.jsx'
import '../assets/css/AdminLTE.css';
import '../assets/css/admin.css';
import '../../css/customer.css';
import '../../css/lib.css';
// import '../../css/materialize.min.css';

const AdminLayout = ({component: Component, ...rest}) => {
    return (
          <Route {...rest} render={matchProps => (
            <div className="admin-wrapper">
                <Header />
                <Sidebar />
                <Component {...matchProps} />          
            </div>
          )} />
    )
  };
  
  export default AdminLayout 