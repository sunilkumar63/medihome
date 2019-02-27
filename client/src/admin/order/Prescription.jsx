import React from 'react';
import {Link} from 'react-router-dom'
import Loader  from '../../components/Loader'
import Alert from '../../components/Alert'
import {sendMedicineEmail} from '../../helper/sender'
import { Form,Tab,NavItem , Row , Col , Nav}  from 'react-bootstrap'; 
import { Button, Icon, Card, Row1, Col1 ,CardTitle,Tag,MediaBox,Chip} from 'react-materialize';
class Prescription extends React.Component {
    constructor(props){
        super(props);
        this.state = {order_id : null,loader: true , list : [],items : [] }
    }
render(){
        var prescription = this.props.prescription;
        return (
            !prescription ? <Loader /> : 
            <div className="tab-view">                          
                    <div className="title text-center">Prescription Information</div>                  
                    <Col className="" sm="6" lg="6">
                         <MediaBox src={prescription.image_src} caption={prescription.name} width="350px"/>
                    </Col>
                    <Col className="col-sm-6 col-lg-6">
                        <div className=""><Chip>Name </Chip>{ prescription.name}</div>
                        <div className=""><Chip>Comment </Chip>{ prescription.message}</div>
                    </Col>
                    {/* { prescription &&
                    <div className="block-large">
                    <div className="">{ prescription.name}</div>
                    <div className="">{ prescription.message}</div>
                    <div className="">{ prescription.file}</div>
                    </div>
                    } */}
                    
                </div>
        )
}
}

export default Prescription;