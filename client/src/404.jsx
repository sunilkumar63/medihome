import React from 'react';
 require('./css/customer.css');

class Noroute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
      }

render() {
    return (   
        <div className="view">            
             <div className="success box-lg text-center">
                <div className="content">
                <h2><i className="fa fa fa-smile-o"></i> You Moved to Wrong Planet</h2>
                
                <button className ="back abs"onClick={() => this.props.history.push('/')}>Back</button>
                </div>
            </div>
        </div>
    )
}
}
export default Noroute;