import React from 'react';
import Loader  from '../../components/Loader'
import AlertCustom from '../../components/Alert'
import {notifyCustomer} from '../../helper/sender'
import { Form,Tab,NavItem , Row , Col , Nav}  from 'react-bootstrap'; 
import { Alert } from 'react-alert'
import moment  from 'moment'
import { withAlert } from 'react-alert'
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
                <div className="block">
                        <div className="title text-center">Shipment Information</div>
                        <Table hoverable responsive bordered>   
                        <tbody>
                            <tr><td>Grand Total</td><td>{ order.grand_total}</td></tr>
                            <tr><td>Shipping Charge</td><td>{ order.shipping_charge}</td> </tr>
                            <tr><td>Extra Charge</td><td>{ order.extra_charge}</td></tr>
                            <tr><td>Tracking No</td><td>{ order.tracking_no}</td></tr>
                            <tr><td>Shipment Date</td><td>{ order.updatedAt}</td></tr>
                        </tbody>
                        </Table>
                </div>
            </div>
        )
}
}
export default Ship_info