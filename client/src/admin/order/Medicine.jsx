import React from 'react';
import {Link} from 'react-router-dom'
import Loader  from '../../components/Loader'
import Alert from '../../components/Alert'
import {sendMedicineEmail} from '../../helper/sender'
// import { Form,Tab,NavItem , Row , Col , Nav}  from 'react-bootstrap'; 
import { Button, Icon, Card, Table } from 'react-materialize';
class Medicine extends React.Component {
    constructor(props){
        super(props);
        this.state = {order_id : null,loader: true , list : [],items : [] }
    }

async componentDidMount(){
}

render(){
        var medicines = this.props.medicines;
        return (
            !medicines ? <Loader /> : 
            <div className="tab-view">                                               
                    <div className="block">
                    <div className="title text-center">Medicine List</div>
                    { medicines.length >0 ?
                    <Table className="expand" hoverable responsive bordered>                  
                    <tbody>
                    {/* <th className="head"><td> test med</td><td> 200</td><td> 12</td></th> */}
                     {  medicines.map((medi,index) => {
                        return(<tr key={index}><td> {index+1}</td><td> {medi.name}</td><td> {medi._price}</td><td> {medi.qty}</td></tr>)                        
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