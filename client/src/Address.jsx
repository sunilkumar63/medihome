import React from 'react';
import {Link} from 'react-router-dom';
import Popup from "reactjs-popup";
import Flash from "./components/Flash";
import {Alert} from 'react-bootstrap';
import { Col,Preloader,ProgressBar } from 'react-materialize';
import {
    Form,
    Input,
    ValidationTypes
  } from "super-easy-react-forms";
require('./css/customer.css');
require('./css/lib.css');


class Address extends React.Component {
    constructor() {
        super();
        this.state = { addresses : null ,flash : false , close : false}
        this.submitForm = this.submitForm.bind(this)
        this.resetForm = this.resetForm.bind(this) 
        this.removeAddress = this.removeAddress.bind(this) 
    }
    componentDidMount(){        
        fetch('/api/address')
        .then(data => data.json())
        .then(res => this.setState({addresses : res}))
        .catch(err => console.error("addr fetch ", err))
    }

    submitForm = (data) =>{
        this.setState({loading : true})
        fetch('/api/customer/address', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
              }
          })
         .then( rs => rs.json())
         .then(result =>{ 
                 this.setState({loading : false , close : true});
                 window.location.reload();
         })
    } 
    resetForm () {
        this.setState({ close: false })
      }

   removeAddress = (addr_id) =>{
        addr_id &&
        fetch('/api/customer/address/remove/'+addr_id)
        .then(result =>{
                // this.setState({ flash : false})
                window.location.reload();
        })
      }
  render() { 
      const uploadStyle = {
        position: "absolute",
        right: "0px",
        top: "10px"
     }
    const {close,loading} = this.state;
    const formClass = close ? " hide" : "show "
    const thanksClass = close ? " show" : " hide "
    const {addresses} = this.state;
    return (
            <div className="view address-grid" id="address">
               <div className="upload-btn" style={uploadStyle}>
                    <Popup open={this.state.open} trigger={ <button className="bt" onClick={this.resetForm}>Add Address</button>} modal closeOnDocumentClick  >
                    {close => (
                            <div className="box-popup content form ">
                                <div className="title">Address Form</div>
                                <div className={"form-wrapper " + formClass}>
                                <Form onSubmit={this.submitForm.bind(this)} >
                                <Input
                                        name="name"                        
                                        placeholder="Name"
                                        missingMessage="This field is required."
                                        isRequired
                                        />
                                <Input
                                        name="mobile_no"                        
                                        placeholder="Mobile No"
                                        shouldPreventInvalid
                                        errorMessage ="Invalid"
                                        validation={ValidationTypes.NUMBER}
                                        missingMessage="This field is required."
                                        isRequired
                                        />
                                <Input
                                        name="pincode"                        
                                        placeholder="Pincode"
                                        missingMessage="This field is required."
                                        shouldPreventInvalid
                                        errorMessage ="Invalid"
                                        validation={ValidationTypes.NUMBER}
                                        isRequired  
                                        />         
                                <Input
                                        name="locality"                        
                                        placeholder="locality"
                                        />     
                                <Input
                                        name="city"                        
                                        placeholder="City"
                                        missingMessage="This field is required."
                                        isRequired  
                                        /> 
                                <Input
                                        name="address"                        
                                        placeholder="Address"
                                        missingMessage="This field is required."
                                        isRequired  
                                        />     
                                        { loading &&
                                        <Col s={12}>
                                                <ProgressBar />
                                        </Col>         
                                        }
                                </Form>                                             
                                </div>                           
                                <div className={"content"+thanksClass}>
                                                        <h5> Thanks! address added.</h5>
                                                        <button  className="button"  onClick={() => { close() }} >
                                                        Close
                                                </button> 
                                </div>
                            </div>
                    )}
                    </Popup>
                    </div>
                    { addresses ?
                        <div className="grid-square">
                       { addresses.map( (address,index) => { 
                                return(
                                        <div className="item" key={index}>
                                                <span className="title">{address.name}</span>
                                                <span className="sub">{address.mobile_no}</span>
                                                <span className="sub">{address.locality}</span>
                                                <span className="sub">{address.pincode}</span>
                                                <span className="sub">{address.city}</span>
                                                <span className="sub">{address.address}</span>
                                                <span className="action-wrapper">
                                                        <span className ="remove-icon" onClick={ () =>this.removeAddress(address.id)}><i className="fa fa-2x fa-trash"></i></span>
                                                        <span className ="edit-icon"><i className="fa fa-2x fa-pencil-square"></i></span>
                                                </span>
                                        </div>
                                )
                        }) }
                        </div>
                    : <h3>No Address available</h3>
                    }
            </div>
    )
}
}
export default Address;