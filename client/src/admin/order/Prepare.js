import React from 'react';
import {Link} from 'react-router-dom'
import Loader  from '../../components/Loader'
import Alert from '../../components/Alert'
import {sendMedicineEmail} from '../../helper/sender'
// import { Form, Input,TextArea,  ValidationTypes} from "super-easy-react-forms";
import { Form,Tab,NavItem , Row , Col , Nav}  from 'react-bootstrap'; 
import { Input}  from 'react-materialize'; 
import { Button, Icon, Card} from 'react-materialize';
import {
    Form,
    Input,
    ValidationTypes
  } from "super-easy-react-forms";
class Prepare extends React.Component{
    constructor(props){
        super(props);
        this.state = {order_id : null,loader: true , list : [], showForm: false , items : [] }
        this.addMedi = this.addMedi.bind(this)
        this.saveMedicine = this.saveMedicine.bind(this)
    }

    async componentDidMount(){        
        let order_id =  this.props.match.params.id
        let order  =  this.props.location.state;
        document.title = "Prepare Order #"+order_id;
        if(order) this.setState({list : order.medicines})
        if(!order && order_id)
            await fetch('/api/order/'+order_id+"/all")
            .then(data => data.json())
            .then(res => this.setState({order : res ,order_id: order_id , list: res.medicines, items : [],success :false }) )
}
addMedi = (event) =>{
    event.preventDefault()
    let name =  event.target.elements.name.value;
    let qty =  event.target.elements.qty.value;
    let price =  event.target.elements.price.value;
    let item = {name : name , qty : qty , price : price}
    this.setState( (state) => {
        state.items = state.items.concat(item);
        state.list = state.list.concat(item);
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
        var {list ,showForm ,order,success} = this.state;
        var order = this.props.location.state;
        if(order && list)
        return(
            !order ? <Loader /> : 
            <div className="view page content-wrapper">               
                <div className="page-head clearfix">
                             <div className="title-wrapper">
                                <h4 className ="page-title">Prepare Medicine List</h4>                
                            </div>
                            <div className="control-wrapper">     
                                <Button waves='light' className="red" onClick={() => this.props.history.goBack()}>Back<Icon left>replay</Icon></Button>
                                <Button waves='orange' className="light" onClick={this.saveMedicine}>Save<Icon left>save</Icon></Button>
                                {/* <Button waves='green' className="light" onClick={sendMedicineEmail(order)}>Send to Customer<Icon left>send</Icon></Button> */}
                               </div>
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
                </Col>
{ showForm &&
                <Col sm={5} lg={5} className="med-form block">
                        <form id="mediform" name="mediform" className="form-horizontal" onSubmit={this.addMedi}>
                            <div className="form-group">
                            <label>Name</label>
                            <input type="text" name="name" required></input>
                            </div>
                            <Input
                                        name="pincode"                        
                                        placeholder="Pincode"
                                        missingMessage="This field is required."
                                        shouldPreventInvalid
                                        errorMessage ="Invalid"
                                        validation={ValidationTypes.NUMBER}
                                        isRequired  
                                        />  
                            <div className="form-group">
                            <label>Price</label>
                            <input type="text" className="form-inline" name="price" required></input>
                            </div>

                            <div className="form-group">
                            <label>Quantity</label>
                            <input type="text"  name="qty" required></input>
                            </div>
                            <Button type="submit" waves='light' className="red">Add To List<Icon left>add</Icon></Button>
                        </form>
                </Col>    
}
            </div>
          
        )
    }
}

export default Prepare;