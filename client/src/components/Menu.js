import React from 'react';
import MenuItem from './MenuItem'

class Menu extends React.Component{
    

 ServiceMenu = [
    {title : "Lab Test" , route: "/labtest"} ,
    {title : "Radiology" , route: "/radiology"}
 ]

 AboutUsMenu = [
 ]

 handleMenuHover = () =>{
    this.setState({ isOpen: !this.state.isOpen })
 }

render() {
    
    return(
        
        <nav>
            <ul className="inline menu">
                <MenuItem title="Home" submenu ={ this.HomeMenu } route="/" />
                <MenuItem title="Services" submenu ={ this.ServiceMenu }  route="/page/test"/>
                <MenuItem title="About Us" submenu ={ this.AboutUsMenu }  route="/page/about-us" />
            </ul>
        </nav>       
       
        )
}
}

export default Menu;