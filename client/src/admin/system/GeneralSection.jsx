import React from 'react';
import {Link} from 'react-router-dom'
import Loader  from '../../components/Loader'
import Alert from '../../components/Alert'
import {sendMedicineEmail} from '../../helper/sender'
import { Tab,NavItem , Row , Col , Nav}  from 'react-bootstrap'; 
import {
    Form,
    Input,
    ValidationTypes
  } from "super-easy-react-forms";
class GeneralSection extends React.Component {
    constructor(props){
        super(props);
        this.state = {configs : [] }
    }
render(){
    var general_config,general_data =  null
    const {configs} = this.props
    if(configs) {
    configs.map( data =>{ 
        if(data.section_id === 'general'){
                 general_config = data;    
                 general_data = JSON.parse(data.values)        
                }
            })
        }
        return (
            <section className="tab-view config-page" refs="general">                       
            <Col sm={12} lg={12} className="">   
                    <div className="form-group">                   
                        <label>Website Title</label>
                        <input
                        name="page_title"                        
                        placeholder="Page title"                
                        defaultValue = { general_data && general_data.page_title }
                        />
                    </div>
                    <div className="form-group">                   
                        <label>Admin Email Address</label>
                        <input
                        name="admin_email_address"                        
                        placeholder="Page title"
                        defaultValue = { general_data && general_data.admin_email_address }
                        />
                    </div>
                </Col>
                </section>
        )
}
}

export default GeneralSection;