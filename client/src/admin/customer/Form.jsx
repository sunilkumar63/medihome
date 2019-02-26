import React from 'react';
import {Link} from 'react-router-dom';
import Loader  from '../../components/Loader'
import { Button, Icon,Row,Card,CardPanel} from 'react-materialize';
import {
    Form,
    Input,
    ValidationTypes
  } from "super-easy-react-forms";
// import {Form,Col,Row} from 'react-bootstrap';

class NewForm extends React.Component {
    constructor(props) {
        super(props);  
        this.state ={customer:  [] ,is_mobileValid : true}
    }
    validateMobileNo = (event) =>{
        let mobile_no =  event.target.getAttribute('value');
        if(typeof mobile_no == "String") alert("Enter Number Only");
        var data = {entity : 'customer', attribute : "mobile_no", value : mobile_no}
        fetch('/api/data/validator', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
              }})
              .then(res =>res.json()).then(exist =>{
                if(exist){ this.setState({ is_mobileValid : false });  }
               else this.setState({ is_mobileValid : true })
        })
    }
    submit = (data) =>{
        if(!this.state.is_mobileValid) { window.Materialize.toast('Mobile No. Already Exist', 3000)  ; return; }
        fetch('/api/customer/register', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
              }
          })
          .then( rs => rs.json())
          .then(result => {
              if(result){
                window.Materialize.toast('Customer Added', 5000) 
                this.props.history.push('/admin/customers/grid')
              }
             })
          .catch(err => { console.log("login error #",err);  window.Materialize.toast('Something wrong', 5000)  });
    } 
    saveForm = () =>{
        this.refs['myForm'].onSubmit()
    }
    render(){
        const { is_mobileValid} = this.state;
        return(
            <div className="view content-wrapper">
            <div className="page-head clearfix">
                    <div className="title-wrapper"> 
                    <h4 className ="page-title">New  Customer </h4>
                    </div>
                    <div className="control-wrapper">
                    <Button waves='teal' className="red" onClick={() => this.props.history.goBack()}>Back<Icon left>replay</Icon></Button>
                    {/* <Button waves='light' className="light">Save<Icon left>save</Icon></Button> */}
                </div>
                </div>

                <div className="form-wrapper col-sm-6 col-lg-6">
                    <Form onSubmit={this.submit.bind(this)} autoComplete="off" ref="myForm">
                            <Input
                                    name="first_name"
                                    placeholder = "First Name"
                                    missingMessage="This field is required."
                                    shouldPreventInvalid
                                    validation={ValidationTypes.TEXT}
                                    isRequired
                                    />
                            <Input
                                    name="last_name"                        
                                    placeholder = "Last Name"
                                    missingMessage="This field is required."
                                    shouldPreventInvalid
                                    validation={ValidationTypes.TEXT}
                                    isRequired 
                                    />
                            <Input
                                    name="password"                        
                                    placeholder="Password"
                                    missingMessage="This field is required."
                                    isRequired
                                    />   
                                    <Input
                                        name="mobile_no"                        
                                        placeholder="Mobile No"
                                        missingMessage="This field is required."
                                        shouldPreventInvalid
                                        errorMessage ="Invalid"
                                        validation={ValidationTypes.NUMBER}
                                        onKeyUp={this.validateMobileNo.bind(this) }
                                        isRequired  
                                        /> 
                                        { !is_mobileValid &&
                                            <div className="error">Mobile No. Already Exist</div>
                                        }
                                    <Input
                                    name="email_address"                      
                                    // validation={ValidationTypes.email}  
                                    placeholder="Email Address"
                                    /> 
                            </Form>

              </div>
            </div>
        )
    }
}

export default NewForm;