import React from 'react';
import { Button, Icon, MediaBox} from 'react-materialize';
import {Link} from 'react-router-dom';
import {formatPrice} from './helper/data'
import Popup from "reactjs-popup";
require('./css/customer.css');
require('./css/lib.css');

class Order extends React.Component {
    constructor() {
        super();
        // this.submit =  this.submit.bind(this)
        this.state = { selectedFile: [], orders : null }
    }
    componentDidMount(){
        fetch('/api/customer/order/')
        .then(data => data.json())
        .then(res => this.setState({orders : res}))
    }

  render() { 
    const {orders} = this.props;
    return (
            <div className="view pres-grid">
            {/* <div className="title">Order History</div> */}
            <div className="upload-btn">
                <Link to = "/upload"> <Button waves='teal' className ="light">New Order<i className="material-icons left">shopping_cart</i></Button></Link>
            </div>
            { orders.length > 0 ?
                <table className="table"><tbody>
                    <tr><th>#</th><th>Medicines</th><th>Prescription</th><th>Grand Total</th><th>Order Date</th><th>Action</th></tr>
                    { orders.map( (item,index) => {       
                    return ( 
                    <tr  key={index}><td>{item.id}</td><td>{item.items}</td>
                    { <td>
                        {  item.prescription && item.prescription.image_src ?
                        <MediaBox src={item.prescription.image_src} caption={item.prescription.image_src} width="70"/> 
                        : "N/A"
                        }
                        </td> 
                    }
                    <td>{formatPrice(item.grand_total) }</td><td>{item.purchased_date}</td>
                    <td><Button waves="teal" className="green"><Link to={{  pathname:'/customer/order/'+item.id , order : item  }} >View Details</Link></Button></td></tr>
                         )               
                     })
                   }
                   </tbody>
                </table>
             : <h5>No order available</h5>
            }
            </div>
    )
}
}
export default Order;