import React, {Component} from 'react';
import image from '../assets/img/user3-128x128.jpg'
import logo from '../../images/pill.png'

export default class Header extends Component {
    render(){
        const navStyle ={
                marginLeft : 0,
                background: "none"
        }

        return (
            <header className="main-header header"><img src={logo} width="50px"></img>
                <a href="/admin" className="logo">                
                    <span className="logo-mini"><b>Medi</b>Home</span>
                    <span className="logo-lg"><b>Medi</b>Home</span>
                </a>
                <nav className="navbar navbar-static-top" style={navStyle}>
                    <a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
                        <span className="sr-only">Toggle navigation</span>
                    </a>
                    <div className="navbar-custom-menu">
                        <ul className="nav navbar-nav">
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