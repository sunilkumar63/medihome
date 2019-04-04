import React from 'react';
import axios from 'axios';
import withLoader  from '../../components/LoaderHoc'
import FileUpload from '../../components/FileUpload';
  import { Button ,Select, Row, Input , Icon, TextArea,Preloader,Col} from 'react-materialize';
  require('../../css/customer.css');

class UploadForm extends React.Component {
    constructor() {
        super();
        this.handleselectedFile =  this.handleselectedFile.bind(this)
        this.handleConfirmation = this.handleConfirmation.bind(this)
        this.submit =  this.submit.bind(this)
        this.setShipping =  this.setShipping.bind(this)
        this.state = { selectedFile: null,  isConfirm : false, showAlert : false , showThanks : false  , addresses : [] }
    }

handleselectedFile = file => {
    this.setState({
      selectedFile: file[0]
    })
  }
  setShipping  =(event) =>{
      let addr_id = event.target.id
  }
  handleShow() {
    this.setState({ showAlert: !this.state.showAlert });
  }  

  handleConfirmation = (confirmed,cb) =>{
    if(confirmed) {         
        this.setState({isConfirm : true , showAlert : false }) 
        return true;
    }else{ return false}
  }

  updateAddress = (customer) =>{
    this.setState({loading : true})
      var customer_id = customer.target.value;
      if(customer_id) {
            fetch('/api/address/'+customer_id)
            .then(data => data.json())
            .then(address => this.setState({addresses : address, loading: false}))
            .catch(err => console.error("addr fetch ", err))
      }
  }
submit = (event) =>{
    event.preventDefault();
    this.setState({loading : true})
    let name =  event.target.elements.name.value;
    let shipping_address =  event.target.elements.shipping_address.value;
    let customer_id =  event.target.elements.customer_id.value;
    let message =  event.target.elements.message.value;
    const {selectedFile} =  this.state; 
    const data1= new FormData();
    const props = this.props;
    if(selectedFile){
        data1.append('file', selectedFile);
        data1.append('filename', selectedFile.name);
    }
    data1.append('message',message);
    data1.append('name', name);
    data1.append('shipping_address', shipping_address);
    data1.append('customer_id', customer_id);
    axios.post('/admin/order/save' , data1 )
                        .then(function (response) {                           
                            if(response.statusCode === 500) {
                            }else{
                                props.history.push({
                                    pathname : "/admin/orders/grid",
                                    state : response.data
                                })
                                window.Materialize.toast('Order Added', 5000) 
                            }
                          })
                            .catch((error) => {
                                this.setState({loading : false})
                                // alert("Please Upload Prescription Image")
                                window.Materialize.toast('Something Wrong', 5000) 
                                console.log("form save Error : ",error);
                        });
}

  render() { 
      const {addresses,showAlert,loading} = this.state;
      const {customers} = this.props;
      const backStyle ={
          position: "absolute",
          top:"10px",
          left:"5px"
      }
    return (
        addresses &&
        <div className="view content-wrapper">
                <div className="page-head clearfix">
                    <div className="title-wrapper"> 
                    <h4 className ="page-title">New Order </h4>
                    </div>
                    <div className="control-wrapper">
                    <Button waves='teal' className="red" onClick={() => this.props.history.goBack()}>Back<Icon left>replay</Icon></Button>
                </div>
                </div>
        {/* <Button waves='light' style={backStyle} onClick={() => this.props.history.goBack()}>Back<Icon left>replay</Icon></Button> */}
        <div className="text-center col-sm-8 col-lg-8">
                <div className="info text-center ">
                    <div className ="t1">Please Upload your prescription and type some comment , if any</div>
                    <div className ="t2"><b>Prescription should be a image and in jpg,png or jpeg format.</b></div>
                </div>
                
                <FileUpload file = {this.handleselectedFile} isDragActive="true" required ="true" />
                <form onSubmit={this.submit.bind(this)} className="order-form" method="post">
                <div className="form-group">
                 <Input l={6}  placeholder="Name/Title" name="name" validate required></Input>
                </div>
                <div className="form-group">
                <Input l={12}  type='select' placeholder="Select Customer" name="customer_id" defaultValue=""  onChange={ this.updateAddress.bind(this) } required>
                <option name="">--Select Customer--</option>
                    { customers.map((customer,index) => {
                                return <option  key={customer.id} value={customer.id} >{customer.first_name} {customer.last_name}, {customer.mobile_no}</option>
                                })
                    }                  
                </Input>
                </div>
                <div className="form-group">
                <Input l={12}  type='select' placeholder="Choose Shipping Address"  name="shipping_address" defaultValue="" required>
                <option name="">--Select Address--</option>
                    { addresses.map((address,index) => {
                                return <option  key={address.id} value={address.id} >{address.name},{address.city},{address.address}</option>
                                })
                    }                  
                </Input>
                </div>
                <div className="form-group">
                <Input type='textarea' placeholder="Message, If Any" name='message' icon="email" />
                </div>
                <Button  type='submit' className="red" ><Icon left>shopping_cart</Icon> Place Order</Button>
                { loading &&     <Preloader size='small' flashing/>   }
                </form>
                </div>
            </div>          
    )
}
}
export default withLoader('/api/customers/active' , 'customers')(UploadForm);