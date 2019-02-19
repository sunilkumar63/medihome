import React from 'react';
import { Button, Icon, MediaBox} from 'react-materialize';
import {Link} from 'react-router-dom';
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
                    <tr><th>#</th><th>Medicines</th><th>Uploaded Prescription</th><th>Grand Total</th><th>Ordered On</th></tr>
                    { orders.map( (item,index) => {             
                    var path = `./images/presc/${item.prescription.file}`
                    try {                  
                    // var  image=  require(`./images/presc/${item.prescription.file}`)                       
                    return ( 
                    <tr key={index}><td>{item.id}</td><td>{item.items}</td>
                    {/* <td><MediaBox src={image} caption={item.prescription.file} width="70"/></td> */}
                    <td>{item.grand_total_currency}</td><td>{item.purchased_date}</td></tr>
                         )               
                    }
                     catch(e){
                        throw e;
                    }
                    
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