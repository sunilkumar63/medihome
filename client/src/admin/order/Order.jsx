import React from 'react';
import {Link} from 'react-router-dom';

class Order extends React.Component {
    constructor() {
        super();
        this.state = { orders : null }
    }
    componentDidMount(){
        fetch('/api/orders/')
        .then(data => data.json())
        .then(res => this.setState({orders : res}))
    }
    
  render() { 
    const {orders} = this.state;
    return (
            <div className="tab-content">
            {/* <div className="title">Order History</div> */}
            { orders ?
                <table className="table"><tbody>
                    <tr><th>#</th><th>Items</th><th>Uploaded Prescription</th><th>Grand Total</th><th>Ordered On</th></tr>
                    { orders.map( (item,index) => {
                    return (<tr key={index}><td>{item.id}</td><td>{item.items}</td><td>{item.prescription_id}</td>
                    <td>{item.grand_total}</td><td>{item.createdAt}</td></tr>)
                     })
                   }
                   </tbody>
                </table>
             : <h3>No order available</h3>
            }
            </div>
    )
}
}
export default Order;