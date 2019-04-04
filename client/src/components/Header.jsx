import React,{Component} from 'react';
import Menu from './Menu';
import { Button, Dropdown1,NavItem } from 'react-materialize';
import logo from '../images/logo.png';
import {Link , Redirect} from 'react-router-dom';
import axios from 'axios'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
class Header extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          dropdownOpen: false
        };
      }
    
      toggle() {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
      }
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
                <div className="user-info">
                        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret  className="">
                        { customer.first_name }   <i className="fa fa-caret-down"> </i>
                        </DropdownToggle>
                        <DropdownMenu>
                        {/* <DropdownItem header>Header</DropdownItem> */}
                        <Link to="/customer/account"><Button><i class="fa fa-3x fa-newspaper-o"></i>My Account</Button></Link>
                        <DropdownItem divider />
                        <Link to="/upload"><Button ><i class="fa fa-3x fa-upload"></i>Upload Prescription</Button></Link>
                        <DropdownItem divider />
                        <Link to="" onClick={this.logout.bind(this)}><Button className="red"><i class="fa fa-4  x fa-sign-out"></i>Logout</Button></Link>
                        </DropdownMenu>
                    </Dropdown>
                </div> 
                    :
                <div className="action-links ">
                                    <Link to="/customer/login"><Button className="login">Login</Button></Link>
                                    <Link to="/customer/register"><Button className="login">Sign Up</Button></Link>
                                    <Link to="/upload"><Button className="primary">Upload Prescription</Button> </Link>
                                </div>
                }
            </header>
      )}
  }

  export default Header;