import React from 'react';
import Flash from './components/Flash';
import FlashMassage from 'react-flash-message';
import {Link} from 'react-router-dom';
import { Redirect } from 'react-router'
  require('./css/customer.css');

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
      }

render() {
    let order = this.props.location.state;
    return (   
        <div className="view">            
             <div className="success box-lg text-center">
                <div classNam="content">
                <h5>Page Title</h5>
                <h3>Content</h3>
                <button className ="back abs"onClick={() => this.props.history.push('/customer/account')}>Back</button>
                </div>
            </div>
        </div>
    )
}
}
export default Page;