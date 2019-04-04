import React from 'react';
import {Link} from 'react-router-dom'
import Loader  from '../../components/Loader'
import Alert from '../../components/Alert'
import {sendMedicineEmail} from '../../helper/sender'
import { Tab,NavItem , Row , Col , Nav}  from 'react-bootstrap'; 
import FileUpload from './LogoUpload';
import {
    Form,
    Input,
    ValidationTypes
  } from "super-easy-react-forms";

class GeneralSection extends React.Component {
    constructor(props){
        super(props);
        this.state = {configs : [] ,  selectedFile : null }
    }
    handleselectedFile = file => {
        this.setState({
          selectedFile: file[0]
        })
        this.props.logo = file[0]
      }
    // const {selectedFile} =  this.state; 
    // const data1= new FormData();
    // if(selectedFile){
    //     data1.append('file', selectedFile);
    //     data1.append('filename', selectedFile.name);
    // }

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
                    <div className="form-group">  
                        <label>Upload Logo</label>      
                        <input type="file" ref="fileupload"  ref={(ref) => this.fileUpload = ref}/>
                    </div>
                    {/* <FileUpload file = {this.handleselectedFile} isDragActive="true" required ="true"  /> */}
                </Col>
                </section>
        )
}
}

export default GeneralSection;