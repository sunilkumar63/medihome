import React from 'react';
import {Link} from 'react-router-dom'
import withLoader  from '../../components/LoaderHoc'
import { Button, Input} from 'react-materialize';
import {formatPrice,customerHtml} from '../../helper/data'
import {statusObject} from '../../helper/order_hlp'
import Select from 'react-select';
const scaryAnimals = [
    { label: "Alligators", value: 1 },
    { label: "Crocodiles", value: 2 },
    { label: "Sharks", value: 3 },
    { label: "Small crocodiles", value: 4 },
    { label: "Smallest crocodiles", value: 5 },
    { label: "Snakes", value: 6 },
  ];
class OrderGrid extends React.Component{
    constructor(){
        super();
        this.state = {orders : null , stats : null, filtered_orders : null ,customer_id_filter : null , customers : null} 
        this.editRow = this.editRow.bind(this)
        this.filterGrid = this.filterGrid.bind(this)
        this.getStatusObject = this.getStatusObject.bind(this)
    }

    componentDidMount(){
        document.title = "Order Grid"
        fetch('/api/order_stats').then(data => data.json()).then(stats => this.setState({stats : stats }))
        var options = []
        fetch('/api/customers').then(res => res.json()).then(customers =>{
          customers.map(customer =>{
            let customer_tmp_option = {}
             customer_tmp_option.label  = customer.full_name
             customer_tmp_option.value  = customer.id
             options.push(customer_tmp_option)
          })
          this.setState({customers : options})
        })
    }
    editRow=(order_id) =>{
        this.props.history.push('/admin/order/'+order_id)
    }
    filterGrid = (event) =>{  
        var data = {type : 'filter'}
        if(event) { 
        var id = this.id.value;
        var customer = event.value; 
        var status = this.status.value;
        var createdAt = this.createdAt.value;
        if(id !== '')  data.id = id 
        if(status !== '')  data.status = status 
        if(customer !== '')  data.customer_id = customer
        }
        
        fetch('/api/filter/order', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
          }
          })
          .then(res => res.json())
          .then(res =>{ this.setState({filtered_orders : res});console.log(res) })
          .catch(err => console.log(err))        
    }
    
    getStatusObject = () =>{
        var data = ({ 1 : 'pending' , 2 : 'preparing' , 3: 'shipped' , 4 : 'hold',5 : 'unhold', 6 : 'completed' , 0 : 'cancelled' })
        return data;
    }
    render(){
        var {orders} = this.props;
        var {stats,filtered_orders , customers} = this.state;       
        if(filtered_orders) orders =  filtered_orders;
        // { customerHtml(options => console.log(options) )}
        if(stats == null || customers == null)  return null;
        const customStyles = {
            width: "20%",
          }
                    
         return(
            orders && stats && customers &&
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
                        <tr><td>ID</td><td >Customer Name</td><td>Grand Total</td><td>Medicines</td><td>Order Date</td><td>Status</td><td>Actions</td></tr>
                        <tr>
                        <td><input type="text" name="id" ref={input => this.id = input} onKeyUp={this.filterGrid} /></td>
                        <td style={customStyles} > 
                            <Select options={ customers } ref= {input => this.customer = input} onChange={  this.filterGrid }  isClearable  />
                            </td>
                        <td></td>
                        <td></td>
                        <td><input type="text" ref={createdAt  => this.createdAt = createdAt}  onKeyUp={this.filterGrid} autoComplete="off"/></td>
                        <td><select className = "status"  ref={status  => this.status = status}  onChange={this.filterGrid} >
                         <option value="">---</option>
                         <option value="0">Cancelled</option>
                         <option value="1">Pending</option>
                         <option value="2">Preparing</option>
                         <option value="3">Shipped</option>
                         <option value="4">On Hold</option>
                         <option value="6">Completed</option>
                        </select> 
                        </td>
                        </tr>
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