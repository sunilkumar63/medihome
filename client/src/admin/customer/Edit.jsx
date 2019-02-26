import React from 'react';
import {Link} from 'react-router-dom'
import { Tab, NavItem,Row , Col ,Nav} from 'react-bootstrap'
import {updateCustomer} from '../../helper/customer'
import Profile  from './Profile.jsx';
import PrescriptionList from './Pres.jsx'  
import Loader  from '../../components/Loader'
import Address from './Address.jsx'  
import Order from './Order.jsx'  
require('../../css/customer.css');
require('../../css/lib.css');
class Edit extends React.Component{
    constructor(){
        super();
        this.state = {customer : null , title : "General Information" , customer_id : null,loader: true}
        this.updateData = this.updateData.bind(this)
    }
    componentDidMount(){
        document.title = "My Account"
        fetch('/api/customer/'+this.props.match.params.id+'/all')
        .then(data => data.json())
        .then(res => this.setState({customer : res , loader: false}))
        .catch(err => console.error("addr fetch ", err))
}
handlePageTitle = (event) =>{
    this.setState({title : event.target.textContent})
}
updateData = (value) =>{
    const data = {id : this.props.match.params.id , update_data : { "status" : value }}
        updateCustomer(data, (result) =>{
            // window.Materialize.toast('Customer Updated', 3000) 
            setTimeout(window.location.reload() , 1000)
    }) 
}

    render(){
        const { customer } = this.state;
        return(
            this.state.loader ? <Loader /> : customer &&
            <div className="view content-wrapper">  
            <div className="page-head clearfix">
                             <div className="title-wrapper">
                                <h4 className ="page-title">My Account</h4>                
                            </div>
                            
                            <div className="control-wrapper">     
                                    <button className ="btn waves-effect red"  onClick={() => this.props.history.goBack()}><i className="material-icons left">replay</i>Back</button>        
                                { customer.status == 1 &&
                                    <button className ="btn waves-effect green"  onClick={() => this.updateData(0) }><i className="material-icons left">block</i>Make Inactive</button>        
                                }
                                { customer.status == 0 &&
                                    <button className ="btn waves-effect green"  onClick={() => this.updateData(1) }><i className="material-icons left">play_arrow</i>Make Active</button>        
                                }
                                    <button className ="btn waves-effect blue small"  onClick={() => this.props.history.goBack()}><i className="material-icons left">delete</i>Delete</button>        
                               </div>
                               </div>
                   { customer.status == 0 &&
                    <div className="messages error text-center"><i className="material-icons">block</i>This Customer is Not Active.</div>
                }
                     <Tab.Container className="tab" defaultActiveKey="first" id="mytab">
                    <Row className="clearfix">
                        <Col sm={2} >
                        <Nav bsStyle="pills" stacked>
                            <NavItem eventKey="first" onClick ={this.handlePageTitle}>Information</NavItem>
                            <NavItem eventKey="second" onClick ={this.handlePageTitle}>Orders</NavItem>
                            <NavItem eventKey="third" onClick ={this.handlePageTitle}>Addresses</NavItem>
                            <NavItem eventKey="fourth" onClick ={this.handlePageTitle}>Prescriptions</NavItem>
                        </Nav>
                        </Col>
                        <Col sm={9} >
                        <Tab.Content animation>
                            <Tab.Pane eventKey="first"><Profile customer = {customer}  /></Tab.Pane>
                            <Tab.Pane eventKey="second"><Order orders = {customer.orders} /></Tab.Pane>
                           <Tab.Pane eventKey="third"> <Address customer_id ={this.props.match.params.id} addresses = {customer.addresses}/></Tab.Pane>
                              <Tab.Pane eventKey="fourth"><PrescriptionList presc = {customer.presc} /></Tab.Pane>
                        </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
          )
    }
}

export default Edit;