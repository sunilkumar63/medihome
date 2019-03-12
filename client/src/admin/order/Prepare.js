import React from 'react';
import {Link} from 'react-router-dom'
import Loader  from '../../components/Loader'
import Alert from '../../components/Alert'
import {sendMedicineEmail} from '../../helper/sender'
import {formatPrice} from '../../helper/data'
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
        this.remove = this.remove.bind(this)
        this.deleteRow = this.deleteRow.bind(this)
    }

    async componentDidMount(){        
        let order_id =  this.props.match.params.id
        let order  =  this.props.location.state;
        document.title = "Prepare Order #"+order_id;
        let total_tmp = 0;
        order.medicines.forEach(med =>{ console.log(med.price)
                total_tmp +=  parseFloat(med.price * med.qty)
         })

        if(order) this.setState({list : order.medicines , total_amount : total_tmp})
        if(!order && order_id)
            await fetch('/api/order/'+order_id+"/all")
            .then(data => data.json())
            .then(res => { 
                let total_tmp = 0;
                let medicines = res.medicines
                medicines.forEach(med =>{ 
                        total_tmp +=  med.price * med.qty;
                 })
                    this.setState({order : res ,order_id: order_id , list: res.medicines, items : [],success :false , total_amount : total_tmp})}
                ) 
}
addMedi = (event) =>{
    // let name =  event.target.elements.name.value;
    // let item = {name : name , qty : qty , price : price}
    this.setState( (state) => {
        state.items = state.items.concat(event);
        state.list = state.list.concat(event);
        var updated_total = event.price * event.qty;
        this.setState({total_amount : this.state.total_amount + updated_total })
        return state;
    }); 
}
remove = (id,row_index,amount) =>{
    let order_id =  this.props.match.params.id
    id && order_id &&
    fetch('/api/medicine/delete', {
        method: 'POST',
        body: JSON.stringify({_id : id , order_id : order_id}),
        headers: {
            'Content-Type': 'application/json'
          }
      })
      .then(res => res.json())
      .then(res =>{ console.log(true); 
        this.setState({total_amount : this.state.total_amount - amount })
        this.deleteRow(row_index) })
      .catch(err => console.log(err))
  }

  deleteRow = (index) =>{
    var list     = [...this.state.list];
    list.splice(index, 1);
    this.setState({list});
  }

saveMedicine = (event) =>{
var list_arr  = this.state.list;
var items_arr  = this.state.items;
var props = this.props;

if(items_arr.length > 0) {
    var data = {order_id : this.props.match.params.id , items : items_arr}
     fetch('/api/medicine/save', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
          }
      })
      .then(res => res.json())
      .then(order =>{ 
                            // if(order) this.setState({list : order.medicines , total_amount : order.grand_total}) 
                            props.history.goBack();   
                          }).catch(err => console.log(err))
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
                               <div className="messages"><span className="subtitle">You are preparing medicine list. </span></div>
                <Col className="block col-sm-6 col-lg-6">                    
                    {/* <div className="title"> Medicine List</div> */}
                    { list.length >0 ? <>
                    <table className="table">
                    <tbody>
                    <tr className="heading"><td>Name</td><td>Price</td><td>Qty</td><td>Sub Total</td><td>Action</td></tr>
                     {  list.map((medi,index) => {
                        return(<tr key={index}><td> {medi.name}</td><td> {formatPrice(medi.price)}</td><td> {medi.qty}</td><td> { formatPrice(medi.qty * medi.price)}</td>
                        <td><Button  small className="btn-sm waves-effect waves-light green" onClick={ () =>this.remove(medi._id,index,medi.price * medi.qty)} >Delete</Button></td></tr>)                        
                     })
                    }
                  </tbody>
                  </table>                 
                  <div className=""><b>Total Amount - { formatPrice(this.state.total_amount)}</b></div> </> : <h4>No Medicine</h4>
                    }
                  <button className="btn waves-effect waves-light red">  <div className="add" onClick={() => this.setState({showForm : !this.state.showForm})} ><Icon left>add_circle_outline</Icon>Add Medicine</div></button>
                </Col>
{ showForm &&
                <Col sm={5} lg={5} className="med-form block">
                        <Form id="mediform" name="mediform" className="mediForm" onSubmit={this.addMedi.bind(this)} submitText="Add To List" >
                            
                            <p>Name</p>
                            {/* <input type="text" name="name" required></input> */}
                            <Input
                                        name="name"                        
                                        // placeholder="Name"
                                        missingMessage="This field is required."
                                        shouldPreventInvalid
                                        errorMessage ="Invalid"
                                        validation={ValidationTypes.TEXT}
                                        isRequired  
                                        />
                            
                            <div className="form-group">
                            <p>Price</p>
                            {/* <input type="text" className="form-inline" name="price" required></input> */}
                            <Input
                                        name="price"                        
                                        // placeholder="Price"
                                        missingMessage="This field is required."
                                        shouldPreventInvalid
                                        errorMessage ="Invalid"
                                        validation={ValidationTypes.Number}
                                        isRequired  
                                        />
                            </div>

                            <div className="form-group">
                            <p>Quantity</p>
                            {/* <input type="text"  name="qty" required></input> */}
                            <Input
                                        name="qty"                        
                                        // placeholder="Quantity"
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