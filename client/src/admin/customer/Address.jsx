import React from 'react';
import Popup from "reactjs-popup";
import {Button, Col,ProgressBar } from 'react-materialize';
import {
        Form,
        Input,
        ValidationTypes
      } from "super-easy-react-forms";

class Address extends React.Component {
    constructor() {
        super();
        this.state = { addresses : null }
    }

    submitForm = (data) =>{
        data.customer_id =  parseInt(this.props.customer_id);
        this.setState({loading : true})
        fetch('/admin/customer/address/save', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
              }
          })
         .then( rs => rs.json())
         .then(result =>{ 
                //  this.setState({loading : false , close : true});
                 window.Materialize.toast('Customer Added', 5000) 
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
                window.location.reload();
        })
      }
  render() { 
    const {addresses} = this.props;
    const {close,loading} = this.state;
    const formClass = close ? " hide" : "show "
    const thanksClass = close ? " show" : " hide "
    return (
            <div className="tab-content address-grid">
                            <Popup open={this.state.open} trigger={ <button className="bt" onClick={this.resetForm}>Add Address</button>} modal closeOnDocumentClick  >
                                {close => (
                            <div className="box-popup content form ">
                                <div className="title text-center">Address Form</div>
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
                                                        <Button  className="button"  onClick={() => { close() }} >
                                                        Close
                                                </Button> 
                                </div>
                            </div>
                    )}
                    </Popup>
                    { addresses.length > 0 ?
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
                                                                <span className ="remove-icon" onClick={ () =>this.removeAddress(address.id)}><i className="fa fa-2x fa-trash"></i></span>
                                                                <span className ="edit-icon"><i className="fa fa-2x fa-pencil-square"></i></span>
                                                        </div>
                                                )
                                        }) }
                        </div>
                    : <h5>No Address available</h5>
                    }
            </div>
    )
}
}
export default Address;