import React from 'react';
import {
    Form,
    Input
  } from "super-easy-react-forms";

class Address extends React.Component {
    constructor() {
        super();
        this.state = { addresses : null }
    }
    componentDidMount(){        
        // fetch('/api/addresses')
        // .then(data => data.json())
        // .then(res => this.setState({addresses : res}))
        // .catch(err => console.error("addr fetch ", err))
    }

  render() { 
    const {addresses} = this.props;
    return (
            <div className="tab-content address-grid">
                    { addresses.length > 0 ?
                        <div className="grid-square">
                                { addresses.map( (address,index) => {
                                                return(
                                                        <div className="item" key={index}>
                                                                <span className="title">{address.name}</span>
                                                                <span className="sub">{address.mobile_no}</span>
                                                                <span className="sub">{address.locality}</span>
                                                                <span className="sub">{address.pincode}</span>
                                                                <span className="sub">{address.city}</span>
                                                                <span className="sub">{address.address}</span>
                                                                <span className ="edit-icon"><i className="fa fa-2x fa-pencil-square"></i></span>
                                                        </div>
                                                )
                                        }) }
                        </div>
                    : <h3>No Address available</h3>
                    }
            </div>
    )
}
}
export default Address;