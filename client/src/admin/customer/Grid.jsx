import React from 'react';
import {Link} from 'react-router-dom'
import withLoader  from '../../components/LoaderHoc'
import { Button, Icon, Card, Row, Col } from 'react-materialize';
class Grid extends React.Component{

    constructor(){
        super();
        this.state = {customer : null}
    }

editRow=(order_id) =>{
    this.props.history.push('/admin/customer/'+order_id)
}
    render(){
        const {customers} = this.props;
        return(
            <div className="view content-wrapper">              
                <div className="page-head cleafix">
                    <div className="title-wrapper">
                        <h4 className ="page-title">Manage Customers </h4>
                    </div>
                    <div className="control-wrapper">
                    <ul className="options inline">                     
                        <li><Link to ="/admin/custome/new"><Button  floating large className='' waves='light' icon='add' >Add Customer</Button></Link></li>
                    </ul>
                    </div>
                </div>
                <div className = "grid-container">
                { customers &&
                    <table className="table-hover table">
                    <thead>
                        <tr><td>#</td><td>Name</td><td>Email Address</td><td>Mobile No.</td><td>Status</td><td>Actions</td></tr>
                    </thead>
                    <tbody>
                        { customers.map( (customer,index) => {
                            return (<tr onClick={ () =>this.editRow(customer.id)} key={index}><td>{customer.id}</td><td>{customer.full_name}</td><td>{customer.email_address}</td><td>{customer.mobile_no}</td><td>{customer.status_label}</td><td><Link to={ "/admin/customer/"+customer.id } >Edit</Link></td></tr>)
                        }) 
                        }
                    </tbody>
                    </table>
                }
                </div>

             </div>
        )
    }
}

export default withLoader('/api/customers','customers')(Grid);