import React from 'react';
import {Link} from 'react-router-dom';
import moment  from 'moment'

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
            <div className="tab-content pres-grid">
             { presc.length  > 0 ?
                <table className="table"><tbody>
                    <tr><th>#</th><th>Name</th><th>Message</th><th>Date</th></tr>
                  { presc.map( (item,index) => {
                    return (<tr key={index}><td>{item.id}</td><td>{item.name}</td><td>{item.message}</td><td>{item.creation_date}</td></tr>)
                     })
                   }                   
                   </tbody>
                </table>
                : <h5>No address available</h5>
            }
            </div>
    )
}
}
export default Pres;