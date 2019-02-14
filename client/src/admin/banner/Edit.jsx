import React from 'react';
import {Link} from 'react-router-dom'
import { Tab, NavItem,Row , Col ,Nav} from 'react-bootstrap'

import Loader  from '../../components/Loader'

require('../../css/customer.css');
require('../../css/lib.css');
class Edit extends React.Component{
    constructor(){
        super();
        this.state = {customer : null , title : "General Information" , customer_id : null,loader: true}
    }
    componentDidMount(){
        document.title = "My Account"
        fetch('/api/customer/'+this.props.match.params.id+'/all')
        .then(data => data.json())
        .then(res => this.setState({customer : res , loader: false}))
        .catch(err => console.error("addr fetch ", err))
}
handlePageTitle = (event) =>{
    // document.title = event.target.textContent;
    this.setState({title : event.target.textContent})
}

    render(){
        const { customer } = this.state;
        return(
            this.state.loader ? <Loader /> : customer &&
            <div className="view content-wrapper">       
            <button className ="btn waves-effect red"  onClick={() => this.props.history.goBack()}><i class="material-icons left">replay</i>Back</button>        
                <div className="title text-center">My Account</div>
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
                       
                    </Row>
                </Tab.Container>
            </div>
          )
    }
}

export default Edit;