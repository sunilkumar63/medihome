import React from 'react';
import {Link} from 'react-router-dom'
import moment  from 'moment'

class Order extends React.Component {
    constructor() {
        super();
        this.state = { orders : null }
    }
    componentDidMount(){
    }
    
  render() { 
    const {orders} = this.props;
    return (
            <div className="tab-content">
            {/* <div className="title">Order History</div> */}
            { orders.length > 0 ?
                <table className="table"><tbody>
                    <tr><th>#</th><th>Medicines</th><th>Prescription</th><th>Grand Total</th><th>Status</th><th>Ordered On</th></tr>
                    { orders.map( (item,index) => {
                    return (<tr key={index}><td>{item.id}</td><td><Link to ="#">N/A</Link></td><td>{item.prescription_id}</td>
                    <td>{item.grand_total_currency}</td><td>{item.status_label}</td><td>{item.purchased_date}</td></tr>)
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