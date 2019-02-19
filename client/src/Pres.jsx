import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Popup from "reactjs-popup";
// import {} from "react-bootstrap";
import UploadForm from './UploadForm.jsx' 
import { Button, Icon, MediaBox} from 'react-materialize';
require('./css/customer.css');
require('./css/lib.css');

class Pres extends React.Component {
    constructor() {
        super();
        // this.submit =  this.submit.bind(this)
        this.state = { selectedFile: [], pres : null }
    }
    componentDidMount(){
    }
    
  render() { 

      const {presc} = this.props;
    return (
            <div className="view pres-grid">
                <table className="table"><tbody>
                    <tr><th>#</th><th>Name</th><th>Image</th><th>Message</th><th>Date</th></tr>
                    { presc && presc.map( (item,index) => {
                        //const  image=  require(`./images/presc/${item.file}`)
                        return (<tr key={index}><td>{item.id}</td><td>{item.name}</td><td>{item.message}</td><td>{item.creation_date}</td></tr>)
                     })
                   }
                   </tbody>
                </table>
            </div>
    )
}
}
export default Pres;