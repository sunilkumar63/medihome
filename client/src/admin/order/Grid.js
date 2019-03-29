import React from 'react';
import {Link} from 'react-router-dom'
import withLoader  from '../../components/LoaderHoc'
import { Button, Icon} from 'react-materialize';
import {formatPrice} from '../../helper/data'

class OrderGrid extends React.Component{
    constructor(){
        super();
        this.state = {orders : null}
        this.editRow = this.editRow.bind(this)
    }

    componentDidMount(){
        document.title = "Order Grid"
}
editRow=(order_id) =>{
    this.props.history.push('/admin/order/'+order_id)
}
    render(){
        const {orders} = this.props;
         return(
            orders &&
            <div className="view content-wrapper">               
                <div className="page-head cleafix">
                    <div className="title-wrapper">
                        <h4 className ="page-title">Manage Orders </h4>
                    </div>
                    <div className="control-wrapper">
                    <ul className="options inline">                     
                        <li><Link to ="/admin/new/order"><Button  floating large className='' waves='light' icon='add' >Add Order</Button></Link></li>
                    </ul>
                    </div>
                </div>
                <div className = "grid-container">
                { orders && 
                    <table className="table-hover table grid-table">
                    <thead>
                        <tr><td>#</td><td>Customer Name</td><td>Grand Total</td><td>Medicines</td><td>Order Date</td><td>Status</td><td>Actions</td></tr>
                    </thead>
                    <tbody>
                        { orders.map( (order,index) => { 
                            let medicines =  order.medicines
                            return (<tr onClick={ () =>this.editRow(order.id)} key={index}><td>{order.id}</td><td>{order.customer[0].full_name}</td><td>{formatPrice(order.grand_total)}</td><td>{medicines.length}</td><td>{order.purchased_date}</td><td className={ "status "+order.status_label }>{order.status_label}</td><td><Link to={ "/admin/order/"+order.id } >View</Link></td></tr>)
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

export default withLoader('/api/orders' , 'orders')(OrderGrid );