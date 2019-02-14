import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Popup from "reactjs-popup";
// import {} from "react-bootstrap";
import UploadForm from './UploadForm.jsx' 
require('./css/customer.css');
require('./css/lib.css');

class Pres extends React.Component {
    constructor() {
        super();

        this.state = { selectedFile: [], pres : null }
    }
    componentDidMount(){
        fetch('/api/prescription')
        .then(data => data.json())
        .then(res => this.setState({pres : res}))
    }
    
  render() { 
      const uploadStyle = {
        // position: "absolute",
        // right: 0,
        // top: "10px"
      }
      const {pres} = this.state;
    return (
            <div className="view pres-grid">
            {/* <div className="title">Prescription History</div> */}
                <table className="table"><tbody>
                    <tr><th>#</th><th>Name</th><th>Message</th><th>Date</th></tr>
                    { pres && pres.map( (item,index) => {
                    return (<tr key={index}><td>{item.id}</td><td>{item.name}</td><td>{item.message}</td><td>{item.createdAt}</td></tr>)
                     })
                   }
                   </tbody>
                </table>
            </div>
    )
}
}
export default Pres;