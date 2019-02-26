import React from 'react';
import {Link} from 'react-router-dom';
import moment  from 'moment'
import { Col} from 'react-bootstrap'
import {Icon} from 'react-materialize'

class Profile extends React.Component {
    constructor(props) {
        super(props);  
        this.state ={customer:  [] }
    }
  render() { 
    const {customer} = this.props;
        return (
            <div className="tab-view">
                    <Col sm={12} lg={12} >
                        <div className="block">
                            <div className="title"><i className="material-icons">info</i>Information<Icon right onClick={() =>alert("fd")}>edit</Icon></div>
                            <div className="sub"><div><span className="label">First Name</span> {customer.first_name}</div></div>  
                            <div className="sub"><div><span className="label">Last Name</span> {customer.last_name}</div></div> 
                            { customer.email_address &&
                            <div className="sub"><div><span className="label">Email Address</span><Link to={"mailto:"+customer.email_address}> {customer.email_address}</Link></div></div> 
                            }
                            { customer.mobile_no &&
                            <div className="sub"><div><span className="label">Mobile No</span><a href={"tel:+91"+customer.mobile_no}> +91{customer.mobile_no}</a></div></div> 
                            }
                            <div className="sub"><div><span className="label">Customer Since</span> { moment(customer.createdAt).format('MMMM Do YYYY')}</div></div> 
                        </div>
                   </Col>
            </div>
    )
}
}
export default Profile;