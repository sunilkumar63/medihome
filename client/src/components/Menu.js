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
<<<<<<< HEAD
                <MenuItem title="Services" submenu ={ this.ServiceMenu }  route="/page/test"/>
                <MenuItem title="About Us" submenu ={ this.AboutUsMenu }  route="/page/about-us" />
=======
                <MenuItem title="Services" submenu ={ this.ServiceMenu }  route="#"/>
                <MenuItem title="About Us"   route="/about-us" />
>>>>>>> b7986adee166637dd73defdf3b289e5280d6e0ce
            </ul>
        </nav>       
       
        )
}
}

export default Menu;