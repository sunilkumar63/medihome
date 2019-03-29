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
        this.state = { selectedFile: [], pres : null }
    }    
  render() { 

      const {presc} = this.props;
    return (
            <div className="view pres-grid">
             { presc &&  presc.length > 0 ?
                <table className="table"><tbody>
                    <tr><th>#</th><th>Name</th><th>Image</th><th>Message</th><th>Date</th></tr>
                    { presc && presc.map( (item,index) => {                        
                        return (<tr key={index}><td>{item.id}</td><td>{item.name}</td><td>{ item.image_src ?
                            <MediaBox src={item.image_src} caption={item.image_src} width="70"/> 
                            : "N/A"
                            }</td>
                            <td>{item.message}</td><td>{item.createdAt}</td>                            
                            </tr>)
                     })
                   }
                   </tbody>
                </table>
                : <h5>No prescription available</h5>
                }
            </div>
    )
}
}
export default Pres;