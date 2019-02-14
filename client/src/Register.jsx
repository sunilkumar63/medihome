import React from 'react';
import $ from 'jquery';
import {Link} from 'react-router-dom';
import {
    Form,
    Input,
    ValidationTypes
  } from "super-easy-react-forms";
  require('./css/customer.css');

class Register extends React.Component {

    componentDidMount(){
        $('.footer').hide();
    }
    props =  this.props;
    submit = (data) =>{
        fetch('/api/customer/register', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
              }
          })
          .then( rs => rs.json())
          .then(result => {
              this.setState({isLoggedIn :true })
              this.props.history.push('/customer/login')
             })
          .catch(err => console.log("login error #",err));
    } 
render() {
    return (
        <div className="view login">
            <div className="box content form">
                <div className="title">Create account</div>
                <Form onSubmit={this.submit.bind(this)}>
                <Input
                        name="first_name"
                        placeholder = "First Name"
                        missingMessage="This field is required."
                        validation={ValidationTypes.TEXT}
                        isRequired
                        />
                <Input
                        name="last_name"                        
                        placeholder = "Last Name"
                        missingMessage="This field is required."
                        validation={ValidationTypes.TEXT}
                        isRequired 
                        />
                <Input
                        name="password"                        
                        placeholder="Password"
                        missingMessage="This field is required."
                        isRequired
                        />   
                        <Input
                        name="mobile_no"                        
                        placeholder="Mobile No"
                        validation={ValidationTypes.Number}
                        missingMessage="This field is required."
                        isRequired
                        />
                        <Input
                        name="email_address"                      
                        // validation={ValidationTypes.email}  
                        placeholder="Email Address"
                        /> 
                    <Input
                    name="city"                        
                    placeholder="City"
                    missingMessage="This field is required."
                    isRequired
                    />    
                    <Input
                    name="shipping_address"                        
                    placeholder="Shipping Address"
                    missingMessage="This field is required."
                    isRequired
                    />    
                </Form>
                <div className="social"> <span>or sign up with social media</span></div>
                <div className="buttons">
                    <button className="facebook"><i className="fa fa-facebook"></i>Facebook</button>
                    <button className="google"><i className="fa fa-google-plus"></i>Google</button>
                </div>
                         <div className="already">Already have an account? <Link to="/login">Sign In</Link></div>
                </div>
        </div>
    )
}
}
export default Register;