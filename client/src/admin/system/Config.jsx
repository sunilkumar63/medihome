import React from 'react';
import {Link} from 'react-router-dom'
import Loader  from '../../components/Loader'
import withFlash  from '../components/Flash'
import { Tab, NavItem,Row , Col ,Nav} from 'react-bootstrap'
import {
    Form,
    Input,
    ValidationTypes
  } from "super-easy-react-forms";
import SweetAlert from 'react-bootstrap-sweetalert'
import {updateOrderStatus,shipOrder} from '../../helper/order_hlp'
import General from './GeneralSection.jsx' 

class Config extends React.Component{
    constructor(props){
        super(props);
        this.state = {title : "General Information" }
        this.toggleAlert = this.toggleAlert.bind(this)
      //  this.saveConfig = this.saveConfig.bind(this)
    }
    async componentDidMount(){
        document.title = "Admin-System Configuration"
        // this.setState({order_id : this.props.match.params.id})
        // await fetch('/api/order/'+this.props.match.params.id+"/all")
        // .then(data => data.json())
        // .then(res => this.setState({order : res , order_id : this.props.match.params.id}))
}
saveConfig = (data) =>{
    console.log(data); return;
    fetch('/admin/config/save', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
          }
      })
     .then( rs => rs.json())
     .then(result =>{ 
             alert('saved')
        })
    }

toggleAlert= () =>{
    this.setState({ alert : !this.state.alert })
} 
render(){
        return(
            <div className="view content-wrapper">  
                 <div className="page-head clearfix">
                             <div className="title-wrapper">
                                <h4 className ="page-title">System Settings</h4>
                            </div>
                            <div className="control-wrapper">
                            <button className ="bacbs"  onClick={() => this.props.history.goBack()}>Back</button>  
                            <button className ="bacbs"  onClick={() => this.props.history.goBack()}>Save</button>                             
             </div>
                 </div>
                     <Tab.Container className="tab" defaultActiveKey="first" id="mytab">
                    <Row className="clearfix">
                        <Col sm={2} >
                        <Nav bsStyle="pills" stacked>
                            <NavItem eventKey="first" onClick ={this.handlePageTitle}>General</NavItem>
                            <NavItem eventKey="second" onClick ={this.handlePageTitle}>Admin</NavItem>
                            <NavItem eventKey="third" onClick ={this.handlePageTitle}>Customer</NavItem>

                        </Nav>
                        </Col>
                        <Col sm={9} >
                        <Form onSubmit={this.saveConfig.bind(this)} submitText="SAVE">                
                        <Tab.Content >
                            <Tab.Pane eventKey="first"><General /></Tab.Pane>
                            <Tab.Pane eventKey="second"></Tab.Pane>
                        </Tab.Content>
                        </Form>
                        </Col> 
                    </Row>
                </Tab.Container>
            </div>
          )
    }
}   

export default Config;