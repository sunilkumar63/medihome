import React from 'react';
import $ from 'jquery';
import FlashMassage from 'react-flash-message';
import Loader  from './components/Loader'
import {Link} from 'react-router-dom';
import { Redirect } from 'react-router'
import { Tab, NavItem,Row , Col ,Nav} from 'react-bootstrap';
import Profile  from './Profile.jsx';
import {
    Form,
    Input,
    ValidationTypes
  } from "super-easy-react-forms";
  import PrescriptionList from './Pres.jsx'  
  import Address from './Address.jsx'  
  import Order from './Order.jsx'  
  require('./css/customer.css');

class Myaccount extends React.Component {
    constructor() {
        super();
        this.state = {
          isLoggedIn: false,
          error : false,
          customer : null,
          loader : true,
          title: "My Account"
        }
        this.handlePageTitle = this.handlePageTitle.bind(this)
      }
    async componentDidMount(){
        document.title = "My Account";
        var customer = localStorage.getItem("customer");
        customer =  JSON.parse(customer)
        fetch('/api/customer/'+customer.id+'/all')
        .then(data => data.json())
        .then(res => this.setState({customer : res , loader: false}))
        .catch(err => console.error("addr fetch ", err))
        // $('.footer').hide();
    }

    handlePageTitle = (event) =>{
        // document.title = event.target.textContent;
        // this.setState({title : event.target.textContent})
    }

submit = (data) =>{
    fetch('/api/customer/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
          }
      })
     .then( rs => rs.json())
     .then(result =>{
         result.error  ? this.setState({ isLoggedIn : false, error : true  }) : this.setState({ isLoggedIn : true, error : false  })
     })
} 
render() {
    const { from } = this.props.location.state || '/';
    const  {customer} =  this.state;
    return (   
        this.state.loader ? <Loader /> : customer &&
        <div className="">
            <div className="page">
            <div className="title text-center"><span>{this.state.title}</span></div>
            <Tab.Container className="tab" defaultActiveKey="first" id="mytab">
                    <Row className="clearfix">
                        <Col sm={2} >
                        <Nav bsStyle="pills" stacked>
                            <NavItem eventKey="first" onClick ={this.handlePageTitle}>My Information</NavItem>
                            <NavItem eventKey="second" onClick ={this.handlePageTitle}>My Orders</NavItem>
                            <NavItem eventKey="third" onClick ={this.handlePageTitle}>My Addresses</NavItem>
                            <NavItem eventKey="fourth" onClick ={this.handlePageTitle}>Prescriptions</NavItem>
                        </Nav>
                        </Col>
                        <Col sm={9} >
                        <Tab.Content animation>
                            <Tab.Pane eventKey="first"><Profile customer = {customer}/></Tab.Pane>
                            <Tab.Pane eventKey="second"><Order orders = {customer.orders} /></Tab.Pane>
                            <Tab.Pane eventKey="third"> <Address addresses = {customer.addresses} /></Tab.Pane>
                            <Tab.Pane eventKey="fourth"><PrescriptionList presc = {customer.presc} /></Tab.Pane>
                        </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        </div>
    )
}
}
export default Myaccount;