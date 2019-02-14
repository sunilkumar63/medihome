import React from 'react';
import {Link} from 'react-router-dom';

require('./css/customer.css');
require('./css/lib.css');

class Profile extends React.Component {
    constructor() {
        super();
        this.state ={customer:  [] }
    }
    componentDidMount(){
        // var customer  = JSON.parse(localStorage.getItem('customer'));
        // console.log("customer ID ",customer.id)
        // fetch(`/api/customer/${customer.id}`)
        // .then(data => data.json())
        // .then(res => this.setState({customer : res}))
        // .catch(err => console.log(err) )
    }
    
  render() { 
    const {customer} = this.props;
    // console.log("customer ",customer)
    return (
            <div className="view profile-grid">
            {/* <div className="title">Profile Information</div> */}
                <div className="view-wrapper">
                    <div className="item">
                        <div className="title">Name</div>    
                        <div className="content">{customer.full_name}</div>    
                     </div>
                     <div className="item">
                        <div className="title">Email Address</div>    
                        <div className="content">{customer.email_address}</div>    
                     </div>
                     <div className="item">
                        <div className="title">Mobile Number</div>    
                        <div className="content">{customer.mobile_no}</div>    
                     </div>
                </div>
            </div>
    )
}
}
export default Profile;