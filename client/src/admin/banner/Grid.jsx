import React from 'react';
import {Link} from 'react-router-dom'
import { Button, Icon, Card, Row, Col,MediaBox } from 'react-materialize';
class Grid extends React.Component{

    constructor(){
        super();
        this.state = {data : null}
        document.title = "Admin - Banner"
    }

    componentDidMount(){
        //  window.Materialize.toast('Banner Saved', 100000) 
        fetch('/api/banners')
        .then(res => res.json())
        .then(data => this.setState({data : data }))
        .catch(err => console.error(err))
}
editRow=(item) =>{
    this.props.history.push({ pathname : '/admin/banner/edit/'+item.id, item : item })
}
    render(){
        const {data} = this.state;
        return(
            <div className="view content-wrapper">              
                <div className="page-head cleafix">
                    <div className="title-wrapper">
                        <h4 className ="page-title">Manage Banners </h4>
                    </div>
                    <div className="control-wrapper">
                    <ul className="options inline">                     
                        <li><a href ="/admin/banner/new"><Button  floating large className='' waves='light' icon='add' >Add Banner</Button></a></li>
                    </ul>
                    </div>
                </div>
                <div className = "grid-container">
                { data &&
                    <table className="table-hover table">
                    <thead>
                        <tr><td>#</td><td>Name</td><td>Banner</td><td>Status</td><td>Actions</td></tr>
                    </thead>
                    <tbody>
                        { data.map( (banner,index) => {
                            //  var  image=  require(`../../images/banner/${banner.filename}`)      
                            return (<tr onClick={ () =>this.editRow(banner)} key={index}><td>{banner.id}</td><td>{banner.name}</td>
                                <td><MediaBox src={banner.src} caption={banner.filename} width="70"/></td><td>{banner.status_label}</td>
                                <td><Link to={{  pathname:'/admin/banner/edit/'+banner.id , item : banner  }} >Edit</Link></td></tr>)
                        }) 
                        }
                    </tbody>
                    </table>
                }
                </div>

             </div>
        )
    }
}

export default Grid;