import React from 'react';
import Loader  from './components/Loader'
import {Link} from 'react-router-dom';
import { Button, Icon, MediaBox,Table} from 'react-materialize';
import {formatPrice} from './helper/data'
import { Col} from 'react-bootstrap'
require('./css/customer.css');

class OrderItems extends React.Component {
    constructor() {
        super();
        this.state = {
          error : false,
          order : null,
          loader : true
        }
      }
    async componentDidMount(){
        document.title = "Order #"+this.props.match.params.order_id;
        await fetch('/api/order/'+this.props.match.params.order_id+"/all")
        .then(data => data.json())
        .then(res => this.setState({order : res }))
    }

render() {
    const  {order} =  this.state;
    var address,medicines ; 
    if(order)   address =  order.ship_address
    if(order)   medicines =  order.medicines
    order &&  
    console.log(order)
    return (   
        !order ? <Loader /> : 
            <div className="page">
            <Button waves='primary' onClick={() => this.props.history.push({pathname: "/customer/account"})}>Back<Icon left>replay</Icon></Button>
                 <div className="title">Order Details # {order.id}</div>
                 <Col sm={12} lg={12} className="order-details" >
                    <Col sm={10} lg={10} className="head">
                            <div class=""><div><span class="label">Order Date</span>{order.purchased_date}</div></div>
                            <div class=""><div><span class="label">Status</span> {order.status_label}</div></div>
                        </Col>
                        <Col sm={10} lg={10} >
                            <div className="title">Medicine List</div>
                            {medicines.length >0 ?
                                    <Table  responsive >                  
                                    <tbody>
                                    <tr className="heading"><td>S/N</td><td>Name</td><td>Estimated Price</td><td>Total Quantity</td><td>Subtotal</td></tr>
                                    {  medicines.map((medi,index) => {
                                        return(<tr key={index}><td> {index+1}</td><td> {medi.name}</td><td> {formatPrice(medi.price)}</td><td> {medi.qty}</td><td>{formatPrice(medi.price * medi.qty)}</td></tr>)                        
                                    })
                                    }
                                </tbody>
                                </Table> : <h5>No Medicine</h5>
                            }
                          </Col>
                        <Col sm={10} lg={10} >
                        <Col sm={5} lg={5} >
                                    <div className="title"><i class="material-icons">place</i>Delivery Information</div>
                                    <div className="sub"><div><b> {address.name}</b></div></div> 
                                    <div className="sub"><div> {address.city}</div></div> 
                                    <div className="sub"><div> {address.address}</div></div> 
                                    <div className="sub"><div> {address.locality}</div></div> 
                                    <div className="sub"><div>{address.pincode}</div></div> 
                                    <div className="sub"><div><span>Mobile </span><a href={`tel:${address.mobile_no}`}>+91{address.mobile_no}</a></div></div> 
                        </Col>
                        
                        <Col sm={5} lg={5} >
                            <div className="title"><i class="material-icons">money</i>Payment Details</div>                             
                            { order.extra_charge >0 &&
                            <div className="sub"><div><span className="label">Extra Charge</span> {formatPrice(order.extra_charge)}</div></div> 
                            }
                              { order.shipping_charge || order.shipping_charge ==0 &&
                                <div className="sub"><div><span className="label">Shipping Charge</span> {formatPrice(order.shipping_charge)}</div></div> 
                              }
                            <div className="sub"><div><span className="label">Payment Mode</span> {order.payment_mode}</div></div> 
                            <div className="title"><div><span className="label">Grand Total</span> {formatPrice(order.grand_total)}</div></div>
                        </Col>
                        </Col>
                </Col>
        </div>
    )
}
}
export default OrderItems;