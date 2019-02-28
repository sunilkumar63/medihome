import React from 'react';
import {Link} from 'react-router-dom'
import Loader  from '../../components/Loader'
import Alert from '../../components/Alert'
import {sendMedicineEmail} from '../../helper/sender'
// import { Form, Input,TextArea,  ValidationTypes} from "super-easy-react-forms";
import { Tab,NavItem , Row , Col , Nav}  from 'react-bootstrap'; 
// import { Input}  from 'react-materialize'; 
import { Button, Icon, Card} from 'react-materialize';
import {
    Form,
    Input,
    ValidationTypes
  } from "super-easy-react-forms";
class Prepare extends React.Component{
    constructor(props){
        super(props);
        this.state = {order_id : null,loader: true , list : [], showForm: false , items : [] ,total_amount : 0 }
        this.addMedi = this.addMedi.bind(this)
        this.saveMedicine = this.saveMedicine.bind(this)
    }

    async componentDidMount(){        
        let order_id =  this.props.match.params.id
        let order  =  this.props.location.state;
        document.title = "Prepare Order #"+order_id;
        let total_tmp = 0;
        order.medicines.forEach(med =>{ console.log(med.price)
total_tmp +=  parseFloat(med.price)
         })

        if(order) this.setState({list : order.medicines , total_amount : total_tmp})
        if(!order && order_id)
            await fetch('/api/order/'+order_id+"/all")
            .then(data => data.json())
            .then(res => { 
                let total_tmp = 0;
                let medicines = res.medicines
                medicines.forEach(med =>{ console.log(med.price)
total_tmp +=  med.price;
                 })
                    this.setState({order : res ,order_id: order_id , list: res.medicines, items : [],success :false , total_amount : total_tmp})}
                ) 
}
addMedi = (event) =>{
    // console.log(event); return;
    // event.preventDefault()
    // let name =  event.target.elements.name.value;
    // let qty =  event.target.elements.qty.value;
    // let price =  event.target.elements.price.value;
    // let item = {name : name , qty : qty , price : price}
    this.setState( (state) => {
        state.items = state.items.concat(event);
        state.list = state.list.concat(event);
        return state;
    }); 
}

saveMedicine = (event) =>{
var list_arr  = this.state.list;
var items_arr  = this.state.items;
var props = this.props;

if(items_arr.length > 0) {
items_arr.map(medicine =>{
    medicine.order_id =this.props.match.params.id
     fetch('/api/medicine/save', {
        method: 'POST',
        body: JSON.stringify(medicine),
        headers: {
            'Content-Type': 'application/json'
          }
      })
      .then(res => res.json())
      .then(res =>{ props.history.goBack() ;console.log(res) }).catch(err => console.log(err))
})
} else{
    props.history.goBack()
}
}
    render(){
        var {list ,showForm ,order,success,total_amount} = this.state;
        var order = this.props.location.state;
        if(order && list)
        return(
            !order ? <Loader /> : 
            <div className="view page content-wrapper">               
                <div className="page-head clearfix">
                            <Col sm={5} lg={5} className="tditle-wrapper">
                                <h4 className ="page-title">Prepare Medicine List</h4>                
                            </Col>
                            <Col sm={5} lg={5} className="codntrol-wrapper">     
                                <Button waves='light' className="red" onClick={() => this.props.history.goBack()}>Back<Icon left>replay</Icon></Button>
                                <Button waves='orange' className="light" onClick={this.saveMedicine}>Save<Icon left>save</Icon></Button>
                                <Button waves='green' className="light" onClick={sendMedicineEmail(order)}>Send to Customer<Icon left>send</Icon></Button>
                               </Col>
                               </div>
                  
                <Col className="block col-sm-6 col-lg-6">                    
                    <div className="title"> Medicine List</div>
                    { list.length >0 ?
                    <table className="table">
                    {/* <div className="head"><soa>Name</td><td>Price</td><td>Qty</td></th> */}
                    <tbody>
                     {  list.map((medi,index) => {
                        return(<tr key={index}><td> {medi.name}</td><td> {medi.price}</td><td> {medi.qty}</td></tr>)                        
                     })
                    }
                  </tbody>
                  </table> : <h4>No Medicine</h4>
                    }
                    
                    <div className="add" onClick={() => this.setState({showForm : !this.state.showForm})} ><Icon left>add_circle_outline</Icon>Add Medicine</div>
                    <div className="messages error text-center"><i className="material-icons">block</i>Total Amount - { this.state.total_amount}</div>
                </Col>
{ showForm &&
                <Col sm={5} lg={5} className="med-form block">
                        <Form id="mediform" name="mediform" className="mediForm" onSubmit={this.addMedi.bind(this)} submitText="Add To List">
                            <div className="form-group">
                            {/* <label>Name</label> */}
                            {/* <input type="text" name="name" required></input> */}
                            <Input
                                        name="name"                        
                                        placeholder="Name"
                                        missingMessage="This field is required."
                                        shouldPreventInvalid
                                        errorMessage ="Invalid"
                                        validation={ValidationTypes.TEXT}
                                        isRequired  
                                        />
                            </div>
                            <div className="form-group">
                            {/* <label>Price</label> */}
                            {/* <input type="text" className="form-inline" name="price" required></input> */}
                            <Input
                                        name="price"                        
                                        placeholder="Price"
                                        missingMessage="This field is required."
                                        shouldPreventInvalid
                                        errorMessage ="Invalid"
                                        validation={ValidationTypes.Number}
                                        isRequired  
                                        />
                            </div>

                            <div className="form-group">
                            {/* <label>Quantity</label> */}
                            {/* <input type="text"  name="qty" required></input> */}
                            <Input
                                        name="qty"                        
                                        placeholder="Quantity"
                                        missingMessage="This field is required."
                                        shouldPreventInvalid
                                        errorMessage ="Invalid"
                                        validation={ValidationTypes.Number}
                                        isRequired  
                                        />
                            </div>
                            {/* <Button type="submit" waves='light' className="red">Add To List<Icon left>add</Icon></Button> */}
                        </Form>
                </Col>    
}
            </div>
          
        )
    }
}

export default Prepare;