import React from 'react';
import {Link} from 'react-router-dom'
import Loader  from '../../components/Loader'
import withFlash  from '../components/Flash'
import { Tab, NavItem,Row, Col ,Nav} from 'react-bootstrap'
import SweetAlert from 'react-bootstrap-sweetalert'
import {updateOrderStatus,shipOrder} from '../../helper/order_hlp'
import Basic  from './Basic.jsx';
import Medicine  from './Medicine.jsx';
import Prescriptions from './Prescription.jsx'  
import Shipment from './Ship_info.jsx'  
import TalkHistory from './TalkHistory.jsx'  
import { withAlert } from 'react-alert' 
import { Button, Icon, Card} from 'react-materialize';

class OrderEdit extends React.Component{
    constructor(props){
        super(props);
        this.state = {customer : null , title : "General Information" , order : null,order_id : null , cancelShip : false, alert: false,confirmTask : false}
        this.confirmShip = this.confirmShip.bind(this)
        this.toggleAlert = this.toggleAlert.bind(this)
        this.confirmOrderTask = this.confirmOrderTask.bind(this)
        this.updateOrder = this.updateOrder.bind(this)
        this.reloadOrder = this.reloadOrder.bind(this)
    }
    async componentDidMount(){
        document.title = "Admin Order #"+this.props.match.params.id
        this.setState({order_id : this.props.match.params.id})
        await fetch('/api/order/'+this.props.match.params.id+"/all")
        .then(data => data.json())
        .then(res => this.setState({order : res , order_id : this.props.match.params.id}))
}
async reloadOrder(){
    this.setState({order_id : this.props.match.params.id})
    await fetch('/api/order/'+this.props.match.params.id+"/all")
    .then(data => data.json())
    .then(res => this.setState({order : res , order_id : this.props.match.params.id}))
}
handlePageTitle = (event) =>{
    // document.title = event.target.textContent;
    this.setState({title : event.target.textContent})
}
HandlePrepare = () =>{
    this.props.history.push({
        pathname : `/admin/order/${this.state.order_id}/prepare`,
        state : this.state.order
       })
}
updateOrder = (status) =>{
    updateOrderStatus(this.state.order_id, this.state.status_id, (msg) =>{
        this.confirmOrderTask()
        this.toggleAlert()
        // this.props.alert.show('Successfully Updated', {
        //     timeout: 5000 ,
        //     type: 'success',
        //     onOpen: () => { console.log('hey') }, 
        //     onClose: () => { console.log('closed') }
        //   })
        this.reloadOrder()
    }) 
}
ship = () =>{
    this.props.history.push({
        pathname : "/admin/order/"+this.state.order_id+"/shipment",
        state : this.state.order
    })
}
confirmShip= (callback) =>{
    this.setState({cancelShip : !this.state.cancelShip})
} 
confirmOrderTask = (status = null,callback) =>{
    this.setState({confirmTask : !this.state.confirmTask,status_id : status })
} 
toggleAlert= () =>{
    this.setState({ alert : !this.state.alert })
} 
render(){
        var status  = null;
        const { order_id,order,cancelShip,alert,confirmTask,status_id} = this.state;        
        if(order) status = order.status;
        return(
            !order ? <Loader /> :  
            <div className="view content-wrapper">  
            { alert &&    
                <SweetAlert success title="Done" onConfirm={this.toggleAlert} />
            }
  {   cancelShip &&       
            <SweetAlert 
                info
                showCancel
                confirmBtnText="Yes, do it"
                confirmBtnBsStyle="success"
                cancelBtnBsStyle="success"
                title="Are you sure?"
                onConfirm={this.ship}
                onCancel= { this.confirmShip }
            >
            </SweetAlert>
}
  {   confirmTask &&       
            <SweetAlert 
                info
                showCancel
                confirmBtnText="Yes, do it"
                confirmBtnBsStyle="danger"
                cancelBtnBsStyle="success"
                title="Are you sure?"
                onConfirm={this.updateOrder}
                onCancel= { this.confirmOrderTask }
            >
            </SweetAlert>
}
                 <div className="page-head clearfix">
                             <div className="title-wrapper">
                                <h4 className ="page-title">Order Information</h4>
                            </div>
                            <div className="control-wrapper">
                            <Button waves='default' className="red" onClick={() => this.props.history.goBack()}>Back<Icon left>replay</Icon></Button>
                            <Button waves='teal' className ="blue" onClick={() => this.props.history.goBack()}>Send Email<Icon  left>email</Icon></Button>  
                            {  status !== 5 && status !== 6 && status !== 3 &&
                              <Button waves='teal' className ="light"  onClick={this.HandlePrepare}>Prepare Medicine<Icon left>alarm_add</Icon></Button>  
                            }
                            {  (status !== 0 && status !== 6)&&
                            <Button waves='teal' className ="light"  onClick={() =>this.confirmOrderTask(0)}>Cancel<Icon left>cancel</Icon></Button> 
                            }
                            {  status == 0 && status !== 3 &&
                            <Button waves='teal' className ="red"  onClick={() =>this.confirmOrderTask(2)}>Undo Cancel<Icon left></Icon></Button>
                            }
                            { (status !== 4 && status !== 5 && status !== 6 && order.status != 3 && status !== 0)   &&
                            <Button waves='yellow' className ="light"  onClick={() =>this.confirmOrderTask(4)}>Hold<Icon left>cancel</Icon></Button> 
                            }
                            {  status === 4 &&
                            <Button waves='yellow' className ="light"  onClick={() =>this.confirmOrderTask(2)}>UnHold<Icon left>cancel</Icon></Button> 
                            }
                            {  status !== 4 && status !== 3 && status !== 6 && status !== 0 && status !== 1 &&
                                 <Button waves='' className ="light"  onClick={this.confirmShip}>Ship Now<Icon left>add_shopping_cart</Icon></Button> 
                            }
                            {  (status === 3) &&
                                <Button waves='' className ="light"  onClick={() =>this.confirmOrderTask(6)}>Mark as Complete<Icon left>done_outline</Icon></Button>  
                            }
                            </div>
                 </div>
                 <div className="messages text-center">Total Amount  &#8377; { order.grand_total}</div>
                     <Tab.Container className="tab" defaultActiveKey="first" id="mytab">
                    <Row className="clearfix">
                        <Col sm={2} lg={2} >
                        <Nav bsStyle="pills" stacked>
                            <NavItem eventKey="first" onClick ={this.handlePageTitle}>Information</NavItem>
                            <NavItem eventKey="second" onClick ={this.handlePageTitle}>Medicine List</NavItem>
                            <NavItem eventKey="third" onClick ={this.handlePageTitle}>Invoices</NavItem>
                            { order.prescription &&
                            <NavItem eventKey="fourth" onClick ={this.handlePageTitle}>Prescriptions</NavItem>
                            }
                            <NavItem eventKey="five" onClick ={this.handlePageTitle}>Shipment</NavItem>
                            <NavItem eventKey="sixth" onClick ={this.handlePageTitle}>Talk History</NavItem>
                        </Nav>
                        </Col>
                        <Col sm={10} lg={10} >
                        <Tab.Content animation>
                            <Tab.Pane eventKey="first"><Basic order={order}  /></Tab.Pane>
                            <Tab.Pane eventKey="second"><Medicine medicines={order.medicines}  /></Tab.Pane>
                           <Tab.Pane eventKey="fourth"> <Prescriptions prescription ={order.prescription}/></Tab.Pane> 
                           <Tab.Pane eventKey="five"> <Shipment order ={order}/></Tab.Pane> 
                           <Tab.Pane eventKey="sixth"><TalkHistory order={order} /></Tab.Pane>
                        </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
          )
    }
}   

export default OrderEdit;