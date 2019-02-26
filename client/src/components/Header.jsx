import React,{Component} from 'react';
import Menu from './Menu';
import { Button, Dropdown,NavItem } from 'react-materialize';
import logo from '../images/logo.png';
import {Link , Redirect} from 'react-router-dom';
import axios from 'axios'
class Header extends Component {
    state= {
        menuShow : false,
        logout : false
    }
     authUser = () =>{
        axios.get('/api/customer/auth')
            .then(result =>result.data)
            .then( data => {
                if(data !== false){
                    localStorage.setItem("customer", JSON.stringify(data))
                    localStorage.setItem("is_logged",true)
            }
            else {
                localStorage.setItem("is_logged",false)
                localStorage.setItem("customer",null)
            }
        })
    }
    
    toggleMenu= () => this.setState({ menuShow: !this.state.menuShow });
    logout = () =>{
        axios.get('/api/customer/logout')
        .then(result =>result.data)
        .then( data => {
            if(data !== false){
                console.log("out " , data)
                localStorage.setItem("is_logged",false)
                localStorage.setItem("customer",null)
                this.setState({logout : true})
            }
        })
        return false;
    }
    render() {
        this.authUser.bind(this)
        const {logout} = this.state;
        const menuClass = `menu${this.state.menuShow ? " show" : " hide" }`;
        //   var menuClass = menuShow ? "" : "hide";
        var is_logged = localStorage.getItem("is_logged");
          console.log( "is_logged" , is_logged)
        if(is_logged) {
              var item = localStorage.getItem("customer");
              var customer =  JSON.parse(item)
        }
       
      return (
            <header className="header">
            {  logout && (
                    <Redirect to={'/' }/>
                )}
               <div className="logo-wrapper width20 text-center"><Link to="/"><img src={logo} alt="LOGO" width="80px"></img></Link></div>
                <div className="navbar width60 text-center">
                    <Menu />
                </div>
                { is_logged === "true" ?
                <div className="user-info" onMouseEnter={this.toggleMenu.bind(this)} onMouseLeave={this.toggleMenu.bind(this) } >
                    {/* <button className="username" > { customer.first_name } <i className="fa fa-caret-down"> </i></button>
                    <div className={menuClass}>
                        <ul className="">
                            <li><Link to="/customer/account">My Account</Link></li>
                            <li><Link to="/upload">New Order</Link></li>
                            <li><Link to = "" onClick={this.logout.bind(this)}>Logout</Link></li>
                        </ul>
                    </div>  */}
                

                    <Dropdown trigger={
                        <Button>{ customer.first_name } <i className="fa fa-caret-down"> </i></Button>
                    }>
                    <NavItem><Link to="/customer/account">My Account</Link></NavItem>
                    <NavItem divider />
                    <NavItem><Link to="/upload">New Order</Link></NavItem>
                    <NavItem divider />
                    <NavItem><Link to = "" onClick={this.logout.bind(this)}>Logout</Link></NavItem>
                    </Dropdown>             
                </div> 
                    :
                <div className="action-links ">
                                    <Link to="/customer/login"><button className="login">Login</button></Link>
                                    <Link to="/customer/register"><button className="login">Sign Up</button> 
                                </Link>
                                </div>
                }
            </header>
      )}
  }

  export default Header;