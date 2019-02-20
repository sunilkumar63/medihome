import React from 'react';
import {Link} from 'react-router-dom'
import { Button,MediaBox } from 'react-materialize';
import withLoader  from '../../components/LoaderHoc'
class Grid extends React.Component{
    constructor(){
        super();
        this.state = {data : null}
        document.title = "Admin - Pages"
    }

//     componentDidMount(){
//         fetch('/api/pages')
//         .then(res => res.json())
//         .then(data => this.setState({data : data }))
//         .catch(err => console.error(err))
// }
editRow=(item) =>{
    this.props.history.push({ pathname : '/admin/page/edit/'+item.id, item : item })
}
    render(){
        const {data} = this.props;
        return(
            <div className="view content-wrapper">              
                <div className="page-head cleafix">
                    <div className="title-wrapper">
                        <h4 className ="page-title">Manage Pages </h4>
                    </div>
                    <div className="control-wrapper">
                    <ul className="options inline">                     
                        <li><a href ="/admin/page/new"><Button  floating large className='' waves='light' icon='add' >Add Page</Button></a></li>
                    </ul>
                    </div>
                </div>
                <div className = "grid-container">
                { data && data.length > 0 ?
                    <table className="table-hover table">
                    <thead>
                        <tr><td>#</td><td>Name</td><td>Status</td><td>Actions</td></tr>
                    </thead>
                    <tbody>
                        { data.map( (item,index) => {
                            return (<tr onClick={ () =>this.editRow(item)} key={index}><td>{item.id}</td><td>{item.name}</td><td>{item.status_label}</td>
                                <td><Link to={{  pathname:'/admin/page/edit/'+item.id , item : item  }} >Edit</Link></td></tr>)
                        }) 
                        }
                    </tbody>
                    </table> :
                    <h5 className="text-red">No Page available</h5>
                }
                </div>

             </div>
        )
    }
}
export default withLoader('/api/pages','data')(Grid);
