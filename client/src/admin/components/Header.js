import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import image from '../assets/img/user3-128x128.jpg'
import logo from '../../images/pill.png'
import { Button, Icon} from 'react-materialize';
import axios from 'axios';

 class Header extends Component {

 constructor(props){
        super(props);
        this.state = {
            isAuthenticated : false
        }
        // this.authAdmin =  this.authAdmin.bind(this);
        this.logout =  this.logout.bind(this);
 }
 
 componentDidMount(){
    var isAuth = localStorage.getItem("isAuthenticated");
    fetch('/api/admin/auth')
        .then(res =>res.json())
        .then( data => {
            if(!data || !isAuth){
                 this.props.history.push("/admin/login")
            }else{
                localStorage.setItem("admin_id", data.id)
                localStorage.setItem("isAuthenticated",true)
            }
    })
}

    logout = () => {
        var props = this.props;
        fetch('/api/admin/logout').then(res => res.json()).then(result =>{
          localStorage.setItem("isAuthenticated",null)
          localStorage.setItem("admin_id",null)
          window.Materialize.toast('Hey,Logged Out', 5000) ;
        //   this.setState({isAuthenticated : false})
          props.history.push('/admin/login')
        })
    }
    render(){
        const navStyle ={
                marginLeft : 0,
                background: "none"
        }
        const {isAuthenticated} = this.state;
        var isAuth = localStorage.getItem("isAuthenticated")
        return (
            <header className="main-header header"><img src={logo} width="50px"></img>
              {/* if(!isAuth) <Redirect to ="/admin/login"></Redirect>  */}
                <a href="/admin" className="logo">                
                    <span className="logo-mini"><b>Medi</b>Home</span>
                    <span className="logo-lg"><b>Medi</b>Home</span>
                </a>`
                <nav className="navbar navbar-static-top" style={navStyle}>
                    <a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
                        <span className="sr-only">Toggle navigation</span>
                    </a>
                    <div className="navbar-custom-menu">
                        <ul className="nav navbar-nav">
                        <li><Button onClick= {() =>this.logout() }  floating className=''  waves='light' icon='logout' >Logout</Button> </li>
                            <li className="dropdown messages-menu">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="fa fa-envelope-o"></i>
                                    <span className="label label-success">4</span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li className="header">You have 4 messages</li>
                                    <li>
                                        <ul className="menu">
                                            <li>
                                                <a href="#">
                                                    <div className="pull-left">
                                                        <img src={image} className="img-circle" alt="User Image" />
                                                    </div>
                                                    <h4>
                                                        Support Team
                                                        <small><i className="fa fa-clock-o"></i> 5 mins</small>
                                                    </h4>
                                                    <p>Why not buy a new awesome theme?</p>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
}

export default Header