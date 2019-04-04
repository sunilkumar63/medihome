import React from 'react';
import { Tab, NavItem,Row , Col ,Nav} from 'react-bootstrap'
import { Button,Icon} from 'react-materialize';
import {
    Form,
    Input,
    ValidationTypes
  } from "super-easy-react-forms";
import General from './GeneralSection.jsx' 

class Config extends React.Component{
    constructor(props){
        super(props);
        this.state = {title : "General Information", logo : null }
        this.toggleAlert = this.toggleAlert.bind(this)
       this.saveConfig = this.saveConfig.bind(this)
    }
    async componentDidMount(){
        document.title = "Admin-System Configuration"
        var configs  =   await fetch('/admin/config/fetch',{ method: 'POST'}).then(res => res.json())
        if(configs) this.setState({configs})
}
saveConfig = (event) =>{
    event.preventDefault()
    let admin_email_address =  event.target.elements.admin_email_address.value;
    let page_title =  event.target.elements.page_title.value;
    // var files = this.refs.fileUpload.getInputDOMNode().files;
    // console.log(files); return;
    var data = {page_title : page_title , admin_email_address : admin_email_address}
    fetch('/admin/config/save', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
          }
      })
     .then( rs => rs.json())
     .then(result =>{ 
        window.location.reload();
        })
    }
toggleAlert= () =>{
    this.setState({ alert : !this.state.alert })
} 
render(){
    const {configs,logo} = this.state;
    console.log(logo)
        return(
            <div className="view content-wrapper">  
                 <div className="page-head clearfix">
                             <div className="title-wrapper">
                                <h4 className ="page-title">System Settings</h4>
                            </div>
                            <div className="control-wrapper">
                            {/* <button className ="bacbs"  onClick={() => this.props.history.goBack()}>Back</button>  */}
                            <Button waves='light' onClick={() => this.props.history.goBack()}>Back<Icon left>refresh</Icon></Button> 
                            {/* <button className ="bacbs"  onClick={() => this.props.history.goBack()}>Save</button>                              */}
             </div>
                 </div>
                     <Tab.Container className="tab" defaultActiveKey="first" id="mytab">
                    <Row className="clearfix">
                        <Col sm={2} >
                        <Nav bsStyle="pills" stacked>
                            <NavItem eventKey="first" onClick ={this.handlePageTitle}>General</NavItem>
                            {/* <NavItem eventKey="second" onClick ={this.handlePageTitle}>Admin</NavItem> */}
                            {/* <NavItem eventKey="third" onClick ={this.handlePageTitle}>Customer</NavItem> */}
                        </Nav>
                        </Col>
                        <Col sm={9} >
                        <form name="msg-box" onSubmit={this.saveConfig} >
                        <Tab.Content >
                            <Tab.Pane eventKey="first"><General configs={configs}  logo = {this.state.logo}/></Tab.Pane>
                            <Tab.Pane eventKey="second"></Tab.Pane>
                        </Tab.Content>
                        <Button waves='light' type="submit">Save<Icon left>save</Icon></Button>
                        </form>
                        </Col> 
                    </Row>
                </Tab.Container>
            </div>
          )
    }
}   

export default Config;