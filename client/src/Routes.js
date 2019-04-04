import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Home from './Home.jsx'
import Login from './Login.jsx'
import Register from './Register.jsx'
import createBrowserHistory from 'history/createBrowserHistory';
import DefaultLayout from './components/Layout'
import AdminLayout from './admin/components/AdminLayout'
import Upload from './UploadForm.jsx' 
import Myaccount from './Myaccount.jsx'  
import OrderItems from './OrderItems.jsx'  
import Prescription from './Pres.jsx'  
import Success from './Success.jsx'  
import noroute from './404.jsx'  
import CMS from './Cms.jsx'  

import admin_login from './admin/Login.jsx'
import admin_dash from './admin/Dashboard.jsx'
import cust_grid from './admin/customer/Grid.jsx';
import order_grid from './admin/order/Grid.js';
import order_new from './admin/order/UploadForm';
import cust_edit from './admin/customer/Edit.jsx';
import cust_new from './admin/customer/Form.jsx';
import order_edit from './admin/order/OrderEdit.js';
import Prepare from './admin/order/Prepare';
import Shipment from './admin/order/Shipment';
import Config from './admin/system/Config.jsx';
import banner_grid from './admin/banner/Grid';
import banner_new from './admin/banner/Form';
import pages_grid from './admin/pages/Grid';
import pages_new from './admin/pages/Form'

const customHistory = createBrowserHistory();



const Routes = () => (
    <Router history={customHistory}>
    <>
         <Route exact path="/admin/login" component={admin_login} />
        <div className="main-container" >
                    <DefaultLayout exact path='/' component={Home} />
                    <DefaultLayout exact path='/page/:page_id' component={CMS} />
                    <DefaultLayout exact path='/customer/login' component={Login} />
                    <DefaultLayout exact path='/customer/register' component={Register} />
                    <DefaultLayout exact path='/upload' component={Upload} />
                    <DefaultLayout exact path='/customer/account' component={Myaccount} />
                    <DefaultLayout exact path='/customer/order/:order_id' component={OrderItems} />
                    <DefaultLayout exact path='/customer/prescription' component={Prescription} />
                    <DefaultLayout exact path='/order/success' component={Success} />                    
                     <AdminLayout exact path="/admin/" component={admin_dash} />                     
                     <AdminLayout  exact path="/admin/customers/grid" component={cust_grid} />
                     <AdminLayout  exact path="/admin/customer/:id" component={cust_edit} />
                     <AdminLayout  exact path="/admin/custome/new" component={cust_new} />
                     <AdminLayout  exact path="/admin/orders/grid" component={order_grid} />
                     <AdminLayout  exact path="/admin/order/:id?" component={order_edit} />
                     <AdminLayout  exact path="/admin/new/order" component={order_new} />
                     <AdminLayout  exact path="/admin/order/:id/prepare" component={Prepare} />
                     <AdminLayout  exact path="/admin/order/:id/shipment" component={Shipment} />
                     <AdminLayout  exact path="/admin/system/config" component={Config} />                     
                     <AdminLayout  exact path="/admin/banner/grid" component={banner_grid} />                     
                     <AdminLayout  exact path="/admin/banner/new" component={banner_new} />         
                     <AdminLayout  exact path="/admin/banner/edit/:id" component={banner_new} />    
                     <AdminLayout  exact path="/admin/pages/" component={pages_grid} />                     
                     <AdminLayout  exact path="/admin/page/new" component={pages_new} />         
                     <AdminLayout  exact path="/admin/page/edit/:id" component={pages_new} />      
            </div>
            </>
    </Router>
)

export default Routes;