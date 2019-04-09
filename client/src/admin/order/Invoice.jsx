import React from 'react';
import {Link} from 'react-router-dom'
import Loader  from '../../components/Loader'
import {sendMedicineEmail} from '../../helper/sender'
import { Button, Icon, Card, Table } from 'react-materialize';

class Invoice extends React.Component {
    constructor(props){
        super(props);
        this.state = {order_id : null,loader: true , list : [],items : [] }
        this.downloadInvoice = this.downloadInvoice.bind(this);
    }

    downloadInvoice = (order) =>{ console.log("fdfd")
        fetch(`/api/v3/order/download/invoice/1`);
    }
render(){
        var order= this.props.order;
        return (
            !order  ? <Loader /> : 
            <div className="tab-view">                                       
            <div className="block">
                {/* <div className="title text-center">Order Shipped Date</div> */}
                <Button className="red" onclick ={ this.downloadInvoice() }><Icon left>file_download</Icon>Download Invoice</Button>
                <Button className="green"><Icon left>email</Icon>Send to Customer</Button>
            </div>                           
            </div>
        )
}
}

export default Invoice;