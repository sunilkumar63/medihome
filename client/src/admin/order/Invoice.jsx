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

    downloadInvoice = (order) =>{ 
        order &&
        fetch('/api/order/download/invoice/'+order.id).then(res =>res.json())
        .then((data) =>{
            // if(data.filepath) window.open(`http://localhost:3001/${data.filepath}`)
        })
    }
render(){
        var order= this.props.order;
        return (
            !order  ? <Loader /> : 
            <div className="tab-view">                                       
            <div className="block">
                {/* <div className="title text-center">Order Shipped Date</div> */}
                <Button className="red" onClick ={ () => this.downloadInvoice(order) }><Icon left>file_download</Icon>Download Invoice</Button>
                <Button className="green"><Icon left>email</Icon>Send to Customer</Button>
            </div>                           
            </div>
        )
}
}

export default Invoice;