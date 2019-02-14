import React from 'react';
import { Button, Icon, Card} from 'react-materialize';

class Dashboard extends React.Component{
    state = {
        recent_orders : null
    }
    componentDidMount(){ 
        fetch('/api/orders/recent').then(res => res.json()). then(orders => this.setState({recent_orders : orders }) ).catch(err => console.log(err))   
    }
    render(){
        const {recent_orders} = this.state;
        return(
            recent_orders &&
            <div className="view tab-view content-wrapper"> 
                <div className="block col-lg-4 col-sm-4">
                { recent_orders &&
                <>
                <div className="title">Recent Orders</div>               
                <table className="">                
                <tBody>
                    <tr><td>#ID</td><td>Customer Name</td><td>Amount</td></tr>
                    {                     
                        recent_orders.map(order =>{
                            return (
                                <tr><td>{order.id}</td><td>{order.customer[0].full_name}</td><td>{order.grand_total_currency}</td></tr>
                            )
                        })
                    }
                    </tBody>
                </table>               
                </>
                }
                </div>
            </div>
        )
    }
}

export default Dashboard;