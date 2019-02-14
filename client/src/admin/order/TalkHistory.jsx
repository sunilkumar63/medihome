import React from 'react';
import Loader  from '../../components/Loader'
import AlertCustom from '../../components/Alert'
// import Flash from '../../components/Flash'
import {notifyCustomer} from '../../helper/sender'
import { Form,Tab,NavItem , Row , Col , Nav}  from 'react-bootstrap'; 
import { Alert } from 'react-alert'
import moment  from 'moment'
import { withAlert } from 'react-alert'
import { Button, Icon, Chip} from 'react-materialize';
class TalkHistory extends React.Component {
    constructor(props){
        super(props);
        this.state = {order_id : null,loader: true , list : [],messages : [] }
        this.NotifyCustomer= this.NotifyCustomer.bind(this)
    }
 
async componentDidMount(){
    
}

NotifyCustomer = async (event) =>{
    event.preventDefault()
    let msg =  event.target.elements.message.value;
    let via =  "email";//event.target.elements.via.value;
    let data = {order : this.props.order , message : msg , via : via , msg_type : "order_email" }
   notifyCustomer(data , (response) =>{
            if(response) alert("Message Sent")
    })
}
render(){
        let {order} = this.props;
        if(order)
        var messages = order.chat_history;
        return (
            !messages ? <Loader /> : 
            <div className="tab-view">  
            <Col sm={6} lg={6} className="block">
            <div className="title">Last Conversations</div>
            {
                messages.length >0 ?
                <div className="chat-history">
                    { messages.map((message,index) =>{
                        return <div className="chat" key={index}>
                                <span>{ message.message } </span>
                                <Chip className="right">{ moment(message.createdAt).format('DD-YYYY-MM h:mm A')}</Chip>                    
                        </div>
                    })
                }
                </div> :
                <h5>No Chat yet</h5>
            }
            </Col>
            
            <div  className="block col-sm-5 col-lg-5">
            <div className="title"> <p>Please type your message</p></div>
            <form name="msg-box" onSubmit={this.NotifyCustomer} >
            <textarea name="message" placeholder="Message" required></textarea>
            {/* <input type="checkbox" name="via" value="SMS" >SMS</input> */}
            {/* <input type="checkbox" name="via" value="Email" >Email</input> */}
            <button className="btn-success" type="submit">Notify Customer</button>
            </form>
            </div>
                </div>
        )
}
}
// const DivWithErrorHandling = AlertCustom(({children}) => TalkHistory)
export default TalkHistory