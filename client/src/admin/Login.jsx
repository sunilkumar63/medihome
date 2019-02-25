import React from 'react';
import $ from 'jquery';
import {Redirect} from 'react-router-dom';
import Header from './components/Header'
import { Button, Icon, Card} from 'react-materialize';
import {
    Form,
    Input,
    ValidationTypes
  } from "super-easy-react-forms";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAdminLoggedIn: false,
          error : false
        }
        document.title = "MadiHome - Admin Login"
      }
    componentDidMount(){
        const isAuth = localStorage.getItem("isAuthenticated")
        // if(isAuth) this.props.history.push("/admin") 
    }

submit = (data) =>{
    var props = this.props;
    console.log(this.props)
    fetch('/api/admin/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
          }
      })
     .then( rs => rs.json())
     .then(result =>{  
         if(!result ) {
             window.Materialize.toast('Incorrect Credentials', 5000) 
             this.setState({ isAdminLoggedIn : false, error : true  }); 
         }
        else{
            window.Materialize.toast('Great!!, Now,You have Admin Powers ', 5000) 
            // this.setState({ isAdminLoggedIn : true, error : false  }) 
            localStorage.setItem("admin_id", result.id)
            localStorage.setItem("isAuthenticated",true)
            this.props.history.push({pathname : "/admin"  ,state  : { "fromLogin" : true }});
        }
     })
} 
render() {
    const {  error ,isAdminLoggedIn} = this.state;
    const isAuth = localStorage.getItem("isAuthenticated")
    var showClass = error ? "show" : "hide";
    console.log(error)
    return (   
        <div className="view admin-plain">          
            <div className="page">                        
            <div className="messages error text-center">
                <div className ="message">MediHome - Admin Panel</div>
             </div>
             <div className="text-center">
                <h5 className ="content">Hey ! Good to see you</h5>
             </div>
                <div className="box content form">
                
                    <div className="title text-center">Admin Login</div>
                    {
                            // <div className={"messages error text-center "+showClass}>
                            //     <div className ="message">Incorect Login Credentials</div>
                            // </div>
                    }
                    <Form onSubmit={this.submit.bind(this)}>
                    <Input
                            name="mobile_no"                        
                            placeholder="Mobile No"
                            value = "123456789"
                            validation={ValidationTypes.Number}
                            missingMessage="This field is required."
                            isRequired
                            />
                    <Input
                            name="password"                        
                            placeholder="Password"
                            missingMessage="This field is required."
                            autoComplete =  "off"
                            isRequired
                            />                              
                    </Form>
                    </div>
            </div>
        </div>
    )
}
}
export default Login;