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
                       { address.map( (item) => {
                           return ( <>
                            <div className="sub"><div><span className="label">Address Type</span> {item.name}</div></div> 
                            <div className="sub"><div><span className="label">City</span> {item.city}</div></div> 
                            <div className="sub"><div><span className="label">Address</span> {item.address}</div></div> 
                            <div className="sub"><div><span className="label">Locality</span> {item.locality}</div></div> 
                            <div className="sub"><div><span className="label">Pin Code</span> {item.pincode}</div></div> 
                            <div className="sub"><div><span className="label">Mobile No</span> {item.mobile_no}</div></div> 
                            </>
                           )
                       })
                       }
                    </div>
               </Col>
                }              
            </div>
    )
}
}
export default Basic;