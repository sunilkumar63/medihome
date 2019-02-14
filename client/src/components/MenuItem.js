import React from 'react';
import {Link} from 'react-router-dom';
class Menu extends React.Component{

    // constructor(props){
    //     super(props);
    // }
    state ={
        isOpen : false
    }

    handleMenuHover = () =>{
        this.setState({ isOpen: !this.state.isOpen })
     }

render() {
    const submenu = this.props.submenu;
    const menuClass = `nav-menu ${this.state.isOpen ? "show" : "hide"}`;
    return(
        <li className="menu-item" onMouseEnter = { this.handleMenuHover } onMouseLeave = { this.handleMenuHover }>
                <Link to={this.props.route}  > {this.props.title}</Link>
                {submenu &&
                <ul className={menuClass}>
                      {      submenu.map( (menu,index) =>{
                        return(
                            <li key={index}>
                                <div className=""><Link to = {menu.route} >{ menu.title}</Link></div>
                            </li>
                        )
                        })
                    }
                    </ul>
                }
            </li>
    )
}
}

export default Menu;