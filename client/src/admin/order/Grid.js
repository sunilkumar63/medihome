import React from 'react';
import {Link} from 'react-router-dom'
import withLoader  from '../../components/LoaderHoc'
import { Button, Icon} from 'react-materialize';
import {formatPrice} from '../../helper/data'

class OrderGrid extends React.Component{
    constructor(){
        super();
        this.state = {orders : null , stats : null}
        this.editRow = this.editRow.bind(this)
        this.filterGrid = this.filterGrid.bind(this)
    }

    componentDidMount(){
        document.title = "Order Grid"
        fetch('/api/order_stats').then(data => data.json()).then(stats => this.setState({stats : stats }))
    }
    editRow=(order_id) =>{
        this.props.history.push('/admin/order/'+order_id)
    }
    filterGrid = (event) =>{
        
    }
    render(){
        const {orders} = this.props;
        const {stats} = this.state;
        if(stats == null)  return null;
         return(
            orders && stats &&   
            <div className="view content-wrapper">               
                <div className="page-head cleafix">
                  <div className="clearfix titlebar">
                        <div className="title-wrapper col-lg-5 col-sm-5">
                            <h4 className ="page-title">Manage Orders </h4>
                        </div>
                        <div className="control-wrapper">
                            <ul className="options inline">                     
                                <li><Link to ="/admin/new/order"><Button  floating large className='' waves='light' icon='add' >Add Order</Button></Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="stats col-sm-12 col-lg-12">
                      <div className="item"><span className="label pending">{stats.pending}</span>New</div>
                      <div className="item"><span className="label preparing">{stats.preparing}</span>Preparing </div>
                      <div className="item"><span className="label cancelled">{stats.cancelled}</span>Cancelled </div>
                      <div className="item"><span className="label shipped">{stats.shipped}</span>Shipped </div>
                      <div className="item"><span className="label hold">{stats.hold}</span>Hold </div>
                      <div className="item"><span className="label completed">{stats.completed}</span>Completed </div>
                    </div>
                </div>
                
                <div className = "grid-container">                
                <div className = "grid-wrapper">                
                { orders && 
                    <table className="table-hover table responsive">
                    <thead>
                        <tr><td>ID</td><td>Customer Name</td><td>Grand Total</td><td>Medicines</td><td>Order Date</td><td>Status</td><td>Actions</td></tr>
                            <tr><td><input type="text" ref="id" onKeyUp={this.filterGrid} /></td><td><input type="text" name="customer" /></td><td><input type="text" name="customer" /></td>
                            <td><input type="text" name="customer" /></td><td><input type="text" name="customer" /></td><td><input type="text" name="customer" /></td></tr>
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
             </div>
        )
    }
}

export default withLoader('/api/orders' , 'orders')(OrderGrid );