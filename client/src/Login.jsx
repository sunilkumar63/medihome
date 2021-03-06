import React from 'react';
import $ from 'jquery';
import Flash from './components/Flash';
import FlashMassage from 'react-flash-message';
// import axios from 'axios';
import {Link} from 'react-router-dom';
import { Redirect } from 'react-router'
import {
    Form,
    Input,
    ValidationTypes
  } from "super-easy-react-forms";
  require('./css/customer.css');

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isLoggedIn: false,
          error : false
        }
        document.title = "Medihome - Login"
      }
    componentDidMount(){
        $('.footer').hide();
    }
submit = (data) =>{
    fetch('/api/customer/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
          }
      })
     .then( rs => rs.json())
     .then(result =>{ 
         if(!result ) {
           // window.Materialize.toast('Incorrect Credentials', 5000) 
             this.setState({ isLoggedIn : false, error : true  }); 
         }
        else{
            this.setState({ isLoggedIn : true, error : false  }) 
            localStorage.setItem('customer', JSON.stringify(result));
            localStorage.setItem('is_logged', true) 
            this.props.history.push("/customer/account");
        }
     })
} 
render() {
    const {  error } = this.state;
    return (   
        <div className="view login">            
            <div className="box content form">
                <div className="title">Login</div>
                { error &&
                    <div className="messages error text-center">
                        <div className ="message">Incorect Login Credentials</div>
                    </div>
                }
                <Form onSubmit={this.submit.bind(this)}>
                <Input
                        name="mobile_no"                        
                        placeholder="Mobile No"
                        value = ""
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
                <Link to="/customer/register"><button className="no-margin"><i className="fa fa-email"></i>Sign Up</button> </Link>
                <div className="social"> <span>or sign up with social media</span></div>
                <div className="buttons">
                    <button className="facebook"><i className="fa fa-facebook"></i>Facebook</button>
                    <button className="google"><i className="fa fa-google-plus"></i>Google</button>
                </div>
                </div>
        </div>
    )
}
}
export default Login;