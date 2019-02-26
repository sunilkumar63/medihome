import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import {Link} from 'react-router-dom';
// import customer_id from './helper/customer'
import FileUpload from './components/FileUpload';
import Alert from './components/Alert'
import {
    Form1,
    Inpu1t,
    TextAre1a,
    Select1,
    ValidationTypes
  } from "super-easy-react-forms";

  import { Button ,Select, Row, Input , Icon, TextArea,Preloader,Col} from 'react-materialize';
  require('./css/customer.css');

class UploadForm extends React.Component {
    constructor() {
        super();
        this.handleselectedFile =  this.handleselectedFile.bind(this)
        this.handleConfirmation = this.handleConfirmation.bind(this)
        this.submit =  this.submit.bind(this)
        this.setShipping =  this.setShipping.bind(this)
        this.state = { selectedFile: null,  isConfirm : false, showAlert : false , showThanks : false  , addresses : null }
    }
    
    componentDidMount(){ 
        var customer = JSON.parse(localStorage.getItem("customer"));
        if(customer) {
        fetch('/api/customer/'+customer.id+'/addresses')
        .then(data => data.json())
        .then(res => this.setState({addresses : res.addresses , loader: false}))
        .catch(err => console.error("addr fetch ", err))
        }else{
            // window.materialize("Invalid Customer" , 5000)
            this.props.history.push("/")
        }
        // $('.footer').hide();
    }
handleselectedFile = file => {
    this.setState({
      selectedFile: file[0]
    })
  }
  setShipping  =(event) =>{
      let addr_id = event.target.id
      console.log(addr_id);
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
submit = (event) =>{
    event.preventDefault();
    this.setState({loading : true})
    let name =  event.target.elements.name.value;
    let shipping_address =  event.target.elements.shipping_address.value;
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
    axios.post('/uploadsave' , data1 )
                        .then(function (response) {                           
                            if(response.statusCode === 500) {
                                                               
                            }else{
                                props.history.push({
                                    pathname : "/order/success",
                                    state : response.data
                                })
                            }
                          })
                            .catch((error) => {
                                this.setState({loading : false})
                                alert("Please Upload Prescription Image")
                                // window.Materialize.toast('Something Missing', 10000) 
                                console.log("form save Error : ",error);
                        });
}

  render() { 
      const {addresses,showAlert,loading} = this.state;
      const backStyle ={
          position: "absolute",
          top:"10px",
          left:"5px"
      }
    return (
        addresses &&
        <div className="view">            
        <div className="box-lg content form text-center">
        <Button waves='light' style={backStyle} onClick={() => this.props.history.goBack()}>Back<Icon left>replay</Icon></Button>
        
            <div className="title">New Order</div>
                <div className="info text-center">
                    <div className ="t1">Please Upload your prescription and type some comment , if any</div>
                    <div className ="t2 red">Prescription should be a image and in jpg,png or jpeg format.</div>
                </div>
                
                <FileUpload file = {this.handleselectedFile} isDragActive="true" required ="true" />
                <form onSubmit={this.submit.bind(this)} className="order-form" method="post">
                <Row>
                <Input l={6} label="Name/Title" placeholder="" name="name" validate required><Icon>account_circle</Icon></Input>
                <Input l={12}  type='select' label="Choose Shipping Address" placeholder="" name="shipping_address" defaultValue="" required>
                    { addresses.map((address,index) => {
                                return <option  key={address.id} value={address.id} >{address.name},{address.city},{address.address}</option>
                                })
                    }                  
                </Input>
                <Input type='textarea' label="Message, If Any" placeholder="" name='message' icon="email" />
                
                </Row>
                <Button  type='submit' className="green"  large waves='green' >Place Order</Button>
                { loading &&     <Preloader size='small' flashing/>   }
                </form>
            </div>          
            { 
                showAlert &&
                <Alert confirmed={this.handleConfirmation}/>
            }
    </div>
    )
}
}
export default UploadForm;