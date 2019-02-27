import React from 'react';
import {Link} from 'react-router-dom';
import { Tab, NavItem,Row2 , Col,Nav} from 'react-bootstrap'
import { Button, Icon, Card, Row, CardTitle} from 'react-materialize';
import '../assets/css/admin.css';

class Basic extends React.Component {
    constructor(props) {
        super(props);  
        this.state ={customer:  [] }
    }
    componentDidMount(){      
    }
  render() { 
    const {order} = this.props;
    const address =  order.ship_address
    // console.log(address.address)
    return (
            <div className="tab-view">
                <Col sm={6} lg={6}>
                    <div className="block">
                        <div className="title"><i class="material-icons">whatshot</i>Order Information</div>
                        <div className="sub"><div><span className="label">Order ID</span> {order.id}</div></div>
                        <div className="sub"><div><span className="label">Order Date</span> {order.purchased_date}</div></div>
                        <div className="sub"><div><span className="label">Order Status</span> {order.status_label}</div></div>
                    </div>
                </Col>
                <Col sm={6} lg={6}>
                    <div className="block">
                        <div className="title"><i class="material-icons">whatshot</i>Account Information</div>
                        <div className="sub"><div><span className="label">Customer ID</span> {order.id}</div></div>
                        <div className="sub"><div><span className="label">Name</span> {order.customer[0].full_name}</div></div>
                    </div>
                </Col>
                {  address &&
                <Col sm={12} lg={12} >
                  <div className="block">
                   <div className="title"><i class="material-icons">place</i>Shipping Information</div>
                            <div className="sub"><div><span className="label">Address Name</span> {address.name}</div></div> 
                            <div className="sub"><div><span className="label">City</span> {address.city}</div></div> 
                            <div className="sub"><div><span className="label">Address</span> {address.address}</div></div> 
                            <div className="sub"><div><span className="label">Locality</span> {address.locality}</div></div> 
                            <div className="sub"><div><span className="label">Pin Code</span> {address.pincode}</div></div> 
                            <div className="sub"><div><span className="label">Mobile No</span><a href={`tel:${address.mobile_no}`}>+91{address.mobile_no}</a></div></div> 
                    </div>
               </Col>
                }              
            </div>
    )
}
}
export default Basic;