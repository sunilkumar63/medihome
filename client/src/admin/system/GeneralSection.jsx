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
        this.saveConfig = this.saveConfig.bind(this)
    }

async componentDidMount(){
    var configs  =   await fetch('/admin/config/fetch').then(res => res.json())
    if(configs) this.setState({configs})
}
saveConfig = (data) =>{
    if(!data) return false;
    fetch('/admin/config/save', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
          }
      })
     .then( rs => rs.json())
     .then(result =>{ 
             console.log(result)
        })
    }
render(){
    var general_config,general_data =  null
    const {configs} = this.state
    if(configs) {
    configs.map( data =>{ 
        if(data.section_id === 'general'){
                 general_config = data;    
                 general_data = JSON.parse(data.values)        
                }
            })
        }
        general_data &&
        console.log("title ",general_data.page_title)
        return (
            <section className="tab-view" refs="general">                       
            <Col sm={5} lg={5} className="block">   
             {/* <Form onSubmit={this.saveConfig} name="test" ref="test" submitText ="Save">   */}
                           
                    <div className="form-group">                   
                        <label>Page Title</label>
                        <Input
                        name="page_title"                        
                        placeholder="Page title"                
                        defaultValue = { general_data && general_data.page_title }
                        validation={ValidationTypes.String}
                        missingMessage="This field is required."
                        isRequired
                        />
                    </div>
                    <div className="form-group">                   
                        <label>Admin Email Address</label>
                        <Input
                        name="admin_email_address"                        
                        // placeholder="Page title"
                        // value = "MediHome"
                        // validation={ValidationTypes.String}
                        missingMessage="This field is required."
                        />
                    </div>
                        {/* <div className="form-group">
                            <label>Logo</label>
                            <Input
                            type="file"
                            name="logo"                        
                            placeholder="Website Logo"
                            />
                        </div>               */}
                {/* </Form> */}
                </Col>
                </section>
        )
}
}

export default GeneralSection;