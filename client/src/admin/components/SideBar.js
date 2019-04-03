import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class SideBar extends Component {
    constructor(){
        super();
        this.handleNav = this.handleNav.bind(this)
        this.handleOrderNav = this.handleOrderNav.bind(this)
        this.state = {
            show : false,
            showOrder : false,
            showContent : false
        }
    }
    
    componentDidMount(){

    }
    handleNav = () => {
        this.setState({ show : !this.state.show})
    }
handleOrderNav = () => {
    this.setState({ showOrder : !this.state.showOrder})
}
handleContentNav = () => {
    this.setState({ showContent : !this.state.showContent})
}

    render(){
        var showCls,openCls,order_showCls,content_showCls,order_openCls,content_openCls  = '';
        const {show,showOrder,showContent} = this.state;
        if(show)    showCls = "show" ;   openCls = "menu-open"
        if(showOrder)    order_showCls = "show" ;   order_openCls = "menu-open"
        if(showContent)    content_showCls = "show" ;   content_openCls = "menu-open"
        const style = {
            marginLeft : "25px"
        }
        return (
            <aside className="main-sidebar">
                <section className="sidebar">
                    <ul className="sidebar-menu" data-widget="tree">
                        <li className="header">MAIN NAVIGATION</li>
                        <li className={"treeview "+ openCls} onClick={this.handleNav}>
                            <Link to="#">
                             <i className="material-icons md-36">account_circle</i>
                                <span>Customer</span>
                                <span className="pull-right-container">
                                {/* <span className="label label-primary pull-right">4</span> */}
                                <i className="fa fa-angle-left pull-right"></i>
                                </span>
                            </Link>
                            <ul className={"treeview-menu "+showCls} style ={style}>
                                <li><Link to="/admin/customers/grid"><i className="material-icons">toys</i>Manage Customers</Link></li>
                            </ul>                            
                        </li>

                        <li className={"treeview "+ order_openCls} onClick={this.handleOrderNav}>
                            <Link to="#">
                            <i className="material-icons md-36">shopping_cart</i>
                                <span>Orders</span>
                                <span className="pull-right-container">
                                <i className="fa fa-angle-left pull-right"></i>
                                </span>
                            </Link>
                            <ul className={"treeview-menu "+order_showCls} style ={style}>
                                <li><Link to="/admin/orders/grid"><i className="material-icons">toys</i>Manage Orders</Link></li>
                                <li><Link to="/"><i className="material-icons">toys</i>Invoices</Link></li>
                            </ul>                            
                        </li>
                        <li className={"treeview "+ content_openCls} onClick={this.handleContentNav}>
                            <a href="#">
                            <i className="material-icons md-36">description</i>
                                <span>Content</span>
                                <span className="pull-right-container">
                                <i className="fa fa-angle-left pull-right"></i>
                                </span>
                            </a>
                            <ul className={"treeview-menu "+content_showCls} style ={style}>
                                <li><Link to="/admin/banner/grid"><i className="material-icons md-24">color_lens</i>Banner</Link></li>
                                <li><Link to="/admin/pages"><i className="material-icons md-24">pages</i>Pages</Link></li>
                            </ul>      
                         </li> 
                        <li className="treeview">
                            <a href="#">
                            <i className="material-icons md-36">settings</i>
                                <span>System</span>
                                <span className="pull-right-container">
                                <i className="fa fa-angle-left pull-right"></i>
                                </span>
                            </a>
                            <ul className="treeview-menu" style ={style}>
                                <li><Link to="/admin/system/config"><i className="material-icons md-24">build</i>Configuration</Link></li>
                            </ul>                        
                         </li>
                        <li>
                        </li>
                        
                    </ul>
                </section>
            </aside> 
        )
    }
}
