import React from 'react';
import {Link} from 'react-router-dom'
import Loader  from '../../components/Loader'
import {formatPrice} from '../../helper/data'
import Alert from '../../components/Alert'
import {sendMedicineEmail} from '../../helper/sender'
import { Button, Icon, Card, Table } from 'react-materialize';
class Medicine extends React.Component {
    constructor(props){
        super(props);
        this.state = {order_id : null,loader: true , list : [],items : [] }
    }

render(){
        var medicines = this.props.medicines;
        return (
            !medicines ? <Loader /> : 
            <div className="tab-view">                                               
                    <div className="block">
                    <div className="title text-center">Medicine List</div>
                    { medicines.length >0 ?
                    <Table hoverable responsive bordered>                  
                    <tbody>
                    <tr className="heading"><td>S/N</td><td>Name</td><td>Estimated Price</td><td>Total Quantity</td><td>Subtotal</td></tr>
                     {  medicines.map((medi,index) => {
                        return(<tr key={index}><td> {index+1}</td><td> {medi.name}</td><td> {formatPrice(medi.price)}</td><td> {medi.qty}</td><td>{formatPrice(medi.price * medi.qty)}</td></tr>)                        
                     })
                    }
                  </tbody>
                  </Table> : <h4>No Medicine</h4>
                    }
                    </div>
                </div>
           
        )
}
}

export default Medicine;