import React from 'react';
import Loader  from '../../components/Loader'
import {formatPrice} from '../../helper/data'
import moment  from 'moment'
import { Button, Icon, Table} from 'react-materialize';
class Ship_info extends React.Component {
    constructor(props){
        super(props);
        this.state = {order_id : null,loader: true , list : [],messages : [] }
    }
 
async componentDidMount(){
    
}

render(){
        let {order} = this.props;
        return (
            !order ? <Loader /> : 
            <div className="tab-view"> 
                {
                <div className="block">
                    {/* order.status !== 3 || order.status !== 6  */}
                        <div className="title text-center">Shipment Information</div>
                        <Table hoverable responsive bordered>   
                        <tbody>
                            <tr><td>Grand Total</td><td>{formatPrice(order.grand_total)}</td></tr>
                            <tr><td>Shipping Charge</td><td>{ formatPrice(order.shipping_charge)}</td> </tr>
                            <tr><td>Extra Charge</td><td>{ formatPrice(order.extra_charge)}</td></tr>
                            <tr><td>Tracking No</td><td>{ order.tracking_no}</td></tr>
                            <tr><td>Shipment Date</td><td>{ moment(order.updatedAt).format('MMMM Do YYYY, h:mm a') }</td></tr>
                        </tbody>
                        </Table>
                </div>
                }
            </div>
        )
}
}
export default Ship_info