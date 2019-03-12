import React from 'react';
import Loader  from '../../components/Loader'
import Alert from '../../components/Alert'
import { Form, Input, ValidationTypes} from "super-easy-react-forms";
import {  Row , Col , Nav}  from 'react-bootstrap'; 
import {shipOrder} from '../../helper/order_hlp'
import { withAlert } from 'react-alert'
import {formatPrice} from '../../helper/data'
import { Button, Icon, Card} from 'react-materialize';

class Shipment extends React.Component{
    constructor(props){
        super(props);
        this.state = {order_id : null,order: null ,loader: true , list : [],shipping_charge : 0,grand_total : 0,tmp_total : 0 }
        this.getMedicines = this.getMedicines.bind(this)
        this.shipOrder = this.shipOrder.bind(this)
        this.handleShippingCharge = this.handleShippingCharge.bind(this)
        this.handleExtraCharge = this.handleExtraCharge.bind(this)
    }

    async componentDidMount(){        
        let order_id =  this.props.match.params.id
        // let order  =  this.props.location.state;      
        // if(order.status !== 2 )  this.props.history.goBack()   ;     
        if(order_id)
            await fetch('/api/order/'+order_id+"/addresses")
            .then(data => data.json())
            .then(res => {
                if(res.status !== 2 ) {                     
                     this.props.history.goBack()
                     this.props.alert.show('Already Shipped or something error', {
                        type: 'error'
                      })
                 }
                 this.setState({order : res , grand_total : res.grand_total ,tmp_total : res.grand_total })
            })
            // if(order) this.setTotals();    
}
setTotals  = async () => {
    var grand_total = 0;
    var medicines = await this.getMedicines();
    if(medicines.length > 0 )
    medicines.map(medi =>{
        grand_total +=  medi.price;
    })
    this.setState({grand_total : grand_total})
    console.log(grand_total)
}   
getMedicines = async () =>{
    var order = this.props.location.state;
    var medicines =  order.medicines;
    if(!order)  medicines = this.state.order.medicines;
    return medicines;
}
handleShippingCharge = (event) =>{
    let shipping_charge = event.target.value;
    let new_total =this.state.tmp_total;
    // let tmp_total =this.state.tmp_total;
    // if(tmp_total === 0)  tmp_total = this.setState({tmp_total : this.state.grand_total});
    if(shipping_charge === '') shipping_charge = 0
    if(shipping_charge >= 0){
        new_total =  parseFloat(shipping_charge) + parseFloat(new_total)
        this.setState({shipping_charge : shipping_charge , grand_total : new_total})
    }
}
handleExtraCharge = (event) =>{
    let extra_charge = event.target.value;
    let new_total =this.state.grand_total;
    let tmp_total =this.state.tmp_total;
    if(tmp_total === 0)  tmp_total = this.setState({tmp_total : this.state.grand_total});
    if(extra_charge === '') extra_charge = 0
    new_total = Math.round( parseInt(extra_charge) + parseFloat(tmp_total))
    this.setState({grand_total : new_total})
}
shipOrder = (event) =>{
var props = this.props;
event.preventDefault()
let order  = this.props.location.state;
let tracking_no =  event.target.elements.tracking_no.value;
let shipping_charge =  event.target.elements.shipping_charge.value;
let extra_charge =  0;//event.target.elements.extra_charge.value;
let ship_obj = {tracking_no : tracking_no ,shipping_charge : shipping_charge  , extra_charge : extra_charge , order_id :  order.id , grand_total : this.state.grand_total }
console.log(ship_obj)
if(tracking_no) {
    shipOrder(ship_obj , () =>{
        alert("Order done");
        props.history.goBack()    
    })
} else{
    props.history.goBack()
}
}
    render(){
        const {grand_total,order,shipping_charge} = this.state;
        // var order = this.props.location.state;
        // if(order)
        //  order = this.state.order;
        return(
            !order ? <Loader /> : 
            <div className="view page content-wrapper">               
                <div className="page-head clearfix">
                <Col sm={2} lg={2} className="cotrol-wrapper">     
                                <Button waves='light' className="red" onClick={() => this.props.history.goBack()}>Back<Icon left>replay</Icon></Button>
                            </Col>
                            <Col sm={5} lg={5} className="tditle-wrapper">
                                <h4 className ="page-title">Order Shipment</h4>                
                            </Col>                            
                  </div>
                  <div className="messages"><span className="subtitle">You are shipping order ID - {order.id} </span></div>
                <div className = "page-container">                
                    <Col sm={5} lg={5} className="block-large">
                    <form onSubmit={this.shipOrder} className="form" autoComplete="off">
                    <div className="form-group-lg">
                        <input
                                type="text"
                                name="tracking_no"                        
                                placeholder="Tracking/Shipment No"
                                className="form-control"
                                // validation={ValidationTypes.Number}
                                // missingMessage="This field is required."
                                required
                                />
                                </div>
                                <div className="form-group-lg">
                         <input
                                type="number"
                                name="shipping_charge"                        
                                placeholder="Enter Shipping Charge (Rs.)"
                                className="form-control"
                                onChange= {this.handleShippingCharge}
                                />              
                                </div>
                                {/* <div className="form-group-lg">
                        <input
                                type="number"
                                name="extra_charge"     
                                className="form-control"                   
                                placeholder="Extra Charge (in Rs.)"
                                onChange= {this.handleExtraCharge}
                                />                             
                                </div>                    */}
                                 <Button name="submit"  waves='orange' className="light"  type="submit">Ship Now<Icon left>save</Icon></Button>
                </form>

                    </Col>
                    <Col sm={5} lg={5} className="block-large">                        
                        <div className="total currency">Shipping Charge  :: {formatPrice(shipping_charge)} </div>
                        <div className="total currency">Grand Total :: { formatPrice(grand_total) }</div>
                    </Col>
                </div>
                </div>
          
        )
    }
}
export default withAlert(Shipment);